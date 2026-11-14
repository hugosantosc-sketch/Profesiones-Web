(function () {
var S = SDC.S;

S('red', 'red.link', { title: 'Capa de enlace: errores, acceso al medio, Ethernet y conmutadores',
  ask: '¿Qué concepto de la capa de enlace se aplica?',
  lesson: `
> **La idea en simple.** Si la capa de red planifica el viaje completo de Lima a Cusco, la capa de enlace se ocupa de cada tramo: el bus de Lima a Nasca, el de Nasca a Abancay, el de Abancay a Cusco. En cada tramo hay que decidir quién sube primero cuando varios quieren el mismo asiento, revisar que el equipaje llegue sano y entregarlo a la persona correcta del siguiente terminal.

## Qué hace la capa de enlace
La capa de enlace mueve **tramas** entre dos nodos **adyacentes**: tu computadora y el enrutador del wifi, o dos conmutadores conectados por un cable. Sus servicios:
- **Entramado:** encapsular el datagrama en una trama con cabecera y cola.
- **Acceso al medio:** decidir quién transmite cuando varios comparten el canal.
- **Detección y corrección de errores.**
- Opcionalmente, **entrega confiable** en el enlace (el wifi la hace, porque pierde mucho; Ethernet cableado no).
Se implementa sobre todo en el hardware de la **tarjeta de red**, con parte en el controlador del sistema operativo. Cada tarjeta tiene una **dirección MAC** de 48 bits (por ejemplo, 3C:52:82:1A:9F:07), cuyos primeros 24 bits identifican al fabricante.

## Detectar errores
El ruido eléctrico, la interferencia o un conector flojo pueden invertir bits. Técnicas de detección, de la más simple a la más potente:
- **Paridad:** un bit extra para que la cantidad de unos sea par. Detecta cualquier cantidad impar de errores, pero no dos errores. La **paridad bidimensional** (por filas y columnas) además **localiza y corrige** un error único.
- **Suma de verificación:** la que viste en TCP y UDP; barata de calcular en software, pero débil.
- **Código de redundancia cíclica (CRC):** trata los bits como un polinomio con coeficientes 0 y 1 y lo divide (en aritmética módulo 2, donde sumar y restar es un XOR) por un **generador** G acordado. El emisor agrega a los datos los r bits del **resto**, de modo que el conjunto sea divisible por G; el receptor divide y, si el resto no es cero, hay error. Un CRC de r bits detecta todas las ráfagas de errores de longitud r o menor. Ethernet usa CRC-32. Se calcula en hardware con registros de desplazamiento.
~~~js
// CRC: división módulo 2 (XOR) de los datos seguidos de r ceros entre el generador
function crc(datos, generador) {
  const r = generador.length - 1, a = (datos + '0'.repeat(r)).split('').map(Number), g = generador.split('').map(Number);
  for (let i = 0; i + g.length <= a.length; i++) if (a[i]) g.forEach((b, j) => a[i + j] ^= b);
  return a.slice(-r).join('');
}
const D = '101110', G = '1001', R = crc(D, G);
console.log('resto', R, '→ trama enviada', D + R);
console.log('el receptor recalcula:', crc(D + R, G).includes('1') ? 'error' : 'sin errores (resto 0)');
~~~
(Al verificar la trama completa, el receptor obtiene el resto 0 de la división; en el código se comprueba dividiendo la trama con los ceros agregados, lo que también da 0 si la trama es válida.)

## Acceso múltiple
Cuando varios nodos comparten un medio (el aire, un cable coaxial antiguo), si dos transmiten a la vez sus señales **colisionan** y se pierden. Hay tres familias de protocolos:
- **Partición del canal:** dividir el canal en franjas de tiempo (TDMA), de frecuencia (FDMA) o de código (CDMA). Justo y sin colisiones, pero desperdicia capacidad si pocos tienen datos.
- **Acceso aleatorio:** transmitir a toda velocidad y, si hay colisión, reintentar tras una espera aleatoria.
- **Por turnos:** un nodo coordinador sondea a cada uno, o un **testigo** (*token*) circula y solo transmite quien lo tiene.
El acceso aleatorio nació con **ALOHAnet**, la red de radio de Norman Abramson en la Universidad de Hawái (1971). En **ALOHA ranurado**, con N nodos que transmiten en cada ranura con probabilidad p, la probabilidad de que una ranura tenga éxito es N·p·(1 − p)^(N − 1); con muchos nodos y p óptimo la eficiencia máxima tiende a **1/e ≈ 37%**, y en ALOHA puro (sin ranuras) a 1/(2e) ≈ 18%. Mejoras:
- **CSMA** (escuchar antes de hablar): no transmitir si el canal está ocupado.
- **CSMA/CD** (detección de colisión): si se detecta una colisión durante la transmisión, abortar enseguida y esperar con **retroceso exponencial binario**: tras la n-ésima colisión, esperar un número aleatorio de ranuras entre 0 y 2ⁿ − 1 (hasta un tope). Así funcionaba el Ethernet compartido.

## Ethernet
Robert Metcalfe y David Boggs inventaron Ethernet en Xerox PARC en 1973 y lo publicaron en 1976; Metcalfe recibió el Premio Turing en 2022. Ethernet pasó de 2.94 Mbps sobre coaxial a 100 Gbps y más sobre fibra, conservando su formato de trama:
| Campo | Tamaño | Función |
| Preámbulo | 8 bytes | sincronizar los relojes del receptor |
| MAC destino y origen | 6 + 6 bytes | quién recibe y quién envía |
| Tipo | 2 bytes | protocolo de arriba (0x0800 = IPv4, 0x86DD = IPv6) |
| Datos | 46 a 1500 bytes | el datagrama (el MTU es 1500) |
| CRC | 4 bytes | detección de errores |
Hoy Ethernet es casi siempre **conmutado** y **dúplex completo**: cada equipo tiene su propio cable hasta un conmutador y puede enviar y recibir a la vez, así que ya no hay colisiones ni hace falta CSMA/CD.

## ARP: de IP a MAC
Para enviar un datagrama a un equipo de su misma subred, el emisor necesita su dirección MAC. **ARP** (RFC 826, 1982) la averigua: el emisor difunde a toda la red local "¿quién tiene la IP 10.50.2.7?" (trama a FF:FF:FF:FF:FF:FF) y el dueño responde con su MAC, que se guarda en una caché por unos minutos. Si el destino está en otra subred, el emisor envía la trama a la MAC de su **puerta de enlace** (el enrutador), que reenvía el datagrama. En IPv6 la misma tarea la hace el descubrimiento de vecinos. ARP no tiene autenticación, lo que permite el **envenenamiento de ARP**: un atacante responde por la IP del enrutador y se coloca en medio de la comunicación.

## Conmutadores
Un **conmutador** (*switch*) de capa 2 recibe tramas y las reenvía solo por el puerto donde está el destino:
- **Autoaprendizaje:** al recibir una trama, anota en su tabla que la MAC de origen está detrás del puerto de entrada.
- **Reenvío o filtrado:** si conoce el puerto del destino, envía solo por ahí; si no lo conoce (o es difusión), **inunda** por todos los demás puertos.
No requiere configuración y es transparente para los equipos. Si se conectan conmutadores formando un ciclo para tener redundancia, las difusiones circularían para siempre; el **protocolo de árbol de expansión** (STP), diseñado por Radia Perlman en 1985, desactiva enlaces hasta dejar un árbol sin ciclos y los reactiva si otro falla.

## VLAN
Una **red local virtual** (VLAN, norma IEEE 802.1Q) divide un mismo conmutador físico en varias redes lógicas aisladas: los puertos de la VLAN 10 (cámaras) no ven las tramas de la VLAN 20 (invitados). Entre conmutadores, un **enlace troncal** lleva tramas de varias VLAN etiquetadas con un identificador de 12 bits. Para que dos VLAN se comuniquen hace falta un enrutador (o un conmutador de capa 3), donde se aplican reglas de cortafuegos.

## Redes de centros de datos
Un centro de datos conecta decenas de miles de servidores. El diseño moderno es la topología **hoja-columna** (*leaf-spine*), una red de Clos: cada conmutador de borde (hoja), arriba de un rack, se conecta a todos los conmutadores de columna, de modo que entre dos servidores cualesquiera hay muchos caminos de igual longitud y el tráfico se reparte entre ellos (ECMP).

## Ejemplo resuelto: la red local del patio
En la sede de PatioApp, un conmutador de 48 puertos con VLAN separa la oficina (VLAN 10), las cámaras (VLAN 20), los sensores (VLAN 30) y los invitados (VLAN 40), cada una con la subred que diseñaste en la capa de red. Cuando una cámara recién conectada envía su primera trama, el conmutador aprende su MAC en el puerto 17 y desde entonces solo envía por ahí lo que va a ella. La cámara quiere enviar una foto al servidor interno 10.50.2.10, que está en otra subred: su tabla le dice que use la puerta de enlace 10.50.1.1, pregunta por ARP la MAC de esa puerta y le envía la trama. El enrutador de la sede aplica la regla "VLAN 20 solo puede hablar con el servidor en el puerto 443" y reenvía. Para protegerse del envenenamiento de ARP, el conmutador activa la **inspección dinámica de ARP**, que descarta respuestas ARP que no coinciden con las asignaciones de DHCP.`,
  links: [['red.net', 'la capa de enlace entrega los datagramas IP dentro de cada subred'], ['red.trans', 'la suma de verificación de transporte es más débil que el CRC del enlace'], ['m2.prob', 'la eficiencia de ALOHA se calcula con probabilidad']],
  read: 'Kurose y Ross, capítulo 6; Metcalfe y Boggs (1976); Abramson (1970); Perlman (1985).',
  terms: [
    ['Trama', 'unidad de datos de la capa de enlace que encapsula un datagrama con cabecera y cola', ['Una trama Ethernet lleva hasta 1500 bytes de datos.', 'Incluye las direcciones MAC.', 'Termina con un CRC.']],
    ['Dirección MAC', 'identificador de 48 bits de una interfaz de red usado en la capa de enlace', ['3C:52:82:1A:9F:07.', 'Los primeros 24 bits identifican al fabricante.', 'Solo tiene sentido dentro de la red local.']],
    ['CRC', 'código de detección de errores basado en división polinómica módulo 2 por un generador acordado', ['Ethernet usa CRC-32.', 'Detecta todas las ráfagas de hasta r bits.', 'Se calcula en hardware.']],
    ['CSMA/CD', 'acceso aleatorio que escucha antes de transmitir y aborta al detectar una colisión', ['El Ethernet compartido lo usaba.', 'Tras una colisión espera con retroceso exponencial binario.', 'El Ethernet conmutado dúplex ya no lo necesita.']],
    ['ARP', 'protocolo que obtiene la dirección MAC correspondiente a una dirección IP de la red local', ['Difunde "¿quién tiene esta IP?".', 'Guarda las respuestas en una caché.', 'No tiene autenticación.']],
    ['Conmutador con autoaprendizaje', 'equipo de capa 2 que aprende en qué puerto está cada MAC observando el origen de las tramas', ['Inunda si no conoce el destino.', 'No necesita configuración.', 'Envía solo por el puerto correcto cuando lo conoce.']],
    ['Árbol de expansión', 'protocolo que desactiva enlaces redundantes entre conmutadores para evitar ciclos', ['Radia Perlman lo diseñó en 1985.', 'Reactiva un enlace si otro falla.', 'Evita tormentas de difusión.']],
    ['VLAN', 'red local virtual que separa lógicamente puertos de un mismo conmutador en redes aisladas', ['Las cámaras en la VLAN 20 y los invitados en la 40.', 'Se etiquetan con 802.1Q en los troncales.', 'Para comunicarse necesitan un enrutador.']]
  ],
  q: [
    ['¿Qué bit de paridad par corresponde a 1011001?', '0', ['1', 'No se puede calcular', '2'], 'Hay cuatro unos, ya es par.', 1],
    ['¿Cuál es el resto CRC de los datos 101110 con generador 1001?', '011', ['100', '001', '110'], 'Ejemplo clásico de Kurose y Ross.', 3],
    ['¿Cuál es la eficiencia máxima de ALOHA ranurado con muchos nodos?', 'Aproximadamente 37%', ['Aproximadamente 18%', '50%', '100%'], 'Tiende a 1/e.', 3],
    ['Un conmutador recibe una trama cuyo destino no está en su tabla. ¿Qué hace?', 'La inunda por todos los puertos menos el de entrada', ['La descarta', 'La devuelve', 'Pregunta por ARP'], 'Así llegará al destino, y aprenderá con la respuesta.', 2],
    ['¿Por qué el Ethernet conmutado dúplex ya no necesita CSMA/CD?', 'Porque cada equipo tiene su propio enlace con el conmutador y no hay colisiones', ['Porque usa wifi', 'Porque usa TCP', 'Porque el CRC lo reemplaza'], 'El medio ya no es compartido.', 3],
    ['Un equipo quiere enviar un datagrama a una IP de otra subred. ¿A qué MAC envía la trama?', 'A la MAC de su puerta de enlace', ['A la MAC del destino final', 'A la dirección de difusión', 'A su propia MAC'], 'El enrutador se encarga de reenviarlo.', 3],
    ['¿Qué ataque aprovecha que ARP no autentica las respuestas?', 'El envenenamiento de ARP para ponerse en medio', ['La inundación SYN', 'El secuestro de BGP', 'La inyección SQL'], 'El atacante responde por la IP del enrutador.', 3],
    { tf: 'Un CRC de 32 bits detecta todas las ráfagas de errores de 32 bits o menos.', v: true, e: 'Es una propiedad de los CRC de r bits.', l: 3 },
    { tf: 'Dos equipos en distintas VLAN del mismo conmutador pueden comunicarse sin un enrutador.', v: false, e: 'Las VLAN aíslan; hace falta un enrutador o un conmutador de capa 3.', l: 2 },
    { c: 'Escribe «paridadPar(bits)»: devuelve "1" o "0", el bit que hay que agregar para que la cantidad de unos sea par.', f: 'paridadPar', p: ['bits'], t: [[['1011001'], '0'], [['111'], '1'], [[''], '0'], [['0001'], '1']], sol: '  return String(bits.split("").filter(b => b === "1").length % 2);', l: 1 },
    { c: 'Escribe «crcResto(datos, generador)»: devuelve el resto de r = largo del generador − 1 bits de dividir los datos seguidos de r ceros entre el generador, en aritmética módulo 2.', f: 'crcResto', p: ['datos', 'generador'], t: [[['101110', '1001'], '011'], [['11010011101100', '1011'], '100'], [['1101', '101'], '10']], sol: '  const r = generador.length - 1, a = (datos + "0".repeat(r)).split("").map(Number), g = generador.split("").map(Number);\n  for (let i = 0; i + g.length <= a.length; i++) if (a[i]) g.forEach((b, j) => a[i + j] ^= b);\n  return a.slice(-r).join("");', h: 'Recorre de izquierda a derecha; cuando el bit actual es 1, aplica XOR con el generador.', l: 4 },
    { c: 'Escribe «eficienciaAloha(N, p)»: probabilidad de éxito de una ranura en ALOHA ranurado, N·p·(1 − p)^(N − 1), redondeada a 4 decimales.', f: 'eficienciaAloha', p: ['N', 'p'], t: [[[5, 0.2], 0.4096], [[10, 0.1], 0.3874], [[1, 1], 1]], sol: '  return Math.round(N * p * Math.pow(1 - p, N - 1) * 10000) / 10000;', l: 2 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var b = ''; for (var i = 0; i < 8; i++) b += R.pick(['0', '1']); var u = b.split('').filter(function (x) { return x === '1'; }).length; g.input(1, '¿Qué bit de paridad par corresponde a ' + b + '?', String(u % 2), 'Tiene ' + u + ' unos.'); });
    g.times(6, function (R) { var n = R.pick([2, 3, 5, 10, 20]), p = R.pick([0.05, 0.1, 0.2, 0.5]); g.input(3, 'En ALOHA ranurado con ' + n + ' nodos y probabilidad de transmitir ' + p + ', ¿cuál es la probabilidad de éxito de una ranura? Redondea a 4 decimales.', (n * p * Math.pow(1 - p, n - 1)).toFixed(4), 'N·p·(1 − p)^(N − 1).'); });
    var ac = [['Dividir el canal en franjas de tiempo fijas por nodo', 'Partición del canal'], ['Transmitir y reintentar tras una espera aleatoria si hay colisión', 'Acceso aleatorio'], ['Un coordinador pregunta a cada nodo si tiene datos', 'Por turnos'], ['Pasar un testigo y que solo transmita quien lo tiene', 'Por turnos'], ['Asignar a cada nodo una frecuencia distinta', 'Partición del canal'], ['Escuchar el canal y transmitir si está libre', 'Acceso aleatorio']];
    ac.forEach(function (a) { g.mcq(2, '¿A qué familia de acceso múltiple pertenece? ' + a[0], a[1], ['Partición del canal', 'Acceso aleatorio', 'Por turnos', 'Enrutamiento'].filter(function (x) { return x !== a[1]; }), 'Tres familias de protocolos de acceso múltiple.'); });
  },
  checks: [
    ['¿Qué servicios presta la capa de enlace?', 'Entramado, acceso al medio, detección de errores y, en algunos enlaces, entrega confiable entre nodos adyacentes.'],
    ['Calcula el CRC de 101110 con G = 1001 y explica cómo verifica el receptor.', 'El resto es 011 y se envía 101110011; el receptor divide la trama por G y, si el resto no es 0, detecta un error.'],
    ['¿Por qué ALOHA ranurado no supera el 37% de eficiencia?', 'Porque al transmitir al azar, con muchos nodos, una ranura tiene a lo sumo 1/e de probabilidad de tener exactamente un transmisor.'],
    ['Explica cómo aprende y reenvía un conmutador.', 'Anota la MAC de origen con su puerto de entrada; si conoce el puerto del destino envía solo por ahí, y si no, inunda.'],
    ['¿Para qué sirve una VLAN y qué hace falta para comunicar dos VLAN?', 'Para aislar lógicamente grupos de equipos en el mismo conmutador; para comunicarlas hace falta un enrutador, donde se aplican reglas.']
  ],
  cites: ['Metcalfe, R. y Boggs, D. (1976). Ethernet: Distributed Packet Switching for Local Computer Networks. *Communications of the ACM*, 19(7).', 'Abramson, N. (1970). The ALOHA System: Another Alternative for Computer Communications. *AFIPS Fall Joint Computer Conference*.', 'Perlman, R. (1985). An Algorithm for Distributed Computation of a Spanning Tree in an Extended LAN. *ACM SIGCOMM Computer Communication Review*, 15(4).', 'Plummer, D. (1982). RFC 826: An Ethernet Address Resolution Protocol. IETF.', 'Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 6.', 'Al-Fares, M., Loukissas, A. y Vahdat, A. (2008). A Scalable, Commodity Data Center Network Architecture. *SIGCOMM 2008*.'],
  project: { t: 'Laboratorio de capa de enlace',
    goal: 'Ver y simular lo que ocurre en la capa de enlace de una red local.',
    steps: ['Captura con Wireshark el tráfico ARP y una trama Ethernet de tu red; identifica cada campo.', 'Implementa la paridad bidimensional y el CRC, y comprueba qué errores detecta cada uno con inyección aleatoria de bits.', 'Simula ALOHA ranurado y CSMA/CD con retroceso exponencial y grafica la eficiencia frente a la cantidad de nodos.', 'Simula un conmutador con autoaprendizaje que procese una secuencia de tramas y muestre su tabla.', 'Escribe un informe con los resultados.'],
    deliver: 'Las capturas, los simuladores y el informe.' },
  hito: ['Configura (o documenta para el proveedor) las VLAN de la sede de PatioApp: oficina, cámaras, sensores e invitados, con su troncal hacia el enrutador.', 'Activa o especifica protecciones contra el envenenamiento de ARP en la red del patio y verifica con una captura que el tráfico de invitados no llega a las cámaras.']
});

S('red', 'red.phy', { title: 'Capa física, señales y redes inalámbricas',
  ask: '¿Qué concepto de la capa física o de redes inalámbricas se aplica?',
  lesson: `
> **La idea en simple.** Al final de todo, un bit es un cambio en algo físico: un voltaje en un cable, un destello de luz en una fibra o una onda de radio en el aire. La física pone límites duros a cuántos bits por segundo caben en un canal, por más ingenio que se ponga. Y en el aire, además, las ondas rebotan, se debilitan y se pisan unas a otras.

## Señales, ancho de banda y tasa de bits
Un canal deja pasar señales en un rango de frecuencias: su **ancho de banda** en hercios (Hz). Hay que distinguirlo de la **tasa de bits** (bps), aunque coloquialmente se usen como sinónimos. Para enviar bits se varía una señal en **símbolos**: si cada símbolo puede tomar M valores distintos, transporta log₂ M bits.

## Los límites de Nyquist y Shannon
- **Harry Nyquist** (1928): en un canal **sin ruido** de ancho de banda B, se pueden enviar como máximo 2B símbolos por segundo, así que la capacidad es C = 2B log₂ M. Con más niveles (M) cabe más, en teoría sin límite.
- **Claude Shannon** (1948, *A Mathematical Theory of Communication*): con **ruido**, la capacidad máxima de un canal es C = B log₂(1 + S/N), donde S/N es la relación señal a ruido como cociente (no en decibeles). Ningún esquema de codificación, por inteligente que sea, puede superarla de forma confiable; a la vez, Shannon demostró que existen códigos que se acercan a ella tanto como se quiera.
La relación señal a ruido se expresa en **decibeles**: SNR(dB) = 10 log₁₀(S/N). Así, 30 dB es un cociente de 1000, 20 dB es 100 y 3 dB es aproximadamente 2. Una línea telefónica de unos 3000 Hz con 30 dB de SNR tiene una capacidad de unos 30 kbps, que explica por qué los módems telefónicos se quedaron cerca de los 33.6 kbps (los de 56 kbps aprovechaban que una parte del camino era digital).
~~~js
const shannon = (B, snrDb) => B * Math.log2(1 + 10 ** (snrDb / 10));
const nyquist = (B, M) => 2 * B * Math.log2(M);
console.log('Línea telefónica (3 kHz, 30 dB):', Math.round(shannon(3000, 30)), 'bps');
console.log('Canal wifi de 20 MHz a 25 dB:', (shannon(20e6, 25) / 1e6).toFixed(1), 'Mbps');
console.log('Mismo canal a 10 dB (más lejos):', (shannon(20e6, 10) / 1e6).toFixed(1), 'Mbps');
console.log('Nyquist, 20 MHz con 64 niveles:', nyquist(20e6, 64) / 1e6, 'Mbps (sin ruido)');
~~~

## Codificación y modulación
- En banda base (cables), los bits se codifican como niveles: **NRZ** (un nivel por bit) o **Manchester** (una transición en medio de cada bit, que lleva el reloj incorporado, usada por el Ethernet de 10 Mbps). Esquemas como 4B/5B o 64B/66B agregan bits para garantizar transiciones.
- En canales de radio se **modula** una onda portadora variando su amplitud (ASK), su frecuencia (FSK) o su fase (PSK). La **QAM** combina amplitud y fase: 64-QAM tiene 64 símbolos posibles (6 bits por símbolo) y 1024-QAM, 10 bits. Cuantos más símbolos, más bits por símbolo, pero más cerca quedan unos de otros y más SNR hace falta para distinguirlos. Por eso el wifi baja de velocidad cuando te alejas del enrutador: cambia a modulaciones más robustas.
- **OFDM** divide el canal en muchas subportadoras estrechas, cada una con su propia modulación; resiste bien los ecos. La usan el wifi, 4G y 5G.

## Medios de transmisión
| Medio | Características | Uso típico |
| Par trenzado (Cat 5e, 6, 6A) | barato, hasta 100 m por tramo; 1 a 10 Gbps | redes de oficina |
| Coaxial | más inmune al ruido | televisión por cable e Internet por cable |
| Fibra óptica | luz por vidrio; inmune a interferencias, decenas de km sin repetidor y terabits con varias longitudes de onda | troncales, centros de datos, fibra hasta el hogar |
| Radio | sin cables, compartido, con interferencias | wifi, telefonía móvil, satélite |
Las comunicaciones entre continentes viajan por **cables submarinos** de fibra, y en el Perú varios llegan a la costa de Lima; los satélites de órbita baja (como Starlink) ofrecen latencias de unas decenas de milisegundos, mucho menores que los geoestacionarios, cuyo RTT supera el medio segundo por los 36 000 km de altura.

## Lo difícil de lo inalámbrico
Un enlace por radio no es un cable invisible:
- **Atenuación:** la potencia cae con la distancia (con el cuadrado en el espacio libre, y más rápido con obstáculos).
- **Interferencia** de otras redes en la misma frecuencia (la banda de 2.4 GHz está saturada; 5 y 6 GHz tienen más canales).
- **Propagación multitrayecto:** la señal rebota en paredes y vehículos y llega varias veces con desfase.
- **Terminal oculto:** A y C están en rango de B, pero no se oyen entre sí; ambos creen que el canal está libre y sus transmisiones chocan en B.
Por eso las redes inalámbricas tienen tasas de error mucho mayores y hacen retransmisiones en la propia capa de enlace.

## Wifi (IEEE 802.11)
- Los equipos se asocian a un **punto de acceso** que les anuncia su red con tramas de baliza.
- Como un equipo de radio no puede escuchar mientras transmite, no se puede detectar colisiones como en Ethernet: el wifi usa **CSMA/CA** (evitación de colisiones): escuchar, esperar un tiempo aleatorio y transmitir la trama completa; el receptor responde con un **ACK**, y si no llega, se retransmite con una espera mayor.
- Opcionalmente, el intercambio **RTS/CTS** reserva el canal: el emisor pide permiso con un mensaje corto y el punto de acceso responde "despejado" a todos, lo que mitiga el terminal oculto.
- Generaciones: Wi-Fi 4 (802.11n, 2009), Wi-Fi 5 (802.11ac, 2013), Wi-Fi 6 (802.11ax, 2019, con OFDMA para atender a muchos dispositivos a la vez) y Wi-Fi 7 (802.11be, 2024).

## Redes celulares
Las redes móviles dividen el territorio en **celdas**, cada una servida por una estación base, y reutilizan las frecuencias en celdas no vecinas. Cuando te mueves, la red hace un **traspaso** (*handover*) a la celda siguiente sin cortar la conexión. 4G LTE introdujo una red completamente basada en IP; **5G** (normas del 3GPP desde 2018) agrega bandas nuevas, incluidas ondas milimétricas de muy alta capacidad y corto alcance, y modos de baja latencia y de muchos dispositivos de bajo consumo, útiles para la Internet de las cosas.

## Movilidad
Cuando un equipo cambia de red, cambia su dirección IP, y las conexiones TCP abiertas (identificadas por la cuádrupla) se rompen. Hay tres enfoques:
- **IP móvil** (RFC 5944): un agente en la red de origen redirige el tráfico a la dirección actual del equipo; existe pero se usa poco.
- **Movilidad en la red celular:** la red mantiene la misma dirección y redirige internamente el tráfico entre estaciones base durante los traspasos; por eso una llamada no se corta al viajar.
- **Movilidad en el transporte:** QUIC identifica las conexiones con un identificador propio en lugar de la cuádrupla, de modo que un teléfono puede pasar del wifi a los datos móviles sin reabrir la conexión.
Para las aplicaciones, la lección práctica es diseñar para la desconexión: reintentar, reanudar transferencias por partes y no suponer que la red estará siempre.

## Ejemplo resuelto: el wifi del patio
Los inspectores de PatioApp suben fotos de 2 MB desde cualquier punto de un patio de 200 × 100 metros al aire libre, con vehículos que reflejan la señal. Se planifican cuatro puntos de acceso exteriores en la banda de 5 GHz con canales que no se solapan. En el borde de cobertura se mide una SNR de 15 dB en un canal de 40 MHz: el límite de Shannon es 40 × 10⁶ × log₂(1 + 31.6) ≈ 201 Mbps; en la práctica se obtiene una fracción, por ejemplo 60 Mbps, y una foto tarda unos 0.3 s. Si se usara un solo punto de acceso, en el extremo la SNR bajaría a unos 5 dB, la capacidad a unos 82 Mbps teóricos (y bastante menos reales) y muchos inspectores competirían por el mismo canal. La aplicación además comprime las fotos y las sube en segundo plano con reintentos, porque en radio las pérdidas son normales.`,
  links: [['red.link', 'las tramas de enlace viajan sobre las señales de la capa física'], ['plat.mobile', 'las apps móviles deben convivir con redes inalámbricas variables'], ['mat2.calc', 'los logaritmos aparecen en las fórmulas de capacidad y de decibeles']],
  read: 'Kurose y Ross, capítulo 7 (Wireless and Mobile Networks); Tanenbaum, Feamster y Wetherall, capítulo 2; Shannon (1948).',
  terms: [
    ['Ancho de banda', 'rango de frecuencias que deja pasar un canal, medido en hercios', ['Un canal wifi de 20 MHz.', 'Una línea telefónica de unos 3000 Hz.', 'Junto con el ruido limita la capacidad.']],
    ['Teorema de Shannon', 'resultado que fija la capacidad máxima de un canal con ruido en B log₂(1 + S/N)', ['Ningún código puede superarla de forma confiable.', 'Shannon lo publicó en 1948.', 'Explica por qué el wifi es más lento lejos del enrutador.']],
    ['Relación señal a ruido', 'cociente entre la potencia de la señal y la del ruido, a menudo expresado en decibeles', ['30 dB equivalen a un cociente de 1000.', 'Baja con la distancia y los obstáculos.', 'Determina qué modulación se puede usar.']],
    ['Modulación QAM', 'técnica que codifica bits variando a la vez la amplitud y la fase de una portadora', ['64-QAM lleva 6 bits por símbolo.', 'Exige más SNR cuantos más símbolos usa.', 'La usan wifi, 4G y 5G.']],
    ['Propagación multitrayecto', 'llegada de una señal de radio por varios caminos con distintos retardos tras rebotar en objetos', ['Los vehículos del patio reflejan la señal.', 'Provoca interferencia entre símbolos.', 'OFDM la tolera bien.']],
    ['Terminal oculto', 'situación en que dos emisores no se oyen entre sí pero sus señales chocan en un receptor común', ['Dos inspectores en extremos opuestos del patio.', 'Hace fallar a CSMA.', 'RTS/CTS lo mitiga.']],
    ['CSMA/CA', 'acceso al medio del wifi que escucha, espera un tiempo aleatorio, transmite y espera confirmación', ['No puede detectar colisiones mientras transmite.', 'Usa ACK en la capa de enlace.', 'Retransmite con esperas crecientes.']],
    ['Traspaso', 'paso de una conexión móvil de una celda o punto de acceso a otro sin cortarla', ['Al moverte en un auto, cambias de antena.', 'La red celular lo coordina.', 'Debe ser rápido para no cortar llamadas.']]
  ],
  q: [
    ['¿Cuál es la capacidad de Shannon de un canal de 3000 Hz con SNR de 30 dB?', 'Unos 30 kbps', ['Unos 3 kbps', 'Unos 300 kbps', '90 kbps'], '3000 × log₂(1001) ≈ 29 900 bps.', 3],
    ['¿Qué cociente S/N corresponde a 20 dB?', '100', ['20', '10', '1000'], '10^(20/10).', 2],
    ['Según Nyquist, ¿cuántos bps caben en un canal sin ruido de 4000 Hz con 8 niveles?', '24 000', ['8000', '32 000', '12 000'], '2 × 4000 × log₂ 8 = 2 × 4000 × 3.', 3],
    ['¿Cuántos bits por símbolo transporta 256-QAM?', '8', ['256', '16', '4'], 'log₂ 256 = 8.', 2],
    ['¿Por qué el wifi no usa detección de colisiones como el Ethernet antiguo?', 'Porque un equipo de radio no puede escuchar bien mientras transmite y existen terminales ocultos', ['Porque no hay colisiones en el aire', 'Porque usa fibra', 'Porque el CRC lo impide'], 'Por eso usa CSMA/CA con ACK.', 3],
    ['¿Por qué un satélite geoestacionario tiene mucha latencia?', 'Porque está a unos 36 000 km y la señal sube y baja en cada sentido', ['Porque usa cobre', 'Porque tiene poco ancho de banda', 'Porque comprime los datos'], 'El RTT supera el medio segundo.', 2],
    ['Al alejarse del punto de acceso, el wifi baja de velocidad porque…', 'cae la SNR y se usan modulaciones con menos bits por símbolo', ['el enrutador lo castiga', 'aumenta el ancho de banda', 'cambia de IPv4 a IPv6'], 'Se protege la confiabilidad a costa de la tasa.', 3],
    { tf: 'Duplicar el ancho de banda de un canal duplica su capacidad de Shannon si la SNR no cambia.', v: true, e: 'C es proporcional a B.', l: 3 },
    { tf: 'La fibra óptica es más sensible a la interferencia electromagnética que el cobre.', v: false, e: 'La luz en el vidrio es inmune a esas interferencias.', l: 1 },
    { c: 'Escribe «capacidadShannon(B, snrDb)» en bps, redondeada al entero más cercano.', f: 'capacidadShannon', p: ['B', 'snrDb'], t: [[[3000, 30], 29902], [[20000000, 20], 133164230], [[1000000, 0], 1000000]], sol: '  return Math.round(B * Math.log2(1 + Math.pow(10, snrDb / 10)));', l: 2 },
    { c: 'Escribe «capacidadNyquist(B, M)» = 2·B·log₂ M.', f: 'capacidadNyquist', p: ['B', 'M'], t: [[[3000, 2], 6000], [[3000, 16], 24000], [[1000000, 4], 4000000]], sol: '  return 2 * B * Math.log2(M);', l: 1 },
    { c: 'Escribe «dbARazon(db)» = 10^(db/10), redondeado a 2 decimales.', f: 'dbARazon', p: ['db'], t: [[[30], 1000], [[3], 2], [[20], 100], [[0], 1]], sol: '  return Math.round(Math.pow(10, db / 10) * 100) / 100;', l: 1 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var B = R.pick([3000, 1e6, 20e6, 40e6]), db = R.pick([0, 10, 15, 20, 25, 30]), c = B * Math.log2(1 + Math.pow(10, db / 10)); g.input(3, '¿Cuál es la capacidad de Shannon en Mbps de un canal de ' + (B / 1e6) + ' MHz con SNR de ' + db + ' dB? Redondea a 2 decimales.', (c / 1e6).toFixed(2), 'B·log₂(1 + 10^(dB/10)).'); });
    g.times(6, function (R) { var B = R.pick([1000, 3000, 4000, 1e6]), M = R.pick([2, 4, 8, 16, 64]); g.input(2, 'Según Nyquist, ¿cuántos bps caben en un canal sin ruido de ' + B + ' Hz con ' + M + ' niveles?', 2 * B * Math.log2(M), '2·B·log₂ M.'); });
    g.times(5, function (R) { var db = R.pick([10, 20, 30, 40, 50]); g.input(2, '¿Qué cociente S/N corresponde a ' + db + ' dB?', Math.pow(10, db / 10), '10^(dB/10).'); });
    var med = [['Troncal de 40 km sin repetidores', 'Fibra óptica'], ['Puestos de una oficina a menos de 100 m', 'Par trenzado'], ['Tablets de inspectores que se mueven por el patio', 'Radio'], ['Internet por la red de televisión por cable', 'Coaxial']];
    med.forEach(function (m) { g.mcq(2, '¿Qué medio conviene? ' + m[0], m[1], ['Fibra óptica', 'Par trenzado', 'Radio', 'Coaxial'].filter(function (x) { return x !== m[1]; }), 'Cada medio tiene alcance, costo y movilidad distintos.'); });
  },
  checks: [
    ['Diferencia ancho de banda y tasa de bits.', 'El ancho de banda es el rango de frecuencias en hercios; la tasa de bits es cuántos bits por segundo se transmiten, y depende del ancho de banda, la modulación y el ruido.'],
    ['¿Qué dicen los teoremas de Nyquist y de Shannon?', 'Nyquist: sin ruido, C = 2B log₂ M; Shannon: con ruido, la capacidad máxima confiable es B log₂(1 + S/N).'],
    ['Calcula la capacidad de un canal de 1 MHz con 20 dB de SNR.', 'S/N = 100; C = 10⁶ × log₂ 101 ≈ 6.66 Mbps.'],
    ['¿Qué problemas tienen los enlaces inalámbricos que no tienen los cables?', 'Atenuación con la distancia, interferencias, propagación multitrayecto y terminales ocultos, con más errores y retransmisiones.'],
    ['¿Cómo mitiga RTS/CTS el problema del terminal oculto?', 'El emisor pide permiso con un mensaje corto y el punto de acceso responde a todos que el canal está reservado, de modo que los terminales que no oyen al emisor sí oyen la reserva.']
  ],
  cites: ['Shannon, C. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal*, 27(3).', 'Nyquist, H. (1928). Certain Topics in Telegraph Transmission Theory. *Transactions of the AIEE*, 47(2).', 'Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 7.', 'Tanenbaum, A., Feamster, N. y Wetherall, D. (2021). *Computer Networks* (6.ª ed.), capítulo 2. Pearson.', 'IEEE (2021). *IEEE Std 802.11ax-2021*.'],
  project: { t: 'Mapa de cobertura wifi',
    goal: 'Medir y modelar una red inalámbrica real.',
    steps: ['Con una aplicación de análisis wifi, mide la intensidad de señal y la SNR en una cuadrícula de puntos de tu casa, colegio u oficina.', 'Mide en esos puntos la velocidad real con una prueba de velocidad y compárala con la capacidad de Shannon estimada.', 'Identifica los canales usados por redes vecinas y elige el menos congestionado.', 'Dibuja un mapa de calor de cobertura y propón dónde ubicar un segundo punto de acceso.', 'Escribe un informe con las mediciones y la propuesta.'],
    deliver: 'Las mediciones, el mapa y el informe.' },
  hito: ['Planifica la cobertura wifi del patio de PatioApp: cantidad y ubicación de puntos de acceso, banda y canales, con la capacidad estimada en el borde.', 'Haz que la app de inspección de PatioApp comprima las fotos y las suba en segundo plano con reintentos cuando la señal es débil, y mide el tiempo de subida en el borde de cobertura.']
});

