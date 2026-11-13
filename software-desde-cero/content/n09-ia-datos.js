(function () {
var M = SDC.M, S = SDC.S;
M('ia', { title: 'Inteligencia artificial, aprendizaje automático e ingeniería de datos',
  desc: 'Los fundamentos que todo ingeniero de software necesita hoy: cómo buscan soluciones los agentes inteligentes, cómo aprenden los modelos a partir de datos, cómo funcionan las redes neuronales y cómo se construyen los sistemas de datos que los alimentan.',
  thread: 'PatioApp gana inteligencia: planifica la ubicación de los vehículos con búsqueda heurística, predice cuántos días estará cada unidad con un modelo evaluado con rigor, prueba una pequeña red neuronal y organiza sus datos en un almacén dimensional con un pipeline confiable.',
  books: '*Artificial Intelligence: A Modern Approach* (Russell y Norvig), *Machine Learning* (Mitchell), *Deep Learning* (Goodfellow, Bengio y Courville), *Designing Data-Intensive Applications* (Kleppmann), *The Data Warehouse Toolkit* (Kimball y Ross).',
  uni: 'Áreas de IA y de gestión de datos de las recomendaciones curriculares ACM/IEEE CS2023; Stanford CS221, CS229 y CS231n; MIT 6.034 y 6.036 (6.390); Berkeley CS188; CMU 10-601 y 15-445. En Perú: Inteligencia Artificial, Aprendizaje Automático, Inteligencia de Negocios y Big Data (UNMSM, UNI, PUCP, UTEC, UPC).',
  capstone: { t: 'PatioApp inteligente',
    goal: 'Incorporar a PatioApp capacidades de IA y datos con criterios de ingeniería: medir, validar, monitorear y respetar la privacidad.',
    steps: ['Implementa la asignación de espacios del patio con búsqueda A* y compárala con BFS en nodos expandidos.', 'Construye un modelo que prediga los días de permanencia de una unidad con división entrenamiento, validación y prueba, y una línea base simple.', 'Entrena una red neuronal pequeña para el mismo problema y compara resultados y costo.', 'Diseña el almacén de datos de PatioApp con un esquema en estrella y un pipeline ETL con controles de calidad.', 'Define el monitoreo del modelo en producción (deriva de datos y de desempeño) y el cumplimiento de la Ley 29733 de protección de datos personales.'],
    deliver: 'El código, el informe de evaluación de modelos, el diseño del almacén y el plan de operación del modelo.' } });

S('ia', 'ia.search', { title: 'Agentes inteligentes y búsqueda',
  ask: '¿Qué concepto de búsqueda o de agentes inteligentes se aplica?',
  lesson: `
> **La idea en simple.** Muchos problemas se pueden plantear como encontrar un camino: de la posición inicial de un juego a la victoria, del punto A al punto B en un mapa, de un horario vacío a uno sin choques. La inteligencia artificial clásica estudia cómo encontrar esos caminos sin probar todas las posibilidades.

## ¿Qué es la inteligencia artificial?
Alan Turing publicó en 1950 *Computing Machinery and Intelligence*, donde reemplazó la pregunta "¿pueden pensar las máquinas?" por un **juego de imitación**: si un interrogador no puede distinguir por escrito a una máquina de una persona, ¿qué razones quedan para negar que piensa? El término "inteligencia artificial" lo acuñó John McCarthy en la propuesta del taller de Dartmouth de 1956. Stuart Russell y Peter Norvig organizan su libro, el texto de referencia en cientos de universidades, alrededor de la idea de **agente racional**: un sistema que percibe su entorno y actúa para lograr el mejor resultado esperado según una medida de desempeño.

## Agentes y entornos
Un agente se describe con **PEAS**: medida de desempeño (*Performance*), entorno (*Environment*), actuadores y sensores. Ejemplo: un agente que ubica vehículos en el patio tiene como medida minimizar las maniobras, como entorno el mapa del patio, como actuadores las instrucciones al operador y como sensores el registro de espacios libres. Los entornos se clasifican en totalmente o parcialmente observables, deterministas o estocásticos, estáticos o dinámicos, discretos o continuos, de un agente o de varios.

## Búsqueda en espacios de estados
Un problema de búsqueda tiene un **estado inicial**, unas **acciones**, un **modelo de transición** (qué estado resulta de cada acción), una **prueba de objetivo** y un **costo** por acción. Las estrategias sin información:
| Estrategia | Cómo explora | Completa | Óptima |
| Anchura (BFS) | por niveles, con una cola | sí | sí, si todos los costos son iguales |
| Profundidad (DFS) | una rama hasta el fondo, con una pila | no en espacios infinitos | no |
| Costo uniforme | el nodo de menor costo acumulado (como Dijkstra) | sí | sí |
| Profundización iterativa | DFS con límites crecientes | sí | sí, con costos iguales |

## Búsqueda informada: A*
Peter Hart, Nils Nilsson y Bertram Raphael, del Stanford Research Institute, publicaron en 1968 el algoritmo **A estrella** (A*), creado para el robot Shakey. Expande primero el nodo con menor f(n) = g(n) + h(n), donde g es el costo real desde el inicio y h una **heurística** que estima el costo hasta el objetivo. Si la heurística es **admisible** (nunca sobreestima el costo real), A* encuentra la solución óptima. En una grilla donde uno se mueve en cuatro direcciones, la distancia Manhattan |x₁ − x₂| + |y₁ − y₂| es admisible. Una buena heurística puede reducir los nodos explorados en órdenes de magnitud.
~~~js
// BFS en una grilla del patio: '#' es un espacio ocupado
function pasosMinimos(grilla) {
  const F = grilla.length, C = grilla[0].length, dist = { '0,0': 0 }, cola = [[0, 0]];
  while (cola.length) {
    const [f, c] = cola.shift();
    if (f === F - 1 && c === C - 1) return dist[f + ',' + c];
    for (const [df, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nf = f + df, nc = c + dc, k = nf + ',' + nc;
      if (nf >= 0 && nc >= 0 && nf < F && nc < C && grilla[nf][nc] !== '#' && !(k in dist)) { dist[k] = dist[f + ',' + c] + 1; cola.push([nf, nc]); }
    }
  }
  return -1;
}
console.log(pasosMinimos(['....', '.##.', '...#', '#...']));
~~~

## Búsqueda con adversario
En juegos de dos jugadores, el algoritmo **minimax** supone que el rival juega de forma óptima: el jugador MAX elige la jugada con el mayor valor y MIN la de menor valor, recursivamente hasta las hojas. La **poda alfa-beta** descarta ramas que no pueden cambiar la decisión, y con buen orden de jugadas permite explorar aproximadamente el doble de profundidad con el mismo esfuerzo. Deep Blue, de IBM, derrotó en 1997 al campeón mundial Garry Kasparov con búsqueda alfa-beta, hardware especializado y funciones de evaluación ajustadas por expertos. En 2016, AlphaGo, de DeepMind, venció a Lee Sedol en Go combinando búsqueda de Monte Carlo en árboles con redes neuronales (David Silver y otros, *Nature*).

## Satisfacción de restricciones y lógica
Muchos problemas de ingeniería, como armar horarios o asignar espacios, se plantean como **problemas de satisfacción de restricciones**: variables, dominios y restricciones. Se resuelven con búsqueda con retroceso, propagación de restricciones y heurísticas como elegir primero la variable con menos valores posibles. Otra rama clásica es la **representación del conocimiento** con lógica proposicional y de primer orden, que sustenta los sistemas expertos de los años 80 y herramientas actuales como los resolvedores SAT usados para verificar hardware y software.

## La IA simbólica y la estadística
La IA de búsqueda y lógica, llamada **simbólica**, representa el conocimiento de forma explícita. La IA **estadística** o de aprendizaje, que verás en los temas siguientes, aprende patrones de los datos. Los sistemas modernos más potentes suelen combinarlas: AlphaGo usa búsqueda guiada por redes, y los asistentes de programación combinan modelos de lenguaje con herramientas que ejecutan y verifican código.

## Ejemplo resuelto: elegir la heurística para el patio
Problema: guiar al operador hasta el espacio libre más cercano en un patio con pasillos. Estados: posición del vehículo; acciones: moverse a una celda vecina libre; costo: 1 por celda. Con BFS se exploran todas las celdas a distancia creciente; con A* y la heurística Manhattan hasta el espacio objetivo, se exploran sobre todo las celdas en la dirección correcta. La heurística es admisible porque ningún camino real puede ser más corto que la distancia Manhattan cuando solo hay movimientos horizontales y verticales. Si se permitieran diagonales con el mismo costo, Manhattan sobreestimaría y habría que usar la distancia de Chebyshev, max(|Δx|, |Δy|).`,
  links: [['m4.graphs', 'BFS, DFS y Dijkstra son los algoritmos de grafos en los que se basa la búsqueda'], ['teo.np', 'muchos problemas de búsqueda son NP-difíciles y requieren heurísticas'], ['m17.ai', 'la IA aplicada a la ingeniería de software usa estas bases']],
  read: 'Russell y Norvig, capítulos 2 a 6; Turing (1950); Hart, Nilsson y Raphael (1968).',
  terms: [
    ['Agente racional', 'sistema que percibe su entorno y actúa para maximizar el resultado esperado según una medida de desempeño', ['Un asignador de espacios que minimiza maniobras.', 'Un termostato inteligente que ahorra energía.', 'Russell y Norvig organizan la IA alrededor de este concepto.']],
    ['Espacio de estados', 'conjunto de todas las configuraciones posibles de un problema y las acciones que las conectan', ['Cada posición del vehículo en el patio es un estado.', 'Cada tablero posible de ajedrez es un estado.', 'La búsqueda recorre este espacio.']],
    ['Heurística', 'función que estima el costo desde un estado hasta el objetivo', ['La distancia Manhattan hasta el espacio libre.', 'La distancia en línea recta en un mapa.', 'Guía a A* hacia el objetivo.']],
    ['Heurística admisible', 'heurística que nunca sobreestima el costo real hasta el objetivo', ['Manhattan en una grilla sin diagonales.', 'La distancia en línea recta en carreteras.', 'Garantiza que A* encuentre la solución óptima.']],
    ['Algoritmo A*', 'búsqueda informada que expande el nodo con menor costo acumulado más heurística', ['Encuentra la ruta más corta explorando menos nodos que BFS.', 'Se creó para el robot Shakey en 1968.', 'Se usa en videojuegos y navegación.']],
    ['Minimax', 'algoritmo para juegos de dos jugadores que supone que el rival elige siempre su mejor jugada', ['MAX toma el máximo de los valores de sus hijos.', 'MIN toma el mínimo.', 'Se evalúa recursivamente hasta las hojas.']],
    ['Poda alfa-beta', 'optimización de minimax que descarta ramas que no pueden cambiar la decisión final', ['Deep Blue la usaba para buscar más profundo.', 'Con buen orden de jugadas duplica la profundidad alcanzable.', 'Da el mismo resultado que minimax sin poda.']],
    ['Problema de satisfacción de restricciones', 'problema definido por variables, dominios y restricciones que deben cumplirse simultáneamente', ['Asignar horarios de turnos sin choques.', 'Resolver un sudoku.', 'Se resuelve con retroceso y propagación.']]
  ],
  q: [
    ['¿Qué propuso Turing en 1950 para abordar la pregunta "¿pueden pensar las máquinas?"?', 'Un juego de imitación basado en conversaciones escritas', ['Medir la velocidad de cálculo', 'Contar las neuronas de la máquina', 'Resolver ecuaciones diferenciales'], 'Hoy se conoce como la prueba de Turing.', 2],
    ['¿Qué estrategia de búsqueda garantiza el camino con menos pasos cuando todas las acciones cuestan lo mismo?', 'Búsqueda en anchura (BFS)', ['Búsqueda en profundidad', 'Búsqueda aleatoria', 'Ascenso de colinas'], 'Explora por niveles de distancia.', 2],
    ['¿Qué condición asegura que A* encuentre la solución óptima?', 'Que la heurística sea admisible', ['Que la heurística sea cero en todos los nodos', 'Que el grafo sea un árbol', 'Que se use una pila'], 'Una heurística admisible nunca sobreestima.', 3],
    ['¿Cuál es la distancia Manhattan entre (1, 2) y (4, 6)?', '7', ['5', '25', '3'], '|4 − 1| + |6 − 2| = 3 + 4.', 1],
    ['Si se permiten movimientos diagonales con costo 1, ¿por qué Manhattan deja de ser admisible?', 'Porque puede sobreestimar el costo real', ['Porque subestima demasiado', 'Porque no se puede calcular', 'Porque A* no admite diagonales'], 'Un paso diagonal avanza en ambos ejes a la vez.', 4],
    ['¿Qué combinó AlphaGo para vencer a Lee Sedol en 2016?', 'Búsqueda de Monte Carlo en árboles con redes neuronales', ['Solo reglas escritas por expertos', 'Solo fuerza bruta', 'Un sistema experto de los años 80'], 'Silver y otros lo publicaron en Nature.', 3],
    { tf: 'La poda alfa-beta puede cambiar la jugada que elegiría minimax.', v: false, e: 'Solo descarta ramas irrelevantes; el resultado es el mismo.', l: 3 },
    { tf: 'La búsqueda de costo uniforme es esencialmente el algoritmo de Dijkstra aplicado a la búsqueda de un objetivo.', v: true, e: 'Expande el nodo de menor costo acumulado.', l: 3 },
    { c: 'Escribe «manhattan(a, b)» con la distancia Manhattan entre dos puntos [x, y].', f: 'manhattan', p: ['a', 'b'], t: [[[[0, 0], [3, 4]], 7], [[[2, 5], [2, 5]], 0], [[[-1, 3], [2, -1]], 7]], sol: '  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);', l: 1 },
    { c: 'Escribe «pasosMinimos(grilla)»: la grilla es una lista de textos donde "#" es ocupado; devuelve los pasos mínimos (4 direcciones) de la esquina superior izquierda a la inferior derecha, o −1 si no hay camino.', f: 'pasosMinimos', p: ['grilla'], t: [[[['..', '..']], 2], [[['...', '.#.', '...']], 4], [[['.#', '#.']], -1], [[['.']], 0]], sol: '  const F = grilla.length, C = grilla[0].length, d = { "0,0": 0 }, q = [[0, 0]];\n  while (q.length) {\n    const [f, c] = q.shift();\n    if (f === F - 1 && c === C - 1) return d[f + "," + c];\n    for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const x = f + a, y = c + b, k = x + "," + y;\n      if (x >= 0 && y >= 0 && x < F && y < C && grilla[x][y] !== "#" && !(k in d)) { d[k] = d[f + "," + c] + 1; q.push([x, y]); }\n    }\n  }\n  return -1;', h: 'Usa una cola y guarda la distancia de cada celda visitada.', l: 4 },
    { c: 'Escribe «minimax(nodo, esMax)»: un nodo es un número (hoja) o una lista de nodos hijos; esMax indica si juega MAX.', f: 'minimax', p: ['nodo', 'esMax'], t: [[[[[3, 5], [2, 9]], true], 3], [[[[1, [4, 6]], [7]], true], 7], [[5, true], 5], [[[[3, 5], [2, 9]], false], 5]], sol: '  if (typeof nodo === "number") return nodo;\n  const v = nodo.map(h => minimax(h, !esMax));\n  return esMax ? Math.max(...v) : Math.min(...v);', l: 3 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var a = [R.int(-5, 10), R.int(-5, 10)], b = [R.int(-5, 10), R.int(-5, 10)]; g.input(1, '¿Cuál es la distancia Manhattan entre (' + a.join(', ') + ') y (' + b.join(', ') + ')?', Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]), '|Δx| + |Δy|.'); });
    g.times(6, function (R) { var gn = R.int(1, 20), h = R.int(0, 15); g.input(2, 'En A*, un nodo tiene g = ' + gn + ' y h = ' + h + '. ¿Cuánto vale f?', gn + h, 'f = g + h.'); });
    g.times(6, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9), d = R.int(1, 9); g.input(3, 'MAX elige entre dos ramas; en la primera MIN elige entre ' + a + ' y ' + b + ', y en la segunda entre ' + c + ' y ' + d + '. ¿Qué valor obtiene MAX?', Math.max(Math.min(a, b), Math.min(c, d)), 'max(min(' + a + ', ' + b + '), min(' + c + ', ' + d + ')).'); });
    var ents = [['Ajedrez', 'Totalmente observable'], ['Póquer', 'Parcialmente observable'], ['Conducir un auto en la ciudad', 'Parcialmente observable'], ['Sudoku', 'Totalmente observable']];
    ents.forEach(function (e) { g.mcq(2, '¿Cómo es el entorno de este problema en cuanto a observabilidad? ' + e[0], e[1], [e[1] === 'Totalmente observable' ? 'Parcialmente observable' : 'Totalmente observable', 'No tiene entorno', 'Depende del lenguaje de programación'], 'En el póquer y al conducir, el agente no ve todo el estado.'); });
  },
  checks: [
    ['¿Qué es un agente racional según Russell y Norvig?', 'Un sistema que percibe su entorno y actúa para maximizar el resultado esperado según una medida de desempeño.'],
    ['Define los componentes de un problema de búsqueda para encontrar un espacio libre en el patio.', 'Estado inicial (posición del vehículo), acciones (moverse a una celda vecina libre), transición, prueba de objetivo (llegar a un espacio libre) y costo (1 por celda).'],
    ['¿Por qué A* con una heurística admisible es óptimo?', 'Porque nunca descarta un camino prometedor por sobreestimar su costo, así que el primer objetivo que extrae tiene el menor costo posible.'],
    ['¿Qué ventaja da la poda alfa-beta sobre minimax?', 'Descarta ramas que no afectan la decisión, lo que permite explorar más profundo con el mismo esfuerzo y el mismo resultado.'],
    ['¿Qué diferencia hay entre IA simbólica e IA estadística?', 'La simbólica representa el conocimiento de forma explícita (reglas, lógica, búsqueda); la estadística aprende patrones a partir de datos.']
  ],
  cites: ['Russell, S. y Norvig, P. (2021). *Artificial Intelligence: A Modern Approach* (4.ª ed.). Pearson.', 'Turing, A. (1950). Computing Machinery and Intelligence. *Mind*, 59(236).', 'Hart, P., Nilsson, N. y Raphael, B. (1968). A Formal Basis for the Heuristic Determination of Minimum Cost Paths. *IEEE Transactions on Systems Science and Cybernetics*, 4(2).', 'McCarthy, J. et al. (1955). *A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence*.', 'Silver, D. et al. (2016). Mastering the Game of Go with Deep Neural Networks and Tree Search. *Nature*, 529.'],
  project: { t: 'Buscador de rutas y jugador de un juego',
    goal: 'Implementar y comparar algoritmos de búsqueda en dos problemas clásicos.',
    steps: ['Implementa BFS, costo uniforme y A* sobre una grilla con obstáculos y costos distintos por terreno.', 'Cuenta los nodos expandidos por cada algoritmo en 20 mapas aleatorios y grafica la comparación.', 'Prueba dos heurísticas y demuestra cuál es admisible.', 'Implementa minimax con poda alfa-beta para el tres en raya o el cuatro en línea.', 'Mide cuántos nodos ahorra la poda y cómo influye el orden de las jugadas.'],
    deliver: 'El código, los gráficos de comparación y un informe con las conclusiones.' },
  hito: ['Modela la asignación de espacios del patio como un problema de búsqueda (estados, acciones, costo y objetivo) e impleméntala con BFS.', 'Agrega a PatioApp la búsqueda A* con una heurística admisible y compárala con BFS en nodos expandidos y tiempo.']
});

