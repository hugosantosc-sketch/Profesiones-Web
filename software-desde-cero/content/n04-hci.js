(function () {
var M = SDC.M, S = SDC.S;
M('hci', { title: 'Interacción humano-computador',
  desc: 'El software lo usan personas. Este módulo enseña a diseñar a partir de cómo piensan, perciben y se equivocan, a medir si un sistema es usable y a construirlo para que lo pueda usar todo el mundo, incluidas las personas con discapacidad.',
  thread: 'PatioApp se diseña para quien la usa de verdad: un revisor con guantes, al sol, apurado y con el celular en una mano. Se observa, se prototipa, se prueba con usuarios y se audita su accesibilidad.',
  books: '*The Design of Everyday Things* (Norman), *Don\'t Make Me Think* (Krug), *Usability Engineering* (Nielsen), *Interaction Design* (Rogers, Sharp y Preece), las pautas WCAG 2.2 del W3C.',
  uni: 'Stanford CS147 *Introduction to Human-Computer Interaction Design*; Berkeley CS160 *User Interface Design and Development*; CMU Human-Computer Interaction Institute (05-391 *Designing Human Centered Software*); MIT *User Interface Design and Implementation* (6.831). En Perú: Interacción Humano-Computador y Diseño de Experiencia de Usuario (PUCP, UPC, UTEC, UNMSM).',
  capstone: { t: 'Rediseño centrado en el usuario de PatioApp',
    goal: 'Recorrer el ciclo completo de diseño centrado en el usuario y demostrar con datos que PatioApp mejoró.',
    steps: ['Observa y entrevista a personas reales del dominio y sintetiza lo aprendido en arquetipos y un mapa del recorrido.', 'Prototipa en baja fidelidad dos alternativas de la pantalla principal y pruébalas con usuarios.', 'Haz una evaluación heurística y una prueba de usabilidad con cinco personas, midiendo éxito, tiempo y SUS.', 'Audita la accesibilidad con WCAG 2.2 nivel AA (contraste, teclado, lector de pantalla) y corrige los hallazgos.', 'Repite la prueba con la versión mejorada y compara las métricas.'],
    deliver: 'El informe de investigación, los prototipos, las grabaciones o notas de las pruebas, la auditoría de accesibilidad y la comparación antes y después.' } });

S('hci', 'hci.ucd', { title: 'Diseño centrado en el usuario',
  ask: '¿Qué principio de diseño de interacción se aplica?',
  lesson: `
> **La idea en simple.** Si una puerta necesita un cartel que diga "empujar", la puerta está mal diseñada. Don Norman popularizó esta idea: cuando las personas se equivocan con un objeto, casi siempre la culpa es del diseño, no de ellas. En software pasa lo mismo, millones de veces al día.

## La psicología de los objetos cotidianos
Don Norman, científico cognitivo que luego dirigió el diseño de experiencia en Apple, publicó en 1988 *The Design of Everyday Things* (revisado en 2013), el libro fundacional del diseño de interacción. Sus conceptos centrales:
- **Affordance (posibilidad de uso):** la relación entre un objeto y una persona que determina qué se puede hacer con él. El psicólogo James Gibson acuñó el término en 1977; Norman lo llevó al diseño.
- **Significante:** la señal perceptible que indica dónde y cómo actuar. Norman lo agregó en 2013 porque en pantalla todo "se puede tocar"; lo que importa es que se **note**. Un botón con relieve, un texto subrayado y azul, un ícono de lápiz junto a un campo editable son significantes.
- **Correspondencia (mapping):** la relación entre los controles y sus efectos. Las perillas de una cocina dispuestas como los quemadores no necesitan etiquetas.
- **Retroalimentación:** toda acción debe tener una respuesta inmediata y comprensible. Un botón que no cambia al presionarlo invita a presionarlo cinco veces (y a registrar cinco veces la misma unidad).
- **Restricciones:** limitar lo que se puede hacer para evitar errores, como deshabilitar "Entregar" mientras la unidad no esté revisada.
- **Modelo conceptual:** la explicación que la persona se arma de cómo funciona el sistema. Si el diseño la induce a un modelo equivocado, cometerá errores aunque cada pantalla esté "bien hecha".

## Las dos brechas
Norman describe dos distancias que el diseño debe acortar:
- **Brecha de ejecución:** la distancia entre lo que la persona quiere hacer y lo que el sistema le permite hacer. "Quiero registrar que llegó una camioneta; ¿dónde se hace?".
- **Brecha de evaluación:** la distancia entre lo que el sistema muestra y lo que la persona necesita para saber si logró su objetivo. "¿Se guardó o no?".

## El error humano no es un defecto de las personas
James Reason, en *Human Error* (1990), distinguió:
- **Deslices:** la intención era correcta pero la ejecución falló (tocar el botón de al lado, escribir una placa con un dígito cambiado). Se reducen con objetivos más grandes, confirmaciones y deshacer.
- **Equivocaciones:** la intención misma era errónea por un modelo mental incorrecto ("creí que Guardar también enviaba al cliente"). Se reducen con mejores modelos conceptuales, nombres claros y retroalimentación.
Diseñar pensando que "el usuario debería saberlo" es la receta para los errores.

## Leyes de la percepción y el movimiento
- **Ley de Fitts** (Paul Fitts, 1954): el tiempo para alcanzar un objetivo crece con la distancia y decrece con su tamaño. En la formulación de I. Scott MacKenzie (1992), el índice de dificultad es ID = log₂(D/W + 1). Por eso los botones importantes deben ser grandes y estar cerca, y por eso las esquinas de la pantalla son tan fáciles de alcanzar con un ratón.
- **Ley de Hick-Hyman** (Hick, 1952; Hyman, 1953): el tiempo de decisión crece con el logaritmo del número de opciones. Un menú con 30 opciones planas cuesta más que tres grupos bien organizados.
- **Memoria de trabajo limitada:** el famoso "7 ± 2" de George Miller (1956) se cita mal a menudo; Nelson Cowan (2001) estimó que retenemos unos 4 bloques de información a la vez. No obligues a recordar lo que se puede mostrar.
- **Principios de la Gestalt** (Max Wertheimer, 1923): agrupamos lo que está **cerca** (proximidad), lo que se **parece** (similitud), completamos formas (cierre) y seguimos líneas (continuidad). Un formulario donde la etiqueta está más cerca del campo de arriba que del suyo confunde aunque el texto sea correcto.
~~~js
// Índice de dificultad de Fitts para tocar un botón en el celular (distancias y anchos en mm)
const id = (d, w) => Math.log2(d / w + 1);
for (const [nombre, d, w] of [['botón pequeño lejos', 80, 6], ['botón grande lejos', 80, 18], ['botón grande cerca', 30, 18]])
  console.log(nombre, id(d, w).toFixed(2), 'bits');
~~~

## El proceso: entender antes de construir
La norma ISO 9241-210 describe el diseño centrado en las personas como un ciclo: **entender el contexto de uso**, **especificar los requisitos de los usuarios**, **producir soluciones** y **evaluarlas**, iterando hasta que se cumplan. El Design Council del Reino Unido lo resumió en 2005 como el **doble diamante**: divergir para descubrir el problema, converger para definirlo, divergir para idear soluciones y converger para entregar la mejor.
Técnicas de la primera mitad:
- **Indagación contextual** (Hugh Beyer y Karen Holtzblatt, *Contextual Design*, 1998): observar a las personas trabajando en su lugar real y preguntarles mientras lo hacen. En un patio descubrirás guantes, sol en la pantalla, señal de celular intermitente y prisa.
- **Personas** (arquetipos): Alan Cooper las propuso en *The Inmates Are Running the Asylum* (1999). Son retratos basados en datos reales de usuarios típicos, con objetivos y frustraciones. Evitan diseñar para "el usuario" abstracto, que siempre se parece al programador.
- **Mapas del recorrido:** las etapas, acciones, emociones y puntos de dolor de una persona a lo largo de una tarea completa.

## Prototipar barato
Carolyn Snyder mostró en *Paper Prototyping* (2003) que un prototipo en papel, probado con usuarios reales, descubre la mayoría de los problemas de flujo antes de escribir una línea de código. La fidelidad debe crecer con la certeza: papel para explorar, maquetas interactivas (Figma) para validar, código para afinar. Cambiar un dibujo cuesta minutos; cambiar una funcionalidad publicada cuesta semanas.

## Ejemplo resuelto: la pantalla de ingreso del patio
Observación: el revisor usa guantes, sostiene el celular con una mano y está al sol.
- Fitts: los botones principales pasan de 32 a 56 píxeles de alto y se ubican en la mitad inferior, al alcance del pulgar.
- Hick: las 14 opciones del menú se agrupan en tres secciones según la etapa del trabajo (ingresar, revisar, entregar).
- Retroalimentación: al registrar, la pantalla muestra en grande la placa guardada y vibra; si no hay señal, dice "guardado en el teléfono, se enviará al recuperar señal".
- Restricciones: "Entregar" aparece deshabilitado con la razón visible ("falta la revisión") en lugar de fallar al presionarlo.
Cada cambio tiene un fundamento y se puede comprobar en una prueba con usuarios, que es el tema siguiente.`,
  links: [['m9.front', 'las decisiones de diseño se implementan en la interfaz web'], ['m11.req', 'la investigación con usuarios es la forma más directa de descubrir requisitos'], ['m3.cond', 'las restricciones de la interfaz evitan estados inválidos']],
  read: 'Norman, *The Design of Everyday Things*, capítulos 1 a 5; Rogers, Sharp y Preece, *Interaction Design*, capítulos 1 a 4 y 8; Cooper, *About Face*, parte I.',
  terms: [
    ['Affordance', 'relación entre un objeto y una persona que determina qué acciones son posibles con él', ['Una manija invita a jalar y una placa plana a empujar.', 'Una superficie táctil permite tocar cualquier punto.', 'Gibson acuñó el término y Norman lo llevó al diseño.']],
    ['Significante', 'señal perceptible que indica dónde y cómo actuar', ['Un ícono de lápiz junto a un campo indica que se puede editar.', 'Un texto subrayado y azul sugiere un enlace.', 'Una flecha en el borde de un carrusel muestra que hay más contenido.']],
    ['Modelo mental', 'explicación que una persona se forma sobre cómo funciona un sistema', ['El revisor cree que "Guardar" también avisa al cliente y no lo llama.', 'La gente cree que subir el termostato calienta más rápido.', 'Un buen modelo conceptual en la interfaz lo hace correcto.']],
    ['Retroalimentación', 'respuesta inmediata y comprensible del sistema a una acción de la persona', ['El botón cambia y aparece "Unidad ABC123 registrada".', 'Una barra de progreso muestra que la carga avanza.', 'Sin ella, la persona presiona varias veces el mismo botón.']],
    ['Brecha de ejecución', 'distancia entre lo que una persona quiere hacer y lo que el sistema le permite hacer de forma evidente', ['Alguien quiere anular un ingreso y no encuentra cómo.', 'Una función existe pero está escondida en un menú inesperado.', 'Se acorta con significantes y un buen modelo conceptual.']],
    ['Persona (arquetipo)', 'retrato basado en datos reales de un tipo de usuario, con sus objetivos y frustraciones', ['"Rosa, revisora de 45 años, usa guantes y un celular de gama media".', 'Alan Cooper las propuso para dejar de diseñar para un usuario abstracto.', 'Guían las decisiones cuando el equipo discute qué priorizar.']],
    ['Ley de Fitts', 'principio que dice que el tiempo para alcanzar un objetivo crece con la distancia y decrece con su tamaño', ['Agrandas el botón de registrar y lo pones al alcance del pulgar.', 'Las esquinas de la pantalla son fáciles de alcanzar con el ratón.', 'Se calcula con log₂(D/W + 1).']],
    ['Ley de Hick', 'principio que dice que el tiempo de decisión crece con el logaritmo de la cantidad de opciones', ['Agrupas 30 opciones de menú en tres secciones.', 'Un formulario con 20 botones visibles hace dudar.', 'Reducir opciones acelera la elección.']]
  ],
  q: [
    ['Una puerta de vidrio necesita el cartel "empujar". Según Norman, ¿qué falla?', 'Faltan significantes claros: el diseño no indica cómo usarla', ['Los usuarios no prestan atención', 'El vidrio es un mal material', 'Sobra el cartel'], 'Si hace falta una instrucción, el diseño no comunica por sí mismo.', 2],
    ['Un revisor toca "Anular" cuando quería "Aceptar" porque están juntos y son pequeños. ¿Qué tipo de error es?', 'Un desliz', ['Una equivocación', 'Un error de requisitos', 'Un error de red'], 'La intención era correcta; falló la ejecución.', 3],
    ['¿Qué cambio reduce el tiempo para tocar un botón según la ley de Fitts?', 'Hacerlo más grande y acercarlo a donde está el dedo', ['Cambiarle el color', 'Agregar más opciones al lado', 'Moverlo al extremo opuesto'], 'El tiempo depende de la distancia y del tamaño.', 2],
    ['¿Qué técnica consiste en observar a las personas en su lugar de trabajo y preguntarles mientras trabajan?', 'Indagación contextual', ['Encuesta en línea', 'Prueba A/B', 'Evaluación heurística'], 'Beyer y Holtzblatt la describieron en Contextual Design.', 2],
    ['¿Para qué sirve un prototipo en papel?', 'Para encontrar problemas de flujo antes de programar, con muy poco costo', ['Para medir el rendimiento', 'Para reemplazar las pruebas automáticas', 'Para entregarlo al cliente final'], 'Cambiar un dibujo cuesta minutos; cambiar código publicado, semanas.', 2],
    { tf: 'Según la investigación de Cowan, la memoria de trabajo retiene unos 4 bloques de información.', v: true, e: 'El "7 ± 2" de Miller se cita a menudo, pero estimaciones posteriores son menores.', l: 3 },
    { tf: 'Si los usuarios se equivocan con una interfaz, lo más probable es que necesiten más capacitación.', v: false, e: 'Norman muestra que la causa más común es el diseño; la capacitación no corrige un mal significante.', l: 2 },
    { o: 'Ordena las etapas del doble diamante.', s: ['Descubrir: investigar el problema ampliamente', 'Definir: precisar el problema a resolver', 'Desarrollar: generar muchas soluciones posibles', 'Entregar: probar, elegir y refinar la mejor'], e: 'Se diverge y converge dos veces: primero sobre el problema, luego sobre la solución.', l: 2 },
    { c: 'Escribe «indiceFitts(D, W)» = log₂(D/W + 1), redondeado a 2 decimales.', f: 'indiceFitts', p: ['D', 'W'], t: [[[100, 10], 3.46], [[300, 20], 4], [[64, 64], 1]], sol: '  return Math.round(Math.log2(D / W + 1) * 100) / 100;', l: 2 },
    { c: 'Escribe «tiempoHick(a, b, n)» = a + b·log₂(n + 1) en segundos, redondeado a 2 decimales.', f: 'tiempoHick', p: ['a', 'b', 'n'], t: [[[0.2, 0.15, 7], 0.65], [[0, 1, 0], 0], [[0.1, 0.2, 3], 0.5]], sol: '  return Math.round((a + b * Math.log2(n + 1)) * 100) / 100;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var w = R.pick([4, 8, 10, 16, 20]), k = R.pick([1, 3, 7, 15, 31]), d = w * k; g.input(3, 'Un botón de ' + w + ' mm de ancho está a ' + d + ' mm del dedo. ¿Cuál es su índice de dificultad de Fitts en bits?', Math.log2(k + 1), 'log₂(' + d + '/' + w + ' + 1) = log₂(' + (k + 1) + ') = ' + Math.log2(k + 1) + '.'); });
    g.times(6, function (R) { var n = R.pick([1, 3, 7, 15]), a = 0.2, b = 0.15, t = a + b * Math.log2(n + 1); g.input(3, 'Con a = 0.2 s y b = 0.15 s, ¿cuánto tarda en decidir entre ' + n + ' opciones según Hick? Redondea a 2 decimales.', t.toFixed(2), '0.2 + 0.15·log₂(' + (n + 1) + ') = ' + t.toFixed(2) + ' s.'); });
    var casos = [['Pulsar el botón equivocado por estar demasiado cerca del correcto', 'Desliz'], ['Elegir "Guardar" creyendo que también envía la notificación', 'Equivocación'], ['Escribir la placa con dos dígitos invertidos', 'Desliz'], ['Borrar un registro creyendo que se podía recuperar', 'Equivocación'], ['Arrastrar el archivo a la carpeta vecina', 'Desliz'], ['Pagar el monto mensual pensando que era el anual', 'Equivocación']];
    casos.forEach(function (c) { g.mcq(3, 'Según Reason, ¿qué tipo de error es este? ' + c[0], c[1], [c[1] === 'Desliz' ? 'Equivocación' : 'Desliz', 'Violación deliberada', 'Error de hardware'], c[1] === 'Desliz' ? 'La intención era correcta y falló la ejecución.' : 'La intención misma era incorrecta por un modelo mental equivocado.'); });
    var gest = [['Las etiquetas quedan más cerca del campo de arriba que del suyo y la gente las confunde', 'Proximidad'], ['Todos los botones de acción secundaria tienen el mismo estilo gris', 'Similitud'], ['Un ícono formado por puntos se percibe como un círculo completo', 'Cierre'], ['Los elementos alineados en una línea se leen como una secuencia', 'Continuidad']];
    gest.forEach(function (c) { g.mcq(3, '¿Qué principio de la Gestalt explica esto? ' + c[0], c[1], ['Proximidad', 'Similitud', 'Cierre', 'Continuidad'].filter(function (x) { return x !== c[1]; }), 'Los principios de la Gestalt describen cómo agrupamos lo que percibimos.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre affordance y significante?', 'La affordance es lo que se puede hacer con algo; el significante es la señal que hace visible esa posibilidad. En pantalla casi todo se puede tocar, por eso importan los significantes.'],
    ['Explica las brechas de ejecución y de evaluación con un ejemplo de PatioApp.', 'Ejecución: el revisor no sabe dónde registrar un daño. Evaluación: después de registrarlo, no sabe si se guardó. El diseño debe acortar ambas.'],
    ['¿Por qué no basta con capacitar a los usuarios cuando se equivocan?', 'Porque la mayoría de los errores vienen del diseño (significantes, modelos conceptuales, falta de retroalimentación); la capacitación se olvida y no corrige la causa.'],
    ['¿Para qué sirve una persona (arquetipo) en el diseño?', 'Para diseñar para usuarios concretos basados en datos reales, con objetivos y limitaciones, y no para un usuario abstracto que se parece al programador.'],
    ['Aplica Fitts y Hick para mejorar una pantalla con 15 botones pequeños.', 'Agrupar las opciones y mostrar solo las relevantes para la etapa (Hick) y agrandar y acercar los botones principales al pulgar (Fitts).']
  ],
  cites: ['Norman, D. (2013). *The Design of Everyday Things* (edición revisada). Basic Books.', 'Reason, J. (1990). *Human Error*. Cambridge University Press.', 'Fitts, P. (1954). The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology*, 47(6).', 'Beyer, H. y Holtzblatt, K. (1998). *Contextual Design*. Morgan Kaufmann.', 'Cooper, A. (1999). *The Inmates Are Running the Asylum*. Sams.', 'ISO 9241-210:2019. *Ergonomics of human-system interaction — Human-centred design for interactive systems*.'],
  project: { t: 'Investigación y prototipo para un trabajo real',
    goal: 'Diseñar una pantalla a partir de la observación de personas reales, no de suposiciones.',
    steps: ['Observa durante una hora a alguien que hace un trabajo con registros (un almacén, una bodega, una cochera) y toma notas sin intervenir.', 'Entrevístalo con preguntas abiertas sobre su última jornada.', 'Sintetiza dos personas (arquetipos) y un mapa del recorrido con sus puntos de dolor.', 'Dibuja en papel dos alternativas de la pantalla principal y pruébalas con esa persona pidiéndole que piense en voz alta.', 'Justifica la alternativa elegida con los principios de Norman, Fitts, Hick y la Gestalt.'],
    deliver: 'Las notas de observación, las personas, el mapa del recorrido, fotos de los prototipos y la justificación.' },
  hito: ['Observa o entrevista a dos personas que trabajen en un patio o almacén, crea dos personas (arquetipos) y un mapa del recorrido del revisor en PatioApp.', 'Rediseña la pantalla de ingreso de PatioApp según lo observado: botones grandes al alcance del pulgar (Fitts), menos opciones por pantalla (Hick) y retroalimentación clara al guardar.']
});

S('hci', 'hci.usab', { title: 'Usabilidad y evaluación con usuarios',
  ask: '¿Qué concepto de usabilidad o evaluación se aplica?',
  lesson: `
> **La idea en simple.** No sabes si tu interfaz es fácil de usar hasta que ves a otra persona usarla. Lo que para ti es "obvio" lo construiste tú, y tú ya sabes dónde está todo. Steve Krug lo resumió en el título de su libro: *No me hagas pensar*.

## Qué es la usabilidad
La norma ISO 9241-11 define la usabilidad como el grado en que un producto puede ser usado por **usuarios específicos** para lograr **objetivos específicos** con **eficacia** (¿lo logran?), **eficiencia** (¿con cuánto esfuerzo?) y **satisfacción** (¿cómo se sienten?) en un **contexto de uso** específico. No es una propiedad absoluta: una aplicación puede ser usable para un analista en su escritorio e inusable para un revisor con guantes bajo el sol.
Jakob Nielsen, en *Usability Engineering* (1993), propuso cinco componentes medibles: **facilidad de aprendizaje**, **eficiencia** una vez aprendida, **facilidad de recordar** tras un tiempo sin usarla, **pocos errores** y fáciles de recuperar, y **satisfacción**.

## Las diez heurísticas de Nielsen
Nielsen las publicó en 1994, a partir de trabajo con Rolf Molich (1990). Siguen siendo la lista de verificación más usada:
1. **Visibilidad del estado del sistema:** informa siempre qué está pasando ("Guardando…", "3 unidades pendientes de sincronizar").
2. **Correspondencia con el mundo real:** usa el lenguaje y los conceptos de los usuarios, no los del programador ("Unidad", no "Entidad vehículo").
3. **Control y libertad:** salidas claras, deshacer y rehacer.
4. **Consistencia y estándares:** lo mismo se llama y se ve igual en todas partes, y se respetan las convenciones de la plataforma.
5. **Prevención de errores:** mejor que un buen mensaje de error es que el error no pueda ocurrir.
6. **Reconocer antes que recordar:** muestra las opciones en lugar de obligar a recordarlas (un autocompletado de placas en vez de escribirla de memoria).
7. **Flexibilidad y eficiencia:** atajos para expertos que no estorben a los novatos.
8. **Diseño estético y minimalista:** cada elemento extra compite por la atención con lo importante.
9. **Ayudar a reconocer, diagnosticar y recuperarse de errores:** mensajes en lenguaje claro que digan qué pasó y cómo solucionarlo.
10. **Ayuda y documentación:** fácil de buscar, centrada en tareas y breve.

## Evaluación heurística
Varios evaluadores revisan la interfaz por separado contra las heurísticas y luego combinan sus hallazgos, clasificados por **gravedad** (de 0, no es un problema, a 4, catástrofe que impide el uso). Nielsen observó que un solo evaluador encuentra alrededor de un tercio de los problemas y que de tres a cinco evaluadores encuentran la mayoría. Es barata y rápida, pero no reemplaza ver a usuarios reales.

## Pruebas de usabilidad
Se pide a personas del perfil real que completen **tareas concretas** ("registra el ingreso de la camioneta ABC123 con un rayón en la puerta") mientras **piensan en voz alta**, un protocolo que Clayton Lewis introdujo en IBM en 1982. El facilitador no ayuda ni explica: observa dónde dudan, qué buscan y qué malinterpretan.
- ¿Cuántas personas? Nielsen y Thomas Landauer (1993) modelaron que con cinco usuarios se descubre alrededor del 85% de los problemas de un diseño. La recomendación correcta no es "cinco y listo", sino **varias rondas pequeñas**: probar con cinco, corregir, volver a probar.
- **Métricas:** tasa de éxito por tarea, tiempo por tarea, número de errores y satisfacción.
- Krug, en *Rocket Surgery Made Easy* (2010), propone hacer pruebas una mañana al mes con tres usuarios y que todo el equipo las mire: ver a alguien atascarse convence más que cualquier informe.

## Medir la satisfacción: SUS
John Brooke creó en 1986 la **Escala de Usabilidad del Sistema** (SUS): diez afirmaciones alternadas positivas y negativas respondidas de 1 a 5. Para calcular el puntaje, a las preguntas impares se les resta 1, a las pares se les resta de 5, se suman y se multiplica por 2.5, lo que da un valor de 0 a 100. El promedio observado en cientos de estudios ronda 68: por encima es mejor que la media.
~~~js
function sus(r) {   // r: 10 respuestas de 1 a 5
  return r.reduce((s, v, i) => s + (i % 2 === 0 ? v - 1 : 5 - v), 0) * 2.5;
}
console.log(sus([4, 2, 4, 1, 5, 2, 4, 2, 4, 2]), sus([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]));
~~~

## Predecir sin usuarios: GOMS y KLM
Stuart Card, Thomas Moran y Allen Newell publicaron en 1983 *The Psychology of Human-Computer Interaction*, con el modelo **KLM** (nivel de pulsaciones), que estima el tiempo de un experto sumando operadores: pulsar una tecla (K, unos 0.28 s para un mecanógrafo promedio), apuntar con el ratón (P, unos 1.1 s), llevar la mano del teclado al ratón (H, unos 0.4 s) y prepararse mentalmente (M, unos 1.35 s). Sirve para comparar dos diseños antes de construirlos: si una tarea frecuente necesita 4 operadores M menos en un diseño, ahorra más de 5 segundos cada vez.

## Ejemplo resuelto: un mensaje de error
Antes: "Error 422: validation failed". Viola las heurísticas 2 y 9.
Después: "No pudimos registrar la unidad: la placa ABC12 tiene 5 caracteres y debe tener 6. Revísala y vuelve a intentar." Dice qué pasó, por qué y qué hacer, en el idioma del usuario, junto al campo con el problema, y conserva lo que ya se escribió. Mejor aún (heurística 5): el campo acepta solo letras y números, convierte a mayúsculas y avisa en el momento si faltan caracteres, de modo que el error casi no pueda ocurrir.`,
  links: [['hci.ucd', 'la evaluación comprueba si el diseño centrado en el usuario funcionó'], ['mat2.stat', 'las métricas de usabilidad se analizan con estadística'], ['m6.errors', 'los mensajes de error son parte de la experiencia de usuario']],
  read: 'Nielsen, *Usability Engineering*; Krug, *Don\'t Make Me Think* y *Rocket Surgery Made Easy*; Rogers, Sharp y Preece, capítulos 14 a 16.',
  terms: [
    ['Usabilidad', 'grado en que usuarios específicos logran objetivos específicos con eficacia, eficiencia y satisfacción en un contexto dado', ['Mides cuántos revisores logran registrar una unidad, en cuánto tiempo y si quedan conformes.', 'Una app es usable en la oficina e inusable con guantes al sol.', 'La define la norma ISO 9241-11.']],
    ['Heurísticas de Nielsen', 'diez principios generales para evaluar interfaces publicados por Jakob Nielsen en 1994', ['Revisas si el sistema muestra siempre su estado.', 'Compruebas si los mensajes de error explican cómo corregir.', 'Se usan como lista de verificación en una evaluación experta.']],
    ['Evaluación heurística', 'revisión experta en la que varios evaluadores comparan la interfaz con principios de usabilidad', ['Tres evaluadores revisan PatioApp por separado y combinan hallazgos.', 'Cada problema se clasifica por gravedad.', 'Es barata pero no reemplaza a los usuarios reales.']],
    ['Prueba con usuarios', 'observación de personas reales realizando tareas concretas con la interfaz', ['Cinco revisores intentan registrar un ingreso mientras los observas.', 'Mides éxito, tiempo y errores por tarea.', 'Se repite en rondas pequeñas tras cada corrección.']],
    ['Pensar en voz alta', 'protocolo en el que el participante verbaliza lo que piensa mientras usa la interfaz', ['El usuario dice "busco el botón de guardar, ¿será este?".', 'Revela malentendidos que no se ven en los clics.', 'Clayton Lewis lo introdujo en IBM en 1982.']],
    ['Escala SUS', 'cuestionario de diez afirmaciones que produce un puntaje de usabilidad de 0 a 100', ['Tu app obtiene 72, por encima del promedio de 68.', 'Comparas la versión anterior y la nueva con el mismo cuestionario.', 'John Brooke la creó en 1986.']],
    ['Reconocer antes que recordar', 'heurística que pide mostrar opciones e información en lugar de obligar a recordarlas', ['Un autocompletado muestra las placas en lugar de pedir escribirlas de memoria.', 'Un menú visible reemplaza a comandos que hay que memorizar.', 'Reduce la carga de la memoria de trabajo.']],
    ['Prevención de errores', 'heurística que pide diseñar para que los errores no puedan ocurrir, en lugar de solo informarlos', ['El campo de placa solo acepta letras y números y convierte a mayúsculas.', 'El botón de entregar se deshabilita hasta que la unidad esté revisada.', 'Se pide confirmación antes de una acción destructiva.']]
  ],
  q: [
    ['La app muestra "Error 500" al fallar el guardado. ¿Qué heurística viola principalmente?', 'Ayudar a reconocer, diagnosticar y recuperarse de errores', ['Diseño estético y minimalista', 'Flexibilidad y eficiencia', 'Ayuda y documentación'], 'El mensaje no explica qué pasó ni cómo resolverlo, en el lenguaje del usuario.', 2],
    ['El botón "Guardar" está arriba en una pantalla y abajo en otra, con distinto color. ¿Qué heurística se viola?', 'Consistencia y estándares', ['Visibilidad del estado', 'Control y libertad', 'Prevención de errores'], 'Lo mismo debe verse y ubicarse igual en todas partes.', 2],
    ['¿Por qué se recomienda probar con cinco usuarios en varias rondas en lugar de con veinte una sola vez?', 'Porque cada ronda pequeña descubre la mayoría de los problemas y permite corregir y volver a probar', ['Porque veinte usuarios es ilegal', 'Porque cinco usuarios dan significancia estadística', 'Porque los usuarios se aburren'], 'Nielsen y Landauer mostraron rendimientos decrecientes después de unos cinco.', 3],
    ['Un participante responde 3 a todas las preguntas del SUS. ¿Qué puntaje obtiene?', '50', ['30', '60', '75'], 'Cada pregunta aporta 2: suma 20 × 2.5 = 50.', 3],
    ['¿Qué estima el modelo KLM?', 'El tiempo que tarda un usuario experto en completar una tarea', ['La satisfacción del usuario', 'La cantidad de errores de un novato', 'El costo de desarrollar la interfaz'], 'Suma tiempos de operadores como teclas, apuntar y preparación mental.', 3],
    { tf: 'Durante una prueba de usabilidad, el facilitador debe explicar al participante cómo usar la interfaz cuando se atasca.', v: false, e: 'Si ayuda, deja de observar el problema real; solo interviene si el participante queda completamente bloqueado.', l: 2 },
    { tf: 'Un puntaje SUS de 68 está aproximadamente en el promedio.', v: true, e: 'Es el promedio observado en cientos de estudios.', l: 2 },
    { o: 'Ordena los pasos de una prueba de usabilidad.', s: ['Definir objetivos y reclutar participantes del perfil real', 'Preparar tareas concretas y realistas', 'Observar a cada participante pensando en voz alta sin ayudarlo', 'Registrar éxito, tiempo, errores y SUS', 'Priorizar los problemas encontrados y corregir', 'Volver a probar la versión corregida'], e: 'Es un ciclo: se prueba, se corrige y se vuelve a probar.', l: 3 },
    { c: 'Escribe «puntajeSUS(r)» para 10 respuestas de 1 a 5: impares (1.ª, 3.ª…) aportan r − 1, pares aportan 5 − r; la suma se multiplica por 2.5.', f: 'puntajeSUS', p: ['r'], t: [[[[3, 3, 3, 3, 3, 3, 3, 3, 3, 3]], 50], [[[5, 1, 5, 1, 5, 1, 5, 1, 5, 1]], 100], [[[1, 5, 1, 5, 1, 5, 1, 5, 1, 5]], 0], [[[4, 2, 4, 2, 4, 2, 4, 2, 4, 2]], 75]], sol: '  let s = 0;\n  for (let i = 0; i < 10; i++) s += i % 2 === 0 ? r[i] - 1 : 5 - r[i];\n  return s * 2.5;', h: 'El índice 0 corresponde a la primera pregunta (impar).', l: 3 },
    { c: 'Escribe «tiempoKLM(ops)» que sume los operadores de un texto: K = 0.28, P = 1.1, H = 0.4, M = 1.35, B = 0.1 segundos. Redondea a 2 decimales.', f: 'tiempoKLM', p: ['ops'], t: [[['MPK'], 2.73], [['HMPKKKK'], 3.97], [[''], 0]], sol: '  const t = { K: 0.28, P: 1.1, H: 0.4, M: 1.35, B: 0.1 };\n  let s = 0;\n  for (const o of ops) s += t[o];\n  return Math.round(s * 100) / 100;', l: 3 }
  ],
  gen: function (g) {
    var casos = [['La app no muestra nada mientras sincroniza y el usuario no sabe si funcionó', 'Visibilidad del estado del sistema'], ['Los botones dicen "Persistir entidad" en lugar de "Guardar unidad"', 'Correspondencia con el mundo real'], ['No hay forma de deshacer una anulación hecha por error', 'Control y libertad'], ['El campo de fecha acepta "31/02/2026"', 'Prevención de errores'], ['El usuario debe recordar el código interno de cada taller', 'Reconocer antes que recordar'], ['La pantalla principal muestra 12 gráficos que nadie mira', 'Diseño estético y minimalista'], ['No existen atajos para quien registra 200 unidades al día', 'Flexibilidad y eficiencia'], ['El mensaje dice "Error 0x80004005"', 'Ayudar a reconocer, diagnosticar y recuperarse de errores']];
    var nombres = casos.map(function (c) { return c[1]; });
    casos.forEach(function (c) { g.mcq(3, '¿Qué heurística de Nielsen se viola principalmente? ' + c[0], c[1], g.R.sample(nombres.filter(function (n) { return n !== c[1]; }), 3), 'Compara el problema con lo que pide cada heurística.'); });
    g.times(8, function (R) { var r = []; for (var i = 0; i < 10; i++) r.push(R.int(1, 5)); var s = r.reduce(function (a, v, i) { return a + (i % 2 === 0 ? v - 1 : 5 - v); }, 0) * 2.5; g.input(4, 'Calcula el puntaje SUS de estas respuestas (de la 1.ª a la 10.ª): ' + r.join(', ') + '.', s, 'Impares restan 1, pares se restan de 5; suma por 2.5 = ' + s + '.'); });
    g.times(6, function (R) { var ops = ''; var n = R.int(3, 7); for (var i = 0; i < n; i++) ops += R.pick(['K', 'K', 'P', 'M', 'H']); var t = { K: 0.28, P: 1.1, H: 0.4, M: 1.35 }, s = 0; for (var j = 0; j < ops.length; j++) s += t[ops[j]]; g.input(3, 'Con K = 0.28, P = 1.1, H = 0.4 y M = 1.35 segundos, ¿cuánto tarda la secuencia ' + ops + '? Redondea a 2 decimales.', s.toFixed(2), 'Sumando los operadores: ' + s.toFixed(2) + ' s.'); });
  },
  checks: [
    ['¿Por qué la usabilidad depende del contexto de uso?', 'Porque la eficacia, eficiencia y satisfacción dependen de quién usa el sistema, para qué y en qué condiciones; lo que funciona en una oficina puede fallar en un patio al sol.'],
    ['Nombra cinco de las diez heurísticas de Nielsen con un ejemplo de PatioApp.', 'Visibilidad del estado (mostrar "sincronizando"), correspondencia con el mundo real (usar "unidad"), control y libertad (deshacer una anulación), prevención de errores (deshabilitar entregar sin revisión), reconocer antes que recordar (autocompletar placas).'],
    ['¿Qué diferencia hay entre una evaluación heurística y una prueba con usuarios?', 'La heurística la hacen expertos comparando con principios; la prueba observa a usuarios reales haciendo tareas. La primera es más barata; la segunda revela problemas que los expertos no ven.'],
    ['¿Por qué el facilitador no debe ayudar al participante durante la prueba?', 'Porque al ayudar oculta el problema que se quería observar; en la vida real nadie estará ahí para explicarle.'],
    ['¿Cómo se calcula el puntaje SUS y qué significa un 68?', 'A las respuestas impares se les resta 1, las pares se restan de 5, se suma todo y se multiplica por 2.5; 68 es aproximadamente el promedio de muchos estudios.']
  ],
  cites: ['Nielsen, J. (1993). *Usability Engineering*. Academic Press.', 'Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. *Proceedings of ACM CHI 1994*.', 'Nielsen, J. y Landauer, T. (1993). A mathematical model of the finding of usability problems. *Proceedings of ACM INTERCHI 1993*.', 'Brooke, J. (1996). SUS: A quick and dirty usability scale. En *Usability Evaluation in Industry*. Taylor & Francis.', 'Card, S., Moran, T. y Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum.', 'Krug, S. (2014). *Don\'t Make Me Think, Revisited* (3.ª ed.). New Riders.'],
  project: { t: 'Evaluación de usabilidad de una aplicación real',
    goal: 'Evaluar una aplicación con métodos expertos y con usuarios, y priorizar mejoras con evidencia.',
    steps: ['Elige una aplicación que uses (o tu propio proyecto) y define tres tareas principales.', 'Haz una evaluación heurística con dos compañeros por separado y combina los hallazgos con su gravedad.', 'Realiza una prueba con cinco personas pensando en voz alta y registra éxito, tiempo, errores y SUS.', 'Compara lo que encontró la evaluación heurística con lo que encontraron los usuarios.', 'Propón y prioriza las cinco mejoras principales con su fundamento.'],
    deliver: 'El informe con la lista de problemas por gravedad, las métricas de la prueba y las recomendaciones.' },
  hito: ['Haz una evaluación heurística de PatioApp con las diez heurísticas de Nielsen y prioriza los hallazgos por gravedad.', 'Realiza una prueba de usabilidad con tres a cinco usuarios que piensen en voz alta, midiendo tasa de éxito, tiempo por tarea y puntaje SUS.']
});

S('hci', 'hci.a11y', { title: 'Accesibilidad y diseño inclusivo',
  ask: '¿Qué principio o técnica de accesibilidad se aplica?',
  lesson: `
> **La idea en simple.** Una rampa en la entrada de un edificio la necesita quien usa silla de ruedas, pero también la aprovechan quienes empujan un coche de bebé, llevan una maleta o reparten mercadería. En software ocurre lo mismo: lo que se diseña para personas con discapacidad mejora el uso para todo el mundo.

## A cuántas personas afecta
La Organización Mundial de la Salud estimó en 2023 que unos 1300 millones de personas, alrededor del 16% de la población mundial, viven con una discapacidad significativa. En el Perú, el censo de 2017 del INEI registró que alrededor del 10% de la población declaró alguna discapacidad, y la **Ley 29973**, Ley General de la Persona con Discapacidad (2012), establece el derecho a la accesibilidad, incluida la de los servicios de información. A eso se suman las limitaciones **temporales** (un brazo enyesado) y **situacionales** (sol sobre la pantalla, ruido, una sola mano libre). El kit de Diseño Inclusivo de Microsoft (2016) y el libro *Mismatch* de Kat Holmes (2018) llaman a esto el **espectro de personas**: diseñar para quien no puede usar un brazo beneficia también a quien tiene uno lesionado y a quien sostiene un bebé.

## Las pautas WCAG
El World Wide Web Consortium (W3C), a través de su Iniciativa de Accesibilidad Web, publica las **Pautas de Accesibilidad para el Contenido Web** (WCAG). La versión 2.0 es de 2008, la 2.1 de 2018 y la **2.2 de octubre de 2023**. Se organizan en cuatro principios, conocidos como **POUR**:
| Principio | Pregunta | Ejemplos |
| Perceptible | ¿se puede percibir con algún sentido? | texto alternativo en imágenes, subtítulos, contraste suficiente |
| Operable | ¿se puede manejar? | todo funciona con teclado, tiempo suficiente, sin destellos peligrosos |
| Comprensible | ¿se entiende? | idioma declarado, comportamiento predecible, ayuda con los errores |
| Robusto | ¿funciona con tecnologías de apoyo? | HTML válido y semántico, nombres y roles accesibles |
Cada criterio tiene un nivel: **A** (mínimo), **AA** (el que exigen la mayoría de leyes y contratos) y **AAA** (máximo). La Ley Europea de Accesibilidad, aplicable desde el 28 de junio de 2025, obliga a muchos servicios digitales que se venden en la Unión Europea a cumplir requisitos alineados con WCAG.

## Contraste, con números
El contraste se mide como la razón entre la **luminancia relativa** del color más claro y la del más oscuro: (L1 + 0.05)/(L2 + 0.05). Va de 1:1 (mismo color) a 21:1 (negro sobre blanco). El nivel AA exige al menos **4.5:1** para texto normal y **3:1** para texto grande. El gris #777777 sobre blanco da 4.48:1 y **no** alcanza AA, aunque a muchos diseñadores les parezca suficiente.
~~~js
function luminancia(hex) {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contraste(a, b) { const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); }
for (const [t, f] of [['#000000', '#ffffff'], ['#777777', '#ffffff'], ['#595959', '#ffffff']])
  console.log(t, 'sobre', f, contraste(t, f).toFixed(2) + ':1');
~~~

## HTML semántico primero
Un **lector de pantalla** (NVDA y JAWS en Windows, VoiceOver en Apple, TalkBack en Android) lee la estructura de la página: títulos, enlaces, botones, campos y sus etiquetas. Si usas un «div» con un evento de clic en lugar de un «button», el lector no sabe que es un botón y el teclado no puede activarlo. Reglas básicas:
- Usa el elemento correcto: «button» para acciones, «a» para navegar, «label» asociado a cada campo, títulos «h1» a «h6» en orden.
- Toda imagen con información necesita **texto alternativo** que diga lo que comunica ("Foto del rayón en la puerta trasera izquierda"); las decorativas, «alt» vacío.
- Todo debe poder usarse con **teclado**, en un orden lógico, con el **foco visible**. WCAG 2.2 agregó criterios para que el foco no quede oculto.
- No transmitas información **solo con color**: "los campos en rojo tienen errores" falla para quien no distingue el rojo; agrega íconos y texto.
- Objetivos táctiles de al menos 24 por 24 píxeles (criterio nuevo de WCAG 2.2) o con espacio suficiente.
- Respeta la preferencia de **movimiento reducido** («prefers-reduced-motion») y permite ampliar el texto al 200% sin perder contenido.

## ARIA: con cuidado
WAI-ARIA agrega atributos para describir componentes complejos (pestañas, diálogos, regiones que se actualizan). La primera regla del propio W3C es **no usar ARIA si existe un elemento HTML nativo** que haga lo mismo. Los análisis anuales de WebAIM sobre el millón de páginas de inicio más visitadas encuentran que las páginas con ARIA tienen, en promedio, **más** errores detectables que las que no lo usan: mal aplicado, empeora las cosas. Esos mismos análisis detectan fallas de WCAG en más del 95% de las páginas, sobre todo contraste insuficiente, imágenes sin texto alternativo, campos sin etiqueta y enlaces vacíos.

## Cómo evaluar
1. **Herramientas automáticas** (axe, Lighthouse, WAVE): encuentran alrededor de un tercio de los problemas, rápido y en la integración continua.
2. **Revisión manual:** navegar todo con teclado, ampliar al 200%, revisar el orden de lectura.
3. **Lector de pantalla:** recorrer las tareas principales con NVDA o VoiceOver.
4. **Personas con discapacidad:** nada reemplaza su experiencia.

## El efecto rampa
Angela Glover Blackwell describió en 2017 el **efecto rampa** (*curb-cut effect*): las rampas en las veredas, logradas por activistas con discapacidad en los años 70, terminaron beneficiando a todos. Los subtítulos los usa quien mira videos sin sonido en el transporte; el buen contraste, quien usa el celular al sol; la navegación con teclado, los usuarios expertos. La accesibilidad no es un extra para pocos: es calidad para todos y, en muchos países, una obligación legal.`,
  links: [['m9.front', 'la accesibilidad se implementa con HTML semántico y CSS'], ['m17.ethics', 'excluir a personas con discapacidad es una decisión ética y legal'], ['hci.usab', 'la accesibilidad es parte de la usabilidad para todos los usuarios']],
  read: 'W3C, *WCAG 2.2*; Holmes, *Mismatch*; WebAIM, *The WebAIM Million*; Rogers, Sharp y Preece, capítulo 16.',
  terms: [
    ['Accesibilidad', 'característica de un producto que puede ser usado por personas con la más amplia variedad de capacidades', ['Un revisor con baja visión amplía el texto sin perder contenido.', 'Alguien que no puede usar el ratón maneja toda la app con teclado.', 'En el Perú la Ley 29973 la reconoce como derecho.']],
    ['WCAG', 'pautas del W3C con criterios verificables para hacer accesible el contenido web', ['Un contrato exige cumplir el nivel AA de la versión 2.2.', 'Se organizan en cuatro principios: perceptible, operable, comprensible y robusto.', 'La versión 2.2 se publicó en 2023.']],
    ['Principios POUR', 'los cuatro principios de WCAG: perceptible, operable, comprensible y robusto', ['Los subtítulos atienden lo perceptible.', 'Que todo funcione con teclado atiende lo operable.', 'El HTML semántico atiende lo robusto.']],
    ['Contraste', 'razón entre la luminancia de dos colores, que debe ser al menos 4.5:1 para texto normal en el nivel AA', ['El gris #777777 sobre blanco no alcanza el mínimo.', 'Un revisor al sol necesita texto oscuro sobre fondo claro.', 'Se calcula con (L1 + 0.05)/(L2 + 0.05).']],
    ['Texto alternativo', 'descripción textual de una imagen que leen los lectores de pantalla', ['La foto de un daño se describe como "rayón en la puerta trasera izquierda".', 'Las imágenes decorativas llevan alt vacío.', 'Su ausencia es uno de los errores más frecuentes.']],
    ['Lector de pantalla', 'software que convierte la interfaz en voz o braille para personas ciegas o con baja visión', ['NVDA lee los títulos y botones de tu página.', 'VoiceOver anuncia "botón, Guardar unidad".', 'Depende de que el HTML sea semántico.']],
    ['ARIA', 'conjunto de atributos que describe roles y estados de componentes complejos a las tecnologías de apoyo', ['Marcas una región que se actualiza sola con aria-live.', 'No lo usas si existe un elemento HTML nativo equivalente.', 'Mal aplicado empeora la accesibilidad.']],
    ['Foco visible', 'indicación visual del elemento que recibirá la acción del teclado', ['Un contorno marcado muestra qué botón se activará con Enter.', 'Quitarlo con outline: none deja perdidos a quienes usan teclado.', 'WCAG 2.2 agregó criterios para que no quede oculto.']]
  ],
  q: [
    ['¿Qué contraste mínimo exige WCAG nivel AA para texto normal?', '4.5:1', ['3:1', '7:1', '2:1'], 'Para texto grande basta 3:1; AAA exige 7:1.', 2],
    ['Un botón está hecho con un «div» y un evento de clic. ¿Qué problema tiene?', 'El teclado y los lectores de pantalla no lo reconocen como botón', ['Ninguno, se ve igual', 'Es más lento', 'No funciona en celulares'], 'El elemento «button» trae rol, foco y activación por teclado.', 3],
    ['¿Cuál es la primera regla de ARIA según el W3C?', 'No usar ARIA si existe un elemento HTML nativo que haga lo mismo', ['Usar ARIA en todos los elementos', 'Usar solo roles, nunca estados', 'Reemplazar las etiquetas por aria-label'], 'El HTML nativo ya trae la semántica y el comportamiento.', 3],
    ['Un formulario marca los errores solo pintando el borde de rojo. ¿Qué principio incumple?', 'Perceptible: la información no puede depender solo del color', ['Robusto', 'Operable', 'Ninguno'], 'Hay que agregar texto o íconos además del color.', 3],
    ['¿Qué parte de los problemas de accesibilidad detectan aproximadamente las herramientas automáticas?', 'Alrededor de un tercio', ['Todos', 'Ninguno', 'Más del 90%'], 'El resto requiere revisión manual, lector de pantalla y usuarios reales.', 3],
    { tf: 'La accesibilidad solo beneficia a personas con discapacidad permanente.', v: false, e: 'Beneficia también a quienes tienen limitaciones temporales o situacionales (el efecto rampa).', l: 2 },
    { tf: 'Una imagen puramente decorativa debe llevar alt vacío para que el lector de pantalla la ignore.', v: true, e: 'Si llevara una descripción, solo agregaría ruido.', l: 2 },
    { o: 'Ordena una evaluación de accesibilidad de lo más rápido a lo más profundo.', s: ['Herramienta automática (axe o Lighthouse)', 'Revisión manual con teclado y ampliación al 200%', 'Recorrido de tareas con un lector de pantalla', 'Prueba con personas con discapacidad'], e: 'Cada paso encuentra problemas que el anterior no detecta.', l: 2 },
    { c: 'Escribe «contraste(a, b)» que reciba dos colores en formato #rrggbb y devuelva la razón de contraste WCAG redondeada a 2 decimales.', f: 'contraste', p: ['a', 'b'], t: [[['#000000', '#ffffff'], 21], [['#777777', '#ffffff'], 4.48], [['#ffffff', '#ffffff'], 1]], sol: '  const L = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };\n  const x = Math.max(L(a), L(b)), y = Math.min(L(a), L(b));\n  return Math.round((x + 0.05) / (y + 0.05) * 100) / 100;', h: 'Convierte cada canal a lineal, calcula la luminancia relativa y aplica (L1 + 0.05)/(L2 + 0.05) con L1 la mayor.', l: 4 },
    { c: 'Escribe «cumpleAA(razon, grande)» que diga si un contraste cumple el nivel AA (4.5 para texto normal, 3 para texto grande).', f: 'cumpleAA', p: ['razon', 'grande'], t: [[[4.48, false], false], [[4.5, false], true], [[3.2, true], true], [[2.9, true], false]], sol: '  return razon >= (grande ? 3 : 4.5);', l: 1 }
  ],
  gen: function (g) {
    function L(h) { var c = [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16) / 255; }).map(function (v) { return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
    var pares = [['#ffffff', '#000000'], ['#777777', '#ffffff'], ['#595959', '#ffffff'], ['#0066cc', '#ffffff'], ['#ff0000', '#ffffff'], ['#333333', '#f5f5f5'], ['#999999', '#ffffff'], ['#1a7f37', '#ffffff']];
    pares.forEach(function (p) { var a = L(p[0]), b = L(p[1]), r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); g.mcq(3, '¿El texto ' + p[0] + ' sobre fondo ' + p[1] + ' (contraste ' + r.toFixed(2) + ':1) cumple AA para texto normal?', r >= 4.5 ? 'Sí' : 'No', [r >= 4.5 ? 'No' : 'Sí', 'Solo en pantallas grandes', 'Depende del navegador'], 'AA exige 4.5:1 para texto normal; este par da ' + r.toFixed(2) + ':1.'); });
    var casos = [['Videos sin subtítulos', 'Perceptible'], ['Un menú que solo se abre al pasar el ratón', 'Operable'], ['Un formulario que se envía solo al cambiar una opción, sin avisar', 'Comprensible'], ['Componentes personalizados sin rol ni nombre accesible', 'Robusto'], ['Imágenes informativas sin texto alternativo', 'Perceptible'], ['Una sesión que expira en 30 segundos sin opción de extenderla', 'Operable'], ['Mensajes de error que no dicen cómo corregir', 'Comprensible'], ['HTML con etiquetas mal cerradas que confunde a los lectores de pantalla', 'Robusto']];
    casos.forEach(function (c) { g.mcq(3, '¿Qué principio POUR se incumple? ' + c[0], c[1], ['Perceptible', 'Operable', 'Comprensible', 'Robusto'].filter(function (x) { return x !== c[1]; }), 'Perceptible: percibir; operable: manejar; comprensible: entender; robusto: funcionar con tecnologías de apoyo.'); });
    g.times(4, function (R) { var r = (R.int(20, 80) / 10); g.mcq(2, 'Un título grande tiene contraste ' + r.toFixed(1) + ':1. ¿Cumple AA para texto grande?', r >= 3 ? 'Sí' : 'No', [r >= 3 ? 'No' : 'Sí', 'Solo si es negrita', 'Solo en AAA'], 'Para texto grande AA exige 3:1.'); });
  },
  checks: [
    ['Explica el espectro de personas con un ejemplo de PatioApp.', 'Diseñar para quien no puede usar un brazo beneficia también a quien tiene uno lesionado y al revisor que sostiene un documento: botones grandes al alcance del pulgar sirven a todos.'],
    ['¿Qué significan los cuatro principios POUR?', 'Perceptible (se puede percibir), operable (se puede manejar), comprensible (se entiende) y robusto (funciona con tecnologías de apoyo).'],
    ['¿Por qué el HTML semántico es la base de la accesibilidad?', 'Porque los lectores de pantalla y el teclado dependen de los roles, nombres y estados que el HTML nativo ya trae; un div con un clic no los tiene.'],
    ['¿Por qué no basta con pasar una herramienta automática?', 'Porque detecta alrededor de un tercio de los problemas; el orden lógico, la calidad del texto alternativo o la experiencia con lector de pantalla requieren revisión humana.'],
    ['¿Qué es el efecto rampa y por qué importa en software?', 'Que las adaptaciones pensadas para personas con discapacidad terminan beneficiando a todos; subtítulos, buen contraste y teclado mejoran el uso general.']
  ],
  cites: ['W3C (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. w3.org/TR/WCAG22.', 'Organización Mundial de la Salud (2023). *Disability: Fact sheet*. who.int.', 'Congreso de la República del Perú (2012). *Ley 29973, Ley General de la Persona con Discapacidad*.', 'Holmes, K. (2018). *Mismatch: How Inclusion Shapes Design*. MIT Press.', 'WebAIM (2024). *The WebAIM Million*. webaim.org/projects/million.', 'Blackwell, A. G. (2017). The Curb-Cut Effect. *Stanford Social Innovation Review*, 15(1).'],
  project: { t: 'Auditoría de accesibilidad WCAG 2.2',
    goal: 'Auditar una aplicación web con método y corregir sus problemas de accesibilidad.',
    steps: ['Pasa axe o Lighthouse a tres páginas y registra los hallazgos automáticos.', 'Recorre las tareas principales solo con teclado: orden de foco, foco visible y trampas de teclado.', 'Recorre las mismas tareas con un lector de pantalla (NVDA o VoiceOver) y anota lo que no se entiende.', 'Calcula el contraste de los pares de colores del tema con tu propia función y corrige los que no alcanzan AA.', 'Corrige los problemas, vuelve a evaluar y agrega pruebas automáticas de accesibilidad a la integración continua.'],
    deliver: 'El informe de auditoría con cada criterio WCAG afectado, las correcciones y la comparación antes y después.' },
  hito: ['Audita PatioApp con WCAG 2.2 nivel AA (contraste, teclado, etiquetas de formularios y lector de pantalla) y corrige los hallazgos.', 'Agrega pruebas automáticas de accesibilidad (por ejemplo, axe) a la integración continua de PatioApp.']
});
})();
