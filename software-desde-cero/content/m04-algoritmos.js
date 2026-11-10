(function () {
var M = SDC.M, S = SDC.S;
M('m4', { title: 'Estructuras de datos y algoritmos', desc: 'Elegir bien cómo guardar los datos suele ser la diferencia entre un sistema que responde al instante y uno que colapsa con mil usuarios.',
  thread: 'PatioApp pasa de buscar una placa recorriendo la lista a encontrarla al instante con una tabla hash; ordena los vehículos por fecha y calcula la mejor ruta dentro del patio con grafos.',
  books: '*Introduction to Algorithms* (CLRS), *Algorithms* (Sedgewick y Wayne), *Grokking Algorithms* (Bhargava), *The Algorithm Design Manual* (Skiena).',
  uni: 'Algoritmos y Estructura de Datos y Complejidad Algorítmica (UPC), Algoritmos y Estructuras de Datos (UTEC), Introduction to Algorithms (MIT).' });

S('m4', 'm4.bigo', { title: 'Complejidad: la notación Big-O',
  ask: '¿Qué complejidad describe este caso?',
  lesson: `
> **La idea en simple.** No medimos cuántos segundos tarda un programa, porque depende de la máquina. Medimos cómo **crece** el trabajo cuando crecen los datos. Si duplicas los autos, ¿el tiempo sigue igual, se duplica o se cuadruplica?

## Las clases que debes reconocer
| Big-O | Nombre | Ejemplo | Con 1 000 000 de datos |
| O(1) | constante | acceder a lista[5] | 1 paso |
| O(log n) | logarítmica | búsqueda binaria | ~20 pasos |
| O(n) | lineal | recorrer una lista | 1 millón |
| O(n log n) | casi lineal | merge sort | ~20 millones |
| O(n²) | cuadrática | dos bucles anidados | 1 billón |
| O(2ⁿ) | exponencial | probar todos los subconjuntos | imposible |

## Cómo calcularla
1. Cuenta los bucles: anidados se multiplican, consecutivos se suman.
2. Quédate con el término mayor: O(n² + n) es O(n²).
3. Ignora constantes: O(3n) es O(n).
4. Un bucle que divide a la mitad es O(log n).
~~~js
function contar(n) {
  let lineal = 0, cuadrado = 0, log = 0;
  for (let i = 0; i < n; i++) lineal++;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cuadrado++;
  for (let i = n; i > 1; i = Math.floor(i / 2)) log++;
  console.log("n =", n, "lineal", lineal, "cuadrado", cuadrado, "log", log);
}
contar(10); contar(100); contar(1000);
~~~

## Puntos que no debes omitir
- Big-O describe el **peor caso** y un límite superior. Θ describe el crecimiento exacto.
- Existe también complejidad en **espacio**: la memoria extra que necesitas.
- Una mejora de O(n²) a O(n log n) vale más que cualquier computadora más rápida.
- En datos pequeños, la constante manda: el "peor" algoritmo puede ganar con 10 elementos.
- El análisis **amortizado** explica por qué «push» es O(1) aunque a veces redimensiona.

! Error común: ver un solo bucle y decir O(n), sin notar que dentro se llama a «includes» o «indexOf», que también recorren. Eso es O(n²).`,
  links: [['m3.loops', 'contar vueltas es la base de esto'], ['m1.cpu', 'la constante oculta depende de la caché y la memoria'], ['m4.search', 'los ordenamientos se comparan con esta medida'], ['m10.index', 'un índice cambia una consulta de O(n) a O(log n)']],
  read: 'CLRS, capítulos 1 a 3; Bhargava, capítulo 1.',
  terms: [
    ['O(1)', 'tiempo constante, que no depende del tamaño de los datos', ['Acceder a «lista[1000]».', 'Consultar una clave en una tabla hash en promedio.', 'Agregar al final con «push» en la mayoría de los casos.']],
    ['O(log n)', 'tiempo que crece muy lento porque en cada paso se descarta una fracción', ['Buscar en una guía telefónica abriendo a la mitad.', 'Duplicar los datos agrega un solo paso.', 'Buscar en un árbol balanceado.']],
    ['O(n)', 'tiempo proporcional a la cantidad de datos', ['Recorrer una lista para sumar.', 'Duplicar los datos duplica el tiempo.', 'Buscar una placa sin índice.']],
    ['O(n log n)', 'tiempo típico de los mejores ordenamientos por comparación', ['Merge sort sobre un millón de elementos.', 'Ordenar con «.sort()» de la mayoría de los lenguajes.', 'Partir en mitades y hacer trabajo lineal en cada nivel.']],
    ['O(n²)', 'tiempo cuadrático, típico de dos bucles anidados sobre los mismos datos', ['Comparar cada auto con todos los demás.', 'Duplicar los datos cuadruplica el tiempo.', 'Un «includes» dentro de un «for».']],
    ['O(2ⁿ)', 'tiempo exponencial: cada dato adicional duplica el trabajo', ['Probar todos los subconjuntos posibles.', 'Fibonacci recursivo sin memoria.', 'Con 60 elementos ya es inalcanzable.']],
    ['Complejidad espacial', 'memoria adicional que usa un algoritmo según el tamaño de la entrada', ['Merge sort necesita un arreglo auxiliar de tamaño n.', 'Una recursión profunda consume pila.', 'Una caché intercambia memoria por velocidad.']]
  ],
  q: [
    ['¿Cuál es la complejidad?\nfor (const a of l) { if (l.includes(a * 2)) c++; }', 'O(n²)', ['O(n)', 'O(log n)', 'O(1)'], 'includes recorre la lista dentro de otro recorrido.', 3],
    ['Un algoritmo O(n²) tarda 1 s con 1000 datos. ¿Cuánto tardará con 10 000?', '100 s', ['10 s', '1000 s', '20 s'], '10 veces los datos: 10² = 100 veces el tiempo.', 3],
    ['Reemplazas el includes del ejercicio anterior por un Set. ¿Qué cambia?', 'Pasa de O(n²) a O(n), usando O(n) de memoria extra', ['Pasa a O(1) sin costo', 'Empeora a O(n³)', 'No cambia nada'], 'has() es O(1) en promedio; se intercambia memoria por tiempo.', 4],
    ['Con n = 10, O(n²) con constante 1 y O(n log n) con constante 100. ¿Cuál gana?', 'O(n²) en este tamaño', ['O(n log n) siempre', 'Empatan', 'No se puede ejecutar'], 'Con n pequeño la constante domina: 100 pasos contra unos 3300.', 4],
    { c: 'Escribe «hayDuplicados(l)» en O(n) usando un Set.', f: 'hayDuplicados', p: ['l'], t: [[[[1, 2, 3]], false], [[[1, 2, 1]], true], [[[]], false]], sol: '  const s = new Set();\n  for (const x of l) { if (s.has(x)) return true; s.add(x); }\n  return false;', l: 3 },
    { c: 'Escribe «dosSuma(l, t)» en O(n): devuelve true si dos elementos distintos suman t.', f: 'dosSuma', p: ['l', 't'], t: [[[[1, 2, 3], 5], true], [[[1, 2, 3], 7], false], [[[3], 6], false], [[[3, 3], 6], true]], sol: '  const v = new Set();\n  for (const x of l) { if (v.has(t - x)) return true; v.add(x); }\n  return false;', h: 'Por cada x pregunta si ya viste t − x.', l: 4 }
  ],
  gen: function (g) {
    var P = [
      ['let c = 0;\nfor (let i = 0; i < n; i++) c++;', 'O(n)'],
      ['let c = 0;\nfor (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++) c++;', 'O(n²)'],
      ['return l[0];', 'O(1)'],
      ['let i = n;\nwhile (i > 1) i = Math.floor(i / 2);', 'O(log n)'],
      ['for (let i = 0; i < n; i++) a();\nfor (let j = 0; j < n; j++) b();', 'O(n)'],
      ['for (let i = 0; i < n; i++)\n  for (let j = 1; j < n; j *= 2) c++;', 'O(n log n)'],
      ['for (let i = 0; i < n; i++)\n  for (let j = 0; j < 5; j++) c++;', 'O(n)'],
      ['for (let i = 0; i < 1000; i++) c++;', 'O(1)'],
      ['for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    for (let k = 0; k < n; k++) c++;', 'O(n³)'],
      ['function f(n) { return n < 2 ? n : f(n - 1) + f(n - 2); }', 'O(2ⁿ)'],
      ['for (let i = 0; i < n; i++)\n  for (let j = i; j < n; j++) c++;', 'O(n²)'],
      ['function f(n) { if (n === 0) return; f(n - 1); }', 'O(n)'],
      ['function b(l, lo, hi) { const m = (lo + hi) >> 1; /* descarta la mitad */ }', 'O(log n)']
    ];
    var clases = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'];
    P.forEach(function (p, i) { g.mcq(i < 4 ? 2 : 3, '¿Cuál es la complejidad en tiempo de este código?', p[1], g.R.sample(clases.filter(function (c) { return c !== p[1]; }), 3), 'Analiza los bucles: los anidados se multiplican, los seguidos se suman y las constantes se ignoran.', p[0]); });
    var names = [['O(n²)', function (x) { return x * x; }], ['O(n)', function (x) { return x; }], ['O(n³)', function (x) { return x * x * x; }]];
    g.times(6, function (R) { var o = R.pick(names), f = R.pick([2, 3, 4, 10]), t = R.int(1, 5); g.input(3, 'Un algoritmo ' + o[0] + ' tarda ' + t + ' s. Si multiplicas los datos por ' + f + ', ¿cuántos segundos tardará?', t * o[1](f), 'El tiempo crece por un factor de ' + o[1](f) + '.'); });
    g.times(6, function (R) { var e = R.int(6, 20), n = Math.pow(2, e); g.input(2, '¿Cuántos pasos da aproximadamente una búsqueda O(log n) en base 2 con ' + n + ' elementos?', e, '2^' + e + ' = ' + n + ', así que log₂ = ' + e + '.'); });
  } });

S('m4', 'm4.search', { title: 'Búsqueda y ordenamiento',
  ask: '¿Qué algoritmo describe esto?',
  lesson: `
> **La idea en simple.** Para buscar una palabra en un diccionario no lees desde la A: abres por la mitad y descartas una parte. Eso es búsqueda binaria, pero solo funciona si los datos ya están **ordenados**. Por eso ordenar es uno de los problemas más estudiados.

## Búsqueda binaria
~~~js
function binaria(l, x) {
  let lo = 0, hi = l.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (l[mid] === x) return mid;
    if (l[mid] < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
console.log(binaria([1, 3, 5, 7, 9, 11], 7));
~~~
Invariante: si x está, está entre lo y hi.

## Ordenamientos clave
| Algoritmo | Promedio | Peor | Espacio extra | Estable | Idea |
| Burbuja | O(n²) | O(n²) | O(1) | sí | intercambia vecinos |
| Selección | O(n²) | O(n²) | O(1) | no | busca el mínimo y lo coloca |
| Inserción | O(n²) | O(n²) | O(1) | sí | inserta como cartas en la mano |
| Merge sort | O(n log n) | O(n log n) | O(n) | sí | divide, ordena y mezcla |
| Quicksort | O(n log n) | O(n²) | O(log n) | no | parte alrededor de un pivote |

:::w sort

~~~js
function mergeSort(l) {
  if (l.length < 2) return l;
  const m = l.length >> 1;
  const a = mergeSort(l.slice(0, m)), b = mergeSort(l.slice(m));
  const r = [];
  while (a.length && b.length) r.push(a[0] <= b[0] ? a.shift() : b.shift());
  return [...r, ...a, ...b];
}
console.log(mergeSort([5, 2, 9, 1, 7, 3]));
~~~

## Puntos que no debes omitir
- **Estable** significa que los iguales conservan su orden original. Importa al ordenar por fecha y luego por estado.
- Inserción es excelente para listas casi ordenadas o pequeñas. Muchas bibliotecas lo combinan con merge sort (Timsort).
- O(n log n) es el límite teórico para ordenar comparando.
- Si los datos son enteros en rango pequeño, counting sort logra O(n).

! Error común: calcular el punto medio con «(lo + hi) / 2» en lenguajes de enteros de tamaño fijo: se desborda. Un fallo así estuvo años en la biblioteca de Java.`,
  links: [['m4.bigo', 'de aquí salen las comparaciones de complejidad'], ['m3.rec', 'merge sort y quicksort son recursión pura'], ['m10.index', 'un índice de base de datos es búsqueda en datos ya ordenados']],
  read: 'Sedgewick y Wayne, capítulos 1 y 2; CLRS, capítulos 2 y 7.',
  terms: [
    ['Búsqueda lineal', 'revisar los elementos uno a uno hasta encontrar el objetivo', ['Buscar una placa en una lista desordenada.', 'Es O(n) en el peor caso.', 'Funciona sin ninguna preparación de los datos.']],
    ['Búsqueda binaria', 'descartar la mitad en cada paso sobre datos ordenados', ['Adivinar un número del 1 al 100 preguntando mayor o menor.', 'Encuentra entre un millón con 20 comparaciones.', 'Requiere que la lista esté ordenada.']],
    ['Merge sort', 'ordenamiento que divide la lista en mitades y las mezcla ordenadas', ['Siempre es O(n log n) pero requiere memoria extra.', 'Es ideal para ordenar listas enlazadas o archivos enormes en disco.', 'Es estable y predecible.']],
    ['Quicksort', 'ordenamiento que parte los datos alrededor de un pivote', ['Es rapidísimo en promedio y ordena casi en sitio.', 'Con un pivote malo se degrada a O(n²).', 'Coloca los menores a un lado y los mayores al otro.']],
    ['Ordenamiento por inserción', 'ordenar tomando cada elemento y colocándolo en su lugar entre los ya ordenados', ['Ordenas cartas en tu mano.', 'Con una lista casi ordenada es casi O(n).', 'Timsort lo usa para tramos pequeños.']],
    ['Ordenamiento burbuja', 'intercambiar pares vecinos fuera de orden hasta que no queden', ['Los mayores suben al final como burbujas.', 'Se enseña por su sencillez, pero casi nunca se usa en producción.', 'Con cada pasada queda uno más en su lugar.']],
    ['Estabilidad', 'propiedad de conservar el orden original entre elementos iguales', ['Ordenas por estado y los de igual estado mantienen su orden por fecha.', 'Un reporte con dos criterios sale correcto al aplicar dos ordenamientos.', 'Dos clientes empatados no cambian de posición.']]
  ],
  q: [
    { o: 'Ordena los pasos de la búsqueda binaria.', s: ['Definir lo y hi en los extremos', 'Calcular el punto medio', 'Comparar el medio con el objetivo', 'Descartar la mitad que no sirve', 'Repetir mientras lo ≤ hi'], e: 'En cada vuelta se reduce a la mitad el rango.', l: 2 },
    ['¿Qué pasa si aplicas búsqueda binaria a una lista desordenada?', 'Puede no encontrar un elemento que sí está', ['Da error de ejecución', 'La ordena automáticamente', 'Funciona igual pero más lento'], 'Descartar la mitad solo es válido con orden.', 3],
    ['¿Qué algoritmo eliges para 10 TB de datos en disco con 16 GB de RAM?', 'Merge sort externo', ['Burbuja', 'Selección', 'Quicksort en memoria'], 'Se ordenan trozos que quepan en memoria y luego se mezclan.', 4],
    ['Quicksort siempre elige el primer elemento como pivote. ¿Qué entrada es su peor caso?', 'Una lista ya ordenada', ['Una lista aleatoria', 'Una lista de un solo elemento', 'Una lista con dos elementos'], 'Las particiones quedan desbalanceadas: 0 y n−1.', 4],
    { c: 'Escribe «buscarBinaria(l, x)» que devuelva el índice de x en una lista ordenada o −1.', f: 'buscarBinaria', p: ['l', 'x'], t: [[[[1, 3, 5, 7], 5], 2], [[[1, 3, 5, 7], 4], -1], [[[], 1], -1], [[[2], 2], 0]], sol: '  let lo = 0, hi = l.length - 1;\n  while (lo <= hi) {\n    const m = (lo + hi) >> 1;\n    if (l[m] === x) return m;\n    if (l[m] < x) lo = m + 1; else hi = m - 1;\n  }\n  return -1;', l: 3 },
    { c: 'Escribe «burbuja(l)» que devuelva una lista nueva ordenada de menor a mayor sin usar .sort.', f: 'burbuja', p: ['l'], t: [[[[3, 1, 2]], [1, 2, 3]], [[[]], []], [[[5, 5, 1]], [1, 5, 5]]], sol: '  const a = [...l];\n  for (let i = 0; i < a.length; i++)\n    for (let j = 0; j < a.length - 1 - i; j++)\n      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];\n  return a;', l: 3 },
    { c: 'Escribe «insercion(l)» que devuelva una lista nueva ordenada por inserción.', f: 'insercion', p: ['l'], t: [[[[3, 1, 2]], [1, 2, 3]], [[[9, -1]], [-1, 9]]], sol: '  const a = [...l];\n  for (let i = 1; i < a.length; i++) {\n    const v = a[i];\n    let j = i - 1;\n    while (j >= 0 && a[j] > v) { a[j + 1] = a[j]; j--; }\n    a[j + 1] = v;\n  }\n  return a;', l: 3 },
    { c: 'Escribe «mezclar(a, b)» que una dos listas ordenadas en una lista ordenada en O(n).', f: 'mezclar', p: ['a', 'b'], t: [[[[1, 3], [2, 4]], [1, 2, 3, 4]], [[[], [1]], [1]], [[[1, 1], [1]], [1, 1, 1]]], sol: '  const r = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) r.push(a[i] <= b[j] ? a[i++] : b[j++]);\n  return r.concat(a.slice(i), b.slice(j));', l: 3 },
    { c: 'Escribe «quick(l)» que implemente quicksort devolviendo una lista nueva.', f: 'quick', p: ['l'], t: [[[[3, 6, 1, 8, 2]], [1, 2, 3, 6, 8]], [[[]], []], [[[2, 2, 1]], [1, 2, 2]]], sol: '  if (l.length < 2) return l;\n  const [p, ...r] = l;\n  return [...quick(r.filter(x => x < p)), p, ...quick(r.filter(x => x >= p))];', l: 4 },
    { c: 'Escribe «primeraPosicion(l, x)» que en una lista ordenada con repetidos devuelva el primer índice de x o −1, en O(log n).', f: 'primeraPosicion', p: ['l', 'x'], t: [[[[1, 2, 2, 2, 3], 2], 1], [[[1, 2, 3], 4], -1], [[[2, 2], 2], 0]], sol: '  let lo = 0, hi = l.length - 1, r = -1;\n  while (lo <= hi) {\n    const m = (lo + hi) >> 1;\n    if (l[m] === x) { r = m; hi = m - 1; }\n    else if (l[m] < x) lo = m + 1;\n    else hi = m - 1;\n  }\n  return r;', h: 'Al encontrarlo, guarda la posición y sigue buscando a la izquierda.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var e = R.int(4, 20); g.input(2, '¿Cuántas comparaciones hace, como máximo y aproximadamente, una búsqueda binaria en 2^' + e + ' elementos?', e, 'log₂(2^' + e + ') = ' + e + '.'); });
    g.times(8, function (R) { var l = R.sample([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 7).sort(function (a, b) { return a - b; }), x = R.pick(l); var lo = 0, hi = 6, c = 0, m; while (lo <= hi) { m = (lo + hi) >> 1; c++; if (l[m] === x) break; if (l[m] < x) lo = m + 1; else hi = m - 1; } g.input(3, 'Lista: [' + l + ']. ¿Cuántas comparaciones hace una búsqueda binaria para encontrar ' + x + '?', c, 'Empieza en el índice 3 y sigue descartando mitades.'); });
    g.times(6, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4); var a = l.slice(); for (var j = 0; j < a.length - 1; j++) if (a[j] > a[j + 1]) { var t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; } g.input(3, 'Aplica una sola pasada de burbuja a [' + l + ']. Escribe el resultado separado por comas.', a.join(','), 'Compara vecinos de izquierda a derecha e intercambia si están al revés.'); });
    g.times(6, function (R) { var n = R.pick([100, 1000, 10000]); g.mcq(3, 'Tienes ' + n + ' elementos y un algoritmo O(n²). Aproximadamente, ¿cuántos pasos da?', (n * n).toLocaleString('es-PE'), [n.toLocaleString('es-PE'), (2 * n).toLocaleString('es-PE'), (n * 10).toLocaleString('es-PE')], n + ' × ' + n + '.'); });
  } });

S('m4', 'm4.stack', { title: 'Listas enlazadas, pilas y colas',
  ask: '¿Qué estructura corresponde mejor?',
  lesson: `
> **La idea en simple.** Una pila de platos: sacas el último que pusiste. Una cola del banco: atiende al primero que llegó. Dos reglas tan simples están detrás del botón "deshacer", de las llamadas a funciones y de los sistemas de mensajes.

## Pila (LIFO)
Último en entrar, primero en salir.
~~~js
const pila = [];
pila.push("escribir");
pila.push("borrar");
console.log(pila.pop());   // deshace lo último
console.log(pila);
~~~

## Cola (FIFO)
Primero en entrar, primero en salir.
~~~js
const cola = ["auto1", "auto2"];
cola.push("auto3");
console.log(cola.shift());  // atiende al primero
console.log(cola);
~~~

## Lista enlazada
Cada nodo guarda un valor y un puntero al siguiente. Insertar al inicio es O(1), pero llegar al elemento i es O(n).
~~~js
class Nodo { constructor(v, sig = null) { this.v = v; this.sig = sig; } }
let cabeza = new Nodo(1, new Nodo(2, new Nodo(3)));
cabeza = new Nodo(0, cabeza);   // insertar al inicio
for (let n = cabeza; n; n = n.sig) console.log(n.v);
~~~

## Arreglo contra lista enlazada
| Operación | Arreglo | Lista enlazada |
| Leer por índice | O(1) | O(n) |
| Insertar al inicio | O(n) | O(1) |
| Insertar al final | O(1) amortizado | O(1) con puntero al final |
| Uso de caché | excelente | malo |

## Puntos que no debes omitir
- En JavaScript «shift» es O(n). Una cola seria usa un índice o una lista enlazada.
- Una **cola de prioridad** atiende primero al más importante; se implementa con un **montículo** (heap).
- Las pilas verifican paréntesis y evalúan expresiones: lo verás en los compiladores.
- El búfer circular es una cola de tamaño fijo muy eficiente.

! Error común: usar una lista enlazada creyendo que es más rápida. Por localidad de caché, un arreglo suele ganar incluso insertando.`,
  links: [['m3.func', 'la pila de llamadas es esta misma estructura'], ['m1.cpu', 'la caché explica por qué los arreglos son tan rápidos'], ['m4.graphs', 'DFS usa una pila y BFS usa una cola'], ['m13.dist', 'las colas de mensajes desacoplan servicios a gran escala'], ['m8.comp', 'un analizador usa una pila para validar anidamiento']],
  read: 'Sedgewick y Wayne, sección 1.3.',
  terms: [
    ['Pila', 'estructura donde el último elemento en entrar es el primero en salir', ['El botón "deshacer" de un editor.', 'El historial de "atrás" del navegador.', 'Validar que los paréntesis cierran bien.']],
    ['Cola', 'estructura donde el primer elemento en entrar es el primero en salir', ['Impresiones que esperan turno.', 'Vehículos en fila para revisión.', 'Tareas pendientes atendidas por llegada.']],
    ['Lista enlazada', 'secuencia de nodos en la que cada uno apunta al siguiente', ['Insertar al inicio sin mover nada.', 'Acceder al elemento 500 obliga a saltar 500 veces.', 'Los nodos pueden estar dispersos en memoria.']],
    ['Montículo', 'árbol en el que cada padre es mejor que sus hijos y da acceso rápido al mínimo', ['Sacar siempre la tarea más urgente en O(log n).', 'Dijkstra lo usa para elegir el siguiente nodo.', 'Heapsort se basa en él.']],
    ['Cola de prioridad', 'colección que atiende primero al elemento de mayor prioridad', ['Emergencias en un hospital.', 'Tareas críticas pasan antes que las de mantenimiento.', 'El sistema operativo elige procesos importantes.']],
    ['Deque', 'cola doble que permite insertar y sacar por ambos extremos', ['Una ventana deslizante necesita sacar por delante y por detrás.', 'Sirve como pila y como cola a la vez.', 'Un planificador roba trabajo por el otro extremo.']],
    ['Búfer circular', 'cola de tamaño fijo que da la vuelta sobre un arreglo', ['Un registro guarda solo los últimos 1000 eventos.', 'Un reproductor de audio mantiene un colchón continuo.', 'Al llenarse, sobreescribe lo más antiguo.']]
  ],
  q: [
    ['En una pila haces push(1), push(2), pop(), push(3), pop(). ¿Qué queda?', '[1]', ['[1, 3]', '[2]', '[]'], 'Tras pop sale 2; luego entra y sale 3.', 2],
    ['¿Qué estructura usarías para deshacer y rehacer?', 'Dos pilas', ['Una cola', 'Un conjunto', 'Una tabla hash'], 'Lo deshecho pasa a la pila de rehacer.', 3],
    ['Agregas un millón de elementos con unshift a un arreglo. ¿Qué ocurre?', 'Es O(n²) en total, porque cada unshift mueve todo', ['Es O(n) en total', 'Es O(1)', 'Da error'], 'Cada inserción al inicio recorre todos los elementos.', 4],
    ['Dos pilas pueden simular una cola con costo amortizado:', 'O(1) por operación', ['O(n²) por operación', 'O(log n) por operación', 'No es posible'], 'Cada elemento se mueve como mucho una vez entre pilas.', 4],
    { c: 'Escribe «balanceado(s)»: true si los paréntesis (), [] y {} están bien cerrados.', f: 'balanceado', p: ['s'], t: [[['()[]{}'], true], [['([)]'], false], [['(('], false], [[''], true], [['{[()]}'], true]], sol: "  const par = { ')': '(', ']': '[', '}': '{' }, p = [];\n  for (const c of s) {\n    if ('([{'.includes(c)) p.push(c);\n    else if (par[c] && p.pop() !== par[c]) return false;\n  }\n  return p.length === 0;", l: 3 },
    { c: 'Escribe «postfija(tokens)» que evalúe una expresión postfija como ["2","3","+","4","*"] con + − * /.', f: 'postfija', p: ['tokens'], t: [[[['2', '3', '+', '4', '*']], 20], [[['5']], 5], [[['10', '2', '/']], 5], [[['3', '1', '-']], 2]], sol: "  const p = [];\n  for (const t of tokens) {\n    if ('+-*/'.includes(t)) {\n      const b = p.pop(), a = p.pop();\n      p.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : a / b);\n    } else p.push(Number(t));\n  }\n  return p[0];", l: 4 },
    { c: 'Escribe «invertirConPila(l)» que invierta una lista usando una pila.', f: 'invertirConPila', p: ['l'], t: [[[[1, 2, 3]], [3, 2, 1]], [[[]], []]], sol: '  const p = [...l], r = [];\n  while (p.length) r.push(p.pop());\n  return r;', l: 2 },
    { c: 'Escribe «listaAArreglo(n)» que reciba un nodo {v, sig} encadenado (último con sig null) y devuelva los valores en arreglo.', f: 'listaAArreglo', p: ['n'], t: [[[{ v: 1, sig: { v: 2, sig: null } }], [1, 2]], [[null], []]], sol: '  const r = [];\n  for (; n; n = n.sig) r.push(n.v);\n  return r;', l: 3 },
    { c: 'Escribe «invertirLista(n)» que invierta una lista enlazada {v, sig} y devuelva la nueva cabeza.', f: 'invertirLista', p: ['n'], t: [[[{ v: 1, sig: { v: 2, sig: null } }], { v: 2, sig: { v: 1, sig: null } }], [[null], null]], sol: '  let ant = null;\n  while (n) { const s = n.sig; n.sig = ant; ant = n; n = s; }\n  return ant;', h: 'Necesitas tres punteros: anterior, actual y siguiente.', l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.trace(2, 'const p = [];\np.push(' + a + ');\np.push(' + b + ');\np.push(' + c + ');\np.pop();\nconsole.log(p[p.length - 1]);', 'pop quita el último; queda ' + b + ' arriba.'); });
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.trace(2, 'const q = [];\nq.push(' + a + ');\nq.push(' + b + ');\nq.push(' + c + ');\nq.shift();\nconsole.log(q[0]);', 'shift quita el primero; queda ' + b + ' al frente.'); });
    g.times(6, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); g.trace(3, 'const p = [' + l + '], r = [];\nwhile (p.length) r.push(p.pop());\nconsole.log(r.join(" "));', 'Pasar de una pila a otra invierte el orden.'); });
  } });