S('ia', 'ia.ml', { title: 'Fundamentos de aprendizaje automático',
  ask: '¿Qué concepto de aprendizaje automático se aplica?',
  lesson: `
> **La idea en simple.** En lugar de escribir a mano las reglas para predecir cuántos días estará un vehículo en el patio, le mostramos a un algoritmo miles de casos pasados y dejamos que encuentre el patrón. Lo difícil no es entrenar el modelo: es saber honestamente si funcionará con casos que nunca vio.

## Qué es aprender
Arthur Samuel, de IBM, popularizó el término *machine learning* con su programa de damas de 1959, que mejoraba jugando contra sí mismo. Tom Mitchell dio en 1997 la definición más citada: se dice que un programa **aprende** de la experiencia E respecto de una tarea T y una medida de desempeño P, si su desempeño en T, medido por P, mejora con la experiencia E. Para PatioApp: T = predecir los días de permanencia, E = el historial de unidades, P = el error promedio en días.

## Tipos de aprendizaje
- **Supervisado:** los datos tienen la respuesta correcta (etiqueta). Si la respuesta es un número, es **regresión** (días de permanencia); si es una categoría, es **clasificación** (¿la unidad será recogida tarde, sí o no?).
- **No supervisado:** no hay etiquetas; se buscan estructuras, como grupos de clientes parecidos (**agrupamiento**, por ejemplo con k-medias, el algoritmo de Stuart Lloyd de 1957).
- **Por refuerzo:** un agente aprende por prueba y error a partir de recompensas. Richard Sutton y Andrew Barto escribieron el texto de referencia, y recibieron el Premio Turing 2024 por estos fundamentos.

## Modelos clásicos
- **Regresión lineal:** ajusta una recta y = m·x + b minimizando la suma de los errores al cuadrado, el método de mínimos cuadrados publicado por Adrien-Marie Legendre en 1805 y desarrollado por Carl Friedrich Gauss.
- **Regresión logística:** a pesar del nombre, clasifica: transforma una combinación lineal en una probabilidad entre 0 y 1.
- **Vecinos más cercanos (k-NN):** analizado por Thomas Cover y Peter Hart en 1967; para clasificar un caso nuevo, busca los k casos más parecidos y vota.
- **Árboles de decisión:** como ID3 de Ross Quinlan (1986); preguntas sucesivas del tipo "¿días > 30?" que son fáciles de interpretar.
~~~js
// k vecinos más cercanos: ¿la unidad será recogida tarde?  [días de multa, deuda en miles] → etiqueta
const datos = [[[2, 0.5], 'a tiempo'], [[5, 1], 'a tiempo'], [[20, 4], 'tarde'], [[30, 6], 'tarde'], [[8, 1.5], 'a tiempo'], [[25, 3], 'tarde']];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function knn(x, k) {
  const votos = {};
  datos.map(([p, e]) => [dist(p, x), e]).sort((a, b) => a[0] - b[0]).slice(0, k).forEach(([, e]) => votos[e] = (votos[e] || 0) + 1);
  return Object.entries(votos).sort((a, b) => b[1] - a[1])[0][0];
}
console.log(knn([6, 1.2], 3), knn([22, 5], 3));
~~~

## Generalizar: entrenamiento, validación y prueba
El objetivo es **generalizar**: funcionar con datos nuevos. Por eso los datos se dividen en:
- **Entrenamiento:** para ajustar el modelo.
- **Validación:** para elegir hiperparámetros (como k en k-NN) y comparar modelos.
- **Prueba:** se usa **una sola vez**, al final, para estimar el desempeño real.
La **validación cruzada** de k pliegues divide los datos en k partes, entrena k veces dejando una parte afuera y promedia. Cuando los datos son temporales (como los ingresos al patio), hay que entrenar con el pasado y probar con el futuro, nunca mezclarlos.

## Sobreajuste y el equilibrio sesgo-varianza
Un modelo **sobreajustado** memoriza el entrenamiento, ruido incluido, y falla con datos nuevos: error bajo en entrenamiento y alto en validación. Un modelo **subajustado** es demasiado simple y falla en ambos. El **error de generalización** se descompone en sesgo (suposiciones demasiado simples), varianza (sensibilidad excesiva a los datos de entrenamiento) y ruido irreducible. Remedios del sobreajuste: más datos, modelos más simples, **regularización** (penalizar los parámetros grandes) y detener el entrenamiento a tiempo.

## Medir bien: la matriz de confusión
En clasificación binaria se cuentan verdaderos positivos (VP), falsos positivos (FP), falsos negativos (FN) y verdaderos negativos (VN):
| Métrica | Fórmula | Pregunta que responde |
| Exactitud | (VP + VN) / total | ¿qué fracción acierta? |
| Precisión | VP / (VP + FP) | de lo que marqué como positivo, ¿cuánto lo era? |
| Exhaustividad (*recall*) | VP / (VP + FN) | de los positivos reales, ¿cuántos encontré? |
| F1 | 2·P·R / (P + R) | equilibrio entre precisión y exhaustividad |
La **paradoja de la exactitud**: si solo el 2% de las unidades se abandona, un modelo que siempre dice "no se abandona" tiene 98% de exactitud y no sirve para nada. En problemas desbalanceados se miran precisión, exhaustividad y F1, y se compara siempre contra una **línea base** simple.

## Errores que arruinan modelos
Pedro Domingos resumió en 2012, en *A Few Useful Things to Know about Machine Learning*, lecciones que los cursos suelen omitir:
- **Más datos suelen ganarle a un algoritmo más ingenioso.**
- **La ingeniería de atributos** (elegir y transformar las variables de entrada) es donde está buena parte del trabajo.
- **Fuga de datos:** si una variable de entrada contiene información del futuro o de la respuesta (por ejemplo, la "fecha de salida" para predecir los días de permanencia), el modelo parecerá excelente en pruebas y fallará en producción.
- **Correlación no es causalidad:** un modelo predictivo no dice qué pasaría si cambias una variable.
David Wolpert demostró en 1996 los teoremas de **no hay almuerzo gratis**: promediado sobre todos los problemas posibles, ningún algoritmo de aprendizaje es mejor que otro; la elección depende de las suposiciones que encajan con el problema.

## Ejemplo resuelto: evaluar un clasificador de abandono
De 1000 unidades de prueba, 50 fueron abandonadas. El modelo marcó 60 como "abandono", de las cuales 40 lo eran. Entonces VP = 40, FP = 20, FN = 10, VN = 930. Exactitud = 970/1000 = 97%; precisión = 40/60 ≈ 0.67; exhaustividad = 40/50 = 0.80; F1 ≈ 0.73. La línea base "nunca abandona" tiene 95% de exactitud y exhaustividad 0: el modelo sí aporta, y la conversación con el negocio será si es más caro llamar a 20 clientes de más (FP) o perder 10 abandonos (FN).`,
  links: [['mat2.stat', 'la estadística y la probabilidad son la base del aprendizaje automático'], ['mat2.lin', 'los modelos se representan con vectores y matrices'], ['eco.exp', 'evaluar un modelo es diseñar un experimento sin engañarse']],
  read: 'Mitchell, *Machine Learning*, capítulo 1; Domingos (2012); apuntes de Stanford CS229; Géron, *Hands-On Machine Learning*, capítulos 1 a 4.',
  terms: [
    ['Aprendizaje supervisado', 'aprendizaje a partir de ejemplos que incluyen la respuesta correcta', ['Predices días de permanencia con historial etiquetado.', 'Clasificas correos como spam o no.', 'Incluye regresión y clasificación.']],
    ['Sobreajuste', 'situación en que el modelo memoriza el entrenamiento y falla con datos nuevos', ['Error de entrenamiento 1% y de validación 30%.', 'Un árbol de decisión muy profundo.', 'Se combate con regularización y más datos.']],
    ['Conjunto de prueba', 'datos reservados que se usan una sola vez al final para estimar el desempeño real', ['No se usan para elegir hiperparámetros.', 'Si se reutilizan, la estimación se vuelve optimista.', 'Con datos temporales, deben ser los más recientes.']],
    ['Validación cruzada', 'técnica que entrena y evalúa varias veces rotando qué parte de los datos se deja afuera', ['Con 5 pliegues se entrena 5 veces.', 'Da una estimación más estable con pocos datos.', 'Sirve para elegir hiperparámetros.']],
    ['Precisión', 'fracción de los casos marcados como positivos que realmente lo eran', ['De 60 alertas, 40 eran reales: 0.67.', 'Importa cuando las falsas alarmas son caras.', 'Se calcula como VP / (VP + FP).']],
    ['Exhaustividad', 'fracción de los positivos reales que el modelo encontró', ['De 50 abandonos reales encontraste 40: 0.80.', 'Importa cuando perder un positivo es grave.', 'Se calcula como VP / (VP + FN).']],
    ['Fuga de datos', 'uso en el entrenamiento de información que no estaría disponible al momento de predecir', ['Usar la fecha de salida para predecir la permanencia.', 'El modelo parece perfecto y falla en producción.', 'Se evita revisando cuándo se conoce cada variable.']],
    ['Línea base', 'modelo trivial contra el que se compara cualquier modelo para saber si aporta', ['Predecir siempre la clase mayoritaria.', 'Predecir el promedio histórico.', 'Si no la superas, el modelo no sirve.']]
  ],
  q: [
    ['Según la definición de Mitchell, ¿qué tres elementos definen un problema de aprendizaje?', 'Una tarea, una medida de desempeño y una experiencia', ['Un lenguaje, un compilador y datos', 'Entradas, salidas y memoria', 'Hardware, software y usuarios'], 'Aprende si el desempeño en la tarea mejora con la experiencia.', 2],
    ['Quieres predecir cuántos días estará una unidad en el patio. ¿Qué tipo de problema es?', 'Regresión supervisada', ['Clasificación', 'Agrupamiento', 'Aprendizaje por refuerzo'], 'La respuesta es un número y hay historial etiquetado.', 2],
    ['Un modelo tiene 99% de exactitud en entrenamiento y 70% en validación. ¿Qué ocurre?', 'Sobreajuste', ['Subajuste', 'Fuga de datos garantizada', 'Funciona perfectamente'], 'La brecha entre entrenamiento y validación es la señal.', 3],
    ['VP = 30, FP = 10, FN = 20. ¿Cuál es la precisión?', '0.75', ['0.60', '0.50', '0.40'], '30 / (30 + 10).', 2],
    ['Con los mismos valores, ¿cuál es la exhaustividad?', '0.60', ['0.75', '0.50', '0.30'], '30 / (30 + 20).', 2],
    ['Solo el 1% de los cobros son fraude y un modelo que siempre dice "no fraude" tiene 99% de exactitud. ¿Qué ilustra?', 'La paradoja de la exactitud en datos desbalanceados', ['Que el modelo es excelente', 'Sobreajuste', 'Que la exactitud es la mejor métrica'], 'Hay que mirar precisión, exhaustividad y F1.', 3],
    ['Para predecir la permanencia usas como entrada la fecha de salida. ¿Qué error es?', 'Fuga de datos', ['Subajuste', 'Regularización', 'Validación cruzada'], 'Esa información no existe al momento de predecir.', 3],
    { tf: 'El conjunto de prueba puede usarse varias veces para ajustar hiperparámetros sin problema.', v: false, e: 'Para eso está la validación; reutilizar la prueba da estimaciones optimistas.', l: 2 },
    { tf: 'En datos temporales conviene entrenar con el pasado y probar con el futuro.', v: true, e: 'Así se simula el uso real y se evita la fuga.', l: 3 },
    { c: 'Escribe «metricas(vp, fp, fn)» que devuelva [precision, exhaustividad, f1] redondeados a 2 decimales.', f: 'metricas', p: ['vp', 'fp', 'fn'], t: [[[8, 2, 2], [0.8, 0.8, 0.8]], [[9, 1, 3], [0.9, 0.75, 0.82]], [[5, 5, 0], [0.5, 1, 0.67]]], sol: '  const p = vp / (vp + fp), r = vp / (vp + fn), f = 2 * p * r / (p + r), z = x => Math.round(x * 100) / 100;\n  return [z(p), z(r), z(f)];', l: 2 },
    { c: 'Escribe «regresionLineal(xs, ys)» con mínimos cuadrados; devuelve [m, b] de y = m·x + b, redondeados a 2 decimales.', f: 'regresionLineal', p: ['xs', 'ys'], t: [[[[1, 2, 3], [2, 4, 6]], [2, 0]], [[[0, 1, 2, 3], [1, 3, 5, 7]], [2, 1]], [[[1, 2, 3, 4], [2, 3, 5, 6]], [1.4, 0.5]]], sol: '  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;\n  let sxy = 0, sxx = 0;\n  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }\n  const m = sxy / sxx, z = v => Math.round(v * 100) / 100;\n  return [z(m), z(my - m * mx)];', h: 'm = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)² y b = ȳ − m·x̄.', l: 4 },
    { c: 'Escribe «knn(puntos, etiquetas, x, k)»: clasifica x por votación de los k puntos más cercanos (distancia euclidiana).', f: 'knn', p: ['puntos', 'etiquetas', 'x', 'k'], t: [[[[[0, 0], [1, 0], [5, 5], [6, 5]], ['a', 'a', 'b', 'b'], [0.5, 0.2], 3], 'a'], [[[[0, 0], [1, 0], [5, 5], [6, 5]], ['a', 'a', 'b', 'b'], [5.5, 5], 3], 'b'], [[[[0, 0], [10, 10]], ['x', 'y'], [9, 9], 1], 'y']], sol: '  const v = {};\n  puntos.map((p, i) => [Math.hypot(p[0] - x[0], p[1] - x[1]), etiquetas[i]]).sort((a, b) => a[0] - b[0]).slice(0, k).forEach(([, e]) => v[e] = (v[e] || 0) + 1);\n  return Object.keys(v).sort((a, b) => v[b] - v[a])[0];', l: 3 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var vp = R.int(5, 60), fp = R.int(1, 30), fn = R.int(1, 30), p = vp / (vp + fp), r = vp / (vp + fn); var cual = R.pick(['precisión', 'exhaustividad', 'F1']), v = cual === 'precisión' ? p : cual === 'exhaustividad' ? r : 2 * p * r / (p + r); g.input(3, 'Con VP = ' + vp + ', FP = ' + fp + ' y FN = ' + fn + ', ¿cuál es la ' + cual + '? Redondea a 2 decimales.', v.toFixed(2), 'Precisión = VP/(VP+FP); exhaustividad = VP/(VP+FN); F1 = 2PR/(P+R).'); });
    var tipos = [['Predecir el precio de venta de una unidad abandonada', 'Regresión'], ['Decidir si un cliente pagará a tiempo, sí o no', 'Clasificación'], ['Agrupar clientes según su comportamiento sin etiquetas', 'Agrupamiento'], ['Un robot aprende a estacionar recibiendo recompensas', 'Aprendizaje por refuerzo'], ['Predecir la cantidad de ingresos de la próxima semana', 'Regresión'], ['Detectar si una foto muestra daños en el vehículo', 'Clasificación']];
    tipos.forEach(function (t) { g.mcq(2, '¿Qué tipo de problema de aprendizaje es este? ' + t[0], t[1], ['Regresión', 'Clasificación', 'Agrupamiento', 'Aprendizaje por refuerzo'].filter(function (x) { return x !== t[1]; }), 'Número → regresión; categoría → clasificación; sin etiquetas → agrupamiento; recompensas → refuerzo.'); });
    var diag = [['Error de entrenamiento 2% y de validación 25%', 'Sobreajuste'], ['Error de entrenamiento 30% y de validación 31%', 'Subajuste'], ['Error de entrenamiento 5% y de validación 6%', 'Buen ajuste']];
    diag.forEach(function (d) { g.mcq(3, '¿Qué diagnóstico corresponde? ' + d[0], d[1], ['Sobreajuste', 'Subajuste', 'Buen ajuste', 'Fuga de datos'].filter(function (x) { return x !== d[1]; }), 'Se comparan los errores de entrenamiento y validación.'); });
  },
  checks: [
    ['Formula con la definición de Mitchell el problema de predecir la permanencia de unidades.', 'Tarea: predecir los días de permanencia; desempeño: error promedio en días; experiencia: historial de unidades con su permanencia real.'],
    ['¿Para qué sirve cada conjunto: entrenamiento, validación y prueba?', 'Entrenamiento para ajustar, validación para elegir hiperparámetros y modelos, prueba para estimar una sola vez el desempeño final.'],
    ['¿Cómo reconoces el sobreajuste y cómo lo combates?', 'Error bajo en entrenamiento y alto en validación; se combate con más datos, modelos más simples, regularización y detención temprana.'],
    ['¿Por qué la exactitud engaña con datos desbalanceados?', 'Porque un modelo que siempre predice la clase mayoritaria obtiene una exactitud alta sin detectar ningún positivo.'],
    ['Da un ejemplo de fuga de datos en PatioApp.', 'Usar como entrada la fecha de salida o el monto final cobrado para predecir cuántos días estará una unidad.']
  ],
  cites: ['Mitchell, T. (1997). *Machine Learning*. McGraw-Hill.', 'Samuel, A. (1959). Some Studies in Machine Learning Using the Game of Checkers. *IBM Journal of Research and Development*, 3(3).', 'Domingos, P. (2012). A Few Useful Things to Know about Machine Learning. *Communications of the ACM*, 55(10).', 'Cover, T. y Hart, P. (1967). Nearest Neighbor Pattern Classification. *IEEE Transactions on Information Theory*, 13(1).', 'Wolpert, D. (1996). The Lack of A Priori Distinctions Between Learning Algorithms. *Neural Computation*, 8(7).', 'Sutton, R. y Barto, A. (2018). *Reinforcement Learning: An Introduction* (2.ª ed.). MIT Press.'],
  project: { t: 'Modelo predictivo evaluado con rigor',
    goal: 'Construir un modelo de aprendizaje supervisado y evaluarlo como lo haría un profesional.',
    steps: ['Elige un conjunto de datos público (por ejemplo, de la Plataforma Nacional de Datos Abiertos del Perú) y define tarea, experiencia y medida de desempeño.', 'Divide los datos en entrenamiento, validación y prueba respetando el orden temporal si existe.', 'Implementa una línea base, regresión lineal o logística y k-NN, y compáralos en validación.', 'Revisa posibles fugas de datos y analiza los errores más grandes.', 'Evalúa una sola vez en prueba e informa precisión, exhaustividad y F1 o el error medio, con sus limitaciones.'],
    deliver: 'El cuaderno o código, las métricas comparadas y un informe con limitaciones y riesgos.' },
  hito: ['Prepara el historial de PatioApp para predecir los días de permanencia: define tarea, experiencia y desempeño, y divide los datos respetando el tiempo.', 'Entrena una línea base, una regresión lineal y un k-NN para la permanencia, compáralos en validación y reporta el resultado final en prueba.']
});

