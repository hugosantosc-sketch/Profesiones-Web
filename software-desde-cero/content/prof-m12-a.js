(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m12', { prof: true });

D('m12.life', `## DevOps: el ciclo que no termina
En los modelos clásicos, el ciclo de vida terminaba con la entrega y empezaba otro, el de mantenimiento. En los productos digitales modernos no hay "entrega final": el software se planifica, construye, prueba, despliega, opera y mide en un **ciclo continuo**, muchas veces al día. Por eso el símbolo de DevOps es un ocho acostado (el signo de infinito) que une desarrollo y operaciones. Esto cambia lo que significa "terminar": una funcionalidad está terminada cuando está en producción y se comprobó que aporta valor, no cuando pasó las pruebas.

## Elegir un ciclo de vida: criterios
| Si el proyecto tiene… | Conviene… |
| Requisitos estables y bien conocidos, contrato a precio fijo | Cascada o en V, con entregas por etapas |
| Mucha incertidumbre técnica y riesgos graves | Espiral o prototipos guiados por el riesgo |
| Requisitos que cambian y un cliente disponible | Iterativo e incremental ágil |
| Software crítico para la vida (médico, aviación) | Modelo en V con verificación formal en cada nivel |
| Un producto en línea con usuarios reales | Entrega continua con experimentos |
Muchos proyectos reales son **híbridos**: una fase inicial planificada (arquitectura, contrato, presupuesto) seguida de iteraciones ágiles para construir.

## Ejemplo resuelto: el ciclo de vida de PatioApp
- **Fase inicial (4 semanas):** visión, mapa de interesados, requisitos de calidad, arquitectura base y presupuesto. Se usa un enfoque planificado porque gerencia necesita aprobar la inversión.
- **Construcción iterativa:** sprints de dos semanas con entregas a un patio piloto desde el segundo mes.
- **Expansión:** cuando el piloto funciona, despliegue sede por sede, con métricas de uso y de errores.
- **Operación continua:** despliegues semanales, monitoreo y un backlog alimentado por las métricas y por los operadores.`);

D('m12.agile', `## Los eventos de Scrum en detalle
La Guía de Scrum de 2020 fija duraciones máximas para un sprint de un mes; para sprints más cortos, suelen ser proporcionalmente menores:
| Evento | Duración máxima (sprint de 1 mes) | Propósito |
| Sprint | 1 mes | contenedor de todos los eventos; produce un incremento terminado |
| Planificación del sprint | 8 horas | por qué es valioso el sprint, qué se hará y cómo |
| Scrum diario | 15 minutos | inspeccionar el avance hacia el objetivo del sprint y ajustar el plan |
| Revisión del sprint | 4 horas | mostrar el incremento a los interesados y adaptar el backlog |
| Retrospectiva | 3 horas | mejorar la forma de trabajar del equipo |
Los tres **artefactos** tienen cada uno un compromiso: el backlog del producto tiene el **objetivo del producto**; el backlog del sprint, el **objetivo del sprint**; y el incremento, la **definición de terminado**.

## Ejemplo resuelto: un sprint de PatioApp
- **Objetivo del sprint:** "Los operadores del patio piloto pueden registrar salidas con cobro en efectivo".
- **Planificación:** el equipo de 5 personas, con una velocidad media de 21 puntos, toma 5 historias (19 puntos) y deja margen para imprevistos.
- **Scrum diario:** el tercer día aparece un impedimento (no hay credenciales de prueba de la pasarela); el Scrum Master lo gestiona con el proveedor.
- **Revisión:** se muestra el flujo en una tablet a dos operadores, que piden un botón más grande para confirmar; se agrega al backlog.
- **Retrospectiva:** el equipo acuerda escribir los escenarios Gherkin antes de empezar cada historia, porque dos historias se rehicieron por malentendidos.`);

D('m12.est', `## Descomponer para estimar mejor
Estimar algo grande de una vez es casi adivinar; estimar muchas partes pequeñas y sumar reduce el error, porque los errores de las partes tienden a compensarse. La herramienta clásica es la **estructura de desglose del trabajo** (EDT, o WBS en inglés): un árbol que divide el proyecto en entregables y estos en paquetes de trabajo, hasta que cada paquete se pueda estimar con confianza (una regla habitual: entre 8 y 80 horas de trabajo). La regla del **100 %** exige que el árbol incluya **todo** el trabajo, incluidos la gestión, las pruebas, la documentación y el despliegue, que son justamente lo que más se olvida.

## Estimación de tres puntos
La técnica PERT, creada en 1958 para el programa de misiles Polaris de la Armada de Estados Unidos, pide tres estimaciones por tarea: **optimista** (O), **más probable** (M) y **pesimista** (P). La estimación esperada es (O + 4M + P) / 6 y la desviación estándar, aproximadamente (P − O) / 6. Para un proyecto, las esperanzas se suman y, si las tareas son independientes, las varianzas también.
~~~js
// PERT: estimación esperada y desviación de un conjunto de tareas (en días)
const tareas = [[2, 3, 6], [1, 2, 4], [3, 5, 12], [1, 1, 2]];       // [optimista, probable, pesimista]
let esperado = 0, varianza = 0;
for (const [o, m, p] of tareas) { esperado += (o + 4 * m + p) / 6; varianza += ((p - o) / 6) ** 2; }
const sigma = Math.sqrt(varianza);
console.log('esperado:', esperado.toFixed(1), 'días; con ~84 % de confianza:', (esperado + sigma).toFixed(1));
~~~
Observa que la tarea con pesimista 12 aporta casi toda la incertidumbre: es la que hay que investigar primero o dividir.`);

D('m12.risk', `## Los riesgos más comunes del software
Barry Boehm publicó en 1991 su lista de los diez riesgos principales de los proyectos de software, que sigue sorprendentemente vigente:
1. Falta de personal o personal sin la experiencia necesaria.
2. Cronogramas y presupuestos irreales.
3. Desarrollar las funciones equivocadas.
4. Desarrollar la interfaz de usuario equivocada.
5. "Bañar en oro": agregar funciones que nadie pidió.
6. Un flujo continuo de cambios en los requisitos.
7. Fallas en componentes provistos por terceros.
8. Fallas en tareas realizadas por terceros.
9. Problemas de rendimiento en tiempo real.
10. Exigir más de lo que la tecnología disponible permite.
Para cada uno propuso técnicas de mitigación: contratar o capacitar, estimar con varios métodos, prototipos y análisis de usuarios, gestión de cambios con línea base, auditorías a proveedores y pruebas de rendimiento tempranas.

Una actualización de la lista, hecha por la industria décadas después, agregaría riesgos como la dependencia de servicios en la nube de un solo proveedor, las vulnerabilidades en bibliotecas de terceros y la pérdida de conocimiento cuando rota el personal.

## Ejemplo resuelto: registro de riesgos de PatioApp
| Riesgo | Probabilidad | Impacto (días) | Exposición | Respuesta |
| La conexión del patio es inestable y los operadores no pueden registrar | 0,6 | 20 | 12 | Mitigar: modo sin conexión desde el diseño |
| La integración con la SUNAT se demora por certificados | 0,4 | 15 | 6 | Mitigar: empezar el trámite el primer mes; usar un proveedor de facturación electrónica autorizado |
| Los operadores rechazan el sistema por ser más lento que el cuaderno | 0,3 | 30 | 9 | Mitigar: prototipos probados en la puerta y medición del tiempo por registro |
| El único desarrollador que conoce la pasarela renuncia | 0,2 | 10 | 2 | Mitigar: programación en pareja y documentación |
| Un cambio en la ley de datos personales exige rehacer el consentimiento | 0,1 | 5 | 0,5 | Aceptar y vigilar |
La reserva de contingencia del cronograma se estima con la suma de exposiciones (unos 30 días) y el registro se revisa en cada retrospectiva.`);

S('m12', 'm12.scale', { title: 'Agilidad a escala y diseño de organizaciones',
  ask: '¿Qué concepto de agilidad a escala o de organización de equipos se aplica?',
  lesson: `
> **La idea en simple.** Scrum funciona muy bien para un equipo de cinco a diez personas. Pero ¿qué pasa cuando un producto lo construyen 15 equipos, con 120 personas, que dependen unos de otros? Si cada equipo hace sus sprints por su lado, el producto no encaja. Los marcos de agilidad a escala intentan coordinar muchos equipos sin perder lo que hacía funcionar a uno solo, y el diseño de la organización resulta ser tan importante como el diseño del software.

## El problema de la escala
Al crecer, aparecen problemas que un solo equipo no tiene:
- **Dependencias:** el equipo de pagos necesita un cambio del equipo de cuentas antes de poder terminar.
- **Integración:** el código de 15 equipos debe funcionar junto, y los conflictos aparecen tarde.
- **Alineación:** cada equipo optimiza su parte y nadie ve el producto completo.
- **Comunicación:** el número de canales posibles entre n personas es n(n − 1)/2; con 120 personas son 7140.
Fred Brooks ya lo había advertido en 1975 con su ley: agregar personas a un proyecto atrasado lo atrasa más, en buena parte por ese costo de comunicación.

## Los marcos más conocidos
| Marco | Autor y año | Idea central |
| Scrum of Scrums | Jeff Sutherland, 1996 | un representante de cada equipo se reúne para coordinar dependencias |
| SAFe | Dean Leffingwell, 2011 | trenes de entrega de 50 a 125 personas que planifican juntos cada 8 a 12 semanas (planificación de incremento de programa) |
| LeSS | Craig Larman y Bas Vodde, 2008 | un solo producto, un solo backlog y un solo dueño de producto para hasta 8 equipos; "más con menos" |
| Nexus | Ken Schwaber, 2015 | de 3 a 9 equipos Scrum con un equipo de integración que garantiza un incremento integrado |
| Disciplined Agile | Scott Ambler y Mark Lines, 2012 | caja de herramientas para elegir prácticas según el contexto |
Las diferencias son de filosofía: **SAFe** agrega roles, eventos y niveles (portafolio, solución, programa), lo que lo hace atractivo para grandes empresas acostumbradas a la planificación, pero sus críticos (entre ellos varios firmantes del Manifiesto Ágil) lo consideran burocrático. **LeSS** propone lo contrario: quitar estructura, organizar equipos por funcionalidades de cliente y no por componentes, y cambiar la organización en lugar de agregar capas de coordinación.

## El "modelo Spotify" y su advertencia
En 2012 Henrik Kniberg y Anders Ivarsson describieron cómo trabajaba Spotify: **escuadras** (*squads*) autónomas de hasta 8 personas, agrupadas en **tribus**; **capítulos** que reúnen a especialistas de la misma disciplina entre escuadras; y **gremios** de interés común. Muchas empresas copiaron los nombres. Pero el propio Kniberg y exempleados de Spotify advirtieron que el documento describía una **aspiración** de un momento, que la empresa nunca lo aplicó de forma uniforme y que lo valioso era su cultura de autonomía y experimentación, no la estructura. Jeremiah Lee, que trabajó allí, publicó en 2020 *Spotify's Failed #SquadGoals*, describiendo cómo la autonomía sin coordinación creó problemas. La lección general: **no se copia un modelo organizacional**, se copian los principios y se adaptan.

## La ley de Conway y la maniobra inversa
Melvin Conway observó en 1968 que las organizaciones diseñan sistemas que **copian su estructura de comunicación**: si tres equipos construyen un compilador, saldrá un compilador de tres pasadas. Estudios posteriores lo respaldaron: Alan MacCormack, John Rusnak y Carliss Baldwin compararon en 2012 productos similares hechos por organizaciones muy distribuidas (proyectos de código abierto) y muy centralizadas (empresas) y encontraron que los primeros eran significativamente más modulares.

La **maniobra inversa de Conway** propone usar la ley a favor: primero decidir la arquitectura deseada y luego organizar los equipos para que la produzcan. Si queremos servicios independientes de tarifas, de patios y de facturación, conviene tener equipos que sean dueños de cada uno.

## Topologías de equipos
Matthew Skelton y Manuel Pais publicaron en 2019 *Team Topologies*, que se volvió una referencia para diseñar organizaciones de software. Proponen **cuatro tipos de equipo**:
- **Alineado al flujo** (*stream-aligned*): dueño de un flujo de valor de punta a punta (la experiencia del operador de patio). Es el tipo principal; los demás existen para ayudarlo.
- **Habilitador** (*enabling*): especialistas que ayudan temporalmente a otros equipos a adquirir una capacidad (pruebas automatizadas, observabilidad) y luego se retiran.
- **De subsistema complicado:** dueño de una parte que requiere conocimiento muy especializado (el motor de cálculo de tarifas con reglas fiscales, un algoritmo de visión por computadora).
- **De plataforma:** ofrece servicios internos de autoservicio (despliegue, bases de datos, monitoreo) para que los equipos de flujo no tengan que construirlos.
Y **tres modos de interacción**: **colaboración** (trabajar juntos un tiempo para descubrir algo), **X como servicio** (uno consume lo que el otro ofrece con una interfaz clara) y **facilitación** (uno ayuda al otro a aprender). Su idea central es cuidar la **carga cognitiva** de cada equipo: un equipo no puede ser dueño de más software del que puede entender.

## Planificación conjunta
Aunque los marcos difieren, casi todos incluyen algún momento de **planificación conjunta** entre equipos. En SAFe es la *PI Planning*: durante dos días, todos los equipos de un tren se reúnen (presencial o virtualmente), la dirección presenta la visión y las prioridades del negocio, y cada equipo planifica sus próximas iteraciones identificando las dependencias con los demás en un tablero común, donde cada dependencia se dibuja como un hilo rojo entre tarjetas. Al final, los equipos votan su confianza en el plan y se ajusta hasta que es razonable. Aun los críticos de SAFe reconocen el valor de este evento: hace visibles en dos días dependencias que de otro modo se descubrirían a mitad del trimestre. En LeSS, el equivalente es una planificación del sprint en dos partes, la primera con representantes de todos los equipos frente al único backlog.

## Métricas a escala
Con muchos equipos, la tentación es comparar velocidades. Es un error: los puntos de cada equipo son una escala propia. Lo que sí conviene medir a nivel de producto es el **flujo**: tiempo desde que una idea se aprueba hasta que llega a los usuarios, cuántos elementos se terminan por semana, cuántos quedan bloqueados por dependencias y cuánto tiempo pasan bloqueados. Mik Kersten propuso en *Project to Product* (2018) el **marco de flujo** con cuatro métricas (velocidad, tiempo, carga y eficiencia del flujo), que muestran dónde se atasca el trabajo entre equipos. Si las dependencias son la principal causa de demora, la solución no es más coordinación, sino rediseñar los equipos o la arquitectura.

## Coordinar sin burocracia
Prácticas que funcionan en cualquier marco:
- **Organizar equipos por funcionalidades de cliente** (equipos de características) y no por capas técnicas (un equipo de base de datos, uno de interfaz), para reducir dependencias.
- **Integración continua en una rama principal compartida**, para que los conflictos aparezcan en horas y no en meses.
- **Contratos de interfaz** explícitos entre equipos (APIs versionadas, eventos documentados).
- **Una revisión conjunta del producto** al final de cada iteración, con el producto integrado.
- **Planificación por objetivos** compartidos (OKR) en lugar de listas de tareas impuestas.

## Ejemplo resuelto: PatioApp crece a cuatro equipos
La empresa compra otra cadena de patios y el equipo de 6 personas pasa a 26. Diseño:
1. **Equipos alineados al flujo:** "Operación de patio" (ingreso, salida, espacios), "Clientes y dueños" (portal, notificaciones) y "Facturación y convenios" (tarifas, comprobantes, aseguradoras).
2. **Equipo de plataforma:** despliegue, observabilidad y base de datos como servicios internos.
3. **Arquitectura alineada:** tres servicios principales, uno por equipo de flujo, con APIs versionadas (maniobra inversa de Conway).
4. **Coordinación:** un solo backlog de producto ordenado por una dueña de producto principal, revisión conjunta cada dos semanas con el producto integrado y un Scrum of Scrums semanal de 15 minutos para dependencias.
5. Se descarta adoptar SAFe completo: con 4 equipos, el costo de sus roles y eventos superaría su beneficio.`,
  links: [['m12.agile', 'los marcos a escala parten de Scrum para un equipo'], ['m13.styles', 'la ley de Conway liga la estructura de equipos con la arquitectura'], ['eq.teams', 'los factores humanos de los equipos se estudian en Equipos y gestión']],
  read: 'Skelton y Pais, *Team Topologies* (2019); Larman y Vodde, *Large-Scale Scrum* (2016); Conway (1968); Kniberg e Ivarsson (2012).',
  terms: [
    ['Agilidad a escala', 'aplicación de prácticas ágiles a muchos equipos que construyen un mismo producto', ['SAFe, LeSS, Nexus.', 'Coordina dependencias.', 'Busca un incremento integrado.']],
    ['SAFe', 'marco de agilidad a escala con trenes de entrega y planificación de incremento de programa cada 8 a 12 semanas', ['Leffingwell, 2011.', 'Agrega roles y niveles.', 'Criticado por burocrático.']],
    ['LeSS', 'marco que escala Scrum con un solo backlog y un solo dueño de producto para varios equipos', ['Larman y Vodde.', 'Equipos de características.', 'Quita estructura en vez de agregarla.']],
    ['Ley de Conway', 'observación de que los sistemas copian la estructura de comunicación de la organización que los diseña', ['Conway, 1968.', 'Tres equipos, tres pasadas.', 'Confirmada por MacCormack y otros.']],
    ['Maniobra inversa de Conway', 'organizar los equipos según la arquitectura que se desea obtener', ['Un equipo por servicio.', 'Usa la ley a favor.', 'Se decide la arquitectura primero.']],
    ['Equipo alineado al flujo', 'equipo dueño de un flujo de valor de punta a punta', ['Operación de patio.', 'Tipo principal en Team Topologies.', 'Los demás equipos lo apoyan.']],
    ['Equipo de plataforma', 'equipo que ofrece servicios internos de autoservicio a los equipos de flujo', ['Despliegue y monitoreo como servicio.', 'Reduce la carga cognitiva.', 'Interactúa como X como servicio.']],
    ['Carga cognitiva', 'cantidad de información que un equipo debe manejar para hacer su trabajo', ['Limita cuánto software puede poseer un equipo.', 'Concepto central de Skelton y Pais.', 'Se reduce con plataformas y límites claros.']]
  ],
  q: [
    ['¿Cuántos canales de comunicación posibles hay entre 10 personas?', '45', ['10', '20', '100'], 'n(n − 1)/2 = 45.', 2],
    ['¿Qué propone la maniobra inversa de Conway?', 'Organizar los equipos según la arquitectura deseada', ['Ignorar la estructura de equipos', 'Tener un solo equipo siempre', 'Cambiar la arquitectura cada sprint'], 'Usa la ley de Conway a favor.', 3],
    ['¿Qué diferencia filosófica hay entre SAFe y LeSS?', 'SAFe agrega roles y niveles de coordinación; LeSS busca quitar estructura y cambiar la organización', ['Son idénticos', 'LeSS es para equipos únicos', 'SAFe prohíbe Scrum'], 'Más estructura contra menos.', 3],
    ['¿Qué advirtieron Kniberg y exempleados sobre el "modelo Spotify"?', 'Que describía una aspiración, nunca se aplicó de forma uniforme y no debe copiarse como estructura', ['Que era obligatorio en Spotify', 'Que reemplaza a Scrum', 'Que solo sirve para música'], 'Se copian principios, no organigramas.', 3],
    ['En Team Topologies, ¿qué tipo de equipo ayuda temporalmente a otros a adquirir una capacidad?', 'Habilitador', ['De plataforma', 'Alineado al flujo', 'De subsistema complicado'], 'Luego se retira.', 2],
    ['¿Por qué conviene organizar equipos por funcionalidades de cliente y no por capas técnicas?', 'Porque reduce las dependencias entre equipos para entregar valor', ['Porque así hay más reuniones', 'Porque las capas no existen', 'Porque lo exige la ley'], 'Un equipo puede terminar una funcionalidad completa.', 3],
    ['MacCormack, Rusnak y Baldwin (2012) encontraron que los productos de organizaciones muy distribuidas eran…', 'Más modulares que los de organizaciones centralizadas', ['Menos modulares', 'Idénticos', 'Más lentos'], 'Evidencia empírica de la ley de Conway.', 4],
    { tf: 'Agregar más personas a un proyecto atrasado siempre lo acelera.', v: false, e: 'Ley de Brooks: el costo de comunicación y formación puede atrasarlo más.', l: 1 },
    { tf: 'Un equipo de plataforma existe para reducir la carga cognitiva de los equipos alineados al flujo.', v: true, e: 'Ofrece servicios de autoservicio.', l: 2 },
    { c: 'Escribe «canales(n)»: número de canales de comunicación posibles entre n personas.', f: 'canales', p: ['n'], t: [[[2], 1], [[10], 45], [[120], 7140], [[1], 0]], sol: '  return n * (n - 1) / 2;', l: 1 },
    { c: 'Escribe «dependenciasCruzadas(historias)»: cada historia es {equipo, dependeDe} (dependeDe es el equipo del que depende o null); devuelve cuántas historias dependen de un equipo distinto al suyo.', f: 'dependenciasCruzadas', p: ['historias'], t: [[[[{ equipo: 'A', dependeDe: 'B' }, { equipo: 'A', dependeDe: null }, { equipo: 'B', dependeDe: 'B' }]], 1], [[[]], 0]], sol: '  return historias.filter(h => h.dependeDe && h.dependeDe !== h.equipo).length;', l: 2 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var n = R.int(3, 60); g.input(2, '¿Cuántos canales de comunicación posibles hay entre ' + n + ' personas?', n * (n - 1) / 2, 'n(n − 1)/2.'); });
    var tip = [['Equipo dueño de la experiencia completa del operador de patio', 'Alineado al flujo'], ['Equipo que ofrece despliegue y monitoreo como servicios internos', 'De plataforma'], ['Equipo de especialistas que enseña pruebas automatizadas a otros y se retira', 'Habilitador'], ['Equipo dueño del motor de cálculo fiscal muy especializado', 'De subsistema complicado']];
    tip.forEach(function (t) { g.mcq(2, 'Según Team Topologies, ¿qué tipo de equipo es? ' + t[0], t[1], ['Alineado al flujo', 'De plataforma', 'Habilitador', 'De subsistema complicado'].filter(function (x) { return x !== t[1]; }), 'Cuatro tipos de equipo.'); });
    var mar = [['Un solo backlog y un solo dueño de producto para hasta 8 equipos', 'LeSS'], ['Trenes de entrega con planificación de incremento de programa', 'SAFe'], ['Equipo de integración que garantiza un incremento integrado de 3 a 9 equipos', 'Nexus'], ['Un representante por equipo se reúne para coordinar dependencias', 'Scrum of Scrums']];
    mar.forEach(function (m) { g.mcq(3, '¿Qué marco o práctica describe esto? ' + m[0], m[1], ['LeSS', 'SAFe', 'Nexus', 'Scrum of Scrums'].filter(function (x) { return x !== m[1]; }), 'Marcos de agilidad a escala.'); });
    var modo = [['Dos equipos trabajan juntos unas semanas para descubrir una solución nueva', 'Colaboración'], ['Un equipo usa la API de base de datos que ofrece otro sin reuniones', 'X como servicio'], ['Un equipo enseña a otro a usar trazas distribuidas', 'Facilitación']];
    modo.forEach(function (m) { g.mcq(3, '¿Qué modo de interacción es? ' + m[0], m[1], ['Colaboración', 'X como servicio', 'Facilitación', 'Subordinación'].filter(function (x) { return x !== m[1]; }), 'Tres modos de interacción.'); });
  },
  checks: [
    ['¿Qué problemas aparecen al pasar de un equipo a quince?', 'Dependencias, integración tardía, falta de alineación y explosión de canales de comunicación.'],
    ['Explica la ley de Conway y la maniobra inversa con un ejemplo.', 'El sistema copia la estructura de comunicación; si se quieren servicios de tarifas y de patios independientes, se crean equipos dueños de cada uno.'],
    ['Compara SAFe y LeSS.', 'SAFe agrega estructura (roles, niveles, planificación conjunta); LeSS la reduce, con un backlog y un dueño de producto únicos y equipos de características.'],
    ['¿Qué son los cuatro tipos de equipo de Team Topologies?', 'Alineado al flujo, habilitador, de subsistema complicado y de plataforma.']
  ],
  cites: ['Conway, M. (1968). How Do Committees Invent? *Datamation*, 14(4).', 'Skelton, M. y Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution.', 'Larman, C. y Vodde, B. (2016). *Large-Scale Scrum: More with LeSS*. Addison-Wesley.', 'MacCormack, A., Rusnak, J. y Baldwin, C. (2012). Exploring the Duality between Product and Organizational Architectures. *Research Policy*, 41(8).', 'Kniberg, H. e Ivarsson, A. (2012). *Scaling Agile @ Spotify with Tribes, Squads, Chapters & Guilds*.', 'Leffingwell, D. (2011). *Agile Software Requirements*. Addison-Wesley.'],
  project: { t: 'Diseño de una organización de producto',
    goal: 'Diseñar la estructura de equipos para un producto que crece.',
    steps: ['Elige un producto digital conocido y lista sus flujos de valor principales.', 'Propón equipos alineados al flujo, habilitadores, de subsistema y de plataforma, con su tamaño.', 'Dibuja la arquitectura que resultaría y verifica que coincide con los equipos (ley de Conway).', 'Define los modos de interacción entre equipos y las ceremonias de coordinación mínimas.', 'Compara tu diseño con lo que propondrían SAFe y LeSS y justifica tu elección.'],
    deliver: 'El diagrama de equipos, el de arquitectura y la justificación.' },
  hito: ['Diseña la organización de PatioApp para cuatro equipos según Team Topologies y documenta los modos de interacción.', 'Verifica con un diagrama que la arquitectura de servicios de PatioApp coincide con los equipos (maniobra inversa de Conway).']
});
SDC.after('m12.scale', 'm12.agile');
})();