S('m4', 'm4.hash', { title: 'Tablas hash',
  ask: '¿Qué concepto de tablas hash se ve?',
  lesson: `
> **La idea en simple.** En un estacionamiento enorme, en vez de buscar tu auto caminando, una fórmula convierte tu placa en un número de espacio. Vas directo. Si dos placas dan el mismo espacio hay una **colisión** y hay que resolverla.

## Cómo funciona
:::flow Clave | Función hash | Número | Índice en el arreglo | Valor
~~~js
function hash(texto, tamaño) {
  let h = 0;
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) % tamaño;
  return h;
}
console.log(hash("ABC-123", 16));
console.log(hash("XYZ-987", 16));

// En JavaScript ya las tienes:
const m = new Map();
m.set("ABC-123", { km: 1000 });
console.log(m.get("ABC-123"), m.has("ZZZ"));
~~~

## Colisiones
Inevitables por el principio del palomar. Se resuelven por:
- **Encadenamiento:** cada casilla guarda una lista.
- **Direccionamiento abierto:** buscar la siguiente casilla libre.

## Factor de carga
Es elementos ÷ casillas. Cuando pasa cierto límite (0.75 es típico), la tabla se **redimensiona** al doble y se rehace. Por eso la inserción es O(1) *amortizada*.

## Cuándo usarla
| Operación | Promedio | Peor |
| Buscar, insertar, borrar | O(1) | O(n) |

No mantiene orden. Si necesitas rangos ("placas de A a C") usa un árbol.

## Puntos que no debes omitir
- La clave debe ser inmutable; si cambia, ya no la encuentras.
- Una buena función hash reparte de manera uniforme y es rápida.
- Un hash para tablas no es lo mismo que uno criptográfico.
- Contar, deduplicar y unir datos se vuelve O(n) con esta estructura.

! Error común: usar un objeto simple con claves que vienen del usuario. "__proto__" puede romperlo. Para esos casos usa «Map».`,
  links: [['m2.sets', 'las colisiones son funciones no inyectivas'], ['m3.arr', 'los objetos de JavaScript se basan en esto'], ['m10.index', 'existen índices hash en bases de datos'], ['m13.scale', 'una caché como Redis es una tabla hash gigante'], ['m16.auth', 'el hash criptográfico protege contraseñas']],
  read: 'CLRS, capítulo 11; Sedgewick y Wayne, sección 3.4.',
  terms: [
    ['Función hash', 'función que convierte una clave en un número de tamaño fijo', ['«ABC-123» se convierte en el índice 7.', 'La misma entrada siempre da el mismo resultado.', 'Pequeños cambios en la clave dan números muy distintos.']],
    ['Colisión', 'situación en que dos claves distintas producen el mismo índice', ['Dos placas caen en la misma casilla.', 'Git teóricamente podría tener dos archivos con igual identificador.', 'Provoca una lista de candidatos en vez de uno.']],
    ['Encadenamiento', 'resolver colisiones guardando una lista en cada casilla', ['La casilla 7 contiene dos pares clave-valor.', 'En una tabla mala, una sola lista crece y la búsqueda se vuelve O(n).', 'Java usa listas y árboles en cada casilla.']],
    ['Direccionamiento abierto', 'resolver colisiones buscando otra casilla libre dentro del arreglo', ['Si la 7 está ocupada, se prueba la 8.', 'Borrar requiere marcas especiales.', 'Aprovecha bien la caché por estar todo en el arreglo.']],
    ['Factor de carga', 'relación entre elementos guardados y casillas disponibles', ['Con 75 elementos y 100 casillas vale 0.75.', 'Al superar un límite se duplica la tabla.', 'Si es muy alto, aumentan las colisiones.']],
    ['Amortizado', 'costo promedio por operación en una secuencia, aunque alguna sea cara', ['Redimensionar es caro, pero ocurre rara vez y el promedio sigue en O(1).', 'Un «push» a veces copia todo el arreglo.', 'Un pago grande se reparte entre muchas operaciones.']],
    ['Map', 'tabla de claves y valores que admite cualquier tipo de clave', ['«new Map()» acepta objetos como clave.', 'Conserva el orden de inserción.', 'Es seguro contra claves como "__proto__".']]
  ],
  q: [
    ['¿Qué estructura eliges para "dame los vehículos con km entre 10 000 y 20 000"?', 'Un árbol o índice ordenado', ['Una tabla hash', 'Una pila', 'Una cola'], 'El hash no conserva orden y no sirve para rangos.', 3],
    ['Una tabla de 16 casillas con 12 elementos. ¿Cuál es su factor de carga?', '0.75', ['1.33', '12', '4'], '12 / 16 = 0.75.', 2],
    ['¿Por qué un atacante puede hacer lenta a una tabla hash?', 'Enviando claves que colisionan a propósito', ['Borrando la memoria', 'Cambiando el reloj', 'Con claves muy cortas'], 'Con claves elegidas, todas caen en la misma casilla y es O(n). Por eso se usa semilla aleatoria.', 4],
    ['Para deduplicar una lista de n elementos, ¿cuál es el costo con un Set?', 'O(n) tiempo y O(n) memoria', ['O(n²) tiempo y O(1) memoria', 'O(1) tiempo', 'O(log n) tiempo'], 'Se recorre una vez y has/add son O(1).', 3],
    { c: 'Escribe «frecuencias(s)» que devuelva un objeto con cuántas veces aparece cada carácter.', f: 'frecuencias', p: ['s'], t: [[['aab'], { a: 2, b: 1 }], [[''], {}]], sol: '  const r = {};\n  for (const c of s) r[c] = (r[c] || 0) + 1;\n  return r;', l: 2 },
    { c: 'Escribe «sonAnagramas(a, b)» en O(n).', f: 'sonAnagramas', p: ['a', 'b'], t: [[['amor', 'roma'], true], [['aa', 'ab'], false], [['a', 'aa'], false]], sol: '  if (a.length !== b.length) return false;\n  const m = {};\n  for (const c of a) m[c] = (m[c] || 0) + 1;\n  for (const c of b) { if (!m[c]) return false; m[c]--; }\n  return true;', l: 3 },
    { c: 'Escribe «primerNoRepetido(s)» que devuelva el primer carácter que aparece una sola vez o null.', f: 'primerNoRepetido', p: ['s'], t: [[['aabcb'], 'c'], [['aabb'], null], [['x'], 'x']], sol: '  const m = {};\n  for (const c of s) m[c] = (m[c] || 0) + 1;\n  for (const c of s) if (m[c] === 1) return c;\n  return null;', l: 3 },
    { c: 'Escribe «hashSimple(texto, tam)» usando h = (h * 31 + código) % tam, con h inicial en 0.', f: 'hashSimple', p: ['texto', 'tam'], t: [[['a', 16], 1], [['ab', 100], 5], [['', 7], 0]], sol: '  let h = 0;\n  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) % tam;\n  return h;', l: 3 },
    { c: 'Escribe «dosIndices(l, t)» que devuelva los índices [i, j] con i < j de los dos elementos que suman t, o null, en O(n).', f: 'dosIndices', p: ['l', 't'], t: [[[[2, 7, 11, 15], 9], [0, 1]], [[[1, 2], 9], null], [[[3, 3], 6], [0, 1]]], sol: '  const m = new Map();\n  for (let j = 0; j < l.length; j++) {\n    if (m.has(t - l[j])) return [m.get(t - l[j]), j];\n    m.set(l[j], j);\n  }\n  return null;', l: 4 },
    { c: 'Escribe «agruparAnagramas(l)» que devuelva una lista de grupos, cada grupo ordenado, y los grupos ordenados por su primera palabra.', f: 'agruparAnagramas', p: ['l'], t: [[[['roma', 'amor', 'sol', 'los']], [['amor', 'roma'], ['los', 'sol']]], [[[]], []]], sol: "  const m = new Map();\n  for (const w of l) {\n    const k = [...w].sort().join('');\n    if (!m.has(k)) m.set(k, []);\n    m.get(k).push(w);\n  }\n  return [...m.values()].map(g => g.sort()).sort((a, b) => a[0] < b[0] ? -1 : 1);", l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var k = R.int(10, 200), t = R.pick([7, 8, 10, 11, 13, 16]); g.input(1, 'Con la función hash h(k) = k % ' + t + ', ¿a qué casilla va la clave ' + k + '?', k % t, k + ' % ' + t + ' = ' + k % t + '.'); });
    g.times(6, function (R) { var n = R.int(3, 15), t = R.pick([4, 8, 16, 20]); g.input(2, '¿Cuál es el factor de carga con ' + n + ' elementos en ' + t + ' casillas?', +(n / t).toFixed(3), n + ' / ' + t + ' = ' + (n / t).toFixed(3) + '.'); });
    g.times(6, function (R) { var t = R.pick([5, 7, 10]), a = R.int(1, t - 1); g.input(3, 'Tabla de ' + t + ' casillas con h(k) = k % ' + t + '. ¿Qué otra clave entre ' + t + ' y ' + (t * 2 - 1) + ' colisiona con ' + a + '?', a + t, a + ' + ' + t + ' da el mismo residuo.'); });
  } });

