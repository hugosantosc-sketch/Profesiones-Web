(function () {
var S = SDC.S;

S('m10', 'm10.analytics', { title: 'Datos para analizar: almacenes de datos, modelo dimensional y BI',
  ask: '¿Cómo modelarías y prepararías estos datos para el análisis?',
  lesson: `
> **La idea en simple.** La base de datos que atiende a la aplicación está diseñada para registrar operaciones rápido: un ingreso, una salida, un cobro. Pero las preguntas de la gerencia son otras: "¿cuál fue la ocupación promedio por sede cada mes del año?", "¿qué clientes con convenio crecieron más?", "¿cuántas unidades revisó cada trabajador por semana?". Responderlas sobre la base operativa es lento, complicado y peligroso para el rendimiento. Para eso existen los almacenes de datos y el modelo dimensional, la base de cualquier dashboard serio.

## Dos mundos: OLTP y OLAP
| | OLTP (operaciones) | OLAP (análisis) |
|---|---|---|
| Usuarios | la aplicación, miles de usuarios | analistas, reportes, dashboards |
| Consultas | pocas filas, por clave, muy frecuentes | millones de filas, agregaciones |
| Escritura | constante, en tiempo real | por lotes o en flujo, mayormente agregar |
| Diseño | normalizado, sin redundancia | dimensional, desnormalizado a propósito |
| Historia | el estado actual | años de historia, cómo cambió todo |
| Ejemplo | PostgreSQL de PatioApp | BigQuery, Snowflake, Redshift, DuckDB |
Ejecutar un reporte de todo el año sobre la base operativa compite por recursos con los operadores que registran salidas en la garita, y las preguntas que cruzan muchas tablas normalizadas se vuelven consultas de diez JOIN. La solución es copiar los datos a un sistema separado, organizado para el análisis.

## El almacén de datos
Un **almacén de datos** (*data warehouse*) es una base orientada al análisis que integra datos de varias fuentes (la base de PatioApp, el sistema de facturación, la hoja de cálculo de convenios, el sistema de recursos humanos), limpios, consistentes y con historia. Dos escuelas definieron el campo:
- **Bill Inmon** (*Building the Data Warehouse*, 1992), considerado el padre del concepto, propuso un almacén central **normalizado** de toda la empresa, del que se derivan **data marts** por área.
- **Ralph Kimball** (*The Data Warehouse Toolkit*, 1996) propuso construir directamente **modelos dimensionales** por proceso de negocio, conectados por dimensiones compartidas. Es el enfoque más usado en la práctica.

## El modelo dimensional: hechos y dimensiones
Kimball organiza los datos en dos tipos de tablas:
- **Tabla de hechos:** cada fila es un evento medible del negocio, con **medidas** numéricas (monto, días, cantidad) y claves hacia las dimensiones. Su **granularidad** (qué representa exactamente una fila) es la decisión más importante del diseño: "una fila por estadía cerrada" o "una fila por espacio por día".
- **Tablas de dimensiones:** el contexto descriptivo para filtrar y agrupar: **fecha** (día, mes, trimestre, día de la semana, feriado), **sede** (nombre, distrito, región), **cliente** (nombre, tipo, convenio), **tipo de unidad**.
Con una tabla de hechos en el centro y las dimensiones alrededor, el diagrama parece una estrella: es el **esquema en estrella**. Si las dimensiones se normalizan en subtablas (sede → distrito → región), se llama **copo de nieve**, más ordenado pero con más JOIN.
~~~txt
                 dim_fecha (fecha_id, dia, mes, anio, dia_semana, es_feriado)
                       |
dim_sede ---- hechos_estadia (fecha_id, sede_id, cliente_id, tipo_id, dias, monto, con_convenio) ---- dim_cliente
                       |
                 dim_tipo_unidad (tipo_id, nombre, tarifa_base)
~~~
Así, "monto cobrado por sede y mes en 2026, solo camiones" es una consulta simple: la tabla de hechos con tres JOIN directos, un filtro y un GROUP BY. La **dimensión fecha** se construye una sola vez con todos los días de varios años y sus atributos (incluidos los feriados del Perú), porque agrupar por "fines de semana largos" o "quincena" es imposible si solo se tiene una marca de tiempo.
~~~js
// Agregación sobre un esquema en estrella en memoria
const hechos = [
  { fecha: '2026-10-03', sede: 1, tipo: 'camion', dias: 2, monto: 90 },
  { fecha: '2026-10-15', sede: 2, tipo: 'auto', dias: 3, monto: 60 },
  { fecha: '2026-11-02', sede: 1, tipo: 'auto', dias: 1, monto: 20 },
  { fecha: '2026-11-09', sede: 1, tipo: 'camion', dias: 4, monto: 180 }
];
const dimSede = { 1: 'Callao', 2: 'Ate' };
function totalPor(hechos, clave, medida) {
  const r = {};
  for (const h of hechos) { const k = clave(h); r[k] = (r[k] || 0) + h[medida]; }
  return r;
}
console.log(totalPor(hechos, h => dimSede[h.sede] + ' ' + h.fecha.slice(0, 7), 'monto'));
// { 'Callao 2026-10': 90, 'Ate 2026-10': 60, 'Callao 2026-11': 200 }
~~~

## Medidas aditivas y no aditivas
No todas las medidas se pueden sumar en cualquier dirección:
- **Aditivas:** se suman por todas las dimensiones (monto cobrado, días).
- **Semiaditivas:** se suman por algunas dimensiones pero no por el tiempo. Las unidades **en el patio** al cierre de cada día se suman entre sedes, pero sumar los 30 cierres de noviembre no da "las unidades de noviembre": se usa el promedio o el último valor.
- **No aditivas:** porcentajes y promedios (la ocupación del 80 % en Callao y del 60 % en Ate no promedian 70 % si las sedes tienen distinto tamaño). Se guardan el numerador y el denominador y se divide **después** de agregar.
Este es uno de los errores más frecuentes en dashboards: promediar promedios.

## Dimensiones que cambian
Un cliente que tenía convenio y lo perdió en agosto: ¿los cobros de julio aparecen como "con convenio" o "sin convenio"? Kimball llamó a esto **dimensiones lentamente cambiantes** (SCD) y propuso estrategias:
- **Tipo 1:** sobrescribir el valor; la historia se pierde (sirve para corregir errores de digitación).
- **Tipo 2:** agregar una **fila nueva** de la dimensión con fechas de vigencia («valido_desde», «valido_hasta»); cada hecho apunta a la versión vigente cuando ocurrió. Preserva la historia exacta y es la más usada.
- **Tipo 3:** guardar una columna con el valor anterior; historia limitada.

## Llevar los datos: ETL y ELT
Los datos llegan al almacén por un proceso que los **extrae** de las fuentes, los **transforma** (limpia, unifica códigos, calcula, aplica reglas) y los **carga**:
- **ETL** clásico: transformar antes de cargar, en un servidor intermedio.
- **ELT** moderno: cargar los datos crudos en el almacén y transformarlos ahí con SQL, aprovechando su potencia. Herramientas como **dbt** (2016) convirtieron estas transformaciones en código versionado, con pruebas y documentación, lo que dio origen al rol de **ingeniero de analítica**.
Los procesos se programan (cada noche, cada hora) o se alimentan en flujo con **captura de cambios** (CDC), que lee el registro de transacciones de la base operativa y envía cada cambio casi en tiempo real.
Un **lago de datos** (*data lake*) guarda archivos crudos de cualquier tipo, baratos, en almacenamiento de objetos (S3, Google Cloud Storage); la arquitectura **lakehouse** combina el lago con capacidades de almacén mediante formatos de tabla abiertos como Apache Iceberg o Delta Lake.

## Por qué los almacenes son tan rápidos: almacenamiento columnar
Una base operativa guarda los datos **por filas**: todos los campos de una estadía juntos, ideal para leer o escribir una estadía completa. Un almacén los guarda **por columnas**: todos los montos juntos, todas las fechas juntas. Una consulta que suma el monto de 100 millones de filas solo lee esa columna, no las otras veinte; además, una columna con valores parecidos se **comprime** muchísimo (la columna "sede" con seis valores posibles ocupa casi nada). El sistema C-Store (Michael Stonebraker y otros, 2005) popularizó la idea en la investigación; hoy la usan BigQuery, Snowflake, Redshift, ClickHouse y **DuckDB**, una base analítica embebida (como SQLite, pero columnar) que analiza millones de filas en una laptop, directamente sobre archivos CSV o Parquet.

## Inteligencia de negocios y dashboards
La capa visible son las herramientas de **BI** (Power BI, Looker Studio, Tableau, Metabase, Superset), que conectan al almacén y construyen dashboards. Las claves de un buen dashboard están más en los datos que en los gráficos:
1. **Una sola definición por métrica**, escrita y compartida: "ocupación = espacios ocupados al cierre ÷ espacios habilitados", no tres versiones distintas en tres reportes. Las **capas semánticas** de las herramientas guardan estas definiciones.
2. **Granularidad clara** y totales que cuadran con la fuente (conciliación con la caja y con SUNAT).
3. **Frescura visible:** "datos actualizados al 13/11 a las 06:00".
4. **Pocas cifras, con comparación:** contra el mes anterior, la meta o el mismo mes del año pasado.
5. **Privacidad:** los datos personales se agregan o seudonimizan antes de llegar a un dashboard de amplia audiencia.

## Ejemplo resuelto: el dashboard de productividad de revisiones
Un patio quiere medir cuántas unidades revisa cada trabajador por día, separando por empresa contratista, a partir de un formulario que alimenta una hoja de cálculo.
1. **Granularidad:** "una fila por revisión realizada": fecha, hora, trabajador, empresa, tipo de revisión, unidad, resultado.
2. **Dimensiones:** fecha (con turnos y feriados), trabajador (con su empresa como atributo, tipo 2 para registrar cambios de empresa), tipo de revisión.
3. **ELT:** cada hora se copian las filas nuevas de la hoja a una base analítica; una transformación en SQL elimina duplicados (el mismo envío del formulario dos veces), normaliza nombres ("SERVIAUTO", "Serviauto S.A.C.", "Servi Auto") con una tabla de equivalencias y rechaza filas sin unidad.
4. **Métricas definidas:** revisiones por trabajador por **turno trabajado** (no por día calendario, para no castigar a quien trabajó medio turno), y promedio por empresa calculado como total de revisiones ÷ total de turnos, **no** como promedio de los promedios individuales.
5. **Resultado:** el dashboard muestra la productividad por empresa y por trabajador, con tendencia semanal y frescura visible, y los totales cuadran con el conteo del formulario.`,
  links: [['m10.join', 'agregaciones y funciones de ventana'], ['m10.norm', 'normalización frente a desnormalización deliberada'], ['ia.data', 'ingeniería de datos y canalizaciones']],
  read: 'Kimball y Ross, *The Data Warehouse Toolkit* (3.ª ed., 2013); Inmon, *Building the Data Warehouse* (4.ª ed., 2005); Reis y Housley, *Fundamentals of Data Engineering* (2022).',
  terms: [
    ['OLAP', 'procesamiento orientado al análisis de grandes volúmenes de datos históricos', ['Frente a OLTP.', 'Agregaciones.', 'Almacenes.']],
    ['Almacén de datos', 'base orientada al análisis que integra datos limpios y con historia de varias fuentes', ['Inmon, 1992.', 'BigQuery.', 'Snowflake.']],
    ['Tabla de hechos', 'tabla cuyas filas son eventos medibles del negocio con medidas y claves a dimensiones', ['hechos_estadia.', 'Granularidad.', 'Monto, días.']],
    ['Dimensión', 'tabla con el contexto descriptivo para filtrar y agrupar los hechos', ['Fecha.', 'Sede.', 'Cliente.']],
    ['Esquema en estrella', 'modelo con una tabla de hechos central unida directamente a sus dimensiones', ['Kimball.', 'Pocos JOIN.', 'Copo de nieve si se normaliza.']],
    ['Granularidad', 'definición exacta de lo que representa una fila de la tabla de hechos', ['Una por estadía.', 'Una por espacio por día.', 'Primera decisión.']],
    ['Dimensión lentamente cambiante', 'dimensión cuyos atributos cambian con el tiempo y requieren una estrategia para la historia', ['SCD tipo 2.', 'Vigencia.', 'Convenios.']],
    ['Almacenamiento columnar', 'organización que guarda juntos los valores de cada columna para leer y comprimir eficientemente', ['C-Store, 2005.', 'DuckDB.', 'Parquet.']]
  ],
  q: [
    ['¿Por qué no ejecutar los reportes anuales sobre la base operativa?', 'Porque compiten por recursos con las operaciones y su diseño normalizado complica las consultas analíticas', ['Porque SQL no permite agregaciones', 'Porque la base operativa no guarda fechas', 'Porque es ilegal'], 'OLTP y OLAP tienen necesidades distintas.', 2],
    ['¿Qué contiene una tabla de hechos?', 'Eventos medibles con medidas numéricas y claves a las dimensiones', ['Solo nombres de clientes', 'Las contraseñas de los usuarios', 'El código de la aplicación'], 'Centro del esquema en estrella.', 1],
    ['¿Cuál es la decisión más importante al diseñar una tabla de hechos?', 'Su granularidad: qué representa exactamente una fila', ['El color del dashboard', 'El nombre de la base', 'El número de columnas de texto'], 'Kimball.', 3],
    ['La ocupación de Callao es 80 % y la de Ate 60 %, con tamaños distintos. ¿La ocupación conjunta es 70 %?', 'No necesariamente: se suman ocupados y habilitados y luego se divide', ['Sí, siempre', 'Sí, si es el mismo mes', 'No se puede calcular'], 'Medida no aditiva.', 3],
    ['Un cliente perdió su convenio en agosto. ¿Qué estrategia conserva que en julio sí lo tenía?', 'Dimensión lentamente cambiante de tipo 2, con una fila por versión y fechas de vigencia', ['Tipo 1, sobrescribiendo', 'Borrar el cliente', 'No registrar el cambio'], 'Historia exacta.', 3],
    ['¿Por qué el almacenamiento columnar acelera una suma sobre millones de filas?', 'Porque solo lee la columna necesaria y la comprime mucho', ['Porque usa más índices', 'Porque guarda menos filas', 'Porque no usa disco'], 'C-Store, BigQuery, DuckDB.', 3],
    ['¿Qué diferencia hay entre ETL y ELT?', 'En ELT los datos crudos se cargan primero y se transforman dentro del almacén', ['Son lo mismo', 'ELT no transforma nada', 'ETL no extrae datos'], 'dbt y el almacén moderno.', 4],
    { tf: 'Las unidades en el patio al cierre de cada día se pueden sumar a lo largo del mes para obtener un total mensual con sentido.', v: false, e: 'Es semiaditiva: no se suma por el tiempo; se usa promedio o último valor.', l: 3 },
    { tf: 'La dimensión fecha suele construirse de antemano con todos los días y atributos como feriados y día de la semana.', v: true, e: 'Permite agrupar por conceptos de calendario.', l: 2 },
    { c: 'Escribe «totalPor(hechos, campo, medida)»: suma la medida agrupando por el valor del campo; devuelve un objeto.', f: 'totalPor', p: ['hechos', 'campo', 'medida'], t: [[[[{ sede: 'Callao', monto: 90 }, { sede: 'Ate', monto: 60 }, { sede: 'Callao', monto: 20 }], 'sede', 'monto'], { Callao: 110, Ate: 60 }], [[[], 'sede', 'monto'], {}]], sol: '  const r = {};\n  for (const h of hechos) r[h[campo]] = (r[h[campo]] || 0) + h[medida];\n  return r;', l: 2 },
    { c: 'Escribe «ocupacionConjunta(sedes)»: recibe [{ ocupados, habilitados }] y devuelve el porcentaje total redondeado a un decimal (suma de ocupados entre suma de habilitados por 100).', f: 'ocupacionConjunta', p: ['sedes'], t: [[[[{ ocupados: 80, habilitados: 100 }, { ocupados: 30, habilitados: 50 }]], 73.3], [[[{ ocupados: 1, habilitados: 4 }]], 25]], sol: '  const o = sedes.reduce((s, x) => s + x.ocupados, 0), h = sedes.reduce((s, x) => s + x.habilitados, 0);\n  return Math.round(o / h * 1000) / 10;', l: 2 },
    { c: 'Escribe «versionVigente(versiones, fecha)»: versiones es una lista de { desde, hasta, convenio } con fechas ISO ("hasta" null si sigue vigente); devuelve el convenio de la versión vigente en la fecha (desde ≤ fecha < hasta), o null.', f: 'versionVigente', p: ['versiones', 'fecha'], t: [[[[{ desde: '2026-01-01', hasta: '2026-08-01', convenio: true }, { desde: '2026-08-01', hasta: null, convenio: false }], '2026-07-15'], true], [[[{ desde: '2026-01-01', hasta: '2026-08-01', convenio: true }, { desde: '2026-08-01', hasta: null, convenio: false }], '2026-09-01'], false], [[[{ desde: '2026-01-01', hasta: null, convenio: true }], '2025-12-31'], null]], sol: '  const v = versiones.find(x => x.desde <= fecha && (x.hasta === null || fecha < x.hasta));\n  return v ? v.convenio : null;', l: 3 }
  ],
  gen: function (g) {
    var me = [['Monto cobrado', 'Aditiva'], ['Días de estadía', 'Aditiva'], ['Unidades en el patio al cierre del día', 'Semiaditiva'], ['Saldo de caja al final del día', 'Semiaditiva'], ['Porcentaje de ocupación', 'No aditiva'], ['Tarifa promedio por día', 'No aditiva']];
    me.forEach(function (m) { g.mcq(3, '¿Qué tipo de medida es? ' + m[0], m[1], ['Aditiva', 'Semiaditiva', 'No aditiva', 'Dimensión'].filter(function (x) { return x !== m[1]; }), 'Aditividad de las medidas.'); });
    var td = [['Sede', 'Dimensión'], ['Monto cobrado', 'Medida de la tabla de hechos'], ['Fecha con día de la semana y feriado', 'Dimensión'], ['Cantidad de días', 'Medida de la tabla de hechos'], ['Tipo de unidad', 'Dimensión']];
    td.forEach(function (t) { g.mcq(1, 'En un esquema en estrella, ¿dónde va? ' + t[0], t[1], ['Dimensión', 'Medida de la tabla de hechos', 'En ninguna parte', 'En la base operativa solamente'].filter(function (x) { return x !== t[1]; }), 'Hechos y dimensiones.'); });
    g.times(6, function (R) { var o1 = R.int(20, 90), h1 = 100, o2 = R.int(5, 45), h2 = 50; var r = Math.round((o1 + o2) / (h1 + h2) * 1000) / 10; g.input(3, 'Callao tiene ' + o1 + ' de 100 espacios ocupados y Ate ' + o2 + ' de 50. ¿Cuál es la ocupación conjunta en porcentaje, con un decimal?', r, 'Suma de ocupados entre suma de habilitados, no promedio de porcentajes.'); });
  },
  checks: [
    ['Compara OLTP y OLAP y explica por qué se separan.', 'OLTP registra operaciones con consultas pequeñas y frecuentes; OLAP analiza grandes volúmenes históricos; separarlos evita competir por recursos y permite un diseño adecuado.'],
    ['Describe el modelo dimensional: hechos, dimensiones, granularidad y esquema en estrella.', 'Los hechos son eventos con medidas y claves; las dimensiones dan contexto; la granularidad define qué es una fila; la estrella une los hechos directamente a las dimensiones.'],
    ['¿Qué son las medidas aditivas, semiaditivas y no aditivas, y por qué importa?', 'Se suman por todas, por algunas o por ninguna dimensión; promediar promedios o sumar saldos por el tiempo produce cifras falsas.'],
    ['¿Qué es una dimensión lentamente cambiante de tipo 2 y qué es ELT?', 'Una nueva fila por versión con fechas de vigencia para conservar la historia; ELT carga datos crudos y los transforma dentro del almacén.']
  ],
  cites: ['Kimball, R. y Ross, M. (2013). *The Data Warehouse Toolkit* (3.ª ed.). Wiley.', 'Inmon, W. H. (2005). *Building the Data Warehouse* (4.ª ed.). Wiley.', 'Stonebraker, M. y otros (2005). C-Store: A Column-oriented DBMS. *VLDB 2005*.', 'Codd, E. F., Codd, S. B. y Salley, C. T. (1993). Providing OLAP to User-Analysts: An IT Mandate. Codd & Associates.', 'Raasveldt, M. y Mühleisen, H. (2019). DuckDB: an Embeddable Analytical Database. *SIGMOD 2019*.', 'Reis, J. y Housley, M. (2022). *Fundamentals of Data Engineering*. O\'Reilly.'],
  project: { t: 'Del registro operativo al dashboard',
    goal: 'Diseñar un modelo dimensional, cargarlo con un proceso ELT y construir un dashboard con métricas bien definidas.',
    steps: ['Elige un proceso de negocio con datos operativos (reales o simulados) y define la granularidad de la tabla de hechos.', 'Diseña el esquema en estrella con una dimensión fecha completa y al menos una dimensión de tipo 2.', 'Carga los datos con un proceso ELT en DuckDB o SQLite, con limpieza de duplicados y normalización de nombres.', 'Escribe la definición de tres métricas, incluida una no aditiva calculada correctamente.', 'Construye un dashboard (Looker Studio, Metabase o una página propia) con frescura visible y totales conciliados con la fuente.'],
    deliver: 'El diagrama del modelo, los scripts de carga y transformación, el documento de métricas y el dashboard.' },
  hito: ['Diseña el esquema en estrella de estadías de PatioApp con dimensiones fecha, sede, cliente (tipo 2) y tipo de unidad.', 'Construye el dashboard mensual de PatioApp con ocupación calculada como cociente de sumas y conciliación con la caja.']
});
SDC.after('m10.analytics', 'm10.nosql');
})();
