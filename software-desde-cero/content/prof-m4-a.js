(function () {
var D = SDC.D;
SDC.XM('m4', { prof: true });

D('m4.bigo', `## Análisis amortizado
A veces una operación es casi siempre barata pero, de vez en cuando, muy cara. El ejemplo clásico es agregar elementos a un **arreglo dinámico** (como los arreglos de JavaScript o las listas de Python): mientras queda espacio, agregar cuesta O(1); cuando se llena, hay que reservar un bloque nuevo (normalmente el **doble** de grande) y copiar todos los elementos, lo que cuesta O(n). ¿Agregar es entonces O(n)? No en promedio: si la capacidad se duplica, después de n inserciones las copias suman como mucho 1 + 2 + 4 + … + n < 2n. El costo total de n inserciones es O(n), así que el **costo amortizado** por inserción es **O(1)**. Robert Tarjan formalizó en 1985 este tipo de análisis, que no es un promedio sobre entradas aleatorias, sino una garantía sobre **cualquier** secuencia de operaciones.
~~~js
// Contar copias al agregar n elementos a un arreglo que duplica su capacidad
function copiasAlCrecer(n, factor = 2) {
  let capacidad = 1, tamano = 0, copias = 0;
  for (let i = 0; i < n; i++) {
    if (tamano === capacidad) { copias += tamano; capacidad *= factor; }
    tamano++;
  }
  return copias;
}
for (const n of [10, 1000, 1000000]) console.log(n, 'inserciones →', copiasAlCrecer(n), 'copias (menos de 2n)');
console.log('si creciera de 1 en 1:', (1000 * 999) / 2, 'copias para 1000 → O(n²)');
~~~
Si en lugar de duplicar se agregara un espacio fijo cada vez (por ejemplo, 10 lugares), las copias serían cuadráticas: la estrategia de crecimiento geométrico es lo que hace eficiente al arreglo dinámico.

## Ejemplo resuelto: comparar dos soluciones para detectar placas repetidas
Se tienen n placas registradas en el día y se quiere saber si alguna se registró dos veces.
1. **Comparar todos los pares:** para cada placa, recorrer las siguientes. Hay n(n − 1)/2 comparaciones: **O(n²)**. Con 100 000 placas, unos 5000 millones de comparaciones: minutos.
2. **Ordenar y comparar vecinas:** ordenar cuesta O(n log n) y luego basta una pasada O(n): en total **O(n log n)**. Con 100 000 placas, unos 1,7 millones de operaciones: milisegundos.
3. **Usar un conjunto (Set):** recorrer una vez y preguntar si la placa ya está: **O(n)** en promedio, con O(n) memoria extra.
La elección depende del contexto: si la memoria es escasa, la opción 2; si no, la 3. Lo que nunca conviene es la 1 con datos grandes. Este razonamiento, hecho antes de programar, es exactamente para lo que sirve la notación O.`);

D('m4.search', `## Ordenar en la práctica
- **Cota inferior:** cualquier algoritmo que ordena **comparando** elementos necesita, en el peor caso, Ω(n log n) comparaciones. El argumento: hay n! órdenes posibles y cada comparación, con dos resultados, a lo sumo divide por 2 las posibilidades; hacen falta log₂(n!) ≈ n log₂ n comparaciones para distinguirlas. Por eso merge sort y heapsort son **óptimos** entre los algoritmos por comparación.
- **Más rápido que n log n sin comparar:** si las claves son enteros en un rango pequeño, el **ordenamiento por conteo** (contar cuántas veces aparece cada valor) es O(n + k), y el **radix sort** ordena dígito por dígito. Sirven, por ejemplo, para ordenar estadías por número de días (de 0 a 365).
- **Estabilidad:** un ordenamiento es **estable** si conserva el orden original de los elementos con la misma clave. Importa al ordenar por varios criterios: si se ordena por hora y luego, de forma estable, por sede, cada sede queda ordenada por hora. Merge sort es estable; quicksort y heapsort, en sus versiones habituales, no.
- **Lo que usan los lenguajes:** **Timsort** (Tim Peters, 2002, para Python), un híbrido de merge sort e inserción que aprovecha los tramos ya ordenados de los datos reales; lo adoptaron también Java (para objetos) y el motor V8 de JavaScript desde 2018, por lo que «Array.prototype.sort» es estable desde ECMAScript 2019. C++ usa **introsort** (David Musser, 1997): quicksort que cambia a heapsort si la recursión se hace demasiado profunda, para garantizar O(n log n).

## Ejemplo resuelto: ordenar estadías por sede y hora
~~~js
const estadias = [
  { placa: 'A1', sede: 'Callao', hora: '09:10' }, { placa: 'B2', sede: 'Ate', hora: '08:05' },
  { placa: 'C3', sede: 'Callao', hora: '07:40' }, { placa: 'D4', sede: 'Ate', hora: '10:30' }
];
// Comparador compuesto: primero por sede, luego por hora (equivalente a dos ordenamientos estables)
estadias.sort((a, b) => a.sede.localeCompare(b.sede) || a.hora.localeCompare(b.hora));
console.log(estadias.map(e => e.sede + ' ' + e.hora + ' ' + e.placa).join(' | '));
~~~
El operador «||» devuelve la comparación por hora solo cuando la de sede da 0 (empate): una forma compacta de ordenar por varios criterios. Un error frecuente con «sort» en JavaScript: sin comparador, ordena **como texto**, y «[10, 9, 1].sort()» da «[1, 10, 9]». Con números siempre se pasa «(a, b) => a − b».`);

D('m4.stack', `## Ejemplo resuelto: evaluar expresiones con pilas
Las reglas de tarifa de PatioApp incluyen expresiones como «20 * dias + 5 * (horas - 2)». Edsger Dijkstra inventó en 1961 el algoritmo **shunting-yard** (patio de maniobras de trenes) que, con una **pila** de operadores, convierte la expresión a **notación polaca inversa** (los operadores van después de sus operandos: «20 dias * 5 horas 2 - * +»), que luego se evalúa con otra pila:
~~~js
function evaluarRPN(tokens, vars) {
  const pila = [];
  for (const t of tokens) {
    if ('+-*/'.includes(t)) {
      const b = pila.pop(), a = pila.pop();                  // el orden importa en - y /
      pila.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : a / b);
    } else pila.push(t in vars ? vars[t] : Number(t));
  }
  return pila.pop();
}
console.log(evaluarRPN(['20', 'dias', '*', '5', 'horas', '2', '-', '*', '+'], { dias: 3, horas: 6 }));   // 80
~~~
Las calculadoras HP usaron la notación polaca inversa durante décadas, y las máquinas virtuales de Java y de Python ejecutan su código intermedio exactamente así: con una pila de operandos.

## Colas circulares
Una cola implementada con un arreglo en el que se saca del principio con «shift» es O(n) por operación, porque hay que mover todos los elementos. La solución clásica es la **cola circular** (*ring buffer*): un arreglo de tamaño fijo con dos índices, cabeza y cola, que avanzan **módulo** el tamaño, dando la vuelta al llegar al final. Encolar y desencolar son O(1). Se usa en los búferes de teclado, de audio, de red y en los registros que guardan solo los últimos N eventos (como los últimos 1000 movimientos de una sede). La **bicola** o *deque* (cola de doble extremo) permite agregar y sacar por ambos lados en O(1), y sirve para algoritmos como la ventana deslizante.

En JavaScript no hay una cola eficiente incorporada: para colas grandes conviene implementar una circular o usar dos pilas (una para entrar y otra para salir, que se vuelca cuando se vacía), que dan O(1) amortizado.`);

D('m4.hash', `## Qué hace buena a una función hash
Una función hash para tablas debe ser **rápida** y **repartir bien** las claves: que claves parecidas («ABC-123» y «ABC-124») caigan en posiciones muy distintas. Funciones muy usadas: FNV-1a, MurmurHash (Austin Appleby, 2008) y xxHash. Si la función reparte mal, muchas claves caen en la misma posición y la tabla degenera en una lista: O(n) por búsqueda.

Ese riesgo tiene una versión maliciosa: en 2011, Alexander Klink y Julian Wälde mostraron en el congreso del Chaos Computer Club el ataque **HashDoS**: enviando a un servidor web miles de parámetros elegidos para colisionar en la tabla hash del lenguaje, un solo pedido podía ocupar la CPU durante minutos. Afectaba a PHP, Java, Python, Ruby y otros. La defensa fue usar funciones hash con una **semilla aleatoria** secreta por proceso (como **SipHash**, de Jean-Philippe Aumasson y Daniel Bernstein, 2012), de modo que el atacante no pueda predecir las colisiones. Python, Ruby y Rust la adoptaron.

## Encadenamiento y direccionamiento abierto
Dos formas de manejar colisiones:
- **Encadenamiento:** cada posición guarda una lista de los elementos que caen ahí. Simple y tolerante a factores de carga altos.
- **Direccionamiento abierto:** si la posición está ocupada, se prueba otra según una regla (**sondeo lineal**: la siguiente; **cuadrático**; **doble hash**). Todo vive en un solo arreglo, lo que aprovecha mejor la caché del procesador, pero el rendimiento cae mucho si el factor de carga se acerca a 1, y borrar exige marcas especiales. Las tablas modernas de alto rendimiento (como la de Rust, basada en las "SwissTables" de Google) usan direccionamiento abierto con trucos de SIMD.

## Ejemplo resuelto: un índice por placa
PatioApp debe responder en tiempo constante "¿dónde está la unidad ABC-123?". Se construye un índice en memoria:
~~~js
const ubicacion = new Map();                         // tabla hash: placa → espacio
function ingresar(placa, espacio) {
  if (ubicacion.has(placa)) throw new Error(placa + ' ya está en ' + ubicacion.get(placa));
  ubicacion.set(placa, espacio);
}
function salir(placa) { return ubicacion.delete(placa); }
ingresar('ABC-123', 'B-14'); ingresar('XYZ-987', 'C-02');
console.log(ubicacion.get('ABC-123'), salir('XYZ-987'), ubicacion.size);
~~~
Con 50 000 unidades, cada consulta sigue siendo O(1) en promedio, frente a O(n) de recorrer una lista. Una precaución: las placas se **normalizan** (mayúsculas, sin espacios) antes de usarlas como clave, porque para la tabla «abc-123» y «ABC-123» son claves distintas. Y si se necesitara listar las placas en orden o por rangos, un árbol de búsqueda sería mejor opción que la tabla hash.`);

D('m4.trees', `## Ejemplo resuelto: el árbol que se volvió lista
Se insertan en un árbol binario de búsqueda las placas en el orden en que llegan. Un lunes llegan ya **ordenadas** (una importación de la hoja de cálculo): A1, A2, A3, …, A1000.
1. A1 es la raíz; A2 va a su derecha; A3 a la derecha de A2; y así: el árbol queda como una **lista enlazada** inclinada a la derecha, de altura 1000.
2. Buscar A1000 recorre los 1000 nodos: O(n), no O(log n).
3. Si las mismas placas se insertaran en orden aleatorio, la altura esperada sería de unos 2,99 · log₂ n (resultado de Luc Devroye, 1986): unos 30 niveles para 1000 placas.
4. **Solución:** usar un árbol **autobalanceado** (AVL o rojo-negro, que verás en la unidad de árboles balanceados), que garantiza altura O(log n) sin importar el orden de inserción. Es lo que hacen las estructuras ordenadas de las bibliotecas estándar: «TreeMap» de Java y «std::map» de C++ son árboles rojo-negro.

## El recorrido en orden ordena
Una propiedad útil: el **recorrido en orden** (izquierda, raíz, derecha) de un árbol binario de búsqueda visita las claves **de menor a mayor**. Por eso un árbol de búsqueda no solo permite buscar, sino también listar en orden, encontrar el mínimo y el máximo, el sucesor de una clave o todas las claves en un rango («placas entre A500 y A600»), algo que una tabla hash no puede hacer eficientemente. Elegir entre tabla hash y árbol depende de si se necesitan **consultas ordenadas** o por **rangos**.
~~~js
function insertar(nodo, clave) {
  if (!nodo) return { clave, izq: null, der: null };
  if (clave < nodo.clave) nodo.izq = insertar(nodo.izq, clave); else nodo.der = insertar(nodo.der, clave);
  return nodo;
}
function enOrden(nodo, out = []) { if (nodo) { enOrden(nodo.izq, out); out.push(nodo.clave); enOrden(nodo.der, out); } return out; }
const altura = n => (n ? 1 + Math.max(altura(n.izq), altura(n.der)) : 0);
let r = null; for (const p of ['M', 'C', 'T', 'A', 'G', 'P', 'Z']) r = insertar(r, p);
let s = null; for (const p of ['A', 'C', 'G', 'M', 'P', 'T', 'Z']) s = insertar(s, p);
console.log(enOrden(r).join(''), 'altura', altura(r), '· insertado ordenado: altura', altura(s));
~~~`);

D('m4.graphs', `## Ejemplo resuelto: la ruta con menos transbordos entre sedes
Las grúas de PatioApp trasladan unidades entre sedes, pero no todas las sedes tienen ruta directa. ¿Cuál es la forma de llegar de Ventanilla a Lurín con **menos tramos**? Como todos los tramos "cuentan igual", la **búsqueda en anchura** (BFS) encuentra el camino más corto en número de aristas:
~~~js
const rutas = { Ventanilla: ['Callao'], Callao: ['Ventanilla', 'Ate', 'Surco'], Ate: ['Callao', 'Chosica', 'Lurín'], Surco: ['Callao', 'Lurín'], Chosica: ['Ate'], 'Lurín': ['Ate', 'Surco'] };
function menosTramos(origen, destino) {
  const previo = { [origen]: null }, cola = [origen];
  while (cola.length) {
    const s = cola.shift();
    if (s === destino) break;
    for (const v of rutas[s]) if (!(v in previo)) { previo[v] = s; cola.push(v); }
  }
  const camino = []; for (let s = destino; s !== null; s = previo[s]) camino.unshift(s);
  return camino;
}
console.log(menosTramos('Ventanilla', 'Lurín').join(' → '));      // Ventanilla → Callao → Ate → Lurín
~~~
BFS garantiza el mínimo porque explora por **capas**: primero todas las sedes a 1 tramo, luego las de 2, y así. Si los tramos tuvieran distintas duraciones, haría falta el algoritmo de Dijkstra que verás en la unidad de caminos mínimos.

## Orden topológico con el algoritmo de Kahn
Para un grafo dirigido **sin ciclos** (las dependencias entre tareas o módulos), un **orden topológico** pone cada vértice antes de todos los que dependen de él. Arthur Kahn propuso en 1962 un algoritmo con una cola: empezar con los vértices sin dependencias pendientes (grado de entrada 0), sacarlos en orden y, al sacar cada uno, restar 1 al grado de entrada de sus sucesores; los que llegan a 0 entran a la cola. Si al final quedan vértices sin sacar, el grafo **tiene un ciclo**. Es O(V + E) y lo usan los gestores de paquetes, los sistemas de construcción y las hojas de cálculo.`);

D('m4.dp', `## Ejemplo resuelto: cargar la grúa de traslado
Una grúa plataforma soporta 10 toneladas y hay unidades esperando traslado con distinto peso y distinta urgencia (valor de llevarlas hoy). ¿Qué unidades llevar para maximizar el valor sin pasarse del peso? Es el **problema de la mochila 0/1**.
~~~js
function mochila(items, capacidad) {
  // mejor[i][c] = máximo valor usando los primeros i items con capacidad c
  const n = items.length, mejor = Array.from({ length: n + 1 }, () => Array(capacidad + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { peso, valor } = items[i - 1];
    for (let c = 0; c <= capacidad; c++) {
      mejor[i][c] = mejor[i - 1][c];                                           // no llevarlo
      if (peso <= c) mejor[i][c] = Math.max(mejor[i][c], mejor[i - 1][c - peso] + valor);   // llevarlo
    }
  }
  const elegidos = []; let c = capacidad;                                     // reconstruir la solución
  for (let i = n; i > 0; i--) if (mejor[i][c] !== mejor[i - 1][c]) { elegidos.push(items[i - 1].placa); c -= items[i - 1].peso; }
  return { valor: mejor[n][capacidad], elegidos: elegidos.reverse() };
}
const espera = [{ placa: 'A1', peso: 6, valor: 30 }, { placa: 'B2', peso: 3, valor: 14 }, { placa: 'C3', peso: 4, valor: 16 }, { placa: 'D4', peso: 2, valor: 9 }];
console.log(mochila(espera, 10));       // { valor: 46, elegidos: ['A1', 'C3'] }
~~~
Puntos clave:
1. **Subproblemas:** "el mejor valor con los primeros i items y capacidad c". Cada uno se resuelve con los ya calculados: o no se lleva el item i, o se lleva y se suma su valor al mejor con la capacidad restante.
2. **Costo:** O(n · C), con n items y capacidad C. Parece polinomial, pero C es un número, no un tamaño: si la capacidad se midiera en kilos (10 000), la tabla sería mil veces más grande. Por eso la mochila es NP-difícil en general aunque este algoritmo funcione bien con capacidades pequeñas (se llama **pseudopolinomial**).
3. **Reconstrucción:** la tabla da el valor óptimo; para saber **qué** llevar, se recorre la tabla hacia atrás viendo en qué pasos el valor cambió.
4. **La estrategia voraz falla aquí:** elegir por mayor valor por tonelada toma primero A1 (5 por tonelada), luego B2 (4,67), y ya no caben C3 ni D4: valor 44, menor que el óptimo de 46. La estrategia voraz sí es óptima para la mochila **fraccionaria**, en la que se puede llevar una parte de cada item.`);
})();
