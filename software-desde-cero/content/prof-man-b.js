(function () {
var S = SDC.S;

S('man', 'man.debt', { title: 'Deuda técnica: identificarla, medirla y pagarla',
  ask: '¿Qué tipo de deuda técnica es esta y cómo la gestionarías?',
  lesson: `
> **La idea en simple.** Cuando un equipo elige una solución rápida en lugar de una mejor, gana tiempo hoy a cambio de pagar más después: cada cambio futuro en esa zona costará un poco más. Ward Cunningham comparó esto en 1992 con una **deuda financiera**: pedir prestado puede ser una gran decisión si se sabe lo que se hace y se paga a tiempo, pero los **intereses** se acumulan, y una deuda ignorada termina paralizando. Gestionar la deuda técnica es una de las tareas centrales de quien mantiene software.

## La metáfora, bien entendida
Cunningham la usó para explicar a su jefe por qué había que refactorizar un sistema financiero: el equipo había lanzado con una comprensión parcial del dominio, lo cual era razonable para aprender rápido, pero ahora que entendían mejor debían **devolver** esa comprensión al código. En la metáfora:
- El **principal** es el trabajo necesario para llevar el código al diseño adecuado.
- Los **intereses** son el costo extra que se paga en cada cambio mientras la deuda existe: más tiempo para entender, más errores, más pruebas manuales.
- La deuda **no es mala en sí**: tomarla a propósito para llegar a una fecha o validar una idea puede ser la decisión correcta. Lo malo es tomarla sin saberlo, o no pagarla nunca.
Una consecuencia importante: la deuda en código que **casi no se cambia** cobra pocos intereses. Un módulo feo que nadie toca desde hace dos años no es urgente; uno feo que se modifica cada semana, sí.

## El cuadrante de la deuda
Martin Fowler (2009) clasificó la deuda en dos ejes: si fue **deliberada** o **inadvertida**, y si fue **prudente** o **imprudente**:
| | Imprudente | Prudente |
|---|---|---|
| **Deliberada** | "No tenemos tiempo para diseñar" | "Lanzamos ahora y asumimos las consecuencias; lo arreglamos después de la feria" |
| **Inadvertida** | "¿Qué es una capa?" | "Ahora sabemos cómo deberíamos haberlo hecho" |
La deuda **prudente e inadvertida** es inevitable: al terminar un sistema, el equipo entiende el problema mucho mejor que al empezar. La **prudente y deliberada** es una herramienta legítima, siempre que quede registrada. Las **imprudentes** se reducen con formación, revisiones y tiempo para hacer las cosas bien.

## Tipos de deuda
La deuda no está solo en el código:
- **De diseño y arquitectura:** módulos acoplados, responsabilidades mezcladas, una base de datos compartida por cinco servicios.
- **De código:** duplicación, funciones enormes, nombres confusos, código muerto.
- **De pruebas:** partes críticas sin pruebas automáticas, pruebas lentas o inestables que nadie confía.
- **De documentación:** decisiones no registradas, guías desactualizadas, conocimiento que solo está en la cabeza de una persona.
- **De infraestructura y dependencias:** versiones sin soporte, configuración a mano, despliegues manuales.
- **De datos:** datos inconsistentes o duplicados, esquemas que ya no representan el negocio.
- **De seguridad:** vulnerabilidades conocidas sin corregir, que además de intereses tienen **riesgo de quiebra**: un incidente puede costar mucho más que todo lo demás junto.

## Identificar y medir
- **Señales del equipo:** "no toquen ese módulo", "eso solo lo entiende Martín", estimaciones que se inflan siempre en la misma zona, errores que reaparecen.
- **Análisis estático:** complejidad, duplicación, tamaño, dependencias desactualizadas. Herramientas como SonarQube estiman la deuda en horas de trabajo, una cifra útil para ver tendencias aunque no sea exacta.
- **Puntos calientes** (Adam Tornhill, *Your Code as a Crime Scene*, 2015): cruzar la **complejidad** de cada archivo con su **frecuencia de cambio** en la historia de Git. Los archivos complejos que cambian mucho son donde la deuda cobra más intereses; suelen ser una fracción pequeña del código y concentrar la mayoría de los errores.
- **Costo en el flujo:** cuánto tardan los cambios en ciertas zonas comparado con otras; cuántos incidentes vienen de ellas.
~~~js
// Puntos calientes: complejidad × cambios recientes (los cambios se obtienen con: git log --format= --name-only)
const archivos = [
  { ruta: 'src/tarifas.js', complejidad: 48, cambios: 37 },
  { ruta: 'src/reportes/mensual.js', complejidad: 62, cambios: 3 },
  { ruta: 'src/salidas.js', complejidad: 25, cambios: 41 },
  { ruta: 'src/util/fechas.js', complejidad: 8, cambios: 12 }
];
const ranking = archivos.map(a => ({ ...a, puntaje: a.complejidad * a.cambios })).sort((x, y) => y.puntaje - x.puntaje);
console.log(ranking.map(a => a.ruta + ' ' + a.puntaje));
// tarifas.js 1776, salidas.js 1025, mensual.js 186, fechas.js 96 → primero tarifas, aunque mensual.js sea el más complejo
~~~

## Registrar la deuda
La deuda que no se ve no se paga. Prácticas útiles:
- Un **registro de deuda** (issues con una etiqueta, o una sección en el tablero) con: qué es, dónde está, qué intereses cobra (con ejemplos: "cada cambio de tarifa toma 2 días en lugar de 2 horas"), qué costaría pagarla y qué riesgo implica.
- Cada vez que se toma deuda **deliberada**, crear el registro en el mismo momento, con la fecha prevista de pago.
- Comentarios «TODO» en el código solo si enlazan a un registro; si no, se olvidan.

## Pagar la deuda
Estrategias que funcionan, de menor a mayor escala:
- **La regla del boy scout** ("deja el campamento más limpio de lo que lo encontraste", atribuida a Robert C. Martin): cada cambio mejora un poco el código que toca. Funciona porque concentra el pago justo donde se cobran intereses.
- **Un porcentaje fijo de capacidad:** muchos equipos reservan entre 15 % y 20 % de cada ciclo para deuda y mejoras técnicas, negociado con producto como parte del trabajo normal, no como un favor.
- **Pagos asociados a funciones:** antes de agregar la función nueva al módulo de tarifas, refactorizarlo ("primero haz que el cambio sea fácil, luego haz el cambio fácil", dijo Kent Beck).
- **Proyectos dedicados** para deudas grandes (una migración de base de datos, separar un módulo), con objetivos medibles, igual que cualquier proyecto.
Y para comunicarla al negocio, hablar en su idioma: no "el código está feo", sino "los cambios de tarifas tardan 4 veces más que los demás y causaron 3 de los 5 incidentes del trimestre; invertir 2 semanas reduciría ese tiempo a la mitad".

## Ejemplo resuelto: la deuda de PatioApp
El equipo siente que "todo va lento", pero no sabe por dónde empezar.
1. **Puntos calientes:** el análisis cruza complejidad con cambios de los últimos seis meses. Los dos primeros son «tarifas.js» y «salidas.js»; juntos son el 6 % del código y concentran el 60 % de los errores reportados.
2. **Registro:** se documentan 9 deudas. Las tres más caras: lógica de tarifas duplicada en el frontend y el backend (cada cambio se hace dos veces y a veces no coinciden), ausencia de pruebas en el cálculo de convenios, y una versión de Node que pierde soporte en cuatro meses.
3. **Clasificación:** la de Node es urgente por riesgo de seguridad; la de tarifas cobra los mayores intereses; la del reporte mensual, aunque es la más compleja, casi no cambia y puede esperar.
4. **Plan:** 20 % de cada ciclo para deuda; primero, pruebas de caracterización del cálculo de convenios; luego, mover las tarifas a un solo módulo del backend que el frontend consulta; en paralelo, la actualización de Node.
5. **Comunicar:** a la gerencia se le presenta en tiempo y riesgo: "los cambios de tarifas toman 3 días; tras el plan, menos de uno, y se elimina la causa del 40 % de los errores de cobro".
6. **Resultado a tres meses:** el tiempo de los cambios de tarifas baja de 3 días a medio día, y los errores de cobro reportados bajan de 11 a 3 por mes.`,
  links: [['man.evol', 'métricas de mantenibilidad y puntos calientes'], ['m6.refactor', 'técnicas de refactorización'], ['man.legacy', 'pruebas de caracterización y código heredado']],
  read: 'Cunningham, "The WyCash Portfolio Management System" (OOPSLA 1992); Fowler, "Technical Debt Quadrant" (2009); Kruchten, Nord y Ozkaya, *Managing Technical Debt* (2019); Tornhill, *Your Code as a Crime Scene* (2015).',
  terms: [
    ['Deuda técnica', 'costo futuro extra que se asume al elegir una solución rápida en lugar de una mejor', ['Cunningham, 1992.', 'Principal e intereses.', 'Puede ser prudente.']],
    ['Intereses de la deuda', 'costo extra que se paga en cada cambio mientras la deuda existe', ['Más tiempo.', 'Más errores.', 'Mayor donde más se cambia.']],
    ['Cuadrante de la deuda', 'clasificación de la deuda en deliberada o inadvertida y prudente o imprudente', ['Fowler, 2009.', 'Prudente deliberada.', 'Inevitable la inadvertida prudente.']],
    ['Punto caliente', 'archivo que combina alta complejidad con alta frecuencia de cambio', ['Tornhill.', 'Complejidad × cambios.', 'Concentra errores.']],
    ['Registro de deuda', 'lista visible de deudas con su ubicación, intereses, costo de pago y riesgo', ['Etiqueta en issues.', 'Al tomarla.', 'Priorizar.']],
    ['Regla del boy scout', 'práctica de dejar el código un poco mejor cada vez que se toca', ['Pago gradual.', 'Donde hay intereses.', 'Martin.']],
    ['Deuda de seguridad', 'vulnerabilidades conocidas sin corregir, con riesgo de un costo repentino muy alto', ['Versiones sin soporte.', 'Riesgo de quiebra.', 'Urgente.']],
    ['Primero el cambio fácil', 'refactorizar antes de agregar una función para que agregarla sea simple', ['Kent Beck.', 'Pago asociado.', 'Preparar el terreno.']]
  ],
  q: [
    ['¿Cuándo la deuda técnica cobra más intereses?', 'Cuando está en código que se cambia con frecuencia', ['Cuando está en código que nadie toca', 'Siempre igual', 'Solo en el frontend'], 'Intereses al cambiar.', 2],
    ['"Lanzamos ahora para la feria y lo arreglamos después" es deuda…', 'Deliberada y prudente, si se registra y se paga', ['Inadvertida e imprudente', 'Inexistente', 'Siempre mala'], 'Cuadrante de Fowler.', 2],
    ['¿Qué combinación identifica un punto caliente?', 'Alta complejidad y alta frecuencia de cambio', ['Archivo grande y antiguo', 'Muchos comentarios', 'Pocos autores'], 'Tornhill.', 2],
    ['El módulo más complejo casi no cambia desde hace dos años. ¿Es la prioridad?', 'No necesariamente: cobra pocos intereses', ['Sí, siempre lo más complejo primero', 'Hay que reescribirlo ya', 'Hay que borrarlo'], 'Priorizar por intereses.', 3],
    ['¿Cómo conviene explicar la deuda al negocio?', 'En tiempo, errores y riesgo: "los cambios de tarifas tardan 4 veces más"', ['"El código está feo"', 'Con la lista de patrones violados', 'No se explica'], 'Hablar en su idioma.', 3],
    ['¿Qué tipo de deuda tiene "riesgo de quiebra"?', 'La de seguridad', ['La de documentación', 'La de nombres', 'La de formato'], 'Un incidente puede costar más que todo.', 2],
    ['¿Qué significa "primero haz que el cambio sea fácil, luego haz el cambio fácil"?', 'Refactorizar la zona antes de agregar la función nueva', ['Hacer solo cambios fáciles', 'Evitar los cambios difíciles', 'Postergar la deuda'], 'Kent Beck.', 4],
    { tf: 'Toda deuda técnica es resultado de malas decisiones y debe evitarse siempre.', v: false, e: 'Puede ser una decisión prudente y deliberada; lo malo es ignorarla.', l: 1 },
    { tf: 'Un TODO en el código sin un registro asociado suele olvidarse.', v: true, e: 'Conviene enlazarlo a un issue.', l: 1 },
    { c: 'Escribe «puntosCalientes(archivos, n)»: recibe { ruta, complejidad, cambios } y devuelve las n rutas con mayor complejidad × cambios, de mayor a menor.', f: 'puntosCalientes', p: ['archivos', 'n'], t: [[[[{ ruta: 'tarifas', complejidad: 48, cambios: 37 }, { ruta: 'mensual', complejidad: 62, cambios: 3 }, { ruta: 'salidas', complejidad: 25, cambios: 41 }], 2], ['tarifas', 'salidas']]], sol: '  return [...archivos].sort((a, b) => b.complejidad * b.cambios - a.complejidad * a.cambios).slice(0, n).map(a => a.ruta);', l: 2 },
    { c: 'Escribe «cuadrante(deliberada, prudente)»: devuelve "deliberada-prudente", "deliberada-imprudente", "inadvertida-prudente" o "inadvertida-imprudente".', f: 'cuadrante', p: ['deliberada', 'prudente'], t: [[[true, true], 'deliberada-prudente'], [[false, true], 'inadvertida-prudente'], [[true, false], 'deliberada-imprudente'], [[false, false], 'inadvertida-imprudente']], sol: '  return (deliberada ? \'deliberada\' : \'inadvertida\') + \'-\' + (prudente ? \'prudente\' : \'imprudente\');', l: 1 },
    { c: 'Escribe «recuperacion(costoPago, ahorroPorCambio, cambiosPorMes)»: meses para recuperar lo invertido en pagar una deuda, redondeado hacia arriba.', f: 'recuperacion', p: ['costoPago', 'ahorroPorCambio', 'cambiosPorMes'], t: [[[80, 10, 4], 2], [[80, 2, 1], 40], [[30, 5, 6], 1]], sol: '  return Math.ceil(costoPago / (ahorroPorCambio * cambiosPorMes));', l: 2 }
  ],
  gen: function (g) {
    var cu = [['"No tenemos tiempo para diseñar, hazlo como salga"', 'Deliberada e imprudente'], ['"Lanzamos para la feria y pagamos la deuda el mes siguiente"', 'Deliberada y prudente'], ['"¿Qué es la separación en capas?"', 'Inadvertida e imprudente'], ['"Ahora que entendemos el dominio, sabemos cómo debimos hacerlo"', 'Inadvertida y prudente']];
    cu.forEach(function (c) { g.mcq(2, 'Según el cuadrante de Fowler, ¿qué deuda es? ' + c[0], c[1], ['Deliberada e imprudente', 'Deliberada y prudente', 'Inadvertida e imprudente', 'Inadvertida y prudente'].filter(function (x) { return x !== c[1]; }), 'Cuadrante de la deuda técnica.'); });
    var ti = [['Lógica de tarifas copiada en tres lugares', 'De código'], ['El cálculo de convenios no tiene pruebas', 'De pruebas'], ['Nadie registró por qué se eligió esa base de datos', 'De documentación'], ['La versión de Node pierde soporte en tres meses', 'De infraestructura y dependencias'], ['Cinco servicios escriben la misma tabla', 'De diseño y arquitectura'], ['Una vulnerabilidad conocida sin corregir', 'De seguridad']];
    ti.forEach(function (t) { g.mcq(1, '¿Qué tipo de deuda es? ' + t[0], t[1], ['De código', 'De pruebas', 'De documentación', 'De infraestructura y dependencias', 'De diseño y arquitectura', 'De seguridad'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Tipos de deuda técnica.'); });
    g.times(5, function (R) { var c = R.int(10, 60), k = R.int(2, 40); g.input(2, 'Un archivo tiene complejidad ' + c + ' y ' + k + ' cambios en seis meses. ¿Cuál es su puntaje de punto caliente (complejidad × cambios)?', c * k, 'Producto de ambas.'); });
  },
  checks: [
    ['Explica la metáfora de la deuda técnica: principal, intereses y cuándo es aceptable.', 'El principal es el trabajo para llevar el código al diseño adecuado, los intereses el costo extra en cada cambio; es aceptable si es deliberada, prudente, registrada y se paga.'],
    ['Describe el cuadrante de Fowler y los tipos de deuda.', 'Deliberada o inadvertida, prudente o imprudente; de diseño, código, pruebas, documentación, infraestructura, datos y seguridad.'],
    ['¿Cómo se identifican las deudas más caras?', 'Con señales del equipo, análisis estático y puntos calientes que cruzan complejidad con frecuencia de cambio, y con el costo en el flujo y los incidentes.'],
    ['¿Qué estrategias hay para pagar la deuda y cómo se comunica al negocio?', 'Regla del boy scout, porcentaje fijo de capacidad, pagos asociados a funciones y proyectos dedicados; comunicándola en tiempo, errores y riesgo.']
  ],
  cites: ['Cunningham, W. (1992). The WyCash Portfolio Management System. *OOPSLA 92 Experience Report*.', 'Fowler, M. (2009). Technical Debt Quadrant. martinfowler.com.', 'Kruchten, P., Nord, R. y Ozkaya, I. (2019). *Managing Technical Debt*. Addison-Wesley.', 'Tornhill, A. (2015). *Your Code as a Crime Scene*. Pragmatic Bookshelf.', 'Besker, T., Martini, A. y Bosch, J. (2018). Technical Debt Cripples Software Developer Productivity. *TechDebt 2018*.'],
  project: { t: 'Auditoría de deuda técnica',
    goal: 'Identificar, medir, priorizar y comenzar a pagar la deuda técnica de un proyecto real.',
    steps: ['Elige un repositorio con historia (propio o de código abierto) y calcula los puntos calientes con la complejidad y los cambios de Git.', 'Entrevista al equipo (o revisa los issues) para encontrar las señales de deuda y regístralas con intereses, costo y riesgo.', 'Clasifica cada deuda en el cuadrante de Fowler y por tipo.', 'Prioriza las tres más caras y escribe el plan de pago con un caso de negocio para cada una.', 'Paga una de ellas (con pruebas de caracterización si es código) y mide el antes y el después.'],
    deliver: 'El análisis de puntos calientes, el registro de deuda, el plan y la medición.' },
  hito: ['Calcula los puntos calientes del repositorio de PatioApp y crea su registro de deuda técnica priorizado.', 'Reserva el 20 % de cada ciclo de PatioApp para deuda y paga primero la duplicación de la lógica de tarifas.']
});
SDC.after('man.debt', 'man.evol');

S('man', 'man.migrate', { title: 'Migraciones de plataforma y de datos',
  ask: '¿Cómo planificarías esta migración para que sea segura?',
  lesson: `
> **La idea en simple.** Tarde o temprano, todo sistema debe migrar: a una versión nueva del lenguaje o del framework, a otra base de datos, a otro proveedor de nube, de un sistema viejo a uno nuevo. Las migraciones están entre los proyectos más riesgosos del software porque cambian algo que **ya funciona** y que la gente usa todos los días. Las que salen bien tienen algo en común: se hacen por pasos pequeños y reversibles, se verifican con datos reales y nunca dependen de un único "gran día".

## Por qué se migra
- **Fin de soporte:** el lenguaje, el framework, el sistema operativo o la base de datos dejan de recibir parches de seguridad. Es la razón más común y la menos negociable.
- **Costo:** un proveedor más barato, licencias que encarecen, infraestructura más eficiente.
- **Capacidad:** el sistema actual no escala o no permite algo que el negocio necesita.
- **Consolidación:** después de una fusión o de años de crecimiento, hay varios sistemas que hacen lo mismo.
- **Productividad:** una plataforma que el equipo ya no sabe mantener o para la que no se consigue personal.
Antes de empezar conviene escribir el **porqué** y cómo se sabrá que la migración terminó con éxito. Las migraciones "porque la tecnología nueva es mejor" sin un beneficio concreto suelen quedar a medias, que es el peor estado posible: dos sistemas que mantener.

## Tipos de migración
| Tipo | Ejemplo | Riesgo principal |
|---|---|---|
| Actualización de versión | Node 18 a 22, React 17 a 19, PostgreSQL 14 a 17 | cambios incompatibles, dependencias que no soportan la versión nueva |
| Cambio de tecnología | de MySQL a PostgreSQL, de una API REST a otra | diferencias de comportamiento sutiles |
| Cambio de infraestructura | de un servidor propio a la nube, de un proveedor a otro | red, permisos, latencia, costos |
| Migración de datos | de un sistema heredado a uno nuevo, de un esquema a otro | datos perdidos, duplicados o mal transformados |
| Reemplazo de sistema | de una planilla y un programa de escritorio a una aplicación web | procesos del negocio que el sistema viejo hacía sin que nadie lo supiera |

## Actualizar versiones sin sufrir
Las actualizaciones de versión mayor (del lenguaje o de un framework) son las más frecuentes. Prácticas que las vuelven rutinarias:
1. **Actualizar seguido, de a poco.** Pasar de la versión 14 a la 15 es sencillo; de la 10 a la 22, un proyecto de meses. Herramientas como Dependabot o Renovate abren PR con cada versión nueva.
2. **Leer las notas de la versión** y las guías de migración; buscar los cambios incompatibles (*breaking changes*) que afectan al proyecto.
3. **Tener pruebas** que cubran lo importante; sin ellas, una actualización es un salto a ciegas.
4. **Usar las herramientas de migración automática** que muchos proyectos ofrecen (*codemods*: programas que reescriben el código, como los de React o Next.js).
5. **Atender las advertencias de obsolescencia** (*deprecation warnings*) de la versión actual antes de saltar a la siguiente: indican exactamente lo que dejará de funcionar.
6. **Probar en un entorno igual a producción** y desplegar de forma gradual.

## Migrar datos
Mover datos de un sistema o esquema a otro tiene sus propias reglas:
1. **Perfilar los datos de origen:** antes de escribir la migración, conocer la realidad: cuántos registros, cuántos nulos, formatos inconsistentes, duplicados, valores imposibles (estadías con salida anterior a la entrada, placas con formatos viejos). Los sistemas viejos siempre tienen sorpresas.
2. **Definir el mapeo** campo por campo, con las reglas de transformación y qué se hace con los datos que no cumplen (corregir, marcar o rechazar con un informe).
3. **Hacer la migración repetible e idempotente:** un script que se puede ejecutar muchas veces sobre una copia, desde cero, siempre con el mismo resultado. Se ensaya decenas de veces antes del día real.
4. **Verificar con conciliación:** comparar conteos, sumas de control (total cobrado por mes, número de estadías por sede) y una muestra de registros individuales entre origen y destino. "El script terminó sin errores" no significa que los datos estén bien.
5. **Planificar el corte:** cómo se manejan los datos que cambian mientras se migra (ver más abajo).

## Estrategias para el corte
- **Gran corte** (*big bang*): un día se apaga el sistema viejo y se enciende el nuevo. Simple, pero todo el riesgo se concentra en un momento y revertir es difícil. Solo para sistemas pequeños o cuando no hay alternativa.
- **Migración por etapas:** se migra por partes (una sede, un módulo, un tipo de cliente) con el sistema viejo funcionando para el resto, como en la higuera estranguladora.
- **Ejecución en paralelo:** ambos sistemas procesan lo mismo durante un tiempo y se comparan los resultados. Si el nuevo calcula los mismos montos que el viejo durante un mes de operación real, la confianza es alta.
- **Escritura doble y lectura en sombra:** la aplicación escribe en la base vieja y en la nueva; lee de la vieja, pero también consulta la nueva **en sombra** y registra las diferencias sin mostrarlas. Cuando las diferencias llegan a cero, se cambia la lectura a la nueva. Es la técnica habitual para migrar bases de datos sin detener el servicio.
- **Captura de cambios (CDC):** se copia el grueso de los datos y luego se replican continuamente los cambios del origen al destino hasta el momento del corte, que dura minutos.
En todos los casos: un **plan de reversión** probado, criterios claros para decidir revertir ("si la conciliación de cobros difiere en más de 0,1 %, volvemos"), y comunicación previa a los usuarios.

## Lo que el sistema viejo hacía sin que nadie lo supiera
El riesgo más traicionero de reemplazar un sistema es el **comportamiento implícito**: reglas que nadie documentó porque "siempre fue así". Un redondeo particular en los montos, un reporte que alguien imprimía cada viernes, un correo automático que el área contable usaba para conciliar, un campo de observaciones donde los operadores anotaban información crítica. Por eso la migración empieza con un **inventario** de todo lo que el sistema viejo hace (entrevistando a quienes lo usan, revisando trabajos programados, integraciones y reportes) y con pruebas de caracterización de sus cálculos.

## Ejemplo resuelto: de la planilla al sistema
Un patio con 8 años de historia en una planilla de cálculo y un programa de escritorio pasa a PatioApp.
1. **Inventario:** entrevistas con operadores y contabilidad revelan tres comportamientos implícitos: una fórmula de la planilla que redondeaba a favor del cliente, una columna "OBS" con advertencias sobre unidades con daños previos, y un reporte de ocupación que el gerente pedía cada lunes.
2. **Perfilado:** 182 000 filas; 3,4 % de placas con formatos viejos o con espacios, 1200 estadías sin fecha de salida que en realidad salieron (el operador olvidó registrarlo), 340 duplicados exactos.
3. **Mapeo y reglas:** placas normalizadas; estadías sin salida con más de 90 días se marcan "cerrada sin registro" para revisión; duplicados exactos eliminados con informe; la columna OBS se migra a un campo de notas visible al buscar la unidad.
4. **Ensayos:** el script de migración se ejecuta 15 veces sobre copias, con conciliación automática: estadías por mes y sede, total cobrado por mes (con la regla de redondeo replicada), unidades con notas.
5. **Ejecución en paralelo:** durante dos semanas, los operadores registran en ambos sistemas en una sede piloto; las diferencias de montos se investigan una por una (aparecen dos errores en las reglas de convenio del sistema nuevo).
6. **Corte por sedes**, una por semana, con plan de reversión. El reporte del lunes se reconstruye en el dashboard. A los dos meses, la planilla se archiva en solo lectura y se conserva por los plazos legales.`,
  links: [['man.legacy', 'la higuera estranguladora y las pruebas de caracterización'], ['m10.app', 'migraciones de esquema con expandir y contraer'], ['man.release', 'estrategias de despliegue y reversión']],
  read: 'Fowler, "StranglerFigApplication" y "ParallelChange" (martinfowler.com); Kleppmann, *Designing Data-Intensive Applications* (2017), capítulos 4 y 11; Stripe Engineering, "Online migrations at scale" (2017).',
  terms: [
    ['Migración', 'traslado de un sistema, sus datos o su plataforma a otra versión, tecnología o infraestructura', ['Fin de soporte.', 'Por pasos.', 'Reversible.']],
    ['Cambio incompatible', 'modificación de una versión nueva que rompe código que funcionaba con la anterior', ['Breaking change.', 'Notas de versión.', 'Versión mayor.']],
    ['Codemod', 'programa que reescribe automáticamente código para adaptarlo a una nueva versión', ['React.', 'Next.js.', 'Migración automática.']],
    ['Perfilado de datos', 'análisis de la calidad y la forma real de los datos antes de migrarlos', ['Nulos.', 'Duplicados.', 'Formatos.']],
    ['Conciliación', 'comparación de conteos, sumas y muestras entre el origen y el destino para verificar una migración', ['Sumas de control.', 'Por mes y sede.', 'No basta sin errores.']],
    ['Ejecución en paralelo', 'operación simultánea del sistema viejo y el nuevo para comparar sus resultados', ['Sede piloto.', 'Diferencias.', 'Confianza.']],
    ['Lectura en sombra', 'consulta al sistema nuevo sin mostrar su resultado, solo para registrar diferencias con el viejo', ['Shadow read.', 'Escritura doble.', 'Bases de datos.']],
    ['Comportamiento implícito', 'regla o función que el sistema viejo cumplía sin estar documentada', ['Redondeo.', 'Reporte del lunes.', 'Inventario.']]
  ],
  q: [
    ['¿Cuál es la razón más común y menos negociable para migrar?', 'El fin del soporte de seguridad de la plataforma', ['La moda', 'El gusto del equipo', 'Un logo nuevo'], 'Sin parches, hay riesgo.', 1],
    ['¿Por qué conviene actualizar versiones seguido y de a poco?', 'Porque saltar muchas versiones juntas acumula cambios incompatibles y se vuelve un proyecto enorme', ['Porque las versiones nuevas son siempre gratis', 'No conviene', 'Porque lo exige la ley'], 'De la 14 a la 15 es fácil; de la 10 a la 22, no.', 2],
    ['El script de migración terminó sin errores. ¿Basta?', 'No: hay que conciliar conteos, sumas y muestras entre origen y destino', ['Sí, siempre', 'Sí, si fue rápido', 'Solo si es de noche'], 'Verificar los datos.', 2],
    ['¿Qué estrategia concentra todo el riesgo en un solo momento?', 'El gran corte (big bang)', ['La migración por etapas', 'La ejecución en paralelo', 'La lectura en sombra'], 'Difícil de revertir.', 2],
    ['¿En qué consiste la escritura doble con lectura en sombra?', 'Escribir en ambas bases, leer de la vieja y consultar la nueva en sombra registrando diferencias', ['Escribir solo en la nueva', 'Borrar la vieja primero', 'Leer de ambas y mostrar las dos'], 'Migrar bases sin detener el servicio.', 3],
    ['¿Por qué una migración debe ser repetible e idempotente?', 'Para ensayarla muchas veces sobre copias con el mismo resultado', ['Para que sea más rápida', 'Para que no necesite pruebas', 'Porque así lo exige SQL'], 'Ensayos.', 3],
    ['¿Cómo se descubre el comportamiento implícito del sistema viejo?', 'Con un inventario: entrevistas, trabajos programados, integraciones, reportes y pruebas de caracterización', ['Leyendo solo la documentación oficial', 'No se puede descubrir', 'Esperando a que alguien se queje'], 'Lo que hacía sin que nadie lo supiera.', 4],
    { tf: 'Una migración que queda a medias, con dos sistemas funcionando para siempre, es un resultado aceptable.', v: false, e: 'Es el peor estado: se mantienen dos sistemas.', l: 2 },
    { tf: 'Atender las advertencias de obsolescencia antes de actualizar facilita el salto de versión.', v: true, e: 'Indican lo que dejará de funcionar.', l: 1 },
    { c: 'Escribe «conciliar(origen, destino)»: recibe dos objetos { clave: total } y devuelve la lista ordenada de claves cuyos totales difieren o faltan en alguno.', f: 'conciliar', p: ['origen', 'destino'], t: [[[{ '2026-01': 100, '2026-02': 200 }, { '2026-01': 100, '2026-02': 199 }], ['2026-02']], [[{ a: 1, b: 2 }, { a: 1 }], ['b']], [[{ a: 1 }, { a: 1 }], []]], sol: '  const claves = new Set([...Object.keys(origen), ...Object.keys(destino)]);\n  return [...claves].filter(k => origen[k] !== destino[k]).sort();', l: 2 },
    { c: 'Escribe «perfilar(filas, campo)»: devuelve { total, nulos, distintos } para el campo (nulo = null, undefined o texto vacío).', f: 'perfilar', p: ['filas', 'campo'], t: [[[[{ placa: 'A' }, { placa: '' }, { placa: 'A' }, {}], 'placa'], { total: 4, nulos: 2, distintos: 1 }]], sol: '  const v = filas.map(f => f[campo]);\n  const nulos = v.filter(x => x === null || x === undefined || x === \'\').length;\n  const distintos = new Set(v.filter(x => !(x === null || x === undefined || x === \'\'))).size;\n  return { total: filas.length, nulos, distintos };', l: 2 },
    { c: 'Escribe «debeRevertir(totalViejo, totalNuevo, tolerancia)»: true si la diferencia relativa |nuevo − viejo| / viejo supera la tolerancia (en proporción).', f: 'debeRevertir', p: ['totalViejo', 'totalNuevo', 'tolerancia'], t: [[[100000, 100050, 0.001], false], [[100000, 100200, 0.001], true], [[5000, 5000, 0], false]], sol: '  return Math.abs(totalNuevo - totalViejo) / totalViejo > tolerancia;', l: 2 }
  ],
  gen: function (g) {
    var ti = [['Pasar de Node 18 a Node 22', 'Actualización de versión'], ['Cambiar de MySQL a PostgreSQL', 'Cambio de tecnología'], ['Mover la API de un servidor propio a la nube', 'Cambio de infraestructura'], ['Llevar 8 años de una planilla a la base nueva', 'Migración de datos'], ['Reemplazar un programa de escritorio por una aplicación web', 'Reemplazo de sistema']];
    ti.forEach(function (t) { g.mcq(1, '¿Qué tipo de migración es? ' + t[0], t[1], ['Actualización de versión', 'Cambio de tecnología', 'Cambio de infraestructura', 'Migración de datos', 'Reemplazo de sistema'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Tipos de migración.'); });
    var es = [['Un sistema pequeño que puede detenerse un domingo', 'Gran corte'], ['Varias sedes que pueden pasar una por semana', 'Migración por etapas'], ['Comparar montos calculados por ambos sistemas durante un mes', 'Ejecución en paralelo'], ['Migrar la base sin detener el servicio comparando lecturas', 'Escritura doble y lectura en sombra'], ['Copiar el grueso y replicar los cambios hasta un corte de minutos', 'Captura de cambios (CDC)']];
    es.forEach(function (e) { g.mcq(3, '¿Qué estrategia de corte describe? ' + e[0], e[1], ['Gran corte', 'Migración por etapas', 'Ejecución en paralelo', 'Escritura doble y lectura en sombra', 'Captura de cambios (CDC)'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Estrategias de corte.'); });
    g.times(4, function (R) { var t = R.int(100000, 200000), p = R.int(1, 30) / 10; g.input(2, 'De ' + t + ' filas de origen, el ' + p + ' % tiene placas con formato viejo. ¿Cuántas filas son? (redondea al entero)', Math.round(t * p / 100), 'Total por porcentaje.'); });
  },
  checks: [
    ['¿Por qué se migra y qué hay que definir antes de empezar?', 'Por fin de soporte, costo, capacidad, consolidación o productividad; el porqué y el criterio de éxito.'],
    ['¿Qué prácticas vuelven rutinarias las actualizaciones de versión?', 'Actualizar seguido, leer notas de versión, tener pruebas, usar codemods, atender advertencias de obsolescencia y desplegar gradualmente.'],
    ['Describe los pasos de una migración de datos.', 'Perfilar, mapear con reglas, hacerla repetible e idempotente, conciliar con conteos y sumas y planificar el corte.'],
    ['Compara las estrategias de corte y explica el riesgo del comportamiento implícito.', 'Gran corte concentra el riesgo; por etapas, en paralelo, lectura en sombra y CDC lo reparten; el comportamiento implícito son reglas no documentadas que se pierden si no se inventarían.']
  ],
  cites: ['Fowler, M. (2004). StranglerFigApplication. martinfowler.com.', 'Sato, D. (2014). ParallelChange. martinfowler.com.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O\'Reilly.', 'Stripe Engineering (2017). Online migrations at scale. stripe.com/blog.', 'Bisbal, J., Lawless, D., Wu, B. y Grimson, J. (1999). Legacy Information Systems: Issues and Directions. *IEEE Software*, 16(5).'],
  project: { t: 'Planificar y ensayar una migración',
    goal: 'Diseñar una migración real o simulada con perfilado, conciliación, estrategia de corte y reversión.',
    steps: ['Elige una migración (actualizar una dependencia mayor, o mover datos de una planilla a una base) y escribe el porqué y el criterio de éxito.', 'Haz el inventario del comportamiento actual y perfila los datos de origen.', 'Escribe el script de migración repetible e idempotente y la conciliación automática.', 'Ensaya al menos cinco veces sobre copias y registra los problemas encontrados.', 'Escribe el plan de corte, los criterios de reversión y la comunicación a los usuarios.'],
    deliver: 'El inventario, el perfil de datos, los scripts, el registro de ensayos y el plan de corte.' },
  hito: ['Planifica la actualización de Node de PatioApp a la siguiente LTS con pruebas, notas de versión y despliegue gradual.', 'Diseña la migración de datos de un patio cliente nuevo a PatioApp con perfilado, conciliación y ejecución en paralelo.']
});
SDC.after('man.migrate', 'man.legacy');


SDC.D('man.debt', `## La deuda en sistemas con aprendizaje automático
D. Sculley y otros investigadores de Google describieron en 2015 (*Hidden Technical Debt in Machine Learning Systems*) formas de deuda propias de los sistemas que usan modelos: el código del modelo es una parte pequeña rodeada de mucha infraestructura (recolección de datos, preparación, monitoreo), las dependencias de **datos** son más difíciles de rastrear que las de código, y los cambios en los datos de entrada degradan el modelo sin que ningún archivo cambie. La lección general vale para cualquier sistema: la deuda también se acumula en lo que no es código.`);
})();
