(function () {
var S = SDC.S;

S('m1', 'm1.seq', { title: 'Circuitos secuenciales y memoria',
  ask: '¿Qué concepto de circuitos secuenciales o de memoria se aplica?',
  lesson: `
> **La idea en simple.** Un circuito con compuertas AND, OR y NOT calcula una respuesta a partir de sus entradas, pero no **recuerda** nada: si cambias la entrada, la salida cambia y lo anterior se pierde. Una computadora necesita recordar: el número que estás sumando, la instrucción que sigue, el texto que escribiste. Los circuitos secuenciales agregan memoria a la lógica, y con ellos se construyen los registros, la memoria RAM y el propio procesador.

## Combinacional y secuencial
- Un circuito **combinacional** calcula su salida solo a partir de sus entradas **actuales**: sumadores, comparadores, multiplexores, decodificadores.
- Un circuito **secuencial** tiene **estado**: su salida depende de las entradas actuales **y** de lo que pasó antes. El estado se guarda en elementos de memoria y cambia al ritmo de un **reloj**.
Todo sistema digital es una combinación de ambos: lógica combinacional que calcula el siguiente estado a partir del estado actual y las entradas, y memoria que lo guarda. Es exactamente una **máquina de estados finitos** construida en hardware.

## El latch: un bit que se recuerda a sí mismo
El truco para recordar es la **retroalimentación**: conectar la salida de una compuerta a la entrada de otra cuya salida vuelve a la primera. El **latch SR** (de *Set-Reset*) se construye con dos compuertas NOR cruzadas:
- Si S = 1 y R = 0, la salida Q pasa a 1 (*set*).
- Si S = 0 y R = 1, Q pasa a 0 (*reset*).
- Si S = 0 y R = 0, Q **conserva** su valor anterior: ¡memoria!
- S = 1 y R = 1 es una combinación prohibida, porque deja el circuito en un estado inconsistente.
El **latch D** (*data*) evita la combinación prohibida con una sola entrada de dato D y una entrada de habilitación: mientras la habilitación vale 1, Q copia a D; cuando vale 0, Q conserva lo último.

## El flip-flop y el reloj
Un latch es "transparente" mientras está habilitado: si D cambia varias veces, Q lo sigue, lo que provoca carreras en circuitos grandes. El **flip-flop D** activado por **flanco** resuelve el problema: copia D a Q **solo en el instante** en que el reloj pasa de 0 a 1 (flanco de subida), y el resto del tiempo ignora D. Se construye con dos latches en serie (maestro y esclavo).

El **reloj** es una señal que oscila entre 0 y 1 a frecuencia fija; un procesador de 3 GHz tiene 3000 millones de flancos por segundo. En cada flanco, todos los flip-flops del procesador capturan a la vez los valores calculados por la lógica combinacional, y el sistema avanza un paso. Entre dos flancos, la lógica combinacional debe terminar de calcular: el **camino crítico** (la cadena más lenta de compuertas) limita la frecuencia máxima. Por eso un diseño que acorta el camino crítico permite subir la frecuencia, y por eso los procesadores se dividen en etapas (el pipeline que verás en Arquitectura).

## Registros y contadores
- Un **registro** de n bits son n flip-flops que comparten el reloj y guardan un número completo. Los registros del procesador (el acumulador, el contador de programa) son esto.
- Un **registro de desplazamiento** mueve sus bits una posición en cada flanco; sirve para convertir datos en serie a paralelo (y al revés) en comunicaciones como USB o SPI.
- Un **contador** es un registro cuya entrada es su propia salida más 1: en cada flanco avanza. Con n bits cuenta de 0 a 2ⁿ − 1 y vuelve a 0 (el desbordamiento de la unidad anterior, ahora en hardware). Los contadores dividen frecuencias, miden tiempos y generan direcciones.
~~~js
// Simular un contador de 3 bits hecho con flip-flops D: el siguiente estado es (estado + 1) mod 8
function simularContador(flancos) {
  let q = [0, 0, 0];                                 // q[0] es el bit menos significativo
  const historia = [];
  for (let t = 0; t < flancos; t++) {
    const valor = q[0] + 2 * q[1] + 4 * q[2];
    historia.push(valor);
    const siguiente = (valor + 1) % 8;               // lógica combinacional: el sumador
    q = [siguiente & 1, (siguiente >> 1) & 1, (siguiente >> 2) & 1];   // flanco: todos los D se copian a la vez
  }
  return historia.join(' ');
}
console.log(simularContador(10));                   // 0 1 2 3 4 5 6 7 0 1
~~~

## Máquinas de estados en hardware
Un circuito secuencial general tiene un **registro de estado**, una lógica combinacional de **siguiente estado** y una de **salida**. Hay dos estilos clásicos: en una **máquina de Moore** (Edward Moore, 1956) la salida depende solo del estado; en una **máquina de Mealy** (George Mealy, 1955) depende del estado y de la entrada. Un semáforo, el controlador de un ascensor, el receptor de un protocolo serie y la **unidad de control** de un procesador son máquinas de estados en hardware. Es la misma idea que verás en Métodos formales para el software: la teoría de autómatas sirve igual para circuitos y para programas.

## Memorias
Con muchos elementos de memoria se construyen las memorias de la computadora:
- **SRAM** (RAM estática): cada bit es un pequeño latch de 6 transistores. Es rápida y no necesita refresco, pero ocupa mucho espacio; se usa para las **cachés** y los registros del procesador.
- **DRAM** (RAM dinámica, inventada por Robert Dennard en IBM en 1966): cada bit es un **condensador** con un transistor. Es mucho más densa y barata, pero el condensador pierde su carga en milisegundos, así que hay que **refrescar** todas las celdas periódicamente (típicamente cada 64 ms). Es la memoria principal de las computadoras.
- **Memorias no volátiles:** ROM, flash (la de los SSD y las memorias USB, inventada por Fujio Masuoka en Toshiba en 1980) y otras que conservan los datos sin energía.
Una memoria se organiza como una matriz de celdas con un **decodificador de direcciones**: dada una dirección de k bits, activa una de las 2ᵏ filas. Por eso las memorias tienen tamaños que son potencias de 2, y por eso una dirección de 32 bits solo alcanza para 4 GiB.

Un detalle con consecuencias de seguridad: en 2014, investigadores de Carnegie Mellon e Intel (Yoongu Kim y otros) mostraron el ataque **Rowhammer**: leer muy rápidamente y de forma repetida una fila de DRAM puede alterar los bits de las filas **vecinas** por interferencia eléctrica. Se demostraron ataques que obtenían privilegios de administrador desde un programa normal. Es un recordatorio de que la abstracción "la memoria guarda lo que escribí" depende de física que a veces falla.

## Del circuito al procesador
Con lo visto se puede construir una computadora completa: registros para el estado, una ALU combinacional que suma y compara, multiplexores para elegir de dónde vienen los datos, una memoria y una unidad de control (una máquina de estados) que en cada ciclo de reloj genera las señales para capturar, decodificar y ejecutar la instrucción. El curso *Nand to Tetris* de Noam Nisan y Shimon Schocken (y su libro *The Elements of Computing Systems*, 2005) lleva a los estudiantes exactamente por ese camino, desde la compuerta NAND hasta un computador que ejecuta el juego Tetris, pasando por un ensamblador, una máquina virtual, un compilador y un sistema operativo sencillo.

## Ejemplo resuelto: el semáforo de la barrera del patio
La barrera de salida tiene un semáforo para camiones con tres estados: ROJO, VERDE y AMARILLO. La entrada P indica que hay una salida autorizada.
1. **Estados y codificación:** ROJO = 00, VERDE = 01, AMARILLO = 10 (2 flip-flops).
2. **Transiciones:** ROJO pasa a VERDE si P = 1 y se queda en ROJO si P = 0; VERDE pasa siempre a AMARILLO tras un tiempo (que mide un contador); AMARILLO pasa siempre a ROJO.
3. **Tipo de máquina:** de Moore, porque las luces dependen solo del estado (luz roja = estado 00, etc.).
4. **Lógica de siguiente estado:** con s1 s0 como estado actual, s0' = ¬s1 ∧ ¬s0 ∧ P (pasar a VERDE solo desde ROJO con P) y s1' = ¬s1 ∧ s0 (pasar a AMARILLO solo desde VERDE).
5. **Estado 11:** no se usa. Hay que decidir qué hacer si el circuito arranca en ese estado por un pico eléctrico; un diseño seguro lo lleva a ROJO. La tabla muestra que con las fórmulas anteriores, desde 11 se pasa a 00 (ROJO): seguro por diseño.
La misma máquina se programa en el controlador del patio con una tabla de transiciones, como verás en Métodos formales.`,
  links: [['m1.logic', 'las compuertas combinacionales son la base de los circuitos secuenciales'], ['arq.mem', 'SRAM y DRAM forman la jerarquía de memoria'], ['for.sm', 'las máquinas de estados se usan igual en hardware y en software']],
  read: 'Harris y Harris, *Digital Design and Computer Architecture* (2.ª ed.), capítulo 3; Nisan y Schocken, *The Elements of Computing Systems* (2.ª ed., 2021); Petzold, *Code* (2.ª ed., 2022).',
  terms: [
    ['Circuito secuencial', 'circuito cuya salida depende de las entradas actuales y del estado guardado', ['Registros.', 'Contadores.', 'Unidad de control.']],
    ['Latch SR', 'elemento de memoria de un bit con dos compuertas cruzadas y entradas Set y Reset', ['Retroalimentación.', 'S = R = 1 prohibido.', 'Conserva con S = R = 0.']],
    ['Flip-flop D', 'elemento de memoria que copia su entrada a la salida solo en el flanco del reloj', ['Maestro y esclavo.', 'Base de los registros.', 'Evita carreras.']],
    ['Reloj', 'señal periódica que sincroniza los cambios de estado de un circuito secuencial', ['3 GHz.', 'Flanco de subida.', 'Limitado por el camino crítico.']],
    ['Camino crítico', 'cadena más lenta de lógica combinacional entre dos elementos de memoria', ['Limita la frecuencia.', 'Se acorta con pipelines.', 'Se mide en picosegundos.']],
    ['Registro', 'conjunto de flip-flops que guardan un número completo y comparten el reloj', ['Contador de programa.', 'Acumulador.', 'n bits.']],
    ['DRAM', 'memoria dinámica que guarda cada bit en un condensador y necesita refresco', ['Dennard, 1966.', 'Memoria principal.', 'Rowhammer.']],
    ['Máquina de Moore', 'máquina de estados cuya salida depende solo del estado actual', ['Moore, 1956.', 'Semáforo.', 'Se contrapone a Mealy.']]
  ],
  q: [
    ['¿Qué distingue a un circuito secuencial de uno combinacional?', 'Que tiene estado: su salida depende también de lo que pasó antes', ['Que es más rápido', 'Que no usa compuertas', 'Que no tiene entradas'], 'Combinacional: solo las entradas actuales.', 1],
    ['En un latch SR, ¿qué ocurre con S = 0 y R = 0?', 'Conserva el valor anterior', ['Se pone en 1', 'Se pone en 0', 'Es la combinación prohibida'], 'Eso es la memoria.', 2],
    ['¿Qué ventaja tiene un flip-flop activado por flanco frente a un latch?', 'Captura el dato solo en el instante del flanco, evitando carreras', ['Es más barato', 'No necesita reloj', 'Guarda más bits'], 'El latch es transparente mientras está habilitado.', 3],
    ['¿Qué limita la frecuencia máxima de reloj de un procesador?', 'El camino crítico de la lógica combinacional', ['El tamaño del disco', 'La cantidad de RAM', 'El sistema operativo'], 'La lógica debe terminar entre dos flancos.', 3],
    ['¿Por qué la DRAM necesita refresco?', 'Porque cada bit es un condensador que pierde su carga en milisegundos', ['Porque es muy rápida', 'Porque usa latches', 'No lo necesita'], 'Típicamente cada 64 ms.', 2],
    ['¿Qué demostró el ataque Rowhammer?', 'Que leer repetidamente una fila de DRAM puede alterar bits de filas vecinas', ['Que la SRAM es insegura', 'Que el reloj se puede detener', 'Que los flip-flops no existen'], 'Kim y otros, 2014.', 4],
    ['Un contador de 4 bits está en 15. ¿Qué valor tiene tras el siguiente flanco?', '0', ['16', '15', '1'], 'Da la vuelta módulo 2⁴.', 2],
    { tf: 'La SRAM se usa para las cachés porque es rápida aunque ocupa más espacio por bit que la DRAM.', v: true, e: 'Cada bit usa unos 6 transistores.', l: 2 },
    { tf: 'En una máquina de Mealy, la salida depende solo del estado.', v: false, e: 'Eso es Moore; en Mealy depende del estado y de la entrada.', l: 2 },
    { c: 'Escribe «latchSR(q, s, r)»: devuelve el nuevo valor de Q de un latch SR (1 si S, 0 si R, q si ninguno); si S y R son 1, devuelve null.', f: 'latchSR', p: ['q', 's', 'r'], t: [[[0, 1, 0], 1], [[1, 0, 1], 0], [[1, 0, 0], 1], [[0, 1, 1], null]], sol: '  if (s && r) return null;\n  if (s) return 1;\n  if (r) return 0;\n  return q;', l: 1 },
    { c: 'Escribe «contador(bits, flancos)»: valor de un contador de «bits» bits que empieza en 0 tras «flancos» flancos.', f: 'contador', p: ['bits', 'flancos'], t: [[[3, 10], 2], [[4, 15], 15], [[4, 16], 0]], sol: '  return flancos % (2 ** bits);', l: 1 },
    { c: 'Escribe «semaforo(estado, p)»: siguiente estado del semáforo de la barrera: "ROJO" pasa a "VERDE" si p es true; "VERDE" pasa a "AMARILLO"; "AMARILLO" pasa a "ROJO"; cualquier otro estado pasa a "ROJO".', f: 'semaforo', p: ['estado', 'p'], t: [[['ROJO', true], 'VERDE'], [['ROJO', false], 'ROJO'], [['VERDE', false], 'AMARILLO'], [['AMARILLO', true], 'ROJO'], [['RARO', true], 'ROJO']], sol: '  if (estado === "ROJO") return p ? "VERDE" : "ROJO";\n  if (estado === "VERDE") return "AMARILLO";\n  return "ROJO";', l: 2 }
  ],
  gen: function (g) {
    var ci = [['Sumador de 8 bits', 'Combinacional'], ['Contador de programa', 'Secuencial'], ['Multiplexor', 'Combinacional'], ['Registro de desplazamiento', 'Secuencial'], ['Comparador de igualdad', 'Combinacional'], ['Controlador de un semáforo', 'Secuencial'], ['Decodificador de direcciones', 'Combinacional']];
    ci.forEach(function (c) { g.mcq(1, '¿Es combinacional o secuencial? ' + c[0], c[1], ['Combinacional', 'Secuencial', 'Analógico'].filter(function (x) { return x !== c[1]; }).concat(['Ninguno']), 'Secuencial si guarda estado.'); });
    g.times(8, function (R) { var b = R.int(2, 6), f = R.int(1, 100); g.input(2, 'Un contador de ' + b + ' bits empieza en 0. ¿Qué valor tiene tras ' + f + ' flancos?', f % Math.pow(2, b), 'Módulo 2^' + b + '.'); });
    var me = [['Registros del procesador y cachés', 'SRAM'], ['Memoria principal de la computadora', 'DRAM'], ['Disco SSD y memoria USB', 'Flash'], ['Firmware que no cambia', 'ROM']];
    me.forEach(function (m) { g.mcq(2, '¿Qué tipo de memoria se usa para esto? ' + m[0], m[1], ['SRAM', 'DRAM', 'Flash', 'ROM'].filter(function (x) { return x !== m[1]; }), 'Tipos de memoria.'); });
  },
  checks: [
    ['¿Cómo puede un circuito de compuertas recordar un bit?', 'Con retroalimentación: dos compuertas cruzadas cuya salida mantiene su propio valor, como en el latch SR.'],
    ['¿Para qué sirve el reloj en un circuito secuencial?', 'Para sincronizar: en cada flanco todos los flip-flops capturan a la vez el siguiente estado calculado por la lógica combinacional.'],
    ['Compara SRAM y DRAM.', 'SRAM usa latches, es rápida y no necesita refresco, pero es cara y grande; DRAM usa condensadores, es densa y barata, pero necesita refresco.'],
    ['Diseña una máquina de estados de Moore para un sistema sencillo.', 'Definir estados con su codificación, transiciones según las entradas y salidas asociadas a cada estado, y qué pasa en los estados no usados.']
  ],
  cites: ['Harris, S. y Harris, D. (2012). *Digital Design and Computer Architecture* (2.ª ed.). Morgan Kaufmann.', 'Nisan, N. y Schocken, S. (2021). *The Elements of Computing Systems* (2.ª ed.). MIT Press.', 'Dennard, R. (1968). Field-effect transistor memory. Patente de EE. UU. 3 387 286.', 'Kim, Y. et al. (2014). Flipping Bits in Memory Without Accessing Them: An Experimental Study of DRAM Disturbance Errors. *ISCA 2014*.', 'Mealy, G. (1955). A Method for Synthesizing Sequential Circuits. *Bell System Technical Journal*, 34(5).', 'Petzold, C. (2022). *Code: The Hidden Language of Computer Hardware and Software* (2.ª ed.). Microsoft Press.'],
  project: { t: 'Del flip-flop al contador',
    goal: 'Construir y simular circuitos secuenciales.',
    steps: ['Usa un simulador de circuitos (como Logisim Evolution o el de Nand to Tetris) y construye un latch SR con dos compuertas NOR.', 'Construye un flip-flop D maestro-esclavo y verifica que solo cambia en el flanco.', 'Construye un registro de 4 bits y un contador de 4 bits.', 'Diseña e implementa la máquina de estados del semáforo con su tabla de transiciones.', 'Simula en JavaScript el mismo semáforo y compara su comportamiento con el del circuito.'],
    deliver: 'Los archivos del simulador, las capturas de las pruebas y el código.' },
  hito: ['Modela el semáforo de la barrera de PatioApp como máquina de Moore y verifica que todo estado no usado vuelve a ROJO.', 'Implementa en el controlador de la barrera de PatioApp la máquina de estados con una tabla de transiciones y pruebas de todas las transiciones.']
});
SDC.after('m1.seq', 'm1.logic');

S('m1', 'm1.stack', { title: 'Las capas de una computadora: del transistor a la aplicación',
  ask: '¿Qué capa o abstracción del sistema se aplica?',
  lesson: `
> **La idea en simple.** Cuando tocas "Registrar salida" en la tablet del patio, ocurren miles de millones de cosas: transistores que conmutan, instrucciones que se ejecutan, un sistema operativo que reparte el procesador, paquetes que viajan por la red, una base de datos que guarda bytes en un disco. Nadie puede pensar en todo eso a la vez. La computación funciona porque está organizada en **capas**, cada una con una interfaz simple que esconde la complejidad de la de abajo. Esta unidad es un mapa del viaje completo.

## La idea de abstracción por capas
Una **abstracción** describe qué hace algo sin decir cómo. Cada capa ofrece a la de arriba una interfaz simple y usa a la de abajo sin conocer sus detalles: quien programa en JavaScript no piensa en transistores, y quien diseña transistores no piensa en JavaScript. Yale Patt y Sanjay Patel organizan su libro *Introduction to Computing Systems* exactamente así, de abajo hacia arriba:
| Capa | Qué ofrece hacia arriba | Ejemplo |
| Física y dispositivos | transistores que conmutan | silicio, transistores MOSFET de unos pocos nanómetros |
| Circuitos digitales | compuertas, flip-flops, memorias | NAND, registros, SRAM |
| Microarquitectura | una implementación del conjunto de instrucciones | pipeline, cachés, predicción de saltos |
| Arquitectura del conjunto de instrucciones (ISA) | instrucciones de máquina | x86-64, ARM, RISC-V |
| Sistema operativo | procesos, archivos, memoria virtual, red | Linux, Windows, Android |
| Lenguajes y entornos de ejecución | lenguajes de alto nivel, bibliotecas | C, Java, JavaScript con V8 |
| Algoritmos y aplicaciones | soluciones a problemas de las personas | PatioApp |
La ISA es especialmente importante: es el **contrato** entre el hardware y el software. Un programa compilado para x86-64 corre en procesadores de Intel y AMD de distintas generaciones, con microarquitecturas muy diferentes, porque todos respetan el mismo contrato.

## El viaje de un toque
Sigamos qué pasa cuando el operador toca "Registrar salida" en la tablet:
1. **Hardware de entrada:** la pantalla táctil detecta el cambio de capacitancia en una posición y su controlador envía una **interrupción** al procesador.
2. **Sistema operativo:** el núcleo (Linux, en Android) atiende la interrupción, lee las coordenadas con el **controlador** del dispositivo y entrega un evento a la aplicación que tiene el foco.
3. **Entorno de ejecución:** el navegador o el motor de la app recibe el evento, determina qué elemento se tocó y ejecuta el manejador de JavaScript, que el motor V8 compiló a código de máquina **justo a tiempo**.
4. **Aplicación:** el código de PatioApp arma un mensaje JSON con la placa y llama a la API con «fetch».
5. **Red:** el sistema operativo divide el mensaje en segmentos TCP dentro de una conexión cifrada con TLS, los empaqueta en datagramas IP y los envía por Wi-Fi; los paquetes cruzan routers del proveedor de internet hasta el centro de datos en São Paulo.
6. **Servidor:** el sistema operativo del servidor recibe los paquetes, el proceso de la API (Node.js) descifra la petición, valida los datos y ejecuta la lógica de negocio.
7. **Base de datos:** la API envía una consulta SQL; el motor la planifica, busca en un índice B+, actualiza las páginas en memoria y escribe el registro de transacciones en el SSD antes de confirmar (durabilidad).
8. **Vuelta:** la respuesta recorre el camino inverso y la app dibuja la confirmación: el motor calcula el diseño, la GPU pinta los píxeles y la pantalla los muestra en el siguiente refresco.
Todo esto toma unos 200 milisegundos, de los cuales la mayor parte es el viaje por la red de ida y vuelta. Cada paso es el tema de un curso de esta carrera.

## Cuando las abstracciones se filtran
Joel Spolsky formuló en 2002 la **ley de las abstracciones con fugas** (*The Law of Leaky Abstractions*): "toda abstracción no trivial tiene fugas, en algún grado". Las capas esconden los detalles, pero no del todo, y en algún momento esos detalles aparecen:
- TCP promete entregar los datos en orden y sin pérdidas, pero si se corta el cable, ninguna abstracción lo arregla: la petición falla o tarda.
- La memoria parece un arreglo uniforme, pero recorrer una matriz por filas puede ser diez veces más rápido que por columnas, por la caché.
- Los números parecen números, pero 0,1 + 0,2 no es 0,3 en punto flotante.
- Una consulta SQL parece una descripción de lo que se quiere, pero la misma consulta puede tardar 10 milisegundos o 10 minutos según los índices.
- Un garbage collector parece hacer desaparecer la gestión de memoria, hasta que una pausa de recolección hace que el servidor tarde un segundo en responder.
Por eso un buen ingeniero de software conoce **al menos una capa por debajo** de aquella en la que trabaja. No para trabajar siempre allí, sino para entender y resolver los problemas cuando la abstracción se filtra.

## Compilar, interpretar, ejecutar
Entre el código que escribes y el procesador hay traductores:
- Un **compilador** traduce todo el programa de antemano a código de máquina (C, Rust, Go) o a un código intermedio (Java a *bytecode*, C# a CIL).
- Un **intérprete** lee y ejecuta el programa instrucción por instrucción (las primeras versiones de Python y JavaScript).
- Un **compilador justo a tiempo** (JIT) combina ambos: empieza interpretando y compila a código de máquina las partes que se ejecutan muchas veces, con optimizaciones basadas en cómo se usa realmente el código (así funcionan V8, la máquina virtual de Java y .NET).
- Un **enlazador** combina el código del programa con las bibliotecas, y un **cargador** del sistema operativo lo pone en memoria y lo empieza a ejecutar.
En Sistemas operativos y lenguajes (ciclo 3) y en Lenguajes y compiladores (ciclo 6) verás estas capas a fondo.

## El arranque: de cero a la aplicación
Cuando se enciende una computadora, ninguna capa está lista. El arranque las levanta en orden:
1. El procesador empieza a ejecutar en una dirección fija, donde está el **firmware** (UEFI, que reemplazó a la BIOS), grabado en memoria no volátil.
2. El firmware verifica el hardware, inicializa la memoria y busca un **cargador de arranque** en el disco. Con el **arranque seguro** (*Secure Boot*), verifica su firma digital para impedir que un programa malicioso se cargue antes del sistema operativo.
3. El cargador de arranque carga el **núcleo** del sistema operativo en memoria y le cede el control.
4. El núcleo inicializa los controladores, monta los sistemas de archivos y arranca el primer proceso (en Linux, «init» o «systemd»), que inicia los servicios.
5. Finalmente, el usuario inicia sesión y abre la aplicación.
En los servidores en la nube, este proceso ocurre dentro de una máquina virtual o un contenedor, y se ha optimizado hasta tardar segundos o menos.

## Ejemplo resuelto: ¿dónde se fue el tiempo de un registro de salida?
Un operador reporta que registrar una salida tarda 3 segundos en lugar de los 300 milisegundos habituales. Recorrer las capas ordena la investigación:
1. **Aplicación (tablet):** las herramientas de desarrollo muestran que el código JavaScript tarda 15 ms; no es ahí.
2. **Red:** la petición tarda 2,8 segundos en recibir el primer byte de respuesta. El ping al servidor es normal (70 ms): la red no es el problema.
3. **Servidor:** las trazas de la API muestran 2,7 segundos dentro del manejador de salida.
4. **Base de datos:** el 95 % de ese tiempo es una consulta. Su plan de ejecución muestra un recorrido secuencial de toda la tabla de estadías: un índice se eliminó por error en la última migración.
5. **Corrección:** se recrea el índice; el tiempo vuelve a 280 ms.
Sin el mapa de capas, el equipo podría haber pasado horas optimizando el JavaScript de la tablet, que no tenía nada que ver.`,
  links: [['m1.cpu', 'la CPU y el ciclo de instrucción son las capas bajas del viaje'], ['m8.os', 'el sistema operativo es la capa que reparte el hardware'], ['m9.tcp', 'la red es una pila de capas propia']],
  read: 'Patt y Patel, *Introduction to Computing Systems* (3.ª ed., 2019); Bryant y O’Hallaron, *Computer Systems: A Programmer’s Perspective*, capítulo 1; Spolsky, *The Law of Leaky Abstractions* (2002).',
  terms: [
    ['Abstracción', 'descripción de qué hace un componente sin decir cómo lo hace', ['La memoria como un arreglo.', 'Un archivo como una secuencia de bytes.', 'Base de las capas.']],
    ['Arquitectura del conjunto de instrucciones', 'contrato entre hardware y software que define las instrucciones de máquina', ['x86-64, ARM, RISC-V.', 'Permite cambiar la microarquitectura.', 'ISA.']],
    ['Microarquitectura', 'implementación concreta de una ISA en un procesador', ['Pipeline y cachés.', 'Distinta entre generaciones.', 'Invisible para el software.']],
    ['Interrupción', 'señal del hardware que obliga al procesador a atender un evento', ['Toque en la pantalla.', 'Llegada de un paquete.', 'La atiende el sistema operativo.']],
    ['Abstracción con fugas', 'abstracción cuyos detalles internos se manifiestan en ciertas situaciones', ['Spolsky, 2002.', 'Caché y orden de recorrido.', 'Pausas del recolector.']],
    ['Compilador justo a tiempo', 'traductor que compila a código de máquina durante la ejecución las partes más usadas', ['V8.', 'Máquina virtual de Java.', 'Optimiza según el uso real.']],
    ['Firmware', 'software grabado en memoria no volátil que inicializa el hardware al encender', ['UEFI.', 'Reemplazó a la BIOS.', 'Arranque seguro.']],
    ['Cargador de arranque', 'programa que carga el núcleo del sistema operativo en memoria y le cede el control', ['GRUB.', 'Verificado por Secure Boot.', 'Segundo paso del arranque.']]
  ],
  q: [
    ['¿Qué capa es el contrato entre hardware y software?', 'La arquitectura del conjunto de instrucciones (ISA)', ['El sistema operativo', 'La microarquitectura', 'La aplicación'], 'x86-64, ARM, RISC-V.', 2],
    ['¿Por qué un programa compilado para x86-64 corre en procesadores de Intel y AMD distintos?', 'Porque todos respetan la misma ISA, aunque sus microarquitecturas difieran', ['Porque son idénticos por dentro', 'Por el sistema operativo', 'No corre'], 'Contrato de la ISA.', 2],
    ['¿Qué dice la ley de las abstracciones con fugas?', 'Que toda abstracción no trivial deja ver sus detalles en alguna situación', ['Que las abstracciones son inútiles', 'Que las capas no existen', 'Que la memoria pierde datos'], 'Spolsky, 2002.', 2],
    ['Recorrer una matriz por columnas es mucho más lento que por filas. ¿Qué abstracción se filtra?', 'La de la memoria como arreglo uniforme (por la caché)', ['La de TCP', 'La de los archivos', 'Ninguna'], 'La caché hace que el orden importe.', 3],
    ['¿Qué hace un compilador justo a tiempo?', 'Compila durante la ejecución las partes más usadas, optimizándolas según el uso real', ['Compila todo antes de ejecutar', 'Solo interpreta', 'Elimina el sistema operativo'], 'V8, JVM.', 2],
    ['¿Qué protege el arranque seguro?', 'Que no se cargue un programa malicioso antes del sistema operativo, verificando firmas', ['Que no se apague la computadora', 'Que el disco no se llene', 'Que la red sea rápida'], 'UEFI Secure Boot.', 3],
    ['Una operación tarda 3 s; la red y el JavaScript son normales y la API pasa 2,7 s en una consulta. ¿Dónde buscar primero?', 'En el plan de ejecución de la consulta en la base de datos', ['En el controlador de la pantalla táctil', 'En el firmware', 'En el diseño de la interfaz'], 'Recorrer las capas acota la búsqueda.', 3],
    { tf: 'Un buen ingeniero debería conocer al menos una capa por debajo de la que trabaja.', v: true, e: 'Para resolver problemas cuando la abstracción se filtra.', l: 1 },
    { tf: 'TCP garantiza que los datos llegan aunque se corte el cable.', v: false, e: 'Ninguna abstracción arregla un corte físico.', l: 1 },
    { o: 'Ordena las capas de abajo hacia arriba.', s: ['Transistores', 'Circuitos digitales', 'Microarquitectura', 'Conjunto de instrucciones (ISA)', 'Sistema operativo', 'Lenguajes y entornos de ejecución', 'Aplicaciones'], e: 'Cada capa usa la de abajo y ofrece una interfaz a la de arriba.', l: 2 },
    { o: 'Ordena los pasos del arranque.', s: ['El procesador ejecuta el firmware', 'El firmware busca y verifica el cargador de arranque', 'El cargador carga el núcleo', 'El núcleo inicia los controladores y el primer proceso', 'El usuario abre la aplicación'], e: 'Las capas se levantan de abajo hacia arriba.', l: 2 },
    { c: 'Escribe «capaMasLenta(tiempos)»: tiempos es un objeto {capa: milisegundos}; devuelve el nombre de la capa con más tiempo.', f: 'capaMasLenta', p: ['tiempos'], t: [[[{ app: 15, red: 70, api: 120, bd: 2600 }], 'bd'], [[{ a: 1 }], 'a']], sol: '  return Object.keys(tiempos).reduce((a, b) => (tiempos[b] > tiempos[a] ? b : a));', l: 1 },
    { c: 'Escribe «porcentajes(tiempos)»: devuelve un objeto {capa: porcentaje entero del total}.', f: 'porcentajes', p: ['tiempos'], t: [[[{ app: 15, red: 70, api: 115, bd: 2800 }], { app: 1, red: 2, api: 4, bd: 93 }]], sol: '  const total = Object.values(tiempos).reduce((a, b) => a + b, 0);\n  const o = {};\n  for (const k in tiempos) o[k] = Math.round(100 * tiempos[k] / total);\n  return o;', l: 2 }
  ],
  gen: function (g) {
    var ca = [['Transistores que conmutan', 'Física y dispositivos'], ['Compuertas y flip-flops', 'Circuitos digitales'], ['Pipeline y cachés de un procesador concreto', 'Microarquitectura'], ['Instrucciones ADD, LOAD y JUMP', 'Conjunto de instrucciones (ISA)'], ['Procesos, archivos y memoria virtual', 'Sistema operativo'], ['JavaScript ejecutado por V8', 'Lenguajes y entornos de ejecución'], ['El registro de salidas del patio', 'Aplicaciones']];
    ca.forEach(function (c) { g.mcq(1, '¿A qué capa pertenece esto? ' + c[0], c[1], ['Física y dispositivos', 'Circuitos digitales', 'Microarquitectura', 'Conjunto de instrucciones (ISA)', 'Sistema operativo', 'Lenguajes y entornos de ejecución', 'Aplicaciones'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Capas de una computadora.'); });
    var fu = [['0,1 + 0,2 no da 0,3', 'Números de punto flotante'], ['Una consulta tarda minutos por falta de un índice', 'SQL declarativo'], ['El servidor se detiene un segundo por la recolección de basura', 'Memoria administrada'], ['Una petición falla porque se cortó la red', 'Conexión confiable de TCP'], ['Recorrer por columnas es más lento', 'Memoria uniforme']];
    fu.forEach(function (f) { g.mcq(3, '¿Qué abstracción se filtra aquí? ' + f[0], f[1], ['Números de punto flotante', 'SQL declarativo', 'Memoria administrada', 'Conexión confiable de TCP', 'Memoria uniforme'].filter(function (x) { return x !== f[1]; }).slice(0, 3), 'Abstracciones con fugas.'); });
    var tr = [['Traduce todo el programa a código de máquina antes de ejecutar', 'Compilador'], ['Ejecuta el programa instrucción por instrucción', 'Intérprete'], ['Compila durante la ejecución las partes más usadas', 'Compilador justo a tiempo'], ['Combina el programa con las bibliotecas', 'Enlazador'], ['Pone el programa en memoria y lo inicia', 'Cargador']];
    tr.forEach(function (t) { g.mcq(2, '¿Qué herramienta hace esto? ' + t[0], t[1], ['Compilador', 'Intérprete', 'Compilador justo a tiempo', 'Enlazador', 'Cargador'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Del código fuente a la ejecución.'); });
  },
  checks: [
    ['Describe las capas de una computadora y qué ofrece cada una a la de arriba.', 'Transistores, circuitos, microarquitectura, ISA, sistema operativo, lenguajes y aplicaciones; cada una ofrece una interfaz simple que oculta la complejidad de abajo.'],
    ['Relata el viaje de un toque en una app hasta la base de datos y de vuelta.', 'Interrupción, sistema operativo, entorno de ejecución, aplicación, red con TCP/TLS/IP, servidor, base de datos con índice y disco, y el camino inverso hasta pintar la pantalla.'],
    ['¿Qué es una abstracción con fugas? Da dos ejemplos.', 'Una abstracción que deja ver sus detalles: la caché al recorrer matrices y el punto flotante al sumar decimales.'],
    ['¿Por qué conviene conocer una capa por debajo de la propia?', 'Para diagnosticar y resolver los problemas que aparecen cuando la abstracción se filtra.']
  ],
  cites: ['Patt, Y. y Patel, S. (2019). *Introduction to Computing Systems: From Bits & Gates to C/C++ & Beyond* (3.ª ed.). McGraw-Hill.', 'Spolsky, J. (2002). The Law of Leaky Abstractions. *Joel on Software*.', 'Bryant, R. y O’Hallaron, D. (2016). *Computer Systems: A Programmer’s Perspective* (3.ª ed.). Pearson.', 'Patterson, D. y Hennessy, J. (2020). *Computer Organization and Design RISC-V Edition* (2.ª ed.). Morgan Kaufmann.', 'UEFI Forum (2021). *Unified Extensible Firmware Interface Specification*, versión 2.9.'],
  project: { t: 'El viaje de una petición',
    goal: 'Observar y medir cómo atraviesa una petición las capas de un sistema real.',
    steps: ['Elige una acción de una aplicación web propia o pública y registra con las herramientas del navegador el tiempo de cada fase (DNS, conexión, TLS, espera, descarga).', 'Si tienes un servidor propio, agrega trazas que midan el tiempo de la API y de la base de datos.', 'Dibuja el diagrama de capas que atraviesa la acción, indicando el tiempo de cada una.', 'Provoca una fuga de abstracción (por ejemplo, una consulta sin índice o un recorrido por columnas) y mide su efecto.', 'Escribe un informe de una página que explique dónde se va el tiempo y por qué.'],
    deliver: 'Las mediciones, el diagrama y el informe.' },
  hito: ['Documenta en un diagrama el viaje completo del registro de salida de PatioApp por todas las capas, con los tiempos medidos.', 'Agrega a PatioApp un encabezado Server-Timing que informe el tiempo de la API y de la base de datos en cada respuesta.']
});
SDC.after('m1.stack', 'm1.cpu');
})();
