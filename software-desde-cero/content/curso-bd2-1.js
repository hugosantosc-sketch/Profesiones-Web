(function () {
var M = SDC.M, S = SDC.S;
M('bd2', { title: 'Bases de Datos II: sistemas de bases de datos', prof: true,
  desc: 'Curso completo sobre cómo funciona un sistema de bases de datos por dentro y cómo se diseña con rigor. Sobre lo aprendido en Bases de Datos I (modelado, SQL básico y normalización), aquí se estudian el álgebra relacional y la lógica de SQL, el SQL avanzado, la teoría formal de dependencias, el almacenamiento en páginas y el buffer, los índices B+ y LSM, la ejecución y optimización de consultas, las transacciones con su control de concurrencia, la recuperación ante fallas y las bases de datos distribuidas.',
  thread: 'La base de datos de PatioApp pasa de "funciona" a "se entiende y se controla": sus consultas se expresan en álgebra relacional, los reportes usan funciones ventana, el esquema se verifica en BCNF, los índices se eligen con EXPLAIN, las reservas de espacios se protegen con el nivel de aislamiento correcto, los respaldos permiten recuperar a cualquier minuto y las lecturas se reparten en réplicas.',
  books: '*Database System Concepts* (Silberschatz, Korth y Sudarshan), *Database Management Systems* (Ramakrishnan y Gehrke), *Database Systems: The Complete Book* (Garcia-Molina, Ullman y Widom), *Transaction Processing* (Gray y Reuter), *Readings in Database Systems* ("Red Book", Bailis, Hellerstein y Stonebraker).',
  uni: 'CMU 15-445/645 *Database Systems* (Andy Pavlo, con clases públicas); Berkeley CS186; Stanford CS145 y CS245; MIT 6.5830 (antes 6.830). En Perú: Base de Datos II y Sistemas de Bases de Datos (UNI, PUCP, UNMSM, UPC, UTEC).',
  capstone: { t: 'Motor de base de datos en miniatura',
    goal: 'Construir un pequeño motor que muestre por dentro lo que hace un sistema de bases de datos.',
    steps: ['Implementa almacenamiento en páginas de tamaño fijo con un buffer pool y reemplazo LRU o reloj.', 'Agrega un índice B+ con inserción, búsqueda puntual y búsqueda por rango.', 'Implementa operadores de selección, proyección y unión (bucles anidados por bloques y hash) con el modelo de iteradores.', 'Agrega transacciones con bloqueo en dos fases estricto y un registro WAL que permita recuperar tras una caída simulada.', 'Mide y explica el costo en páginas leídas de distintos planes para la misma consulta.'],
    deliver: 'El código del motor, sus pruebas (incluidas las de falla) y un informe con las mediciones.' } });

S('bd2', 'bd2.algebra', { title: 'Álgebra relacional y la lógica de SQL',
  ask: '¿Qué concepto de álgebra relacional o de la lógica de SQL se aplica?',
  lesson: `
> **La idea en simple.** SQL parece un idioma, pero debajo hay matemática: cada consulta es una combinación de unas pocas operaciones sobre tablas, como sumas y multiplicaciones sobre números. Conocer esas operaciones te permite razonar sobre una consulta, reescribirla para que sea más rápida y entender por qué a veces devuelve resultados inesperados, sobre todo cuando aparecen valores NULL.

## El modelo relacional
Edgar F. Codd, investigador de IBM, publicó en 1970 *A Relational Model of Data for Large Shared Data Banks*. Su propuesta fue revolucionaria: separar **cómo se guardan** los datos de **cómo se piden** (independencia de datos) y representarlos como **relaciones**: conjuntos de tuplas con los mismos atributos. Codd recibió el Premio Turing en 1981. En sus términos:
- Una **relación** es una tabla; un **esquema** es su nombre con sus atributos, como Unidad(placa, marca, patio).
- Una **tupla** es una fila; un **atributo**, una columna; un **dominio**, el conjunto de valores posibles de un atributo.
- En el modelo teórico, una relación es un **conjunto**: no tiene filas repetidas ni orden.

## Las operaciones del álgebra relacional
Cada operación recibe relaciones y devuelve una relación, así que se pueden componer:
| Operación | Símbolo | Qué hace | Equivalente en SQL |
| Selección | σ | filas que cumplen una condición | WHERE |
| Proyección | π | columnas elegidas, sin duplicados | SELECT DISTINCT columnas |
| Producto cartesiano | × | toda fila de R con toda fila de S | FROM R, S |
| Unión | ∪ | filas de R o de S (mismos atributos) | UNION |
| Diferencia | − | filas de R que no están en S | EXCEPT |
| Renombrado | ρ | cambiar el nombre de relación o atributos | AS |
De esas seis se derivan las demás:
- **Reunión** (*join*) **natural** R ⋈ S: producto seguido de una selección que iguala los atributos comunes y una proyección que deja una sola copia de ellos.
- **Reunión theta** R ⋈_θ S: producto con una condición θ cualquiera.
- **Intersección:** R ∩ S = R − (R − S).
- **División** R ÷ S: las tuplas de R relacionadas con **todas** las de S ("los clientes que tienen vehículos en todos los patios").
Un lenguaje es **relacionalmente completo** si puede expresar todo lo que expresa el álgebra; SQL lo es.

## Ejemplo con PatioApp
Con Unidad(placa, marca, patio) y Patio(patio, distrito), "las placas de las unidades Toyota en patios de Ate" se escribe:
:::flow π_placa ( σ_marca='Toyota' ∧ distrito='Ate' ( Unidad ⋈ Patio ) )
y en SQL: «SELECT DISTINCT u.placa FROM unidad u JOIN patio p ON u.patio = p.patio WHERE u.marca = 'Toyota' AND p.distrito = 'Ate'».
~~~js
// Álgebra relacional sobre arreglos de objetos
const Unidad = [{ placa: 'ABC-123', marca: 'Toyota', patio: 1 }, { placa: 'XYZ-987', marca: 'Kia', patio: 2 }, { placa: 'DEF-456', marca: 'Toyota', patio: 2 }];
const Patio = [{ patio: 1, distrito: 'Ate' }, { patio: 2, distrito: 'Callao' }];
const sigma = (R, cond) => R.filter(cond);
const pi = (R, attrs) => [...new Map(R.map(t => { const o = {}; attrs.forEach(a => o[a] = t[a]); return [JSON.stringify(o), o]; })).values()];
const join = (R, S) => R.flatMap(r => S.filter(s => Object.keys(s).every(k => !(k in r) || r[k] === s[k])).map(s => ({ ...r, ...s })));
console.log(pi(sigma(join(Unidad, Patio), t => t.marca === 'Toyota' && t.distrito === 'Ate'), ['placa']));
console.log(pi(Unidad, ['marca']));   // sin duplicados, como en el álgebra
~~~

## Equivalencias: la base de la optimización
Dos expresiones son **equivalentes** si dan el mismo resultado para cualquier instancia. Algunas reglas que usan los optimizadores:
- Las selecciones se pueden **dividir y reordenar**: σ_{a ∧ b}(R) = σ_a(σ_b(R)).
- Una selección se puede **empujar** dentro de una reunión si solo usa atributos de un lado: σ_marca='Toyota'(Unidad ⋈ Patio) = σ_marca='Toyota'(Unidad) ⋈ Patio. Filtrar antes reduce mucho lo que hay que reunir.
- Las proyecciones también se pueden empujar, conservando los atributos que la reunión necesita.
- La reunión es **conmutativa y asociativa**: (R ⋈ S) ⋈ T = R ⋈ (S ⋈ T). Con n tablas hay muchísimos órdenes posibles; elegir el mejor es el trabajo central del optimizador.

## Operadores extendidos
Los libros y los motores agregan operadores que no aumentan el poder expresivo, pero describen mejor lo que se ejecuta:
- **Agrupación** γ: γ_patio, COUNT(*)(Estadia) agrupa y agrega, como GROUP BY.
- **Semirreunión** R ⋉ S: las tuplas de R que tienen al menos una pareja en S, sin agregar columnas de S. Es lo que ejecuta un EXISTS.
- **Antirreunión** R ▷ S: las tuplas de R que no tienen pareja en S; es un NOT EXISTS.
- **Reuniones externas** (⟕, ⟖, ⟗): conservan las tuplas sin pareja de un lado, de otro o de ambos, rellenando con NULL. Son el LEFT, RIGHT y FULL OUTER JOIN.
- **Eliminación de duplicados** δ y **ordenamiento** τ, necesarios porque SQL trabaja con multiconjuntos.
Cuando pidas a PostgreSQL el plan de una consulta con EXISTS, verás nodos como «Hash Semi Join» o «Hash Anti Join»: son exactamente estos operadores.

## SQL no es exactamente el álgebra
Donald Chamberlin y Raymond Boyce, también de IBM, diseñaron SEQUEL en 1974, que se convirtió en SQL y en norma ANSI en 1986. SQL se aparta del modelo de Codd en puntos importantes:
- **Multiconjuntos:** SQL conserva filas duplicadas salvo que se pida DISTINCT. UNION elimina duplicados; UNION ALL no.
- **Orden:** las filas no tienen orden salvo que se use ORDER BY; cualquier orden "que siempre salía igual" puede cambiar mañana.
- **NULL:** representa un valor desconocido o inexistente, y trae una **lógica de tres valores**.

## La lógica de tres valores
Cualquier comparación con NULL da **UNKNOWN**, no verdadero ni falso: «NULL = NULL» es UNKNOWN, y también «5 > NULL». Las tablas de verdad:
| A | B | A AND B | A OR B |
| TRUE | UNKNOWN | UNKNOWN | TRUE |
| FALSE | UNKNOWN | FALSE | UNKNOWN |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
y NOT UNKNOWN es UNKNOWN. **WHERE conserva solo las filas cuya condición es TRUE**, así que descarta tanto las FALSE como las UNKNOWN. Consecuencias que sorprenden:
- «WHERE telefono <> '999'» no devuelve las filas con teléfono NULL.
- «WHERE x = NULL» nunca devuelve nada; hay que escribir «x IS NULL».
- «NOT IN (subconsulta)» devuelve **cero filas** si la subconsulta contiene algún NULL, porque «5 NOT IN (1, NULL)» equivale a «5 <> 1 AND 5 <> NULL», que es UNKNOWN. Por eso se prefiere NOT EXISTS.
- Las funciones de agregación ignoran los NULL: COUNT(columna) los omite, COUNT(*) no.
Chris Date y Hugh Darwen, críticos históricos de SQL, argumentaron en *The Third Manifesto* (1995) que NULL y la lógica de tres valores son un error de diseño; en la práctica, hay que conocerlos bien y declarar NOT NULL siempre que el dato sea obligatorio.

## Cálculo relacional
Codd propuso también un lenguaje **declarativo** basado en la lógica: el **cálculo relacional**, que describe qué tuplas se quieren y no cómo obtenerlas: { t.placa | t ∈ Unidad ∧ t.marca = 'Toyota' }. Su teorema de equivalencia mostró que el álgebra y el cálculo (con fórmulas seguras) tienen el mismo poder expresivo. SQL tiene sabor de cálculo (se declara qué se quiere); el motor lo traduce a álgebra para ejecutarlo.

## Ejemplo resuelto: la consulta que no devolvía nada
En PatioApp, el reporte "unidades cuyo cliente no está en la lista negra" usaba «WHERE cliente_id NOT IN (SELECT cliente_id FROM lista_negra)» y un día empezó a devolver cero filas. Causa: alguien insertó en lista_negra una fila con cliente_id NULL, y por la lógica de tres valores todas las comparaciones pasaron a UNKNOWN. Corrección: reescribir con «WHERE NOT EXISTS (SELECT 1 FROM lista_negra n WHERE n.cliente_id = u.cliente_id)», que no sufre ese problema, y agregar la restricción NOT NULL a lista_negra.cliente_id para que el dato inválido no pueda volver a entrar.`,
  links: [['m10.join', 'esta unidad formaliza las reuniones que se usaron en Bases de Datos I'], ['m2.prop', 'la lógica proposicional se extiende aquí a tres valores'], ['bd2.query', 'las equivalencias del álgebra son la base de la optimización de consultas']],
  read: 'Silberschatz, Korth y Sudarshan, capítulos 2 y 3; Ramakrishnan y Gehrke, capítulo 4; Codd (1970).',
  terms: [
    ['Relación', 'conjunto de tuplas con los mismos atributos, representado como una tabla', ['Unidad(placa, marca, patio).', 'En teoría no tiene filas repetidas ni orden.', 'Codd la propuso en 1970.']],
    ['Selección', 'operación que conserva las tuplas que cumplen una condición', ['σ_marca=Toyota(Unidad).', 'Equivale a WHERE.', 'Conviene aplicarla lo antes posible.']],
    ['Proyección', 'operación que conserva solo algunos atributos y elimina duplicados', ['π_marca(Unidad) da las marcas distintas.', 'Equivale a SELECT DISTINCT.', 'Reduce el tamaño de lo que se procesa.']],
    ['Reunión natural', 'combinación de dos relaciones que empareja las tuplas con igual valor en los atributos comunes', ['Unidad ⋈ Patio por el atributo patio.', 'Es un producto, una selección y una proyección.', 'Es conmutativa y asociativa.']],
    ['División relacional', 'operación que devuelve las tuplas relacionadas con todas las tuplas de otra relación', ['Clientes con unidades en todos los patios.', 'Se expresa en SQL con NOT EXISTS anidados.', 'Se deriva de las operaciones básicas.']],
    ['Lógica de tres valores', 'lógica de SQL con TRUE, FALSE y UNKNOWN, que resulta de comparar con NULL', ['NULL = NULL es UNKNOWN.', 'WHERE descarta las filas UNKNOWN.', 'NOT IN con un NULL no devuelve filas.']],
    ['Equivalencia de expresiones', 'propiedad de dos expresiones del álgebra de producir el mismo resultado para cualquier instancia', ['Empujar una selección dentro de una reunión.', 'Reordenar las reuniones.', 'El optimizador las usa para elegir planes.']],
    ['Independencia de datos', 'separación entre cómo se almacenan los datos y cómo los piden las aplicaciones', ['Agregar un índice no obliga a cambiar las consultas.', 'Fue un objetivo central de Codd.', 'Permite optimizar sin tocar el código.']]
  ],
  q: [
    ['¿Qué operación del álgebra corresponde a WHERE?', 'Selección', ['Proyección', 'Unión', 'Renombrado'], 'σ filtra filas.', 1],
    ['¿Qué devuelve π_marca de una relación con marcas Toyota, Kia y Toyota?', 'Dos tuplas: Toyota y Kia', ['Tres tuplas', 'Una tupla', 'Ninguna'], 'La proyección elimina duplicados.', 2],
    ['¿Cuál es el resultado de TRUE AND UNKNOWN?', 'UNKNOWN', ['TRUE', 'FALSE', 'NULL convertido en TRUE'], 'Podría ser verdadero o falso según el desconocido.', 2],
    ['¿Cuál es el resultado de TRUE OR UNKNOWN?', 'TRUE', ['UNKNOWN', 'FALSE', 'Error'], 'Basta con que uno sea verdadero.', 2],
    ['Una subconsulta de NOT IN contiene un NULL. ¿Qué devuelve la consulta?', 'Ninguna fila', ['Todas las filas', 'Solo las filas con NULL', 'Un error'], 'Todas las comparaciones quedan en UNKNOWN; por eso se prefiere NOT EXISTS.', 4],
    ['¿Por qué un optimizador empuja las selecciones dentro de las reuniones?', 'Porque filtrar antes reduce la cantidad de tuplas que hay que reunir', ['Porque es obligatorio por SQL', 'Porque cambia el resultado', 'Porque elimina los índices'], 'El resultado es el mismo, pero más barato.', 3],
    ['¿Qué operación expresa "clientes que tienen unidades en todos los patios"?', 'División', ['Unión', 'Diferencia simple', 'Renombrado'], 'Relaciona con todas las tuplas de otra relación.', 3],
    { tf: 'En SQL, «WHERE telefono = NULL» devuelve las filas con teléfono nulo.', v: false, e: 'Siempre da UNKNOWN; hay que usar IS NULL.', l: 2 },
    { tf: 'UNION elimina las filas duplicadas y UNION ALL las conserva.', v: true, e: 'SQL trabaja con multiconjuntos salvo que se pida lo contrario.', l: 2 },
    { tf: 'COUNT(columna) cuenta también las filas donde la columna es NULL.', v: false, e: 'COUNT(columna) los omite; COUNT(*) cuenta todas las filas.', l: 2 },
    { c: 'Escribe «proyectar(filas, campos)»: devuelve objetos solo con esos campos, en ese orden, sin duplicados y en el orden en que aparecen por primera vez.', f: 'proyectar', p: ['filas', 'campos'], t: [[[[{ placa: 'A', marca: 'Toyota' }, { placa: 'B', marca: 'Kia' }, { placa: 'C', marca: 'Toyota' }], ['marca']], [{ marca: 'Toyota' }, { marca: 'Kia' }]], [[[{ a: 1, b: 2 }], ['b', 'a']], [{ b: 2, a: 1 }]], [[[], ['x']], []]], sol: '  const vistos = new Set(), r = [];\n  for (const f of filas) {\n    const o = {};\n    campos.forEach(c => o[c] = f[c]);\n    const k = JSON.stringify(o);\n    if (!vistos.has(k)) { vistos.add(k); r.push(o); }\n  }\n  return r;', l: 2 },
    { c: 'Escribe «y3(a, b)» y devuelve el AND de la lógica de tres valores, donde null representa UNKNOWN.', f: 'y3', p: ['a', 'b'], t: [[[true, null], null], [[false, null], false], [[null, null], null], [[true, true], true]], sol: '  if (a === false || b === false) return false;\n  if (a === null || b === null) return null;\n  return true;', l: 2 },
    { c: 'Escribe «reunirNatural(r, s)»: une cada tupla de r con cada tupla de s que coincide en todos los atributos comunes; el resultado combina ambos objetos (primero los campos de r).', f: 'reunirNatural', p: ['r', 's'], t: [[[[{ placa: 'A', patio: 1 }, { placa: 'B', patio: 2 }], [{ patio: 1, distrito: 'Ate' }]], [{ placa: 'A', patio: 1, distrito: 'Ate' }]], [[[{ x: 1 }], [{ y: 2 }]], [{ x: 1, y: 2 }]], [[[{ k: 1 }], [{ k: 2 }]], []]], sol: '  return r.flatMap(a => s.filter(b => Object.keys(b).every(k => !(k in a) || a[k] === b[k])).map(b => ({ ...a, ...b })));', h: 'Sin atributos comunes, la reunión natural es el producto cartesiano.', l: 3 }
  ],
  gen: function (g) {
    var vals = ['TRUE', 'FALSE', 'UNKNOWN'];
    function and3(a, b) { if (a === 'FALSE' || b === 'FALSE') return 'FALSE'; if (a === 'UNKNOWN' || b === 'UNKNOWN') return 'UNKNOWN'; return 'TRUE'; }
    function or3(a, b) { if (a === 'TRUE' || b === 'TRUE') return 'TRUE'; if (a === 'UNKNOWN' || b === 'UNKNOWN') return 'UNKNOWN'; return 'FALSE'; }
    vals.forEach(function (a) { vals.forEach(function (b) { g.mcq(2, 'En la lógica de tres valores de SQL, ¿cuánto vale ' + a + ' AND ' + b + '?', and3(a, b), vals.filter(function (x) { return x !== and3(a, b); }).concat(['NULL convertido en FALSE']), 'FALSE domina en AND; UNKNOWN contagia lo demás.'); g.mcq(2, '¿Cuánto vale ' + a + ' OR ' + b + '?', or3(a, b), vals.filter(function (x) { return x !== or3(a, b); }).concat(['Error']), 'TRUE domina en OR.'); }); });
    var ops = [['WHERE', 'Selección'], ['SELECT DISTINCT columnas', 'Proyección'], ['UNION', 'Unión'], ['EXCEPT', 'Diferencia'], ['FROM R, S sin condición', 'Producto cartesiano'], ['AS para renombrar', 'Renombrado'], ['JOIN ... ON R.a = S.a', 'Reunión']];
    var os = ops.map(function (o) { return o[1]; });
    ops.forEach(function (o) { g.mcq(1, '¿Qué operación del álgebra relacional corresponde a ' + o[0] + '?', o[1], g.R.sample(os.filter(function (x) { return x !== o[1]; }), 3), 'Correspondencia entre SQL y el álgebra.'); });
  },
  checks: [
    ['Nombra las seis operaciones básicas del álgebra relacional.', 'Selección, proyección, producto cartesiano, unión, diferencia y renombrado.'],
    ['Escribe en álgebra relacional "las placas de unidades en patios del Callao".', 'π_placa(σ_distrito=Callao(Unidad ⋈ Patio)).'],
    ['¿Por qué se puede empujar una selección dentro de una reunión y para qué sirve?', 'Porque si la condición solo usa atributos de un lado, el resultado es el mismo; sirve para reducir las tuplas antes de reunirlas.'],
    ['Explica por qué NOT IN puede devolver cero filas cuando la subconsulta tiene un NULL.', 'Porque x NOT IN (…, NULL) equivale a una conjunción que incluye x <> NULL, que es UNKNOWN, y WHERE descarta lo que no es TRUE.'],
    ['¿En qué se diferencia SQL del modelo relacional de Codd?', 'SQL usa multiconjuntos (permite duplicados), tiene NULL con lógica de tres valores y permite ordenar resultados.']
  ],
  cites: ['Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. *Communications of the ACM*, 13(6).', 'Chamberlin, D. y Boyce, R. (1974). SEQUEL: A Structured English Query Language. *ACM SIGFIDET Workshop*.', 'Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.). McGraw-Hill.', 'Ramakrishnan, R. y Gehrke, J. (2003). *Database Management Systems* (3.ª ed.). McGraw-Hill.', 'Date, C. J. y Darwen, H. (2000). *Foundation for Future Database Systems: The Third Manifesto* (2.ª ed.). Addison-Wesley.'],
  project: { t: 'Intérprete de álgebra relacional',
    goal: 'Construir un pequeño intérprete que ejecute expresiones del álgebra relacional.',
    steps: ['Representa relaciones como arreglos de objetos e implementa selección, proyección, producto, unión, diferencia y renombrado.', 'Implementa a partir de ellas la reunión natural, la intersección y la división.', 'Escribe diez consultas del dominio de PatioApp en álgebra y en SQL, y verifica que dan lo mismo en ambos.', 'Agrega valores null con lógica de tres valores y reproduce el problema de NOT IN.', 'Demuestra con ejemplos dos equivalencias que usa un optimizador.'],
    deliver: 'El intérprete, las consultas y un documento con las equivalencias.' },
  hito: ['Escribe en álgebra relacional las cinco consultas más importantes de los reportes de PatioApp y verifica que su versión SQL da el mismo resultado.', 'Revisa las consultas de PatioApp que usan NOT IN o comparaciones con columnas que admiten NULL, corrígelas con NOT EXISTS o IS NULL y agrega NOT NULL donde el dato es obligatorio.']
});

S('bd2', 'bd2.sql', { title: 'SQL avanzado: agregación, subconsultas, ventanas y recursión',
  ask: '¿Qué técnica de SQL avanzado se aplica?',
  lesson: `
> **La idea en simple.** Con SQL básico preguntas "¿qué unidades hay en el patio 3?". Con SQL avanzado preguntas "para cada patio, ¿cuál fue la unidad que más tiempo estuvo, cómo se compara con el promedio y cómo evolucionó el ingreso mes a mes?", en una sola consulta que el motor ejecuta mucho mejor que un programa que trae todo y calcula a mano.

## El orden lógico de una consulta
SQL se escribe en un orden, pero se evalúa en otro. Entender el **orden lógico** explica la mayoría de los errores:
1. FROM y JOIN: arma las filas combinadas.
2. WHERE: filtra filas individuales.
3. GROUP BY: forma grupos.
4. HAVING: filtra grupos.
5. SELECT: calcula las columnas (incluidas las funciones ventana).
6. DISTINCT.
7. ORDER BY.
8. LIMIT u OFFSET.
Por eso no se puede usar en WHERE un alias definido en SELECT, ni una función de agregación (eso va en HAVING), y por eso una función ventana no puede ir en WHERE (hay que envolver la consulta).

## Agregación y agrupamiento
Las funciones **COUNT, SUM, AVG, MIN y MAX** resumen muchas filas en un valor. Con **GROUP BY** se calculan por grupo, y cada columna del SELECT debe estar en el GROUP BY o dentro de una agregación. **HAVING** filtra grupos después de agrupar: «SELECT patio, COUNT(*) FROM estadia GROUP BY patio HAVING COUNT(*) > 100» lista los patios con más de cien estadías. Extensiones útiles: **GROUPING SETS**, **ROLLUP** (subtotales jerárquicos: por patio y mes, por patio y total general) y **CUBE** (todas las combinaciones).

## Subconsultas
- **Escalares:** devuelven un solo valor y pueden usarse como una columna: «(SELECT AVG(dias) FROM estadia)».
- **Con IN, EXISTS, ANY, ALL:** filtran según otra consulta.
- **Correlacionadas:** hacen referencia a la fila exterior y, conceptualmente, se evalúan una vez por fila: «las estadías que duraron más que el promedio de su propio patio».
~~~txt
SELECT e.id, e.patio, e.dias
FROM estadia e
WHERE e.dias > (SELECT AVG(e2.dias) FROM estadia e2 WHERE e2.patio = e.patio);
~~~
Los optimizadores modernos suelen **desanidar** las subconsultas correlacionadas, convirtiéndolas en reuniones, pero no siempre lo logran: si una consulta así es lenta, reescribirla con una reunión o una función ventana suele ayudar.

## Funciones ventana
Las **funciones ventana**, incorporadas en SQL:2003, calculan un valor para cada fila mirando un conjunto de filas relacionadas (su **ventana**), **sin colapsarlas** como hace GROUP BY. Su forma es «función() OVER (PARTITION BY … ORDER BY … marco)»:
- **ROW_NUMBER():** 1, 2, 3… dentro de cada partición.
- **RANK():** empates con el mismo número y saltos después (1, 2, 2, 4). **DENSE_RANK():** sin saltos (1, 2, 2, 3).
- **SUM() OVER (ORDER BY fecha):** total acumulado.
- **AVG() OVER (ORDER BY fecha ROWS BETWEEN 6 PRECEDING AND CURRENT ROW):** promedio móvil de siete días.
- **LAG() y LEAD():** el valor de la fila anterior o siguiente, para comparar con el período previo.
~~~txt
-- La unidad que más tiempo estuvo en cada patio
SELECT * FROM (
  SELECT patio, placa, dias, RANK() OVER (PARTITION BY patio ORDER BY dias DESC) AS r
  FROM estadia
) t WHERE r = 1;
~~~
~~~js
// Lo que calculan RANK, DENSE_RANK y SUM OVER sobre una lista ordenada
const dias = [40, 35, 35, 20, 12];
let rank = [], dense = [], acum = [], s = 0;
dias.forEach((d, i) => {
  rank.push(i > 0 && d === dias[i - 1] ? rank[i - 1] : i + 1);
  dense.push(i > 0 && d === dias[i - 1] ? dense[i - 1] : (dense[i - 1] || 0) + 1);
  acum.push(s += d);
});
console.log('RANK', rank.join(' '), '· DENSE_RANK', dense.join(' '), '· SUM acumulada', acum.join(' '));
~~~

## Expresiones de tabla comunes y recursión
Una **CTE** («WITH nombre AS (consulta)») da nombre a una subconsulta para usarla después, lo que hace legibles las consultas largas. Desde SQL:1999, las **CTE recursivas** permiten recorrer jerarquías y grafos:
~~~txt
WITH RECURSIVE cadena(id, jefe, nivel) AS (
  SELECT id, jefe, 0 FROM empleado WHERE id = 7        -- caso base
  UNION ALL
  SELECT e.id, e.jefe, c.nivel + 1                     -- paso recursivo
  FROM empleado e JOIN cadena c ON e.id = c.jefe
)
SELECT * FROM cadena;                                    -- el empleado 7 y todos sus jefes hacia arriba
~~~
El motor ejecuta el caso base y repite el paso recursivo con las filas nuevas hasta que no aparezcan más (un **punto fijo**). Hay que asegurar que termine (por ejemplo, limitando el nivel si los datos pudieran tener ciclos).

## Reuniones externas y otras reuniones
- **INNER JOIN:** solo las filas con pareja en ambos lados.
- **LEFT JOIN:** todas las filas de la izquierda; si no tienen pareja, las columnas de la derecha quedan en NULL. "Todos los patios con su cantidad de estadías, incluidos los que no tienen ninguna" exige un LEFT JOIN y COUNT(e.id), no COUNT(*), que contaría 1 para los patios vacíos.
- **FULL OUTER JOIN:** las filas sin pareja de ambos lados; útil para conciliar dos fuentes.
- **CROSS JOIN:** el producto cartesiano, útil para generar combinaciones (todos los patios por todos los meses).
- **Autorreunión:** una tabla consigo misma con dos alias, por ejemplo para comparar cada estadía con la anterior del mismo vehículo.
- **LATERAL:** permite que la subconsulta de la derecha use columnas de la izquierda, como "las tres últimas estadías de cada patio".
Una trampa clásica: en un LEFT JOIN, poner una condición sobre la tabla derecha en el **WHERE** elimina las filas rellenadas con NULL (porque NULL no cumple la condición) y lo convierte, sin querer, en un INNER JOIN. Esa condición debe ir en el **ON**.

## Vistas, vistas materializadas y lógica en el servidor
- Una **vista** es una consulta con nombre que se usa como una tabla; no guarda datos, se recalcula al consultarla. Sirve para ocultar complejidad y para dar acceso restringido a columnas o filas.
- Una **vista materializada** guarda el resultado y se **refresca** cada cierto tiempo o a pedido: acelera reportes costosos a cambio de datos algo desactualizados.
- Los **disparadores** (*triggers*) ejecutan código automáticamente ante inserciones, actualizaciones o borrados (por ejemplo, registrar una auditoría). Los **procedimientos almacenados** agrupan lógica en el servidor. Son poderosos, pero esconden comportamiento: hay que documentarlos y probarlos como el resto del código.

## SQL y las aplicaciones
- Usa siempre **consultas parametrizadas**, nunca concatenes texto del usuario (inyección SQL).
- Evita el problema **N + 1**: traer una lista y luego hacer una consulta por cada elemento (típico de los ORM). Una reunión o un «WHERE id IN (…)» lo resuelve con una sola consulta.
- Pagina con **cursores por clave** («WHERE id > último ORDER BY id LIMIT 50») en lugar de OFFSET grandes, que obligan a recorrer y descartar todas las filas anteriores.

## Ejemplo resuelto: el reporte mensual de PatioApp
El gerente quiere, por patio y mes, la cantidad de estadías, el ingreso, el ingreso del mes anterior y el ranking de patios del mes. Una sola consulta:
~~~txt
WITH mensual AS (
  SELECT patio, date_trunc('month', salida) AS mes, COUNT(*) AS estadias, SUM(monto) AS ingreso
  FROM estadia WHERE salida IS NOT NULL GROUP BY patio, date_trunc('month', salida)
)
SELECT patio, mes, estadias, ingreso,
       LAG(ingreso) OVER (PARTITION BY patio ORDER BY mes) AS ingreso_anterior,
       RANK() OVER (PARTITION BY mes ORDER BY ingreso DESC) AS puesto
FROM mensual ORDER BY mes, puesto;
~~~
La CTE agrega una vez; las ventanas comparan con el mes previo y ordenan a los patios sin consultas adicionales. Como «salida» puede ser NULL para las unidades que siguen en el patio, el filtro «IS NOT NULL» evita contarlas como estadías terminadas. Antes, el código de la aplicación hacía una consulta por patio y por mes (cientos de viajes a la base) y tardaba varios segundos; ahora es una sola consulta de milisegundos, que además puede guardarse como vista materializada refrescada cada noche.`,
  links: [['bd2.algebra', 'cada construcción de SQL se traduce a operaciones del álgebra'], ['m10.join', 'las reuniones de Bases de Datos I son la base de estas consultas'], ['m16.owasp', 'las consultas parametrizadas evitan la inyección SQL']],
  read: 'Silberschatz, Korth y Sudarshan, capítulos 3 a 5; documentación de PostgreSQL sobre funciones ventana y WITH; Winand, *SQL Performance Explained* (use-the-index-luke.com).',
  terms: [
    ['Orden lógico de evaluación', 'secuencia en que SQL procesa las cláusulas: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT', ['Explica por qué un alias del SELECT no sirve en WHERE.', 'HAVING se evalúa después de agrupar.', 'Las ventanas se calculan en el SELECT.']],
    ['HAVING', 'cláusula que filtra grupos después de GROUP BY usando condiciones sobre agregaciones', ['Patios con más de cien estadías.', 'WHERE no puede usar COUNT.', 'Se evalúa antes del SELECT.']],
    ['Subconsulta correlacionada', 'subconsulta que hace referencia a columnas de la consulta exterior y se evalúa conceptualmente por cada fila', ['Estadías más largas que el promedio de su patio.', 'El optimizador suele desanidarla.', 'Puede reescribirse con una ventana.']],
    ['Función ventana', 'función que calcula un valor por fila sobre un conjunto de filas relacionadas sin colapsarlas', ['RANK() OVER (PARTITION BY patio ORDER BY dias DESC).', 'Total acumulado con SUM() OVER.', 'Se incorporó en SQL:2003.']],
    ['RANK frente a DENSE_RANK', 'funciones de ranking que dan igual número a los empates, con saltos (RANK) o sin ellos (DENSE_RANK)', ['RANK: 1, 2, 2, 4.', 'DENSE_RANK: 1, 2, 2, 3.', 'ROW_NUMBER no repite números.']],
    ['CTE recursiva', 'expresión WITH RECURSIVE que combina un caso base y un paso recursivo hasta alcanzar un punto fijo', ['Recorre la cadena de jefes.', 'Calcula caminos en un grafo.', 'Debe garantizar que termina.']],
    ['Vista materializada', 'vista cuyo resultado se guarda y se refresca periódicamente', ['El reporte mensual se refresca cada noche.', 'Acelera consultas costosas.', 'Puede mostrar datos algo desactualizados.']],
    ['Problema N + 1', 'antipatrón de hacer una consulta para una lista y luego una consulta por cada elemento', ['Un ORM carga cada cliente por separado.', 'Cientos de viajes a la base.', 'Se resuelve con una reunión o un IN.']]
  ],
  q: [
    ['¿Por qué no se puede usar COUNT(*) en WHERE?', 'Porque WHERE se evalúa antes de agrupar; las condiciones sobre agregaciones van en HAVING', ['Porque COUNT no existe en SQL', 'Porque WHERE solo admite números', 'Porque es más lento'], 'Orden lógico: WHERE antes que GROUP BY.', 2],
    ['¿Qué devuelve RANK() para los valores 90, 80, 80, 70 en orden descendente?', '1, 2, 2, 4', ['1, 2, 3, 4', '1, 2, 2, 3', '1, 1, 2, 3'], 'Los empates comparten número y luego hay un salto.', 2],
    ['¿Y DENSE_RANK() para los mismos valores?', '1, 2, 2, 3', ['1, 2, 2, 4', '1, 2, 3, 4', '2, 2, 3, 4'], 'Sin saltos tras los empates.', 2],
    ['¿Qué función compara el ingreso de un mes con el del mes anterior?', 'LAG', ['LEAD', 'RANK', 'COUNT'], 'LAG trae el valor de la fila previa en la ventana.', 2],
    ['¿Qué diferencia hay entre GROUP BY y una función ventana con PARTITION BY?', 'GROUP BY colapsa las filas en una por grupo; la ventana conserva cada fila', ['Son idénticos', 'La ventana elimina filas', 'GROUP BY no permite agregaciones'], 'Por eso con ventanas se pueden ver detalle y total a la vez.', 3],
    ['¿Por qué conviene paginar con «WHERE id > último» en vez de OFFSET grandes?', 'Porque OFFSET obliga a recorrer y descartar todas las filas anteriores', ['Porque OFFSET no existe', 'Porque id siempre es texto', 'Porque así se evita usar índices'], 'Con un índice, el cursor por clave salta directo.', 3],
    ['¿Qué resuelve una CTE recursiva?', 'Recorrer jerarquías o grafos de profundidad variable', ['Ordenar resultados', 'Crear índices', 'Cifrar columnas'], 'Caso base más paso recursivo hasta un punto fijo.', 3],
    { tf: 'Un alias definido en el SELECT puede usarse en el WHERE de la misma consulta.', v: false, e: 'WHERE se evalúa antes que SELECT.', l: 2 },
    { tf: 'Una vista normal no guarda datos: se recalcula cada vez que se consulta.', v: true, e: 'La vista materializada sí guarda su resultado.', l: 2 },
    { o: 'Ordena el orden lógico de evaluación de una consulta SQL.', s: ['FROM y JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'], e: 'Explica qué puede usar cada cláusula.', l: 3 },
    { c: 'Escribe «rankSQL(valores)»: valores ya ordenados de forma descendente; devuelve el RANK() de cada uno (empates iguales y salto después).', f: 'rankSQL', p: ['valores'], t: [[[[100, 90, 90, 80]], [1, 2, 2, 4]], [[[5, 5, 5]], [1, 1, 1]], [[[3, 2, 1]], [1, 2, 3]], [[[]], []]], sol: '  return valores.map((v, i) => { let j = i; while (j > 0 && valores[j - 1] === v) j--; return j + 1; });', l: 2 },
    { c: 'Escribe «sumaPorGrupo(filas, clave, campo)»: devuelve una lista de [valorClave, suma] ordenada por la clave, como GROUP BY con SUM.', f: 'sumaPorGrupo', p: ['filas', 'clave', 'campo'], t: [[[[{ patio: 2, monto: 10 }, { patio: 1, monto: 5 }, { patio: 2, monto: 7 }], 'patio', 'monto'], [[1, 5], [2, 17]]], [[[], 'p', 'm'], []], [[[{ m: 'b', x: 1 }, { m: 'a', x: 2 }], 'm', 'x'], [['a', 2], ['b', 1]]]], sol: '  const acc = new Map();\n  for (const f of filas) acc.set(f[clave], (acc.get(f[clave]) || 0) + f[campo]);\n  return [...acc.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));', l: 2 },
    { c: 'Escribe «promedioMovil(valores, k)»: para cada posición, el promedio de los últimos k valores disponibles (incluido el actual), redondeado a 2 decimales, como AVG() OVER (ROWS BETWEEN k−1 PRECEDING AND CURRENT ROW).', f: 'promedioMovil', p: ['valores', 'k'], t: [[[[10, 20, 30, 40], 2], [10, 15, 25, 35]], [[[3, 6, 9], 3], [3, 4.5, 6]], [[[5], 4], [5]]], sol: '  return valores.map((_, i) => { const v = valores.slice(Math.max(0, i - k + 1), i + 1); return Math.round(v.reduce((a, b) => a + b, 0) / v.length * 100) / 100; });', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var v = [R.int(50, 100)]; for (var i = 0; i < 4; i++) v.push(v[v.length - 1] - R.pick([0, 0, 5, 10])); var r = v.map(function (x, i) { var j = i; while (j > 0 && v[j - 1] === x) j--; return j + 1; }); g.input(3, 'Con los valores ordenados ' + v.join(', ') + ', ¿cuál es el RANK() del último?', r[4], 'Los empates comparten número y luego se salta. RANK completo: ' + r.join(', ') + '.'); });
    var cl = [['Filtrar estadías de 2026 antes de agrupar', 'WHERE'], ['Quedarse con los patios cuyo ingreso total supera S/ 50 000', 'HAVING'], ['Numerar las estadías de cada patio por fecha', 'ROW_NUMBER() OVER'], ['Calcular el total acumulado de ingresos día a día', 'SUM() OVER (ORDER BY fecha)'], ['Recorrer todos los subordinados de un gerente', 'WITH RECURSIVE'], ['Guardar el resultado de un reporte costoso y refrescarlo cada noche', 'Vista materializada'], ['Comparar cada mes con el anterior', 'LAG() OVER']];
    var cs = cl.map(function (c) { return c[1]; });
    cl.forEach(function (c) { g.mcq(3, '¿Qué construcción de SQL conviene? ' + c[0], c[1], g.R.sample(cs.filter(function (x) { return x !== c[1]; }), 3), 'Cada construcción resuelve un patrón de consulta distinto.'); });
    g.times(5, function (R) { var v = [R.int(1, 20), R.int(1, 20), R.int(1, 20), R.int(1, 20)]; g.input(2, '¿Cuál es el último valor del total acumulado SUM() OVER (ORDER BY …) para la serie ' + v.join(', ') + '?', v.reduce(function (a, b) { return a + b; }), 'Suma de todos los valores hasta la fila actual.'); });
  },
  checks: [
    ['Enumera el orden lógico de evaluación de una consulta y da un error que explica.', 'FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, LIMIT; explica por qué no se puede usar en WHERE un alias o una agregación del SELECT.'],
    ['¿Cuándo usarías una función ventana en lugar de GROUP BY?', 'Cuando necesitas el valor agregado o el ranking junto a cada fila de detalle, sin colapsarlas.'],
    ['Escribe la idea de una consulta que devuelva la estadía más larga de cada patio.', 'Calcular RANK() OVER (PARTITION BY patio ORDER BY dias DESC) en una subconsulta y filtrar las filas con rango 1.'],
    ['¿Cómo funciona una CTE recursiva y qué riesgo tiene?', 'Ejecuta un caso base y repite el paso recursivo con las filas nuevas hasta que no aparecen más; si los datos tienen ciclos puede no terminar, así que hay que limitarla.'],
    ['¿Qué es el problema N + 1 y cómo se corrige?', 'Hacer una consulta por cada elemento de una lista; se corrige con una reunión o una consulta con IN que traiga todo de una vez.']
  ],
  cites: ['Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.), capítulos 3 a 5.', 'ISO/IEC 9075:2003. *Information Technology: Database Languages: SQL* (funciones ventana).', 'Melton, J. y Simon, A. (2002). *SQL:1999: Understanding Relational Language Components*. Morgan Kaufmann.', 'Winand, M. (2012). *SQL Performance Explained*. Markus Winand.', 'Garcia-Molina, H., Ullman, J. y Widom, J. (2008). *Database Systems: The Complete Book* (2.ª ed.), capítulos 6 y 10. Pearson.'],
  project: { t: 'Tablero analítico con SQL puro',
    goal: 'Resolver preguntas de negocio complejas solo con SQL.',
    steps: ['Carga en PostgreSQL o SQLite un conjunto de datos con fechas, categorías y montos (por ejemplo, ventas o viajes públicos).', 'Escribe diez preguntas de negocio y resuélvelas con agregación, HAVING, subconsultas correlacionadas y funciones ventana.', 'Agrega una consulta con CTE recursiva sobre una jerarquía (categorías o empleados).', 'Crea una vista materializada para la consulta más costosa y mide la diferencia de tiempo.', 'Documenta cada consulta con su pregunta, su SQL y su explicación.'],
    deliver: 'El script con los datos, las consultas documentadas y las mediciones.' },
  hito: ['Reemplaza el cálculo del reporte mensual de PatioApp hecho en código por una sola consulta con CTE y funciones ventana (ingreso, mes anterior y ranking de patios).', 'Detecta y corrige en PatioApp al menos un caso de problema N + 1 y uno de paginación con OFFSET grande, midiendo el antes y el después.']
});

S('bd2', 'bd2.design', { title: 'Teoría del diseño: dependencias funcionales y formas normales',
  ask: '¿Qué concepto de la teoría de diseño de bases de datos se aplica?',
  lesson: `
> **La idea en simple.** Si en una hoja de cálculo anotas en cada fila el nombre del cliente junto a su teléfono, y el cliente cambia de teléfono, tendrás que corregir decenas de filas y seguro se te escapa alguna. La teoría de normalización explica con precisión matemática por qué pasa eso y cómo partir las tablas para que cada dato viva en un solo lugar, sin perder información.

## El problema: anomalías
En Bases de Datos I viste la normalización de forma intuitiva. Aquí se formaliza. Una tabla mal diseñada, como Estadia(placa, cliente_dni, cliente_nombre, patio, patio_distrito, ingreso), sufre:
- **Anomalía de actualización:** cambiar el distrito de un patio exige cambiarlo en todas sus filas.
- **Anomalía de inserción:** no se puede registrar un patio nuevo hasta que tenga una estadía.
- **Anomalía de borrado:** al borrar la última estadía de un patio, se pierde que ese patio existe.
Todas nacen de guardar juntos hechos independientes. La herramienta para detectarlo son las dependencias funcionales.

## Dependencias funcionales
Una **dependencia funcional** X → Y significa que, en toda instancia válida, si dos filas coinciden en X, coinciden en Y. Es una regla del **dominio**, no algo que se deduzca mirando los datos de hoy. En el ejemplo: patio → patio_distrito, cliente_dni → cliente_nombre, y (placa, ingreso) → todo lo demás.

William Armstrong demostró en 1974 que tres reglas, los **axiomas de Armstrong**, bastan para derivar todas las dependencias implicadas (son **correctas** y **completas**):
- **Reflexividad:** si Y ⊆ X, entonces X → Y.
- **Aumento:** si X → Y, entonces XZ → YZ.
- **Transitividad:** si X → Y y Y → Z, entonces X → Z.
De ellas se derivan la **unión** (X → Y y X → Z dan X → YZ), la **descomposición** (X → YZ da X → Y) y la **pseudotransitividad**.

## Cierre de atributos y claves
El **cierre** X⁺ de un conjunto de atributos X es todo lo que X determina. Se calcula con un algoritmo simple: empezar con X y, mientras alguna dependencia A → B tenga A contenido en lo que ya se tiene, agregar B. Con R(A, B, C, D, E) y las dependencias A → BC, CD → E, E → D:
- A⁺: A, luego B y C (por A → BC); con C solo no se activa CD → E. A⁺ = ABC.
- AE⁺: A, E; luego B, C; luego D (por E → D); luego E (por CD → E, ya estaba). AE⁺ = ABCDE.
Una **superclave** es un conjunto cuyo cierre son todos los atributos; una **clave candidata** es una superclave mínima (si se le quita un atributo, deja de serlo). AE es clave candidata: A solo no basta y E⁺ = ED tampoco. Los atributos que forman parte de alguna clave candidata se llaman **primos**.
~~~js
// Cierre de un conjunto de atributos dadas unas dependencias [izquierda, derecha]
function cierre(X, dfs) {
  const c = new Set(X);
  let cambio = true;
  while (cambio) {
    cambio = false;
    for (const [izq, der] of dfs) if ([...izq].every(a => c.has(a)) && [...der].some(a => !c.has(a))) { [...der].forEach(a => c.add(a)); cambio = true; }
  }
  return [...c].sort().join('');
}
const dfs = [['A', 'BC'], ['CD', 'E'], ['E', 'D']];
for (const X of ['A', 'E', 'AE', 'CD']) console.log(X + '⁺ =', cierre(X, dfs));
~~~

## Cobertura mínima
Antes de diseñar conviene simplificar las dependencias a una **cobertura mínima** (o canónica), equivalente a la original pero sin nada sobrante:
1. Dejar un solo atributo en cada lado derecho (A → BC se parte en A → B y A → C).
2. Quitar atributos **extraños** del lado izquierdo: en AB → C, si A⁺ ya contiene C, la B sobra.
3. Quitar dependencias **redundantes**: si A → C se deduce de las demás (por ejemplo, de A → B y B → C), se elimina.
Ejemplo: con A → BC, B → C y AB → C, se parte en A → B, A → C, B → C, AB → C; AB → C tiene la B extraña (A⁺ ya incluye C) y queda como A → C; A → C es redundante por A → B y B → C. La cobertura mínima es {A → B, B → C}. La síntesis a 3FN parte de ella.

## Las dependencias en el esquema real
Las dependencias no se quedan en el papel: se **imponen** con restricciones del motor. Una clave candidata se declara con PRIMARY KEY o UNIQUE, de modo que el motor rechaza dos filas que la violen; las relaciones entre tablas descompuestas se mantienen con FOREIGN KEY; y las reglas de dominio simples, con CHECK. Un diseño bien normalizado sin estas restricciones vuelve a llenarse de inconsistencias en cuanto un programa tiene un error.

## Las formas normales
| Forma | Condición |
| 1FN | todos los atributos son atómicos: sin listas ni grupos repetidos |
| 2FN | 1FN y ningún atributo no primo depende de una parte propia de una clave candidata |
| 3FN | para toda dependencia no trivial X → A, X es superclave o A es primo |
| BCNF | para toda dependencia no trivial X → A, X es superclave |
| 4FN | BCNF y, además, ninguna dependencia multivaluada no trivial cuyo lado izquierdo no sea superclave |
Codd definió 1FN, 2FN y 3FN entre 1970 y 1971; la **forma normal de Boyce-Codd** (BCNF) la presentaron Raymond Boyce y Codd en 1974; Ronald Fagin definió la 4FN en 1977 a partir de las **dependencias multivaluadas** (X ↠ Y: los valores de Y asociados a X son independientes de los demás atributos, como los teléfonos y los correos de un mismo cliente).

## Descomponer bien
Normalizar es **descomponer** una relación en otras más pequeñas. Una buena descomposición tiene dos propiedades:
- **Sin pérdida** (*lossless*): al reunir las partes se recupera exactamente la relación original, sin filas espurias. Para dos partes R₁ y R₂ basta que los atributos comunes sean superclave de alguna de ellas.
- **Preserva las dependencias:** cada dependencia puede verificarse dentro de una sola parte, sin reunir tablas.
Dos algoritmos clásicos:
- **Descomposición a BCNF:** mientras haya una dependencia X → Y que viole BCNF, partir R en (X ∪ Y) y (R − Y + X). Siempre es sin pérdida, pero **puede no preservar** alguna dependencia.
- **Síntesis a 3FN** (Philip Bernstein, 1976): a partir de una cobertura mínima de las dependencias, crear una relación por cada dependencia y agregar una clave si ninguna la contiene. Siempre es sin pérdida **y** preserva las dependencias.
Por eso a veces se acepta 3FN en lugar de BCNF: el ejemplo clásico es Reserva(alumno, curso, profesor) con profesor → curso y (alumno, curso) → profesor. No está en BCNF (profesor no es superclave), y llevarla a BCNF pierde la posibilidad de verificar (alumno, curso) → profesor sin una reunión.

## Desnormalizar a conciencia
La normalización evita anomalías, pero multiplica las reuniones. En sistemas de análisis (los esquemas en estrella que viste en ingeniería de datos) o en tablas muy leídas, se **desnormaliza** a propósito: se repite un dato para no reunir. La regla profesional: normalizar primero, medir, y desnormalizar solo donde se justifique, con un mecanismo que mantenga la copia consistente (disparadores, vistas materializadas o procesos de actualización).

## Ejemplo resuelto: normalizar Estadia
Dependencias: (placa, ingreso) → cliente_dni, patio; cliente_dni → cliente_nombre; patio → patio_distrito. La clave es (placa, ingreso).
1. ¿2FN? Ningún atributo depende de solo placa o solo ingreso: sí.
2. ¿3FN? patio → patio_distrito: patio no es superclave y patio_distrito no es primo. Viola 3FN (dependencia transitiva). Lo mismo cliente_dni → cliente_nombre.
3. Descomposición: Patio(patio, patio_distrito), Cliente(cliente_dni, cliente_nombre) y Estadia(placa, ingreso, cliente_dni, patio).
4. Verificación: cada descomposición es sin pérdida (patio es clave de Patio; cliente_dni es clave de Cliente) y cada dependencia se verifica en una sola tabla. Las tres tablas están en BCNF. Ahora cambiar el distrito de un patio toca una sola fila.`,
  links: [['m10.norm', 'esta unidad formaliza la normalización intuitiva de Bases de Datos I'], ['m2.sets', 'los cierres y las claves se razonan con teoría de conjuntos'], ['ia.data', 'los esquemas en estrella desnormalizan a propósito para el análisis']],
  read: 'Silberschatz, Korth y Sudarshan, capítulo 7; Ramakrishnan y Gehrke, capítulo 19; Armstrong (1974); Bernstein (1976).',
  terms: [
    ['Dependencia funcional', 'restricción X → Y que indica que dos filas iguales en X deben ser iguales en Y', ['patio → distrito.', 'Es una regla del dominio, no de los datos actuales.', 'Se usa para definir claves y formas normales.']],
    ['Axiomas de Armstrong', 'reglas de reflexividad, aumento y transitividad que permiten derivar todas las dependencias implicadas', ['Armstrong los presentó en 1974.', 'Son correctos y completos.', 'De ellos se derivan la unión y la descomposición.']],
    ['Cierre de atributos', 'conjunto de todos los atributos determinados funcionalmente por un conjunto dado', ['A⁺ = ABC.', 'Se calcula agregando lados derechos hasta que nada cambie.', 'Sirve para hallar claves.']],
    ['Clave candidata', 'superclave mínima: si se le quita cualquier atributo deja de determinar todos los demás', ['(placa, ingreso) en Estadia.', 'Una tabla puede tener varias.', 'Sus atributos se llaman primos.']],
    ['BCNF', 'forma normal en la que el lado izquierdo de toda dependencia no trivial es superclave', ['Elimina toda redundancia por dependencias funcionales.', 'Boyce y Codd la presentaron en 1974.', 'Su descomposición puede no preservar dependencias.']],
    ['Tercera forma normal', 'forma normal en la que para toda dependencia no trivial X → A, X es superclave o A es primo', ['Elimina las dependencias transitivas de atributos no primos.', 'Siempre se alcanza preservando dependencias.', 'Es más permisiva que BCNF.']],
    ['Descomposición sin pérdida', 'división de una relación cuya reunión recupera exactamente la relación original', ['Los atributos comunes son clave de una de las partes.', 'Evita filas espurias.', 'Es indispensable al normalizar.']],
    ['Dependencia multivaluada', 'restricción X ↠ Y que indica que los valores de Y asociados a X son independientes del resto de atributos', ['Los teléfonos y correos de un cliente.', 'Fagin la usó para definir la 4FN.', 'Toda dependencia funcional es también multivaluada.']]
  ],
  q: [
    ['Con R(A, B, C, D, E) y A → BC, CD → E, E → D, ¿cuál es el cierre de A?', 'ABC', ['ABCDE', 'A', 'ABCE'], 'C solo no activa CD → E.', 3],
    ['Con las mismas dependencias, ¿cuál es una clave candidata?', 'AE', ['A', 'E', 'ABCDE sin ser mínima'], 'AE⁺ = ABCDE y ni A ni E solos alcanzan.', 4],
    ['Una tabla tiene clave (placa, ingreso) y patio → distrito. ¿Qué forma normal viola?', '3FN', ['1FN', '2FN', 'Ninguna'], 'patio no es superclave y distrito no es primo.', 3],
    ['¿Qué condición basta para que la descomposición de R en R₁ y R₂ sea sin pérdida?', 'Que los atributos comunes sean superclave de R₁ o de R₂', ['Que ambas tengan la misma cantidad de atributos', 'Que no compartan atributos', 'Que estén en 1FN'], 'Así la reunión no genera filas espurias.', 4],
    ['¿Qué ventaja tiene la síntesis a 3FN frente a la descomposición a BCNF?', 'Siempre preserva las dependencias', ['Elimina más redundancia', 'Produce menos tablas siempre', 'No necesita claves'], 'BCNF puede perder alguna dependencia.', 4],
    ['¿Qué axioma de Armstrong permite pasar de X → Y y Y → Z a X → Z?', 'Transitividad', ['Reflexividad', 'Aumento', 'Unión'], 'Encadena dependencias.', 2],
    ['¿Qué anomalía ocurre si al borrar la última estadía de un patio se pierde que el patio existe?', 'Anomalía de borrado', ['Anomalía de inserción', 'Anomalía de actualización', 'Interbloqueo'], 'Hechos independientes guardados juntos.', 2],
    { tf: 'Toda relación en BCNF está también en 3FN.', v: true, e: 'BCNF es más estricta.', l: 2 },
    { tf: 'Una dependencia funcional puede deducirse con certeza observando los datos actuales de la tabla.', v: false, e: 'Los datos pueden cumplirla por casualidad; es una regla del dominio.', l: 3 },
    { c: 'Escribe «cierre(X, dfs)»: X es un texto de atributos de una letra y dfs una lista de [izquierda, derecha]; devuelve el cierre como texto ordenado alfabéticamente.', f: 'cierre', p: ['X', 'dfs'], t: [[['A', [['A', 'B'], ['B', 'C']]], 'ABC'], [['B', [['A', 'B'], ['B', 'C']]], 'BC'], [['AE', [['A', 'BC'], ['CD', 'E'], ['E', 'D']]], 'ABCDE'], [['A', [['A', 'BC'], ['CD', 'E'], ['E', 'D']]], 'ABC']], sol: '  const c = new Set(X);\n  let cambio = true;\n  while (cambio) {\n    cambio = false;\n    for (const [i, d] of dfs) if ([...i].every(a => c.has(a)) && [...d].some(a => !c.has(a))) { [...d].forEach(a => c.add(a)); cambio = true; }\n  }\n  return [...c].sort().join("");', h: 'Repite mientras alguna dependencia agregue algo nuevo.', l: 3 },
    { c: 'Escribe «esSuperclave(X, todos, dfs)» que diga si el cierre de X contiene todos los atributos del texto todos.', f: 'esSuperclave', p: ['X', 'todos', 'dfs'], t: [[['AE', 'ABCDE', [['A', 'BC'], ['CD', 'E'], ['E', 'D']]], true], [['A', 'ABCDE', [['A', 'BC'], ['CD', 'E'], ['E', 'D']]], false], [['A', 'ABC', [['A', 'B'], ['B', 'C']]], true]], sol: '  const c = new Set(X);\n  let cambio = true;\n  while (cambio) {\n    cambio = false;\n    for (const [i, d] of dfs) if ([...i].every(a => c.has(a)) && [...d].some(a => !c.has(a))) { [...d].forEach(a => c.add(a)); cambio = true; }\n  }\n  return [...todos].every(a => c.has(a));', l: 3 },
    { c: 'Escribe «violaBCNF(dfs, todos)»: devuelve la primera dependencia [izq, der] no trivial cuyo lado izquierdo no es superclave, o null si la relación está en BCNF.', f: 'violaBCNF', p: ['dfs', 'todos'], t: [[[[['AB', 'C'], ['C', 'B']], 'ABC'], ['C', 'B']], [[[['A', 'BC']], 'ABC'], null], [[[['A', 'B'], ['B', 'C']], 'ABC'], ['B', 'C']]], sol: '  const cl = X => { const c = new Set(X); let ch = true; while (ch) { ch = false; for (const [i, d] of dfs) if ([...i].every(a => c.has(a)) && [...d].some(a => !c.has(a))) { [...d].forEach(a => c.add(a)); ch = true; } } return c; };\n  for (const [i, d] of dfs) {\n    if ([...d].every(a => i.includes(a))) continue;\n    const c = cl(i);\n    if (![...todos].every(a => c.has(a))) return [i, d];\n  }\n  return null;', l: 4 }
  ],
  gen: function (g) {
    var cases = [
      { d: [['A', 'B'], ['B', 'C']], x: 'A', c: 'ABC' }, { d: [['A', 'B'], ['B', 'C']], x: 'C', c: 'C' }, { d: [['AB', 'C'], ['C', 'D']], x: 'AB', c: 'ABCD' }, { d: [['AB', 'C'], ['C', 'D']], x: 'A', c: 'A' }, { d: [['A', 'C'], ['B', 'D'], ['CD', 'E']], x: 'AB', c: 'ABCDE' }, { d: [['A', 'C'], ['B', 'D'], ['CD', 'E']], x: 'A', c: 'AC' }, { d: [['E', 'A'], ['A', 'BC']], x: 'E', c: 'ABCE' }, { d: [['BC', 'A'], ['A', 'D']], x: 'BC', c: 'ABCD' }
    ];
    cases.forEach(function (k) { g.input(3, 'Con las dependencias ' + k.d.map(function (x) { return x[0] + ' → ' + x[1]; }).join(', ') + ', ¿cuál es el cierre de ' + k.x + '? Escribe los atributos en orden alfabético sin espacios.', k.c, 'Agrega lados derechos mientras el lado izquierdo esté contenido.'); });
    var fn = [['Una columna "telefonos" guarda "999111, 988222"', '1FN'], ['Con clave (alumno, curso), nombre_alumno depende solo de alumno', '2FN'], ['Con clave placa, distrito depende de patio, que depende de placa', '3FN'], ['profesor → curso en Reserva(alumno, curso, profesor) con clave (alumno, curso)', 'BCNF']];
    fn.forEach(function (f) { g.mcq(3, '¿Qué forma normal se viola? ' + f[0], f[1], ['1FN', '2FN', '3FN', 'BCNF'].filter(function (x) { return x !== f[1]; }), 'Cada forma normal elimina un tipo de redundancia.'); });
    var ax = [['Si Y está contenido en X, entonces X → Y', 'Reflexividad'], ['Si X → Y, entonces XZ → YZ', 'Aumento'], ['Si X → Y y Y → Z, entonces X → Z', 'Transitividad'], ['Si X → Y y X → Z, entonces X → YZ', 'Unión'], ['Si X → YZ, entonces X → Y', 'Descomposición']];
    ax.forEach(function (a) { g.mcq(2, '¿Qué regla es esta? ' + a[0], a[1], ['Reflexividad', 'Aumento', 'Transitividad', 'Unión', 'Descomposición'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Axiomas de Armstrong y reglas derivadas.'); });
  },
  checks: [
    ['Explica las tres anomalías con un ejemplo de PatioApp.', 'Actualización: cambiar el distrito de un patio en muchas filas; inserción: no poder registrar un patio sin estadías; borrado: perder el patio al borrar su última estadía.'],
    ['Calcula el cierre de AE con A → BC, CD → E y E → D.', 'AE, luego B y C, luego D por E → D: ABCDE.'],
    ['Diferencia 3FN de BCNF.', 'BCNF exige que el lado izquierdo de toda dependencia no trivial sea superclave; 3FN permite además que el lado derecho sea un atributo primo.'],
    ['¿Qué significan "sin pérdida" y "preserva dependencias"?', 'Sin pérdida: la reunión de las partes da exactamente la original; preserva dependencias: cada dependencia se verifica dentro de una sola parte.'],
    ['¿Cuándo es razonable desnormalizar?', 'Cuando se mide que las reuniones son un cuello de botella en consultas muy frecuentes o analíticas, y se mantiene la copia consistente con un mecanismo explícito.']
  ],
  cites: ['Armstrong, W. (1974). Dependency Structures of Data Base Relationships. *IFIP Congress 1974*.', 'Codd, E. F. (1971). Further Normalization of the Data Base Relational Model. *Courant Computer Science Symposia 6*.', 'Bernstein, P. (1976). Synthesizing Third Normal Form Relations from Functional Dependencies. *ACM Transactions on Database Systems*, 1(4).', 'Fagin, R. (1977). Multivalued Dependencies and a New Normal Form for Relational Databases. *ACM Transactions on Database Systems*, 2(3).', 'Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.), capítulo 7.'],
  project: { t: 'Asistente de normalización',
    goal: 'Programar las herramientas formales del diseño de bases de datos.',
    steps: ['Implementa el cierre de atributos y la búsqueda de todas las claves candidatas de una relación.', 'Implementa la verificación de 2FN, 3FN y BCNF dadas unas dependencias.', 'Implementa la descomposición a BCNF y la síntesis a 3FN, y verifica en cada resultado si es sin pérdida y si preserva dependencias.', 'Aplícalo al esquema de un sistema real (por ejemplo, matrículas de una universidad) y compara con tu diseño intuitivo.', 'Documenta un caso en que BCNF pierda una dependencia y justifica qué elegirías.'],
    deliver: 'El código, los casos de prueba y el informe de diseño.' },
  hito: ['Escribe las dependencias funcionales del esquema de PatioApp y verifica con el cierre de atributos que cada tabla está en BCNF o justifica por qué queda en 3FN.', 'Identifica en PatioApp una desnormalización justificada por rendimiento (o crea una vista materializada en su lugar) y documenta cómo se mantiene consistente.']
});
})();
