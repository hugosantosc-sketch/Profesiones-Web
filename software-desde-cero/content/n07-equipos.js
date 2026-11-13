(function () {
var M = SDC.M, S = SDC.S;
M('eq', { title: 'Equipos, comunicación técnica y gestión de proyectos',
  desc: 'El software lo construyen personas. Este módulo cubre cómo funcionan los equipos, cómo escribir para que otros entiendan y decidan, y cómo planificar y controlar un proyecto con cronogramas y valor ganado.',
  thread: 'PatioApp deja de ser un proyecto individual: se organiza un equipo con acuerdos de trabajo, se documenta con tutoriales, guías, referencia y ADR, y se planifica con ruta crítica y control de valor ganado.',
  books: '*Peopleware* (DeMarco y Lister), *Team Topologies* (Skelton y Pais), *The Mythical Man-Month* (Brooks), *Docs for Developers* (Bhatti y otros), *Guía del PMBOK*, 7.ª ed. (PMI).',
  uni: 'Áreas *Software Engineering Professional Practice* y *Software Engineering Management* de SWEBOK v4; CMU 17-313 y 17-356; MIT 6.UAT *Oral Communication*; Stanford CS 194W *Software Project* (redacción técnica); Berkeley CS 169. En Perú: Gestión de Proyectos de Software, Comunicación Técnica y Liderazgo (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp como proyecto de equipo',
    goal: 'Gestionar PatioApp como lo haría un equipo profesional, con acuerdos, documentación y control del avance.',
    steps: ['Forma un equipo (o simula los roles), redacta su carta de equipo con acuerdos de trabajo y define su tipo según Team Topologies.', 'Escribe la documentación de PatioApp en las cuatro formas de Diátaxis y un documento de diseño revisado por otra persona.', 'Construye la EDT del siguiente incremento, estima con PERT y calcula la ruta crítica y las holguras.', 'Controla el avance con valor ganado durante al menos dos semanas y proyecta el costo final.', 'Haz una retrospectiva con la técnica que prefieras y registra las acciones de mejora.'],
    deliver: 'La carta de equipo, la documentación, el cronograma con ruta crítica, el informe de valor ganado y la retrospectiva.' } });

S('eq', 'eq.teams', { title: 'Equipos de software y factores humanos',
  ask: '¿Qué concepto sobre equipos se aplica?',
  lesson: `
> **La idea en simple.** Un equipo de cinco personas que confían entre sí, saben qué se espera de ellas y pueden concentrarse produce más y mejor que diez personas brillantes que se interrumpen, compiten o tienen miedo de equivocarse. La ingeniería de software es, sobre todo, un trabajo de personas.

## El problema es sociológico
Tom DeMarco y Timothy Lister escribieron en *Peopleware* (1987) que los principales problemas de nuestro trabajo no son tanto tecnológicos como sociológicos. Con sus estudios de "juegos de guerra de programación" mostraron que el entorno de trabajo (ruido, interrupciones, espacio) explicaba más diferencias de rendimiento que el lenguaje o los años de experiencia. Recuperaron la idea de **flujo** del psicólogo Mihály Csíkszentmihályi: el estado de concentración profunda en que se hace el trabajo intelectual, que tarda unos quince minutos en alcanzarse y se pierde con cada interrupción.

## Cómo se forma un equipo
Bruce Tuckman propuso en 1965 que los grupos pasan por etapas:
| Etapa | Qué pasa | Qué ayuda |
| Formación | cortesía, incertidumbre, dependencia del líder | objetivos claros y roles |
| Conflicto | choques sobre cómo trabajar y quién decide | hablar de los desacuerdos, no evitarlos |
| Normalización | se acuerdan normas y se gana confianza | acuerdos de trabajo explícitos |
| Desempeño | el equipo se autoorganiza y rinde | proteger al equipo de cambios innecesarios |
En 1977, Tuckman y Mary Ann Jensen agregaron una quinta etapa, **disolución**. La lección práctica: cambiar constantemente la composición de un equipo lo devuelve a las primeras etapas; los equipos **estables** rinden más.

## Seguridad psicológica
Amy Edmondson, de Harvard, definió en 1999 la **seguridad psicológica** como la creencia compartida de que el equipo es un lugar seguro para asumir riesgos interpersonales: preguntar, admitir un error, proponer una idea o discrepar sin temor a ser humillado o castigado. En su estudio con equipos de hospital encontró algo inesperado: los mejores equipos *reportaban* más errores, no porque cometieran más, sino porque se atrevían a hablar de ellos.

Google llegó a una conclusión parecida con el **Proyecto Aristóteles** (2015), que estudió más de 180 equipos. La seguridad psicológica fue el factor más importante, seguida de la confiabilidad (cumplir lo prometido), la estructura y claridad (roles y objetivos), el significado del trabajo y la sensación de impacto. Lo que *no* predecía el éxito: quiénes estaban en el equipo o cuán brillantes eran individualmente.

## Comunicación y tamaño
Con n personas hay n(n − 1)/2 canales de comunicación: 3 con 3 personas, 45 con 10, 190 con 20. Por eso Fred Brooks observó en 1975 que agregar personas a un proyecto atrasado lo atrasa más, y por eso Amazon popularizó los equipos de "dos pizzas": lo bastante pequeños como para alimentarse con dos pizzas, unas cinco a nueve personas. La **ley de Conway** (1968) añade que la arquitectura del sistema copiará la estructura de comunicación de la organización.
~~~js
const canales = n => n * (n - 1) / 2;
[3, 5, 7, 10, 15, 20].forEach(n => console.log(n, 'personas →', canales(n), 'canales'));
~~~

## Team Topologies
Matthew Skelton y Manuel Pais propusieron en *Team Topologies* (2019) cuatro tipos de equipo y tres modos de interacción, con la **carga cognitiva** como límite de diseño (cuánto puede entender y mantener un equipo):
- **Alineado a un flujo de valor:** entrega de punta a punta una parte del producto (la mayoría de los equipos).
- **Habilitador:** ayuda temporalmente a otros a adquirir una capacidad (pruebas, seguridad).
- **De subsistema complicado:** se ocupa de una parte que exige conocimiento muy especializado (un motor de cálculo, un códec de video).
- **De plataforma:** ofrece servicios internos que otros consumen sin fricción (despliegue, observabilidad).
Modos de interacción: **colaboración** (trabajar juntos un tiempo), **X como servicio** (consumir lo que el otro ofrece) y **facilitación** (uno enseña al otro).

## Disfunciones y cómo trabajarlas
Patrick Lencioni describió en *The Five Dysfunctions of a Team* (2002) una pirámide: falta de confianza, miedo al conflicto, falta de compromiso, evasión de responsabilidades y desatención a los resultados. Cada nivel se apoya en el anterior: sin confianza no hay debate honesto, y sin debate la gente no se compromete de verdad con las decisiones.

Herramientas concretas:
- **Acuerdos de trabajo:** horarios de concentración, cómo se piden revisiones, qué se responde por chat y qué por reunión.
- **Reuniones uno a uno** entre líder y cada persona, enfocadas en la persona y no en el estado de las tareas.
- **Retroalimentación con el modelo SBI** del Center for Creative Leadership: *situación* ("en la revisión de ayer"), *comportamiento* observable ("interrumpiste a Ana tres veces") e *impacto* ("ella dejó de proponer ideas").
- **Retrospectivas** sin culpables, como pide la directiva principal de Norman Kerth (2001): asumir que cada persona hizo el mejor trabajo posible con lo que sabía en ese momento.

## Ejemplo resuelto: un equipo que no habla de sus errores
Situación: en un equipo de seis personas, los incidentes se descubren por los clientes y nadie menciona sus errores en las reuniones diarias. El líder suele preguntar "¿quién rompió esto?". Diagnóstico: baja seguridad psicológica (Edmondson) y, según Lencioni, falta de confianza en la base de la pirámide. Acciones: el líder empieza por admitir sus propios errores en público; los postmortems pasan a ser sin culpables; se agrega a la retrospectiva la pregunta "¿qué casi sale mal esta semana?"; se acuerda que reportar un problema temprano se agradece. Se mide el efecto contando cuántos problemas se detectan internamente antes de llegar al cliente.`,
  links: [['m7.team', 'el flujo de trabajo con Git y revisiones es la práctica diaria del equipo'], ['m12.agile', 'Scrum y las retrospectivas organizan el trabajo del equipo'], ['m13.styles', 'la ley de Conway conecta la estructura del equipo con la arquitectura']],
  read: 'DeMarco y Lister, *Peopleware*; Skelton y Pais, *Team Topologies*; Edmondson (1999); Brooks, capítulo 2.',
  terms: [
    ['Seguridad psicológica', 'creencia compartida de que el equipo es seguro para asumir riesgos interpersonales como preguntar, discrepar o admitir errores', ['Alguien dice "no entendí" en la reunión sin miedo.', 'Los errores se reportan temprano en lugar de esconderse.', 'Fue el principal factor del Proyecto Aristóteles de Google.']],
    ['Etapas de Tuckman', 'modelo de formación de grupos: formación, conflicto, normalización, desempeño y disolución', ['Un equipo nuevo discute cómo hacer las revisiones de código.', 'Tras acordar normas, la colaboración se vuelve fluida.', 'Cambiar a sus integrantes lo devuelve a las primeras etapas.']],
    ['Flujo', 'estado de concentración profunda necesario para el trabajo intelectual, que se pierde con las interrupciones', ['Bloqueas dos horas sin notificaciones para programar.', 'Una pregunta por chat cada diez minutos lo impide.', 'DeMarco y Lister lo destacaron en Peopleware.']],
    ['Carga cognitiva del equipo', 'cantidad de información y responsabilidades que un equipo puede manejar bien a la vez', ['Un equipo que mantiene ocho servicios distintos no puede dominarlos todos.', 'Team Topologies la usa como límite para diseñar equipos.', 'Se reduce con plataformas internas.']],
    ['Equipo de plataforma', 'equipo que ofrece servicios internos que otros equipos consumen por autoservicio', ['Ofrece un pipeline de despliegue listo para usar.', 'Los demás equipos lo consumen como servicio.', 'Reduce la carga cognitiva de los equipos de producto.']],
    ['Canales de comunicación', 'cantidad de pares de personas que pueden necesitar coordinarse, igual a n(n−1)/2', ['Un equipo de 10 personas tiene 45 canales.', 'Explica por qué agregar personas tarde retrasa más.', 'Justifica los equipos pequeños.']],
    ['Modelo SBI', 'forma de dar retroalimentación describiendo situación, comportamiento observable e impacto', ['"En la demo, cuando cortaste la pregunta, el cliente se molestó".', 'Evita juicios sobre la persona.', 'Lo propuso el Center for Creative Leadership.']],
    ['Acuerdo de trabajo', 'norma explícita que un equipo adopta sobre cómo colaborar', ['"Las revisiones se responden en menos de un día hábil".', '"De 9 a 11 no hay reuniones".', 'Se escribe y se revisa en las retrospectivas.']]
  ],
  q: [
    ['En el estudio de Edmondson, los mejores equipos de hospital reportaban más errores. ¿Por qué?', 'Porque tenían más seguridad psicológica para hablar de ellos', ['Porque eran menos competentes', 'Porque tenían más pacientes', 'Porque los obligaban'], 'Reportar es señal de confianza, no de incompetencia.', 3],
    ['¿Cuál fue el factor más importante en el Proyecto Aristóteles de Google?', 'La seguridad psicológica', ['El coeficiente intelectual promedio', 'La antigüedad', 'Trabajar en la misma oficina'], 'Le seguían confiabilidad, estructura, significado e impacto.', 2],
    ['¿Cuántos canales de comunicación hay en un equipo de 8 personas?', '28', ['16', '56', '64'], '8·7/2 = 28.', 2],
    ['Un equipo nuevo discute fuertemente sobre las convenciones de código. ¿En qué etapa de Tuckman está?', 'Conflicto', ['Formación', 'Normalización', 'Desempeño'], 'Es la etapa de choques sobre cómo trabajar.', 2],
    ['Según Team Topologies, ¿qué equipo ayuda temporalmente a otros a adquirir una capacidad?', 'Habilitador', ['De plataforma', 'Alineado a un flujo', 'De subsistema complicado'], 'Enseña y se retira; no hace el trabajo por el otro.', 3],
    ['¿Qué está en la base de la pirámide de Lencioni?', 'La falta de confianza', ['La desatención a los resultados', 'El miedo al conflicto', 'La falta de compromiso'], 'Las demás disfunciones se apoyan en ella.', 3],
    { tf: 'Cambiar con frecuencia a los integrantes de un equipo mejora su rendimiento porque aporta ideas nuevas.', v: false, e: 'Los equipos estables rinden más; cada cambio los devuelve a etapas tempranas.', l: 2 },
    { tf: 'La retroalimentación con SBI describe comportamientos observables en vez de juzgar a la persona.', v: true, e: 'Situación, comportamiento e impacto.', l: 1 },
    { c: 'Escribe «canales(n)» con la cantidad de canales de comunicación entre n personas.', f: 'canales', p: ['n'], t: [[[5], 10], [[2], 1], [[10], 45], [[1], 0]], sol: '  return n * (n - 1) / 2;', l: 1 },
    { c: 'Escribe «canalesAgregados(n, k)»: cuántos canales nuevos aparecen al sumar k personas a un equipo de n.', f: 'canalesAgregados', p: ['n', 'k'], t: [[[5, 1], 5], [[10, 5], 60], [[3, 2], 7]], sol: '  const c = x => x * (x - 1) / 2;\n  return c(n + k) - c(n);', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(3, 25); g.input(1, '¿Cuántos canales de comunicación hay entre ' + n + ' personas?', n * (n - 1) / 2, n + '·' + (n - 1) + '/2.'); });
    var etapas = [['Las personas son corteses y esperan que el líder diga qué hacer', 'Formación'], ['Hay discusiones sobre quién decide la arquitectura', 'Conflicto'], ['El equipo escribe y acepta sus acuerdos de trabajo', 'Normalización'], ['El equipo se reparte el trabajo solo y entrega con constancia', 'Desempeño'], ['El proyecto terminó y el equipo celebra y se separa', 'Disolución']];
    etapas.forEach(function (e) { g.mcq(2, '¿En qué etapa de Tuckman está este equipo? ' + e[0], e[1], g.R.sample(['Formación', 'Conflicto', 'Normalización', 'Desempeño', 'Disolución'].filter(function (x) { return x !== e[1]; }), 3), 'Tuckman (1965) y Tuckman y Jensen (1977).'); });
    var tipos = [['Mantiene el pipeline de despliegue que usan todos los equipos', 'De plataforma'], ['Desarrolla de punta a punta el módulo de cobros', 'Alineado a un flujo de valor'], ['Acompaña tres semanas a otro equipo para que adopte pruebas automatizadas', 'Habilitador'], ['Mantiene el motor de optimización de rutas, que exige matemática especializada', 'De subsistema complicado']];
    tipos.forEach(function (t) { g.mcq(3, 'Según Team Topologies, ¿qué tipo de equipo es este? ' + t[0], t[1], ['De plataforma', 'Alineado a un flujo de valor', 'Habilitador', 'De subsistema complicado'].filter(function (x) { return x !== t[1]; }), 'Skelton y Pais (2019).'); });
    g.times(5, function (R) { var n = R.int(3, 10), k = R.int(1, 5), c = function (x) { return x * (x - 1) / 2; }; g.input(3, 'Un equipo de ' + n + ' personas suma ' + k + ' más. ¿Cuántos canales de comunicación nuevos aparecen?', c(n + k) - c(n), c(n + k) + ' − ' + c(n) + '.'); });
  },
  checks: [
    ['¿Qué es la seguridad psicológica y cómo se reconoce en un equipo?', 'La creencia compartida de que se pueden asumir riesgos interpersonales; se reconoce en que la gente pregunta, discrepa y reporta errores temprano.'],
    ['¿Por qué Peopleware dice que los problemas son más sociológicos que tecnológicos?', 'Porque el entorno, las interrupciones y las relaciones explicaban más diferencias de rendimiento que la tecnología o la experiencia.'],
    ['Explica con números por qué los equipos grandes se coordinan peor.', 'Los canales crecen como n(n−1)/2: 10 con 5 personas y 190 con 20; la coordinación crece mucho más rápido que la capacidad.'],
    ['¿Qué tipo de equipo de Team Topologies reduce la carga cognitiva de los demás y cómo?', 'El de plataforma, ofreciendo servicios internos por autoservicio para que los equipos de producto no tengan que construirlos.'],
    ['Da una retroalimentación con el modelo SBI.', '"En la reunión de planificación de hoy (situación), presentaste las estimaciones con los riesgos de cada una (comportamiento) y eso nos ayudó a decidir rápido (impacto)".']
  ],
  cites: ['DeMarco, T. y Lister, T. (1987/2013). *Peopleware: Productive Projects and Teams* (3.ª ed.). Addison-Wesley.', 'Tuckman, B. (1965). Developmental Sequence in Small Groups. *Psychological Bulletin*, 63(6).', 'Edmondson, A. (1999). Psychological Safety and Learning Behavior in Work Teams. *Administrative Science Quarterly*, 44(2).', 'Skelton, M. y Pais, M. (2019). *Team Topologies*. IT Revolution.', 'Lencioni, P. (2002). *The Five Dysfunctions of a Team*. Jossey-Bass.', 'Kerth, N. (2001). *Project Retrospectives: A Handbook for Team Reviews*. Dorset House.'],
  project: { t: 'Carta de equipo y diagnóstico',
    goal: 'Diseñar las condiciones para que un equipo trabaje bien y diagnosticar uno real.',
    steps: ['Redacta la carta de un equipo: propósito, integrantes y roles, acuerdos de trabajo, horarios de concentración y forma de tomar decisiones.', 'Clasifica el equipo según Team Topologies y define cómo interactúa con otros equipos.', 'Aplica una encuesta breve de seguridad psicológica (por ejemplo, los siete ítems de Edmondson) a un equipo real o de curso.', 'Analiza los resultados con el modelo de Lencioni y propone tres acciones.', 'Practica dar y recibir retroalimentación con el modelo SBI y registra lo aprendido.'],
    deliver: 'La carta de equipo, el diagnóstico y el plan de acciones.' },
  hito: ['Redacta la carta del equipo de PatioApp con acuerdos de trabajo, horarios de concentración y forma de decidir.', 'Organiza los equipos de PatioApp según Team Topologies (por ejemplo, flujo de operaciones del patio y plataforma) y define sus modos de interacción.']
});