S('m4', 'm4.trees', { title: 'Árboles',
  ask: '¿Qué concepto de árboles se ve?',
  lesson: `
> **La idea en simple.** Las carpetas de tu computadora son un árbol: una raíz, ramas y archivos en las hojas. Cada nodo tiene un solo padre. Muchos problemas se vuelven fáciles al organizarlos así.

## Vocabulario
~~~txt
        8          raíz
       / \\
      3   10       3 y 10 son hijos de 8
     / \\    \\
    1   6    14    1, 6, 14 son hojas
~~~
**Altura:** niveles desde la raíz hasta la hoja más lejana. En este árbol es 2.

## Árbol binario de búsqueda (BST)
Izquierda menor, derecha mayor. Cada comparación descarta una rama.
~~~js
function insertar(n, v) {
  if (!n) return { v, izq: null, der: null };
  if (v < n.v) n.izq = insertar(n.izq, v);
  else n.der = insertar(n.der, v);
  return n;
}
function inorden(n, r = []) {
  if (!n) return r;
  inorden(n.izq, r); r.push(n.v); inorden(n.der, r);
  return r;
}
let t = null;
for (const v of [8, 3, 10, 1, 6, 14]) t = insertar(t, v);
console.log(inorden(t));   // ¡ordenados!
~~~

## Recorridos
- **Inorden** (izq, raíz, der): en un BST da los valores ordenados.
- **Preorden** (raíz, izq, der): copiar un árbol, serializar.
- **Postorden** (izq, der, raíz): calcular tamaños, liberar memoria.
- **Por niveles:** con una cola (BFS).

## Balance
Si insertas 1, 2, 3, 4... el BST se vuelve una lista: O(n). Los árboles **AVL** y **rojo-negro** se reacomodan solos para mantener O(log n). Los **B-trees** usan muchos hijos por nodo y son la base de los índices de bases de datos.

## Puntos que no debes omitir
- El DOM de una web, el AST de un compilador y JSON son árboles.
- Un **trie** es un árbol de prefijos: autocompletar.
- Altura mínima de un árbol con n nodos: alrededor de log₂ n.

! Error común: asumir que todo BST es O(log n). Sin balanceo, puede ser O(n).`,
  links: [['m3.rec', 'recorrer árboles es recursión natural'], ['m4.graphs', 'un árbol es un grafo sin ciclos'], ['m10.index', 'los índices de bases de datos son árboles B+'], ['m8.comp', 'el compilador convierte tu código en un árbol llamado AST'], ['m9.front', 'el DOM es un árbol']],
  read: 'CLRS, capítulos 12 y 13; Sedgewick y Wayne, sección 3.2 y 3.3.',
  terms: [
    ['Raíz', 'nodo superior de un árbol, el único sin padre', ['El elemento «html» de una página.', 'La carpeta C:\\ de un disco.', 'Todo recorrido parte desde ahí.']],
    ['Hoja', 'nodo sin hijos', ['Un archivo dentro de una carpeta.', 'Un caso que detiene la recursión.', 'Los valores al final de un árbol de sintaxis.']],
    ['Altura', 'longitud del camino más largo desde la raíz hasta una hoja', ['Determina el peor caso de búsqueda.', 'Un árbol balanceado con un millón de nodos tiene unos 20 niveles de esta medida.', 'Se calcula como 1 + el máximo de los subárboles.']],
    ['Árbol binario de búsqueda', 'árbol donde los menores van a la izquierda y los mayores a la derecha', ['Se busca descartando una rama en cada comparación.', 'Su recorrido inorden sale ordenado.', 'Insertar datos ya ordenados lo degrada a una lista.']],
    ['Árbol balanceado', 'árbol que mantiene su altura cerca de log n reacomodándose', ['AVL hace rotaciones al insertar.', 'Rojo-negro se usa en mapas ordenados.', 'Garantiza búsqueda O(log n) en el peor caso.']],
    ['B-tree', 'árbol de muchos hijos por nodo optimizado para leer de disco', ['Es lo que usa PostgreSQL para un índice normal.', 'Cada nodo cabe en un bloque de disco.', 'Su altura es muy baja aun con miles de millones de filas.']],
    ['Trie', 'árbol de prefijos en el que cada arista representa un carácter', ['Autocompletar búsquedas.', 'Corregir ortografía con un diccionario.', 'Una tabla de enrutamiento IP busca el prefijo más largo.']]
  ],
  q: [
    { o: 'Ordena el recorrido inorden de un BST.', s: ['Visitar subárbol izquierdo', 'Procesar la raíz', 'Visitar subárbol derecho'], e: 'Por eso sale en orden ascendente.', l: 2 },
    ['Insertas 1, 2, 3, 4, 5 en un BST simple. ¿Cuál es su altura?', '4', ['2', '3', '5'], 'Queda como lista: 5 nodos en línea, 4 aristas.', 3],
    ['¿Por qué las bases de datos prefieren B-trees a árboles binarios?', 'Porque cada nodo tiene muchos hijos y reduce los accesos a disco', ['Porque son más fáciles de programar', 'Porque usan menos RAM', 'Porque no necesitan orden'], 'Menos altura significa menos lecturas de disco.', 4],
    ['¿Cuál es la altura mínima de un árbol binario con 1023 nodos?', '9', ['10', '1023', '511'], 'Un árbol perfecto de altura h tiene 2^(h+1)−1 nodos.', 4],
    { c: 'Escribe «alturaArbol(n)» que devuelva la altura de un árbol {v, izq, der}. Un árbol vacío (null) tiene altura −1.', f: 'alturaArbol', p: ['n'], t: [[[null], -1], [[{ v: 1, izq: null, der: null }], 0], [[{ v: 1, izq: { v: 2, izq: null, der: null }, der: null }], 1]], sol: '  return n ? 1 + Math.max(alturaArbol(n.izq), alturaArbol(n.der)) : -1;', l: 3 },
    { c: 'Escribe «contarHojas(n)».', f: 'contarHojas', p: ['n'], t: [[[null], 0], [[{ v: 1, izq: null, der: null }], 1], [[{ v: 1, izq: { v: 2, izq: null, der: null }, der: { v: 3, izq: null, der: null } }], 2]], sol: '  if (!n) return 0;\n  if (!n.izq && !n.der) return 1;\n  return contarHojas(n.izq) + contarHojas(n.der);', l: 3 },
    { c: 'Escribe «existeEnBST(n, x)» en O(altura).', f: 'existeEnBST', p: ['n', 'x'], t: [[[{ v: 5, izq: { v: 2, izq: null, der: null }, der: null }, 2], true], [[{ v: 5, izq: null, der: null }, 9], false], [[null, 1], false]], sol: '  while (n) {\n    if (x === n.v) return true;\n    n = x < n.v ? n.izq : n.der;\n  }\n  return false;', l: 3 },
    { c: 'Escribe «preorden(n)» que devuelva la lista de valores.', f: 'preorden', p: ['n'], t: [[[{ v: 1, izq: { v: 2, izq: null, der: null }, der: { v: 3, izq: null, der: null } }], [1, 2, 3]], [[null], []]], sol: '  return n ? [n.v, ...preorden(n.izq), ...preorden(n.der)] : [];', l: 3 },
    { c: 'Escribe «esBST(n, min = -Infinity, max = Infinity)» que valide que todo el árbol cumple la propiedad de BST.', f: 'esBST', p: ['n', 'min = -Infinity', 'max = Infinity'], t: [[[{ v: 5, izq: { v: 2, izq: null, der: null }, der: { v: 8, izq: null, der: null } }], true], [[{ v: 5, izq: { v: 2, izq: null, der: { v: 9, izq: null, der: null } }, der: null }], false], [[null], true]], sol: '  if (!n) return true;\n  if (n.v <= min || n.v >= max) return false;\n  return esBST(n.izq, min, n.v) && esBST(n.der, n.v, max);', h: 'Comparar solo con los hijos directos no basta.', l: 4 },
    { c: 'Escribe «porNiveles(n)» que devuelva una lista de listas con los valores de cada nivel.', f: 'porNiveles', p: ['n'], t: [[[{ v: 1, izq: { v: 2, izq: null, der: null }, der: { v: 3, izq: null, der: null } }], [[1], [2, 3]]], [[null], []]], sol: '  const r = [];\n  let niv = n ? [n] : [];\n  while (niv.length) {\n    r.push(niv.map(x => x.v));\n    niv = niv.flatMap(x => [x.izq, x.der]).filter(Boolean);\n  }\n  return r;', l: 4 }
  ],
  gen: function (g) {
    function ins(n, v) { if (!n) return { v: v, l: null, r: null }; if (v < n.v) n.l = ins(n.l, v); else n.r = ins(n.r, v); return n; }
    function inO(n) { return n ? inO(n.l).concat([n.v], inO(n.r)) : []; }
    function pre(n) { return n ? [n.v].concat(pre(n.l), pre(n.r)) : []; }
    function post(n) { return n ? post(n.l).concat(post(n.r), [n.v]) : []; }
    function h(n) { return n ? 1 + Math.max(h(n.l), h(n.r)) : -1; }
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), t = null; l.forEach(function (v) { t = ins(t, v); }); g.input(3, 'Insertas en orden ' + l.join(', ') + ' en un BST vacío. Escribe su recorrido preorden separado por comas.', pre(t).join(','), 'Dibuja el árbol y sigue raíz, izquierda, derecha.'); });
    g.times(6, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), t = null; l.forEach(function (v) { t = ins(t, v); }); g.input(3, 'Insertas en orden ' + l.join(', ') + ' en un BST vacío. Escribe su recorrido postorden separado por comas.', post(t).join(','), 'Sigue izquierda, derecha, raíz.'); });
    g.times(6, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 6), t = null; l.forEach(function (v) { t = ins(t, v); }); g.input(3, 'Insertas en orden ' + l.join(', ') + ' en un BST vacío. ¿Cuál es su altura?', h(t), 'Cuenta aristas de la raíz a la hoja más lejana.'); });
    g.times(4, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), t = null; l.forEach(function (v) { t = ins(t, v); }); g.input(2, 'Insertas ' + l.join(', ') + ' en un BST. ¿Cuál es su recorrido inorden?', inO(t).join(','), 'En un BST, inorden siempre da los valores ordenados.'); });
    g.times(5, function (R) { var e = R.int(3, 9); g.input(2, '¿Cuántos nodos tiene un árbol binario perfecto de altura ' + e + '?', Math.pow(2, e + 1) - 1, '2^(' + e + '+1) − 1.'); });
  } });

