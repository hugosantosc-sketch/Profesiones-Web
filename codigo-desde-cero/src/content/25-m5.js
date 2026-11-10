/* ===== MÓDULO 5 — Del pseudocódigo al código real ===== */
CDC.registrar({
  id: 'm5',
  nivel: 'Intermedio',
  titulo: 'Del pseudocódigo al código real',
  resumen: 'La misma lógica traducida a Python, JavaScript y C, con lo que cambia de verdad: tipos, memoria, colecciones y excepciones.',
  intro: '<p>Todo lo que has diseñado en pseudocódigo se traduce casi mecánicamente a cualquier lenguaje. Este módulo ' +
    'pone las tres traducciones lado a lado para que veas qué es <em>esencial</em> (la lógica) y qué es ' +
    '<em>accidental</em> (la sintaxis). Al final deberías poder leer código en un lenguaje que no conoces y entender ' +
    'qué hace.</p><p>La <a href="#herramientas">consola JavaScript</a> del laboratorio te permite ejecutar los ' +
    'ejemplos de JS al instante, sin instalar nada.</p>',
  temas: [

    {
      id: 'm5-1',
      titulo: 'Anatomía de un programa en tres lenguajes',
      resumen: 'El mismo algoritmo en Python, JavaScript y C, línea por línea, y por qué cada uno se ve así.',
      objetivos: [
        'Leer la estructura básica de un programa en Python, JavaScript y C',
        'Identificar qué partes son lógica y qué partes son ceremonia del lenguaje',
        'Elegir un primer lenguaje con criterio'
      ],
      lectura: `
<p>Traduzcamos el mismo algoritmo —leer dos números, mostrar su promedio y decir si aprueba— a tres lenguajes muy
distintos. Lo importante no es la sintaxis: es ver que la <strong>estructura es idéntica</strong>.</p>

<h3>El pseudocódigo de partida</h3>
${cod('pseudo', `Algoritmo Promedio
	Definir a, b, prom Como Real
	Escribir "Primera nota:"
	Leer a
	Escribir "Segunda nota:"
	Leer b
	prom <- (a + b) / 2
	Escribir "Promedio: ", prom
	Si prom >= 11 Entonces
		Escribir "Aprobado"
	Sino
		Escribir "Desaprobado"
	FinSi
FinAlgoritmo`)}

<h3>Python</h3>
${cod('python', `a = float(input("Primera nota: "))
b = float(input("Segunda nota: "))
prom = (a + b) / 2
print(f"Promedio: {prom:.2f}")
if prom >= 11:
    print("Aprobado")
else:
    print("Desaprobado")`)}

<h3>JavaScript (en Node.js, con datos ya disponibles)</h3>
${cod('js', `const a = 14, b = 17;                  // en el navegador vendrían de un formulario
const prom = (a + b) / 2;
console.log(\`Promedio: \${prom.toFixed(2)}\`);
if (prom >= 11) {
  console.log("Aprobado");
} else {
  console.log("Desaprobado");
}`)}

<h3>C</h3>
${cod('c', `#include <stdio.h>

int main(void) {
    double a, b, prom;
    printf("Primera nota: ");
    scanf("%lf", &a);
    printf("Segunda nota: ");
    scanf("%lf", &b);
    prom = (a + b) / 2;
    printf("Promedio: %.2f\\n", prom);
    if (prom >= 11) {
        printf("Aprobado\\n");
    } else {
        printf("Desaprobado\\n");
    }
    return 0;
}`)}

<h2>Qué cambia y qué no</h2>
${tabla(['Aspecto', 'Pseudocódigo', 'Python', 'JavaScript', 'C'], [
  ['Declarar variables', 'obligatorio', 'no hace falta', 'recomendado (<code>const</code>/<code>let</code>)', 'obligatorio, con tipo'],
  ['Delimitar bloques', '<code>FinSi</code>', 'indentación', 'llaves <code>{ }</code>', 'llaves <code>{ }</code>'],
  ['Fin de instrucción', 'salto de línea', 'salto de línea', 'punto y coma (opcional)', 'punto y coma obligatorio'],
  ['Comparar', '<code>=</code>', '<code>==</code>', '<code>===</code>', '<code>==</code>'],
  ['Asignar', '<code>←</code>', '<code>=</code>', '<code>=</code>', '<code>=</code>'],
  ['Mostrar', '<code>Escribir</code>', '<code>print()</code>', '<code>console.log()</code>', '<code>printf()</code>'],
  ['Punto de entrada', '<code>Algoritmo</code>', 'la primera línea', 'la primera línea', '<code>int main()</code>'],
  ['Compilar', 'no', 'no (se interpreta)', 'no (JIT)', 'sí, antes de ejecutar']
], 'Ocho diferencias de forma. La lógica —leer, calcular, decidir, mostrar— es la misma en los cuatro.')}

<h2>Por qué cada lenguaje se ve así</h2>

<p><strong>Python</strong> elimina toda la ceremonia posible: no declara tipos, usa indentación en lugar de llaves y no
necesita punto y coma. La indentación obligatoria tiene una consecuencia interesante: en Python <em>no se puede</em>
escribir código mal indentado, porque la indentación <em>es</em> la estructura. Por eso es el lenguaje recomendado para
empezar: la distancia entre el pseudocódigo y el código real es mínima.</p>

<p><strong>JavaScript</strong> nació en 1995 para hacer páginas interactivas y hoy corre en todas partes. Es el único
lenguaje que ejecutan los navegadores, lo que le da una posición única. Su sintaxis de llaves viene de C, y su
peculiaridad es que corre en un entorno <strong>asíncrono</strong>: muchas operaciones (pedir datos a un servidor, leer
un archivo) no devuelven el resultado inmediatamente sino una promesa de resultado. Eso cambia la forma del código y es
lo que más cuesta al venir de otros lenguajes.</p>

<p><strong>C</strong> es de 1972 y sigue siendo el lenguaje en el que están escritos los sistemas operativos. Toda su
ceremonia tiene una razón: <code>#include</code> trae las declaraciones de las funciones que vas a usar;
<code>int main</code> es el punto donde el sistema operativo entra; <code>&amp;a</code> en el <code>scanf</code> pasa la
<em>dirección</em> de la variable para que la función pueda escribir en ella; <code>%lf</code> le dice que ahí va un
<code>double</code>. C no esconde nada, y por eso enseña tanto y perdona tan poco.</p>

${nota('Qué lenguaje aprender primero',
  '<p><strong>Python</strong> si quieres resolver problemas y ver resultados rápido: análisis de datos, automatización, ' +
  'scripts, inteligencia artificial. <strong>JavaScript</strong> si quieres hacer cosas que la gente pueda abrir en un ' +
  'navegador: páginas, aplicaciones web, y también servidores con Node. <strong>C</strong> si quieres entender la ' +
  'máquina de verdad; no es el mejor primer lenguaje, pero es el mejor segundo.</p>' +
  '<p>Y lo más importante: el segundo lenguaje cuesta una décima parte del primero, porque lo que estás aprendiendo ' +
  'en este curso no es sintaxis, es a programar.</p>', 'key')}

<h2>Un detalle que importa: la lectura de datos</h2>
<p>En pseudocódigo <code>Leer x</code> es una instrucción. En los lenguajes reales, leer de un humano es sorprendentemente
engorroso, y vale la pena saber por qué:</p>
<ul>
  <li><strong>Python:</strong> <code>input()</code> siempre devuelve <strong>texto</strong>. Hay que convertirlo con
  <code>int()</code> o <code>float()</code>, y eso puede fallar si el usuario escribe «abc».</li>
  <li><strong>C:</strong> <code>scanf</code> necesita saber el tipo exacto (<code>%d</code>, <code>%lf</code>,
  <code>%s</code>) y la dirección de la variable. Si el formato no coincide con lo que escribe el usuario, el programa
  puede quedar en un estado inconsistente.</li>
  <li><strong>JavaScript:</strong> en el navegador no hay «leer de la consola»: los datos llegan de un formulario o de
  una petición de red, y eso es asíncrono.</li>
</ul>
<p>Por eso en este curso los ejercicios del laboratorio reciben las entradas de un panel: te deja concentrarte en la
lógica, que es lo que se traslada, y no en la ceremonia de entrada y salida, que es distinta en cada entorno.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Traduce a los tres',
          enunciado: 'Traduce este pseudocódigo a Python, JavaScript y C: <br><code>Definir n Como Entero</code><br><code>Leer n</code><br><code>Si n MOD 2 = 0 Entonces Escribir "par" Sino Escribir "impar" FinSi</code>',
          pista: 'MOD es % en los tres lenguajes. Cuidado con == al comparar.',
          solucion: `${cod('python', `n = int(input("Número: "))
if n % 2 == 0:
    print("par")
else:
    print("impar")`)}
${cod('js', `const n = 7;                       // o leído de un formulario
if (n % 2 === 0) {
  console.log("par");
} else {
  console.log("impar");
}`)}
${cod('c', `#include <stdio.h>
int main(void) {
    int n;
    printf("Número: ");
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("par\\n");
    } else {
        printf("impar\\n");
    }
    return 0;
}`)}
<p>Observa que la línea que contiene la <b>lógica</b> es idéntica en los tres: <code>n % 2 == 0</code>. Todo lo demás es ceremonia del lenguaje.</p>` },
        { n: 2, titulo: 'Encuentra los errores de traducción',
          enunciado: 'Cada fragmento tiene un error típico de quien viene del pseudocódigo. Encuéntralo: <br>(a) Python: <code>if nota = 11:</code><br>(b) C: <code>if (prom >= 11) printf("ok"); printf("siempre");</code> dentro de un bloque que debía ser condicional<br>(c) Python: <code>n = input("edad: ")</code> seguido de <code>if n > 18:</code><br>(d) JavaScript: <code>if (x = 5) {...}</code>',
          pista: 'Asignación contra comparación, bloques sin delimitar, y tipos.',
          solucion: `<p><b>(a)</b> En Python <code>=</code> asigna y <code>==</code> compara. <code>if nota = 11:</code> es un error de sintaxis (Python lo detecta, afortunadamente). Correcto: <code>if nota == 11:</code></p>
<p><b>(b)</b> En C, sin llaves, el <code>if</code> solo controla <b>la instrucción siguiente</b>. El segundo <code>printf</code> se ejecuta siempre. Es el bug que causó la vulnerabilidad «goto fail» de Apple en 2014. Solución: <b>usa llaves siempre</b>, incluso para una sola instrucción.</p>
<p><b>(c)</b> <code>input()</code> devuelve texto. En Python 3, <code>"20" &gt; 18</code> lanza un <code>TypeError</code>; en Python 2 comparaba texto con número sin quejarse y daba resultados absurdos. Correcto: <code>n = int(input("edad: "))</code>, idealmente dentro de un <code>try</code>.</p>
<p><b>(d)</b> En JavaScript <code>x = 5</code> asigna y devuelve 5, que es «verdadero» (<i>truthy</i>), así que la condición <b>siempre</b> se cumple y además se destruyó el valor de <code>x</code>. Correcto: <code>if (x === 5)</code>. Es el error que los <i>linters</i> detectan y la razón por la que se recomienda activar uno desde el primer día.</p>` },
        { n: 3, titulo: 'Ejecuta en la consola',
          enunciado: 'Abre la <a href="#herramientas">consola JavaScript</a> del laboratorio y escribe un programa que calcule el promedio de un arreglo de notas, cuente cuántas aprobaron y muestre el resultado. Usa <code>console.log</code> para ver los valores intermedios.',
          pista: 'const notas = [14, 8, 17, 11, 9]; y luego un bucle for.',
          solucion: `${cod('js', `const notas = [14, 8, 17, 11, 9, 20, 6];

let suma = 0;
let aprobadas = 0;

for (let i = 0; i < notas.length; i++) {
  suma += notas[i];
  if (notas[i] >= 11) aprobadas++;
  console.log(\`nota \${i}: \${notas[i]}  (suma parcial \${suma})\`);
}

const promedio = suma / notas.length;
console.log("Promedio:", promedio.toFixed(2));
console.log(\`Aprobadas: \${aprobadas} de \${notas.length}\`);`)}
<p>Tres detalles de JavaScript que conviene notar:</p>
<ul>
<li><b>El bucle va de <code>0</code> a <code>&lt; notas.length</code></b>, no de 1 a n. Es la fuente del <i>off-by-one</i> al traducir desde pseudocódigo.</li>
<li><b><code>suma += notas[i]</code></b> es la forma corta de <code>suma = suma + notas[i]</code>, y existe en casi todos los lenguajes derivados de C.</li>
<li><b>La versión idiomática es mucho más corta:</b> <code>const suma = notas.reduce((a, b) =&gt; a + b, 0)</code> y <code>const aprobadas = notas.filter(n =&gt; n &gt;= 11).length</code>. Aprender primero el bucle explícito es correcto: cuando entiendas qué hace el bucle, las versiones cortas serán una comodidad y no magia.</li>
</ul>` },
        { n: 4, titulo: 'Lee código que no conoces',
          enunciado: 'Este código está en Go, un lenguaje que no has visto. Sin buscar nada, explica qué hace, qué estructuras de control usa y qué imprime.<br><pre>func main() {\n    datos := []int{5, 3, 8, 1, 9, 2}\n    mejor := datos[0]\n    for i := 1; i &lt; len(datos); i++ {\n        if datos[i] &gt; mejor {\n            mejor = datos[i]\n        }\n    }\n    fmt.Println("resultado:", mejor)\n}</pre>',
          pista: 'Reconoce el patrón, no la sintaxis.',
          solucion: `<p><b>Qué hace:</b> encuentra el <b>máximo</b> de un arreglo. Imprime <code>resultado: 9</code>.</p>
<p><b>Cómo lo sabes sin conocer Go:</b> reconociste el <b>patrón extremo</b> del módulo 4. La estructura es inconfundible:</p>
<ul>
<li><code>datos := []int{...}</code> declara un arreglo de enteros con valores iniciales. El <code>:=</code> declara e infiere el tipo a la vez.</li>
<li><code>mejor := datos[0]</code> inicializa el candidato con el primer elemento, exactamente como dicta el patrón.</li>
<li><code>for i := 1; i &lt; len(datos); i++</code> es el <code>for</code> de C, empezando en 1 porque el 0 ya es el candidato.</li>
<li><code>if datos[i] &gt; mejor</code> reemplaza el candidato cuando encuentra algo mejor.</li>
</ul>
<p><b>La lección del ejercicio:</b> no leíste sintaxis, reconociste un patrón. Por eso aprender el segundo lenguaje cuesta una décima parte: los patrones ya los tienes, y lo único nuevo es dónde van las llaves. Un programador con oficio puede leer código útil en un lenguaje que nunca ha escrito, y eso no es talento, es vocabulario de patrones.</p>` },
        { n: 5, titulo: 'El mismo programa, cuatro veces',
          enunciado: 'Escribe el algoritmo de la tabla de multiplicar del 7 (de 1 a 12) en pseudocódigo, Python, JavaScript y C. Luego cuenta las líneas de cada versión y explica a qué se debe la diferencia y qué conclusión <b>no</b> se debe sacar de ella.',
          pista: 'Las diferencias de longitud vienen de la ceremonia, no de la lógica.',
          lab: 'Algoritmo TablaDel7\n\tDefinir i Como Entero\n\tPara i <- 1 Hasta 12 Con Paso 1 Hacer\n\t\tEscribir "7 x ", i, " = ", 7 * i\n\tFinPara\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Algoritmo TablaDel7
	Definir i Como Entero
	Para i <- 1 Hasta 12 Con Paso 1 Hacer
		Escribir "7 x ", i, " = ", 7 * i
	FinPara
FinAlgoritmo`)}
${cod('python', `for i in range(1, 13):
    print(f"7 x {i} = {7 * i}")`)}
