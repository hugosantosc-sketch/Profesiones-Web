/* ===== MÓDULO 9 — Cómo se procesa un lenguaje ===== */
CDC.registrar({
  id: 'm9',
  nivel: 'Avanzado',
  titulo: 'Cómo se procesa un lenguaje de programación',
  resumen: 'El viaje completo de tu código: del texto a los tokens, al árbol sintáctico, al código intermedio y a las instrucciones que ejecuta el procesador.',
  intro: '<p>Escribes <code>total = precio * 1.18</code> y la máquina ejecuta instrucciones binarias. Entre esas dos ' +
    'cosas hay una de las construcciones de ingeniería más elegantes que existen, y este módulo la recorre entera.</p>' +
    '<p>No es un tema para especialistas: entender qué hace un compilador explica los mensajes de error, por qué ' +
    'ciertos lenguajes son rápidos y otros flexibles, y cómo se construyen los intérpretes de configuración, las ' +
    'hojas de cálculo y los buscadores. El propio <a href="#herramientas">laboratorio</a> de este curso es un ' +
    'intérprete, y en el último tema vas a ver exactamente cómo está hecho.</p>',
  temas: [

    {
      id: 'm9-1',
      titulo: 'Compiladores, intérpretes y máquinas virtuales',
      resumen: 'Las tres formas de ejecutar un programa, sus consecuencias prácticas y por qué casi todo es híbrido.',
      objetivos: [
        'Distinguir compilación, interpretación y compilación JIT',
        'Explicar las consecuencias prácticas de cada modelo',
        'Entender qué es realmente una máquina virtual y para qué sirve'
      ],
      lectura: `
<p>El código fuente es texto. El procesador ejecuta números. Hay tres estrategias para salvar esa distancia, y cada
lenguaje elige la suya con consecuencias muy visibles.</p>

<h2>Compilación anticipada (AOT)</h2>
<p>Un <strong>compilador</strong> traduce todo el programa a código máquina <em>antes</em> de ejecutarlo. El resultado
es un archivo ejecutable que ya no necesita al compilador.</p>

${fig(`<svg viewBox="0 0 560 110" width="560" height="110" role="img" aria-label="Flujo de compilación anticipada">
<g color="var(--fg-soft)">
<defs><marker id="m9a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
${[[14, 'código.c', 'var(--warm-soft)', 'var(--warm)'], [160, 'compilador', 'var(--accent-soft)', 'var(--accent)'],
   [306, 'programa.exe', 'var(--surface-2)', 'var(--line)'], [438, 'se ejecuta', 'var(--accent-soft)', 'var(--accent)']].map(function (b, i) {
  return '<rect x="' + b[0] + '" y="30" width="110" height="44" rx="6" fill="' + b[2] + '" stroke="' + b[3] + '" stroke-width="1.6"/>' +
    '<text x="' + (b[0] + 55) + '" y="57" text-anchor="middle" font-size="12" fill="var(--fg)">' + b[1] + '</text>' +
    (i < 3 ? '<path d="M' + (b[0] + 112) + ' 52 H' + (b[0] + 142) + '" stroke="currentColor" stroke-width="1.4" marker-end="url(#m9a)"/>' : '');
}).join('')}
<text x="280" y="96" text-anchor="middle" font-size="11" fill="var(--fg-soft)">Traducción una vez · ejecución muchas veces · el ejecutable no necesita el compilador</text>
</g></svg>`, 'Compilación anticipada: C, C++, Rust, Go.')}

<p><strong>Ventajas:</strong> la ejecución es rapidísima porque no hay traducción en tiempo real; el compilador puede
invertir mucho esfuerzo en optimizar; los errores de tipo y de sintaxis se detectan antes de distribuir el programa; no
hace falta instalar nada en la máquina del usuario.</p>

<p><strong>Desventajas:</strong> el ciclo de desarrollo es más lento (cambiar una línea obliga a recompilar); el
ejecutable solo funciona en la arquitectura y el sistema para los que se compiló; menos flexibilidad en ejecución.</p>

<h2>Interpretación</h2>
<p>Un <strong>intérprete</strong> lee el programa y lo ejecuta directamente, sin producir ningún archivo intermedio.</p>

<p><strong>Ventajas:</strong> ciclo inmediato (cambias y ejecutas); el mismo código corre donde haya intérprete;
permite ejecución dinámica, consola interactiva e introspección; los mensajes de error pueden ser muy ricos porque el
intérprete tiene todo el contexto.</p>

<p><strong>Desventajas:</strong> mucho más lento (entre 10 y 100 veces frente a código compilado); los errores aparecen
solo cuando se ejecuta esa línea; hay que distribuir el código fuente y el intérprete.</p>

<h2>El modelo híbrido: bytecode y máquina virtual</h2>
<p>La mayoría de los lenguajes modernos combinan ambos. Compilan a un <strong>código intermedio</strong>
(<em>bytecode</em>) que no es de ninguna máquina real, y una <strong>máquina virtual</strong> lo ejecuta.</p>

${fig(`<svg viewBox="0 0 560 130" width="560" height="130" role="img" aria-label="Flujo de compilación a bytecode y máquina virtual">
<g color="var(--fg-soft)">
${[[14, 'código.py', 'var(--warm-soft)', 'var(--warm)'], [150, 'compilador', 'var(--accent-soft)', 'var(--accent)'],
   [286, 'bytecode', 'var(--surface-2)', 'var(--line)'], [422, 'máquina virtual', 'var(--accent-soft)', 'var(--accent)']].map(function (b, i) {
  return '<rect x="' + b[0] + '" y="26" width="118" height="44" rx="6" fill="' + b[2] + '" stroke="' + b[3] + '" stroke-width="1.6"/>' +
    '<text x="' + (b[0] + 59) + '" y="53" text-anchor="middle" font-size="12" fill="var(--fg)">' + b[1] + '</text>' +
    (i < 3 ? '<path d="M' + (b[0] + 120) + ' 48 H' + (b[0] + 146) + '" stroke="currentColor" stroke-width="1.4" marker-end="url(#m9a)"/>' : '');
}).join('')}
<text x="345" y="92" text-anchor="middle" font-size="11" fill="var(--fg-soft)">el bytecode es portable: la misma VM lo corre en Windows, Linux o Android</text>
<text x="280" y="114" text-anchor="middle" font-size="11" fill="var(--fg-soft)">y el JIT compila a código máquina real las partes que más se ejecutan</text>
</g></svg>`, 'Modelo híbrido: Java, C#, Python, JavaScript.')}

<p>La <strong>compilación JIT</strong> (<em>just in time</em>) da el último paso: la máquina virtual observa qué partes
del programa se ejecutan muchas veces y las compila a código máquina real <em>durante la ejecución</em>. Y puede hacer
algo que un compilador anticipado no puede: <strong>optimizar según los datos reales</strong>. Si observa que una
función siempre recibe enteros, genera código especializado para enteros, con una comprobación por si algún día llega
otra cosa. Por eso JavaScript moderno puede acercarse a la velocidad de C en código numérico.</p>

${tabla(['Lenguaje', 'Modelo', 'Detalle'], [
  ['C, C++, Rust', 'AOT a código máquina', 'ejecutable nativo'],
  ['Go', 'AOT, compilación muy rápida', 'incluye su propio entorno de ejecución'],
  ['Java, C#, Kotlin', 'AOT a bytecode + JIT en la VM', 'JVM / CLR'],
  ['Python', 'compila a bytecode <code>.pyc</code> + VM', 'CPython; la compilación es casi invisible'],
  ['JavaScript', 'JIT por capas', 'V8 interpreta primero y compila lo caliente'],
  ['PHP, Ruby', 'bytecode + VM', 'con JIT en versiones recientes']
], 'Casi ningún lenguaje importante es «puramente» interpretado o compilado: la distinción es del compilador, no del lenguaje.')}

${nota('Compilado o interpretado es propiedad de la implementación, no del lenguaje',
  '<p>Existen intérpretes de C y compiladores de Python. Cuando alguien dice «Python es interpretado» quiere decir ' +
  '«la implementación habitual de Python interpreta bytecode». La distinción importa porque explica por qué el mismo ' +
  'lenguaje puede tener implementaciones con rendimientos radicalmente distintos.</p>', 'key')}

<h2>Las fases de un compilador</h2>
<p>Da igual el modelo: las fases son las mismas y se agrupan en dos mitades.</p>

${tabla(['#Fase', 'Nombre', 'Entrada → Salida', 'Qué detecta'], [
  ['1', 'Análisis léxico', 'texto → tokens', 'caracteres inválidos, cadenas sin cerrar'],
  ['2', 'Análisis sintáctico', 'tokens → árbol (AST)', 'paréntesis sin cerrar, estructura inválida'],
  ['3', 'Análisis semántico', 'AST → AST anotado', 'variables no declaradas, tipos incompatibles'],
  ['4', 'Código intermedio', 'AST → representación intermedia', '—'],
  ['5', 'Optimización', 'RI → RI mejorada', '(avisos de código inalcanzable)'],
  ['6', 'Generación de código', 'RI → ensamblador o bytecode', '—']
], 'Las fases 1-3 son el «frontend» (depende del lenguaje); las 4-6 son el «backend» (depende de la máquina destino).')}

<p>Esa separación tiene una consecuencia práctica enorme: <strong>n</strong> lenguajes y <strong>m</strong>
arquitecturas no necesitan <strong>n×m</strong> compiladores, sino <strong>n</strong> frontends y <strong>m</strong>
backends que se comunican por una representación intermedia común. Es exactamente la arquitectura de LLVM, que permite
que Rust, Swift, Julia y Clang compartan todo el trabajo de optimización y generación de código.</p>

<h2>Otras piezas del camino</h2>
<ul>
  <li><strong>Preprocesador:</strong> en C, procesa <code>#include</code> y <code>#define</code> antes de compilar.</li>
  <li><strong>Enlazador (<em>linker</em>):</strong> junta tu código objeto con el de las bibliotecas y resuelve las
  referencias. Los errores «símbolo no definido» vienen de aquí, no del compilador: significan que el compilador
  aceptó la llamada pero nadie aportó la implementación.</li>
  <li><strong>Cargador:</strong> el sistema operativo coloca el ejecutable en memoria y le cede el control.</li>
  <li><strong>Transpilador:</strong> un compilador de un lenguaje a otro de nivel parecido: TypeScript a JavaScript,
  Sass a CSS, o JavaScript moderno a JavaScript antiguo (Babel).</li>
</ul>
      `,
      ejercicios: [
        { n: 1, titulo: 'Clasifica y explica',
          enunciado: 'Para cada afirmación, di si es verdadera o falsa y por qué: (a) «Python es más lento que C porque es interpretado»; (b) «Java es compilado»; (c) «JavaScript no se compila»; (d) «Un ejecutable de C funciona en cualquier computadora».',
          pista: 'Cuidado con confundir lenguaje con implementación.',
          solucion: `<p><b>(a) Parcialmente cierta, pero imprecisa.</b> CPython compila a bytecode y lo interpreta en una VM, y el bytecode no está tipado ni optimizado para una máquina concreta, así que cada operación cuesta mucho más. Pero la causa profunda no es «ser interpretado» sino el <b>tipado dinámico</b>: en <code>a + b</code>, Python debe averiguar en ejecución de qué tipo son y qué suma aplicar, mientras que C ya lo sabía al compilar. Prueba de ello: PyPy, con JIT, ejecuta el mismo Python muchas veces más rápido.</p>
<p><b>(b) Verdadera a medias.</b> Java compila a <b>bytecode</b>, no a código máquina. Ese bytecode lo ejecuta la JVM, que además lo compila a código nativo con JIT cuando detecta código caliente. Así que Java es compilado, interpretado <i>y</i> compilado otra vez, en ese orden.</p>
<p><b>(c) Falsa.</b> V8 (Chrome, Node) compila JavaScript a bytecode con su intérprete Ignition, y recompila a código máquina optimizado con TurboFan las funciones que más se ejecutan. Es de los sistemas de compilación más sofisticados que existen.</p>
<p><b>(d) Falsa.</b> Un ejecutable está ligado a una <b>arquitectura</b> (x86-64, ARM) y a un <b>sistema operativo</b> (formato del ejecutable, llamadas al sistema, bibliotecas). Un binario de Linux x86-64 no corre en un Mac con ARM ni en Windows. Lo portable es el <b>código fuente</b>, que hay que recompilar para cada destino.</p>` },
        { n: 2, titulo: 'Ventajas en contexto',
          enunciado: 'Recomienda un modelo de ejecución (AOT, interpretado o híbrido con JIT) para cada caso y justifica: (a) el firmware de un marcapasos; (b) un script de administración de servidores; (c) un videojuego AAA; (d) la lógica de un sitio web que cambia a diario; (e) una aplicación que debe correr igual en Windows, Mac y Linux.',
          pista: 'Piensa en previsibilidad, velocidad de desarrollo, rendimiento y portabilidad.',
          solucion: `<p><b>(a) AOT, y además con restricciones severas.</b> Un marcapasos necesita <b>previsibilidad absoluta</b>: nada de JIT (que introduce pausas de compilación impredecibles) ni recolección de basura (que introduce pausas de recolección). Se usa C o Ada compilados, a menudo con subconjuntos del lenguaje que prohíben la reserva dinámica de memoria. Aquí el peor caso importa infinitamente más que el promedio.</p>
<p><b>(b) Interpretado.</b> Python, Bash o PowerShell. Lo que importa es escribirlo en cinco minutos, no que tarde 0,3 s en lugar de 0,01 s. El ciclo de desarrollo manda.</p>
<p><b>(c) AOT</b> para el motor (C++ o Rust), porque hay que exprimir cada milisegundo y el presupuesto de tiempo por fotograma es de 16 ms. Pero casi todos los juegos AAA <b>embeben un intérprete</b> (Lua, C# en Unity) para la lógica de juego y los guiones, porque así los diseñadores pueden cambiar el comportamiento sin recompilar el motor. Es el modelo híbrido llevado a la arquitectura del producto.</p>
<p><b>(d) Interpretado o híbrido.</b> Poder desplegar un cambio sin recompilar nada es exactamente lo que se necesita. La mayoría de la web funciona así, y los JIT de PHP, Node y Python han cerrado buena parte de la brecha de rendimiento.</p>
<p><b>(e) Híbrido.</b> Java o .NET: se compila una vez a bytecode y corre donde haya VM. La alternativa AOT exige mantener y probar un binario por plataforma, con todo lo que eso implica. Go ofrece un punto intermedio muy práctico: AOT, pero compila con un solo comando para cualquier destino.</p>` },
        { n: 3, titulo: 'Lee el bytecode',
          enunciado: 'Python permite ver el bytecode que genera. Dado el código <code>def f(a, b): return a * b + 1</code>, el bytecode es:<br><pre>LOAD_FAST   a\nLOAD_FAST   b\nBINARY_MULTIPLY\nLOAD_CONST  1\nBINARY_ADD\nRETURN_VALUE</pre>Explica cada instrucción y qué modelo de máquina está usando. Luego predice el bytecode de <code>return (a + b) * 2</code>.',
          pista: '¿Dónde están los operandos de BINARY_MULTIPLY?',
          solucion: `<p><b>Instrucción por instrucción:</b></p>
${tabla(['Instrucción', 'Qué hace', 'Pila después'], [
  ['<code>LOAD_FAST a</code>', 'apila el valor de la variable local <code>a</code>', '[a]'],
  ['<code>LOAD_FAST b</code>', 'apila <code>b</code>', '[a, b]'],
  ['<code>BINARY_MULTIPLY</code>', 'desapila dos, multiplica, apila el resultado', '[a*b]'],
  ['<code>LOAD_CONST 1</code>', 'apila la constante 1', '[a*b, 1]'],
  ['<code>BINARY_ADD</code>', 'desapila dos, suma, apila', '[a*b+1]'],
  ['<code>RETURN_VALUE</code>', 'desapila y devuelve', '[]']
])}
<p><b>El modelo es una máquina de pila:</b> las instrucciones no nombran registros, sino que operan sobre una pila implícita. Es exactamente la notación polaca inversa del módulo 6, y por la misma razón: <b>no necesita paréntesis ni reglas de precedencia</b>, porque el orden de las instrucciones ya codifica la estructura.</p>
<p><b>Predicción para <code>(a + b) * 2</code>:</b></p>
<pre>LOAD_FAST   a
LOAD_FAST   b
BINARY_ADD           ← ahora la suma va primero
LOAD_CONST  2
BINARY_MULTIPLY
RETURN_VALUE</pre>
<p><b>Lo interesante:</b> los paréntesis <b>desaparecen</b>. No existen en el bytecode porque ya cumplieron su función: le dijeron al analizador sintáctico cómo construir el árbol, y el orden de las instrucciones refleja ese árbol. Los paréntesis son una notación para humanos.</p>
<p><b>Por qué una máquina de pila y no de registros:</b> el bytecode de pila es más compacto (las instrucciones no llevan operandos) y mucho más fácil de generar desde un árbol sintáctico, que es lo que verás en el tema 5. Las máquinas de registros (como la de Lua o la de Dalvik en Android) son más rápidas de interpretar pero más complejas de generar. Es un intercambio de diseño clásico.</p>
<p>Puedes verlo tú mismo: <code>import dis; dis.dis(f)</code>.</p>` },
        { n: 4, titulo: 'Frontend y backend',
          enunciado: 'Explica por qué la arquitectura de LLVM (frontends por lenguaje + representación intermedia común + backends por arquitectura) es tan valiosa. Calcula cuántos compiladores harían falta sin ella para 5 lenguajes y 4 arquitecturas, y cuántos componentes con ella.',
          pista: 'Sin separación, cada combinación lenguaje-arquitectura es un compilador entero.',
          solucion: `<p><b>Sin separación:</b> cada combinación necesita un compilador completo, con su análisis léxico, sintáctico, semántico, optimizaciones y generación de código: <b>5 × 4 = 20 compiladores</b>. Y cada optimización nueva (por ejemplo, eliminar código muerto) hay que implementarla <b>20 veces</b>.</p>
<p><b>Con representación intermedia común:</b> <b>5 frontends + 4 backends = 9 componentes</b>. Una optimización se implementa <b>una vez</b> sobre la RI y beneficia a los cinco lenguajes en las cuatro arquitecturas.</p>
<p>Con 10 lenguajes y 10 arquitecturas la diferencia es de 100 a 20.</p>
<p><b>Lo que esto hizo posible en la práctica:</b></p>
<ul>
<li><b>Rust y Swift nacieron viables.</b> Sus creadores escribieron el frontend y heredaron gratis décadas de trabajo en optimización y soporte de arquitecturas. Sin LLVM, un lenguaje nuevo necesitaría un equipo enorme solo para generar código decente.</li>
<li><b>El soporte de una arquitectura nueva</b> (ARM64 cuando Apple cambió de procesador) se añade una vez y todos los lenguajes del ecosistema la ganan.</li>
<li><b>Herramientas que no son compiladores</b> se construyen sobre la RI: analizadores estáticos, sanitizadores de memoria, instrumentación de cobertura.</li>
</ul>
<p><b>Y el patrón de diseño es el mismo del módulo 8:</b> definir una abstracción estable en el medio (la RI) para desacoplar dos lados que varían independientemente. Es inversión de dependencias aplicada a la arquitectura de un sistema entero.</p>` },
        { n: 5, titulo: 'Diseña la tubería',
          enunciado: 'Quieres crear un lenguaje de configuración muy simple para tu aplicación, con variables, expresiones aritméticas y condicionales. (a) ¿Qué modelo de ejecución elegirías? (b) ¿Qué fases implementarías y cuáles te saltarías? (c) ¿Qué riesgos tiene y cómo los mitigarías?',
          pista: 'No todo necesita un compilador completo, y un lenguaje de configuración tiene riesgos de seguridad propios.',
          solucion: `<p><b>(a) Intérprete de árbol</b> (recorrer el AST ejecutando). Es la opción correcta sin dudarlo: la configuración se lee una vez al arrancar, así que el rendimiento es irrelevante, y un intérprete de árbol se escribe en unos cientos de líneas. Compilar a bytecode sería trabajo sin beneficio.</p>
<p><b>(b) Fases:</b></p>
<ul>
<li><b>Análisis léxico: sí.</b> Imprescindible para reconocer números, cadenas, identificadores y operadores.</li>
<li><b>Análisis sintáctico: sí.</b> Construir el AST es lo que permite respetar la precedencia y dar errores decentes.</li>
<li><b>Análisis semántico: mínimo.</b> Comprobar que las variables existan antes de usarse y que los tipos de las operaciones tengan sentido. No hace falta un sistema de tipos elaborado.</li>
<li><b>Código intermedio, optimización y generación: no.</b> Se ejecuta el AST directamente. Optimizar un archivo de configuración de 50 líneas no tiene sentido.</li>
</ul>
<p><b>(c) Los riesgos, y aquí está lo importante:</b></p>
<ol>
<li><b>La tentación de usar <code>eval()</code>.</b> Es la solución de cinco minutos y abre un agujero de seguridad total: quien controle el archivo de configuración ejecuta código arbitrario con los permisos de tu aplicación. <b>Mitigación:</b> escribir el intérprete, por pequeño que sea. Es exactamente por lo que existen YAML, TOML y JSON en lugar de «un archivo .py de configuración».</li>
<li><b>Bucles infinitos y consumo de recursos.</b> Si el lenguaje crece y admite repetición, un archivo malicioso o equivocado puede colgar el arranque. <b>Mitigación:</b> límite de operaciones y de tiempo, exactamente como hace el intérprete de este curso.</li>
<li><b>Fluencia de características.</b> Todo lenguaje de configuración tiende a crecer hasta convertirse en un mal lenguaje de programación. Empiezas con variables, añades condicionales, luego bucles, luego funciones, y acabas con un lenguaje completo sin depurador, sin documentación y sin pruebas. <b>Mitigación:</b> decidir desde el principio qué <b>no</b> va a soportar, y cuando alguien lo pida, preguntarse si el problema real es que la lógica debería estar en el programa y no en la configuración. (Esto tiene nombre: la <i>décima regla de Greenspun</i>, y es un chiste porque pasa constantemente.)</li>
<li><b>Mensajes de error pobres.</b> Un archivo de configuración lo editan personas que no programan. <b>Mitigación:</b> guardar número de línea y columna en cada token desde el principio. Añadirlo después es rehacer el analizador.</li>
</ol>
<p><b>La recomendación honesta:</b> antes de inventar un lenguaje, comprueba si JSON, TOML o YAML resuelven el problema. Inventar uno está justificado cuando necesitas expresiones calculadas o condicionales de verdad; si solo necesitas pares clave-valor, usa un formato existente y ahórrate el intérprete, su documentación y sus bugs.</p>` }
      ],
      quiz: [
        { p: 'La diferencia entre compilador e intérprete es que…',
          ops: ['el compilador es más moderno', 'el compilador traduce todo el programa antes de ejecutarlo; el intérprete lo ejecuta directamente',
            'el intérprete solo sirve para lenguajes sencillos', 'no hay diferencia real'],
          ok: 1, exp: 'Y es una propiedad de la implementación, no del lenguaje: existen compiladores de Python e intérpretes de C.' },
        { p: 'La compilación JIT puede superar a la compilación anticipada en algunos casos porque…',
          ops: ['tiene mejores algoritmos', 'puede optimizar según los tipos y valores que realmente aparecen en ejecución',
            'usa más memoria', 'no necesita análisis sintáctico'],
          ok: 1, exp: 'Si observa que una función siempre recibe enteros, genera código especializado con una comprobación de respaldo. Un compilador AOT no tiene esa información.' },
        { p: 'La separación entre frontend y backend en un compilador permite que…',
          ops: ['el código sea más rápido', 'n lenguajes y m arquitecturas necesiten n+m componentes en lugar de n×m',
            'no haga falta análisis semántico', 'se pueda interpretar el código'],
          ok: 1, exp: 'Es la arquitectura de LLVM, y es la razón por la que Rust y Swift pudieron nacer con generación de código de calidad industrial.' }
      ]
    },

    {
      id: 'm9-2',
      titulo: 'Análisis léxico: del texto a los tokens',
      resumen: 'Cómo se parte el código en piezas con significado, qué es una expresión regular y cómo se construye un lexer.',
      objetivos: [
        'Describir la salida de un analizador léxico',
        'Construir un lexer sencillo a mano',
        'Entender el papel de los autómatas y las expresiones regulares'
      ],
      lectura: `
<p>La primera fase convierte una secuencia de caracteres en una secuencia de <strong>tokens</strong>: las «palabras»
del lenguaje. Para el compilador, <code>total</code> deja de ser siete letras y pasa a ser un único
<em>identificador</em>.</p>

${cod('txt', `Entrada:  total <- precio * 1.18   // IGV

Tokens:
  ID       "total"       línea 1, col 1
  OP       "<-"          línea 1, col 7
  ID       "precio"      línea 1, col 10
  OP       "*"           línea 1, col 17
  NUM      1.18          línea 1, col 19
  (el comentario se descarta)
  NL                     línea 1`)}

<p>Cada token lleva tres cosas: su <strong>tipo</strong> (identificador, número, operador, palabra reservada), su
<strong>valor</strong> y su <strong>posición</strong>. La posición es lo que permite decir «error en la línea 12,
columna 8» en lugar de «error en algún sitio», y por eso hay que guardarla desde el principio: añadirla después obliga
a rehacer el analizador.</p>

<h2>Lo que hace el lexer</h2>
<ul>
  <li><strong>Agrupa caracteres</strong> en unidades con significado.</li>
  <li><strong>Descarta lo irrelevante:</strong> espacios, tabulaciones y comentarios (salvo en Python, donde la
  indentación <em>sí</em> es significativa y el lexer genera tokens INDENT y DEDENT).</li>
  <li><strong>Clasifica:</strong> distingue si <code>mientras</code> es una palabra reservada o un identificador.</li>
  <li><strong>Convierte:</strong> la cadena <code>"1.18"</code> se convierte en el número 1.18.</li>
  <li><strong>Detecta errores léxicos:</strong> un carácter imposible, una cadena sin cerrar.</li>
</ul>

<h2>Cómo se construye</h2>
<p>El algoritmo es un bucle que mira el carácter actual y decide qué tipo de token empieza ahí:</p>

${cod('pseudo', `Mientras queden caracteres Hacer
	c <- caracter actual
	Si c es espacio Entonces
		avanzar
	Sino Si c inicia un comentario Entonces
		saltar hasta el fin de línea
	Sino Si c es dígito Entonces
		leer todos los dígitos (y el punto decimal) → token NUM
	Sino Si c es letra Entonces
		leer letras y dígitos → palabra
		Si la palabra está en la lista de reservadas Entonces
			token PALABRA_RESERVADA
		Sino
			token IDENTIFICADOR
		FinSi
	Sino Si c es comilla Entonces
		leer hasta la comilla de cierre → token CADENA
	Sino Si c inicia un operador Entonces
		probar primero los operadores de DOS caracteres, luego los de uno
	Sino
		error: carácter no reconocido
	FinSi
FinMientras`)}

${nota('El detalle que todos olvidan: los operadores largos primero',
  '<p>Si pruebas <code>&lt;</code> antes que <code>&lt;=</code>, nunca reconocerás <code>&lt;=</code>: lo leerás como ' +
  '<code>&lt;</code> seguido de <code>=</code>. Siempre hay que intentar el token <strong>más largo posible</strong>. ' +
  'Esa regla se llama <em>maximal munch</em> y es universal en el análisis léxico.</p>', 'warn')}

<h2>Autómatas y expresiones regulares</h2>
<p>Formalmente, un lexer es un <strong>autómata finito</strong>: una máquina con estados que cambia de estado con cada
carácter. Para reconocer un número hay un estado «leyendo dígitos», uno «vi un punto», uno «leyendo decimales»…</p>

${fig(`<svg viewBox="0 0 540 150" width="540" height="150" role="img" aria-label="Autómata que reconoce números con decimales">
<g color="var(--fg-soft)">
<defs><marker id="m9b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
${[[60, 'inicio'], [200, 'entero'], [340, 'punto'], [470, 'decimal']].map(function (e, i) {
  return '<circle cx="' + e[0] + '" cy="62" r="30" fill="' + (i === 1 || i === 3 ? 'var(--accent-soft)' : 'var(--surface)') +
    '" stroke="var(--accent)" stroke-width="' + (i === 1 || i === 3 ? 2.4 : 1.6) + '"/>' +
    '<text x="' + e[0] + '" y="66" text-anchor="middle" font-size="11" fill="var(--fg)">' + e[1] + '</text>';
}).join('')}
<path d="M92 62 H168" stroke="currentColor" stroke-width="1.4" marker-end="url(#m9b)"/>
<text x="130" y="54" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">dígito</text>
<path d="M232 62 H308" stroke="currentColor" stroke-width="1.4" marker-end="url(#m9b)"/>
<text x="270" y="54" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">punto</text>
<path d="M372 62 H438" stroke="currentColor" stroke-width="1.4" marker-end="url(#m9b)"/>
<text x="405" y="54" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">dígito</text>
<path d="M186 36 A26 26 0 1 1 214 36" stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#m9b)"/>
<text x="200" y="20" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">dígito</text>
<path d="M456 36 A26 26 0 1 1 484 36" stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#m9b)"/>
<text x="470" y="20" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">dígito</text>
<text x="270" y="126" text-anchor="middle" font-size="11" fill="var(--fg-soft)">Los estados de doble borde son de aceptación: ahí el número es válido.</text>
<text x="270" y="142" text-anchor="middle" font-size="11" fill="var(--fg-soft)">Equivale a la expresión regular  [0-9]+(\\.[0-9]+)?</text>
</g></svg>`, 'Un autómata finito que reconoce enteros y decimales.')}

<p>Y aquí está la conexión más bonita: <strong>toda expresión regular equivale a un autómata finito, y viceversa</strong>
(teorema de Kleene). Por eso los generadores de lexers como <em>lex</em> o <em>flex</em> reciben expresiones regulares y
producen autómatas eficientes automáticamente. Cuando escribes <code>\\d+</code> en un buscador, estás describiendo una
máquina de estados.</p>

${tabla(['Expresión regular', 'Reconoce'], [
  ['<code>[0-9]+</code>', 'uno o más dígitos'],
  ['<code>[a-zA-Z_][a-zA-Z0-9_]*</code>', 'un identificador: letra o guion bajo, luego letras, dígitos o guiones'],
  ['<code>"[^"]*"</code>', 'una cadena entre comillas sin comillas dentro'],
  ['<code>//[^\\n]*</code>', 'un comentario de línea'],
  ['<code>[0-9]+(\\.[0-9]+)?</code>', 'un número entero o decimal']
], 'Las expresiones regulares son el lenguaje natural del análisis léxico, y la razón por la que conviene aprenderlas.')}

<h2>El límite de las expresiones regulares</h2>
<p>Un autómata finito tiene <strong>memoria finita</strong>: no puede contar sin límite. Por eso una expresión regular
<strong>no puede</strong> reconocer paréntesis balanceados a cualquier profundidad: necesitaría recordar cuántos lleva
abiertos, y los estados son finitos.</p>

<p>Eso explica por qué el análisis se divide en dos fases: el <strong>lexer</strong> (autómata finito, reconoce
tokens) y el <strong>parser</strong> (con pila, reconoce estructuras anidadas). Y explica también la famosa respuesta
de Stack Overflow sobre por qué <strong>no se debe analizar HTML con expresiones regulares</strong>: el HTML tiene
anidamiento arbitrario y las regex no pueden con él. No es pedantería: es un resultado matemático.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Tokeniza a mano',
          enunciado: 'Escribe la lista de tokens (tipo, valor) que produciría un lexer para: <code>Si contador &lt;= 10 Entonces suma <- suma + x[i] * 2.5 FinSi</code>',
          pista: 'Palabras reservadas, identificadores, números, operadores y símbolos.',
          solucion: `${tabla(['#', 'Tipo', 'Valor'], [
  ['1', 'PALABRA_RESERVADA', '<code>Si</code>'], ['2', 'IDENTIFICADOR', '<code>contador</code>'],
  ['3', 'OPERADOR', '<code>&lt;=</code>'], ['4', 'NUMERO', '<code>10</code>'],
  ['5', 'PALABRA_RESERVADA', '<code>Entonces</code>'], ['6', 'IDENTIFICADOR', '<code>suma</code>'],
  ['7', 'OPERADOR', '<code>&lt;-</code>'], ['8', 'IDENTIFICADOR', '<code>suma</code>'],
  ['9', 'OPERADOR', '<code>+</code>'], ['10', 'IDENTIFICADOR', '<code>x</code>'],
  ['11', 'SIMBOLO', '<code>[</code>'], ['12', 'IDENTIFICADOR', '<code>i</code>'],
  ['13', 'SIMBOLO', '<code>]</code>'], ['14', 'OPERADOR', '<code>*</code>'],
  ['15', 'NUMERO', '<code>2.5</code>'], ['16', 'PALABRA_RESERVADA', '<code>FinSi</code>']
], '16 tokens. Los espacios desaparecen por completo.')}
<p><b>Dos observaciones:</b></p>
<ul>
<li><code>&lt;=</code> y <code>&lt;-</code> son <b>un solo token cada uno</b>, no dos. Es la regla del token más largo.</li>
<li><code>2.5</code> es un token numérico con valor 2.5, no «2», «.» y «5». El punto solo forma parte del número si viene entre dígitos.</li>
</ul>` },
        { n: 2, titulo: 'La trampa del token más largo',
          enunciado: 'Un lexer mal escrito prueba los operadores de un carácter antes que los de dos. Muestra qué tokens produciría para <code>a &lt;= b</code>, <code>x &lt;- 5</code> y <code>c &lt;&gt; d</code>, y qué error daría el parser después.',
          pista: 'Cada operador de dos caracteres se partiría en dos.',
          solucion: `${tabla(['Entrada', 'Tokens correctos', 'Tokens del lexer defectuoso'], [
  ['<code>a &lt;= b</code>', 'ID(a) OP(&lt;=) ID(b)', 'ID(a) <b>OP(&lt;) OP(=)</b> ID(b)'],
  ['<code>x &lt;- 5</code>', 'ID(x) OP(&lt;-) NUM(5)', 'ID(x) <b>OP(&lt;) OP(-)</b> NUM(5)'],
  ['<code>c &lt;&gt; d</code>', 'ID(c) OP(&lt;&gt;) ID(d)', 'ID(c) <b>OP(&lt;) OP(&gt;)</b> ID(d)']
])}
<p><b>Qué pasa después:</b> el parser recibe <code>a &lt; = b</code> e intenta analizar una comparación cuyo lado derecho empieza por <code>=</code>, lo que no es ninguna expresión válida. El error sería algo como «se esperaba una expresión y se encontró '='», que es <b>confuso</b> porque señala un síntoma lejano de la causa: el programador escribió <code>&lt;=</code> correctamente y el mensaje habla de un <code>=</code> suelto.</p>
<p>El caso de <code>x &lt;- 5</code> es peor todavía: <code>x &lt; -5</code> es una expresión <b>perfectamente válida</b> (comparar x con menos cinco). El programa <b>compila sin errores</b> y hace algo completamente distinto de lo que el programador escribió. Es un error de lógica silencioso originado en el lexer.</p>
<p><b>La lección:</b> esta es una de las razones por las que los diseñadores de lenguajes evitan operadores que sean prefijo de otros, o eligen símbolos inequívocos. Y es por lo que la regla del token más largo es innegociable en cualquier implementación.</p>` },
        { n: 3, titulo: 'Escribe un lexer',
          enunciado: 'Implementa en JavaScript (consola del laboratorio) un analizador léxico para expresiones aritméticas con números, identificadores, los operadores + − * / y paréntesis. Debe reportar la posición de cada token y dar un error claro ante un carácter inválido.',
          pista: 'Un bucle con un índice, y una rama por tipo de token.',
          solucion: `${cod('js', `function lexer(texto) {
  const tokens = [];
  let i = 0, linea = 1, col = 1;

  const avanzar = (n = 1) => { i += n; col += n; };

  while (i < texto.length) {
    const c = texto[i];

    if (c === "\\n") { tokens.push({t:"NL", l:linea, c:col}); i++; linea++; col = 1; continue; }
    if (c === " " || c === "\\t") { avanzar(); continue; }

    if (c === "/" && texto[i+1] === "/") {          // comentario
      while (i < texto.length && texto[i] !== "\\n") i++;
      continue;
    }

    if (/[0-9]/.test(c)) {                          // número
      const inicio = i, c0 = col;
      while (i < texto.length && /[0-9]/.test(texto[i])) avanzar();
      if (texto[i] === "." && /[0-9]/.test(texto[i+1] ?? "")) {
        avanzar();
        while (i < texto.length && /[0-9]/.test(texto[i])) avanzar();
      }
      tokens.push({ t: "NUM", v: parseFloat(texto.slice(inicio, i)), l: linea, c: c0 });
      continue;
    }

    if (/[a-zA-Z_áéíóúñÁÉÍÓÚÑ]/.test(c)) {          // identificador
      const inicio = i, c0 = col;
      while (i < texto.length && /[a-zA-Z0-9_áéíóúñÁÉÍÓÚÑ]/.test(texto[i])) avanzar();
      tokens.push({ t: "ID", v: texto.slice(inicio, i), l: linea, c: c0 });
      continue;
    }

    if ("+-*/()".includes(c)) {                      // operador o símbolo
      tokens.push({ t: "OP", v: c, l: linea, c: col });
      avanzar();
      continue;
    }

    throw new Error(\`Carácter no reconocido '\${c}' en la línea \${linea}, columna \${col}\`);
  }
  tokens.push({ t: "EOF", l: linea, c: col });
  return tokens;
}

console.table(lexer("total = (precio + 12.5) * cantidad   // IGV aparte"));
try { lexer("a @ b"); } catch (e) { console.log("✖", e.message); }`)}
<p>Cuatro decisiones que conviene notar:</p>
<ul>
<li><b>La posición se guarda en cada token</b> desde el principio. Es lo que permitirá decir después «la variable no declarada está en la línea 12, columna 8».</li>
<li><b>El punto decimal solo se acepta si le sigue un dígito.</b> Sin esa comprobación, <code>12.</code> o <code>1.2.3</code> producirían tokens absurdos. Es exactamente el autómata del dibujo.</li>
<li><b>Los identificadores admiten tildes y ñ</b>, porque el lenguaje es en español. Omitirlo es el error que se arrastra al copiar lexers escritos para inglés.</li>
<li><b>El token EOF</b> al final simplifica el parser: siempre hay un token que mirar y no hay que comprobar el fin del arreglo en cada paso. Es un <i>centinela</i>, el patrón del módulo 4.</li>
</ul>` },
        { n: 4, titulo: 'Casos difíciles',
          enunciado: 'Explica cómo manejaría un lexer estos casos y qué decisiones de diseño implican: (a) cadenas con comillas dentro; (b) comentarios de varias líneas anidados; (c) la indentación de Python; (d) <code>&gt;&gt;</code> en C++ dentro de <code>vector&lt;vector&lt;int&gt;&gt;</code>.',
          pista: 'Algunos exigen escapes, otros un contador, otros estado adicional, y el último es un conflicto famoso.',
          solucion: `<p><b>(a) Cadenas con comillas dentro:</b> hacen falta <b>secuencias de escape</b>. Al encontrar <code>\\</code> dentro de una cadena, el lexer consume el carácter siguiente sin interpretarlo como cierre: <code>"dijo \\"hola\\""</code>. El lexer además <b>traduce</b> los escapes (<code>\\n</code> → salto de línea real), de modo que el valor del token ya es el texto final. Es una decisión importante: el escape es sintaxis, no contenido.</p>
<p><b>(b) Comentarios anidados:</b> un autómata finito <b>no puede</b> hacerlo, porque necesita contar la profundidad y la memoria es finita. Hay dos opciones: prohibir el anidamiento (C, Java: <code>/* /* */</code> termina en el primer <code>*/</code>, lo que sorprende a todo el mundo al comentar un bloque que ya tenía comentarios) o <b>añadir un contador</b> al lexer, saliendo del modelo estrictamente finito (Rust, Pascal y Haskell lo hacen). Es un buen ejemplo de que las implementaciones reales no son autómatas puros.</p>
<p><b>(c) La indentación de Python:</b> el lexer mantiene una <b>pila de niveles de indentación</b>. Al inicio de cada línea compara la sangría con la cima: si es mayor, apila y emite un token <code>INDENT</code>; si es menor, desapila y emite uno o varios <code>DEDENT</code> hasta coincidir. Así los bloques quedan delimitados por tokens, igual que las llaves en C, y el parser no tiene que saber nada de espacios. (También es la razón del error «unindent does not match any outer indentation level»: la sangría no coincidió con ningún nivel de la pila.) Nótese que un lexer con pila ya no es un autómata finito.</p>
<p><b>(d) El <code>&gt;&gt;</code> de C++:</b> es un conflicto famoso. El lexer, aplicando el token más largo, lee <code>&gt;&gt;</code> como el operador de desplazamiento de bits. Pero en <code>vector&lt;vector&lt;int&gt;&gt;</code> son dos cierres de plantilla. Durante años C++ obligó a escribir <code>&gt; &gt;</code> con un espacio; <b>C++11 lo arregló</b> haciendo que el parser pueda pedirle al lexer que parta ese token cuando está dentro de una lista de plantillas. Es decir: rompieron la separación limpia entre lexer y parser porque la realidad del lenguaje lo exigía.</p>
<p><b>La conclusión general del ejercicio:</b> la separación en fases es una <b>idealización muy útil</b>, y los lenguajes reales la violan donde su sintaxis lo exige. Conocer el modelo ideal sirve precisamente para entender dónde y por qué se rompe.</p>` },
        { n: 5, titulo: 'El límite de las regex',
          enunciado: 'Demuestra con un argumento por qué una expresión regular no puede reconocer el lenguaje de los paréntesis balanceados a cualquier profundidad. Luego explica la consecuencia práctica para analizar HTML, JSON o código.',
          pista: 'Un autómata finito tiene un número finito de estados. ¿Qué pasa si la profundidad supera ese número?',
          solucion: `<p><b>El argumento (versión informal del lema de bombeo):</b></p>
<ol>
<li>Supongamos que existe una expresión regular que reconoce exactamente las cadenas de paréntesis balanceados.</li>
<li>Por el teorema de Kleene, existe entonces un autómata finito equivalente, con un número <b>finito</b> de estados; llamémoslo <code>k</code>.</li>
<li>Alimentemos ese autómata con <code>k+1</code> paréntesis de apertura seguidos. Como solo hay <code>k</code> estados y hemos dado <code>k+1</code> pasos, por el <b>principio del palomar</b> el autómata tuvo que <b>repetir</b> algún estado.</li>
<li>Si el autómata está en el mismo estado tras leer <code>i</code> aperturas que tras leer <code>j</code> aperturas (con i ≠ j), entonces <b>no puede distinguir</b> esas dos situaciones: lo que acepte después será idéntico en ambos casos.</li>
<li>Por tanto aceptará <code>(<sup>i</sup>)<sup>j</sup></code>, que está <b>desbalanceado</b>. Contradicción.</li>
</ol>
<p>La intuición es simple: <b>contar sin límite exige memoria ilimitada</b>, y un autómata finito no la tiene. Para eso hace falta una <b>pila</b>, que es lo que convierte un autómata finito en un autómata de pila y lo que distingue un lenguaje regular de uno libre de contexto.</p>
<p><b>Consecuencias prácticas:</b></p>
<ul>
<li><b>HTML no se puede analizar con regex.</b> Las etiquetas se anidan a cualquier profundidad. Una regex puede extraer <i>casos particulares</i> de un HTML conocido, y se romperá en cuanto aparezca un caso con más anidamiento, un atributo con <code>&gt;</code> dentro de una cadena o un comentario. Usa un analizador de HTML de verdad.</li>
<li><b>JSON tampoco.</b> Objetos y arreglos se anidan sin límite. Usa el analizador del lenguaje.</li>
<li><b>El código fuente, menos todavía.</b> Buscar «todas las llamadas a esta función» con una regex falla con comentarios, cadenas que contienen el nombre, y llamadas repartidas en varias líneas. Las herramientas serias de refactorización trabajan sobre el AST, no sobre el texto.</li>
<li><b>Para qué sí sirven las regex:</b> exactamente para lo que fueron diseñadas, el <b>análisis léxico</b>: reconocer tokens individuales que no se anidan. Validar el formato de un número, extraer las fechas de un log, comprobar que un identificador es válido.</li>
</ul>
<p>Que exista una respuesta en Stack Overflow con miles de votos gritando «no analices HTML con regex» no es una rareza del folclore: es un teorema con consecuencias prácticas diarias.</p>` }
      ],
      quiz: [
        { p: 'La salida de un analizador léxico es…',
          ops: ['código máquina', 'una secuencia de tokens con tipo, valor y posición',
            'un árbol sintáctico', 'el programa optimizado'],
          ok: 1, exp: 'Convierte caracteres en «palabras» del lenguaje. La posición es lo que permite dar errores con línea y columna.' },
        { p: 'Si un lexer prueba <code>&lt;</code> antes que <code>&lt;=</code>…',
          ops: ['funciona igual', 'nunca reconocerá <code>&lt;=</code>: lo leerá como dos tokens separados',
            'es más rápido', 'solo falla con números'],
          ok: 1, exp: 'Hay que aplicar la regla del token más largo. Y en el caso de <code>x &lt;- 5</code>, el error puede producir un programa válido que hace algo distinto.' },
        { p: 'Una expresión regular no puede reconocer paréntesis balanceados a cualquier profundidad porque…',
          ops: ['es muy lenta', 'un autómata finito tiene memoria finita y contar sin límite exige una pila',
            'faltan operadores en la sintaxis regex', 'sí puede'],
          ok: 1, exp: 'Es un resultado demostrado, y la razón de que no se deba analizar HTML ni JSON con expresiones regulares.' }
      ]
    },

    {
      id: 'm9-3',
      titulo: 'Análisis sintáctico: del token al árbol',
      resumen: 'Gramáticas, árboles sintácticos, precedencia y cómo se escribe un parser descendente recursivo.',
      objetivos: [
        'Leer y escribir una gramática en notación BNF',
        'Construir el AST de una expresión',
        'Entender cómo la gramática codifica la precedencia de operadores'
      ],
      lectura: `
<p>El lexer da una lista plana de tokens. El <strong>parser</strong> descubre su <strong>estructura</strong>: qué es
una expresión, qué es un condicional, qué pertenece a qué. El resultado es un <strong>árbol sintáctico abstracto</strong>
(AST), que es la representación con la que trabajan todas las fases siguientes.</p>

<h2>Gramáticas</h2>
<p>Una <strong>gramática</strong> describe qué secuencias de tokens son válidas. Se escribe en notación BNF, donde cada
regla define un símbolo en términos de otros:</p>

${cod('txt', `expresion  ::= termino (( "+" | "-" ) termino)*
termino    ::= factor (( "*" | "/" ) factor)*
factor     ::= NUMERO | IDENTIFICADOR | "(" expresion ")" | "-" factor`)}

<p>Se lee así: una expresión es un término, seguido de cero o más veces (un <code>+</code> o un <code>−</code> y otro
término). Un término es un factor seguido de cero o más multiplicaciones o divisiones. Un factor es un número, un
identificador, una expresión entre paréntesis o un factor negado.</p>

${nota('La gramática codifica la precedencia',
  '<p>Mira la estructura: <code>expresion</code> está construida sobre <code>termino</code>, y <code>termino</code> ' +
  'sobre <code>factor</code>. Eso hace que la multiplicación se agrupe <em>antes</em> que la suma, sin ninguna regla ' +
  'extra. <strong>La precedencia no es una tabla aparte: es la forma de la gramática.</strong> Cada nivel de ' +
  'precedencia es un nivel de reglas.</p>', 'key')}

<p>La recursión de <code>factor ::= "(" expresion ")"</code> es lo que permite el anidamiento infinito, y es
exactamente lo que una expresión regular no puede expresar.</p>

<h2>El árbol sintáctico</h2>
<p>Para <code>2 + 3 * 4</code>, el parser construye:</p>

${fig(`<svg viewBox="0 0 440 190" width="440" height="190" role="img" aria-label="Árbol sintáctico de la expresión 2 + 3 * 4">
<g color="var(--fg-soft)">
${[[220, 34, '+'], [130, 104, '2'], [310, 104, '*'], [250, 164, '3'], [370, 164, '4']].map(function (n) {
  return '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="22" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.7"/>' +
    '<text x="' + n[0] + '" y="' + (n[1] + 6) + '" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg)">' + n[2] + '</text>';
}).join('')}
<g stroke="var(--fg-soft)" stroke-width="1.5" fill="none">
<path d="M204 50 L146 88"/><path d="M236 50 L294 88"/>
<path d="M296 120 L264 148"/><path d="M324 120 L356 148"/>
</g>
<text x="220" y="186" text-anchor="middle" font-size="11.5" fill="var(--fg)">El * está más abajo, así que se evalúa primero: 2 + (3 × 4) = 14</text>
</g></svg>`, 'El árbol de 2 + 3 * 4. La estructura ya resuelve la precedencia.')}

<p>El árbol <strong>ya contiene la respuesta</strong> a la precedencia: evaluarlo de abajo hacia arriba da 14
necesariamente. Si la expresión fuera <code>(2 + 3) * 4</code>, el árbol tendría el <code>*</code> en la raíz y daría
20. Y fíjate en lo que no aparece: <strong>los paréntesis no están en el árbol</strong>. Ya hicieron su trabajo al
determinar la forma.</p>

<h2>El parser descendente recursivo</h2>
<p>Es la técnica más usada para escribir parsers a mano, y es sorprendentemente directa: <strong>una función por regla
de la gramática</strong>.</p>

${cod('pseudo', `Funcion nodo <- expresion()
	nodo <- termino()
	Mientras el token actual sea "+" o "-" Hacer
		op <- consumir()
		derecha <- termino()
		nodo <- NodoBinario(op, nodo, derecha)
	FinMientras
FinFuncion

Funcion nodo <- termino()
	nodo <- factor()
	Mientras el token actual sea "*" o "/" Hacer
		op <- consumir()
		derecha <- factor()
		nodo <- NodoBinario(op, nodo, derecha)
	FinMientras
FinFuncion

Funcion nodo <- factor()
	Si token es NUMERO Entonces
		nodo <- NodoNumero(consumir())
	Sino Si token es "(" Entonces
		consumir("(")
		nodo <- expresion()          // ← recursión: aquí vuelve a empezar
		consumir(")")
	Sino
		error("se esperaba un número o un paréntesis")
	FinSi
FinFuncion`)}

<p>La correspondencia con la gramática es <strong>uno a uno</strong>. Esa es la gran virtud de esta técnica: si sabes
escribir la gramática, sabes escribir el parser. El bucle <code>Mientras</code> implementa el <code>*</code> de la
notación BNF, y la asociatividad a la izquierda sale sola porque cada vuelta envuelve el nodo anterior.</p>

<h2>Ambigüedad</h2>
<p>Una gramática es <strong>ambigua</strong> si una misma entrada admite dos árboles distintos. Es un defecto grave:
significa que el programa tiene dos significados posibles.</p>

<p>El caso clásico es el <em>dangling else</em>: en <code>if (a) if (b) x(); else y();</code>, ¿a cuál de los dos
<code>if</code> pertenece el <code>else</code>? La mayoría de los lenguajes resuelve por convención («el
<code>else</code> va con el <code>if</code> más cercano»), y los lenguajes con terminadores explícitos
(<code>FinSi</code>, <code>endif</code>, llaves obligatorias) <strong>no tienen el problema</strong>. Es una razón de
diseño a favor de las palabras de cierre que usa el pseudocódigo de este curso.</p>

<h2>Tipos de parser</h2>
${tabla(['Técnica', 'Cómo trabaja', 'Dónde se usa'], [
  ['<b>Descendente recursivo</b>', 'de la raíz a las hojas, una función por regla', 'escrito a mano: GCC, Clang, V8, Roslyn'],
  ['<b>LL(k)</b>', 'descendente, mirando k tokens por delante', 'ANTLR'],
  ['<b>LR / LALR</b>', 'ascendente, con una pila y una tabla', 'generado: yacc, bison'],
  ['<b>Pratt / precedencia de operadores</b>', 'descendente con precedencia tabulada', 'expresiones complejas']
], 'Curiosamente, casi todos los compiladores industriales usan parsers escritos a mano, porque permiten dar mensajes de error mucho mejores.')}

<p>Ese último punto es revelador: durante décadas se consideró que generar el parser automáticamente era lo profesional.
Hoy GCC, Clang y V8 tienen parsers descendentes recursivos escritos a mano, y la razón principal es la
<strong>calidad de los mensajes de error</strong> y la capacidad de recuperarse de un error para seguir analizando y
reportar varios a la vez, en lugar de rendirse con el primero.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Dibuja el árbol',
          enunciado: 'Dibuja el árbol sintáctico de: (a) <code>2 * 3 + 4</code>; (b) <code>2 * (3 + 4)</code>; (c) <code>a - b - c</code>; (d) <code>2 ^ 3 ^ 2</code> sabiendo que la potencia asocia a la derecha.',
          pista: 'Lo que está más abajo se evalúa primero.',
          solucion: `<p><b>(a) 2 * 3 + 4 = 10</b> — el <code>*</code> está más abajo:</p>
<pre>      +
     / \\
    *    4
   / \\
  2   3</pre>
<p><b>(b) 2 * (3 + 4) = 14</b> — los paréntesis cambiaron la forma, y luego desaparecieron:</p>
<pre>      *
     / \\
    2    +
        / \\
       3   4</pre>
<p><b>(c) a − b − c</b> — asocia a la <b>izquierda</b>: (a−b)−c</p>
<pre>        -
       / \\
      -    c
     / \\
    a   b</pre>
<p><b>(d) 2 ^ 3 ^ 2 = 512</b> — asocia a la <b>derecha</b>: 2^(3^2)</p>
<pre>      ^
     / \\
    2    ^
        / \\
       3   2</pre>
<p><b>Cómo se logra cada asociatividad en el parser:</b> para la izquierda se usa un <b>bucle</b> que envuelve el nodo anterior (como en el código de la lección); para la derecha se usa <b>recursión</b> en el lado derecho: <code>nodo &lt;- NodoBinario(op, izquierda, potencia())</code>, llamando a la misma función. Es un cambio pequeño con una consecuencia grande, y es exactamente lo que hace el intérprete de este curso para que <code>2^3^2</code> dé 512.</p>` },
        { n: 2, titulo: 'Escribe la gramática',
          enunciado: 'Escribe en notación BNF la gramática de: (a) una lista de números separados por comas, posiblemente vacía; (b) una instrucción Si-Entonces-Sino-FinSi; (c) una llamada a función con cero o más argumentos; (d) una declaración de variables como <code>Definir a, b, c Como Entero</code>.',
          pista: 'Usa * para «cero o más», ? para «opcional» y | para alternativas.',
          solucion: `${cod('txt', `(a)  lista       ::= ( numero ( "," numero )* )?

(b)  si          ::= "Si" expresion "Entonces" bloque
                     ( "Sino" bloque )?
                     "FinSi"
     bloque      ::= instruccion*

(c)  llamada     ::= IDENTIFICADOR "(" ( expresion ( "," expresion )* )? ")"

(d)  definicion  ::= "Definir" IDENTIFICADOR ( "," IDENTIFICADOR )* "Como" tipo
     tipo        ::= "Entero" | "Real" | "Cadena" | "Logico" | "Caracter"`)}
<p><b>El patrón que se repite:</b> «uno o más elementos separados por comas» se escribe siempre igual: <code>elem ("," elem)*</code>. Y para permitir la lista vacía se envuelve todo en <code>( ... )?</code>. Reconocer ese patrón ahorra mucho tiempo al escribir gramáticas.</p>
<p><b>Lo valioso de (b):</b> el <code>FinSi</code> obligatorio hace la gramática <b>no ambigua</b>. Con <code>Si a Entonces Si b Entonces x Sino y FinSi FinSi</code> no hay ninguna duda sobre a qué <code>Si</code> pertenece el <code>Sino</code>: los terminadores lo determinan. Esa es una decisión de diseño de lenguaje, no un capricho de la notación.</p>
<p><b>Y una observación sobre (c):</b> esta regla es la misma que usan Python, C, Java y JavaScript. Las gramáticas de los lenguajes reales se parecen muchísimo entre sí, y por eso leer uno nuevo cuesta tan poco.</p>` },
        { n: 3, titulo: 'Implementa el parser',
          enunciado: 'Implementa en JavaScript un parser descendente recursivo para expresiones aritméticas que construya el AST y lo evalúe. Debe respetar precedencia y paréntesis. Pruébalo con <code>2 + 3 * 4</code> y <code>(2 + 3) * 4</code>.',
          pista: 'Una función por nivel de precedencia, más una función que evalúa el árbol recursivamente.',
          solucion: `${cod('js', `function parsear(tokens) {
  let p = 0;
  const actual = () => tokens[p];
  const esOp = (...ops) => actual().t === "OP" && ops.includes(actual().v);
  const comer = () => tokens[p++];

  function expresion() {                 // nivel + −
    let nodo = termino();
    while (esOp("+", "-")) {
      const op = comer().v;
      nodo = { tipo: "bin", op, izq: nodo, der: termino() };
    }
    return nodo;
  }

  function termino() {                   // nivel * /
    let nodo = factor();
    while (esOp("*", "/")) {
      const op = comer().v;
      nodo = { tipo: "bin", op, izq: nodo, der: factor() };
    }
    return nodo;
  }

  function factor() {                    // hojas y paréntesis
    const t = actual();
    if (t.t === "NUM") { comer(); return { tipo: "num", valor: t.v }; }
    if (t.t === "ID")  { comer(); return { tipo: "var", nombre: t.v }; }
    if (esOp("-"))     { comer(); return { tipo: "neg", e: factor() }; }
    if (esOp("(")) {
      comer();
      const e = expresion();             // ← recursión
      if (!esOp(")")) throw new Error(\`Falta ')' en la línea \${actual().l}\`);
      comer();
      return e;
    }
    throw new Error(\`Se esperaba un número o '(' en la línea \${t.l}, columna \${t.c}\`);
  }

  const arbol = expresion();
  if (actual().t !== "EOF") throw new Error(\`Sobra '\${actual().v}' en la línea \${actual().l}\`);
  return arbol;
}

function evaluar(nodo, vars = {}) {
  switch (nodo.tipo) {
    case "num": return nodo.valor;
    case "var":
      if (!(nodo.nombre in vars)) throw new Error(\`Variable no definida: \${nodo.nombre}\`);
      return vars[nodo.nombre];
    case "neg": return -evaluar(nodo.e, vars);
    case "bin": {
      const a = evaluar(nodo.izq, vars), b = evaluar(nodo.der, vars);
      if (nodo.op === "/" && b === 0) throw new Error("División entre cero");
      return { "+": a + b, "-": a - b, "*": a * b, "/": a / b }[nodo.op];
    }
  }
}

// (usa el lexer del ejercicio anterior)
for (const txt of ["2 + 3 * 4", "(2 + 3) * 4", "precio * 1.18"]) {
  const arbol = parsear(lexer(txt));
  console.log(txt, "=", evaluar(arbol, { precio: 100 }));
}`)}
<p><b>Lo que hay que observar:</b></p>
<ul>
<li><b>No hay ninguna tabla de precedencia.</b> Que <code>*</code> gane a <code>+</code> está codificado en que <code>expresion()</code> llama a <code>termino()</code> y no al revés. Añadir un nivel de precedencia es añadir una función entre medias.</li>
<li><b>La comprobación final de EOF</b> detecta entradas como <code>2 + 3)</code>, donde el parser analiza correctamente <code>2 + 3</code> y sobra texto. Sin ella, el error pasaría inadvertido.</li>
<li><b>El AST es una estructura de datos corriente</b> —objetos anidados— y evaluarlo es un recorrido recursivo. Esa separación entre <i>construir el árbol</i> y <i>hacer algo con él</i> es lo que permite que el mismo árbol sirva para evaluar, optimizar, generar código o dibujar un diagrama de flujo.</li>
</ul>` },
        { n: 4, titulo: 'Ambigüedad',
          enunciado: 'Esta gramática es ambigua: <code>expr ::= expr "+" expr | expr "*" expr | NUMERO</code>. (a) Muestra dos árboles distintos para <code>2 + 3 * 4</code>. (b) Reescríbela para que no sea ambigua y dé la precedencia correcta. (c) Explica por qué la ambigüedad es un problema grave.',
          pista: 'Sin niveles, nada dice cuál operador agrupa primero.',
          solucion: `<p><b>(a) Dos árboles válidos según esa gramática:</b></p>
<pre>Árbol 1 (correcto)        Árbol 2 (incorrecto)
      +                          *
     / \\                        / \\
    2    *                     +    4
        / \\                   / \\
       3   4                  2   3
    = 2 + 12 = 14            = 5 * 4 = 20</pre>
<p>La gramática <b>admite los dos</b>. No hay nada en ella que diga cuál es el correcto, y por tanto el significado de la expresión depende de qué parser la analice.</p>
<p><b>(b) Gramática no ambigua con niveles:</b></p>
${cod('txt', `expr    ::= term ( "+" term )*
term    ::= factor ( "*" factor )*
factor  ::= NUMERO | "(" expr ")"`)}
<p>Ahora solo es posible el árbol 1: una <code>expr</code> solo puede tener <code>+</code> en su nivel superior, y sus operandos son <code>term</code>, que son los que contienen las multiplicaciones. La jerarquía de reglas <b>es</b> la jerarquía de precedencia.</p>
<p><b>(c) Por qué es grave:</b></p>
<ul>
<li><b>El programa tiene dos significados.</b> El mismo código fuente podría calcular 14 o 20 según la implementación, lo que destruye la portabilidad y hace imposible razonar sobre el programa.</li>
<li><b>Los generadores de parsers lo rechazan</b> o resuelven el conflicto con reglas arbitrarias (yacc prefiere desplazar sobre reducir), lo que produce comportamientos que nadie eligió conscientemente.</li>
<li><b>Es indecidible</b> saber en general si una gramática libre de contexto es ambigua. No hay un algoritmo que lo compruebe automáticamente: hay que diseñarla bien.</li>
</ul>
<p><b>El caso real más famoso</b> es el <i>dangling else</i>, que sigue presente en C, Java y JavaScript y se resuelve por convención. La lección de diseño: <b>los terminadores explícitos</b> (<code>FinSi</code>, <code>end</code>, llaves obligatorias) eliminan clases enteras de ambigüedad. Por eso muchas guías de estilo exigen llaves incluso para una sola instrucción, y por eso Python, con su indentación significativa, tampoco tiene el problema.</p>` },
        { n: 5, titulo: 'Extiende la gramática',
          enunciado: 'Partiendo de la gramática de expresiones aritméticas, extiéndela para incluir: operadores de comparación (&lt;, &gt;, =), operadores lógicos Y y O, y el operador NO. Respeta la precedencia habitual y explica dónde colocaste cada nivel y por qué.',
          pista: 'Más precedencia = más abajo en la gramática. El O es el de menor precedencia.',
          solucion: `${cod('txt', `expr_o      ::= expr_y ( "O" expr_y )*
expr_y      ::= expr_no ( "Y" expr_no )*
expr_no     ::= "NO" expr_no | comparacion
comparacion ::= suma ( ( "<" | ">" | "<=" | ">=" | "=" | "<>" ) suma )*
suma        ::= termino ( ( "+" | "-" ) termino )*
termino     ::= potencia ( ( "*" | "/" | "MOD" ) potencia )*
potencia    ::= unario ( "^" potencia )?            ← recursión: asocia a la DERECHA
unario      ::= "-" unario | factor
factor      ::= NUMERO | CADENA | "Verdadero" | "Falso"
              | IDENTIFICADOR ( "[" expr_o ( "," expr_o )* "]" )?
              | IDENTIFICADOR "(" ( expr_o ( "," expr_o )* )? ")"
              | "(" expr_o ")"`)}
<p><b>El orden, de menor a mayor precedencia</b>, que es de arriba abajo en la gramática:</p>
${tabla(['#Nivel', 'Regla', 'Operadores', 'Por qué ahí'], [
  ['1 (menor)', '<code>expr_o</code>', '<code>O</code>', 'el de menor precedencia: <code>a Y b O c</code> es <code>(a Y b) O c</code>'],
  ['2', '<code>expr_y</code>', '<code>Y</code>', 'más fuerte que O, igual que en lógica'],
  ['3', '<code>expr_no</code>', '<code>NO</code>', 'unario, se aplica a lo que sigue'],
  ['4', '<code>comparacion</code>', '<code>&lt; &gt; = &lt;&gt;</code>', 'más fuerte que los lógicos: <code>a &gt; 0 Y b &gt; 0</code> funciona sin paréntesis'],
  ['5', '<code>suma</code>', '<code>+ −</code>', 'más fuerte que comparar: <code>a + 1 &gt; b</code>'],
  ['6', '<code>termino</code>', '<code>* / MOD</code>', 'la multiplicación antes que la suma'],
  ['7', '<code>potencia</code>', '<code>^</code>', 'más que multiplicar, y asocia a la derecha'],
  ['8 (mayor)', '<code>unario</code>, <code>factor</code>', 'signo, literales, paréntesis', 'las hojas del árbol']
])}
<p><b>Las tres decisiones que importan:</b></p>
<ul>
<li><b>Las comparaciones por encima de los lógicos</b> es lo que permite escribir <code>edad &gt;= 18 Y tieneDNI</code> sin paréntesis. Si estuvieran al revés, el parser intentaría comparar <code>18 Y tieneDNI</code> y el código no compilaría. (C, por un error histórico de diseño, puso los operadores de bits <code>&amp;</code> y <code>|</code> con precedencia <i>menor</i> que las comparaciones, lo que obliga a escribir <code>(a &amp; 1) == 0</code> con paréntesis y es una fuente conocida de bugs.)</li>
<li><b><code>potencia</code> se define con recursión a la derecha</b> (<code>unario ( "^" potencia )?</code>) en lugar de con un bucle, y eso es exactamente lo que produce <code>2^3^2 = 2^(3^2) = 512</code>.</li>
<li><b><code>factor</code> admite indexación y llamada</b>, y ambas usan <code>expr_o</code> dentro de los corchetes o paréntesis, lo que permite escribir <code>a[i + 1]</code> o <code>f(x &gt; 0, y)</code>. Esa recursión al nivel más alto es lo que hace el lenguaje componible.</li>
</ul>
<p>Esta gramática es, salvo detalles, <b>la del intérprete que usa el laboratorio de este curso</b>. En el último tema del módulo verás su implementación.</p>` }
      ],
      quiz: [
        { p: 'En un parser descendente recursivo, la precedencia de operadores se codifica…',
          ops: ['en una tabla aparte', 'en la estructura de la gramática: cada nivel de precedencia es un nivel de reglas',
            'en el lexer', 'con paréntesis obligatorios'],
          ok: 1, exp: 'Que <code>expresion</code> llame a <code>termino</code> y no al revés es lo que hace que la multiplicación se agrupe antes que la suma.' },
        { p: 'Una gramática ambigua es aquella que…',
          ops: ['tiene demasiadas reglas', 'permite construir dos árboles distintos para la misma entrada',
            'usa recursión', 'no tiene caso base'],
          ok: 1, exp: 'Significa que el mismo programa tiene dos significados posibles. El caso clásico es el «dangling else», que los terminadores explícitos eliminan.' },
        { p: 'Los paréntesis de una expresión, en el AST resultante…',
          ops: ['aparecen como nodos', 'no aparecen: ya cumplieron su función al determinar la forma del árbol',
            'se convierten en operadores', 'se guardan como comentarios'],
          ok: 1, exp: 'Son notación para humanos. Una vez construido el árbol, la estructura ya codifica el orden de evaluación.' }
      ]
    },

    {
      id: 'm9-4',
      titulo: 'Análisis semántico y tabla de símbolos',
      resumen: 'Lo que la sintaxis no puede comprobar: declaraciones, ámbitos, tipos y el significado de los mensajes de error.',
      objetivos: [
        'Explicar qué errores detecta el análisis semántico',
        'Describir la estructura y el uso de una tabla de símbolos',
        'Entender la comprobación e inferencia de tipos'
      ],
      lectura: `
<p>Una frase puede ser sintácticamente correcta y no significar nada: <em>«las ideas verdes incoloras duermen
furiosamente»</em> (el ejemplo de Chomsky). Lo mismo pasa en programación:</p>

${cod('pseudo', `x <- "hola" * 3          // sintaxis perfecta, no tiene sentido
y <- z + 1               // ¿y z? nunca se declaró
resultado <- f(1, 2, 3)  // ¿y si f solo recibe dos parámetros?`)}

<p>El <strong>análisis semántico</strong> recorre el AST comprobando que el programa tenga significado. Es la fase que
produce la mayoría de los mensajes de error útiles.</p>

<h2>Lo que comprueba</h2>
${tabla(['Comprobación', 'Ejemplo de error'], [
  ['Declaración antes de uso', '«la variable <code>z</code> no está definida»'],
  ['No redeclarar en el mismo ámbito', '«<code>x</code> ya fue declarada en la línea 4»'],
  ['Compatibilidad de tipos', '«no se puede multiplicar un texto por un número»'],
  ['Número y tipo de argumentos', '«<code>f</code> espera 2 parámetros y recibió 3»'],
  ['Tipo de retorno', '«la función debe devolver un entero y devuelve texto»'],
  ['Condiciones booleanas', '«la condición del <code>Si</code> debe ser lógica»'],
  ['Acceso válido', '«<code>x</code> no es un arreglo», «el método es privado»'],
  ['Caminos de retorno', '«no todos los caminos devuelven un valor»'],
  ['Código inalcanzable', 'aviso: «esta instrucción nunca se ejecuta»']
])}

<h2>La tabla de símbolos</h2>
<p>Es la estructura central de esta fase: un registro de todo lo declarado, con su información asociada.</p>

${tabla(['Nombre', 'Clase', 'Tipo', 'Ámbito', 'Línea', 'Otros datos'], [
  ['<code>total</code>', 'variable', 'real', 'global', '3', 'dirección 0x04'],
  ['<code>i</code>', 'variable', 'entero', 'bucle en main', '12', 'registro R2'],
  ['<code>calcular</code>', 'función', '(real, entero) → real', 'global', '20', '2 parámetros'],
  ['<code>MAX</code>', 'constante', 'entero', 'global', '1', 'valor 100']
], 'La tabla guarda mucho más que el nombre: tipo, ámbito, dónde se declaró y, más adelante, dónde vive en memoria.')}

<p>Internamente es una <strong>tabla hash</strong> (módulo 6), porque las búsquedas por nombre son constantes y
numerosísimas. Y para manejar los ámbitos se usa una <strong>pila de tablas</strong>: al entrar en un bloque se apila
una tabla nueva, y al salir se desapila.</p>

${cod('pseudo', `Definir x Como Entero        // tabla global: {x}
Funcion f(a)
	Definir y Como Real      // tabla de f: {a, y} apilada sobre la global
	y <- x + a               // 'x' no está en la tabla de f → busca en la global ✓
FinFuncion                   // al salir, la tabla de f se desapila
// aquí 'y' ya no existe`)}

<p>Buscar un nombre consiste en mirar la tabla más interna y, si no está, subir. Eso implementa exactamente las reglas
de ámbito del módulo 3, y explica el <strong>sombreado</strong> (<em>shadowing</em>): si declaras una variable local con
el mismo nombre que una global, la búsqueda encuentra primero la local y la global queda oculta.</p>

<h2>Comprobación de tipos</h2>
<p>El comprobador recorre el AST de abajo arriba calculando el tipo de cada nodo:</p>

${cod('txt', `          "+"  →  ¿real + entero? → sí, resultado: real
         /   \\
    precio    1     precio: real (de la tabla)
                    1: entero (literal)`)}

<p>Las reglas incluyen qué operaciones son válidas para qué tipos y qué <strong>conversiones implícitas</strong> se
permiten. Un lenguaje de tipado fuerte rechaza <code>"5" * 3</code>; uno débil lo convierte. Esa decisión se toma aquí.</p>

<h2>Inferencia de tipos</h2>
<p>Los lenguajes modernos deducen el tipo en lugar de exigir que lo escribas:</p>

${cod('txt', `let x = 5;              // Rust infiere i32
let v = vec![1, 2, 3];  // Vec<i32>
let s = v.iter().sum(); // el tipo de s se deduce del uso posterior`)}

<p>Lo notable es que la inferencia no es solo «mirar el valor inicial»: el algoritmo de Hindley-Milner, usado en ML y
Haskell y adaptado en Rust y Swift, resuelve un sistema de ecuaciones de tipos sobre todo el programa. Puede deducir el
tipo de una función <em>sin que aparezca ni una anotación</em>, y rechazar el programa si las ecuaciones no tienen
solución.</p>

<p>Eso da lo mejor de los dos mundos: la brevedad del tipado dinámico y la seguridad del estático. Es la razón de que
TypeScript, Kotlin, Swift y Rust hayan tenido tanta aceptación.</p>

<h2>Por qué importa para ti</h2>
${nota('Los mensajes de error que lees vienen de aquí',
  '<p>«Cannot find symbol», «incompatible types», «undefined variable», «wrong number of arguments»: todos son del ' +
  'análisis semántico. Saber que el compilador está consultando una tabla de símbolos y comparando tipos convierte ' +
  'esos mensajes de obstáculos misteriosos en información concreta sobre qué esperaba y qué encontró.</p>', 'key')}

<p>Y explica una experiencia frecuente: <strong>el compilador reporta el error en una línea posterior a la real</strong>.
Si olvidas un <code>FinSi</code>, el parser sigue aceptando instrucciones como parte del bloque y solo detecta el
problema cuando llega a algo imposible, que puede ser treinta líneas más abajo. Por eso la regla de depuración es mirar
<em>desde</em> la línea reportada <em>hacia arriba</em>.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Clasifica los errores',
          enunciado: 'Di en qué fase se detecta cada error: (a) falta un paréntesis de cierre; (b) se usa una variable no declarada; (c) hay un carácter <code>@</code> suelto; (d) se suma un texto con un número en un lenguaje fuerte; (e) una función declarada para devolver entero no devuelve nada en un camino; (f) división entre cero con valores conocidos.',
          pista: 'Léxico = caracteres, sintáctico = estructura, semántico = significado, ejecución = valores.',
          solucion: `<p><b>(a) Sintáctico.</b> La estructura no encaja con la gramática.</p>
<p><b>(b) Semántico.</b> El nombre no está en la tabla de símbolos. Sintácticamente, <code>z + 1</code> es una expresión perfectamente válida.</p>
<p><b>(c) Léxico.</b> Ningún token empieza con ese carácter.</p>
<p><b>(d) Semántico.</b> La comprobación de tipos. En un lenguaje débil no sería error, sino una conversión.</p>
<p><b>(e) Semántico.</b> El análisis de caminos de retorno recorre el flujo de control del AST y comprueba que todas las ramas terminen en un <code>return</code>.</p>
<p><b>(f) Depende, y es el caso interesante:</b> si el divisor es una variable, es un error de <b>ejecución</b> y no se puede detectar antes. Pero si es una constante literal (<code>x / 0</code>), muchos compiladores lo detectan durante la <b>optimización</b>, cuando propagan constantes, y emiten un aviso o un error. Es un buen ejemplo de que las fronteras entre fases no son absolutas: cuanta más información tenga el compilador, más errores puede adelantar.</p>` },
        { n: 2, titulo: 'Construye la tabla de símbolos',
          enunciado: 'Construye la tabla de símbolos (con ámbitos) para este código e indica en qué línea se detectaría cada error.<br><pre>1  Definir total Como Real\n2  Funcion f(a, b)\n3      Definir total Como Entero\n4      total <- a + b\n5      Retornar total + c\n6  FinFuncion\n7  total <- f(1, 2)\n8  Escribir a</pre>',
          pista: 'Dos ámbitos, un sombreado y dos errores.',
          solucion: `<p><b>Tabla global</b> (vigente en todo el programa):</p>
${tabla(['Nombre', 'Clase', 'Tipo', 'Línea'], [
  ['<code>total</code>', 'variable', 'real', '1'],
  ['<code>f</code>', 'función', '(?, ?) → ?', '2']
])}
<p><b>Tabla local de <code>f</code></b> (apilada sobre la global, líneas 2-6):</p>
${tabla(['Nombre', 'Clase', 'Tipo', 'Línea'], [
  ['<code>a</code>', 'parámetro', '—', '2'],
  ['<code>b</code>', 'parámetro', '—', '2'],
  ['<code>total</code>', 'variable', 'entero', '3 ← <b>sombrea</b> a la global']
])}
<p><b>Errores detectados:</b></p>
<ul>
<li><b>Línea 5:</b> <code>c</code> no está en la tabla local de <code>f</code> ni en la global. Error: «variable no definida: c».</li>
<li><b>Línea 8:</b> <code>a</code> era un <b>parámetro de f</b>, y su tabla se desapiló al llegar al <code>FinFuncion</code> de la línea 6. En la línea 8 ya no existe. Error: «variable no definida: a».</li>
</ul>
<p><b>El sombreado de la línea 3</b> no es un error: es legal y significa que, dentro de <code>f</code>, el nombre <code>total</code> se refiere a la variable local entera, y la global real queda inaccesible. La línea 4 escribe en la local, y la línea 7 escribe en la global. Muchos compiladores emiten un <b>aviso</b> porque es una fuente frecuente de confusión, pero no es ilegal.</p>
<p><b>Esto es exactamente lo que ocurre en los lenguajes reales</b>, y explica por qué una variable «desaparece» al salir de una función y por qué a veces un cambio no surte efecto: estabas modificando una local que sombreaba a la que creías.</p>` },
        { n: 3, titulo: 'Comprobación de tipos',
          enunciado: 'Para cada expresión, di qué tipo tendría el resultado y si habría error, en un lenguaje de tipado fuerte con enteros, reales, cadenas y lógicos: (a) <code>3 + 4.5</code>; (b) <code>"a" + "b"</code>; (c) <code>"a" + 1</code>; (d) <code>3 &gt; 2</code>; (e) <code>Verdadero + 1</code>; (f) <code>Si 5 Entonces</code>; (g) <code>3 / 0</code>.',
          pista: 'Piensa qué conversiones implícitas son razonables y cuáles no.',
          solucion: `<p><b>(a) real.</b> Se promociona el entero a real; es una conversión <b>ampliadora</b> y no pierde información, así que casi todos los lenguajes fuertes la permiten.</p>
<p><b>(b) cadena.</b> El <code>+</code> está sobrecargado para concatenar. Es legal pero discutible: algunos lenguajes prefieren un operador distinto (<code>.</code> en PHP, <code>..</code> en Lua, <code>&lt;&gt;</code> en Haskell) precisamente para evitar la ambigüedad del caso (c).</p>
<p><b>(c) Error en un lenguaje fuerte.</b> Python lanza <code>TypeError</code>. JavaScript, que es débil, devuelve <code>"a1"</code>. Java hace una excepción pragmática y convierte el número a texto. Las tres decisiones son defendibles; lo importante es saber cuál sigue tu lenguaje.</p>
<p><b>(d) lógico.</b> Los operadores relacionales siempre producen booleanos.</p>
<p><b>(e) Error en un lenguaje fuerte.</b> En C sería 2 (los booleanos son enteros); en Python, curiosamente, también funciona y da 2, porque <code>bool</code> hereda de <code>int</code>: una herencia que viola el espíritu del tipado fuerte y se conserva por compatibilidad histórica.</p>
<p><b>(f) Error en un lenguaje fuerte:</b> la condición debe ser lógica, no numérica. En C y JavaScript es legal (cualquier valor distinto de 0 es verdadero), y de ahí viene el bug clásico <code>if (x = 5)</code> del módulo 3: la asignación devuelve 5, que es «verdadero». Exigir que la condición sea <b>estrictamente booleana</b> es una decisión de diseño que <b>elimina esa clase entera de errores</b>, y es lo que hacen Java, Go y Rust.</p>
<p><b>(g) El tipo es real (o entero), sin error de tipos.</b> La división entre cero no es un problema de <i>tipos</i>: los tipos son compatibles. Es un error de <b>valor</b>, y por tanto de ejecución, salvo que el optimizador detecte la constante y lo adelante.</p>
<p><b>La observación transversal:</b> cuanto más estricto el sistema de tipos, más errores se detectan antes de ejecutar, y más ceremonia hay que escribir. Ninguna posición es objetivamente correcta: es un intercambio entre seguridad y flexibilidad, y cada lenguaje lo resuelve donde cree que está el equilibrio para su dominio.</p>` },
        { n: 4, titulo: 'Implementa el comprobador',
          enunciado: 'Implementa en JavaScript un comprobador semántico sencillo sobre el AST del tema anterior: debe verificar que toda variable usada esté declarada y llevar una tabla de símbolos con ámbitos anidados. Reporta todos los errores, no solo el primero.',
          pista: 'Una pila de Maps y un recorrido recursivo del árbol que acumula errores en una lista.',
          solucion: `${cod('js', `class TablaSimbolos {
  constructor() { this.ambitos = [new Map()]; }

  entrarAmbito()  { this.ambitos.push(new Map()); }
  salirAmbito()   { this.ambitos.pop(); }

  declarar(nombre, info) {
    const actual = this.ambitos[this.ambitos.length - 1];
    if (actual.has(nombre)) {
      return \`'\${nombre}' ya fue declarada en este ámbito (línea \${actual.get(nombre).linea})\`;
    }
    actual.set(nombre, info);
    return null;
  }

  buscar(nombre) {
    for (let i = this.ambitos.length - 1; i >= 0; i--) {   // del más interno al global
      if (this.ambitos[i].has(nombre)) return this.ambitos[i].get(nombre);
    }
    return null;
  }
}

function analizar(nodos) {
  const tabla = new TablaSimbolos();
  const errores = [];

  function visitar(n) {
    switch (n.tipo) {
      case "declarar": {
        const err = tabla.declarar(n.nombre, { tipo: n.tipoDato, linea: n.linea });
        if (err) errores.push({ linea: n.linea, msg: err });
        break;
      }
      case "var": {
        if (!tabla.buscar(n.nombre)) {
          errores.push({ linea: n.linea, msg: \`Variable no definida: '\${n.nombre}'\` });
        }
        break;
      }
      case "asignar":
        visitar(n.valor);
        if (!tabla.buscar(n.destino)) {
          errores.push({ linea: n.linea, msg: \`Asignación a variable no declarada: '\${n.destino}'\` });
        }
        break;
      case "bloque":
        tabla.entrarAmbito();
        n.cuerpo.forEach(visitar);
        tabla.salirAmbito();                 // ← las locales desaparecen aquí
        break;
      case "bin":
        visitar(n.izq); visitar(n.der);
        break;
      case "num": break;
    }
  }

  nodos.forEach(visitar);
  return errores;
}

// los errores se reportan TODOS, ordenados por línea
for (const e of analizar(ast).sort((a, b) => a.linea - b.linea)) {
  console.log(\`línea \${e.linea}: \${e.msg}\`);
}`)}
<p><b>Las tres decisiones de diseño:</b></p>
<ul>
<li><b>Pila de <code>Map</code>:</b> cada bloque apila un ámbito y lo desapila al salir. Buscar recorre de adentro hacia afuera, lo que implementa el sombreado automáticamente.</li>
<li><b>Acumular errores en lugar de lanzar una excepción.</b> Un compilador que se detiene en el primer error obliga al programador a recompilar una vez por cada error, y eso es exasperante. Reportar todos los de una pasada es la diferencia entre una herramienta usable y una que no lo es.</li>
<li><b>Ordenar por línea.</b> El recorrido del AST no visita los nodos en orden textual, así que los errores salen desordenados. Ordenarlos antes de mostrarlos es un detalle pequeño que cambia por completo la experiencia.</li>
</ul>
<p><b>Lo que falta para un comprobador real:</b> la <b>recuperación de errores</b>, es decir, decidir si una variable no declarada se añade a la tabla con tipo «desconocido» para evitar cien errores en cascada sobre la misma variable. Los compiladores buenos invierten mucho esfuerzo ahí: lo difícil no es detectar el primer error, es que los siguientes sigan siendo informativos.</p>` },
        { n: 5, titulo: 'Interpreta los mensajes',
          enunciado: 'Explica qué significa cada mensaje real, en qué fase se produjo y cómo lo diagnosticarías: (a) «NameError: name \'x\' is not defined» (Python); (b) «error: expected \';\' before \'}\' token» (C); (c) «Cannot read property \'nombre\' of undefined» (JavaScript); (d) «undefined reference to \'calcular\'» (enlazador de C).',
          pista: 'Dos son de compilación, uno de ejecución y uno del enlazador.',
          solucion: `<p><b>(a) Semántico, en ejecución.</b> Python es dinámico, así que la comprobación de nombres ocurre al ejecutar la línea. Causas típicas: error de tipeo en el nombre, usarlo antes de asignarlo, o estar en otro ámbito (una variable de una función usada fuera). <b>Diagnóstico:</b> comprobar la ortografía y de dónde debería venir ese valor.</p>
<p><b>(b) Sintáctico.</b> El parser esperaba un punto y coma y encontró una llave. <b>Y aquí está lo importante:</b> el error casi nunca está en la línea reportada, sino en la <b>anterior</b>, donde falta el punto y coma. El parser siguió leyendo sin problema hasta encontrar algo imposible. <b>Diagnóstico:</b> mirar desde la línea reportada <b>hacia arriba</b>.</p>
<p><b>(c) Ejecución.</b> No es un error de tipos ni de nombres: la variable existe, pero vale <code>undefined</code>, y <code>undefined.nombre</code> no tiene sentido. Causas típicas: un arreglo accedido fuera de rango, una propiedad de un objeto que llegó sin ese campo (de una API, por ejemplo), o una función que no devolvió nada. <b>Diagnóstico:</b> imprimir el objeto justo antes de usarlo; el valor <code>undefined</code> se produjo <i>antes</i>, y hay que rastrear de dónde vino. Es el error más frecuente de JavaScript y la razón de que exista el operador <code>?.</code>.</p>
<p><b>(d) Enlazado.</b> No es del compilador: el compilador <b>aceptó</b> la llamada porque había una declaración que prometía que <code>calcular</code> existiría. El enlazador buscó la implementación y no la encontró. Causas: se declaró pero no se implementó, se olvidó incluir el archivo objeto al compilar, falta una biblioteca, o el nombre no coincide exactamente (en C++, por la <i>decoración</i> de nombres, basta que la firma difiera). <b>Diagnóstico:</b> comprobar que el archivo que implementa la función está en la línea de compilación.</p>
<p><b>El patrón transversal:</b> saber qué fase produjo un mensaje <b>te dice dónde buscar</b>. Un error léxico está en el carácter señalado; uno sintáctico, en la línea anterior o en un delimitador sin cerrar más arriba; uno semántico, en la declaración o en el tipo; uno de enlazado, en la configuración de la compilación; uno de ejecución, en el valor que llegó y no en la línea que explotó. Esa clasificación convierte la depuración en una búsqueda dirigida.</p>` }
      ],
      quiz: [
        { p: 'Usar una variable no declarada es un error…',
          ops: ['léxico', 'sintáctico', 'semántico', 'de enlazado'],
          ok: 2, exp: 'Sintácticamente la expresión es válida; lo que falla es el significado. El comprobador busca el nombre en la tabla de símbolos y no lo encuentra.' },
        { p: 'La tabla de símbolos maneja los ámbitos mediante…',
          ops: ['una lista ordenada', 'una pila de tablas: se apila al entrar en un bloque y se desapila al salir',
            'un arreglo global', 'un árbol binario'],
          ok: 1, exp: 'Buscar un nombre recorre de la tabla más interna hacia afuera, lo que implementa las reglas de ámbito y el sombreado.' },
        { p: 'Si el compilador reporta «falta un ;» en la línea 40 y la línea 40 parece correcta…',
          ops: ['el compilador está mal', 'el error suele estar en la línea anterior o en un bloque sin cerrar más arriba',
            'hay que reinstalar el compilador', 'es un error de ejecución'],
          ok: 1, exp: 'El parser siguió leyendo hasta encontrar algo imposible. La regla de depuración es mirar desde la línea reportada hacia arriba.' }
      ]
    },

    {
      id: 'm9-5',
      titulo: 'Generación de código y optimización',
      resumen: 'Del árbol al código intermedio, las optimizaciones clásicas y por qué el compilador suele escribir mejor ensamblador que tú.',
      objetivos: [
        'Describir cómo se genera código a partir de un AST',
        'Reconocer las optimizaciones clásicas de un compilador',
        'Entender qué puede y qué no puede optimizar un compilador'
      ],
      lectura: `
<p>Con el AST validado y anotado con tipos, queda traducirlo. Se hace en dos pasos: primero a una
<strong>representación intermedia</strong> independiente de la máquina, y después al código de la máquina destino.</p>

<h2>Generar código desde el árbol</h2>
<p>La generación básica es un recorrido <strong>postorden</strong> del AST: primero los hijos, luego el nodo. Para una
máquina de pila sale directamente:</p>

${cod('txt', `Expresión:  (a + b) * 2

          *
         / \\
        +    2
       / \\
      a   b

Recorrido postorden: a, b, +, 2, *

Código generado:
  LOAD  a        ← visitar hoja izquierda
  LOAD  b        ← visitar hoja derecha
  ADD            ← visitar el nodo +
  PUSH  2
  MUL            ← visitar el nodo *`)}

<p>Para las estructuras de control, el generador produce <strong>etiquetas y saltos</strong>, que es en lo que acaban
convirtiéndose todos los <code>Si</code> y <code>Mientras</code> que has escrito:</p>

${cod('txt', `Si x > 0 Entonces              Mientras i < n Hacer
	y <- 1                            suma <- suma + i
Sino                                  i <- i + 1
	y <- 2                        FinMientras
FinSi

   LOAD x                         inicio:
   PUSH 0                            LOAD i
   CMP_GT                            LOAD n
   JUMP_IF_FALSE sino                CMP_LT
   PUSH 1                            JUMP_IF_FALSE fin
   STORE y                           ... cuerpo ...
   JUMP finsi                        JUMP inicio
sino:                             fin:
   PUSH 2
   STORE y
finsi:`)}

<p>Ahí se ve con claridad lo que decía el módulo 1: todo condicional es una comparación, una bandera y un salto. Las
estructuras de control son una comodidad para humanos que desaparece en la traducción.</p>

<h2>Las optimizaciones clásicas</h2>

${tabla(['Optimización', 'Antes', 'Después'], [
  ['<b>Plegado de constantes</b>', '<code>x = 2 * 60 * 60</code>', '<code>x = 7200</code> (calculado al compilar)'],
  ['<b>Propagación de constantes</b>', '<code>a = 5; b = a + 3</code>', '<code>b = 8</code>'],
  ['<b>Eliminación de código muerto</b>', '<code>if (false) { ... }</code>', 'se elimina el bloque entero'],
  ['<b>Subexpresiones comunes</b>', '<code>x = a*b + c; y = a*b + d</code>', '<code>t = a*b; x = t+c; y = t+d</code>'],
  ['<b>Invariantes fuera del bucle</b>', '<code>for(..) { x = a*b; ... }</code>', '<code>x = a*b; for(..) { ... }</code>'],
  ['<b>Reducción de fuerza</b>', '<code>x * 2</code>', '<code>x &lt;&lt; 1</code> (desplazamiento, más barato)'],
  ['<b>Desenrollado de bucles</b>', '4 vueltas con una operación', '1 vuelta con 4 operaciones: menos saltos'],
  ['<b>Inlining</b>', '<code>y = cuadrado(x)</code>', '<code>y = x * x</code>: sin llamada'],
  ['<b>Asignación de registros</b>', 'variables en memoria', 'variables en registros de la CPU'],
  ['<b>Eliminación de recursión final</b>', 'llamada recursiva final', 'un salto: no crece la pila']
], 'Un compilador con optimización activada aplica decenas de pasadas como estas, repetidamente, porque cada una habilita otras.')}

<p>El <strong>inlining</strong> merece atención porque es la optimización que más habilita a las demás: al sustituir la
llamada por el cuerpo de la función, el compilador puede ver las constantes del llamador y propagar, plegar y eliminar
código a través de la frontera de la función. Es la razón por la que escribir funciones pequeñas no cuesta rendimiento:
el compilador las hace desaparecer.</p>

<h2>Lo que el compilador no puede optimizar</h2>
<p>Y aquí está la parte importante para ti como programador:</p>

<ul>
  <li><strong>No puede cambiar tu algoritmo.</strong> Un burbuja O(n²) sigue siendo O(n²) con todas las optimizaciones
  activadas. El compilador ajusta el factor constante; <strong>tú</strong> eliges la clase de complejidad. Esa es la
  diferencia de magnitudes del módulo 7.</li>
  <li><strong>No puede arreglar los accesos a memoria.</strong> Si recorres una matriz por columnas, el compilador a
  veces puede reordenar los bucles, pero en general los patrones de acceso son decisión tuya.</li>
  <li><strong>No puede eliminar trabajo que podría tener efectos.</strong> Si una función escribe en un archivo o
  modifica una variable global, el compilador no puede suprimir la llamada aunque el resultado no se use.</li>
  <li><strong>No puede suponer lo que no sabe.</strong> Si dos punteros podrían apuntar al mismo sitio
  (<em>aliasing</em>), el compilador debe asumir lo peor y renunciar a muchas optimizaciones. Por eso C tiene
  <code>restrict</code> y por eso Rust puede optimizar más agresivamente: su sistema de propiedad <em>garantiza</em> que
  no hay alias.</li>
</ul>

${nota('La regla de oro del rendimiento',
  '<p><strong>Primero mide, después optimiza, y optimiza el algoritmo antes que el código.</strong> ' +
  'Donald Knuth: «la optimización prematura es la raíz de todos los males». La cita completa añade un matiz que casi ' +
  'siempre se omite: «…en el 97% de los casos. No debemos dejar pasar las oportunidades en ese 3% crítico». ' +
  'El punto no es nunca optimizar: es <em>saber cuál es el 3%</em>, y eso solo se sabe midiendo.</p>', 'key')}

<h2>Lo que sí puedes hacer tú</h2>
<ol>
  <li><strong>Elegir el algoritmo y la estructura de datos.</strong> Es donde están los factores de 1000.</li>
  <li><strong>Mejorar la localidad de memoria:</strong> recorrer en el orden en que están los datos.</li>
  <li><strong>Evitar trabajo repetido:</strong> memoizar, cachear, no recalcular en cada vuelta.</li>
  <li><strong>Reducir la asignación de memoria</strong> en los puntos calientes.</li>
  <li><strong>Darle información al compilador:</strong> tipos concretos, constantes, funciones puras.</li>
  <li><strong>Medir con un perfilador</strong> en lugar de adivinar. La intuición sobre dónde está el tiempo acierta
  sorprendentemente poco.</li>
</ol>
      `,
      ejercicios: [
        { n: 1, titulo: 'Genera el código',
          enunciado: 'Genera el código de máquina de pila para: (a) <code>x = a + b * c</code>; (b) <code>Si a &gt; b Entonces m = a Sino m = b FinSi</code>.',
          pista: 'Postorden para las expresiones; etiquetas y saltos para el control.',
          solucion: `<p><b>(a)</b> El árbol es <code>x = (a + (b*c))</code>, y el recorrido postorden da:</p>
<pre>  LOAD  a
  LOAD  b
  LOAD  c
  MUL          ← b*c
  ADD          ← a + (b*c)
  STORE x</pre>
<p>Nota que <code>MUL</code> va antes que <code>ADD</code> sin que ninguna instrucción mencione la precedencia: el <b>orden de las instrucciones</b> la codifica, porque el árbol ya la había resuelto.</p>
<p><b>(b)</b></p>
<pre>       LOAD  a
       LOAD  b
       CMP_GT
       JUMP_IF_FALSE sino
       LOAD  a
       STORE m
       JUMP  fin
sino:  LOAD  b
       STORE m
fin:</pre>
<p><b>Dos observaciones:</b> el <code>JUMP fin</code> al terminar la rama verdadera es imprescindible; sin él, la ejecución caería en la rama <code>sino</code> y ejecutaría las dos. Y el <code>Sino</code> del código fuente se convierte en un <b>salto condicional invertido</b>: se salta cuando la condición es <i>falsa</i>. Es la traducción estándar y explica por qué los compiladores a veces invierten las condiciones en el código generado.</p>` },
        { n: 2, titulo: 'Aplica las optimizaciones',
          enunciado: 'Optimiza este código indicando qué técnica aplicas en cada paso:<br><pre>const SEGUNDOS_DIA = 24 * 60 * 60;\nfor (int i = 0; i &lt; n; i++) {\n    double factor = Math.PI * radio * radio;\n    total += datos[i] * factor * 2;\n}\nif (false) { limpiar(); }</pre>',
          pista: 'Hay al menos cuatro optimizaciones distintas aplicables.',
          solucion: `<p><b>Paso 1 — plegado de constantes:</b> <code>24 * 60 * 60</code> se calcula al compilar.</p>
<pre>const SEGUNDOS_DIA = 86400;</pre>
<p><b>Paso 2 — invariante fuera del bucle:</b> <code>factor</code> no depende de <code>i</code>, así que se calcula una sola vez en lugar de n veces. Con n = 1 000 000 son 999 999 multiplicaciones ahorradas.</p>
<pre>double factor = Math.PI * radio * radio;
for (int i = 0; i &lt; n; i++) {
    total += datos[i] * factor * 2;
}</pre>
<p><b>Paso 3 — plegado parcial:</b> <code>factor * 2</code> también es invariante, así que se precalcula.</p>
<pre>double factor2 = Math.PI * radio * radio * 2;
for (int i = 0; i &lt; n; i++) {
    total += datos[i] * factor2;
}</pre>
<p><b>Paso 4 — eliminación de código muerto:</b> <code>if (false)</code> nunca se ejecuta, así que desaparece junto con la llamada. (Y si <code>limpiar()</code> no se usa en ningún otro sitio, el enlazador puede eliminar también la función entera.)</p>
<p><b>Paso 5 (opcional) — reducción de fuerza:</b> si los tipos fueran enteros, <code>x * 2</code> se convertiría en <code>x &lt;&lt; 1</code>. Con reales no aplica.</p>
<p><b>La observación importante:</b> un compilador con <code>-O2</code> hace <b>todo esto automáticamente</b>. Escribir manualmente el paso 2 en el código fuente suele ser innecesario y empeora la legibilidad. Pero conviene saber dos cosas: que en lenguajes interpretados sin JIT estas optimizaciones <b>no</b> ocurren y sí vale la pena hacerlas a mano, y que el compilador solo puede sacar <code>factor</code> del bucle si está seguro de que <code>radio</code> no cambia dentro. Si <code>radio</code> fuera un campo de un objeto que una llamada podría modificar, el compilador tendría que recalcularlo. <b>Darle garantías al compilador —constantes, variables locales, funciones puras— es lo que le permite optimizar.</b></p>` },
        { n: 3, titulo: 'Qué no puede el compilador',
          enunciado: 'Para cada caso, di si el compilador puede optimizarlo y por qué: (a) cambiar un ordenamiento burbuja por quicksort; (b) sacar <code>strlen(s)</code> de la condición de un bucle; (c) eliminar una llamada a una función cuyo resultado no se usa; (d) reordenar dos bucles anidados para mejorar la caché.',
          pista: 'El compilador puede transformar el código, no reinventar la solución.',
          solucion: `<p><b>(a) No, nunca.</b> Un compilador hace transformaciones que preservan la semántica <b>instrucción a instrucción</b>; no entiende que tu código «es un ordenamiento» ni tiene una biblioteca de algoritmos equivalentes para sustituirlo. Esto es lo más importante del ejercicio: <b>la elección del algoritmo es tuya y es donde están los factores de 1000</b>. (Hay investigación sobre «síntesis de programas» y reconocimiento de idiomas, pero no está en ningún compilador de producción.)</p>
<p><b>(b) A veces, y es un caso famoso.</b> En <code>for (i = 0; i &lt; strlen(s); i++)</code>, <code>strlen</code> recorre toda la cadena en <b>cada vuelta</b>, convirtiendo un bucle O(n) en O(n²). GCC y Clang <b>sí</b> lo sacan del bucle cuando pueden demostrar que <code>s</code> no se modifica dentro y que <code>strlen</code> es pura (la reconocen como función conocida de la biblioteca). Pero si dentro del bucle hay una llamada a una función que el compilador no puede analizar, debe asumir que podría modificar la cadena y <b>recalcula</b>. Es el ejemplo perfecto de optimización que depende de lo que el compilador pueda <i>demostrar</i>.</p>
<p><b>(c) Solo si puede demostrar que la función no tiene efectos.</b> Si solo calcula a partir de sus parámetros (función pura), la llamada se elimina. Si escribe en un archivo, imprime, modifica una global o lanza una excepción, <b>no puede</b> eliminarla aunque el resultado se descarte. Por eso marcar funciones como puras (<code>__attribute__((pure))</code> en GCC, <code>const fn</code> en Rust) habilita optimizaciones que de otro modo serían ilegales.</p>
<p><b>(d) A veces.</b> El intercambio de bucles (<i>loop interchange</i>) existe y los compiladores lo aplican cuando pueden probar que no cambia el resultado, lo que exige analizar las dependencias entre iteraciones. Con índices complejos o punteros que podrían solaparse, el compilador se rinde y deja el orden original. <b>El patrón de acceso a memoria sigue siendo, en la práctica, responsabilidad tuya</b>, y es lo que explica las diferencias de 8× del módulo 1.</p>
<p><b>La conclusión:</b> el compilador optimiza <i>cómo</i> se ejecuta lo que escribiste. <b>Qué</b> escribiste —el algoritmo, la estructura de datos, el patrón de acceso— lo decides tú, y ahí están las mejoras de órdenes de magnitud.</p>` },
        { n: 4, titulo: 'Mide antes de optimizar',
          enunciado: 'Un programa tarda 10 segundos. Un perfilador muestra: función A 70%, función B 20%, función C 10%. (a) Si optimizas C para que sea infinitamente rápida, ¿cuánto mejora el total? (b) ¿Y si haces A dos veces más rápida? (c) ¿Qué dice la ley de Amdahl sobre el límite de cualquier optimización?',
          pista: 'Calcula los tiempos absolutos de cada parte.',
          solucion: `<p>Tiempos absolutos: A = 7 s, B = 2 s, C = 1 s.</p>
<p><b>(a) Optimizar C hasta hacerla instantánea:</b> el total pasa de 10 s a 9 s. <b>Mejora del 10%</b>, trabajando en la parte más fácil de mejorar y obteniendo lo mínimo. Esto es exactamente lo que hace quien optimiza sin medir: la intuición suele apuntar al código que parece feo, no al que consume tiempo.</p>
<p><b>(b) Hacer A dos veces más rápida:</b> A pasa de 7 s a 3,5 s y el total a 6,5 s. <b>Mejora del 35%</b>, con un esfuerzo de optimización mucho más modesto (2×) que el del caso (a) (infinito).</p>
<p><b>(c) La ley de Amdahl</b> formaliza esto: la aceleración máxima está limitada por la fracción que <b>no</b> optimizas.</p>
<p style="text-align:center;font-family:var(--f-mono)">aceleración = 1 / ((1 − p) + p/s)</p>
<p>donde <code>p</code> es la fracción optimizable y <code>s</code> cuánto la aceleras. Con A optimizada infinitamente (p = 0,7, s = ∞): la aceleración máxima es <code>1/0,3 = 3,33×</code>. Es decir, <b>aunque A desapareciera por completo, el programa nunca bajaría de 3 segundos</b>.</p>
<p><b>Las tres consecuencias prácticas:</b></p>
<ul>
<li><b>Optimiza siempre lo que más tiempo consume</b>, y vuelve a medir después: el reparto cambia, y lo que era el 20% puede pasar a ser el cuello de botella.</li>
<li><b>Hay un techo.</b> Si el 30% del tiempo es inevitable (entrada/salida, red), ninguna optimización de lo demás baja de ahí. Saberlo evita gastar semanas persiguiendo una mejora imposible.</li>
<li><b>La misma ley gobierna el paralelismo:</b> si el 10% de tu programa es inherentemente secuencial, con infinitos procesadores la aceleración máxima es 10×. Por eso añadir núcleos deja de ayudar, y por eso la pregunta «¿cuánto de esto se puede paralelizar?» es previa a «¿cuántos núcleos compro?».</li>
</ul>` },
        { n: 5, titulo: 'Optimiza de verdad',
          enunciado: 'Este código tarda demasiado. Identifica los problemas por orden de impacto y reescríbelo.<br><pre>resultado = []\nfor i in range(len(datos)):\n    if datos[i] not in resultado:\n        resultado.append(datos[i])\nresultado.sort()\ntexto = ""\nfor r in resultado:\n    texto = texto + str(r) + ","</pre>',
          pista: 'Hay un O(n²) escondido y una concatenación de cadenas en bucle.',
          solucion: `<p><b>Problema 1 (el grave) — <code>not in</code> sobre una lista es O(n):</b> se ejecuta n veces, así que eliminar duplicados cuesta <b>O(n²)</b>. Con 100 000 elementos son 5×10⁹ comparaciones: varios minutos.</p>
<p><b>Problema 2 — concatenar cadenas en un bucle:</b> en Python las cadenas son inmutables, así que cada <code>+</code> crea una cadena nueva copiando toda la anterior. También <b>O(n²)</b> (módulo 4).</p>
<p><b>Problema 3 (menor) — <code>range(len(datos))</code>:</b> no es un problema de rendimiento sino de estilo; recorrer los elementos directamente es más claro y menos propenso a errores.</p>
<p><b>Reescrito:</b></p>
${cod('python', `# O(n) para eliminar duplicados + O(n log n) para ordenar
resultado = sorted(set(datos))

# una sola construcción de cadena, O(n)
texto = ",".join(str(r) for r in resultado)`)}
<p><b>Dos líneas en lugar de ocho, y de O(n²) a O(n log n).</b> Con 100 000 elementos: de varios minutos a milisegundos.</p>
<p><b>El orden de las decisiones, que es la lección del ejercicio:</b></p>
<ol>
<li><b>Primero el algoritmo:</b> cambiar la búsqueda lineal por un conjunto (hash) es lo que convierte O(n²) en O(n). Es el cambio de <b>clase de complejidad</b>, y vale por sí solo más que todo lo demás.</li>
<li><b>Después la estructura de datos:</b> <code>set</code> elimina duplicados en O(n) y además expresa la intención («quiero los valores únicos»), que es más legible que el bucle con <code>not in</code>.</li>
<li><b>Después los detalles del lenguaje:</b> <code>join</code> en lugar de concatenar es una optimización de factor constante grande y específica de cómo funcionan las cadenas inmutables.</li>
<li><b>Y al final, si hiciera falta, micro-optimizaciones</b> que casi nunca merecen la pena.</li>
</ol>
<p><b>El detalle que hay que verificar:</b> <code>set</code> no conserva el orden de aparición. Aquí da igual porque después se ordena, pero si el requisito fuera «únicos en orden de aparición», habría que usar <code>list(dict.fromkeys(datos))</code>, que aprovecha que los diccionarios de Python 3.7+ conservan el orden de inserción y sigue siendo O(n). <b>Una optimización que cambia el comportamiento no es una optimización: es un bug.</b></p>` }
      ],
      quiz: [
        { p: 'Generar código desde un AST para una máquina de pila se hace con un recorrido…',
          ops: ['inorden', 'preorden', 'postorden: primero los operandos, luego el operador', 'por niveles'],
          ok: 2, exp: 'Postorden apila los operandos y luego emite la operación, que es exactamente el orden de la notación polaca inversa.' },
        { p: 'Un compilador con optimización activada <b>no</b> puede…',
          ops: ['eliminar código muerto', 'sacar invariantes de un bucle',
            'cambiar tu algoritmo O(n²) por uno O(n log n)', 'plegar constantes'],
          ok: 2, exp: 'Optimiza cómo se ejecuta lo que escribiste, ajustando factores constantes. La clase de complejidad la decides tú.' },
        { p: 'Según la ley de Amdahl, si el 70% del tiempo lo consume una función y la haces infinitamente rápida…',
          ops: ['el programa es instantáneo', 'la aceleración máxima es 3,33×, limitada por el 30% restante',
            'el programa mejora un 70%', 'no hay límite'],
          ok: 1, exp: '1/(1−0,7) = 3,33. La fracción que no optimizas pone un techo a cualquier mejora, y lo mismo vale para el paralelismo.' }
      ]
    },

    {
      id: 'm9-6',
      titulo: 'Construye tu propio intérprete',
      resumen: 'Cómo está hecho el laboratorio de este curso: lexer, parser, evaluador y generador de diagramas, pieza por pieza.',
      objetivos: [
        'Entender la arquitectura completa de un intérprete real y pequeño',
        'Relacionar cada fase teórica con su código',
        'Saber por dónde empezar para construir el tuyo'
      ],
      lectura: `
<p>Todo lo que has visto en este módulo está implementado en el <a href="#herramientas">laboratorio</a> de este curso.
El intérprete de pseudocódigo que ejecuta tus algoritmos y dibuja sus diagramas de flujo tiene unas 600 líneas y está
organizado exactamente como describe la teoría. Esta lección lo recorre.</p>

<h2>La arquitectura</h2>
${fig(`<svg viewBox="0 0 560 200" width="560" height="200" role="img" aria-label="Arquitectura del intérprete del laboratorio">
<g color="var(--fg-soft)">
<defs><marker id="m9c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
${[[18, 24, 'Tu pseudocódigo', 'var(--warm-soft)', 'var(--warm)'],
   [18, 84, 'lexer()', 'var(--accent-soft)', 'var(--accent)'],
   [18, 144, 'tokens', 'var(--surface-2)', 'var(--line)'],
   [210, 84, 'parse()', 'var(--accent-soft)', 'var(--accent)'],
   [210, 144, 'AST', 'var(--surface-2)', 'var(--line)'],
   [400, 44, 'ejecutar()', 'var(--accent-soft)', 'var(--accent)'],
   [400, 124, 'Flujo.dibujar()', 'var(--accent-soft)', 'var(--accent)']].map(function (b) {
  return '<rect x="' + b[0] + '" y="' + b[1] + '" width="140" height="40" rx="6" fill="' + b[3] +
    '" stroke="' + b[4] + '" stroke-width="1.6"/>' +
    '<text x="' + (b[0] + 70) + '" y="' + (b[1] + 25) + '" text-anchor="middle" font-size="12" fill="var(--fg)">' + b[2] + '</text>';
}).join('')}
<g stroke="currentColor" stroke-width="1.4" fill="none">
<path d="M88 64 V80" marker-end="url(#m9c)"/>
<path d="M88 124 V140" marker-end="url(#m9c)"/>
<path d="M160 160 H206" marker-end="url(#m9c)"/>
<path d="M280 124 V104" marker-end="url(#m9c)"/>
<path d="M352 100 L396 70" marker-end="url(#m9c)"/>
<path d="M352 150 L396 142" marker-end="url(#m9c)"/>
</g>
<text x="470" y="92" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">salida del programa</text>
<text x="470" y="178" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">SVG del diagrama</text>
<text x="280" y="192" text-anchor="middle" font-size="11" fill="var(--fg)">Un mismo AST alimenta dos consumidores distintos.</text>
</g></svg>`, 'El AST en el centro: ejecutarlo y dibujarlo son dos recorridos del mismo árbol.')}

<p>Ese es el punto arquitectónico más importante: <strong>el AST es la representación central</strong>, y tanto el
evaluador como el generador de diagramas son recorridos independientes del mismo árbol. Añadir un tercer consumidor —un
formateador de código, un traductor a Python, un contador de complejidad— sería escribir otro recorrido sin tocar nada
de lo existente.</p>

<h2>1. El lexer</h2>
<p>Un bucle sobre los caracteres que produce tokens con tipo, valor y línea. Lo interesante son las decisiones de
diseño que ya conoces:</p>

${cod('js', `// operadores de dos caracteres ANTES que los de uno (token más largo)
var dos = s.substr(i, 2);
if (dos === '<-' || dos === '<=' || dos === '>=' || dos === '<>' || ...) {
  push('op', normalizar(dos));
  i += 2;
  continue;
}

// palabras: ¿reservada o identificador?
var w = s.slice(i, j), lw = w.toLowerCase();
if (PALABRAS.indexOf(lw) >= 0) push('kw', lw); else push('id', w);`)}

<p>El <code>toLowerCase()</code> hace que las palabras reservadas no distingan mayúsculas (<code>Mientras</code>,
<code>MIENTRAS</code> y <code>mientras</code> son lo mismo) mientras que los identificadores sí conservan su escritura
original. Es una decisión deliberada: tolerante con quien escribe, fiel con los nombres del usuario.</p>

<h2>2. El parser</h2>
<p>Descendente recursivo, con una función por nivel de precedencia, exactamente como la gramática del tema 3:</p>

${cod('js', `function nivelO()   { var e = nivelY();   while (esLog('o')) { ... } return e; }
function nivelY()   { var e = nivelNo();  while (esLog('y')) { ... } return e; }
function nivelNo()  { if (esLog('no')) return { k:'un', op:'no', a: nivelNo() }; return nivelRel(); }
function nivelRel() { var e = nivelSuma(); while (esRelacional()) { ... } return e; }
function nivelSuma(){ var e = nivelMul();  while (esOp('+') || esOp('-')) { ... } return e; }
function nivelMul() { var e = nivelPot();  while (esOp('*') || ...) { ... } return e; }
function nivelPot() { var e = unario(); if (esOp('^')) return { ..., b: nivelPot() }; return e; }`)}

<p>Cada nivel llama al siguiente y envuelve el resultado en un nodo binario. La única diferencia de
<code>nivelPot</code> es que llama a <strong>sí mismo</strong> en el lado derecho, y eso basta para que la potencia
asocie a la derecha y <code>2^3^2</code> dé 512.</p>

<p>Las instrucciones siguen el mismo patrón: una rama por palabra reservada, construyendo el nodo correspondiente.</p>

<h3>Una decisión interesante: las palabras contextuales</h3>
<p>Un problema real que apareció al construirlo: si <code>y</code> y <code>o</code> son palabras reservadas, nadie puede
llamar <code>y</code> a una variable, lo que es inaceptable en un lenguaje para enseñar matemáticas. La solución fue
hacerlas <strong>contextuales</strong>: el lexer las emite como identificadores, y el parser las reconoce como
operadores <em>solo en posición de operador</em>. Lo mismo con <code>valor</code>, <code>paso</code>,
<code>texto</code> y los nombres de tipo.</p>

<p>Es exactamente lo que hacen los lenguajes reales con sus palabras clave contextuales (<code>async</code> y
<code>await</code> en JavaScript, <code>yield</code> en C#): mantener la compatibilidad con código que ya usaba esos
nombres como identificadores.</p>

<h2>3. El evaluador</h2>
<p>Un intérprete de árbol: una función <code>paso(nodo)</code> que ejecuta una instrucción y una función
<code>ev(nodo)</code> que evalúa una expresión, ambas recursivas.</p>

${cod('js', `function paso(st, amb) {
  if (++pasos > MAX_PASOS) throw err(st.l, 'demasiadas operaciones...');
  switch (st.k) {
    case 'escribir': out(st.xs.map(x => fmt(ev(x, amb))).join('')); return;
    case 'asignar':  escribirRef(st.dest, ev(st.e, amb), amb); return;
    case 'si':       return correr(verdad(ev(st.cond, amb)) ? st.luego : st.sino, amb);
    case 'mientras':
      while (verdad(ev(st.cond, amb))) {
        if (correr(st.cuerpo, amb) === SALIR) return SALIR;
      }
      return;
    ...
  }
}`)}

<p>Fíjate en que <code>Mientras</code> se implementa con un <code>while</code> de JavaScript y <code>Si</code> con un
<code>if</code>. Eso es lo característico de un intérprete de árbol: <strong>las estructuras del lenguaje interpretado
se apoyan en las del lenguaje anfitrión</strong>. Un compilador, en cambio, tendría que generar etiquetas y saltos.</p>

<h3>Los ámbitos</h3>
<p>Cada llamada a función crea un <code>Ambito</code> nuevo. Buscar una variable mira primero el ámbito local y luego el
global: es la pila de tablas de símbolos del tema 4, en su versión más simple.</p>

<h3>Los límites de seguridad</h3>
<p>Un detalle que no está en los libros de compiladores y es imprescindible en un intérprete que corre en el navegador
de otra persona: <strong>límites</strong>. Un contador de operaciones (4 millones), un máximo de líneas de salida y un
tope al tamaño de los arreglos. Sin ellos, un bucle infinito congelaría la pestaña del navegador en lugar de dar un
mensaje de error. Es la diferencia entre un juguete y una herramienta que se puede publicar.</p>

<h2>4. El generador de diagramas</h2>
<p>Recorre el mismo AST produciendo SVG. La idea de diseño es componer <strong>bloques</strong> que saben su tamaño y
dónde están sus puntos de entrada y salida:</p>

${cod('js', `// Cada bloque: { w, h, cx, draw(x, y) }
// entrada en (x + cx, y), salida en (x + cx, y + h)

function secuencia(nodos) {    // apila bloques y los une con flechas
  ...
}
function decision(cond, ramaSi, ramaNo) {   // rombo + dos ramas que confluyen
  ...
}
function bucleInicio(cond, cuerpo) {        // rombo + cuerpo + flecha de retorno
  ...
}`)}

<p>La composición es recursiva igual que el AST: un <code>Si</code> dentro de un <code>Mientras</code> produce un
bloque de decisión dentro de un bloque de bucle, y los tamaños se propagan hacia arriba. Es el patrón
<strong>compuesto</strong> del módulo 8, aplicado al dibujo.</p>

<h2>Por dónde empezar el tuyo</h2>
<ol>
  <li><strong>Define la gramática primero</strong>, en papel. Es media hora que ahorra días.</li>
  <li><strong>Empieza por expresiones aritméticas.</strong> Lexer + parser + evaluador de <code>2 + 3 * 4</code>. Cuando
  eso funcione, tienes el esqueleto entero.</li>
  <li><strong>Añade variables</strong> (un diccionario de nombre a valor) y la asignación.</li>
  <li><strong>Añade el <code>Si</code> y el <code>Mientras</code></strong>: ahí el lenguaje se vuelve Turing-completo.</li>
  <li><strong>Añade funciones</strong>, que es el paso que obliga a manejar ámbitos y la pila de llamadas.</li>
  <li><strong>Cuida los errores desde el principio:</strong> guarda la línea en cada token y en cada nodo.</li>
  <li><strong>Escribe pruebas desde el primer día.</strong> Un intérprete es un programa con infinitas entradas
  posibles; sin una batería de casos, cada cambio rompe algo silenciosamente.</li>
</ol>

${nota('Por qué merece la pena construir uno',
  '<p>Escribir un intérprete, por pequeño que sea, cambia la forma de ver los lenguajes: dejan de ser magia y pasan a ' +
  'ser programas con decisiones de diseño que puedes juzgar. Además, la cantidad de problemas reales que son ' +
  '«escribir un intérprete pequeño» es enorme: lenguajes de consulta, reglas de negocio configurables, plantillas, ' +
  'fórmulas de hoja de cálculo, filtros de búsqueda.</p>' +
  '<p>Y si te engancha: <em>Crafting Interpreters</em> de Robert Nystrom es gratuito en la web y te lleva de la mano ' +
  'por dos implementaciones completas.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Rastrea el camino completo',
          enunciado: 'Para el código <code>x &lt;- 2 + 3 * 4</code>, describe qué produce cada fase del intérprete del laboratorio: tokens, AST y qué hace el evaluador.',
          pista: 'Lexer, parser con sus niveles de precedencia, y evaluación recursiva.',
          solucion: `<p><b>1. Tokens:</b></p>
<pre>id("x")  op("&lt;-")  num(2)  op("+")  num(3)  op("*")  num(4)  nl  eof</pre>
<p><b>2. AST</b> (el parser ve un <code>id</code> seguido de <code>&lt;-</code> y construye una asignación; la expresión la arma con los niveles de precedencia):</p>
<pre>{ k: "asignar",
  dest: { k: "ref", n: "x" },
  e: { k: "bin", op: "+",
       a: { k: "num", v: 2 },
       b: { k: "bin", op: "*",
            a: { k: "num", v: 3 },
            b: { k: "num", v: 4 } } } }</pre>
<p>La multiplicación quedó <b>más abajo</b> porque <code>nivelSuma</code> llama a <code>nivelMul</code>, que consume el <code>3 * 4</code> antes de devolver.</p>
<p><b>3. Evaluación:</b> <code>paso()</code> reconoce <code>asignar</code>, llama a <code>ev()</code> sobre la expresión; <code>ev()</code> ve un nodo binario <code>+</code>, evalúa recursivamente su lado izquierdo (2) y su lado derecho, que es otro nodo binario <code>*</code> que evalúa a 12; suma y obtiene 14; finalmente <code>escribirRef</code> guarda 14 en la casilla <code>x</code> del ámbito actual.</p>
<p><b>Compruébalo:</b> escribe ese código en el laboratorio, ejecútalo y mira la tabla de «Estado final de las variables».</p>` },
        { n: 2, titulo: 'Añade una característica',
          enunciado: 'Quieres añadir al pseudocódigo una instrucción <code>Incrementar x En 5</code> equivalente a <code>x ← x + 5</code>. Describe exactamente qué habría que tocar en cada fase y por qué el diseño en fases hace que sea fácil.',
          pista: 'Palabra reservada, regla gramatical, nodo del AST, evaluación y dibujo.',
          solucion: `<p><b>1. Lexer:</b> añadir <code>'incrementar'</code> y <code>'en'</code> a la lista de palabras reservadas. (O mejor: reconocerlas <b>contextualmente</b>, para que nadie pierda la posibilidad de llamar <code>en</code> a una variable.)</p>
<p><b>2. Gramática:</b> una regla nueva.</p>
<pre>incremento ::= "Incrementar" referencia ( "En" expresion )?</pre>
<p>El <code>?</code> permite <code>Incrementar x</code> con incremento implícito de 1.</p>
<p><b>3. Parser:</b> una rama más en <code>instruccion()</code>:</p>
${cod('js', `if (esKw('incrementar')) {
  avanzar();
  var destino = refDestino();
  var cantidad = { k: 'num', v: 1 };
  if (esTxt('en')) { avanzar(); cantidad = expr(); }
  return { k: 'incrementar', dest: destino, e: cantidad, l: l };
}`)}
<p><b>4. Evaluador:</b> un caso más en <code>paso()</code>:</p>
${cod('js', `case 'incrementar': {
  var actual = leerRef(st.dest, amb);
  escribirRef(st.dest, numerico(actual) + numerico(ev(st.e, amb)), amb);
  return null;
}`)}
<p><b>5. Generador de diagramas:</b> un caso más en <code>bloqueDe()</code>:</p>
${cod('js', `case 'incrementar':
  return caja('proc', txt(st.dest) + ' ← ' + txt(st.dest) + ' + ' + txt(st.e));`)}
<p><b>6. Resaltador de sintaxis y pruebas:</b> añadir las palabras a la lista del resaltador y un caso a la batería de pruebas.</p>
<p><b>Por qué el diseño en fases lo hace fácil:</b> cada fase se modifica <b>independientemente</b> y el cambio es local y evidente. No hay que entender el evaluador para tocar el parser, ni al revés, porque se comunican por una estructura de datos bien definida (el AST). Si todo estuviera mezclado —parsear y ejecutar a la vez, que es lo que hace un principiante— añadir una instrucción exigiría entender el sistema entero.</p>
<p><b>Y una decisión de diseño que conviene cuestionar:</b> ¿merece la pena esta instrucción? Añade superficie al lenguaje (más que aprender, más que documentar, más que mantener) para ahorrar unos caracteres. La mayoría de los lenguajes prefieren un operador compuesto (<code>x += 5</code>) que es más corto y general. <b>«Se puede añadir» no es razón suficiente para añadir</b>: cada característica de un lenguaje tiene un costo permanente.</p>` },
        { n: 3, titulo: 'Mejora los errores',
          enunciado: 'Un usuario escribe <code>Si x > 0 Entonces Escribir "hola"</code> sin el <code>FinSi</code>. (a) ¿Qué error da el intérprete actual? (b) ¿Qué información tiene disponible para dar uno mejor? (c) Escribe el mensaje ideal.',
          pista: 'El parser sabe en qué línea empezó cada bloque abierto.',
          solucion: `<p><b>(a) El error actual</b> es algo como «Falta FinAlgoritmo» o «Esperaba "finsi" y encontré "fin del código"», señalando la <b>última</b> línea del programa. Es técnicamente correcto y poco útil: el usuario mira el final del archivo, donde todo parece bien.</p>
<p><b>(b) Información disponible:</b> cuando el parser entra a analizar un <code>Si</code>, <b>conoce la línea de esa palabra</b> (está en el token). Basta con llevar una <b>pila de bloques abiertos</b> con su tipo y su línea, exactamente como la pila de paréntesis del módulo 6.</p>
<p><b>(c) El mensaje ideal:</b></p>
<pre>Error: falta "FinSi"
  El bloque Si que empieza en la línea 4 nunca se cierra.

  4 │ Si x > 0 Entonces
    │ ^^ este bloque quedó abierto
  5 │     Escribir "hola"
  6 │ FinAlgoritmo
    │ ^^^^^^^^^^^^ se esperaba "FinSi" antes de aquí

  Sugerencia: agrega FinSi al final de la línea 5.</pre>
<p><b>Los cuatro ingredientes de un buen mensaje de error,</b> que son los mismos en cualquier compilador moderno:</p>
<ol>
<li><b>Qué falta</b>, en los términos del usuario.</li>
<li><b>Dónde empezó el problema</b> (la línea 4), no solo dónde se detectó (la 6). Esto es lo que más ayuda.</li>
<li><b>El fragmento de código señalado</b> con marcas visuales.</li>
<li><b>Una sugerencia concreta</b> de cómo arreglarlo.</li>
</ol>
<p>Rust fue el lenguaje que popularizó este estilo de mensajes y provocó que Clang, TypeScript, Elm y muchos otros lo adoptaran. <b>La calidad de los mensajes de error es una característica del producto</b>, no un detalle: determina cuánto tarda alguien en aprender el lenguaje y cuánta frustración acumula. Es, además, la razón principal por la que los compiladores industriales usan parsers escritos a mano en lugar de generados.</p>` },
        { n: 4, titulo: 'Diseña un lenguaje mínimo',
          enunciado: 'Diseña un lenguaje de fórmulas para una hoja de cálculo: debe soportar números, referencias a celdas (A1, B7), operaciones aritméticas, paréntesis y funciones como SUMA(A1:A10). (a) Escribe la gramática. (b) ¿Qué problema especial tiene este caso y cómo lo resolverías?',
          pista: 'El problema especial tiene que ver con que las celdas se refieren a otras celdas.',
          solucion: `<p><b>(a) Gramática:</b></p>
${cod('txt', `formula    ::= "=" expresion
expresion  ::= termino ( ( "+" | "-" ) termino )*
termino    ::= factor ( ( "*" | "/" ) factor )*
factor     ::= NUMERO
             | referencia
             | funcion
             | "(" expresion ")"
             | "-" factor
referencia ::= CELDA ( ":" CELDA )?          ← A1 o un rango A1:B10
funcion    ::= NOMBRE "(" ( argumento ( ";" argumento )* )? ")"
argumento  ::= expresion | referencia
CELDA      ::= [A-Z]+ [0-9]+`)}
<p><b>(b) El problema especial: las dependencias entre celdas.</b> Si A1 contiene <code>=B1+1</code> y B1 contiene <code>=C1*2</code>, al cambiar C1 hay que recalcular B1 <b>y después</b> A1, en ese orden. Y si alguien escribe A1 = <code>=B1</code> y B1 = <code>=A1</code>, hay una <b>referencia circular</b> y el recálculo no terminaría nunca.</p>
<p><b>La solución es un grafo</b> (módulo 6):</p>
<ol>
<li><b>Construir el grafo de dependencias:</b> cada celda es un nodo, y hay una arista de B1 a A1 si A1 usa B1. Al analizar cada fórmula, las referencias que encuentra el parser son exactamente sus dependencias: <b>el AST te las da gratis</b>.</li>
<li><b>Detectar ciclos con DFS</b> y los tres estados (blanco/gris/negro). Un ciclo es una referencia circular, y hay que rechazarla con un mensaje claro en lugar de colgarse. <b>Este es literalmente el origen del mensaje «referencia circular» de Excel.</b></li>
<li><b>Ordenar topológicamente</b> para saber en qué orden recalcular.</li>
<li><b>Recálculo incremental:</b> al cambiar una celda, recalcular solo sus dependientes transitivos, no toda la hoja. Con 100 000 celdas, la diferencia es entre instantáneo e inusable.</li>
</ol>
<p><b>Y tres detalles prácticos</b> que distinguen un prototipo de algo utilizable:</p>
<ul>
<li><b>Los rangos</b> (<code>A1:A10</code>) hay que expandirlos a la lista de celdas, y eso también genera dependencias: la fórmula depende de las diez.</li>
<li><b>Las referencias relativas y absolutas</b> (<code>A1</code> frente a <code>$A$1</code>) cambian al copiar la fórmula a otra celda. Esa transformación opera sobre el AST, no sobre el texto.</li>
<li><b>La propagación de errores:</b> si B1 da error de división entre cero, A1 = <code>=B1+1</code> debe mostrar el error, no un número. Esto se parece al contagio de <code>NaN</code> del módulo 1 y hay que diseñarlo explícitamente.</li>
</ul>
<p>Una hoja de cálculo es, en el fondo, <b>un lenguaje funcional con un grafo de dependencias y recálculo incremental</b>, y es probablemente el entorno de programación más usado del mundo.</p>` },
        { n: 5, titulo: 'Construye el tuyo',
          enunciado: 'Escribe en la consola JavaScript del laboratorio una calculadora completa: lexer, parser y evaluador para expresiones con <code>+ − * /</code>, paréntesis, variables y una función <code>raiz()</code>. Debe permitir asignar variables y usarlas después, y dar errores con posición.',
          pista: 'Junta el lexer del tema 2 y el parser del tema 3, y añade asignación y llamadas.',
          solucion: `${cod('js', `function Calculadora() {
  const vars = { pi: Math.PI, e: Math.E };
  const funcs = { raiz: Math.sqrt, abs: Math.abs, redondear: Math.round };

  function lexer(s) {
    const t = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === " ") { i++; continue; }
      if (/[0-9]/.test(c)) {
        let j = i;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        t.push({ t: "num", v: parseFloat(s.slice(i, j)), p: i }); i = j; continue;
      }
      if (/[a-zA-Z_]/.test(c)) {
        let j = i;
        while (j < s.length && /[a-zA-Z0-9_]/.test(s[j])) j++;
        t.push({ t: "id", v: s.slice(i, j), p: i }); i = j; continue;
      }
      if ("+-*/()=,".includes(c)) { t.push({ t: "op", v: c, p: i }); i++; continue; }
      throw new Error(\`Carácter inválido '\${c}' en la posición \${i}\`);
    }
    t.push({ t: "eof", p: s.length });
    return t;
  }

  function parsear(toks) {
    let p = 0;
    const act = () => toks[p];
    const op = v => act().t === "op" && act().v === v;

    function expr() {
      // asignación: id = expresión
      if (act().t === "id" && toks[p + 1] && toks[p + 1].t === "op" && toks[p + 1].v === "=") {
        const nombre = toks[p].v; p += 2;
        return { k: "asig", nombre, e: expr() };
      }
      let n = term();
      while (op("+") || op("-")) { const o = toks[p++].v; n = { k: "bin", o, a: n, b: term() }; }
      return n;
    }
    function term() {
      let n = factor();
      while (op("*") || op("/")) { const o = toks[p++].v; n = { k: "bin", o, a: n, b: factor() }; }
      return n;
    }
    function factor() {
      const t = act();
      if (t.t === "num") { p++; return { k: "num", v: t.v }; }
      if (op("-")) { p++; return { k: "neg", e: factor() }; }
      if (t.t === "id") {
        p++;
        if (op("(")) {                       // llamada a función
          p++;
          const args = [expr()];
          while (op(",")) { p++; args.push(expr()); }
          if (!op(")")) throw new Error(\`Falta ')' en la posición \${act().p}\`);
          p++;
          return { k: "call", n: t.v, args };
        }
        return { k: "var", n: t.v };
      }
      if (op("(")) {
        p++; const e = expr();
        if (!op(")")) throw new Error(\`Falta ')' en la posición \${act().p}\`);
        p++; return e;
      }
      throw new Error(\`Se esperaba un número o '(' en la posición \${t.p}\`);
    }
    const a = expr();
    if (act().t !== "eof") throw new Error(\`Texto sobrante en la posición \${act().p}\`);
    return a;
  }

  function ev(n) {
    switch (n.k) {
      case "num": return n.v;
      case "neg": return -ev(n.e);
      case "var":
        if (!(n.n in vars)) throw new Error(\`Variable no definida: '\${n.n}'\`);
        return vars[n.n];
      case "asig": return (vars[n.nombre] = ev(n.e));
      case "call":
        if (!(n.n in funcs)) throw new Error(\`Función desconocida: '\${n.n}'\`);
        return funcs[n.n](...n.args.map(ev));
      case "bin": {
        const a = ev(n.a), b = ev(n.b);
        if (n.o === "/" && b === 0) throw new Error("División entre cero");
        return { "+": a + b, "-": a - b, "*": a * b, "/": a / b }[n.o];
      }
    }
  }

  this.calcular = s => ev(parsear(lexer(s)));
  this.variables = () => ({ ...vars });
}

const calc = new Calculadora();
for (const linea of ["x = 10", "y = x * 2 + 5", "raiz(y + 1)", "pi * 2", "z + 1"]) {
  try { console.log(linea.padEnd(18), "=", calc.calcular(linea)); }
  catch (e) { console.log(linea.padEnd(18), "✖", e.message); }
}
console.log("variables:", calc.variables());`)}
<p><b>Lo que tienes al terminar:</b> un lenguaje pequeño pero <b>completo</b>, con las tres fases claramente separadas, estado persistente entre expresiones, funciones y errores con posición. Son unas 80 líneas.</p>
<p><b>Los siguientes pasos naturales,</b> en orden de dificultad creciente:</p>
<ol>
<li>Comparaciones y un operador condicional (<code>si(cond, a, b)</code>).</li>
<li>Cadenas de texto y concatenación.</li>
<li>Instrucciones y bloques: ahí dejas de tener una calculadora y empiezas a tener un lenguaje.</li>
<li><code>Mientras</code>: con eso el lenguaje se vuelve <b>Turing-completo</b> y puede calcular cualquier cosa computable.</li>
<li>Funciones definidas por el usuario, que obligan a implementar ámbitos y la pila de llamadas.</li>
</ol>
<p>Cuando llegues al paso 4 habrás construido, con tus manos, algo equivalente en potencia a cualquier lenguaje de programación que exista. <b>Eso es lo que hace tan valioso este ejercicio</b>: la distancia entre una calculadora y un lenguaje es mucho menor de lo que parece desde fuera.</p>` }
      ],
      quiz: [
        { p: 'En el intérprete del laboratorio, el AST alimenta a…',
          ops: ['solo al evaluador', 'al evaluador y al generador de diagramas, que son recorridos independientes',
            'solo al generador de diagramas', 'al lexer'],
          ok: 1, exp: 'Esa es la ventaja de tener una representación central: añadir un consumidor nuevo no toca las fases anteriores.' },
        { p: 'En un intérprete de árbol, el <code>Mientras</code> del lenguaje interpretado se implementa…',
          ops: ['generando etiquetas y saltos', 'con un bucle del lenguaje anfitrión',
            'con recursión obligatoriamente', 'con una tabla de saltos'],
          ok: 1, exp: 'Las estructuras del lenguaje interpretado se apoyan en las del anfitrión. Un compilador, en cambio, debe generar saltos explícitos.' },
        { p: 'Un intérprete que corre en el navegador de otra persona necesita, además de las fases clásicas…',
          ops: ['más optimizaciones', 'límites de operaciones y de salida, para que un bucle infinito dé un error en lugar de congelar la página',
            'una base de datos', 'compilación JIT'],
          ok: 1, exp: 'Sin esos límites, un programa con un bucle sin fin bloquearía la pestaña. Es la diferencia entre un prototipo y algo publicable.' }
      ]
    }
  ]
});
