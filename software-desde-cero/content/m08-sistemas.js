(function () {
var M = SDC.M, S = SDC.S;
M('m8', { title: 'Sistemas operativos y lenguajes', desc: 'Qué hay debajo de tu programa: quién reparte la CPU, cómo se ejecutan varias cosas a la vez y cómo un texto termina convertido en instrucciones.',
  thread: 'PatioApp atiende a varios revisores al mismo tiempo. Dos personas no pueden asignar el mismo vehículo: aquí entiendes la condición de carrera y cómo evitarla.',
  books: '*Operating Systems: Three Easy Pieces* (Arpaci-Dusseau), *Crafting Interpreters* (Nystrom), *Compilers: Principles, Techniques, and Tools* (Aho et al.), *Programming Language Pragmatics* (Scott).',
  uni: 'Sistemas Operativos (UPC, UTP y UTEC), Compiladores (UTEC), Lenguajes de Programación y Teoría en Computación (UTP).' });

S('m8', 'm8.os', { title: 'Procesos, memoria y archivos',
  ask: '¿Qué concepto del sistema operativo aparece?',
  lesson: `
> **La idea en simple.** El sistema operativo es el administrador de un edificio. Hay una sola sala de reuniones (CPU) y muchos equipos (programas). Reparte turnos tan rápido que cada uno cree tener la sala para sí solo, y cuida que nadie entre al piso de otro.

## Proceso e hilo
- **Proceso:** programa en ejecución, con su propia memoria aislada.
- **Hilo:** línea de ejecución dentro de un proceso; comparte memoria con sus hermanos.
Si un proceso falla, los demás siguen. Si un hilo corrompe la memoria, cae todo su proceso.

## Planificación
La CPU cambia de tarea cada pocos milisegundos: **cambio de contexto**. Algoritmos: FIFO, por turnos (*round-robin*), por prioridad.

## Memoria virtual
Cada proceso ve su propio espacio de direcciones; el SO lo traduce a RAM real en **páginas**. Si falta RAM, mueve páginas al disco y todo se vuelve muy lento.
~~~txt
Memoria de un proceso:
  Código     instrucciones
  Datos      variables globales
  Heap       objetos creados (crece y lo limpia el recolector)
  Pila       llamadas y variables locales (cada hilo la suya)
~~~

## Pila y heap
La pila es rápida y se limpia sola. El heap es flexible, pero hay que administrarlo: a mano en C («malloc/free») o con un **recolector de basura** en JavaScript, Java y Python. Si una referencia nunca se suelta, hay **fuga de memoria**.

## Sistema de archivos y llamadas al sistema
Tu programa no toca el disco: le pide al kernel con una **llamada al sistema** (open, read, write). La memoria en modo usuario está protegida del kernel.

## Puntos que no debes omitir
- E/S bloqueante: el proceso espera y otro usa la CPU.
- Linux trata casi todo como archivo.
- Una **máquina virtual** simula hardware; un **contenedor** comparte el kernel.
- El sistema operativo da abstracciones: la CPU se vuelve procesos, la RAM memoria virtual y el disco archivos.

! Error común: creer que más hilos siempre es más rápido. Cada cambio de contexto cuesta y compiten por recursos.`,
  links: [['m1.cpu', 'el SO reparte la CPU y la memoria que viste'], ['m8.conc', 'los hilos compartiendo memoria traen nuevos peligros'], ['m15.containers', 'los contenedores aíslan procesos'], ['m3.func', 'la pila guarda las llamadas a funciones']],
  read: 'Arpaci-Dusseau, *OSTEP* (gratis en línea); Tanenbaum, *Modern Operating Systems*.',
  terms: [
    ['Proceso', 'programa en ejecución con su propio espacio de memoria', ['Abrir Chrome crea varios de estos.', 'El administrador de tareas los lista.', 'Si uno falla, los demás continúan.']],
    ['Hilo', 'unidad de ejecución dentro de un proceso que comparte su memoria', ['Un servidor atiende cada petición con uno de estos.', 'Dos de ellos modifican la misma variable.', 'Son más ligeros de crear que un proceso.']],
    ['Cambio de contexto', 'guardar el estado de una tarea y cargar el de otra en la CPU', ['La CPU pasa de un programa a otro cada milisegundos.', 'Demasiados hilos gastan tiempo solo en esto.', 'Se guardan los registros de la tarea saliente.']],
    ['Memoria virtual', 'abstracción que da a cada proceso un espacio de direcciones propio', ['Dos procesos usan la misma dirección y ven datos distintos.', 'Los programas pueden usar más de lo que hay en RAM.', 'El SO traduce mediante tablas de páginas.']],
    ['Heap', 'zona de memoria para datos de tamaño y duración dinámicos', ['«new Vehiculo()» se aloja aquí.', 'El recolector de basura lo limpia.', 'En C se reserva con malloc.']],
    ['Llamada al sistema', 'petición de un programa para que el kernel haga algo privilegiado', ['Leer un archivo con «read».', 'Abrir una conexión de red.', 'Crear un proceso.']],
    ['Fuga de memoria', 'memoria que ya no se usa pero nunca se libera', ['Un servidor consume cada vez más RAM hasta caer.', 'Un listener nunca retirado retiene objetos.', 'Una caché sin límite crece para siempre.']]
  ],
  q: [
    ['¿Qué comparten los hilos de un mismo proceso?', 'El heap y el código, pero cada uno tiene su pila', ['Nada', 'Solo la pila', 'Todo, incluso la pila'], 'Por eso una variable en el heap puede sufrir carreras.', 3],
    ['Tu app se vuelve cada vez más lenta y usa más RAM cada hora. ¿Qué sospechas?', 'Una fuga de memoria', ['Un error de sintaxis', 'Un disco nuevo', 'El teclado'], 'El consumo creciente y sostenido es su firma.', 3],
    ['¿Por qué la pestaña de un navegador moderno suele ser un proceso propio?', 'Para que un fallo o una web maliciosa quede aislada', ['Porque es más barato', 'Para usar menos memoria', 'Porque HTML lo exige'], 'Procesos dan aislamiento fuerte de memoria.', 4],
    ['¿Qué pasa si se agota la RAM y el sistema mueve páginas al disco constantemente?', 'Hiperpaginación: la máquina se arrastra', ['Se acelera', 'Se apaga la CPU', 'El disco se vuelve RAM real'], 'El disco es miles de veces más lento.', 4],
    { c: 'Simula round-robin: «turnos(tareas, q)» recibe tiempos restantes y un quantum q, y devuelve el orden (índices) en que terminan las tareas.', f: 'turnos', p: ['tareas', 'q'], t: [[[[3, 1, 2], 2], [1, 2, 0]], [[[1], 1], [0]], [[[2, 2], 1], [0, 1]]], sol: '  const c = tareas.map((t, i) => [t, i]), r = [];\n  while (c.length) {\n    const [t, i] = c.shift();\n    if (t <= q) r.push(i); else c.push([t - q, i]);\n  }\n  return r;', l: 4 },
    { c: 'Calcula el número de página: «pagina(dir, tam)» con dirección y tamaño de página. Devuelve [página, desplazamiento].', f: 'pagina', p: ['dir', 'tam'], t: [[[8195, 4096], [2, 3]], [[0, 4096], [0, 0]], [[4096, 4096], [1, 0]]], sol: '  return [Math.floor(dir / tam), dir % tam];', l: 3 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var t = R.pick([1024, 2048, 4096]), d = R.int(1000, 60000); g.input(2, 'Con páginas de ' + t + ' bytes, ¿en qué número de página (desde 0) cae la dirección ' + d + '?', Math.floor(d / t), d + ' ÷ ' + t + ' = ' + Math.floor(d / t) + ' sin decimales.'); });
    g.times(8, function (R) { var t = R.pick([1024, 2048, 4096]), d = R.int(1000, 60000); g.input(3, 'Con páginas de ' + t + ' bytes, ¿cuál es el desplazamiento de la dirección ' + d + ' dentro de su página?', d % t, d + ' % ' + t + ' = ' + d % t + '.'); });
  } });

S('m8', 'm8.conc', { title: 'Concurrencia',
  ask: '¿Qué problema o herramienta de concurrencia aparece?',
  lesson: `
> **La idea en simple.** Dos cajeros venden la última entrada del concierto al mismo tiempo. Cada uno miró y vio "queda 1". Los dos vendieron. Ese es el error más famoso de la concurrencia: la **condición de carrera**.

## Concurrencia y paralelismo
- **Concurrencia:** manejar varias tareas que se intercalan (un cocinero atendiendo tres ollas).
- **Paralelismo:** ejecutar varias a la vez de verdad (tres cocineros).

## Condición de carrera
«contador++» parece atómico pero son tres pasos: leer, sumar, escribir.
~~~txt
Hilo A lee 5
Hilo B lee 5
Hilo A escribe 6
Hilo B escribe 6      ← debió ser 7
~~~
~~~js
// Simulación: dos tareas leen el mismo valor antes de escribir
let saldo = 100;
function retiro(valorLeido, monto) { saldo = valorLeido - monto; }
const leidoA = saldo, leidoB = saldo;
retiro(leidoA, 30);
retiro(leidoB, 50);
console.log(saldo);   // 50; se perdió el retiro de 30
~~~

## Herramientas
- **Mutex (cerrojo):** solo uno pasa a la sección crítica.
- **Semáforo:** cuenta cuántos pueden pasar.
- **Operación atómica:** se ejecuta completa o no se ejecuta.
- **Paso de mensajes:** no compartir memoria; comunicarse (Go, Erlang).

## Interbloqueo (deadlock)
A tiene el recurso 1 y espera el 2. B tiene el 2 y espera el 1. Se esperan para siempre. Requiere cuatro condiciones (Coffman): exclusión mutua, retener y esperar, no expropiación y espera circular. Solución típica: pedir siempre los recursos en el **mismo orden**.

## Puntos que no debes omitir
- Lo más seguro es compartir nada o que lo compartido sea inmutable.
- La **ley de Amdahl**: si 10% del trabajo es secuencial, nunca superarás 10× de mejora.
- Estos errores son intermitentes y difíciles de reproducir.
- Las bases de datos tienen este mismo problema: lo resuelven con transacciones.

! Error común: "en mi máquina funciona". Las carreras dependen del tiempo y aparecen con carga real.`,
  links: [['m8.os', 'los hilos comparten memoria'], ['m6.func', 'la inmutabilidad evita las carreras'], ['m10.index', 'las transacciones resuelven este problema en las bases de datos'], ['m9.async', 'JavaScript evita muchas carreras con un solo hilo y un bucle de eventos'], ['m13.dist', 'en sistemas distribuidos el mismo problema se vuelve mucho más difícil']],
  read: 'Arpaci-Dusseau, *OSTEP*, parte de concurrencia; Goetz, *Java Concurrency in Practice*.',
  terms: [
    ['Condición de carrera', 'error cuyo resultado depende del orden temporal entre tareas', ['Dos personas compran el último asiento.', 'Un contador compartido queda por debajo de lo esperado.', 'El fallo aparece una de cada mil veces.']],
    ['Sección crítica', 'parte del código que accede a un recurso compartido', ['El bloque que actualiza el saldo.', 'Debe ejecutarla un solo hilo a la vez.', 'Se debe mantener lo más corta posible.']],
    ['Mutex', 'cerrojo que permite el paso de un solo hilo a la vez', ['Se bloquea antes de modificar y se libera después.', 'Como la llave de un baño único.', 'Olvidar liberarlo detiene al resto.']],
    ['Semáforo', 'contador que limita cuántos hilos usan un recurso', ['Solo 10 conexiones simultáneas a la base de datos.', 'Un estacionamiento con cartel de plazas libres.', 'Se decrementa al entrar y aumenta al salir.']],
    ['Interbloqueo', 'situación en que varias tareas se esperan entre sí y ninguna avanza', ['Dos hilos con un recurso cada uno, esperando el del otro.', 'Dos transacciones bloquean filas en orden inverso.', 'El programa se queda colgado sin consumir CPU.']],
    ['Operación atómica', 'operación que ocurre completa o no ocurre', ['«compare-and-swap» de la CPU.', 'Otros hilos nunca ven un estado intermedio.', 'Un UPDATE de una sola fila en una base de datos.']],
    ['Paso de mensajes', 'coordinación de tareas por envío de mensajes en vez de memoria compartida', ['Los canales de Go.', 'Los Web Workers de JavaScript usan postMessage.', 'Los actores de Erlang no comparten estado.']]
  ],
  q: [
    ['¿Por qué «contador++» no es seguro entre hilos?', 'Son tres pasos separados: leer, sumar y escribir', ['Porque ++ no funciona con hilos', 'Porque es lento', 'Porque usa flotantes'], 'Otro hilo puede intercalarse entre ellos.', 3],
    ['¿Cómo evitas el interbloqueo entre dos recursos?', 'Pidiendo siempre los recursos en el mismo orden', ['Usando más hilos', 'Quitando los cerrojos', 'Reiniciando a diario'], 'Rompe la condición de espera circular.', 3],
    ['Si 25% de un programa no se puede paralelizar, ¿cuál es la mejora máxima según Amdahl?', '4 veces', ['Ilimitada', '25 veces', '2 veces'], '1 / 0.25 = 4.', 4],
    ['Un sistema de asientos usa "SELECT libre; luego UPDATE". Falla con carga. ¿Qué lo arregla?', 'Un UPDATE atómico con condición o una transacción con bloqueo', ['Un servidor más rápido', 'Un sleep entre consultas', 'Reintentar al azar'], 'Leer y escribir deben ser una sola operación atómica.', 4],
    { c: 'Simula un cerrojo: «ventaSegura(pedidos, stock)» recibe cuántas compras llegan y el stock; devuelve cuántas se aceptan, comprobando y descontando como una sola operación.', f: 'ventaSegura', p: ['pedidos', 'stock'], t: [[[5, 3], 3], [[2, 3], 2], [[0, 1], 0]], sol: '  let ok = 0;\n  const comprar = () => { if (stock > 0) { stock--; return true; } return false; };\n  for (let i = 0; i < pedidos; i++) if (comprar()) ok++;\n  return ok;', l: 3 },
    { c: 'Calcula la ley de Amdahl: «amdahl(p, n)» con p la fracción paralela y n los núcleos.', f: 'amdahl', p: ['p', 'n'], t: [[[0.5, 2], 1.3333333333333333], [[1, 4], 4], [[0, 8], 1]], sol: '  return 1 / ((1 - p) + p / n);', l: 3 },
    { c: 'Detecta interbloqueo: «hayDeadlock(g)» recibe un grafo de espera {tarea: [tareas que espera]} y dice si hay un ciclo.', f: 'hayDeadlock', p: ['g'], t: [[[{ a: ['b'], b: ['a'] }], true], [[{ a: ['b'], b: [] }], false]], sol: '  const e = {};\n  const v = n => {\n    if (e[n] === 1) return true;\n    if (e[n] === 2) return false;\n    e[n] = 1;\n    if ((g[n] || []).some(v)) return true;\n    e[n] = 2;\n    return false;\n  };\n  return Object.keys(g).some(v);', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var a = R.int(50, 200), b = R.int(5, 40), c = R.int(5, 40); g.input(3, 'Dos hilos leen a la vez un saldo de ' + a + '. Uno resta ' + b + ' y luego el otro resta ' + c + ', ambos a partir del valor leído. ¿Cuál es el saldo final?', a - c, 'El último escribe ' + a + ' − ' + c + '; el retiro de ' + b + ' se pierde.'); });
    g.times(8, function (R) { var f = R.pick([10, 20, 25, 50]); g.input(3, 'Si el ' + f + '% de un programa es secuencial, ¿cuál es la mejora máxima según Amdahl, con infinitos núcleos?', 100 / f, '1 / ' + f / 100 + '.'); });
  } });

