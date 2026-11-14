(function () {
var S = SDC.S;

S('bd2', 'bd2.storage', { title: 'Almacenamiento: páginas, registros y buffer pool',
  ask: '¿Qué concepto de almacenamiento en bases de datos se aplica?',
  lesson: `
> **La idea en simple.** Una base de datos no guarda filas sueltas: guarda **páginas**, cajas de tamaño fijo con varias filas dentro. Leer una fila obliga a traer su caja completa del disco a la memoria. Casi todo el rendimiento de un motor se explica por cuántas cajas tiene que traer y cuántas logra mantener en memoria.

## La arquitectura orientada a disco
Los motores tradicionales (PostgreSQL, MySQL, Oracle, SQL Server) suponen que los datos no caben en memoria y viven en disco. Su diseño gira alrededor de una idea: **el acceso al disco es caro y conviene minimizarlo**. Por eso:
- Los datos se organizan en **páginas** de tamaño fijo: 8 KB en PostgreSQL y SQL Server, 16 KB en InnoDB de MySQL.
- Un **buffer pool** en memoria mantiene copias de las páginas usadas recientemente.
- El costo de una consulta se estima, en primera aproximación, por la **cantidad de páginas leídas y escritas**.
Leer páginas **secuenciales** es mucho más rápido que leerlas al azar, incluso en SSD, así que los motores prefieren recorridos ordenados cuando pueden.

## Cómo se organiza una página
El diseño más común es la **página con ranuras** (*slotted page*):
- Una **cabecera** con datos de la página (espacio libre, número de registro del último cambio).
- Un **arreglo de ranuras** que crece desde el inicio: cada ranura apunta a dónde empieza un registro dentro de la página.
- Los **registros** se guardan desde el final hacia el inicio.
Así, un registro se identifica por (número de página, número de ranura); en PostgreSQL ese identificador se llama **ctid**. Si un registro se mueve dentro de su página (al compactar el espacio), solo cambia su ranura, no su identificador.

## Cómo se guarda un registro
Un registro suele tener una cabecera (con, por ejemplo, información de visibilidad para las transacciones), un **mapa de bits de nulos** (un bit por columna que dice si es NULL, para no gastar espacio en ella) y luego los valores: primero los de **longitud fija** (enteros, fechas) y después los de **longitud variable** (textos), con sus longitudes o desplazamientos. Los valores muy grandes no caben en una página: PostgreSQL los comprime y los mueve a una tabla auxiliar con el mecanismo **TOAST** (cuando una fila supera unos 2 KB), y deja en la fila un puntero.

## Archivos de montón
La forma más simple de guardar una tabla es un **archivo de montón** (*heap file*): páginas sin ningún orden, con un mapa de espacio libre para saber dónde insertar. Buscar una fila sin índice exige recorrer **todas** las páginas (un recorrido secuencial). Si la tabla tiene P páginas, eso cuesta P lecturas; con un archivo **ordenado** por la clave de búsqueda, una búsqueda binaria costaría log₂ P, pero mantener el orden al insertar es caro. Los índices de la siguiente unidad resuelven ese dilema.
~~~js
// ¿Cuántas páginas ocupa una tabla y cuánto cuesta recorrerla?
function paginas(filas, bytesFila, pagina = 8192, cabecera = 192) {
  const porPagina = Math.floor((pagina - cabecera) / bytesFila);
  return { porPagina, paginas: Math.ceil(filas / porPagina) };
}
const t = paginas(2_000_000, 120);
console.log(t.porPagina, 'filas por página →', t.paginas, 'páginas');
console.log('recorrido completo a 0.1 ms por página aleatoria:', (t.paginas * 0.1 / 1000).toFixed(1), 's; secuencial a 0.01 ms:', (t.paginas * 0.01 / 1000).toFixed(1), 's');
~~~

## El buffer pool
El buffer pool es un arreglo de **marcos** en memoria, cada uno capaz de contener una página, y una tabla que indica qué página está en qué marco. Por cada marco se guarda:
- Un contador de **fijaciones** (*pin count*): cuántos hilos la están usando; una página fijada no puede expulsarse.
- Un bit de **sucia**: si fue modificada y debe escribirse antes de expulsarla.
Cuando se pide una página que no está, se elige un marco víctima con una política de reemplazo. LRU parece natural, pero falla con la **inundación secuencial**: un recorrido completo de una tabla grande expulsa todas las páginas útiles para leer páginas que no se volverán a usar. Por eso los motores usan variantes:
- **Reloj** (*clock-sweep*), la que usa PostgreSQL, con contadores de uso.
- **LRU-K** (Elizabeth O'Neil, Patrick O'Neil y Gerhard Weikum, 1993): expulsar según el tiempo del K-ésimo acceso más reciente, que distingue lo usado una vez de lo usado a menudo.
- **Anillos de buffers** para recorridos grandes: la consulta que recorre usa un pequeño grupo de marcos propio y no contamina el resto.
Los motores también hacen **lectura anticipada**: si detectan un recorrido secuencial, piden las páginas siguientes antes de necesitarlas.

## ¿Por qué no dejarle todo al sistema operativo?
El sistema operativo ya tiene una caché de páginas y memoria virtual. Michael Stonebraker argumentó en 1981 (*Operating System Support for Database Management*) que el sistema operativo no sabe lo que la base de datos sabe: qué consulta viene, qué páginas deben escribirse en orden para la recuperación, cuándo conviene leer por adelantado. Andrew Crotty, Viktor Leis y Andy Pavlo mostraron en 2022 (*Are You Sure You Want to Use MMAP in Your Database Management System?*) que delegar el buffer en «mmap» trae problemas de corrección y de rendimiento. Muchos motores abren los archivos con E/S directa para evitar la **doble caché**, o al menos dimensionan su buffer pool sabiendo que el sistema guardará otra copia.

## Actualizaciones y espacio muerto
En PostgreSQL, un UPDATE no sobrescribe la fila: escribe una **versión nueva** y marca la vieja como obsoleta (lo verás en el control de concurrencia multiversión). Las versiones viejas que ninguna transacción necesita son **espacio muerto** y el proceso **VACUUM** las recupera; si no se ejecuta, la tabla se **hincha** y los recorridos leen páginas llenas de basura. Para no tener que actualizar también los índices en cada cambio, PostgreSQL intenta guardar la versión nueva en la misma página (actualizaciones **HOT**), por eso conviene dejar algo de espacio libre en cada página con el parámetro «fillfactor» en tablas que se actualizan mucho. InnoDB, en cambio, actualiza en su lugar y guarda las versiones anteriores en un registro de deshacer.

## Filas o columnas
| Organización | Cómo guarda | Ventaja | Desventaja |
| Por filas (NSM) | todas las columnas de una fila juntas | insertar, actualizar o leer filas completas es barato | una consulta que usa 2 de 50 columnas lee las 50 |
| Por columnas (DSM) | cada columna en su propia zona | leer pocas columnas de millones de filas es barato y se comprime muy bien | reconstruir o actualizar filas individuales es caro |
El sistema **C-Store** (Michael Stonebraker y otros, 2005) mostró las ventajas del almacenamiento por columnas para el análisis, y de ahí vienen Vertica, Amazon Redshift, ClickHouse, DuckDB y el formato Parquet. En una columna los valores son del mismo tipo y suelen repetirse, así que se comprimen con **codificación por diccionario** o **por longitud de series** (RLE), y se procesan por bloques (ejecución **vectorizada**, Peter Boncz y otros, 2005). Las bases transaccionales usan filas; las analíticas, columnas.

## Ejemplo resuelto: el tamaño de la tabla de estadías
PatioApp tiene 2 millones de estadías de unos 120 bytes. Con páginas de 8 KB y 192 bytes de cabecera caben 66 filas por página, unas 30 304 páginas (237 MB). El reporte "ingreso total por mes" usa solo dos columnas (fecha y monto, unos 12 bytes):
- En PostgreSQL (por filas), el recorrido lee las 30 304 páginas completas.
- En un almacén por columnas, leería solo esas dos columnas: unos 24 MB sin comprimir y muchísimo menos comprimidas.
Por eso el plan de PatioApp mantiene PostgreSQL para la operación diaria y copia los datos cada noche a un almacén analítico por columnas (o a archivos Parquet consultados con DuckDB) para los reportes pesados, en lugar de agrandar el servidor transaccional. Además, como las estadías se actualizan al registrar la salida, se programa VACUUM con frecuencia para que la tabla no se hinche.`,
  links: [['so.vm', 'el buffer pool aplica los mismos algoritmos de reemplazo que la memoria virtual'], ['so.fs', 'las páginas de la base de datos viven en archivos del sistema operativo'], ['bd2.index', 'los índices evitan recorrer todas las páginas de un montón']],
  read: 'Ramakrishnan y Gehrke, capítulos 8 y 9; CMU 15-445, clases de almacenamiento y buffer pool; Stonebraker (1981); Abadi y otros, *The Design and Implementation of Modern Column-Oriented Database Systems* (2013).',
  terms: [
    ['Página', 'bloque de tamaño fijo en que un motor organiza sus datos y que lee o escribe como unidad', ['8 KB en PostgreSQL.', '16 KB en InnoDB.', 'El costo de una consulta se mide en páginas.']],
    ['Página con ranuras', 'organización de página con un arreglo de ranuras que apuntan a registros guardados desde el final', ['Permite registros de longitud variable.', 'Un registro se identifica por página y ranura.', 'Es el diseño más común.']],
    ['Archivo de montón', 'organización de una tabla en páginas sin orden particular', ['Insertar es barato.', 'Buscar sin índice obliga a recorrer todo.', 'PostgreSQL guarda así sus tablas.']],
    ['Buffer pool', 'zona de memoria del motor con copias de páginas de disco organizadas en marcos', ['Evita leer del disco las páginas usadas a menudo.', 'Cada marco tiene contador de fijaciones y bit de sucia.', 'Usa una política de reemplazo.']],
    ['Inundación secuencial', 'problema en que un recorrido grande expulsa del buffer las páginas útiles con páginas que no se reutilizarán', ['Un reporte de toda la tabla vacía la caché.', 'Afecta a LRU puro.', 'Se mitiga con anillos de buffers o LRU-K.']],
    ['LRU-K', 'política de reemplazo que considera el K-ésimo acceso más reciente de cada página', ['Distingue lo usado una vez de lo usado a menudo.', 'O’Neil, O’Neil y Weikum la propusieron en 1993.', 'Resiste la inundación secuencial.']],
    ['Almacenamiento por columnas', 'organización que guarda juntos los valores de cada columna en lugar de cada fila', ['Ideal para reportes que leen pocas columnas.', 'Se comprime muy bien.', 'ClickHouse, Redshift y Parquet lo usan.']],
    ['TOAST', 'mecanismo de PostgreSQL que comprime y mueve a una tabla auxiliar los valores demasiado grandes para una página', ['Un texto de 1 MB no ocupa la fila.', 'Se activa con filas de más de unos 2 KB.', 'La fila guarda un puntero.']]
  ],
  q: [
    ['¿Por qué un motor cuenta el costo de una consulta en páginas y no en filas?', 'Porque el disco y la memoria se transfieren por páginas completas', ['Porque las filas no existen en disco', 'Porque es una convención sin importancia', 'Porque SQL lo exige'], 'Leer una fila trae su página entera.', 2],
    ['Con páginas de 8192 bytes, 192 de cabecera y filas de 100 bytes, ¿cuántas filas caben por página?', '80', ['81', '82', '100'], 'floor(8000 / 100).', 2],
    ['Con 80 filas por página, ¿cuántas páginas ocupan 10 000 filas?', '125', ['80', '100', '10000'], '10 000 / 80.', 2],
    ['¿Qué problema de LRU resuelven los anillos de buffers?', 'La inundación secuencial por recorridos grandes', ['Los interbloqueos', 'La fragmentación interna', 'La falta de índices'], 'El recorrido usa marcos propios.', 3],
    ['Un reporte suma una columna de 100 millones de filas en una tabla de 40 columnas. ¿Qué almacenamiento conviene?', 'Por columnas', ['Por filas', 'Un archivo de montón', 'Sin páginas'], 'Solo lee la columna que necesita.', 2],
    ['¿Por qué muchos motores usan E/S directa en lugar de confiar en la caché del sistema operativo?', 'Para evitar la doble caché y controlar el orden de escritura y la lectura anticipada', ['Porque el sistema operativo no tiene caché', 'Para usar menos CPU siempre', 'Porque es obligatorio en Linux'], 'Stonebraker lo argumentó en 1981.', 4],
    ['¿Qué indica el bit de sucia de un marco?', 'Que la página fue modificada y debe escribirse antes de expulsarla', ['Que la página está corrupta', 'Que nadie la usa', 'Que es de solo lectura'], 'Expulsarla sin escribir perdería cambios.', 2],
    { tf: 'Una página con el contador de fijaciones mayor que cero puede ser expulsada del buffer pool.', v: false, e: 'Está en uso; solo se expulsan páginas no fijadas.', l: 2 },
    { tf: 'Leer páginas secuenciales suele ser más rápido que leerlas al azar, incluso en SSD.', v: true, e: 'Permite lectura anticipada y transferencias grandes.', l: 2 },
    { c: 'Escribe «paginasNecesarias(filas, tamFila, tamPagina, cabecera)»: filas por página = ⌊(tamPagina − cabecera) / tamFila⌋; devuelve las páginas necesarias.', f: 'paginasNecesarias', p: ['filas', 'tamFila', 'tamPagina', 'cabecera'], t: [[[10000, 100, 8192, 192], 125], [[1, 100, 8192, 192], 1], [[1000000, 200, 16384, 0], 12346], [[0, 50, 8192, 0], 0]], sol: '  return Math.ceil(filas / Math.floor((tamPagina - cabecera) / tamFila));', l: 2 },
    { c: 'Escribe «aciertosLRU(refs, marcos)»: cuántos accesos a páginas encuentran la página ya en un buffer LRU con esa cantidad de marcos.', f: 'aciertosLRU', p: ['refs', 'marcos'], t: [[[[1, 2, 1, 3, 1, 2], 2], 2], [[[1, 1, 1], 1], 2], [[[1, 2, 3], 3], 0]], sol: '  const m = [];\n  let h = 0;\n  for (const p of refs) {\n    const i = m.indexOf(p);\n    if (i >= 0) { h++; m.splice(i, 1); } else if (m.length === marcos) m.shift();\n    m.push(p);\n  }\n  return h;', l: 3 },
    { c: 'Escribe «bytesLeidos(filas, anchos, usadas)»: anchos son los bytes de cada columna y usadas los índices de las columnas que pide la consulta; devuelve [bytes por filas, bytes por columnas].', f: 'bytesLeidos', p: ['filas', 'anchos', 'usadas'], t: [[[1000, [4, 8, 100], [0]], [112000, 4000]], [[10, [2, 2], [0, 1]], [40, 40]], [[5, [10, 20, 30], [1, 2]], [300, 250]]], sol: '  const fila = anchos.reduce((a, b) => a + b, 0);\n  const col = usadas.reduce((a, i) => a + anchos[i], 0);\n  return [filas * fila, filas * col];', l: 2 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var f = R.int(1, 50) * 10000, w = R.pick([40, 80, 100, 120, 200, 400]), pg = R.pick([4096, 8192, 16384]), pp = Math.floor(pg / w); g.input(3, 'Una tabla tiene ' + f + ' filas de ' + w + ' bytes y páginas de ' + pg + ' bytes (ignora la cabecera). ¿Cuántas páginas ocupa?', Math.ceil(f / pp), pp + ' filas por página; ⌈' + f + ' / ' + pp + '⌉.'); });
    g.times(5, function (R) { var p = R.pick([1000, 10000, 100000, 1000000]); g.input(3, 'Un archivo ordenado tiene ' + p + ' páginas. ¿Cuántas lecturas cuesta, como máximo, una búsqueda binaria por la clave? (⌈log₂ P⌉)', Math.ceil(Math.log2(p)), 'Frente a ' + p + ' de un recorrido completo.'); });
    var org = [['Sistema de cobros que inserta y actualiza filas completas todo el día', 'Por filas'], ['Reporte que suma una columna de cientos de millones de filas', 'Por columnas'], ['Pantalla que muestra todos los datos de una estadía', 'Por filas'], ['Tablero analítico con promedios por mes y patio', 'Por columnas']];
    org.forEach(function (o) { g.mcq(2, '¿Qué organización de almacenamiento conviene? ' + o[0], o[1], [o[1] === 'Por filas' ? 'Por columnas' : 'Por filas', 'Archivo de texto plano', 'Sin páginas'], 'Filas para transacciones; columnas para análisis.'); });
  },
  checks: [
    ['¿Por qué los motores organizan los datos en páginas de tamaño fijo?', 'Porque el disco y la memoria se transfieren por bloques; con páginas fijas el buffer, los índices y el costo de las consultas se manejan de forma uniforme.'],
    ['Describe una página con ranuras.', 'Una cabecera, un arreglo de ranuras que crece desde el inicio y apunta a los registros, y los registros guardados desde el final hacia el inicio.'],
    ['¿Qué es la inundación secuencial y cómo se evita?', 'Un recorrido grande expulsa las páginas útiles de un buffer LRU; se evita con anillos de buffers, LRU-K o reloj con contadores.'],
    ['¿Por qué un motor puede preferir su propio buffer a la caché del sistema operativo?', 'Porque sabe qué consultas vienen, en qué orden debe escribir para recuperarse y cuándo leer por adelantado, y evita la doble caché.'],
    ['Compara el almacenamiento por filas y por columnas.', 'Por filas es bueno para leer y modificar filas completas (transacciones); por columnas es bueno para leer pocas columnas de muchas filas y comprimir (análisis).']
  ],
  cites: ['Ramakrishnan, R. y Gehrke, J. (2003). *Database Management Systems* (3.ª ed.), capítulos 8 y 9.', 'Stonebraker, M. (1981). Operating System Support for Database Management. *Communications of the ACM*, 24(7).', 'O’Neil, E., O’Neil, P. y Weikum, G. (1993). The LRU-K Page Replacement Algorithm for Database Disk Buffering. *SIGMOD 1993*.', 'Stonebraker, M. et al. (2005). C-Store: A Column-oriented DBMS. *VLDB 2005*.', 'Crotty, A., Leis, V. y Pavlo, A. (2022). Are You Sure You Want to Use MMAP in Your Database Management System? *CIDR 2022*.', 'Boncz, P., Zukowski, M. y Nes, N. (2005). MonetDB/X100: Hyper-Pipelining Query Execution. *CIDR 2005*.'],
  project: { t: 'Gestor de páginas y buffer pool',
    goal: 'Implementar la capa de almacenamiento de un motor de bases de datos.',
    steps: ['Implementa páginas con ranuras de 4 KB guardadas en un archivo: insertar, leer, borrar y compactar registros de longitud variable.', 'Implementa un archivo de montón con mapa de espacio libre.', 'Implementa un buffer pool con contadores de fijación, bit de sucia y reemplazo por reloj.', 'Mide la tasa de aciertos con una carga de lecturas aleatorias y con un recorrido completo intercalado, y compara LRU con reloj.', 'Explica cómo cambiaría el diseño para almacenamiento por columnas.'],
    deliver: 'El código, las pruebas y el informe con las mediciones.' },
  hito: ['Mide con las vistas de estadísticas de PostgreSQL el tamaño en páginas de las tablas e índices de PatioApp y la tasa de aciertos del buffer, y documenta los resultados.', 'Mueve los reportes analíticos pesados de PatioApp a una copia por columnas (por ejemplo, Parquet con DuckDB) y compara el tiempo con la consulta original.']
});

S('bd2', 'bd2.index', { title: 'Índices: árboles B+, hash y LSM',
  ask: '¿Qué concepto sobre índices se aplica?',
  lesson: `
> **La idea en simple.** Buscar un apellido en una guía telefónica no exige leerla entera: vas a la letra, luego a la página y luego a la línea. Un índice de base de datos es esa guía: una estructura ordenada que permite llegar a unas pocas filas entre millones leyendo solo tres o cuatro páginas. A cambio, cada vez que alguien se muda, hay que corregir la guía.

## Conceptos básicos
Un **índice** se construye sobre una **clave de búsqueda** (una o varias columnas) y guarda entradas que llevan desde un valor de la clave hasta las filas que lo tienen. Distinciones importantes:
- **Agrupado** (*clustered*) frente a **secundario**: en un índice agrupado, las filas de la tabla están físicamente ordenadas según la clave del índice (solo puede haber uno por tabla); en uno secundario, las entradas apuntan a filas que están en otro orden. En InnoDB, la tabla misma está organizada como un índice B+ por la clave primaria, y los índices secundarios guardan la clave primaria. PostgreSQL guarda las tablas como montones y todos sus índices son secundarios.
- **Denso** (una entrada por cada valor) frente a **disperso** (una entrada por página, posible solo si los datos están ordenados).
- **Único** o no: un índice único implementa PRIMARY KEY y UNIQUE.

## El árbol B y el árbol B+
Rudolf Bayer y Edward McCreight, de los laboratorios de Boeing, publicaron en 1972 el **árbol B**, y Douglas Comer lo llamó en 1979 *The Ubiquitous B-Tree*, "el omnipresente árbol B": casi todas las bases de datos y muchos sistemas de archivos lo usan. La variante que usan los motores es el **árbol B+**:
- Cada **nodo** ocupa una página y tiene muchas claves (cientos), con punteros a sus hijos: el **abanico** (*fanout*) es enorme.
- Todos los datos (o los punteros a las filas) están en las **hojas**; los nodos internos solo guían la búsqueda.
- Las hojas están **enlazadas** entre sí en orden, así que una búsqueda por rango encuentra la primera hoja y avanza por la lista.
- El árbol está siempre **balanceado**: todas las hojas a la misma profundidad. Al insertar en una hoja llena, se **divide** en dos y se sube una clave al padre; si el padre se llena, también se divide, y si la raíz se divide, el árbol crece un nivel. Cada nodo (salvo la raíz) se mantiene al menos medio lleno.
Con abanico f, un árbol de altura h indexa hasta unas fʰ entradas. Con f = 500, tres niveles cubren 125 millones de entradas y cuatro, más de 60 mil millones. Como la raíz y el segundo nivel suelen estar siempre en el buffer pool, una búsqueda puntual cuesta en la práctica una o dos lecturas de disco.
~~~js
// Altura de un árbol B+ y lecturas por búsqueda
const altura = (N, f) => Math.max(1, Math.ceil(Math.log(N) / Math.log(f)));
for (const N of [1e4, 1e6, 1e8, 1e10]) {
  const h = altura(N, 400);
  console.log(N.toExponential(0), 'entradas → altura', h, '→ lecturas por búsqueda puntual en índice secundario:', h + 1, '(nodos + página de la fila)');
}
~~~

## Índices compuestos y cubrientes
Un índice sobre (patio, fecha, placa) ordena primero por patio, luego por fecha dentro de cada patio, y así. Por eso sirve para condiciones sobre un **prefijo izquierdo**:
- «WHERE patio = 3»: sí.
- «WHERE patio = 3 AND fecha >= '2026-01-01'»: sí, y además devuelve en orden de fecha.
- «WHERE fecha >= '2026-01-01'» sola: no (o solo recorriendo el índice entero), porque las fechas están dispersas entre patios.
Regla práctica: primero las columnas de **igualdad** y después la de **rango**. Un índice es **cubriente** si contiene todas las columnas que la consulta necesita: el motor responde solo con el índice, sin visitar la tabla (*index-only scan*). Variantes útiles: índices **parciales** («WHERE salida IS NULL», solo las unidades que siguen en el patio) e índices sobre **expresiones** («lower(email)»).

## Índices hash
Un **índice hash** aplica una función hash a la clave y va directo al cubo correspondiente: búsquedas por igualdad en tiempo constante, pero **no sirve para rangos ni ordenamiento**. Para crecer sin rehacer todo existen el **hashing extensible** (Ronald Fagin y otros, 1979), que duplica un directorio de punteros y divide solo el cubo desbordado, y el **hashing lineal** (Witold Litwin, 1980), que divide los cubos de a uno en orden. En la práctica, los motores relacionales usan árboles B+ casi siempre y tablas hash sobre todo dentro de la ejecución de consultas (reuniones hash).

## Árboles LSM
Los árboles B+ modifican páginas en su lugar, lo que implica escrituras aleatorias. Patrick O'Neil y sus coautores propusieron en 1996 el **árbol LSM** (*log-structured merge-tree*), optimizado para escribir mucho:
1. Las escrituras van a una estructura ordenada en memoria (la **memtable**) y a un registro para la durabilidad.
2. Cuando se llena, se vuelca a disco como un archivo ordenado e inmutable (**SSTable**), en una escritura secuencial.
3. En segundo plano, la **compactación** fusiona archivos y descarta versiones viejas y borrados.
4. Una lectura puede tener que mirar varios archivos; un **filtro de Bloom** por archivo (Burton Bloom, 1970) dice con certeza cuándo una clave **no** está, evitando la mayoría de esas lecturas.
LevelDB (Google, 2011), RocksDB (Meta), Cassandra y muchas bases de series de tiempo usan LSM. El equilibrio clave es entre la **amplificación de escritura** (cuántas veces se reescribe cada dato por la compactación), la **de lectura** y la **de espacio**: los árboles B+ favorecen las lecturas y los LSM, las escrituras.

## Índices y concurrencia
Un árbol B+ lo modifican muchas transacciones a la vez, y una división de nodo toca varias páginas. Los motores protegen los nodos con **pestillos** (*latches*): candados livianos y de corta duración, distintos de los bloqueos de las transacciones. La técnica clásica es el **acoplamiento de pestillos** (*crabbing*): al bajar por el árbol se toma el pestillo del hijo y se suelta el del padre en cuanto se sabe que el hijo no se va a dividir. Philip Lehman y S. Bing Yao propusieron en 1981 el **árbol B-link**, con un puntero adicional al hermano derecho en cada nivel, que permite leer sin bloquear aunque otro hilo esté dividiendo un nodo; PostgreSQL implementa una variante.

## Otros índices
- **Mapas de bits:** un bit por fila para cada valor de una columna de pocos valores distintos (estado, tipo); se combinan con AND y OR rapidísimo. Comunes en análisis.
- **Índices invertidos:** de cada palabra a los documentos que la contienen, para búsqueda de texto (GIN en PostgreSQL, Elasticsearch).
- **Índices espaciales** (árboles R) para coordenadas, como la ubicación de los patios.

## El costo de los índices
Un índice no es gratis:
- Cada inserción, actualización o borrado debe mantener **todos** los índices de la tabla.
- Ocupa espacio en disco y en el buffer pool.
- Para condiciones **poco selectivas** (que devuelven, digamos, más del 10-20% de la tabla), un índice secundario es peor que un recorrido secuencial: cada fila encontrada puede costar una lectura aleatoria. El optimizador lo sabe y lo ignora.
La práctica correcta: crear índices a partir de las consultas reales y verificar con EXPLAIN que se usan; borrar los que nadie usa (las estadísticas del motor lo dicen).

## Ejemplo resuelto: índices para PatioApp
Consultas frecuentes: (1) buscar una unidad por placa, (2) listar las unidades que siguen en un patio por fecha de ingreso, (3) el reporte mensual por fechas. Índices:
- «UNIQUE (placa)» para la búsqueda (1): un árbol B+ de 3 niveles para 2 millones de placas.
- «(patio, ingreso) WHERE salida IS NULL»: compuesto con igualdad primero y rango después, y parcial, porque solo interesan las unidades presentes (unas 3000 de 2 millones), así que es diminuto.
- Para (3), que lee meses completos (muchas filas), no se crea índice: el recorrido secuencial o la copia por columnas son mejores.
Con EXPLAIN se verifica que (2) usa un «Index Scan» y no un «Seq Scan».`,
  links: [['m4.trees', 'los árboles balanceados y de búsqueda son la base de los árboles B+'], ['m10.index', 'esta unidad profundiza la introducción a índices de Bases de Datos I'], ['bd2.storage', 'cada nodo de un árbol B+ es una página del buffer pool']],
  read: 'Ramakrishnan y Gehrke, capítulos 10 y 11; Silberschatz, Korth y Sudarshan, capítulo 14; Comer (1979); O’Neil y otros (1996); Winand, *SQL Performance Explained*.',
  terms: [
    ['Índice agrupado', 'índice según cuyo orden están guardadas físicamente las filas de la tabla', ['InnoDB agrupa por la clave primaria.', 'Solo puede haber uno por tabla.', 'Hace muy baratas las búsquedas por rango de su clave.']],
    ['Árbol B+', 'árbol balanceado de nodos del tamaño de una página con todos los datos en hojas enlazadas', ['Tres niveles indexan cientos de millones de entradas.', 'Sirve para igualdad y rangos.', 'Se divide al llenarse un nodo.']],
    ['Abanico', 'cantidad de hijos que puede tener un nodo de un árbol B+', ['Con 500, tres niveles cubren 125 millones.', 'Depende del tamaño de página y de la clave.', 'Un abanico grande reduce la altura.']],
    ['Prefijo izquierdo', 'regla por la que un índice compuesto solo sirve para condiciones que incluyen sus primeras columnas', ['(patio, fecha) sirve para patio o patio y fecha.', 'No sirve para fecha sola.', 'Igualdades primero y rango al final.']],
    ['Índice cubriente', 'índice que contiene todas las columnas que una consulta necesita, de modo que no hace falta visitar la tabla', ['Permite un index-only scan.', 'Se agregan columnas con INCLUDE en PostgreSQL.', 'Ahorra lecturas aleatorias.']],
    ['Árbol LSM', 'estructura que acumula escrituras en memoria y las vuelca en archivos ordenados que luego se compactan', ['RocksDB y Cassandra lo usan.', 'Convierte escrituras aleatorias en secuenciales.', 'Usa filtros de Bloom para las lecturas.']],
    ['Filtro de Bloom', 'estructura probabilística que dice con certeza que un elemento no está en un conjunto, o que probablemente está', ['Evita leer archivos que no contienen la clave.', 'Puede dar falsos positivos, nunca falsos negativos.', 'Bloom lo propuso en 1970.']],
    ['Selectividad', 'fracción de filas de una tabla que cumplen una condición', ['placa = X tiene selectividad muy baja.', 'Con selectividad alta conviene recorrer la tabla.', 'El optimizador la estima con estadísticas.']]
  ],
  q: [
    ['Con abanico 100, ¿cuántos niveles necesita un árbol B+ para un millón de entradas?', '3', ['2', '4', '6'], '100³ = 1 000 000.', 2],
    ['Un índice compuesto (patio, fecha). ¿Para qué condición NO sirve bien?', 'WHERE fecha = ... sola', ['WHERE patio = 3', 'WHERE patio = 3 AND fecha = ...', 'WHERE patio = 3 ORDER BY fecha'], 'No incluye la primera columna del índice.', 3],
    ['¿Para qué consultas no sirve un índice hash?', 'Búsquedas por rango y ordenamiento', ['Búsquedas por igualdad', 'Claves únicas', 'Claves enteras'], 'El hash dispersa los valores sin orden.', 2],
    ['¿Qué ventaja principal tiene un árbol LSM sobre un árbol B+?', 'Escrituras mucho más baratas al hacerlas secuenciales', ['Lecturas siempre más rápidas', 'No necesita disco', 'No usa memoria'], 'Paga con compactación y lecturas más complejas.', 3],
    ['Una consulta devuelve el 40% de las filas. ¿Qué hará probablemente el optimizador aunque exista un índice secundario?', 'Un recorrido secuencial', ['Usar el índice obligatoriamente', 'Fallar', 'Crear otro índice'], 'Con baja selectividad, las lecturas aleatorias cuestan más.', 3],
    ['¿Qué permite un índice cubriente?', 'Responder la consulta sin visitar la tabla', ['Evitar el buffer pool', 'Eliminar la clave primaria', 'Ordenar al azar'], 'Index-only scan.', 2],
    ['¿Qué garantiza un filtro de Bloom?', 'Que si dice "no está", la clave no está', ['Que si dice "está", la clave está', 'Que nunca se equivoca', 'Que ordena las claves'], 'Puede tener falsos positivos, nunca falsos negativos.', 3],
    { tf: 'Agregar índices siempre acelera la base de datos.', v: false, e: 'Acelera algunas lecturas, pero encarece cada escritura y ocupa espacio.', l: 1 },
    { tf: 'En un árbol B+ todas las hojas están a la misma profundidad.', v: true, e: 'Es un árbol balanceado.', l: 2 },
    { c: 'Escribe «alturaBMas(N, f)»: la menor altura h ≥ 1 tal que f^h ≥ N.', f: 'alturaBMas', p: ['N', 'f'], t: [[[1000000, 100], 3], [[100, 100], 1], [[101, 100], 2], [[1000000000, 500], 4], [[1, 10], 1]], sol: '  let h = 1, cap = f;\n  while (cap < N) { cap *= f; h++; }\n  return h;', l: 2 },
    { c: 'Escribe «prefijoUsable(indice, filtro)»: indice es la lista ordenada de columnas del índice y filtro las columnas con igualdad en el WHERE; devuelve cuántas columnas iniciales del índice se pueden usar.', f: 'prefijoUsable', p: ['indice', 'filtro'], t: [[[['patio', 'fecha', 'placa'], ['patio', 'placa']], 1], [[['patio', 'fecha'], ['fecha']], 0], [[['a', 'b', 'c'], ['c', 'b', 'a']], 3]], sol: '  let n = 0;\n  while (n < indice.length && filtro.includes(indice[n])) n++;\n  return n;', l: 2 },
    { c: 'Escribe «lecturasBusqueda(N, f, cubriente)»: lecturas de una búsqueda puntual en un índice secundario B+: su altura, más una lectura de la tabla si no es cubriente.', f: 'lecturasBusqueda', p: ['N', 'f', 'cubriente'], t: [[[1000000, 100, false], 4], [[1000000, 100, true], 3], [[50, 100, false], 2]], sol: '  let h = 1, cap = f;\n  while (cap < N) { cap *= f; h++; }\n  return h + (cubriente ? 0 : 1);', l: 2 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var f = R.pick([50, 100, 200, 400, 500]), N = Math.pow(10, R.int(3, 10)), h = 1, c = f; while (c < N) { c *= f; h++; } g.input(3, '¿Cuántos niveles necesita un árbol B+ con abanico ' + f + ' para ' + N.toLocaleString('es-PE') + ' entradas?', h, 'La menor altura h con ' + f + '^h ≥ N.'); });
    var ix = [['Buscar una unidad por su placa exacta', 'Árbol B+ único sobre placa'], ['Listar las unidades presentes de un patio ordenadas por ingreso', 'Índice compuesto (patio, ingreso) parcial con salida IS NULL'], ['Registrar millones de lecturas de sensores por segundo', 'Árbol LSM'], ['Buscar inspecciones que contengan una palabra en sus observaciones', 'Índice invertido de texto'], ['Filtrar por una columna estado con tres valores posibles en un almacén analítico', 'Índice de mapa de bits'], ['Encontrar los patios a menos de 5 km de un punto', 'Índice espacial (árbol R)']];
    var is = ix.map(function (x) { return x[1]; });
    ix.forEach(function (x) { g.mcq(3, '¿Qué índice conviene? ' + x[0], x[1], g.R.sample(is.filter(function (y) { return y !== x[1]; }), 3), 'Cada estructura se ajusta a un patrón de acceso.'); });
    var pre = [[['patio', 'fecha'], 'WHERE patio = 3', 'Sí'], [['patio', 'fecha'], 'WHERE fecha > hoy', 'No'], [['patio', 'fecha'], 'WHERE patio = 3 AND fecha > hoy', 'Sí'], [['cliente', 'patio', 'fecha'], 'WHERE patio = 3 AND fecha > hoy', 'No'], [['cliente', 'patio'], 'WHERE cliente = 7', 'Sí']];
    pre.forEach(function (p) { g.mcq(3, 'Con un índice sobre (' + p[0].join(', ') + '), ¿sirve de forma directa para ' + p[1] + '?', p[2], [p[2] === 'Sí' ? 'No' : 'Sí', 'Solo si la tabla está vacía', 'Solo con un índice hash'], 'Regla del prefijo izquierdo.'); });
  },
  checks: [
    ['¿Por qué un árbol B+ de solo tres o cuatro niveles alcanza para miles de millones de filas?', 'Porque cada nodo es una página con cientos de claves, así que la capacidad crece como el abanico elevado a la altura.'],
    ['Explica la regla del prefijo izquierdo con un ejemplo.', 'Un índice (patio, fecha) ordena por patio y luego por fecha; sirve para patio o patio y fecha, pero no para fecha sola.'],
    ['¿Cuándo preferirías un árbol LSM a un árbol B+?', 'Cuando la carga es mayormente de escrituras masivas, como sensores o registros, y se acepta más costo en lecturas y compactación.'],
    ['¿Qué costos tiene agregar un índice?', 'Encarece cada inserción, actualización y borrado, ocupa disco y memoria, y puede no usarse si las consultas son poco selectivas.'],
    ['Diseña un índice para "unidades presentes en un patio ordenadas por ingreso" y justifícalo.', '(patio, ingreso) con la condición WHERE salida IS NULL: igualdad primero, rango después, y parcial porque solo indexa las unidades presentes.']
  ],
  cites: ['Bayer, R. y McCreight, E. (1972). Organization and Maintenance of Large Ordered Indexes. *Acta Informatica*, 1(3).', 'Comer, D. (1979). The Ubiquitous B-Tree. *ACM Computing Surveys*, 11(2).', 'O’Neil, P., Cheng, E., Gawlick, D. y O’Neil, E. (1996). The Log-Structured Merge-Tree (LSM-Tree). *Acta Informatica*, 33(4).', 'Fagin, R., Nievergelt, J., Pippenger, N. y Strong, H. R. (1979). Extendible Hashing: A Fast Access Method for Dynamic Files. *ACM Transactions on Database Systems*, 4(3).', 'Bloom, B. (1970). Space/Time Trade-offs in Hash Coding with Allowable Errors. *Communications of the ACM*, 13(7).', 'Winand, M. (2012). *SQL Performance Explained*. Markus Winand.', 'Lehman, P. y Yao, S. B. (1981). Efficient Locking for Concurrent Operations on B-Trees. *ACM Transactions on Database Systems*, 6(4).'],
  project: { t: 'Árbol B+ y comparación con LSM',
    goal: 'Implementar un árbol B+ y compararlo con una estructura LSM sencilla.',
    steps: ['Implementa un árbol B+ en memoria con orden configurable: inserción con divisiones, búsqueda puntual y búsqueda por rango con hojas enlazadas.', 'Verifica con pruebas que el árbol se mantiene balanceado y que las búsquedas por rango devuelven todo en orden.', 'Implementa un LSM mínimo con memtable, volcado a archivos ordenados, compactación y un filtro de Bloom por archivo.', 'Compara el tiempo de un millón de inserciones y de cien mil búsquedas en ambas estructuras.', 'En PostgreSQL, crea índices compuestos y parciales sobre una tabla grande y verifica con EXPLAIN cuándo se usan.'],
    deliver: 'El código, las pruebas, las mediciones y las salidas de EXPLAIN comentadas.' },
  hito: ['Revisa con EXPLAIN las consultas frecuentes de PatioApp y crea los índices necesarios (único por placa y compuesto parcial por patio e ingreso), verificando que se usan.', 'Consulta las estadísticas de uso de índices de PatioApp, elimina los que no se usan y mide el efecto en la velocidad de inserción.']
});

