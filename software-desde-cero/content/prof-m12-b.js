(function () {
var S = SDC.S;

S('m12', 'm12.product', { title: 'Gestión de producto: visión, descubrimiento y experimentos',
  ask: '¿Qué concepto de gestión de producto se aplica?',
  lesson: `
> **La idea en simple.** Un equipo puede ser excelente construyendo software y aun así fracasar si construye lo que nadie quiere. La gestión de producto se ocupa de la pregunta anterior a "¿cómo lo hacemos?": **¿qué vale la pena hacer y cómo sabemos que funcionó?** En lugar de suponer que una idea es buena, se la trata como una hipótesis que hay que comprobar con la menor inversión posible.

## Proyecto y producto
Un **proyecto** tiene inicio y fin, un alcance y un presupuesto: termina cuando se entrega lo acordado. Un **producto** vive mientras tenga usuarios: su éxito no se mide por entregar a tiempo, sino por los **resultados** que logra (usuarios que resuelven su problema, ingresos, costos evitados). Mik Kersten, en *Project to Product* (2018), sostiene que muchas empresas tradicionales fracasan en lo digital porque gestionan su software como una sucesión de proyectos: equipos que se arman y desarman, conocimiento que se pierde y éxito medido por cumplir el plan en vez de por el valor generado.

La distinción clave es entre **entregables** (*output*: funcionalidades construidas) y **resultados** (*outcome*: cambios en el comportamiento de los usuarios o del negocio). "Lanzamos el portal de dueños" es un entregable; "el 60 % de los dueños consulta el estado de su unidad sin llamar al patio" es un resultado. Joshua Seiden lo resume en *Outcomes Over Output* (2019): un resultado es un cambio en el comportamiento humano que genera valor.

## Visión, estrategia y hoja de ruta
- La **visión del producto** describe el futuro que se quiere crear, en pocas frases y por varios años: "que ningún dueño tenga que llamar para saber dónde está su unidad ni cuánto debe".
- La **estrategia** elige cómo llegar: qué segmento atender primero, qué no hacer, en qué competir.
- La **hoja de ruta** (*roadmap*) comunica la dirección en el tiempo. Las hojas de ruta modernas se organizan por **problemas o resultados** ("ahora", "después", "más adelante") y no por funcionalidades con fechas exactas, porque prometer funcionalidades a seis meses es prometer algo que el equipo aún no sabe si resolverá el problema.
Una herramienta común para alinear objetivos son los **OKR** (*Objectives and Key Results*), creados por Andy Grove en Intel y difundidos por John Doerr en Google desde 1999: un **objetivo** cualitativo e inspirador, y de 3 a 5 **resultados clave** medibles. Por ejemplo: Objetivo "Que los dueños se sientan informados sin esfuerzo"; resultados clave: "las llamadas al patio bajan de 40 a 15 por día", "el 60 % de los dueños activa las notificaciones", "satisfacción de los dueños de 3,5 a 4,3 sobre 5".

## Los cuatro riesgos de un producto
Marty Cagan, en *Inspired* (2.ª ed., 2017), propone que antes de construir algo hay que reducir cuatro riesgos:
| Riesgo | Pregunta | Quién lo atiende |
| Valor | ¿Lo van a querer usar o comprar? | gestión de producto |
| Usabilidad | ¿Sabrán usarlo? | diseño |
| Factibilidad | ¿Podemos construirlo con el tiempo, la tecnología y las personas que tenemos? | ingeniería |
| Viabilidad del negocio | ¿Funciona para el negocio (legal, ventas, costos, marca)? | gestión de producto con el negocio |
El trabajo de reducir esos riesgos antes de construir se llama **descubrimiento de producto** (*product discovery*), y el de construir lo validado, **entrega**. Los equipos efectivos hacen ambos de forma continua y en paralelo. Teresa Torres propone en *Continuous Discovery Habits* (2021) que el equipo hable con clientes **cada semana** y organice lo que aprende en un **árbol de oportunidades y soluciones**: el resultado deseado en la raíz, las oportunidades (necesidades y dolores de los clientes) como ramas y las soluciones posibles como hojas, cada una con experimentos para probarla.

## Lean Startup y el producto mínimo viable
Eric Ries publicó en 2011 *The Lean Startup*, inspirado en la manufactura esbelta de Toyota y en el trabajo de Steve Blank sobre desarrollo de clientes. Su ciclo es **construir, medir, aprender**: convertir las ideas en hipótesis, construir lo mínimo para probarlas, medir el comportamiento real y decidir si **perseverar** o **pivotar** (cambiar de estrategia manteniendo lo aprendido).

El **producto mínimo viable** (MVP) es la versión que permite aprender lo máximo con el mínimo esfuerzo. Se malinterpreta mucho: no es una versión mala del producto final, sino un **experimento**. Ejemplos célebres:
- **Dropbox** (2007): antes de construir la sincronización, Drew Houston publicó un video de tres minutos mostrando cómo funcionaría; la lista de espera pasó de 5000 a 75 000 personas en una noche, lo que validó el valor.
- **Zappos** (1999): Nick Swinmurn fotografió zapatos en tiendas y, cuando alguien compraba en su web, iba a la tienda, los compraba y los enviaba. Validó que la gente compraría zapatos en línea sin tener inventario ni sistema.
- **MVP de mago de Oz:** el usuario cree que el sistema es automático, pero detrás hay una persona haciendo el trabajo a mano.
- **MVP de conserje:** el servicio se presta a mano y de forma personalizada a pocos clientes, que saben que es manual.
Henrik Kniberg dibujó en 2016 una analogía muy difundida: si el cliente necesita transportarse, no se le entrega primero una rueda, luego un chasis y al final un auto (no sirve hasta el final), sino una patineta, una bicicleta, una moto y un auto: cada versión resuelve el problema un poco mejor y permite aprender.

## Experimentos y métricas
Una hipótesis bien escrita dice qué se cree, qué se hará y qué resultado medible confirmaría o refutaría la creencia:
~~~txt
Creemos que los dueños llaman al patio porque no saben el estado de su unidad.
Si enviamos una notificación por WhatsApp en cada cambio de estado,
entonces las llamadas de los dueños notificados bajarán al menos un 40 % en 4 semanas,
comparadas con las de un grupo de dueños sin notificaciones.
~~~
Para medir, los productos usan marcos como el **embudo AARRR** de Dave McClure (2007): adquisición, activación, retención, recomendación (*referral*) e ingresos (*revenue*); o la **métrica estrella del norte**, una sola métrica que resume el valor que reciben los clientes (para PatioApp podría ser "unidades gestionadas por semana sin incidencias"). Las **pruebas A/B** comparan dos versiones asignando usuarios al azar; verás su estadística en Fundamentos de ingeniería.

Hay que cuidarse de las **métricas de vanidad**: números que siempre suben y hacen sentir bien, pero no ayudan a decidir (descargas totales, visitas acumuladas). Una métrica útil es **accionable** (si cambia, sabemos qué hacer), **comparable** (entre períodos o grupos) y preferentemente una **tasa** o un **cociente**.

## Priorizar oportunidades
Además de MoSCoW y valor contra costo, en producto se usan:
- **RICE** (Intercom, 2016): alcance × impacto × confianza ÷ esfuerzo.
- **Costo del retraso** (*cost of delay*, Don Reinertsen): cuánto valor se pierde por cada semana que algo no está; dividido entre la duración da el **CD3**, útil para ordenar.
- **Kano**, para distinguir lo básico de lo que entusiasma.
~~~js
// RICE: alcance (usuarios/trimestre) × impacto (0.25-3) × confianza (0-1) ÷ esfuerzo (personas-mes)
const ideas = [
  { idea: 'Notificaciones por WhatsApp', alcance: 3000, impacto: 2, confianza: 0.8, esfuerzo: 2 },
  { idea: 'Portal de dueños', alcance: 3000, impacto: 1, confianza: 0.5, esfuerzo: 4 },
  { idea: 'Escaneo de placas con cámara', alcance: 60, impacto: 3, confianza: 0.9, esfuerzo: 1 }
];
ideas.map(i => ({ ...i, rice: Math.round(i.alcance * i.impacto * i.confianza / i.esfuerzo) }))
     .sort((a, b) => b.rice - a.rice)
     .forEach(i => console.log(i.rice, i.idea));
~~~
Observa que RICE favorece lo que llega a muchos usuarios: el escaneo de placas, que solo usan 60 operadores, queda último aunque les ahorre mucho tiempo. Toda fórmula refleja supuestos; sirve para ordenar la conversación, no para reemplazar el juicio.

## Ejemplo resuelto: descubrimiento en PatioApp
1. **Resultado buscado:** reducir las llamadas de dueños al patio, que consumen 3 horas diarias de los supervisores.
2. **Entrevistas** a 8 dueños: llaman sobre todo para saber si su unidad ya fue inspeccionada y cuánto deben; casi todos usan WhatsApp y pocos entrarían a un portal.
3. **Árbol de oportunidades:** "no sé el estado" y "no sé cuánto debo" como oportunidades; soluciones posibles: portal web, notificaciones por WhatsApp, mensaje de texto.
4. **Experimento de conserje:** durante dos semanas, una supervisora envía a mano mensajes de WhatsApp a 50 dueños en cada cambio de estado. Las llamadas de ese grupo bajan un 55 % frente a un grupo de control.
5. **Decisión:** se construyen las notificaciones automáticas (validado el valor) y se posterga el portal. Ahorro: meses de desarrollo de un portal que pocos habrían usado.`,
  links: [['m11.elicit', 'el descubrimiento continuo usa técnicas de elicitación'], ['m12.est', 'la priorización por costo del retraso conecta con la estimación'], ['eco.exp', 'los experimentos y las pruebas A/B se estudian a fondo en Fundamentos de ingeniería']],
  read: 'Cagan, *Inspired* (2.ª ed., 2017); Ries, *The Lean Startup* (2011); Torres, *Continuous Discovery Habits* (2021); Seiden, *Outcomes Over Output* (2019).',
  terms: [
    ['Resultado (outcome)', 'cambio en el comportamiento de usuarios o del negocio que genera valor', ['Bajan las llamadas al patio.', 'Se diferencia del entregable.', 'Seiden, 2019.']],
    ['Hoja de ruta', 'comunicación de la dirección del producto en el tiempo, idealmente organizada por problemas o resultados', ['Ahora, después, más adelante.', 'No promete fechas exactas de funciones.', 'Se revisa con frecuencia.']],
    ['OKR', 'método de objetivos cualitativos con resultados clave medibles', ['Grove en Intel, Doerr en Google.', 'De 3 a 5 resultados clave.', 'Alinea equipos.']],
    ['Descubrimiento de producto', 'trabajo continuo de reducir los riesgos de valor, usabilidad, factibilidad y viabilidad antes de construir', ['Cagan, Inspired.', 'Entrevistas semanales.', 'Árbol de oportunidades de Torres.']],
    ['Producto mínimo viable', 'versión que permite aprender lo máximo con el mínimo esfuerzo', ['El video de Dropbox.', 'Las fotos de zapatos de Zappos.', 'Es un experimento, no un producto malo.']],
    ['Pivotar', 'cambiar de estrategia conservando lo aprendido cuando una hipótesis se refuta', ['Concepto de Lean Startup.', 'Se opone a perseverar.', 'Se decide con datos.']],
    ['Métrica de vanidad', 'número que siempre sube y hace sentir bien pero no ayuda a decidir', ['Descargas totales.', 'Visitas acumuladas.', 'Se reemplaza por tasas accionables.']],
    ['RICE', 'fórmula de priorización: alcance por impacto por confianza dividido entre esfuerzo', ['Creada en Intercom.', 'Favorece lo que llega a muchos.', 'Ordena la conversación.']]
  ],
  q: [
    ['¿Cuál de estos es un resultado y no un entregable?', 'El 60 % de los dueños consulta el estado sin llamar', ['Lanzamos el portal de dueños', 'Terminamos 12 historias', 'Desplegamos la versión 2.0'], 'Un resultado es un cambio de comportamiento.', 2],
    ['Según Cagan, ¿qué riesgo se reduce preguntando "¿lo van a querer usar o comprar?"?', 'El riesgo de valor', ['El de factibilidad', 'El de usabilidad', 'El de viabilidad'], 'Cuatro riesgos de producto.', 2],
    ['¿Qué validó el video de Dropbox de 2007?', 'Que había demanda por el producto antes de construirlo', ['Que la sincronización era técnicamente posible', 'Que el precio era correcto', 'Nada'], 'La lista de espera creció de 5000 a 75 000.', 3],
    ['¿Qué es un MVP de mago de Oz?', 'Un experimento en que el usuario cree que el sistema es automático pero una persona hace el trabajo', ['Un producto con magia', 'Un prototipo de papel', 'Una versión con todos los defectos'], 'Valida el valor sin construir la automatización.', 3],
    ['¿Por qué las descargas totales son una métrica de vanidad?', 'Porque siempre suben y no indican qué decisión tomar', ['Porque son difíciles de medir', 'Porque son ilegales', 'Porque bajan siempre'], 'Conviene usar tasas accionables.', 2],
    ['¿Por qué las hojas de ruta modernas se organizan por problemas y no por funciones con fecha?', 'Porque aún no se sabe qué solución resolverá el problema, y prometer funciones a meses es prometer sin saber', ['Porque las fechas están prohibidas', 'Porque así es más largo', 'Por costumbre'], 'Ahora, después, más adelante.', 3],
    ['Una idea tiene alcance 1000, impacto 2, confianza 0,5 y esfuerzo 2. ¿Cuál es su puntaje RICE?', '500', ['2000', '1000', '250'], '1000 × 2 × 0,5 ÷ 2 = 500.', 3],
    { tf: 'Un MVP es la primera versión del producto final con menos calidad.', v: false, e: 'Es un experimento para aprender con el mínimo esfuerzo.', l: 2 },
    { tf: 'En el ciclo de Lean Startup, pivotar significa cambiar de estrategia conservando lo aprendido.', v: true, e: 'Se pivota cuando la hipótesis se refuta.', l: 2 },
    { c: 'Escribe «rice(idea)»: idea es {alcance, impacto, confianza, esfuerzo}; devuelve el puntaje RICE redondeado al entero.', f: 'rice', p: ['idea'], t: [[[{ alcance: 1000, impacto: 2, confianza: 0.5, esfuerzo: 2 }], 500], [[{ alcance: 60, impacto: 3, confianza: 0.9, esfuerzo: 1 }], 162]], sol: '  return Math.round(idea.alcance * idea.impacto * idea.confianza / idea.esfuerzo);', l: 2 },
    { c: 'Escribe «reduccion(control, tratamiento)»: llamadas promedio de cada grupo; devuelve el porcentaje entero de reducción del tratamiento respecto del control.', f: 'reduccion', p: ['control', 'tratamiento'], t: [[[20, 9], 55], [[10, 10], 0], [[8, 2], 75]], sol: '  return Math.round(100 * (control - tratamiento) / control);', l: 2 },
    ['Un experimento de conserje muestra que las llamadas bajan un 55 % con notificaciones manuales. ¿Qué conviene hacer?', 'Construir las notificaciones automáticas, porque el valor quedó validado', ['Abandonar la idea', 'Construir primero el portal web', 'Repetir el experimento indefinidamente'], 'Se persevera con lo validado.', 4]
  ],
  gen: function (g) {
    var rk = [['¿Los dueños quieren recibir notificaciones?', 'Valor'], ['¿Los operadores entenderán la nueva pantalla?', 'Usabilidad'], ['¿Podemos leer placas con la cámara de un celular barato?', 'Factibilidad'], ['¿El área legal permite enviar mensajes por WhatsApp?', 'Viabilidad del negocio'], ['¿Pagarían las aseguradoras por un reporte mensual?', 'Valor'], ['¿Tenemos personas que sepan integrar la pasarela a tiempo?', 'Factibilidad']];
    rk.forEach(function (r) { g.mcq(2, 'Según Cagan, ¿qué riesgo aborda esta pregunta? ' + r[0], r[1], ['Valor', 'Usabilidad', 'Factibilidad', 'Viabilidad del negocio'].filter(function (x) { return x !== r[1]; }), 'Cuatro riesgos del producto.'); });
    g.times(6, function (R) { var a = R.pick([100, 500, 1000, 3000]), i = R.pick([0.5, 1, 2, 3]), c = R.pick([0.5, 0.8, 1]), e = R.pick([1, 2, 4]); g.input(3, 'Calcula el puntaje RICE con alcance ' + a + ', impacto ' + i + ', confianza ' + c + ' y esfuerzo ' + e + '. (redondea al entero)', Math.round(a * i * c / e), 'Alcance × impacto × confianza ÷ esfuerzo.'); });
    var oo = [['Publicamos la app en la tienda', 'Entregable'], ['Los dueños llaman 40 % menos', 'Resultado'], ['Terminamos el módulo de reportes', 'Entregable'], ['El 70 % de los operadores registra salidas en menos de 10 segundos', 'Resultado'], ['Agregamos 15 pantallas nuevas', 'Entregable']];
    oo.forEach(function (o) { g.mcq(1, '¿Es un entregable o un resultado? ' + o[0], o[1], ['Entregable', 'Resultado', 'Riesgo'].filter(function (x) { return x !== o[1]; }).concat(['Hipótesis']), 'Output contra outcome.'); });
  },
  checks: [
    ['Diferencia proyecto y producto, y entregable y resultado.', 'El proyecto termina al entregar; el producto vive mientras tenga usuarios. El entregable es lo construido; el resultado, el cambio de comportamiento que genera valor.'],
    ['¿Cuáles son los cuatro riesgos de un producto según Cagan?', 'Valor, usabilidad, factibilidad y viabilidad del negocio.'],
    ['Escribe una hipótesis de producto medible para una app que uses.', 'Debe decir qué se cree, qué se hará y qué cambio medible, en qué plazo y contra qué comparación, la confirmaría.'],
    ['¿Qué es un MVP y qué no es?', 'Es el experimento que permite aprender lo máximo con el mínimo esfuerzo; no es una versión mala del producto final.']
  ],
  cites: ['Cagan, M. (2017). *Inspired: How to Create Tech Products Customers Love* (2.ª ed.). Wiley.', 'Ries, E. (2011). *The Lean Startup*. Crown Business.', 'Torres, T. (2021). *Continuous Discovery Habits*. Product Talk.', 'Seiden, J. (2019). *Outcomes Over Output*. Sense & Respond Press.', 'Doerr, J. (2018). *Measure What Matters*. Portfolio.', 'Kersten, M. (2018). *Project to Product*. IT Revolution.'],
  project: { t: 'Descubrimiento de una oportunidad',
    goal: 'Validar una idea de producto antes de construirla.',
    steps: ['Elige un problema cotidiano y define un resultado medible que quieras lograr.', 'Entrevista a cinco personas afectadas y construye un árbol de oportunidades y soluciones.', 'Escribe la hipótesis de la solución más prometedora con su métrica y su umbral.', 'Diseña y ejecuta un MVP barato (conserje, mago de Oz, página de aterrizaje o video).', 'Analiza los resultados y decide si perseverar o pivotar.'],
    deliver: 'Las notas de entrevistas, el árbol, la hipótesis, el experimento y la decisión justificada.' },
  hito: ['Define la visión, los OKR del trimestre y la hoja de ruta por resultados de PatioApp.', 'Diseña el experimento de conserje de notificaciones a dueños de PatioApp con su hipótesis, grupo de control y umbral de decisión.']
});
SDC.after('m12.product', 'm12.scale');

S('m12', 'm12.improve', { title: 'Calidad y mejora de procesos: CMMI, ISO y métricas',
  ask: '¿Qué modelo o concepto de mejora de procesos se aplica?',
  lesson: `
> **La idea en simple.** Un buen cocinero puede hacer un plato excelente un día y uno mediocre al siguiente si no sigue una receta ni aprende de sus errores. Un restaurante que quiere calidad **constante** necesita procesos: recetas, controles, y la costumbre de revisar qué salió mal para mejorarlo. En el software pasa lo mismo: la mejora de procesos busca que la calidad no dependa de la suerte ni de un héroe, sino de una forma de trabajar que se mide y mejora continuamente.

## La idea de fondo: calidad del proceso
La premisa, heredada de la manufactura, es que **la calidad del producto depende en gran medida de la calidad del proceso** que lo produce. Walter Shewhart, en los Laboratorios Bell en la década de 1920, desarrolló el control estadístico de procesos; W. Edwards Deming lo llevó a Japón después de la Segunda Guerra Mundial, donde ayudó a crear la reputación de calidad de la industria japonesa, y popularizó el ciclo **PDCA**:
1. **Planificar** (*Plan*): identificar un problema y proponer un cambio.
2. **Hacer** (*Do*): aplicar el cambio a pequeña escala.
3. **Verificar** (*Check*): medir si mejoró.
4. **Actuar** (*Act*): adoptar el cambio si funcionó, o ajustarlo y repetir.
Las retrospectivas de Scrum son, en esencia, un ciclo PDCA cada pocas semanas. Watts Humphrey, que dirigió el desarrollo de software en IBM, llevó estas ideas al software en el Instituto de Ingeniería de Software (SEI) de la Universidad Carnegie Mellon a fines de los ochenta.

## CMM y CMMI
El Departamento de Defensa de Estados Unidos sufría proyectos de software contratados que fracasaban; necesitaba una forma de evaluar a los proveedores. El SEI publicó en 1991 el **CMM** (*Capability Maturity Model*), basado en el trabajo de Humphrey, y luego el **CMMI** (*Capability Maturity Model Integration*), que hoy gestiona el ISACA y cuya versión 3.0 es de 2023. Su idea central son los **niveles de madurez**:
| Nivel | Nombre | Característica |
| 1 | Inicial | el éxito depende del esfuerzo heroico de individuos; procesos impredecibles |
| 2 | Gestionado | los proyectos se planifican, se siguen y se controlan; los requisitos se gestionan |
| 3 | Definido | la organización tiene procesos estándar que cada proyecto adapta |
| 4 | Gestionado cuantitativamente | el proceso se controla con métricas y estadística |
| 5 | En optimización | mejora continua basada en datos y en innovación |
Cada nivel agrupa **áreas de práctica** (gestión de requisitos, planificación, aseguramiento de calidad, gestión de la configuración, verificación, análisis causal, entre otras). Las empresas se evalúan con un método formal (SCAMPI, reemplazado en la versión 3.0 por el método de evaluación de CMMI) y muchas licitaciones exigen un nivel mínimo; India se convirtió en una potencia de servicios de software en parte gracias a la gran cantidad de empresas certificadas en niveles altos.

**Críticas.** El CMMI fue acusado de favorecer la documentación sobre el resultado, de ser caro para empresas pequeñas y de que algunas organizaciones "actúan" el nivel para la evaluación. Sus defensores responden que las prácticas son compatibles con métodos ágiles (la versión 2.0 de 2018 incorporó guías explícitas para ágil) y que el problema está en la aplicación burocrática, no en el modelo.

## Normas ISO para procesos de software
- **ISO 9001:** norma general de gestión de la calidad para cualquier organización; su guía de aplicación al software es la **ISO/IEC/IEEE 90003**.
- **ISO/IEC/IEEE 12207:** define los procesos del ciclo de vida del software (adquisición, suministro, desarrollo, operación, mantenimiento y procesos de soporte). Es el vocabulario común para contratos.
- **ISO/IEC 15504**, conocida como SPICE, y su sucesora la serie **ISO/IEC 33000**: evaluación de la capacidad de procesos, similar en espíritu al CMMI. El sector automotriz usa su variante **Automotive SPICE**.
- **ISO/IEC 29110:** perfiles de ciclo de vida para **entidades muy pequeñas** (hasta 25 personas), con un perfil básico centrado en dos procesos: gestión del proyecto e implementación del software. Es muy relevante en América Latina, donde la mayoría de las empresas de software son pequeñas; en el Perú está adoptada como **Norma Técnica Peruana NTP-ISO/IEC 29110** y ha sido promovida para mejorar la competitividad de las pymes de software.

## Medir para mejorar: GQM
Medir por medir produce montañas de datos inútiles. Victor Basili y David Weiss propusieron en 1984 el enfoque **GQM** (*Goal-Question-Metric*): primero se define el **objetivo** ("reducir los defectos que llegan a producción"), luego las **preguntas** que indican si se avanza ("¿cuántos defectos se escapan por versión?", "¿en qué etapa se introdujeron?") y solo después las **métricas** que responden cada pregunta (defectos en producción por versión, porcentaje de defectos según su etapa de origen). Así cada métrica tiene una razón de existir.

Una métrica clásica de calidad del proceso es la **eficacia de eliminación de defectos** (DRE, *Defect Removal Efficiency*), que Capers Jones usó en miles de proyectos: el porcentaje de defectos encontrados antes de la entrega respecto del total (los de antes más los encontrados por los usuarios en los primeros meses). Jones reportó que el promedio de la industria estaba cerca del 85 %, y que las organizaciones de mejor desempeño, que combinan inspecciones, análisis estático y pruebas, superaban el 95 %.
~~~js
// Eficacia de eliminación de defectos
function dre(antesDeEntrega, encontradosPorUsuarios) {
  return Math.round(1000 * antesDeEntrega / (antesDeEntrega + encontradosPorUsuarios)) / 10;
}
console.log('versión 1.0:', dre(170, 30) + '%');   // 85 %
console.log('versión 1.1:', dre(190, 8) + '%');    // tras agregar revisiones de código y análisis estático
~~~

## El Personal Software Process
Watts Humphrey llevó la mejora de procesos también al nivel **individual** con el **PSP** (*Personal Software Process*, 1995): cada programador registra el tiempo que dedica a cada fase y los defectos que introduce y elimina, estima sus tareas con sus propios datos históricos y revisa su código con listas de verificación construidas a partir de sus errores frecuentes. Su complemento para equipos es el **TSP** (*Team Software Process*). Aunque pocos lo practican hoy de forma completa, su idea sobrevive: llevar un registro de los propios errores frecuentes y revisarlos antes de entregar es uno de los hábitos más rentables que puede tener un programador.

## Mejora de procesos en equipos ágiles
La mejora no requiere un modelo formal. En equipos ágiles funciona así:
- **Retrospectivas** con acciones concretas, un responsable y verificación en la siguiente retrospectiva (si las mismas quejas se repiten sin cambios, la retrospectiva se volvió un ritual).
- **Análisis de causa raíz** de los incidentes y defectos importantes, sin buscar culpables, que verás en Fundamentos de ingeniería.
- **Métricas de flujo** (tiempo de ciclo, trabajo en curso, rendimiento) y de entrega (las métricas DORA que verás en DevOps), revisadas periódicamente.
- **Kaizen**: pequeñas mejoras continuas, palabra japonesa que significa "cambio para mejor".
- **Mapeo del flujo de valor** (*value stream mapping*): dibujar todos los pasos desde la idea hasta producción, con el tiempo de trabajo real y el de espera de cada uno. Casi siempre revela que el trabajo pasa la mayor parte del tiempo esperando (aprobaciones, entornos de prueba, revisiones), no siendo trabajado.

## Ejemplo resuelto: mejorar la calidad de las versiones de PatioApp
1. **Objetivo (GQM):** reducir los defectos que llegan a los patios.
2. **Preguntas:** ¿cuántos defectos se escapan por versión? ¿Dónde se originan? ¿Cuánto tardamos en corregirlos?
3. **Métricas:** DRE por versión, clasificación de cada defecto por origen (requisito, diseño, código, configuración) y tiempo medio de corrección.
4. **Diagnóstico tras tres versiones:** DRE del 85 %; el 40 % de los defectos escapados viene de requisitos mal entendidos (reglas de tarifas) y el 30 % de configuración entre sedes.
5. **Ciclo PDCA:** se introduce la escritura de escenarios Gherkin con el área comercial para toda regla de tarifa, y pruebas automáticas de la configuración de cada sede. Tras dos versiones, la DRE sube al 96 % y se adopta la práctica de forma permanente.
6. Para presentarse a una licitación pública, la empresa decide además implementar el perfil básico de la NTP-ISO/IEC 29110, que formaliza la gestión del proyecto y la implementación que ya practica.`,
  links: [['m12.agile', 'las retrospectivas son ciclos de mejora continua'], ['eco.measure', 'la medición en ingeniería se estudia en Fundamentos de ingeniería'], ['m14.metrics', 'las métricas de calidad del producto complementan las del proceso']],
  read: 'Chrissis, Konrad y Shrum, *CMMI for Development* (3.ª ed., 2011); Humphrey, *Managing the Software Process* (1989); Basili y Weiss (1984); NTP-ISO/IEC 29110.',
  terms: [
    ['Ciclo PDCA', 'ciclo de mejora continua: planificar, hacer, verificar y actuar', ['Shewhart y Deming.', 'Las retrospectivas lo aplican.', 'Se repite sin fin.']],
    ['CMMI', 'modelo de madurez de procesos con cinco niveles, de inicial a en optimización', ['Creado en el SEI.', 'Gestionado hoy por ISACA.', 'Exigido en muchas licitaciones.']],
    ['Nivel de madurez', 'grado en que una organización tiene procesos definidos, medidos y en mejora', ['Nivel 1: éxito por héroes.', 'Nivel 3: procesos estándar.', 'Nivel 5: mejora continua con datos.']],
    ['ISO/IEC 29110', 'norma de perfiles de ciclo de vida para entidades muy pequeñas de hasta 25 personas', ['Adoptada como NTP en el Perú.', 'Perfil básico con dos procesos.', 'Pensada para pymes.']],
    ['ISO/IEC/IEEE 12207', 'norma que define los procesos del ciclo de vida del software', ['Adquisición, desarrollo, operación…', 'Vocabulario común para contratos.', 'Base de otros modelos.']],
    ['GQM', 'enfoque de medición que parte de objetivos, deriva preguntas y luego métricas', ['Basili y Weiss, 1984.', 'Cada métrica tiene un porqué.', 'Evita medir por medir.']],
    ['Eficacia de eliminación de defectos', 'porcentaje de defectos encontrados antes de la entrega respecto del total', ['Capers Jones.', 'Promedio cercano al 85 %.', 'Los mejores superan el 95 %.']],
    ['Mapeo del flujo de valor', 'diagrama de todos los pasos desde la idea hasta producción con sus tiempos de trabajo y de espera', ['Revela esperas largas.', 'Herramienta Lean.', 'Guía la mejora del proceso.']]
  ],
  q: [
    ['¿En qué nivel de CMMI el éxito depende del esfuerzo heroico de individuos?', 'Nivel 1, inicial', ['Nivel 3, definido', 'Nivel 5, en optimización', 'Nivel 2, gestionado'], 'Procesos impredecibles.', 2],
    ['¿Qué caracteriza al nivel 3 de CMMI?', 'La organización tiene procesos estándar que cada proyecto adapta', ['Todo se controla con estadística', 'No hay procesos', 'Solo hay un proyecto'], 'Definido.', 2],
    ['¿Qué norma está pensada para empresas de software de hasta 25 personas?', 'ISO/IEC 29110', ['ISO 9001', 'ISO/IEC 25010', 'ISO/IEC 27001'], 'En el Perú es la NTP-ISO/IEC 29110.', 2],
    ['Se encontraron 170 defectos antes de la entrega y 30 después. ¿Cuál es la DRE?', '85 %', ['15 %', '170 %', '95 %'], '170 / 200 = 0,85.', 3],
    ['¿En qué orden trabaja GQM?', 'Objetivo, preguntas y luego métricas', ['Métricas, preguntas y objetivo', 'Primero se miden todas las métricas posibles', 'Solo métricas'], 'Cada métrica responde a una pregunta.', 2],
    ['¿Qué suele revelar un mapeo del flujo de valor en software?', 'Que el trabajo pasa la mayor parte del tiempo esperando y no siendo trabajado', ['Que los programadores escriben lento', 'Que no hay esperas', 'Que el código es corto'], 'Aprobaciones y entornos.', 3],
    ['¿Cuál es una crítica frecuente al CMMI?', 'Que en la práctica puede favorecer la documentación sobre los resultados y ser caro para empresas pequeñas', ['Que no tiene niveles', 'Que prohíbe medir', 'Que solo sirve para hardware'], 'Sus defensores culpan a la aplicación burocrática.', 3],
    { tf: 'Las retrospectivas de Scrum aplican en esencia el ciclo PDCA.', v: true, e: 'Se planifica una mejora, se aplica, se verifica y se adopta o ajusta.', l: 2 },
    { tf: 'Un mayor nivel de CMMI garantiza que cada proyecto será exitoso.', v: false, e: 'Mejora la predictibilidad, pero no garantiza el éxito de cada proyecto.', l: 3 },
    { o: 'Ordena los niveles de madurez de CMMI de menor a mayor.', s: ['Inicial', 'Gestionado', 'Definido', 'Gestionado cuantitativamente', 'En optimización'], e: 'Del 1 al 5.', l: 2 },
    { c: 'Escribe «dre(antes, despues)»: porcentaje de defectos encontrados antes de la entrega, redondeado a 1 decimal.', f: 'dre', p: ['antes', 'despues'], t: [[[170, 30], 85], [[190, 8], 96], [[0, 0], 0]], sol: '  if (antes + despues === 0) return 0;\n  return Math.round(1000 * antes / (antes + despues)) / 10;', l: 2 },
    { c: 'Escribe «porOrigen(defectos)»: defectos es una lista de textos de origen ("requisito", "código"…); devuelve el origen más frecuente (el primero en aparecer si empatan).', f: 'porOrigen', p: ['defectos'], t: [[[['código', 'requisito', 'requisito', 'diseño']], 'requisito'], [[['a', 'b']], 'a']], sol: '  const c = {};\n  let mejor = defectos[0];\n  for (const d of defectos) { c[d] = (c[d] || 0) + 1; if (c[d] > c[mejor]) mejor = d; }\n  return mejor;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(50, 300), d = R.int(1, 60); g.input(3, 'Se encontraron ' + a + ' defectos antes de la entrega y ' + d + ' después. ¿Cuál es la eficacia de eliminación de defectos? (porcentaje con 1 decimal)', String(Math.round(1000 * a / (a + d)) / 10), 'Antes ÷ (antes + después) × 100.'); });
    var niv = [['Los proyectos se planifican y se siguen, y los requisitos se gestionan', 'Gestionado'], ['El proceso se controla con métricas y estadística', 'Gestionado cuantitativamente'], ['La organización mejora continuamente con datos e innovación', 'En optimización'], ['Cada proyecto hace las cosas a su manera y depende de héroes', 'Inicial'], ['Existen procesos estándar que los proyectos adaptan', 'Definido']];
    niv.forEach(function (n) { g.mcq(2, '¿Qué nivel de madurez de CMMI describe esto? ' + n[0], n[1], ['Inicial', 'Gestionado', 'Definido', 'Gestionado cuantitativamente', 'En optimización'].filter(function (x) { return x !== n[1]; }).slice(0, 3), 'Cinco niveles de CMMI.'); });
    var nor = [['Gestión de la calidad para cualquier organización', 'ISO 9001'], ['Procesos del ciclo de vida del software', 'ISO/IEC/IEEE 12207'], ['Perfiles para entidades muy pequeñas', 'ISO/IEC 29110'], ['Modelo de calidad del producto de software', 'ISO/IEC 25010'], ['Evaluación de la capacidad de procesos', 'ISO/IEC 33000']];
    nor.forEach(function (n) { g.mcq(3, '¿Qué norma trata sobre esto? ' + n[0], n[1], ['ISO 9001', 'ISO/IEC/IEEE 12207', 'ISO/IEC 29110', 'ISO/IEC 25010', 'ISO/IEC 33000'].filter(function (x) { return x !== n[1]; }).slice(0, 3), 'Normas de calidad y procesos.'); });
  },
  checks: [
    ['¿Por qué se dice que la calidad del producto depende de la del proceso?', 'Porque un proceso definido, medido y mejorado produce calidad constante, en lugar de depender de la suerte o de individuos heroicos.'],
    ['Describe los cinco niveles de madurez de CMMI.', 'Inicial (héroes), gestionado (proyectos planificados), definido (procesos estándar), gestionado cuantitativamente (control estadístico) y en optimización (mejora continua).'],
    ['Aplica GQM a un objetivo de tu equipo o curso.', 'Definir un objetivo, dos o tres preguntas que indiquen avance y una métrica para cada pregunta.'],
    ['¿Qué ventaja tiene ISO/IEC 29110 para el Perú?', 'Ofrece un modelo de procesos accesible para las empresas muy pequeñas, que son la mayoría del sector, y está adoptado como norma técnica peruana.']
  ],
  cites: ['Humphrey, W. (1989). *Managing the Software Process*. Addison-Wesley.', 'Paulk, M. et al. (1993). *Capability Maturity Model for Software, Version 1.1*. CMU/SEI-93-TR-024.', 'Basili, V. y Weiss, D. (1984). A Methodology for Collecting Valid Software Engineering Data. *IEEE Transactions on Software Engineering*, SE-10(6).', 'Deming, W. E. (1986). *Out of the Crisis*. MIT Press.', 'ISO/IEC 29110 (2011-2016). *Systems and software engineering — Lifecycle profiles for Very Small Entities (VSEs)*.', 'Jones, C. y Bonsignour, O. (2011). *The Economics of Software Quality*. Addison-Wesley.'],
  project: { t: 'Mejora de un proceso con datos',
    goal: 'Aplicar un ciclo de mejora medido a un proceso de desarrollo.',
    steps: ['Elige un proceso tuyo o de un equipo (entregar tareas, revisar código, publicar versiones).', 'Haz su mapeo del flujo de valor con tiempos de trabajo y de espera.', 'Define con GQM un objetivo, preguntas y métricas, y mide la situación inicial.', 'Aplica un cambio con un ciclo PDCA durante al menos dos semanas.', 'Mide de nuevo, decide si adoptar el cambio y compara tu proceso con el perfil básico de ISO/IEC 29110.'],
    deliver: 'El mapa del flujo, las métricas antes y después, el registro del ciclo PDCA y la comparación con la norma.' },
  hito: ['Define con GQM las métricas de calidad del proceso de PatioApp y calcula la DRE de las últimas versiones.', 'Aplica un ciclo PDCA a la causa principal de defectos escapados de PatioApp y documenta el resultado.']
});
SDC.after('m12.improve', 'm12.risk');
})();
