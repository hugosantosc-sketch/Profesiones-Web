(function () {
var S = SDC.S;

S('m11', 'm11.usecases', { title: 'Casos de uso y modelado de procesos',
  ask: '¿Qué concepto de casos de uso o de modelado de procesos se aplica?',
  lesson: `
> **La idea en simple.** Una historia de usuario es una promesa de conversación: cabe en una tarjeta. Pero cuando la interacción tiene muchos caminos posibles (la tarjeta del cliente es rechazada, la placa no se lee, la unidad tiene una deuda, el sistema de la SUNAT no responde) hace falta escribir **todos** esos caminos con orden y detalle. Los casos de uso son la herramienta para eso, y los modelos de procesos muestran cómo encaja el sistema en el trabajo completo de la organización.

## Origen
Ivar Jacobson, ingeniero sueco que trabajó en los sistemas de conmutación telefónica de Ericsson, introdujo los **casos de uso** en 1987 y los popularizó en *Object-Oriented Software Engineering* (1992). Luego se integraron a UML. Alistair Cockburn escribió en 2000 *Writing Effective Use Cases*, el libro que convirtió la técnica en una práctica de escritura disciplinada, y es la referencia que seguimos aquí.

## Qué es un caso de uso
Un caso de uso describe **cómo un actor logra un objetivo** interactuando con el sistema, incluyendo todo lo que puede salir bien o mal. Sus elementos:
- **Actor principal:** quien tiene el objetivo (el operador de patio). Los actores son **roles**, no personas: una misma persona puede ser operador y supervisor.
- **Actores secundarios:** otros sistemas o personas que el sistema necesita (la pasarela de pago, el servicio de comprobantes).
- **Alcance y nivel:** de qué sistema hablamos y a qué altura (ver abajo).
- **Precondiciones:** lo que debe ser cierto antes de empezar (el operador inició sesión).
- **Garantías:** lo que el sistema asegura al terminar, tanto si tuvo éxito (**garantía de éxito**) como si no (**garantía mínima**, por ejemplo "nunca se cobra sin registrar la salida").
- **Escenario principal de éxito:** los pasos del camino feliz, numerados.
- **Extensiones:** cada condición que desvía del camino feliz, ligada al paso donde ocurre, con su manejo.

## Niveles de objetivo
Cockburn distingue niveles con una metáfora del mar:
| Nivel | Símbolo | Ejemplo |
| Resumen (nube o cometa) | objetivo de negocio que abarca muchas sesiones | Gestionar la estadía de una unidad, desde el ingreso hasta la salida |
| Objetivo de usuario (nivel del mar) | lo que una persona hace en una sentada y la deja satisfecha | Registrar la salida de una unidad |
| Subfunción (pez o almeja) | paso reutilizable que no tiene valor por sí solo | Buscar una unidad por placa |
La regla práctica: la mayoría de los casos de uso deben estar **a nivel del mar**. Un caso de uso "Iniciar sesión" casi siempre es una subfunción: nadie se levanta en la mañana con el objetivo de iniciar sesión.

## Escribir un caso de uso completo
~~~txt
Caso de uso: Registrar la salida de una unidad
Actor principal: Operador de patio
Nivel: objetivo de usuario
Precondición: el operador inició sesión en una sede
Garantía mínima: no se libera un espacio sin registrar la salida; todo cobro queda asociado a una salida
Garantía de éxito: la salida queda registrada, el espacio libre, el cobro hecho y el comprobante emitido

Escenario principal:
 1. El operador escanea la placa de la unidad.
 2. El sistema muestra la unidad, su espacio y el monto de la estadía.
 3. El operador confirma el cobro.
 4. El sistema cobra con la pasarela de pago.
 5. El sistema libera el espacio y emite el comprobante electrónico.
 6. El sistema muestra la confirmación y la imprime.

Extensiones:
 1a. La placa no se lee: el operador la digita; continúa en el paso 2.
 2a. La unidad no está registrada en la sede: el sistema avisa y termina.
 2b. La unidad tiene deuda anterior: el sistema la suma al monto; continúa en el paso 3.
 4a. La pasarela rechaza el pago: el sistema informa el motivo; el operador puede reintentar con otro medio o cancelar.
 5a. El servicio de comprobantes no responde: el sistema registra la salida y deja el comprobante pendiente para reintento automático.
~~~
Observa que las extensiones se numeran con el paso donde ocurren y una letra. Una técnica de Cockburn para encontrarlas: recorrer cada paso preguntando "¿qué puede salir mal aquí?" y anotar **todas** las condiciones antes de decidir cómo manejar cada una. Las extensiones suelen ser donde está la mayor parte del trabajo real y de los errores de un sistema.

## Diagramas de casos de uso
UML ofrece un diagrama de casos de uso: actores como figuras de palitos, casos de uso como óvalos dentro de un rectángulo que marca el límite del sistema. Es útil como **índice** visual, pero su valor está en el texto, no en el diagrama. Las relaciones «include» (un caso de uso siempre usa otro) y «extend» (un caso de uso agrega comportamiento opcional a otro) generan muchas discusiones; Cockburn y Martin Fowler recomiendan usarlas poco.

## Errores frecuentes al escribir casos de uso
- **Describir la interfaz en lugar de la intención:** "el operador hace clic en el botón verde de la esquina" envejece con el primer rediseño; "el operador confirma el cobro" sigue siendo cierto.
- **Mezclar varios objetivos** en un solo caso de uso ("Gestionar unidades", que en realidad son diez casos distintos).
- **Olvidar al sistema como sujeto:** cada paso debe decir quién hace qué; "se cobra" no aclara si cobra el operador o el sistema.
- **Escribir solo el camino feliz:** sin extensiones, el caso de uso no aporta nada que una historia no diga.

## Casos de uso e historias
No compiten: se complementan.
- Las **historias** son pequeñas, se priorizan y estiman con facilidad, y son ideales para planificar.
- Los **casos de uso** dan el contexto completo y las extensiones, y son ideales para entender un flujo complejo.
Ivar Jacobson propuso en 2011 **Use-Case 2.0**: el caso de uso se corta en **rebanadas** (un escenario principal más algunas extensiones) y cada rebanada funciona como una historia en el backlog. Así, el registro de salida podría implementarse en tres rebanadas: el camino feliz con pago en efectivo, el pago con tarjeta y sus rechazos, y el comprobante con reintentos.

## Modelado de procesos de negocio
Un caso de uso se centra en un sistema; un **proceso de negocio** describe el trabajo completo de la organización, con varias personas, áreas y sistemas. Se modelan para entender cómo trabaja hoy la organización (**proceso actual**, *as-is*) y cómo trabajará con el nuevo sistema (**proceso futuro**, *to-be*). La notación estándar es **BPMN** (*Business Process Model and Notation*), del OMG, cuya versión 2.0 es de 2011 y también es norma ISO/IEC 19510. Sus elementos básicos:
- **Eventos** (círculos): inicio, intermedios y fin (llega una unidad, vence un plazo).
- **Actividades** (rectángulos redondeados): tareas que alguien o algo hace.
- **Compuertas** (rombos): decisiones y bifurcaciones; la exclusiva elige un camino, la paralela abre varios a la vez.
- **Carriles** (*lanes*): franjas que indican quién hace cada actividad (puerta, supervisor, contabilidad, PatioApp).
- **Flujos de secuencia** dentro de un proceso y **flujos de mensaje** entre participantes distintos.
:::flow Llega la unidad | Operador escanea placa | ¿Tiene daños? Si sí, toma fotos | Registrar ingreso | Asignar espacio
Dibujar el proceso actual suele revelar problemas que nadie veía: pasos duplicados, esperas largas entre áreas o datos que se digitan tres veces. Muchas veces el mayor beneficio del sistema nuevo viene de **rediseñar el proceso**, no solo de automatizarlo. Michael Hammer lo resumió en 1990 con su artículo *Reengineering Work: Don't Automate, Obliterate*: automatizar un proceso malo solo produce un proceso malo más rápido.

## Ejemplo resuelto: del proceso al caso de uso en PatioApp
1. **Proceso actual** en BPMN con carriles de puerta, supervisor y contabilidad: el operador anota la salida en el cuaderno, el supervisor la pasa a la hoja de cálculo al final del día y contabilidad emite la boleta al día siguiente. Problema visible: entre la salida física y el comprobante pasa un día, y a veces la boleta nunca se emite.
2. **Proceso futuro:** el operador registra la salida en PatioApp, que cobra y emite el comprobante en el momento; el carril del supervisor desaparece de este flujo.
3. El paso "registrar salida" del proceso futuro se detalla como el caso de uso anterior, con sus cinco extensiones.
4. El caso de uso se corta en tres rebanadas para el backlog, y cada extensión se convierte en un escenario Gherkin de prueba de aceptación.`,
  links: [['m11.stories', 'las rebanadas de casos de uso funcionan como historias'], ['m11.uml', 'UML incluye el diagrama de casos de uso y el de actividades'], ['m14.types', 'las extensiones se convierten en casos de prueba de aceptación']],
  read: 'Cockburn, *Writing Effective Use Cases* (2000); Jacobson, Spence y Bittner, *Use-Case 2.0* (2011); especificación BPMN 2.0 del OMG; Dumas y otros, *Fundamentals of Business Process Management* (2.ª ed., 2018).',
  terms: [
    ['Caso de uso', 'descripción de cómo un actor logra un objetivo con el sistema, incluyendo los caminos alternativos', ['Registrar la salida de una unidad.', 'Jacobson, 1987.', 'Cockburn lo convirtió en práctica de escritura.']],
    ['Actor', 'rol de una persona o sistema que interactúa con el sistema', ['Operador de patio.', 'La pasarela de pago como actor secundario.', 'Es un rol, no una persona.']],
    ['Escenario principal de éxito', 'secuencia numerada de pasos del camino en que todo sale bien', ['Escanear, mostrar, cobrar, liberar.', 'Se escribe primero.', 'Las extensiones se ligan a sus pasos.']],
    ['Extensión', 'condición que desvía del escenario principal en un paso dado, con su manejo', ['4a. La pasarela rechaza el pago.', 'Se numera con paso y letra.', 'Concentra gran parte del trabajo real.']],
    ['Garantía mínima', 'lo que el sistema asegura aunque el objetivo no se logre', ['Nunca se cobra sin registrar la salida.', 'Protege a todos los interesados.', 'Se complementa con la garantía de éxito.']],
    ['Nivel de objetivo de usuario', 'nivel de un caso de uso que una persona completa en una sentada y la deja satisfecha', ['Nivel del mar en la metáfora de Cockburn.', 'Registrar una salida.', 'La mayoría de los casos debe estar aquí.']],
    ['BPMN', 'notación estándar para modelar procesos de negocio con eventos, actividades, compuertas y carriles', ['Versión 2.0 de 2011.', 'Norma ISO/IEC 19510.', 'Muestra procesos actuales y futuros.']],
    ['Carril', 'franja de un diagrama BPMN que indica quién realiza cada actividad', ['Puerta, supervisor, contabilidad.', 'Revela traspasos entre áreas.', 'También se llama lane.']]
  ],
  q: [
    ['¿Qué nivel tiene el caso de uso "Iniciar sesión" en la mayoría de los sistemas?', 'Subfunción', ['Objetivo de usuario', 'Resumen', 'Nivel estratégico'], 'Nadie tiene como meta iniciar sesión.', 3],
    ['¿Dónde se describe qué pasa si la pasarela rechaza el pago?', 'En una extensión ligada al paso del cobro', ['En la precondición', 'En el nombre del caso de uso', 'En el diagrama de clases'], 'Extensión 4a.', 2],
    ['¿Qué es un actor?', 'Un rol que interactúa con el sistema, sea persona u otro sistema', ['Una persona específica con nombre', 'Una clase del código', 'Un servidor'], 'Una persona puede tener varios roles.', 1],
    ['¿Qué propone Use-Case 2.0?', 'Cortar los casos de uso en rebanadas que funcionan como elementos del backlog', ['Eliminar los casos de uso', 'Reemplazar UML por BPMN', 'Escribir casos de uso en código'], 'Jacobson, 2011.', 3],
    ['En BPMN, ¿qué representa un rombo?', 'Una compuerta de decisión o bifurcación', ['Una actividad', 'Un evento de inicio', 'Un carril'], 'Exclusiva o paralela.', 2],
    ['¿Para qué sirve modelar el proceso actual antes del futuro?', 'Para descubrir problemas como pasos duplicados, esperas o datos digitados varias veces', ['Para escribir el código', 'Para elegir el lenguaje', 'No sirve'], 'Muchas mejoras vienen de rediseñar el proceso.', 3],
    ['¿Qué sostiene Hammer en Reengineering Work: Don’t Automate, Obliterate?', 'Que automatizar un proceso malo solo lo hace malo más rápido; hay que rediseñarlo', ['Que todo debe automatizarse', 'Que BPMN es innecesario', 'Que los procesos no cambian'], 'Hammer, Harvard Business Review, 1990.', 4],
    { tf: 'El valor principal de los casos de uso está en el diagrama de óvalos, no en el texto.', v: false, e: 'El diagrama es un índice; el valor está en el texto con sus extensiones.', l: 2 },
    { tf: 'Una garantía mínima debe cumplirse incluso si el actor no logra su objetivo.', v: true, e: 'Protege a los interesados en todos los casos.', l: 2 },
    { o: 'Ordena los pasos para escribir un caso de uso según Cockburn.', s: ['Identificar actor y objetivo', 'Escribir el escenario principal de éxito', 'Listar todas las condiciones de extensión', 'Escribir el manejo de cada extensión'], e: 'Primero el camino feliz, luego todas las condiciones y por último su manejo.', l: 3 },
    { c: 'Escribe «extensionesDe(paso, extensiones)»: extensiones es una lista de textos como "4a. La pasarela rechaza el pago"; devuelve las que corresponden al número de paso dado.', f: 'extensionesDe', p: ['paso', 'extensiones'], t: [[[4, ['1a. No se lee', '4a. Rechazo', '4b. Sin red', '5a. Sin SUNAT']], ['4a. Rechazo', '4b. Sin red']], [[2, ['1a. x']], []], [[1, ['1a. x', '10a. y']], ['1a. x']]], sol: '  return extensiones.filter(e => parseInt(e, 10) === paso);', l: 3 }
  ],
  gen: function (g) {
    var niv = [['Gestionar la estadía de una unidad desde el ingreso hasta la salida', 'Resumen'], ['Registrar la salida de una unidad', 'Objetivo de usuario'], ['Buscar una unidad por placa', 'Subfunción'], ['Emitir el comprobante de una salida ya cobrada', 'Subfunción'], ['Registrar el ingreso de una unidad con daños', 'Objetivo de usuario'], ['Administrar la operación anual de una sede', 'Resumen']];
    niv.forEach(function (n) { g.mcq(3, 'Según Cockburn, ¿qué nivel tiene este caso de uso? ' + n[0], n[1], ['Resumen', 'Objetivo de usuario', 'Subfunción', 'Nivel de código'].filter(function (x) { return x !== n[1]; }), 'Nube, nivel del mar y pez.'); });
    var bp = [['Círculo que marca dónde empieza el proceso', 'Evento de inicio'], ['Rectángulo redondeado con una tarea', 'Actividad'], ['Rombo que elige un único camino', 'Compuerta exclusiva'], ['Rombo que abre varios caminos simultáneos', 'Compuerta paralela'], ['Franja que indica el responsable de las tareas', 'Carril'], ['Flecha punteada entre dos participantes distintos', 'Flujo de mensaje']];
    bp.forEach(function (b) { g.mcq(2, '¿Qué elemento BPMN es este? ' + b[0], b[1], ['Evento de inicio', 'Actividad', 'Compuerta exclusiva', 'Compuerta paralela', 'Carril', 'Flujo de mensaje'].filter(function (x) { return x !== b[1]; }).slice(0, 3), 'Elementos básicos de BPMN 2.0.'); });
    var par = [['Operador de patio', 'Actor principal'], ['Pasarela de pago', 'Actor secundario'], ['El operador inició sesión en una sede', 'Precondición'], ['Nunca se cobra sin registrar la salida', 'Garantía mínima'], ['La placa no se lee y se digita a mano', 'Extensión']];
    par.forEach(function (p) { g.mcq(2, 'En el caso de uso "Registrar la salida", ¿qué elemento es esto? ' + p[0], p[1], ['Actor principal', 'Actor secundario', 'Precondición', 'Garantía mínima', 'Extensión'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Elementos de un caso de uso completo.'); });
  },
  checks: [
    ['Escribe un caso de uso de nivel de usuario con al menos tres extensiones para un sistema que conozcas.', 'Debe tener actor, precondición, garantías, escenario principal numerado y extensiones ligadas a sus pasos.'],
    ['¿En qué se complementan casos de uso e historias de usuario?', 'Las historias sirven para planificar en piezas pequeñas; los casos de uso dan el contexto completo y las extensiones. Use-Case 2.0 los une con rebanadas.'],
    ['¿Para qué se modela un proceso de negocio con BPMN?', 'Para entender el trabajo completo de la organización, comparar el proceso actual con el futuro y detectar mejoras antes de automatizar.'],
    ['¿Por qué la mayoría de los casos de uso deben estar a nivel del objetivo de usuario?', 'Porque describen lo que una persona logra y valora en una sesión; los resúmenes son demasiado amplios y las subfunciones no tienen valor por sí solas.']
  ],
  cites: ['Jacobson, I. et al. (1992). *Object-Oriented Software Engineering: A Use Case Driven Approach*. Addison-Wesley.', 'Cockburn, A. (2000). *Writing Effective Use Cases*. Addison-Wesley.', 'Jacobson, I., Spence, I. y Bittner, K. (2011). *Use-Case 2.0: The Guide to Succeeding with Use Cases*. Ivar Jacobson International.', 'Object Management Group (2011). *Business Process Model and Notation (BPMN) Version 2.0*.', 'Hammer, M. (1990). Reengineering Work: Don’t Automate, Obliterate. *Harvard Business Review*, 68(4).'],
  project: { t: 'Del proceso al caso de uso',
    goal: 'Modelar un proceso real y especificar su caso de uso principal.',
    steps: ['Modela en BPMN el proceso actual de un trámite que conozcas (una matrícula, un pedido, una devolución), con carriles por área.', 'Señala en el diagrama al menos tres problemas (esperas, duplicaciones, traspasos innecesarios).', 'Diseña el proceso futuro con un sistema de software.', 'Escribe el caso de uso principal completo, con al menos cinco extensiones.', 'Córtalo en rebanadas para un backlog y escribe los escenarios Gherkin de cada extensión.'],
    deliver: 'Los diagramas BPMN actual y futuro, el caso de uso y las rebanadas con sus escenarios.' },
  hito: ['Modela en BPMN el proceso actual y el futuro de la salida de unidades de PatioApp.', 'Escribe el caso de uso "Registrar la salida de una unidad" con sus extensiones y conviértelas en escenarios de prueba de aceptación.']
});
SDC.after('m11.usecases', 'm11.stories');

S('m11', 'm11.spec', { title: 'Especificación, validación y gestión de requisitos',
  ask: '¿Qué concepto de especificación, validación o gestión de requisitos se aplica?',
  lesson: `
> **La idea en simple.** Tener requisitos escritos no basta: hay que asegurarse de que sean los correctos, de que todos los entiendan igual, de saber qué parte del sistema implementa cada uno y de qué hacer cuando alguien quiere cambiarlos a mitad de camino. Esta unidad trata de cómo se documentan, se revisan, se rastrean y se administran los requisitos durante toda la vida del proyecto.

## Verificar y validar
Barry Boehm resumió en 1979 la diferencia con dos preguntas que se repiten en todos los libros:
- **Validación:** ¿estamos construyendo el producto **correcto**? (¿esto es lo que el usuario necesita?)
- **Verificación:** ¿estamos construyendo el producto **correctamente**? (¿cumple lo especificado?)
En requisitos, validar significa confirmar con los interesados que los requisitos reflejan sus necesidades reales; verificar significa comprobar que el documento es consistente, completo y que cada requisito tiene la calidad debida. Un sistema puede pasar todas las pruebas (verificado) y ser inútil (no validado) si se especificó lo que nadie necesitaba.

## El documento de especificación
La norma **ISO/IEC/IEEE 29148** (2011, revisada en 2018), sucesora de la clásica IEEE 830 de 1998, describe el contenido de una **especificación de requisitos de software** (SRS):
1. **Introducción:** propósito, alcance, definiciones, referencias y visión general.
2. **Descripción general:** perspectiva del producto, funciones principales, características de los usuarios, restricciones, supuestos y dependencias.
3. **Requisitos específicos:** interfaces externas, funciones, requisitos de rendimiento, de base de datos lógica, restricciones de diseño y atributos de calidad.
4. **Verificación:** cómo se comprobará cada requisito.
5. **Apéndices y glosario.**
No todo proyecto necesita un documento formal así. Un sistema médico o un contrato público lo exigen; un producto digital en exploración vive mejor con un backlog, una visión de una página y criterios de aceptación. Lo que **siempre** conviene tener es un **glosario**: que "unidad", "espacio", "estadía" y "salida" signifiquen lo mismo para todos evita una cantidad sorprendente de defectos. Eric Evans llama a esto **lenguaje ubicuo**.

## Técnicas de validación
- **Revisiones e inspecciones:** lectura sistemática del documento por varias personas con una lista de verificación. Michael Fagan formalizó las inspecciones en IBM en 1976; los estudios de la época mostraron que encontraban la mayoría de los defectos antes de las pruebas, con un costo muy inferior. En requisitos, la **lectura basada en perspectivas** (Basili y otros, 1996) asigna a cada revisor un punto de vista (usuario, diseñador, tester) para que busquen problemas distintos.
- **Prototipos:** que el usuario vea y pruebe algo concreto.
- **Escritura temprana de pruebas de aceptación:** si no se puede escribir la prueba, el requisito no está claro. Es la base del BDD que viste con las historias.
- **Modelos y análisis automático:** un modelo de estados o una especificación formal permite detectar contradicciones con herramientas, como verás en Métodos formales.

Lista típica de verificación de un requisito: ¿es correcto, sin ambigüedades, completo, consistente con los demás, priorizado, verificable, modificable y trazable? Son las cualidades que la norma IEEE 830 ya pedía en 1998.

## Trazabilidad
La **trazabilidad** es la capacidad de seguir un requisito hacia atrás (de dónde viene: qué interesado, ley o meta lo originó) y hacia adelante (qué diseño, código y pruebas lo implementan y verifican). Orlena Gotel y Anthony Finkelstein la analizaron en 1994 y mostraron que la mayoría de los problemas venían de la trazabilidad **previa** a la especificación: no saber quién pidió algo ni por qué. Para qué sirve:
- **Análisis de impacto:** si cambia la Ley de Protección de Datos, ¿qué requisitos, módulos y pruebas hay que revisar?
- **Cobertura:** ¿cada requisito tiene al menos una prueba? ¿Hay código que no responde a ningún requisito?
- **Auditoría y certificación:** en dominios regulados (aviación con DO-178C, dispositivos médicos con IEC 62304, automotriz con ISO 26262) la trazabilidad completa es obligatoria.
La herramienta básica es la **matriz de trazabilidad**: requisitos en las filas y artefactos (historias, módulos, pruebas) en las columnas.
~~~js
// Matriz de trazabilidad mínima: ¿qué requisitos no tienen prueba?
const pruebas = {
  'RF-01 registrar salida': ['salida_feliz.feature', 'salida_deuda.feature'],
  'RF-02 asignar espacio': ['asignacion.test.js'],
  'RNF-01 salida en < 2 s': [],
  'RL-01 consentimiento Ley 29733': ['consentimiento.feature']
};
const sinPrueba = Object.keys(pruebas).filter(r => pruebas[r].length === 0);
console.log('Cobertura:', Object.keys(pruebas).length - sinPrueba.length, 'de', Object.keys(pruebas).length);
console.log('Sin prueba:', sinPrueba.join(', '));
~~~
En la práctica moderna, la trazabilidad se apoya en convenciones: el identificador de la historia en el nombre de la rama y en el mensaje de cada commit, y etiquetas en las pruebas, de modo que la matriz se genera sola desde el repositorio y el gestor de tareas.

## Gestión de cambios
Los requisitos **cambian**: el negocio aprende, el mercado se mueve, la ley se modifica. Capers Jones estimó que en proyectos tradicionales los requisitos crecen en promedio entre 1 % y 2 % por mes después de aprobados. El problema no es el cambio, sino el cambio **descontrolado**, conocido como *scope creep*: pequeñas adiciones que nadie evalúa y que, sumadas, destruyen el cronograma. La gestión de cambios formal tiene estos elementos:
- **Línea base:** versión aprobada de los requisitos contra la que se miden los cambios.
- **Solicitud de cambio:** quién pide, qué y por qué.
- **Análisis de impacto:** qué requisitos, diseño, código, pruebas, costo y plazo afecta (aquí la trazabilidad paga su costo).
- **Decisión:** la toma un **comité de control de cambios** (*Change Control Board*) o, en un equipo ágil, el dueño de producto al reordenar el backlog.
- **Comunicación y actualización** de todos los artefactos afectados.
En los métodos ágiles el cambio se **acepta como normal** y el mecanismo es el backlog: cualquier cambio es un elemento nuevo que compite por prioridad; lo que se protege es el sprint en curso, que no se modifica salvo casos excepcionales.

## Herramientas
Para proyectos pequeños, una hoja de cálculo o el propio gestor de tareas (Jira, GitHub Issues, Azure DevOps) bastan para registrar requisitos, estados y enlaces a las pruebas. En dominios regulados se usan herramientas especializadas como IBM DOORS, Polarion o Jama, que versionan cada requisito, mantienen los enlaces de trazabilidad y generan los informes que piden los auditores. Una tendencia creciente es tratar los requisitos **como código**: escribirlos en archivos de texto (Markdown o Gherkin) dentro del repositorio, de modo que sus cambios se revisan con *pull requests*, quedan versionados junto al software y la trazabilidad con las pruebas se verifica en la integración continua. Elijas la herramienta que elijas, la disciplina importa más que el software: un identificador único por requisito y enlaces mantenidos al día valen más que la herramienta más cara usada a medias.

## Estados y atributos de un requisito
Cada requisito suele registrar atributos que permiten gestionarlo: identificador único, origen, prioridad, estado, versión, responsable, criterio de aceptación y riesgo. Un ciclo de estados típico: **propuesto → aprobado → implementado → verificado**, con salidas a **rechazado** o **eliminado**. Medir cuántos requisitos hay en cada estado y cuántos cambian por mes da una visión objetiva del avance y de la estabilidad del proyecto.

## Ejemplo resuelto: un cambio en PatioApp
Gerencia pide, con el sistema ya en construcción, que las unidades de la aseguradora tengan una tarifa diferenciada.
1. **Solicitud:** RC-07, pedida por la gerente comercial, motivo: contrato nuevo con la aseguradora.
2. **Análisis de impacto** usando la matriz: afecta RF-05 (cálculo de tarifa), RF-09 (reporte de facturación), el módulo de tarifas, tres pruebas existentes y el formato del comprobante (la tarifa diferenciada debe mostrarse). Estimación: 5 días; desplaza la funcionalidad de notificaciones por WhatsApp al siguiente sprint.
3. **Decisión:** el dueño de producto la acepta porque el contrato vale más que las notificaciones, y la coloca al inicio del backlog.
4. **Actualización:** nuevo requisito RF-05b con su origen (contrato con la aseguradora), nuevos escenarios de prueba y glosario ampliado con "tarifa de convenio".
Sin la matriz de trazabilidad, el formato del comprobante probablemente se habría olvidado y el error habría aparecido recién en la primera auditoría contable.`,
  links: [['m11.req', 'la gestión es la última actividad del proceso de requisitos'], ['m14.types', 'las pruebas de aceptación verifican los requisitos'], ['man.scm', 'la gestión de la configuración controla las versiones de todos los artefactos']],
  read: 'ISO/IEC/IEEE 29148:2018; Wiegers y Beatty, *Software Requirements*, capítulos 17 a 30; Gotel y Finkelstein (1994); Fagan (1976).',
  terms: [
    ['Validación', 'comprobación de que se construye el producto correcto, el que los interesados necesitan', ['Boehm, 1979.', 'Se hace con usuarios y prototipos.', 'Pregunta por la necesidad real.']],
    ['Verificación', 'comprobación de que el producto se construye correctamente según lo especificado', ['Revisar consistencia del documento.', 'Pruebas contra los requisitos.', 'No garantiza que sea útil.']],
    ['Especificación de requisitos (SRS)', 'documento que describe de forma completa los requisitos de un sistema', ['ISO/IEC/IEEE 29148.', 'Sucede a IEEE 830.', 'Exigida en dominios regulados.']],
    ['Inspección', 'revisión formal y sistemática de un artefacto por varias personas con roles y listas de verificación', ['Fagan, IBM, 1976.', 'Encuentra defectos antes de las pruebas.', 'Lectura basada en perspectivas.']],
    ['Trazabilidad', 'capacidad de seguir un requisito hacia su origen y hacia el diseño, el código y las pruebas que lo implementan', ['Matriz requisitos-pruebas.', 'Permite el análisis de impacto.', 'Obligatoria en aviación y medicina.']],
    ['Línea base', 'versión aprobada de los requisitos contra la que se controlan los cambios', ['Se firma con el cliente.', 'Cambiarla exige una solicitud.', 'Se versiona.']],
    ['Comité de control de cambios', 'grupo que evalúa y decide las solicitudes de cambio de la línea base', ['Change Control Board.', 'Usa el análisis de impacto.', 'En ágil, el rol lo cumple el dueño de producto.']],
    ['Scope creep', 'crecimiento descontrolado del alcance por pequeñas adiciones no evaluadas', ['Un campo más, un reporte más.', 'Destruye cronogramas.', 'Se evita con gestión de cambios.']]
  ],
  q: [
    ['¿Qué pregunta responde la validación?', '¿Estamos construyendo el producto correcto?', ['¿Estamos construyendo el producto correctamente?', '¿Compila el código?', '¿Cuánto cuesta?'], 'Boehm, 1979.', 1],
    ['Un sistema pasa todas sus pruebas pero los usuarios no lo usan porque no resuelve su problema. ¿Qué falló?', 'La validación', ['La verificación', 'La compilación', 'El despliegue'], 'Se especificó lo que nadie necesitaba.', 3],
    ['¿Para qué sirve la trazabilidad hacia atrás?', 'Para saber de dónde viene un requisito: qué interesado, ley o meta lo originó', ['Para saber qué pruebas lo verifican', 'Para compilar más rápido', 'Para cifrar el documento'], 'Gotel y Finkelstein señalaron que es la más descuidada.', 3],
    ['Cambia una ley. ¿Qué herramienta permite saber qué módulos y pruebas revisar?', 'La matriz de trazabilidad', ['El diagrama de Gantt', 'El glosario', 'El burndown'], 'Análisis de impacto.', 2],
    ['¿Qué es la línea base de requisitos?', 'La versión aprobada contra la que se controlan los cambios', ['El primer borrador', 'La lista de errores', 'El plan de pruebas'], 'Cambiarla requiere una solicitud.', 2],
    ['En Scrum, ¿cómo se gestiona normalmente un cambio de requisitos?', 'Como un elemento nuevo del backlog que el dueño de producto prioriza, sin alterar el sprint en curso', ['Con un comité que se reúne cada seis meses', 'Cambiando el sprint en curso de inmediato', 'Rechazando todo cambio'], 'El cambio es normal; se protege el sprint.', 3],
    ['¿Qué técnica asigna a cada revisor un punto de vista distinto (usuario, diseñador, tester)?', 'La lectura basada en perspectivas', ['El planning poker', 'La prueba de humo', 'El análisis de puntos de función'], 'Basili y otros, 1996.', 4],
    { tf: 'Todo proyecto, incluso un producto digital en exploración, necesita una SRS formal completa según ISO 29148.', v: false, e: 'Depende del contexto; lo que siempre conviene es un glosario y criterios de aceptación.', l: 2 },
    { tf: 'Si no se puede escribir una prueba de aceptación para un requisito, probablemente el requisito no está claro.', v: true, e: 'Escribir las pruebas temprano valida los requisitos.', l: 2 },
    { o: 'Ordena los pasos de la gestión de un cambio.', s: ['Registrar la solicitud de cambio', 'Analizar el impacto con la trazabilidad', 'Decidir (comité o dueño de producto)', 'Actualizar requisitos, diseño, código y pruebas', 'Comunicar el cambio'], e: 'Solicitud, impacto, decisión, actualización y comunicación.', l: 3 },
    { c: 'Escribe «sinPrueba(matriz)»: matriz es un objeto {requisito: [pruebas]}; devuelve la lista de requisitos sin ninguna prueba, en el orden de las claves.', f: 'sinPrueba', p: ['matriz'], t: [[[{ a: ['t1'], b: [], c: [] }], ['b', 'c']], [[{}], []], [[{ x: ['p'] }], []]], sol: '  return Object.keys(matriz).filter(r => matriz[r].length === 0);', l: 2 },
    { c: 'Escribe «impacto(matriz, prueba)»: devuelve los requisitos (claves) cuya lista de pruebas incluye la prueba dada.', f: 'impacto', p: ['matriz', 'prueba'], t: [[[{ a: ['t1', 't2'], b: ['t2'], c: [] }, 't2'], ['a', 'b']], [[{ a: ['t1'] }, 'zz'], []]], sol: '  return Object.keys(matriz).filter(r => matriz[r].includes(prueba));', l: 2 },
    { c: 'Escribe «cobertura(matriz)»: porcentaje entero (redondeado) de requisitos con al menos una prueba; si no hay requisitos, 0.', f: 'cobertura', p: ['matriz'], t: [[[{ a: ['t'], b: [], c: ['x'] }], 67], [[{}], 0], [[{ a: ['t'] }], 100]], sol: '  const k = Object.keys(matriz);\n  if (!k.length) return 0;\n  return Math.round(100 * k.filter(r => matriz[r].length).length / k.length);', l: 3 }
  ],
  gen: function (g) {
    var vv = [['Mostrar un prototipo a los operadores para ver si resuelve su problema', 'Validación'], ['Revisar que dos requisitos no se contradigan', 'Verificación'], ['Ejecutar las pruebas de aceptación contra la especificación', 'Verificación'], ['Preguntar a gerencia si el reporte propuesto es el que necesita', 'Validación'], ['Comprobar que cada requisito tiene un identificador y un criterio de aceptación', 'Verificación'], ['Observar a los usuarios con la nueva versión para ver si logran su objetivo', 'Validación']];
    vv.forEach(function (v) { g.mcq(2, '¿Es validación o verificación? ' + v[0], v[1], ['Validación', 'Verificación', 'Ninguna de las dos'].filter(function (x) { return x !== v[1]; }).concat(['Despliegue']), 'Producto correcto contra producto hecho correctamente.'); });
    g.times(6, function (R) { var n = R.int(10, 40), k = R.int(1, n - 1); g.input(2, 'Hay ' + n + ' requisitos y ' + k + ' tienen al menos una prueba. ¿Qué porcentaje de cobertura hay? (redondea al entero)', Math.round(100 * k / n), 'Requisitos con prueba entre el total.'); });
    var est = [['El analista acaba de escribirlo', 'Propuesto'], ['El cliente lo aceptó en la línea base', 'Aprobado'], ['El código ya está en la rama principal', 'Implementado'], ['Pasó sus pruebas de aceptación', 'Verificado']];
    est.forEach(function (e) { g.mcq(1, '¿En qué estado está el requisito? ' + e[0], e[1], ['Propuesto', 'Aprobado', 'Implementado', 'Verificado'].filter(function (x) { return x !== e[1]; }), 'Ciclo típico de estados.'); });
  },
  checks: [
    ['Explica con un ejemplo la diferencia entre validar y verificar.', 'Validar: confirmar con los usuarios que un reporte es el que necesitan; verificar: comprobar que el sistema genera el reporte tal como se especificó.'],
    ['¿Qué es la trazabilidad y para qué sirve en el análisis de impacto?', 'Seguir cada requisito a su origen y a su diseño, código y pruebas; permite saber qué revisar cuando algo cambia.'],
    ['Describe el proceso de gestión de un cambio de requisitos.', 'Solicitud, análisis de impacto, decisión por un comité o el dueño de producto, actualización de artefactos y comunicación.'],
    ['¿Por qué el glosario es útil incluso en proyectos sin SRS formal?', 'Porque asegura que todos usen los términos del dominio con el mismo significado y evita defectos por malentendidos.']
  ],
  cites: ['ISO/IEC/IEEE 29148:2018. *Systems and software engineering — Life cycle processes — Requirements engineering*.', 'Boehm, B. (1979). Guidelines for Verifying and Validating Software Requirements and Design Specifications. *EURO IFIP 79*.', 'Fagan, M. (1976). Design and Code Inspections to Reduce Errors in Program Development. *IBM Systems Journal*, 15(3).', 'Gotel, O. y Finkelstein, A. (1994). An Analysis of the Requirements Traceability Problem. *ICRE 1994*.', 'Basili, V. et al. (1996). The Empirical Investigation of Perspective-Based Reading. *Empirical Software Engineering*, 1(2).', 'Jones, C. (2008). *Applied Software Measurement* (3.ª ed.). McGraw-Hill.'],
  project: { t: 'Especificación trazable',
    goal: 'Escribir, revisar y trazar los requisitos de un sistema pequeño.',
    steps: ['Escribe una especificación breve (visión, glosario, 10 requisitos funcionales y 4 de calidad) para un sistema que conozcas.', 'Organiza una revisión con dos compañeros usando lectura basada en perspectivas y registra los defectos encontrados.', 'Crea la matriz de trazabilidad hacia el origen de cada requisito y hacia sus pruebas.', 'Simula una solicitud de cambio y documenta su análisis de impacto y la decisión.', 'Calcula la cobertura de pruebas de los requisitos antes y después del cambio.'],
    deliver: 'La especificación, el registro de la revisión, la matriz y el análisis del cambio.' },
  hito: ['Crea el glosario y la matriz de trazabilidad de PatioApp (requisitos, historias y pruebas) generada a partir de etiquetas en el repositorio.', 'Documenta en PatioApp la solicitud de cambio de la tarifa de convenio con su análisis de impacto y actualiza los artefactos afectados.']
});
SDC.after('m11.spec', 'm11.uml');
})();
