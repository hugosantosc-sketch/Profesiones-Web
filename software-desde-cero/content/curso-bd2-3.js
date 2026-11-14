(function () {
var S = SDC.S;

S('bd2', 'bd2.tx', { title: 'Transacciones y control de concurrencia',
  ask: '¿Qué concepto de transacciones o control de concurrencia se aplica?',
  lesson: `
> **La idea en simple.** Dos cajeros de banco atienden a la vez a dos personas que retiran dinero de la misma cuenta compartida. Si ambos consultan el saldo, ven S/ 500, entregan S/ 400 cada uno y escriben "saldo S/ 100", el banco perdió S/ 400. Una transacción es la promesa de que, aunque miles de operaciones ocurran al mismo tiempo, el resultado será como si hubieran ocurrido de a una.

## Las propiedades ACID
Jim Gray desarrolló el concepto moderno de transacción en los años 70 (recibió el Premio Turing en 1998), y Theo Härder y Andreas Reuter acuñaron en 1983 el acrónimo **ACID**:
- **Atomicidad:** todo o nada. Si una transacción falla a la mitad, se deshace por completo.
- **Consistencia:** una transacción lleva la base de un estado válido a otro válido (respetando restricciones e invariantes del negocio).
- **Aislamiento:** las transacciones concurrentes no ven los estados intermedios de las demás; el resultado es como si se ejecutaran en algún orden secuencial.
- **Durabilidad:** lo confirmado (COMMIT) sobrevive a caídas.
La atomicidad y la durabilidad las garantiza la **recuperación** (siguiente unidad); el aislamiento, el **control de concurrencia** (esta unidad); la consistencia es responsabilidad compartida con la aplicación.

## Planes y serializabilidad
Un **plan** (*schedule*) es un intercalado de las operaciones de lectura (R) y escritura (W) de varias transacciones. Un plan es **serial** si las transacciones van una tras otra completas, y **serializable** si su efecto es igual al de algún plan serial. La noción práctica es la **serializabilidad por conflictos**: dos operaciones están en **conflicto** si son de transacciones distintas, tocan el mismo dato y al menos una es escritura (R-W, W-R o W-W). Un plan es serializable por conflictos si se puede convertir en uno serial intercambiando operaciones adyacentes que no estén en conflicto.

La prueba es el **grafo de precedencia**: un nodo por transacción y una arista Tᵢ → Tⱼ si una operación de Tᵢ está en conflicto con una posterior de Tⱼ. **El plan es serializable por conflictos si y solo si el grafo no tiene ciclos**, y un orden topológico da el plan serial equivalente.
~~~js
// Grafo de precedencia de un plan: [transacción, 'R' o 'W', dato]
function serializable(plan) {
  const aristas = new Set();
  plan.forEach(([ti, oi, x], i) => plan.slice(i + 1).forEach(([tj, oj, y]) => {
    if (ti !== tj && x === y && (oi === 'W' || oj === 'W')) aristas.add(ti + '>' + tj);
  }));
  const hayCiclo = [...aristas].some(a => { const [u, v] = a.split('>'); return aristas.has(v + '>' + u); });
  return [...aristas].join(', ') + (hayCiclo ? ' → hay ciclo: no serializable' : ' → serializable');
}
console.log(serializable([['T1', 'R', 'saldo'], ['T2', 'R', 'saldo'], ['T1', 'W', 'saldo'], ['T2', 'W', 'saldo']]));
console.log(serializable([['T1', 'R', 'saldo'], ['T1', 'W', 'saldo'], ['T2', 'R', 'saldo'], ['T2', 'W', 'saldo']]));
~~~
(El código detecta ciclos de dos transacciones; uno general usaría una búsqueda en profundidad.) El primer plan es el de los cajeros: T1 → T2 por la lectura y escritura de saldo, y T2 → T1 también; hay ciclo, se pierde una actualización.

## Bloqueo en dos fases
El mecanismo clásico para garantizar serializabilidad es el **bloqueo en dos fases** (2PL), demostrado correcto por Kapali Eswaran, Jim Gray, Raymond Lorie e Irving Traiger en 1976:
- Antes de leer un dato se toma un bloqueo **compartido** (S); antes de escribirlo, uno **exclusivo** (X). Varios S son compatibles entre sí; X es incompatible con todo.
- Cada transacción tiene una **fase de crecimiento**, en la que solo adquiere bloqueos, y una **fase de decrecimiento**, en la que solo los libera. Nunca adquiere después de haber liberado.
2PL garantiza serializabilidad por conflictos, pero permite **abortos en cascada** (si T2 leyó algo que escribió T1 y luego T1 aborta, T2 también debe abortar). Por eso los motores usan **2PL estricto**: los bloqueos exclusivos se mantienen hasta el COMMIT o el ROLLBACK. Con bloqueos aparecen los **interbloqueos**, que el motor detecta con un grafo de espera y resuelve abortando una víctima, como viste en sistemas operativos.

Para no bloquear una tabla entera cuando basta una fila, se usa **bloqueo jerárquico**: antes de bloquear una fila, se pone un bloqueo de **intención** en la tabla (IS o IX), que avisa a quien quiera bloquear la tabla completa.

## Fantasmas
Bloquear las filas existentes no impide que otra transacción **inserte** una fila nueva que cumpla una condición ya leída: al repetir la consulta aparece un **fantasma**. Se evita bloqueando el **predicado** o, en la práctica, rangos del índice (*next-key locking* en InnoDB).

## Niveles de aislamiento
La serializabilidad cuesta concurrencia. La norma SQL-92 definió niveles más débiles por las anomalías que permiten:
| Nivel | Lectura sucia | Lectura no repetible | Fantasma |
| READ UNCOMMITTED | posible | posible | posible |
| READ COMMITTED | no | posible | posible |
| REPEATABLE READ | no | no | posible |
| SERIALIZABLE | no | no | no |
- **Lectura sucia:** leer un dato escrito por una transacción que aún no confirmó (y que podría abortar).
- **Lectura no repetible:** leer dos veces la misma fila y obtener valores distintos porque otra transacción la cambió y confirmó entre medio.
- **Fantasma:** repetir una consulta con condición y obtener filas nuevas.
Hal Berenson y sus coautores mostraron en 1995 (*A Critique of ANSI SQL Isolation Levels*) que esta definición es ambigua y omite anomalías, como la **actualización perdida** y el **sesgo de escritura**. La mayoría de los motores usan por defecto READ COMMITTED (PostgreSQL, Oracle, SQL Server) o REPEATABLE READ (MySQL InnoDB).

## Control de concurrencia multiversión
En lugar de bloquear lecturas, el **control multiversión** (MVCC) guarda varias versiones de cada fila con las transacciones que las crearon y borraron. Cada transacción lee una **instantánea** consistente de la base al momento de empezar (o de cada sentencia, en READ COMMITTED): **los lectores no bloquean a los escritores ni los escritores a los lectores**. PostgreSQL, Oracle, MySQL InnoDB y SQL Server (opcional) lo usan.

El **aislamiento por instantáneas** evita las lecturas sucias, las no repetibles y los fantasmas, y si dos transacciones escriben la misma fila, una aborta. Pero no es serializable: permite el **sesgo de escritura**. Ejemplo clásico: una clínica exige al menos un médico de guardia; dos médicos de guardia piden la baja a la vez, cada uno lee "hay 2 de guardia", cada uno actualiza **su propia fila** y ambos confirman: no queda nadie. No hubo conflicto de escritura sobre la misma fila, así que la instantánea no lo detecta. Michael Cahill, Uwe Röhm y Alan Fekete propusieron en 2008 el **aislamiento por instantáneas serializable** (SSI), que detecta estos patrones peligrosos y aborta una transacción; PostgreSQL lo implementa desde 2011 en su nivel SERIALIZABLE.

## Control optimista
El **control optimista** (H. T. Kung y John Robinson, 1981) supone que los conflictos son raros: la transacción trabaja sin bloqueos y, al confirmar, **valida** que nadie haya cambiado lo que leyó; si alguien lo hizo, aborta y reintenta. Las aplicaciones lo usan a menudo con una columna de **versión**: «UPDATE … SET …, version = version + 1 WHERE id = 7 AND version = 3»; si actualiza cero filas, alguien se adelantó.

## Ejemplo resuelto: reservar un espacio del patio
Dos operadores asignan a la vez el último espacio libre del patio 3. Con READ COMMITTED y el código «SELECT COUNT(*) libres; si > 0, INSERT asignación», ambos leen 1 libre y ambos insertan: sesgo de escritura, dos vehículos en un espacio. Tres soluciones correctas:
1. **Bloqueo explícito:** «SELECT … FROM espacio WHERE id = 42 FOR UPDATE» antes de asignarlo; el segundo operador espera y luego ve que ya está ocupado.
2. **Restricción en la base:** un índice único sobre (espacio, activo); el segundo INSERT falla y la aplicación lo informa.
3. **SERIALIZABLE** en PostgreSQL: una de las dos transacciones aborta con un error de serialización y la aplicación la reintenta.
PatioApp usa la opción 2 como red de seguridad (la base garantiza la regla aunque el código tenga errores) y la 1 para dar un mensaje claro al operador.`,
  links: [['so.sync', 'los bloqueos de las transacciones aplican las ideas de sincronización'], ['so.dead', 'los motores detectan interbloqueos con grafos de espera'], ['bd2.recovery', 'la atomicidad y la durabilidad las garantiza la recuperación']],
  read: 'Silberschatz, Korth y Sudarshan, capítulos 17 y 18; Gray y Reuter, *Transaction Processing*; Berenson y otros (1995); Kleppmann, *Designing Data-Intensive Applications*, capítulo 7.',
  terms: [
    ['Atomicidad', 'propiedad de que una transacción se aplica completa o no se aplica nada', ['Una transferencia descuenta y abona, o ninguna de las dos.', 'Si falla a la mitad, se deshace.', 'La garantiza la recuperación.']],
    ['Serializabilidad por conflictos', 'propiedad de un plan de poder transformarse en uno serial intercambiando operaciones que no están en conflicto', ['Se prueba con el grafo de precedencia.', 'El grafo debe ser acíclico.', 'Es lo que garantiza 2PL.']],
    ['Grafo de precedencia', 'grafo con una arista Ti → Tj si una operación de Ti entra en conflicto con una posterior de Tj', ['Un ciclo indica que el plan no es serializable.', 'Su orden topológico da el plan serial equivalente.', 'Considera conflictos R-W, W-R y W-W.']],
    ['Bloqueo en dos fases', 'protocolo en que cada transacción adquiere todos sus bloqueos antes de liberar cualquiera', ['Garantiza serializabilidad.', 'La versión estricta mantiene los bloqueos exclusivos hasta el commit.', 'Eswaran, Gray, Lorie y Traiger lo demostraron en 1976.']],
    ['Lectura sucia', 'lectura de un dato escrito por una transacción que todavía no confirmó', ['Ver un pago que luego se revierte.', 'Solo ocurre en READ UNCOMMITTED.', 'Puede causar abortos en cascada.']],
    ['Fantasma', 'fila nueva que aparece al repetir una consulta con condición porque otra transacción la insertó', ['Contar unidades del patio y obtener una más la segunda vez.', 'Bloquear filas existentes no lo evita.', 'Se evita con bloqueos de rango o predicado.']],
    ['MVCC', 'control de concurrencia que guarda varias versiones de cada fila para que cada transacción lea una instantánea consistente', ['Los lectores no bloquean a los escritores.', 'PostgreSQL e InnoDB lo usan.', 'Requiere limpiar versiones viejas.']],
    ['Sesgo de escritura', 'anomalía en que dos transacciones leen datos que se solapan, escriben datos distintos y juntas violan una regla', ['Dos médicos se dan de baja y no queda guardia.', 'El aislamiento por instantáneas lo permite.', 'SSI lo detecta.']]
  ],
  q: [
    ['¿Qué propiedad ACID garantiza que lo confirmado sobreviva a una caída del servidor?', 'Durabilidad', ['Atomicidad', 'Consistencia', 'Aislamiento'], 'La garantiza el registro de recuperación.', 1],
    ['En el plan R1(A), R2(A), W1(A), W2(A), ¿qué muestra el grafo de precedencia?', 'Un ciclo entre T1 y T2: no es serializable', ['Solo T1 → T2: serializable', 'Ninguna arista', 'Solo T2 → T1: serializable'], 'Es una actualización perdida.', 3],
    ['¿Qué regla define al bloqueo en dos fases?', 'Ninguna transacción adquiere un bloqueo después de haber liberado alguno', ['Cada transacción usa solo dos bloqueos', 'Se bloquea en dos tablas a la vez', 'Los bloqueos duran dos segundos'], 'Fase de crecimiento y luego de decrecimiento.', 2],
    ['¿Por qué los motores usan 2PL estricto?', 'Para evitar abortos en cascada manteniendo los bloqueos exclusivos hasta el commit', ['Para tener menos interbloqueos siempre', 'Para no usar bloqueos', 'Porque 2PL no es serializable'], 'Nadie lee datos no confirmados.', 3],
    ['¿Qué anomalías permite READ COMMITTED según SQL-92?', 'Lecturas no repetibles y fantasmas', ['Solo lecturas sucias', 'Ninguna', 'Solo fantasmas'], 'Evita las lecturas sucias.', 3],
    ['¿Qué ventaja principal tiene MVCC?', 'Los lectores no bloquean a los escritores ni al revés', ['Ocupa menos espacio', 'No necesita índices', 'Elimina toda anomalía'], 'Cada transacción lee su instantánea.', 2],
    ['Dos médicos de guardia se dan de baja a la vez bajo aislamiento por instantáneas y no queda nadie. ¿Qué anomalía es?', 'Sesgo de escritura', ['Lectura sucia', 'Fantasma', 'Interbloqueo'], 'Escriben filas distintas tras leer datos que se solapan.', 4],
    ['En control optimista con columna de versión, ¿qué significa que el UPDATE afecte cero filas?', 'Que otra transacción cambió la fila antes y hay que reintentar', ['Que la fila no existe nunca', 'Que la base está caída', 'Que el UPDATE fue exitoso'], 'La versión ya no coincide.', 3],
    { tf: 'El aislamiento por instantáneas es equivalente a la serializabilidad.', v: false, e: 'Permite el sesgo de escritura; SSI lo corrige.', l: 3 },
    { tf: 'Un plan es serializable por conflictos si y solo si su grafo de precedencia no tiene ciclos.', v: true, e: 'Es el teorema central de la serializabilidad.', l: 2 },
    { c: 'Escribe «serializable(plan)»: plan es una lista de [transacción, "R" o "W", dato]; construye el grafo de precedencia y devuelve true si no tiene ciclos.', f: 'serializable', p: ['plan'], t: [[[[['T1', 'R', 'A'], ['T2', 'W', 'A'], ['T1', 'W', 'A']]], false], [[[['T1', 'R', 'A'], ['T1', 'W', 'A'], ['T2', 'R', 'A'], ['T2', 'W', 'A']]], true], [[[['T1', 'R', 'A'], ['T2', 'R', 'A']]], true], [[[['T1', 'W', 'A'], ['T2', 'R', 'A'], ['T2', 'W', 'B'], ['T3', 'R', 'B'], ['T3', 'W', 'C'], ['T1', 'R', 'C']]], false]], sol: '  const ady = {};\n  plan.forEach(([ti, oi, x], i) => plan.slice(i + 1).forEach(([tj, oj, y]) => {\n    if (ti !== tj && x === y && (oi === "W" || oj === "W")) (ady[ti] = ady[ti] || new Set()).add(tj);\n  }));\n  const est = {};\n  const dfs = n => { if (est[n] === 1) return true; if (est[n] === 2) return false; est[n] = 1; for (const m of ady[n] || []) if (dfs(m)) return true; est[n] = 2; return false; };\n  return !Object.keys(ady).some(dfs);', h: 'Agrega una arista por cada par de operaciones en conflicto y busca un ciclo en profundidad.', l: 4 },
    { c: 'Escribe «anomaliaPosible(nivel, anomalia)» según SQL-92: niveles "READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"; anomalías "sucia", "no repetible", "fantasma".', f: 'anomaliaPosible', p: ['nivel', 'anomalia'], t: [[['READ COMMITTED', 'sucia'], false], [['READ COMMITTED', 'fantasma'], true], [['REPEATABLE READ', 'fantasma'], true], [['REPEATABLE READ', 'no repetible'], false], [['SERIALIZABLE', 'fantasma'], false], [['READ UNCOMMITTED', 'sucia'], true]], sol: '  const orden = ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"];\n  const evita = { sucia: 1, "no repetible": 2, fantasma: 3 };\n  return orden.indexOf(nivel) < evita[anomalia];', l: 2 },
    { c: 'Escribe «cumple2PL(ops)»: ops es la secuencia de una transacción con "L" (adquirir) y "U" (liberar); devuelve true si nunca adquiere después de haber liberado.', f: 'cumple2PL', p: ['ops'], t: [[[['L', 'L', 'U', 'U']], true], [[['L', 'U', 'L', 'U']], false], [[[]], true], [[['L', 'L', 'L']], true]], sol: '  let libero = false;\n  for (const o of ops) { if (o === "U") libero = true; else if (libero) return false; }\n  return true;', l: 1 }
  ],
  gen: function (g) {
    var niveles = ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], anom = [['lecturas sucias', 1], ['lecturas no repetibles', 2], ['fantasmas', 3]];
    niveles.forEach(function (n, i) { anom.forEach(function (a) { g.tf(2, 'Según SQL-92, el nivel ' + n + ' permite ' + a[0] + '.', i < a[1], 'Cada nivel evita una anomalía más que el anterior.'); }); });
    var ac = [['Si el servidor cae justo después del COMMIT, la transferencia sigue registrada', 'Durabilidad'], ['Si el abono falla, el débito también se deshace', 'Atomicidad'], ['Otra transacción no ve el saldo a medio actualizar', 'Aislamiento'], ['El saldo nunca queda negativo por una restricción CHECK', 'Consistencia']];
    ac.forEach(function (a) { g.mcq(1, '¿Qué propiedad ACID ilustra esto? ' + a[0], a[1], ['Atomicidad', 'Consistencia', 'Aislamiento', 'Durabilidad'].filter(function (x) { return x !== a[1]; }), 'Härder y Reuter, 1983.'); });
    var conf = [['R1(A) y W2(A)', 'Sí'], ['R1(A) y R2(A)', 'No'], ['W1(A) y W2(A)', 'Sí'], ['W1(A) y R2(B)', 'No'], ['W1(A) y R1(A)', 'No'], ['W1(B) y R2(B)', 'Sí']];
    conf.forEach(function (c) { g.mcq(2, '¿Están en conflicto las operaciones ' + c[0] + '?', c[1], [c[1] === 'Sí' ? 'No' : 'Sí', 'Solo si hay índices', 'Solo en SERIALIZABLE'], 'Conflicto: transacciones distintas, mismo dato y al menos una escritura.'); });
  },
  checks: [
    ['Explica cada propiedad ACID con un ejemplo de PatioApp.', 'Atomicidad: el cobro y la salida se registran juntos o nada; consistencia: un espacio no tiene dos vehículos; aislamiento: un reporte no ve un cobro a medias; durabilidad: un cobro confirmado sobrevive a una caída.'],
    ['¿Cómo se decide si un plan es serializable por conflictos?', 'Se construye el grafo de precedencia con una arista por cada par de operaciones en conflicto y se verifica que no tenga ciclos.'],
    ['¿Qué garantiza 2PL estricto y qué problema introduce?', 'Garantiza serializabilidad sin abortos en cascada; introduce bloqueos que pueden causar esperas e interbloqueos.'],
    ['Diferencia lectura no repetible y fantasma.', 'En la no repetible cambia el valor de una fila ya leída; en el fantasma aparecen filas nuevas que cumplen una condición ya consultada.'],
    ['Describe el sesgo de escritura y tres formas de evitarlo.', 'Dos transacciones leen datos que se solapan, escriben filas distintas y juntas violan una regla; se evita con SELECT FOR UPDATE, con una restricción única o con aislamiento SERIALIZABLE.']
  ],
  cites: ['Gray, J. y Reuter, A. (1992). *Transaction Processing: Concepts and Techniques*. Morgan Kaufmann.', 'Härder, T. y Reuter, A. (1983). Principles of Transaction-Oriented Database Recovery. *ACM Computing Surveys*, 15(4).', 'Eswaran, K., Gray, J., Lorie, R. y Traiger, I. (1976). The Notions of Consistency and Predicate Locks in a Database System. *Communications of the ACM*, 19(11).', 'Berenson, H. et al. (1995). A Critique of ANSI SQL Isolation Levels. *SIGMOD 1995*.', 'Cahill, M., Röhm, U. y Fekete, A. (2008). Serializable Isolation for Snapshot Databases. *SIGMOD 2008*.', 'Kung, H. T. y Robinson, J. (1981). On Optimistic Methods for Concurrency Control. *ACM Transactions on Database Systems*, 6(2).'],
  project: { t: 'Laboratorio de aislamiento',
    goal: 'Provocar cada anomalía en una base real y demostrar cómo evitarla.',
    steps: ['Con dos sesiones de PostgreSQL, reproduce una lectura no repetible y un fantasma en READ COMMITTED.', 'Reproduce una actualización perdida y corrígela con SELECT FOR UPDATE y con control optimista por versión.', 'Reproduce el sesgo de escritura de los médicos de guardia en REPEATABLE READ y muestra que SERIALIZABLE lo detecta.', 'Implementa un verificador de serializabilidad con grafo de precedencia para planes escritos a mano.', 'Escribe una guía de qué nivel de aislamiento usar en cada operación de un sistema.'],
    deliver: 'Los guiones de las sesiones, el verificador y la guía.' },
  hito: ['Protege la asignación de espacios de PatioApp contra el sesgo de escritura con un índice único y SELECT FOR UPDATE, y demuéstralo con una prueba de dos transacciones concurrentes.', 'Documenta el nivel de aislamiento de cada operación crítica de PatioApp (cobro, asignación de espacio, reporte) y agrega reintentos ante errores de serialización.']
});

S('bd2', 'bd2.recovery', { title: 'Recuperación ante fallas y registro por adelantado',
  ask: '¿Qué concepto de recuperación ante fallas se aplica?',
  lesson: `
> **La idea en simple.** Un contador que lleva el libro de caja anota primero en un cuaderno borrador cada movimiento con su monto anterior y el nuevo, y solo después lo pasa en limpio. Si se corta la luz a mitad del día, con el cuaderno puede rehacer lo que se aprobó y deshacer lo que quedó a medias. Eso es exactamente el **registro por adelantado** de una base de datos.

## Qué puede fallar
- **Falla de transacción:** un error lógico (violación de restricción, división entre cero) o un aborto por interbloqueo.
- **Caída del sistema:** se corta la energía o se cae el proceso; se pierde la memoria (incluido el buffer pool) pero el disco sobrevive.
- **Falla del medio:** se daña el disco. Solo se recupera con copias en otros medios (respaldos y réplicas).
La recuperación debe garantizar **atomicidad** (las transacciones no confirmadas desaparecen) y **durabilidad** (las confirmadas permanecen), sin hacer cada operación demasiado lenta.

## Las decisiones del buffer: robar y forzar
El buffer pool modifica páginas en memoria y las escribe más tarde. Dos políticas definen la recuperación:
- **Robar** (*steal*): ¿se permite escribir a disco una página modificada por una transacción **aún no confirmada** (por ejemplo, para liberar un marco)? Si sí, tras una caída puede haber en disco cambios que hay que **deshacer**.
- **Forzar** (*force*): ¿se obliga a escribir a disco todas las páginas de una transacción **antes** de confirmarla? Si no, tras una caída puede faltar en disco algo confirmado que hay que **rehacer**.
La combinación más eficiente es **robar y no forzar**: el buffer tiene libertad total y el commit es rápido, a cambio de que la recuperación sepa deshacer y rehacer. Es lo que hacen los motores reales, gracias al registro.

## El registro por adelantado
El **registro** (*log*, en PostgreSQL llamado WAL) es un archivo de solo agregar donde cada cambio se describe con un **número de secuencia** (LSN), la transacción, la página y los valores anterior (para deshacer) y nuevo (para rehacer). Dos reglas de oro:
1. **Antes de escribir una página modificada a disco, se escriben en disco los registros que describen sus cambios** (de ahí "por adelantado"). Cada página guarda el LSN de su último cambio (*pageLSN*) para comprobarlo.
2. **Antes de confirmar una transacción, se escriben en disco todos sus registros, incluido el de COMMIT.** La transacción está confirmada cuando su registro de COMMIT llega al disco, aunque sus páginas sigan solo en memoria.
Escribir el registro es secuencial y barato; las páginas de datos, dispersas, se escriben después y en lote. Para no pagar un fsync por cada commit, los motores agrupan las confirmaciones de muchas transacciones en una sola escritura (**confirmación agrupada**, *group commit*).

## ARIES
C. Mohan y sus coautores de IBM publicaron en 1992 **ARIES**, el algoritmo de recuperación que inspiró a la mayoría de los motores. Tras una caída, se ejecutan tres fases:
1. **Análisis:** se lee el registro desde el último punto de control para saber qué transacciones estaban activas (las **perdedoras**) y qué páginas podían estar sucias.
2. **Rehacer:** se repite la historia: se reaplican **todos** los cambios registrados (de ganadoras y de perdedoras) que no estén ya en las páginas, comparando cada LSN con el pageLSN. Así la base queda exactamente como estaba en el instante de la caída.
3. **Deshacer:** se revierten, de atrás hacia adelante, los cambios de las transacciones perdedoras. Cada reversión escribe a su vez un **registro de compensación** (CLR), para que, si el sistema vuelve a caer durante la recuperación, no se deshaga dos veces lo mismo.
"Repetir la historia y luego deshacer" simplifica mucho el algoritmo y admite bloqueos finos a nivel de fila.
~~~js
// Recuperación simplificada: rehacer todo y deshacer las transacciones sin COMMIT
function recuperar(inicial, log) {
  const db = { ...inicial }, confirmadas = new Set(log.filter(r => r.tipo === 'COMMIT').map(r => r.tx));
  for (const r of log) if (r.tipo === 'UPDATE') db[r.item] = r.nuevo;                    // rehacer: repetir la historia
  for (const r of [...log].reverse()) if (r.tipo === 'UPDATE' && !confirmadas.has(r.tx)) db[r.item] = r.viejo;  // deshacer perdedoras
  return db;
}
const log = [
  { tx: 'T1', tipo: 'BEGIN' }, { tx: 'T1', tipo: 'UPDATE', item: 'espacio42', viejo: 'libre', nuevo: 'ABC-123' },
  { tx: 'T2', tipo: 'BEGIN' }, { tx: 'T2', tipo: 'UPDATE', item: 'caja', viejo: 500, nuevo: 650 },
  { tx: 'T1', tipo: 'COMMIT' } // aquí se cae el servidor: T2 no llegó a confirmar
];
console.log(recuperar({ espacio42: 'libre', caja: 500 }, log));
~~~

## Puntos de control
Sin ayuda, la recuperación tendría que leer el registro desde el principio de los tiempos. Un **punto de control** (*checkpoint*) anota en el registro qué transacciones estaban activas y qué páginas estaban sucias, y fuerza (o programa) la escritura de páginas sucias, para que la recuperación pueda empezar cerca de él. ARIES usa **puntos de control difusos**, que no detienen la actividad normal mientras se toman. El intervalo entre puntos de control es un compromiso: más frecuentes acortan la recuperación pero generan más escrituras.

## Deshacer y rehacer en otros diseños
No todos los motores siguen ARIES al pie de la letra:
- **PostgreSQL** solo necesita **rehacer**: como con MVCC las versiones de una transacción abortada quedan marcadas como inválidas en lugar de borrarse, tras una caída basta con reaplicar el WAL desde el último punto de control y considerar abortadas las transacciones sin COMMIT; VACUUM limpia después.
- **InnoDB** combina un **registro de rehacer** con un **registro de deshacer** que guarda las versiones anteriores de las filas, usado tanto para revertir como para servir lecturas de instantáneas.
- **SQLite** ofrece dos modos: un diario de **reversión** (copiar la página original antes de modificarla) o un **WAL** al estilo de los grandes motores.
Las bases en memoria (como Redis con persistencia o VoltDB) registran las operaciones o toman **instantáneas** periódicas, y la replicación síncrona a otros nodos reemplaza en parte al disco como garantía de durabilidad.

## Escrituras atómicas en el disco
El registro asume que escribir un bloque es atómico, pero un corte de luz puede dejar una página de 8 KB **a medio escribir** (*torn page*). PostgreSQL lo resuelve escribiendo la **página completa** en el WAL la primera vez que se modifica tras cada punto de control; InnoDB usa un **búfer de doble escritura**. Por eso desactivar estas protecciones para "ganar velocidad" puede corromper la base ante el primer corte.

## Respaldos, archivo del registro y réplicas
Para las fallas del medio y los errores humanos (un «DELETE» sin «WHERE») hacen falta copias:
- **Respaldo completo** periódico de la base.
- **Archivo continuo del registro:** guardar cada segmento del WAL fuera del servidor permite la **recuperación a un instante** (*point-in-time recovery*): restaurar el último respaldo y reaplicar el registro hasta el minuto anterior al error.
- **Réplicas:** otros servidores que reciben el registro y lo aplican de forma continua. Con **replicación síncrona**, un commit espera a que al menos una réplica confirme que recibió el registro, de modo que la caída total de un servidor no pierde nada confirmado; con **asíncrona**, el commit es más rápido pero las últimas transacciones pueden perderse.
Dos métricas guían el diseño: el **RPO** (cuántos datos se acepta perder, medido en tiempo) y el **RTO** (cuánto se tarda en volver a funcionar). Y una regla que se aprende por las malas: un respaldo que nunca se probó restaurar no es un respaldo.

## Ejemplo resuelto: el DELETE accidental en PatioApp
Un martes a las 15:42 un administrador ejecuta por error un DELETE que borra todas las estadías del patio 5. La base de PatioApp tiene un respaldo completo cada noche a las 02:00 y archivo continuo del WAL en un almacenamiento externo. Procedimiento:
1. Restaurar el respaldo de las 02:00 en un servidor aparte.
2. Reaplicar el WAL archivado hasta las 15:41:59, justo antes del error (recuperación a un instante).
3. Exportar las estadías del patio 5 de ese servidor e insertarlas de nuevo en producción, que siguió funcionando.
RPO logrado: cero datos perdidos de otras operaciones; RTO de este incidente: unos 40 minutos. Tras el incidente se agregó una política: los DELETE masivos se ejecutan dentro de una transacción que primero muestra cuántas filas afectará, y el procedimiento de restauración se ensaya cada trimestre.`,
  links: [['bd2.tx', 'la recuperación garantiza la atomicidad y la durabilidad de las transacciones'], ['so.fs', 'el registro por adelantado aplica la misma idea que el journaling de los sistemas de archivos'], ['m15.obs', 'el RPO y el RTO son objetivos de la operación de sistemas']],
  read: 'Silberschatz, Korth y Sudarshan, capítulo 19; Ramakrishnan y Gehrke, capítulo 18; Mohan y otros (1992); documentación de PostgreSQL sobre WAL y recuperación a un instante.',
  terms: [
    ['Registro por adelantado', 'regla de escribir en disco la descripción de un cambio antes que la página modificada', ['El WAL de PostgreSQL.', 'Permite rehacer y deshacer tras una caída.', 'Convierte escrituras dispersas en secuenciales.']],
    ['Robar y no forzar', 'políticas de buffer que permiten escribir páginas no confirmadas y no obligan a escribir las confirmadas en el commit', ['Dan libertad al buffer pool y commits rápidos.', 'Exigen deshacer y rehacer.', 'Las usan los motores reales.']],
    ['LSN', 'número de secuencia creciente que identifica cada registro del log', ['Cada página guarda el LSN de su último cambio.', 'Permite saber si un cambio ya está en la página.', 'Ordena la historia de la base.']],
    ['ARIES', 'algoritmo de recuperación con fases de análisis, rehacer y deshacer que repite la historia antes de revertir a las perdedoras', ['Mohan y otros lo publicaron en 1992.', 'Usa registros de compensación.', 'Admite bloqueos a nivel de fila.']],
    ['Registro de compensación', 'registro que describe la reversión de un cambio durante el deshacer', ['Evita deshacer dos veces si hay otra caída.', 'Nunca se deshace a su vez.', 'Es parte de ARIES.']],
    ['Punto de control', 'registro que resume el estado de transacciones y páginas sucias para acotar la recuperación', ['La recuperación empieza cerca del último.', 'Los difusos no detienen la actividad.', 'Su frecuencia es un compromiso.']],
    ['Recuperación a un instante', 'restauración de un respaldo seguida de la reaplicación del registro hasta un momento elegido', ['Recuperar justo antes de un DELETE accidental.', 'Necesita archivo continuo del WAL.', 'Permite un RPO casi nulo.']],
    ['Confirmación agrupada', 'técnica de escribir juntos en disco los registros de commit de muchas transacciones', ['Un fsync sirve a cien transacciones.', 'Aumenta mucho el rendimiento.', 'Agrega una espera mínima a cada commit.']]
  ],
  q: [
    ['¿Cuándo se considera confirmada una transacción en un sistema con WAL?', 'Cuando su registro de COMMIT llega al disco', ['Cuando todas sus páginas se escriben', 'Cuando el usuario cierra la sesión', 'Cuando se toma un punto de control'], 'Las páginas pueden escribirse después.', 2],
    ['Con la política de robar, ¿qué debe saber hacer la recuperación?', 'Deshacer cambios de transacciones no confirmadas que llegaron al disco', ['Solo rehacer', 'Nada', 'Borrar el registro'], 'Las páginas sucias pudieron escribirse antes del commit.', 3],
    ['Con la política de no forzar, ¿qué debe saber hacer la recuperación?', 'Rehacer cambios confirmados que no llegaron al disco', ['Solo deshacer', 'Reiniciar la base', 'Nada'], 'El commit no esperó a escribir las páginas.', 3],
    ['¿Cuáles son las tres fases de ARIES, en orden?', 'Análisis, rehacer y deshacer', ['Deshacer, rehacer y análisis', 'Rehacer, análisis y deshacer', 'Análisis, deshacer y rehacer'], 'Repetir la historia y luego revertir a las perdedoras.', 3],
    ['¿Para qué sirve un registro de compensación?', 'Para no deshacer dos veces lo mismo si el sistema cae durante la recuperación', ['Para comprimir el registro', 'Para cifrar los datos', 'Para crear índices'], 'Documenta cada reversión.', 4],
    ['¿Qué permite recuperar la base al minuto anterior a un DELETE accidental?', 'Un respaldo más el archivo continuo del WAL', ['Solo un respaldo semanal', 'Un índice único', 'El buffer pool'], 'Recuperación a un instante.', 3],
    ['¿Qué diferencia hay entre RPO y RTO?', 'El RPO es cuántos datos se acepta perder y el RTO cuánto se tarda en volver a funcionar', ['Son sinónimos', 'El RPO mide velocidad de consultas', 'El RTO mide el tamaño del respaldo'], 'Ambos guían el diseño de la continuidad.', 2],
    { tf: 'Con replicación asíncrona, una caída del servidor principal puede perder las últimas transacciones confirmadas.', v: true, e: 'El commit no esperó a la réplica.', l: 3 },
    { tf: 'Un respaldo que nunca se ha restaurado como prueba garantiza que se podrá recuperar la base.', v: false, e: 'Solo una restauración ensayada lo demuestra.', l: 1 },
    { o: 'Ordena lo que ocurre al confirmar una transacción con WAL y confirmación agrupada.', s: ['La transacción escribe sus cambios en páginas del buffer y registros en memoria', 'Pide COMMIT', 'El motor escribe en disco, junto con otros, los registros hasta su COMMIT', 'Se informa a la aplicación que la transacción está confirmada', 'Más tarde se escriben las páginas modificadas'], e: 'El registro va siempre antes que las páginas.', l: 3 },
    { c: 'Escribe «perdedoras(log)»: log es una lista de {tx, tipo} con tipos "BEGIN", "UPDATE", "COMMIT" y "ABORT"; devuelve, ordenadas, las transacciones que empezaron y no terminaron con COMMIT ni ABORT.', f: 'perdedoras', p: ['log'], t: [[[[{ tx: 'T1', tipo: 'BEGIN' }, { tx: 'T2', tipo: 'BEGIN' }, { tx: 'T1', tipo: 'COMMIT' }]], ['T2']], [[[{ tx: 'T3', tipo: 'BEGIN' }, { tx: 'T3', tipo: 'ABORT' }]], []], [[[{ tx: 'B', tipo: 'BEGIN' }, { tx: 'A', tipo: 'BEGIN' }]], ['A', 'B']]], sol: '  const ini = new Set(), fin = new Set();\n  for (const r of log) { if (r.tipo === "BEGIN") ini.add(r.tx); if (r.tipo === "COMMIT" || r.tipo === "ABORT") fin.add(r.tx); }\n  return [...ini].filter(t => !fin.has(t)).sort();', l: 2 },
    { c: 'Escribe «recuperar(inicial, log)»: copia el estado inicial, rehace todos los UPDATE {tx, tipo: "UPDATE", item, viejo, nuevo} en orden y luego deshace en orden inverso los de transacciones sin COMMIT; devuelve el estado.', f: 'recuperar', p: ['inicial', 'log'], t: [[[{ A: 10, B: 20 }, [{ tx: 'T1', tipo: 'BEGIN' }, { tx: 'T1', tipo: 'UPDATE', item: 'A', viejo: 10, nuevo: 15 }, { tx: 'T2', tipo: 'BEGIN' }, { tx: 'T2', tipo: 'UPDATE', item: 'B', viejo: 20, nuevo: 25 }, { tx: 'T1', tipo: 'COMMIT' }]], { A: 15, B: 20 }], [[{ A: 1 }, [{ tx: 'T', tipo: 'UPDATE', item: 'A', viejo: 1, nuevo: 2 }, { tx: 'T', tipo: 'UPDATE', item: 'A', viejo: 2, nuevo: 3 }]], { A: 1 }], [[{ A: 1 }, [{ tx: 'T', tipo: 'UPDATE', item: 'A', viejo: 1, nuevo: 9 }, { tx: 'T', tipo: 'COMMIT' }]], { A: 9 }]], sol: '  const db = { ...inicial }, ok = new Set(log.filter(r => r.tipo === "COMMIT").map(r => r.tx));\n  for (const r of log) if (r.tipo === "UPDATE") db[r.item] = r.nuevo;\n  for (let i = log.length - 1; i >= 0; i--) { const r = log[i]; if (r.tipo === "UPDATE" && !ok.has(r.tx)) db[r.item] = r.viejo; }\n  return db;', h: 'Primero repite toda la historia; después recorre el registro hacia atrás deshaciendo solo a las perdedoras.', l: 4 }
  ],
  gen: function (g) {
    var pol = [['Robar y no forzar', 'Deshacer y rehacer'], ['No robar y forzar', 'Ni deshacer ni rehacer'], ['Robar y forzar', 'Solo deshacer'], ['No robar y no forzar', 'Solo rehacer']];
    pol.forEach(function (p) { g.mcq(4, 'Con la combinación de políticas «' + p[0] + '», ¿qué debe hacer la recuperación tras una caída?', p[1], ['Deshacer y rehacer', 'Ni deshacer ni rehacer', 'Solo deshacer', 'Solo rehacer'].filter(function (x) { return x !== p[1]; }), 'Robar exige deshacer; no forzar exige rehacer.'); });
    var fal = [['Un INSERT viola una restricción UNIQUE', 'Falla de transacción'], ['Se corta la energía del servidor', 'Caída del sistema'], ['El disco del servidor se daña', 'Falla del medio'], ['El motor aborta una transacción por interbloqueo', 'Falla de transacción'], ['El proceso de la base se cae por falta de memoria', 'Caída del sistema']];
    fal.forEach(function (f) { g.mcq(2, '¿Qué tipo de falla es? ' + f[0], f[1], ['Falla de transacción', 'Caída del sistema', 'Falla del medio', 'No es una falla'].filter(function (x) { return x !== f[1]; }), 'Cada tipo exige mecanismos distintos.'); });
    g.times(6, function (R) { var n = R.int(3, 6), com = []; var txt = []; for (var i = 1; i <= n; i++) { var c = R.pick([true, false]); if (c) com.push('T' + i); } var perd = n - com.length; g.input(2, 'Al caer el sistema había ' + n + ' transacciones iniciadas (T1 a T' + n + ') y en el registro aparecen COMMIT de ' + (com.length ? com.join(', ') : 'ninguna') + '. ¿Cuántas transacciones perdedoras deshace la recuperación?', perd, 'Las que no tienen COMMIT.'); });
  },
  checks: [
    ['Explica las políticas de robar y forzar y por qué los motores eligen robar y no forzar.', 'Robar permite escribir páginas no confirmadas y no forzar permite confirmar sin escribir las páginas; juntas dan libertad al buffer y commits rápidos, a cambio de saber deshacer y rehacer.'],
    ['Enuncia las dos reglas del registro por adelantado.', 'Escribir en disco los registros de un cambio antes que la página, y escribir todos los registros de una transacción, incluido el COMMIT, antes de confirmarla.'],
    ['Describe las tres fases de ARIES.', 'Análisis (qué transacciones y páginas estaban activas), rehacer (repetir toda la historia) y deshacer (revertir a las perdedoras escribiendo registros de compensación).'],
    ['¿Para qué sirven los puntos de control?', 'Para que la recuperación empiece cerca del último punto en lugar de leer todo el registro.'],
    ['Diseña la estrategia de respaldo de una base con RPO de minutos.', 'Respaldo completo periódico, archivo continuo del WAL fuera del servidor para recuperar a un instante, réplica síncrona o asíncrona según el RPO, y ensayos de restauración.']
  ],
  cites: ['Mohan, C. et al. (1992). ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging. *ACM Transactions on Database Systems*, 17(1).', 'Härder, T. y Reuter, A. (1983). Principles of Transaction-Oriented Database Recovery. *ACM Computing Surveys*, 15(4).', 'Gray, J. y Reuter, A. (1992). *Transaction Processing: Concepts and Techniques*. Morgan Kaufmann.', 'Silberschatz, A., Korth, H. y Sudarshan, S. (2019). *Database System Concepts* (7.ª ed.), capítulo 19.', 'PostgreSQL Global Development Group. *PostgreSQL Documentation: Write-Ahead Logging and Continuous Archiving*.'],
  project: { t: 'Recuperación con registro por adelantado',
    goal: 'Implementar y probar un mecanismo de recuperación con WAL.',
    steps: ['Implementa un almacén clave-valor con un buffer en memoria y un registro por adelantado en archivo, con robar y no forzar.', 'Implementa la recuperación con análisis, rehacer y deshacer, y registros de compensación.', 'Prueba con caídas simuladas en cientos de puntos al azar que nunca se pierde nada confirmado ni sobrevive nada no confirmado.', 'Agrega puntos de control y mide cuánto se acorta la recuperación.', 'En PostgreSQL, configura el archivo del WAL y practica una recuperación a un instante.'],
    deliver: 'El código, las pruebas de falla, las mediciones y el procedimiento documentado de PostgreSQL.' },
  hito: ['Configura en PatioApp respaldos completos diarios y archivo continuo del WAL, y ensaya una recuperación a un instante documentando el RPO y el RTO logrados.', 'Escribe el procedimiento de restauración de PatioApp como guía práctica y prográmale un ensayo trimestral.']
});

S('bd2', 'bd2.dist', { title: 'Bases de datos distribuidas, NoSQL y NewSQL',
  ask: '¿Qué concepto de bases de datos distribuidas se aplica?',
  lesson: `
> **La idea en simple.** Cuando una biblioteca crece demasiado, se abre una sucursal en cada distrito: cada una guarda parte de los libros (**particionado**) y algunos libros muy pedidos tienen copias en varias (**replicación**). Ahora un préstamo que involucra dos sucursales necesita coordinarse, y si se corta el teléfono entre ellas hay que decidir si seguir atendiendo o esperar. Eso es una base de datos distribuida.

## Por qué distribuir
- **Escala:** los datos o la carga ya no caben en un servidor.
- **Disponibilidad:** si un servidor cae, otros siguen atendiendo.
- **Latencia:** tener los datos cerca de los usuarios de cada región.
El precio es la complejidad: la red falla, los relojes no coinciden y coordinar cuesta viajes de ida y vuelta. Antes de distribuir conviene agotar lo simple: un servidor bien dimensionado con índices correctos y réplicas de lectura atiende a muchísimas aplicaciones.

## Particionado
El **particionado** (*sharding*) reparte las filas de una tabla entre nodos:
- **Por rango:** cada nodo tiene un rango de la clave (placas de la A a la M, de la N a la Z; o fechas por mes). Facilita las consultas por rango, pero puede concentrar la carga (todas las inserciones de hoy van al mismo nodo).
- **Por hash:** el nodo se elige con hash(clave) mod n. Reparte parejo, pero una consulta por rango debe preguntar a todos. Cambiar n obliga a mover casi todo; el **hash consistente** (que verás en Sistemas Distribuidos) lo evita.
- **Por lista o por inquilino:** por ejemplo, todos los datos de cada patio en el nodo de su región.
La clave de particionado es la decisión más importante: las consultas que incluyen la clave van a un solo nodo; las que no, deben **difundirse** a todos y combinar los resultados. Una clave mal elegida produce **particiones calientes**.

## Replicación
- **Líder y seguidores:** las escrituras van al líder y se propagan a los seguidores, que atienden lecturas. Es lo que hacen PostgreSQL y MySQL con sus réplicas. Con replicación asíncrona, una lectura en un seguidor puede ver datos atrasados (**retraso de réplica**): un usuario actualiza su perfil y, al recargar, ve el dato viejo. Soluciones: leer del líder lo que el propio usuario acaba de escribir (**leer tus propias escrituras**).
- **Multilíder** y **sin líder**: varios nodos aceptan escrituras; hay que resolver conflictos. Lo profundizarás en Sistemas Distribuidos.

## Transacciones distribuidas y confirmación en dos fases
Si una transacción modifica datos en dos nodos, ambos deben confirmar o ambos abortar. El protocolo clásico es la **confirmación en dos fases** (2PC), descrito por Jim Gray en 1978:
1. **Preparación:** el coordinador pregunta a cada participante si puede confirmar. Cada uno escribe en su registro todo lo necesario para confirmar (queda **preparado**) y vota sí, o vota no.
2. **Decisión:** si todos votaron sí, el coordinador registra COMMIT y lo comunica; si alguno votó no o no respondió, registra ABORT.
El punto débil: un participante preparado **no puede decidir solo**. Si el coordinador cae después de recibir los votos, los participantes quedan bloqueados, con sus bloqueos tomados, hasta que vuelva. Por eso 2PC se usa con cuidado y los sistemas modernos replican al coordinador con consenso (como hacen Spanner y CockroachDB), o evitan las transacciones distribuidas con **sagas** y eventos.
~~~js
// Confirmación en dos fases: el coordinador decide según los votos
function dosFases(participantes) {
  const votos = participantes.map(p => (p.puede ? 'sí' : 'no'));
  const decision = votos.every(v => v === 'sí') ? 'COMMIT' : 'ABORT';
  return participantes.map((p, i) => p.nombre + ' votó ' + votos[i]).join(', ') + ' → ' + decision;
}
console.log(dosFases([{ nombre: 'nodo Lima', puede: true }, { nombre: 'nodo Arequipa', puede: true }]));
console.log(dosFases([{ nombre: 'nodo Lima', puede: true }, { nombre: 'nodo Arequipa', puede: false }]));
~~~

## Identificadores en un sistema distribuido
Un contador autoincremental exige un único lugar que reparta los números, lo que no escala entre nodos. Alternativas: **UUID** aleatorios (únicos sin coordinación, pero dispersos en el índice, lo que encarece las inserciones en árboles B+), **UUID v7** u otros identificadores ordenados por tiempo (como los Snowflake de Twitter), que combinan marca de tiempo, nodo y secuencia y se insertan al final del índice.

## Consultas distribuidas
Reunir tablas que están en nodos distintos obliga a mover datos por la red, que pasa a ser el costo dominante. Técnicas:
- **Empujar** los filtros y las agregaciones a cada nodo, y mover solo resultados parciales.
- **Semirreunión:** enviar al otro nodo solo las claves que interesan, recibir solo las filas que coinciden y reunir localmente.
- **Coubicar** las tablas que se reúnen a menudo particionándolas por la misma clave (por ejemplo, estadías y cobros por patio).

## Teorema CAP en una frase
Eric Brewer planteó en el año 2000, y Seth Gilbert y Nancy Lynch demostraron en 2002, que un sistema replicado no puede garantizar a la vez **consistencia** (todas las lecturas ven la última escritura), **disponibilidad** (toda petición recibe respuesta) y **tolerancia a particiones de red**. Como las particiones de red ocurren, cuando suceden hay que elegir entre responder con datos posiblemente viejos o dejar de responder. Lo estudiarás a fondo en Sistemas Distribuidos; aquí importa que cada base distribuida toma esa decisión de forma distinta, y que conviene saber cuál toma la que eliges.

## Operar una base distribuida
Distribuir multiplica las tareas operativas: **rebalancear** particiones al agregar nodos sin detener el servicio, vigilar el **retraso de réplica** y las particiones calientes, cambiar esquemas en muchos nodos, hacer respaldos consistentes de todo el conjunto y probar la conmutación por error. Muchas organizaciones prefieren servicios administrados en la nube (como Amazon Aurora, Google Cloud Spanner o Azure Cosmos DB) justamente para delegar ese trabajo.

## NoSQL
A mediados de los 2000, las grandes empresas de Internet necesitaron escalar más allá de lo que daban las bases relacionales de entonces:
- **Bigtable** (Google, 2006): tabla dispersa enorme ordenada por clave, base de HBase.
- **Dynamo** (Amazon, Giuseppe DeCandia y otros, 2007): almacén clave-valor sin líder, siempre disponible para escribir (el carrito de compras nunca debía rechazar un artículo), con consistencia eventual. Inspiró a Cassandra y Riak.
- **Bases de documentos** como MongoDB (2009): objetos JSON flexibles.
Sacrificaban reuniones, esquemas y transacciones a cambio de escala y disponibilidad. El nombre "NoSQL" fue más un movimiento que una tecnología, y con los años muchas agregaron transacciones y lenguajes de consulta.

## NewSQL
**Spanner** (James Corbett y otros, Google, 2012) mostró que se podía tener SQL, transacciones serializables y escala global: replica cada partición con el algoritmo de consenso Paxos y usa **TrueTime**, una API de reloj con relojes atómicos y GPS que acota la incertidumbre del tiempo, para ordenar transacciones en todo el planeta. Siguieron CockroachDB, YugabyteDB y TiDB, que reproducen ideas parecidas sin hardware especial. Michael Stonebraker y Uğur Çetintemel habían anticipado en 2005 que "una talla única para todo" había terminado: hoy conviven bases transaccionales, analíticas por columnas, de documentos, de series de tiempo y de grafos, y la elección depende de la carga.

## Ejemplo resuelto: PatioApp crece a 40 patios en tres países
- **Primer paso, sin distribuir:** un servidor PostgreSQL más grande con dos **réplicas de lectura** para los reportes, y lectura desde el líder de lo que el propio usuario acaba de escribir. Atiende a los 40 patios con holgura.
- **Si algún día no alcanza:** particionar por **patio** (todas sus estadías, cobros e inspecciones juntas), de modo que casi todas las operaciones toquen un solo nodo, y elegir una base distribuida (por ejemplo, CockroachDB o Citus) que lo haga transparente.
- **Lo que se evita:** transacciones que crucen patios. Los reportes consolidados se calculan en el almacén analítico, no con reuniones distribuidas en la base operativa.
La decisión queda en un ADR con la condición medible para dar el siguiente paso (por ejemplo, el procesador del líder sobre 70% en horas punta durante un mes).`,
  links: [['m10.nosql', 'esta unidad profundiza las bases NoSQL presentadas en Bases de Datos I'], ['m13.dist', 'las bases distribuidas enfrentan los retos de todo sistema distribuido'], ['bd2.recovery', 'la replicación se basa en enviar el registro a otros nodos']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulos 5, 6 y 9; Özsu y Valduriez, *Principles of Distributed Database Systems*; Corbett y otros (2012); DeCandia y otros (2007).',
  terms: [
    ['Particionado', 'reparto de las filas de una tabla entre varios nodos según una clave', ['Las estadías de cada patio en su nodo.', 'Puede ser por rango, por hash o por lista.', 'La clave decide qué consultas tocan un solo nodo.']],
    ['Partición caliente', 'partición que recibe una parte desproporcionada de la carga', ['Todas las inserciones de hoy van al nodo de la fecha actual.', 'Un cliente enorme en un solo nodo.', 'Se evita eligiendo bien la clave.']],
    ['Retraso de réplica', 'demora con que un seguidor refleja las escrituras del líder en la replicación asíncrona', ['Un usuario ve su dato viejo tras actualizarlo.', 'Se mitiga leyendo del líder lo propio.', 'Puede durar milisegundos o minutos.']],
    ['Confirmación en dos fases', 'protocolo en que un coordinador pide a los participantes que se preparen y luego decide confirmar o abortar', ['Todos votan sí o se aborta.', 'Gray lo describió en 1978.', 'Bloquea si el coordinador cae tras los votos.']],
    ['Semirreunión', 'técnica de reunión distribuida que envía solo las claves necesarias al otro nodo para recibir solo las filas que coinciden', ['Reduce el tráfico de red.', 'Es útil cuando una tabla filtra mucho a la otra.', 'Se corresponde con el operador ⋉.']],
    ['NoSQL', 'familia de bases no relacionales que priorizan escala y flexibilidad, a menudo con consistencia más débil', ['Dynamo, Cassandra y MongoDB.', 'Surgió a mediados de los 2000.', 'Muchas agregaron después transacciones.']],
    ['NewSQL', 'bases distribuidas que ofrecen SQL y transacciones fuertes con escala horizontal', ['Spanner, CockroachDB y TiDB.', 'Replican con consenso.', 'Combinan lo mejor de ambos mundos a cierto costo de latencia.']],
    ['TrueTime', 'API de reloj de Spanner que expresa la hora como un intervalo con incertidumbre acotada', ['Usa relojes atómicos y GPS.', 'Permite ordenar transacciones globalmente.', 'Corbett y otros la describieron en 2012.']]
  ],
  q: [
    ['¿Qué ventaja tiene el particionado por rango frente al de hash?', 'Las consultas por rango tocan pocos nodos', ['Reparte siempre la carga mejor', 'No necesita clave', 'Elimina la replicación'], 'Pero puede crear particiones calientes.', 3],
    ['Un usuario actualiza su dirección y al recargar ve la anterior. ¿Qué ocurre probablemente?', 'Leyó de una réplica con retraso', ['Hubo un interbloqueo', 'Falló el índice', 'Se perdió la transacción'], 'Se soluciona leyendo del líder lo propio.', 3],
    ['En 2PC, ¿qué hace el coordinador si un participante vota no?', 'Decide abortar y lo comunica a todos', ['Confirma igual', 'Espera indefinidamente', 'Reintenta solo con ese participante'], 'Todos o ninguno.', 2],
    ['¿Cuál es el punto débil de 2PC?', 'Si el coordinador cae tras los votos, los participantes preparados quedan bloqueados', ['Que no garantiza atomicidad', 'Que no usa registro', 'Que solo funciona con dos nodos'], 'No pueden decidir solos.', 4],
    ['¿Qué buscaba Dynamo al priorizar la disponibilidad?', 'Que el sistema siempre aceptara escrituras, como agregar al carrito', ['Transacciones serializables globales', 'Consultas SQL complejas', 'Menos replicación'], 'Aceptaba consistencia eventual.', 3],
    ['¿Qué permitió a Spanner ofrecer transacciones globales serializables?', 'Consenso por partición y relojes con incertidumbre acotada (TrueTime)', ['Un único servidor gigante', 'Eliminar la replicación', 'Usar solo NoSQL'], 'Corbett y otros, 2012.', 4],
    ['¿Qué conviene antes de distribuir una base de datos?', 'Agotar lo simple: un buen servidor, índices correctos y réplicas de lectura', ['Particionar desde el primer día', 'Pasar a NoSQL siempre', 'Eliminar las transacciones'], 'La distribución trae mucha complejidad.', 2],
    { tf: 'Las consultas que no incluyen la clave de particionado deben preguntar a todos los nodos.', v: true, e: 'Se difunden y se combinan los resultados.', l: 2 },
    { tf: 'En la replicación asíncrona, una lectura en un seguidor siempre ve la última escritura del líder.', v: false, e: 'Puede haber retraso de réplica.', l: 2 },
    { c: 'Escribe «dosFases(votos)»: votos es una lista de "si" y "no" (o null si un participante no respondió); devuelve "COMMIT" solo si todos votaron "si", y "ABORT" en otro caso.', f: 'dosFases', p: ['votos'], t: [[[['si', 'si']], 'COMMIT'], [[['si', 'no']], 'ABORT'], [[['si', null]], 'ABORT'], [[[]], 'COMMIT']], sol: '  return votos.every(v => v === "si") ? "COMMIT" : "ABORT";', l: 1 },
    { c: 'Escribe «particionHash(clave, n)»: suma los códigos de carácter de la clave y devuelve el resto de dividir entre n.', f: 'particionHash', p: ['clave', 'n'], t: [[['ABC-123', 4], 1], [['XYZ-987', 4], 0], [['A', 3], 2], [['', 5], 0]], sol: '  let s = 0;\n  for (const c of clave) s += c.charCodeAt(0);\n  return s % n;', l: 1 },
    { c: 'Escribe «particionRango(valor, limites)»: limites está ordenado; devuelve el índice de la primera partición cuyo límite es mayor que el valor, o limites.length si ninguno lo es.', f: 'particionRango', p: ['valor', 'limites'], t: [[[50, [100, 200]], 0], [[150, [100, 200]], 1], [[250, [100, 200]], 2], [[100, [100, 200]], 1]], sol: '  for (let i = 0; i < limites.length; i++) if (valor < limites[i]) return i;\n  return limites.length;', l: 2 }
  ],
  gen: function (g) {
    var cl = [['Consultas casi siempre por patio y nunca entre patios', 'Particionar por patio'], ['Inserciones masivas con clave de fecha creciente y consultas puntuales por identificador', 'Particionar por hash del identificador'], ['Reportes por rangos de fecha sobre datos históricos', 'Particionar por rango de fecha'], ['Muchos clientes pequeños y algunos enormes, con aislamiento por cliente', 'Particionar por inquilino']];
    cl.forEach(function (c) { g.mcq(3, '¿Qué estrategia de particionado conviene? ' + c[0], c[1], ['Particionar por patio', 'Particionar por hash del identificador', 'Particionar por rango de fecha', 'Particionar por inquilino'].filter(function (x) { return x !== c[1]; }), 'La clave debe coincidir con los patrones de acceso.'); });
    g.times(6, function (R) { var n = R.int(2, 6), v = []; for (var i = 0; i < n; i++) v.push(R.pick(['sí', 'sí', 'sí', 'no'])); var d = v.every(function (x) { return x === 'sí'; }) ? 'COMMIT' : 'ABORT'; g.mcq(2, 'En 2PC, los participantes votan: ' + v.join(', ') + '. ¿Qué decide el coordinador?', d, [d === 'COMMIT' ? 'ABORT' : 'COMMIT', 'Esperar más votos indefinidamente', 'Confirmar solo en los que votaron sí'], 'Un solo no basta para abortar.'); });
    var sis = [['Bigtable', 'Tabla dispersa ordenada por clave (Google, 2006)'], ['Dynamo', 'Clave-valor sin líder con consistencia eventual (Amazon, 2007)'], ['Spanner', 'SQL distribuido con transacciones globales y TrueTime (Google, 2012)'], ['MongoDB', 'Base de documentos JSON']];
    sis.forEach(function (x) { g.mcq(2, '¿Qué describe mejor a ' + x[0] + '?', x[1], sis.filter(function (y) { return y !== x; }).map(function (y) { return y[1]; }), 'Sistemas que marcaron la evolución de las bases distribuidas.'); });
  },
  checks: [
    ['Compara el particionado por rango y por hash.', 'Por rango facilita consultas por rango pero puede crear particiones calientes; por hash reparte parejo pero obliga a difundir las consultas por rango.'],
    ['Explica las dos fases de 2PC y su problema de bloqueo.', 'Preparación (votos) y decisión (commit o abort); si el coordinador cae tras los votos, los participantes preparados no pueden decidir solos y quedan bloqueados.'],
    ['¿Qué es el retraso de réplica y cómo se mitiga para el usuario?', 'La demora con que un seguidor refleja las escrituras; se mitiga leyendo del líder lo que el propio usuario acaba de escribir.'],
    ['¿Qué sacrificaron las primeras bases NoSQL y qué ganaron?', 'Sacrificaron reuniones, esquemas y transacciones fuertes; ganaron escala horizontal, flexibilidad y disponibilidad.'],
    ['¿Qué pasos seguirías antes de particionar la base de PatioApp?', 'Optimizar consultas e índices, crecer el servidor, agregar réplicas de lectura, y particionar por patio solo si una métrica acordada lo justifica.']
  ],
  cites: ['Gray, J. (1978). Notes on Data Base Operating Systems. *Operating Systems: An Advanced Course*, LNCS 60. Springer.', 'Chang, F. et al. (2006). Bigtable: A Distributed Storage System for Structured Data. *OSDI 2006*.', 'DeCandia, G. et al. (2007). Dynamo: Amazon’s Highly Available Key-value Store. *SOSP 2007*.', 'Corbett, J. et al. (2012). Spanner: Google’s Globally-Distributed Database. *OSDI 2012*.', 'Stonebraker, M. y Çetintemel, U. (2005). "One Size Fits All": An Idea Whose Time Has Come and Gone. *ICDE 2005*.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O’Reilly.', 'Gilbert, S. y Lynch, N. (2002). Brewer\u2019s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services. *ACM SIGACT News*, 33(2).'],
  project: { t: 'Particionado y replicación en práctica',
    goal: 'Experimentar con réplicas y particiones en bases reales.',
    steps: ['Configura en contenedores un PostgreSQL líder con una réplica asíncrona y mide el retraso de réplica bajo carga de escrituras.', 'Implementa en una aplicación la lectura de las propias escrituras desde el líder y el resto desde la réplica.', 'Simula el particionado por hash de una tabla en tres bases y escribe un enrutador de consultas que difunda las que no incluyen la clave.', 'Implementa 2PC entre dos bases con PREPARE TRANSACTION y provoca la caída del coordinador para observar el bloqueo.', 'Escribe un informe con las mediciones y los riesgos observados.'],
    deliver: 'Los archivos de configuración, el código y el informe.' },
  hito: ['Agrega a PatioApp una réplica de lectura para los reportes y haz que las lecturas posteriores a una escritura del mismo usuario vayan al líder.', 'Escribe el ADR de escalamiento de la base de PatioApp con la clave de particionado elegida (patio) y la métrica que dispararía el particionado.']
});
})();
