(function () {
var D = SDC.D;
SDC.XM('m8', { prof: true });

D('m8.os', `## Arranque: de encender a tu programa
Cuando presionas el botón de encendido, la CPU empieza a ejecutar un programa guardado en una memoria de la placa: el **firmware** (la BIOS en equipos antiguos, **UEFI** en los modernos). El firmware revisa el hardware, busca un disco de arranque y carga el **cargador de arranque** (GRUB en Linux, el Windows Boot Manager). Este carga el **núcleo** en memoria y le cede el control. El núcleo detecta los dispositivos, monta el sistema de archivos raíz e inicia el primer proceso de usuario (en Linux, «systemd», con identificador 1), que a su vez arranca los servicios y la pantalla de inicio de sesión. **Secure Boot** verifica la firma de cada eslabón de esta cadena, para que nadie inserte código antes que el sistema operativo.

## Controladores e interrupciones
El núcleo habla con el hardware a través de **controladores** (*drivers*): módulos que conocen los detalles de cada dispositivo (una tarjeta de red, un disco, la GPU) y ofrecen al resto del sistema una interfaz común. Los dispositivos avisan que terminaron algo mediante **interrupciones**: una señal eléctrica que hace que la CPU suspenda lo que está haciendo y ejecute el manejador correspondiente del núcleo. Así, la CPU no pierde tiempo preguntando cada microsegundo si llegó un paquete. Los controladores son el código más propenso a fallos del núcleo: un estudio de Andy Chou y otros (Stanford, 2001) encontró que los controladores de Linux tenían entre tres y siete veces más errores por línea que el resto del núcleo, y la gran mayoría de las pantallas azules de Windows se deben a controladores de terceros. En julio de 2024, una actualización defectuosa del controlador de seguridad de CrowdStrike, que corre en modo núcleo, dejó inutilizables unos 8,5 millones de equipos Windows en todo el mundo, desde aeropuertos hasta hospitales: un recordatorio de por qué lo que corre en el núcleo debe probarse con un rigor especial.

## Núcleos monolíticos y micronúcleos
Un **núcleo monolítico** (Linux, los BSD) ejecuta en modo núcleo el planificador, la memoria, los sistemas de archivos, la red y los controladores: es rápido porque todo se llama directamente, pero un error en cualquier parte puede tumbar el sistema. Un **micronúcleo** (MINIX 3, seL4, QNX) deja en el núcleo solo lo mínimo (planificación, memoria y comunicación entre procesos) y ejecuta el resto como procesos de usuario aislados: más robusto y seguro, a costa de más comunicación. En 1992, Andrew Tanenbaum y Linus Torvalds discutieron públicamente cuál era mejor, en un debate famoso en Usenet. La práctica terminó en un punto medio: Windows NT y macOS (XNU) son **híbridos**, y Linux carga controladores como módulos. **seL4** es notable por ser el primer núcleo de propósito general con una **prueba formal** de que su implementación cumple su especificación (2009).`);

D('m8.conc', `## Operaciones atómicas y estructuras sin bloqueo
Un candado resuelve las carreras, pero tiene costos: los hilos esperan, y si quien lo tiene se demora o muere, todos se detienen. El hardware ofrece instrucciones **atómicas** que leen, comparan y escriben una posición de memoria en un solo paso indivisible. La más importante es **compare-and-swap** (CAS): "si el valor actual es X, cámbialo por Y; si no, avísame". Con ella se construyen contadores y estructuras de datos **sin bloqueo** (*lock-free*): cada hilo intenta su cambio y, si otro se le adelantó, vuelve a leer y reintenta. Maurice Herlihy demostró en 1991 que CAS es **universal**: con ella se puede construir cualquier objeto concurrente sin bloqueo. En JavaScript, «Atomics» ofrece estas operaciones sobre memoria compartida entre *workers*:
~~~js
const memoria = new SharedArrayBuffer(4);
const contador = new Int32Array(memoria);
Atomics.add(contador, 0, 1);                                  // incremento atómico
const anterior = Atomics.compareExchange(contador, 0, 1, 10); // CAS: si vale 1, pon 10
console.log(anterior, Atomics.load(contador, 0));             // 1 10
~~~
Las estructuras sin bloqueo son difíciles de escribir bien (el **problema ABA**: el valor cambió de A a B y volvió a A, y CAS no lo nota), así que en la práctica se usan las que ofrecen las bibliotecas, como las colas concurrentes de Java.

## Patrones de concurrencia que se repiten
- **Productor-consumidor:** unos hilos generan trabajo y lo dejan en una cola con capacidad limitada; otros lo toman. La cola absorbe las diferencias de velocidad y, cuando se llena, frena a los productores (*backpressure*). Es la base de las colas de mensajes entre servicios.
- **Grupo de trabajadores** (*thread pool*): en lugar de crear un hilo por tarea, un número fijo de hilos toma tareas de una cola. Limita el uso de recursos; los servidores web y las bases de datos funcionan así.
- **Lectores y escritores:** muchos pueden leer a la vez, pero escribir requiere exclusividad («RWLock»).
- **Futuros y promesas:** un valor que estará disponible más tarde; permite componer operaciones asíncronas sin bloquear. Las promesas de JavaScript son exactamente esto.
- **Inmutabilidad y mensajes:** si nada se comparte mutable, no hay carreras. Erlang y el modelo de actores llevan esta idea al extremo, y por eso los sistemas de telefonía de Ericsson alcanzaron disponibilidades legendarias.

## Cómo se prueba la concurrencia
Los errores concurrentes dependen del orden en que se intercalan los hilos, que cambia en cada ejecución: una prueba puede pasar mil veces y fallar en la mil uno. Herramientas útiles: los **detectores de carreras** (ThreadSanitizer de Google, el «-race» de Go), que instrumentan el programa y avisan cuando dos hilos acceden a la misma memoria sin sincronización; las pruebas de **estrés**, que repiten la operación millones de veces con muchos hilos; y la **verificación de modelos** con herramientas como TLA+, que explora todos los intercalados posibles de un diseño (lo viste en métodos formales). Amazon Web Services encontró con TLA+ errores sutiles en DynamoDB y S3 que ninguna prueba había detectado.`);

D('m8.comp', `## Optimizaciones que hace el compilador por ti
Entre el análisis y la generación de código, los compiladores aplican decenas de transformaciones que preservan el significado del programa pero lo hacen más rápido. Las más comunes:
- **Plegado de constantes:** «60 * 60 * 24» se calcula al compilar y queda «86400».
- **Eliminación de código muerto:** lo que nunca se ejecuta o cuyo resultado no se usa, desaparece.
- **Expansión en línea** (*inlining*): reemplazar la llamada a una función pequeña por su cuerpo, ahorrando la llamada y abriendo la puerta a otras optimizaciones. Es la más importante de todas.
- **Optimización de bucles:** sacar del bucle los cálculos que no cambian, desenrollar iteraciones, vectorizar para que una instrucción procese varios datos a la vez (SIMD).
- **Asignación de registros:** decidir qué variables viven en los pocos registros de la CPU y cuáles en memoria; se modela como un problema de **coloreo de grafos** (Gregory Chaitin, 1981).
Para hacer posibles estas transformaciones, los compiladores traducen primero el programa a una **representación intermedia** (IR), como la de **LLVM** (Chris Lattner, 2003), que usan Clang, Rust, Swift y muchos otros: cada lenguaje solo escribe el paso de su sintaxis a la IR, y todos comparten las optimizaciones y los generadores de código para cada procesador. La forma **SSA** (*static single assignment*, en la que cada variable se asigna una sola vez) simplifica casi todos estos análisis.`);
})();
