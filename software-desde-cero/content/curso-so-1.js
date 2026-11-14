(function () {
var M = SDC.M, S = SDC.S;
M('so', { title: 'Sistemas Operativos', prof: true,
  desc: 'Curso completo sobre el software que administra la máquina: cómo el sistema operativo crea la ilusión de que cada programa tiene un procesador y una memoria para él solo (virtualización), cómo coordina tareas que ocurren a la vez (concurrencia) y cómo guarda datos que sobreviven a un apagón (persistencia). Se estudian procesos, hilos, planificación, sincronización, interbloqueos, memoria, memoria virtual, sistemas de archivos, virtualización y protección, con los algoritmos y los cálculos que se evalúan en un curso universitario.',
  thread: 'PatioApp se mira desde el sistema operativo: su servidor es un proceso con hilos, sus reportes se planifican como trabajos, el contador de espacios libres se protege contra condiciones de carrera, las fotos se guardan con escrituras atómicas y el servicio corre aislado en un contenedor con límites de recursos.',
  books: '*Operating Systems: Three Easy Pieces* (Remzi y Andrea Arpaci-Dusseau, libre en ostep.org), *Operating System Concepts* (Silberschatz, Galvin y Gagne), *Modern Operating Systems* (Tanenbaum y Bos), *The Linux Programming Interface* (Kerrisk).',
  uni: 'MIT 6.1810 (antes 6.S081, con el sistema xv6); Stanford CS140 y CS111; Berkeley CS162; CMU 15-410; UW-Madison CS537 (curso de los autores de OSTEP). En Perú: Sistemas Operativos (UNI, PUCP, UNMSM, UTEC, UPC).',
  capstone: { t: 'Mini sistema operativo simulado',
    goal: 'Construir un simulador que reúna lo esencial del curso: procesos, planificación, sincronización, memoria virtual y un sistema de archivos sencillo.',
    steps: ['Modela procesos con su PCB y sus estados, y un planificador intercambiable (FCFS, RR y MLFQ) con métricas de retorno, espera y respuesta.', 'Agrega semáforos y resuelve con ellos el productor-consumidor y la cena de los filósofos sin interbloqueos.', 'Implementa paginación con tabla de páginas, TLB y reemplazo LRU y reloj; reporta la tasa de fallos.', 'Implementa un sistema de archivos en memoria con inodos, directorios y bitmap de bloques libres.', 'Escribe un informe que compare los algoritmos con datos de tus simulaciones.'],
    deliver: 'El simulador con pruebas, los gráficos comparativos y el informe técnico.' } });

S('so', 'so.intro', { title: 'Qué es un sistema operativo y cómo se entra en él',
  ask: '¿Qué concepto del núcleo del sistema operativo se aplica?',
  lesson: `
> **La idea en simple.** Un sistema operativo es el administrador de un edificio de oficinas. Los programas son los inquilinos: cada uno cree tener el edificio para él solo, pero el administrador reparte el tiempo del ascensor (el procesador), las oficinas (la memoria) y los archivos del sótano (el disco), y no deja que un inquilino entre a la oficina de otro. Para pedir algo, el inquilino no rompe la puerta: llena un formulario en recepción. Ese formulario es la **llamada al sistema**.

## Tres ideas que lo explican todo
Remzi y Andrea Arpaci-Dusseau organizan su libro *Operating Systems: Three Easy Pieces* (OSTEP), usado en cientos de universidades, alrededor de tres piezas:
- **Virtualización:** convertir un recurso físico (un procesador, una memoria) en muchos recursos virtuales que parecen exclusivos de cada programa.
- **Concurrencia:** coordinar actividades que ocurren al mismo tiempo y comparten datos, sin que se estorben.
- **Persistencia:** guardar información de forma que sobreviva a fallas y apagones.
El sistema operativo cumple además dos papeles: **máquina extendida** (ofrece abstracciones cómodas como "archivo" o "proceso" en lugar de sectores de disco y registros) y **administrador de recursos** (reparte, protege y contabiliza).

## Un poco de historia
- **Procesamiento por lotes (años 50):** un operador cargaba trabajos uno tras otro; el procesador esperaba ocioso cada vez que un trabajo leía una cinta.
- **Multiprogramación (años 60):** varios trabajos en memoria; cuando uno espera entrada o salida, el procesador pasa a otro.
- **Tiempo compartido:** el sistema CTSS de Fernando Corbató, en el MIT (1961), repartía el procesador en turnos cortos entre usuarios conectados por terminales, y cada uno sentía que tenía la máquina para sí. Corbató recibió el Premio Turing en 1990.
- **Multics (1965):** proyecto del MIT, los Laboratorios Bell y General Electric, con ideas que aún usamos (sistema de archivos jerárquico, anillos de protección).
- **Unix (1969):** Ken Thompson y Dennis Ritchie, de los Laboratorios Bell, lo crearon tras salir de Multics y lo reescribieron en C en 1973. Su artículo *The UNIX Time-Sharing System* (1974) describe una filosofía de herramientas pequeñas que se combinan. Ambos recibieron el Premio Turing en 1983.
- **Linux (1991):** Linus Torvalds anunció el 25 de agosto de 1991 un núcleo "solo un pasatiempo". Hoy corre en la gran mayoría de los servidores de Internet, en Android y en todas las supercomputadoras de la lista TOP500.

## Modo usuario y modo núcleo
Si cualquier programa pudiera ejecutar cualquier instrucción, uno podría apagar las interrupciones, leer la memoria de otro o borrar el disco. Por eso el hardware tiene al menos dos **modos de ejecución**:
| Modo | Quién corre | Qué puede hacer |
| Usuario | las aplicaciones | solo instrucciones normales y su propia memoria |
| Núcleo (supervisor) | el sistema operativo | todo: instrucciones privilegiadas, toda la memoria, los dispositivos |
En x86 se habla de **anillos**: el núcleo corre en el anillo 0 y las aplicaciones en el 3. Las **instrucciones privilegiadas** (configurar la tabla de páginas, desactivar interrupciones, hablar directamente con un dispositivo) provocan una excepción si se ejecutan en modo usuario.

## Cómo se pasa al núcleo
Hay tres caminos, y los tres usan el mismo mecanismo: el hardware guarda el estado del programa, cambia a modo núcleo y salta a una dirección fija definida por el sistema operativo en la **tabla de vectores de interrupción**.
- **Interrupción:** un dispositivo avisa que terminó algo (llegó un paquete, se presionó una tecla) o el **temporizador** marca el fin de un turno. Es asíncrona: no la causa la instrucción en curso.
- **Excepción:** la instrucción en curso falló (división entre cero, acceso a una página no presente). Es síncrona.
- **Llamada al sistema:** el programa la pide a propósito con una instrucción especial («syscall» en x86-64, «ecall» en RISC-V), es decir, una excepción intencional llamada *trap*.
El temporizador es la pieza que garantiza que el sistema operativo recupere el control: aunque un programa entre en un bucle infinito, la interrupción del reloj lo devuelve al núcleo.

## Las llamadas al sistema
Linux ofrece unos cuantos cientos de llamadas al sistema: «open», «read», «write» y «close» para archivos; «fork», «execve», «wait» y «exit» para procesos; «mmap» para memoria; «socket» para redes. Los programas casi nunca las invocan directamente: usan la biblioteca estándar de C, que prepara los registros (el número de la llamada y sus argumentos) y ejecuta la instrucción de *trap*. La norma **POSIX** (IEEE 1003, desde 1988) define una interfaz común para que el mismo programa funcione en Linux, macOS y otros Unix.

Cada llamada tiene un costo: cambiar de modo, guardar y restaurar registros y validar los argumentos (el núcleo jamás debe confiar en un puntero que le pasa un programa). Por eso las bibliotecas usan **buffers**: «printf» acumula el texto y hace una sola llamada «write» cuando el buffer se llena, en vez de una por carácter.
~~~js
// Cuántas llamadas write hacen falta para escribir 1 MB según el tamaño del buffer
const total = 1024 * 1024;
for (const buffer of [1, 64, 4096, 65536]) {
  const llamadas = Math.ceil(total / buffer);
  console.log('buffer de', buffer, 'bytes →', llamadas, 'llamadas al sistema');
}
// Con un costo de ~0.1 µs extra por llamada, escribir byte a byte cuesta unos 100 ms solo en entradas al núcleo.
~~~
En Linux, la herramienta «strace» muestra todas las llamadas que hace un programa: «strace ls» revela decenas de llamadas para algo tan simple como listar un directorio.

## Cómo se organiza un núcleo
- **Monolítico:** todo el sistema operativo (planificador, memoria, sistemas de archivos, controladores) corre en modo núcleo en un solo programa grande. Es rápido porque las partes se llaman directamente, pero un error en un controlador puede tumbar todo. Linux y los BSD son monolíticos, aunque modulares: cargan módulos en tiempo de ejecución.
- **Micronúcleo:** el núcleo solo hace lo mínimo (espacios de direcciones, hilos, comunicación entre procesos); los sistemas de archivos y los controladores corren como procesos de usuario que se comunican por mensajes. Es más robusto y seguro, pero los mensajes cuestan. Ejemplos: Mach (Carnegie Mellon, años 80), L4 (Jochen Liedtke, 1993, que mostró que la comunicación podía ser muy rápida) y **seL4**, cuya corrección se demostró formalmente en 2009 (Gerwin Klein y otros).
- **Híbrido:** mezcla ambos. Windows NT y el núcleo XNU de macOS (Mach más partes de BSD) suelen describirse así.
En 1992, Andrew Tanenbaum, autor del sistema educativo MINIX, publicó en un foro el mensaje "LINUX is obsolete" criticando el diseño monolítico; Torvalds respondió defendiendo la practicidad. El debate sigue vivo: los micronúcleos dominan donde importa la seguridad (seL4 en sistemas críticos) y los monolíticos donde manda el rendimiento.

## El arranque
Al encender, el firmware (**UEFI** en las computadoras actuales, BIOS en las antiguas) inicializa el hardware, busca un cargador de arranque (como GRUB), que carga el núcleo en memoria. El núcleo configura la memoria, los dispositivos y las interrupciones, monta el sistema de archivos raíz y crea el primer proceso de usuario (PID 1, hoy normalmente **systemd** en Linux), del que descienden todos los demás.

## Ejemplo resuelto: ¿qué pasa cuando PatioApp lee un archivo?
El servidor de PatioApp ejecuta «fs.readFile('tarifas.json')» en Node.js.
1. Node llama a la biblioteca de C, que coloca en registros el número de la llamada «openat» y la ruta, y ejecuta «syscall».
2. El procesador cambia a modo núcleo y salta al manejador de llamadas; el núcleo valida la ruta, revisa permisos, busca el archivo y devuelve un **descriptor** (un número pequeño, por ejemplo 3).
3. Luego vienen «fstat» (tamaño), «read» (los bytes) y «close». Si los datos no están en la caché de páginas, el núcleo pide los bloques al disco y **bloquea** al proceso; el planificador ejecuta otro mientras tanto.
4. Cuando el disco termina, una **interrupción** avisa al núcleo, que copia los datos al buffer del programa, marca el proceso como listo y, en su turno, vuelve a modo usuario.
Cuatro llamadas al sistema, al menos dos cambios de proceso y una interrupción, para una línea de código. Por eso entender el sistema operativo explica por qué algunas operaciones "simples" son lentas.`,
  links: [['m8.os', 'esta unidad profundiza la introducción a los sistemas operativos del ciclo 3'], ['arq.io', 'las interrupciones y la entrada y salida son mecanismos del hardware que el sistema operativo aprovecha'], ['m7.cli', 'la terminal es la forma más directa de pedirle cosas al sistema operativo']],
  read: 'OSTEP, capítulos 2 y 6 (Limited Direct Execution); Silberschatz, capítulos 1 y 2; Ritchie y Thompson (1974).',
  terms: [
    ['Modo núcleo', 'modo de ejecución privilegiado en el que corre el sistema operativo con acceso a todo el hardware', ['Configurar la tabla de páginas solo se puede hacer aquí.', 'En x86 corresponde al anillo 0.', 'Un error aquí puede colgar toda la máquina.']],
    ['Llamada al sistema', 'petición que un programa hace al sistema operativo mediante una instrucción de trap para obtener un servicio privilegiado', ['open, read y write para usar archivos.', 'fork para crear un proceso.', 'strace muestra cuáles hace un programa.']],
    ['Interrupción', 'señal asíncrona de un dispositivo o del temporizador que hace que el procesador salte al núcleo', ['La tarjeta de red avisa que llegó un paquete.', 'El reloj marca el fin del turno de un proceso.', 'No la provoca la instrucción en curso.']],
    ['Excepción', 'transferencia síncrona al núcleo causada por la instrucción en curso', ['Una división entre cero.', 'Acceder a una página que no está en memoria.', 'Ejecutar una instrucción privilegiada en modo usuario.']],
    ['Instrucción privilegiada', 'instrucción que solo puede ejecutarse en modo núcleo', ['Desactivar las interrupciones.', 'Cambiar el registro que apunta a la tabla de páginas.', 'En modo usuario provoca una excepción.']],
    ['Núcleo monolítico', 'diseño en el que todo el sistema operativo corre en modo núcleo como un único programa', ['Linux es monolítico con módulos cargables.', 'Las partes se llaman directamente, lo que lo hace rápido.', 'Un controlador defectuoso puede tumbar todo.']],
    ['Micronúcleo', 'diseño que deja en el núcleo solo lo mínimo y ejecuta los demás servicios como procesos de usuario', ['seL4 tiene su corrección demostrada formalmente.', 'Los controladores se comunican por mensajes.', 'Es más robusto pero paga el costo de los mensajes.']],
    ['POSIX', 'norma IEEE que define una interfaz común de llamadas y utilidades para sistemas tipo Unix', ['Un programa POSIX compila en Linux y en macOS.', 'Define fork, pipe y las señales.', 'Se publicó por primera vez en 1988.']]
  ],
  q: [
    ['¿Qué garantiza que el sistema operativo recupere el control aunque un programa entre en un bucle infinito?', 'La interrupción del temporizador', ['La llamada al sistema exit', 'La caché de páginas', 'El cargador de arranque'], 'El reloj interrumpe periódicamente y devuelve el control al núcleo.', 2],
    ['Un programa divide entre cero. ¿Qué mecanismo lo lleva al núcleo?', 'Una excepción', ['Una interrupción de dispositivo', 'Una llamada al sistema', 'Un cambio de anillo voluntario'], 'Es síncrona: la causa la instrucción en curso.', 2],
    ['¿Por qué «printf» no hace una llamada al sistema por cada carácter?', 'Porque acumula el texto en un buffer y hace pocas llamadas write, que son costosas', ['Porque printf no usa el sistema operativo', 'Porque el disco no admite caracteres sueltos', 'Porque está prohibido por POSIX'], 'Cada entrada al núcleo cuesta; el buffer las reduce.', 3],
    ['¿Cuál es la ventaja principal de un micronúcleo?', 'Un fallo en un controlador no tumba todo el sistema, porque corre fuera del núcleo', ['Es siempre más rápido', 'No necesita modo núcleo', 'No usa llamadas al sistema'], 'Paga en rendimiento lo que gana en aislamiento.', 3],
    ['¿Qué tres piezas organizan el libro OSTEP?', 'Virtualización, concurrencia y persistencia', ['Procesos, hilos y archivos', 'Hardware, software y red', 'Seguridad, rendimiento y costo'], 'Arpaci-Dusseau, Operating Systems: Three Easy Pieces.', 2],
    ['¿Qué proceso tiene el PID 1 en la mayoría de las distribuciones Linux actuales?', 'systemd', ['bash', 'el núcleo', 'GRUB'], 'Es el primer proceso de usuario y ancestro de los demás.', 2],
    ['¿Por qué el núcleo no debe confiar en un puntero que recibe en una llamada al sistema?', 'Porque el programa podría pasarle una dirección del núcleo u otra inválida para leer o corromper memoria ajena', ['Porque los punteros no existen en modo núcleo', 'Porque es más lento', 'Porque POSIX lo prohíbe'], 'Validar argumentos es parte del costo de cada llamada.', 4],
    { tf: 'Una interrupción de dispositivo es síncrona con la instrucción que se está ejecutando.', v: false, e: 'Es asíncrona: llega cuando el dispositivo termina, sin relación con la instrucción en curso.', l: 2 },
    { tf: 'Ejecutar una instrucción privilegiada en modo usuario provoca una excepción.', v: true, e: 'Así el hardware protege al sistema.', l: 1 },
    { o: 'Ordena lo que ocurre en una llamada al sistema read.', s: ['La biblioteca coloca el número de llamada y los argumentos en registros', 'Se ejecuta la instrucción de trap', 'El procesador cambia a modo núcleo y salta al manejador', 'El núcleo valida los argumentos y realiza la operación', 'Se vuelve a modo usuario con el resultado'], e: 'El mismo patrón sirve para todas las llamadas.', l: 3 },
    { c: 'Escribe «llamadasWrite(bytes, buffer)»: cuántas llamadas write hacen falta para escribir esa cantidad de bytes si cada llamada envía como máximo un buffer completo.', f: 'llamadasWrite', p: ['bytes', 'buffer'], t: [[[10000, 4096], 3], [[0, 4096], 0], [[4096, 4096], 1], [[1048576, 1], 1048576]], sol: '  return Math.ceil(bytes / buffer);', l: 1 },
    { c: 'Escribe «tipoEntrada(evento)» que devuelva "interrupcion", "excepcion" o "llamada" para: "teclado", "temporizador", "red" (interrupción); "division por cero", "fallo de pagina", "instruccion privilegiada" (excepción); "read", "write", "fork" (llamada).', f: 'tipoEntrada', p: ['evento'], t: [[['teclado'], 'interrupcion'], [['fallo de pagina'], 'excepcion'], [['fork'], 'llamada'], [['temporizador'], 'interrupcion'], [['division por cero'], 'excepcion']], sol: '  if (["teclado", "temporizador", "red"].includes(evento)) return "interrupcion";\n  if (["division por cero", "fallo de pagina", "instruccion privilegiada"].includes(evento)) return "excepcion";\n  return "llamada";', l: 1 }
  ],
  gen: function (g) {
    var ev = [['Llegó un paquete por la tarjeta de red', 'Interrupción'], ['El programa ejecutó read para leer un archivo', 'Llamada al sistema'], ['El programa accedió a una dirección no válida', 'Excepción'], ['Se agotó el turno del proceso según el reloj', 'Interrupción'], ['El programa pidió crear un proceso con fork', 'Llamada al sistema'], ['Una instrucción intentó desactivar las interrupciones en modo usuario', 'Excepción'], ['El disco terminó de transferir un bloque', 'Interrupción'], ['El programa ejecutó la instrucción ecall de RISC-V', 'Llamada al sistema'], ['La instrucción dividió un entero entre cero', 'Excepción'], ['El usuario presionó una tecla', 'Interrupción']];
    ev.forEach(function (e) { g.mcq(2, '¿Por qué mecanismo entra el procesador al núcleo? ' + e[0], e[1], ['Interrupción', 'Excepción', 'Llamada al sistema'].filter(function (x) { return x !== e[1]; }).concat(['Ninguno: sigue en modo usuario']), 'Interrupción: asíncrona, de un dispositivo o del reloj; excepción: síncrona por error; llamada: trap intencional.'); });
    var nucl = [['Linux', 'Monolítico'], ['seL4', 'Micronúcleo'], ['Windows NT', 'Híbrido'], ['FreeBSD', 'Monolítico'], ['L4', 'Micronúcleo'], ['XNU de macOS', 'Híbrido'], ['MINIX 3', 'Micronúcleo']];
    nucl.forEach(function (n) { g.mcq(2, '¿Cómo suele clasificarse el núcleo de ' + n[0] + '?', n[1], ['Monolítico', 'Micronúcleo', 'Híbrido', 'Exonúcleo'].filter(function (x) { return x !== n[1]; }), 'Clasificación habitual en los textos de sistemas operativos.'); });
    g.times(8, function (R) { var kb = R.pick([1, 4, 16, 64, 256, 1024]), buf = R.pick([1, 512, 4096, 8192, 65536]), b = kb * 1024; g.input(2, '¿Cuántas llamadas write hacen falta para escribir ' + kb + ' KB con un buffer de ' + buf + ' bytes?', Math.ceil(b / buf), '⌈' + b + ' / ' + buf + '⌉.'); });
    var priv = [['Desactivar las interrupciones', true], ['Sumar dos registros', false], ['Cambiar el registro base de la tabla de páginas', true], ['Leer una variable propia en memoria', false], ['Escribir directamente en los puertos de un controlador de disco', true], ['Llamar a una función del propio programa', false]];
    priv.forEach(function (p) { g.tf(2, '«' + p[0] + '» es una instrucción u operación privilegiada.', p[1], p[1] ? 'Solo el núcleo puede hacerlo.' : 'Es una operación normal en modo usuario.'); });
  },
  checks: [
    ['¿Qué significa que el sistema operativo virtualice el procesador y la memoria?', 'Que convierte un procesador y una memoria físicos en muchos virtuales, de modo que cada programa cree tenerlos para sí solo.'],
    ['¿Por qué hacen falta dos modos de ejecución?', 'Para que solo el sistema operativo pueda ejecutar instrucciones peligrosas y acceder a toda la memoria y los dispositivos; así un programa no puede dañar a otros ni al sistema.'],
    ['Distingue interrupción, excepción y llamada al sistema.', 'La interrupción es asíncrona y viene de un dispositivo o del reloj; la excepción es síncrona por un error de la instrucción; la llamada al sistema es un trap intencional para pedir un servicio.'],
    ['Compara núcleo monolítico y micronúcleo con un ejemplo de cada uno.', 'El monolítico (Linux) corre todo en modo núcleo y es rápido pero menos aislado; el micronúcleo (seL4) deja servicios fuera del núcleo, es más robusto y paga el costo de los mensajes.'],
    ['Explica por qué los buffers reducen el costo de entrada y salida.', 'Porque agrupan muchas operaciones pequeñas en pocas llamadas al sistema, y cada llamada tiene un costo fijo de cambio de modo y validación.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*. Arpaci-Dusseau Books.', 'Silberschatz, A., Galvin, P. y Gagne, G. (2018). *Operating System Concepts* (10.ª ed.). Wiley.', 'Ritchie, D. y Thompson, K. (1974). The UNIX Time-Sharing System. *Communications of the ACM*, 17(7).', 'Klein, G. et al. (2009). seL4: Formal Verification of an OS Kernel. *SOSP 2009*.', 'Liedtke, J. (1993). Improving IPC by Kernel Design. *SOSP 1993*.', 'Corbató, F., Merwin-Daggett, M. y Daley, R. (1962). An Experimental Time-Sharing System. *AFIPS Spring Joint Computer Conference*.'],
  project: { t: 'Explorador de llamadas al sistema',
    goal: 'Ver con tus propios ojos cómo un programa conversa con el sistema operativo.',
    steps: ['En Linux (o WSL en Windows), ejecuta «strace -c» sobre tres programas (ls, un script de Python y un servidor de Node) y compara cuántas llamadas hace cada uno.', 'Escribe un programa en C que copie un archivo con buffers de 1, 512, 4096 y 65536 bytes, y mide el tiempo de cada versión.', 'Grafica el tiempo frente al tamaño del buffer y explica la curva con el costo de las llamadas al sistema.', 'Lee el código de una llamada al sistema simple en xv6 (por ejemplo, getpid) y describe el camino desde el trap hasta el retorno.', 'Escribe un informe de dos páginas con tus mediciones y conclusiones.'],
    deliver: 'Las salidas de strace, el programa, el gráfico y el informe.' },
  hito: ['Ejecuta el servidor de PatioApp con strace y lista las llamadas al sistema que hace al atender una petición (abrir archivos, leer, sockets).', 'Reduce las llamadas al sistema de PatioApp agrupando escrituras al registro de actividad con un buffer y mide la diferencia.']
});

S('so', 'so.proc', { title: 'Procesos: creación, estados y comunicación',
  ask: '¿Qué concepto sobre procesos se aplica?',
  lesson: `
> **La idea en simple.** Un programa es una receta escrita en un libro; un proceso es alguien cocinando esa receta en este momento, con sus ingredientes sobre la mesa, el horno a cierta temperatura y la página por la que va. La misma receta puede estar cocinándose en diez cocinas a la vez: un programa, diez procesos.

## Qué es un proceso
Un **proceso** es un programa en ejecución. Para el sistema operativo es una abstracción que incluye:
- Un **espacio de direcciones** propio: el código (sección de texto), los datos globales, el **montículo** (*heap*) que crece con las reservas dinámicas y la **pila** con las llamadas a funciones y variables locales.
- El estado del procesador: el contador de programa, el puntero de pila y los demás registros.
- Recursos del sistema: archivos abiertos (descriptores), directorio de trabajo, credenciales (usuario y grupo), señales pendientes.
Toda esa información se guarda en el **bloque de control de proceso** (PCB); en Linux es la estructura «task_struct», con cientos de campos. Cada proceso tiene un identificador numérico, el **PID**.

## Estados de un proceso
El modelo clásico de cinco estados:
| Estado | Significado |
| Nuevo | se está creando |
| Listo | puede ejecutarse y espera su turno de procesador |
| En ejecución | está usando el procesador |
| Bloqueado (en espera) | espera un evento: que termine una lectura de disco, que llegue un paquete, que pase un tiempo |
| Terminado | acabó, pero su PCB aún existe hasta que el padre recoja su estado |
Transiciones válidas: nuevo → listo; listo → en ejecución (el planificador lo elige); en ejecución → listo (se acabó su turno: **expropiación**); en ejecución → bloqueado (pidió algo que tarda); bloqueado → listo (llegó el evento); en ejecución → terminado. Un proceso bloqueado nunca pasa directo a ejecución: primero vuelve a la cola de listos.

## El cambio de contexto
Para pasar el procesador de un proceso A a uno B, el núcleo guarda los registros de A en su PCB, elige a B, carga sus registros y cambia el espacio de direcciones. Esto es el **cambio de contexto**. Su costo directo es del orden de microsegundos, pero el costo indirecto puede ser mayor: B encuentra las cachés y la TLB llenas de datos de A y sufre fallos hasta "calentarlas". Por eso los sistemas no cambian de proceso más seguido de lo necesario.

## Crear procesos en Unix: fork, exec y wait
Unix separa la creación de un proceso en dos llamadas, una decisión de diseño que resultó muy poderosa:
- **fork()** crea un hijo que es una copia casi exacta del padre: mismo código, misma memoria (copiada), mismos archivos abiertos. Se llama una vez y retorna dos veces: en el padre devuelve el PID del hijo y en el hijo devuelve 0.
- **exec()** (la familia «execve», «execvp», etcétera) reemplaza el programa del proceso actual por otro, conservando el PID y los archivos abiertos.
- **wait()** hace que el padre espere a que un hijo termine y recoja su código de salida.
Entre fork y exec, el hijo puede preparar su entorno: redirigir la salida a un archivo, cerrar descriptores, cambiar de directorio. Así funciona la terminal: para ejecutar «ls > lista.txt», el intérprete hace fork, en el hijo abre «lista.txt», lo pone como salida estándar y hace exec de «ls»; el padre hace wait.

Copiar toda la memoria en cada fork sería costoso; los sistemas modernos usan **copia en escritura** (*copy-on-write*): padre e hijo comparten las páginas marcadas como de solo lectura, y solo se copia una página cuando alguno intenta escribirla.

Si n procesos ejecutan fork en secuencia, la cantidad se duplica cada vez: tras n llamadas sucesivas (cada proceso existente ejecuta la siguiente), hay 2ⁿ procesos.
~~~js
// Simulación: cada proceso existente ejecuta fork(); el hijo recibe 0 y el padre el PID del hijo
let siguientePid = 101, procesos = [{ pid: 100, padre: null }];
function fork(p) { const hijo = { pid: siguientePid++, padre: p.pid }; procesos.push(hijo); return hijo; }
for (let ronda = 1; ronda <= 3; ronda++) {
  for (const p of [...procesos]) fork(p);
  console.log('tras el fork', ronda, '→', procesos.length, 'procesos');
}
console.log('árbol (pid ← padre):', procesos.map(p => p.pid + '←' + (p.padre ?? '-')).join(' '));
~~~

## Terminación: zombis y huérfanos
Cuando un proceso termina, el núcleo libera su memoria pero conserva su PCB con el código de salida hasta que el padre ejecute wait. Mientras tanto es un **zombi** (aparece como «Z» en «ps»). Si el padre nunca llama a wait, los zombis se acumulan y pueden agotar la tabla de procesos. Si el padre muere antes que el hijo, el hijo queda **huérfano** y es adoptado por el proceso 1 (o por un "subreaper" designado), que se encarga de recogerlo.

## Comunicación entre procesos
Los procesos no comparten memoria por defecto; ese aislamiento es una virtud, pero a veces necesitan cooperar. Mecanismos de **comunicación entre procesos** (IPC):
- **Tuberías** (*pipes*): un canal de bytes en un sentido entre procesos emparentados. Doug McIlroy propuso la idea y Ken Thompson la implementó en Unix en 1973; de ahí viene la notación «ls | grep txt | wc -l». Las **tuberías con nombre** (FIFO) permiten comunicar procesos sin parentesco.
- **Memoria compartida:** dos procesos mapean la misma región; es lo más rápido, pero exige sincronizar (lo verás en la unidad de sincronización).
- **Colas de mensajes:** mensajes discretos con el núcleo como intermediario.
- **Señales:** notificaciones asíncronas muy simples, como SIGINT (Ctrl+C), SIGTERM (pedido amable de terminar) o SIGKILL (terminación inmediata, que un proceso no puede capturar ni ignorar).
- **Sockets:** comunicación por red o, con sockets de dominio Unix, entre procesos de la misma máquina.
La elección depende de cuántos datos se mueven, si los procesos son parientes y si están en la misma máquina.

## Observar procesos en Linux
El núcleo publica información de cada proceso en el sistema de archivos virtual «/proc»: en «/proc/1234/status» está el estado del proceso 1234, su memoria y sus hilos; en «/proc/1234/fd» sus descriptores abiertos; en «/proc/1234/maps» su mapa de memoria con texto, montículo, pila y bibliotecas. Herramientas que lo usan:
- «ps aux» lista los procesos con su estado (R en ejecución o listo, S durmiendo, D en espera no interrumpible, Z zombi).
- «top» o «htop» muestran el consumo en vivo y el árbol de procesos.
- «pstree» dibuja la jerarquía padre-hijo desde el PID 1.
- «kill -TERM 1234» envía una señal; «kill -l» lista las disponibles.
Mirar estos datos mientras corre tu programa es la mejor forma de pasar de la teoría a la intuición.

## Procesos en la práctica
Los navegadores modernos usan **varios procesos**: Chrome separa cada sitio en su propio proceso de renderizado desde su lanzamiento en 2008, para que un sitio que se cuelga o es malicioso no afecte a los demás. Los servidores web como Apache usaban un proceso por conexión o un conjunto fijo de procesos trabajadores. En Node.js, el módulo «child_process» expone fork y exec, y el módulo «cluster» crea varios procesos que comparten un puerto para aprovechar varios núcleos.

## Ejemplo resuelto: el generador de reportes de PatioApp
El reporte mensual de PatioApp tarda 40 segundos y, mientras se genera, el servidor responde lento. Solución con procesos: el servidor hace fork (en Node, «child_process.fork») de un proceso generador y le envía por una tubería los parámetros del reporte. El hijo trabaja en su propio espacio de direcciones (si falla o se queda sin memoria, el servidor sigue vivo), escribe el PDF en disco y avisa por la tubería que terminó. El servidor recoge su estado de salida (si no lo hiciera, quedaría un zombi) y notifica al usuario. Ventajas: aislamiento de fallas y uso de otro núcleo. Costo: crear el proceso y copiar datos por la tubería, insignificante frente a 40 segundos.`,
  links: [['so.intro', 'fork, exec y wait son llamadas al sistema'], ['m8.conc', 'la memoria compartida entre procesos exige sincronización'], ['m7.cli', 'las tuberías de la terminal son comunicación entre procesos']],
  read: 'OSTEP, capítulos 4 y 5 (The Abstraction: The Process; Process API); Kerrisk, *The Linux Programming Interface*, capítulos 24 a 28 y 44.',
  terms: [
    ['Proceso', 'programa en ejecución con su propio espacio de direcciones, estado del procesador y recursos', ['Abrir dos veces el editor crea dos procesos.', 'Cada uno tiene su propio PID.', 'Un fallo en uno no corrompe la memoria del otro.']],
    ['Bloque de control de proceso', 'estructura del núcleo que guarda toda la información de un proceso', ['Contiene los registros guardados en un cambio de contexto.', 'En Linux se llama task_struct.', 'Incluye la lista de archivos abiertos.']],
    ['Cambio de contexto', 'operación de guardar el estado de un proceso y cargar el de otro para cederle el procesador', ['Ocurre cuando se agota el turno de un proceso.', 'Tiene costo directo y costo por enfriar las cachés.', 'Lo ejecuta el núcleo.']],
    ['fork', 'llamada al sistema que crea un proceso hijo como copia del padre y retorna dos veces', ['Devuelve 0 en el hijo y el PID del hijo en el padre.', 'Usa copia en escritura para no duplicar la memoria.', 'Tras tres llamadas sucesivas hay ocho procesos.']],
    ['exec', 'llamada al sistema que reemplaza el programa del proceso actual por otro, conservando su PID', ['La terminal hace fork y luego exec de ls.', 'Mantiene los archivos abiertos.', 'Si tiene éxito, no retorna.']],
    ['Proceso zombi', 'proceso terminado cuyo PCB sigue existiendo porque su padre no ha recogido su estado con wait', ['Aparece con estado Z en ps.', 'Si se acumulan, agotan la tabla de procesos.', 'Se elimina cuando el padre llama a wait.']],
    ['Tubería', 'canal de bytes en un solo sentido entre procesos, administrado por el núcleo', ['ls | wc -l conecta dos procesos.', 'McIlroy propuso la idea y Thompson la implementó en 1973.', 'Las tuberías con nombre comunican procesos no emparentados.']],
    ['Copia en escritura', 'técnica en que padre e hijo comparten páginas hasta que uno escribe, y solo entonces se copia esa página', ['Hace barato el fork.', 'Si el hijo hace exec enseguida, casi nada se copia.', 'Se implementa con páginas marcadas de solo lectura.']]
  ],
  q: [
    ['¿Qué devuelve fork() en el proceso hijo?', '0', ['El PID del padre', 'El PID del hijo', '−1'], 'El padre recibe el PID del hijo; −1 indica error.', 2],
    ['Un proceso en estado bloqueado recibe el evento que esperaba. ¿A qué estado pasa?', 'Listo', ['En ejecución', 'Terminado', 'Nuevo'], 'Vuelve a la cola de listos y espera su turno.', 2],
    ['Un programa ejecuta fork() cuatro veces seguidas y cada proceso existente ejecuta las siguientes. ¿Cuántos procesos hay al final?', '16', ['4', '5', '8'], '2⁴ = 16.', 3],
    ['¿Qué es un proceso huérfano?', 'Un proceso cuyo padre terminó antes que él y que adopta el proceso 1', ['Un proceso terminado que nadie recogió', 'Un proceso sin archivos abiertos', 'Un proceso sin PID'], 'El zombi es otro caso: terminó y su padre no hizo wait.', 3],
    ['¿Por qué Unix separa fork y exec en dos llamadas?', 'Para que el hijo pueda preparar su entorno (redirecciones, descriptores) antes de cargar el nuevo programa', ['Porque el hardware lo exige', 'Para ahorrar memoria', 'Porque exec es más antiguo'], 'Así la terminal implementa redirecciones y tuberías.', 4],
    ['¿Qué señal no puede ser capturada ni ignorada por un proceso?', 'SIGKILL', ['SIGTERM', 'SIGINT', 'SIGUSR1'], 'Garantiza que el sistema siempre pueda terminar un proceso.', 3],
    ['¿Qué mecanismo de comunicación entre procesos es el más rápido para mover grandes volúmenes de datos?', 'Memoria compartida', ['Señales', 'Tuberías con nombre', 'Archivos temporales'], 'No copia datos a través del núcleo, pero exige sincronización.', 3],
    { tf: 'Un proceso bloqueado puede pasar directamente al estado en ejecución cuando llega su evento.', v: false, e: 'Pasa primero a listo; el planificador decide cuándo ejecutarlo.', l: 2 },
    { tf: 'Gracias a la copia en escritura, fork no copia toda la memoria del padre al instante.', v: true, e: 'Solo copia las páginas que alguno de los dos modifica.', l: 2 },
    { o: 'Ordena lo que hace la terminal al ejecutar «ls > lista.txt».', s: ['La terminal ejecuta fork', 'El hijo abre lista.txt', 'El hijo pone ese archivo como salida estándar', 'El hijo ejecuta exec de ls', 'La terminal espera con wait'], e: 'Las redirecciones ocurren entre fork y exec.', l: 3 },
    { c: 'Escribe «transicionValida(de, a)» con los estados "nuevo", "listo", "ejecucion", "bloqueado" y "terminado" según el modelo de cinco estados.', f: 'transicionValida', p: ['de', 'a'], t: [[['nuevo', 'listo'], true], [['bloqueado', 'ejecucion'], false], [['ejecucion', 'bloqueado'], true], [['listo', 'bloqueado'], false], [['ejecucion', 'listo'], true], [['ejecucion', 'terminado'], true]], sol: '  const v = { nuevo: ["listo"], listo: ["ejecucion"], ejecucion: ["listo", "bloqueado", "terminado"], bloqueado: ["listo"], terminado: [] };\n  return (v[de] || []).includes(a);', l: 2 },
    { c: 'Escribe «procesosTrasForks(n)»: cuántos procesos existen si un proceso inicial ejecuta n llamadas fork sucesivas y cada proceso existente ejecuta todas las que siguen.', f: 'procesosTrasForks', p: ['n'], t: [[[0], 1], [[1], 2], [[3], 8], [[10], 1024]], sol: '  return Math.pow(2, n);', l: 1 },
    { c: 'Escribe «zombis(procesos)»: cada proceso es {pid, terminado, recogido}; devuelve la lista de PID que son zombis (terminados y no recogidos), en el mismo orden.', f: 'zombis', p: ['procesos'], t: [[[[{ pid: 1, terminado: false, recogido: false }, { pid: 2, terminado: true, recogido: false }, { pid: 3, terminado: true, recogido: true }]], [2]], [[[]], []]], sol: '  return procesos.filter(p => p.terminado && !p.recogido).map(p => p.pid);', l: 2 }
  ],
  gen: function (g) {
    var tr = [['nuevo', 'listo', true], ['listo', 'ejecución', true], ['ejecución', 'listo', true], ['ejecución', 'bloqueado', true], ['bloqueado', 'listo', true], ['ejecución', 'terminado', true], ['bloqueado', 'ejecución', false], ['listo', 'bloqueado', false], ['nuevo', 'ejecución', false], ['terminado', 'listo', false], ['listo', 'terminado', false]];
    tr.forEach(function (t) { g.tf(2, 'En el modelo de cinco estados, un proceso puede pasar de «' + t[0] + '» a «' + t[1] + '».', t[2], t[2] ? 'Es una transición válida.' : 'No es válida: revisa el diagrama de estados.'); });
    g.times(6, function (R) { var n = R.int(1, 8); g.input(2, 'Un proceso ejecuta ' + n + ' llamadas fork sucesivas y cada proceso existente ejecuta las siguientes. ¿Cuántos procesos hay al final?', Math.pow(2, n), '2^' + n + '.'); });
    var ipc = [['Pasar la salida de un programa como entrada de otro en la terminal', 'Tubería'], ['Dos procesos analizan juntos una imagen de 2 GB sin copiarla', 'Memoria compartida'], ['Pedir a un servidor que relea su configuración sin reiniciarlo', 'Señal'], ['Comunicar un proceso de la máquina A con otro de la máquina B', 'Socket'], ['Avisar a un proceso que el usuario presionó Ctrl+C', 'Señal'], ['Comunicar dos procesos no emparentados con un canal de bytes en el sistema de archivos', 'Tubería con nombre']];
    ipc.forEach(function (x) { g.mcq(3, '¿Qué mecanismo de comunicación entre procesos conviene? ' + x[0], x[1], ['Tubería', 'Memoria compartida', 'Señal', 'Socket', 'Tubería con nombre'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Cada mecanismo encaja con un patrón de comunicación distinto.'); });
    var ret = [['en el padre', 'El PID del hijo'], ['en el hijo', '0'], ['si falla', '−1']];
    ret.forEach(function (r) { g.mcq(2, '¿Qué devuelve fork() ' + r[0] + '?', r[1], ['El PID del hijo', '0', '−1', 'El PID del padre'].filter(function (x) { return x !== r[1]; }), 'fork se llama una vez y retorna dos veces.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre programa y proceso?', 'El programa es el archivo con instrucciones; el proceso es una ejecución de ese programa con su memoria, sus registros y sus recursos.'],
    ['Dibuja de memoria el diagrama de cinco estados y nombra cada transición.', 'Nuevo → listo (admitido); listo → ejecución (planificado); ejecución → listo (expropiado); ejecución → bloqueado (espera evento); bloqueado → listo (evento ocurre); ejecución → terminado (sale).'],
    ['Explica cómo la terminal implementa «ls > lista.txt» con fork, exec y wait.', 'Hace fork; el hijo abre el archivo y lo pone como salida estándar, luego exec de ls; el padre espera con wait.'],
    ['¿Qué es un zombi y cómo se evita que se acumulen?', 'Un proceso terminado cuyo padre no recogió su estado; se evita llamando a wait (o manejando SIGCHLD) en el padre.'],
    ['¿Por qué Chrome usa un proceso por sitio?', 'Para aislar fallas y ataques: si un sitio se cuelga o es malicioso, no puede afectar la memoria de los otros procesos.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 4 y 5.', 'Kerrisk, M. (2010). *The Linux Programming Interface*. No Starch Press.', 'Ritchie, D. (1984). The Evolution of the Unix Time-sharing System. *AT&T Bell Laboratories Technical Journal*, 63(8).', 'Reis, C. y Gribble, S. (2009). Isolating Web Programs in Modern Browser Architectures. *EuroSys 2009*.', 'Tanenbaum, A. y Bos, H. (2014). *Modern Operating Systems* (4.ª ed.). Pearson.'],
  project: { t: 'Una terminal mínima',
    goal: 'Construir un intérprete de comandos para entender fork, exec, wait, redirecciones y tuberías.',
    steps: ['En C (Linux o WSL), lee una línea, sepárala en palabras y ejecútala con fork, execvp y waitpid.', 'Agrega redirección de salida con «>» usando open y dup2 entre fork y exec.', 'Agrega una tubería entre dos comandos con «|» usando pipe y dup2.', 'Maneja Ctrl+C para que mate al hijo pero no a tu terminal, y evita zombis en procesos en segundo plano con «&».', 'Escribe pruebas con comandos de ejemplo y documenta cada llamada al sistema que usas.'],
    deliver: 'El código de la terminal, sus pruebas y un documento que explique el flujo de cada función.' },
  hito: ['Mueve la generación del reporte mensual de PatioApp a un proceso hijo comunicado por tubería, para que el servidor siga respondiendo.', 'Asegura que el servidor de PatioApp recoja el estado de cada proceso hijo (sin zombis) y que un fallo del hijo se reporte sin tumbar el servidor.']
});

S('so', 'so.threads', { title: 'Hilos y modelos de concurrencia',
  ask: '¿Qué concepto sobre hilos y concurrencia se aplica?',
  lesson: `
> **La idea en simple.** Si un proceso es una cocina con su cocinero, los hilos son varios cocineros en la misma cocina: comparten la despensa, los utensilios y la receta, pero cada uno va por un paso distinto y tiene su propia tabla de picar. Trabajan más rápido juntos, a condición de no chocar por el mismo cuchillo.

## Qué es un hilo
Un **hilo** (*thread*) es una secuencia de ejecución dentro de un proceso. Todos los hilos de un proceso comparten:
- El código, los datos globales y el montículo.
- Los archivos abiertos y demás recursos del proceso.
Cada hilo tiene lo suyo:
- Su **contador de programa** y sus registros.
- Su **pila**, con sus llamadas y variables locales.
- Un identificador y, opcionalmente, **almacenamiento local de hilo** (variables globales que en realidad tienen una copia por hilo).
Como comparten memoria, comunicarse entre hilos es tan simple como leer y escribir una variable; esa misma facilidad es la fuente de los errores más difíciles de la programación: las **condiciones de carrera**.

## Por qué usar hilos
- **Paralelismo:** en una máquina con varios núcleos, varios hilos del mismo proceso corren a la vez.
- **Evitar bloqueos:** mientras un hilo espera una lectura de disco o de red, otro sigue trabajando. Una interfaz gráfica responde mientras otro hilo descarga un archivo.
- **Economía:** crear un hilo es más barato que crear un proceso (no hay que crear un espacio de direcciones), y cambiar entre hilos del mismo proceso es más barato porque no se cambia la tabla de páginas.
La interfaz estándar en sistemas tipo Unix es **POSIX threads** (pthreads): «pthread_create» crea un hilo que ejecuta una función, «pthread_join» espera a que termine. En Linux, hilos y procesos son la misma abstracción interna (tareas) creada con la llamada «clone», que permite elegir qué se comparte.

## Hilos de usuario y de núcleo
¿Quién sabe que existen los hilos? Hay tres modelos:
| Modelo | Descripción | Ventajas | Desventajas |
| N:1 (hilos de usuario) | una biblioteca crea muchos hilos sobre un solo hilo del núcleo | cambiar de hilo es rapidísimo | si uno se bloquea en el núcleo, se bloquean todos; no aprovecha varios núcleos |
| 1:1 | cada hilo es un hilo del núcleo | paralelismo real; un bloqueo no afecta a los demás | crear y cambiar cuesta una llamada al sistema |
| M:N | M hilos de usuario repartidos sobre N hilos del núcleo | combina ambas ventajas | planificación en dos niveles, compleja |
Linux (con la biblioteca NPTL desde 2003) y Windows usan 1:1. Go usa M:N: sus **goroutines** son muy livianas (empiezan con una pila de pocos kilobytes) y su planificador las reparte sobre unos pocos hilos del sistema; un programa puede tener cientos de miles. Erlang hace algo similar con sus procesos ligeros. Java introdujo en 2023 los **hilos virtuales** con el mismo espíritu.

## Concurrencia no es lo mismo que paralelismo
La **concurrencia** es la propiedad de un programa de tener varias tareas en curso que avanzan intercaladas; el **paralelismo** es ejecutarlas literalmente al mismo tiempo en varios núcleos. Un programa concurrente puede correr en un solo núcleo (el sistema alterna los hilos); el paralelismo requiere varios. Los errores de concurrencia aparecen incluso en un solo núcleo, porque el sistema puede interrumpir a un hilo en cualquier instrucción.

## El problema central: intercalaciones
Considera dos hilos que ejecutan «contador = contador + 1» un millón de veces cada uno. Esa línea no es atómica: se traduce en leer el contador a un registro, sumarle 1 y escribirlo de vuelta. Si el hilo A lee 41, lo interrumpen, el hilo B lee 41, suma y escribe 42, y luego A suma y escribe 42, se perdió un incremento. El resultado final suele ser menor que dos millones y cambia en cada ejecución. Esa es una **condición de carrera**: el resultado depende del orden en que se intercalan las instrucciones. La porción de código que accede a datos compartidos es una **sección crítica**, y la unidad de sincronización estudia cómo protegerla.
~~~js
// Simulación de una condición de carrera: dos "hilos" que hacen leer → sumar → escribir intercalados al azar
function ejecutar(semilla) {
  let contador = 0, x = semilla;
  const azar = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const hilos = [{ pasos: 0, reg: 0, fase: 0 }, { pasos: 0, reg: 0, fase: 0 }], N = 1000;
  while (hilos.some(h => h.pasos < N)) {
    const h = hilos[azar() < 0.5 ? 0 : 1]; if (h.pasos >= N) continue;
    if (h.fase === 0) { h.reg = contador; h.fase = 1; }          // leer
    else if (h.fase === 1) { h.reg = h.reg + 1; h.fase = 2; }    // sumar
    else { contador = h.reg; h.fase = 0; h.pasos++; }            // escribir
  }
  return contador;
}
for (const s of [1, 2, 3]) console.log('ejecución', s, '→ contador =', ejecutar(s), '(se esperaba 2000)');
~~~

## Hilos o eventos
John Ousterhout dio en 1996 una charla titulada *Why Threads Are A Bad Idea (for most purposes)*: argumentó que los hilos son difíciles de programar bien y que, para muchas aplicaciones, un modelo **orientado a eventos** es más sencillo: un solo hilo con un **bucle de eventos** que atiende, uno por uno, los eventos listos (llegó una petición, terminó una lectura), sin bloquearse nunca. En 2003, Rob von Behren, Jeremy Condit y Eric Brewer respondieron con *Why Events Are A Bad Idea (for high-concurrency servers)*, mostrando que con buenas implementaciones los hilos escalan igual y el código es más fácil de seguir. Edward Lee, de Berkeley, escribió en 2006 *The Problem with Threads*: los hilos descartan el determinismo y obligan al programador a podarlo con bloqueos, lo que vuelve los programas muy difíciles de razonar.

En la práctica coexisten ambos:
- **Node.js** usa un bucle de eventos en un hilo principal (la biblioteca libuv) y un conjunto de hilos auxiliares para operaciones del sistema de archivos; para cálculo pesado ofrece **worker threads** que no comparten memoria por defecto, sino que se comunican por mensajes.
- El navegador hace lo mismo con los **Web Workers** (esta plataforma ejecuta tu código en uno).
- Los servidores de alta concurrencia usan **conjuntos de hilos** (*thread pools*): un número fijo de hilos toma tareas de una cola, evitando crear y destruir hilos por cada petición. El problema C10K, planteado por Dan Kegel en 1999 (atender diez mil conexiones simultáneas), impulsó estas técnicas y las interfaces de eventos como epoll en Linux.

## Cuántos hilos usar
- Para trabajo **de cálculo**, más hilos que núcleos no ayuda: se pierde tiempo en cambios de contexto. Un hilo por núcleo es el punto de partida.
- Para trabajo **de entrada y salida**, conviene tener más hilos que núcleos, porque la mayoría del tiempo están esperando. Una regla práctica de Brian Goetz en *Java Concurrency in Practice* (2006) es: hilos ≈ núcleos × (1 + tiempo de espera / tiempo de cálculo).
- Cada hilo consume memoria para su pila (en Linux suele reservarse un espacio virtual de varios megabytes por hilo), lo que limita cuántos hilos del núcleo son razonables.

## Ejemplo resuelto: procesar las fotos de PatioApp
Cada día llegan 8000 fotos de inspección que hay que redimensionar (cálculo) y subir a un almacenamiento en la nube (espera de red). El servidor tiene 4 núcleos. Diseño: un conjunto de 4 hilos de cálculo para redimensionar (un hilo por núcleo) y, para la subida, un modelo de eventos con operaciones asíncronas que no bloquean, porque cada subida pasa el 95% del tiempo esperando la red. Con la regla de Goetz, si se usaran hilos para subir, convendrían unos 4 × (1 + 95/5) = 80. El contador de fotos procesadas, compartido entre los hilos, se actualiza con una operación atómica para evitar la condición de carrera que viste arriba.`,
  links: [['so.proc', 'los hilos son flujos de ejecución dentro de un proceso'], ['m9.async', 'el bucle de eventos y las promesas son la alternativa a los hilos en JavaScript'], ['plat.parallel', 'el paralelismo con muchos núcleos se construye sobre hilos']],
  read: 'OSTEP, capítulos 26 y 27 (Concurrency: An Introduction; Thread API); Lee (2006); Goetz, *Java Concurrency in Practice*, capítulos 1 y 8.',
  terms: [
    ['Hilo', 'secuencia de ejecución dentro de un proceso con su propio contador de programa, registros y pila, que comparte la memoria del proceso', ['Un navegador descarga en un hilo mientras otro dibuja.', 'Se crea con pthread_create.', 'Comparte el montículo con los demás hilos del proceso.']],
    ['Condición de carrera', 'error en el que el resultado depende del orden en que se intercalan hilos que acceden a datos compartidos', ['Dos hilos incrementan un contador y se pierden sumas.', 'El resultado cambia en cada ejecución.', 'Ocurre incluso en un solo núcleo.']],
    ['Sección crítica', 'parte del código que accede a datos compartidos y no debe ejecutarse por más de un hilo a la vez', ['La línea que actualiza el saldo de una cuenta.', 'Se protege con un candado.', 'Debe ser lo más corta posible.']],
    ['Modelo 1:1', 'modelo en el que cada hilo del programa corresponde a un hilo del núcleo', ['Linux con NPTL y Windows lo usan.', 'Un hilo bloqueado no detiene a los demás.', 'Crear un hilo requiere una llamada al sistema.']],
    ['Modelo M:N', 'modelo que reparte muchos hilos de usuario sobre unos pocos hilos del núcleo', ['Las goroutines de Go.', 'Permite cientos de miles de tareas livianas.', 'Exige un planificador en el espacio de usuario.']],
    ['Bucle de eventos', 'ciclo de un solo hilo que atiende eventos listos uno por uno sin bloquearse', ['El núcleo de Node.js.', 'Cada manejador debe terminar rápido.', 'Ousterhout lo defendió frente a los hilos en 1996.']],
    ['Conjunto de hilos', 'grupo fijo de hilos que toman tareas de una cola para evitar crear un hilo por cada tarea', ['Un servidor con 16 hilos atiende miles de peticiones.', 'Limita el consumo de memoria.', 'Se dimensiona según la proporción de espera y cálculo.']],
    ['Almacenamiento local de hilo', 'variables que tienen una copia independiente para cada hilo', ['errno tiene un valor distinto en cada hilo.', 'Evita compartir un contador temporal.', 'Se declara con thread_local en C++.']]
  ],
  q: [
    ['¿Qué comparten dos hilos del mismo proceso?', 'El montículo, los datos globales y los archivos abiertos', ['La pila', 'El contador de programa', 'Los registros'], 'Cada hilo tiene su propia pila y sus propios registros.', 2],
    ['En el modelo N:1, ¿qué pasa si un hilo hace una llamada al sistema que bloquea?', 'Se bloquean todos los hilos del proceso', ['Solo se bloquea ese hilo', 'El sistema crea otro hilo del núcleo', 'Se cancela la llamada'], 'El núcleo solo ve un hilo.', 3],
    ['Dos hilos ejecutan contador++ un millón de veces cada uno sin sincronizar. ¿Qué es lo más probable?', 'Que el resultado sea menor que dos millones y cambie entre ejecuciones', ['Exactamente dos millones', 'Un error de compilación', 'Exactamente un millón'], 'Leer, sumar y escribir pueden intercalarse.', 3],
    ['Para un trabajo de cálculo puro en una máquina de 8 núcleos, ¿cuántos hilos conviene usar como punto de partida?', '8', ['1', '64', '1000'], 'Más hilos que núcleos solo agrega cambios de contexto.', 2],
    ['Según la regla de Goetz, con 4 núcleos y tareas que esperan 90 ms por cada 10 ms de cálculo, ¿cuántos hilos conviene?', '40', ['4', '10', '400'], '4 × (1 + 90/10) = 40.', 4],
    ['¿Qué modelo usan las goroutines de Go?', 'M:N', ['1:1', 'N:1', 'Un proceso por goroutine'], 'El planificador de Go reparte goroutines sobre pocos hilos del sistema.', 3],
    ['¿Qué argumentó Edward Lee en The Problem with Threads (2006)?', 'Que los hilos descartan el determinismo y vuelven los programas muy difíciles de razonar', ['Que los hilos son siempre más lentos que los procesos', 'Que el hardware no admite hilos', 'Que los hilos no sirven en servidores'], 'El programador tiene que podar el no determinismo con bloqueos.', 4],
    { tf: 'Las condiciones de carrera solo pueden ocurrir en máquinas con varios núcleos.', v: false, e: 'En un solo núcleo, el sistema puede interrumpir un hilo entre leer y escribir.', l: 2 },
    { tf: 'Cambiar entre dos hilos del mismo proceso suele ser más barato que cambiar entre dos procesos.', v: true, e: 'No hace falta cambiar el espacio de direcciones.', l: 2 },
    { c: 'Escribe «dividirTrabajo(n, k)»: reparte los índices 0..n−1 en k rangos contiguos [inicio, fin) lo más parejos posible, con los rangos más grandes primero.', f: 'dividirTrabajo', p: ['n', 'k'], t: [[[10, 3], [[0, 4], [4, 7], [7, 10]]], [[4, 4], [[0, 1], [1, 2], [2, 3], [3, 4]]], [[5, 1], [[0, 5]]], [[7, 2], [[0, 4], [4, 7]]]], sol: '  const base = Math.floor(n / k), resto = n % k, r = [];\n  let i = 0;\n  for (let j = 0; j < k; j++) { const t = base + (j < resto ? 1 : 0); r.push([i, i + t]); i += t; }\n  return r;', l: 3 },
    { c: 'Escribe «hilosRecomendados(nucleos, espera, calculo)» con la regla núcleos × (1 + espera/cálculo), redondeada hacia arriba.', f: 'hilosRecomendados', p: ['nucleos', 'espera', 'calculo'], t: [[[4, 90, 10], 40], [[8, 0, 10], 8], [[2, 5, 10], 3]], sol: '  return Math.ceil(nucleos * (1 + espera / calculo));', l: 2 }
  ],
  gen: function (g) {
    var comp = [['La pila', 'Propia de cada hilo'], ['El montículo', 'Compartido por los hilos del proceso'], ['Los registros del procesador', 'Propia de cada hilo'], ['Los archivos abiertos', 'Compartido por los hilos del proceso'], ['Las variables globales', 'Compartido por los hilos del proceso'], ['El contador de programa', 'Propia de cada hilo'], ['El código del programa', 'Compartido por los hilos del proceso'], ['Una variable declarada thread_local', 'Propia de cada hilo']];
    comp.forEach(function (c) { g.mcq(2, '¿Cómo es este elemento en un proceso con varios hilos? ' + c[0], c[1], [c[1] === 'Propia de cada hilo' ? 'Compartido por los hilos del proceso' : 'Propia de cada hilo', 'Compartido con otros procesos', 'Solo existe en modo núcleo'], 'Los hilos comparten el espacio de direcciones y los recursos; cada uno tiene su estado de ejecución.'); });
    g.times(8, function (R) { var n = R.pick([2, 4, 8, 16]), c = R.pick([5, 10, 20]), w = c * R.int(0, 9); g.input(3, 'Con ' + n + ' núcleos, tareas que calculan ' + c + ' ms y esperan ' + w + ' ms, ¿cuántos hilos recomienda la regla núcleos × (1 + espera/cálculo)?', Math.ceil(n * (1 + w / c)), n + ' × (1 + ' + w + '/' + c + ').'); });
    var mods = [['Las goroutines de Go', 'M:N'], ['Los hilos de Linux con NPTL', '1:1'], ['Una biblioteca antigua de hilos verdes sobre un solo hilo del núcleo', 'N:1'], ['Los hilos de Windows', '1:1'], ['Los procesos ligeros de Erlang', 'M:N']];
    mods.forEach(function (m) { g.mcq(3, '¿Qué modelo de hilos corresponde? ' + m[0], m[1], ['1:1', 'N:1', 'M:N', 'Un proceso por hilo'].filter(function (x) { return x !== m[1]; }), 'N:1 hilos de usuario; 1:1 hilos del núcleo; M:N combinación.'); });
  },
  checks: [
    ['¿Qué tiene cada hilo propio y qué comparte con los demás hilos de su proceso?', 'Propio: contador de programa, registros y pila; compartido: código, datos globales, montículo y archivos abiertos.'],
    ['Explica con un ejemplo por qué contador++ no es seguro entre hilos.', 'Porque son tres pasos (leer, sumar, escribir); si dos hilos leen el mismo valor antes de escribir, se pierde un incremento.'],
    ['Compara los modelos N:1, 1:1 y M:N.', 'N:1 es rápido pero no da paralelismo y un bloqueo detiene a todos; 1:1 da paralelismo real con costo de llamadas; M:N combina ambas con un planificador más complejo.'],
    ['¿Cuándo conviene un bucle de eventos en lugar de hilos?', 'Cuando la mayoría del trabajo es esperar entrada y salida y cada evento se atiende rápido; se evitan los bloqueos y las condiciones de carrera.'],
    ['¿Cuántos hilos usarías para cálculo puro y cuántos para entrada y salida?', 'Para cálculo, aproximadamente uno por núcleo; para entrada y salida, más, según la proporción entre espera y cálculo.']
  ],
  cites: ['Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2018). *Operating Systems: Three Easy Pieces*, capítulos 26 y 27.', 'Ousterhout, J. (1996). *Why Threads Are A Bad Idea (for most purposes)*. Charla invitada, USENIX Technical Conference.', 'von Behren, R., Condit, J. y Brewer, E. (2003). Why Events Are A Bad Idea (for High-Concurrency Servers). *HotOS IX*.', 'Lee, E. (2006). The Problem with Threads. *IEEE Computer*, 39(5).', 'Goetz, B. et al. (2006). *Java Concurrency in Practice*. Addison-Wesley.', 'Kegel, D. (1999). The C10K Problem. kegel.com.'],
  project: { t: 'Servidor con tres modelos de concurrencia',
    goal: 'Comparar con datos un servidor de un hilo, uno con un hilo por conexión y uno con conjunto de hilos o eventos.',
    steps: ['Escribe un servidor HTTP mínimo que responda tras simular 50 ms de espera y 5 ms de cálculo.', 'Haz tres versiones: secuencial, un hilo por conexión y conjunto de hilos (o bucle de eventos en Node).', 'Mide con una herramienta de carga (por ejemplo, autocannon o wrk) el rendimiento y la latencia con 10, 100 y 1000 conexiones.', 'Provoca una condición de carrera en un contador compartido y corrígela con una operación atómica o un candado.', 'Explica los resultados con lo visto en la unidad.'],
    deliver: 'El código de las tres versiones, las mediciones y el informe.' },
  hito: ['Procesa las fotos de inspección de PatioApp con un conjunto de hilos de cálculo (worker threads) dimensionado según los núcleos.', 'Haz que el contador de fotos procesadas de PatioApp sea seguro entre hilos y demuestra con una prueba que no pierde incrementos.']
});
})();
