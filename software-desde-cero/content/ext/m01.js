(function () {
var X = SDC.X, XM = SDC.XM;
XM('m1', {
  uni: 'MIT 6.1910 (antes 6.004) *Computation Structures*; Harvard CS50 (semanas 0 a 2); CMU 15-213 *Introduction to Computer Systems*; Berkeley CS61C *Great Ideas in Computer Architecture*; curso *Nand2Tetris* (Nisan y Schocken). En Perú: cursos de Sistemas Digitales y Arquitectura de Computadoras de UNMSM, UNI, PUCP y UPC.',
  capstone: { t: 'Una computadora de juguete, de los bits al programa',
    goal: 'Unir todo el módulo en un solo simulador: datos representados en bits, un sumador hecho con compuertas y una CPU que ejecuta un programa guardado en memoria.',
    steps: ['Implementa las compuertas AND, OR, NOT y XOR como funciones que reciben y devuelven 0 o 1.', 'Con ellas construye un sumador completo y luego un sumador de 8 bits; verifica que 100 + 27 = 127 y que 127 + 1 se desborda a −128 en complemento a dos.', 'Crea una memoria de 256 bytes (un arreglo) y muestra su contenido en hexadecimal.', 'Escribe una CPU con contador de programa, dos registros y las instrucciones LOAD, ADD, STORE, JZ, JMP y HALT; la suma debe usar tu sumador de compuertas.', 'Carga un programa que sume los números del 1 al 10 y muestra cada ciclo buscar-decodificar-ejecutar en pantalla.'],
    deliver: 'Un repositorio con el simulador, un README que explique cada capa (bit → compuerta → sumador → CPU) y una captura del programa sumando del 1 al 10.' }
});

X('m1.bin', {
  deep: `
## La notación posicional, dicha con precisión
Un número en base «b» con dígitos «d(n−1) … d1 d0» vale la suma de cada dígito por la base elevada a su posición: d0·b^0 + d1·b^1 + d2·b^2 + … Esta idea, que en Occidente se difundió con los numerales indoarábigos, funciona igual para cualquier base. Gottfried Leibniz publicó en 1703 su *Explication de l'Arithmétique Binaire*, donde mostró que todo número puede escribirse solo con 0 y 1. Dos siglos y medio después esa curiosidad matemática se volvió la base de toda la informática.

## El bit como unidad de información
Claude Shannon, en *A Mathematical Theory of Communication* (1948), usó el **bit** como unidad para medir información: un bit es la información que resuelve una duda entre dos opciones igual de probables. De ahí sale una regla que usarás toda la carrera: para distinguir **N** cosas necesitas al menos **⌈log2 N⌉** bits. Para 26 letras, 5 bits (2^5 = 32); para 1000 vehículos, 10 bits (2^10 = 1024).

## Cambios de base sin pasar por decimal
Como 8 = 2^3 y 16 = 2^4, convertir entre binario, octal y hexadecimal es solo agrupar bits desde la derecha:
~~~txt
Binario   1 0110 1110
Hexa      1    6    E      → 0x16E
Octal   101 101 110        → 0o556
~~~
Por eso los programadores prefieren hexadecimal: cada dígito hex representa medio byte (un *nibble*) y un byte se escribe siempre con dos dígitos.

## Fracciones en binario
A la derecha de la coma las posiciones valen 1/2, 1/4, 1/8… Así, «0.101» en binario es 0.5 + 0.125 = 0.625. Para convertir una fracción decimal se multiplica por 2 y se toma la parte entera:
~~~txt
0.1 × 2 = 0.2 → 0
0.2 × 2 = 0.4 → 0
0.4 × 2 = 0.8 → 0
0.8 × 2 = 1.6 → 1
0.6 × 2 = 1.2 → 1
0.2 × 2 = 0.4 → 0   ← se repite para siempre
~~~
0.1 en binario es 0.000110011… periódico. Esta es la raíz del famoso «0.1 + 0.2 ≠ 0.3» que verás en el siguiente tema.

## Aritmética binaria y desplazamientos
Sumar en binario sigue las mismas reglas que en decimal: 1 + 1 = 10 (se escribe 0 y se lleva 1). Multiplicar por 2 equivale a **desplazar** los bits a la izquierda, igual que multiplicar por 10 en decimal agrega un cero. En JavaScript, «5 << 1» da 10 y «20 >> 2» da 5. Los compiladores reemplazan multiplicaciones por potencias de 2 con desplazamientos porque son más baratos.

~~~js
// Máscaras: guardar varias banderas en un solo número
const LAVADA = 1, REVISADA = 2, CON_DANOS = 4, VENDIDA = 8;
let estado = 0;
estado |= LAVADA;              // encender un bit
estado |= REVISADA;
console.log(estado.toString(2)); // 11
console.log((estado & CON_DANOS) !== 0); // ¿tiene daños?
estado &= ~LAVADA;             // apagar un bit
console.log(estado.toString(2)); // 10
~~~

## Prefijos: kilo no siempre es mil
El Sistema Internacional define kilo = 1000. La memoria, en cambio, crece en potencias de 2, y durante décadas se llamó "kilobyte" a 1024 bytes. Para acabar con la confusión, la IEC introdujo en 1998 los prefijos binarios: **KiB** (1024), **MiB** (1024²), **GiB** (1024³). Un disco de 1 TB (10^12 bytes) equivale a unos 0.91 TiB, que es lo que muestra Windows.

## Por qué importa en ingeniería de software
- Elegir el tamaño de un campo (8, 16, 32 o 64 bits) decide qué valores caben. El problema del año 2038 ocurre porque muchos sistemas guardan la hora como segundos desde 1970 en un entero de 32 bits con signo, que se agota el 19 de enero de 2038.
- Las direcciones IP, los permisos de archivos de Unix («chmod 755») y los colores web se leen en binario, octal o hexadecimal.
- Petzold, en *Code* (1999), muestra que no hay magia: con interruptores y la idea de posición se construye todo lo demás.`,
  checks: [
    ['¿Cuántos bits necesitas como mínimo para dar un código único a 300 vehículos? Explica el cálculo.', '9 bits. Con 8 bits solo hay 2^8 = 256 combinaciones, que no alcanzan; con 9 hay 512. En general se necesitan ⌈log2 N⌉ bits.'],
    ['¿Por qué convertir de binario a hexadecimal es más fácil que convertir de binario a decimal?', 'Porque 16 es potencia de 2 (2^4): cada grupo de 4 bits se traduce a un dígito hex de forma independiente. Con decimal no existe esa correspondencia y hay que sumar potencias.'],
    ['¿Qué hace la operación «x << 3» con un entero positivo y por qué?', 'Lo multiplica por 8 (2^3), porque cada desplazamiento a la izquierda mueve los bits a posiciones que valen el doble.'],
    ['¿Por qué 0.1 no puede guardarse exactamente en binario?', 'Porque 1/10 tiene un factor 5 en el denominador, y en base 2 solo terminan las fracciones cuyo denominador es potencia de 2. Su desarrollo binario es periódico, así que se corta y se redondea.'],
    ['Un disco dice 500 GB y el sistema muestra 465 GiB. ¿Se perdió espacio?', 'No. El fabricante usa 500 × 10^9 bytes; el sistema divide entre 1024^3 y muestra unos 465.7 GiB. Es la misma cantidad expresada con distinto prefijo.']
  ],
  cites: ['Petzold, C. (1999). *Code: The Hidden Language of Computer Hardware and Software*. Microsoft Press (2.ª ed., 2022).', 'Shannon, C. E. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal*, 27.', 'Bryant, R. y O\'Hallaron, D. (2016). *Computer Systems: A Programmer\'s Perspective* (3.ª ed.). Pearson. Capítulo 2.', 'Leibniz, G. W. (1703). *Explication de l\'Arithmétique Binaire*. Mémoires de l\'Académie Royale des Sciences.'],
  project: { t: 'Conversor universal de bases',
    goal: 'Programar a mano (sin toString ni parseInt) las conversiones entre bases 2, 8, 10 y 16, mostrando los pasos como lo harías en papel.',
    steps: ['Escribe aDecimal(texto, base) recorriendo los dígitos y acumulando «valor = valor × base + dígito».', 'Escribe desdeDecimal(n, base) con divisiones sucesivas, guardando los residuos.', 'Agrega conversión directa binario ↔ hexadecimal agrupando de 4 en 4.', 'Muestra los pasos intermedios (divisiones o sumas de potencias) para que un compañero pueda seguirlos.', 'Prueba tu función contra toString y parseInt con 1000 números aleatorios.'],
    deliver: 'Un archivo conversor.js con pruebas automáticas y una página sencilla donde se elige la base de origen y destino.' },
  hito: ['Crea la carpeta «patioapp/» con un README que describa el sistema: registrar los vehículos que entran, se revisan y salen de un patio.', 'Escribe «estados.js» que guarde el estado de una unidad (lavada, revisada, con daños, vendida) como banderas de bits en un solo número, con funciones activar, desactivar y tiene.']
});

X('m1.data', {
  deep: `
## Dato = bits + interpretación
Bryant y O'Hallaron lo resumen en el capítulo 2 de *Computer Systems: A Programmer's Perspective*: una secuencia de bits no tiene significado propio; el **tipo** es el acuerdo que dice cómo leerla. Los mismos 32 bits pueden ser un entero, un número con decimales, cuatro letras o una instrucción de máquina.

## Enteros: rangos que debes saber de memoria
| Tipo | Sin signo | Con signo (complemento a dos) |
| 8 bits | 0 a 255 | −128 a 127 |
| 16 bits | 0 a 65 535 | −32 768 a 32 767 |
| 32 bits | 0 a 4 294 967 295 | −2 147 483 648 a 2 147 483 647 |
| 64 bits | 0 a 1.8 × 10^19 | ±9.2 × 10^18 |
Con n bits y signo el rango es de −2^(n−1) a 2^(n−1) − 1. Hay un negativo más que positivos porque el cero ocupa una combinación del lado "positivo".

## Por qué ganó el complemento a dos
Hubo otras propuestas: **signo y magnitud** (un bit de signo y el resto el valor) y **complemento a uno** (invertir los bits). Ambas tienen dos ceros (+0 y −0) y necesitan circuitos especiales para restar. En complemento a dos el bit más significativo vale −2^(n−1), hay un solo cero y la resta es simplemente sumar el negativo. El desbordamiento se detecta cuando dos números del mismo signo producen un resultado de signo contrario.

## Números en JavaScript: un caso de estudio
JavaScript guarda todos sus «number» como flotantes de 64 bits. Eso significa que los enteros solo son exactos hasta 2^53 − 1 («Number.MAX_SAFE_INTEGER» = 9 007 199 254 740 991). Más allá, se pierden unidades:
~~~js
console.log(2 ** 53 === 2 ** 53 + 1);   // true: ya no distingue
console.log(Number.MAX_SAFE_INTEGER);
console.log(2n ** 64n);                 // BigInt: enteros de tamaño arbitrario
console.log(0.1 + 0.2 - 0.3);           // el error es diminuto, pero existe
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // comparar con tolerancia
~~~
Por eso los identificadores de 64 bits que llegan de una base de datos se tratan como texto o BigInt.

## Anatomía de un flotante (IEEE 754)
El estándar IEEE 754 (1985, revisado en 2008 y 2019) divide un «double» de 64 bits en tres partes:
:::flow Signo: 1 bit | Exponente: 11 bits | Mantisa: 52 bits
El valor es (−1)^signo × 1.mantisa × 2^(exponente − 1023). Hay valores especiales: **Infinity** (división entre cero), **NaN** (resultados indefinidos como 0/0; ¡NaN no es igual ni a sí mismo!) y **−0**. William Kahan, principal arquitecto del estándar, recibió el Premio Turing en 1989 por este trabajo. David Goldberg escribió en 1991 el artículo de referencia, *What Every Computer Scientist Should Know About Floating-Point Arithmetic*, donde explica por qué el redondeo es inevitable y cómo controlarlo.

Consecuencias prácticas:
- La precisión es **relativa**: cerca de 1 hay unos 15 a 17 dígitos decimales significativos; con números enormes, la distancia entre flotantes vecinos crece.
- Sumar muchos números pequeños a uno grande pierde información; sumar de menor a mayor reduce el error.
- Para dinero se usan enteros en la unidad mínima (céntimos) o tipos decimales como «DECIMAL» en SQL.

## Texto: de ASCII a Unicode
ASCII (1963) usa 7 bits y solo cubre el inglés. Unicode asigna un **punto de código** a cada carácter, de U+0000 a U+10FFFF: la «ñ» es U+00F1 y el emoji 😀 es U+1F600. Unicode no dice cómo guardar esos números; de eso se encargan las codificaciones:
- **UTF-8**, diseñada por Ken Thompson y Rob Pike en 1992, usa de 1 a 4 bytes y es compatible con ASCII. Es la codificación dominante en la web.
- **UTF-16**, usada internamente por JavaScript y Java, usa 2 o 4 bytes. Por eso «"😀".length» vale 2 en JavaScript: cuenta unidades de 16 bits, no caracteres.
~~~js
const t = "Año 😀";
console.log(t.length);                          // unidades UTF-16
console.log([...t].length);                     // caracteres reales
console.log(new TextEncoder().encode(t).length); // bytes en UTF-8
~~~

## Orden de bytes
Un entero de 4 bytes puede guardarse empezando por el byte más significativo (**big-endian**, usado en los protocolos de red) o por el menos significativo (**little-endian**, usado por x86 y la mayoría de procesadores ARM). Danny Cohen popularizó estos nombres en 1980, en su ensayo *On Holy Wars and a Plea for Peace*, tomándolos de *Los viajes de Gulliver*.

## Imágenes y sonido también son números
Una imagen es una matriz de píxeles; cada píxel en RGB usa 3 bytes (rojo, verde y azul de 0 a 255). El sonido se **muestrea**: el teorema de muestreo de Nyquist y Shannon indica que hay que tomar muestras a más del doble de la frecuencia más alta. Por eso el audio de CD usa 44 100 muestras por segundo, suficiente para el oído humano (hasta unos 20 000 Hz).`,
  checks: [
    ['¿Cuál es el rango de un entero con signo de 16 bits y por qué no es simétrico?', 'De −32 768 a 32 767. El cero ocupa una de las combinaciones con el bit de signo en 0, así que del lado positivo queda un valor menos.'],
    ['¿Por qué «NaN === NaN» es falso en JavaScript?', 'Porque IEEE 754 define que NaN (no es un número) no es igual a ningún valor, ni a sí mismo. Para detectarlo se usa Number.isNaN.'],
    ['Un sistema guarda precios como flotantes y al sumar 1000 ventas el total difiere en céntimos del contador. ¿Qué cambiarías?', 'Guardar los montos como enteros en céntimos (o un tipo DECIMAL en la base de datos) y convertir a soles solo al mostrarlos. Los flotantes binarios no representan exactamente fracciones decimales.'],
    ['¿Por qué un texto puede tener 5 caracteres pero ocupar 7 bytes?', 'Porque en UTF-8 los caracteres fuera de ASCII usan más de un byte: la «ñ» o la «á» ocupan 2, y muchos emojis 4.'],
    ['¿Cuándo te afecta el orden de bytes (endianness) como programador?', 'Al leer o escribir archivos binarios, al enviar datos por la red o al comunicarte con hardware: si emisor y receptor usan órdenes distintos y nadie convierte, los números llegan alterados.']
  ],
  cites: ['Bryant, R. y O\'Hallaron, D. (2016). *Computer Systems: A Programmer\'s Perspective* (3.ª ed.). Pearson. Capítulo 2.', 'Goldberg, D. (1991). What Every Computer Scientist Should Know About Floating-Point Arithmetic. *ACM Computing Surveys*, 23(1).', 'IEEE (2019). *IEEE 754-2019: Standard for Floating-Point Arithmetic*.', 'Cohen, D. (1980). On Holy Wars and a Plea for Peace. *IEEE Computer*, 14(10), 1981.', 'The Unicode Consortium. *The Unicode Standard*. unicode.org.'],
  project: { t: 'Inspector de bytes',
    goal: 'Construir una herramienta que muestre cómo se guarda realmente cualquier dato: texto, enteros y decimales.',
    steps: ['Para un texto, lista cada carácter con su punto de código (codePointAt) y sus bytes UTF-8 (TextEncoder) en hexadecimal.', 'Para un entero entre −128 y 127, muestra su complemento a dos en 8 bits calculado a mano.', 'Para un decimal, usa DataView con setFloat64 para mostrar los 64 bits separados en signo, exponente y mantisa.', 'Marca en rojo los casos peligrosos: enteros mayores que MAX_SAFE_INTEGER y decimales que no son exactos.'],
    deliver: 'Una página web con tres pestañas (texto, entero, decimal) y un README con cinco ejemplos que te sorprendieron.' },
  hito: ['Agrega a PatioApp el precio de cada unidad guardado en céntimos enteros y una función formatearSoles(centimos) que devuelva «S/ 1 234.50».', 'Valida la placa: exactamente 6 caracteres alfanuméricos en mayúscula, comprobando además su tamaño en bytes con TextEncoder.']
});

X('m1.logic', {
  deep: `
## De la filosofía a los circuitos
George Boole publicó en 1854 *An Investigation of the Laws of Thought*, donde trató el razonamiento como un álgebra con dos valores. Durante 80 años fue matemática pura, hasta que Claude Shannon, en su tesis de maestría en el MIT (*A Symbolic Analysis of Relay and Switching Circuits*, 1938), mostró que esa álgebra describe exactamente los circuitos con relés. Desde entonces, diseñar hardware es, en buena parte, simplificar expresiones booleanas.

## Las leyes del álgebra de Boole
| Ley | Con AND (·) | Con OR (+) |
| Identidad | A · 1 = A | A + 0 = A |
| Anulación | A · 0 = 0 | A + 1 = 1 |
| Idempotencia | A · A = A | A + A = A |
| Complemento | A · ¬A = 0 | A + ¬A = 1 |
| Absorción | A · (A + B) = A | A + A · B = A |
| Distributiva | A · (B + C) = A·B + A·C | A + B·C = (A + B)(A + C) |
| De Morgan | ¬(A · B) = ¬A + ¬B | ¬(A + B) = ¬A · ¬B |
Fíjate en la segunda distributiva: OR se distribuye sobre AND, algo que no pasa con la suma y la multiplicación comunes.

## De una tabla de verdad a una expresión
Cualquier tabla de verdad se convierte en expresión con la **suma de productos**: por cada fila donde la salida es 1, escribe un AND de las entradas (negando las que valen 0) y une todo con OR. Por ejemplo, XOR vale 1 en las filas (0,1) y (1,0), así que XOR = ¬A·B + A·¬B. Luego se simplifica con las leyes o con un **mapa de Karnaugh** (Maurice Karnaugh, 1953), que agrupa visualmente las filas vecinas.

## Compuertas universales
NAND sola puede construir cualquier otra compuerta: NOT A = A NAND A; A AND B = NOT(A NAND B); A OR B = (NOT A) NAND (NOT B). Lo mismo vale para NOR. Nisan y Schocken construyen una computadora entera a partir de NAND en *The Elements of Computing Systems*, el libro detrás del curso Nand2Tetris.

## Sumadores
- **Medio sumador:** suma = A XOR B; acarreo = A AND B.
- **Sumador completo:** suma tres bits (A, B y el acarreo que llega): suma = A XOR B XOR Cin; Cout = A·B + Cin·(A XOR B).
- Encadenando n sumadores completos se obtiene un **sumador de acarreo en cascada**. Es simple pero lento, porque cada bit espera el acarreo del anterior; las CPU usan sumadores con *acarreo anticipado* (carry-lookahead) para no esperar.

## Lógica combinacional y secuencial
Los circuitos **combinacionales** (sumadores, multiplexores, decodificadores) calculan su salida solo con las entradas actuales. Los **secuenciales** además recuerdan: un *latch* o un *flip-flop* guarda un bit, y un **reloj** marca cuándo se actualiza. Con flip-flops se hacen registros; con registros y lógica combinacional, una CPU. Harris y Harris desarrollan esta escalera paso a paso en *Digital Design and Computer Architecture*.

## Lógica en el código de todos los días
~~~js
// Permisos al estilo Unix: lectura 4, escritura 2, ejecución 1
const LEER = 4, ESCRIBIR = 2, EJECUTAR = 1;
const permisos = LEER | ESCRIBIR;          // 6
console.log((permisos & ESCRIBIR) !== 0);   // ¿puede escribir?
// Cortocircuito para evitar errores
const usuario = null;
console.log(usuario && usuario.nombre);     // no falla: se detiene en null
// Valores "verdaderos" y "falsos" en JS
console.log(Boolean(0), Boolean(""), Boolean("0"), Boolean([]));
~~~
- En JavaScript, «0», «""», «null», «undefined», «NaN» y «false» son *falsy*; todo lo demás es *truthy*, incluso «"0"» y «[]». Confundirlo es una fuente clásica de errores.
- Usa De Morgan para que las condiciones se lean en positivo: «!(sinStock || bloqueado)» es más claro como «hayStock && !bloqueado».
- Una condición con muchos AND y OR merece una tabla de verdad en las pruebas: con 4 variables son solo 16 casos, y probarlos todos es barato.`,
  checks: [
    ['Escribe XOR usando solo AND, OR y NOT.', 'A XOR B = (A AND NOT B) OR (NOT A AND B). Sale de la suma de productos de las filas donde vale 1.'],
    ['Simplifica «A OR (A AND B)» y justifica la respuesta.', 'Es A, por la ley de absorción: si A es verdadero el resultado es verdadero; si A es falso, A AND B también es falso.'],
    ['¿Por qué se dice que NAND es universal?', 'Porque con solo NAND se pueden construir NOT, AND y OR, y con esas tres se construye cualquier función booleana.'],
    ['¿Qué diferencia hay entre un circuito combinacional y uno secuencial?', 'El combinacional depende solo de las entradas actuales; el secuencial tiene memoria (flip-flops) y su salida depende también de su estado anterior, actualizado con un reloj.'],
    ['¿Qué imprime «console.log([] ? "sí" : "no")» y por qué?', '«sí», porque un arreglo vacío es un objeto y todos los objetos son truthy en JavaScript.']
  ],
  cites: ['Boole, G. (1854). *An Investigation of the Laws of Thought*. Walton and Maberly.', 'Shannon, C. E. (1938). A Symbolic Analysis of Relay and Switching Circuits. *Transactions of the AIEE*, 57(12).', 'Nisan, N. y Schocken, S. (2021). *The Elements of Computing Systems* (2.ª ed.). MIT Press.', 'Harris, S. y Harris, D. (2021). *Digital Design and Computer Architecture: RISC-V Edition*. Morgan Kaufmann.'],
  project: { t: 'Simulador de circuitos lógicos',
    goal: 'Construir un sumador de 8 bits usando solo una función NAND, como en Nand2Tetris.',
    steps: ['Define nand(a, b) como la única operación primitiva.', 'Construye not, and, or y xor usando solo nand y verifica sus tablas de verdad.', 'Construye el medio sumador y el sumador completo.', 'Encadena 8 sumadores completos y suma dos bytes; compara con la suma normal para todos los pares de 0 a 255 (65 536 casos).', 'Genera automáticamente la tabla de verdad de cualquier función de hasta 4 entradas.'],
    deliver: 'Un archivo circuitos.js con pruebas que recorran todas las combinaciones y una explicación de cuántas compuertas NAND usa tu sumador.' },
  hito: ['Agrega la regla de entrega: una unidad puede entregarse si está revisada, no tiene daños y (está pagada o tiene autorización del supervisor). Escribe puedeEntregar(unidad).', 'Prueba puedeEntregar con las 16 combinaciones de sus 4 condiciones (tabla de verdad completa) y reescribe la condición con De Morgan comprobando que ambas versiones coinciden.']
});

X('m1.cpu', {
  deep: `
## La arquitectura de Von Neumann
En 1945 John von Neumann describió, en el *First Draft of a Report on the EDVAC*, una máquina con unidad de cálculo, unidad de control, memoria y entrada/salida, donde **programa y datos comparten la misma memoria**. Esa idea del programa almacenado permite que un programa cree o cargue otros programas (compiladores, sistemas operativos). La alternativa, la **arquitectura Harvard**, separa memoria de instrucciones y de datos; hoy se combina con la de Von Neumann: las CPU tienen cachés separadas para instrucciones y datos, pero una sola memoria principal.

## El conjunto de instrucciones (ISA)
La ISA es el contrato entre el software y el hardware: qué instrucciones existen, cuántos registros hay y cómo se direcciona la memoria. x86-64 (Intel y AMD) es una ISA de tipo CISC, con muchas instrucciones complejas; ARM y RISC-V son de tipo RISC, con instrucciones simples y regulares. Patterson y Hennessy, creadores de las ideas RISC, recibieron el Premio Turing en 2017 por ese trabajo. Profundizarás en el módulo de arquitectura de computadoras.

## La ecuación del rendimiento
Patterson y Hennessy, en *Computer Organization and Design*, resumen el tiempo de ejecución así:
~~~txt
Tiempo = Instrucciones × Ciclos por instrucción (CPI) × Duración de un ciclo
Ejemplo: 2 × 10^9 instrucciones × 1.5 CPI / 3 GHz = 1 segundo
~~~
Para ir más rápido puedes ejecutar menos instrucciones (mejor algoritmo o compilador), gastar menos ciclos por instrucción (mejor diseño de CPU) o acortar el ciclo (más GHz). Comparar procesadores solo por sus GHz ignora los otros dos factores.

## La ley de Moore y el muro de la potencia
Gordon Moore observó en 1965 que la cantidad de transistores en un chip se duplicaba a un ritmo constante (luego lo fijó en unos dos años). Durante décadas eso también hizo crecer la frecuencia. Hacia 2005 la frecuencia se estancó: más GHz significaba más calor del que se podía disipar. La industria respondió con **varios núcleos** por chip, y desde entonces el software solo aprovecha el hardware nuevo si sabe trabajar en paralelo. Es la razón de fondo del módulo de concurrencia.

## El muro de la memoria y la caché
Wulf y McKee advirtieron en 1995 (*Hitting the Memory Wall*) que la CPU mejoraba mucho más rápido que la RAM. Hoy un acceso a RAM cuesta cientos de ciclos. La solución es la **caché**, que aprovecha dos tipos de localidad:
- **Temporal:** lo que usaste hace poco probablemente lo vuelvas a usar (una variable dentro de un bucle).
- **Espacial:** si usaste una dirección, probablemente uses las vecinas (los elementos de un arreglo).
La caché no trae bytes sueltos sino **líneas** de unos 64 bytes. Recorrer una matriz fila por fila aprovecha cada línea; recorrerla columna por columna puede ser varias veces más lento con el mismo número de operaciones.

~~~js
// Misma cantidad de sumas, distinto orden de acceso
const N = 1500, m = Array.from({ length: N }, () => new Float64Array(N).fill(1));
let t = performance.now(), s = 0;
for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) s += m[i][j];
console.log('filas', Math.round(performance.now() - t), 'ms');
t = performance.now(); s = 0;
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) s += m[i][j];
console.log('columnas', Math.round(performance.now() - t), 'ms');
~~~

## Latencias que todo programador debería conocer
Peter Norvig y Jeff Dean popularizaron una tabla de órdenes de magnitud que conviene memorizar: una referencia a caché L1 cuesta alrededor de 1 ns; un acceso a RAM, unos 100 ns; leer 1 MB secuencial de un SSD, del orden de un milisegundo; un viaje de ida y vuelta entre continentes, unos 150 ms. La lección es que **una consulta por red cuesta lo mismo que millones de operaciones en memoria**, y por eso agrupar consultas y usar cachés es tan importante en sistemas reales.

## Interrupciones y entrada/salida
La CPU no espera de brazos cruzados a que llegue una tecla o un paquete de red: el dispositivo genera una **interrupción**, la CPU guarda lo que estaba haciendo, atiende el evento y luego continúa. Este mecanismo es la base de los sistemas operativos multitarea que estudiarás más adelante.

## Arranque: del botón al programa
Al encender, la CPU ejecuta el firmware (BIOS o UEFI) guardado en una memoria no volátil. Este revisa el hardware y carga el **cargador de arranque**, que a su vez carga el núcleo del sistema operativo. Recién entonces se pueden ejecutar tus programas.`,
  checks: [
    ['¿Qué significa que en la arquitectura de Von Neumann el programa sea "almacenado"?', 'Que las instrucciones viven en la misma memoria que los datos y se pueden leer, cargar o generar como datos. Así un programa puede cargar y ejecutar otros programas.'],
    ['Un programa ejecuta 3 × 10^9 instrucciones con CPI 2 en una CPU de 2 GHz. ¿Cuánto tarda?', '3 × 10^9 × 2 / (2 × 10^9) = 3 segundos.'],
    ['¿Por qué recorrer una matriz por columnas puede ser más lento que por filas si hace las mismas operaciones?', 'Porque en memoria la matriz se guarda fila por fila. Recorrer por columnas salta entre líneas de caché distintas y desaprovecha la localidad espacial, provocando más fallos de caché.'],
    ['¿Por qué dejó de subir la frecuencia de las CPU alrededor de 2005 y qué consecuencia tuvo para el software?', 'Por el consumo y el calor (el muro de la potencia). Los fabricantes pasaron a varios núcleos, así que el software debe ser concurrente o paralelo para aprovecharlos.'],
    ['¿Qué ventaja tiene una interrupción frente a revisar continuamente si llegó un dato?', 'La CPU no desperdicia ciclos preguntando (espera activa): sigue con otro trabajo y el dispositivo la avisa solo cuando hay algo que atender.']
  ],
  cites: ['von Neumann, J. (1945). *First Draft of a Report on the EDVAC*. University of Pennsylvania.', 'Patterson, D. y Hennessy, J. (2017). *Computer Organization and Design: RISC-V Edition*. Morgan Kaufmann. Capítulo 1.', 'Moore, G. E. (1965). Cramming more components onto integrated circuits. *Electronics*, 38(8).', 'Wulf, W. y McKee, S. (1995). Hitting the Memory Wall: Implications of the Obvious. *ACM SIGARCH Computer Architecture News*, 23(1).'],
  project: { t: 'Una CPU de juguete',
    goal: 'Programar un intérprete de un lenguaje ensamblador mínimo para ver el ciclo buscar-decodificar-ejecutar en acción.',
    steps: ['Define la memoria como un arreglo de 64 posiciones, dos registros (A y B) y un contador de programa (PC).', 'Implementa las instrucciones LOAD, STORE, ADD, SUB, JMP, JZ (salta si A es cero) y HALT.', 'Ejecuta el ciclo mostrando en cada paso el PC, la instrucción y los registros.', 'Escribe en tu ensamblador un programa que multiplique dos números mediante sumas repetidas.', 'Cuenta los ciclos ejecutados y calcula cuánto tardaría tu programa en una CPU de 1 GHz con CPI = 1.'],
    deliver: 'Un archivo cpu.js, dos programas de ejemplo y una traza impresa de su ejecución.' },
  hito: ['Crea una lista de 1 000 000 de registros de prueba de unidades y mide con performance.now cuánto tarda recorrerla en orden y en orden aleatorio.', 'Documenta en el README el resultado y explícalo con la localidad de la caché.']
});
})();