S('ia', 'ia.nn', { title: 'Redes neuronales y aprendizaje profundo',
  ask: '¿Qué concepto de redes neuronales se aplica?',
  lesson: `
> **La idea en simple.** Una red neuronal es una función con muchos parámetros ajustables, organizada en capas de unidades simples que suman entradas ponderadas y aplican una pequeña transformación. Entrenarla es ajustar esos parámetros poco a poco para reducir el error. Con suficientes datos y cómputo, ese procedimiento sencillo aprende a reconocer imágenes, traducir idiomas y escribir código.

## De la neurona artificial al perceptrón
Warren McCulloch y Walter Pitts propusieron en 1943 un modelo matemático de neurona: suma entradas binarias ponderadas y se activa si superan un umbral. Frank Rosenblatt construyó en 1958 el **perceptrón**, que *aprendía* los pesos a partir de ejemplos: si se equivoca, ajusta cada peso en proporción a la entrada y al error.
:::flow salida = 1 si w·x + b > 0, si no 0 | w ← w + η·(y − salida)·x
En 1969, Marvin Minsky y Seymour Papert demostraron en *Perceptrons* que un perceptrón de una capa no puede aprender funciones que no son linealmente separables, como el **O exclusivo** (XOR). La investigación en redes perdió financiamiento durante años.

## Redes multicapa y retropropagación
La solución era agregar **capas ocultas** con funciones de activación no lineales, pero faltaba una forma eficiente de entrenarlas. David Rumelhart, Geoffrey Hinton y Ronald Williams popularizaron en 1986, en *Nature*, el algoritmo de **retropropagación**: calcula cómo contribuye cada peso al error aplicando la regla de la cadena del cálculo desde la salida hacia atrás, y luego ajusta todos los pesos con **descenso de gradiente**:
:::flow peso ← peso − η · ∂pérdida/∂peso
- La **función de pérdida** mide el error (error cuadrático medio en regresión, entropía cruzada en clasificación).
- La **tasa de aprendizaje** η controla el tamaño del paso: muy grande diverge, muy pequeña tarda una eternidad.
- Una **época** es una pasada completa por los datos; en la práctica se usan **minilotes** (descenso de gradiente estocástico).
George Cybenko demostró en 1989 el **teorema de aproximación universal**: una red con una sola capa oculta suficientemente grande puede aproximar cualquier función continua en un dominio acotado. El teorema dice que la red *existe*, no que sea fácil encontrarla ni que generalice bien.

## Funciones de activación
| Función | Fórmula | Uso |
| Escalón | 1 si x > 0, si no 0 | perceptrón original; no sirve para gradientes |
| Sigmoide | 1 / (1 + e⁻ˣ) | salida como probabilidad en clasificación binaria |
| ReLU | max(0, x) | capas ocultas; acelera el entrenamiento (Nair y Hinton, 2010) |
| Softmax | eˣⁱ / Σ eˣʲ | salida como distribución de probabilidad entre varias clases |
~~~js
// Un perceptrón aprende la función Y lógica
const datos = [[[0, 0], 0], [[0, 1], 0], [[1, 0], 0], [[1, 1], 1]];
let w = [0, 0], b = 0;
const pred = x => (w[0] * x[0] + w[1] * x[1] + b > 0 ? 1 : 0);
for (let epoca = 0; epoca < 20; epoca++)
  for (const [x, y] of datos) { const e = y - pred(x); w = [w[0] + 0.1 * e * x[0], w[1] + 0.1 * e * x[1]]; b += 0.1 * e; }
console.log('pesos', w.map(v => v.toFixed(1)), 'sesgo', b.toFixed(1), 'predicciones', datos.map(([x]) => pred(x)));
// Prueba a cambiar las etiquetas por XOR (0, 1, 1, 0): nunca converge, como demostraron Minsky y Papert.
~~~

## El aprendizaje profundo
Tres factores hicieron despegar a las redes de muchas capas después de 2010: grandes conjuntos de datos etiquetados, el cómputo en **GPU** y mejoras de entrenamiento (ReLU, inicialización, regularización por *dropout*). En 2012, **AlexNet**, de Alex Krizhevsky, Ilya Sutskever y Geoffrey Hinton, redujo drásticamente el error en la competencia ImageNet y cambió el campo. Yoshua Bengio, Geoffrey Hinton y Yann LeCun recibieron el Premio Turing 2018 por estos avances; Hinton recibió además el Nobel de Física 2024 junto con John Hopfield. Arquitecturas importantes:
- **Redes convolucionales (CNN):** Yann LeCun las aplicó desde 1989 a la lectura de dígitos escritos a mano; filtros que recorren la imagen detectan bordes, luego formas y luego objetos.
- **Redes recurrentes y LSTM:** Sepp Hochreiter y Jürgen Schmidhuber propusieron en 1997 la LSTM para procesar secuencias recordando información a largo plazo.
- **Transformers:** Ashish Vaswani y sus coautores de Google publicaron en 2017 *Attention Is All You Need*. El mecanismo de **atención** permite que cada palabra de una secuencia considere directamente a todas las demás, y se entrena de forma muy paralela. Es la base de los grandes modelos de lenguaje como GPT, Claude o Gemini.

## Representaciones y modelos de lenguaje
Las redes aprenden **representaciones**: vectores (llamados *embeddings*) donde los conceptos parecidos quedan cerca. Un modelo de lenguaje se entrena para predecir el siguiente fragmento de texto (*token*) a partir de enormes cantidades de texto, y luego se ajusta con instrucciones y retroalimentación humana. Para un ingeniero de software importa entender sus límites: generan texto plausible que puede ser incorrecto, son sensibles a la forma de la pregunta y su costo y latencia dependen de la cantidad de tokens. Por eso se combinan con recuperación de documentos, herramientas y verificación automática.

## Cuándo usar una red neuronal
Ian Goodfellow, Yoshua Bengio y Aaron Courville explican en *Deep Learning* (2016) que las redes brillan con datos de alta dimensión y estructura (imágenes, audio, texto) y grandes volúmenes. Con datos tabulares pequeños, como muchas tablas de negocio, los modelos más simples o los árboles potenciados suelen igualarlas o superarlas, con menos costo y más interpretabilidad. La regla de ingeniería: empezar por la línea base y escalar la complejidad solo si los datos lo justifican.

## Ejemplo resuelto: una neurona sigmoide a mano
Una neurona tiene pesos w = (0.5, −1), sesgo b = 0.2 y recibe x = (2, 1). Suma ponderada: 0.5·2 + (−1)·1 + 0.2 = 0.2. Activación sigmoide: 1 / (1 + e^(−0.2)) ≈ 0.55. Si la etiqueta era 1 y la pérdida es el error cuadrático (y − ŷ)²/2, el gradiente respecto de w₁ es −(1 − 0.55)·0.55·(1 − 0.55)·2 ≈ −0.22. Con η = 0.5, el nuevo w₁ = 0.5 + 0.5·0.22 ≈ 0.61: el peso sube para que la próxima vez la salida se acerque a 1. La retropropagación hace exactamente esto, para millones de pesos a la vez.`,
  links: [['ia.ml', 'las redes neuronales son modelos de aprendizaje supervisado con muchos parámetros'], ['mat2.calc', 'el descenso de gradiente usa derivadas y la regla de la cadena'], ['mat2.lin', 'cada capa es una multiplicación de matriz por vector']],
  read: 'Goodfellow, Bengio y Courville, capítulos 6 a 8; Rumelhart, Hinton y Williams (1986); Vaswani y otros (2017); apuntes de Stanford CS231n.',
  terms: [
    ['Perceptrón', 'neurona artificial que suma entradas ponderadas, aplica un umbral y ajusta sus pesos cuando se equivoca', ['Aprende la función Y lógica.', 'Rosenblatt lo construyó en 1958.', 'No puede aprender XOR.']],
    ['Función de activación', 'transformación no lineal que se aplica a la suma ponderada de una neurona', ['ReLU devuelve max(0, x).', 'La sigmoide da valores entre 0 y 1.', 'Sin ella, varias capas equivalen a una sola.']],
    ['Retropropagación', 'algoritmo que calcula el gradiente del error respecto de cada peso aplicando la regla de la cadena hacia atrás', ['Rumelhart, Hinton y Williams lo popularizaron en 1986.', 'Permite entrenar redes con capas ocultas.', 'Lo usan todas las bibliotecas de aprendizaje profundo.']],
    ['Descenso de gradiente', 'método que ajusta los parámetros en dirección contraria al gradiente para reducir la pérdida', ['Cada paso resta η por la derivada.', 'Con minilotes se llama estocástico.', 'Una tasa muy grande lo hace diverger.']],
    ['Tasa de aprendizaje', 'hiperparámetro que fija el tamaño de cada paso del descenso de gradiente', ['Con 10, la pérdida explota.', 'Con 0.000001, el entrenamiento no avanza.', 'Se ajusta con el conjunto de validación.']],
    ['Red convolucional', 'red que aplica filtros que recorren la entrada para detectar patrones locales, típica en imágenes', ['Detecta daños en fotos de vehículos.', 'LeCun la aplicó a dígitos escritos a mano.', 'AlexNet era una red de este tipo.']],
    ['Transformer', 'arquitectura basada en mecanismos de atención que relacionan cada elemento de una secuencia con todos los demás', ['Es la base de los modelos de lenguaje actuales.', 'Se entrena de forma muy paralela.', 'Vaswani y otros la propusieron en 2017.']],
    ['Embedding', 'vector aprendido que representa un elemento de modo que los elementos parecidos quedan cerca', ['Las palabras "auto" y "vehículo" quedan cerca.', 'Permite buscar documentos por significado.', 'Lo producen las capas internas de una red.']]
  ],
  q: [
    ['¿Qué demostraron Minsky y Papert en 1969?', 'Que un perceptrón de una capa no puede aprender funciones no separables linealmente como XOR', ['Que las redes neuronales son imposibles', 'Que la retropropagación no funciona', 'Que las GPU son necesarias'], 'Hacían falta capas ocultas.', 3],
    ['¿Qué aporta la retropropagación?', 'Una forma eficiente de calcular el gradiente del error respecto de todos los pesos', ['Datos de entrenamiento nuevos', 'Una función de activación', 'Un tipo de GPU'], 'Aplica la regla de la cadena desde la salida hacia atrás.', 3],
    ['¿Qué ocurre si la tasa de aprendizaje es demasiado grande?', 'La pérdida puede oscilar o diverger', ['El entrenamiento es más preciso', 'La red se vuelve lineal', 'No cambia nada'], 'Los pasos saltan por encima del mínimo.', 2],
    ['¿Cuánto vale ReLU(−3)?', '0', ['−3', '3', '1'], 'max(0, −3) = 0.', 1],
    ['¿Cuánto vale la sigmoide en 0?', '0.5', ['0', '1', '−1'], '1 / (1 + e⁰) = 1/2.', 1],
    ['¿Qué arquitectura propusieron Vaswani y otros en 2017?', 'El transformer, basado en atención', ['La red convolucional', 'El perceptrón', 'La LSTM'], 'Es la base de los grandes modelos de lenguaje.', 2],
    ['Tienes una tabla de 2000 filas con datos de clientes. ¿Qué conviene probar primero?', 'Una línea base y modelos simples antes de una red profunda', ['Un transformer gigante', 'Una red convolucional', 'No usar datos'], 'Con datos tabulares pequeños las redes rara vez ganan.', 3],
    { tf: 'Sin funciones de activación no lineales, una red de muchas capas equivale a una sola transformación lineal.', v: true, e: 'La composición de funciones lineales es lineal.', l: 3 },
    { tf: 'El teorema de aproximación universal garantiza que entrenar una red siempre encontrará la mejor función.', v: false, e: 'Dice que la red existe, no que el entrenamiento la encuentre ni que generalice.', l: 4 },
    { c: 'Escribe «neurona(pesos, x, sesgo)» con activación escalón: 1 si la suma ponderada más el sesgo es mayor que 0, si no 0.', f: 'neurona', p: ['pesos', 'x', 'sesgo'], t: [[[[0.5, 0.5], [1, 1], -0.7], 1], [[[0.5, 0.5], [1, 0], -0.7], 0], [[[1, -1], [2, 3], 0], 0]], sol: '  return pesos.reduce((s, w, i) => s + w * x[i], sesgo) > 0 ? 1 : 0;', l: 1 },
    { c: 'Escribe «softmax(v)» redondeando cada valor a 4 decimales.', f: 'softmax', p: ['v'], t: [[[[1, 2, 3]], [0.09, 0.2447, 0.6652]], [[[0, 0]], [0.5, 0.5]], [[[5]], [1]]], sol: '  const m = Math.max(...v), e = v.map(x => Math.exp(x - m)), s = e.reduce((a, b) => a + b);\n  return e.map(x => Math.round(x / s * 10000) / 10000);', h: 'Resta el máximo antes de exponenciar para evitar desbordes numéricos.', l: 3 },
    { c: 'Escribe «entrenarPerceptron(datos, epocas, tasa)»: datos es una lista de [[x1, x2], y]; empieza con pesos y sesgo en 0, aplica la regla del perceptrón y devuelve la lista de predicciones finales para los mismos datos.', f: 'entrenarPerceptron', p: ['datos', 'epocas', 'tasa'], t: [[[[[[0, 0], 0], [[0, 1], 0], [[1, 0], 0], [[1, 1], 1]], 20, 0.1], [0, 0, 0, 1]], [[[[[0, 0], 0], [[0, 1], 1], [[1, 0], 1], [[1, 1], 1]], 20, 0.1], [0, 1, 1, 1]]], sol: '  let w = [0, 0], b = 0;\n  const p = x => (w[0] * x[0] + w[1] * x[1] + b > 0 ? 1 : 0);\n  for (let e = 0; e < epocas; e++) for (const [x, y] of datos) { const d = y - p(x); w = [w[0] + tasa * d * x[0], w[1] + tasa * d * x[1]]; b += tasa * d; }\n  return datos.map(([x]) => p(x));', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var w = [R.pick([-1, -0.5, 0.5, 1, 2]), R.pick([-1, -0.5, 0.5, 1, 2])], x = [R.int(-2, 3), R.int(-2, 3)], b = R.pick([-1, -0.5, 0, 0.5, 1]), s = w[0] * x[0] + w[1] * x[1] + b; g.input(2, 'Una neurona tiene pesos (' + w.join(', ') + '), sesgo ' + b + ' y recibe (' + x.join(', ') + '). ¿Cuál es su suma ponderada más el sesgo?', s, w[0] + '·' + x[0] + ' + ' + w[1] + '·' + x[1] + ' + ' + b + ' = ' + s + '.'); g.input(2, 'Con esa suma (' + s + '), ¿qué devuelve ReLU?', Math.max(0, s), 'ReLU(x) = max(0, x).'); });
    g.times(5, function (R) { var x = R.pick([-2, -1, 0, 1, 2, 3]); g.input(3, '¿Cuánto vale la sigmoide en ' + x + '? Redondea a 4 decimales.', (1 / (1 + Math.exp(-x))).toFixed(4), '1 / (1 + e^(' + (-x) + ')).'); });
    g.times(5, function (R) { var w = R.int(-5, 5) / 10 + 1, grad = R.int(-10, 10) / 10, eta = R.pick([0.1, 0.5, 1]); g.input(3, 'Un peso vale ' + w.toFixed(1) + ', el gradiente de la pérdida respecto de él es ' + grad + ' y la tasa de aprendizaje es ' + eta + '. ¿Cuál es el nuevo peso? Redondea a 2 decimales.', (w - eta * grad).toFixed(2), w.toFixed(1) + ' − ' + eta + '·' + grad + '.'); });
  },
  checks: [
    ['¿Por qué el perceptrón de una capa no puede aprender XOR?', 'Porque XOR no es linealmente separable: ninguna recta separa los casos 1 de los casos 0.'],
    ['Explica en una frase qué hace la retropropagación.', 'Calcula, con la regla de la cadena desde la salida hacia atrás, cuánto contribuye cada peso al error para ajustarlo con descenso de gradiente.'],
    ['¿Qué tres factores impulsaron el aprendizaje profundo después de 2010?', 'Grandes conjuntos de datos etiquetados, cómputo en GPU y mejoras de entrenamiento como ReLU y dropout.'],
    ['¿Qué limitaciones de los modelos de lenguaje debe tener en cuenta un ingeniero?', 'Pueden generar respuestas plausibles pero incorrectas, son sensibles a la redacción y su costo y latencia crecen con los tokens; hay que verificar sus resultados.'],
    ['¿Cuándo no conviene usar una red neuronal?', 'Con datos tabulares pequeños o cuando la interpretabilidad es crucial, donde modelos más simples suelen igualarla con menos costo.']
  ],
  cites: ['Goodfellow, I., Bengio, Y. y Courville, A. (2016). *Deep Learning*. MIT Press.', 'Rosenblatt, F. (1958). The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain. *Psychological Review*, 65(6).', 'Minsky, M. y Papert, S. (1969). *Perceptrons*. MIT Press.', 'Rumelhart, D., Hinton, G. y Williams, R. (1986). Learning Representations by Back-Propagating Errors. *Nature*, 323.', 'Krizhevsky, A., Sutskever, I. y Hinton, G. (2012). ImageNet Classification with Deep Convolutional Neural Networks. *NeurIPS*.', 'Vaswani, A. et al. (2017). Attention Is All You Need. *NeurIPS*.', 'Hochreiter, S. y Schmidhuber, J. (1997). Long Short-Term Memory. *Neural Computation*, 9(8).'],
  project: { t: 'Red neuronal desde cero',
    goal: 'Entender el aprendizaje profundo implementando una red pequeña sin bibliotecas especializadas.',
    steps: ['Implementa un perceptrón y verifica que aprende Y y O pero no XOR.', 'Implementa una red de dos capas con sigmoide o ReLU y retropropagación, y entrénala para XOR.', 'Grafica la pérdida por época con tres tasas de aprendizaje distintas y explica lo que observas.', 'Entrena tu red con un conjunto pequeño (por ejemplo, dígitos de 8×8) y mide la exactitud en prueba.', 'Compara con un modelo simple (k-NN o regresión logística) en exactitud y tiempo de entrenamiento.'],
    deliver: 'El código, los gráficos de pérdida y un informe comparativo.' },
  hito: ['Entrena una red neuronal pequeña para predecir la permanencia de las unidades de PatioApp y compárala con los modelos del hito anterior.', 'Documenta en un ADR si PatioApp usará la red o un modelo más simple, considerando error, costo de operación e interpretabilidad.']
});