S('m4', 'm4.graphs', { title: 'Grafos',
  ask: '¿Qué concepto o algoritmo de grafos aplica?',
  lesson: `
> **La idea en simple.** Un mapa de calles es un grafo: las esquinas son **nodos** y las calles son **aristas**. Redes sociales, dependencias de paquetes y rutas de vuelo se modelan igual.

## Cómo se guarda
~~~js
const patio = {
  entrada: ["A", "B"],
  A: ["C"],
  B: ["C", "D"],
  C: ["salida"],
  D: ["salida"],
  salida: []
};
function bfs(g, ini, fin) {          // camino con menos saltos
  const cola = [[ini]], vistos = new Set([ini]);
  while (cola.length) {
    const camino = cola.shift(), n = camino[camino.length - 1];
    if (n === fin) return camino;
    for (const v of g[n]) if (!vistos.has(v)) { vistos.add(v); cola.push([...camino, v]); }
  }
  return null;
}
console.log(bfs(patio, "entrada", "salida"));
~~~

## Los algoritmos esenciales
| Algoritmo | Sirve para | Usa |
| BFS | menos saltos sin pesos | cola |
| DFS | explorar, detectar ciclos | pila o recursión |
| Dijkstra | camino más barato con pesos positivos | cola de prioridad |
| Orden topológico | ordenar tareas con dependencias | DFS o grados de entrada |
| Prim y Kruskal | conectar todo con costo mínimo | montículo o unión-búsqueda |

Complejidad de BFS y DFS: **O(V + E)**.

## Puntos que no debes omitir
- Grafo dirigido o no dirigido, con pesos o sin pesos: cambia el algoritmo.
- **Lista de adyacencia** para grafos dispersos; **matriz** para densos.
- Olvidar el conjunto de visitados causa bucles infinitos en grafos con ciclos.
- Dijkstra falla con pesos negativos.
- npm, Maven y Make resuelven dependencias con orden topológico. Un ciclo significa que no se puede compilar.

! Error común: usar DFS para hallar el camino más corto. DFS encuentra *un* camino; BFS encuentra el de menos saltos.`,
  links: [['m4.stack', 'BFS es una cola y DFS es una pila'], ['m4.trees', 'un árbol es un grafo conexo sin ciclos'], ['m7.git', 'la historia de Git es un grafo dirigido acíclico'], ['m15.cicd', 'un pipeline ordena sus etapas como un grafo acíclico'], ['m9.tcp', 'los enrutadores buscan caminos en el grafo de internet']],
  read: 'CLRS, capítulos 22 a 24; Skiena, capítulos 5 y 6.',
  terms: [
    ['Nodo', 'elemento básico de un grafo, también llamado vértice', ['Una persona en una red social.', 'Una esquina de un mapa.', 'Un paquete en un árbol de dependencias.']],
    ['Arista', 'conexión entre dos nodos', ['Una calle entre dos esquinas.', 'Una amistad entre dos personas.', 'Una dependencia entre dos paquetes.']],
    ['BFS', 'recorrido por niveles que visita primero a los vecinos más cercanos', ['Encontrar el camino con menos conexiones.', 'Calcular grados de separación.', 'Usa una cola.']],
    ['DFS', 'recorrido que avanza lo más profundo posible antes de retroceder', ['Resolver un laberinto siguiendo un pasillo hasta el final.', 'Detectar ciclos.', 'Se implementa con recursión o con pila.']],
    ['Dijkstra', 'algoritmo para el camino de menor costo con pesos no negativos', ['Google Maps busca la ruta más rápida.', 'Elige siempre el nodo pendiente de menor distancia.', 'Se implementa con una cola de prioridad.']],
    ['Orden topológico', 'orden lineal de los nodos que respeta todas las dependencias', ['Instalar paquetes antes de quienes los necesitan.', 'Ordenar cursos con prerrequisitos.', 'Solo existe si no hay ciclos.']],
    ['Ciclo', 'camino que vuelve al nodo de origen', ['A depende de B y B depende de A.', 'Un interbloqueo entre dos procesos.', 'Causa bucles infinitos si no se marcan los visitados.']]
  ],
  q: [
    ['¿Qué estructura usa BFS?', 'Cola', ['Pila', 'Montículo', 'Tabla hash'], 'Procesa por orden de descubrimiento.', 2],
    ['Quieres saber si el curso B requiere de forma indirecta el curso A. ¿Qué haces?', 'Un recorrido desde B siguiendo prerrequisitos', ['Un ordenamiento burbuja', 'Una búsqueda binaria', 'Una tabla hash sin recorrido'], 'Es un problema de alcanzabilidad.', 3],
    ['El camino con pesos negativos de −5 rompe Dijkstra porque:', 'Asume que al fijar un nodo ya no habrá camino más barato', ['No admite números', 'Se queda sin memoria', 'Solo funciona con pesos iguales'], 'Con negativos se usa Bellman-Ford.', 4],
    ['Un grafo tiene 1000 nodos y 3000 aristas. ¿Qué estructura gasta menos memoria?', 'Lista de adyacencia', ['Matriz de adyacencia', 'Ambas igual', 'Ninguna puede'], 'Una matriz usaría 1 000 000 de celdas.', 3],
    { c: 'Escribe «distancia(g, a, b)» que devuelva el menor número de saltos de a a b o −1 con BFS. g es un objeto de listas de adyacencia.', f: 'distancia', p: ['g', 'a', 'b'], t: [[[{ x: ['y'], y: ['z'], z: [] }, 'x', 'z'], 2], [[{ x: [], y: [] }, 'x', 'y'], -1], [[{ x: [] }, 'x', 'x'], 0]], sol: '  const c = [[a, 0]], v = new Set([a]);\n  while (c.length) {\n    const [n, d] = c.shift();\n    if (n === b) return d;\n    for (const w of g[n]) if (!v.has(w)) { v.add(w); c.push([w, d + 1]); }\n  }\n  return -1;', l: 3 },
    { c: 'Escribe «alcanzables(g, a)» que devuelva cuántos nodos se alcanzan desde a, incluyéndolo, con DFS.', f: 'alcanzables', p: ['g', 'a'], t: [[[{ a: ['b'], b: ['a'], c: [] }, 'a'], 2], [[{ a: [] }, 'a'], 1]], sol: '  const v = new Set(), p = [a];\n  while (p.length) {\n    const n = p.pop();\n    if (v.has(n)) continue;\n    v.add(n);\n    p.push(...g[n]);\n  }\n  return v.size;', l: 3 },
    { c: 'Escribe «tieneCiclo(g)» para un grafo dirigido.', f: 'tieneCiclo', p: ['g'], t: [[[{ a: ['b'], b: ['a'] }], true], [[{ a: ['b'], b: [] }], false], [[{ a: ['a'] }], true]], sol: "  const e = {};\n  const dfs = n => {\n    if (e[n] === 1) return true;\n    if (e[n] === 2) return false;\n    e[n] = 1;\n    for (const v of g[n]) if (dfs(v)) return true;\n    e[n] = 2;\n    return false;\n  };\n  return Object.keys(g).some(dfs);", h: 'Marca los nodos en tres estados: sin ver, en proceso, terminado.', l: 4 },
    { c: 'Escribe «ordenTopologico(g)» con el algoritmo de Kahn, atendiendo siempre el nodo disponible alfabéticamente menor; devuelve null si hay ciclo. Una arista a → b significa que a va antes que b.', f: 'ordenTopologico', p: ['g'], t: [[[{ a: ['b'], b: [], c: ['a'] }], ['c', 'a', 'b']], [[{ a: ['b'], b: ['a'] }], null]], sol: '  const gr = {};\n  for (const n in g) gr[n] = gr[n] || 0;\n  for (const n in g) for (const v of g[n]) gr[v] = (gr[v] || 0) + 1;\n  const r = [], l = Object.keys(gr).filter(n => !gr[n]).sort();\n  while (l.length) {\n    const n = l.shift();\n    r.push(n);\n    for (const v of g[n] || []) if (--gr[v] === 0) { l.push(v); l.sort(); }\n  }\n  return r.length === Object.keys(gr).length ? r : null;', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) {
      var ns = ['A', 'B', 'C', 'D', 'E', 'F'], adj = {}; ns.forEach(function (n) { adj[n] = []; });
      for (var i = 0; i < 7; i++) { var a = R.pick(ns), b = R.pick(ns); if (a !== b && adj[a].indexOf(b) < 0) adj[a].push(b); }
      ns.forEach(function (n) { adj[n].sort(); });
      var q = [['A', 0]], seen = { A: 1 }, d = -1, tg = R.pick(['D', 'E', 'F']);
      while (q.length) { var c = q.shift(); if (c[0] === tg) { d = c[1]; break; } adj[c[0]].forEach(function (v) { if (!seen[v]) { seen[v] = 1; q.push([v, c[1] + 1]); } }); }
      g.input(3, 'Grafo dirigido:\n' + ns.map(function (n) { return n + ' → ' + (adj[n].join(', ') || '(nada)'); }).join('\n') + '\n¿Cuántos saltos hay como mínimo de A a ' + tg + '? Responde −1 si no se puede llegar.', [d, String(d).replace('-', '−')], 'Usa BFS capa por capa desde A.');
    });
    g.times(8, function (R) { var v = R.int(4, 50), e = R.int(5, 100); g.input(2, 'Para un grafo de ' + v + ' nodos y ' + e + ' aristas, ¿cuántos pasos aproximados da BFS según O(V + E)?', v + e, v + ' + ' + e + '.'); });
    g.times(6, function (R) { var v = R.int(3, 30); g.input(2, '¿Cuántas celdas tiene la matriz de adyacencia de un grafo de ' + v + ' nodos?', v * v, v + '² = ' + v * v + '.'); });
  } });

