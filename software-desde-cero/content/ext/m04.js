(function () {
var X = SDC.X, XM = SDC.XM;
XM('m4', {
  uni: 'MIT 6.1210 (antes 6.006) *Introduction to Algorithms* y 6.1220 (antes 6.046) *Design and Analysis of Algorithms*; Stanford CS106B *Programming Abstractions* y CS161 *Design and Analysis of Algorithms*; Berkeley CS61B *Data Structures* y CS170 *Efficient Algorithms and Intractable Problems*; CMU 15-122, 15-210 y 15-451. En Perú: Algoritmos y Estructuras de Datos, y Análisis y Diseño de Algoritmos (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Motor de búsqueda y rutas de PatioApp',
    goal: 'Combinar las estructuras y algoritmos del módulo en un motor que responda consultas al instante con 100 000 unidades.',
    steps: ['Índice por placa con tabla hash y autocompletado con un trie.', 'Historial de ingresos ordenado y consultas por rango de fechas con búsqueda binaria.', 'Cola de prioridad (montículo) para atender en el taller primero las urgencias.', 'Grafo de pasillos y ruta más corta con Dijkstra hasta el espacio de cada unidad.', 'Pruebas de rendimiento con 1 000, 10 000 y 100 000 unidades que confirmen la complejidad esperada de cada operación.'],
    deliver: 'El motor como módulo reutilizable, sus pruebas y una tabla de complejidades teóricas comparadas con los tiempos medidos.' }
});

X('m4.bigo', {
  deep: `
## La definición formal
Decimos que f(n) = O(g(n)) si existen constantes positivas c y n₀ tales que f(n) ≤ c · g(n) para todo n ≥ n₀. En palabras: a partir de cierto tamaño, f no crece más rápido que g, salvo un factor constante. Por ejemplo, 3n² + 10n + 5 = O(n²) porque con c = 4 y n₀ = 11 la desigualdad se cumple.
| Notación | Significa | Analogía |
| O(g) | cota superior: no crece más rápido que g | ≤ |
| Ω(g) | cota inferior: no crece más lento que g | ≥ |
| Θ(g) | crece exactamente como g | = |
| o(g) | crece estrictamente más lento | < |
La notación viene de los matemáticos Paul Bachmann (1894) y Edmund Landau; Donald Knuth propuso en 1976 usar sistemáticamente O, Ω y Θ en análisis de algoritmos, en su nota *Big Omicron and Big Omega and Big Theta*.

## Una aclaración importante: notación y caso son cosas distintas
Es frecuente oír "Big-O es el peor caso", pero son dos ideas independientes. Primero se elige **qué caso** analizar (mejor, promedio o peor), y luego se describe ese tiempo con O, Ω o Θ. La búsqueda lineal tiene un peor caso Θ(n) y un mejor caso Θ(1). Quicksort tiene un caso promedio Θ(n log n) y un peor caso Θ(n²). Cuando la gente dice "quicksort es O(n log n)" suele referirse al promedio; en una entrevista conviene precisarlo.

## El modelo de costo
Cormen y sus coautores analizan los algoritmos con el **modelo RAM**: cada operación básica (sumar, comparar, leer una posición) cuesta una unidad. Es una simplificación: en máquinas reales la caché hace que recorrer un arreglo sea mucho más barato que saltar por una lista enlazada, aunque ambas sean Θ(n). El modelo sirve para comparar el **crecimiento**; las constantes se miden después.

## Reglas para simplificar
- Las constantes multiplicativas desaparecen: O(5n) = O(n).
- Solo queda el término dominante: O(n³ + 1000n²) = O(n³).
- La base del logaritmo no importa: log₂ n y log₁₀ n difieren en una constante.
- Todo polinomio es menor que toda exponencial: n^100 = o(1.01^n), aunque con n pequeño parezca lo contrario.

## Cuánto cabe en un segundo
Suponiendo unas 10^8 operaciones simples por segundo:
| Complejidad | n máximo aproximado en 1 s |
| O(n) | 100 millones |
| O(n log n) | 4 a 5 millones |
| O(n²) | 10 000 |
| O(n³) | 460 |
| O(2^n) | 26 |
| O(n!) | 11 |
Esta tabla es la forma más rápida de decidir, antes de programar, si una idea es viable para el tamaño de tus datos.

## Medir para confirmar: la prueba de duplicación
Sedgewick y Wayne proponen en *Algorithms* (sección 1.4) un experimento simple: ejecutar el programa con n, 2n, 4n... y mirar la **razón** entre tiempos consecutivos. Si se acerca a 2, el algoritmo es lineal; a 4, cuadrático; a 8, cúbico. Es la forma científica de verificar un análisis teórico.
~~~js
function cuadratico(l) { let c = 0; for (const a of l) for (const b of l) if (a === b) c++; return c; }
let anterior = 0;
for (const n of [500, 1000, 2000, 4000]) {
  const l = Array.from({ length: n }, (_, i) => i);
  const t = performance.now(); cuadratico(l); const ms = performance.now() - t;
  console.log(n, ms.toFixed(1) + ' ms', anterior ? 'razón ' + (ms / anterior).toFixed(1) : '');
  anterior = ms;
}
~~~

## Análisis amortizado
A veces una operación es cara de vez en cuando pero barata casi siempre. Robert Tarjan formalizó en 1985 el **análisis amortizado**, que reparte el costo total entre todas las operaciones. Si un arreglo dinámico duplica su capacidad al llenarse, n inserciones cuestan como mucho unas 3n operaciones en total: O(1) amortizado por inserción, aunque una inserción concreta cueste O(n).

## Espacio y compromisos
La memoria extra también se mide con O. Muchas veces se cambia tiempo por espacio: un índice hash usa O(n) de memoria para que cada búsqueda sea O(1); la memoización guarda resultados para no recalcularlos. Saber explicar ese compromiso es una de las habilidades que más evalúan las entrevistas técnicas.`,
  checks: [
    ['Demuestra que 2n + 7 = O(n) dando valores de c y n₀.', 'Con c = 3 y n₀ = 7: para n ≥ 7, 2n + 7 ≤ 2n + n = 3n.'],
    ['¿Es correcto decir que quicksort es O(n log n)? Precisa la afirmación.', 'Solo en el caso promedio (o con pivote aleatorio, en esperanza). En el peor caso es Θ(n²). Lo correcto es decir "Θ(n log n) en promedio, Θ(n²) en el peor caso".'],
    ['En una prueba de duplicación los tiempos son 10, 41, 159 y 640 ms. ¿Qué complejidad sugiere?', 'Cuadrática: la razón entre tiempos consecutivos es cercana a 4.'],
    ['¿Por qué no importa la base del logaritmo en O(log n)?', 'Porque log_a n = log_b n / log_b a, y 1/log_b a es una constante que la notación ignora.'],
    ['Tienes 1 millón de registros y un algoritmo O(n²). ¿Es viable en un segundo? ¿Qué harías?', 'No: serían 10^12 operaciones, horas de cálculo. Hay que buscar un algoritmo O(n log n) u O(n), por ejemplo ordenando o usando una tabla hash.']
  ],
  cites: ['Cormen, T., Leiserson, C., Rivest, R. y Stein, C. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulos 2 y 3.', 'Sedgewick, R. y Wayne, K. (2011). *Algorithms* (4.ª ed.). Addison-Wesley. Sección 1.4.', 'Knuth, D. E. (1976). Big Omicron and Big Omega and Big Theta. *ACM SIGACT News*, 8(2).', 'Tarjan, R. E. (1985). Amortized Computational Complexity. *SIAM Journal on Algebraic and Discrete Methods*, 6(2).'],
  project: { t: 'Laboratorio de rendimiento',
    goal: 'Resolver un mismo problema con tres complejidades distintas y verificar experimentalmente lo que predice la teoría.',
    steps: ['Problema: detectar placas duplicadas en una lista.', 'Versión A: dos bucles anidados (O(n²)).', 'Versión B: ordenar y comparar vecinos (O(n log n)).', 'Versión C: usar un Set (O(n) en promedio).', 'Mide las tres con n = 1 000, 2 000, 4 000... hasta que la más lenta pase de 5 segundos, calcula las razones de duplicación y grafica los tiempos.'],
    deliver: 'El código, la tabla de tiempos y razones, y un gráfico con una conclusión de cuál usar y por qué.' },
  hito: ['Anota en un comentario la complejidad en tiempo y espacio de cada función de PatioApp.', 'Mide el reporte de cierre con 1 000, 10 000 y 100 000 unidades y comprueba con la razón de duplicación que crece como esperabas.']
});

X('m4.search', {
  deep: `
## La búsqueda binaria es más difícil de lo que parece
Jon Bentley contó en *Programming Pearls* (1986) que, al pedir a programadores profesionales escribir una búsqueda binaria, alrededor del 90% entregó código con errores. Knuth anota en *The Art of Computer Programming* (volumen 3) que la primera búsqueda binaria se publicó en 1946, pero la primera libre de errores para cualquier n recién apareció en 1962. Y en 2006 Joshua Bloch reveló que la implementación de la biblioteca de Java (que él mismo había escrito) tenía un desbordamiento en «(lo + hi) / 2» que se manifestaba con arreglos de más de mil millones de elementos. La solución es «lo + Math.floor((hi − lo) / 2)».

## La variante que más se usa: cota inferior
En la práctica casi nunca basta saber "si está"; se necesita **dónde iría**. La cota inferior devuelve la primera posición cuyo valor es ≥ x. Con dos cotas se responden consultas de rango:
~~~js
function cotaInferior(l, x) {          // primera posición con l[i] >= x
  let lo = 0, hi = l.length;           // rango semiabierto [lo, hi)
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (l[mid] < x) lo = mid + 1; else hi = mid;
  }
  return lo;
}
const fechas = [3, 5, 5, 8, 12, 15, 20];
console.log(cotaInferior(fechas, 5), cotaInferior(fechas, 9));      // 1 y 4
console.log(fechas.slice(cotaInferior(fechas, 5), cotaInferior(fechas, 13))); // valores en [5, 13)
~~~
La idea se generaliza a **buscar sobre las respuestas**: si una propiedad es monótona (falsa, falsa, ..., verdadera, verdadera), la búsqueda binaria encuentra el primer verdadero. Así se calcula, por ejemplo, la capacidad mínima de un camión para repartir todo en k viajes.

## Por qué no se puede ordenar más rápido que n log n comparando
Todo algoritmo que ordena comparando puede verse como un **árbol de decisión**: cada comparación es una bifurcación y cada hoja, un orden posible. Hay n! órdenes posibles, así que el árbol necesita al menos n! hojas y su altura (comparaciones del peor caso) es al menos log₂(n!), que es Θ(n log n). Cormen y sus coautores presentan esta demostración en el capítulo 8 de *Introduction to Algorithms*. Counting sort y radix sort rompen el límite porque **no comparan**: usan el valor de las claves como índice.

## Los grandes algoritmos y su historia
- **Merge sort:** atribuido a John von Neumann (1945). Garantiza n log n y es estable, a cambio de O(n) de memoria extra. Es el preferido para ordenar datos que no caben en memoria (*ordenamiento externo*).
- **Quicksort:** publicado por Tony Hoare en 1962. Ordena en el mismo arreglo y suele ser el más rápido en la práctica, pero un pivote malo (el primero en una lista ya ordenada) lo vuelve cuadrático. Elegir el pivote **al azar** hace que el peor caso sea extremadamente improbable.
- **Heapsort:** de J. W. J. Williams (1964). n log n garantizado y sin memoria extra, aunque con peor uso de caché.
- **Timsort:** diseñado por Tim Peters en 2002 para Python. Detecta tramos ya ordenados y combina inserción con mezcla. Lo usan Python, Java para objetos y, desde 2018, el motor V8 de JavaScript. Los datos reales suelen estar parcialmente ordenados, y Timsort lo aprovecha.

## Quicksort en pocas líneas
~~~js
function quicksort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return a;
  const p = a[lo + Math.floor(Math.random() * (hi - lo + 1))];   // pivote aleatorio
  let i = lo, j = hi;
  while (i <= j) {                       // partición de Hoare
    while (a[i] < p) i++;
    while (a[j] > p) j--;
    if (i <= j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; }
  }
  quicksort(a, lo, j); quicksort(a, i, hi);
  return a;
}
console.log(quicksort([9, 3, 7, 1, 8, 2, 5]));
~~~

## Seleccionar sin ordenar todo
Para hallar la mediana o el k-ésimo menor no hace falta ordenar: **quickselect** particiona como quicksort pero solo sigue por el lado que contiene la respuesta, con un costo esperado O(n). Para los k mayores de una lista enorme se usa un montículo de tamaño k: O(n log k).

## Elegir en la práctica
| Situación | Mejor opción |
| Pocos elementos o casi ordenados | inserción |
| Uso general en memoria | el «sort» de la biblioteca (Timsort o introsort) |
| Necesitas estabilidad | merge sort o Timsort |
| Enteros en un rango pequeño | counting sort |
| Datos que no caben en memoria | merge sort externo |
| Muchas búsquedas sobre datos que casi no cambian | ordenar una vez y usar búsqueda binaria |
| Muchas búsquedas y muchos cambios | tabla hash o árbol balanceado |`,
  checks: [
    ['¿Qué devuelve la cota inferior de 9 en [3, 5, 5, 8, 12] y para qué sirve?', 'Devuelve 4, la posición donde iría 9 (la primera con valor ≥ 9). Sirve para insertar manteniendo el orden y para consultas de rango.'],
    ['¿Por qué ningún algoritmo que solo compara puede ordenar en menos de n log n comparaciones en el peor caso?', 'Porque debe distinguir entre n! órdenes posibles y cada comparación tiene dos resultados; se necesitan al menos log₂(n!) comparaciones, que es Θ(n log n).'],
    ['¿Qué problema tiene quicksort con el primer elemento como pivote sobre una lista ya ordenada y cómo se evita?', 'Cada partición deja un lado vacío y el otro con n − 1 elementos, lo que da Θ(n²). Se evita eligiendo el pivote al azar o con la mediana de tres.'],
    ['¿Por qué merge sort es preferido para ordenar archivos más grandes que la memoria?', 'Porque procesa los datos de forma secuencial: ordena bloques que caben en memoria y luego los mezcla leyéndolos en orden, lo que es eficiente en disco.'],
    ['¿Cómo encontrarías las 10 unidades con más días en patio entre 1 millón sin ordenarlas todas?', 'Con un montículo de mínimos de tamaño 10 que guarda las 10 mayores vistas; cada elemento cuesta O(log 10), en total O(n log k). También sirve quickselect.']
  ],
  cites: ['Bentley, J. (1986). *Programming Pearls*. Addison-Wesley (2.ª ed., 1999). Columna 4.', 'Knuth, D. E. (1998). *The Art of Computer Programming, Vol. 3: Sorting and Searching* (2.ª ed.). Addison-Wesley.', 'Hoare, C. A. R. (1962). Quicksort. *The Computer Journal*, 5(1).', 'Bloch, J. (2006). Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken. Google Research Blog.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulos 2, 7 y 8.'],
  project: { t: 'Ordenador de unidades con varios criterios',
    goal: 'Implementar y comparar los algoritmos de ordenamiento clásicos y usarlos con búsqueda binaria en un caso real.',
    steps: ['Implementa inserción, merge sort y quicksort con pivote aleatorio.', 'Compáralos con 1 000, 10 000 y 100 000 elementos aleatorios, ya ordenados e invertidos.', 'Demuestra con un ejemplo que tu merge sort es estable y tu quicksort no.', 'Ordena unidades por estado y, dentro de cada estado, por fecha de ingreso, usando la estabilidad.', 'Implementa la cota inferior y lista las unidades ingresadas entre dos fechas.'],
    deliver: 'El código, una tabla de tiempos por algoritmo y tipo de entrada, y la explicación de los resultados.' },
  hito: ['Mantén el historial de ingresos de PatioApp ordenado por fecha y usa búsqueda binaria (cota inferior) para listar los ingresos entre dos fechas.', 'Ordena el listado por estado y, dentro de cada estado, por días en patio, aprovechando que el ordenamiento es estable.']
});

X('m4.stack', {
  deep: `
## Tipos abstractos de datos
Barbara Liskov y Stephen Zilles propusieron en 1974 (*Programming with Abstract Data Types*) separar **qué operaciones ofrece** una estructura de **cómo se implementa**. Una pila es "algo con push, pop y peek que cumple la regla LIFO"; puede implementarse con un arreglo o con una lista enlazada sin que el código que la usa cambie. Esa separación entre interfaz e implementación es el germen de la programación orientada a objetos y del diseño por módulos. Liskov recibió el Premio Turing en 2008, en parte por este trabajo.

## Pilas en todas partes
- **La pila de llamadas** de cualquier lenguaje.
- **Deshacer y rehacer:** dos pilas; deshacer mueve la última acción a la pila de rehacer.
- **Recorridos en profundidad (DFS)** y backtracking.
- **Analizar expresiones:** comprobar paréntesis balanceados y evaluar expresiones. Dijkstra publicó en 1961 el algoritmo *shunting-yard* (patio de maniobras), que con una pila convierte «3 + 4 * 2» en notación postfija «3 4 2 * +», fácil de evaluar con otra pila.
~~~js
function evaluarPostfija(tokens) {
  const p = [];
  for (const t of tokens) {
    if (/^\\d+$/.test(t)) { p.push(Number(t)); continue; }
    const b = p.pop(), a = p.pop();
    p.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : a / b);
  }
  return p.pop();
}
console.log(evaluarPostfija('3 4 2 * +'.split(' ')));   // 11
~~~

## Colas en todas partes
- **Recorridos por niveles (BFS).**
- **Búferes:** el teclado, la red y el audio acumulan datos en colas mientras el programa los procesa.
- **Colas de tareas y mensajes:** en sistemas distribuidos, servicios como RabbitMQ o Kafka desacoplan a quien produce trabajo de quien lo consume. Lo verás en arquitectura.

## Implementar una cola eficiente
Con un arreglo y «shift» cada desencolar cuesta O(n). Dos formas clásicas de lograr O(1):
- **Búfer circular:** un arreglo de tamaño fijo con dos índices, «inicio» y «fin», que avanzan con módulo: «fin = (fin + 1) % capacidad».
- **Dos pilas:** se encola en la pila A; para desencolar, si B está vacía se vacía A en B (invirtiendo el orden) y se saca de B. Cada elemento se mueve una sola vez, así que el costo amortizado es O(1).
~~~js
class Cola {
  constructor() { this.entrada = []; this.salida = []; }
  encolar(x) { this.entrada.push(x); }
  desencolar() {
    if (!this.salida.length) while (this.entrada.length) this.salida.push(this.entrada.pop());
    return this.salida.pop();
  }
}
const c = new Cola(); c.encolar('A'); c.encolar('B'); c.encolar('C');
console.log(c.desencolar(), c.desencolar());   // A B
~~~

## Montículos binarios
J. W. J. Williams inventó el **montículo binario** en 1964, junto con heapsort. Es un árbol binario casi completo donde cada padre es menor (o mayor) que sus hijos, guardado en un arreglo sin punteros:
:::flow padre(i) = ⌊(i − 1) / 2⌋ | hijoIzq(i) = 2i + 1 | hijoDer(i) = 2i + 2
- **Insertar:** se agrega al final y se "flota" hacia arriba intercambiando con el padre: O(log n).
- **Extraer el mínimo:** se toma la raíz, se pone el último en su lugar y se "hunde" intercambiando con el hijo menor: O(log n).
- **Construir desde una lista:** hundiendo desde la mitad hacia el inicio cuesta solo O(n), un resultado sorprendente que Cormen y sus coautores demuestran en el capítulo 6.
Es la implementación estándar de la **cola de prioridad**: planificadores de procesos, Dijkstra, eventos de una simulación y el "top k".

## Variantes de listas enlazadas
- **Doblemente enlazada:** cada nodo apunta al anterior y al siguiente; permite borrar un nodo conocido en O(1). Con un Map que apunte a los nodos, se construye una **caché LRU** (la menos usada recientemente se descarta), una pregunta de entrevista clásica y una pieza real de navegadores y bases de datos.
- **Con nodo centinela:** un nodo ficticio al inicio evita casos especiales al insertar o borrar en los extremos.
Sedgewick y Wayne recuerdan en *Algorithms* (sección 1.3) que la lista enlazada es la estructura recursiva más simple y la base para entender árboles y grafos.`,
  checks: [
    ['¿Qué ventaja tiene definir la pila como tipo abstracto de datos?', 'El código que la usa depende solo de sus operaciones (push, pop, peek), así que la implementación puede cambiar (arreglo, lista enlazada) sin afectarlo.'],
    ['En un montículo guardado en arreglo, ¿cuáles son los hijos del elemento en la posición 4 y cuál es su padre?', 'Hijos en 9 y 10 (2·4+1 y 2·4+2); padre en la posición 1 (⌊3/2⌋).'],
    ['¿Por qué la cola con dos pilas tiene costo O(1) amortizado si a veces mueve muchos elementos?', 'Porque cada elemento se mueve de la pila de entrada a la de salida una sola vez en toda su vida; repartido entre todas las operaciones, el costo por operación es constante.'],
    ['¿Qué estructuras combinas para una caché LRU con operaciones O(1)?', 'Un Map (o tabla hash) de clave a nodo y una lista doblemente enlazada que mantiene el orden de uso; al acceder, el nodo se mueve al frente y al llenarse se borra el del final.'],
    ['¿Qué resultado da la expresión postfija «5 1 2 + 4 * + 3 -»?', '14: 1 + 2 = 3; 3 × 4 = 12; 5 + 12 = 17; 17 − 3 = 14.']
  ],
  cites: ['Liskov, B. y Zilles, S. (1974). Programming with Abstract Data Types. *ACM SIGPLAN Notices*, 9(4).', 'Williams, J. W. J. (1964). Algorithm 232: Heapsort. *Communications of the ACM*, 7(6).', 'Sedgewick, R. y Wayne, K. (2011). *Algorithms* (4.ª ed.). Addison-Wesley. Secciones 1.3 y 2.4.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulos 6 y 10.'],
  project: { t: 'Biblioteca de estructuras lineales',
    goal: 'Implementar desde cero las estructuras lineales y la cola de prioridad, probarlas y medir su rendimiento.',
    steps: ['Implementa una pila y una lista doblemente enlazada con nodo centinela.', 'Implementa una cola con búfer circular que crezca al llenarse.', 'Implementa un montículo de mínimos con insertar, extraer y construir desde lista.', 'Usa tu montículo para ordenar (heapsort) y compáralo con «sort».', 'Construye una caché LRU de capacidad k con tu lista doble y un Map.'],
    deliver: 'Un módulo con las cinco estructuras, pruebas para cada operación y mediciones que confirmen sus complejidades.' },
  hito: ['Agrega la cola del taller de PatioApp: un búfer circular para la atención normal y una cola de prioridad (montículo) para las urgencias.', 'Implementa deshacer y rehacer de las últimas acciones de registro con dos pilas.']
});

X('m4.hash', {
  deep: `
## Diseñar una función hash
Una función hash para tablas debe ser **determinista** (misma clave, mismo resultado), **rápida** y **uniforme** (repartir las claves por igual). Cormen y sus coautores describen dos métodos clásicos en el capítulo 11 de *Introduction to Algorithms*:
- **División:** h(k) = k mod m. Conviene que m sea primo y no esté cerca de una potencia de 2, para que todos los bits de la clave influyan.
- **Multiplicación:** h(k) = ⌊m · (k·A mod 1)⌋ con una constante 0 < A < 1; Knuth sugiere A ≈ (√5 − 1)/2.
Para textos se combina cada carácter con el acumulado: h = h · 31 + carácter, como hace Java en «String.hashCode».

## Cuántos pasos cuesta realmente
Con **encadenamiento** y factor de carga α = n/m, una búsqueda sin éxito recorre en promedio α elementos y una exitosa, alrededor de 1 + α/2. Con **direccionamiento abierto lineal**, Knuth analizó en 1963 que el costo crece mucho al acercarse α a 1, porque se forman **racimos**: una búsqueda exitosa cuesta en promedio ½(1 + 1/(1 − α)) intentos. Con α = 0.5 son 1.5; con α = 0.9, 5.5. Por eso las implementaciones redimensionan antes de llenarse. El HashMap de Java usa por defecto α = 0.75 y, desde Java 8, convierte una casilla con muchas colisiones en un árbol balanceado para que el peor caso no sea lineal.

## Ataques por colisiones y hashing universal
Si un atacante conoce la función hash, puede enviar miles de claves que caen en la misma casilla y volver cada operación O(n). En 2011, Alexander Klink y Julian Wälde mostraron este ataque contra PHP, Java, Python y otros: un solo formulario podía ocupar un servidor durante minutos. La defensa es el **hashing universal**, propuesto por Carter y Wegman en 1979: elegir la función al azar, de una familia, cuando arranca el programa. Por eso Python y otros lenguajes usan una semilla aleatoria al calcular hashes de textos.

## El contrato entre igualdad y hash
Si dos objetos son iguales, deben tener el mismo hash; si no, la tabla no los encontrará. Joshua Bloch lo explica en *Effective Java* (ítem 11): "si sobrescribes equals, debes sobrescribir hashCode". En JavaScript, «Map» compara objetos por **identidad**, así que dos objetos con el mismo contenido son claves distintas:
~~~js
const m = new Map();
m.set({ placa: 'ABC123' }, 'uno');
console.log(m.get({ placa: 'ABC123' }));     // undefined: es otro objeto
const porPlaca = new Map([['ABC123', 'uno']]);
console.log(porPlaca.get('ABC123'));         // usar una clave primitiva resuelve el problema
~~~

## Patrones que vuelven O(n) problemas que parecían O(n²)
~~~js
// Dos sumas: ¿hay dos precios que sumen exactamente el presupuesto?
function dosSumas(precios, objetivo) {
  const vistos = new Set();
  for (const p of precios) { if (vistos.has(objetivo - p)) return [objetivo - p, p]; vistos.add(p); }
  return null;
}
console.log(dosSumas([12, 40, 7, 25, 33], 58));
// Agrupar en una pasada
const unidades = [{ m: 'Kia' }, { m: 'Toyota' }, { m: 'Kia' }];
const porMarca = unidades.reduce((acc, u) => acc.set(u.m, (acc.get(u.m) || 0) + 1), new Map());
console.log([...porMarca]);
~~~
Contar frecuencias, eliminar duplicados, unir dos listas por una clave (como un JOIN) o detectar el primer repetido son todos O(n) con una tabla hash.

## Hash en sistemas grandes
- **Hashing consistente:** propuesto por Karger y otros en 1997, reparte claves entre servidores de modo que agregar o quitar un servidor mueve solo una fracción pequeña de ellas. Lo usan las cachés distribuidas y bases de datos como Cassandra o DynamoDB.
- **Filtros de Bloom:** Burton Bloom los propuso en 1970. Responden "seguro no está" o "probablemente está" usando muy poca memoria. Las bases de datos los usan para evitar leer el disco cuando una clave no existe.
- **Hashes criptográficos** (SHA-256) son otra familia: deben hacer imposible encontrar colisiones a propósito. Son mucho más lentos y no se usan para tablas.`,
  checks: [
    ['¿Por qué conviene que el tamaño de una tabla con el método de división sea un número primo?', 'Para que el resultado dependa de todos los bits de la clave; si m es potencia de 2, k mod m solo mira los bits bajos y las claves con patrones parecidos colisionan.'],
    ['Con direccionamiento abierto lineal y α = 0.8, ¿cuántos intentos promedio cuesta una búsqueda exitosa?', '½(1 + 1/(1 − 0.8)) = ½(1 + 5) = 3 intentos.'],
    ['¿Cómo protege el hashing universal contra ataques de colisiones?', 'Elige la función hash al azar al iniciar el programa, así que el atacante no puede saber de antemano qué claves colisionarán.'],
    ['¿Por qué «map.get({ placa: "A1" })» devuelve undefined aunque antes guardaste un objeto igual?', 'Porque Map compara objetos por identidad, no por contenido. Hay que usar como clave un valor primitivo, como el texto de la placa.'],
    ['Describe un algoritmo O(n) para saber si una lista tiene un elemento repetido.', 'Recorrerla guardando cada elemento en un Set; si al llegar a uno ya está en el Set, hay repetido. Cada consulta e inserción es O(1) en promedio.']
  ],
  cites: ['Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulo 11.', 'Knuth, D. E. (1998). *The Art of Computer Programming, Vol. 3* (2.ª ed.). Addison-Wesley. Sección 6.4.', 'Carter, J. L. y Wegman, M. (1979). Universal classes of hash functions. *Journal of Computer and System Sciences*, 18(2).', 'Bloom, B. (1970). Space/time trade-offs in hash coding with allowable errors. *Communications of the ACM*, 13(7).', 'Bloch, J. (2018). *Effective Java* (3.ª ed.). Addison-Wesley. Ítem 11.'],
  project: { t: 'Tu propia tabla hash',
    goal: 'Construir una tabla hash completa y observar en números cómo afectan la función hash y el factor de carga.',
    steps: ['Implementa una tabla con encadenamiento: set, get, delete y has.', 'Agrega redimensionamiento al doble cuando el factor de carga pase de 0.75.', 'Prueba dos funciones hash (una mala que sume los códigos de los caracteres y una buena con multiplicador 31) y mide la longitud máxima de las cadenas con 100 000 placas.', 'Implementa la misma tabla con direccionamiento abierto lineal y mide los intentos promedio para α = 0.5, 0.75 y 0.9.', 'Compara tu tabla con Map en tiempo.'],
    deliver: 'El código, las pruebas, una tabla de mediciones y una explicación de por qué la función mala genera tantas colisiones.' },
  hito: ['Crea en PatioApp un índice por placa con Map para búsquedas en O(1) y usa un Set para descartar registros duplicados al importar.', 'Agrega un reporte de cantidad de unidades por marca calculado en una sola pasada.']
});

X('m4.trees', {
  deep: `
## Propiedades que conviene saber demostrar
- Un árbol con n nodos tiene exactamente n − 1 aristas.
- Un árbol binario de altura h tiene como máximo 2^(h+1) − 1 nodos; por eso con n nodos la altura mínima es ⌊log₂ n⌋.
- En un árbol binario completo, alrededor de la mitad de los nodos son hojas.
Estas propiedades explican por qué un árbol equilibrado de mil millones de elementos tiene solo unos 30 niveles.

## Borrar en un árbol binario de búsqueda
Es la operación delicada. Hay tres casos:
1. El nodo es una hoja: se quita.
2. Tiene un hijo: el hijo ocupa su lugar.
3. Tiene dos hijos: se reemplaza su valor por el de su **sucesor** (el menor del subárbol derecho) y se borra el sucesor, que tiene como máximo un hijo.
~~~js
function borrar(n, v) {
  if (!n) return null;
  if (v < n.v) { n.izq = borrar(n.izq, v); return n; }
  if (v > n.v) { n.der = borrar(n.der, v); return n; }
  if (!n.izq) return n.der;
  if (!n.der) return n.izq;
  let s = n.der; while (s.izq) s = s.izq;     // sucesor
  n.v = s.v; n.der = borrar(n.der, s.v);
  return n;
}
function ins(n, v) { if (!n) return { v, izq: null, der: null }; if (v < n.v) n.izq = ins(n.izq, v); else n.der = ins(n.der, v); return n; }
function inorden(n) { return n ? [...inorden(n.izq), n.v, ...inorden(n.der)] : []; }
let t = null; for (const v of [8, 3, 10, 1, 6, 14, 4, 7]) t = ins(t, v);
t = borrar(t, 3);
console.log(inorden(t));
~~~

## Árboles que se equilibran solos
- **AVL:** inventado por Adelson-Velsky y Landis en 1962, el primer árbol autoequilibrado. Exige que en cada nodo las alturas de los subárboles difieran como máximo en 1 y lo restablece con **rotaciones**. Altura máxima de unos 1.44 log₂ n.
- **Rojo-negro:** formulado por Guibas y Sedgewick en 1978 a partir de los árboles de Rudolf Bayer (1972). Reglas más relajadas: menos rotaciones al insertar y borrar, a cambio de árboles algo más altos (hasta 2 log₂ n). Es el que usan «TreeMap» de Java y «std::map» de C++.
Una **rotación** reorganiza tres nodos manteniendo el orden del BST:
~~~txt
      y                x
     / \\    rotar     / \\
    x   C   ───►     A   y
   / \\     derecha       / \\
  A   B                 B   C
~~~

## B-trees: árboles para el disco
Rudolf Bayer y Edward McCreight presentaron en 1972 los **B-trees**: cada nodo guarda cientos de claves y tiene cientos de hijos. Leer un nodo del disco cuesta casi lo mismo que leer una clave, así que conviene que cada lectura descarte la mayor cantidad posible de datos. Con 500 hijos por nodo, tres niveles indexan 125 millones de registros: cualquier búsqueda lee como máximo tres bloques. La variante **B+ tree** guarda los datos solo en las hojas, enlazadas entre sí para recorrer rangos, y es el índice por defecto de PostgreSQL, MySQL (InnoDB) y SQLite. Lo retomarás en bases de datos.

## Tries: árboles de prefijos
Edward Fredkin propuso el nombre *trie* en 1960, de la palabra *retrieval*. Cada arista es un carácter y cada camino desde la raíz, un prefijo. Buscar o autocompletar cuesta O(longitud de la palabra), sin importar cuántas palabras haya. Se usa en autocompletado, correctores, enrutamiento de direcciones IP (prefijo más largo) y diccionarios comprimidos.

## Operaciones ordenadas
Lo que un árbol de búsqueda hace y una tabla hash no:
| Operación | Árbol balanceado | Tabla hash |
| buscar exacto | O(log n) | O(1) promedio |
| mínimo, máximo | O(log n) | O(n) |
| sucesor, predecesor | O(log n) | O(n) |
| rango [a, b] | O(log n + k) | O(n) |
| recorrer en orden | O(n) | requiere ordenar |
Por eso los índices de las bases de datos son árboles y no tablas hash: las consultas por rango («WHERE fecha BETWEEN ...») son demasiado comunes.

## Árboles por todas partes
El **DOM** de una página, el **árbol de sintaxis abstracta** de un compilador, el sistema de archivos, la jerarquía de componentes de React y los organigramas son árboles. Saber recorrerlos (en profundidad con recursión o en anchura con una cola) es una habilidad que usarás en casi todos los módulos que siguen.`,
  checks: [
    ['¿Cuál es la altura mínima de un árbol binario con 1000 nodos?', '⌊log₂ 1000⌋ = 9, porque con altura 9 caben hasta 2^10 − 1 = 1023 nodos.'],
    ['Al borrar un nodo con dos hijos en un BST, ¿por qué se usa el sucesor?', 'Porque el sucesor (el menor del subárbol derecho) es el único valor que puede ocupar ese lugar manteniendo el orden, y además tiene como máximo un hijo, así que borrarlo es sencillo.'],
    ['¿Por qué las bases de datos usan B-trees en lugar de árboles binarios?', 'Porque cada nodo de un B-tree ocupa un bloque de disco con cientos de claves; la altura queda en 3 o 4 niveles y cada búsqueda lee muy pocos bloques. Un árbol binario necesitaría unas 30 lecturas.'],
    ['¿Cuándo elegirías un árbol balanceado en lugar de una tabla hash?', 'Cuando necesitas operaciones ordenadas: rangos, mínimo y máximo, sucesor, o recorrer en orden.'],
    ['¿Qué costo tiene autocompletar en un trie y de qué depende?', 'O(longitud del prefijo) para llegar al nodo, más el tamaño del resultado; no depende de cuántas palabras hay en total.']
  ],
  cites: ['Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulos 12, 13 y 18.', 'Adelson-Velsky, G. y Landis, E. (1962). An algorithm for the organization of information. *Proceedings of the USSR Academy of Sciences*, 146.', 'Bayer, R. y McCreight, E. (1972). Organization and maintenance of large ordered indexes. *Acta Informatica*, 1(3).', 'Guibas, L. y Sedgewick, R. (1978). A dichromatic framework for balanced trees. *19th Annual Symposium on Foundations of Computer Science*.', 'Sedgewick, R. y Wayne, K. (2011). *Algorithms* (4.ª ed.). Addison-Wesley. Capítulo 3.'],
  project: { t: 'Árboles de búsqueda y autocompletado',
    goal: 'Implementar un BST completo, observar su degeneración, equilibrarlo con AVL y construir un trie para autocompletar.',
    steps: ['Implementa un BST con insertar, buscar, borrar, mínimo, máximo, altura y rango [a, b].', 'Inserta 10 000 valores ordenados y aleatorios y compara la altura resultante.', 'Convierte tu BST en AVL agregando altura por nodo y las cuatro rotaciones; repite la prueba.', 'Implementa un trie con insertar, buscar y autocompletar (máximo 10 sugerencias).', 'Carga 50 000 placas y mide el tiempo de autocompletar.'],
    deliver: 'El código de las tres estructuras, las pruebas y una tabla de alturas y tiempos.' },
  hito: ['Agrega a PatioApp autocompletado de placas con un trie.', 'Crea un índice ordenado por kilometraje (árbol balanceado o arreglo ordenado con búsqueda binaria) para consultar unidades en un rango de kilómetros.']
});

X('m4.graphs', {
  deep: `
## El nacimiento de la teoría de grafos
En 1736 Leonhard Euler resolvió el problema de los siete puentes de Königsberg: ¿se puede cruzar cada puente exactamente una vez y volver al inicio? Euler abstrajo la ciudad en puntos y líneas y demostró que no, porque un recorrido así exige que todos los puntos tengan un número par de líneas. Fue el primer resultado de teoría de grafos.

## Vocabulario preciso
- **Grado** de un nodo: cuántas aristas tocan ese nodo. En grafos dirigidos se distingue grado de entrada y de salida.
- **Lema del apretón de manos:** la suma de todos los grados es 2E, porque cada arista se cuenta en sus dos extremos.
- **Camino, ciclo, grafo conexo**, **componente conexa**.
- **DAG:** grafo dirigido acíclico; modela dependencias.
- **Bipartito:** sus nodos se dividen en dos grupos y las aristas solo van de un grupo al otro (choferes y vehículos); se detecta coloreando con BFS.
- **Denso** (E cercano a V²) o **disperso** (E cercano a V). La mayoría de los grafos reales son dispersos.

## Por qué BFS encuentra el camino más corto
BFS visita los nodos **por capas**: primero los que están a distancia 1, luego los de distancia 2, y así sucesivamente. Cuando llega por primera vez a un nodo, lo hace por un camino con la menor cantidad posible de aristas, porque cualquier camino más corto lo habría alcanzado en una capa anterior. Solo vale si todas las aristas pesan lo mismo.

## DFS: tiempos y ciclos
DFS registra cuándo entra a un nodo y cuándo termina de explorarlo. Con tres colores (blanco: sin visitar; gris: en exploración; negro: terminado) se detectan ciclos en grafos dirigidos: si DFS encuentra una arista hacia un nodo **gris**, hay un ciclo. Además, el orden inverso de terminación de DFS es un **orden topológico**. Otra forma, el algoritmo de **Kahn** (1962), repite: tomar un nodo con grado de entrada 0, sacarlo y restar uno a sus vecinos. Si quedan nodos sin procesar, hay un ciclo.
~~~js
function ordenTopologico(g) {         // g: { tarea: [tareas que dependen de ella] }
  const grado = {}; Object.keys(g).forEach(n => grado[n] = grado[n] || 0);
  for (const n in g) for (const v of g[n]) grado[v] = (grado[v] || 0) + 1;
  const cola = Object.keys(grado).filter(n => grado[n] === 0), orden = [];
  while (cola.length) { const n = cola.shift(); orden.push(n); for (const v of g[n] || []) if (--grado[v] === 0) cola.push(v); }
  return orden.length === Object.keys(grado).length ? orden : 'hay un ciclo';
}
console.log(ordenTopologico({ lavado: ['pintura'], revision: ['pintura', 'entrega'], pintura: ['entrega'], entrega: [] }));
~~~

## Caminos más baratos
- **Dijkstra (1959):** Edsger Dijkstra lo publicó en *A note on two problems in connexion with graphs*. Es voraz: siempre fija el nodo no visitado más cercano. Con un montículo cuesta O((V + E) log V). No funciona con pesos negativos, porque fijar un nodo supone que ningún camino posterior puede abaratarlo.
- **Bellman-Ford:** admite pesos negativos y detecta ciclos negativos; cuesta O(V·E).
- **Floyd-Warshall:** calcula las distancias entre todos los pares con programación dinámica en O(V³).
- **A*:** de Hart, Nilsson y Raphael (1968). Agrega a Dijkstra una **heurística** que estima la distancia restante (por ejemplo, la distancia en línea recta). Si la heurística nunca sobreestima, encuentra el óptimo explorando muchos menos nodos. Lo usan los videojuegos y los navegadores GPS.

## Árboles de expansión mínima y unión-búsqueda
Conectar todos los nodos con el menor costo total (cablear oficinas, tender tuberías) se resuelve con **Kruskal** (1956), que agrega las aristas de la más barata a la más cara saltándose las que formarían un ciclo, o con **Prim** (1957), que hace crecer un árbol desde un nodo. Kruskal necesita saber rápido si dos nodos ya están conectados: la estructura **unión-búsqueda** con compresión de caminos, analizada por Robert Tarjan en 1975, lo responde en tiempo prácticamente constante.

## Grafos en sistemas reales
- **Gestores de paquetes y herramientas de compilación:** orden topológico de dependencias.
- **Redes sociales:** amigos de amigos (BFS de dos niveles), comunidades.
- **La web:** el algoritmo PageRank de Brin y Page (1998) ordenaba páginas según la estructura de enlaces del grafo de la web.
- **Rutas y logística:** caminos más cortos con pesos (distancia, tiempo, costo).
- **Detección de interbloqueos:** un ciclo en el grafo de espera entre procesos.
Steven Skiena insiste en *The Algorithm Design Manual* en que la habilidad clave es **reconocer** que un problema es un problema de grafos; una vez modelado, casi siempre existe un algoritmo conocido.`,
  checks: [
    ['Un grafo no dirigido tiene 7 aristas. ¿Cuánto suman los grados de todos sus nodos?', '14, por el lema del apretón de manos (2E).'],
    ['¿Por qué Dijkstra falla con pesos negativos?', 'Porque fija definitivamente el nodo más cercano suponiendo que ningún camino posterior puede ser más barato; una arista negativa descubierta después podría abaratarlo y el algoritmo ya no lo corrige.'],
    ['¿Cómo detectas con DFS si un grafo dirigido tiene ciclo?', 'Marcando los nodos en exploración (grises): si se encuentra una arista hacia un nodo gris, se volvió a un ancestro del recorrido y hay un ciclo.'],
    ['¿Qué aporta la heurística de A* frente a Dijkstra?', 'Orienta la búsqueda hacia el destino, de modo que explora muchos menos nodos; si la heurística no sobreestima, el resultado sigue siendo óptimo.'],
    ['Modela como grafo: "una tarea no puede empezar hasta que terminen otras". ¿Qué tipo de grafo es y qué algoritmo da un orden válido?', 'Un grafo dirigido acíclico (DAG); el orden topológico (Kahn o DFS) da una secuencia válida, y si existe un ciclo no hay orden posible.']
  ],
  cites: ['Euler, L. (1736). Solutio problematis ad geometriam situs pertinentis. *Commentarii Academiae Scientiarum Petropolitanae*, 8.', 'Dijkstra, E. W. (1959). A note on two problems in connexion with graphs. *Numerische Mathematik*, 1.', 'Hart, P., Nilsson, N. y Raphael, B. (1968). A Formal Basis for the Heuristic Determination of Minimum Cost Paths. *IEEE Transactions on Systems Science and Cybernetics*, 4(2).', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Parte VI (algoritmos de grafos).', 'Skiena, S. (2020). *The Algorithm Design Manual* (3.ª ed.). Springer.'],
  project: { t: 'Ruteador del patio',
    goal: 'Modelar un patio real como grafo y resolver con él rutas y planificación de tareas.',
    steps: ['Dibuja un patio con al menos 20 puntos (entrada, cruces, espacios) y sus distancias en metros; guárdalo como lista de adyacencia.', 'Calcula con BFS la ruta con menos giros y con Dijkstra la ruta más corta en metros desde la entrada a cualquier espacio.', 'Implementa A* con la distancia en línea recta como heurística y compara cuántos nodos explora frente a Dijkstra.', 'Modela las tareas de preparación de una unidad como DAG y obtén un orden topológico; agrega a propósito un ciclo y detecta el error.', 'Calcula con Kruskal y unión-búsqueda la red de cámaras de vigilancia más barata que conecte todas las zonas.'],
    deliver: 'El código, el grafo de ejemplo (con un dibujo) y las rutas y órdenes calculados.' },
  hito: ['Modela los pasillos de PatioApp como grafo con distancias y calcula con Dijkstra la ruta más corta desde la entrada hasta el espacio de una unidad.', 'Ordena las tareas de preparación de una unidad (lavado, revisión, pintura, entrega) con orden topológico y avisa si hay dependencias circulares.']
});

X('m4.dp', {
  deep: `
## Un nombre elegido para no asustar
Richard Bellman desarrolló la programación dinámica en la década de 1950 en la RAND Corporation y la publicó en su libro *Dynamic Programming* (1957). En su autobiografía contó que eligió la palabra "dinámica" porque sonaba bien y era difícil darle un sentido negativo: el secretario de Defensa de entonces desconfiaba de la palabra "investigación matemática". Detrás del nombre hay una idea simple: **no resolver dos veces el mismo subproblema**.

## Cómo demostrar que un algoritmo voraz es correcto
Un voraz funciona si el problema tiene la **propiedad de elección voraz** (existe una solución óptima que empieza con la elección voraz) y **subestructura óptima**. La técnica habitual es el **argumento de intercambio**: tomas una solución óptima cualquiera y muestras que puedes cambiar su primera elección por la voraz sin empeorarla.
Ejemplo clásico de Cormen y sus coautores (capítulo 15 de la 4.ª edición): **selección de actividades**. Para atender la mayor cantidad de citas que no se solapan en el taller, elige siempre la que **termina primero**. Si una solución óptima empezara con otra cita, cambiarla por la que termina antes no genera conflictos, así que la voraz también es óptima.
~~~js
function maxCitas(citas) {                // [inicio, fin]
  const orden = [...citas].sort((a, b) => a[1] - b[1]);
  let fin = -Infinity, elegidas = [];
  for (const c of orden) if (c[0] >= fin) { elegidas.push(c); fin = c[1]; }
  return elegidas;
}
console.log(maxCitas([[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11]]));
~~~
Otro voraz famoso es la **codificación de Huffman** (1952), que asigna códigos más cortos a los símbolos más frecuentes y es parte de los formatos ZIP, JPEG y MP3.

## Receta para programación dinámica
Kleinberg y Tardos, en *Algorithm Design*, y Cormen y sus coautores coinciden en estos pasos:
1. **Estado:** qué significa «dp[i]» o «dp[i][j]», en una frase completa.
2. **Transición:** cómo se calcula un estado a partir de otros más pequeños.
3. **Casos base.**
4. **Orden de cálculo:** que cada estado se calcule después de los que necesita.
5. **Respuesta:** qué estado contiene la solución.
6. **Reconstrucción:** guardar qué decisión dio el óptimo para recuperar la solución completa, no solo su valor.

## La mochila 0/1
Tienes un camión madrina con capacidad W y unidades con peso y valor. ¿Cuáles llevar para maximizar el valor? «dp[i][w]» es el mejor valor usando las primeras i unidades con capacidad w. Para cada unidad hay dos opciones: no llevarla (dp[i−1][w]) o llevarla (valor + dp[i−1][w − peso]).
~~~js
function mochila(items, W) {
  const dp = Array(W + 1).fill(0);
  for (const { peso, valor } of items)
    for (let w = W; w >= peso; w--)          // de atrás hacia adelante: cada ítem una sola vez
      dp[w] = Math.max(dp[w], dp[w - peso] + valor);
  return dp[W];
}
console.log(mochila([{ peso: 2, valor: 30 }, { peso: 3, valor: 50 }, { peso: 4, valor: 60 }], 5)); // 80
~~~
Cuesta O(n·W). Parece polinomial, pero W es un número y no la cantidad de datos: si W tiene 30 dígitos, la tabla es inmanejable. Por eso se dice que es **pseudopolinomial**, y la mochila sigue siendo NP-difícil. La versión **fraccionaria** (se puede llevar parte de un ítem) sí se resuelve con un voraz por valor/peso.

## Subsecuencia común más larga y diff
La LCS de dos secuencias se calcula con «dp[i][j] = dp[i−1][j−1] + 1» si los elementos coinciden, o el máximo entre quitar uno de cada lado. Es la base de las herramientas que comparan archivos: el «diff» de Unix de Hunt y McIlroy (1976) y el algoritmo de Eugene Myers (1986), que usa Git por defecto. La **distancia de edición** de Levenshtein (1965) cuenta las inserciones, borrados y sustituciones mínimas para convertir un texto en otro, y se usa en correctores ortográficos y en la búsqueda tolerante a errores ("¿quisiste decir ABC123?").

## Arriba-abajo o abajo-arriba
- **Memoización (arriba-abajo):** escribes la recursión natural y guardas resultados. Solo calcula los estados que se necesitan.
- **Tabulación (abajo-arriba):** llenas la tabla en orden con bucles. No usa la pila y suele ser más rápida; además permite ahorrar memoria guardando solo las filas que se necesitan, como en la mochila de arriba.

## Cuando nada eficiente funciona
Para problemas NP-difíciles (rutas de reparto con muchas paradas, horarios) se usan heurísticas, algoritmos de aproximación con garantía, **ramificación y poda** (backtracking que descarta ramas que no pueden mejorar la mejor solución encontrada) o resolutores especializados. Lo estudiarás en teoría de la computación.`,
  checks: [
    ['¿Qué dos propiedades necesita un problema para resolverse con programación dinámica?', 'Subproblemas que se repiten y subestructura óptima (la solución óptima se construye con soluciones óptimas de subproblemas).'],
    ['¿Por qué en la mochila 0/1 con arreglo de una dimensión se recorre w de mayor a menor?', 'Para que dp[w − peso] todavía corresponda a la fila anterior (sin el ítem actual); si se recorriera de menor a mayor, el mismo ítem podría usarse varias veces.'],
    ['Da un contraejemplo de que el voraz "la moneda más grande primero" falla con monedas {1, 3, 4} y monto 6.', 'El voraz da 4 + 1 + 1 (3 monedas) y el óptimo es 3 + 3 (2 monedas).'],
    ['¿Por qué la mochila 0/1 con O(n·W) no demuestra que P = NP?', 'Porque W es el valor de un número, no el tamaño de la entrada; el tamaño en bits de W es log W, así que O(n·W) es exponencial en el tamaño de la entrada (pseudopolinomial).'],
    ['¿Qué tiene que ver la subsecuencia común más larga con Git?', 'Comparar dos versiones de un archivo es encontrar las líneas comunes más largas; lo que no está en la LCS son las líneas agregadas o borradas que muestra git diff.']
  ],
  cites: ['Bellman, R. (1957). *Dynamic Programming*. Princeton University Press.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulos 14 y 15.', 'Kleinberg, J. y Tardos, É. (2005). *Algorithm Design*. Pearson. Capítulos 4 y 6.', 'Myers, E. (1986). An O(ND) Difference Algorithm and Its Variations. *Algorithmica*, 1.', 'Huffman, D. (1952). A Method for the Construction of Minimum-Redundancy Codes. *Proceedings of the IRE*, 40(9).'],
  project: { t: 'Optimizador logístico del patio',
    goal: 'Resolver problemas reales de optimización con voraces y programación dinámica, justificando cuál técnica es correcta en cada caso.',
    steps: ['Programa las citas del taller con el voraz de selección de actividades y demuestra con un ejemplo que ordenar por inicio no funciona.', 'Resuelve la carga de un camión madrina con mochila 0/1 y reconstruye qué unidades llevar.', 'Implementa la distancia de edición para sugerir la placa correcta cuando el usuario escribe con un error.', 'Implementa un diff de dos inventarios con LCS que muestre altas y bajas.', 'Compara el tiempo de la mochila con 20 unidades por fuerza bruta (2^20 combinaciones) y con programación dinámica.'],
    deliver: 'El código de los cuatro problemas, sus pruebas y una explicación de por qué cada técnica es correcta.' },
  hito: ['Agrega a PatioApp la asignación de unidades a un camión madrina con capacidad limitada, maximizando el valor transportado (mochila 0/1), mostrando qué unidades van.', 'Agrega la comparación de dos inventarios (ayer y hoy) que liste altas y bajas usando la subsecuencia común más larga, y sugerencias de placa con distancia de edición.']
});
})();
