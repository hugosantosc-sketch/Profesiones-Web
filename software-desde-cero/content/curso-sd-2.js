(function () {
var S = SDC.S;

S('sd', 'sd.consist', { title: 'Modelos de consistencia y el teorema CAP',
  ask: '¿Qué modelo de consistencia o concepto relacionado se aplica?',
  lesson: `
> **La idea en simple.** Si actualizas tu foto de perfil y tu amigo la sigue viendo vieja durante un minuto, ¿es un error? Depende de lo que el sistema prometió. Un modelo de consistencia es ese contrato: qué valores puede ver cada lectura cuando hay varias copias de los datos y muchas operaciones a la vez. Cuanto más fuerte la promesa, más cuesta cumplirla.

## Un espectro de promesas
Los modelos de consistencia van de los más fuertes (fáciles de programar, caros de implementar) a los más débiles (baratos y muy disponibles, difíciles de programar). Los más importantes:
| Modelo | Promesa |
| Linealizabilidad | cada operación parece ocurrir en un instante entre su inicio y su fin, en un orden que respeta el tiempo real |
| Consistencia secuencial | existe un orden total de las operaciones que respeta el orden de cada proceso (no necesariamente el tiempo real) |
| Consistencia causal | si una operación pudo causar otra, todos las ven en ese orden; las concurrentes pueden verse en órdenes distintos |
| Consistencia eventual | si dejan de llegar escrituras, todas las réplicas terminan convergiendo al mismo valor |

## Linealizabilidad
Maurice Herlihy y Jeannette Wing la definieron en 1990: el sistema se comporta **como si hubiera una sola copia** de los datos y cada operación tuviera efecto de forma atómica en algún instante entre que se invoca y que responde. Consecuencia: si la escritura de A terminó antes de que empezara la lectura de B, B **debe** ver lo que escribió A. Es lo que se necesita para un candado distribuido, para elegir un líder único o para garantizar que un nombre de usuario no se asigne dos veces. Su costo es inevitable: Hagit Attiya y Jennifer Welch demostraron en 1994 que las operaciones linealizables no pueden ser más rápidas que la incertidumbre en la demora de la red, así que no puede haber linealizabilidad con latencia mínima entre continentes.

No hay que confundirla con la **serializabilidad** de las bases de datos: la serializabilidad trata de **transacciones** sobre muchos objetos (que su resultado equivalga a algún orden serial, sin exigir el tiempo real); la linealizabilidad trata de **operaciones individuales** respetando el tiempo real. Ambas juntas se llaman **serializabilidad estricta**, lo que ofrece Spanner.

## Consistencia secuencial y causal
Leslie Lamport definió en 1979 la **consistencia secuencial** para la memoria de los multiprocesadores: el resultado es como si las operaciones de todos se intercalaran en algún orden, respetando el orden de cada procesador. Es más débil que la linealizabilidad porque dos operaciones de procesos distintos pueden "reordenarse" aunque una haya terminado antes en el tiempo real.

La **consistencia causal** solo exige que se respete la relación ocurrió antes: si Ana publica una pregunta y Beto responde después de leerla, nadie debe ver la respuesta sin la pregunta. Prasun Mahajan, Lorenzo Alvisi y Mike Dahlin demostraron en 2011 que la consistencia causal (en una variante fuerte) es el modelo más fuerte que puede ofrecerse sin perder disponibilidad durante particiones de red, lo que la vuelve muy atractiva.

## Consistencia eventual y garantías de sesión
Werner Vogels, director técnico de Amazon, explicó en 2009 (*Eventually Consistent*) por qué muchos servicios aceptan la consistencia **eventual**: priorizan estar siempre disponibles y rápidos, y toleran ver datos atrasados por un tiempo. Pero "eventual" es una garantía muy débil: no dice cuánto tarda ni qué se ve mientras tanto. Douglas Terry y sus coautores propusieron en 1994, con el sistema Bayou, **garantías de sesión** que hacen tolerable la experiencia de cada usuario:
- **Leer tus propias escrituras:** después de escribir, tus lecturas ven tu cambio.
- **Lecturas monótonas:** nunca ves un valor más viejo que uno que ya viste.
- **Escrituras monótonas:** tus escrituras se aplican en el orden en que las hiciste.
- **Las escrituras siguen a las lecturas:** si escribes algo después de leer un valor, tu escritura se ordena después de ese valor.
Con **CRDT** (tipos de datos replicados sin conflictos) se obtiene **consistencia eventual fuerte**: las réplicas que recibieron las mismas actualizaciones están en el mismo estado, sin importar el orden.
~~~js
// ¿Cumple una sesión de un cliente con "lecturas monótonas" y "leer tus propias escrituras"?
function garantias(sesion) {
  let maxLeido = 0, maxEscrito = 0, monotonas = true, propias = true;
  for (const [op, version] of sesion) {
    if (op === 'w') maxEscrito = Math.max(maxEscrito, version);
    else {
      if (version < maxLeido) monotonas = false;
      if (version < maxEscrito) propias = false;
      maxLeido = Math.max(maxLeido, version);
    }
  }
  return 'lecturas monótonas: ' + monotonas + ' · lee sus escrituras: ' + propias;
}
console.log(garantias([['r', 3], ['w', 4], ['r', 4], ['r', 5]]));
console.log(garantias([['r', 3], ['w', 4], ['r', 3]]));          // leyó de una réplica atrasada
~~~

## El teorema CAP
Eric Brewer planteó en una conferencia de 2000 que un sistema distribuido no puede tener a la vez **consistencia**, **disponibilidad** y **tolerancia a particiones**; Seth Gilbert y Nancy Lynch lo demostraron formalmente en 2002. En su forma precisa:
- **C** es linealizabilidad.
- **A** es que todo nodo que no falló responda a toda petición.
- **P** es que la red puede partirse y perder todos los mensajes entre dos grupos de nodos.
Como las particiones **ocurren** (no es algo que se elija), el teorema dice: **durante una partición** hay que elegir entre responder con datos que pueden ser inconsistentes (A) o negarse a responder en el lado que no puede garantizar consistencia (C). Brewer aclaró en 2012 (*CAP Twelve Years Later*) que la elección no es binaria ni permanente, y Martin Kleppmann pidió en 2015 dejar de etiquetar bases de datos como "CP" o "AP", porque la mayoría no cumple ninguna definición estricta y el teorema dice muy poco sobre el funcionamiento normal.

## PACELC: el costo de todos los días
Daniel Abadi propuso en 2012 una extensión más útil, **PACELC**: si hay **P**artición, se elige entre **A**vailability y **C**onsistency; **E**n otro caso (else), entre **L**atencia y **C**onsistencia. Esta segunda parte es la que importa la mayor parte del tiempo: esperar a que varias réplicas confirmen cuesta milisegundos en cada operación, haya o no particiones. Dynamo y Cassandra eligen por defecto disponibilidad y baja latencia (PA/EL); Spanner y los sistemas con consenso, consistencia (PC/EC).

## Consistencia en la práctica: quórums y réplicas
Un almacén con N réplicas que escribe en W y lee de R ofrece lecturas que ven la última escritura confirmada cuando W + R > N, pero eso **no basta** para la linealizabilidad: con escrituras concurrentes y réplicas que se reparan a destiempo pueden aparecer lecturas que "retroceden". Para lograrla hacen falta mecanismos extra, como la reparación en la lectura antes de responder (ABD, de Attiya, Bar-Noy y Dolev, 1995) o directamente consenso. En el otro extremo, leer de cualquier réplica seguidora es rápido pero puede devolver datos de hace segundos. Elegir dónde leer es, en el fondo, elegir un modelo de consistencia.

## Comprobar lo que se promete
Kyle Kingsbury creó en 2013 **Jepsen**, una herramienta que genera operaciones concurrentes, provoca particiones de red, caídas y desvíos de reloj, y verifica después si el historial observado cumple el modelo prometido. Sus análisis públicos encontraron violaciones de las garantías declaradas en muchas bases de datos y colas de mensajes populares, y varias corrigieron su documentación o su código. La lección: un modelo de consistencia es una afirmación que hay que **probar**, no un adjetivo de la documentación.

## Ejemplo resuelto: qué consistencia necesita cada dato de PatioApp
- **Asignación de espacios:** dos operadores no pueden asignar el mismo espacio. Necesita **linealizabilidad** (o una transacción serializable en una sola base): se acepta que, ante una partición, una sede no pueda asignar espacios hasta reconectarse.
- **Estado de inspección de una unidad:** se edita sin conexión en las sedes. Basta **consistencia causal** con detección de conflictos: una observación que responde a otra nunca se ve antes que ella.
- **Contador de visitas a la página de un patio:** **consistencia eventual** con un CRDT de contador; si un número tarda unos segundos en converger, no pasa nada.
- **Pantalla del operador:** **leer sus propias escrituras** y **lecturas monótonas**: tras registrar un ingreso, el operador debe verlo de inmediato, y la lista nunca debe "retroceder" al recargar. Se logra leyendo del líder lo propio durante unos segundos y fijando la réplica de cada sesión.
Elegir por dato, y no un modelo para todo el sistema, es lo que hacen los diseños maduros.`,
  links: [['sd.repl', 'la replicación es la causa de que haya que elegir un modelo de consistencia'], ['bd2.tx', 'la serializabilidad de transacciones es distinta de la linealizabilidad'], ['sd.time', 'la consistencia causal se basa en la relación ocurrió antes']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulo 9; Herlihy y Wing (1990); Vogels (2009); Brewer (2012); Abadi (2012); análisis públicos de Jepsen (jepsen.io).',
  terms: [
    ['Linealizabilidad', 'modelo en que cada operación parece ocurrir atómicamente en un instante entre su inicio y su fin, respetando el tiempo real', ['Como si hubiera una sola copia de los datos.', 'Herlihy y Wing la definieron en 1990.', 'La necesitan los candados y la elección de líder.']],
    ['Consistencia secuencial', 'modelo en que existe un orden total de las operaciones que respeta el orden de cada proceso, sin exigir el tiempo real', ['Lamport la definió en 1979.', 'Es más débil que la linealizabilidad.', 'Se usó para memorias de multiprocesadores.']],
    ['Consistencia causal', 'modelo en que las operaciones relacionadas causalmente se ven en el mismo orden por todos', ['La respuesta nunca se ve sin la pregunta.', 'Las concurrentes pueden verse en distinto orden.', 'Es posible sin perder disponibilidad.']],
    ['Consistencia eventual', 'garantía de que, si dejan de llegar escrituras, todas las réplicas convergen al mismo valor', ['Vogels la explicó en 2009.', 'No dice cuánto tarda.', 'Se complementa con garantías de sesión.']],
    ['Leer tus propias escrituras', 'garantía de sesión por la que un cliente siempre ve sus propios cambios en lecturas posteriores', ['Tras guardar el perfil, lo ves actualizado.', 'Terry y otros la propusieron en 1994.', 'Se logra leyendo del líder lo propio.']],
    ['Teorema CAP', 'resultado que dice que, durante una partición de red, un sistema no puede ser a la vez linealizable y totalmente disponible', ['Brewer lo planteó en 2000.', 'Gilbert y Lynch lo demostraron en 2002.', 'La partición no se elige: ocurre.']],
    ['PACELC', 'extensión de CAP que agrega que, sin particiones, hay que elegir entre latencia y consistencia', ['Abadi lo propuso en 2012.', 'Dynamo es PA/EL y Spanner PC/EC.', 'Describe el costo diario de la consistencia.']],
    ['Jepsen', 'herramienta y serie de análisis que verifican, provocando fallas, si un sistema cumple el modelo de consistencia que promete', ['Kingsbury la creó en 2013.', 'Encontró violaciones en muchas bases de datos.', 'Genera particiones, caídas y desvíos de reloj.']]
  ],
  q: [
    ['La escritura de A terminó antes de que empezara la lectura de B. En un sistema linealizable, ¿qué ve B?', 'El valor escrito por A o uno posterior', ['Cualquier valor anterior', 'Un error', 'Nada'], 'Se respeta el tiempo real.', 3],
    ['¿Qué diferencia a la linealizabilidad de la serializabilidad?', 'La linealizabilidad trata operaciones individuales respetando el tiempo real; la serializabilidad, transacciones sobre muchos objetos', ['Son sinónimos', 'La serializabilidad es más fuerte siempre', 'La linealizabilidad solo existe en bases de datos'], 'Juntas forman la serializabilidad estricta.', 4],
    ['Un usuario actualiza su perfil y al recargar ve el viejo. ¿Qué garantía de sesión se violó?', 'Leer tus propias escrituras', ['Escrituras monótonas', 'Linealizabilidad del contador', 'Ninguna'], 'Probablemente leyó de una réplica atrasada.', 2],
    ['Durante una partición de red, según CAP, ¿qué debe elegir un sistema?', 'Entre responder con datos posiblemente inconsistentes o no responder en una parte', ['Entre particionar o no particionar', 'Entre usar TCP o UDP', 'Nada: puede tenerlo todo'], 'La partición no se elige.', 3],
    ['Según PACELC, ¿qué elige un sistema cuando no hay partición?', 'Entre latencia y consistencia', ['Entre disponibilidad y particiones', 'Entre seguridad y velocidad', 'Nada'], 'Esperar réplicas cuesta latencia.', 3],
    ['¿Qué modelo es el más fuerte que puede ofrecerse sin perder disponibilidad durante particiones, según Mahajan y otros (2011)?', 'Consistencia causal (en una variante fuerte)', ['Linealizabilidad', 'Serializabilidad estricta', 'Consistencia secuencial'], 'Por eso es tan atractiva.', 4],
    ['¿Qué hace Jepsen?', 'Provoca fallas y verifica si el historial cumple el modelo de consistencia prometido', ['Optimiza consultas', 'Cifra las réplicas', 'Elige líderes'], 'Encontró violaciones en muchos sistemas.', 2],
    { tf: 'La consistencia eventual garantiza que las réplicas convergen en un tiempo máximo conocido.', v: false, e: 'Solo promete convergencia si cesan las escrituras, sin cota de tiempo.', l: 2 },
    { tf: 'La linealizabilidad tiene un costo de latencia que no se puede eliminar, relacionado con la demora de la red.', v: true, e: 'Attiya y Welch lo demostraron en 1994.', l: 3 },
    { c: 'Escribe «lecturasMonotonas(versiones)»: devuelve true si las versiones leídas por un cliente nunca disminuyen.', f: 'lecturasMonotonas', p: ['versiones'], t: [[[[1, 2, 2, 5]], true], [[[3, 2]], false], [[[]], true]], sol: '  return versiones.every((v, i) => i === 0 || v >= versiones[i - 1]);', l: 1 },
    { c: 'Escribe «leePropias(sesion)»: sesion es una lista de ["w", version] y ["r", version] de un cliente; devuelve true si cada lectura tiene una versión mayor o igual que la última escritura previa del cliente.', f: 'leePropias', p: ['sesion'], t: [[[[['w', 4], ['r', 4], ['r', 5]]], true], [[[['r', 3], ['w', 4], ['r', 3]]], false], [[[['r', 1]]], true]], sol: '  let w = 0;\n  for (const [op, v] of sesion) { if (op === "w") w = Math.max(w, v); else if (v < w) return false; }\n  return true;', l: 2 }
  ],
  gen: function (g) {
    var dat = [['Asignar nombres de usuario únicos', 'Linealizabilidad'], ['Contador de "me gusta" de una publicación', 'Consistencia eventual'], ['Comentarios que responden a otros comentarios', 'Consistencia causal'], ['Un candado distribuido para un trabajo programado', 'Linealizabilidad'], ['Número de visitas a una página', 'Consistencia eventual'], ['Mensajes de un chat donde una respuesta nunca debe aparecer antes que la pregunta', 'Consistencia causal']];
    dat.forEach(function (d) { g.mcq(3, '¿Qué modelo de consistencia es suficiente y razonable para esto? ' + d[0], d[1], ['Linealizabilidad', 'Consistencia causal', 'Consistencia eventual', 'Sin consistencia'].filter(function (x) { return x !== d[1]; }), 'Se elige el modelo más débil que cumple el requisito.'); });
    var ses = [['Tras guardar un cambio, el usuario siempre lo ve', 'Leer tus propias escrituras'], ['El usuario nunca ve un valor más viejo que uno ya visto', 'Lecturas monótonas'], ['Las escrituras de un usuario se aplican en el orden en que las hizo', 'Escrituras monótonas'], ['Una escritura hecha tras leer un valor se ordena después de ese valor', 'Las escrituras siguen a las lecturas']];
    ses.forEach(function (x) { g.mcq(2, '¿Qué garantía de sesión es esta? ' + x[0], x[1], ['Leer tus propias escrituras', 'Lecturas monótonas', 'Escrituras monótonas', 'Las escrituras siguen a las lecturas'].filter(function (y) { return y !== x[1]; }), 'Garantías de Terry y otros (Bayou, 1994).'); });
    var pac = [['Dynamo', 'PA/EL'], ['Cassandra con su configuración por defecto', 'PA/EL'], ['Spanner', 'PC/EC'], ['Un sistema con consenso como etcd', 'PC/EC']];
    pac.forEach(function (p) { g.mcq(3, 'Según la clasificación PACELC de Abadi, ¿cómo se describe ' + p[0] + '?', p[1], ['PA/EL', 'PC/EC', 'PA/EC', 'PC/EL'].filter(function (x) { return x !== p[1]; }), 'Partición: A o C; si no: L o C.'); });
  },
  checks: [
    ['Ordena de más fuerte a más débil: eventual, linealizable, causal, secuencial.', 'Linealizable, secuencial, causal, eventual.'],
    ['¿Qué necesita la linealizabilidad que no necesita la consistencia secuencial?', 'Respetar el tiempo real: si una operación terminó antes de que otra empezara, debe ordenarse antes.'],
    ['Explica el teorema CAP sin caer en el mito de "elige dos de tres".', 'Las particiones ocurren; durante una, el sistema debe elegir entre responder con posibles inconsistencias o no responder en una parte para mantener la linealizabilidad.'],
    ['¿Qué aporta PACELC?', 'Señala que, incluso sin particiones, mantener consistencia fuerte cuesta latencia, y que esa elección rige la mayor parte del tiempo.'],
    ['Elige un modelo de consistencia para tres datos de un sistema que conozcas y justifícalo.', 'Por ejemplo: saldo de una cuenta (linealizable), hilo de comentarios (causal), contador de vistas (eventual).']
  ],
  cites: ['Herlihy, M. y Wing, J. (1990). Linearizability: A Correctness Condition for Concurrent Objects. *ACM TOPLAS*, 12(3).', 'Lamport, L. (1979). How to Make a Multiprocessor Computer That Correctly Executes Multiprocess Programs. *IEEE Transactions on Computers*, C-28(9).', 'Terry, D. et al. (1994). Session Guarantees for Weakly Consistent Replicated Data. *PDIS 1994*.', 'Vogels, W. (2009). Eventually Consistent. *Communications of the ACM*, 52(1).', 'Brewer, E. (2012). CAP Twelve Years Later: How the "Rules" Have Changed. *IEEE Computer*, 45(2).', 'Abadi, D. (2012). Consistency Tradeoffs in Modern Distributed Database System Design. *IEEE Computer*, 45(2).', 'Attiya, H., Bar-Noy, A. y Dolev, D. (1995). Sharing Memory Robustly in Message-Passing Systems. *Journal of the ACM*, 42(1).', 'Mahajan, P., Alvisi, L. y Dahlin, M. (2011). *Consistency, Availability, and Convergence*. UTCS TR-11-22, University of Texas at Austin.'],
  project: { t: 'Verificador de historiales',
    goal: 'Comprobar si un historial de operaciones cumple distintos modelos de consistencia.',
    steps: ['Registra historiales de operaciones (inicio, fin, tipo, valor) contra un almacén replicado con distintas configuraciones de quórum.', 'Implementa un verificador de linealizabilidad para un registro simple (búsqueda de un orden válido que respete el tiempo real).', 'Implementa verificadores de lecturas monótonas y de leer tus propias escrituras por cliente.', 'Provoca particiones y réplicas atrasadas y muestra qué garantías se rompen con cada configuración.', 'Lee uno de los análisis públicos de Jepsen y resume qué encontró y cómo lo detectó.'],
    deliver: 'Los historiales, los verificadores, los resultados y el resumen del análisis de Jepsen.' },
  hito: ['Documenta en un ADR el modelo de consistencia que necesita cada dato de PatioApp (espacios, inspecciones, contadores, pantallas) y por qué.', 'Implementa en PatioApp las garantías de leer tus propias escrituras y lecturas monótonas para la pantalla del operador, con una prueba que las verifique.']
});

S('sd', 'sd.consensus', { title: 'Consenso: FLP, Paxos y Raft',
  ask: '¿Qué concepto de consenso distribuido se aplica?',
  lesson: `
> **La idea en simple.** Cinco amigos deben decidir a qué restaurante ir solo con mensajes de texto, algunos se quedan sin batería y los mensajes llegan con demoras. Necesitan un método que garantice que, si deciden, todos decidan lo mismo, aunque no todos estén conectados. El consenso es ese método, y es la pieza que permite construir bases de datos replicadas, servicios de configuración y elección de líderes que nunca se contradicen.

## El problema
Varios procesos proponen valores y deben **decidir** uno. Las propiedades exigidas:
- **Acuerdo:** ningún par de procesos correctos decide valores distintos.
- **Validez:** el valor decidido fue propuesto por alguno.
- **Terminación:** todo proceso correcto termina decidiendo.
Parece simple, y en un sistema síncrono lo es. Pero en uno asíncrono con fallas, es uno de los problemas más profundos de la computación. Resolverlo una vez permite resolverlo muchas: decidir el valor de cada posición de un **registro replicado** da la replicación de máquinas de estados.

## El resultado de imposibilidad FLP
Michael Fischer, Nancy Lynch y Michael Paterson demostraron en 1985 que **en un sistema totalmente asíncrono, ningún algoritmo determinista garantiza el consenso si aunque sea un proceso puede caer**. La intuición: como no se puede distinguir un proceso caído de uno lento, siempre existe una secuencia de demoras que mantiene al algoritmo indeciso para siempre. El artículo recibió el Premio Dijkstra en 2001. FLP no dice que el consenso sea imposible en la práctica, sino que hay que **relajar** algún supuesto:
- Suponer **sincronía parcial**: el algoritmo es siempre seguro (nunca decide mal) y termina cuando la red se comporta bien el tiempo suficiente. Es la opción de Paxos y Raft.
- Usar **aleatoriedad**: Michael Ben-Or mostró en 1983 un algoritmo que termina con probabilidad 1.
- Usar **detectores de fallas** con ciertas propiedades (Chandra y Toueg).

## Mayorías
Casi todos los algoritmos prácticos usan **quórums mayoritarios**: con 2f + 1 nodos se toleran f caídas, porque dos mayorías cualesquiera siempre comparten al menos un nodo, que "recuerda" lo decidido. Con 3 nodos se tolera 1 caída; con 5, 2. Por eso los clústeres de consenso tienen tamaños impares: con 4 nodos la mayoría es 3 y se tolera igualmente solo 1 caída.

## Paxos
Leslie Lamport describió **Paxos** en *The Part-Time Parliament*, escrito hacia 1990 como la historia de un parlamento en una isla griega y publicado en 1998; como pocos lo entendieron, en 2001 publicó *Paxos Made Simple*, que empieza diciendo:
:::cita El algoritmo Paxos, presentado en lenguaje sencillo, es muy simple. | Leslie Lamport, Paxos Made Simple (2001)
Hay **proponentes**, **aceptadores** y **aprendices**. Para decidir un valor:
1. **Preparación:** un proponente elige un número de propuesta n mayor que cualquiera usado y envía «preparar(n)» a los aceptadores. Cada aceptador que no prometió un número mayor **promete** no aceptar propuestas menores que n y responde con la propuesta de mayor número que ya haya aceptado, si la hay.
2. **Aceptación:** si una mayoría prometió, el proponente envía «aceptar(n, v)», donde v es el valor de la propuesta de mayor número que le informaron (o su propio valor si no le informaron ninguno). Cada aceptador lo acepta salvo que haya prometido a un número mayor.
3. Cuando una mayoría acepta (n, v), el valor v está **decidido**.
La regla clave es la del paso 2: un proponente nuevo debe adoptar el valor que ya pudo haberse elegido, de modo que dos mayorías nunca decidan valores distintos. Con un líder estable que se salta la fase 1 para cada nueva posición del registro, se obtiene **Multi-Paxos**. Mike Burrows describió en 2006 **Chubby**, el servicio de bloqueos de Google basado en Paxos, y Tushar Chandra y sus colegas contaron en 2007 (*Paxos Made Live*) lo difícil que fue llevarlo de la teoría a producción.

## Raft
Diego Ongaro y John Ousterhout, de Stanford, diseñaron **Raft** (2014) con un objetivo explícito: que fuera **comprensible**. En un estudio con estudiantes, la mayoría entendió Raft mejor que Paxos. Raft divide el problema:
- **Elección de líder:** cada servidor es seguidor, candidato o líder. El tiempo se divide en **mandatos** numerados. Si un seguidor no recibe latidos del líder durante un tiempo de espera **aleatorio** (por ejemplo, entre 150 y 300 ms), se vuelve candidato, incrementa el mandato, vota por sí mismo y pide votos. Gana quien obtiene la mayoría; la aleatoriedad hace que casi nunca empaten.
- **Replicación del registro:** el líder recibe las operaciones de los clientes, las agrega a su registro y las envía a los seguidores con «AppendEntries». Cuando una entrada está en la **mayoría**, el líder la considera **confirmada**, la aplica y responde al cliente.
- **Seguridad:** un servidor solo vota por un candidato cuyo registro esté **al menos tan actualizado** como el suyo (comparando el mandato de la última entrada y, si empatan, su índice). Así, el líder elegido siempre tiene todas las entradas confirmadas.
~~~js
// Raft: ¿hasta qué índice puede confirmar el líder? Mayor índice que está en la mayoría
function indiceConfirmado(indices) {                 // índice replicado en cada servidor, incluido el líder
  const orden = [...indices].sort((a, b) => b - a);
  return orden[Math.floor(indices.length / 2)];
}
const masActualizado = (a, b) => a[0] > b[0] || (a[0] === b[0] && a[1] >= b[1]);   // [mandato, índice]
console.log('confirmado hasta', indiceConfirmado([7, 7, 5, 4, 2]));                     // 5 servidores, mayoría 3
console.log('¿vota por el candidato?', masActualizado([3, 10], [3, 12]) ? 'sí' : 'no, su registro está atrasado');
~~~
(Raft agrega una condición: el líder solo cuenta mayorías para entradas de su **mandato actual**, para evitar un caso sutil descrito en el artículo.)

## Qué pasa cuando las cosas fallan
Recorrer los casos difíciles ayuda a entender por qué Raft es correcto:
- **El líder cae antes de confirmar una entrada.** Si la entrada llegó solo a una minoría, el nuevo líder puede no tenerla y la sobrescribirá; el cliente no recibió confirmación, así que debe reintentar (idealmente con un identificador para no duplicar).
- **El líder cae después de confirmar.** La entrada está en la mayoría, y por la restricción de elección cualquier nuevo líder la tiene: nunca se pierde.
- **Partición con el líder en la minoría.** El líder viejo sigue creyéndose líder, pero no logra mayoría para confirmar nada. La mayoría elige un líder nuevo con un mandato mayor; al reconectarse, el viejo ve el mandato mayor y se vuelve seguidor, descartando sus entradas no confirmadas.
- **Lecturas.** Si el líder responde lecturas sin consultar a nadie, un líder viejo aislado podría devolver datos obsoletos. Raft lo evita confirmando con la mayoría que sigue siendo líder antes de responder (*ReadIndex*) o usando arrendamientos de liderazgo, que dependen de relojes razonablemente acotados.
- **Cambiar los miembros del clúster.** Agregar o quitar servidores sin cuidado puede crear dos mayorías disjuntas; Raft usa cambios de un servidor a la vez o una configuración conjunta transitoria.
Heidi Howard y Richard Mortier mostraron en 2020 que Paxos y Raft son, en lo esencial, el mismo algoritmo con distintas decisiones de diseño; la diferencia principal está en cómo se elige al líder.

## Dónde se usa
- **etcd** (base de la configuración de Kubernetes), **Consul**, **CockroachDB**, **TiKV** y muchos otros usan Raft.
- **ZooKeeper** (Patrick Hunt y otros, 2010) usa el protocolo Zab, de la misma familia.
- **Spanner** replica cada partición con Paxos.
Las aplicaciones rara vez implementan consenso: lo **usan** a través de estos servicios para elegir un líder, guardar configuración crítica, implementar candados con arrendamientos o mantener la lista de miembros de un clúster.

## Ejemplo resuelto: el líder de las tareas programadas de PatioApp
Cada noche, PatioApp genera las facturas del día. Corre en tres servidores para tener disponibilidad, pero la facturación debe ejecutarse **una sola vez**. Diseño:
1. Los tres servidores compiten por un **arrendamiento** de 30 segundos en etcd (que usa Raft internamente), con una clave "lider-facturacion".
2. El que lo obtiene es el líder y lo renueva cada 10 segundos; si cae, el arrendamiento vence y otro lo toma.
3. Cada vez que alguien obtiene el arrendamiento recibe un número de revisión creciente de etcd, que se usa como **token de cercado**: la tabla de facturas rechaza escrituras con un número menor al último registrado, por si un líder viejo se despertó tras una pausa larga.
4. Con 3 nodos de etcd en tres zonas, el sistema tolera la caída de uno. Si se pierden dos, etcd deja de aceptar escrituras (elige consistencia), y la facturación espera en lugar de duplicarse.`,
  links: [['sd.repl', 'el consenso implementa la replicación de máquinas de estados'], ['sd.intro', 'la imposibilidad FLP surge del modelo asíncrono con fallas'], ['bd2.dist', 'Spanner y CockroachDB replican cada partición con consenso']],
  read: 'Lamport, *Paxos Made Simple* (2001); Ongaro y Ousterhout (2014) y la visualización en raft.github.io; Fischer, Lynch y Paterson (1985); Kleppmann, capítulo 9.',
  terms: [
    ['Consenso', 'problema de que varios procesos decidan un único valor con acuerdo, validez y terminación pese a fallas', ['Decidir qué operación va en la posición 42 del registro.', 'Elegir un líder único.', 'Base de la replicación fuerte.']],
    ['Imposibilidad FLP', 'resultado que demuestra que ningún algoritmo determinista garantiza el consenso en un sistema asíncrono si un proceso puede caer', ['Fischer, Lynch y Paterson, 1985.', 'Se evita suponiendo sincronía parcial.', 'No impide el consenso práctico.']],
    ['Quórum mayoritario', 'más de la mitad de los nodos, de modo que dos quórums siempre comparten al menos uno', ['3 de 5 nodos.', 'Con 2f + 1 nodos se toleran f caídas.', 'Por eso los clústeres tienen tamaño impar.']],
    ['Paxos', 'algoritmo de consenso de Lamport con fases de preparación y aceptación sobre mayorías de aceptadores', ['Un proponente nuevo adopta el valor ya aceptado de mayor número.', 'Multi-Paxos usa un líder estable.', 'Chubby de Google lo usa.']],
    ['Raft', 'algoritmo de consenso diseñado para ser comprensible, con elección de líder por mandatos y replicación de un registro', ['Ongaro y Ousterhout, 2014.', 'etcd y CockroachDB lo usan.', 'Usa tiempos de espera aleatorios.']],
    ['Mandato', 'período numerado de Raft que empieza con una elección y tiene como máximo un líder', ['Cada candidato incrementa el mandato.', 'Un mensaje de un mandato viejo se rechaza.', 'Funciona como reloj lógico.']],
    ['Entrada confirmada', 'entrada del registro de Raft replicada en la mayoría y que ya no puede perderse', ['El líder la aplica y responde al cliente.', 'Todo líder futuro la tendrá.', 'Se aplica en todas las réplicas en el mismo orden.']],
    ['Arrendamiento', 'permiso con vencimiento automático que un nodo obtiene y debe renovar periódicamente', ['El líder de facturación renueva cada 10 segundos.', 'Si cae, vence y otro lo toma.', 'Se combina con tokens de cercado.']]
  ],
  q: [
    ['¿Cuántas caídas tolera un clúster de consenso de 5 nodos?', '2', ['1', '3', '4'], 'Hace falta una mayoría de 3.', 2],
    ['¿Por qué un clúster de 4 nodos no tolera más caídas que uno de 3?', 'Porque la mayoría de 4 es 3, así que solo tolera 1 caída', ['Porque 4 es par y no funciona', 'Sí tolera 2', 'Porque Raft no admite 4 nodos'], 'Se agrega costo sin ganar tolerancia.', 3],
    ['¿Qué dice el resultado FLP?', 'Que en un sistema asíncrono ningún algoritmo determinista garantiza el consenso si un proceso puede caer', ['Que el consenso es siempre imposible', 'Que Paxos es incorrecto', 'Que hacen falta relojes atómicos'], 'Se evita con sincronía parcial o aleatoriedad.', 4],
    ['En Paxos, ¿qué valor envía un proponente en la fase de aceptación si algún aceptador le informó una propuesta ya aceptada?', 'El valor de la propuesta aceptada de mayor número', ['Su propio valor siempre', 'El valor del aceptador más rápido', 'Cualquiera al azar'], 'Así no se contradice una posible decisión.', 4],
    ['¿Para qué usa Raft tiempos de espera de elección aleatorios?', 'Para que casi nunca varios seguidores se vuelvan candidatos a la vez y empaten', ['Para cifrar los votos', 'Para ahorrar memoria', 'Para ordenar el registro'], 'Típicamente entre 150 y 300 ms.', 3],
    ['¿Cuándo considera el líder de Raft que una entrada está confirmada?', 'Cuando está replicada en la mayoría de los servidores', ['Cuando la escribe en su disco', 'Cuando todos la tienen', 'Cuando el cliente la pide'], 'Con la condición adicional del mandato actual.', 3],
    ['Un servidor con último registro [mandato 3, índice 12] recibe la petición de voto de un candidato con [3, 10]. ¿Vota por él?', 'No, porque el registro del candidato está menos actualizado', ['Sí, siempre', 'Sí, porque tiene el mismo mandato', 'Solo si es el primero en pedir'], 'Regla de elección de Raft.', 4],
    { tf: 'Paxos y Raft pueden dejar de avanzar si se pierde la mayoría, pero nunca deciden dos valores distintos.', v: true, e: 'Priorizan la seguridad sobre la disponibilidad.', l: 3 },
    { tf: 'Raft necesita que todos los servidores confirmen una entrada para aplicarla.', v: false, e: 'Basta con la mayoría.', l: 2 },
    { c: 'Escribe «mayoria(n)»: tamaño de la mayoría de n nodos.', f: 'mayoria', p: ['n'], t: [[[3], 2], [[4], 3], [[5], 3], [[1], 1]], sol: '  return Math.floor(n / 2) + 1;', l: 1 },
    { c: 'Escribe «masActualizado(a, b)»: a y b son [mandato, índice] de la última entrada del registro; true si a está al menos tan actualizado como b (mayor mandato, o igual mandato e índice mayor o igual).', f: 'masActualizado', p: ['a', 'b'], t: [[[[3, 10], [3, 12]], false], [[[4, 1], [3, 99]], true], [[[2, 5], [2, 5]], true]], sol: '  return a[0] > b[0] || (a[0] === b[0] && a[1] >= b[1]);', l: 2 },
    { c: 'Escribe «indiceConfirmado(indices)»: indices es el último índice replicado en cada servidor (incluido el líder); devuelve el mayor índice que está en una mayoría.', f: 'indiceConfirmado', p: ['indices'], t: [[[[7, 7, 5, 4, 2]], 5], [[[7, 7, 7]], 7], [[[4, 2, 2, 1]], 2], [[[9, 1, 1]], 1]], sol: '  const o = [...indices].sort((a, b) => b - a);\n  return o[Math.floor(indices.length / 2)];', h: 'Ordena de mayor a menor: el elemento en la posición de la mayoría es el que alcanza a suficientes servidores.', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(1, 9); g.input(2, '¿Cuántas caídas tolera un clúster de consenso de ' + n + ' nodos?', Math.floor((n - 1) / 2), 'Con n nodos, la mayoría es ⌊n/2⌋ + 1; se toleran n menos la mayoría.'); });
    g.times(6, function (R) { var n = R.pick([3, 5, 7]), idx = []; for (var i = 0; i < n; i++) idx.push(R.int(1, 15)); var o = idx.slice().sort(function (a, b) { return b - a; }); g.input(4, 'En Raft, los servidores tienen replicado hasta los índices ' + idx.join(', ') + '. ¿Hasta qué índice puede confirmar el líder (ignorando la condición de mandato)?', o[Math.floor(n / 2)], 'El mayor índice presente en una mayoría.'); });
    var rol = [['Envía latidos y replica el registro', 'Líder'], ['Pide votos tras no oír al líder', 'Candidato'], ['Responde a líderes y candidatos y vota', 'Seguidor']];
    rol.forEach(function (r) { g.mcq(1, 'En Raft, ¿qué estado tiene un servidor que hace esto? ' + r[0], r[1], ['Líder', 'Candidato', 'Seguidor', 'Aprendiz'].filter(function (x) { return x !== r[1]; }), 'Tres estados de Raft.'); });
  },
  checks: [
    ['Enuncia las tres propiedades del consenso.', 'Acuerdo (nadie decide distinto), validez (lo decidido fue propuesto) y terminación (todos los correctos deciden).'],
    ['¿Qué dice FLP y cómo lo evitan Paxos y Raft?', 'Que en un sistema asíncrono no se garantiza el consenso determinista con una caída posible; Paxos y Raft son siempre seguros y terminan cuando la red es suficientemente síncrona.'],
    ['¿Por qué las mayorías garantizan que no se decidan dos valores distintos?', 'Porque dos mayorías comparten al menos un nodo, que conoce lo ya aceptado y lo transmite.'],
    ['Describe la elección de líder de Raft.', 'Un seguidor sin latidos durante un tiempo aleatorio se vuelve candidato, incrementa el mandato, vota por sí y pide votos; gana con mayoría, y solo recibe votos si su registro está al menos tan actualizado.'],
    ['¿Para qué usaría una aplicación un servicio como etcd?', 'Para elegir un líder único, guardar configuración crítica, tener candados con arrendamientos o mantener la lista de miembros, sin implementar consenso por su cuenta.']
  ],
  cites: ['Fischer, M., Lynch, N. y Paterson, M. (1985). Impossibility of Distributed Consensus with One Faulty Process. *Journal of the ACM*, 32(2).', 'Lamport, L. (1998). The Part-Time Parliament. *ACM Transactions on Computer Systems*, 16(2).', 'Lamport, L. (2001). Paxos Made Simple. *ACM SIGACT News*, 32(4).', 'Ongaro, D. y Ousterhout, J. (2014). In Search of an Understandable Consensus Algorithm. *USENIX ATC 2014*.', 'Burrows, M. (2006). The Chubby Lock Service for Loosely-Coupled Distributed Systems. *OSDI 2006*.', 'Chandra, T., Griesemer, R. y Redstone, J. (2007). Paxos Made Live: An Engineering Perspective. *PODC 2007*.', 'Hunt, P. et al. (2010). ZooKeeper: Wait-free Coordination for Internet-scale Systems. *USENIX ATC 2010*.', 'Howard, H. y Mortier, R. (2020). Paxos vs Raft: Have we reached consensus on distributed consensus? *PaPoC 2020*.'],
  project: { t: 'Raft desde cero',
    goal: 'Implementar la elección de líder y la replicación del registro de Raft.',
    steps: ['Lee el artículo de Raft y su figura 2 con todas las reglas, y explora la visualización en raft.github.io.', 'Implementa en una red simulada la elección de líder con mandatos, votos y tiempos de espera aleatorios.', 'Implementa la replicación del registro con AppendEntries, la confirmación por mayoría y la restricción de elección.', 'Prueba con caídas del líder, particiones y mensajes perdidos que nunca hay dos líderes en el mismo mandato y que no se pierden entradas confirmadas.', 'Mide cuánto tarda en elegirse un líder nuevo con distintos tiempos de espera.'],
    deliver: 'La implementación, el banco de pruebas y el informe de mediciones.' },
  hito: ['Usa un servicio de consenso (etcd o similar) para que solo uno de los servidores de PatioApp ejecute la facturación nocturna, mediante un arrendamiento renovable.', 'Agrega a la facturación de PatioApp un token de cercado basado en la revisión del arrendamiento y una prueba que simule un líder viejo despertando tras una pausa.']
});

S('sd', 'sd.tx', { title: 'Transacciones distribuidas, sagas e idempotencia',
  ask: '¿Qué concepto de transacciones distribuidas se aplica?',
  lesson: `
> **La idea en simple.** Reservar un viaje con vuelo, hotel y auto en tres empresas distintas: si el hotel no tiene habitación, hay que cancelar el vuelo ya reservado. No existe un botón mágico que haga las tres reservas a la vez o ninguna; lo que se hace es reservar paso a paso y, si algo falla, **deshacer** lo hecho con acciones de cancelación. Así funcionan muchas operaciones en los sistemas distribuidos modernos.

## Atomicidad entre servicios
Cuando una operación toca datos de varios nodos o servicios, queremos que se aplique en **todos o en ninguno**. Hay dos grandes familias de soluciones:
- **Transacciones distribuidas** con protocolos de confirmación atómica (2PC), que dan atomicidad y aislamiento verdaderos.
- **Sagas** y diseños basados en eventos, que renuncian al aislamiento a cambio de autonomía y disponibilidad.

## Confirmación en dos fases, revisada
En Bases de Datos II viste la **confirmación en dos fases**: el coordinador pide a cada participante que se prepare (que deje todo listo para confirmar y vote) y luego decide. Su problema es que es **bloqueante**: si el coordinador cae después de recibir los votos, los participantes preparados no pueden decidir solos y retienen sus bloqueos. Dale Skeen propuso en 1981 la **confirmación en tres fases** (3PC), que agrega una fase intermedia para no bloquear, pero solo funciona si no hay particiones de red, así que se usa poco. La solución moderna es **replicar al coordinador** con consenso: Spanner ejecuta 2PC entre grupos de Paxos, de modo que el coordinador no puede "desaparecer". Aun así, las transacciones distribuidas entre servicios de distintas organizaciones o equipos son difíciles: todos deben hablar el mismo protocolo, y un participante lento frena a todos.

## Pat Helland y la vida después de las transacciones distribuidas
Pat Helland, que había trabajado décadas en sistemas transaccionales, publicó en 2007 *Life beyond Distributed Transactions: an Apostate's Opinion*. Su tesis: los sistemas que escalan casi sin límite no usan transacciones que abarcan muchas máquinas. En su lugar:
- Los datos se agrupan en **entidades** con una clave (un pedido, una cuenta), y cada transacción toca **una sola entidad**, que vive en una sola máquina.
- Las entidades se coordinan con **mensajes**, que pueden llegar repetidos y desordenados.
- Por eso el procesamiento debe ser **idempotente** y cada entidad debe recordar qué mensajes ya procesó.

## Sagas
Héctor García-Molina y Kenneth Salem propusieron en 1987 las **sagas** para transacciones largas en bases de datos, y la idea se volvió central en los microservicios. Una saga es una secuencia de **transacciones locales** T₁, T₂, …, Tₙ, cada una en su servicio; cada Tᵢ tiene una **compensación** Cᵢ que deshace semánticamente su efecto. Si Tₖ falla, se ejecutan Cₖ₋₁, …, C₁ en orden inverso.
~~~js
// Saga de salida de una unidad en PatioApp: si un paso falla, se compensa lo hecho en orden inverso
function ejecutarSaga(pasos, fallaEn) {
  const hechos = [], registro = [];
  for (let i = 0; i < pasos.length; i++) {
    if (i === fallaEn) { registro.push('✗ falló ' + pasos[i].nombre); for (const p of hechos.reverse()) registro.push('↩ ' + p.compensar); return registro; }
    hechos.push(pasos[i]); registro.push('✓ ' + pasos[i].nombre);
  }
  return registro;
}
const salida = [{ nombre: 'cobrar estadía', compensar: 'reembolsar cobro' }, { nombre: 'liberar espacio', compensar: 'volver a ocupar espacio' }, { nombre: 'emitir comprobante', compensar: 'anular comprobante' }];
console.log(ejecutarSaga(salida, 99).join(' · '));
console.log(ejecutarSaga(salida, 2).join(' · '));
~~~
Dos estilos de coordinación:
- **Orquestación:** un orquestador central indica a cada servicio qué hacer y lleva el estado de la saga. Más fácil de entender y de depurar.
- **Coreografía:** cada servicio reacciona a eventos de los demás ("cobro realizado" dispara "liberar espacio"). Más desacoplado, pero el flujo completo no está escrito en ningún lugar.
Advertencias:
- Una saga **no tiene aislamiento**: otros pueden ver estados intermedios (el cobro hecho y el espacio aún ocupado). Chris Richardson describe contramedidas en *Microservices Patterns*, como los **bloqueos semánticos** (marcar un registro como "en proceso").
- Las compensaciones no siempre son perfectas: un correo enviado no se "desenvía"; se envía otro de corrección. Por eso se ordenan los pasos dejando para el final los irreversibles.
- Las compensaciones y los reintentos también pueden fallar: deben ser **idempotentes** y reintentarse hasta lograrlo.

## Exactamente una vez
Los sistemas de mensajería ofrecen entregar **como máximo una vez** (puede perderse), **al menos una vez** (puede repetirse) o, idealmente, **exactamente una vez**. Entre sistemas independientes, la entrega exactamente una vez no puede garantizarse (recuerda los dos generales). Lo que sí se puede lograr es el **efecto** de exactamente una vez: entrega al menos una vez más **procesamiento idempotente**:
- Cada mensaje u operación lleva un **identificador único** (una clave de idempotencia).
- El receptor guarda los identificadores ya procesados, en la **misma transacción** en que aplica el efecto.
- Si llega un duplicado, responde lo mismo que la primera vez sin repetir el efecto.
Las pasarelas de pago, como Stripe, exigen claves de idempotencia en sus API justamente para que un reintento tras un corte no cobre dos veces. Apache Kafka incorporó en 2017 productores idempotentes y transacciones para lograr este efecto dentro de su ecosistema.

## Reintentos y tiempos de espera en las sagas
Cada paso de una saga puede terminar de tres formas: éxito, fallo definitivo (rechazado: tarjeta sin fondos) o **resultado desconocido** (se agotó el tiempo de espera). El tercero es el más delicado: no se sabe si el cobro se hizo. Las reglas prácticas:
- Ante un resultado desconocido, **reintentar con la misma clave de idempotencia**: si el cobro ya se hizo, el servicio responde el resultado original; si no, lo hace ahora.
- Distinguir errores **transitorios** (red, sobrecarga: se reintentan con espera exponencial) de **definitivos** (validación: se compensa).
- Poner un límite: tras varios intentos, la saga pasa a un estado de "requiere intervención" y alerta a una persona, en lugar de reintentar para siempre.
- El orquestador debe **persistir** su estado antes de cada paso, para retomar la saga tras una caída exactamente donde quedó.
Herramientas como Temporal (heredera de Cadence, de Uber) implementan estos flujos duraderos: el código del orquestador se escribe como una función normal y la plataforma guarda cada paso para reanudarlo tras cualquier caída.

## La bandeja de salida transaccional
Un error frecuente: guardar un cambio en la base de datos y luego publicar un evento en una cola. Si el proceso cae entre ambos, la base cambió y nadie se enteró (o al revés, si se publica primero). El patrón de la **bandeja de salida** (*transactional outbox*) lo resuelve: en la misma transacción local se guarda el cambio **y** una fila en una tabla «outbox» con el evento; un proceso aparte lee esa tabla y publica los eventos (con reintentos, al menos una vez), y los consumidores son idempotentes. Herramientas de **captura de cambios** (CDC), como Debezium, leen directamente el registro de la base para publicar los cambios. Una idea relacionada es el **registro de eventos como fuente de verdad** (*event sourcing*, descrito por Martin Fowler en 2005): guardar la secuencia de eventos y derivar el estado de ellos.

## Ejemplo resuelto: la salida de una unidad en PatioApp
La salida involucra tres servicios: Cobros, Espacios y Comprobantes electrónicos (que se comunica con la SUNAT). Diseño con una saga **orquestada**:
1. **Cobrar** la estadía con la pasarela de pago usando como clave de idempotencia el identificador de la salida. Compensación: reembolsar.
2. **Liberar** el espacio. Compensación: volver a ocuparlo (con un bloqueo semántico "salida en proceso" para que nadie lo asigne mientras tanto).
3. **Emitir** el comprobante electrónico: el paso irreversible va al final. Si falla de forma temporal, se reintenta con espera exponencial; si falla de forma definitiva, se compensan los pasos 2 y 1.
El orquestador guarda el estado de la saga en su base y publica cada orden mediante la bandeja de salida. Cada servicio registra los identificadores de las órdenes ya procesadas, de modo que los reintentos nunca duplican un cobro ni un comprobante.`,
  links: [['bd2.dist', 'la confirmación en dos fases se presentó en Bases de Datos II'], ['sd.intro', 'la idempotencia simula la semántica de exactamente una vez'], ['m13.dist', 'los microservicios necesitan coordinar operaciones entre servicios']],
  read: 'García-Molina y Salem (1987); Helland (2007); Richardson, *Microservices Patterns*, capítulo 4; Kleppmann, capítulos 9 y 11.',
  terms: [
    ['Confirmación bloqueante', 'propiedad de 2PC por la que los participantes preparados no pueden decidir si cae el coordinador', ['Retienen sus bloqueos hasta que vuelva.', 'Se mitiga replicando al coordinador.', '3PC intenta evitarla sin particiones.']],
    ['Saga', 'secuencia de transacciones locales con compensaciones que deshacen lo hecho si un paso falla', ['Cobrar, liberar espacio y emitir comprobante.', 'García-Molina y Salem la propusieron en 1987.', 'No tiene aislamiento.']],
    ['Compensación', 'acción que deshace semánticamente el efecto de un paso ya confirmado de una saga', ['Reembolsar un cobro.', 'Anular un comprobante.', 'Debe ser idempotente.']],
    ['Orquestación', 'coordinación de una saga por un componente central que indica a cada servicio qué hacer', ['El orquestador guarda el estado de la saga.', 'Es fácil de depurar.', 'Se contrapone a la coreografía.']],
    ['Coreografía', 'coordinación de una saga en la que cada servicio reacciona a los eventos de los demás', ['"Cobro realizado" dispara "liberar espacio".', 'Es muy desacoplada.', 'El flujo completo no está en un solo lugar.']],
    ['Clave de idempotencia', 'identificador único de una operación que permite al receptor detectar y descartar repeticiones', ['Stripe la exige en sus pagos.', 'Se guarda en la misma transacción que el efecto.', 'Hace seguros los reintentos.']],
    ['Bandeja de salida transaccional', 'patrón que guarda en la misma transacción el cambio y el evento a publicar, que otro proceso envía después', ['Evita cambiar la base sin avisar.', 'Garantiza la publicación al menos una vez.', 'Se combina con consumidores idempotentes.']],
    ['Bloqueo semántico', 'marca de aplicación que indica que un registro está en medio de una saga para que otros no lo usen', ['Espacio marcado "salida en proceso".', 'Compensa la falta de aislamiento de las sagas.', 'Se libera al terminar o compensar.']]
  ],
  q: [
    ['¿Qué problema tiene la confirmación en dos fases si cae el coordinador tras recibir los votos?', 'Los participantes preparados quedan bloqueados sin poder decidir', ['Se confirma en unos y no en otros', 'Se pierden los datos', 'Ninguno'], 'Es un protocolo bloqueante.', 3],
    ['En una saga con pasos T1, T2 y T3, falla T3. ¿Qué se ejecuta?', 'C2 y luego C1', ['C1 y luego C2', 'C3, C2 y C1', 'Nada'], 'Las compensaciones van en orden inverso a lo hecho.', 2],
    ['¿Qué propiedad ACID no tienen las sagas?', 'Aislamiento', ['Atomicidad semántica', 'Durabilidad', 'Ninguna'], 'Otros pueden ver estados intermedios.', 3],
    ['¿Por qué conviene dejar el paso irreversible al final de una saga?', 'Porque si algo falla antes, no habrá que compensarlo', ['Porque es más rápido', 'Porque la base lo exige', 'Porque así no hace falta idempotencia'], 'Un correo o comprobante no se deshace fácilmente.', 3],
    ['¿Cómo se logra el efecto de "exactamente una vez" entre servicios?', 'Con entrega al menos una vez y procesamiento idempotente con identificadores únicos', ['Con UDP', 'Con entrega como máximo una vez', 'No reintentando nunca'], 'La entrega exacta no se garantiza, pero el efecto sí.', 3],
    ['¿Qué problema resuelve la bandeja de salida transaccional?', 'Que la base cambie y el evento no se publique (o al revés) si el proceso cae entre ambos', ['La lentitud de las consultas', 'Los interbloqueos', 'El cifrado de los eventos'], 'El evento se guarda en la misma transacción.', 3],
    ['¿Qué sostiene Pat Helland en Life beyond Distributed Transactions?', 'Que los sistemas muy escalables usan transacciones de una sola entidad coordinadas con mensajes idempotentes', ['Que 2PC escala sin límite', 'Que no hacen falta mensajes', 'Que la idempotencia es imposible'], 'Helland, CIDR 2007.', 4],
    { tf: 'En la coreografía, el flujo completo de la saga está escrito en un único componente.', v: false, e: 'Eso describe la orquestación; en la coreografía el flujo emerge de las reacciones.', l: 2 },
    { tf: 'Las compensaciones de una saga también deben poder reintentarse sin efectos duplicados.', v: true, e: 'También pueden fallar y repetirse.', l: 2 },
    { c: 'Escribe «compensaciones(pasos, fallaEn)»: pasos es la lista de nombres; si falla el paso de índice fallaEn, devuelve los pasos ya hechos que hay que compensar, en el orden en que se compensan.', f: 'compensaciones', p: ['pasos', 'fallaEn'], t: [[[['reservar', 'cobrar', 'notificar'], 2], ['cobrar', 'reservar']], [[['a', 'b'], 0], []], [[['a', 'b', 'c', 'd'], 3], ['c', 'b', 'a']]], sol: '  return pasos.slice(0, fallaEn).reverse();', l: 1 },
    { c: 'Escribe «procesarIdempotente(mensajes)»: cada mensaje es {id, monto}; suma los montos procesando cada id una sola vez.', f: 'procesarIdempotente', p: ['mensajes'], t: [[[[{ id: 'a', monto: 10 }, { id: 'b', monto: 5 }, { id: 'a', monto: 10 }]], 15], [[[]], 0], [[[{ id: 'x', monto: 3 }, { id: 'x', monto: 3 }, { id: 'x', monto: 3 }]], 3]], sol: '  const vistos = new Set();\n  let t = 0;\n  for (const m of mensajes) if (!vistos.has(m.id)) { vistos.add(m.id); t += m.monto; }\n  return t;', l: 2 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var n = R.int(3, 6), f = R.int(0, n - 1), nombres = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].slice(0, n); var c = nombres.slice(0, f).reverse().map(function (x) { return 'C' + x.slice(1); }); g.mcq(3, 'Una saga tiene los pasos ' + nombres.join(', ') + ' y falla ' + nombres[f] + '. ¿Qué compensaciones se ejecutan?', c.length ? c.join(', ') : 'Ninguna', [c.length ? 'Ninguna' : 'C1', nombres.slice(0, f + 1).map(function (x) { return 'C' + x.slice(1); }).join(', ') || 'C1, C2', nombres.slice(0, f).map(function (x) { return 'C' + x.slice(1); }).join(', ') + (f ? ' (en orden directo)' : 'C2')], 'Se compensan los pasos ya hechos en orden inverso.'); });
    var sem = [['Un mensaje puede perderse pero nunca repetirse', 'Como máximo una vez'], ['Un mensaje puede repetirse pero nunca perderse', 'Al menos una vez'], ['Reintentos con claves de idempotencia en el receptor', 'Efecto de exactamente una vez']];
    sem.forEach(function (s) { g.mcq(2, '¿Qué semántica de entrega describe esto? ' + s[0], s[1], ['Como máximo una vez', 'Al menos una vez', 'Efecto de exactamente una vez', 'Ninguna vez'].filter(function (x) { return x !== s[1]; }), 'Semánticas de entrega de mensajes.'); });
    var pat = [['Guardar el evento en la misma transacción que el cambio y publicarlo después', 'Bandeja de salida transaccional'], ['Un componente central dirige los pasos de la saga', 'Orquestación'], ['Cada servicio reacciona a los eventos de los otros', 'Coreografía'], ['Marcar un registro como "en proceso" durante la saga', 'Bloqueo semántico'], ['Guardar los identificadores de las operaciones ya aplicadas', 'Clave de idempotencia']];
    pat.forEach(function (p) { g.mcq(2, '¿Qué patrón describe esto? ' + p[0], p[1], ['Bandeja de salida transaccional', 'Orquestación', 'Coreografía', 'Bloqueo semántico', 'Clave de idempotencia'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Patrones para coordinar servicios.'); });
  },
  checks: [
    ['¿Por qué 2PC es bloqueante y cómo lo mitiga Spanner?', 'Porque los participantes preparados dependen del coordinador para decidir; Spanner replica al coordinador con Paxos para que no desaparezca.'],
    ['Diseña una saga para reservar vuelo, hotel y auto con sus compensaciones.', 'Reservar vuelo (cancelar vuelo), reservar hotel (cancelar hotel), reservar auto (cancelar auto); si falla uno, se cancelan los anteriores en orden inverso.'],
    ['Compara orquestación y coreografía.', 'La orquestación centraliza el flujo y es fácil de depurar; la coreografía desacopla los servicios pero dispersa el flujo.'],
    ['¿Cómo se logra el efecto de exactamente una vez?', 'Reintentando hasta tener confirmación (al menos una vez) y haciendo idempotente el receptor con identificadores únicos guardados en la misma transacción que el efecto.'],
    ['Explica el patrón de la bandeja de salida transaccional.', 'Se guarda en la misma transacción local el cambio y el evento en una tabla outbox; otro proceso publica esos eventos con reintentos y los consumidores son idempotentes.']
  ],
  cites: ['Garcia-Molina, H. y Salem, K. (1987). Sagas. *SIGMOD 1987*.', 'Helland, P. (2007). Life beyond Distributed Transactions: an Apostate’s Opinion. *CIDR 2007*.', 'Skeen, D. (1981). Nonblocking Commit Protocols. *SIGMOD 1981*.', 'Richardson, C. (2018). *Microservices Patterns*. Manning.', 'Fowler, M. (2005). Event Sourcing. martinfowler.com.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*, capítulos 9 y 11. O’Reilly.'],
  project: { t: 'Saga con orquestador y bandeja de salida',
    goal: 'Implementar una operación distribuida confiable entre tres servicios.',
    steps: ['Crea tres servicios pequeños con su propia base de datos (por ejemplo, pedidos, pagos e inventario).', 'Implementa una saga orquestada con compensaciones y estado persistente del orquestador.', 'Implementa la bandeja de salida en cada servicio y consumidores idempotentes con claves únicas.', 'Inyecta fallas (caídas, mensajes duplicados y perdidos) y verifica que el sistema siempre termina consistente.', 'Documenta qué estados intermedios pueden ver otros usuarios y qué contramedidas aplicaste.'],
    deliver: 'El código de los servicios, las pruebas de fallas y el documento de diseño.' },
  hito: ['Implementa la salida de una unidad en PatioApp como una saga orquestada (cobrar, liberar espacio, emitir comprobante) con compensaciones y el paso irreversible al final.', 'Agrega a los servicios de PatioApp la bandeja de salida transaccional y claves de idempotencia, y prueba que los reintentos nunca duplican un cobro ni un comprobante.']
});
})();
