(function () {
var S = SDC.S;

S('lc', 'lc.sem', { title: 'Análisis semántico: nombres, ámbitos y tablas de símbolos',
  ask: '¿Qué concepto de análisis semántico se aplica?',
  lesson: `
> **La idea en simple.** «El auto bebió la montaña» es una oración gramaticalmente correcta y no significa nada. Con el código pasa igual: «tarifa = basee * 2» tiene una sintaxis impecable, pero «basee» no existe. El análisis semántico es la fase que revisa el **sentido**: que cada nombre esté declarado, que se use donde corresponde y que las piezas encajen.

## Lo que la gramática no puede expresar
Las gramáticas libres de contexto describen la forma, pero no reglas que dependen del **contexto**:
- Toda variable debe estar declarada antes de usarse, y no declararse dos veces en el mismo ámbito.
- Una función debe llamarse con la cantidad correcta de argumentos.
- «break» solo puede aparecer dentro de un bucle y «return», dentro de una función.
- Los tipos deben ser compatibles (lo verás en la próxima unidad).
Estas comprobaciones se hacen recorriendo el **árbol sintáctico abstracto**, normalmente con el patrón **visitante**: una función por cada tipo de nodo que hace su comprobación y visita a los hijos. Un compilador puede hacer varias **pasadas**: una para recolectar todas las declaraciones (necesaria si el lenguaje permite usar una función antes de declararla) y otra para verificar los usos.

## La tabla de símbolos
La **tabla de símbolos** guarda, para cada nombre, lo que el compilador sabe de él: si es variable, función o tipo; su tipo; dónde se declaró; y más adelante, dónde vivirá en memoria. Como los lenguajes tienen ámbitos anidados, la implementación habitual es una **pila de tablas hash**:
- Al entrar a un bloque se **apila** una tabla nueva.
- Una declaración agrega el nombre a la tabla de la cima.
- Para **resolver** un uso, se busca desde la cima hacia abajo; el primer ámbito que tiene el nombre gana.
- Al salir del bloque se **desapila** su tabla, y sus nombres dejan de ser visibles.
~~~js
// Tabla de símbolos con ámbitos anidados y detección de errores
function verificar(programa) {
  const ambitos = [new Map()], errores = [];
  const buscar = n => { for (let i = ambitos.length - 1; i >= 0; i--) if (ambitos[i].has(n)) return ambitos[i].get(n); return null; };
  for (const [op, nombre, linea] of programa) {
    if (op === '{') ambitos.push(new Map());
    else if (op === '}') ambitos.pop();
    else if (op === 'let') { if (ambitos[ambitos.length - 1].has(nombre)) errores.push('línea ' + linea + ': «' + nombre + '» ya fue declarado en este bloque'); else ambitos[ambitos.length - 1].set(nombre, linea); }
    else if (op === 'use' && buscar(nombre) === null) errores.push('línea ' + linea + ': «' + nombre + '» no está declarado');
  }
  return errores.length ? errores : ['sin errores'];
}
console.log(verificar([['let', 'base', 1], ['{'], ['let', 'tarifa', 2], ['use', 'base', 3], ['}'], ['use', 'tarifa', 5], ['let', 'base', 6]]));
~~~

## Ámbito léxico y ámbito dinámico
¿A qué declaración se refiere un nombre? Hay dos reglas:
- **Ámbito léxico** (o estático): se decide mirando el **texto** del programa; un nombre se refiere a la declaración más cercana que lo encierra en el código. Lo introdujo ALGOL 60 y es la regla de casi todos los lenguajes actuales.
- **Ámbito dinámico:** se decide en **tiempo de ejecución**; un nombre se refiere a la declaración más reciente en la pila de llamadas activas. Lo usaban los primeros LISP; Guy Steele y Gerald Sussman demostraron con **Scheme** (1975) las ventajas del ámbito léxico en un lenguaje funcional. Emacs Lisp usó ámbito dinámico por defecto hasta que en 2012 incorporó el léxico como opción, y las variables «local» de Bash siguen siendo dinámicas.
~~~txt
x = 1
funcion f() { devolver x }
funcion g() { x = 2 (local); devolver f() }
g()   → con ámbito léxico devuelve 1; con ámbito dinámico devuelve 2
~~~
El ámbito léxico permite entender una función leyendo solo su texto y el que la rodea; con el dinámico, el resultado depende de quién la llamó, lo que hace a los programas difíciles de razonar.

## Clausuras
Con ámbito léxico y funciones como valores aparece la **clausura**: una función junto con el **entorno** en que fue creada. Peter Landin formalizó la idea en 1964. Si una función devuelve otra que usa una variable local de la primera, esa variable debe seguir viva aunque la primera haya terminado; por eso las variables capturadas se guardan en el montículo y no en la pila. Las clausuras sostienen los manejadores de eventos de JavaScript, las funciones de orden superior y los módulos.

## Casos particulares de JavaScript
JavaScript ilustra bien por qué las reglas de ámbito importan:
- «var» tiene **ámbito de función** y su declaración se "eleva" (*hoisting*) al inicio de la función: usarla antes de su línea da «undefined» en lugar de un error.
- «let» y «const» (ECMAScript 2015) tienen **ámbito de bloque** y una **zona muerta temporal**: usarlas antes de su declaración lanza un error.
- El clásico error de los bucles: con «var i», todas las funciones creadas en un bucle comparten la misma «i» y ven su valor final; con «let i», cada iteración tiene su propia variable.

## Gramáticas de atributos
Donald Knuth propuso en 1968 (*Semantics of Context-Free Languages*) las **gramáticas de atributos**, que asocian a cada símbolo de la gramática valores calculados por reglas:
- **Atributos sintetizados:** se calculan a partir de los hijos y suben por el árbol (el tipo de «a + b» a partir de los tipos de a y de b, o el valor de una expresión).
- **Atributos heredados:** bajan desde el padre o los hermanos (el entorno de nombres visibles, o el tipo esperado en una asignación).
Son el modelo teórico del análisis semántico: cada comprobación es el cálculo de un atributo y una condición sobre él. Muchas herramientas de análisis semántico, y la forma en que se escriben los visitantes, siguen esta idea.

## Módulos, espacios de nombres y enlace
Los programas grandes se dividen en **módulos** o **paquetes**, cada uno con su propio espacio de nombres: «tarifas.calcular» y «reportes.calcular» no chocan. El análisis semántico debe resolver los nombres **importados**: leer las interfaces de los otros módulos (sus declaraciones exportadas), verificar que lo que se usa existe y es público, y detectar **dependencias circulares** cuando el lenguaje las prohíbe. Los compiladores guardan esa información en archivos de interfaz (como los encabezados «.h» de C o los «.d.ts» de TypeScript) para no reanalizar todo el código de cada dependencia. Al final, el **enlazador** une las referencias entre módulos ya compilados; si un nombre declarado nunca se definió, aparece el clásico error "símbolo no definido" en la etapa de enlace y no en la de compilación.

## Mensajes de error semánticos
Un análisis semántico bien hecho distingue un compilador amable de uno hostil:
- Informar la posición del uso y, si sirve, la de la declaración relacionada ("«tarifa» se declaró aquí, en la línea 2, dentro del bloque que termina en la línea 4").
- Sugerir nombres parecidos con una **distancia de edición**: "«basee» no está declarado; ¿quisiste decir «base»?". Rust, Elm y TypeScript lo hacen.
- No producir cascadas de errores falsos: si un nombre no existe, registrarlo una vez con un tipo "error" que no genere más quejas.

## Ejemplo resuelto: comprobar una regla de tarifas
Para la regla «si horas > 24 entonces tarifa = basee * 2», con las variables predefinidas «horas», «tipo» y «base», y «tarifa» como variable de salida:
1. Se crea la tabla de símbolos con un ámbito global que contiene las predefinidas y la de salida.
2. El visitante recorre la condición: «horas» se resuelve en el ámbito global; 24 es un literal.
3. Recorre la asignación: «tarifa» es asignable; «basee» no se encuentra en ningún ámbito.
4. Se informa: "línea 1, columna 37: «basee» no está declarado; ¿quisiste decir «base»?". La distancia de edición entre «basee» y «base» es 1.
5. Además se verifica que solo «tarifa» pueda aparecer a la izquierda de «=» (las variables de entrada son de solo lectura): «horas = 3» sería un error semántico aunque sea sintácticamente válido.`,
  links: [['lc.parse', 'el análisis semántico recorre el árbol que produce el analizador sintáctico'], ['lc.types', 'la verificación de tipos es la comprobación semántica más importante'], ['m4.hash', 'la tabla de símbolos se implementa con tablas hash apiladas']],
  read: 'Aho, Lam, Sethi y Ullman, capítulos 2 y 5; Nystrom, *Crafting Interpreters*, capítulos 8 y 11 (Statements and State; Resolving and Binding); Knuth (1968).',
  terms: [
    ['Análisis semántico', 'fase del compilador que verifica las reglas de sentido que la gramática no expresa', ['Variables declaradas antes de usarse.', 'Cantidad correcta de argumentos.', 'Tipos compatibles.']],
    ['Tabla de símbolos', 'estructura que asocia cada nombre del programa con su información: clase, tipo, ámbito y ubicación', ['Se implementa como una pila de tablas hash.', 'La consultan todas las fases.', 'Detecta declaraciones duplicadas.']],
    ['Ámbito léxico', 'regla por la que un nombre se refiere a la declaración más cercana que lo encierra en el texto del programa', ['Lo introdujo ALGOL 60.', 'Permite entender una función leyendo su código.', 'Lo usan casi todos los lenguajes actuales.']],
    ['Ámbito dinámico', 'regla por la que un nombre se refiere a la declaración más reciente en la pila de llamadas activas', ['Los primeros LISP lo usaban.', 'Las variables local de Bash lo siguen.', 'El resultado depende de quién llamó a la función.']],
    ['Ocultamiento', 'situación en que una declaración interna con el mismo nombre oculta a una externa dentro de su ámbito', ['Una variable local x oculta a la global x.', 'Fuera del bloque vuelve a verse la externa.', 'Algunos linters lo advierten.']],
    ['Clausura', 'función junto con el entorno léxico en que fue creada', ['Un contador que recuerda su cuenta entre llamadas.', 'Landin formalizó la idea en 1964.', 'Sus variables capturadas viven en el montículo.']],
    ['Atributo sintetizado', 'valor de una gramática de atributos que se calcula a partir de los hijos de un nodo', ['El tipo de a + b a partir de los de a y b.', 'Sube por el árbol.', 'Knuth los propuso en 1968.']],
    ['Zona muerta temporal', 'período entre el inicio de un bloque y la declaración de una variable let o const en que usarla lanza un error', ['Usar una const antes de su línea falla.', 'Existe desde ECMAScript 2015.', 'Evita los errores silenciosos del hoisting de var.']]
  ],
  q: [
    ['¿Por qué "variable declarada antes de usarse" no se verifica en el análisis sintáctico?', 'Porque depende del contexto y no puede expresarse con una gramática libre de contexto', ['Porque es una regla léxica', 'Porque no es importante', 'Porque solo importa al ejecutar'], 'Es una regla semántica.', 3],
    ['¿Cómo se resuelve un nombre en una tabla de símbolos implementada como pila de ámbitos?', 'Buscando desde el ámbito más interno hacia el más externo', ['Buscando solo en el ámbito global', 'Buscando desde el más externo', 'Al azar'], 'El primer ámbito que lo contiene gana.', 2],
    ['Con x = 1, f() que devuelve x, y g() que declara una x local igual a 2 y llama a f, ¿qué devuelve g() con ámbito léxico?', '1', ['2', 'Error', 'undefined'], 'f ve la x de su texto, la global.', 3],
    ['¿Y con ámbito dinámico?', '2', ['1', 'Error', '0'], 'Se toma la declaración más reciente en la pila de llamadas.', 3],
    ['En JavaScript, ¿qué ocurre al usar una variable let antes de su declaración en el mismo bloque?', 'Se lanza un error por la zona muerta temporal', ['Vale undefined', 'Vale 0', 'Se usa la global'], 'var, en cambio, daría undefined.', 3],
    ['¿Por qué las variables capturadas por una clausura se guardan en el montículo?', 'Porque deben sobrevivir después de que termine la función que las declaró', ['Porque son más rápidas', 'Porque la pila no admite números', 'Por seguridad'], 'La pila se libera al retornar.', 4],
    ['¿Qué tipo de atributo es el entorno de nombres visibles que recibe un nodo de su padre?', 'Heredado', ['Sintetizado', 'Léxico', 'Terminal'], 'Baja por el árbol.', 3],
    { tf: 'Con var dentro de un bucle, todas las funciones creadas en el bucle comparten la misma variable.', v: true, e: 'Por eso ven su valor final; let crea una por iteración.', l: 3 },
    { tf: 'Un programa sin errores sintácticos no puede tener errores semánticos.', v: false, e: '«tarifa = basee * 2» es sintácticamente válido aunque basee no exista.', l: 1 },
    { o: 'Ordena lo que hace la tabla de símbolos al procesar un bloque.', s: ['Apilar un ámbito nuevo al entrar', 'Agregar las declaraciones del bloque a ese ámbito', 'Resolver los usos buscando desde la cima', 'Desapilar el ámbito al salir'], e: 'Así se implementa el ámbito léxico.', l: 2 },
    { c: 'Escribe «noDeclaradas(ops)»: ops contiene "{" y "}" para abrir y cerrar bloques, ["let", nombre] para declarar y ["use", nombre] para usar; devuelve los nombres usados sin declaración visible, sin repetir y en orden de aparición.', f: 'noDeclaradas', p: ['ops'], t: [[[[['let', 'a'], ['use', 'a'], ['use', 'b']]], ['b']], [[['{', ['let', 'x'], '}', ['use', 'x']]], ['x']], [[[['let', 'x'], '{', ['use', 'x'], '}']], []], [[['{', ['let', 'y'], '{', ['use', 'y'], '}', '}', ['use', 'y'], ['use', 'y']]], ['y']]], sol: '  const amb = [new Set()], r = [];\n  for (const o of ops) {\n    if (o === "{") amb.push(new Set());\n    else if (o === "}") amb.pop();\n    else if (o[0] === "let") amb[amb.length - 1].add(o[1]);\n    else if (!amb.some(s => s.has(o[1])) && !r.includes(o[1])) r.push(o[1]);\n  }\n  return r;', h: 'Usa una pila de conjuntos; al usar un nombre, búscalo en cualquiera de los ámbitos abiertos.', l: 3 },
    { c: 'Escribe «buscar(ambitos, nombre)»: ambitos es una lista de objetos del más externo al más interno; devuelve el valor del ámbito más interno que tenga el nombre, o null.', f: 'buscar', p: ['ambitos', 'nombre'], t: [[[[{ x: 1 }, { x: 2 }], 'x'], 2], [[[{ x: 1 }, { y: 2 }], 'x'], 1], [[[{ a: 1 }], 'z'], null]], sol: '  for (let i = ambitos.length - 1; i >= 0; i--) if (nombre in ambitos[i]) return ambitos[i][nombre];\n  return null;', l: 1 },
    { c: 'Escribe «distanciaEdicion(a, b)» (Levenshtein) para sugerir nombres parecidos.', f: 'distanciaEdicion', p: ['a', 'b'], t: [[['basee', 'base'], 1], [['tarifa', 'tarifas'], 1], [['horas', 'oras'], 1], [['gato', 'perro'], 4], [['', 'abc'], 3]], sol: '  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);\n  for (let j = 1; j <= b.length; j++) d[0][j] = j;\n  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)\n    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));\n  return d[a.length][b.length];', l: 4 }
  ],
  gen: function (g) {
    var sc = [['x = 1; f() devuelve x; g() con x local = 5 llama a f', 'léxico', 1], ['x = 1; f() devuelve x; g() con x local = 5 llama a f', 'dinámico', 5], ['x = 10; f() devuelve x; g() con x local = 3 llama a f', 'léxico', 10], ['x = 10; f() devuelve x; g() con x local = 3 llama a f', 'dinámico', 3], ['y = 7; h() devuelve y; k() sin variables locales llama a h', 'dinámico', 7], ['y = 7; h() devuelve y; k() sin variables locales llama a h', 'léxico', 7]];
    sc.forEach(function (c) { g.input(3, 'Con ámbito ' + c[1] + ': ' + c[0] + '. ¿Qué valor devuelve la llamada a la función externa?', c[2], 'Léxico: la declaración del texto; dinámico: la más reciente en la pila de llamadas.'); });
    var er = [['Usar una variable que nunca se declaró', 'Semántico'], ['Olvidar cerrar un paréntesis', 'Sintáctico'], ['Escribir el carácter @ donde el lenguaje no lo admite', 'Léxico'], ['Declarar dos veces la misma variable en el mismo bloque', 'Semántico'], ['Llamar a una función con tres argumentos si espera dos', 'Semántico'], ['Escribir «si entonces x = 1» sin condición', 'Sintáctico'], ['Una cadena sin comillas de cierre', 'Léxico'], ['Usar break fuera de un bucle', 'Semántico']];
    er.forEach(function (e) { g.mcq(2, '¿Qué tipo de error es? ' + e[0], e[1], ['Léxico', 'Sintáctico', 'Semántico', 'De ejecución'].filter(function (x) { return x !== e[1]; }), 'Cada fase detecta una clase de errores.'); });
    var js = [['Usar una variable var antes de su línea', 'undefined'], ['Usar una variable let antes de su línea', 'Error de referencia'], ['Reasignar una const', 'Error de tipo'], ['Leer una variable nunca declarada en modo estricto', 'Error de referencia']];
    js.forEach(function (j) { g.mcq(3, 'En JavaScript, ¿qué ocurre al ' + j[0].toLowerCase() + '?', j[1], ['undefined', 'Error de referencia', 'Error de tipo', 'Vale 0'].filter(function (x) { return x !== j[1]; }), 'Reglas de ámbito de ECMAScript 2015.'); });
  },
  checks: [
    ['Nombra cuatro comprobaciones del análisis semántico.', 'Variables declaradas antes de usarse, sin duplicados en el mismo ámbito, cantidad correcta de argumentos y compatibilidad de tipos.'],
    ['¿Cómo funciona una tabla de símbolos con ámbitos anidados?', 'Es una pila de tablas: se apila al entrar a un bloque, se declara en la cima, se resuelve buscando desde la cima hacia abajo y se desapila al salir.'],
    ['Explica con un ejemplo la diferencia entre ámbito léxico y dinámico.', 'Si f devuelve x y g define una x local y llama a f, con léxico f ve la x de su texto y con dinámico la x de g.'],
    ['¿Qué es una clausura y por qué necesita el montículo?', 'Una función con su entorno léxico; las variables capturadas deben sobrevivir después de que la función que las creó termina.'],
    ['¿Cómo darías un buen mensaje para un nombre no declarado?', 'Con la posición exacta y una sugerencia del nombre más parecido según la distancia de edición, sin generar errores en cascada.']
  ],
  cites: ['Knuth, D. (1968). Semantics of Context-Free Languages. *Mathematical Systems Theory*, 2(2).', 'Landin, P. (1964). The Mechanical Evaluation of Expressions. *The Computer Journal*, 6(4).', 'Sussman, G. y Steele, G. (1975). *Scheme: An Interpreter for Extended Lambda Calculus*. MIT AI Memo 349.', 'Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.), capítulos 2 y 5.', 'Nystrom, R. (2021). *Crafting Interpreters*, capítulo 11. Genever Benning.'],
  project: { t: 'Resolutor de nombres',
    goal: 'Implementar la fase de resolución de nombres de un lenguaje con bloques y funciones.',
    steps: ['Sobre el AST de un lenguaje con bloques, funciones y variables, implementa una tabla de símbolos con pila de ámbitos.', 'Detecta usos sin declarar, declaraciones duplicadas y uso de una variable en su propio inicializador.', 'Calcula para cada uso a cuántos ámbitos de distancia está su declaración, como hace el resolutor de Crafting Interpreters.', 'Agrega sugerencias con distancia de edición en los mensajes de error.', 'Implementa clausuras y verifica con pruebas que capturan el entorno correcto.'],
    deliver: 'El código, las pruebas y ejemplos de mensajes de error.' },
  hito: ['Agrega al lenguaje de tarifas de PatioApp un análisis semántico con tabla de símbolos que detecte variables no declaradas y asignaciones a variables de solo lectura.', 'Incluye en los errores del lenguaje de tarifas sugerencias de nombres parecidos con distancia de edición y pruébalas con errores frecuentes de los administradores.']
});

S('lc', 'lc.types', { title: 'Sistemas de tipos e inferencia',
  ask: '¿Qué concepto de sistemas de tipos se aplica?',
  lesson: `
> **La idea en simple.** Un enchufe de tres patas no entra en un tomacorriente de dos: la forma misma impide un error peligroso antes de que ocurra. Un sistema de tipos hace lo mismo con los programas: clasifica cada valor (número, texto, lista, función) y rechaza las combinaciones que no tienen sentido, como sumar un número con una fecha, antes de que el programa llegue a ejecutarse.

## Qué es un sistema de tipos
Benjamin Pierce lo define en *Types and Programming Languages* (2002):
:::cita Un sistema de tipos es un método sintáctico tratable para demostrar la ausencia de ciertos comportamientos del programa, clasificando las frases según los tipos de valores que calculan. | Benjamin C. Pierce, Types and Programming Languages (2002)
Tres palabras clave: **sintáctico** (se verifica mirando el código, sin ejecutarlo), **tratable** (se puede verificar en un tiempo razonable) y **ausencia de ciertos comportamientos** (no de todos los errores, sino de una clase precisa, como aplicar una operación a un valor que no la admite).

## Estático y dinámico, fuerte y débil
- **Tipado estático:** los tipos se verifican antes de ejecutar (Java, C#, Rust, Go, TypeScript, Haskell). Los errores aparecen al compilar y las herramientas pueden autocompletar y refactorizar con seguridad.
- **Tipado dinámico:** los valores llevan su tipo y se verifica al ejecutar cada operación (Python, JavaScript, Ruby). Más flexible y rápido para empezar; los errores aparecen en tiempo de ejecución.
- **Fuerte y débil** es una distinción informal sobre cuántas **conversiones implícitas** hace el lenguaje: en JavaScript «"5" * 2» da 10 y «"5" + 2» da "52"; Python lanza un error con «"5" + 2». Conviene hablar en concreto de qué conversiones permite cada lenguaje.
La evidencia empírica muestra beneficios del tipado estático: Zheng Gao, Christian Bird y Earl Barr estimaron en 2017 que TypeScript o Flow habrían detectado alrededor del 15% de los errores públicos que estudiaron en proyectos de JavaScript.

## Reglas de tipos
Las reglas se escriben como **reglas de inferencia**: sobre la línea, las premisas; debajo, la conclusión. Γ es el **contexto** (los tipos de las variables visibles) y «Γ ⊢ e : T» se lee "en el contexto Γ, la expresión e tiene tipo T":
~~~txt
 Γ ⊢ a : Int    Γ ⊢ b : Int              Γ ⊢ c : Bool    Γ ⊢ t : T    Γ ⊢ e : T
───────────────────────────── (suma)    ──────────────────────────────────────── (si)
       Γ ⊢ a + b : Int                          Γ ⊢ si c entonces t sino e : T
~~~
Un verificador de tipos aplica estas reglas recorriendo el AST: calcula el tipo de cada subexpresión (un atributo sintetizado) y comprueba las premisas.

## Solidez
Robin Milner escribió en 1978 la frase que resume el objetivo: "los programas bien tipados no pueden fallar" (en el sentido preciso de no llegar a un estado sin sentido). Andrew Wright y Matthias Felleisen formalizaron en 1994 la **solidez** con dos teoremas:
- **Progreso:** una expresión bien tipada es un valor o puede dar un paso más de ejecución (no se queda atascada).
- **Preservación:** si una expresión bien tipada da un paso, el resultado tiene el mismo tipo.
Muchos lenguajes reales no son completamente sólidos por diseño: en Java los arreglos son **covariantes** (un «String[]» se puede usar como «Object[]»), y guardar un entero en él compila pero falla al ejecutar con «ArrayStoreException»; TypeScript acepta algunos huecos a cambio de comodidad.

## Inferencia de tipos
Escribir todos los tipos es tedioso. La **inferencia** los deduce. J. Roger Hindley (1969) y Robin Milner (1978) desarrollaron por separado el sistema que, con el trabajo de Luis Damas y Milner (1982), se conoce como **Hindley-Milner**: el algoritmo W asigna variables de tipo desconocidas, genera ecuaciones a partir del código y las resuelve con **unificación** (John Alan Robinson, 1965). Encuentra siempre el tipo **más general** sin una sola anotación. Lo usan ML, OCaml, Haskell y F#; Rust, Kotlin, Swift, C# y TypeScript usan formas más locales de inferencia («let x = 5» deduce que x es entero).

## Polimorfismo
Christopher Strachey distinguió en 1967 dos formas, y Luca Cardelli y Peter Wegner (1985) completaron la clasificación:
- **Paramétrico:** una función funciona igual para cualquier tipo: «primero : Lista<T> → T». Son los **genéricos** de Java, C#, TypeScript o Rust.
- **Ad hoc:** una misma operación con implementaciones distintas según el tipo: la **sobrecarga** («+» para números y para textos) y las **clases de tipos** de Haskell (Philip Wadler y Stephen Blott, 1989), parecidas a los *traits* de Rust.
- **De subtipos:** un valor de un subtipo puede usarse donde se espera el supertipo (el principio de sustitución de Liskov).
Los sistemas de subtipos pueden ser **nominales** (un tipo es subtipo de otro solo si se declara así: Java, C#) o **estructurales** (basta con tener los campos y métodos necesarios: TypeScript, Go con sus interfaces). Con genéricos y subtipos aparece la **varianza**: si Gato es subtipo de Animal, ¿Lista<Gato> es subtipo de Lista<Animal>? Es seguro para listas de solo lectura (covarianza), pero no para listas en las que se puede escribir.

## El error del billón de dólares
Tony Hoare introdujo la referencia nula en ALGOL W en 1965 y la llamó en 2009 su "error del billón de dólares", por los innumerables fallos y vulnerabilidades que causó. Los lenguajes modernos la tratan en el sistema de tipos: **tipos opción** («Option» en Rust, «Maybe» en Haskell), tipos anulables explícitos («String?» en Kotlin y Swift) o la comprobación estricta de nulos de TypeScript. El compilador obliga a manejar el caso vacío antes de usar el valor.

## Tipos que dicen más
Algunos sistemas de tipos expresan propiedades más ricas:
- **Tipos lineales y afines:** cada valor se usa exactamente una vez (o a lo sumo una vez). El sistema de **propiedad y préstamos** de Rust se basa en esta idea y garantiza, al compilar, que no haya punteros colgantes ni condiciones de carrera sobre datos compartidos.
- **Tipos dependientes:** los tipos pueden depender de valores, como "lista de longitud n". Lenguajes como Coq, Agda, Lean o Idris los usan, y la **correspondencia de Curry-Howard** (observada por Haskell Curry y William Howard) muestra que un tipo es una proposición y un programa de ese tipo es su demostración; por eso los asistentes de demostración son a la vez lenguajes de programación.
- **Tipos de efectos:** registran qué efectos puede tener una función (lanzar excepciones, hacer entrada y salida), como las excepciones comprobadas de Java.

## Tipado gradual
Jeremy Siek y Walid Taha propusieron en 2006 el **tipado gradual**: mezclar en un mismo programa partes tipadas y no tipadas, con un tipo comodín en la frontera. Es el modelo de TypeScript (Microsoft, 2012), de las anotaciones de Python con mypy y de Hack en PHP: permite agregar tipos poco a poco a un código grande ya escrito.

## Ejemplo resuelto: tipos para el lenguaje de tarifas
El lenguaje de tarifas tiene tres tipos: Número, Texto y Booleano. Reglas:
- Las operaciones aritméticas exigen dos números y dan número.
- «<», «>», «<=» y «>=» exigen dos números y dan booleano; «==» y «!=» exigen dos valores del mismo tipo.
- «y» y «o» exigen booleanos; la condición de un «si» debe ser booleana.
- «tarifa» debe recibir un número.
Para «si tipo == "camion" y horas > 24 entonces tarifa = base * 2», el verificador deduce: tipo es Texto y "camion" es Texto, así que «==» da Booleano; horas y 24 son Números, «>» da Booleano; «y» de dos booleanos da Booleano; base * 2 es Número y se asigna a tarifa. En cambio «tarifa = tipo * 2» se rechaza antes de ejecutarse: "no se puede multiplicar un Texto («tipo») por un Número". Ningún administrador descubrirá ese error a fin de mes al ver un cobro absurdo: el sistema lo rechaza en el momento de guardar la regla.`,
  links: [['lc.sem', 'la verificación de tipos es parte del análisis semántico'], ['for.contract', 'los tipos son contratos verificados automáticamente'], ['m5.solid', 'el principio de sustitución de Liskov define el subtipado correcto']],
  read: 'Pierce, *Types and Programming Languages*, capítulos 1, 8, 9, 15 y 22; Cardelli y Wegner (1985); Milner (1978); Gao, Bird y Barr (2017).',
  terms: [
    ['Sistema de tipos', 'método sintáctico tratable para demostrar la ausencia de ciertos comportamientos clasificando las expresiones según sus valores', ['Definición de Pierce.', 'Rechaza sumar un número con un texto en algunos lenguajes.', 'Se verifica sin ejecutar el programa.']],
    ['Tipado estático', 'verificación de los tipos antes de ejecutar el programa', ['Java, Rust y TypeScript.', 'Los errores aparecen al compilar.', 'Permite refactorizar con seguridad.']],
    ['Solidez', 'propiedad de un sistema de tipos de garantizar que los programas bien tipados no lleguen a estados sin sentido', ['Se demuestra con progreso y preservación.', 'Milner: los programas bien tipados no pueden fallar.', 'Los arreglos covariantes de Java la rompen.']],
    ['Inferencia de tipos', 'deducción automática de los tipos de un programa sin que el programador los escriba', ['Hindley-Milner en OCaml y Haskell.', 'let x = 5 deduce un entero.', 'Usa unificación.']],
    ['Polimorfismo paramétrico', 'capacidad de una función o tipo de funcionar igual para cualquier tipo', ['Los genéricos Lista<T>.', 'primero : Lista<T> → T.', 'Strachey lo distinguió en 1967.']],
    ['Tipado estructural', 'subtipado en que un tipo es compatible con otro si tiene sus campos y métodos, sin declararlo', ['TypeScript lo usa.', 'Las interfaces de Go.', 'Se contrapone al nominal de Java.']],
    ['Tipo opción', 'tipo que representa un valor que puede estar o no, obligando a tratar ambos casos', ['Option en Rust y Maybe en Haskell.', 'Reemplaza a la referencia nula.', 'El compilador exige manejar el caso vacío.']],
    ['Tipado gradual', 'combinación en un mismo programa de partes con tipos estáticos y partes dinámicas', ['TypeScript sobre JavaScript.', 'mypy sobre Python.', 'Siek y Taha lo propusieron en 2006.']]
  ],
  q: [
    ['¿Qué significa que un sistema de tipos sea sólido?', 'Que los programas que acepta no llegan a estados sin sentido al ejecutarse', ['Que acepta todos los programas correctos', 'Que no necesita anotaciones', 'Que es rápido de verificar'], 'Progreso y preservación.', 3],
    ['En JavaScript, ¿qué da «"5" + 2»?', '"52"', ['7', 'Un error', 'NaN'], 'El operador + con un texto concatena.', 2],
    ['¿Qué algoritmo usa la inferencia de Hindley-Milner para resolver las ecuaciones de tipos?', 'Unificación', ['Dijkstra', 'Ordenamiento topológico', 'Búsqueda binaria'], 'Robinson la propuso en 1965.', 3],
    ['¿Qué tipo de polimorfismo es la sobrecarga del operador + para números y textos?', 'Ad hoc', ['Paramétrico', 'De subtipos', 'Gradual'], 'Implementaciones distintas según el tipo.', 2],
    ['¿Por qué los arreglos covariantes de Java no son sólidos?', 'Porque permiten compilar código que guarda un tipo incorrecto y falla al ejecutar', ['Porque no compilan', 'Porque son lentos', 'Porque no admiten genéricos'], 'ArrayStoreException.', 4],
    ['¿Qué llamó Tony Hoare su "error del billón de dólares"?', 'La referencia nula', ['El goto', 'Los arreglos', 'La herencia múltiple'], 'La introdujo en ALGOL W en 1965.', 2],
    ['Con tipado estructural, un objeto con campos nombre y edad, ¿es compatible con un tipo que solo exige nombre?', 'Sí', ['No', 'Solo si se declara que lo implementa', 'Solo en Java'], 'Basta con tener los campos necesarios.', 3],
    { tf: 'Un sistema de tipos estático puede demostrar que un programa no tiene ningún error de ningún tipo.', v: false, e: 'Demuestra la ausencia de ciertos comportamientos, no de todos los errores.', l: 2 },
    { tf: 'Con inferencia de Hindley-Milner, un programa puede no tener ninguna anotación de tipos y aun así verificarse.', v: true, e: 'El algoritmo encuentra el tipo más general.', l: 3 },
    { c: 'Escribe «tipoDe(e)»: e es un número ("num"), un booleano ("bool"), un texto ("str") o un objeto {op, a, b} con op "+", "-", "*" (num y num → num), "<" (num y num → bool), "==" (mismo tipo, distinto de "error" → bool), "y" (bool y bool → bool); o {op: "si", c, t, e} (c bool y t, e del mismo tipo → ese tipo). Cualquier otra cosa da "error".', f: 'tipoDe', p: ['e'], t: [[[3], 'num'], [[{ op: '+', a: 1, b: 2 }], 'num'], [[{ op: '+', a: 1, b: 'x' }], 'error'], [[{ op: 'y', a: { op: '<', a: 1, b: 2 }, b: true }], 'bool'], [[{ op: 'si', c: true, t: 1, e: 2 }], 'num'], [[{ op: 'si', c: 1, t: 1, e: 2 }], 'error'], [[{ op: '==', a: 'a', b: 'b' }], 'bool']], sol: '  if (typeof e === "number") return "num";\n  if (typeof e === "boolean") return "bool";\n  if (typeof e === "string") return "str";\n  if (e.op === "si") { const c = tipoDe(e.c), t = tipoDe(e.t), f = tipoDe(e.e); return c === "bool" && t === f && t !== "error" ? t : "error"; }\n  const a = tipoDe(e.a), b = tipoDe(e.b);\n  if (["+", "-", "*"].includes(e.op)) return a === "num" && b === "num" ? "num" : "error";\n  if (e.op === "<") return a === "num" && b === "num" ? "bool" : "error";\n  if (e.op === "==") return a === b && a !== "error" ? "bool" : "error";\n  if (e.op === "y") return a === "bool" && b === "bool" ? "bool" : "error";\n  return "error";', h: 'Calcula primero los tipos de los hijos y luego aplica la regla del operador.', l: 4 },
    { c: 'Escribe «esSubtipo(a, b)» con tipado estructural: a y b son objetos {campo: tipo}; a es subtipo de b si tiene todos los campos de b con el mismo tipo.', f: 'esSubtipo', p: ['a', 'b'], t: [[[{ nombre: 'str', edad: 'num' }, { nombre: 'str' }], true], [[{ nombre: 'str' }, { nombre: 'str', edad: 'num' }], false], [[{ x: 'num' }, { x: 'str' }], false], [[{ a: 'num' }, {}], true]], sol: '  return Object.keys(b).every(k => a[k] === b[k]);', l: 2 }
  ],
  gen: function (g) {
    var js = [['"5" * 2', '10'], ['"5" + 2', '"52"'], ['"5" - 2', '3'], ['true + 1', '2'], ['[] + []', '""'], ['"3" * "4"', '12']];
    js.forEach(function (j) { g.mcq(3, 'En JavaScript, ¿qué da la expresión ' + j[0] + '?', j[1], g.R.sample(['10', '"52"', '3', '2', '""', '12', 'Un error', 'NaN'].filter(function (x) { return x !== j[1]; }), 3), 'JavaScript aplica conversiones implícitas; + con texto concatena.'); });
    var pol = [['Una función ordenar que funciona para listas de cualquier tipo comparable', 'Paramétrico'], ['El operador + definido para números y para textos', 'Ad hoc'], ['Pasar un Camion donde se espera un Vehiculo', 'De subtipos'], ['Una clase de tipos Mostrable de Haskell con una instancia por tipo', 'Ad hoc'], ['Una lista genérica Lista<T>', 'Paramétrico']];
    pol.forEach(function (p) { g.mcq(3, '¿Qué tipo de polimorfismo es este? ' + p[0], p[1], ['Paramétrico', 'Ad hoc', 'De subtipos', 'Gradual'].filter(function (x) { return x !== p[1]; }), 'Clasificación de Strachey y de Cardelli y Wegner.'); });
    var lg = [['Rust', 'Estático'], ['Python sin anotaciones', 'Dinámico'], ['Haskell', 'Estático'], ['Ruby', 'Dinámico'], ['TypeScript', 'Estático (gradual sobre JavaScript)'], ['Go', 'Estático']];
    lg.forEach(function (l) { g.mcq(2, '¿Cómo es el tipado de ' + l[0] + '?', l[1], ['Estático', 'Dinámico', 'Estático (gradual sobre JavaScript)', 'Sin tipos'].filter(function (x) { return x !== l[1]; }), 'Cuándo se verifican los tipos.'); });
  },
  checks: [
    ['Explica la definición de sistema de tipos de Pierce con tus palabras.', 'Es una forma de analizar el código sin ejecutarlo, en un tiempo razonable, que asigna tipos a las expresiones para garantizar que ciertos errores no pueden ocurrir.'],
    ['¿Qué dicen los teoremas de progreso y preservación?', 'Progreso: una expresión bien tipada es un valor o puede avanzar; preservación: al avanzar, conserva su tipo. Juntos dan la solidez.'],
    ['Compara el polimorfismo paramétrico, ad hoc y de subtipos con ejemplos.', 'Paramétrico: genéricos Lista<T>; ad hoc: sobrecarga de + o clases de tipos; de subtipos: usar un Camion donde se espera un Vehiculo.'],
    ['¿Cómo evitan los lenguajes modernos el problema de la referencia nula?', 'Con tipos opción o anulables explícitos que obligan a manejar el caso vacío antes de usar el valor.'],
    ['Verifica los tipos de «si horas > 24 y tipo == "camion" entonces tarifa = base * 2».', 'horas > 24 es Booleano, tipo == "camion" es Booleano, su conjunción es Booleano y base * 2 es Número asignado a tarifa: la regla es correcta.']
  ],
  cites: ['Pierce, B. (2002). *Types and Programming Languages*. MIT Press.', 'Milner, R. (1978). A Theory of Type Polymorphism in Programming. *Journal of Computer and System Sciences*, 17(3).', 'Damas, L. y Milner, R. (1982). Principal Type-Schemes for Functional Programs. *POPL 1982*.', 'Cardelli, L. y Wegner, P. (1985). On Understanding Types, Data Abstraction, and Polymorphism. *ACM Computing Surveys*, 17(4).', 'Wright, A. y Felleisen, M. (1994). A Syntactic Approach to Type Soundness. *Information and Computation*, 115(1).', 'Gao, Z., Bird, C. y Barr, E. (2017). To Type or Not to Type: Quantifying Detectable Bugs in JavaScript. *ICSE 2017*.', 'Siek, J. y Taha, W. (2006). Gradual Typing for Functional Languages. *Scheme and Functional Programming Workshop*.'],
  project: { t: 'Verificador de tipos con inferencia',
    goal: 'Implementar un verificador de tipos y una inferencia sencilla para un lenguaje de expresiones.',
    steps: ['Define las reglas de tipos de un lenguaje con números, booleanos, condicionales, funciones de un argumento y let.', 'Implementa un verificador que calcule el tipo de cada expresión y reporte errores con su posición.', 'Implementa la unificación de tipos con variables de tipo.', 'Implementa una versión simplificada del algoritmo W que infiera el tipo de funciones sin anotaciones, incluido un caso polimórfico como la identidad.', 'Prueba con programas correctos e incorrectos y documenta los tipos inferidos.'],
    deliver: 'El código, las pruebas y un documento con las reglas de tipos.' },
  hito: ['Implementa el verificador de tipos del lenguaje de tarifas de PatioApp con Número, Texto y Booleano, y rechaza las reglas mal tipadas antes de guardarlas.', 'Agrega al verificador de tarifas mensajes que expliquen el tipo esperado y el recibido, y pruébalo con las reglas reales de los patios.']
});

S('lc', 'lc.func', { title: 'Programación funcional y cálculo lambda',
  ask: '¿Qué concepto de programación funcional o del cálculo lambda se aplica?',
  lesson: `
> **La idea en simple.** Imagina un lenguaje que solo tiene una cosa: funciones de un argumento. Sin números, sin variables que cambian, sin bucles. Parece inútil, pero Alonzo Church demostró en los años 30 que con eso basta para calcular todo lo que se puede calcular. Ese lenguaje mínimo, el cálculo lambda, es el núcleo de la programación funcional, y sus ideas están hoy dentro de JavaScript, Python, Java y Rust.

## El cálculo lambda
Alonzo Church lo presentó en 1936, el mismo año en que Alan Turing presentó sus máquinas; ambos resolvieron por separado el problema de la decisión de Hilbert, y la equivalencia de sus modelos es la base de la **tesis de Church-Turing**. Un término del cálculo lambda es una de tres cosas:
- Una **variable**: x.
- Una **abstracción** (una función): λx.M, la función que recibe x y devuelve M.
- Una **aplicación**: M N, aplicar M a N.
Una variable es **libre** si no está ligada por ningún λ que la encierre: en λx.x y, la x está ligada y la y es libre. Dos reglas de cálculo:
- **Conversión alfa:** el nombre de una variable ligada no importa; λx.x es igual a λy.y.
- **Reducción beta:** aplicar una función es sustituir: (λx.M) N → M con N en lugar de x. Por ejemplo (λx.x + 1) 5 → 5 + 1. La sustitución debe **evitar la captura**: no puede ocurrir que una variable libre de N quede ligada sin querer.
Un término sin más reducciones posibles está en **forma normal**. El **teorema de Church-Rosser** (1936) garantiza que si existe, la forma normal es única sin importar el orden de reducción.

## Todo con funciones
Sin números ni booleanos, se **codifican** con funciones:
- Los **booleanos de Church**: verdadero = λa.λb.a (elige el primero) y falso = λa.λb.b (elige el segundo); "si c entonces t sino e" es simplemente c t e.
- Los **numerales de Church**: el número n es la función que aplica f n veces: 2 = λf.λx.f (f x). La suma, la multiplicación y la potencia se definen como funciones sobre ellos.
- La **recursión** se obtiene sin nombres con el **combinador Y**, que encuentra el punto fijo de una función.
~~~js
// Numerales y booleanos de Church en JavaScript
const cero = f => x => x, suc = n => f => x => f(n(f)(x));
const suma = m => n => f => x => m(f)(n(f)(x)), mult = m => n => f => m(n(f));
const aEntero = n => n(k => k + 1)(0);
const dos = suc(suc(cero)), tres = suc(dos);
console.log('2 + 3 =', aEntero(suma(dos)(tres)), '· 2 × 3 =', aEntero(mult(dos)(tres)));
const verdadero = a => b => a, falso = a => b => b, si = c => t => e => c(t)(e);
console.log(si(verdadero)('sí')('no'), si(falso)('sí')('no'));
~~~

## Estrategias de evaluación
¿En qué orden se reduce? La elección cambia el comportamiento de los lenguajes:
- **Orden aplicativo** o **llamada por valor**: primero se evalúan los argumentos y luego se aplica la función. Es lo que hacen JavaScript, Python, Java y la mayoría.
- **Orden normal** o **llamada por nombre**: se aplica la función sustituyendo los argumentos sin evaluar, y se evalúan solo si se necesitan. Encuentra la forma normal siempre que exista.
- **Llamada por necesidad** o **evaluación perezosa**: como por nombre, pero cada argumento se evalúa como mucho una vez y se recuerda. Es la estrategia de Haskell, y permite trabajar con estructuras infinitas («los primeros 10 de la lista de todos los primos»).

## De la teoría a los lenguajes
John McCarthy publicó en 1960 *Recursive Functions of Symbolic Expressions and Their Computation by Machine*, que presentó LISP: funciones como datos, recursión, listas y un intérprete escrito en el propio lenguaje («eval»). Peter Landin mostró en 1964 cómo ejecutar el cálculo lambda en una máquina (la máquina SECD) y en 1966 (*The Next 700 Programming Languages*) propuso ISWIM, un lenguaje basado en él que inspiró a ML y a Haskell. Harold Abelson y Gerald Sussman enseñaron durante décadas el curso introductorio del MIT con *Structure and Interpretation of Computer Programs* (1985), basado en Scheme.

## Los conceptos funcionales
- **Funciones de primera clase y de orden superior:** las funciones se pasan como argumentos, se devuelven y se guardan en estructuras. «map», «filter» y «reduce» (o *fold*) son el vocabulario básico.
- **Pureza y transparencia referencial:** una función **pura** devuelve siempre el mismo resultado para los mismos argumentos y no tiene efectos secundarios; así, cualquier llamada puede reemplazarse por su resultado. Las funciones puras son fáciles de probar, de paralelizar y de memorizar.
- **Inmutabilidad:** en lugar de modificar un dato, se crea uno nuevo. Las **estructuras de datos persistentes** (Chris Okasaki, 1998) comparten la mayor parte de su estructura con la versión anterior, de modo que "copiar" es barato.
- **Recursión y llamadas de cola:** una llamada en **posición de cola** (lo último que hace la función) puede reutilizar el marco de la pila; Guy Steele mostró en 1977 que así una llamada no es más cara que un salto. Scheme exige esta optimización; JavaScript la incluyó en ES2015 pero casi ningún motor la implementa.
- **Tipos algebraicos y coincidencia de patrones:** tipos definidos como "o esto o aquello" (una tarifa es Fija de un monto o PorHora de una tasa) y funciones que distinguen los casos de forma exhaustiva.

## Funciones sin intérprete: compilación y clausuras
Ejecutar un lenguaje funcional eficientemente exige resolver qué hacer con las clausuras y la recursión. Las técnicas clásicas son la **conversión de clausuras** (transformar cada función que captura variables en un par código más registro de entorno), el **estilo de paso de continuaciones** (hacer explícito "lo que queda por hacer" como una función adicional, que convierte toda llamada en una llamada de cola y es la base de muchos compiladores funcionales) y la **eliminación de la recursión de cola** en bucles. Andrew Appel describe estas técnicas en *Compiling with Continuations* (1992), y siguen presentes en los compiladores de OCaml, Haskell (GHC) y Scheme.

## Por qué importa
John Hughes argumentó en 1989 (*Why Functional Programming Matters*) que la ventaja central no es la ausencia de asignaciones, sino la **modularidad**: las funciones de orden superior y la evaluación perezosa permiten "pegar" programas de formas nuevas. En la industria, Erlang y Elixir sostienen sistemas de telecomunicaciones y mensajería con altísima disponibilidad, OCaml es el lenguaje principal de la firma de inversiones Jane Street, y las ideas funcionales están en React (componentes como funciones del estado), en MapReduce y en los *streams* de Java. También en hojas de cálculo: cada celda con fórmula es una función pura de otras celdas, y por eso se recalculan solas.

## Ejemplo resuelto: el intérprete de tarifas en estilo funcional
El intérprete del lenguaje de tarifas evalúa el AST con una función **pura**: «evaluar(nodo, entorno) → valor», donde el entorno es un objeto **inmutable** con las variables (horas, tipo, base). Para cada tipo de nodo hay un caso: un número devuelve su valor; un identificador lo busca en el entorno; un operador evalúa sus hijos y combina. Una regla completa devuelve un **nuevo** entorno con «tarifa» calculada, en lugar de modificar el original. Ventajas medibles: las pruebas son tablas de entradas y salidas sin preparación, el mismo conjunto de reglas se puede evaluar en paralelo para miles de estadías, y para mostrar "qué pasaría si cambio esta regla" basta con evaluar ambas versiones sobre los mismos entornos, sin miedo a que una afecte a la otra. Las funciones auxiliares del lenguaje, como «max» o «redondear», se implementan como funciones de orden superior registradas en el entorno inicial, de modo que agregar una nueva no exige tocar el intérprete. Y como cada evaluación es pura, el resultado de una regla para una estadía concreta puede guardarse en caché y reutilizarse mientras ni la regla ni la estadía cambien.`,
  links: [['teo.turing', 'el cálculo lambda y las máquinas de Turing son modelos equivalentes de computación'], ['m6.func', 'esta unidad fundamenta la programación funcional práctica del ciclo 4'], ['lc.sem', 'las clausuras dependen del ámbito léxico']],
  read: 'Pierce, *Types and Programming Languages*, capítulo 5 (The Untyped Lambda-Calculus); Abelson y Sussman, *SICP*, capítulos 1 a 3; Hughes (1989); McCarthy (1960).',
  terms: [
    ['Cálculo lambda', 'sistema formal de Church basado solo en variables, abstracción de funciones y aplicación', ['λx.x es la función identidad.', 'Es tan poderoso como las máquinas de Turing.', 'Es el núcleo de la programación funcional.']],
    ['Reducción beta', 'regla que aplica una función sustituyendo su parámetro por el argumento', ['(λx.x + 1) 5 se reduce a 5 + 1.', 'Debe evitar la captura de variables.', 'Es el paso de cálculo del cálculo lambda.']],
    ['Variable libre', 'variable de un término que no está ligada por ninguna abstracción que la encierre', ['En λx.x y, la y es libre.', 'Su valor viene del entorno.', 'Las clausuras capturan las variables libres.']],
    ['Numeral de Church', 'representación del número n como la función que aplica otra función n veces', ['2 = λf.λx.f (f x).', 'La suma se define como función.', 'Muestra que los números no son primitivos necesarios.']],
    ['Evaluación perezosa', 'estrategia que evalúa cada expresión solo cuando se necesita y como mucho una vez', ['Haskell la usa.', 'Permite listas infinitas.', 'Es la llamada por necesidad.']],
    ['Función pura', 'función que siempre devuelve lo mismo para los mismos argumentos y no tiene efectos secundarios', ['Calcular una tarifa a partir de horas y tipo.', 'Se puede memorizar su resultado.', 'Es fácil de probar.']],
    ['Transparencia referencial', 'propiedad de poder reemplazar una expresión por su valor sin cambiar el programa', ['tarifa(5) puede sustituirse por 25.', 'Se cumple con funciones puras.', 'Facilita el razonamiento y la optimización.']],
    ['Llamada de cola', 'llamada que es lo último que hace una función y puede reutilizar su marco de pila', ['Permite recursión sin agotar la pila.', 'Scheme exige optimizarla.', 'Steele mostró que equivale a un salto.']]
  ],
  q: [
    ['¿A qué se reduce (λx.x * 2) 7?', '7 * 2', ['x * 2', '7', 'λx.14'], 'Reducción beta: se sustituye x por 7.', 2],
    ['En el término λx.x y, ¿qué variables son libres?', 'y', ['x', 'x e y', 'Ninguna'], 'x está ligada por λx.', 2],
    ['¿Qué garantiza el teorema de Church-Rosser?', 'Que la forma normal, si existe, es única sin importar el orden de reducción', ['Que todo término tiene forma normal', 'Que la evaluación perezosa es más rápida', 'Que no hay recursión'], 'La reducción es confluente.', 4],
    ['¿Qué estrategia de evaluación usan JavaScript y Python?', 'Llamada por valor', ['Llamada por nombre', 'Llamada por necesidad', 'Evaluación perezosa total'], 'Evalúan los argumentos antes de llamar.', 2],
    ['¿Qué permite la evaluación perezosa de Haskell?', 'Trabajar con estructuras infinitas y evitar cálculos innecesarios', ['Mutar variables', 'Evitar los tipos', 'Ejecutar sin compilador'], 'Solo se calcula lo que se necesita.', 3],
    ['Con los booleanos de Church, ¿qué devuelve verdadero aplicado a "sí" y luego a "no"?', '"sí"', ['"no"', 'verdadero', 'Un error'], 'verdadero = λa.λb.a elige el primero.', 3],
    ['Según Hughes (1989), ¿cuál es la ventaja central de la programación funcional?', 'La modularidad que dan las funciones de orden superior y la evaluación perezosa', ['La ausencia de tipos', 'La velocidad de ejecución', 'El uso de menos memoria'], 'Permiten combinar programas de formas nuevas.', 3],
    { tf: 'Una función que escribe en un archivo además de devolver un valor es pura.', v: false, e: 'Tiene un efecto secundario.', l: 1 },
    { tf: 'El cálculo lambda sin números ni booleanos puede representarlos codificándolos como funciones.', v: true, e: 'Numerales y booleanos de Church.', l: 2 },
    { c: 'Escribe «libres(t)»: t es un término lambda como texto (variable), ["λ", x, cuerpo] o [f, a] (aplicación); devuelve sus variables libres ordenadas sin repetir.', f: 'libres', p: ['t'], t: [[['x'], ['x']], [[['λ', 'x', 'x']], []], [[['λ', 'x', ['x', 'y']]], ['y']], [[[['λ', 'x', 'x'], 'z']], ['z']], [[['λ', 'x', ['λ', 'y', [['x', 'z'], 'y']]]], ['z']]], sol: '  const f = u => {\n    if (typeof u === "string") return new Set([u]);\n    if (u[0] === "λ") { const s = f(u[2]); s.delete(u[1]); return s; }\n    return new Set([...f(u[0]), ...f(u[1])]);\n  };\n  return [...f(t)].sort();', h: 'Una variable es libre en sí misma; la abstracción quita su parámetro; la aplicación une ambas partes.', l: 4 },
    { c: 'Escribe «plegar(lista, inicial, op)» como un fold por la izquierda con op "+", "*" o "max".', f: 'plegar', p: ['lista', 'inicial', 'op'], t: [[[[1, 2, 3, 4], 0, '+'], 10], [[[1, 2, 3, 4], 1, '*'], 24], [[[3, 9, 2], -Infinity, 'max'], 9], [[[], 5, '+'], 5]], sol: '  const f = { "+": (a, b) => a + b, "*": (a, b) => a * b, max: (a, b) => Math.max(a, b) }[op];\n  return lista.reduce(f, inicial);', l: 2 },
    { c: 'Escribe «tuberia(x, pasos)»: aplica en orden pasos como ["sumar", n], ["por", n] o ["cuadrado"] sin mutar nada.', f: 'tuberia', p: ['x', 'pasos'], t: [[[2, [['sumar', 3], ['por', 2]]], 10], [[3, [['cuadrado'], ['sumar', 1]]], 10], [[5, []], 5]], sol: '  return pasos.reduce((v, [op, n]) => op === "sumar" ? v + n : op === "por" ? v * n : v * v, x);', l: 2 }
  ],
  gen: function (g) {
    var br = [['(λx.x + 1) 4', '4 + 1'], ['(λx.x * x) 3', '3 * 3'], ['(λy.y) z', 'z'], ['(λx.5) 9', '5'], ['(λx.x x) a', 'a a'], ['(λf.f 2) g', 'g 2']];
    br.forEach(function (b) { g.mcq(2, '¿A qué se reduce en un paso beta ' + b[0] + '?', b[1], g.R.sample(br.map(function (x) { return x[1]; }).filter(function (x) { return x !== b[1]; }), 3), 'Se sustituye el parámetro por el argumento.'); });
    var fv = [['λx.x', 'Ninguna'], ['λx.y', 'y'], ['x y', 'x e y'], ['λx.λy.x z', 'z'], ['(λx.x) y', 'y'], ['λy.x y', 'x']];
    fv.forEach(function (f) { g.mcq(3, '¿Qué variables libres tiene el término ' + f[0] + '?', f[1], ['Ninguna', 'x', 'y', 'z', 'x e y'].filter(function (x) { return x !== f[1]; }).slice(0, 3), 'Libre: no ligada por un λ que la encierre.'); });
    var pu = [['Una función que calcula la tarifa a partir de horas y tipo', true], ['Una función que lee la hora actual del sistema', false], ['Una función que imprime en consola y devuelve 0', false], ['Una función que suma los elementos de una lista sin modificarla', true], ['Una función que incrementa un contador global', false]];
    pu.forEach(function (p) { g.tf(2, '«' + p[0] + '» es una función pura.', p[1], p[1] ? 'Mismo resultado para los mismos argumentos y sin efectos.' : 'Depende de algo externo o tiene efectos secundarios.'); });
  },
  checks: [
    ['Describe las tres formas de término del cálculo lambda y la reducción beta.', 'Variable, abstracción λx.M y aplicación M N; la reducción beta aplica (λx.M) N sustituyendo x por N en M, evitando la captura.'],
    ['¿Cómo se representan los booleanos y los números solo con funciones?', 'verdadero = λa.λb.a y falso = λa.λb.b; el número n es la función que aplica f n veces a x.'],
    ['Compara llamada por valor, por nombre y por necesidad.', 'Por valor evalúa los argumentos antes; por nombre los sustituye sin evaluar y los evalúa cada vez que se usan; por necesidad los evalúa una sola vez cuando se necesitan.'],
    ['¿Qué ventajas tienen las funciones puras?', 'Se pueden probar sin preparación, memorizar, paralelizar y reemplazar por su resultado, porque no dependen del estado ni lo modifican.'],
    ['¿Por qué importan las llamadas de cola?', 'Porque permiten recursión sin agotar la pila, reutilizando el marco de la función en cada llamada.']
  ],
  cites: ['Church, A. (1936). An Unsolvable Problem of Elementary Number Theory. *American Journal of Mathematics*, 58(2).', 'McCarthy, J. (1960). Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I. *Communications of the ACM*, 3(4).', 'Landin, P. (1966). The Next 700 Programming Languages. *Communications of the ACM*, 9(3).', 'Abelson, H. y Sussman, G. (1996). *Structure and Interpretation of Computer Programs* (2.ª ed.). MIT Press.', 'Hughes, J. (1989). Why Functional Programming Matters. *The Computer Journal*, 32(2).', 'Okasaki, C. (1998). *Purely Functional Data Structures*. Cambridge University Press.', 'Appel, A. (1992). *Compiling with Continuations*. Cambridge University Press.'],
  project: { t: 'Intérprete de cálculo lambda',
    goal: 'Implementar un intérprete del cálculo lambda y explorar la programación con funciones.',
    steps: ['Representa términos lambda e implementa la sustitución que evita la captura y la reducción beta.', 'Implementa la reducción en orden normal y en orden aplicativo, y muestra un término que termina en uno y no en el otro.', 'Define booleanos, numerales, suma, multiplicación y el combinador Y, y calcula el factorial de 4 solo con funciones.', 'Reescribe un módulo pequeño de un proyecto tuyo en estilo funcional puro con datos inmutables.', 'Compara la facilidad de prueba antes y después.'],
    deliver: 'El intérprete, los ejemplos y el informe de la reescritura.' },
  hito: ['Implementa el intérprete del lenguaje de tarifas de PatioApp como una función pura que recibe el AST y un entorno inmutable y devuelve un entorno nuevo con la tarifa.', 'Agrega a PatioApp una simulación que evalúe en paralelo una regla actual y una propuesta sobre las estadías del mes, mostrando la diferencia de ingresos.']
});
})();
