(function () {
var S = SDC.S;

S('m4', 'm4.sp', { title: 'Caminos mínimos y árboles de expansión',
  ask: '¿Qué algoritmo de caminos mínimos o de árboles de expansión se aplica?',
  lesson: `
> **La idea en simple.** Una aplicación de mapas encuentra en milisegundos la ruta más rápida entre dos puntos de una ciudad con cientos de miles de calles. Una empresa de telecomunicaciones decide cómo cablear decenas de edificios con el menor costo. Ambos son problemas de grafos con pesos, y los algoritmos que los resuelven son de los más elegantes e importantes de la computación.

## Grafos con pesos
En un grafo **ponderado**, cada arista tiene un peso: distancia, tiempo, costo. El **camino mínimo** entre dos vértices es el de menor peso total. Cuando todos los pesos son iguales, la búsqueda en anchura (BFS) basta; con pesos distintos hace falta algo más.

## El algoritmo de Dijkstra
Edsger Dijkstra lo ideó en 1956, en unos veinte minutos, mientras tomaba café con su prometida en una terraza de Ámsterdam, y lo publicó en 1959. Encuentra los caminos mínimos desde un origen a todos los demás vértices cuando **los pesos no son negativos**:
1. Asignar distancia 0 al origen e infinito a los demás.
2. Repetir: tomar el vértice **no visitado con menor distancia** conocida y marcarlo como visitado (su distancia ya es definitiva).
3. Para cada vecino, si llegar a través de este vértice es más corto que lo conocido, actualizar su distancia y recordar desde dónde se llegó (**relajar** la arista).
La clave es el paso 2: como los pesos no son negativos, ningún camino que pase por vértices aún no visitados puede mejorar la distancia del vértice más cercano. Con una **cola de prioridad** (montículo) para elegir el más cercano, el costo es **O((V + E) log V)**.
~~~js
function dijkstra(grafo, origen) {
  const dist = {}, previo = {}, visitado = new Set();
  for (const v in grafo) dist[v] = Infinity;
  dist[origen] = 0;
  const cola = [[0, origen]];                                   // [distancia, vértice]; un montículo en producción
  while (cola.length) {
    cola.sort((a, b) => a[0] - b[0]);
    const [d, u] = cola.shift();
    if (visitado.has(u)) continue;
    visitado.add(u);
    for (const [v, peso] of grafo[u]) if (d + peso < dist[v]) { dist[v] = d + peso; previo[v] = u; cola.push([dist[v], v]); }
  }
  return { dist, previo };
}
// Tiempos de traslado en minutos entre sedes de PatioApp
const sedes = {
  Callao: [['Ate', 50], ['Surco', 35], ['Ventanilla', 25]], Ate: [['Callao', 50], ['Surco', 20], ['Lurín', 45], ['Chosica', 40]],
  Surco: [['Callao', 35], ['Ate', 20], ['Lurín', 30]], 'Lurín': [['Ate', 45], ['Surco', 30]], Chosica: [['Ate', 40]], Ventanilla: [['Callao', 25]]
};
const { dist, previo } = dijkstra(sedes, 'Ventanilla');
const ruta = []; for (let s = 'Lurín'; s; s = previo[s]) ruta.unshift(s);
console.log(ruta.join(' → '), '=', dist['Lurín'], 'min');    // Ventanilla → Callao → Surco → Lurín = 90 min
~~~
(Para no alargar el ejemplo, la cola se ordena en cada paso; con un montículo real, como el de la unidad anterior, el algoritmo escala a millones de vértices.)

## Pesos negativos: Bellman-Ford
Si hay aristas con peso **negativo** (por ejemplo, un descuento por llevar una unidad de vuelta), Dijkstra puede fallar. El algoritmo de **Bellman-Ford** (Richard Bellman, 1958; Lester Ford, 1956) relaja **todas** las aristas V − 1 veces, en O(V · E). Además detecta **ciclos negativos** (un ciclo cuyo peso total es negativo, que permitiría bajar el costo indefinidamente): si después de V − 1 rondas alguna arista todavía se puede relajar, hay un ciclo negativo. En finanzas, un ciclo negativo en un grafo de tipos de cambio (usando logaritmos) es una oportunidad de **arbitraje**. Los protocolos de enrutamiento por vector de distancias, como RIP, que viste en Redes, son una versión distribuida de Bellman-Ford.

## Todos contra todos: Floyd-Warshall
Para conocer los caminos mínimos entre **todos los pares** de vértices, el algoritmo de **Floyd-Warshall** (Robert Floyd, 1962, basado en Stephen Warshall) usa programación dinámica: para cada vértice k, verifica si pasar por k mejora el camino entre cada par (i, j). Son tres bucles anidados: **O(V³)**, ideal para grafos pequeños y densos, como una tabla de tiempos entre las 20 sedes de una empresa.

## A*: buscar con una pista
En mapas y videojuegos, se busca el camino a **un** destino concreto. El algoritmo **A*** (Peter Hart, Nils Nilsson y Bertram Raphael, 1968, para el robot Shakey del Stanford Research Institute) es Dijkstra con una **heurística**: en lugar de elegir el vértice con menor distancia desde el origen, elige el de menor "distancia desde el origen + estimación de lo que falta". Si la estimación nunca sobreestima (por ejemplo, la distancia en línea recta), A* sigue encontrando el camino óptimo, pero explora muchos menos vértices porque se dirige hacia el destino. Los servicios de mapas usan además técnicas de preprocesamiento (como las **jerarquías de contracción**, de Robert Geisberger y otros, 2008) que permiten responder rutas continentales en milisegundos.

## Árboles de expansión mínima
Otro problema: conectar **todos** los vértices con el menor costo total, sin necesidad de que los caminos sean cortos (cablear sedes, tender tuberías, diseñar una red eléctrica). La solución es un **árbol de expansión mínima** (MST): un árbol que incluye todos los vértices y cuya suma de pesos es mínima. Dos algoritmos voraces clásicos lo encuentran, y ambos son correctos gracias a la **propiedad del corte**: para cualquier división de los vértices en dos grupos, la arista más liviana que cruza entre ellos pertenece a algún MST.
- **Kruskal** (Joseph Kruskal, 1956): ordenar las aristas de menor a mayor peso y agregar cada una si **no forma un ciclo** con las ya elegidas. Para detectar ciclos rápido se usa la estructura **unión-búsqueda** (*union-find*): cada vértice apunta a un representante de su componente; dos vértices están conectados si tienen el mismo representante. Con las mejoras de **compresión de caminos** y **unión por rango**, cada operación cuesta casi O(1) (Tarjan demostró en 1975 que el costo es la inversa de la función de Ackermann, menor que 5 para cualquier tamaño práctico). Kruskal cuesta O(E log E) por el ordenamiento.
- **Prim** (Vojtěch Jarník, 1930; Robert Prim, 1957; redescubierto por Dijkstra en 1959): crecer el árbol desde un vértice, agregando siempre la arista más liviana que conecta el árbol con un vértice nuevo. Con un montículo, O(E log V).
El primer algoritmo de MST lo publicó Otakar Borůvka en 1926, para diseñar la red eléctrica de Moravia.
~~~js
function kruskal(n, aristas) {                              // vértices 0..n-1, aristas [u, v, peso]
  const padre = Array.from({ length: n }, (_, i) => i);
  const raiz = x => (padre[x] === x ? x : (padre[x] = raiz(padre[x])));   // con compresión de caminos
  let costo = 0; const elegidas = [];
  for (const [u, v, w] of [...aristas].sort((a, b) => a[2] - b[2])) {
    const ru = raiz(u), rv = raiz(v);
    if (ru !== rv) { padre[ru] = rv; costo += w; elegidas.push([u, v]); }
  }
  return { costo, elegidas };
}
// Costo (en miles de soles) de tender fibra entre 5 sedes
console.log(kruskal(5, [[0, 1, 8], [0, 2, 5], [1, 2, 3], [1, 3, 7], [2, 3, 9], [3, 4, 4], [2, 4, 12]]));
~~~

## Ejemplo resuelto: traslados y red de PatioApp
1. **Ruta más rápida de una grúa** de Ventanilla a Lurín: Dijkstra sobre los tiempos de traslado da Ventanilla → Callao → Surco → Lurín en 90 minutos. La ruta con menos tramos (BFS) también tiene 3 tramos, pero por Ate tardaría 120 minutos: con pesos, la elección cambia.
2. **Hora punta:** los tiempos cambian según la hora; se recalcula con los tiempos de cada franja. Como Dijkstra con montículo es O((V + E) log V), recalcular para 20 sedes es instantáneo.
3. **Red privada entre sedes:** conectar las 5 sedes con fibra al menor costo. Kruskal elige las aristas de 3, 4, 5 y 7 mil soles: 19 mil soles, frente a los 37 mil de conectar todas en estrella desde la sede central.
4. **Advertencia:** un árbol de expansión mínima no tiene redundancia: si se corta un tramo, una parte de la red queda aislada. Por eso, para la red real, se agrega a propósito una arista más (la de 8 mil) para formar un ciclo de respaldo. El algoritmo da el óptimo del modelo; el ingeniero decide si el modelo captura todo lo que importa.`,
  links: [['m4.graphs', 'BFS y DFS son la base de estos algoritmos'], ['m4.heap', 'Dijkstra y Prim usan colas de prioridad'], ['red.route', 'los protocolos de enrutamiento aplican Dijkstra y Bellman-Ford']],
  read: 'Cormen y otros, *Introduction to Algorithms* (4.ª ed.), capítulos 21 a 23; Sedgewick y Wayne, *Algorithms* (4.ª ed.), capítulo 4; Dijkstra (1959).',
  terms: [
    ['Camino mínimo', 'camino entre dos vértices con la menor suma de pesos', ['Ruta más rápida.', 'Distinto del de menos tramos.', 'Dijkstra.']],
    ['Algoritmo de Dijkstra', 'algoritmo de caminos mínimos desde un origen con pesos no negativos, que fija en cada paso el vértice más cercano', ['Dijkstra, 1959.', 'O((V + E) log V) con montículo.', 'OSPF lo usa.']],
    ['Relajar una arista', 'actualizar la distancia de un vértice si llegar por esa arista es más corto', ['dist[u] + peso < dist[v].', 'Operación básica.', 'Dijkstra y Bellman-Ford.']],
    ['Algoritmo de Bellman-Ford', 'algoritmo de caminos mínimos que admite pesos negativos y detecta ciclos negativos', ['O(V · E).', 'RIP.', 'Arbitraje.']],
    ['Algoritmo A*', 'búsqueda de camino mínimo guiada por una heurística que estima la distancia restante', ['Hart, Nilsson y Raphael, 1968.', 'Mapas y videojuegos.', 'Óptimo si no sobreestima.']],
    ['Árbol de expansión mínima', 'árbol que conecta todos los vértices con la menor suma de pesos', ['Kruskal y Prim.', 'Cablear sedes.', 'Sin redundancia.']],
    ['Unión-búsqueda', 'estructura que mantiene componentes disjuntas con operaciones casi constantes de unir y buscar', ['Union-find.', 'Compresión de caminos.', 'Detecta ciclos en Kruskal.']],
    ['Propiedad del corte', 'la arista más liviana que cruza un corte del grafo pertenece a algún árbol de expansión mínima', ['Justifica a Kruskal y Prim.', 'Base de los voraces.', 'Teorema clave.']]
  ],
  q: [
    ['¿Cuándo puede fallar el algoritmo de Dijkstra?', 'Cuando hay aristas con peso negativo', ['Cuando el grafo es grande', 'Cuando hay ciclos', 'Nunca'], 'Para pesos negativos: Bellman-Ford.', 2],
    ['¿Qué estructura hace eficiente a Dijkstra?', 'Una cola de prioridad (montículo)', ['Una pila', 'Una lista enlazada', 'Una tabla hash'], 'Para elegir el vértice más cercano.', 2],
    ['¿Qué detecta Bellman-Ford que Dijkstra no?', 'Ciclos de peso negativo', ['Ciclos de cualquier peso', 'Vértices aislados', 'Aristas duplicadas'], 'Si tras V − 1 rondas aún se puede relajar.', 3],
    ['Para tener los caminos mínimos entre todos los pares de 20 sedes, ¿qué algoritmo es natural?', 'Floyd-Warshall', ['BFS', 'Kruskal', 'Heapsort'], 'O(V³) con programación dinámica.', 3],
    ['¿Qué hace A* para explorar menos que Dijkstra?', 'Usa una heurística que estima la distancia restante al destino', ['Ignora los pesos', 'Usa recursión', 'Explora al azar'], 'Si no sobreestima, sigue siendo óptimo.', 3],
    ['En Kruskal, ¿por qué se descarta una arista?', 'Porque une dos vértices que ya están en la misma componente (formaría un ciclo)', ['Porque es la más liviana', 'Porque es la más pesada', 'Al azar'], 'Se detecta con unión-búsqueda.', 3],
    ['¿Qué desventaja práctica tiene una red diseñada como árbol de expansión mínima?', 'No tiene redundancia: un corte aísla una parte', ['Es la más cara', 'No conecta todos los vértices', 'Tiene ciclos'], 'Se agregan aristas de respaldo a propósito.', 4],
    { tf: 'La ruta con menos tramos siempre es la más rápida.', v: false, e: 'Con pesos distintos, una ruta con los mismos o más tramos puede ser más rápida.', l: 1 },
    { tf: 'Kruskal y Prim son algoritmos voraces que encuentran un árbol de expansión mínima.', v: true, e: 'Su corrección se basa en la propiedad del corte.', l: 2 },
    { c: 'Escribe «dijkstraDist(grafo, origen, destino)»: grafo es {v: [[w, peso], ...]}; devuelve la distancia mínima del origen al destino (Infinity si no hay camino).', f: 'dijkstraDist', p: ['grafo', 'origen', 'destino'], t: [[[{ A: [['B', 4], ['C', 1]], C: [['B', 2]], B: [] }, 'A', 'B'], 3], [[{ A: [['B', 7]], B: [] }, 'A', 'B'], 7], [[{ A: [], B: [] }, 'A', 'A'], 0]], sol: '  const dist = { [origen]: 0 }, hecho = new Set();\n  while (true) {\n    let u = null;\n    for (const v in dist) if (!hecho.has(v) && (u === null || dist[v] < dist[u])) u = v;\n    if (u === null) break;\n    if (u === destino) return dist[u];\n    hecho.add(u);\n    for (const [w, p] of grafo[u] || []) if (!(w in dist) || dist[u] + p < dist[w]) dist[w] = dist[u] + p;\n  }\n  return dist[destino] === undefined ? Infinity : dist[destino];', l: 4 },
    { c: 'Escribe «costoMST(n, aristas)»: costo total del árbol de expansión mínima con Kruskal (vértices 0..n−1, aristas [u, v, peso]).', f: 'costoMST', p: ['n', 'aristas'], t: [[[5, [[0, 1, 8], [0, 2, 5], [1, 2, 3], [1, 3, 7], [2, 3, 9], [3, 4, 4], [2, 4, 12]]], 19], [[2, [[0, 1, 6]]], 6], [[1, []], 0]], sol: '  const p = Array.from({ length: n }, (_, i) => i);\n  const r = x => (p[x] === x ? x : (p[x] = r(p[x])));\n  let c = 0;\n  for (const [u, v, w] of [...aristas].sort((a, b) => a[2] - b[2])) { const a = r(u), b = r(v); if (a !== b) { p[a] = b; c += w; } }\n  return c;', l: 3 },
    { c: 'Escribe «componentes(n, aristas)»: número de componentes conexas con unión-búsqueda.', f: 'componentes', p: ['n', 'aristas'], t: [[[5, [[0, 1], [1, 2], [3, 4]]], 2], [[3, []], 3], [[4, [[0, 1], [2, 3], [1, 2]]], 1]], sol: '  const p = Array.from({ length: n }, (_, i) => i);\n  const r = x => (p[x] === x ? x : (p[x] = r(p[x])));\n  let c = n;\n  for (const [u, v] of aristas) { const a = r(u), b = r(v); if (a !== b) { p[a] = b; c--; } }\n  return c;', l: 2 }
  ],
  gen: function (g) {
    var al = [['Ruta más rápida desde una sede a todas, con tiempos positivos', 'Dijkstra'], ['Caminos mínimos con algunos pesos negativos', 'Bellman-Ford'], ['Tabla de tiempos entre todos los pares de 20 sedes', 'Floyd-Warshall'], ['Ruta en un mapa hacia un destino, con distancia en línea recta como pista', 'A*'], ['Conectar todas las sedes con el menor costo de fibra', 'Kruskal'], ['Ruta con menos tramos cuando todos cuentan igual', 'BFS']];
    al.forEach(function (a) { g.mcq(3, '¿Qué algoritmo conviene? ' + a[0], a[1], ['Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'A*', 'Kruskal', 'BFS'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Algoritmos de caminos y árboles.'); });
    var co = [['Dijkstra con montículo', 'O((V + E) log V)'], ['Bellman-Ford', 'O(V · E)'], ['Floyd-Warshall', 'O(V³)'], ['Kruskal', 'O(E log E)']];
    co.forEach(function (c) { g.mcq(2, '¿Qué costo tiene ' + c[0] + '?', c[1], ['O((V + E) log V)', 'O(V · E)', 'O(V³)', 'O(E log E)'].filter(function (x) { return x !== c[1]; }), 'Complejidad de los algoritmos de grafos.'); });
    g.times(6, function (R) { var a = R.int(5, 40), b = R.int(5, 40), c = R.int(20, 90); var d = Math.min(a + b, c); g.input(2, 'De X a Y hay una arista directa de ' + c + ' minutos, y un camino por Z de ' + a + ' + ' + b + ' minutos. ¿Cuál es la distancia mínima de X a Y?', d, 'Se toma el menor de los dos caminos.'); });
  },
  checks: [
    ['Explica cómo funciona Dijkstra y por qué necesita pesos no negativos.', 'Fija en cada paso el vértice no visitado más cercano y relaja sus aristas; con pesos negativos, un camino posterior podría mejorar una distancia ya fijada.'],
    ['¿Cuándo usarías Bellman-Ford, Floyd-Warshall y A*?', 'Bellman-Ford con pesos negativos; Floyd-Warshall para todos los pares en grafos pequeños; A* hacia un destino con una buena heurística.'],
    ['Describe el algoritmo de Kruskal y la estructura que lo hace eficiente.', 'Ordena aristas por peso y agrega las que no forman ciclo; la unión-búsqueda detecta ciclos casi en O(1).'],
    ['¿Qué diferencia hay entre un camino mínimo y un árbol de expansión mínima?', 'El camino mínimo minimiza el costo entre dos vértices; el árbol de expansión mínima minimiza el costo total de conectar todos.']
  ],
  cites: ['Dijkstra, E. W. (1959). A Note on Two Problems in Connexion with Graphs. *Numerische Mathematik*, 1.', 'Bellman, R. (1958). On a Routing Problem. *Quarterly of Applied Mathematics*, 16(1).', 'Floyd, R. (1962). Algorithm 97: Shortest Path. *Communications of the ACM*, 5(6).', 'Hart, P., Nilsson, N. y Raphael, B. (1968). A Formal Basis for the Heuristic Determination of Minimum Cost Paths. *IEEE Transactions on Systems Science and Cybernetics*, 4(2).', 'Kruskal, J. (1956). On the Shortest Spanning Subtree of a Graph and the Traveling Salesman Problem. *Proceedings of the AMS*, 7(1).', 'Tarjan, R. (1975). Efficiency of a Good But Not Linear Set Union Algorithm. *Journal of the ACM*, 22(2).'],
  project: { t: 'Rutas y redes',
    goal: 'Implementar y comparar algoritmos de caminos mínimos y árboles de expansión.',
    steps: ['Modela un mapa real pequeño (barrios o ciudades cercanas) como grafo ponderado.', 'Implementa Dijkstra con un montículo y BFS, y compara las rutas que encuentran.', 'Implementa Bellman-Ford y crea un caso con un ciclo negativo que detecte.', 'Implementa A* con distancia en línea recta y cuenta cuántos vértices explora frente a Dijkstra.', 'Implementa Kruskal con unión-búsqueda y diseña una red de costo mínimo con un enlace de respaldo.'],
    deliver: 'El código, el grafo, las comparaciones y el diseño de la red.' },
  hito: ['Implementa en PatioApp el cálculo de la ruta más rápida de las grúas entre sedes con Dijkstra y tiempos por franja horaria.', 'Diseña la red privada entre sedes de PatioApp con Kruskal y agrega un enlace de respaldo justificado.']
});
SDC.after('m4.sp', 'm4.graphs');

S('m4', 'm4.strings', { title: 'Algoritmos sobre cadenas de texto',
  ask: '¿Qué algoritmo o estructura para cadenas se aplica?',
  lesson: `
> **La idea en simple.** Buscar una palabra en un documento, autocompletar mientras escribes, sugerir "¿quisiste decir…?" cuando te equivocas, comparar dos versiones de un archivo, encontrar genes en el ADN: todo es trabajo con cadenas de texto. Los algoritmos ingenuos funcionan con textos pequeños, pero con millones de caracteres hace falta ingenio para que la respuesta llegue al instante.

## Buscar un patrón: el método ingenuo
Para buscar un patrón de longitud m en un texto de longitud n, el método ingenuo prueba cada posición del texto y compara carácter por carácter: **O(n · m)** en el peor caso (por ejemplo, buscar «aaaab» en «aaaaaaaa…»). Para textos cortos es suficiente, y es lo que hacen muchas implementaciones de «indexOf» con optimizaciones. Pero con textos enormes o patrones largos, conviene evitar volver a comparar lo que ya se sabe.

## Knuth-Morris-Pratt
Donald Knuth, James Morris y Vaughan Pratt publicaron en 1977 el algoritmo **KMP**, que nunca retrocede en el texto. La idea: cuando hay una diferencia después de haber coincidido varios caracteres, el patrón ya "sabe" qué parte de lo leído puede ser el comienzo de una nueva coincidencia. Se precalcula para el patrón la **función de prefijos**: para cada posición, la longitud del prefijo más largo del patrón que también es sufijo de lo leído hasta ahí. Con ella, ante una diferencia, se salta directamente a la posición útil. El costo es **O(n + m)**.
~~~js
function prefijos(p) {                        // pi[i] = largo del prefijo propio más largo de p[0..i] que también es sufijo
  const pi = Array(p.length).fill(0);
  for (let i = 1, k = 0; i < p.length; i++) {
    while (k > 0 && p[i] !== p[k]) k = pi[k - 1];
    if (p[i] === p[k]) k++;
    pi[i] = k;
  }
  return pi;
}
function kmp(texto, p) {
  const pi = prefijos(p), posiciones = [];
  for (let i = 0, k = 0; i < texto.length; i++) {
    while (k > 0 && texto[i] !== p[k]) k = pi[k - 1];
    if (texto[i] === p[k]) k++;
    if (k === p.length) { posiciones.push(i - p.length + 1); k = pi[k - 1]; }
  }
  return posiciones;
}
console.log(prefijos('ABABC'), kmp('ABABDABABCABABC', 'ABABC'));   // [0,0,1,2,0] y [5, 10]
~~~
Otros algoritmos de búsqueda: **Boyer-Moore** (Robert Boyer y J Strother Moore, 1977) compara el patrón de **derecha a izquierda** y puede saltar varias posiciones de una vez; en la práctica es muy rápido con alfabetos grandes y es la base de herramientas como «grep». **Rabin-Karp** (Richard Karp y Michael Rabin, 1987) usa un **hash rodante**: calcula el hash de cada ventana del texto en O(1) a partir del anterior, y solo compara carácter por carácter cuando los hashes coinciden; es ideal para buscar **muchos** patrones a la vez y para detectar plagio.

## Tries: árboles de prefijos
Un **trie** (de *retrieval*, propuesto por Edward Fredkin en 1960) guarda un conjunto de palabras como un árbol en el que cada arista es un carácter, y cada camino desde la raíz es un prefijo. Buscar si una palabra existe cuesta O(m), sin importar cuántas palabras haya. Su ventaja principal es responder consultas **por prefijo**: "todas las placas que empiezan con ABC". Por eso se usa para **autocompletar**, en los correctores ortográficos, en las tablas de enrutamiento de los routers (buscando el prefijo de red más largo de una dirección IP) y en los diccionarios de los teclados de los teléfonos. Su costo es la memoria: muchos nodos con pocos hijos. Las variantes comprimidas (**árboles radix**, **Patricia**, de Donald Morrison, 1968) unen las cadenas de nodos con un solo hijo.

## Distancia de edición
¿Qué tan parecidas son «ABC-123» y «ABG-123»? La **distancia de Levenshtein** (Vladimir Levenshtein, 1965) es el número mínimo de **inserciones, borrados y sustituciones** de un carácter para transformar una cadena en la otra. Se calcula con **programación dinámica** en una tabla de (n + 1) × (m + 1), donde la celda (i, j) es la distancia entre los primeros i caracteres de una y los primeros j de la otra:
d(i, j) = mínimo de d(i − 1, j) + 1 (borrar), d(i, j − 1) + 1 (insertar) y d(i − 1, j − 1) + (0 si los caracteres son iguales, 1 si no) (sustituir).
Costo **O(n · m)**. Aplicaciones: los correctores ortográficos ("¿quisiste decir…?"), la búsqueda tolerante a errores de tipeo, la comparación de secuencias de ADN (con variantes como el algoritmo de Needleman-Wunsch, de 1970, y Smith-Waterman, de 1981) y la deduplicación de registros con errores de digitación. La variante de **Damerau** (1964) cuenta además la transposición de dos caracteres vecinos como un solo error, que es el error de tipeo más común.

## Comparar archivos: diff
La herramienta «diff» y las vistas de cambios de Git calculan la **subsecuencia común más larga** (LCS) entre las líneas de dos versiones: lo que no está en la LCS fue agregado o eliminado. Es otra aplicación de programación dinámica. Eugene Myers publicó en 1986 el algoritmo O(n · d) (donde d es el número de diferencias), muy rápido cuando los archivos son parecidos, que es el que usa Git por defecto.

## Estructuras de sufijos
Para buscar muchísimos patrones distintos en un mismo texto enorme (un genoma, un corpus de documentos), se preprocesa el texto:
- El **árbol de sufijos** (Peter Weiner, 1973) contiene todos los sufijos del texto y permite buscar cualquier patrón en O(m).
- El **arreglo de sufijos** (Udi Manber y Gene Myers, 1990) es la lista ordenada de las posiciones de los sufijos; con búsqueda binaria encuentra un patrón en O(m log n), usando mucha menos memoria.
Junto con la transformada de **Burrows-Wheeler** (1994), son la base de la compresión de bzip2 y de los programas que alinean secuencias de ADN contra el genoma humano.

## Unicode: las cadenas no son tan simples
Todo lo anterior supone que un carácter es una unidad. En Unicode, como viste en la representación de datos, un carácter visible puede ocupar varias unidades («ñ» compuesta, emojis, banderas). Comparar, invertir o recortar cadenas carácter por carácter puede romper esos caracteres. Para trabajo serio con texto se **normaliza** (NFC), se recorre por **grafemas** («Intl.Segmenter» en JavaScript) y se compara según las reglas del idioma («localeCompare» o «Intl.Collator», que saben que en español «ñ» va después de «n»).

## Ejemplo resuelto: búsqueda de placas tolerante a errores
Los operadores digitan placas con errores (B por 8, O por 0, letras cambiadas de lugar), y la búsqueda exacta no las encuentra.
1. **Autocompletar por prefijo:** un trie con las 50 000 placas activas sugiere coincidencias mientras se escribe: tras «AB» muestra las primeras 10 que empiezan así, en microsegundos.
2. **Búsqueda aproximada:** si no hay coincidencia exacta, se buscan las placas a **distancia de Damerau-Levenshtein 1**. Para no comparar con las 50 000, se generan las variantes de la placa digitada a distancia 1 (unas 7 × 36 sustituciones, más inserciones, borrados y transposiciones, unas 500) y se buscan en el conjunto de placas: O(500) consultas a una tabla hash.
3. **Sustituciones frecuentes:** se da costo menor a confusiones típicas (0 y O, 8 y B, 1 e I) para ordenar mejor las sugerencias.
4. **Resultado:** la tasa de "placa no encontrada" en la puerta baja del 6 % al 0,5 %, y cuando hay varias candidatas, el operador elige de una lista de tres.


## Cómo elegir
Para buscar un patrón una sola vez en un texto, la función de la biblioteca estándar («indexOf», «includes») casi siempre basta: está muy optimizada y combina varias de estas ideas. KMP o Boyer-Moore se justifican cuando se procesan flujos enormes que no caben en memoria, o cuando hay que garantizar el peor caso. Si se busca muchas veces en el **mismo** conjunto de palabras, se preprocesa: un trie o una tabla hash para palabras completas, un índice invertido para documentos (como en la unidad de búsqueda de información), un arreglo de sufijos para subcadenas arbitrarias. Si los datos tienen errores humanos, la búsqueda exacta no alcanza y se recurre a la distancia de edición, idealmente limitada a distancia 1 o 2 para que el costo sea manejable. Y siempre conviene probar con texto real en español, con tildes, eñes y mayúsculas, antes de dar el trabajo por terminado: muchos errores en producción vienen de suponer que un carácter es un byte.`,
  links: [['m4.dp', 'la distancia de edición y la LCS son programación dinámica'], ['m4.hash', 'Rabin-Karp usa un hash rodante'], ['teo.auto', 'las expresiones regulares y los autómatas también buscan patrones']],
  read: 'Cormen y otros, *Introduction to Algorithms* (4.ª ed.), capítulo 32; Sedgewick y Wayne, *Algorithms* (4.ª ed.), capítulo 5; Gusfield, *Algorithms on Strings, Trees, and Sequences* (1997).',
  terms: [
    ['Algoritmo KMP', 'búsqueda de patrones en O(n + m) que nunca retrocede en el texto gracias a la función de prefijos', ['Knuth, Morris y Pratt, 1977.', 'Función de prefijos.', 'Lineal.']],
    ['Boyer-Moore', 'búsqueda de patrones que compara de derecha a izquierda y puede saltar varias posiciones', ['Boyer y Moore, 1977.', 'Base de grep.', 'Muy rápido en la práctica.']],
    ['Hash rodante', 'hash de una ventana de texto que se actualiza en O(1) al desplazarla', ['Rabin-Karp.', 'Muchos patrones a la vez.', 'Detección de plagio.']],
    ['Trie', 'árbol en el que cada camino desde la raíz representa un prefijo de las palabras guardadas', ['Fredkin, 1960.', 'Autocompletar.', 'Búsqueda en O(m).']],
    ['Distancia de Levenshtein', 'número mínimo de inserciones, borrados y sustituciones para transformar una cadena en otra', ['Levenshtein, 1965.', 'Programación dinámica O(n·m).', '¿Quisiste decir…?']],
    ['Subsecuencia común más larga', 'secuencia más larga que aparece en el mismo orden en dos secuencias, no necesariamente contigua', ['Base de diff.', 'Algoritmo de Myers.', 'Programación dinámica.']],
    ['Arreglo de sufijos', 'lista ordenada de las posiciones de todos los sufijos de un texto', ['Manber y Myers, 1990.', 'Búsqueda binaria de patrones.', 'Alineamiento de ADN.']],
    ['Grafema', 'carácter tal como lo percibe una persona, que puede ocupar varias unidades de código', ['Un emoji de bandera.', 'Intl.Segmenter.', 'No se debe partir.']]
  ],
  q: [
    ['¿Qué costo tiene la búsqueda ingenua de un patrón de longitud m en un texto de longitud n en el peor caso?', 'O(n · m)', ['O(n + m)', 'O(log n)', 'O(1)'], 'Prueba cada posición.', 2],
    ['¿Qué aporta KMP frente a la búsqueda ingenua?', 'Nunca retrocede en el texto, logrando O(n + m)', ['Usa menos memoria siempre', 'Busca desde el final', 'Usa un hash'], 'Gracias a la función de prefijos.', 3],
    ['¿Para qué consulta es especialmente bueno un trie?', 'Encontrar todas las palabras que empiezan con un prefijo', ['Ordenar números', 'Calcular caminos mínimos', 'Comprimir imágenes'], 'Autocompletar.', 2],
    ['¿Cuál es la distancia de Levenshtein entre "casa" y "caza"?', '1', ['0', '2', '4'], 'Una sustitución.', 2],
    ['¿Qué calcula "diff" para comparar dos versiones de un archivo?', 'La subsecuencia común más larga de sus líneas', ['El hash de cada archivo', 'La distancia de Hamming', 'El orden alfabético'], 'Lo que no está en la LCS cambió.', 3],
    ['¿Por qué Rabin-Karp es útil para buscar muchos patrones a la vez?', 'Porque compara hashes de ventanas que se calculan en O(1) con un hash rodante', ['Porque no compara nada', 'Porque ordena el texto', 'Porque usa un árbol'], 'Solo verifica cuando los hashes coinciden.', 3],
    ['¿Qué problema aparece al invertir una cadena con emojis carácter por carácter?', 'Se rompen los caracteres que ocupan varias unidades de código', ['Ninguno', 'Se borra la cadena', 'Se ordena alfabéticamente'], 'Hay que recorrer por grafemas.', 4],
    { tf: 'La distancia de Damerau-Levenshtein cuenta la transposición de dos caracteres vecinos como un solo error.', v: true, e: 'Es el error de tipeo más común.', l: 2 },
    { tf: 'Buscar una palabra en un trie cuesta O(n), donde n es el número de palabras guardadas.', v: false, e: 'Cuesta O(m), la longitud de la palabra, sin importar cuántas haya.', l: 2 },
    { c: 'Escribe «levenshtein(a, b)»: distancia de edición entre dos cadenas.', f: 'levenshtein', p: ['a', 'b'], t: [[['casa', 'caza'], 1], [['ABC-123', 'ABG-12'], 2], [['', 'abc'], 3], [['kitten', 'sitting'], 3]], sol: '  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);\n  for (let j = 0; j <= b.length; j++) d[0][j] = j;\n  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)\n    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));\n  return d[a.length][b.length];', l: 3 },
    { c: 'Escribe «conPrefijo(palabras, prefijo)»: devuelve las palabras que empiezan con el prefijo, ordenadas alfabéticamente.', f: 'conPrefijo', p: ['palabras', 'prefijo'], t: [[[['ABC-123', 'ABD-001', 'XYZ-987', 'ABC-200'], 'ABC'], ['ABC-123', 'ABC-200']], [[['a'], 'b'], []]], sol: '  return palabras.filter(p => p.startsWith(prefijo)).sort();', l: 1 },
    { c: 'Escribe «funcionPrefijos(p)»: devuelve el arreglo pi de KMP para el patrón p.', f: 'funcionPrefijos', p: ['p'], t: [[['ABABC'], [0, 0, 1, 2, 0]], [['AAAA'], [0, 1, 2, 3]], [['ABC'], [0, 0, 0]]], sol: '  const pi = Array(p.length).fill(0);\n  for (let i = 1, k = 0; i < p.length; i++) { while (k > 0 && p[i] !== p[k]) k = pi[k - 1]; if (p[i] === p[k]) k++; pi[i] = k; }\n  return pi;', l: 4 }
  ],
  gen: function (g) {
    var ap = [['Autocompletar placas mientras se escribe', 'Trie'], ['Sugerir "¿quisiste decir…?"', 'Distancia de edición'], ['Mostrar las líneas que cambiaron entre dos versiones', 'Subsecuencia común más larga'], ['Buscar un patrón en un texto enorme sin retroceder', 'KMP'], ['Buscar cientos de frases a la vez en documentos', 'Rabin-Karp'], ['Encontrar el prefijo de red más largo de una IP', 'Trie']];
    ap.forEach(function (a) { g.mcq(2, '¿Qué algoritmo o estructura conviene? ' + a[0], a[1], ['Trie', 'Distancia de edición', 'Subsecuencia común más larga', 'KMP', 'Rabin-Karp'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Algoritmos sobre cadenas.'); });
    var lv = [['gato', 'pato', 1], ['casa', 'casas', 1], ['sol', 'sal', 1], ['abc', 'abc', 0], ['abc', 'cba', 2], ['perro', 'pero', 1], ['lima', 'limon', 2]];
    lv.forEach(function (l) { g.input(3, '¿Cuál es la distancia de Levenshtein entre "' + l[0] + '" y "' + l[1] + '"?', l[2], 'Mínimo de inserciones, borrados y sustituciones.'); });
    var co = [['Búsqueda ingenua', 'O(n · m)'], ['KMP', 'O(n + m)'], ['Distancia de Levenshtein', 'O(n · m)'], ['Buscar en un trie', 'O(m)']];
    co.forEach(function (c) { g.mcq(2, '¿Qué costo tiene ' + c[0] + '?', c[1], ['O(n · m)', 'O(n + m)', 'O(m)', 'O(n²)'].filter(function (x) { return x !== c[1]; }), 'n: texto, m: patrón o palabra.'); });
  },
  checks: [
    ['¿Qué ventaja tiene KMP sobre la búsqueda ingenua y cómo la logra?', 'Es O(n + m) porque nunca retrocede en el texto; usa la función de prefijos para saber dónde continuar tras una diferencia.'],
    ['¿Para qué sirve un trie y cuál es su costo?', 'Para buscar y listar palabras por prefijo en O(m); su costo es la memoria de muchos nodos.'],
    ['Explica cómo se calcula la distancia de Levenshtein.', 'Con una tabla de programación dinámica donde cada celda toma el mínimo entre borrar, insertar y sustituir (con costo 0 si los caracteres coinciden).'],
    ['¿Qué cuidado hay que tener con Unicode al procesar cadenas?', 'Normalizar, recorrer por grafemas y comparar según las reglas del idioma, porque un carácter visible puede ocupar varias unidades.']
  ],
  cites: ['Knuth, D. E., Morris, J. y Pratt, V. (1977). Fast Pattern Matching in Strings. *SIAM Journal on Computing*, 6(2).', 'Boyer, R. y Moore, J. S. (1977). A Fast String Searching Algorithm. *Communications of the ACM*, 20(10).', 'Karp, R. y Rabin, M. (1987). Efficient Randomized Pattern-Matching Algorithms. *IBM Journal of Research and Development*, 31(2).', 'Levenshtein, V. (1966). Binary codes capable of correcting deletions, insertions, and reversals. *Soviet Physics Doklady*, 10(8).', 'Myers, E. (1986). An O(ND) Difference Algorithm and Its Variations. *Algorithmica*, 1.', 'Manber, U. y Myers, G. (1993). Suffix Arrays: A New Method for On-Line String Searches. *SIAM Journal on Computing*, 22(5).'],
  project: { t: 'Buscador de texto tolerante a errores',
    goal: 'Implementar algoritmos de cadenas y aplicarlos a una búsqueda real.',
    steps: ['Implementa la búsqueda ingenua y KMP, y compara tiempos con textos y patrones diseñados para el peor caso.', 'Implementa un trie con inserción, búsqueda y listado por prefijo.', 'Implementa la distancia de Levenshtein y la de Damerau.', 'Construye un buscador de nombres (de calles, productos o personas ficticias) que autocomplete y sugiera correcciones.', 'Mide la calidad de las sugerencias con una lista de errores de tipeo reales o simulados.'],
    deliver: 'El código, las mediciones y la evaluación de las sugerencias.' },
  hito: ['Agrega a PatioApp el autocompletado de placas con un trie y la búsqueda tolerante a errores con distancia de Damerau-Levenshtein.', 'Mide en PatioApp la tasa de "placa no encontrada" antes y después de la búsqueda aproximada.']
});
SDC.after('m4.strings', 'm4.dp');
})();
