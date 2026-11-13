(function () {
var X = SDC.X, XM = SDC.XM;
XM('m12', {
  uni: 'CMU 17-313 *Foundations of Software Engineering* (procesos y gestión); Berkeley CS169 *Software Engineering* (desarrollo ágil); Oxford *Software Engineering Programme* (Agile Methods, Risk Management); áreas *Software Engineering Process* y *Software Engineering Management* de SWEBOK v4. En Perú: Gestión de Proyectos de Software e Ingeniería de Software II (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Plan de proyecto de PatioApp v1.0',
    goal: 'Planificar y gestionar la entrega de PatioApp v1.0 como lo haría un líder de proyecto: proceso, estimación, riesgos y seguimiento.',
    steps: ['Elige y justifica el ciclo de vida y el marco de trabajo (Scrum, Kanban o una combinación).', 'Estima el backlog con dos técnicas distintas y produce un pronóstico de fecha con rango de confianza mediante Monte Carlo.', 'Construye un registro de riesgos y haz un pre-mortem.', 'Ejecuta al menos dos iteraciones registrando las métricas de flujo y la velocidad real.', 'Escribe un informe de estado para un patrocinador no técnico: avance, riesgos, decisiones pendientes.'],
    deliver: 'El plan, el tablero, las métricas de dos iteraciones, el registro de riesgos y el informe de estado.' }
});

X('m12.life', {
  deep: `
## El malentendido más famoso de la ingeniería de software
En 1970, Winston Royce publicó *Managing the Development of Large Software Systems*. Su figura más conocida muestra las fases en secuencia: requisitos, análisis, diseño, codificación, pruebas y operación. Pero en el mismo artículo Royce escribió que ese esquema simple era **arriesgado e invitaba al fracaso**, y propuso agregar iteraciones, prototipos ("hazlo dos veces") y participación del cliente. La palabra "cascada" la usaron después otros autores (Bell y Thayer, 1976), y en 1985 el estándar militar estadounidense DOD-STD-2167 la volvió obligatoria. Craig Larman y Victor Basili documentaron en 2003 que el desarrollo **iterativo e incremental** se usaba desde los años 50 y 60, incluso en proyectos de la NASA.

## Brooks cambia de opinión
En *The Mythical Man-Month* (1975), Fred Brooks aconsejó: "planifica desechar uno; lo harás de todos modos", es decir, construir un prototipo para aprender. En la edición de aniversario (1995) reconoció que ese consejo suponía el modelo en cascada y que el **desarrollo incremental**, que hace crecer el sistema en lugar de construirlo y tirarlo, es mejor.

## El modelo en espiral, guiado por el riesgo
Barry Boehm presentó el **modelo en espiral** en 1986 (publicado en *IEEE Computer* en 1988). Cada vuelta tiene cuatro cuadrantes: determinar objetivos y restricciones, **evaluar alternativas y resolver riesgos**, desarrollar y verificar, y planificar la siguiente vuelta. Su aporte clave: el proceso no es fijo; lo decide el **riesgo**. Si el mayor riesgo es no entender al usuario, la siguiente vuelta es un prototipo; si es el rendimiento, una prueba de concepto técnica.

## El Proceso Unificado
El Proceso Unificado de Rational (RUP), descrito por Philippe Kruchten, organizó el desarrollo iterativo en cuatro fases: **inicio** (¿vale la pena?), **elaboración** (arquitectura estable y riesgos principales resueltos), **construcción** (la mayoría del código) y **transición** (entrega a los usuarios). Cada fase tiene varias iteraciones. Muchas ideas de RUP sobreviven en la práctica actual, como atacar primero los riesgos arquitectónicos.

## Los procesos según la norma
La norma ISO/IEC/IEEE 12207 (2017) no impone un modelo: describe los **procesos** del ciclo de vida del software (acuerdo, gestión del proyecto, técnicos, de soporte) que cualquier organización debe cubrir de algún modo. Es útil en contratos con el Estado o con grandes empresas, que suelen exigir evidencia de esos procesos.

## Cómo elegir
Barry Boehm y Richard Turner propusieron en *Balancing Agility and Discipline* (2003) cinco factores para ubicar un proyecto entre lo ágil y lo planificado:
| Factor | Favorece lo ágil | Favorece lo planificado |
| Tamaño del equipo | pequeño | muy grande |
| Criticidad (qué se pierde si falla) | comodidad o dinero recuperable | vidas humanas |
| Dinamismo de los requisitos | cambian mucho | estables |
| Experiencia del personal | alta | mixta o baja |
| Cultura | prospera en la autonomía | prospera en el orden y los procedimientos |
Un software para un marcapasos y una app para un patio de autos no deben gestionarse igual.

## El costo de vivir: mantenimiento
Bennet Lientz y E. Burton Swanson estudiaron en 1980 cientos de organizaciones y encontraron que la mayor parte del esfuerzo de mantenimiento no es corregir errores sino **adaptar y mejorar**: cambios de entorno y nuevas funcionalidades pedidas por los usuarios. Robert Glass recopila en *Facts and Fallacies of Software Engineering* (2002) que el mantenimiento suele consumir entre 40% y 80% del costo total de vida de un sistema. Por eso diseñar para el cambio es diseñar para el costo real. El módulo de mantenimiento y evolución lo trata a fondo.

~~~js
// ¿Cuándo conviene entregar por incrementos? Valor acumulado en el tiempo
const meses = 6, valorTotal = 600;
const cascada = Array.from({ length: meses }, (_, m) => m === meses - 1 ? valorTotal : 0);
const incremental = Array.from({ length: meses }, () => valorTotal / meses);
let a = 0, b = 0;
for (let m = 0; m < meses; m++) { a += cascada[m] * (meses - m); b += incremental[m] * (meses - m); }
console.log('valor-mes recibido · cascada:', a, '· incremental:', b);
~~~
Entregar por partes no solo reduce el riesgo: el usuario empieza a obtener valor antes, y ese valor se acumula.`,
  checks: [
    ['¿Qué recomendaba realmente Royce en su artículo de 1970?', 'Advertía que el esquema secuencial puro era riesgoso y proponía iterar, prototipar ("hacerlo dos veces") y involucrar al cliente.'],
    ['¿Qué decide qué hacer en cada vuelta del modelo en espiral?', 'El riesgo: cada vuelta ataca el riesgo más importante en ese momento, con prototipos, pruebas de concepto o desarrollo, según el caso.'],
    ['¿En qué cambió de opinión Brooks entre 1975 y 1995?', 'En 1975 aconsejaba construir un sistema para desecharlo; en 1995 reconoció que el desarrollo incremental es mejor que construir y tirar.'],
    ['Un sistema de control de dosis de medicamentos para un hospital, con un equipo de 40 personas. ¿Hacia dónde lo ubicarías según Boehm y Turner?', 'Hacia el lado planificado y disciplinado: alta criticidad (vidas humanas) y equipo grande, aunque puede usar iteraciones internas.'],
    ['¿Por qué diseñar para el cambio reduce el costo total de un sistema?', 'Porque la mayor parte del costo de vida está en el mantenimiento, y la mayoría de ese mantenimiento son adaptaciones y mejoras.']
  ],
  cites: ['Royce, W. (1970). Managing the Development of Large Software Systems. *Proceedings of IEEE WESCON*.', 'Boehm, B. (1988). A Spiral Model of Software Development and Enhancement. *IEEE Computer*, 21(5).', 'Larman, C. y Basili, V. (2003). Iterative and Incremental Development: A Brief History. *IEEE Computer*, 36(6).', 'Brooks, F. P. (1995). *The Mythical Man-Month*, edición de aniversario. Addison-Wesley.', 'Boehm, B. y Turner, R. (2003). *Balancing Agility and Discipline*. Addison-Wesley.', 'Sommerville, I. (2016). *Software Engineering* (10.ª ed.). Pearson. Capítulo 2.'],
  project: { t: 'Elegir el ciclo de vida para tres proyectos',
    goal: 'Practicar la decisión de qué proceso usar según el contexto, justificándola con criterios de la literatura.',
    steps: ['Describe tres proyectos distintos: una app para un patio de autos, el software de un dispositivo médico y la migración del sistema de una municipalidad.', 'Evalúa cada uno con los cinco factores de Boehm y Turner.', 'Propón un ciclo de vida para cada uno (incremental, espiral, en V u otro) y las entregas principales.', 'Identifica el riesgo principal de cada proyecto y cómo lo ataca tu proceso en las primeras semanas.', 'Compara tus propuestas con un compañero y discutan las diferencias.'],
    deliver: 'Un documento con los tres análisis, una tabla comparativa y las conclusiones de la discusión.' },
  hito: ['Escribe el plan de ciclo de vida de PatioApp: entregas incrementales (v0.x hasta v1.0) con el objetivo de cada una.', 'Indica qué riesgo reduce cada entrega, al estilo del modelo en espiral.']
});

X('m12.agile', {
  deep: `
## Antes del manifiesto
Hirotaka Takeuchi e Ikujiro Nonaka publicaron en 1986, en la *Harvard Business Review*, *The New New Product Development Game*: estudiaron empresas como Honda y Canon y compararon sus equipos con una melé de rugby (*scrum*), donde todos avanzan juntos en lugar de pasarse el trabajo como en una carrera de relevos. Ken Schwaber y Jeff Sutherland formalizaron Scrum para el software en la conferencia OOPSLA de 1995. Kent Beck publicó *Extreme Programming Explained* en 1999.

## El manifiesto, completo
En febrero de 2001, 17 personas se reunieron en Snowbird (Utah) y firmaron el **Manifiesto Ágil**: valoran más a los individuos y sus interacciones que los procesos y herramientas, el software funcionando que la documentación exhaustiva, la colaboración con el cliente que la negociación contractual, y responder al cambio que seguir un plan. El texto aclara: "aunque valoramos los elementos de la derecha, valoramos más los de la izquierda". No dice "sin documentación" ni "sin plan". Lo acompañan 12 principios, entre ellos entregar software funcionando con frecuencia, un ritmo sostenible, la excelencia técnica y la simplicidad ("el arte de maximizar la cantidad de trabajo no realizado").

## Scrum según la Guía de 2020
La Guía de Scrum de Schwaber y Sutherland (versión 2020) define:
- **Tres responsabilidades:** Product Owner (maximiza el valor y ordena el backlog), Scrum Master (efectividad del equipo y de Scrum) y **Developers** (todos los que construyen el incremento, no solo programadores).
- **Cinco eventos:** el Sprint (un mes o menos), la planificación, el Scrum diario (15 minutos), la revisión y la retrospectiva.
- **Tres artefactos con sus compromisos:** backlog del producto con el **objetivo del producto**, backlog del sprint con el **objetivo del sprint**, e incremento con la **definición de terminado**.
Scrum se apoya en tres pilares empíricos: **transparencia, inspección y adaptación**. Es un marco deliberadamente incompleto: no dice cómo programar ni cómo estimar.

## XP: lo que Scrum no dice
La Programación Extrema propone valores (comunicación, simplicidad, retroalimentación, coraje y respeto) y prácticas técnicas: pruebas primero, integración continua, refactorización, programación en pareja, entregas pequeñas, diseño simple y propiedad colectiva del código. Muchos equipos que adoptan "Scrum" sin estas prácticas acumulan deuda técnica y terminan entregando cada vez más lento.

## Kanban y el flujo
Kanban viene del sistema de producción de Toyota, desarrollado por Taiichi Ohno. David J. Anderson lo adaptó al trabajo del conocimiento en *Kanban* (2010) con prácticas como visualizar el trabajo, **limitar el trabajo en curso** (WIP), gestionar el flujo y explicitar las políticas. La teoría detrás es la **ley de Little** (John Little, 1961):
:::flow Tiempo de entrega promedio = Trabajo en curso promedio / Rendimiento promedio
Si el equipo termina 10 tareas por semana y tiene 30 en curso, cada tarea tarda en promedio 3 semanas. Para entregar más rápido, la palanca más barata no es trabajar más horas: es **empezar menos** cosas a la vez.
~~~js
const rendimientoPorSemana = 10;
for (const wip of [30, 20, 10]) console.log('WIP', wip, '→ tiempo de entrega promedio', (wip / rendimientoPorSemana).toFixed(1), 'semanas');
~~~

## Lean en el software
Mary y Tom Poppendieck tradujeron los principios de manufactura esbelta al software en *Lean Software Development* (2003): eliminar desperdicios (trabajo a medias, funcionalidades que nadie usa, esperas, cambios de tarea, defectos), amplificar el aprendizaje, decidir lo más tarde responsable, entregar lo más rápido posible, empoderar al equipo, construir la integridad y ver el todo.

## Métricas y la ley de Goodhart
Las métricas de flujo más útiles son el **tiempo de ciclo** (desde que se empieza hasta que se termina), el **rendimiento** (cuántas cosas se terminan por periodo), el **trabajo en curso** y el **diagrama de flujo acumulado**. La **velocidad** sirve para que el propio equipo planifique, nunca para comparar equipos ni como meta: Marilyn Strathern resumió así la ley de Goodhart, "cuando una medida se convierte en objetivo, deja de ser una buena medida". Un equipo presionado a subir su velocidad simplemente infla sus estimaciones.

## Críticas que conviene conocer
Dave Thomas, uno de los firmantes del manifiesto, dio en 2014 la charla *Agile is Dead (Long Live Agility)*, criticando que "Agile" se convirtiera en un producto de certificaciones y consultoría. Los marcos para escalar (SAFe, LeSS) generan debate sobre cuánta burocracia reintroducen. La lección: lo ágil son ciclos cortos de retroalimentación con el usuario y excelencia técnica, no ceremonias.`,
  checks: [
    ['¿El Manifiesto Ágil dice que no hay que documentar ni planificar?', 'No. Dice que valora más el software funcionando y responder al cambio, pero reconoce explícitamente que la documentación y el plan también tienen valor.'],
    ['Según la Guía de Scrum 2020, ¿qué compromiso acompaña a cada artefacto?', 'Backlog del producto: objetivo del producto; backlog del sprint: objetivo del sprint; incremento: definición de terminado.'],
    ['Un equipo termina 8 tareas por semana y tiene 24 en curso. ¿Cuál es el tiempo de entrega promedio y cómo lo reducirías?', '24 / 8 = 3 semanas. Reduciendo el trabajo en curso (por ejemplo, con un límite WIP de 12 bajaría a 1.5 semanas con el mismo rendimiento).'],
    ['¿Por qué no se debe usar la velocidad para comparar equipos?', 'Porque los puntos son relativos a cada equipo; si se vuelve meta, la gente infla las estimaciones (ley de Goodhart) y la métrica pierde utilidad.'],
    ['¿Qué aporta XP que Scrum no especifica?', 'Las prácticas técnicas: pruebas primero, integración continua, refactorización, programación en pareja, diseño simple y entregas pequeñas.']
  ],
  cites: ['Takeuchi, H. y Nonaka, I. (1986). The New New Product Development Game. *Harvard Business Review*, 64(1).', 'Beck, K. et al. (2001). *Manifesto for Agile Software Development*. agilemanifesto.org.', 'Schwaber, K. y Sutherland, J. (2020). *The Scrum Guide*. scrumguides.org.', 'Beck, K. y Andres, C. (2004). *Extreme Programming Explained* (2.ª ed.). Addison-Wesley.', 'Anderson, D. J. (2010). *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press.', 'Little, J. D. C. (1961). A Proof for the Queuing Formula: L = λW. *Operations Research*, 9(3).'],
  project: { t: 'Dos sprints y un tablero Kanban',
    goal: 'Vivir los eventos de Scrum y medir el flujo con Kanban en un proyecto pequeño.',
    steps: ['Arma el backlog de un proyecto pequeño con un objetivo de producto claro.', 'Ejecuta dos sprints de una semana: planificación con objetivo del sprint, registro diario, revisión con alguien que haga de usuario y retrospectiva con acciones concretas.', 'Lleva en paralelo un tablero Kanban con límites WIP y registra el tiempo de ciclo de cada tarea.', 'Dibuja el diagrama de flujo acumulado y verifica la ley de Little con tus datos.', 'Escribe qué cambiarías en el tercer sprint según tus retrospectivas.'],
    deliver: 'El tablero, las notas de cada evento, el diagrama de flujo acumulado y la reflexión final.' },
  hito: ['Crea el tablero Kanban de PatioApp (por ejemplo, en GitHub Projects) con columnas, límites WIP y una definición de terminado escrita.', 'Planifica un sprint de dos semanas con su objetivo, ejecútalo y registra la retrospectiva con al menos dos acciones de mejora.']
});

X('m12.est', {
  deep: `
## Estimación, objetivo y compromiso no son lo mismo
Steve McConnell lo aclara al inicio de *Software Estimation: Demystifying the Black Art* (2006):
- **Estimación:** una predicción de cuánto tardará algo, con su incertidumbre.
- **Objetivo:** lo que el negocio desea ("lo necesitamos para la feria de marzo").
- **Compromiso:** lo que el equipo promete entregar.
Muchas peleas en los proyectos vienen de confundirlos: alguien pide una estimación pero en realidad quiere que se confirme su objetivo. Una buena respuesta separa las tres cosas: "con lo que sabemos, estimamos entre 8 y 12 semanas; para marzo podemos comprometer este alcance reducido".

## La incertidumbre es parte del dato
El **cono de la incertidumbre**, con datos de Boehm (1981) popularizados por McConnell, muestra que al inicio de un proyecto una estimación puede errar entre 4 veces por arriba y 4 veces por abajo, y que el rango se estrecha a medida que se toman decisiones. Se estrecha por **decisiones**, no por el paso del tiempo: si el proyecto avanza sin definir nada, la incertidumbre no baja. Por eso una estimación profesional se expresa como **rango**, no como un número.

## Sesgos que nos hacen optimistas
- **Falacia de la planificación** (Kahneman y Tversky, 1979): subestimamos sistemáticamente nuestras tareas, aunque sepamos que tareas parecidas tardaron más.
- **Ley de Hofstadter** (Douglas Hofstadter, *Gödel, Escher, Bach*, 1979): "siempre toma más tiempo del que esperas, incluso cuando tienes en cuenta la ley de Hofstadter".
- **Ley de Parkinson** (1955): el trabajo se expande hasta ocupar el tiempo disponible.
- **Síndrome del estudiante** (Eliyahu Goldratt, *Critical Chain*, 1997): si hay holgura, se empieza tarde y la holgura se consume.
El antídoto propuesto por Bent Flyvbjerg es el **pronóstico por clase de referencia**: en lugar de imaginar tu proyecto, mira cuánto tardaron realmente proyectos parecidos y parte de esa distribución.

## Técnicas, de la más simple a la más formal
- **Analogía:** "se parece a lo que hicimos en el proyecto X".
- **Descomposición:** dividir en tareas pequeñas; los errores de estimación se compensan parcialmente.
- **Tres puntos (PERT):** optimista, más probable y pesimista: E = (O + 4M + P) / 6, con desviación ≈ (P − O) / 6.
- **Delphi de banda ancha:** desarrollado en RAND en los años 50 y adaptado al software por Boehm: varios expertos estiman a ciegas, discuten las diferencias y repiten.
- **Planning Poker:** propuesto por James Grenning en 2002 como versión ágil y rápida del Delphi.
- **Puntos de función:** Allan Albrecht, de IBM, propuso en 1979 medir el tamaño funcional contando entradas, salidas, consultas, archivos internos e interfaces externas, sin depender del lenguaje.
- **Modelos paramétricos:** COCOMO (Boehm, 1981; COCOMO II en 2000) estima el esfuerzo a partir del tamaño y de factores del proyecto.

## Pronóstico con datos: Monte Carlo
Si ya tienes historial (cuántas tareas termina el equipo por semana), puedes simular miles de futuros posibles en lugar de adivinar:
~~~js
const historial = [4, 7, 5, 3, 6, 8, 5, 4];      // tareas terminadas por semana
const pendientes = 40, simulaciones = 10000, semanas = [];
for (let s = 0; s < simulaciones; s++) {
  let hechas = 0, n = 0;
  while (hechas < pendientes) { hechas += historial[Math.floor(Math.random() * historial.length)]; n++; }
  semanas.push(n);
}
semanas.sort((a, b) => a - b);
const p = q => semanas[Math.floor(q * simulaciones)];
console.log('50%:', p(0.5), 'semanas · 85%:', p(0.85), 'semanas · 95%:', p(0.95), 'semanas');
~~~
"Con 85% de confianza terminamos en X semanas" es mucho más honesto y útil que una fecha única. El movimiento **#NoEstimates** (Woody Zuill, Vasco Duarte) propone justamente reemplazar la estimación detallada de cada tarea por este tipo de pronóstico basado en el flujo real.

## Brooks, con números
La **ley de Brooks** dice que agregar personas a un proyecto atrasado lo atrasa más. Hay dos razones: los recién llegados necesitan tiempo para aprender y quitan tiempo a los veteranos que los enseñan, y los canales de comunicación crecen como n(n − 1)/2: con 5 personas hay 10 canales; con 10, 45. Brooks también advirtió que las tareas no son divisibles a voluntad: "dar a luz a un niño toma nueve meses, sin importar cuántas mujeres se asignen".`,
  checks: [
    ['Tu jefe pregunta "¿lo tienes para el viernes?". ¿Qué tres cosas conviene separar en la respuesta?', 'La estimación (cuánto creo que tomará, con rango), el objetivo (el viernes) y el compromiso (qué alcance puedo prometer para el viernes).'],
    ['¿Qué hace que el cono de la incertidumbre se estreche?', 'Las decisiones y el conocimiento que se van obteniendo (requisitos definidos, diseño elegido), no el simple paso del tiempo.'],
    ['Calcula la estimación PERT con O = 4, M = 6 y P = 14 días.', '(4 + 24 + 14) / 6 = 7 días, con desviación de (14 − 4) / 6 ≈ 1.7 días.'],
    ['¿Qué ventaja tiene un pronóstico Monte Carlo frente a una estimación de una sola fecha?', 'Usa datos reales del equipo y da una distribución con niveles de confianza, en lugar de un número único que oculta la incertidumbre.'],
    ['Un equipo de 4 pasa a 8 personas. ¿Cuántos canales de comunicación había y cuántos hay ahora?', 'Antes 4·3/2 = 6; ahora 8·7/2 = 28.']
  ],
  cites: ['McConnell, S. (2006). *Software Estimation: Demystifying the Black Art*. Microsoft Press.', 'Boehm, B. (1981). *Software Engineering Economics*. Prentice Hall.', 'Brooks, F. P. (1975). *The Mythical Man-Month*. Addison-Wesley. Capítulo 2.', 'Kahneman, D. y Tversky, A. (1979). Intuitive Prediction: Biases and Corrective Procedures. *TIMS Studies in Management Science*, 12.', 'Albrecht, A. (1979). Measuring Application Development Productivity. *Joint SHARE/GUIDE/IBM Application Development Symposium*.', 'Flyvbjerg, B. (2006). From Nobel Prize to Project Management: Getting Risks Right. *Project Management Journal*, 37(3).'],
  project: { t: 'Estimar con tres técnicas y pronosticar con datos',
    goal: 'Comparar técnicas de estimación con la realidad y aprender a comunicar la incertidumbre.',
    steps: ['Toma 15 tareas de un proyecto propio y estímalas con tres puntos (PERT) y con puntos de historia mediante Planning Poker (con compañeros o en solitario con tarjetas).', 'Ejecuta las tareas registrando el tiempo real de cada una.', 'Calcula el error de cada técnica y cuántas tareas cayeron dentro del rango estimado.', 'Con tu rendimiento semanal real, haz un pronóstico Monte Carlo para las tareas restantes.', 'Redacta un mensaje a un cliente comunicando la fecha con su nivel de confianza.'],
    deliver: 'La hoja de estimaciones y tiempos reales, el código de la simulación y el mensaje al cliente.' },
  hito: ['Estima el backlog de PatioApp con puntos de historia o tres puntos y registra, para cada tarea, lo estimado y lo real.', 'Pronostica la fecha de PatioApp v1.0 con una simulación Monte Carlo basada en tu rendimiento real, con fechas al 50% y al 85% de confianza.']
});

X('m12.risk', {
  deep: `
## Gestionar riesgos es gestionar proyectos
Tom DeMarco y Timothy Lister escribieron en *Waltzing with Bears* (2003) que la gestión de riesgos es la gestión de proyectos para adultos: aceptar que hay cosas que pueden salir mal y prepararse, en lugar de planificar como si todo fuera a salir bien. Barry Boehm publicó en 1991 (*Software Risk Management: Principles and Practices*) una lista de los diez riesgos más comunes, que sigue sorprendentemente vigente: déficit de personal, calendarios y presupuestos irreales, desarrollar las funciones equivocadas, la interfaz equivocada, el exceso de adornos (*gold plating*), cambios continuos de requisitos, componentes externos deficientes, tareas externas deficientes, problemas de rendimiento en tiempo real y exigir más de lo que la tecnología permite.

## Por qué fracasa el software
Robert Charette analizó en *Why Software Fails* (IEEE Spectrum, 2005) decenas de fracasos costosos y encontró causas que se repiten: objetivos poco realistas, estimaciones imprecisas, requisitos mal definidos, mala comunicación entre interesados, tecnología inmadura, mala gestión de riesgos y presiones comerciales. Pocas veces la causa es un error de programación aislado.

## Herramientas concretas
- **Registro de riesgos:** una tabla viva con cada riesgo, su probabilidad, su impacto, su exposición (probabilidad × impacto), la respuesta elegida, el **disparador** (qué señal indica que se está materializando) y un **dueño**.
- **Pre-mortem:** Gary Klein lo propuso en la *Harvard Business Review* en 2007. Antes de empezar, el equipo imagina que el proyecto **ya fracasó** y cada persona escribe por qué. Al legitimar el pesimismo, aparecen riesgos que nadie se atrevía a mencionar.
- **Reservas:** de tiempo y de presupuesto, dimensionadas según la exposición total, no como un porcentaje arbitrario.
~~~js
const riesgos = [
  { r: 'El servicio de consulta de placas cambia su formato', p: 0.3, impacto: 10 },
  { r: 'El único desarrollador que conoce la facturación renuncia', p: 0.1, impacto: 40 },
  { r: 'Los revisores no adoptan la app en el celular', p: 0.4, impacto: 25 }
];
riesgos.map(x => ({ ...x, exposicion: x.p * x.impacto })).sort((a, b) => b.exposicion - a.exposicion)
  .forEach(x => console.log(x.exposicion.toFixed(1), 'días ·', x.r));
console.log('reserva sugerida:', riesgos.reduce((s, x) => s + x.p * x.impacto, 0).toFixed(1), 'días');
~~~

## La ley de Conway
Melvin Conway escribió en 1968 (*How Do Committees Invent?*):
:::cita Cualquier organización que diseña un sistema producirá un diseño cuya estructura es una copia de la estructura de comunicación de la organización. | Melvin Conway (1968), traducción propia.
Si tres equipos construyen un compilador, saldrá un compilador de tres pasadas. Es un riesgo y una herramienta: la **maniobra inversa de Conway** consiste en organizar los equipos según la arquitectura que se desea. Matthew Skelton y Manuel Pais desarrollaron esta idea en *Team Topologies* (2019).

## Economía: decidir con el costo del retraso
Donald Reinertsen propone en *The Principles of Product Development Flow* (2009) cuantificar el **costo del retraso**: cuánto dinero se pierde por cada semana que algo no está en producción. Con él se prioriza mediante **WSJF** (trabajo más corto ponderado primero): costo del retraso dividido entre la duración. Una funcionalidad que vale S/ 10 000 por semana y toma 2 semanas va antes que una que vale S/ 15 000 por semana y toma 6.
Otros conceptos que debes manejar:
- **Costo hundido:** lo ya gastado no debe influir en la decisión de seguir; solo importa el costo y el valor futuros. Seguir con un proyecto malo "porque ya invertimos mucho" es una falacia.
- **Costo de oportunidad:** el valor de la mejor alternativa a la que renuncias.
- **Construir o comprar:** comprar o usar un servicio cuesta dinero pero ahorra tiempo y mantenimiento; construir da control pero exige mantenerlo para siempre. Construye lo que te diferencia; compra lo que es común.
El módulo de fundamentos de ingeniería y economía profundiza en valor presente, retorno de la inversión y costo total de propiedad.`,
  checks: [
    ['¿Qué es un pre-mortem y por qué funciona?', 'Un ejercicio en el que el equipo imagina que el proyecto ya fracasó y escribe por qué. Funciona porque legitima el pesimismo y saca a la luz riesgos que nadie mencionaba.'],
    ['¿Qué tiene que tener cada riesgo en un registro útil?', 'Descripción, probabilidad, impacto, exposición, respuesta elegida, disparador o señal temprana y un dueño responsable.'],
    ['Tres equipos separados construyen un sistema. ¿Qué predice la ley de Conway sobre su arquitectura?', 'Que el sistema tenderá a dividirse en tres partes que reflejen la comunicación entre los equipos, con las interfaces donde se comunican.'],
    ['Prioriza con WSJF: A vale S/ 8000 por semana y dura 2 semanas; B vale S/ 12 000 por semana y dura 6.', 'A: 8000/2 = 4000; B: 12 000/6 = 2000. Primero A.'],
    ['Un proyecto lleva S/ 200 000 gastados y terminarlo cuesta S/ 150 000 más, pero el valor esperado es S/ 100 000. ¿Qué dice el razonamiento económico?', 'Lo gastado es costo hundido y no cuenta; terminar cuesta 150 000 para obtener 100 000, así que conviene detenerlo o cambiar de rumbo.']
  ],
  cites: ['Boehm, B. (1991). Software Risk Management: Principles and Practices. *IEEE Software*, 8(1).', 'DeMarco, T. y Lister, T. (2003). *Waltzing with Bears: Managing Risk on Software Projects*. Dorset House.', 'Charette, R. (2005). Why Software Fails. *IEEE Spectrum*, 42(9).', 'Klein, G. (2007). Performing a Project Premortem. *Harvard Business Review*, 85(9).', 'Conway, M. (1968). How Do Committees Invent? *Datamation*, 14(4).', 'Reinertsen, D. (2009). *The Principles of Product Development Flow*. Celeritas.'],
  project: { t: 'Registro de riesgos y pre-mortem',
    goal: 'Identificar, cuantificar y planificar la respuesta a los riesgos de un proyecto real.',
    steps: ['Haz un pre-mortem de un proyecto propio con al menos dos personas (o en solitario con 15 minutos de escritura libre).', 'Convierte las causas en un registro de riesgos con probabilidad, impacto en días, exposición, respuesta, disparador y dueño.', 'Calcula la reserva de tiempo a partir de la exposición total.', 'Revisa la lista de los diez riesgos de Boehm y agrega los que falten.', 'Prioriza el backlog con WSJF estimando el costo del retraso de cada funcionalidad.'],
    deliver: 'El registro de riesgos, las notas del pre-mortem y el backlog priorizado con WSJF.' },
  hito: ['Crea el registro de riesgos de PatioApp con al menos 10 riesgos, cada uno con probabilidad, impacto, exposición, respuesta, disparador y dueño.', 'Haz y documenta un pre-mortem de la entrega v1.0 y ajusta el plan según lo encontrado.']
});
})();
