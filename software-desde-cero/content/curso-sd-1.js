(function () {
var M = SDC.M, S = SDC.S;
M('sd', { title: 'Sistemas Distribuidos', prof: true,
  desc: 'Curso completo sobre sistemas formados por muchas computadoras que cooperan a través de una red que falla, se demora y desordena los mensajes. Se estudian los modelos de sistema y de fallas, el tiempo y el orden de los eventos, la replicación, los modelos de consistencia y el teorema CAP, los algoritmos de consenso (Paxos y Raft), las transacciones distribuidas y las sagas, el particionado y el balanceo, las fallas bizantinas y las cadenas de bloques, y la práctica de operar sistemas distribuidos confiables.',
  thread: 'PatioApp se vuelve un sistema distribuido de verdad: sedes que siguen funcionando sin conexión con la central, un registro de eventos ordenado con relojes lógicos, réplicas con quórums, un servicio de configuración con consenso, una saga para el proceso de salida de una unidad (cobro, liberación del espacio y notificación) y prácticas de tiempos de espera, reintentos y trazas distribuidas.',
  books: '*Distributed Systems* (van Steen y Tanenbaum, libre en distributed-systems.net), *Designing Data-Intensive Applications* (Kleppmann), *Distributed Systems: Concepts and Design* (Coulouris y otros), *Introduction to Reliable and Secure Distributed Programming* (Cachin, Guerraoui y Rodrigues).',
  uni: 'MIT 6.5840 (antes 6.824) *Distributed Systems*, con laboratorios de Raft; Stanford CS244b; CMU 15-440; Berkeley CS 162 y CS 262A; Cambridge *Concurrent and Distributed Systems* (con las clases de Kleppmann). En Perú: Sistemas Distribuidos y Computación Paralela y Distribuida (UNI, PUCP, UNMSM, UTEC).',
  capstone: { t: 'Almacén clave-valor replicado con Raft',
    goal: 'Construir un pequeño almacén de datos tolerante a fallas, como en el laboratorio de MIT 6.5840.',
    steps: ['Implementa Raft (elección de líder, replicación del registro y confirmación por mayoría) sobre una red simulada que pierde, retrasa y desordena mensajes.', 'Construye encima un almacén clave-valor linealizable con operaciones idempotentes por identificador de cliente.', 'Prueba con fallas: caída del líder, particiones de red y reinicios, y verifica que nunca se pierde una escritura confirmada.', 'Agrega particionado con hash consistente entre varios grupos Raft.', 'Mide latencia y rendimiento y documenta qué propiedades garantiza tu sistema y cuáles no.'],
    deliver: 'El código, el banco de pruebas de fallas, las mediciones y el documento de garantías.' } });

S('sd', 'sd.intro', { title: 'Modelos de sistema, fallas y comunicación',
  ask: '¿Qué concepto fundamental de sistemas distribuidos se aplica?',
  lesson: `
> **La idea en simple.** Coordinar a un equipo por mensajes de texto con mala señal: algunos mensajes llegan tarde, otros nunca, a veces en desorden, y cuando alguien no responde no sabes si está ocupado, sin batería o si tu mensaje se perdió. Un sistema distribuido es exactamente eso, con computadoras, y todo su diseño consiste en lograr que el conjunto funcione bien pese a esa incertidumbre.

## Qué es un sistema distribuido
Maarten van Steen y Andrew Tanenbaum lo definen como un conjunto de elementos de cómputo autónomos que se presenta a sus usuarios como un solo sistema coherente. Leslie Lamport lo describió en 1987 con humor:
:::cita Un sistema distribuido es uno en el que la falla de una computadora que ni siquiera sabías que existía puede dejar inutilizable tu propia computadora. | Leslie Lamport, correo electrónico de 1987
Se distribuye por **escala** (los datos o la carga no caben en una máquina), por **disponibilidad** (que el servicio sobreviva a la falla de una máquina), por **latencia** (estar cerca de los usuarios) o porque el problema es distribuido por naturaleza (sedes, sensores, teléfonos).

## Las falacias de la computación distribuida
Peter Deutsch formuló a mediados de los 90, en Sun Microsystems, siete suposiciones falsas que hacen los programadores al empezar, y James Gosling agregó la octava:
1. La red es confiable.
2. La latencia es cero.
3. El ancho de banda es infinito.
4. La red es segura.
5. La topología no cambia.
6. Hay un solo administrador.
7. El costo de transporte es cero.
8. La red es homogénea.
Cada una explica una clase de incidentes reales: código que funcionaba en una sola máquina y falla al primer paquete perdido, una llamada remota en un bucle que convierte una pantalla en mil viajes de ida y vuelta, o un cambio de configuración de otro equipo que deja aislado a un servicio.

## Modelos de sincronía
Para razonar con precisión se fijan supuestos sobre el tiempo:
- **Síncrono:** hay cotas conocidas para la demora de los mensajes, la velocidad de los procesos y el desvío de los relojes. Facilita los algoritmos, pero es irreal en Internet.
- **Asíncrono:** no hay ninguna cota; un mensaje puede tardar arbitrariamente. Es el modelo más pesimista y en él muchos problemas son imposibles.
- **Parcialmente síncrono:** el sistema se comporta de forma asíncrona durante períodos impredecibles, pero termina siendo síncrono el tiempo suficiente. Cynthia Dwork, Nancy Lynch y Larry Stockmeyer lo formalizaron en 1988, y es el modelo realista para el que se diseñan los algoritmos de consenso prácticos.

## Modelos de fallas
| Falla | Qué ocurre |
| Caída y parada | el proceso deja de funcionar y no vuelve |
| Caída y recuperación | el proceso cae y vuelve, quizá sin lo que tenía en memoria |
| Omisión | se pierden mensajes enviados o recibidos |
| Temporal | un proceso o mensaje es más lento que lo permitido |
| Bizantina | el proceso hace cualquier cosa, incluso mentir o actuar con malicia |
Los algoritmos se diseñan para un modelo: tolerar caídas es mucho más barato que tolerar fallas bizantinas.

## No se puede distinguir lento de muerto
Si un nodo no responde, la causa puede ser que cayó, que está sobrecargado, que la red perdió la petición o la respuesta, o que una pausa larga del recolector de basura lo congeló. Desde afuera es imposible distinguirlo: solo hay **tiempos de espera**. Un tiempo de espera corto declara muertos a nodos lentos (y provoca conmutaciones innecesarias); uno largo tarda en reaccionar a caídas reales. Tushar Chandra y Sam Toueg formalizaron en 1996 los **detectores de fallas** imperfectos y mostraron qué propiedades mínimas necesitan para que el consenso sea posible.

## El problema de los dos generales
Dos generales en colinas opuestas deben atacar a la vez y solo pueden comunicarse con mensajeros que cruzan un valle enemigo y pueden ser capturados. El primero envía "ataquemos al amanecer"; necesita confirmación; el segundo la envía, pero necesita saber que llegó; y así para siempre. Jim Gray popularizó en 1978 este problema, que muestra que **no existe un protocolo que garantice el acuerdo con un canal que puede perder mensajes**. La consecuencia práctica: los sistemas no buscan certeza, sino diseños que funcionen con probabilidad muy alta y que se recuperen de los desacuerdos.

## Llamadas a procedimientos remotos
Andrew Birrell y Bruce Nelson describieron en 1984 la **llamada a procedimiento remoto** (RPC): llamar a una función en otra máquina como si fuera local. Un **talón** (*stub*) en el cliente **serializa** los argumentos, los envía y espera la respuesta; otro en el servidor los deserializa y llama a la función real. gRPC (Google, 2015), Thrift y las API REST son sus herederos. Pero una llamada remota **no es** una llamada local:
- Puede fallar a mitad: el servidor quizá ejecutó la operación y se perdió la respuesta.
- Su latencia es miles de veces mayor y variable.
- Sus semánticas posibles son **como máximo una vez** (no reintentar), **al menos una vez** (reintentar hasta tener respuesta, con riesgo de duplicar) y la deseada **exactamente una vez**, que en general es imposible y se **simula** con reintentos más operaciones **idempotentes** (que repetir no cambie el resultado), normalmente con un identificador único por petición.

## Arquitecturas
- **Cliente-servidor:** los clientes piden y uno o varios servidores atienden; es la base de la web.
- **Entre pares:** todos los nodos cumplen ambos papeles, como en BitTorrent o en las cadenas de bloques.
- **Por capas y microservicios:** el sistema se divide en servicios independientes que se comunican por la red, cada uno con su propio despliegue y sus datos. Ganan autonomía de los equipos, pero convierten llamadas locales en remotas, con todas las fallas de este curso.
- **Basadas en eventos:** los componentes publican hechos en un registro o una cola (Kafka) y otros reaccionan, desacoplando a emisores y receptores en el tiempo.

## Disponibilidad en números
Si un servicio necesita que funcionen **todos** sus componentes (en serie), su disponibilidad es el producto de las disponibilidades: tres componentes de 99.9% dan 99.7%. Si basta con que funcione **uno** de varios réplicas (en paralelo), la probabilidad de que todos fallen es el producto de sus indisponibilidades: dos réplicas de 99% dan 1 − 0.01² = 99.99%. Y con muchas máquinas, la falla es la norma: si cada una falla con probabilidad 0.1% en un día, entre 1000 máquinas la probabilidad de que falle al menos una es 1 − 0.999¹⁰⁰⁰ ≈ 63%.
~~~js
const serie = a => a.reduce((x, y) => x * y, 1);
const paralelo = a => 1 - a.reduce((x, y) => x * (1 - y), 1);
const algunaFalla = (n, p) => 1 - (1 - p) ** n;
console.log('serie 3 × 99.9%:', (serie([0.999, 0.999, 0.999]) * 100).toFixed(2) + '%');
console.log('paralelo 2 × 99%:', (paralelo([0.99, 0.99]) * 100).toFixed(2) + '%');
console.log('alguna de 1000 máquinas falla hoy:', (algunaFalla(1000, 0.001) * 100).toFixed(1) + '%');
~~~

## Ejemplo resuelto: PatioApp entre sedes
Las sedes de PatioApp en provincias tienen Internet inestable. Si la aplicación de cada sede llamara al servidor central para registrar cada ingreso (falacias 1 y 2), la sede quedaría paralizada en cada corte. Diseño distribuido:
- Cada sede guarda sus operaciones localmente y las envía a la central cuando hay conexión (sin depender de que la red sea confiable).
- Cada operación lleva un **identificador único** generado en la sede; la central la aplica de forma **idempotente**, de modo que reenviar tras un corte no duplica ingresos ni cobros.
- La sede no "sabe" si la central recibió algo hasta que llega una confirmación; mientras tanto, lo marca como pendiente y reintenta con espera exponencial.
- Los tiempos de espera se calibran con la latencia real medida (por ejemplo, el percentil 99 más un margen), no con un número arbitrario.
Con tres componentes en serie (red de la sede, balanceador, servidor) de 99%, 99.9% y 99.9%, la disponibilidad para la sede sería apenas 98.8%; con el trabajo sin conexión, la sede opera el 100% del tiempo y solo la sincronización depende de la red.`,
  links: [['m13.dist', 'esta unidad profundiza la introducción a sistemas distribuidos del ciclo 7'], ['red.trans', 'TCP resuelve la confiabilidad en un enlace, pero no las fallas de los procesos'], ['plat.mobile', 'las apps sin conexión son sistemas distribuidos en miniatura']],
  read: 'van Steen y Tanenbaum, capítulos 1 y 4; Kleppmann, *Designing Data-Intensive Applications*, capítulo 8; Birrell y Nelson (1984); Dwork, Lynch y Stockmeyer (1988).',
  terms: [
    ['Sistema distribuido', 'conjunto de computadoras autónomas que se presenta a sus usuarios como un solo sistema coherente', ['Un servicio web con cientos de servidores.', 'Una base de datos replicada en tres regiones.', 'PatioApp con sus sedes y la central.']],
    ['Falacias de la computación distribuida', 'ocho suposiciones falsas sobre la red que hacen los programadores, como que es confiable o que la latencia es cero', ['Las formuló Peter Deutsch en los 90.', 'Explican muchos incidentes reales.', 'Se combaten diseñando para la falla.']],
    ['Sincronía parcial', 'modelo en que el sistema puede comportarse de forma asíncrona por períodos, pero termina siendo síncrono el tiempo suficiente', ['Dwork, Lynch y Stockmeyer lo formalizaron en 1988.', 'Es el modelo de Raft y Paxos prácticos.', 'Es realista para Internet.']],
    ['Falla bizantina', 'falla en la que un proceso puede comportarse de cualquier forma, incluso malintencionada', ['Un nodo que envía datos distintos a cada vecino.', 'Tolerarla es mucho más caro.', 'Es el modelo de las cadenas de bloques.']],
    ['Detector de fallas', 'mecanismo, basado en tiempos de espera, que sospecha qué procesos han caído', ['Puede equivocarse con nodos lentos.', 'Chandra y Toueg lo formalizaron en 1996.', 'Es necesario para el consenso práctico.']],
    ['Problema de los dos generales', 'demostración de que no hay protocolo que garantice el acuerdo con un canal que pierde mensajes', ['Cada confirmación necesita otra confirmación.', 'Gray lo popularizó en 1978.', 'Por eso se buscan diseños probabilísticos y recuperables.']],
    ['RPC', 'mecanismo para invocar una función en otra máquina como si fuera local', ['gRPC es un ejemplo moderno.', 'Birrell y Nelson lo describieron en 1984.', 'Puede fallar a mitad, a diferencia de una llamada local.']],
    ['Operación idempotente', 'operación que produce el mismo resultado si se ejecuta una o varias veces', ['Registrar el pago con un identificador único.', 'Permite reintentar sin duplicar.', 'Simula la semántica de exactamente una vez.']]
  ],
  q: [
    ['Un nodo no responde. ¿Qué puede afirmar con certeza quien espera?', 'Nada seguro: puede estar caído, lento o haberse perdido un mensaje', ['Que está caído', 'Que la red está caída', 'Que el nodo está sobrecargado'], 'Solo hay tiempos de espera.', 2],
    ['¿Qué modelo de sincronía usan los algoritmos de consenso prácticos?', 'Parcialmente síncrono', ['Síncrono estricto', 'Totalmente asíncrono sin tiempos de espera', 'Bizantino'], 'Dwork, Lynch y Stockmeyer, 1988.', 3],
    ['¿Qué semántica de RPC se obtiene reintentando hasta recibir respuesta?', 'Al menos una vez', ['Como máximo una vez', 'Exactamente una vez garantizada', 'Ninguna vez'], 'Con riesgo de duplicar; se combina con idempotencia.', 2],
    ['Tres componentes en serie de 99.9% cada uno, ¿qué disponibilidad dan aproximadamente?', '99.7%', ['99.9%', '99.99%', '97%'], '0.999³ ≈ 0.997.', 3],
    ['Dos réplicas independientes de 99%, de las que basta una, ¿qué disponibilidad dan?', '99.99%', ['98%', '99%', '99.5%'], '1 − 0.01 × 0.01.', 3],
    ['¿Qué demuestra el problema de los dos generales?', 'Que no hay protocolo que garantice el acuerdo sobre un canal que pierde mensajes', ['Que TCP es inseguro', 'Que el consenso es imposible en cualquier modelo', 'Que hacen falta tres generales'], 'Cada confirmación necesita otra.', 3],
    ['¿Cuál es una de las falacias de la computación distribuida?', 'La latencia es cero', ['La red puede fallar', 'Los mensajes pueden perderse', 'Los nodos pueden caer'], 'Las demás son verdades, no falacias.', 1],
    { tf: 'Una llamada remota se comporta igual que una llamada local, solo que más lenta.', v: false, e: 'Puede fallar a mitad, con resultado incierto, y su latencia es variable.', l: 2 },
    { tf: 'Con muchas máquinas, que alguna falle cada día es lo normal.', v: true, e: 'Con 1000 máquinas al 0.1% diario, la probabilidad es de unos 63%.', l: 2 },
    { c: 'Escribe «disponibilidadSerie(lista)»: producto de las disponibilidades, redondeado a 4 decimales.', f: 'disponibilidadSerie', p: ['lista'], t: [[[[0.999, 0.999, 0.999]], 0.997], [[[0.99, 0.999, 0.999]], 0.988], [[[1]], 1]], sol: '  return Math.round(lista.reduce((a, b) => a * b, 1) * 10000) / 10000;', l: 1 },
    { c: 'Escribe «disponibilidadParalelo(lista)»: 1 − producto de las indisponibilidades, redondeado a 4 decimales.', f: 'disponibilidadParalelo', p: ['lista'], t: [[[[0.99, 0.99]], 0.9999], [[[0.9, 0.9, 0.9]], 0.999], [[[0.5]], 0.5]], sol: '  return Math.round((1 - lista.reduce((a, b) => a * (1 - b), 1)) * 10000) / 10000;', l: 2 },
    { c: 'Escribe «probAlgunaFalla(n, p)»: probabilidad de que falle al menos una de n máquinas independientes que fallan con probabilidad p, redondeada a 4 decimales.', f: 'probAlgunaFalla', p: ['n', 'p'], t: [[[1000, 0.001], 0.6323], [[1, 0.5], 0.5], [[10, 0], 0]], sol: '  return Math.round((1 - Math.pow(1 - p, n)) * 10000) / 10000;', l: 2 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var a = [R.pick([0.99, 0.995, 0.999, 0.9999]), R.pick([0.99, 0.995, 0.999, 0.9999]), R.pick([0.99, 0.995, 0.999, 0.9999])]; g.input(3, 'Tres componentes en serie tienen disponibilidades ' + a.join(', ') + '. ¿Cuál es la disponibilidad total en porcentaje? Redondea a 2 decimales.', (a[0] * a[1] * a[2] * 100).toFixed(2), 'Producto de las disponibilidades.'); });
    g.times(6, function (R) { var a = R.pick([0.9, 0.95, 0.99]), n = R.int(2, 3); g.input(3, 'Hay ' + n + ' réplicas independientes de disponibilidad ' + a + ' y basta con que funcione una. ¿Cuál es la disponibilidad en porcentaje? Redondea a 4 decimales.', ((1 - Math.pow(1 - a, n)) * 100).toFixed(4), '1 − (1 − a)^n.'); });
    var fal = [['El proceso deja de funcionar y nunca vuelve', 'Caída y parada'], ['El proceso cae y se reinicia sin su memoria', 'Caída y recuperación'], ['Se pierden algunos mensajes', 'Omisión'], ['Un nodo responde, pero mucho más tarde de lo permitido', 'Temporal'], ['Un nodo envía información contradictoria a distintos vecinos', 'Bizantina']];
    fal.forEach(function (f) { g.mcq(2, '¿Qué modelo de falla describe esto? ' + f[0], f[1], ['Caída y parada', 'Caída y recuperación', 'Omisión', 'Temporal', 'Bizantina'].filter(function (x) { return x !== f[1]; }).slice(0, 3), 'Clasificación de fallas de los textos de sistemas distribuidos.'); });
    var fa = ['La red es confiable', 'La latencia es cero', 'El ancho de banda es infinito', 'La red es segura', 'La topología no cambia', 'Hay un solo administrador', 'El costo de transporte es cero', 'La red es homogénea'];
    fa.forEach(function (f) { g.tf(1, '«' + f + '» es una de las falacias de la computación distribuida.', true, 'Las ocho falacias de Deutsch y Gosling.'); });
  },
  checks: [
    ['¿Por qué se construyen sistemas distribuidos si son tan complejos?', 'Por escala, disponibilidad, latencia cercana a los usuarios o porque el problema es distribuido por naturaleza.'],
    ['Nombra cuatro falacias de la computación distribuida y un error que causa cada una.', 'Red confiable (código sin reintentos), latencia cero (llamadas remotas en bucles), ancho de banda infinito (transferir datos enormes), topología fija (direcciones fijas en el código).'],
    ['¿Por qué un tiempo de espera no puede distinguir un nodo caído de uno lento?', 'Porque desde afuera solo se observa la falta de respuesta, que puede deberse a una caída, a sobrecarga, a pausas o a mensajes perdidos.'],
    ['Explica por qué "exactamente una vez" se simula con reintentos e idempotencia.', 'Porque no se puede saber si una operación sin respuesta se ejecutó; reintentar garantiza que se ejecute al menos una vez y la idempotencia hace que las repeticiones no tengan efecto.'],
    ['Calcula la disponibilidad de dos réplicas de 99.9% en paralelo.', '1 − 0.001² = 99.9999%.']
  ],
  cites: ['van Steen, M. y Tanenbaum, A. (2023). *Distributed Systems* (4.ª ed.). distributed-systems.net.', 'Birrell, A. y Nelson, B. (1984). Implementing Remote Procedure Calls. *ACM Transactions on Computer Systems*, 2(1).', 'Dwork, C., Lynch, N. y Stockmeyer, L. (1988). Consensus in the Presence of Partial Synchrony. *Journal of the ACM*, 35(2).', 'Chandra, T. y Toueg, S. (1996). Unreliable Failure Detectors for Reliable Distributed Systems. *Journal of the ACM*, 43(2).', 'Gray, J. (1978). Notes on Data Base Operating Systems. LNCS 60. Springer.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*, capítulo 8. O’Reilly.'],
  project: { t: 'Laboratorio de red no confiable',
    goal: 'Ver con datos cómo se comporta un sistema cuando la red falla.',
    steps: ['Escribe un cliente y un servidor que se comuniquen por RPC (por ejemplo, HTTP o gRPC) y un proxy que pierda, retrase y duplique un porcentaje de mensajes.', 'Implementa en el cliente tiempos de espera y reintentos, y observa los duplicados en el servidor.', 'Haz idempotentes las operaciones con un identificador por petición y verifica que ya no se duplican efectos.', 'Mide la latencia y la tasa de éxito con distintos porcentajes de pérdida.', 'Escribe un informe que relacione los resultados con las falacias y con el problema de los dos generales.'],
    deliver: 'El código, el proxy, las mediciones y el informe.' },
  hito: ['Haz que cada sede de PatioApp registre sus operaciones localmente con un identificador único y las sincronice con la central cuando hay conexión.', 'Haz idempotente en la central de PatioApp la recepción de operaciones de las sedes y demuestra con una prueba que reenviar no duplica ingresos ni cobros.']
});

S('sd', 'sd.time', { title: 'Tiempo, relojes y orden de los eventos',
  ask: '¿Qué concepto de tiempo u orden en sistemas distribuidos se aplica?',
  lesson: `
> **La idea en simple.** Si dos sedes registran cambios sobre la misma unidad y cada una pone la hora de su propio reloj, ¿cuál ocurrió primero? Si los relojes no coinciden, la hora engaña. Lamport descubrió que, para muchos propósitos, no hace falta saber la hora real: basta con saber qué eventos pudieron causar a cuáles.

## Los relojes físicos mienten
Cada computadora tiene un reloj de cuarzo que **se desvía**: unas decenas de partes por millón son normales, es decir, varios segundos por día. Además, los relojes se ajustan (y pueden saltar hacia atrás), y existen los segundos intercalares. Para sincronizarlos:
- **Algoritmo de Cristian** (Flaviu Cristian, 1989): preguntar la hora a un servidor y corregir por la mitad del tiempo de ida y vuelta.
- **NTP** (David Mills, desde 1985): una jerarquía de servidores que, en Internet, logra precisiones de milisegundos o decenas de milisegundos.
- **PTP** (IEEE 1588) en redes locales con hardware especial: microsegundos o mejor.
Aun sincronizados, dos relojes nunca coinciden exactamente, y comparar marcas de tiempo de máquinas distintas puede ordenar mal eventos que ocurrieron con milisegundos de diferencia. Regla práctica: usar el **reloj monótono** (que nunca retrocede) para medir duraciones dentro de una máquina, y desconfiar del reloj de pared para ordenar eventos entre máquinas.

## La relación "ocurrió antes"
Leslie Lamport publicó en 1978 *Time, Clocks, and the Ordering of Events in a Distributed System*, uno de los artículos más citados de la computación. Define la relación **ocurrió antes** (→) sin usar relojes:
1. Si a y b ocurren en el mismo proceso y a va primero, a → b.
2. Si a es el envío de un mensaje y b su recepción, a → b.
3. Si a → b y b → c, entonces a → c.
Si ni a → b ni b → a, los eventos son **concurrentes** (a ∥ b): ninguno pudo influir en el otro. Es un orden **parcial**: hay pares de eventos que simplemente no están ordenados.

## Relojes lógicos de Lamport
Cada proceso mantiene un contador C:
- Antes de cada evento local o envío, C = C + 1, y el mensaje lleva C.
- Al recibir un mensaje con marca t, C = máx(C, t) + 1.
Garantía: si a → b, entonces C(a) < C(b). La recíproca **no** vale: C(a) < C(b) no implica que a haya causado b. Para obtener un **orden total** (útil, por ejemplo, para que todos procesen las peticiones en el mismo orden), se desempata con el identificador del proceso: (C, id). Lamport usó esto para implementar exclusión mutua distribuida.
~~~js
// Relojes de Lamport en tres sedes; cada evento: [sede, tipo, mensaje]
function lamport(eventos) {
  const reloj = { A: 0, B: 0, C: 0 }, enviados = {}, salida = [];
  for (const [p, tipo, msg] of eventos) {
    if (tipo === 'recibir') reloj[p] = Math.max(reloj[p], enviados[msg]) + 1;
    else reloj[p]++;
    if (tipo === 'enviar') enviados[msg] = reloj[p];
    salida.push(p + ':' + tipo + (msg ? '(' + msg + ')' : '') + '=' + reloj[p]);
  }
  return salida.join('  ');
}
console.log(lamport([['A', 'local'], ['A', 'enviar', 'm1'], ['B', 'local'], ['B', 'local'], ['B', 'local'], ['B', 'recibir', 'm1'], ['B', 'enviar', 'm2'], ['C', 'recibir', 'm2']]));
~~~

## Relojes vectoriales
Para detectar la **concurrencia**, Colin Fidge y Friedemann Mattern propusieron por separado en 1988 los **relojes vectoriales**: cada proceso guarda un vector con un contador por proceso.
- En un evento local o un envío, el proceso incrementa su propia componente; el mensaje lleva el vector completo.
- Al recibir, toma el máximo componente a componente y luego incrementa la suya.
Para comparar: V(a) ≤ V(b) si cada componente de a es menor o igual que la de b. Entonces **a → b si y solo si V(a) < V(b)** (menor o igual en todo y distinto), y si ninguno es menor o igual que el otro, son concurrentes. Ejemplo: [2, 1, 0] y [2, 3, 1]: el primero es menor en todo, así que ocurrió antes; [2, 0, 0] y [1, 1, 0]: el primero gana en la componente A y el segundo en la B: concurrentes. Los relojes vectoriales permiten a las bases de datos replicadas detectar **escrituras concurrentes en conflicto** en lugar de descartar una en silencio; Dynamo usó una variante (relojes de versión). Su costo es un tamaño proporcional a la cantidad de procesos.

## Exclusión mutua distribuida
Lamport mostró en el mismo artículo de 1978 cómo usar sus relojes para que muchos procesos se turnen un recurso sin coordinador: cada uno difunde su petición con su marca (C, id), todos las ordenan igual, y entra el que tiene la menor marca cuando recibió respuesta de todos. Glenn Ricart y Ashok Agrawala lo optimizaron en 1981 reduciendo los mensajes. En la práctica, los sistemas actuales prefieren un **servicio de bloqueos** basado en consenso, como Chubby de Google, ZooKeeper o etcd, con **arrendamientos** (*leases*) que vencen solos si el dueño cae.

## Elección de líder clásica
Muchos algoritmos necesitan un coordinador. Dos algoritmos clásicos para elegirlo:
- **Del matón** (*bully*, Héctor García-Molina, 1982): quien detecta la caída del líder envía un mensaje de elección a todos los de identificador mayor; si nadie responde, se proclama líder; si alguno responde, ese continúa la elección.
- **En anillo** (Ernest Chang y Rosemary Roberts, 1979): los procesos forman un anillo y circula un mensaje con el mayor identificador visto; cuando vuelve a quien lo inició, ese identificador es el líder.
Ambos suponen tiempos de espera confiables; con particiones de red pueden elegir dos líderes. Por eso los sistemas modernos eligen líder con algoritmos de consenso y mandatos numerados, como verás en Raft.

## Relojes híbridos y TrueTime
- Los **relojes lógicos híbridos** (Sandeep Kulkarni y otros, 2014) combinan el reloj físico con un contador lógico: se parecen a la hora real (útiles para depurar y para consultas "hasta tal hora") y respetan la causalidad. Los usan CockroachDB y YugabyteDB.
- **TrueTime** de Google Spanner devuelve un intervalo [más temprano, más tarde] con la garantía de que la hora real está dentro; con relojes atómicos y GPS el intervalo es de unos pocos milisegundos, y Spanner **espera** ese margen antes de confirmar para ordenar transacciones globalmente.

## Instantáneas consistentes
¿Cómo tomar una "foto" del estado de todo el sistema (por ejemplo, para un respaldo o para detectar un interbloqueo) si no hay un instante común? K. Mani Chandy y Leslie Lamport publicaron en 1985 un algoritmo con **marcadores**: un proceso guarda su estado y envía un marcador por cada canal de salida; al recibir el primer marcador, cada proceso guarda su estado y reenvía marcadores; los mensajes que llegan por un canal entre el estado guardado y el marcador de ese canal forman el estado del canal. El resultado es un **corte consistente**: si incluye la recepción de un mensaje, incluye también su envío. Las plataformas de procesamiento de flujos como Apache Flink usan una variante para sus puntos de control.

## Ejemplo resuelto: ordenar cambios entre sedes
Dos sedes de PatioApp modifican el estado de la unidad ABC-123 sin conexión: la sede Lima la marca "liberada" y la sede Callao, "en inspección". Ambas sincronizan después.
- Con **marcas de reloj de pared**, ganaría el reloj más adelantado, aunque esté mal ajustado.
- Con **relojes de Lamport**, se obtiene un orden total consistente en todas las réplicas, pero arbitrario para eventos concurrentes.
- Con **relojes vectoriales** [Lima, Callao]: el cambio de Lima tiene [3, 1] y el de Callao [2, 2]. Ninguno es menor en todo: son **concurrentes**. PatioApp no descarta ninguno en silencio: aplica su regla de negocio ("liberada" prevalece porque implica un cobro) y registra el conflicto para que un supervisor lo revise.
La lección: el tipo de reloj determina qué pregunta puedes responder: "¿qué hora era?", "¿en qué orden lo proceso?" o "¿uno causó al otro?".`,
  links: [['sd.intro', 'el modelo asíncrono explica por qué no hay un reloj común confiable'], ['sd.repl', 'los relojes vectoriales detectan escrituras concurrentes entre réplicas'], ['plat.mobile', 'la política del último que escribe gana depende de relojes razonables']],
  read: 'Lamport (1978); van Steen y Tanenbaum, capítulo 5; Kleppmann, *Designing Data-Intensive Applications*, capítulos 8 y 9; Chandy y Lamport (1985).',
  terms: [
    ['Desvío del reloj', 'diferencia que acumula un reloj físico respecto de la hora real por imprecisión del oscilador', ['Varios segundos por día con cuarzo común.', 'NTP lo corrige periódicamente.', 'Hace engañosas las marcas de tiempo entre máquinas.']],
    ['Relación ocurrió antes', 'orden parcial de Lamport entre eventos basado en el orden local y en los mensajes', ['El envío ocurre antes que la recepción.', 'Es transitiva.', 'Los eventos no ordenados son concurrentes.']],
    ['Reloj de Lamport', 'contador lógico que se incrementa en cada evento y toma el máximo más uno al recibir un mensaje', ['Si a → b, C(a) < C(b).', 'Con el identificador del proceso da un orden total.', 'No detecta la concurrencia.']],
    ['Reloj vectorial', 'vector con un contador por proceso que permite saber si dos eventos están causalmente relacionados o son concurrentes', ['[2, 1, 0] ocurrió antes que [2, 3, 1].', 'Fidge y Mattern lo propusieron en 1988.', 'Crece con la cantidad de procesos.']],
    ['Eventos concurrentes', 'eventos entre los que no hay relación de ocurrió antes, de modo que ninguno pudo influir en el otro', ['Dos sedes que editan sin conexión.', 'Sus relojes vectoriales no son comparables.', 'Pueden generar conflictos.']],
    ['Reloj monótono', 'reloj local que nunca retrocede y sirve para medir duraciones', ['performance.now() en JavaScript.', 'No se ve afectado por ajustes de NTP.', 'No sirve para comparar entre máquinas.']],
    ['Corte consistente', 'instantánea del sistema en la que, si se incluye la recepción de un mensaje, también se incluye su envío', ['El algoritmo de Chandy y Lamport lo obtiene.', 'Sirve para respaldos y detección de interbloqueos.', 'Flink lo usa en sus puntos de control.']],
    ['Reloj lógico híbrido', 'reloj que combina la hora física con un contador lógico para parecerse a la hora real y respetar la causalidad', ['CockroachDB lo usa.', 'Kulkarni y otros lo propusieron en 2014.', 'Facilita consultas por tiempo.']]
  ],
  q: [
    ['¿Qué garantiza el reloj de Lamport?', 'Que si a ocurrió antes que b, C(a) < C(b)', ['Que si C(a) < C(b), a causó b', 'Que coincide con la hora real', 'Que detecta la concurrencia'], 'La recíproca no vale.', 3],
    ['Un proceso con C = 5 recibe un mensaje con marca 9. ¿Cuánto vale su reloj de Lamport tras la recepción?', '10', ['6', '9', '14'], 'máx(5, 9) + 1.', 2],
    ['Con relojes vectoriales, ¿cómo se relacionan [2, 1, 0] y [2, 3, 1]?', 'El primero ocurrió antes que el segundo', ['El segundo ocurrió antes', 'Son concurrentes', 'Son el mismo evento'], 'Menor o igual en todas las componentes y distinto.', 3],
    ['¿Y [2, 0, 0] con [1, 1, 0]?', 'Son concurrentes', ['El primero ocurrió antes', 'El segundo ocurrió antes', 'Son iguales'], 'Cada uno gana en una componente.', 3],
    ['¿Qué reloj conviene para medir cuánto tardó una operación dentro de una máquina?', 'El reloj monótono', ['El reloj de pared', 'Un reloj de Lamport', 'Un reloj vectorial'], 'No retrocede con los ajustes.', 2],
    ['¿Qué hace Spanner con el intervalo de incertidumbre de TrueTime?', 'Espera ese margen antes de confirmar para ordenar las transacciones globalmente', ['Lo ignora', 'Lo usa para cifrar', 'Lo envía al cliente'], 'Así las marcas de tiempo respetan el orden real.', 4],
    ['¿Qué propiedad tiene el corte del algoritmo de Chandy y Lamport?', 'Si incluye la recepción de un mensaje, incluye su envío', ['Todos los procesos se detienen a la vez', 'No incluye mensajes en tránsito', 'Usa relojes atómicos'], 'Es un corte consistente.', 4],
    { tf: 'Ordenar eventos de distintas máquinas por su reloj de pared es siempre correcto si usan NTP.', v: false, e: 'NTP deja diferencias de milisegundos o más, suficientes para ordenar mal.', l: 2 },
    { tf: 'La relación ocurrió antes es un orden parcial: algunos pares de eventos no están ordenados.', v: true, e: 'Esos pares son concurrentes.', l: 2 },
    { c: 'Escribe «compararVectores(a, b)»: devuelve "antes" si a ocurrió antes que b, "despues" si b antes que a, "igual" si son iguales y "concurrente" en otro caso.', f: 'compararVectores', p: ['a', 'b'], t: [[[[2, 1, 0], [2, 3, 1]], 'antes'], [[[2, 0, 0], [1, 1, 0]], 'concurrente'], [[[3, 3], [1, 2]], 'despues'], [[[1, 1], [1, 1]], 'igual']], sol: '  const le = a.every((x, i) => x <= b[i]), ge = a.every((x, i) => x >= b[i]);\n  if (le && ge) return "igual";\n  if (le) return "antes";\n  if (ge) return "despues";\n  return "concurrente";', l: 3 },
    { c: 'Escribe «relojesLamport(eventos)»: cada evento es [proceso, tipo, mensaje] con tipo "local", "enviar" o "recibir"; todos los relojes empiezan en 0; devuelve la lista de marcas de cada evento en orden.', f: 'relojesLamport', p: ['eventos'], t: [[[[['A', 'local'], ['A', 'enviar', 'm1'], ['B', 'recibir', 'm1']]], [1, 2, 3]], [[[['A', 'enviar', 'x'], ['B', 'local'], ['B', 'local'], ['B', 'local'], ['B', 'recibir', 'x']]], [1, 1, 2, 3, 4]], [[[['P', 'local'], ['Q', 'local']]], [1, 1]]], sol: '  const c = {}, env = {}, r = [];\n  for (const [p, t, m] of eventos) {\n    c[p] = c[p] || 0;\n    c[p] = t === "recibir" ? Math.max(c[p], env[m]) + 1 : c[p] + 1;\n    if (t === "enviar") env[m] = c[p];\n    r.push(c[p]);\n  }\n  return r;', l: 3 },
    { c: 'Escribe «recibirVectorial(propio, mensaje, i)»: al recibir, toma el máximo componente a componente y luego incrementa la componente i del propio proceso.', f: 'recibirVectorial', p: ['propio', 'mensaje', 'i'], t: [[[[1, 0, 0], [0, 2, 0], 0], [2, 2, 0]], [[[0, 3, 1], [2, 1, 1], 1], [2, 4, 1]], [[[0], [5], 0], [6]]], sol: '  const v = propio.map((x, k) => Math.max(x, mensaje[k]));\n  v[i]++;\n  return v;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var c = R.int(0, 20), t = R.int(0, 20); g.input(2, 'Un proceso tiene reloj de Lamport ' + c + ' y recibe un mensaje con marca ' + t + '. ¿Cuánto vale su reloj tras la recepción?', Math.max(c, t) + 1, 'máx(' + c + ', ' + t + ') + 1.'); });
    g.times(10, function (R) { var a = [R.int(0, 4), R.int(0, 4), R.int(0, 4)], b = [R.int(0, 4), R.int(0, 4), R.int(0, 4)]; var le = a.every(function (x, i) { return x <= b[i]; }), ge = a.every(function (x, i) { return x >= b[i]; }); var r = le && ge ? 'Son iguales' : le ? 'El primero ocurrió antes' : ge ? 'El segundo ocurrió antes' : 'Son concurrentes'; g.mcq(3, '¿Cómo se relacionan los relojes vectoriales [' + a.join(', ') + '] y [' + b.join(', ') + ']?', r, ['Son iguales', 'El primero ocurrió antes', 'El segundo ocurrió antes', 'Son concurrentes'].filter(function (x) { return x !== r; }), 'Compara componente a componente.'); });
    var rl = [['Saber cuánto tardó una consulta en esta máquina', 'Reloj monótono'], ['Saber si una edición pudo haber visto la otra', 'Reloj vectorial'], ['Dar a todas las réplicas un mismo orden total de operaciones', 'Reloj de Lamport con desempate por proceso'], ['Mostrar al usuario la hora de un registro', 'Reloj de pared sincronizado con NTP']];
    rl.forEach(function (x) { g.mcq(3, '¿Qué reloj conviene? ' + x[0], x[1], ['Reloj monótono', 'Reloj vectorial', 'Reloj de Lamport con desempate por proceso', 'Reloj de pared sincronizado con NTP'].filter(function (y) { return y !== x[1]; }), 'Cada reloj responde a una pregunta distinta.'); });
  },
  checks: [
    ['¿Por qué no se pueden ordenar eventos de distintas máquinas por su hora local?', 'Porque los relojes se desvían y se ajustan, y aun sincronizados difieren en milisegundos, suficientes para ordenar mal.'],
    ['Enuncia las tres reglas de la relación ocurrió antes.', 'Orden dentro de un proceso, envío antes que recepción, y transitividad.'],
    ['Explica las reglas del reloj de Lamport y qué garantiza.', 'Incrementar antes de cada evento y, al recibir, tomar el máximo con la marca del mensaje más uno; garantiza que si a → b, C(a) < C(b).'],
    ['¿Qué aportan los relojes vectoriales frente a los de Lamport?', 'Permiten detectar si dos eventos son concurrentes: a → b si y solo si V(a) < V(b).'],
    ['¿Qué es un corte consistente y para qué sirve?', 'Una instantánea en la que toda recepción incluida tiene su envío incluido; sirve para respaldos, puntos de control y detección de propiedades globales.']
  ],
  cites: ['Lamport, L. (1978). Time, Clocks, and the Ordering of Events in a Distributed System. *Communications of the ACM*, 21(7).', 'Fidge, C. (1988). Timestamps in Message-Passing Systems That Preserve the Partial Ordering. *11th Australian Computer Science Conference*.', 'Mattern, F. (1988). Virtual Time and Global States of Distributed Systems. *Parallel and Distributed Algorithms*.', 'Chandy, K. M. y Lamport, L. (1985). Distributed Snapshots: Determining Global States of Distributed Systems. *ACM Transactions on Computer Systems*, 3(1).', 'Mills, D. (1991). Internet Time Synchronization: The Network Time Protocol. *IEEE Transactions on Communications*, 39(10).', 'Ricart, G. y Agrawala, A. (1981). An Optimal Algorithm for Mutual Exclusion in Computer Networks. *Communications of the ACM*, 24(1).', 'Garcia-Molina, H. (1982). Elections in a Distributed Computing System. *IEEE Transactions on Computers*, C-31(1).', 'Kulkarni, S. et al. (2014). Logical Physical Clocks. *OPODIS 2014*.'],
  project: { t: 'Simulador de relojes y causalidad',
    goal: 'Visualizar el orden de los eventos en un sistema distribuido.',
    steps: ['Simula varios procesos que intercambian mensajes con demoras aleatorias y relojes físicos con desvío.', 'Asigna a cada evento su marca de reloj físico, de Lamport y vectorial.', 'Dibuja el diagrama espacio-tiempo y marca los pares concurrentes detectados con relojes vectoriales.', 'Muestra un caso en que el reloj físico ordena mal dos eventos causalmente relacionados.', 'Implementa el algoritmo de instantáneas de Chandy y Lamport y verifica que el corte es consistente.'],
    deliver: 'El simulador, los diagramas y un informe con los casos encontrados.' },
  hito: ['Agrega a cada operación sincronizada de PatioApp un reloj vectorial por sede y detecta en la central las ediciones concurrentes de una misma unidad.', 'Define y aplica en PatioApp la regla de negocio para resolver ediciones concurrentes y registra cada conflicto para revisión humana.']
});

S('sd', 'sd.repl', { title: 'Replicación y quórums',
  ask: '¿Qué concepto de replicación se aplica?',
  lesson: `
> **La idea en simple.** Guardar copias de un documento en tres cajones distintos protege de que se pierda uno. El problema aparece al cambiarlo: si actualizas la copia del primer cajón y te interrumpen, ahora las copias dicen cosas distintas. Toda la teoría de la replicación trata de cómo mantener varias copias útiles y coherentes cuando las actualizaciones, la red y las máquinas fallan.

## Para qué replicar
- **Disponibilidad:** el sistema sigue funcionando si se cae una réplica.
- **Durabilidad:** los datos sobreviven a la pérdida de un disco o de un centro de datos.
- **Latencia:** cada usuario lee de la réplica más cercana.
- **Rendimiento de lectura:** más réplicas atienden más lecturas.
El costo es mantenerlas de acuerdo. Si los datos no cambiaran, replicar sería trivial; toda la dificultad está en los **cambios**.

## Replicación de máquinas de estados
Lamport (1978) y Fred Schneider (1990, en un tutorial clásico) formularon la idea más general: si varias réplicas empiezan en el mismo estado y ejecutan **las mismas operaciones deterministas en el mismo orden**, terminan en el mismo estado. Replicar se reduce entonces a acordar un **registro** ordenado de operaciones, que es exactamente el problema del consenso (lo verás en la unidad de consenso). Las bases de datos que envían su WAL a las réplicas aplican esta misma idea.

## Replicación con líder
El esquema más común: una réplica es el **líder** (primaria) y recibe todas las escrituras; las demás son **seguidoras** y aplican los cambios en el mismo orden.
- **Síncrona:** el líder espera la confirmación de los seguidores antes de responder. No pierde datos confirmados si el líder cae, pero un seguidor lento o caído frena todas las escrituras.
- **Asíncrona:** el líder responde enseguida y envía los cambios después. Rápida, pero si el líder cae pueden perderse escrituras confirmadas, y las lecturas de los seguidores pueden estar atrasadas.
- **Semisíncrona:** el líder espera a **al menos un** seguidor; un equilibrio común.
La **conmutación por error** (*failover*) es la parte delicada: detectar que el líder cayó (con tiempos de espera, que pueden equivocarse), elegir un nuevo líder (el seguidor más actualizado) y redirigir a los clientes. Si el líder viejo en realidad estaba vivo y aislado, podría seguir aceptando escrituras: dos líderes a la vez, el temido **cerebro dividido**. Martin Kleppmann recomienda los **tokens de cercado** (*fencing tokens*): cada líder recibe un número creciente y el almacenamiento rechaza las órdenes con un número menor al último visto.

## Replicación con varios líderes
Con **varios líderes** (por ejemplo, uno por centro de datos, o cada teléfono sin conexión), cada uno acepta escrituras y las propaga a los demás. Mejora la latencia y tolera cortes entre regiones, pero aparecen **conflictos**: dos líderes modifican el mismo dato a la vez. Formas de resolverlos:
- **El último que escribe gana** (por marca de tiempo): simple, pero descarta escrituras en silencio y depende de los relojes.
- **Conservar todas las versiones** concurrentes (detectadas con relojes vectoriales) y que la aplicación o el usuario las fusione.
- **CRDT** (Marc Shapiro y otros, 2011): tipos de datos cuyas operaciones conmutan y se fusionan siempre al mismo resultado, como contadores, conjuntos o listas colaborativas.

## Replicación sin líder y quórums
**Dynamo** (Giuseppe DeCandia y otros, Amazon, 2007) popularizó la replicación **sin líder**, que siguieron Cassandra y Riak. El cliente (o un coordinador) envía cada escritura a las N réplicas de una clave y la considera exitosa cuando responden W; cada lectura consulta a R réplicas y se queda con la versión más nueva. Si se cumple:
:::flow W + R > N
todo conjunto de lectura se **solapa** con todo conjunto de escritura en al menos una réplica, así que la lectura ve la última escritura confirmada. Con N = 3, una configuración típica es W = 2 y R = 2: tolera una réplica caída tanto para leer como para escribir. W = 3 y R = 1 da lecturas muy rápidas pero ninguna escritura si cae una réplica; W = 1 y R = 1 es muy disponible pero puede leer datos viejos. Mecanismos que mantienen las réplicas al día:
- **Reparación en la lectura:** si una lectura detecta una réplica atrasada, le escribe la versión nueva.
- **Antientropía:** un proceso de fondo compara réplicas y copia lo que falte, usando **árboles de Merkle** (Ralph Merkle, 1987) para encontrar las diferencias intercambiando solo hashes.
- **Entrega sugerida** (*hinted handoff*): si una réplica está caída, otra guarda temporalmente sus escrituras y se las entrega al volver (un "quórum descuidado" que mejora la disponibilidad pero debilita la garantía del solapamiento).
~~~js
// ¿Qué configuraciones de quórum garantizan leer la última escritura y cuántas caídas toleran?
const N = 5;
for (const [W, R] of [[3, 3], [5, 1], [1, 5], [2, 2], [4, 2]]) {
  const solapan = W + R > N;
  console.log('W=' + W + ' R=' + R + ':', solapan ? 'lecturas actualizadas' : 'puede leer datos viejos',
    '· escrituras toleran', N - W, 'caídas · lecturas toleran', N - R);
}
~~~

## Replicación en cadena
Robbert van Renesse y Fred Schneider propusieron en 2004 la **replicación en cadena**: las réplicas forman una cadena; las escrituras entran por la cabeza y avanzan hasta la cola, que confirma; las lecturas se hacen en la cola, que solo tiene datos ya presentes en todas. Da consistencia fuerte con buen rendimiento y se usa en varios sistemas de almacenamiento.

## Dónde poner las réplicas
Tres réplicas en el mismo rack no protegen de que se queme la fuente de energía del rack. Las fallas **correlacionadas** (un rack, un centro de datos, una región, una versión de software defectuosa desplegada en todas a la vez) son las que realmente tumban sistemas replicados. Por eso las nubes ofrecen **zonas de disponibilidad**: centros de datos cercanos pero con energía, red y refrigeración independientes. La práctica habitual es repartir las réplicas en tres zonas: sobrevive a la pérdida de una zona completa y mantiene la latencia baja entre réplicas (pocos milisegundos).

## Replicación geográfica
Replicar entre **regiones** lejanas (Lima, Virginia, Fráncfort) protege incluso de desastres regionales, pero cada viaje entre ellas cuesta decenas o cientos de milisegundos. Una escritura síncrona que espera a otra región paga esa latencia en cada operación. Las opciones habituales son: replicación asíncrona entre regiones con un pequeño riesgo de perder los últimos datos ante un desastre; un líder por región para los datos de esa región (por ejemplo, los patios peruanos con líder en Sudamérica); o bases globales con consenso que aceptan la latencia a cambio de consistencia fuerte. La elección depende del RPO aceptable y de dónde están los usuarios.

## Ejemplo resuelto: la configuración de tarifas replicada
La configuración de tarifas de PatioApp se lee en cada cobro y cambia pocas veces al mes. Se replica en 3 nodos con quórums:
- Si se eligiera W = 1 y R = 1, un cambio de tarifa podría no verse durante un rato en algunos cobros: inaceptable para el negocio.
- Con W = 2 y R = 2 (W + R = 4 > 3), toda lectura ve la última tarifa confirmada y el sistema tolera la caída de un nodo para leer y para escribir.
- Como las lecturas son mucho más frecuentes que las escrituras y las lecturas con R = 2 cuestan dos viajes, se agrega una **caché** en cada servidor que se invalida al recibir la notificación de cambio, con un tiempo de vida máximo de 30 segundos por si se pierde la notificación.
- Cada versión de la configuración lleva un número creciente; los servidores nunca reemplazan una versión por otra más vieja, lo que protege de mensajes atrasados.
- Los tres nodos se reparten en tres zonas de disponibilidad distintas, para que un problema eléctrico en un centro de datos no deje sin tarifas a ningún patio.`,
  links: [['bd2.dist', 'las réplicas de lectura y el retraso de réplica se vieron en Bases de Datos II'], ['sd.time', 'los relojes vectoriales detectan escrituras concurrentes entre líderes'], ['sd.consensus', 'la replicación de máquinas de estados se apoya en el consenso']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulo 5; DeCandia y otros (2007); Schneider (1990); van Steen y Tanenbaum, capítulo 7.',
  terms: [
    ['Replicación de máquinas de estados', 'técnica de mantener réplicas idénticas ejecutando las mismas operaciones deterministas en el mismo orden', ['Las réplicas aplican el mismo registro.', 'Schneider la explicó en 1990.', 'Reduce la replicación al consenso.']],
    ['Replicación asíncrona', 'replicación en que el líder confirma la escritura sin esperar a los seguidores', ['Es rápida.', 'Puede perder escrituras si el líder cae.', 'Causa retraso de réplica.']],
    ['Conmutación por error', 'proceso de reemplazar a un líder caído por un seguidor', ['Elegir al seguidor más actualizado.', 'Redirigir a los clientes.', 'Puede causar cerebro dividido si se equivoca.']],
    ['Cerebro dividido', 'situación en que dos nodos creen ser líderes al mismo tiempo y aceptan escrituras', ['El líder viejo estaba aislado, no caído.', 'Corrompe los datos.', 'Se evita con tokens de cercado.']],
    ['Token de cercado', 'número creciente que acompaña las órdenes de cada líder para que el almacenamiento rechace las de líderes anteriores', ['El líder 34 no puede escribir tras ver el 35.', 'Kleppmann lo recomienda.', 'Neutraliza a líderes zombis.']],
    ['Quórum', 'cantidad mínima de réplicas que deben responder para que una lectura o escritura se considere exitosa', ['W = 2 de N = 3.', 'Si W + R > N, las lecturas ven la última escritura.', 'Dynamo lo popularizó.']],
    ['Reparación en la lectura', 'mecanismo que actualiza una réplica atrasada cuando una lectura detecta que tiene una versión vieja', ['La lectura consulta varias réplicas.', 'Escribe la versión nueva en la atrasada.', 'Ayuda a converger.']],
    ['Árbol de Merkle', 'árbol de hashes que permite encontrar qué partes difieren entre dos réplicas intercambiando pocos datos', ['Se comparan las raíces y se baja por las ramas distintas.', 'Merkle lo propuso en 1987.', 'Lo usan Cassandra y Git.']]
  ],
  q: [
    ['Con N = 3, ¿qué configuración garantiza que las lecturas vean la última escritura?', 'W = 2 y R = 2', ['W = 1 y R = 1', 'W = 1 y R = 2', 'W = 0 y R = 3'], 'W + R = 4 > 3.', 2],
    ['Con N = 5, W = 3 y R = 3, ¿cuántas réplicas caídas toleran las escrituras?', '2', ['3', '1', '0'], 'N − W = 2.', 2],
    ['¿Qué riesgo tiene la replicación asíncrona si cae el líder?', 'Perder escrituras ya confirmadas que no llegaron a los seguidores', ['Que las lecturas sean más lentas', 'Que no se pueda leer nunca', 'Ninguno'], 'El líder confirmó sin esperar.', 3],
    ['¿Qué es el cerebro dividido?', 'Dos nodos que se creen líderes a la vez', ['Un líder sin seguidores', 'Una réplica atrasada', 'Un quórum mayor que N'], 'Ocurre si la conmutación por error se equivoca.', 3],
    ['¿Para qué sirven los árboles de Merkle en la antientropía?', 'Para encontrar las diferencias entre réplicas intercambiando solo hashes', ['Para cifrar los datos', 'Para elegir líder', 'Para ordenar eventos'], 'Se compara de la raíz hacia las hojas distintas.', 3],
    ['¿Qué principio permite replicar cualquier servicio determinista?', 'Ejecutar las mismas operaciones en el mismo orden en todas las réplicas', ['Usar el último que escribe gana', 'Replicar solo las lecturas', 'Usar relojes de pared'], 'Replicación de máquinas de estados.', 3],
    ['¿Qué desventaja tiene "el último que escribe gana" con varios líderes?', 'Descarta escrituras concurrentes en silencio y depende de los relojes', ['Es muy complejo', 'Nunca converge', 'Exige consenso'], 'Las CRDT o las versiones concurrentes evitan perder datos.', 3],
    { tf: 'Con W + R > N, todo conjunto de lectura comparte al menos una réplica con todo conjunto de escritura.', v: true, e: 'Es el principio de solapamiento de los quórums.', l: 2 },
    { tf: 'La replicación síncrona total sigue aceptando escrituras aunque un seguidor esté caído.', v: false, e: 'Espera a todos; un seguidor caído bloquea las escrituras.', l: 2 },
    { c: 'Escribe «quorumConsistente(n, w, r)» que devuelva true si w + r > n.', f: 'quorumConsistente', p: ['n', 'w', 'r'], t: [[[3, 2, 2], true], [[3, 1, 1], false], [[5, 3, 3], true], [[5, 2, 3], false]], sol: '  return w + r > n;', l: 1 },
    { c: 'Escribe «leerQuorum(respuestas, r)»: respuestas es una lista de {valor, version}; si hay al menos r, devuelve el valor de la versión más alta; si no, null.', f: 'leerQuorum', p: ['respuestas', 'r'], t: [[[[{ valor: 'a', version: 1 }, { valor: 'b', version: 3 }], 2], 'b'], [[[{ valor: 'a', version: 1 }], 2], null], [[[{ valor: 'x', version: 2 }, { valor: 'y', version: 2 }, { valor: 'z', version: 1 }], 3], 'x']], sol: '  if (respuestas.length < r) return null;\n  let m = respuestas[0];\n  for (const x of respuestas) if (x.version > m.version) m = x;\n  return m.valor;', l: 2 },
    { c: 'Escribe «toleranciaQuorum(n, w, r)»: devuelve [caídas que toleran las escrituras, caídas que toleran las lecturas].', f: 'toleranciaQuorum', p: ['n', 'w', 'r'], t: [[[3, 2, 2], [1, 1]], [[5, 5, 1], [0, 4]], [[5, 3, 3], [2, 2]]], sol: '  return [n - w, n - r];', l: 1 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var n = R.pick([3, 5, 7]), w = R.int(1, n), r = R.int(1, n); g.mcq(2, 'Con N = ' + n + ', W = ' + w + ' y R = ' + r + ', ¿las lecturas ven siempre la última escritura confirmada?', w + r > n ? 'Sí, porque W + R > N' : 'No, porque W + R ≤ N', [w + r > n ? 'No, porque W + R ≤ N' : 'Sí, porque W + R > N', 'Solo si N es par', 'Solo con replicación en cadena'], 'Regla del solapamiento de quórums.'); g.input(2, 'Con N = ' + n + ' y W = ' + w + ', ¿cuántas réplicas caídas toleran las escrituras?', n - w, 'N − W.'); });
    var mod = [['Una sola réplica recibe escrituras y las demás las copian en orden', 'Con líder'], ['Cada centro de datos acepta escrituras y las propaga a los otros', 'Varios líderes'], ['El cliente escribe en W de N réplicas y lee de R', 'Sin líder'], ['Las escrituras entran por la cabeza y se confirman en la cola', 'En cadena']];
    mod.forEach(function (m) { g.mcq(2, '¿Qué modelo de replicación es este? ' + m[0], m[1], ['Con líder', 'Varios líderes', 'Sin líder', 'En cadena'].filter(function (x) { return x !== m[1]; }), 'Cuatro esquemas de replicación.'); });
  },
  checks: [
    ['Compara la replicación síncrona y la asíncrona.', 'La síncrona no pierde escrituras confirmadas pero se frena con seguidores lentos; la asíncrona es rápida pero puede perder escrituras y tener retraso de réplica.'],
    ['¿Qué es el cerebro dividido y cómo lo evitan los tokens de cercado?', 'Dos líderes simultáneos; cada líder recibe un número creciente y el almacenamiento rechaza órdenes con números menores al último visto.'],
    ['Explica por qué W + R > N garantiza lecturas actualizadas.', 'Porque todo conjunto de R réplicas comparte al menos una con todo conjunto de W, y esa tiene la última escritura confirmada.'],
    ['¿Cómo se resuelven los conflictos con varios líderes?', 'Con el último que escribe gana, conservando versiones concurrentes para fusionarlas, o con CRDT que se fusionan siempre al mismo resultado.'],
    ['¿Qué hacen la reparación en la lectura y la antientropía?', 'La primera actualiza réplicas atrasadas detectadas al leer; la segunda compara réplicas en segundo plano con árboles de Merkle y copia lo que falta.']
  ],
  cites: ['Schneider, F. (1990). Implementing Fault-Tolerant Services Using the State Machine Approach: A Tutorial. *ACM Computing Surveys*, 22(4).', 'DeCandia, G. et al. (2007). Dynamo: Amazon’s Highly Available Key-value Store. *SOSP 2007*.', 'van Renesse, R. y Schneider, F. (2004). Chain Replication for Supporting High Throughput and Availability. *OSDI 2004*.', 'Shapiro, M., Preguiça, N., Baquero, C. y Zawirski, M. (2011). Conflict-Free Replicated Data Types. *SSS 2011*.', 'Merkle, R. (1987). A Digital Signature Based on a Conventional Encryption Function. *CRYPTO 1987*.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*, capítulo 5. O’Reilly.'],
  project: { t: 'Almacén replicado con quórums',
    goal: 'Implementar replicación sin líder con quórums y observar sus garantías.',
    steps: ['Implementa un almacén clave-valor con N réplicas simuladas que pueden caerse y responder lento.', 'Implementa escrituras con W confirmaciones y lecturas con R respuestas que devuelvan la versión más nueva.', 'Agrega reparación en la lectura y antientropía con árboles de Merkle.', 'Prueba distintas combinaciones de N, W y R con fallas y mide cuántas lecturas devuelven datos viejos.', 'Explica los resultados con la regla W + R > N.'],
    deliver: 'El código, las pruebas y un informe con las mediciones.' },
  hito: ['Replica la configuración de tarifas de PatioApp en tres nodos con W = 2 y R = 2, con número de versión creciente para no aceptar versiones viejas.', 'Agrega a PatioApp una caché de la configuración con invalidación por notificación y tiempo de vida máximo, y prueba que un cambio se ve en todos los servidores en menos de 30 segundos.']
});
})();