S('eq', 'eq.write', { title: 'Comunicación y documentación técnica',
  ask: '¿Qué principio de comunicación técnica se aplica?',
  lesson: `
> **La idea en simple.** El código le dice a la computadora qué hacer; la documentación le dice a las personas por qué y cómo. Un ingeniero que escribe con claridad multiplica su impacto: sus propuestas se aprueban, sus sistemas se entienden y su conocimiento sobrevive cuando cambia de equipo.

## Escribir es pensar
Leslie Lamport, ganador del Premio Turing, suele repetir una frase del caricaturista Dick Guindon: "escribir es la forma en que la naturaleza te muestra lo descuidado que es tu pensamiento". Si no puedes explicar un diseño por escrito, probablemente no lo entiendes del todo. Por eso Amazon reemplazó las presentaciones por **memorandos narrativos** de seis páginas: Jeff Bezos explicó en un correo de 2004 que la estructura narrativa obliga a pensar mejor y a entender qué es más importante que qué. Las reuniones empiezan con todos leyendo el documento en silencio.

## Principios de redacción clara
George Orwell propuso en *Politics and the English Language* (1946) seis reglas que siguen vigentes; adaptadas al español técnico:
- Prefiere la palabra corta y común a la larga y rebuscada.
- Si puedes quitar una palabra sin perder el sentido, quítala.
- Usa la voz activa: "el servicio valida el token" en lugar de "el token es validado".
- Evita la jerga cuando exista una palabra cotidiana.
Otras reglas del curso de redacción técnica de Google y del libro *Docs for Developers* (Jared Bhatti y otros, 2021):
- **Conoce a tu lector:** ¿qué sabe, qué necesita hacer, cuánto tiempo tiene?
- **Lo más importante primero:** la conclusión o la acción en el primer párrafo (pirámide invertida).
- **Una idea por oración, una oración por idea**; oraciones de unas 15 a 20 palabras.
- **Define cada término** la primera vez y úsalo siempre igual.
- **Ejemplos concretos** que se puedan copiar y ejecutar.
~~~js
// Un indicador simple de legibilidad: palabras promedio por oración
const texto = 'El servicio valida el token. Si el token expiró, devuelve 401. El cliente debe pedir uno nuevo con el refresh token.';
const oraciones = texto.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
const palabras = oraciones.reduce((s, o) => s + o.split(/\s+/).length, 0);
console.log(oraciones.length, 'oraciones,', (palabras / oraciones.length).toFixed(1), 'palabras por oración');
~~~

## Los cuatro tipos de documentación: Diátaxis
Daniele Procida propuso el marco **Diátaxis**, adoptado por proyectos como Django, Python y Ubuntu. Observa que hay cuatro necesidades distintas y que mezclarlas confunde:
| Tipo | Orientado a | Pregunta del lector | Ejemplo en PatioApp |
| Tutorial | aprender | "enséñame" | "Tu primer ingreso de vehículo en 10 minutos" |
| Guía práctica | resolver una tarea | "¿cómo hago X?" | "Cómo exportar el reporte mensual" |
| Referencia | consultar | "¿qué es exactamente X?" | lista de endpoints con parámetros y errores |
| Explicación | entender | "¿por qué?" | "Por qué los cobros usan claves de idempotencia" |
Un tutorial no debe desviarse a explicar teoría; una referencia no debe enseñar paso a paso. Cada tipo se escribe distinto.

## Documentos de diseño y RFC
Antes de construir algo importante, muchos equipos escriben un **documento de diseño**: contexto y problema, objetivos y *no objetivos*, propuesta, alternativas consideradas, riesgos, plan de despliegue y preguntas abiertas. Se comparte para recibir comentarios cuando cambiar de idea todavía es barato. La tradición viene de las **RFC** (*Request for Comments*): Steve Crocker escribió la RFC 1 en 1969, para la red ARPANET, con un tono deliberadamente humilde que invitaba a comentar; hoy las RFC del IETF definen protocolos como HTTP y TCP. Proyectos como Rust y Python (con sus PEP) usan procesos similares.

## Registros de decisiones de arquitectura
Michael Nygard propuso en 2011 los **ADR** (*Architecture Decision Records*): archivos cortos, guardados con el código, que registran una decisión importante con su **título**, **estado** (propuesta, aceptada, reemplazada), **contexto**, **decisión** y **consecuencias** (positivas y negativas). Su valor aparece meses después, cuando alguien pregunta "¿por qué hicimos esto así?" y la respuesta está escrita.
~~~txt
ADR 007: Usar PostgreSQL como base de datos principal
Estado: aceptada (2026-03-10)
Contexto: necesitamos transacciones para los cobros y consultas por rango de fechas; el equipo conoce SQL.
Decisión: PostgreSQL administrado en la nube.
Consecuencias: (+) transacciones ACID, ecosistema maduro. (−) costo mensual fijo; escalar escrituras exigirá trabajo futuro.
~~~

## Comentarios, mensajes y documentación como código
- **Comentarios:** el código dice *qué* y *cómo*; el comentario explica *por qué* (una restricción del negocio, un error de una librería que se rodea).
- **Mensajes de commit:** una primera línea corta en imperativo y, si hace falta, un párrafo con el porqué.
- **Programación literaria:** Donald Knuth propuso en 1984 escribir los programas como textos para personas, con el código intercalado en la explicación. Los cuadernos de Jupyter son herederos de esa idea.
- **Documentación como código:** la documentación vive en el repositorio, en Markdown, se revisa en los pull requests y se publica automáticamente. Si un cambio de código no actualiza su documentación, la revisión lo detecta.

## Comunicar oralmente y a no técnicos
Ante una audiencia no técnica: empieza por el impacto ("los cobros duplicados cuestan S/ 3000 al mes"), usa analogías, muestra una sola cifra clave por diapositiva y termina con la decisión que necesitas. Ante un incidente, comunica pronto y con frecuencia: qué se sabe, qué no se sabe todavía, qué se está haciendo y cuándo habrá una nueva actualización.

## Ejemplo resuelto: reescribir un párrafo confuso
Antes: "Se procedió a la realización de una evaluación por parte del equipo con respecto a la posibilidad de efectuar la migración de la base de datos, habiéndose determinado que la misma sería factible." (34 palabras, voz pasiva, sin dato concreto.)
Después: "El equipo evaluó la migración de la base de datos y concluyó que es factible en dos semanas." (17 palabras, voz activa, con plazo.) Mismo contenido, la mitad de palabras y más información.`,
  links: [['m13.styles', 'los ADR registran las decisiones de arquitectura'], ['m7.git', 'los mensajes de commit y la documentación como código viven en Git'], ['m11.req', 'una especificación de requisitos es documentación técnica']],
  read: 'Bhatti y otros, *Docs for Developers*; Procida, *Diátaxis* (diataxis.fr); Nygard (2011); curso Technical Writing de Google.',
  terms: [
    ['Diátaxis', 'marco que divide la documentación en tutoriales, guías prácticas, referencia y explicación', ['Separas "primeros pasos" de la lista de endpoints.', 'Lo propuso Daniele Procida.', 'Lo usan Django y Python.']],
    ['Tutorial', 'documento orientado a aprender que guía paso a paso a un principiante hasta un resultado', ['"Tu primer ingreso de vehículo en 10 minutos".', 'No se desvía a explicar teoría.', 'Debe funcionar exactamente como está escrito.']],
    ['Guía práctica', 'documento orientado a resolver una tarea concreta de alguien que ya sabe lo básico', ['"Cómo exportar el reporte mensual".', 'Supone conocimiento previo.', 'Va directo a los pasos.']],
    ['Documentación de referencia', 'descripción técnica exacta y completa de una interfaz, pensada para consultarse', ['La lista de parámetros y códigos de error de cada endpoint.', 'Suele generarse a partir del código o de OpenAPI.', 'No enseña: informa.']],
    ['ADR', 'registro breve de una decisión de arquitectura con su contexto, la decisión y sus consecuencias', ['Explicas por qué se eligió PostgreSQL.', 'Se guarda junto al código.', 'Michael Nygard lo propuso en 2011.']],
    ['Documento de diseño', 'texto que propone una solución antes de construirla, con objetivos, alternativas y riesgos', ['Lo compartes para recibir comentarios antes de programar.', 'Incluye no objetivos para delimitar el alcance.', 'Hereda la tradición de las RFC.']],
    ['Pirámide invertida', 'estructura que pone primero la conclusión o lo más importante y después los detalles', ['El primer párrafo de un informe dice qué decidir.', 'El asunto de un correo resume el pedido.', 'Sirve a lectores con poco tiempo.']],
    ['Documentación como código', 'práctica de mantener la documentación en el repositorio y tratarla con los mismos procesos que el código', ['La documentación en Markdown se revisa en los pull requests.', 'Se publica automáticamente en cada cambio.', 'Detecta documentación desactualizada en la revisión.']]
  ],
  q: [
    ['Un nuevo usuario quiere aprender a usar PatioApp desde cero. ¿Qué tipo de documento de Diátaxis necesita?', 'Un tutorial', ['Referencia', 'Explicación', 'Un ADR'], 'Está orientado a aprender, paso a paso.', 2],
    ['¿Qué secciones tiene un ADR según Nygard?', 'Título, estado, contexto, decisión y consecuencias', ['Solo la decisión', 'Código y pruebas', 'Requisitos y casos de uso'], 'Las consecuencias incluyen las negativas.', 2],
    ['¿Qué debe explicar principalmente un comentario en el código?', 'Por qué se hizo algo de esa manera', ['Qué hace cada línea', 'Quién lo escribió', 'La fecha del cambio'], 'El qué y el cómo deberían leerse en el código mismo.', 2],
    ['¿Por qué Amazon reemplazó las presentaciones por memorandos narrativos?', 'Porque la narrativa obliga a pensar mejor y a relacionar las ideas', ['Porque son más cortos', 'Para ahorrar papel', 'Porque no hay proyectores'], 'Según el correo de Bezos de 2004.', 3],
    ['¿Qué versión es más clara? ', '"El servicio valida el token"', ['"El token es validado por parte del servicio"', '"Se procede a la validación del token"', '"La validación del token es efectuada"'], 'Voz activa y sin palabras sobrantes.', 1],
    { tf: 'Un documento de diseño debería incluir los "no objetivos", lo que deliberadamente queda fuera.', v: true, e: 'Delimitan el alcance y evitan malentendidos.', l: 2 },
    { tf: 'Un buen tutorial explica en detalle la teoría detrás de cada paso.', v: false, e: 'Eso es explicación; el tutorial se enfoca en que el aprendiz logre un resultado.', l: 2 },
    { o: 'Ordena las secciones típicas de un documento de diseño.', s: ['Contexto y problema', 'Objetivos y no objetivos', 'Propuesta', 'Alternativas consideradas', 'Riesgos y plan de despliegue'], e: 'Primero el problema, luego la solución y sus alternativas.', l: 2 },
    { c: 'Escribe «palabrasPorOracion(texto)»: divide el texto en oraciones por ".", "!" o "?" (ignorando las vacías) y devuelve el promedio de palabras por oración, redondeado a 2 decimales.', f: 'palabrasPorOracion', p: ['texto'], t: [[['Hola mundo. Esto es una prueba.'], 3], [['El sistema falla. Reinicia el servidor y revisa los registros.'], 5], [['Uno dos tres.'], 3]], sol: '  const o = texto.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);\n  const p = o.reduce((s, x) => s + x.split(/\\s+/).length, 0);\n  return Math.round(p / o.length * 100) / 100;', l: 3 },
    { c: 'Escribe «adrCompleto(adr)» que devuelva true si el objeto tiene titulo, estado, contexto, decision y consecuencias, todos como textos no vacíos.', f: 'adrCompleto', p: ['adr'], t: [[[{ titulo: 'Usar PostgreSQL', estado: 'aceptada', contexto: 'x', decision: 'y', consecuencias: 'z' }], true], [[{ titulo: 'A', estado: 'propuesta', contexto: '', decision: 'y', consecuencias: 'z' }], false], [[{ titulo: 'A' }], false]], sol: '  return ["titulo", "estado", "contexto", "decision", "consecuencias"].every(k => typeof adr[k] === "string" && adr[k].trim() !== "");', l: 2 }
  ],
  gen: function (g) {
    var docs = [['"Instala PatioApp y registra tu primer vehículo"', 'Tutorial'], ['"Cómo cambiar la tarifa por hora de un patio"', 'Guía práctica'], ['"Lista de todos los códigos de error de la API con su significado"', 'Referencia'], ['"Por qué PatioApp separa el dominio de la infraestructura"', 'Explicación'], ['"Cómo restaurar un respaldo de la base de datos"', 'Guía práctica'], ['"Parámetros de configuración y sus valores por defecto"', 'Referencia'], ['"Historia y razones del modelo de tarifas"', 'Explicación'], ['"Construye tu primer reporte paso a paso"', 'Tutorial']];
    docs.forEach(function (d) { g.mcq(2, '¿Qué tipo de documento de Diátaxis es ' + d[0] + '?', d[1], ['Tutorial', 'Guía práctica', 'Referencia', 'Explicación'].filter(function (x) { return x !== d[1]; }), 'Aprender, resolver, consultar o entender.'); });
    var activas = [['El token es validado por el servicio', 'El servicio valida el token', ['Se valida el token por parte del servicio', 'La validación del token es realizada por el servicio', 'El token resulta validado']], ['Los datos fueron guardados por la aplicación', 'La aplicación guardó los datos', ['Se guardaron los datos por la aplicación', 'El guardado de los datos fue hecho por la aplicación', 'Los datos quedaron guardados']], ['El error fue detectado por las pruebas', 'Las pruebas detectaron el error', ['Se detectó el error por parte de las pruebas', 'La detección del error fue efectuada por las pruebas', 'El error resultó detectado']], ['La solicitud es rechazada por el servidor', 'El servidor rechaza la solicitud', ['Se rechaza la solicitud por el servidor', 'El rechazo de la solicitud es hecho por el servidor', 'La solicitud resulta rechazada']], ['El despliegue fue aprobado por el líder', 'El líder aprobó el despliegue', ['Se aprobó el despliegue por el líder', 'La aprobación del despliegue fue dada por el líder', 'El despliegue quedó aprobado']]];
    activas.forEach(function (a) { g.mcq(1, '¿Cuál es la versión en voz activa y más directa de "' + a[0] + '"?', a[1], a[2], 'La voz activa pone primero a quien realiza la acción y usa menos palabras.'); });
    var secciones = [['Por qué tuvimos que decidir algo', 'Contexto'], ['Qué se eligió', 'Decisión'], ['Qué ganamos y qué perdemos con la elección', 'Consecuencias'], ['Si la decisión está propuesta, aceptada o reemplazada', 'Estado']];
    secciones.forEach(function (s) { g.mcq(2, '¿Qué sección de un ADR contiene esto? ' + s[0], s[1], ['Contexto', 'Decisión', 'Consecuencias', 'Estado'].filter(function (x) { return x !== s[1]; }), 'Formato de Nygard (2011).'); });
    g.times(5, function (R) { var o = R.int(2, 8), p = o * R.int(8, 25); g.input(2, 'Un texto tiene ' + p + ' palabras en ' + o + ' oraciones. ¿Cuántas palabras por oración tiene en promedio?', p / o, p + '/' + o + '.'); });
  },
  checks: [
    ['¿Por qué se dice que escribir es pensar?', 'Porque redactar una idea revela los huecos y las contradicciones que en la cabeza pasan desapercibidos.'],
    ['Nombra los cuatro tipos de documentación de Diátaxis con un ejemplo de cada uno.', 'Tutorial (primeros pasos), guía práctica (cómo exportar un reporte), referencia (lista de endpoints) y explicación (por qué se usa idempotencia).'],
    ['¿Qué ventaja tiene guardar los ADR junto al código?', 'Se versionan con el código, se revisan en los pull requests y quien lea el código encuentra el porqué de las decisiones.'],
    ['Reescribe con claridad: "Se efectuó la implementación de la funcionalidad por parte del equipo".', '"El equipo implementó la funcionalidad".'],
    ['¿Qué debes comunicar durante un incidente?', 'Qué se sabe, qué no se sabe todavía, qué se está haciendo y cuándo será la próxima actualización.']
  ],
  cites: ['Bhatti, J. et al. (2021). *Docs for Developers: An Engineer’s Field Guide to Technical Writing*. Apress.', 'Procida, D. *Diátaxis: A Systematic Approach to Technical Documentation*. diataxis.fr.', 'Nygard, M. (2011). Documenting Architecture Decisions. Cognitect.', 'Orwell, G. (1946). Politics and the English Language. *Horizon*, 13(76).', 'Knuth, D. (1984). Literate Programming. *The Computer Journal*, 27(2).', 'Crocker, S. (1969). RFC 1: Host Software. IETF.'],
  project: { t: 'Documentación completa de un sistema',
    goal: 'Documentar un sistema para que otra persona pueda aprenderlo, usarlo y mantenerlo sin preguntarte.',
    steps: ['Elige un proyecto tuyo y escribe un tutorial de inicio que alguien sin experiencia pueda seguir; pruébalo con esa persona.', 'Escribe dos guías prácticas, la referencia de su API o configuración y una explicación de su diseño.', 'Redacta un documento de diseño para una mejora futura con objetivos, no objetivos y alternativas, y pide comentarios.', 'Registra tres decisiones pasadas como ADR.', 'Configura la documentación como código: Markdown en el repositorio y publicación automática.'],
    deliver: 'El sitio de documentación publicado, el documento de diseño con comentarios y los ADR.' },
  hito: ['Documenta PatioApp con Diátaxis: un tutorial de inicio, dos guías prácticas, la referencia de la API y una explicación de su arquitectura.', 'Escribe un documento de diseño para la siguiente gran funcionalidad de PatioApp, recibe comentarios de otra persona y registra la decisión final en un ADR.']
});

