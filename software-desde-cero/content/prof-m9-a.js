(function () {
var D = SDC.D;
SDC.XM('m9', { prof: true });

D('m9.tcp', `## Dónde se va el tiempo de una petición
Cuando una página tarda, conviene saber en qué etapa. Las herramientas de desarrollo del navegador (pestaña Red) muestran para cada petición una **cascada** (*waterfall*) con estas fases:
| Fase | Qué ocurre | Costo típico |
|---|---|---|
| DNS | traducir el nombre a una dirección IP | 0 ms en caché, 20–100 ms si no |
| Conexión TCP | el saludo de tres pasos | un viaje de ida y vuelta (RTT) |
| TLS | negociar el cifrado | un RTT con TLS 1.3, dos con TLS 1.2 |
| Espera (TTFB) | el servidor procesa y empieza a responder | depende del servidor |
| Descarga | recibir los bytes | tamaño entre ancho de banda |
Desde Lima a un servidor en Virginia (Estados Unidos), el RTT ronda los 100 ms: antes de recibir el primer byte de una página nueva ya se gastaron unos 300 ms solo en DNS, TCP y TLS. Por eso importan las **CDN** (servidores cerca del usuario), reutilizar conexiones (HTTP/1.1 *keep-alive*, HTTP/2) y que HTTP/3 combine el saludo de transporte con el de cifrado.

## TLS: el candado del navegador
**TLS** (*Transport Layer Security*, sucesor de SSL de Netscape, 1995) cifra la conexión entre el navegador y el servidor, verifica que el servidor es quien dice ser y detecta cualquier alteración en el camino. HTTPS es HTTP sobre TLS. Al conectarse, el servidor presenta un **certificado** que asocia su nombre de dominio con una clave pública, firmado por una **autoridad de certificación** (CA) en la que el navegador confía. El cliente y el servidor acuerdan una clave de sesión con un intercambio Diffie-Hellman, y desde ahí todo viaja cifrado con criptografía simétrica (rápida). TLS 1.3 (2018) simplificó el protocolo, eliminó algoritmos débiles y redujo el saludo a un solo viaje de ida y vuelta.
Hasta 2015, un certificado costaba dinero y trámites, y la mayoría de las webs usaba HTTP sin cifrar. **Let's Encrypt**, una autoridad gratuita y automatizada creada por el Internet Security Research Group, cambió eso: hoy más del 90 % de las páginas cargadas en Chrome usan HTTPS. Servicios como Vercel o Netlify obtienen y renuevan los certificados de tus dominios sin que hagas nada.

## IPv4, IPv6 y NAT
Las direcciones IPv4 tienen 32 bits: unos 4300 millones, que se agotaron (el registro regional de América Latina, LACNIC, entregó sus últimos bloques en 2020). La solución temporal fue **NAT** (*traducción de direcciones*): tu router tiene una sola dirección pública y asigna direcciones privadas (192.168.x.x, 10.x.x.x) a los dispositivos de la casa, traduciendo en cada paquete. Por eso un servidor en tu laptop no es accesible desde internet sin configurar el router. **IPv6** usa direcciones de 128 bits (unas 3,4 × 10³⁸), suficientes para dar una dirección pública a cada dispositivo; su adopción supera el 40 % del tráfico hacia Google y avanza a ritmos distintos según el país y el operador.`);

D('m9.http', `## Las versiones de HTTP
- **HTTP/1.1** (1997): texto plano, una petición a la vez por conexión. Los navegadores abrían hasta seis conexiones por dominio para paralelizar, y los desarrolladores combinaban archivos y usaban "sprites" de imágenes para pedir menos.
- **HTTP/2** (2015, basado en SPDY de Google): binario y **multiplexado**: muchas peticiones y respuestas viajan intercaladas por una sola conexión, con cabeceras comprimidas. Ya no hace falta combinar archivos. Pero como va sobre TCP, un paquete perdido detiene todos los flujos hasta recuperarse (bloqueo de cabeza de línea).
- **HTTP/3** (2022) va sobre **QUIC**, un protocolo de transporte sobre UDP diseñado por Google y estandarizado por la IETF: cada flujo es independiente, el saludo de conexión y el de cifrado se combinan, y una conexión sobrevive al cambio de red (de wifi a datos móviles). Hoy lo usan la mayoría de los grandes sitios.
La semántica (métodos, códigos, cabeceras) es la misma en las tres: tu API no cambia, cambia cómo viajan los bytes.

## Webhooks: que el servidor te avise
En una API normal, el cliente pregunta. Si quieres saber cuándo un pago se aprobó o cuándo SUNAT validó un comprobante, preguntar cada pocos segundos (*polling*) desperdicia recursos. Un **webhook** invierte la dirección: tú registras una URL de tu servidor y el otro sistema hace un POST a esa URL cuando ocurre el evento. Reglas para recibirlos bien:
1. **Verificar la firma:** el emisor firma el cuerpo con un secreto compartido (HMAC); si la firma no coincide, se rechaza. Sin esto, cualquiera puede enviarte eventos falsos.
2. **Responder rápido** (código 2xx en pocos segundos) y procesar después en segundo plano.
3. **Ser idempotente:** el emisor puede reintentar y enviar el mismo evento dos veces; usa su identificador para no procesarlo de nuevo.
4. **Registrar** cada evento recibido para poder auditarlo y reprocesarlo.

## Límites de uso
Una API pública necesita protegerse del abuso y de clientes con errores que repiten peticiones sin control. La **limitación de tasa** (*rate limiting*) permite, por ejemplo, 100 peticiones por minuto por clave; al excederse, responde **429 Too Many Requests** con la cabecera «Retry-After». Los algoritmos más usados son la **cubeta de fichas** (*token bucket*: se recargan fichas a ritmo fijo y cada petición gasta una, lo que permite ráfagas cortas) y la **ventana deslizante**. Los clientes bien escritos respetan «Retry-After» y reintentan con **espera exponencial** y algo de aleatoriedad.`);

D('m9.front', `## Aplicaciones de una sola página y enrutamiento
En una web tradicional, cada clic en un enlace pide una página nueva al servidor. En una **SPA** (*single-page application*), el navegador carga una vez la aplicación y, al navegar, JavaScript cambia el contenido y la URL sin recargar. Para que los enlaces, el botón "atrás" y los marcadores funcionen, se usa la **History API** («history.pushState» y el evento «popstate») o, más simple, el **hash** de la URL («#/t/m9.front»), que no se envía al servidor y por eso funciona en cualquier hosting estático. Esta misma carrera usa enrutamiento por hash. Las SPA dan una experiencia fluida, pero tienen costos: el primer arranque es más pesado, los buscadores ven menos contenido si todo se genera en el cliente, y hay que manejar a mano el foco y el título de la página para la accesibilidad. Por eso los frameworks modernos (Next.js, Nuxt, SvelteKit, Astro) mezclan HTML generado en el servidor con interactividad en el cliente.

## Rendimiento de carga en la práctica
La mayor parte del peso de una página son **imágenes**, **fuentes** y **JavaScript**. Las técnicas con más impacto:
- **Imágenes:** formatos modernos (WebP, AVIF, hasta 50 % más livianos que JPEG con la misma calidad), tamaños adecuados para cada pantalla («srcset»), dimensiones declaradas para evitar saltos del diseño, y carga diferida de las que están fuera de la pantalla («loading="lazy"»).
- **Fuentes:** pocas variantes, en formato WOFF2, con «font-display: swap» para mostrar el texto de inmediato con una fuente del sistema mientras llega la propia.
- **JavaScript:** dividir el código por rutas, cargar con «defer» o como módulo, eliminar dependencias pesadas (una biblioteca de fechas de 70 KB para formatear una fecha se reemplaza con «Intl.DateTimeFormat»).
- **Caché:** archivos con nombre que incluye un hash del contenido («app.3f9a1c.js»), servidos con «Cache-Control: max-age=31536000, immutable»: el navegador los guarda un año, y cuando cambian, cambia el nombre.
Lighthouse, integrado en Chrome, mide todo esto y propone mejoras concretas. En redes móviles de América Latina, donde muchas conexiones son lentas o con datos limitados, estas optimizaciones deciden si la página se usa o se abandona.`);

D('m9.async', `## Node por dentro: libuv
Node ejecuta tu JavaScript en un solo hilo, pero puede atender miles de conexiones a la vez. El secreto está en **libuv**, una biblioteca en C creada para Node en 2011 que implementa el bucle de eventos y abstrae las facilidades de cada sistema operativo para esperar muchas operaciones a la vez: **epoll** en Linux, **kqueue** en macOS, **IOCP** en Windows. Cuando haces una petición de red, Node se la pide al sistema operativo y sigue con otra cosa; el sistema avisa cuando hay datos, y libuv encola tu callback. Las operaciones que el sistema operativo no ofrece de forma asíncrona (parte del sistema de archivos, la resolución DNS con «getaddrinfo», la compresión, la criptografía) se ejecutan en un **grupo de hilos** de libuv, de 4 hilos por defecto (configurable con «UV_THREADPOOL_SIZE»). Consecuencia práctica: si lanzas cien operaciones de hash de contraseñas con «bcrypt» a la vez, solo cuatro avanzan en paralelo y el resto espera.

## Bloquear el bucle: el error más caro
Como hay un solo hilo para tu código, una función que tarda 200 ms en calcular algo **detiene todas** las peticiones durante esos 200 ms. Ejemplos típicos: «JSON.parse» de un archivo de 50 MB, una expresión regular con retroceso catastrófico, ordenar un millón de elementos o un bucle síncrono sobre una consulta enorme. Las soluciones:
- **Partir el trabajo** en trozos y ceder el control entre ellos («await new Promise(r => setImmediate(r))»).
- Mover el cálculo a un **worker thread** («node:worker_threads»), que tiene su propio hilo y su propio bucle de eventos, y comunicarse con mensajes.
- Mover el trabajo pesado a otro servicio o a una cola de tareas procesada en segundo plano.
En el navegador, el equivalente son los **Web Workers**: un cálculo en el hilo principal congela la interfaz (ni el scroll ni los clics responden), mientras que en un worker la página sigue fluida. La métrica **INP** (*Interaction to Next Paint*) de Google mide precisamente cuánto tarda la página en responder a una interacción, y las tareas largas en el hilo principal son su principal enemigo.`);
})();
