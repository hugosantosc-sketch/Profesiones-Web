(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m11', { prof: true });

D('m11.req', `## Requisitos y contratos
Cuando el software se desarrolla por contrato (una municipalidad que licita un sistema, una empresa que contrata a una consultora), el documento de requisitos se vuelve **parte del contrato**: lo que no está escrito no se puede exigir, y lo ambiguo termina en discusiones sobre si un cambio es "corrección" (gratis) o "nuevo requisito" (se paga). Por eso, en estos contextos:
- Se define una **línea base** de requisitos aprobada por ambas partes y un procedimiento formal para cambiarla.
- Cada requisito tiene un **criterio de aceptación** verificable, que luego se usa en las pruebas de aceptación.
- Se distinguen los requisitos **obligatorios** de los **deseables**, porque el precio depende de ello.
En el Perú, las contrataciones del Estado exigen términos de referencia con requisitos verificables; muchos proyectos públicos de software se retrasan justamente por términos de referencia vagos.

## Medir la calidad de los requisitos
No basta con "tener" requisitos: hay que saber si son buenos. Indicadores útiles:
- **Defectos encontrados en revisiones** de requisitos por página o por requisito. Encontrarlos ahí cuesta muy poco comparado con hallarlos en producción.
- **Volatilidad:** porcentaje de requisitos que cambian por mes. Una volatilidad alta y sostenida indica que el problema no se entendió o que el negocio aún está decidiendo.
- **Requisitos sin prueba asociada:** cada requisito sin al menos una prueba de aceptación es una promesa que nadie verificará.
- **Palabras ambiguas:** herramientas simples pueden buscar términos como "rápido", "fácil", "aproximadamente", "etc." o "según corresponda" y señalarlos para su revisión.`);

D('m11.stories', `## Refinar el backlog
Las historias no llegan listas: se **refinan** de forma continua. En una sesión de refinamiento (que la Guía de Scrum recomienda que no consuma más del 10 % de la capacidad del equipo, como orientación habitual) el dueño de producto presenta las historias próximas, el equipo pregunta, se escriben criterios, se parten las grandes y se estiman. Una historia está lista para planificarse cuando cumple la **definición de listo** del equipo: por ejemplo, tiene criterios de aceptación, cabe en un sprint, no depende de algo externo sin resolver y el equipo la entiende.

## Estimar historias
- Los **puntos de historia** miden tamaño relativo (esfuerzo, complejidad e incertidumbre juntos) y no horas. Se suelen usar valores de una serie parecida a la de Fibonacci (1, 2, 3, 5, 8, 13) porque la incertidumbre crece con el tamaño.
- El **planning poker** (James Grenning, 2002; difundido por Mike Cohn) pide que cada persona muestre su estimación a la vez, para evitar el anclaje en la primera opinión; las diferencias grandes se discuten, porque revelan supuestos distintos.
- Varios equipos prefieren **no estimar** en puntos y, en su lugar, partir todas las historias a un tamaño parecido y **contarlas**; con datos históricos, contar historias pronostica casi tan bien como sumar puntos.
- Nunca se comparan puntos entre equipos ni se usan para medir productividad individual: la ley de Goodhart los corrompería enseguida.

## Ejemplo resuelto: una historia de PatioApp de punta a punta
**Historia:** Como operador de patio, quiero registrar la salida de una unidad escaneando su placa, para no buscarla a mano en la lista.
**Criterios de aceptación** en formato Gherkin:
~~~txt
Escenario: salida de una unidad con estadía pagada
  Dado que la unidad ABC-123 está en el espacio B-14 con estadía pagada
  Cuando el operador escanea la placa ABC-123 y confirma la salida
  Entonces el espacio B-14 queda libre
  Y la unidad aparece en el historial con la hora de salida

Escenario: salida bloqueada por deuda
  Dado que la unidad XYZ-987 tiene una deuda de 120 soles
  Cuando el operador escanea la placa XYZ-987
  Entonces el sistema muestra la deuda y no permite confirmar la salida
~~~
La historia cumple INVEST: es independiente del módulo de facturación (la deuda ya existe), negociable (el escaneo podría ser por cámara o por lector), valiosa, estimable, pequeña (cabe en pocos días) y comprobable (los escenarios son pruebas automatizables).`);

D('m11.uml', `## Modelos y código
La relación entre los modelos y el código puede ir en varias direcciones:
- **Ingeniería directa:** generar código (esqueletos de clases, esquemas de base de datos) a partir de modelos.
- **Ingeniería inversa:** obtener diagramas a partir de código existente, útil para entender un sistema heredado.
- **Ida y vuelta:** mantener sincronizados modelo y código; en la práctica es difícil y pocos equipos lo sostienen.
La **ingeniería dirigida por modelos** (MDE) y la propuesta MDA del OMG (2001) llevan la idea al extremo: el modelo es el artefacto principal y el código se genera. Ha tenido éxito en dominios acotados, como el software de control automotriz y aeronáutico (Simulink, SCADE) o la generación de clientes a partir de especificaciones OpenAPI, y menos éxito como forma general de programar.

## Cuándo modelar y cuándo no
Un diagrama vale lo que ahorra en malentendidos. Conviene modelar cuando:
- Varias personas deben ponerse de acuerdo sobre algo que todavía no existe (un dominio nuevo, una integración entre equipos).
- El comportamiento es complejo y tiene muchos estados o casos (el ciclo de vida de una unidad en el patio, un proceso de aprobación).
- Hay que explicar el sistema a alguien que llega, y el código es demasiado grande para leerlo entero.
Conviene no hacerlo, o hacerlo en una pizarra y fotografiarlo, cuando el diagrama solo repetiría lo que el código ya dice con claridad. El criterio de Scott Ambler (*Agile Modeling*, 2002): modelar con un propósito, lo **suficiente** para ese propósito, y descartar o actualizar los modelos que ya no se usan.
Un buen hábito es guardar los diagramas que sí vale la pena mantener como **texto** junto al código (con herramientas como PlantUML o Mermaid), para que se revisen en el mismo flujo de cambios y no queden olvidados en una carpeta compartida.`);

S('m11', 'm11.elicit', { title: 'Elicitación, análisis y negociación de requisitos',
  ask: '¿Qué técnica o concepto de elicitación y análisis se aplica?',
  lesson: `
> **La idea en simple.** Los usuarios no tienen los requisitos guardados en un cajón esperando que alguien los recoja. Saben qué les molesta, qué hacen todos los días y qué les gustaría, pero muchas veces no lo saben explicar, no se ponen de acuerdo entre ellos o piden una solución en lugar de describir el problema. La elicitación es el trabajo de **descubrir** juntos qué se necesita, y el análisis, el de ordenarlo, resolver conflictos y decidir.

## Por qué "elicitar" y no "recolectar"
La palabra viene del latín *elicere*, "sacar afuera". Se usa en lugar de "recolectar" porque los requisitos se **construyen** en la conversación. Tres obstáculos clásicos:
- **Conocimiento tácito:** un operador experto sabe que las unidades con lunas polarizadas se inspeccionan aparte, pero no lo menciona porque para él es obvio.
- **Soluciones disfrazadas de requisitos:** "quiero un botón de Excel" esconde la necesidad real ("necesito enviar a gerencia el reporte semanal de ocupación").
- **La paradoja del usuario:** la gente describe lo que hace hoy; le cuesta imaginar una forma distinta de trabajar hasta verla.
Por eso se combinan varias técnicas: cada una descubre cosas que las demás no ven.

## Técnicas de elicitación
| Técnica | Sirve para | Riesgo |
| Entrevista | Conocer objetivos, problemas y vocabulario de una persona | Oír lo que la persona cree que hace, no lo que hace |
| Observación y etnografía | Ver el trabajo real, con sus atajos y excepciones | Toma tiempo y la gente cambia al ser observada |
| Taller con varios interesados | Lograr acuerdos y descubrir conflictos temprano | Que domine quien más habla o quien tiene más rango |
| Cuestionario | Llegar a muchas personas y cuantificar | Solo responde lo que se preguntó |
| Análisis de documentos y sistemas | Reglas de negocio, formularios, datos reales | Documentos desactualizados |
| Prototipo | Que el usuario reaccione ante algo concreto | Que confunda el prototipo con el producto terminado |

**Entrevistas.** Las abiertas exploran ("cuénteme cómo es un día normal en el patio"); las estructuradas siguen preguntas fijas para comparar respuestas. Buenas prácticas: preparar un guion, pedir **ejemplos concretos** ("¿cuándo fue la última vez que pasó?"), preguntar por las excepciones ("¿y qué pasa si la unidad llega sin documentos?"), cerrar con "¿qué no le pregunté que debería haberle preguntado?" y resumir lo entendido para que la persona lo corrija.

**Observación.** Hugh Beyer y Karen Holtzblatt propusieron en 1998 la **indagación contextual** (*contextual inquiry*): el analista acompaña al usuario en su lugar de trabajo con una relación de aprendiz y maestro; el usuario trabaja y explica, el analista observa y pregunta. Así aparecen las notas pegadas en el monitor, las hojas de cálculo paralelas y los "trucos" que ningún documento recoge, y que suelen ser requisitos importantes.

**Talleres.** El JAD (*Joint Application Development*), creado en IBM a fines de los setenta, reúne durante uno o varios días a usuarios, expertos del negocio y desarrolladores con un facilitador neutral y un escriba. Variantes modernas: el *Event Storming* de Alberto Brandolini, en el que se pegan en una pared los eventos del dominio en orden cronológico, y los talleres de mapa de historias.

**Prototipos.** Pueden ser de **papel** o de baja fidelidad (rápidos, invitan a criticar), de alta fidelidad (parecen el producto) o **desechables** frente a **evolutivos** (se convierten en el producto). Un prototipo responde preguntas: si no sabes qué pregunta responde, probablemente no hace falta.

## Errores frecuentes al elicitar
- **Preguntar solo a los jefes.** Quien aprueba el presupuesto rara vez es quien usa el sistema todos los días; sus respuestas describen cómo debería funcionar el trabajo, no cómo funciona.
- **Aceptar la primera respuesta.** La primera respuesta suele ser la versión "oficial"; la real aparece con ejemplos concretos y preguntas por las excepciones.
- **Grabar sin validar.** Lo que el analista entendió puede no ser lo que se quiso decir. Resumir y pedir confirmación al final de cada sesión evita meses de trabajo en la dirección equivocada.
- **Elicitar una sola vez.** Los requisitos cambian y se entienden mejor con el tiempo; la elicitación continúa durante todo el proyecto, sobre todo en equipos ágiles.

## Interesados y sus intereses
Antes de elicitar hay que saber **a quién** preguntar. Un mapa de interesados lista a todos los afectados: usuarios directos (operadores), indirectos (dueños de las unidades que reciben notificaciones), clientes que pagan (la empresa de patios), reguladores (la SUNAT, que exige comprobantes electrónicos), operadores del sistema (soporte) y hasta los "negativos" (quienes perderían algo con el sistema, como quien hoy controla la hoja de cálculo). La **matriz de poder e interés** los clasifica: a los de alto poder y alto interés se los gestiona de cerca; a los de bajo poder y alto interés se los mantiene informados.

## Análisis: de lo dicho a lo necesario
Lo elicitado es materia prima desordenada. El análisis:
- **Clasifica** (funcional, de calidad, restricción, regla de negocio, dato).
- **Detecta conflictos:** gerencia quiere registrar 15 datos por cada ingreso para tener reportes; los operadores quieren registrar 2 para no formar colas en la puerta.
- **Busca la necesidad detrás de la solución** con la pregunta "¿para qué?" repetida (una versión de los "cinco porqués").
- **Modela** el problema (diagramas de contexto, de procesos, de dominio) para encontrar huecos e inconsistencias.

## Modelado de objetivos
Axel van Lamsweerde desarrolló el método **KAOS** y Eric Yu el marco **i\*** (1995) para modelar **objetivos** en lugar de funciones: se parte de metas de alto nivel ("las unidades no salen sin pagar") y se descomponen en submetas hasta llegar a requisitos asignables a una persona o al software ("el sistema bloquea la salida de unidades con deuda"). Este enfoque explica **por qué** existe cada requisito y permite evaluar alternativas: la misma meta se puede lograr con una barrera automática o con un control manual.

## Negociación y priorización
Cuando los intereses chocan, no se trata de que gane quien grita más. Barry Boehm propuso el modelo **WinWin** (1994): identificar las condiciones de ganancia de cada interesado, encontrar los conflictos y buscar opciones que satisfagan a todos. Para priorizar se usan técnicas como:
- **MoSCoW** (Dai Clegg, 1994): *Must*, *Should*, *Could*, *Won't this time*.
- **Valor contra costo:** cada requisito se califica por valor y por costo, y se empieza por los de mayor cociente (Karl Wiegers propone una variante que también considera la penalidad de no hacerlo y el riesgo).
- **AHP** (proceso analítico jerárquico, Thomas Saaty, 1980): comparaciones por pares que producen pesos consistentes.
- **Kano**, que viste en la unidad anterior, para distinguir lo básico de lo que entusiasma.
~~~js
// Priorizar por valor sobre costo (estilo Wiegers simplificado)
const reqs = [
  { id: 'Salida con escaneo de placa', valor: 9, costo: 3 },
  { id: 'Reporte semanal a gerencia', valor: 6, costo: 2 },
  { id: 'Notificar al dueño por WhatsApp', valor: 5, costo: 5 },
  { id: 'Tema oscuro', valor: 2, costo: 1 }
];
reqs.map(r => ({ ...r, prioridad: (r.valor / r.costo).toFixed(2) }))
    .sort((a, b) => b.prioridad - a.prioridad)
    .forEach(r => console.log(r.prioridad, r.id));
~~~

## Ejemplo resuelto: elicitar el proceso de ingreso de PatioApp
1. **Mapa de interesados:** operadores de puerta, supervisores, gerencia, dueños de unidades, aseguradora, contador (comprobantes) y soporte.
2. **Observación:** dos mañanas en la puerta del patio. Se descubre que los operadores anotan en un cuaderno las unidades que llegan con daños **antes** de registrarlas, porque el sistema actual no tiene campo para eso; y que en hora punta hacen cola hasta 12 unidades.
3. **Entrevistas** con gerencia: quieren saber la ocupación por zona al día y el tiempo promedio de permanencia.
4. **Conflicto:** gerencia quiere 15 campos al ingreso; los operadores, rapidez. **Negociación:** al ingreso solo placa, foto y daños visibles (con la cámara del celular); el resto de los campos los completa el supervisor después, fuera de la puerta.
5. **Prototipo de papel** del ingreso con tres pantallas, probado con dos operadores: se elimina una pantalla que nadie entendía.
6. Resultado: un conjunto de historias priorizadas con MoSCoW y una regla de negocio nueva ("toda unidad con daños visibles requiere foto al ingreso") que no habría aparecido solo con entrevistas.`,
  links: [['m11.req', 'la elicitación es la primera actividad de la ingeniería de requisitos'], ['m11.stories', 'lo elicitado se expresa como historias con criterios'], ['hci.ucd', 'la indagación contextual es también una técnica de diseño centrado en el usuario']],
  read: 'Wiegers y Beatty, *Software Requirements* (3.ª ed.), capítulos 5 a 8; Beyer y Holtzblatt, *Contextual Design*; van Lamsweerde, *Requirements Engineering* (2009).',
  terms: [
    ['Elicitación', 'proceso de descubrir junto con los interesados qué necesita el sistema, combinando varias técnicas', ['Entrevistar a los operadores del patio.', 'Observar la puerta en hora punta.', 'Hacer un taller con gerencia.']],
    ['Conocimiento tácito', 'saber que una persona usa sin expresarlo porque le parece obvio', ['Inspeccionar aparte las unidades polarizadas.', 'Aparece al observar, no al preguntar.', 'Es una fuente de requisitos olvidados.']],
    ['Indagación contextual', 'técnica en la que el analista observa y pregunta mientras el usuario trabaja en su lugar real', ['Beyer y Holtzblatt, 1998.', 'Relación de aprendiz y maestro.', 'Revela atajos y hojas paralelas.']],
    ['Taller JAD', 'sesión facilitada que reúne a usuarios, negocio y desarrolladores para definir requisitos juntos', ['Creado en IBM.', 'Tiene un facilitador neutral.', 'Descubre conflictos temprano.']],
    ['Prototipo desechable', 'versión rápida del sistema que se usa para aprender y luego se descarta', ['Un prototipo de papel del ingreso.', 'Responde una pregunta concreta.', 'No debe convertirse en el producto.']],
    ['Matriz de poder e interés', 'clasificación de interesados según su capacidad de influir y su interés en el sistema', ['Gerencia: alto poder y alto interés.', 'Dueños de unidades: bajo poder y alto interés.', 'Indica cómo gestionar a cada grupo.']],
    ['Modelado de objetivos', 'técnica que descompone metas de alto nivel en submetas hasta llegar a requisitos asignables', ['KAOS de van Lamsweerde.', 'i* de Eric Yu.', 'Explica por qué existe cada requisito.']],
    ['MoSCoW', 'priorización en debe tener, debería tener, podría tener y no tendrá esta vez', ['Dai Clegg, 1994.', 'Se usa en DSDM.', 'Hace explícito lo que queda fuera.']]
  ],
  q: [
    ['Un usuario pide "un botón para exportar a Excel". ¿Qué debe hacer el analista?', 'Preguntar para qué lo necesita y descubrir la necesidad real', ['Agregar el botón tal cual', 'Rechazar el pedido', 'Pedir que lo escriba en un formulario'], 'Muchas solicitudes son soluciones disfrazadas.', 2],
    ['¿Qué técnica revela mejor los atajos y excepciones del trabajo real?', 'La observación o indagación contextual', ['El cuestionario', 'El análisis de documentos', 'La priorización MoSCoW'], 'Lo tácito aparece al ver trabajar.', 2],
    ['¿Cuál es el principal riesgo de un prototipo de alta fidelidad?', 'Que el cliente lo confunda con el producto casi terminado', ['Que sea demasiado barato', 'Que nadie lo critique por ser de papel', 'Que no tenga colores'], 'Hay que aclarar que es un prototipo.', 3],
    ['En un taller, ¿para qué sirve un facilitador neutral?', 'Para que no domine quien más habla o quien tiene más rango', ['Para escribir el código', 'Para aprobar el presupuesto', 'Para reemplazar a los usuarios'], 'El facilitador equilibra la participación.', 2],
    ['¿Qué aporta el modelado de objetivos frente a una lista de funciones?', 'Explica por qué existe cada requisito y permite comparar alternativas para lograr una meta', ['Genera el código automáticamente', 'Elimina la necesidad de interesados', 'Reemplaza las pruebas'], 'KAOS e i*.', 3],
    ['Gerencia quiere 15 campos al ingreso y los operadores quieren 2. ¿Qué enfoque es el adecuado?', 'Negociar buscando una opción que satisfaga ambos intereses', ['Dar la razón a gerencia porque paga', 'Dar la razón a los operadores porque usan el sistema', 'No implementar el ingreso'], 'Modelo WinWin de Boehm.', 3],
    ['En la matriz de poder e interés, ¿cómo se gestiona a un interesado con bajo poder y alto interés?', 'Manteniéndolo informado', ['Ignorándolo', 'Gestionándolo de cerca como prioridad máxima', 'Pidiéndole que apruebe el presupuesto'], 'Gestionar de cerca es para alto poder y alto interés.', 3],
    { tf: 'Un cuestionario es la mejor técnica para descubrir requisitos que nadie había pensado.', v: false, e: 'Solo responde lo que se preguntó; para lo desconocido sirven observación, talleres y prototipos.', l: 2 },
    { tf: 'Es recomendable combinar varias técnicas de elicitación porque cada una descubre cosas distintas.', v: true, e: 'Ninguna técnica sola basta.', l: 1 },
    { o: 'Ordena los pasos de una buena elicitación.', s: ['Identificar a los interesados', 'Elegir técnicas para cada grupo', 'Elicitar (entrevistas, observación, talleres)', 'Analizar y resolver conflictos', 'Validar lo entendido con los interesados'], e: 'Primero a quién, luego cómo, después analizar y validar.', l: 3 },
    { c: 'Escribe «priorizar(reqs)»: reqs es una lista de {id, valor, costo}; devuelve los id ordenados de mayor a menor valor/costo (si empatan, conserva el orden original).', f: 'priorizar', p: ['reqs'], t: [[[[{ id: 'a', valor: 2, costo: 2 }, { id: 'b', valor: 9, costo: 3 }, { id: 'c', valor: 6, costo: 2 }]], ['b', 'c', 'a']], [[[]], []], [[[{ id: 'x', valor: 4, costo: 2 }, { id: 'y', valor: 2, costo: 1 }]], ['x', 'y']]], sol: '  return reqs.map((r, i) => [r.valor / r.costo, i, r.id]).sort((a, b) => b[0] - a[0] || a[1] - b[1]).map(x => x[2]);', l: 3 },
    { c: 'Escribe «ambiguas(texto)»: devuelve cuántas veces aparecen en el texto (sin distinguir mayúsculas) las palabras rápido, fácil, aproximadamente y etc.', f: 'ambiguas', p: ['texto'], t: [[['El sistema será rápido y fácil.'], 2], [['Responde en 2 segundos.'], 0], [['Rápido, rápido, etc.'], 3]], sol: '  const m = texto.toLowerCase().match(/\\b(rápido|fácil|aproximadamente|etc)\\b/g);\n  return m ? m.length : 0;', l: 4 }
  ],
  gen: function (g) {
    var tec = [['Acompañar al operador durante su turno y preguntarle mientras trabaja', 'Indagación contextual'], ['Reunir durante un día a usuarios, negocio y desarrolladores con un facilitador', 'Taller JAD'], ['Enviar preguntas cerradas a 300 conductores', 'Cuestionario'], ['Revisar los formularios en papel y los reportes actuales', 'Análisis de documentos'], ['Dibujar tres pantallas en papel y pedir al usuario que las use', 'Prototipo de papel'], ['Pegar en una pared los eventos del dominio en orden', 'Event Storming'], ['Conversar una hora con la gerente siguiendo un guion', 'Entrevista']];
    tec.forEach(function (t) { g.mcq(2, '¿Qué técnica de elicitación es esta? ' + t[0], t[1], ['Indagación contextual', 'Taller JAD', 'Cuestionario', 'Análisis de documentos', 'Prototipo de papel', 'Event Storming', 'Entrevista'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Cada técnica tiene su fortaleza.'); });
    var mos = [['El sistema no puede salir a producción sin esto', 'Must'], ['Es importante, pero hay una forma provisional de resolverlo', 'Should'], ['Sería bueno si queda tiempo', 'Could'], ['Se acordó dejarlo fuera de esta versión', "Won't"]];
    mos.forEach(function (m) { g.mcq(1, 'En MoSCoW, ¿qué categoría corresponde? ' + m[0], m[1], ['Must', 'Should', 'Could', "Won't"].filter(function (x) { return x !== m[1]; }), 'MoSCoW de Dai Clegg.'); });
    g.times(6, function (R) { var v = R.int(2, 10), c = R.int(1, 5); g.input(3, 'Un requisito tiene valor ' + v + ' y costo ' + c + '. ¿Cuál es su prioridad valor/costo? (redondea a 2 decimales)', (v / c).toFixed(2), 'Se divide el valor entre el costo.'); });
  },
  checks: [
    ['¿Por qué se habla de elicitar requisitos y no de recolectarlos?', 'Porque los requisitos no están listos en la cabeza de los usuarios: se descubren y construyen en conjunto, superando lo tácito y las soluciones disfrazadas.'],
    ['Elige dos técnicas de elicitación para un sistema de tu entorno y justifica.', 'Por ejemplo, observación para ver el trabajo real y un taller para acordar prioridades entre áreas.'],
    ['¿Cómo se resuelve un conflicto entre interesados?', 'Identificando los intereses reales de cada uno y buscando opciones que los satisfagan (WinWin), con criterios explícitos de prioridad.'],
    ['¿Qué es el modelado de objetivos y qué aporta?', 'Descomponer metas en submetas hasta requisitos asignables; explica el porqué de cada requisito y permite comparar alternativas.']
  ],
  cites: ['Beyer, H. y Holtzblatt, K. (1998). *Contextual Design: Defining Customer-Centered Systems*. Morgan Kaufmann.', 'van Lamsweerde, A. (2009). *Requirements Engineering: From System Goals to UML Models to Software Specifications*. Wiley.', 'Yu, E. (1997). Towards Modelling and Reasoning Support for Early-Phase Requirements Engineering. *RE 1997*.', 'Boehm, B. et al. (1994). Software Requirements Negotiation and Renegotiation Aids: A Theory-W Based Spiral Approach. *ICSE 1994*.', 'Wiegers, K. y Beatty, J. (2013). *Software Requirements* (3.ª ed.). Microsoft Press.', 'Saaty, T. (1980). *The Analytic Hierarchy Process*. McGraw-Hill.'],
  project: { t: 'Elicitación en un negocio real',
    goal: 'Descubrir los requisitos de un proceso de un negocio cercano combinando técnicas.',
    steps: ['Elige un negocio o área cercana (una bodega, un taller, un almacén) y haz su mapa de interesados con la matriz de poder e interés.', 'Observa el proceso principal durante al menos una hora y anota atajos, excepciones y documentos usados.', 'Entrevista a dos personas con un guion preparado y resume lo entendido para que lo corrijan.', 'Identifica al menos un conflicto entre interesados y propón una solución negociada.', 'Prioriza los requisitos con MoSCoW y con valor/costo, y compara ambos resultados.'],
    deliver: 'El mapa de interesados, las notas de observación y entrevistas, la lista priorizada y el análisis del conflicto.' },
  hito: ['Elabora el mapa de interesados de PatioApp con la matriz de poder e interés y una técnica de elicitación para cada grupo.', 'Documenta en PatioApp el conflicto de los campos de ingreso y la solución negociada, y prioriza las historias del ingreso con MoSCoW.']
});
SDC.after('m11.elicit', 'm11.req');

S('m11', 'm11.nfr', { title: 'Requisitos no funcionales y atributos de calidad',
  ask: '¿Qué tipo de requisito de calidad o concepto se aplica?',
  lesson: `
> **La idea en simple.** Dos apps de banco pueden hacer exactamente lo mismo (ver saldo, transferir, pagar servicios) y sin embargo una es un placer y la otra un tormento: una responde al instante, nunca se cae y protege tus datos; la otra tarda, falla los fines de mes y te obliga a iniciar sesión cada dos minutos. La diferencia no está en **qué** hacen, sino en **cómo de bien** lo hacen. Eso son los requisitos no funcionales.

## Funcionales y no funcionales
Los requisitos **funcionales** dicen qué hace el sistema ("registrar la salida de una unidad"). Los **no funcionales** o **de calidad** dicen con qué propiedades lo hace: rapidez, disponibilidad, seguridad, facilidad de uso, facilidad de cambio. A ellos se suman las **restricciones**: decisiones impuestas desde fuera (usar la nube que ya contrató la empresa, emitir comprobantes electrónicos según la SUNAT, cumplir la Ley de Protección de Datos Personales).

Martin Glinz advirtió en 2007 que la frontera es borrosa: "el sistema debe cifrar las contraseñas" parece no funcional, pero se implementa como una función. Lo práctico no es pelear por la etiqueta, sino asegurarse de que **cada preocupación de calidad esté escrita de forma medible**.

## Por qué importan tanto
Los requisitos de calidad suelen ser los que deciden la **arquitectura**: atender 10 usuarios o 10 millones, tolerar o no la caída de un centro de datos, responder en 100 ms o en 5 segundos, son decisiones que después son carísimas de cambiar. Y son los que más se olvidan, porque los usuarios los dan por supuestos ("obvio que tiene que ser rápido"). Muchos fracasos famosos fueron funcionalmente correctos: el portal de seguros de salud de Estados Unidos HealthCare.gov (2013) hacía lo que debía, pero colapsó con la carga del primer día; apenas unas pocas personas lograron inscribirse ese día.

## El modelo de calidad ISO/IEC 25010
La norma ISO/IEC 25010 (2011, revisada en 2023) define un vocabulario común de características de calidad del producto. En su versión de 2011, que es la más difundida, son ocho:
| Característica | Pregunta | Ejemplo de subcaracterísticas |
| Adecuación funcional | ¿Hace lo que se necesita, correctamente? | completitud, corrección |
| Eficiencia de desempeño | ¿Cuántos recursos y tiempo usa? | tiempo de respuesta, capacidad |
| Compatibilidad | ¿Convive e interopera con otros sistemas? | interoperabilidad |
| Usabilidad | ¿Es fácil de aprender y usar? | aprendizaje, accesibilidad, protección contra errores |
| Fiabilidad | ¿Funciona sin fallar y se recupera? | disponibilidad, tolerancia a fallas |
| Seguridad | ¿Protege la información? | confidencialidad, integridad, no repudio |
| Mantenibilidad | ¿Es fácil de cambiar? | modularidad, capacidad de prueba |
| Portabilidad | ¿Se puede llevar a otro entorno? | instalabilidad, adaptabilidad |
La revisión de 2023 agrega la **seguridad física** (*safety*: no causar daño a personas) y renombra algunas características (por ejemplo, usabilidad pasa a llamarse "capacidad de interacción"). El modelo sirve como **lista de verificación**: al elicitar, se recorre cada característica y se pregunta si hay algo que exigir.

## Hacerlos medibles
"El sistema debe ser rápido" no se puede verificar. Un requisito de calidad útil tiene una **métrica**, un **valor objetivo** y las **condiciones** en que se mide. Tom Gilb propuso el lenguaje **Planguage** para escribirlos:
~~~txt
Requisito: Tiempo de registro de salida
Escala:    segundos desde que se escanea la placa hasta ver la confirmación
Medición:  percentil 95 medido en producción durante la hora punta (7:00-9:00)
Mínimo:    5 segundos
Meta:      2 segundos
Pasado:    hoy, con el cuaderno, unos 40 segundos
~~~
Formas habituales de hacer medible cada tipo:
- **Rendimiento:** percentiles de latencia (p95, p99) con una carga definida, no promedios.
- **Disponibilidad:** porcentaje de tiempo en servicio en un período. 99 % permite unas 7,3 horas de caída al mes; 99,9 %, unos 43 minutos; 99,99 %, unos 4 minutos.
- **Usabilidad:** porcentaje de usuarios nuevos que completan una tarea sin ayuda, o tiempo para completarla tras una capacitación de 15 minutos.
- **Mantenibilidad:** tiempo para que un desarrollador nuevo haga un cambio típico, o porcentaje de cobertura de pruebas en los módulos críticos.
- **Seguridad:** ninguna vulnerabilidad crítica abierta más de 7 días; todas las contraseñas guardadas con una función de derivación lenta como Argon2 o bcrypt.
~~~js
// Disponibilidad: minutos de caída permitidos en un mes de 30 días
function caidaPermitida(porcentaje) {
  return +(30 * 24 * 60 * (1 - porcentaje / 100)).toFixed(1);
}
for (const p of [99, 99.5, 99.9, 99.99]) console.log(p + '% →', caidaPermitida(p), 'minutos al mes');
~~~

## Escenarios de calidad
Len Bass, Paul Clements y Rick Kazman (*Software Architecture in Practice*) proponen expresar cada requisito de calidad como un **escenario** con seis partes: **fuente** del estímulo, **estímulo**, **artefacto** afectado, **entorno**, **respuesta** y **medida de la respuesta**. Ejemplo: "Durante la hora punta (entorno), 300 operadores (fuente) registran salidas a la vez (estímulo) en el servicio de patios (artefacto); el sistema las procesa (respuesta) con un p95 menor a 2 segundos (medida)". El formato obliga a precisar lo que una frase suelta deja abierto, y conecta directamente con las decisiones de arquitectura que verás en el curso de Arquitectura.

## Requisitos de calidad en métodos ágiles
En equipos ágiles, los requisitos de calidad no caben bien en una historia de usuario ("como usuario, quiero que sea rápido" no es una historia útil). Se manejan de tres formas complementarias:
- Como parte de la **definición de terminado** del equipo, cuando aplican a todo: "toda pantalla nueva cumple las pautas WCAG 2.1 nivel AA" o "todo cambio pasa el análisis de seguridad automatizado".
- Como **criterios de aceptación** de historias concretas, cuando aplican a una funcionalidad: "la búsqueda por placa responde en menos de 1 segundo con 50 000 unidades registradas".
- Como **historias técnicas** o elementos del backlog con su propio valor, cuando hay que construir algo para lograrlos: "configurar réplicas de la base de datos en otra zona".
Además, conviene **automatizar su verificación**: pruebas de carga en la integración continua, análisis estático de seguridad y medición de accesibilidad hacen que la calidad no dependa de la memoria de nadie.

## Compromisos entre cualidades
Las cualidades compiten entre sí: más seguridad suele costar usabilidad (otro factor de autenticación); más disponibilidad cuesta dinero (réplicas en otra zona); más rendimiento puede costar mantenibilidad (código optimizado más difícil de leer). Por eso hay que **priorizarlas**: no todas pueden ser máximas. Una técnica simple es pedir a los interesados que repartan 100 puntos entre las cualidades; otra es el **árbol de utilidad** del método ATAM, que ordena escenarios por importancia para el negocio y dificultad técnica.

## Requisitos legales y regulatorios
Son restricciones no negociables. En el Perú, para un sistema como PatioApp:
- La **Ley N.º 29733 de Protección de Datos Personales** y su reglamento (actualizado en 2024) exigen informar a las personas para qué se usan sus datos, obtener su consentimiento cuando corresponde y aplicar medidas de seguridad.
- La **SUNAT** exige que los comprobantes se emitan electrónicamente con un formato definido.
- Si hubiera pagos con tarjeta, el estándar **PCI DSS** de la industria de tarjetas.
Estos requisitos deben trazarse hasta su fuente legal, porque cuando la ley cambia, hay que saber qué partes del sistema revisar.

## Ejemplo resuelto: requisitos de calidad de PatioApp
1. **Rendimiento:** registro de salida con p95 menor a 2 segundos con 300 operadores concurrentes.
2. **Disponibilidad:** 99,5 % mensual en horario de operación (6:00 a 22:00); el ingreso y la salida deben seguir funcionando sin conexión hasta 4 horas y sincronizar al volver.
3. **Usabilidad:** un operador nuevo registra un ingreso completo sin ayuda tras 10 minutos de capacitación (medido con 5 operadores).
4. **Seguridad:** acceso por roles; las fotos de las unidades solo las ven el operador, el supervisor y el dueño; registro de auditoría de toda modificación de tarifas.
5. **Mantenibilidad:** cambiar una tarifa o agregar un tipo de vehículo no requiere desplegar código.
6. **Legal:** consentimiento informado para guardar el teléfono del dueño y enviarle notificaciones (Ley 29733).
La prioridad acordada con gerencia: disponibilidad sin conexión y rendimiento en la puerta primero, porque una cola de camiones cuesta dinero cada minuto.`,
  links: [['m11.req', 'los requisitos no funcionales son uno de los tipos de requisito'], ['m13.quality', 'los atributos de calidad guían las decisiones de arquitectura'], ['m17.ethics', 'las leyes de protección de datos imponen restricciones']],
  read: 'ISO/IEC 25010; Bass, Clements y Kazman, *Software Architecture in Practice* (4.ª ed.), capítulo 3; Gilb, *Competitive Engineering* (2005); Glinz (2007).',
  terms: [
    ['Requisito no funcional', 'requisito que describe una propiedad de calidad del sistema, como rapidez, disponibilidad o seguridad', ['p95 menor a 2 segundos.', 'Disponibilidad del 99,5 %.', 'Suele decidir la arquitectura.']],
    ['Restricción', 'decisión impuesta desde fuera que limita las opciones de diseño', ['Usar la nube ya contratada.', 'Emitir comprobantes según la SUNAT.', 'No es negociable por el equipo.']],
    ['ISO/IEC 25010', 'norma que define un modelo de características de calidad del producto de software', ['Fiabilidad, seguridad, usabilidad…', 'Revisada en 2023.', 'Sirve como lista de verificación.']],
    ['Planguage', 'notación de Tom Gilb para escribir requisitos de calidad con escala, medición y niveles objetivo', ['Escala, Medición, Mínimo, Meta.', 'Evita el "debe ser rápido".', 'Incluye el valor pasado para comparar.']],
    ['Escenario de calidad', 'descripción de un requisito de calidad con fuente, estímulo, artefacto, entorno, respuesta y medida', ['Bass, Clements y Kazman.', '300 operadores en hora punta.', 'Conecta requisitos y arquitectura.']],
    ['Disponibilidad', 'proporción del tiempo en que el sistema está en servicio', ['99,9 % son unos 43 minutos de caída al mes.', 'Se define con su período y horario.', 'Cuesta réplicas y dinero.']],
    ['Percentil 95', 'valor bajo el cual queda el 95 % de las mediciones', ['Mejor que el promedio para latencias.', 'Describe a los usuarios menos afortunados.', 'Se mide con una carga definida.']],
    ['Ley 29733', 'ley peruana de protección de datos personales', ['Exige consentimiento informado.', 'Exige medidas de seguridad.', 'Su reglamento se actualizó en 2024.']]
  ],
  q: [
    ['¿Cuál es un requisito no funcional bien escrito?', 'El 95 % de los registros de salida se confirma en menos de 2 segundos con 300 operadores concurrentes', ['El sistema debe ser rápido', 'El sistema debe registrar salidas', 'El sistema debe ser moderno'], 'Tiene métrica, valor y condiciones.', 2],
    ['¿Por qué los requisitos de calidad influyen tanto en la arquitectura?', 'Porque decidir escala, tolerancia a fallas o latencia condiciona la estructura y es caro de cambiar después', ['Porque son los más fáciles', 'Porque los escribe el arquitecto', 'No influyen'], 'Ejemplo: HealthCare.gov en 2013.', 3],
    ['¿Cuántos minutos de caída al mes permite aproximadamente una disponibilidad del 99,9 %?', '43', ['4', '7', '432'], '30 × 24 × 60 × 0,001 ≈ 43,2.', 3],
    ['¿Qué es una restricción?', 'Una decisión impuesta desde fuera que limita las opciones de diseño', ['Un requisito opcional', 'Un error del sistema', 'Una prueba unitaria'], 'Ejemplo: comprobantes electrónicos de la SUNAT.', 2],
    ['¿Qué parte de un escenario de calidad es "300 operadores registran salidas a la vez"?', 'La fuente y el estímulo', ['La medida de la respuesta', 'El artefacto', 'El entorno'], 'Fuente: operadores; estímulo: registros concurrentes.', 3],
    ['¿Por qué se usan percentiles en vez de promedios para latencias?', 'Porque el promedio oculta a los usuarios que sufren las peores demoras', ['Porque son más pequeños', 'Porque los exige la ley', 'Porque el promedio no existe'], 'p95 y p99.', 2],
    ['Agregar un segundo factor de autenticación mejora la seguridad pero puede empeorar…', 'La usabilidad', ['La portabilidad', 'La compatibilidad', 'Nada'], 'Las cualidades compiten.', 2],
    { tf: 'La frontera entre requisitos funcionales y no funcionales siempre es clara.', v: false, e: 'Glinz (2007) mostró que es borrosa; lo importante es que sean medibles.', l: 3 },
    { tf: 'Un requisito legal, como cumplir la Ley 29733, debe trazarse hasta su fuente para revisarlo si la ley cambia.', v: true, e: 'La trazabilidad permite saber qué revisar.', l: 2 },
    { c: 'Escribe «caidaPermitida(porcentaje)»: minutos de caída permitidos en un mes de 30 días para una disponibilidad dada, redondeados a 1 decimal.', f: 'caidaPermitida', p: ['porcentaje'], t: [[[99], 432], [[99.9], 43.2], [[100], 0]], sol: '  return Math.round(30 * 24 * 60 * (1 - porcentaje / 100) * 10) / 10;', l: 2 },
    { c: 'Escribe «percentil95(valores)»: devuelve el valor en la posición ⌈0,95 · n⌉ − 1 de los valores ordenados de menor a mayor.', f: 'percentil95', p: ['valores'], t: [[[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 100]], 19], [[[5]], 5], [[[3, 1, 2]], 3]], sol: '  const o = [...valores].sort((a, b) => a - b);\n  return o[Math.ceil(0.95 * o.length) - 1];', l: 3 },
    ['Gerencia exige 99,99 % de disponibilidad para un sistema interno de reportes. ¿Qué debería hacer el analista?', 'Mostrar el costo de esa disponibilidad y negociar un valor acorde con el impacto real de una caída', ['Aceptarlo sin más', 'Prometer 100 %', 'Ignorar el requisito'], 'Cada nueve adicional cuesta mucho más.', 4]
  ],
  gen: function (g) {
    var car = [['El sistema responde en menos de 2 segundos', 'Eficiencia de desempeño'], ['El sistema intercambia datos con el sistema de la SUNAT', 'Compatibilidad'], ['Un usuario nuevo completa una tarea sin ayuda', 'Usabilidad'], ['El sistema sigue funcionando si cae un servidor', 'Fiabilidad'], ['Solo los supervisores ven las tarifas especiales', 'Seguridad'], ['Agregar un tipo de vehículo toma menos de un día', 'Mantenibilidad'], ['El sistema se instala en otra nube sin cambiar código', 'Portabilidad'], ['El sistema calcula correctamente la tarifa', 'Adecuación funcional']];
    car.forEach(function (c) { g.mcq(2, '¿Qué característica de ISO/IEC 25010 expresa este requisito? ' + c[0], c[1], ['Eficiencia de desempeño', 'Compatibilidad', 'Usabilidad', 'Fiabilidad', 'Seguridad', 'Mantenibilidad', 'Portabilidad', 'Adecuación funcional'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Modelo de calidad ISO/IEC 25010.'); });
    g.times(6, function (R) { var p = R.pick([95, 98, 99, 99.5, 99.9]); g.input(3, '¿Cuántos minutos de caída al mes (30 días) permite una disponibilidad del ' + p + ' %? (redondea a 1 decimal)', String(Math.round(30 * 24 * 60 * (1 - p / 100) * 10) / 10), '30 × 24 × 60 × (1 − p/100).'); });
    var tipo = [['El sistema registra la salida de una unidad', 'Funcional'], ['El registro de salida tarda menos de 2 segundos', 'No funcional'], ['El sistema debe desplegarse en la nube que ya contrató la empresa', 'Restricción'], ['El sistema permite consultar la deuda de una unidad', 'Funcional'], ['El sistema está disponible el 99,5 % del horario de operación', 'No funcional'], ['Los comprobantes deben seguir el formato de la SUNAT', 'Restricción']];
    tipo.forEach(function (t) { g.mcq(1, '¿Qué tipo de requisito es? ' + t[0], t[1], ['Funcional', 'No funcional', 'Restricción'].filter(function (x) { return x !== t[1]; }).concat(['Regla de estilo']), 'Funcional: qué hace; no funcional: cómo de bien; restricción: impuesta desde fuera.'); });
  },
  checks: [
    ['Diferencia requisito funcional, no funcional y restricción con un ejemplo de cada uno.', 'Funcional: registrar salidas; no funcional: hacerlo en menos de 2 segundos; restricción: emitir comprobantes según la SUNAT.'],
    ['Reescribe "el sistema debe ser seguro y rápido" en dos requisitos medibles.', 'Por ejemplo: p95 de búsqueda menor a 1 s con 200 usuarios; ninguna vulnerabilidad crítica abierta más de 7 días.'],
    ['Describe las seis partes de un escenario de calidad.', 'Fuente, estímulo, artefacto, entorno, respuesta y medida de la respuesta.'],
    ['¿Por qué hay que priorizar las cualidades?', 'Porque compiten entre sí (seguridad contra usabilidad, disponibilidad contra costo) y no todas pueden ser máximas.']
  ],
  cites: ['ISO/IEC 25010:2011. *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models*.', 'Glinz, M. (2007). On Non-Functional Requirements. *RE 2007*.', 'Bass, L., Clements, P. y Kazman, R. (2021). *Software Architecture in Practice* (4.ª ed.). Addison-Wesley.', 'Gilb, T. (2005). *Competitive Engineering*. Butterworth-Heinemann.', 'Congreso de la República del Perú (2011). Ley N.º 29733, Ley de Protección de Datos Personales.'],
  project: { t: 'Especificación de calidad',
    goal: 'Escribir y priorizar los requisitos de calidad de un sistema real.',
    steps: ['Elige una app que uses a diario y recorre las características de ISO/IEC 25010 anotando qué exigirías en cada una.', 'Escribe cinco requisitos de calidad en Planguage, con escala, medición, mínimo y meta.', 'Convierte dos de ellos en escenarios de calidad de seis partes.', 'Identifica dos compromisos entre cualidades y explica cuál priorizarías.', 'Lista las restricciones legales que aplicarían en el Perú.'],
    deliver: 'El documento con los requisitos, los escenarios, los compromisos y las restricciones.' },
  hito: ['Escribe los requisitos de calidad de PatioApp en Planguage (rendimiento en la puerta, disponibilidad sin conexión, usabilidad, seguridad, mantenibilidad).', 'Agrega a PatioApp el consentimiento para notificaciones al dueño según la Ley 29733 y traza ese requisito hasta la ley.']
});
SDC.after('m11.nfr', 'm11.elicit');
})();
