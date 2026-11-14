(function () {
var S = SDC.S;

S('teo', 'teo.cfl', { title: 'Lenguajes libres de contexto a fondo',
  ask: '¿Qué propiedad o algoritmo de los lenguajes libres de contexto se aplica?',
  lesson: `
> **La idea en simple.** Los autómatas finitos no pueden contar: no saben si un texto tiene tantos paréntesis que abren como que cierran. Las gramáticas libres de contexto sí pueden, y por eso describen la estructura de casi todos los lenguajes de programación. Pero también tienen límites: no pueden verificar que una variable se declaró antes de usarse ni contar tres cosas a la vez. Conocer esos límites explica cómo están construidos los compiladores.

## Repaso: gramáticas y autómatas de pila
Una **gramática libre de contexto** (GLC) tiene reglas de la forma A → α, donde A es un no terminal y α una cadena de terminales y no terminales: el lado izquierdo es siempre **un solo** no terminal, sin importar qué lo rodea (de ahí "libre de contexto"). Los lenguajes que generan son exactamente los que reconoce un **autómata de pila** no determinista: un autómata finito con una pila ilimitada. La pila es lo que permite "recordar" cuántos paréntesis se abrieron.

## Formas normales
Para razonar y para construir algoritmos conviene llevar las gramáticas a formas estándar:
- **Forma normal de Chomsky** (FNC, Noam Chomsky, 1959): toda regla es A → BC (dos no terminales) o A → a (un terminal), y opcionalmente S → ε. Toda GLC se puede convertir a FNC: se eliminan las reglas vacías, las unitarias (A → B) y se parten las reglas largas. En FNC, toda derivación de una cadena de longitud n tiene exactamente 2n − 1 pasos, y los árboles son binarios.
- **Forma normal de Greibach** (Sheila Greibach, 1965): toda regla empieza con un terminal (A → aα). Garantiza que cada paso de derivación consume un símbolo de entrada.

## El algoritmo CYK
¿Cómo saber si una cadena pertenece al lenguaje de una gramática cualquiera? El algoritmo **CYK** (Cocke, Younger y Kasami, de forma independiente en los años sesenta) responde en tiempo **O(n³)** para una gramática en FNC, con **programación dinámica**: llena una tabla donde la celda (i, j) contiene los no terminales que generan la subcadena desde la posición i hasta la j. Las subcadenas de longitud 1 se llenan con las reglas A → a; para las más largas, se prueban todas las formas de partirlas en dos y se buscan reglas A → BC con B generando la primera parte y C la segunda. La cadena pertenece al lenguaje si el símbolo inicial está en la celda que cubre toda la cadena.
~~~js
// CYK para una gramática en FNC que genera aⁿbⁿ (n ≥ 1): S → AT | AB, T → SB, A → a, B → b
const reglas = { binarias: [['S', 'A', 'T'], ['S', 'A', 'B'], ['T', 'S', 'B']], terminales: [['A', 'a'], ['B', 'b']] };
function cyk(w) {
  const n = w.length, t = Array.from({ length: n }, () => Array.from({ length: n }, () => new Set()));
  for (let i = 0; i < n; i++) for (const [X, a] of reglas.terminales) if (w[i] === a) t[i][i].add(X);
  for (let largo = 2; largo <= n; largo++)
    for (let i = 0; i + largo - 1 < n; i++) {
      const j = i + largo - 1;
      for (let k = i; k < j; k++) for (const [X, Y, Z] of reglas.binarias) if (t[i][k].has(Y) && t[k + 1][j].has(Z)) t[i][j].add(X);
    }
  return n > 0 && t[0][n - 1].has('S');
}
console.log(['ab', 'aabb', 'aaabbb', 'aab', 'abab'].map(w => w + ': ' + cyk(w)).join(' · '));
~~~
Para gramáticas generales se usa el algoritmo de **Earley** (Jay Earley, 1970), también O(n³) en el peor caso pero lineal en muchas gramáticas prácticas. Los compiladores, en cambio, usan subclases de gramáticas (**LL** y **LR**) que se analizan en **tiempo lineal**, como viste en Lenguajes y Compiladores: Donald Knuth inventó el análisis LR en 1965 y Frank DeRemer las variantes SLR y LALR (1969), la que usan yacc y Bison.

## El lema de bombeo para lenguajes libres de contexto
Así como hay un lema de bombeo para los lenguajes regulares, hay uno para los libres de contexto (Yehoshua Bar-Hillel, Micha Perles y Eli Shamir, 1961): si L es libre de contexto, existe un número p tal que toda cadena s de L con |s| ≥ p se puede escribir como s = uvwxy, con |vwx| ≤ p y |vx| ≥ 1, de modo que **u vⁱ w xⁱ y** está en L para todo i ≥ 0. La intuición: en un árbol de derivación suficientemente alto, algún no terminal se repite en un camino, y el trozo entre las dos apariciones se puede repetir (o quitar) cualquier número de veces.

**Ejemplo:** L = {aⁿbⁿcⁿ : n ≥ 0} no es libre de contexto. Tomemos s = aᵖbᵖcᵖ. Como |vwx| ≤ p, la parte vwx no puede contener a la vez letras a y letras c (están separadas por p letras b). Al bombear (i = 2), aumentan a lo sumo dos de los tres tipos de letra, y la cadena deja de tener las tres cantidades iguales: no está en L. Contradicción. Una GLC puede "contar" dos cosas emparejadas con la pila, pero no tres.

## Propiedades de cierre
Los lenguajes libres de contexto son cerrados bajo **unión**, **concatenación**, **estrella de Kleene** e **intersección con un lenguaje regular**, pero **no** bajo **intersección** ni **complemento**. Contraejemplo para la intersección: {aⁿbⁿcᵐ} y {aᵐbⁿcⁿ} son libres de contexto, pero su intersección es {aⁿbⁿcⁿ}, que no lo es. Como la intersección se puede escribir con unión y complemento (De Morgan), tampoco puede haber cierre bajo complemento.

## Lo que una GLC no puede expresar en un lenguaje de programación
Muchas reglas de los lenguajes de programación **no son libres de contexto**:
- "Toda variable se declara antes de usarse": se parece a {w c w}, que no es libre de contexto (hay que comparar dos copias de un texto arbitrario).
- "Una función se llama con tantos argumentos como parámetros tiene".
- La verificación de tipos.
Por eso los compiladores separan el trabajo: la **sintaxis** (lo que sí es libre de contexto) la verifica el analizador sintáctico con una GLC, y lo demás lo verifica el **análisis semántico**, recorriendo el árbol con tablas de símbolos. También hay detalles prácticos que se resuelven fuera de la gramática pura: en C, «a * b;» es una multiplicación o la declaración de un puntero según si «a» es un tipo, lo que obliga al analizador a consultar la tabla de símbolos (el llamado *lexer hack*).

## Problemas indecidibles sobre gramáticas
Algunas preguntas sobre GLC se pueden responder con un algoritmo y otras no:
- **Decidibles:** si una cadena pertenece al lenguaje (CYK), si el lenguaje es vacío, si es finito.
- **Indecidibles:** si una gramática es **ambigua**, si dos gramáticas generan el **mismo** lenguaje, si una gramática genera **todas** las cadenas posibles, si la intersección de dos lenguajes libres de contexto es vacía. Se demuestran reduciendo el problema de correspondencia de Post, que verás en la siguiente unidad.
Consecuencia práctica: ninguna herramienta puede garantizar en general que una gramática no es ambigua; los generadores LR detectan los **conflictos** de su subclase, que son una aproximación útil.

## Ejemplo resuelto: ¿qué verifica cada etapa del lenguaje de reglas de PatioApp?
En el lenguaje de reglas de tarifa de PatioApp:
1. **Léxico (regular):** que «camion», «>», «7» y «45» sean tokens válidos. Un autómata finito.
2. **Sintaxis (libre de contexto):** que los paréntesis estén balanceados, que «si … entonces …» tenga la forma correcta, que la precedencia de «y» y «o» se respete. Un analizador descendente recursivo sobre la gramática.
3. **Semántica (no libre de contexto):** que el campo «tipo» exista, que se compare con un valor del tipo correcto («tipo = 7» es un error), que una regla llamada por otra esté definida y que no haya ciclos de llamadas. Un recorrido del árbol con la tabla de campos y la de reglas.
Separar así el trabajo hace que cada etapa sea simple y que los mensajes de error sean precisos: "error de sintaxis en la línea 3" frente a "el campo pesoo no existe; ¿quisiste decir peso?".`,
  links: [['teo.gram', 'las gramáticas y el autómata de pila se presentaron en la unidad anterior'], ['lc.parse', 'los analizadores LL y LR se estudian en Lenguajes y Compiladores'], ['m4.dp', 'el algoritmo CYK es programación dinámica']],
  read: 'Sipser, *Introducción a la teoría de la computación* (3.ª ed.), capítulo 2; Hopcroft, Motwani y Ullman, *Teoría de autómatas, lenguajes y computación* (3.ª ed.), capítulos 5 a 7.',
  terms: [
    ['Gramática libre de contexto', 'gramática cuyas reglas reemplazan un solo no terminal sin importar su contexto', ['A → α.', 'Equivale a los autómatas de pila.', 'Describe la sintaxis de los lenguajes.']],
    ['Forma normal de Chomsky', 'forma de gramática con reglas A → BC o A → a', ['Árboles binarios.', 'Base de CYK.', 'Chomsky, 1959.']],
    ['Algoritmo CYK', 'algoritmo de programación dinámica que decide la pertenencia a un lenguaje libre de contexto en O(n³)', ['Cocke, Younger y Kasami.', 'Tabla por subcadenas.', 'Requiere FNC.']],
    ['Lema de bombeo libre de contexto', 'propiedad que permite repetir dos partes de toda cadena larga de un lenguaje libre de contexto', ['s = uvwxy.', 'Prueba que aⁿbⁿcⁿ no es LLC.', 'Bar-Hillel, Perles y Shamir.']],
    ['Cierre bajo intersección', 'propiedad de que la intersección de dos lenguajes de una clase está en la clase', ['Los regulares la tienen.', 'Los libres de contexto no.', 'Sí con un regular.']],
    ['Análisis semántico', 'etapa del compilador que verifica reglas que la gramática no puede expresar', ['Declarar antes de usar.', 'Tipos.', 'Usa tablas de símbolos.']],
    ['Algoritmo de Earley', 'algoritmo de análisis para cualquier gramática libre de contexto, cúbico en el peor caso', ['Earley, 1970.', 'Lineal en muchas gramáticas.', 'No requiere forma normal.']],
    ['Ambigüedad inherente', 'propiedad de un lenguaje para el que toda gramática que lo genera es ambigua', ['Existe en algunos LLC.', 'Decidir si una gramática es ambigua es indecidible.', 'Los generadores detectan conflictos.']]
  ],
  q: [
    ['¿Por qué {aⁿbⁿcⁿ} no es libre de contexto?', 'Porque al bombear una cadena larga no se pueden mantener iguales las tres cantidades', ['Porque es regular', 'Porque es finito', 'Sí es libre de contexto'], 'Lema de bombeo para LLC.', 3],
    ['¿Qué complejidad tiene el algoritmo CYK?', 'O(n³)', ['O(n)', 'O(2ⁿ)', 'O(log n)'], 'Programación dinámica sobre subcadenas.', 2],
    ['¿Bajo qué operación NO son cerrados los lenguajes libres de contexto?', 'La intersección', ['La unión', 'La concatenación', 'La estrella de Kleene'], '{aⁿbⁿcᵐ} ∩ {aᵐbⁿcⁿ} = {aⁿbⁿcⁿ}.', 3],
    ['¿Qué forma tienen las reglas en la forma normal de Chomsky?', 'A → BC o A → a', ['A → aα', 'A → α con cualquier α', 'A → ε siempre'], 'Árboles binarios.', 2],
    ['"Toda variable se declara antes de usarse", ¿quién lo verifica en un compilador?', 'El análisis semántico', ['El analizador léxico', 'La gramática libre de contexto', 'El enlazador'], 'No es una propiedad libre de contexto.', 3],
    ['¿Es decidible saber si una gramática libre de contexto es ambigua?', 'No, es indecidible en general', ['Sí, con CYK', 'Sí, en tiempo lineal', 'Solo para gramáticas regulares es indecidible'], 'Se reduce el problema de correspondencia de Post.', 4],
    ['¿Qué tipo de analizadores usan los compiladores para tener tiempo lineal?', 'LL y LR, para subclases de gramáticas', ['CYK siempre', 'Búsqueda exhaustiva', 'Autómatas finitos'], 'Knuth inventó el LR en 1965.', 3],
    { tf: 'La intersección de un lenguaje libre de contexto con uno regular es libre de contexto.', v: true, e: 'Se construye un autómata de pila producto.', l: 3 },
    { tf: 'Decidir si una cadena pertenece al lenguaje de una gramática libre de contexto es indecidible.', v: false, e: 'Es decidible, por ejemplo con CYK en O(n³).', l: 2 },
    { c: 'Escribe «balanceado(s)»: true si los paréntesis, corchetes y llaves están balanceados y bien anidados (usa una pila).', f: 'balanceado', p: ['s'], t: [[['(a[b]{c})'], true], [['(]'], false], [['(('], false], [[''], true]], sol: '  const p = [], par = { ")": "(", "]": "[", "}": "{" };\n  for (const c of s) { if ("([{".includes(c)) p.push(c); else if (c in par) { if (p.pop() !== par[c]) return false; } }\n  return p.length === 0;', l: 2 },
    { c: 'Escribe «anbn(w)»: true si w es de la forma aⁿbⁿ con n ≥ 0, usando un contador (como lo haría la pila).', f: 'anbn', p: ['w'], t: [[['aabb'], true], [['aab'], false], [['abab'], false], [[''], true]], sol: '  let i = 0, n = 0;\n  while (w[i] === "a") { n++; i++; }\n  while (w[i] === "b") { n--; i++; }\n  return i === w.length && n === 0;', l: 2 },
    { c: 'Escribe «anbncn(w)»: true si w es de la forma aⁿbⁿcⁿ con n ≥ 0 (un programa sí puede, aunque una GLC no).', f: 'anbncn', p: ['w'], t: [[['aabbcc'], true], [['aabbc'], false], [['abcabc'], false], [[''], true]], sol: '  const m = w.match(/^(a*)(b*)(c*)$/);\n  return !!m && m[1].length === m[2].length && m[2].length === m[3].length;', l: 3 }
  ],
  gen: function (g) {
    var cl = [['{aⁿbⁿ : n ≥ 0}', 'Libre de contexto, no regular'], ['{aⁿbⁿcⁿ : n ≥ 0}', 'No libre de contexto'], ['Cadenas de a y b con número par de a', 'Regular'], ['Paréntesis balanceados', 'Libre de contexto, no regular'], ['Placas con formato AAA-999', 'Regular'], ['{w c w : w en {a, b}*}', 'No libre de contexto'], ['Palíndromos sobre {a, b}', 'Libre de contexto, no regular']];
    cl.forEach(function (c) { g.mcq(3, '¿Qué tipo de lenguaje es ' + c[0] + '?', c[1], ['Regular', 'Libre de contexto, no regular', 'No libre de contexto', 'Finito'].filter(function (x) { return x !== c[1]; }), 'Jerarquía de Chomsky.'); });
    var de = [['¿La cadena pertenece al lenguaje de la gramática?', 'Decidible'], ['¿El lenguaje de la gramática es vacío?', 'Decidible'], ['¿La gramática es ambigua?', 'Indecidible'], ['¿Dos gramáticas generan el mismo lenguaje?', 'Indecidible'], ['¿La gramática genera todas las cadenas posibles?', 'Indecidible'], ['¿El lenguaje es finito?', 'Decidible']];
    de.forEach(function (d) { g.mcq(4, 'Para gramáticas libres de contexto, ¿esta pregunta es decidible? ' + d[0], d[1], ['Decidible', 'Indecidible', 'Depende del lenguaje de programación'].filter(function (x) { return x !== d[1]; }).concat(['Solo en tiempo lineal']), 'Problemas sobre GLC.'); });
    var et = [['Que "camion" sea un token válido', 'Análisis léxico'], ['Que los paréntesis estén balanceados', 'Análisis sintáctico'], ['Que el campo "pesoo" exista', 'Análisis semántico'], ['Que no se compare un tipo de texto con un número', 'Análisis semántico'], ['Que "si" vaya seguido de una condición', 'Análisis sintáctico']];
    et.forEach(function (e) { g.mcq(2, '¿Qué etapa lo verifica? ' + e[0], e[1], ['Análisis léxico', 'Análisis sintáctico', 'Análisis semántico', 'Ejecución'].filter(function (x) { return x !== e[1]; }), 'Cada etapa verifica lo que su formalismo puede.'); });
  },
  checks: [
    ['¿Qué pueden hacer las gramáticas libres de contexto que no pueden los autómatas finitos, y qué no pueden?', 'Pueden emparejar estructuras anidadas como paréntesis; no pueden contar tres cosas a la vez ni comparar dos copias de un texto.'],
    ['Explica cómo funciona el algoritmo CYK.', 'Llena una tabla con los no terminales que generan cada subcadena, combinando las de subcadenas más cortas con reglas A → BC; acepta si el símbolo inicial genera toda la cadena.'],
    ['Usa el lema de bombeo para argumentar que {aⁿbⁿcⁿ} no es libre de contexto.', 'La parte bombeada vwx tiene longitud ≤ p y no puede contener a y c a la vez; al bombear cambian como mucho dos cantidades y se rompe la igualdad.'],
    ['¿Por qué los compiladores necesitan un análisis semántico además de la gramática?', 'Porque reglas como declarar antes de usar o los tipos no son libres de contexto.']
  ],
  cites: ['Chomsky, N. (1959). On Certain Formal Properties of Grammars. *Information and Control*, 2(2).', 'Bar-Hillel, Y., Perles, M. y Shamir, E. (1961). On formal properties of simple phrase structure grammars. *Zeitschrift für Phonetik, Sprachwissenschaft und Kommunikationsforschung*, 14.', 'Younger, D. (1967). Recognition and Parsing of Context-Free Languages in Time n³. *Information and Control*, 10(2).', 'Earley, J. (1970). An Efficient Context-Free Parsing Algorithm. *Communications of the ACM*, 13(2).', 'Knuth, D. E. (1965). On the Translation of Languages from Left to Right. *Information and Control*, 8(6).', 'Sipser, M. (2012). *Introduction to the Theory of Computation* (3.ª ed.). Cengage.'],
  project: { t: 'Analizador con CYK y verificación semántica',
    goal: 'Implementar el análisis de un lenguaje pequeño separando sintaxis y semántica.',
    steps: ['Escribe la gramática de un lenguaje de expresiones o de reglas y conviértela a forma normal de Chomsky.', 'Implementa CYK y verifica cadenas válidas e inválidas.', 'Implementa un analizador descendente recursivo para la misma gramática y compara el tiempo con CYK en entradas largas.', 'Agrega un análisis semántico con tabla de símbolos que detecte variables no declaradas y tipos incompatibles.', 'Argumenta con el lema de bombeo por qué la regla de declarar antes de usar no cabe en la gramática.'],
    deliver: 'La gramática, ambos analizadores, el análisis semántico y la argumentación.' },
  hito: ['Separa en PatioApp el procesamiento de las reglas de tarifa en análisis léxico, sintáctico y semántico, con mensajes de error precisos para cada etapa.', 'Agrega a PatioApp la verificación semántica de campos existentes, tipos compatibles y ausencia de ciclos entre reglas.']
});
SDC.after('teo.cfl', 'teo.gram');

S('teo', 'teo.undec', { title: 'Indecidibilidad, reducciones e incompletitud',
  ask: '¿Qué concepto de computabilidad o indecidibilidad se aplica?',
  lesson: `
> **La idea en simple.** Hay preguntas sobre los programas que ninguna computadora puede responder en general, no por falta de velocidad ni de memoria, sino por razones lógicas. Turing lo demostró con el problema de la parada. Esta unidad muestra que ese no es un caso aislado: hay una gran familia de problemas imposibles, conectados entre sí por reducciones, y el mismo fenómeno aparece en la matemática misma, con los teoremas de Gödel.

## Decidible, reconocible y no reconocible
- Un lenguaje es **decidible** (o recursivo) si existe una máquina de Turing que **siempre se detiene** y responde correctamente sí o no.
- Es **reconocible** (o recursivamente enumerable) si existe una máquina que se detiene y dice **sí** para las cadenas del lenguaje, pero que puede **no detenerse nunca** con las que no lo son.
- Equivalentemente, un lenguaje es reconocible si existe un programa (un **enumerador**) que lista, uno por uno, todos sus elementos.
El problema de la parada, A_TM = {⟨M, w⟩ : M se detiene con w}, es **reconocible** (basta simular M con w y responder sí si se detiene) pero **no decidible**. Un resultado clave: un lenguaje es decidible si y solo si **él y su complemento** son reconocibles (se ejecutan ambos reconocedores en paralelo y uno de los dos termina). Por eso el complemento del problema de la parada ("M **no** se detiene con w") **no es ni siquiera reconocible**: no existe ningún programa que confirme siempre que otro programa entra en un bucle infinito.

## La diagonalización
El argumento de Turing usa la **diagonalización**, inventada por Georg Cantor en 1891 para demostrar que hay más números reales que naturales. La idea: suponer una lista completa (de reales, o de programas que deciden la parada) y construir un objeto que **difiere de cada elemento de la lista en al menos un lugar** (el n-ésimo dígito del n-ésimo real; el comportamiento del n-ésimo programa con su propio código), lo que contradice que la lista estuviera completa. Una consecuencia directa: como hay una cantidad **numerable** de programas (cada uno es un texto finito) y una cantidad **no numerable** de lenguajes (subconjuntos de las cadenas), **casi todos los lenguajes no son reconocibles por ningún programa**.

## Reducciones
Para demostrar que un problema nuevo B es indecidible, no se repite la diagonalización: se **reduce** un problema ya conocido A a B. Una **reducción por mapeo** es una función computable f tal que w ∈ A si y solo si f(w) ∈ B. Si B fuera decidible, se decidiría A calculando f(w) y preguntando a B; como A no lo es, B tampoco. El sentido importa: se reduce **desde** el problema difícil conocido **hacia** el nuevo.

Ejemplo: ¿es decidible saber si un programa **imprime "hola"** alguna vez? Dada una pareja (M, w), se construye el programa P que simula M con w (sin imprimir nada) y, si la simulación termina, imprime "hola". P imprime "hola" si y solo si M se detiene con w. Un detector de "hola" resolvería el problema de la parada: es imposible.

## El teorema de Rice
Henry Gordon Rice generalizó este tipo de argumento en 1953: **toda propiedad no trivial del comportamiento de los programas es indecidible**. "No trivial" significa que algunos programas la cumplen y otros no; "del comportamiento" significa que depende de lo que el programa **hace** (de la función que calcula o el lenguaje que acepta), no de cómo está escrito. Son indecidibles, por ejemplo: si un programa termina con toda entrada, si devuelve siempre un número positivo, si dos programas calculan lo mismo, si un programa es un virus, si un programa tiene una vulnerabilidad de inyección. En cambio, propiedades **sintácticas** ("tiene menos de 100 líneas", "usa la palabra eval") sí son decidibles.

## El problema de correspondencia de Post
Emil Post presentó en 1946 un problema que no menciona máquinas: se tiene un conjunto de fichas de dominó, cada una con un texto arriba y otro abajo; ¿existe una secuencia de fichas (con repeticiones) en que el texto de arriba concatenado sea igual al de abajo? Por ejemplo, con las fichas [a / ab], [b / ca], [ca / a] y [abc / c], la secuencia 1, 2, 3, 1, 4 da arriba "a·b·ca·a·abc" = "abcaaabc" y abajo "ab·ca·a·ab·c" = "abcaaabc". El problema es **indecidible** (se reduce desde el de la parada codificando la historia de cómputo de una máquina en las fichas), y por ser tan simple sirve para demostrar la indecidibilidad de muchos otros problemas, como la ambigüedad de las gramáticas libres de contexto.

## Indecidibilidad en la matemática
- **Décimo problema de Hilbert:** en 1900, David Hilbert pidió un método para decidir si una ecuación polinomial con coeficientes enteros (una **ecuación diofántica**) tiene soluciones enteras. En 1970, Yuri Matiyasevich, completando trabajos de Martin Davis, Hilary Putnam y Julia Robinson, demostró que **no existe**: el problema es indecidible.
- **Teoremas de incompletitud de Gödel (1931):** todo sistema formal consistente y suficientemente expresivo para la aritmética contiene afirmaciones **verdaderas que no se pueden demostrar** dentro del sistema (primer teorema), y no puede demostrar su propia consistencia (segundo teorema). Gödel construyó una fórmula que dice, en esencia, "esta fórmula no es demostrable", usando una codificación de las fórmulas como números (la **numeración de Gödel**) que anticipó la idea de que los programas son datos.
- **El Entscheidungsproblem:** Hilbert y Wilhelm Ackermann preguntaron en 1928 si existía un procedimiento para decidir si una fórmula de la lógica de predicados es válida. Church y Turing demostraron de forma independiente en 1936 que no, y para hacerlo tuvieron que definir qué es un "procedimiento": así nacieron el cálculo lambda y la máquina de Turing.

## Complejidad de Kolmogórov
La **complejidad de Kolmogórov** de una cadena (Andréi Kolmogórov, Ray Solomonoff y Gregory Chaitin, en los años sesenta) es la longitud del programa más corto que la produce. "abababab…" (un millón de veces) tiene complejidad pequeña (un bucle corto la genera); una cadena verdaderamente aleatoria tiene complejidad cercana a su longitud: no hay forma de describirla más corta que ella misma. Es la medida ideal de compresión, pero es **incomputable**: si se pudiera calcular, se podría escribir un programa corto que buscara "la primera cadena con complejidad mayor que un millón", lo que contradice su propia definición (una versión de la paradoja de Berry).

## Qué significa para un ingeniero
La indecidibilidad no es una curiosidad teórica: explica por qué ciertas herramientas **nunca serán perfectas**.
- Un analizador estático de seguridad, un verificador de terminación o un detector de código muerto deben elegir: dar **falsos positivos** (avisar de problemas que no existen), **falsos negativos** (no avisar de algunos reales) o **no terminar** en algunos casos. Ninguno puede ser a la vez completo, correcto y siempre terminar para propiedades del comportamiento.
- Los antivirus no pueden detectar todo el malware posible (Fred Cohen lo demostró en 1984, en la tesis en que acuñó el término "virus informático").
- Los compiladores no pueden detectar todo el código inalcanzable ni todas las optimizaciones posibles.
Las herramientas útiles **aproximan**: se restringen a un lenguaje menos expresivo, aceptan imprecisión en un sentido controlado (los verificadores de tipos rechazan algunos programas correctos para garantizar que los aceptados no tienen errores de tipo) o piden ayuda humana (anotaciones, invariantes, pruebas).

## Ejemplo resuelto: el "detector de reglas inútiles" de PatioApp
Gerencia pide una función que avise si una regla de tarifa **nunca** se aplicará con ningún dato posible (una regla muerta).
1. **Si el lenguaje de reglas fuera Turing completo**, por el teorema de Rice la pregunta "¿esta regla se aplica para algún dato?" es indecidible: no se puede construir un detector exacto.
2. **Pero el lenguaje de PatioApp es restringido:** las condiciones son combinaciones con "y", "o" y "no" de comparaciones de campos con constantes. Decidir si una condición así se puede cumplir es un problema de **satisfacibilidad**: decidible (aunque, en general, NP-completo).
3. **Implementación:** cada comparación se traduce a restricciones sobre los campos (tipo ∈ {camión}, días > 7, días < 3) y la condición se envía a un resolvedor SMT. Si responde "insatisfacible", la regla es muerta: por ejemplo, «si dias > 7 y dias < 3 entonces …».
4. La restricción de diseño del lenguaje convirtió una pregunta imposible en una resoluble, igual que en la unidad sobre máquinas de Turing.`,
  links: [['teo.turing', 'el problema de la parada es el punto de partida de esta unidad'], ['m2.pred', 'el Entscheidungsproblem trata sobre la lógica de predicados'], ['m14.static', 'los analizadores estáticos aproximan por la indecidibilidad']],
  read: 'Sipser, *Introducción a la teoría de la computación* (3.ª ed.), capítulos 4 y 5; Hofstadter, *Gödel, Escher, Bach* (1979); Petzold, *The Annotated Turing* (2008).',
  terms: [
    ['Lenguaje decidible', 'lenguaje para el que existe una máquina que siempre se detiene y responde correctamente', ['Pertenencia a una gramática.', 'También llamado recursivo.', 'Ambos, él y su complemento, son reconocibles.']],
    ['Lenguaje reconocible', 'lenguaje para el que existe una máquina que dice sí a sus elementos y puede no detenerse con los demás', ['El problema de la parada.', 'Recursivamente enumerable.', 'Se puede enumerar.']],
    ['Diagonalización', 'técnica que construye un objeto que difiere de cada elemento de una lista supuestamente completa', ['Cantor, 1891.', 'Usada por Turing.', 'Demuestra que hay más lenguajes que programas.']],
    ['Reducción por mapeo', 'función computable que transforma instancias de un problema en instancias de otro preservando la respuesta', ['Se reduce desde lo conocido.', 'Transfiere la indecidibilidad.', 'Imprimir "hola".']],
    ['Teorema de Rice', 'toda propiedad no trivial del comportamiento de los programas es indecidible', ['Rice, 1953.', '¿Termina siempre?', 'Las propiedades sintácticas sí son decidibles.']],
    ['Problema de correspondencia de Post', 'problema indecidible de encontrar una secuencia de fichas cuyos textos de arriba y abajo coincidan', ['Post, 1946.', 'Fichas de dominó.', 'Sirve para otras reducciones.']],
    ['Teoremas de incompletitud', 'resultados de Gödel sobre afirmaciones verdaderas indemostrables en sistemas formales suficientemente expresivos', ['Gödel, 1931.', 'Numeración de Gödel.', 'Ningún sistema prueba su propia consistencia.']],
    ['Complejidad de Kolmogórov', 'longitud del programa más corto que produce una cadena', ['Mide la aleatoriedad.', 'Es incomputable.', 'Kolmogórov, Solomonoff, Chaitin.']]
  ],
  q: [
    ['¿Por qué el complemento del problema de la parada no es reconocible?', 'Porque si lo fuera, junto con el problema de la parada (que sí es reconocible), este sería decidible', ['Porque es finito', 'Porque es regular', 'Sí es reconocible'], 'Decidible si y solo si él y su complemento son reconocibles.', 4],
    ['Para probar que un problema B es indecidible, ¿en qué sentido se hace la reducción?', 'Desde un problema indecidible conocido hacia B', ['Desde B hacia un problema fácil', 'Desde B hacia sí mismo', 'No importa el sentido'], 'Si B fuera decidible, el conocido también lo sería.', 3],
    ['Según el teorema de Rice, ¿cuál de estas preguntas sobre programas es indecidible?', '¿El programa devuelve siempre un número positivo?', ['¿El programa tiene menos de 100 líneas?', '¿El programa usa la palabra eval?', '¿El archivo está vacío?'], 'Es una propiedad no trivial del comportamiento.', 3],
    ['¿Qué demostró Matiyasevich en 1970?', 'Que no existe un algoritmo para decidir si una ecuación diofántica tiene soluciones enteras', ['Que P = NP', 'Que el problema de la parada es decidible', 'Que toda ecuación tiene solución'], 'Décimo problema de Hilbert.', 3],
    ['¿Qué dice el primer teorema de incompletitud de Gödel?', 'Que todo sistema consistente que exprese la aritmética tiene verdades que no puede demostrar', ['Que la matemática es inconsistente', 'Que todo es demostrable', 'Que las computadoras no existen'], 'Gödel, 1931.', 3],
    ['¿Por qué la complejidad de Kolmogórov es incomputable?', 'Porque calcularla permitiría un programa corto que describe una cadena de complejidad grande, lo que es contradictorio', ['Porque es muy lenta', 'Porque es infinita', 'Sí es computable'], 'Paradoja de Berry.', 4],
    ['¿Qué consecuencia tiene la indecidibilidad para los analizadores estáticos?', 'Deben aceptar falsos positivos, falsos negativos o no terminar en algunos casos', ['Pueden ser perfectos con suficiente memoria', 'No sirven para nada', 'Siempre encuentran todos los errores'], 'Las herramientas útiles aproximan.', 3],
    { tf: 'Hay más lenguajes que programas, así que casi todos los lenguajes no los reconoce ningún programa.', v: true, e: 'Los programas son numerables; los lenguajes, no.', l: 3 },
    { tf: 'Decidir si un programa contiene la palabra "eval" es indecidible por el teorema de Rice.', v: false, e: 'Es una propiedad sintáctica, no del comportamiento; se decide leyendo el texto.', l: 2 },
    { c: 'Escribe «correspondenciaPost(fichas, secuencia)»: fichas es una lista de [arriba, abajo]; secuencia, una lista de índices (desde 1). Devuelve true si la concatenación de arriba es igual a la de abajo y la secuencia no es vacía (verificar una solución sí es fácil).', f: 'correspondenciaPost', p: ['fichas', 'secuencia'], t: [[[[['a', 'ab'], ['b', 'ca'], ['ca', 'a'], ['abc', 'c']], [1, 2, 3, 1, 4]], true], [[[['a', 'ab'], ['b', 'ca']], [1, 2]], false], [[[['a', 'a']], []], false]], sol: '  if (!secuencia.length) return false;\n  const arr = secuencia.map(i => fichas[i - 1][0]).join(""), ab = secuencia.map(i => fichas[i - 1][1]).join("");\n  return arr === ab;', l: 2 },
    { c: 'Escribe «diagonal(lista)»: lista es una lista de n cadenas binarias de longitud n; devuelve la cadena que difiere de la i-ésima en su i-ésimo carácter (cambiando 0 por 1 y viceversa).', f: 'diagonal', p: ['lista'], t: [[[['010', '110', '001']], '100'], [[['1']], '0']], sol: '  return lista.map((s, i) => (s[i] === "0" ? "1" : "0")).join("");', l: 2 },
    { c: 'Escribe «simularConLimite(pasos, limite)»: simula un programa que necesita «pasos» pasos para detenerse (o −1 si nunca se detiene) con un presupuesto de «limite» pasos; devuelve "se detuvo" o "no se sabe" (así trabajan los reconocedores).', f: 'simularConLimite', p: ['pasos', 'limite'], t: [[[10, 100], 'se detuvo'], [[-1, 100], 'no se sabe'], [[500, 100], 'no se sabe']], sol: '  return pasos >= 0 && pasos <= limite ? "se detuvo" : "no se sabe";', l: 1 }
  ],
  gen: function (g) {
    var ri = [['¿El programa termina con toda entrada?', 'Indecidible'], ['¿El programa tiene más de 50 líneas?', 'Decidible'], ['¿Dos programas calculan la misma función?', 'Indecidible'], ['¿El programa contiene un bucle while?', 'Decidible'], ['¿El programa imprime alguna vez "hola"?', 'Indecidible'], ['¿El programa tiene una vulnerabilidad de inyección explotable?', 'Indecidible'], ['¿El archivo del programa pesa menos de 1 KB?', 'Decidible']];
    ri.forEach(function (r) { g.mcq(3, 'En general, para programas en un lenguaje Turing completo, ¿esta pregunta es decidible? ' + r[0], r[1], ['Decidible', 'Indecidible', 'Depende del compilador'].filter(function (x) { return x !== r[1]; }).concat(['Solo con internet']), 'Teorema de Rice: las propiedades del comportamiento son indecidibles; las sintácticas, no.'); });
    var cl = [['El problema de la parada', 'Reconocible pero no decidible'], ['El complemento del problema de la parada', 'No reconocible'], ['Saber si una cadena pertenece a una gramática libre de contexto', 'Decidible'], ['Saber si un AFD acepta alguna cadena', 'Decidible']];
    cl.forEach(function (c) { g.mcq(4, '¿Cómo se clasifica este problema? ' + c[0], c[1], ['Decidible', 'Reconocible pero no decidible', 'No reconocible'].filter(function (x) { return x !== c[1]; }).concat(['Regular']), 'Decidible, reconocible y no reconocible.'); });
    var hi = [['Cantor', 'Diagonalización, 1891'], ['Gödel', 'Teoremas de incompletitud, 1931'], ['Turing', 'Problema de la parada, 1936'], ['Rice', 'Propiedades del comportamiento indecidibles, 1953'], ['Post', 'Problema de correspondencia, 1946'], ['Matiyasevich', 'Décimo problema de Hilbert, 1970']];
    hi.forEach(function (h) { g.mcq(1, '¿Qué resultado se asocia con ' + h[0] + '?', h[1], ['Diagonalización, 1891', 'Teoremas de incompletitud, 1931', 'Problema de la parada, 1936', 'Propiedades del comportamiento indecidibles, 1953', 'Problema de correspondencia, 1946', 'Décimo problema de Hilbert, 1970'].filter(function (x) { return x !== h[1]; }).slice(0, 3), 'Historia de la computabilidad.'); });
  },
  checks: [
    ['Diferencia lenguaje decidible y reconocible con un ejemplo de cada uno.', 'Decidible: la máquina siempre se detiene (pertenencia a una GLC); reconocible: puede no detenerse en el no (el problema de la parada).'],
    ['Explica cómo se usa una reducción para probar indecidibilidad.', 'Se transforma con una función computable un problema indecidible conocido en el nuevo; si el nuevo fuera decidible, el conocido también lo sería.'],
    ['Enuncia el teorema de Rice y da dos ejemplos de propiedades indecidibles y una decidible.', 'Toda propiedad no trivial del comportamiento es indecidible: terminar siempre, calcular lo mismo que otro; decidible: tener menos de 100 líneas.'],
    ['¿Qué implica la indecidibilidad para las herramientas de análisis de software?', 'Que no pueden ser a la vez completas, correctas y terminar siempre; se diseñan aproximaciones o se restringe el lenguaje.']
  ],
  cites: ['Turing, A. M. (1936). On Computable Numbers, with an Application to the Entscheidungsproblem. *Proceedings of the London Mathematical Society*, 42(2).', 'Rice, H. G. (1953). Classes of Recursively Enumerable Sets and Their Decision Problems. *Transactions of the AMS*, 74(2).', 'Post, E. (1946). A Variant of a Recursively Unsolvable Problem. *Bulletin of the AMS*, 52(4).', 'Matiyasevich, Y. (1970). Enumerable sets are Diophantine. *Doklady Akademii Nauk SSSR*, 191.', 'Gödel, K. (1931). Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I. *Monatshefte für Mathematik und Physik*, 38.', 'Cohen, F. (1987). Computer Viruses: Theory and Experiments. *Computers & Security*, 6(1).'],
  project: { t: 'Los límites de la computación en la práctica',
    goal: 'Relacionar los resultados de indecidibilidad con herramientas reales.',
    steps: ['Escribe la demostración del problema de la parada con tus palabras y un programa en pseudocódigo que ilustre la contradicción.', 'Construye dos reducciones propias desde el problema de la parada (por ejemplo, "¿el programa escribe en un archivo?").', 'Elige una herramienta de análisis estático y encuentra un falso positivo y un falso negativo; explica por qué son inevitables.', 'Diseña un lenguaje restringido para un problema concreto en el que una pregunta indecidible en general se vuelva decidible.', 'Implementa un verificador de soluciones del problema de correspondencia de Post y un buscador con límite de profundidad.'],
    deliver: 'Las demostraciones, las reducciones, el análisis de la herramienta, el diseño del lenguaje y el código.' },
  hito: ['Implementa en PatioApp el detector de reglas de tarifa muertas traduciendo las condiciones a un resolvedor SMT.', 'Documenta en un ADR de PatioApp por qué el lenguaje de reglas se mantiene sin bucles ni recursión, con referencia al teorema de Rice.']
});
SDC.after('teo.undec', 'teo.turing');

S('teo', 'teo.complex', { title: 'Más allá de NP: espacio, aleatoriedad, aproximación y cómputo cuántico',
  ask: '¿Qué clase o resultado de complejidad se aplica?',
  lesson: `
> **La idea en simple.** Saber si un problema se puede resolver "rápido" no es una sola pregunta. ¿Rápido con cuánta memoria? ¿Se permite lanzar una moneda y equivocarse con probabilidad mínima? ¿Basta con una respuesta cercana a la óptima? ¿Y con una computadora cuántica? Cada pregunta define una clase de complejidad, y el mapa de esas clases explica por qué algunos problemas se resuelven al instante, otros con trucos y otros parecen imposibles.

## Medir el espacio
Además del tiempo, se mide la **memoria** que usa un algoritmo, sin contar la entrada:
- **L** (espacio logarítmico): problemas que se resuelven con O(log n) de memoria de trabajo, es decir, con unos pocos contadores o punteros. Por ejemplo, verificar si los paréntesis están balanceados (con un contador). Omer Reingold demostró en 2005 que decidir si hay un camino entre dos vértices de un grafo **no dirigido** está en L, un resultado sorprendente.
- **NL**: lo mismo, pero con no determinismo; el problema de alcanzabilidad en grafos **dirigidos** es completo para NL.
- **PSPACE**: problemas que se resuelven con memoria polinomial, sin límite de tiempo.
- **EXPTIME**: problemas que se resuelven en tiempo exponencial.
Las inclusiones conocidas son L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME. Un algoritmo que corre en tiempo t no puede usar más de t celdas de memoria, por eso el tiempo polinomial implica espacio polinomial. Walter Savitch demostró en 1970 que el no determinismo ayuda poco con el espacio: NPSPACE = PSPACE.

## Teoremas de jerarquía
¿Más recursos permiten resolver más problemas? Juris Hartmanis y Richard Stearns demostraron en 1965 (y recibieron el Premio Turing de 1993) los **teoremas de jerarquía**: con suficientemente más tiempo (o espacio) se pueden resolver problemas que no se pueden con menos. Como consecuencia, **P ≠ EXPTIME** y **L ≠ PSPACE**: hay problemas que requieren de verdad tiempo exponencial. En la cadena L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME, sabemos entonces que alguna inclusión entre P y EXPTIME es estricta, pero **no sabemos cuál**: P vs. NP, NP vs. PSPACE y PSPACE vs. EXPTIME son preguntas abiertas.

## PSPACE y los juegos
El problema **TQBF** (decidir si una fórmula booleana con cuantificadores ∀ y ∃ alternados es verdadera) es **PSPACE-completo**, demostrado por Larry Stockmeyer y Albert Meyer en 1973. Su forma refleja la de los **juegos de dos jugadores**: "existe una jugada mía tal que para toda jugada del rival existe una jugada mía tal que… gano". Por eso muchos juegos generalizados a tableros de tamaño n son PSPACE-completos (el Hex, el Go con ciertas reglas) y algunos son EXPTIME-completos (el ajedrez y las damas generalizados a tableros n × n, demostrado por Aviezri Fraenkel y David Lichtenstein en 1981). En la práctica, verificar ciertas propiedades de sistemas concurrentes (verificación de modelos de lógica temporal) también es PSPACE-completo.

## coNP
**coNP** contiene los problemas cuyo **no** se verifica rápido: por ejemplo, "esta fórmula es **insatisfacible**" o "este número es primo" (antes de 2002) o "este grafo **no** tiene un ciclo hamiltoniano". Para demostrar que una fórmula es satisfacible basta mostrar una asignación (certificado corto); para demostrar que es insatisfacible, no se conoce en general un certificado corto. Se cree que NP ≠ coNP; si fueran iguales, todo problema con certificados cortos para el sí los tendría también para el no. Los resolvedores SAT modernos producen **pruebas de insatisfacibilidad** que pueden ser enormes (la que resolvió en 2016 el problema de los triples pitagóricos booleanos ocupaba 200 terabytes).

## Algoritmos aleatorizados
Un algoritmo **aleatorizado** puede lanzar monedas. Hay dos tipos:
- **Las Vegas:** siempre da la respuesta correcta, pero su tiempo es aleatorio (Quicksort con pivote aleatorio: O(n log n) esperado sin importar la entrada).
- **Monte Carlo:** siempre es rápido, pero puede equivocarse con probabilidad pequeña y controlable.
La clase **BPP** contiene los problemas que se resuelven en tiempo polinomial con probabilidad de error menor a 1/3; repitiendo el algoritmo y votando, el error baja **exponencialmente** (con 100 repeticiones, por debajo de 10⁻¹⁰). Ejemplos:
- La prueba de primalidad de **Miller-Rabin** (Gary Miller, 1976; Michael Rabin, 1980): cada ronda declara "compuesto" con certeza o "probablemente primo" con error ≤ 1/4; con 40 rondas el error es menor que 10⁻²⁴. Es la que usan las bibliotecas criptográficas para generar claves RSA.
- El **identificar si dos polinomios son iguales** evaluándolos en puntos aleatorios (lema de Schwartz-Zippel).
- Los **filtros de Bloom**, **HyperLogLog** y otras estructuras de datos probabilísticas que responden con un error acotado usando muy poca memoria.
Curiosamente, se conjetura que **BPP = P**: que la aleatoriedad no da poder esencial, solo comodidad. En 2002, Manindra Agrawal, Neeraj Kayal y Nitin Saxena (del Instituto Indio de Tecnología de Kanpur) dieron el algoritmo **AKS**, que decide la primalidad en tiempo polinomial **sin** aleatoriedad, aunque en la práctica Miller-Rabin sigue siendo mucho más rápido.
~~~js
// Miller-Rabin con BigInt: "probablemente primo" con error menor que 4^(-rondas)
function potMod(b, e, m) { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; }
function probablementePrimo(n, rondas = 20) {
  if (n < 4n) return n === 2n || n === 3n;
  if (n % 2n === 0n) return false;
  let d = n - 1n, s = 0; while (d % 2n === 0n) { d /= 2n; s++; }
  for (let i = 0; i < rondas; i++) {
    const a = 2n + BigInt(Math.floor(Math.random() * 1e9)) % (n - 3n);
    let x = potMod(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let compuesto = true;
    for (let r = 1; r < s; r++) { x = x * x % n; if (x === n - 1n) { compuesto = false; break; } }
    if (compuesto) return false;
  }
  return true;
}
console.log(probablementePrimo(2147483647n), probablementePrimo(561n), probablementePrimo(1000000007n));   // 561 es un número de Carmichael
~~~

## Aproximación e inaproximabilidad
Para problemas NP-difíciles de optimización, un **algoritmo de aproximación** garantiza una solución a un factor del óptimo en tiempo polinomial:
- **Cobertura de vértices:** tomar ambos extremos de cada arista de un emparejamiento maximal da una cobertura como máximo **2 veces** el óptimo.
- **Viajante métrico:** el algoritmo de Christofides (1976) garantiza un factor de **1,5**.
- **Mochila:** admite un **esquema de aproximación** (FPTAS): para cualquier ε, una solución a un factor (1 + ε) del óptimo en tiempo polinomial en n y 1/ε.
Pero hay límites: el **teorema PCP** (Sanjeev Arora, Shmuel Safra y otros, 1992), uno de los resultados más profundos de la teoría, implica que para muchos problemas **aproximar más allá de cierto factor es tan difícil como resolverlos exactamente**. Por ejemplo, Johan Håstad demostró en 2001 que, salvo que P = NP, no se puede satisfacer en tiempo polinomial más de 7/8 + ε de las cláusulas de una fórmula 3-SAT en el peor caso, y una asignación aleatoria ya logra 7/8 en promedio.

## Complejidad parametrizada
Otra forma de domar problemas difíciles es encontrar un **parámetro** pequeño en las instancias reales. Un problema es **tratable con parámetro fijo** (FPT, Rodney Downey y Michael Fellows, 1990) si se resuelve en tiempo f(k) · nᶜ, donde k es el parámetro: exponencial solo en k. Por ejemplo, la cobertura de vértices de tamaño k se decide en tiempo aproximadamente 1,27ᵏ + kn, utilizable para k de hasta un centenar aunque el grafo tenga millones de vértices.

## Cómputo cuántico
Una computadora **cuántica** manipula **qubits**, que pueden estar en **superposición** de 0 y 1, y aprovecha la **interferencia** para que las respuestas correctas se refuercen y las incorrectas se cancelen. La clase correspondiente es **BQP**. Resultados clave:
- **Algoritmo de Shor** (Peter Shor, 1994): factoriza enteros y calcula logaritmos discretos en tiempo polinomial. Rompería RSA y la criptografía de curvas elípticas; por eso existe la criptografía poscuántica que viste en Seguridad.
- **Algoritmo de Grover** (Lov Grover, 1996): busca en una lista no ordenada de N elementos con unos √N pasos en lugar de N. Duplicar la longitud de las claves simétricas (AES-256) neutraliza esta ventaja.
- No se cree que las computadoras cuánticas resuelvan problemas **NP-completos** en tiempo polinomial: BQP probablemente no contiene a NP.
Las máquinas actuales tienen pocos cientos o miles de qubits físicos con mucho ruido; romper RSA-2048 requeriría, según estimaciones de 2019 de Craig Gidney y Martin Ekerå, unos 20 millones de qubits físicos con corrección de errores, y estimaciones posteriores bajaron esa cifra, pero sigue lejos de lo disponible.

## Ejemplo resuelto: elegir el enfoque para tres problemas de PatioApp
1. **¿Es primo este número de 2048 bits para generar una clave?** → Miller-Rabin con 40 rondas (BPP, error menor que 10⁻²⁴). AKS sería exacto pero mucho más lento.
2. **¿Cuántas placas distintas pasaron este año por todas las sedes?** Contar exacto exige guardar todas. → **HyperLogLog** (Philippe Flajolet y otros, 2007): estima la cardinalidad con un error típico de alrededor del 2 % usando solo unos 1,5 KB de memoria.
3. **Asignar 300 inspecciones a turnos con conflictos (coloración):** NP-difícil y difícil de aproximar en general. → Heurística voraz con cota inferior por el clique más grande encontrado; si la diferencia entre la cota y la solución es pequeña, se acepta; si no, se usa un resolvedor exacto con límite de tiempo, aprovechando que el grafo real es muy disperso.
Cada problema cae en una región distinta del mapa de complejidad, y reconocerla define la herramienta.`,
  links: [['teo.np', 'P, NP y la NP-completitud son el punto de partida'], ['m16.crypto', 'el algoritmo de Shor motiva la criptografía poscuántica'], ['mat2.opt', 'los algoritmos de aproximación complementan la optimización exacta']],
  read: 'Sipser, *Introducción a la teoría de la computación* (3.ª ed.), capítulos 8 a 10; Arora y Barak, *Computational Complexity: A Modern Approach* (2009); Aaronson, *Quantum Computing Since Democritus* (2013).',
  terms: [
    ['PSPACE', 'clase de problemas que se resuelven con memoria polinomial', ['Contiene a NP.', 'TQBF es completo.', 'Juegos generalizados.']],
    ['Teorema de jerarquía', 'resultado de que con suficientemente más tiempo o espacio se resuelven más problemas', ['Hartmanis y Stearns, 1965.', 'P ≠ EXPTIME.', 'L ≠ PSPACE.']],
    ['coNP', 'clase de problemas cuyas respuestas negativas tienen certificados verificables rápido', ['Insatisfacibilidad.', 'Se cree distinta de NP.', 'Complemento de NP.']],
    ['BPP', 'problemas resolubles en tiempo polinomial con algoritmos aleatorizados de error acotado', ['Miller-Rabin.', 'El error baja al repetir.', 'Se conjetura igual a P.']],
    ['Algoritmo de Monte Carlo', 'algoritmo aleatorizado siempre rápido que puede equivocarse con probabilidad pequeña', ['Miller-Rabin.', 'Filtros de Bloom.', 'Se contrapone a Las Vegas.']],
    ['Algoritmo de aproximación', 'algoritmo polinomial que garantiza una solución a un factor del óptimo', ['Christofides: 1,5.', 'Cobertura de vértices: 2.', 'Para problemas NP-difíciles.']],
    ['Teorema PCP', 'resultado que implica que aproximar muchos problemas más allá de cierto factor es NP-difícil', ['Arora, Safra y otros, 1992.', 'Håstad: 7/8 en 3-SAT.', 'Inaproximabilidad.']],
    ['BQP', 'clase de problemas resolubles eficientemente por computadoras cuánticas', ['Contiene la factorización (Shor).', 'Probablemente no contiene a NP.', 'Qubits y superposición.']]
  ],
  q: [
    ['¿Qué cadena de inclusiones es correcta?', 'L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME', ['P ⊆ L ⊆ NP ⊆ EXPTIME ⊆ PSPACE', 'NP ⊆ P ⊆ PSPACE', 'EXPTIME ⊆ PSPACE ⊆ NP'], 'Algunas inclusiones se saben estrictas, otras no.', 3],
    ['¿Qué demuestran los teoremas de jerarquía?', 'Que P ≠ EXPTIME: hay problemas que requieren tiempo exponencial', ['Que P = NP', 'Que todo es decidible', 'Que el espacio no importa'], 'Hartmanis y Stearns, 1965.', 3],
    ['¿Qué tipo de problema es PSPACE-completo?', 'Decidir fórmulas booleanas con cuantificadores alternados (TQBF)', ['Ordenar una lista', 'Sumar dos números', 'Buscar en un arreglo ordenado'], 'Su forma refleja los juegos de dos jugadores.', 4],
    ['¿Qué garantiza un algoritmo de Las Vegas?', 'Respuesta siempre correcta, con tiempo aleatorio', ['Respuesta posiblemente incorrecta y tiempo fijo', 'Nada', 'Tiempo constante'], 'Quicksort aleatorizado.', 2],
    ['¿Cómo se reduce el error de un algoritmo de Monte Carlo?', 'Repitiéndolo y votando: el error baja exponencialmente', ['Usando más memoria', 'No se puede reducir', 'Con una computadora cuántica'], 'Miller-Rabin con 40 rondas.', 2],
    ['¿Qué haría el algoritmo de Shor con una computadora cuántica grande?', 'Factorizar enteros en tiempo polinomial y romper RSA', ['Resolver todos los problemas NP-completos', 'Ordenar listas en tiempo constante', 'Nada útil'], 'Por eso existe la criptografía poscuántica.', 2],
    ['Según Håstad, ¿qué fracción de cláusulas de 3-SAT logra en promedio una asignación aleatoria, y que no se puede mejorar significativamente en el peor caso salvo que P = NP?', '7/8', ['1/2', '1', '2/3'], 'Inaproximabilidad derivada del teorema PCP.', 4],
    { tf: 'Se sabe que P ≠ NP.', v: false, e: 'Es uno de los problemas abiertos más importantes; lo que se sabe es P ≠ EXPTIME.', l: 1 },
    { tf: 'Se cree que las computadoras cuánticas no resuelven problemas NP-completos en tiempo polinomial.', v: true, e: 'BQP probablemente no contiene a NP.', l: 3 },
    { c: 'Escribe «coberturaAprox(aristas)»: recorre las aristas en orden; si ninguno de sus extremos está en la cobertura, agrega ambos. Devuelve el tamaño de la cobertura (factor 2 del óptimo).', f: 'coberturaAprox', p: ['aristas'], t: [[[[[1, 2], [2, 3], [3, 4]]], 4], [[[[1, 2], [1, 3], [1, 4]]], 2], [[[]], 0]], sol: '  const c = new Set();\n  for (const [a, b] of aristas) if (!c.has(a) && !c.has(b)) { c.add(a); c.add(b); }\n  return c.size;', l: 3 },
    { c: 'Escribe «errorRepetido(e, k)»: probabilidad de que k rondas independientes con error e cada una se equivoquen todas (e^k), redondeada a 10 decimales.', f: 'errorRepetido', p: ['e', 'k'], t: [[[0.25, 5], 0.0009765625], [[0.5, 10], 0.0009765625], [[0.25, 1], 0.25]], sol: '  return Math.round(Math.pow(e, k) * 1e10) / 1e10;', l: 2 },
    { c: 'Escribe «pasosGrover(n)»: aproximación de los pasos de Grover para buscar entre n elementos, redondeando √n hacia arriba.', f: 'pasosGrover', p: ['n'], t: [[[1000000], 1000], [[10], 4], [[1], 1]], sol: '  return Math.ceil(Math.sqrt(n));', l: 1 }
  ],
  gen: function (g) {
    var cl = [['Verificar paréntesis balanceados con un contador', 'L'], ['Ordenar una lista', 'P'], ['Decidir si una fórmula es satisfacible', 'NP-completo'], ['Decidir si una fórmula es insatisfacible', 'coNP-completo'], ['Decidir fórmulas booleanas con cuantificadores alternados', 'PSPACE-completo'], ['Decidir quién gana al ajedrez generalizado n × n', 'EXPTIME-completo']];
    cl.forEach(function (c) { g.mcq(3, '¿Dónde se ubica este problema? ' + c[0], c[1], ['L', 'P', 'NP-completo', 'coNP-completo', 'PSPACE-completo', 'EXPTIME-completo'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Mapa de clases de complejidad.'); });
    var al = [['Quicksort con pivote aleatorio', 'Las Vegas'], ['Prueba de primalidad de Miller-Rabin', 'Monte Carlo'], ['Filtro de Bloom', 'Monte Carlo'], ['Búsqueda aleatoria que repite hasta encontrar una solución verificada', 'Las Vegas']];
    al.forEach(function (a) { g.mcq(2, '¿Qué tipo de algoritmo aleatorizado es? ' + a[0], a[1], ['Las Vegas', 'Monte Carlo', 'Determinista', 'Cuántico'].filter(function (x) { return x !== a[1]; }), 'Correcto siempre con tiempo aleatorio, o rápido con error acotado.'); });
    g.times(6, function (R) { var k = R.int(2, 12); g.input(3, 'Una ronda de Miller-Rabin se equivoca con probabilidad como máximo 1/4. ¿Cuál es la cota de error con ' + k + ' rondas? Escribe el exponente n de 4^(−n).', k, 'Las rondas son independientes: (1/4)^k.'); });
  },
  checks: [
    ['Ordena las clases L, NL, P, NP, PSPACE y EXPTIME y di qué se sabe de sus diferencias.', 'L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME; se sabe que P ≠ EXPTIME y L ≠ PSPACE, pero no cuáles inclusiones intermedias son estrictas.'],
    ['Diferencia los algoritmos de Las Vegas y de Monte Carlo con un ejemplo de cada uno.', 'Las Vegas siempre acierta con tiempo aleatorio (Quicksort aleatorizado); Monte Carlo siempre es rápido con error acotado (Miller-Rabin).'],
    ['¿Qué ofrece un algoritmo de aproximación y qué límite impone el teorema PCP?', 'Una solución a un factor garantizado del óptimo en tiempo polinomial; el teorema PCP implica que para muchos problemas no se puede aproximar más allá de cierto factor salvo que P = NP.'],
    ['¿Qué problemas resolvería eficientemente una computadora cuántica y cuáles probablemente no?', 'Factorización y logaritmo discreto (Shor) y búsqueda con ventaja cuadrática (Grover); probablemente no los NP-completos.']
  ],
  cites: ['Hartmanis, J. y Stearns, R. (1965). On the Computational Complexity of Algorithms. *Transactions of the AMS*, 117.', 'Savitch, W. (1970). Relationships Between Nondeterministic and Deterministic Tape Complexities. *Journal of Computer and System Sciences*, 4(2).', 'Agrawal, M., Kayal, N. y Saxena, N. (2004). PRIMES is in P. *Annals of Mathematics*, 160(2).', 'Arora, S. et al. (1998). Proof Verification and the Hardness of Approximation Problems. *Journal of the ACM*, 45(3).', 'Shor, P. (1997). Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer. *SIAM Journal on Computing*, 26(5).', 'Arora, S. y Barak, B. (2009). *Computational Complexity: A Modern Approach*. Cambridge University Press.'],
  project: { t: 'El mapa de la complejidad en código',
    goal: 'Experimentar con algoritmos aleatorizados, de aproximación y estructuras probabilísticas.',
    steps: ['Implementa Miller-Rabin con BigInt y mide su error empírico con números de Carmichael y con primos conocidos.', 'Implementa la aproximación 2 de cobertura de vértices y compárala con la solución exacta por fuerza bruta en grafos pequeños.', 'Implementa un filtro de Bloom y mide la tasa de falsos positivos según su tamaño.', 'Implementa una versión sencilla de HyperLogLog y compara su estimación con el conteo exacto.', 'Escribe un resumen ubicando cada problema en el mapa de clases y justificando el enfoque.'],
    deliver: 'El código, las mediciones y el resumen.' },
  hito: ['Agrega a PatioApp un conteo aproximado con HyperLogLog de las placas distintas atendidas por año en todas las sedes.', 'Implementa en PatioApp la asignación de inspecciones con heurística y cota inferior, y documenta la brecha obtenida.']
});
SDC.after('teo.complex', 'teo.np');
})();
