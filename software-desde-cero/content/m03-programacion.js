(function () {
var M = SDC.M, S = SDC.S;
M('m3', { title: 'Programar desde cero', desc: 'Aprendes a pensar en pasos y a escribirlos en JavaScript, un lenguaje que corre aquí mismo en tu navegador. Las ideas sirven para cualquier otro lenguaje.',
  thread: 'Empiezas PatioApp con funciones simples: validar una placa, calcular días en patio, filtrar vehículos pendientes y sumar costos de una lista.',
  books: '*Structure and Interpretation of Computer Programs* (Abelson y Sussman), *Eloquent JavaScript* (Haverbeke), *Introduction to Programming* de CS50 (Harvard).',
  uni: 'Introducción a los Algoritmos y Algoritmos (UPC), Principios de Algoritmos y Taller de Programación (UTP), CS50 (Harvard).' });

S('m3', 'm3.vars', { title: 'Variables, tipos y expresiones',
  ask: '¿Qué concepto se ve aquí?',
  lesson: `
> **La idea en simple.** Una variable es una caja con etiqueta. «const» es una caja sellada: no puedes cambiar qué tiene dentro. «let» es una caja que puedes volver a llenar. El tipo es lo que se puede hacer con el contenido: no multiplicas nombres, ni pasas a mayúsculas un número.

~~~js
const placa = "ABC-123";      // texto (string)
let km = 45000;               // número
km = km + 1200;               // lo actualizamos
const revisado = false;       // booleano
let chofer = null;            // ausencia a propósito

console.log(placa, km, revisado, chofer);
console.log(typeof placa, typeof km, typeof revisado);
~~~

## Tipos en JavaScript
| Tipo | Ejemplo | Para qué |
| number | 42, 3.14 | enteros y decimales (¡punto flotante!) |
| string | "hola" | texto |
| boolean | true, false | decisiones |
| null | null | "no hay valor, a propósito" |
| undefined | undefined | "no se asignó nada" |
| object | {}, [] | datos compuestos |

## Expresiones y operadores
Una expresión produce un valor. La precedencia funciona como en matemática: «*» antes que «+».
~~~js
console.log(2 + 3 * 4);       // 14
console.log((2 + 3) * 4);     // 20
console.log(7 % 3);           // resto de la división
console.log(2 ** 10);         // potencia
console.log("5" + 1);         // ¡concatena!
console.log("5" * 2);         // convierte a número
~~~

## Puntos que no debes omitir
- Usa «const» por defecto y «let» solo si el valor cambia. Evita «var».
- Usa siempre «===». «==» convierte tipos: «"0" == 0» es verdadero.
- El nombre importa más de lo que crees: «diasEnPatio» se explica solo; «d» no.
- Lenguajes como Java o TypeScript revisan los tipos al compilar y atrapan errores antes.

! Error común: sumar valores que vienen de un formulario. Siempre son texto: «"10" + "5"» da «"105"».`,
  links: [['m1.data', 'los tipos son acuerdos sobre cómo leer los bits'], ['m3.cond', 'los booleanos deciden qué camino sigue el programa'], ['m6.clean', 'elegir buenos nombres es la base del código limpio']],
  read: 'Haverbeke, *Eloquent JavaScript*, capítulos 1 y 2.',
  terms: [
    ['Variable', 'nombre que apunta a un valor guardado en memoria', ['Escribes «let km = 100» para usarlo después.', 'El valor de «total» cambia en cada vuelta.', 'Un dato recibe una etiqueta para reutilizarlo.']],
    ['Constante', 'nombre cuyo valor asignado no se puede reasignar', ['«const IGV = 0.18» no debe cambiar.', 'Reasignar provoca «TypeError: Assignment to constant variable».', 'La referencia a un objeto no cambia, aunque sus propiedades sí.']],
    ['Tipo de dato', 'clasificación que define qué valores admite un dato y qué operaciones acepta', ['«typeof 5» da «number».', 'No puedes llamar «.toUpperCase()» sobre un número.', 'TypeScript avisa que pasaste texto donde se esperaba número.']],
    ['Coerción', 'conversión automática de un tipo a otro que hace el lenguaje', ['«"5" * 2» da 10.', '«"5" + 1» da «"51"».', '«0 == ""» resulta verdadero.']],
    ['Operador módulo', 'operador que devuelve el resto de una división entera', ['«10 % 3» da 1.', 'Saber si un número es par con «n % 2 === 0».', 'Dar la vuelta a un índice circular en una lista.']],
    ['Null', 'valor que indica ausencia intencional de valor', ['Un vehículo sin chofer asignado todavía.', 'Una consulta que no encuentra resultado devuelve este valor.', 'Lo creó Tony Hoare, quien lo llamó su error del millón de dólares.']],
    ['Precedencia', 'regla que decide qué operación se evalúa primero', ['«2 + 3 * 4» da 14.', 'Se añaden paréntesis para cambiar el orden.', '«!a && b» aplica NOT antes del AND.']]
  ],
  q: [
    ['¿Qué imprime «console.log(typeof null)» en JavaScript?', 'object', ['null', 'undefined', 'number'], 'Es un error histórico del lenguaje que se mantiene por compatibilidad.', 3],
    ['Un formulario entrega precio = "20" y cantidad = "3". ¿Qué haces antes de multiplicar y sumar?', 'Convertirlos con Number() y validar el resultado', ['Nada, JavaScript lo resuelve siempre', 'Concatenarlos', 'Usar == en vez de ==='], 'Multiplicar coaccionaría, pero sumar concatenaría: conviene convertir y validar.', 4],
    ['¿Qué ocurre con «const auto = {km: 1}; auto.km = 2;»?', 'Funciona: const protege la referencia, no el contenido', ['Da error de reasignación', 'Crea otro objeto', 'auto.km sigue en 1'], 'La variable apunta al mismo objeto; su contenido es mutable.', 4],
    { c: 'Escribe «igv(precio)» que devuelva el IGV (18%) de un precio, redondeado a 2 decimales.', f: 'igv', p: ['precio'], t: [[[100], 18], [[50], 9], [[19.99], 3.6], [[0], 0]], sol: '  return Math.round(precio * 0.18 * 100) / 100;', l: 2 },
    { c: 'Escribe «diasEnPatio(ingreso, salida)» que reciba dos números de día del año y devuelva cuántos días pasó el vehículo, contando el día de ingreso.', f: 'diasEnPatio', p: ['ingreso', 'salida'], t: [[[10, 10], 1], [[10, 15], 6], [[1, 365], 365]], sol: '  return salida - ingreso + 1;', l: 2 },
    { c: 'Escribe «aNumeroSeguro(texto)» que convierta un texto en número; si no es un número válido o está vacío, devuelve null.', f: 'aNumeroSeguro', p: ['texto'], t: [[['10'], 10], [['3.5'], 3.5], [['abc'], null], [[''], null], [['  '], null]], sol: "  if (texto.trim() === '') return null;\n  const n = Number(texto);\n  return Number.isNaN(n) ? null : n;", h: 'Number("") da 0, así que revisa el vacío antes.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9); g.trace(1, 'console.log(' + a + ' + ' + b + ' * ' + c + ');', 'Primero la multiplicación: ' + b * c + ', luego la suma.'); });
    g.times(8, function (R) { var a = R.int(7, 50), b = R.int(2, 9); g.trace(1, 'console.log(' + a + ' % ' + b + ');', a + ' entre ' + b + ' deja resto ' + a % b + '.'); });
    g.times(6, function (R) { var a = R.int(1, 9), b = R.int(1, 9); g.trace(2, 'let x = ' + a + ';\nlet y = x + ' + b + ';\nx = 100;\nconsole.log(y);', 'y guardó el valor calculado en ese momento; cambiar x después no lo afecta.'); });
    g.times(6, function (R) { var a = R.int(1, 9), b = R.int(1, 9); g.trace(2, 'console.log("' + a + '" + ' + b + ');', 'Con un texto, + concatena.'); });
    g.times(4, function (R) { var a = R.int(1, 9), b = R.int(2, 9); g.trace(2, 'console.log("' + a + '" * ' + b + ');', 'El operador * convierte el texto a número.'); });
    g.times(5, function (R) { var a = R.int(2, 9), b = R.int(2, 9), c = R.int(1, 3); g.trace(3, 'let a = ' + a + ', b = ' + b + ';\nconst t = a;\na = b;\nb = t + ' + c + ';\nconsole.log(a, b);', 'Sigue cada asignación en orden; t guarda el valor antiguo de a.'); });
  } });

S('m3', 'm3.cond', { title: 'Condicionales y decisiones',
  ask: '¿Qué estructura o concepto usarías?',
  lesson: `
> **La idea en simple.** Un programa sin condicionales es un tren en vía recta. Un «if» es un cambio de vía: según una condición, el tren toma un camino u otro.

~~~js
function estadoVehiculo(km, revisado) {
  if (!revisado) {
    return "Pendiente de revisión";
  } else if (km > 100000) {
    return "Revisado con kilometraje alto";
  }
  return "Listo para entrega";
}
console.log(estadoVehiculo(5000, false));
console.log(estadoVehiculo(150000, true));
console.log(estadoVehiculo(5000, true));
~~~

## Las herramientas
- **if / else if / else:** evalúa en orden; entra al primero que se cumple.
- **switch:** muchos casos sobre un mismo valor.
- **Operador ternario:** «condicion ? a : b» para elegir entre dos valores.
- **Guardas:** salir pronto con «return» evita pirámides de if.

## Verdadero y falso en JavaScript
Son "falsos": «false», «0», «""», «null», «undefined», «NaN». Todo lo demás es verdadero, incluso «[]» y «"0"».

## Cómo pensar una condición
1. Escribe la regla en palabras.
2. Tradúcela con «&&», «||» y «!».
3. Prueba los límites: ¿qué pasa exactamente en 18? ¿«>=» o «>»?

## Puntos que no debes omitir
- Comprueba los casos de **frontera**; ahí vive casi todo error (mira pruebas de valores límite).
- El orden importa: una condición amplia antes que una específica oculta a la segunda.
- Si la lógica crece, una tabla de decisiones o polimorfismo es mejor que muchos if.

! Error común: escribir «if (x = 5)». Eso asigna, no compara. Usa «===».`,
  links: [['m1.logic', 'cada condición es álgebra booleana'], ['m3.loops', 'un bucle es una condición que se repite'], ['m5.oop2', 'el polimorfismo reemplaza cadenas largas de if'], ['m14.techniques', 'los valores límite existen porque aquí se equivoca la gente']],
  read: 'McConnell, *Code Complete*, capítulo sobre condicionales.',
  terms: [
    ['If', 'estructura que ejecuta un bloque solo si la condición es verdadera', ['Se muestra una alerta solo cuando el stock es cero.', 'Una rama adicional se añade con else.', 'El programa elige qué hacer según un dato.']],
    ['Switch', 'estructura que elige entre muchos casos según un mismo valor', ['Según el estado "nuevo", "usado" o "taller" se muestra un icono.', 'Olvidar «break» hace que el caso siguiente también corra.', 'Se usa un valor «default» cuando nada coincide.']],
    ['Ternario', 'expresión compacta que elige entre dos valores', ['«const t = km > 0 ? "usado" : "nuevo"».', 'Asignas una etiqueta en una sola línea.', 'Anidarla dificulta tanto la lectura que los revisores la rechazan.']],
    ['Guarda', 'comprobación temprana que sale de la función si algo no se cumple', ['«if (!usuario) return null;» al inicio.', 'Se evita una pirámide de if anidados.', 'Primero se descartan casos inválidos y al final queda el camino feliz.']],
    ['Valor falsy', 'valor que se comporta como falso en una condición', ['«if (0)» no entra.', 'Una cadena vacía hace que el bloque no se ejecute.', 'Un contador en 0 se trata por error como "no hay dato".']],
    ['Tabla de decisiones', 'matriz que asigna cada combinación de condiciones a una acción', ['Ocho combinaciones de tres reglas se documentan en filas.', 'Una lógica de descuentos deja de ser una maraña.', 'Un analista revisa que no falte ningún caso.']],
    ['Caso de frontera', 'valor justo en el límite donde cambia el comportamiento', ['Probar la edad 17, 18 y 19 con una regla de mayoría de edad.', 'Un descuento desde S/ 100 se revisa justo en 100.', 'El último índice de un arreglo provoca un error.']]
  ],
  q: [
    ['¿Qué imprime «console.log([] ? "sí" : "no")»?', 'sí', ['no', 'error', 'undefined'], 'Un arreglo vacío es verdadero en JavaScript.', 3],
    ['Regla: "descuento si compra 100 o más y no es promoción". ¿Cuál es correcta?', 'total >= 100 && !promo', ['total > 100 || !promo', 'total >= 100 || promo', '!(total >= 100) && promo'], '"100 o más" es >=, y ambas condiciones deben cumplirse.', 3],
    ['Este código nunca devuelve "alto". ¿Por qué?\nif (km > 50) return "medio";\nif (km > 100) return "alto";', 'La condición amplia va primero y oculta a la específica', ['Falta un else', 'Falta usar ===', 'Debe usar switch'], 'Todo km > 100 ya es km > 50. Se debe invertir el orden.', 4],
    ['¿Cuál simplifica «if (a) { return true; } else { return false; }»?', 'return Boolean(a);', ['return !a;', 'return a === false;', 'return true;'], 'Devolver la condición directamente evita ramas innecesarias.', 2],
    { c: 'Escribe «clasificarKm(km)»: "nuevo" si km < 1000, "seminuevo" si km < 50000, "usado" en otro caso.', f: 'clasificarKm', p: ['km'], t: [[[0], 'nuevo'], [[999], 'nuevo'], [[1000], 'seminuevo'], [[49999], 'seminuevo'], [[50000], 'usado']], sol: "  if (km < 1000) return 'nuevo';\n  if (km < 50000) return 'seminuevo';\n  return 'usado';", l: 2 },
    { c: 'Escribe «esBisiesto(a)»: múltiplo de 4, salvo los múltiplos de 100 que no sean múltiplos de 400.', f: 'esBisiesto', p: ['a'], t: [[[2024], true], [[2023], false], [[1900], false], [[2000], true]], sol: '  return a % 4 === 0 && (a % 100 !== 0 || a % 400 === 0);', l: 3 },
    { c: 'Escribe «puedeSalir(v)» que reciba un objeto {revisado, pagado, bloqueado} y devuelva true solo si está revisado y pagado y no está bloqueado.', f: 'puedeSalir', p: ['v'], t: [[[{ revisado: true, pagado: true, bloqueado: false }], true], [[{ revisado: true, pagado: true, bloqueado: true }], false], [[{ revisado: false, pagado: true, bloqueado: false }], false]], sol: '  return v.revisado && v.pagado && !v.bloqueado;', l: 2 },
    { c: 'Escribe «fizzbuzz(n)»: devuelve "FizzBuzz" si n es múltiplo de 3 y 5, "Fizz" si de 3, "Buzz" si de 5; si no, el número.', f: 'fizzbuzz', p: ['n'], t: [[[15], 'FizzBuzz'], [[9], 'Fizz'], [[10], 'Buzz'], [[7], 7]], sol: "  if (n % 15 === 0) return 'FizzBuzz';\n  if (n % 3 === 0) return 'Fizz';\n  if (n % 5 === 0) return 'Buzz';\n  return n;", h: 'Comprueba primero el caso más específico.', l: 3 },
    { c: 'Escribe «tarifa(dias, vip)»: S/ 20 por día; desde el día 8 cada día adicional cuesta S/ 15; si es VIP, 10% de descuento al total.', f: 'tarifa', p: ['dias', 'vip'], t: [[[1, false], 20], [[7, false], 140], [[8, false], 155], [[10, true], 166.5]], sol: '  const base = dias <= 7 ? dias * 20 : 140 + (dias - 7) * 15;\n  return vip ? base * 0.9 : base;', l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var k = R.int(1, 100), u = R.int(1, 100); g.trace(1, 'const x = ' + k + ';\nif (x > ' + u + ') {\n  console.log("mayor");\n} else {\n  console.log("no mayor");\n}', 'Compara ' + k + ' con ' + u + '.'); });
    g.times(10, function (R) { var a = R.pick([true, false]), b = R.pick([true, false]); var x = R.int(0, 9), y = R.int(0, 9); g.trace(2, 'const a = ' + a + ', b = ' + b + ';\nconsole.log(a && b ? ' + x + ' : ' + y + ');', 'El ternario evalúa primero la condición con &&.'); });
    g.times(12, function (R) { var n = R.int(0, 120); g.trace(2, 'const n = ' + n + ';\nif (n % 2 === 0 && n > 50) console.log("A");\nelse if (n % 2 === 0) console.log("B");\nelse if (n > 50) console.log("C");\nelse console.log("D");', 'Se entra a la primera rama que se cumple.'); });
    g.times(8, function (R) { var v = R.pick(['0', '""', '"0"', 'null', '[]', '{}', '1', 'undefined', 'NaN', '-1', '"a"']); g.trace(3, 'console.log(' + v + ' ? "verdadero" : "falso");', 'Solo false, 0, "", null, undefined y NaN son falsos.'); });
  } });

S('m3', 'm3.loops', { title: 'Bucles e iteración',
  ask: '¿Qué concepto aparece aquí?',
  lesson: `
> **La idea en simple.** Un bucle es lo que harías al revisar una fila de autos: empiezas por el primero, revisas, pasas al siguiente, y te detienes cuando no quedan.

## Tres ingredientes
Todo bucle necesita un **inicio**, una **condición para seguir** y un **avance**. Si falta el avance, nunca termina.
~~~js
// Sumar los kilometrajes
const kms = [12000, 34000, 8000];
let total = 0;                        // acumulador
for (let i = 0; i < kms.length; i++) {
  total += kms[i];
}
console.log(total);

// Con for...of no necesitas índice
for (const km of kms) console.log(km);

// while: cuando no sabes cuántas vueltas
let n = 100, pasos = 0;
while (n > 1) { n = Math.floor(n / 2); pasos++; }
console.log(pasos);
~~~

## Patrones que debes dominar
- **Acumulador:** sumar, multiplicar o concatenar.
- **Contador:** cuántos cumplen algo.
- **Máximo o mínimo:** recordar el mejor hasta ahora.
- **Búsqueda:** recorrer hasta encontrar y salir con «break» o «return».
- **Bucles anidados:** por cada elemento recorres otra colección. Multiplican el trabajo; n×n vueltas.

## Cómo razonar que está bien
Pregúntate: ¿qué es verdad en cada vuelta? En la suma: "total contiene la suma de los primeros i elementos". Eso es un **invariante**, y es tu mejor herramienta para depurar mentalmente.

## Puntos que no debes omitir
- Errores de "uno de más": «<=» en vez de «<» se sale del arreglo.
- No modifiques una colección mientras la recorres.
- Cada bucle anidado suele multiplicar el costo: lo medirás con Big-O.

! Error común: inicializar el acumulador dentro del bucle. Se reinicia en cada vuelta.`,
  links: [['m2.prop', 'el invariante de bucle es una prueba por inducción'], ['m4.bigo', 'contar vueltas es exactamente medir complejidad'], ['m3.arr', 'recorrer listas es el uso más común de un bucle']],
  read: 'Abelson y Sussman, *SICP*, sección 1.2 sobre procesos iterativos.',
  terms: [
    ['Bucle for', 'repetición con inicio, condición y avance declarados juntos', ['Recorres del 0 al 9 con un índice i.', 'Sabes de antemano cuántas vueltas darás.', 'Sumas los elementos de una lista por posición.']],
    ['Bucle while', 'repetición que continúa mientras una condición sea verdadera', ['Lees datos hasta que el usuario escriba "salir".', 'Divides un número hasta llegar a 1.', 'No se sabe cuántas vueltas se necesitan.']],
    ['Acumulador', 'variable que va guardando un resultado parcial en cada vuelta', ['«total += precio» dentro de un recorrido.', 'Se inicializa antes del bucle en 0.', 'Se construye un texto concatenando en cada iteración.']],
    ['Break', 'instrucción que termina un bucle de inmediato', ['Dejas de buscar tras encontrar la placa.', 'Se interrumpe un recorrido cuando aparece un error.', 'Evita seguir revisando elementos innecesarios.']],
    ['Continue', 'instrucción que salta a la siguiente iteración', ['Se ignoran filas vacías y se sigue con la próxima.', 'Se omiten los autos ya revisados dentro del recorrido.', 'El resto del cuerpo no se ejecuta en esa vuelta, pero el bucle sigue.']],
    ['Error de uno de más', 'fallo por dar una vuelta de más o de menos en un límite', ['Usaste «i <= lista.length» y obtuviste undefined al final.', 'Una paginación repite el último elemento en la página siguiente.', 'Hay 10 postes para 9 tramos y calculaste 9 postes.']],
    ['Bucle infinito', 'repetición cuya condición nunca llega a ser falsa', ['Olvidaste escribir «i++».', 'La pestaña del navegador se congela.', 'Un «while (true)» nunca encuentra un «break».']]
  ],
  q: [
    ['¿Cuántas veces imprime?\nfor (let i = 0; i < 3; i++)\n  for (let j = 0; j < 4; j++)\n    console.log(i, j);', '12', ['7', '3', '4'], '3 × 4 vueltas; anidar multiplica.', 3],
    ['¿Por qué falla?\nlet s = 0;\nfor (let i = 1; i <= 3; i++) { let s = 0; s += i; }\nconsole.log(s);', 'El s interno es otra variable y el exterior queda en 0', ['El for no admite let', 'Falta punto y coma', 'i debe empezar en 0'], 'El let interno crea una variable nueva que oculta a la externa.', 4],
    ['Mantienes "máx es el mayor de los elementos vistos". ¿Con qué valor inicial es seguro?', 'El primer elemento de la lista', ['0', '1', '-1'], 'Con 0 falla si todos los valores son negativos.', 3],
    { c: 'Escribe «sumaHasta(n)» que sume 1 + 2 + ... + n usando un bucle.', f: 'sumaHasta', p: ['n'], t: [[[1], 1], [[3], 6], [[100], 5050], [[0], 0]], sol: '  let s = 0;\n  for (let i = 1; i <= n; i++) s += i;\n  return s;', l: 2 },
    { c: 'Escribe «factorial(n)» de forma iterativa.', f: 'factorial', p: ['n'], t: [[[0], 1], [[1], 1], [[5], 120], [[10], 3628800]], sol: '  let r = 1;\n  for (let i = 2; i <= n; i++) r *= i;\n  return r;', l: 2 },
    { c: 'Escribe «esPrimo(n)». Revisa divisores solo hasta la raíz cuadrada de n.', f: 'esPrimo', p: ['n'], t: [[[1], false], [[2], true], [[9], false], [[97], true], [[100], false]], sol: '  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;\n  return true;', l: 3 },
    { c: 'Escribe «mcd(a, b)» con el algoritmo de Euclides.', f: 'mcd', p: ['a', 'b'], t: [[[12, 18], 6], [[17, 5], 1], [[100, 75], 25]], sol: '  while (b !== 0) { [a, b] = [b, a % b]; }\n  return a;', h: 'mcd(a,b) = mcd(b, a % b).', l: 3 },
    { c: 'Escribe «collatz(n)» que devuelva cuántos pasos tarda n en llegar a 1: si es par se divide entre 2; si es impar, 3n + 1.', f: 'collatz', p: ['n'], t: [[[1], 0], [[6], 8], [[27], 111]], sol: '  let p = 0;\n  while (n !== 1) { n = n % 2 === 0 ? n / 2 : 3 * n + 1; p++; }\n  return p;', l: 4 },
    { c: 'Escribe «fibonacci(n)» iterativo, con fibonacci(0) = 0 y fibonacci(1) = 1.', f: 'fibonacci', p: ['n'], t: [[[0], 0], [[1], 1], [[10], 55], [[50], 12586269025]], sol: '  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) [a, b] = [b, a + b];\n  return a;', l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var n = R.int(3, 9); g.trace(1, 'let s = 0;\nfor (let i = 1; i <= ' + n + '; i++) {\n  s += i;\n}\nconsole.log(s);', 'Suma 1 hasta ' + n + '.'); });
    g.times(8, function (R) { var a = R.int(0, 3), b = R.int(4, 8), st = R.int(1, 3); g.trace(1, 'for (let i = ' + a + '; i < ' + b + '; i += ' + st + ') {\n  console.log(i);\n}', 'Empieza en ' + a + ', suma ' + st + ' y se detiene antes de ' + b + '.'); });
    g.times(8, function (R) { var n = R.int(10, 200); g.trace(2, 'let n = ' + n + ', p = 0;\nwhile (n > 1) {\n  n = Math.floor(n / 2);\n  p++;\n}\nconsole.log(p);', 'Cuenta cuántas veces se divide entre 2: es el logaritmo en base 2 aproximado.'); });
    g.times(8, function (R) { var a = R.int(2, 5), b = R.int(2, 5); g.trace(2, 'let c = 0;\nfor (let i = 0; i < ' + a + '; i++) {\n  for (let j = 0; j < ' + b + '; j++) {\n    c++;\n  }\n}\nconsole.log(c);', a + ' × ' + b + ' vueltas.'); });
    g.times(8, function (R) { var l = R.sample([3, 7, 12, 5, 9, 14, 2, 8], 5); g.trace(3, 'const l = [' + l + '];\nlet m = l[0];\nfor (const x of l) {\n  if (x < m) m = x;\n}\nconsole.log(m);', 'Busca el mínimo recordando el menor visto.'); });
    g.times(6, function (R) { var k = R.int(3, 7); g.trace(3, 'let c = 0;\nfor (let i = 1; i <= 30; i++) {\n  if (i % ' + k + ' === 0) continue;\n  c++;\n}\nconsole.log(c);', 'Cuenta del 1 al 30 sin los múltiplos de ' + k + '.'); });
  } });

S('m3', 'm3.func', { title: 'Funciones y alcance',
  ask: '¿Qué concepto sobre funciones aparece?',
  lesson: `
> **La idea en simple.** Una función es una máquina con entrada y salida. Metes ingredientes (parámetros), algo pasa dentro y sale un resultado. No necesitas saber cómo funciona por dentro una licuadora para usarla: eso es **abstracción**.

~~~js
function costoPatio(dias, tarifa = 20) {
  return dias * tarifa;
}
console.log(costoPatio(3));
console.log(costoPatio(3, 30));

// Función flecha: forma corta
const doble = x => x * 2;
console.log(doble(21));

// Las funciones son valores: se pueden pasar
function aplicar(f, x) { return f(x); }
console.log(aplicar(doble, 8));
~~~

## Alcance (scope)
Una variable existe dentro del bloque donde se declaró. Las funciones ven las variables externas, pero el exterior no ve las internas.

## La pila de llamadas
Cada llamada crea un marco en una **pila** con sus parámetros y variables. Al terminar, se retira y vuelve a donde estaba. Si llamas sin fin, se llena: «stack overflow».
:::flow main() | costoTotal() | costoPatio() | vuelve con el resultado

## Cierres (closures)
Una función recuerda las variables del lugar donde nació, incluso después de que ese lugar terminó.
~~~js
function crearContador() {
  let n = 0;
  return () => ++n;
}
const c = crearContador();
console.log(c(), c(), c());
~~~

## Puntos que no debes omitir
- Una función debe hacer **una sola cosa** y su nombre debe decir cuál.
- **Parámetro** es la variable en la definición; **argumento** es el valor al llamarla.
- Una **función pura** no toca nada fuera de sí: más fácil de probar y razonar.
- Si copias y pegas código, probablemente falta una función (principio DRY).

! Error común: olvidar el «return». Sin él, la función devuelve undefined.`,
  links: [['m3.rec', 'una función puede llamarse a sí misma'], ['m4.stack', 'la pila de llamadas es la estructura de datos pila'], ['m6.clean', 'las reglas del código limpio empiezan con funciones pequeñas'], ['m6.func', 'funciones puras y de orden superior son la base del paradigma funcional']],
  read: 'Abelson y Sussman, *SICP*, capítulo 1; Martin, *Clean Code*, capítulo 3.',
  terms: [
    ['Parámetro', 'variable declarada en la definición de una función', ['En «function f(x)», x cumple este papel.', 'Se le puede dar valor por defecto.', 'Recibe el dato al momento de la llamada.']],
    ['Argumento', 'valor concreto que se entrega al llamar a una función', ['En «f(5)», el 5 es esto.', 'Se pasó una cantidad menor a la esperada y lo demás quedó undefined.', 'Una función recibe «"ABC-123"» al llamarla.']],
    ['Alcance', 'parte del programa donde una variable es accesible', ['Una variable declarada en un if no existe fuera.', 'Provoca «ReferenceError: x is not defined» si la usas fuera de su bloque.', 'Una variable interna puede ocultar a otra externa con igual nombre.']],
    ['Cierre', 'función que recuerda las variables del entorno donde fue creada', ['Un contador conserva su valor entre llamadas sin variable global.', 'Una función devuelta sigue accediendo a variables de la que ya terminó.', 'Se crea un dato privado sin usar clases.']],
    ['Función pura', 'función cuyo resultado solo depende de sus entradas y no tiene efectos externos', ['«suma(a,b)» siempre devuelve lo mismo con iguales datos.', 'Su prueba no requiere preparar base de datos.', 'Se pueden guardar sus resultados en caché sin riesgo.']],
    ['Efecto secundario', 'cambio observable fuera de la función, además de devolver un valor', ['Una función modifica una variable global.', 'Calcular el total también manda un correo.', 'Escribir en disco dentro de una función de cálculo.']],
    ['Pila de llamadas', 'estructura que guarda qué funciones están activas y a dónde regresar', ['Un stack trace muestra cada función activa.', 'Una recursión sin fin da «Maximum call stack size exceeded».', 'El depurador te deja subir de marco para ver quién llamó.']]
  ],
  q: [
    ['¿Qué devuelve «function f(x) { x * 2; }» al llamar f(4)?', 'undefined', ['8', '4', '0'], 'Falta return.', 2],
    ['¿Cuál función es pura?', 'const f = (a, b) => a + b;', ['let t = 0; const f = a => (t += a);', 'const f = a => { console.log(a); return a; };', 'const f = () => Date.now();'], 'Las otras alteran estado, imprimen o dependen del reloj.', 3],
    ['¿Por qué en este código el cierre imprime 0 1 2?\nfor (let i = 0; i < 3; i++) fns.push(() => i);', 'Porque let crea una i nueva en cada vuelta', ['Porque i es global', 'Porque las flechas copian el valor al compilar', 'Porque push clona la función'], 'Con var, las tres funciones verían la misma i final: 3.', 4],
    ['¿Qué beneficio principal tiene separar «calcularTotal» de «mostrarTotal»?', 'Se puede probar y reutilizar el cálculo sin la interfaz', ['Corre más rápido siempre', 'Evita usar variables', 'Es obligatorio en JavaScript'], 'Es la separación de responsabilidades en su forma más simple.', 4],
    { c: 'Escribe «crearSumador(n)» que devuelva una función que sume n a su argumento. Como las pruebas solo admiten datos simples, escribe «sumar5(x)» usando dentro un cierre creado con una función auxiliar.', f: 'sumar5', p: ['x'], t: [[[1], 6], [[-5], 0], [[10], 15]], sol: '  const crear = n => y => y + n;\n  return crear(5)(x);', l: 3 },
    { c: 'Escribe «aplicarN(x, n)» que duplique x n veces usando una función interna «doble».', f: 'aplicarN', p: ['x', 'n'], t: [[[1, 3], 8], [[5, 0], 5], [[3, 2], 12]], sol: '  const doble = v => v * 2;\n  for (let i = 0; i < n; i++) x = doble(x);\n  return x;', l: 2 },
    { c: 'Escribe «redondearPrecio(precio, dec)» con dec opcional (por defecto 2).', f: 'redondearPrecio', p: ['precio', 'dec = 2'], t: [[[3.14159], 3.14], [[3.14159, 3], 3.142], [[2.5, 0], 3]], sol: '  const f = 10 ** dec;\n  return Math.round(precio * f) / f;', l: 3 },
    { c: 'Escribe «componer(x)» que aplique primero «sumar1» y luego «doble», definiéndolas como funciones y creando una función genérica «comp(f, g)» que las una.', f: 'componer', p: ['x'], t: [[[1], 4], [[0], 2], [[4], 10]], sol: '  const comp = (f, g) => v => g(f(v));\n  return comp(v => v + 1, v => v * 2)(x);', l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9); g.trace(1, 'function f(a, b) {\n  return a * b + 1;\n}\nconsole.log(f(' + a + ', ' + b + '));', a + ' × ' + b + ' + 1.'); });
    g.times(8, function (R) { var a = R.int(1, 9), d = R.int(2, 5); g.trace(1, 'function f(a, b = ' + d + ') {\n  return a + b;\n}\nconsole.log(f(' + a + '));', 'b toma su valor por defecto.'); });
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(10, 19); g.trace(2, 'let x = ' + a + ';\nfunction f() {\n  let x = ' + b + ';\n  return x;\n}\nf();\nconsole.log(x);', 'La x interna es otra variable; la externa no cambia.'); });
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(1, 9); g.trace(2, 'let x = ' + a + ';\nfunction f() {\n  x = x + ' + b + ';\n}\nf();\nf();\nconsole.log(x);', 'Sin declarar otra variable, f modifica la externa: es un efecto secundario.'); });
    g.times(8, function (R) { var s = R.int(0, 5), n = R.int(2, 4); var calls = []; for (var i = 0; i < n; i++) calls.push('c()'); g.trace(3, 'function crear(i) {\n  let n = i;\n  return () => ++n;\n}\nconst c = crear(' + s + ');\nconsole.log(' + calls.join(', ') + ');', 'El cierre conserva n entre llamadas.'); });
    g.times(6, function (R) { var a = R.int(1, 5); g.trace(3, 'const sumar = a => b => a + b;\nconst f = sumar(' + a + ');\nconsole.log(f(1), f(10));', 'sumar(' + a + ') devuelve una función que recuerda a.'); });
  } });

