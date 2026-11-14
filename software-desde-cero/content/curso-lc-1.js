(function () {
var M = SDC.M, S = SDC.S;
M('lc', { title: 'Lenguajes de Programación y Compiladores', prof: true,
  desc: 'Curso completo sobre cómo se diseñan los lenguajes de programación y cómo se traducen a algo que la máquina ejecuta. Se estudian los paradigmas y criterios de diseño, el análisis léxico y sintáctico, el análisis semántico y las tablas de símbolos, los sistemas de tipos y la inferencia, la programación funcional y el cálculo lambda, el entorno de ejecución y la recolección de basura, el código intermedio y la generación de código, y la optimización y los compiladores JIT. Al terminar, sabrás construir un intérprete y un compilador pequeños.',
  thread: 'PatioApp gana un lenguaje propio: un pequeño lenguaje de reglas de tarifas («si horas > 24 entonces tarifa = base * 2») que los administradores escriben sin programar. A lo largo del curso se construye su analizador léxico, su analizador sintáctico, sus comprobaciones semánticas y de tipos, un intérprete funcional, un compilador a código de pila y sus optimizaciones.',
  books: '*Compilers: Principles, Techniques, and Tools* ("libro del dragón", Aho, Lam, Sethi y Ullman), *Engineering a Compiler* (Cooper y Torczon), *Crafting Interpreters* (Nystrom, libre en craftinginterpreters.com), *Types and Programming Languages* (Pierce), *Structure and Interpretation of Computer Programs* (Abelson y Sussman), *Programming Language Pragmatics* (Scott).',
  uni: 'Stanford CS143 *Compilers* y CS242 *Programming Languages*; MIT 6.1100 (antes 6.035) *Computer Language Engineering* y 6.001 (con SICP); Berkeley CS164; CMU 15-411 *Compiler Design* y 15-312. En Perú: Lenguajes de Programación, Teoría de Lenguajes y Compiladores (UNI, PUCP, UNMSM, UTEC, UPC).',
  capstone: { t: 'El lenguaje de tarifas de PatioApp',
    goal: 'Diseñar y construir un lenguaje de dominio específico completo, desde el texto hasta su ejecución optimizada.',
    steps: ['Define la gramática del lenguaje de reglas de tarifas en BNF, con expresiones aritméticas, comparaciones, condiciones y asignaciones.', 'Implementa el analizador léxico y un analizador sintáctico descendente recursivo que produzca un árbol sintáctico abstracto con mensajes de error útiles.', 'Agrega análisis semántico (variables no declaradas, ámbitos) y verificación de tipos.', 'Implementa un intérprete que recorra el árbol y un compilador a código de una máquina de pila con su propio ejecutor.', 'Agrega plegado de constantes y eliminación de código muerto, y compara el rendimiento del intérprete y del código compilado.'],
    deliver: 'El código del lenguaje con pruebas, su especificación, ejemplos de reglas reales y el informe de rendimiento.' } });

S('lc', 'lc.paradigm', { title: 'Paradigmas, diseño e implementación de lenguajes',
  ask: '¿Qué concepto de diseño o implementación de lenguajes se aplica?',
  lesson: `
> **La idea en simple.** Los lenguajes de programación son herramientas con filosofías distintas. Uno te pide que digas paso a paso qué hacer, como una receta; otro, que describas qué quieres, como un pedido en un restaurante; otro, que combines funciones como piezas de un mecanismo. Conocer varios no es coleccionar sintaxis: cada paradigma cambia la forma en que piensas un problema.

## Por qué estudiar lenguajes
Alan Perlis, primer ganador del Premio Turing, escribió en sus *Epigrams on Programming* (1982): "un lenguaje que no afecta la forma en que piensas sobre la programación no vale la pena conocerlo". Robert Sebesta, en *Concepts of Programming Languages*, da razones prácticas: ampliar la capacidad de expresar ideas, elegir mejor el lenguaje para cada tarea, aprender lenguajes nuevos con facilidad, entender por qué un programa se comporta como lo hace y diseñar los propios (los **lenguajes de dominio específico**, como SQL, las expresiones regulares o un lenguaje de reglas de tarifas).

## Una historia en pocas fechas
| Año | Lenguaje | Aporte |
| 1957 | FORTRAN (John Backus, IBM) | primer lenguaje de alto nivel de uso masivo; demostró que un compilador podía producir código eficiente |
| 1958 | LISP (John McCarthy, MIT) | funciones como datos, recursión, recolección de basura |
| 1959 | COBOL (comité CODASYL, con influencia de Grace Hopper) | programas de negocios legibles; aún corre en bancos |
| 1960 | ALGOL 60 | estructura de bloques, ámbito léxico y la notación BNF para describir la sintaxis |
| 1967 | Simula 67 (Ole-Johan Dahl y Kristen Nygaard) | clases, objetos y herencia: el primer lenguaje orientado a objetos |
| 1972 | C (Dennis Ritchie) y Smalltalk (Alan Kay y otros) | programación de sistemas; objetos y mensajes en un entorno vivo |
| 1972-1973 | Prolog y ML | programación lógica; tipos inferidos y polimorfismo |
| 1990 | Haskell | funcional puro con evaluación perezosa |
| 1995 | Java y JavaScript | máquina virtual portable; el lenguaje de la web (Brendan Eich escribió el primer prototipo en unos diez días) |
| 2015 | Rust 1.0 | seguridad de memoria sin recolector, mediante propiedad y préstamos |
John Backus dio en 1977 su conferencia del Premio Turing titulada *Can Programming Be Liberated from the von Neumann Style?*, una crítica a su propio FORTRAN y una defensa del estilo funcional que influyó en décadas de investigación.

## Los paradigmas
- **Imperativo:** el programa es una secuencia de órdenes que cambian el estado (variables, memoria). Refleja la máquina de von Neumann. Variante **procedimental**: organizado en procedimientos (C, Pascal).
- **Orientado a objetos:** el estado y el comportamiento se agrupan en objetos que se comunican por mensajes (Smalltalk, Java, C#, Python).
- **Funcional:** el programa es una composición de funciones sin efectos secundarios; se evita mutar (Haskell, OCaml, Elixir, Clojure, y estilos funcionales en JavaScript).
- **Lógico:** se declaran hechos y reglas y el sistema busca soluciones (Prolog, Datalog).
- **Declarativo** en general: se describe el resultado, no el procedimiento (SQL, HTML, expresiones regulares).
La mayoría de los lenguajes actuales son **multiparadigma**: Python, JavaScript, Scala, Kotlin o C# combinan imperativo, objetos y funcional.
~~~js
// El mismo cálculo en tres estilos: suma de los cuadrados de los números pares
const datos = [3, 8, 5, 6, 2, 9];
let total = 0;                                               // imperativo: estado que cambia
for (let i = 0; i < datos.length; i++) if (datos[i] % 2 === 0) total += datos[i] * datos[i];
const funcional = datos.filter(x => x % 2 === 0).map(x => x * x).reduce((a, b) => a + b, 0);   // composición de funciones
class Acumulador { constructor() { this.t = 0; } agregar(x) { if (x % 2 === 0) this.t += x * x; return this; } }   // objetos
const obj = datos.reduce((a, x) => a.agregar(x), new Acumulador()).t;
console.log(total, funcional, obj);
~~~

## Criterios de diseño
Sebesta propone evaluar un lenguaje por:
- **Legibilidad:** qué tan fácil es entender un programa ajeno. Influyen la simplicidad, la **ortogonalidad** (pocas construcciones que se combinan de forma uniforme) y una sintaxis clara.
- **Facilidad de escritura:** qué tan cómodo es expresar una idea; a veces choca con la legibilidad (un operador muy compacto se escribe rápido y se lee con dificultad).
- **Confiabilidad:** que el lenguaje ayude a evitar errores: tipos, manejo de excepciones, ausencia de punteros colgantes.
- **Costo:** de aprender, de escribir, de compilar, de ejecutar y de mantener.
Toda decisión de diseño es un **compromiso**: C prioriza el control y la eficiencia a costa de la seguridad de memoria; Python, la legibilidad y la productividad a costa de la velocidad; Rust, la seguridad y la eficiencia a costa de una curva de aprendizaje más empinada.

## Sintaxis y semántica
- La **sintaxis** define qué programas están bien formados: qué secuencias de símbolos son válidas. Se describe con gramáticas (BNF), como verás en las unidades de análisis léxico y sintáctico.
- La **semántica** define qué significan. Hay tres enfoques formales: **operacional** (cómo se ejecuta paso a paso en una máquina abstracta), **denotacional** (a qué objeto matemático corresponde cada programa) y **axiomática** (qué se puede demostrar sobre él, como las ternas de Hoare que viste en métodos formales).
Muchos errores de los lenguajes reales vienen de semánticas mal definidas o sorprendentes: en JavaScript, «[] + {}» da el texto "[object Object]" por sus reglas de conversión implícita.

## Cómo se implementa un lenguaje
- **Compilación:** un compilador traduce todo el programa a código de máquina antes de ejecutarlo (C, C++, Rust, Go). Ejecución rápida, pero hay que compilar para cada plataforma.
- **Interpretación:** un intérprete lee el programa y lo ejecuta directamente, instrucción por instrucción o recorriendo su árbol. Inicio inmediato y portabilidad, pero ejecución más lenta.
- **Híbridos con máquina virtual:** el programa se compila a un **código intermedio** (*bytecode*) que ejecuta una máquina virtual: Java con la JVM, C# con .NET, Python con CPython.
- **Compilación justo a tiempo (JIT):** la máquina virtual detecta el código que más se ejecuta y lo compila a código de máquina mientras el programa corre, con información real de uso (V8 en JavaScript, HotSpot en Java, PyPy en Python).
Un compilador clásico tiene una **parte frontal** (análisis léxico, sintáctico y semántico, que depende del lenguaje fuente), un **código intermedio** y una **parte final** (optimización y generación de código, que depende de la máquina). Así, n lenguajes y m máquinas necesitan n + m piezas en lugar de n × m compiladores: es la idea de LLVM. Las siguientes unidades recorren cada fase.

## Arrancar un lenguaje desde sí mismo
Una pregunta curiosa: si el compilador de C está escrito en C, ¿cómo se compiló el primero? Con **autoarranque** (*bootstrapping*): se escribe una primera versión en otro lenguaje (o en ensamblador), se usa para compilar la versión escrita en el propio lenguaje, y desde entonces el compilador se compila a sí mismo. Ken Thompson mostró en su conferencia del Premio Turing de 1984, *Reflections on Trusting Trust*, el lado oscuro de esta idea: un compilador modificado podía insertar una puerta trasera en los programas que compilaba, e incluso en las nuevas versiones de sí mismo, sin que quedara rastro en ningún código fuente. Es un recordatorio de que confiar en el software implica confiar en toda su cadena de herramientas.

## Ejemplo resuelto: elegir el paradigma para las tarifas de PatioApp
Las tarifas de PatioApp cambian con frecuencia y las definen administradores que no programan. Opciones:
- Programarlas en el código de la aplicación (imperativo): cada cambio exige un desarrollador y un despliegue.
- Guardarlas como tablas de configuración: sirve para valores, pero no para reglas como "si es camión y pasa de 24 horas, el doble menos un descuento".
- Crear un **lenguaje de dominio específico** declarativo: «si tipo = "camion" y horas > 24 entonces tarifa = base * 2 - 10». Es legible para el negocio, se valida antes de usarse y se ejecuta de forma segura (sin acceso a archivos ni red).
Se elige la tercera, y el resto del curso construye ese lenguaje: sus reglas son expresiones puras (sin efectos), un buen caso para un estilo funcional, y su implementación empieza como un intérprete de árbol y termina compilada a código de pila.`,
  links: [['m3.func', 'las funciones del curso de programación son la base de todos los paradigmas'], ['m5.oop1', 'la programación orientada a objetos es uno de los paradigmas principales'], ['m8.comp', 'esta unidad profundiza la introducción a compiladores del ciclo 3']],
  read: 'Sebesta, *Concepts of Programming Languages*, capítulos 1 y 2; Scott, *Programming Language Pragmatics*, capítulo 1; Backus (1978); Perlis (1982).',
  terms: [
    ['Paradigma de programación', 'estilo fundamental de estructurar programas y razonar sobre ellos', ['Imperativo, orientado a objetos, funcional y lógico.', 'La mayoría de los lenguajes actuales combinan varios.', 'Cambia la forma de pensar un problema.']],
    ['Programación imperativa', 'paradigma en que el programa es una secuencia de órdenes que modifican el estado', ['Un bucle for que acumula en una variable.', 'Refleja la máquina de von Neumann.', 'C y Pascal son ejemplos.']],
    ['Programación declarativa', 'estilo en que se describe el resultado deseado y no el procedimiento para obtenerlo', ['Una consulta SQL.', 'Una expresión regular.', 'El lenguaje de reglas de tarifas.']],
    ['Ortogonalidad', 'propiedad de un lenguaje de tener pocas construcciones que se combinan de manera uniforme y sin excepciones', ['Cualquier expresión puede ir donde se espera un valor.', 'Mejora la legibilidad.', 'Demasiada puede volver confusos los programas.']],
    ['Lenguaje de dominio específico', 'lenguaje diseñado para un tipo de problema concreto', ['SQL para consultas.', 'Las expresiones regulares para texto.', 'Un lenguaje de reglas de tarifas.']],
    ['Compilador', 'programa que traduce un programa completo a otro lenguaje, normalmente código de máquina, antes de ejecutarlo', ['GCC traduce C a código de máquina.', 'Detecta errores antes de ejecutar.', 'Tiene parte frontal, intermedia y final.']],
    ['Intérprete', 'programa que ejecuta directamente otro programa sin traducirlo antes por completo', ['Recorre el árbol del programa y evalúa cada nodo.', 'Arranca de inmediato.', 'Suele ser más lento que el código compilado.']],
    ['Compilación justo a tiempo', 'técnica que compila a código de máquina, durante la ejecución, las partes del programa que más se usan', ['V8 compila las funciones calientes de JavaScript.', 'Aprovecha información real de uso.', 'HotSpot la usa en Java.']]
  ],
  q: [
    ['¿Qué lenguaje introdujo clases, objetos y herencia por primera vez?', 'Simula 67', ['FORTRAN', 'LISP', 'C'], 'Dahl y Nygaard, Premio Turing 2001.', 2],
    ['¿Qué aportó ALGOL 60 a la descripción de lenguajes?', 'La notación BNF para la sintaxis', ['La recolección de basura', 'Las clases', 'Las expresiones regulares'], 'Backus y Naur.', 2],
    ['Una consulta SQL que pide "las unidades del patio 3" sin decir cómo buscarlas es un ejemplo de estilo…', 'declarativo', ['imperativo', 'orientado a objetos', 'ensamblador'], 'Describe el resultado, no el procedimiento.', 1],
    ['¿Qué ventaja da separar un compilador en parte frontal, intermedia y final?', 'Combinar n lenguajes y m máquinas con n + m piezas en lugar de n × m compiladores', ['Compilar más rápido siempre', 'Eliminar el análisis léxico', 'No necesitar código intermedio'], 'Es la idea detrás de LLVM.', 3],
    ['¿Qué hace un compilador JIT?', 'Compila a código de máquina, durante la ejecución, el código que más se usa', ['Interpreta todo sin compilar', 'Compila antes de distribuir el programa', 'Traduce entre lenguajes humanos'], 'Aprovecha información real de uso.', 2],
    ['¿Qué criterio de Sebesta se ve afectado por un operador muy compacto y poco intuitivo?', 'La legibilidad', ['El costo de compilación', 'La portabilidad del hardware', 'La velocidad de red'], 'Se escribe rápido pero se lee con dificultad.', 2],
    ['¿Qué enfoque de semántica describe cómo se ejecuta un programa paso a paso en una máquina abstracta?', 'Operacional', ['Denotacional', 'Axiomática', 'Léxica'], 'La denotacional asigna objetos matemáticos; la axiomática, propiedades demostrables.', 3],
    { tf: 'Python, JavaScript y Kotlin son lenguajes multiparadigma.', v: true, e: 'Combinan imperativo, objetos y funcional.', l: 1 },
    { tf: 'Un intérprete siempre es más lento que cualquier compilador en cualquier programa.', v: false, e: 'Suele serlo, pero depende; además un JIT puede igualar o superar al código compilado de antemano en algunos casos.', l: 2 },
    { c: 'Escribe «sumaCuadradosPares(lista)» en estilo funcional con filter, map y reduce.', f: 'sumaCuadradosPares', p: ['lista'], t: [[[[3, 8, 5, 6, 2, 9]], 104], [[[]], 0], [[[1, 3]], 0], [[[2]], 4]], sol: '  return lista.filter(x => x % 2 === 0).map(x => x * x).reduce((a, b) => a + b, 0);', l: 1 },
    { c: 'Escribe «aplanar(lista)» de forma recursiva: convierte una lista con listas anidadas en una sola lista plana.', f: 'aplanar', p: ['lista'], t: [[[[1, [2, [3, 4]], 5]], [1, 2, 3, 4, 5]], [[[]], []], [[[[[[]]]]], []]], sol: '  return lista.reduce((a, x) => a.concat(Array.isArray(x) ? aplanar(x) : [x]), []);', l: 2 }
  ],
  gen: function (g) {
    var len = [['FORTRAN', '1957'], ['LISP', '1958'], ['COBOL', '1959'], ['ALGOL 60', '1960'], ['Simula 67', '1967'], ['C', '1972'], ['Haskell', '1990'], ['Java', '1995'], ['Rust 1.0', '2015']];
    var años = len.map(function (l) { return l[1]; });
    len.forEach(function (l) { g.mcq(2, '¿En qué año apareció ' + l[0] + '?', l[1], g.R.sample(años.filter(function (a) { return a !== l[1]; }), 3), 'Hitos de la historia de los lenguajes.'); });
    var par = [['Haskell', 'Funcional'], ['Prolog', 'Lógico'], ['Smalltalk', 'Orientado a objetos'], ['C', 'Imperativo'], ['SQL', 'Declarativo'], ['Elixir', 'Funcional'], ['Datalog', 'Lógico'], ['Pascal', 'Imperativo']];
    par.forEach(function (p) { g.mcq(2, '¿A qué paradigma se asocia principalmente ' + p[0] + '?', p[1], ['Funcional', 'Lógico', 'Orientado a objetos', 'Imperativo', 'Declarativo'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Cada lenguaje nació con una filosofía dominante.'); });
    var imp = [['C compilado con GCC', 'Compilación anticipada'], ['Un intérprete que recorre el árbol del programa', 'Interpretación'], ['Java en la JVM con HotSpot', 'Bytecode con JIT'], ['JavaScript en V8', 'Bytecode con JIT'], ['Rust con rustc', 'Compilación anticipada']];
    imp.forEach(function (i) { g.mcq(2, '¿Qué estrategia de implementación usa ' + i[0] + '?', i[1], ['Compilación anticipada', 'Interpretación', 'Bytecode con JIT', 'Traducción manual'].filter(function (x) { return x !== i[1]; }), 'Compilar, interpretar o combinar con JIT.'); });
  },
  checks: [
    ['¿Por qué conviene aprender varios paradigmas aunque uses uno en el trabajo?', 'Porque cada paradigma ofrece formas distintas de descomponer problemas, y conocerlas amplía las soluciones que puedes imaginar y la calidad del código en cualquier lenguaje.'],
    ['Escribe la misma operación en estilo imperativo y funcional.', 'Imperativo: un bucle que acumula en una variable; funcional: filter, map y reduce sin mutar estado.'],
    ['Explica dos compromisos de diseño de lenguajes reales.', 'C cambia seguridad de memoria por control y eficiencia; Python cambia velocidad por legibilidad y productividad.'],
    ['Diferencia sintaxis y semántica.', 'La sintaxis define qué programas están bien formados; la semántica, qué significan y cómo se comportan.'],
    ['¿Por qué un lenguaje de dominio específico es buena idea para las tarifas de PatioApp?', 'Porque permite que el negocio exprese reglas cambiantes de forma legible, validada y segura, sin desplegar código cada vez.']
  ],
  cites: ['Sebesta, R. (2019). *Concepts of Programming Languages* (12.ª ed.). Pearson.', 'Scott, M. (2015). *Programming Language Pragmatics* (4.ª ed.). Morgan Kaufmann.', 'Backus, J. (1978). Can Programming Be Liberated from the von Neumann Style? A Functional Style and Its Algebra of Programs. *Communications of the ACM*, 21(8).', 'Perlis, A. (1982). Epigrams on Programming. *ACM SIGPLAN Notices*, 17(9).', 'Dahl, O.-J. y Nygaard, K. (1966). SIMULA: An ALGOL-based Simulation Language. *Communications of the ACM*, 9(9).', 'Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.). Pearson.', 'Thompson, K. (1984). Reflections on Trusting Trust. *Communications of the ACM*, 27(8).'],
  project: { t: 'Un problema en cuatro paradigmas',
    goal: 'Resolver el mismo problema en varios paradigmas y comparar.',
    steps: ['Elige un problema mediano (por ejemplo, calcular la tarifa y el ranking de clientes de un patio) y resuélvelo en estilo imperativo.', 'Resuélvelo en estilo orientado a objetos y en estilo funcional sin mutación.', 'Resuelve una parte en un lenguaje lógico (Prolog en línea) o declarativo (SQL).', 'Compara las versiones en líneas, legibilidad, facilidad de prueba y facilidad de cambio ante un requisito nuevo.', 'Escribe un ensayo de dos páginas sobre qué aprendiste de cada paradigma.'],
    deliver: 'Las cuatro versiones, sus pruebas y el ensayo.' },
  hito: ['Escribe la especificación informal del lenguaje de reglas de tarifas de PatioApp con diez ejemplos de reglas reales y sus resultados esperados.', 'Implementa una de esas reglas en estilo imperativo y en estilo funcional dentro de PatioApp, y justifica cuál se parece más al lenguaje que vas a construir.']
});

S('lc', 'lc.lex', { title: 'Análisis léxico',
  ask: '¿Qué concepto de análisis léxico se aplica?',
  lesson: `
> **La idea en simple.** Antes de entender una oración, separas las letras en palabras y los signos de puntuación. Un analizador léxico hace eso con el código: convierte una tira de caracteres como «tarifa=base*2» en una secuencia de piezas con nombre: identificador «tarifa», signo igual, identificador «base», por, número 2.

## Las fases de un compilador
El libro del dragón de Alfred Aho, Monica Lam, Ravi Sethi y Jeffrey Ullman (Aho y Ullman recibieron el Premio Turing 2020) organiza un compilador en fases:
1. **Análisis léxico:** caracteres → tokens.
2. **Análisis sintáctico:** tokens → árbol sintáctico.
3. **Análisis semántico:** comprobaciones de tipos y nombres sobre el árbol.
4. **Generación de código intermedio.**
5. **Optimización.**
6. **Generación de código** para la máquina destino.
Todas comparten una **tabla de símbolos** con información de los nombres del programa y un mecanismo de **manejo de errores**. Esta unidad trata la primera fase.

## Tokens, lexemas y patrones
- Un **token** es una categoría con nombre: IDENTIFICADOR, NUMERO, MAS, SI.
- Un **lexema** es el texto concreto que corresponde a un token: «tarifa», «24», «+».
- Un **patrón** describe qué lexemas pertenecen a cada token, normalmente con una **expresión regular**: un identificador es una letra o guion bajo seguida de letras, dígitos o guiones bajos: «[A-Za-z_][A-Za-z0-9_]*»; un número entero es «[0-9]+».
El analizador entrega al siguiente nivel pares (token, valor), junto con la **posición** (línea y columna) para poder reportar errores. Descarta los espacios en blanco y los comentarios (salvo en lenguajes donde la sangría es significativa, como Python, cuyo analizador emite tokens INDENT y DEDENT).

## De expresiones regulares a autómatas
Las expresiones regulares son cómodas para escribir patrones, pero se ejecutan con **autómatas finitos**, que viste en Teoría de la Computación:
1. Cada expresión regular se convierte en un **autómata finito no determinista** (AFN) con la **construcción de Thompson** (Ken Thompson, 1968), que arma el autómata pieza por pieza para la concatenación, la unión y la estrella.
2. El AFN se convierte en un **autómata determinista** (AFD) con la **construcción de subconjuntos**: cada estado del AFD representa un conjunto de estados del AFN.
3. El AFD se **minimiza** para tener la menor cantidad de estados.
Un AFD reconoce un lexema leyendo cada carácter una sola vez, con una consulta a una tabla por carácter: el análisis léxico es **lineal** en el tamaño del programa. Herramientas como **lex** (Mike Lesk y Eric Schmidt, 1975), su sucesor **flex** o **re2c** generan el analizador a partir de una lista de patrones.

## Reglas para resolver ambigüedades
Al leer «<=» o «tarifa1», ¿se emite «<» y luego «=», o «<=»? ¿«tarifa» y luego «1»? Los analizadores siguen dos reglas:
- **Coincidencia más larga** (*maximal munch*): se toma el lexema más largo posible que coincida con algún patrón. «<=» es un solo token y «tarifa1» un solo identificador.
- **Prioridad por orden:** si el lexema más largo coincide con varios patrones, gana el que se declaró primero. Por eso las **palabras reservadas** («si», «entonces») se declaran antes que el patrón de identificador, o bien se reconoce un identificador y luego se busca en una tabla de palabras reservadas.
La coincidencia más larga explica algunas sorpresas históricas: en C++ antiguo, «vector<vector<int>>» fallaba porque «>>» se leía como el operador de desplazamiento; C++11 cambió la regla para ese caso.

## Un analizador escrito a mano
Muchos compiladores reales (GCC, Clang, el compilador de Go, V8) escriben el analizador léxico a mano, porque es simple, rápido y permite buenos mensajes de error. La estructura es un bucle con un "cursor": se mira el carácter actual y se decide qué token empieza.
~~~js
function tokenizar(fuente) {
  const tokens = [], reservadas = new Set(['si', 'entonces', 'y', 'o']);
  let i = 0;
  while (i < fuente.length) {
    const c = fuente[i];
    if (/\s/.test(c)) { i++; continue; }                                         // espacios
    if (/[0-9]/.test(c)) { let j = i; while (/[0-9.]/.test(fuente[j] || '')) j++; tokens.push(['NUM', Number(fuente.slice(i, j))]); i = j; continue; }
    if (/[A-Za-z_]/.test(c)) { let j = i; while (/[A-Za-z0-9_]/.test(fuente[j] || '')) j++; const p = fuente.slice(i, j); tokens.push([reservadas.has(p) ? p.toUpperCase() : 'ID', p]); i = j; continue; }
    const dos = fuente.slice(i, i + 2);
    if (['<=', '>=', '==', '!='].includes(dos)) { tokens.push(['OP', dos]); i += 2; continue; }   // coincidencia más larga
    if ('+-*/<>=()'.includes(c)) { tokens.push(['OP', c]); i++; continue; }
    throw new Error('carácter inesperado «' + c + '» en la posición ' + i);
  }
  return tokens;
}
console.log(JSON.stringify(tokenizar('si horas >= 24 entonces tarifa = base * 2')));
~~~

## Errores léxicos
Un error léxico ocurre cuando ningún patrón coincide: un carácter inesperado («@» en un lenguaje que no lo usa), una cadena sin cerrar o un número mal formado. Un buen analizador:
- Indica la **posición exacta** y muestra la línea con un marcador.
- Intenta **recuperarse** (saltar el carácter y seguir) para informar varios errores de una vez en lugar de detenerse en el primero.
- Da sugerencias cuando puede ("¿quisiste escribir «>=»?").
Los mensajes de error son parte de la experiencia de un lenguaje: Elm y Rust se hicieron conocidos en buena medida por la claridad de los suyos.

## El analizador léxico en el flujo del compilador
En la práctica, el analizador léxico no produce una lista completa de antemano: el analizador sintáctico le pide **el siguiente token** cada vez que lo necesita, y a veces mira uno o dos por adelantado. También cumple tareas de apoyo:
- **Interna** los identificadores: guarda cada nombre una sola vez en una tabla y entrega un número, para comparar nombres en tiempo constante en las fases siguientes.
- Convierte los literales a su valor: «0x1F» a 31, «3.5e2» a 350, y decodifica las secuencias de escape de las cadenas («\n» a un salto de línea).
- Registra la posición de cada token para los mensajes de error y para las herramientas de depuración.
Algunos lenguajes complican esta fase: en C, distinguir un nombre de tipo de un nombre de variable requiere información de la tabla de símbolos (el "truco del lexer" de los compiladores de C), y en JavaScript «/» puede iniciar una división o una expresión regular según el contexto, de modo que el analizador léxico necesita ayuda del sintáctico. Un buen diseño de lenguaje evita que el análisis léxico dependa del contexto.

## Más allá del compilador
Las mismas técnicas aparecen en todas partes: el resaltado de sintaxis de los editores, los formateadores de código, los analizadores de archivos de configuración, de JSON o de CSV, y los motores de expresiones regulares. Russ Cox mostró en 2007 (*Regular Expression Matching Can Be Simple And Fast*) que los motores basados en autómatas, como el de Thompson, garantizan tiempo lineal, mientras que muchos motores populares con retroceso pueden tardar un tiempo exponencial con ciertos patrones: es la base de los ataques de **denegación de servicio por expresiones regulares** (ReDoS), como el que dejó fuera de línea a Cloudflare durante 27 minutos en julio de 2019.

## Ejemplo resuelto: los tokens de una regla de tarifa
La regla «si tipo == "camion" y horas > 24 entonces tarifa = base * 2 - 10» produce:
SI · ID(tipo) · OP(==) · CADENA(camion) · Y · ID(horas) · OP(>) · NUM(24) · ENTONCES · ID(tarifa) · OP(=) · ID(base) · OP(*) · NUM(2) · OP(-) · NUM(10).
Decisiones de diseño tomadas: las palabras reservadas se reconocen como identificadores y se buscan en una tabla; «==» se distingue de «=» por coincidencia más larga; las cadenas van entre comillas dobles y un salto de línea dentro de una cadena es un error con un mensaje claro ("la cadena que empieza en la columna 9 no se cerró"). Cada token guarda su línea y columna para que los errores de las fases siguientes también señalen el lugar exacto. Además, los números admiten decimales («0.5») para tarifas fraccionarias.`,
  links: [['teo.auto', 'los analizadores léxicos son autómatas finitos generados desde expresiones regulares'], ['lc.parse', 'los tokens son la entrada del analizador sintáctico'], ['m16.owasp', 'las expresiones regulares mal diseñadas permiten ataques ReDoS']],
  read: 'Aho, Lam, Sethi y Ullman, capítulos 1 y 3; Nystrom, *Crafting Interpreters*, capítulo 4 (Scanning); Thompson (1968); Cox (2007).',
  terms: [
    ['Token', 'categoría con nombre que el analizador léxico asigna a un fragmento del código', ['IDENTIFICADOR, NUMERO o MAS.', 'Es la unidad que recibe el analizador sintáctico.', 'Suele llevar su posición en el código.']],
    ['Lexema', 'texto concreto del programa que corresponde a un token', ['«tarifa» es un lexema del token IDENTIFICADOR.', '«24» es un lexema del token NUMERO.', 'Varios lexemas pueden tener el mismo token.']],
    ['Patrón léxico', 'descripción, normalmente con una expresión regular, de los lexemas de un token', ['[0-9]+ para enteros.', '[A-Za-z_][A-Za-z0-9_]* para identificadores.', 'Se convierte en un autómata.']],
    ['Construcción de Thompson', 'método para convertir una expresión regular en un autómata finito no determinista pieza por pieza', ['Ken Thompson la publicó en 1968.', 'Maneja concatenación, unión y estrella.', 'Garantiza búsquedas en tiempo lineal.']],
    ['Construcción de subconjuntos', 'método para convertir un autómata no determinista en uno determinista equivalente', ['Cada estado del AFD es un conjunto de estados del AFN.', 'El AFD resultante lee cada carácter una vez.', 'Puede producir muchos estados.']],
    ['Coincidencia más larga', 'regla que toma el lexema más largo posible que coincida con algún patrón', ['«<=» es un token y no dos.', '«tarifa1» es un solo identificador.', 'Causó el problema de «>>» en C++ antiguo.']],
    ['Palabra reservada', 'identificador que el lenguaje reserva con un significado fijo y no puede usarse como nombre', ['«si» y «entonces» en el lenguaje de tarifas.', 'if y while en JavaScript.', 'Se reconoce antes que los identificadores comunes.']],
    ['ReDoS', 'ataque que aprovecha expresiones regulares con retroceso exponencial para agotar el procesador', ['Una expresión como (a+)+ con una entrada larga.', 'Dejó fuera de línea a Cloudflare en 2019.', 'Los motores basados en autómatas lo evitan.']]
  ],
  q: [
    ['¿Qué produce el analizador léxico?', 'Una secuencia de tokens con sus valores y posiciones', ['Un árbol sintáctico', 'Código de máquina', 'Una tabla de tipos'], 'Es la primera fase del compilador.', 1],
    ['Por la regla de coincidencia más larga, ¿cómo se separa «x<=y»?', 'ID(x), OP(<=), ID(y)', ['ID(x), OP(<), OP(=), ID(y)', 'Un solo identificador', 'Un error léxico'], 'Se toma el lexema más largo posible.', 2],
    ['¿Por qué las palabras reservadas se declaran antes que el patrón de identificador?', 'Porque, ante lexemas de igual longitud, gana el patrón declarado primero', ['Porque son más largas', 'Porque no tienen letras', 'Porque se eliminan antes'], 'Es la regla de prioridad por orden.', 3],
    ['¿Qué ventaja tiene convertir las expresiones regulares en un AFD?', 'Reconocer los lexemas en tiempo lineal, mirando cada carácter una vez', ['Hacer el compilador más corto', 'Eliminar las palabras reservadas', 'Optimizar el código final'], 'Una consulta a tabla por carácter.', 3],
    ['¿Qué causó el problema con «vector<vector<int>>» en C++ antiguo?', 'La coincidencia más larga leía «>>» como un solo operador', ['Un error del enlazador', 'La falta de genéricos', 'Un error de tipos'], 'C++11 cambió la regla para ese caso.', 4],
    ['¿Qué tipo de motor de expresiones regulares evita los ataques ReDoS?', 'Uno basado en autómatas, como el de Thompson', ['Uno con retroceso', 'Cualquiera con caché', 'Uno escrito en C'], 'Garantiza tiempo lineal.', 4],
    ['¿Qué hace un buen analizador ante un carácter inesperado?', 'Informa la posición exacta y, si puede, sigue para reportar más errores', ['Se detiene sin mensaje', 'Ignora el carácter en silencio', 'Lo reemplaza por un espacio sin avisar'], 'La recuperación permite informar varios errores.', 2],
    { tf: 'El analizador léxico de Python emite tokens especiales para los cambios de sangría.', v: true, e: 'INDENT y DEDENT, porque la sangría es parte de la sintaxis.', l: 3 },
    { tf: 'Los comentarios del código llegan como tokens al analizador sintáctico.', v: false, e: 'Normalmente el analizador léxico los descarta.', l: 1 },
    { o: 'Ordena las fases clásicas de un compilador.', s: ['Análisis léxico', 'Análisis sintáctico', 'Análisis semántico', 'Código intermedio', 'Optimización', 'Generación de código'], e: 'Organización del libro del dragón.', l: 2 },
    { c: 'Escribe «tokenizar(fuente)»: devuelve una lista de [tipo, valor] con "NUM" (enteros, valor numérico), "ID" (identificadores), "OP" (operadores de uno o dos caracteres: + - * / ( ) = < > <= >= == !=), ignorando espacios.', f: 'tokenizar', p: ['fuente'], t: [[['tarifa = base * 2'], [['ID', 'tarifa'], ['OP', '='], ['ID', 'base'], ['OP', '*'], ['NUM', 2]]], [['x<=10'], [['ID', 'x'], ['OP', '<='], ['NUM', 10]]], [['(a1+b_2)'], [['OP', '('], ['ID', 'a1'], ['OP', '+'], ['ID', 'b_2'], ['OP', ')']]], [[''], []]], sol: '  const t = [];\n  let i = 0;\n  while (i < fuente.length) {\n    const c = fuente[i];\n    if (/\\s/.test(c)) { i++; continue; }\n    if (/[0-9]/.test(c)) { let j = i; while (/[0-9]/.test(fuente[j] || "")) j++; t.push(["NUM", Number(fuente.slice(i, j))]); i = j; continue; }\n    if (/[A-Za-z_]/.test(c)) { let j = i; while (/[A-Za-z0-9_]/.test(fuente[j] || "")) j++; t.push(["ID", fuente.slice(i, j)]); i = j; continue; }\n    const d = fuente.slice(i, i + 2);\n    if (["<=", ">=", "==", "!="].includes(d)) { t.push(["OP", d]); i += 2; continue; }\n    t.push(["OP", c]); i++;\n  }\n  return t;', h: 'Mira el carácter actual: según sea espacio, dígito, letra u operador, consume el lexema completo.', l: 4 },
    { c: 'Escribe «esIdentificador(s)» sin expresiones regulares: true si empieza con letra o guion bajo y sigue con letras, dígitos o guiones bajos.', f: 'esIdentificador', p: ['s'], t: [[['tarifa'], true], [['_x1'], true], [['1x'], false], [[''], false], [['a-b'], false]], sol: '  const letra = c => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";\n  const digito = c => c >= "0" && c <= "9";\n  if (!s.length || !letra(s[0])) return false;\n  for (const c of s.slice(1)) if (!letra(c) && !digito(c)) return false;\n  return true;', l: 2 }
  ],
  gen: function (g) {
    var ej = [['x<=y', 3], ['tarifa=base*2', 5], ['a == b', 3], ['(x+1)*2', 7], ['horas>=24', 3], ['si x entonces y', 4], ['n1 != n2', 3], ['total=total+1', 5]];
    ej.forEach(function (e) { g.input(3, '¿Cuántos tokens produce el analizador léxico (con coincidencia más larga y sin contar espacios) para «' + e[0] + '»?', e[1], 'Cuenta identificadores, números y operadores; los de dos caracteres cuentan como uno.'); });
    var tk = [['tarifa', 'Identificador'], ['24', 'Número'], ['>=', 'Operador'], ['si', 'Palabra reservada'], ['_base2', 'Identificador'], ['entonces', 'Palabra reservada'], ['3.5', 'Número'], ['*', 'Operador']];
    tk.forEach(function (t) { g.mcq(1, 'En el lenguaje de tarifas, ¿qué clase de token es «' + t[0] + '»?', t[1], ['Identificador', 'Número', 'Operador', 'Palabra reservada'].filter(function (x) { return x !== t[1]; }), 'Cada patrón define una clase de token.'); });
    var ids = [['velocidad_max', true], ['2x', false], ['_tmp', true], ['tarifa-base', false], ['x9y', true], ['', false]];
    ids.forEach(function (d) { g.tf(2, '«' + d[0] + '» es un identificador válido según [A-Za-z_][A-Za-z0-9_]*.', d[1], d[1] ? 'Empieza con letra o guion bajo y sigue con caracteres válidos.' : 'Empieza con dígito, contiene un carácter inválido o está vacío.'); });
  },
  checks: [
    ['Diferencia token, lexema y patrón con un ejemplo.', 'Token: IDENTIFICADOR; lexema: «tarifa»; patrón: [A-Za-z_][A-Za-z0-9_]*.'],
    ['Describe cómo se pasa de una expresión regular a un analizador eficiente.', 'Construcción de Thompson hasta un AFN, construcción de subconjuntos hasta un AFD y minimización; el AFD lee cada carácter una vez.'],
    ['Explica las reglas de coincidencia más larga y de prioridad.', 'Se toma el lexema más largo posible; si varios patrones lo reconocen, gana el declarado primero (por eso las palabras reservadas van antes que los identificadores).'],
    ['¿Qué debe hacer un analizador ante un error léxico?', 'Informar la posición exacta con un mensaje claro y, si puede, recuperarse para seguir reportando errores.'],
    ['¿Por qué las expresiones regulares con retroceso pueden ser un riesgo de seguridad?', 'Porque ciertos patrones con ciertas entradas tardan un tiempo exponencial, lo que permite ataques de denegación de servicio.']
  ],
  cites: ['Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.), capítulo 3. Pearson.', 'Thompson, K. (1968). Programming Techniques: Regular Expression Search Algorithm. *Communications of the ACM*, 11(6).', 'Lesk, M. y Schmidt, E. (1975). *Lex: A Lexical Analyzer Generator*. Bell Laboratories, CSTR 39.', 'Nystrom, R. (2021). *Crafting Interpreters*. Genever Benning.', 'Cox, R. (2007). *Regular Expression Matching Can Be Simple And Fast*. swtch.com.'],
  project: { t: 'Analizador léxico de un lenguaje real',
    goal: 'Construir un analizador léxico completo con buenos mensajes de error.',
    steps: ['Elige un subconjunto de un lenguaje (JSON completo o un subconjunto de JavaScript) y define sus tokens con expresiones regulares.', 'Escribe el analizador a mano con un cursor, emitiendo tokens con línea y columna.', 'Maneja números con decimales y exponentes, cadenas con secuencias de escape y comentarios de línea y de bloque.', 'Agrega mensajes de error con la línea, un marcador en la columna y recuperación para seguir.', 'Prueba con archivos reales y compara su velocidad con la de una versión basada en expresiones regulares.'],
    deliver: 'El analizador, sus pruebas y una tabla de tokens con sus patrones.' },
  hito: ['Implementa el analizador léxico del lenguaje de tarifas de PatioApp con identificadores, números, cadenas, operadores y palabras reservadas, con línea y columna en cada token.', 'Agrega al analizador de tarifas mensajes de error claros con la posición y recuperación, y pruébalo con diez reglas inválidas.']
});

S('lc', 'lc.parse', { title: 'Análisis sintáctico: gramáticas y analizadores',
  ask: '¿Qué concepto de análisis sintáctico se aplica?',
  lesson: `
> **La idea en simple.** En «2 + 3 * 4», todos sabemos que primero se multiplica. Pero un programa solo ve una fila de tokens. El analizador sintáctico descubre la **estructura** escondida en esa fila, como un árbol en el que la multiplicación cuelga debajo de la suma, y así el resto del compilador sabe qué se hace primero.

## Gramáticas libres de contexto
La sintaxis de un lenguaje se describe con una **gramática libre de contexto**, que viste en Teoría de la Computación: símbolos **terminales** (los tokens), **no terminales** (categorías como Expresión o Sentencia), un símbolo inicial y **producciones**. John Backus propuso en 1959 una notación para describir ALGOL, que Peter Naur usó en el informe de ALGOL 60: la **forma de Backus-Naur** (BNF).
~~~txt
expr   → expr "+" term | expr "-" term | term
term   → term "*" factor | term "/" factor | factor
factor → NUMERO | IDENTIFICADOR | "(" expr ")"
~~~
Esta gramática codifica la **precedencia** con niveles (la multiplicación está "más abajo" que la suma, así que agrupa primero) y la **asociatividad** con la recursión: «expr → expr "-" term» hace que la resta asocie a la izquierda, de modo que 10 − 4 − 3 es (10 − 4) − 3 = 3.

## Derivaciones, árboles y ambigüedad
Una **derivación** reemplaza no terminales por el lado derecho de sus producciones hasta llegar a los tokens. Su forma gráfica es el **árbol de análisis**. Una gramática es **ambigua** si una cadena tiene dos árboles distintos; la gramática «expr → expr "+" expr | expr "*" expr | NUMERO» lo es, porque 2 + 3 * 4 podría agruparse de dos maneras. El caso histórico es el **else colgante**: en «si a entonces si b entonces x sino y», ¿a cuál «si» pertenece el «sino»? Casi todos los lenguajes lo asocian al «si» más cercano, y la gramática o el analizador debe reflejarlo.

El compilador no trabaja con el árbol de análisis completo, que incluye cada paréntesis y cada nivel de la gramática, sino con un **árbol sintáctico abstracto** (AST): solo los operadores y operandos que importan. Para 2 + 3 * 4, el AST es una suma con hijos 2 y una multiplicación de 3 y 4.

## Análisis descendente
El análisis **descendente** construye el árbol desde la raíz hacia las hojas. La forma más usada en la práctica es el **descenso recursivo**: una función por cada no terminal, que mira el token actual y decide qué producción aplicar. GCC, Clang, el compilador de Go, V8 y la mayoría de los compiladores modernos usan analizadores de descenso recursivo escritos a mano, por su claridad y sus buenos mensajes de error.

Dos obstáculos:
- La **recursión por la izquierda** («expr → expr "+" term») haría que la función «expr» se llamara a sí misma sin consumir tokens, para siempre. Se elimina reescribiendo la gramática como «expr → term ("+" term)*» y construyendo el árbol asociado a la izquierda en un bucle.
- Hay que saber qué producción elegir mirando pocos tokens. Una gramática es **LL(1)** si basta un token de anticipación. Para construir el analizador se calculan los conjuntos **PRIMEROS** (qué tokens pueden iniciar cada alternativa) y **SIGUIENTES** (qué tokens pueden venir después de un no terminal), y la tabla de análisis no debe tener conflictos.
~~~js
// Analizador de descenso recursivo que evalúa expresiones con precedencia y paréntesis
function evaluar(texto) {
  const t = texto.match(/\d+|[-+*/()]/g) || []; let i = 0;
  const ver = () => t[i], tomar = () => t[i++];
  function expr() { let v = term(); while (ver() === '+' || ver() === '-') { const op = tomar(), d = term(); v = op === '+' ? v + d : v - d; } return v; }
  function term() { let v = factor(); while (ver() === '*' || ver() === '/') { const op = tomar(), d = factor(); v = op === '*' ? v * d : v / d; } return v; }
  function factor() {
    if (ver() === '(') { tomar(); const v = expr(); if (tomar() !== ')') throw new Error('falta «)»'); return v; }
    const n = tomar(); if (!/^\d+$/.test(n || '')) throw new Error('se esperaba un número y llegó «' + n + '»'); return Number(n);
  }
  const v = expr(); if (i < t.length) throw new Error('sobra «' + t[i] + '»'); return v;
}
['2+3*4', '(2+3)*4', '10-4-3', '2*(3+4)-5'].forEach(e => console.log(e, '=', evaluar(e)));
~~~

## Análisis ascendente
El análisis **ascendente** construye el árbol desde las hojas: lee tokens y los **desplaza** a una pila, y cuando la cima de la pila coincide con el lado derecho de una producción, la **reduce** al no terminal. Donald Knuth definió en 1965 las gramáticas **LR(k)**, que admiten más lenguajes que LL y se analizan en tiempo lineal. Las tablas LR completas son enormes; Frank DeRemer propuso en 1969 la variante **LALR**, mucho más compacta, que es la que generan **yacc** (Stephen Johnson, Laboratorios Bell, 1975) y su sucesor GNU **bison**. Los conflictos de las tablas (desplazar o reducir; reducir por una producción u otra) delatan ambigüedades de la gramática. Ventaja: admite recursión por la izquierda y gramáticas más naturales. Desventaja: los errores son más difíciles de reportar con claridad.

## Otras técnicas
- **Precedencia de operadores de Pratt** (Vaughan Pratt, 1973): cada token tiene una "potencia de enlace" y una función; analiza expresiones con muchos operadores de forma muy compacta. La usan JSLint y muchos intérpretes.
- **Algoritmo de patio de maniobras** (Edsger Dijkstra, 1961): convierte una expresión infija en notación polaca inversa con una pila de operadores, respetando la precedencia.
- **Gramáticas de expresiones analíticas** (PEG, Bryan Ford, 2004): con una elección ordenada que elimina la ambigüedad por diseño; base de muchos generadores modernos. Python cambió en 2020 (versión 3.9) a un analizador PEG.
- **Combinadores de analizadores:** funciones pequeñas que se combinan para formar analizadores mayores, populares en lenguajes funcionales.

## Analizadores en la industria
Los entornos de desarrollo necesitan analizar código **mientras se escribe**, lleno de errores a medio corregir, y volver a analizar en milisegundos tras cada tecla. Herramientas como **Tree-sitter** (creada por Max Brunsfeld en GitHub, usada por muchos editores) hacen **análisis incremental**: reutilizan las partes del árbol que no cambiaron y toleran errores para que el resaltado y la navegación sigan funcionando. El protocolo **LSP** (*Language Server Protocol*), publicado por Microsoft en 2016, separa el análisis de cada lenguaje del editor, de modo que un solo servidor de lenguaje sirve a VS Code, Vim o Emacs.

## Errores sintácticos
Un buen analizador no se detiene en el primer error. La técnica más común es el **modo pánico**: al detectar un error, descartar tokens hasta encontrar uno de **sincronización** (como «;» o el comienzo de la siguiente sentencia) y seguir. Los mejores compiladores informan qué esperaban ("se esperaba «)» para cerrar el «(» de la línea 3"), y algunos sugieren correcciones.

## Ejemplo resuelto: la gramática del lenguaje de tarifas
~~~txt
regla     → "si" condicion "entonces" asignacion
condicion → comparacion ( ("y" | "o") comparacion )*
comparacion → expr ( "==" | "!=" | "<" | ">" | "<=" | ">=" ) expr
asignacion  → IDENTIFICADOR "=" expr
expr      → term ( ("+" | "-") term )*
term      → factor ( ("*" | "/") factor )*
factor    → NUMERO | CADENA | IDENTIFICADOR | "(" expr ")"
~~~
La gramática ya no tiene recursión por la izquierda (se usan repeticiones), así que se implementa con descenso recursivo: una función por regla. Para «si horas > 24 entonces tarifa = base * 2», el AST resultante es una regla cuya condición es «> (horas, 24)» y cuya asignación es «tarifa := * (base, 2)». Una decisión de diseño: «y» tiene mayor precedencia que «o», como en la lógica, lo que se logra agregando un nivel más a la gramática si hace falta.`,
  links: [['teo.gram', 'las gramáticas libres de contexto y los autómatas de pila son la teoría detrás del análisis sintáctico'], ['lc.lex', 'el analizador sintáctico consume los tokens del analizador léxico'], ['m4.stack', 'el análisis ascendente y el patio de maniobras usan pilas']],
  read: 'Aho, Lam, Sethi y Ullman, capítulo 4; Nystrom, *Crafting Interpreters*, capítulos 5 y 6; Knuth (1965); Pratt (1973).',
  terms: [
    ['Gramática libre de contexto', 'conjunto de producciones que define la sintaxis de un lenguaje con terminales, no terminales y un símbolo inicial', ['expr → expr "+" term | term.', 'Se escribe en BNF.', 'La reconoce un autómata de pila.']],
    ['BNF', 'notación de Backus y Naur para escribir las producciones de una gramática', ['Se usó para describir ALGOL 60.', 'Casi todos los lenguajes publican su gramática así.', 'Existen variantes extendidas con repeticiones.']],
    ['Árbol sintáctico abstracto', 'árbol que representa la estructura esencial de un programa sin los detalles de la gramática', ['2 + 3 * 4 es una suma con una multiplicación como hijo.', 'Los paréntesis no aparecen como nodos.', 'Es la entrada del análisis semántico.']],
    ['Gramática ambigua', 'gramática en la que alguna cadena tiene más de un árbol de análisis', ['expr → expr "+" expr | expr "*" expr.', 'El else colgante.', 'Se resuelve con niveles de precedencia o reglas explícitas.']],
    ['Descenso recursivo', 'técnica de análisis descendente con una función por cada no terminal', ['GCC y Clang la usan.', 'Da buenos mensajes de error.', 'No admite recursión por la izquierda directamente.']],
    ['Recursión por la izquierda', 'producción cuyo lado derecho empieza con el mismo no terminal del lado izquierdo', ['expr → expr "+" term.', 'Hace entrar en bucle a un analizador descendente.', 'Se elimina con repeticiones.']],
    ['Análisis LR', 'análisis ascendente que desplaza tokens a una pila y reduce cuando reconoce el lado derecho de una producción', ['Knuth lo definió en 1965.', 'yacc genera analizadores LALR.', 'Admite gramáticas más amplias que LL.']],
    ['Modo pánico', 'estrategia de recuperación que descarta tokens hasta uno de sincronización para seguir analizando tras un error', ['Salta hasta el siguiente «;».', 'Permite reportar varios errores.', 'Es simple y muy usada.']]
  ],
  q: [
    ['En la gramática por niveles (expr, term, factor), ¿por qué 2 + 3 * 4 da 14?', 'Porque la multiplicación está en un nivel inferior y agrupa antes que la suma', ['Porque se evalúa de derecha a izquierda', 'Por una regla del analizador léxico', 'Porque los números pequeños van primero'], 'La precedencia se codifica con niveles.', 2],
    ['¿Qué valor da 10 − 4 − 3 si la resta asocia a la izquierda?', '3', ['9', '−3', '17'], '(10 − 4) − 3.', 2],
    ['¿Qué problema causa la recursión por la izquierda en un analizador de descenso recursivo?', 'Un bucle infinito, porque la función se llama sin consumir tokens', ['Errores de tipos', 'Ambigüedad', 'Código más lento solamente'], 'Se elimina reescribiendo con repeticiones.', 3],
    ['¿Qué significa que una gramática sea LL(1)?', 'Que basta mirar un token para decidir qué producción aplicar', ['Que tiene una sola producción', 'Que se analiza de derecha a izquierda', 'Que es ambigua'], 'Se verifica con los conjuntos PRIMEROS y SIGUIENTES.', 3],
    ['¿Qué generan yacc y bison?', 'Analizadores ascendentes LALR', ['Analizadores léxicos', 'Código de máquina', 'Recolectores de basura'], 'DeRemer propuso LALR en 1969.', 3],
    ['¿Qué es el else colgante?', 'Una ambigüedad sobre a qué «si» pertenece un «sino» en sentencias anidadas', ['Un error de tipos', 'Un problema del analizador léxico', 'Una optimización'], 'Se asocia al «si» más cercano.', 3],
    ['¿Qué ventaja tiene un AST sobre el árbol de análisis completo?', 'Conserva solo la estructura esencial, sin paréntesis ni niveles de la gramática', ['Incluye más detalles', 'Es siempre más grande', 'No necesita tokens'], 'Es más cómodo para las fases siguientes.', 2],
    { tf: 'Un conflicto desplazar/reducir en una tabla LALR suele indicar una ambigüedad en la gramática.', v: true, e: 'Por ejemplo, el else colgante.', l: 4 },
    { tf: 'Los analizadores de descenso recursivo escritos a mano están obsoletos y ningún compilador moderno los usa.', v: false, e: 'GCC, Clang, Go y V8 los usan.', l: 2 },
    { c: 'Escribe «evaluar(texto)»: evalúa expresiones con enteros, + − * / y paréntesis, respetando precedencia y asociatividad izquierda, con descenso recursivo.', f: 'evaluar', p: ['texto'], t: [[['2+3*4'], 14], [['(2+3)*4'], 20], [['10-4-3'], 3], [['2*(3+4)-5'], 9], [['8/2/2'], 2], [['7'], 7]], sol: '  const t = texto.match(/\\d+|[-+*/()]/g) || [];\n  let i = 0;\n  const expr = () => { let v = term(); while (t[i] === "+" || t[i] === "-") { const o = t[i++], d = term(); v = o === "+" ? v + d : v - d; } return v; };\n  const term = () => { let v = factor(); while (t[i] === "*" || t[i] === "/") { const o = t[i++], d = factor(); v = o === "*" ? v * d : v / d; } return v; };\n  const factor = () => { if (t[i] === "(") { i++; const v = expr(); i++; return v; } return Number(t[i++]); };\n  return expr();', h: 'Una función por nivel: expr llama a term, term a factor, y factor maneja números y paréntesis.', l: 4 },
    { c: 'Escribe «aPolaca(texto)» con el algoritmo de patio de maniobras: convierte una expresión infija con enteros, + − * / y paréntesis a notación polaca inversa, con los elementos separados por un espacio.', f: 'aPolaca', p: ['texto'], t: [[['2+3*4'], '2 3 4 * +'], [['(2+3)*4'], '2 3 + 4 *'], [['10-4-3'], '10 4 - 3 -'], [['1*2+3'], '1 2 * 3 +']], sol: '  const prec = { "+": 1, "-": 1, "*": 2, "/": 2 }, sal = [], pila = [];\n  for (const tk of texto.match(/\\d+|[-+*/()]/g) || []) {\n    if (/\\d/.test(tk)) sal.push(tk);\n    else if (tk === "(") pila.push(tk);\n    else if (tk === ")") { while (pila[pila.length - 1] !== "(") sal.push(pila.pop()); pila.pop(); }\n    else { while (pila.length && pila[pila.length - 1] !== "(" && prec[pila[pila.length - 1]] >= prec[tk]) sal.push(pila.pop()); pila.push(tk); }\n  }\n  while (pila.length) sal.push(pila.pop());\n  return sal.join(" ");', l: 4 }
  ],
  gen: function (g) {
    var exprs = [['2+3*4', 14], ['(2+3)*4', 20], ['10-4-3', 3], ['2*3+4*5', 26], ['20/4/5', 1], ['(8-3)*(2+1)', 15], ['6+12/3', 10], ['100-(20+30)', 50], ['3*(4+5)-6', 21], ['2+2*2-2', 4]];
    exprs.forEach(function (e) { g.input(2, 'Con la precedencia y asociatividad usuales, ¿cuánto vale ' + e[0] + '?', e[1], 'Multiplicación y división antes que suma y resta; operadores del mismo nivel de izquierda a derecha.'); });
    var rpn = [['2+3*4', '2 3 4 * +'], ['(2+3)*4', '2 3 + 4 *'], ['5-1-2', '5 1 - 2 -'], ['1+2+3', '1 2 + 3 +'], ['(1+2)*(3+4)', '1 2 + 3 4 + *']];
    rpn.forEach(function (r) { g.input(3, 'Escribe en notación polaca inversa (separando con espacios) la expresión ' + r[0] + '.', r[1], 'Algoritmo de patio de maniobras de Dijkstra.'); });
    var tec = [['Una función por cada no terminal que mira el token actual', 'Descenso recursivo'], ['Desplazar tokens a una pila y reducir cuando coincide un lado derecho', 'Análisis LR'], ['Asignar una potencia de enlace a cada operador', 'Precedencia de Pratt'], ['Elección ordenada que elimina la ambigüedad por diseño', 'PEG']];
    tec.forEach(function (x) { g.mcq(3, '¿Qué técnica de análisis sintáctico describe esto? ' + x[0], x[1], ['Descenso recursivo', 'Análisis LR', 'Precedencia de Pratt', 'PEG'].filter(function (y) { return y !== x[1]; }), 'Familias de analizadores sintácticos.'); });
  },
  checks: [
    ['¿Cómo codifica una gramática la precedencia y la asociatividad?', 'La precedencia con niveles (los operadores que agrupan primero en niveles más bajos) y la asociatividad con el lado de la recursión (por la izquierda para asociar a la izquierda).'],
    ['¿Qué es una gramática ambigua? Da un ejemplo.', 'Una en la que alguna cadena tiene dos árboles de análisis, como expr → expr + expr | expr * expr con 2 + 3 * 4, o el else colgante.'],
    ['¿Cómo se elimina la recursión por la izquierda para un analizador descendente?', 'Reescribiendo expr → expr + term | term como expr → term (+ term)* y construyendo el árbol asociado a la izquierda en un bucle.'],
    ['Compara análisis descendente y ascendente.', 'El descendente construye desde la raíz con una función por no terminal y da buenos errores; el ascendente desplaza y reduce con una pila, admite más gramáticas, y suele generarse con herramientas como bison.'],
    ['¿Qué es el modo pánico?', 'Una recuperación que, ante un error, descarta tokens hasta uno de sincronización para seguir analizando y reportar más errores.']
  ],
  cites: ['Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.), capítulo 4. Pearson.', 'Knuth, D. (1965). On the Translation of Languages from Left to Right. *Information and Control*, 8(6).', 'Naur, P. (ed.) (1960). Report on the Algorithmic Language ALGOL 60. *Communications of the ACM*, 3(5).', 'Johnson, S. (1975). *Yacc: Yet Another Compiler-Compiler*. Bell Laboratories, CSTR 32.', 'Pratt, V. (1973). Top Down Operator Precedence. *POPL 1973*.', 'Ford, B. (2004). Parsing Expression Grammars: A Recognition-Based Syntactic Foundation. *POPL 2004*.'],
  project: { t: 'Analizador de una calculadora con variables',
    goal: 'Construir un analizador sintáctico completo con AST y mensajes de error.',
    steps: ['Escribe la gramática en BNF de un lenguaje con asignaciones, expresiones aritméticas, comparaciones y sentencias si-entonces-sino.', 'Elimina la recursión por la izquierda y calcula los conjuntos PRIMEROS de cada no terminal.', 'Implementa un analizador de descenso recursivo que construya el AST con nodos tipados.', 'Agrega recuperación en modo pánico y mensajes que digan qué se esperaba y dónde.', 'Escribe la misma gramática en un generador (por ejemplo, una herramienta PEG) y compara.'],
    deliver: 'La gramática, el analizador, el AST impreso de ejemplos y las pruebas de errores.' },
  hito: ['Implementa el analizador sintáctico de descenso recursivo del lenguaje de tarifas de PatioApp que produzca un AST para reglas con condiciones y asignaciones.', 'Agrega al analizador de tarifas recuperación de errores y una prueba por cada producción de la gramática, incluidos casos inválidos.']
});
})();
