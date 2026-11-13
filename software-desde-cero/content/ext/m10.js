(function () {
var X = SDC.X, XM = SDC.XM;
XM('m10', {
  uni: 'CMU 15-445/645 *Database Systems*; Berkeley CS186 *Introduction to Database Systems*; Stanford CS145 *Data Management and Data Systems*; MIT 6.5830 (antes 6.830) *Database Systems*. En Perú: Base de Datos I y II, y Sistemas de Información (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'La base de datos de PatioApp',
    goal: 'Diseñar, poblar, consultar y optimizar la base de datos completa de PatioApp, cuidando la integridad bajo concurrencia.',
    steps: ['Modela el dominio con un diagrama entidad-relación y normaliza hasta la tercera forma normal.', 'Crea el esquema con migraciones versionadas, claves, restricciones CHECK y acciones referenciales.', 'Carga un millón de registros de prueba y escribe 15 reportes en SQL con JOIN, agregaciones y funciones de ventana.', 'Optimiza las consultas más usadas con índices, justificando cada uno con EXPLAIN.', 'Implementa la asignación de unidades con transacciones y bloqueo optimista, y una caché con expiración para las consultas más frecuentes.'],
    deliver: 'El diagrama, las migraciones, los reportes, el informe de EXPLAIN antes y después y las pruebas de concurrencia.' }
});

X('m10.model', {
  deep: `
## Un modelo matemático para los datos
Edgar F. Codd, investigador de IBM, propuso en 1970 el **modelo relacional**: los datos se organizan en relaciones (tablas) y se consultan con operaciones matemáticas, sin que el programador sepa cómo están guardados en el disco. Antes, los programas navegaban punteros entre registros y cualquier cambio físico los rompía. Codd recibió el Premio Turing en 1981.

## El álgebra relacional
Toda consulta SQL se traduce internamente a operaciones del álgebra relacional:
| Operación | Símbolo | Equivale en SQL |
| Selección (filtrar filas) | σ | WHERE |
| Proyección (elegir columnas) | π | SELECT columnas |
| Producto cartesiano | × | FROM a, b |
| Reunión (join) | ⋈ | JOIN ... ON |
| Unión, diferencia | ∪, − | UNION, EXCEPT |
| Renombrar | ρ | AS |
Como son operaciones con propiedades algebraicas, el motor puede **reordenarlas** sin cambiar el resultado: filtrar antes de unir suele ser mucho más barato. Esa libertad es la que aprovecha el optimizador.

## SQL: declarativo
Donald Chamberlin y Raymond Boyce crearon SEQUEL en IBM en 1974, que luego pasó a llamarse SQL; ANSI lo estandarizó en 1986. Es **declarativo**: dices *qué* quieres, no *cómo* obtenerlo. El motor elige el plan. Pero conviene conocer el **orden lógico** en que se evalúa una consulta, porque explica muchos errores:
:::flow FROM / JOIN | WHERE | GROUP BY | HAVING | SELECT | ORDER BY | LIMIT
Por eso no puedes usar en el WHERE un alias definido en el SELECT (todavía no existe), pero sí en el ORDER BY.

## NULL y la lógica de tres valores
NULL significa "valor desconocido o inexistente". Cualquier comparación con NULL da **UNKNOWN**, que no es verdadero ni falso, y el WHERE solo deja pasar lo verdadero.
| Expresión | Resultado |
| NULL = NULL | UNKNOWN |
| NULL <> 5 | UNKNOWN |
| TRUE AND UNKNOWN | UNKNOWN |
| TRUE OR UNKNOWN | TRUE |
| FALSE AND UNKNOWN | FALSE |
La trampa más famosa: «WHERE placa NOT IN (SELECT placa FROM revisiones)» devuelve **cero filas** si alguna placa de la subconsulta es NULL, porque «x <> NULL» es UNKNOWN para todas. Usa «NOT EXISTS» en su lugar.

## Claves con criterio
- **Clave candidata:** cualquier conjunto mínimo de columnas que identifica cada fila (la placa; el número de chasis).
- **Clave natural** (que viene del negocio) contra **clave sustituta** (un número autogenerado o un UUID). Las naturales pueden cambiar (una placa se reasigna) o tener errores de digitación; por eso suele usarse una sustituta como primaria y declarar la natural como «UNIQUE».
- **Acciones referenciales:** «ON DELETE RESTRICT» impide borrar un chofer con unidades asignadas; «ON DELETE CASCADE» borraría también sus registros. Elegirlas es una decisión de negocio.

## Tipos de datos que evitan errores
~~~txt
CREATE TABLE unidades (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  placa       CHAR(6) NOT NULL UNIQUE CHECK (placa ~ '^[A-Z0-9]{6}$'),
  km          INTEGER NOT NULL CHECK (km >= 0),
  precio      NUMERIC(12,2) NOT NULL CHECK (precio >= 0),   -- dinero: nunca FLOAT
  estado      TEXT NOT NULL DEFAULT 'ingresada'
              CHECK (estado IN ('ingresada','en_revision','lista','entregada','anulada')),
  ingreso_en  TIMESTAMPTZ NOT NULL DEFAULT now(),          -- con zona horaria
  chofer_id   BIGINT REFERENCES choferes(id) ON DELETE RESTRICT
);
~~~
Las restricciones son la **última línea de defensa**: aunque la aplicación tenga un error, la base de datos no aceptará un kilometraje negativo.

## Consultas parametrizadas, siempre
Construir SQL concatenando texto del usuario permite la **inyección SQL**, uno de los ataques más antiguos y dañinos: si alguien escribe «' OR '1'='1» en el campo de placa, la consulta cambia de significado. Las consultas **parametrizadas** envían la consulta y los datos por separado, y el motor nunca interpreta los datos como código:
~~~txt
// mal:  db.query("SELECT * FROM unidades WHERE placa = '" + placa + "'")
// bien: db.query("SELECT * FROM unidades WHERE placa = $1", [placa])
~~~
Silberschatz, Korth y Sudarshan, en *Database System Concepts*, y C. J. Date, en *An Introduction to Database Systems*, son las referencias clásicas para profundizar en el modelo y su teoría.`,
  checks: [
    ['¿Por qué falla «SELECT km * 2 AS doble FROM unidades WHERE doble > 100»?', 'Porque WHERE se evalúa antes que SELECT en el orden lógico; el alias «doble» todavía no existe. Hay que repetir la expresión o usar una subconsulta.'],
    ['¿Qué devuelve «WHERE x NOT IN (1, NULL)» para x = 5 y por qué?', 'No devuelve la fila: 5 <> NULL es UNKNOWN, así que toda la condición es UNKNOWN y WHERE solo deja pasar lo verdadero.'],
    ['¿Por qué conviene usar una clave sustituta además de la placa?', 'Porque la placa puede cambiar o tener errores; una clave sustituta estable evita actualizar todas las referencias, y la placa se protege igual con UNIQUE.'],
    ['¿Qué tipo de dato usarías para precios y por qué?', 'NUMERIC o DECIMAL con dos decimales, porque representa exactamente fracciones decimales; FLOAT tiene errores de redondeo binario.'],
    ['¿Cómo previene una consulta parametrizada la inyección SQL?', 'Envía la consulta y los datos por separado; el motor trata los datos siempre como valores y nunca los interpreta como parte del código SQL.']
  ],
  cites: ['Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. *Communications of the ACM*, 13(6).', 'Chamberlin, D. y Boyce, R. (1974). SEQUEL: A Structured English Query Language. *ACM SIGFIDET Workshop*.', 'Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.). McGraw-Hill. Capítulos 2 y 3.', 'Date, C. J. (2003). *An Introduction to Database Systems* (8.ª ed.). Addison-Wesley.'],
  project: { t: 'Base de datos del patio desde cero',
    goal: 'Crear una base de datos relacional con integridad garantizada por el propio motor.',
    steps: ['Instala SQLite o PostgreSQL y crea las tablas de unidades, choferes, revisiones y ubicaciones con tipos adecuados.', 'Declara claves primarias, foráneas, UNIQUE, NOT NULL y CHECK; elige y justifica las acciones referenciales.', 'Escribe un script de datos de prueba con al menos 500 unidades.', 'Escribe 20 consultas de complejidad creciente, incluidas consultas con NULL que demuestren la lógica de tres valores.', 'Intenta insertar 10 datos inválidos y comprueba que el motor los rechaza.'],
    deliver: 'Los scripts de creación y de datos, las consultas con sus resultados y la lista de rechazos obtenidos.' },
  hito: ['Migra el almacenamiento de PatioApp de JSON a SQLite o PostgreSQL con tablas de unidades, choferes y revisiones, claves y restricciones CHECK.', 'Usa solo consultas parametrizadas en la capa de datos y agrega una prueba que intente una inyección SQL.']
});

X('m10.join', {
  deep: `
## Cómo ejecuta el motor un JOIN
El SQL no dice cómo unir; el optimizador elige entre tres algoritmos clásicos:
| Algoritmo | Cómo funciona | Conviene cuando |
| Bucle anidado (nested loop) | por cada fila de A, busca en B (idealmente con un índice) | A es pequeña y B tiene índice en la columna de unión |
| Hash join | arma una tabla hash con la tabla menor y recorre la mayor | tablas grandes sin orden, condición de igualdad |
| Merge join | ordena ambas por la clave y las recorre en paralelo | ambas ya vienen ordenadas (por un índice) |
Es la misma lógica que viste en algoritmos: sin índice, un bucle anidado es O(n·m); con hash, O(n + m).

## Las uniones que no son INNER
- **Semi-join** ("los que tienen al menos uno"): «WHERE EXISTS (SELECT 1 FROM revisiones r WHERE r.unidad_id = u.id)». No duplica filas aunque haya varias revisiones.
- **Anti-join** ("los que no tienen ninguno"): «WHERE NOT EXISTS (...)» o «LEFT JOIN ... WHERE r.id IS NULL». Es la forma correcta de encontrar unidades sin revisión.
- **Self-join:** una tabla consigo misma, por ejemplo para comparar cada unidad con otras de la misma marca.
- **Cuidado con LEFT JOIN y WHERE:** filtrar en el WHERE una columna de la tabla derecha («WHERE r.resultado = 'ok'») elimina las filas sin coincidencia y convierte el LEFT en un INNER. La condición debe ir en el ON.

## Agregaciones sin sorpresas
- «COUNT(*)» cuenta filas; «COUNT(columna)» cuenta los valores no nulos; «COUNT(DISTINCT columna)», los distintos.
- «AVG», «SUM», «MIN» y «MAX» **ignoran** los NULL. El promedio de (10, NULL, 20) es 15, no 10.
- Toda columna del SELECT que no esté agregada debe estar en el GROUP BY.
- WHERE filtra filas **antes** de agrupar; HAVING filtra grupos **después**.

## Funciones de ventana
Añadidas en el estándar SQL:2003, calculan sobre un grupo de filas **sin colapsarlas**, algo imposible con GROUP BY:
~~~txt
SELECT revisor, fecha, cantidad,
       SUM(cantidad)  OVER (PARTITION BY revisor ORDER BY fecha) AS acumulado,
       RANK()         OVER (PARTITION BY fecha ORDER BY cantidad DESC) AS puesto_del_dia,
       cantidad - LAG(cantidad) OVER (PARTITION BY revisor ORDER BY fecha) AS cambio_vs_ayer
FROM produccion_diaria;
~~~
Sirven para rankings ("el mejor revisor de cada día"), acumulados, promedios móviles y comparaciones con la fila anterior. Son ideales para paneles de producción.

## CTE y consultas recursivas
Una **expresión de tabla común** («WITH») da nombre a una subconsulta y hace legibles las consultas largas. Su versión recursiva, del estándar SQL:1999, recorre jerarquías: ubicaciones (sede → zona → fila → espacio), organigramas o dependencias.
~~~txt
WITH RECURSIVE ruta AS (
  SELECT id, nombre, padre_id, nombre::text AS camino FROM ubicaciones WHERE padre_id IS NULL
  UNION ALL
  SELECT u.id, u.nombre, u.padre_id, r.camino || ' > ' || u.nombre
  FROM ubicaciones u JOIN ruta r ON u.padre_id = r.id
)
SELECT camino FROM ruta;
~~~

## El mismo razonamiento en JavaScript
~~~js
const unidades = [{ id: 1, placa: 'ABC123' }, { id: 2, placa: 'XYZ789' }, { id: 3, placa: 'LMN456' }];
const revisiones = [{ unidad_id: 1, ok: true }, { unidad_id: 1, ok: false }, { unidad_id: 3, ok: true }];
const porUnidad = new Map();                                   // "hash join": índice por clave
for (const r of revisiones) porUnidad.set(r.unidad_id, (porUnidad.get(r.unidad_id) || 0) + 1);
console.log(unidades.map(u => u.placa + ': ' + (porUnidad.get(u.id) || 0)));   // LEFT JOIN + COUNT
console.log(unidades.filter(u => !porUnidad.has(u.id)).map(u => u.placa));       // anti-join
~~~

## El problema N+1 y los ORM
Un ORM (como Prisma, Sequelize o Hibernate) permite trabajar con objetos en lugar de SQL. Su trampa clásica: recorrer 100 unidades y, dentro del bucle, acceder a «unidad.chofer» dispara 100 consultas adicionales (1 + N). La solución es la **carga anticipada** (*eager loading*), que trae todo con un JOIN o con una consulta «WHERE id IN (...)». Markus Winand, en *SQL Performance Explained*, y Bill Karwin, en *SQL Antipatterns*, recopilan estos errores y sus soluciones.`,
  checks: [
    ['¿Por qué «LEFT JOIN revisiones r ON ... WHERE r.ok = true» se comporta como un INNER JOIN?', 'Porque las filas sin revisión tienen r.ok = NULL y el WHERE las descarta; para conservarlas la condición debe ir en el ON.'],
    ['¿Cuánto da COUNT(km) si la columna tiene los valores 100, NULL y 300? ¿Y COUNT(*)?', 'COUNT(km) da 2 porque ignora NULL; COUNT(*) da 3 porque cuenta filas.'],
    ['¿Qué ventaja tienen las funciones de ventana sobre GROUP BY?', 'Calculan agregados (ranking, acumulados, comparación con la fila anterior) sin colapsar las filas, así cada fila conserva su detalle.'],
    ['¿Qué algoritmo de unión usaría el motor para dos tablas grandes sin índices con condición de igualdad?', 'Probablemente un hash join: construye una tabla hash con la menor y recorre la mayor, en tiempo lineal.'],
    ['Describe el problema N+1 y su solución.', 'Hacer una consulta para la lista y luego una por cada elemento para traer sus datos relacionados; se resuelve trayendo todo en una o dos consultas con JOIN o WHERE id IN (...).']
  ],
  cites: ['Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.). McGraw-Hill. Capítulos 4, 5 y 15.', 'Winand, M. (2012). *SQL Performance Explained*. use-the-index-luke.com.', 'Karwin, B. (2010). *SQL Antipatterns*. Pragmatic Bookshelf.', 'ISO/IEC 9075:2003. *Information technology — Database languages — SQL* (funciones de ventana).'],
  project: { t: 'Reportes de producción en SQL',
    goal: 'Responder preguntas reales de negocio solo con SQL, usando todo el poder de JOIN, agregación y ventanas.',
    steps: ['Crea tablas de revisores, unidades y revisiones con un mes de datos de prueba.', 'Escribe reportes: revisiones por revisor y día, unidades sin revisión (anti-join), marcas con más observaciones (HAVING) y promedio de días en patio por estado.', 'Con funciones de ventana: ranking diario de revisores, acumulado mensual y variación respecto al día anterior.', 'Con una CTE recursiva: la ruta completa de cada ubicación.', 'Reescribe dos reportes en JavaScript con Map y compara los resultados.'],
    deliver: 'El archivo de consultas con sus resultados y una explicación de cada técnica usada.' },
  hito: ['Agrega reportes SQL a PatioApp: unidades por estado y marca, ranking de revisores del mes con funciones de ventana y unidades sin revisión con un anti-join.', 'Revisa la API y elimina cualquier problema N+1 usando JOIN o carga anticipada.']
});

X('m10.norm', {
  deep: `
## Dependencias funcionales: la base de todo
Una **dependencia funcional** X → Y significa que si dos filas tienen el mismo valor en X, tienen el mismo valor en Y. Por ejemplo, «chofer_id → telefono_chofer». Normalizar es reorganizar las tablas para que cada dependencia esté donde corresponde. Una **clave** es un conjunto de columnas del que dependen todas las demás.

## Las formas normales con su historia
Codd definió la 1FN en 1970 y la 2FN y 3FN en 1971. William Kent resumió las tres primeras en 1983 con una frase que se volvió famosa: cada atributo que no sea clave debe dar un dato **sobre la clave, sobre toda la clave y nada más que la clave**. (Los estudiantes suelen agregar, en broma, "con la ayuda de Codd".)
| Forma | Exige | Ejemplo de violación |
| 1FN | valores atómicos, sin grupos repetidos | una celda con "rayón, abolladura" |
| 2FN | 1FN y nada depende de solo una parte de una clave compuesta | en (unidad, taller) → nombre_taller, el nombre depende solo del taller |
| 3FN | 2FN y ningún atributo depende de otro que no sea clave | unidad → chofer_id → telefono |
| FNBC (Boyce-Codd, 1974) | todo determinante es clave candidata | un revisor atiende una sola zona y cada zona-turno tiene un revisor |
| 4FN (Fagin, 1977) | sin dependencias multivaluadas independientes | colores y extras de un modelo en la misma tabla |
En la práctica, llegar a 3FN o FNBC elimina la gran mayoría de las anomalías.

## El modelo entidad-relación
Peter Chen lo propuso en 1976 como forma de diseñar **antes** de pensar en tablas: entidades, atributos y relaciones con su cardinalidad (1:1, 1:N, N:M). La notación de "pata de gallo" (*crow's foot*) es la más usada en las herramientas. Conceptos a dominar:
- **Entidad débil:** solo existe ligada a otra (el detalle de una revisión no existe sin la revisión).
- **Relación con atributos propios:** "un vehículo pasó por un taller" puede tener fecha y costo; esos atributos van en la tabla intermedia.
- **Participación obligatoria u opcional:** ¿toda unidad debe tener chofer? Se traduce en NOT NULL o no.

## Modelar el tiempo
Muchos errores de diseño vienen de guardar solo el "estado actual". Si la tarifa cambia, ¿cómo recalculas una factura de hace tres meses? Opciones:
- **Historial:** una tabla de precios con «vigente_desde» y «vigente_hasta».
- **Copiar el valor** en el documento: la factura guarda la tarifa que se aplicó (esto no es desnormalizar: es un dato distinto, "la tarifa cobrada").
- **Borrado lógico** («anulada_en») en lugar de borrar filas que otras referencian.

## Desnormalizar con conciencia
Normalizar optimiza la escritura y la integridad; las lecturas pueden necesitar muchos JOIN. Se desnormaliza cuando una medición demuestra que hace falta: columnas calculadas, **vistas materializadas** que se refrescan cada cierto tiempo o tablas de reporte separadas. La regla: una sola fuente de verdad y copias derivadas que se puedan reconstruir.

## Migraciones sin detener el sistema
Scott Ambler y Pramod Sadalage mostraron en *Refactoring Databases* (2006) que el esquema también se refactoriza en pasos pequeños y versionados. Para cambios que no pueden detener la aplicación se usa el patrón **expandir y contraer** (*parallel change*):
1. **Expandir:** agregar la columna o tabla nueva sin quitar la vieja.
2. **Migrar:** la aplicación escribe en ambas; un proceso copia los datos antiguos.
3. **Cambiar la lectura** a la estructura nueva.
4. **Contraer:** cuando nada usa la vieja, eliminarla.
Cada paso es una migración versionada en el repositorio y se aplica de forma automática en cada entorno.

~~~js
// Detectar una dependencia que viola 3FN en datos planos
const filas = [
  { placa: 'ABC123', chofer: 'C1', telefono: '999111222' },
  { placa: 'XYZ789', chofer: 'C1', telefono: '999111222' },
  { placa: 'LMN456', chofer: 'C2', telefono: '988777666' }
];
const tel = new Map(); let consistente = true;
for (const f of filas) { if (tel.has(f.chofer) && tel.get(f.chofer) !== f.telefono) consistente = false; tel.set(f.chofer, f.telefono); }
console.log('chofer → telefono se cumple:', consistente, '| el teléfono se repite', filas.length - tel.size, 'vez/veces: va a la tabla choferes');
~~~`,
  checks: [
    ['Explica la frase de Kent: "la clave, toda la clave y nada más que la clave".', 'Cada atributo no clave debe depender de la clave (1FN), de la clave completa y no de una parte (2FN), y de nada que no sea la clave (3FN).'],
    ['En una tabla (unidad_id, taller_id, fecha, nombre_taller), ¿qué forma normal se viola?', 'La 2FN, si la clave es (unidad_id, taller_id): nombre_taller depende solo de taller_id, una parte de la clave.'],
    ['¿Por qué guardar en la factura la tarifa aplicada no es una mala desnormalización?', 'Porque es un dato distinto con su propio significado (lo que se cobró en ese momento), que no debe cambiar aunque cambie la tarifa vigente.'],
    ['¿Qué pasos sigue el patrón expandir y contraer para renombrar una columna sin detener la aplicación?', 'Agregar la columna nueva, escribir en ambas y copiar los datos, pasar las lecturas a la nueva y finalmente eliminar la vieja.'],
    ['¿Qué es una entidad débil? Da un ejemplo del patio.', 'Una entidad que no tiene sentido ni identidad sin otra; por ejemplo, cada observación de una revisión depende de esa revisión.']
  ],
  cites: ['Codd, E. F. (1971). Further Normalization of the Data Base Relational Model. *Courant Computer Science Symposia 6*.', 'Kent, W. (1983). A Simple Guide to Five Normal Forms in Relational Database Theory. *Communications of the ACM*, 26(2).', 'Chen, P. (1976). The Entity-Relationship Model: Toward a Unified View of Data. *ACM Transactions on Database Systems*, 1(1).', 'Fagin, R. (1977). Multivalued dependencies and a new normal form for relational databases. *ACM Transactions on Database Systems*, 2(3).', 'Ambler, S. y Sadalage, P. (2006). *Refactoring Databases*. Addison-Wesley.'],
  project: { t: 'Del Excel al modelo normalizado',
    goal: 'Convertir una hoja de cálculo plana, como las que se usan en muchos patios, en un modelo relacional sin anomalías.',
    steps: ['Arma (o usa) una hoja plana con unas 200 filas: placa, marca, modelo, chofer, teléfono, taller, dirección del taller, fechas y observaciones separadas por comas.', 'Lista todas las dependencias funcionales que encuentres y las anomalías que provocan.', 'Normaliza paso a paso hasta 3FN o FNBC y dibuja el diagrama entidad-relación final.', 'Escribe un script que migre los datos de la hoja al nuevo esquema detectando inconsistencias.', 'Escribe tres migraciones posteriores (agregar, renombrar con expandir y contraer, eliminar).'],
    deliver: 'El análisis de dependencias, el diagrama, el script de migración de datos y las migraciones versionadas.' },
  hito: ['Dibuja el diagrama entidad-relación de PatioApp y normaliza hasta 3FN: talleres, ubicaciones y tarifas en tablas propias, con historial de tarifas vigentes.', 'Gestiona todos los cambios de esquema con migraciones versionadas y aplica una con el patrón expandir y contraer.']
});

X('m10.index', {
  deep: `
## Cómo es realmente un índice
La mayoría de los índices son **árboles B+** (los viste en estructuras de datos): las hojas guardan las claves ordenadas y enlazadas, así que sirven para búsquedas exactas y por rango. Hay dos tipos según dónde viven los datos:
- **Índice agrupado (clustered):** la tabla misma está ordenada por esa clave. En MySQL con InnoDB la tabla se organiza por la clave primaria.
- **Índice secundario:** guarda la clave y un puntero a la fila. Si la consulta pide columnas que no están en el índice, el motor debe ir a buscar cada fila.
Un **índice de cobertura** incluye todas las columnas que la consulta necesita, y el motor responde sin tocar la tabla.

## Cuándo un índice no se usa
- Si aplicas una función a la columna: «WHERE UPPER(placa) = 'ABC123'» no puede usar un índice sobre «placa». Solución: normalizar al guardar o crear un índice sobre la expresión.
- Si la condición no es selectiva: un índice sobre «estado» con 3 valores posibles rara vez ayuda; leer la tabla completa puede ser más rápido que saltar entre millones de punteros.
- Si no respetas el **prefijo izquierdo** de un índice compuesto: un índice (marca, km) sirve para «marca = ?» y para «marca = ? AND km > ?», pero no para «km > ?» solo.
- Comodín al inicio: «LIKE '%123'» no puede aprovechar el orden; «LIKE 'ABC%'» sí.

## El optimizador decide
Patricia Selinger y sus colegas describieron en 1979, para el sistema System R de IBM, el **optimizador basado en costos**: estima cuántas filas devolverá cada paso usando estadísticas de la tabla y elige el plan más barato. Todos los motores modernos siguen esa idea. «EXPLAIN» (o «EXPLAIN ANALYZE», que además ejecuta) muestra el plan elegido:
~~~txt
EXPLAIN ANALYZE SELECT * FROM unidades WHERE marca = 'Toyota' AND km < 50000;
-- antes:  Seq Scan on unidades  (rows=1000000)  … 412 ms
CREATE INDEX idx_unidades_marca_km ON unidades (marca, km);
-- después: Index Scan using idx_unidades_marca_km … 3 ms
~~~
Los índices tienen costo: ocupan espacio y **cada escritura** debe actualizarlos. Una tabla con 15 índices inserta lento.

## Transacciones: el concepto
Jim Gray describió en 1981 (*The Transaction Concept: Virtues and Limitations*) la transacción como una unidad de trabajo que se aplica completa o no se aplica. Theo Härder y Andreas Reuter acuñaron en 1983 el acrónimo **ACID**. Gray recibió el Premio Turing en 1998.
¿Cómo garantiza la base de datos la durabilidad y la atomicidad si se corta la luz? Con el **registro de escritura anticipada** (WAL): antes de modificar los datos, escribe en un registro secuencial qué va a hacer. Al reiniciar, rehace lo confirmado y deshace lo que quedó a medias. El algoritmo ARIES (Mohan y otros, 1992) es la referencia de esta técnica.

## Anomalías y niveles de aislamiento
| Anomalía | Qué pasa |
| Lectura sucia | lees datos de otra transacción que aún no confirmó (y quizá revierta) |
| Lectura no repetible | lees una fila dos veces y cambió entre ambas lecturas |
| Fantasma | repites una consulta y aparecen filas nuevas |
| Actualización perdida | dos transacciones leen, modifican y escriben; una pisa a la otra |
| Sesgo de escritura | dos transacciones leen lo mismo, deciden y escriben filas distintas que juntas violan una regla |
Berenson y otros mostraron en 1995 (*A Critique of ANSI SQL Isolation Levels*) que los niveles del estándar estaban mal definidos y describieron el **aislamiento por instantánea** (*snapshot isolation*). PostgreSQL usa **MVCC**: cada transacción ve una instantánea consistente y las lecturas no bloquean a las escrituras. Su nivel SERIALIZABLE (desde 2011) usa la técnica SSI de Cahill y otros (2008), que detecta y aborta las combinaciones peligrosas.

## Bloqueo optimista en la práctica
~~~txt
-- leer
SELECT id, estado, version FROM unidades WHERE placa = 'ABC123';      -- version = 7
-- escribir solo si nadie cambió la fila mientras tanto
UPDATE unidades SET estado = 'reservada', version = version + 1
WHERE id = 42 AND version = 7;
-- si se actualizaron 0 filas: otro llegó primero → recargar y reintentar o avisar
~~~
Es ideal cuando los conflictos son raros. Si son frecuentes (todos compiten por la misma fila), conviene el pesimista («SELECT ... FOR UPDATE»), sabiendo que la base de datos detectará interbloqueos y abortará una de las transacciones, que la aplicación debe reintentar.`,
  checks: [
    ['¿Por qué un índice compuesto (marca, km) no ayuda a «WHERE km > 50000»?', 'Porque el índice está ordenado primero por marca; los km solo están ordenados dentro de cada marca, así que no se puede saltar directo a un rango de km.'],
    ['¿Qué es un índice de cobertura?', 'Un índice que contiene todas las columnas que necesita la consulta, de modo que el motor responde leyendo solo el índice sin ir a la tabla.'],
    ['¿Cómo garantiza el WAL que una transacción confirmada sobreviva a un corte de luz?', 'Porque antes de confirmar se escribe en el registro secuencial (y se fuerza al disco); al reiniciar, el motor rehace desde el registro lo que estaba confirmado.'],
    ['Dos revisores leen que hay un solo supervisor de turno y ambos se dan de baja en filas distintas. ¿Qué anomalía es?', 'Sesgo de escritura: cada transacción por separado respeta la regla, pero juntas la violan; se evita con aislamiento serializable o bloqueando lo leído.'],
    ['Un UPDATE optimista devolvió "0 filas afectadas". ¿Qué significa y qué haces?', 'Que otra transacción cambió la fila (la versión ya no coincide); hay que recargar los datos y reintentar o avisar al usuario.']
  ],
  cites: ['Selinger, P. et al. (1979). Access Path Selection in a Relational Database Management System. *ACM SIGMOD 1979*.', 'Gray, J. (1981). The Transaction Concept: Virtues and Limitations. *VLDB 1981*.', 'Härder, T. y Reuter, A. (1983). Principles of Transaction-Oriented Database Recovery. *ACM Computing Surveys*, 15(4).', 'Berenson, H. et al. (1995). A Critique of ANSI SQL Isolation Levels. *ACM SIGMOD 1995*.', 'Winand, M. (2012). *SQL Performance Explained*. use-the-index-luke.com.'],
  project: { t: 'Laboratorio de rendimiento y concurrencia en SQL',
    goal: 'Medir el efecto real de los índices y reproducir las anomalías de concurrencia con dos sesiones.',
    steps: ['Carga un millón de unidades de prueba y toma cinco consultas frecuentes.', 'Mide cada una con EXPLAIN ANALYZE, crea los índices adecuados y vuelve a medir; prueba también el orden de columnas de un índice compuesto.', 'Mide cuánto empeora la inserción masiva con 0, 3 y 10 índices.', 'Abre dos sesiones y reproduce una actualización perdida y una lectura no repetible con distintos niveles de aislamiento.', 'Implementa la reserva de una unidad con bloqueo optimista y con bloqueo pesimista y compara su comportamiento bajo 50 intentos simultáneos.'],
    deliver: 'Un informe con los planes antes y después, las tablas de tiempos y los guiones de las dos sesiones.' },
  hito: ['Crea los índices para las consultas frecuentes de PatioApp y justifica cada uno con EXPLAIN antes y después.', 'Haz que la asignación de una unidad ocurra en una transacción con bloqueo optimista (columna version) y reintento controlado.']
});

X('m10.nosql', {
  deep: `
## De dónde viene NoSQL
A mediados de los 2000, las empresas de internet necesitaban más escala de la que daba una sola base relacional. Google publicó **Bigtable** (Chang y otros, 2006) y Amazon publicó **Dynamo** (DeCandia y otros, 2007), un almacén clave-valor siempre disponible para el carrito de compras. Inspiraron a Cassandra, HBase, DynamoDB y Riak. El nombre "NoSQL" se popularizó en 2009 en una reunión organizada por Johan Oskarsson. Hoy se interpreta como "no solo SQL": muchas bases relacionales manejan JSON y muchas NoSQL aceptan consultas parecidas a SQL.

## CAP, bien entendido
Eric Brewer planteó en el año 2000 la **conjetura CAP** y Seth Gilbert y Nancy Lynch la demostraron en 2002: en un sistema distribuido, cuando hay una **partición** de red (P), hay que elegir entre **consistencia** (C: todos ven el último valor) y **disponibilidad** (A: todos reciben respuesta). Fuera de una partición no hay que elegir. Daniel Abadi lo completó en 2012 con **PACELC**: si hay partición, elige entre A y C; si no (*else*), elige entre **latencia** y consistencia. Un sistema que replica de forma síncrona es consistente pero más lento; uno que replica de forma asíncrona responde rápido pero puede devolver datos viejos.

## Modelos de consistencia
| Modelo | Garantiza |
| Fuerte (linealizable) | toda lectura ve la última escritura confirmada |
| Leer lo propio | tú siempre ves lo que escribiste (otros quizá no aún) |
| Causal | si A causó B, nadie ve B sin ver A |
| Eventual | si dejan de llegar escrituras, todas las copias terminan iguales |
Martin Kleppmann explica en *Designing Data-Intensive Applications* (capítulos 5, 7 y 9) que la elección depende de la regla de negocio: el contador de "me gusta" tolera consistencia eventual; el saldo de una cuenta o la asignación de una unidad, no.

## Replicación
- **Líder-seguidores:** las escrituras van a un líder y se copian a los seguidores; las lecturas pueden ir a cualquiera. Lo usan PostgreSQL, MySQL y MongoDB.
- **Multilíder:** varios nodos aceptan escrituras (por ejemplo, uno por región); hay que resolver conflictos.
- **Sin líder con quórum** (estilo Dynamo): con N réplicas, se escribe en W y se lee de R; si **R + W > N**, toda lectura toca al menos una réplica con el último valor. Con N = 3, W = 2 y R = 2 se tolera la caída de un nodo.

## Particionamiento
- **Por rango de clave:** fácil para consultas por rango, pero puede concentrar la carga (todas las placas que empiezan con "A" en un nodo).
- **Por hash de la clave:** reparte uniformemente, pero pierde las consultas por rango. El hashing consistente reduce los datos que se mueven al agregar nodos.

## Árboles LSM contra árboles B
Los motores relacionales clásicos usan árboles B, que modifican páginas en su lugar. Muchos almacenes NoSQL (Cassandra, RocksDB) usan **árboles LSM** (O'Neil y otros, 1996): las escrituras se acumulan en memoria y se vuelcan a disco como archivos ordenados que luego se combinan en segundo plano. Escriben mucho más rápido; a cambio, una lectura puede tener que consultar varios archivos (por eso usan filtros de Bloom).

## Los tipos, con ejemplos
~~~js
// Documento: la unidad con sus revisiones embebidas (se leen siempre juntas)
const doc = { _id: 'ABC123', marca: 'Toyota', revisiones: [{ fecha: '2026-11-02', ok: true }] };
// Clave-valor con expiración: una caché
const cache = new Map();
function guardar(k, v, ttlMs) { cache.set(k, { v, vence: Date.now() + ttlMs }); }
function leer(k) { const e = cache.get(k); if (!e || e.vence < Date.now()) { cache.delete(k); return undefined; } return e.v; }
guardar('reporte:hoy', { total: 120 }, 60000);
console.log(doc.revisiones.length, leer('reporte:hoy'));
// Índice invertido: palabra → documentos que la contienen (base de los buscadores)
const notas = { 1: 'rayón en puerta trasera', 2: 'puerta delantera abollada', 3: 'faro roto' };
const indice = {};
for (const [id, t] of Object.entries(notas)) for (const p of t.split(' ')) (indice[p] = indice[p] || new Set()).add(id);
console.log([...indice['puerta']]);
~~~
- **Documentos** (MongoDB): embeber lo que se lee junto y no crece sin límite; referenciar lo que se comparte o crece mucho.
- **Clave-valor** (Redis): cachés, sesiones, contadores, colas.
- **Columnas anchas** (Cassandra): muchísimas escrituras distribuidas, consultas conocidas de antemano.
- **Grafos** (Neo4j): relaciones profundas (quién conoce a quién, rutas, fraudes).
- **Búsqueda** (Elasticsearch, sobre Lucene, la biblioteca de Doug Cutting): texto libre con índice invertido.
- **Series de tiempo:** métricas y sensores.

## Persistencia políglota y NewSQL
Martin Fowler y Pramod Sadalage, en *NoSQL Distilled* (2012), proponen la **persistencia políglota**: cada parte del sistema usa el almacén que mejor encaja. Su costo es operar y mantener sincronizados varios sistemas. Por otro lado, bases **NewSQL** como Spanner de Google (Corbett y otros, 2012) o CockroachDB ofrecen SQL y transacciones ACID distribuidas a escala global. Para la mayoría de los proyectos, empezar con una base relacional bien diseñada sigue siendo la opción más segura.`,
  checks: [
    ['Según CAP, ¿cuándo hay que elegir entre consistencia y disponibilidad?', 'Solo cuando ocurre una partición de red; en funcionamiento normal se pueden tener ambas. PACELC agrega que sin partición se elige entre latencia y consistencia.'],
    ['Con N = 5 réplicas, ¿qué valores de R y W garantizan leer el último valor?', 'Cualquier combinación con R + W > 5, por ejemplo W = 3 y R = 3.'],
    ['¿Para qué datos de PatioApp aceptarías consistencia eventual y para cuáles no?', 'Eventual para contadores del panel o estadísticas; fuerte para la asignación de unidades, los cobros y los estados que deciden una entrega.'],
    ['¿Cuándo embeber y cuándo referenciar en una base de documentos?', 'Embeber lo que se lee siempre junto y tiene tamaño acotado; referenciar lo que se comparte entre documentos o crece sin límite.'],
    ['¿Por qué un árbol LSM escribe más rápido que un árbol B?', 'Porque acumula escrituras en memoria y las vuelca a disco de forma secuencial, en lugar de modificar páginas dispersas en su lugar.']
  ],
  cites: ['DeCandia, G. et al. (2007). Dynamo: Amazon\'s Highly Available Key-value Store. *SOSP 2007*.', 'Gilbert, S. y Lynch, N. (2002). Brewer\'s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services. *ACM SIGACT News*, 33(2).', 'Abadi, D. (2012). Consistency Tradeoffs in Modern Distributed Database System Design. *IEEE Computer*, 45(2).', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O\'Reilly. Capítulos 3, 5, 6 y 9.', 'Sadalage, P. y Fowler, M. (2012). *NoSQL Distilled*. Addison-Wesley.'],
  project: { t: 'El mismo dominio en tres almacenes',
    goal: 'Comparar en la práctica un modelo relacional, uno de documentos y uno clave-valor para el mismo problema.',
    steps: ['Modela unidades y revisiones como documentos (MongoDB, o archivos JSON si no puedes instalarlo) decidiendo qué embeber.', 'Implementa una caché clave-valor con expiración delante de tus consultas más caras y mide la tasa de aciertos.', 'Implementa un índice invertido para buscar texto en las observaciones de las revisiones.', 'Simula tres réplicas con quórum (R, W, N configurables) y muestra lecturas viejas cuando R + W ≤ N.', 'Escribe una tabla comparando el esfuerzo y el comportamiento de cada almacén para cinco consultas.'],
    deliver: 'El código de los experimentos, las mediciones y la tabla comparativa con tu recomendación.' },
  hito: ['Agrega a PatioApp una caché con expiración (TTL) delante de las consultas más frecuentes y mide su tasa de aciertos.', 'Guarda la bitácora de eventos de cada unidad como documentos (o columna JSON) y agrega búsqueda de texto en las observaciones con un índice invertido.']
});
})();
