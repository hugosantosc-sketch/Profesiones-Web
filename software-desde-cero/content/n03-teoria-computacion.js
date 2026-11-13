(function () {
var M = SDC.M, S = SDC.S;
M('teo', { title: 'Teoría de la computación',
  desc: 'Qué puede y qué no puede calcular una computadora, y cuánto le cuesta. Es la base teórica de las expresiones regulares, los compiladores, los límites de las herramientas de análisis y la criptografía.',
  thread: 'PatioApp valida placas con autómatas, define su lenguaje de consultas con una gramática formal, protege su evaluador contra consultas que no terminan y asigna turnos con heurísticas porque el problema exacto es NP-difícil.',
  books: '*Introduction to the Theory of Computation* (Sipser), *Introduction to Automata Theory, Languages, and Computation* (Hopcroft, Motwani y Ullman), *Computers and Intractability* (Garey y Johnson).',
  uni: 'MIT 18.404J *Theory of Computation* (curso de Michael Sipser); Stanford CS103 y CS154 *Introduction to the Theory of Computing*; Berkeley CS172 *Computability and Complexity*; Harvard CS121; CMU 15-251 *Great Ideas in Theoretical Computer Science*. En Perú: Teoría de la Computación y Lenguajes Formales y Autómatas (UNMSM, UNI, PUCP, UTEC).',
  capstone: { t: 'Validador, analizador y planificador del patio',
    goal: 'Aplicar los resultados de la teoría a herramientas reales de PatioApp y explicar sus límites con rigor.',
    steps: ['Implementa validadores con autómatas finitos para placas y códigos, y demuestra que no sufren retroceso catastrófico.', 'Escribe la gramática del lenguaje de consultas en BNF, elimina ambigüedades y genera consultas aleatorias para probar el analizador.', 'Documenta qué propiedades de las consultas no se pueden decidir en general y qué límites aplicas en su lugar.', 'Modela la asignación de turnos como problema NP-difícil, resuélvelo exacto para casos pequeños y con una heurística para casos grandes.', 'Compara la calidad de la heurística con el óptimo en 100 casos aleatorios.'],
    deliver: 'El código, la gramática, el documento de límites y la comparación de la heurística con el óptimo.' } });

S('teo', 'teo.auto', { title: 'Autómatas finitos y expresiones regulares',
  ask: '¿Qué concepto de autómatas o lenguajes se aplica?',
  lesson: `
> **La idea en simple.** Un torniquete del metro tiene dos estados: cerrado y abierto. Si pagas, pasa a abierto; si empujas, pasa a cerrado. No recuerda nada más. Esa máquina con memoria finita es un **autómata finito**, el modelo de computación más simple, y está detrás de cada expresión regular que escribes.

## Lenguajes formales
Un **alfabeto** es un conjunto finito de símbolos (por ejemplo {0, 1} o las letras y dígitos). Una **cadena** es una secuencia finita de símbolos y un **lenguaje** es un conjunto de cadenas: "todas las placas válidas", "todos los números binarios múltiplos de 3", "todos los programas de JavaScript que compilan". La teoría de la computación estudia qué máquinas pueden **reconocer** cada tipo de lenguaje, es decir, decidir si una cadena pertenece o no.

## Autómata finito determinista (AFD)
Michael Sipser, en *Introduction to the Theory of Computation* (el libro del curso 18.404J del MIT), lo define como una quíntupla: un conjunto finito de **estados**, un **alfabeto**, una **función de transición** que, dado un estado y un símbolo, dice a qué estado ir, un **estado inicial** y un conjunto de **estados de aceptación**. Se lee la cadena símbolo por símbolo; si al final se está en un estado de aceptación, la cadena se acepta.
~~~js
// AFD que acepta los números binarios múltiplos de 3. El estado es el resto actual.
const delta = { 0: { '0': 0, '1': 1 }, 1: { '0': 2, '1': 0 }, 2: { '0': 1, '1': 2 } };
function acepta(cadena) { let q = 0; for (const s of cadena) q = delta[q][s]; return q === 0; }
for (const n of [6, 7, 9, 10, 21]) console.log(n, n.toString(2), acepta(n.toString(2)));
~~~
El truco: leer un bit más equivale a multiplicar por 2 y sumar el bit, así que basta recordar el **resto módulo 3**. Un autómata finito no puede contar sin límite; solo recuerda en cuál de sus estados está.

## No determinismo
Un **autómata no determinista** (AFN) puede tener varias transiciones para el mismo símbolo, o transiciones sin leer nada. Acepta si **algún** camino posible termina en aceptación. Michael Rabin y Dana Scott demostraron en 1959 que los AFN no reconocen más lenguajes que los AFD: todo AFN se convierte en un AFD equivalente con la **construcción de subconjuntos** (cada estado del AFD es un conjunto de estados del AFN). El precio puede ser exponencial: un AFN de n estados puede necesitar 2ⁿ estados deterministas. Rabin y Scott recibieron el Premio Turing en 1976 por este trabajo.

## Expresiones regulares
Stephen Kleene introdujo en 1956 las **expresiones regulares** con tres operaciones: unión (a|b), concatenación (ab) y repetición (a*), y demostró el **teorema de Kleene**: un lenguaje se describe con una expresión regular si y solo si lo reconoce un autómata finito. Ken Thompson llevó la teoría a la práctica en 1968: su algoritmo convierte una expresión regular en un AFN y lo simula en tiempo lineal. Así nacieron «grep» y los analizadores léxicos de los compiladores.

## Lo que un autómata finito no puede hacer
El **lema de bombeo** demuestra que ciertos lenguajes no son regulares. El ejemplo clásico es {aⁿbⁿ}: igual cantidad de "a" seguidas de "b". Un autómata con k estados, al leer más de k letras "a", repite algún estado y no puede recordar cuántas leyó. Consecuencia práctica muy repetida: **no se pueden validar paréntesis balanceados ni HTML anidado con una expresión regular verdadera**; hace falta una pila (el tema siguiente).

## Cuando las expresiones regulares se vuelven peligrosas
Muchos motores modernos (los de JavaScript, Java, Python, PCRE) no simulan un autómata: prueban alternativas con **retroceso** (*backtracking*), y además permiten extensiones que ya no son regulares (referencias hacia atrás). Con patrones como «(a+)+$» y una entrada de muchas "a" seguida de un carácter que no coincide, el tiempo crece de forma **exponencial**. Es el ataque **ReDoS**. El 2 de julio de 2019, una regla de firewall de Cloudflare con una expresión de este tipo llevó la CPU de sus servidores al 100% y dejó sin servicio a buena parte de los sitios que protegía durante unos 27 minutos. Russ Cox explicó en 2007 (*Regular Expression Matching Can Be Simple And Fast*) que los motores basados en autómatas, como RE2 de Google, garantizan tiempo lineal.
~~~js
const peligrosa = /^(a+)+$/;
for (const n of [16, 20, 22]) {
  const t = performance.now(); peligrosa.test('a'.repeat(n) + '!');
  console.log(n, 'caracteres →', Math.round(performance.now() - t), 'ms');   // crece de forma exponencial
}
~~~

## Dónde los usarás
Validaciones de formato, analizadores léxicos, búsqueda de texto, protocolos de red (máquinas de estados de TCP), lógica de interfaces (un formulario de varios pasos) y juegos. Minimizar un autómata (algoritmo de John Hopcroft, 1971) da la versión con menos estados posible, útil para comparar si dos validaciones aceptan exactamente lo mismo.

## Ejemplo resuelto: el autómata de una placa
Queremos aceptar exactamente tres letras mayúsculas seguidas de tres dígitos («ABC123»).
1. **Estados:** q0 (nada leído), q1, q2 y q3 (una, dos y tres letras), q4, q5 y q6 (uno, dos y tres dígitos) y un estado **trampa** al que se va ante cualquier símbolo inesperado y del que no se sale.
2. **Transiciones:** de q0 a q1, de q1 a q2 y de q2 a q3 con una letra; de q3 a q4, de q4 a q5 y de q5 a q6 con un dígito; todo lo demás va a la trampa.
3. **Aceptación:** solo q6.
Son 8 estados en total. Para «AB1234» el autómata llega a q2, lee «1» y cae en la trampa: rechaza. El autómata **nunca retrocede**: lee cada carácter una sola vez, por eso su tiempo es lineal y no hay ataque posible por retroceso. La expresión equivalente es «^[A-Z]{3}[0-9]{3}$», que un motor basado en autómatas compila exactamente a esta máquina.
Ahora en la dirección contraria: la expresión «a(b|c)*» se lee como una «a» seguida de cualquier cantidad de «b» o «c». Su autómata tiene dos estados útiles: el inicial, que con «a» pasa al de aceptación, y el de aceptación, que con «b» o «c» vuelve a sí mismo. «abcb» se acepta; «ba» no, porque la primera letra no es «a».`,
  links: [['m8.comp', 'el analizador léxico de un compilador es un autómata finito'], ['m5.pat2', 'el patrón State implementa una máquina de estados'], ['mat2.num', 'el autómata de los múltiplos de 3 trabaja con restos modulares']],
  read: 'Sipser, capítulo 1; Hopcroft, Motwani y Ullman, capítulos 2 a 4; Cox (2007).',
  terms: [
    ['Alfabeto', 'conjunto finito de símbolos con los que se forman las cadenas de un lenguaje', ['Para números binarios usas solo 0 y 1.', 'Las placas usan letras mayúsculas y dígitos.', 'Un protocolo define los mensajes posibles como sus símbolos.']],
    ['Lenguaje formal', 'conjunto de cadenas sobre un alfabeto, definido por una regla precisa', ['"Todas las placas válidas" es uno de ellos.', 'Los programas de JavaScript sin errores de sintaxis forman uno.', 'Decidir si una cadena pertenece es el problema de reconocimiento.']],
    ['Autómata finito determinista', 'máquina con estados finitos que, para cada estado y símbolo, tiene exactamente una transición', ['Validas si un número binario es múltiplo de 3 recordando solo el resto.', 'El torniquete pasa de cerrado a abierto al pagar.', 'El analizador léxico reconoce identificadores y números.']],
    ['Autómata no determinista', 'máquina de estados que puede tener varias transiciones para el mismo símbolo y acepta si algún camino termina en aceptación', ['El algoritmo de Thompson convierte una expresión regular en una de estas máquinas.', 'Se puede convertir en una determinista con la construcción de subconjuntos.', 'Explora varias posibilidades en paralelo.']],
    ['Expresión regular', 'notación con unión, concatenación y repetición que describe un lenguaje regular', ['Escribes ^[A-Z0-9]{6}$ para validar una placa.', 'grep busca líneas que coinciden con una de ellas.', 'Kleene la introdujo en 1956.']],
    ['Lenguaje regular', 'lenguaje que puede reconocer un autómata finito o describir una expresión regular', ['Las fechas con formato AAAA-MM-DD forman uno.', 'Los paréntesis balanceados no lo son.', 'Su reconocimiento solo necesita memoria finita.']],
    ['Lema de bombeo', 'propiedad que cumplen todos los lenguajes regulares y que sirve para demostrar que un lenguaje no lo es', ['Demuestras que {aⁿbⁿ} no se reconoce con memoria finita.', 'Justificas por qué no puedes validar HTML anidado con una expresión regular.', 'Se basa en que un camino largo repite algún estado.']],
    ['Retroceso catastrófico', 'crecimiento exponencial del tiempo de un motor de expresiones regulares que prueba alternativas con retroceso', ['Una regla de firewall dejó caída una red de servidores en 2019.', 'El patrón (a+)+$ tarda segundos con 30 letras.', 'Un atacante lo provoca enviando una entrada diseñada.']]
  ],
  q: [
    ['¿Qué necesita recordar un AFD que acepta binarios múltiplos de 3?', 'Solo el resto de lo leído módulo 3', ['El número completo', 'La cantidad de unos', 'La longitud de la cadena'], 'Leer un bit equivale a multiplicar por 2 y sumar; basta con el resto.', 3],
    ['¿Por qué no se pueden validar paréntesis balanceados con una expresión regular verdadera?', 'Porque requiere contar sin límite y un autómata finito tiene memoria finita', ['Porque los paréntesis son caracteres especiales', 'Porque las expresiones regulares son lentas', 'Sí se puede con cualquier motor'], 'El lenguaje de paréntesis balanceados no es regular.', 4],
    ['¿Qué demostraron Rabin y Scott en 1959?', 'Que los autómatas no deterministas y los deterministas reconocen los mismos lenguajes', ['Que el no determinismo es más poderoso', 'Que las expresiones regulares son indecidibles', 'Que todo lenguaje es regular'], 'Con la construcción de subconjuntos se convierte uno en otro.', 3],
    ['¿Qué tipo de motor de expresiones regulares garantiza tiempo lineal?', 'Uno basado en simular autómatas, como RE2', ['Uno con retroceso, como el de JavaScript', 'Cualquiera si el patrón es corto', 'Ninguno'], 'Simular un autómata procesa cada carácter un número acotado de veces.', 4],
    { tf: 'Todo lenguaje que reconoce un autómata finito puede describirse con una expresión regular.', v: true, e: 'Es el teorema de Kleene.', l: 2 },
    { tf: 'Convertir un AFN de n estados en un AFD siempre produce como máximo n estados.', v: false, e: 'Puede necesitar hasta 2ⁿ estados.', l: 3 },
    { i: 'Un AFD tiene estados que representan el resto módulo 5. ¿Cuántos estados necesita?', a: 5, e: 'Uno por cada resto posible: 0, 1, 2, 3 y 4.', l: 2 },
    { c: 'Escribe «aceptaAFD(delta, inicial, finales, cadena)» donde delta es un objeto {estado: {símbolo: siguiente}} y finales una lista de estados de aceptación. Si falta una transición, rechaza.', f: 'aceptaAFD', p: ['delta', 'inicial', 'finales', 'cadena'], t: [[[{ par: { '1': 'impar', '0': 'par' }, impar: { '1': 'par', '0': 'impar' } }, 'par', ['par'], '1011'], false], [[{ par: { '1': 'impar', '0': 'par' }, impar: { '1': 'par', '0': 'impar' } }, 'par', ['par'], '1001'], true], [[{ q0: { a: 'q1' }, q1: { b: 'q0' } }, 'q0', ['q0'], 'abab'], true], [[{ q0: { a: 'q1' }, q1: { b: 'q0' } }, 'q0', ['q0'], 'aab'], false]], sol: '  let q = inicial;\n  for (const s of cadena) {\n    if (!delta[q] || delta[q][s] === undefined) return false;\n    q = delta[q][s];\n  }\n  return finales.includes(q);', h: 'Recorre la cadena actualizando el estado; al final revisa si es de aceptación.', l: 3 },
    { c: 'Escribe «multiploDe3(binario)» simulando el autómata de restos (sin convertir a número).', f: 'multiploDe3', p: ['binario'], t: [[['110'], true], [['111'], false], [['1001'], true], [['0'], true]], sol: '  let r = 0;\n  for (const b of binario) r = (2 * r + Number(b)) % 3;\n  return r === 0;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(1, 200), b = n.toString(2); g.mcq(2, '¿Acepta el autómata de "múltiplos de 3" la cadena binaria ' + b + '?', n % 3 === 0 ? 'Sí' : 'No', [n % 3 === 0 ? 'No' : 'Sí', 'Depende del alfabeto', 'No se puede saber'], b + ' es ' + n + ', cuyo resto entre 3 es ' + n % 3 + '.'); });
    var pats = [['^[A-Z]{3}[0-9]{3}$', 'tres letras mayúsculas seguidas de tres dígitos'], ['^(ab)*$', 'repeticiones de "ab"'], ['^a*b$', 'cero o más "a" y una "b" final'], ['^[0-9]+(\\.[0-9]{2})?$', 'un número con dos decimales opcionales']];
    var ejemplos = { 0: ['ABC123', 'AB1234', 'abc123', 'XYZ999', 'A1B2C3'], 1: ['abab', 'aba', '', 'ababab', 'ba'], 2: ['aab', 'b', 'ab', 'aa', 'abb'], 3: ['12', '12.50', '12.5', '.50', '7.00'] };
    pats.forEach(function (p, i) { ejemplos[i].forEach(function (c) { var ok = new RegExp(p[0]).test(c); g.mcq(3, 'La expresión «' + p[0] + '» (' + p[1] + '), ¿acepta la cadena "' + c + '"?', ok ? 'Sí' : 'No', [ok ? 'No' : 'Sí', 'Solo en modo multilínea', 'Depende del motor'], ok ? 'La cadena encaja en el patrón completo.' : 'Falla alguna parte del patrón.'); }); });
    g.times(4, function (R) { var n = R.int(3, 8); g.input(4, 'Un AFN tiene ' + n + ' estados. ¿Cuántos estados puede necesitar, como máximo, el AFD equivalente?', Math.pow(2, n), 'Cada estado del AFD es un subconjunto: 2^' + n + ' = ' + Math.pow(2, n) + '.'); });
  },
  checks: [
    ['¿Qué cinco elementos definen un autómata finito determinista?', 'Un conjunto finito de estados, un alfabeto, una función de transición, un estado inicial y un conjunto de estados de aceptación.'],
    ['¿Qué dice el teorema de Kleene y por qué importa?', 'Que las expresiones regulares y los autómatas finitos describen exactamente los mismos lenguajes; por eso una expresión regular se puede compilar a un autómata eficiente.'],
    ['Explica con la idea del lema de bombeo por qué {aⁿbⁿ} no es regular.', 'Un autómata con k estados, al leer más de k letras "a", repite un estado; no puede distinguir cuántas leyó, así que aceptaría también cadenas con distinta cantidad de "a" y "b".'],
    ['¿Qué es ReDoS y cómo te proteges?', 'Un ataque que envía entradas que provocan retroceso exponencial en una expresión regular; se evita con patrones sin repeticiones anidadas ambiguas, límites de longitud o motores de tiempo lineal como RE2.'],
    ['¿Cuándo una expresión regular deja de ser suficiente para validar algo?', 'Cuando el formato requiere memoria no acotada, como estructuras anidadas (paréntesis, JSON, HTML); entonces hace falta un analizador con pila.']
  ],
  cites: ['Sipser, M. (2012). *Introduction to the Theory of Computation* (3.ª ed.). Cengage. Capítulo 1.', 'Rabin, M. y Scott, D. (1959). Finite Automata and Their Decision Problems. *IBM Journal of Research and Development*, 3(2).', 'Kleene, S. C. (1956). Representation of Events in Nerve Nets and Finite Automata. *Automata Studies*, Princeton University Press.', 'Thompson, K. (1968). Regular Expression Search Algorithm. *Communications of the ACM*, 11(6).', 'Cox, R. (2007). Regular Expression Matching Can Be Simple And Fast. swtch.com.', 'Graham-Cumming, J. (2019). Details of the Cloudflare outage on July 2, 2019. Blog de Cloudflare.'],
  project: { t: 'Motor de autómatas propio',
    goal: 'Construir y comparar autómatas deterministas, no deterministas y expresiones regulares.',
    steps: ['Implementa un simulador de AFD y diseña autómatas para: binarios múltiplos de 5, cadenas con cantidad par de "a" y placas válidas.', 'Implementa un AFN con la construcción de subconjuntos para convertirlo en AFD y cuenta los estados resultantes.', 'Implementa la construcción de Thompson para expresiones con unión, concatenación y estrella.', 'Compara el tiempo de tu motor con el de RegExp de JavaScript sobre el patrón (a+)+$ con entradas de 10 a 30 caracteres.', 'Dibuja cada autómata (por ejemplo con Mermaid) y documenta los resultados.'],
    deliver: 'El motor, los diagramas y el gráfico de tiempos que muestre el retroceso catastrófico.' },
  hito: ['Valida en PatioApp las placas, los correos y los códigos de ticket con expresiones regulares sin repeticiones anidadas (o con un autómata) y prueba que entradas maliciosas de 10 000 caracteres no la ralentizan.', 'Dibuja el autómata de estados de una unidad (ingresada, en revisión, lista, entregada, anulada) y verifica que el código acepta exactamente sus transiciones.']
});

S('teo', 'teo.gram', { title: 'Gramáticas y análisis sintáctico',
  ask: '¿Qué concepto de gramáticas o análisis se aplica?',
  lesson: `
> **La idea en simple.** "Una oración es un sujeto seguido de un verbo; un sujeto es un artículo seguido de un sustantivo." Con unas pocas reglas así se generan infinitas oraciones. Las gramáticas formales describen exactamente qué textos son programas válidos, y de ellas se construyen los analizadores de todos los lenguajes.

## La jerarquía de Chomsky
Noam Chomsky clasificó en 1956 las gramáticas en cuatro niveles, cada uno más poderoso que el anterior y con su propia máquina:
| Tipo | Gramática | Máquina que lo reconoce | Ejemplo |
| 3 | regular | autómata finito | identificadores, números |
| 2 | libre de contexto | autómata de pila | paréntesis balanceados, expresiones, JSON |
| 1 | sensible al contexto | autómata linealmente acotado | {aⁿbⁿcⁿ} |
| 0 | sin restricciones | máquina de Turing | cualquier lenguaje reconocible |
La sintaxis de casi todos los lenguajes de programación se describe con gramáticas **libres de contexto**; lo que no cabe ahí (declarar una variable antes de usarla, tipos compatibles) lo verifica el análisis semántico.

## Gramáticas libres de contexto y BNF
Una gramática libre de contexto tiene **símbolos terminales** (los tokens), **no terminales** (categorías como Expresión), un símbolo inicial y **producciones** de la forma A → secuencia. John Backus usó en 1959 una notación para describir ALGOL, y Peter Naur la empleó en el informe de ALGOL 60 (1960): se la conoce como **forma de Backus-Naur** (BNF).
~~~txt
<consulta>   ::= <condicion> | <consulta> "o" <condicion>
<condicion>  ::= <termino>   | <condicion> "y" <termino>
<termino>    ::= <campo> <op> <valor> | "(" <consulta> ")"
<op>         ::= "=" | "<" | ">"
~~~
Esta gramática da a "y" más precedencia que a "o" con la misma técnica que la multiplicación tiene sobre la suma: un nivel de la gramática por cada nivel de precedencia.

## Derivaciones, árboles y ambigüedad
Una **derivación** aplica producciones desde el símbolo inicial hasta obtener la cadena; el **árbol de análisis** muestra qué regla produjo cada parte. Una gramática es **ambigua** si una misma cadena tiene dos árboles distintos. El caso más famoso es el **else colgante**:
~~~txt
if (a) if (b) x(); else y();     // ¿el else pertenece al primer if o al segundo?
~~~
La gramática ingenua permite ambos árboles; los lenguajes resuelven la ambigüedad con una regla adicional (el else va con el if más cercano). Una gramática ambigua es un error de diseño: el mismo programa podría significar dos cosas.

## El autómata de pila
Un autómata de pila es un autómata finito con una **pila** de memoria ilimitada. Con ella reconoce paréntesis balanceados: apila al abrir, desapila al cerrar y comprueba que coincidan. Es exactamente lo que hace un analizador al procesar bloques anidados.
~~~js
function balanceado(s) {
  const pares = { ')': '(', ']': '[', '}': '{' }, pila = [];
  for (const c of s) {
    if ('([{'.includes(c)) pila.push(c);
    else if (c in pares && pila.pop() !== pares[c]) return false;
  }
  return pila.length === 0;
}
console.log(balanceado('{[()()]}'), balanceado('([)]'), balanceado('(('));
~~~

## Dos familias de analizadores
- **Descendentes (LL):** empiezan por el símbolo inicial y eligen qué regla aplicar mirando los próximos tokens. El **descendente recursivo** que construiste en el módulo de sistemas es de esta familia: una función por no terminal. Son fáciles de escribir a mano, pero no admiten **recursión por la izquierda** (A → A x), que hay que reescribir como repetición.
- **Ascendentes (LR):** Donald Knuth los presentó en 1965 (*On the translation of languages from left to right*). Leen tokens y los **reducen** a no terminales cuando reconocen el lado derecho de una regla. Son más poderosos. Frank DeRemer propuso en 1969 la variante LALR, que usó Stephen Johnson en **yacc** (1975), el generador de analizadores de Unix, y su sucesor Bison.
Para gramáticas generales existen algoritmos como CYK (cúbico) y el de Jay Earley (1970). Bryan Ford propuso en 2004 las **gramáticas de expresiones de análisis** (PEG), sin ambigüedad por construcción. Herramientas como ANTLR, de Terence Parr, generan analizadores a partir de una gramática.

## Por qué un ingeniero de software necesita esto
Cada vez que diseñas un formato de configuración, un lenguaje de consultas, una plantilla o un protocolo de texto, estás diseñando un lenguaje. Escribir su gramática primero evita ambigüedades, permite generar el analizador y documenta el formato. Aho, Lam, Sethi y Ullman dedican los capítulos 2 y 4 del "libro del dragón" a este tema, y Hopcroft, Motwani y Ullman los capítulos 5 a 7 de su libro de autómatas.

## Ejemplo resuelto: derivar una consulta
Con la gramática de consultas de arriba, derivemos «marca = Kia o km < 50 y estado = lista»:
1. <consulta> → <consulta> "o" <condicion>
2. La <consulta> de la izquierda → <condicion> → <termino> → «marca = Kia».
3. La <condicion> de la derecha → <condicion> "y" <termino>, que produce «km < 50» y «estado = lista».
El árbol agrupa así: **marca = Kia o (km < 50 y estado = lista)**. No hay otra derivación posible, porque "o" solo aparece en el nivel <consulta> y "y" solo en el nivel <condicion>: la gramática no es ambigua y la precedencia quedó fijada por su forma. Si el usuario quiere la otra agrupación, debe escribir paréntesis, y la regla <termino> ::= "(" <consulta> ")" lo permite.
El mismo método describe formatos que usas a diario. Un fragmento de la gramática de JSON es <valor> ::= <objeto> | <arreglo> | <texto> | <numero> | "true" | "false" | "null", con <arreglo> ::= "[" "]" | "[" <valor> ("," <valor>)* "]". La recursión de <valor> dentro de <arreglo> es justamente lo que una expresión regular no puede expresar.`,
  links: [['m8.comp', 'el analizador sintáctico de un compilador se construye desde una gramática'], ['teo.auto', 'las gramáticas regulares equivalen a los autómatas finitos'], ['m4.stack', 'el autómata de pila usa la estructura de pila']],
  read: 'Sipser, capítulo 2; Hopcroft, Motwani y Ullman, capítulos 5 a 7; Aho, Lam, Sethi y Ullman, capítulo 4.',
  terms: [
    ['Jerarquía de Chomsky', 'clasificación de las gramáticas en cuatro niveles de poder expresivo, cada uno con su máquina reconocedora', ['Ubicas a JSON entre los lenguajes libres de contexto.', 'Explicas por qué una expresión regular no basta para HTML.', 'Relacionas cada tipo de lenguaje con una máquina.']],
    ['Gramática libre de contexto', 'conjunto de producciones donde cada regla reemplaza un no terminal por una secuencia de símbolos', ['Describes la sintaxis de las expresiones aritméticas.', 'La especificación de JSON se escribe con este tipo de reglas.', 'Lo que no cubre (tipos, declaraciones) lo revisa el análisis semántico.']],
    ['BNF', 'notación para escribir gramáticas con reglas del tipo <no terminal> ::= alternativas', ['El informe de ALGOL 60 definió el lenguaje con ella.', 'Documentas el lenguaje de consultas de tu aplicación.', 'Se escribe <condicion> ::= <termino> | <condicion> "y" <termino>.']],
    ['Derivación', 'secuencia de aplicaciones de producciones que transforma el símbolo inicial en una cadena', ['Muestras paso a paso cómo la gramática genera "a + b * c".', 'Puede hacerse por la izquierda o por la derecha.', 'Cada paso reemplaza un no terminal.']],
    ['Árbol de análisis', 'árbol que muestra qué producción generó cada parte de una cadena', ['El compilador lo simplifica en un árbol de sintaxis abstracta.', 'Revela que la multiplicación se agrupa antes que la suma.', 'Si una cadena tiene dos, la gramática es ambigua.']],
    ['Ambigüedad', 'propiedad de una gramática que permite dos árboles de análisis distintos para la misma cadena', ['El else colgante podría pertenecer a cualquiera de dos if.', 'Una consulta "a o b y c" podría agruparse de dos formas.', 'Se elimina reescribiendo la gramática o fijando reglas de precedencia.']],
    ['Autómata de pila', 'autómata finito que además dispone de una pila de memoria ilimitada', ['Reconoce paréntesis balanceados apilando al abrir y desapilando al cerrar.', 'Es la máquina de los lenguajes libres de contexto.', 'Un analizador LR es una versión práctica de esta máquina.']],
    ['Analizador LR', 'analizador ascendente que lee de izquierda a derecha y reduce secuencias de símbolos a no terminales', ['yacc y Bison generan este tipo de analizador.', 'Knuth lo presentó en 1965.', 'Admite gramáticas con recursión por la izquierda.']]
  ],
  q: [
    ['¿Qué máquina reconoce los lenguajes libres de contexto?', 'El autómata de pila', ['El autómata finito', 'La máquina de Turing únicamente', 'El autómata linealmente acotado'], 'Es el tipo 2 de la jerarquía de Chomsky.', 2],
    ['¿Por qué un analizador descendente recursivo no admite la regla A → A "+" B tal cual?', 'Porque la función de A se llamaría a sí misma sin consumir tokens, en un ciclo infinito', ['Porque el signo + es ambiguo', 'Porque B debe ir primero', 'Sí la admite sin cambios'], 'La recursión por la izquierda se reescribe como repetición: A → B ("+" B)*.', 4],
    ['¿Qué problema muestra el "else colgante"?', 'Una gramática ambigua', ['Un error léxico', 'Una recursión infinita', 'Un lenguaje no regular'], 'La misma cadena admite dos árboles de análisis.', 3],
    ['¿Qué parte del compilador verifica que una variable esté declarada antes de usarse?', 'El análisis semántico', ['El análisis léxico', 'La gramática libre de contexto', 'El enlazador'], 'Esa restricción depende del contexto y no se expresa con una gramática libre de contexto.', 3],
    { tf: 'La cadena "([)]" tiene los paréntesis balanceados.', v: false, e: 'Cada cierre debe corresponder al último abierto; aquí "]" llega cuando el último abierto es "(".', l: 2 },
    { tf: 'Toda gramática regular es también una gramática libre de contexto.', v: true, e: 'Los niveles de la jerarquía de Chomsky están contenidos unos en otros.', l: 2 },
    { o: 'Ordena los niveles de la jerarquía de Chomsky del menos al más poderoso.', s: ['Regular (autómata finito)', 'Libre de contexto (autómata de pila)', 'Sensible al contexto (autómata linealmente acotado)', 'Sin restricciones (máquina de Turing)'], e: 'Cada nivel reconoce todo lo del anterior y más.', l: 2 },
    { c: 'Escribe «balanceado(s)» para (), [] y {} (ignora los demás caracteres).', f: 'balanceado', p: ['s'], t: [[['{[()()]}'], true], [['([)]'], false], [['(('], false], [['a(b)c'], true], [[''], true]], sol: '  const pares = { ")": "(", "]": "[", "}": "{" }, pila = [];\n  for (const c of s) {\n    if ("([{".includes(c)) pila.push(c);\n    else if (c in pares && pila.pop() !== pares[c]) return false;\n  }\n  return pila.length === 0;', l: 3 },
    { c: 'Escribe «esAnBn(s)» que diga si s pertenece a {aⁿbⁿ : n ≥ 0} (por ejemplo "", "ab", "aabb").', f: 'esAnBn', p: ['s'], t: [[[''], true], [['aabb'], true], [['aab'], false], [['abab'], false], [['ba'], false]], sol: '  let i = 0, n = 0;\n  while (s[i] === "a") { n++; i++; }\n  let m = 0;\n  while (s[i] === "b") { m++; i++; }\n  return i === s.length && n === m;', h: 'Cuenta las "a" del inicio y luego las "b"; deben ser iguales y no debe sobrar nada.', l: 3 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var n = R.int(2, 6), s = ''; for (var i = 0; i < n; i++) s += R.pick(['(', ')', '[', ']']); var p = [], ok = true; for (var j = 0; j < s.length; j++) { var c = s[j]; if (c === '(' || c === '[') p.push(c); else { var t = p.pop(); if ((c === ')' && t !== '(') || (c === ']' && t !== '[')) ok = false; } } if (p.length) ok = false; g.mcq(2, '¿Está balanceada la cadena "' + s + '"?', ok ? 'Sí' : 'No', [ok ? 'No' : 'Sí', 'Solo si se ignoran los corchetes', 'No se puede decidir'], ok ? 'Cada cierre coincide con el último abierto y la pila queda vacía.' : 'Algún cierre no coincide o la pila no queda vacía.'); });
    var lenguajes = [['Números enteros con signo opcional', 'Regular'], ['Paréntesis balanceados', 'Libre de contexto (no regular)'], ['{aⁿbⁿ : n ≥ 0}', 'Libre de contexto (no regular)'], ['{aⁿbⁿcⁿ : n ≥ 0}', 'Sensible al contexto (no libre de contexto)'], ['Fechas con formato AAAA-MM-DD', 'Regular'], ['Expresiones aritméticas con paréntesis', 'Libre de contexto (no regular)'], ['Cadenas con cantidad par de unos', 'Regular'], ['Documentos JSON bien formados', 'Libre de contexto (no regular)']];
    var cls = ['Regular', 'Libre de contexto (no regular)', 'Sensible al contexto (no libre de contexto)', 'Ninguno: no es reconocible'];
    lenguajes.forEach(function (l) { g.mcq(3, '¿En qué nivel más bajo de la jerarquía de Chomsky está este lenguaje? ' + l[0], l[1], cls.filter(function (c) { return c !== l[1]; }), 'Piensa qué memoria necesitas para reconocerlo: ninguna extra, una pila o más.'); });
    g.times(5, function (R) { var n = R.int(0, 5), m = n + R.pick([0, 0, 1, -1]); if (m < 0) m = 0; var s = 'a'.repeat(n) + 'b'.repeat(m); g.mcq(2, 'Con la gramática S → a S b | ε, ¿se puede derivar "' + s + '"?', n === m ? 'Sí' : 'No', [n === m ? 'No' : 'Sí', 'Solo si la gramática es ambigua', 'Solo con ε al final'], 'La gramática genera exactamente las cadenas aⁿbⁿ.'); });
  },
  checks: [
    ['¿Por qué la sintaxis de los lenguajes de programación se describe con gramáticas libres de contexto?', 'Porque permiten estructuras anidadas (bloques, expresiones con paréntesis) que un lenguaje regular no puede describir, y existen analizadores eficientes para ellas.'],
    ['¿Cómo se expresa la precedencia de operadores en una gramática?', 'Con un nivel de no terminal por cada nivel de precedencia: los operadores de mayor precedencia se definen en las reglas más profundas.'],
    ['¿Qué ventaja tiene un analizador LR frente a uno LL escrito a mano?', 'Reconoce una clase más amplia de gramáticas, incluida la recursión por la izquierda, y se genera automáticamente con herramientas como yacc o Bison.'],
    ['¿Qué es una gramática ambigua y por qué es un problema?', 'Una que permite dos árboles de análisis para la misma cadena; el mismo texto podría interpretarse de dos formas distintas.'],
    ['¿Cuándo deberías escribir una gramática formal en un proyecto real?', 'Al diseñar cualquier formato o lenguaje propio (consultas, configuraciones, plantillas), para documentarlo, evitar ambigüedades y generar o guiar el analizador.']
  ],
  cites: ['Chomsky, N. (1956). Three Models for the Description of Language. *IRE Transactions on Information Theory*, 2(3).', 'Naur, P. (ed.) (1960). Report on the Algorithmic Language ALGOL 60. *Communications of the ACM*, 3(5).', 'Knuth, D. E. (1965). On the Translation of Languages from Left to Right. *Information and Control*, 8(6).', 'Sipser, M. (2012). *Introduction to the Theory of Computation* (3.ª ed.). Cengage. Capítulo 2.', 'Aho, A., Lam, M., Sethi, R. y Ullman, J. (2006). *Compilers: Principles, Techniques, and Tools* (2.ª ed.). Pearson. Capítulo 4.'],
  project: { t: 'Gramática y analizador de un formato propio',
    goal: 'Diseñar un formato de configuración con su gramática formal y construir su analizador.',
    steps: ['Diseña un formato simple de configuración del patio (secciones, claves, valores, listas anidadas) y escribe su gramática en BNF.', 'Comprueba que no sea ambigua derivando a mano cinco ejemplos.', 'Implementa un analizador descendente recursivo que construya un árbol y reporte errores con línea y columna.', 'Escribe un generador de documentos aleatorios válidos a partir de la gramática y úsalo para probar el analizador con 10 000 casos.', 'Opcional: genera el mismo analizador con una herramienta (como Peggy o ANTLR) y compara.'],
    deliver: 'La gramática documentada, el analizador, el generador de casos y los resultados de las pruebas.' },
  hito: ['Escribe en BNF la gramática del lenguaje de consultas de PatioApp y verifica que no sea ambigua (precedencia de "y" sobre "o" y paréntesis).', 'Genera automáticamente consultas aleatorias válidas desde la gramática y úsalas para probar el analizador.']
});

S('teo', 'teo.turing', { title: 'Máquinas de Turing y computabilidad',
  ask: '¿Qué concepto de computabilidad se aplica?',
  lesson: `
> **La idea en simple.** ¿Existe un programa que, mirando cualquier otro programa, diga si se va a colgar? Parece una herramienta útil y alcanzable. Alan Turing demostró en 1936 que es **imposible**, no por falta de ingenio, sino por razones lógicas. Saber qué es imposible ahorra años de intentar lo que no se puede hacer.

## La pregunta de Hilbert
En 1928, David Hilbert planteó el *Entscheidungsproblem*: ¿existe un procedimiento mecánico que decida si cualquier enunciado matemático es demostrable? Para responder, hacía falta definir con precisión qué es un "procedimiento mecánico". En 1936, de forma independiente, Alonzo Church (con el cálculo lambda) y Alan Turing (con sus máquinas) dieron esa definición y respondieron que **no**.

## La máquina de Turing
Turing, en *On Computable Numbers, with an Application to the Entscheidungsproblem* (1936), imaginó a una persona calculando con lápiz y papel y la redujo a lo esencial: una **cinta** infinita dividida en celdas, un **cabezal** que lee y escribe un símbolo y se mueve a izquierda o derecha, y un número finito de **estados** con reglas del tipo "si estoy en el estado q y leo el símbolo s, escribo t, me muevo y paso al estado r".
~~~js
// Máquina que suma 1 a un número binario
const reglas = { 'der,0': ['der', '0', 1], 'der,1': ['der', '1', 1], 'der,_': ['sum', '_', -1],
                 'sum,1': ['sum', '0', -1], 'sum,0': ['fin', '1', -1], 'sum,_': ['fin', '1', -1] };
function ejecutar(entrada) {
  let cinta = entrada.split(''), cab = 0, estado = 'der', pasos = 0;
  while (estado !== 'fin' && pasos++ < 1000) {
    if (cab < 0) { cinta.unshift('_'); cab = 0; }
    const [nuevo, escribe, mueve] = reglas[estado + ',' + (cinta[cab] || '_')];
    cinta[cab] = escribe; cab += mueve; estado = nuevo;
  }
  return cinta.join('').replace(/_/g, '');
}
console.log(ejecutar('1011'), ejecutar('111'));
~~~
Lo asombroso es que esta máquina tan simple calcula **todo** lo que calcula cualquier computadora real (con tiempo y cinta suficientes).

## La tesis de Church-Turing
Las máquinas de Turing, el cálculo lambda y otros modelos resultaron equivalentes. La **tesis de Church-Turing** afirma que todo lo que intuitivamente llamamos "calculable mediante un procedimiento" lo calcula una máquina de Turing. No es un teorema (la noción intuitiva no es formal), pero en casi 90 años ningún modelo físico realizable la ha refutado. Un sistema capaz de simular una máquina de Turing se llama **Turing completo**: JavaScript, Python, SQL con consultas recursivas, el Juego de la vida de John Conway e incluso las fórmulas de Excel con LAMBDA lo son.

## La máquina universal
Turing mostró también que existe una **máquina universal**: una que recibe en su cinta la descripción de cualquier otra máquina y su entrada, y la simula. Es la idea del **programa almacenado** que von Neumann llevó al hardware en 1945, y la de todo intérprete: el motor de JavaScript es una máquina universal que recibe tu programa como dato.

## El problema de la parada
Supongamos que existe «para(p, x)», que devuelve verdadero si el programa p termina con la entrada x. Construimos:
~~~txt
function paradoja(p) {
  if (para(p, p)) { while (true) {} }   // si p termina consigo mismo, me cuelgo
  else { return; }                       // si no termina, yo termino
}
~~~
¿Qué pasa con «paradoja(paradoja)»? Si «para» dice que termina, entonces se cuelga; si dice que no termina, termina. En ambos casos «para» se equivoca, así que **no puede existir**. Es el mismo argumento diagonal de Cantor que viste en conjuntos, y emparentado con el teorema de incompletitud de Kurt Gödel (1931).

## Reducciones y el teorema de Rice
Para probar que otro problema es indecidible se usa una **reducción**: si pudieras resolverlo, podrías resolver el problema de la parada. Henry Rice generalizó el resultado en 1953: **toda propiedad no trivial del comportamiento de un programa es indecidible**. "¿Este programa devuelve siempre un número positivo?", "¿accede alguna vez a la red?", "¿es equivalente a este otro programa?": ninguna tiene un decisor perfecto.

## Qué significa para un ingeniero
- Ningún analizador estático, antivirus ni verificador de tipos puede ser a la vez **perfecto** (sin falsos negativos), **preciso** (sin falsos positivos) y terminar siempre. Las herramientas reales eligen: o se aseguran de no dejar pasar errores a costa de falsas alarmas, o al revés.
- Si permites que usuarios escriban programas o consultas (fórmulas, reglas, plantillas), no puedes saber de antemano si terminarán: impón **límites** de tiempo, de pasos o de memoria.
- Las pruebas nunca demuestran la ausencia de errores en general (Dijkstra tenía razón también desde la teoría).

## El castor afanoso
Tibor Radó definió en 1962 el **castor afanoso**: la máxima cantidad de pasos que puede dar una máquina de n estados que termina. Crece más rápido que cualquier función calculable. En 2024 el proyecto colaborativo bbchallenge demostró, con verificación formal, que para 5 estados el valor es 47 176 870, un resultado que llevó más de 40 años. Sipser presenta estos temas en los capítulos 3 a 5 de su libro.

## Ejemplo resuelto: una reducción
Afirmación: no existe un programa «imprimeHola(p)» que decida siempre si p imprime "hola" alguna vez.
Demostración por reducción: supongamos que existe. Dado cualquier programa q y su entrada x, construimos un programa nuevo r que primero ejecuta q con x (sin imprimir nada) y, **si termina**, imprime "hola". Entonces r imprime "hola" exactamente cuando q termina con x. Si «imprimeHola» existiera, «imprimeHola(r)» respondería si q termina: resolveríamos el problema de la parada, que es imposible. Por lo tanto «imprimeHola» no existe.
Este patrón se repite: para mostrar que algo no se puede decidir, se muestra que con ello se podría decidir algo que ya sabemos imposible. La reducción va **del problema conocido al nuevo**; hacerla al revés no prueba nada.`,
  links: [['m1.cpu', 'la máquina universal de Turing anticipa el programa almacenado de von Neumann'], ['m2.sets', 'la indecidibilidad se demuestra con el argumento diagonal de Cantor'], ['m14.types', 'por esto las pruebas no pueden demostrar la ausencia de errores']],
  read: 'Sipser, capítulos 3 a 5; Turing (1936); Petzold, *The Annotated Turing* (2008).',
  terms: [
    ['Máquina de Turing', 'modelo de cálculo con una cinta infinita, un cabezal que lee y escribe y un conjunto finito de estados y reglas', ['Turing la imaginó a partir de una persona calculando con lápiz y papel.', 'Con unas pocas reglas suma 1 a un número binario.', 'Calcula todo lo que calcula cualquier computadora real.']],
    ['Tesis de Church-Turing', 'afirmación de que todo lo calculable mediante un procedimiento lo calcula una máquina de Turing', ['Explicas por qué Python y JavaScript pueden calcular exactamente lo mismo.', 'Ningún modelo físico realizable la ha refutado.', 'No es un teorema porque la noción intuitiva no es formal.']],
    ['Máquina universal', 'máquina de Turing capaz de simular cualquier otra a partir de su descripción', ['El motor de JavaScript recibe tu programa como dato y lo ejecuta.', 'Anticipa la idea de programa almacenado.', 'Un intérprete de un lenguaje es un ejemplo práctico.']],
    ['Problema de la parada', 'problema de decidir si un programa termina con una entrada dada, demostrado indecidible por Turing', ['Ninguna herramienta puede avisar siempre si tu código se colgará.', 'Se demuestra con un programa que contradice lo que se predice de él.', 'Es el punto de partida de muchas pruebas de indecidibilidad.']],
    ['Decidible', 'propiedad de un problema para el que existe un algoritmo que siempre termina y responde correctamente sí o no', ['Saber si un número es primo lo es.', 'Comprobar si una cadena pertenece a un lenguaje regular lo es.', 'El problema de la parada no lo es.']],
    ['Reducción', 'transformación que muestra que resolver un problema permitiría resolver otro', ['Pruebas que algo es indecidible mostrando que con ello resolverías el problema de la parada.', 'Conviertes un problema nuevo en uno ya conocido.', 'También se usa para comparar la dificultad de problemas NP.']],
    ['Teorema de Rice', 'resultado que establece que toda propiedad no trivial del comportamiento de un programa es indecidible', ['Ningún analizador decide siempre si un programa accede a la red.', 'Explicas por qué los linters dan falsas alarmas o se pierden errores.', 'Decidir si dos programas son equivalentes es imposible en general.']],
    ['Turing completo', 'propiedad de un sistema capaz de simular cualquier máquina de Turing', ['El Juego de la vida de Conway lo es.', 'SQL con consultas recursivas lo es.', 'Las fórmulas de Excel con LAMBDA lo son.']]
  ],
  q: [
    ['¿Qué demuestra el argumento de la función «paradoja»?', 'Que no puede existir un programa que decida siempre si otro termina', ['Que todos los programas terminan', 'Que JavaScript no es Turing completo', 'Que las pruebas automáticas son inútiles'], 'Cualquier respuesta de «para» lleva a una contradicción.', 3],
    ['Según el teorema de Rice, ¿cuál de estas propiedades es indecidible en general?', '"El programa nunca divide entre cero"', ['"El archivo tiene menos de 1000 líneas"', '"El programa contiene la palabra while"', '"El programa compila"'], 'Habla del comportamiento del programa, no de su texto.', 4],
    ['¿Qué consecuencia práctica tiene la indecidibilidad para un analizador estático?', 'Debe elegir entre falsas alarmas o errores no detectados', ['Puede encontrar todos los errores sin falsas alarmas', 'No sirve para nada', 'Solo funciona en lenguajes compilados'], 'No puede ser a la vez completo, preciso y terminar siempre.', 3],
    ['¿Qué idea de Turing anticipa al programa almacenado?', 'La máquina universal', ['El problema de la parada', 'El castor afanoso', 'La reducción'], 'Recibe la descripción de otra máquina como dato.', 2],
    { tf: 'Un lenguaje de programación con bucles y memoria ilimitada es Turing completo.', v: true, e: 'Con bucles condicionales y memoria no acotada se puede simular una máquina de Turing.', l: 2 },
    { tf: 'Si un problema es indecidible, ningún programa puede responderlo correctamente en ningún caso.', v: false, e: 'Muchos casos particulares se pueden resolver; lo imposible es un algoritmo que acierte y termine en todos.', l: 3 },
    { i: 'La máquina que suma 1 recibe la cinta "1011". ¿Qué deja escrito?', a: '1100', e: '1011 es 11; sumar 1 da 12, que es 1100.', l: 3 },
    { c: 'Escribe «simularMT(reglas, cinta, inicial, final)». Las reglas son un objeto con claves "estado,símbolo" y valores [nuevoEstado, símboloAEscribir, movimiento (1 o −1)]. El blanco es "_". Devuelve la cinta final sin blancos (detente tras 10 000 pasos).', f: 'simularMT', p: ['reglas', 'cinta', 'inicial', 'final'], t: [[[{ 'der,0': ['der', '0', 1], 'der,1': ['der', '1', 1], 'der,_': ['sum', '_', -1], 'sum,1': ['sum', '0', -1], 'sum,0': ['fin', '1', -1], 'sum,_': ['fin', '1', -1] }, '1011', 'der', 'fin'], '1100'], [[{ 'der,0': ['der', '0', 1], 'der,1': ['der', '1', 1], 'der,_': ['sum', '_', -1], 'sum,1': ['sum', '0', -1], 'sum,0': ['fin', '1', -1], 'sum,_': ['fin', '1', -1] }, '111', 'der', 'fin'], '1000'], [[{ 'q,a': ['q', 'b', 1], 'q,_': ['fin', '_', 1] }, 'aaa', 'q', 'fin'], 'bbb']], sol: '  const c = cinta.split("");\n  let cab = 0, e = inicial, pasos = 0;\n  while (e !== final && pasos++ < 10000) {\n    if (cab < 0) { c.unshift("_"); cab = 0; }\n    const r = reglas[e + "," + (c[cab] || "_")];\n    if (!r) break;\n    c[cab] = r[1]; cab += r[2]; e = r[0];\n  }\n  return c.join("").replace(/_/g, "");', h: 'Si el cabezal sale por la izquierda, agrega un blanco al inicio de la cinta.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(1, 60), b = n.toString(2); g.input(3, 'La máquina que suma 1 a un número binario recibe la cinta "' + b + '". ¿Qué deja escrito?', (n + 1).toString(2), b + ' es ' + n + '; sumando 1 queda ' + (n + 1) + ' = ' + (n + 1).toString(2) + '.'); });
    var probs = [['¿El número n es primo?', 'Decidible'], ['¿El programa p termina con la entrada x?', 'Indecidible'], ['¿La cadena pertenece a un lenguaje regular dado?', 'Decidible'], ['¿Dos programas cualesquiera calculan la misma función?', 'Indecidible'], ['¿El programa p imprime alguna vez "hola"?', 'Indecidible'], ['¿Un grafo dado tiene un ciclo?', 'Decidible'], ['¿Un programa cualquiera accede alguna vez a la red?', 'Indecidible'], ['¿Una fórmula de lógica proposicional es satisfacible?', 'Decidible']];
    probs.forEach(function (p) { g.mcq(3, '¿Este problema es decidible en general? ' + p[0], p[1], [p[1] === 'Decidible' ? 'Indecidible' : 'Decidible', 'Solo para programas cortos', 'Depende del lenguaje'], p[1] === 'Decidible' ? 'Existe un algoritmo que siempre termina con la respuesta correcta (aunque pueda ser lento).' : 'Por el problema de la parada o el teorema de Rice, no existe un decisor general.'); });
    g.times(4, function (R) { var s = R.pick(['aaa', 'abab', 'bba', 'aabb']), out = s.replace(/a/g, 'b'); g.input(2, 'Una máquina reemplaza cada "a" por "b" y deja las "b" iguales. ¿Qué deja en la cinta con la entrada "' + s + '"?', out, 'Recorre la cinta cambiando solo las "a".'); });
  },
  checks: [
    ['¿Qué problema planteó Hilbert y cómo lo respondieron Church y Turing?', 'Si existe un procedimiento mecánico para decidir si cualquier enunciado es demostrable; definieron con precisión qué es un procedimiento (cálculo lambda y máquinas de Turing) y demostraron que no existe.'],
    ['Explica el argumento del problema de la parada en tus palabras.', 'Si existiera un decisor de parada, se podría construir un programa que hace lo contrario de lo que el decisor predice sobre sí mismo; eso es una contradicción, así que el decisor no existe.'],
    ['¿Qué dice el teorema de Rice y qué implica para las herramientas de análisis?', 'Que toda propiedad no trivial del comportamiento de un programa es indecidible; las herramientas deben aproximar, aceptando falsas alarmas o errores no detectados.'],
    ['¿Qué harías si tu aplicación permite que los usuarios escriban reglas o fórmulas?', 'Imponer límites de tiempo, pasos y memoria al evaluarlas, porque no se puede saber de antemano si terminarán.'],
    ['¿Por qué decimos que la tesis de Church-Turing no es un teorema?', 'Porque relaciona una noción intuitiva (lo calculable) con una formal (las máquinas de Turing); no se puede demostrar, solo acumular evidencia.']
  ],
  cites: ['Turing, A. M. (1936). On Computable Numbers, with an Application to the Entscheidungsproblem. *Proceedings of the London Mathematical Society*, 2(42).', 'Church, A. (1936). An Unsolvable Problem of Elementary Number Theory. *American Journal of Mathematics*, 58(2).', 'Rice, H. G. (1953). Classes of Recursively Enumerable Sets and Their Decision Problems. *Transactions of the American Mathematical Society*, 74(2).', 'Sipser, M. (2012). *Introduction to the Theory of Computation* (3.ª ed.). Cengage. Capítulos 3 a 5.', 'Petzold, C. (2008). *The Annotated Turing*. Wiley.'],
  project: { t: 'Simulador de máquinas de Turing',
    goal: 'Construir un simulador visual y programar máquinas que hagan cálculos no triviales.',
    steps: ['Programa un simulador que muestre paso a paso la cinta, el cabezal y el estado.', 'Diseña máquinas para: sumar 1 en binario, duplicar una cadena de unos, reconocer aⁿbⁿ y sumar dos números en unario.', 'Agrega un límite de pasos y muestra qué pasa con una máquina que no termina.', 'Escribe en un documento la demostración del problema de la parada con un ejemplo en JavaScript.', 'Elige una herramienta que uses (un linter, un verificador de tipos) y describe un falso positivo o falso negativo que tenga, relacionándolo con el teorema de Rice.'],
    deliver: 'El simulador, las máquinas con sus pruebas y el documento.' },
  hito: ['Agrega al evaluador de consultas de PatioApp un límite de pasos y de tiempo para que ninguna consulta pueda colgar el sistema.', 'Documenta en el README qué no puede garantizar tu validador de consultas (teorema de Rice) y cómo lo compensas con límites y pruebas.']
});

S('teo', 'teo.np', { title: 'Complejidad: P, NP y NP-completitud',
  ask: '¿Qué concepto de complejidad computacional se aplica?',
  lesson: `
> **La idea en simple.** Resolver un sudoku gigante puede tomar siglos; comprobar que una solución propuesta es correcta toma segundos. ¿Son en el fondo igual de difíciles encontrar y comprobar? Es la pregunta P contra NP, el problema abierto más famoso de la computación, con un premio de un millón de dólares.

## Las clases P y NP
- **P:** problemas que se **resuelven** en tiempo polinomial (n, n², n³…). Ordenar, encontrar caminos más cortos, multiplicar matrices, saber si un número es primo (demostrado por Agrawal, Kayal y Saxena en 2002).
- **NP:** problemas cuya solución, si alguien te la da (un **certificado**), se **verifica** en tiempo polinomial. Todo problema de P está en NP. Ejemplos: ¿hay una ruta que visite todas las ciudades con un costo menor a K? ¿se puede colorear este mapa con tres colores? ¿hay un subconjunto de estos precios que sume exactamente S?
La pregunta abierta es si **P = NP**: si todo lo que se verifica rápido también se resuelve rápido. Casi todos los expertos creen que no, pero nadie lo ha demostrado. El Instituto Clay lo incluyó en el año 2000 entre sus siete Problemas del Milenio.

## NP-completitud
Stephen Cook (1971) y, de forma independiente, Leonid Levin (1973) demostraron que el problema **SAT** (¿existe una asignación que haga verdadera esta fórmula lógica?) es **NP-completo**: está en NP y **todo** problema de NP se reduce a él. En 1972 Richard Karp mostró 21 problemas NP-completos más, entre ellos la mochila, el coloreo de grafos, el ciclo hamiltoniano y la cobertura de conjuntos. Hoy se conocen miles. Lo notable: si **uno solo** de ellos tuviera un algoritmo polinomial, todos lo tendrían, y P sería igual a NP.
- **NP-completo:** está en NP y es tan difícil como cualquier problema de NP.
- **NP-difícil:** al menos tan difícil como los NP-completos, aunque no esté en NP (por ejemplo, la versión de optimización del viajante: encontrar **la** ruta más corta).

## Verificar es fácil, encontrar es difícil
~~~js
// Verificar un coloreo es polinomial; encontrarlo por fuerza bruta es exponencial
function coloreoValido(aristas, colores) { return aristas.every(([a, b]) => colores[a] !== colores[b]); }
function buscarColoreo(n, aristas, k) {
  const c = Array(n).fill(0);
  for (let intento = 0; intento < k ** n; intento++) {
    let x = intento; for (let i = 0; i < n; i++) { c[i] = x % k; x = Math.floor(x / k); }
    if (coloreoValido(aristas, c)) return c.slice();
  }
  return null;
}
const triangulo = [[0, 1], [1, 2], [2, 0]];
console.log(buscarColoreo(3, triangulo, 2), buscarColoreo(3, triangulo, 3));
~~~
Con 60 nodos y 3 colores, la fuerza bruta revisa hasta 3^60 ≈ 4·10²⁸ combinaciones: más que la edad del universo en nanosegundos.

## Cómo reconocerlos en tu trabajo
Michael Garey y David Johnson publicaron en 1979 *Computers and Intractability*, que sigue siendo el catálogo de referencia. Su ejemplo más recordado es una viñeta: un ingeniero, en lugar de decirle a su jefe "no encuentro un algoritmo eficiente, debo ser un incompetente", le dice "no encuentro un algoritmo eficiente, pero tampoco lo encuentran todas estas personas famosas". Reconocer que un problema es NP-difícil cambia el objetivo: ya no se busca la solución perfecta y rápida para todos los casos. Problemas típicos en sistemas reales: horarios y turnos con restricciones, rutas de reparto, empaquetar cajas en camiones, asignar tareas a servidores, armar el portafolio óptimo.

## Qué hacer con un problema NP-difícil
- **Casos pequeños:** la fuerza bruta inteligente (backtracking con poda, programación dinámica pseudopolinomial) basta.
- **Casos especiales:** con restricciones adicionales, a veces el problema se vuelve fácil (el coloreo con 2 colores es polinomial; la mochila con pesos pequeños se resuelve con programación dinámica).
- **Algoritmos de aproximación con garantía:** Nicos Christofides presentó en 1976 un algoritmo para el viajante métrico que nunca da una ruta peor que 1.5 veces la óptima.
- **Heurísticas y metaheurísticas:** voraces, búsqueda local, recocido simulado, algoritmos genéticos. Rápidas y buenas en la práctica, sin garantía.
- **Resolutores especializados:** los resolutores SAT y de programación lineal entera resuelven en minutos instancias industriales enormes, porque los casos reales rara vez son los peores.

## Más allá de NP
- **PSPACE:** problemas que se resuelven con memoria polinomial (decidir quién gana en ciertos juegos generalizados).
- **EXPTIME:** requieren tiempo exponencial con certeza (el ajedrez generalizado a tableros de n×n).
- **BQP:** lo que resuelve eficientemente una computadora cuántica; incluye factorizar (Shor, 1994), pero no se cree que incluya a los NP-completos.

## La dificultad como recurso
La criptografía depende de que ciertos problemas sean difíciles: si P = NP, la mayoría de los sistemas criptográficos actuales serían vulnerables. Curiosamente, factorizar no se sabe NP-completo; la seguridad de RSA descansa en que nadie ha encontrado un algoritmo eficiente en más de 40 años de intentos. Sipser trata estos temas en los capítulos 7 a 10 de su libro.

## Ejemplo resuelto: verificar con un certificado
Problema: ¿algún subconjunto de {3, 34, 4, 12, 5, 2} suma exactamente 9?
- **Encontrar** la respuesta por fuerza bruta exige revisar hasta 2⁶ = 64 subconjuntos; con 60 números serían más de un trillón.
- **Verificar** es inmediato si alguien te da el certificado {4, 5}: compruebas que ambos están en la lista y que suman 9. Ese costo crece de forma lineal con el tamaño del certificado.
Esa asimetría es la esencia de NP.
Cómo explicárselo a un cliente: "Encontrar el horario perfecto para 200 personas es un problema para el que nadie en el mundo conoce un método rápido que funcione siempre. Podemos darte en segundos un horario muy bueno, decirte cuánto se aleja de lo ideal en los casos que podemos comprobar y mejorarlo si nos das más tiempo de cálculo." Es una respuesta honesta y profesional, mucho mejor que prometer el óptimo o rendirse.`,
  links: [['m4.dp', 'la mochila 0/1 es NP-difícil aunque la programación dinámica la resuelva en casos con pesos pequeños'], ['m2.prop', 'SAT es el problema de satisfacibilidad de la lógica'], ['m16.crypto', 'la criptografía se apoya en problemas que se creen difíciles']],
  read: 'Sipser, capítulos 7 a 10; Garey y Johnson, capítulos 1 a 3; Kleinberg y Tardos, capítulo 8.',
  terms: [
    ['Clase P', 'conjunto de problemas de decisión que se resuelven en tiempo polinomial', ['Ordenar una lista está en ella.', 'Saber si un número es primo está en ella desde 2002.', 'Encontrar el camino más corto en un grafo con pesos positivos está en ella.']],
    ['Clase NP', 'conjunto de problemas cuya solución propuesta se verifica en tiempo polinomial', ['Compruebas en segundos un sudoku resuelto.', 'Revisas que un coloreo no tenga vecinos del mismo color.', 'Todos los problemas de P también están aquí.']],
    ['NP-completo', 'problema que está en NP y al que se reduce cualquier otro problema de NP', ['SAT fue el primero, demostrado por Cook en 1971.', 'Si uno solo tuviera un algoritmo polinomial, P sería igual a NP.', 'El coloreo con 3 colores es uno de ellos.']],
    ['NP-difícil', 'problema al menos tan difícil como los NP-completos, aunque no esté necesariamente en NP', ['Encontrar la ruta de reparto más corta posible lo es.', 'Armar el horario óptimo de turnos lo es.', 'Se resuelve en la práctica con heurísticas o aproximaciones.']],
    ['Reducción polinomial', 'transformación eficiente de las instancias de un problema en instancias de otro', ['Karp mostró 21 problemas NP-completos con esta técnica.', 'Demuestras que tu problema es difícil transformando en él uno conocido.', 'Si resuelves el problema destino, resuelves el origen.']],
    ['Problema SAT', 'problema de decidir si existe una asignación de valores que haga verdadera una fórmula lógica', ['Los resolutores modernos manejan millones de variables en la práctica.', 'Se usa para verificar circuitos y planificar.', 'Fue el primer problema demostrado NP-completo.']],
    ['Algoritmo de aproximación', 'algoritmo eficiente que garantiza una solución a una distancia acotada de la óptima', ['El de Christofides nunca da una ruta peor que 1.5 veces la óptima.', 'Aceptas una solución algo peor a cambio de tiempo polinomial.', 'Su calidad se demuestra matemáticamente.']],
    ['Heurística', 'regla práctica que suele dar buenas soluciones rápido pero sin garantía de calidad', ['Asignas turnos al revisor menos cargado primero.', 'La búsqueda local mejora una solución con cambios pequeños.', 'Funciona bien en los casos reales aunque falle en algunos extremos.']]
  ],
  q: [
    ['¿Qué significa que un problema esté en NP?', 'Que una solución propuesta se puede verificar en tiempo polinomial', ['Que no se puede resolver', 'Que tarda tiempo no polinomial', 'Que es NP-completo'], 'NP significa "polinomial no determinista": verificable rápido.', 2],
    ['Si mañana alguien encuentra un algoritmo polinomial para el coloreo con 3 colores, ¿qué se concluye?', 'Que P = NP', ['Nada, es un caso particular', 'Que la criptografía se vuelve más segura', 'Que SAT es indecidible'], 'Es NP-completo: todo NP se reduce a él.', 4],
    ['Tu tarea es asignar 200 revisores a turnos con 30 restricciones de forma óptima. ¿Qué estrategia es razonable?', 'Reconocer que es NP-difícil y usar una heurística o un resolutor, midiendo la calidad', ['Probar todas las combinaciones', 'Decir que es imposible', 'Esperar a que se resuelva P contra NP'], 'Para casos grandes se aceptan soluciones buenas en lugar de óptimas garantizadas.', 3],
    ['¿Qué diferencia hay entre NP-completo y NP-difícil?', 'El NP-completo además debe estar en NP', ['Son exactamente lo mismo', 'El NP-difícil es más fácil', 'El NP-completo no tiene solución'], 'Un NP-difícil puede no ser verificable en tiempo polinomial.', 3],
    { tf: 'Todo problema de P también está en NP.', v: true, e: 'Si lo resuelves en tiempo polinomial, también puedes verificar una respuesta en tiempo polinomial.', l: 2 },
    { tf: 'Está demostrado que P es distinto de NP.', v: false, e: 'Es un problema abierto; la mayoría cree que son distintas, pero nadie lo ha demostrado.', l: 2 },
    { i: '¿Cuántas combinaciones revisa la fuerza bruta para colorear 10 nodos con 3 colores?', a: 59049, e: '3^10 = 59 049.', l: 3 },
    { c: 'Escribe «coloreoValido(aristas, colores)»: aristas es una lista de pares de nodos y colores una lista con el color de cada nodo.', f: 'coloreoValido', p: ['aristas', 'colores'], t: [[[[[0, 1], [1, 2], [2, 0]], [0, 1, 2]], true], [[[[0, 1], [1, 2]], [0, 1, 0]], true], [[[[0, 1], [1, 2], [2, 0]], [0, 1, 0]], false]], sol: '  return aristas.every(([a, b]) => colores[a] !== colores[b]);', h: 'Es el verificador polinomial: revisa cada arista.', l: 2 },
    { c: 'Escribe «sumaSubconjunto(l, t)» que diga si algún subconjunto de l suma exactamente t (por fuerza bruta o con programación dinámica).', f: 'sumaSubconjunto', p: ['l', 't'], t: [[[[3, 34, 4, 12, 5, 2], 9], true], [[[3, 34, 4, 12, 5, 2], 30], false], [[[], 0], true], [[[7], 3], false]], sol: '  const posibles = new Set([0]);\n  for (const x of l) for (const s of [...posibles]) posibles.add(s + x);\n  return posibles.has(t);', h: 'Mantén el conjunto de sumas alcanzables y agrega cada elemento.', l: 4 }
  ],
  gen: function (g) {
    var probs = [['Ordenar una lista de números', 'Está en P'], ['Decidir si una fórmula lógica es satisfacible', 'NP-completo'], ['Encontrar el camino más corto con pesos positivos', 'Está en P'], ['Decidir si un grafo se colorea con 3 colores', 'NP-completo'], ['Decidir si hay un subconjunto que suma exactamente S', 'NP-completo'], ['Saber si un número es primo', 'Está en P'], ['Encontrar la ruta más corta que visite todas las ciudades', 'NP-difícil (no se sabe si está en NP)'], ['Decidir si un grafo se colorea con 2 colores', 'Está en P'], ['Decidir si un programa termina', 'Indecidible']];
    var cls = ['Está en P', 'NP-completo', 'NP-difícil (no se sabe si está en NP)', 'Indecidible'];
    probs.forEach(function (p) { g.mcq(3, 'Clasifica el problema: ' + p[0], p[1], cls.filter(function (c) { return c !== p[1]; }), 'Recuerda: P se resuelve en tiempo polinomial; NP-completo se verifica rápido y todo NP se reduce a él; la versión de optimización es NP-difícil.'); });
    g.times(6, function (R) { var n = R.int(5, 20), k = R.pick([2, 3]); g.input(2, '¿Cuántas asignaciones revisa la fuerza bruta para colorear ' + n + ' nodos con ' + k + ' colores?', Math.pow(k, n), k + '^' + n + ' = ' + Math.pow(k, n) + '.'); });
    g.times(5, function (R) { var n = R.int(5, 12), f = 1; for (var i = 2; i <= n; i++) f *= i; g.input(3, '¿Cuántos órdenes posibles hay para visitar ' + n + ' ciudades?', f, n + '! = ' + f + '.'); });
    g.times(6, function (R) { var l = [R.int(1, 9), R.int(1, 9), R.int(1, 9), R.int(1, 9)], t = R.int(5, 25), ok = false; for (var m = 0; m < 16; m++) { var s = 0; for (var i = 0; i < 4; i++) if (m & (1 << i)) s += l[i]; if (s === t) ok = true; } g.mcq(3, '¿Algún subconjunto de {' + l.join(', ') + '} suma exactamente ' + t + '?', ok ? 'Sí' : 'No', [ok ? 'No' : 'Sí', 'Es indecidible', 'Solo si se repiten elementos'], 'Revisando las 16 combinaciones (2⁴) se comprueba.'); });
  },
  checks: [
    ['Explica la diferencia entre P y NP con un ejemplo.', 'P son los problemas que se resuelven rápido, como ordenar; NP son los que se verifican rápido, como comprobar un sudoku resuelto, aunque encontrar la solución pueda ser muy costoso.'],
    ['¿Por qué basta un algoritmo polinomial para un solo problema NP-completo para concluir que P = NP?', 'Porque todo problema de NP se reduce en tiempo polinomial a cualquier NP-completo; resolviendo ese, se resolverían todos.'],
    ['¿Qué haces en un proyecto cuando descubres que tu problema es NP-difícil?', 'Cambiar el objetivo: resolver exacto solo casos pequeños, buscar casos especiales fáciles, usar aproximaciones con garantía, heurísticas o resolutores, y medir la calidad de las soluciones.'],
    ['¿Por qué importa P contra NP para la criptografía?', 'Porque la seguridad se basa en problemas difíciles de resolver pero fáciles de verificar; si P = NP, muchos de ellos tendrían algoritmos eficientes y los sistemas serían vulnerables.'],
    ['¿Qué ofrece un algoritmo de aproximación que no ofrece una heurística?', 'Una garantía demostrada de qué tan lejos puede estar del óptimo (por ejemplo, nunca peor que 1.5 veces).']
  ],
  cites: ['Cook, S. (1971). The Complexity of Theorem-Proving Procedures. *Proceedings of the 3rd ACM STOC*.', 'Karp, R. (1972). Reducibility Among Combinatorial Problems. En *Complexity of Computer Computations*. Plenum.', 'Garey, M. y Johnson, D. (1979). *Computers and Intractability: A Guide to the Theory of NP-Completeness*. W. H. Freeman.', 'Sipser, M. (2012). *Introduction to the Theory of Computation* (3.ª ed.). Cengage. Capítulos 7 a 10.', 'Agrawal, M., Kayal, N. y Saxena, N. (2004). PRIMES is in P. *Annals of Mathematics*, 160(2).', 'Christofides, N. (1976). *Worst-Case Analysis of a New Heuristic for the Travelling Salesman Problem*. Informe 388, Carnegie Mellon University.'],
  project: { t: 'Atacar un problema NP-difícil real',
    goal: 'Resolver un problema de asignación de turnos con varias técnicas y comparar calidad y tiempo.',
    steps: ['Define el problema: asignar revisores a turnos respetando disponibilidad, horas máximas y pares que no pueden coincidir, minimizando el desbalance de carga.', 'Implementa una solución exacta por backtracking con poda y mide hasta qué tamaño termina en menos de un minuto.', 'Implementa una heurística voraz y una búsqueda local que la mejore.', 'Compara la calidad de la heurística con el óptimo en 100 instancias pequeñas aleatorias.', 'Opcional: modela el problema para un resolutor (por ejemplo, un resolutor SAT o de programación entera en JavaScript) y compara.'],
    deliver: 'El código, las tablas de tiempo y calidad y una recomendación justificada para el caso real.' },
  hito: ['Implementa en PatioApp la asignación de turnos de revisores con restricciones mediante una heurística voraz, y compárala con la solución exacta por fuerza bruta en casos pequeños.', 'Documenta por qué el problema es NP-difícil y por qué para casos grandes aceptas una solución buena en lugar de la óptima.']
});
})();
