(function () {
var S = SDC.S;

S('m4', 'm4.heap', { title: 'Montículos y colas de prioridad',
  ask: '¿Qué concepto de montículos o colas de prioridad se aplica?',
  lesson: `
> **La idea en simple.** En la sala de emergencias de un hospital no se atiende por orden de llegada, sino por gravedad: el paciente más grave pasa primero, aunque haya llegado último. Una **cola de prioridad** funciona así: siempre entrega el elemento más importante. La forma más usada de implementarla es el **montículo** (*heap*), una estructura ingeniosa que logra agregar y sacar en tiempo logarítmico usando solo un arreglo.

## La cola de prioridad
Una cola de prioridad es un **tipo abstracto de datos** con tres operaciones principales:
- **Insertar** un elemento con su prioridad.
- **Ver** el elemento de mayor prioridad (o menor, según el caso).
- **Extraer** el elemento de mayor prioridad.
Implementaciones ingenuas: con una lista desordenada, insertar es O(1) pero extraer es O(n) (hay que buscar el máximo); con una lista ordenada, extraer es O(1) pero insertar es O(n). El montículo logra **O(log n) para ambas**, y O(1) para ver el máximo.

## El montículo binario
J. W. J. Williams inventó el **montículo binario** en 1964, junto con el algoritmo heapsort. Es un **árbol binario casi completo** (todos los niveles llenos salvo quizás el último, que se llena de izquierda a derecha) con la **propiedad de montículo**: en un **montículo de máximos**, cada nodo es mayor o igual que sus hijos; en uno **de mínimos**, menor o igual. Por eso la raíz es siempre el máximo (o el mínimo).

La genialidad está en la representación: como el árbol es casi completo, se guarda en un **arreglo** sin punteros. Con índices desde 0, el nodo en la posición i tiene:
- hijo izquierdo en **2i + 1**,
- hijo derecho en **2i + 2**,
- padre en **⌊(i − 1) / 2⌋**.
Así, un montículo de un millón de elementos ocupa exactamente un millón de posiciones contiguas, lo que además aprovecha muy bien la caché.

## Insertar: subir
Para insertar, se agrega el elemento al **final** del arreglo (la primera posición libre del último nivel, lo que mantiene el árbol casi completo) y luego se lo hace **subir** (*sift up*): mientras sea mayor que su padre, se intercambian. Como la altura del árbol es ⌊log₂ n⌋, sube a lo sumo log n niveles: **O(log n)**.

## Extraer: bajar
Para extraer el máximo, se toma la raíz, se pone en su lugar el **último** elemento del arreglo y se lo hace **bajar** (*sift down*): mientras sea menor que alguno de sus hijos, se intercambia con el **mayor** de ellos. También **O(log n)**.
~~~js
class MonticuloMin {                          // montículo de mínimos: la raíz es el de menor prioridad numérica
  constructor() { this.a = []; }
  get size() { return this.a.length; }
  insertar(x) {
    const a = this.a; a.push(x);
    let i = a.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (a[p].prioridad <= a[i].prioridad) break; [a[p], a[i]] = [a[i], a[p]]; i = p; }
  }
  extraer() {
    const a = this.a, raiz = a[0], ultimo = a.pop();
    if (a.length) {
      a[0] = ultimo; let i = 0;
      while (true) {
        const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < a.length && a[l].prioridad < a[m].prioridad) m = l;
        if (r < a.length && a[r].prioridad < a[m].prioridad) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]]; i = m;
      }
    }
    return raiz;
  }
}
const cola = new MonticuloMin();
[['ABC-123', 3], ['XYZ-987', 1], ['JKL-555', 2], ['MNO-222', 1]].forEach(([placa, prioridad]) => cola.insertar({ placa, prioridad }));
const orden = []; while (cola.size) orden.push(cola.extraer().placa);
console.log(orden.join(' → '));              // primero las de prioridad 1
~~~

## Construir un montículo en tiempo lineal
Si ya se tienen n elementos, insertarlos uno por uno cuesta O(n log n). Robert Floyd mostró en 1964 que se puede hacer en **O(n)**: aplicar "bajar" a cada nodo interno, desde el último hasta la raíz. El argumento: la mitad de los nodos son hojas (no bajan nada), un cuarto baja como mucho un nivel, un octavo dos niveles, y así; la suma n/4 · 1 + n/8 · 2 + n/16 · 3 + … es menor que n.

## Heapsort
Con un montículo se ordena en **O(n log n)** sin memoria extra: se construye un montículo de máximos con todo el arreglo y se extrae el máximo n veces, poniendo cada uno al final del arreglo. Garantiza O(n log n) incluso en el peor caso (a diferencia de quicksort), pero en la práctica suele ser más lento que quicksort y merge sort por su mal uso de la caché (salta por todo el arreglo). Por eso se usa como respaldo en introsort.

## Aplicaciones
- **Planificación:** el sistema operativo elige el siguiente proceso o tarea a ejecutar según su prioridad; los temporizadores (ejecutar algo dentro de 30 segundos) se guardan en un montículo ordenado por hora de vencimiento.
- **Algoritmos de grafos:** el algoritmo de **Dijkstra** para caminos mínimos y el de **Prim** para árboles de expansión usan una cola de prioridad, como verás en la unidad de caminos mínimos.
- **Los k mayores:** para encontrar los 10 clientes con más estadías entre un millón, se mantiene un montículo de **mínimos** de tamaño 10: cada nuevo elemento se compara con la raíz (el menor de los 10 mejores) y, si es mayor, la reemplaza. Cuesta O(n log k) en lugar de O(n log n) de ordenar todo.
- **Mezclar k listas ordenadas** (por ejemplo, los registros ya ordenados de 20 sedes): un montículo con el primer elemento de cada lista da el siguiente global en O(log k).
- **Simulación de eventos discretos:** los eventos futuros se guardan por su hora y se procesa siempre el más próximo.
- **Compresión de Huffman:** se unen repetidamente los dos símbolos menos frecuentes, extrayéndolos de un montículo de mínimos.

## Montículos d-arios
Un montículo no tiene por qué ser binario: en un montículo **d-ario** cada nodo tiene d hijos. Con d = 4, el árbol es la mitad de alto, así que insertar (subir) es más rápido, aunque extraer (bajar) compara con más hijos en cada nivel. En la práctica, los montículos de 4 hijos suelen ser más rápidos que los binarios porque los hijos de un nodo quedan contiguos en memoria y caben en una misma línea de caché.

## En las bibliotecas
Python tiene el módulo «heapq» (montículo de mínimos sobre una lista), Java la clase «PriorityQueue», C++ «std::priority_queue». JavaScript **no** tiene una cola de prioridad en su biblioteca estándar, por eso es habitual implementarla (como arriba) o usar un paquete. Existen variantes más sofisticadas, como los montículos de **Fibonacci** (Michael Fredman y Robert Tarjan, 1984), que mejoran la complejidad teórica de Dijkstra pero rara vez se usan en la práctica por sus constantes altas.

## Ejemplo resuelto: la cola de despacho de grúas
En PatioApp, las solicitudes de grúa llegan todo el día y deben atenderse por prioridad: primero las emergencias (unidad bloqueando la salida), luego las de clientes con convenio y por último las internas; dentro de cada nivel, por orden de llegada.
1. **Prioridad compuesta:** la clave es el par (nivel, hora de llegada); se compara primero el nivel y, si empata, la hora. Esto además vuelve **estable** el montículo (que por sí solo no lo es): dos solicitudes del mismo nivel salen en el orden en que llegaron.
2. **Estructura:** un montículo de mínimos sobre esa clave. Con unas 500 solicitudes al día, cada operación toma unas 9 comparaciones (log₂ 500).
3. **Cambio de prioridad:** si una solicitud interna se vuelve urgente, hay que **disminuir su clave**. Se guarda, junto al montículo, un mapa de la solicitud a su posición en el arreglo, para encontrarla en O(1) y hacerla subir en O(log n).
4. **Prueba:** se generan miles de secuencias aleatorias de inserciones y extracciones y se compara el orden de salida con el de ordenar todo con «sort»: deben coincidir siempre.`,
  links: [['m4.trees', 'el montículo es un árbol binario casi completo'], ['m4.sp', 'Dijkstra y Prim usan colas de prioridad'], ['so.sched', 'los planificadores de procesos usan colas de prioridad']],
  read: 'Cormen, Leiserson, Rivest y Stein, *Introduction to Algorithms* (4.ª ed., 2022), capítulo 6; Sedgewick y Wayne, *Algorithms* (4.ª ed., 2011), sección 2.4; Williams (1964).',
  terms: [
    ['Cola de prioridad', 'tipo abstracto de datos que siempre entrega el elemento de mayor prioridad', ['Sala de emergencias.', 'Insertar y extraer el máximo.', 'Se implementa con un montículo.']],
    ['Montículo binario', 'árbol binario casi completo en el que cada nodo es mayor (o menor) que sus hijos', ['Williams, 1964.', 'Se guarda en un arreglo.', 'La raíz es el máximo.']],
    ['Propiedad de montículo', 'condición de que cada nodo sea mayor o igual que sus hijos en un montículo de máximos', ['Solo vertical, no entre hermanos.', 'Se restablece al subir o bajar.', 'Garantiza el máximo en la raíz.']],
    ['Subir (sift up)', 'operación que intercambia un nodo con su padre mientras viole la propiedad de montículo', ['Tras insertar.', 'O(log n).', 'Desde el final.']],
    ['Bajar (sift down)', 'operación que intercambia un nodo con su hijo mayor mientras viole la propiedad de montículo', ['Tras extraer.', 'O(log n).', 'Desde la raíz.']],
    ['Construcción de Floyd', 'construcción de un montículo en tiempo lineal bajando cada nodo interno desde el último', ['Floyd, 1964.', 'O(n).', 'Más rápida que n inserciones.']],
    ['Heapsort', 'ordenamiento que construye un montículo y extrae el máximo repetidamente', ['O(n log n) siempre.', 'Sin memoria extra.', 'Usado como respaldo en introsort.']],
    ['Los k mayores', 'problema de encontrar los k mejores de n elementos con un montículo de tamaño k', ['O(n log k).', 'Montículo de mínimos.', 'Los 10 clientes con más estadías.']]
  ],
  q: [
    ['En un montículo guardado en un arreglo con índices desde 0, ¿dónde está el hijo izquierdo del nodo 4?', 'En la posición 9', ['En la posición 8', 'En la posición 5', 'En la posición 2'], '2i + 1.', 2],
    ['¿Dónde está el padre del nodo en la posición 10?', 'En la posición 4', ['En la posición 5', 'En la posición 20', 'En la posición 9'], '⌊(i − 1) / 2⌋.', 2],
    ['¿Cuánto cuesta extraer el máximo de un montículo de n elementos?', 'O(log n)', ['O(1)', 'O(n)', 'O(n log n)'], 'Hay que bajar el último elemento.', 2],
    ['¿Por qué un montículo se puede guardar en un arreglo sin punteros?', 'Porque es un árbol casi completo y las posiciones de hijos y padre se calculan', ['Porque es un árbol de búsqueda', 'Porque no tiene hijos', 'Porque es una lista'], '2i + 1, 2i + 2, ⌊(i − 1)/2⌋.', 3],
    ['¿Cuánto cuesta construir un montículo con n elementos con el método de Floyd?', 'O(n)', ['O(n log n)', 'O(log n)', 'O(n²)'], 'La mayoría de los nodos baja poco.', 4],
    ['Para encontrar los 10 mayores entre un millón de valores, ¿qué conviene?', 'Un montículo de mínimos de tamaño 10', ['Ordenar todo el millón', 'Un montículo de máximos con el millón y extraer todo', 'Una lista enlazada'], 'O(n log k).', 3],
    ['¿Por qué heapsort suele ser más lento que quicksort en la práctica aunque garantice O(n log n)?', 'Porque salta por todo el arreglo y aprovecha mal la caché', ['Porque es O(n²)', 'Porque usa mucha memoria', 'Porque no ordena bien'], 'Constantes y localidad.', 4],
    { tf: 'En un montículo de máximos, el hijo izquierdo siempre es menor que el derecho.', v: false, e: 'La propiedad es solo entre padre e hijos, no entre hermanos.', l: 2 },
    { tf: 'JavaScript no incluye una cola de prioridad en su biblioteca estándar.', v: true, e: 'Python tiene heapq y Java PriorityQueue; en JavaScript se implementa o se usa un paquete.', l: 1 },
    { c: 'Escribe «esMonticuloMax(a)»: true si el arreglo cumple la propiedad de montículo de máximos.', f: 'esMonticuloMax', p: ['a'], t: [[[[9, 7, 8, 3, 5, 6]], true], [[[9, 7, 8, 10]], false], [[[]], true]], sol: '  for (let i = 1; i < a.length; i++) if (a[(i - 1) >> 1] < a[i]) return false;\n  return true;', l: 2 },
    { c: 'Escribe «heapsort(a)»: devuelve una copia ordenada de menor a mayor usando un montículo de máximos.', f: 'heapsort', p: ['a'], t: [[[[5, 2, 9, 1, 7]], [1, 2, 5, 7, 9]], [[[]], []], [[[3, 3, 1]], [1, 3, 3]]], sol: '  const h = [...a], n = h.length;\n  const bajar = (i, fin) => { while (true) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < fin && h[l] > h[m]) m = l; if (r < fin && h[r] > h[m]) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };\n  for (let i = (n >> 1) - 1; i >= 0; i--) bajar(i, n);\n  for (let fin = n - 1; fin > 0; fin--) { [h[0], h[fin]] = [h[fin], h[0]]; bajar(0, fin); }\n  return h;', l: 4 },
    { c: 'Escribe «kMayores(valores, k)»: devuelve los k mayores ordenados de mayor a menor.', f: 'kMayores', p: ['valores', 'k'], t: [[[[5, 1, 9, 3, 7, 8], 3], [9, 8, 7]], [[[2, 2, 1], 2], [2, 2]], [[[4], 2], [4]]], sol: '  return [...valores].sort((a, b) => b - a).slice(0, k);', h: 'La versión con montículo de tamaño k es O(n log k); aquí basta una solución correcta.', l: 2 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var i = R.int(0, 30); g.input(2, 'En un montículo en un arreglo con índices desde 0, ¿en qué posición está el hijo derecho del nodo ' + i + '?', 2 * i + 2, '2i + 2.'); });
    g.times(6, function (R) { var i = R.int(1, 60); g.input(2, '¿En qué posición está el padre del nodo ' + i + '?', Math.floor((i - 1) / 2), '⌊(i − 1) / 2⌋.'); });
    var ap = [['Elegir el siguiente proceso a ejecutar según su prioridad', 'Planificador del sistema operativo'], ['Encontrar los 10 clientes con más estadías', 'Montículo de tamaño k'], ['Mezclar los registros ordenados de 20 sedes', 'Mezcla de k listas'], ['Unir repetidamente los dos símbolos menos frecuentes', 'Codificación de Huffman'], ['Elegir el vértice más cercano no visitado', 'Algoritmo de Dijkstra']];
    ap.forEach(function (a) { g.mcq(3, '¿Qué aplicación de la cola de prioridad es? ' + a[0], a[1], ['Planificador del sistema operativo', 'Montículo de tamaño k', 'Mezcla de k listas', 'Codificación de Huffman', 'Algoritmo de Dijkstra'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Aplicaciones de los montículos.'); });
    var co = [['Insertar en un montículo', 'O(log n)'], ['Ver el máximo de un montículo', 'O(1)'], ['Construir un montículo con Floyd', 'O(n)'], ['Heapsort', 'O(n log n)'], ['Extraer el máximo de una lista desordenada', 'O(n)']];
    co.forEach(function (c) { g.mcq(2, '¿Qué costo tiene? ' + c[0], c[1], ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].filter(function (x) { return x !== c[1]; }), 'Costos de las operaciones.'); });
  },
  checks: [
    ['¿Qué es una cola de prioridad y por qué el montículo es una buena implementación?', 'Un tipo abstracto que entrega siempre el de mayor prioridad; el montículo da O(log n) para insertar y extraer y O(1) para ver el máximo.'],
    ['Explica cómo se inserta y cómo se extrae en un montículo binario.', 'Se inserta al final y se sube intercambiando con el padre; se extrae la raíz, se pone el último en su lugar y se baja intercambiando con el hijo mayor.'],
    ['¿Por qué la construcción de Floyd es O(n)?', 'Porque la mayoría de los nodos están cerca de las hojas y bajan pocos niveles; la suma de los trabajos es menor que n.'],
    ['¿Cómo encontrarías los k mayores de n valores eficientemente?', 'Con un montículo de mínimos de tamaño k, reemplazando la raíz cuando llega un valor mayor: O(n log k).']
  ],
  cites: ['Williams, J. W. J. (1964). Algorithm 232: Heapsort. *Communications of the ACM*, 7(6).', 'Floyd, R. (1964). Algorithm 245: Treesort 3. *Communications of the ACM*, 7(12).', 'Fredman, M. y Tarjan, R. (1987). Fibonacci Heaps and Their Uses in Improved Network Optimization Algorithms. *Journal of the ACM*, 34(3).', 'Cormen, T., Leiserson, C., Rivest, R. y Stein, C. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press.', 'Sedgewick, R. y Wayne, K. (2011). *Algorithms* (4.ª ed.). Addison-Wesley.'],
  project: { t: 'Cola de prioridad y sus aplicaciones',
    goal: 'Implementar un montículo y usarlo en problemas reales.',
    steps: ['Implementa un montículo binario de mínimos con insertar, ver, extraer y disminuir clave (con un mapa de posiciones).', 'Implementa la construcción de Floyd y compara su tiempo con n inserciones para un millón de elementos.', 'Implementa heapsort y compáralo con el sort del lenguaje.', 'Resuelve con tu montículo los k mayores de un archivo grande y la mezcla de k listas ordenadas.', 'Escribe pruebas basadas en propiedades que comparen el orden de extracción con el de ordenar.'],
    deliver: 'El código, las mediciones y las pruebas.' },
  hito: ['Implementa la cola de despacho de grúas de PatioApp con un montículo de prioridad compuesta (nivel, hora de llegada).', 'Agrega a la cola de grúas de PatioApp la operación de subir la prioridad de una solicitud y pruebas basadas en propiedades.']
});
SDC.after('m4.heap', 'm4.hash');

S('m4', 'm4.balanced', { title: 'Árboles balanceados: AVL, rojo-negro y árboles B',
  ask: '¿Qué concepto de árboles balanceados se aplica?',
  lesson: `
> **La idea en simple.** Un árbol de búsqueda es rápido solo si es "frondoso": si cada paso descarta la mitad de los datos. Si se insertan los datos en orden, el árbol crece como un palo y cada búsqueda recorre todo. Los árboles balanceados se **reacomodan solos** al insertar y borrar, como un bibliotecario que reorganiza los estantes para que ningún pasillo quede demasiado largo. Así garantizan búsquedas rápidas sin importar el orden de los datos.

## El problema
Un árbol binario de búsqueda (BST) tiene búsquedas, inserciones y borrados en O(h), donde h es su altura. Si está balanceado, h ≈ log₂ n; si se degenera (como al insertar claves ordenadas), h = n. Un árbol **autobalanceado** mantiene h = O(log n) **siempre**, reestructurándose con operaciones locales baratas.

## Rotaciones
La herramienta básica de casi todos los árboles balanceados es la **rotación**: un cambio local que reorganiza tres nodos y sus subárboles **sin alterar el orden** en que el recorrido en orden visita las claves. En una **rotación a la derecha** sobre un nodo y su hijo izquierdo, el hijo sube y el nodo baja a su derecha; el subárbol derecho del hijo pasa a ser el izquierdo del nodo. Es O(1): solo se cambian unos pocos punteros.
~~~txt
        y                     x
       / \\      derecha     / \\
      x   C    ──────→    A   y
     / \\       ←──────       / \\
    A   B      izquierda    B   C
~~~
En ambos árboles, el orden es A < x < B < y < C: la rotación cambia la forma y las alturas, pero no el orden.

## Árboles AVL
Georgy Adelson-Velsky y Evgenii Landis publicaron en 1962 el primer árbol autobalanceado, el **AVL**. Su regla: en cada nodo, las alturas de los dos subárboles difieren **a lo sumo en 1**. Cada nodo guarda su **factor de balance** (altura derecha menos altura izquierda, que debe ser −1, 0 o 1). Tras insertar o borrar, se recorre el camino hacia la raíz actualizando alturas; si un nodo queda con factor ±2, se corrige con una **rotación simple** (si el desbalance está "en línea": izquierda-izquierda o derecha-derecha) o una **rotación doble** (si está "en zigzag": izquierda-derecha o derecha-izquierda). La altura de un AVL es como máximo unas 1,44 · log₂ n: muy cercana a la ideal, lo que lo hace excelente para búsquedas.

## Árboles rojo-negro
Rudolf Bayer propuso en 1972 los "árboles B binarios simétricos", que Leonidas Guibas y Robert Sedgewick reformularon en 1978 con colores: los **árboles rojo-negro**. Cada nodo es rojo o negro, con estas reglas:
1. La raíz es negra.
2. Un nodo rojo no puede tener hijos rojos (no hay dos rojos seguidos).
3. Todo camino desde un nodo hasta sus hojas nulas tiene la **misma cantidad de nodos negros**.
Consecuencia: el camino más largo (alternando rojo y negro) es a lo sumo el doble del más corto (solo negros), así que la altura es como máximo 2 · log₂(n + 1). Están **menos** balanceados que los AVL (búsquedas un poco más lentas), pero necesitan **menos rotaciones** al insertar y borrar (como máximo 2 al insertar y 3 al borrar, el resto son recoloreos). Por eso son la elección de las bibliotecas estándar: «TreeMap» de Java, «std::map» de C++, el planificador CFS del núcleo de Linux (que ordena las tareas por tiempo de ejecución) y el gestor de memoria virtual de Linux. Sedgewick propuso en 2008 una versión simplificada, los **rojo-negro inclinados a la izquierda**, con mucho menos código.

## Árboles B: hechos para el disco
Leer un dato del disco cuesta lo mismo que leer un bloque entero (4 a 16 KB), y es miles de veces más lento que la memoria. Un árbol binario con un millón de claves tiene unos 20 niveles: 20 lecturas de disco por búsqueda. Rudolf Bayer y Edward McCreight inventaron en 1970, en los laboratorios de Boeing, el **árbol B**: cada nodo tiene **muchas** claves (cientos) y, por tanto, muchos hijos. Con 500 hijos por nodo, un árbol de **3 niveles** guarda 500³ = 125 millones de claves: cualquier búsqueda toca solo 3 nodos, y como la raíz y el segundo nivel suelen estar en caché, a menudo basta **una** lectura de disco.

Reglas de un árbol B de orden m: cada nodo tiene entre ⌈m/2⌉ y m hijos (salvo la raíz); las claves de cada nodo están ordenadas; y **todas las hojas están al mismo nivel**. Al insertar en un nodo lleno, se **divide** en dos y la clave del medio sube al padre (si el padre se llena, se divide también, y así hasta la raíz, que es la única forma en que el árbol crece en altura).

La variante **B+** guarda los datos solo en las hojas, y las hojas están enlazadas entre sí, lo que hace muy eficientes los **recorridos por rango** («todas las estadías entre el 1 y el 15 de noviembre»). Es la estructura de los **índices** de casi todas las bases de datos relacionales (PostgreSQL, MySQL/InnoDB, SQL Server, Oracle, SQLite) y de sistemas de archivos como NTFS, ext4 (para directorios), Btrfs y APFS. La viste en uso en Bases de Datos II.

## Otras estructuras balanceadas
- **Listas de saltos** (*skip lists*, William Pugh, 1990): listas enlazadas con niveles de "atajos" elegidos al azar; dan O(log n) esperado y son mucho más simples de implementar, sobre todo en versiones concurrentes. Redis las usa en sus conjuntos ordenados.
- **Treaps** y **árboles splay** (Daniel Sleator y Robert Tarjan, 1985), que se reacomodan para que los elementos accedidos recientemente queden cerca de la raíz.
- **Árboles LSM** (*log-structured merge*, Patrick O'Neil y otros, 1996): en lugar de actualizar en el lugar, acumulan escrituras en memoria y las vuelcan a disco en archivos ordenados que se mezclan en segundo plano. Optimizan las escrituras y los usan RocksDB, Cassandra y LevelDB.

## Elegir la estructura adecuada
| Necesidad | Estructura recomendada |
| Buscar por clave exacta, sin orden | tabla hash |
| Buscar por clave y recorrer en orden o por rangos, en memoria | árbol rojo-negro o lista de saltos |
| Muchas búsquedas, pocas modificaciones, en memoria | AVL o un arreglo ordenado con búsqueda binaria |
| Índice en disco con lecturas y escrituras | árbol B+ |
| Muchísimas escrituras secuenciales en disco | árbol LSM |
Como siempre, la respuesta depende de las operaciones dominantes y de dónde viven los datos.

Y antes de implementar cualquiera de ellas a mano, conviene revisar si la biblioteca estándar o la base de datos ya la ofrecen, probada por millones de usuarios.

## Ejemplo resuelto: el índice por fecha de ingreso
La tabla de estadías de PatioApp tiene 20 millones de filas, y la consulta más frecuente de gerencia es "estadías entre dos fechas".
1. **Sin índice:** recorrer los 20 millones de filas: segundos o minutos.
2. **Tabla hash por fecha:** sirve para "estadías del 13 de noviembre", pero no para rangos: las fechas consecutivas quedan dispersas.
3. **Índice B+ por fecha de ingreso:** con nodos de 8 KB y unas 400 claves por nodo, la altura es de 3 niveles (400³ = 64 millones). La consulta baja por el árbol hasta la primera fecha del rango (3 lecturas, casi siempre en caché) y luego **recorre las hojas enlazadas** hasta la última fecha. Tiempo: milisegundos.
4. **Costo:** cada inserción actualiza también el índice (una lectura y escritura más, y a veces una división de nodo). Con miles de inserciones por hora, es un costo pequeño frente al beneficio. Por eso no se indexa **todo**: solo las columnas por las que se busca o se ordena a menudo.
~~~js
// Altura de un árbol B según su orden (hijos por nodo) y el número de claves
const alturaB = (claves, hijos) => Math.ceil(Math.log(claves) / Math.log(hijos));
for (const n of [1e6, 2e7, 1e9]) console.log(n.toExponential(0), 'claves → binario:', Math.ceil(Math.log2(n)), 'niveles · árbol B de 400:', alturaB(n, 400));
~~~`,
  links: [['m4.trees', 'los árboles balanceados resuelven la degeneración del BST'], ['bd2.index', 'los índices B+ se estudian en Bases de Datos II'], ['so.fs', 'los sistemas de archivos usan árboles B']],
  read: 'Cormen y otros, *Introduction to Algorithms* (4.ª ed.), capítulos 13 y 18; Sedgewick y Wayne, *Algorithms* (4.ª ed.), sección 3.3; Bayer y McCreight (1972); Comer, *The Ubiquitous B-Tree* (1979).',
  terms: [
    ['Árbol autobalanceado', 'árbol de búsqueda que se reestructura para mantener altura O(log n)', ['AVL.', 'Rojo-negro.', 'Árbol B.']],
    ['Rotación', 'reorganización local de nodos que cambia la forma del árbol sin alterar el orden de las claves', ['O(1).', 'Simple o doble.', 'Base del balanceo.']],
    ['Árbol AVL', 'árbol binario en el que las alturas de los subárboles de cada nodo difieren a lo sumo en 1', ['Adelson-Velsky y Landis, 1962.', 'Factor de balance.', 'Altura ≤ 1,44 log₂ n.']],
    ['Árbol rojo-negro', 'árbol binario con nodos coloreados cuyas reglas limitan la altura a 2 log₂(n + 1)', ['Guibas y Sedgewick, 1978.', 'TreeMap de Java.', 'Pocas rotaciones.']],
    ['Árbol B', 'árbol de búsqueda con muchos hijos por nodo, diseñado para minimizar lecturas de disco', ['Bayer y McCreight, 1970.', 'Todas las hojas al mismo nivel.', 'Pocos niveles.']],
    ['Árbol B+', 'variante del árbol B con los datos en las hojas y las hojas enlazadas', ['Índices de bases de datos.', 'Recorridos por rango.', 'Sistemas de archivos.']],
    ['Lista de saltos', 'lista enlazada con niveles de atajos aleatorios que da búsquedas O(log n) esperadas', ['Pugh, 1990.', 'Redis.', 'Simple y concurrente.']],
    ['Árbol LSM', 'estructura que acumula escrituras en memoria y las vuelca en archivos ordenados que se mezclan', ['RocksDB.', 'Cassandra.', 'Optimiza escrituras.']]
  ],
  q: [
    ['¿Qué garantiza un árbol autobalanceado?', 'Altura O(log n) sin importar el orden de inserción', ['Que no tenga hojas', 'Altura constante', 'Que no se puedan borrar claves'], 'Por eso las operaciones son O(log n).', 1],
    ['¿Qué conserva una rotación?', 'El orden en que el recorrido en orden visita las claves', ['La altura del árbol', 'La raíz', 'El color de los nodos'], 'Cambia la forma, no el orden.', 2],
    ['¿Qué regla define a un árbol AVL?', 'Las alturas de los subárboles de cada nodo difieren a lo sumo en 1', ['Todos los nodos son rojos o negros', 'Cada nodo tiene cientos de hijos', 'Las hojas están enlazadas'], 'Factor de balance −1, 0 o 1.', 2],
    ['¿Por qué las bibliotecas estándar prefieren árboles rojo-negro a AVL?', 'Porque necesitan menos rotaciones al insertar y borrar', ['Porque buscan más rápido', 'Porque son más fáciles de dibujar', 'Porque no tienen reglas'], 'Están un poco menos balanceados.', 3],
    ['¿Por qué las bases de datos usan árboles B y no árboles binarios para sus índices?', 'Porque al tener muchos hijos por nodo, la altura es muy pequeña y se leen pocos bloques del disco', ['Porque son más simples', 'Porque ocupan menos memoria siempre', 'Porque no necesitan orden'], 'Bayer y McCreight, 1970.', 3],
    ['Un árbol B con 500 hijos por nodo y 3 niveles, ¿cuántas claves puede guardar aproximadamente?', '125 millones', ['1500', '500 000', '1 000'], '500³.', 3],
    ['¿Qué ventaja tiene el árbol B+ para consultas por rango?', 'Sus hojas están enlazadas y se recorren en orden sin volver a subir', ['Que no tiene raíz', 'Que usa hash', 'Que ordena al azar'], 'Ideal para "entre dos fechas".', 3],
    { tf: 'En un árbol rojo-negro, un nodo rojo puede tener hijos rojos.', v: false, e: 'Está prohibido tener dos rojos seguidos.', l: 2 },
    { tf: 'En un árbol B, todas las hojas están al mismo nivel.', v: true, e: 'Crece por la raíz al dividirse.', l: 2 },
    { c: 'Escribe «esAVL(nodo)»: cada nodo es {izq, der} o null; devuelve true si en todos los nodos las alturas de los subárboles difieren a lo sumo en 1.', f: 'esAVL', p: ['nodo'], t: [[[{ izq: { izq: null, der: null }, der: null }], true], [[{ izq: { izq: { izq: null, der: null }, der: null }, der: null }], false], [[null], true]], sol: '  const h = n => { if (!n) return 0; const a = h(n.izq), b = h(n.der); if (a < 0 || b < 0 || Math.abs(a - b) > 1) return -1; return 1 + Math.max(a, b); };\n  return h(nodo) >= 0;', l: 3 },
    { c: 'Escribe «rotarDerecha(y)»: y es {clave, izq, der} con izq no nulo; devuelve la nueva raíz tras la rotación a la derecha (sin modificar la clave de ningún nodo).', f: 'rotarDerecha', p: ['y'], t: [[[{ clave: 'y', izq: { clave: 'x', izq: 'A', der: 'B' }, der: 'C' }], { clave: 'x', izq: 'A', der: { clave: 'y', izq: 'B', der: 'C' } }]], sol: '  const x = y.izq;\n  return { clave: x.clave, izq: x.izq, der: { clave: y.clave, izq: x.der, der: y.der } };', l: 3 },
    { c: 'Escribe «alturaB(claves, hijos)»: niveles mínimos de un árbol B que guarda «claves» con «hijos» por nodo (⌈log_hijos(claves)⌉, mínimo 1).', f: 'alturaB', p: ['claves', 'hijos'], t: [[[1000000, 100], 3], [[125000000, 500], 3], [[5, 400], 1]], sol: '  return Math.max(1, Math.ceil(Math.log(claves) / Math.log(hijos) - 1e-9));', l: 2 }
  ],
  gen: function (g) {
    var es = [['Altura máxima de unas 1,44 log₂ n y búsquedas muy rápidas', 'AVL'], ['Usado por TreeMap de Java y std::map de C++', 'Rojo-negro'], ['Índices de PostgreSQL y MySQL', 'Árbol B+'], ['Conjuntos ordenados de Redis', 'Lista de saltos'], ['Motor de almacenamiento de RocksDB y Cassandra', 'Árbol LSM']];
    es.forEach(function (e) { g.mcq(2, '¿Qué estructura corresponde? ' + e[0], e[1], ['AVL', 'Rojo-negro', 'Árbol B+', 'Lista de saltos', 'Árbol LSM'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Estructuras balanceadas.'); });
    g.times(6, function (R) { var k = R.pick([100, 200, 400, 500]), n = R.int(2, 4); g.input(3, 'Un árbol B tiene ' + k + ' hijos por nodo y ' + n + ' niveles. ¿Cuántas claves puede guardar aproximadamente? (escribe ' + k + '^' + n + ')', Math.pow(k, n), 'hijos^niveles.'); });
    g.times(6, function (R) { var n = R.pick([1000, 1e6, 1e9]); g.input(2, '¿Cuántos niveles tiene aproximadamente un árbol binario balanceado con ' + n + ' claves? (⌈log₂ n⌉)', Math.ceil(Math.log2(n)), 'log₂ n.'); });
  },
  checks: [
    ['¿Por qué hacen falta árboles balanceados?', 'Porque un BST puede degenerar en una lista (altura n) y las operaciones pasan de O(log n) a O(n).'],
    ['Compara AVL y rojo-negro.', 'AVL está más balanceado y busca más rápido; rojo-negro hace menos rotaciones y es la elección de las bibliotecas estándar.'],
    ['¿Por qué el árbol B es ideal para el disco?', 'Porque tiene muchas claves por nodo, la altura es muy pequeña y cada búsqueda lee pocos bloques.'],
    ['¿Qué ventaja tiene un índice B+ sobre uno hash para consultas por rango de fechas?', 'Mantiene el orden y enlaza las hojas, así recorre el rango de forma secuencial; el hash dispersa las fechas.']
  ],
  cites: ['Adelson-Velsky, G. y Landis, E. (1962). An algorithm for the organization of information. *Doklady Akademii Nauk SSSR*, 146.', 'Guibas, L. y Sedgewick, R. (1978). A Dichromatic Framework for Balanced Trees. *FOCS 1978*.', 'Bayer, R. y McCreight, E. (1972). Organization and Maintenance of Large Ordered Indexes. *Acta Informatica*, 1(3).', 'Comer, D. (1979). The Ubiquitous B-Tree. *ACM Computing Surveys*, 11(2).', 'Pugh, W. (1990). Skip Lists: A Probabilistic Alternative to Balanced Trees. *Communications of the ACM*, 33(6).', 'O’Neil, P., Cheng, E., Gawlick, D. y O’Neil, E. (1996). The Log-Structured Merge-Tree (LSM-Tree). *Acta Informatica*, 33(4).'],
  project: { t: 'Árboles que se equilibran solos',
    goal: 'Implementar un árbol autobalanceado y compararlo con un BST simple.',
    steps: ['Implementa un BST simple y un árbol AVL (o rojo-negro inclinado a la izquierda) con inserción y búsqueda.', 'Inserta un millón de claves en orden y en orden aleatorio en ambos, y mide alturas y tiempos de búsqueda.', 'Verifica con pruebas que el recorrido en orden siempre devuelve las claves ordenadas tras cualquier secuencia de inserciones.', 'Simula un árbol B con nodos de capacidad configurable y cuenta los "accesos a disco" por búsqueda.', 'Crea un índice en una base de datos real, compara el plan de ejecución de una consulta por rango con y sin índice.'],
    deliver: 'El código, las mediciones y los planes de ejecución.' },
  hito: ['Crea en la base de datos de PatioApp el índice B+ por fecha de ingreso y compara el plan y el tiempo de la consulta por rango.', 'Documenta en PatioApp qué columnas se indexan y por qué, con el costo de cada índice en las inserciones.']
});
SDC.after('m4.balanced', 'm4.trees');
})();
