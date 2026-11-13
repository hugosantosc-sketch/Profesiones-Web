(function () {
var X = SDC.X, XM = SDC.XM;
XM('m8', {
  uni: 'MIT 6.1810 (antes 6.S081/6.828) *Operating System Engineering* y 6.1100 (antes 6.035) *Computer Language Engineering*; Berkeley CS162 *Operating Systems and System Programming*; Stanford CS111 *Operating Systems Principles* y CS143 *Compilers*; CMU 15-213 y 15-410. En Perú: Sistemas Operativos, Compiladores y Lenguajes de Programación (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp concurrente con lenguaje de consultas',
    goal: 'Hacer que PatioApp atienda a varios usuarios a la vez sin corromper datos y que entienda consultas escritas por las personas.',
    steps: ['Ejecuta PatioApp como servidor de Node y observa su proceso: memoria, descriptores abiertos y respuesta a señales.', 'Simula 50 revisores asignando unidades a la vez y demuestra una condición de carrera antes de corregirla.', 'Corrige la carrera con una operación atómica o un cerrojo por unidad y prueba que no hay interbloqueos.', 'Implementa un mini lenguaje de filtros con analizador léxico, sintáctico y evaluador, con errores que indiquen la posición.', 'Mide el uso de memoria con 1 millón de unidades y busca fugas.'],
    deliver: 'El servidor, las pruebas de concurrencia, el intérprete del lenguaje de consultas y un informe de memoria.' }
});

X('m8.os', {
  deep: `
## Tres grandes ideas
Remzi y Andrea Arpaci-Dusseau organizan *Operating Systems: Three Easy Pieces* (OSTEP), el libro gratuito usado en muchas universidades, alrededor de tres ideas:
- **Virtualización:** hacer que cada programa crea tener su propia CPU y su propia memoria.
- **Concurrencia:** coordinar actividades que ocurren a la vez.
- **Persistencia:** guardar datos que sobrevivan a apagones y fallas.

## Procesos por dentro
Un proceso pasa por estados: **listo** (espera la CPU), **ejecutando** y **bloqueado** (espera una lectura de disco o de red). El sistema guarda su contexto (registros, contador de programa, memoria) en una estructura llamada **bloque de control de proceso**. En Unix se crea un proceso con una idea elegante de dos pasos: «fork()» clona el proceso actual y «exec()» reemplaza el programa del clon por otro. Así funciona una terminal: se clona y el clon ejecuta el comando que escribiste.

## Planificación: cómo elegir quién usa la CPU
Las métricas que importan son el **tiempo de retorno** (desde que llega una tarea hasta que termina) y el **tiempo de respuesta** (hasta que empieza a atenderse).
| Política | Idea | Problema |
| FIFO | por orden de llegada | una tarea larga retrasa a todas las cortas (efecto convoy) |
| SJF | primero la más corta | hay que conocer la duración y las largas pueden esperar indefinidamente |
| Round-robin | turnos de pocos milisegundos | buen tiempo de respuesta, mal tiempo de retorno |
| MLFQ | colas de prioridad que aprenden del comportamiento | es compleja de ajustar |
La **cola multinivel con retroalimentación** (MLFQ) viene del sistema CTSS de Fernando Corbató en el MIT (1962), trabajo por el que recibió el Premio Turing en 1990: una tarea que usa toda su porción de CPU baja de prioridad (probablemente es un cálculo largo), y una que cede la CPU rápido sube (probablemente es interactiva). Linux usó durante años el planificador CFS (2007), que reparte la CPU de forma proporcional, y desde la versión 6.6 (2023) usa EEVDF.

## Memoria virtual con detalle
Cada dirección que usa un programa es **virtual**. La CPU la divide en número de página y desplazamiento; la **tabla de páginas** del proceso traduce el número de página a un marco de la RAM física. Para no consultar la tabla en cada acceso, la CPU guarda las traducciones recientes en la **TLB**, una caché pequeñísima y rapidísima. Si la página no está en RAM ocurre un **fallo de página**: el sistema la trae del disco, lo que es miles de veces más lento.

## ¿Qué página sacar cuando falta RAM?
- **Óptimo (OPT):** sacar la que se usará más tarde. László Bélády lo describió en 1966; es imposible en la práctica porque exige conocer el futuro, pero sirve para medir a los demás.
- **FIFO:** sacar la más antigua. Bélády mostró la **anomalía de Bélády**: con FIFO, más memoria puede producir *más* fallos.
- **LRU:** sacar la usada hace más tiempo; aproxima bien al óptimo gracias a la localidad.
Si los procesos necesitan más páginas de las que caben, el sistema pasa más tiempo moviendo páginas que trabajando: es la **hiperpaginación** (*thrashing*). Peter Denning propuso en 1968 el modelo del **conjunto de trabajo** para entender cuánta memoria necesita realmente un proceso.

## Persistencia: sistemas de archivos
En Unix, un archivo es un **inodo** con sus metadatos (dueño, permisos, tamaño, ubicación de los bloques) y un directorio es una lista de nombres que apuntan a inodos. Por eso un mismo archivo puede tener varios nombres (enlaces duros). El problema difícil es la **consistencia ante caídas**: si se corta la luz a mitad de una escritura, la estructura puede quedar rota. Los sistemas modernos (ext4, NTFS, APFS) usan un **diario** (*journaling*): primero anotan lo que van a hacer y luego lo hacen, así que al reiniciar pueden completar o deshacer. Y un detalle que causa pérdidas de datos: escribir en un archivo no garantiza que llegó al disco; para eso existe «fsync».

## Modo usuario, modo núcleo y llamadas al sistema
La CPU tiene al menos dos modos. En **modo usuario**, un programa no puede tocar el hardware ni la memoria de otros. Para leer un archivo debe hacer una **llamada al sistema**: una instrucción especial (una *trap*) que salta al núcleo, que verifica permisos, hace el trabajo y devuelve el resultado. Con «strace» en Linux puedes ver cada llamada que hace un programa.

## Del sistema operativo a los contenedores
Los contenedores (Docker) no son máquinas virtuales: son procesos normales que el núcleo de Linux aísla con dos mecanismos, los **namespaces** (cada contenedor ve sus propios procesos, red y archivos) y los **cgroups** (límites de CPU y memoria). Por eso arrancan en milisegundos y comparten el núcleo del anfitrión. Lo usarás en el módulo de DevOps.

~~~js
// En Node.js puedes observar tu propio proceso
if (typeof process !== 'undefined' && process.memoryUsage) {
  console.log('PID', process.pid, 'memoria MB', Math.round(process.memoryUsage().rss / 1e6));
} else {
  console.log('Este ejemplo muestra datos del proceso cuando se ejecuta en Node.js');
}
~~~`,
  checks: [
    ['¿Qué hacen fork() y exec() y por qué Unix los separa?', 'fork() crea un clon del proceso y exec() reemplaza el programa del proceso por otro. Separarlos permite que el clon prepare cosas (redirecciones, variables) antes de ejecutar el nuevo programa, como hace la terminal.'],
    ['¿Qué es el efecto convoy en FIFO?', 'Una tarea larga que llega primero hace esperar a muchas tareas cortas, empeorando mucho el tiempo promedio de retorno.'],
    ['¿Para qué sirve la TLB?', 'Guarda las traducciones recientes de direcciones virtuales a físicas para no consultar la tabla de páginas en memoria en cada acceso.'],
    ['¿Qué demuestra la anomalía de Bélády?', 'Que con el reemplazo FIFO, aumentar la cantidad de marcos de memoria puede aumentar los fallos de página, algo contraintuitivo que no ocurre con LRU.'],
    ['¿Por qué un programa que hace «write» y luego se corta la luz puede perder datos?', 'Porque write deja los datos en búferes del sistema operativo; solo fsync obliga a escribirlos físicamente en el disco.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2023). *Operating Systems: Three Easy Pieces* (v1.10). ostep.org.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.). Wiley.', 'Tanenbaum, A. y Bos, H. (2022). *Modern Operating Systems* (5.ª ed.). Pearson.', 'Bélády, L. (1966). A study of replacement algorithms for a virtual-storage computer. *IBM Systems Journal*, 5(2).', 'Denning, P. (1968). The working set model for program behavior. *Communications of the ACM*, 11(5).'],
  project: { t: 'Simuladores de planificación y de memoria',
    goal: 'Programar simuladores que muestren cómo decide un sistema operativo, para comparar políticas con números.',
    steps: ['Simula FIFO, SJF, round-robin (con quantum configurable) y una MLFQ sencilla sobre una lista de tareas con llegada y duración.', 'Calcula para cada política el tiempo de retorno y de respuesta promedio y dibuja un diagrama de Gantt en texto.', 'Simula reemplazo de páginas FIFO, LRU y OPT sobre una secuencia de referencias y cuenta los fallos.', 'Reproduce la anomalía de Bélády con la secuencia 1,2,3,4,1,2,5,1,2,3,4,5 y 3 y 4 marcos.', 'Escribe conclusiones: qué política elegirías para un servidor web y para un cálculo científico.'],
    deliver: 'Los simuladores, las tablas de resultados y las conclusiones.' },
  hito: ['Ejecuta PatioApp como proceso de Node y agrega un comando de diagnóstico que muestre su PID, memoria usada y tiempo activo.', 'Atrapa la señal SIGINT para guardar los datos antes de salir y verifica con 1 millón de unidades que la memoria no crece sin control.']
});

X('m8.conc', {
  deep: `
## Los pioneros
Edsger Dijkstra planteó en 1965 (*Cooperating Sequential Processes*, nota EWD123) los problemas fundamentales de la concurrencia: la exclusión mutua y los **semáforos** como solución, con sus operaciones P (esperar) y V (señalar). Ese mismo año propuso el problema de los **filósofos comensales**: cinco filósofos alrededor de una mesa con un tenedor entre cada par; si todos toman a la vez el tenedor de su izquierda, ninguno podrá tomar el de la derecha y todos esperarán para siempre. Edward Coffman y sus coautores describieron en 1971 las cuatro condiciones que, juntas, producen un interbloqueo: exclusión mutua, retener y esperar, no expropiación y espera circular. Basta romper una para evitarlo; la técnica más práctica es **adquirir siempre los cerrojos en el mismo orden**, lo que impide la espera circular.

## Monitores y variables de condición
Tony Hoare y Per Brinch Hansen propusieron en 1974 los **monitores**: un objeto cuyos métodos se ejecutan de a uno, con **variables de condición** para esperar a que algo sea verdad ("esperar hasta que haya espacio en la cola"). Los «synchronized», «wait» y «notify» de Java son la versión más conocida.

## Compartir memoria o comunicarse
Hoare propuso en 1978 los **procesos secuenciales comunicantes** (CSP): procesos que no comparten memoria y se coordinan enviándose mensajes por canales. Carl Hewitt había propuesto en 1973 el **modelo de actores**, donde cada actor tiene su estado privado y un buzón de mensajes. Go se inspira en CSP y su documentación lo resume en un proverbio: no te comuniques compartiendo memoria; comparte memoria comunicándote. Erlang y Akka se inspiran en los actores.

## El caso de JavaScript
JavaScript ejecuta tu código en **un solo hilo** con un bucle de eventos. Eso elimina las carreras dentro de una función síncrona, pero no elimina las carreras **entre operaciones asíncronas**: si dos peticiones leen un valor, esperan una respuesta de la base de datos y luego escriben, el resultado depende de cuál termine primero.
~~~js
let stock = 1;
const espera = ms => new Promise(r => setTimeout(r, ms));
async function vender(quien) {
  const visto = stock;                 // leer
  await espera(Math.random() * 10);    // la "red" o la base de datos tarda
  if (visto > 0) { stock = visto - 1; return quien + ' vendió'; }   // escribir
  return quien + ' no pudo';
}
Promise.all([vender('Caja A'), vender('Caja B')]).then(r => console.log(r, 'stock final', stock));
~~~
Ambas cajas venden la última unidad. La solución es que la comprobación y la escritura sean **una sola operación atómica** (por ejemplo, «UPDATE unidades SET estado = 'reservada' WHERE placa = ? AND estado = 'libre'» en la base de datos, y comprobar cuántas filas cambió) o serializar el acceso con una cola.

## Primitivas de bajo nivel
Las CPU modernas ofrecen instrucciones atómicas como **comparar e intercambiar** (CAS): "si el valor sigue siendo el que vi, cámbialo por el nuevo; si no, avísame". Con CAS se construyen cerrojos y estructuras **sin bloqueo** (*lock-free*). Maurice Herlihy y Nir Shavit lo desarrollan en *The Art of Multiprocessor Programming*. En JavaScript, «SharedArrayBuffer» y «Atomics» permiten memoria compartida entre Web Workers con estas operaciones.

## Orden de los eventos y modelos de memoria
Leslie Lamport mostró en 1978 (*Time, Clocks, and the Ordering of Events in a Distributed System*) que en sistemas concurrentes no existe un "ahora" global: solo podemos hablar de qué evento **ocurrió antes** que otro según la causalidad. En 1979 definió la **consistencia secuencial**. Las CPU y los compiladores reordenan instrucciones por rendimiento, y los lenguajes definen un **modelo de memoria** que dice qué reordenamientos son visibles entre hilos. Por eso un código concurrente que "parece correcto" leyendo línea por línea puede fallar.

## Inversión de prioridad: el caso Mars Pathfinder
En 1997, la sonda Mars Pathfinder se reiniciaba sola en Marte. La causa: una tarea de baja prioridad tenía un cerrojo que necesitaba una de alta prioridad, y una tarea de prioridad media le quitaba la CPU a la de baja, así que la de alta quedaba bloqueada indefinidamente y el sistema de vigilancia reiniciaba la sonda. Los ingenieros activaron a distancia la **herencia de prioridad** (la tarea que tiene el cerrojo hereda temporalmente la prioridad de quien lo espera) y el problema desapareció.

## Reglas prácticas
- Comparte lo menos posible; lo que compartas, que sea inmutable.
- Si necesitas cerrojos, mantén las secciones críticas cortas y adquiérelos siempre en el mismo orden.
- Prefiere estructuras ya probadas (colas concurrentes, transacciones de la base de datos) a inventar las tuyas.
- Prueba con carga real y con esperas aleatorias: las carreras aparecen solo cuando cambia la sincronización.`,
  checks: [
    ['¿Cuáles son las cuatro condiciones de Coffman y cuál es la más práctica de romper?', 'Exclusión mutua, retener y esperar, no expropiación y espera circular. La más práctica de romper es la espera circular, adquiriendo siempre los cerrojos en el mismo orden.'],
    ['Si JavaScript tiene un solo hilo, ¿por qué puede tener condiciones de carrera?', 'Porque las operaciones asíncronas se intercalan: entre leer un valor y escribirlo puede haber un await, y otra operación puede modificar el valor en ese intervalo.'],
    ['¿Cómo evitas en la base de datos que dos revisores reserven la misma unidad?', 'Con una actualización condicional atómica (UPDATE ... WHERE estado = libre) y comprobando las filas afectadas, o con una transacción y bloqueo de la fila.'],
    ['¿Qué es la inversión de prioridad y cómo se resolvió en Mars Pathfinder?', 'Una tarea de alta prioridad espera un cerrojo que tiene una de baja prioridad, a la que una de prioridad media le quita la CPU. Se resolvió activando la herencia de prioridad.'],
    ['¿Qué propone el proverbio de Go sobre compartir memoria?', 'No comunicarse compartiendo memoria, sino compartir memoria comunicándose: pasar datos por canales en lugar de que varios hilos modifiquen las mismas variables.']
  ],
  cites: ['Dijkstra, E. W. (1965). *Cooperating Sequential Processes* (EWD123). Universidad Técnica de Eindhoven.', 'Coffman, E., Elphick, M. y Shoshani, A. (1971). System Deadlocks. *ACM Computing Surveys*, 3(2).', 'Hoare, C. A. R. (1978). Communicating Sequential Processes. *Communications of the ACM*, 21(8).', 'Lamport, L. (1978). Time, Clocks, and the Ordering of Events in a Distributed System. *Communications of the ACM*, 21(7).', 'Herlihy, M. y Shavit, N. (2020). *The Art of Multiprocessor Programming* (2.ª ed.). Morgan Kaufmann.'],
  project: { t: 'Reservas concurrentes sin carreras',
    goal: 'Provocar, observar y corregir los problemas clásicos de concurrencia.',
    steps: ['Simula 100 operaciones asíncronas que reservan unidades con esperas aleatorias y demuestra que se reserva la misma unidad dos veces.', 'Corrígelo de dos formas: con una cola que serialice las reservas y con una operación atómica de "reservar si está libre".', 'Implementa los filósofos comensales con cerrojos, provoca el interbloqueo y corrígelo ordenando la adquisición.', 'Con Web Workers (o worker_threads en Node), SharedArrayBuffer y Atomics, suma un contador desde 4 hilos con y sin operaciones atómicas.', 'Mide el costo en tiempo de cada solución.'],
    deliver: 'El código de cada experimento, la evidencia del error antes de corregirlo y las mediciones.' },
  hito: ['Evita que dos revisores asignen la misma unidad: implementa en PatioApp una reserva atómica ("reservar si está libre") y una prueba con 100 asignaciones concurrentes.', 'Documenta en el README el orden de adquisición de recursos para evitar interbloqueos.']
});

X('m8.comp', {
  deep: `
## Una historia breve
Grace Hopper escribió en 1952 el sistema A-0, considerado el primer compilador, cuando la idea de que una máquina tradujera otro lenguaje parecía imposible. En 1957 el equipo de John Backus en IBM entregó el primer compilador de **Fortran**, que generaba código casi tan rápido como el escrito a mano y convenció a la industria de usar lenguajes de alto nivel. El libro de referencia, *Compilers: Principles, Techniques, and Tools* de Aho, Lam, Sethi y Ullman, es conocido como el "libro del dragón" por su portada. Aho y Ullman recibieron el Premio Turing en 2020 por sus contribuciones a los compiladores y algoritmos.

## Las fases, con más detalle
1. **Análisis léxico:** convierte caracteres en *tokens* (números, identificadores, operadores) usando expresiones regulares. Descarta espacios y comentarios.
2. **Análisis sintáctico:** organiza los tokens en un árbol según la gramática. Un **analizador descendente recursivo** tiene una función por cada regla de la gramática; Vaughan Pratt propuso en 1973 una técnica elegante para manejar la precedencia de operadores.
3. **Análisis semántico:** construye la **tabla de símbolos** (qué significa cada nombre en cada alcance) y comprueba tipos.
4. **Representación intermedia:** un código más simple que el fuente e independiente de la máquina. La forma **SSA** (asignación única estática), descrita por Cytron y sus coautores en 1991, en la que cada variable se asigna una sola vez, facilita muchas optimizaciones.
5. **Optimización:** plegado de constantes («3 * 4» se vuelve «12»), eliminación de código muerto, expansión en línea de funciones pequeñas, sacar de los bucles los cálculos que no cambian.
6. **Generación de código:** elegir instrucciones y **asignar registros**; Gregory Chaitin propuso en 1982 resolverlo como un problema de coloreo de grafos.
7. **Enlazado y carga:** unir los archivos compilados con las bibliotecas y colocar el programa en memoria.

## Un intérprete completo en pocas líneas
~~~js
function tokens(s) { return s.match(/\\d+(\\.\\d+)?|[-+*/()]/g) || []; }
function evaluar(s) {
  const t = tokens(s); let i = 0;
  const ver = () => t[i], tomar = () => t[i++];
  function expresion() { let v = termino(); while (ver() === '+' || ver() === '-') v = tomar() === '+' ? v + termino() : v - termino(); return v; }
  function termino() { let v = factor(); while (ver() === '*' || ver() === '/') v = tomar() === '*' ? v * factor() : v / factor(); return v; }
  function factor() {
    const x = tomar();
    if (x === '(') { const v = expresion(); if (tomar() !== ')') throw new Error('Falta )'); return v; }
    if (x === '-') return -factor();
    if (x === undefined || isNaN(x)) throw new Error('Se esperaba un número en la posición ' + i);
    return Number(x);
  }
  const r = expresion(); if (i < t.length) throw new Error('Sobra: ' + t[i]); return r;
}
console.log(evaluar('2 + 3 * (4 - 1)'), evaluar('-(2 + 3) * 2'));
~~~
Cada regla de la gramática («expresión → término ((+|−) término)*») es una función. La precedencia sale sola: «término» se resuelve antes que «expresión», así que la multiplicación se agrupa antes que la suma. Robert Nystrom construye dos intérpretes completos con esta técnica en *Crafting Interpreters* (2021).

## Cómo ejecuta V8 tu JavaScript
El motor V8 (Chrome y Node.js) primero **interpreta** el bytecode con su intérprete Ignition, mientras observa qué funciones se usan mucho y con qué tipos. Las funciones "calientes" se compilan con compiladores optimizadores (TurboFan, y otros niveles intermedios en versiones recientes) que **apuestan** a que los tipos no cambiarán. Si un día llamas a la misma función con un texto en lugar de un número, el motor **desoptimiza** y vuelve al bytecode. Por eso mantener los tipos estables ayuda al rendimiento.

## Recolección de basura
John McCarthy inventó la recolección automática de memoria para Lisp en 1959, con el algoritmo de **marcar y barrer**: se marca todo lo alcanzable desde las variables vivas y se libera el resto. El **conteo de referencias** (usado por Python y Swift) libera un objeto cuando nadie lo apunta, pero no detecta ciclos por sí solo. David Ungar observó en 1984 la **hipótesis generacional**: la mayoría de los objetos muere joven. Los recolectores modernos (V8, Java) separan la memoria en generaciones y revisan la joven con mucha frecuencia y poco costo.

## La confianza en el compilador
Ken Thompson, en su discurso del Premio Turing *Reflections on Trusting Trust* (1984), mostró que un compilador puede ser modificado para insertar una puerta trasera en ciertos programas y además en las nuevas versiones de sí mismo, de modo que revisar el código fuente no revela nada. La lección sigue vigente para la seguridad de la cadena de suministro de software: confías en todo lo que compila y ejecuta tu código.

## Herramientas que son compiladores
TypeScript (traduce a JavaScript y verifica tipos), Babel (traduce JavaScript moderno a uno más antiguo), ESLint y Prettier (analizan y reescriben el árbol de sintaxis), los motores de plantillas y SQL (el motor de la base de datos analiza la consulta, la optimiza y genera un plan). Saber cómo funciona un compilador te permite construir lenguajes de dominio propios, como un lenguaje de reglas o de filtros para tus usuarios.`,
  checks: [
    ['¿Qué hace el análisis léxico y qué el sintáctico?', 'El léxico convierte caracteres en tokens; el sintáctico organiza los tokens en un árbol según la gramática del lenguaje.'],
    ['En un analizador descendente recursivo, ¿por qué la multiplicación queda con mayor precedencia que la suma?', 'Porque la función de expresión llama a la de término, que se resuelve primero y agrupa las multiplicaciones antes de que expresión combine con sumas.'],
    ['¿Por qué cambiar el tipo de los argumentos de una función muy usada puede volver más lento un programa en V8?', 'Porque el compilador optimizador apostó a ciertos tipos; al cambiar, el motor desoptimiza la función y vuelve a ejecutarla en bytecode.'],
    ['¿Qué limitación tiene el conteo de referencias y cómo la resuelve marcar y barrer?', 'No libera ciclos de objetos que se apuntan entre sí sin que nadie más los use; marcar y barrer parte de las raíces y libera todo lo inalcanzable, incluidos los ciclos.'],
    ['¿Qué enseña "Reflections on Trusting Trust"?', 'Que un compilador comprometido puede insertar código malicioso que no aparece en ningún código fuente; la confianza en las herramientas de construcción es parte de la seguridad.']
  ],
  cites: ['Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.). Pearson.', 'Nystrom, R. (2021). *Crafting Interpreters*. Genever Benning. craftinginterpreters.com.', 'Pratt, V. (1973). Top Down Operator Precedence. *Proceedings of the 1st ACM POPL*.', 'McCarthy, J. (1960). Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I. *Communications of the ACM*, 3(4).', 'Thompson, K. (1984). Reflections on Trusting Trust. *Communications of the ACM*, 27(8).'],
  project: { t: 'Intérprete de un lenguaje de filtros',
    goal: 'Construir de punta a punta un lenguaje pequeño: gramática, analizador léxico, analizador sintáctico, árbol y evaluador.',
    steps: ['Escribe la gramática de consultas como «marca = "Toyota" y (km < 50000 o estado = "lista")».', 'Implementa el analizador léxico con posición (línea y columna) de cada token.', 'Implementa un analizador descendente recursivo que produzca un árbol de sintaxis y muéstralo como JSON.', 'Implementa un evaluador que aplique el árbol a una lista de unidades.', 'Agrega mensajes de error que señalen la posición exacta, y un optimizador que simplifique expresiones constantes.'],
    deliver: 'El intérprete, la gramática documentada y al menos 20 pruebas, incluidas consultas con errores.' },
  hito: ['Agrega a PatioApp un buscador avanzado con un mini lenguaje de consultas («marca = Toyota y km < 50000 o estado = lista») con analizador léxico, sintáctico y evaluador.', 'Haz que los errores de una consulta indiquen la posición exacta del problema.']
});
})();