S('bd2', 'bd2.query', { title: 'Procesamiento y optimización de consultas',
  ask: '¿Qué concepto de procesamiento u optimización de consultas se aplica?',
  lesson: `
> **La idea en simple.** Cuando le pides a un GPS que te lleve a algún lugar, no le dices por qué calles ir: él compara miles de rutas posibles con lo que sabe del tráfico y elige una. Un optimizador de consultas hace lo mismo con tu SQL: considera muchas formas de ejecutarlo y elige la que estima más barata. Y como el GPS, se equivoca cuando su información está desactualizada.

## Del texto al resultado
Una consulta pasa por varias etapas:
1. **Análisis sintáctico:** el texto se convierte en un árbol.
2. **Análisis semántico:** se verifican tablas, columnas, tipos y permisos.
3. **Reescritura:** se expanden las vistas y se aplican transformaciones seguras (desanidar subconsultas, simplificar condiciones).
4. **Optimización:** se genera un **plan físico**, eligiendo algoritmos y orden de operaciones.
5. **Ejecución.**
Un **plan lógico** dice qué operaciones del álgebra se hacen; un **plan físico** dice con qué algoritmo concreto: recorrido secuencial o por índice, reunión por bucles anidados, por hash o por mezcla.

## El modelo de iteradores
Goetz Graefe describió en 1994 el **modelo Volcano**: cada operador es un iterador con tres operaciones, open, next y close. El operador raíz pide filas a sus hijos con next, y estos a los suyos, de modo que las filas **fluyen** por el plan una a una sin guardar resultados intermedios completos (**encadenamiento**, *pipelining*). Algunos operadores, como el ordenamiento o la construcción de una tabla hash, deben consumir toda su entrada antes de producir (**operadores bloqueantes**). Los motores analíticos modernos pasan bloques de miles de valores en lugar de filas sueltas (ejecución **vectorizada**) o compilan el plan a código de máquina.

## Caminos de acceso
- **Recorrido secuencial:** leer todas las páginas; costo P (páginas), con lecturas secuenciales.
- **Recorrido por índice:** bajar por el árbol y seguir a las filas; bueno con pocas filas.
- **Recorrido solo de índice:** con un índice cubriente.
- **Recorrido por mapa de bits** (PostgreSQL): reunir primero las posiciones de las filas desde uno o varios índices, ordenarlas por página y luego visitar cada página una sola vez.

## Ordenar datos que no caben en memoria
El **ordenamiento externo por mezcla** divide la tabla de N páginas en tramos que caben en los B marcos del buffer, ordena cada tramo y luego los mezcla en pasadas sucesivas de B − 1 tramos a la vez. La cantidad de pasadas es 1 + ⌈log_(B−1) ⌈N/B⌉⌉, y cada pasada lee y escribe todo: 2N lecturas y escrituras de páginas. Con un buffer razonable, casi cualquier tabla se ordena en dos pasadas. Se usa para ORDER BY, para algunos GROUP BY y para la reunión por mezcla.

## Algoritmos de reunión
Para reunir R (M páginas) y S (N páginas) con un buffer de B páginas:
| Algoritmo | Idea | Costo aproximado en páginas |
| Bucles anidados por bloques | por cada bloque de B − 2 páginas de R, recorrer S entero | M + ⌈M / (B − 2)⌉ × N |
| Bucles anidados con índice | por cada fila de R, buscar en un índice de S | M + filas de R × costo de la búsqueda |
| Ordenamiento y mezcla | ordenar ambas por la clave y recorrerlas juntas | ordenar + M + N (unas 3(M + N) si cada orden cabe en dos pasadas) |
| Hash | construir una tabla hash con la menor y sondear con la otra | M + N si la menor cabe en memoria; unas 3(M + N) con particionado (hash de Grace) |
El costo de los bucles anidados depende mucho de cuál tabla va afuera: conviene que la **exterior** sea la más pequeña. El hash es excelente para reuniones por igualdad sin índices; la mezcla, si los datos ya vienen ordenados; los bucles con índice, si una tabla es pequeña y la otra tiene índice sobre la clave.
~~~js
// Costo en páginas de reunir R (M páginas) y S (N páginas) con B marcos de buffer
const bnlj = (M, N, B) => M + Math.ceil(M / (B - 2)) * N;
const hashJoin = (M, N, B) => (Math.min(M, N) <= B - 2 ? M + N : 3 * (M + N));
const casos = [[1000, 500, 102], [1000, 500, 12], [50, 100000, 102]];
for (const [M, N, B] of casos)
  console.log('M =', M, 'N =', N, 'B =', B, '→ bucles por bloques:', bnlj(M, N, B), '· hash:', hashJoin(M, N, B));
~~~

## El optimizador basado en costos
Patricia Selinger y sus colegas de IBM describieron en 1979 el optimizador de **System R**, el modelo que siguen todos los motores relacionales:
- Un **modelo de costos** que estima entrada y salida más procesador para cada plan.
- **Estimación de cardinalidad:** cuántas filas producirá cada operador, a partir de **estadísticas** (cantidad de filas, valores distintos, histogramas). Para una igualdad sobre una columna con d valores distintos, se estima 1/d de las filas; para condiciones sin estadísticas, System R usaba valores por defecto como 1/10.
- **Enumeración de órdenes de reunión con programación dinámica:** el mejor plan para reunir un conjunto de tablas se construye a partir de los mejores planes de sus subconjuntos. System R consideraba solo **árboles profundos a la izquierda**, que permiten encadenar, y guardaba planes con **órdenes interesantes** (resultados ya ordenados que ahorran un ordenamiento posterior).
El número de órdenes posibles crece de forma factorial con las tablas, así que para consultas con muchas tablas se usan heurísticas o búsquedas aproximadas.

## Por qué los optimizadores se equivocan
Viktor Leis y sus coautores publicaron en 2015 *How Good Are Query Optimizers, Really?*, con un banco de pruebas basado en la base de datos de películas IMDb. Encontraron que los errores de **estimación de cardinalidad** son la causa principal de los planes malos, mucho más que el modelo de costos: las estimaciones podían errar en varios órdenes de magnitud, sobre todo porque los motores suponen que las columnas son **independientes** (que la marca y el modelo de un vehículo no están correlacionados, por ejemplo). Consecuencias prácticas:
- Mantener las **estadísticas actualizadas** («ANALYZE» en PostgreSQL), sobre todo tras cargas grandes.
- Crear **estadísticas extendidas** para columnas correlacionadas.
- Leer los planes comparando filas **estimadas** y **reales**.

## Más allá de la optimización estática
Como las estimaciones fallan, los motores modernos se corrigen en la marcha: la **ejecución adaptativa** cambia de algoritmo si descubre que una entrada es mucho mayor de lo esperado, y algunos sistemas guardan la **retroalimentación** de ejecuciones anteriores para mejorar las próximas estimaciones.

## Leer un plan
En PostgreSQL, «EXPLAIN» muestra el plan elegido con sus costos estimados y «EXPLAIN ANALYZE» además lo ejecuta y muestra los tiempos y las filas reales de cada nodo. Señales de alerta:
- Una gran diferencia entre filas estimadas y reales.
- Un «Seq Scan» sobre una tabla grande con una condición muy selectiva (falta un índice o no se usa).
- Un «Nested Loop» con miles de iteraciones sobre una tabla grande sin índice.
- Ordenamientos que se derraman a disco («external merge»): falta memoria de trabajo o falta un índice que ya dé el orden.

## Ejemplo resuelto: la consulta lenta de inspecciones
"Las inspecciones del último mes de unidades Toyota del patio 3" tardaba 9 segundos. EXPLAIN ANALYZE mostró un Seq Scan sobre 4 millones de inspecciones y una estimación de 120 filas de unidades Toyota en el patio 3 cuando en realidad había 18 000 (la marca y el patio están correlacionados: ese patio trabaja con un concesionario Toyota). Con 120 filas, el optimizador eligió bucles anidados; con 18 000 eran 18 000 búsquedas. Soluciones aplicadas: estadísticas extendidas sobre (marca, patio), un índice sobre inspeccion(fecha) y «ANALYZE». El nuevo plan usa una reunión hash entre las unidades filtradas y las inspecciones del mes obtenidas por el índice de fecha: 80 milisegundos.`,
  links: [['bd2.algebra', 'las equivalencias del álgebra permiten generar planes alternativos'], ['bd2.index', 'el optimizador decide si usar o no cada índice'], ['m4.dp', 'el optimizador de System R enumera órdenes de reunión con programación dinámica']],
  read: 'Ramakrishnan y Gehrke, capítulos 12 a 15; Selinger y otros (1979); Graefe (1994); Leis y otros (2015); documentación de EXPLAIN de PostgreSQL.',
  terms: [
    ['Plan físico', 'descripción ejecutable de una consulta con los algoritmos concretos de cada operación', ['Hash Join entre unidades e inspecciones.', 'Index Scan sobre fecha.', 'EXPLAIN lo muestra.']],
    ['Modelo de iteradores', 'modelo de ejecución en que cada operador ofrece open, next y close y las filas fluyen de los hijos al padre', ['Graefe lo describió como Volcano.', 'Permite encadenar sin guardar intermedios.', 'Los ordenamientos son operadores bloqueantes.']],
    ['Ordenamiento externo', 'ordenamiento de datos mayores que la memoria por tramos ordenados que se mezclan en pasadas', ['Se usa en ORDER BY grandes.', 'Cada pasada lee y escribe todo.', 'Con buen buffer bastan dos pasadas.']],
    ['Reunión por hash', 'algoritmo que construye una tabla hash con una relación y la sondea con la otra', ['Excelente para igualdades sin índices.', 'Cuesta M + N si la menor cabe en memoria.', 'Con particionado se llama hash de Grace.']],
    ['Bucles anidados por bloques', 'reunión que, por cada bloque de páginas de la relación exterior, recorre la interior entera', ['Su costo es M + ⌈M/(B − 2)⌉ × N.', 'Conviene poner afuera la relación menor.', 'Mejora mucho con más memoria.']],
    ['Estimación de cardinalidad', 'predicción de cuántas filas producirá cada operador del plan', ['Usa histogramas y valores distintos.', 'Sus errores causan la mayoría de los planes malos.', 'Supone independencia entre columnas.']],
    ['Orden interesante', 'orden de un resultado intermedio que puede ahorrar un ordenamiento posterior', ['Una reunión por mezcla deja datos ordenados para un ORDER BY.', 'System R guardaba planes por orden.', 'Un índice puede producirlo.']],
    ['EXPLAIN ANALYZE', 'comando que ejecuta una consulta y muestra el plan con tiempos y filas reales por nodo', ['Revela estimaciones equivocadas.', 'Muestra si un orden se derramó a disco.', 'Es la herramienta principal de ajuste.']]
  ],
  q: [
    ['R tiene 1000 páginas, S 500 y el buffer 102. ¿Cuánto cuesta la reunión por bucles anidados por bloques con R afuera?', '6000', ['1500', '500 000', '4500'], '1000 + ⌈1000/100⌉ × 500 = 1000 + 5000.', 3],
    ['Con el mismo caso, ¿cuánto cuesta una reunión hash con particionado (3(M + N))?', '4500', ['1500', '6000', '3000'], '3 × 1500.', 3],
    ['¿Por qué conviene que la relación exterior de los bucles anidados sea la más pequeña?', 'Porque la interior se recorre una vez por cada bloque de la exterior', ['Porque la exterior se lee más rápido', 'Porque así se usa el índice', 'No importa'], 'Menos bloques exteriores, menos recorridos de la interior.', 3],
    ['Según Leis y otros (2015), ¿cuál es la causa principal de los planes malos?', 'Los errores de estimación de cardinalidad', ['El modelo de costos del disco', 'La falta de memoria', 'El lenguaje SQL'], 'Las estimaciones fallan en órdenes de magnitud.', 4],
    ['Una columna tiene 50 valores distintos y la tabla 10 000 filas. ¿Cuántas filas estima el optimizador para una igualdad?', '200', ['50', '10 000', '1000'], '10 000 / 50, suponiendo distribución uniforme.', 2],
    ['¿Qué tipo de árboles de reunión consideraba System R?', 'Profundos a la izquierda', ['Arbustivos completos', 'Solo reuniones de dos tablas', 'Aleatorios'], 'Permiten encadenar la ejecución.', 4],
    ['En EXPLAIN ANALYZE, un nodo estima 100 filas y produce 100 000. ¿Qué conviene revisar primero?', 'Las estadísticas de la tabla y las correlaciones entre columnas', ['El lenguaje de la aplicación', 'El tamaño del disco', 'La versión del navegador'], 'Una mala estimación lleva a algoritmos inadecuados.', 3],
    { tf: 'Un ordenamiento es un operador bloqueante: debe consumir toda su entrada antes de producir resultados.', v: true, e: 'No puede saber cuál es la primera fila sin ver todas.', l: 2 },
    { tf: 'El optimizador garantiza siempre el plan óptimo.', v: false, e: 'Estima costos con estadísticas imperfectas y limita la búsqueda.', l: 2 },
    { o: 'Ordena las etapas del procesamiento de una consulta.', s: ['Análisis sintáctico', 'Análisis semántico', 'Reescritura', 'Optimización', 'Ejecución'], e: 'Del texto al plan físico ejecutado.', l: 2 },
    { c: 'Escribe «costoBNLJ(M, N, B)»: costo en páginas de la reunión por bucles anidados por bloques con la relación de M páginas afuera.', f: 'costoBNLJ', p: ['M', 'N', 'B'], t: [[[1000, 500, 102], 6000], [[1000, 500, 3], 501000], [[10, 1000, 12], 1010]], sol: '  return M + Math.ceil(M / (B - 2)) * N;', l: 2 },
    { c: 'Escribe «pasadasOrden(N, B)»: pasadas del ordenamiento externo, 1 + ⌈log_(B−1) ⌈N/B⌉⌉ (si ⌈N/B⌉ = 1, una sola pasada).', f: 'pasadasOrden', p: ['N', 'B'], t: [[[108, 5], 4], [[1000, 1000], 1], [[900000, 1000], 2], [[1000000, 10], 7]], sol: '  let tramos = Math.ceil(N / B), p = 1;\n  while (tramos > 1) { tramos = Math.ceil(tramos / (B - 1)); p++; }\n  return p;', h: 'Primera pasada: tramos de B páginas; cada pasada siguiente mezcla de a B − 1.', l: 4 },
    { c: 'Escribe «estimarIgualdad(filas, distintos)»: filas estimadas para una igualdad con distribución uniforme, redondeadas al entero.', f: 'estimarIgualdad', p: ['filas', 'distintos'], t: [[[10000, 50], 200], [[1000, 3], 333], [[5, 10], 1]], sol: '  return Math.max(1, Math.round(filas / distintos));', l: 1 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var M = R.pick([100, 500, 1000, 5000]), N = R.pick([200, 1000, 10000]), B = R.pick([12, 52, 102, 502]); g.input(3, 'R tiene ' + M + ' páginas, S tiene ' + N + ' y hay ' + B + ' marcos. ¿Cuánto cuesta la reunión por bucles anidados por bloques con R afuera?', M + Math.ceil(M / (B - 2)) * N, M + ' + ⌈' + M + '/' + (B - 2) + '⌉ × ' + N + '.'); });
    g.times(5, function (R) { var f = R.pick([1000, 50000, 2000000]), d = R.pick([2, 10, 100, 1000]); g.input(2, 'Una tabla tiene ' + f + ' filas y una columna con ' + d + ' valores distintos. ¿Cuántas filas estima el optimizador para una igualdad sobre esa columna?', Math.round(f / d), f + ' / ' + d + '.'); });
    var alg = [['Reunir dos tablas grandes por igualdad sin índices', 'Reunión por hash'], ['Reunir una tabla de 10 filas con una enorme que tiene índice sobre la clave', 'Bucles anidados con índice'], ['Reunir dos tablas que ya vienen ordenadas por la clave', 'Ordenamiento y mezcla'], ['Reunir con una condición de desigualdad compleja sin índices', 'Bucles anidados por bloques']];
    alg.forEach(function (a) { g.mcq(3, '¿Qué algoritmo de reunión conviene? ' + a[0], a[1], ['Reunión por hash', 'Bucles anidados con índice', 'Ordenamiento y mezcla', 'Bucles anidados por bloques'].filter(function (x) { return x !== a[1]; }), 'Cada algoritmo brilla en un escenario.'); });
  },
  checks: [
    ['Diferencia plan lógico y plan físico.', 'El lógico indica las operaciones del álgebra; el físico, los algoritmos concretos (recorridos, tipos de reunión, ordenamientos) y su orden.'],
    ['Explica el modelo de iteradores y qué es un operador bloqueante.', 'Cada operador pide filas a sus hijos con next y las entrega a su padre; un operador bloqueante, como el ordenamiento, debe consumir toda su entrada antes de producir.'],
    ['Compara los costos de bucles anidados por bloques y de hash con M = 1000, N = 500 y B = 102.', 'Bucles: 1000 + 10 × 500 = 6000; hash con particionado: 3 × 1500 = 4500, o 1500 si la menor cabe en memoria.'],
    ['¿Qué aportó el optimizador de System R?', 'El modelo de costos con estimación de cardinalidad por estadísticas y la enumeración de órdenes de reunión con programación dinámica y órdenes interesantes.'],
    ['¿Qué buscarías en un EXPLAIN ANALYZE de una consulta lenta?', 'Diferencias grandes entre filas estimadas y reales, recorridos secuenciales selectivos, bucles anidados enormes sin índice y ordenamientos en disco.']
  ],
  cites: ['Selinger, P. G. et al. (1979). Access Path Selection in a Relational Database Management System. *SIGMOD 1979*.', 'Graefe, G. (1994). Volcano: An Extensible and Parallel Query Evaluation System. *IEEE Transactions on Knowledge and Data Engineering*, 6(1).', 'Leis, V. et al. (2015). How Good Are Query Optimizers, Really? *Proceedings of the VLDB Endowment*, 9(3).', 'Ramakrishnan, R. y Gehrke, J. (2003). *Database Management Systems* (3.ª ed.), capítulos 12 a 15.', 'Kitsuregawa, M., Tanaka, H. y Moto-oka, T. (1983). Application of Hash to Data Base Machine and Its Architecture. *New Generation Computing*, 1(1).'],
  project: { t: 'Ejecutor y optimizador en miniatura',
    goal: 'Implementar operadores físicos y un optimizador sencillo basado en costos.',
    steps: ['Implementa con el modelo de iteradores los operadores recorrido, selección, proyección, bucles anidados por bloques, reunión hash y ordenamiento.', 'Cuenta las páginas leídas por cada operador y compara los algoritmos de reunión con distintos tamaños y memorias.', 'Implementa un estimador de cardinalidad con valores distintos y la suposición de independencia.', 'Implementa la elección del orden de reunión de tres a cinco tablas con programación dinámica sobre árboles profundos a la izquierda.', 'En PostgreSQL, compara tus estimaciones con EXPLAIN y documenta un caso de correlación que engañe al optimizador.'],
    deliver: 'El código, las mediciones y el informe con los planes comparados.' },
  hito: ['Encuentra con EXPLAIN ANALYZE las tres consultas más lentas de PatioApp, explica sus planes y corrígelas con índices, estadísticas o reescritura.', 'Agrega estadísticas extendidas para columnas correlacionadas de PatioApp (por ejemplo, marca y patio) y muestra cómo mejora la estimación de filas.']
});
})();