${cod('js', `for (let i = 1; i <= 12; i++) {
  console.log(\`7 x \${i} = \${7 * i}\`);
}`)}
${cod('c', `#include <stdio.h>
int main(void) {
    for (int i = 1; i <= 12; i++) {
        printf("7 x %d = %d\\n", i, 7 * i);
    }
    return 0;
}`)}
${tabla(['Lenguaje', '#Líneas', 'De dónde viene la diferencia'], [
  ['Python', '2', 'sin declaraciones, sin llaves, sin punto de entrada, sin <code>#include</code>'],
  ['JavaScript', '3', 'llaves del bloque'],
  ['Pseudocódigo', '6', 'declaración explícita y palabras de cierre, pensadas para enseñar'],
  ['C', '8', '<code>#include</code>, <code>main</code>, <code>return</code>, formato explícito del <code>printf</code>']
])}
<p><b>A qué se debe:</b> la lógica (un bucle de 12 vueltas y una línea de salida) es idéntica en los cuatro. Todas las líneas de diferencia son ceremonia: declaraciones de tipo, delimitadores de bloque, punto de entrada e inclusión de bibliotecas. Y el <code>range(1, 13)</code> de Python merece un comentario: el límite superior es <b>exclusivo</b>, lo que es la causa número uno de <i>off-by-one</i> al traducir pseudocódigo a Python.</p>
<p><b>La conclusión que NO se debe sacar:</b> que Python sea «mejor» por ser más corto. Las líneas de C no son desperdicio: el <code>%d</code> le dice al compilador el tipo exacto que va ahí, lo que permite que el programa compile a código máquina sin nada que decidir en ejecución y corra <b>decenas de veces más rápido</b>. Esa ceremonia es el precio del control y de la velocidad. Python paga el precio opuesto: escribes menos y cada operación cuesta más en ejecución.</p>
<p>Ningún lenguaje es mejor en abstracto; cada uno elige qué hacer fácil. La pregunta correcta nunca es «cuál es el mejor lenguaje» sino <b>«cuál es el adecuado para este problema, este equipo y este plazo»</b>.</p>` }
      ],
      quiz: [
        { p: 'En Python, los bloques se delimitan con…',
          ops: ['llaves { }', 'la indentación', 'palabras como FinSi', 'paréntesis'],
          ok: 1, exp: 'La indentación es la estructura, no una convención de estilo. Por eso en Python no se puede escribir código mal indentado.' },
        { p: 'En C, <code>if (x > 0) a(); b();</code> ejecuta <code>b()</code>…',
          ops: ['solo si x > 0', 'siempre, porque sin llaves el if controla una sola instrucción',
            'nunca', 'da error de compilación'],
          ok: 1, exp: 'Sin llaves el if solo abarca la instrucción siguiente. Es la causa del bug «goto fail» de Apple, y la razón para usar llaves siempre.' },
        { p: 'En Python, <code>input()</code> devuelve…',
          ops: ['un número si el usuario escribe un número', 'siempre texto, que hay que convertir',
            'un valor del tipo declarado', 'nada'],
          ok: 1, exp: 'Siempre devuelve una cadena. Hay que convertirla con int() o float(), y manejar el caso de que la conversión falle.' }
      ]
    },

    {
      id: 'm5-2',
      titulo: 'Tabla de equivalencias de estructuras',
      resumen: 'Todas las estructuras del curso traducidas a Python, JavaScript, C y Java, para usar como referencia.',
      objetivos: [
        'Traducir cualquier estructura de control a cuatro lenguajes',
        'Reconocer las trampas específicas de cada traducción',
        'Usar esta lección como referencia permanente'
      ],
      lectura: `
<p>Esta lección es una tabla de consulta. No hay que memorizarla: hay que saber que está aquí.</p>

<h2>Declaración y asignación</h2>
${tabla(['Pseudocódigo', 'Python', 'JavaScript', 'C', 'Java'], [
  ['<code>Definir x Como Entero</code>', '<code>x = 0</code>', '<code>let x = 0;</code>', '<code>int x;</code>', '<code>int x;</code>'],
  ['<code>Definir s Como Cadena</code>', '<code>s = ""</code>', '<code>let s = "";</code>', '<code>char s[100];</code>', '<code>String s;</code>'],
  ['<code>x &lt;- 5</code>', '<code>x = 5</code>', '<code>x = 5;</code>', '<code>x = 5;</code>', '<code>x = 5;</code>'],
  ['constante', '<code>TASA = 0.18</code>', '<code>const TASA = 0.18;</code>', '<code>#define TASA 0.18</code>', '<code>final double TASA = 0.18;</code>']
])}

