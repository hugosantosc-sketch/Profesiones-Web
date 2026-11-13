(function () {
var X = SDC.X, XM = SDC.XM;
XM('m17', {
  uni: 'Stanford CS181/CS182 (ética, computación y políticas públicas); programa Embedded EthiCS de Harvard; Berkeley CS169 (proyecto con clientes reales); cursos de proyecto final (*capstone*) de CMU y MIT. En Perú: Ética y Deontología Profesional, Taller de Proyectos y Proyecto de Tesis (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp v1.0 y tu portafolio profesional',
    goal: 'Cerrar la carrera con un producto real publicado, responsable y presentable, que demuestre todo lo aprendido.',
    steps: ['Publica PatioApp v1.0 en producción con su documentación, licencia y política de privacidad conforme a la Ley 29733.', 'Prueba el sistema con al menos tres usuarios reales y corrige lo que encuentres.', 'Prepara una demostración de 10 minutos y un caso de estudio escrito con problema, decisiones, arquitectura, métricas y aprendizajes.', 'Escribe la retrospectiva final: qué harías distinto y por qué.', 'Arma tu plan de aprendizaje de los próximos 12 meses.'],
    deliver: 'La aplicación publicada, el repositorio, el caso de estudio, la grabación de la demo y el plan de aprendizaje.' }
});

X('m17.ethics', {
  deep: `
## Códigos de ética de la profesión
La ACM y la IEEE Computer Society aprobaron en 1999 el **Código de Ética y Práctica Profesional de la Ingeniería de Software**, con ocho principios: actuar en interés del **público**; del cliente y el empleador, de forma coherente con el interés público; asegurar la calidad del **producto**; mantener la integridad del **juicio** profesional; promover una gestión ética; defender la **profesión**; ser justo con los **colegas**; y aprender durante toda la vida. La ACM actualizó en 2018 su código general, que empieza con un principio claro: contribuir a la sociedad y al bienestar humano, reconociendo que todas las personas son partes interesadas en la computación.

## Casos que todo ingeniero debería conocer
- **Boeing 737 MAX (2018-2019):** un sistema automático (MCAS) dependía de un solo sensor y no estaba bien documentado para los pilotos; dos accidentes causaron 346 muertes. Muestra cómo decisiones de diseño, documentación y presión comercial se combinan.
- **Volkswagen (2015):** el software de los motores detectaba cuándo el auto estaba en una prueba de emisiones y reducía la contaminación solo en ese momento. Un ingeniero de la empresa fue condenado a prisión en Estados Unidos. "Me lo ordenaron" no exime de responsabilidad.
- **Escándalo de Horizon en el Reino Unido:** errores del sistema contable Horizon, desarrollado por Fujitsu para la oficina de correos británica, se usaron como prueba para procesar a cientos de encargados de oficinas postales entre 1999 y 2015 por faltantes que no existían. Es una lección sobre la presunción de que "la computadora no se equivoca".
- **Therac-25** (que viste en errores y depuración): la confianza excesiva en el software y la falta de enclavamientos de hardware costaron vidas.

## Protección de datos personales en el Perú
La **Ley 29733**, Ley de Protección de Datos Personales (2011), y su reglamento, renovado en 2024 (Decreto Supremo 016-2024-JUS), regulan todo tratamiento de datos de personas en el país. Principios que se traducen en decisiones de diseño:
- **Consentimiento** informado, previo, expreso e inequívoco, salvo excepciones legales.
- **Finalidad:** los datos se usan solo para lo que se informó.
- **Proporcionalidad:** recolectar solo lo necesario (minimización).
- **Calidad y seguridad:** datos exactos y protegidos con medidas técnicas y organizativas.
- Derechos de las personas (acceso, rectificación, cancelación y oposición, conocidos como **ARCO**).
La autoridad es la Autoridad Nacional de Protección de Datos Personales, del Ministerio de Justicia. A nivel internacional, el Reglamento General de Protección de Datos de la Unión Europea (2016, aplicable desde 2018) es la referencia más influyente. También conviene conocer la **Ley 30096** de Delitos Informáticos (2013), que sanciona el acceso ilícito a sistemas: probar la seguridad de un sistema ajeno sin autorización es delito, aunque la intención sea buena.

## Propiedad intelectual del software
En el Perú, el software está protegido como obra por el **Decreto Legislativo 822**, Ley sobre el Derecho de Autor (1996). Que un código esté publicado en internet no significa que se pueda usar libremente: lo decide su **licencia**.
| Licencia | Permite | Exige |
| MIT, BSD | casi todo, incluso uso comercial cerrado | mantener el aviso de copyright |
| Apache 2.0 | lo mismo | aviso de cambios; incluye una concesión explícita de patentes |
| GPL (Stallman, 1989; v3 en 2007) | uso y modificación | si distribuyes, liberar tu código derivado bajo GPL (copyleft) |
| AGPL | lo mismo | también si ofreces el software como servicio por red |
Antes de agregar una dependencia, revisa su licencia; antes de publicar tu proyecto, elige una.

## Sesgo, accesibilidad y diseño engañoso
- Joy Buolamwini y Timnit Gebru mostraron en *Gender Shades* (2018) que sistemas comerciales de análisis facial fallaban mucho más con mujeres de piel oscura que con hombres de piel clara, porque los datos de entrenamiento no eran representativos.
- La accesibilidad no es un extra: excluir a personas con discapacidad es una decisión de diseño, y en muchos países una obligación legal.
- Harry Brignull acuñó en 2010 el término **patrones oscuros** para interfaces diseñadas para engañar (suscripciones imposibles de cancelar, casillas premarcadas). Son una forma de mala práctica profesional, aunque "funcionen" comercialmente.

## Cuando te piden algo indebido
El código de ética no exige heroísmo, pero sí no participar en daños conocidos. Ante una orden dudosa: pide la instrucción por escrito, documenta tus objeciones, escala dentro de la organización y, si el daño es grave y persiste, recurre a los canales externos legítimos. Aprender a decir "esto no lo puedo hacer así, propongo esta alternativa" es parte del oficio.`,
  checks: [
    ['¿Cuál es el primer principio del código de ética de ingeniería de software ACM/IEEE?', 'Actuar de forma coherente con el interés público; los intereses del cliente y del empleador se atienden siempre que no lo contradigan.'],
    ['¿Qué principio de la Ley 29733 aplicas al decidir no pedir la fecha de nacimiento si no la necesitas?', 'El de proporcionalidad o minimización: recolectar solo los datos necesarios para la finalidad informada.'],
    ['¿Qué lección deja el caso Horizon para un ingeniero de software?', 'Que el software se equivoca y que sus resultados no deben tomarse como prueba incuestionable; hay que reconocer, investigar y comunicar los errores, sobre todo cuando afectan a personas.'],
    ['¿Puedes usar en un producto comercial cerrado una biblioteca con licencia GPL?', 'Si distribuyes el producto, la GPL te obliga a liberar tu código derivado bajo GPL; para un producto cerrado conviene usar bibliotecas con licencias permisivas como MIT o Apache.'],
    ['¿Es legal probar la seguridad de la web de una empresa sin su permiso, aunque sea para ayudar?', 'No. En el Perú el acceso ilícito está sancionado por la Ley 30096; hay que tener autorización expresa o usar programas oficiales de reporte de vulnerabilidades.']
  ],
  cites: ['ACM e IEEE-CS (1999). *Software Engineering Code of Ethics and Professional Practice*.', 'ACM (2018). *ACM Code of Ethics and Professional Conduct*. acm.org/code-of-ethics.', 'Congreso de la República del Perú (2011). *Ley 29733, Ley de Protección de Datos Personales*.', 'Buolamwini, J. y Gebru, T. (2018). Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification. *Proceedings of Machine Learning Research*, 81.', 'Leveson, N. (2011). *Engineering a Safer World*. MIT Press.'],
  project: { t: 'Evaluación de impacto ético y legal de un proyecto',
    goal: 'Analizar un sistema propio desde la ética, la privacidad y las licencias, y convertir el análisis en decisiones concretas.',
    steps: ['Haz un inventario de los datos personales que maneja tu proyecto: qué, para qué, dónde se guardan, quién accede y por cuánto tiempo.', 'Evalúalo contra los principios de la Ley 29733 y propone cambios de minimización y seguridad.', 'Redacta la política de privacidad y el texto de consentimiento en lenguaje claro.', 'Revisa las licencias de todas tus dependencias con una herramienta automática y elige la licencia de tu proyecto.', 'Analiza un caso de los vistos (Boeing, Volkswagen, Horizon) y escribe qué habrías hecho tú en el lugar de un ingeniero del equipo.'],
    deliver: 'El inventario de datos, la política de privacidad, el informe de licencias y el análisis del caso.' },
  hito: ['Escribe la política de privacidad y el registro de tratamiento de datos de PatioApp según la Ley 29733: qué datos, para qué, por cuánto tiempo y quién accede.', 'Elige y agrega la licencia de PatioApp y revisa las licencias de todas sus dependencias.']
});

X('m17.ai', {
  deep: `
## Cómo funciona un modelo de lenguaje, en una página
Los modelos de lenguaje actuales se basan en la arquitectura **transformer**, presentada por Vaswani y otros en 2017 (*Attention Is All You Need*). Se entrenan con enormes cantidades de texto para **predecir el siguiente fragmento** (token), y luego se ajustan con instrucciones y retroalimentación humana para seguir órdenes. No consultan una base de datos de hechos ni ejecutan tu código: generan la continuación más probable según lo que aprendieron. De ahí sus fortalezas (escribir código común, explicar, traducir entre lenguajes) y sus debilidades (inventar con seguridad funciones o hechos que no existen, las llamadas **alucinaciones**). El módulo de inteligencia artificial explica a fondo el aprendizaje automático que hay detrás.

## Lo que dice la evidencia sobre productividad
- Un experimento controlado de Peng y otros (2023) encontró que programadores con GitHub Copilot terminaron una tarea acotada (escribir un servidor HTTP) un 55.8% más rápido.
- Un estudio de METR publicado en julio de 2025 con desarrolladores experimentados trabajando en sus propios proyectos de código abierto encontró lo contrario: con herramientas de IA tardaron en promedio un 19% **más**, aunque ellos creían haber ido más rápido.
La lectura razonable es que la ayuda depende mucho de la tarea, del contexto y de la experiencia, y que **la percepción de velocidad no es una medición**. Mide en tu propio trabajo.

## Riesgos de seguridad
Pearce y otros analizaron en 2022 (*Asleep at the Keyboard?*) código sugerido por un asistente en escenarios relacionados con vulnerabilidades conocidas y encontraron que cerca del 40% de los programas generados tenía fallas de seguridad. Otros riesgos:
- **Paquetes inventados:** el modelo sugiere instalar una dependencia que no existe; un atacante puede registrarla con código malicioso.
- **Filtración de datos:** pegar código propietario, claves o datos personales en un servicio externo puede violar contratos y la ley de datos personales. En 2023, una gran empresa tecnológica restringió estas herramientas después de que empleados pegaran código confidencial.
- **Inyección de prompts:** término acuñado por Simon Willison en 2022. Si tu aplicación pasa a un modelo texto que no controlas (un correo, una página web, una observación escrita por un usuario), ese texto puede contener instrucciones que el modelo obedezca. OWASP publica desde 2023 un Top 10 específico para aplicaciones con modelos de lenguaje, encabezado por este riesgo.

## Un flujo de trabajo profesional
1. **Especifica primero:** escribe qué debe hacer la función, sus casos borde y sus pruebas antes de pedir código.
2. **Pide en pasos pequeños** y con el contexto necesario (tipos, ejemplos de datos, convenciones del proyecto).
3. **Lee cada línea** como si la hubiera escrito un compañero nuevo: tú eres responsable del código que fusionas.
4. **Ejecuta las pruebas** y agrega las que falten; desconfía de lo que "parece correcto".
5. **Verifica las dependencias** y las APIs sugeridas en la documentación oficial.
6. Usa la herramienta también para **aprender**: pide que explique, que proponga alternativas, que critique tu código. Pero practica sin ella lo fundamental; la comprensión que no construyes tú no aparece en una emergencia.

## Construir sistemas que usan modelos
- **RAG** (generación aumentada con recuperación), propuesta por Lewis y otros en 2020: antes de responder, el sistema busca documentos relevantes y se los da al modelo como contexto. Reduce alucinaciones y permite usar información privada y actualizada.
- **Agentes:** el modelo decide qué herramientas llamar (buscar, ejecutar código, consultar una API) en varios pasos. Más capacidad, más riesgo: aplica mínimo privilegio a cada herramienta y confirmación humana para acciones irreversibles.
- **Evaluación:** sin un conjunto de casos de prueba con respuestas esperadas, no sabes si un cambio de prompt o de modelo mejoró o empeoró el sistema. Trata los prompts como código: versionados, probados y revisados.
~~~js
// Esqueleto de una evaluación: casos, respuesta del sistema y verificación automática
const casos = [
  { entrada: 'rayón leve en puerta', esperado: 'leve' },
  { entrada: 'parabrisas roto', esperado: 'grave' }
];
const clasificar = t => /roto|choque|motor/.test(t) ? 'grave' : 'leve';   // aquí iría la llamada al modelo
const aciertos = casos.filter(c => clasificar(c.entrada) === c.esperado).length;
console.log('exactitud', aciertos + '/' + casos.length);
~~~

## Tu valor como ingeniero
Lo que más valor conserva es justamente lo que este curso entrena: entender el problema y los requisitos, diseñar y razonar sobre compromisos, verificar con pruebas, depurar con método, cuidar la seguridad y la ética, y comunicar. Las herramientas cambian cada año; esos fundamentos, no.`,
  checks: [
    ['¿Por qué un modelo de lenguaje puede inventar una función que no existe?', 'Porque genera la continuación más probable según los patrones aprendidos, no consulta la documentación real; si algo "suena" plausible, puede producirlo aunque no exista.'],
    ['¿Qué enseñan juntos los estudios de Peng (2023) y de METR (2025)?', 'Que el efecto de la IA en la productividad depende de la tarea, el contexto y la experiencia, y que la sensación de ir más rápido no reemplaza a medir.'],
    ['¿Qué es la inyección de prompts y por qué es difícil de evitar?', 'Que un texto no confiable incluido en la entrada contenga instrucciones que el modelo obedezca. Es difícil porque el modelo no separa de forma confiable instrucciones y datos.'],
    ['¿Qué harías antes de instalar una biblioteca que te sugirió un asistente?', 'Verificar que existe en el registro oficial, que es la correcta (sin nombres parecidos), su mantenimiento, su licencia y sus vulnerabilidades.'],
    ['¿Por qué un sistema con un modelo de lenguaje necesita un conjunto de evaluación?', 'Porque sin casos con respuestas esperadas no se puede saber si un cambio de prompt o de modelo mejora o empeora los resultados; es el equivalente a las pruebas automatizadas.']
  ],
  cites: ['Vaswani, A. et al. (2017). Attention Is All You Need. *NeurIPS 2017*.', 'Peng, S., Kalliamvakou, E., Cihon, P. y Demirer, M. (2023). The Impact of AI on Developer Productivity: Evidence from GitHub Copilot. arXiv:2302.06590.', 'METR (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. metr.org.', 'Pearce, H. et al. (2022). Asleep at the Keyboard? Assessing the Security of GitHub Copilot\'s Code Contributions. *IEEE Symposium on Security and Privacy*.', 'Lewis, P. et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS 2020*.', 'OWASP (2025). *OWASP Top 10 for Large Language Model Applications*. genai.owasp.org.'],
  project: { t: 'Desarrollo asistido por IA, medido y revisado',
    goal: 'Usar un asistente de IA de forma profesional y medir honestamente su efecto en calidad y tiempo.',
    steps: ['Elige dos tareas de tamaño parecido; haz una sin asistente y otra con asistente, registrando el tiempo.', 'En la tarea con asistente, guarda los prompts, las respuestas, los errores que encontraste al revisar y las pruebas que tuviste que agregar.', 'Pasa ambas soluciones por análisis estático, pruebas de mutación y revisión de seguridad, y compara.', 'Construye una pequeña función con un modelo de lenguaje (por ejemplo, clasificar observaciones) con un conjunto de evaluación de 20 casos.', 'Intenta romperla con inyección de prompts y documenta las mitigaciones.'],
    deliver: 'El registro de las dos tareas con mediciones, el conjunto de evaluación y el informe de inyección de prompts.' },
  hito: ['Usa un asistente de IA para una funcionalidad de PatioApp y documenta los prompts, la revisión hecha, los defectos encontrados y las pruebas agregadas.', 'Si agregas una función con IA (por ejemplo, resumir observaciones), crea un conjunto de evaluación y una prueba contra inyección de prompts.']
});

X('m17.capstone', {
  deep: `
## Cómo trabajan los proyectos finales de las mejores universidades
En Berkeley, el curso CS169 hace que equipos de estudiantes construyan software para **clientes reales** (organizaciones sin fines de lucro), con iteraciones cortas, historias de usuario, BDD y despliegue continuo, como describen Armando Fox y David Patterson en *Engineering Software as a Service*. CMU y MIT organizan cursos de proyecto en equipo con revisiones de diseño, demostraciones periódicas y retrospectivas. El objetivo común no es solo "que funcione", sino demostrar **proceso, decisiones justificadas y aprendizaje**.

## Empieza por un esqueleto que camina
Alistair Cockburn llama **esqueleto andante** (*walking skeleton*) a la primera versión mínima que atraviesa todo el sistema de punta a punta: una pantalla, una llamada a la API, una escritura en la base de datos y un despliegue automático, aunque haga muy poco. Hunt y Thomas lo llaman **balas trazadoras** en *The Pragmatic Programmer*: disparas una bala que deja rastro para ver si apuntas bien, y corriges. Con el esqueleto funcionando, cada funcionalidad nueva se agrega a un sistema que ya se integra, se prueba y se despliega, en lugar de "integrar todo al final".

## Documentar antes de programar
Tom Preston-Werner propuso en 2010 el **desarrollo guiado por el README**: escribir primero el README como si el proyecto ya existiera (qué hace, cómo se instala, cómo se usa). Obliga a pensar desde el usuario y sirve como especificación ligera. Un README de proyecto final debería tener: qué problema resuelve y para quién, una captura o demo, cómo ejecutarlo en local con un solo comando, la arquitectura en un diagrama, cómo correr las pruebas, las decisiones principales (enlazando los ADR) y el estado actual con limitaciones conocidas.

## Lista de verificación de lanzamiento
| Área | Comprobación |
| Funcionalidad | las historias del MVP cumplen sus criterios de aceptación |
| Calidad | pruebas en verde, cobertura y mutación por encima de la meta, sin advertencias críticas |
| Seguridad | modelo de amenazas revisado, dependencias sin vulnerabilidades críticas, secretos fuera del código |
| Datos | migraciones probadas, respaldo automático y restauración ensayada |
| Operación | registros, métricas, alertas y SLO definidos; procedimiento de reversión probado |
| Usuarios | prueba con usuarios reales, accesibilidad revisada, política de privacidad publicada |
| Documentación | README, CHANGELOG, ADR y guía de uso |

## Probar con usuarios reales
Jakob Nielsen mostró que con unas cinco personas se descubre la mayoría de los problemas de usabilidad de un diseño (lo verás en el módulo de interacción humano-computador). Para un proyecto final basta con pedir a tres o cinco personas del perfil real que completen tareas concretas mientras piensan en voz alta, sin ayudarlas, y anotar dónde dudan o se equivocan.

## La demostración
Una buena demo de 10 minutos sigue una historia: el problema (con un caso concreto), la solución en vivo recorriendo el flujo principal, una decisión técnica interesante y su porqué, los resultados medidos (rendimiento, cobertura, pruebas con usuarios) y lo que harías después. Ensáyala y ten un video de respaldo por si falla la conexión.

## La retrospectiva final
Responde por escrito: ¿qué salió bien y por qué?, ¿qué salió mal y qué lo causó?, ¿qué decisiones cambiarías sabiendo lo que sabes ahora?, ¿qué estimaste mal y por cuánto?, y ¿qué aprendiste que no sabías al empezar? Esa reflexión es la evidencia más valiosa de que eres un ingeniero, y la base de tu respuesta cuando en una entrevista te pregunten por tu proyecto.

~~~js
// Un pequeño semáforo de lanzamiento a partir de métricas del proyecto
const metricas = { pruebasEnVerde: true, cobertura: 84, mutacion: 78, vulnerabilidadesCriticas: 0, p95ms: 240 };
const reglas = [
  ['pruebas en verde', m => m.pruebasEnVerde],
  ['cobertura >= 80%', m => m.cobertura >= 80],
  ['mutación >= 75%', m => m.mutacion >= 75],
  ['sin vulnerabilidades críticas', m => m.vulnerabilidadesCriticas === 0],
  ['p95 < 300 ms', m => m.p95ms < 300]
];
const fallas = reglas.filter(([, ok]) => !ok(metricas)).map(([n]) => n);
console.log(fallas.length ? 'NO publicar: ' + fallas.join(', ') : 'Listo para publicar v1.0');
~~~`,
  checks: [
    ['¿Qué es un esqueleto andante y por qué conviene construirlo primero?', 'Una versión mínima que atraviesa todo el sistema de punta a punta, incluido el despliegue. Permite integrar, probar y desplegar desde el inicio y descubrir pronto los problemas de arquitectura.'],
    ['¿Qué propone el desarrollo guiado por el README?', 'Escribir primero el README como si el proyecto existiera, para pensar desde el usuario y tener una especificación ligera antes de programar.'],
    ['¿Por qué ensayar la restauración de un respaldo y no solo hacer respaldos?', 'Porque un respaldo que nunca se restauró puede estar incompleto o corrupto; solo la restauración probada demuestra que se pueden recuperar los datos.'],
    ['¿Qué partes tiene una buena demostración de 10 minutos?', 'El problema con un caso concreto, la solución en vivo, una decisión técnica con su porqué, resultados medidos y próximos pasos.'],
    ['¿Para qué sirve la retrospectiva final más allá del curso?', 'Para consolidar lo aprendido y tener una reflexión concreta y honesta sobre decisiones y errores, que es justamente lo que se evalúa en entrevistas.']
  ],
  cites: ['Fox, A. y Patterson, D. (2021). *Engineering Software as a Service: An Agile Approach Using Cloud Computing* (2.ª ed.). Strawberry Canyon.', 'Hunt, A. y Thomas, D. (2019). *The Pragmatic Programmer* (edición del 20.º aniversario). Addison-Wesley.', 'Cockburn, A. (2004). *Crystal Clear: A Human-Powered Methodology for Small Teams*. Addison-Wesley.', 'Preston-Werner, T. (2010). Readme Driven Development. tom.preston-werner.com.'],
  project: { t: 'Día de demostración',
    goal: 'Presentar el proyecto final como lo harías ante un cliente o un comité de selección.',
    steps: ['Completa la lista de verificación de lanzamiento y corrige lo pendiente.', 'Realiza una prueba con al menos tres usuarios reales y aplica las mejoras más importantes.', 'Prepara la demostración de 10 minutos con su historia y graba un video de respaldo.', 'Presenta ante al menos dos personas y recoge sus preguntas.', 'Escribe la retrospectiva final del proyecto.'],
    deliver: 'La lista de verificación completa, las notas de la prueba con usuarios, el video de la demo y la retrospectiva.' },
  hito: ['Publica PatioApp v1.0: despliegue en producción, README completo, CHANGELOG y etiqueta de versión, tras completar la lista de verificación de lanzamiento.', 'Prueba PatioApp con al menos tres usuarios reales, presenta una demostración de 10 minutos y escribe la retrospectiva final.']
});

X('m17.career', {
  deep: `
## Aprender a aprender, con evidencia
La ciencia del aprendizaje tiene resultados sólidos y aplicables:
- **Curva del olvido:** Hermann Ebbinghaus mostró en 1885 que olvidamos rápido lo que no repasamos.
- **Práctica de recuperación:** Henry Roediger y Jeffrey Karpicke mostraron en 2006 que intentar recordar (hacer ejercicios, explicar sin mirar) fija mucho más que releer. Por eso este curso tiene preguntas de comprensión y miles de ejercicios.
- **Repaso espaciado:** repartir el estudio en el tiempo supera a concentrarlo en una sola sesión (síntesis de Cepeda y otros, 2006). La sección de repaso de esta aplicación aplica intervalos crecientes.
- **Práctica intercalada:** mezclar tipos de problemas (Rohrer y Taylor, 2007) cuesta más pero enseña a elegir la técnica correcta.
- **Dificultades deseables:** Robert Bjork mostró que lo que hace sentir que el estudio es más difícil suele producir un aprendizaje más duradero.
Brown, Roediger y McDaniel resumen todo esto en *Make It Stick* (2014). La trampa más común es la **ilusión de competencia**: releer un tema y sentir que se entiende, sin poder resolver un problema nuevo.

## Práctica deliberada y paciencia
Anders Ericsson y sus colegas estudiaron en 1993 cómo se alcanza la excelencia: no basta con repetir, hace falta **práctica deliberada**, enfocada en lo que aún no dominas, con retroalimentación inmediata. Peter Norvig escribió *Teach Yourself Programming in Ten Years* (2001) como respuesta a los libros de "aprende a programar en 21 días": dominar el oficio lleva años de práctica, proyectos, lectura de código ajeno y trabajo con otras personas.

## Roles y caminos
| Camino | Qué hace | Habilidades clave |
| Desarrollo (frontend, backend, móvil) | construye funcionalidades | programación, diseño, pruebas |
| Plataforma, DevOps, SRE | mantiene la infraestructura y la fiabilidad | sistemas, redes, automatización, observabilidad |
| Datos e IA | pipelines, modelos y analítica | estadística, SQL, aprendizaje automático |
| Seguridad | protege sistemas y responde a incidentes | redes, sistemas, criptografía, mentalidad de atacante |
| Calidad | estrategia de pruebas y automatización | técnicas de prueba, programación, criterio de riesgo |
| Producto y diseño | decide qué construir | usuarios, negocio, comunicación |
Al crecer, la carrera se bifurca: la vía **técnica** (ingeniero sénior, *staff*, principal), descrita por Will Larson en *Staff Engineer* (2021), y la de **gestión** (líder técnico, gerente de ingeniería), descrita por Camille Fournier en *The Manager's Path* (2017). Ambas exigen cada vez más comunicación, criterio y capacidad de influir sin imponer.

## Entrevistas técnicas
Suelen combinar:
- **Problemas de algoritmos:** razona en voz alta, aclara el problema y los casos borde, propone primero una solución simple, analiza su complejidad y mejórala. *Cracking the Coding Interview* de Gayle Laakmann McDowell es la referencia clásica.
- **Diseño de sistemas** (para niveles medios y altos): requisitos, estimaciones, componentes, datos, escalabilidad y compromisos; todo lo que viste en arquitectura.
- **Preguntas de comportamiento:** responde con el método **STAR** (situación, tarea, acción y resultado) usando ejemplos reales; tu proyecto final es tu mejor fuente.
- **Ejercicios prácticos o revisión de código**, cada vez más comunes.

## El síndrome del impostor
Pauline Clance y Suzanne Imes describieron en 1978 el **fenómeno del impostor**: personas competentes que sienten que no lo son y temen ser "descubiertas". Es muy frecuente en el software, donde siempre hay algo que no sabes. Ayuda llevar un registro de logros, comparar tu progreso con tu versión anterior y no con expertos con años de ventaja, y recordar que preguntar es parte del trabajo de cualquier ingeniero.

~~~js
// Planificador de repaso espaciado: próximos repasos de un tema
const intervalos = [1, 3, 7, 16, 35];   // días, los mismos que usa la sección de repaso
const hoy = new Date('2026-11-12');
console.log(intervalos.map(d => new Date(hoy.getTime() + d * 864e5).toISOString().slice(0, 10)).join(' · '));
~~~

## Comunidad y código abierto
Contribuir a proyectos de código abierto (empezando por documentación, pruebas o problemas marcados para principiantes) enseña a leer código ajeno, a seguir convenciones y a recibir revisiones de desconocidos. Participar en comunidades locales y eventos, escribir lo que aprendes y enseñar a otros (la **técnica Feynman**: explicar algo en palabras simples para descubrir lo que no entiendes) aceleran el aprendizaje más que cualquier curso.`,
  checks: [
    ['¿Por qué releer apuntes es una mala técnica de estudio según la evidencia?', 'Porque produce ilusión de competencia: el contenido parece familiar, pero no se practica recuperarlo; la práctica de recuperación fija mucho más.'],
    ['¿En qué se diferencia la práctica deliberada de simplemente programar mucho?', 'En que se enfoca en lo que aún no dominas, con objetivos concretos y retroalimentación inmediata, en lugar de repetir lo que ya sabes hacer.'],
    ['Describe el método STAR con un ejemplo breve de tu proyecto.', 'Situación: dos revisores asignaban la misma unidad. Tarea: evitarlo. Acción: implementé una reserva atómica con bloqueo optimista y una prueba con 100 asignaciones concurrentes. Resultado: cero duplicados en producción.'],
    ['¿Qué dos caminos de carrera describen Larson y Fournier?', 'La vía técnica (ingeniero sénior, staff, principal) y la de gestión (líder técnico, gerente de ingeniería).'],
    ['¿Cómo te ayuda la técnica Feynman?', 'Al explicar un tema en palabras simples, como a alguien que no lo conoce, descubres exactamente qué partes no entiendes y debes repasar.']
  ],
  cites: ['Brown, P., Roediger, H. y McDaniel, M. (2014). *Make It Stick: The Science of Successful Learning*. Harvard University Press.', 'Roediger, H. y Karpicke, J. (2006). Test-Enhanced Learning. *Psychological Science*, 17(3).', 'Ericsson, K. A., Krampe, R. y Tesch-Römer, C. (1993). The Role of Deliberate Practice in the Acquisition of Expert Performance. *Psychological Review*, 100(3).', 'Norvig, P. (2001). Teach Yourself Programming in Ten Years. norvig.com.', 'Larson, W. (2021). *Staff Engineer: Leadership Beyond the Management Track*. Independiente.', 'McDowell, G. L. (2015). *Cracking the Coding Interview* (6.ª ed.). CareerCup.'],
  project: { t: 'Portafolio y plan de crecimiento',
    goal: 'Preparar tu presentación profesional y un plan concreto para seguir aprendiendo después del curso.',
    steps: ['Escribe el caso de estudio de PatioApp: problema, usuarios, decisiones, arquitectura, métricas, dificultades y aprendizajes.', 'Prepara cinco historias STAR a partir de tus proyectos.', 'Resuelve 20 problemas de algoritmos en sesiones cronometradas y uno de diseño de sistemas explicando en voz alta.', 'Haz tu primera contribución a un proyecto de código abierto (documentación, prueba o corrección).', 'Escribe tu plan de 12 meses con objetivos trimestrales, recursos y repasos espaciados.'],
    deliver: 'El caso de estudio publicado, las historias STAR, el registro de práctica, el enlace a tu contribución y el plan.' },
  hito: ['Convierte PatioApp en la pieza central de tu portafolio con un caso de estudio: problema, decisiones, arquitectura, métricas y aprendizajes.', 'Escribe tu plan de aprendizaje de 12 meses con repaso espaciado y haz una primera contribución a un proyecto de código abierto.']
});
})();
