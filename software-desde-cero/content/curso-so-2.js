(function () {
var S = SDC.S;

S('so', 'so.sched', { title: 'Planificación del procesador',
  ask: '¿Qué concepto de planificación se aplica?',
  lesson: `
> **La idea en simple.** En una ventanilla de banco con una sola cajera, ¿a quién se atiende primero? ¿Al que llegó antes, al que tiene un trámite cortito, o se atiende a cada uno cinco minutos por turno? Cada regla deja contentos a unos y molestos a otros. El planificador del sistema operativo decide lo mismo, miles de veces por segundo, con los procesos que esperan el procesador.

## Qué decide el planificador y cómo se mide
El **planificador de corto plazo** elige cuál de los procesos (o hilos) listos usará el procesador. Actúa cuando un proceso se bloquea, termina, cuando llega uno nuevo o cuando el temporizador marca el fin de un turno. Si puede quitarle el procesador a un proceso que no lo soltó voluntariamente, es **expropiativo** (*preemptive*); si no, es **no expropiativo** y espera a que el proceso se bloquee o termine.

Para comparar algoritmos se usan métricas por proceso:
| Métrica | Fórmula | Qué representa |
| Tiempo de retorno | fin − llegada | cuánto tardó el trabajo completo |
| Tiempo de espera | retorno − ráfaga de CPU | cuánto estuvo en la cola sin ejecutarse |
| Tiempo de respuesta | primera ejecución − llegada | cuánto tardó en "empezar a responder" |
| Rendimiento | trabajos terminados por unidad de tiempo | productividad del sistema |
Los sistemas por lotes cuidan el retorno y el rendimiento; los interactivos, la respuesta. No hay un algoritmo que optimice todo.

## FCFS: el primero que llega
**First-Come, First-Served** atiende en orden de llegada, sin expropiar. Es justo en un sentido simple, pero sufre el **efecto convoy**: si llega primero un trabajo de 24 unidades y luego dos de 3, los cortos esperan detrás del largo. Esperas: 0, 24 y 27, promedio 17. Si los cortos hubieran ido primero: 0, 3 y 6, promedio 3.

## SJF y SRTF: el más corto primero
**Shortest Job First** ejecuta primero la ráfaga más corta. Si todos llegan a la vez, minimiza el tiempo de espera promedio (se demuestra con un argumento de intercambio: mover un trabajo corto delante de uno largo reduce la espera total). Su versión expropiativa, **Shortest Remaining Time First** (también llamada STCF), compara al llegar cada proceso su ráfaga con lo que le falta al que se ejecuta y expropia si es menor. El problema: el sistema no conoce el futuro. Se **estima** la próxima ráfaga con un promedio exponencial de las anteriores: τ₍ₙ₊₁₎ = α·tₙ + (1 − α)·τₙ. Y existe riesgo de **inanición**: un trabajo largo puede esperar indefinidamente si siguen llegando cortos.

## Round Robin: turnos para todos
**Round Robin** (RR) da a cada proceso un **cuanto** de tiempo (por ejemplo, 10 ms); si no termina, vuelve al final de la cola. Ofrece buena respuesta y nadie sufre inanición. La clave es el tamaño del cuanto:
- Muy grande: RR se parece a FCFS.
- Muy pequeño: el procesador pierde mucho tiempo en cambios de contexto. Si cada cambio cuesta 0.1 ms y el cuanto es 1 ms, un 9% del tiempo se va en cambios.
- Regla práctica: que la mayoría de las ráfagas interactivas quepan en un cuanto.
RR suele tener peor tiempo de retorno que SJF, porque alarga todos los trabajos, pero mucho mejor tiempo de respuesta.
~~~js
// Round Robin con todos los procesos llegando en t = 0
function roundRobin(rafagas, q) {
  const resto = [...rafagas], fin = new Array(rafagas.length), cola = rafagas.map((_, i) => i);
  let t = 0;
  while (cola.length) {
    const i = cola.shift(), usa = Math.min(q, resto[i]);
    t += usa; resto[i] -= usa;
    if (resto[i] > 0) cola.push(i); else fin[i] = t;
  }
  return fin;
}
const r = [24, 3, 3];
for (const q of [1, 4, 30]) {
  const fin = roundRobin(r, q), espera = fin.map((f, i) => f - r[i]);
  console.log('cuanto', q, '→ fines', fin.join(','), '· espera promedio', (espera.reduce((a, b) => a + b) / r.length).toFixed(2));
}
~~~

## Prioridades
Cada proceso tiene una prioridad y se ejecuta el de prioridad más alta. Las prioridades pueden ser **estáticas** o **dinámicas**. El riesgo es la inanición de los de baja prioridad; la solución clásica es el **envejecimiento** (*aging*): aumentar poco a poco la prioridad de quien lleva mucho tiempo esperando. En Unix, el valor **nice** (de −20 a 19) permite a un usuario bajar la prioridad de sus propios procesos ("ser amable" con los demás).

## MLFQ: aprender del comportamiento
La **cola multinivel con retroalimentación** (MLFQ) fue descrita por Fernando Corbató y sus colegas en el sistema CTSS (1962). Su idea: no conocemos las ráfagas, pero podemos **observar** a cada proceso y ajustar su prioridad. OSTEP la resume en reglas:
1. Si la prioridad de A es mayor que la de B, se ejecuta A.
2. Si son iguales, se reparten en Round Robin.
3. Un trabajo nuevo entra en la cola de máxima prioridad.
4. Cuando un trabajo agota su asignación de tiempo en un nivel (aunque la use en partes), baja de nivel.
5. Cada cierto período S, todos los trabajos vuelven a la cola más alta (**impulso de prioridad**), para evitar la inanición y adaptarse a trabajos que cambian de comportamiento.
Así, los procesos interactivos (que usan poco procesador y se bloquean pronto) quedan arriba y responden rápido, y los de cálculo largo bajan a colas con cuantos más largos. La regla 4 contabiliza el tiempo total para que un programa no "haga trampa" soltando el procesador justo antes de agotar su cuanto. Variantes de MLFQ se usaron en BSD, Solaris y Windows.

## Repartir proporcionalmente
Otra familia busca que cada proceso reciba una **fracción** del procesador. Carl Waldspurger y William Weihl propusieron en 1994 la **planificación por lotería**: cada proceso tiene boletos y en cada turno se sortea; con 75 de 100 boletos, un proceso recibe aproximadamente el 75% del tiempo. Su versión determinista es la planificación por **zancadas** (*stride*).

Linux usó desde 2007 (versión 2.6.23) el **Completely Fair Scheduler** (CFS) de Ingo Molnár: cada tarea acumula un **tiempo virtual de ejecución** que crece más lento cuanto mayor es su peso (según su valor nice), y siempre se elige la tarea con menor tiempo virtual, guardadas en un árbol rojo-negro para encontrarla en tiempo logarítmico. En la versión 6.6 (2023), Linux lo reemplazó por **EEVDF** (*Earliest Eligible Virtual Deadline First*), basado en un algoritmo de Ion Stoica y Hussein Abdel-Wahab de 1995, que mejora la latencia de las tareas que necesitan respuestas rápidas.

## Varios procesadores
Con varios núcleos aparecen problemas nuevos:
- **Afinidad de caché:** un proceso que vuelve al mismo núcleo encuentra sus datos en la caché; moverlo a otro núcleo cuesta.
- **Una cola o varias:** una cola compartida es simple pero necesita bloqueos y pierde afinidad; una cola por núcleo escala mejor, pero exige **balancear la carga** moviendo tareas de núcleos ocupados a ociosos (*work stealing*).
- **Planificación en grupo** (*gang scheduling*): ejecutar a la vez los hilos de un mismo programa paralelo que se comunican mucho.
La planificación de tiempo real (tasa monotónica, EDF) la viste en la unidad de sistemas embebidos.

## Ejemplo resuelto: comparar algoritmos
Tres procesos llegan en t = 0 con ráfagas A = 6, B = 2 y C = 4.
- **FCFS** (A, B, C): fines 6, 8 y 12. Esperas 0, 6 y 8: promedio 4.67. Respuesta promedio: 4.67.
- **SJF** (B, C, A): fines 2, 6 y 12. Esperas 0, 2 y 6: promedio 2.67. Es el mínimo posible.
- **RR con cuanto 2**: A(0-2), B(2-4, termina), C(4-6), A(6-8), C(8-10, termina), A(10-12, termina). Fines A = 12, B = 4, C = 10. Esperas 6, 2 y 6: promedio 4.67. Pero la respuesta (primera ejecución) es 0, 2 y 4: promedio 2, la mejor de los tres.
SJF gana en espera; RR, en respuesta. Por eso los sistemas de escritorio priorizan la respuesta y los de lotes, el retorno.`,
  links: [['so.proc', 'el planificador elige entre los procesos en estado listo'], ['plat.embedded', 'la planificación de tiempo real (RMS, EDF) es un caso con plazos'], ['m4.trees', 'CFS guarda las tareas en un árbol rojo-negro']],
  read: 'OSTEP, capítulos 7 a 10 (Scheduling, MLFQ, Lottery, Multiprocessor); Silberschatz, capítulo 5; Waldspurger y Weihl (1994).',
  terms: [
    ['Planificación expropiativa', 'política en la que el sistema puede quitar el procesador a un proceso que no lo soltó voluntariamente', ['El temporizador interrumpe y RR pasa al siguiente.', 'SRTF expropia cuando llega un trabajo más corto.', 'Es necesaria para una buena respuesta interactiva.']],
    ['Tiempo de retorno', 'tiempo desde que un proceso llega hasta que termina', ['Fin 12 y llegada 0 dan 12.', 'Los sistemas por lotes buscan minimizarlo.', 'Incluye la espera y la ejecución.']],
    ['Tiempo de respuesta', 'tiempo desde que un proceso llega hasta que se ejecuta por primera vez', ['RR lo reduce porque todos empiezan pronto.', 'Es clave en sistemas interactivos.', 'Se calcula como primera ejecución menos llegada.']],
    ['Efecto convoy', 'situación en FCFS en que procesos cortos esperan detrás de uno largo', ['Tres trámites cortos esperan a uno de una hora.', 'Eleva mucho la espera promedio.', 'SJF lo evita.']],
    ['Cuanto', 'tiempo máximo que Round Robin deja ejecutar a un proceso antes de pasar al siguiente', ['Con un cuanto enorme, RR equivale a FCFS.', 'Con uno diminuto, se pierde tiempo en cambios de contexto.', 'Suele ser de unos milisegundos.']],
    ['Inanición', 'situación en que un proceso listo espera indefinidamente porque siempre se elige a otros', ['Un trabajo largo en SJF con llegada continua de cortos.', 'Un proceso de baja prioridad que nunca se ejecuta.', 'Se combate con envejecimiento.']],
    ['Cola multinivel con retroalimentación', 'planificador con varias colas de prioridad que baja o sube a los procesos según su uso observado del procesador', ['Los interactivos quedan arriba y responden rápido.', 'Corbató la usó en CTSS.', 'Un impulso periódico evita la inanición.']],
    ['Afinidad de caché', 'ventaja de volver a ejecutar un proceso en el mismo núcleo, donde sus datos siguen en caché', ['Linux prefiere no mover tareas entre núcleos sin motivo.', 'Mover una tarea enfría su caché.', 'Compite con el balanceo de carga.']]
  ],
  q: [
    ['Tres procesos llegan en t = 0 con ráfagas 24, 3 y 3, en ese orden. ¿Cuál es la espera promedio con FCFS?', '17', ['3', '10', '24'], 'Esperas 0, 24 y 27.', 2],
    ['¿Qué algoritmo minimiza la espera promedio cuando todos los procesos llegan a la vez?', 'SJF', ['FCFS', 'Round Robin', 'Lotería'], 'Ordenar de más corto a más largo minimiza la suma de esperas.', 2],
    ['¿Qué ocurre con Round Robin si el cuanto es muchísimo mayor que todas las ráfagas?', 'Se comporta como FCFS', ['Se comporta como SJF', 'Nunca termina', 'Expropia en cada instrucción'], 'Cada proceso termina dentro de su primer turno.', 3],
    ['Cada cambio de contexto cuesta 1 ms y el cuanto es 9 ms. ¿Qué fracción del tiempo se pierde en cambios?', '10%', ['1%', '9%', '90%'], '1 / (9 + 1) = 0.1.', 3],
    ['En MLFQ, ¿para qué sirve el impulso periódico de prioridad?', 'Para evitar la inanición y adaptarse a procesos que cambian de comportamiento', ['Para premiar a los procesos largos', 'Para ahorrar memoria', 'Para que el sistema arranque más rápido'], 'Regla 5 de OSTEP.', 3],
    ['¿Cómo elige Linux CFS la siguiente tarea?', 'La de menor tiempo virtual de ejecución, guardada en un árbol rojo-negro', ['Al azar', 'La que llegó primero', 'La de mayor PID'], 'El tiempo virtual crece más lento para las tareas de mayor peso.', 4],
    ['Con lotería, un proceso tiene 30 de 120 boletos. ¿Qué fracción del procesador recibe aproximadamente?', '25%', ['30%', '12%', '4%'], '30/120.', 2],
    { tf: 'SJF puede causar inanición de procesos largos si siguen llegando procesos cortos.', v: true, e: 'Por eso se combina con envejecimiento.', l: 2 },
    { tf: 'Round Robin siempre da mejor tiempo de retorno que SJF.', v: false, e: 'Suele dar peor retorno; su fuerte es el tiempo de respuesta.', l: 3 },
    { i: 'Procesos A = 6, B = 2 y C = 4 llegan en t = 0. Con SJF, ¿cuál es la espera promedio? (dos decimales)', a: '2.67', e: 'Orden B, C, A: esperas 0, 2 y 6.', l: 3 },
    { c: 'Escribe «esperaPromedioFCFS(rafagas)»: todos llegan en t = 0 en el orden dado; devuelve la espera promedio redondeada a 2 decimales.', f: 'esperaPromedioFCFS', p: ['rafagas'], t: [[[[24, 3, 3]], 17], [[[3, 3, 24]], 3], [[[5]], 0], [[[6, 2, 4]], 4.67]], sol: '  let t = 0, suma = 0;\n  for (const r of rafagas) { suma += t; t += r; }\n  return Math.round(suma / rafagas.length * 100) / 100;', l: 2 },
    { c: 'Escribe «finRoundRobin(rafagas, q)»: todos llegan en t = 0 en el orden dado; devuelve la lista de tiempos de fin de cada proceso.', f: 'finRoundRobin', p: ['rafagas', 'q'], t: [[[[5, 3, 1], 2], [9, 8, 5]], [[[4, 4], 4], [4, 8]], [[[2, 2, 2], 1], [4, 5, 6]], [[[6, 2, 4], 2], [12, 4, 10]]], sol: '  const resto = [...rafagas], fin = [], cola = rafagas.map((_, i) => i);\n  let t = 0;\n  while (cola.length) {\n    const i = cola.shift(), u = Math.min(q, resto[i]);\n    t += u; resto[i] -= u;\n    if (resto[i] > 0) cola.push(i); else fin[i] = t;\n  }\n  return fin;', h: 'Usa una cola de índices; si al proceso le queda tiempo, vuelve al final.', l: 4 },
    { c: 'Escribe «estimarRafaga(alfa, real, estimada)» con τ = α·t + (1 − α)·τ, redondeada a 2 decimales.', f: 'estimarRafaga', p: ['alfa', 'real', 'estimada'], t: [[[0.5, 6, 10], 8], [[0.5, 4, 8], 6], [[1, 3, 9], 3], [[0, 3, 9], 9]], sol: '  return Math.round((alfa * real + (1 - alfa) * estimada) * 100) / 100;', l: 2 }
  ],
  gen: function (g) {
    function fcfs(r) { var t = 0, s = 0; r.forEach(function (x) { s += t; t += x; }); return s / r.length; }
    g.times(8, function (R) { var r = [R.int(1, 12), R.int(1, 12), R.int(1, 12)]; g.input(2, 'Tres procesos llegan en t = 0 con ráfagas ' + r.join(', ') + ' (en ese orden). ¿Cuál es la espera promedio con FCFS? Redondea a 2 decimales.', fcfs(r).toFixed(2), 'Cada uno espera la suma de las ráfagas anteriores.'); var o = r.slice().sort(function (a, b) { return a - b; }); g.input(3, 'Con las mismas ráfagas (' + r.join(', ') + '), ¿cuál es la espera promedio con SJF? Redondea a 2 decimales.', fcfs(o).toFixed(2), 'Ordena de menor a mayor: ' + o.join(', ') + '.'); });
    g.times(5, function (R) { var c = R.pick([0.1, 0.5, 1]), q = R.pick([2, 4, 9, 19]); g.input(3, 'Cada cambio de contexto cuesta ' + c + ' ms y el cuanto es ' + q + ' ms. ¿Qué porcentaje del tiempo se pierde en cambios? Redondea a 1 decimal.', (100 * c / (q + c)).toFixed(1), c + ' / (' + q + ' + ' + c + ') × 100.'); });
    var al = [['Atiende en orden de llegada y no expropia', 'FCFS'], ['Da turnos fijos a todos en orden circular', 'Round Robin'], ['Ejecuta primero la ráfaga más corta sin expropiar', 'SJF'], ['Expropia si llega un proceso con menos tiempo restante', 'SRTF'], ['Baja de cola a los procesos que agotan su tiempo y sube a todos periódicamente', 'MLFQ'], ['Sortea el procesador según los boletos de cada proceso', 'Lotería']];
    var nombres = al.map(function (a) { return a[1]; });
    al.forEach(function (a) { g.mcq(2, '¿Qué algoritmo de planificación es este? ' + a[0], a[1], g.R.sample(nombres.filter(function (n) { return n !== a[1]; }), 3), 'Cada algoritmo equilibra distinto retorno, espera y respuesta.'); });
  },
  checks: [
    ['Define tiempo de retorno, de espera y de respuesta, y di qué tipo de sistema prioriza cada uno.', 'Retorno: fin − llegada (lotes); espera: retorno − ráfaga; respuesta: primera ejecución − llegada (interactivos).'],
    ['¿Por qué SJF es óptimo en espera promedio pero difícil de implementar?', 'Porque ordenar de más corto a más largo minimiza la suma de esperas, pero el sistema no conoce las ráfagas futuras y debe estimarlas.'],
    ['¿Cómo afecta el tamaño del cuanto a Round Robin?', 'Muy grande lo convierte en FCFS; muy pequeño desperdicia tiempo en cambios de contexto.'],
    ['Explica cómo MLFQ distingue procesos interactivos de procesos de cálculo sin conocerlos de antemano.', 'Observa su uso del procesador: los que agotan su tiempo bajan de prioridad y los que se bloquean pronto se quedan arriba.'],
    ['Calcula la espera promedio de FCFS y SJF para ráfagas 8, 1 y 3 que llegan en t = 0.', 'FCFS: esperas 0, 8 y 9, promedio 5.67; SJF (1, 3, 8): esperas 0, 1 y 4, promedio 1.67.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 7 a 10.', 'Corbató, F., Merwin-Daggett, M. y Daley, R. (1962). An Experimental Time-Sharing System. *AFIPS Spring Joint Computer Conference*.', 'Waldspurger, C. y Weihl, W. (1994). Lottery Scheduling: Flexible Proportional-Share Resource Management. *OSDI 1994*.', 'Stoica, I. y Abdel-Wahab, H. (1995). *Earliest Eligible Virtual Deadline First: A Flexible and Accurate Mechanism for Proportional Share Resource Allocation*. Old Dominion University, TR-95-22.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.), capítulo 5.'],
  project: { t: 'Simulador de planificadores',
    goal: 'Comparar con datos los algoritmos clásicos de planificación.',
    steps: ['Implementa FCFS, SJF, SRTF, Round Robin y MLFQ en un simulador que reciba procesos con llegada y ráfaga.', 'Calcula para cada uno el retorno, la espera y la respuesta promedio, y dibuja su diagrama de Gantt.', 'Genera cargas con muchos procesos cortos e interactivos y pocos largos, y compara resultados.', 'Varía el cuanto de RR y el costo del cambio de contexto y grafica el efecto.', 'Escribe una recomendación de qué algoritmo usar para un servidor web y para un sistema por lotes.'],
    deliver: 'El simulador con pruebas, los diagramas y gráficos, y la recomendación justificada.' },
  hito: ['Implementa en PatioApp una cola de trabajos en segundo plano (reportes, envío de correos, procesamiento de fotos) con prioridades y envejecimiento para evitar la inanición.', 'Mide el tiempo de respuesta y de retorno de los trabajos de PatioApp con FCFS y con Round Robin, y elige la política con datos.']
});

S('so', 'so.sync', { title: 'Sincronización: candados, semáforos y monitores',
  ask: '¿Qué concepto de sincronización se aplica?',
  lesson: `
> **La idea en simple.** En un baño de oficina con una sola llave colgada en recepción, quien quiere entrar toma la llave; si no está, espera. Esa llave es un **candado**. Si hay tres cubículos y tres llaves, quien llega toma una de las que quedan: eso es un **semáforo**. Y si uno espera a que "haya papel" antes de entrar, necesita que alguien le avise cuando lo repongan: eso es una **variable de condición**.

## El problema de la sección crítica
Varios hilos que comparten datos tienen **secciones críticas**: fragmentos que leen y modifican esos datos. Una solución correcta debe cumplir tres condiciones (formuladas así en los textos clásicos, como el de Silberschatz):
- **Exclusión mutua:** como máximo un hilo dentro de la sección crítica.
- **Progreso:** si nadie está dentro y alguien quiere entrar, la decisión de quién entra no puede posponerse indefinidamente.
- **Espera acotada:** hay un límite a cuántas veces otros pueden entrar antes que un hilo que ya lo pidió (nadie espera para siempre).

## Soluciones solo con software
Edsger Dijkstra publicó en 1965 la primera solución correcta para dos procesos, atribuida a Theodorus Dekker. Gary Peterson presentó en 1981 una más simple:
~~~txt
quiero[i] = verdadero; turno = j;          // cedo el turno al otro
mientras (quiero[j] y turno == j) { }      // espero solo si el otro quiere y es su turno
  ...sección crítica...
quiero[i] = falso;
~~~
Es elegante y correcta en el modelo teórico, pero **falla en los procesadores modernos**: el compilador y el hardware reordenan lecturas y escrituras a memoria para ganar velocidad, y otro núcleo puede ver las escrituras en un orden distinto. Hacen falta **barreras de memoria** que prohíban esos reordenamientos. En la práctica se usan instrucciones atómicas del hardware.

## El apoyo del hardware
Los procesadores ofrecen instrucciones **atómicas**, que leen y escriben una posición de memoria en un solo paso indivisible:
- **Test-and-set:** pone una variable en verdadero y devuelve su valor anterior.
- **Compare-and-swap (CAS):** si la variable vale lo esperado, la reemplaza por un valor nuevo; si no, no hace nada. Devuelve si tuvo éxito.
- **Fetch-and-add:** suma atómicamente y devuelve el valor anterior; ideal para contadores.
Con test-and-set se construye un **spinlock**: el hilo repite la instrucción en un bucle hasta conseguir el candado. Es eficiente si la espera es muy corta (por ejemplo, dentro del núcleo en una máquina de varios núcleos), pero desperdicia procesador si la espera es larga.

## Candados (mutex)
Un **mutex** tiene dos operaciones: «lock» (adquirir; si está tomado, el hilo se bloquea y el sistema lo duerme) y «unlock» (liberar; despierta a uno de los que esperan). Reglas de uso:
- Proteger **todos** los accesos a los datos compartidos con el mismo candado, también las lecturas.
- Mantener la sección crítica **corta**: nada de entrada y salida lenta con el candado tomado.
- Liberarlo siempre, incluso si ocurre un error (en Java, «finally»; en C++, objetos que lo liberan al salir del ámbito).
Linux implementa sus mutex de usuario con **futex** (*fast userspace mutex*): si no hay competencia, lock y unlock son una operación atómica sin entrar al núcleo; solo si hay que dormir se hace una llamada al sistema.

## Semáforos
Dijkstra introdujo los **semáforos** en los años 60 para el sistema THE. Un semáforo es un contador entero con dos operaciones atómicas, que él llamó P y V (por palabras neerlandesas):
- **P** (*wait*, *down*): si el valor es mayor que 0, lo decrementa; si es 0, el hilo se bloquea.
- **V** (*signal*, *up*): si hay hilos bloqueados, despierta a uno; si no, incrementa el valor.
Un semáforo **binario** (iniciado en 1) funciona como un mutex. Un semáforo **contador** iniciado en N limita a N el número de hilos que usan un recurso (por ejemplo, N conexiones a la base de datos). Y un semáforo iniciado en 0 sirve para **ordenar** eventos: el hilo B hace P y espera hasta que A haga V.

## El productor-consumidor
El problema clásico del **búfer acotado**: productores agregan elementos a un búfer de capacidad N y consumidores los retiran. Con semáforos:
~~~txt
vacíos = N, llenos = 0, mutex = 1
Productor: P(vacíos); P(mutex); agregar; V(mutex); V(llenos)
Consumidor: P(llenos); P(mutex); retirar; V(mutex); V(vacíos)
~~~
El orden importa: si el productor hiciera P(mutex) antes de P(vacíos) con el búfer lleno, se dormiría con el candado tomado y el consumidor nunca podría entrar a liberar espacio: un **interbloqueo**.

## Variables de condición y monitores
Per Brinch Hansen (1973) y C. A. R. Hoare (1974) propusieron los **monitores**: un módulo cuyos datos solo se acceden mediante procedimientos que se ejecutan con exclusión mutua automática. Dentro de un monitor, las **variables de condición** permiten esperar a que algo sea cierto:
- «wait(c)» libera el candado del monitor y duerme al hilo, en un solo paso atómico.
- «signal(c)» despierta a un hilo que espera en c; «broadcast(c)» despierta a todos.
Butler Lampson y David Redell describieron en 1980 la semántica del lenguaje Mesa, que es la de casi todos los sistemas actuales: el hilo despertado no se ejecuta de inmediato, y cuando lo hace la condición puede haber cambiado. Por eso la regla de oro es **esperar siempre dentro de un bucle**: «mientras (búfer vacío) wait(noVacío)», nunca con un simple «si». Java implementa monitores con «synchronized», «wait» y «notify»; C y C++ con «pthread_cond_t» y «std::condition_variable».

## Otros problemas clásicos
- **Lectores y escritores** (Courtois, Heymans y Parnas, 1971): muchos lectores pueden leer a la vez, pero un escritor necesita exclusividad. Hay variantes que privilegian a lectores (y pueden matar de hambre a los escritores) o a escritores. Los **candados de lectura-escritura** lo resuelven.
- **La cena de los filósofos** (Dijkstra, 1965): cinco filósofos alrededor de una mesa con un tenedor entre cada par; cada uno necesita los dos tenedores para comer. Si todos toman primero el izquierdo, se interbloquean. Soluciones: que uno tome primero el derecho (romper la simetría) o permitir comer a lo sumo a cuatro a la vez.

## Más allá de los candados
- **Operaciones atómicas** para contadores y banderas simples (en JavaScript, «Atomics.add» sobre un «SharedArrayBuffer» compartido entre workers).
- **Estructuras sin bloqueo** (*lock-free*) basadas en CAS, que estudian Herlihy y Shavit.
- **Paso de mensajes** en lugar de memoria compartida, como recomienda el lema de Go: "no comuniques compartiendo memoria; comparte memoria comunicando".

## Errores típicos y cómo detectarlos
Shan Lu y sus coautores estudiaron en 2008 más de cien errores de concurrencia reales en MySQL, Apache, Mozilla y OpenOffice. Encontraron que casi todos los errores que no eran interbloqueos se debían a dos patrones: **violaciones de atomicidad** (una secuencia que debía ser indivisible fue interrumpida, como "comprobar y luego actuar") y **violaciones de orden** (se supuso que A ocurría antes que B, sin garantizarlo). También vieron que la mayoría se manifestaba con solo dos hilos. Herramientas que ayudan:
- **Detectores de carreras** como ThreadSanitizer (en Clang y GCC) o el detector de Go («go test -race»), que instrumentan los accesos a memoria y avisan cuando dos hilos tocan el mismo dato sin sincronización.
- **Pruebas de estrés** que repiten miles de veces con muchos hilos y esperas aleatorias para provocar intercalaciones raras.
- **Revisión de código** con una pregunta fija: ¿qué candado protege este dato?

## Ejemplo resuelto: los espacios libres del patio
PatioApp lleva un contador de espacios libres que actualizan a la vez el hilo que registra ingresos y el que registra salidas. Sin protección, dos ingresos simultáneos pueden leer "1 libre" y ocupar ambos el mismo espacio. Diseño: un semáforo contador iniciado en la capacidad del patio (P al ingresar, V al salir), de modo que un ingreso **espera** si el patio está lleno, y un mutex que protege la tabla de qué vehículo ocupa cada espacio. El orden siempre es el mismo: primero el semáforo, luego el mutex, como en el productor-consumidor, para no dormirse con el mutex tomado.`,
  links: [['so.threads', 'las condiciones de carrera aparecen al compartir memoria entre hilos'], ['m8.conc', 'esta unidad profundiza la introducción a la concurrencia'], ['plat.embedded', 'la inversión de prioridades es un problema de sincronización']],
  read: 'OSTEP, capítulos 28 a 31 (Locks, Condition Variables, Semaphores); Silberschatz, capítulos 6 y 7; Hoare (1974); Lampson y Redell (1980).',
  terms: [
    ['Exclusión mutua', 'propiedad de que como máximo un hilo esté en la sección crítica a la vez', ['Solo un hilo actualiza el saldo a la vez.', 'La garantiza un mutex.', 'Es la primera condición de una solución correcta.']],
    ['Instrucción atómica', 'operación del hardware que lee y modifica memoria en un solo paso indivisible', ['Compare-and-swap.', 'Fetch-and-add para un contador.', 'Base de los candados modernos.']],
    ['Spinlock', 'candado en el que el hilo espera repitiendo activamente un intento atómico en lugar de dormirse', ['Útil si la espera dura microsegundos.', 'Desperdicia procesador si la espera es larga.', 'Se usa mucho dentro del núcleo.']],
    ['Mutex', 'candado de exclusión mutua con operaciones lock y unlock que duerme al hilo que no puede adquirirlo', ['Protege la tabla de espacios ocupados.', 'Linux lo implementa con futex.', 'Debe liberarse aunque ocurra un error.']],
    ['Semáforo', 'contador entero con operaciones atómicas P, que espera si es cero, y V, que despierta o incrementa', ['Iniciado en 3, deja pasar a tres hilos.', 'Dijkstra lo introdujo en los años 60.', 'Iniciado en 0 sirve para ordenar eventos.']],
    ['Variable de condición', 'mecanismo para que un hilo duerma liberando el candado hasta que otro le avise que algo cambió', ['El consumidor espera a que el búfer no esté vacío.', 'Se usa siempre dentro de un bucle while.', 'Se acompaña de un mutex.']],
    ['Monitor', 'módulo cuyos datos solo se acceden con procedimientos que se ejecutan con exclusión mutua automática', ['Los métodos synchronized de Java.', 'Hoare y Brinch Hansen lo propusieron.', 'Combina candado y variables de condición.']],
    ['Barrera de memoria', 'instrucción que impide que el compilador o el procesador reordenen accesos a memoria a través de ella', ['El algoritmo de Peterson la necesita en hardware moderno.', 'Las operaciones atómicas suelen incluirla.', 'Evita que otro núcleo vea escrituras en desorden.']]
  ],
  q: [
    ['¿Por qué el algoritmo de Peterson puede fallar en un procesador moderno sin barreras de memoria?', 'Porque el compilador y el hardware pueden reordenar lecturas y escrituras', ['Porque solo funciona en Java', 'Porque usa demasiada memoria', 'Porque necesita más de dos procesos'], 'Los demás núcleos pueden ver las escrituras en otro orden.', 4],
    ['Un semáforo vale 0 y un hilo ejecuta P. ¿Qué pasa?', 'El hilo se bloquea hasta que otro haga V', ['El valor pasa a −1 y sigue', 'Se produce un error', 'El valor pasa a 1'], 'P espera mientras el valor sea 0.', 2],
    ['¿Para qué sirve un semáforo contador iniciado en 5?', 'Para limitar a 5 los hilos que usan un recurso a la vez', ['Para ordenar 5 eventos', 'Para crear 5 hilos', 'Para contar errores'], 'Cada P toma un permiso y cada V lo devuelve.', 2],
    ['¿Por qué se debe esperar en una variable de condición dentro de un bucle while?', 'Porque al despertar la condición puede haber cambiado (semántica de Mesa) o puede haber despertares espurios', ['Porque if no compila', 'Para gastar menos procesador', 'Porque signal despierta a todos siempre'], 'Hay que volver a comprobar la condición.', 4],
    ['En el productor-consumidor, ¿qué pasa si el productor hace P(mutex) antes de P(vacíos) con el búfer lleno?', 'Se duerme con el mutex tomado y el sistema se interbloquea', ['Funciona igual', 'Pierde un elemento', 'El consumidor consume dos veces'], 'El consumidor nunca podrá entrar a liberar espacio.', 4],
    ['¿Cuándo conviene un spinlock en lugar de un mutex que duerme?', 'Cuando la espera es muy corta y hay varios núcleos', ['Siempre', 'Cuando la espera es de segundos', 'Cuando hay un solo núcleo'], 'Dormir y despertar cuesta más que esperar unos microsegundos.', 3],
    ['¿Qué aporta un futex en Linux?', 'Adquirir y liberar sin entrar al núcleo cuando no hay competencia', ['Eliminar las condiciones de carrera automáticamente', 'Cifrar la memoria compartida', 'Planificar los hilos'], 'Solo se llama al núcleo cuando hay que dormir.', 4],
    { tf: 'Un semáforo binario iniciado en 1 puede usarse como mutex.', v: true, e: 'P equivale a lock y V a unlock.', l: 2 },
    { tf: 'Basta con proteger con el candado las escrituras; las lecturas de datos compartidos no lo necesitan.', v: false, e: 'Una lectura sin candado puede ver un estado intermedio inconsistente.', l: 3 },
    { o: 'Ordena las operaciones del productor en el búfer acotado con semáforos.', s: ['P(vacíos)', 'P(mutex)', 'Agregar el elemento', 'V(mutex)', 'V(llenos)'], e: 'Primero el semáforo de recursos, luego el mutex.', l: 3 },
    { c: 'Escribe «bloqueadosAlFinal(inicial, ops)»: simula un semáforo con valor inicial y una lista de operaciones "P" y "V" (V despierta a un bloqueado si lo hay; si no, incrementa). Devuelve cuántos hilos quedan bloqueados.', f: 'bloqueadosAlFinal', p: ['inicial', 'ops'], t: [[[1, ['P', 'P', 'V']], 0], [[0, ['P', 'P']], 2], [[2, ['P', 'V', 'P', 'P', 'P']], 1], [[0, ['V', 'P']], 0]], sol: '  let v = inicial, b = 0;\n  for (const o of ops) {\n    if (o === "P") { if (v > 0) v--; else b++; }\n    else { if (b > 0) b--; else v++; }\n  }\n  return b;', l: 3 },
    { c: 'Escribe «bufferValido(ops, capacidad)»: ops es una lista de "p" (producir) y "c" (consumir); devuelve false si en algún momento se consume con el búfer vacío o se produce con el búfer lleno.', f: 'bufferValido', p: ['ops', 'capacidad'], t: [[[['p', 'p', 'c', 'c'], 2], true], [[['c'], 1], false], [[['p', 'p', 'p'], 2], false], [[['p', 'c', 'p', 'c'], 1], true]], sol: '  let n = 0;\n  for (const o of ops) {\n    if (o === "p") { if (n === capacidad) return false; n++; }\n    else { if (n === 0) return false; n--; }\n  }\n  return true;', l: 2 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var v = R.int(0, 3), ops = []; for (var i = 0; i < R.int(3, 7); i++) ops.push(R.pick(['P', 'V'])); var val = v, b = 0; ops.forEach(function (o) { if (o === 'P') { if (val > 0) val--; else b++; } else { if (b > 0) b--; else val++; } }); g.input(3, 'Un semáforo empieza en ' + v + ' y recibe las operaciones ' + ops.join(', ') + '. ¿Cuántos hilos quedan bloqueados?', b, 'P decrementa o bloquea; V despierta o incrementa. Valor final ' + val + '.'); });
    var herr = [['Contar visitas desde varios hilos con el menor costo posible', 'Operación atómica fetch-and-add'], ['Permitir hasta 10 conexiones simultáneas a la base de datos', 'Semáforo contador'], ['Proteger una tabla compartida que se modifica en varios pasos', 'Mutex'], ['Hacer que un consumidor espere hasta que haya datos', 'Variable de condición'], ['Permitir muchas lecturas simultáneas pero una sola escritura', 'Candado de lectura-escritura'], ['Esperar unos pocos microsegundos dentro del núcleo en una máquina multinúcleo', 'Spinlock']];
    var hs = herr.map(function (h) { return h[1]; });
    herr.forEach(function (h) { g.mcq(3, '¿Qué mecanismo de sincronización conviene? ' + h[0], h[1], g.R.sample(hs.filter(function (x) { return x !== h[1]; }), 3), 'Cada mecanismo resuelve un patrón distinto.'); });
    var cond = [['Solo un hilo puede estar en la sección crítica', 'Exclusión mutua'], ['Si nadie está dentro y alguien quiere entrar, se decide sin demora indefinida', 'Progreso'], ['Nadie espera para siempre: hay un límite de cuántos entran antes que él', 'Espera acotada']];
    cond.forEach(function (c) { g.mcq(2, '¿Qué condición de la sección crítica describe esto? ' + c[0], c[1], ['Exclusión mutua', 'Progreso', 'Espera acotada', 'Atomicidad'].filter(function (x) { return x !== c[1]; }), 'Son las tres condiciones de una solución correcta.'); });
  },
  checks: [
    ['Enuncia las tres condiciones de una solución correcta al problema de la sección crítica.', 'Exclusión mutua, progreso y espera acotada.'],
    ['¿En qué se diferencia un spinlock de un mutex que duerme y cuándo usarías cada uno?', 'El spinlock espera activamente gastando procesador, útil para esperas muy cortas; el mutex duerme al hilo, mejor para esperas largas.'],
    ['Escribe de memoria el productor-consumidor con tres semáforos.', 'vacíos = N, llenos = 0, mutex = 1; productor: P(vacíos), P(mutex), agregar, V(mutex), V(llenos); consumidor: P(llenos), P(mutex), retirar, V(mutex), V(vacíos).'],
    ['¿Por qué se usa while y no if al esperar en una variable de condición?', 'Porque al despertar la condición puede ya no ser cierta (otro hilo se adelantó o hubo un despertar espurio), así que hay que comprobarla de nuevo.'],
    ['¿Cómo se interbloquean los filósofos y cómo se evita?', 'Si todos toman primero el tenedor izquierdo, todos esperan el derecho; se evita rompiendo la simetría (uno toma primero el derecho) o limitando a cuatro comensales.']
  ],
  cites: ['Dijkstra, E. (1965). Solution of a Problem in Concurrent Programming Control. *Communications of the ACM*, 8(9).', 'Peterson, G. (1981). Myths About the Mutual Exclusion Problem. *Information Processing Letters*, 12(3).', 'Hoare, C. A. R. (1974). Monitors: An Operating System Structuring Concept. *Communications of the ACM*, 17(10).', 'Lampson, B. y Redell, D. (1980). Experience with Processes and Monitors in Mesa. *Communications of the ACM*, 23(2).', 'Lu, S., Park, S., Seo, E. y Zhou, Y. (2008). Learning from Mistakes: A Comprehensive Study on Real World Concurrency Bug Characteristics. *ASPLOS 2008*.', 'Courtois, P., Heymans, F. y Parnas, D. (1971). Concurrent Control with "Readers" and "Writers". *Communications of the ACM*, 14(10).', 'Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 28 a 31.'],
  project: { t: 'Biblioteca de sincronización y problemas clásicos',
    goal: 'Construir primitivas de sincronización y usarlas en los problemas clásicos.',
    steps: ['Implementa un spinlock con compare-and-swap (en C con atomics, o en JavaScript con Atomics sobre SharedArrayBuffer y workers).', 'Implementa un semáforo a partir de un mutex y una variable de condición.', 'Resuelve el búfer acotado con varios productores y consumidores, y verifica que no se pierden ni duplican elementos.', 'Resuelve lectores y escritores sin inanición de escritores.', 'Resuelve la cena de los filósofos sin interbloqueo y prueba con miles de iteraciones.'],
    deliver: 'El código, las pruebas de estrés y un documento que explique por qué cada solución es correcta.' },
  hito: ['Controla los espacios libres de PatioApp con un semáforo contador y protege la tabla de ocupación con un mutex, sin condiciones de carrera.', 'Agrega a PatioApp una prueba de estrés con cientos de ingresos y salidas concurrentes que verifique que nunca se asigna un espacio dos veces.']
});

S('so', 'so.dead', { title: 'Interbloqueos',
  ask: '¿Qué concepto sobre interbloqueos se aplica?',
  lesson: `
> **La idea en simple.** Dos autos llegan a la vez a un puente de un solo carril, uno desde cada lado. Ninguno retrocede, cada uno espera que el otro le deje pasar, y ahí se quedan para siempre. Eso es un **interbloqueo** (*deadlock*): un grupo de procesos en el que cada uno espera algo que tiene otro del mismo grupo.

## Definición y ejemplo
Un conjunto de procesos está en interbloqueo si cada uno espera un evento que solo puede causar otro proceso del conjunto. El caso típico con dos candados:
~~~txt
Hilo 1: lock(A); lock(B); ...      Hilo 2: lock(B); lock(A); ...
~~~
Si el hilo 1 toma A y el hilo 2 toma B antes de que ninguno pida el segundo, ambos esperan para siempre. Puede no pasar durante meses de pruebas y aparecer un día en producción, porque depende del orden de intercalación.

## Las cuatro condiciones de Coffman
Edward Coffman, Melanie Elphick y Arie Shoshani demostraron en 1971 que un interbloqueo solo puede ocurrir si se cumplen **las cuatro** condiciones a la vez:
1. **Exclusión mutua:** al menos un recurso no se puede compartir.
2. **Retener y esperar:** un proceso retiene recursos mientras espera otros.
3. **Sin expropiación:** los recursos no se le pueden quitar a la fuerza; solo los suelta el que los tiene.
4. **Espera circular:** existe un ciclo P₁ → P₂ → … → Pₙ → P₁ en el que cada uno espera un recurso del siguiente.
Romper cualquiera de las cuatro basta para que el interbloqueo sea imposible.

## El grafo de asignación de recursos
Richard Holt propuso en 1972 representar la situación con un grafo: los procesos y los recursos son nodos; una flecha de un proceso a un recurso significa "lo pide" y una flecha de un recurso a un proceso, "lo tiene asignado". Si cada recurso tiene una sola instancia, **hay interbloqueo si y solo si hay un ciclo**. Con varias instancias por recurso, un ciclo es necesario pero no suficiente. Simplificando el grafo a solo procesos se obtiene el **grafo de espera** (*wait-for*): P → Q significa que P espera algo que tiene Q.

## Cuatro estrategias
| Estrategia | Idea | Dónde se usa |
| Ignorar | suponer que es raro y reiniciar si pasa ("algoritmo del avestruz") | la mayoría de los sistemas operativos de propósito general frente a interbloqueos de aplicaciones |
| Prevenir | diseñar para que una condición de Coffman sea imposible | orden global de candados en el núcleo de Linux y en bibliotecas |
| Evitar | conceder un recurso solo si el sistema queda en estado seguro | algoritmo del banquero; poco usado por necesitar las demandas máximas |
| Detectar y recuperar | dejar que ocurra, detectarlo con el grafo y romperlo | bases de datos, que abortan una transacción víctima |

## Prevención: romper una condición
- **Exclusión mutua:** usar recursos compartibles cuando se pueda (datos de solo lectura, estructuras sin bloqueo), aunque muchos recursos son intrínsecamente exclusivos.
- **Retener y esperar:** pedir todos los recursos de una vez al inicio; desperdicia recursos y no siempre se saben de antemano.
- **Sin expropiación:** si no se consigue el siguiente candado, soltar los que se tienen y reintentar. En código: «trylock» con espera aleatoria.
- **Espera circular:** imponer un **orden total** a los recursos y pedirlos siempre en ese orden. Es la técnica más usada en la práctica: si todos los hilos toman A antes que B, no puede formarse el ciclo. El núcleo de Linux documenta el orden de sus candados, y su herramienta **lockdep** detecta en pruebas cualquier violación del orden antes de que cause un interbloqueo real.

## Evitación: el algoritmo del banquero
Dijkstra propuso en 1965 el **algoritmo del banquero**, inspirado en un banco que solo presta si puede garantizar que todos sus clientes terminarán. Cada proceso declara su demanda **máxima**. El sistema conoce:
- **Disponible:** cuántas instancias libres hay de cada recurso.
- **Asignado:** cuántas tiene cada proceso.
- **Necesidad:** máximo − asignado, lo que aún podría pedir.
Un estado es **seguro** si existe un orden en que todos los procesos pueden terminar: buscar un proceso cuya necesidad quepa en lo disponible, suponer que termina y devuelve lo que tiene, y repetir. Una petición se concede solo si el estado resultante es seguro. Un estado inseguro no es necesariamente un interbloqueo, pero puede llevar a uno.
~~~js
function esSeguro(disponible, asignado, necesidad) {
  const trabajo = [...disponible], termino = asignado.map(() => false), orden = [];
  let avanzo = true;
  while (avanzo) {
    avanzo = false;
    asignado.forEach((a, i) => {
      if (!termino[i] && necesidad[i].every((n, r) => n <= trabajo[r])) {
        a.forEach((x, r) => trabajo[r] += x); termino[i] = true; orden.push('P' + i); avanzo = true;
      }
    });
  }
  return termino.every(Boolean) ? 'seguro, orden ' + orden.join(' → ') : 'inseguro';
}
// Ejemplo clásico de Silberschatz: recursos A, B, C
console.log(esSeguro([3, 3, 2],
  [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]],
  [[7, 4, 3], [1, 2, 2], [6, 0, 0], [0, 1, 1], [4, 3, 1]]));
~~~

## Detección y recuperación
Se construye periódicamente el grafo de espera y se busca un ciclo con un recorrido en profundidad (costo proporcional a nodos más aristas). Si hay ciclo, se recupera:
- **Abortando** procesos del ciclo (todos o uno a la vez, eligiendo una **víctima** por costo: el que menos trabajo pierde).
- **Expropiando** recursos y llevando al proceso a un punto de control anterior (*rollback*).
Las bases de datos hacen exactamente esto: PostgreSQL revisa el grafo cuando una transacción lleva un tiempo esperando un bloqueo (por defecto, un segundo), aborta una víctima con el error "deadlock detected" y la aplicación debe reintentarla.

## Parientes del interbloqueo
- **Bloqueo activo** (*livelock*): los procesos no están dormidos, sino que cambian de estado sin avanzar, como dos personas que se apartan hacia el mismo lado en un pasillo una y otra vez. Ocurre, por ejemplo, si dos hilos sueltan y reintentan sus candados sincronizados. Se rompe con esperas aleatorias.
- **Inanición:** un proceso nunca consigue el recurso aunque el sistema avance. No hay ciclo, pero sí injusticia.
- **Inversión de prioridades:** la viste en el caso de Mars Pathfinder.

## Interbloqueos más allá de los candados
El patrón aparece en muchos lugares, no solo con mutex:
- **Bases de datos:** dos transacciones actualizan las filas X e Y en orden opuesto.
- **Tuberías y mensajes:** dos procesos esperan leer del otro antes de escribir; ambos se quedan esperando un mensaje que nunca llega.
- **Conjuntos de hilos:** todas las tareas de un conjunto esperan el resultado de subtareas que están en la cola del mismo conjunto, y no queda ningún hilo libre para ejecutarlas.
- **Sistemas distribuidos:** servicios que se llaman mutuamente de forma síncrona y agotan sus conexiones.
En todos los casos la receta es la misma: buscar las cuatro condiciones y romper una, normalmente imponiendo un orden o poniendo **tiempos de espera** (*timeouts*) que conviertan una espera eterna en un error que se puede manejar y reintentar.

## Ejemplo resuelto: transferencias entre espacios del patio
PatioApp permite mover un vehículo del espacio X al espacio Y, y para eso bloquea ambos espacios. Si un operador mueve del 12 al 30 y otro, al mismo tiempo, del 30 al 12, cada hilo toma su primer espacio y espera el otro: espera circular. Solución por prevención: **ordenar** los candados por número de espacio y tomar siempre primero el menor, sin importar la dirección del movimiento. Ambos hilos intentan primero el 12; uno lo obtiene y el otro espera sin retener nada, así que el ciclo no puede formarse. Además, como la base de datos también puede detectar interbloqueos en sus filas, el código envuelve cada transferencia en un reintento con espera aleatoria si recibe el error de interbloqueo.`,
  links: [['so.sync', 'los interbloqueos nacen de usar candados y semáforos'], ['m4.graphs', 'detectar un interbloqueo es buscar un ciclo en un grafo dirigido'], ['m10.model', 'las bases de datos detectan interbloqueos entre transacciones']],
  read: 'OSTEP, capítulo 32 (Common Concurrency Problems); Silberschatz, capítulo 8; Coffman, Elphick y Shoshani (1971).',
  terms: [
    ['Interbloqueo', 'situación en que un conjunto de procesos espera indefinidamente eventos que solo pueden causar otros procesos del mismo conjunto', ['Dos hilos con candados A y B en orden opuesto.', 'Dos transacciones que bloquean filas cruzadas.', 'Requiere las cuatro condiciones de Coffman.']],
    ['Retener y esperar', 'condición en que un proceso conserva recursos mientras espera obtener otros', ['Un hilo tiene A y espera B.', 'Se rompe pidiendo todo de una vez.', 'Es una de las cuatro condiciones de Coffman.']],
    ['Espera circular', 'cadena cerrada de procesos en la que cada uno espera un recurso retenido por el siguiente', ['P1 espera a P2 y P2 espera a P1.', 'Se evita ordenando los recursos.', 'Aparece como ciclo en el grafo de espera.']],
    ['Orden global de candados', 'regla de adquirir siempre los candados en el mismo orden predefinido', ['Tomar siempre primero el espacio de menor número.', 'Linux lo verifica con lockdep.', 'Hace imposible la espera circular.']],
    ['Algoritmo del banquero', 'algoritmo de evitación que concede recursos solo si el sistema queda en un estado seguro', ['Dijkstra lo propuso en 1965.', 'Necesita la demanda máxima de cada proceso.', 'Busca un orden en que todos puedan terminar.']],
    ['Estado seguro', 'estado en el que existe al menos un orden de ejecución en que todos los procesos pueden obtener lo que necesitan y terminar', ['El banquero solo acepta peticiones que llevan a uno.', 'Un estado inseguro puede derivar en interbloqueo.', 'Se verifica simulando terminaciones.']],
    ['Grafo de espera', 'grafo cuyos nodos son procesos y una arista P → Q indica que P espera un recurso que tiene Q', ['PostgreSQL lo revisa para detectar interbloqueos.', 'Un ciclo indica interbloqueo.', 'Se recorre en profundidad.']],
    ['Bloqueo activo', 'situación en que los procesos cambian de estado continuamente sin lograr avanzar', ['Dos hilos sueltan y reintentan sus candados a la vez.', 'Dos personas se esquivan hacia el mismo lado.', 'Se rompe con esperas aleatorias.']]
  ],
  q: [
    ['¿Cuántas de las condiciones de Coffman deben cumplirse para que haya interbloqueo?', 'Las cuatro', ['Al menos una', 'Dos', 'Tres'], 'Romper cualquiera lo hace imposible.', 2],
    ['¿Qué condición rompe la técnica de ordenar globalmente los candados?', 'Espera circular', ['Exclusión mutua', 'Retener y esperar', 'Sin expropiación'], 'Con un orden total no puede formarse un ciclo.', 2],
    ['Con recursos de una sola instancia, ¿qué indica un ciclo en el grafo de asignación?', 'Que hay interbloqueo', ['Que puede haberlo pero no es seguro', 'Que el sistema es seguro', 'Nada'], 'Con varias instancias, el ciclo es necesario pero no suficiente.', 3],
    ['¿Qué hace PostgreSQL cuando detecta un interbloqueo entre transacciones?', 'Aborta una transacción víctima con un error que la aplicación debe reintentar', ['Espera indefinidamente', 'Reinicia el servidor', 'Ignora el problema'], 'Es detección y recuperación.', 3],
    ['¿Por qué el algoritmo del banquero se usa poco en sistemas de propósito general?', 'Porque exige conocer de antemano la demanda máxima de cada proceso', ['Porque es incorrecto', 'Porque solo sirve para un recurso', 'Porque consume mucha memoria'], 'Rara vez se conoce el máximo.', 3],
    ['Un hilo usa trylock y, si falla, suelta lo que tiene y reintenta. ¿Qué condición rompe?', 'Sin expropiación, porque libera voluntariamente', ['Espera circular', 'Exclusión mutua', 'Ninguna'], 'Puede derivar en bloqueo activo si no hay espera aleatoria.', 4],
    { tf: 'Un estado inseguro implica necesariamente un interbloqueo.', v: false, e: 'Solo significa que podría llegar a uno; los procesos podrían pedir menos que su máximo.', l: 3 },
    { tf: 'El bloqueo activo se diferencia del interbloqueo en que los procesos no están dormidos, pero tampoco avanzan.', v: true, e: 'Cambian de estado sin progresar.', l: 2 },
    { o: 'Ordena los pasos para verificar si un estado es seguro.', s: ['Inicializar trabajo con lo disponible', 'Buscar un proceso no terminado cuya necesidad quepa en trabajo', 'Sumar a trabajo lo que ese proceso tiene asignado y marcarlo terminado', 'Repetir hasta que no se pueda avanzar', 'Declarar seguro si todos terminaron'], e: 'Es el corazón del algoritmo del banquero.', l: 4 },
    { c: 'Escribe «esSeguro(disponible, asignado, necesidad)» que devuelva true si existe un orden en que todos los procesos pueden terminar (algoritmo del banquero).', f: 'esSeguro', p: ['disponible', 'asignado', 'necesidad'], t: [[[[3, 3, 2], [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]], [[7, 4, 3], [1, 2, 2], [6, 0, 0], [0, 1, 1], [4, 3, 1]]], true], [[[0, 0], [[1, 0], [0, 1]], [[0, 1], [1, 0]]], false], [[[1], [[1], [1]], [[1], [2]]], true]], sol: '  const w = [...disponible], fin = asignado.map(() => false);\n  let avanzo = true;\n  while (avanzo) {\n    avanzo = false;\n    for (let i = 0; i < asignado.length; i++) {\n      if (!fin[i] && necesidad[i].every((n, r) => n <= w[r])) { asignado[i].forEach((x, r) => w[r] += x); fin[i] = true; avanzo = true; }\n    }\n  }\n  return fin.every(Boolean);', h: 'Repite mientras encuentres un proceso cuya necesidad quepa en lo disponible acumulado.', l: 4 },
    { c: 'Escribe «hayCiclo(grafo)»: grafo es un objeto de espera {proceso: [procesos que espera]}; devuelve true si hay un ciclo (interbloqueo).', f: 'hayCiclo', p: ['grafo'], t: [[[{ A: ['B'], B: ['A'] }], true], [[{ A: ['B'], B: [] }], false], [[{ A: ['B'], B: ['C'], C: ['A'] }], true], [[{ A: ['B', 'C'], B: ['C'], C: [] }], false]], sol: '  const estado = {};\n  const dfs = n => {\n    if (estado[n] === 1) return true;\n    if (estado[n] === 2) return false;\n    estado[n] = 1;\n    for (const m of grafo[n] || []) if (dfs(m)) return true;\n    estado[n] = 2;\n    return false;\n  };\n  return Object.keys(grafo).some(dfs);', l: 3 }
  ],
  gen: function (g) {
    var cs = [['Un recurso no puede ser usado por dos procesos a la vez', 'Exclusión mutua'], ['Un proceso conserva un recurso mientras pide otro', 'Retener y esperar'], ['El sistema no puede quitarle un recurso a un proceso', 'Sin expropiación'], ['P1 espera a P2, P2 espera a P3 y P3 espera a P1', 'Espera circular']];
    cs.forEach(function (c) { g.mcq(2, '¿Qué condición de Coffman describe esto? ' + c[0], c[1], ['Exclusión mutua', 'Retener y esperar', 'Sin expropiación', 'Espera circular'].filter(function (x) { return x !== c[1]; }), 'Las cuatro deben cumplirse a la vez.'); });
    var rompe = [['Pedir todos los recursos al inicio del proceso', 'Retener y esperar'], ['Tomar siempre los candados en orden alfabético', 'Espera circular'], ['Si no consigo el segundo candado, suelto el primero', 'Sin expropiación'], ['Usar una estructura de solo lectura que todos pueden leer a la vez', 'Exclusión mutua']];
    rompe.forEach(function (r) { g.mcq(3, '¿Qué condición de Coffman rompe esta técnica? ' + r[0], r[1], ['Exclusión mutua', 'Retener y esperar', 'Sin expropiación', 'Espera circular'].filter(function (x) { return x !== r[1]; }), 'Romper una sola condición previene el interbloqueo.'); });
    var est = [['Ordenar los candados en el núcleo y verificarlo con lockdep', 'Prevención'], ['El banquero niega una petición que dejaría el sistema inseguro', 'Evitación'], ['La base de datos busca ciclos y aborta una víctima', 'Detección y recuperación'], ['El sistema no hace nada y el usuario reinicia el programa colgado', 'Ignorar']];
    est.forEach(function (e) { g.mcq(2, '¿Qué estrategia frente a interbloqueos es esta? ' + e[0], e[1], ['Prevención', 'Evitación', 'Detección y recuperación', 'Ignorar'].filter(function (x) { return x !== e[1]; }), 'Cuatro estrategias clásicas.'); });
    g.times(6, function (R) { var d = R.int(0, 4), a = [R.int(0, 3), R.int(0, 3)], n = [R.int(0, 5), R.int(0, 5)]; var w = d, f = [false, false], av = true; while (av) { av = false; for (var i = 0; i < 2; i++) if (!f[i] && n[i] <= w) { w += a[i]; f[i] = true; av = true; } } var seg = f[0] && f[1]; g.mcq(4, 'Un recurso tiene ' + d + ' instancias libres. P0 tiene ' + a[0] + ' y aún necesita ' + n[0] + '; P1 tiene ' + a[1] + ' y aún necesita ' + n[1] + '. ¿Es un estado seguro?', seg ? 'Sí' : 'No', [seg ? 'No' : 'Sí', 'Solo si P0 termina primero obligatoriamente', 'No se puede saber'], 'Busca un proceso cuya necesidad quepa en lo disponible y suma lo que libera.'); });
  },
  checks: [
    ['Enuncia las cuatro condiciones de Coffman.', 'Exclusión mutua, retener y esperar, sin expropiación y espera circular.'],
    ['¿Por qué ordenar los candados es la técnica de prevención más usada?', 'Porque es simple, no desperdicia recursos y hace imposible la espera circular.'],
    ['Explica qué es un estado seguro en el algoritmo del banquero.', 'Un estado en el que existe un orden en que todos los procesos pueden obtener su necesidad máxima, terminar y devolver lo que tienen.'],
    ['¿Cómo detecta y resuelve una base de datos un interbloqueo?', 'Construye el grafo de espera, busca un ciclo y aborta una transacción víctima, que la aplicación reintenta.'],
    ['Diferencia interbloqueo, bloqueo activo e inanición.', 'Interbloqueo: todos esperan dormidos en un ciclo; bloqueo activo: cambian de estado sin avanzar; inanición: uno nunca obtiene el recurso aunque el sistema avance.']
  ],
  cites: ['Coffman, E., Elphick, M. y Shoshani, A. (1971). System Deadlocks. *ACM Computing Surveys*, 3(2).', 'Holt, R. (1972). Some Deadlock Properties of Computer Systems. *ACM Computing Surveys*, 4(3).', 'Dijkstra, E. (1965). *Cooperating Sequential Processes*. Technological University, Eindhoven (EWD 123).', 'Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulo 32.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.), capítulo 8.'],
  project: { t: 'Detector de interbloqueos',
    goal: 'Provocar, detectar y prevenir interbloqueos en un programa real.',
    steps: ['Escribe un programa con dos hilos y dos candados que se interbloquee de forma reproducible.', 'Agrega un registro de quién tiene y quién espera cada candado, y un detector que construya el grafo de espera y encuentre ciclos.', 'Corrige el programa con un orden global de candados y verifica con miles de ejecuciones que ya no se bloquea.', 'Implementa el algoritmo del banquero y pruébalo con el ejemplo clásico y con casos inseguros.', 'Provoca un interbloqueo en una base de datos con dos transacciones y documenta el error y el reintento.'],
    deliver: 'El código, el detector, las pruebas y un informe con capturas de los errores.' },
  hito: ['Implementa el movimiento de vehículos entre espacios de PatioApp tomando siempre los candados en orden de número de espacio.', 'Agrega a PatioApp el reintento con espera aleatoria cuando la base de datos reporte un interbloqueo y una prueba que lo provoque.']
});
})();