<h2>Condicionales</h2>
${cod('python', `# Python
if nota >= 18:
    cat = "AD"
elif nota >= 14:
    cat = "A"
else:
    cat = "B"`)}
${cod('js', `// JavaScript
if (nota >= 18) {
  cat = "AD";
} else if (nota >= 14) {
  cat = "A";
} else {
  cat = "B";
}`)}
${cod('c', `/* C y Java son idénticos aquí */
if (nota >= 18) {
    cat = "AD";
} else if (nota >= 14) {
    cat = "A";
} else {
    cat = "B";
}`)}

<h2>Selección múltiple</h2>
${cod('python', `# Python 3.10+: match
match opcion:
    case 1: registrar()
    case 2 | 3: consultar()
    case _: print("inválida")

# Antes de 3.10, lo idiomático era un diccionario de funciones
acciones = {1: registrar, 2: consultar, 3: consultar}
acciones.get(opcion, invalida)()`)}
${cod('js', `switch (opcion) {
  case 1: registrar(); break;        // ¡el break es obligatorio!
  case 2:
  case 3: consultar(); break;
  default: console.log("inválida");
}`)}

${nota('La trampa del switch',
  '<p>En C, Java y JavaScript, si olvidas el <code>break</code> la ejecución <strong>continúa</strong> en el siguiente ' +
  'caso. Eso se llama <em>fall-through</em> y es a veces útil (para agrupar casos) y casi siempre un error. Es una de ' +
  'las trampas más antiguas de la familia C.</p>', 'warn')}

<h2>Bucle con contador</h2>
${tabla(['Pseudocódigo', 'Traducción'], [
  ['<code>Para i &lt;- 1 Hasta 10 Con Paso 1</code>', 'Python: <code>for i in range(1, 11):</code> ← el 11 es <b>exclusivo</b>'],
  ['', 'JavaScript: <code>for (let i = 1; i &lt;= 10; i++) {</code>'],
  ['', 'C / Java: <code>for (int i = 1; i &lt;= 10; i++) {</code>'],
  ['<code>Para i &lt;- 10 Hasta 1 Con Paso -1</code>', 'Python: <code>for i in range(10, 0, -1):</code>'],
  ['', 'JS/C/Java: <code>for (int i = 10; i &gt;= 1; i--) {</code>']
], 'El range() de Python excluye el límite superior: es la causa número uno de off-by-one al traducir.')}

<h2>Bucle condicional</h2>
${cod('python', `# Python: no existe do-while; se simula con while True + break
while condicion:
    ...

while True:
    dato = input()
    if dato valido:
        break`)}
${cod('js', `while (condicion) { ... }

do {
  dato = leer();
} while (!valido(dato));         // equivale a Repetir...Hasta Que`)}

<h2>Recorrer una colección</h2>
<p>Aquí aparece la mayor diferencia de estilo. El bucle con índice funciona en todos, pero cada lenguaje tiene una forma
<strong>idiomática</strong> que es más clara y más difícil de equivocar:</p>

${cod('python', `# Pseudocódigo-ish (funciona, pero no es idiomático)
for i in range(len(notas)):
    print(notas[i])

# Idiomático: recorrer los elementos
for nota in notas:
    print(nota)

# Si necesitas el índice también
for i, nota in enumerate(notas):
    print(i, nota)`)}
${cod('js', `for (let i = 0; i < notas.length; i++) console.log(notas[i]);   // clásico
for (const nota of notas) console.log(nota);                    // idiomático
notas.forEach((nota, i) => console.log(i, nota));               // funcional`)}

<p>La versión idiomática no es solo más corta: <strong>elimina una clase entera de errores</strong>, porque no hay
índice que se pueda salir de rango ni límite que se pueda escribir mal.</p>

<h2>Funciones</h2>
${cod('python', `def area_circulo(radio):
    """Devuelve el área. Pre: radio > 0"""
    return 3.14159 * radio ** 2`)}
${cod('js', `function areaCirculo(radio) {
  return Math.PI * radio ** 2;
}
const areaCirculo2 = (radio) => Math.PI * radio ** 2;   // forma corta`)}
${cod('c', `double area_circulo(double radio) {
    return 3.14159 * radio * radio;
}`)}

<h2>Arreglos y colecciones</h2>
${tabla(['Operación', 'Python', 'JavaScript', 'C'], [
  ['Crear', '<code>a = [1, 2, 3]</code>', '<code>const a = [1, 2, 3];</code>', '<code>int a[3] = {1,2,3};</code>'],
  ['Tamaño', '<code>len(a)</code>', '<code>a.length</code>', 'hay que guardarlo aparte'],
  ['Añadir al final', '<code>a.append(4)</code>', '<code>a.push(4)</code>', 'no se puede: tamaño fijo'],
  ['Primer / último', '<code>a[0]</code> / <code>a[-1]</code>', '<code>a[0]</code> / <code>a[a.length-1]</code>', '<code>a[0]</code> / <code>a[n-1]</code>'],
  ['Trozo', '<code>a[1:3]</code>', '<code>a.slice(1,3)</code>', 'manual'],
  ['Ordenar', '<code>a.sort()</code>', '<code>a.sort((x,y)=&gt;x-y)</code>', '<code>qsort(...)</code>']
], 'En C el arreglo es un bloque de memoria de tamaño fijo y no sabe cuántos elementos tiene: esa información la llevas tú.')}

<p>Una trampa famosa: <code>[10, 9, 100].sort()</code> en JavaScript devuelve <code>[10, 100, 9]</code>, porque
<strong>ordena como texto</strong> por defecto. Hay que pasarle un comparador: <code>sort((a,b) =&gt; a-b)</code>.</p>