S('m4', 'm4.dp', { title: 'Greedy y programación dinámica',
  ask: '¿Qué técnica conviene?',
  lesson: `
> **La idea en simple.** Para dar vuelto, tomar siempre la moneda más grande funciona con soles: eso es **greedy** (voraz). Pero con monedas de 1, 3 y 4, para dar 6 el voraz da 4+1+1 y lo óptimo es 3+3. Cuando lo inmediato no basta, **programación dinámica** prueba opciones sin repetir cálculos.

## Greedy
Elige lo mejor en cada paso y nunca retrocede. Es rápido, pero solo es correcto si se puede demostrar (Dijkstra y Kruskal lo son).

## Programación dinámica
Sirve cuando hay:
1. **Subproblemas repetidos**.
2. **Subestructura óptima**: la solución grande se arma con soluciones pequeñas óptimas.

Formas: de arriba abajo con memoria, o de abajo arriba con una tabla.
~~~js
// Menor número de monedas para formar un monto
function monedas(lista, monto) {
  const dp = Array(monto + 1).fill(Infinity);
  dp[0] = 0;
  for (let m = 1; m <= monto; m++)
    for (const c of lista)
      if (c <= m) dp[m] = Math.min(dp[m], dp[m - c] + 1);
  return dp[monto];
}
console.log(monedas([1, 3, 4], 6));   // 2: 3 + 3
~~~

## Cómo resolver uno paso a paso
1. Define en una frase qué significa «dp[i]».
2. Escribe la recurrencia.
3. Identifica los casos base.
4. Decide el orden para llenar la tabla.

## Problemas clásicos
- Mochila (knapsack), subsecuencia común más larga (base de «git diff»), distancia de edición (corrector ortográfico).
- **Backtracking** es otra técnica: probar, retroceder si falla. Sudoku, N reinas.

## Puntos que no debes omitir
- Divide y vencerás parte en problemas *independientes*. DP los tiene *repetidos*.
- NP-completo: no se conoce solución eficiente; se usan heurísticas.
- Muchas veces la memoria se puede reducir guardando solo la última fila.

! Error común: aplicar greedy sin demostrarlo. Un contraejemplo pequeño basta para desmentirlo.`,
  links: [['m3.rec', 'la memoización es recursión con memoria'], ['m7.git', 'git diff usa la subsecuencia común más larga'], ['m4.graphs', 'Dijkstra es un algoritmo voraz correcto'], ['m2.prop', 'la prueba de corrección es por inducción']],
  read: 'CLRS, capítulos 15 y 16; Skiena, capítulo 10.',
  terms: [
    ['Algoritmo voraz', 'estrategia que elige lo mejor del momento sin reconsiderar', ['Dar vuelto con la moneda más grande.', 'Kruskal toma la arista más barata posible.', 'Elegir la charla que termina primero para asistir a más charlas.']],
    ['Programación dinámica', 'técnica que resuelve subproblemas repetidos y guarda sus resultados', ['Llenar una tabla para la mochila.', 'Calcular la distancia de edición entre dos palabras.', 'Cada casilla usa casillas ya calculadas.']],
    ['Subestructura óptima', 'propiedad de que la solución óptima se compone de subsoluciones óptimas', ['El mejor camino de A a C pasando por B incluye el mejor camino de A a B.', 'El monto 6 se arma a partir del mejor de 5, 3 o 2.', 'Dijkstra se justifica por esta propiedad.']],
    ['Memoización', 'versión de arriba abajo que guarda el resultado de cada llamada', ['Se añade un objeto de caché a la función recursiva.', 'La estructura de la recursión se mantiene.', 'Solo se calculan los subproblemas necesarios.']],
    ['Tabulación', 'versión de abajo arriba que llena una tabla desde los casos base', ['Un bucle calcula dp[1], dp[2], dp[3]...', 'No hay riesgo de desbordar la pila.', 'Se calculan todos los subproblemas en orden.']],
    ['Backtracking', 'exploración de opciones que retrocede al llegar a un callejón sin salida', ['Resolver un Sudoku probando dígitos.', 'Colocar N reinas sin que se ataquen.', 'Generar combinaciones descartando ramas inválidas.']],
    ['Heurística', 'regla práctica que da buenas soluciones sin garantía de óptimo', ['Rutas de reparto con "ir al más cercano".', 'Se acepta una respuesta buena porque la exacta tardaría siglos.', 'A* usa una estimación de la distancia restante.']]
  ],
  q: [
    ['Monedas 1, 5, 10, 25 y monto 30. ¿Greedy da el óptimo?', 'Sí: 25 + 5', ['No, se necesita DP', 'No hay solución', 'Solo con monedas de 1'], 'Este sistema de monedas es "canónico".', 3],
    ['Monedas 1, 3, 4 y monto 6. ¿Qué da greedy?', '3 monedas (4 + 1 + 1), una más que el óptimo', ['2 monedas, el óptimo', '6 monedas', 'No da resultado'], 'Es el contraejemplo clásico.', 3],
    ['Una matriz dp de n × m para distancia de edición cuesta:', 'O(n·m) en tiempo', ['O(n + m) en tiempo', 'O(2ⁿ) en tiempo', 'O(1) en tiempo'], 'Cada celda se calcula en tiempo constante.', 4],
    ['El problema del viajante es NP-difícil. En la práctica, para 10 000 ciudades:', 'Se usan heurísticas que dan buenas rutas', ['Se prueban todas las rutas', 'No se hace nada', 'Se usa búsqueda binaria'], 'n! rutas son inalcanzables.', 4],
    { c: 'Escribe «formasEscalera(n)»: de cuántas formas subes n escalones dando pasos de 1 o 2.', f: 'formasEscalera', p: ['n'], t: [[[1], 1], [[2], 2], [[5], 8], [[30], 1346269]], sol: '  let a = 1, b = 1;\n  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n  return b;', l: 3 },
    { c: 'Escribe «minMonedas(lista, monto)» que devuelva el mínimo de monedas o −1.', f: 'minMonedas', p: ['lista', 'monto'], t: [[[[1, 3, 4], 6], 2], [[[2], 3], -1], [[[1, 5, 10, 25], 30], 2], [[[1], 0], 0]], sol: '  const d = Array(monto + 1).fill(Infinity);\n  d[0] = 0;\n  for (let m = 1; m <= monto; m++) for (const c of lista) if (c <= m) d[m] = Math.min(d[m], d[m - c] + 1);\n  return d[monto] === Infinity ? -1 : d[monto];', l: 3 },
    { c: 'Escribe «mochila(items, cap)» donde items son [peso, valor], y devuelve el valor máximo (cada objeto se usa una sola vez).', f: 'mochila', p: ['items', 'cap'], t: [[[[[1, 1], [3, 4], [4, 5], [5, 7]], 7], 9], [[[], 5], 0], [[[[2, 3]], 1], 0]], sol: '  const d = Array(cap + 1).fill(0);\n  for (const [p, v] of items) for (let c = cap; c >= p; c--) d[c] = Math.max(d[c], d[c - p] + v);\n  return d[cap];', h: 'Recorre la capacidad de mayor a menor para no usar un objeto dos veces.', l: 4 },
    { c: 'Escribe «lcs(a, b)» que devuelva la longitud de la subsecuencia común más larga.', f: 'lcs', p: ['a', 'b'], t: [[['abcde', 'ace'], 3], [['abc', 'def'], 0], [['', 'x'], 0]], sol: '  const d = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));\n  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)\n    d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);\n  return d[a.length][b.length];', l: 4 },
    { c: 'Escribe «edicion(a, b)» que calcule la distancia de Levenshtein.', f: 'edicion', p: ['a', 'b'], t: [[['gato', 'pato'], 1], [['', 'abc'], 3], [['kitten', 'sitting'], 3]], sol: '  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);\n  for (let j = 1; j <= b.length; j++) d[0][j] = j;\n  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)\n    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));\n  return d[a.length][b.length];', l: 4 },
    { c: 'Escribe «maxSubarreglo(l)» con el algoritmo de Kadane: suma máxima de un tramo continuo no vacío.', f: 'maxSubarreglo', p: ['l'], t: [[[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6], [[[-1]], -1], [[[1, 2]], 3]], sol: '  let m = l[0], a = l[0];\n  for (let i = 1; i < l.length; i++) { a = Math.max(l[i], a + l[i]); m = Math.max(m, a); }\n  return m;', l: 4 }
  ],
  gen: function (g) {
    function ways(n) { var a = 1, b = 1; for (var i = 2; i <= n; i++) { var t = a + b; a = b; b = t; } return b; }
    function mm(c, m) { var d = [0]; for (var i = 1; i <= m; i++) { d[i] = Infinity; c.forEach(function (x) { if (x <= i) d[i] = Math.min(d[i], d[i - x] + 1); }); } return d[m]; }
    g.times(8, function (R) { var n = R.int(3, 15); g.input(2, 'Con pasos de 1 o 2, ¿de cuántas formas se suben ' + n + ' escalones?', ways(n), 'dp[n] = dp[n−1] + dp[n−2]. Resultado: ' + ways(n) + '.'); });
    g.times(10, function (R) { var c = R.pick([[1, 3, 4], [1, 5, 6], [1, 2, 5], [1, 4, 5], [1, 7, 10]]), m = R.int(6, 20); g.input(3, 'Monedas ' + c.join(', ') + '. ¿Cuántas monedas como mínimo para formar ' + m + '?', mm(c, m), 'Llena dp desde 0 hasta ' + m + '.'); });
    g.times(6, function (R) { var l = R.int(10, 40), d = R.int(2, 4); g.input(2, 'Un cálculo tiene ' + l + ' subproblemas distintos y cada uno cuesta ' + d + ' pasos. Con memoización, ¿cuántos pasos da en total?', l * d, 'Cada subproblema se resuelve una sola vez.'); });
  } });
})();
