(function () {
var S = SDC.S;

S('hci', 'hci.research', { title: 'Investigación con usuarios',
  ask: '¿Qué método de investigación con usuarios conviene aquí y cómo se aplica?',
  lesson: `
> **La idea en simple.** La mayoría de los productos fracasa no porque el código esté mal, sino porque resuelve un problema que nadie tiene, o lo resuelve de una forma que no encaja en la vida real de las personas. La investigación con usuarios es el conjunto de métodos para **averiguar en lugar de suponer**: quiénes son, qué intentan lograr, qué les estorba, y si lo que diseñamos de verdad les sirve. No requiere un laboratorio: requiere método, honestidad y escuchar más de lo que se habla.

## Qué preguntar y a quién
Antes de elegir un método, hay que definir **qué decisión** ayudará a tomar la investigación. "Conocer a los usuarios" es demasiado vago; "decidir si el ingreso de unidades debe empezar por la placa o por el cliente" es una pregunta que se puede responder. Christian Rohrer (2014) propuso un mapa útil de los métodos según dos ejes:
| | Lo que la gente **dice** | Lo que la gente **hace** |
|---|---|---|
| **Por qué y cómo** (cualitativo) | entrevistas, grupos focales | observación en contexto, pruebas de usabilidad |
| **Cuánto y cuántos** (cuantitativo) | encuestas | analítica de uso, pruebas A/B |
La lección principal del cuadro: lo que las personas **dicen** que hacen y lo que **hacen** suelen ser distintos. Si alguien dice "siempre reviso la placa dos veces" y la observación muestra que la mira una vez, de reojo, mientras habla con el chofer, el diseño debe partir de lo segundo.

## Entrevistas
Una entrevista de investigación no es una venta ni una encuesta oral: es una conversación guiada para entender la experiencia de la persona. Buenas prácticas:
1. **Preguntar por hechos pasados concretos**, no por opiniones o futuros hipotéticos: "Cuéntame la última vez que un camión llegó sin reserva" en lugar de "¿Te gustaría poder reservar en línea?". A la pregunta hipotética casi todos dicen que sí, por cortesía; el hecho pasado revela si el problema existe y cuánto duele. Rob Fitzpatrick lo llamó *The Mom Test* (2013): preguntas cuya respuesta no cambia aunque la persona quiera ser amable contigo.
2. **Preguntas abiertas** ("¿Cómo...?", "¿Qué pasó después?") y **silencio**: después de una respuesta, esperar unos segundos suele traer lo más interesante.
3. **No sugerir la respuesta** ni defender tu idea. Si dicen que algo es confuso, la respuesta correcta es "¿Qué parte?", no "Ah, pero es que...".
4. **Pedir que muestren:** "¿Me enseñas cómo lo haces?" convierte la entrevista en observación.
5. **Registrar** con permiso, tomar notas textuales y separar lo que se dijo de lo que se interpreta.
Con entre 5 y 10 entrevistas por tipo de usuario suelen aparecer los patrones principales; cuando las nuevas entrevistas ya no traen sorpresas, se alcanzó la **saturación**.

## Observación en contexto
Como viste en el diseño centrado en el usuario, la **investigación contextual** observa a la persona en su lugar de trabajo, mientras trabaja. Es el método más revelador para software de operaciones: muestra interrupciones, atajos, papeles pegados al monitor, el entorno físico (luz, ruido, guantes, prisa) y las herramientas paralelas (WhatsApp, cuadernos, calculadoras) que el sistema no contempla. Una hora en la garita de un patio enseña más sobre el diseño de la pantalla de ingreso que diez reuniones en la oficina.

## Encuestas
Las encuestas sirven para **medir** cuánto se repite algo que ya se entiende cualitativamente, no para descubrir. Errores comunes: preguntas que sugieren la respuesta ("¿Qué tan útil le parece la nueva función?"), preguntas dobles ("¿Es rápido y fácil?"), escalas desbalanceadas, encuestas demasiado largas y muestras sesgadas (solo responden los muy satisfechos o los muy molestos). Escalas estandarizadas como **SUS** (usabilidad) o el **NPS** (*Net Promoter Score*, de Fred Reichheld, 2003, muy usado en negocios aunque criticado por los investigadores por su poca precisión) permiten comparar en el tiempo.

## Analítica y experimentos
Los datos de uso muestran lo que la gente **hace** a escala: qué pantallas visitan, dónde abandonan un formulario, cuánto tardan. Un **embudo** (*funnel*) mide cuántos usuarios llegan a cada paso de un flujo ("abrió el formulario → ingresó la placa → eligió espacio → confirmó") y revela dónde se pierden. Una **prueba A/B** muestra dos versiones al azar a grupos distintos y compara una métrica; es la forma más confiable de saber si un cambio causa una mejora, siempre que la muestra sea suficiente y se defina la métrica **antes** de mirar los resultados (lo viste en experimentación del curso de economía del software). La analítica dice **qué** pasa; para saber **por qué**, se vuelve a los métodos cualitativos.

## De los datos a decisiones
La investigación solo sirve si cambia algo. Herramientas para sintetizar:
- **Diagrama de afinidad:** cada observación en una nota adhesiva, agrupadas por similitud hasta que emergen temas.
- **Personas:** perfiles arquetípicos basados en datos reales (no inventados), con objetivos, contexto y frustraciones: "Rosa, operadora de garita en Lurín, turno noche, 6 años en el puesto, prioriza que el camión no espere". Alan Cooper las popularizó en *The Inmates Are Running the Asylum* (1999). Su riesgo es convertirse en ficción decorativa: deben citar la evidencia de la que salen.
- **Mapa del recorrido** (*journey map*): las etapas que vive una persona para lograr un objetivo (desde que el chofer llega hasta que sale con su comprobante), con sus acciones, emociones y puntos de dolor en cada etapa, y qué parte toca el sistema.
- **Trabajos por hacer** (*jobs to be done*, de Clayton Christensen): enfocarse en el progreso que la persona intenta lograr ("salir del patio rápido con la unidad y el comprobante correcto"), no en las características del producto.

## Ética de la investigación
Investigar con personas implica responsabilidades: **consentimiento informado** (explicar para qué es, qué se grabará y que pueden retirarse), **privacidad** (anonimizar notas y grabaciones, guardarlas con seguridad y borrarlas cuando ya no se necesiten, conforme a la Ley 29733), **no causar daño** (no poner en evidencia a un trabajador ante su jefe con lo que dijo en confianza) y **compensar** el tiempo de los participantes cuando corresponde. Con trabajadores de una empresa, hay que dejar claro que se evalúa el sistema, no a ellos.

## Ejemplo resuelto: ¿reservas en línea para camiones?
La gerencia de PatioApp propone una función de reservas en línea para que los transportistas agenden su llegada.
1. **Pregunta de decisión:** ¿los transportistas usarían reservas y reducirían las esperas en la puerta?
2. **Entrevistas** con 8 transportistas sobre la última vez que esperaron: la espera promedio que relatan es de 25 minutos, pero la causa principal no es la falta de reserva, sino que el **operador no encuentra la documentación** de la unidad y la busca en WhatsApp.
3. **Observación** de dos turnos en la garita de Callao: se confirma; además, el 30 % de las llegadas son de unidades que vienen de otra sede sin aviso.
4. **Encuesta** corta a 60 transportistas para medir: el 70 % llega sin poder anticipar la hora exacta (depende del tráfico y del puerto), lo que hace poco útil una reserva con hora fija.
5. **Decisión:** en lugar de reservas, se construye el **aviso de llegada** desde el celular (con los documentos adjuntos) y la transferencia entre sedes registrada en el sistema. Una prueba A/B en dos sedes durante un mes muestra que la espera promedio baja de 24 a 11 minutos en la sede con la nueva función.
Tres semanas de investigación evitaron construir durante tres meses una función que no habría resuelto el problema real.`,
  links: [['hci.ucd', 'diseño centrado en el usuario e investigación contextual'], ['hci.usab', 'pruebas de usabilidad y SUS'], ['m11.elicit', 'técnicas de obtención de requisitos']],
  read: 'Portigal, *Interviewing Users* (2.ª ed., 2023); Goodman, Kuniavsky y Moed, *Observing the User Experience* (2.ª ed., 2012); Fitzpatrick, *The Mom Test* (2013).',
  terms: [
    ['Investigación con usuarios', 'conjunto de métodos para conocer las necesidades, el contexto y el comportamiento de las personas que usarán un producto', ['Entrevistas.', 'Observación.', 'Analítica.']],
    ['Entrevista de investigación', 'conversación guiada que busca hechos concretos de la experiencia de una persona', ['Hechos pasados.', 'Preguntas abiertas.', 'The Mom Test.']],
    ['Saturación', 'punto en el que nuevas entrevistas ya no aportan hallazgos distintos', ['5 a 10 por perfil.', 'Patrones.', 'Cualitativo.']],
    ['Embudo', 'medición de cuántos usuarios avanzan por cada paso de un flujo', ['Funnel.', 'Abandono.', 'Analítica.']],
    ['Prueba A/B', 'experimento que compara dos versiones asignadas al azar midiendo una métrica definida de antemano', ['Causalidad.', 'Muestra suficiente.', 'Métrica previa.']],
    ['Persona', 'perfil arquetípico de usuario basado en datos de investigación', ['Cooper, 1999.', 'Objetivos y contexto.', 'No ficción.']],
    ['Mapa del recorrido', 'representación de las etapas, acciones, emociones y puntos de dolor de una persona al lograr un objetivo', ['Journey map.', 'Puntos de dolor.', 'Del chofer a la salida.']],
    ['Consentimiento informado', 'aceptación voluntaria de participar después de conocer el propósito, el uso de los datos y el derecho a retirarse', ['Ética.', 'Grabaciones.', 'Ley 29733.']]
  ],
  q: [
    ['¿Qué pregunta de entrevista da información más confiable?', '"Cuéntame la última vez que un camión llegó sin reserva"', ['"¿Te gustaría poder reservar en línea?"', '"¿Verdad que sería útil una app?"', '"¿Usarías esta función todos los días?"'], 'Hechos pasados, no hipótesis.', 2],
    ['Un operador dice que revisa la placa dos veces, pero la observación muestra que la mira una vez. ¿En qué se basa el diseño?', 'En lo observado: lo que la gente hace', ['En lo que dijo', 'En el promedio de ambos', 'En la opinión de la gerencia'], 'Decir y hacer difieren.', 2],
    ['¿Para qué sirve mejor una encuesta?', 'Para medir cuánto se repite algo que ya se entiende cualitativamente', ['Para descubrir problemas desconocidos', 'Para reemplazar la observación', 'Para probar el código'], 'Cuantificar, no descubrir.', 3],
    ['¿Qué revela un embudo de conversión?', 'En qué paso de un flujo abandonan los usuarios', ['La opinión de los usuarios', 'El código fuente', 'El costo del servidor'], 'Lo que hacen a escala.', 2],
    ['¿Qué riesgo tienen las personas como herramienta?', 'Convertirse en ficción decorativa sin base en datos', ['Ser demasiado precisas', 'Ser ilegales', 'Requerir código'], 'Deben citar la evidencia.', 3],
    ['¿Cuándo se define la métrica de una prueba A/B?', 'Antes de ver los resultados', ['Después, eligiendo la que mejor salga', 'Nunca', 'Solo si gana la versión B'], 'Evita elegir a conveniencia.', 3],
    ['¿Qué cuidado ético es clave al entrevistar a trabajadores de una empresa cliente?', 'Dejar claro que se evalúa el sistema, no a ellos, y no exponer lo dicho en confianza', ['Grabar sin avisar para que sean naturales', 'Compartir las grabaciones con su jefe', 'No pedir consentimiento si es interno'], 'Ética de la investigación.', 4],
    { tf: 'A una pregunta hipotética como "¿usarías esta función?", la mayoría responde con honestidad lo que realmente hará.', v: false, e: 'Por cortesía suelen decir que sí; se pregunta por hechos.', l: 2 },
    { tf: 'La analítica muestra qué pasa; para entender por qué, se recurre a métodos cualitativos.', v: true, e: 'Se complementan.', l: 1 },
    { c: 'Escribe «embudo(pasos)»: recibe cantidades de usuarios por paso [1000, 600, 450, 300] y devuelve el porcentaje que avanza en cada transición, redondeado a entero ([60, 75, 67]).', f: 'embudo', p: ['pasos'], t: [[[[1000, 600, 450, 300]], [60, 75, 67]], [[[50, 50]], [100]], [[[10]], []]], sol: '  const r = [];\n  for (let i = 1; i < pasos.length; i++) r.push(Math.round(pasos[i] / pasos[i - 1] * 100));\n  return r;', l: 2 },
    { c: 'Escribe «peorPaso(pasos)»: devuelve el índice de la transición con mayor abandono (1 para la transición del paso 0 al 1, etc.).', f: 'peorPaso', p: ['pasos'], t: [[[[1000, 600, 450, 300]], 1], [[[100, 90, 30, 25]], 2]], sol: '  let mejor = 1, peor = 2;\n  for (let i = 1; i < pasos.length; i++) { const t = pasos[i] / pasos[i - 1]; if (t < peor) { peor = t; mejor = i; } }\n  return mejor;', l: 3 },
    { c: 'Escribe «agruparNotas(notas)»: recibe notas { tema, texto } y devuelve un objeto con la cantidad de notas por tema, como un diagrama de afinidad.', f: 'agruparNotas', p: ['notas'], t: [[[[{ tema: 'documentos', texto: 'a' }, { tema: 'espera', texto: 'b' }, { tema: 'documentos', texto: 'c' }]], { documentos: 2, espera: 1 }], [[[]], {}]], sol: '  const r = {};\n  for (const n of notas) r[n.tema] = (r[n.tema] || 0) + 1;\n  return r;', l: 1 }
  ],
  gen: function (g) {
    var me = [['Entender por qué los operadores anotan placas en un cuaderno', 'Observación en contexto'], ['Medir qué porcentaje de 500 transportistas llega sin hora fija', 'Encuesta'], ['Saber en qué paso del formulario abandonan los usuarios', 'Analítica (embudo)'], ['Comprobar si un botón nuevo reduce el tiempo de salida', 'Prueba A/B'], ['Conocer la experiencia de la última vez que algo salió mal', 'Entrevista'], ['Ver si las personas logran completar una tarea con el prototipo', 'Prueba de usabilidad']];
    var op = ['Observación en contexto', 'Encuesta', 'Analítica (embudo)', 'Prueba A/B', 'Entrevista', 'Prueba de usabilidad'];
    me.forEach(function (m) { g.mcq(2, '¿Qué método conviene? ' + m[0], m[1], op.filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Elegir el método según la pregunta.'); });
    var pr = [['¿Te gustaría una app para reservar?', 'Mala: hipotética'], ['Cuéntame la última vez que tuviste que esperar en la puerta', 'Buena: hecho pasado'], ['¿Verdad que el sistema actual es lento?', 'Mala: sugiere la respuesta'], ['¿Qué hiciste después?', 'Buena: abierta'], ['¿Es rápido y fácil de usar?', 'Mala: doble']];
    pr.forEach(function (p) { g.mcq(2, 'Evalúa la pregunta de entrevista: "' + p[0] + '"', p[1], ['Mala: hipotética', 'Buena: hecho pasado', 'Mala: sugiere la respuesta', 'Buena: abierta', 'Mala: doble'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Preguntas de entrevista.'); });
    g.times(4, function (R) { var a = R.int(500, 1000), b = Math.round(a * R.int(40, 90) / 100); g.input(2, 'De ' + a + ' usuarios que abren el formulario, ' + b + ' lo confirman. ¿Qué porcentaje lo completa? Redondea al entero.', Math.round(b / a * 100), 'Completados entre iniciados por 100.'); });
  },
  checks: [
    ['¿Por qué importa distinguir lo que la gente dice de lo que hace?', 'Porque suelen diferir; los métodos de comportamiento (observación, analítica) corrigen lo que las personas creen o declaran.'],
    ['Describe tres buenas prácticas de una entrevista de investigación.', 'Preguntar por hechos pasados concretos, usar preguntas abiertas y silencio, no sugerir respuestas y pedir que muestren.'],
    ['¿Cuándo usar encuestas, analítica y pruebas A/B?', 'Encuestas para cuantificar lo ya entendido; analítica para ver comportamiento a escala; A/B para probar si un cambio causa una mejora.'],
    ['¿Cómo se convierten los hallazgos en decisiones y qué cuidados éticos hay?', 'Con diagramas de afinidad, personas basadas en datos, mapas del recorrido y trabajos por hacer; con consentimiento, privacidad y sin exponer a los participantes.']
  ],
  cites: ['Rohrer, C. (2014). When to Use Which User-Experience Research Methods. Nielsen Norman Group.', 'Beyer, H. y Holtzblatt, K. (1998). *Contextual Design*. Morgan Kaufmann.', 'Cooper, A. (1999). *The Inmates Are Running the Asylum*. Sams.', 'Fitzpatrick, R. (2013). *The Mom Test*. CreateSpace.', 'Portigal, S. (2023). *Interviewing Users* (2.ª ed.). Rosenfeld Media.', 'Christensen, C. y otros (2016). Know Your Customers\' Jobs to Be Done. *Harvard Business Review*, 94(9).'],
  project: { t: 'Investigar antes de construir',
    goal: 'Planificar y realizar una investigación con usuarios que informe una decisión de diseño concreta.',
    steps: ['Define una pregunta de decisión sobre un producto real o propuesto.', 'Elige dos métodos complementarios (uno de lo que dicen y otro de lo que hacen) y escribe la guía de entrevista u observación.', 'Realiza al menos cinco entrevistas u observaciones con consentimiento informado.', 'Sintetiza con un diagrama de afinidad y construye una persona y un mapa del recorrido basados en la evidencia.', 'Escribe la recomendación de diseño y cómo medirías su efecto (embudo o prueba A/B).'],
    deliver: 'El plan, las notas anonimizadas, la síntesis y la recomendación.' },
  hito: ['Observa un turno de garita y entrevista a tres operadores para mapear el recorrido de ingreso y salida de PatioApp.', 'Define el embudo del formulario de ingreso de PatioApp e identifica el paso con mayor abandono.']
});
SDC.after('hci.research', 'hci.ucd');

S('hci', 'hci.visual', { title: 'Diseño visual y de información',
  ask: '¿Qué principio de diseño visual explica o mejora esta pantalla?',
  lesson: `
> **La idea en simple.** Antes de leer una sola palabra, el ojo ya decidió qué mirar primero, qué elementos van juntos y si la pantalla parece confiable. El diseño visual no es decoración: es organizar la información para que se entienda rápido y sin esfuerzo. Un puñado de principios (jerarquía, agrupación, alineación, contraste, tipografía, color y espacio) explican por qué unas pantallas se leen solas y otras agotan.

## La percepción agrupa: los principios de la Gestalt
A principios del siglo XX, los psicólogos de la Gestalt (Max Wertheimer, Wolfgang Köhler, Kurt Koffka) describieron cómo el cerebro organiza lo que ve en conjuntos. Sus principios guían el diseño de interfaces:
- **Proximidad:** lo que está cerca se percibe como un grupo. Una etiqueta debe estar más cerca de su campo que del campo anterior; si no, el formulario se lee mal.
- **Semejanza:** lo que se parece (color, forma, tamaño) se percibe como relacionado. Todos los botones de acción principal con el mismo estilo; los enlaces, con otro.
- **Región común:** lo encerrado en un mismo fondo o borde forma un grupo, como una tarjeta.
- **Continuidad y alineación:** el ojo sigue líneas y bordes alineados; los elementos alineados se perciben ordenados.
- **Figura y fondo:** distinguimos lo que está delante (un diálogo) de lo que está detrás (la página oscurecida).
- **Cierre:** completamos formas incompletas, lo que permite íconos simples.
La proximidad es la herramienta más poderosa y la más ignorada: **el espacio en blanco agrupa y separa** sin necesidad de líneas ni cajas.

## Jerarquía visual
Una pantalla debe responder en un segundo "¿qué es esto y qué hago aquí?". La **jerarquía visual** ordena los elementos por importancia usando tamaño, peso tipográfico, color, contraste y posición. Lo más importante es lo más grande o lo más contrastado, y aparece arriba o a la izquierda (en idiomas que se leen de izquierda a derecha). Una prueba útil es **entrecerrar los ojos**: lo que sigue visible es lo que domina. Si todo está en negrita, nada lo está. Los estudios de seguimiento ocular de Nielsen Norman Group (2006) describieron el **patrón en F** con el que la gente escanea páginas de texto: dos líneas horizontales arriba y una bajada por la izquierda. Por eso los títulos y las primeras palabras de cada línea cargan el significado.

## Tipografía
El texto es la mayor parte de casi cualquier interfaz. Reglas que funcionan:
- **Tamaño base** de 16 píxeles o más para texto de lectura en pantalla; en móvil, nunca menos.
- **Largo de línea** de unos 45 a 75 caracteres; líneas más largas cansan y hacen perder el renglón.
- **Interlineado** de 1,4 a 1,6 veces el tamaño para párrafos.
- **Pocas familias** (una o dos) y una **escala** de tamaños consistente (por ejemplo, 12, 14, 16, 20, 24, 32), en lugar de tamaños arbitrarios.
- **Cifras tabulares** (todas del mismo ancho) en tablas de montos y horas, para que las columnas se alineen («font-variant-numeric: tabular-nums»), y alineación a la **derecha** de los números para comparar magnitudes.
- Las fuentes del sistema («system-ui») cargan al instante y se leen bien; una fuente propia agrega identidad a cambio de peso.

## Color
El color comunica, pero tiene trampas:
- **No depender solo del color** para transmitir información (WCAG 1.4.1): alrededor del 8 % de los hombres y el 0,5 % de las mujeres de ascendencia europea tienen alguna forma de daltonismo, la mayoría con dificultad para distinguir rojo y verde. Un estado "vencido" en rojo debe llevar también un ícono o un texto.
- **Contraste** suficiente entre texto y fondo: al menos 4,5 a 1 para texto normal y 3 a 1 para texto grande y elementos gráficos (WCAG AA), como viste en accesibilidad.
- **Significado consistente:** si el rojo significa error, no se usa para el botón de guardar. Los colores semánticos (éxito, advertencia, error, información) se definen una vez y se respetan.
- **Pocos colores de acento:** una paleta neutra (grises) para la estructura y un color principal para las acciones. Un color fuerte en todas partes deja de llamar la atención.
- El **modo oscuro** no es invertir colores: se usan grises oscuros (no negro puro), se reduce la saturación de los acentos y se vuelven a verificar los contrastes.

## Espacio y retícula
Una **retícula** (*grid*) de columnas y un sistema de **espaciado** con múltiplos de una unidad (por ejemplo, 4 u 8 píxeles: 8, 16, 24, 32) dan orden sin esfuerzo: los elementos se alinean, los márgenes son coherentes y las decisiones dejan de ser arbitrarias. El espaciado también expresa relaciones: poco espacio entre una etiqueta y su campo, más entre campos, aún más entre secciones. La regla del "espacio interno menor que el externo" (un grupo tiene menos espacio dentro que alrededor) hace que la agrupación se lea sola.

## Visualizar datos con honestidad
Las pantallas de operaciones están llenas de números. Edward Tufte, en *The Visual Display of Quantitative Information* (1983), propuso maximizar la **proporción de tinta de datos**: que la mayor parte de lo que se dibuja sea información, no adornos (sombras 3D, rejillas pesadas, fondos). Recomendaciones prácticas:
- Elegir el gráfico según la pregunta: **barras** para comparar categorías (ocupación por sede), **líneas** para tendencias en el tiempo (ingresos por día), **tablas** cuando se necesitan los valores exactos. Los gráficos de torta solo funcionan con dos o tres partes; con más, las barras se comparan mucho mejor, como mostraron William Cleveland y Robert McGill (1984) al medir qué codificaciones visuales percibimos con más precisión (posición sobre una escala común, primero; ángulos y áreas, mucho peor).
- Las barras **empiezan en cero**; cortar el eje exagera diferencias pequeñas.
- **Etiquetar directamente** las series en lugar de obligar a buscar en una leyenda.
- Mostrar el **contexto**: comparación con el mes anterior o la meta, no una cifra suelta.

## Sistemas de diseño
Cuando un producto crece y varios equipos diseñan pantallas, la consistencia se pierde si cada uno decide colores, tamaños y componentes. Un **sistema de diseño** reúne en un solo lugar los **tokens** (colores, tipografía, espaciado, radios, sombras con nombre: «color-accion», «espacio-3»), los **componentes** reutilizables (botón, campo, tabla, diálogo) con sus estados y reglas de uso, y las pautas de redacción y accesibilidad. Ejemplos públicos: Material Design de Google (2014), Carbon de IBM, Fluent de Microsoft, el GOV.UK Design System del gobierno británico. Brad Frost propuso el **diseño atómico** (2013): construir de átomos (botones, etiquetas) a moléculas (un campo con su etiqueta y su error), organismos (un formulario), plantillas y páginas. Para el equipo de desarrollo, un sistema de diseño es también una biblioteca de componentes con código.

## Ejemplo resuelto: la tabla de unidades en el patio
La pantalla principal de PatioApp muestra una tabla con 200 unidades, todas las columnas en el mismo tamaño y peso, montos alineados a la izquierda, filas vencidas en rojo y botones de cinco colores.
1. **Jerarquía:** la placa (lo que el operador busca) pasa a negrita y un tamaño mayor; las columnas secundarias, a gris medio. Arriba, tres cifras resumen: unidades en patio, ocupación de la sede y estadías que vencen hoy.
2. **Alineación:** montos y días a la derecha con cifras tabulares; fechas en un formato corto y consistente («13/11 08:40»).
3. **Color con significado:** las vencidas llevan un ícono de reloj y el texto "Vencida", además del color; los botones se reducen a uno principal ("Registrar salida") y acciones secundarias en un menú.
4. **Agrupación:** se aumenta el espacio entre filas de grupos (por zona del patio) y se elimina la rejilla vertical; la proximidad hace el trabajo.
5. **Contraste:** el gris claro de las columnas secundarias tenía un contraste de 2,8 a 1; se oscurece hasta 4,6 a 1.
6. **Resultado:** en una prueba con cinco operadores, el tiempo para encontrar una placa dada baja de 9 a 4 segundos, y nadie confunde una unidad vencida con una normal.`,
  links: [['hci.a11y', 'contraste y no depender del color'], ['m9.front', 'CSS y el diseño adaptable'], ['hci.usab', 'medir la mejora con pruebas']],
  read: 'Williams, *The Non-Designer\'s Design Book* (4.ª ed., 2014); Tufte, *The Visual Display of Quantitative Information* (2.ª ed., 2001); Wathan y Schoger, *Refactoring UI* (2018).',
  terms: [
    ['Principios de la Gestalt', 'leyes de la percepción que describen cómo el cerebro agrupa elementos visuales', ['Proximidad.', 'Semejanza.', 'Región común.']],
    ['Proximidad', 'principio por el que los elementos cercanos se perciben como un grupo', ['Etiqueta junto a su campo.', 'Espacio en blanco.', 'Sin cajas.']],
    ['Jerarquía visual', 'orden de importancia que comunican el tamaño, el peso, el color y la posición', ['Entrecerrar los ojos.', 'Patrón en F.', 'Lo principal primero.']],
    ['Escala tipográfica', 'conjunto limitado y consistente de tamaños de texto', ['12, 14, 16, 20, 24.', 'Consistencia.', 'Tokens.']],
    ['Cifras tabulares', 'números de ancho fijo que se alinean en columnas', ['tabular-nums.', 'Montos.', 'Tablas.']],
    ['Proporción de tinta de datos', 'parte de lo dibujado en un gráfico que representa información', ['Tufte, 1983.', 'Sin adornos.', 'Gráficos honestos.']],
    ['Sistema de diseño', 'conjunto de tokens, componentes y pautas que asegura la consistencia de un producto', ['Material Design.', 'GOV.UK.', 'Biblioteca de componentes.']],
    ['Token de diseño', 'valor de diseño con nombre, como un color o un espaciado, usado en todo el producto', ['color-accion.', 'espacio-3.', 'Tema oscuro.']]
  ],
  q: [
    ['Una etiqueta está más cerca del campo anterior que del suyo. ¿Qué principio se viola?', 'Proximidad', ['Cierre', 'Figura y fondo', 'Continuidad'], 'Lo cercano se agrupa.', 2],
    ['¿Qué prueba rápida muestra qué domina una pantalla?', 'Entrecerrar los ojos y ver qué sigue visible', ['Leerla en voz alta', 'Contar los colores', 'Medir el tamaño del archivo'], 'Jerarquía visual.', 1],
    ['¿Cómo se alinean los montos en una tabla?', 'A la derecha, con cifras tabulares', ['Centrados', 'A la izquierda con fuente proporcional', 'En cursiva'], 'Para comparar magnitudes.', 2],
    ['Un estado "vencido" se muestra solo en rojo. ¿Qué problema tiene?', 'Las personas con daltonismo pueden no distinguirlo; falta un ícono o texto', ['Ninguno', 'El rojo no existe en CSS', 'Es demasiado grande'], 'No depender solo del color.', 2],
    ['¿Qué gráfico conviene para comparar la ocupación de seis sedes?', 'Barras', ['Torta', 'Gráfico 3D', 'Líneas'], 'Posición sobre una escala común.', 2],
    ['¿Por qué las barras deben empezar en cero?', 'Porque cortar el eje exagera visualmente las diferencias', ['Por estética', 'Porque lo exige HTML', 'No es necesario'], 'Visualización honesta.', 3],
    ['¿Qué aporta un sistema de diseño a un producto con varios equipos?', 'Consistencia mediante tokens, componentes y pautas compartidas', ['Más colores distintos', 'Que cada equipo decida su estilo', 'Eliminar la accesibilidad'], 'Material, Carbon, GOV.UK.', 3],
    { tf: 'Si todo el texto importante está en negrita, la jerarquía visual mejora.', v: false, e: 'Si todo destaca, nada destaca.', l: 1 },
    { tf: 'Un largo de línea de 45 a 75 caracteres facilita la lectura de párrafos.', v: true, e: 'Líneas más largas cansan.', l: 2 },
    { c: 'Escribe «enEscala(tamano, escala)»: devuelve el valor de la escala más cercano al tamaño pedido (en empate, el menor).', f: 'enEscala', p: ['tamano', 'escala'], t: [[[15, [12, 14, 16, 20, 24]], 14], [[19, [12, 14, 16, 20, 24]], 20], [[30, [12, 16, 24, 32]], 32]], sol: '  return escala.reduce((m, v) => Math.abs(v - tamano) < Math.abs(m - tamano) ? v : m);', l: 2 },
    { c: 'Escribe «espaciado(n, base)»: devuelve el espaciado del paso n en un sistema de múltiplos de la base (n × base), y 0 si n es negativo.', f: 'espaciado', p: ['n', 'base'], t: [[[3, 8], 24], [[0, 4], 0], [[-1, 8], 0]], sol: '  return n < 0 ? 0 : n * base;', l: 1 },
    { c: 'Escribe «caracteresPorLinea(anchoPx, tamanoPx)»: estima los caracteres por línea suponiendo que un carácter mide la mitad del tamaño de la fuente; redondea hacia abajo.', f: 'caracteresPorLinea', p: ['anchoPx', 'tamanoPx'], t: [[[640, 16], 80], [[480, 16], 60], [[1200, 16], 150]], sol: '  return Math.floor(anchoPx / (tamanoPx / 2));', l: 1 }
  ],
  gen: function (g) {
    var ge = [['Las etiquetas quedan cerca de su campo y lejos de los demás', 'Proximidad'], ['Todos los botones principales tienen el mismo color', 'Semejanza'], ['Una tarjeta con fondo propio agrupa sus datos', 'Región común'], ['Los elementos alineados a un mismo borde se perciben ordenados', 'Continuidad'], ['Un diálogo destaca sobre la página oscurecida', 'Figura y fondo'], ['Un ícono de círculo incompleto se lee como círculo', 'Cierre']];
    ge.forEach(function (x) { g.mcq(2, '¿Qué principio de la Gestalt se aplica? ' + x[0], x[1], ['Proximidad', 'Semejanza', 'Región común', 'Continuidad', 'Figura y fondo', 'Cierre'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Principios de la Gestalt.'); });
    var gr = [['Comparar la ocupación de seis sedes', 'Barras'], ['Ver la tendencia de ingresos diarios del mes', 'Líneas'], ['Consultar el monto exacto de cada estadía', 'Tabla'], ['Mostrar la proporción de dos tipos de unidad', 'Torta (solo con dos o tres partes)']];
    gr.forEach(function (x) { g.mcq(2, '¿Qué visualización conviene? ' + x[0], x[1], ['Barras', 'Líneas', 'Tabla', 'Torta (solo con dos o tres partes)'].filter(function (y) { return y !== x[1]; }), 'Elegir el gráfico según la pregunta.'); });
    g.times(4, function (R) { var n = R.int(1, 8), b = R.pick([4, 8]); g.input(1, 'En un sistema de espaciado con base de ' + b + ' px, ¿cuántos píxeles mide el paso ' + n + '?', n * b, 'Paso por base.'); });
  },
  checks: [
    ['Explica tres principios de la Gestalt y cómo se usan en una interfaz.', 'Proximidad para agrupar etiqueta y campo, semejanza para dar el mismo estilo a acciones del mismo tipo, región común para agrupar en tarjetas.'],
    ['¿Cómo se construye la jerarquía visual?', 'Con tamaño, peso, color, contraste y posición, destacando poco y lo más importante, comprobándolo al entrecerrar los ojos.'],
    ['Da cuatro reglas de tipografía y color para interfaces.', 'Texto base de 16 px, líneas de 45 a 75 caracteres, cifras tabulares en tablas; no depender solo del color, contraste suficiente y significado consistente.'],
    ['¿Qué principios guían una visualización de datos honesta y qué es un sistema de diseño?', 'Gráfico según la pregunta, barras desde cero, etiquetas directas y contexto; un conjunto de tokens, componentes y pautas compartidos.']
  ],
  cites: ['Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt II. *Psychologische Forschung*, 4.', 'Tufte, E. (2001). *The Visual Display of Quantitative Information* (2.ª ed.). Graphics Press.', 'Cleveland, W. y McGill, R. (1984). Graphical Perception. *Journal of the American Statistical Association*, 79(387).', 'Nielsen, J. (2006). F-Shaped Pattern For Reading Web Content. Nielsen Norman Group.', 'Frost, B. (2016). *Atomic Design*. bradfrost.com.', 'Bringhurst, R. (2004). *The Elements of Typographic Style* (3.ª ed.). Hartley & Marks.'],
  project: { t: 'Rediseño visual de una pantalla',
    goal: 'Aplicar principios de diseño visual para mejorar una pantalla densa en información y medir el efecto.',
    steps: ['Elige una pantalla con mucha información (una tabla, un panel o un formulario largo) y haz una captura del estado actual.', 'Analízala con los principios de la Gestalt, la jerarquía, la tipografía y el color, listando los problemas.', 'Define tokens (escala tipográfica, espaciado, colores semánticos) y rediseña la pantalla con ellos.', 'Verifica contrastes y que ninguna información dependa solo del color.', 'Mide con cinco personas el tiempo para encontrar un dato antes y después.'],
    deliver: 'Las capturas antes y después, el análisis, los tokens y la medición.' },
  hito: ['Rediseña la tabla de unidades en patio de PatioApp con jerarquía, cifras tabulares y estados que no dependen solo del color.', 'Define los tokens de diseño de PatioApp (tipografía, espaciado y colores semánticos) y aplícalos a los componentes principales.']
});
SDC.after('hci.visual', 'hci.usab');


SDC.D('hci.research', `## Investigar con poco presupuesto
No hace falta un laboratorio ni un equipo de investigación. Steve Krug, en *Rocket Surgery Made Easy* (2010), propone una prueba mensual con tres usuarios, una mañana al mes, observada por todo el equipo, con los problemas más graves corregidos antes de la siguiente. Para software interno, los usuarios están a un pasillo de distancia: un café con un operador y diez minutos mirándolo trabajar valen más que una suposición. Lo único que no puede faltar es la disciplina de registrar lo observado, compartirlo con el equipo y volver a medir después del cambio.

## Sesgos que hay que vigilar
- **Sesgo de confirmación:** escuchar solo lo que confirma la idea propia. Se combate escribiendo antes qué resultado haría cambiar de opinión.
- **Muestra conveniente:** entrevistar solo a los usuarios más entusiastas o a los que están en la oficina central; los de la sede lejana o del turno noche tienen problemas distintos.
- **Efecto del observador:** las personas trabajan distinto cuando se sienten observadas; se reduce con tiempo, confianza y dejando claro que no se evalúa a nadie.`);
})();
