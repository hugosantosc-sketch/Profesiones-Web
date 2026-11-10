(function () {
var M = SDC.M, S = SDC.S;
M('m1', { title: 'Cómo funciona una computadora', desc: 'Todo programa termina siendo electricidad que representa unos y ceros. Aquí ves cómo de ese detalle tan simple sale todo lo demás.',
  thread: 'Cada vehículo de PatioApp será, al final, bytes en memoria: la placa como texto ASCII, el kilometraje como entero y el precio como número de punto flotante (ya verás por qué eso es peligroso).',
  books: '*Code* (Petzold), *Computer Systems: A Programmer\'s Perspective* (Bryant y O\'Hallaron), *The Elements of Computing Systems* (Nisan y Schocken).',
  uni: 'Arquitectura de Computadoras (UPC), Introducción a las TIC (UTP), Computing Foundations de SWEBOK v4.' });

S('m1', 'm1.bin', { title: 'Sistema binario y otras bases',
  lesson: `
> **La idea en simple.** Imagina ocho focos en fila. Cada uno está prendido o apagado, y cada foco vale el doble que el de su derecha: 128, 64, 32, 16, 8, 4, 2 y 1. Para saber qué número representan, sumas los valores de los focos prendidos.

## Por qué binario
Un transistor es un interruptor: deja pasar corriente o no. Distinguir dos estados es muy confiable aunque el voltaje varíe un poco; distinguir diez sería frágil. Por eso las computadoras cuentan en base 2. A cada dígito binario se le llama **bit** y a un grupo de 8 bits, **byte**.

:::w bits

## Cómo se lee cualquier base
Todas las bases funcionan igual que el decimal: cada posición vale la base elevada a la posición, contando desde 0 por la derecha.
~~~txt
Decimal 305 = 3×100 + 0×10 + 5×1
Binario 1011 = 1×8 + 0×4 + 1×2 + 1×1 = 11
Hexa    2F  = 2×16 + 15×1 = 47
~~~

## De decimal a binario
Divide entre 2 y guarda los residuos; luego léelos de abajo hacia arriba.
~~~txt
13 ÷ 2 = 6 residuo 1
 6 ÷ 2 = 3 residuo 0
 3 ÷ 2 = 1 residuo 1
 1 ÷ 2 = 0 residuo 1     → 1101
~~~

## Hexadecimal: el binario abreviado
Un dígito hexadecimal (0-9, A-F) equivale exactamente a 4 bits. Por eso «1111 1010» se escribe «FA». Lo verás en colores web (#FF0000), direcciones de memoria y direcciones MAC.

~~~js
// Prueba cambiar los números
console.log((13).toString(2));     // decimal a binario
console.log(parseInt("1101", 2));  // binario a decimal
console.log((250).toString(16));   // decimal a hexadecimal
~~~

## Puntos que no debes omitir
- Con **n bits** hay 2^n combinaciones. Con 8 bits: 256 valores, de 0 a 255.
- 1 KB se usa como 1000 bytes (o 1024 en KiB). Por eso un disco "de 1 TB" parece más pequeño en Windows.
- Cada bit adicional duplica la capacidad: este mismo crecimiento reaparece en la búsqueda binaria.

! Error común: leer el número binario de izquierda a derecha asignando 1, 2, 4... El bit de la derecha es el que vale 1.`,
  links: [['m1.data', 'con bits ya puedes representar negativos, letras y decimales'], ['m4.search', 'la búsqueda binaria usa la misma idea de duplicar y dividir entre 2']],
  read: 'Petzold, *Code*, capítulos sobre sistemas numéricos.',
  q: [
    ['¿Cuántos valores distintos caben en 10 bits?', '1024', ['1000', '512', '2048'], '2^10 = 1024.', 2],
    ['¿Por qué se usa hexadecimal en vez de binario para mostrar bytes?', 'Porque cada dígito resume exactamente 4 bits y se lee más fácil', ['Porque la CPU trabaja en base 16', 'Porque ocupa menos memoria real', 'Porque el binario no sirve para números grandes'], 'La CPU sigue en binario; el hexadecimal es una notación para humanos.', 2],
    ['Una imagen en blanco y negro usa 1 bit por píxel. ¿Cuántos bytes ocupa una de 800×600 sin comprimir?', '60000', ['480000', '6000', '48000'], '800×600 = 480 000 bits; entre 8 = 60 000 bytes.', 4],
    ['Un sistema guardaba IDs en 16 bits sin signo. ¿Cuál es el primer ID que ya no cabe?', '65536', ['65535', '32768', '16384'], 'Con 16 bits el máximo es 2^16 − 1 = 65535; el siguiente ya no cabe.', 4],
    { c: 'Escribe «aBinario(n)» que devuelva como texto la representación binaria de un entero n ≥ 0 sin usar toString(2).', f: 'aBinario', p: ['n'], t: [[[0], '0'], [[1], '1'], [[13], '1101'], [[255], '11111111'], [[1024], '10000000000']], sol: "  if (n === 0) return '0';\n  let s = '';\n  while (n > 0) { s = (n % 2) + s; n = Math.floor(n / 2); }\n  return s;", h: 'Usa el método de los residuos: n % 2 te da el último dígito.', l: 4 },
    { c: 'Escribe «deBinario(s)» que reciba un texto binario y devuelva su valor decimal sin usar parseInt.', f: 'deBinario', p: ['s'], t: [[['0'], 0], [['1'], 1], [['1101'], 13], [['11111111'], 255]], sol: '  let v = 0;\n  for (const c of s) v = v * 2 + Number(c);\n  return v;', h: 'Cada dígito nuevo multiplica por 2 lo acumulado.', l: 3 },
    { c: 'Escribe «contarUnos(n)» que devuelva cuántos bits en 1 tiene el entero n ≥ 0.', f: 'contarUnos', p: ['n'], t: [[[0], 0], [[7], 3], [[8], 1], [[255], 8], [[1023], 10]], sol: '  let c = 0;\n  while (n > 0) { c += n % 2; n = Math.floor(n / 2); }\n  return c;', l: 4 }
  ],
  gen: function (g) {
    g.times(16, function (R) { var n = R.int(2, 31); g.input(1, 'Convierte ' + n + ' de decimal a binario.', n.toString(2), n + ' = ' + n.toString(2) + ' porque al dividir entre 2 y leer los residuos de abajo hacia arriba sale ese número.'); });
    g.times(16, function (R) { var n = R.int(2, 31), b = n.toString(2); g.input(1, 'Convierte el binario ' + b + ' a decimal.', n, 'Suma los valores de las posiciones con 1: da ' + n + '.'); });
    g.times(12, function (R) { var n = R.int(32, 255); g.input(2, 'Convierte ' + n + ' de decimal a binario.', n.toString(2), n + ' en binario es ' + n.toString(2) + '.'); });
    g.times(10, function (R) { var n = R.int(16, 255); g.input(2, 'Convierte ' + n + ' de decimal a hexadecimal.', n.toString(16), n + ' = ' + Math.floor(n / 16) + '×16 + ' + (n % 16) + ', o sea ' + n.toString(16).toUpperCase() + '.'); });
    g.times(10, function (R) { var n = R.int(16, 255), hx = n.toString(16).toUpperCase(); g.input(3, 'Convierte el hexadecimal ' + hx + ' a binario de 8 bits.', n.toString(2).padStart(8, '0'), 'Cada dígito hexadecimal son 4 bits: ' + hx + ' = ' + n.toString(2).padStart(8, '0') + '.'); });
    g.times(8, function (R) { var a = R.int(1, 15), b = R.int(1, 15); g.input(3, 'Suma en binario y responde en binario: ' + a.toString(2) + ' + ' + b.toString(2), (a + b).toString(2), a + ' + ' + b + ' = ' + (a + b) + ', que en binario es ' + (a + b).toString(2) + '.'); });
    g.times(6, function (R) { var bits = R.int(3, 16); g.input(2, '¿Cuál es el mayor número sin signo que cabe en ' + bits + ' bits?', Math.pow(2, bits) - 1, '2^' + bits + ' − 1 = ' + (Math.pow(2, bits) - 1) + '.'); });
  } });

S('m1', 'm1.data', { title: 'Cómo se representan los datos',
  ask: '¿Qué representación o concepto explica esta situación?',
  lesson: `
> **La idea en simple.** Los bits no significan nada por sí solos. Son como las letras de un código: «01000001» puede ser el número 65 o la letra A. Lo que da significado es **cómo acordamos leerlos**.

## Enteros negativos: complemento a dos
Para representar negativos no se usa "un bit de signo" simple, sino el complemento a dos: inviertes todos los bits y sumas 1.
~~~txt
 5 en 8 bits:  0000 0101
 Invertir:     1111 1010
 Sumar 1:      1111 1011  → esto es −5
~~~
Ventaja: la misma circuitería de suma sirve para restar. Con 8 bits el rango es de −128 a 127. Si te pasas, ocurre **desbordamiento** (overflow) y el número da la vuelta.

## Texto: ASCII y Unicode
ASCII asigna números a 128 caracteres («A» es 65, «a» es 97, «0» es 48). Unicode asigna un número a casi todo carácter humano, y UTF-8 lo guarda usando 1 a 4 bytes. Por eso la «ñ» puede verse como «Ã±» cuando un programa lee UTF-8 como si fuera otra codificación.

## Decimales: punto flotante
Los decimales se guardan como notación científica en binario (IEEE 754). Muchos valores como 0.1 no tienen representación exacta, igual que 1/3 no la tiene en decimal.
~~~js
console.log(0.1 + 0.2);            // sorpresa
console.log(0.1 + 0.2 === 0.3);    // false
// Por eso el dinero se guarda en céntimos enteros:
console.log(10 + 20 === 30);       // true
~~~

## Puntos que no debes omitir
- Nunca compares flotantes con «===»; usa una tolerancia.
- Nunca guardes dinero en punto flotante: usa enteros en céntimos o tipos decimales.
- Texto y bytes no son lo mismo: la longitud de un texto y su tamaño en bytes pueden diferir.
- El orden de bytes (endianness) importa cuando se intercambian datos binarios entre máquinas.

! El vuelo inaugural del Ariane 5 falló en 1996 al convertir un número de 64 bits a un entero de 16 bits que no alcanzaba. Un detalle de representación destruyó un cohete.`,
  links: [['m3.vars', 'los tipos de datos de un lenguaje son estos acuerdos con nombre'], ['m10.model', 'al diseñar tablas eliges tipos como INT, DECIMAL o VARCHAR por estas mismas razones'], ['m6.errors', 'el desbordamiento y el redondeo son fuentes clásicas de errores']],
  read: 'Bryant y O\'Hallaron, *CS:APP*, capítulo 2.',
  terms: [
    ['Complemento a dos', 'forma estándar de representar enteros negativos invirtiendo los bits y sumando 1', ['Una CPU usa el mismo circuito sumador para restar porque guarda −5 como 11111011.', 'Un byte con signo va de −128 a 127 y no de −127 a 127.', 'Al leer 10000000 como entero con signo de 8 bits se obtiene −128.']],
    ['Desbordamiento', 'resultado que no cabe en los bits disponibles y da la vuelta o se corta', ['Un contador de 8 bits en 255 pasa a 0 al sumarle 1.', 'Un videojuego muestra puntaje negativo tras superar el máximo de un entero de 32 bits.', 'Al multiplicar dos enteros grandes en una base de datos, el total aparece como un número absurdo y menor.']],
    ['ASCII', 'código de 7 bits que asigna números a 128 caracteres básicos del inglés', ['El carácter «A» se almacena como el número 65.', 'Un archivo antiguo no puede guardar la letra ñ porque su código solo llega a 127.', 'Restar 32 al código de una minúscula sin tilde da su mayúscula.']],
    ['Unicode', 'catálogo universal que da un número único a casi todo carácter de cualquier idioma', ['El emoji de un auto y la letra china 车 tienen cada uno su propio número asignado.', 'Un sitio puede mezclar árabe, español y japonés porque todos sus caracteres tienen código propio.', 'La «ñ» tiene el punto de código U+00F1 sin importar cómo se guarde en bytes.']],
    ['UTF-8', 'codificación que guarda cada carácter en 1 a 4 bytes y es compatible con ASCII', ['La palabra «niño» tiene 4 caracteres pero ocupa 5 bytes en disco.', 'Un archivo de solo inglés ocupa lo mismo que en ASCII puro.', 'Una web muestra «Ã±» en vez de «ñ» porque el navegador no interpretó bien estos bytes.']],
    ['Punto flotante', 'representación aproximada de decimales usando mantisa y exponente en binario', ['0.1 + 0.2 da 0.30000000000000004.', 'Una suma de miles de precios acumula centavos de error.', 'Los números muy grandes pierden precisión en sus últimos dígitos.']],
    ['Endianness', 'orden en que se guardan en memoria los bytes de un número de varios bytes', ['Un mismo entero se ve como 12 34 en una máquina y 34 12 en otra.', 'Un protocolo de red debe acordar qué byte se envía primero.', 'Un archivo binario leído en otra arquitectura da números absurdos aunque esté intacto.']]
  ],
  q: [
    ['Debes guardar precios en PatioApp. ¿Cuál es la mejor opción?', 'Un entero con los céntimos o un tipo decimal exacto', ['Un número de punto flotante de 64 bits', 'Un texto con el símbolo de la moneda', 'Un flotante redondeado a dos decimales'], 'Solo el entero o el decimal exacto evita errores acumulados de redondeo.', 3],
    ['¿Cuál es el código ASCII de «a» si «A» es 65 y la diferencia entre minúscula y mayúscula es 32?', '97', ['33', '91', '98'], '65 + 32 = 97.', 2],
    ['¿Cómo comparas correctamente si dos flotantes a y b son "iguales"?', 'Math.abs(a - b) < 1e-9', ['a === b', 'a.toString() === b.toString()', 'Math.round(a) === Math.round(b)'], 'Se compara con una tolerancia pequeña adecuada al problema.', 3],
    ['Un sistema de 32 bits guarda segundos desde 1970 con signo. ¿Por qué fallará en 2038?', 'Porque el contador alcanzará 2^31 − 1 y se desbordará', ['Porque Unicode se queda sin códigos', 'Porque el punto flotante perderá precisión', 'Porque cambia el orden de bytes'], 'Es el "problema del año 2038": un desbordamiento de enteros con signo.', 4],
    ['El texto «café» en UTF-8, ¿cuántos bytes ocupa?', '5', ['4', '6', '8'], 'c, a y f ocupan 1 byte cada una; la «é» ocupa 2.', 4],
    { c: 'Escribe «iguales(a, b)» que diga si dos flotantes difieren menos de 0.000001.', f: 'iguales', p: ['a', 'b'], t: [[[0.1, 0.1], true], [[0.30000000000000004, 0.3], true], [[1, 1.1], false], [[-2, -2.0000001], true]], sol: '  return Math.abs(a - b) < 0.000001;', l: 3 },
    { c: 'Escribe «sumarPrecios(lista)» que reciba precios en soles con decimales y devuelva el total exacto con dos decimales como número, trabajando internamente en céntimos.', f: 'sumarPrecios', p: ['lista'], t: [[[[0.1, 0.2]], 0.3], [[[19.99, 5.01]], 25], [[[]], 0], [[[1.15, 2.35, 0.1]], 3.6]], sol: '  let c = 0;\n  for (const p of lista) c += Math.round(p * 100);\n  return c / 100;', h: 'Convierte cada precio a céntimos con Math.round(p * 100).', l: 4 }
  ],
  gen: function (g) {
    function c2(n) { return ((n + 256) % 256).toString(2).padStart(8, '0'); }
    g.times(10, function (R) { var n = R.int(1, 127); g.input(2, 'Escribe −' + n + ' en complemento a dos de 8 bits.', c2(-n), 'Toma ' + c2(n) + ', invierte los bits y suma 1: ' + c2(-n) + '.'); });
    g.times(8, function (R) { var n = R.int(1, 127), b = c2(-n); g.input(3, '¿Qué entero con signo representan los 8 bits ' + b + '?', -n, 'El primer bit es 1, así que es negativo: invierte y suma 1 para obtener ' + n + '; el valor es −' + n + '.'); });
    g.times(6, function (R) { var ch = R.pick('BCDEFGHJKLMNPQRSTUVWXYZ'.split('')); g.input(2, 'Si «A» es 65 en ASCII, ¿qué número corresponde a «' + ch + '»?', ch.charCodeAt(0), 'Las letras son consecutivas: ' + ch + ' = ' + ch.charCodeAt(0) + '.'); });
    g.times(6, function (R) { var b = R.pick([8, 16, 32]), v = Math.pow(2, b) - 1, add = R.int(1, 9); g.input(4, 'Un entero sin signo de ' + b + ' bits vale ' + v + '. ¿Cuánto vale tras sumarle ' + add + '?', add - 1, 'Da la vuelta: el máximo más 1 es 0, así que queda ' + (add - 1) + '.'); });
  } });

S('m1', 'm1.logic', { title: 'Lógica booleana y compuertas',
  ask: '¿Qué compuerta u operación se describe?',
  lesson: `
> **La idea en simple.** Imagina dos interruptores en una habitación. Si están en serie, la luz prende solo si ambos están arriba: eso es AND. Si están en paralelo, basta uno: eso es OR. Las computadoras son miles de millones de estas pequeñas decisiones.

## Las operaciones básicas
| A | B | A AND B | A OR B | A XOR B | NOT A |
| 0 | 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 |

## De compuertas a sumar
Sumar dos bits necesita solo dos compuertas: el resultado es XOR y lo que se lleva es AND. Encadenando ese "sumador" se suma cualquier número. La CPU es, en el fondo, esto a enorme escala.
:::flow Transistor | Compuerta | Sumador | Unidad aritmética | CPU

## Leyes que usarás al programar
- **De Morgan:** «!(a && b)» equivale a «!a || !b», y «!(a || b)» equivale a «!a && !b».
- **Cortocircuito:** en «a && b», si a es falso, b ni se evalúa.

~~~js
const edad = 20, tieneLicencia = false;
console.log(edad >= 18 && tieneLicencia);     // AND
console.log(edad >= 18 || tieneLicencia);     // OR
console.log(!(edad >= 18 && tieneLicencia));  // NOT de un AND
// Operadores a nivel de bit
console.log(6 & 3, 6 | 3, 6 ^ 3);
~~~

## Puntos que no debes omitir
- NAND por sí sola puede construir cualquier otro circuito.
- Simplificar condiciones con De Morgan hace el código legible y evita errores.
- Operar bit a bit (máscaras) se usa en permisos, redes y compresión.

! Error común: creer que OR significa "uno u otro, pero no ambos". Eso es XOR. OR también es verdadero si ambos lo son.`,
  links: [['m1.cpu', 'estas compuertas forman la unidad que ejecuta las instrucciones'], ['m2.prop', 'la lógica proposicional es la versión matemática de estas tablas'], ['m3.cond', 'cada «if» que escribas es una expresión booleana']],
  read: 'Nisan y Schocken, *Nand2Tetris*, capítulos 1 y 2.',
  terms: [
    ['AND', 'operación verdadera solo cuando todas sus entradas son verdaderas', ['La puerta se abre solo si hay tarjeta válida y además es horario laboral.', 'Una alarma exige dos llaves giradas al mismo tiempo.', 'Una máscara de bits deja pasar un bit solo si el bit de la máscara también es 1.']],
    ['OR', 'operación verdadera cuando al menos una entrada es verdadera', ['Se aplica descuento si eres estudiante o adulto mayor, y también si eres ambos.', 'La luz se enciende desde cualquiera de dos interruptores en paralelo.', 'Un permiso se activa en un entero combinando su bit con los que ya estaban.']],
    ['NOT', 'operación que invierte su única entrada', ['Una variable «cerrado» pasa de verdadero a falso.', 'Un botón de "ocultar" muestra lo contrario de su estado actual.', 'Un inversor convierte voltaje alto en voltaje bajo.']],
    ['XOR', 'operación verdadera cuando las entradas son distintas', ['Dos interruptores de escalera cambian la luz al mover cualquiera de ellos.', 'Al sumar dos bits, esta operación da el dígito resultante sin el acarreo.', 'Cifrar dos veces con la misma clave de un bit devuelve el dato original.']],
    ['NAND', 'negación de AND, falsa solo cuando todas las entradas son verdaderas', ['Una memoria flash se construye con esta compuerta universal.', 'El curso Nand2Tetris construye toda una computadora a partir solo de ella.', 'La salida es 0 únicamente cuando ambas entradas valen 1.']],
    ['Ley de De Morgan', 'regla que convierte la negación de un AND en un OR de negaciones y viceversa', ['Reescribes «!(activo && pagado)» como «!activo || !pagado».', 'Una condición "no es cierto que llueva o nieve" se vuelve "no llueve y no nieva".', 'Un revisor te pide quitar el paréntesis negado de un if largo.']],
    ['Cortocircuito', 'evaluación que se detiene apenas se conoce el resultado de la expresión', ['«usuario && usuario.nombre» no falla aunque usuario sea null.', 'En «a || b», si a es verdadero, la función b nunca se llama.', 'Un «&&» evita una división entre cero al comprobar antes el divisor.']]
  ],
  q: [
    ['Un sumador de un bit produce dos salidas. ¿Con qué compuertas?', 'XOR para la suma y AND para el acarreo', ['OR para la suma y NOT para el acarreo', 'AND para la suma y XOR para el acarreo', 'NAND para ambas sin más compuertas'], '1+1 da suma 0 (XOR) y acarreo 1 (AND).', 3],
    ['¿Cuál equivale a !(a || b)?', '!a && !b', ['!a || !b', 'a && b', '!(a && b)'], 'De Morgan: la negación cambia OR por AND y niega cada parte.', 3],
    ['¿Qué permite la expresión «permisos & 4»?', 'Comprobar si está activo el bit de valor 4', ['Sumar 4 a los permisos', 'Activar el bit de valor 4', 'Borrar todos los permisos menos 4'], 'AND con una máscara aísla ese bit; para activarlo se usa OR.', 4],
    ['¿Cuál expresión intercambia a y b sin variable extra?', 'a ^= b; b ^= a; a ^= b;', ['a &= b; b &= a; a &= b;', 'a |= b; b |= a; a |= b;', 'a = !a; b = !b;'], 'XOR es reversible; aplicarlo tres veces intercambia los valores.', 4],
    { c: 'Escribe «semisumador(a, b)» que reciba dos bits (0 o 1) y devuelva [suma, acarreo].', f: 'semisumador', p: ['a', 'b'], t: [[[0, 0], [0, 0]], [[0, 1], [1, 0]], [[1, 0], [1, 0]], [[1, 1], [0, 1]]], sol: '  return [a ^ b, a & b];', l: 3 },
    { c: 'Escribe «tienePermiso(permisos, bit)» que devuelva true si el número bit (potencia de 2) está activo en permisos.', f: 'tienePermiso', p: ['permisos', 'bit'], t: [[[5, 4], true], [[5, 2], false], [[7, 1], true], [[0, 1], false]], sol: '  return (permisos & bit) !== 0;', h: 'Usa AND a nivel de bit.', l: 4 }
  ],
  gen: function (g) {
    var ops = [['AND', function (a, b) { return a & b; }], ['OR', function (a, b) { return a | b; }], ['XOR', function (a, b) { return a ^ b; }], ['NAND', function (a, b) { return 1 - (a & b); }], ['NOR', function (a, b) { return 1 - (a | b); }]];
    ops.forEach(function (o) { [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(function (p) { g.input(1, '¿Cuánto vale ' + p[0] + ' ' + o[0] + ' ' + p[1] + '?', o[1](p[0], p[1]), 'Según la tabla de verdad de ' + o[0] + ', el resultado es ' + o[1](p[0], p[1]) + '.'); }); });
    g.times(8, function (R) { var a = R.int(1, 15), b = R.int(1, 15), o = R.pick([['&', a & b], ['|', a | b], ['^', a ^ b]]); g.trace(3, 'console.log(' + a + ' ' + o[0] + ' ' + b + ');', a + ' = ' + a.toString(2) + ', ' + b + ' = ' + b.toString(2) + '; aplica la operación bit a bit: ' + o[1] + '.'); });
    g.times(6, function (R) { var a = R.pick([true, false]), b = R.pick([true, false]), c = R.pick([true, false]); g.trace(2, 'const a = ' + a + ', b = ' + b + ', c = ' + c + ';\nconsole.log(!(a && b) || c);', 'Resuelve primero el paréntesis, luego NOT y al final OR.'); });
  } });

S('m1', 'm1.cpu', { title: 'CPU, memoria y ciclo de instrucción',
  ask: '¿Qué componente o concepto interviene aquí?',
  lesson: `
> **La idea en simple.** La CPU es un cocinero muy rápido y muy obediente. La RAM es su mesa de trabajo, el disco es la despensa y el programa es la receta. En cada paso lee una línea de la receta, la interpreta y la hace. Nunca improvisa.

## El ciclo de instrucción
:::flow Buscar (fetch) | Decodificar | Ejecutar | Guardar resultado
Un registro especial, el **contador de programa**, indica la dirección de la siguiente instrucción. Saltar a otra dirección es lo que hace posibles los «if» y los bucles.

## Un programa visto de cerca
Tu línea «total = a + b» se convierte en algo así en ensamblador:
~~~txt
LOAD  R1, [a]      ; trae a desde la RAM al registro R1
LOAD  R2, [b]      ; trae b al registro R2
ADD   R3, R1, R2   ; la ALU suma
STORE R3, [total]  ; guarda el resultado en la RAM
~~~

## La jerarquía de memoria
Más cerca de la CPU significa más rápido, más pequeño y más caro.
| Nivel | Tiempo aproximado | Analogía humana |
| Registro | menos de 1 ns | lo que tienes en la mano |
| Caché L1 | ~1 ns | sobre tu escritorio |
| RAM | ~100 ns | un estante del cuarto |
| SSD | ~100 000 ns | otro edificio |
| Red a otro continente | ~150 000 000 ns | otro país |

## Por qué le importa a un programador
Recorrer un arreglo en orden es mucho más rápido que saltar por la memoria, porque aprovecha la **localidad**: la caché ya trajo los vecinos. También explica por qué una consulta a una base de datos es miles de veces más lenta que una variable.

## Puntos que no debes omitir
- La RAM es volátil: se borra al apagar. El disco persiste.
- La arquitectura de Von Neumann guarda datos e instrucciones en la misma memoria.
- Las CPU modernas ejecutan en varios núcleos, tema clave en concurrencia.
- Un compilador traduce tu código a estas instrucciones.

! Error común: pensar que más GHz siempre es más velocidad. Los accesos a memoria suelen ser el verdadero cuello de botella.`,
  links: [['m8.os', 'el sistema operativo reparte esta CPU y memoria entre programas'], ['m8.comp', 'el compilador convierte tu código en estas instrucciones'], ['m13.scale', 'la caché de un sistema distribuido aplica la misma jerarquía a gran escala']],
  read: 'Patterson y Hennessy, *Computer Organization and Design*; *CS:APP*, capítulos 4 a 6.',
  terms: [
    ['ALU', 'circuito de la CPU que realiza operaciones aritméticas y lógicas', ['Es la parte que efectivamente suma dos registros.', 'Calcula si dos números son iguales para decidir un salto.', 'Dentro de ella están los sumadores hechos con compuertas.']],
    ['Registro', 'celda de memoria diminuta y ultrarrápida dentro de la CPU', ['La instrucción ADD toma sus operandos desde R1 y R2.', 'Un dato se trae de la RAM antes de poder operarlo.', 'Una CPU de 64 bits trabaja con estas celdas de 64 bits.']],
    ['Contador de programa', 'registro que guarda la dirección de la siguiente instrucción', ['Tras cada instrucción aumenta para pasar a la siguiente.', 'Un salto condicional funciona cambiando este valor.', 'Al llamar una función se guarda su valor para poder regresar.']],
    ['Memoria caché', 'memoria pequeña y rápida que guarda copias de datos usados recientemente', ['Recorrer un arreglo en orden es rápido porque los vecinos ya están cerca de la CPU.', 'La segunda lectura del mismo dato tarda una fracción de la primera.', 'Una CPU tiene niveles L1, L2 y L3 entre los núcleos y la RAM.']],
    ['RAM', 'memoria principal, rápida y volátil, donde viven los programas en ejecución', ['Al apagar la PC se pierde el documento que no guardaste.', 'Abrir demasiados programas agota este recurso y todo se vuelve lento.', 'Un programa se copia aquí desde el disco antes de ejecutarse.']],
    ['Ensamblador', 'lenguaje de bajo nivel cuyas instrucciones corresponden casi una a una con las de la máquina', ['«MOV AX, 5» es una línea típica.', 'Un programador del kernel escribe a mano la rutina de arranque así.', 'Un desensamblador te muestra un ejecutable con este formato.']],
    ['Localidad', 'tendencia de los programas a usar datos cercanos o usados hace poco', ['Una matriz recorrida por filas es más rápida que recorrida por columnas.', 'Las cachés funcionan bien gracias a este patrón.', 'Una lista enlazada dispersa en memoria es lenta aunque tenga igual complejidad teórica.']]
  ],
  q: [
    { o: 'Ordena los pasos del ciclo de instrucción.', s: ['Leer la instrucción desde la dirección del contador de programa', 'Decodificar qué operación pide', 'Ejecutarla en la ALU', 'Guardar el resultado'], e: 'Es el ciclo buscar, decodificar, ejecutar y guardar.', l: 2 },
    { o: 'Ordena de más rápido a más lento.', s: ['Registro', 'Caché L1', 'RAM', 'SSD', 'Internet'], e: 'Cada nivel es bastante más lento y grande que el anterior.', l: 2 },
    ['¿Por qué consultar a la base de datos en un bucle de 1000 vueltas es tan mala idea?', 'Porque cada consulta cruza la red y es miles de veces más lenta que la memoria', ['Porque los bucles no pueden contener consultas', 'Porque la CPU se apaga al hacer red', 'Porque la RAM se borra'], 'Mirar la jerarquía de latencias permite detectar este problema.', 4],
    ['Una máquina tiene 8 GB de RAM y direcciones de 32 bits. ¿Qué problema aparece?', 'Solo se pueden direccionar 4 GB', ['Se pueden direccionar 8 GB sin problema', 'La caché deja de funcionar', 'Los números negativos fallan'], '2^32 bytes = 4 GB de direcciones.', 4],
    ['¿Qué instrucción de máquina hace posible un «if»?', 'Un salto condicional', ['Una suma', 'Un STORE', 'Un LOAD'], 'Se compara y se cambia el contador de programa solo si se cumple la condición.', 3],
    { c: 'Simula una CPU mínima. Escribe «ejecutar(prog)» que reciba una lista de instrucciones como ["SET",5], ["ADD",3], ["SUB",1], ["MUL",2] sobre un acumulador que empieza en 0 y devuelva el valor final.', f: 'ejecutar', p: ['prog'], t: [[[[['SET', 5], ['ADD', 3]]], 8], [[[['SET', 2], ['MUL', 4], ['SUB', 1]]], 7], [[[]], 0]], sol: "  let acc = 0;\n  for (const [op, v] of prog) {\n    if (op === 'SET') acc = v;\n    if (op === 'ADD') acc += v;\n    if (op === 'SUB') acc -= v;\n    if (op === 'MUL') acc *= v;\n  }\n  return acc;", l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.input(3, 'Traza este programa de acumulador y da su valor final:\nSET ' + a + '\nADD ' + b + '\nMUL ' + c, (a + b) * c, '(' + a + ' + ' + b + ') × ' + c + ' = ' + (a + b) * c + '.'); });
    g.times(6, function (R) { var bits = R.pick([8, 16, 20, 24, 30, 32]); g.input(3, '¿Cuántos bytes se pueden direccionar con ' + bits + ' bits de dirección?', Math.pow(2, bits), '2^' + bits + ' = ' + Math.pow(2, bits) + ' direcciones de un byte.'); });
  } });
})();