<h2>Comparación de cadenas</h2>
${tabla(['Pseudocódigo', 'Python', 'JavaScript', 'C', 'Java'], [
  ['<code>Si a = b</code>', '<code>if a == b:</code>', '<code>if (a === b)</code>', '<code>if (strcmp(a,b) == 0)</code>', '<code>if (a.equals(b))</code>']
], 'En C hay que usar strcmp porque == compararía direcciones de memoria. En Java, == compara referencias y .equals compara contenido: es el error número uno de los principiantes en Java.')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Traduce el bucle',
          enunciado: 'Traduce a Python, JavaScript y C: <code>Para i ← 1 Hasta n Con Paso 1 Hacer · suma ← suma + a[i] · FinPara</code>, teniendo en cuenta que en los tres lenguajes los arreglos empiezan en 0.',
          pista: 'El rango cambia: de 1..n pasa a 0..n−1.',
          solucion: `${cod('python', `suma = 0
for i in range(n):              # 0, 1, ..., n-1
    suma += a[i]

# idiomático:
suma = sum(a)`)}
${cod('js', `let suma = 0;
for (let i = 0; i < n; i++) {
  suma += a[i];
}
// idiomático:
const suma2 = a.reduce((acc, x) => acc + x, 0);`)}
${cod('c', `int suma = 0;
for (int i = 0; i < n; i++) {
    suma += a[i];
}`)}
<p>El cambio esencial es <code>1..n</code> → <code>0..n−1</code>. Escribir <code>i &lt;= n</code> en lugar de <code>i &lt; n</code> accede a <code>a[n]</code>, que no existe: en Python y JavaScript da un error o <code>undefined</code>, y en C lee memoria ajena en silencio.</p>` },
        { n: 2, titulo: 'Las trampas de cada lenguaje',
          enunciado: 'Explica qué está mal en cada línea y cuál es el resultado real: (a) Java: <code>if (nombre == "Ana")</code>; (b) JavaScript: <code>[10, 9, 100].sort()</code>; (c) Python: <code>for i in range(1, 10)</code> para recorrer 10 elementos; (d) C: <code>if (strcmp(a, b))</code> para comprobar si son iguales.',
          pista: 'Son cuatro trampas clásicas, una por lenguaje.',
          solucion: `<p><b>(a)</b> En Java <code>==</code> compara <b>referencias</b>, no contenido. Puede dar <code>true</code> por casualidad con literales (por la <i>caché de cadenas</i>) y <code>false</code> con cadenas construidas en ejecución, que es lo peor posible: funciona en tus pruebas y falla en producción. Correcto: <code>nombre.equals("Ana")</code>, o mejor <code>"Ana".equals(nombre)</code> para que no falle si <code>nombre</code> es nulo.</p>
<p><b>(b)</b> Devuelve <code>[10, 100, 9]</code>. El <code>sort()</code> de JavaScript convierte los elementos a <b>texto</b> y los ordena alfabéticamente: "10" &lt; "100" &lt; "9". Correcto: <code>sort((a, b) =&gt; a - b)</code>.</p>
<p><b>(c)</b> <code>range(1, 10)</code> produce 1..9, que son <b>9</b> valores, y además se salta el índice 0. Para recorrer 10 elementos: <code>range(10)</code> (0..9) o <code>range(1, 11)</code> si de verdad quieres 1..10.</p>
<p><b>(d)</b> <code>strcmp</code> devuelve <b>0 cuando son iguales</b> (y un valor negativo o positivo según el orden). En C, 0 es falso, así que <code>if (strcmp(a,b))</code> entra justo cuando las cadenas son <b>distintas</b>: la condición está invertida. Correcto: <code>if (strcmp(a,b) == 0)</code>.</p>
<p>Las cuatro tienen algo en común: <b>el programa no da error, da un resultado equivocado</b>. Son errores de lógica, los del módulo 0.</p>` },
        { n: 3, titulo: 'Del pseudocódigo a Python idiomático',
          enunciado: 'Traduce este algoritmo a Python dos veces: una traducción literal con índices y otra idiomática. Compara.<br><code>cuantos ← 0</code><br><code>Para i ← 1 Hasta n Hacer · Si nota[i] >= 11 Entonces cuantos ← cuantos + 1 FinSi · FinPara</code>',
          pista: 'La versión idiomática usa una comprensión de lista o sum con una condición.',
          solucion: `${cod('python', `# Traducción literal: correcta, y la que debes saber escribir
cuantos = 0
for i in range(len(notas)):
    if notas[i] >= 11:
        cuantos += 1

# Más cerca de Python: recorrer elementos, no índices
cuantos = 0
for nota in notas:
    if nota >= 11:
        cuantos += 1

# Idiomático: contar directamente
cuantos = sum(1 for nota in notas if nota >= 11)

# También idiomático y muy legible
cuantos = len([n for n in notas if n >= 11])`)}
<p><b>Comparación:</b> las cuatro versiones hacen lo mismo. La primera es la más fácil de traducir desde el pseudocódigo y la más fácil de equivocar (índices, rangos). La tercera y la cuarta expresan la <b>intención</b> («cuenta los que cumplen») en lugar del mecanismo, y no tienen índices que puedan fallar.</p>
<p><b>Mi recomendación mientras aprendes:</b> escribe primero la versión con bucle explícito, compruébala, y luego reescríbela en la forma idiomática. Así entiendes qué hace la versión corta en lugar de copiarla. Las construcciones idiomáticas son herramientas magníficas cuando sabes qué hay debajo, y una fuente de confusión cuando no.</p>
<p>La diferencia entre <code>sum(1 for ...)</code> y <code>len([... ])</code> es que el primero no construye la lista intermedia: con un millón de elementos, el segundo gasta memoria para nada. Detalles como este son los que separan código que funciona de código que escala.</p>` },
        { n: 4, titulo: 'Traduce una función completa',
          enunciado: 'Traduce a Python, JavaScript y C la función <code>esPrimo(n)</code> del módulo 3 (la que comprueba divisores hasta la raíz), con sus validaciones. Prueba la versión JavaScript en la consola del laboratorio.',
          pista: 'd*d <= n evita calcular la raíz, y el return temprano simplifica el código.',
          solucion: `${cod('python', `def es_primo(n):
    """Devuelve True si n es primo. Pre: n es entero."""
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False      # salida temprana: un divisor basta
        d += 1
    return True`)}
${cod('js', `function esPrimo(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

// prueba: los primos hasta 50
const primos = [];
for (let i = 2; i <= 50; i++) if (esPrimo(i)) primos.push(i);
console.log(primos.join(" "));`)}
${cod('c', `#include <stdbool.h>

bool es_primo(long n) {
    if (n < 2) return false;
    for (long d = 2; d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}`)}
<p>Compara con la versión en pseudocódigo del módulo 3, que necesitaba una bandera <code>esP</code> y un <code>Mientras … Y esP</code>. Aquí el <code>return</code> temprano hace ese trabajo: en cuanto se encuentra un divisor, la función termina. <b>El <code>return</code> dentro de un bucle es la forma idiomática del «salir en cuanto se sepa la respuesta»</b> y produce código más corto y más claro que la bandera.</p>
<p>Detalle de C: <code>long</code> en lugar de <code>int</code> para que <code>d * d</code> no desborde con números grandes. Con <code>int</code> de 32 bits y n cercano a 2 mil millones, <code>d*d</code> desborda y el bucle se comporta de forma impredecible: el módulo 1 aplicado a un caso real.</p>` },
        { n: 5, titulo: 'Lee y traduce código ajeno',
          enunciado: 'Este código Python hace algo útil. (a) Explica qué hace. (b) Tradúcelo a pseudocódigo. (c) Tradúcelo a JavaScript. (d) Di qué pasa si la lista está vacía y arréglalo.<br><pre>def f(xs):\n    r = {}\n    for x in xs:\n        k = x.strip().lower()\n        r[k] = r.get(k, 0) + 1\n    return max(r, key=r.get)</pre>',
          pista: 'r es un diccionario de frecuencias. El patrón es el casillero del módulo 4.',
          solucion: `<p><b>(a) Qué hace:</b> recibe una lista de cadenas, normaliza cada una (quita espacios de los extremos y pasa a minúsculas), cuenta cuántas veces aparece cada valor normalizado, y devuelve <b>el más frecuente</b>. Es el patrón <b>casillero + extremo</b> del módulo 4, con un diccionario en lugar de un arreglo porque las claves son texto.</p>
<p>Línea por línea: <code>r = {}</code> crea el diccionario vacío; <code>r.get(k, 0)</code> devuelve el contador actual o 0 si la clave no existe (esto evita el error de «clave inexistente»); <code>max(r, key=r.get)</code> devuelve la clave cuyo valor asociado es máximo.</p>
<p><b>(b) En pseudocódigo</b> (con arreglos paralelos, porque no tenemos diccionarios):</p>
${cod('pseudo', `Funcion masFrecuente <- moda(xs, n)
	Dimension clave[1000]
	Dimension cuenta[1000]
	distintas <- 0
	Para i <- 1 Hasta n Con Paso 1 Hacer
		k <- minusculas(recortar(xs[i]))
		pos <- buscar(clave, distintas, k)      // 0 si no está
		Si pos = 0 Entonces
			distintas <- distintas + 1
			clave[distintas] <- k
			cuenta[distintas] <- 1
		Sino
			cuenta[pos] <- cuenta[pos] + 1
		FinSi
	FinPara
	// extremo sobre las frecuencias
	mejor <- 1
	Para i <- 2 Hasta distintas Con Paso 1 Hacer
		Si cuenta[i] > cuenta[mejor] Entonces  mejor <- i  FinSi
	FinPara
	masFrecuente <- clave[mejor]
FinFuncion`)}
<p>Mira cuánto más largo es: el diccionario de Python resuelve en una línea (<code>r[k] = r.get(k,0)+1</code>) lo que aquí necesita una búsqueda lineal. Y además el pseudocódigo es O(n × distintas) mientras que la versión con diccionario es O(n). Eso es exactamente lo que aporta una buena estructura de datos, y es el módulo 6.</p>
<p><b>(c) En JavaScript:</b></p>
${cod('js', `function masFrecuente(xs) {
  const r = new Map();
  for (const x of xs) {
    const k = x.trim().toLowerCase();
    r.set(k, (r.get(k) ?? 0) + 1);
  }
  let mejor = null;
  for (const [k, v] of r) {
    if (mejor === null || v > r.get(mejor)) mejor = k;
  }
  return mejor;
}`)}
<p><b>(d) Con la lista vacía</b> el diccionario queda vacío y <code>max()</code> lanza <code>ValueError: max() arg is an empty sequence</code>. Es un error de ejecución, no silencioso, lo que al menos es honesto. El arreglo:</p>
${cod('python', `def mas_frecuente(xs):
    if not xs:
        return None          # o lanzar una excepción con un mensaje claro
    r = {}
    for x in xs:
        k = x.strip().lower()
        r[k] = r.get(k, 0) + 1
    return max(r, key=r.get)`)}
<p>Y queda una ambigüedad sin resolver, como en tantos ejercicios de este curso: <b>si hay empate, ¿cuál devuelve?</b> <code>max()</code> devuelve el primero que encuentra, que en Python 3.7+ es el primero en orden de inserción. Es un comportamiento definido pero poco evidente, y si importa hay que decidirlo explícitamente en lugar de heredarlo de la implementación.</p>` }
      ],
      quiz: [
        { p: 'En Python, <code>range(1, 10)</code> produce…',
          ops: ['los números de 1 a 10', 'los números de 1 a 9, porque el límite superior es exclusivo',
            'los números de 0 a 10', 'solo el 1 y el 10'],
          ok: 1, exp: 'El límite superior de range() es exclusivo. Es la causa número uno de off-by-one al traducir pseudocódigo a Python.' },
        { p: 'En Java, comparar dos cadenas con <code>==</code>…',
          ops: ['compara su contenido', 'compara referencias, y puede dar false aunque el texto sea igual',
            'da error de compilación', 'es lo recomendado'],
          ok: 1, exp: '<code>==</code> compara referencias. Hay que usar <code>.equals()</code>. Lo peligroso es que con literales a veces funciona por la caché de cadenas, así que pasa las pruebas y falla en producción.' },
        { p: '<code>[10, 9, 100].sort()</code> en JavaScript devuelve…',
          ops: ['[9, 10, 100]', '[10, 100, 9], porque ordena como texto', '[100, 10, 9]', 'un error'],
          ok: 1, exp: 'El sort() por defecto convierte a texto y ordena alfabéticamente. Hay que pasarle un comparador: <code>sort((a,b) => a-b)</code>.' }
      ]
    },

    {
      id: 'm5-3',
      titulo: 'Tipos, memoria y ámbito en lenguajes reales',
      resumen: 'Tipado estático y dinámico, valor contra referencia, pila y montón, y por qué una lista cambia dentro de una función.',
      objetivos: [
        'Distinguir tipado estático de dinámico y fuerte de débil',
        'Predecir si una modificación dentro de una función se ve fuera',
        'Entender la diferencia entre pila y montón'
      ],
      lectura: `
<h2>Tipado: dos ejes independientes</h2>
<p>Se confunden constantemente, y son dos preguntas distintas:</p>

${tabla(['', 'Estático', 'Dinámico'], [
  ['<b>Qué es</b>', 'El tipo se conoce al compilar y no cambia', 'El tipo lo lleva el valor y se comprueba al ejecutar'],
  ['<b>Ejemplos</b>', 'C, Java, C#, Go, Rust, TypeScript', 'Python, JavaScript, Ruby, PHP'],
  ['<b>Ventaja</b>', 'Errores detectados antes de ejecutar; más rápido', 'Más flexible; menos código que escribir'],
  ['<b>Desventaja</b>', 'Más ceremonia', 'Errores de tipo aparecen en producción']
])}

${tabla(['', 'Fuerte', 'Débil'], [
  ['<b>Qué es</b>', 'No convierte tipos por su cuenta', 'Convierte implícitamente para que la operación funcione'],
  ['<b>Ejemplos</b>', 'Python, Java, C#', 'JavaScript, PHP, C (en parte)'],
  ['<b>Consecuencia</b>', '<code>"5" + 3</code> da error', '<code>"5" + 3</code> da <code>"53"</code>']
], 'Python es dinámico pero fuerte; JavaScript es dinámico y débil; Java es estático y fuerte. Las cuatro combinaciones existen.')}

<p>La tendencia moderna es interesante: los lenguajes dinámicos están añadiendo tipos opcionales (TypeScript sobre
JavaScript, anotaciones de tipo en Python) porque en proyectos grandes el valor de detectar errores antes de ejecutar
supera el costo de escribirlos. Si vas a trabajar en equipo, aprende a usarlos.</p>

<h2>Valor y referencia: el tema que más confunde</h2>
<p>Esta es, probablemente, la causa de más errores desconcertantes entre quienes ya saben programar. La regla que hay
que entender es que los lenguajes modernos pasan <strong>todo por valor</strong>, pero para los objetos ese valor
<em>es una referencia</em>.</p>

${cod('python', `def no_cambia(x):
    x = 999              # reasigna la variable LOCAL
                         # el original no se ve afectado

def si_cambia(lista):
    lista.append(999)    # MODIFICA el objeto apuntado
                         # el original sí cambia

def tampoco_cambia(lista):
    lista = [999]        # reasigna la variable local a otra lista
                         # el original no cambia

n = 5
no_cambia(n)
print(n)                 # 5

datos = [1, 2]
si_cambia(datos)
print(datos)             # [1, 2, 999]  ← ¡cambió!

otros = [1, 2]
tampoco_cambia(otros)
print(otros)             # [1, 2]  ← no cambió`)}

${nota('La regla en una frase',
  '<p><strong>Reasignar el parámetro nunca afecta al original; modificar el objeto al que apunta, sí.</strong> ' +
  'Esto vale igual en Python, JavaScript, Java y C#. En C es explícito: pasas un puntero o no lo pasas.</p>', 'key')}

<p>La consecuencia práctica más importante: si recibes una lista o un objeto y no quieres modificar el original, haz una
copia. Y al revés, si un programa «cambia datos que no debía», busca una función que recibió una colección y la
modificó.</p>

<p>La distinción separa los tipos en dos familias:</p>
<ul>
  <li><strong>Inmutables:</strong> números, booleanos, cadenas (en Python, Java, JS), tuplas. No se pueden modificar;
  cualquier «cambio» crea un valor nuevo. Son seguros de compartir.</li>
  <li><strong>Mutables:</strong> listas, diccionarios, conjuntos, objetos, arreglos. Se pueden modificar en el sitio.
  Son eficientes y peligrosos de compartir.</li>
</ul>

<h2>Pila y montón</h2>
<p>La memoria de un programa se divide en dos zonas con comportamientos muy distintos:</p>

${fig(`<svg viewBox="0 0 540 230" width="540" height="230" role="img" aria-label="Diagrama de la pila y el monton en la memoria de un programa">
<g color="var(--fg-soft)">
<rect x="20" y="20" width="200" height="190" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="120" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">PILA (stack)</text>
<rect x="36" y="56" width="168" height="34" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
<text x="120" y="77" text-anchor="middle" font-size="11" fill="var(--fg)">main: n=5, datos→</text>
<rect x="36" y="96" width="168" height="34" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
<text x="120" y="117" text-anchor="middle" font-size="11" fill="var(--fg)">calcular: i=3, t=0</text>
<rect x="36" y="136" width="168" height="34" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
<text x="120" y="157" text-anchor="middle" font-size="11" fill="var(--fg)">auxiliar: x=1</text>
<text x="120" y="192" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">crece y se vacía con las llamadas</text>
<text x="120" y="205" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">tamaño fijo · muy rápida</text>

<rect x="300" y="20" width="220" height="190" rx="8" fill="var(--surface)" stroke="var(--warm)" stroke-width="1.6"/>
<text x="410" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">MONTÓN (heap)</text>
<rect x="320" y="58" width="80" height="30" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1"/>
<text x="360" y="78" text-anchor="middle" font-size="10.5" fill="var(--fg)">[1,2,3]</text>
<rect x="420" y="58" width="80" height="30" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1"/>
<text x="460" y="78" text-anchor="middle" font-size="10.5" fill="var(--fg)">"hola"</text>
<rect x="320" y="104" width="130" height="30" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1"/>
<text x="385" y="124" text-anchor="middle" font-size="10.5" fill="var(--fg)">objeto Cliente</text>
<text x="410" y="170" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">tamaño variable · se reserva al crear</text>
<text x="410" y="186" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">lo libera el recolector de basura</text>
<text x="410" y="202" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">(o tú mismo, en C)</text>

<path d="M204 72 C250 72 260 72 318 72" stroke="var(--fg-soft)" stroke-width="1.4" fill="none" marker-end="url(#m5a)"/>
<defs><marker id="m5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
</g></svg>`, 'La variable vive en la pila; el objeto grande vive en el montón, y la variable guarda su dirección.')}

${tabla(['', 'Pila (stack)', 'Montón (heap)'], [
  ['Qué guarda', 'variables locales, parámetros, direcciones de retorno', 'objetos, listas, cadenas, todo lo de tamaño variable'],
  ['Cuándo se libera', 'automáticamente al salir de la función', 'cuando nadie lo referencia (o manualmente en C)'],
  ['Velocidad', 'muy rápida: solo mueve un puntero', 'más lenta: hay que buscar espacio'],
  ['Tamaño', 'limitado (1–8 MB típico)', 'tan grande como la memoria disponible'],
  ['Error típico', '<i>stack overflow</i> por recursión infinita', 'fuga de memoria, o <i>out of memory</i>']
])}

<p>Esto explica por qué una recursión sin caso base produce <code>StackOverflowError</code> y no «memoria agotada»: lo
que se llena es la pila de registros de activación, no el montón.</p>

<h2>Gestión de memoria: tres filosofías</h2>
<ul>
  <li><strong>Manual (C, C++).</strong> Tú pides memoria (<code>malloc</code>) y tú la devuelves (<code>free</code>).
  Máximo control y máxima responsabilidad: olvidar liberar es una <em>fuga</em>, liberar dos veces o usar algo liberado
  corrompe el programa. Las vulnerabilidades <em>use-after-free</em> vienen de aquí.</li>
  <li><strong>Recolector de basura (Java, Python, JavaScript, C#, Go).</strong> Un proceso en segundo plano detecta los
  objetos que nadie referencia y libera su memoria. Cómodo y seguro, a cambio de pausas ocasionales impredecibles, lo
  que lo descarta para sistemas de tiempo real estricto.</li>
  <li><strong>Propiedad verificada en compilación (Rust).</strong> El compilador verifica, sin ejecutar nada, que cada
  valor tenga un dueño claro y que nadie lo use después de liberarlo. Sin recolector y sin fugas, a cambio de un
  compilador exigente que hay que aprender a satisfacer. Es el enfoque más reciente y el más prometedor.</li>
</ul>

<h2>Ámbito en los lenguajes reales</h2>
<p>El concepto es el del módulo 3; los detalles varían y conviene conocer tres trampas:</p>
<ul>
  <li><strong>En JavaScript, <code>var</code> tiene ámbito de función y <code>let</code>/<code>const</code> de
  bloque.</strong> Por eso un <code>var i</code> declarado en un <code>for</code> sigue existiendo después del bucle, y
  por eso se recomienda no usar <code>var</code> nunca más.</li>
  <li><strong>En Python, asignar a una variable dentro de una función la hace local automáticamente.</strong> Si querías
  modificar una global, necesitas <code>global x</code>, y si no lo pones obtienes un
  <code>UnboundLocalError</code> desconcertante.</li>
  <li><strong>Las clausuras capturan variables, no valores.</strong> El caso clásico: crear funciones dentro de un bucle
  y descubrir que todas usan el <em>último</em> valor del contador. Con <code>let</code> en JavaScript moderno el
  problema desaparece; con <code>var</code> o en Python hay que capturar el valor explícitamente.</li>
</ul>
      `,
      ejercicios: [
        { n: 1, titulo: 'Predice el resultado',
          enunciado: 'Di qué imprime cada caso y por qué.<br>(a) <pre>def f(x): x = x + 1\nn = 5; f(n); print(n)</pre>(b) <pre>def g(l): l.append(4)\na = [1,2,3]; g(a); print(a)</pre>(c) <pre>def h(l): l = [9]\nb = [1,2]; h(b); print(b)</pre>',
          pista: 'Reasignar no afecta; modificar el objeto sí.',
          solucion: `<p><b>(a) 5.</b> <code>x = x + 1</code> reasigna la variable local. Los números son inmutables, así que no hay objeto que modificar.</p>
<p><b>(b) [1, 2, 3, 4].</b> <code>append</code> <b>modifica</b> la lista a la que apunta el parámetro, y es la misma lista que <code>a</code>.</p>
<p><b>(c) [1, 2].</b> <code>l = [9]</code> hace que la variable local apunte a una lista <b>nueva</b>. La original queda intacta: lo que se reasignó fue el nombre, no el contenido.</p>
<p>La diferencia entre (b) y (c) es la clave de todo el tema, y la causa de la mayoría de los errores de «cambió algo que no debía». Un truco mental útil: la variable es una <b>etiqueta pegada</b> a un objeto. Reasignar mueve la etiqueta; modificar cambia el objeto que tiene la etiqueta.</p>` },
        { n: 2, titulo: 'Protege el original',
          enunciado: 'Escribe una función en Python que reciba una lista de números y devuelva una nueva lista ordenada, <b>sin modificar la original</b>. Muestra dos formas y di cuál usarías.',
          pista: 'sort() modifica; sorted() devuelve una copia nueva.',
          solucion: `${cod('python', `# Forma 1: copiar y ordenar la copia
def ordenada_v1(xs):
    copia = xs[:]        # o list(xs), o xs.copy()
    copia.sort()
    return copia

# Forma 2: sorted() ya devuelve una lista nueva
def ordenada_v2(xs):
    return sorted(xs)

# Lo que NO hay que hacer si prometes no modificar:
def mala(xs):
    xs.sort()            # modifica la lista del llamador
    return xs            # y encima la devuelve, disimulando el efecto`)}
<p><b>Usaría la forma 2.</b> Es más corta, más clara, y <code>sorted()</code> existe precisamente para esto: Python ofrece deliberadamente las dos variantes, <code>lista.sort()</code> que modifica y <code>sorted(lista)</code> que copia, para que el nombre diga lo que hace.</p>
<p><b>Por qué la tercera versión es peligrosa:</b> funciona y devuelve el resultado correcto, así que pasa las pruebas. Pero dejó la lista del llamador ordenada, y si ese código dependía del orden original (por ejemplo, porque era un registro cronológico) acaba de corromperse sin ningún error. Es el bug silencioso perfecto: el efecto está a distancia del síntoma.</p>
<p><b>Advertencia sobre la copia:</b> <code>xs[:]</code> es una copia <b>superficial</b>. Si la lista contiene listas, los elementos interiores se siguen compartiendo, y modificar <code>copia[0].append(x)</code> también afecta al original. Para independencia total hace falta <code>copy.deepcopy()</code>, que es mucho más caro. Elegir entre copia superficial y profunda es una decisión consciente, no un detalle.</p>` },
        { n: 3, titulo: 'Clasifica los lenguajes',
          enunciado: 'Clasifica estos lenguajes en los dos ejes (estático/dinámico y fuerte/débil) y da un ejemplo de código que demuestre la clasificación: Python, JavaScript, Java, C, TypeScript.',
          pista: 'Estático/dinámico: ¿cuándo se comprueba el tipo? Fuerte/débil: ¿convierte sin pedirlo?',
          solucion: `${tabla(['Lenguaje', 'Eje 1', 'Eje 2', 'Demostración'], [
  ['Python', 'dinámico', 'fuerte', '<code>"5" + 3</code> → <code>TypeError</code>. El tipo se comprueba al ejecutar, pero no convierte por su cuenta.'],
  ['JavaScript', 'dinámico', 'débil', '<code>"5" + 3</code> → <code>"53"</code>; <code>"5" - 3</code> → <code>2</code>. Convierte según el operador.'],
  ['Java', 'estático', 'fuerte', '<code>int x = "hola";</code> no compila. Hay una excepción: <code>+</code> con una cadena convierte el otro operando a texto.'],
  ['C', 'estático', 'débil', '<code>int x = 3.9;</code> compila y x vale 3; un puntero se puede reinterpretar con un <i>cast</i>. Estático pero muy permisivo.'],
  ['TypeScript', 'estático', 'fuerte (al compilar)', '<code>let x: number = "5";</code> no compila. Pero en ejecución <b>es JavaScript</b>: los tipos desaparecen y la debilidad vuelve.']
])}
<p><b>El caso de TypeScript merece atención</b> porque es el más instructivo: sus tipos solo existen durante la compilación. Un dato que llega de una API en ejecución puede tener cualquier forma, y TypeScript no lo comprueba: el tipo que declaraste es una <i>promesa</i>, no una garantía. Por eso en los bordes del sistema (donde entran datos externos) hay que validar en ejecución, exactamente como dijimos en el módulo 4. Los tipos estáticos protegen de tus propios errores, no de los datos del mundo.</p>` },
        { n: 4, titulo: 'Pila o montón',
          enunciado: 'Para este código en C, di qué vive en la pila y qué en el montón, y encuentra el error.<br><pre>int* crear(int n) {\n    int local = n * 2;\n    int* arr = malloc(n * sizeof(int));\n    for (int i = 0; i &lt; n; i++) arr[i] = i;\n    return &amp;local;\n}</pre>',
          pista: 'Piensa qué pasa con las variables locales al salir de la función.',
          solucion: `<p><b>En la pila:</b> el parámetro <code>n</code>, la variable <code>local</code>, el puntero <code>arr</code> (la variable que guarda la dirección) y el índice <code>i</code>.</p>
<p><b>En el montón:</b> el bloque de <code>n</code> enteros que reservó <code>malloc</code>.</p>
<p><b>Error 1 (grave):</b> <code>return &amp;local;</code> devuelve la dirección de una variable <b>de la pila</b>. Al salir de la función ese espacio se libera y se reutilizará en la siguiente llamada, así que el puntero devuelto apunta a basura. Es un <i>dangling pointer</i>, y lo peor es que suele «funcionar» en pruebas pequeñas y fallar de forma impredecible después. Los compiladores modernos avisan de este caso concreto.</p>
<p><b>Error 2:</b> el arreglo del montón se reserva, se llena… y se pierde, porque la función devuelve otra cosa. Nadie guarda su dirección, así que nunca se podrá liberar: es una <b>fuga de memoria</b>.</p>
<p><b>Error 3:</b> no se comprueba si <code>malloc</code> devolvió <code>NULL</code> (memoria agotada). Escribir en un puntero nulo hace caer el programa.</p>
<p><b>Corregido:</b></p>
${cod('c', `int* crear(int n) {
    if (n <= 0) return NULL;
    int* arr = malloc(n * sizeof(int));
    if (arr == NULL) return NULL;          // comprobar siempre
    for (int i = 0; i < n; i++) arr[i] = i;
    return arr;                            // el montón sobrevive al return
}
/* Y quien llama es responsable de hacer free(arr) cuando termine.
   Esa responsabilidad debe estar DOCUMENTADA: es parte del contrato. */`)}
<p>Toda esta clase de errores —punteros colgantes, fugas, doble liberación, uso después de liberar— simplemente <b>no existe</b> en Python, Java o JavaScript, donde el recolector se encarga, y es imposible en Rust, donde el compilador la detecta. Es la razón por la que la industria se está moviendo a esos lenguajes para código nuevo: una proporción enorme de las vulnerabilidades graves de seguridad son errores de gestión de memoria en C y C++.</p>` },
        { n: 5, titulo: 'La trampa de la clausura',
          enunciado: 'Este código JavaScript debería imprimir 0, 1, 2 y con <code>var</code> imprime 3, 3, 3. Explica exactamente por qué, y da tres formas de arreglarlo.<br><pre>const fns = [];\nfor (var i = 0; i &lt; 3; i++) {\n  fns.push(function() { console.log(i); });\n}\nfns.forEach(f => f());</pre>',
          pista: 'La función no guarda el valor de i, guarda la variable i. ¿Cuántas variables i hay?',
          solucion: `<p><b>Por qué imprime 3, 3, 3:</b> <code>var i</code> tiene ámbito de <b>función</b>, no de bloque, así que existe <b>una sola</b> variable <code>i</code> para todo el bucle. Las tres funciones creadas <b>capturan esa misma variable</b>, no una copia de su valor. Cuando se ejecutan (después del bucle), leen el valor actual de <code>i</code>, que es 3: el valor con el que la condición falló y el bucle terminó.</p>
<p>Esto es una <b>clausura</b> (<i>closure</i>): una función que recuerda el entorno donde fue creada. La clausura captura la <b>variable</b>, no el valor, y ahí está la sorpresa.</p>
<p><b>Arreglo 1 — <code>let</code> (el correcto hoy):</b></p>
${cod('js', `for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}`)}
<p><code>let</code> tiene ámbito de bloque y el estándar define que el <code>for</code> crea <b>una variable nueva por iteración</b>. Así que hay tres variables <code>i</code> distintas, cada una capturada por su función. Esta fue una de las razones principales para introducir <code>let</code> en 2015.</p>
<p><b>Arreglo 2 — capturar el valor con un parámetro:</b></p>
${cod('js', `for (var i = 0; i < 3; i++) {
  (function(copia) {
    fns.push(() => console.log(copia));
  })(i);                     // se pasa el valor actual de i
}`)}
<p>Esta era la solución habitual antes de <code>let</code>: una función invocada de inmediato cuyo parámetro recibe una copia del valor. Verás este patrón en código antiguo y conviene reconocerlo.</p>
<p><b>Arreglo 3 — <code>bind</code> o una fábrica de funciones:</b></p>
${cod('js', `function hacerLog(v) { return () => console.log(v); }
for (var i = 0; i < 3; i++) {
  fns.push(hacerLog(i));     // cada llamada tiene su propio v
}`)}
<p><b>El mismo problema en Python</b> y su solución idiomática, porque aparece igual:</p>
${cod('python', `fns = []
for i in range(3):
    fns.append(lambda: print(i))        # imprime 2, 2, 2
for f in fns: f()

# arreglo: capturar el valor en un parámetro por defecto
for i in range(3):
    fns.append(lambda v=i: print(v))    # imprime 0, 1, 2`)}
<p><b>Por qué merece un ejercicio entero:</b> este error aparece de verdad cada vez que alguien asigna manejadores de eventos dentro de un bucle (los tres botones hacen lo mismo que el último) o programa tareas diferidas. Entender que <b>una clausura captura variables y no valores</b> es lo que te permite diagnosticarlo en segundos en lugar de horas.</p>` }
      ],
      quiz: [
        { p: 'Si una función recibe una lista y le hace <code>append</code>, el original…',
          ops: ['no cambia', 'cambia, porque se modificó el objeto al que apunta el parámetro',
            'cambia solo en Python', 'da error'],
          ok: 1, exp: 'Reasignar el parámetro no afecta al original; modificar el objeto apuntado sí. Vale igual en Python, JavaScript, Java y C#.' },
        { p: 'Un <i>stack overflow</i> ocurre típicamente por…',
          ops: ['crear demasiados objetos', 'una recursión sin caso base que llena la pila de llamadas',
            'leer un archivo muy grande', 'una fuga de memoria'],
          ok: 1, exp: 'Lo que se agota es la pila de registros de activación, que tiene unos pocos megabytes, no el montón.' },
        { p: 'Python es un lenguaje…',
          ops: ['estático y fuerte', 'dinámico y fuerte', 'dinámico y débil', 'estático y débil'],
          ok: 1, exp: 'Dinámico porque el tipo se comprueba al ejecutar; fuerte porque no convierte por su cuenta: <code>"5" + 3</code> da TypeError.' }
      ]
    },

    {
      id: 'm5-4',
      titulo: 'Errores y excepciones',
      resumen: 'try/catch, cuándo capturar, cuándo propagar, y por qué «silenciar» un error es casi siempre un bug.',
      objetivos: [
        'Usar try/catch/finally correctamente',
        'Decidir si capturar o propagar un error',
        'Escribir manejo de errores que ayude a diagnosticar en lugar de ocultar'
      ],
      lectura: `
<p>En pseudocódigo evitamos los errores validando antes. En código real hay fallos que no se pueden prever validando:
el disco se llena, la red se cae, el archivo desaparece entre que compruebas que existe y lo abres. Para eso están las
<strong>excepciones</strong>.</p>

<h2>La idea</h2>
<p>Una excepción es una señal de «esto no se puede continuar aquí». Cuando se lanza, la ejecución normal se interrumpe y
el control sube por la pila de llamadas buscando a alguien que sepa manejarla. Si nadie la maneja, el programa termina
y muestra el <em>stack trace</em>.</p>

${cod('python', `try:
    edad = int(input("Edad: "))
    print(100 / edad)
except ValueError:
    print("Eso no es un número entero")
except ZeroDivisionError:
    print("La edad no puede ser cero")
else:
    print("Todo salió bien")        # solo si no hubo excepción
finally:
    print("Esto se ejecuta siempre")`)}

${cod('js', `try {
  const datos = JSON.parse(texto);
  procesar(datos);
} catch (err) {
  console.error("No pude leer los datos:", err.message);
} finally {
  cerrarConexion();        // siempre, haya fallado o no
}`)}

<p>El <code>finally</code> es la parte más importante y la menos usada: se ejecuta <strong>siempre</strong>, incluso si
hubo una excepción o un <code>return</code>. Es donde van las liberaciones de recursos: cerrar archivos, cerrar
conexiones, liberar bloqueos. Sin él, un error a mitad de camino deja recursos abiertos.</p>

<p>Los lenguajes modernos ofrecen azúcar para ese patrón: <code>with</code> en Python, <code>try-with-resources</code>
en Java, <code>defer</code> en Go, <code>using</code> en C#. Siempre que exista, úsalo: es imposible olvidarse de cerrar.</p>

${cod('python', `# El archivo se cierra solo, pase lo que pase
with open("datos.txt") as f:
    for linea in f:
        procesar(linea)`)}

<h2>Los cinco pecados del manejo de errores</h2>

<p><strong>1. Capturar y no hacer nada.</strong> El pecado capital:</p>
${cod('python', `try:
    guardar(datos)
except:
    pass          # ← el usuario cree que se guardó. No se guardó.`)}
<p>Esto convierte un error ruidoso en una pérdida de datos silenciosa. Si de verdad quieres ignorar un error, deja un
comentario explicando <em>por qué</em> es seguro ignorarlo; si no puedes escribir ese comentario, no es seguro.</p>

<p><strong>2. Capturar todo.</strong> <code>except Exception</code> o <code>catch (e)</code> atrapa también los errores
que no esperabas: un nombre mal escrito, un error de programación, un fallo de memoria. Captura el tipo
<em>específico</em> que sabes manejar.</p>

<p><strong>3. Usar excepciones para el flujo normal.</strong> Si un usuario no encontrado es algo que ocurre cien veces
al día, no es una excepción: es un resultado posible. Devuelve un valor que lo indique. Las excepciones son para lo
excepcional, y además son costosas de lanzar.</p>

<p><strong>4. Perder la información original.</strong> Al capturar y relanzar, conserva la causa
(<code>raise ... from e</code> en Python, <code>new Error(msg, {cause: e})</code> en JavaScript). Sin ella, el
<em>stack trace</em> apunta a tu <code>catch</code> y no al lugar donde ocurrió el fallo.</p>

<p><strong>5. Mostrar el error técnico al usuario.</strong> <code>NullPointerException at line 847</code> no ayuda a
nadie y además revela detalles internos. Al usuario, un mensaje claro de qué pasó y qué puede hacer; al log, todo el
detalle técnico.</p>

<h2>Capturar o propagar</h2>
<p>La decisión clave: ¿manejo el error aquí o lo dejo subir?</p>

${tabla(['Captura aquí si…', 'Propaga si…'], [
  ['puedes resolverlo (reintentar, usar un valor por defecto)', 'esta capa no sabe qué hacer con el error'],
  ['puedes dar un mensaje útil al usuario', 'quien te llamó tiene más contexto para decidir'],
  ['es el borde del sistema y hay que no caerse', 'capturarlo solo lo ocultaría'],
  ['puedes añadir contexto y relanzar', 'es un error de programación que debe hacerse visible']
], 'La regla práctica: captura en la capa que puede hacer algo al respecto, y en ningún otro sitio.')}

<p>Una función que lee un archivo de configuración no sabe si el programa debe terminar o usar valores por defecto: eso
lo decide quien la llamó. Así que propaga. El punto de entrada del programa, en cambio, sí tiene que capturar todo lo
que llegue: es su trabajo no caerse de forma fea.</p>

<h2>Dos estilos: excepciones y valores de error</h2>
<p>No todos los lenguajes usan excepciones. Go devuelve el error como un segundo valor de retorno, y Rust devuelve un
tipo <code>Result</code> que el compilador <strong>obliga</strong> a examinar:</p>

${cod('txt', `// Go: el error es un valor que no se puede ignorar sin que se note
f, err := os.Open("datos.txt")
if err != nil {
    return err
}
defer f.Close()`)}

<p>La ventaja de ese estilo es que los errores son visibles en la firma de la función: leyendo el código sabes qué puede
fallar. La ventaja de las excepciones es que el camino feliz queda limpio de comprobaciones. Es una de las discusiones
de diseño vivas del momento, y conviene conocer las dos formas.</p>

${nota('La regla que resume el tema',
  '<p>Un error manejado mal es peor que un error no manejado, porque el programa sigue adelante con datos ' +
  'equivocados. Ante la duda: <strong>deja que falle, pero que falle claramente</strong>.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Valida o captura',
          enunciado: 'Para cada situación, di si conviene validar antes o capturar la excepción: (a) el usuario escribe su edad; (b) abrir un archivo que puede no existir; (c) dividir entre una variable que puede ser 0; (d) consultar una API por internet; (e) acceder a a[i] en un bucle.',
          pista: '¿Se puede saber de antemano con certeza, o solo intentándolo?',
          solucion: `<p><b>(a) Ambas.</b> Valida el rango (0 a 120) porque es una regla de negocio, y captura la excepción de conversión porque «abc» no se puede convertir y comprobarlo manualmente es reimplementar el conversor.</p>
<p><b>(b) Capturar.</b> Comprobar que existe y luego abrirlo tiene una <b>condición de carrera</b>: el archivo puede desaparecer entre las dos operaciones. El estilo correcto es intentar abrirlo y manejar el fallo. En inglés esto se llama EAFP («mejor pedir perdón que permiso») y es el estilo recomendado en Python.</p>
<p><b>(c) Validar.</b> Comprobar <code>si divisor != 0</code> es trivial, no tiene carrera posible y hace el código más claro que capturar <code>ZeroDivisionError</code>.</p>
<p><b>(d) Capturar</b>, y además con reintentos y un tiempo límite. La red falla de formas que no se pueden prever: DNS, timeout, respuesta mal formada, código 500. Es el caso donde las excepciones brillan.</p>
<p><b>(e) Validar</b>, arreglando el bucle. Un índice fuera de rango es un <b>error de programación</b>, no una condición del mundo: capturarlo esconde el bug en lugar de arreglarlo.</p>
<p><b>La regla general:</b> valida lo que depende de ti y es comprobable con certeza; captura lo que depende del mundo exterior.</p>` },
        { n: 2, titulo: 'Arregla el manejo de errores',
          enunciado: 'Critica este código y reescríbelo. Hay al menos cuatro problemas.<br><pre>def guardar_cliente(datos):\n    try:\n        conexion = abrir_bd()\n        conexion.insertar(datos)\n        return True\n    except:\n        return False</pre>',
          pista: 'Qué se captura, qué se informa, y qué pasa con la conexión.',
          solucion: `<p><b>Los problemas:</b></p>
<ol>
<li><b><code>except</code> desnudo:</b> captura absolutamente todo, incluido un error de tipeo en el nombre de un método o una interrupción de teclado. Un bug de programación se convierte en «no se pudo guardar».</li>
<li><b>Se pierde toda la información:</b> devuelve <code>False</code> sin registrar qué falló. Nadie podrá diagnosticar nunca por qué los clientes no se guardan.</li>
<li><b>La conexión no se cierra</b> si <code>insertar</code> falla. Repetido unas cuantas veces, el programa agota las conexiones disponibles y deja de funcionar por una causa que parece no tener relación.</li>
<li><b>Devolver un booleano fuerza al llamador a adivinar.</b> ¿Falló porque el DNI está duplicado, porque la base está caída o porque los datos son inválidos? Cada caso necesita una respuesta distinta.</li>
</ol>
<p><b>Reescrito:</b></p>
${cod('python', `import logging

class ClienteDuplicado(Exception):
    pass

def guardar_cliente(datos):
    """Guarda el cliente. Lanza ClienteDuplicado si el DNI ya existe,
       y propaga los errores de conexión para que decida el llamador."""
    try:
        with abrir_bd() as conexion:        # se cierra siempre
            conexion.insertar(datos)
    except ErrorDeUnicidad as e:
        # esto SÍ sabemos manejarlo: es una regla de negocio
        raise ClienteDuplicado(f"El DNI {datos.dni} ya está registrado") from e
    except ErrorDeConexion:
        logging.exception("Fallo al guardar el cliente %s", datos.dni)
        raise                               # que decida quien llamó`)}
<p><b>Qué cambió:</b> se capturan tipos específicos; el error de negocio se traduce a una excepción propia del dominio con un mensaje útil (y <code>from e</code> conserva la causa original); el error de infraestructura se registra con todo el detalle y se <b>propaga</b>, porque esta función no sabe si el programa debe reintentar, usar una cola o abortar; y el <code>with</code> garantiza el cierre de la conexión en todos los caminos.</p>` },
        { n: 3, titulo: 'Entrada robusta',
          enunciado: 'Escribe en Python una función <code>pedir_entero(mensaje, minimo, maximo)</code> que no se rinda ante ninguna entrada: texto, vacío, decimales, fuera de rango. Debe dar un mensaje distinto en cada caso y un límite de intentos.',
          pista: 'try/except para la conversión y validación de rango después. El límite de intentos evita bucles infinitos en entornos automatizados.',
          solucion: `${cod('python', `def pedir_entero(mensaje, minimo, maximo, intentos=5):
    """Pide un entero en [minimo, maximo]. Devuelve None si se agotan los intentos."""
    for intento in range(1, intentos + 1):
        bruto = input(f"{mensaje} ({minimo} a {maximo}): ").strip()

        if not bruto:
            print("  No escribiste nada.")
            continue
        try:
            valor = int(bruto)
        except ValueError:
            if "." in bruto or "," in bruto:
                print(f"  '{bruto}' tiene decimales; escribe un número entero.")
            else:
                print(f"  '{bruto}' no es un número.")
            continue
        if valor < minimo:
            print(f"  Muy bajo. El mínimo es {minimo}.")
        elif valor > maximo:
            print(f"  Muy alto. El máximo es {maximo}.")
        else:
            return valor
        print(f"  (intento {intento} de {intentos})")

    print("Demasiados intentos fallidos.")
    return None`)}
<p>Las decisiones de diseño:</p>
<ul>
<li><b><code>strip()</code> antes de todo:</b> un espacio delante haría fallar la conversión por un motivo que el usuario no puede ver.</li>
<li><b>Un mensaje por causa,</b> y el caso de los decimales merece el suyo porque es el error más frecuente: adivinar la intención del usuario y nombrarla ahorra el siguiente intento fallido.</li>
<li><b>Se muestra el valor recibido entre comillas.</b> Así el usuario ve que escribió <code>"12 "</code> o <code>"l2"</code> con una ele.</li>
<li><b>Límite de intentos:</b> sin él, la función es un bucle infinito si la entrada está redirigida desde un archivo que se acabó, y bloquea cualquier automatización.</li>
<li><b>Devuelve <code>None</code> al agotarse,</b> y el llamador debe comprobarlo. Devolver un número inventado sería mucho peor.</li>
</ul>` },
        { n: 4, titulo: 'Capturar o propagar',
          enunciado: 'Un programa tiene tres capas: <code>main()</code> → <code>procesarPedidos()</code> → <code>leerArchivo()</code>. Si el archivo no existe, ¿dónde debe capturarse la excepción y qué debe hacer cada capa? Justifica.',
          pista: 'Pregúntate qué sabe cada capa y qué puede decidir.',
          solucion: `<p><b><code>leerArchivo()</code>: no captura, propaga.</b> Su trabajo es leer un archivo. No sabe si el programa debe terminar, pedir otra ruta, usar un archivo de respaldo o continuar sin datos. Capturar aquí y devolver una lista vacía sería desastroso: <code>procesarPedidos</code> creería que no hay pedidos y seguiría adelante tan feliz.</p>
<p><b><code>procesarPedidos()</code>: depende, y aquí está lo interesante.</b></p>
<ul>
<li>Si procesa <b>un</b> archivo, propaga: tampoco sabe qué hacer, y lo mejor que puede aportar es <b>contexto</b>: capturar, envolver en una excepción propia que diga «no pude procesar los pedidos del 2026-10-29» y relanzar conservando la causa.</li>
<li>Si procesa <b>varios</b> archivos y uno falta, sí debe capturar: registra el fallo de ese archivo, lo cuenta como error y continúa con los demás. Aquí sí tiene una decisión que tomar, y por tanto es la capa correcta.</li>
</ul>
<p><b><code>main()</code>: captura todo.</b> Es el borde del programa y su responsabilidad es no terminar de forma fea. Debe: mostrar un mensaje comprensible al usuario («no encontré el archivo de pedidos en C:\\datos\\pedidos.csv»), escribir el detalle técnico completo en el log, y devolver un código de salida distinto de cero para que quien lo haya ejecutado desde un script sepa que falló.</p>
<p><b>El principio general:</b> <i>captura en la capa que puede tomar una decisión</i>. Cada capa intermedia que no puede decidir solo debe añadir contexto, nunca tragarse el error. Y hay un corolario importante: el contexto que añade cada capa es lo que convierte un <code>FileNotFoundError</code> inútil en «no pude procesar los pedidos porque falta el archivo del 29 de octubre», que es un mensaje con el que alguien puede actuar.</p>` },
        { n: 5, titulo: 'Diseña los errores de un sistema',
          enunciado: 'Para el sistema de inventario del módulo 4, diseña la jerarquía de errores: qué situaciones son excepciones, qué tipos crearías, qué mensaje da cada una al usuario y qué registra en el log. Incluye al menos 6 situaciones y distingue los errores de negocio de los técnicos.',
          pista: 'Separa lo que el usuario puede corregir de lo que no, y lo que es un bug de lo que es una condición del mundo.',
          solucion: `${tabla(['Situación', 'Tipo', 'Mensaje al usuario', 'Al log'], [
  ['Código de producto no existe', 'negocio: <code>ProductoNoEncontrado</code>', '«No existe un producto con el código ABC-001»', 'nivel info: el usuario se equivocó, no es un fallo'],
  ['Stock insuficiente para la venta', 'negocio: <code>StockInsuficiente</code>', '«Solo hay 2 unidades de ABC-001; pediste 5»', 'nivel info, con el código y las cantidades'],
  ['Código duplicado al registrar', 'negocio: <code>CodigoDuplicado</code>', '«El código ABC-001 ya está registrado»', 'nivel info'],
  ['Precio negativo o cantidad no numérica', 'validación', '«El precio debe ser un número mayor que 0»', 'nada: es entrada normal del usuario'],
  ['Base de datos inaccesible', 'técnico: <code>ErrorDeAlmacenamiento</code>', '«No se pudo guardar. Revisa la conexión e inténtalo de nuevo»', 'nivel error con el <i>stack trace</i> completo y la cadena de conexión <b>sin</b> la contraseña'],
  ['Archivo de respaldo corrupto', 'técnico', '«El archivo de respaldo no se puede leer»', 'nivel error con la ruta, el tamaño y la línea que falló'],
  ['El total de la venta no cuadra con la suma de líneas', '<b>aserción</b>: <code>ErrorInterno</code>', '«Ocurrió un error interno. Se registró el incidente (#4821)»', 'nivel critical con todos los valores; esto es un <b>bug</b>'],
  ['Índice fuera de rango en un bucle', '<b>bug</b>, no se captura', 'el mensaje genérico de error interno', 'nivel critical: hay que arreglar el código']
])}
<p><b>La jerarquía:</b></p>
${cod('python', `class ErrorInventario(Exception):
    """Raíz de todos los errores del sistema."""

class ErrorDeNegocio(ErrorInventario):
    """El usuario puede corregirlo. Mensaje directo, log informativo."""

class ProductoNoEncontrado(ErrorDeNegocio): pass
class StockInsuficiente(ErrorDeNegocio): pass
class CodigoDuplicado(ErrorDeNegocio): pass

class ErrorTecnico(ErrorInventario):
    """El usuario no puede hacer nada. Mensaje genérico, log completo."""

class ErrorDeAlmacenamiento(ErrorTecnico): pass`)}
<p><b>Por qué esta jerarquía y no una lista plana:</b> permite que la capa de presentación haga <b>una sola</b> distinción y acierte siempre:</p>
${cod('python', `try:
    registrar_venta(...)
except ErrorDeNegocio as e:
    mostrar_al_usuario(str(e))          # el mensaje ya es para humanos
    log.info("Operación rechazada: %s", e)
except ErrorTecnico:
    mostrar_al_usuario("No se pudo completar la operación. Inténtalo más tarde.")
    log.exception("Fallo técnico")
except Exception:
    mostrar_al_usuario(f"Error interno. Incidente #{nuevo_id()}")
    log.critical("Bug no previsto", exc_info=True)`)}
<p><b>Las tres ideas que vale la pena llevarse:</b></p>
<ul>
<li><b>Los errores de negocio llevan su mensaje de usuario dentro.</b> Quien lanza la excepción es quien sabe qué pasó y en qué unidades; la capa de presentación solo lo muestra.</li>
<li><b>Los errores técnicos nunca muestran el detalle al usuario,</b> pero el log lo guarda todo. Y el número de incidente es el puente entre lo que vio el usuario y lo que puede buscar quien mantiene el sistema: vale oro en soporte.</li>
<li><b>Lo que no está previsto se registra como critical.</b> Si aparece en el log, hay un bug que arreglar. Un sistema cuyo log de errores críticos está vacío no es un sistema sin errores: suele ser un sistema que los está tragando.</li>
</ul>` }
      ],
      quiz: [
        { p: 'El bloque <code>finally</code> se ejecuta…',
          ops: ['solo si hubo excepción', 'solo si no hubo excepción', 'siempre, haya o no excepción', 'nunca, es opcional'],
          ok: 2, exp: 'Siempre, incluso tras un return o una excepción. Es donde van las liberaciones de recursos: cerrar archivos y conexiones.' },
        { p: '<code>try: guardar() except: pass</code> es peligroso porque…',
          ops: ['es lento', 'convierte un error ruidoso en una pérdida de datos silenciosa',
            'no compila', 'captura demasiados pocos errores'],
          ok: 1, exp: 'El usuario cree que se guardó y no se guardó. Además captura hasta los errores de programación, ocultando bugs.' },
        { p: 'Una función que lee un archivo de configuración y no sabe qué hacer si falta, debe…',
          ops: ['devolver una lista vacía', 'capturar el error e ignorarlo',
            'propagar la excepción para que decida quien la llamó', 'terminar el programa'],
          ok: 2, exp: 'Captura en la capa que puede tomar una decisión. Devolver vacío sería lo peor: el llamador creería que no hay configuración.' }
      ]
    }
  ]
});
