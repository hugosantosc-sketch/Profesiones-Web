(function () {
var M = SDC.M, S = SDC.S;
M('m12', { title: 'Procesos y gestión de proyectos', desc: 'El software lo hacen equipos, con plazos, dinero y cambios. Saber programar no basta: hay que saber organizarse para entregar.',
  thread: 'PatioApp se construye en sprints de dos semanas, con backlog priorizado, estimaciones honestas y una lista de riesgos revisada cada semana.',
  books: '*The Mythical Man-Month* (Brooks), *Scrum: The Art of Doing Twice the Work* (Sutherland), *Peopleware* (DeMarco y Lister), *Software Estimation* (McConnell), *Accelerate* (Forsgren et al.).',
  uni: 'Desarrollo Ágil de Productos de Software y Gerencia de Proyectos en Computación (UPC), Gestión de Proyectos (UTP), Ingeniería de Software (UTEC), Foundations of Software Engineering (CMU 17-313).' });

S('m12', 'm12.life', { title: 'Modelos de ciclo de vida',
  ask: '¿Qué modelo de proceso encaja?',
  lesson: `
> **La idea en simple.** Construir un puente y crear una startup requieren procesos distintos. En el puente sabes exactamente qué quieres y no se puede corregir después. En la startup todo cambia cada mes. No hay proceso universalmente mejor; hay uno adecuado al riesgo.

## Las actividades
Toda forma de hacer software incluye: requisitos, diseño, construcción, pruebas, despliegue y mantenimiento. Cambia **cómo se ordenan y repiten**.

## Modelos clásicos
| Modelo | Idea | Cuándo |
| Cascada | fases en secuencia | requisitos estables y regulados |
| Modelo en V | cada fase tiene su nivel de prueba | sistemas críticos |
| Incremental | se entregan partes funcionales | alcance grande divisible |
| Espiral (Boehm) | ciclos guiados por el riesgo | proyectos grandes y riesgosos |
| Prototipos | se construye para aprender | requisitos poco claros |
| Ágil | ciclos cortos y entrega continua | cambio constante |

:::flow Requisitos | Diseño | Implementación | Verificación | Mantenimiento

## El modelo en V
~~~txt
Requisitos ------------------- Pruebas de aceptación
  Arquitectura -------------- Pruebas de sistema
    Diseño detallado ------- Pruebas de integración
      Código ------------ Pruebas unitarias
~~~

## Mantenimiento: la parte más larga
La mayor parte del costo total ocurre después del lanzamiento. Tipos: **correctivo** (arregla), **adaptativo** (se ajusta al entorno), **perfectivo** (mejora), **preventivo** (evita problemas futuros).

## Curiosidad histórica
El artículo de Royce de 1970, citado como origen de la cascada, ya advertía del riesgo de hacer todo en una sola pasada.

## Puntos que no debes omitir
- Cuanto más tarde descubres un problema, más caro es.
- Software crítico (salud, aviación) exige más documentación y verificación formal.
- SWEBOK v4 sirve de mapa del conocimiento de esta profesión.

! Error común: decir "somos ágiles" para justificar no planificar ni documentar nada. Ágil es disciplina, no caos.`,
  links: [['m12.agile', 'ágil responde a los problemas de la cascada'], ['m14.types', 'el modelo en V empareja fases y pruebas'], ['m15.cicd', 'DevOps lleva los ciclos cortos a producción'], ['m11.req', 'cada modelo maneja de forma distinta el cambio de requisitos']],
  read: 'Sommerville, capítulo 2; Pressman, capítulo sobre modelos de proceso; SWEBOK v4.',
  terms: [
    ['Cascada', 'modelo que avanza por fases en secuencia, con poca vuelta atrás', ['Un contrato estatal con requisitos cerrados.', 'Se firma el diseño antes de programar.', 'El cliente ve el producto recién al final.']],
    ['Modelo en V', 'modelo que asocia cada fase de desarrollo con un nivel de prueba', ['Software de un marcapasos con trazabilidad total.', 'Los requisitos se validan con pruebas de aceptación.', 'Se planifican las pruebas al diseñar.']],
    ['Modelo incremental', 'entregar el sistema en partes funcionales sucesivas', ['Primero se lanza el registro, luego reportes y luego pagos.', 'Cada entrega ya se puede usar.', 'El riesgo se reparte entre versiones.']],
    ['Modelo en espiral', 'ciclos que analizan y reducen el riesgo en cada vuelta', ['Antes de cada etapa se pregunta qué podría salir peor.', 'Propuesto por Barry Boehm.', 'Un proyecto militar grande avanza por prototipos de riesgo.']],
    ['Prototipo', 'versión rápida para aprender sobre el problema', ['Una maqueta en Figma para validar el flujo.', 'Se descarta después de obtener respuestas.', 'Aclara lo que el usuario realmente quiere.']],
    ['Mantenimiento correctivo', 'cambios que arreglan errores encontrados', ['Se corrige un cálculo en producción.', 'Un parche urgente repara una falla de seguridad.', 'Un usuario reporta un bug y se arregla.']],
    ['Mantenimiento adaptativo', 'cambios para seguir funcionando en un entorno que cambió', ['Una nueva ley tributaria obliga a modificar el sistema.', 'Se migra a una nueva versión del sistema operativo.', 'Cambia la API de un proveedor.']]
  ],
  q: [
    { o: 'Ordena las fases de cascada.', s: ['Requisitos', 'Diseño', 'Implementación', 'Verificación', 'Mantenimiento'], e: 'Es la secuencia clásica.', l: 1 },
    ['Sistema para un dispositivo médico regulado con requisitos estables. ¿Qué encaja mejor?', 'Modelo en V', ['Sin proceso', 'Prototipado rápido sin documentar', 'Copiar y pegar'], 'Se necesita trazabilidad y verificación rigurosa.', 3],
    ['Una startup no sabe qué quieren sus clientes. ¿Qué encaja mejor?', 'Ágil con prototipos y entregas cortas', ['Cascada con dos años de diseño', 'Modelo en V', 'Un contrato cerrado de 3 años'], 'Necesita aprender rápido.', 3],
    ['¿Cuál fase suele concentrar más costo en la vida de un sistema?', 'Mantenimiento', ['Requisitos', 'Diseño', 'Primera codificación'], 'Los sistemas duran años.', 4],
    ['Royce (1970) es conocido por la cascada, pero en realidad:', 'Advirtió del riesgo de hacerla en una sola pasada y sugirió iterar', ['La consideró perfecta', 'Inventó Scrum', 'Rechazó las pruebas'], 'Su artículo se malinterpretó durante años.', 4],
    { c: 'Calcula costo total: «costoVida(desarrollo, anual, años)» devuelve desarrollo + anual × años.', f: 'costoVida', p: ['desarrollo', 'anual', 'años'], t: [[[100, 20, 5], 200], [[0, 0, 9], 0]], sol: '  return desarrollo + anual * años;', l: 2 },
    { c: 'Elige el modelo: «recomendarModelo(p)» recibe {requisitosEstables, critico}. Devuelve "V" si es crítico; "cascada" si no es crítico y son estables; y "agil" en otro caso.', f: 'recomendarModelo', p: ['p'], t: [[[{ requisitosEstables: true, critico: true }], 'V'], [[{ requisitosEstables: true, critico: false }], 'cascada'], [[{ requisitosEstables: false, critico: false }], 'agil']], sol: "  if (p.critico) return 'V';\n  return p.requisitosEstables ? 'cascada' : 'agil';", l: 3 },
    { c: 'Calcula el costo de corregir: «costoDefecto(fase)»: requisitos 1, diseño 3, codigo 10, pruebas 30, produccion 100. Si no existe, lanza un Error.', f: 'costoDefecto', p: ['fase'], t: [[['requisitos'], 1], [['produccion'], 100], [['pruebas'], 30]], sol: "  const c = { requisitos: 1, diseno: 3, codigo: 10, pruebas: 30, produccion: 100 };\n  if (!(fase in c)) throw new Error('Fase desconocida');\n  return c[fase];", l: 3 }
  ],
  gen: function (g) {
    var m = [['Se añadió soporte de una nueva versión de Android.', 'Adaptativo'], ['Se arregló un error de cálculo en el reporte.', 'Correctivo'], ['Se agregó un filtro por pedido de usuarios.', 'Perfectivo'], ['Se refactorizó el módulo de pagos para evitar futuras fallas.', 'Preventivo'], ['Cambió la tasa de un impuesto y se actualizó.', 'Adaptativo'], ['Se corrigió una caída al subir fotos.', 'Correctivo'], ['Se mejoró la velocidad del buscador a petición del cliente.', 'Perfectivo'], ['Se actualizó una biblioteca antes de que deje de tener soporte.', 'Preventivo']];
    m.forEach(function (x) { g.mcq(2, '¿Qué tipo de mantenimiento es?\n' + x[0], x[1], ['Adaptativo', 'Correctivo', 'Perfectivo', 'Preventivo'].filter(function (y) { return y !== x[1]; }), 'Es ' + x[1] + '.'); });
    g.times(5, function (R) { var d = R.pick([50, 100, 200]), a = R.pick([10, 20, 40]), y = R.int(3, 10); g.input(3, 'Desarrollar costó S/ ' + d + ' mil y mantener cuesta S/ ' + a + ' mil al año. ¿Cuánto cuesta en total (en miles) a ' + y + ' años?', d + a * y, d + ' + ' + a + ' × ' + y + '.'); });
  } });

S('m12', 'm12.agile', { title: 'Ágil, Scrum y Kanban',
  ask: '¿Qué práctica o rol ágil es este?',
  lesson: `
> **La idea en simple.** En vez de planear todo un viaje de un año y descubrir al final que era el destino equivocado, avanzas dos semanas, miras el mapa, le preguntas al pasajero y corriges.

## El Manifiesto Ágil (2001)
Valora más a **personas** sobre procesos, **software funcionando** sobre documentación extensa, **colaboración** sobre negociación y **responder al cambio** sobre seguir un plan. Lo de la derecha también tiene valor.

## Scrum en una imagen
:::flow Product Backlog | Planificación | Sprint Backlog | Sprint (1 a 4 semanas) | Incremento | Revisión | Retrospectiva

| Rol | Responsabilidad |
| Product Owner | maximiza el valor; ordena el backlog |
| Scrum Master | ayuda a que Scrum funcione; quita impedimentos |
| Desarrolladores | construyen el incremento |

| Evento | Propósito |
| Planificación | qué y cómo en este sprint |
| Daily | 15 min para coordinar hacia el objetivo |
| Revisión | mostrar el resultado y recibir opinión |
| Retrospectiva | mejorar la forma de trabajar |

## Kanban
Sin sprints: un flujo continuo con columnas.
~~~txt
Por hacer | En curso (máx. 3) | Revisión (máx. 2) | Hecho
~~~
Lo central es limitar el **trabajo en curso (WIP)**: terminar antes de empezar otra cosa. La **ley de Little** lo explica: tiempo de ciclo = trabajo en curso ÷ rendimiento.

## XP: prácticas técnicas
Programación en pareja, pruebas primero, integración continua, entregas pequeñas, diseño simple. Sin esto, ágil se degrada en reuniones.

## Métricas
**Velocidad:** puntos por sprint, solo para planificar, no para comparar equipos. **Tiempo de ciclo** y **burndown**. Las métricas DORA miden el rendimiento real de entrega.

## Puntos que no debes omitir
- El daily no es un informe para el jefe.
- Un sprint produce algo potencialmente usable.
- Scrum es un marco; se adapta con cuidado.
- Equipo pequeño (hasta 10), estable y autoorganizado.

! Error común: "Scrum zombi": todas las reuniones sin usuario real, sin mejora y sin software funcionando.`,
  links: [['m11.stories', 'el backlog se compone de historias'], ['m12.est', 'la velocidad permite pronosticar'], ['m7.team', 'integrar seguido reduce el riesgo'], ['m15.cicd', 'la entrega continua hace posibles los ciclos cortos']],
  read: 'Guía oficial de Scrum; Beck, *Extreme Programming Explained*; Anderson, *Kanban*.',
  terms: [
    ['Sprint', 'iteración de tiempo fijo que produce un incremento usable', ['Un ciclo de dos semanas.', 'El objetivo se mantiene durante el ciclo.', 'Termina con revisión y retrospectiva.']],
    ['Product Owner', 'responsable de maximizar el valor y ordenar el backlog', ['Decide qué se hace primero.', 'Acepta o rechaza lo hecho según los criterios.', 'Representa a clientes y negocio.']],
    ['Scrum Master', 'responsable de que el equipo aplique y mejore Scrum', ['Quita un bloqueo con otra área.', 'Facilita la retrospectiva.', 'No es el jefe del equipo.']],
    ['Retrospectiva', 'reunión del equipo para mejorar su forma de trabajar', ['"¿Qué haremos distinto el próximo sprint?"', 'Sale un acuerdo concreto para mejorar.', 'Se revisa el proceso, no el producto.']],
    ['Límite WIP', 'máximo de tareas permitidas en curso al mismo tiempo', ['Solo se admiten 3 tarjetas en revisión.', 'No se empieza algo nuevo sin terminar lo anterior.', 'Muestra el cuello de botella del flujo.']],
    ['Velocidad', 'cantidad de trabajo que un equipo completa por sprint', ['El equipo termina unos 30 puntos.', 'Sirve para saber cuánto entra en el próximo sprint.', 'No se debe comparar entre equipos.']],
    ['Programación en pareja', 'dos personas trabajan juntas en el mismo código', ['Uno escribe y el otro revisa en tiempo real.', 'Se reparte el conocimiento de un módulo crítico.', 'Una persona nueva aprende junto a una experta.']]
  ],
  q: [
    { o: 'Ordena los eventos de un sprint.', s: ['Planificación', 'Dailies y trabajo', 'Revisión', 'Retrospectiva'], e: 'La revisión mira el producto y la retrospectiva el proceso.', l: 2 },
    ['¿Quién ordena el backlog?', 'El Product Owner', ['El Scrum Master', 'El CEO', 'El más antiguo'], 'Es su responsabilidad.', 1],
    ['Un equipo tiene 15 tareas "en curso" y nada termina. ¿Qué haces?', 'Limitar el WIP y terminar antes de empezar más', ['Empezar más tareas', 'Contratar a 15 personas', 'Quitar las pruebas'], 'Por la ley de Little, menos en curso reduce el tiempo de ciclo.', 3],
    ['Un gerente exige subir la velocidad cada sprint. ¿Qué es lo más probable?', 'Se inflarán las estimaciones sin entregar más', ['Mejorará la calidad', 'Los puntos se volverán dinero', 'Bajará la deuda técnica'], 'Una métrica convertida en meta deja de ser buena medida (ley de Goodhart).', 4],
    ['Según la ley de Little, con 20 tareas en curso y 5 por semana, ¿cuánto tarda una tarea?', '4 semanas', ['20 semanas', '5 semanas', '1 semana'], '20 / 5.', 3],
    { c: 'Calcula la ley de Little: «tiempoCiclo(wip, rendimiento)».', f: 'tiempoCiclo', p: ['wip', 'rendimiento'], t: [[[20, 5], 4], [[6, 2], 3]], sol: '  return wip / rendimiento;', l: 2 },
    { c: 'Calcula la velocidad: «velocidad(sprints)» devuelve el promedio redondeado de los puntos completados.', f: 'velocidad', p: ['sprints'], t: [[[[20, 30, 25]], 25], [[[10, 11]], 11]], sol: '  return Math.round(sprints.reduce((a, b) => a + b, 0) / sprints.length);', l: 2 },
    { c: 'Pronostica: «sprintsRestantes(pendiente, historial)» devuelve los sprints necesarios (redondeando hacia arriba) usando el promedio del historial.', f: 'sprintsRestantes', p: ['pendiente', 'historial'], t: [[[100, [20, 30]], 4], [[10, [10]], 1], [[0, [5]], 0]], sol: '  const v = historial.reduce((a, b) => a + b, 0) / historial.length;\n  return Math.ceil(pendiente / v);', l: 3 },
    { c: 'Aplica WIP: «puedeMover(tablero, col, limites)» recibe {col: [tareas]} y {col: max}. Devuelve si se puede agregar una tarea a esa columna; sin límite definido siempre se puede.', f: 'puedeMover', p: ['tablero', 'col', 'limites'], t: [[[{ c: [1, 2] }, 'c', { c: 2 }], false], [[{ c: [1] }, 'c', { c: 2 }], true], [[{ c: [1, 2, 3] }, 'c', {}], true]], sol: '  return limites[col] === undefined || tablero[col].length < limites[col];', l: 3 },
    { c: 'Dibuja el burndown: «burndown(total, hechos)» devuelve la lista de puntos restantes tras cada día.', f: 'burndown', p: ['total', 'hechos'], t: [[[10, [2, 3, 5]], [8, 5, 0]], [[5, []], []]], sol: '  return hechos.map(h => (total -= h));', l: 4 }
  ],
  gen: function (g) {
    var v = [['Decide el orden del backlog.', 'Product Owner'], ['Quita impedimentos del equipo.', 'Scrum Master'], ['Se compromete a construir el incremento.', 'Desarrolladores'], ['Acepta lo que cumple los criterios.', 'Product Owner'], ['Facilita los eventos cuando hace falta.', 'Scrum Master'], ['Decide cómo se hace el trabajo técnico.', 'Desarrolladores']];
    v.forEach(function (x) { g.mcq(1, '¿A qué rol de Scrum corresponde?\n' + x[0], x[1], ['Product Owner', 'Scrum Master', 'Desarrolladores'].filter(function (y) { return y !== x[1]; }), 'Corresponde a ' + x[1] + '.'); });
    g.times(10, function (R) { var r = R.int(2, 8), t = R.int(1, 6); g.input(2, 'Hay ' + r * t + ' tareas en curso y el equipo termina ' + r + ' por semana. ¿Cuántas semanas tarda una tarea según la ley de Little?', t, (r * t) + ' / ' + r + '.'); });
    g.times(8, function (R) { var p = R.pick([80, 100, 120, 150, 200]), v2 = R.pick([20, 25, 30]); g.input(2, 'Quedan ' + p + ' puntos y la velocidad es ' + v2 + '. ¿Cuántos sprints faltan? (redondea hacia arriba)', Math.ceil(p / v2), p + ' / ' + v2 + '.'); });
  } });

S('m12', 'm12.est', { title: 'Estimación y planificación',
  ask: '¿Qué técnica o concepto de estimación aplica?',
  lesson: `
> **La idea en simple.** Si te preguntan cuánto tardas en llegar a un lugar donde nunca has ido, responderías con un rango. Estimar software es igual: una estimación es una distribución de probabilidades, no una promesa.

## El cono de la incertidumbre
Al inicio de un proyecto, la estimación puede errar hasta 4 veces. Se reduce a medida que aprendes. Por eso se **reestima**.

## Técnicas
- **Puntos de historia:** tamaño relativo (esfuerzo, complejidad, incertidumbre), usando Fibonacci: 1, 2, 3, 5, 8, 13.
- **Planning Poker:** todos votan a la vez; si hay diferencias, se conversa. Lo valioso es descubrir lo que uno sabe y el otro no.
- **PERT:** de tres puntos: (optimista + 4 × probable + pesimista) ÷ 6.
~~~js
const pert = (o, m, p) => (o + 4 * m + p) / 6;
console.log(pert(2, 4, 12));         // días estimados
console.log((12 - 2) / 6);           // desviación estándar
~~~
- **Analogía:** comparar con proyectos similares.
- **Pronóstico probabilístico:** con datos históricos de cuánto tardan las tareas.

## La ley de Brooks
"Agregar personas a un proyecto atrasado lo atrasa más." Hay que capacitarlas, y las vías de comunicación crecen con n(n−1)/2.

## La ruta crítica
La secuencia de tareas más larga define la fecha más temprana de término. Retrasar una tarea en ella retrasa todo.

## Las cuatro variables
Alcance, tiempo, costo y calidad. Si una se fija, las otras se mueven. Bajar la calidad parece gratis, pero se paga con intereses.

## Puntos que no debes omitir
- **Ley de Hofstadter:** siempre tarda más de lo esperado, incluso considerando esta ley.
- **Ley de Parkinson:** el trabajo se expande hasta llenar el tiempo disponible.
- Distingue estimación (análisis), objetivo (deseo) y compromiso (promesa).
- Ante presión, negocia alcance, no la estimación.

! Error común: dar una sola cifra de memoria en el pasillo. Esa cifra se convierte en fecha. Da un rango y di de qué depende.`,
  links: [['m11.stories', 'se estiman las historias'], ['m12.agile', 'la velocidad permite convertir puntos en fechas'], ['m2.prob', 'estimar es razonar con probabilidades'], ['m12.risk', 'los riesgos amplían los rangos']],
  read: 'McConnell, *Software Estimation*; Brooks, *The Mythical Man-Month*.',
  terms: [
    ['Punto de historia', 'unidad relativa de tamaño de un trabajo', ['Esta historia es el doble que aquella.', 'Se usa Fibonacci para las estimaciones.', 'No equivale a horas.']],
    ['Planning Poker', 'técnica en la que el equipo vota a la vez y discute las diferencias', ['Uno vota 2 y otro 13 y aparece un riesgo oculto.', 'Evita que la primera opinión influya.', 'Se juega con cartas numeradas.']],
    ['PERT', 'estimación de tres puntos que pondera el valor probable', ['Optimista 2, probable 4 y pesimista 12 dan 5.', 'Permite expresar la incertidumbre.', 'Divide entre 6.']],
    ['Cono de la incertidumbre', 'modelo en que el error de estimación se reduce conforme avanza el proyecto', ['Al inicio se da un rango de 4 veces.', 'Tras el diseño, el rango se reduce.', 'Justifica reestimar.']],
    ['Ley de Brooks', 'agregar gente a un proyecto atrasado lo retrasa más', ['Se suman cinco personas en el último mes y todo se frena.', 'Los expertos dedican tiempo a capacitar.', 'Nueve mujeres no tienen un bebé en un mes.']],
    ['Ruta crítica', 'cadena más larga de tareas dependientes que define la duración', ['Una demora ahí mueve la fecha final.', 'Otras tareas tienen holgura.', 'Se ve en un diagrama de red.']],
    ['Ley de Parkinson', 'el trabajo se expande hasta ocupar el tiempo disponible', ['Dieron dos semanas y se usaron las dos para algo de un día.', 'Una fecha muy holgada no termina antes.', 'Limitar el tiempo enfoca al equipo.']]
  ],
  q: [
    ['Un jefe pregunta en el pasillo: "¿cuánto para el módulo?". ¿Qué respondes?', 'Te doy un rango después de revisar los requisitos; depende de X e Y', ['Dos días, sin pensar', 'Nunca se puede estimar', 'Lo que tú quieras'], 'Evita que una cifra improvisada se vuelva un compromiso.', 3],
    ['Estimar 40 puntos en un sprint de velocidad 25 con fecha fija. ¿Qué negocias?', 'El alcance', ['La calidad', 'Las pruebas', 'La duración de la semana'], 'Se corta el alcance; bajar calidad sale caro.', 4],
    ['¿Cuántas vías de comunicación tiene un equipo de 10?', '45', ['10', '20', '100'], '10 × 9 / 2.', 3],
    ['Todos votan 3 salvo uno que vota 13. ¿Qué haces?', 'Escuchar por qué: quizá sabe algo que los demás no', ['Promediar', 'Ignorarlo', 'Sacarlo del equipo'], 'La discusión es lo valioso del poker.', 3],
    { c: 'Calcula PERT: «pert(o, m, p)».', f: 'pert', p: ['o', 'm', 'p'], t: [[[2, 4, 12], 5], [[1, 1, 1], 1]], sol: '  return (o + 4 * m + p) / 6;', l: 2 },
    { c: 'Calcula las vías de comunicación: «vias(n)».', f: 'vias', p: ['n'], t: [[[2], 1], [[10], 45], [[1], 0]], sol: '  return n * (n - 1) / 2;', l: 2 },
    { c: 'Halla la siguiente carta: «carta(x)» redondea hacia arriba x a la serie 1, 2, 3, 5, 8, 13, 21. Si es mayor, devuelve "partir".', f: 'carta', p: ['x'], t: [[[4], 5], [[1], 1], [[21], 21], [[22], 'partir']], sol: "  for (const c of [1, 2, 3, 5, 8, 13, 21]) if (x <= c) return c;\n  return 'partir';", l: 3 },
    { c: 'Calcula la ruta crítica: «rutaCritica(tareas)» recibe {t: {dur, deps:[...]}} y devuelve la duración mínima del proyecto.', f: 'rutaCritica', p: ['tareas'], t: [[[{ a: { dur: 2, deps: [] }, b: { dur: 3, deps: ['a'] }, c: { dur: 1, deps: ['a'] } }], 5], [[{}], 0], [[{ a: { dur: 2, deps: [] }, b: { dur: 2, deps: ['a'] }, c: { dur: 4, deps: ['a'] }, d: { dur: 1, deps: ['b', 'c'] } }], 7]], sol: '  const m = {};\n  const fin = t => m[t] ?? (m[t] = tareas[t].dur + Math.max(0, ...tareas[t].deps.map(fin)));\n  return Math.max(0, ...Object.keys(tareas).map(fin));', l: 4 }
  ],
  gen: function (g) {
    g.times(16, function (R) { var o = R.int(1, 4), m = R.int(4, 8), p = m + R.pick([2, 4, 8, 14]); g.input(2, 'Estima con PERT: optimista ' + o + ', probable ' + m + ' y pesimista ' + p + '. (Redondea a dos decimales)', +((o + 4 * m + p) / 6).toFixed(2), '(' + o + ' + 4×' + m + ' + ' + p + ') / 6.'); });
    g.times(10, function (R) { var n = R.int(3, 30); g.input(2, '¿Cuántas vías de comunicación hay en un equipo de ' + n + '?', n * (n - 1) / 2, n + ' × ' + (n - 1) + ' / 2.'); });
    g.times(6, function (R) { var a = R.int(1, 5), b = R.int(2, 6), c = R.int(1, 4), d = R.int(1, 8); g.input(3, 'Tareas: A (' + a + ' días), B depende de A (' + b + ' días), C depende de A (' + c + ' días), D depende de B y C (' + d + ' días). ¿Duración mínima total?', a + Math.max(b, c) + d, 'Ruta más larga: ' + a + ' + ' + Math.max(b, c) + ' + ' + d + '.'); });
  } });

S('m12', 'm12.risk', { title: 'Riesgos y economía del software',
  ask: '¿Qué concepto de gestión aplica?',
  lesson: `
> **La idea en simple.** Un riesgo es algo que todavía no ocurrió y podría dañarte. Antes de un viaje, revisas los frenos y llevas repuesto. Eso es gestionar riesgos: decidir antes de que sea urgente.

## El proceso
:::flow Identificar | Analizar | Planificar respuesta | Monitorear

## Exposición al riesgo
**Exposición = probabilidad × impacto.** Sirve para decidir qué atender primero.
~~~js
const riesgos = [
  { nombre: "Se va el único experto", p: 0.2, impacto: 30000 },
  { nombre: "Cambio legal", p: 0.1, impacto: 10000 },
  { nombre: "Falla del proveedor", p: 0.5, impacto: 8000 }
];
riesgos
  .map(r => ({ ...r, exp: r.p * r.impacto }))
  .sort((a, b) => b.exp - a.exp)
  .forEach(r => console.log(r.nombre, r.exp));
~~~

## Estrategias de respuesta
- **Evitar:** cambiar el plan para eliminarlo.
- **Mitigar:** reducir probabilidad o impacto.
- **Transferir:** que lo asuma otro (seguro, proveedor).
- **Aceptar:** asumirlo, con un plan de contingencia.

## Economía del software
- **Costo de oportunidad:** lo que dejas de hacer al elegir esto.
- **Construir o comprar:** ¿es esto lo que te diferencia? Si no, cómpralo.
- **Retorno de inversión:** ROI = (ganancia − costo) ÷ costo.
- **Valor actual:** un sol hoy vale más que un sol dentro de cinco años.
- **Costo de la demora:** cuánto pierdes cada semana sin lanzar.

## Herramientas para gestionar
Diagrama de Gantt para visualizar dependencias, y valor ganado para medir avance contra lo gastado. Comunicación: decir pronto las malas noticias.

## Ley de Conway
"Las organizaciones diseñan sistemas que reflejan su estructura de comunicación." Tres equipos producen tres servicios, se necesiten o no.

## Puntos que no debes omitir
- Un riesgo ocurrido es un **problema**; ya no es riesgo.
- Lista de 5 a 10 riesgos revisada con frecuencia: no un documento olvidado.
- Un postmortem sin culpas se pregunta qué falló en el sistema y no quién.

! Error común: crear una lista de riesgos al inicio y no volver a mirarla jamás.`,
  links: [['m2.prob', 'la exposición es valor esperado'], ['m12.est', 'los riesgos alimentan los márgenes'], ['m13.styles', 'la ley de Conway influye en la arquitectura'], ['m17.ethics', 'hay riesgos que además son éticos y legales']],
  read: 'DeMarco y Lister, *Waltzing with Bears*; McConnell, *Rapid Development*; *PMBOK*.',
  terms: [
    ['Exposición', 'medida de un riesgo que multiplica probabilidad e impacto', ['20% de S/ 10 000 da S/ 2000.', 'Sirve para ordenar la lista de riesgos.', 'Decide cuánto vale prevenirlo.']],
    ['Mitigar', 'reducir la probabilidad o el impacto de un riesgo', ['Compartir conocimiento para que nadie sea indispensable.', 'Hacer una prueba de carga antes de lanzar.', 'Tener respaldos probados.']],
    ['Transferir', 'pasar el riesgo o sus consecuencias a un tercero', ['Contratar un seguro.', 'Usar un proveedor de nube con un acuerdo de servicio.', 'Una pasarela de pago asume el cumplimiento de tarjetas.']],
    ['Evitar', 'cambiar el plan para eliminar un riesgo', ['No se usa una tecnología sin soporte.', 'No se almacenan tarjetas para no tener esa responsabilidad.', 'Se saca del alcance una función riesgosa.']],
    ['Costo de oportunidad', 'valor de la mejor alternativa a la que se renuncia', ['Tres meses en un panel son tres meses sin vender la función clave.', 'Construir tu propio login en vez de usar uno ya hecho.', 'Una decisión también se mide por lo que deja fuera.']],
    ['ROI', 'relación entre ganancia neta e inversión', ['S/ 10 000 invertidos devuelven S/ 15 000: 50%.', 'Se justifica un proyecto ante gerencia.', 'Compara alternativas de inversión.']],
    ['Ley de Conway', 'los sistemas reflejan la estructura de comunicación de la organización', ['Tres equipos aislados producen tres servicios mal conectados.', 'Se reorganiza el equipo para obtener la arquitectura deseada.', 'Dos áreas sin diálogo producen integraciones pobres.']]
  ],
  q: [
    { o: 'Ordena la gestión de riesgos.', s: ['Identificar', 'Analizar', 'Planificar la respuesta', 'Monitorear'], e: 'Es un ciclo que se repite.', l: 2 },
    ['Solo una persona conoce los pagos. ¿Qué acción mitiga el riesgo?', 'Documentar y rotar conocimiento con revisión y pareja', ['Pagarle menos', 'Ignorarlo', 'Quitar los pagos'], 'Eleva el factor de autobús.', 3],
    ['¿Construir tu propio sistema de login o usar uno probado?', 'Usar uno probado, salvo que sea tu diferenciador', ['Siempre construir', 'Siempre pagar lo más caro', 'No tener login'], 'Es una decisión de construir o comprar.', 3],
    ['Falló la base de datos y un servicio cayó. ¿Qué es un buen postmortem?', 'Línea de tiempo, causas de sistema y acciones, sin buscar culpables', ['Nombrar al responsable', 'No hablar de ello', 'Despedir a alguien'], 'La culpa oculta información; la seguridad psicológica la revela.', 4],
    ['Un proyecto cuesta S/ 20 000 y genera S/ 30 000. ¿Cuál es el ROI?', '50%', ['150%', '10%', '33%'], '(30 − 20) / 20.', 3],
    { c: 'Calcula «exposicion(p, i)» con p en porcentaje.', f: 'exposicion', p: ['p', 'i'], t: [[[10, 1000], 100], [[50, 80], 40]], sol: '  return p / 100 * i;', l: 2 },
    { c: 'Ordena riesgos: «priorizarRiesgos(l)» recibe [{n, p, i}] (p de 0 a 1) y devuelve los nombres por exposición de mayor a menor.', f: 'priorizarRiesgos', p: ['l'], t: [[[[{ n: 'a', p: 0.1, i: 10 }, { n: 'b', p: 0.5, i: 10 }]], ['b', 'a']], [[[]], []]], sol: '  return [...l].sort((a, b) => b.p * b.i - a.p * a.i).map(x => x.n);', l: 3 },
    { c: 'Decide invertir: «valeLaPena(p, impacto, costoMitigar, nuevaP)» devuelve true si bajar el riesgo ahorra más que su costo.', f: 'valeLaPena', p: ['p', 'impacto', 'costoMitigar', 'nuevaP'], t: [[[0.5, 10000, 1000, 0.1], true], [[0.1, 1000, 500, 0.05], false]], sol: '  return (p - nuevaP) * impacto > costoMitigar;', l: 4 },
    { c: 'Calcula valor actual neto: «van(tasa, flujos)» con flujos desde el año 0, redondeado a dos decimales.', f: 'van', p: ['tasa', 'flujos'], t: [[[0.1, [-100, 110]], 0], [[0, [-5, 10]], 5]], sol: '  return Math.round(flujos.reduce((s, f, t) => s + f / (1 + tasa) ** t, 0) * 100) / 100;', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var p = R.pick([5, 10, 20, 25, 40, 50]), i = R.pick([2000, 5000, 10000, 20000]); g.input(2, 'Riesgo con ' + p + '% de probabilidad e impacto de S/ ' + i + '. ¿Cuál es la exposición?', p * i / 100, p / 100 + ' × ' + i + '.'); });
    g.times(8, function (R) { var c = R.pick([1000, 2000, 5000, 10000]), f = R.pick([1.1, 1.25, 1.5, 2]), v = c * f; g.input(2, 'Inviertes S/ ' + c + ' y recuperas S/ ' + v + '. ¿Cuál es el ROI en %?', Math.round((f - 1) * 100), '(' + v + ' − ' + c + ') / ' + c + '.'); });
  } });
})();
