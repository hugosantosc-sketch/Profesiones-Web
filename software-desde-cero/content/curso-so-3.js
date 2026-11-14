(function () {
var S = SDC.S;

S('so', 'so.mem', { title: 'Administración de memoria: espacios de direcciones y paginación',
  ask: '¿Qué concepto de administración de memoria se aplica?',
  lesson: `
> **La idea en simple.** Cada programa cree vivir en una ciudad entera donde las calles van del 0 al infinito. En realidad todos comparten la misma ciudad física, pero un cartero mágico (la **MMU**) traduce cada dirección "imaginaria" a una casa real distinta para cada programa. Así nadie entra a la casa de otro, y cada uno escribe sus programas como si fuera el único habitante.

## El espacio de direcciones
El sistema operativo da a cada proceso un **espacio de direcciones virtual**: una vista privada de la memoria que empieza en 0 y contiene el código, los datos, el montículo y la pila. Las direcciones que usa el programa son **virtuales**; la **unidad de administración de memoria** (MMU), un circuito del procesador, las traduce a **físicas** en cada acceso, con ayuda de estructuras que prepara el sistema operativo. Objetivos, según OSTEP:
- **Transparencia:** el programa no nota la traducción.
- **Eficiencia:** la traducción debe ser rapidísima y no desperdiciar memoria.
- **Protección:** un proceso no puede leer ni escribir la memoria de otro ni la del núcleo.

## Primer intento: base y límite
La forma más simple de traducir es la **reubicación dinámica**: el procesador tiene un registro **base** y uno **límite**. Cada dirección virtual se compara con el límite (si es mayor, excepción) y se le suma la base. Es rápido, pero obliga a reservar un bloque contiguo para todo el espacio de direcciones, incluido el gran hueco entre el montículo y la pila, que casi nunca se usa.

## Segmentación
La **segmentación** usa un par base-límite por cada **segmento** lógico: código, montículo y pila. Así el hueco entre montículo y pila no ocupa memoria física, y el código puede compartirse entre procesos marcándolo de solo lectura. Su problema es la **fragmentación externa**: con segmentos de tamaños variables, la memoria libre queda partida en huecos pequeños, y una petición grande puede fallar aunque la suma de huecos alcance. Compactar (mover segmentos para juntar los huecos) es costoso.

## Administrar el espacio libre
Dentro del montículo de un programa (lo que hace «malloc») o al asignar segmentos, hay que elegir qué hueco usar:
- **Primer ajuste:** el primer hueco que alcance; rápido.
- **Mejor ajuste:** el hueco más pequeño que alcance; deja astillas diminutas.
- **Peor ajuste:** el más grande; deja huecos más usables pero suele rendir mal.
- **Sistema de compañeros** (*buddy*, Kenneth Knowlton, 1965): divide la memoria en bloques de potencias de 2; al liberar, un bloque se fusiona con su "compañero" si está libre. Linux lo usa para asignar páginas físicas.
- **Asignador por losas** (*slab*, Jeff Bonwick, 1994): mantiene cachés de objetos del mismo tamaño (por ejemplo, estructuras de procesos) para crearlos y destruirlos sin fragmentación.

## Paginación
La **paginación** elimina la fragmentación externa dividiendo todo en trozos del mismo tamaño:
- El espacio virtual se divide en **páginas** (típicamente de 4 KB).
- La memoria física se divide en **marcos** del mismo tamaño.
- Una **tabla de páginas** por proceso dice en qué marco está cada página.
Una dirección virtual se parte en dos: el **número de página virtual** (VPN, los bits altos) y el **desplazamiento** (los bits bajos, que no cambian). Con páginas de 4096 = 2¹² bytes, los 12 bits bajos son el desplazamiento.
:::flow dirección virtual | VPN = dirección ÷ tamaño de página | marco = tabla[VPN] | física = marco × tamaño + desplazamiento
Cada **entrada de la tabla** contiene el número de marco y bits de control: **válido** (la página pertenece al espacio del proceso), **presente** (está en memoria y no en disco), **protección** (lectura, escritura, ejecución; el bit NX impide ejecutar datos), **sucio** (fue modificada) y **referenciado** (fue usada recientemente). Lo que desperdicia la paginación es la **fragmentación interna**: en promedio, media página al final de cada región.
~~~js
// Traducción con una tabla de páginas de un nivel. −1 marca una página no válida.
const PAGINA = 4096, tabla = [3, 7, -1, 12];
function traducir(dv) {
  const vpn = Math.floor(dv / PAGINA), desp = dv % PAGINA;
  if (vpn >= tabla.length || tabla[vpn] < 0) return 'fallo de segmentación (página ' + vpn + ' no válida)';
  return 'VPN ' + vpn + ', desplazamiento ' + desp + ' → física ' + (tabla[vpn] * PAGINA + desp);
}
[0, 5000, 9000, 13000, 20000].forEach(d => console.log(d, '→', traducir(d)));
~~~

## El tamaño de las tablas: tablas multinivel
Con direcciones de 32 bits y páginas de 4 KB hay 2²⁰ (más de un millón) de páginas posibles; con entradas de 4 bytes, la tabla ocupa 4 MB **por proceso**, aunque el proceso use poca memoria. Con 64 bits sería imposible. La solución es la **tabla de páginas multinivel**: la tabla se divide en páginas, y un **directorio** apunta solo a las partes que se usan. Las regiones vacías no ocupan nada. x86-64 usa cuatro niveles para direcciones virtuales de 48 bits (y opcionalmente cinco niveles para 57 bits). El costo: una traducción sin ayuda requiere leer un nivel de tabla por cada nivel, es decir, varios accesos a memoria por cada acceso del programa. Una alternativa es la **tabla invertida**: una entrada por marco físico, buscada con una tabla hash.

## La TLB: la caché de traducciones
Si cada acceso a memoria necesitara antes leer la tabla de páginas, todo iría al menos dos veces más lento. La **TLB** (*translation lookaside buffer*) es una pequeña caché dentro de la MMU con las traducciones recientes (decenas o pocos miles de entradas). Gracias a la **localidad** (los programas acceden repetidamente a las mismas páginas), su tasa de aciertos suele superar el 99%. El **tiempo efectivo de acceso** con una tabla de un nivel:
:::flow TEA = h × (t_TLB + t_mem) + (1 − h) × (t_TLB + 2 × t_mem)
Con h = 0.98, t_TLB = 20 ns y t_mem = 100 ns: 0.98 × 120 + 0.02 × 220 = 122 ns, solo un 22% más que un acceso directo. Al cambiar de proceso, la TLB tiene traducciones del anterior: o se vacía o cada entrada se etiqueta con un **identificador de espacio de direcciones** (ASID). En máquinas multinúcleo, cuando el sistema cambia una tabla debe invalidar las entradas en las TLB de los demás núcleos (*TLB shootdown*), una operación costosa.

## Compartir y proteger con páginas
La paginación también resuelve la protección y la compartición con el mismo mecanismo:
- Dos procesos pueden tener entradas que apuntan al **mismo marco**: así se comparte el código de una biblioteca o una región de memoria compartida, sin copiar nada.
- Los bits de permiso de cada entrada permiten marcar el código como lectura y ejecución, y los datos como lectura y escritura sin ejecución (**W^X**: nunca escribible y ejecutable a la vez), lo que frustra muchos ataques que inyectan código.
- Con **ASLR** (aleatorización del espacio de direcciones), el sistema coloca la pila, el montículo y las bibliotecas en posiciones distintas en cada ejecución, para que un atacante no pueda adivinar direcciones.
- El núcleo se mapea en la parte alta de cada espacio de direcciones con páginas accesibles solo en modo núcleo; tras la vulnerabilidad **Meltdown** (2018), los sistemas separaron aún más esas tablas.

## Páginas grandes
Además de páginas de 4 KB, x86-64 admite páginas de 2 MB y 1 GB (**páginas enormes**). Con ellas una sola entrada de la TLB cubre mucha más memoria, lo que acelera bases de datos y máquinas virtuales que recorren grandes regiones. Linux las ofrece explícitamente («hugetlbfs») o de forma automática con *transparent huge pages*.

## Ejemplo resuelto: traducir una dirección
Un sistema usa páginas de 1 KB (2¹⁰ bytes) y la tabla de un proceso es [5, 2, 9, 0]. ¿A qué dirección física corresponde la virtual 2600?
1. VPN = ⌊2600 / 1024⌋ = 2; desplazamiento = 2600 − 2048 = 552.
2. La tabla dice que la página 2 está en el marco 9.
3. Física = 9 × 1024 + 552 = 9768.
¿Y la 4200? VPN = 4, fuera de la tabla de 4 entradas: la MMU genera una excepción y el sistema envía al proceso la señal SIGSEGV (fallo de segmentación), que es exactamente lo que ves cuando un programa en C accede a un puntero inválido.`,
  links: [['arq.mem', 'la jerarquía de memoria y las cachés explican por qué la localidad hace eficiente a la TLB'], ['so.proc', 'cada proceso tiene su propio espacio de direcciones'], ['m1.data', 'las direcciones son números binarios que se parten en campos de bits']],
  read: 'OSTEP, capítulos 13 a 20 (Address Spaces hasta Paging: Smaller Tables); Silberschatz, capítulo 9.',
  terms: [
    ['Dirección virtual', 'dirección que usa un programa dentro de su propio espacio y que la MMU traduce a una física', ['Dos procesos usan la dirección 4096 y llegan a lugares distintos.', 'Empieza en 0 para cada proceso.', 'El programa nunca ve la dirección física.']],
    ['MMU', 'circuito del procesador que traduce direcciones virtuales a físicas y verifica permisos en cada acceso', ['Consulta la TLB y la tabla de páginas.', 'Genera una excepción ante una página no válida.', 'La configura el sistema operativo.']],
    ['Paginación', 'esquema que divide la memoria virtual en páginas y la física en marcos del mismo tamaño', ['Páginas de 4 KB en x86.', 'Elimina la fragmentación externa.', 'Necesita una tabla de páginas por proceso.']],
    ['Tabla de páginas', 'estructura por proceso que indica en qué marco físico está cada página virtual y con qué permisos', ['La entrada 2 dice que la página 2 está en el marco 9.', 'Incluye bits de válido, presente y sucio.', 'Puede organizarse en varios niveles.']],
    ['TLB', 'caché pequeña de la MMU con las traducciones de páginas usadas recientemente', ['Con 99% de aciertos, la traducción casi no cuesta.', 'Se vacía o se etiqueta con ASID al cambiar de proceso.', 'Aprovecha la localidad de los accesos.']],
    ['Fragmentación externa', 'memoria libre dividida en huecos tan pequeños que no sirven para peticiones grandes', ['Hay 10 MB libres pero ningún hueco de 2 MB.', 'Afecta a la segmentación.', 'La paginación la elimina.']],
    ['Fragmentación interna', 'espacio desperdiciado dentro de un bloque asignado porque el bloque es más grande que lo pedido', ['Media página perdida al final de una región.', 'Páginas más grandes la aumentan.', 'Afecta a la paginación.']],
    ['Tabla de páginas multinivel', 'tabla de páginas dividida en partes con un directorio que solo apunta a las partes usadas', ['x86-64 usa cuatro niveles.', 'Las regiones vacías no ocupan memoria.', 'Cada nivel agrega un acceso si falla la TLB.']]
  ],
  q: [
    ['Con páginas de 4 KB, ¿cuántos bits de la dirección son el desplazamiento?', '12', ['4', '10', '20'], '4096 = 2¹².', 2],
    ['Con direcciones de 32 bits y páginas de 4 KB, ¿cuántas entradas tiene una tabla de un nivel?', '1048576', ['4096', '65536', '4294967296'], '2³² / 2¹² = 2²⁰.', 3],
    ['¿Qué problema resuelve la paginación frente a la segmentación?', 'La fragmentación externa', ['La fragmentación interna', 'La necesidad de una MMU', 'Los cambios de contexto'], 'Todos los bloques tienen el mismo tamaño.', 2],
    ['TLB con 90% de aciertos, 10 ns la TLB y 100 ns la memoria, tabla de un nivel. ¿Cuál es el tiempo efectivo de acceso?', '120 ns', ['110 ns', '200 ns', '100 ns'], '0.9 × 110 + 0.1 × 210 = 99 + 21.', 4],
    ['¿Para qué sirve el ASID en las entradas de la TLB?', 'Para no vaciar la TLB en cada cambio de proceso, distinguiendo a quién pertenece cada traducción', ['Para cifrar las direcciones', 'Para contar los accesos', 'Para elegir la página a reemplazar'], 'Address Space Identifier.', 3],
    ['¿Por qué se usan tablas de páginas multinivel?', 'Porque una tabla de un nivel ocupa mucho aunque el proceso use poca memoria', ['Porque son más rápidas', 'Para eliminar la TLB', 'Para permitir páginas de tamaño variable'], 'Solo existen las partes de la tabla que se usan.', 3],
    ['¿Qué asignador usa Linux para entregar páginas físicas contiguas?', 'El sistema de compañeros (buddy)', ['Primer ajuste', 'Peor ajuste', 'Round Robin'], 'Bloques de potencias de 2 que se dividen y fusionan.', 3],
    { tf: 'El desplazamiento dentro de la página es igual en la dirección virtual y en la física.', v: true, e: 'Solo cambia el número de página por el de marco.', l: 2 },
    { tf: 'Las páginas enormes reducen la presión sobre la TLB porque una entrada cubre más memoria.', v: true, e: 'Por eso las usan bases de datos y máquinas virtuales.', l: 3 },
    { c: 'Escribe «traducir(dv, tamPagina, tabla)»: tabla[vpn] es el marco o −1 si no es válida; devuelve la dirección física o −1 si la página no es válida o está fuera de la tabla.', f: 'traducir', p: ['dv', 'tamPagina', 'tabla'], t: [[[5000, 4096, [3, 7]], 29576], [[100, 4096, [2]], 8292], [[9000, 4096, [1, -1, 5]], 21288], [[4500, 4096, [1, -1]], -1], [[2600, 1024, [5, 2, 9, 0]], 9768], [[4200, 1024, [5, 2, 9, 0]], -1]], sol: '  const vpn = Math.floor(dv / tamPagina), d = dv % tamPagina;\n  if (vpn >= tabla.length || tabla[vpn] < 0) return -1;\n  return tabla[vpn] * tamPagina + d;', l: 2 },
    { c: 'Escribe «tiempoEfectivo(h, tTLB, tMem)» con una tabla de un nivel: h·(tTLB + tMem) + (1 − h)·(tTLB + 2·tMem), redondeado a 2 decimales.', f: 'tiempoEfectivo', p: ['h', 'tTLB', 'tMem'], t: [[[0.8, 20, 100], 140], [[0.98, 20, 100], 122], [[1, 0, 100], 100], [[0.9, 10, 100], 120]], sol: '  return Math.round((h * (tTLB + tMem) + (1 - h) * (tTLB + 2 * tMem)) * 100) / 100;', l: 2 },
    { c: 'Escribe «entradasTabla(bitsDir, tamPagina)» con la cantidad de entradas de una tabla de páginas de un nivel.', f: 'entradasTabla', p: ['bitsDir', 'tamPagina'], t: [[[32, 4096], 1048576], [[16, 1024], 64], [[20, 4096], 256]], sol: '  return Math.pow(2, bitsDir) / tamPagina;', l: 1 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var pag = R.pick([256, 512, 1024, 4096]), tabla = [R.int(0, 30), R.int(0, 30), R.int(0, 30), R.int(0, 30)], vpn = R.int(0, 3), d = R.int(0, pag - 1), dv = vpn * pag + d; g.input(3, 'Páginas de ' + pag + ' bytes y tabla de páginas [' + tabla.join(', ') + ']. ¿Qué dirección física corresponde a la virtual ' + dv + '?', tabla[vpn] * pag + d, 'VPN = ' + vpn + ', desplazamiento = ' + d + ', marco = ' + tabla[vpn] + '.'); });
    g.times(6, function (R) { var h = R.pick([0.8, 0.9, 0.95, 0.99]), tl = R.pick([1, 5, 10, 20]), tm = R.pick([50, 100]), v = h * (tl + tm) + (1 - h) * (tl + 2 * tm); g.input(3, 'TLB con ' + Math.round(h * 100) + '% de aciertos, ' + tl + ' ns por consulta a la TLB y ' + tm + ' ns por acceso a memoria, tabla de un nivel. ¿Tiempo efectivo de acceso en ns? Redondea a 1 decimal.', v.toFixed(1), 'h(tTLB + tmem) + (1 − h)(tTLB + 2 tmem).'); });
    g.times(5, function (R) { var b = R.pick([16, 20, 24, 32]), p = R.pick([9, 10, 12]); g.input(2, 'Con direcciones virtuales de ' + b + ' bits y páginas de 2^' + p + ' bytes, ¿cuántos bits ocupa el número de página virtual?', b - p, b + ' − ' + p + '.'); });
  },
  checks: [
    ['¿Qué tres objetivos persigue la virtualización de la memoria?', 'Transparencia, eficiencia y protección.'],
    ['Traduce la dirección virtual 5000 con páginas de 4096 bytes y tabla [3, 7].', 'VPN 1, desplazamiento 904, marco 7: 7 × 4096 + 904 = 29576.'],
    ['¿Por qué la paginación elimina la fragmentación externa pero no la interna?', 'Porque todos los bloques son del mismo tamaño y cualquier marco libre sirve, pero la última página de cada región puede quedar a medio usar.'],
    ['¿Qué problema resuelven las tablas multinivel y cuál es su costo?', 'Evitan reservar la tabla completa para espacios casi vacíos; su costo es un acceso a memoria adicional por nivel cuando falla la TLB.'],
    ['¿Por qué la TLB funciona tan bien con tan pocas entradas?', 'Por la localidad: los programas acceden repetidamente a las mismas páginas en intervalos cortos.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 13 a 20.', 'Knowlton, K. (1965). A Fast Storage Allocator. *Communications of the ACM*, 8(10).', 'Bonwick, J. (1994). The Slab Allocator: An Object-Caching Kernel Memory Allocator. *USENIX Summer 1994 Technical Conference*.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.), capítulo 9.', 'Denning, P. (1970). Virtual Memory. *ACM Computing Surveys*, 2(3).'],
  project: { t: 'Simulador de MMU',
    goal: 'Construir una MMU simulada con tabla de páginas multinivel y TLB.',
    steps: ['Implementa la traducción con una tabla de un nivel, bits de válido y permisos de lectura, escritura y ejecución.', 'Cambia a una tabla de dos niveles y compara la memoria que ocupan ambas para un proceso que usa poco.', 'Agrega una TLB con reemplazo LRU y mide la tasa de aciertos con trazas que recorren un arreglo por filas y por columnas.', 'Calcula el tiempo efectivo de acceso para cada traza.', 'Escribe un informe que relacione los resultados con la localidad.'],
    deliver: 'El simulador, las trazas, las mediciones y el informe.' },
  hito: ['Mide el uso de memoria del servidor de PatioApp (memoria residente y virtual) con herramientas del sistema y documenta qué regiones ocupan más.', 'Optimiza una operación de PatioApp que recorra muchos datos para que acceda a memoria de forma secuencial y mide la mejora.']
});

S('so', 'so.vm', { title: 'Memoria virtual: paginación por demanda y reemplazo',
  ask: '¿Qué concepto de memoria virtual se aplica?',
  lesson: `
> **La idea en simple.** Una biblioteca tiene más libros de los que caben en las mesas de lectura. Los libros que se están usando están en las mesas (la memoria); el resto, en el depósito (el disco). Cuando alguien pide uno que no está en las mesas, un ayudante va al depósito (un **fallo de página**) y, si las mesas están llenas, debe decidir qué libro devolver. Elegir bien a quién devolver es todo el arte de la memoria virtual.

## Paginación por demanda
La **memoria virtual** permite que la suma de los espacios de direcciones supere la memoria física: solo las páginas en uso están en memoria; las demás quedan en disco, en el **espacio de intercambio** (*swap*) o en el archivo del que provienen. Con **paginación por demanda** una página se carga solo cuando se accede a ella por primera vez. Ventajas: los programas arrancan más rápido, caben más procesos y un programa puede ser más grande que la memoria.

## Qué pasa en un fallo de página
Cuando la MMU encuentra una entrada con el bit **presente** en 0, genera una excepción de **fallo de página** y el sistema operativo:
1. Verifica que el acceso sea válido (si no, envía SIGSEGV).
2. Busca un marco libre; si no hay, elige una **víctima** con el algoritmo de reemplazo.
3. Si la víctima está **sucia** (fue modificada), la escribe en disco.
4. Lee la página pedida desde el disco al marco (el proceso se bloquea mientras tanto).
5. Actualiza la tabla de páginas y reintenta la instrucción que falló.
Un fallo cuesta muchísimo: leer de un disco duro toma milisegundos y de un SSD, decenas de microsegundos, frente a unos 100 ns de un acceso a memoria. El tiempo efectivo es:
:::flow TEA = (1 − p) × t_mem + p × t_fallo
Con t_mem = 100 ns y t_fallo = 8 ms (disco duro), para no ser más de un 10% más lento hace falta p < 1.25 en un millón. Un fallo cada mil accesos haría la máquina unas 80 veces más lenta. Por eso la memoria virtual solo funciona gracias a la localidad.

## Algoritmos de reemplazo
Con la cadena de referencias 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1 y 3 marcos (el ejemplo clásico de Silberschatz):
| Algoritmo | Idea | Fallos |
| FIFO | reemplaza la página que lleva más tiempo en memoria | 15 |
| LRU | reemplaza la usada hace más tiempo | 12 |
| Óptimo (OPT, MIN) | reemplaza la que se usará más tarde en el futuro | 9 |
- **Óptimo:** László Bélády demostró en 1966 que es el mejor posible. No se puede implementar (exige conocer el futuro), pero sirve de referencia para comparar.
- **LRU:** se apoya en la localidad: lo usado recientemente probablemente se use pronto. Implementarlo exactamente exige registrar cada acceso, demasiado caro para el hardware.
- **Reloj** (segunda oportunidad): aproxima LRU con el **bit de referencia** que la MMU pone en 1 en cada acceso. Las páginas forman un círculo con una manecilla; si la página apuntada tiene el bit en 1, se le pone en 0 y se avanza (segunda oportunidad); si está en 0, es la víctima. Variantes prefieren además las páginas limpias (no sucias) para ahorrar la escritura.
~~~js
function fallos(refs, marcos, politica) {
  let m = [], f = 0;
  refs.forEach((p, t) => {
    const i = m.indexOf(p);
    if (i >= 0) { if (politica === 'LRU') { m.splice(i, 1); m.push(p); } return; }
    f++;
    if (m.length < marcos) { m.push(p); return; }
    if (politica === 'OPT') {
      let v = 0, lejos = -1;
      m.forEach((q, j) => { const n = refs.indexOf(q, t + 1), d = n < 0 ? Infinity : n; if (d > lejos) { lejos = d; v = j; } });
      m[v] = p;
    } else { m.shift(); m.push(p); }       // FIFO y LRU sacan al primero de la lista
  });
  return f;
}
const refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
for (const pol of ['FIFO', 'LRU', 'OPT']) console.log(pol, fallos(refs, 3, pol), 'fallos');
~~~

## La anomalía de Bélády
Intuitivamente, más marcos deberían dar menos fallos. Bélády, Nelson y Shedler mostraron en 1969 que con FIFO no siempre es así: con la cadena 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, FIFO produce 9 fallos con 3 marcos y **10 con 4**. LRU y OPT no sufren esta anomalía porque son **algoritmos de pila** (Mattson y otros, 1970): el conjunto de páginas en memoria con k marcos siempre está contenido en el de k + 1 marcos.

## Hiperpaginación y conjunto de trabajo
Si los procesos activos necesitan, en conjunto, más marcos de los que hay, el sistema entra en **hiperpaginación** (*thrashing*): pasa casi todo el tiempo cargando y descargando páginas, el procesador queda ocioso y el rendimiento se desploma. Peter Denning propuso en 1968 el modelo del **conjunto de trabajo**: las páginas usadas por un proceso en la ventana de las últimas Δ referencias. Si la suma de los conjuntos de trabajo supera la memoria, hay que suspender procesos (pasarlos completos a disco) hasta que quepan. Un enfoque más directo mide la **frecuencia de fallos** de cada proceso y le da más marcos si falla demasiado o le quita si falla muy poco. Cuando Linux se queda sin memoria y sin intercambio, el **OOM killer** elige un proceso (normalmente el que más memoria usa) y lo termina para salvar al resto.

## Cuántos marcos darle a cada proceso
Además de elegir la víctima, el sistema decide de dónde sacarla:
- **Reemplazo local:** cada proceso solo reemplaza entre sus propios marcos. Su rendimiento no depende de lo que hagan los demás, pero un proceso puede quedarse con marcos ociosos mientras otro sufre.
- **Reemplazo global:** la víctima puede ser de cualquier proceso. Aprovecha mejor la memoria y es lo habitual (Linux lo usa), aunque un proceso glotón puede perjudicar a otros.
Para el reparto inicial existen la **asignación equitativa** (igual para todos) y la **proporcional** al tamaño de cada proceso. Linux mantiene listas de páginas **activas** e **inactivas**, una aproximación de LRU en dos niveles: las páginas que no se tocan bajan a la lista inactiva y de allí se recuperan primero. Un hilo del núcleo («kswapd») libera páginas en segundo plano cuando la memoria libre baja de un umbral, para que los fallos no tengan que esperar a que se libere un marco.

## Otros usos de la memoria virtual
- **Copia en escritura**, que viste con fork.
- **Archivos mapeados en memoria** («mmap»): un archivo se mapea a una región del espacio de direcciones y se accede como un arreglo; el sistema carga sus páginas por demanda y escribe las sucias de vuelta. Muchas bases de datos y cargadores de programas lo usan.
- **Bibliotecas compartidas:** el código de «libc» está una sola vez en memoria física y mapeado en cientos de procesos.
- **Asignación perezosa:** «malloc» de 1 GB no gasta 1 GB hasta que se escriben sus páginas.

## Ejemplo resuelto: una caché de fotos con LRU
PatioApp muestra fotos de inspección y mantiene en memoria las 3 más recientes. La secuencia de fotos pedidas es A, B, C, A, D, A, B. Con LRU:
- A, B, C: tres fallos; memoria [A, B, C].
- A: acierto; A pasa a ser la más reciente → [B, C, A].
- D: fallo; sale B (la usada hace más tiempo) → [C, A, D].
- A: acierto → [C, D, A].
- B: fallo; sale C → [D, A, B].
Total: 5 fallos y 2 aciertos. Con FIFO, D habría expulsado a A (la primera en entrar), y el siguiente acceso a A habría sido otro fallo: 6 fallos. Es el mismo razonamiento que hace el sistema operativo con las páginas, aplicado a la caché de una aplicación.`,
  links: [['so.mem', 'la memoria virtual extiende la paginación con páginas que pueden estar en disco'], ['arq.mem', 'los algoritmos de reemplazo de páginas son los mismos que los de las cachés'], ['m4.hash', 'una caché LRU eficiente combina tabla hash y lista doblemente enlazada']],
  read: 'OSTEP, capítulos 21 a 23 (Beyond Physical Memory); Silberschatz, capítulo 10; Bélády (1966); Denning (1968).',
  terms: [
    ['Paginación por demanda', 'técnica que carga una página en memoria solo cuando se accede a ella por primera vez', ['Un programa grande arranca cargando pocas páginas.', 'Las páginas no usadas nunca llegan a memoria.', 'Se apoya en el bit presente.']],
    ['Fallo de página', 'excepción que ocurre al acceder a una página que no está en memoria y que el sistema atiende cargándola desde disco', ['Cuesta milisegundos con un disco duro.', 'El proceso se bloquea mientras se carga la página.', 'Si el acceso no es válido, termina en SIGSEGV.']],
    ['Algoritmo óptimo', 'reemplazo que expulsa la página que se usará más tarde en el futuro', ['Bélády demostró que es el mejor posible.', 'No se puede implementar en la práctica.', 'Sirve como referencia para comparar.']],
    ['LRU', 'reemplazo que expulsa la página usada hace más tiempo', ['Se apoya en la localidad temporal.', 'Es un algoritmo de pila sin anomalía de Bélády.', 'Se aproxima con el algoritmo del reloj.']],
    ['Algoritmo del reloj', 'aproximación de LRU que recorre las páginas en círculo y da una segunda oportunidad a las que tienen el bit de referencia en 1', ['Pone en 0 el bit y avanza si estaba en 1.', 'Expulsa la primera página con el bit en 0.', 'Lo usan muchos sistemas reales.']],
    ['Anomalía de Bélády', 'fenómeno por el que FIFO puede producir más fallos con más marcos', ['Con 1,2,3,4,1,2,5,1,2,3,4,5: 9 fallos con 3 marcos y 10 con 4.', 'No ocurre con LRU ni con el óptimo.', 'La describieron Bélády, Nelson y Shedler en 1969.']],
    ['Hiperpaginación', 'estado en que el sistema pasa casi todo el tiempo atendiendo fallos de página en lugar de ejecutar procesos', ['El procesador queda ocioso y el disco al máximo.', 'Ocurre si los conjuntos de trabajo no caben en memoria.', 'Se resuelve suspendiendo procesos.']],
    ['Conjunto de trabajo', 'páginas que un proceso usó en una ventana de referencias recientes', ['Denning lo propuso en 1968.', 'Estima cuántos marcos necesita un proceso.', 'Si la suma supera la memoria, hay hiperpaginación.']]
  ],
  q: [
    ['Con 3 marcos y la cadena 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1, ¿cuántos fallos produce FIFO?', '15', ['9', '12', '20'], 'Es el ejemplo clásico de Silberschatz.', 3],
    ['Con la misma cadena y 3 marcos, ¿cuántos fallos produce LRU?', '12', ['9', '15', '10'], 'LRU queda entre FIFO y el óptimo.', 3],
    ['¿Por qué no se puede implementar el algoritmo óptimo?', 'Porque necesita conocer los accesos futuros', ['Porque es demasiado lento', 'Porque requiere más memoria', 'Porque sufre la anomalía de Bélády'], 'Se usa como referencia.', 2],
    ['¿Qué hace el algoritmo del reloj con una página cuyo bit de referencia está en 1?', 'Le pone el bit en 0 y avanza a la siguiente', ['La expulsa de inmediato', 'La escribe en disco', 'La mueve al final de la lista LRU'], 'Es la segunda oportunidad.', 3],
    ['Con t_mem = 100 ns, t_fallo = 10 ms y p = 0.001, ¿cuánto vale aproximadamente el tiempo efectivo?', '10 µs', ['100 ns', '1 ms', '110 ns'], '0.999 × 100 ns + 0.001 × 10 ms ≈ 10.1 µs: unas 100 veces más lento.', 4],
    ['¿Qué indica que el sistema está en hiperpaginación?', 'Mucha actividad de disco por fallos de página y el procesador casi ocioso', ['El procesador al 100% de uso útil', 'Ningún fallo de página', 'Mucho tráfico de red'], 'Los procesos esperan páginas en lugar de ejecutarse.', 3],
    ['¿Por qué conviene expulsar páginas limpias antes que sucias?', 'Porque las sucias deben escribirse en disco antes de liberar el marco', ['Porque las limpias son más grandes', 'Porque las sucias están cifradas', 'Porque las limpias nunca se vuelven a usar'], 'Ahorra una escritura.', 3],
    { tf: 'Con FIFO, aumentar la cantidad de marcos siempre reduce o mantiene los fallos.', v: false, e: 'La anomalía de Bélády muestra que pueden aumentar.', l: 3 },
    { tf: 'Un malloc de 1 GB no consume 1 GB de memoria física hasta que se escriben sus páginas.', v: true, e: 'La memoria virtual asigna los marcos de forma perezosa.', l: 3 },
    { o: 'Ordena lo que hace el sistema operativo ante un fallo de página válido sin marcos libres.', s: ['Elegir una página víctima', 'Escribir la víctima en disco si está sucia', 'Leer la página pedida desde disco', 'Actualizar la tabla de páginas', 'Reintentar la instrucción que falló'], e: 'El proceso queda bloqueado durante la lectura.', l: 3 },
    { c: 'Escribe «fallosFIFO(refs, marcos)» con la cantidad de fallos de página usando FIFO.', f: 'fallosFIFO', p: ['refs', 'marcos'], t: [[[[7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1], 3], 15], [[[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3], 9], [[[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 4], 10], [[[1, 1, 1], 1], 1]], sol: '  const m = [];\n  let f = 0;\n  for (const p of refs) if (!m.includes(p)) { f++; if (m.length === marcos) m.shift(); m.push(p); }\n  return f;', l: 3 },
    { c: 'Escribe «fallosLRU(refs, marcos)» con la cantidad de fallos de página usando LRU.', f: 'fallosLRU', p: ['refs', 'marcos'], t: [[[[7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1], 3], 12], [[[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 4], 8], [[['A', 'B', 'C', 'A', 'D', 'A', 'B'], 3], 5]], sol: '  const m = [];\n  let f = 0;\n  for (const p of refs) {\n    const i = m.indexOf(p);\n    if (i >= 0) m.splice(i, 1); else { f++; if (m.length === marcos) m.shift(); }\n    m.push(p);\n  }\n  return f;', l: 3 },
    { c: 'Escribe «fallosOPT(refs, marcos)» con el algoritmo óptimo: al reemplazar, expulsa la página que se usará más tarde (o nunca).', f: 'fallosOPT', p: ['refs', 'marcos'], t: [[[[7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1], 3], 9], [[[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3], 7], [[[1, 2, 1, 2], 2], 2]], sol: '  const m = [];\n  let f = 0;\n  refs.forEach((p, t) => {\n    if (m.includes(p)) return;\n    f++;\n    if (m.length < marcos) { m.push(p); return; }\n    let v = 0, lejos = -1;\n    m.forEach((q, j) => { const n = refs.indexOf(q, t + 1), d = n < 0 ? Infinity : n; if (d > lejos) { lejos = d; v = j; } });\n    m[v] = p;\n  });\n  return f;', h: 'Para cada página en memoria, busca su próximo uso con indexOf desde t + 1.', l: 4 }
  ],
  gen: function (g) {
    function fifo(r, k) { var m = [], f = 0; r.forEach(function (x) { if (m.indexOf(x) < 0) { f++; if (m.length === k) m.shift(); m.push(x); } }); return f; }
    function lru(r, k) { var m = [], f = 0; r.forEach(function (x) { var i = m.indexOf(x); if (i >= 0) m.splice(i, 1); else { f++; if (m.length === k) m.shift(); } m.push(x); }); return f; }
    g.times(8, function (R) { var r = []; for (var i = 0; i < 10; i++) r.push(R.int(1, 5)); var k = R.pick([2, 3]); g.input(3, 'Con ' + k + ' marcos inicialmente vacíos y la cadena ' + r.join(', ') + ', ¿cuántos fallos produce FIFO?', fifo(r, k), 'Cuenta cada página que no está en memoria al pedirla.'); g.input(3, 'Con ' + k + ' marcos y la misma cadena (' + r.join(', ') + '), ¿cuántos fallos produce LRU?', lru(r, k), 'Mueve cada página usada al final de la lista y expulsa la del inicio.'); });
    g.times(5, function (R) { var tm = 100, tf = R.pick([1, 5, 8]), p = R.pick([0.0001, 0.00001, 0.001]), v = (1 - p) * tm + p * tf * 1e6; g.input(4, 'Acceso a memoria 100 ns, fallo de página ' + tf + ' ms y probabilidad de fallo ' + p + '. ¿Tiempo efectivo de acceso en ns? Redondea a 0 decimales.', Math.round(v), '(1 − p) × 100 + p × ' + tf + ' × 10⁶ ns.'); });
    var al = [['Expulsa la página que lleva más tiempo en memoria', 'FIFO'], ['Expulsa la página usada hace más tiempo', 'LRU'], ['Expulsa la página que se usará más tarde', 'Óptimo'], ['Da una segunda oportunidad a las páginas con bit de referencia en 1', 'Reloj']];
    al.forEach(function (a) { g.mcq(2, '¿Qué algoritmo de reemplazo describe esto? ' + a[0], a[1], ['FIFO', 'LRU', 'Óptimo', 'Reloj'].filter(function (x) { return x !== a[1]; }), 'Cuatro algoritmos clásicos.'); });
  },
  checks: [
    ['Describe los pasos que sigue el sistema ante un fallo de página.', 'Verifica que el acceso sea válido, busca un marco libre o elige una víctima, escribe la víctima si está sucia, lee la página del disco, actualiza la tabla y reintenta la instrucción.'],
    ['¿Por qué la memoria virtual depende de la localidad?', 'Porque un fallo cuesta miles de veces más que un acceso a memoria; solo si la gran mayoría de accesos caen en páginas ya cargadas el sistema es rápido.'],
    ['Explica la anomalía de Bélády y por qué LRU no la sufre.', 'Con FIFO, más marcos pueden dar más fallos; LRU es un algoritmo de pila: con más marcos siempre conserva un superconjunto de las páginas.'],
    ['¿Cómo aproxima el algoritmo del reloj a LRU?', 'Usa el bit de referencia: recorre las páginas en círculo, a las usadas recientemente les quita el bit y les da otra oportunidad, y expulsa la primera sin uso reciente.'],
    ['¿Qué es la hiperpaginación y cómo se combate?', 'El sistema pasa el tiempo cargando y descargando páginas porque los conjuntos de trabajo no caben; se combate reduciendo los procesos activos o dando marcos según la frecuencia de fallos.']
  ],
  cites: ['Bélády, L. (1966). A Study of Replacement Algorithms for a Virtual-Storage Computer. *IBM Systems Journal*, 5(2).', 'Bélády, L., Nelson, R. y Shedler, G. (1969). An Anomaly in Space-Time Characteristics of Certain Programs Running in a Paging Machine. *Communications of the ACM*, 12(6).', 'Denning, P. (1968). The Working Set Model for Program Behavior. *Communications of the ACM*, 11(5).', 'Mattson, R., Gecsei, J., Slutz, D. y Traiger, I. (1970). Evaluation Techniques for Storage Hierarchies. *IBM Systems Journal*, 9(2).', 'Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 21 a 23.'],
  project: { t: 'Laboratorio de reemplazo de páginas',
    goal: 'Comparar algoritmos de reemplazo con trazas reales y sintéticas.',
    steps: ['Implementa FIFO, LRU, reloj y óptimo sobre trazas de referencias.', 'Genera trazas con distinta localidad (aleatoria, secuencial, con un conjunto de trabajo que cambia).', 'Grafica los fallos frente a la cantidad de marcos para cada algoritmo y busca la anomalía de Bélády.', 'Implementa una caché LRU de objetos con tabla hash y lista doblemente enlazada en tiempo constante.', 'Explica qué algoritmo elegirías para una caché de imágenes y por qué.'],
    deliver: 'El código, las trazas, los gráficos y el informe.' },
  hito: ['Implementa en PatioApp una caché LRU en memoria para las fotos de inspección, con capacidad configurable y operaciones en tiempo constante.', 'Mide la tasa de aciertos de la caché de PatioApp con el patrón de uso real y ajusta su capacidad con esos datos.']
});
})();
