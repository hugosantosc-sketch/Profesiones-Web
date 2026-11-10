(function () {
var M = SDC.M, S = SDC.S;
var AUTOS = [
  { id: 1, placa: 'ABC-123', marca: 'Toyota', km: 12000, chofer: 1 }, { id: 2, placa: 'XYZ-987', marca: 'Kia', km: 90000, chofer: 2 },
  { id: 3, placa: 'LMN-456', marca: 'Toyota', km: 45000, chofer: 1 }, { id: 4, placa: 'QWE-222', marca: 'Hyundai', km: 3000, chofer: null },
  { id: 5, placa: 'RTY-555', marca: 'Kia', km: 150000, chofer: 3 }, { id: 6, placa: 'UIO-777', marca: 'Toyota', km: 70000, chofer: 2 }
];
var CHOF = [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }, { id: 3, nombre: 'Rosa' }, { id: 4, nombre: 'Pedro' }];
var TAB = 'Tabla autos (id, placa, marca, km, chofer_id):\n' + AUTOS.map(function (a) { return a.id + ' | ' + a.placa + ' | ' + a.marca + ' | ' + a.km + ' | ' + (a.chofer === null ? 'NULL' : a.chofer); }).join('\n');
var TAB2 = TAB + '\n\nTabla choferes (id, nombre):\n' + CHOF.map(function (c) { return c.id + ' | ' + c.nombre; }).join('\n');

M('m10', { title: 'Bases de datos', desc: 'Los programas pasan, los datos se quedan. Diseñar bien cómo se guardan decide si en cinco años el sistema sigue siendo confiable.',
  thread: 'PatioApp guarda vehículos, choferes y revisiones en tablas relacionadas. Asignar un vehículo se hace en una transacción para que nunca quede a medias.',
  books: '*Database System Concepts* (Silberschatz, Korth y Sudarshan), *Designing Data-Intensive Applications* (Kleppmann), *SQL Antipatterns* (Karwin).',
  uni: 'Diseño de Base de Datos (UPC), Base de Datos 1 y 2 (UTP), Big Data (UTEC), Database Systems (CMU).' });

S('m10', 'm10.model', { title: 'Modelo relacional y SELECT',
  ask: '¿Qué concepto relacional se usa?',
  lesson: `
> **La idea en simple.** Una base de datos relacional es un conjunto de hojas de cálculo muy estrictas: cada columna tiene un tipo, cada fila se identifica de manera única y las tablas se conectan por identificadores.

## Conceptos
~~~txt
CREATE TABLE autos (
  id     SERIAL PRIMARY KEY,        -- identifica la fila
  placa  VARCHAR(7) UNIQUE NOT NULL,
  km     INT CHECK (km >= 0),
  chofer_id INT REFERENCES choferes(id)   -- clave foránea
);
~~~
- **Clave primaria:** identifica de forma única.
- **Clave foránea:** apunta a otra tabla y garantiza que exista.
- **Restricciones:** NOT NULL, UNIQUE, CHECK. La base de datos es tu última defensa.

## Consultar
~~~txt
SELECT placa, km            -- qué columnas
FROM autos                  -- de dónde
WHERE km > 10000            -- qué filas
ORDER BY km DESC            -- en qué orden
LIMIT 5;                    -- cuántas
~~~
Orden lógico de ejecución: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.

## Modificar
~~~txt
INSERT INTO autos (placa, km) VALUES ('ABC-123', 1000);
UPDATE autos SET km = 2000 WHERE id = 1;
DELETE FROM autos WHERE id = 1;
~~~

## Puntos que no debes omitir
- SQL es declarativo: dices qué quieres; el optimizador decide cómo.
- **NULL no es cero:** significa "desconocido". «km = NULL» nunca es verdadero: usa «IS NULL».
- Evita «SELECT *» en producción.
- Un UPDATE sin WHERE cambia todas las filas. Pruébalo primero con un SELECT.
- Dinero con DECIMAL, nunca FLOAT.

! Error común: construir SQL concatenando texto del usuario. Es la puerta a la inyección SQL. Usa siempre consultas parametrizadas.`,
  links: [['m1.data', 'los tipos de columna son decisiones de representación'], ['m2.sets', 'las filas forman un conjunto y las consultas son operaciones sobre él'], ['m10.join', 'las claves foráneas permiten unir tablas'], ['m16.owasp', 'la concatenación de SQL causa inyección']],
  read: 'Silberschatz et al., capítulos 1 a 3.',
  terms: [
    ['Clave primaria', 'columna que identifica de forma única cada fila', ['El id de cada vehículo.', 'No puede ser NULL ni repetirse.', 'Las otras tablas la referencian.']],
    ['Clave foránea', 'columna que referencia la clave primaria de otra tabla', ['chofer_id en la tabla autos.', 'Impide asignar un chofer que no existe.', 'Conecta las tablas para unirlas.']],
    ['Restricción', 'regla que la base de datos obliga a cumplir', ['CHECK (km >= 0).', 'UNIQUE en la placa.', 'Rechaza datos malos aunque el código falle.']],
    ['WHERE', 'cláusula que filtra filas', ['Solo autos con km mayor a 1000.', 'Se evalúa antes del SELECT.', 'Olvidarla en un DELETE es un desastre.']],
    ['ORDER BY', 'cláusula que ordena el resultado', ['Del mayor al menor kilometraje.', 'Sin ella el orden no está garantizado.', 'Se usa DESC para descendente.']],
    ['NULL', 'marcador de valor desconocido o ausente', ['Un auto sin chofer asignado.', 'Se compara con IS NULL.', 'Cualquier operación con él da desconocido.']],
    ['DDL', 'parte de SQL que define la estructura', ['CREATE TABLE.', 'ALTER TABLE para agregar una columna.', 'DROP elimina una tabla.']]
  ],
  q: [
    { o: 'Ordena la ejecución lógica de una consulta SQL.', s: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'], e: 'Por eso un alias del SELECT no se puede usar en WHERE.', l: 3 },
    ['¿Qué devuelve «SELECT * FROM autos WHERE chofer_id = NULL»?', 'Ninguna fila', ['Las filas sin chofer', 'Todas las filas', 'Un error siempre'], 'Comparar con NULL da desconocido. Hay que usar IS NULL.', 3],
    ['¿Qué tipo usarías para un precio?', 'DECIMAL(10,2)', ['FLOAT', 'VARCHAR', 'BOOLEAN'], 'Exacto, sin errores de redondeo.', 2],
    ['Debes actualizar el km de un auto. ¿Qué haces antes de ejecutar el UPDATE en producción?', 'Probar el WHERE con un SELECT y hacerlo dentro de una transacción', ['Nada, basta el UPDATE', 'Quitar el WHERE', 'Borrar la tabla'], 'Así verificas qué filas afectarás y puedes revertir.', 4],
    ['¿Dónde debe validarse que una placa sea única?', 'En la base con UNIQUE, además de en el código', ['Solo en el navegador', 'Solo en el código', 'En ningún lado'], 'Con dos peticiones simultáneas, solo la base de datos lo garantiza.', 4],
    { c: 'Implementa un WHERE y un ORDER BY: «consulta(filas, minKm)» devuelve las placas con km >= minKm ordenadas por km descendente.', f: 'consulta', p: ['filas', 'minKm'], t: [[[[{ placa: 'A', km: 5 }, { placa: 'B', km: 9 }, { placa: 'C', km: 1 }], 5], ['B', 'A']], [[[], 0], []]], sol: '  return filas.filter(f => f.km >= minKm).sort((a, b) => b.km - a.km).map(f => f.placa);', l: 2 },
    { c: 'Construye una consulta parametrizada: «sqlSeguro(placa)» devuelve {sql, params} con un marcador $1, nunca concatenando el valor.', f: 'sqlSeguro', p: ['placa'], t: [[['ABC'], { sql: 'SELECT * FROM autos WHERE placa = $1', params: ['ABC'] }], [["x' OR 1=1"], { sql: 'SELECT * FROM autos WHERE placa = $1', params: ["x' OR 1=1"] }]], sol: "  return { sql: 'SELECT * FROM autos WHERE placa = $1', params: [placa] };", l: 3 },
    { c: 'Simula UNIQUE: «insertar(filas, nueva)» devuelve una lista con la nueva fila si su placa no existe; si existe, lanza un Error. Debe devolver la lista resultante.', f: 'insertar', p: ['filas', 'nueva'], t: [[[[{ placa: 'A' }], { placa: 'B' }], [{ placa: 'A' }, { placa: 'B' }]], [[[], { placa: 'A' }], [{ placa: 'A' }]]], sol: "  if (filas.some(f => f.placa === nueva.placa)) throw new Error('Duplicado');\n  return [...filas, nueva];", l: 3 },
    { c: 'Implementa «limite(filas, n, salto)» como LIMIT y OFFSET.', f: 'limite', p: ['filas', 'n', 'salto'], t: [[[[1, 2, 3, 4], 2, 1], [2, 3]], [[[1], 5, 0], [1]]], sol: '  return filas.slice(salto, salto + n);', l: 2 },
    { c: 'Implementa «ordenarPor(filas, campos)» con varios criterios: campos es como [["marca","ASC"],["km","DESC"]].', f: 'ordenarPor', p: ['filas', 'campos'], t: [[[[{ marca: 'B', km: 1 }, { marca: 'A', km: 1 }, { marca: 'A', km: 9 }], [['marca', 'ASC'], ['km', 'DESC']]], [{ marca: 'A', km: 9 }, { marca: 'A', km: 1 }, { marca: 'B', km: 1 }]]], sol: "  return [...filas].sort((a, b) => {\n    for (const [c, d] of campos) {\n      if (a[c] < b[c]) return d === 'ASC' ? -1 : 1;\n      if (a[c] > b[c]) return d === 'ASC' ? 1 : -1;\n    }\n    return 0;\n  });", l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var k = R.pick([3000, 10000, 45000, 50000, 70000, 100000]), n = AUTOS.filter(function (a) { return a.km > k; }).length; g.input(2, '¿Cuántas filas devuelve?', n, 'Se cuentan los autos con km mayor a ' + k + '.', TAB + '\n\nSELECT placa FROM autos WHERE km > ' + k + ';'); });
    ['Toyota', 'Kia', 'Hyundai'].forEach(function (m) { g.input(1, '¿Cuántas filas devuelve?', AUTOS.filter(function (a) { return a.marca === m; }).length, 'Filtra por marca.', TAB + "\n\nSELECT * FROM autos WHERE marca = '" + m + "';"); });
    g.times(6, function (R) { var o = R.pick(['ASC', 'DESC']), s = AUTOS.slice().sort(function (a, b) { return o === 'ASC' ? a.km - b.km : b.km - a.km; }); g.input(3, '¿Qué placa devuelve?', s[0].placa, 'Se ordena y se toma la primera.', TAB + '\n\nSELECT placa FROM autos ORDER BY km ' + o + ' LIMIT 1;'); });
    g.input(2, '¿Cuántas filas devuelve?', 1, 'Solo un auto no tiene chofer.', TAB + '\n\nSELECT * FROM autos WHERE chofer_id IS NULL;');
    g.input(3, '¿Cuántas filas devuelve?', 0, 'Comparar con = NULL nunca es verdadero.', TAB + '\n\nSELECT * FROM autos WHERE chofer_id = NULL;');
    g.times(6, function (R) { var k = R.pick([10000, 40000, 60000]), m = R.pick(['Toyota', 'Kia']), n = AUTOS.filter(function (a) { return a.km > k && a.marca === m; }).length; g.input(3, '¿Cuántas filas devuelve?', n, 'Se deben cumplir ambas condiciones.', TAB + "\n\nSELECT * FROM autos WHERE km > " + k + " AND marca = '" + m + "';"); });
  } });

S('m10', 'm10.join', { title: 'JOIN y agregación',
  ask: '¿Qué operación de SQL corresponde?',
  lesson: `
> **La idea en simple.** Tienes una lista de autos con el número de su chofer y otra de choferes con su nombre. JOIN pone las dos hojas una al lado de la otra y empareja por el número. GROUP BY separa filas en montones y calcula algo por cada montón.

## Tipos de JOIN
~~~txt
SELECT a.placa, c.nombre
FROM autos a
INNER JOIN choferes c ON a.chofer_id = c.id;
~~~
| Tipo | Devuelve |
| INNER JOIN | solo lo que coincide en ambas |
| LEFT JOIN | todo lo de la izquierda; NULL si no hay pareja |
| RIGHT JOIN | todo lo de la derecha |
| FULL JOIN | todo de ambas |
| CROSS JOIN | cada fila con cada fila |

Encontrar lo que **no** tiene pareja:
~~~txt
SELECT c.nombre FROM choferes c
LEFT JOIN autos a ON a.chofer_id = c.id
WHERE a.id IS NULL;   -- choferes sin auto
~~~

## Agregación
~~~txt
SELECT marca, COUNT(*) AS total, AVG(km) AS promedio
FROM autos
GROUP BY marca
HAVING COUNT(*) >= 2
ORDER BY total DESC;
~~~
**WHERE** filtra filas antes de agrupar. **HAVING** filtra grupos después.

## Lo mismo en JavaScript
~~~js
const autos = [{ marca: "Kia", km: 10 }, { marca: "Kia", km: 30 }, { marca: "Toyota", km: 5 }];
const grupos = {};
for (const a of autos) (grupos[a.marca] ??= []).push(a.km);
for (const m in grupos) console.log(m, grupos[m].length, grupos[m].reduce((x, y) => x + y) / grupos[m].length);
~~~

## Puntos que no debes omitir
- «COUNT(*)» cuenta filas; «COUNT(col)» ignora los NULL.
- Todo lo del SELECT debe estar en GROUP BY o dentro de una función de agregación.
- Subconsultas y CTE («WITH») ayudan a leer.
- Funciones de ventana («ROW_NUMBER() OVER») calculan sin colapsar filas.
- **N+1:** una consulta por cada fila en un bucle. Se arregla con un JOIN.

! Error común: olvidar la condición ON. Da un producto cartesiano: 10 000 × 10 000 filas.`,
  links: [['m2.sets', 'INNER JOIN es intersección y el producto cartesiano es CROSS JOIN'], ['m10.model', 'las claves foráneas son las que se unen'], ['m3.arr', 'GROUP BY equivale a un reduce que agrupa'], ['m1.cpu', 'el problema N+1 es una consulta por red en un bucle']],
  read: 'Silberschatz et al., capítulos 3 y 4; Karwin, *SQL Antipatterns*.',
  terms: [
    ['INNER JOIN', 'unión que devuelve solo las filas con coincidencia en ambas tablas', ['Autos con su chofer; se excluyen los sin chofer.', 'Pedidos con su cliente existente.', 'Equivale a una intersección por clave.']],
    ['LEFT JOIN', 'unión que conserva toda la tabla izquierda y pone NULL si no hay pareja', ['Listas todos los choferes, tengan o no auto.', 'Se buscan clientes sin compras con IS NULL.', 'Un reporte muestra también los productos sin ventas.']],
    ['GROUP BY', 'cláusula que agrupa filas por valores de una columna', ['Cuántos autos hay por marca.', 'Ventas por mes.', 'Sumas por categoría.']],
    ['HAVING', 'cláusula que filtra grupos después de agrupar', ['Solo marcas con 2 o más autos.', 'Clientes con compras totales mayores a 1000.', 'Funciona con COUNT y SUM, a diferencia de WHERE.']],
    ['Función de agregación', 'función que resume muchas filas en un valor', ['SUM de los kilometrajes.', 'AVG de los precios.', 'MAX de las fechas.']],
    ['Producto cartesiano', 'combinación de cada fila de una tabla con cada fila de otra', ['Un JOIN sin ON genera millones de filas.', 'CROSS JOIN lo hace a propósito.', 'Tres por cuatro filas dan doce.']],
    ['Problema N+1', 'hacer una consulta por cada resultado de otra consulta', ['Un listado de 100 autos hace 101 consultas.', 'Un ORM carga cada chofer por separado.', 'Se soluciona con JOIN o carga por lotes.']]
  ],
  q: [
    ['¿Qué diferencia hay entre WHERE y HAVING?', 'WHERE filtra filas antes de agrupar; HAVING filtra grupos', ['Son iguales', 'HAVING va antes del FROM', 'WHERE solo funciona con números'], 'WHERE no puede usar agregados.', 3],
    ['Un listado tarda 5 s y se ven 500 consultas casi iguales en el registro. ¿Qué es?', 'El problema N+1', ['Falta de RAM', 'Un error de CSS', 'Un producto cartesiano'], 'Se resuelve trayendo todo con un JOIN.', 4],
    ['¿Cómo hallas los choferes sin auto?', 'LEFT JOIN y luego WHERE a.id IS NULL', ['INNER JOIN', 'CROSS JOIN', 'ORDER BY'], 'Sin pareja, las columnas de la derecha quedan en NULL.', 3],
    { c: 'Implementa INNER JOIN: «unir(autos, choferes)» devuelve [{placa, nombre}] emparejando chofer con id, en O(n+m).', f: 'unir', p: ['autos', 'choferes'], t: [[[[{ placa: 'A', chofer: 1 }, { placa: 'B', chofer: 9 }], [{ id: 1, nombre: 'Ana' }]], [{ placa: 'A', nombre: 'Ana' }]], [[[], []], []]], sol: '  const m = new Map(choferes.map(c => [c.id, c.nombre]));\n  return autos.filter(a => m.has(a.chofer)).map(a => ({ placa: a.placa, nombre: m.get(a.chofer) }));', h: 'Un Map evita el bucle anidado.', l: 3 },
    { c: 'Implementa LEFT JOIN: como antes, pero conserva todos los autos con nombre null si no hay pareja.', f: 'unirIzq', p: ['autos', 'choferes'], t: [[[[{ placa: 'A', chofer: 1 }, { placa: 'B', chofer: 9 }], [{ id: 1, nombre: 'Ana' }]], [{ placa: 'A', nombre: 'Ana' }, { placa: 'B', nombre: null }]]], sol: '  const m = new Map(choferes.map(c => [c.id, c.nombre]));\n  return autos.map(a => ({ placa: a.placa, nombre: m.has(a.chofer) ? m.get(a.chofer) : null }));', l: 3 },
    { c: 'Implementa GROUP BY con COUNT: «contarPor(filas, col)» devuelve un objeto {valor: cantidad}.', f: 'contarPor', p: ['filas', 'col'], t: [[[[{ m: 'a' }, { m: 'a' }, { m: 'b' }], 'm'], { a: 2, b: 1 }], [[[], 'm'], {}]], sol: '  const r = {};\n  for (const f of filas) r[f[col]] = (r[f[col]] || 0) + 1;\n  return r;', l: 2 },
    { c: 'Implementa GROUP BY con HAVING: «marcasFrecuentes(filas, min)» devuelve las marcas con al menos min autos, ordenadas alfabéticamente.', f: 'marcasFrecuentes', p: ['filas', 'min'], t: [[[[{ marca: 'K' }, { marca: 'K' }, { marca: 'T' }], 2], ['K']], [[[], 1], []]], sol: '  const c = {};\n  for (const f of filas) c[f.marca] = (c[f.marca] || 0) + 1;\n  return Object.keys(c).filter(m => c[m] >= min).sort();', l: 3 },
    { c: 'Implementa «promedioPor(filas, col, val)» que devuelva {grupo: promedio} con dos decimales.', f: 'promedioPor', p: ['filas', 'col', 'val'], t: [[[[{ m: 'a', k: 1 }, { m: 'a', k: 2 }, { m: 'b', k: 5 }], 'm', 'k'], { a: 1.5, b: 5 }]], sol: '  const g = {};\n  for (const f of filas) (g[f[col]] = g[f[col]] || []).push(f[val]);\n  const r = {};\n  for (const k in g) r[k] = Math.round(g[k].reduce((a, b) => a + b, 0) / g[k].length * 100) / 100;\n  return r;', l: 4 },
    { c: 'Halla sin pareja: «sinAuto(choferes, autos)» devuelve los nombres de choferes sin autos.', f: 'sinAuto', p: ['choferes', 'autos'], t: [[[[{ id: 1, nombre: 'A' }, { id: 2, nombre: 'B' }], [{ chofer: 1 }]], ['B']], [[[], []], []]], sol: '  const u = new Set(autos.map(a => a.chofer));\n  return choferes.filter(c => !u.has(c.id)).map(c => c.nombre);', l: 3 }
  ],
  gen: function (g) {
    var q = [
      ['SELECT a.placa, c.nombre FROM autos a INNER JOIN choferes c ON a.chofer_id = c.id;', 5, 'Se excluye el auto sin chofer.'],
      ['SELECT a.placa, c.nombre FROM autos a LEFT JOIN choferes c ON a.chofer_id = c.id;', 6, 'Se conservan todos los autos.'],
      ['SELECT c.nombre, a.placa FROM choferes c LEFT JOIN autos a ON a.chofer_id = c.id;', 6, 'Ana 2, Luis 2, Rosa 1 y Pedro con NULL: 6 filas.'],
      ['SELECT c.nombre FROM choferes c LEFT JOIN autos a ON a.chofer_id = c.id WHERE a.id IS NULL;', 1, 'Solo Pedro no tiene auto.'],
      ['SELECT * FROM autos CROSS JOIN choferes;', 24, '6 × 4.'],
      ['SELECT marca, COUNT(*) FROM autos GROUP BY marca;', 3, 'Toyota, Kia y Hyundai.'],
      ['SELECT marca, COUNT(*) FROM autos GROUP BY marca HAVING COUNT(*) >= 2;', 2, 'Toyota 3 y Kia 2.'],
      ['SELECT chofer_id, COUNT(*) FROM autos WHERE chofer_id IS NOT NULL GROUP BY chofer_id;', 3, 'Choferes 1, 2 y 3.'],
      ['SELECT COUNT(chofer_id) FROM autos;', 1, 'Una sola fila con el conteo.'],
      ['SELECT DISTINCT marca FROM autos;', 3, 'Tres marcas distintas.']
    ];
    q.forEach(function (x, i) { g.input(i < 5 ? 2 : 3, '¿Cuántas filas devuelve?', x[1], x[2], TAB2 + '\n\n' + x[0]); });
    var v = [["SELECT COUNT(*) FROM autos WHERE marca = 'Toyota';", 3], ['SELECT COUNT(chofer_id) FROM autos;', 5], ['SELECT MAX(km) FROM autos;', 150000], ['SELECT MIN(km) FROM autos;', 3000], ["SELECT SUM(km) FROM autos WHERE marca = 'Kia';", 240000], ["SELECT AVG(km) FROM autos WHERE marca = 'Kia';", 120000], ["SELECT SUM(km) FROM autos WHERE marca = 'Toyota';", 127000]];
    v.forEach(function (x) { g.input(2, '¿Qué valor devuelve?', x[1], 'Aplica la función a las filas que pasan el filtro.', TAB + '\n\n' + x[0]); });
    g.times(6, function (R) { var a = R.int(2, 30), b = R.int(2, 30); g.input(2, 'Una tabla tiene ' + a + ' filas y otra ' + b + '. ¿Cuántas filas da un CROSS JOIN?', a * b, a + ' × ' + b + '.'); });
  } });

S('m10', 'm10.norm', { title: 'Modelado y normalización',
  ask: '¿Qué concepto de diseño de datos es este?',
  lesson: `
> **La idea en simple.** Si el teléfono de un chofer está copiado en 200 filas y cambia, tienes 200 lugares que actualizar y seguro te olvidas de uno. Normalizar es guardar cada dato en **un solo lugar**.

## Modelo entidad-relación
Se dibuja antes de programar.
- **Entidades:** Vehiculo, Chofer, Revision.
- **Relaciones:** un chofer maneja muchos vehículos (1:N).
- **Muchos a muchos** (N:M): un vehículo pasa por muchos talleres y un taller atiende muchos vehículos. Se resuelve con una **tabla intermedia**.

## Las formas normales
~~~txt
Sin normalizar:
placa   | chofer | tel_chofer | talleres
ABC-123 | Ana    | 999111     | Sur, Norte
~~~
- **1FN:** valores atómicos; nada de "Sur, Norte" en una celda.
- **2FN:** todo depende de la clave completa, no de una parte.
- **3FN:** nada depende de otra columna que no sea la clave. El teléfono depende del chofer, no del auto, así que va a su tabla.
~~~txt
autos(id, placa, chofer_id)
choferes(id, nombre, telefono)
talleres(id, nombre)
autos_talleres(auto_id, taller_id)
~~~
"La clave, toda la clave y nada más que la clave."

## Anomalías que evita
- **Inserción:** no puedes registrar un chofer sin auto.
- **Actualización:** cambiar el teléfono en cientos de filas.
- **Eliminación:** al borrar el último auto, pierdes al chofer.

## Desnormalizar a propósito
Para leer muy rápido a gran escala, se duplica a veces con control. Primero normaliza, y desnormaliza solo si la medición lo justifica.

## Migraciones
El esquema evoluciona con archivos versionados. Una columna nueva debe ser compatible con el código actual para desplegar sin caídas.

## Puntos que no debes omitir
- Elige bien entre claves naturales (placa) y sustitutas (id). Las naturales pueden cambiar.
- Modela el "borrado" lógico cuando se necesite auditoría.
- Guarda las fechas en UTC y muestra en la zona del usuario.

! Error común: guardar una lista separada por comas en una columna. No se puede indexar, filtrar ni validar.`,
  links: [['m10.model', 'las tablas y claves se organizan según esto'], ['m6.refactor', 'la duplicación de datos es como la duplicación de código'], ['m11.uml', 'el diagrama de clases y el ER modelan el mismo dominio'], ['m10.nosql', 'NoSQL suele desnormalizar por diseño']],
  read: 'Silberschatz et al., capítulos 6 y 7; Karwin, *SQL Antipatterns*.',
  terms: [
    ['Primera forma normal', 'cada celda contiene un solo valor atómico', ['Se separa "Sur, Norte" en filas.', 'No hay columnas tel1, tel2, tel3.', 'Una lista en una celda la viola.']],
    ['Segunda forma normal', 'toda columna depende de la clave completa', ['Con clave (auto, taller), el nombre del taller depende solo de taller.', 'Se aplica cuando hay claves compuestas.', 'Se mueven a otra tabla las dependencias parciales.']],
    ['Tercera forma normal', 'ninguna columna depende de otra columna que no sea clave', ['El teléfono depende del chofer y no del auto.', 'La ciudad depende del código postal.', 'Se eliminan las dependencias transitivas.']],
    ['Tabla intermedia', 'tabla que representa una relación de muchos a muchos', ['autos_talleres conecta autos y talleres.', 'Estudiantes y cursos usan matriculas.', 'Puede tener datos propios como la fecha.']],
    ['Anomalía de actualización', 'inconsistencia por cambiar un dato repetido en algunos lugares y no en otros', ['Un chofer aparece con dos teléfonos.', 'Un precio distinto en cada fila del mismo producto.', 'Se corrigió un nombre solo en la mitad de las filas.']],
    ['Desnormalización', 'duplicar datos a propósito para acelerar lecturas', ['Se guarda el total del pedido además de sus líneas.', 'Un conteo se almacena para no recalcularlo.', 'Una tabla de reportes combina datos ya unidos.']],
    ['Migración', 'cambio versionado de la estructura de la base de datos', ['Un archivo agrega una columna y se ejecuta en cada ambiente.', 'Se controla con Git igual que el código.', 'Se ejecuta durante el despliegue.']]
  ],
  q: [
    ['Estudiantes y cursos: ¿qué relación son y cómo se modelan?', 'N:M, con una tabla intermedia', ['1:1, en una sola tabla', '1:N, sin nada más', 'N:M, con una lista en una columna'], 'Cada lado tiene muchos del otro.', 3],
    ['Una fila tiene (pedido_id, cliente_id, cliente_nombre). ¿Qué forma normal viola?', 'La tercera: nombre depende de cliente_id', ['La primera', 'Ninguna', 'La segunda, siempre'], 'Dependencia transitiva.', 3],
    ['¿Cuándo está justificado desnormalizar?', 'Cuando una lectura medida es demasiado lenta y se asume el costo de mantener la consistencia', ['Siempre', 'Antes de tener datos', 'Porque es más fácil'], 'Es una optimización con costo.', 4],
    ['Debes renombrar una columna sin parar el servicio. ¿Qué secuencia usas?', 'Agregar la nueva, escribir en ambas, migrar datos, leer de la nueva y borrar la vieja', ['Renombrar de golpe', 'Borrar y crear', 'Apagar por una semana'], 'Es el patrón expandir y contraer.', 4],
    { c: 'Normaliza: «extraerChoferes(filas)» recibe [{placa, chofer, tel}] y devuelve la lista sin duplicados [{chofer, tel}] en orden de aparición.', f: 'extraerChoferes', p: ['filas'], t: [[[[{ placa: 'A', chofer: 'Ana', tel: 1 }, { placa: 'B', chofer: 'Ana', tel: 1 }, { placa: 'C', chofer: 'Luis', tel: 2 }]], [{ chofer: 'Ana', tel: 1 }, { chofer: 'Luis', tel: 2 }]], [[[]], []]], sol: '  const v = new Set(), r = [];\n  for (const f of filas) if (!v.has(f.chofer)) { v.add(f.chofer); r.push({ chofer: f.chofer, tel: f.tel }); }\n  return r;', l: 3 },
    { c: 'Aplica 1FN: «atomizar(filas)» recibe [{placa, talleres:"Sur, Norte"}] y devuelve una fila por taller [{placa, taller}].', f: 'atomizar', p: ['filas'], t: [[[[{ placa: 'A', talleres: 'Sur, Norte' }]], [{ placa: 'A', taller: 'Sur' }, { placa: 'A', taller: 'Norte' }]], [[[]], []]], sol: "  return filas.flatMap(f => f.talleres.split(',').map(t => ({ placa: f.placa, taller: t.trim() })));", l: 3 },
    { c: 'Detecta anomalías: «inconsistentes(filas)» recibe [{chofer, tel}] y devuelve los choferes con más de un teléfono distinto, ordenados.', f: 'inconsistentes', p: ['filas'], t: [[[[{ chofer: 'A', tel: 1 }, { chofer: 'A', tel: 2 }, { chofer: 'B', tel: 3 }]], ['A']], [[[]], []]], sol: '  const m = {};\n  for (const f of filas) (m[f.chofer] = m[f.chofer] || new Set()).add(f.tel);\n  return Object.keys(m).filter(c => m[c].size > 1).sort();', l: 4 }
  ],
  gen: function (g) {
    var r = [['Un vehículo tiene una placa única asignada y esa placa solo pertenece a él.', '1:1'], ['Un chofer maneja muchos vehículos y cada vehículo tiene un chofer.', '1:N'], ['Un vehículo visita muchos talleres y un taller atiende muchos vehículos.', 'N:M'], ['Un cliente hace muchos pedidos; un pedido es de un cliente.', '1:N'], ['Un producto aparece en muchos pedidos y un pedido tiene muchos productos.', 'N:M'], ['Un usuario tiene un perfil único.', '1:1'], ['Un estudiante cursa muchas materias y una materia tiene muchos estudiantes.', 'N:M'], ['Una factura tiene muchas líneas.', '1:N']];
    r.forEach(function (x) { g.mcq(2, '¿Qué cardinalidad tiene esta relación?\n' + x[0], x[1], ['1:1', '1:N', 'N:M'].filter(function (y) { return y !== x[1]; }), 'La relación es ' + x[1] + '.'); });
    g.times(6, function (R) { var a = R.int(5, 20), b = R.int(50, 500); g.input(3, 'Un dato repetido en ' + b + ' filas ocupa ' + a + ' bytes. ¿Cuántos bytes ahorras al normalizarlo en una sola fila?', a * (b - 1), a + ' × ' + (b - 1) + ', sin contar las referencias.'); });
  } });

S('m10', 'm10.index', { title: 'Índices y transacciones',
  ask: '¿Qué concepto se aplica?',
  lesson: `
> **La idea en simple.** El índice de un libro evita leerlo entero. Una **transacción** es como una transferencia bancaria: o se descuenta y se abona, o no pasa nada. Nunca a medias.

## Índices
Sin índice, la base recorre toda la tabla: O(n). Con un **B+ tree**: O(log n).
~~~txt
CREATE INDEX idx_autos_placa ON autos(placa);
EXPLAIN SELECT * FROM autos WHERE placa = 'ABC-123';
~~~
Tienen un costo: ocupan espacio y hacen más lentas las escrituras.
- Indexa columnas de WHERE, JOIN y ORDER BY.
- **Índice compuesto** (a, b): sirve para a, y para a con b, pero **no** solo para b.
- Buscar con «LIKE '%abc'» no aprovecha el índice.
- «EXPLAIN» muestra cómo se ejecutará una consulta. Antes de optimizar, míralo.

## ACID
| Letra | Significado | Analogía |
| A: Atomicidad | todo o nada | transferencia completa |
| C: Consistencia | las reglas se cumplen siempre | nunca saldo negativo |
| I: Aislamiento | las transacciones no se pisan | cada una parece estar sola |
| D: Durabilidad | lo confirmado sobrevive a un corte | queda en disco |
~~~txt
BEGIN;
UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;     -- o ROLLBACK si algo falla
~~~

## Niveles de aislamiento
De menos a más estricto: lectura no confirmada, lectura confirmada (*read committed*), lectura repetible, serializable. Más aislamiento implica menos anomalías, pero menos rendimiento. Anomalías: lectura sucia, lectura no repetible, lectura fantasma.

## Bloqueos
- **Pesimista:** bloqueas antes de editar («SELECT ... FOR UPDATE»).
- **Optimista:** verificas una versión al guardar; si cambió, reintentas.
Dos transacciones que bloquean en orden inverso causan un **interbloqueo**.

## Puntos que no debes omitir
- Mantén cortas las transacciones.
- Respaldos que nunca probaste restaurar no son respaldos.
- El *connection pool* evita abrir una conexión por petición.

! Error común: crear índices en todas las columnas. Cada índice encarece cada escritura.`,
  links: [['m4.trees', 'los índices son árboles B+'], ['m4.bigo', 'de O(n) a O(log n)'], ['m8.conc', 'el aislamiento resuelve las condiciones de carrera'], ['m13.dist', 'en sistemas distribuidos ACID se complica y aparece el teorema CAP']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulos 3 y 7.',
  terms: [
    ['Índice', 'estructura auxiliar que acelera la búsqueda por una columna', ['Una búsqueda por placa baja de segundos a milisegundos.', 'Ocupa espacio adicional.', 'Hace más lentos los INSERT.']],
    ['Atomicidad', 'una transacción se ejecuta completa o no se ejecuta', ['Se cae el servidor entre el débito y el abono, y no queda nada aplicado.', 'Un ROLLBACK deshace todo.', 'Nunca queda una transferencia a medias.']],
    ['Consistencia', 'una transacción lleva la base de un estado válido a otro válido', ['Un CHECK rechaza un saldo negativo.', 'Las claves foráneas siempre apuntan a filas que existen.', 'Ninguna regla queda rota al confirmar.']],
    ['Aislamiento', 'las transacciones concurrentes no ven resultados intermedios ajenas', ['Otro usuario no ve un saldo a medio transferir.', 'Serializable es su nivel máximo.', 'Evita las lecturas sucias.']],
    ['Durabilidad', 'lo confirmado no se pierde aunque ocurra un fallo', ['Tras un COMMIT se corta la luz y los datos siguen.', 'Se escribe un registro antes de aplicar cambios.', 'Un apagado no borra una venta confirmada.']],
    ['Bloqueo optimista', 'permitir leer sin bloquear y verificar una versión al guardar', ['Un UPDATE incluye «WHERE version = 3».', 'Dos usuarios editan una ficha y el segundo debe reintentar.', 'Funciona bien con pocos conflictos.']],
    ['EXPLAIN', 'comando que muestra el plan de ejecución de una consulta', ['Revela un "Seq Scan" sobre un millón de filas.', 'Confirmas si tu índice se está usando.', 'Es el primer paso para optimizar una consulta lenta.']]
  ],
  q: [
    ['Hay un índice compuesto (marca, km). ¿Cuál consulta NO lo aprovecha bien?', "WHERE km > 100", ["WHERE marca = 'Kia'", "WHERE marca = 'Kia' AND km > 100", "WHERE marca = 'Kia' ORDER BY km"], 'Se usa de izquierda a derecha, como un directorio por apellido y luego nombre.', 4],
    ['Falla el segundo UPDATE de una transferencia dentro de una transacción. ¿Qué pasa con el primero?', 'Se revierte con ROLLBACK', ['Se queda aplicado', 'Se duplica', 'Se aplica mañana'], 'Es la atomicidad.', 2],
    ['¿Por qué no indexar una columna "activo" con solo dos valores?', 'Filtra muy poco; casi siempre conviene recorrer la tabla', ['No se puede', 'Se borra sola', 'Hace más rápidas las escrituras'], 'Se llama baja selectividad.', 4],
    ['Una transacción lee dos veces la misma fila y obtiene valores distintos porque otra confirmó en medio. ¿Qué anomalía es?', 'Lectura no repetible', ['Lectura sucia', 'Inserción perdida', 'Lectura fantasma'], 'La fantasma se refiere a filas nuevas; la sucia, a datos no confirmados.', 4],
    { c: 'Simula una transacción: «transferir(saldos, de, a, monto)» devuelve el nuevo objeto de saldos sin mutar; si no alcanza, devuelve el objeto original.', f: 'transferir', p: ['saldos', 'de', 'a', 'monto'], t: [[[{ x: 100, y: 0 }, 'x', 'y', 30], { x: 70, y: 30 }], [[{ x: 10, y: 0 }, 'x', 'y', 30], { x: 10, y: 0 }]], sol: '  if (saldos[de] < monto) return saldos;\n  return { ...saldos, [de]: saldos[de] - monto, [a]: saldos[a] + monto };', l: 3 },
    { c: 'Implementa bloqueo optimista: «actualizar(fila, nuevoKm, versionLeida)» devuelve {ok:true, fila con version+1} o {ok:false} si la versión no coincide.', f: 'actualizar', p: ['fila', 'nuevoKm', 'versionLeida'], t: [[[{ km: 1, version: 3 }, 2, 3], { ok: true, fila: { km: 2, version: 4 } }], [[{ km: 1, version: 4 }, 2, 3], { ok: false }]], sol: '  if (fila.version !== versionLeida) return { ok: false };\n  return { ok: true, fila: { ...fila, km: nuevoKm, version: fila.version + 1 } };', l: 3 },
    { c: 'Construye un índice: «indexar(filas, col)» devuelve un Map en forma de objeto {valor: [posiciones]}.', f: 'indexar', p: ['filas', 'col'], t: [[[[{ m: 'a' }, { m: 'b' }, { m: 'a' }], 'm'], { a: [0, 2], b: [1] }]], sol: '  const r = {};\n  filas.forEach((f, i) => (r[f[col]] = r[f[col]] || []).push(i));\n  return r;', l: 3 },
    { c: 'Simula un registro de escritura anticipada: «recuperar(log)» recibe entradas {tx, k, v} y {tx, commit:true}; devuelve el estado final aplicando solo las transacciones confirmadas, en orden.', f: 'recuperar', p: ['log'], t: [[[[{ tx: 1, k: 'a', v: 1 }, { tx: 2, k: 'b', v: 2 }, { tx: 1, commit: true }]], { a: 1 }], [[[]], {}]], sol: '  const ok = new Set(log.filter(e => e.commit).map(e => e.tx)), r = {};\n  for (const e of log) if (!e.commit && ok.has(e.tx)) r[e.k] = e.v;\n  return r;', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var e = R.int(10, 30); g.input(2, 'En una tabla de 2^' + e + ' filas, ¿cuántas comparaciones hace aproximadamente una búsqueda con un índice en árbol binario?', e, 'log₂(2^' + e + ') = ' + e + '.'); });
    g.times(8, function (R) { var f = R.pick([1000, 100000, 1000000]), b = R.pick([100, 200]); g.input(3, 'Un árbol B tiene ' + b + ' hijos por nodo y la tabla ' + f + ' filas. ¿Cuántos niveles se necesitan como mínimo? (redondea hacia arriba)', Math.ceil(Math.log(f) / Math.log(b) - 1e-9), 'log base ' + b + ' de ' + f + '.'); });
  } });

S('m10', 'm10.nosql', { title: 'NoSQL y otros almacenes',
  ask: '¿Qué tipo de almacenamiento conviene?',
  lesson: `
> **La idea en simple.** No se guarda igual una caja de herramientas que una biblioteca. SQL es excelente para datos relacionados con reglas estrictas, pero hay otros problemas que piden otro tipo de almacén.

## Los tipos
| Tipo | Modelo | Ideal para | Ejemplos |
| Clave-valor | diccionario | caché, sesiones | Redis, DynamoDB |
| Documentos | JSON flexible | catálogos, contenido | MongoDB, Firestore |
| Columnas anchas | filas por partición | escritura masiva, series | Cassandra, HBase |
| Grafos | nodos y aristas | relaciones complejas | Neo4j |
| Búsqueda | índice invertido | texto completo | Elasticsearch |
| Series de tiempo | medidas por fecha | métricas | InfluxDB |
| Objetos | archivos grandes | imágenes, respaldos | S3 |

## Documentos: embeber o referenciar
~~~js
const auto = {
  placa: "ABC-123",
  revisiones: [               // embebido: se lee junto
    { fecha: "2026-01-10", ok: true }
  ],
  choferId: 7                 // referencia: se consulta aparte
};
console.log(auto.revisiones.length, auto.choferId);
~~~
Regla: embebe lo que se lee junto y no crece sin límite.

## Escalar: replicar y particionar
- **Réplicas:** copias para lecturas y tolerancia a fallos.
- **Particiones (sharding):** repartir los datos por clave entre servidores.

## CAP y consistencia eventual
Ante una partición de red, un sistema distribuido debe escoger entre responder con datos quizá viejos (disponibilidad) o no responder (consistencia). Muchos NoSQL eligen **consistencia eventual**: tarde o temprano todas las réplicas coinciden.

## Cuándo elegir qué
- ¿Dinero, inventario, reglas estrictas? Empieza con SQL. PostgreSQL resuelve casi todo y hasta guarda JSON.
- ¿Caché o sesiones? Clave-valor.
- ¿Texto libre? Motor de búsqueda además de tu base principal.
- **Persistencia políglota:** usar varios almacenes según cada necesidad.

## Puntos que no debes omitir
- "Sin esquema" no existe: el esquema vive en tu código.
- OLTP son operaciones del día a día; OLAP son análisis masivos (data warehouse).
- ETL extrae, transforma y carga datos entre sistemas.

! Error común: elegir NoSQL "porque escala" sin tener el problema. Un buen PostgreSQL soporta muchísimo.`,
  links: [['m10.norm', 'el modelo de documentos desnormaliza por diseño'], ['m4.hash', 'clave-valor es una tabla hash distribuida'], ['m13.dist', 'CAP aplica a todo sistema distribuido'], ['m13.scale', 'la caché reduce la carga de la base principal']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulos 2, 5 y 6.',
  terms: [
    ['Clave-valor', 'almacén que recupera un valor a partir de una clave', ['Sesiones de usuario en Redis.', 'Una caché de respuestas por URL.', 'Acceso rapidísimo, pero sin consultas complejas.']],
    ['Base de documentos', 'almacén de objetos tipo JSON con estructura flexible', ['Productos con atributos distintos por categoría.', 'MongoDB guarda colecciones.', 'Un artículo con comentarios embebidos.']],
    ['Base de grafos', 'almacén optimizado para recorrer relaciones', ['"Amigos de mis amigos" en una red social.', 'Detección de fraude por conexiones.', 'Neo4j con consultas de caminos.']],
    ['Índice invertido', 'estructura que asocia cada palabra con los documentos que la contienen', ['Elasticsearch busca en texto libre.', 'Un buscador encuentra "frenos" en millones de informes.', 'Es el índice alfabético al final de un libro.']],
    ['Sharding', 'repartir los datos entre servidores por una clave', ['Usuarios A-M en un servidor y N-Z en otro.', 'Una tabla ya no cabe en una sola máquina.', 'Las consultas que cruzan particiones son costosas.']],
    ['Replicación', 'mantener copias de los datos en varios servidores', ['Una copia de solo lectura reparte la carga.', 'Si el primario cae, otro toma su lugar.', 'Puede haber retraso entre copias.']],
    ['Consistencia eventual', 'las réplicas acabarán coincidiendo si se dejan de hacer cambios', ['Un "me gusta" tarda segundos en verse en otro país.', 'Un usuario ve datos algo viejos.', 'Se acepta a cambio de disponibilidad.']]
  ],
  q: [
    ['¿Qué eliges para un sistema de pagos con saldos?', 'Una base relacional con transacciones ACID', ['Un archivo de texto', 'Solo una caché', 'Una base de grafos'], 'El dinero exige consistencia fuerte.', 3],
    ['¿Qué es correcto sobre MongoDB y el esquema?', 'El esquema existe de todos modos, solo que tu aplicación lo debe cuidar', ['No hay ningún esquema', 'Se genera solo', 'Impide errores de datos'], 'Sin validación, aparecen datos de mil formas.', 4],
    ['Durante una partición de red, un sistema elige seguir respondiendo aunque pueda devolver datos viejos. ¿Qué prioriza?', 'Disponibilidad', ['Consistencia', 'Tolerancia a usuarios', 'Atomicidad'], 'Es un sistema AP según el teorema CAP.', 3],
    ['Quieres hacer 1 millón de lecturas por segundo de la misma lista de marcas. ¿Qué agregas?', 'Una caché clave-valor', ['Otra columna', 'Un índice de texto', 'Más joins'], 'La lista cambia poco y se lee mucho.', 3],
    { c: 'Implementa un índice invertido: «invertir(docs)» recibe {id: "texto"} y devuelve {palabra: [ids ordenados]} en minúsculas.', f: 'invertir', p: ['docs'], t: [[[{ 1: 'Falla freno', 2: 'freno ok' }], { falla: ['1'], freno: ['1', '2'], ok: ['2'] }], [[{}], {}]], sol: "  const r = {};\n  for (const id of Object.keys(docs).sort()) {\n    for (const w of new Set(docs[id].toLowerCase().split(/\\s+/))) (r[w] = r[w] || []).push(id);\n  }\n  return r;", l: 4 },
    { c: 'Implementa sharding: «particion(id, n)» devuelve id % n; «repartir(ids, n)» aquí debe devolver un arreglo de n listas con los ids en su partición.', f: 'repartir', p: ['ids', 'n'], t: [[[[1, 2, 3, 4], 2], [[2, 4], [1, 3]]], [[[], 2], [[], []]]], sol: '  const r = Array.from({ length: n }, () => []);\n  for (const id of ids) r[id % n].push(id);\n  return r;', l: 3 },
    { c: 'Simula una caché LRU de capacidad k: «lruFallos(accesos, k)» devuelve cuántos accesos no estaban en la caché.', f: 'lruFallos', p: ['accesos', 'k'], t: [[[['a', 'b', 'a', 'c', 'b'], 2], 4], [[['a', 'a'], 1], 1], [[[], 2], 0]], sol: '  const c = [];\n  let f = 0;\n  for (const a of accesos) {\n    const i = c.indexOf(a);\n    if (i >= 0) c.splice(i, 1);\n    else { f++; if (c.length === k) c.shift(); }\n    c.push(a);\n  }\n  return f;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Guardar sesiones de usuario con tiempo de expiración.', 'Clave-valor'], ['Buscar texto libre en informes de revisión.', 'Motor de búsqueda'], ['Encontrar conexiones entre personas en una red de referidos.', 'Grafos'], ['Registrar temperatura de sensores cada segundo.', 'Series de tiempo'], ['Guardar fotos de vehículos.', 'Objetos'], ['Catálogo de productos con atributos muy variados.', 'Documentos'], ['Facturación con reglas y transacciones.', 'Relacional'], ['Un millón de lecturas por segundo de una configuración.', 'Clave-valor'], ['Registrar eventos masivos con escritura constante en muchos nodos.', 'Columnas anchas'], ['Contenido de un blog con comentarios incluidos.', 'Documentos']];
    var o = ['Clave-valor', 'Motor de búsqueda', 'Grafos', 'Series de tiempo', 'Objetos', 'Documentos', 'Relacional', 'Columnas anchas'];
    c.forEach(function (x) { g.mcq(2, '¿Qué almacén encaja mejor?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Se ajusta a ' + x[1] + '.'); });
    g.times(8, function (R) { var id = R.int(100, 9999), n = R.pick([3, 4, 8, 16]); g.input(2, 'Con sharding por id % ' + n + ', ¿en qué partición cae el id ' + id + '?', id % n, id + ' % ' + n + ' = ' + id % n + '.'); });
  } });
})();
