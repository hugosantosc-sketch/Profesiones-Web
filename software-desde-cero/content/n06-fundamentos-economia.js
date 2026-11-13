(function () {
var M = SDC.M, S = SDC.S;
M('eco', { title: 'Fundamentos de ingeniería y economía del software',
  desc: 'Lo que convierte a un programador en ingeniero: medir con rigor, experimentar sin engañarse, encontrar las causas reales de los problemas, evaluar en dinero las alternativas y decidir con método.',
  thread: 'PatioApp se justifica como inversión: se miden sus efectos con métricas bien definidas, se analizan sus fallas hasta la causa raíz, se calcula su valor actual neto frente a comprar un producto y se eligen las tecnologías con una matriz de decisión.',
  books: '*Software Metrics: A Rigorous and Practical Approach* (Fenton y Bieman), *Experimentation in Software Engineering* (Wohlin y otros), *Software Engineering Economics* (Boehm), *Return on Software* (Tockey), *Thinking, Fast and Slow* (Kahneman).',
  uni: 'Áreas *Engineering Foundations* y *Software Engineering Economics* de SWEBOK v4; MIT 15.401 *Finance Theory I*; Stanford MS&E 252 *Decision Analysis*; CMU 17-313 (métricas y evidencia empírica). En Perú: Ingeniería Económica, Investigación de Operaciones y Métricas de Software (UNMSM, UNI, PUCP, UPC).',
  capstone: { t: 'Caso de negocio y de ingeniería de PatioApp',
    goal: 'Justificar PatioApp con datos y dinero, como lo exigiría un gerente o un comité de inversión.',
    steps: ['Define con GQM los objetivos de negocio de PatioApp, sus preguntas y sus métricas, con la escala de cada una.', 'Diseña un experimento o un benchmark riguroso que mida el efecto de una mejora, con sus amenazas a la validez.', 'Haz el análisis de causa raíz de un problema real o simulado con cinco porqués e Ishikawa.', 'Calcula el VAN, la TIR, el periodo de recuperación y el costo total a 3 años de construir PatioApp frente a comprar un producto.', 'Elige la plataforma de despliegue con una matriz de decisión ponderada y un análisis de sensibilidad.'],
    deliver: 'Un documento de caso de negocio con métricas, experimento, análisis de causa raíz, evaluación económica y decisión justificada.' } });

S('eco', 'eco.measure', { title: 'Medición y métricas en ingeniería',
  ask: '¿Qué concepto de medición se aplica?',
  lesson: `
> **La idea en simple.** Decir que un sistema "es rápido" no sirve; decir que "el 95% de las búsquedas responde en menos de 300 ms" sí. Medir convierte opiniones en datos que se pueden discutir, comparar y mejorar. Pero medir mal es peor que no medir, porque da falsa seguridad.

## Por qué medir, y sus límites
Lord Kelvin dijo en una conferencia de 1883 que cuando puedes medir aquello de lo que hablas y expresarlo en números sabes algo de ello, y cuando no puedes, tu conocimiento es escaso e insatisfactorio. Tom DeMarco trasladó la idea al software en *Controlling Software Projects* (1982) con la frase "no puedes controlar lo que no puedes medir". En 2009, el propio DeMarco escribió en *IEEE Software* que había exagerado: muchos proyectos valiosos no se controlan por métricas, y la obsesión por controlar puede costar más de lo que ahorra. La postura madura está entre ambas: medir lo que ayuda a decidir.

## Escalas de medición
Stanley Smith Stevens publicó en 1946 *On the Theory of Scales of Measurement*, que define qué operaciones tienen sentido con cada tipo de dato:
| Escala | Qué permite | Ejemplo en software | Estadísticos válidos |
| Nominal | distinguir categorías | lenguaje de programación, tipo de defecto | moda, conteos |
| Ordinal | ordenar | gravedad del defecto (baja, media, alta) | mediana, percentiles |
| Intervalo | sumar y restar (el cero es arbitrario) | fecha de calendario | media, desviación |
| Razón | todo, con cero absoluto | tiempo de respuesta, líneas de código, costo | media geométrica, razones |
Errores frecuentes: promediar la gravedad codificada como 1, 2, 3 (es ordinal: "gravedad media 2.4" no tiene sentido claro) o decir que un día de 30 °C es "el doble de caluroso" que uno de 15 °C (el cero de Celsius es arbitrario).

## Métricas directas, derivadas y su calidad
- **Directas:** se miden sin depender de otras (defectos encontrados, horas trabajadas, líneas).
- **Derivadas:** se calculan a partir de otras (densidad de defectos = defectos / miles de líneas; productividad = funcionalidad entregada / esfuerzo).
Una buena métrica es **válida** (mide lo que dice medir), **confiable** (dos personas obtienen el mismo valor), **barata de obtener** y **accionable** (sugiere qué hacer). Las líneas de código fallan en validez como medida de productividad: Edsger Dijkstra escribió en 1988 que, si se quieren contar líneas, no deberían verse como "líneas producidas" sino como "líneas gastadas". Norman Fenton y James Bieman desarrollan la teoría en *Software Metrics: A Rigorous and Practical Approach*.

## Métricas adelantadas y retrasadas
Las **retrasadas** dicen cómo fue el resultado (defectos reportados por clientes, ingresos del mes); las **adelantadas** predicen (cobertura de pruebas, tiempo de revisión, complejidad que crece). Un tablero útil combina ambas: las retrasadas confirman, las adelantadas permiten actuar a tiempo.

## GQM: objetivo, pregunta, métrica
Victor Basili y David Weiss propusieron en 1984 el método **GQM** (*Goal, Question, Metric*), formalizado por Basili, Gianluigi Caldiera y H. Dieter Rombach en 1994. Primero se fija un **objetivo**, luego las **preguntas** que dirían si se cumple y recién después las **métricas** que responden cada pregunta. Así se evita medir lo fácil en vez de lo importante.
~~~txt
Objetivo:  reducir el tiempo que una unidad pasa en el patio, desde el punto de vista de operaciones.
  Pregunta: ¿cuánto tarda hoy una unidad típica?          Métricas: mediana y p90 de días en patio (razón)
  Pregunta: ¿en qué etapa se pierde más tiempo?           Métricas: tiempo por estado (razón)
  Pregunta: ¿las mejoras de la app lo redujeron?          Métricas: comparación antes y después con intervalo de confianza
~~~

## Productividad de desarrolladores: SPACE
Nicole Forsgren, Margaret-Anne Storey y otros investigadores de GitHub y Microsoft propusieron en 2021 el marco **SPACE**: la productividad no cabe en un número y debe mirarse en cinco dimensiones, **S**atisfacción y bienestar, **P**erformance (resultados), **A**ctividad (conteos de trabajo), **C**omunicación y colaboración, y **E**ficiencia y flujo. Recomiendan usar al menos tres dimensiones a la vez, combinando datos de sistemas con encuestas, porque cualquier métrica sola se puede manipular.
~~~js
// Densidad de defectos por mil líneas (KLOC): una métrica derivada de escala de razón
const modulos = [{ n: 'cobros', defectos: 12, lineas: 4200 }, { n: 'ingresos', defectos: 3, lineas: 3800 }, { n: 'reportes', defectos: 9, lineas: 1500 }];
modulos.map(m => ({ ...m, densidad: (m.defectos / (m.lineas / 1000)).toFixed(2) }))
  .sort((a, b) => b.densidad - a.densidad)
  .forEach(m => console.log(m.n, m.densidad, 'defectos/KLOC'));
~~~

## La ley de Goodhart y las métricas que se corrompen
El economista Charles Goodhart observó en 1975 que cuando una medida estadística se usa como objetivo de control, deja de comportarse como antes; la antropóloga Marilyn Strathern lo resumió en 1997 así: "cuando una medida se convierte en meta, deja de ser una buena medida". Ejemplos en software: si se premia la cobertura de pruebas, aparecen pruebas sin aserciones; si se premian los puntos de historia, los puntos se inflan; si se castiga el número de defectos reportados, los defectos dejan de reportarse. Defensas prácticas:
- Medir **pares de métricas** que se equilibran (velocidad y tasa de fallos, cobertura y defectos escapados).
- Usar las métricas para **aprender**, no para evaluar personas.
- Revisar periódicamente si cada métrica sigue respondiendo su pregunta del GQM.

## Ejemplo resuelto: elegir la métrica correcta
Situación: el gerente quiere saber si el equipo "trabaja bien". Propuesta ingenua: contar commits por persona. Problemas: no es válida (un commit puede ser una línea o mil), es fácil de manipular (ley de Goodhart) y no es accionable. Propuesta con GQM: objetivo "entregar valor de forma sostenible"; preguntas "¿cuánto tarda un cambio en llegar a producción?", "¿con qué frecuencia esos cambios causan fallas?", "¿cómo se siente el equipo con su carga?"; métricas: tiempo de entrega y tasa de fallos (DORA), más una encuesta trimestral de satisfacción (SPACE). Se miden equipos, no individuos, y los números se usan para conversar, no para premiar o castigar.`,
  links: [['m14.metrics', 'las métricas de calidad y DORA son aplicaciones de la medición'], ['mat2.stat', 'la escala de una medida decide qué estadísticos tienen sentido'], ['m12.agile', 'la ley de Goodhart advierte contra convertir métricas en metas']],
  read: 'Fenton y Bieman, capítulos 1 a 5; Basili, Caldiera y Rombach (1994); Forsgren y otros (2021).',
  terms: [
    ['Escala nominal', 'escala que solo distingue categorías sin orden', ['Clasificas defectos por tipo: interfaz, lógica, datos.', 'El lenguaje de programación de cada servicio.', 'Solo tiene sentido contar y hallar la moda.']],
    ['Escala ordinal', 'escala que ordena valores sin que las distancias entre ellos sean iguales', ['La gravedad de un defecto: baja, media, alta, crítica.', 'Una calificación de 1 a 5 estrellas.', 'Promediarla da un número de dudoso significado; se usa la mediana.']],
    ['Escala de razón', 'escala con cero absoluto en la que tienen sentido las proporciones', ['Un tiempo de respuesta de 400 ms es el doble de uno de 200 ms.', 'El costo en soles de un proyecto.', 'Las líneas de código de un módulo.']],
    ['Métrica derivada', 'métrica calculada a partir de otras métricas', ['La densidad de defectos divide defectos entre miles de líneas.', 'La disponibilidad se calcula con tiempos de falla y recuperación.', 'La velocidad promedio de un equipo por sprint.']],
    ['GQM', 'método que define primero objetivos, luego preguntas y recién después las métricas que las responden', ['Partes de "reducir el tiempo en patio" para decidir qué medir.', 'Evita medir lo fácil en lugar de lo importante.', 'Basili lo propuso en 1984.']],
    ['Validez', 'propiedad de una métrica de medir realmente aquello que dice medir', ['Las líneas de código no miden bien la productividad.', 'La cobertura no mide por sí sola la calidad de las pruebas.', 'Se cuestiona preguntando qué podría hacer subir el número sin mejorar nada.']],
    ['Indicador adelantado', 'métrica que anticipa un resultado futuro y permite actuar antes', ['La complejidad creciente de un módulo anticipa más defectos.', 'El tiempo de revisión de los pull requests anticipa entregas más lentas.', 'Se contrapone a los indicadores retrasados como los defectos reportados por clientes.']],
    ['Marco SPACE', 'marco que mide la productividad en cinco dimensiones: satisfacción, resultados, actividad, comunicación y eficiencia', ['Combinas el tiempo de entrega con una encuesta de bienestar del equipo.', 'Evitas juzgar a un desarrollador por su cantidad de commits.', 'Forsgren y otros lo propusieron en 2021.']]
  ],
  q: [
    ['La gravedad de los defectos se codifica como 1 (baja) a 4 (crítica). ¿Qué estadístico es más apropiado para resumirla?', 'La mediana o la distribución de frecuencias', ['La media', 'La desviación estándar', 'La media geométrica'], 'Es una escala ordinal: las distancias entre niveles no son iguales.', 3],
    ['¿En qué orden se construye un modelo GQM?', 'Objetivo, preguntas y luego métricas', ['Métricas, preguntas y objetivo', 'Preguntas, métricas y objetivo', 'Solo métricas'], 'Partir de las métricas lleva a medir lo fácil.', 2],
    ['Un módulo tiene 18 defectos y 6000 líneas. ¿Cuál es su densidad de defectos por KLOC?', '3', ['0.003', '18', '6'], '18 / 6 = 3 defectos por mil líneas.', 2],
    ['¿Por qué las líneas de código son una mala medida de productividad?', 'Porque no miden valor entregado y premian escribir más código del necesario', ['Porque son difíciles de contar', 'Porque son de escala nominal', 'Porque los compiladores las cambian'], 'Dijkstra las llamó "líneas gastadas".', 3],
    ['¿Qué recomienda el marco SPACE?', 'Combinar al menos tres dimensiones con datos de sistemas y encuestas', ['Usar una sola métrica por persona', 'Contar commits y líneas', 'No medir nunca la productividad'], 'Una métrica aislada se manipula fácilmente.', 3],
    { tf: 'Un tiempo de respuesta de 400 ms es el doble de uno de 200 ms, porque el tiempo es una escala de razón.', v: true, e: 'Tiene cero absoluto, así que las proporciones tienen sentido.', l: 2 },
    { tf: 'Si una métrica es fácil de obtener, siempre es válida.', v: false, e: 'Facilidad y validez son propiedades distintas; muchas métricas fáciles no miden lo que importa.', l: 2 },
    { i: 'Tres módulos tienen 4, 10 y 6 defectos en 2000, 5000 y 1500 líneas. ¿Cuántos defectos por KLOC tiene el peor? (dos decimales)', a: '4.00', e: 'Densidades: 2, 2 y 4; el peor es el tercero con 4.00.', l: 3 },
    { c: 'Escribe «densidadDefectos(defectos, lineas)» en defectos por mil líneas, redondeada a 2 decimales.', f: 'densidadDefectos', p: ['defectos', 'lineas'], t: [[[18, 6000], 3], [[7, 3000], 2.33], [[0, 1000], 0]], sol: '  return Math.round(defectos / (lineas / 1000) * 100) / 100;', l: 2 },
    { c: 'Escribe «mediaValida(escala)» que diga si tiene sentido calcular la media para la escala dada ("nominal", "ordinal", "intervalo" o "razon").', f: 'mediaValida', p: ['escala'], t: [[['nominal'], false], [['ordinal'], false], [['intervalo'], true], [['razon'], true]], sol: '  return escala === "intervalo" || escala === "razon";', l: 1 }
  ],
  gen: function (g) {
    var medidas = [['Lenguaje en que está escrito cada servicio', 'Nominal'], ['Prioridad de una historia: baja, media, alta', 'Ordinal'], ['Fecha de despliegue', 'Intervalo'], ['Tiempo de respuesta en milisegundos', 'Razón'], ['Tipo de defecto: interfaz, lógica, datos', 'Nominal'], ['Satisfacción del usuario de 1 a 5', 'Ordinal'], ['Costo del proyecto en soles', 'Razón'], ['Número de defectos encontrados', 'Razón'], ['Temperatura del servidor en grados Celsius', 'Intervalo'], ['Nivel de madurez CMMI (1 a 5)', 'Ordinal']];
    medidas.forEach(function (m) { g.mcq(2, '¿En qué escala de Stevens está esta medida? ' + m[0], m[1], ['Nominal', 'Ordinal', 'Intervalo', 'Razón'].filter(function (x) { return x !== m[1]; }), 'Nominal: categorías; ordinal: orden; intervalo: diferencias con cero arbitrario; razón: cero absoluto.'); });
    g.times(8, function (R) { var d = R.int(1, 40), k = R.int(1, 20); g.input(2, 'Un módulo tiene ' + d + ' defectos y ' + k * 1000 + ' líneas. ¿Cuál es su densidad por KLOC? Redondea a 2 decimales.', (d / k).toFixed(2), d + '/' + k + ' = ' + (d / k).toFixed(2) + '.'); });
    g.times(4, function (R) { var antes = R.int(5, 12), despues = R.int(2, antes - 1); g.input(3, 'La mediana de días en patio bajó de ' + antes + ' a ' + despues + '. ¿En qué porcentaje bajó? Redondea a 1 decimal.', (100 * (antes - despues) / antes).toFixed(1), '(' + antes + ' − ' + despues + ')/' + antes + ' × 100.'); });
  },
  checks: [
    ['¿Por qué no tiene sentido promediar la gravedad de los defectos codificada de 1 a 4?', 'Porque es una escala ordinal: indica orden, pero la distancia entre "baja" y "media" no es necesariamente la misma que entre "alta" y "crítica".'],
    ['Construye un GQM breve para "mejorar la calidad de las entregas".', 'Objetivo: reducir fallas en producción. Preguntas: ¿cuántos despliegues causan fallas? ¿cuánto tardamos en recuperarnos? Métricas: tasa de fallos de cambio y tiempo de restauración.'],
    ['¿Qué hace válida a una métrica?', 'Que mida realmente lo que dice medir; se pone a prueba preguntando qué haría subir el número sin que mejore lo que interesa.'],
    ['¿Qué diferencia hay entre un indicador adelantado y uno retrasado?', 'El adelantado anticipa un resultado y permite actuar a tiempo; el retrasado confirma lo que ya ocurrió.'],
    ['¿Por qué el marco SPACE pide combinar dimensiones?', 'Porque la productividad es multidimensional y cualquier métrica aislada se puede manipular o da una imagen parcial.']
  ],
  cites: ['Stevens, S. S. (1946). On the Theory of Scales of Measurement. *Science*, 103(2684).', 'Basili, V., Caldiera, G. y Rombach, H. D. (1994). The Goal Question Metric Approach. *Encyclopedia of Software Engineering*. Wiley.', 'Fenton, N. y Bieman, J. (2014). *Software Metrics: A Rigorous and Practical Approach* (3.ª ed.). CRC Press.', 'Forsgren, N., Storey, M.-A. et al. (2021). The SPACE of Developer Productivity. *ACM Queue*, 19(1).', 'DeMarco, T. (2009). Software Engineering: An Idea Whose Time Has Come and Gone? *IEEE Software*, 26(4).'],
  project: { t: 'Programa de medición con GQM',
    goal: 'Diseñar e implementar un pequeño programa de medición que sirva para decidir.',
    steps: ['Elige dos objetivos reales de un proyecto (por ejemplo, entregar más rápido y con menos fallas) y escribe su modelo GQM completo.', 'Indica la escala de cada métrica y qué estadísticos usarás con ella.', 'Implementa la recolección automática de las métricas desde Git, la integración continua o la aplicación.', 'Construye un tablero sencillo con indicadores adelantados y retrasados.', 'Analiza cada métrica con la pregunta "¿cómo podría subir sin que mejore nada?" y agrega contrapesos.'],
    deliver: 'El modelo GQM, el código de recolección, el tablero y el análisis de riesgos de cada métrica.' },
  hito: ['Define con GQM tres objetivos de PatioApp (por ejemplo, reducir el tiempo de entrega de unidades) con sus preguntas y métricas, indicando la escala de cada métrica.', 'Implementa la recolección automática de esas métricas y muéstralas en un tablero.']
});

S('eco', 'eco.exp', { title: 'Experimentación y análisis de causa raíz',
  ask: '¿Qué concepto de experimentación o análisis de causas se aplica?',
  lesson: `
> **La idea en simple.** "Desde que cambiamos de base de datos, la app va más rápido." ¿Fue la base de datos, o ese mismo día bajó el tráfico? Un ingeniero no se conforma con la primera explicación: diseña la prueba que la confirmaría o la descartaría, y cuando algo falla, busca las causas que lo hicieron posible, no solo al culpable.

## La ingeniería de software como ciencia empírica
Claes Wohlin, Per Runeson y sus coautores sistematizaron en *Experimentation in Software Engineering* (2000; 2.ª ed., 2012) cómo aplicar el método científico al software. Los elementos de un experimento:
- **Hipótesis:** una afirmación que se puede refutar ("el nuevo índice reduce la mediana del tiempo de búsqueda").
- **Variable independiente:** lo que se cambia a propósito (con o sin índice).
- **Variable dependiente:** lo que se mide (tiempo de búsqueda).
- **Variables de confusión:** otras cosas que cambian a la vez y podrían explicar el resultado (el tráfico, la caché caliente, otra versión del código).
- **Control:** la condición de comparación, idealmente asignada al azar.

## Amenazas a la validez
| Tipo | Pregunta | Ejemplo |
| Interna | ¿el efecto lo causó realmente lo que cambié? | la mejora coincidió con un día de poco tráfico |
| Externa | ¿se generaliza a otros contextos? | se probó con 100 unidades y producción tiene un millón |
| De constructo | ¿mido lo que creo medir? | mido el tiempo del servidor pero el usuario sufre la red |
| De conclusión | ¿la estadística es correcta? | dos ejecuciones no bastan para concluir |
Un informe honesto enumera sus amenazas y cómo las mitigó.

## Benchmarks que no mienten
Todd Mytkowicz y sus coautores publicaron en 2009 *Producing Wrong Data Without Doing Anything Obviously Wrong!*: mostraron que factores aparentemente irrelevantes, como el tamaño de las variables de entorno o el orden en que se enlazan los archivos, cambiaban el rendimiento medido lo suficiente como para invertir conclusiones. Reglas para medir bien:
- **Calentar** antes de medir (compiladores JIT, cachés).
- **Repetir** muchas veces y reportar mediana y dispersión, no una sola ejecución.
- Cambiar **una sola variable** a la vez y aleatorizar el orden de las pruebas.
- Medir en un entorno lo más parecido a producción y documentarlo.
~~~js
function medir(fn, repeticiones = 31) {
  for (let i = 0; i < 5; i++) fn();                      // calentamiento
  const t = [];
  for (let i = 0; i < repeticiones; i++) { const a = performance.now(); fn(); t.push(performance.now() - a); }
  t.sort((x, y) => x - y);
  return { mediana: t[(t.length - 1) / 2].toFixed(3), p10: t[3].toFixed(3), p90: t[27].toFixed(3) };
}
const datos = Array.from({ length: 100000 }, (_, i) => i);
console.log('suma con bucle', medir(() => { let s = 0; for (const x of datos) s += x; return s; }));
console.log('suma con reduce', medir(() => datos.reduce((s, x) => s + x, 0)));
~~~

## Análisis de causa raíz
Cuando algo falla, el impulso es corregir el síntoma y buscar a quién culpar. Las técnicas de causa raíz vienen de la manufactura japonesa:
- **Cinco porqués:** Taiichi Ohno, creador del sistema de producción de Toyota, enseñaba a preguntar "¿por qué?" varias veces hasta llegar a una causa que se pueda corregir para que el problema no se repita.
- **Diagrama de Ishikawa** (espina de pescado): Kaoru Ishikawa lo popularizó en los años 60. Las causas posibles se agrupan en categorías (en software: personas, proceso, herramientas, código, entorno, datos) para no quedarse en la primera.
- **Principio de Pareto:** Joseph Juran lo bautizó en honor del economista Vilfredo Pareto, que observó que el 80% de la tierra de Italia pertenecía al 20% de la población. En software, pocos tipos de defectos o pocos módulos concentran la mayoría de los problemas; atacarlos primero rinde más.
- **Árbol de fallas:** desarrollado en los Laboratorios Bell en 1962 para el sistema de misiles Minuteman, combina eventos con compuertas lógicas (Y, O) para ver qué combinaciones producen la falla.

## No hay una sola causa raíz
Richard Cook, médico e investigador de la seguridad, escribió en 1998 *How Complex Systems Fail*: en sistemas complejos los accidentes casi nunca tienen una causa única; ocurren cuando varias defensas fallan a la vez. James Reason lo ilustró con el **modelo del queso suizo**: cada capa de protección (revisión, pruebas, monitoreo, alertas) tiene agujeros, y el accidente pasa cuando los agujeros se alinean. Por eso los buenos análisis buscan **factores contribuyentes** y mejoran varias capas, en lugar de señalar a una persona.

## Experimentos en producción: pruebas A/B
Ron Kohavi, Diane Tang y Ya Xu describen en *Trustworthy Online Controlled Experiments* (2020) cómo empresas como Microsoft, Amazon y Google prueban cambios con usuarios reales: una fracción aleatoria ve la variante B y el resto la A, y se compara una métrica definida de antemano. Las reglas clave:
- Fijar la métrica principal y el tamaño de muestra **antes** de empezar.
- No detener el experimento apenas "se ve bien" (mirar repetidamente infla los falsos positivos).
- Vigilar métricas de protección (errores, latencia) que no deben empeorar.
- Desconfiar de resultados sorprendentemente buenos: la ley de Twyman dice que cualquier cifra que parezca interesante o diferente suele estar mal.
Kohavi y sus coautores reportan que, en sus organizaciones, la mayoría de las ideas probadas no mejoraban la métrica buscada, lo que muestra cuánto se equivoca la intuición.

## Ejemplo resuelto: cinco porqués de un cobro duplicado
1. ¿Por qué se cobró dos veces? Porque el cliente presionó "Pagar" dos veces y llegaron dos peticiones.
2. ¿Por qué se procesaron ambas? Porque la API de cobro no es idempotente.
3. ¿Por qué no lo es? Porque no se definió una clave de idempotencia en el diseño.
4. ¿Por qué no se detectó en pruebas? Porque ninguna prueba envía la misma petición dos veces.
5. ¿Por qué no existe esa prueba? Porque la lista de verificación de diseño de APIs no incluye la idempotencia.
Acciones: clave de idempotencia (código), botón deshabilitado tras el primer clic (interfaz), prueba de doble envío (pruebas) y la idempotencia agregada a la lista de verificación (proceso). Cuatro capas reforzadas, ningún culpable.`,
  links: [['mat2.stat', 'los experimentos se analizan con inferencia estadística'], ['m15.obs', 'los postmortems sin culpables aplican el análisis de causas'], ['m4.bigo', 'la prueba de duplicación es un experimento de rendimiento']],
  read: 'Wohlin y otros, capítulos 1 a 8; Mytkowicz y otros (2009); Cook (1998); Ishikawa, *Guide to Quality Control*.',
  terms: [
    ['Hipótesis', 'afirmación precisa y refutable que un experimento pone a prueba', ['"El índice nuevo reduce la mediana del tiempo de búsqueda en al menos 30%".', 'Se formula antes de mirar los datos.', 'Si los datos la contradicen, se descarta.']],
    ['Variable independiente', 'factor que el experimentador cambia a propósito', ['Comparar la búsqueda con índice y sin índice.', 'Probar dos versiones de una pantalla.', 'Cambiar el tamaño de la caché.']],
    ['Variable de confusión', 'factor no controlado que cambia junto con el tratamiento y puede explicar el resultado', ['La mejora coincidió con un día festivo de poco tráfico.', 'La versión nueva se probó con la caché caliente y la vieja en frío.', 'Se evita aleatorizando y cambiando una sola cosa a la vez.']],
    ['Validez interna', 'grado en que el efecto observado se debe realmente a la variable que se cambió', ['Descartas que la mejora venga de otro cambio desplegado el mismo día.', 'Aleatorizar el orden de las mediciones la protege.', 'Es la primera amenaza que revisa un informe honesto.']],
    ['Validez externa', 'grado en que los resultados se generalizan a otros contextos', ['Lo probado con 100 registros podría no valer con un millón.', 'Un estudio con estudiantes podría no aplicar a profesionales.', 'Se mejora probando en condiciones parecidas a las reales.']],
    ['Cinco porqués', 'técnica que pregunta repetidamente "¿por qué?" hasta llegar a una causa corregible', ['Pasas de "cobró dos veces" a "la lista de diseño no incluye idempotencia".', 'Taiichi Ohno la enseñaba en Toyota.', 'Ayuda a no quedarse en el síntoma.']],
    ['Diagrama de Ishikawa', 'diagrama en forma de espina de pescado que agrupa las causas posibles de un problema por categorías', ['Organizas causas en personas, proceso, herramientas, código y entorno.', 'Kaoru Ishikawa lo popularizó en los años 60.', 'Evita quedarse con la primera causa que aparece.']],
    ['Principio de Pareto', 'observación de que una minoría de causas produce la mayoría de los efectos', ['Tres módulos concentran el 80% de los defectos.', 'Pocos tipos de error explican la mayoría de las llamadas a soporte.', 'Juran lo bautizó en honor de Vilfredo Pareto.']]
  ],
  q: [
    ['Mides una optimización una sola vez y sale 20% más rápida. ¿Qué amenaza a la validez es más evidente?', 'De conclusión: una sola medición no basta para separar el efecto del ruido', ['Externa', 'De constructo', 'Ninguna'], 'Hay que repetir y mirar la dispersión.', 3],
    ['El mismo día que agregaste un índice también se actualizó el servidor. ¿Qué problema tiene concluir que el índice causó la mejora?', 'Hay una variable de confusión que amenaza la validez interna', ['Ninguno', 'La validez externa es perfecta', 'Es un problema de escala nominal'], 'Dos cambios simultáneos impiden atribuir el efecto a uno.', 3],
    ['¿Qué mostró el estudio de Mytkowicz y otros (2009)?', 'Que factores aparentemente irrelevantes del entorno pueden cambiar los resultados de un benchmark', ['Que los benchmarks siempre son exactos', 'Que Java es más lento que C', 'Que no conviene medir'], 'Por eso se aleatoriza, se repite y se documenta el entorno.', 4],
    ['Según Cook y Reason, ¿por qué no conviene buscar "la" causa raíz única de un incidente?', 'Porque en sistemas complejos los incidentes ocurren cuando fallan varias defensas a la vez', ['Porque siempre es culpa de una persona', 'Porque las causas no importan', 'Porque es imposible analizar incidentes'], 'El modelo del queso suizo muestra capas con agujeros que se alinean.', 4],
    { tf: 'Al hacer un benchmark conviene calentar el código antes de medir.', v: true, e: 'Así se evita medir la compilación JIT y las cachés frías.', l: 2 },
    { tf: 'Si cambias tres cosas a la vez y mejora el rendimiento, sabes cuál de las tres lo causó.', v: false, e: 'Hay que cambiar una sola variable a la vez para atribuir el efecto.', l: 2 },
    { o: 'Ordena los pasos de un experimento de rendimiento bien hecho.', s: ['Formular una hipótesis refutable', 'Definir variable independiente, dependiente y controles', 'Calentar y repetir las mediciones en orden aleatorio', 'Calcular mediana y dispersión', 'Revisar las amenazas a la validez y concluir'], e: 'La hipótesis se fija antes de mirar los datos.', l: 3 },
    { c: 'Escribe «categoriasPareto(conteos)»: cuántas categorías, tomadas de mayor a menor, hacen falta para acumular al menos el 80% del total.', f: 'categoriasPareto', p: ['conteos'], t: [[[[50, 30, 10, 5, 5]], 2], [[[25, 25, 25, 25]], 4], [[[90, 5, 5]], 1]], sol: '  const o = [...conteos].sort((a, b) => b - a), total = o.reduce((s, x) => s + x, 0);\n  let acum = 0;\n  for (let i = 0; i < o.length; i++) { acum += o[i]; if (acum >= 0.8 * total) return i + 1; }\n  return o.length;', l: 3 },
    { c: 'Escribe «medianaTiempos(t)» que devuelva la mediana de una lista de tiempos sin modificarla.', f: 'medianaTiempos', p: ['t'], t: [[[[5, 1, 3]], 3], [[[4, 1, 3, 2]], 2.5], [[[9]], 9]], sol: '  const o = [...t].sort((a, b) => a - b), n = o.length;\n  return n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2;', l: 2 }
  ],
  gen: function (g) {
    var amenazas = [['La mejora se midió el mismo día que se cambió el servidor', 'Validez interna'], ['Se probó con datos de juguete y producción tiene millones de registros', 'Validez externa'], ['Se midió el tiempo del servidor pero los usuarios se quejan de la red', 'Validez de constructo'], ['Se concluyó con solo dos ejecuciones', 'Validez de conclusión'], ['Los voluntarios del grupo con la herramienta nueva eran los más experimentados', 'Validez interna'], ['El experimento se hizo solo con estudiantes', 'Validez externa']];
    amenazas.forEach(function (a) { g.mcq(3, '¿Qué tipo de amenaza a la validez describe este caso? ' + a[0], a[1], ['Validez interna', 'Validez externa', 'Validez de constructo', 'Validez de conclusión'].filter(function (x) { return x !== a[1]; }), 'Interna: causalidad; externa: generalización; constructo: qué se mide; conclusión: estadística.'); });
    g.times(8, function (R) { var c = [R.int(20, 60), R.int(10, 30), R.int(3, 10), R.int(1, 8), R.int(1, 5)], o = c.slice().sort(function (a, b) { return b - a; }), tot = o.reduce(function (a, b) { return a + b; }, 0), acc = 0, k = 0; while (acc < 0.8 * tot) { acc += o[k]; k++; } g.input(3, 'Los defectos por módulo son ' + c.join(', ') + '. ¿Cuántos módulos, de mayor a menor, acumulan al menos el 80% de los defectos?', k, 'Total ' + tot + '; acumulando de mayor a menor se llega al 80% con ' + k + ' módulos.'); });
    g.times(5, function (R) { var t = []; for (var i = 0; i < 5; i++) t.push(R.int(10, 40)); var o = t.slice().sort(function (a, b) { return a - b; }); g.input(2, 'Cinco mediciones de un benchmark dieron ' + t.join(', ') + ' ms. ¿Cuál es la mediana?', o[2], 'Ordenadas: ' + o.join(', ') + '.'); });
  },
  checks: [
    ['¿Qué es una variable de confusión? Da un ejemplo.', 'Un factor no controlado que cambia junto con el tratamiento; por ejemplo, medir una optimización justo cuando bajó el tráfico.'],
    ['Nombra cuatro reglas para un benchmark confiable.', 'Calentar antes de medir, repetir muchas veces y reportar mediana y dispersión, cambiar una variable a la vez en orden aleatorio y documentar el entorno.'],
    ['¿Por qué los cinco porqués deben terminar en algo corregible del sistema y no en una persona?', 'Porque culpar a una persona no evita que el problema se repita; corregir el proceso, las herramientas o el diseño sí.'],
    ['Explica el modelo del queso suizo.', 'Cada capa de defensa tiene agujeros; un incidente ocurre cuando los agujeros de varias capas se alinean. Se mejora reforzando varias capas.'],
    ['¿Cómo usarías el principio de Pareto para priorizar trabajo de calidad?', 'Midiendo qué módulos o tipos de defecto concentran la mayoría de los problemas y atacándolos primero.']
  ],
  cites: ['Wohlin, C. et al. (2012). *Experimentation in Software Engineering* (2.ª ed.). Springer.', 'Mytkowicz, T., Diwan, A., Hauswirth, M. y Sweeney, P. (2009). Producing Wrong Data Without Doing Anything Obviously Wrong! *ASPLOS 2009*.', 'Cook, R. (1998). *How Complex Systems Fail*. Cognitive Technologies Laboratory, University of Chicago.', 'Reason, J. (1990). *Human Error*. Cambridge University Press.', 'Ohno, T. (1988). *Toyota Production System: Beyond Large-Scale Production*. Productivity Press.', 'Ishikawa, K. (1986). *Guide to Quality Control* (2.ª ed.). Asian Productivity Organization.', 'Kohavi, R., Tang, D. y Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.'],
  project: { t: 'Experimento controlado y análisis de un incidente',
    goal: 'Practicar el método científico en una decisión técnica y el análisis de causas en una falla.',
    steps: ['Formula una hipótesis de rendimiento (por ejemplo, que Map es más rápido que un objeto para búsquedas por placa) con su métrica.', 'Diseña y ejecuta el benchmark con calentamiento, 31 repeticiones en orden aleatorio, mediana y percentiles.', 'Escribe las amenazas a la validez y cómo las mitigaste.', 'Toma un defecto real (o provoca uno) y haz su análisis con cinco porqués y un diagrama de Ishikawa.', 'Propón acciones en al menos tres capas distintas (código, pruebas, proceso o monitoreo).'],
    deliver: 'El informe del experimento con datos y amenazas, y el análisis del incidente con sus acciones.' },
  hito: ['Haz un benchmark riguroso de una operación frecuente de PatioApp (calentamiento, 31 repeticiones, mediana y percentiles) y documenta sus amenazas a la validez.', 'Realiza el análisis de causa raíz (cinco porqués e Ishikawa) de un defecto real o simulado de PatioApp y aplica acciones en al menos tres capas.']
});

S('eco', 'eco.money', { title: 'Economía de la ingeniería de software',
  ask: '¿Qué concepto de economía de la ingeniería se aplica?',
  lesson: `
> **La idea en simple.** Un sol hoy vale más que un sol dentro de un año, porque hoy lo puedes invertir. Por eso, para decidir si un proyecto de software conviene, no basta con sumar costos y beneficios: hay que traerlos todos al presente y compararlos. Así deciden las empresas, y así debe aprender a argumentar un ingeniero.

## Una disciplina con nombre propio
Barry Boehm publicó en 1981 *Software Engineering Economics*, donde planteó que toda decisión técnica es también una decisión económica: qué construir, cuánta calidad comprar, cuándo detenerse. Steve Tockey desarrolló el tema para ingenieros en *Return on Software* (2004), y SWEBOK v4 dedica un área de conocimiento completa a la economía de la ingeniería de software. En el Perú, los cursos de Ingeniería Económica de las carreras de ingeniería cubren estas mismas herramientas.

## Valor del dinero en el tiempo
Si la **tasa de descuento** (el rendimiento que se exige a una inversión, o el costo del dinero) es i por periodo:
:::flow Valor presente = Valor futuro / (1 + i)ⁿ
Con i = 10% anual, recibir S/ 1100 dentro de un año equivale a S/ 1000 hoy; recibir S/ 1000 dentro de tres años equivale a unos S/ 751 hoy. La tasa refleja el costo de financiarse, el riesgo del proyecto y la inflación.

## Indicadores de evaluación
- **VAN** (valor actual neto): suma de todos los flujos de dinero descontados al presente, con la inversión inicial como flujo negativo. Si el VAN es mayor que cero, el proyecto genera más valor que la alternativa que rinde la tasa de descuento.
- **TIR** (tasa interna de retorno): la tasa que hace el VAN igual a cero. Si la TIR supera la tasa exigida, el proyecto conviene. Cuidado: con flujos que cambian de signo varias veces puede haber varias TIR, y para comparar proyectos de distinto tamaño el VAN es más confiable.
- **Periodo de recuperación:** cuánto tiempo pasa hasta que lo acumulado deja de ser negativo. Es intuitivo, pero ignora lo que pasa después y, en su versión simple, el valor del dinero en el tiempo.
- **ROI** (retorno de la inversión): (beneficio − costo) / costo. Fácil de comunicar, pero sin la dimensión del tiempo.
~~~js
const van = (tasa, flujos) => flujos.reduce((s, f, t) => s + f / (1 + tasa) ** t, 0);
function tir(flujos) {                         // bisección: busca la tasa con VAN = 0
  let lo = -0.99, hi = 10;
  for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (van(m, flujos) > 0) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const patioApp = [-60000, 25000, 30000, 30000, 30000];   // inversión hoy y ahorros netos anuales
console.log('VAN al 12%: S/', van(0.12, patioApp).toFixed(0), '· TIR:', (tir(patioApp) * 100).toFixed(1) + '%');
~~~

## Costo total de propiedad
El precio de compra o de desarrollo es solo una parte. El **costo total de propiedad** (TCO), un concepto que la consultora Gartner popularizó a fines de los 80, suma durante toda la vida útil: desarrollo o licencias, infraestructura, soporte, mantenimiento (que viste que suele ser la mayor parte), capacitación, migraciones y salida. En la nube cambia la estructura de costos: se pasa de **inversión de capital** (comprar servidores) a **gasto operativo** (pagar por uso), lo que reduce el riesgo inicial pero exige vigilar el gasto mes a mes.

## Construir o comprar, con números
Comparar "construir PatioApp" con "suscribirse a un producto comercial" exige el mismo horizonte (por ejemplo, 3 años), la misma tasa y todos los costos: el producto comercial tiene suscripción, adaptación e integración; construir tiene desarrollo, operación, mantenimiento y el **costo de oportunidad** del equipo que podría estar haciendo otra cosa. La regla de la industria es construir lo que diferencia al negocio y comprar lo que es común; los números confirman o desmienten la regla en cada caso.

## El costo de la calidad
Joseph Juran planteó en 1951 que la calidad tiene costos medibles, y Philip Crosby lo popularizó en *Quality Is Free* (1979). Se clasifican en:
- **Prevención:** capacitación, diseño, revisiones, automatización.
- **Evaluación:** pruebas, inspecciones, auditorías.
- **Fallas internas:** defectos encontrados antes de publicar (retrabajo).
- **Fallas externas:** defectos que llegan al cliente (soporte, reembolsos, reputación, multas).
La tesis de Crosby es que invertir en prevención y evaluación reduce mucho más el costo de las fallas, sobre todo las externas. La **deuda técnica** es la versión de este razonamiento para el diseño: el atajo de hoy cobra intereses en cada cambio futuro.

## Ejemplo resuelto: ¿conviene automatizar el despliegue?
Situación: cada despliegue manual toma 3 horas de un ingeniero (S/ 60 la hora) y se hacen 8 al mes; automatizar cuesta 80 horas y luego 2 horas mensuales de mantenimiento.
- Ahorro mensual: 8 × 3 × 60 = S/ 1440; costo de mantenimiento: 2 × 60 = S/ 120. Ahorro neto: S/ 1320 al mes.
- Inversión: 80 × 60 = S/ 4800. Periodo de recuperación: unos 3.6 meses.
- VAN a 12 meses con una tasa mensual de 1%: aproximadamente −4800 + 1320 × 11.26 ≈ S/ 10 060.
Y faltan beneficios difíciles de cuantificar que suman a favor: menos errores humanos, despliegues más frecuentes y menor tiempo de recuperación. Con estos números, la conversación con un gerente deja de ser "quiero automatizar porque es buena práctica" y pasa a ser "esta inversión se paga en menos de cuatro meses".`,
  links: [['m12.risk', 'el costo del retraso y el costo hundido son conceptos económicos'], ['m15.cloud', 'en la nube los costos pasan de inversión a gasto operativo'], ['m6.refactor', 'la deuda técnica es un concepto económico aplicado al diseño']],
  read: 'Boehm, *Software Engineering Economics*; Tockey, *Return on Software*; SWEBOK v4, área Software Engineering Economics.',
  terms: [
    ['Valor del dinero en el tiempo', 'principio según el cual una cantidad disponible hoy vale más que la misma cantidad en el futuro', ['S/ 1000 hoy valen más que S/ 1000 en tres años.', 'Por eso se descuentan los ahorros futuros de un proyecto.', 'Refleja la inversión alternativa, el riesgo y la inflación.']],
    ['Valor presente', 'valor actual de un monto futuro, descontado con una tasa por la cantidad de periodos', ['S/ 1100 dentro de un año valen S/ 1000 hoy al 10%.', 'Se calcula dividiendo entre (1 + i)ⁿ.', 'Permite comparar flujos que ocurren en momentos distintos.']],
    ['VAN', 'suma de los flujos de un proyecto descontados al presente, incluida la inversión inicial', ['Si es positivo, el proyecto crea valor por encima de la tasa exigida.', 'Comparas dos alternativas con el mismo horizonte y tasa.', 'Es el criterio más confiable para elegir entre proyectos.']],
    ['TIR', 'tasa de descuento que hace igual a cero el valor actual neto de un proyecto', ['Si supera la tasa exigida, el proyecto conviene.', 'Se calcula por aproximaciones sucesivas.', 'Puede tener varias soluciones si los flujos cambian de signo varias veces.']],
    ['Periodo de recuperación', 'tiempo que tarda en recuperarse la inversión inicial con los flujos acumulados', ['La automatización se paga en 3.6 meses.', 'Es intuitivo pero ignora lo que ocurre después.', 'Los gerentes lo usan como primer filtro.']],
    ['ROI', 'razón entre la ganancia neta y la inversión', ['Inviertes S/ 10 000 y ganas S/ 13 000: el retorno es 30%.', 'Es fácil de comunicar.', 'No considera cuánto tiempo tarda en obtenerse.']],
    ['Costo total de propiedad', 'suma de todos los costos de un sistema durante su vida útil, no solo su precio inicial', ['Incluyes soporte, mantenimiento y migraciones al comparar opciones.', 'Una licencia barata puede tener un costo total alto.', 'Gartner popularizó el concepto.']],
    ['Costo de la calidad', 'costos de prevenir, evaluar y corregir fallas internas y externas', ['Invertir en revisiones reduce los costos de soporte.', 'Un defecto que llega al cliente cuesta mucho más que uno encontrado en pruebas.', 'Crosby sostuvo que la calidad es gratuita porque se paga sola.']]
  ],
  q: [
    ['Con una tasa de 10% anual, ¿cuánto vale hoy recibir S/ 1210 dentro de 2 años?', 'S/ 1000', ['S/ 1210', 'S/ 1100', 'S/ 990'], '1210 / 1.1² = 1210 / 1.21 = 1000.', 3],
    ['Un proyecto tiene VAN negativo con la tasa exigida. ¿Qué significa?', 'Que crea menos valor que la alternativa que rinde esa tasa', ['Que pierde dinero en todos los años', 'Que su TIR es infinita', 'Que conviene hacerlo'], 'El VAN compara contra el costo de oportunidad expresado en la tasa.', 3],
    ['¿Qué limitación tiene el periodo de recuperación?', 'Ignora lo que ocurre después de recuperar la inversión', ['Siempre es negativo', 'No se puede calcular', 'Considera demasiados años'], 'Dos proyectos con igual recuperación pueden tener valores totales muy distintos.', 3],
    ['¿En qué categoría del costo de la calidad está la capacitación del equipo en pruebas?', 'Prevención', ['Evaluación', 'Falla interna', 'Falla externa'], 'Evita que los defectos se produzcan.', 2],
    ['Una licencia cuesta poco, pero exige dos personas a tiempo completo para operarla. ¿Qué concepto lo captura?', 'El costo total de propiedad', ['El ROI', 'La TIR', 'El periodo de recuperación'], 'Suma todos los costos durante la vida útil.', 2],
    { tf: 'Si la TIR de un proyecto es 18% y la tasa exigida es 12%, el proyecto conviene.', v: true, e: 'Su rendimiento supera la tasa mínima exigida.', l: 2 },
    { tf: 'Para comparar construir contra comprar basta con comparar el costo de desarrollo con el precio de la licencia del primer año.', v: false, e: 'Hay que comparar el costo total en el mismo horizonte y con la misma tasa.', l: 2 },
    { i: 'Inviertes S/ 4800 y ahorras S/ 1200 por mes. ¿Cuántos meses tarda la recuperación?', a: 4, e: '4800 / 1200 = 4 meses.', l: 2 },
    { c: 'Escribe «van(tasa, flujos)»: flujos[0] ocurre hoy y flujos[t] al final del periodo t. Redondea a 2 decimales.', f: 'van', p: ['tasa', 'flujos'], t: [[[0.1, [-1000, 500, 500, 500]], 243.43], [[0.12, [-5000, 1500, 2000, 2500, 1000]], 348.64], [[0, [-100, 50, 50]], 0]], sol: '  let s = 0;\n  for (let t = 0; t < flujos.length; t++) s += flujos[t] / Math.pow(1 + tasa, t);\n  return Math.round(s * 100) / 100;', l: 3 },
    { c: 'Escribe «tir(flujos)» por bisección entre −0.99 y 10, redondeada a 4 decimales.', f: 'tir', p: ['flujos'], t: [[[[-100, 110]], 0.1], [[[-1000, 500, 500, 500]], 0.2338], [[[-5000, 1500, 2000, 2500, 1000]], 0.1532]], sol: '  const van = r => flujos.reduce((s, f, t) => s + f / Math.pow(1 + r, t), 0);\n  let lo = -0.99, hi = 10;\n  for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (van(m) > 0) lo = m; else hi = m; }\n  return Math.round((lo + hi) / 2 * 10000) / 10000;', h: 'Si el VAN con la tasa media es positivo, la TIR es mayor: sube el límite inferior.', l: 4 },
    { c: 'Escribe «periodoRecuperacion(flujos)»: el primer periodo t en que el acumulado deja de ser negativo, o −1 si nunca ocurre.', f: 'periodoRecuperacion', p: ['flujos'], t: [[[[-1000, 400, 400, 400]], 3], [[[-100, 100]], 1], [[[-500, 100, 100]], -1]], sol: '  let acum = 0;\n  for (let t = 0; t < flujos.length; t++) { acum += flujos[t]; if (acum >= 0) return t; }\n  return -1;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var f = R.pick([1100, 1210, 1331, 2000, 5000]), i = R.pick([0.05, 0.1, 0.12]), n = R.int(1, 4), v = f / Math.pow(1 + i, n); g.input(3, '¿Cuál es el valor presente de S/ ' + f + ' recibidos en ' + n + ' año(s) con una tasa de ' + Math.round(i * 100) + '%? Redondea a 2 decimales.', v.toFixed(2), f + ' / (1 + ' + i + ')^' + n + ' = ' + v.toFixed(2) + '.'); });
    g.times(8, function (R) { var inv = R.int(2, 10) * 1000, a = R.int(5, 15) * 100; var acc = -inv, t = 0; while (acc < 0) { t++; acc += a; } g.input(2, 'Inviertes S/ ' + inv + ' y ahorras S/ ' + a + ' por mes. ¿En qué mes se recupera la inversión (primer mes en que el acumulado no es negativo)?', t, 'Se necesita ⌈' + inv + '/' + a + '⌉ = ' + t + ' meses.'); });
    g.times(6, function (R) { var c = R.int(5, 20) * 1000, b = c + R.int(1, 15) * 1000; g.input(2, 'Un proyecto cuesta S/ ' + c + ' y produce beneficios de S/ ' + b + '. ¿Cuál es su ROI en porcentaje? Redondea a 1 decimal.', (100 * (b - c) / c).toFixed(1), '(' + b + ' − ' + c + ')/' + c + ' × 100.'); });
    var cats = [['Capacitar al equipo en diseño seguro', 'Prevención'], ['Ejecutar la suite de pruebas de regresión', 'Evaluación'], ['Corregir un defecto encontrado en el entorno de pruebas', 'Falla interna'], ['Reembolsar a un cliente por un cobro duplicado', 'Falla externa'], ['Hacer revisiones de código', 'Evaluación'], ['Atender llamadas de soporte por un error publicado', 'Falla externa']];
    cats.forEach(function (c) { g.mcq(2, '¿En qué categoría del costo de la calidad está esto? ' + c[0], c[1], ['Prevención', 'Evaluación', 'Falla interna', 'Falla externa'].filter(function (x) { return x !== c[1]; }), 'Prevenir, evaluar, corregir antes de publicar o corregir después.'); });
  },
  checks: [
    ['¿Por qué no se pueden sumar directamente los ahorros de distintos años de un proyecto?', 'Porque el dinero vale distinto en el tiempo; hay que descontar cada flujo al presente con la tasa exigida antes de sumarlos.'],
    ['¿Qué diferencia hay entre el VAN y la TIR como criterio?', 'El VAN dice cuánto valor crea el proyecto en soles de hoy con una tasa dada; la TIR es la tasa que lo hace cero. Para elegir entre proyectos, el VAN es más confiable.'],
    ['¿Qué costos incluirías en el costo total de propiedad de PatioApp?', 'Desarrollo, infraestructura, licencias de terceros, soporte, mantenimiento, capacitación, respaldos, seguridad, migraciones futuras y el tiempo del equipo.'],
    ['Explica la tesis de Crosby de que la calidad es gratuita.', 'Que lo invertido en prevención y evaluación se recupera con creces al reducir los costos de fallas internas y, sobre todo, externas.'],
    ['¿Cómo justificarías ante un gerente automatizar una tarea manual?', 'Calculando la inversión, el ahorro neto periódico, el periodo de recuperación y el VAN, y agregando los beneficios cualitativos como menos errores.']
  ],
  cites: ['Boehm, B. (1981). *Software Engineering Economics*. Prentice Hall.', 'Tockey, S. (2004). *Return on Software: Maximizing the Return on Your Software Investment*. Addison-Wesley.', 'Crosby, P. (1979). *Quality Is Free*. McGraw-Hill.', 'Juran, J. (1951). *Quality Control Handbook*. McGraw-Hill.', 'IEEE Computer Society (2024). *Guide to the Software Engineering Body of Knowledge (SWEBOK), v4.0*. Capítulo Software Engineering Economics.'],
  project: { t: 'Evaluación económica de un proyecto de software',
    goal: 'Evaluar con herramientas financieras una decisión real de software.',
    steps: ['Elige una decisión: construir o comprar un sistema, migrar a la nube o automatizar un proceso manual.', 'Estima todos los flujos de dinero durante 3 años (inversión, costos operativos, ahorros) y documenta tus supuestos.', 'Calcula VAN, TIR, periodo de recuperación y ROI con tus propias funciones.', 'Haz un análisis de sensibilidad: ¿qué pasa si los ahorros son 30% menores o la tasa sube 5 puntos?', 'Redacta una recomendación de una página para un gerente no técnico.'],
    deliver: 'La hoja de supuestos, el código de los cálculos, el análisis de sensibilidad y la recomendación.' },
  hito: ['Calcula el VAN, la TIR y el periodo de recuperación de implantar PatioApp en un patio (desarrollo y operación frente a horas ahorradas).', 'Compara construir PatioApp contra contratar una solución comercial usando el costo total a 3 años con la misma tasa de descuento.']
});

S('eco', 'eco.decide', { title: 'Toma de decisiones de ingeniería',
  ask: '¿Qué técnica o sesgo de decisión se aplica?',
  lesson: `
> **La idea en simple.** Elegir una base de datos, un proveedor de nube o una arquitectura no debería depender de quién habla más fuerte en la reunión ni de la última tecnología de moda. Hay técnicas sencillas para decidir de forma explícita, revisable y honesta, y conocer los sesgos de nuestra mente ayuda a no engañarnos.

## Racionalidad limitada
Herbert Simon, Premio Nobel de Economía en 1978, mostró que las personas no optimizan en el sentido estricto: tenemos información, tiempo y capacidad de cálculo limitados. Propuso el término *satisficing* (combinación de *satisfy* y *suffice*): buscar una opción **suficientemente buena** según criterios definidos, en lugar de la óptima absoluta. En ingeniería es la postura correcta la mayoría de las veces; el arte está en definir bien el "suficiente".

## Matriz de decisión ponderada
Stuart Pugh propuso en 1981 un método de selección de conceptos que hoy se usa en todas las ingenierías:
1. Lista las **alternativas** reales (incluida "no hacer nada" si aplica).
2. Define los **criterios** a partir de los atributos de calidad y del negocio.
3. Asigna un **peso** a cada criterio (que sumen 100%) **antes** de evaluar las alternativas.
4. Puntúa cada alternativa en cada criterio con una escala definida.
5. Calcula la suma ponderada y, sobre todo, **discute los resultados**.
~~~js
const criterios = { costo: 0.30, rendimiento: 0.20, facilidad: 0.25, ecosistema: 0.25 };
const opciones = {
  PostgreSQL: { costo: 5, rendimiento: 4, facilidad: 4, ecosistema: 5 },
  MongoDB:    { costo: 4, rendimiento: 4, facilidad: 4, ecosistema: 4 },
  SQLite:     { costo: 5, rendimiento: 3, facilidad: 5, ecosistema: 3 }
};
for (const [n, p] of Object.entries(opciones))
  console.log(n, Object.entries(criterios).reduce((s, [c, w]) => s + w * p[c], 0).toFixed(2));
~~~
El número no decide solo: si dos opciones quedan a pocas décimas, la matriz dice que ambas son razonables y que conviene mirar otros factores.

## Análisis de sensibilidad
¿Cambia la decisión si un peso o un puntaje cambia un poco? Si la elección se invierte al mover el peso del costo de 30% a 25%, la decisión es **frágil** y hay que discutir ese criterio. Si se mantiene ante cambios razonables, es **robusta**. Probar la sensibilidad es la forma honesta de reconocer que los pesos son juicios, no verdades.

## Valor esperado y árboles de decisión
Cuando hay incertidumbre, cada alternativa tiene resultados posibles con probabilidades. El **valor esperado** suma cada resultado por su probabilidad. Un **árbol de decisión** dibuja las decisiones (cuadrados), los eventos inciertos (círculos) y los resultados, y se resuelve de derecha a izquierda. Ejemplo: migrar ahora tiene 70% de probabilidad de ahorrar S/ 20 000 y 30% de costar S/ 10 000 extra por problemas; su valor esperado es 0.7·20 000 − 0.3·10 000 = S/ 11 000. La alternativa de una prueba piloto previa cuesta dinero, pero reduce la incertidumbre: esa reducción tiene un valor calculable (el **valor de la información**).

## Decisiones reversibles e irreversibles
Jeff Bezos, en su carta a los accionistas de Amazon de 2015, distinguió decisiones **de tipo 1** (puertas de un solo sentido: irreversibles o muy costosas de revertir) y **de tipo 2** (puertas de doble sentido). Las primeras merecen análisis cuidadoso; las segundas deben tomarse rápido y corregirse si salen mal. El error frecuente en organizaciones grandes es tratar todas como de tipo 1. Mary y Tom Poppendieck proponen además decidir en el **último momento responsable**: postergar las decisiones irreversibles hasta tener la información necesaria, sin llegar a que la falta de decisión cause daño.

## Los sesgos que nos engañan
Daniel Kahneman y Amos Tversky publicaron en 1974 en *Science* el artículo *Judgment under Uncertainty: Heuristics and Biases*, que dio origen a toda una disciplina. Kahneman recibió el Nobel de Economía en 2002 y resumió el trabajo en *Thinking, Fast and Slow* (2011). Los sesgos más frecuentes en decisiones técnicas:
- **Anclaje:** el primer número que se menciona ("esto toma dos semanas") arrastra todas las estimaciones posteriores.
- **Confirmación:** buscar solo la evidencia que apoya la opción que ya nos gusta.
- **Costo hundido:** seguir con una tecnología mala "porque ya invertimos mucho".
- **Disponibilidad:** sobrevalorar lo que recordamos con facilidad (la caída reciente y espectacular).
- **Exceso de confianza:** los rangos de nuestras estimaciones son demasiado estrechos.
- **Pensamiento de grupo:** Irving Janis lo describió en 1972; el deseo de consenso suprime las objeciones. Se combate pidiendo que alguien haga de abogado del diablo y recogiendo opiniones por escrito antes de discutir.

## Prácticas para decidir mejor en equipo
- **Premortem:** el psicólogo Gary Klein propuso en 2007 imaginar que el proyecto ya fracasó y pedir a cada persona que escriba por qué. Hace aceptable expresar dudas y descubre riesgos que nadie se atrevía a mencionar.
- **Estimación independiente:** cada persona estima o puntúa por su cuenta antes de ver lo que dijeron los demás, como en el Planning Poker; así se reduce el anclaje.
- **Visión desde afuera:** Kahneman recomienda partir de lo que ocurrió en proyectos parecidos (la "clase de referencia") antes de ajustar por las particularidades del nuestro, porque la visión desde adentro tiende al optimismo.
- **Registro de decisiones:** anotar qué se decidió, con qué información y qué se esperaba permite evaluar después la calidad del proceso y no solo el resultado, que también depende de la suerte.

## Ejemplo resuelto: elegir dónde desplegar PatioApp
Alternativas: plataforma administrada (tipo Vercel o Render), un servidor virtual propio o Kubernetes administrado. Criterios y pesos fijados antes de puntuar: costo 30%, simplicidad de operación 30%, escalabilidad 15%, control 10% y experiencia del equipo 15%. Resultado: la plataforma administrada gana con claridad, y el análisis de sensibilidad muestra que solo pierde si el peso del control sube por encima de 35%. Clasificación: decisión de tipo 2 (se puede migrar después si el código respeta la arquitectura hexagonal). Acción: decidir esta semana, registrar un ADR con la matriz y revisar la decisión cuando el tráfico se multiplique por 10.`,
  links: [['m13.styles', 'las decisiones de arquitectura se documentan en ADR'], ['m12.risk', 'el costo hundido y el costo del retraso guían decisiones'], ['m2.prob', 'el valor esperado se basa en probabilidades']],
  read: 'Kahneman, *Thinking, Fast and Slow*; Kahneman y Tversky (1974); Simon (1956); Poppendieck, *Lean Software Development*.',
  terms: [
    ['Matriz de decisión ponderada', 'tabla que puntúa alternativas en criterios con pesos definidos de antemano y suma los resultados', ['Comparas tres bases de datos según costo, rendimiento y facilidad.', 'Los pesos se fijan antes de puntuar para no sesgar.', 'Pugh propuso un método de este tipo en 1981.']],
    ['Valor esperado', 'suma de los resultados posibles multiplicados por su probabilidad', ['70% de ahorrar 20 000 y 30% de perder 10 000 dan 11 000.', 'Comparas alternativas inciertas con un solo número.', 'Es la base de los árboles de decisión.']],
    ['Árbol de decisión', 'diagrama que representa decisiones, eventos inciertos con sus probabilidades y resultados', ['Decides si hacer un piloto antes de migrar.', 'Se resuelve de derecha a izquierda.', 'Permite calcular el valor de obtener más información.']],
    ['Análisis de sensibilidad', 'estudio de cuánto cambia una decisión al variar sus supuestos', ['Compruebas si la elección se mantiene al cambiar el peso del costo.', 'Calculas el VAN con ahorros 30% menores.', 'Revela si una decisión es frágil o robusta.']],
    ['Decisión reversible', 'decisión que se puede deshacer con poco costo y por eso conviene tomar rápido', ['Elegir una librería de gráficos que se puede reemplazar.', 'Bezos las llamó puertas de doble sentido.', 'Tratarlas como irreversibles paraliza a una organización.']],
    ['Anclaje', 'sesgo por el que el primer número mencionado arrastra las estimaciones posteriores', ['Alguien dice "dos semanas" y todos estiman cerca de eso.', 'El precio inicial de una negociación condiciona el final.', 'Se mitiga estimando por separado antes de compartir.']],
    ['Sesgo de confirmación', 'tendencia a buscar y valorar solo la evidencia que apoya lo que ya creemos', ['Solo lees reseñas positivas de la tecnología que te gusta.', 'Ignoras los benchmarks que contradicen tu elección.', 'Se combate buscando activamente argumentos en contra.']],
    ['Satisfacción suficiente (satisficing)', 'estrategia de elegir la primera opción que cumple criterios definidos, en lugar de buscar la óptima', ['Eliges un proveedor que cumple todos los requisitos sin evaluar cien.', 'Herbert Simon propuso el concepto.', 'Es razonable cuando la información y el tiempo son limitados.']]
  ],
  q: [
    ['¿Por qué los pesos de una matriz de decisión deben fijarse antes de puntuar las alternativas?', 'Para que la preferencia por una opción no influya en los pesos', ['Porque es más rápido', 'Porque la suma debe dar 10', 'No importa el orden'], 'Si se fijan después, es fácil ajustarlos para que gane la favorita.', 3],
    ['Una opción tiene 60% de probabilidad de ganar S/ 10 000 y 40% de perder S/ 5000. ¿Cuál es su valor esperado?', 'S/ 4000', ['S/ 5000', 'S/ 6000', 'S/ 2000'], '0.6·10 000 − 0.4·5000 = 6000 − 2000.', 3],
    ['El equipo sigue con un framework problemático "porque ya invertimos seis meses". ¿Qué sesgo es?', 'Costo hundido', ['Anclaje', 'Disponibilidad', 'Exceso de confianza'], 'Lo ya gastado no debe influir en la decisión futura.', 2],
    ['Según Bezos, ¿cómo deben tratarse las decisiones fácilmente reversibles?', 'Tomarlas rápido y corregirlas si salen mal', ['Analizarlas tanto como las irreversibles', 'Delegarlas siempre a un comité', 'Evitarlas'], 'Son puertas de doble sentido.', 2],
    ['Al cambiar el peso del costo de 30% a 25%, la opción ganadora cambia. ¿Qué indica?', 'Que la decisión es frágil y ese criterio merece discusión', ['Que la matriz está mal calculada', 'Que hay que eliminar el criterio', 'Que ambas opciones son malas'], 'El análisis de sensibilidad muestra la robustez de la elección.', 4],
    { tf: 'El pensamiento de grupo se combate pidiendo opiniones por escrito antes de discutir y designando un abogado del diablo.', v: true, e: 'Así las objeciones no se suprimen por el deseo de consenso.', l: 2 },
    { tf: 'Si una matriz ponderada da 4.31 a una opción y 4.29 a otra, la primera es claramente mejor.', v: false, e: 'Una diferencia tan pequeña está dentro de la incertidumbre de los pesos y puntajes: ambas son razonables.', l: 3 },
    { o: 'Ordena los pasos de una matriz de decisión ponderada.', s: ['Listar las alternativas reales', 'Definir los criterios', 'Asignar los pesos', 'Puntuar cada alternativa en cada criterio', 'Calcular las sumas ponderadas', 'Hacer el análisis de sensibilidad y discutir'], e: 'Los pesos se fijan antes de puntuar.', l: 2 },
    { c: 'Escribe «mejorOpcion(pesos, puntajes)»: pesos es una lista de números y puntajes una lista de listas (una por alternativa). Devuelve el índice de la alternativa con mayor suma ponderada.', f: 'mejorOpcion', p: ['pesos', 'puntajes'], t: [[[[0.5, 0.5], [[3, 5], [4, 4], [5, 2]]], 0], [[[0.2, 0.8], [[5, 1], [1, 5]]], 1], [[[1], [[2], [7], [3]]], 1]], sol: '  let mejor = 0, max = -Infinity;\n  puntajes.forEach((p, i) => { const s = p.reduce((a, x, j) => a + x * pesos[j], 0); if (s > max) { max = s; mejor = i; } });\n  return mejor;', l: 3 },
    { c: 'Escribe «valorEsperado(resultados)» donde cada resultado es [probabilidad, valor].', f: 'valorEsperado', p: ['resultados'], t: [[[[[0.7, 20000], [0.3, -10000]]], 11000], [[[[0.5, 100], [0.5, 0]]], 50], [[[[1, 7]]], 7]], sol: '  return resultados.reduce((s, [p, v]) => s + p * v, 0);', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var p = R.pick([0.2, 0.3, 0.5, 0.6, 0.7, 0.8]), a = R.int(5, 30) * 1000, b = R.int(1, 15) * 1000, ev = Math.round(p * a - (1 - p) * b); g.input(3, 'Una decisión tiene ' + Math.round(p * 100) + '% de probabilidad de ganar S/ ' + a + ' y ' + Math.round((1 - p) * 100) + '% de perder S/ ' + b + '. ¿Cuál es su valor esperado en soles?', ev, p + '·' + a + ' − ' + (1 - p).toFixed(1) + '·' + b + ' = ' + ev + '.'); });
    g.times(6, function (R) { var w1 = R.pick([0.3, 0.4, 0.5, 0.6]), w2 = Math.round((1 - w1) * 10) / 10, a = [R.int(1, 5), R.int(1, 5)], s = w1 * a[0] + w2 * a[1]; g.input(2, 'Con pesos ' + w1 + ' y ' + w2 + ', una alternativa obtiene puntajes ' + a[0] + ' y ' + a[1] + '. ¿Cuál es su suma ponderada? Redondea a 2 decimales.', s.toFixed(2), w1 + '·' + a[0] + ' + ' + w2 + '·' + a[1] + ' = ' + s.toFixed(2) + '.'); });
    var sesgos = [['La primera estimación mencionada en la reunión condiciona todas las demás', 'Anclaje'], ['Solo se leen los artículos que elogian la tecnología elegida', 'Sesgo de confirmación'], ['Se sigue con un proveedor malo porque ya se pagó la implementación', 'Costo hundido'], ['Tras una caída famosa, todos sobrestiman la probabilidad de que vuelva a ocurrir', 'Disponibilidad'], ['Nadie objeta el plan del líder para no romper el buen ambiente', 'Pensamiento de grupo'], ['Las estimaciones con 90% de confianza aciertan solo la mitad de las veces', 'Exceso de confianza']];
    var nombres = sesgos.map(function (s) { return s[1]; });
    sesgos.forEach(function (s) { g.mcq(3, '¿Qué sesgo describe este caso? ' + s[0], s[1], g.R.sample(nombres.filter(function (n) { return n !== s[1]; }), 3), 'Kahneman y Tversky catalogaron estos sesgos del juicio.'); });
  },
  checks: [
    ['¿Qué propuso Herbert Simon con el concepto de satisficing?', 'Que, con información y tiempo limitados, conviene elegir una opción suficientemente buena según criterios definidos en lugar de buscar la óptima absoluta.'],
    ['¿Para qué sirve el análisis de sensibilidad en una matriz de decisión?', 'Para ver si la decisión cambia con variaciones razonables de pesos o puntajes; indica si es robusta o frágil y qué criterio discutir.'],
    ['Calcula el valor esperado de 80% de ahorrar 5000 y 20% de perder 2000.', '0.8·5000 − 0.2·2000 = 4000 − 400 = 3600.'],
    ['Da un ejemplo de decisión de tipo 1 y otra de tipo 2 en PatioApp.', 'Tipo 1: elegir un formato de datos que compartirán sistemas externos por años. Tipo 2: elegir la librería de gráficos del panel, que se puede reemplazar.'],
    ['¿Cómo reduces el anclaje y el pensamiento de grupo en una reunión de estimación?', 'Pidiendo estimaciones individuales y por escrito antes de mostrarlas, y asignando a alguien la tarea de argumentar en contra.']
  ],
  cites: ['Kahneman, D. y Tversky, A. (1974). Judgment under Uncertainty: Heuristics and Biases. *Science*, 185(4157).', 'Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.', 'Simon, H. (1956). Rational Choice and the Structure of the Environment. *Psychological Review*, 63(2).', 'Pugh, S. (1991). *Total Design: Integrated Methods for Successful Product Engineering*. Addison-Wesley.', 'Bezos, J. (2016). *Carta a los accionistas de Amazon correspondiente a 2015*.', 'Janis, I. (1972). *Victims of Groupthink*. Houghton Mifflin.', 'Klein, G. (2007). Performing a Project Premortem. *Harvard Business Review*, 85(9).'],
  project: { t: 'Decisión técnica documentada',
    goal: 'Tomar una decisión técnica real de forma explícita, revisable y robusta.',
    steps: ['Elige una decisión pendiente (framework, base de datos, proveedor de despliegue) y lista al menos tres alternativas.', 'Define criterios y pesos antes de investigar las alternativas, y pide a otra persona que haga lo mismo por separado.', 'Puntúa con evidencia (documentación, pruebas de concepto, benchmarks) y calcula las sumas ponderadas.', 'Haz el análisis de sensibilidad y clasifica la decisión como reversible o irreversible.', 'Escribe el ADR con la matriz, los supuestos, los sesgos que intentaste evitar y la condición para revisarla.'],
    deliver: 'La matriz con los datos de ambas personas, el análisis de sensibilidad y el ADR.' },
  hito: ['Elige la plataforma de despliegue de PatioApp con una matriz de decisión ponderada y un análisis de sensibilidad de los pesos.', 'Clasifica las decisiones pendientes de PatioApp en reversibles e irreversibles y registra las irreversibles en ADR.']
});
})();
