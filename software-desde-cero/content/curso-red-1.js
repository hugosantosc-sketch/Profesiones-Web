(function () {
var M = SDC.M, S = SDC.S;
M('red', { title: 'Redes de Computadoras', prof: true,
  desc: 'Curso completo sobre cómo se comunican las computadoras, de arriba hacia abajo como en el libro de Kurose y Ross: qué ocurre desde que una aplicación envía un mensaje hasta que viaja como señales por un cable o por el aire. Se estudian la arquitectura de Internet, los protocolos de aplicación (HTTP, DNS), el transporte confiable y el control de congestión de TCP, el direccionamiento y el enrutamiento IP, la capa de enlace, la capa física, las redes inalámbricas y la seguridad en redes, con los cálculos que se evalúan en la universidad.',
  thread: 'La red de PatioApp se diseña de verdad: se miden sus retardos, se optimiza el uso de HTTP y DNS, se ajustan tiempos de espera y reintentos según cómo funciona TCP, se planifica el direccionamiento IP del patio por subredes y VLAN, se dimensiona el wifi para los inspectores y se protege todo con TLS 1.3, cortafuegos y VPN.',
  books: '*Computer Networking: A Top-Down Approach* (Kurose y Ross), *Computer Networks* (Tanenbaum, Feamster y Wetherall), *Computer Networks: A Systems Approach* (Peterson y Davie, libre en book.systemsapproach.org), *TCP/IP Illustrated* (Stevens).',
  uni: 'Stanford CS144 (los estudiantes implementan TCP); MIT 6.1800 (antes 6.033) y 6.829; Berkeley EE122 y CS168; CMU 15-441. En Perú: Redes de Computadoras I y II, Teleinformática y Comunicación de Datos (UNI, PUCP, UNMSM, UPC, UTEC).',
  capstone: { t: 'Red completa para un patio de vehículos',
    goal: 'Diseñar, documentar y probar la red de una sede de PatioApp de punta a punta.',
    steps: ['Mide la latencia, el rendimiento y la ruta hasta el servidor de PatioApp con ping, traceroute e iperf, y explica cada componente del retardo.', 'Diseña el direccionamiento IPv4 e IPv6 con subredes y VLAN para oficina, cámaras, sensores e invitados, con su tabla de reenvío.', 'Ajusta tiempos de espera, reintentos y conexiones persistentes del cliente de PatioApp según el comportamiento de TCP y HTTP.', 'Planifica la cobertura wifi del patio y estima la capacidad con la fórmula de Shannon.', 'Protege la red con TLS 1.3, reglas de cortafuegos de mínimo privilegio y una VPN para los sensores, y verifica todo con Wireshark.'],
    deliver: 'El documento de diseño de red con diagramas, tablas de direccionamiento, mediciones y capturas de tráfico.' } });

S('red', 'red.intro', { title: 'Arquitectura de Internet, retardos y capas',
  ask: '¿Qué concepto de arquitectura de redes se aplica?',
  lesson: `
> **La idea en simple.** Internet funciona como el correo postal, no como el teléfono antiguo. En una llamada antigua se reservaba un cable de punta a punta mientras durara la conversación; en el correo, cada carta (un **paquete**) lleva la dirección del destino y viaja de oficina en oficina, compartiendo camiones con millones de otras cartas. Si una oficina está congestionada, las cartas esperan en una pila. Esa espera, y lo que tarda cada camión, explica casi todo el rendimiento de una red.

## Una red de redes
Internet no es una red, sino miles de redes independientes interconectadas: redes de hogares, de universidades, de empresas y de **proveedores de servicios de Internet** (ISP). Los ISP se organizan en una jerarquía flexible: proveedores de acceso (los que llegan a tu casa), proveedores regionales y grandes proveedores globales de tránsito, conectados en **puntos de intercambio de tráfico** (IXP) donde muchas redes se enlazan para no pagar tránsito entre ellas. Encima, las grandes empresas de contenido (Google, Meta, Netflix) tienen sus propias redes globales y servidores cerca de los usuarios. Las reglas que permiten que todo esto funcione son los **protocolos**: acuerdos sobre el formato y el orden de los mensajes y sobre qué hacer al recibirlos. Los protocolos de Internet se publican como **RFC** del IETF.

## Conmutación de circuitos y de paquetes
- **Conmutación de circuitos:** se reserva un camino y una capacidad fija de extremo a extremo durante toda la comunicación, como la telefonía tradicional. Garantiza el servicio, pero la capacidad reservada se desperdicia en los silencios.
- **Conmutación de paquetes:** los datos se parten en paquetes que comparten los enlaces bajo demanda. Paul Baran, en RAND (1964), y Donald Davies, en el Laboratorio Nacional de Física británico (quien acuñó el término "paquete" en 1965), propusieron la idea por separado; Leonard Kleinrock aportó la teoría de colas que la sustenta.
La conmutación de paquetes aprovecha mucho mejor los enlaces cuando el tráfico es a ráfagas (como casi todo el tráfico de datos), a cambio de retardos variables y posibles pérdidas. El primer mensaje de ARPANET se envió el 29 de octubre de 1969, de la UCLA al SRI: debía decir "LOGIN", pero el sistema se cayó tras las dos primeras letras, "LO". Vinton Cerf y Robert Kahn publicaron en 1974 el diseño de TCP/IP, y ARPANET lo adoptó el 1 de enero de 1983. Ambos recibieron el Premio Turing en 2004.

## Los cuatro retardos de un paquete
Cuando un paquete pasa por un enrutador, acumula cuatro retardos:
| Retardo | Causa | Fórmula o magnitud |
| Procesamiento | revisar la cabecera y decidir la salida | microsegundos |
| Cola | esperar a que salgan los paquetes que llegaron antes | de 0 a milisegundos, según la congestión |
| Transmisión | poner todos los bits del paquete en el enlace | L / R (bits del paquete / velocidad del enlace) |
| Propagación | que la señal viaje por el medio | d / s (distancia / velocidad, unos 2 × 10⁸ m/s en fibra o cobre) |
No hay que confundir transmisión con propagación: la transmisión depende del tamaño del paquete y de la velocidad del enlace; la propagación, solo de la distancia. Un paquete de 1500 bytes (12 000 bits) por un enlace de 100 Mbps tarda 0.12 ms en transmitirse; si el enlace mide 2000 km, tarda 10 ms en propagarse.

Los enrutadores trabajan con **almacenar y reenviar**: deben recibir el paquete completo antes de reenviarlo. Con N enlaces iguales, enviar un paquete de extremo a extremo cuesta al menos N × L/R de transmisión más las propagaciones.
~~~js
// Retardo de extremo a extremo por N enlaces (sin colas ni procesamiento)
function retardo(Lbits, Rbps, enlaces) {               // enlaces: lista de distancias en metros
  const trans = Lbits / Rbps, s = 2e8;
  return enlaces.reduce((t, d) => t + trans + d / s, 0);
}
const ms = x => (x * 1000).toFixed(3) + ' ms';
console.log('LAN, 1 enlace de 100 m a 1 Gbps:', ms(retardo(12000, 1e9, [100])));
console.log('Lima → Miami (~4200 km en 5 saltos de 100 Mbps):', ms(retardo(12000, 1e8, [100, 50000, 4000000, 50000, 100])));
~~~

## Colas y pérdidas
Si a un enlace de R bps llegan en promedio a paquetes por segundo de L bits, la **intensidad de tráfico** es La/R. Si supera 1, llega más de lo que sale y la cola crece sin límite; cuando se acerca a 1, el retardo de cola se dispara aunque nunca "se llene" del todo. Como las memorias de los enrutadores son finitas, cuando la cola está llena los paquetes nuevos se **descartan**: la pérdida de paquetes es parte normal de Internet, y los protocolos superiores deben manejarla.

## Rendimiento y producto ancho de banda por retardo
El **rendimiento** (*throughput*) de extremo a extremo está limitado por el enlace más lento del camino, el **cuello de botella**: si un servidor tiene 1 Gbps pero tu casa 50 Mbps, no descargarás a más de 50 Mbps. El **producto ancho de banda por retardo** (R × RTT) indica cuántos bits caben "en vuelo" en el camino: un enlace de 1 Gbps con un RTT de 100 ms tiene 100 megabits en tránsito. Para aprovechar el enlace, el emisor debe poder tener esa cantidad de datos enviados y aún no confirmados, idea central del transporte que verás después.

## Capas y encapsulamiento
La complejidad se maneja con **capas**: cada una ofrece un servicio a la de arriba usando el de la de abajo. El modelo de Internet tiene cinco:
| Capa | Unidad de datos | Ejemplos | Responsabilidad |
| Aplicación | mensaje | HTTP, DNS, SMTP | lo que la aplicación necesita intercambiar |
| Transporte | segmento | TCP, UDP | comunicación entre procesos de extremo a extremo |
| Red | datagrama | IP | llevar datagramas de un equipo a otro a través de muchas redes |
| Enlace | trama | Ethernet, wifi | llevar tramas entre equipos vecinos |
| Física | bits | cobre, fibra, radio | convertir bits en señales |
El modelo **OSI** de la ISO (publicado en 1984) tiene siete capas, con **sesión** y **presentación** entre aplicación y transporte; es útil como vocabulario, pero Internet se construyó sobre el de cinco. Al bajar por la pila, cada capa **encapsula**: agrega su cabecera a lo que recibió de arriba. Un mensaje HTTP se mete en un segmento TCP, que va dentro de un datagrama IP, que viaja dentro de una trama Ethernet. Los conmutadores de enlace solo miran hasta la capa 2 y los enrutadores hasta la 3; los extremos procesan las cinco.

## El argumento de extremo a extremo
Jerome Saltzer, David Reed y David Clark publicaron en 1984 *End-to-End Arguments in System Design*: una función (como garantizar que un archivo llegue intacto) solo puede implementarse completa y correctamente en los extremos, con conocimiento de la aplicación; repetirla en la red puede servir para mejorar el rendimiento, pero no la reemplaza. Este principio explica por qué el núcleo de Internet es "tonto" y simple (IP solo hace un esfuerzo razonable por entregar) y la inteligencia está en los equipos de los extremos (TCP recupera pérdidas). Gracias a eso nacieron aplicaciones que nadie previó sin pedir permiso a la red.

## Ejemplo resuelto: ¿por qué PatioApp tarda 300 ms en Arequipa?
Un inspector en Arequipa abre PatioApp, alojado en un centro de datos en Virginia (Estados Unidos). Distancia aproximada por cable: unos 7000 km, así que la propagación de ida es 7 × 10⁶ / 2 × 10⁸ = 35 ms, y el **RTT** mínimo, unos 70 ms. Abrir la aplicación requiere una consulta DNS (1 RTT si no está en caché), el saludo TCP (1 RTT), el saludo TLS 1.3 (1 RTT) y la petición HTTP (1 RTT): unos 4 RTT, 280 ms, antes de contar el procesamiento. La transmisión de una respuesta de 50 KB a 20 Mbps suma solo 20 ms. Conclusión: el problema es la **latencia**, no el ancho de banda. Contratar más megas no ayudaría; acercar el servidor (una región en Sudamérica) o reutilizar conexiones sí.`,
  links: [['m9.tcp', 'esta unidad profundiza la introducción a TCP/IP del curso de desarrollo web'], ['so.intro', 'los paquetes llegan al sistema operativo mediante interrupciones de la tarjeta de red'], ['mat2.stat', 'el retardo de cola se estudia con teoría de colas y probabilidad']],
  read: 'Kurose y Ross, capítulo 1; Peterson y Davie, capítulo 1; Saltzer, Reed y Clark (1984); Cerf y Kahn (1974).',
  terms: [
    ['Conmutación de paquetes', 'técnica en que los datos se dividen en paquetes que comparten los enlaces bajo demanda', ['Internet funciona así.', 'Aprovecha bien el tráfico a ráfagas.', 'Baran y Davies la propusieron en los años 60.']],
    ['Retardo de transmisión', 'tiempo para poner todos los bits de un paquete en el enlace, igual a L/R', ['12 000 bits a 1 Mbps tardan 12 ms.', 'Depende del tamaño y de la velocidad del enlace.', 'No depende de la distancia.']],
    ['Retardo de propagación', 'tiempo que tarda la señal en recorrer el medio, igual a distancia entre velocidad de propagación', ['2000 km de fibra tardan unos 10 ms.', 'No depende del tamaño del paquete.', 'Limita el RTT mínimo entre continentes.']],
    ['Retardo de cola', 'tiempo que un paquete espera en la memoria del enrutador hasta poder transmitirse', ['Crece cuando la intensidad de tráfico se acerca a 1.', 'Varía de un paquete a otro.', 'Si la cola se llena, hay pérdida.']],
    ['Cuello de botella', 'enlace de menor capacidad en el camino, que limita el rendimiento de extremo a extremo', ['Tu conexión de 50 Mbps limita la descarga desde un servidor de 1 Gbps.', 'El rendimiento es el mínimo de las capacidades.', 'Aumentar otro enlace no mejora nada.']],
    ['Encapsulamiento', 'proceso por el que cada capa agrega su cabecera a los datos que recibe de la capa superior', ['Un mensaje HTTP va dentro de un segmento TCP.', 'El segmento va dentro de un datagrama IP.', 'El receptor quita las cabeceras en orden inverso.']],
    ['Argumento de extremo a extremo', 'principio de que ciertas funciones solo pueden implementarse completas en los extremos de la comunicación', ['TCP recupera pérdidas en los equipos, no en los enrutadores.', 'Saltzer, Reed y Clark lo publicaron en 1984.', 'Explica por qué el núcleo de Internet es simple.']],
    ['Producto ancho de banda por retardo', 'cantidad de bits que caben en tránsito en un camino, igual a la capacidad por el RTT', ['1 Gbps con 100 ms de RTT son 100 megabits en vuelo.', 'Indica cuánto debe enviar el emisor sin esperar confirmación.', 'Es grande en enlaces rápidos y lejanos.']]
  ],
  q: [
    ['Un paquete de 8000 bits se envía por un enlace de 2 Mbps. ¿Cuál es el retardo de transmisión?', '4 ms', ['0.25 ms', '16 ms', '40 ms'], '8000 / 2 000 000 = 0.004 s.', 2],
    ['¿Cuál es el retardo de propagación de 3000 km con una velocidad de 2 × 10⁸ m/s?', '15 ms', ['1.5 ms', '150 ms', '0.15 ms'], '3 × 10⁶ / 2 × 10⁸ = 0.015 s.', 2],
    ['Un archivo pasa por enlaces de 100 Mbps, 10 Mbps y 1 Gbps. ¿Cuál es el rendimiento máximo?', '10 Mbps', ['100 Mbps', '1 Gbps', '1.11 Gbps'], 'El cuello de botella limita todo.', 2],
    ['¿Qué pasa con el retardo de cola cuando la intensidad de tráfico se acerca a 1?', 'Crece muy rápido', ['Se hace cero', 'Se mantiene constante', 'Baja a la mitad'], 'Llega casi tanto como sale y la cola se alarga.', 3],
    ['¿En qué capa trabaja un enrutador?', 'Red', ['Aplicación', 'Transporte', 'Física'], 'Examina las cabeceras IP para reenviar datagramas.', 2],
    ['¿Qué capas del modelo OSI no aparecen como tales en el modelo de Internet?', 'Sesión y presentación', ['Red y enlace', 'Transporte y aplicación', 'Física y enlace'], 'Internet las deja a la aplicación.', 3],
    ['Si la latencia es el problema dominante, ¿qué ayuda más?', 'Acercar el servidor o reducir los viajes de ida y vuelta', ['Contratar más ancho de banda', 'Usar paquetes más grandes', 'Cambiar el cable por uno más grueso'], 'El RTT depende de la distancia, no de la capacidad.', 3],
    { tf: 'El retardo de propagación depende del tamaño del paquete.', v: false, e: 'Solo depende de la distancia y de la velocidad de la señal.', l: 1 },
    { tf: 'En almacenar y reenviar, un enrutador debe recibir el paquete completo antes de reenviarlo.', v: true, e: 'Por eso el retardo de transmisión se paga en cada enlace.', l: 2 },
    { o: 'Ordena el encapsulamiento al enviar una petición web, de la primera cabecera que se agrega a la última.', s: ['Mensaje HTTP', 'Cabecera TCP', 'Cabecera IP', 'Cabecera y cola Ethernet'], e: 'Cada capa envuelve lo de arriba.', l: 2 },
    { c: 'Escribe «retardoExtremo(L, R, distancias)» en milisegundos con 3 decimales: L bits, R bps y una lista de distancias en metros (un enlace por distancia, almacenar y reenviar, propagación a 2 × 10⁸ m/s, sin colas).', f: 'retardoExtremo', p: ['L', 'R', 'distancias'], t: [[[12000, 1000000, [2000000]], 22], [[8000, 1000000000, [200000]], 1.008], [[12000, 1000000, [0, 0, 0]], 36]], sol: '  const t = distancias.reduce((s, d) => s + L / R + d / 2e8, 0);\n  return Math.round(t * 1e6) / 1000;', l: 3 },
    { c: 'Escribe «intensidadTrafico(L, a, R)» con L bits por paquete, a paquetes por segundo y R bps, redondeada a 3 decimales.', f: 'intensidadTrafico', p: ['L', 'a', 'R'], t: [[[1000, 500, 1000000], 0.5], [[12000, 100, 1000000], 1.2], [[8000, 10, 1000000], 0.08]], sol: '  return Math.round(L * a / R * 1000) / 1000;', l: 1 },
    { c: 'Escribe «bitsEnVuelo(R, rttMs)» con el producto ancho de banda por retardo en bits (R en bps).', f: 'bitsEnVuelo', p: ['R', 'rttMs'], t: [[[1000000000, 100], 100000000], [[1000000, 50], 50000], [[10000000, 0], 0]], sol: '  return R * rttMs / 1000;', l: 1 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var L = R.pick([1000, 8000, 12000, 1500 * 8]), r = R.pick([1e6, 1e7, 1e8, 1e9]); g.input(2, '¿Cuál es el retardo de transmisión en ms de un paquete de ' + L + ' bits por un enlace de ' + (r / 1e6) + ' Mbps? Redondea a 3 decimales.', (L / r * 1000).toFixed(3), 'L / R.'); });
    g.times(6, function (R) { var km = R.pick([100, 500, 1000, 3000, 7000, 12000]); g.input(2, '¿Cuál es el retardo de propagación en ms de ' + km + ' km a 2 × 10⁸ m/s?', (km * 1000 / 2e8 * 1000).toFixed(1), 'd / s.'); });
    g.times(5, function (R) { var e = [R.pick([10, 50, 100, 1000]), R.pick([10, 50, 100, 1000]), R.pick([10, 50, 100, 1000])]; g.input(2, 'Un camino tiene enlaces de ' + e.join(', ') + ' Mbps. ¿Cuál es el rendimiento máximo en Mbps?', Math.min.apply(null, e), 'El mínimo: el cuello de botella.'); });
    var capas = [['HTTP', 'Aplicación'], ['TCP', 'Transporte'], ['IP', 'Red'], ['Ethernet', 'Enlace'], ['DNS', 'Aplicación'], ['UDP', 'Transporte'], ['Wifi (802.11)', 'Enlace'], ['ICMP', 'Red'], ['SMTP', 'Aplicación'], ['Fibra óptica y sus señales de luz', 'Física']];
    capas.forEach(function (c) { g.mcq(1, '¿En qué capa del modelo de Internet trabaja ' + c[0] + '?', c[1], ['Aplicación', 'Transporte', 'Red', 'Enlace', 'Física'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Modelo de cinco capas de Kurose y Ross.'); });
  },
  checks: [
    ['Explica la diferencia entre retardo de transmisión y de propagación con un ejemplo numérico.', 'Transmisión = L/R (12 000 bits a 100 Mbps = 0.12 ms); propagación = d/s (2000 km a 2 × 10⁸ m/s = 10 ms). La primera depende del tamaño y la velocidad; la segunda, de la distancia.'],
    ['¿Por qué la conmutación de paquetes aprovecha mejor los enlaces que la de circuitos?', 'Porque el tráfico de datos llega a ráfagas y los paquetes comparten la capacidad bajo demanda, en lugar de reservarla aunque no se use.'],
    ['¿Qué ocurre cuando la intensidad de tráfico supera 1?', 'Llega más de lo que el enlace puede enviar, la cola crece sin límite y se pierden paquetes al llenarse.'],
    ['Nombra las cinco capas del modelo de Internet con un protocolo de cada una.', 'Aplicación (HTTP), transporte (TCP), red (IP), enlace (Ethernet) y física (fibra óptica).'],
    ['¿Qué dice el argumento de extremo a extremo y qué consecuencia tuvo en Internet?', 'Que funciones como la entrega confiable solo pueden garantizarse en los extremos; por eso el núcleo de la red es simple y la inteligencia está en los equipos.']
  ],
  cites: ['Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.). Pearson.', 'Cerf, V. y Kahn, R. (1974). A Protocol for Packet Network Intercommunication. *IEEE Transactions on Communications*, 22(5).', 'Saltzer, J., Reed, D. y Clark, D. (1984). End-to-End Arguments in System Design. *ACM Transactions on Computer Systems*, 2(4).', 'Baran, P. (1964). *On Distributed Communications*. RAND Corporation.', 'Kleinrock, L. (1976). *Queueing Systems, Volume 2: Computer Applications*. Wiley.', 'Clark, D. (1988). The Design Philosophy of the DARPA Internet Protocols. *SIGCOMM 1988*.'],
  project: { t: 'Radiografía de una conexión a Internet',
    goal: 'Medir y explicar los componentes del retardo y del rendimiento de tu propia conexión.',
    steps: ['Mide con ping el RTT a servidores en Lima, Santiago, Miami, Madrid y Tokio, y compáralo con el mínimo que impone la distancia.', 'Usa traceroute (tracert en Windows) hacia dos de ellos y explica en qué saltos aumenta el retardo.', 'Mide tu rendimiento con una prueba de velocidad y con iperf en tu red local, e identifica el cuello de botella.', 'Captura con Wireshark una petición web y señala el encapsulamiento de cada capa.', 'Escribe un informe que separe propagación, transmisión y cola con tus datos.'],
    deliver: 'Las mediciones, las capturas de Wireshark y el informe con los cálculos.' },
  hito: ['Mide el RTT, la ruta y el rendimiento desde una sede de PatioApp hasta su servidor, y separa el retardo en propagación, transmisión y cola.', 'Estima cuántos viajes de ida y vuelta hace PatioApp al abrir su pantalla principal y propón cómo reducirlos.']
});

S('red', 'red.app', { title: 'Capa de aplicación: HTTP, DNS y correo',
  ask: '¿Qué concepto de la capa de aplicación se aplica?',
  lesson: `
> **La idea en simple.** Cuando escribes una dirección en el navegador pasan dos cosas que no ves. Primero, el navegador consulta una enorme guía telefónica distribuida por todo el mundo, el **DNS**, para traducir el nombre a un número. Después, conversa con el servidor siguiendo un guion estricto, el **HTTP**: "dame esta página", "aquí la tienes". Toda la web se apoya en esos dos protocolos.

## Arquitecturas de aplicación
- **Cliente-servidor:** un servidor siempre encendido con dirección conocida atiende a muchos clientes, que no se comunican entre sí. La web, el correo y la mayoría de las API.
- **Entre pares** (*peer-to-peer*, P2P): los equipos se comunican directamente y cada uno es a la vez cliente y servidor; la capacidad crece con la cantidad de participantes. BitTorrent, creado por Bram Cohen en 2001, reparte un archivo en trozos que los pares intercambian.
Los procesos se comunican mediante **sockets**, la interfaz que introdujo BSD Unix en 1983 y que sigue usando todo sistema operativo. Un proceso se identifica con la dirección IP de su equipo y un **número de puerto** (HTTP usa por defecto el 80, HTTPS el 443, DNS el 53). Cada aplicación elige el transporte según lo que necesita: entrega confiable, rendimiento, tiempo o seguridad.

## HTTP: el protocolo de la web
Tim Berners-Lee inventó la web en el CERN entre 1989 y 1991: el lenguaje HTML, las URL y el protocolo **HTTP**. HTTP es un protocolo de **solicitud-respuesta** y **sin estado**: el servidor no recuerda las peticiones anteriores. Una solicitud tiene un **método** (GET para obtener, POST para enviar datos, PUT, PATCH, DELETE), una ruta, cabeceras y, opcionalmente, un cuerpo. La respuesta trae un **código de estado**: 2xx éxito (200 OK, 201 Created), 3xx redirección (301, 304 Not Modified), 4xx error del cliente (400, 401, 403, 404, 429) y 5xx error del servidor (500, 502, 503).

## Conexiones y su costo
Cada objeto de una página (HTML, imágenes, scripts) debe pedirse. Antes de enviar una petición HTTP sobre TCP hace falta abrir la conexión con un saludo de tres vías que cuesta un RTT. Con **HTTP/1.0 no persistente**, cada objeto abre una conexión nueva: unos 2 RTT por objeto. **HTTP/1.1** (1997) hizo las conexiones **persistentes** por defecto: varias peticiones por la misma conexión, ahorrando el saludo repetido. Pero en HTTP/1.1 las respuestas de una conexión salen en orden, de modo que un objeto lento bloquea a los demás (**bloqueo de cabeza de línea**); los navegadores compensaban abriendo unas seis conexiones paralelas por servidor.
~~~js
// Tiempo para traer una página con k objetos, ignorando la transmisión (solo RTT)
function tiempo(k, rtt, modo) {
  if (modo === 'no persistente') return (k + 1) * 2 * rtt;     // cada objeto: saludo TCP + petición
  if (modo === 'persistente') return 2 * rtt + k * rtt;          // un saludo y luego una petición por objeto
  return 2 * rtt + rtt;                                          // persistente con todas las peticiones a la vez (HTTP/2)
}
for (const m of ['no persistente', 'persistente', 'multiplexado']) console.log(m.padEnd(16), tiempo(10, 70, m), 'ms');
~~~
**HTTP/2** (2015, derivado del protocolo SPDY de Google) usa una única conexión con **tramas binarias** y **multiplexación**: muchas peticiones y respuestas intercaladas en paralelo, con cabeceras comprimidas. Eliminó el bloqueo a nivel de HTTP, pero no el de TCP: si se pierde un paquete, TCP retiene todo lo que viene detrás hasta recuperarlo. **HTTP/3** (RFC 9114, 2022) corre sobre **QUIC** (RFC 9000, 2021), un transporte construido sobre UDP que integra TLS 1.3, tiene flujos independientes (una pérdida solo detiene su propio flujo) y combina el saludo de transporte y el criptográfico en un solo RTT.

## Estado sobre un protocolo sin estado: cookies
Como HTTP no recuerda, Lou Montulli, de Netscape, introdujo en 1994 las **cookies**: el servidor envía la cabecera «Set-Cookie» con un identificador y el navegador lo devuelve en cada petición siguiente con «Cookie». Así funcionan las sesiones, los carritos de compra y, también, el rastreo publicitario entre sitios, que hoy los navegadores restringen.

## Cachés
Una **caché web** guarda copias de respuestas para no pedirlas otra vez. Puede estar en el navegador, en un **proxy** de la empresa o en una **red de distribución de contenidos** (CDN), con servidores repartidos por el mundo; Akamai, fundada en 1998, fue la pionera. HTTP la controla con cabeceras: «Cache-Control: max-age=3600» permite reutilizar la respuesta una hora; cuando vence, el cliente hace una **petición condicional** con «If-None-Match» (usando la «ETag» que dio el servidor) o «If-Modified-Since», y si nada cambió el servidor responde **304 Not Modified** sin cuerpo.

## DNS: la guía distribuida de Internet
Paul Mockapetris diseñó el **DNS** en 1983 para reemplazar un archivo central de nombres que ya no escalaba. Es una base de datos **jerárquica y distribuida**:
- **Servidores raíz:** 13 identidades (de la A a la M), replicadas en cientos de sitios del mundo mediante *anycast*.
- **Servidores de dominio de nivel superior** (TLD): «.com», «.org», «.pe» (administrado en el Perú por la Red Científica Peruana).
- **Servidores autoritativos:** los de cada organización, que tienen la respuesta definitiva para sus nombres.
Tu equipo pregunta a un **resolutor recursivo** (el de tu ISP, o uno público), que hace consultas **iterativas**: pregunta a una raíz, que lo remite al TLD, que lo remite al autoritativo, que responde. Cada respuesta tiene un **TTL** y se guarda en caché ese tiempo, por eso la mayoría de consultas se responden sin llegar a la raíz. Tipos de registro: **A** (dirección IPv4), **AAAA** (IPv6), **CNAME** (alias de otro nombre), **MX** (servidor de correo), **NS** (servidor autoritativo), **TXT** (texto, usado para verificaciones y antispam). El DNS usa sobre todo UDP en el puerto 53, porque una consulta y su respuesta caben en un paquete. En 2008, Dan Kaminsky reveló un ataque de **envenenamiento de caché** que permitía falsificar respuestas; se mitigó aleatorizando los puertos de origen, y **DNSSEC** agrega firmas digitales a las respuestas.

## Correo electrónico
El correo usa tres piezas: el **agente de usuario** (tu programa o la web de correo), los **servidores de correo** y el protocolo **SMTP** (definido en 1982 por Jonathan Postel), que empuja los mensajes de un servidor a otro. Para leer el buzón se usan **IMAP** (que mantiene los mensajes en el servidor) o POP3, o simplemente HTTP en el correo web. Como SMTP no autentica al remitente, se agregaron **SPF**, **DKIM** y **DMARC**, publicados como registros TXT en el DNS, para combatir la suplantación.

## Video por Internet
El video es la mayor parte del tráfico de Internet. Se transmite sobre HTTP con **transmisión adaptativa**, como **DASH** (*Dynamic Adaptive Streaming over HTTP*, norma ISO de 2012) o HLS de Apple: el servidor guarda cada video en fragmentos de pocos segundos codificados en varias calidades, y un archivo de manifiesto los describe. El reproductor mide el rendimiento que obtiene y, para cada fragmento, pide la calidad más alta que puede descargar a tiempo, manteniendo un búfer de reserva. Por eso un video baja de calidad cuando la red empeora en lugar de detenerse. Las plataformas grandes colocan sus servidores dentro de las redes de los ISP (Netflix Open Connect, Google Global Cache) para que el video recorra la menor distancia posible.

## Ejemplo resuelto: acelerar la pantalla principal de PatioApp
La pantalla principal carga 1 HTML, 3 scripts, 2 hojas de estilo y 20 miniaturas: 26 objetos, con un RTT de 70 ms. Con conexiones no persistentes serían (26 + 1) × 2 × 70 ≈ 3.8 s solo en viajes. Mejoras:
1. Servir con HTTP/2 o HTTP/3: una conexión y peticiones multiplexadas, cerca de 3 RTT en total.
2. Cabeceras «Cache-Control» de un año para los archivos con el contenido en el nombre («app.3f9a.js») y validación con ETag para el HTML: en la segunda visita casi nada viaja.
3. Un CDN con nodo en Lima para las miniaturas, que reduce el RTT de 70 a unos 10 ms.
4. Un TTL de DNS razonable (por ejemplo, 300 s) para poder cambiar de servidor sin esperar días.`,
  links: [['m9.http', 'esta unidad profundiza HTTP, que se usó en el curso de desarrollo web'], ['red.intro', 'cada viaje de ida y vuelta cuesta un RTT que depende de la distancia'], ['m16.owasp', 'las cookies y las cabeceras HTTP son clave en la seguridad de aplicaciones web']],
  read: 'Kurose y Ross, capítulo 2; RFC 9110 (semántica de HTTP); RFC 1034 y 1035 (DNS); Grigorik, *High Performance Browser Networking* (libre en hpbn.co).',
  terms: [
    ['Protocolo sin estado', 'protocolo en el que el servidor no guarda información de las peticiones anteriores de un cliente', ['HTTP trata cada petición por separado.', 'Las cookies agregan estado encima.', 'Facilita escalar con muchos servidores.']],
    ['Conexión persistente', 'conexión TCP que se reutiliza para varias peticiones y respuestas HTTP', ['HTTP/1.1 la usa por defecto.', 'Ahorra el saludo de tres vías en cada objeto.', 'Reduce la latencia de páginas con muchos objetos.']],
    ['Multiplexación', 'envío intercalado de muchas peticiones y respuestas por una misma conexión', ['HTTP/2 la introdujo.', 'Evita el bloqueo de cabeza de línea a nivel de HTTP.', 'Reduce la cantidad de conexiones.']],
    ['QUIC', 'protocolo de transporte sobre UDP con cifrado integrado y flujos independientes, base de HTTP/3', ['Una pérdida solo detiene su propio flujo.', 'Combina el saludo de transporte y el de TLS.', 'Se publicó como RFC 9000 en 2021.']],
    ['Cookie', 'dato que el servidor pide guardar al navegador y que este devuelve en cada petición', ['Mantiene la sesión iniciada.', 'Se envía con Set-Cookie y vuelve con Cookie.', 'La introdujo Netscape en 1994.']],
    ['Petición condicional', 'petición que pide el recurso solo si cambió desde la versión que el cliente ya tiene', ['Usa If-None-Match con la ETag.', 'Si nada cambió, la respuesta es 304.', 'Ahorra transferir el cuerpo.']],
    ['Resolutor recursivo', 'servidor DNS que recibe la consulta del cliente y obtiene la respuesta preguntando a otros servidores', ['El de tu ISP o uno público.', 'Consulta raíz, TLD y autoritativo.', 'Guarda las respuestas en caché según su TTL.']],
    ['Registro CNAME', 'registro DNS que declara un nombre como alias de otro nombre', ['www.patioapp.pe apunta a patioapp.pe.', 'Se usa para apuntar a un CDN.', 'El resolutor sigue el alias hasta un registro A o AAAA.']]
  ],
  q: [
    ['Con HTTP/1.0 no persistente, una página con 1 HTML y 4 imágenes y un RTT de 50 ms, ¿cuántos ms se gastan en viajes?', '500', ['250', '300', '100'], '(4 + 1) × 2 × 50.', 3],
    ['¿Qué código de estado responde un servidor si el recurso no cambió en una petición condicional?', '304', ['200', '404', '500'], 'Not Modified, sin cuerpo.', 2],
    ['¿Qué problema de HTTP/2 resuelve HTTP/3 al usar QUIC?', 'El bloqueo de cabeza de línea de TCP ante pérdidas', ['La falta de cifrado', 'La falta de cookies', 'El uso de DNS'], 'En QUIC cada flujo se recupera por separado.', 4],
    ['¿Qué tipo de registro DNS indica el servidor de correo de un dominio?', 'MX', ['A', 'CNAME', 'TXT'], 'Mail Exchanger.', 2],
    ['¿Por qué el DNS usa principalmente UDP?', 'Porque una consulta y su respuesta suelen caber en un paquete y no vale la pena abrir una conexión', ['Porque UDP es más seguro', 'Porque TCP no existía', 'Porque UDP garantiza la entrega'], 'Ahorra el saludo de TCP.', 3],
    ['¿Qué hace una CDN?', 'Sirve copias del contenido desde servidores cercanos a los usuarios', ['Cifra el tráfico', 'Traduce nombres a direcciones', 'Asigna direcciones IP'], 'Reduce el RTT y la carga del servidor de origen.', 2],
    ['¿Qué mecanismo agregaron los navegadores para compensar el bloqueo de cabeza de línea de HTTP/1.1?', 'Abrir varias conexiones paralelas por servidor', ['Usar UDP', 'Desactivar la caché', 'Usar DNS sobre TCP'], 'Típicamente unas seis por servidor.', 3],
    { tf: 'HTTP guarda en el servidor el historial de peticiones de cada cliente.', v: false, e: 'Es sin estado; las cookies y las sesiones agregan estado encima.', l: 1 },
    { tf: 'Gracias a las cachés con TTL, la mayoría de las consultas DNS no llegan a los servidores raíz.', v: true, e: 'Los resolutores recuerdan las respuestas.', l: 2 },
    { o: 'Ordena una resolución DNS iterativa sin nada en caché.', s: ['El cliente pregunta al resolutor recursivo', 'El resolutor pregunta a un servidor raíz', 'El resolutor pregunta al servidor del TLD', 'El resolutor pregunta al servidor autoritativo', 'El resolutor responde al cliente y guarda en caché'], e: 'Cada nivel remite al siguiente.', l: 3 },
    { c: 'Escribe «tiempoPagina(k, rtt, modo)»: k objetos además del HTML; "no persistente" = (k + 1)·2·rtt, "persistente" = 2·rtt + k·rtt, "multiplexado" = 3·rtt.', f: 'tiempoPagina', p: ['k', 'rtt', 'modo'], t: [[[10, 100, 'no persistente'], 2200], [[10, 100, 'persistente'], 1200], [[10, 100, 'multiplexado'], 300], [[0, 50, 'no persistente'], 100]], sol: '  if (modo === "no persistente") return (k + 1) * 2 * rtt;\n  if (modo === "persistente") return 2 * rtt + k * rtt;\n  return 3 * rtt;', l: 2 },
    { c: 'Escribe «resolver(registros, nombre)»: registros es un objeto {nombre: {tipo, valor}} con tipos "A" y "CNAME"; sigue los alias hasta un registro A y devuelve su valor, o null si no existe o hay más de 10 saltos.', f: 'resolver', p: ['registros', 'nombre'], t: [[[{ 'www.patio.pe': { tipo: 'CNAME', valor: 'patio.pe' }, 'patio.pe': { tipo: 'A', valor: '200.48.1.5' } }, 'www.patio.pe'], '200.48.1.5'], [[{ 'a.pe': { tipo: 'A', valor: '1.2.3.4' } }, 'b.pe'], null], [[{ x: { tipo: 'CNAME', valor: 'y' }, y: { tipo: 'CNAME', valor: 'x' } }, 'x'], null]], sol: '  for (let i = 0; i < 10; i++) {\n    const r = registros[nombre];\n    if (!r) return null;\n    if (r.tipo === "A") return r.valor;\n    nombre = r.valor;\n  }\n  return null;', h: 'Limita los saltos para no caer en un ciclo de alias.', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var k = R.int(2, 30), rtt = R.pick([10, 30, 50, 70, 100]); g.input(3, 'Una página tiene 1 HTML y ' + k + ' objetos, con un RTT de ' + rtt + ' ms. ¿Cuántos ms se gastan en viajes con conexiones no persistentes?', (k + 1) * 2 * rtt, '(k + 1) × 2 × RTT.'); g.input(3, 'Misma página (' + k + ' objetos, RTT ' + rtt + ' ms) con una conexión persistente sin multiplexar. ¿Cuántos ms?', 2 * rtt + k * rtt, '2 RTT de saludo y petición del HTML y 1 RTT por objeto.'); });
    var cod = [['El recurso se creó correctamente', '201'], ['El recurso no existe', '404'], ['El cliente no está autenticado', '401'], ['El cliente está autenticado pero no tiene permiso', '403'], ['Demasiadas peticiones en poco tiempo', '429'], ['Error interno del servidor', '500'], ['El recurso se movió de forma permanente', '301'], ['El servidor está temporalmente no disponible', '503']];
    var cs = cod.map(function (c) { return c[1]; });
    cod.forEach(function (c) { g.mcq(2, '¿Qué código de estado HTTP corresponde? ' + c[0], c[1], g.R.sample(cs.filter(function (x) { return x !== c[1]; }), 3), 'Códigos de RFC 9110.'); });
    var reg = [['La dirección IPv4 de un nombre', 'A'], ['La dirección IPv6 de un nombre', 'AAAA'], ['Un alias que apunta a otro nombre', 'CNAME'], ['El servidor de correo del dominio', 'MX'], ['Los servidores autoritativos del dominio', 'NS'], ['Texto libre, como una política SPF', 'TXT']];
    reg.forEach(function (r) { g.mcq(2, '¿Qué tipo de registro DNS guarda esto? ' + r[0], r[1], ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT'].filter(function (x) { return x !== r[1]; }).slice(0, 3), 'Tipos de registro básicos del DNS.'); });
  },
  checks: [
    ['¿Por qué HTTP/1.1 hizo persistentes las conexiones por defecto?', 'Porque abrir una conexión TCP por objeto cuesta un RTT extra cada vez; reutilizarla ahorra esos viajes.'],
    ['Compara HTTP/1.1, HTTP/2 y HTTP/3.', 'HTTP/1.1 es texto con respuestas en orden por conexión; HTTP/2 multiplexa tramas binarias en una conexión TCP; HTTP/3 multiplexa sobre QUIC, sin bloqueo de cabeza de línea ante pérdidas y con TLS integrado.'],
    ['Explica cómo funciona una petición condicional con ETag.', 'El cliente envía If-None-Match con la ETag que tiene; si el recurso no cambió, el servidor responde 304 sin cuerpo y el cliente usa su copia.'],
    ['Describe la jerarquía del DNS y el papel del resolutor recursivo.', 'Raíz, TLD y autoritativos; el resolutor recibe la consulta del cliente, pregunta iterativamente a cada nivel y guarda las respuestas en caché según su TTL.'],
    ['¿Para qué sirven SPF, DKIM y DMARC?', 'Para que los servidores de correo verifiquen que un mensaje realmente proviene del dominio que dice, combatiendo la suplantación.']
  ],
  cites: ['Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 2.', 'Fielding, R., Nottingham, M. y Reschke, J. (2022). RFC 9110: HTTP Semantics. IETF.', 'Iyengar, J. y Thomson, M. (2021). RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport. IETF.', 'Mockapetris, P. (1987). RFC 1034: Domain Names, Concepts and Facilities. IETF.', 'Berners-Lee, T. (1989). *Information Management: A Proposal*. CERN.', 'Grigorik, I. (2013). *High Performance Browser Networking*. O’Reilly.'],
  project: { t: 'Un servidor HTTP y un resolutor DNS',
    goal: 'Implementar las piezas básicas de la capa de aplicación para entenderlas desde adentro.',
    steps: ['Escribe con sockets un servidor HTTP/1.1 mínimo que sirva archivos estáticos con conexiones persistentes, códigos de estado y cabeceras Cache-Control y ETag.', 'Pruébalo con curl -v y verifica las respuestas 200 y 304.', 'Escribe un resolutor DNS iterativo que, partiendo de un servidor raíz, siga las referencias hasta obtener un registro A (puedes usar una biblioteca para el formato de los mensajes).', 'Compara con Wireshark una carga de página con HTTP/1.1 y con HTTP/2.', 'Documenta qué aprendiste del costo de cada RTT.'],
    deliver: 'El código del servidor y del resolutor, las capturas y el informe.' },
  hito: ['Configura PatioApp para servir con HTTP/2 o HTTP/3, con cabeceras de caché de larga duración para archivos versionados y ETag para el HTML.', 'Define los registros DNS de PatioApp (A, AAAA, CNAME, MX y TXT de SPF) con TTL justificados y verifica la resolución con dig.']
});

S('red', 'red.trans', { title: 'Capa de transporte: UDP, transferencia confiable y TCP',
  ask: '¿Qué concepto de la capa de transporte se aplica?',
  lesson: `
> **La idea en simple.** La red es como un servicio de mensajería que a veces pierde, desordena o daña los paquetes. TCP es un asistente meticuloso que numera cada página que envías, espera un "recibido" del otro lado y reenvía lo que no fue confirmado. UDP es un cartero que deja la carta y se va: más rápido, pero sin garantías.

## Qué hace la capa de transporte
IP lleva datagramas de un **equipo** a otro sin garantías. La capa de transporte lleva datos de un **proceso** a otro, y para eso:
- **Multiplexa y demultiplexa:** junta los datos de muchos sockets del emisor y, en el receptor, entrega cada segmento al socket correcto según los **puertos**. Un socket UDP se identifica por la IP y el puerto de destino; un socket TCP por la **cuádrupla** (IP origen, puerto origen, IP destino, puerto destino). Por eso un servidor web puede tener miles de conexiones en el mismo puerto 443.
- Opcionalmente, ofrece **entrega confiable**, **control de flujo** y **control de congestión**, que es lo que agrega TCP.

## UDP: lo mínimo
**UDP** (RFC 768, 1980) agrega a IP solo los puertos y una **suma de verificación**, en una cabecera de 8 bytes. No hay conexión, ni confirmaciones, ni orden, ni control de congestión. Se usa cuando:
- Una petición y su respuesta caben en un paquete (DNS).
- Llegar tarde es peor que no llegar (voz, video en vivo, juegos), y la aplicación prefiere manejar las pérdidas a su manera.
- Se quiere construir un transporte propio encima, como QUIC.

La **suma de verificación de Internet** trata los datos como palabras de 16 bits, las suma en complemento a uno (si hay acarreo más allá de 16 bits, se suma al resultado) y complementa el total. El receptor suma todo, incluida la suma enviada, y debe obtener 16 unos. Detecta muchos errores, pero no todos (por ejemplo, dos palabras intercambiadas).

## Construir un transporte confiable
Kurose y Ross construyen la idea paso a paso, agregando mecanismos a medida que el canal empeora:
1. **Canal con errores de bits:** el receptor detecta errores con la suma de verificación y responde con **ACK** (recibido bien) o **NAK** (recibido mal); el emisor retransmite si recibe NAK.
2. **Los ACK también pueden dañarse:** si el emisor retransmite, el receptor podría aceptar un duplicado. Solución: **números de secuencia** en cada paquete.
3. **El canal también pierde paquetes:** el emisor no sabe si su paquete o el ACK se perdió. Solución: un **temporizador**; si no llega el ACK a tiempo, retransmite.
El resultado es un protocolo de **parada y espera**: enviar un paquete y esperar su ACK antes del siguiente. Es correcto pero lentísimo en enlaces rápidos y lejanos. Su **utilización** es:
:::flow U = (L/R) / (RTT + L/R)
Con paquetes de 1000 bytes (8000 bits), un enlace de 1 Gbps y un RTT de 30 ms, L/R = 0.008 ms y U = 0.008 / 30.008 ≈ 0.00027: se usa el 0.027% del enlace. Equivale a tener una autopista de diez carriles y dejar pasar un auto cada media hora.

## Tuberías: muchos paquetes en vuelo
La solución es la **tubería** (*pipelining*): enviar hasta N paquetes sin esperar confirmación. Con N paquetes en vuelo la utilización se multiplica por N (hasta llegar a 1). Hay dos estrategias para recuperar pérdidas:
| Estrategia | Confirmaciones | Ante una pérdida | Receptor |
| Retroceder N (Go-Back-N) | acumulativas: "recibí todo hasta n" | retransmite el perdido y todos los posteriores | descarta lo que llega fuera de orden |
| Repetición selectiva | individuales por paquete | retransmite solo el perdido | guarda en búfer lo que llega fuera de orden |
En repetición selectiva, la ventana no puede ser mayor que la mitad del espacio de números de secuencia; si no, el receptor no distinguiría un paquete nuevo de una retransmisión antigua con el mismo número.
~~~js
// Utilización con N paquetes en vuelo (tope en 1)
function utilizacion(Lbits, Rbps, rttMs, N) {
  const t = Lbits / Rbps * 1000;                  // ms de transmisión
  return Math.min(1, N * t / (rttMs + t));
}
for (const N of [1, 10, 1000, 4000]) console.log('N =', N, '→ utilización', (utilizacion(8000, 1e9, 30, N) * 100).toFixed(3) + '%');
~~~

## TCP en concreto
**TCP** (RFC 793, 1981; actualizado como RFC 9293 en 2022) ofrece un **flujo de bytes** confiable, ordenado y bidireccional entre dos procesos. Sus mecanismos:
- **Saludo de tres vías:** el cliente envía SYN con su número de secuencia inicial; el servidor responde SYN-ACK con el suyo; el cliente confirma con ACK. Los números iniciales son aleatorios para que no se confundan segmentos de conexiones viejas y para dificultar ataques.
- **Números de secuencia por byte:** el número de un segmento es la posición de su primer byte en el flujo. El **ACK** indica el próximo byte que se espera (confirmación acumulativa).
- **Temporizador de retransmisión:** se calcula a partir del RTT medido (lo verás en la siguiente unidad).
- **Retransmisión rápida:** si llegan tres ACK duplicados (el receptor sigue pidiendo el mismo byte porque recibió datos posteriores), el emisor retransmite sin esperar el temporizador.
- **Control de flujo:** cada ACK lleva la **ventana de recepción**, el espacio libre en el búfer del receptor; el emisor nunca tiene más bytes sin confirmar que esa ventana. Así un emisor rápido no desborda a un receptor lento.
- **Cierre:** cada lado envía FIN y recibe su ACK. El lado que cierra primero queda en **TIME_WAIT** unos minutos para absorber segmentos retrasados; por eso un servidor que abre y cierra miles de conexiones salientes puede agotar sus puertos.
La cabecera TCP mide al menos 20 bytes, y el **MSS** (tamaño máximo de segmento) suele ser 1460 bytes en Ethernet (1500 de la trama menos 20 de IP y 20 de TCP).

## TCP dentro del sistema operativo
TCP vive en el núcleo. Cada socket tiene un **búfer de envío** y uno de **recepción**: «write» solo copia los datos al búfer de envío y retorna; el núcleo los segmenta y transmite cuando la ventana lo permite. Dos optimizaciones antiguas interactúan de forma conocida:
- El **algoritmo de Nagle** (John Nagle, RFC 896, 1984) agrupa escrituras pequeñas mientras haya datos sin confirmar, para no inundar la red de segmentos diminutos.
- Los **ACK diferidos** esperan unos milisegundos antes de confirmar, con la esperanza de enviar la confirmación junto con datos de respuesta.
Juntos pueden añadir decenas de milisegundos a protocolos de petición-respuesta con mensajes pequeños; por eso muchas aplicaciones interactivas activan la opción «TCP_NODELAY». En el otro extremo, el **ataque de inundación SYN** envía miles de SYN con direcciones falsas para llenar la tabla de conexiones a medio abrir del servidor; las **cookies SYN** (Daniel Bernstein, 1996) lo neutralizan codificando el estado de la conexión en el número de secuencia del SYN-ACK, de modo que el servidor no guarda nada hasta recibir el ACK final.

## TCP o UDP
| Necesidad | Elección típica |
| Transferir un archivo o una página web sin errores | TCP (o QUIC) |
| Consulta DNS de un paquete | UDP |
| Videollamada o juego en tiempo real | UDP con recuperación propia |
| Mensajes en orden entre microservicios | TCP |

## Ejemplo resuelto: el servidor de PatioApp y sus conexiones
Las cámaras del patio envían cada segundo una foto a PatioApp y abrían una conexión TCP nueva por foto: un RTT de saludo cada vez y, en el servidor, miles de sockets en TIME_WAIT que agotaban los puertos del balanceador. Solución: conexiones persistentes con HTTP/1.1 o HTTP/2 desde cada cámara. Para la telemetría de los sensores (un número cada segundo, donde un dato perdido no importa porque llega otro enseguida), basta UDP: sin saludo ni retransmisiones, con menos consumo de batería.`,
  links: [['red.app', 'HTTP corre sobre TCP y DNS sobre UDP'], ['red.cong', 'el control de congestión completa los mecanismos de TCP'], ['m1.bin', 'la suma de verificación opera con aritmética binaria de 16 bits']],
  read: 'Kurose y Ross, capítulo 3 (secciones 3.1 a 3.5); RFC 9293 (TCP); Stevens, *TCP/IP Illustrated*, volumen 1.',
  terms: [
    ['Puerto', 'número de 16 bits que identifica a un proceso dentro de un equipo para la capa de transporte', ['HTTPS usa el 443.', 'DNS usa el 53.', 'Permite muchas aplicaciones en una misma IP.']],
    ['UDP', 'protocolo de transporte sin conexión que solo agrega puertos y suma de verificación a IP', ['DNS lo usa para consultas cortas.', 'No confirma ni ordena.', 'QUIC se construye encima.']],
    ['Suma de verificación', 'valor calculado sobre los datos para que el receptor detecte errores de bits', ['La de Internet suma palabras de 16 bits en complemento a uno.', 'El receptor obtiene 16 unos si no hay error.', 'No detecta palabras intercambiadas.']],
    ['Parada y espera', 'protocolo que envía un paquete y espera su confirmación antes de enviar el siguiente', ['Usa una fracción ínfima de un enlace rápido y lejano.', 'Es el punto de partida de la transferencia confiable.', 'Su utilización es (L/R)/(RTT + L/R).']],
    ['Retroceder N', 'protocolo de tubería con confirmaciones acumulativas que retransmite el paquete perdido y todos los posteriores', ['El receptor descarta lo que llega fuera de orden.', 'Es simple para el receptor.', 'Desperdicia ancho de banda ante pérdidas.']],
    ['Repetición selectiva', 'protocolo de tubería que confirma cada paquete y retransmite solo los perdidos', ['El receptor guarda lo que llega fuera de orden.', 'Su ventana no puede superar la mitad de los números de secuencia.', 'Aprovecha mejor el enlace con pérdidas.']],
    ['Saludo de tres vías', 'intercambio SYN, SYN-ACK y ACK con el que TCP establece una conexión', ['Cuesta un RTT antes de enviar datos.', 'Sincroniza los números de secuencia iniciales.', 'Un ataque de inundación SYN lo abusa.']],
    ['Ventana de recepción', 'espacio libre en el búfer del receptor que TCP anuncia para que el emisor no lo desborde', ['Si es cero, el emisor se detiene.', 'Implementa el control de flujo.', 'Viaja en cada ACK.']]
  ],
  q: [
    ['¿Qué identifica a un socket TCP en el servidor?', 'La cuádrupla IP y puerto de origen, IP y puerto de destino', ['Solo el puerto de destino', 'Solo la IP de origen', 'El número de secuencia'], 'Por eso miles de conexiones comparten el puerto 443.', 3],
    ['Con L = 8000 bits, R = 1 Mbps y RTT = 2 ms, ¿cuál es la utilización de parada y espera?', '0.8', ['0.08', '0.5', '1'], 'L/R = 8 ms; 8 / (2 + 8) = 0.8.', 3],
    ['¿Qué hace el emisor TCP al recibir tres ACK duplicados?', 'Retransmite el segmento sin esperar el temporizador', ['Cierra la conexión', 'Duplica la ventana', 'Ignora los ACK'], 'Es la retransmisión rápida.', 3],
    ['¿Por qué en repetición selectiva la ventana no puede superar la mitad del espacio de secuencia?', 'Para que el receptor distinga un paquete nuevo de una retransmisión vieja con el mismo número', ['Para ahorrar memoria', 'Porque TCP lo exige', 'Para reducir la latencia'], 'Si no, los números se confunden.', 4],
    ['¿Cuál es el MSS típico de TCP sobre Ethernet?', '1460 bytes', ['1500 bytes', '512 bytes', '65535 bytes'], '1500 − 20 (IP) − 20 (TCP).', 3],
    ['¿Qué aplicación conviene construir sobre UDP?', 'Una videollamada en tiempo real', ['La descarga de un instalador', 'Una transferencia bancaria', 'El envío de un correo'], 'Llegar tarde es peor que no llegar.', 2],
    ['Un ACK de TCP con número 5001 significa que…', 'el receptor recibió todo hasta el byte 5000 y espera el 5001', ['recibió solo el byte 5001', 'faltan 5001 bytes', 'la ventana es de 5001 bytes'], 'Confirmación acumulativa por byte.', 3],
    { tf: 'UDP garantiza que los datagramas lleguen en orden.', v: false, e: 'No garantiza orden ni entrega.', l: 1 },
    { tf: 'El control de flujo de TCP evita que un emisor rápido desborde el búfer de un receptor lento.', v: true, e: 'Usa la ventana de recepción anunciada en cada ACK.', l: 2 },
    { o: 'Ordena el saludo de tres vías de TCP.', s: ['El cliente envía SYN', 'El servidor responde SYN-ACK', 'El cliente envía ACK', 'Comienza el envío de datos'], e: 'Cuesta un RTT antes de los datos.', l: 1 },
    { c: 'Escribe «utilizacion(L, R, rttMs, N)»: utilización con N paquetes en vuelo, min(1, N·(L/R)/(RTT + L/R)), con L en bits, R en bps y RTT en ms, redondeada a 6 decimales.', f: 'utilizacion', p: ['L', 'R', 'rttMs', 'N'], t: [[[8000, 1000000000, 30, 1], 0.000267], [[8000, 1000000000, 30, 3], 0.0008], [[8000, 1000000, 2, 1], 0.8], [[8000, 1000000, 2, 5], 1]], sol: '  const t = L / R * 1000;\n  return Math.round(Math.min(1, N * t / (rttMs + t)) * 1e6) / 1e6;', l: 3 },
    { c: 'Escribe «checksum16(palabras)»: suma de verificación de Internet sobre una lista de palabras de 16 bits (suma en complemento a uno con acarreo circular y complemento final).', f: 'checksum16', p: ['palabras'], t: [[[[26208, 21845, 36620]], 46397], [[[65535]], 0], [[[1, 2]], 65532]], sol: '  let s = 0;\n  for (const w of palabras) { s += w; s = (s & 0xffff) + (s >>> 16); }\n  return (~s) & 0xffff;', h: 'Tras cada suma, si pasa de 16 bits, suma el acarreo al resultado.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var L = R.pick([8000, 12000]), r = R.pick([1e6, 1e7, 1e8, 1e9]), rtt = R.pick([1, 10, 30, 100]), t = L / r * 1000; g.input(3, 'Parada y espera con L = ' + L + ' bits, R = ' + (r / 1e6) + ' Mbps y RTT = ' + rtt + ' ms. ¿Cuál es la utilización? Redondea a 4 decimales.', (t / (rtt + t)).toFixed(4), '(L/R) / (RTT + L/R) con L/R = ' + t + ' ms.'); });
    var uso = [['Consulta DNS', 'UDP'], ['Descarga de un archivo', 'TCP'], ['Página web con HTTP/1.1', 'TCP'], ['Telemetría de un sensor que envía un dato por segundo', 'UDP'], ['Correo con SMTP', 'TCP'], ['Juego en línea en tiempo real', 'UDP'], ['Conexión SSH', 'TCP'], ['Transmisión de voz sobre IP', 'UDP']];
    uso.forEach(function (u) { g.mcq(2, '¿Qué transporte suele usar? ' + u[0], u[1], [u[1] === 'TCP' ? 'UDP' : 'TCP', 'ICMP', 'ARP'], 'TCP para confiabilidad y orden; UDP para rapidez y tiempo real.'); });
    var mec = [['Detectar bits dañados', 'Suma de verificación'], ['Distinguir un paquete nuevo de un duplicado', 'Número de secuencia'], ['Recuperar un paquete perdido sin respuesta', 'Temporizador y retransmisión'], ['Tener varios paquetes en vuelo', 'Tubería con ventana'], ['Evitar desbordar al receptor', 'Ventana de recepción']];
    mec.forEach(function (m) { g.mcq(3, '¿Qué mecanismo resuelve esto? ' + m[0], m[1], ['Suma de verificación', 'Número de secuencia', 'Temporizador y retransmisión', 'Tubería con ventana', 'Ventana de recepción'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Cada mecanismo resuelve un problema del canal.'); });
  },
  checks: [
    ['¿Qué agrega UDP sobre IP y cuándo conviene usarlo?', 'Solo puertos y suma de verificación; conviene para consultas de un paquete, tiempo real o para construir un transporte propio.'],
    ['Explica por qué hacen falta números de secuencia y temporizadores en un transporte confiable.', 'Los números distinguen duplicados cuando se retransmite; los temporizadores recuperan pérdidas cuando no llega confirmación.'],
    ['Calcula la utilización de parada y espera con L = 12 000 bits, R = 1 Gbps y RTT = 10 ms.', 'L/R = 0.012 ms; U = 0.012 / 10.012 ≈ 0.0012.'],
    ['Compara retroceder N y repetición selectiva.', 'Retroceder N usa confirmaciones acumulativas y retransmite desde el perdido en adelante; repetición selectiva confirma cada paquete y retransmite solo los perdidos, guardando los que llegan fuera de orden.'],
    ['¿Qué es TIME_WAIT y qué problema puede causar?', 'Un estado tras cerrar la conexión que absorbe segmentos retrasados; con muchas conexiones cortas puede agotar los puertos disponibles.']
  ],
  cites: ['Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 3.', 'Postel, J. (1980). RFC 768: User Datagram Protocol. IETF.', 'Eddy, W. (2022). RFC 9293: Transmission Control Protocol (TCP). IETF.', 'Braden, R., Borman, D. y Partridge, C. (1988). RFC 1071: Computing the Internet Checksum. IETF.', 'Stevens, W. R. (1994). *TCP/IP Illustrated, Volume 1: The Protocols*. Addison-Wesley.'],
  project: { t: 'Transporte confiable sobre UDP',
    goal: 'Implementar un protocolo confiable propio sobre un canal que pierde y desordena paquetes.',
    steps: ['Escribe un emisor y un receptor sobre UDP con un canal simulado que pierde y desordena un porcentaje configurable de paquetes.', 'Implementa parada y espera con números de secuencia, ACK y temporizador, y verifica que el archivo llega intacto.', 'Implementa retroceder N y repetición selectiva con ventana configurable.', 'Mide el tiempo de transferencia de 10 MB con distintas pérdidas, ventanas y RTT simulados.', 'Compara tus resultados con la fórmula de utilización y con TCP real.'],
    deliver: 'El código, los gráficos de rendimiento y un informe comparativo.' },
  hito: ['Haz que las cámaras de PatioApp reutilicen conexiones persistentes en lugar de abrir una por foto, y mide la reducción de conexiones y de latencia.', 'Envía la telemetría de los sensores de PatioApp por UDP con número de secuencia para detectar pérdidas, y justifica por qué no hace falta retransmitir.']
});
})();
