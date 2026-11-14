(function () {
var S = SDC.S;

S('mat2', 'mat2.opt', { title: 'Optimización: programación lineal, convexidad y gradiente',
  ask: '¿Qué concepto de optimización se aplica?',
  lesson: `
> **La idea en simple.** Muchas decisiones de ingeniería son "elige lo mejor dentro de lo posible": la ruta más corta, el reparto de servidores más barato que cumpla la carga, los horarios que satisfacen a más personas, los parámetros de un modelo que cometen menos errores. La optimización matemática da el lenguaje para plantear esos problemas y los algoritmos para resolverlos, y también dice cuándo un problema es fácil y cuándo es intratable.

## Anatomía de un problema de optimización
Todo problema de optimización tiene tres partes:
- **Variables de decisión:** lo que se puede elegir (cuántas unidades asignar a cada zona, cuántos servidores encender).
- **Función objetivo:** lo que se quiere minimizar o maximizar (costo, tiempo, ingreso, error).
- **Restricciones:** lo que no se puede violar (capacidad de cada zona, presupuesto, horas de trabajo).
Una solución es **factible** si cumple las restricciones, y **óptima** si además ninguna otra factible es mejor. El tipo de problema (lineal o no, continuo o entero, convexo o no) decide qué tan difícil es resolverlo.

## Programación lineal
Un problema es de **programación lineal** si el objetivo y las restricciones son **lineales** en las variables continuas. Ejemplo: PatioApp debe decidir cuántas unidades ligeras (x) y pesadas (y) aceptar en un patio, donde cada ligera deja 20 soles al día y ocupa 1 espacio y 0 horas de grúa, y cada pesada deja 50 soles, ocupa 3 espacios y requiere 1 hora de grúa.
~~~txt
Maximizar   20x + 50y                (ingreso diario)
sujeto a    x + 3y ≤ 300             (espacios)
            y ≤ 60                   (horas de grúa)
            x ≤ 200                  (permisos municipales para ligeras)
            x ≥ 0, y ≥ 0
~~~
Geométricamente, las restricciones definen un **polígono convexo** (la región factible) y la función objetivo es una familia de rectas paralelas que se desplazan. El teorema fundamental dice que, si hay óptimo, **se alcanza en un vértice** del polígono. Aquí los vértices son (0, 0), (200, 0), (200, 33,3), (120, 60) y (0, 60); evaluando: 20·200 + 50·33,3 ≈ 5667 y 20·120 + 50·60 = 5400. El óptimo es aceptar 200 ligeras y unas 33 pesadas.

George Dantzig inventó en 1947 el **método símplex**, que recorre los vértices mejorando el objetivo en cada paso. Funciona muy bien en la práctica, aunque Victor Klee y George Minty mostraron en 1972 ejemplos en que necesita una cantidad exponencial de pasos. Leonid Jachiyán demostró en 1979 que la programación lineal se resuelve en **tiempo polinomial** (método del elipsoide), y Narendra Karmarkar presentó en 1984 un **método de punto interior** polinomial y eficiente en la práctica. Leonid Kantoróvich (que había formulado problemas de este tipo en 1939 para la planificación soviética) y Tjalling Koopmans recibieron el Premio Nobel de Economía de 1975 por la teoría de la asignación óptima de recursos.

## Dualidad
Todo problema lineal tiene un **dual**: si el primal maximiza el ingreso sujeto a recursos limitados, el dual minimiza el valor de esos recursos. El **teorema de dualidad** dice que ambos óptimos coinciden. Las variables duales se llaman **precios sombra**: cuánto aumentaría el óptimo si se tuviera una unidad más de cada recurso. En el ejemplo, el precio sombra de la grúa dice cuánto valdría pagar por una hora adicional de grúa; si es menor que lo que cuesta alquilarla, no conviene.

## Programación entera
Si las variables deben ser **enteras** (no se acepta un tercio de camión, no se enciende media máquina) el problema es de **programación entera**, y cambia todo: en general es **NP-difícil**. Redondear la solución continua no basta: puede no ser factible o estar lejos del óptimo entero. Los resolvedores usan **ramificación y acotamiento** (*branch and bound*, Ailsa Land y Alison Doig, 1960): resuelven la versión continua para obtener cotas, se ramifican sobre una variable fraccionaria (y ≤ 33 o y ≥ 34) y descartan las ramas cuya cota no puede mejorar lo ya encontrado. Herramientas como HiGHS, CBC, OR-Tools de Google, Gurobi y CPLEX resuelven en minutos problemas con millones de variables gracias a décadas de mejoras. Muchos problemas clásicos se formulan así: asignación de turnos, rutas de vehículos, ubicación de almacenes, planificación de la producción.

## Optimización convexa
Una función es **convexa** si el segmento entre dos puntos de su gráfica queda por encima de ella (forma de cuenco), y un conjunto es convexo si el segmento entre dos de sus puntos queda dentro. La propiedad clave: en un problema **convexo** (minimizar una función convexa sobre un conjunto convexo), **todo mínimo local es global**. Por eso los problemas convexos se resuelven de forma eficiente y confiable, y los no convexos pueden tener muchos mínimos locales donde un algoritmo se queda atrapado. Stephen Boyd y Lieven Vandenberghe resumieron la teoría en *Convex Optimization* (2004), uno de los libros más influyentes del área. La programación lineal es un caso particular de optimización convexa; también lo son los mínimos cuadrados y muchos problemas de aprendizaje automático (regresión lineal y logística, máquinas de vectores de soporte).

## Descenso por gradiente
Para minimizar una función diferenciable sin fórmula cerrada, el método más usado es el **descenso por gradiente** (propuesto por Augustin-Louis Cauchy en 1847): empezar en algún punto y dar pasos en la dirección opuesta al **gradiente** (el vector de derivadas parciales, que apunta hacia donde la función crece más rápido):
x ← x − η · ∇f(x)
donde **η** es la **tasa de aprendizaje**. Si es demasiado grande, el algoritmo oscila o diverge; si es demasiado pequeña, avanza con lentitud. En aprendizaje automático, con millones de datos, se usa el **descenso por gradiente estocástico** (SGD): cada paso estima el gradiente con un pequeño lote de ejemplos en lugar de todos, lo que es mucho más barato y, sorprendentemente, ayuda a escapar de malos mínimos locales. Variantes con **momento** y tasas adaptativas, como **Adam** (Diederik Kingma y Jimmy Ba, 2014), son el estándar para entrenar redes neuronales, cuyas funciones de error no son convexas.
~~~js
// Descenso por gradiente para ajustar una recta y = a·x + b a datos (mínimos cuadrados)
const datos = [[1, 52], [2, 61], [3, 69], [4, 81], [5, 88]];     // horas de punta vs. unidades en espera
let a = 0, b = 0;
const eta = 0.01;
for (let paso = 0; paso < 20000; paso++) {
  let ga = 0, gb = 0;
  for (const [x, y] of datos) { const e = a * x + b - y; ga += 2 * e * x; gb += 2 * e; }
  a -= eta * ga / datos.length; b -= eta * gb / datos.length;
}
console.log('y ≈', a.toFixed(2) + '·x +', b.toFixed(2));        // la solución exacta de mínimos cuadrados es 9,2x + 42,6
~~~

## Heurísticas y metaheurísticas
Cuando el problema es NP-difícil y demasiado grande para resolverlo exactamente, se buscan soluciones **buenas** en tiempo razonable:
- **Algoritmos voraces:** elegir en cada paso lo localmente mejor (el vecino más cercano en una ruta).
- **Búsqueda local:** partir de una solución y mejorarla con cambios pequeños (intercambiar dos visitas de una ruta, la heurística 2-opt).
- **Recocido simulado** (Scott Kirkpatrick, Daniel Gelatt y Mario Vecchi, 1983): como la búsqueda local, pero aceptando a veces empeorar, con una probabilidad que disminuye con el tiempo, inspirado en el enfriamiento lento de los metales, para escapar de mínimos locales.
- **Algoritmos genéticos** (John Holland, 1975): una población de soluciones que se combinan y mutan, seleccionando las mejores.
- **Algoritmos de aproximación** con garantía: por ejemplo, el de Christofides (1976) para el viajante métrico garantiza una ruta como máximo 1,5 veces más larga que la óptima.

## Ejemplo resuelto: el plan de grúas de PatioApp
El patio tiene 3 grúas y 40 movimientos programados para mañana, cada uno con duración y ventana horaria; hay que asignarlos para terminar lo antes posible.
1. **Formulación:** variables binarias xₘ,g,t (el movimiento m empieza en la grúa g en el minuto t); restricciones de que cada movimiento se haga una vez, dentro de su ventana, y que una grúa no haga dos a la vez; objetivo: minimizar la hora de término del último movimiento.
2. **Tipo:** programación entera, NP-difícil en general.
3. **Resolución:** con el resolvedor de OR-Tools, la instancia de 40 movimientos se resuelve de forma óptima en unos segundos: termina a las 15:40.
4. **Comparación:** la heurística voraz que usaba el supervisor (asignar cada movimiento a la primera grúa libre, en orden de llegada) terminaba a las 17:10. El modelo ahorra hora y media de grúas por día.
5. **Precio sombra:** el análisis muestra que una cuarta grúa solo adelantaría el término 20 minutos, porque el cuello de botella son las ventanas horarias de los camiones, no las grúas. Conclusión: no vale la pena alquilarla.`,
  links: [['mat2.calc', 'el gradiente generaliza la derivada a varias variables'], ['teo.np', 'la programación entera es NP-difícil'], ['ia.ml', 'el entrenamiento de modelos es un problema de optimización']],
  read: 'Hillier y Lieberman, *Introducción a la investigación de operaciones* (10.ª ed.); Boyd y Vandenberghe, *Convex Optimization* (2004, libre en línea); Dantzig (1947, publicado en 1951).',
  terms: [
    ['Función objetivo', 'cantidad que se quiere minimizar o maximizar en un problema de optimización', ['Ingreso diario.', 'Costo total.', 'Error del modelo.']],
    ['Región factible', 'conjunto de soluciones que cumplen todas las restricciones', ['Un polígono convexo en programación lineal.', 'Puede ser vacía.', 'El óptimo está en ella.']],
    ['Programación lineal', 'optimización con objetivo y restricciones lineales en variables continuas', ['Método símplex.', 'Óptimo en un vértice.', 'Tiempo polinomial.']],
    ['Precio sombra', 'cuánto mejoraría el óptimo con una unidad más de un recurso', ['Variable dual.', 'Valor de una hora de grúa.', 'Guía decisiones de inversión.']],
    ['Programación entera', 'optimización en la que las variables deben ser enteras', ['NP-difícil en general.', 'Ramificación y acotamiento.', 'Turnos y rutas.']],
    ['Función convexa', 'función cuyo segmento entre dos puntos de la gráfica queda por encima de ella', ['Forma de cuenco.', 'Todo mínimo local es global.', 'Mínimos cuadrados.']],
    ['Descenso por gradiente', 'método iterativo que avanza en la dirección opuesta al gradiente para minimizar', ['Cauchy, 1847.', 'Tasa de aprendizaje.', 'Base del entrenamiento de redes.']],
    ['Recocido simulado', 'metaheurística que acepta a veces empeorar, con probabilidad decreciente, para escapar de mínimos locales', ['Kirkpatrick y otros, 1983.', 'Inspirada en los metales.', 'Para problemas NP-difíciles.']]
  ],
  q: [
    ['¿Dónde se alcanza el óptimo de un problema de programación lineal acotado?', 'En un vértice de la región factible', ['Siempre en el origen', 'En el centro de la región', 'Fuera de la región'], 'Teorema fundamental.', 2],
    ['¿Qué ventaja tienen los problemas convexos?', 'Todo mínimo local es global', ['Siempre tienen solución entera', 'No tienen restricciones', 'Se resuelven a mano'], 'No hay trampas locales.', 3],
    ['¿Por qué no basta con redondear la solución continua de un problema entero?', 'Porque puede no ser factible o estar lejos del óptimo entero', ['Porque redondear es ilegal', 'Porque siempre da cero', 'Sí basta'], 'Por eso existe la ramificación y acotamiento.', 3],
    ['¿Qué pasa si la tasa de aprendizaje es demasiado grande?', 'El algoritmo oscila o diverge', ['Converge más rápido siempre', 'No cambia nada', 'Se detiene en el primer paso'], 'Si es muy pequeña, avanza lento.', 2],
    ['¿Qué indica el precio sombra de una restricción?', 'Cuánto mejoraría el óptimo con una unidad más del recurso', ['El precio de venta', 'El número de variables', 'El tiempo de cómputo'], 'Variable dual.', 3],
    ['¿Quién inventó el método símplex y en qué año?', 'George Dantzig, en 1947', ['Cauchy, en 1847', 'Karmarkar, en 1984', 'Holland, en 1975'], 'Para planificación de la Fuerza Aérea de EE. UU.', 2],
    ['¿Por qué el recocido simulado acepta a veces soluciones peores?', 'Para escapar de mínimos locales', ['Por error', 'Para ahorrar memoria', 'Porque no conoce el objetivo'], 'La probabilidad disminuye con el tiempo.', 3],
    { tf: 'El método símplex siempre termina en un número polinomial de pasos.', v: false, e: 'Klee y Minty mostraron casos exponenciales, aunque en la práctica funciona muy bien.', l: 4 },
    { tf: 'El descenso por gradiente estocástico estima el gradiente con un lote pequeño de ejemplos.', v: true, e: 'Es mucho más barato que usar todos los datos.', l: 2 },
    { c: 'Escribe «mejorVertice(vertices, c)»: vertices es una lista de [x, y]; c = [cx, cy]. Devuelve el vértice que maximiza cx·x + cy·y (el primero si empatan).', f: 'mejorVertice', p: ['vertices', 'c'], t: [[[[[0, 0], [200, 0], [200, 33], [120, 60], [0, 60]], [20, 50]], [200, 33]], [[[[0, 0], [1, 1]], [1, 1]], [1, 1]]], sol: '  let mejor = vertices[0], v = -Infinity;\n  for (const p of vertices) { const z = c[0] * p[0] + c[1] * p[1]; if (z > v) { v = z; mejor = p; } }\n  return mejor;', l: 2 },
    { c: 'Escribe «gradiente(x0, eta, pasos)»: minimiza f(x) = (x − 3)² con descenso por gradiente desde x0 y devuelve x redondeado a 4 decimales.', f: 'gradiente', p: ['x0', 'eta', 'pasos'], t: [[[0, 0.1, 200], 3], [[10, 0.25, 100], 3]], sol: '  let x = x0;\n  for (let i = 0; i < pasos; i++) x -= eta * 2 * (x - 3);\n  return Math.round(x * 10000) / 10000;', l: 2 },
    { c: 'Escribe «factible(x, y)»: devuelve true si (x, y) cumple x + 3y ≤ 300, y ≤ 60, x ≤ 200, x ≥ 0, y ≥ 0.', f: 'factible', p: ['x', 'y'], t: [[[200, 33], true], [[200, 34], false], [[0, 61], false], [[-1, 0], false]], sol: '  return x + 3 * y <= 300 && y <= 60 && x <= 200 && x >= 0 && y >= 0;', l: 1 }
  ],
  gen: function (g) {
    var ti = [['Objetivo y restricciones lineales con variables continuas', 'Programación lineal'], ['Variables que deben ser enteras', 'Programación entera'], ['Minimizar una función en forma de cuenco sobre un conjunto convexo', 'Optimización convexa'], ['Entrenar una red neuronal con millones de parámetros', 'Optimización no convexa con gradiente'], ['Ruta de 10 000 entregas sin necesitar el óptimo exacto', 'Heurística o metaheurística']];
    ti.forEach(function (t) { g.mcq(3, '¿Qué tipo de problema o enfoque corresponde? ' + t[0], t[1], ['Programación lineal', 'Programación entera', 'Optimización convexa', 'Optimización no convexa con gradiente', 'Heurística o metaheurística'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Tipos de optimización.'); });
    g.times(8, function (R) { var cx = R.pick([10, 20, 30]), cy = R.pick([40, 50, 90]); var V = [[0, 0], [200, 0], [200, 33], [120, 60], [0, 60]]; var best = V[0], bv = -1; V.forEach(function (p) { var z = cx * p[0] + cy * p[1]; if (z > bv) { bv = z; best = p; } }); g.input(3, 'Con vértices (0,0), (200,0), (200,33), (120,60) y (0,60), ¿cuál es el valor máximo de ' + cx + 'x + ' + cy + 'y?', bv, 'Se evalúa el objetivo en cada vértice y se toma el mayor.'); });
    var pa = [['Elegir en cada paso lo mejor localmente', 'Voraz'], ['Intercambiar dos visitas de una ruta si mejora', 'Búsqueda local'], ['Aceptar empeorar con probabilidad decreciente', 'Recocido simulado'], ['Combinar y mutar una población de soluciones', 'Algoritmo genético']];
    pa.forEach(function (p) { g.mcq(2, '¿Qué heurística es? ' + p[0], p[1], ['Voraz', 'Búsqueda local', 'Recocido simulado', 'Algoritmo genético'].filter(function (x) { return x !== p[1]; }), 'Heurísticas y metaheurísticas.'); });
  },
  checks: [
    ['Formula como programa lineal un problema de asignación de recursos de tu entorno.', 'Definir variables, función objetivo lineal y restricciones lineales de capacidad o presupuesto.'],
    ['¿Por qué la programación entera es mucho más difícil que la lineal?', 'Porque la región factible deja de ser convexa y el problema es NP-difícil en general; se resuelve con ramificación y acotamiento.'],
    ['¿Qué significa que un problema sea convexo y por qué importa?', 'Que se minimiza una función convexa sobre un conjunto convexo; todo mínimo local es global y se resuelve de forma eficiente.'],
    ['Explica el descenso por gradiente y el papel de la tasa de aprendizaje.', 'Se avanza en dirección opuesta al gradiente; una tasa grande oscila o diverge y una pequeña avanza lento.']
  ],
  cites: ['Dantzig, G. (1951). Maximization of a Linear Function of Variables Subject to Linear Inequalities. En Koopmans (ed.), *Activity Analysis of Production and Allocation*. Wiley.', 'Karmarkar, N. (1984). A New Polynomial-Time Algorithm for Linear Programming. *Combinatorica*, 4(4).', 'Land, A. y Doig, A. (1960). An Automatic Method of Solving Discrete Programming Problems. *Econometrica*, 28(3).', 'Boyd, S. y Vandenberghe, L. (2004). *Convex Optimization*. Cambridge University Press.', 'Kirkpatrick, S., Gelatt, C. y Vecchi, M. (1983). Optimization by Simulated Annealing. *Science*, 220(4598).', 'Kingma, D. y Ba, J. (2014). Adam: A Method for Stochastic Optimization. arXiv:1412.6980.'],
  project: { t: 'Optimizar una decisión real',
    goal: 'Formular y resolver problemas de optimización con herramientas reales.',
    steps: ['Formula un problema de asignación o planificación de tu entorno como programa lineal o entero.', 'Resuélvelo con una biblioteca (por ejemplo, la de OR-Tools o la de programación lineal de SciPy) y analiza los precios sombra.', 'Compara con una heurística voraz y mide la diferencia.', 'Implementa descenso por gradiente para ajustar un modelo a datos y estudia el efecto de la tasa de aprendizaje.', 'Escribe una recomendación de decisión basada en los resultados.'],
    deliver: 'La formulación, el código, las comparaciones y la recomendación.' },
  hito: ['Formula la planificación de grúas de PatioApp como programa entero y resuélvela con un resolvedor, comparándola con la heurística voraz.', 'Calcula en PatioApp el precio sombra de los espacios y de las horas de grúa para decidir si conviene ampliar alguno.']
});
SDC.after('mat2.opt', 'mat2.numer');

S('mat2', 'mat2.info', { title: 'Teoría de la información, compresión y códigos',
  ask: '¿Qué concepto de teoría de la información se aplica?',
  lesson: `
> **La idea en simple.** Si un mensaje siempre dice lo mismo, no informa nada: ya sabías lo que iba a decir. Un mensaje informa en la medida en que **sorprende**. Claude Shannon convirtió esa intuición en matemática en 1948, y con ella respondió dos preguntas fundamentales: ¿cuánto se puede comprimir un mensaje? y ¿qué tan rápido se puede transmitir sin errores por un canal ruidoso? Cada archivo ZIP, cada llamada por celular y cada código QR usan sus respuestas.

## Shannon y el nacimiento de la teoría de la información
Claude Shannon, ingeniero y matemático de los Laboratorios Bell, publicó en 1948 *A Mathematical Theory of Communication*, considerado el documento fundacional de la era digital. Ya en su tesis de maestría de 1937 había mostrado que el álgebra de Boole describe los circuitos de relés, la base del diseño digital. En el artículo de 1948 introdujo el **bit** como unidad de información (el término lo sugirió John Tukey), definió la **entropía** y demostró los teoremas de codificación de la fuente y del canal. Su modelo de la comunicación (fuente, codificador, canal con ruido, decodificador, destino) sigue siendo la forma de pensar cualquier sistema de transmisión.

## Información y entropía
La **información** de un evento de probabilidad p es −log₂ p bits: un evento seguro (p = 1) aporta 0 bits; lanzar una moneda justa, 1 bit; adivinar un número entre 1 y 8, 3 bits; un evento con probabilidad 1/1024, 10 bits. Cuanto menos probable, más información.

La **entropía** de una fuente es la información **promedio** de sus símbolos:
H = −Σ pᵢ log₂ pᵢ
Mide la incertidumbre: es máxima cuando todos los símbolos son igualmente probables (para n símbolos, log₂ n bits) y es cero cuando uno es seguro. Por ejemplo, si las unidades que llegan al patio son 70 % autos, 20 % camionetas y 10 % camiones, la entropía es −(0,7 log₂ 0,7 + 0,2 log₂ 0,2 + 0,1 log₂ 0,1) ≈ 1,16 bits por unidad, menos que los log₂ 3 ≈ 1,58 bits de tres tipos igualmente probables.
~~~js
const entropia = ps => -ps.filter(p => p > 0).reduce((s, p) => s + p * Math.log2(p), 0);
console.log('moneda justa:', entropia([0.5, 0.5]));
console.log('moneda cargada 90/10:', entropia([0.9, 0.1]).toFixed(3));
console.log('tipos de unidad 70/20/10:', entropia([0.7, 0.2, 0.1]).toFixed(3));
console.log('texto en español (letras equiprobables, 27):', Math.log2(27).toFixed(3), '(el real es mucho menor)');
~~~

## El teorema de codificación de la fuente: el límite de la compresión
Shannon demostró que **ningún** código sin pérdida puede usar, en promedio, menos bits por símbolo que la entropía de la fuente, y que se puede acercar tanto como se quiera a ese límite. La entropía es, literalmente, el límite de la compresión. Por eso un archivo ya comprimido, o un archivo cifrado (que parece aleatorio y tiene entropía máxima), no se puede comprimir más: si un programa prometiera comprimir **cualquier** archivo, contradiría el principio del palomar (hay más archivos de n bits que archivos más cortos).

## Codificación de Huffman
David Huffman, estudiante de doctorado del MIT, inventó en 1952 (como trabajo final de un curso de Robert Fano, que había ofrecido eximir del examen a quien lo resolviera) el algoritmo que construye el **código de prefijo óptimo** para un conjunto de símbolos con probabilidades conocidas:
1. Poner cada símbolo como una hoja con su frecuencia.
2. Repetidamente, unir los dos nodos de menor frecuencia en un nodo nuevo cuya frecuencia es la suma.
3. Al final queda un árbol; el código de cada símbolo es el camino desde la raíz (0 a la izquierda, 1 a la derecha).
Los símbolos frecuentes reciben códigos cortos y los raros, largos, como en el código Morse (la E, la letra más común del inglés, es un solo punto). Un **código de prefijo** (ningún código es prefijo de otro) se decodifica sin ambigüedad sin separadores. Huffman se usa dentro de DEFLATE (ZIP, gzip, PNG) y de JPEG y MP3.

## Compresión en la práctica
- **Sin pérdida:** se recupera exactamente el original. Combina dos ideas: eliminar **repeticiones** (los algoritmos de diccionario de Abraham Lempel y Jacob Ziv, LZ77 y LZ78, de 1977 y 1978, reemplazan secuencias repetidas por referencias a apariciones anteriores) y codificar los símbolos según su frecuencia (Huffman o la **codificación aritmética**, que se acerca aún más a la entropía). DEFLATE (1993) combina LZ77 y Huffman; formatos modernos como zstd (Facebook, 2016) y Brotli (Google, 2013) logran mejor compresión o mayor velocidad.
- **Con pérdida:** se descarta información que los sentidos humanos casi no perciben. JPEG (1992) usa la transformada discreta del coseno y descarta las altas frecuencias; MP3 y AAC usan modelos psicoacústicos que eliminan sonidos enmascarados por otros. Se logran compresiones de 10 a 1 o más con diferencias poco perceptibles.

## Canales con ruido y capacidad
Todo canal real tiene **ruido**: interferencias en el cable, rayones en un disco, radiación cósmica que invierte bits en la memoria. Shannon definió la **capacidad** de un canal como la máxima cantidad de información por uso que puede transmitir de forma confiable, y demostró el resultado más sorprendente de su artículo, el **teorema de codificación del canal**: mientras se transmita por debajo de la capacidad, existen códigos que hacen la probabilidad de error **tan pequeña como se quiera**. Antes de Shannon se creía que para reducir los errores había que reducir indefinidamente la velocidad.

La fórmula de **Shannon-Hartley** da la capacidad de un canal con ancho de banda B y relación señal/ruido S/N: C = B log₂(1 + S/N). Un canal telefónico de 3000 Hz con S/N de 1000 (30 dB) tiene una capacidad de unos 30 000 bits por segundo, el límite que alcanzaron los últimos módems telefónicos.

## Códigos correctores de errores
Para acercarse a la capacidad, se agrega **redundancia** de forma inteligente.
- **Código de repetición:** enviar cada bit tres veces y decidir por mayoría. Corrige un error por cada tres bits, pero triplica el tamaño.
- **Bit de paridad:** detecta un número impar de errores, pero no corrige.
- **Código de Hamming(7,4)** (Richard Hamming, Laboratorios Bell, 1950): agrega 3 bits de paridad a cada 4 bits de datos, cada uno calculado sobre una combinación distinta de posiciones, de modo que el patrón de paridades fallidas (el **síndrome**) señala **la posición exacta** del bit erróneo. Corrige cualquier error de un bit con solo 75 % más de bits. Hamming lo inventó, cuenta, frustrado porque la computadora de relés de los laboratorios detenía sus trabajos de fin de semana cada vez que detectaba un error. Las memorias **ECC** de los servidores usan códigos de este tipo.
- La **distancia de Hamming** entre dos palabras es el número de posiciones en que difieren. Un código con distancia mínima d detecta hasta d − 1 errores y corrige hasta ⌊(d − 1)/2⌋.
- Códigos modernos: **Reed-Solomon** (que viste en estructuras algebraicas), los **turbo códigos** (Berrou, Glavieux y Thitimajshima, 1993) y los **códigos LDPC** (Robert Gallager, 1960, redescubiertos en los noventa) se acercan mucho al límite de Shannon y se usan en Wi-Fi, 4G, 5G y la televisión digital; los **códigos polares** (Erdal Arıkan, 2009) fueron los primeros en alcanzarlo demostrablemente y están en 5G.

## Otras ideas de la teoría de la información
- **Entropía cruzada y divergencia de Kullback-Leibler:** miden qué tan distinta es una distribución de otra; la entropía cruzada es la función de pérdida estándar para entrenar clasificadores, incluidos los modelos de lenguaje.
- **Información mutua:** cuánto reduce conocer una variable la incertidumbre sobre otra; se usa para seleccionar características en aprendizaje automático.
- **Seguridad perfecta:** Shannon demostró en 1949 que el cifrado de **libreta de un solo uso** (una clave aleatoria tan larga como el mensaje, usada una sola vez) es imposible de romper, y que ningún cifrado con claves más cortas puede serlo en sentido absoluto.
- **Entropía de contraseñas:** una contraseña de 8 caracteres elegidos al azar entre 94 símbolos tiene log₂(94⁸) ≈ 52 bits; una frase de 4 palabras elegidas al azar entre 7776 (el método Diceware) tiene unos 52 bits también, y es mucho más fácil de recordar. Las contraseñas elegidas por personas tienen mucha menos entropía de la que aparentan.

## Ejemplo resuelto: comprimir los registros de PatioApp
Cada sede envía cada noche el registro de movimientos del día: 30 000 líneas de texto, unos 4 MB.
1. **Diagnóstico de entropía:** los campos repiten mucho (las mismas placas, los mismos tipos de evento, fechas casi iguales). Medida sobre los bytes, la entropía es de unos 2,1 bits por carácter frente a los 8 que ocupa cada uno: hay mucho margen.
2. **Compresión sin pérdida** con zstd: el archivo pasa de 4 MB a 380 KB (más de 10 a 1), en menos de un segundo.
3. **Mejorar la fuente:** reemplazar los textos de tipo de evento ("INGRESO_REGISTRADO") por códigos cortos y ordenar las líneas por placa aumenta las repeticiones cercanas y baja el archivo comprimido a 250 KB.
4. **Integridad:** se agrega un CRC-32 al archivo para detectar corrupción en la transmisión y se reenvía si falla.
5. **Fotos:** se comprimen con pérdida (JPEG de calidad 80 o WebP), que reduce cada foto de 3 MB a unos 400 KB sin que los daños de la unidad dejen de verse.`,
  links: [['m2.alg', 'Reed-Solomon y CRC se basan en campos finitos'], ['mat2.prob', 'la entropía se define a partir de distribuciones de probabilidad'], ['red.link', 'la capa de enlace detecta y corrige errores de transmisión']],
  read: 'Shannon (1948); Cover y Thomas, *Elements of Information Theory* (2.ª ed., 2006); MacKay, *Information Theory, Inference, and Learning Algorithms* (2003, libre en línea); Gleick, *La información* (2011).',
  terms: [
    ['Bit de información', 'cantidad de información de un evento con probabilidad 1/2', ['Lanzar una moneda justa.', 'Shannon, 1948.', 'Término sugerido por Tukey.']],
    ['Entropía', 'información promedio por símbolo de una fuente: −Σ p log₂ p', ['Máxima con símbolos equiprobables.', 'Límite de la compresión.', 'Mide la incertidumbre.']],
    ['Código de prefijo', 'código en el que ningún código es prefijo de otro', ['Se decodifica sin separadores.', 'Huffman produce uno óptimo.', 'Morse no lo es.']],
    ['Codificación de Huffman', 'algoritmo que construye el código de prefijo óptimo uniendo los dos símbolos menos frecuentes', ['Huffman, 1952.', 'Dentro de ZIP y JPEG.', 'Códigos cortos para lo frecuente.']],
    ['Compresión con pérdida', 'compresión que descarta información poco perceptible y no recupera el original exacto', ['JPEG.', 'MP3.', 'Grandes tasas de compresión.']],
    ['Capacidad de un canal', 'máxima información por uso que un canal transmite con error arbitrariamente pequeño', ['Teorema de Shannon.', 'C = B log₂(1 + S/N).', 'Límite físico.']],
    ['Código de Hamming', 'código corrector que localiza un bit erróneo con bits de paridad sobre posiciones combinadas', ['Hamming(7,4).', 'Síndrome.', 'Memorias ECC.']],
    ['Distancia de Hamming', 'número de posiciones en que difieren dos palabras de igual longitud', ['Distancia mínima d.', 'Detecta d − 1 errores.', 'Corrige ⌊(d − 1)/2⌋.']]
  ],
  q: [
    ['¿Cuántos bits de información aporta un evento de probabilidad 1/8?', '3', ['8', '1', '0,125'], '−log₂(1/8) = 3.', 2],
    ['¿Cuál es la entropía de una moneda justa?', '1 bit', ['0 bits', '2 bits', '0,5 bits'], 'Dos resultados equiprobables.', 1],
    ['¿Por qué no se puede comprimir un archivo cifrado?', 'Porque parece aleatorio y su entropía ya es máxima', ['Porque está prohibido', 'Porque es binario', 'Sí se puede comprimir mucho'], 'La entropía es el límite.', 3],
    ['¿Qué hace el algoritmo de Huffman en cada paso?', 'Une los dos nodos de menor frecuencia', ['Une los dos de mayor frecuencia', 'Ordena alfabéticamente', 'Elimina los símbolos raros'], 'Construye el árbol de abajo hacia arriba.', 2],
    ['¿Qué demostró el teorema de codificación del canal?', 'Que por debajo de la capacidad se puede transmitir con error tan pequeño como se quiera', ['Que todo canal pierde datos siempre', 'Que hay que reducir la velocidad a cero', 'Que el ruido no existe'], 'Shannon, 1948.', 3],
    ['Un código tiene distancia mínima 5. ¿Cuántos errores puede corregir?', '2', ['5', '4', '1'], '⌊(d − 1)/2⌋.', 3],
    ['¿Cuál es la capacidad aproximada de un canal de 3000 Hz con S/N = 1000?', 'Unos 30 000 bits por segundo', ['3000 bits por segundo', '1 millón de bits por segundo', '1000 bits por segundo'], '3000 × log₂(1001) ≈ 29 900.', 4],
    { tf: 'Es posible un programa que comprima cualquier archivo sin pérdida.', v: false, e: 'Contradice el principio del palomar: hay más archivos de n bits que más cortos.', l: 2 },
    { tf: 'El código Hamming(7,4) corrige cualquier error de un bit en cada bloque de 7.', v: true, e: 'El síndrome señala la posición del error.', l: 2 },
    { c: 'Escribe «entropia(ps)»: entropía en bits de una lista de probabilidades, redondeada a 3 decimales (ignora las probabilidades 0).', f: 'entropia', p: ['ps'], t: [[[[0.5, 0.5]], 1], [[[0.7, 0.2, 0.1]], 1.157], [[[1]], 0], [[[0.25, 0.25, 0.25, 0.25]], 2]], sol: '  return Math.round(-ps.filter(p => p > 0).reduce((s, p) => s + p * Math.log2(p), 0) * 1000) / 1000;', l: 2 },
    { c: 'Escribe «distanciaHamming(a, b)»: número de posiciones en que difieren dos textos de igual longitud.', f: 'distanciaHamming', p: ['a', 'b'], t: [[['1011101', '1001001'], 2], [['abc', 'abc'], 0]], sol: '  let d = 0;\n  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;\n  return d;', l: 1 },
    { c: 'Escribe «largoHuffman(frecs)»: frecs es una lista de frecuencias; devuelve el total de bits que ocupa el mensaje codificado con Huffman (suma de frecuencia × longitud del código), sumando los costos de cada unión.', f: 'largoHuffman', p: ['frecs'], t: [[[[5, 9, 12, 13, 16, 45]], 224], [[[1, 1]], 2], [[[10]], 0]], sol: '  const h = [...frecs];\n  let total = 0;\n  while (h.length > 1) { h.sort((a, b) => a - b); const s = h.shift() + h.shift(); total += s; h.push(s); }\n  return total;', h: 'La suma de los pesos de los nodos internos creados es igual al largo total del mensaje codificado.', l: 4 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var k = R.int(1, 12); g.input(2, '¿Cuántos bits de información aporta un evento de probabilidad 1/' + Math.pow(2, k) + '?', k, '−log₂ p.'); });
    g.times(6, function (R) { var n = R.pick([2, 4, 8, 16, 32, 64, 256]); g.input(2, '¿Cuál es la entropía en bits de una fuente con ' + n + ' símbolos igualmente probables?', Math.log2(n), 'log₂ n.'); });
    var co = [['ZIP y gzip', 'Sin pérdida (LZ77 + Huffman)'], ['Fotos JPEG', 'Con pérdida (transformada del coseno)'], ['Canciones MP3', 'Con pérdida (modelo psicoacústico)'], ['Imágenes PNG', 'Sin pérdida (LZ77 + Huffman)']];
    co.forEach(function (c) { g.mcq(2, '¿Qué tipo de compresión usa? ' + c[0], c[1], ['Sin pérdida (LZ77 + Huffman)', 'Con pérdida (transformada del coseno)', 'Con pérdida (modelo psicoacústico)', 'Ninguna'].filter(function (x) { return x !== c[1]; }), 'Compresión con y sin pérdida.'); });
    g.times(4, function (R) { var d = R.int(2, 9); g.input(3, 'Un código tiene distancia mínima ' + d + '. ¿Cuántos errores puede corregir?', Math.floor((d - 1) / 2), '⌊(d − 1)/2⌋.'); });
  },
  checks: [
    ['Define la entropía y explica por qué es el límite de la compresión.', 'Es la información promedio por símbolo; Shannon demostró que ningún código sin pérdida usa menos bits en promedio.'],
    ['Describe el algoritmo de Huffman con un ejemplo de tres símbolos.', 'Se unen repetidamente los dos menos frecuentes; con 70/20/10, el de 70 recibe código de 1 bit y los otros de 2.'],
    ['¿Qué dice el teorema de codificación del canal y por qué fue sorprendente?', 'Que bajo la capacidad se puede transmitir con error arbitrariamente pequeño; antes se creía que había que reducir la velocidad sin límite.'],
    ['¿Cómo corrige un error el código de Hamming(7,4)?', 'Los tres bits de paridad cubren combinaciones distintas de posiciones; el patrón de paridades fallidas indica la posición del bit erróneo.']
  ],
  cites: ['Shannon, C. E. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal*, 27(3 y 4).', 'Huffman, D. (1952). A Method for the Construction of Minimum-Redundancy Codes. *Proceedings of the IRE*, 40(9).', 'Hamming, R. (1950). Error Detecting and Error Correcting Codes. *Bell System Technical Journal*, 29(2).', 'Ziv, J. y Lempel, A. (1977). A Universal Algorithm for Sequential Data Compression. *IEEE Transactions on Information Theory*, 23(3).', 'Cover, T. y Thomas, J. (2006). *Elements of Information Theory* (2.ª ed.). Wiley.', 'Arıkan, E. (2009). Channel Polarization. *IEEE Transactions on Information Theory*, 55(7).'],
  project: { t: 'Compresor y corrector propios',
    goal: 'Implementar compresión y corrección de errores y compararlas con los límites teóricos.',
    steps: ['Calcula la entropía por carácter de varios textos (español, código fuente, un archivo comprimido).', 'Implementa la codificación y decodificación de Huffman y compara el tamaño obtenido con la entropía.', 'Compara con gzip y zstd sobre los mismos archivos.', 'Implementa Hamming(7,4): codifica, introduce un error aleatorio por bloque y corrígelo.', 'Escribe un informe que explique los resultados con la teoría de Shannon.'],
    deliver: 'El código, las mediciones y el informe.' },
  hito: ['Mide la entropía de los registros nocturnos de PatioApp y comprímelos con zstd, ajustando el formato para mejorar la compresión.', 'Agrega a PatioApp la compresión con pérdida de las fotos con un tamaño objetivo y verifica que los daños sigan siendo visibles.']
});
SDC.after('mat2.info', 'mat2.stat');
})();