S('m3', 'm3.arr', { title: 'Listas, objetos y textos',
  ask: '¿Qué estructura u operación corresponde?',
  lesson: `
> **La idea en simple.** Un arreglo es una fila numerada de estacionamientos: buscas por número. Un objeto es una ficha con campos: buscas por nombre del campo. Casi todo dato del mundo real es una combinación de los dos.

~~~js
const vehiculos = [
  { placa: "ABC-123", km: 12000, revisado: true },
  { placa: "XYZ-987", km: 90000, revisado: false },
  { placa: "LMN-456", km: 45000, revisado: true }
];
console.log(vehiculos[0].placa);
console.log(vehiculos.length);

// filter, map y reduce: las tres herramientas clave
const listos = vehiculos.filter(v => v.revisado);
const placas = listos.map(v => v.placa);
const totalKm = vehiculos.reduce((s, v) => s + v.km, 0);
console.log(placas, totalKm);
~~~

## Referencias: un punto que todos tropiezan
Un objeto no se copia al asignar; dos variables apuntan al **mismo**.
~~~js
const a = { km: 1 };
const b = a;
b.km = 99;
console.log(a.km);        // también cambió
const c = { ...a };       // copia superficial
c.km = 5;
console.log(a.km, c.km);
~~~

## Textos
Un string es una secuencia de caracteres inmutable: los métodos devuelven otro texto.
~~~js
const p = " abc-123 ";
console.log(p.trim().toUpperCase());
console.log("A,B,C".split(","));
console.log(["A","B"].join("-"));
~~~

## Puntos que no debes omitir
- Los índices empiezan en 0. El último es «length - 1».
- «push/pop» trabajan al final y son rápidos; «shift/unshift» al inicio y recorren todo.
- «sort()» sin función ordena como texto: «[10, 9]» queda igual. Usa «sort((a,b) => a-b)».
- JSON es el formato de texto para intercambiar estas estructuras.

! Error común: comparar objetos con «===». Compara referencias, no contenido: «{} === {}» es falso.`,
  links: [['m4.bigo', 'el costo de cada operación de lista depende de cómo está en memoria'], ['m4.hash', 'un objeto funciona internamente como una tabla hash'], ['m9.http', 'JSON es lo que viaja entre tu navegador y el servidor'], ['m6.func', 'map, filter y reduce son programación funcional en acción']],
  read: 'Haverbeke, *Eloquent JavaScript*, capítulo 4.',
  terms: [
    ['Arreglo', 'colección ordenada de valores a los que se accede por índice', ['Accedes al tercero con «lista[2]».', 'Se guarda la fila de autos en orden de llegada.', 'Su longitud se consulta con «.length».']],
    ['Objeto', 'colección de pares clave y valor', ['Una ficha con placa, km y color.', 'Accedes con «v.placa».', 'Un JSON con campos con nombre.']],
    ['Map (transformación)', 'operación que crea una lista nueva aplicando una función a cada elemento', ['Convertir cada vehículo en su placa.', 'Todos los precios se pasan a dólares en otra lista.', 'La lista resultante tiene el mismo tamaño que la original.']],
    ['Filter', 'operación que crea una lista solo con los elementos que cumplen una condición', ['Quedarse con los autos revisados.', 'La lista resultante suele ser más corta.', 'Se quitan los valores nulos.']],
    ['Reduce', 'operación que combina toda una lista en un solo resultado', ['Sumar todos los kilometrajes.', 'Agrupar elementos en un objeto contador.', 'Se le pasa un acumulador inicial.']],
    ['Referencia', 'dirección que apunta a un objeto en memoria, no a una copia suya', ['Dos variables ven el mismo cambio.', 'Una función modifica el arreglo que le pasaste.', '«{a:1} === {a:1}» da falso.']],
    ['JSON', 'formato de texto para intercambiar datos estructurados', ['Una API responde con «{"placa":"ABC"}».', 'Se transforma con «JSON.parse» y «JSON.stringify».', 'Sus claves deben ir con comillas dobles.']]
  ],
  q: [
    ['¿Qué devuelve [10, 9, 1].sort()?', '[1, 10, 9]', ['[1, 9, 10]', '[10, 9, 1]', '[9, 10, 1]'], 'Sin función compara como texto, y "10" va antes que "9".', 3],
    ['Una función recibe una lista y la ordena con .sort(). ¿Qué problema puede causar?', 'Modifica la lista original del que la llamó', ['Crea siempre una copia', 'Borra los datos', 'Solo funciona con números'], 'sort muta en sitio; conviene copiar con [...lista].', 4],
    ['¿Cuál forma copia también los objetos internos?', 'structuredClone(a)', ['{...a}', 'const b = a', 'Object.assign({}, a)'], 'Las otras copias son superficiales o solo copian la referencia.', 4],
    { c: 'Escribe «soloRevisados(lista)» que devuelva las placas de los vehículos con revisado = true.', f: 'soloRevisados', p: ['lista'], t: [[[[{ placa: 'A', revisado: true }, { placa: 'B', revisado: false }]], ['A']], [[[]], []]], sol: '  return lista.filter(v => v.revisado).map(v => v.placa);', l: 2 },
    { c: 'Escribe «sumaKm(lista)» que sume los km de todos los vehículos.', f: 'sumaKm', p: ['lista'], t: [[[[{ km: 1 }, { km: 2 }]], 3], [[[]], 0]], sol: '  return lista.reduce((s, v) => s + v.km, 0);', l: 2 },
    { c: 'Escribe «mayor(lista)» que devuelva el mayor número de una lista no vacía, sin usar Math.max.', f: 'mayor', p: ['lista'], t: [[[[1, 5, 3]], 5], [[[-1, -5]], -1], [[[7]], 7]], sol: '  let m = lista[0];\n  for (const x of lista) if (x > m) m = x;\n  return m;', l: 2 },
    { c: 'Escribe «invertir(s)» que devuelva el texto al revés.', f: 'invertir', p: ['s'], t: [[['abc'], 'cba'], [[''], ''], [['ana'], 'ana']], sol: "  return s.split('').reverse().join('');", l: 2 },
    { c: 'Escribe «esPalindromo(s)» ignorando espacios y mayúsculas.', f: 'esPalindromo', p: ['s'], t: [[['Anita lava la tina'], true], [['hola'], false], [[''], true]], sol: "  const t = s.toLowerCase().replace(/\\s/g, '');\n  return t === t.split('').reverse().join('');", l: 3 },
    { c: 'Escribe «contarPorEstado(lista)» que reciba vehículos con campo estado y devuelva un objeto con la cantidad de cada estado.', f: 'contarPorEstado', p: ['lista'], t: [[[[{ estado: 'a' }, { estado: 'b' }, { estado: 'a' }]], { a: 2, b: 1 }], [[[]], {}]], sol: '  const r = {};\n  for (const v of lista) r[v.estado] = (r[v.estado] || 0) + 1;\n  return r;', l: 3 },
    { c: 'Escribe «validarPlaca(p)»: true si son 3 letras mayúsculas, guion y 3 dígitos.', f: 'validarPlaca', p: ['p'], t: [[['ABC-123'], true], [['abc-123'], false], [['AB-123'], false], [['ABC123'], false]], sol: '  return /^[A-Z]{3}-\\d{3}$/.test(p);', h: 'Una expresión regular resuelve esto en una línea.', l: 3 },
    { c: 'Escribe «agruparPor(lista, campo)» que devuelva un objeto donde cada clave es un valor del campo y su valor es la lista de elementos.', f: 'agruparPor', p: ['lista', 'campo'], t: [[[[{ c: 'r', n: 1 }, { c: 'a', n: 2 }, { c: 'r', n: 3 }], 'c'], { r: [{ c: 'r', n: 1 }, { c: 'r', n: 3 }], a: [{ c: 'a', n: 2 }] }]], sol: '  const r = {};\n  for (const x of lista) (r[x[campo]] = r[x[campo]] || []).push(x);\n  return r;', l: 4 },
    { c: 'Escribe «sinDuplicados(lista)» que conserve el primer aparecimiento de cada valor en orden.', f: 'sinDuplicados', p: ['lista'], t: [[[[1, 2, 1, 3, 2]], [1, 2, 3]], [[[]], []]], sol: '  return [...new Set(lista)];', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var l = R.sample([2, 4, 6, 8, 10, 12, 3, 5], 4), i = R.int(0, 3); g.trace(1, 'const l = [' + l + '];\nconsole.log(l[' + i + ']);', 'Los índices empiezan en 0.'); });
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4), k = R.int(2, 3); g.trace(2, 'const l = [' + l + '];\nconsole.log(l.map(x => x * ' + k + ').join(" "));', 'map transforma cada elemento.'); });
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 5), k = R.int(3, 6); g.trace(2, 'const l = [' + l + '];\nconsole.log(l.filter(x => x > ' + k + ').length);', 'Cuenta los mayores a ' + k + '.'); });
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 4); g.trace(2, 'const l = [' + l + '];\nconsole.log(l.reduce((a, b) => a + b, 0));', 'reduce acumula la suma.'); });
    g.times(6, function (R) { var a = R.int(1, 9), b = R.int(10, 20); g.trace(3, 'const a = { v: ' + a + ' };\nconst b = a;\nb.v = ' + b + ';\nconsole.log(a.v);', 'a y b apuntan al mismo objeto.'); });
    g.times(5, function (R) { var a = R.int(1, 9), b = R.int(10, 20); g.trace(3, 'const a = { v: ' + a + ' };\nconst b = { ...a };\nb.v = ' + b + ';\nconsole.log(a.v);', 'La copia es otro objeto.'); });
  } });

