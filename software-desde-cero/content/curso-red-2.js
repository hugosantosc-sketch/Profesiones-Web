(function () {
var S = SDC.S;

S('red', 'red.cong', { title: 'Control de congestión y tiempos de espera en TCP',
  ask: '¿Qué concepto de control de congestión se aplica?',
  lesson: `
> **La idea en simple.** Si todos los autos de una ciudad salen a la vez por la misma avenida, nadie llega: el tráfico se atasca y cada auto avanza menos que si hubieran salido escalonados. Las redes sufren lo mismo. El control de congestión de TCP es un acuerdo tácito entre miles de millones de equipos: acelerar con prudencia cuando la vía parece libre y frenar en seco cuando aparecen señales de atasco.

## El colapso de 1986
En octubre de 1986, el enlace entre el Laboratorio Lawrence Berkeley y la Universidad de California en Berkeley, separados por unos cientos de metros, vio caer su rendimiento de 32 kbps a 40 bps: unas mil veces menos. Los equipos retransmitían agresivamente cada vez que un paquete se demoraba, esas retransmisiones llenaban las colas, más paquetes se perdían y más retransmisiones se generaban: un **colapso por congestión**, en el que la red trabaja a tope transportando copias inútiles. Van Jacobson analizó el problema y publicó en 1988 *Congestion Avoidance and Control*, con los mecanismos que TCP usa desde entonces. Ese artículo es una de las razones por las que Internet sigue funcionando con miles de millones de usuarios.

## Control de flujo frente a control de congestión
- El **control de flujo** protege al **receptor**: la ventana de recepción evita desbordar su búfer.
- El **control de congestión** protege a la **red**: el emisor limita cuánto envía según lo que deduce del estado de los enlaces, que no puede ver.
El emisor TCP mantiene una **ventana de congestión** (cwnd) y nunca tiene sin confirmar más que el mínimo entre cwnd y la ventana de recepción. Como envía aproximadamente una ventana por RTT, su tasa es de unos **cwnd / RTT** bytes por segundo. La señal de congestión clásica es la **pérdida**: un temporizador vencido o tres ACK duplicados.

## Arranque lento
Al comenzar una conexión, el emisor no sabe cuánta capacidad hay. Con **arranque lento** (*slow start*), cwnd empieza pequeña (históricamente 1 MSS; hoy se permite hasta 10 MSS, según el RFC 6928) y crece en 1 MSS por cada ACK recibido, lo que la **duplica cada RTT**: crecimiento exponencial. El nombre es engañoso: es lento solo al principio. Termina cuando cwnd alcanza el **umbral** (ssthresh) o cuando hay una pérdida.

## Aumento aditivo, disminución multiplicativa
Superado el umbral, TCP entra en **evitación de congestión**: cwnd crece solo **1 MSS por RTT** (aumento aditivo), tanteando con cuidado. Ante una pérdida, TCP Reno reacciona según la señal:
- **Tres ACK duplicados:** la red sigue entregando paquetes, así que la congestión es leve. Se hace ssthresh = cwnd/2 y cwnd = ssthresh + 3 (**recuperación rápida**), y se sigue con aumento aditivo.
- **Temporizador vencido:** señal grave. ssthresh = cwnd/2 y cwnd vuelve a 1 MSS, con arranque lento.
El resultado es el famoso **diente de sierra** de AIMD (*additive increase, multiplicative decrease*). Dah-Ming Chiu y Raj Jain demostraron en 1989 que AIMD hace que varios flujos que comparten un enlace converjan a un reparto **equitativo**: cada recorte a la mitad quita más al que más tiene, y el aumento lineal es igual para todos.
~~~js
// Ventana de congestión de TCP Reno ronda por ronda (en MSS)
let cwnd = 1, ssthresh = 16;
const eventos = { 8: '3dup', 14: 'timeout' };          // ronda en que ocurre cada pérdida
const serie = [];
for (let ronda = 1; ronda <= 20; ronda++) {
  serie.push(cwnd);
  const e = eventos[ronda];
  if (e === '3dup') { ssthresh = Math.max(2, Math.floor(cwnd / 2)); cwnd = ssthresh + 3; }
  else if (e === 'timeout') { ssthresh = Math.max(2, Math.floor(cwnd / 2)); cwnd = 1; }
  else cwnd = cwnd < ssthresh ? Math.min(cwnd * 2, ssthresh) : cwnd + 1;
}
console.log(serie.join(' '));
~~~

## Cuánto rinde TCP
Si la ventana oscila entre W/2 y W, el rendimiento promedio es de unos **0.75 W / RTT**. Matthew Mathis y sus coautores derivaron en 1997 una relación célebre entre rendimiento, RTT y tasa de pérdida p:
:::flow rendimiento ≈ 1.22 × MSS / (RTT × √p)
Consecuencias: el rendimiento de TCP cae con la distancia (RTT) y con la raíz de la pérdida. Para llenar un enlace de 10 Gbps con un RTT de 100 ms y segmentos de 1500 bytes, la tasa de pérdida tendría que ser de alrededor de 2 en 10 mil millones, algo irreal; por eso se crearon algoritmos más agresivos para redes rápidas y lejanas.

## Estimar el RTT y el temporizador
El temporizador de retransmisión debe ser un poco mayor que el RTT: si es corto, se retransmite sin necesidad; si es largo, se tarda en recuperar las pérdidas. Jacobson propuso estimar el promedio y la variación con medias móviles exponenciales, y el RFC 6298 fija el procedimiento:
:::flow DevRTT = 0.75 × DevRTT + 0.25 × |EstRTT − Muestra| | EstRTT = 0.875 × EstRTT + 0.125 × Muestra | Temporizador = EstRTT + 4 × DevRTT
(la desviación se actualiza primero, con la estimación anterior). El **algoritmo de Karn** (Phil Karn y Craig Partridge, 1987) indica no medir el RTT de segmentos retransmitidos, porque no se sabe a cuál envío corresponde el ACK, y duplicar el temporizador tras cada vencimiento (**espera exponencial**).

## Algoritmos modernos
- **CUBIC** (Sangtae Ha, Injong Rhee y Lisong Xu, 2008): la ventana crece según una función cúbica del tiempo desde la última pérdida, recuperando rápido la capacidad en redes de alto producto ancho de banda por retardo. Es el algoritmo por defecto de Linux desde 2006 y de Windows.
- **BBR** (Neal Cardwell y otros, Google, 2016): no usa la pérdida como señal principal; estima el ancho de banda del cuello de botella y el RTT mínimo, y envía a ese ritmo. Google reportó mejoras grandes de rendimiento y latencia en YouTube.
- **ECN** (notificación explícita de congestión, RFC 3168, 2001): los enrutadores marcan los paquetes en lugar de descartarlos cuando sus colas crecen, y el emisor reduce la ventana sin perder nada.
- **Bufferbloat:** Jim Gettys alertó en 2011 que los enrutadores domésticos con colas enormes retrasan los paquetes cientos de milisegundos antes de perder alguno, así que TCP tardaba en reaccionar y la latencia se disparaba. La gestión activa de colas, como **CoDel** (Kathleen Nichols y Van Jacobson, 2012), descarta o marca según el tiempo que los paquetes pasan en la cola.

## Tiempos de espera y reintentos en aplicaciones
Las aplicaciones repiten los errores de 1986 si reintentan sin cuidado. Las prácticas recomendadas imitan a TCP:
- **Tiempos de espera explícitos** en cada llamada de red, nunca infinitos.
- **Reintentos con espera exponencial** y **variación aleatoria** (*jitter*), para que miles de clientes no reintenten sincronizados.
- **Límite de reintentos** y presupuestos de reintento para no multiplicar la carga sobre un servicio que ya está saturado.

## Equidad y competencia entre flujos
La equidad de AIMD es por **conexión**, no por aplicación: un navegador que abre seis conexiones obtiene seis partes del cuello de botella. Por eso los protocolos nuevos deben ser **amigables con TCP**: no tomar más de lo que tomaría un flujo TCP en las mismas condiciones.

## Ejemplo resuelto: subir fotos desde el patio
La conexión del patio a la nube tiene 20 Mbps, un RTT de 80 ms y una pérdida de 0.01% por interferencias del radioenlace. Con la fórmula de Mathis y MSS de 1460 bytes: 1.22 × 11 680 bits / (0.08 s × 0.01) ≈ 17.8 Mbps, cerca de la capacidad. Pero si la pérdida sube a 1%, el rendimiento cae a unos 1.8 Mbps aunque el enlace siga siendo de 20 Mbps. La mejora no era contratar más ancho de banda, sino reducir la pérdida (mejorar el radioenlace) o usar BBR, que no interpreta cada pérdida aleatoria como congestión. Además, el cliente de PatioApp reintenta las subidas fallidas con esperas de 1, 2, 4 y 8 segundos más una variación aleatoria, y abandona tras cinco intentos.`,
  links: [['red.trans', 'el control de congestión completa la transferencia confiable de TCP'], ['red.intro', 'la congestión nace de las colas y pérdidas de los enrutadores'], ['m15.obs', 'los tiempos de espera y reintentos con espera exponencial son prácticas de operación']],
  read: 'Kurose y Ross, capítulo 3 (secciones 3.6 y 3.7); Jacobson (1988); RFC 5681 y 6298; Cardwell y otros (2016).',
  terms: [
    ['Ventana de congestión', 'límite que el emisor TCP se impone a los datos sin confirmar según su estimación del estado de la red', ['Su tamaño dividido por el RTT da la tasa de envío.', 'Se recorta a la mitad ante una pérdida.', 'Se combina con la ventana de recepción.']],
    ['Arranque lento', 'fase de TCP en la que la ventana de congestión se duplica en cada RTT hasta el umbral o una pérdida', ['Empieza con 1 a 10 MSS.', 'Es exponencial pese a su nombre.', 'Se reinicia tras un vencimiento del temporizador.']],
    ['AIMD', 'política de aumentar la ventana linealmente y reducirla multiplicativamente ante congestión', ['Produce el diente de sierra de TCP.', 'Chiu y Jain mostraron que lleva a un reparto equitativo.', 'Suma 1 MSS por RTT y divide entre 2 ante pérdida.']],
    ['Recuperación rápida', 'reacción de TCP Reno a tres ACK duplicados que reduce la ventana a la mitad sin volver al arranque lento', ['Evita caer a 1 MSS por una pérdida leve.', 'La red sigue entregando paquetes.', 'Se combina con la retransmisión rápida.']],
    ['Colapso por congestión', 'estado en que la red está ocupada transportando retransmisiones inútiles y el rendimiento útil se desploma', ['Ocurrió en octubre de 1986 en Berkeley.', 'El rendimiento cayó unas mil veces.', 'Jacobson lo resolvió con el control de congestión.']],
    ['Espera exponencial', 'estrategia de duplicar el tiempo de espera tras cada intento fallido', ['El temporizador de TCP se duplica tras cada vencimiento.', 'Los clientes reintentan a 1, 2, 4 y 8 segundos.', 'Se combina con una variación aleatoria.']],
    ['BBR', 'algoritmo de congestión que estima el ancho de banda del cuello de botella y el RTT mínimo en lugar de reaccionar a las pérdidas', ['Google lo publicó en 2016.', 'Rinde mejor con pérdidas aleatorias.', 'Envía al ritmo estimado del cuello de botella.']],
    ['Bufferbloat', 'latencia excesiva causada por colas demasiado grandes en los enrutadores', ['Una videollamada sufre mientras alguien descarga.', 'Gettys lo describió en 2011.', 'CoDel lo mitiga gestionando la cola por tiempo.']]
  ],
  q: [
    ['¿Qué protege el control de flujo y qué protege el control de congestión?', 'El flujo al receptor; la congestión a la red', ['Ambos protegen al receptor', 'El flujo a la red; la congestión al receptor', 'Ambos protegen al emisor'], 'Uno mira el búfer del receptor; el otro, los enlaces.', 2],
    ['En arranque lento con cwnd = 4 MSS y sin pérdidas ni umbral alcanzado, ¿cuánto vale cwnd tras dos RTT?', '16 MSS', ['6 MSS', '8 MSS', '32 MSS'], 'Se duplica cada RTT: 8 y luego 16.', 2],
    ['TCP Reno con cwnd = 20 recibe tres ACK duplicados. ¿Cuánto valen ssthresh y cwnd?', 'ssthresh = 10 y cwnd = 13', ['ssthresh = 10 y cwnd = 1', 'ssthresh = 20 y cwnd = 10', 'ssthresh = 5 y cwnd = 8'], 'Mitad y recuperación rápida (+3).', 3],
    ['Con la misma ventana (20), vence el temporizador. ¿Qué hace Reno?', 'ssthresh = 10 y cwnd = 1, y vuelve al arranque lento', ['ssthresh = 10 y cwnd = 13', 'Cierra la conexión', 'Mantiene la ventana'], 'El vencimiento es la señal más grave.', 3],
    ['Según la fórmula de Mathis, si la pérdida se multiplica por 4, ¿qué pasa con el rendimiento?', 'Se reduce a la mitad', ['Se reduce a la cuarta parte', 'No cambia', 'Se duplica'], 'Depende de 1/√p.', 4],
    ['EstRTT = 100 ms, DevRTT = 10 ms y llega una muestra de 140 ms. ¿Cuál es el nuevo temporizador según el RFC 6298?', '175 ms', ['140 ms', '145 ms', '200 ms'], 'Dev = 0.75·10 + 0.25·40 = 17.5; Est = 105; 105 + 4·17.5.', 4],
    ['¿Por qué el algoritmo de Karn no mide el RTT de segmentos retransmitidos?', 'Porque no se sabe si el ACK responde al envío original o a la retransmisión', ['Porque los retransmitidos son más rápidos', 'Porque TCP no los confirma', 'Para ahorrar memoria'], 'La medición sería ambigua.', 4],
    { tf: 'AIMD tiende a repartir el ancho de banda de forma equitativa entre flujos que comparten un enlace.', v: true, e: 'Chiu y Jain lo demostraron en 1989.', l: 3 },
    { tf: 'Aumentar mucho las colas de los enrutadores siempre mejora la experiencia de los usuarios.', v: false, e: 'Provoca bufferbloat: retrasos enormes antes de que TCP reaccione.', l: 2 },
    { c: 'Escribe «estimarRTT(est, dev, muestra)» según el RFC 6298 (primero dev con la estimación anterior, luego est) y devuelve [est, dev, temporizador] redondeados a 2 decimales.', f: 'estimarRTT', p: ['est', 'dev', 'muestra'], t: [[[100, 10, 140], [105, 17.5, 175]], [[100, 0, 100], [100, 0, 100]], [[200, 20, 120], [190, 35, 330]]], sol: '  const r = x => Math.round(x * 100) / 100;\n  const d = 0.75 * dev + 0.25 * Math.abs(est - muestra);\n  const e = 0.875 * est + 0.125 * muestra;\n  return [r(e), r(d), r(e + 4 * d)];', l: 3 },
    { c: 'Escribe «cwndTrasRondas(rondas, ssthresh)»: cwnd empieza en 1; en cada ronda, si cwnd < ssthresh se duplica sin pasar de ssthresh; si no, suma 1. Sin pérdidas.', f: 'cwndTrasRondas', p: ['rondas', 'ssthresh'], t: [[[0, 8], 1], [[3, 8], 8], [[5, 8], 10], [[4, 6], 7]], sol: '  let c = 1;\n  for (let i = 0; i < rondas; i++) c = c < ssthresh ? Math.min(c * 2, ssthresh) : c + 1;\n  return c;', l: 2 },
    { c: 'Escribe «reaccionReno(cwnd, evento)»: evento "3dup" o "timeout"; devuelve [ssthresh, cwnd] con ssthresh = max(⌊cwnd/2⌋, 2) y cwnd = ssthresh + 3 o 1, respectivamente.', f: 'reaccionReno', p: ['cwnd', 'evento'], t: [[[16, '3dup'], [8, 11]], [[16, 'timeout'], [8, 1]], [[3, 'timeout'], [2, 1]], [[20, '3dup'], [10, 13]]], sol: '  const s = Math.max(Math.floor(cwnd / 2), 2);\n  return [s, evento === "3dup" ? s + 3 : 1];', l: 2 },
    { c: 'Escribe «mathis(mssBytes, rttMs, p)» con el rendimiento aproximado en Mbps, 1.22·MSS·8 / (RTT·√p), redondeado a 2 decimales.', f: 'mathis', p: ['mssBytes', 'rttMs', 'p'], t: [[[1460, 100, 0.0001], 14.25], [[1460, 80, 0.0001], 17.81], [[1460, 80, 0.01], 1.78]], sol: '  return Math.round(1.22 * mssBytes * 8 / (rttMs / 1000 * Math.sqrt(p)) / 1e6 * 100) / 100;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var c = R.int(8, 60), e = R.pick(['tres ACK duplicados', 'un vencimiento del temporizador']), s = Math.max(Math.floor(c / 2), 2); g.input(3, 'TCP Reno tiene cwnd = ' + c + ' MSS y detecta ' + e + '. ¿Cuál es la nueva cwnd en MSS?', e === 'tres ACK duplicados' ? s + 3 : 1, 'ssthresh = ' + s + '; con tres ACK duplicados cwnd = ssthresh + 3; con vencimiento, 1.'); });
    g.times(6, function (R) { var r = R.int(1, 6), th = R.pick([8, 16, 32]), c = 1; for (var i = 0; i < r; i++) c = c < th ? Math.min(c * 2, th) : c + 1; g.input(2, 'cwnd empieza en 1 MSS con ssthresh = ' + th + '. Sin pérdidas, ¿cuánto vale tras ' + r + ' RTT (duplicando sin pasar el umbral y luego +1)?', c, 'Arranque lento y luego aumento aditivo.'); });
    g.times(6, function (R) { var est = R.pick([50, 100, 150]), dev = R.pick([5, 10, 20]), m = est + R.pick([-40, -20, 20, 40, 80]), d = 0.75 * dev + 0.25 * Math.abs(est - m), e = 0.875 * est + 0.125 * m; g.input(4, 'EstRTT = ' + est + ' ms, DevRTT = ' + dev + ' ms y llega una muestra de ' + m + ' ms. ¿Cuál es el nuevo temporizador en ms (RFC 6298)? Redondea a 2 decimales.', (e + 4 * d).toFixed(2), 'Dev = ' + d + ', Est = ' + e + ', temporizador = Est + 4·Dev.'); });
  },
  checks: [
    ['¿Qué ocurrió en el colapso por congestión de 1986 y qué lo resolvió?', 'Las retransmisiones agresivas llenaron las colas y el rendimiento cayó unas mil veces; Jacobson propuso arranque lento, AIMD y una mejor estimación del RTT.'],
    ['Describe cómo cambia la ventana de congestión en TCP Reno durante una conexión típica.', 'Crece exponencialmente en arranque lento hasta el umbral, luego linealmente; ante tres ACK duplicados se reduce a la mitad (+3) y ante un vencimiento vuelve a 1 MSS.'],
    ['¿Por qué AIMD es equitativo entre flujos?', 'Porque el recorte multiplicativo quita más al flujo que más tiene y el aumento aditivo es igual para todos, de modo que convergen al mismo reparto.'],
    ['Calcula el temporizador con EstRTT = 100, DevRTT = 10 y una muestra de 60.', 'Dev = 7.5 + 10 = 17.5; Est = 87.5 + 7.5 = 95; temporizador = 95 + 70 = 165 ms.'],
    ['¿Qué buenas prácticas de reintento deben imitar las aplicaciones?', 'Tiempos de espera explícitos, reintentos con espera exponencial y variación aleatoria, y un límite de reintentos.']
  ],
  cites: ['Jacobson, V. (1988). Congestion Avoidance and Control. *SIGCOMM 1988*.', 'Chiu, D.-M. y Jain, R. (1989). Analysis of the Increase and Decrease Algorithms for Congestion Avoidance in Computer Networks. *Computer Networks and ISDN Systems*, 17(1).', 'Mathis, M., Semke, J., Mahdavi, J. y Ott, T. (1997). The Macroscopic Behavior of the TCP Congestion Avoidance Algorithm. *ACM SIGCOMM Computer Communication Review*, 27(3).', 'Ha, S., Rhee, I. y Xu, L. (2008). CUBIC: A New TCP-Friendly High-Speed TCP Variant. *ACM SIGOPS Operating Systems Review*, 42(5).', 'Cardwell, N. et al. (2016). BBR: Congestion-Based Congestion Control. *ACM Queue*, 14(5).', 'Paxson, V., Allman, M., Chu, J. y Sargent, M. (2011). RFC 6298: Computing TCP’s Retransmission Timer. IETF.'],
  project: { t: 'Simulador del diente de sierra',
    goal: 'Simular y medir el control de congestión de TCP.',
    steps: ['Simula TCP Reno ronda a ronda con pérdidas configurables y grafica cwnd y ssthresh.', 'Simula dos flujos AIMD que comparten un enlace y muestra que convergen a un reparto equitativo.', 'Implementa la estimación del RTT del RFC 6298 sobre una serie de muestras y grafica la estimación y el temporizador.', 'En Linux, compara con iperf3 el rendimiento de CUBIC y BBR sobre un enlace con pérdida y retardo simulados con tc netem.', 'Explica los resultados con la fórmula de Mathis.'],
    deliver: 'El simulador, los gráficos, las mediciones con iperf3 y el informe.' },
  hito: ['Agrega a todas las llamadas de red de PatioApp tiempos de espera explícitos y reintentos con espera exponencial y variación aleatoria, con límite de intentos.', 'Mide el rendimiento de subida de fotos de PatioApp con distintas pérdidas simuladas y documenta qué algoritmo de congestión conviene en el servidor.']
});

S('red', 'red.net', { title: 'Capa de red: IP, direccionamiento y reenvío',
  ask: '¿Qué concepto de la capa de red se aplica?',
  lesson: `
> **La idea en simple.** Una dirección IP es como una dirección postal jerárquica: país, ciudad, calle y número. Una oficina de correos de Lima no necesita conocer cada casa de Tokio; le basta saber que todo lo que empieza por "Japón" sale por el avión de Asia. Los enrutadores hacen lo mismo con los **prefijos** de las direcciones: reenvían por la regla más específica que coincide.

## Reenvío y enrutamiento
La capa de red tiene dos funciones que conviene separar:
- **Reenvío** (plano de datos): dentro de un enrutador, mover cada datagrama del puerto de entrada al de salida correcto consultando la **tabla de reenvío**. Ocurre en nanosegundos, en hardware.
- **Enrutamiento** (plano de control): decidir, en toda la red, qué caminos seguirán los datagramas, y con eso llenar las tablas. Ocurre en segundos, en software (la siguiente unidad).
Un enrutador tiene **puertos de entrada**, una **estructura de conmutación** que los conecta y **puertos de salida** con colas. Si muchos paquetes van a la misma salida, se acumulan en su cola; si la cola se llena, se descartan.

## El datagrama IPv4
IPv4 (RFC 791, 1981) es un servicio de **mejor esfuerzo**: no garantiza entrega, orden ni tiempo. Su cabecera mínima de 20 bytes incluye:
- Versión y longitud de la cabecera.
- **TTL** (tiempo de vida): cada enrutador lo resta en 1 y descarta el datagrama si llega a 0, para que nada circule para siempre por un ciclo.
- **Protocolo** de la capa superior (6 = TCP, 17 = UDP).
- Suma de verificación de la cabecera.
- Direcciones de **origen** y **destino** de 32 bits.
- Campos de **fragmentación**: si un datagrama no cabe en el MTU de un enlace (1500 bytes en Ethernet), IPv4 puede partirlo y el destino lo rearma. Como fragmentar es costoso, hoy se prefiere descubrir el MTU del camino y no fragmentar.
El protocolo **ICMP** acompaña a IP para informar errores: «ping» usa sus mensajes de eco, y «traceroute» envía paquetes con TTL 1, 2, 3… para que cada enrutador del camino responda "TTL agotado" y se revele.

## Direcciones IPv4 y subredes
Una dirección IPv4 tiene 32 bits, escritos como cuatro números de 0 a 255 (por ejemplo, 192.168.1.130). Se divide en una parte de **red** y una de **equipo**. Con **CIDR** (*Classless Inter-Domain Routing*, 1993) la división se indica con un **prefijo**: en 192.168.1.130/26, los primeros 26 bits son la red. La **máscara** correspondiente es 255.255.255.192.
- **Dirección de red:** la dirección con los bits de equipo en 0 (se obtiene con un AND entre la IP y la máscara): 192.168.1.128.
- **Difusión:** los bits de equipo en 1: 192.168.1.191.
- **Equipos utilizables:** 2^(32 − prefijo) − 2 (se descuentan red y difusión): 2⁶ − 2 = 62.
Dos equipos están en la **misma subred** si sus direcciones coinciden en los bits del prefijo; entonces se hablan directamente por la capa de enlace, sin pasar por un enrutador.
~~~js
const aNum = ip => ip.split('.').reduce((n, o) => n * 256 + Number(o), 0);
const aTexto = n => [24, 16, 8, 0].map(s => Math.floor(n / 2 ** s) % 256).join('.');
function subred(ip, prefijo) {
  const tam = 2 ** (32 - prefijo), red = Math.floor(aNum(ip) / tam) * tam;
  return { red: aTexto(red) + '/' + prefijo, difusion: aTexto(red + tam - 1), utiles: tam - 2 };
}
console.log(subred('192.168.1.130', 26));
console.log(subred('10.20.30.40', 20));
~~~
Las **direcciones privadas** (10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16, según el RFC 1918) no se enrutan en Internet y se usan dentro de las organizaciones.

## Reenvío por coincidencia del prefijo más largo
La tabla de reenvío asocia prefijos con interfaces de salida. Si una dirección coincide con varios prefijos, se usa el **más largo** (el más específico). Con las entradas 200.23.16.0/21 → interfaz 0, 200.23.24.0/24 → interfaz 1, 200.23.24.0/21 → interfaz 2 y 0.0.0.0/0 → interfaz 3 (ruta por defecto), la dirección 200.23.24.170 coincide con el /24 y con el segundo /21, y sale por la 1. Gracias a la **agregación**, un proveedor anuncia un solo prefijo que cubre a todos sus clientes, y las tablas de Internet se mantienen manejables (aun así, la tabla global superó el millón de prefijos IPv4 en los últimos años). Los enrutadores hacen esta búsqueda en nanosegundos con memorias especiales (TCAM).

## DHCP y NAT
- **DHCP** (RFC 2131): un equipo que se conecta obtiene automáticamente su dirección, máscara, puerta de enlace y servidor DNS en cuatro mensajes: descubrimiento, oferta, solicitud y confirmación.
- **NAT** (traducción de direcciones): un enrutador doméstico o empresarial da direcciones privadas a los equipos internos y presenta hacia Internet una sola dirección pública, reescribiendo direcciones y puertos en cada paquete y recordando las correspondencias en una tabla. NAT alargó la vida de IPv4, pero rompe el principio de extremo a extremo: un equipo externo no puede iniciar una conexión hacia uno interno sin configuración extra.

## El fin de las direcciones IPv4 e IPv6
Con 32 bits hay unos 4300 millones de direcciones, y se agotaron: la IANA entregó sus últimos bloques en 2011, y LACNIC, el registro de América Latina y el Caribe al que pertenece el Perú, agotó su reserva en 2020. **IPv6** (RFC 8200) usa direcciones de **128 bits** (escritas en hexadecimal, como 2001:db8::1) y simplifica la cabecera a 40 bytes fijos: sin suma de verificación (la hacen otras capas) y sin fragmentación en los enrutadores. Los equipos pueden configurarse solos (SLAAC). La transición es lenta: conviven ambas versiones (**pila doble**) y, según las estadísticas de Google, más del 40% de sus usuarios ya llega por IPv6.

## Dentro de un enrutador
Un enrutador moderno reenvía cientos de millones de paquetes por segundo. Para lograrlo:
- Cada puerto de entrada tiene una **copia de la tabla de reenvío** y decide localmente la salida, sin consultar al procesador central (reenvío descentralizado).
- La **estructura de conmutación** puede ser memoria compartida, un bus o, en los equipos grandes, una red interna de interconexión que mueve varios paquetes en paralelo.
- Si la estructura es más lenta que la suma de las entradas, los paquetes esperan en la entrada y puede ocurrir **bloqueo de cabeza de línea**: un paquete cuya salida está ocupada detiene a los que vienen detrás aunque vayan a salidas libres.
- En las salidas, un **planificador de paquetes** decide el orden: FIFO, prioridades (por ejemplo, voz antes que descargas) o reparto equitativo ponderado entre clases de tráfico.
La regla práctica clásica para el tamaño de búfer era RTT × capacidad, pero Guido Appenzeller, Isaac Keslassy y Nick McKeown mostraron en 2004 que, con muchos flujos TCP, basta con RTT × capacidad / √N, mucho menos memoria.

## Reenvío generalizado
Las redes definidas por software generalizan el reenvío: en lugar de mirar solo el destino, un conmutador **OpenFlow** (Nick McKeown y otros, 2008) compara varios campos de cabecera (origen, puertos, protocolo) y aplica acciones (reenviar, descartar, modificar). Así un mismo equipo actúa como enrutador, cortafuegos o balanceador.

## Ejemplo resuelto: el plan de direcciones del patio
La sede de PatioApp recibe el bloque privado 10.50.0.0/22 (1024 direcciones) y necesita: oficina (60 equipos), cámaras (100), sensores (200) e invitados (100). Se asignan subredes de tamaño potencia de 2, de la mayor a la menor:
| Red | Prefijo | Rango útil | Equipos útiles |
| Sensores | 10.50.0.0/24 | 10.50.0.1 a 10.50.0.254 | 254 |
| Cámaras | 10.50.1.0/25 | 10.50.1.1 a 10.50.1.126 | 126 |
| Invitados | 10.50.1.128/25 | 10.50.1.129 a 10.50.1.254 | 126 |
| Oficina | 10.50.2.0/26 | 10.50.2.1 a 10.50.2.62 | 62 |
Queda libre 10.50.2.64 a 10.50.3.255 para crecer. Cada subred tendrá su propia VLAN, de modo que un problema en la red de invitados (por ejemplo, un equipo infectado) no llegue a las cámaras ni a la oficina, y las reglas del cortafuegos entre subredes definen quién puede hablar con quién. Hacia Internet sale todo por NAT con una dirección pública, y el servidor de PatioApp en la nube es accesible también por IPv6.`,
  links: [['red.route', 'el enrutamiento llena las tablas que usa el reenvío'], ['m1.bin', 'las máscaras y los prefijos son operaciones con bits'], ['red.link', 'dentro de una subred los equipos se comunican por la capa de enlace']],
  read: 'Kurose y Ross, capítulo 4; RFC 791 (IPv4), RFC 4632 (CIDR), RFC 1918 (direcciones privadas), RFC 8200 (IPv6).',
  terms: [
    ['Reenvío', 'acción local de un enrutador que mueve cada datagrama de la entrada a la salida según su tabla', ['Ocurre en nanosegundos en hardware.', 'Usa la coincidencia del prefijo más largo.', 'Es el plano de datos.']],
    ['TTL', 'campo de la cabecera IP que cada enrutador decrementa y que, al llegar a cero, provoca el descarte del datagrama', ['Evita que un paquete circule para siempre en un ciclo.', 'traceroute lo usa para descubrir la ruta.', 'En IPv6 se llama límite de saltos.']],
    ['Prefijo CIDR', 'notación que indica cuántos bits iniciales de una dirección forman la parte de red', ['En 192.168.1.0/24 la red son 24 bits.', 'Permite subredes de cualquier tamaño.', 'Se introdujo en 1993.']],
    ['Máscara de subred', 'número de 32 bits con unos en la parte de red y ceros en la de equipo', ['/26 equivale a 255.255.255.192.', 'El AND con la IP da la dirección de red.', 'Define el tamaño de la subred.']],
    ['Coincidencia del prefijo más largo', 'regla de reenvío que elige la entrada más específica que coincide con el destino', ['Un /24 gana sobre un /21 que también coincide.', 'La ruta 0.0.0.0/0 se usa si nada más coincide.', 'Permite agregar rutas.']],
    ['DHCP', 'protocolo que asigna automáticamente dirección, máscara, puerta de enlace y DNS a los equipos', ['Tu teléfono obtiene IP al conectarse al wifi.', 'Usa descubrimiento, oferta, solicitud y confirmación.', 'Evita configurar a mano cada equipo.']],
    ['NAT', 'traducción que permite a muchos equipos con direcciones privadas compartir una dirección pública', ['El enrutador de casa reescribe direcciones y puertos.', 'Alargó la vida de IPv4.', 'Dificulta las conexiones entrantes.']],
    ['IPv6', 'versión del protocolo IP con direcciones de 128 bits y cabecera fija simplificada', ['Una dirección como 2001:db8::1.', 'No fragmenta en los enrutadores.', 'Convive con IPv4 en pila doble.']]
  ],
  q: [
    ['¿Cuántos equipos utilizables tiene una subred /26?', '62', ['64', '30', '126'], '2⁶ − 2.', 2],
    ['¿Cuál es la dirección de red de 192.168.1.130/26?', '192.168.1.128', ['192.168.1.0', '192.168.1.130', '192.168.1.192'], '130 en binario es 10000010; los dos bits altos del último octeto dan 128.', 3],
    ['¿Qué máscara corresponde a /20?', '255.255.240.0', ['255.255.255.0', '255.255.0.0', '255.240.0.0'], '20 unos: 8 + 8 + 4.', 3],
    ['Tabla: 10.0.0.0/8 → A, 10.1.0.0/16 → B, 10.1.2.0/24 → C. ¿Por dónde sale 10.1.2.9?', 'C', ['A', 'B', 'Por la ruta por defecto'], 'Coincide con los tres; gana el prefijo más largo.', 3],
    ['¿Qué hace un enrutador cuando el TTL de un datagrama llega a 0?', 'Lo descarta y envía un mensaje ICMP de tiempo excedido', ['Lo reenvía igual', 'Lo devuelve al origen intacto', 'Lo fragmenta'], 'traceroute aprovecha esa respuesta.', 2],
    ['¿Cuál de estas es una dirección privada según el RFC 1918?', '172.20.5.9', ['8.8.8.8', '200.48.1.5', '172.40.1.1'], 'El bloque privado es 172.16.0.0/12 (de 172.16 a 172.31).', 3],
    ['¿Qué rompe NAT del principio de extremo a extremo?', 'Que un equipo externo no puede iniciar conexiones hacia uno interno sin configuración extra', ['Que cifra el tráfico', 'Que elimina el TTL', 'Que impide usar TCP'], 'Solo existen correspondencias para conexiones salientes.', 4],
    { tf: 'IPv6 elimina la suma de verificación de la cabecera y la fragmentación en los enrutadores.', v: true, e: 'Simplifica y acelera el reenvío.', l: 3 },
    { tf: 'Dos equipos en distinta subred pueden hablarse directamente por la capa de enlace sin un enrutador.', v: false, e: 'Necesitan un enrutador; dentro de la misma subred se comunican directamente.', l: 2 },
    { c: 'Escribe «direccionRed(ip, prefijo)» que devuelva la dirección de red como texto (por ejemplo, "192.168.1.128").', f: 'direccionRed', p: ['ip', 'prefijo'], t: [[['192.168.1.130', 26], '192.168.1.128'], [['10.0.5.77', 8], '10.0.0.0'], [['172.16.37.200', 20], '172.16.32.0'], [['200.48.1.5', 32], '200.48.1.5']], sol: '  const n = ip.split(".").reduce((a, o) => a * 256 + Number(o), 0);\n  const t = Math.pow(2, 32 - prefijo), r = Math.floor(n / t) * t;\n  return [24, 16, 8, 0].map(s => Math.floor(r / Math.pow(2, s)) % 256).join(".");', l: 3 },
    { c: 'Escribe «mismaSubred(a, b, prefijo)» que diga si dos direcciones IPv4 están en la misma subred.', f: 'mismaSubred', p: ['a', 'b', 'prefijo'], t: [[['192.168.1.10', '192.168.1.200', 24], true], [['192.168.1.10', '192.168.1.200', 25], false], [['10.1.2.3', '10.9.9.9', 8], true]], sol: '  const num = ip => ip.split(".").reduce((x, o) => x * 256 + Number(o), 0);\n  const t = Math.pow(2, 32 - prefijo);\n  return Math.floor(num(a) / t) === Math.floor(num(b) / t);', l: 2 },
    { c: 'Escribe «interfazSalida(tabla, ip)»: tabla es una lista de [prefijo CIDR, interfaz]; devuelve la interfaz del prefijo más largo que coincide, o null.', f: 'interfazSalida', p: ['tabla', 'ip'], t: [[[[['200.23.16.0/21', '0'], ['200.23.24.0/24', '1'], ['200.23.24.0/21', '2'], ['0.0.0.0/0', '3']], '200.23.24.170'], '1'], [[[['200.23.16.0/21', '0'], ['200.23.24.0/24', '1'], ['200.23.24.0/21', '2'], ['0.0.0.0/0', '3']], '200.23.22.161'], '0'], [[[['200.23.16.0/21', '0'], ['200.23.24.0/24', '1'], ['200.23.24.0/21', '2'], ['0.0.0.0/0', '3']], '8.8.8.8'], '3'], [[[['10.0.0.0/8', 'a']], '11.0.0.1'], null]], sol: '  const num = s => s.split(".").reduce((x, o) => x * 256 + Number(o), 0);\n  let mejor = null, largo = -1;\n  for (const [cidr, itf] of tabla) {\n    const [red, p] = cidr.split("/"), t = Math.pow(2, 32 - Number(p));\n    if (Math.floor(num(ip) / t) === Math.floor(num(red) / t) && Number(p) > largo) { largo = Number(p); mejor = itf; }\n  }\n  return mejor;', h: 'Para cada entrada, compara la IP y la red con los bits de su prefijo y guarda la de prefijo más largo.', l: 4 }
  ],
  gen: function (g) {
    function num(ip) { return ip.split('.').reduce(function (a, o) { return a * 256 + Number(o); }, 0); }
    function txt(n) { return [24, 16, 8, 0].map(function (s) { return Math.floor(n / Math.pow(2, s)) % 256; }).join('.'); }
    g.times(8, function (R) { var p = R.int(20, 30); g.input(2, '¿Cuántos equipos utilizables tiene una subred /' + p + '?', Math.pow(2, 32 - p) - 2, '2^(32 − ' + p + ') − 2.'); });
    g.times(10, function (R) { var ip = [R.pick([10, 172, 192, 200]), R.int(0, 255), R.int(0, 255), R.int(0, 255)].join('.'), p = R.pick([16, 20, 22, 24, 26, 27, 28]), t = Math.pow(2, 32 - p), r = Math.floor(num(ip) / t) * t; g.input(4, '¿Cuál es la dirección de red de ' + ip + '/' + p + '?', txt(r), 'AND entre la IP y la máscara de /' + p + '.'); g.input(4, '¿Cuál es la dirección de difusión de ' + ip + '/' + p + '?', txt(r + t - 1), 'Bits de equipo en 1.'); });
    var masc = [[8, '255.0.0.0'], [16, '255.255.0.0'], [20, '255.255.240.0'], [24, '255.255.255.0'], [25, '255.255.255.128'], [26, '255.255.255.192'], [27, '255.255.255.224'], [28, '255.255.255.240']];
    masc.forEach(function (m) { g.input(2, '¿Qué máscara corresponde al prefijo /' + m[0] + '?', m[1], m[0] + ' bits en 1 desde la izquierda.'); });
  },
  checks: [
    ['Diferencia reenvío y enrutamiento.', 'El reenvío es la acción local de mover un datagrama a la salida correcta según la tabla; el enrutamiento es el proceso global que decide los caminos y llena las tablas.'],
    ['Calcula la red, la difusión y los equipos útiles de 10.20.30.40/20.', 'Red 10.20.16.0, difusión 10.20.31.255, 4094 equipos útiles.'],
    ['¿Por qué se usa la coincidencia del prefijo más largo?', 'Porque permite agregar rutas generales y, a la vez, excepciones más específicas que deben prevalecer.'],
    ['¿Qué ventajas y qué problemas trae NAT?', 'Permite compartir una dirección pública y ahorra direcciones; a cambio rompe el modelo de extremo a extremo y complica las conexiones entrantes.'],
    ['Nombra tres diferencias entre IPv4 e IPv6.', 'Direcciones de 32 frente a 128 bits; cabecera variable frente a fija de 40 bytes; IPv6 sin suma de verificación de cabecera ni fragmentación en enrutadores.']
  ],
  cites: ['Kurose, J. y Ross, K. (2021). *Computer Networking: A Top-Down Approach* (8.ª ed.), capítulo 4.', 'Postel, J. (1981). RFC 791: Internet Protocol. IETF.', 'Fuller, V. y Li, T. (2006). RFC 4632: Classless Inter-domain Routing (CIDR). IETF.', 'Rekhter, Y. et al. (1996). RFC 1918: Address Allocation for Private Internets. IETF.', 'Deering, S. y Hinden, R. (2017). RFC 8200: Internet Protocol, Version 6 (IPv6) Specification. IETF.', 'McKeown, N. et al. (2008). OpenFlow: Enabling Innovation in Campus Networks. *ACM SIGCOMM Computer Communication Review*, 38(2).', 'Appenzeller, G., Keslassy, I. y McKeown, N. (2004). Sizing Router Buffers. *SIGCOMM 2004*.'],
  project: { t: 'Calculadora y plan de direccionamiento',
    goal: 'Dominar el direccionamiento IP construyendo herramientas y un plan real.',
    steps: ['Programa una calculadora de subredes: red, difusión, máscara, rango útil y cantidad de equipos para cualquier IP y prefijo.', 'Agrega la división de un bloque en subredes de tamaños variables (VLSM) a partir de una lista de necesidades.', 'Implementa el reenvío por prefijo más largo con una estructura de árbol de prefijos y pruébalo con una tabla de miles de rutas.', 'Diseña el plan de direcciones IPv4 e IPv6 de una empresa con cuatro áreas.', 'Verifica con traceroute y una captura de Wireshark el TTL y la fragmentación.'],
    deliver: 'La calculadora, el plan de direccionamiento y las capturas.' },
  hito: ['Diseña el plan de direcciones de la sede de PatioApp con subredes separadas para oficina, cámaras, sensores e invitados, y documenta su rango útil.', 'Habilita IPv6 en el servidor de PatioApp en la nube junto a IPv4 (pila doble) y verifica el acceso por ambas versiones.']
});

S('red', 'red.route', { title: 'Enrutamiento: estado de enlace, vector distancia y BGP',
  ask: '¿Qué concepto de enrutamiento se aplica?',
  lesson: `
> **La idea en simple.** Hay dos formas de saber cómo llegar a cualquier lugar de una ciudad. Una es tener el mapa completo y calcular tú mismo la mejor ruta (**estado de enlace**). La otra es preguntar solo a tus vecinos "¿a cuánto estás de cada lugar?" y elegir al que te deja más cerca (**vector distancia**). Internet usa ambas dentro de cada organización, y una tercera, basada en políticas y acuerdos comerciales, entre organizaciones (**BGP**).

## El problema
Una red se modela como un grafo: los enrutadores son nodos y los enlaces, aristas con un **costo** (que puede reflejar la velocidad, el retardo o un valor administrativo). Enrutar es encontrar, para cada destino, el camino de **menor costo**. Los algoritmos se clasifican en:
- **Centralizados o globales:** cada nodo conoce toda la topología (estado de enlace).
- **Descentralizados:** cada nodo solo conoce a sus vecinos y calcula de forma iterativa (vector distancia).
También pueden ser **estáticos** (configurados a mano) o **dinámicos** (se adaptan a los cambios).

## Estado de enlace y Dijkstra
En un protocolo de **estado de enlace**, cada enrutador anuncia a toda la red el estado de sus enlaces (a quién está conectado y con qué costo) mediante **inundación** de mensajes. Así todos conocen el grafo completo, y cada uno ejecuta el **algoritmo de Dijkstra** (1959) para calcular los caminos más cortos desde sí mismo:
1. La distancia al origen es 0 y a los demás, infinita.
2. Elegir el nodo no visitado con menor distancia y marcarlo como definitivo.
3. Para cada vecino suyo, si pasar por él mejora la distancia, actualizarla y recordar el predecesor.
4. Repetir hasta visitar todos.
Con una cola de prioridad, el costo es O((N + E) log N). De los predecesores se obtiene, para cada destino, el **primer salto**, que es lo que va a la tabla de reenvío. Protocolos de este tipo son **OSPF** (RFC 2328) e **IS-IS**, comunes dentro de los ISP y las grandes empresas.
~~~js
// Dijkstra sobre una matriz de costos (0 = sin enlace). Grafo clásico de Kurose: u v w x y z
const N = ['u', 'v', 'w', 'x', 'y', 'z'];
const C = [[0, 2, 5, 1, 0, 0], [2, 0, 3, 2, 0, 0], [5, 3, 0, 3, 1, 5], [1, 2, 3, 0, 1, 0], [0, 0, 1, 1, 0, 2], [0, 0, 5, 0, 2, 0]];
function dijkstra(o) {
  const d = N.map(() => Infinity), prev = N.map(() => null), hecho = N.map(() => false); d[o] = 0;
  for (let k = 0; k < N.length; k++) {
    let u = -1; d.forEach((x, i) => { if (!hecho[i] && (u < 0 || x < d[u])) u = i; });
    hecho[u] = true;
    C[u].forEach((c, v) => { if (c && d[u] + c < d[v]) { d[v] = d[u] + c; prev[v] = u; } });
  }
  return N.map((n, i) => n + ':' + d[i] + (prev[i] !== null ? ' (vía ' + N[prev[i]] + ')' : '')).join('  ');
}
console.log(dijkstra(0));
~~~

## Vector distancia y Bellman-Ford
En un protocolo de **vector distancia**, cada nodo mantiene su estimación de distancia a cada destino y la comparte solo con sus vecinos. Al recibir los vectores de sus vecinos, aplica la **ecuación de Bellman-Ford**:
:::flow D_x(y) = mínimo sobre los vecinos v de [ c(x, v) + D_v(y) ]
y si su vector cambió, lo envía a sus vecinos. El proceso es **iterativo, asíncrono y distribuido**, y converge a los caminos más cortos. **RIP** (RFC 1058, 1988) es el ejemplo clásico: usa como costo la cantidad de saltos y considera infinito 16, lo que limita el diámetro de la red.

Su punto débil es la **cuenta al infinito**: si un enlace se cae, las malas noticias viajan lento. Si x llegaba a z por y, y el enlace y–z se cae, y puede creer que x todavía llega a z (sin saber que es a través de sí mismo) y ambos se van pasando distancias crecientes durante muchas rondas. Remedios parciales: el **horizonte dividido** con **reversa envenenada** (no anunciar una ruta, o anunciarla como infinita, al vecino por el que se aprendió) evita los ciclos de dos nodos, pero no todos.

## Comparación
| Aspecto | Estado de enlace | Vector distancia |
| Conocimiento | topología completa | solo vecinos |
| Mensajes | inundación de cada cambio a todos | vectores solo a los vecinos |
| Convergencia | rápida | puede ser lenta (cuenta al infinito) |
| Robustez | cada nodo calcula su propia tabla | un error se propaga a todos |
| Ejemplos | OSPF, IS-IS | RIP, y BGP como variante de vector de caminos |

## Jerarquía: sistemas autónomos
Ningún algoritmo escala a todos los enrutadores del mundo, y cada organización quiere controlar su propia red. Por eso Internet se divide en **sistemas autónomos** (AS), cada uno con un número asignado (ASN) y administrado por una sola organización: un ISP, una universidad, una empresa de contenido. Dentro de cada AS se usa un protocolo **intra-AS** (OSPF, IS-IS); entre AS, el protocolo **inter-AS** es **BGP**.

## BGP: el pegamento de Internet
**BGP-4** (RFC 4271) es un protocolo de **vector de caminos**: cada AS anuncia a sus vecinos qué prefijos puede alcanzar y por qué secuencia de AS (el atributo AS-PATH), lo que evita ciclos (si un AS se ve a sí mismo en el camino, descarta el anuncio). La elección de ruta no es por costo mínimo, sino por **políticas**: preferencias configuradas por cada AS, que reflejan acuerdos comerciales. Un AS prefiere las rutas de sus clientes (que le pagan) sobre las de sus pares (sin pago) y estas sobre las de sus proveedores (a quienes paga), y no ofrece tránsito gratis entre dos proveedores. Entre rutas igual de preferidas, gana la de AS-PATH más corto y luego la salida más cercana (**enrutamiento de papa caliente**: deshacerse del tráfico cuanto antes).

BGP confía en lo que le anuncian, lo que causa incidentes:
- En febrero de 2008, Pakistan Telecom anunció por error un prefijo más específico de YouTube, y buena parte del mundo dejó de llegar a YouTube durante unas dos horas.
- El 4 de octubre de 2021, un cambio de configuración retiró los anuncios BGP de los servidores DNS de Facebook; durante unas seis horas Facebook, Instagram y WhatsApp desaparecieron de Internet, e incluso los empleados tuvieron problemas para acceder a los edificios.
Defensas: filtrar anuncios de los clientes y validar el origen de los prefijos con **RPKI**, que firma qué AS puede anunciar cada prefijo.

## Redes definidas por software
En las **redes definidas por software** (SDN), un **controlador** lógicamente centralizado calcula las rutas y las instala en los conmutadores con protocolos como OpenFlow, separando el plano de control del de datos. Google describió en 2013 su red B4 entre centros de datos, que con SDN alcanzó utilizaciones cercanas al 100% en enlaces que antes se usaban al 30-40%.

## Convergencia en la práctica
Cuando un enlace cae, la red tarda en **converger** a las nuevas rutas: OSPF suele hacerlo en segundos y BGP, en minutos. Mientras tanto pueden aparecer ciclos transitorios y pérdidas.

## Ejemplo resuelto: dos enlaces a Internet para PatioApp
La sede central de PatioApp contrata dos proveedores para no quedar incomunicada. Dentro de la sede, OSPF reparte las rutas internas y se recalcula en segundos si cae un enlace. Hacia afuera, la empresa obtiene su propio número de AS y un prefijo IPv4 /24 (el más pequeño que se acepta de forma general en Internet), y lo anuncia por BGP a ambos proveedores. Si un proveedor falla, sus anuncios desaparecen y el tráfico entra por el otro. Para preferir el proveedor A en condiciones normales, se alarga artificialmente el AS-PATH anunciado por B (**anteponer** su propio AS varias veces). Además, se registra el prefijo en RPKI para que nadie pueda anunciarlo en su nombre.`,
  links: [['m4.graphs', 'Dijkstra y Bellman-Ford son algoritmos de caminos mínimos en grafos'], ['red.net', 'el enrutamiento llena las tablas de reenvío'], ['m4.dp', 'la ecuación de Bellman-Ford es programación dinámica']],
  read: 'Kurose y Ross, capítulo 5; RFC 2328 (OSPF) y 4271 (BGP); Jain y otros (2013) sobre B4.',
  terms: [
    ['Estado de enlace', 'enfoque de enrutamiento en que cada enrutador conoce toda la topología y calcula los caminos con Dijkstra', ['OSPF lo usa.', 'Los cambios se inundan a todos los enrutadores.', 'Converge rápido.']],
    ['Vector distancia', 'enfoque de enrutamiento en que cada nodo comparte sus distancias estimadas solo con sus vecinos y aplica Bellman-Ford', ['RIP lo usa.', 'Es iterativo y distribuido.', 'Puede sufrir cuenta al infinito.']],
    ['Cuenta al infinito', 'problema del vector distancia en que, tras una caída, los nodos se pasan distancias crecientes durante muchas rondas', ['Las malas noticias viajan lento.', 'RIP lo limita considerando infinito 16.', 'La reversa envenenada lo evita solo en ciclos de dos nodos.']],
    ['Sistema autónomo', 'conjunto de redes administrado por una sola organización con una política de enrutamiento común', ['Un ISP o una universidad.', 'Tiene un número asignado (ASN).', 'Usa OSPF dentro y BGP hacia afuera.']],
    ['BGP', 'protocolo de vector de caminos que intercambia rutas entre sistemas autónomos según políticas', ['Anuncia prefijos con su AS-PATH.', 'Un error suyo dejó sin Facebook al mundo en 2021.', 'Elige por acuerdos comerciales, no solo por costo.']],
    ['AS-PATH', 'atributo de BGP con la secuencia de sistemas autónomos que atraviesa una ruta', ['Evita ciclos entre sistemas autónomos.', 'Se prefiere el más corto entre rutas iguales.', 'Se alarga artificialmente para desalentar una ruta.']],
    ['Enrutamiento de papa caliente', 'política de entregar el tráfico a otra red por la salida más cercana posible', ['Un ISP saca el tráfico de su red cuanto antes.', 'Reduce el costo propio.', 'Puede alargar el camino total.']],
    ['RPKI', 'infraestructura de certificados que indica qué sistema autónomo puede anunciar cada prefijo', ['Ayuda a rechazar anuncios falsos.', 'Defiende contra secuestros de prefijos.', 'Los registros regionales emiten los certificados.']]
  ],
  q: [
    ['En el grafo clásico de Kurose (u-v 2, u-x 1, u-w 5, v-x 2, v-w 3, x-w 3, x-y 1, w-y 1, w-z 5, y-z 2), ¿cuál es la distancia mínima de u a z?', '4', ['5', '6', '7'], 'u → x → y → z: 1 + 1 + 2.', 3],
    ['¿Qué algoritmo usa OSPF para calcular las rutas?', 'Dijkstra', ['Bellman-Ford', 'Kruskal', 'Búsqueda en profundidad'], 'Es un protocolo de estado de enlace.', 2],
    ['¿Qué problema sufre el vector distancia cuando cae un enlace?', 'La cuenta al infinito', ['La anomalía de Bélády', 'El colapso por congestión', 'La fragmentación'], 'Las malas noticias se propagan lentamente.', 3],
    ['¿Qué distancia considera infinita RIP?', '16 saltos', ['15 saltos', '255 saltos', '64 saltos'], 'Limita el diámetro de la red.', 3],
    ['¿Por qué BGP no elige simplemente la ruta de menor costo?', 'Porque las decisiones dependen de políticas y acuerdos comerciales entre organizaciones', ['Porque no conoce los costos', 'Porque es más lento', 'Porque solo usa UDP'], 'Cada AS decide qué tráfico acepta y prefiere.', 3],
    ['¿Cómo evita BGP los ciclos entre sistemas autónomos?', 'Descartando los anuncios cuyo AS-PATH ya contiene su propio número', ['Con un TTL', 'Con Dijkstra', 'Con reversa envenenada'], 'Es un protocolo de vector de caminos.', 4],
    ['¿Qué causó la caída de Facebook del 4 de octubre de 2021?', 'Un cambio de configuración que retiró sus anuncios BGP', ['Un ataque de denegación de servicio', 'Un corte de un cable submarino', 'Un error de DNS en los navegadores'], 'Sus servidores DNS quedaron inalcanzables.', 3],
    { tf: 'En estado de enlace, cada enrutador calcula su propia tabla a partir de la topología completa.', v: true, e: 'Por eso un error local no se propaga como en vector distancia.', l: 2 },
    { tf: 'Dentro de un sistema autónomo se usa BGP y entre sistemas autónomos se usa OSPF.', v: false, e: 'Es al revés: OSPF o IS-IS dentro, BGP entre sistemas autónomos.', l: 2 },
    { o: 'Ordena los pasos del algoritmo de Dijkstra.', s: ['Poner distancia 0 al origen e infinito al resto', 'Elegir el nodo no visitado de menor distancia', 'Marcarlo como definitivo', 'Relajar las distancias de sus vecinos', 'Repetir hasta visitar todos'], e: 'La relajación usa d[u] + c(u, v).', l: 3 },
    { c: 'Escribe «distancias(matriz, origen)»: matriz de costos con 0 para "sin enlace"; devuelve la lista de distancias mínimas desde el origen, con −1 para los inalcanzables.', f: 'distancias', p: ['matriz', 'origen'], t: [[[[[0, 2, 5, 1, 0, 0], [2, 0, 3, 2, 0, 0], [5, 3, 0, 3, 1, 5], [1, 2, 3, 0, 1, 0], [0, 0, 1, 1, 0, 2], [0, 0, 5, 0, 2, 0]], 0], [0, 2, 3, 1, 2, 4]], [[[[0, 1, 0], [1, 0, 0], [0, 0, 0]], 0], [0, 1, -1]], [[[[0, 4, 1], [4, 0, 2], [1, 2, 0]], 1], [3, 0, 2]]], sol: '  const n = matriz.length, d = Array(n).fill(Infinity), ok = Array(n).fill(false);\n  d[origen] = 0;\n  for (let k = 0; k < n; k++) {\n    let u = -1;\n    for (let i = 0; i < n; i++) if (!ok[i] && (u < 0 || d[i] < d[u])) u = i;\n    if (d[u] === Infinity) break;\n    ok[u] = true;\n    for (let v = 0; v < n; v++) if (matriz[u][v] && d[u] + matriz[u][v] < d[v]) d[v] = d[u] + matriz[u][v];\n  }\n  return d.map(x => x === Infinity ? -1 : x);', h: 'Elige el nodo no visitado de menor distancia y relaja sus vecinos.', l: 4 },
    { c: 'Escribe «vectorDistancia(costos, vectores)»: costos[i] es el costo al vecino i y vectores[i] su vector de distancias a cada destino; devuelve el vector propio con la ecuación de Bellman-Ford.', f: 'vectorDistancia', p: ['costos', 'vectores'], t: [[[[2, 7], [[0, 1], [1, 0]]], [2, 3]], [[[1], [[0, 4, 6]]], [1, 5, 7]], [[[3, 1], [[0, 2], [5, 0]]], [3, 1]]], sol: '  return vectores[0].map((_, d) => Math.min(...costos.map((c, i) => c + vectores[i][d])));', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9), d = R.int(1, 9), e = R.int(1, 20); g.input(3, 'Grafo: A–B cuesta ' + a + ', B–D cuesta ' + b + ', A–C cuesta ' + c + ', C–D cuesta ' + d + ' y A–D cuesta ' + e + '. ¿Cuál es la distancia mínima de A a D?', Math.min(a + b, c + d, e), 'Compara A–B–D (' + (a + b) + '), A–C–D (' + (c + d) + ') y A–D (' + e + ').'); });
    g.times(6, function (R) { var c1 = R.int(1, 8), c2 = R.int(1, 8), d1 = R.int(0, 10), d2 = R.int(0, 10); g.input(3, 'El nodo x tiene vecinos v (costo ' + c1 + ') y w (costo ' + c2 + '). v anuncia distancia ' + d1 + ' a y, y w anuncia ' + d2 + '. Según Bellman-Ford, ¿cuál es D_x(y)?', Math.min(c1 + d1, c2 + d2), 'min(' + c1 + ' + ' + d1 + ', ' + c2 + ' + ' + d2 + ').'); });
    var pr = [['OSPF', 'Estado de enlace dentro de un AS'], ['IS-IS', 'Estado de enlace dentro de un AS'], ['RIP', 'Vector distancia dentro de un AS'], ['BGP', 'Vector de caminos entre sistemas autónomos']];
    pr.forEach(function (p) { g.mcq(2, '¿Cómo se clasifica el protocolo ' + p[0] + '?', p[1], ['Estado de enlace dentro de un AS', 'Vector distancia dentro de un AS', 'Vector de caminos entre sistemas autónomos', 'Protocolo de transporte'].filter(function (x) { return x !== p[1]; }), 'Intra-AS: OSPF, IS-IS, RIP; inter-AS: BGP.'); });
  },
  checks: [
    ['Compara estado de enlace y vector distancia en conocimiento, mensajes y convergencia.', 'Estado de enlace: topología completa, inundación a todos y convergencia rápida; vector distancia: solo vecinos, mensajes a vecinos y convergencia que puede ser lenta.'],
    ['Explica la cuenta al infinito con un ejemplo.', 'Si y pierde su enlace con z pero x le anunciaba una ruta a z que pasaba por y, y cree que puede llegar vía x; ambos se pasan distancias crecientes hasta el infinito.'],
    ['¿Por qué Internet necesita sistemas autónomos y dos niveles de enrutamiento?', 'Por escala (ningún algoritmo maneja todos los enrutadores) y por autonomía administrativa (cada organización decide su red y sus políticas).'],
    ['¿Cómo elige BGP entre varias rutas a un prefijo?', 'Primero por políticas locales (clientes, pares, proveedores), luego por AS-PATH más corto y luego por la salida más cercana, entre otros criterios.'],
    ['¿Qué es RPKI y qué incidente ayuda a prevenir?', 'Certificados que indican qué AS puede anunciar cada prefijo; ayuda a rechazar secuestros como el de YouTube en 2008.']
  ],
  cites: ['Dijkstra, E. (1959). A Note on Two Problems in Connexion with Graphs. *Numerische Mathematik*, 1.', 'Moy, J. (1998). RFC 2328: OSPF Version 2. IETF.', 'Rekhter, Y., Li, T. y Hares, S. (2006). RFC 4271: A Border Gateway Protocol 4 (BGP-4). IETF.', 'Hedrick, C. (1988). RFC 1058: Routing Information Protocol. IETF.', 'Gao, L. y Rexford, J. (2001). Stable Internet Routing Without Global Coordination. *IEEE/ACM Transactions on Networking*, 9(6).', 'Jain, S. et al. (2013). B4: Experience with a Globally-Deployed Software Defined WAN. *SIGCOMM 2013*.'],
  project: { t: 'Simulador de enrutamiento',
    goal: 'Implementar y comparar los dos grandes enfoques de enrutamiento.',
    steps: ['Implementa Dijkstra y construye la tabla de reenvío (destino y primer salto) de cada nodo de un grafo.', 'Implementa vector distancia asíncrono con mensajes entre nodos y mide en cuántas rondas converge.', 'Provoca la caída de un enlace y observa la cuenta al infinito; agrega reversa envenenada y compara.', 'Explora rutas BGP reales con un servicio de consulta (por ejemplo, bgp.he.net o RIPEstat) para el AS de tu proveedor de Internet.', 'Escribe un informe con las rondas de convergencia y lo que aprendiste de BGP.'],
    deliver: 'El simulador, los registros de convergencia y el informe.' },
  hito: ['Diseña la conectividad de la sede central de PatioApp con dos proveedores, explicando cómo se recupera si uno falla.', 'Documenta en un ADR cómo PatioApp preferirá un proveedor sobre otro y qué medidas (RPKI, filtros) protegen su prefijo.']
});
})();