S('red', 'red.sec', { title: 'Seguridad en redes: TLS, cortafuegos y VPN',
  ask: '¿Qué concepto de seguridad en redes se aplica?',
  lesson: `
> **La idea en simple.** Enviar datos por Internet es como mandar una postal: cualquier cartero del camino puede leerla, cambiarla o fingir que la escribió otra persona. La seguridad en redes convierte la postal en una caja fuerte cerrada con un candado que solo el destinatario puede abrir, con un sello que delata cualquier manipulación y con una credencial que demuestra quién la envió.

## Qué se quiere proteger
Los objetivos clásicos son:
- **Confidencialidad:** solo el destinatario entiende el mensaje.
- **Integridad:** cualquier modificación se detecta.
- **Autenticación:** cada extremo sabe con quién habla.
- **Disponibilidad:** el servicio sigue funcionando pese a los ataques.
Kurose y Ross ilustran las amenazas con Alicia, Beto y Trudy, la intrusa que puede **escuchar** (*sniffing*), **suplantar** direcciones (*spoofing*), **insertar o modificar** mensajes, **colocarse en medio** de la comunicación (*man-in-the-middle*) o **negar el servicio**.

## Las piezas criptográficas
Las conociste en el curso de seguridad; aquí importa cómo se combinan en la red:
- **Cifrado simétrico** (AES, ChaCha20): rápido, con una clave compartida.
- **Criptografía de clave pública** (RSA, curvas elípticas): permite acordar claves y firmar sin compartir un secreto previo.
- **Funciones hash** (SHA-256) y **códigos de autenticación de mensajes** (HMAC): integridad.
- **Firmas digitales y certificados:** una **autoridad de certificación** firma un certificado que asocia un nombre de dominio con una clave pública; el navegador confía en un conjunto de autoridades raíz.

## Acuerdo de claves de Diffie-Hellman
Whitfield Diffie y Martin Hellman publicaron en 1976 *New Directions in Cryptography*, que permitió por primera vez que dos partes que nunca se vieron acuerden una clave secreta por un canal público. Con un primo p y un generador g públicos:
1. Alicia elige un secreto a y envía A = gᵃ mod p.
2. Beto elige un secreto b y envía B = gᵇ mod p.
3. Alicia calcula Bᵃ mod p y Beto calcula Aᵇ mod p; ambos obtienen g^(ab) mod p.
Quien escucha ve p, g, A y B, pero calcular a a partir de A (el **logaritmo discreto**) es inviable con números de miles de bits. Ojo: Diffie-Hellman solo no autentica: Trudy podría hacer un acuerdo con cada uno y quedar en medio. Por eso en TLS se firma con el certificado del servidor. Diffie y Hellman recibieron el Premio Turing en 2015.
~~~js
const potMod = (b, e, m) => { let r = 1n; b = BigInt(b) % BigInt(m); e = BigInt(e); m = BigInt(m);
  while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
const p = 23, g = 5, a = 6, b = 15;                     // números diminutos, solo para ver la idea
const A = potMod(g, a, p), B = potMod(g, b, p);
console.log('Alicia envía', A, '· Beto envía', B);
console.log('clave de Alicia', potMod(B, a, p), '· clave de Beto', potMod(A, b, p));
~~~

## TLS: la seguridad de la web
TLS (heredero del SSL que Netscape creó a mediados de los 90) protege HTTPS, el correo, las API y casi todo lo que viaja por Internet. **TLS 1.3** (RFC 8446, 2018) simplificó y endureció el protocolo:
1. El cliente envía un saludo con las versiones y algoritmos que admite y su parte de un acuerdo Diffie-Hellman **efímero** (claves nuevas en cada conexión).
2. El servidor responde con su parte del acuerdo, su **certificado** y una firma que prueba que tiene la clave privada del certificado.
3. Ambos derivan las claves de sesión; desde aquí todo va cifrado y autenticado con algoritmos AEAD (como AES-GCM).
Todo eso cuesta **un solo RTT** (TLS 1.2 necesitaba dos). Como las claves de sesión son efímeras, el protocolo da **secreto hacia adelante**: aunque mañana roben la clave privada del servidor, no podrán descifrar las conversaciones grabadas hoy. TLS 1.3 eliminó algoritmos débiles y el intercambio de claves con RSA estático. La masificación llegó con **Let's Encrypt** (operativa desde 2016), que emite certificados gratuitos y automáticos.

## Seguridad en otras capas
- **Capa de red, IPsec:** cifra y autentica datagramas IP; se usa sobre todo para **VPN** entre sedes.
- **VPN modernas:** **WireGuard** (Jason Donenfeld, 2017; incorporado al núcleo Linux en 2020) usa pocas líneas de código y criptografía moderna fija, lo que lo hace fácil de auditar.
- **Wifi:** el cifrado **WEP** fue roto en 2001 (Scott Fluhrer, Itsik Mantin y Adi Shamir). WPA2 (2004) fue el estándar hasta que el ataque **KRACK** de Mathy Vanhoef (2017) mostró fallas en su saludo; **WPA3** (2018) las corrige. En redes empresariales se usa 802.1X con credenciales por usuario.
- **DNS:** DNSSEC firma las respuestas; DNS sobre HTTPS o sobre TLS las cifra.

## Cortafuegos y detección de intrusos
Un **cortafuegos** controla qué tráfico pasa entre redes:
- **Filtro de paquetes sin estado:** reglas sobre direcciones, puertos y protocolos, evaluadas en orden; la primera que coincide decide. La política segura es **denegar por defecto** y permitir solo lo necesario.
- **Con estado:** recuerda las conexiones establecidas y deja pasar las respuestas sin reglas extra.
- **Pasarelas de aplicación:** entienden el protocolo (por ejemplo, un cortafuegos de aplicaciones web que bloquea inyecciones SQL).
Los **sistemas de detección de intrusos** (como Snort, de Martin Roesch, 1998) inspeccionan el contenido de los paquetes en busca de firmas de ataques conocidos o comportamientos anómalos.

## Denegación de servicio
Un ataque de **denegación de servicio distribuida** (DDoS) inunda a la víctima con tráfico desde miles de equipos. En octubre de 2016, la botnet **Mirai**, formada por cámaras y enrutadores domésticos con contraseñas por defecto, atacó al proveedor de DNS Dyn y dejó inaccesibles durante horas a sitios como Twitter, Netflix y Reddit en buena parte de Estados Unidos y Europa. Defensas: limitar la tasa de peticiones, filtrar en el proveedor, servicios de mitigación con gran capacidad (CDN) y, sobre todo, no dejar dispositivos con credenciales por defecto.

## Escaneo y superficie de ataque
Antes de atacar, un intruso **explora**: herramientas como Nmap (Gordon Lyon, 1997) prueban qué puertos responden en cada equipo y qué servicios y versiones corren. Cada puerto abierto es parte de la **superficie de ataque**. Por eso las auditorías empiezan por la misma pregunta que se haría un atacante: ¿qué está expuesto que no debería estarlo? Una base de datos o un panel de administración accesibles desde Internet son hallazgos frecuentes y graves; escanear periódicamente tus propios sistemas (y solo los tuyos, con autorización) permite encontrarlos antes que otros. También conviene registrar y vigilar los intentos de conexión rechazados, porque un aumento repentino suele anticipar un ataque.

## Confianza cero
El modelo tradicional confiaba en todo lo que estaba "dentro" del perímetro. Google describió en 2014 su enfoque **BeyondCorp**: no confiar en la red, sino autenticar y autorizar cada petición según la identidad del usuario y el estado del dispositivo, esté donde esté. Es el núcleo de las arquitecturas de **confianza cero**.

## Ejemplo resuelto: proteger la red de PatioApp
- Todo el tráfico de la aplicación usa **HTTPS con TLS 1.3** y certificados automáticos de Let's Encrypt; se activa HSTS para que el navegador nunca use HTTP.
- El cortafuegos del servidor **deniega por defecto** y solo permite el puerto 443 desde Internet y el 22 (SSH) desde la VPN de administración.
- Los sensores del patio se conectan al servidor por una **VPN WireGuard**, y sus credenciales por defecto se cambian antes de instalarlos (la lección de Mirai).
- El wifi de invitados usa WPA3 y una VLAN sin acceso a las cámaras ni a los sensores.
- El acceso de los empleados se verifica por identidad (confianza cero), no por estar conectados a la red de la oficina.
- Cada trimestre se escanean los puertos expuestos de los servidores de PatioApp desde fuera para confirmar que solo responde el 443, y los registros del cortafuegos alimentan una alerta ante picos de conexiones rechazadas.`,
  links: [['m16.crypto', 'el cifrado, los hashes y las firmas se estudian en el curso de seguridad'], ['red.app', 'HTTPS es HTTP sobre TLS'], ['red.link', 'las VLAN y la inspección de ARP refuerzan la seguridad en la red local']],
  read: 'Kurose y Ross, capítulo 8; RFC 8446 (TLS 1.3); Diffie y Hellman (1976); Rescorla, *SSL and TLS*.',
  terms: [
    ['Ataque de intermediario', 'ataque en que el intruso se interpone entre dos partes y lee o modifica lo que se envían', ['Un punto de acceso falso en un aeropuerto.', 'El envenenamiento de ARP lo permite.', 'TLS con certificados lo impide.']],
    ['Diffie-Hellman', 'protocolo que permite a dos partes acordar una clave secreta a través de un canal público', ['Cada parte envía g elevado a su secreto módulo p.', 'Se basa en la dificultad del logaritmo discreto.', 'Sin autenticación es vulnerable a un intermediario.']],
    ['TLS 1.3', 'versión actual del protocolo de seguridad de transporte, con saludo de un RTT y secreto hacia adelante', ['Protege HTTPS.', 'Usa Diffie-Hellman efímero.', 'Se publicó como RFC 8446 en 2018.']],
    ['Secreto hacia adelante', 'propiedad por la que el robo futuro de una clave a largo plazo no permite descifrar sesiones pasadas', ['Las claves de sesión son efímeras.', 'TLS 1.3 la garantiza siempre.', 'Protege conversaciones grabadas.']],
    ['Certificado digital', 'documento firmado por una autoridad de certificación que asocia una identidad con una clave pública', ['El navegador verifica el de patioapp.pe.', 'Let’s Encrypt los emite gratis.', 'Tiene fecha de vencimiento.']],
    ['Cortafuegos con estado', 'filtro que recuerda las conexiones establecidas y permite sus respuestas automáticamente', ['Deja pasar la respuesta de una petición saliente.', 'Bloquea conexiones entrantes no solicitadas.', 'Es más seguro que un filtro sin estado.']],
    ['VPN', 'túnel cifrado que conecta un equipo o una red con otra red a través de Internet', ['Los sensores llegan al servidor por WireGuard.', 'IPsec es otra tecnología de VPN.', 'Protege tráfico en redes no confiables.']],
    ['Confianza cero', 'enfoque que no confía en la ubicación de red y verifica identidad y dispositivo en cada acceso', ['BeyondCorp de Google.', 'Estar en la oficina no da acceso automático.', 'Se combina con autenticación fuerte.']]
  ],
  q: [
    ['¿Qué objetivo de seguridad protege una función HMAC?', 'La integridad y la autenticación del mensaje', ['La disponibilidad', 'La confidencialidad', 'La velocidad'], 'Detecta modificaciones y prueba quién la generó.', 2],
    ['Con p = 23, g = 5 y secretos a = 4 y b = 3, ¿cuál es la clave compartida de Diffie-Hellman?', '18', ['4', '10', '2'], 'A = 5⁴ mod 23 = 4; clave = 4³ mod 23 = 64 mod 23 = 18.', 4],
    ['¿Por qué Diffie-Hellman sin autenticación es vulnerable?', 'Porque un intermediario puede hacer un acuerdo distinto con cada parte', ['Porque las claves son cortas', 'Porque usa UDP', 'Porque no es matemáticamente sólido'], 'TLS lo autentica con el certificado del servidor.', 3],
    ['¿Cuántos RTT cuesta el saludo completo de TLS 1.3?', '1', ['2', '3', '0 siempre'], 'TLS 1.2 necesitaba 2.', 2],
    ['¿Qué garantiza el secreto hacia adelante?', 'Que robar la clave privada del servidor en el futuro no permita descifrar sesiones pasadas', ['Que las sesiones nunca expiran', 'Que no hacen falta certificados', 'Que el tráfico no puede bloquearse'], 'Las claves de sesión son efímeras.', 3],
    ['¿Qué política deben seguir las reglas de un cortafuegos?', 'Denegar por defecto y permitir solo lo necesario', ['Permitir todo y bloquear lo que dé problemas', 'Bloquear solo el puerto 80', 'Permitir todo lo interno'], 'Es el principio de valores por defecto seguros.', 2],
    ['¿Qué hizo posible la botnet Mirai de 2016?', 'Dispositivos de Internet de las cosas con contraseñas por defecto', ['Un error de TLS', 'Un fallo de BGP', 'Una vulnerabilidad de IPv6'], 'Atacó al proveedor de DNS Dyn.', 3],
    { tf: 'TLS 1.3 eliminó el intercambio de claves con RSA estático.', v: true, e: 'Solo admite acuerdos efímeros con secreto hacia adelante.', l: 3 },
    { tf: 'Estar conectado a la red de la oficina debería bastar para acceder a todos los sistemas internos.', v: false, e: 'El modelo de confianza cero verifica identidad y dispositivo en cada acceso.', l: 2 },
    { o: 'Ordena el saludo de TLS 1.3.', s: ['El cliente envía su saludo con su parte del acuerdo de claves', 'El servidor responde con su parte, su certificado y una firma', 'Ambos derivan las claves de sesión', 'Se intercambian los datos cifrados'], e: 'Todo en un RTT.', l: 3 },
    { c: 'Escribe «claveDH(p, g, a, b)» que devuelva la clave compartida (g^b mod p)^a mod p usando exponenciación modular.', f: 'claveDH', p: ['p', 'g', 'a', 'b'], t: [[[23, 5, 4, 3], 18], [[23, 5, 6, 15], 2], [[11, 2, 7, 5], 10]], sol: '  const pot = (x, e) => { let r = 1; x %= p; while (e > 0) { if (e & 1) r = r * x % p; x = x * x % p; e >>= 1; } return r; };\n  return pot(pot(g, b), a);', l: 3 },
    { c: 'Escribe «decidir(reglas, paquete)»: cada regla es {accion, proto, puerto} donde proto y puerto pueden ser "*"; devuelve la acción de la primera regla que coincide, o "denegar" si ninguna coincide.', f: 'decidir', p: ['reglas', 'paquete'], t: [[[[{ accion: 'permitir', proto: 'tcp', puerto: 443 }, { accion: 'denegar', proto: '*', puerto: '*' }], { proto: 'tcp', puerto: 443 }], 'permitir'], [[[{ accion: 'permitir', proto: 'tcp', puerto: 443 }], { proto: 'tcp', puerto: 22 }], 'denegar'], [[[{ accion: 'denegar', proto: 'udp', puerto: '*' }, { accion: 'permitir', proto: '*', puerto: '*' }], { proto: 'udp', puerto: 53 }], 'denegar']], sol: '  for (const r of reglas) {\n    if ((r.proto === "*" || r.proto === paquete.proto) && (r.puerto === "*" || r.puerto === paquete.puerto)) return r.accion;\n  }\n  return "denegar";', l: 2 }
  ],
  gen: function (g) {
    function pm(b, e, m) { var r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; } return r; }
    g.times(6, function (R) { var p = R.pick([11, 13, 17, 23]), gg = R.pick([2, 3, 5]), a = R.int(2, 9); g.input(3, 'En Diffie-Hellman con p = ' + p + ' y g = ' + gg + ', Alicia elige a = ' + a + '. ¿Qué valor envía (g^a mod p)?', pm(gg, a, p), gg + '^' + a + ' mod ' + p + '.'); });
    var ob = [['Que nadie más que el destinatario entienda el mensaje', 'Confidencialidad'], ['Detectar si alguien cambió el mensaje', 'Integridad'], ['Saber que el servidor es realmente patioapp.pe', 'Autenticación'], ['Que el servicio siga funcionando durante un ataque', 'Disponibilidad']];
    ob.forEach(function (o) { g.mcq(1, '¿Qué objetivo de seguridad es este? ' + o[0], o[1], ['Confidencialidad', 'Integridad', 'Autenticación', 'Disponibilidad'].filter(function (x) { return x !== o[1]; }), 'Objetivos clásicos de la seguridad en redes.'); });
    var at = [['Alguien en el mismo wifi público captura el tráfico sin cifrar', 'Escucha'], ['Se envían paquetes con una dirección IP de origen falsa', 'Suplantación'], ['Miles de equipos inundan un servidor con peticiones', 'Denegación de servicio distribuida'], ['Un atacante responde por la IP del enrutador con su propia MAC', 'Intermediario mediante envenenamiento de ARP'], ['Un anuncio BGP falso desvía el tráfico de un banco', 'Secuestro de prefijo']];
    var as = at.map(function (a) { return a[1]; });
    at.forEach(function (a) { g.mcq(2, '¿Qué ataque describe esto? ' + a[0], a[1], g.R.sample(as.filter(function (x) { return x !== a[1]; }), 3), 'Amenazas típicas en redes.'); });
    var def = [['Cifrar todo el tráfico web', 'TLS 1.3'], ['Conectar sensores remotos de forma segura a un servidor', 'VPN'], ['Bloquear todo lo no permitido en la entrada de la red', 'Cortafuegos con denegación por defecto'], ['Verificar la identidad en cada acceso sin confiar en la red', 'Confianza cero']];
    def.forEach(function (d) { g.mcq(2, '¿Qué defensa corresponde? ' + d[0], d[1], ['TLS 1.3', 'VPN', 'Cortafuegos con denegación por defecto', 'Confianza cero'].filter(function (x) { return x !== d[1]; }), 'Defensas complementarias en distintas capas.'); });
  },
  checks: [
    ['Nombra los cuatro objetivos de seguridad y un mecanismo para cada uno.', 'Confidencialidad (cifrado), integridad (HMAC), autenticación (certificados y firmas) y disponibilidad (mitigación de DDoS y redundancia).'],
    ['Explica Diffie-Hellman y por qué hace falta autenticarlo.', 'Cada parte envía g elevado a su secreto módulo p y ambas calculan g^(ab); sin autenticación, un intermediario puede hacer un acuerdo con cada uno.'],
    ['¿Qué mejoró TLS 1.3 frente a TLS 1.2?', 'Saludo de un RTT, secreto hacia adelante obligatorio con Diffie-Hellman efímero y eliminación de algoritmos débiles y del intercambio RSA estático.'],
    ['¿Cómo configurarías el cortafuegos de un servidor web?', 'Denegar por defecto, permitir 443 desde Internet y el acceso de administración solo desde una VPN o direcciones concretas.'],
    ['¿Qué lecciones dejó la botnet Mirai?', 'Que los dispositivos con credenciales por defecto pueden convertirse en armas masivas; hay que cambiar credenciales, actualizar y aislar los dispositivos.']
  ],
  cites: ['Diffie, W. y Hellman, M. (1976). New Directions in Cryptography. *IEEE Transactions on Information Theory*, 22(6).', 'Rescorla, E. (2018). RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3. IETF.', 'Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 8.', 'Donenfeld, J. (2017). WireGuard: Next Generation Kernel Network Tunnel. *NDSS 2017*.', 'Vanhoef, M. y Piessens, F. (2017). Key Reinstallation Attacks: Forcing Nonce Reuse in WPA2. *ACM CCS 2017*.', 'Ward, R. y Beyer, B. (2014). BeyondCorp: A New Approach to Enterprise Security. *;login:*, 39(6).', 'Antonakakis, M. et al. (2017). Understanding the Mirai Botnet. *USENIX Security 2017*.'],
  project: { t: 'Auditoría de seguridad de red',
    goal: 'Auditar y endurecer la seguridad de red de un servicio.',
    steps: ['Captura con Wireshark un saludo TLS 1.3 y señala el acuerdo de claves, el certificado y el momento en que todo pasa a estar cifrado.', 'Analiza tu sitio o uno de prueba con una herramienta pública de configuración TLS y corrige lo que reporte.', 'Escribe las reglas de cortafuegos de un servidor con denegación por defecto y pruébalas con un escaneo de puertos autorizado sobre tu propio equipo.', 'Configura una VPN WireGuard entre dos equipos tuyos y verifica el cifrado con una captura.', 'Redacta un informe con los hallazgos y las correcciones.'],
    deliver: 'Las capturas, las reglas, la configuración de la VPN y el informe.' },
  hito: ['Asegura PatioApp con TLS 1.3, certificados automáticos, HSTS y un cortafuegos que deniega por defecto y solo permite 443 público y SSH por VPN.', 'Conecta los sensores del patio al servidor de PatioApp por una VPN WireGuard y documenta el cambio obligatorio de credenciales por defecto antes de instalar cada dispositivo.']
});
})();
