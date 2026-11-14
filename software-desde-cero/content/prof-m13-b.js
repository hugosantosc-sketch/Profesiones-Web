(function () {
var S = SDC.S;

S('m13', 'm13.micro', { title: 'Microservicios a fondo: cuándo, cómo dividir y cómo migrar',
  ask: '¿Qué concepto de microservicios o de su migración se aplica?',
  lesson: `
> **La idea en simple.** Un restaurante pequeño funciona bien con una sola cocina donde todos se ayudan. Cuando crece a cien cocineros, una sola cocina se vuelve un caos: cada uno espera a otro, nadie sabe quién cambió la receta. Separar la cocina en estaciones independientes (parrilla, pastelería, ensaladas), cada una con su equipo, sus ingredientes y su ritmo, permite crecer. Pero si el restaurante tiene tres cocineros, dividirlo en estaciones solo agrega pasillos y burocracia. Los microservicios son esa separación: poderosa a cierta escala y un costo innecesario antes.

## Definición
James Lewis y Martin Fowler describieron en 2014 el estilo de **microservicios**: construir una aplicación como un conjunto de servicios pequeños, cada uno ejecutándose en su propio proceso, comunicándose por mecanismos ligeros (normalmente HTTP o mensajería), construidos alrededor de **capacidades del negocio** y **desplegables de forma independiente** por procesos automatizados. Sus características:
- **Organizados por capacidades del negocio**, no por capas técnicas.
- **Productos, no proyectos:** el equipo que construye un servicio lo opera ("you build it, you run it", como dijo Werner Vogels, de Amazon, en 2006).
- **Extremos inteligentes y tuberías tontas:** la lógica vive en los servicios, no en un bus central.
- **Gobierno descentralizado:** cada equipo elige sus herramientas dentro de ciertos límites.
- **Datos descentralizados:** cada servicio es dueño de sus datos; ningún otro accede directamente a su base.
- **Automatización de la infraestructura** y **diseño para la falla**.
Sam Newman resume la idea central en una sola propiedad: **despliegue independiente**. Si para desplegar un servicio hay que desplegar otros al mismo tiempo, no son microservicios, sino un **monolito distribuido**, que combina los problemas de ambos mundos.

## Beneficios y costos
| Beneficios | Costos |
| Equipos autónomos que despliegan sin coordinar con todos | Complejidad de un sistema distribuido: red, latencia, fallas parciales |
| Escalar cada parte según su carga | Consistencia de datos entre servicios (sagas, eventos) |
| Aislar fallas: si cae notificaciones, el patio sigue operando | Observabilidad: trazas distribuidas, registros centralizados |
| Usar la tecnología adecuada para cada servicio | Pruebas de integración más difíciles |
| Sustituir un servicio completo sin tocar los demás | Costo operativo: muchos despliegues, más infraestructura |
Martin Fowler llamó a los requisitos previos el **"debes ser así de alto"** (*You must be this tall to use microservices*, 2014): aprovisionamiento rápido de infraestructura, monitoreo básico y despliegue automatizado. Sin eso, los microservicios multiplican los problemas.

## Monolito primero
Fowler observó en 2015 (*MonolithFirst*) que casi todas las historias exitosas de microservicios empezaron con un monolito que creció demasiado, y casi todos los sistemas que empezaron como microservicios desde cero tuvieron serios problemas. La razón: al inicio no se conocen bien los límites del dominio, y un límite mal elegido entre servicios es muy caro de corregir (hay que mover datos y cambiar contratos), mientras que dentro de un monolito es una refactorización. Por eso la recomendación habitual es un **monolito modular**: un solo despliegue con módulos bien separados, que se pueden extraer como servicios cuando haya una razón concreta.

Un caso muy citado en sentido contrario: en 2023, el equipo de monitoreo de video de Amazon Prime Video publicó que pasó de una arquitectura de microservicios y funciones sin servidor a un **monolito** para ese componente, reduciendo los costos de infraestructura en un 90 %, porque el traspaso de datos entre servicios dominaba el costo. La lección no es que los microservicios sean malos, sino que la arquitectura debe seguir al problema.

## Cómo dividir
Criterios para encontrar buenos límites:
- **Contextos delimitados del DDD:** un servicio no debería ser más grande que un contexto delimitado.
- **Capacidades del negocio:** facturar, gestionar espacios, notificar.
- **Alta cohesión y bajo acoplamiento:** lo que cambia junto, va junto. Un análisis del historial de cambios (qué archivos se modifican en los mismos commits) revela acoplamientos ocultos; Adam Tornhill lo llama acoplamiento temporal.
- **Ritmos de cambio y de escala distintos:** las tarifas cambian por reglas comerciales; las notificaciones, por cambios de proveedor.
- **Estructura de equipos:** recuerda la ley de Conway.
Señales de un mal corte: servicios que siempre se despliegan juntos, cadenas largas de llamadas síncronas para atender una sola petición, servicios "anémicos" que solo envuelven una tabla, y transacciones que necesitan cruzar servicios constantemente.

## Datos: base de datos por servicio
Cada servicio es dueño de sus datos y los expone solo por su API o sus eventos. Compartir una base de datos entre servicios crea un acoplamiento invisible: un cambio de esquema rompe a otros. Consecuencias que hay que asumir:
- **Consultas que cruzan servicios** se resuelven con composición en la API (llamar a varios y combinar), con réplicas locales de datos ajenos mantenidas por eventos, o con un almacén de lectura especializado (CQRS, en la unidad siguiente).
- **Transacciones entre servicios** se reemplazan por sagas con compensaciones e idempotencia.
- **Integridad referencial** entre servicios ya no la garantiza la base de datos: un servicio puede referenciar una unidad que otro borró, y hay que diseñar para eso.

## Comunicación
- **Síncrona** (HTTP/REST, gRPC): simple de entender, pero acopla en el tiempo: si el servicio llamado no responde, el que llama tampoco puede. Cada llamada en cadena multiplica la probabilidad de falla y la latencia: si cada servicio está disponible el 99,9 % del tiempo y una petición atraviesa 5 en serie, la disponibilidad combinada es 0,999⁵ ≈ 99,5 %.
- **Asíncrona** (mensajes y eventos): desacopla en el tiempo y absorbe picos, a cambio de consistencia eventual y flujos más difíciles de seguir.
~~~js
// Disponibilidad de una cadena de llamadas síncronas en serie
const cadena = (disp, n) => Math.pow(disp, n);
for (const n of [1, 3, 5, 10]) {
  const d = cadena(0.999, n);
  console.log(n + ' servicios en serie: ' + (100 * d).toFixed(2) + '% → ' + Math.round((1 - d) * 30 * 24 * 60) + ' min de falla al mes');
}
~~~
Componentes habituales de la infraestructura: una **puerta de enlace de API** (*API gateway*) que recibe las peticiones externas y las dirige, autentica y limita; un **registro de servicios** para encontrar las direcciones; y, en sistemas grandes, una **malla de servicios** (*service mesh*, como Istio o Linkerd) que agrega reintentos, cifrado mutuo y métricas a todas las comunicaciones sin cambiar el código. Para evitar que cada cliente (web, móvil) haga diez llamadas, se usa el patrón **backend para frontend** (BFF): un servicio por tipo de cliente que agrega lo que ese cliente necesita.

## Migrar de un monolito: la higuera estranguladora
Martin Fowler describió en 2004 el patrón **Strangler Fig** (higuera estranguladora), inspirado en las higueras de Australia que crecen sobre un árbol hasta reemplazarlo:
1. Poner un **intermediario** (proxy o puerta de enlace) delante del monolito.
2. Construir una funcionalidad nueva como servicio aparte, o **extraer** una existente.
3. Redirigir en el intermediario las peticiones de esa funcionalidad al nuevo servicio.
4. Repetir hasta que el monolito quede vacío o reducido a lo que no vale la pena migrar.
La ventaja es que se migra **de a poco**, con el sistema siempre funcionando y con la posibilidad de volver atrás. Lo opuesto, reescribir todo de cero y cambiar en un solo día (el *big bang*), es uno de los caminos más conocidos al fracaso: Joel Spolsky lo llamó en 2000 "lo peor que puede hacer una empresa de software", a propósito de la reescritura de Netscape. Patrones complementarios descritos por Newman en *Monolith to Microservices* (2019): **abstracción por rama** (crear una interfaz dentro del monolito, implementar la nueva versión detrás y cambiar), **ejecución en paralelo** (ejecutar el viejo y el nuevo con los mismos datos y comparar resultados antes de cambiar) y **captura de cambios de datos** para sincronizar las bases durante la transición.

## Ejemplo resuelto: extraer Notificaciones de PatioApp
El monolito modular de PatioApp funciona bien, pero el módulo de notificaciones causa problemas: cuando WhatsApp responde lento, los hilos del servidor se agotan y la operación del patio se degrada; además cambia mucho por los cambios del proveedor.
1. **Decisión (ADR-016):** extraerlo como primer servicio; los demás módulos siguen en el monolito.
2. **Contrato:** el monolito publica eventos («SalidaRegistrada», «InspeccionCompletada») en una cola mediante la bandeja de salida transaccional; el servicio de notificaciones los consume. Comunicación asíncrona: si el servicio cae, los eventos esperan en la cola.
3. **Datos:** el servicio guarda su propia copia mínima de los teléfonos y preferencias de los dueños, actualizada con eventos «DueñoActualizado».
4. **Migración en paralelo:** durante dos semanas ambos (módulo y servicio) procesan los eventos, pero solo el módulo envía mensajes; se comparan los mensajes que generaría cada uno. Con cero diferencias, se cambia y se elimina el módulo.
5. **Resultado:** la lentitud de WhatsApp ya no afecta al patio, y el equipo de notificaciones despliega varias veces por semana sin coordinar con nadie.`,
  links: [['m13.styles', 'los microservicios son uno de los estilos de arquitectura'], ['m13.ddd', 'los contextos delimitados guían la división de servicios'], ['sd.tx', 'las sagas reemplazan las transacciones entre servicios']],
  read: 'Newman, *Building Microservices* (2.ª ed., 2021) y *Monolith to Microservices* (2019); Lewis y Fowler, *Microservices* (2014); Richardson, *Microservices Patterns* (2018).',
  terms: [
    ['Microservicios', 'estilo de arquitectura con servicios pequeños, organizados por capacidades del negocio y desplegables de forma independiente', ['Lewis y Fowler, 2014.', 'Cada uno con sus datos.', 'Comunicación ligera.']],
    ['Despliegue independiente', 'capacidad de desplegar un servicio sin desplegar otros al mismo tiempo', ['Propiedad central según Newman.', 'Si falta, es un monolito distribuido.', 'Exige contratos estables.']],
    ['Monolito distribuido', 'sistema dividido en servicios que igual deben desplegarse juntos', ['Lo peor de ambos mundos.', 'Señal de malos límites.', 'Comparte bases de datos.']],
    ['Monolito modular', 'un solo despliegue con módulos internos bien separados por interfaces', ['Recomendado para empezar.', 'Permite extraer servicios después.', 'Los límites se corrigen con refactorización.']],
    ['Base de datos por servicio', 'principio de que cada servicio es dueño exclusivo de sus datos', ['Nadie accede a su base directamente.', 'Evita acoplamientos invisibles.', 'Obliga a usar eventos o sagas.']],
    ['Puerta de enlace de API', 'componente que recibe las peticiones externas y las dirige a los servicios, con autenticación y límites', ['API gateway.', 'Punto de entrada único.', 'Sirve de intermediario al migrar.']],
    ['Higuera estranguladora', 'patrón de migración gradual que redirige funcionalidad del sistema viejo a uno nuevo hasta reemplazarlo', ['Fowler, 2004.', 'El sistema siempre funciona.', 'Opuesto al big bang.']],
    ['Backend para frontend', 'servicio dedicado a un tipo de cliente que agrega lo que ese cliente necesita', ['Uno para la app móvil.', 'Evita diez llamadas desde el cliente.', 'BFF.']]
  ],
  q: [
    ['Según Newman, ¿cuál es la propiedad central de los microservicios?', 'El despliegue independiente', ['Usar Docker', 'Tener menos de 100 líneas', 'Usar REST'], 'Sin ella es un monolito distribuido.', 2],
    ['¿Por qué Fowler recomienda empezar con un monolito?', 'Porque al inicio no se conocen bien los límites y corregir un mal límite entre servicios es muy caro', ['Porque los microservicios no existen', 'Porque los monolitos escalan infinitamente', 'Porque es obligatorio'], 'MonolithFirst, 2015.', 3],
    ['Cinco servicios en serie con 99,9 % de disponibilidad cada uno, ¿qué disponibilidad combinada tienen aproximadamente?', '99,5 %', ['99,9 %', '95 %', '99,99 %'], '0,999⁵ ≈ 0,995.', 3],
    ['Dos servicios leen y escriben la misma base de datos. ¿Qué problema genera?', 'Un acoplamiento invisible: un cambio de esquema de uno rompe al otro', ['Ninguno', 'Mayor seguridad', 'Despliegues más rápidos'], 'Base de datos por servicio.', 2],
    ['¿Qué patrón migra un monolito de a poco redirigiendo funcionalidades a servicios nuevos?', 'La higuera estranguladora', ['El big bang', 'El singleton', 'El conformista'], 'Fowler, 2004.', 2],
    ['¿Qué ventaja tiene la comunicación asíncrona por eventos frente a la síncrona?', 'Desacopla en el tiempo: si el receptor cae, los mensajes esperan', ['Es siempre más consistente', 'No necesita red', 'Elimina la necesidad de idempotencia'], 'A cambio de consistencia eventual.', 3],
    ['¿Qué aprendió en 2023 el equipo de monitoreo de video de Prime Video?', 'Que para su componente un monolito era mucho más barato que microservicios y funciones sin servidor', ['Que los monolitos no escalan', 'Que debían usar más microservicios', 'Que la nube es innecesaria'], 'Redujo costos en un 90 %.', 4],
    { tf: 'Si dos servicios siempre deben desplegarse juntos, probablemente el límite entre ellos está mal elegido.', v: true, e: 'Es una señal de monolito distribuido.', l: 2 },
    { tf: 'Los microservicios reducen la complejidad total del sistema.', v: false, e: 'Reparten la complejidad y agregan la de un sistema distribuido; ayudan a escalar equipos.', l: 2 },
    { c: 'Escribe «disponibilidadCadena(disps)»: disps es la lista de disponibilidades (entre 0 y 1) de servicios llamados en serie; devuelve la disponibilidad combinada redondeada a 4 decimales.', f: 'disponibilidadCadena', p: ['disps'], t: [[[[0.999, 0.999]], 0.998], [[[0.99, 0.95]], 0.9405], [[[]], 1]], sol: '  return Math.round(disps.reduce((a, b) => a * b, 1) * 10000) / 10000;', l: 2 },
    { c: 'Escribe «enrutar(ruta, migradas)»: devuelve "nuevo" si la ruta empieza con alguno de los prefijos de migradas y "monolito" si no (la higuera estranguladora).', f: 'enrutar', p: ['ruta', 'migradas'], t: [[['/notificaciones/enviar', ['/notificaciones']], 'nuevo'], [['/patios/1', ['/notificaciones']], 'monolito'], [['/x', []], 'monolito']], sol: '  return migradas.some(p => ruta.startsWith(p)) ? "nuevo" : "monolito";', l: 2 },
    { c: 'Escribe «acopladosTemporal(commits, a, b)»: commits es una lista de listas de archivos modificados juntos; devuelve en cuántos commits aparecen a la vez a y b.', f: 'acopladosTemporal', p: ['commits', 'a', 'b'], t: [[[[['x', 'y'], ['x'], ['y', 'x', 'z']], 'x', 'y'], 2], [[[], 'a', 'b'], 0]], sol: '  return commits.filter(c => c.includes(a) && c.includes(b)).length;', l: 3 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var n = R.int(2, 8), d = R.pick([0.99, 0.995, 0.999]); g.input(3, 'Una petición atraviesa ' + n + ' servicios en serie con disponibilidad ' + d + ' cada uno. ¿Cuál es la disponibilidad combinada en porcentaje? (2 decimales)', (100 * Math.pow(d, n)).toFixed(2), 'Se multiplican las disponibilidades.'); });
    var pat = [['Un intermediario redirige gradualmente rutas del monolito a servicios nuevos', 'Higuera estranguladora'], ['Un servicio dedicado a la app móvil agrega los datos que esta necesita', 'Backend para frontend'], ['Un componente recibe todas las peticiones externas, autentica y limita', 'Puerta de enlace de API'], ['Se ejecutan el viejo y el nuevo con los mismos datos y se comparan resultados', 'Ejecución en paralelo'], ['Se crea una interfaz dentro del monolito y se cambia la implementación detrás', 'Abstracción por rama'], ['Una capa de infraestructura agrega reintentos y cifrado a todas las comunicaciones', 'Malla de servicios']];
    pat.forEach(function (p) { g.mcq(3, '¿Qué patrón describe esto? ' + p[0], p[1], ['Higuera estranguladora', 'Backend para frontend', 'Puerta de enlace de API', 'Ejecución en paralelo', 'Abstracción por rama', 'Malla de servicios'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Patrones de microservicios y migración.'); });
    var sen = [['Los servicios A y B siempre se despliegan juntos', 'Mal límite'], ['Cada servicio corresponde a un contexto delimitado y tiene sus datos', 'Buen límite'], ['Atender una petición requiere una cadena de 7 llamadas síncronas', 'Mal límite'], ['Un servicio solo envuelve una tabla sin lógica propia', 'Mal límite'], ['Un servicio cambia por reglas comerciales y otro por cambios de proveedor', 'Buen límite']];
    sen.forEach(function (s) { g.mcq(2, '¿Indica un buen o un mal límite entre servicios? ' + s[0], s[1], ['Buen límite', 'Mal límite', 'No influye'].filter(function (x) { return x !== s[1]; }).concat(['Depende del lenguaje']), 'Cohesión alta, acoplamiento bajo.'); });
  },
  checks: [
    ['Define microservicios y su propiedad central.', 'Servicios pequeños, por capacidades del negocio, con sus datos, comunicación ligera y, sobre todo, desplegables de forma independiente.'],
    ['¿Por qué conviene empezar con un monolito modular?', 'Porque los límites del dominio se entienden con el tiempo, y corregirlos dentro de un monolito es mucho más barato que entre servicios.'],
    ['¿Qué consecuencias tiene la base de datos por servicio?', 'Hay que resolver consultas cruzadas con composición o réplicas por eventos, reemplazar transacciones por sagas y aceptar que no hay integridad referencial entre servicios.'],
    ['Describe la migración con la higuera estranguladora.', 'Se pone un intermediario delante del monolito y se redirigen funcionalidades una a una a servicios nuevos, manteniendo el sistema funcionando.']
  ],
  cites: ['Lewis, J. y Fowler, M. (2014). Microservices. martinfowler.com.', 'Fowler, M. (2015). MonolithFirst. martinfowler.com.', 'Fowler, M. (2004). StranglerFigApplication. martinfowler.com.', 'Newman, S. (2019). *Monolith to Microservices*. O’Reilly.', 'Newman, S. (2021). *Building Microservices* (2.ª ed.). O’Reilly.', 'Kolny, M. (2023). Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%. *Prime Video Tech Blog*.'],
  project: { t: 'Extraer un servicio de un monolito',
    goal: 'Practicar una migración gradual con la higuera estranguladora.',
    steps: ['Toma una aplicación monolítica pequeña (tuya o de código abierto) e identifica un módulo candidato a extraer con criterios de cohesión y cambio.', 'Escribe el ADR de la extracción con su motivación.', 'Coloca un intermediario delante del monolito y construye el nuevo servicio con su propia base de datos.', 'Ejecuta ambos en paralelo comparando resultados y luego redirige el tráfico.', 'Mide antes y después: tiempo de despliegue, aislamiento de fallas y latencia.'],
    deliver: 'El código, el ADR, el registro de la ejecución en paralelo y las mediciones.' },
  hito: ['Escribe el ADR de extracción del servicio de notificaciones de PatioApp con su contrato de eventos.', 'Implementa la extracción con ejecución en paralelo y compara los mensajes generados por el módulo y por el servicio antes de cambiar.']
});
SDC.after('m13.micro', 'm13.ddd');

S('m13', 'm13.event', { title: 'Arquitecturas dirigidas por eventos, CQRS y event sourcing',
  ask: '¿Qué concepto de arquitectura dirigida por eventos se aplica?',
  lesson: `
> **La idea en simple.** Hay dos formas de avisar algo en una oficina. Una es ir de escritorio en escritorio pidiendo a cada persona que haga su parte ("contabilidad, cobra; almacén, libera el espacio; recepción, avisa al cliente"). La otra es anunciar en voz alta "¡salió la unidad ABC-123!" y que cada área, que sabe lo que le toca, reaccione por su cuenta. La segunda es una arquitectura dirigida por eventos: quien produce el aviso no necesita saber quién lo escucha.

## Comandos, eventos y consultas
Conviene distinguir tres tipos de mensajes:
- **Comando:** una orden dirigida a alguien que puede aceptarla o rechazarla ("RegistrarSalida"). Se nombra en imperativo.
- **Evento:** un hecho que **ya ocurrió** y no se puede rechazar ("SalidaRegistrada"). Se nombra en pasado y se publica para quien quiera escucharlo.
- **Consulta:** una pregunta que no cambia nada ("¿cuánto debe la unidad ABC-123?").
En una arquitectura dirigida por eventos (EDA, por sus siglas en inglés), los componentes se comunican principalmente publicando y reaccionando a eventos. El productor no conoce a los consumidores: se pueden agregar consumidores nuevos (un reporte, una notificación, un sistema de la aseguradora) sin tocar al productor.

## Cuatro patrones distintos con el mismo nombre
Martin Fowler advirtió en 2017 (*What do you mean by "Event-Driven"?*) que la expresión se usa para cosas muy distintas:
1. **Notificación de eventos:** el evento solo avisa que algo pasó, con datos mínimos (el identificador). Quien necesita más, consulta al productor. Desacopla mucho, pero el flujo completo se vuelve difícil de seguir y puede generar muchas consultas de vuelta.
2. **Transferencia de estado por eventos** (*event-carried state transfer*): el evento lleva todos los datos que los consumidores necesitan, y estos guardan su propia copia. Los consumidores no dependen de que el productor esté disponible, a cambio de duplicar datos y aceptar consistencia eventual.
3. **Event sourcing:** el estado de la aplicación se guarda como la secuencia de eventos que lo produjeron.
4. **CQRS:** separar el modelo de escritura del de lectura.
Los dos últimos se pueden usar juntos o por separado, y no requieren que el resto del sistema sea dirigido por eventos.

## Infraestructura de mensajería
- **Colas** (RabbitMQ, Amazon SQS): cada mensaje lo procesa **un** consumidor; sirven para repartir trabajo. El mensaje se elimina al confirmarse.
- **Publicación y suscripción** con **temas** (*topics*): cada evento llega a **todos** los suscriptores interesados.
- **Registros distribuidos** (Apache Kafka, creado en LinkedIn y liberado en 2011; Amazon Kinesis; Apache Pulsar): los eventos se guardan en un **registro de solo agregar**, particionado y replicado, durante días o para siempre; cada consumidor lleva su propia posición (*offset*) y puede **releer** desde el principio. Jay Kreps, uno de sus creadores, explicó en 2013 (*The Log*) por qué el registro es la abstracción unificadora de los sistemas de datos.
Garantías importantes: el **orden** suele garantizarse solo dentro de una partición (por eso se particiona por una clave como la placa, para que los eventos de una misma unidad lleguen en orden); la entrega suele ser **al menos una vez**, así que los consumidores deben ser **idempotentes**; y los eventos que no se pueden procesar tras varios intentos se envían a una **cola de mensajes muertos** (*dead letter queue*) para revisarlos.

## Event sourcing
En lugar de guardar el estado actual (la fila de la estadía con su saldo), se guardan **todos los eventos** que le ocurrieron: «IngresoRegistrado», «PagoRecibido», «TarifaAjustada», «SalidaRegistrada». El estado actual se obtiene **reproduciendo** los eventos. Greg Young popularizó el patrón hacia 2010, aunque la idea es antigua: así funciona la contabilidad desde hace siglos (el libro diario no se borra; las correcciones son asientos nuevos) y así funciona el registro de transacciones de una base de datos.
~~~js
// Event sourcing: el estado de una estadía es la reducción de sus eventos
const eventos = [
  { tipo: 'IngresoRegistrado', placa: 'ABC-123', espacio: 'B-14' },
  { tipo: 'CargoAplicado', monto: 60 },
  { tipo: 'PagoRecibido', monto: 40 },
  { tipo: 'CargoAplicado', monto: 20 },
  { tipo: 'PagoRecibido', monto: 40 },
  { tipo: 'SalidaRegistrada' }
];
function aplicar(estado, e) {
  switch (e.tipo) {
    case 'IngresoRegistrado': return { ...estado, placa: e.placa, espacio: e.espacio, saldo: 0, abierta: true };
    case 'CargoAplicado': return { ...estado, saldo: estado.saldo + e.monto };
    case 'PagoRecibido': return { ...estado, saldo: estado.saldo - e.monto };
    case 'SalidaRegistrada': return { ...estado, abierta: false, espacio: null };
    default: return estado;
  }
}
console.log(eventos.reduce(aplicar, {}));
console.log('estado tras 3 eventos:', eventos.slice(0, 3).reduce(aplicar, {}));    // viajar en el tiempo
~~~
**Ventajas:** historial completo y auditable (quién hizo qué y cuándo), posibilidad de reconstruir el estado en cualquier momento pasado, de crear nuevas vistas de datos releyendo los eventos y de depurar reproduciendo exactamente lo que ocurrió.
**Costos:** los eventos son para siempre, así que cambiar su estructura exige versionarlos (*upcasting*); reconstruir el estado de entidades con muchos eventos es lento, lo que obliga a guardar **instantáneas** periódicas; las consultas sobre el estado actual necesitan modelos de lectura separados; y el derecho de las personas a que se borren sus datos personales choca con un registro inmutable (se resuelve, por ejemplo, cifrando los datos personales con una clave por persona que se destruye al pedir el borrado). Es un patrón poderoso para dominios donde el historial importa (finanzas, logística, auditoría) y un exceso para un CRUD.

## CQRS
Bertrand Meyer formuló el principio de **separación de comandos y consultas** (CQS): un método debe cambiar el estado o devolver un dato, pero no ambas cosas. Greg Young lo llevó al nivel de la arquitectura con **CQRS** (*Command Query Responsibility Segregation*): un **modelo de escritura** optimizado para validar reglas y aplicar cambios, y uno o varios **modelos de lectura** optimizados para cada consulta, actualizados a partir de los eventos. Por ejemplo, la pantalla del supervisor necesita "ocupación por zona en tiempo real", que sería una consulta pesada sobre el modelo normalizado; con CQRS, una **proyección** mantiene una tabla con la ocupación de cada zona, actualizada con cada evento de ingreso y salida, y la pantalla la lee directamente.
El costo es la **consistencia eventual** entre escritura y lectura (la pantalla puede mostrar un dato con un segundo de atraso) y más piezas que mantener. Fowler advierte que CQRS agrega complejidad y que la mayoría de los sistemas no lo necesitan; conviene aplicarlo en partes concretas con requisitos de lectura muy distintos de los de escritura.

## Diseñar buenos eventos
- **Nombrarlos en el lenguaje del negocio y en pasado:** «SalidaRegistrada», no «TablaEstadiasActualizada».
- **Esquemas explícitos y versionados**, con un registro de esquemas (Avro, Protobuf o JSON Schema) y reglas de compatibilidad: agregar campos opcionales es compatible; quitar o cambiar el significado de un campo, no.
- **Identificador único** por evento (para la idempotencia), **marca de tiempo**, **identificador de correlación** (para seguir una operación entre servicios) y **versión** del esquema.
- **Un estándar común:** CloudEvents, de la CNCF, define un sobre estándar con esos metadatos.
- **Documentar el catálogo** de eventos (por ejemplo, con AsyncAPI, el equivalente de OpenAPI para mensajería).

## Ejemplo resuelto: eventos en PatioApp
1. **Registro de eventos** en Kafka con un tema «operacion-patio», particionado por placa para conservar el orden de cada unidad.
2. **Productor:** el módulo de Operación publica «IngresoRegistrado», «UnidadMovida», «InspeccionCompletada» y «SalidaRegistrada» mediante la bandeja de salida transaccional.
3. **Consumidores independientes:** Notificaciones (envía mensajes al dueño), Facturación (emite comprobantes), una **proyección** de ocupación por zona para el tablero del supervisor (CQRS) y, más adelante, la aseguradora, que se suscribe sin que Operación cambie una línea.
4. **Event sourcing solo donde paga su costo:** el historial de cada estadía (cargos, pagos, ajustes) se guarda como eventos porque contabilidad y la aseguradora exigen trazabilidad completa; el catálogo de tipos de vehículo sigue siendo un CRUD normal.
5. **Operación:** consumidores idempotentes por identificador de evento, cola de mensajes muertos con alerta y un tablero que muestra el atraso (*lag*) de cada consumidor.`,
  links: [['m13.micro', 'los eventos desacoplan microservicios'], ['sd.tx', 'la bandeja de salida y la idempotencia garantizan el efecto de exactamente una vez'], ['m10.nosql', 'los registros distribuidos son otro tipo de almacén de datos']],
  read: 'Fowler, *What do you mean by "Event-Driven"?* (2017); Kreps, *The Log* (2013); Kleppmann, *Designing Data-Intensive Applications*, capítulo 11; Young, *CQRS Documents* (2010).',
  terms: [
    ['Evento', 'hecho que ya ocurrió, nombrado en pasado y publicado para quien quiera escucharlo', ['SalidaRegistrada.', 'No se puede rechazar.', 'El productor no conoce a los consumidores.']],
    ['Comando', 'orden dirigida a un receptor que puede aceptarla o rechazarla', ['RegistrarSalida.', 'Se nombra en imperativo.', 'Se distingue del evento.']],
    ['Transferencia de estado por eventos', 'patrón en que el evento lleva los datos que los consumidores necesitan para guardar su propia copia', ['Los consumidores no consultan al productor.', 'Duplica datos.', 'Consistencia eventual.']],
    ['Event sourcing', 'patrón que guarda el estado como la secuencia de eventos que lo produjeron', ['Como el libro diario contable.', 'Permite viajar en el tiempo.', 'Necesita instantáneas.']],
    ['CQRS', 'separación entre un modelo de escritura y uno o varios modelos de lectura', ['Greg Young.', 'Proyección de ocupación por zona.', 'Consistencia eventual entre ambos.']],
    ['Proyección', 'modelo de lectura construido y actualizado a partir de los eventos', ['Tabla de ocupación por zona.', 'Se puede reconstruir releyendo eventos.', 'Optimizada para una consulta.']],
    ['Registro distribuido', 'almacén de eventos de solo agregar, particionado y replicado, que los consumidores pueden releer', ['Apache Kafka.', 'Cada consumidor lleva su offset.', 'Kreps, The Log.']],
    ['Cola de mensajes muertos', 'lugar donde se envían los mensajes que no pudieron procesarse tras varios intentos', ['Dead letter queue.', 'Se revisa con alertas.', 'Evita bloquear el flujo.']]
  ],
  q: [
    ['¿Cuál es un evento bien nombrado?', 'SalidaRegistrada', ['RegistrarSalida', 'ActualizarTablaEstadias', 'ProcesarCosas'], 'En pasado y en el lenguaje del negocio.', 1],
    ['¿Qué ventaja tiene que el productor de eventos no conozca a los consumidores?', 'Se pueden agregar consumidores nuevos sin modificar al productor', ['Los eventos son más pequeños', 'No hace falta red', 'Se garantiza consistencia inmediata'], 'Desacoplamiento.', 2],
    ['¿En qué se diferencia una cola de un tema de publicación y suscripción?', 'En la cola cada mensaje lo procesa un consumidor; en el tema llega a todos los suscriptores', ['No hay diferencia', 'La cola es más rápida siempre', 'El tema borra los mensajes al leerlos'], 'Repartir trabajo contra difundir.', 2],
    ['En Kafka, ¿por qué se particiona el tema por placa?', 'Para que los eventos de una misma unidad se mantengan en orden', ['Para cifrarlos', 'Para borrarlos antes', 'Para que lleguen a un solo consumidor siempre'], 'El orden se garantiza dentro de la partición.', 3],
    ['¿Qué problema de event sourcing resuelven las instantáneas?', 'Reconstruir el estado de entidades con muchos eventos es lento', ['El orden de los eventos', 'La seguridad', 'La duplicación de mensajes'], 'Se reproduce desde la última instantánea.', 3],
    ['¿Cuál es el principal costo de CQRS?', 'Consistencia eventual entre escritura y lectura y más piezas que mantener', ['Que no permite consultas', 'Que obliga a usar event sourcing', 'Que es más lento siempre'], 'Fowler advierte que pocos sistemas lo necesitan.', 3],
    ['¿Cómo se concilia event sourcing con el derecho de una persona a borrar sus datos?', 'Cifrando sus datos personales con una clave propia que se destruye cuando pide el borrado', ['Editando los eventos antiguos', 'Ignorando la ley', 'Borrando todo el registro'], 'Borrado criptográfico.', 4],
    { tf: 'Event sourcing exige que todo el sistema sea dirigido por eventos.', v: false, e: 'Puede usarse en una parte del sistema; son patrones independientes.', l: 3 },
    { tf: 'Con entrega al menos una vez, los consumidores deben ser idempotentes.', v: true, e: 'Un mismo evento puede llegar más de una vez.', l: 2 },
    { c: 'Escribe «saldo(eventos)»: eventos tiene {tipo, monto}; "CargoAplicado" suma y "PagoRecibido" resta; los demás no cambian el saldo.', f: 'saldo', p: ['eventos'], t: [[[[{ tipo: 'CargoAplicado', monto: 60 }, { tipo: 'PagoRecibido', monto: 40 }, { tipo: 'SalidaRegistrada' }]], 20], [[[]], 0]], sol: '  let s = 0;\n  for (const e of eventos) { if (e.tipo === "CargoAplicado") s += e.monto; else if (e.tipo === "PagoRecibido") s -= e.monto; }\n  return s;', l: 2 },
    { c: 'Escribe «ocupacion(eventos)»: proyección CQRS. Cada evento es {tipo, zona}; "IngresoRegistrado" suma 1 a la zona y "SalidaRegistrada" resta 1. Devuelve un objeto {zona: unidades}.', f: 'ocupacion', p: ['eventos'], t: [[[[{ tipo: 'IngresoRegistrado', zona: 'A' }, { tipo: 'IngresoRegistrado', zona: 'B' }, { tipo: 'IngresoRegistrado', zona: 'A' }, { tipo: 'SalidaRegistrada', zona: 'A' }]], { A: 1, B: 1 }], [[[]], {}]], sol: '  const o = {};\n  for (const e of eventos) { o[e.zona] = o[e.zona] || 0; if (e.tipo === "IngresoRegistrado") o[e.zona]++; else if (e.tipo === "SalidaRegistrada") o[e.zona]--; }\n  return o;', l: 3 },
    { c: 'Escribe «consumirIdempotente(eventos)»: devuelve la lista de id de eventos procesados, ignorando los repetidos (cada evento es {id}).', f: 'consumirIdempotente', p: ['eventos'], t: [[[[{ id: 'a' }, { id: 'b' }, { id: 'a' }]], ['a', 'b']], [[[]], []]], sol: '  const vistos = new Set(), out = [];\n  for (const e of eventos) if (!vistos.has(e.id)) { vistos.add(e.id); out.push(e.id); }\n  return out;', l: 2 }
  ],
  gen: function (g) {
    var ti = [['RegistrarSalida', 'Comando'], ['SalidaRegistrada', 'Evento'], ['¿Cuánto debe la unidad ABC-123?', 'Consulta'], ['AplicarDescuento', 'Comando'], ['PagoRecibido', 'Evento'], ['¿Qué espacios están libres en la zona B?', 'Consulta'], ['InspeccionCompletada', 'Evento']];
    ti.forEach(function (t) { g.mcq(1, '¿Es un comando, un evento o una consulta? ' + t[0], t[1], ['Comando', 'Evento', 'Consulta'].filter(function (x) { return x !== t[1]; }).concat(['Proyección']), 'Imperativo, pasado o pregunta.'); });
    var pa = [['El evento solo lleva el identificador y quien necesita más consulta al productor', 'Notificación de eventos'], ['El evento lleva todos los datos y cada consumidor guarda su copia', 'Transferencia de estado por eventos'], ['El estado se reconstruye reproduciendo todos los eventos', 'Event sourcing'], ['Un modelo para validar cambios y otros para cada consulta', 'CQRS']];
    pa.forEach(function (p) { g.mcq(3, 'Según Fowler, ¿qué patrón dirigido por eventos es? ' + p[0], p[1], ['Notificación de eventos', 'Transferencia de estado por eventos', 'Event sourcing', 'CQRS'].filter(function (x) { return x !== p[1]; }), 'Cuatro patrones con el mismo nombre.'); });
    g.times(6, function (R) { var c = [R.int(10, 50), R.int(10, 50), R.int(10, 50)], p = [R.int(5, 40), R.int(5, 40)]; g.input(3, 'Una estadía tiene cargos de ' + c.join(', ') + ' y pagos de ' + p.join(' y ') + ' soles. Reproduciendo los eventos, ¿cuál es el saldo?', c[0] + c[1] + c[2] - p[0] - p[1], 'Cargos suman, pagos restan.'); });
  },
  checks: [
    ['Diferencia comando, evento y consulta con ejemplos.', 'Comando: RegistrarSalida (puede rechazarse); evento: SalidaRegistrada (ya ocurrió); consulta: cuánto debe una unidad (no cambia nada).'],
    ['¿Qué cuatro patrones distingue Fowler bajo "dirigido por eventos"?', 'Notificación de eventos, transferencia de estado por eventos, event sourcing y CQRS.'],
    ['Explica ventajas y costos del event sourcing.', 'Historial completo, auditoría y reconstrucción en el tiempo; a cambio de versionar eventos, instantáneas, modelos de lectura y dificultades con el borrado de datos.'],
    ['¿Cuándo conviene CQRS?', 'Cuando los requisitos de lectura son muy distintos de los de escritura en una parte concreta del sistema; en el resto agrega complejidad innecesaria.']
  ],
  cites: ['Fowler, M. (2017). What do you mean by "Event-Driven"? martinfowler.com.', 'Kreps, J. (2013). The Log: What every software engineer should know about real-time data’s unifying abstraction. engineering.linkedin.com.', 'Young, G. (2010). *CQRS Documents*.', 'Meyer, B. (1988). *Object-Oriented Software Construction*. Prentice Hall.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*, capítulo 11. O’Reilly.', 'Cloud Native Computing Foundation (2019). *CloudEvents Specification v1.0*.'],
  project: { t: 'Un sistema con eventos, proyecciones y event sourcing',
    goal: 'Construir un pequeño sistema dirigido por eventos y medir sus propiedades.',
    steps: ['Define el catálogo de eventos de un proceso (por ejemplo, pedidos de una tienda) con esquemas versionados.', 'Implementa un productor que publique eventos con la bandeja de salida y dos consumidores idempotentes.', 'Construye una proyección de lectura (CQRS) y reconstrúyela desde cero releyendo los eventos.', 'Implementa event sourcing para una entidad, con instantáneas cada 100 eventos.', 'Agrega una versión nueva de un evento y un consumidor que acepte ambas versiones.'],
    deliver: 'El código, el catálogo de eventos (AsyncAPI o similar) y las mediciones de reconstrucción con y sin instantáneas.' },
  hito: ['Publica los eventos de operación de PatioApp en un registro particionado por placa y construye la proyección de ocupación por zona.', 'Implementa el historial de cada estadía de PatioApp con event sourcing (cargos, pagos, ajustes) y una consulta del saldo en cualquier fecha pasada.']
});
SDC.after('m13.event', 'm13.micro');
})();