S('ia', 'ia.data', { title: 'Ingeniería de datos y operación de modelos',
  ask: '¿Qué concepto de ingeniería de datos se aplica?',
  lesson: `
> **La idea en simple.** Los modelos y los reportes son tan buenos como los datos que los alimentan. La ingeniería de datos construye las tuberías que recogen, limpian, organizan y entregan datos confiables a tiempo; la operación de modelos se asegura de que un modelo que funcionaba en el laboratorio siga funcionando en producción.

## Transacciones y análisis
Las bases de datos de una aplicación están optimizadas para **OLTP** (*online transaction processing*): muchas operaciones pequeñas, como registrar un ingreso o un cobro. Las preguntas del negocio ("¿cuánto facturamos por patio y por mes en los últimos tres años?") son **OLAP** (*online analytical processing*): pocas consultas que recorren millones de filas. Hacerlas sobre la base transaccional la vuelve lenta para los usuarios, por eso se copian los datos a un sistema analítico.

## Almacenes de datos
Bill Inmon definió en *Building the Data Warehouse* (1992) el **almacén de datos** como una colección de datos orientada a temas, integrada, no volátil y variable en el tiempo, que sirve de apoyo a las decisiones. Ralph Kimball propuso en *The Data Warehouse Toolkit* (1996) el **modelado dimensional**:
- Una tabla de **hechos** registra eventos medibles (cada estadía en el patio, con días y monto).
- Las tablas de **dimensiones** describen el contexto (fecha, patio, cliente, tipo de vehículo).
- El resultado es un **esquema en estrella**, fácil de entender y rápido de consultar.
Las dimensiones que cambian (un cliente que se muda) se manejan con técnicas como la **dimensión lentamente cambiante de tipo 2**, que guarda una fila por cada versión con fechas de vigencia. Los almacenes modernos guardan los datos por **columnas**, lo que acelera las sumas y los filtros sobre pocas columnas.

## ETL y ELT
- **ETL** (extraer, transformar, cargar): los datos se limpian y transforman antes de cargarlos en el almacén.
- **ELT**: se cargan crudos en un almacén o **lago de datos** potente y se transforman allí con SQL. Es la tendencia actual en la nube.
Un buen pipeline es **idempotente** (ejecutarlo dos veces da el mismo resultado), **incremental** (procesa solo lo nuevo), está **orquestado** (dependencias y reintentos automáticos) y tiene **controles de calidad**: completitud (¿faltan filas?), unicidad (¿hay duplicados?), validez (¿las placas tienen formato correcto?), consistencia y puntualidad.
~~~js
// Un paso de transformación con controles de calidad
const crudos = [{ placa: 'ABC-123', dias: 4 }, { placa: 'abc-123', dias: 4 }, { placa: 'XYZ-9', dias: -2 }, { placa: 'DEF-456', dias: null }, { placa: 'GHI-789', dias: 12 }];
const valida = r => /^[A-Z0-9]{3}-[0-9]{3}$/.test(r.placa) && Number.isInteger(r.dias) && r.dias >= 0;
const normal = crudos.map(r => ({ ...r, placa: r.placa.toUpperCase() }));
const vistos = new Set(), limpios = [], rechazados = [];
for (const r of normal) { if (!valida(r) || vistos.has(r.placa)) rechazados.push(r); else { vistos.add(r.placa); limpios.push(r); } }
console.log('limpios', limpios.length, 'rechazados', rechazados.length, '→ tasa de calidad', (100 * limpios.length / crudos.length).toFixed(0) + '%');
~~~

## Procesamiento masivo: de MapReduce a Spark
Jeffrey Dean y Sanjay Ghemawat, de Google, publicaron en 2004 **MapReduce**: el programador escribe una función *map* que transforma cada registro en pares clave-valor y una función *reduce* que combina los valores de cada clave; el sistema se encarga de repartir el trabajo entre miles de máquinas y de tolerar sus fallas. Hadoop fue su implementación de código abierto. Matei Zaharia y sus coautores de Berkeley crearon **Spark** (2010), que mantiene los datos en memoria entre pasos y resultó mucho más rápido para algoritmos iterativos como los de aprendizaje automático.

## Flujos de datos en tiempo real
Jay Kreps y sus colegas de LinkedIn crearon **Kafka** (publicado en 2011): un registro distribuido de eventos, ordenado y persistente, al que muchos sistemas escriben y del que muchos leen a su propio ritmo. Permite procesar datos en **flujo** (cada evento apenas ocurre) en lugar de en **lotes** (todo junto cada noche). Martin Kleppmann explica en *Designing Data-Intensive Applications* (2017) cómo estos registros de eventos unifican bases de datos, cachés, índices y análisis.

## La deuda técnica de los sistemas de aprendizaje automático
D. Sculley y sus coautores de Google publicaron en 2015 *Hidden Technical Debt in Machine Learning Systems*. Su figura más citada muestra que el código del modelo es una caja diminuta rodeada de cajas enormes: recolección y verificación de datos, extracción de atributos, configuración, infraestructura de servicio y monitoreo. Riesgos que describen:
- **Entrelazamiento:** cambiar cualquier atributo de entrada cambia todo el modelo ("cambiar cualquier cosa cambia todo").
- **Dependencias de datos inestables:** una tabla de entrada cambia de significado sin aviso.
- **Bucles de retroalimentación:** las predicciones del modelo influyen en los datos con que se reentrenará.
Martin Zinkevich, también de Google, escribió en sus *Rules of Machine Learning* como primera regla no tener miedo de lanzar un producto sin aprendizaje automático: una heurística sencilla da una línea base y la infraestructura de datos necesaria.

## Operar modelos (MLOps)
- **Versionar** datos, código, atributos y modelos para poder reproducir un entrenamiento.
- Evitar el **desfase entre entrenamiento y servicio**: los atributos deben calcularse igual en ambos lados (para eso existen los almacenes de atributos).
- **Monitorear** la **deriva de datos** (la distribución de las entradas cambia) y la **deriva de concepto** (cambia la relación entre entradas y respuesta), además del desempeño real cuando llegan las etiquetas.
- **Desplegar** con cuidado: modo sombra (el modelo predice pero no decide), canario y reversión.

## Privacidad y ética de los datos
En el Perú, la **Ley N.º 29733, Ley de Protección de Datos Personales** (2011), y su reglamento exigen consentimiento informado, finalidad determinada, proporcionalidad y seguridad en el tratamiento de datos personales, con derechos de acceso, rectificación, cancelación y oposición; en Europa rige el **RGPD** (2016). Prácticas de ingeniería: recolectar solo lo necesario, seudonimizar, controlar el acceso, definir plazos de retención y revisar si un modelo trata de forma injusta a algún grupo.

## Ejemplo resuelto: el almacén de PatioApp
Pregunta del negocio: ingresos y días promedio por patio, mes y tipo de vehículo. Diseño: tabla de hechos «hecho_estadia» (una fila por estadía terminada: días, monto, claves de dimensión) y dimensiones «dim_fecha», «dim_patio», «dim_vehiculo» y «dim_cliente» (de tipo 2 para conservar el historial de direcciones). Pipeline ELT nocturno e incremental: extrae las estadías cerradas desde la última ejecución, carga los datos crudos, transforma con SQL, verifica que no haya placas duplicadas ni montos negativos y alerta si la cantidad de filas cae más de 30% respecto al promedio. Los datos personales del cliente se seudonimizan en el almacén y solo un rol autorizado puede volver a identificarlos.`,
  links: [['m10.model', 'el modelado dimensional complementa al modelado relacional transaccional'], ['m13.dist', 'MapReduce, Spark y Kafka son sistemas distribuidos'], ['m17.ethics', 'la privacidad y la equidad de los datos son responsabilidades profesionales']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulos 3, 10 y 11; Kimball y Ross, capítulos 1 a 3; Sculley y otros (2015); Ley N.º 29733.',
  terms: [
    ['OLAP', 'procesamiento analítico de pocas consultas que recorren grandes volúmenes de datos', ['Ingresos por patio y mes de los últimos tres años.', 'Se hace en un almacén de datos.', 'Se contrapone a OLTP.']],
    ['Almacén de datos', 'colección de datos integrada, orientada a temas, no volátil y variable en el tiempo para apoyar decisiones', ['Reúne datos de cobros, ingresos y clientes.', 'Inmon lo definió en 1992.', 'Suele guardar los datos por columnas.']],
    ['Tabla de hechos', 'tabla que registra eventos medibles del negocio con claves hacia sus dimensiones', ['Una fila por estadía con días y monto.', 'Es el centro del esquema en estrella.', 'Contiene las medidas que se suman.']],
    ['Dimensión', 'tabla que describe el contexto de los hechos, como fecha, lugar o cliente', ['dim_patio con nombre y distrito.', 'dim_fecha con día, mes y feriados.', 'Se usa para filtrar y agrupar.']],
    ['ETL', 'proceso que extrae datos de las fuentes, los transforma y los carga en un sistema analítico', ['Limpias placas y montos antes de cargarlos.', 'En ELT la transformación ocurre después de cargar.', 'Debe ser idempotente e incremental.']],
    ['MapReduce', 'modelo de programación que procesa datos masivos con una fase de mapeo a pares clave-valor y una de reducción por clave', ['Cuentas palabras en millones de documentos.', 'Dean y Ghemawat lo publicaron en 2004.', 'Hadoop es su implementación abierta.']],
    ['Deriva de datos', 'cambio en la distribución de los datos de entrada de un modelo en producción respecto de los de entrenamiento', ['Llega un nuevo tipo de vehículo que el modelo no vio.', 'Cambia la estacionalidad tras una nueva norma.', 'Se detecta monitoreando las distribuciones.']],
    ['Desfase entre entrenamiento y servicio', 'diferencia entre cómo se calculan los atributos al entrenar y al predecir en producción', ['En entrenamiento se usa la fecha en UTC y en producción la hora local.', 'Degrada el modelo sin errores visibles.', 'Se evita compartiendo el código de atributos.']]
  ],
  q: [
    ['¿Por qué no conviene ejecutar los reportes analíticos pesados sobre la base de datos transaccional?', 'Porque las consultas grandes la vuelven lenta para las operaciones de los usuarios', ['Porque SQL no permite sumas', 'Porque los datos transaccionales son falsos', 'Porque es ilegal'], 'OLTP y OLAP tienen patrones de carga distintos.', 2],
    ['En un esquema en estrella de PatioApp, ¿qué sería la tabla de hechos?', 'Las estadías, con sus días y montos', ['Los patios', 'Las fechas', 'Los tipos de vehículo'], 'Los hechos son eventos medibles; lo demás son dimensiones.', 2],
    ['¿Qué significa que un pipeline sea idempotente?', 'Que ejecutarlo varias veces produce el mismo resultado que ejecutarlo una vez', ['Que es muy rápido', 'Que nunca falla', 'Que se ejecuta en paralelo'], 'Así los reintentos no duplican datos.', 3],
    ['¿Qué aportó Spark respecto de MapReduce?', 'Mantener los datos en memoria entre pasos, acelerando los algoritmos iterativos', ['Eliminar la necesidad de varias máquinas', 'Usar solo SQL', 'Reemplazar las bases de datos'], 'Zaharia y otros lo propusieron en Berkeley.', 3],
    ['Según Sculley y otros (2015), ¿qué parte de un sistema de aprendizaje automático suele ser pequeña?', 'El código del modelo en sí', ['La recolección de datos', 'El monitoreo', 'La infraestructura de servicio'], 'El resto del sistema es mucho mayor.', 3],
    ['Tras un cambio en la normativa, la distribución de los ingresos al patio cambió y el modelo empeoró. ¿Qué ocurrió?', 'Deriva de datos o de concepto', ['Sobreajuste en entrenamiento', 'Un error de sintaxis', 'Fuga de datos'], 'El mundo cambió respecto de los datos de entrenamiento.', 3],
    ['¿Qué ley regula la protección de datos personales en el Perú?', 'La Ley N.º 29733', ['La Ley N.º 27444', 'El RGPD', 'La ley de Moore'], 'Se publicó en 2011 y tiene reglamento propio.', 2],
    { tf: 'En ELT los datos se cargan crudos y se transforman después dentro del almacén o lago de datos.', v: true, e: 'Es la tendencia con almacenes en la nube.', l: 2 },
    { tf: 'Si un modelo funcionó bien en el conjunto de prueba, ya no necesita monitoreo en producción.', v: false, e: 'Los datos y las relaciones cambian; hay que vigilar la deriva y el desempeño real.', l: 2 },
    { c: 'Escribe «contarPalabras(docs)» al estilo MapReduce: recibe una lista de textos y devuelve una lista de [palabra, cantidad] ordenada alfabéticamente por palabra. Las palabras se separan por espacios.', f: 'contarPalabras', p: ['docs'], t: [[[['a b a', 'b c']], [['a', 2], ['b', 2], ['c', 1]]], [[['hola']], [['hola', 1]]], [[[]], []]], sol: '  const pares = docs.flatMap(d => d.split(" ").filter(Boolean).map(p => [p, 1]));\n  const r = {};\n  for (const [p, n] of pares) r[p] = (r[p] || 0) + n;\n  return Object.keys(r).sort().map(p => [p, r[p]]);', l: 3 },
    { c: 'Escribe «normalizarMinMax(xs)» que lleve los valores al rango [0, 1] con (x − min)/(max − min), redondeando a 2 decimales; si todos son iguales, devuelve ceros.', f: 'normalizarMinMax', p: ['xs'], t: [[[[0, 5, 10]], [0, 0.5, 1]], [[[2, 4]], [0, 1]], [[[3, 3]], [0, 0]], [[[1, 2, 4]], [0, 0.33, 1]]], sol: '  const mn = Math.min(...xs), mx = Math.max(...xs);\n  return xs.map(x => mx === mn ? 0 : Math.round((x - mn) / (mx - mn) * 100) / 100);', l: 2 },
    { c: 'Escribe «tasaCalidad(registros)»: cada registro es {placa, dias}; es válido si la placa cumple el formato AAA-999 (tres letras mayúsculas o dígitos, guion, tres dígitos) y dias es un entero ≥ 0. Devuelve el porcentaje de válidos redondeado a 1 decimal.', f: 'tasaCalidad', p: ['registros'], t: [[[[{ placa: 'ABC-123', dias: 4 }, { placa: 'XYZ-9', dias: 1 }]], 50], [[[{ placa: 'A1B-123', dias: 0 }, { placa: 'DEF-456', dias: -1 }, { placa: 'GHI-789', dias: 2 }]], 66.7], [[[{ placa: 'abc-123', dias: 1 }]], 0]], sol: '  const ok = registros.filter(r => /^[A-Z0-9]{3}-[0-9]{3}$/.test(r.placa) && Number.isInteger(r.dias) && r.dias >= 0).length;\n  return Math.round(1000 * ok / registros.length) / 10;', l: 3 }
  ],
  gen: function (g) {
    var tablas = [['estadía (días, monto)', 'Hechos'], ['patio (nombre, distrito, capacidad)', 'Dimensión'], ['fecha (día, mes, año, feriado)', 'Dimensión'], ['cobro (monto, impuesto)', 'Hechos'], ['cliente (nombre, tipo, ciudad)', 'Dimensión'], ['ingreso de vehículo (hora, cantidad)', 'Hechos'], ['tipo de vehículo (categoría, ejes)', 'Dimensión']];
    tablas.forEach(function (t) { g.mcq(2, 'En un modelo dimensional de PatioApp, ¿qué sería la tabla ' + t[0] + '?', t[1], [t[1] === 'Hechos' ? 'Dimensión' : 'Hechos', 'Índice', 'Vista materializada'], 'Hechos: eventos medibles; dimensiones: contexto.'); });
    var cal = [['Faltan las estadías de un patio completo en la carga de anoche', 'Completitud'], ['La misma estadía aparece dos veces', 'Unicidad'], ['Una placa tiene el formato "12-AB"', 'Validez'], ['El total de cobros del almacén no coincide con el del sistema de origen', 'Consistencia'], ['Los datos de ayer llegaron recién esta tarde', 'Puntualidad']];
    cal.forEach(function (c) { g.mcq(3, '¿Qué dimensión de la calidad de datos falla? ' + c[0], c[1], ['Completitud', 'Unicidad', 'Validez', 'Consistencia', 'Puntualidad'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Dimensiones habituales de calidad de datos.'); });
    g.times(8, function (R) { var mn = R.int(0, 20), mx = mn + R.int(5, 50), x = R.int(mn, mx); g.input(2, 'Con mínimo ' + mn + ' y máximo ' + mx + ', ¿cuánto vale ' + x + ' normalizado con min-max? Redondea a 2 decimales.', ((x - mn) / (mx - mn)).toFixed(2), '(' + x + ' − ' + mn + ')/(' + mx + ' − ' + mn + ').'); });
  },
  checks: [
    ['¿Qué diferencia hay entre OLTP y OLAP?', 'OLTP son muchas operaciones pequeñas de la aplicación; OLAP son pocas consultas analíticas que recorren grandes volúmenes.'],
    ['Diseña un esquema en estrella para analizar los cobros de PatioApp.', 'Hechos: cobro con monto e impuesto; dimensiones: fecha, patio, cliente, tipo de vehículo y medio de pago.'],
    ['¿Qué propiedades debe tener un buen pipeline de datos?', 'Ser idempotente, incremental, orquestado con reintentos y tener controles de calidad y alertas.'],
    ['¿Qué mensaje central tiene el artículo de Sculley y otros (2015)?', 'Que el código del modelo es una pequeña parte del sistema, y que los datos, atributos, configuración y monitoreo acumulan una deuda técnica oculta.'],
    ['¿Qué exige la Ley 29733 al tratar datos personales?', 'Consentimiento informado, finalidad determinada, proporcionalidad, seguridad y respeto a los derechos de acceso, rectificación, cancelación y oposición.']
  ],
  cites: ['Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O’Reilly.', 'Kimball, R. y Ross, M. (2013). *The Data Warehouse Toolkit* (3.ª ed.). Wiley.', 'Inmon, W. (1992). *Building the Data Warehouse*. Wiley.', 'Dean, J. y Ghemawat, S. (2004). MapReduce: Simplified Data Processing on Large Clusters. *OSDI 2004*.', 'Zaharia, M. et al. (2010). Spark: Cluster Computing with Working Sets. *HotCloud 2010*.', 'Sculley, D. et al. (2015). Hidden Technical Debt in Machine Learning Systems. *NeurIPS*.', 'Congreso de la República del Perú (2011). *Ley N.º 29733, Ley de Protección de Datos Personales*.'],
  project: { t: 'Pipeline de datos de punta a punta',
    goal: 'Construir un pipeline confiable desde datos crudos hasta un tablero y un modelo monitoreado.',
    steps: ['Consigue datos crudos de una fuente pública o genera datos sintéticos realistas con errores intencionales.', 'Diseña un esquema en estrella y escribe un pipeline ELT incremental e idempotente.', 'Agrega controles de calidad (completitud, unicidad, validez) con alertas.', 'Construye un tablero con tres preguntas de negocio respondidas desde el almacén.', 'Agrega un modelo simple alimentado por el almacén y monitorea la deriva de sus entradas entre dos periodos.'],
    deliver: 'El código del pipeline, el diagrama del esquema, los controles de calidad, el tablero y el informe de deriva.' },
  hito: ['Diseña el almacén de datos de PatioApp con un esquema en estrella y construye un pipeline ELT incremental e idempotente con controles de calidad.', 'Pon en producción el modelo de permanencia de PatioApp en modo sombra, monitorea la deriva de datos y documenta el cumplimiento de la Ley 29733.']
});
})();