S('eq', 'eq.pm', { title: 'Gestión de proyectos: cronograma, ruta crítica y valor ganado',
  ask: '¿Qué concepto de gestión de proyectos se aplica?',
  lesson: `
> **La idea en simple.** Un proyecto es una serie de tareas con dependencias: no puedes pintar una pared antes de construirla. Si sabes cuánto dura cada tarea y de cuál depende, puedes calcular cuándo terminará todo, qué tareas no pueden retrasarse y si vas bien o mal en tiempo y dinero.

## Qué es la gestión de proyectos
El Project Management Institute (PMI) define un proyecto como un esfuerzo temporal para crear un producto, servicio o resultado único. Su *Guía del PMBOK* pasó, en la 7.ª edición (2021), de un enfoque de procesos a uno de **principios** (como administración responsable, enfoque en el valor, adaptabilidad) y **dominios de desempeño** (partes interesadas, equipo, enfoque de desarrollo, planificación, trabajo del proyecto, entrega, medición e incertidumbre). Acepta explícitamente enfoques predictivos, ágiles e híbridos. El clásico **triángulo de restricciones** recuerda que alcance, tiempo y costo están ligados: si uno cambia, otro debe ajustarse o sufre la calidad.

## Estructura de desglose del trabajo
La **EDT** (en inglés, WBS) divide el proyecto en entregables y estos en paquetes de trabajo lo bastante pequeños como para estimarlos y asignarlos. La regla del 100%: la EDT incluye todo el trabajo del proyecto y nada más. Ejemplo para PatioApp: gestión del proyecto; ingreso de vehículos (pantalla, API, base de datos, pruebas); cobros; reportes; despliegue y capacitación.

## Estimación con tres puntos: PERT
La técnica **PERT** nació en 1958 en la Marina de los Estados Unidos para el programa de misiles Polaris. Para cada tarea se estima un valor optimista (O), uno más probable (M) y uno pesimista (P):
:::flow Duración esperada = (O + 4M + P) / 6 | Desviación ≈ (P − O) / 6
Una tarea con O = 2, M = 4 y P = 12 días tiene una duración esperada de (2 + 16 + 12)/6 = 5 días, más que el valor "más probable", porque la cola pesimista es larga. Así es casi siempre en software.

## El método de la ruta crítica
El **CPM** (*Critical Path Method*) lo desarrollaron James Kelley, de Remington Rand, y Morgan Walker, de DuPont, a fines de los años 50. Pasos:
1. **Pasada hacia adelante:** el inicio más temprano (IT) de una tarea es el máximo de los fines más tempranos de sus predecesoras; su fin más temprano es FT = IT + duración. El FT mayor es la duración del proyecto.
2. **Pasada hacia atrás:** el fin más tardío (FTa) de una tarea es el mínimo de los inicios más tardíos de sus sucesoras; su inicio más tardío es ITa = FTa − duración.
3. **Holgura total** = ITa − IT: cuánto puede retrasarse la tarea sin retrasar el proyecto.
4. La **ruta crítica** es la cadena de tareas con holgura cero. Retrasar cualquiera de ellas retrasa todo; acelerar tareas que no están en ella no adelanta nada.
~~~js
const tareas = { A: [3, []], B: [2, ['A']], C: [4, ['A']], D: [1, ['B', 'C']] };   // duración y predecesoras
const ft = {};
const fin = id => ft[id] ??= tareas[id][0] + Math.max(0, ...tareas[id][1].map(fin));
const duracion = Math.max(...Object.keys(tareas).map(fin));
const sucesoras = id => Object.keys(tareas).filter(t => tareas[t][1].includes(id));
const fta = {};
const finTardio = id => fta[id] ??= Math.min(duracion, ...sucesoras(id).map(s => finTardio(s) - tareas[s][0]));
for (const id in tareas) console.log(id, 'holgura', finTardio(id) - fin(id));
console.log('Duración del proyecto:', duracion);
~~~
En el ejemplo, A, C y D forman la ruta crítica (holgura 0) y B tiene 2 días de holgura.

## Acortar el cronograma
- **Compresión** (*crashing*): agregar recursos a tareas críticas, con costo adicional (y cuidado con la ley de Brooks).
- **Ejecución rápida** (*fast tracking*): hacer en paralelo tareas que estaban en secuencia, con más riesgo de retrabajo.
- **Reducir alcance:** muchas veces la opción más sana.
Eliyahu Goldratt propuso en *Critical Chain* (1997) quitar los márgenes escondidos de cada tarea y concentrarlos en un **amortiguador** al final del proyecto, porque los márgenes individuales se desperdician por la **ley de Parkinson** (el trabajo se expande hasta llenar el tiempo disponible) y el **síndrome del estudiante** (empezar a última hora).

## Gestión del valor ganado
El **valor ganado** (EVM), adoptado por el Departamento de Defensa de los Estados Unidos en los años 60, responde con tres números si el proyecto va bien:
| Sigla | Nombre | Significado |
| PV | valor planificado | costo presupuestado del trabajo que *debía* estar hecho a la fecha |
| EV | valor ganado | costo presupuestado del trabajo *realmente* hecho |
| AC | costo real | lo que realmente se gastó |
Indicadores: **SPI = EV / PV** (menor que 1: atrasado) y **CPI = EV / AC** (menor que 1: sobrecosto). La proyección más usada del costo final es **EAC = BAC / CPI**, donde BAC es el presupuesto total. Los estudios de David Christensen en proyectos de defensa encontraron que, una vez avanzado alrededor del 20% del proyecto, el CPI rara vez mejora de forma significativa: los problemas se detectan temprano o no se corrigen.

## Partes interesadas y responsabilidades
Una **matriz RACI** indica para cada actividad quién la **R**ealiza, quién **A**prueba (una sola persona), a quién se **C**onsulta y a quién se **I**nforma. Un **registro de interesados** clasifica a las personas por su poder e interés en el proyecto para decidir cuánto involucrarlas.

## Ejemplo resuelto: ¿cómo va el proyecto?
Presupuesto total (BAC) S/ 50 000. A la semana 6 se debía haber hecho trabajo por PV = S/ 20 000; se completó trabajo presupuestado en EV = S/ 16 000 y se gastó AC = S/ 20 000.
- SPI = 16 000 / 20 000 = 0.80: se avanzó el 80% de lo planificado.
- CPI = 16 000 / 20 000 = 0.80: cada sol gastado produjo 80 céntimos de trabajo.
- EAC = 50 000 / 0.80 = S/ 62 500: si nada cambia, el proyecto costará 25% más.
Con estos datos se puede conversar con el patrocinador sobre reducir alcance, aceptar el nuevo costo o cambiar la forma de trabajar, en lugar de enterarse al final.`,
  links: [['m12.est', 'las estimaciones alimentan el cronograma'], ['m12.risk', 'el riesgo y la incertidumbre se gestionan junto con el cronograma'], ['m4.graphs', 'la ruta crítica es el camino más largo en un grafo dirigido acíclico']],
  read: 'PMI, *Guía del PMBOK*, 7.ª ed.; Kelley y Walker (1959); Goldratt, *Critical Chain*; Fleming y Koppelman, *Earned Value Project Management*.',
  terms: [
    ['EDT', 'descomposición jerárquica de todo el trabajo del proyecto en entregables y paquetes de trabajo', ['Divides PatioApp en ingreso, cobros, reportes y despliegue.', 'Cumple la regla del 100%.', 'Sus paquetes se estiman y asignan.']],
    ['Ruta crítica', 'secuencia de tareas dependientes con holgura cero que determina la duración mínima del proyecto', ['Si se retrasa una de sus tareas, se retrasa todo.', 'Acelerar tareas fuera de ella no adelanta el fin.', 'Es el camino más largo del grafo de tareas.']],
    ['Holgura total', 'tiempo que una tarea puede retrasarse sin retrasar la fecha de fin del proyecto', ['La tarea B tiene 2 días de margen.', 'Se calcula como inicio tardío menos inicio temprano.', 'Las tareas críticas tienen holgura cero.']],
    ['Estimación PERT', 'estimación de tres puntos que calcula la duración esperada como (O + 4M + P) / 6', ['Con 2, 4 y 12 días se espera 5.', 'Refleja la cola pesimista larga.', 'Nació en el programa Polaris en 1958.']],
    ['Valor ganado', 'costo presupuestado del trabajo efectivamente completado a la fecha', ['Se completó trabajo presupuestado en S/ 16 000.', 'Se compara con lo planificado y con lo gastado.', 'Es la base del SPI y el CPI.']],
    ['CPI', 'índice de desempeño del costo, igual al valor ganado dividido entre el costo real', ['Un CPI de 0.8 indica sobrecosto.', 'Se usa para proyectar el costo final.', 'Rara vez mejora tras el primer 20% del proyecto.']],
    ['Matriz RACI', 'tabla que asigna para cada actividad quién la realiza, quién aprueba, a quién se consulta y a quién se informa', ['Defines que el líder técnico aprueba los cambios de arquitectura.', 'Evita que nadie se sienta responsable.', 'Solo una persona aprueba cada actividad.']],
    ['Ley de Parkinson', 'observación de que el trabajo se expande hasta ocupar todo el tiempo disponible', ['Una tarea con margen de tres días termina justo al tercer día.', 'Goldratt la usa para justificar los amortiguadores de proyecto.', 'Cyril Northcote Parkinson la formuló en 1955.']]
  ],
  q: [
    ['Una tarea tiene O = 1, M = 3 y P = 11 días. ¿Cuál es su duración esperada según PERT?', '4 días', ['3 días', '5 días', '6 días'], '(1 + 12 + 11)/6 = 4.', 2],
    ['Si aceleras una tarea que no está en la ruta crítica, ¿qué pasa con la fecha de fin?', 'No cambia', ['Se adelanta lo mismo', 'Se retrasa', 'Se adelanta a la mitad'], 'La duración la fija la ruta crítica.', 3],
    ['PV = 10 000, EV = 8000, AC = 10 000. ¿Cómo va el proyecto?', 'Atrasado y con sobrecosto', ['Adelantado y bajo presupuesto', 'A tiempo y en presupuesto', 'Adelantado con sobrecosto'], 'SPI = 0.8 y CPI = 0.8.', 3],
    ['BAC = 40 000 y CPI = 0.8. ¿Cuál es el costo final proyectado (EAC)?', 'S/ 50 000', ['S/ 32 000', 'S/ 40 000', 'S/ 48 000'], '40 000 / 0.8.', 3],
    ['En una matriz RACI, ¿cuántas personas deben aprobar (A) cada actividad?', 'Una sola', ['Todas', 'Al menos dos', 'Ninguna'], 'Una única persona responsable final evita ambigüedad.', 2],
    ['¿Qué propone Goldratt con la cadena crítica?', 'Quitar los márgenes de cada tarea y concentrarlos en un amortiguador del proyecto', ['Duplicar todas las estimaciones', 'Eliminar la planificación', 'Agregar personas a todas las tareas'], 'Los márgenes individuales se desperdician por la ley de Parkinson.', 4],
    { tf: 'Una tarea con holgura total cero está en la ruta crítica.', v: true, e: 'Cualquier retraso suyo retrasa el proyecto.', l: 2 },
    { tf: 'Un SPI de 1.2 indica que el proyecto está atrasado.', v: false, e: 'SPI mayor que 1 indica que se avanzó más de lo planificado.', l: 2 },
    { i: 'Tareas: A (3 días), B (5 días) y C (2 días) que depende de A y de B. ¿Cuántos días dura el proyecto?', a: 7, e: 'C empieza cuando terminan A y B (día 5) y termina el día 7.', l: 3 },
    { c: 'Escribe «duracionProyecto(tareas)» donde tareas es un objeto { id: [duracion, [predecesoras]] }. Devuelve la duración mínima del proyecto.', f: 'duracionProyecto', p: ['tareas'], t: [[[{ A: [3, []], B: [2, ['A']], C: [4, ['A']], D: [1, ['B', 'C']] }], 8], [[{ A: [2, []], B: [5, []], C: [1, ['A', 'B']] }], 6], [[{ X: [4, []] }], 4]], sol: '  const ft = {};\n  const fin = id => { if (ft[id] === undefined) ft[id] = tareas[id][0] + Math.max(0, ...tareas[id][1].map(fin)); return ft[id]; };\n  return Math.max(...Object.keys(tareas).map(fin));', h: 'El fin temprano de una tarea es su duración más el mayor fin temprano de sus predecesoras.', l: 4 },
    { c: 'Escribe «holgura(tareas, id)» con la holgura total de la tarea id (mismo formato de tareas).', f: 'holgura', p: ['tareas', 'id'], t: [[[{ A: [3, []], B: [2, ['A']], C: [4, ['A']], D: [1, ['B', 'C']] }, 'B'], 2], [[{ A: [3, []], B: [2, ['A']], C: [4, ['A']], D: [1, ['B', 'C']] }, 'C'], 0], [[{ A: [2, []], B: [5, []], C: [1, ['A', 'B']] }, 'A'], 3]], sol: '  const ids = Object.keys(tareas), ft = {}, fta = {};\n  const fin = x => { if (ft[x] === undefined) ft[x] = tareas[x][0] + Math.max(0, ...tareas[x][1].map(fin)); return ft[x]; };\n  const dur = Math.max(...ids.map(fin));\n  const suc = x => ids.filter(t => tareas[t][1].includes(x));\n  const tard = x => { if (fta[x] === undefined) fta[x] = Math.min(dur, ...suc(x).map(s => tard(s) - tareas[s][0])); return fta[x]; };\n  return tard(id) - fin(id);', l: 4 },
    { c: 'Escribe «indicesEVM(pv, ev, ac)» que devuelva [SPI, CPI] redondeados a 2 decimales.', f: 'indicesEVM', p: ['pv', 'ev', 'ac'], t: [[[1000, 800, 1000], [0.8, 0.8]], [[500, 600, 400], [1.2, 1.5]], [[100, 100, 125], [1, 0.8]]], sol: '  const r = x => Math.round(x * 100) / 100;\n  return [r(ev / pv), r(ev / ac)];', l: 2 },
    { c: 'Escribe «pert(o, m, p)» con la duración esperada redondeada a 2 decimales.', f: 'pert', p: ['o', 'm', 'p'], t: [[[2, 4, 12], 5], [[1, 2, 3], 2], [[3, 5, 10], 5.5]], sol: '  return Math.round((o + 4 * m + p) / 6 * 100) / 100;', l: 1 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var o = R.int(1, 4), m = o + R.int(1, 4), p = m + R.int(2, 12), e = (o + 4 * m + p) / 6; g.input(2, 'Una tarea tiene estimaciones O = ' + o + ', M = ' + m + ' y P = ' + p + ' días. ¿Cuál es su duración esperada según PERT? Redondea a 2 decimales.', e.toFixed(2), '(' + o + ' + 4·' + m + ' + ' + p + ')/6.'); });
    g.times(8, function (R) { var pv = R.int(10, 50) * 1000, ev = R.int(8, 55) * 1000, ac = R.int(8, 55) * 1000; g.input(3, 'PV = ' + pv + ', EV = ' + ev + ' y AC = ' + ac + '. ¿Cuál es el CPI? Redondea a 2 decimales.', (ev / ac).toFixed(2), 'CPI = EV/AC.'); g.input(3, 'Con PV = ' + pv + ' y EV = ' + ev + ', ¿cuál es el SPI? Redondea a 2 decimales.', (ev / pv).toFixed(2), 'SPI = EV/PV.'); });
    g.times(6, function (R) { var bac = R.int(20, 100) * 1000, cpi = R.pick([0.5, 0.8, 1.25, 1.6]); g.input(3, 'El presupuesto total es S/ ' + bac + ' y el CPI es ' + cpi + '. ¿Cuál es el costo final proyectado (EAC = BAC/CPI)?', Math.round(bac / cpi), bac + '/' + cpi + '.'); });
    g.times(6, function (R) { var a = R.int(1, 6), b = R.int(1, 6), c = R.int(1, 6); g.input(3, 'A dura ' + a + ' días y B dura ' + b + ' días; ambas pueden empezar al inicio. C dura ' + c + ' días y depende de A y de B. ¿Cuántos días dura el proyecto?', Math.max(a, b) + c, 'max(' + a + ', ' + b + ') + ' + c + '.'); });
  },
  checks: [
    ['¿Por qué la duración esperada PERT suele ser mayor que la estimación más probable?', 'Porque en software la estimación pesimista está mucho más lejos que la optimista, y la fórmula le da peso a esa cola.'],
    ['¿Qué es la ruta crítica y por qué importa?', 'La cadena de tareas con holgura cero; determina la duración del proyecto, así que es donde hay que vigilar y donde acelerar sirve.'],
    ['Con PV = 30 000, EV = 24 000 y AC = 20 000, ¿cómo va el proyecto?', 'SPI = 0.8 (atrasado) y CPI = 1.2 (bajo presupuesto): se gasta bien pero se avanza menos de lo planificado.'],
    ['Nombra tres formas de acortar un cronograma y un riesgo de cada una.', 'Compresión (más costo y ley de Brooks), ejecución rápida (retrabajo) y reducción de alcance (menos funcionalidad).'],
    ['¿Para qué sirve una matriz RACI?', 'Para dejar claro quién realiza, quién aprueba, a quién se consulta y a quién se informa en cada actividad, evitando huecos y duplicaciones.']
  ],
  cites: ['Project Management Institute (2021). *Guía de los fundamentos para la dirección de proyectos (Guía del PMBOK)*, 7.ª ed. PMI.', 'Kelley, J. y Walker, M. (1959). Critical-Path Planning and Scheduling. *Proceedings of the Eastern Joint Computer Conference*.', 'Goldratt, E. (1997). *Critical Chain*. North River Press.', 'Christensen, D. (1993). The Estimate at Completion Problem: A Review of Three Studies. *Project Management Journal*, 24(1).', 'Fleming, Q. y Koppelman, J. (2010). *Earned Value Project Management* (4.ª ed.). PMI.', 'Parkinson, C. N. (1955). Parkinson’s Law. *The Economist*.'],
  project: { t: 'Plan y control de un proyecto',
    goal: 'Planificar un proyecto con EDT, PERT y ruta crítica, y controlarlo con valor ganado.',
    steps: ['Construye la EDT de un proyecto de software de cuatro a seis semanas hasta paquetes de trabajo de uno a cinco días.', 'Estima cada paquete con tres puntos y calcula la duración esperada PERT.', 'Define las dependencias y programa una herramienta que calcule la ruta crítica y las holguras.', 'Asigna un presupuesto a cada paquete y registra semanalmente PV, EV y AC; calcula SPI, CPI y EAC.', 'Elabora la matriz RACI y un informe de estado para el patrocinador.'],
    deliver: 'La EDT, el cronograma con ruta crítica, la herramienta, los informes semanales de valor ganado y la matriz RACI.' },
  hito: ['Construye la EDT del siguiente incremento de PatioApp, estima con PERT y calcula su ruta crítica y las holguras de cada tarea.', 'Controla el incremento con valor ganado (PV, EV, AC, SPI, CPI y EAC) y presenta un informe de estado semanal.']
});
})();
