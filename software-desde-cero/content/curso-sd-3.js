(function () {
var S = SDC.S;

S('sd', 'sd.part', { title: 'Particionamiento, hashing consistente y balanceo',
  ask: '¿Qué técnica de particionamiento o balanceo se aplica?',
  lesson: `
> **La idea en simple.** Una biblioteca con un millón de libros no cabe en un estante: se reparte en muchos, y hace falta una regla para saber en cuál está cada libro sin recorrerlos todos. Si un día se agregan estantes, la regla ideal movería solo unos pocos libros, no la biblioteca entera. Particionar datos entre servidores es exactamente ese problema.

## Por qué particionar
La replicación copia los mismos datos en varios nodos; el **particionamiento** (también llamado *sharding*) reparte datos **distintos** entre nodos, para que el volumen total y la carga superen lo que cabe en una máquina. Ambas técnicas se combinan: cada partición se replica en varios nodos. Los objetivos son dos:
- Repartir los datos y las consultas de forma **pareja**, sin nodos sobrecargados (*hot spots*).
- Poder **agregar o quitar nodos** moviendo la menor cantidad posible de datos.

## Por rango o por hash
- **Por rango de clave:** cada partición guarda un intervalo contiguo (de "A" a "F", de "G" a "M"…), como los tomos de una enciclopedia. Permite consultas por rango eficientes, pero si las claves son, por ejemplo, fechas, todas las escrituras de hoy caen en la misma partición. Bigtable (Chang y otros, 2006), HBase y Spanner usan rangos que se dividen automáticamente cuando crecen.
- **Por hash de la clave:** se aplica una función hash y se usa el resultado para elegir la partición. Reparte uniformemente, pero se pierden las consultas por rango.

## El problema del módulo
La forma ingenua de particionar por hash es «nodo = hash(clave) mod N». Funciona hasta que cambia N: al pasar de 4 a 5 nodos, casi **todas** las claves cambian de nodo, porque el resto de dividir por 5 rara vez coincide con el de dividir por 4. En un sistema de caché eso significa invalidar casi toda la caché de golpe y descargar todo el tráfico sobre la base de datos.
~~~js
// ¿Qué fracción de claves cambia de nodo al pasar de N a N+1 con "hash mod N"?
function fraccionMovida(n, claves) {
  let movidas = 0;
  for (let k = 0; k < claves; k++) if (k % n !== k % (n + 1)) movidas++;
  return (100 * movidas / claves).toFixed(1) + '%';
}
console.log('4 → 5 nodos:', fraccionMovida(4, 100000));      // la mayoría cambia
console.log('10 → 11 nodos:', fraccionMovida(10, 100000));
~~~

## Hashing consistente
David Karger y sus colegas del MIT propusieron en 1997 el **hashing consistente**, que dio origen a la empresa Akamai. La idea: imaginar el espacio de hash como un **anillo** (de 0 a 2³²−1, que vuelve a 0). Cada nodo se ubica en el anillo aplicando el hash a su nombre, y cada clave se asigna al **primer nodo que se encuentra avanzando en sentido horario** desde su posición. Al agregar un nodo, solo se mueven las claves entre él y su predecesor: en promedio, 1/N de las claves, en lugar de casi todas.

Un problema: con pocos nodos, sus posiciones al azar dejan arcos de tamaños muy distintos y la carga queda dispareja. La solución son los **nodos virtuales**: cada servidor físico ocupa muchas posiciones (por ejemplo, 100 o 256) en el anillo. Así la carga se reparte mejor, y un servidor más potente puede tener más posiciones. Dynamo (2007) y Cassandra usan este esquema; Cassandra asigna 256 *tokens* por nodo por defecto en sus versiones clásicas (las recientes usan menos con un algoritmo de asignación más inteligente).

## Hashing por rendezvous
Una alternativa más simple, de David Thaler y Chinya Ravishankar (1998): para cada clave, calcular hash(clave, nodo) para **todos** los nodos y elegir el de mayor valor. Al quitar un nodo, solo se reasignan sus claves; al agregar uno, solo se le mueven las claves para las que gana. No necesita anillo ni nodos virtuales, a cambio de calcular N hashes por consulta (aceptable con decenas de nodos). Google propuso en 2014 el *jump consistent hash* de John Lamping y Eric Veach, que asigna claves a N particiones numeradas sin memoria extra.

## Particiones calientes
Ningún hash resuelve el caso de una **clave** extremadamente popular: la cuenta de una celebridad o el producto en oferta. Todas sus peticiones van a la misma partición. Técnicas:
- **Dividir la clave:** agregar un sufijo aleatorio (de 00 a 99) a las escrituras de esa clave, repartiéndolas en 100 particiones; las lecturas deben consultar las 100 y combinar.
- **Cachés por delante:** Rajesh Nishtala y sus colegas describieron en 2013 cómo Facebook escala **memcached** a miles de servidores, con técnicas como *leases* para evitar que miles de clientes recalculen a la vez un valor que expiró.
- **El poder de dos opciones:** Michael Mitzenmacher mostró (tesis de 1996, revisión de 2001) que, al asignar tareas, elegir **dos** servidores al azar y enviar al menos cargado reduce exponencialmente la carga máxima comparado con elegir uno al azar. Muchos balanceadores de carga, como los de Envoy y NGINX, ofrecen esta estrategia.

## Consultas que cruzan particiones
Particionar bien es elegir una clave que haga que **casi todas** las operaciones toquen una sola partición. Las que cruzan particiones son caras:
- Un **join** entre tablas particionadas por claves distintas obliga a mover datos entre nodos. Por eso se suele **coubicar** datos que se consultan juntos: particionar pedidos y sus líneas por el mismo identificador de cliente, como hace Spanner con sus tablas intercaladas (*interleaved tables*).
- Una **transacción** que escribe en dos particiones necesita confirmación en dos fases o una saga, como viste en la unidad anterior.
- Un **agregado global** (cuántas unidades hay en todo el sistema) requiere consultar todas las particiones; si se pide a menudo, conviene mantenerlo precalculado con eventos.
Una buena prueba de diseño: listar las diez consultas más frecuentes del sistema y comprobar cuántas particiones toca cada una con la clave elegida.

## Índices secundarios y reequilibrio
Consultar por algo que no es la clave de partición (buscar unidades por placa cuando se particiona por patio) obliga a elegir:
- **Índice local por partición:** cada partición indexa sus datos; una consulta debe preguntar a **todas** (dispersión y recolección, *scatter-gather*), lo que es costoso y sensible a la partición más lenta.
- **Índice global particionado por el término:** el índice de placas se particiona por placa; la lectura va a una sola partición, pero cada escritura actualiza dos lugares, normalmente de forma asíncrona.
Para **reequilibrar** al agregar nodos, muchos sistemas crean desde el inicio muchas más particiones que nodos (por ejemplo, 1000 particiones para 10 nodos) y mueven particiones enteras; así nunca cambia la función que asigna claves a particiones. Elasticsearch y Riak funcionan así. El movimiento debe ser gradual y, en muchos sistemas, aprobado por un operador, porque mover datos consume red y puede empeorar una sobrecarga.

## Ejemplo resuelto: particionar PatioApp para muchas empresas
PatioApp crece y atiende a cientos de empresas con miles de patios. Diseño:
1. **Clave de partición:** el identificador de la empresa. Casi todas las consultas son de una sola empresa, así que se resuelven en una partición, y los datos de un cliente quedan aislados de los demás.
2. **Asignación:** 4096 particiones lógicas (hash del identificador módulo 4096) que se asignan a servidores con una tabla guardada en etcd. Al agregar un servidor, se le mueven algunas particiones enteras.
3. **Cliente grande:** la empresa con 300 patios es una partición caliente. Se le asigna una partición dedicada y, dentro de ella, se subparticiona por patio.
4. **Búsqueda global por placa** (para la policía o el seguro): un índice global particionado por placa, actualizado de forma asíncrona mediante eventos; se acepta que una unidad recién registrada tarde unos segundos en aparecer.
5. **Caché de tarifas:** en un clúster de cachés con hashing consistente y nodos virtuales, para que agregar un nodo de caché no invalide toda la caché.`,
  links: [['m4.hash', 'el hashing consistente generaliza las tablas hash a muchos nodos'], ['sd.repl', 'cada partición se replica en varios nodos'], ['bd2.dist', 'las bases distribuidas combinan particionamiento y replicación']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulo 6; Karger y otros (1997); DeCandia y otros (2007, Dynamo); Nishtala y otros (2013).',
  terms: [
    ['Particionamiento', 'reparto de datos distintos entre varios nodos para superar la capacidad de una sola máquina', ['También se llama sharding.', 'Se combina con replicación.', 'Cada partición vive en uno o varios nodos.']],
    ['Partición por rango', 'esquema en que cada partición guarda un intervalo contiguo de claves', ['Bigtable divide rangos al crecer.', 'Permite consultas por rango.', 'Puede concentrar escrituras con claves de fecha.']],
    ['Hashing consistente', 'esquema que ubica nodos y claves en un anillo de hash y asigna cada clave al siguiente nodo, moviendo pocas claves al cambiar los nodos', ['Karger y otros, 1997.', 'Al agregar un nodo se mueve cerca de 1/N de las claves.', 'Dynamo y Cassandra lo usan.']],
    ['Nodo virtual', 'cada una de las múltiples posiciones que un servidor físico ocupa en el anillo de hashing consistente', ['Reparte mejor la carga.', 'Un servidor potente tiene más.', 'Cassandra usaba 256 por nodo.']],
    ['Hashing por rendezvous', 'esquema que asigna cada clave al nodo con mayor hash(clave, nodo)', ['Thaler y Ravishankar, 1998.', 'No necesita anillo.', 'Calcula N hashes por consulta.']],
    ['Partición caliente', 'partición que recibe una parte desproporcionada de la carga', ['La cuenta de una celebridad.', 'Se alivia dividiendo la clave.', 'También se llama hot spot.']],
    ['Poder de dos opciones', 'estrategia de elegir dos servidores al azar y usar el menos cargado, que reduce mucho la carga máxima', ['Mitzenmacher la analizó.', 'La ofrecen Envoy y NGINX.', 'Casi tan buena como mirar todos.']],
    ['Dispersión y recolección', 'consulta que se envía a todas las particiones y combina sus respuestas', ['Buscar por placa con índices locales.', 'Su latencia depende de la partición más lenta.', 'También se llama scatter-gather.']]
  ],
  q: [
    ['Con «hash mod N», ¿qué ocurre al pasar de 4 a 5 nodos?', 'La mayoría de las claves cambia de nodo', ['Solo se mueve 1/5 de las claves', 'Ninguna clave cambia', 'Se pierden datos'], 'Por eso se usa hashing consistente.', 2],
    ['En el hashing consistente, ¿a qué nodo se asigna una clave?', 'Al primer nodo que aparece avanzando en sentido horario desde su posición en el anillo', ['Al nodo con menor carga', 'A todos los nodos', 'Al nodo de menor identificador'], 'El anillo vuelve a 0 al final.', 2],
    ['¿Para qué sirven los nodos virtuales?', 'Para repartir la carga de forma más pareja y dar más peso a servidores más potentes', ['Para cifrar las claves', 'Para replicar en otra región', 'Para eliminar el anillo'], 'Cada servidor ocupa muchas posiciones.', 3],
    ['¿Qué desventaja tiene particionar por rango con claves de fecha?', 'Las escrituras recientes se concentran en una partición', ['No permite consultas por rango', 'Es imposible dividir rangos', 'Usa demasiada memoria'], 'Se crea una partición caliente.', 3],
    ['¿Qué propone el poder de dos opciones?', 'Elegir dos servidores al azar y enviar la tarea al menos cargado', ['Duplicar cada tarea', 'Usar dos centros de datos', 'Elegir siempre el mismo servidor'], 'Reduce exponencialmente la carga máxima.', 3],
    ['Con índices secundarios locales a cada partición, ¿cómo se busca por un atributo que no es la clave?', 'Consultando todas las particiones y combinando las respuestas', ['Consultando una sola partición', 'Es imposible', 'Leyendo solo del líder'], 'Dispersión y recolección.', 3],
    ['¿Por qué muchos sistemas crean muchas más particiones que nodos?', 'Para reequilibrar moviendo particiones enteras sin cambiar la asignación de claves a particiones', ['Para ahorrar disco', 'Porque los nodos lo exigen', 'Para evitar la replicación'], 'Elasticsearch y Riak funcionan así.', 4],
    { tf: 'El hashing consistente resuelve el problema de una sola clave extremadamente popular.', v: false, e: 'Una clave siempre va al mismo nodo; hay que dividirla o usar cachés.', l: 3 },
    { tf: 'El particionamiento reparte datos distintos entre nodos, mientras que la replicación copia los mismos datos.', v: true, e: 'Ambas técnicas suelen combinarse.', l: 1 },
    { c: 'Escribe «nodoPara(hash, posiciones)»: posiciones es una lista ordenada de posiciones de nodos en un anillo; devuelve la primera posición mayor o igual que hash, o la primera de la lista si no hay ninguna (se da la vuelta).', f: 'nodoPara', p: ['hash', 'posiciones'], t: [[[15, [10, 20, 30]], 20], [[35, [10, 20, 30]], 10], [[20, [10, 20, 30]], 20], [[0, [5]], 5]], sol: '  for (const p of posiciones) if (p >= hash) return p;\n  return posiciones[0];', l: 2 },
    { c: 'Escribe «movidasMod(n, claves)»: cuántas de las claves 0, 1, …, claves−1 cambian de nodo al pasar de «k mod n» a «k mod (n+1)».', f: 'movidasMod', p: ['n', 'claves'], t: [[[2, 6], 4], [[1, 4], 2], [[3, 12], 9]], sol: '  let m = 0;\n  for (let k = 0; k < claves; k++) if (k % n !== k % (n + 1)) m++;\n  return m;', l: 2 },
    { c: 'Escribe «ganadorRendezvous(puntajes)»: puntajes es una lista de [nodo, hash(clave, nodo)]; devuelve el nodo con mayor valor (el primero si empatan).', f: 'ganadorRendezvous', p: ['puntajes'], t: [[[[['a', 5], ['b', 9], ['c', 2]]], 'b'], [[[['x', 3], ['y', 3]]], 'x'], [[[['solo', 0]]], 'solo']], sol: '  let mejor = puntajes[0];\n  for (const q of puntajes) if (q[1] > mejor[1]) mejor = q;\n  return mejor[0];', l: 3 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var pos = g.R.sample([5, 12, 20, 33, 41, 50, 64, 77, 85, 93], 4).sort(function (a, b) { return a - b; }), h = R.int(0, 99); var r = pos[0]; for (var i = 0; i < pos.length; i++) if (pos[i] >= h) { r = pos[i]; break; } g.input(3, 'En un anillo de 0 a 99, los nodos están en las posiciones ' + pos.join(', ') + '. ¿En qué posición está el nodo que guarda una clave con hash ' + h + '?', r, 'El primer nodo con posición mayor o igual; si no hay, se da la vuelta al primero.'); });
    g.times(6, function (R) { var n = R.int(4, 20); g.input(2, 'Con hashing consistente y ' + n + ' nodos de carga pareja, al agregar uno más, ¿aproximadamente qué porcentaje de claves se mueve? (redondea al entero)', Math.round(100 / (n + 1)), 'El nodo nuevo recibe cerca de 1/(N+1) de las claves.'); });
    var tec = [['Asignar al primer nodo en sentido horario en un anillo', 'Hashing consistente'], ['Elegir el nodo con mayor hash(clave, nodo)', 'Hashing por rendezvous'], ['Cada partición guarda un intervalo contiguo de claves', 'Partición por rango'], ['Elegir dos servidores al azar y usar el menos cargado', 'Poder de dos opciones']];
    tec.forEach(function (t) { g.mcq(2, '¿Qué técnica es esta? ' + t[0], t[1], ['Hashing consistente', 'Hashing por rendezvous', 'Partición por rango', 'Poder de dos opciones'].filter(function (x) { return x !== t[1]; }), 'Técnicas de particionamiento y balanceo.'); });
  },
  checks: [
    ['¿Por qué «hash mod N» es mala idea cuando cambian los nodos?', 'Porque al cambiar N casi todas las claves cambian de nodo, lo que obliga a mover casi todos los datos o invalida casi toda la caché.'],
    ['Explica el hashing consistente y el papel de los nodos virtuales.', 'Nodos y claves se ubican en un anillo; cada clave va al siguiente nodo; al cambiar un nodo se mueve cerca de 1/N de las claves; los nodos virtuales reparten mejor la carga.'],
    ['Compara particionar por rango y por hash.', 'Por rango permite consultas por intervalo pero puede crear particiones calientes; por hash reparte uniformemente pero pierde las consultas por rango.'],
    ['¿Cómo se trata una clave extremadamente popular?', 'Dividiéndola con sufijos en varias particiones, poniendo cachés por delante o asignándole recursos dedicados.'],
    ['¿Qué opciones hay para índices secundarios en datos particionados?', 'Índices locales (lectura en todas las particiones) o globales particionados por el término (lectura en una, escritura en dos, normalmente asíncrona).']
  ],
  cites: ['Karger, D. et al. (1997). Consistent Hashing and Random Trees: Distributed Caching Protocols for Relieving Hot Spots on the World Wide Web. *STOC 1997*.', 'Thaler, D. y Ravishankar, C. (1998). Using Name-Based Mappings to Increase Hit Rates. *IEEE/ACM Transactions on Networking*, 6(1).', 'Mitzenmacher, M. (2001). The Power of Two Choices in Randomized Load Balancing. *IEEE Transactions on Parallel and Distributed Systems*, 12(10).', 'Chang, F. et al. (2006). Bigtable: A Distributed Storage System for Structured Data. *OSDI 2006*.', 'Nishtala, R. et al. (2013). Scaling Memcache at Facebook. *NSDI 2013*.', 'Lamping, J. y Veach, E. (2014). A Fast, Minimal Memory, Consistent Hash Algorithm. arXiv:1406.2294.'],
  project: { t: 'Anillo de hashing consistente',
    goal: 'Comparar estrategias de particionamiento con mediciones.',
    steps: ['Implementa «hash mod N», hashing consistente con y sin nodos virtuales, y hashing por rendezvous.', 'Asigna un millón de claves y mide la desviación de la carga entre nodos en cada estrategia.', 'Agrega y quita nodos y mide qué fracción de claves se mueve.', 'Simula una clave caliente con el 10 % del tráfico y aplica la división por sufijos.', 'Implementa el poder de dos opciones en un balanceador simulado y compara la carga máxima con la elección al azar.'],
    deliver: 'El código, las tablas de resultados y un breve análisis.' },
  hito: ['Define en un ADR la clave de partición de PatioApp para múltiples empresas, la cantidad de particiones lógicas y cómo se tratan los clientes grandes.', 'Implementa la caché de tarifas de PatioApp sobre varios nodos con hashing consistente y nodos virtuales, y mide cuántas entradas se pierden al agregar un nodo.']
});

S('sd', 'sd.byz', { title: 'Fallas bizantinas y cadenas de bloques',
  ask: '¿Qué concepto de tolerancia a fallas bizantinas se aplica?',
  lesson: `
> **La idea en simple.** Hasta ahora supusimos que un servidor puede caerse o tardar, pero nunca **mentir**. ¿Y si algunos nodos están hackeados, tienen errores de memoria o pertenecen a alguien que quiere hacer trampa? Ponerse de acuerdo cuando algunos participantes pueden decir cosas distintas a cada uno es mucho más difícil, y es el problema que resuelven, de formas muy distintas, los sistemas aeroespaciales y las cadenas de bloques.

## Los generales bizantinos
Leslie Lamport, Robert Shostak y Marshall Pease publicaron en 1982 *The Byzantine Generals Problem*: varios generales rodean una ciudad y deben acordar atacar o retirarse comunicándose con mensajeros, pero algunos generales son **traidores** que envían mensajes contradictorios a distintos compañeros. Demostraron que, con mensajes orales (que no se pueden autenticar), el acuerdo es posible **solo si hay más de dos tercios de leales**: hacen falta **n ≥ 3f + 1** generales para tolerar f traidores. Con 3 generales y 1 traidor es imposible. Con **mensajes firmados** (que no se pueden falsificar), el problema se puede resolver con cualquier número de traidores, aunque los protocolos prácticos siguen necesitando 3f + 1 réplicas para combinar seguridad y avance en una red asíncrona.

Lamport contó que eligió la palabra "bizantinos" para no ofender a nadie con nacionalidades actuales. El trabajo nació de la seguridad de vuelo: el proyecto SIFT de SRI estudiaba computadoras de aviones que debían seguir funcionando aunque un procesador se comportara de forma arbitraria.

## Por qué 3f + 1
La intuición: el sistema debe avanzar sin esperar a f nodos (que pueden estar caídos o callados), así que actúa con quórums de n − f. Pero entre esos que respondieron puede haber f traidores. Para que dos quórums cualesquiera compartan al menos **un nodo honesto**, su intersección debe tener más de f nodos: 2(n − f) − n > f, que da n > 3f. Compárese con las caídas simples, donde basta con que dos quórums se toquen en un nodo cualquiera (n ≥ 2f + 1).
~~~js
// Réplicas necesarias y fallas toleradas según el modelo de fallas
const toleraCaidas = (n) => Math.floor((n - 1) / 2);
const toleraBizantinos = (n) => Math.floor((n - 1) / 3);
for (const n of [3, 4, 5, 7, 10]) console.log(n + ' nodos → caídas: ' + toleraCaidas(n) + ', bizantinos: ' + toleraBizantinos(n));
~~~

## PBFT: tolerancia práctica
Durante casi dos décadas los protocolos bizantinos se consideraron demasiado lentos. Miguel Castro y Barbara Liskov presentaron en 1999 **PBFT** (*Practical Byzantine Fault Tolerance*), que replicó un sistema de archivos NFS con solo un 3 % de sobrecosto. Funciona con un **primario** y tres fases (preprepare, prepare, commit): una réplica acepta una operación cuando recibió mensajes coincidentes de **2f + 1** réplicas, lo que garantiza que al menos f + 1 honestas están de acuerdo. Si el primario se comporta mal o deja de avanzar, las réplicas lo reemplazan con un **cambio de vista**. Su debilidad: cada réplica habla con todas, así que el número de mensajes crece con n², lo que limita el sistema a decenas de nodos. Protocolos posteriores, como **HotStuff** (Yin y otros, 2019), reducen la comunicación a lineal y son la base de varias cadenas de bloques con validadores conocidos.

## El problema de Sybil
Los protocolos bizantinos clásicos suponen que se **conoce** la lista de participantes. En una red abierta, donde cualquiera se une sin permiso, un atacante puede crear miles de identidades falsas y superar el tercio de traidores. John Douceur llamó a esto en 2002 el **ataque Sybil** (por un libro sobre una paciente con múltiples personalidades) y demostró que, sin una autoridad que certifique identidades, no se puede evitar en general. Las soluciones prácticas vinculan el poder de voto a un **recurso escaso** que no se puede multiplicar gratis.

## Bitcoin y la prueba de trabajo
En 2008, una persona o grupo bajo el seudónimo **Satoshi Nakamoto** publicó *Bitcoin: A Peer-to-Peer Electronic Cash System*. Su idea central:
- Las transacciones se agrupan en **bloques**, y cada bloque incluye el hash del anterior, formando una **cadena**: cambiar un bloque viejo obliga a rehacer todos los siguientes.
- Para agregar un bloque hay que resolver un acertijo: encontrar un número (el *nonce*) tal que el hash del bloque empiece con cierta cantidad de ceros. Encontrarlo exige muchísimos intentos; **verificarlo**, uno solo. Es la **prueba de trabajo**, idea que Cynthia Dwork y Moni Naor propusieron en 1992 contra el correo no deseado y que Adam Back usó en Hashcash (1997).
- Los nodos aceptan la cadena con **más trabajo acumulado**. Un atacante necesitaría más poder de cómputo que todos los honestos juntos (el llamado **ataque del 51 %**).
El consenso de Bitcoin es **probabilístico**: un bloque nunca es final del todo, pero la probabilidad de que se revierta cae exponencialmente con cada bloque posterior; por costumbre se esperan 6 confirmaciones (cerca de una hora). El costo es enorme: la red de Bitcoin consume una cantidad de electricidad comparable a la de un país mediano, según el índice de la Universidad de Cambridge.

## Prueba de participación
**Ethereum** abandonó la prueba de trabajo en septiembre de 2022 (el evento llamado *The Merge*) y adoptó la **prueba de participación**: los validadores depositan una garantía en la moneda de la red, el protocolo elige al azar quién propone cada bloque y los demás votan; quien firma dos bloques contradictorios pierde parte de su depósito (*slashing*). La Fundación Ethereum estimó una reducción de consumo de energía de más del 99,9 %. El poder de voto queda ligado al capital depositado, y la finalidad se alcanza tras dos épocas de votos de los validadores (unos 13 minutos).

## Finalidad y bifurcaciones
Los protocolos de la familia de PBFT ofrecen **finalidad determinista**: cuando una operación se confirma, nunca se revierte mientras no se supere el límite de f nodos bizantinos. Las cadenas con prueba de trabajo, en cambio, pueden tener **bifurcaciones** temporales: dos mineros encuentran un bloque casi a la vez y la red queda dividida hasta que una rama crece más y la otra se abandona, con sus transacciones devueltas a la espera. Por eso un comercio que recibe un pago en Bitcoin espera varias confirmaciones antes de entregar algo valioso. Este contraste ilustra un equilibrio que aparece en todo el curso: los protocolos con participantes conocidos son rápidos y finales; los abiertos admiten a cualquiera, pero pagan en latencia, energía o capital inmovilizado.

## Cuándo usar (y cuándo no) una cadena de bloques
La tolerancia bizantina tiene un costo alto en mensajes, latencia o energía. Tiene sentido cuando participantes que **no confían entre sí** y **sin una autoridad común** deben mantener un registro compartido. Si existe una organización en la que todos confían (un banco, un ministerio, la empresa dueña del sistema), una base de datos replicada con consenso tolerante a caídas, firmas digitales y un registro de auditoría es casi siempre más simple, rápida y barata. Muchos proyectos que añadieron una cadena de bloques en la década de 2010 la retiraron después por esa razón. En sistemas cerrados, la tolerancia bizantina se usa donde un error de hardware no puede tolerarse, como en el control de vuelo de aviones y naves espaciales.

## Ejemplo resuelto: ¿necesita PatioApp una cadena de bloques?
Una aseguradora propone registrar en una cadena de bloques las inspecciones de las unidades, para que nadie pueda alterarlas después. Análisis:
1. **¿Quiénes escriben?** PatioApp y sus operadores. **¿Quiénes desconfían?** La aseguradora y los dueños de las unidades desconfían de que PatioApp modifique registros viejos.
2. **¿Hace falta consenso bizantino?** No: hay un único escritor. El problema es la **integridad verificable**, no el acuerdo entre muchos.
3. **Solución:** un **registro de solo agregar** encadenado por hashes (cada inspección incluye el hash de la anterior, como un árbol de Merkle o un registro de transparencia), firmado por PatioApp, y la publicación periódica del hash más reciente a la aseguradora. Si PatioApp alterara una inspección vieja, el hash publicado ya no coincidiría.
4. Resultado: la misma garantía que buscaba la aseguradora, sin una red de validadores ni comisiones por transacción.`,
  links: [['sd.consensus', 'el consenso bizantino generaliza el consenso con caídas a nodos maliciosos'], ['m16.crypto', 'las firmas digitales y los hashes criptográficos sostienen estos protocolos'], ['sd.intro', 'las fallas bizantinas son el modelo de fallas más general']],
  read: 'Lamport, Shostak y Pease (1982); Castro y Liskov (1999); Nakamoto (2008); Kleppmann, capítulo 8, sección sobre fallas bizantinas; Narayanan y otros, *Bitcoin and Cryptocurrency Technologies* (2016).',
  terms: [
    ['Falla bizantina', 'falla en la que un nodo puede comportarse de forma arbitraria, incluso enviando mensajes contradictorios o maliciosos', ['Un nodo hackeado.', 'Un error de memoria que corrompe mensajes.', 'Es el modelo de fallas más general.']],
    ['Problema de los generales bizantinos', 'problema de lograr acuerdo cuando algunos participantes son traidores que mienten', ['Lamport, Shostak y Pease, 1982.', 'Requiere n ≥ 3f + 1 sin firmas.', 'Nació de la seguridad de vuelo.']],
    ['PBFT', 'protocolo práctico de tolerancia a fallas bizantinas con primario, tres fases y cambio de vista', ['Castro y Liskov, 1999.', 'Necesita 2f + 1 mensajes coincidentes.', 'Su comunicación crece con n².']],
    ['Ataque Sybil', 'ataque en que un adversario crea muchas identidades falsas para ganar influencia en una red abierta', ['Douceur, 2002.', 'Se mitiga ligando votos a un recurso escaso.', 'Rompe los supuestos de 3f + 1.']],
    ['Prueba de trabajo', 'mecanismo que exige resolver un acertijo costoso de calcular pero fácil de verificar para agregar un bloque', ['Bitcoin busca hashes con ceros al inicio.', 'Dwork y Naor, 1992.', 'Consume mucha energía.']],
    ['Prueba de participación', 'mecanismo que liga el poder de voto a una garantía depositada que se pierde si se actúa de forma contradictoria', ['Ethereum la adoptó en 2022.', 'Usa slashing.', 'Reduce el consumo de energía en más de un 99,9 %.']],
    ['Ataque del 51 %', 'ataque en que quien controla la mayoría del poder de cómputo puede reescribir la cadena reciente', ['Permite gastar dos veces la misma moneda.', 'Es más fácil en redes pequeñas.', 'Por eso se esperan confirmaciones.']],
    ['Registro de solo agregar', 'registro en que cada entrada incluye el hash de la anterior, de modo que alterar una entrada vieja es detectable', ['Registro de transparencia de certificados.', 'Árbol de Merkle.', 'Da integridad sin consenso bizantino.']]
  ],
  q: [
    ['¿Cuántos nodos hacen falta para tolerar 1 nodo bizantino sin mensajes firmados?', '4', ['2', '3', '5'], 'n ≥ 3f + 1.', 2],
    ['¿Cuántos nodos bizantinos tolera un sistema de 10 nodos?', '3', ['4', '5', '2'], '⌊(10 − 1) / 3⌋ = 3.', 2],
    ['¿Por qué un sistema bizantino necesita más réplicas que uno que solo tolera caídas?', 'Porque dos quórums deben compartir al menos un nodo honesto, no solo un nodo cualquiera', ['Porque los mensajes son más grandes', 'Porque usa más disco', 'No necesita más'], 'De ahí n > 3f.', 4],
    ['¿Qué limita la escalabilidad de PBFT?', 'Que cada réplica se comunica con todas, con mensajes que crecen con n²', ['Que no usa firmas', 'Que necesita relojes atómicos', 'Que solo tolera caídas'], 'HotStuff lo reduce a lineal.', 3],
    ['¿Qué problema impide aplicar los protocolos bizantinos clásicos en una red abierta?', 'El ataque Sybil: crear muchas identidades falsas', ['El ataque de diccionario', 'La inyección SQL', 'La fragmentación IP'], 'Douceur, 2002.', 3],
    ['¿Qué hace que la prueba de trabajo de Bitcoin funcione?', 'Encontrar el nonce cuesta muchos intentos, pero verificarlo cuesta uno', ['Es imposible de verificar', 'Usa contraseñas', 'La resuelve un servidor central'], 'Asimetría entre resolver y verificar.', 3],
    ['Una sola empresa escribe registros y otros quieren detectar si los altera. ¿Qué solución es más adecuada?', 'Un registro de solo agregar encadenado por hashes y firmado, con el hash publicado a terceros', ['Una cadena de bloques pública con prueba de trabajo', 'PBFT con 100 validadores', 'Borrar los registros viejos'], 'No hace falta consenso bizantino con un solo escritor.', 4],
    { tf: 'El consenso de Bitcoin es determinista: un bloque es definitivo apenas se agrega.', v: false, e: 'Es probabilístico; la reversión se vuelve improbable con cada bloque posterior.', l: 3 },
    { tf: 'Ethereum reemplazó la prueba de trabajo por la prueba de participación en 2022.', v: true, e: 'Fue el evento llamado The Merge, en septiembre de 2022.', l: 1 },
    { c: 'Escribe «toleraBizantinos(n)»: cuántos nodos bizantinos tolera un sistema de n nodos.', f: 'toleraBizantinos', p: ['n'], t: [[[4], 1], [[3], 0], [[10], 3], [[7], 2]], sol: '  return Math.floor((n - 1) / 3);', l: 1 },
    { c: 'Escribe «cumpleDificultad(hashHex, ceros)»: true si la cadena hexadecimal empieza con al menos «ceros» caracteres "0".', f: 'cumpleDificultad', p: ['hashHex', 'ceros'], t: [[['000af3', 3], true], [['00af3', 3], false], [['abc', 0], true]], sol: '  return hashHex.startsWith("0".repeat(ceros));', l: 1 },
    { c: 'Escribe «cadenaValida(bloques)»: cada bloque es {hash, prev}; devuelve true si el prev de cada bloque (desde el segundo) es igual al hash del bloque anterior.', f: 'cadenaValida', p: ['bloques'], t: [[[[{ hash: 'a1', prev: '' }, { hash: 'b2', prev: 'a1' }, { hash: 'c3', prev: 'b2' }]], true], [[[{ hash: 'a1', prev: '' }, { hash: 'b2', prev: 'zz' }]], false], [[[{ hash: 'a1', prev: '' }]], true]], sol: '  for (let i = 1; i < bloques.length; i++) if (bloques[i].prev !== bloques[i - 1].hash) return false;\n  return true;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var f = R.int(1, 10); g.input(2, '¿Cuántos nodos hacen falta como mínimo para tolerar ' + f + ' nodos bizantinos?', 3 * f + 1, 'n ≥ 3f + 1.'); });
    g.times(6, function (R) { var f = R.int(1, 10); g.input(2, '¿Cuántos nodos hacen falta como mínimo para tolerar ' + f + ' caídas (sin comportamiento malicioso)?', 2 * f + 1, 'n ≥ 2f + 1.'); });
    var cas = [['Bancos que no confían entre sí sin un regulador común deben mantener un registro compartido', 'Consenso bizantino o cadena de bloques'], ['Una empresa quiere replicar su base de datos en tres zonas', 'Consenso tolerante a caídas (Raft o Paxos)'], ['Una empresa escribe registros y un auditor quiere detectar alteraciones', 'Registro de solo agregar firmado'], ['El control de vuelo de un avión debe funcionar aunque un procesador se comporte arbitrariamente', 'Consenso bizantino o cadena de bloques']];
    cas.forEach(function (c) { g.mcq(4, '¿Qué solución es la más adecuada? ' + c[0], c[1], ['Consenso bizantino o cadena de bloques', 'Consenso tolerante a caídas (Raft o Paxos)', 'Registro de solo agregar firmado', 'Una sola base de datos sin réplicas'].filter(function (x) { return x !== c[1]; }), 'Se elige el mecanismo más simple que cubre el modelo de fallas y de confianza.'); });
  },
  checks: [
    ['¿Qué es una falla bizantina y en qué se diferencia de una caída?', 'Un nodo bizantino puede comportarse arbitrariamente o mentir; uno caído simplemente deja de responder.'],
    ['Justifica por qué hacen falta 3f + 1 nodos para tolerar f bizantinos.', 'Los quórums de n − f deben compartir más de f nodos para incluir uno honesto: 2(n − f) − n > f, es decir, n > 3f.'],
    ['¿Qué es el ataque Sybil y cómo lo enfrentan Bitcoin y Ethereum?', 'Crear identidades falsas para ganar votos; Bitcoin liga el voto al trabajo de cómputo y Ethereum a una garantía depositada.'],
    ['¿Por qué el consenso de Bitcoin es probabilístico?', 'Porque una cadena con más trabajo puede reemplazar la actual; la probabilidad cae exponencialmente con cada bloque nuevo, pero nunca es cero.'],
    ['¿Cuándo no conviene usar una cadena de bloques?', 'Cuando hay una autoridad en la que todos confían o un único escritor: una base replicada con firmas y auditoría es más simple y barata.']
  ],
  cites: ['Lamport, L., Shostak, R. y Pease, M. (1982). The Byzantine Generals Problem. *ACM TOPLAS*, 4(3).', 'Castro, M. y Liskov, B. (1999). Practical Byzantine Fault Tolerance. *OSDI 1999*.', 'Douceur, J. (2002). The Sybil Attack. *IPTPS 2002*.', 'Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*.', 'Dwork, C. y Naor, M. (1992). Pricing via Processing or Combatting Junk Mail. *CRYPTO 1992*.', 'Yin, M. et al. (2019). HotStuff: BFT Consensus with Linearity and Responsiveness. *PODC 2019*.'],
  project: { t: 'Cadena de bloques de juguete y registro auditable',
    goal: 'Entender la prueba de trabajo y compararla con un registro de solo agregar.',
    steps: ['Implementa bloques encadenados por hashes SHA-256 y verifica que alterar un bloque viejo rompe la cadena.', 'Agrega prueba de trabajo y mide cuánto tarda en minarse un bloque con 3, 4, 5 y 6 ceros de dificultad.', 'Simula dos mineros honestos y uno atacante con distintos porcentajes de cómputo y mide con qué frecuencia el atacante reescribe los últimos bloques.', 'Implementa un registro de solo agregar firmado con publicación periódica del último hash.', 'Compara ambas soluciones en costo, latencia y garantías.'],
    deliver: 'El código, las mediciones y la comparación.' },
  hito: ['Implementa para las inspecciones de PatioApp un registro de solo agregar encadenado por hashes y una verificación que detecte cualquier alteración.', 'Escribe un ADR que evalúe si PatioApp necesita una cadena de bloques para la aseguradora y justifique la solución elegida.']
});

S('sd', 'sd.ops', { title: 'Sistemas distribuidos en producción: latencia de cola y fallas grises',
  ask: '¿Qué técnica de operación de sistemas distribuidos se aplica?',
  lesson: `
> **La idea en simple.** Un sistema distribuido casi nunca falla "todo de una vez": falla un poco, en algunos lugares, de formas raras. Un servidor responde lento pero responde; un reintento bienintencionado de miles de clientes derriba un servicio que se estaba recuperando. Esta unidad trata de cómo se comportan estos sistemas en la vida real y de las técnicas que evitan que un problema pequeño se convierta en uno grande.

## Latencia de cola
Jeffrey Dean y Luiz André Barroso publicaron en 2013 *The Tail at Scale*, uno de los artículos más citados sobre operación de sistemas. Su observación: cuando una petición de usuario se reparte entre muchos servidores y hay que esperar a **todos**, la latencia la marca el **más lento**. Si cada servidor tarda más de un segundo solo en el 1 % de los casos, una petición que consulta 100 servidores tarda más de un segundo con probabilidad 1 − 0,99¹⁰⁰ ≈ **63 %**. Lo raro en un servidor se vuelve lo normal en el sistema.
~~~js
// Probabilidad de que una petición que consulta n servidores tope con al menos uno lento
const probabilidadLenta = (n, p) => 1 - Math.pow(1 - p, n);
for (const n of [1, 10, 100, 1000]) console.log(n + ' servidores → ' + (100 * probabilidadLenta(n, 0.01)).toFixed(1) + '% de peticiones lentas');
~~~
Por eso se miden **percentiles**, no promedios: el p50 (mediana) dice cómo le va al usuario típico; el p99 y el p99,9, cómo le va a los menos afortunados, que en un sistema con abanico grande son casi todos. Gil Tene popularizó la advertencia de que muchas herramientas miden mal la cola por la **omisión coordinada**: si el generador de carga espera cada respuesta antes de enviar la siguiente, las demoras largas producen menos muestras y desaparecen de las estadísticas.

## Técnicas contra la latencia de cola
Dean y Barroso propusieron técnicas para **tolerar** la variabilidad en lugar de eliminarla:
- **Peticiones de respaldo** (*hedged requests*): si una petición no respondió en el tiempo del p95, se envía una copia a otra réplica y se usa la primera respuesta. Con solo un 2 % de peticiones extra, reportaron bajar el p99,9 de una consulta de 1800 ms a 74 ms.
- **Peticiones atadas** (*tied requests*): se envía a dos réplicas a la vez, y la que empieza a procesar avisa a la otra para que cancele.
- **Micro-particiones** y **réplicas selectivas** de los datos más consultados, para mover carga rápido.
- **Respuestas parciales**: un buscador puede responder con los resultados del 98 % de los servidores si el resto se demora.

## Reintentos sin tormentas
Reintentar es necesario, pero los reintentos ingenuos son una de las principales causas de caídas graves. Si un servicio se sobrecarga y mil clientes reintentan de inmediato, la carga se duplica justo cuando menos puede soportarla. Las reglas:
- **Espera exponencial**: esperar base · 2ⁱ tras el intento i, con un techo.
- **Jitter**: agregar aleatoriedad a la espera. Marc Brooker, de AWS, mostró en 2015 con simulaciones que sin jitter los clientes reintentan sincronizados en oleadas; con *full jitter* (esperar un tiempo al azar entre 0 y la espera exponencial) el trabajo total cae drásticamente.
- **Presupuesto de reintentos**: limitar los reintentos a un porcentaje de las peticiones (por ejemplo, 10 %), para que nunca multipliquen la carga.
- **Reintentar en una sola capa**: si cada una de 5 capas reintenta 3 veces, una falla en el fondo genera 3⁵ = 243 peticiones.
- **Solo operaciones idempotentes**, o con claves de idempotencia.

## Disyuntores y descarte de carga
Michael Nygard describió en *Release It!* (2007) el **disyuntor** (*circuit breaker*): como el interruptor eléctrico de una casa, un componente que, tras varias fallas seguidas al llamar a un servicio, **deja de llamarlo** durante un tiempo y falla de inmediato; luego deja pasar unas pocas peticiones de prueba (estado "semiabierto") y, si funcionan, se cierra. Protege al servicio enfermo y evita que los hilos del cliente se agoten esperando. Netflix lo popularizó con su biblioteca Hystrix.

El **descarte de carga** (*load shedding*) es la técnica complementaria del lado del servidor: cuando está saturado, rechaza rápido una parte de las peticiones (con un error 503 o 429) en lugar de aceptarlas todas y responder lento a todas. Es mejor atender bien al 80 % que mal al 100 %. Se suele priorizar: primero se descartan las peticiones de menor importancia (análisis, precargas) y por último las críticas (pagos).

## Fallas grises y metaestables
Peng Huang y sus colegas de Microsoft describieron en 2017 las **fallas grises**: el sistema está enfermo, pero el detector de fallas cree que está sano. Ejemplo: un servidor responde a los latidos (el proceso vive) pero sus discos están tan lentos que cada petición real tarda 30 segundos. El balanceador sigue enviándole tráfico. La lección es que la salud debe medirse **como la ven los usuarios** (latencia y errores de peticiones reales), no solo con latidos.

Nathan Bronson y sus coautores describieron en 2021 las **fallas metaestables**: un sistema que funcionaba bien recibe un **disparador** (un pico de tráfico, una caché que se vacía) y entra en un estado malo que **se sostiene solo** aunque el disparador desaparezca. Ejemplo típico: la caché se reinicia, la base se sobrecarga, las peticiones expiran, los clientes reintentan, la carga sigue alta, la caché nunca vuelve a llenarse. Para salir hay que **cortar el ciclo** (descartar carga, desactivar reintentos) y no solo esperar.

## Observabilidad distribuida
Con una petición que pasa por diez servicios, los registros de cada uno no bastan para saber dónde se fue el tiempo. Benjamin Sigelman y sus colegas describieron en 2010 **Dapper**, el sistema de **trazado distribuido** de Google: cada petición recibe un identificador de traza que se propaga entre servicios, y cada tramo (*span*) registra su inicio, fin y su padre, formando un árbol que muestra el camino completo. Dapper inspiró Zipkin (Twitter) y Jaeger (Uber), y hoy el estándar es **OpenTelemetry**, del CNCF, que unifica trazas, métricas y registros. Para limitar el costo, se muestrea: Dapper guardaba alrededor de una de cada mil peticiones.

## Ingeniería del caos
Netflix creó en 2010 **Chaos Monkey**, un programa que apaga instancias al azar en producción durante el horario laboral, para obligar a los equipos a diseñar servicios que toleren caídas. Ali Basiri y sus colegas formalizaron en 2016 la **ingeniería del caos**: definir el estado estable en métricas de negocio, plantear una hipótesis ("si cae una zona, las reproducciones por segundo no bajan"), inyectar fallas reales de forma controlada y con un **radio de impacto** limitado, y buscar diferencias. No se trata de romper por romper: es un experimento científico sobre el propio sistema. Las pruebas de Jepsen que viste en la unidad de consistencia aplican el mismo espíritu a bases de datos.

## Ejemplo resuelto: el día que se vació la caché de PatioApp
Un lunes a las 8:00, un despliegue reinicia el clúster de caché de tarifas. Lo que pasa y lo que se cambia:
1. **Sin caché**, cada cálculo de tarifa consulta la base; la base pasa de 200 a 5000 consultas por segundo y su latencia sube a 4 segundos.
2. Los clientes móviles tienen un tiempo de espera de 2 segundos y reintentan 3 veces **sin jitter**: la carga se multiplica y la caché nunca se llena. Es una **falla metaestable**.
3. **Corrección inmediata:** activar el descarte de carga en la API (rechazar con 503 las consultas no críticas, como el historial) y desactivar los reintentos automáticos con una bandera de configuración; la caché se llena en dos minutos.
4. **Correcciones permanentes:** espera exponencial con *full jitter* y presupuesto de reintentos del 10 % en los clientes; un disyuntor hacia la base en el servicio de tarifas; que una sola petición recalcule cada tarifa expirada mientras las demás esperan (*request coalescing*); calentar la caché antes de enviarle tráfico tras un despliegue; y un experimento de caos mensual que reinicia un nodo de caché para comprobar que el sistema lo tolera.
5. **Medición:** alertas sobre el p99 de la API y la tasa de errores vista por los usuarios, y trazas de OpenTelemetry que mostraron en minutos que el tiempo se iba en la base.`,
  links: [['sd.intro', 'las fallas parciales e indistinguibles son el origen de estos problemas'], ['m15.obs', 'la observabilidad de un servicio se extiende al trazado distribuido'], ['sd.tx', 'los reintentos seguros requieren idempotencia']],
  read: 'Dean y Barroso, *The Tail at Scale* (2013); Brooker, *Exponential Backoff and Jitter* (AWS, 2015); Nygard, *Release It!*; Beyer y otros, *Site Reliability Engineering* (Google, 2016), capítulos 21 y 22.',
  terms: [
    ['Latencia de cola', 'latencia de los percentiles altos (p99, p99,9), que domina cuando una petición depende de muchos servidores', ['1 % lento en cada servidor da 63 % con 100.', 'Dean y Barroso, 2013.', 'Se mide con percentiles, no promedios.']],
    ['Petición de respaldo', 'copia de una petición enviada a otra réplica si la primera tarda más que un umbral', ['Se envía tras el p95.', 'Se usa la primera respuesta.', 'Cuesta pocas peticiones extra.']],
    ['Jitter', 'aleatoriedad agregada a la espera entre reintentos para que los clientes no reintenten sincronizados', ['Full jitter: al azar entre 0 y la espera.', 'Brooker lo analizó en 2015.', 'Evita oleadas de reintentos.']],
    ['Disyuntor', 'componente que deja de llamar a un servicio tras varias fallas y prueba periódicamente si se recuperó', ['Estados cerrado, abierto y semiabierto.', 'Nygard, Release It!.', 'Hystrix lo popularizó.']],
    ['Descarte de carga', 'rechazo rápido de parte de las peticiones cuando un servidor está saturado', ['Responde 503 o 429.', 'Se descartan primero las menos importantes.', 'Mejor atender bien al 80 %.']],
    ['Falla gris', 'falla en que el sistema funciona mal para los usuarios pero el detector de fallas lo considera sano', ['Responde latidos pero tarda 30 s en lo real.', 'Huang y otros, 2017.', 'Se detecta midiendo como el usuario.']],
    ['Falla metaestable', 'estado malo que se sostiene solo después de que desaparece el disparador', ['Caché vacía y reintentos que la mantienen vacía.', 'Bronson y otros, 2021.', 'Hay que cortar el ciclo.']],
    ['Trazado distribuido', 'registro del recorrido de una petición por varios servicios como un árbol de tramos con un identificador común', ['Dapper de Google, 2010.', 'OpenTelemetry es el estándar.', 'Se muestrea para limitar el costo.']]
  ],
  q: [
    ['Cada servidor es lento el 1 % de las veces. ¿Qué porcentaje aproximado de peticiones que consultan 100 servidores será lento?', '63 %', ['1 %', '10 %', '100 %'], '1 − 0,99¹⁰⁰ ≈ 0,63.', 3],
    ['¿Por qué se miden percentiles altos en lugar del promedio?', 'Porque el promedio esconde la experiencia de los usuarios más afectados, que con abanicos grandes son la mayoría', ['Porque son más fáciles de calcular', 'Porque el promedio siempre es mayor', 'Por costumbre'], 'p99 y p99,9.', 2],
    ['¿Para qué se agrega jitter a la espera exponencial?', 'Para que los clientes no reintenten todos a la vez en oleadas', ['Para cifrar los reintentos', 'Para que la espera sea siempre la misma', 'Para eliminar los reintentos'], 'Brooker, 2015.', 2],
    ['Cinco capas reintentan cada una 3 veces. ¿Cuántas peticiones puede generar una falla en la capa más profunda?', '243', ['15', '8', '125'], '3⁵ = 243.', 3],
    ['¿Qué hace un disyuntor en estado abierto?', 'Falla de inmediato sin llamar al servicio protegido', ['Llama al servicio el doble', 'Reinicia el servidor', 'Guarda las peticiones para siempre'], 'Luego pasa a semiabierto para probar.', 2],
    ['Un servidor responde a los latidos pero cada petición real tarda 30 segundos. ¿Qué tipo de falla es?', 'Una falla gris', ['Una falla bizantina', 'Una caída limpia', 'Una partición de red'], 'El detector lo cree sano.', 3],
    ['¿Qué caracteriza a una falla metaestable?', 'Se sostiene sola aunque desaparezca el disparador', ['Se corrige sola siempre', 'Solo ocurre en bases de datos', 'No tiene disparador'], 'Hay que cortar el ciclo de retroalimentación.', 4],
    { tf: 'La ingeniería del caos consiste en romper sistemas al azar sin hipótesis ni límites.', v: false, e: 'Son experimentos con hipótesis, métricas de estado estable y radio de impacto limitado.', l: 2 },
    { tf: 'Las peticiones de respaldo pueden reducir mucho la latencia de cola con un pequeño aumento de carga.', v: true, e: 'Dean y Barroso reportaron grandes mejoras con un 2 % de peticiones extra.', l: 3 },
    { c: 'Escribe «backoff(intento, base, techo)»: espera exponencial min(techo, base · 2^intento).', f: 'backoff', p: ['intento', 'base', 'techo'], t: [[[0, 100, 5000], 100], [[3, 100, 5000], 800], [[10, 100, 5000], 5000]], sol: '  return Math.min(techo, base * Math.pow(2, intento));', l: 1 },
    { c: 'Escribe «percentil(valores, p)»: devuelve el valor en la posición ⌈p/100 · n⌉ − 1 de los valores ordenados de menor a mayor (método del rango más cercano).', f: 'percentil', p: ['valores', 'p'], t: [[[[5, 1, 9, 3, 7], 50], 5], [[[10, 20, 30, 40], 99], 40], [[[10, 20, 30, 40], 25], 10]], sol: '  const o = [...valores].sort((a, b) => a - b);\n  return o[Math.max(0, Math.ceil(p / 100 * o.length) - 1)];', l: 2 },
    { c: 'Escribe «disyuntor(resultados, umbral)»: resultados es una lista de true (éxito) y false (falla) de llamadas sucesivas; el disyuntor se abre al acumular «umbral» fallas seguidas. Devuelve el índice de la llamada en que se abre, o −1 si nunca se abre.', f: 'disyuntor', p: ['resultados', 'umbral'], t: [[[[true, false, false, false, true], 3], 3], [[[false, true, false, false], 3], -1], [[[false], 1], 0]], sol: '  let seguidas = 0;\n  for (let i = 0; i < resultados.length; i++) { seguidas = resultados[i] ? 0 : seguidas + 1; if (seguidas >= umbral) return i; }\n  return -1;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.pick([10, 20, 50, 100, 200]), p = R.pick([1, 2, 5]); g.input(4, 'Cada servidor es lento el ' + p + ' % de las veces. ¿Qué porcentaje de peticiones que consultan ' + n + ' servidores tocará al menos uno lento? (redondea al entero)', Math.round(100 * (1 - Math.pow(1 - p / 100, n))), '1 − (1 − p)ⁿ.'); });
    g.times(6, function (R) { var b = R.pick([50, 100, 200]), i = R.int(0, 6), t = R.pick([2000, 5000]); g.input(2, 'Con espera exponencial de base ' + b + ' ms y techo ' + t + ' ms, ¿cuántos ms se espera tras el intento ' + i + '?', Math.min(t, b * Math.pow(2, i)), 'min(techo, base · 2^intento).'); });
    var tec = [['Enviar una copia a otra réplica si la primera tarda más que el p95', 'Petición de respaldo'], ['Dejar de llamar a un servicio que falla repetidamente', 'Disyuntor'], ['Rechazar rápido parte de las peticiones cuando el servidor está saturado', 'Descarte de carga'], ['Agregar aleatoriedad a la espera entre reintentos', 'Jitter'], ['Propagar un identificador por los servicios para ver el recorrido de una petición', 'Trazado distribuido']];
    tec.forEach(function (t) { g.mcq(2, '¿Qué técnica es esta? ' + t[0], t[1], ['Petición de respaldo', 'Disyuntor', 'Descarte de carga', 'Jitter', 'Trazado distribuido'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Técnicas de operación de sistemas distribuidos.'); });
  },
  checks: [
    ['Explica con números por qué la latencia de cola domina en sistemas con abanico grande.', 'Si cada servidor es lento el 1 % de las veces, consultar 100 da 1 − 0,99¹⁰⁰ ≈ 63 % de peticiones lentas.'],
    ['¿Qué reglas evitan que los reintentos causen una caída?', 'Espera exponencial con jitter, presupuesto de reintentos, reintentar en una sola capa y solo operaciones idempotentes.'],
    ['Compara disyuntor y descarte de carga.', 'El disyuntor protege desde el cliente dejando de llamar a un servicio enfermo; el descarte de carga protege al servidor rechazando parte de las peticiones cuando está saturado.'],
    ['¿Qué es una falla metaestable y cómo se sale de ella?', 'Un estado malo que se sostiene por retroalimentación aunque el disparador desaparezca; se sale cortando el ciclo (descartar carga, frenar reintentos).'],
    ['Diseña un experimento de ingeniería del caos para un sistema que conozcas.', 'Definir una métrica de estado estable, una hipótesis, inyectar una falla real con radio de impacto limitado y comparar con un grupo de control.']
  ],
  cites: ['Dean, J. y Barroso, L. A. (2013). The Tail at Scale. *Communications of the ACM*, 56(2).', 'Brooker, M. (2015). Exponential Backoff and Jitter. *AWS Architecture Blog*.', 'Nygard, M. (2007). *Release It! Design and Deploy Production-Ready Software*. Pragmatic Bookshelf.', 'Sigelman, B. et al. (2010). *Dapper, a Large-Scale Distributed Systems Tracing Infrastructure*. Google Technical Report.', 'Basiri, A. et al. (2016). Chaos Engineering. *IEEE Software*, 33(3).', 'Huang, P. et al. (2017). Gray Failure: The Achilles’ Heel of Cloud-Scale Systems. *HotOS 2017*.', 'Bronson, N. et al. (2021). Metastable Failures in Distributed Systems. *HotOS 2021*.'],
  project: { t: 'Laboratorio de resiliencia',
    goal: 'Reproducir y corregir fallas típicas de producción en un sistema de varios servicios.',
    steps: ['Monta tres servicios encadenados con una caché y una base de datos, instrumentados con OpenTelemetry.', 'Mide p50, p99 y p99,9 con un generador de carga de tasa abierta (que no espere respuestas) para evitar la omisión coordinada.', 'Reproduce una tormenta de reintentos y una falla metaestable vaciando la caché.', 'Agrega espera exponencial con jitter, presupuesto de reintentos, un disyuntor, descarte de carga y peticiones de respaldo, y mide el efecto de cada uno.', 'Diseña y ejecuta un experimento de caos con hipótesis y radio de impacto limitado.'],
    deliver: 'El sistema, las mediciones antes y después de cada técnica y el informe del experimento de caos.' },
  hito: ['Agrega a los clientes de PatioApp espera exponencial con full jitter y presupuesto de reintentos, y al servicio de tarifas un disyuntor hacia la base de datos y descarte de carga priorizado.', 'Instrumenta PatioApp con trazado distribuido de OpenTelemetry y alertas sobre el p99 y la tasa de errores, y escribe un análisis posterior al incidente del vaciado de caché.']
});
})();
