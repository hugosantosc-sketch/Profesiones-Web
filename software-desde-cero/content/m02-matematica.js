(function () {
var M = SDC.M, S = SDC.S;
M('m2', { title: 'Matemática para software', desc: 'No es matemática por deporte: es la que usarás para razonar si un programa es correcto, cuánto tarda y qué tan probable es que falle.',
  thread: 'Las reglas de PatioApp ("un vehículo se entrega solo si está revisado y pagado") son lógica; los conjuntos modelan qué vehículos cumplen cada filtro; la probabilidad estima cuántas revisiones fallarán este mes.',
  books: '*Discrete Mathematics and Its Applications* (Rosen), *Concrete Mathematics* (Graham, Knuth y Patashnik), *Mathematics for Computer Science* (Lehman, Leighton y Meyer, MIT).',
  uni: 'Matemática Discreta (UPC y UTP), Mathematics for Computer Science (MIT), Mathematical Foundations de SWEBOK v4.' });

S('m2', 'm2.prop', { title: 'Lógica proposicional y demostración',
  ask: '¿Qué concepto lógico se aplica?',
  lesson: `
> **La idea en simple.** Un contrato dice: "Si pagas, te entrego el auto". Solo se rompe si pagaste y no te lo entregué. Si no pagaste, no hay incumplimiento, te lo entregue o no. Así funciona la implicación lógica, y el 80% de los errores de razonamiento vienen de ahí.

## Proposiciones y conectores
Una **proposición** es algo verdadero o falso. Se combinan con NOT (¬), AND (∧), OR (∨) e implicación (→).
| P | Q | P → Q |
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

## Formas equivalentes
- **Contrapositiva:** P → Q equivale a ¬Q → ¬P. "Si no hay entrega, es que no hubo pago."
- **Recíproca:** Q → P **no** equivale a P → Q. Que el auto se haya entregado no prueba que pagaste (pudo ser un regalo).

## Inducción: el dominó
Para probar algo sobre todos los naturales: pruebas el caso base y pruebas que si vale para k entonces vale para k+1. Si la primera ficha cae y cada ficha tumba a la siguiente, caen todas. Es el fundamento lógico de la recursión.
~~~js
// Comprobamos 1 + 2 + ... + n = n(n+1)/2 con varios casos.
// La inducción lo prueba para TODOS; esto solo da confianza.
for (let n = 1; n <= 5; n++) {
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  console.log(n, s, n * (n + 1) / 2);
}
~~~

## Puntos que no debes omitir
- Un **contraejemplo** basta para refutar; mil ejemplos no bastan para demostrar. Igual pasa con las pruebas de software.
- **Precondiciones y postcondiciones** son implicaciones: si la entrada cumple P, la salida cumple Q.
- Un **invariante de bucle** es una prueba por inducción sobre las iteraciones.

! Error común: asumir que "si A entonces B" permite concluir "si B entonces A".`,
  links: [['m1.logic', 'son las mismas tablas que implementan las compuertas'], ['m3.rec', 'la recursión es la inducción convertida en código'], ['m14.types', 'una prueba de software encuentra contraejemplos; no demuestra ausencia de errores']],
  read: 'Rosen, capítulo 1; Lehman, Leighton y Meyer, parte I.',
  terms: [
    ['Implicación', 'afirmación "si P entonces Q", falsa solo cuando P es verdadera y Q falsa', ['"Si la revisión está aprobada, el auto puede salir" solo se incumple si está aprobada y no sale.', 'Una función promete: si la lista está ordenada, devuelve la posición correcta.', 'Un contrato no se rompe si la condición inicial nunca ocurrió.']],
    ['Contrapositiva', 'forma equivalente de "si P entonces Q" que dice "si no Q entonces no P"', ['De "si llueve, hay nubes" concluyes "si no hay nubes, no llueve".', 'Si un algoritmo correcto siempre termina, un programa que no termina no es ese algoritmo.', 'Para demostrar un teorema pruebas el enunciado negado al revés.']],
    ['Recíproca', 'enunciado "si Q entonces P", que no equivale al original', ['Alguien concluye "hay nubes, así que llueve".', 'Un test pasó, luego el programa debe ser correcto.', 'Todos los autos revisados tienen sello; este tiene sello, luego está revisado.']],
    ['Contraejemplo', 'caso concreto que demuestra que una afirmación general es falsa', ['«suma(2,2)» pasó, pero «suma(-1,1)» falla y refuta que funcione para todo entero.', 'Un número 9 desmiente que todo impar es primo.', 'Una sola fecha bisiesta muestra que la función de días estaba mal.']],
    ['Inducción', 'prueba con un caso base y un paso que lleva de k a k+1', ['Demuestras que una fórmula vale para n=1 y que, si vale para n, vale para n+1.', 'Justificas que una función recursiva es correcta en todas las entradas.', 'Razonas como fichas de dominó que se tumban en cadena.']],
    ['Invariante', 'condición que se mantiene verdadera antes y después de cada iteración', ['En búsqueda binaria, el objetivo siempre está entre lo y hi.', 'En un ordenamiento, los primeros i elementos ya están ordenados.', 'El saldo total de un banco no cambia durante una transferencia completa.']],
    ['Tautología', 'expresión verdadera para cualquier valor de sus variables', ['«p || !p» siempre da verdadero.', 'Un «if» cuya condición nunca falla se puede eliminar.', 'Toda fila de la tabla de verdad da V.']]
  ],
  q: [
    ['P es falsa y Q es verdadera. ¿Cuánto vale P → Q?', 'Verdadero', ['Falso', 'Indefinido', 'Depende del contexto'], 'La implicación solo es falsa cuando P es verdadera y Q falsa.', 2],
    ['"Si el test falla, hay un bug." ¿Cuál es la contrapositiva?', 'Si no hay bug, el test no falla', ['Si hay bug, el test falla', 'Si el test no falla, no hay bug', 'El test falla y no hay bug'], 'Se niegan ambas partes y se invierten.', 3],
    ['¿Qué demuestran 1000 pruebas que pasan?', 'Solo que esos 1000 casos funcionan', ['Que el programa no tiene errores', 'Que el programa es correcto para toda entrada', 'Que no hace falta revisar el código'], 'Las pruebas pueden mostrar errores, no su ausencia (Dijkstra).', 3],
    ['¿Cuál es el caso base al probar por inducción una función recursiva de factorial?', 'factorial(0) = 1', ['factorial(n) = n × factorial(n−1)', 'factorial(1000)', 'Que n sea par'], 'El caso base no depende de una llamada recursiva.', 4],
    ['La expresión «(a && !b) || (!a && b)» equivale a:', 'a XOR b', ['a AND b', 'a OR b', 'NOT a'], 'Es verdadera cuando a y b son distintos.', 4],
    { c: 'Escribe «implica(p, q)» que devuelva el valor de p → q.', f: 'implica', p: ['p', 'q'], t: [[[true, true], true], [[true, false], false], [[false, true], true], [[false, false], true]], sol: '  return !p || q;', h: 'P → Q equivale a ¬P ∨ Q.', l: 3 },
    { c: 'Escribe «tablaXor()» sin parámetros que devuelva la lista de resultados de XOR para (F,F), (F,V), (V,F), (V,V) en ese orden.', f: 'tablaXor', p: [], t: [[[], [false, true, true, false]]], sol: '  return [[false,false],[false,true],[true,false],[true,true]].map(([a,b]) => a !== b);', l: 3 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var a = R.pick(['V', 'F']), b = R.pick(['V', 'F']), f = [['P ∧ Q', a === 'V' && b === 'V'], ['P ∨ Q', a === 'V' || b === 'V'], ['P → Q', a === 'F' || b === 'V'], ['¬P ∨ Q', a === 'F' || b === 'V'], ['¬(P ∧ Q)', !(a === 'V' && b === 'V')], ['P ↔ Q', a === b]], s = R.pick(f); g.mcq(2, 'Si P = ' + a + ' y Q = ' + b + ', ¿cuánto vale ' + s[0] + '?', s[1] ? 'Verdadero' : 'Falso', [s[1] ? 'Falso' : 'Verdadero', 'No se puede saber'], 'Evalúa cada conector con su tabla de verdad.'); });
    g.times(5, function (R) { var n = R.int(3, 40); g.input(3, 'Por la fórmula 1 + 2 + ... + n = n(n+1)/2, ¿cuánto suman los números del 1 al ' + n + '?', n * (n + 1) / 2, n + '×' + (n + 1) + '/2 = ' + n * (n + 1) / 2 + '.'); });
    g.times(3, function (R) { var n = R.int(50, 500); g.input(4, 'Sin usar un bucle, calcula 1 + 2 + ... + ' + n + '.', n * (n + 1) / 2, 'Aplica la fórmula probada por inducción: ' + n * (n + 1) / 2 + '.'); });
  } });

S('m2', 'm2.sets', { title: 'Conjuntos, relaciones y funciones',
  ask: '¿Qué concepto de conjuntos describe esto?',
  lesson: `
> **La idea en simple.** Piensa en dos listas de WhatsApp: los que trabajan en el patio y los que tienen licencia. Los que están en ambas forman la intersección; juntarlas sin repetir es la unión. Cada vez que filtras una base de datos estás haciendo esto.

## Operaciones básicas
~~~txt
A = {1,2,3}, B = {2,3,4}
A ∪ B = {1,2,3,4}     unión
A ∩ B = {2,3}         intersección
A − B = {1}           diferencia
|A| = 3               cardinalidad
~~~
~~~js
const A = new Set([1, 2, 3]), B = new Set([2, 3, 4]);
console.log([...A].filter(x => B.has(x)));   // intersección
console.log([...new Set([...A, ...B])]);     // unión
console.log([...A].filter(x => !B.has(x)));  // diferencia
~~~

## Relaciones
Una relación es un conjunto de pares. En un patio: (chofer, vehículo). Una relación puede ser reflexiva, simétrica y transitiva; si cumple las tres, es de **equivalencia**: agrupa los elementos en clases, justo la base de las pruebas por clases de equivalencia.

## Funciones matemáticas
Una función asigna a cada entrada **exactamente una** salida.
- **Inyectiva:** dos entradas distintas nunca dan la misma salida (DNI a persona).
- **Sobreyectiva:** toda salida posible se alcanza.
- **Biyectiva:** ambas; se puede invertir.

## Puntos que no debes omitir
- Una tabla SQL es un conjunto de filas: «JOIN», «UNION» y «EXCEPT» vienen de aquí.
- Una función pura de programación es una función matemática: misma entrada, misma salida.
- Un hash no es inyectivo: dos entradas pueden colisionar. Por el principio del palomar, es inevitable.

! Error común: creer que el orden importa en un conjunto. {1,2} y {2,1} son el mismo conjunto.`,
  links: [['m10.join', 'JOIN, UNION y WHERE son operaciones de conjuntos sobre filas'], ['m4.hash', 'las colisiones son funciones no inyectivas'], ['m6.func', 'la programación funcional toma literalmente esta idea de función']],
  read: 'Rosen, capítulos 2 y 9.',
  terms: [
    ['Unión', 'conjunto con todos los elementos de ambos conjuntos, sin repetir', ['Combinas la lista de clientes de Lima con la de Arequipa sin duplicados.', 'SQL devuelve filas de dos consultas con «UNION».', 'Quieres los autos que son rojos o que son del 2024.']],
    ['Intersección', 'conjunto con los elementos que están en ambos conjuntos', ['Buscas los autos rojos que además son del 2024.', 'Un «INNER JOIN» conserva solo lo que coincide.', 'Dos amigos comparan qué películas han visto ambos.']],
    ['Diferencia', 'elementos de un conjunto que no están en el otro', ['Listas vehículos registrados que aún no han sido revisados.', 'SQL usa «EXCEPT» para esto.', 'Quieres los correos que están en A y no en la lista de bajas.']],
    ['Cardinalidad', 'número de elementos de un conjunto', ['La pregunta es cuántas placas distintas hay.', '«COUNT(DISTINCT placa)» calcula esto.', 'En un diagrama ER indica si es uno a muchos.']],
    ['Función inyectiva', 'función en la que entradas distintas siempre dan salidas distintas', ['Cada DNI válido corresponde a una persona distinta.', 'Una clave primaria nunca se repite entre filas.', 'Un cifrado debe tener esta propiedad para poder descifrar.']],
    ['Relación de equivalencia', 'relación reflexiva, simétrica y transitiva que agrupa elementos en clases', ['"Tener el mismo modelo" separa los autos en grupos sin solapamiento.', 'Las edades de 18 a 65 se comportan igual y se prueban con un solo representante.', '"Dar el mismo residuo módulo 5" reparte los enteros en cinco grupos.']],
    ['Principio del palomar', 'si hay más objetos que cajas, alguna caja recibe al menos dos', ['Con 367 personas, dos cumplen años el mismo día.', 'Una función hash con salida finita inevitablemente tiene colisiones.', 'No se puede comprimir sin pérdida todo archivo posible.']]
  ],
  q: [
    ['¿Cuántos subconjuntos tiene un conjunto de 5 elementos?', '32', ['25', '10', '120'], 'Cada elemento está o no está: 2^5 = 32.', 3],
    ['Si A tiene 3 elementos y B tiene 4, ¿cuántos pares tiene A × B?', '12', ['7', '81', '64'], 'El producto cartesiano tiene 3 × 4 pares; un CROSS JOIN hace justo esto.', 3],
    ['Una tabla con 1000 filas se cruza sin condición con otra de 1000. ¿Cuántas filas salen?', '1 000 000', ['1000', '2000', '0'], 'Olvidar la condición del JOIN produce un producto cartesiano.', 4],
    ['¿Qué función es inyectiva sobre los enteros?', 'f(x) = x + 7', ['f(x) = x²', 'f(x) = |x|', 'f(x) = x % 2'], 'En las otras, distintas entradas pueden dar igual salida.', 4],
    { c: 'Escribe «interseccion(a, b)» que devuelva los elementos comunes, sin repetir, en el orden en que aparecen en a.', f: 'interseccion', p: ['a', 'b'], t: [[[[1, 2, 3], [2, 3, 4]], [2, 3]], [[[1, 1, 2], [1]], [1]], [[[], [1]], []]], sol: '  const s = new Set(b), r = new Set();\n  for (const x of a) if (s.has(x)) r.add(x);\n  return [...r];', l: 3 },
    { c: 'Escribe «union(a, b)» que devuelva todos los elementos sin repetir, primero los de a y luego los nuevos de b.', f: 'union', p: ['a', 'b'], t: [[[[1, 2], [2, 3]], [1, 2, 3]], [[[], []], []], [[[3, 3], [1]], [3, 1]]], sol: '  return [...new Set([...a, ...b])];', l: 3 },
    { c: 'Escribe «esInyectiva(pares)» que reciba una lista de pares [entrada, salida] y diga si ninguna salida se repite.', f: 'esInyectiva', p: ['pares'], t: [[[[[1, 'a'], [2, 'b']]], true], [[[[1, 'a'], [2, 'a']]], false], [[[]], true]], sol: '  const s = pares.map(p => p[1]);\n  return new Set(s).size === s.length;', l: 4 }
  ],
  gen: function (g) {
    function setText(s) { return '{' + s.join(',') + '}'; }
    g.times(18, function (R) {
      var A = R.sample([1, 2, 3, 4, 5, 6, 7, 8], R.int(3, 5)).sort(), B = R.sample([1, 2, 3, 4, 5, 6, 7, 8], R.int(3, 5)).sort();
      var ops = [['A ∩ B', A.filter(function (x) { return B.indexOf(x) >= 0; })], ['A − B', A.filter(function (x) { return B.indexOf(x) < 0; })], ['A ∪ B', A.concat(B.filter(function (x) { return A.indexOf(x) < 0; }))]];
      var o = R.pick(ops);
      g.input(2, 'A = ' + setText(A) + ', B = ' + setText(B) + '. ¿Cuál es la cardinalidad de ' + o[0] + '?', o[1].length, o[0] + ' = ' + setText(o[1].slice().sort()) + ', que tiene ' + o[1].length + ' elementos.');
    });
    g.times(5, function (R) { var n = R.int(2, 12); g.input(3, '¿Cuántos subconjuntos tiene un conjunto de ' + n + ' elementos?', Math.pow(2, n), '2^' + n + ' = ' + Math.pow(2, n) + '.'); });
  } });

S('m2', 'm2.prob', { title: 'Combinatoria y probabilidad',
  ask: '¿Qué concepto aplica?',
  lesson: `
> **La idea en simple.** ¿Cuántas placas distintas se pueden hacer? ¿Cuán probable es que dos usuarios elijan la misma contraseña? Contar bien responde preguntas de capacidad, seguridad y rendimiento.

## Contar
- **Regla del producto:** 3 camisas y 4 pantalones = 12 combinaciones.
- **Permutaciones:** ordenar n cosas = n! formas.
- **Combinaciones:** elegir k de n sin importar el orden = n! / (k!(n−k)!).
~~~js
function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
function C(n, k) { return fact(n) / (fact(k) * fact(n - k)); }
console.log(fact(5));   // formas de ordenar 5 autos
console.log(C(5, 2));   // formas de elegir 2 de 5
console.log(36 ** 4);   // códigos de 4 caracteres alfanuméricos
~~~

## Probabilidad
Probabilidad = casos favorables / casos posibles. Si dos eventos son independientes, sus probabilidades se multiplican.
- **Sistemas en serie:** si A y B funcionan 99% del tiempo y necesitas ambos, disponibilidad 0.99 × 0.99 = 98.01%.
- **Sistemas en paralelo (redundancia):** falla solo si ambos fallan: 1 − 0.01 × 0.01 = 99.99%.

## Estadística que usarás
- **Media:** se distorsiona con valores extremos.
- **Mediana y percentiles:** el percentil 99 (p99) de una API dice qué tan lento es para el peor 1%. Mucho más útil que el promedio.
- **Valor esperado:** promedio ponderado por probabilidad; sirve para estimar riesgos (impacto × probabilidad).

## Puntos que no debes omitir
- La **paradoja del cumpleaños**: con 23 personas hay más de 50% de probabilidad de coincidencia. Por eso las colisiones de hash aparecen antes de lo intuitivo.
- Una **prueba A/B** compara dos versiones con estadística.
- Los números aleatorios de «Math.random()» no son aptos para seguridad.

! Error común: reportar solo el promedio de tiempo de respuesta. Un promedio de 100 ms puede esconder a usuarios esperando 8 segundos.`,
  links: [['m4.hash', 'la paradoja del cumpleaños explica por qué las tablas hash colisionan'], ['m12.risk', 'la exposición al riesgo es probabilidad por impacto'], ['m13.quality', 'las disponibilidades en serie y en paralelo deciden la arquitectura'], ['m15.obs', 'los percentiles son la base de los SLO']],
  read: 'Rosen, capítulos 6 y 7.',
  terms: [
    ['Permutación', 'cada forma de ordenar un conjunto de elementos', ['Cuentas de cuántas formas se pueden formar 6 autos en fila.', 'El orden de llegada a una carrera sí importa.', 'Una fuerza bruta del viajante revisa n! rutas.']],
    ['Combinación', 'selección de k elementos de n en la que el orden no importa', ['Eliges 3 revisores de un equipo de 8.', 'Formas una mano de cartas.', 'Eliges 2 ingredientes de un menú de 10 sin importar cuál fue primero.']],
    ['Independencia', 'situación en la que un evento no altera la probabilidad del otro', ['Lanzar una moneda dos veces.', 'Dos servidores en zonas distintas fallan por causas que no se relacionan.', 'Se pueden multiplicar sus probabilidades directamente.']],
    ['Percentil', 'valor por debajo del cual queda cierto porcentaje de las observaciones', ['El 99% de las peticiones responde en menos de 800 ms.', 'Un SLO se define con p95 en lugar de promedio.', 'Un niño está en el 70 de talla para su edad.']],
    ['Mediana', 'valor central de los datos ordenados', ['Con 2, 3 y 100 el valor representativo es 3.', 'Un sueldo típico se informa así para que los millonarios no lo distorsionen.', 'No se altera mucho si hay un valor extremo.']],
    ['Valor esperado', 'promedio de resultados ponderado por su probabilidad', ['Un riesgo de 10% con costo de S/ 5000 vale S/ 500 de exposición.', 'Una rifa vale la pena si el pago promedio por boleto supera su precio.', 'Decides si invertir en un respaldo multiplicando impacto y probabilidad.']],
    ['Redundancia', 'tener componentes duplicados para que el sistema falle solo si fallan todos', ['Dos servidores con 99% cada uno dan 99.99% de disponibilidad.', 'Un avión lleva varios motores.', 'Una base de datos tiene réplica lista para tomar el control.']]
  ],
  q: [
    ['Tres servicios en serie con 99.9% cada uno dan, aproximadamente:', '99.7%', ['99.9%', '99.99%', '97%'], '0.999³ ≈ 0.997; cuantos más componentes en serie, peor.', 3],
    ['Tiempos: 100, 100, 100, 100, 5000 ms. ¿Qué describe mejor al usuario típico?', 'La mediana de 100 ms', ['El promedio de 1080 ms', 'El máximo de 5000 ms', 'La suma de 5400 ms'], 'La mediana no se deja arrastrar por un solo valor extremo.', 3],
    ['¿Por qué no usar Math.random() para generar tokens de sesión?', 'Porque es predecible; se debe usar un generador criptográfico', ['Porque devuelve solo enteros', 'Porque es muy lento', 'Porque no funciona en servidores'], 'Un atacante puede deducir su estado interno.', 4],
    ['Con 23 personas en una sala, ¿qué es cierto?', 'Hay más de 50% de probabilidad de que dos cumplan el mismo día', ['La probabilidad es 23/365', 'Es imposible que coincidan', 'La probabilidad es 100%'], 'Crecen los pares posibles (253), no las personas.', 4],
    { c: 'Escribe «combinaciones(n, k)» que calcule C(n,k).', f: 'combinaciones', p: ['n', 'k'], t: [[[5, 2], 10], [[10, 0], 1], [[6, 3], 20], [[20, 10], 184756]], sol: '  let r = 1;\n  for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;\n  return Math.round(r);', l: 3 },
    { c: 'Escribe «mediana(lista)»: ordena una copia y devuelve el valor central, o el promedio de los dos centrales si la cantidad es par.', f: 'mediana', p: ['lista'], t: [[[[3, 1, 2]], 2], [[[4, 1, 3, 2]], 2.5], [[[100, 1, 2]], 2], [[[5]], 5]], sol: '  const s = [...lista].sort((a, b) => a - b), m = Math.floor(s.length / 2);\n  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;', h: 'Recuerda que sort() sin función compara como texto.', l: 4 }
  ],
  gen: function (g) {
    function f(n) { return n <= 1 ? 1 : n * f(n - 1); }
    function C(n, k) { return Math.round(f(n) / (f(k) * f(n - k))); }
    g.times(6, function (R) { var n = R.int(3, 8); g.input(2, '¿De cuántas formas se pueden ordenar ' + n + ' autos en fila?', f(n), n + '! = ' + f(n) + '.'); });
    g.times(10, function (R) { var n = R.int(4, 12), k = R.int(2, 3); g.input(2, '¿De cuántas formas puedes elegir ' + k + ' personas de ' + n + '?', C(n, k), 'C(' + n + ',' + k + ') = ' + C(n, k) + '.'); });
    g.times(6, function (R) { var l = R.int(2, 6); g.input(2, '¿Cuántos códigos de ' + l + ' dígitos (0-9) existen?', Math.pow(10, l), '10^' + l + ' = ' + Math.pow(10, l) + '.'); });
    g.times(6, function (R) { var a = R.pick([99, 95, 90]), b = R.pick([99, 95, 90, 98]); g.input(3, 'Dos componentes con ' + a + '% y ' + b + '% funcionan en serie. ¿Cuál es la disponibilidad total en %? (sin símbolo)', +(a * b / 100).toFixed(2), a / 100 + ' × ' + b / 100 + ' = ' + (a * b / 10000).toFixed(4) + '.'); });
    g.times(6, function (R) { var a = R.pick([99, 95, 90]), b = R.pick([98, 95, 90, 80]); g.input(4, 'Dos réplicas con ' + a + '% y ' + b + '% funcionan en paralelo. ¿Cuál es la disponibilidad total en %? (sin símbolo)', +(100 - (100 - a) * (100 - b) / 100).toFixed(2), 'Falla solo si ambas fallan: 1 − ' + (100 - a) / 100 + ' × ' + (100 - b) / 100 + '.'); });
    g.times(5, function (R) { var p = R.pick([5, 10, 20, 25]), c = R.pick([1000, 2000, 4000, 8000]); g.input(3, 'Un riesgo tiene ' + p + '% de probabilidad y S/ ' + c + ' de impacto. ¿Cuál es su exposición en soles?', p * c / 100, p / 100 + ' × ' + c + ' = ' + p * c / 100 + '.'); });
  } });
})();
