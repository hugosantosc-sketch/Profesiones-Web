(function () {
var X = SDC.X, XM = SDC.XM;
XM('m9', {
  uni: 'Stanford CS144 *Introduction to Computer Networking* y CS142 *Web Applications*; Berkeley CS168 *Introduction to the Internet: Architecture and Protocols*; Harvard CS50W *Web Programming with Python and JavaScript*; MIT 6.1800 (antes 6.033) *Computer Systems Engineering* (redes). En Perú: Redes de Computadoras y Desarrollo de Aplicaciones Web (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp en la web',
    goal: 'Publicar PatioApp como aplicación web completa: API REST bien diseñada, interfaz accesible y actualización en tiempo real.',
    steps: ['Documenta qué ocurre en la red (DNS, TCP, TLS, HTTP) cuando alguien abre la aplicación y mide cada etapa.', 'Implementa la API REST con códigos de estado correctos, paginación, errores estándar y documentación OpenAPI.', 'Construye la interfaz con HTML semántico, diseño móvil primero y componentes que se dibujan desde el estado.', 'Agrega actualización en vivo y búsqueda con cancelación de peticiones.', 'Despliega en Vercel u otro servicio y pasa una auditoría Lighthouse con al menos 90 en rendimiento y accesibilidad.'],
    deliver: 'La aplicación publicada, el repositorio, el documento OpenAPI y el informe de Lighthouse.' }
});

X('m9.tcp', {
  deep: `
## Cómo nació internet
ARPANET conectó sus primeros nodos en 1969. Vint Cerf y Bob Kahn publicaron en 1974 *A Protocol for Packet Network Intercommunication*, la base de TCP/IP, y el 1 de enero de 1983 ARPANET cambió definitivamente a TCP/IP; esa fecha suele considerarse el nacimiento de internet. Cerf y Kahn recibieron el Premio Turing en 2004. La idea central es la **conmutación de paquetes**, propuesta en los años 60 por Paul Baran y Donald Davies: los datos se parten en paquetes que viajan por separado y se rearman en el destino, sin reservar un circuito como hacía la telefonía.

## El principio de extremo a extremo
Jerome Saltzer, David Reed y David Clark formularon en 1984 un principio que explica por qué internet es como es: las funciones como la confiabilidad o el cifrado deben implementarse en los **extremos** (los computadores que se comunican), no en la red. La red solo se esfuerza por entregar paquetes ("mejor esfuerzo"); TCP, en los extremos, se encarga de reenviar lo perdido. Eso hizo posible agregar aplicaciones nuevas sin cambiar la red.

## Direcciones IP en detalle
- **IPv4** usa 32 bits: unos 4300 millones de direcciones. La IANA entregó sus últimos bloques en 2011.
- **NAT** permite que toda una casa u oficina comparta una IP pública; por eso tu laptop tiene una dirección privada como «192.168.1.25». Los rangos privados son 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16.
- **CIDR:** «/24» significa que los primeros 24 bits identifican la red, así que quedan 8 bits: 256 direcciones, 254 utilizables (se reservan la de red y la de difusión).
- **IPv6** usa 128 bits, suficientes para no volver a agotarse.

## Lo que TCP hace por ti
- **Números de secuencia y confirmaciones (ACK):** cada byte está numerado; lo que no se confirma se reenvía.
- **Control de flujo:** el receptor anuncia cuánto puede recibir (la ventana) para no ser inundado.
- **Control de congestión:** en 1986 internet sufrió "colapsos por congestión" donde el tráfico útil caía a casi nada. Van Jacobson propuso en 1988 que TCP empiece despacio (*slow start*), duplique su velocidad mientras no haya pérdidas y la reduzca a la mitad al detectar una. Esa idea mantiene internet funcionando.
El costo es la latencia: abrir una conexión TCP exige un viaje de ida y vuelta, y TLS (el cifrado de HTTPS) agrega al menos otro. Por eso HTTP/3 usa **QUIC** (estandarizado en el RFC 9000 en 2021), que va sobre UDP y combina el saludo de transporte y el de cifrado.

## DNS: la guía telefónica distribuida
Paul Mockapetris diseñó DNS en 1983. Es una base de datos jerárquica: para resolver «www.ejemplo.pe», un resolvedor pregunta a un servidor raíz por «.pe», luego al servidor de «.pe» por «ejemplo.pe», y luego al de «ejemplo.pe» por «www». Cada respuesta trae un **TTL** que indica cuánto tiempo guardarla en caché; por eso un cambio de DNS puede tardar en verse. Registros que usarás al publicar en Vercel o similares:
| Registro | Para qué |
| A / AAAA | nombre → dirección IPv4 / IPv6 |
| CNAME | nombre → otro nombre (alias) |
| MX | servidores de correo del dominio |
| TXT | texto libre: verificaciones de dominio, políticas de correo |

## La física no se negocia
La luz en la fibra viaja a unos 200 000 km por segundo. Entre Lima y Madrid hay unos 9500 km en línea recta, así que el viaje de ida y vuelta no puede bajar de unos 95 ms, aunque el ancho de banda sea enorme. Por eso existen las **CDN** (redes de distribución de contenido): copias de tus archivos en servidores cercanos a cada usuario. La cantidad de datos "en vuelo" que puede tener una conexión es el **producto ancho de banda × retardo**; si es grande, TCP necesita ventanas grandes para aprovechar el enlace.

~~~js
// Tiempo mínimo de ida y vuelta según la distancia
const kmPorSegundo = 200000;
for (const [destino, km] of [['Arequipa', 770], ['Miami', 4200], ['Madrid', 9500], ['Tokio', 15500]]) {
  console.log(destino, Math.round(2 * km / kmPorSegundo * 1000) + ' ms como mínimo');
}
~~~

## Herramientas para mirar la red
«ping» mide la latencia; «traceroute» (o «tracert» en Windows) muestra los saltos; «dig» o «nslookup» consultan DNS; «curl -v» muestra cada paso de una petición HTTP y «curl -w» permite medir cuánto tardó el DNS, la conexión, TLS y la respuesta. Kurose y Ross, en *Computer Networking: A Top-Down Approach*, recomiendan aprender redes **de arriba hacia abajo**: empezar por la aplicación que conoces y bajar capa por capa.`,
  checks: [
    ['¿Qué dice el principio de extremo a extremo y qué consecuencia tuvo?', 'Que funciones como la confiabilidad y el cifrado deben hacerse en los extremos y no en la red; así la red se mantuvo simple y se pudieron crear aplicaciones nuevas sin cambiarla.'],
    ['¿Cuántas direcciones utilizables tiene una red /26?', '2^(32−26) = 64 direcciones, de las cuales 62 son utilizables.'],
    ['¿Qué problema resolvió Van Jacobson con el control de congestión?', 'Los colapsos de 1986, cuando los reenvíos saturaban la red; TCP empezó a aumentar su velocidad poco a poco y a reducirla a la mitad al detectar pérdidas.'],
    ['¿Por qué un cambio de DNS no se ve de inmediato en todos lados?', 'Porque los resolvedores guardan las respuestas en caché durante el TTL; hasta que expira, siguen respondiendo con el valor viejo.'],
    ['Si mejoras el ancho de banda de 100 a 1000 Mbps, ¿baja la latencia entre Lima y Madrid?', 'No: la latencia mínima la impone la distancia y la velocidad de la luz en la fibra; el ancho de banda solo aumenta cuántos datos caben por segundo.']
  ],
  cites: ['Cerf, V. y Kahn, R. (1974). A Protocol for Packet Network Intercommunication. *IEEE Transactions on Communications*, 22(5).', 'Saltzer, J., Reed, D. y Clark, D. (1984). End-to-End Arguments in System Design. *ACM Transactions on Computer Systems*, 2(4).', 'Jacobson, V. (1988). Congestion Avoidance and Control. *ACM SIGCOMM 1988*.', 'Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.). Pearson.', 'Mockapetris, P. (1987). *RFC 1034 y RFC 1035: Domain Names*. IETF.'],
  project: { t: 'Explorador de red',
    goal: 'Ver con tus propios ojos las capas de la red y construir un servidor y un cliente a bajo nivel.',
    steps: ['Con dig, ping, traceroute y curl -v -w, documenta qué pasa al abrir tres sitios (uno peruano, uno en EE. UU. y uno en Europa) y compara los tiempos de cada etapa.', 'Escribe con el módulo net de Node un servidor TCP de eco y un cliente que mida la latencia de ida y vuelta.', 'Escribe lo mismo con UDP (módulo dgram) y simula pérdida de paquetes descartando 10% al azar.', 'Escribe a mano una petición HTTP sobre una conexión TCP y lee la respuesta cruda.', 'Calcula la cantidad de direcciones y el rango de tres redes CIDR de ejemplo.'],
    deliver: 'Un informe con las mediciones y capturas, más el código del servidor y los clientes.' },
  hito: ['Crea un servidor HTTP mínimo para PatioApp con el módulo http de Node (sin frameworks) que responda en /salud con el estado del servicio.', 'Documenta qué ocurre (DNS, TCP, TLS, HTTP) cuando un usuario abre PatioApp y mide cada etapa con curl -w.']
});

X('m9.http', {
  deep: `
## La web: tres inventos de una sola persona
Tim Berners-Lee propuso la World Wide Web en el CERN en 1989 y en 1991 publicó el primer sitio. Inventó a la vez **HTML** (el formato), **HTTP** (el protocolo) y las **URL** (las direcciones). Recibió el Premio Turing en 2016. HTTP evolucionó así:
| Versión | Año | Novedad |
| HTTP/1.0 | 1996 | una conexión por petición |
| HTTP/1.1 | 1997 | conexiones persistentes y encabezado Host (varios sitios en un servidor) |
| HTTP/2 | 2015 | binario y multiplexado: muchas peticiones en paralelo por una conexión |
| HTTP/3 | 2022 | sobre QUIC (UDP), sin bloqueos cuando se pierde un paquete |
La semántica (métodos, códigos, encabezados) se mantuvo; hoy está unificada en el RFC 9110 (2022).

## REST según su autor
Roy Fielding, uno de los autores de la especificación de HTTP/1.1, describió en su tesis doctoral (2000) el estilo arquitectónico **REST** con un conjunto de restricciones:
- **Cliente-servidor:** separar la interfaz del almacenamiento.
- **Sin estado:** cada petición lleva toda la información necesaria; el servidor no recuerda la conversación. Facilita escalar con muchos servidores.
- **Cacheable:** las respuestas indican si se pueden reutilizar.
- **Interfaz uniforme:** recursos identificados por URL, manipulados mediante representaciones (JSON), mensajes autodescriptivos y, en la versión estricta, enlaces que guían al cliente (hipermedia).
- **Sistema en capas:** puede haber proxies, balanceadores y cachés entre cliente y servidor sin que el cliente lo note.
Leonard Richardson propuso un **modelo de madurez**: nivel 0 (todo por un solo endpoint), nivel 1 (recursos), nivel 2 (verbos y códigos HTTP correctos) y nivel 3 (hipermedia). La mayoría de las APIs que se llaman REST están en el nivel 2.

## Seguro e idempotente
| Método | Seguro (no cambia nada) | Idempotente (repetirlo da lo mismo) |
| GET, HEAD | sí | sí |
| PUT | no | sí |
| DELETE | no | sí |
| POST | no | no |
| PATCH | no | no necesariamente |
La idempotencia importa porque las redes fallan: si un PUT no recibió respuesta, se puede reintentar sin miedo. Para POST (por ejemplo, un pago), las APIs serias aceptan una **clave de idempotencia** en un encabezado: si llega dos veces la misma clave, el servidor devuelve el resultado de la primera vez en lugar de cobrar dos veces.

## Caché HTTP
- «Cache-Control: max-age=3600» permite reutilizar la respuesta una hora.
- **ETag:** el servidor envía una huella del contenido; el cliente pregunta luego con «If-None-Match» y, si no cambió, recibe un **304 No modificado** sin cuerpo. Ahorra ancho de banda y tiempo.

## Diseño de una API que otros disfruten
~~~txt
GET    /v1/unidades?estado=lista&marca=Toyota&limite=20&cursor=abc   → 200 con lista y siguiente cursor
GET    /v1/unidades/ABC123                                         → 200 o 404
POST   /v1/unidades           (cuerpo JSON)                        → 201 Created + Location: /v1/unidades/ABC123
PATCH  /v1/unidades/ABC123    { "estado": "lista" }                → 200 o 409 si la transición no es válida
DELETE /v1/unidades/ABC123                                         → 204
~~~
- Sustantivos en plural para los recursos, verbos HTTP para las acciones.
- **Paginación por cursor** en listas grandes: con «offset» muy alto la base de datos recorre todo lo saltado y, si se insertan registros, se repiten o se pierden elementos.
- **Versionado** («/v1») para poder cambiar sin romper a los clientes existentes.
- **Errores con formato estándar:** el RFC 9457 (*Problem Details for HTTP APIs*, 2023) define un JSON con «type», «title», «status», «detail» e «instance».
~~~js
const error = { type: 'https://patioapp.pe/errores/transicion-invalida', title: 'Transición de estado no permitida', status: 409,
  detail: 'La unidad ABC123 está "ingresada" y no puede pasar a "entregada" sin revisión.', instance: '/v1/unidades/ABC123' };
console.log(JSON.stringify(error, null, 2));
~~~
Arnaud Lauret, en *The Design of Web APIs*, insiste en diseñar desde el punto de vista de quien consume la API, y en describirla con **OpenAPI**, un formato que permite generar documentación, clientes y pruebas.

## Más allá de REST
- **GraphQL** (Facebook, liberado en 2015): el cliente pide exactamente los campos que necesita en una sola consulta. Útil cuando hay muchas pantallas con necesidades distintas.
- **gRPC** (Google, liberado en 2016): llamadas a procedimientos remotos con contratos tipados y formato binario; muy usado entre microservicios.
- **WebSockets** (RFC 6455, 2011) y **Server-Sent Events**: el servidor envía datos al cliente sin que este pregunte, para tiempo real.

## Cookies y estado
HTTP no tiene estado, pero las aplicaciones necesitan recordar quién eres. Lou Montulli inventó las **cookies** en Netscape en 1994: el servidor envía un dato que el navegador devuelve en cada petición. Los atributos «HttpOnly», «Secure» y «SameSite» son esenciales para la seguridad, como verás en el módulo correspondiente.`,
  checks: [
    ['¿Qué significa que REST sea "sin estado" y qué ventaja da?', 'Que cada petición trae toda la información necesaria y el servidor no recuerda conversaciones; así cualquier servidor puede atender cualquier petición y es fácil escalar.'],
    ['¿Por qué un PUT se puede reintentar sin miedo y un POST no?', 'Porque PUT es idempotente: repetirlo deja el mismo estado. POST puede crear o cobrar dos veces, salvo que se use una clave de idempotencia.'],
    ['¿Qué ocurre con una petición con «If-None-Match» cuando el recurso no cambió?', 'El servidor responde 304 No modificado sin cuerpo y el cliente usa su copia en caché.'],
    ['¿Por qué se prefiere la paginación por cursor a la de offset en listas grandes?', 'Porque con offset alto la base de datos debe recorrer y descartar muchas filas, y si se insertan o borran registros se repiten o se pierden elementos; el cursor continúa desde un punto estable.'],
    ['Un cliente intenta pasar una unidad a "entregada" sin revisión. ¿Qué código de estado devolverías?', '409 Conflict (o 422), porque la petición está bien formada pero entra en conflicto con el estado actual del recurso, junto con un detalle del problema.']
  ],
  cites: ['Fielding, R. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Tesis doctoral, University of California, Irvine. Capítulo 5.', 'Fielding, R., Nottingham, M. y Reschke, J. (eds.) (2022). *RFC 9110: HTTP Semantics*. IETF.', 'Nottingham, M., Wilde, E. y Dalal, S. (2023). *RFC 9457: Problem Details for HTTP APIs*. IETF.', 'Lauret, A. (2019). *The Design of Web APIs*. Manning.', 'Berners-Lee, T. (1989). *Information Management: A Proposal*. CERN.'],
  project: { t: 'API REST de inventario bien diseñada',
    goal: 'Construir una API que respete la semántica de HTTP y que otro equipo pueda usar sin preguntarte nada.',
    steps: ['Diseña primero la API en un documento OpenAPI: recursos, parámetros, respuestas y errores.', 'Impleméntala con Node (http o Express): listado con filtros y paginación por cursor, detalle, creación, actualización parcial y borrado.', 'Devuelve los códigos correctos (200, 201, 204, 400, 404, 409, 422) y errores en formato Problem Details.', 'Agrega ETag y respuestas 304, y una clave de idempotencia para la creación.', 'Escribe pruebas con curl o con un script que verifiquen cada código de estado.'],
    deliver: 'La API, el documento OpenAPI y la colección de pruebas.' },
  hito: ['Crea la API REST de PatioApp: GET /unidades (filtros y paginación), GET /unidades/:placa, POST /unidades (201 y Location), PATCH del estado y DELETE, con errores en formato Problem Details.', 'Describe la API en un documento OpenAPI y verifica cada endpoint con curl.']
});

X('m9.front', {
  deep: `
## Tres lenguajes, tres historias
**HTML** viene de Berners-Lee (1991). **CSS** lo propuso Håkon Wium Lie en 1994 para separar el contenido de la presentación. **JavaScript** lo creó Brendan Eich en Netscape en 1995, en unos diez días; hoy es el único lenguaje que todos los navegadores ejecutan de forma nativa. Los tres los estandarizan el W3C, el WHATWG y Ecma International.

## Cómo dibuja el navegador una página
:::flow HTML → DOM | CSS → CSSOM | Árbol de renderizado | Layout (geometría) | Paint (píxeles) | Composición
1. El navegador lee el HTML y construye el **DOM**; lee el CSS y construye el **CSSOM**.
2. Los combina en el **árbol de renderizado** (solo lo visible).
3. **Layout:** calcula la posición y el tamaño de cada caja.
4. **Paint:** rellena los píxeles.
5. **Composición:** junta las capas en la pantalla.
Cambiar el ancho de un elemento obliga a recalcular el layout (caro); cambiar «transform» u «opacity» solo afecta la composición (barato). Por eso las animaciones fluidas usan «transform». Leer «offsetHeight» justo después de modificar estilos obliga al navegador a recalcular en el momento; hacerlo dentro de un bucle provoca el *layout thrashing* que congela páginas.

## Métricas que usa Google
Las **Core Web Vitals** miden la experiencia real de los usuarios:
| Métrica | Mide | Bueno |
| LCP (Largest Contentful Paint) | cuándo aparece el contenido principal | menos de 2.5 s |
| INP (Interaction to Next Paint) | qué tan rápido responde a las interacciones | menos de 200 ms |
| CLS (Cumulative Layout Shift) | cuánto "salta" el contenido mientras carga | menos de 0.1 |
INP reemplazó en marzo de 2024 a la métrica anterior (FID). Robert Miller ya había estudiado en 1968 los tiempos de respuesta: alrededor de 0.1 s se siente instantáneo, 1 s mantiene el hilo del pensamiento y más de 10 s hace que la persona abandone; Jakob Nielsen popularizó esos límites en 1993.

## Diseño adaptable y móvil primero
Ethan Marcotte acuñó en 2010 el término *responsive web design* (rejillas fluidas, imágenes flexibles y media queries). Luke Wroblewski propuso diseñar **primero para el móvil**: obliga a priorizar lo esencial, y luego se agregan capas para pantallas grandes. En Perú, donde la mayoría navega desde el celular, no es opcional.
~~~txt
.listado { display: grid; gap: 12px; grid-template-columns: 1fr; }
@media (min-width: 700px)  { .listado { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .listado { grid-template-columns: repeat(3, 1fr); } }
~~~

## La cascada, con precisión
Cuando dos reglas chocan, el navegador decide en este orden: origen e importancia («!important»), **especificidad** (estilo en línea > id > clase, atributo o pseudoclase > etiqueta) y, si empatan, la que aparece **después**. «box-sizing: border-box» hace que el ancho incluya el relleno y el borde, y evita la mayoría de los descuadres.

## Componentes y estado
Las interfaces modernas se piensan como **función del estado**: «vista = f(estado)». Cuando el estado cambia, la vista se recalcula. React (Facebook, 2013) popularizó esta idea; Vue, Svelte y otros la comparten. La regla de oro es tener **una sola fuente de verdad**: si la lista de unidades vive en dos lugares, terminarán diferentes.
~~~js
// Un componente mínimo sin librerías: la vista se deriva del estado
const estado = { filtro: 'lista', unidades: [{ placa: 'ABC123', estado: 'lista' }, { placa: 'XYZ789', estado: 'pendiente' }] };
const vista = e => e.unidades.filter(u => u.estado === e.filtro).map(u => '<li>' + u.placa + '</li>').join('');
console.log(vista(estado));
estado.filtro = 'pendiente';
console.log(vista(estado));
~~~

## Dónde se genera el HTML
| Estrategia | Cómo | Bueno para |
| Estático (SSG) | el HTML se genera al compilar | documentación, blogs, cursos como este |
| Del lado del cliente (SPA) | el navegador recibe JS y arma todo | aplicaciones muy interactivas detrás de un inicio de sesión |
| Del lado del servidor (SSR) | el servidor arma el HTML en cada petición | contenido dinámico que debe cargar rápido y ser indexable |
Plataformas como Vercel combinan las tres según la página.

## Formularios que no frustran
Usa la etiqueta correcta para cada dato («type="email"», «inputmode="numeric"»), etiquetas «label» asociadas, validación en el navegador **y** en el servidor (la del navegador se puede saltar), mensajes de error junto al campo que explican cómo corregir, y nunca borres lo que la persona escribió al mostrar un error. El módulo de interacción humano-computador profundiza en usabilidad y accesibilidad.`,
  checks: [
    ['¿Por qué animar «transform» es más fluido que animar «width»?', 'Porque cambiar el ancho obliga a recalcular layout y repintar, mientras que transform solo afecta la etapa de composición, que suele hacerse en la GPU.'],
    ['¿Qué mide INP y cuál es un valor bueno?', 'Cuánto tarda la página en reaccionar visualmente a las interacciones del usuario; menos de 200 ms es bueno.'],
    ['Dos reglas aplican a un botón: «#enviar { color: red }» y «.btn.primario { color: blue }». ¿Qué color gana?', 'Rojo, porque un selector de id es más específico que dos clases.'],
    ['¿Qué significa "una sola fuente de verdad" en una interfaz?', 'Que cada dato vive en un solo lugar del estado y todo lo demás se deriva de él; así la interfaz no muestra versiones contradictorias.'],
    ['¿Por qué la validación del navegador no basta?', 'Porque cualquiera puede saltarla (desactivando JavaScript o enviando la petición directamente); el servidor debe validar siempre.']
  ],
  cites: ['Marcotte, E. (2010). Responsive Web Design. *A List Apart*, 306.', 'Wroblewski, L. (2011). *Mobile First*. A Book Apart.', 'Miller, R. B. (1968). Response time in man-computer conversational transactions. *AFIPS Fall Joint Computer Conference*.', 'Google (2024). *Web Vitals*. web.dev/vitals.', 'Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. Capítulos 14 a 19.'],
  project: { t: 'Interfaz web del patio',
    goal: 'Construir una interfaz rápida, adaptable y mantenible consumiendo una API real.',
    steps: ['Maqueta con HTML semántico (header, nav, main, form, table) y diseño móvil primero con Grid y Flexbox.', 'Programa componentes que se dibujen desde un único objeto de estado (sin librerías o con la que prefieras).', 'Crea un formulario de ingreso con validación accesible y mensajes junto a cada campo.', 'Mide con Lighthouse y con la pestaña Performance; corrige al menos tres problemas de LCP, INP o CLS.', 'Prueba la interfaz en un celular real con conexión 4G simulada.'],
    deliver: 'La interfaz publicada, el informe de Lighthouse antes y después y una lista de las mejoras aplicadas.' },
  hito: ['Crea la interfaz web de PatioApp que consuma la API: listado, búsqueda y formulario de ingreso con validación, con diseño móvil primero.', 'Pasa una auditoría Lighthouse con al menos 90 en rendimiento y en accesibilidad.']
});

X('m9.async', {
  deep: `
## Por qué JavaScript es asíncrono
Ryan Dahl presentó Node.js en 2009 con una apuesta: en lugar de un hilo por conexión (que consume memoria y cambios de contexto), un solo hilo con **E/S no bloqueante** y un bucle de eventos. Así un servidor modesto atiende miles de conexiones que pasan la mayor parte del tiempo esperando a la red o al disco. Era una respuesta al **problema C10K** planteado por Dan Kegel en 1999: cómo atender diez mil clientes a la vez.

## El bucle de eventos, paso a paso
1. Se ejecuta todo el código síncrono hasta vaciar la **pila de llamadas**.
2. Se ejecutan **todas** las **microtareas** pendientes (continuaciones de promesas, «queueMicrotask»).
3. El navegador puede **pintar** la pantalla.
4. Se toma **una** tarea (macrotarea) de la cola: un temporizador, un evento de clic, la llegada de datos de red. Se vuelve al paso 1.
~~~js
console.log('1 síncrono');
setTimeout(() => console.log('5 temporizador (macrotarea)'), 0);
Promise.resolve().then(() => console.log('3 promesa (microtarea)'));
queueMicrotask(() => console.log('4 otra microtarea'));
console.log('2 síncrono');
~~~
Consecuencia práctica: un cálculo síncrono de 3 segundos congela la página, porque el bucle no puede atender clics ni pintar. Para trabajo pesado se usan **Web Workers** (o «worker_threads» en Node), que corren en otro hilo y se comunican por mensajes.

## De callbacks a async/await
La idea de un valor que "llegará después" se llamó *promise* en un trabajo de Daniel Friedman y David Wise (1976) y *future* en el de Henry Baker y Carl Hewitt (1977). JavaScript recorrió tres etapas:
- **Callbacks:** la función recibe qué hacer al terminar. Anidarlos produce el "infierno de callbacks" y hace difícil manejar errores.
- **Promesas** (estándar Promises/A+, adoptadas en ES2015): un objeto que representa el resultado futuro, encadenable con «then» y «catch».
- **async/await** (ES2017): se escribe como código síncrono y los errores se atrapan con «try/catch».

## Combinadores de promesas
| Función | Termina cuando | Uso |
| Promise.all | todas se cumplen, o la primera falla | cargar varios recursos que se necesitan juntos |
| Promise.allSettled | todas terminan, bien o mal | procesar un lote e informar cuáles fallaron |
| Promise.race | la primera termina (bien o mal) | implementar un tiempo límite |
| Promise.any | la primera se cumple | pedir a varios espejos y quedarse con el más rápido |

## Concurrencia con límite
Lanzar 10 000 peticiones a la vez con «Promise.all» puede saturar al servidor o agotar las conexiones. Un **grupo de trabajadores** limita cuántas corren a la vez:
~~~js
async function conLimite(tareas, limite) {
  const resultados = []; let i = 0;
  async function trabajador() { while (i < tareas.length) { const k = i++; resultados[k] = await tareas[k](); } }
  await Promise.all(Array.from({ length: limite }, trabajador));
  return resultados;
}
const espera = (ms, v) => () => new Promise(r => setTimeout(() => r(v), ms));
conLimite([espera(30, 'a'), espera(10, 'b'), espera(20, 'c'), espera(5, 'd')], 2).then(r => console.log(r));
~~~

## Cancelar y poner tiempos límite
Una búsqueda que se dispara con cada tecla debe **cancelar** la petición anterior; si no, una respuesta vieja puede llegar después de la nueva y mostrar resultados equivocados. «AbortController» permite cancelar «fetch» y otras operaciones:
~~~js
let controlador = null;
async function buscar(texto) {
  if (controlador) controlador.abort();          // cancela la búsqueda anterior
  controlador = new AbortController();
  try {
    const r = await fetch('/api/unidades?q=' + encodeURIComponent(texto), { signal: controlador.signal });
    return await r.json();
  } catch (e) { if (e.name !== 'AbortError') throw e; }
}
console.log(typeof buscar);
~~~
Combínalo con **debounce** (esperar unos 300 ms sin teclear antes de buscar) para no enviar una petición por letra.

## Errores asíncronos
Una promesa rechazada que nadie atiende es un **rechazo no manejado**: en Node termina el proceso por defecto (desde la versión 15). Reglas: todo «await» que pueda fallar va dentro de «try/catch» o la promesa tiene su «.catch»; no mezcles callbacks y promesas sin convertir; y nunca dejes un «async» sin esperar ("dispara y olvida") salvo que manejes su error explícitamente.

## Flujos de datos
Para archivos o respuestas enormes se usan **streams**: los datos se procesan por trozos a medida que llegan, con memoria constante, y con **contrapresión** (si el consumidor es lento, el productor espera). Kyle Simpson explica estos mecanismos en *You Don't Know JS: Async & Performance*.`,
  checks: [
    ['¿En qué orden se imprimen: un console.log síncrono, un setTimeout(…, 0) y un Promise.resolve().then(…)?', 'Primero el síncrono, luego la promesa (microtarea) y al final el temporizador (macrotarea).'],
    ['¿Por qué un cálculo síncrono largo congela la página?', 'Porque ocupa el único hilo; el bucle de eventos no puede atender clics ni pintar hasta que termine. Hay que dividirlo o moverlo a un Web Worker.'],
    ['¿Cuándo usarías Promise.allSettled en lugar de Promise.all?', 'Cuando quieres que todas terminen e informar cuáles fallaron, en lugar de abortar todo ante el primer error.'],
    ['¿Qué problema evita cancelar la búsqueda anterior con AbortController?', 'Que una respuesta vieja llegue después de la nueva y muestre resultados que ya no corresponden a lo que el usuario escribió.'],
    ['¿Qué idea de Node.js resolvió el problema C10K?', 'Un solo hilo con E/S no bloqueante y un bucle de eventos, en lugar de un hilo por conexión.']
  ],
  cites: ['Dahl, R. (2009). Node.js. Presentación en JSConf EU, Berlín.', 'Kegel, D. (1999). The C10K problem. kegel.com/c10k.html.', 'Friedman, D. y Wise, D. (1976). The Impact of Applicative Programming on Multiprocessing. *International Conference on Parallel Processing*.', 'Simpson, K. (2015). *You Don\'t Know JS: Async & Performance*. O\'Reilly.', 'WHATWG. *HTML Living Standard: Event loops*. html.spec.whatwg.org.'],
  project: { t: 'Panel en tiempo real con concurrencia controlada',
    goal: 'Dominar las herramientas asíncronas construyendo un panel que se actualiza solo y no se congela.',
    steps: ['Carga datos de tres endpoints en paralelo con Promise.all y muestra un estado de carga y de error por sección.', 'Implementa una búsqueda con debounce y cancelación con AbortController.', 'Procesa 500 peticiones con un límite de 5 a la vez y con reintentos con espera exponencial.', 'Actualiza el panel con Server-Sent Events o, si no puedes, con consultas periódicas cada 10 segundos.', 'Mueve un cálculo pesado (estadísticas de 1 millón de registros) a un Web Worker y comprueba que la página sigue respondiendo.'],
    deliver: 'El panel, una grabación corta mostrando la actualización en vivo y una explicación del orden de ejecución en tu código.' },
  hito: ['Haz que la interfaz de PatioApp se actualice sola (Server-Sent Events o consultas cada 10 s) cuando otro revisor cambia una unidad.', 'Agrega a la búsqueda debounce y cancelación de la petición anterior con AbortController.']
});
})();