S('m3', 'm3.rec', { title: 'Recursión',
  ask: '¿Qué concepto de recursión se ve?',
  lesson: `
> **La idea en simple.** Estás en una fila larga y quieres saber en qué puesto vas. Le preguntas a quien está delante; él le pregunta al de delante, y así. El primero responde "1". Cada uno suma 1 y lo devuelve. Nadie conoció toda la fila, pero la respuesta llega.

## Las dos partes obligatorias
- **Caso base:** cuándo parar, sin más llamadas.
- **Caso recursivo:** resolver un problema más pequeño y acercarse a la base.
~~~js
function factorial(n) {
  if (n <= 1) return 1;            // caso base
  return n * factorial(n - 1);     // caso recursivo
}
console.log(factorial(5));

function sumaLista(l) {
  if (l.length === 0) return 0;
  return l[0] + sumaLista(l.slice(1));
}
console.log(sumaLista([1, 2, 3, 4]));
~~~

## Qué pasa en memoria
Cada llamada espera a la siguiente en la **pila**.
~~~txt
factorial(3)
  3 * factorial(2)
        2 * factorial(1)
              1
        2 * 1 = 2
  3 * 2 = 6
~~~

## Cuándo usarla
Brilla con datos que se contienen a sí mismos: árboles, carpetas, JSON, divide y vencerás. Para un simple recorrido de lista, un bucle es más directo y gasta menos memoria.

## Memoización
Fibonacci recursivo repite miles de cálculos. Guardarlos convierte un costo exponencial en lineal: es la puerta a la programación dinámica.
~~~js
const memo = {};
function fib(n) {
  if (n < 2) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fib(n - 1) + fib(n - 2);
}
console.log(fib(50));
~~~

## Puntos que no debes omitir
- Toda llamada debe acercarse al caso base, o tendrás «stack overflow».
- Confía en la recursión: asume que la llamada interna funciona y solo combina.
- La corrección de una función recursiva se prueba con inducción.

! Error común: olvidar el caso base o no reducir el problema.`,
  links: [['m2.prop', 'la inducción es la prueba matemática de la recursión'], ['m4.stack', 'la recursión usa la pila; también se puede convertir en iterativa con una pila explícita'], ['m4.trees', 'los árboles se recorren naturalmente así'], ['m4.dp', 'memoizar es el primer paso de la programación dinámica']],
  read: 'Abelson y Sussman, *SICP*, sección 1.2.',
  terms: [
    ['Caso base', 'condición en que la función responde sin volver a llamarse', ['«if (n === 0) return 1».', 'Sin esto obtienes «Maximum call stack size exceeded».', 'Una carpeta vacía detiene el recorrido.']],
    ['Caso recursivo', 'parte que resuelve el problema llamándose con una entrada más pequeña', ['«return n * f(n - 1)».', 'Se llama con una sublista.', 'Se procesa cada subcarpeta invocando la misma función.']],
    ['Desbordamiento de pila', 'error por agotar la memoria reservada para llamadas activas', ['Una recursión sin caso base rompe el programa.', 'Recorres 1 000 000 niveles y el proceso aborta.', 'Un nombre de sitio famoso para programadores viene de este error.']],
    ['Memoización', 'guardar resultados de llamadas para no recalcularlos', ['Fibonacci(50) pasa de horas a instantes.', 'Un objeto guarda las respuestas ya calculadas.', 'Funciona bien porque la función es pura.']],
    ['Divide y vencerás', 'técnica que parte el problema, resuelve las partes y combina', ['Merge sort parte la lista en dos.', 'La búsqueda binaria descarta la mitad.', 'Un archivo enorme se procesa por trozos y se unen los resultados.']],
    ['Recursión de cola', 'llamada recursiva que es lo último que hace la función', ['«return f(n - 1, acc * n)» no tiene trabajo pendiente.', 'Algunos compiladores la convierten en un bucle.', 'Un parámetro acumulador evita multiplicar después de volver.']],
    ['Árbol de llamadas', 'diagrama de todas las invocaciones que produce una función recursiva', ['Fib(5) se dibuja para ver repeticiones.', 'Su altura indica cuánta pila se usa.', 'Su número de nodos indica el tiempo total.']]
  ],
  q: [
    ['¿Cuántas llamadas hace f(4)?\nfunction f(n) { if (n === 0) return 0; return f(n - 1); }', '5', ['4', '1', '16'], 'f(4), f(3), f(2), f(1) y f(0).', 3],
    ['¿Por qué fib recursivo sin memoria es tan lento?', 'Recalcula los mismos valores una y otra vez, con costo exponencial', ['Las funciones son lentas', 'La suma es lenta', 'Usa demasiados números negativos'], 'El árbol de llamadas crece casi el doble en cada nivel.', 3],
    ['¿Cuándo preferir un bucle a la recursión?', 'En un recorrido lineal muy largo que podría agotar la pila', ['Cuando el dato es un árbol', 'Cuando hay subcarpetas', 'Cuando el problema se divide en dos'], 'En JavaScript no se garantiza optimización de cola.', 4],
    { c: 'Escribe «potencia(b, e)» recursivamente con e ≥ 0.', f: 'potencia', p: ['b', 'e'], t: [[[2, 0], 1], [[2, 10], 1024], [[3, 3], 27]], sol: '  return e === 0 ? 1 : b * potencia(b, e - 1);', l: 2 },
    { c: 'Escribe «sumaDigitos(n)» recursivamente con n ≥ 0.', f: 'sumaDigitos', p: ['n'], t: [[[0], 0], [[123], 6], [[999], 27]], sol: '  return n < 10 ? n : n % 10 + sumaDigitos(Math.floor(n / 10));', l: 3 },
    { c: 'Escribe «aplanar(lista)» que convierta listas anidadas a cualquier profundidad en una sola lista.', f: 'aplanar', p: ['lista'], t: [[[[1, [2, [3, [4]]]]], [1, 2, 3, 4]], [[[]], []], [[[[], [1]]], [1]]], sol: '  let r = [];\n  for (const x of lista) r = r.concat(Array.isArray(x) ? aplanar(x) : [x]);\n  return r;', l: 3 },
    { c: 'Escribe «fibMemo(n)» recursivo y memoizado con una variable interna por parámetro por defecto.', f: 'fibMemo', p: ['n', 'm = {}'], t: [[[10], 55], [[60], 1548008755920]], sol: '  if (n < 2) return n;\n  if (m[n]) return m[n];\n  return m[n] = fibMemo(n - 1, m) + fibMemo(n - 2, m);', l: 3 },
    { c: 'Escribe «torresHanoi(n)» que devuelva el número de movimientos para n discos.', f: 'torresHanoi', p: ['n'], t: [[[1], 1], [[3], 7], [[10], 1023]], sol: '  return n === 0 ? 0 : 2 * torresHanoi(n - 1) + 1;', h: 'Mueve n−1, mueve el grande y vuelve a mover n−1.', l: 4 },
    { c: 'Escribe «permutaciones(s)» que devuelva todas las permutaciones de un texto sin letras repetidas, ordenadas alfabéticamente.', f: 'permutaciones', p: ['s'], t: [[['ab'], ['ab', 'ba']], [['abc'], ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']], [[''], ['']]], sol: "  if (s.length <= 1) return [s];\n  const r = [];\n  for (let i = 0; i < s.length; i++) for (const p of permutaciones(s.slice(0, i) + s.slice(i + 1))) r.push(s[i] + p);\n  return r.sort();", l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(2, 7); g.trace(2, 'function f(n) {\n  if (n <= 1) return 1;\n  return n * f(n - 1);\n}\nconsole.log(f(' + n + '));', 'Factorial de ' + n + '.'); });
    g.times(8, function (R) { var n = R.int(2, 9); g.trace(2, 'function s(n) {\n  if (n === 0) return 0;\n  return n + s(n - 1);\n}\nconsole.log(s(' + n + '));', 'Suma de 1 a ' + n + '.'); });
    g.times(6, function (R) { var n = R.int(2, 12); g.trace(3, 'function fib(n) {\n  return n < 2 ? n : fib(n - 1) + fib(n - 2);\n}\nconsole.log(fib(' + n + '));', 'Fibonacci de ' + n + '.'); });
    g.times(6, function (R) { var n = R.int(1, 5); g.trace(3, 'function f(n) {\n  if (n === 0) return;\n  console.log(n);\n  f(n - 1);\n}\nf(' + n + ');', 'Imprime antes de la llamada: en orden descendente.'); });
    g.times(5, function (R) { var n = R.int(2, 5); g.trace(4, 'function f(n) {\n  if (n === 0) return;\n  f(n - 1);\n  console.log(n);\n}\nf(' + n + ');', 'Imprime al volver: el orden se invierte y queda ascendente.'); });
  } });
})();