S('m8', 'm8.comp', { title: 'Compiladores e intérpretes',
  ask: '¿Qué fase o concepto de lenguajes es este?',
  lesson: `
> **La idea en simple.** Tu código es texto para la computadora. Para ejecutarlo, debe entenderlo como tú entiendes una frase: primero reconoces palabras, luego la gramática y al final el significado. Un compilador hace exactamente esos pasos.

## El camino del código
:::flow Código fuente | Análisis léxico (tokens) | Análisis sintáctico (AST) | Análisis semántico | Generación de código | Ejecución

## Tokens y árbol de sintaxis
~~~js
// Un lexer mínimo: de texto a tokens
function tokens(s) {
  return s.match(/\\d+|[+\\-*\\/()]/g);
}
console.log(tokens("2 + 3 * (4 - 1)"));

// Un evaluador recursivo sobre un árbol
const ast = { op: "+", izq: 2, der: { op: "*", izq: 3, der: 4 } };
function evaluar(n) {
  if (typeof n === "number") return n;
  const a = evaluar(n.izq), b = evaluar(n.der);
  return n.op === "+" ? a + b : a * b;
}
console.log(evaluar(ast));   // 14
~~~
El árbol captura la precedencia: «*» queda más abajo y se evalúa antes.

## Compilar o interpretar
| Modelo | Cómo | Ejemplos |
| Compilado | traduce todo a código máquina antes | C, Rust, Go |
| Interpretado | ejecuta línea por línea | Bash, Python base |
| Bytecode y JIT | bytecode y compila lo más usado en ejecución | Java, JavaScript (V8), C# |

## Tipos
- **Estático:** se revisa antes de correr (Java, TypeScript).
- **Dinámico:** se revisa al correr (JavaScript, Python).
- **Fuerte o débil:** cuánto convierte el lenguaje por su cuenta.

## Teoría detrás
Las **expresiones regulares** reconocen tokens (autómatas finitos). Las **gramáticas libres de contexto** definen la sintaxis. Una máquina de Turing define qué es computable, y el **problema de la parada** demuestra que hay cosas imposibles: ningún programa puede decidir en general si otro terminará.

## Puntos que no debes omitir
- Un **enlazador** une tus archivos compilados con las bibliotecas.
- Un linter y un formateador también usan el AST. Babel y TypeScript también.
- Conocer esto hace que los mensajes de error dejen de ser misteriosos.

! Error común: decir que un lenguaje "es" compilado o interpretado. Es una propiedad de la implementación.`,
  links: [['m1.cpu', 'el resultado final son instrucciones de máquina'], ['m4.trees', 'el AST es un árbol'], ['m4.stack', 'los analizadores usan pilas'], ['m3.vars', 'el análisis semántico revisa los tipos'], ['m3.rec', 'los evaluadores son recursivos porque la gramática lo es']],
  read: 'Nystrom, *Crafting Interpreters* (gratis en línea); Aho et al., *Compilers*.',
  terms: [
    ['Análisis léxico', 'fase que parte el texto del programa en tokens', ['«let x = 5» se vuelve LET, ID, IGUAL, NUM.', 'Se descartan los espacios y comentarios.', 'Se implementa con expresiones regulares.']],
    ['Análisis sintáctico', 'fase que comprueba la gramática y construye un árbol', ['«if ( { )» provoca un error de esta fase.', 'De una lista de tokens se obtiene un AST.', 'Decide que * va antes que +.']],
    ['AST', 'árbol que representa la estructura del programa', ['Prettier reformatea tu código a partir de él.', 'ESLint recorre sus nodos para buscar problemas.', '«a + b * c» tiene el * como hijo del +.']],
    ['Análisis semántico', 'fase que comprueba el significado, como tipos y declaraciones', ['TypeScript avisa que no se puede sumar un auto y un número.', 'Se informa de una variable sin declarar.', 'Un programa con gramática correcta se rechaza por tipos.']],
    ['JIT', 'compilación a código máquina durante la ejecución', ['V8 optimiza las funciones que más se usan.', 'Java arranca lento y luego va rápido.', 'Combina arranque rápido con velocidad a largo plazo.']],
    ['Tipado estático', 'revisión de los tipos antes de ejecutar el programa', ['Java no compila si pasas un String donde va un int.', 'El editor avisa el error antes de correr.', 'TypeScript añade esto a JavaScript.']],
    ['Problema de la parada', 'imposibilidad de decidir en general si un programa terminará', ['Ningún analizador detecta todos los bucles infinitos.', 'Turing lo demostró en 1936.', 'Por eso un linter da solo avisos parciales.']]
  ],
  q: [
    { o: 'Ordena las fases de un compilador.', s: ['Análisis léxico', 'Análisis sintáctico', 'Análisis semántico', 'Optimización', 'Generación de código'], e: 'Es el camino de texto a instrucciones.', l: 2 },
    ['Un olvido de paréntesis, ¿en qué fase se detecta?', 'Sintáctica', ['Léxica', 'Generación de código', 'En la ejecución de la CPU'], 'Los tokens son válidos, pero no forman una estructura válida.', 3],
    ['Una función nunca retorna un número pero se usa como si lo hiciera. ¿Qué lo detecta sin correr?', 'Un verificador de tipos estático', ['El lexer', 'La CPU', 'El bucle de eventos'], 'Es análisis semántico.', 3],
    ['¿Por qué ningún linter puede encontrar todos los bucles infinitos?', 'Porque el problema de la parada es indecidible', ['Porque falta memoria', 'Porque no conocen JavaScript', 'Porque requiere internet'], 'Turing lo demostró para el caso general.', 4],
    ['En «2 + 3 * 4», ¿cuál es la raíz del AST?', '+', ['*', '2', '4'], 'Lo que se evalúa al final queda arriba.', 4],
    { c: 'Escribe un lexer: «lexer(s)» devuelve tokens de números y operadores + − * / ( ), ignorando espacios. Los números van como texto.', f: 'lexer', p: ['s'], t: [[['2 + 31'], ['2', '+', '31']], [['(1*2)'], ['(', '1', '*', '2', ')']], [[''], []]], sol: '  return s.match(/\\d+|[+\\-*\\/()]/g) || [];', l: 3 },
    { c: 'Evalúa un AST: «evaluarAST(n)» donde n es un número o {op, izq, der} con + − * /.', f: 'evaluarAST', p: ['n'], t: [[[5], 5], [[{ op: '+', izq: 2, der: { op: '*', izq: 3, der: 4 } }], 14], [[{ op: '-', izq: 1, der: 1 }], 0]], sol: "  if (typeof n === 'number') return n;\n  const a = evaluarAST(n.izq), b = evaluarAST(n.der);\n  return n.op === '+' ? a + b : n.op === '-' ? a - b : n.op === '*' ? a * b : a / b;", l: 3 },
    { c: 'Escribe una calculadora completa: «calcular(s)» con + − * / y paréntesis, respetando precedencia, mediante un analizador recursivo.', f: 'calcular', p: ['s'], t: [[['2+3*4'], 14], [['(2+3)*4'], 20], [['10/2-1'], 4], [['7'], 7]], sol: "  const t = s.match(/\\d+|[+\\-*\\/()]/g);\n  let i = 0;\n  const prim = () => {\n    if (t[i] === '(') { i++; const v = expr(); i++; return v; }\n    return Number(t[i++]);\n  };\n  const term = () => {\n    let v = prim();\n    while (t[i] === '*' || t[i] === '/') { const o = t[i++], w = prim(); v = o === '*' ? v * w : v / w; }\n    return v;\n  };\n  const expr = () => {\n    let v = term();\n    while (t[i] === '+' || t[i] === '-') { const o = t[i++], w = term(); v = o === '+' ? v + w : v - w; }\n    return v;\n  };\n  return expr();", h: 'Haz una función por nivel de precedencia: expr llama a term y term llama a prim.', l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.input(2, 'Evalúa respetando el árbol de sintaxis: ' + a + ' + ' + b + ' * ' + c, a + b * c, 'El * queda más abajo y se evalúa primero.'); });
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.input(2, 'Evalúa: (' + a + ' + ' + b + ') * ' + c, (a + b) * c, 'Los paréntesis cambian la forma del árbol.'); });
    g.times(8, function (R) { var n = R.int(2, 9), m = R.int(2, 9); var e = 'let x = ' + n + ' + ' + m + ';'; g.input(3, '¿Cuántos tokens tiene esta línea? Cuenta palabras clave, identificadores, operadores, números y punto y coma.', 7, 'let, x, =, ' + n + ', +, ' + m + ', ;', e); });
  } });
})();
