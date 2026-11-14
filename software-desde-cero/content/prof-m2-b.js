(function () {
var S = SDC.S;

S('m2', 'm2.graph', { title: 'Teoría de grafos',
  ask: '¿Qué concepto de teoría de grafos se aplica?',
  lesson: `
> **La idea en simple.** Un mapa de calles, una red de amigos, las dependencias entre módulos de un programa, las rutas entre sedes de una empresa: todo eso son puntos conectados por líneas. La teoría de grafos estudia esas conexiones en abstracto, y sus resultados sirven por igual para planificar rutas, asignar horarios, compilar programas o detectar fraudes.

## El problema de los puentes de Königsberg
En 1736, Leonhard Euler resolvió un acertijo de la ciudad prusiana de Königsberg (hoy Kaliningrado): ¿se puede recorrer la ciudad cruzando cada uno de sus siete puentes **exactamente una vez**? Euler abstrajo el problema: cada zona de tierra es un punto, cada puente una línea, y lo único que importa es cuántas líneas tocan cada punto. Demostró que el recorrido es imposible, y con ello fundó la teoría de grafos y, de paso, la topología.

## Definiciones
Un **grafo** G = (V, E) es un conjunto de **vértices** (o nodos) V y un conjunto de **aristas** E que conectan pares de vértices.
- **No dirigido:** las aristas no tienen sentido (una calle de doble sentido, una amistad).
- **Dirigido** (digrafo): cada arista va de un vértice a otro (una dependencia, un enlace web, una calle de un solo sentido).
- **Ponderado:** cada arista tiene un peso (distancia, tiempo, costo).
- **Simple:** sin aristas repetidas ni lazos (aristas de un vértice a sí mismo); un **multigrafo** los admite (como los puentes de Königsberg).
- El **grado** de un vértice es el número de aristas que lo tocan; en un digrafo se distinguen grado de entrada y de salida.
- Un **camino** es una secuencia de vértices unidos por aristas; un **ciclo** es un camino que vuelve al inicio; un grafo es **conexo** si hay camino entre cualquier par de vértices.
- Un grafo **completo** Kₙ tiene una arista entre cada par de sus n vértices: n(n − 1)/2 aristas.

## El lema del apretón de manos
En cualquier grafo, la **suma de los grados es el doble del número de aristas**: Σ grado(v) = 2|E|, porque cada arista aporta 1 al grado de cada uno de sus dos extremos. Consecuencia inmediata: el número de vértices de grado impar es siempre **par**. (En una reunión, el número de personas que dieron un número impar de apretones de manos es par.)

## Caminos eulerianos y hamiltonianos
- Un **camino euleriano** recorre cada **arista** exactamente una vez. Euler demostró que un grafo conexo lo tiene si y solo si tiene **0 o 2 vértices de grado impar** (si tiene 0, el camino puede cerrarse en un ciclo). En Königsberg, las cuatro zonas tenían grado impar: imposible. Encontrarlo es fácil (en tiempo lineal con el algoritmo de Hierholzer), y se usa, por ejemplo, para planificar recorridos que pasen por todas las calles (recolección de basura, inspección de redes).
- Un **camino hamiltoniano** recorre cada **vértice** exactamente una vez. Parece casi igual, pero es muchísimo más difícil: no se conoce ninguna condición sencilla, y decidir si existe es un problema **NP-completo**, como verás en Teoría de la computación. Su versión con pesos es el famoso **problema del viajante**.
El contraste entre ambos es una de las lecciones más importantes de la computación: problemas que suenan casi iguales pueden tener dificultades abismalmente distintas.

## Árboles
Un **árbol** es un grafo conexo sin ciclos. Propiedades equivalentes para un grafo con n vértices: es conexo y sin ciclos; es conexo y tiene exactamente **n − 1 aristas**; entre cada par de vértices hay **exactamente un** camino; quitar cualquier arista lo desconecta. Los árboles aparecen en todas partes: sistemas de archivos, documentos HTML, árboles de sintaxis de los compiladores, índices de bases de datos, jerarquías de organización. Un **árbol de expansión** de un grafo conexo es un árbol que incluye todos sus vértices; el de **peso mínimo** (que verás con los algoritmos de Kruskal y Prim) resuelve problemas como conectar todas las sedes con el menor costo de cableado. Arthur Cayley demostró en 1889 que hay exactamente nⁿ⁻² árboles distintos con n vértices etiquetados.

## Grafos bipartitos y emparejamientos
Un grafo es **bipartito** si sus vértices se pueden dividir en dos grupos de modo que toda arista una vértices de grupos distintos (operadores y turnos, unidades y espacios, estudiantes y cursos). Teorema: un grafo es bipartito si y solo si **no tiene ciclos de longitud impar**. Un **emparejamiento** es un conjunto de aristas sin vértices en común; encontrar el emparejamiento máximo (asignar la mayor cantidad de unidades a espacios compatibles) se resuelve en tiempo polinomial con algoritmos de caminos aumentantes, como el de Hopcroft y Karp (1973). El **teorema del matrimonio** de Philip Hall (1935) da la condición exacta para poder emparejar a todos los de un lado.

## Coloración
**Colorear** un grafo es asignar un color a cada vértice de modo que vértices adyacentes tengan colores distintos; el **número cromático** es la menor cantidad de colores necesaria. Aplicaciones directas:
- **Horarios:** cursos que comparten estudiantes no pueden tener examen a la misma hora; los colores son las franjas horarias.
- **Asignación de registros en compiladores:** variables que están vivas al mismo tiempo no pueden compartir registro; Gregory Chaitin, en IBM, formuló en 1981 la asignación de registros como coloración de grafos.
- **Frecuencias de radio:** antenas cercanas necesitan frecuencias distintas.
Decidir si un grafo se puede colorear con 3 colores es NP-completo; en la práctica se usan heurísticas voraces que dan buenas soluciones.

## Grafos planares y el teorema de los cuatro colores
Un grafo es **planar** si se puede dibujar en el plano sin que se crucen sus aristas. Para un grafo planar conexo vale la **fórmula de Euler**: V − E + F = 2, donde F es el número de caras (regiones, contando la exterior). De ella se deduce que un grafo planar simple con V ≥ 3 tiene como máximo 3V − 6 aristas, y por eso K₅ (5 vértices y 10 aristas, más de 3·5 − 6 = 9) **no** es planar. Kazimierz Kuratowski demostró en 1930 que un grafo es planar si y solo si no contiene una subdivisión de K₅ ni de K₃,₃.
El **teorema de los cuatro colores** afirma que todo mapa (todo grafo planar) se puede colorear con cuatro colores. Planteado en 1852, fue demostrado recién en 1976 por Kenneth Appel y Wolfgang Haken con ayuda de una computadora que revisó casi 2000 configuraciones; fue la primera gran demostración matemática que nadie podía verificar a mano, y generó un debate filosófico sobre qué cuenta como demostración. En 2005, Georges Gonthier la verificó formalmente con el asistente de pruebas Coq.

## Representar grafos en el código
- **Matriz de adyacencia:** una matriz n × n donde la celda (i, j) indica si hay arista. Consulta en O(1), pero ocupa O(n²) memoria aunque haya pocas aristas.
- **Lista de adyacencia:** para cada vértice, la lista de sus vecinos. Ocupa O(V + E) y es la habitual en grafos **dispersos** (con pocas aristas por vértice), que son la mayoría de los grafos reales.
~~~js
// Lista de adyacencia de la red de sedes de PatioApp y verificaciones de teoría de grafos
const rutas = [['Callao', 'Ate'], ['Ate', 'Lurín'], ['Lurín', 'Callao'], ['Callao', 'Ventanilla'], ['Ate', 'Chosica']];
const adj = {};
for (const [a, b] of rutas) { (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); }
const grados = Object.fromEntries(Object.entries(adj).map(([v, vec]) => [v, vec.length]));
const suma = Object.values(grados).reduce((x, y) => x + y, 0);
const impares = Object.values(grados).filter(g => g % 2 === 1).length;
console.log(grados);
console.log('suma de grados:', suma, '= 2 ×', rutas.length, 'aristas');
console.log('vértices de grado impar:', impares, impares === 0 || impares === 2 ? '→ hay camino euleriano' : '→ no hay camino euleriano');
~~~

## Grafos en el software
Más allá de los ejemplos anteriores: el grafo de dependencias de un proyecto (y la detección de ciclos), el grafo de llamadas de un programa, el grafo de flujo de control que usan los compiladores, las redes sociales, el grafo de enlaces de la web (que el algoritmo PageRank de Google usó desde 1998), las bases de datos de grafos como Neo4j, los grafos de conocimiento y la detección de fraude buscando ciclos de transferencias sospechosas. En Estructuras de datos y algoritmos viste cómo recorrerlos (BFS, DFS) y en Algoritmos verás caminos mínimos y árboles de expansión.

## Ejemplo resuelto: planificar los turnos de inspección de PatioApp
Seis inspectores deben revisar zonas, y dos inspecciones no pueden coincidir en el mismo turno si comparten inspector. Se arma un grafo: cada inspección es un vértice y hay arista si comparten inspector. Las inspecciones A, B y C comparten al inspector 1 (forman un triángulo), así que hacen falta **al menos 3 turnos** (un triángulo necesita 3 colores). Una coloración voraz, ordenando los vértices de mayor a menor grado, encuentra una asignación con exactamente 3 turnos, que por el argumento del triángulo es **óptima**. El modelo también responde preguntas nuevas: si se contrata un inspector más y la inspección A pasa a él, el triángulo se rompe y la heurística encuentra una asignación con 2 turnos.`,
  links: [['m4.graphs', 'los recorridos BFS y DFS operan sobre estos grafos'], ['teo.np', 'el camino hamiltoniano y la 3-coloración son NP-completos'], ['m2.sets', 'un grafo dirigido es una relación sobre un conjunto']],
  read: 'Rosen, *Matemática discreta y sus aplicaciones*, capítulos 10 y 11; Lehman, Leighton y Meyer, *Mathematics for Computer Science*, capítulos 11 a 13; West, *Introduction to Graph Theory* (2.ª ed., 2001).',
  terms: [
    ['Grafo', 'conjunto de vértices y de aristas que conectan pares de vértices', ['Sedes y rutas.', 'Módulos y dependencias.', 'G = (V, E).']],
    ['Grado', 'número de aristas que tocan un vértice', ['Suma de grados = 2|E|.', 'De entrada y de salida en digrafos.', 'Lema del apretón de manos.']],
    ['Camino euleriano', 'camino que recorre cada arista exactamente una vez', ['Puentes de Königsberg.', 'Existe con 0 o 2 vértices de grado impar.', 'Se encuentra en tiempo lineal.']],
    ['Camino hamiltoniano', 'camino que visita cada vértice exactamente una vez', ['Decidirlo es NP-completo.', 'Base del problema del viajante.', 'Sin condición sencilla conocida.']],
    ['Árbol', 'grafo conexo sin ciclos', ['n vértices y n − 1 aristas.', 'Un único camino entre dos vértices.', 'Sistemas de archivos.']],
    ['Grafo bipartito', 'grafo cuyos vértices se dividen en dos grupos y toda arista une grupos distintos', ['Unidades y espacios.', 'Sin ciclos impares.', 'Base de los emparejamientos.']],
    ['Número cromático', 'menor cantidad de colores para colorear un grafo sin que vértices adyacentes compartan color', ['Horarios de exámenes.', 'Asignación de registros.', 'Un triángulo necesita 3.']],
    ['Grafo planar', 'grafo que puede dibujarse en el plano sin cruces de aristas', ['V − E + F = 2.', 'K₅ no es planar.', 'Cuatro colores bastan.']]
  ],
  q: [
    ['Un grafo tiene 7 aristas. ¿Cuánto suma el grado de todos sus vértices?', '14', ['7', '49', '21'], 'Lema del apretón de manos: 2|E|.', 1],
    ['¿Por qué no se podían cruzar los siete puentes de Königsberg una sola vez cada uno?', 'Porque las cuatro zonas tenían grado impar', ['Porque había demasiados puentes', 'Porque el río era muy ancho', 'Porque el grafo no era conexo'], 'Hacen falta 0 o 2 vértices de grado impar.', 2],
    ['¿Cuántas aristas tiene un árbol con 25 vértices?', '24', ['25', '300', '26'], 'n − 1.', 1],
    ['¿Qué diferencia de dificultad hay entre caminos eulerianos y hamiltonianos?', 'El euleriano se decide fácilmente; el hamiltoniano es NP-completo', ['Ambos son fáciles', 'Ambos son NP-completos', 'El euleriano es más difícil'], 'Problemas parecidos, dificultades distintas.', 3],
    ['¿Cuándo un grafo es bipartito?', 'Si y solo si no tiene ciclos de longitud impar', ['Si tiene un número par de vértices', 'Si es un árbol de dos niveles', 'Si es completo'], 'Teorema clásico.', 3],
    ['¿Por qué K₅ no es planar?', 'Porque tiene 10 aristas y un grafo planar simple con 5 vértices admite como máximo 9', ['Porque tiene vértices de grado impar', 'Porque es un árbol', 'Sí es planar'], 'E ≤ 3V − 6.', 4],
    ['¿Cuántas aristas tiene el grafo completo K₈?', '28', ['8', '56', '64'], 'n(n − 1)/2.', 2],
    { tf: 'En todo grafo, el número de vértices de grado impar es par.', v: true, e: 'Consecuencia del lema del apretón de manos.', l: 2 },
    { tf: 'El teorema de los cuatro colores fue demostrado a mano por Euler en 1736.', v: false, e: 'Lo demostraron Appel y Haken en 1976 con ayuda de una computadora.', l: 2 },
    { c: 'Escribe «tieneEuleriano(aristas)»: aristas es una lista de [a, b] de un grafo no dirigido conexo; devuelve true si tiene 0 o 2 vértices de grado impar.', f: 'tieneEuleriano', p: ['aristas'], t: [[[[['a', 'b'], ['b', 'c'], ['c', 'a']]], true], [[[['a', 'b'], ['a', 'c'], ['a', 'd']]], false], [[[['a', 'b']]], true]], sol: '  const g = {};\n  for (const [a, b] of aristas) { g[a] = (g[a] || 0) + 1; g[b] = (g[b] || 0) + 1; }\n  const imp = Object.values(g).filter(x => x % 2).length;\n  return imp === 0 || imp === 2;', l: 2 },
    { c: 'Escribe «esBipartito(n, aristas)»: vértices 0..n−1 y aristas [a, b]; devuelve true si se puede colorear con 2 colores (usa BFS).', f: 'esBipartito', p: ['n', 'aristas'], t: [[[4, [[0, 1], [1, 2], [2, 3], [3, 0]]], true], [[3, [[0, 1], [1, 2], [2, 0]]], false], [[2, []], true]], sol: '  const adj = Array.from({ length: n }, () => []);\n  for (const [a, b] of aristas) { adj[a].push(b); adj[b].push(a); }\n  const color = Array(n).fill(-1);\n  for (let s = 0; s < n; s++) { if (color[s] !== -1) continue; color[s] = 0; const cola = [s];\n    while (cola.length) { const v = cola.shift(); for (const w of adj[v]) { if (color[w] === -1) { color[w] = 1 - color[v]; cola.push(w); } else if (color[w] === color[v]) return false; } } }\n  return true;', l: 4 },
    { c: 'Escribe «coloracionVoraz(n, aristas)»: asigna a cada vértice 0..n−1, en orden, el menor color (0, 1, 2…) no usado por sus vecinos ya coloreados; devuelve cuántos colores distintos usó.', f: 'coloracionVoraz', p: ['n', 'aristas'], t: [[[3, [[0, 1], [1, 2], [2, 0]]], 3], [[4, [[0, 1], [1, 2], [2, 3]]], 2], [[2, []], 1]], sol: '  const adj = Array.from({ length: n }, () => []);\n  for (const [a, b] of aristas) { adj[a].push(b); adj[b].push(a); }\n  const c = Array(n).fill(-1);\n  for (let v = 0; v < n; v++) { const usados = new Set(adj[v].map(w => c[w])); let k = 0; while (usados.has(k)) k++; c[v] = k; }\n  return new Set(c).size;', l: 3 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var n = R.int(3, 30); g.input(2, '¿Cuántas aristas tiene el grafo completo K' + n + '?', n * (n - 1) / 2, 'n(n − 1)/2.'); });
    g.times(6, function (R) { var n = R.int(5, 200); g.input(1, '¿Cuántas aristas tiene un árbol con ' + n + ' vértices?', n - 1, 'Todo árbol con n vértices tiene n − 1 aristas.'); });
    g.times(4, function (R) { var e = R.int(3, 50); g.input(2, 'Un grafo tiene ' + e + ' aristas. ¿Cuánto suma el grado de todos sus vértices?', 2 * e, 'Suma de grados = 2|E|.'); });
    var ap = [['Asignar franjas de examen a cursos que comparten estudiantes', 'Coloración'], ['Recorrer todas las calles de un distrito sin repetir ninguna', 'Camino euleriano'], ['Visitar todas las sedes una vez con el menor recorrido', 'Problema del viajante'], ['Asignar unidades a espacios compatibles', 'Emparejamiento bipartito'], ['Conectar todas las sedes con el menor costo de cable', 'Árbol de expansión mínima'], ['Decidir el orden de compilación de los módulos', 'Orden topológico']];
    ap.forEach(function (a) { g.mcq(3, '¿Qué problema de grafos modela esto? ' + a[0], a[1], ['Coloración', 'Camino euleriano', 'Problema del viajante', 'Emparejamiento bipartito', 'Árbol de expansión mínima', 'Orden topológico'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Modelar con grafos.'); });
  },
  checks: [
    ['Enuncia y explica el lema del apretón de manos.', 'La suma de los grados es el doble de las aristas, porque cada arista aporta 1 a cada extremo; por eso los vértices de grado impar son una cantidad par.'],
    ['¿Cuándo un grafo conexo tiene un camino euleriano y por qué el hamiltoniano es tan distinto?', 'Con 0 o 2 vértices de grado impar; el hamiltoniano no tiene condición sencilla conocida y decidirlo es NP-completo.'],
    ['Da tres propiedades equivalentes que caracterizan a un árbol.', 'Conexo y sin ciclos; conexo con n − 1 aristas; un único camino entre cada par de vértices.'],
    ['Modela un problema de horarios como coloración y explica qué representan vértices, aristas y colores.', 'Vértices: actividades; aristas: conflictos (recursos compartidos); colores: franjas horarias.']
  ],
  cites: ['Euler, L. (1741). Solutio problematis ad geometriam situs pertinentis. *Commentarii academiae scientiarum Petropolitanae*, 8 (presentado en 1736).', 'Appel, K. y Haken, W. (1977). Every Planar Map is Four Colorable. *Illinois Journal of Mathematics*, 21(3).', 'Chaitin, G. et al. (1981). Register Allocation via Coloring. *Computer Languages*, 6(1).', 'Hall, P. (1935). On Representatives of Subsets. *Journal of the London Mathematical Society*, 10(1).', 'West, D. (2001). *Introduction to Graph Theory* (2.ª ed.). Prentice Hall.', 'Gonthier, G. (2008). Formal Proof—The Four-Color Theorem. *Notices of the AMS*, 55(11).'],
  project: { t: 'Modelar problemas reales con grafos',
    goal: 'Representar y resolver problemas concretos con teoría de grafos.',
    steps: ['Elige tres problemas de tu entorno (rutas, horarios, asignaciones) y modela cada uno como grafo.', 'Implementa la lista de adyacencia y verifica el lema del apretón de manos con tus datos.', 'Determina si un recorrido por todas las conexiones es posible (euleriano) y constrúyelo con el algoritmo de Hierholzer.', 'Resuelve un problema de horarios con coloración voraz y argumenta una cota inferior del número de colores.', 'Verifica si tu grafo es bipartito y, si lo es, calcula un emparejamiento.'],
    deliver: 'Los modelos, el código y el análisis de cada problema.' },
  hito: ['Modela la red de sedes y rutas de traslado de PatioApp como grafo ponderado con lista de adyacencia.', 'Implementa en PatioApp la planificación de turnos de inspección por coloración de grafos con su cota inferior.']
});
SDC.after('m2.graph', 'm2.sets');

S('m2', 'm2.alg', { title: 'Estructuras algebraicas: grupos, anillos y campos finitos',
  ask: '¿Qué estructura o propiedad algebraica se aplica?',
  lesson: `
> **La idea en simple.** Sumar números, concatenar textos, unir conjuntos y combinar permisos parecen cosas distintas, pero comparten propiedades: se pueden agrupar en cualquier orden, tienen un elemento "neutro" que no cambia nada, a veces se pueden deshacer. El álgebra abstracta estudia esas propiedades en general, y el software las usa todo el tiempo: en la criptografía que protege tus pagos, en los códigos que corrigen errores de un código QR rayado y en la forma en que se reparten cálculos entre miles de computadoras.

## Operaciones y sus propiedades
Una **operación binaria** sobre un conjunto toma dos elementos y devuelve uno del mismo conjunto. Las propiedades que importan:
- **Clausura:** el resultado está en el conjunto (sumar dos enteros da un entero).
- **Asociatividad:** (a ∘ b) ∘ c = a ∘ (b ∘ c). La suma y la concatenación la cumplen; la resta, no.
- **Elemento neutro** e: a ∘ e = e ∘ a = a. El 0 para la suma, el 1 para el producto, el texto vacío para la concatenación.
- **Inverso:** para cada a existe a⁻¹ con a ∘ a⁻¹ = e. El −a para la suma de enteros; los textos no tienen inverso para la concatenación.
- **Conmutatividad:** a ∘ b = b ∘ a. La suma la cumple; la concatenación y la composición de funciones, no.

## La escalera de estructuras
| Estructura | Propiedades | Ejemplos |
| Semigrupo | asociativa | máximo de dos números |
| Monoide | asociativa con neutro | concatenación de textos (neutro ""), suma (0), producto (1), unión de conjuntos (∅) |
| Grupo | monoide con inversos | enteros con suma, rotaciones de un cubo de Rubik, permutaciones |
| Grupo abeliano | grupo conmutativo | enteros con suma, ℤₙ con suma módulo n |
| Anillo | dos operaciones (+ y ×): grupo abeliano con +, monoide con ×, distributiva | enteros, matrices cuadradas, polinomios |
| Campo | anillo conmutativo donde todo elemento no nulo tiene inverso multiplicativo | racionales, reales, ℤₚ con p primo |
El grupo de las permutaciones de un cubo de Rubik tiene unos 4,3 × 10¹⁹ elementos; en 2010, un equipo con tiempo de cómputo de Google demostró que todas las posiciones se resuelven en 20 movimientos o menos, usando la estructura de grupo para reducir el problema.

## Monoides en programación
Los monoides son la estructura algebraica más útil del día a día, aunque rara vez se nombren:
- «reduce» con un valor inicial es exactamente "combinar una lista con un monoide": sumar con 0, concatenar con "", unir con un conjunto vacío.
- La **asociatividad** permite **paralelizar**: si la operación es asociativa, se puede dividir la lista en partes, combinar cada parte en una máquina distinta y luego combinar los resultados, en cualquier agrupación. Es la base de MapReduce, de las agregaciones distribuidas y de las sumas en GPU. Una operación no asociativa (como el promedio directo) da resultados distintos según cómo se reparta; por eso las agregaciones distribuidas guardan (suma, cantidad), que sí forma un monoide, y dividen al final.
- La **conmutatividad** permite además combinar **en cualquier orden**, lo que importa cuando los resultados parciales llegan desordenados por la red.
- Los **semirretículos** (operación asociativa, conmutativa e **idempotente**, como el máximo o la unión) son la base matemática de los **CRDT** que viste en Sistemas Distribuidos: las réplicas pueden fusionar estados en cualquier orden y cualquier número de veces y siempre convergen.
~~~js
// El promedio no es asociativo; el par (suma, cantidad) sí forma un monoide
const combinar = (a, b) => ({ suma: a.suma + b.suma, n: a.n + b.n });
const neutro = { suma: 0, n: 0 };
const tiempos = [12, 7, 30, 5, 18, 22, 9];                         // minutos de estadía, por ejemplo
const parte1 = tiempos.slice(0, 3).map(x => ({ suma: x, n: 1 })).reduce(combinar, neutro);
const parte2 = tiempos.slice(3).map(x => ({ suma: x, n: 1 })).reduce(combinar, neutro);
const total = combinar(parte1, parte2);                              // se combinan en cualquier agrupación
console.log('promedio correcto:', (total.suma / total.n).toFixed(2));
const promedioDePromedios = (parte1.suma / parte1.n + parte2.suma / parte2.n) / 2;
console.log('promedio de promedios (incorrecto):', promedioDePromedios.toFixed(2));
~~~

## Grupos: algunos resultados
- El **orden** de un grupo finito es su número de elementos. El **teorema de Lagrange** dice que el orden de cualquier subgrupo divide al orden del grupo. De él se deduce el **pequeño teorema de Fermat** (aᵖ⁻¹ ≡ 1 mod p si p es primo y no divide a a) y el teorema de Euler que sostiene a RSA, que viste en Matemática avanzada.
- Un grupo es **cíclico** si todos sus elementos son potencias de uno solo, llamado **generador**. El grupo multiplicativo de ℤₚ (los números del 1 al p − 1 con producto módulo p) es cíclico. El intercambio de claves de **Diffie-Hellman** (1976) usa esa estructura: es fácil calcular gˣ mod p, pero recuperar x a partir del resultado (el **logaritmo discreto**) es, hasta donde se sabe, muy difícil para p grandes.
- Los puntos de una **curva elíptica** sobre un campo finito también forman un grupo, con una "suma" geométrica de puntos. La criptografía de curvas elípticas (propuesta por Neal Koblitz y Victor Miller en 1985) logra la misma seguridad que RSA con claves mucho más cortas: una clave de 256 bits de curva elíptica equivale aproximadamente a una RSA de 3072 bits. Es la que usa hoy la mayoría de las conexiones HTTPS.

## Campos finitos
Un **campo finito** (o campo de Galois, en honor a Évariste Galois, que los estudió antes de morir en un duelo en 1832 a los 20 años) es un campo con un número finito de elementos. Existen exactamente cuando ese número es una potencia de un primo, pᵏ.
- **GF(p) = ℤₚ:** los enteros módulo un primo p, con suma y producto módulo p. Todo elemento no nulo tiene inverso (que se calcula con el algoritmo extendido de Euclides).
- **GF(2):** solo {0, 1}; la suma es el XOR y el producto el AND. Es el campo de los bits.
- **GF(2⁸):** 256 elementos, que se representan como **bytes**: cada byte es un polinomio de grado menor que 8 con coeficientes en GF(2); la suma es el XOR y el producto es el producto de polinomios reducido módulo un polinomio irreducible de grado 8.
¿Para qué sirve todo esto? Porque en un campo se puede sumar, restar, multiplicar y **dividir** sin salir del conjunto, y en GF(2⁸) cada elemento cabe exactamente en un byte, de modo que las computadoras lo operan de forma muy eficiente.

## Aplicaciones de los campos finitos
- **AES**, el estándar de cifrado simétrico (Joan Daemen y Vincent Rijmen, algoritmo Rijndael, adoptado por el NIST en 2001), opera sobre bytes como elementos de GF(2⁸): su caja de sustitución usa inversos multiplicativos en ese campo, y su mezcla de columnas es una multiplicación de matrices sobre él.
- **CRC** (verificación de redundancia cíclica, W. Wesley Peterson, 1961): trata el mensaje como un polinomio sobre GF(2) y calcula el resto de dividirlo por un polinomio generador. Ethernet, ZIP, PNG y muchos protocolos usan CRC-32 para detectar errores de transmisión.
- **Códigos de Reed-Solomon** (Irving Reed y Gustave Solomon, 1960): usan polinomios sobre GF(2⁸) para **corregir** errores, no solo detectarlos. Están en los CD y DVD (un rayón no impide la lectura), en los códigos QR (que siguen funcionando con hasta un 30 % de su superficie dañada en el nivel de corrección más alto), en las comunicaciones con sondas espaciales como las Voyager y en sistemas de almacenamiento que reparten datos entre discos.
- La **criptografía de curvas elípticas** trabaja sobre curvas definidas en campos finitos GF(p).

## Ejemplo resuelto: agregar la ocupación de todas las sedes
PatioApp calcula cada noche, en cada sede, estadísticas de las estadías del día, y la central las combina. Requisitos: que se pueda combinar en cualquier orden (los resultados llegan desordenados) y que reenviar un resultado por error no lo cuente dos veces.
1. **Total de estadías y minutos:** el par (suma, cantidad) es un monoide conmutativo; el promedio se calcula al final. Pero la suma **no** es idempotente: si una sede reenvía su resultado, se cuenta doble. Solución: guardar el resultado por sede en un mapa {sede: (suma, cantidad)} y combinar mapas tomando, para cada sede, el resultado más reciente; esa combinación sí es idempotente.
2. **Estadía más larga:** el máximo es asociativo, conmutativo e idempotente (un semirretículo): reenviarlo no cambia nada.
3. **Conjunto de placas que pasaron por varias sedes:** la unión de conjuntos también es un semirretículo.
4. **Verificación de integridad** de los archivos enviados: un CRC-32 para detectar corrupción accidental y una firma HMAC para detectar alteraciones intencionales (un CRC no protege contra un atacante, que puede recalcularlo).`,
  links: [['mat2.num', 'la aritmética modular y RSA se basan en grupos de enteros módulo n'], ['m16.crypto', 'AES y las curvas elípticas operan sobre campos finitos'], ['sd.repl', 'los CRDT se basan en semirretículos']],
  read: 'Pinter, *A Book of Abstract Algebra* (2.ª ed., 2010); Lehman, Leighton y Meyer, *Mathematics for Computer Science*, capítulo 9; Paar y Pelzl, *Understanding Cryptography* (2010), capítulo 4.',
  terms: [
    ['Monoide', 'conjunto con una operación asociativa y un elemento neutro', ['Concatenación con "".', 'Suma con 0.', 'Base de reduce.']],
    ['Grupo', 'monoide en el que todo elemento tiene inverso', ['Enteros con suma.', 'Permutaciones.', 'Cubo de Rubik.']],
    ['Asociatividad', 'propiedad de que el agrupamiento no cambia el resultado', ['(a + b) + c = a + (b + c).', 'Permite paralelizar.', 'El promedio directo no la tiene.']],
    ['Teorema de Lagrange', 'el orden de un subgrupo divide al orden del grupo finito', ['Implica el pequeño teorema de Fermat.', 'Sostiene a RSA.', 'Grupos finitos.']],
    ['Logaritmo discreto', 'problema de hallar x a partir de gˣ en un grupo, considerado difícil en ciertos grupos', ['Base de Diffie-Hellman.', 'Fácil en un sentido, difícil en el otro.', 'También en curvas elípticas.']],
    ['Campo finito', 'campo con un número finito de elementos, que siempre es una potencia de un primo', ['GF(2) son los bits.', 'GF(2⁸) son los bytes.', 'Galois.']],
    ['CRC', 'código detector de errores que divide el mensaje como polinomio sobre GF(2)', ['CRC-32 en Ethernet y ZIP.', 'Peterson, 1961.', 'No protege contra atacantes.']],
    ['Reed-Solomon', 'código corrector de errores basado en polinomios sobre campos finitos', ['Códigos QR.', 'CD y DVD.', 'Sondas Voyager.']]
  ],
  q: [
    ['¿Qué estructura forman los textos con la concatenación y el texto vacío?', 'Un monoide (no conmutativo)', ['Un grupo', 'Un campo', 'Ninguna'], 'No hay inversos para la concatenación.', 2],
    ['¿Por qué la asociatividad permite paralelizar una agregación?', 'Porque las partes se pueden combinar en cualquier agrupación y el resultado es el mismo', ['Porque hace las operaciones más rápidas', 'Porque elimina los datos repetidos', 'No lo permite'], 'Base de MapReduce.', 3],
    ['¿Por qué no se pueden promediar directamente los promedios de dos sedes con distinta cantidad de estadías?', 'Porque el promedio no es asociativo; hay que combinar (suma, cantidad)', ['Porque los promedios son negativos', 'Porque son de días distintos', 'Sí se puede'], 'El par (suma, cantidad) sí forma un monoide.', 3],
    ['¿Cuántos elementos puede tener un campo finito?', 'Una potencia de un número primo', ['Cualquier número', 'Solo números pares', 'Solo 2'], 'pᵏ.', 3],
    ['En GF(2), ¿a qué operación de bits corresponde la suma?', 'XOR', ['AND', 'OR', 'NOT'], 'El producto es el AND.', 2],
    ['¿Qué ventaja tiene la criptografía de curvas elípticas frente a RSA?', 'Logra seguridad equivalente con claves mucho más cortas', ['No usa matemáticas', 'Es imposible de romper', 'No necesita claves'], '256 bits ≈ RSA de 3072.', 3],
    ['¿Qué propiedad de las operaciones de un CRDT garantiza que reenviar un estado no cambie el resultado?', 'La idempotencia', ['La existencia de inversos', 'La no conmutatividad', 'La divisibilidad'], 'Los semirretículos son idempotentes.', 4],
    { tf: 'La resta de enteros es asociativa.', v: false, e: '(5 − 3) − 1 = 1, pero 5 − (3 − 1) = 3.', l: 1 },
    { tf: 'Los códigos de Reed-Solomon permiten leer un código QR aunque parte de él esté dañada.', v: true, e: 'Corrigen errores, no solo los detectan.', l: 2 },
    { c: 'Escribe «combinar(a, b)» para pares {suma, n} y úsala en «promedioDistribuido(partes)»: partes es una lista de listas de números; combina cada parte y devuelve el promedio global (0 si no hay datos).', f: 'promedioDistribuido', p: ['partes'], t: [[[[[12, 7, 30], [5, 18, 22, 9]]], 14.714285714285714], [[[[], [4]]], 4], [[[[]]], 0]], sol: '  const combinar = (a, b) => ({ suma: a.suma + b.suma, n: a.n + b.n });\n  const t = partes.map(p => p.reduce((acc, x) => combinar(acc, { suma: x, n: 1 }), { suma: 0, n: 0 })).reduce(combinar, { suma: 0, n: 0 });\n  return t.n ? t.suma / t.n : 0;', l: 3 },
    { c: 'Escribe «inversoModular(a, p)»: inverso de a módulo p primo, con el pequeño teorema de Fermat (a^(p−2) mod p) y exponenciación rápida.', f: 'inversoModular', p: ['a', 'p'], t: [[[3, 7], 5], [[2, 11], 6], [[10, 13], 4]], sol: '  let r = 1, b = a % p, e = p - 2;\n  while (e > 0) { if (e & 1) r = r * b % p; b = b * b % p; e >>= 1; }\n  return r;', l: 3 },
    { c: 'Escribe «sumaGF2(a, b)»: suma de dos listas de bits (polinomios sobre GF(2)) de igual longitud.', f: 'sumaGF2', p: ['a', 'b'], t: [[[[1, 0, 1, 1], [1, 1, 0, 1]], [0, 1, 1, 0]], [[[0], [0]], [0]]], sol: '  return a.map((x, i) => x ^ b[i]);', l: 1 }
  ],
  gen: function (g) {
    var es = [['Concatenación de textos con ""', 'Monoide'], ['Enteros con la suma', 'Grupo abeliano'], ['Racionales con suma y producto', 'Campo'], ['Matrices 2×2 con suma y producto', 'Anillo'], ['Máximo de dos números naturales', 'Semigrupo'], ['Unión de conjuntos con el conjunto vacío', 'Monoide']];
    es.forEach(function (e) { g.mcq(3, '¿Qué estructura algebraica es la más precisa para esto? ' + e[0], e[1], ['Semigrupo', 'Monoide', 'Grupo abeliano', 'Anillo', 'Campo'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'La escalera de estructuras.'); });
    var pr = [['Suma de enteros', 'Asociativa y conmutativa'], ['Concatenación de textos', 'Asociativa pero no conmutativa'], ['Resta de enteros', 'Ni asociativa ni conmutativa'], ['Composición de funciones', 'Asociativa pero no conmutativa'], ['Máximo', 'Asociativa y conmutativa']];
    pr.forEach(function (p) { g.mcq(2, '¿Qué propiedades tiene esta operación? ' + p[0], p[1], ['Asociativa y conmutativa', 'Asociativa pero no conmutativa', 'Ni asociativa ni conmutativa', 'Conmutativa pero no asociativa'].filter(function (x) { return x !== p[1]; }), 'Propiedades de las operaciones.'); });
    g.times(6, function (R) { var p = R.pick([5, 7, 11, 13]), a = R.int(2, p - 1), inv = 1; while ((a * inv) % p !== 1) inv++; g.input(4, '¿Cuál es el inverso de ' + a + ' módulo ' + p + '? (el número x entre 1 y ' + (p - 1) + ' con ' + a + '·x ≡ 1)', inv, 'Se prueba o se usa Fermat: a^(p−2) mod p.'); });
  },
  checks: [
    ['Define monoide y grupo, con un ejemplo de programación de cada uno.', 'Monoide: operación asociativa con neutro (concatenar textos con ""); grupo: además con inversos (sumar enteros).'],
    ['¿Por qué la asociatividad es clave para el cómputo distribuido?', 'Porque permite combinar resultados parciales de distintas máquinas en cualquier agrupación con el mismo resultado.'],
    ['¿Qué es un campo finito y dónde se usa en software?', 'Un campo con pᵏ elementos donde se puede dividir; GF(2⁸) se usa en AES, Reed-Solomon y CRC.'],
    ['¿Qué relación hay entre los semirretículos y los CRDT?', 'Los CRDT combinan estados con operaciones asociativas, conmutativas e idempotentes, por eso las réplicas convergen sin importar el orden ni las repeticiones.']
  ],
  cites: ['Pinter, C. (2010). *A Book of Abstract Algebra* (2.ª ed.). Dover.', 'Diffie, W. y Hellman, M. (1976). New Directions in Cryptography. *IEEE Transactions on Information Theory*, 22(6).', 'Reed, I. y Solomon, G. (1960). Polynomial Codes Over Certain Finite Fields. *Journal of the SIAM*, 8(2).', 'Peterson, W. W. y Brown, D. T. (1961). Cyclic Codes for Error Detection. *Proceedings of the IRE*, 49(1).', 'Daemen, J. y Rijmen, V. (2002). *The Design of Rijndael: AES*. Springer.', 'Rokicki, T., Kociemba, H., Davidson, M. y Dethridge, J. (2014). The Diameter of the Rubik’s Cube Group Is Twenty. *SIAM Review*, 56(4).'],
  project: { t: 'Álgebra al servicio del software',
    goal: 'Aplicar estructuras algebraicas a la agregación distribuida y a la detección de errores.',
    steps: ['Identifica cinco operaciones de tu código o de una biblioteca y clasifícalas como semigrupo, monoide o grupo.', 'Implementa estadísticas distribuidas (conteo, suma, promedio, máximo, varianza) como monoides y verifica con pruebas basadas en propiedades que son asociativas.', 'Implementa aritmética en GF(p) con inverso por Euclides extendido y por Fermat, y compáralas.', 'Implementa un CRC sencillo sobre bits y verifica que detecta todos los errores de un bit.', 'Explica por qué un CRC no protege contra un atacante y qué usarías en su lugar.'],
    deliver: 'El código, las pruebas de propiedades y el análisis escrito.' },
  hito: ['Implementa en PatioApp las estadísticas nocturnas por sede como monoides combinables en cualquier orden, con pruebas de asociatividad.', 'Agrega a los archivos que envían las sedes de PatioApp un CRC-32 para corrupción accidental y una firma HMAC para alteraciones intencionales.']
});
SDC.after('m2.alg', 'm2.graph');
})();
