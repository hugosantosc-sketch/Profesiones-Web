/* Malla curricular: 10 ciclos, como una carrera universitaria de cinco años.
   Cada curso es un módulo del contenido; aquí se le agregan código, créditos, prerrequisitos y logros. */
(function () {
  var C = function (id, meta) { var m = SDC.modules.filter(function (x) { return x.id === id; })[0]; if (m) for (var k in meta) m[k] = meta[k]; };

  SDC.CICLOS = [
    { n: 1, nombre: 'Fundamentos', cursos: ['m1', 'm2', 'm3'] },
    { n: 2, nombre: 'Bases matemáticas y algorítmicas', cursos: ['mat2', 'm4', 'm7'] },
    { n: 3, nombre: 'Diseño y máquina', cursos: ['m5', 'arq', 'm8'] },
    { n: 4, nombre: 'Construcción, teoría y datos', cursos: ['m6', 'teo', 'm10', 'hci'] },
    { n: 5, nombre: 'Sistemas y requisitos', cursos: ['so', 'm9', 'm11'] },
    { n: 6, nombre: 'Infraestructura del software', cursos: ['red', 'bd2', 'lc'] },
    { n: 7, nombre: 'Ingeniería del software I', cursos: ['m12', 'for', 'm13', 'eco'] },
    { n: 8, nombre: 'Ingeniería del software II', cursos: ['sd', 'm14', 'm15', 'eq'] },
    { n: 9, nombre: 'Seguridad, evolución e inteligencia', cursos: ['m16', 'man', 'ia'] },
    { n: 10, nombre: 'Especialización y titulación', cursos: ['plat', 'm17'] }
  ];
  SDC.NOTA_MIN = 11;      /* escala vigesimal, como en las universidades peruanas */
  SDC.EXAM_N = 20;        /* preguntas por examen final */

  C('m1', { code: 'ISW-101', cred: 3, prereq: [], logros: ['Explica cómo se representan números, texto e instrucciones en binario.', 'Describe cómo una CPU ejecuta un programa con el ciclo de captura, decodificación y ejecución.', 'Construye circuitos lógicos sencillos a partir de compuertas.'] });
  C('m2', { code: 'ISW-102', cred: 4, prereq: [], logros: ['Usa lógica proposicional y conjuntos para razonar sobre programas.', 'Calcula probabilidades y valores esperados de situaciones de software.', 'Traduce enunciados del lenguaje natural a expresiones lógicas precisas.'] });
  C('m3', { code: 'ISW-103', cred: 5, prereq: [], logros: ['Escribe programas con variables, condiciones, bucles, funciones y arreglos.', 'Resuelve problemas con recursión y la explica con su caso base.', 'Lee código ajeno y predice lo que imprime.'] });

  C('mat2', { code: 'ISW-201', cred: 4, prereq: ['m2'], logros: ['Demuestra propiedades de algoritmos por inducción.', 'Aplica cálculo, álgebra lineal y estadística a problemas de ingeniería.', 'Interpreta resultados numéricos con su error y su incertidumbre.'] });
  C('m4', { code: 'ISW-202', cred: 5, prereq: ['m3', 'm2'], logros: ['Analiza la complejidad de un algoritmo con notación O.', 'Elige la estructura de datos adecuada para cada problema.', 'Implementa búsqueda, ordenamiento, grafos y programación dinámica.'] });
  C('m7', { code: 'ISW-203', cred: 2, prereq: ['m3'], logros: ['Trabaja con fluidez en la terminal.', 'Gestiona versiones con Git, ramas y pull requests.', 'Colabora en un repositorio con revisiones de código.'] });

  C('m5', { code: 'ISW-301', cred: 4, prereq: ['m4'], logros: ['Modela un dominio con clases, objetos e interfaces.', 'Aplica los principios SOLID y los patrones de diseño clásicos.', 'Justifica decisiones de diseño por sus consecuencias en el cambio.'] });
  C('arq', { code: 'ISW-302', cred: 4, prereq: ['m1', 'm3'], logros: ['Explica cómo un procesador ejecuta instrucciones con segmentación.', 'Calcula el efecto de la jerarquía de memoria y las cachés en el rendimiento.', 'Describe la entrada y salida, las interrupciones y el almacenamiento.'] });
  C('m8', { code: 'ISW-303', cred: 3, prereq: ['m3', 'm1'], logros: ['Describe a alto nivel qué hace un sistema operativo.', 'Reconoce problemas básicos de concurrencia.', 'Explica cómo un lenguaje pasa de texto a ejecución.'] });

  C('m6', { code: 'ISW-401', cred: 4, prereq: ['m5'], logros: ['Escribe código limpio, legible y fácil de cambiar.', 'Refactoriza con pruebas sin alterar el comportamiento.', 'Maneja errores y aplica ideas de programación funcional.'] });
  C('teo', { code: 'ISW-402', cred: 4, prereq: ['m4', 'mat2'], logros: ['Diseña autómatas y gramáticas para lenguajes formales.', 'Explica qué puede y qué no puede calcular una máquina de Turing.', 'Clasifica problemas por su complejidad y reconoce los NP-completos.'] });
  C('m10', { code: 'ISW-403', cred: 4, prereq: ['m4'], logros: ['Modela datos con el modelo entidad-relación y el relacional.', 'Escribe consultas SQL con uniones y agregaciones.', 'Normaliza esquemas y elige índices básicos.'] });
  C('hci', { code: 'ISW-404', cred: 3, prereq: ['m3'], logros: ['Aplica el diseño centrado en el usuario.', 'Evalúa la usabilidad con métodos y métricas reconocidas.', 'Diseña interfaces accesibles según WCAG.'] });

  C('so', { code: 'ISW-501', cred: 5, prereq: ['m8', 'arq'], logros: ['Explica cómo el sistema operativo administra procesos, hilos, memoria, archivos y dispositivos.', 'Aplica algoritmos de planificación, sincronización, reemplazo de páginas y manejo de interbloqueos, y calcula su desempeño.', 'Programa con procesos, hilos y primitivas de sincronización sin condiciones de carrera.', 'Analiza el aislamiento que dan la virtualización, los contenedores y los mecanismos de protección.'] });
  C('m9', { code: 'ISW-502', cred: 4, prereq: ['m3', 'm7'], logros: ['Explica a grandes rasgos cómo viaja una página web por Internet.', 'Construye interfaces web con HTML, CSS y JavaScript.', 'Consume APIs HTTP con programación asíncrona.'] });
  C('m11', { code: 'ISW-503', cred: 3, prereq: ['m5'], logros: ['Obtiene, analiza y especifica requisitos verificables.', 'Escribe historias de usuario con criterios de aceptación.', 'Modela sistemas con UML.'] });

  C('red', { code: 'ISW-601', cred: 5, prereq: ['m9', 'so'], logros: ['Explica el funcionamiento de Internet capa por capa, desde la aplicación hasta el enlace físico.', 'Calcula retardos, rendimiento, ventanas, subredes y rutas.', 'Analiza cómo TCP logra confiabilidad y controla la congestión.', 'Evalúa la seguridad de una comunicación en red.'] });
  C('bd2', { code: 'ISW-602', cred: 5, prereq: ['m10', 'so'], logros: ['Razona sobre consultas con álgebra relacional y teoría de dependencias.', 'Explica cómo un motor almacena datos, usa índices y optimiza consultas.', 'Analiza transacciones, niveles de aislamiento y recuperación ante fallas.', 'Diseña esquemas e índices justificando su costo.'] });
  C('lc', { code: 'ISW-603', cred: 5, prereq: ['teo', 'm8', 'm4'], logros: ['Compara paradigmas y sistemas de tipos de los lenguajes de programación.', 'Construye un analizador léxico, un analizador sintáctico y un intérprete.', 'Explica el entorno de ejecución, la recolección de basura y la generación de código.', 'Aplica optimizaciones clásicas y explica cómo funciona un compilador JIT.'] });

  C('m12', { code: 'ISW-701', cred: 3, prereq: ['m11'], logros: ['Compara modelos de ciclo de vida y elige uno justificado.', 'Aplica prácticas ágiles y estima con técnicas reconocidas.', 'Identifica y gestiona riesgos del proyecto.'] });
  C('for', { code: 'ISW-702', cred: 3, prereq: ['teo', 'm11'], logros: ['Modela sistemas con máquinas de estados.', 'Especifica contratos con precondiciones, poscondiciones e invariantes.', 'Explica la verificación de modelos y la prueba de programas.'] });
  C('m13', { code: 'ISW-703', cred: 4, prereq: ['m6', 'm10', 'm9'], logros: ['Elige estilos arquitectónicos según atributos de calidad.', 'Diseña para escalar y documenta decisiones.', 'Reconoce los retos de los sistemas distribuidos.'] });
  C('eco', { code: 'ISW-704', cred: 3, prereq: ['mat2'], logros: ['Mide con métricas válidas y diseña experimentos sin sesgos.', 'Evalúa alternativas con VAN, TIR y costo total.', 'Decide con matrices ponderadas y análisis de sensibilidad.'] });

  C('sd', { code: 'ISW-801', cred: 5, prereq: ['red', 'bd2', 'm13'], logros: ['Explica los modelos de fallas y de tiempo de los sistemas distribuidos.', 'Aplica relojes lógicos, replicación, quórums y modelos de consistencia.', 'Describe y razona sobre algoritmos de consenso como Paxos y Raft.', 'Diseña servicios distribuidos tolerantes a fallas.'] });
  C('m14', { code: 'ISW-802', cred: 4, prereq: ['m6'], logros: ['Diseña pruebas con técnicas de caja negra y caja blanca.', 'Automatiza pruebas unitarias y de integración.', 'Mide la calidad con métricas significativas.'] });
  C('m15', { code: 'ISW-803', cred: 4, prereq: ['m13', 'm7'], logros: ['Construye pipelines de integración y entrega continuas.', 'Despliega con contenedores en la nube.', 'Opera sistemas con observabilidad y respuesta a incidentes.'] });
  C('eq', { code: 'ISW-804', cred: 3, prereq: ['m12'], logros: ['Diseña condiciones para que un equipo trabaje bien.', 'Escribe documentación técnica clara y útil.', 'Planifica y controla un proyecto con ruta crítica y valor ganado.'] });

  C('m16', { code: 'ISW-901', cred: 4, prereq: ['red', 'm13'], logros: ['Identifica y corrige las vulnerabilidades más comunes.', 'Implementa autenticación y autorización seguras.', 'Usa la criptografía correctamente.'] });
  C('man', { code: 'ISW-902', cred: 3, prereq: ['m14', 'm15'], logros: ['Planifica el mantenimiento con datos.', 'Moderniza código heredado sin detener el servicio.', 'Gestiona versiones, dependencias y entregas.'] });
  C('ia', { code: 'ISW-903', cred: 4, prereq: ['mat2', 'm10', 'm4'], logros: ['Aplica búsqueda heurística a problemas de decisión.', 'Construye y evalúa modelos de aprendizaje automático con rigor.', 'Diseña pipelines de datos y opera modelos en producción.'] });

  C('plat', { code: 'ISW-1001', cred: 4, prereq: ['so', 'm9'], logros: ['Diseña aplicaciones móviles que funcionan sin conexión.', 'Analiza sistemas embebidos de tiempo real.', 'Paraleliza cálculos y mide su aceleración.'] });
  C('m17', { code: 'ISW-1002', cred: 6, prereq: ['m15', 'm16'], logros: ['Actúa según los códigos de ética de la profesión.', 'Integra la IA en el trabajo de ingeniería con criterio.', 'Entrega un proyecto final completo y defendible.'] });

  /* Orden de la carrera: el recorrido sigue los ciclos. */
  SDC.cursosEnOrden = function () {
    var out = [];
    SDC.CICLOS.forEach(function (c) { c.cursos.forEach(function (id) { var m = SDC.modules.filter(function (x) { return x.id === id; })[0]; if (m) out.push(m); }); });
    return out;
  };
})();
