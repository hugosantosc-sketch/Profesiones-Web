(function () {
var S = SDC.S;

S('eq', 'eq.lead', { title: 'Liderazgo técnico, mentoría y retroalimentación',
  ask: '¿Cómo actuaría un buen líder técnico en esta situación?',
  lesson: `
> **La idea en simple.** Liderar no es un cargo: es ayudar a que un grupo de personas logre algo que no lograría cada una por su cuenta. En software, el liderazgo aparece mucho antes de tener un título de "líder": cuando guías una decisión técnica, explicas el sistema a alguien nuevo, das una revisión de código que enseña, o propones cómo resolver un problema que todos evitan. Esta unidad presenta las prácticas que distinguen a quienes multiplican el trabajo de su equipo.

## Dos caminos: técnico y de gestión
Al crecer en la carrera aparecen dos caminos, que las empresas maduras tratan como paralelos y de igual valor:
- **Camino técnico** (*individual contributor*): ingeniero sénior, staff, principal. Su impacto crece por la **amplitud** de los problemas que resuelve: de una función, a un sistema, a la arquitectura de varios equipos. Will Larson describe en *Staff Engineer* (2021) los roles típicos de este nivel: el líder técnico de un equipo, el arquitecto de un área, el que resuelve los problemas más difíciles, y el que trabaja junto a la dirección en la estrategia técnica.
- **Camino de gestión:** líder de equipo, gerente de ingeniería, director. Su trabajo pasa a ser las **personas**: contratar, desarrollar, dar contexto, quitar obstáculos, organizar el trabajo. Camille Fournier lo describe en *The Manager's Path* (2017).
Cambiar de camino es posible, y muchos buenos gerentes vuelven a la técnica y viceversa. El error común es ascender a gestión al mejor programador sin preguntarle si quiere y sin prepararlo: la empresa pierde un gran ingeniero y gana un gerente frustrado.

## Lo que hace un líder técnico
Un líder técnico (*tech lead*) mantiene la salud técnica del equipo sin convertirse en cuello de botella:
- **Visión técnica:** que el equipo sepa hacia dónde va el sistema y por qué (documentos de diseño, decisiones registradas, un mapa de la deuda técnica).
- **Decisiones:** facilitar que se decida bien, con las personas adecuadas, en lugar de decidir todo. Una pregunta útil es "¿quién más debería opinar sobre esto?".
- **Calidad:** estándares de código, revisiones, pruebas, observabilidad; y dar el ejemplo.
- **Desbloquear:** detectar cuando alguien está atascado, conectar con otros equipos, conseguir accesos y respuestas.
- **Delegar el trabajo interesante:** reservarse las tareas más atractivas impide que otros crezcan. Un buen indicador es que el equipo funcione bien cuando el líder está de vacaciones.
- **Escribir y comunicar:** traducir lo técnico para el negocio y lo del negocio para el equipo.

## Delegar sin abandonar
Delegar no es "hazlo y avísame". El nivel de apoyo depende de la experiencia de la persona en **esa** tarea concreta, no en general. El modelo de liderazgo situacional (Paul Hersey y Ken Blanchard, 1969) propone cuatro estilos: **dirigir** (instrucciones claras, para quien empieza), **entrenar** (explicar y acompañar), **apoyar** (la persona sabe, el líder escucha y anima) y **delegar** (autonomía total). Una misma persona puede necesitar dirección en facturación electrónica y autonomía total en el frontend. Al delegar, conviene acordar **qué** se espera (el resultado, no los pasos), **cuándo**, los límites de decisión ("puedes elegir la biblioteca, pero el esquema de la base lo revisamos juntos") y cuándo volver a conversar.

## Mentoría
Un mentor ayuda a otra persona a crecer compartiendo experiencia. Prácticas que funcionan:
- **Preguntar antes de responder:** "¿Qué has probado? ¿Qué crees que pasa?". Dar la respuesta resuelve el problema de hoy; enseñar a buscarla resuelve los de mañana.
- **Explicar el porqué**, no solo el qué: "Usamos una transacción aquí porque, si falla la segunda escritura, el espacio quedaría ocupado sin estadía".
- **Programar en pareja** en tareas reales, alternando quién escribe.
- **Dar visibilidad:** que la persona presente su trabajo, que su nombre aparezca en los logros. Lara Hogan distingue al **mentor** (aconseja) del **patrocinador** (*sponsor*), que usa su influencia para abrir oportunidades a otros; el patrocinio es especialmente importante para quienes tienen menos redes en la empresa.
- **Reuniones uno a uno** regulares (cada una o dos semanas, 30 minutos), con la agenda de la otra persona: dudas, carrera, obstáculos, cómo se siente. No son reuniones de estado del proyecto.

## Retroalimentación que ayuda
Dar retroalimentación es una de las habilidades más valiosas y menos practicadas. Un modelo simple y probado es **SBI** (*situación, comportamiento, impacto*), del Center for Creative Leadership:
- **Situación:** cuándo y dónde. "En la revisión del PR de tarifas de ayer…"
- **Comportamiento:** lo observable, sin juicios ni adjetivos. "…aprobaste el cambio sin correr las pruebas de convenio…"
- **Impacto:** el efecto. "…y en producción se cobró sin descuento a tres clientes durante dos horas."
Después, **preguntar** ("¿Cómo lo ves?") y acordar qué hacer distinto. Funciona igual para reconocer lo bueno: "En la caída del martes (situación), escribiste el estado cada 15 minutos en el canal (comportamiento), y operaciones pudo avisar a los clientes sin llamarnos (impacto)". Reglas que lo acompañan: dar la retroalimentación **pronto**, en **privado** si es correctiva, sobre **hechos** y no sobre la persona, y con la intención genuina de ayudar. Kim Scott lo resumió como **franqueza radical** (*Radical Candor*, 2017): importarte la persona y, a la vez, decirle las cosas de frente. Si falta lo primero, es agresión; si falta lo segundo, es una empatía que no ayuda.

## Recibir retroalimentación
Recibirla bien es igual de importante: escuchar sin defenderse, agradecer, preguntar por ejemplos concretos y separar el mensaje de la forma. No hace falta estar de acuerdo con todo, pero sí entenderlo. Douglas Stone y Sheila Heen (*Thanks for the Feedback*, 2014) observan que solemos rechazar la retroalimentación por tres disparadores: creer que es falsa, rechazar a quien la da o sentir amenazada nuestra identidad. Reconocerlos ayuda a quedarse con lo útil.

## Influir sin autoridad
Gran parte del liderazgo técnico consiste en convencer a personas que no dependen de ti: otro equipo, la gerencia, el cliente. Funciona mejor con **datos** (mediciones, incidentes, costos), con un **documento** claro que se pueda leer con calma, entendiendo qué le importa a la otra parte (al área comercial le importa la fecha; a operaciones, que el sistema no se caiga en la quincena) y construyendo **confianza** con el tiempo: cumplir lo que se promete, reconocer los errores propios y ayudar a otros cuando lo necesitan.

## Ejemplo resuelto: el líder que hacía todo
Martín es el ingeniero más experimentado de PatioApp y lo nombraron líder técnico. Tres meses después, el equipo depende de él para cada decisión, él revisa todos los PR, trabaja de noche y las entregas se atrasan.
1. **Diagnóstico:** Martín es el cuello de botella. Se quedó con todas las tareas difíciles porque "es más rápido hacerlo yo", y nadie más conoce la integración con SUNAT.
2. **Delegar con estilo situacional:** Rosa, con experiencia en el frontend, recibe autonomía total en esa parte; Jorge, nuevo en facturación, recibe la integración con SUNAT en modo **entrenar**: sesiones en pareja la primera semana y revisión conjunta del diseño.
3. **Revisiones distribuidas:** se define que cualquier miembro puede aprobar un PR, salvo los que tocan cobros, que necesitan dos aprobaciones (una de alguien que conozca facturación, que pronto será también Jorge).
4. **Uno a uno:** Martín empieza reuniones quincenales con cada persona. En la de Rosa aparece que quiere crecer hacia arquitectura; él la patrocina para liderar el rediseño del ingreso móvil.
5. **Retroalimentación:** su gerente le da retroalimentación SBI sobre cómo sus revisiones, que reescribían el código ajeno, desanimaban al equipo; Martín cambia a comentarios que explican el porqué y sugieren.
6. **Resultado:** en dos meses, el equipo entrega a tiempo durante las vacaciones de Martín, y la integración con SUNAT tiene dos personas que la conocen.`,
  links: [['eq.teams', 'seguridad psicológica y dinámica de equipos'], ['m7.team', 'revisiones de código que enseñan'], ['m17.career', 'roles, niveles y caminos de carrera']],
  read: 'Fournier, *The Manager\'s Path* (2017); Larson, *Staff Engineer* (2021); Scott, *Radical Candor* (2017); Stone y Heen, *Thanks for the Feedback* (2014).',
  terms: [
    ['Líder técnico', 'persona que guía la dirección técnica y la calidad del trabajo de un equipo sin ser su cuello de botella', ['Tech lead.', 'Visión técnica.', 'Desbloquear.']],
    ['Camino técnico', 'progresión de carrera centrada en la amplitud técnica en lugar de la gestión de personas', ['Staff.', 'Principal.', 'Larson.']],
    ['Liderazgo situacional', 'modelo que ajusta el estilo de liderazgo a la experiencia de la persona en cada tarea', ['Hersey y Blanchard.', 'Dirigir, entrenar, apoyar, delegar.', 'Por tarea.']],
    ['Mentoría', 'relación en la que alguien con experiencia ayuda a otra persona a crecer', ['Preguntar antes de responder.', 'Explicar el porqué.', 'Programar en pareja.']],
    ['Patrocinio', 'uso de la propia influencia para abrir oportunidades a otra persona', ['Sponsor.', 'Visibilidad.', 'Hogan.']],
    ['Reunión uno a uno', 'conversación regular y privada entre líder y miembro del equipo con la agenda de este último', ['Cada 1 o 2 semanas.', 'Carrera y obstáculos.', 'No es de estado.']],
    ['Modelo SBI', 'forma de dar retroalimentación describiendo situación, comportamiento e impacto', ['Center for Creative Leadership.', 'Hechos.', 'Sin adjetivos.']],
    ['Franqueza radical', 'combinación de interés genuino por la persona y decirle las cosas de frente', ['Kim Scott, 2017.', 'Ni agresión ni empatía inútil.', 'Retroalimentación.']]
  ],
  q: [
    ['¿Qué indica que un líder técnico se convirtió en cuello de botella?', 'Que el equipo depende de él para cada decisión y no funciona en su ausencia', ['Que el equipo entrega a tiempo', 'Que delega tareas', 'Que hace reuniones uno a uno'], 'El equipo debe funcionar sin él.', 2],
    ['¿Qué estilo de liderazgo situacional conviene con alguien nuevo en una tarea?', 'Dirigir o entrenar, con instrucciones y acompañamiento', ['Delegar con autonomía total', 'Ignorar', 'Apoyar solo con ánimo'], 'Según la experiencia en esa tarea.', 2],
    ['¿Cuál es la respuesta de mentoría más útil a "no me funciona la transacción"?', '"¿Qué has probado y qué crees que pasa?"', ['Darle el código correcto sin explicar', '"Búscalo en internet"', '"Eso es fácil"'], 'Preguntar antes de responder.', 2],
    ['¿Qué parte del modelo SBI describe lo observable sin juicios?', 'El comportamiento', ['La situación', 'El impacto', 'La conclusión'], 'Situación, comportamiento, impacto.', 1],
    ['¿Qué es "Fuiste irresponsable con el PR"?', 'Un juicio sobre la persona, no una descripción de comportamiento', ['Un buen ejemplo de SBI', 'Un reconocimiento', 'Una pregunta'], 'Hechos, no adjetivos.', 3],
    ['¿Qué diferencia a un patrocinador de un mentor?', 'El patrocinador usa su influencia para abrir oportunidades; el mentor aconseja', ['Son lo mismo', 'El patrocinador paga el sueldo', 'El mentor decide los ascensos'], 'Lara Hogan.', 3],
    ['¿Por qué es un error ascender a gestión al mejor programador sin preguntarle?', 'Porque son trabajos distintos: se puede perder un gran ingeniero y ganar un gerente frustrado', ['Porque los programadores no pueden gestionar', 'Porque la gestión paga menos', 'No es un error'], 'Caminos paralelos.', 4],
    { tf: 'Las reuniones uno a uno son para revisar el estado de las tareas del proyecto.', v: false, e: 'Son para la persona: dudas, carrera, obstáculos; el estado va en otro espacio.', l: 2 },
    { tf: 'La retroalimentación correctiva conviene darla pronto y en privado.', v: true, e: 'Junto con hechos concretos y la intención de ayudar.', l: 1 },
    { c: 'Escribe «estiloSituacional(competencia, compromiso)»: con valores "baja" o "alta", devuelve dirigir (baja, alta), entrenar (baja, baja), apoyar (alta, baja) o delegar (alta, alta).', f: 'estiloSituacional', p: ['competencia', 'compromiso'], t: [[['baja', 'alta'], 'dirigir'], [['baja', 'baja'], 'entrenar'], [['alta', 'baja'], 'apoyar'], [['alta', 'alta'], 'delegar']], sol: '  if (competencia === \'baja\') return compromiso === \'alta\' ? \'dirigir\' : \'entrenar\';\n  return compromiso === \'alta\' ? \'delegar\' : \'apoyar\';', l: 2 },
    { c: 'Escribe «factorAutobus(conocimiento)»: recibe { area: [personas] } y devuelve la lista ordenada de áreas que solo conoce una persona.', f: 'factorAutobus', p: ['conocimiento'], t: [[[{ sunat: ['martin'], frontend: ['rosa', 'jorge'], tarifas: ['martin'] }], ['sunat', 'tarifas']], [[{ a: ['x', 'y'] }], []]], sol: '  return Object.keys(conocimiento).filter(a => conocimiento[a].length === 1).sort();', l: 1 },
    { c: 'Escribe «sbi(situacion, comportamiento, impacto)»: arma el texto "En <situacion>, <comportamiento>, y <impacto>."', f: 'sbi', p: ['situacion', 'comportamiento', 'impacto'], t: [[['la revisión de ayer', 'aprobaste sin pruebas', 'se cobró mal a tres clientes'], 'En la revisión de ayer, aprobaste sin pruebas, y se cobró mal a tres clientes.']], sol: '  return \'En \' + situacion + \', \' + comportamiento + \', y \' + impacto + \'.\';', l: 1 }
  ],
  gen: function (g) {
    var es = [['Persona nueva en la tarea y muy motivada', 'Dirigir'], ['Persona con algo de experiencia que perdió confianza tras un error', 'Entrenar'], ['Persona que sabe hacerlo pero duda de su propuesta', 'Apoyar'], ['Persona experta y comprometida con la tarea', 'Delegar']];
    es.forEach(function (e) { g.mcq(3, '¿Qué estilo de liderazgo situacional conviene? ' + e[0], e[1], ['Dirigir', 'Entrenar', 'Apoyar', 'Delegar'].filter(function (x) { return x !== e[1]; }), 'Liderazgo situacional.'); });
    var sb = [['En la reunión de planificación del lunes', 'Situación'], ['interrumpiste tres veces a Rosa', 'Comportamiento'], ['y ella no pudo presentar su propuesta', 'Impacto'], ['En el despliegue de anoche', 'Situación'], ['escribiste el estado cada 15 minutos', 'Comportamiento'], ['y operaciones avisó a los clientes a tiempo', 'Impacto']];
    sb.forEach(function (s) { g.mcq(1, 'En el modelo SBI, ¿qué parte es: "' + s[0] + '"?', s[1], ['Situación', 'Comportamiento', 'Impacto', 'Juicio'].filter(function (x) { return x !== s[1]; }), 'Situación, comportamiento, impacto.'); });
    var fr = [['Fuiste descuidado con el PR', 'Juicio sobre la persona'], ['Aprobaste el PR sin correr las pruebas de convenio', 'Comportamiento observable'], ['Siempre llegas tarde', 'Generalización'], ['Hoy la reunión empezó 15 minutos después de la hora', 'Comportamiento observable']];
    fr.forEach(function (f) { g.mcq(2, '¿Qué tipo de frase es: "' + f[0] + '"?', f[1], ['Juicio sobre la persona', 'Comportamiento observable', 'Generalización', 'Pregunta abierta'].filter(function (x) { return x !== f[1]; }), 'Retroalimentación basada en hechos.'); });
  },
  checks: [
    ['Diferencia el camino técnico del de gestión y describe qué hace un líder técnico.', 'El técnico crece por amplitud de problemas; el de gestión se centra en las personas; el líder técnico da visión, facilita decisiones, cuida la calidad, desbloquea y delega.'],
    ['¿Cómo se delega según el liderazgo situacional?', 'Ajustando el apoyo a la experiencia en cada tarea (dirigir, entrenar, apoyar, delegar) y acordando resultado, plazo, límites y seguimiento.'],
    ['Describe tres prácticas de mentoría y la diferencia con el patrocinio.', 'Preguntar antes de responder, explicar el porqué, programar en pareja y uno a uno; el patrocinio abre oportunidades con la propia influencia.'],
    ['Explica el modelo SBI y cómo recibir retroalimentación.', 'Situación, comportamiento e impacto, seguidos de una pregunta; recibirla escuchando, agradeciendo, pidiendo ejemplos y separando el mensaje de la forma.']
  ],
  cites: ['Fournier, C. (2017). *The Manager\'s Path*. O\'Reilly.', 'Larson, W. (2021). *Staff Engineer: Leadership Beyond the Management Track*. Self-published.', 'Hersey, P. y Blanchard, K. (1969). Life Cycle Theory of Leadership. *Training and Development Journal*, 23(5).', 'Scott, K. (2017). *Radical Candor*. St. Martin\'s Press.', 'Stone, D. y Heen, S. (2014). *Thanks for the Feedback*. Viking.', 'Hogan, L. (2018). What does sponsorship look like? larahogan.me.'],
  project: { t: 'Practicar el liderazgo',
    goal: 'Ejercer prácticas de liderazgo técnico, mentoría y retroalimentación en un equipo real o de estudio.',
    steps: ['Mapea el conocimiento de tu equipo (o grupo de estudio): qué áreas conoce solo una persona.', 'Elige un área con una sola persona y diseña un plan de transferencia con el estilo situacional adecuado.', 'Realiza al menos tres sesiones de mentoría o programación en pareja, aplicando "preguntar antes de responder".', 'Escribe y entrega dos retroalimentaciones SBI (una de reconocimiento y una correctiva) y pide una sobre ti.', 'Reflexiona por escrito sobre qué funcionó y qué cambiarías.'],
    deliver: 'El mapa de conocimiento, el plan, las notas de las sesiones y la reflexión.' },
  hito: ['Mapea el conocimiento del equipo de PatioApp y reduce a cero las áreas críticas que conoce una sola persona.', 'Establece reuniones uno a uno y una guía de retroalimentación SBI para el equipo de PatioApp.']
});
SDC.after('eq.lead', 'eq.teams');

S('eq', 'eq.conflict', { title: 'Conflictos, negociación y conversaciones difíciles',
  ask: '¿Cómo manejarías este desacuerdo o esta negociación?',
  lesson: `
> **La idea en simple.** Donde hay personas que trabajan juntas con presión, plazos y opiniones fuertes, hay desacuerdos. El conflicto no es malo en sí: un equipo donde nadie discute probablemente esconde los problemas. Lo que importa es cómo se maneja. Saber conversar cuando hay tensión, negociar plazos y alcances, y decir que no sin romper relaciones son habilidades que se aprenden, igual que un lenguaje de programación.

## Conflicto de tareas y conflicto de relación
La investigación sobre equipos (Karen Jehn, 1995) distingue dos tipos de conflicto:
- **De tarea:** desacuerdo sobre el trabajo: qué arquitectura usar, qué priorizar, cómo estimar. Bien manejado, **mejora** las decisiones, porque obliga a considerar alternativas.
- **De relación:** tensión personal: antipatía, sentirse irrespetado, choques de estilo. Casi siempre **daña** el rendimiento y la satisfacción.
El peligro es que el primero se convierta en el segundo: una discusión técnica en la que alguien se siente atacado ("tu diseño es absurdo") pasa de ser sobre el diseño a ser sobre las personas. Por eso conviene discutir **ideas, no personas**, con datos y criterios explícitos, y separar la persona de la propuesta ("veo un riesgo en este diseño" en lugar de "te equivocaste").

## Estilos ante el conflicto
El modelo de Kenneth Thomas y Ralph Kilmann (1974) describe cinco estilos según cuánto se busca satisfacer el interés propio y el del otro:
| Estilo | Propio | Del otro | Cuándo sirve |
|---|---|---|---|
| Competir | alto | bajo | emergencias, temas de seguridad o ética no negociables |
| Acomodarse | bajo | alto | cuando el tema importa mucho más al otro, o te equivocaste |
| Evitar | bajo | bajo | temas triviales, o para enfriar los ánimos antes de hablar |
| Transigir | medio | medio | cuando hay poco tiempo y una solución intermedia es aceptable |
| Colaborar | alto | alto | temas importantes donde vale la pena buscar una solución que sirva a ambos |
Ningún estilo es siempre correcto. El problema es usar siempre el mismo: quien siempre compite genera resentimiento; quien siempre evita acumula problemas que explotan después.

## Conversaciones difíciles
Douglas Stone, Bruce Patton y Sheila Heen (del Proyecto de Negociación de Harvard) explican en *Difficult Conversations* (1999) que toda conversación difícil son en realidad tres:
1. **La conversación sobre lo que pasó:** cada parte tiene su versión. En lugar de discutir quién tiene razón, explorar **por qué** cada uno lo ve así; separar la **intención** del **impacto** ("no fue mi intención, pero entiendo que te afectó") y hablar de la **contribución** de cada uno en lugar de buscar culpables.
2. **La conversación de los sentimientos:** las emociones están ahí aunque no se nombren; reconocerlas ("entiendo que esto te frustró") baja la tensión.
3. **La conversación de la identidad:** lo que la situación dice sobre nosotros ("¿soy un mal ingeniero si mi código causó el incidente?"). Reconocerlo ayuda a no reaccionar a la defensiva.
Algunas prácticas para el momento:
- **Preparar:** qué quiero lograr, qué sé y qué supongo de la otra parte.
- **Empezar por la tercera historia**: describir la diferencia como la vería un observador neutral ("Tú y yo vemos distinto si lanzamos el viernes").
- **Escuchar para entender**, no para responder; resumir lo que el otro dijo antes de dar tu punto ("Si te entiendo, te preocupa que…").
- **Hablar en primera persona** sobre hechos e impactos ("cuando cambió el alcance el jueves, no pude terminar las pruebas") en lugar de acusaciones ("siempre cambias todo").
- **Buscar juntos** la solución.

## Negociar: intereses, no posiciones
Roger Fisher y William Ury, en *Getting to Yes* (1981), propusieron la **negociación basada en principios**, con cuatro ideas:
1. **Separar a las personas del problema.**
2. **Centrarse en intereses, no en posiciones.** La posición es lo que se pide ("lo necesito para el viernes"); el interés es por qué ("el viernes llega el auditor de la empresa cliente y quiere ver los comprobantes"). Detrás de posiciones opuestas suele haber intereses compatibles: quizás basta con tener lista la parte de comprobantes para el viernes y el resto la semana siguiente.
3. **Inventar opciones de beneficio mutuo** antes de decidir.
4. **Usar criterios objetivos:** datos de velocidad del equipo, precios de mercado, la norma de SUNAT, en lugar de quién presiona más.
Y un concepto clave: el **MAAN** (mejor alternativa a un acuerdo negociado, *BATNA* en inglés): lo que harás si no hay acuerdo. Conocer el tuyo te da firmeza; conocer el del otro, realismo.

## El triángulo de alcance, tiempo y costo
Casi todas las negociaciones en proyectos de software giran en torno al triángulo clásico: **alcance**, **tiempo** y **recursos** (con la calidad en el centro). Si el cliente quiere más alcance en el mismo tiempo, algo debe ceder. La trampa es sacrificar la **calidad** en silencio (menos pruebas, sin revisión), porque la deuda aparece después, multiplicada. Una forma honesta de negociar es ofrecer opciones explícitas: "Para el viernes podemos tener el ingreso y la salida; los reportes, el 20. O todo el 20. Recortar las pruebas no es una opción, porque los cobros fallarían".

## Decir que no
Decir que no es parte del trabajo profesional. Un "no" bien dicho:
- **Reconoce** la necesidad: "Entiendo que el área comercial necesita la demostración".
- **Explica** brevemente la razón con hechos: "El equipo está al 100 % con la migración de SUNAT, que vence el 30".
- **Ofrece alternativas:** "Puedo prepararte una versión con datos de prueba en dos horas, o la demo completa la semana siguiente".
- Es **firme** en lo que no se negocia: seguridad, legalidad, ética, la salud del equipo.
El código de ética de ACM/IEEE (que viste en la unidad de ética) respalda negarse a firmar o publicar algo que se sabe inseguro o que perjudica a los usuarios.

## Ejemplo resuelto: "Lo necesito para el viernes"
El gerente comercial de PatioApp exige que el módulo de convenios corporativos esté listo el viernes; el equipo estima tres semanas.
1. **Preparar:** el líder técnico revisa los datos (velocidad de las últimas 10 semanas) y prepara un desglose del módulo en partes.
2. **Explorar intereses:** en la conversación pregunta por qué el viernes. El interés real: una empresa de transporte con 300 unidades firmará el contrato el lunes si ve que el descuento por convenio funciona.
3. **Opciones:** (a) para el viernes, solo el descuento por convenio en el cobro, con la configuración hecha a mano por el equipo; (b) el panel de administración de convenios y los reportes, en las dos semanas siguientes.
4. **Criterio objetivo:** la estimación se basa en la velocidad medida, y se muestra el desglose.
5. **Lo no negociable:** el cálculo de cobros pasa por las pruebas completas; no se publica sin ellas.
6. **Acuerdo:** el gerente acepta la opción por etapas; la empresa firma el lunes. La conversación, que empezó con tensión, termina con un plan que sirve a ambos, y el equipo no trabaja el fin de semana.`,
  links: [['eq.teams', 'seguridad psicológica y disfunciones del equipo'], ['eq.lead', 'retroalimentación y franqueza'], ['m17.ethics', 'el código de ética y negarse a lo indebido']],
  read: 'Fisher, Ury y Patton, *Getting to Yes* (3.ª ed., 2011); Stone, Patton y Heen, *Difficult Conversations* (2010); Patterson y otros, *Crucial Conversations* (3.ª ed., 2021).',
  terms: [
    ['Conflicto de tarea', 'desacuerdo sobre el trabajo que, bien manejado, mejora las decisiones', ['Arquitectura.', 'Prioridades.', 'Jehn, 1995.']],
    ['Conflicto de relación', 'tensión personal que suele dañar el rendimiento del equipo', ['Antipatía.', 'Falta de respeto.', 'Evitar escalarlo.']],
    ['Estilos de Thomas-Kilmann', 'cinco formas de enfrentar el conflicto según el interés propio y el del otro', ['Competir, acomodarse, evitar.', 'Transigir, colaborar.', 'Según la situación.']],
    ['Intención e impacto', 'distinción entre lo que alguien quiso hacer y el efecto que tuvo en otros', ['No fue mi intención.', 'Entiendo que te afectó.', 'Conversaciones difíciles.']],
    ['Posición', 'lo que una parte pide en una negociación', ['Para el viernes.', 'Frente al interés.', 'Fisher y Ury.']],
    ['Interés', 'la razón de fondo por la que una parte pide algo', ['El auditor llega el viernes.', 'Compatibles.', 'Opciones.']],
    ['MAAN', 'mejor alternativa a un acuerdo negociado: lo que se hará si no hay acuerdo', ['BATNA.', 'Firmeza.', 'Realismo.']],
    ['Triángulo de proyecto', 'relación entre alcance, tiempo y recursos, con la calidad en el centro', ['Algo cede.', 'No sacrificar calidad en silencio.', 'Opciones explícitas.']]
  ],
  q: [
    ['¿Qué tipo de conflicto suele mejorar las decisiones si se maneja bien?', 'El conflicto de tarea', ['El conflicto de relación', 'Ninguno', 'Ambos por igual'], 'Jehn, 1995.', 2],
    ['¿Qué frase mantiene la discusión en las ideas y no en las personas?', '"Veo un riesgo en este diseño con los cobros concurrentes"', ['"Tu diseño es absurdo"', '"Siempre haces lo mismo"', '"No sabes de bases de datos"'], 'Separar la persona de la propuesta.', 1],
    ['¿Cuándo es adecuado el estilo de competir?', 'En emergencias o temas de seguridad y ética no negociables', ['Siempre', 'En temas triviales', 'Cuando el tema importa más al otro'], 'Thomas-Kilmann.', 3],
    ['El cliente dice "lo necesito para el viernes". ¿Qué conviene preguntar?', 'Por qué el viernes: cuál es el interés detrás', ['Nada, solo aceptar', 'Por qué es tan exigente', 'Quién es su jefe'], 'Intereses, no posiciones.', 2],
    ['¿Qué es el MAAN en una negociación?', 'Lo que harás si no se llega a un acuerdo', ['El precio mínimo', 'El contrato firmado', 'La primera oferta'], 'Mejor alternativa a un acuerdo negociado.', 3],
    ['Para cumplir una fecha imposible, ¿qué variable no se debe sacrificar en silencio?', 'La calidad (pruebas y revisión)', ['El alcance', 'El tiempo', 'Los recursos'], 'La deuda aparece multiplicada.', 3],
    ['¿Qué tres conversaciones hay dentro de una conversación difícil según Stone, Patton y Heen?', 'Lo que pasó, los sentimientos y la identidad', ['Pasado, presente y futuro', 'Problema, solución y acuerdo', 'Técnica, económica y legal'], 'Difficult Conversations.', 4],
    { tf: 'Un equipo donde nunca hay desacuerdos es necesariamente un equipo sano.', v: false, e: 'Puede estar escondiendo problemas por falta de seguridad psicológica.', l: 2 },
    { tf: 'Un buen "no" reconoce la necesidad, explica la razón y ofrece alternativas.', v: true, e: 'Firme en lo no negociable.', l: 1 },
    { c: 'Escribe «estiloConflicto(propio, otro)»: con niveles "alto", "medio" o "bajo" devuelve competir (alto, bajo), acomodarse (bajo, alto), evitar (bajo, bajo), transigir (medio, medio) o colaborar (alto, alto); otro caso → "mixto".', f: 'estiloConflicto', p: ['propio', 'otro'], t: [[['alto', 'bajo'], 'competir'], [['bajo', 'alto'], 'acomodarse'], [['bajo', 'bajo'], 'evitar'], [['medio', 'medio'], 'transigir'], [['alto', 'alto'], 'colaborar'], [['alto', 'medio'], 'mixto']], sol: '  const k = propio + \'-\' + otro;\n  return { \'alto-bajo\': \'competir\', \'bajo-alto\': \'acomodarse\', \'bajo-bajo\': \'evitar\', \'medio-medio\': \'transigir\', \'alto-alto\': \'colaborar\' }[k] || \'mixto\';', l: 2 },
    { c: 'Escribe «opcionesPorEtapas(partes, capacidadSemanal)»: recibe partes { nombre, semanas } en orden de prioridad y devuelve cuántas caben completas en la capacidad dada.', f: 'opcionesPorEtapas', p: ['partes', 'capacidadSemanal'], t: [[[[{ nombre: 'descuento', semanas: 0.5 }, { nombre: 'panel', semanas: 1.5 }, { nombre: 'reportes', semanas: 1 }], 1], 1], [[[{ nombre: 'a', semanas: 1 }, { nombre: 'b', semanas: 1 }], 3], 2]], sol: '  let usado = 0, n = 0;\n  for (const p of partes) { if (usado + p.semanas > capacidadSemanal) break; usado += p.semanas; n++; }\n  return n;', l: 2 },
    { c: 'Escribe «esAcusacion(frase)»: true si la frase contiene "siempre", "nunca" o "tu culpa" (sin distinguir mayúsculas).', f: 'esAcusacion', p: ['frase'], t: [[['Siempre cambias todo'], true], [['Cuando cambió el alcance no pude terminar'], false], [['Nunca avisas'], true], [['Es tu culpa'], true]], sol: '  return /siempre|nunca|tu culpa/i.test(frase);', l: 1 }
  ],
  gen: function (g) {
    var es = [['Un incidente de seguridad en curso exige actuar ya', 'Competir'], ['Te diste cuenta de que tu propuesta tenía un error', 'Acomodarse'], ['Una discusión sobre el color de un ícono interno', 'Evitar'], ['Hay 10 minutos para decidir y una solución intermedia sirve', 'Transigir'], ['Una decisión de arquitectura importante para dos equipos', 'Colaborar']];
    es.forEach(function (e) { g.mcq(3, '¿Qué estilo ante el conflicto conviene? ' + e[0], e[1], ['Competir', 'Acomodarse', 'Evitar', 'Transigir', 'Colaborar'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Estilos de Thomas-Kilmann.'); });
    var pi = [['"Lo necesito para el viernes"', 'Posición'], ['"El auditor llega el viernes y quiere ver los comprobantes"', 'Interés'], ['"Queremos un descuento del 30 %"', 'Posición'], ['"Nuestro presupuesto anual ya está asignado"', 'Interés'], ['"Tiene que ser en Java"', 'Posición'], ['"Nuestro equipo de soporte solo conoce Java"', 'Interés']];
    pi.forEach(function (p) { g.mcq(2, 'En una negociación, ¿es posición o interés? ' + p[0], p[1], [p[1] === 'Posición' ? 'Interés' : 'Posición', 'MAAN', 'Criterio objetivo'], 'Intereses detrás de las posiciones.'); });
    var tr = [['tipo', 'Más alcance en el mismo tiempo sin más personas', 'Algo debe ceder: alcance, tiempo o recursos'], ['tipo', 'Recortar pruebas para llegar a la fecha', 'Sacrificar calidad en silencio: genera deuda'], ['tipo', 'Entregar por etapas lo prioritario primero', 'Negociar el alcance en el tiempo']];
    tr.forEach(function (t) { g.mcq(3, 'Triángulo de proyecto: ' + t[1] + '. ¿Qué implica?', t[2], ['Algo debe ceder: alcance, tiempo o recursos', 'Sacrificar calidad en silencio: genera deuda', 'Negociar el alcance en el tiempo', 'No tiene consecuencias'].filter(function (x) { return x !== t[2]; }).slice(0, 3), 'Alcance, tiempo, recursos y calidad.'); });
  },
  checks: [
    ['Diferencia conflicto de tarea y de relación, y cómo evitar que el primero se vuelva el segundo.', 'El de tarea es sobre el trabajo y puede mejorar decisiones; el de relación es personal y daña; se evita discutiendo ideas con datos y separando la persona de la propuesta.'],
    ['Describe los cinco estilos de Thomas-Kilmann y cuándo usar dos de ellos.', 'Competir, acomodarse, evitar, transigir y colaborar; competir en emergencias o temas éticos, colaborar en decisiones importantes que afectan a ambos.'],
    ['¿Cuáles son las ideas de la negociación basada en principios y qué es el MAAN?', 'Separar personas del problema, centrarse en intereses, inventar opciones y usar criterios objetivos; el MAAN es lo que harás sin acuerdo.'],
    ['¿Cómo se dice que no de forma profesional?', 'Reconociendo la necesidad, explicando con hechos, ofreciendo alternativas y siendo firme en lo no negociable.']
  ],
  cites: ['Fisher, R., Ury, W. y Patton, B. (2011). *Getting to Yes* (3.ª ed.). Penguin.', 'Stone, D., Patton, B. y Heen, S. (2010). *Difficult Conversations* (2.ª ed.). Penguin.', 'Jehn, K. (1995). A Multimethod Examination of the Benefits and Detriments of Intragroup Conflict. *Administrative Science Quarterly*, 40(2).', 'Thomas, K. y Kilmann, R. (1974). *Thomas-Kilmann Conflict Mode Instrument*. Xicom.', 'De Dreu, C. y Weingart, L. (2003). Task Versus Relationship Conflict, Team Performance, and Team Member Satisfaction. *Journal of Applied Psychology*, 88(4).'],
  project: { t: 'Preparar y conducir una negociación',
    goal: 'Aplicar la negociación basada en principios y las técnicas de conversaciones difíciles a un caso real o simulado.',
    steps: ['Elige un desacuerdo real o realista (una fecha, un alcance, una decisión técnica).', 'Prepara la conversación: tu interés, el probable interés del otro, tu MAAN y criterios objetivos.', 'Escribe al menos tres opciones de beneficio mutuo y qué no es negociable.', 'Conduce la conversación (o un juego de roles con otra persona), resumiendo lo que escuchas antes de responder.', 'Escribe una reflexión: qué estilo usaste, qué funcionó y qué cambiarías.'],
    deliver: 'La preparación escrita, las opciones y la reflexión.' },
  hito: ['Prepara con negociación basada en principios la próxima conversación de alcance y fechas de PatioApp con el área comercial.', 'Define con el equipo de PatioApp qué no es negociable en las entregas (pruebas de cobros, seguridad) y escríbelo.']
});
SDC.after('eq.conflict', 'eq.lead');


SDC.D('eq.lead', `## Reuniones que valen la pena
Buena parte del tiempo de un líder se va en reuniones, y muchas no deberían existir. Una reunión útil tiene un **objetivo** escrito en la invitación (decidir algo, resolver un problema, alinear un plan), solo las personas necesarias, una agenda, y termina con **decisiones y responsables** por escrito. Lo informativo (el estado del proyecto) suele funcionar mejor como un mensaje escrito que cada uno lee cuando puede. Proteger bloques largos sin reuniones para el trabajo concentrado es una de las mejores cosas que un líder puede hacer por su equipo: Paul Graham describió en 2009 cómo una sola reunión a media tarde puede arruinar el día de quien programa, porque parte su tiempo en trozos demasiado cortos para un trabajo profundo.`);

SDC.D('eq.conflict', `## Desacuerdos técnicos entre equipos
Cuando dos equipos no se ponen de acuerdo sobre una decisión técnica que afecta a ambos (qué formato usar para los eventos, quién es dueño de un servicio), ayuda seguir un proceso en lugar de discutir hasta el cansancio: escribir un documento corto con el problema, las opciones, los criterios y la recomendación de cada parte; acordar **quién decide** si no hay consenso (el arquitecto del área, el responsable de producto, un comité) y en qué plazo; y, una vez decidido, aplicar **"no estoy de acuerdo, pero me comprometo"** (*disagree and commit*): quien perdió la discusión apoya la decisión de buena fe, y se acuerda qué evidencia permitiría revisarla más adelante. Lo que no funciona es reabrir la decisión cada semana o implementarla a medias para demostrar que era mala.

## Conflictos que no son tuyos de resolver
Algunas situaciones superan lo que una conversación entre pares puede resolver: acoso, discriminación, maltrato reiterado, presiones para hacer algo ilegal o inseguro. En esos casos, lo correcto es documentar los hechos y recurrir a los canales formales: el jefe directo o el superior, recursos humanos, el comité de ética o los canales de denuncia de la empresa. En el Perú, la Ley 27942 de prevención y sanción del hostigamiento sexual obliga a las organizaciones a tener procedimientos para atender las denuncias.`);
})();
