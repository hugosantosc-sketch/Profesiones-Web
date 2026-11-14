/* Sumillas y logros actualizados de los cursos profundizados (se carga después de carrera.js). */
(function () {
  var X = SDC.XM;
  X('m6', {
    desc: 'Curso sobre cómo se escribe software que otras personas pueden leer, cambiar y mantener. Estudia el código limpio, el diseño de módulos e interfaces según la ocultación de información, el diseño con tipos para hacer irrepresentables los estados ilegales, la refactorización segura y a gran escala, el manejo de errores y la depuración con método, la programación funcional aplicada y la optimización del rendimiento guiada por mediciones.',
    logros: ['Escribe código limpio, legible y fácil de cambiar siguiendo estándares del equipo.', 'Divide un sistema en módulos cohesivos y poco acoplados con interfaces bien diseñadas y versionadas.', 'Modela el dominio con tipos para prevenir errores, y maneja los errores de forma explícita.', 'Refactoriza con pruebas y optimiza el rendimiento midiendo antes y después.']
  });
  X('m11', {
    desc: 'Curso completo de ingeniería de requisitos: cómo descubrir qué hay que construir, dejarlo claro y gestionarlo cuando cambia. Recorre la elicitación con entrevistas, observación, talleres y prototipos; la negociación y priorización; los requisitos no funcionales medibles y el modelo de calidad ISO/IEC 25010; las historias de usuario y los casos de uso; el modelado con UML y BPMN; y la especificación, validación, trazabilidad y gestión de cambios según ISO/IEC/IEEE 29148, incluidas las restricciones legales peruanas.',
    logros: ['Elicita y negocia requisitos con varios interesados combinando técnicas.', 'Especifica requisitos funcionales y de calidad verificables, con historias, casos de uso y escenarios.', 'Modela procesos y dominios con BPMN y UML.', 'Valida, traza y gestiona los cambios de los requisitos durante todo el proyecto.']
  });
  X('m12', {
    desc: 'Curso sobre cómo se organiza el trabajo de construir software. Compara los modelos de ciclo de vida, profundiza en Scrum, Kanban y XP, la agilidad a escala y el diseño de equipos según la ley de Conway y Team Topologies, la gestión de producto con descubrimiento continuo y experimentos, la estimación y la planificación, la gestión de riesgos y la mejora de procesos con CMMI, ISO/IEC 29110 y métricas basadas en objetivos.',
    logros: ['Elige y adapta un ciclo de vida y un marco de trabajo según el contexto.', 'Organiza equipos y coordina el trabajo de varios equipos sobre un producto.', 'Prioriza por resultados, valida hipótesis de producto y estima con incertidumbre.', 'Gestiona riesgos y mejora el proceso con datos.']
  });
  X('m13', {
    desc: 'Curso sobre las decisiones de diseño que después son caras de cambiar. Estudia los estilos de arquitectura, los atributos de calidad y sus tácticas, la documentación con vistas, C4, arc42 y registros de decisiones, el diseño guiado por el dominio, los microservicios y su migración desde un monolito, las arquitecturas dirigidas por eventos con CQRS y event sourcing, la escalabilidad y los fundamentos de los sistemas distribuidos.',
    logros: ['Elige estilos y tácticas de arquitectura según atributos de calidad y los justifica en ADR.', 'Documenta una arquitectura con vistas útiles para cada interesado.', 'Divide un sistema con contextos delimitados y decide cuándo usar microservicios y eventos.', 'Diseña para escalar y razona sobre los compromisos de los sistemas distribuidos.']
  });
  X('m14', {
    desc: 'Curso completo de pruebas y calidad del software. Cubre los niveles y tipos de prueba, las pruebas unitarias y el TDD, la integración con dependencias reales y los contratos entre servicios, las pruebas de sistema, aceptación y exploratorias, las técnicas de diseño de casos, las pruebas de rendimiento y resiliencia, las revisiones, inspecciones y el análisis estático, las métricas de calidad y la gestión de pruebas basada en riesgo con su ciclo de defectos.',
    logros: ['Diseña una estrategia de pruebas equilibrada para un sistema.', 'Automatiza pruebas unitarias, de integración, de contrato y extremo a extremo mantenibles.', 'Planifica y ejecuta pruebas de rendimiento y verificaciones estáticas.', 'Gestiona las pruebas y los defectos con criterios de riesgo y métricas significativas.']
  });
  X('m15', {
    desc: 'Curso sobre cómo llevar el software a producción y operarlo de forma confiable. Parte de la cultura DevOps y la evidencia de DORA, y recorre la integración y entrega continuas, los contenedores, la orquestación con Kubernetes y GitOps, la nube, la infraestructura como código y la recuperación ante desastres, la observabilidad con SLO y presupuestos de error, y la gestión de incidentes con guardias y postmortems sin culpas.',
    logros: ['Construye pipelines que despliegan de forma frecuente, segura y reversible.', 'Despliega y escala aplicaciones en contenedores, en la nube y en Kubernetes.', 'Define SLO, alertas y planes de recuperación ante desastres.', 'Responde a incidentes con roles claros y aprende de ellos sin culpas.']
  });
  X('m16', {
    desc: 'Curso sobre cómo diseñar, construir y operar software seguro. Estudia las fallas más comunes según OWASP, el modelado de amenazas con STRIDE y árboles de ataque, la seguridad web a fondo, la autenticación y la autorización, la criptografía práctica, la seguridad de la cadena de suministro, el ciclo de desarrollo seguro con pruebas y gestión de vulnerabilidades, y la privacidad y protección de datos personales según la Ley 29733.',
    logros: ['Modela las amenazas de un sistema y convierte las mitigaciones en requisitos y pruebas.', 'Previene las vulnerabilidades web y de autenticación más comunes.', 'Asegura la cadena de suministro y gestiona vulnerabilidades con prioridades fundadas.', 'Diseña sistemas que respetan la privacidad y cumplen la ley de protección de datos.']
  });
  X('m2', {
    desc: 'Curso de matemática discreta para la computación. Estudia la lógica proposicional y la de predicados con sus técnicas de demostración e inducción estructural, los conjuntos, relaciones, funciones y órdenes, la teoría de grafos (caminos, árboles, coloración y planaridad), las estructuras algebraicas con sus aplicaciones a la criptografía y los códigos, y la combinatoria y la probabilidad discreta aplicadas a decisiones de software.',
    logros: ['Formaliza reglas en lógica de predicados y escribe demostraciones correctas.', 'Usa conjuntos, relaciones y grafos para modelar problemas de software.', 'Reconoce estructuras algebraicas y las aplica a agregaciones, criptografía y detección de errores.', 'Calcula probabilidades y valores esperados para dimensionar identificadores, claves y sistemas.']
  });
  X('mat2', {
    desc: 'Curso de matemática avanzada para la ingeniería de software. Cubre la inducción, las sumas y las recurrencias del análisis de algoritmos, la teoría de números y la aritmética modular, el cálculo y el álgebra lineal aplicados, la probabilidad avanzada con cadenas de Markov y teoría de colas, los métodos numéricos y la aritmética de punto flotante, la optimización lineal, entera y por gradiente, la estadística e inferencia, y la teoría de la información con compresión y códigos correctores.',
    logros: ['Analiza algoritmos con recurrencias, sumas y el teorema maestro.', 'Aplica teoría de números, álgebra lineal y cálculo a problemas de computación.', 'Modela capacidad e incertidumbre con probabilidad, colas y estadística.', 'Calcula con precisión numérica, optimiza decisiones y razona sobre información y compresión.']
  });
  X('teo', {
    desc: 'Curso sobre los límites y la estructura de la computación. Recorre los autómatas finitos y las expresiones regulares, las gramáticas y los lenguajes libres de contexto con sus algoritmos y límites, las máquinas de Turing y la tesis de Church-Turing, la indecidibilidad con reducciones, el teorema de Rice y la incompletitud, y la complejidad computacional: P, NP, NP-completitud, espacio, aleatoriedad, aproximación y cómputo cuántico.',
    logros: ['Diseña autómatas y gramáticas y decide a qué clase pertenece un lenguaje.', 'Demuestra que un problema es indecidible mediante reducciones.', 'Clasifica problemas en clases de complejidad y elige enfoques adecuados para los difíciles.', 'Explica las consecuencias de estos límites para las herramientas de software.']
  });
  X('for', {
    desc: 'Curso sobre cómo especificar y verificar software con matemática. Estudia las máquinas de estados y los statecharts, los contratos y la lógica de Hoare, la especificación basada en modelos y el refinamiento, la lógica temporal y los resolvedores SAT y SMT, la verificación de modelos con TLA+ y Alloy, y la verificación deductiva con Dafny y asistentes de prueba, con casos industriales y criterios para decidir cuándo vale la pena.',
    logros: ['Modela sistemas con máquinas de estados y especificaciones con invariantes.', 'Escribe contratos y razona sobre la corrección de programas con invariantes y variantes.', 'Expresa propiedades de seguridad y vivacidad en lógica temporal y las verifica con herramientas.', 'Verifica formalmente componentes críticos y evalúa el costo y el beneficio de hacerlo.']
  });

  X('m1', {
    desc: 'Curso introductorio sobre cómo funciona una computadora por dentro. Estudia los sistemas de numeración y la representación de datos (enteros, reales, texto, imágenes), la aritmética binaria y sus límites, el álgebra de Boole y los circuitos lógicos, los circuitos secuenciales y la memoria, la CPU y el ciclo de instrucción, y la pila y las llamadas a funciones, hasta entender cómo un programa se convierte en señales eléctricas.',
    logros: ['Representa y convierte datos entre binario, hexadecimal y decimal, y explica los límites de cada representación.', 'Diseña circuitos combinacionales y secuenciales simples a partir de tablas de verdad.', 'Describe el ciclo de instrucción y sigue la ejecución de un programa en lenguaje máquina.', 'Explica cómo la pila implementa las llamadas a funciones y la recursión.']
  });
  X('arq', {
    desc: 'Curso de arquitectura de computadoras. Estudia los conjuntos de instrucciones (ISA) y el diseño digital, la segmentación y el paralelismo a nivel de instrucción, la jerarquía de memoria y las cachés, los multinúcleos y la coherencia, la entrada y salida, y la evaluación del rendimiento, con énfasis en cómo estas decisiones de hardware afectan la velocidad del software.',
    logros: ['Compara arquitecturas de conjuntos de instrucciones y traduce código de alto nivel a ensamblador.', 'Analiza el efecto de la segmentación, los riesgos y la predicción de saltos en el rendimiento.', 'Calcula el impacto de la jerarquía de memoria y escribe código que aprovecha la caché.', 'Evalúa el rendimiento con métricas y leyes como la de Amdahl.']
  });
  X('m3', {
    desc: 'Curso de fundamentos de programación con JavaScript. Estudia variables y tipos, condicionales, bucles, funciones, arreglos y objetos, entrada y salida, módulos, recursión y depuración, con práctica constante y un enfoque en escribir programas correctos, legibles y probados desde el primer día.',
    logros: ['Resuelve problemas descomponiéndolos en funciones con entradas y salidas claras.', 'Usa estructuras de control y colecciones para procesar datos.', 'Organiza programas en módulos y maneja la entrada y salida de archivos y usuarios.', 'Depura sistemáticamente y escribe pruebas para su propio código.']
  });
  X('m4', {
    desc: 'Curso de estructuras de datos y algoritmos. Estudia el análisis de complejidad y el análisis amortizado, la búsqueda y el ordenamiento, pilas, colas y listas, tablas hash, montículos, árboles y árboles balanceados, grafos, caminos mínimos y árboles de expansión, programación dinámica y algoritmos sobre cadenas, con implementación y medición de cada uno.',
    logros: ['Analiza el costo en tiempo y memoria de algoritmos y estructuras de datos.', 'Elige e implementa la estructura de datos adecuada para cada tipo de operación.', 'Aplica algoritmos de grafos, programación dinámica y cadenas a problemas reales.', 'Mide experimentalmente el rendimiento y lo contrasta con el análisis teórico.']
  });
  X('m5', {
    desc: 'Curso de diseño orientado a objetos. Estudia el encapsulamiento y los invariantes, la herencia, la composición y el polimorfismo, la asignación de responsabilidades con GRASP y tarjetas CRC, los modelos de objetos (clases y prototipos), los principios SOLID, la inyección de dependencias y los patrones de diseño creacionales, estructurales y de comportamiento.',
    logros: ['Diseña clases cohesivas que protegen sus invariantes y asigna responsabilidades con criterios explícitos.', 'Elige entre herencia y composición y explica el modelo de objetos de su lenguaje.', 'Aplica SOLID e inyección de dependencias para obtener código desacoplado y comprobable.', 'Reconoce y aplica patrones de diseño, y evita los antipatrones más comunes.']
  });
  X('m7', {
    desc: 'Curso de herramientas del oficio. Estudia la terminal y la filosofía Unix, los editores, IDE y depuradores, el control de versiones con Git, el trabajo en equipo con ramas y revisiones, la construcción de proyectos y la gestión de dependencias, y la automatización con expresiones regulares, scripts, Make y tareas programadas.',
    logros: ['Trabaja con fluidez en la terminal y automatiza tareas repetitivas con scripts.', 'Usa Git y los flujos de pull request para colaborar y mantener una historia clara.', 'Configura un entorno con depurador, linter y formateador, y lo usa para encontrar errores.', 'Construye proyectos reproducibles y gestiona dependencias de forma segura.']
  });
  X('m8', {
    desc: 'Curso de sistemas operativos y lenguajes. Estudia procesos, planificación, memoria virtual, sistemas de archivos y el arranque del sistema; la concurrencia y sus primitivas; los compiladores e intérpretes; los entornos de ejecución con máquinas virtuales, compilación JIT y recolección de basura; y la seguridad de memoria y el modelo de propiedad de Rust.',
    logros: ['Explica cómo el sistema operativo administra procesos, memoria y archivos.', 'Diseña programas concurrentes correctos y detecta carreras e interbloqueos.', 'Describe las fases de un compilador y el funcionamiento de un entorno de ejecución moderno.', 'Identifica errores de seguridad de memoria y explica cómo los evitan los lenguajes seguros.']
  });

  X('m9', {
    desc: 'Curso de redes y desarrollo web. Estudia cómo viaja una petición por internet (TCP/IP, DNS, TLS), el protocolo HTTP y el diseño de API, el desarrollo backend con servidores, validación y capas, el frontend con HTML, CSS y el DOM, la plataforma del navegador (almacenamiento, seguridad de origen, service workers y aplicaciones instalables), la programación asíncrona y la publicación de aplicaciones con hosting, dominios, CDN y despliegue continuo.',
    logros: ['Explica qué ocurre desde que se escribe una URL hasta que se dibuja la página, y dónde se va el tiempo.', 'Diseña y construye una API organizada en capas, validada y con manejo de errores.', 'Construye interfaces web rápidas y seguras que aprovechan la plataforma del navegador, incluso sin conexión.', 'Publica aplicaciones con dominio propio, HTTPS, caché correcta y despliegue continuo.']
  });
  X('m10', {
    desc: 'Curso de bases de datos. Estudia el modelo relacional y SQL, las uniones y agregaciones, la normalización y el modelo entidad-relación, los índices y las transacciones, el uso de la base desde la aplicación (conexiones, parámetros, ORM y migraciones), la operación (respaldos, alta disponibilidad, seguridad y mantenimiento), las bases NoSQL y especializadas, y el análisis de datos con almacenes, modelo dimensional e inteligencia de negocios.',
    logros: ['Modela datos con restricciones, normalización y decisiones conscientes de desnormalización.', 'Escribe consultas correctas y eficientes, y las diagnostica con planes de ejecución.', 'Usa la base de datos desde la aplicación de forma segura y la opera con respaldos probados.', 'Diseña modelos dimensionales y métricas confiables para el análisis y los dashboards.']
  });
  X('hci', {
    desc: 'Curso de interacción humano-computador. Estudia el diseño centrado en el usuario y los modelos mentales, la investigación con usuarios (entrevistas, observación, encuestas, analítica y experimentos), la usabilidad y su evaluación, el diseño visual y de información (Gestalt, jerarquía, tipografía, color, visualización de datos y sistemas de diseño), el diseño de interacción (formularios, estados, errores, textos y móvil) y la accesibilidad.',
    logros: ['Investiga necesidades y comportamientos reales con métodos adecuados a cada pregunta.', 'Diseña pantallas con jerarquía visual clara, tipografía legible y color con significado.', 'Diseña interacciones que responden, previenen errores y funcionan en el teléfono.', 'Evalúa la usabilidad y la accesibilidad con pruebas, heurísticas y las pautas WCAG.']
  });

  X('eco', {
    desc: 'Curso de fundamentos de ingeniería y economía del software. Estudia la medición y sus límites (GQM, DORA, SPACE, la ley de Goodhart), la experimentación y la causalidad, la evaluación económica (valor del dinero en el tiempo, VAN, costo total de propiedad, costo de oportunidad), los modelos de negocio y métricas de producto de software, los costos de la nube y FinOps, y la toma de decisiones bajo incertidumbre.',
    logros: ['Define métricas útiles y difíciles de corromper, y diseña experimentos que distinguen causa de correlación.', 'Evalúa económicamente alternativas de software con VAN, costo total de propiedad y análisis de sensibilidad.', 'Interpreta las métricas de un negocio de software y de su infraestructura en la nube para priorizar.', 'Toma y documenta decisiones con matrices, árboles de decisión, premortem y opciones reales.']
  });
  X('eq', {
    desc: 'Curso de equipos, comunicación técnica y gestión de proyectos. Estudia la dinámica y la seguridad psicológica de los equipos, el liderazgo técnico, la mentoría y la retroalimentación, el manejo de conflictos y la negociación, la escritura técnica y la documentación, la gestión de proyectos (desglose, PERT, ruta crítica, valor ganado y pronósticos) y el trabajo profesional con clientes (propuestas, alcance, contratos, cambios y facturación).',
    logros: ['Contribuye a equipos efectivos y psicológicamente seguros, y ejerce liderazgo técnico sin ser cuello de botella.', 'Da y recibe retroalimentación, maneja conflictos y negocia basándose en intereses.', 'Escribe documentación, reportes y propuestas claras para lectores técnicos y no técnicos.', 'Planifica, sigue y cierra proyectos, y gestiona el alcance y los cambios con clientes.']
  });
  X('man', {
    desc: 'Curso de mantenimiento, evolución y gestión de configuración. Estudia las leyes de la evolución del software y la mantenibilidad, la comprensión y modernización de código heredado, la deuda técnica (identificación, medición y pago), la gestión de configuración y dependencias, las migraciones de plataforma y de datos, y la gestión de entregas con estrategias de despliegue y obsolescencia ordenada.',
    logros: ['Comprende y modifica con seguridad código heredado usando pruebas de caracterización.', 'Identifica, prioriza y comunica la deuda técnica en términos de negocio.', 'Gestiona configuración, dependencias e infraestructura como código de forma reproducible.', 'Planifica migraciones y entregas con pasos reversibles, verificación y comunicación.']
  });
  X('ia', {
    desc: 'Curso de inteligencia artificial, aprendizaje automático e ingeniería de datos. Estudia la búsqueda y la optimización, el aprendizaje supervisado y su evaluación, el aprendizaje no supervisado y los sistemas de recomendación, las redes neuronales y el aprendizaje profundo, la ingeniería de datos y la operación de modelos, y la IA responsable (equidad, explicabilidad, privacidad y regulación en el Perú y el mundo).',
    logros: ['Modela problemas de búsqueda y optimización y elige el algoritmo adecuado.', 'Prepara datos, entrena y evalúa modelos supervisados y no supervisados sin errores de validación.', 'Construye canalizaciones de datos confiables y opera modelos en producción.', 'Evalúa y documenta los riesgos de equidad, explicabilidad y privacidad de un sistema con IA.']
  });
  X('plat', {
    desc: 'Curso de plataformas de software. Estudia el desarrollo móvil y sus restricciones, el desarrollo multiplataforma (PWA, React Native, Flutter, Kotlin Multiplatform), las aplicaciones de escritorio (nativas, Electron, Tauri) y su distribución, los sistemas embebidos y de tiempo real, el Internet de las cosas (conectividad, MQTT y seguridad) y la computación paralela en CPU y GPU.',
    logros: ['Elige y justifica la plataforma y la tecnología adecuadas según el producto y el equipo.', 'Construye aplicaciones móviles y de escritorio que respetan las convenciones y la seguridad de cada sistema.', 'Diseña sistemas embebidos e IoT con restricciones de energía, tiempo real y seguridad.', 'Paraleliza cálculos midiendo su beneficio con la ley de Amdahl.']
  });
  X('m17', {
    desc: 'Curso de la profesión y el proyecto final. Estudia la ética profesional y la legislación peruana relevante (datos personales, consumidor, propiedad intelectual), el uso responsable de la inteligencia artificial en el trabajo y en los productos, el código abierto (licencias, contribución y mantenimiento), la lectura de investigación y el aprendizaje continuo, la carrera profesional, y culmina con el proyecto final integrador.',
    logros: ['Analiza dilemas éticos y aplica el código de ética y la legislación al trabajo de software.', 'Usa y construye sistemas con IA de forma responsable, evaluada y segura.', 'Contribuye a proyectos de código abierto y evalúa fuentes técnicas con criterio.', 'Concibe, construye, despliega y presenta un proyecto final que integra la carrera.']
  });
})();
