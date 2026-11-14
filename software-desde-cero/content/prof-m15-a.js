(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m15', { prof: true });

D('m15.cicd', `## Ramas y flujo de integración
La integración continua solo funciona si los cambios llegan a la rama principal **seguido**. Las estrategias de ramas influyen mucho:
- **Desarrollo basado en el tronco** (*trunk-based development*): todos integran en la rama principal al menos una vez al día, con ramas de vida muy corta (horas) o sin ramas. Las funcionalidades incompletas se ocultan con banderas. Los estudios de DORA lo asocian con mejor desempeño de entrega.
- **GitHub Flow:** una rama por cambio, *pull request*, revisión y fusión a la principal, que siempre está lista para desplegar.
- **Git Flow** (Vincent Driessen, 2010): ramas de desarrollo, de funcionalidades, de versiones y de correcciones urgentes. Útil para software con versiones numeradas que se instalan (aplicaciones de escritorio, bibliotecas), pero pesado para servicios web que se despliegan continuamente; el propio Driessen agregó en 2020 una nota recomendando flujos más simples para ese caso.
Las ramas que viven semanas acumulan diferencias y producen el "infierno de las fusiones" que la integración continua vino a evitar.

## Ejemplo resuelto: el pipeline de PatioApp
1. **En cada push a una rama:** instalación con caché, análisis estático, verificación de tipos, pruebas unitarias y de integración con contenedores (unos 6 minutos).
2. **En cada pull request:** además, pruebas de contrato y SAST; los resultados se comentan en el PR.
3. **Al fusionar en la principal:** se construye **una sola vez** la imagen del contenedor, se firma, se etiqueta con el hash del commit y se publica en el registro.
4. **Despliegue automático al entorno de pruebas** con esa misma imagen, migraciones de base de datos, prueba de humo y prueba de carga corta.
5. **Producción:** aprobación con un clic; despliegue canario al 10 % del tráfico durante 30 minutos, comparación automática de errores y latencia; si todo está bien, al 100 %; si no, retroceso automático.
6. Tiempo total desde la fusión hasta producción: unos 50 minutos, varias veces al día.`);

D('m15.containers', `## Seguridad de los contenedores
Un contenedor no es una frontera de seguridad tan fuerte como una máquina virtual: todos comparten el núcleo del sistema operativo del anfitrión. Buenas prácticas:
- **No ejecutar como root** dentro del contenedor: declarar un usuario sin privilegios.
- **Imágenes mínimas:** partir de imágenes pequeñas (Alpine, *distroless* de Google o las imágenes "slim") reduce la superficie de ataque y la cantidad de vulnerabilidades por las que habrá que preocuparse.
- **Escanear las imágenes** en el pipeline con herramientas como Trivy o Grype para detectar bibliotecas vulnerables.
- **Fijar versiones** de la imagen base por su resumen criptográfico (*digest*), no por etiquetas como «latest», que cambian sin aviso.
- **Sistema de archivos de solo lectura** y capacidades del núcleo mínimas.
- **No guardar secretos en la imagen:** cualquiera que tenga la imagen puede extraerlos de sus capas aunque se hayan "borrado" en una capa posterior.

## Ejemplo resuelto: la imagen de la API de PatioApp
- Construcción en **dos etapas**: la primera instala dependencias y compila; la segunda copia solo el resultado a una imagen mínima de Node, con lo que el tamaño baja de 1,1 GB a 180 MB.
- Usuario sin privilegios, puerto 8080, comprobación de salud en «/salud».
- Configuración y secretos por variables de entorno inyectadas en el despliegue.
- La imagen se construye una vez en la integración continua, se escanea, se firma y se promueve sin cambios de pruebas a producción: lo que se probó es exactamente lo que corre.

## Contenedores en desarrollo
Los contenedores también cambian el día a día del desarrollador. Con Docker Compose, un archivo describe la API, la base de datos, la cola y un servidor de correo de prueba; un solo comando levanta todo el entorno en cualquier computadora, y una persona nueva en el equipo puede tener el sistema funcionando en minutos en lugar de pasar dos días instalando versiones exactas de cada cosa. Los **contenedores de desarrollo** (*dev containers*, una especificación abierta que usan Visual Studio Code y GitHub Codespaces) van más allá: el propio entorno de programación, con sus herramientas y versiones, se define como un contenedor versionado en el repositorio. Así desaparece el clásico "en mi máquina funciona", porque todas las máquinas son la misma.`);

D('m15.cloud', `## Recuperación ante desastres
Que la nube sea confiable no significa que nada falle: regiones completas han quedado fuera de servicio por horas, y los errores humanos (borrar una base por accidente) son más frecuentes que las fallas del proveedor. Dos métricas definen los objetivos:
- **RPO** (*Recovery Point Objective*): cuántos datos se pueden perder, medido en tiempo. Un RPO de 1 hora exige respaldos o réplicas al menos cada hora.
- **RTO** (*Recovery Time Objective*): cuánto tiempo puede estar el servicio caído antes de restaurarse.
Las estrategias, de más barata a más cara: **respaldo y restauración** (RTO de horas), **luz piloto** (una versión mínima siempre encendida en otra región), **en espera templada** (*warm standby*, una copia reducida funcionando) y **activo-activo multirregión** (RTO casi cero, costo y complejidad máximos). La regla clásica de respaldos es **3-2-1**: tres copias de los datos, en dos tipos de almacenamiento distintos, una fuera del sitio; hoy se agrega una copia **inmutable** o desconectada contra el ransomware. Y lo más importante: un respaldo que nunca se probó restaurar no es un respaldo, es una esperanza.

## Ejemplo resuelto: la nube de PatioApp
- Región de São Paulo (la más cercana a Lima en varios proveedores), con la aplicación en dos zonas de disponibilidad.
- Base de datos gestionada con réplica en otra zona (falla de zona: recuperación automática en minutos) y respaldos automáticos cada 5 minutos (RPO de 5 minutos).
- Copia diaria de respaldos a otra región con bloqueo de objetos (inmutable por 30 días).
- RTO acordado con gerencia: 4 horas para un desastre regional, aceptable porque las tablets siguen operando sin conexión.
- Todo definido en Terraform; un simulacro trimestral restaura la base en una cuenta aislada y mide el tiempo real.

En el primer simulacro la restauración tardó 6 horas, por encima del RTO, porque nadie recordaba los pasos; se escribió un manual y se automatizó, y el segundo tardó 70 minutos.`);

D('m15.obs', `## Alertas que no despiertan en vano
Un sistema de alertas mal diseñado produce **fatiga de alertas**: tantas notificaciones irrelevantes que el equipo deja de prestarles atención, y la importante se pierde. Principios del libro de SRE de Google y de Rob Ewaschuk (*My Philosophy on Alerting*):
- **Alertar por síntomas que sufre el usuario** (errores, latencia, disponibilidad), no por causas internas (CPU al 80 %), que se revisan en tableros.
- Toda alerta que despierta a alguien debe ser **urgente, accionable** y requerir **juicio humano**; si la respuesta es siempre la misma, hay que automatizarla.
- **Alertar sobre el presupuesto de error**: en lugar de avisar ante cada pico, avisar cuando el ritmo de consumo del presupuesto del SLO indica que se agotará pronto (*burn rate*), con dos ventanas (una corta para incendios y una larga para degradaciones lentas).
- Cada alerta tiene un **manual de respuesta** (*runbook*) enlazado.

## Ejemplo resuelto: los SLO de PatioApp
| SLI | SLO (28 días) | Presupuesto de error |
| Porcentaje de registros de salida exitosos | 99,5 % | 0,5 % de las salidas pueden fallar |
| Porcentaje de salidas confirmadas en menos de 2 s | 95 % | 5 % pueden tardar más |
| Porcentaje de eventos sincronizados desde las tablets en menos de 5 min tras recuperar la conexión | 99 % | 1 % |
Si el presupuesto de las salidas se consume a un ritmo que lo agotaría en menos de 2 días, se alerta a la persona de guardia; si se agota en el período, el equipo prioriza la confiabilidad sobre las funcionalidades nuevas hasta recuperarlo, como acordó con el dueño de producto.

## Observabilidad frente a monitoreo
El **monitoreo** responde preguntas que se conocen de antemano (¿está arriba el servicio?, ¿cuánta CPU usa?). La **observabilidad**, término tomado de la teoría de control de Rudolf Kálmán (1960), es la capacidad de responder preguntas **nuevas** sobre el sistema sin desplegar código nuevo: ¿por qué solo los operadores de la sede de Callao con la versión 3.2 de la app ven salidas lentas desde ayer? Para eso hacen falta eventos ricos en contexto (con muchos atributos de alta cardinalidad, como el identificador de usuario, la sede o la versión) que se puedan filtrar y agrupar libremente, como proponen Charity Majors y sus colegas. Los sistemas distribuidos modernos necesitan ambas cosas: monitoreo para lo conocido y observabilidad para lo que nadie imaginó.`);

S('m15', 'm15.culture', { title: 'Cultura DevOps, flujo y las métricas DORA',
  ask: '¿Qué concepto de cultura o de métricas DevOps se aplica?',
  lesson: `
> **La idea en simple.** Durante décadas, en muchas empresas, un equipo escribía el software y lo "lanzaba por encima del muro" a otro equipo que lo tenía que hacer funcionar en los servidores. Los desarrolladores querían cambiar rápido; los de operaciones, que nada cambiara para que no se cayera. Cada uno cumplía su objetivo y la empresa perdía. DevOps nació para derribar ese muro: un objetivo común, entregar valor rápido **y** de forma confiable, con prácticas, herramientas y, sobre todo, una cultura compartida.

## El origen
En 2009, John Allspaw y Paul Hammond presentaron en la conferencia Velocity la charla *10+ Deploys Per Day: Dev and Ops Cooperation at Flickr*, que mostraba cómo Flickr desplegaba más de diez veces al día gracias a la colaboración entre ambos equipos. El belga Patrick Debois, que había sufrido ese muro como consultor, organizó ese mismo año en Gante el primer **DevOpsDays**, y el término quedó. Las ideas venían de antes: la manufactura esbelta de Toyota, la teoría de restricciones de Eliyahu Goldratt (*La meta*, 1984), los métodos ágiles y la gestión de servicios.

Gene Kim, Kevin Behr y George Spafford las popularizaron en 2013 con la novela *The Phoenix Project*, en la que un gerente de TI salva un proyecto desastroso aplicando los principios del flujo. Y en 2016 Kim, Jez Humble, Patrick Debois y John Willis publicaron *The DevOps Handbook*.

## CALMS
Jez Humble y Damon Edwards resumieron los pilares de DevOps con la sigla **CALMS**:
- **Cultura:** responsabilidad compartida, colaboración, aprendizaje sin culpas.
- **Automatización:** de la construcción, las pruebas, la infraestructura y los despliegues.
- **Lean:** flujo, lotes pequeños, eliminar desperdicios, limitar el trabajo en curso.
- **Medición:** de todo lo que importa, para decidir con datos.
- **Compartir** (*Sharing*): conocimiento, herramientas, éxitos y fracasos.
Un error común es reducir DevOps a herramientas ("compramos una plataforma de DevOps") o a un puesto ("contratamos a un DevOps"). Las herramientas sin cambio cultural reproducen el muro con otro nombre.

## Las tres vías
*The DevOps Handbook* organiza los principios en **tres vías**:
1. **El flujo:** acelerar el trabajo de izquierda a derecha, desde la idea hasta el cliente. Prácticas: hacer visible el trabajo, lotes pequeños, limitar el trabajo en curso, eliminar esperas y traspasos, encontrar y elevar la **restricción** (el cuello de botella; según Goldratt, mejorar cualquier otro punto no mejora el sistema).
2. **La retroalimentación:** que la información fluya de derecha a izquierda rápido: pruebas automatizadas, monitoreo, alertas, y que quien construye se entere enseguida de los problemas. Incluye "detener la línea" (como el cordón *andon* de Toyota) cuando algo falla, en lugar de seguir acumulando defectos.
3. **El aprendizaje y la experimentación continuos:** una cultura de alta confianza que asume riesgos calculados, aprende de los fracasos sin culpar, reserva tiempo para mejorar el trabajo diario y comparte lo aprendido en toda la organización.

## Cultura generativa
El sociólogo Ron Westrum estudió en 2004 la seguridad en organizaciones de salud y aviación y propuso una tipología de culturas según cómo fluye la información:
| Patológica (orientada al poder) | Burocrática (orientada a las reglas) | Generativa (orientada al desempeño) |
| poca cooperación | cooperación modesta | mucha cooperación |
| se "mata" al mensajero | se ignora al mensajero | se entrena al mensajero |
| se evita la responsabilidad | responsabilidades estrechas | se comparten los riesgos |
| se desalienta el trabajo entre áreas | se tolera | se fomenta |
| el fracaso lleva a buscar culpables | el fracaso lleva a "justicia" | el fracaso lleva a investigar |
| la novedad se aplasta | la novedad trae problemas | la novedad se implementa |
Las investigaciones de DORA encontraron que la cultura generativa **predice** un mejor desempeño de entrega de software y mejores resultados de la organización. Google llegó a una conclusión parecida con el **Proyecto Aristóteles** (2015): el factor que más distinguía a sus equipos efectivos era la **seguridad psicológica**, la confianza de que no se será castigado por hablar, preguntar o equivocarse, concepto estudiado por Amy Edmondson desde 1999.

## La investigación DORA y Accelerate
Nicole Forsgren, Jez Humble y Gene Kim estudiaron, a partir de 2014, encuestas a decenas de miles de profesionales con métodos estadísticos rigurosos, en el programa que luego se llamó **DORA** (*DevOps Research and Assessment*, adquirido por Google en 2018). Publicaron sus conclusiones en *Accelerate* (2018). Hallazgos centrales:
- El desempeño de entrega de software se puede medir con **cuatro métricas**, y velocidad y estabilidad **no se oponen**: los mejores equipos son a la vez los más rápidos y los más estables.
- Ese desempeño **predice** el desempeño de la organización (rentabilidad, cuota de mercado, productividad).
- Un conjunto de **capacidades** técnicas, de proceso y culturales lo **causa** o lo favorece: integración continua, desarrollo basado en el tronco, pruebas automatizadas, despliegue continuo, arquitectura poco acoplada, monitoreo, lotes pequeños, cultura generativa, entre otras.

## Las cuatro métricas
| Métrica | Mide | Tipo |
| Frecuencia de despliegue | con qué frecuencia se despliega a producción | velocidad |
| Tiempo de entrega de cambios | desde el commit hasta que el cambio está en producción | velocidad |
| Tasa de fallos de cambios | porcentaje de despliegues que causan una falla que requiere corrección | estabilidad |
| Tiempo de restauración | cuánto tarda en recuperarse el servicio tras una falla | estabilidad |
En los informes anuales, los equipos de **élite** despliegan bajo demanda (varias veces al día), con tiempos de entrega de menos de un día, tasas de fallo bajas y restauración en menos de una hora; los de bajo desempeño despliegan entre una vez al mes y una vez cada seis meses, con tiempos de entrega de meses. Desde 2023 los informes agregan una quinta dimensión, la **confiabilidad** (cumplimiento de los objetivos de operación), y separan el tiempo de restauración como "tiempo de recuperación de despliegues fallidos".
~~~js
// Calcular las métricas DORA a partir de un registro de despliegues de 30 días
const despliegues = [
  { commitHace: 6, falla: false }, { commitHace: 20, falla: false }, { commitHace: 3, falla: true, restauracion: 0.5 },
  { commitHace: 30, falla: false }, { commitHace: 5, falla: false }, { commitHace: 8, falla: true, restauracion: 2 }
];                                                          // horas desde el commit hasta producción
const dias = 30, n = despliegues.length;
const mediana = a => { const o = [...a].sort((x, y) => x - y), m = o.length >> 1; return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2; };
const fallas = despliegues.filter(d => d.falla);
console.log('frecuencia:', (n / dias * 7).toFixed(1), 'despliegues por semana');
console.log('tiempo de entrega (mediana):', mediana(despliegues.map(d => d.commitHace)), 'horas');
console.log('tasa de fallos:', Math.round(100 * fallas.length / n) + '%');
console.log('restauración (mediana):', mediana(fallas.map(d => d.restauracion)), 'horas');
~~~
Advertencias de los propios autores: las métricas sirven para que un equipo **mejore**, no para comparar equipos ni premiar personas (la ley de Goodhart actúa enseguida: dividir un despliegue en diez no mejora nada). Y en 2021 Forsgren y colegas propusieron el marco **SPACE** para la productividad de los desarrolladores, con cinco dimensiones (satisfacción, desempeño, actividad, comunicación y eficiencia del flujo), advirtiendo que ninguna métrica única captura la productividad.

## Lotes pequeños y la economía del flujo
¿Por qué desplegar más seguido es **más** seguro y no menos? Porque los cambios pequeños:
- Son fáciles de revisar y de probar a fondo.
- Si fallan, se sabe enseguida qué los causó, y revertir es simple.
- Llegan antes al usuario, que da retroalimentación antes.
- Reducen el trabajo en curso y el tiempo de espera (ley de Little: con el mismo rendimiento, menos trabajo en curso significa menos tiempo de ciclo).
Un despliegue trimestral con 500 cambios es casi imposible de diagnosticar cuando algo falla. Donald Reinertsen (*The Principles of Product Development Flow*, 2009) mostró con argumentos económicos que reducir el tamaño de los lotes es una de las palancas más poderosas del desarrollo de productos.

## DevOps, SRE y la ingeniería de plataformas
- **SRE** (*Site Reliability Engineering*), creado en Google por Ben Treynor Sloss en 2003, puede verse como una implementación concreta de DevOps: ingenieros de software que operan los sistemas con objetivos de confiabilidad (SLO), presupuestos de error y un límite al trabajo manual repetitivo (*toil*), que Google fija en el 50 % del tiempo como máximo.
- **DevSecOps** integra la seguridad en todo el flujo en lugar de dejarla para una revisión final ("desplazar a la izquierda").
- **Ingeniería de plataformas:** equipos que construyen una **plataforma interna de desarrollo** de autoservicio (crear un servicio nuevo, desplegarlo, obtener una base de datos y monitoreo con pocos pasos), para reducir la carga cognitiva de los equipos de producto. Es la respuesta a un problema que trajo el "quien lo construye, lo opera": no todos los equipos pueden ser expertos en Kubernetes, redes y seguridad.

## Ejemplo resuelto: el diagnóstico DevOps de PatioApp
Al inicio del segundo año, el equipo mide sus métricas: despliegues cada dos semanas, tiempo de entrega de 9 días, tasa de fallos del 25 % y 6 horas de restauración. Un mapeo del flujo de valor muestra que el código espera en promedio 4 días en revisión y 3 días hasta la "ventana de despliegue" quincenal, y que las fallas vienen de despliegues grandes que mezclan muchos cambios.
1. **Flujo:** revisiones en el mismo día (acuerdo de equipo), pull requests de menos de 300 líneas y fin de la ventana quincenal: despliegue continuo con canario.
2. **Retroalimentación:** pruebas de contrato y de humo en el pipeline, SLO con alertas por presupuesto de error.
3. **Aprendizaje:** postmortems sin culpas de cada incidente, con acciones en el backlog, y un 15 % del tiempo de cada sprint para mejorar el trabajo diario.
Seis meses después: varios despliegues por día, tiempo de entrega de 1 día, tasa de fallos del 8 % y restauración en 30 minutos (casi siempre revirtiendo el canario). Más rápido **y** más estable, como predice la investigación.`,
  links: [['m15.cicd', 'la integración y la entrega continuas son capacidades centrales de DevOps'], ['m12.improve', 'la mejora continua y el mapeo del flujo de valor vienen de Lean'], ['eq.teams', 'la seguridad psicológica es un factor humano de los equipos']],
  read: 'Forsgren, Humble y Kim, *Accelerate* (2018); Kim y otros, *The DevOps Handbook* (2.ª ed., 2021); Westrum (2004); informes anuales *State of DevOps* de DORA (dora.dev).',
  terms: [
    ['DevOps', 'cultura y conjunto de prácticas que unen desarrollo y operaciones para entregar valor rápido y de forma confiable', ['Debois, 2009.', 'Flickr: 10 despliegues por día.', 'No es un puesto ni una herramienta.']],
    ['CALMS', 'sigla de los pilares de DevOps: cultura, automatización, lean, medición y compartir', ['Humble y Edwards.', 'La cultura va primero.', 'Sirve de diagnóstico.']],
    ['Las tres vías', 'principios de DevOps: flujo, retroalimentación y aprendizaje continuo', ['The DevOps Handbook.', 'Detener la línea.', 'Elevar la restricción.']],
    ['Cultura generativa', 'cultura orientada al desempeño en la que la información fluye y el fracaso lleva a investigar', ['Tipología de Westrum.', 'Se entrena al mensajero.', 'Predice mejor desempeño.']],
    ['Seguridad psicológica', 'confianza de que no se será castigado por hablar, preguntar o equivocarse', ['Edmondson, 1999.', 'Proyecto Aristóteles de Google.', 'Base de los postmortems sin culpas.']],
    ['Métricas DORA', 'frecuencia de despliegue, tiempo de entrega, tasa de fallos de cambios y tiempo de restauración', ['Accelerate, 2018.', 'Velocidad y estabilidad juntas.', 'Para mejorar, no para comparar.']],
    ['Tiempo de entrega de cambios', 'tiempo desde el commit hasta que el cambio está en producción', ['Élite: menos de un día.', 'Métrica de velocidad.', 'Se mide con la mediana.']],
    ['Ingeniería de plataformas', 'construcción de una plataforma interna de autoservicio que reduce la carga cognitiva de los equipos de producto', ['Crear un servicio en pocos pasos.', 'Plataforma interna de desarrollo.', 'Equipo de plataforma.']]
  ],
  q: [
    ['¿Qué problema vino a resolver DevOps?', 'El muro entre desarrollo, que quería cambiar rápido, y operaciones, que quería estabilidad', ['La falta de lenguajes de programación', 'El costo de los servidores', 'La falta de pruebas unitarias'], 'Objetivos opuestos que perjudicaban a la empresa.', 1],
    ['Según Accelerate, ¿qué relación hay entre velocidad y estabilidad?', 'No se oponen: los mejores equipos son a la vez los más rápidos y los más estables', ['Son opuestas siempre', 'La estabilidad no se puede medir', 'Solo importa la velocidad'], 'Hallazgo central de DORA.', 3],
    ['¿Cuáles son las dos métricas DORA de estabilidad?', 'Tasa de fallos de cambios y tiempo de restauración', ['Frecuencia de despliegue y tiempo de entrega', 'Líneas de código y número de pruebas', 'Uso de CPU y memoria'], 'Las otras dos son de velocidad.', 2],
    ['En la tipología de Westrum, ¿qué hace una cultura generativa con el mensajero de malas noticias?', 'Lo entrena', ['Lo "mata"', 'Lo ignora', 'Lo despide'], 'La información fluye.', 2],
    ['¿Por qué desplegar más seguido con cambios pequeños es más seguro?', 'Porque cada cambio es fácil de revisar, de diagnosticar y de revertir', ['Porque se prueban menos', 'Porque los usuarios no lo notan', 'No es más seguro'], 'Lotes pequeños.', 3],
    ['Un gerente quiere premiar al equipo que más despliegues hace por semana. ¿Qué advertencia aplica?', 'La ley de Goodhart: el equipo dividirá despliegues sin mejorar nada', ['Ninguna: es una buena idea', 'Que los despliegues no se pueden contar', 'Que DORA lo exige'], 'Las métricas son para mejorar, no para comparar.', 4],
    ['¿Qué limita SRE con su regla del 50 %?', 'El tiempo dedicado a trabajo manual repetitivo (toil)', ['El número de despliegues', 'El uso de CPU', 'Las horas de reunión'], 'El resto se dedica a ingeniería.', 3],
    { tf: 'Contratar a una persona con el puesto de "DevOps" es suficiente para adoptar DevOps.', v: false, e: 'Sin cambio cultural, se reproduce el muro con otro nombre.', l: 1 },
    { tf: 'El Proyecto Aristóteles de Google encontró que la seguridad psicológica era el factor que más distinguía a los equipos efectivos.', v: true, e: 'Concepto estudiado por Amy Edmondson.', l: 2 },
    { c: 'Escribe «tasaFallos(despliegues)»: despliegues es una lista de {falla: true/false}; devuelve el porcentaje entero de despliegues con falla (0 si la lista está vacía).', f: 'tasaFallos', p: ['despliegues'], t: [[[[{ falla: false }, { falla: true }, { falla: false }, { falla: false }]], 25], [[[]], 0]], sol: '  if (!despliegues.length) return 0;\n  return Math.round(100 * despliegues.filter(d => d.falla).length / despliegues.length);', l: 1 },
    { c: 'Escribe «mediana(valores)»: mediana de una lista no vacía de números.', f: 'mediana', p: ['valores'], t: [[[[6, 20, 3, 30, 5, 8]], 7], [[[4, 1, 9]], 4], [[[2]], 2]], sol: '  const o = [...valores].sort((a, b) => a - b), m = o.length >> 1;\n  return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2;', l: 2 },
    { c: 'Escribe «nivelFrecuencia(porSemana)»: devuelve "élite" si hay 7 o más despliegues por semana, "alto" si hay al menos 1, "medio" si hay al menos 0.25 (uno al mes) y "bajo" en otro caso.', f: 'nivelFrecuencia', p: ['porSemana'], t: [[[10], 'élite'], [[2], 'alto'], [[0.25], 'medio'], [[0.1], 'bajo']], sol: '  if (porSemana >= 7) return "élite";\n  if (porSemana >= 1) return "alto";\n  if (porSemana >= 0.25) return "medio";\n  return "bajo";', l: 2 }
  ],
  gen: function (g) {
    var dm = [['Cuántas veces por semana llega código a producción', 'Frecuencia de despliegue'], ['Horas desde el commit hasta producción', 'Tiempo de entrega de cambios'], ['Porcentaje de despliegues que causan un incidente', 'Tasa de fallos de cambios'], ['Minutos para recuperar el servicio tras una falla', 'Tiempo de restauración']];
    dm.forEach(function (d) { g.mcq(1, '¿Qué métrica DORA es? ' + d[0], d[1], ['Frecuencia de despliegue', 'Tiempo de entrega de cambios', 'Tasa de fallos de cambios', 'Tiempo de restauración'].filter(function (x) { return x !== d[1]; }), 'Cuatro métricas de Accelerate.'); });
    var we = [['El fracaso lleva a investigar qué pasó', 'Generativa'], ['El fracaso lleva a buscar culpables', 'Patológica'], ['Se ignora al mensajero y se siguen las reglas', 'Burocrática'], ['Se fomenta el trabajo entre áreas', 'Generativa'], ['La novedad se aplasta', 'Patológica'], ['Las responsabilidades son estrechas', 'Burocrática']];
    we.forEach(function (w) { g.mcq(2, 'Según Westrum, ¿qué cultura describe esto? ' + w[0], w[1], ['Patológica', 'Burocrática', 'Generativa', 'Ágil'].filter(function (x) { return x !== w[1]; }), 'Tipología de Westrum.'); });
    var cm = [['Postmortems sin culpas y responsabilidad compartida', 'Cultura'], ['Pipeline que construye, prueba y despliega solo', 'Automatización'], ['Limitar el trabajo en curso y reducir los lotes', 'Lean'], ['Tableros con las métricas DORA', 'Medición'], ['Charlas internas sobre lo aprendido en un incidente', 'Compartir']];
    cm.forEach(function (c) { g.mcq(2, '¿Qué pilar de CALMS representa? ' + c[0], c[1], ['Cultura', 'Automatización', 'Lean', 'Medición', 'Compartir'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'CALMS.'); });
    g.times(6, function (R) { var n = R.int(1, 60), f = R.int(0, Math.max(1, Math.floor(n / 3))); g.input(2, 'En un mes hubo ' + n + ' despliegues y ' + f + ' causaron fallas. ¿Cuál es la tasa de fallos de cambios en porcentaje? (redondea al entero)', Math.round(100 * f / n), 'Fallas ÷ despliegues.'); });
  },
  checks: [
    ['¿Qué es DevOps y qué no es?', 'Una cultura y un conjunto de prácticas que unen desarrollo y operaciones para entregar rápido y con confiabilidad; no es una herramienta ni un puesto.'],
    ['Describe las tres vías.', 'Flujo (acelerar de la idea al cliente), retroalimentación (información rápida de vuelta) y aprendizaje continuo (experimentar y aprender sin culpas).'],
    ['¿Cuáles son las cuatro métricas DORA y qué enseñan juntas?', 'Frecuencia de despliegue, tiempo de entrega, tasa de fallos y tiempo de restauración; enseñan que velocidad y estabilidad van juntas.'],
    ['¿Por qué importa la cultura según Westrum y DORA?', 'Porque una cultura generativa, donde la información fluye y el fracaso se investiga, predice mejor desempeño de entrega y de la organización.']
  ],
  cites: ['Forsgren, N., Humble, J. y Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution.', 'Kim, G., Humble, J., Debois, P., Willis, J. y Forsgren, N. (2021). *The DevOps Handbook* (2.ª ed.). IT Revolution.', 'Westrum, R. (2004). A Typology of Organisational Cultures. *Quality and Safety in Health Care*, 13(suppl 2).', 'Edmondson, A. (1999). Psychological Safety and Learning Behavior in Work Teams. *Administrative Science Quarterly*, 44(2).', 'Forsgren, N. et al. (2021). The SPACE of Developer Productivity. *ACM Queue*, 19(1).', 'Allspaw, J. y Hammond, P. (2009). 10+ Deploys Per Day: Dev and Ops Cooperation at Flickr. *Velocity Conference*.'],
  project: { t: 'Diagnóstico y mejora DevOps',
    goal: 'Medir el desempeño de entrega de un equipo y mejorarlo con un plan basado en capacidades.',
    steps: ['Mide durante un mes las cuatro métricas DORA de un proyecto (propio o de un equipo).', 'Haz el mapeo del flujo de valor desde el commit hasta producción con tiempos de trabajo y de espera.', 'Aplica una encuesta breve de cultura con las afirmaciones de Westrum.', 'Elige dos capacidades de DORA para mejorar y aplica cambios durante un mes.', 'Mide de nuevo y analiza el resultado.'],
    deliver: 'Las métricas antes y después, el mapa del flujo, la encuesta y el análisis.' },
  hito: ['Calcula automáticamente las cuatro métricas DORA de PatioApp a partir del historial del pipeline y publícalas en un tablero.', 'Haz el mapeo del flujo de valor de PatioApp y aplica dos mejoras de flujo, midiendo su efecto en el tiempo de entrega.']
});
SDC.after('m15.culture', null);
(function () { var m = SDC.modules.filter(function (x) { return x.id === 'm15'; })[0]; m.subs.splice(m.subs.indexOf('m15.culture'), 1); m.subs.unshift('m15.culture'); })();
})();
