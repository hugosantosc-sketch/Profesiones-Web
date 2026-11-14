(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m1', { prof: true });

D('m1.bin', `## Ejemplo resuelto: bits que ves todos los días
- **Permisos de archivos en Linux.** «chmod 754 informe.txt» parece magia hasta que se lee en binario: cada dígito octal son 3 bits (lectura, escritura, ejecución). 7 = 111 (rwx) para el dueño, 5 = 101 (r-x) para el grupo y 4 = 100 (r--) para los demás. El octal se usa justamente porque cada dígito corresponde a exactamente 3 bits.
- **Colores en la web.** «#0F766E» son tres bytes en hexadecimal: rojo 0F = 15, verde 76 = 118, azul 6E = 110. Cada par hexadecimal es un byte (8 bits = 2 dígitos hexadecimales), y por eso hay 256³ ≈ 16,7 millones de colores.
- **Direcciones IPv4.** 192.168.1.10 son 4 bytes escritos en decimal; una máscara /24 son 24 unos seguidos de 8 ceros (255.255.255.0), y la red se obtiene con un AND bit a bit entre la dirección y la máscara.
- **Banderas en un solo número.** PatioApp guarda las características de una unidad en un entero: bit 0 = tiene daños, bit 1 = es camión, bit 2 = tiene convenio, bit 3 = requiere grúa.
~~~js
const DANOS = 1 << 0, CAMION = 1 << 1, CONVENIO = 1 << 2, GRUA = 1 << 3;
let flags = CAMION | GRUA;                      // 0b1010 = 10
flags |= DANOS;                                  // encender un bit
const esCamion = (flags & CAMION) !== 0;         // probar un bit
flags &= ~GRUA;                                  // apagar un bit
console.log(flags.toString(2).padStart(4, '0'), esCamion);
~~~
Las máscaras de bits ahorran espacio y son muy rápidas, por eso aparecen en sistemas operativos, protocolos de red, gráficos y permisos. A cambio, son menos legibles que un objeto con nombres, así que en código de aplicación conviene usarlas solo cuando el espacio o la velocidad importan de verdad, y siempre con constantes con nombre.`);

D('m1.data', `## Ejemplo resuelto: "Ñandú" en bytes
¿Cuántos bytes ocupa el texto «Ñandú» en UTF-8, la codificación que usa casi toda la web?
1. Los puntos de código Unicode son: Ñ = U+00D1, a = U+0061, n = U+006E, d = U+0064, ú = U+00FA.
2. UTF-8 usa 1 byte para U+0000 a U+007F (ASCII), 2 bytes hasta U+07FF, 3 hasta U+FFFF y 4 para el resto (como los emojis).
3. «a», «n» y «d» ocupan 1 byte cada uno; «Ñ» y «ú» ocupan 2: en total 7 bytes para 5 caracteres.
4. En JavaScript, «"Ñandú".length» devuelve 5, porque cuenta **unidades de código UTF-16**, no bytes ni caracteres. Con un emoji fuera del plano básico, como «🚗» (U+1F697), «.length» devuelve 2, porque en UTF-16 ocupa un **par sustituto**; y un emoji compuesto como una bandera o una familia puede ocupar muchas unidades más.
~~~js
const t = 'Ñandú 🚗';
console.log('length:', t.length);                                 // unidades UTF-16
console.log('caracteres:', [...t].length);                        // puntos de código
console.log('bytes UTF-8:', new TextEncoder().encode(t).length);
console.log('Ñ en UTF-8:', [...new TextEncoder().encode('Ñ')].map(b => b.toString(16)));   // c3 91
~~~
5. Un error típico: la "mojibake", texto como «Ã‘andÃº», aparece cuando bytes UTF-8 se interpretan como Latin-1. Ocurre al leer un CSV exportado de Excel con la codificación equivocada o al configurar mal la base de datos. La regla práctica: UTF-8 en todas partes (archivos, base de datos, cabeceras HTTP) y declararlo explícitamente.
6. Otro detalle: «Ñ» puede escribirse como un solo punto de código (U+00D1) o como «N» más una tilde combinable (U+004E U+0303). Se ven iguales, pero no son iguales para «===». Antes de comparar o buscar, se **normalizan** con «texto.normalize("NFC")».`);

D('m1.logic', `## Ejemplo resuelto: la alarma de la puerta del patio
La puerta del patio debe activar una alarma (A) cuando la barrera está abierta (B) y no hay una salida autorizada (S), o cuando es de noche (N) y hay movimiento (M) sin un operador presente (O).
1. **Expresión:** A = (B ∧ ¬S) ∨ (N ∧ M ∧ ¬O).
2. **Tabla de verdad:** con 5 variables hay 32 filas; la alarma se activa en las filas que cumplen alguno de los dos términos.
3. **Circuito:** dos compuertas NOT (para S y O), una AND de dos entradas, una AND de tres entradas y una OR de dos entradas.
4. **Con compuertas universales:** como NAND es universal, todo el circuito se puede construir solo con NAND; por la ley de De Morgan, una suma de productos (OR de AND) se convierte directamente en NAND de NAND, lo que en la fabricación de chips es muy conveniente porque se usa un solo tipo de compuerta.
5. **Simplificación:** si gerencia agrega "o cuando la barrera está abierta de noche", el término B ∧ N parece nuevo, pero ¿es redundante? Se verifica con la tabla: cuando B ∧ N es verdadero y S es falso, el primer término ya activa la alarma; el único caso nuevo es B ∧ N ∧ S (barrera abierta de noche con salida autorizada). La regla nueva **cambia** el comportamiento: hay que preguntar si eso es lo que se quiere. Los **mapas de Karnaugh** (Maurice Karnaugh, 1953) permiten hacer estas simplificaciones visualmente con hasta 4 o 5 variables; con más, se usan algoritmos como el de Quine-McCluskey o herramientas de síntesis lógica.
La misma lógica se escribe en el código de PatioApp: «const alarma = (barrera && !salida) || (noche && movimiento && !operador);».`);

D('m1.cpu', `## Ejemplo resuelto: una CPU de juguete
Para ver el ciclo de captura, decodificación y ejecución, basta un simulador de unas pocas líneas. Esta CPU tiene un acumulador (ACC), un contador de programa (PC) y una memoria donde conviven instrucciones y datos (arquitectura de Von Neumann):
~~~js
// Instrucciones: [operación, operando]. CARGAR, SUMAR, RESTAR, GUARDAR, SALTAR_SI_CERO, SALTAR, PARAR
function ejecutar(mem) {
  let ACC = 0, PC = 0, ciclos = 0;
  while (ciclos++ < 1000) {
    const [op, x] = mem[PC];          // captura
    PC++;                             // el PC apunta a la siguiente instrucción
    switch (op) {                     // decodificación y ejecución
      case 'CARGAR': ACC = mem[x]; break;
      case 'SUMAR': ACC += mem[x]; break;
      case 'RESTAR': ACC -= mem[x]; break;
      case 'GUARDAR': mem[x] = ACC; break;
      case 'SALTAR_SI_CERO': if (ACC === 0) PC = x; break;
      case 'SALTAR': PC = x; break;
      case 'PARAR': return { ACC, ciclos };
    }
  }
}
// Programa: total = 0; mientras n != 0 { total += 20; n -= 1 }   (20 soles por cada día de estadía)
const mem = [
  ['CARGAR', 11], ['SALTAR_SI_CERO', 9], ['CARGAR', 10], ['SUMAR', 12], ['GUARDAR', 10],
  ['CARGAR', 11], ['RESTAR', 13], ['GUARDAR', 11], ['SALTAR', 0], ['CARGAR', 10],
  0, 3, 20, 1                         // datos: total (10), n = 3 días (11), tarifa (12), uno (13)
];
console.log(ejecutar(mem));          // ACC = 60
~~~
Observaciones:
1. Las posiciones 0 a 9 son instrucciones y las 10 a 13 son datos, en la **misma** memoria: el programa podría modificarse a sí mismo escribiendo en las posiciones de instrucciones (y los virus lo aprovecharon durante años, hasta que los sistemas marcaron las páginas de código como no escribibles).
2. El bucle se implementa con saltos: no hay «while» en la máquina, solo comparaciones y cambios del PC. Todo «for», «while» e «if» de los lenguajes se traduce a esto.
3. Cada vuelta del bucle ejecuta 9 instrucciones; con 3 días, el programa usa 30 ciclos. El rendimiento se mide contando instrucciones y ciclos, como en la ecuación del rendimiento.`);

S('m1', 'm1.arith', { title: 'Aritmética del computador',
  ask: '¿Qué concepto de aritmética binaria se aplica?',
  lesson: `
> **La idea en simple.** Una calculadora de bolsillo y un procesador de computadora tienen algo en común: sus números tienen una cantidad fija de dígitos. Cuando una cuenta no cabe, algo se pierde. Entender cómo suma, resta, multiplica y divide una computadora (y qué pasa cuando el resultado no cabe) explica errores famosos y te permite escribir código que no falla con números grandes.

## Sumar en binario
La suma binaria funciona como la decimal, pero con solo dos dígitos: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (0 y me llevo 1), 1 + 1 + 1 = 11 (1 y me llevo 1). Por ejemplo, 0110 (6) + 0111 (7):
~~~txt
   acarreos:  1 1 0
               0 1 1 0      (6)
             + 0 1 1 1      (7)
             ---------
               1 1 0 1      (13)
~~~
En el hardware, cada columna la resuelve un **sumador completo** (que viste en lógica booleana) y los acarreos se propagan de derecha a izquierda. Un sumador de **acarreo propagado** de 64 bits debe esperar a que el acarreo cruce las 64 posiciones; los procesadores usan sumadores de **acarreo anticipado** (*carry lookahead*) que calculan los acarreos en paralelo con más compuertas, a cambio de mucha más velocidad.

## Restar con complemento a dos
Recuerda que en **complemento a dos** con n bits, el negativo de x se obtiene invirtiendo todos los bits y sumando 1. La gran ventaja: **restar es sumar el negativo**, así que el mismo sumador sirve para ambas operaciones. Ejemplo con 8 bits, 5 − 7:
- 5 = 00000101; 7 = 00000111; −7 = 11111000 + 1 = 11111001.
- 00000101 + 11111001 = 11111110, que en complemento a dos es −2. Correcto.
Con 8 bits se representan los enteros de −128 a 127; con 32 bits, de −2 147 483 648 a 2 147 483 647; con 64, hasta unos 9,2 × 10¹⁸.

## Desbordamiento
Cuando el resultado no cabe en los bits disponibles hay **desbordamiento** (*overflow*):
- En **enteros sin signo**, el resultado "da la vuelta" módulo 2ⁿ: con 8 bits, 250 + 10 = 4.
- En **complemento a dos**, sumar dos positivos puede dar un negativo: con 8 bits, 100 + 50 = 150, que no cabe y se lee como −106. La regla: hay desbordamiento si los dos operandos tienen el mismo signo y el resultado tiene el signo contrario.
Los lenguajes reaccionan de formas muy distintas: C deja el desbordamiento con signo como **comportamiento indefinido** (el compilador puede asumir que no ocurre y optimizar en consecuencia, con resultados sorprendentes); Java y Go dan la vuelta en silencio; Rust detecta el desbordamiento en modo de depuración y obliga a elegir explícitamente (operaciones «wrapping», «checked» o «saturating»); Python usa enteros de precisión arbitraria y nunca desborda. JavaScript usa números de punto flotante de 64 bits, que representan enteros exactos solo hasta 2⁵³, y ofrece «BigInt» para enteros arbitrarios.

## Desbordamientos famosos
- **Ariane 5 (1996):** como viste en métodos numéricos, la conversión de un valor de 64 bits a un entero de 16 bits con signo se desbordó y destruyó el cohete.
- **Gangnam Style (2014):** el contador de vistas de YouTube era un entero de 32 bits con signo; cuando el video superó 2 147 483 647 reproducciones, Google tuvo que pasar a 64 bits.
- **El problema del año 2038:** los sistemas que guardan el tiempo como segundos desde el 1 de enero de 1970 en un entero de 32 bits con signo se desbordarán el **19 de enero de 2038 a las 03:14:07 UTC**, y el reloj saltará a 1901. La mayoría de los sistemas modernos ya usan 64 bits, pero muchos dispositivos embebidos y formatos de archivo antiguos siguen afectados.
- **Boeing 787 (2015):** la Administración Federal de Aviación de Estados Unidos ordenó reiniciar periódicamente ciertos generadores eléctricos porque un contador interno se desbordaba tras 248 días de funcionamiento continuo (2³¹ centésimas de segundo ≈ 248,5 días).
- **Búsqueda binaria de Java:** el cálculo «(lo + hi) / 2» se desbordaba con arreglos de más de mil millones de elementos, como viste en métodos formales.

## Multiplicar y dividir
- **Multiplicar** en binario es sumar desplazamientos: multiplicar por 2ᵏ es **desplazar k posiciones a la izquierda** («x << k»), y multiplicar por cualquier número es sumar los desplazamientos de los bits en 1 del multiplicador (el método de la escuela, en base 2). El producto de dos números de n bits puede ocupar 2n bits.
- **Dividir** por 2ᵏ es desplazar a la derecha. Con números negativos hay que cuidar el tipo de desplazamiento: el **aritmético** («>>» en JavaScript) copia el bit de signo y conserva el signo; el **lógico** («>>>») rellena con ceros. Además, el desplazamiento aritmético redondea hacia −∞ (−7 >> 1 = −4), mientras que la división entera de muchos lenguajes redondea hacia 0 (−7 / 2 = −3).
- Los compiladores reemplazan multiplicaciones y divisiones por constantes con desplazamientos y sumas, que son más rápidos; por eso escribir «x << 1» en lugar de «x * 2» "por velocidad" casi nunca ayuda y sí dificulta la lectura.

## Operaciones de bits
| Operación | JavaScript | Uso típico |
| AND | a & b | probar o apagar bits con una máscara |
| OR | la barra vertical entre a y b | encender bits |
| XOR | a ^ b | invertir bits, detectar diferencias, intercambiar sin variable auxiliar |
| NOT | ~a | invertir todos los bits |
| desplazamiento izquierdo | a << k | multiplicar por 2ᵏ, construir máscaras |
| desplazamiento derecho | a >> k | dividir por 2ᵏ |
Trucos clásicos (recopilados en *Hacker's Delight* de Henry Warren): «x & (x − 1)» apaga el bit 1 más bajo, y vale 0 exactamente cuando x es potencia de 2; «x & −x» aísla el bit 1 más bajo; «x ^ y < 0» indica si tienen signos distintos.
~~~js
const esPotenciaDe2 = x => x > 0 && (x & (x - 1)) === 0;
const contarUnos = x => { let c = 0; while (x) { x &= x - 1; c++; } return c; };    // algoritmo de Kernighan
console.log([1, 6, 8, 1024].map(esPotenciaDe2), contarUnos(0b10110110));
// Desbordamiento en 32 bits: JavaScript convierte a entero de 32 bits con las operaciones de bits
console.log((2147483647 + 1) | 0);              // -2147483648: dio la vuelta
console.log(-7 >> 1, Math.trunc(-7 / 2));        // -4 y -3: dos redondeos distintos
~~~

## Ejemplo resuelto: el contador de tickets de PatioApp
Los terminales de las sedes, de bajo costo, numeran los tickets con un contador de **16 bits sin signo** (0 a 65 535) que se guarda en su memoria.
1. **Riesgo:** con 400 tickets diarios, el contador se desborda en 65 536 / 400 ≈ 164 días, y vuelve a 0. Dos tickets distintos en el año tendrían el mismo número.
2. **Primera idea:** pasar a 32 bits sin signo, que con 400 por día tarda unos 29 000 años en desbordarse. Pero el formato del código de barras impreso solo admite 6 dígitos.
3. **Solución:** el número del ticket se compone de la sede (2 dígitos), el día del año (3 dígitos) y un contador diario de 16 bits; el contador se reinicia cada día y una prueba verifica que una sede nunca supera los 65 535 tickets diarios, rechazando el ticket 65 536 con un error explícito en lugar de dar la vuelta en silencio.
4. **En la API**, los identificadores internos usan enteros de 64 bits en la base de datos, que se envían al frontend como **texto**, porque JavaScript no representa exactamente enteros mayores que 2⁵³ (Twitter tuvo que agregar el campo «id_str» a su API en 2010 por esta misma razón).`,
  links: [['m1.data', 'el complemento a dos se presentó en la representación de datos'], ['m1.logic', 'el sumador completo se construye con compuertas'], ['mat2.numer', 'los errores del punto flotante complementan los de los enteros']],
  read: 'Bryant y O’Hallaron, *Computer Systems: A Programmer’s Perspective* (3.ª ed.), capítulo 2; Patterson y Hennessy, *Organización y diseño de computadores*, capítulo 3; Warren, *Hacker’s Delight* (2.ª ed., 2012).',
  terms: [
    ['Sumador completo', 'circuito que suma dos bits más un acarreo de entrada y produce un bit de suma y un acarreo de salida', ['Una columna de la suma.', 'Se encadenan para sumar números.', 'Hecho con compuertas.']],
    ['Acarreo anticipado', 'técnica de sumadores que calcula los acarreos en paralelo para no esperar su propagación', ['Carry lookahead.', 'Más compuertas, más velocidad.', 'Usado en procesadores.']],
    ['Desbordamiento', 'situación en que el resultado de una operación no cabe en los bits disponibles', ['100 + 50 en 8 bits con signo.', 'Gangnam Style en YouTube.', 'Año 2038.']],
    ['Comportamiento indefinido', 'situación que el estándar de un lenguaje no define, en la que el compilador puede hacer cualquier cosa', ['Desbordamiento con signo en C.', 'Permite optimizaciones agresivas.', 'Fuente de errores sutiles.']],
    ['Desplazamiento aritmético', 'desplazamiento a la derecha que copia el bit de signo', ['>> en JavaScript.', '−7 >> 1 = −4.', 'Redondea hacia −∞.']],
    ['Desplazamiento lógico', 'desplazamiento a la derecha que rellena con ceros', ['>>> en JavaScript.', 'Para números sin signo.', 'No conserva el signo.']],
    ['Máscara de bits', 'número usado con AND, OR o XOR para probar, encender o apagar bits específicos', ['flags & CAMION.', 'flags | DANOS.', 'Permisos de archivos.']],
    ['Problema del año 2038', 'desbordamiento de los contadores de tiempo de 32 bits con signo el 19 de enero de 2038', ['Segundos desde 1970.', 'Saltan a 1901.', 'Afecta a sistemas embebidos.']]
  ],
  q: [
    ['¿Cuánto es 0110 + 0111 en binario?', '1101', ['1111', '1011', '0101'], '6 + 7 = 13.', 1],
    ['¿Cómo se resta en complemento a dos?', 'Sumando el complemento a dos del sustraendo', ['Con un circuito restador distinto', 'Invirtiendo el resultado', 'No se puede restar'], 'El mismo sumador sirve para ambas.', 2],
    ['Con 8 bits sin signo, ¿cuánto da 250 + 10?', '4', ['260', '255', '−6'], 'Da la vuelta módulo 256.', 2],
    ['Con 8 bits con signo, ¿qué pasa al sumar 100 + 50?', 'Hay desbordamiento y el resultado se lee como −106', ['Da 150 correctamente', 'Da 127', 'El programa se detiene siempre'], 'Dos positivos dan un negativo.', 3],
    ['¿Qué ocurre el 19 de enero de 2038?', 'Se desbordan los contadores de tiempo de 32 bits con signo', ['Se acaban las direcciones IPv4', 'Cambia el estándar Unicode', 'Nada'], 'Segundos desde 1970.', 2],
    ['¿Qué devuelve −7 >> 1 en JavaScript?', '−4', ['−3', '3', '−3,5'], 'El desplazamiento aritmético redondea hacia −∞.', 3],
    ['¿Por qué los identificadores de 64 bits se envían como texto a JavaScript?', 'Porque los números de JavaScript solo representan enteros exactos hasta 2⁵³', ['Porque los textos son más rápidos', 'Por seguridad', 'Porque JSON no admite números'], 'Twitter agregó id_str en 2010.', 4],
    { tf: 'En C, el desbordamiento de enteros con signo es comportamiento indefinido.', v: true, e: 'El compilador puede asumir que no ocurre.', l: 3 },
    { tf: 'Escribir x << 1 en lugar de x * 2 suele acelerar notablemente el programa.', v: false, e: 'Los compiladores ya hacen esa transformación; solo empeora la lectura.', l: 2 },
    { c: 'Escribe «suma8(a, b)»: suma dos enteros sin signo de 8 bits y devuelve [resultado módulo 256, hubo desbordamiento].', f: 'suma8', p: ['a', 'b'], t: [[[250, 10], [4, true]], [[100, 27], [127, false]], [[255, 1], [0, true]]], sol: '  const s = a + b;\n  return [s % 256, s > 255];', l: 2 },
    { c: 'Escribe «complementoADos(x, bits)»: devuelve la representación en complemento a dos de x (que puede ser negativo) como texto de «bits» dígitos.', f: 'complementoADos', p: ['x', 'bits'], t: [[[-7, 8], '11111001'], [[5, 8], '00000101'], [[-1, 4], '1111']], sol: '  const m = 2 ** bits;\n  return (((x % m) + m) % m).toString(2).padStart(bits, "0");', l: 3 },
    { c: 'Escribe «contarUnos(x)»: número de bits en 1 de un entero no negativo, con el algoritmo de Kernighan (x &= x − 1).', f: 'contarUnos', p: ['x'], t: [[[182], 5], [[0], 0], [[255], 8]], sol: '  let c = 0;\n  while (x) { x &= x - 1; c++; }\n  return c;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 15), b = R.int(1, 15); g.input(1, '¿Cuánto es ' + a.toString(2) + ' + ' + b.toString(2) + ' en binario?', (a + b).toString(2), 'Se suma columna por columna con acarreo.'); });
    g.times(6, function (R) { var x = R.int(1, 127); g.input(3, '¿Cómo se representa −' + x + ' en complemento a dos con 8 bits?', ((256 - x) % 256).toString(2).padStart(8, '0'), 'Se invierten los bits de ' + x + ' y se suma 1.'); });
    g.times(6, function (R) { var a = R.int(100, 255), b = R.int(10, 200); g.input(2, 'Con 8 bits sin signo, ¿cuánto da ' + a + ' + ' + b + '?', (a + b) % 256, 'Módulo 256.'); });
    var op = [['Probar si el bit de "camión" está encendido', 'AND'], ['Encender el bit de "daños"', 'OR'], ['Invertir el bit de "grúa"', 'XOR'], ['Multiplicar por 8', 'Desplazamiento a la izquierda 3'], ['Apagar el bit 1 más bajo', 'x & (x − 1)']];
    op.forEach(function (o) { g.mcq(2, '¿Qué operación de bits se usa para esto? ' + o[0], o[1], ['AND', 'OR', 'XOR', 'Desplazamiento a la izquierda 3', 'x & (x − 1)'].filter(function (x) { return x !== o[1]; }).slice(0, 3), 'Operaciones de bits.'); });
  },
  checks: [
    ['¿Por qué el complemento a dos permite usar el mismo circuito para sumar y restar?', 'Porque restar equivale a sumar el complemento a dos del sustraendo, que se obtiene invirtiendo bits y sumando 1.'],
    ['¿Cuándo hay desbordamiento al sumar en complemento a dos?', 'Cuando los dos operandos tienen el mismo signo y el resultado tiene el signo contrario.'],
    ['Da tres ejemplos reales de desbordamientos y su causa.', 'Ariane 5 (conversión a 16 bits), Gangnam Style (contador de 32 bits) y el año 2038 (tiempo en 32 bits con signo).'],
    ['¿Cómo se comportan C, Java, Rust, Python y JavaScript ante el desbordamiento de enteros?', 'C: indefinido con signo; Java: da la vuelta; Rust: detecta en depuración y obliga a elegir; Python: precisión arbitraria; JavaScript: flotantes exactos hasta 2⁵³ y BigInt.']
  ],
  cites: ['Bryant, R. y O’Hallaron, D. (2016). *Computer Systems: A Programmer’s Perspective* (3.ª ed.). Pearson.', 'Patterson, D. y Hennessy, J. (2020). *Computer Organization and Design RISC-V Edition* (2.ª ed.). Morgan Kaufmann.', 'Warren, H. (2012). *Hacker’s Delight* (2.ª ed.). Addison-Wesley.', 'Federal Aviation Administration (2015). *Airworthiness Directive 2015-09-07: The Boeing Company Airplanes*.', 'Lions, J. L. et al. (1996). *ARIANE 5 Flight 501 Failure: Report by the Inquiry Board*.'],
  project: { t: 'Una calculadora de n bits',
    goal: 'Simular la aritmética entera del hardware y sus desbordamientos.',
    steps: ['Implementa la suma de dos números de n bits con un sumador completo por columna, sin usar el operador + sobre los números.', 'Agrega la resta con complemento a dos y la detección de desbordamiento con y sin signo.', 'Implementa la multiplicación por desplazamientos y sumas.', 'Escribe pruebas que comparen tus resultados con los de BigInt para miles de valores aleatorios.', 'Busca en un proyecto propio un contador o identificador que pueda desbordarse y calcula cuándo ocurriría.'],
    deliver: 'El código, las pruebas y el análisis del contador.' },
  hito: ['Rediseña la numeración de tickets de PatioApp para que el contador nunca desborde en silencio y rechace explícitamente el exceso.', 'Asegura que PatioApp envía los identificadores de 64 bits como texto a la app y agrega una prueba con un identificador mayor que 2⁵³.']
});
SDC.after('m1.arith', 'm1.data');
})();
