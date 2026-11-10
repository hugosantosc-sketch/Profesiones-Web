/* ===== MÓDULO 3 — Pseudocódigo ===== */
CDC.registrar({
  id: 'm3',
  nivel: 'Básico',
  titulo: 'Pseudocódigo',
  resumen: 'El lenguaje intermedio entre tu cabeza y el código: variables, tipos, operadores, estructuras, arreglos y subprogramas.',
  intro: '<p>El pseudocódigo es código que no se compila pero que sí se razona. Tiene la precisión de un lenguaje de ' +
    'programación y la libertad del lenguaje natural, y por eso es lo que usan los libros de algoritmos, los artículos ' +
    'científicos y las pizarras de las entrevistas técnicas.</p><p>En este módulo usamos una notación compatible con ' +
    '<strong>PSeInt</strong>, el intérprete que se usa en casi toda Latinoamérica para enseñar. Todo lo que escribas aquí ' +
    'se ejecuta en el <a href="#herramientas">laboratorio</a> y genera su diagrama de flujo.</p>',
  temas: [

    {
      id: 'm3-1',
      titulo: 'Estructura de un algoritmo y variables',
      resumen: 'La sintaxis base, qué es una variable, cómo nombrarla y el papel de la declaración.',
      objetivos: [
        'Escribir la estructura completa de un algoritmo en pseudocódigo',
        'Declarar variables con el tipo adecuado',
        'Nombrar variables de forma que el código se explique solo'
      ],
      lectura: `
<p>Todo algoritmo en esta notación tiene la misma forma:</p>

${cod('pseudo', `Algoritmo NombreDelAlgoritmo
	// 1. declaración de variables
	Definir nombre Como Cadena
	Definir edad Como Entero
	Definir sueldo Como Real

	// 2. entrada de datos
	Escribir "¿Cómo te llamas?"
	Leer nombre

	// 3. proceso
	// (cálculos y decisiones)

	// 4. salida de resultados
	Escribir "Hola, ", nombre
FinAlgoritmo`)}

<p>Las cuatro secciones no son obligatorias por sintaxis, pero respetarlas convierte un algoritmo en algo legible.
Un programa con las declaraciones dispersas y los <code>Leer</code> mezclados con los cálculos se entiende mucho peor,
aunque funcione igual.</p>

<h2>Qué es realmente una variable</h2>
<p>Una variable es un <strong>nombre para una casilla de memoria</strong>. Tiene cuatro atributos:</p>

${tabla(['Atributo', 'Qué es', 'Ejemplo'], [
  ['<b>Nombre</b>', 'La etiqueta con la que te refieres a ella', '<code>edad</code>'],
  ['<b>Tipo</b>', 'Qué clase de valores puede contener y cómo se interpretan sus bits', '<code>Entero</code>'],
  ['<b>Valor</b>', 'El contenido actual de la casilla', '<code>25</code>'],
  ['<b>Dirección</b>', 'Dónde está la casilla en memoria (normalmente invisible)', '<code>0x7FFE3A20</code>']
], 'El nombre y el tipo los pones tú; el valor cambia durante la ejecución; la dirección la administra el sistema.')}

<p>La palabra «variable» es literal: su valor <em>varía</em>. Y como viste en el módulo 0, la asignación es una orden
que se lee de derecha a izquierda y destruye el valor anterior.</p>

<h2>Declarar: para qué sirve</h2>
<p><code>Definir edad Como Entero</code> hace tres cosas:</p>
<ol>
  <li><strong>Reserva</strong> espacio en memoria del tamaño adecuado.</li>
  <li><strong>Fija el tipo</strong>, lo que permite detectar errores antes de ejecutar: si intentas guardar
  <code>"hola"</code> en un <code>Entero</code>, hay un error de tipo.</li>
  <li><strong>Documenta tu intención</strong> para quien lea el código, incluido tu yo de la semana que viene.</li>
</ol>

<p>Algunos lenguajes (Python, JavaScript) no exigen declarar: la variable nace al asignarle algo. Se gana brevedad y se
pierde la detección temprana de errores; un nombre mal escrito crea una variable nueva en silencio en lugar de dar un
error. Los lenguajes modernos intentan tener lo mejor de ambos mundos con la <strong>inferencia de tipos</strong>
(<code>let x = 5</code> en Rust o <code>var x = 5</code> en C#: el tipo existe y es fijo, pero el compilador lo deduce).</p>

<h2>Cómo nombrar variables</h2>
<p>El nombre es la documentación más leída de tu programa. Reglas que valen en cualquier lenguaje:</p>

${tabla(['Regla', 'Mal', 'Bien'], [
  ['Describe el contenido, no el tipo', '<code>numero1</code>, <code>cad</code>', '<code>edadCliente</code>, <code>nombreCompleto</code>'],
  ['Evita abreviaturas que solo entiendes hoy', '<code>ttl</code>, <code>pnd</code>', '<code>total</code>, <code>pendiente</code>'],
  ['Incluye la unidad si hay ambigüedad', '<code>tiempo</code>, <code>peso</code>', '<code>tiempoSegundos</code>, <code>pesoKg</code>'],
  ['Booleanos como preguntas', '<code>flag</code>, <code>estado</code>', '<code>esValido</code>, <code>tienePermiso</code>'],
  ['Longitud proporcional al alcance', '<code>contadorDeIteracionDelBucle</code>', '<code>i</code> para un índice de 3 líneas'],
  ['Sin acentos ni ñ en el identificador', '<code>añoNacimiento</code>', '<code>anioNacimiento</code>'],
  ['Coherencia en todo el programa', '<code>precioUnit</code>, <code>precio_total</code>, <code>PrecioFinal</code>', '<code>precioUnitario</code>, <code>precioTotal</code>']
], 'La última fila es la más importante: un programa con tres convenciones distintas cansa más que uno con nombres mediocres pero consistentes.')}

<p>Sobre el estilo: <code>camelCase</code> (<code>precioTotal</code>) es la convención en Java, JavaScript y C#;
<code>snake_case</code> (<code>precio_total</code>) en Python, Ruby y C. Elige una según el lenguaje de destino y
mantenla. Las constantes van en <code>MAYUSCULAS_CON_GUIONES</code> en casi todos.</p>

${nota('La prueba del nombre',
  '<p>Si para entender qué contiene una variable tienes que leer el código que la rellena, el nombre está mal. ' +
  'Un buen nombre hace innecesario el comentario que lo explica.</p>', 'key')}

<h2>Constantes</h2>
<p>Un valor que no debe cambiar merece un nombre igual. Comparar estas dos versiones explica por qué:</p>

${cod('pseudo', `// MAL: ¿qué es 0.18? ¿Y si cambia el impuesto?
total <- subtotal + subtotal * 0.18
neto <- sueldo - sueldo * 0.18     // ¡este 0.18 es otra cosa!

// BIEN
TASA_IGV <- 0.18
TASA_AFP <- 0.10
total <- subtotal + subtotal * TASA_IGV
neto <- sueldo - sueldo * TASA_AFP`)}

<p>Los valores literales sueltos en el código se llaman <strong>números mágicos</strong> y son una de las fuentes más
confiables de errores: cuando el IGV cambie, vas a tener que buscar todos los <code>0.18</code> del proyecto y decidir
uno por uno si ese 0.18 era el IGV o una coincidencia. Con una constante, se cambia en un solo lugar.</p>

<h2>Ámbito: dónde existe una variable</h2>
<p>Una variable declarada dentro de un subproceso existe solo ahí: nace al entrar y muere al salir. Son variables
<strong>locales</strong>. Una declarada en el programa principal y visible desde todas partes es <strong>global</strong>.</p>

<p>La regla profesional es contundente: <strong>usa variables locales siempre que puedas</strong>. Una variable global
puede ser modificada desde cualquier línea del programa, así que cuando contiene un valor equivocado hay que revisar
<em>todo</em> para encontrar al culpable. Con una local, el sospechoso está en veinte líneas. Lo verás en detalle en
el tema de subprogramas.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Elige el tipo',
          enunciado: 'Indica el tipo adecuado para cada dato: (a) la edad de una persona; (b) el precio de un producto; (c) si el cliente es socio; (d) el DNI peruano; (e) la inicial del segundo nombre; (f) el nombre completo; (g) la cantidad de habitantes de un país.',
          pista: 'Pregúntate si el dato se usa para calcular, y si admite decimales.',
          solucion: `<p><b>(a)</b> <code>Entero</code>. <b>(b)</b> <code>Real</code> (o mejor, un entero en céntimos, como vimos en el módulo 1). <b>(c)</b> <code>Logico</code>. <b>(d)</b> <code>Cadena</code>, no <code>Entero</code>: aunque sean dígitos, nunca se calcula con él, puede empezar por 0 y tiene longitud fija. <b>(e)</b> <code>Caracter</code>. <b>(f)</b> <code>Cadena</code>. <b>(g)</b> <code>Entero</code>, pero cuidado: la población mundial (8 × 10⁹) no cabe en un entero de 32 bits, hace falta uno de 64.</p>
<p><b>La regla del DNI es importante y se equivoca mucho:</b> si un dato numérico no se suma, no se resta y no se promedia, es texto. Lo mismo vale para códigos postales, números de teléfono y códigos de producto.</p>` },
        { n: 2, titulo: 'Mejora los nombres',
          enunciado: 'Reescribe este fragmento con nombres y constantes decentes, y explica cada cambio.<br><code>Definir a, b, c, d Como Real</code><br><code>Leer a</code><br><code>Leer b</code><br><code>c ← a * b</code><br><code>d ← c * 0.18 + c</code><br><code>Escribir d</code>',
          pista: 'Lee el código e intenta adivinar qué calcula. Esa dificultad es el problema.',
          solucion: `${cod('pseudo', `Algoritmo CalcularTotalConIGV
	Definir precioUnitario, cantidad, subtotal, totalConIGV Como Real
	TASA_IGV <- 0.18

	Escribir "Precio unitario:"
	Leer precioUnitario
	Escribir "Cantidad:"
	Leer cantidad

	subtotal <- precioUnitario * cantidad
	totalConIGV <- subtotal + subtotal * TASA_IGV

	Escribir "Total a pagar: ", totalConIGV
FinAlgoritmo`)}
<p><b>Cambios y por qué:</b></p>
<ul>
<li><code>a, b, c, d</code> → nombres que dicen qué contienen. Ahora el código se puede leer sin ejecutarlo mentalmente.</li>
<li><code>0.18</code> → <code>TASA_IGV</code>. Se cambia en un lugar y se sabe qué significa.</li>
<li>Se agregaron los <code>Escribir</code> de aviso antes de cada <code>Leer</code>: sin ellos el programa pide datos en silencio.</li>
<li>El nombre del algoritmo también describe su propósito.</li>
</ul>
<p>Mismo número de líneas de lógica, diferencia enorme de legibilidad. Esto es el trabajo real de un programador: no escribir código que funcione, sino código que <b>además</b> se entienda.</p>` },
        { n: 3, titulo: 'Datos personales',
          enunciado: 'Escribe un algoritmo que lea nombre, apellido, año de nacimiento y sueldo, y muestre una ficha formateada con el nombre completo en mayúsculas, la edad calculada y el sueldo anual. Ejecútalo en el laboratorio.',
          pista: 'Edad = año actual − año de nacimiento (aproximada). Usa la función mayusculas.',
          lab: 'Algoritmo FichaPersonal\n\tDefinir nombre, apellido Como Cadena\n\tDefinir anioNacimiento, edad Como Entero\n\tDefinir sueldoMensual, sueldoAnual Como Real\n\tANIO_ACTUAL <- 2026\n\tMESES_DEL_ANIO <- 12\n\n\tEscribir "Nombre:"\n\tLeer nombre\n\tEscribir "Apellido:"\n\tLeer apellido\n\tEscribir "Año de nacimiento:"\n\tLeer anioNacimiento\n\tEscribir "Sueldo mensual:"\n\tLeer sueldoMensual\n\n\tedad <- ANIO_ACTUAL - anioNacimiento\n\tsueldoAnual <- sueldoMensual * MESES_DEL_ANIO\n\n\tEscribir "--- FICHA ---"\n\tEscribir mayusculas(apellido), ", ", mayusculas(nombre)\n\tEscribir "Edad aproximada: ", edad, " años"\n\tEscribir "Sueldo anual: S/ ", sueldoAnual\nFinAlgoritmo',
          labEntradas: 'Hugo\nSantos\n1997\n2500',
          solucion: `${cod('pseudo', `Algoritmo FichaPersonal
	Definir nombre, apellido Como Cadena
	Definir anioNacimiento, edad Como Entero
	Definir sueldoMensual, sueldoAnual Como Real
	ANIO_ACTUAL <- 2026
	MESES_DEL_ANIO <- 12

	Escribir "Nombre:"
	Leer nombre
	Escribir "Apellido:"
	Leer apellido
	Escribir "Año de nacimiento:"
	Leer anioNacimiento
	Escribir "Sueldo mensual:"
	Leer sueldoMensual

	edad <- ANIO_ACTUAL - anioNacimiento
	sueldoAnual <- sueldoMensual * MESES_DEL_ANIO

	Escribir "--- FICHA ---"
	Escribir mayusculas(apellido), ", ", mayusculas(nombre)
	Escribir "Edad aproximada: ", edad, " años"
	Escribir "Sueldo anual: S/ ", sueldoAnual
FinAlgoritmo`)}
<p>Dos observaciones de calidad:</p>
<ul>
<li>La edad es <b>aproximada</b> y el nombre de la variable debería decirlo, porque restar años ignora si ya pasó el cumpleaños. Calcular una edad exacta necesita día y mes, y es un ejercicio sorprendentemente lleno de casos límite (el 29 de febrero, por ejemplo).</li>
<li><code>ANIO_ACTUAL</code> como constante es una solución provisional honesta: el programa se vuelve incorrecto el 1 de enero. En un lenguaje real se pediría la fecha al sistema. Reconocer esta clase de «deuda» es parte del oficio.</li>
</ul>` },
        { n: 4, titulo: 'Global contra local',
          enunciado: 'Explica qué imprime este algoritmo y por qué. Luego reescríbelo sin variables globales y argumenta cuál versión preferirías mantener.<br><pre>Definir total Como Real\ntotal ← 0\n\nSubProceso agregar(x)\n    total ← total + x\nFinSubProceso\n\nAlgoritmo P\n    agregar(10)\n    agregar(5)\n    Escribir total\nFinAlgoritmo</pre>',
          pista: 'La variable total es visible desde el subproceso. ¿Qué pasaría si otro subproceso también la modificara?',
          solucion: `<p><b>Imprime 15</b>, porque <code>total</code> es global y <code>agregar</code> la modifica directamente.</p>
<p><b>Versión sin globales:</b></p>
${cod('pseudo', `Funcion nuevoTotal <- agregar(totalActual, x)
	nuevoTotal <- totalActual + x
FinFuncion

Algoritmo P
	Definir total Como Real
	total <- 0
	total <- agregar(total, 10)
	total <- agregar(total, 5)
	Escribir total
FinAlgoritmo`)}
<p><b>Cuál preferir y por qué.</b> La segunda, por tres razones concretas:</p>
<ul>
<li><b>Es comprobable.</b> <code>agregar(100, 5)</code> devuelve 105 siempre, sin importar el estado del programa. La versión global no se puede probar sin preparar un estado previo.</li>
<li><b>No tiene efectos a distancia.</b> En la versión global, leer <code>agregar(10)</code> no te dice qué cambió: hay que ir a ver la definición. Con 30 subprocesos tocando la misma global, averiguar quién dejó un valor raro exige revisarlos todos.</li>
<li><b>Es segura con concurrencia.</b> Dos ejecuciones simultáneas de la versión global pueden pisarse; la versión con parámetros no comparte nada.</li>
</ul>
<p>Una función cuyo resultado depende solo de sus parámetros y que no modifica nada externo se llama <b>función pura</b>, y es la unidad de código más fácil de entender, probar y reutilizar que existe. No todo puede ser puro (algo tiene que escribir en pantalla), pero cuanto más lo sea, menos tiempo pasarás depurando.</p>` },
        { n: 5, titulo: 'Diseña la declaración de un sistema',
          enunciado: 'Para un sistema de inventario de una tienda, escribe la sección de declaraciones completa: constantes, variables globales justificadas (si alguna lo está) y las variables locales que necesitaría el subproceso «registrar una venta». Justifica cada decisión de tipo y de ámbito.',
          pista: 'Las constantes son valores de negocio; lo que cambia por venta es local.',
          solucion: `${cod('pseudo', `// ---------- CONSTANTES (valores de negocio, nunca cambian en ejecución) ----------
TASA_IGV          <- 0.18      // Real: porcentaje
STOCK_MINIMO      <- 5         // Entero: unidades para alerta de reposición
MAX_PRODUCTOS     <- 1000      // Entero: tamaño de los arreglos
MONEDA            <- "S/"      // Cadena: para formatear la salida
DESCUENTO_MAYORISTA <- 0.05    // Real: a partir de 12 unidades
CANTIDAD_MAYORISTA  <- 12      // Entero

// ---------- ESTADO GLOBAL (el inventario mismo: justificado) ----------
Dimension codigos[MAX_PRODUCTOS]       // Cadena: códigos como "ABC-001"
Dimension descripciones[MAX_PRODUCTOS] // Cadena
Dimension preciosCentimos[MAX_PRODUCTOS] // Entero: céntimos, NO Real (módulo 1)
Dimension stocks[MAX_PRODUCTOS]        // Entero: unidades
Definir cantidadProductos Como Entero  // cuántas casillas están en uso

// ---------- LOCALES de registrarVenta() ----------
// Definir codigoBuscado Como Cadena      // lo que teclea el cajero
// Definir posicion Como Entero           // resultado de la búsqueda; 0 = no existe
// Definir unidadesVendidas Como Entero
// Definir subtotalCentimos Como Entero
// Definir descuentoCentimos Como Entero
// Definir igvCentimos Como Entero
// Definir totalCentimos Como Entero`)}
<p><b>Justificaciones:</b></p>
<ul>
<li><b>Precios en céntimos enteros</b>, no reales: es la lección del módulo 1. Con <code>Real</code>, mil ventas dejan los totales descuadrados por céntimos.</li>
<li><b>Códigos como <code>Cadena</code></b>: contienen letras, y aunque no las contuvieran, nunca se calcula con ellos.</li>
<li><b>El inventario es global con justificación:</b> representa el estado persistente del sistema, lo usan casi todos los subprocesos y no tiene sentido pasarlo como parámetro en cada llamada. Esta es la excepción legítima a la regla «evita globales»: el estado del dominio. En un lenguaje orientado a objetos, esto sería exactamente una clase <code>Inventario</code> con sus datos privados (módulo 8), que es la forma moderna de tener estado compartido sin que sea global.</li>
<li><b><code>cantidadProductos</code> acompaña a los arreglos:</b> un arreglo de 1000 casillas con 37 productos cargados necesita saber que solo las 37 primeras son válidas. Olvidar esta variable es un error clásico, y todo recorrido debe ir <code>Hasta cantidadProductos</code> y no <code>Hasta MAX_PRODUCTOS</code>.</li>
<li><b>Todo lo que cambia por venta es local:</b> así dos cajas pueden registrar ventas sin interferirse, y cada llamada empieza limpia.</li>
<li><b><code>posicion = 0</code> como «no existe»</b> es una convención que hay que documentar. La alternativa (devolver −1) es la de los lenguajes con arreglos desde 0; lo importante es elegir una y ser consistente.</li>
</ul>` }
      ],
      quiz: [
        { p: 'El DNI de una persona debería guardarse como…',
          ops: ['Entero, porque son números', 'Cadena, porque nunca se calcula con él y puede empezar por 0',
            'Real', 'Logico'],
          ok: 1, exp: 'Si un dato numérico no se suma ni se promedia, es texto. Además un entero perdería los ceros iniciales.' },
        { p: 'Un «número mágico» es…',
          ops: ['un número primo', 'un valor literal suelto en el código cuyo significado no es evidente',
            'un número aleatorio', 'el valor máximo de un tipo'],
          ok: 1, exp: 'Como el 0.18 escrito directamente. Darle nombre de constante lo documenta y permite cambiarlo en un solo lugar.' },
        { p: '¿Por qué se prefieren las variables locales a las globales?',
          ops: ['Ocupan menos memoria', 'Porque limitan quién puede modificarlas, lo que reduce drásticamente el área de búsqueda de un error',
            'Son más rápidas de escribir', 'Porque las globales no existen en los lenguajes modernos'],
          ok: 1, exp: 'Una global puede cambiar desde cualquier línea del programa; una local, solo desde su bloque. Eso convierte un error de «revisar todo» en uno de «revisar veinte líneas».' }
      ]
    },

    {
      id: 'm3-2',
      titulo: 'Operadores y expresiones',
      resumen: 'Aritméticos, relacionales y lógicos; precedencia, división entera y los errores de conversión de tipos.',
      objetivos: [
        'Evaluar expresiones respetando la precedencia de operadores',
        'Distinguir división real de división entera',
        'Predecir el resultado de operaciones entre tipos distintos'
      ],
      lectura: `
<p>Una <strong>expresión</strong> es cualquier combinación de valores y operadores que produce un resultado.
<code>3 + 4</code> es una expresión, <code>edad &gt;= 18</code> también, y <code>(a O b) Y NO c</code> también. Todo
lo que va a la derecha de una flecha de asignación es una expresión.</p>

<h2>Operadores aritméticos</h2>
${tabla(['Operador', 'Operación', 'Ejemplo', '#Resultado'], [
  ['<code>+</code>', 'suma (y concatenación de texto)', '<code>7 + 3</code>', '10'],
  ['<code>-</code>', 'resta', '<code>7 - 3</code>', '4'],
  ['<code>*</code>', 'multiplicación', '<code>7 * 3</code>', '21'],
  ['<code>/</code>', 'división real', '<code>7 / 3</code>', '2.3333…'],
  ['<code>MOD</code> o <code>%</code>', 'resto de la división entera', '<code>7 MOD 3</code>', '1'],
  ['<code>^</code>', 'potencia', '<code>7 ^ 2</code>', '49'],
  ['<code>trunc()</code>', 'parte entera (corta decimales)', '<code>trunc(7/3)</code>', '2'],
  ['<code>redon()</code>', 'redondeo al más cercano', '<code>redon(7/3)</code>', '2']
])}

<h3>MOD: el operador más subestimado</h3>
<p>El resto parece una curiosidad y es una de las herramientas más útiles que existen:</p>
<ul>
  <li><code>n MOD 2 = 0</code> → ¿es par?</li>
  <li><code>n MOD 10</code> → el último dígito de <code>n</code></li>
  <li><code>n MOD 7</code> → convierte cualquier entero en un día de la semana (0 a 6)</li>
  <li><code>(hora + 5) MOD 24</code> → aritmética circular de reloj, sin casos especiales para la medianoche</li>
  <li><code>i MOD n</code> → recorrer un arreglo en círculo</li>
  <li><code>Si i MOD 100 = 0</code> → hacer algo cada 100 vueltas</li>
</ul>

<h2>El error de la división entera</h2>
<p>Este es, sin exagerar, uno de los tres errores más frecuentes de quien empieza:</p>

${cod('pseudo', `// En pseudocódigo y en Python 3, / es división real
Escribir 7 / 2        // 3.5

// Pero en C, Java, C# y Python 2, si los dos operandos son
// ENTEROS, la división es ENTERA y descarta los decimales:
int a = 7, b = 2;
printf("%d", a / b);   // 3, no 3.5

// Y el caso que arruina promedios:
promedio = suma / cantidad     // con suma=7 y cantidad=2 entero: da 3`)}

<p>La solución es forzar que al menos un operando sea real: <code>suma / 2.0</code>, o convertir explícitamente
(<code>(float) suma / cantidad</code>). Un promedio que siempre da números redondos es la señal inequívoca de este
error.</p>

<h2>Operadores relacionales</h2>
${tabla(['Operador', 'Significado', 'Ejemplo verdadero'], [
  ['<code>=</code>', 'igual que', '<code>5 = 5</code>'],
  ['<code>&lt;&gt;</code> o <code>!=</code>', 'distinto de', '<code>5 &lt;&gt; 3</code>'],
  ['<code>&gt;</code>', 'mayor que', '<code>5 &gt; 3</code>'],
  ['<code>&lt;</code>', 'menor que', '<code>3 &lt; 5</code>'],
  ['<code>&gt;=</code>', 'mayor o igual', '<code>5 &gt;= 5</code>'],
  ['<code>&lt;=</code>', 'menor o igual', '<code>3 &lt;= 5</code>']
], 'El resultado de un operador relacional es siempre Verdadero o Falso, nunca un número.')}

${nota('= compara, ← asigna',
  '<p>En pseudocódigo la asignación es <code>←</code> y la comparación es <code>=</code>, así que no hay confusión. ' +
  'En C, Java y JavaScript la asignación es <code>=</code> y la comparación es <code>==</code>, y escribir ' +
  '<code>if (x = 5)</code> en lugar de <code>if (x == 5)</code> <strong>asigna</strong> 5 a x y la condición resulta ' +
  'verdadera siempre. Es un error legendario, y la razón por la que algunos programadores escriben ' +
  '<code>if (5 == x)</code>: así, si olvidan un igual, el compilador protesta.</p>', 'warn')}

<h2>Precedencia: quién se evalúa antes</h2>
${tabla(['#Nivel', 'Operadores', 'Asociatividad'], [
  ['1 (primero)', '<code>( )</code> paréntesis', '—'],
  ['2', '<code>^</code> potencia', 'derecha a izquierda'],
  ['3', '<code>NO</code>, signo <code>-</code> unario', 'derecha a izquierda'],
  ['4', '<code>*</code> <code>/</code> <code>MOD</code>', 'izquierda a derecha'],
  ['5', '<code>+</code> <code>-</code>', 'izquierda a derecha'],
  ['6', '<code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code> <code>=</code> <code>&lt;&gt;</code>', 'izquierda a derecha'],
  ['7', '<code>Y</code>', 'izquierda a derecha'],
  ['8 (último)', '<code>O</code>', 'izquierda a derecha']
], 'La tabla completa de precedencia. Lo esencial: la potencia manda, después multiplicar y dividir, después sumar, después comparar, y al final la lógica.')}

${cod('pseudo', `2 + 3 * 4          // 14, no 20: primero el producto
(2 + 3) * 4        // 20
2 ^ 3 ^ 2          // 512, no 64: la potencia asocia a la derecha → 2^(3^2)
10 - 4 - 3         // 3: la resta asocia a la izquierda → (10-4)-3
-2 ^ 2             // -4: el signo se aplica después de la potencia
a > 0 Y b > 0      // (a>0) Y (b>0): las comparaciones van antes que Y
NO a = b           // NO(a) = b en algunos lenguajes: usa paréntesis`)}

<p>La recomendación profesional no es memorizar la tabla: es <strong>usar paréntesis cuando haya la menor duda</strong>.
No cuestan nada en rendimiento y ahorran horas. La tabla sirve para <em>leer</em> código ajeno que no los usó.</p>

<h2>Conversión de tipos</h2>
<p>Cuando un operador recibe tipos distintos, algo tiene que ceder. Hay dos formas:</p>
<ul>
  <li><strong>Implícita</strong> (el lenguaje decide): <code>3 + 2.5</code> convierte el 3 a real y da 5.5. Cómoda y
  peligrosa, porque puede perder información sin avisar.</li>
  <li><strong>Explícita</strong> (tú decides): <code>trunc(x)</code>, <code>convertirANumero(texto)</code>,
  <code>(int) x</code>. Más larga y mucho más segura.</li>
</ul>

${cod('pseudo', `"5" + 3        // ¿8 o "53"? Depende del lenguaje. JavaScript dice "53"
"5" * 3        // 15 en JavaScript: el * fuerza conversión numérica
convertirANumero("5") + 3     // 8, inequívoco
convertirATexto(5) + "3"      // "53", inequívoco`)}

<p>JavaScript es el caso extremo de conversión implícita y es famoso por ello: <code>[] + {}</code>,
<code>"5" - 3</code> y <code>1 + "1"</code> producen resultados que hay que memorizar. La lección general sirve para
cualquier lenguaje: <strong>cuando mezcles tipos, convierte explícitamente</strong>. Es una línea más y un error menos.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Evalúa las expresiones',
          enunciado: 'Calcula el resultado sin usar la computadora: (a) <code>2 + 3 * 4 - 1</code>; (b) <code>(2 + 3) * (4 - 1)</code>; (c) <code>17 MOD 5 + 17 / 5</code>; (d) <code>2 ^ 3 ^ 2</code>; (e) <code>10 - 2 - 3</code>; (f) <code>NO (3 &gt; 5) Y (2 &lt; 4)</code>.',
          pista: 'Aplica la tabla de precedencia y fíjate en la asociatividad de la potencia.',
          solucion: `<p><b>(a)</b> 2 + 12 − 1 = <b>13</b></p>
<p><b>(b)</b> 5 × 3 = <b>15</b></p>
<p><b>(c)</b> <code>17 MOD 5</code> = 2 y <code>17/5</code> = 3.4, así que 2 + 3.4 = <b>5.4</b></p>
<p><b>(d)</b> La potencia asocia a la derecha: 2^(3^2) = 2^9 = <b>512</b></p>
<p><b>(e)</b> La resta asocia a la izquierda: (10−2)−3 = <b>5</b></p>
<p><b>(f)</b> <code>NO(Falso) Y Verdadero</code> = <code>Verdadero Y Verdadero</code> = <b>Verdadero</b></p>
<p>Verifica (c) y (d) en el laboratorio: son los dos que más sorprenden.</p>` },
        { n: 2, titulo: 'Usa MOD',
          enunciado: 'Escribe la expresión que resuelve cada caso: (a) saber si un año es múltiplo de 4; (b) obtener el dígito de las decenas de un número; (c) convertir 250 minutos en horas y minutos; (d) dado un día del año (1-365), saber en qué día de la semana cae si el 1 de enero fue lunes.',
          pista: 'MOD te da el resto; trunc o la división entera te da el cociente.',
          solucion: `<p><b>(a)</b> <code>anio MOD 4 = 0</code></p>
<p><b>(b)</b> <code>trunc(n / 10) MOD 10</code>. Primero quitas el último dígito, luego tomas el nuevo último. Con 472: <code>trunc(47.2)=47</code>, <code>47 MOD 10 = 7</code> ✔</p>
<p><b>(c)</b> <code>horas ← trunc(250 / 60)</code> = 4 y <code>minutos ← 250 MOD 60</code> = 10. Son 4 h 10 min. Este par (cociente, resto) es el patrón universal para convertir unidades: segundos a h:m:s, céntimos a soles y céntimos, bytes a KiB.</p>
<p><b>(d)</b> <code>(dia - 1) MOD 7</code> da 0 para lunes, 1 para martes… El <code>−1</code> es necesario porque el día 1 debe dar 0. Si olvidas el −1, todo queda corrido un día: es el <i>off-by-one</i> aplicado a calendarios, y es la causa de muchos errores reales de agendas.</p>` },
        { n: 3, titulo: 'El promedio que siempre es redondo',
          enunciado: 'Un alumno se queja: su programa en Java calcula el promedio de 3 notas (14, 15 y 16) y siempre muestra 15 en lugar de 15.0, y con 14, 15 y 17 muestra 15 en lugar de 15.33. Explica qué pasa y da dos formas de arreglarlo.',
          pista: 'Mira los tipos de las variables involucradas en la división.',
          solucion: `<p><b>Qué pasa:</b> las notas están declaradas como <code>int</code>, así que <code>(14+15+17)</code> es un <code>int</code> (46) y <code>3</code> también. En Java, la división entre dos enteros es <b>división entera</b>: 46/3 = 15, se descartan los decimales. El resultado se guarda luego en un <code>double</code>, pero ya es demasiado tarde: la información se perdió en la división.</p>
<p><b>Arreglo 1 — forzar un operando real:</b></p>
${cod('java', `double promedio = (n1 + n2 + n3) / 3.0;   // el 3.0 es double
// o
double promedio = (double)(n1 + n2 + n3) / 3;`)}
<p><b>Arreglo 2 — declarar las notas como reales desde el principio:</b></p>
${cod('java', `double n1 = 14, n2 = 15, n3 = 17;
double promedio = (n1 + n2 + n3) / 3;`)}
<p>El arreglo 2 es preferible si las notas pueden tener decimales (14.5); el 1 es preferible si las notas son realmente enteras y solo el promedio es real, porque mantiene los tipos honestos.</p>
<p><b>Regla para recordar:</b> en la mayoría de los lenguajes, el tipo del resultado de una operación lo determinan los <b>operandos</b>, no la variable donde lo guardas. Python 3 es la excepción deliberada: su <code>/</code> siempre da real y tiene <code>//</code> para la división entera, precisamente porque este error era demasiado común.</p>` },
        { n: 4, titulo: 'Descompón un tiempo',
          enunciado: 'Escribe un algoritmo que lea una cantidad de segundos y la muestre como días, horas, minutos y segundos. Pruébalo con 100000 segundos (debe dar 1 día, 3 horas, 46 minutos, 40 segundos).',
          pista: 'Ve de la unidad más grande a la más pequeña, usando cociente para extraer y resto para lo que sobra.',
          lab: 'Algoritmo DescomponerTiempo\n\tDefinir total, dias, horas, minutos, segundos, resto Como Entero\n\tSEG_POR_DIA <- 86400\n\tSEG_POR_HORA <- 3600\n\tSEG_POR_MIN <- 60\n\n\tEscribir "Cantidad de segundos:"\n\tLeer total\n\n\tdias <- trunc(total / SEG_POR_DIA)\n\tresto <- total MOD SEG_POR_DIA\n\thoras <- trunc(resto / SEG_POR_HORA)\n\tresto <- resto MOD SEG_POR_HORA\n\tminutos <- trunc(resto / SEG_POR_MIN)\n\tsegundos <- resto MOD SEG_POR_MIN\n\n\tEscribir total, " segundos son:"\n\tEscribir dias, " día(s), ", horas, " hora(s), ", minutos, " minuto(s), ", segundos, " segundo(s)"\nFinAlgoritmo',
          labEntradas: '100000',
          solucion: `${cod('pseudo', `Algoritmo DescomponerTiempo
	Definir total, dias, horas, minutos, segundos, resto Como Entero
	SEG_POR_DIA  <- 86400
	SEG_POR_HORA <- 3600
	SEG_POR_MIN  <- 60

	Leer total

	dias     <- trunc(total / SEG_POR_DIA)
	resto    <- total MOD SEG_POR_DIA
	horas    <- trunc(resto / SEG_POR_HORA)
	resto    <- resto MOD SEG_POR_HORA
	minutos  <- trunc(resto / SEG_POR_MIN)
	segundos <- resto MOD SEG_POR_MIN

	Escribir dias, "d ", horas, "h ", minutos, "m ", segundos, "s"
FinAlgoritmo`)}
${tabla(['Paso', 'Operación', '#Resultado', '#Resto'], [
  ['Días', '100000 ÷ 86400', '1', '13600'],
  ['Horas', '13600 ÷ 3600', '3', '2800'],
  ['Minutos', '2800 ÷ 60', '46', '40'],
  ['Segundos', '—', '40', '—']
], 'El patrón cociente-resto en cascada: 1d 3h 46m 40s ✔')}
<p>Este patrón es exactamente el mismo de las divisiones sucesivas para convertir a binario (módulo 1). Allí el divisor era siempre 2; aquí cambia en cada paso porque las unidades de tiempo no son uniformes. La estructura del algoritmo es idéntica, y reconocer eso es reconocimiento de patrones.</p>` },
        { n: 5, titulo: 'Predice las conversiones',
          enunciado: 'Un compañero escribe este código en JavaScript y los resultados lo desconciertan. Predice cada salida y explica la regla que la produce. Luego reescribe el fragmento para que sea inequívoco.<br><pre>console.log("5" + 3);\nconsole.log("5" - 3);\nconsole.log(5 + null);\nconsole.log("5" == 5);\nconsole.log("5" === 5);\nconsole.log(0.1 + 0.2 == 0.3);\nconsole.log([] + []);</pre>',
          pista: 'El + está sobrecargado (suma y concatena); los demás operadores aritméticos solo saben de números.',
          solucion: `${tabla(['Expresión', '#Resultado', 'Regla'], [
  ['<code>"5" + 3</code>', '<code>"53"</code>', 'Si algún operando de <code>+</code> es texto, <code>+</code> concatena y convierte el otro a texto'],
  ['<code>"5" - 3</code>', '<code>2</code>', '<code>-</code> solo existe para números, así que fuerza la conversión de "5" a 5'],
  ['<code>5 + null</code>', '<code>5</code>', '<code>null</code> se convierte a 0 en contexto numérico'],
  ['<code>"5" == 5</code>', '<code>true</code>', '<code>==</code> convierte antes de comparar (igualdad «débil»)'],
  ['<code>"5" === 5</code>', '<code>false</code>', '<code>===</code> compara tipo <b>y</b> valor, sin convertir'],
  ['<code>0.1 + 0.2 == 0.3</code>', '<code>false</code>', 'IEEE 754: la suma da 0.30000000000000004 (módulo 1)'],
  ['<code>[] + []</code>', '<code>""</code>', 'Los arreglos se convierten a texto; dos vacíos concatenados dan cadena vacía']
])}
<p><b>Versión inequívoca:</b></p>
${cod('js', `console.log(Number("5") + 3);              // 8
console.log(String(5) + "3");             // "53"
console.log(Number("5") === 5);           // true
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);  // true`)}
<p><b>Las tres reglas que te llevas:</b></p>
<ol>
<li><b>Convierte explícitamente</b> al cruzar tipos: <code>Number()</code>, <code>String()</code>, <code>parseInt()</code>. Una línea más, un bug menos.</li>
<li><b>Usa siempre <code>===</code></b> en JavaScript. La igualdad débil tiene una tabla de conversiones que nadie recuerda entera, y <code>null == undefined</code> es <code>true</code> mientras <code>null == 0</code> es <code>false</code>.</li>
<li><b>Nunca compares reales por igualdad</b>, en ningún lenguaje.</li>
</ol>
<p>El fondo del asunto: la conversión implícita se inventó para que el programador escribiera menos, y acabó costando mucho más tiempo del que ahorró. Los lenguajes modernos (TypeScript, Rust, Go) van en la dirección opuesta: prohibir la conversión silenciosa y exigirla explícita. Esa es la tendencia, y conviene adoptarla aunque tu lenguaje te permita lo contrario.</p>` }
      ],
      quiz: [
        { p: '<code>2 + 3 * 4</code> vale…', ops: ['20', '14', '24', '9'],
          ok: 1, exp: 'La multiplicación tiene más precedencia: 2 + 12 = 14.' },
        { p: 'En Java, <code>int a = 7, b = 2; double r = a / b;</code> deja <code>r</code> en…',
          ops: ['3.5', '3.0', '4.0', 'error de compilación'],
          ok: 1, exp: 'La división entre dos enteros es entera: da 3, y recién después se convierte a 3.0. Hay que forzar un operando real.' },
        { p: '<code>n MOD 10</code> devuelve…',
          ops: ['n dividido entre 10', 'el último dígito de n', 'n sin su último dígito', 'siempre 0'],
          ok: 1, exp: 'El resto de dividir entre 10 es exactamente el dígito de las unidades. Para quitar el último dígito se usa <code>trunc(n/10)</code>.' }
      ]
    },

    {
      id: 'm3-3',
      titulo: 'Condicionales en pseudocódigo',
      resumen: 'Si-Entonces-Sino, anidamiento, Segun, y las buenas prácticas que evitan el código con forma de escalera.',
      objetivos: [
        'Escribir condicionales simples, dobles, anidados y múltiples',
        'Usar Segun correctamente y saber cuándo no sirve',
        'Reducir el anidamiento con cláusulas de guarda'
      ],
      lectura: `
<p>Ya viste las estructuras dibujadas en el módulo 2. Aquí está su escritura exacta y, sobre todo, las prácticas que
hacen la diferencia entre un condicional legible y una escalera ilegible.</p>

<h2>Las cuatro formas</h2>
${cod('pseudo', `// 1. Simple
Si condicion Entonces
	acciones
FinSi

// 2. Doble
Si condicion Entonces
	acciones si es verdadera
Sino
	acciones si es falsa
FinSi

// 3. Anidada / en cascada
Si cond1 Entonces
	...
Sino
	Si cond2 Entonces
		...
	Sino
		...
	FinSi
FinSi

// 4. Selección múltiple
Segun expresion Hacer
	caso valor1:
		acciones
	caso valor2, valor3:        // varios valores, mismas acciones
		acciones
	De Otro Modo:
		acciones por defecto
FinSegun`)}

<h2>Segun: qué puede y qué no</h2>
<p><code>Segun</code> compara una expresión contra <strong>valores exactos</strong>. No admite rangos ni condiciones
compuestas, y esa limitación es deliberada: permite al compilador generar una tabla de saltos, que es más rápida que
una cascada de comparaciones.</p>

${cod('pseudo', `// CORRECTO: valores exactos
Segun opcion Hacer
	caso 1: Escribir "Registrar"
	caso 2: Escribir "Consultar"
	caso 3, 4: Escribir "Reportes"      // dos valores, misma acción
	De Otro Modo: Escribir "Opción inválida"
FinSegun

// NO SE PUEDE: rangos
Segun nota Hacer
	caso nota > 15: ...        // esto no es un valor
FinSegun

// Para rangos, cascada de Si:
Si nota >= 18 Entonces        Escribir "AD"
Sino Si nota >= 14 Entonces   Escribir "A"
Sino Si nota >= 11 Entonces   Escribir "B"
Sino                          Escribir "C"
FinSi`)}

${nota('El De Otro Modo no es opcional',
  '<p>Un <code>Segun</code> sin <code>De Otro Modo</code> ignora en silencio cualquier valor que no previste. En un ' +
  'menú, eso significa que el usuario pulsa 7 y no pasa nada: el programa parece colgado. Pon siempre el caso por ' +
  'defecto, aunque solo sea para registrar «valor inesperado: X».</p>', 'warn')}

<h2>El problema de la escalera</h2>
<p>El anidamiento profundo es el enemigo de la legibilidad. Compara:</p>

${cod('pseudo', `// ESCALERA: hay que leer hasta el fondo para encontrar la acción real
Funcion r <- procesarPedido(pedido)
	Si pedido <> nulo Entonces
		Si pedido.cliente <> nulo Entonces
			Si pedido.items > 0 Entonces
				Si pedido.pagado Entonces
					r <- despachar(pedido)
				Sino
					r <- "no pagado"
				FinSi
			Sino
				r <- "sin items"
			FinSi
		Sino
			r <- "sin cliente"
		FinSi
	Sino
		r <- "pedido nulo"
	FinSi
FinFuncion`)}

<p>Cuatro niveles de indentación, y la línea importante (<code>despachar</code>) está enterrada al fondo. Con
<strong>cláusulas de guarda</strong> se invierte la lógica: se descartan los casos malos primero y se sale, dejando el
camino correcto al final sin indentación:</p>

${cod('pseudo', `// GUARDAS: cada caso inválido se descarta y se sale de inmediato
Funcion r <- procesarPedido(pedido)
	Si pedido = nulo Entonces
		Retornar "pedido nulo"
	FinSi
	Si pedido.cliente = nulo Entonces
		Retornar "sin cliente"
	FinSi
	Si pedido.items <= 0 Entonces
		Retornar "sin items"
	FinSi
	Si NO pedido.pagado Entonces
		Retornar "no pagado"
	FinSi
	// a partir de aquí, todo está validado
	r <- despachar(pedido)
FinFuncion`)}

<p>La segunda versión tiene la misma lógica, un solo nivel de indentación y se lee como una lista de requisitos. Es la
técnica más rentable que vas a aprender sobre condicionales, y en inglés se llama <em>early return</em>.</p>

<h2>Más buenas prácticas</h2>

<p><strong>No compares booleanos con Verdadero.</strong> <code>Si esSocio = Verdadero</code> es redundante:
<code>esSocio</code> ya <em>es</em> la condición. Escribe <code>Si esSocio</code> y <code>Si NO esSocio</code>. Y nombra
los booleanos como preguntas (<code>esValido</code>, <code>tienePermiso</code>) para que esa lectura funcione.</p>

<p><strong>Evita la doble negación.</strong> <code>Si NO (NO activo)</code> es <code>Si activo</code>. Y
<code>Si NO esInvalido</code> se lee mejor como <code>Si esValido</code>: nombra la variable por su lado positivo.</p>

<p><strong>Extrae condiciones complejas a una variable o función con nombre.</strong></p>
${cod('pseudo', `// Difícil de leer
Si (edad >= 18 Y tieneDNI) O (edad >= 16 Y tieneAutorizacion Y NO esExtranjero) Entonces

// Se explica solo
puedeVotar <- (edad >= 18 Y tieneDNI)
puedeVotarConPermiso <- (edad >= 16 Y tieneAutorizacion Y NO esExtranjero)
Si puedeVotar O puedeVotarConPermiso Entonces`)}

<p>Esto no es solo estética: la segunda versión se puede depurar. Puedes imprimir <code>puedeVotar</code> y ver cuál de
las dos mitades falló, algo imposible en la condición de una línea.</p>

<p><strong>Cuidado con los casos no cubiertos.</strong> Después de escribir cualquier cascada, pregúntate: «¿qué pasa si
ninguna condición se cumple?». Si la respuesta es «no sé», hay un hueco.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Calificación literal',
          enunciado: 'Escribe un algoritmo que lea una nota de 0 a 20 y muestre la calificación literal: AD (18-20), A (14-17), B (11-13), C (0-10). Valida que la nota esté en el rango.',
          pista: 'Valida primero con una guarda, y luego usa una cascada ordenada de mayor a menor.',
          lab: 'Algoritmo CalificacionLiteral\n\tDefinir nota Como Real\n\tEscribir "Nota (0 a 20):"\n\tLeer nota\n\tSi nota < 0 O nota > 20 Entonces\n\t\tEscribir "Nota inválida"\n\tSino\n\t\tSi nota >= 18 Entonces\n\t\t\tEscribir "AD - Logro destacado"\n\t\tSino\n\t\t\tSi nota >= 14 Entonces\n\t\t\t\tEscribir "A - Logro esperado"\n\t\t\tSino\n\t\t\t\tSi nota >= 11 Entonces\n\t\t\t\t\tEscribir "B - En proceso"\n\t\t\t\tSino\n\t\t\t\t\tEscribir "C - En inicio"\n\t\t\t\tFinSi\n\t\t\tFinSi\n\t\tFinSi\n\tFinSi\nFinAlgoritmo',
          labEntradas: '15.5',
          solucion: `${cod('pseudo', `Algoritmo CalificacionLiteral
	Definir nota Como Real
	Leer nota
	Si nota < 0 O nota > 20 Entonces
		Escribir "Nota inválida"
	Sino
		Si nota >= 18 Entonces
			Escribir "AD - Logro destacado"
		Sino
			Si nota >= 14 Entonces
				Escribir "A - Logro esperado"
			Sino
				Si nota >= 11 Entonces
					Escribir "B - En proceso"
				Sino
					Escribir "C - En inicio"
				FinSi
			FinSi
		FinSi
	FinSi
FinAlgoritmo`)}
<p>Casos frontera que hay que probar: 20, 18, 17.9, 14, 13.9, 11, 10.9, 0, −1, 21. Los valores justo por debajo de cada límite (17.9, 13.9, 10.9) son los que delatan un <code>&gt;</code> puesto donde iba <code>&gt;=</code>.</p>` },
        { n: 2, titulo: 'Convierte a guardas',
          enunciado: 'Reescribe esta función con cláusulas de guarda y cuenta los niveles de indentación antes y después.<br><pre>Funcion r ← retirar(cuenta, monto)\n    Si cuenta.activa Entonces\n        Si monto &gt; 0 Entonces\n            Si monto &lt;= cuenta.saldo Entonces\n                Si monto &lt;= LIMITE_DIARIO Entonces\n                    cuenta.saldo ← cuenta.saldo − monto\n                    r ← "ok"\n                Sino\n                    r ← "excede el límite diario"\n                FinSi\n            Sino\n                r ← "saldo insuficiente"\n            FinSi\n        Sino\n            r ← "monto inválido"\n        FinSi\n    Sino\n        r ← "cuenta inactiva"\n    FinSi\nFinFuncion</pre>',
          pista: 'Invierte cada condición y retorna el error de inmediato.',
          solucion: `${cod('pseudo', `Funcion r <- retirar(cuenta, monto)
	Si NO cuenta.activa Entonces
		Retornar "cuenta inactiva"
	FinSi
	Si monto <= 0 Entonces
		Retornar "monto inválido"
	FinSi
	Si monto > cuenta.saldo Entonces
		Retornar "saldo insuficiente"
	FinSi
	Si monto > LIMITE_DIARIO Entonces
		Retornar "excede el límite diario"
	FinSi
	// invariante: cuenta activa, monto positivo, hay saldo y está bajo el límite
	cuenta.saldo <- cuenta.saldo - monto
	r <- "ok"
FinFuncion`)}
<p><b>Indentación:</b> antes, 5 niveles en la rama más profunda; después, <b>1 nivel</b>.</p>
<p>Tres ventajas concretas, más allá de la estética:</p>
<ul>
<li><b>Cada validación es independiente.</b> Agregar una quinta (por ejemplo «la cuenta no está embargada») es añadir cuatro líneas al principio, sin reindentar nada. En la versión anidada habría que abrir otro nivel y mover todo.</li>
<li><b>La lógica principal está visible al final</b>, sin tener que seguir con el dedo qué <code>Sino</code> cierra qué <code>Si</code>.</li>
<li><b>El invariante queda explícito.</b> Al llegar a la última línea sabes exactamente qué es verdadero, porque todo lo contrario ya se descartó. Ese comentario de una línea vale más que cualquier diagrama.</li>
</ul>` },
        { n: 3, titulo: 'Menú con Segun',
          enunciado: 'Escribe un menú de 5 opciones (registrar, consultar, modificar, eliminar, salir) usando <code>Segun</code>, dentro de un bucle que se repita hasta que el usuario elija salir, con manejo de opción inválida.',
          pista: 'Repetir…Hasta Que es el bucle natural para un menú.',
          lab: 'Algoritmo MenuPrincipal\n\tDefinir op Como Entero\n\tRepetir\n\t\tEscribir ""\n\t\tEscribir "===== MENÚ ====="\n\t\tEscribir "1. Registrar"\n\t\tEscribir "2. Consultar"\n\t\tEscribir "3. Modificar"\n\t\tEscribir "4. Eliminar"\n\t\tEscribir "5. Salir"\n\t\tEscribir "Opción:"\n\t\tLeer op\n\t\tSegun op Hacer\n\t\t\tcaso 1: Escribir ">> Registrando un nuevo producto..."\n\t\t\tcaso 2: Escribir ">> Mostrando el catálogo..."\n\t\t\tcaso 3: Escribir ">> Modificando un producto..."\n\t\t\tcaso 4: Escribir ">> Eliminando un producto..."\n\t\t\tcaso 5: Escribir ">> Hasta luego"\n\t\t\tDe Otro Modo: Escribir "!! Opción inválida, elige entre 1 y 5"\n\t\tFinSegun\n\tHasta Que op = 5\nFinAlgoritmo',
          labEntradas: '1\n7\n3\n5',
          solucion: `${cod('pseudo', `Algoritmo MenuPrincipal
	Definir op Como Entero
	Repetir
		Escribir "===== MENÚ ====="
		Escribir "1. Registrar"
		Escribir "2. Consultar"
		Escribir "3. Modificar"
		Escribir "4. Eliminar"
		Escribir "5. Salir"
		Escribir "Opción:"
		Leer op
		Segun op Hacer
			caso 1: registrarProducto()
			caso 2: consultarCatalogo()
			caso 3: modificarProducto()
			caso 4: eliminarProducto()
			caso 5: Escribir "Hasta luego"
			De Otro Modo: Escribir "Opción inválida, elige entre 1 y 5"
		FinSegun
	Hasta Que op = 5
FinAlgoritmo`)}
<p>Tres decisiones de diseño:</p>
<ul>
<li><b><code>Repetir…Hasta Que</code> y no <code>Mientras</code>:</b> hay que mostrar el menú y leer la opción al menos una vez antes de poder evaluar la condición de salida.</li>
<li><b>Cada caso llama a un subproceso</b> en lugar de contener 30 líneas. Así el menú cabe en una pantalla y sigue siendo el índice legible del sistema. Un <code>Segun</code> con los cuerpos completos dentro es un clásico de código inmantenible.</li>
<li><b>El <code>De Otro Modo</code> informa el rango válido.</b> «Opción inválida» a secas obliga al usuario a adivinar; decir «elige entre 1 y 5» lo resuelve.</li>
</ul>
<p>Mejora que vale la pena notar: si el usuario escribe texto en lugar de un número, <code>op</code> no será ningún caso y caerá en <code>De Otro Modo</code>, lo que es exactamente el comportamiento deseado. Eso es robustez obtenida gratis por haber puesto el caso por defecto.</p>` },
        { n: 4, titulo: 'Extrae las condiciones',
          enunciado: 'Reescribe esta condición dándole nombres significativos a sus partes, y explica cómo eso facilita depurarla.<br><code>Si (d &gt;= 1 Y d &lt;= 31) Y (m &gt;= 1 Y m &lt;= 12) Y (a &gt;= 1900 Y a &lt;= 2100) Y NO (m = 2 Y d &gt; 29) Y NO ((m = 4 O m = 6 O m = 9 O m = 11) Y d &gt; 30) Entonces</code>',
          pista: 'Agrupa por concepto: rango de día, rango de mes, rango de año, febrero, meses de 30 días.',
          solucion: `${cod('pseudo', `diaEnRango      <- d >= 1 Y d <= 31
mesEnRango      <- m >= 1 Y m <= 12
anioEnRango     <- a >= 1900 Y a <= 2100
febreroValido   <- NO (m = 2 Y d > 29)
mesDe30Valido   <- NO ((m = 4 O m = 6 O m = 9 O m = 11) Y d > 30)

fechaValida <- diaEnRango Y mesEnRango Y anioEnRango Y febreroValido Y mesDe30Valido

Si fechaValida Entonces
	...
FinSi`)}
<p><b>Por qué facilita depurar:</b> si una fecha se rechaza y no entiendes por qué, puedes imprimir las cinco variables y ver exactamente cuál dio <code>Falso</code>. Con la condición de una línea solo sabes que el conjunto falló, y tienes que ir partiendo la expresión a mano para averiguar dónde.</p>
<p>Además, cada nombre documenta una regla de negocio. Si mañana se amplía el rango de años, sabes qué línea tocar sin leer la expresión completa.</p>
<p><b>Y un bug que la refactorización hace evidente:</b> <code>febreroValido</code> acepta el 29 de febrero <b>siempre</b>, incluso en años no bisiestos. Al tener la regla aislada y con nombre, el hueco salta a la vista; enterrada en una expresión de 200 caracteres, pasaría inadvertida. La versión correcta usaría la función <code>esBisiesto</code> del módulo 2:</p>
${cod('pseudo', `febreroValido <- NO (m = 2 Y (d > 29 O (d = 29 Y NO esBisiesto(a))))`)}
<p>Refactorizar no solo embellece: <b>encuentra errores</b>.</p>` },
        { n: 5, titulo: 'Clasificador de IMC con validaciones',
          enunciado: 'Escribe un algoritmo completo que lea peso (kg) y talla (m), valide los datos, calcule el índice de masa corporal (peso / talla²) y clasifique según la OMS: bajo peso (&lt;18.5), normal (18.5–24.9), sobrepeso (25–29.9), obesidad (≥30). Usa guardas para la validación y explica qué rangos consideras válidos y por qué.',
          pista: 'Piensa qué valores de peso y talla son físicamente posibles, y qué pasa si la talla es 0.',
          lab: 'Algoritmo ClasificarIMC\n\tDefinir peso, talla, imc Como Real\n\tPESO_MIN <- 2\n\tPESO_MAX <- 400\n\tTALLA_MIN <- 0.4\n\tTALLA_MAX <- 2.6\n\n\tEscribir "Peso en kg:"\n\tLeer peso\n\tEscribir "Talla en metros (ej. 1.72):"\n\tLeer talla\n\n\tSi peso < PESO_MIN O peso > PESO_MAX Entonces\n\t\tEscribir "Peso fuera del rango plausible (", PESO_MIN, " a ", PESO_MAX, " kg)"\n\tSino\n\t\tSi talla < TALLA_MIN O talla > TALLA_MAX Entonces\n\t\t\tEscribir "Talla fuera del rango plausible. ¿La escribiste en metros?"\n\t\tSino\n\t\t\timc <- peso / (talla * talla)\n\t\t\tEscribir "IMC = ", imc\n\t\t\tSi imc < 18.5 Entonces\n\t\t\t\tEscribir "Clasificación: bajo peso"\n\t\t\tSino\n\t\t\t\tSi imc < 25 Entonces\n\t\t\t\t\tEscribir "Clasificación: peso normal"\n\t\t\t\tSino\n\t\t\t\t\tSi imc < 30 Entonces\n\t\t\t\t\t\tEscribir "Clasificación: sobrepeso"\n\t\t\t\t\tSino\n\t\t\t\t\t\tEscribir "Clasificación: obesidad"\n\t\t\t\t\tFinSi\n\t\t\t\tFinSi\n\t\t\tFinSi\n\t\tFinSi\n\tFinSi\nFinAlgoritmo',
          labEntradas: '72\n1.75',
          solucion: `${cod('pseudo', `Funcion mensaje <- clasificarIMC(peso, talla)
	Definir imc Como Real
	PESO_MIN <- 2        // un recién nacido muy prematuro
	PESO_MAX <- 400      // por encima del récord documentado
	TALLA_MIN <- 0.4     // un recién nacido
	TALLA_MAX <- 2.6     // por encima de la persona más alta registrada

	// guardas: descartar lo imposible antes de calcular
	Si peso < PESO_MIN O peso > PESO_MAX Entonces
		Retornar "Peso fuera del rango plausible"
	FinSi
	Si talla < TALLA_MIN O talla > TALLA_MAX Entonces
		Retornar "Talla fuera de rango. ¿La escribiste en metros?"
	FinSi

	imc <- peso / (talla * talla)

	Si imc < 18.5 Entonces     Retornar "Bajo peso (IMC " + imc + ")"     FinSi
	Si imc < 25   Entonces     Retornar "Peso normal (IMC " + imc + ")"   FinSi
	Si imc < 30   Entonces     Retornar "Sobrepeso (IMC " + imc + ")"     FinSi
	Retornar "Obesidad (IMC " + imc + ")"
FinFuncion`)}
<p><b>Sobre los rangos elegidos:</b></p>
<ul>
<li><b>La talla debe ser &gt; 0</b> obligatoriamente: con 0 habría división entre cero. Pero validar solo <code>&gt; 0</code> es insuficiente, porque el error real y frecuente es que el usuario escriba <b>175 en lugar de 1.75</b>. Un rango plausible (0.4 a 2.6) atrapa ese error y permite dar un mensaje útil que menciona las unidades.</li>
<li><b>Los límites son deliberadamente generosos.</b> Una validación demasiado estricta rechaza casos reales y es peor que no validar: el usuario legítimo queda bloqueado sin saber por qué. Mejor un rango amplio que atrape los errores de magnitud.</li>
<li><b>El mensaje de error nombra la unidad esperada.</b> «Talla inválida» no ayuda; «¿la escribiste en metros?» resuelve el 90% de los casos sin que nadie pregunte.</li>
</ul>
<p><b>Nota sobre la cascada:</b> fíjate en que las condiciones son <code>&lt; 18.5</code>, <code>&lt; 25</code>, <code>&lt; 30</code> y no «entre 18.5 y 24.9». Aprovechar que cada rama arrastra la negación de las anteriores evita el hueco clásico: con «hasta 24.9» y «desde 25», un IMC de 24.95 no caería en ninguna categoría. Los rangos de la OMS escritos como 18.5–24.9 son una convención de redondeo para humanos; en código hay que usar los límites exactos y contiguos.</p>` }
      ],
      quiz: [
        { p: '¿Para qué sirven las cláusulas de guarda?',
          ops: ['Para hacer el código más rápido', 'Para descartar los casos inválidos al principio y reducir el anidamiento',
            'Para validar la sintaxis', 'Para reemplazar los bucles'],
          ok: 1, exp: 'Se invierte cada condición y se sale de inmediato, dejando el camino correcto al final con un solo nivel de indentación y un invariante claro.' },
        { p: '<code>Segun</code> <b>no</b> sirve para…',
          ops: ['comparar contra valores exactos', 'agrupar varios valores en un mismo caso',
            'evaluar rangos como «mayor que 15»', 'tener un caso por defecto'],
          ok: 2, exp: 'Segun compara contra valores exactos. Para rangos se necesita una cascada de Si, ordenada de la condición más restrictiva a la más general.' },
        { p: '<code>Si esSocio = Verdadero Entonces</code> debería escribirse…',
          ops: ['igual, está bien', '<code>Si esSocio Entonces</code>', '<code>Si esSocio == Verdadero</code>', '<code>Si NO esSocio Entonces</code>'],
          ok: 1, exp: 'Un booleano ya es la condición; compararlo con Verdadero es redundante. Y si el nombre es una pregunta, la versión corta se lee como una frase.' }
      ]
    },

    {
      id: 'm3-4',
      titulo: 'Bucles en pseudocódigo',
      resumen: 'Mientras, Repetir y Para escritos, con los patrones de contador, acumulador y bandera.',
      objetivos: [
        'Escribir los tres bucles con su sintaxis exacta',
        'Aplicar los patrones de contador, acumulador y bandera',
        'Usar bucles anidados con la inicialización en el lugar correcto'
      ],
      lectura: `
<h2>La sintaxis de los tres bucles</h2>
${cod('pseudo', `// MIENTRAS: 0 o más vueltas, condición al inicio
Mientras condicion Hacer
	acciones
FinMientras

// REPETIR: 1 o más vueltas, condición de SALIDA al final
Repetir
	acciones
Hasta Que condicion

// PARA: número conocido de vueltas
Para variable <- inicio Hasta fin Con Paso incremento Hacer
	acciones
FinPara`)}

<p>El <code>Con Paso</code> es opcional y por defecto vale 1. Puede ser negativo para contar hacia atrás, y entonces la
condición implícita se invierte:</p>

${cod('pseudo', `Para i <- 10 Hasta 1 Con Paso -1 Hacer     // cuenta atrás: 10, 9, 8…1
	Escribir i
FinPara

Para i <- 0 Hasta 100 Con Paso 5 Hacer     // de 5 en 5: 0, 5, 10…100
	Escribir i
FinPara`)}

<h2>Los cuatro patrones que resuelven casi todo</h2>

<h3>1. Contador</h3>
<p>Cuenta cuántas veces ocurre algo. Se inicializa en 0 y se incrementa en 1 cuando se cumple una condición.</p>
${cod('pseudo', `aprobados <- 0                            // inicializar SIEMPRE
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si notas[i] >= 11 Entonces
		aprobados <- aprobados + 1        // incremento de 1
	FinSi
FinPara`)}

<h3>2. Acumulador</h3>
<p>Suma (o multiplica) valores. Se inicializa en el <strong>elemento neutro</strong>: 0 para sumar, 1 para multiplicar.</p>
${cod('pseudo', `suma <- 0                                 // neutro de la suma
producto <- 1                             // neutro del producto
Para i <- 1 Hasta n Con Paso 1 Hacer
	suma <- suma + valores[i]
	producto <- producto * valores[i]
FinPara`)}

${nota('El error de inicialización',
  '<p>Inicializar un acumulador de productos en 0 hace que el resultado sea 0 siempre, porque cualquier cosa ' +
  'multiplicada por 0 es 0. Inicializar un acumulador de sumas en 1 deja el total desviado en 1. ' +
  'El valor inicial no es arbitrario: es el elemento neutro de la operación.</p>', 'warn')}

<h3>3. Bandera (centinela lógico)</h3>
<p>Recuerda si algo ocurrió alguna vez durante el recorrido.</p>
${cod('pseudo', `encontrado <- Falso                       // suponemos que no, hasta probar lo contrario
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si datos[i] = buscado Entonces
		encontrado <- Verdadero
		posicion <- i
	FinSi
FinPara
Si encontrado Entonces
	Escribir "Está en la posición ", posicion
Sino
	Escribir "No está"
FinSi`)}

<h3>4. Extremo (máximo o mínimo)</h3>
<p>Guarda un candidato y lo reemplaza cuando encuentra algo mejor. La inicialización correcta es
<strong>el primer elemento</strong>, no 0 ni un número gigante.</p>
${cod('pseudo', `mayor <- datos[1]                         // el primer elemento, NO 0
posicionMayor <- 1
Para i <- 2 Hasta n Con Paso 1 Hacer      // empieza en 2: el 1 ya es el candidato
	Si datos[i] > mayor Entonces
		mayor <- datos[i]
		posicionMayor <- i
	FinSi
FinPara`)}

<p>¿Por qué no inicializar <code>mayor ← 0</code>? Porque si todos los datos son negativos, el resultado sería 0, que no
está en el arreglo. Inicializar con un número «muy grande negativo» funciona pero es frágil (¿cuánto es suficientemente
grande?) y requiere conocer el tipo. El primer elemento es siempre correcto, y además es la inicialización que hace
verdadero el invariante desde el principio, como viste en el módulo 2.</p>

<h2>Combinar patrones</h2>
<p>Un problema real usa varios a la vez. Este algoritmo usa contador, acumulador y extremo en un solo recorrido:</p>

${cod('pseudo', `Algoritmo EstadisticasDeNotas
	Definir i, n, aprobados Como Entero
	Definir nota, suma, promedio, mayor, menor Como Real
	Leer n

	suma <- 0
	aprobados <- 0
	Para i <- 1 Hasta n Con Paso 1 Hacer
		Escribir "Nota ", i, ":"
		Leer nota
		suma <- suma + nota                      // acumulador
		Si nota >= 11 Entonces
			aprobados <- aprobados + 1           // contador
		FinSi
		Si i = 1 Entonces                        // extremos: el primero inicializa
			mayor <- nota
			menor <- nota
		Sino
			Si nota > mayor Entonces  mayor <- nota  FinSi
			Si nota < menor Entonces  menor <- nota  FinSi
		FinSi
	FinPara

	Si n > 0 Entonces
		promedio <- suma / n
		Escribir "Promedio: ", promedio
		Escribir "Mayor: ", mayor, " · Menor: ", menor
		Escribir "Aprobados: ", aprobados, " de ", n
	Sino
		Escribir "No se ingresaron notas"
	FinSi
FinAlgoritmo`)}

<p>Observa el truco de los extremos: como los datos se leen dentro del bucle y no están en un arreglo, no se puede
inicializar con <code>datos[1]</code> antes de empezar. La solución es <code>Si i = 1</code>: en la primera vuelta el
valor leído inicializa ambos extremos. Es el patrón habitual cuando los datos llegan uno a uno.</p>

<h2>Una sola pasada o varias</h2>
<p>Ese algoritmo calcula cinco cosas en <strong>un solo recorrido</strong>. Podría haber hecho cinco bucles separados, uno
por estadística: sería más legible y cinco veces más lento. Para 20 notas no importa; para 20 millones de registros leídos
de disco, sí. La decisión correcta depende del contexto, y lo importante es que sea una decisión y no un accidente.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Los tres bucles',
          enunciado: 'Escribe el mismo problema (mostrar los múltiplos de 3 entre 1 y 30) con <code>Para</code>, con <code>Mientras</code> y con <code>Repetir</code>. Compara cuál queda más claro.',
          pista: 'Puedes recorrer de 1 a 30 y filtrar con MOD, o ir directamente de 3 en 3.',
          lab: 'Algoritmo MultiplosDeTres\n\tDefinir i Como Entero\n\tEscribir "Con Para (de 3 en 3):"\n\tPara i <- 3 Hasta 30 Con Paso 3 Hacer\n\t\tEscribir Sin Saltar i, " "\n\tFinPara\n\tEscribir ""\n\n\tEscribir "Con Mientras (filtrando):"\n\ti <- 1\n\tMientras i <= 30 Hacer\n\t\tSi i MOD 3 = 0 Entonces\n\t\t\tEscribir Sin Saltar i, " "\n\t\tFinSi\n\t\ti <- i + 1\n\tFinMientras\n\tEscribir ""\n\n\tEscribir "Con Repetir:"\n\ti <- 3\n\tRepetir\n\t\tEscribir Sin Saltar i, " "\n\t\ti <- i + 3\n\tHasta Que i > 30\n\tEscribir ""\nFinAlgoritmo',
          solucion: `${cod('pseudo', `// Con Para, saltando de 3 en 3: la más clara y la más eficiente
Para i <- 3 Hasta 30 Con Paso 3 Hacer
	Escribir i
FinPara

// Con Mientras, filtrando: hace 30 vueltas en lugar de 10
i <- 1
Mientras i <= 30 Hacer
	Si i MOD 3 = 0 Entonces
		Escribir i
	FinSi
	i <- i + 1
FinMientras

// Con Repetir
i <- 3
Repetir
	Escribir i
	i <- i + 3
Hasta Que i > 30`)}
<p><b>La más clara es el <code>Para</code> con paso 3</b>: expresa directamente la intención («de tres en tres») en lugar de generar todos los números y descartar dos de cada tres. Hace 10 vueltas en lugar de 30, y no necesita condición interna.</p>
<p>La versión con <code>Mientras</code> y <code>MOD</code> es la que escribe casi todo el mundo, y no está mal, pero ilustra algo útil: <b>a menudo se puede cambiar «generar y filtrar» por «generar solo lo que sirve»</b>. Esa transformación aparece constantemente al optimizar.</p>` },
        { n: 2, titulo: 'Combina los patrones',
          enunciado: 'Escribe un algoritmo que lea 10 números y muestre: cuántos son positivos, cuántos negativos, cuántos ceros, la suma de los positivos, el producto de los no nulos y el mayor de todos.',
          pista: 'Tres contadores, un acumulador de suma, un acumulador de producto y un extremo. Todos en el mismo bucle.',
          lab: 'Algoritmo EstadisticasCompletas\n\tDefinir i, positivos, negativos, ceros Como Entero\n\tDefinir n, sumaPos, producto, mayor Como Real\n\tpositivos <- 0\n\tnegativos <- 0\n\tceros <- 0\n\tsumaPos <- 0\n\tproducto <- 1\n\n\tPara i <- 1 Hasta 10 Con Paso 1 Hacer\n\t\tEscribir "Número ", i, ":"\n\t\tLeer n\n\t\tSi n > 0 Entonces\n\t\t\tpositivos <- positivos + 1\n\t\t\tsumaPos <- sumaPos + n\n\t\tFinSi\n\t\tSi n < 0 Entonces\n\t\t\tnegativos <- negativos + 1\n\t\tFinSi\n\t\tSi n = 0 Entonces\n\t\t\tceros <- ceros + 1\n\t\tSino\n\t\t\tproducto <- producto * n\n\t\tFinSi\n\t\tSi i = 1 Entonces\n\t\t\tmayor <- n\n\t\tSino\n\t\t\tSi n > mayor Entonces\n\t\t\t\tmayor <- n\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\n\tEscribir "Positivos: ", positivos\n\tEscribir "Negativos: ", negativos\n\tEscribir "Ceros: ", ceros\n\tEscribir "Suma de positivos: ", sumaPos\n\tEscribir "Producto de no nulos: ", producto\n\tEscribir "Mayor: ", mayor\nFinAlgoritmo',
          labEntradas: '5\n-3\n0\n8\n-1\n2\n0\n7\n-4\n6',
          solucion: `${cod('pseudo', `Algoritmo EstadisticasCompletas
	Definir i, positivos, negativos, ceros Como Entero
	Definir n, sumaPos, producto, mayor Como Real
	positivos <- 0      // contadores en 0
	negativos <- 0
	ceros     <- 0
	sumaPos   <- 0      // acumulador de suma: neutro 0
	producto  <- 1      // acumulador de producto: neutro 1

	Para i <- 1 Hasta 10 Con Paso 1 Hacer
		Leer n
		Si n > 0 Entonces
			positivos <- positivos + 1
			sumaPos <- sumaPos + n
		FinSi
		Si n < 0 Entonces  negativos <- negativos + 1  FinSi
		Si n = 0 Entonces
			ceros <- ceros + 1
		Sino
			producto <- producto * n     // los ceros se excluyen del producto
		FinSi
		Si i = 1 Entonces
			mayor <- n
		Sino
			Si n > mayor Entonces  mayor <- n  FinSi
		FinSi
	FinPara
	// … mostrar resultados
FinAlgoritmo`)}
<p>Dos detalles que distinguen una solución correcta de una casi correcta:</p>
<ul>
<li><b>El producto excluye los ceros</b> mediante el <code>Sino</code> del <code>Si n = 0</code>. Si no, el producto sería 0 en cuanto apareciera un cero, y el enunciado pedía «producto de los no nulos».</li>
<li><b><code>mayor</code> se inicializa con el primer dato leído</b>, no con 0. Con los datos de ejemplo (que incluyen negativos) inicializar en 0 funcionaría por casualidad, pero si todos fueran negativos daría 0, un valor que no está entre los datos.</li>
</ul>` },
        { n: 3, titulo: 'Validación robusta con bucle',
          enunciado: 'Escribe un subproceso que pida un número entre dos límites y no acepte otra cosa, mostrando un mensaje distinto según si el valor es demasiado bajo o demasiado alto. Úsalo para pedir una edad entre 0 y 120 y un mes entre 1 y 12.',
          pista: 'Repetir…Hasta Que con la condición de validez, y un Si dentro para el mensaje específico.',
          lab: 'Funcion v <- pedirEntre(etiqueta, minimo, maximo)\n\tRepetir\n\t\tEscribir etiqueta, " (", minimo, " a ", maximo, "):"\n\t\tLeer v\n\t\tSi v < minimo Entonces\n\t\t\tEscribir "  Demasiado bajo. El mínimo es ", minimo\n\t\tFinSi\n\t\tSi v > maximo Entonces\n\t\t\tEscribir "  Demasiado alto. El máximo es ", maximo\n\t\tFinSi\n\tHasta Que v >= minimo Y v <= maximo\nFinFuncion\n\nAlgoritmo PruebaValidacion\n\tDefinir edad, mes Como Entero\n\tedad <- pedirEntre("Tu edad", 0, 120)\n\tmes <- pedirEntre("Mes de nacimiento", 1, 12)\n\tEscribir "Registrado: ", edad, " años, mes ", mes\nFinAlgoritmo',
          labEntradas: '200\n-5\n34\n13\n7',
          solucion: `${cod('pseudo', `Funcion v <- pedirEntre(etiqueta, minimo, maximo)
	Repetir
		Escribir etiqueta, " (", minimo, " a ", maximo, "):"
		Leer v
		Si v < minimo Entonces
			Escribir "  Demasiado bajo. El mínimo es ", minimo
		FinSi
		Si v > maximo Entonces
			Escribir "  Demasiado alto. El máximo es ", maximo
		FinSi
	Hasta Que v >= minimo Y v <= maximo
FinFuncion`)}
<p><b>Por qué <code>Repetir</code> y no <code>Mientras</code>:</b> hay que pedir el dato antes de poder validarlo. Con <code>Mientras</code> habría que duplicar el <code>Leer</code> (uno antes del bucle y otro dentro), que es la lectura adelantada; aquí no hace falta y el código queda más limpio.</p>
<p><b>Por qué parametrizar los límites:</b> el mismo subproceso sirve para edades, meses, notas, cantidades y cualquier rango futuro. Escribir un bucle de validación por cada dato es la clase de repetición que garantiza que uno de ellos tendrá un error distinto a los demás.</p>
<p><b>Por qué mensajes distintos:</b> «valor inválido» obliga al usuario a adivinar qué falló. Decirle si se pasó por arriba o por abajo, y cuál es el límite, elimina el segundo intento fallido. Los mensajes de error son parte de la interfaz, no un detalle.</p>
<p><b>Mejora adicional:</b> en un sistema real conviene un tope de intentos para no atrapar al usuario en un bucle infinito si está confundido, y para que un script automatizado no se quede colgado. Tres intentos y un mensaje de ayuda más explícito es un patrón habitual.</p>` },
        { n: 4, titulo: 'Números primos',
          enunciado: 'Escribe un algoritmo que determine si un número es primo, y luego otro que muestre todos los primos hasta n. Explica por qué basta comprobar divisores hasta la raíz cuadrada.',
          pista: 'Un primo solo es divisible entre 1 y sí mismo. Usa una bandera y sal del bucle en cuanto encuentres un divisor.',
          lab: 'Funcion esP <- esPrimo(n)\n\tDefinir d Como Entero\n\tSi n < 2 Entonces\n\t\tesP <- Falso\n\tSino\n\t\tesP <- Verdadero\n\t\td <- 2\n\t\tMientras d * d <= n Y esP Hacer\n\t\t\tSi n MOD d = 0 Entonces\n\t\t\t\tesP <- Falso\n\t\t\tSino\n\t\t\t\td <- d + 1\n\t\t\tFinSi\n\t\tFinMientras\n\tFinSi\nFinFuncion\n\nAlgoritmo PrimosHastaN\n\tDefinir n, i, cuantos Como Entero\n\tEscribir "Mostrar los primos hasta:"\n\tLeer n\n\tcuantos <- 0\n\tPara i <- 2 Hasta n Con Paso 1 Hacer\n\t\tSi esPrimo(i) Entonces\n\t\t\tEscribir Sin Saltar i, " "\n\t\t\tcuantos <- cuantos + 1\n\t\tFinSi\n\tFinPara\n\tEscribir ""\n\tEscribir "Hay ", cuantos, " primos hasta ", n\nFinAlgoritmo',
          labEntradas: '50',
          solucion: `${cod('pseudo', `Funcion esP <- esPrimo(n)
	Definir d Como Entero
	Si n < 2 Entonces
		esP <- Falso              // 0, 1 y los negativos no son primos
	Sino
		esP <- Verdadero          // bandera optimista
		d <- 2
		Mientras d * d <= n Y esP Hacer
			Si n MOD d = 0 Entonces
				esP <- Falso      // encontramos un divisor: no es primo
			Sino
				d <- d + 1
			FinSi
		FinMientras
	FinSi
FinFuncion`)}
<p><b>Por qué basta hasta la raíz cuadrada:</b> si <code>n = a × b</code> con ambos factores mayores que <code>raiz(n)</code>, entonces <code>a × b &gt; raiz(n) × raiz(n) = n</code>, lo que es imposible. Por lo tanto, <b>si n tiene algún divisor, al menos uno de sus factores es menor o igual que la raíz de n</b>. Comprobar más allá es trabajo garantizado inútil.</p>
<p>El ahorro es enorme: para n = 1 000 000, en lugar de probar casi un millón de divisores se prueban 1000. Mil veces menos trabajo por una observación de dos líneas de álgebra.</p>
<p><b>Detalles de implementación:</b></p>
<ul>
<li><code>d * d &lt;= n</code> es preferible a <code>d &lt;= raiz(n)</code>: evita calcular una raíz cuadrada en cada vuelta y no tiene problemas de redondeo en el límite exacto (por ejemplo con n = 49).</li>
<li><code>Y esP</code> en la condición hace de <code>break</code> estructurado: en cuanto se encuentra un divisor, el bucle termina sin seguir buscando.</li>
<li>El caso <code>n &lt; 2</code> hay que tratarlo aparte: sin él, el 1 se reportaría como primo porque el bucle no entra nunca.</li>
</ul>
<p><b>Mejora conocida:</b> tras descartar el 2, solo hace falta probar divisores impares, lo que reduce el trabajo a la mitad. Y para generar <i>todos</i> los primos hasta n existe la <b>criba de Eratóstenes</b>, que es muchísimo más rápida que comprobar cada número por separado: la verás en el módulo 7.</p>` },
        { n: 5, titulo: 'Serie de Fibonacci y la razón dorada',
          enunciado: 'Escribe un algoritmo que muestre los primeros n términos de Fibonacci (1, 1, 2, 3, 5, 8…) y, junto a cada término desde el tercero, el cociente con el anterior. Observa a qué valor converge y explica por qué la versión iterativa es preferible a la recursiva aquí.',
          pista: 'Necesitas recordar solo los dos términos anteriores, no toda la serie.',
          lab: 'Algoritmo Fibonacci\n\tDefinir i, n Como Entero\n\tDefinir anterior, actual, siguiente, cociente Como Real\n\tEscribir "¿Cuántos términos?"\n\tLeer n\n\tanterior <- 1\n\tactual <- 1\n\tSi n >= 1 Entonces\n\t\tEscribir "1: 1"\n\tFinSi\n\tSi n >= 2 Entonces\n\t\tEscribir "2: 1"\n\tFinSi\n\tPara i <- 3 Hasta n Con Paso 1 Hacer\n\t\tsiguiente <- anterior + actual\n\t\tcociente <- siguiente / actual\n\t\tEscribir i, ": ", siguiente, "   cociente = ", cociente\n\t\tanterior <- actual\n\t\tactual <- siguiente\n\tFinPara\nFinAlgoritmo',
          labEntradas: '20',
          solucion: `${cod('pseudo', `Algoritmo Fibonacci
	Definir i, n Como Entero
	Definir anterior, actual, siguiente, cociente Como Real
	Leer n
	anterior <- 1
	actual <- 1
	Si n >= 1 Entonces  Escribir "1: 1"  FinSi
	Si n >= 2 Entonces  Escribir "2: 1"  FinSi
	Para i <- 3 Hasta n Con Paso 1 Hacer
		siguiente <- anterior + actual
		cociente <- siguiente / actual
		Escribir i, ": ", siguiente, "  cociente = ", cociente
		anterior <- actual          // ¡el orden de estas dos líneas importa!
		actual <- siguiente
	FinPara
FinAlgoritmo`)}
<p><b>El cociente converge a 1,6180339887…</b>, la <b>razón dorada</b> φ = (1+√5)/2. A partir del término 15 ya coinciden 8 decimales. Es un resultado matemático precioso que se obtiene gratis con tres variables.</p>
<p><b>El detalle crítico — el orden del desplazamiento:</b> hay que actualizar <code>anterior</code> antes que <code>actual</code>. Si se invierte, <code>anterior</code> recibiría el valor nuevo y la serie se rompería. Es el mismo problema de la rotación de tres valores del módulo 0, y la razón por la que allí se insistió en salvar primero el eslabón que se sobrescribe.</p>
<p><b>Por qué la versión iterativa es preferible:</b></p>
${tabla(['Versión', 'Operaciones para n = 40', 'Memoria'], [
  ['Iterativa (esta)', '40', '3 variables'],
  ['Recursiva ingenua', '≈ 331 millones', 'pila de 40 niveles'],
  ['Recursiva con memoria (memoización)', '40', 'arreglo de 40 + pila']
], 'La recursión ingenua de Fibonacci recalcula los mismos valores exponencialmente: fib(38) se calcula una vez para fib(40) y otra vez para fib(39), y así hacia abajo.')}
<p>La recursión ingenua es O(1,618ⁿ) porque reconstruye el mismo árbol de llamadas una y otra vez. Con n = 50 tardaría minutos; con n = 100, más que la edad del universo. La versión iterativa es O(n) y calcula fib(1000) al instante. Es el ejemplo canónico de que <b>una solución elegante no es necesariamente una solución eficiente</b>, y la motivación histórica de la programación dinámica, que verás en el módulo 7.</p>` }
      ],
      quiz: [
        { p: 'Un acumulador de productos debe inicializarse en…',
          ops: ['0', '1', 'el primer elemento', 'no hace falta inicializarlo'],
          ok: 1, exp: 'El 1 es el elemento neutro de la multiplicación. Con 0, el resultado sería 0 siempre.' },
        { p: 'Para buscar el máximo de un arreglo, <code>mayor</code> debe inicializarse con…',
          ops: ['0', 'el primer elemento del arreglo', '−1', 'el número más grande posible'],
          ok: 1, exp: 'Con 0 fallaría si todos los elementos fueran negativos. El primer elemento siempre es un candidato válido y hace verdadero el invariante desde el inicio.' },
        { p: 'El patrón «bandera» sirve para…',
          ops: ['contar elementos', 'recordar si una condición se cumplió alguna vez durante el recorrido',
            'sumar valores', 'ordenar datos'],
          ok: 1, exp: 'Se inicializa en Falso y se pone en Verdadero al encontrar lo buscado. Permite decidir después del bucle qué hacer, con una sola salida.' }
      ]
    },

    {
      id: 'm3-5',
      titulo: 'Arreglos: colecciones de datos',
      resumen: 'Qué es un arreglo, cómo se recorre, matrices de dos dimensiones y las operaciones básicas.',
      objetivos: [
        'Declarar y usar arreglos de una y dos dimensiones',
        'Recorrer un arreglo para buscar, contar, sumar y modificar',
        'Evitar los errores de índice fuera de rango'
      ],
      lectura: `
<p>Hasta ahora cada dato necesitaba su variable. Eso funciona con tres notas y es imposible con trescientas. Un
<strong>arreglo</strong> (o <em>array</em>, vector, lista) es una colección de valores del mismo tipo que comparten un
nombre y se distinguen por un <strong>índice</strong>.</p>

${fig(`<svg viewBox="0 0 560 120" width="560" height="120" role="img" aria-label="Representación de un arreglo con índices y valores">
<g color="var(--fg-soft)">
${[14, 11, 18, 9, 16, 13].map(function (v, i) {
  var x = 40 + i * 80;
  return '<rect x="' + x + '" y="34" width="72" height="46" rx="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>' +
    '<text x="' + (x + 36) + '" y="63" text-anchor="middle" font-size="16" font-weight="700" fill="var(--fg)">' + v + '</text>' +
    '<text x="' + (x + 36) + '" y="25" text-anchor="middle" font-size="11" fill="var(--fg-soft)">notas[' + (i + 1) + ']</text>';
}).join('')}
<text x="280" y="104" text-anchor="middle" font-size="11.5" fill="var(--fg-soft)">Un nombre, seis casillas contiguas en memoria, un índice para cada una</text>
</g></svg>`, 'Un arreglo de 6 notas. El acceso a cualquier casilla cuesta lo mismo: una multiplicación y una suma.')}

<h2>Declarar y usar</h2>
${cod('pseudo', `Dimension notas[6]            // reserva 6 casillas
notas[1] <- 14                // asignar
notas[2] <- 11
Escribir notas[1]             // leer

Dimension matriz[3,4]         // matriz de 3 filas por 4 columnas
matriz[2,3] <- 99`)}

<p><strong>El índice puede ser una expresión</strong>, y ahí está toda la potencia: <code>notas[i]</code>,
<code>notas[i+1]</code>, <code>notas[n−i]</code>. Eso permite recorrer el arreglo con un bucle en lugar de escribir una
línea por casilla.</p>

${nota('Desde 0 o desde 1',
  '<p>En este pseudocódigo (y en PSeInt) los arreglos empiezan en <strong>1</strong>. En C, Java, Python, JavaScript y ' +
  'casi todos los lenguajes reales empiezan en <strong>0</strong>, así que un arreglo de 6 elementos va de ' +
  '<code>a[0]</code> a <code>a[5]</code> y <code>a[6]</code> es un error. Esa diferencia de uno es la causa del error ' +
  '<em>off-by-one</em> más frecuente del mundo. Cuando traduzcas pseudocódigo a código real, revisa dos veces los ' +
  'límites de los bucles.</p>', 'warn')}

<p>¿Por qué empiezan en 0? Porque el índice es un <strong>desplazamiento</strong> desde el inicio: la dirección del
elemento <code>i</code> es <code>base + i × tamaño</code>. El primer elemento está a cero bytes del inicio. Es una
decisión que viene de C y del hardware, no un capricho.</p>

<h2>Los cuatro recorridos fundamentales</h2>

${cod('pseudo', `// 1. RECORRER para mostrar
Para i <- 1 Hasta n Con Paso 1 Hacer
	Escribir "Posición ", i, ": ", a[i]
FinPara

// 2. BUSCAR (búsqueda lineal con bandera)
encontrado <- Falso
pos <- 0
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si a[i] = buscado Y NO encontrado Entonces
		encontrado <- Verdadero
		pos <- i
	FinSi
FinPara

// 3. ACUMULAR y CONTAR
suma <- 0
cuantos <- 0
Para i <- 1 Hasta n Con Paso 1 Hacer
	suma <- suma + a[i]
	Si a[i] > 10 Entonces  cuantos <- cuantos + 1  FinSi
FinPara

// 4. MODIFICAR en el sitio
Para i <- 1 Hasta n Con Paso 1 Hacer
	a[i] <- a[i] * 1.1        // aumentar todo un 10%
FinPara`)}

<h2>Matrices: dos dimensiones</h2>
<p>Una matriz es un arreglo de arreglos: filas y columnas. Se recorre con dos bucles anidados, y el orden de los bucles
determina si recorres por filas o por columnas.</p>

${cod('pseudo', `// Recorrido por filas (el eficiente, como vimos en el módulo 1)
Para f <- 1 Hasta filas Con Paso 1 Hacer
	Para c <- 1 Hasta columnas Con Paso 1 Hacer
		Escribir Sin Saltar m[f,c], " "
	FinPara
	Escribir ""              // salto al terminar la fila
FinPara

// Suma de cada fila
Para f <- 1 Hasta filas Con Paso 1 Hacer
	sumaFila <- 0            // DENTRO del bucle de filas
	Para c <- 1 Hasta columnas Con Paso 1 Hacer
		sumaFila <- sumaFila + m[f,c]
	FinPara
	Escribir "Fila ", f, " suma ", sumaFila
FinPara`)}

<p>Casos especiales útiles en una matriz cuadrada:</p>
<ul>
  <li><strong>Diagonal principal:</strong> los elementos donde <code>f = c</code>.</li>
  <li><strong>Diagonal secundaria:</strong> donde <code>f + c = n + 1</code>.</li>
  <li><strong>Triángulo superior:</strong> donde <code>c &gt; f</code>.</li>
  <li><strong>Transpuesta:</strong> <code>t[c,f] ← m[f,c]</code>.</li>
</ul>

<h2>El error del índice fuera de rango</h2>
<p>Acceder a <code>a[0]</code> o <code>a[n+1]</code> en un arreglo de <code>n</code> casillas es un error. En lenguajes
con comprobación (Java, Python, C#) el programa se detiene con una excepción clara. En C y C++ <strong>no hay
comprobación</strong>: lees o escribes la memoria que esté al lado, el programa sigue con datos corruptos y el fallo
aparece lejos de su causa. Esa clase de error, el <em>desbordamiento de búfer</em>, es la vulnerabilidad de seguridad
más explotada de la historia del software.</p>

<p>Los tres casos a vigilar siempre:</p>
<ul>
  <li><strong>El límite del bucle:</strong> <code>Hasta n</code> y no <code>Hasta n+1</code>.</li>
  <li><strong>Acceder a <code>a[i+1]</code> dentro del bucle:</strong> entonces el bucle debe ir solo
  <code>Hasta n−1</code>, o te sales en la última vuelta.</li>
  <li><strong>El tamaño real frente al tamaño reservado:</strong> si reservaste 100 casillas y solo cargaste 37 datos,
  los recorridos van <code>Hasta 37</code>, no <code>Hasta 100</code>. Por eso siempre hace falta una variable que
  guarde cuántos elementos están realmente en uso.</li>
</ul>
      `,
      ejercicios: [
        { n: 1, titulo: 'Operaciones básicas',
          enunciado: 'Dado un arreglo de 8 números cargado con valores fijos, escribe el algoritmo que muestre: todos los elementos, su suma, su promedio, el mayor, el menor y cuántos son mayores que el promedio.',
          pista: 'Necesitas dos recorridos: uno para calcular el promedio y otro para contar los que lo superan.',
          lab: 'Algoritmo OperacionesArreglo\n\tDefinir i, n, sobrePromedio Como Entero\n\tDefinir suma, promedio, mayor, menor Como Real\n\tDimension a[8]\n\tn <- 8\n\ta[1] <- 14\n\ta[2] <- 7\n\ta[3] <- 23\n\ta[4] <- 9\n\ta[5] <- 31\n\ta[6] <- 12\n\ta[7] <- 5\n\ta[8] <- 18\n\n\tsuma <- 0\n\tmayor <- a[1]\n\tmenor <- a[1]\n\tEscribir "Elementos:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\t\tsuma <- suma + a[i]\n\t\tSi a[i] > mayor Entonces\n\t\t\tmayor <- a[i]\n\t\tFinSi\n\t\tSi a[i] < menor Entonces\n\t\t\tmenor <- a[i]\n\t\tFinSi\n\tFinPara\n\tEscribir ""\n\tpromedio <- suma / n\n\n\tsobrePromedio <- 0\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tSi a[i] > promedio Entonces\n\t\t\tsobrePromedio <- sobrePromedio + 1\n\t\tFinSi\n\tFinPara\n\n\tEscribir "Suma: ", suma\n\tEscribir "Promedio: ", promedio\n\tEscribir "Mayor: ", mayor\n\tEscribir "Menor: ", menor\n\tEscribir "Sobre el promedio: ", sobrePromedio\nFinAlgoritmo',
          solucion: `<p>La clave del ejercicio es que <b>hacen falta dos recorridos</b>: no se puede contar cuántos superan el promedio mientras se calcula el promedio, porque el promedio no se conoce hasta terminar. Es un caso en el que una sola pasada es imposible, y conviene reconocerlo.</p>
<p>Con los datos del laboratorio: suma 119, promedio 14.875, mayor 31, menor 5, y 3 elementos por encima del promedio (23, 31 y 18).</p>
<p>Nota que <code>mayor</code> y <code>menor</code> se inicializan ambos con <code>a[1]</code> antes del bucle, y el bucle recorre desde 1: comparar el primer elemento consigo mismo es inofensivo y evita tratar el caso especial.</p>` },
        { n: 2, titulo: 'Invertir un arreglo',
          enunciado: 'Invierte el orden de los elementos de un arreglo <b>en el sitio</b> (sin usar un segundo arreglo). ¿Hasta dónde debe llegar el bucle y por qué?',
          pista: 'Intercambia el primero con el último, el segundo con el penúltimo… ¿Cuándo hay que parar?',
          lab: 'Algoritmo InvertirArreglo\n\tDefinir i, n, t Como Entero\n\tDimension a[7]\n\tn <- 7\n\ta[1] <- 1\n\ta[2] <- 2\n\ta[3] <- 3\n\ta[4] <- 4\n\ta[5] <- 5\n\ta[6] <- 6\n\ta[7] <- 7\n\n\tEscribir "Antes:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\n\n\tPara i <- 1 Hasta trunc(n / 2) Con Paso 1 Hacer\n\t\tt <- a[i]\n\t\ta[i] <- a[n - i + 1]\n\t\ta[n - i + 1] <- t\n\tFinPara\n\n\tEscribir "Después:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Para i <- 1 Hasta trunc(n / 2) Con Paso 1 Hacer
	t <- a[i]
	a[i] <- a[n - i + 1]
	a[n - i + 1] <- t
FinPara`)}
<p><b>Hasta la mitad</b>, es decir <code>trunc(n/2)</code>. Y la razón es importante: si el bucle llegara hasta <code>n</code>, cada par se intercambiaría <b>dos veces</b> y el arreglo volvería a su estado original. Es un error que da un resultado «correcto» (el arreglo sin cambios) y por eso cuesta detectar.</p>
<p><b>El elemento central:</b> con n impar, el elemento del medio (<code>a[4]</code> con n = 7) se queda en su sitio y no necesita intercambio, lo que el <code>trunc</code> resuelve automáticamente. Con n par no hay elemento central y los n/2 pares se intercambian todos.</p>
${tabla(['#i', 'Intercambia', 'Arreglo tras el paso'], [
  ['1', 'a[1] ↔ a[7]', '7 2 3 4 5 6 1'], ['2', 'a[2] ↔ a[6]', '7 6 3 4 5 2 1'],
  ['3', 'a[3] ↔ a[5]', '7 6 5 4 3 2 1'], ['—', 'a[4] se queda', '7 6 5 4 3 2 1 ✔']
])}
<p><b>La expresión <code>n − i + 1</code></b> es la que da el elemento simétrico cuando los índices empiezan en 1. Si empezaran en 0 sería <code>n − 1 − i</code>. Equivocarse aquí es el <i>off-by-one</i> clásico de este ejercicio, y la forma de verificarlo es comprobar los extremos: con i = 1 debe dar n, y con i = n debe dar 1. ✔</p>` },
        { n: 3, titulo: 'Insertar y eliminar',
          enunciado: 'Escribe los algoritmos para: (a) insertar un valor en la posición p de un arreglo, desplazando los demás; (b) eliminar el elemento de la posición p, cerrando el hueco. Explica en qué dirección debe recorrerse cada uno y por qué.',
          pista: 'Para insertar hay que mover hacia atrás desde el final; para eliminar, hacia adelante desde p. Si lo haces al revés, sobrescribes datos.',
          lab: 'Algoritmo InsertarEliminar\n\tDefinir i, n, p, valor Como Entero\n\tDimension a[10]\n\tn <- 5\n\ta[1] <- 10\n\ta[2] <- 20\n\ta[3] <- 30\n\ta[4] <- 40\n\ta[5] <- 50\n\n\tEscribir "Original:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\n\n\tp <- 3\n\tvalor <- 99\n\tPara i <- n Hasta p Con Paso -1 Hacer\n\t\ta[i + 1] <- a[i]\n\tFinPara\n\ta[p] <- valor\n\tn <- n + 1\n\tEscribir "Tras insertar 99 en la posición 3:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\n\n\tp <- 1\n\tPara i <- p Hasta n - 1 Con Paso 1 Hacer\n\t\ta[i] <- a[i + 1]\n\tFinPara\n\tn <- n - 1\n\tEscribir "Tras eliminar la posición 1:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\nFinAlgoritmo',
          solucion: `<p><b>(a) Insertar en la posición p</b> — recorrido <b>hacia atrás</b>, desde el final:</p>
${cod('pseudo', `Para i <- n Hasta p Con Paso -1 Hacer
	a[i + 1] <- a[i]        // cada elemento se corre un lugar a la derecha
FinPara
a[p] <- valor
n <- n + 1`)}
<p><b>(b) Eliminar la posición p</b> — recorrido <b>hacia adelante</b>, desde p:</p>
${cod('pseudo', `Para i <- p Hasta n - 1 Con Paso 1 Hacer
	a[i] <- a[i + 1]        // cada elemento se corre un lugar a la izquierda
FinPara
n <- n - 1`)}
<p><b>Por qué las direcciones son opuestas:</b> la regla general es <b>mover los datos empezando por el lado hacia el que te alejas del destino</b>. Al insertar, los datos se mueven a la derecha, así que hay que empezar por el elemento más a la derecha: si empezaras por <code>a[p]</code>, al copiarlo en <code>a[p+1]</code> destruirías el valor que todavía no has movido. Al eliminar, los datos se mueven a la izquierda, así que se empieza por la izquierda.</p>
<p>Es el mismo razonamiento del intercambio de valores del módulo 0: cuando una copia destruye un dato que aún necesitas, hay que cambiar el orden.</p>
<p><b>El costo:</b> ambas operaciones son O(n) en el peor caso, porque pueden tener que mover todos los elementos. Insertar o eliminar al <i>final</i> es O(1). Esta asimetría es la razón de ser de las listas enlazadas, las pilas y las colas del módulo 6: cada estructura elige qué operaciones hace baratas.</p>
<p><b>Validaciones que faltan:</b> comprobar que <code>p</code> esté entre 1 y n+1 al insertar (y entre 1 y n al eliminar), y que <code>n &lt; MAX</code> antes de insertar para no desbordar el arreglo. Sin esto último, insertar en un arreglo lleno escribe fuera de los límites.</p>` },
        { n: 4, titulo: 'Matriz: filas, columnas y diagonales',
          enunciado: 'Dada una matriz cuadrada de 4×4 con valores, calcula y muestra: la suma de cada fila, la suma de cada columna, la suma de la diagonal principal, la suma de la diagonal secundaria, y determina si es simétrica.',
          pista: 'Diagonal principal: f = c. Secundaria: f + c = n + 1. Simétrica: m[f,c] = m[c,f] para todo par.',
          lab: 'Algoritmo AnalizarMatriz\n\tDefinir f, c, n Como Entero\n\tDefinir s, diagP, diagS Como Real\n\tDefinir simetrica Como Logico\n\tDimension m[4,4]\n\tn <- 4\n\tm[1,1] <- 1\n\tm[1,2] <- 2\n\tm[1,3] <- 3\n\tm[1,4] <- 4\n\tm[2,1] <- 2\n\tm[2,2] <- 5\n\tm[2,3] <- 6\n\tm[2,4] <- 7\n\tm[3,1] <- 3\n\tm[3,2] <- 6\n\tm[3,3] <- 8\n\tm[3,4] <- 9\n\tm[4,1] <- 4\n\tm[4,2] <- 7\n\tm[4,3] <- 9\n\tm[4,4] <- 10\n\n\tEscribir "Sumas por fila:"\n\tPara f <- 1 Hasta n Con Paso 1 Hacer\n\t\ts <- 0\n\t\tPara c <- 1 Hasta n Con Paso 1 Hacer\n\t\t\ts <- s + m[f,c]\n\t\tFinPara\n\t\tEscribir "  Fila ", f, ": ", s\n\tFinPara\n\n\tEscribir "Sumas por columna:"\n\tPara c <- 1 Hasta n Con Paso 1 Hacer\n\t\ts <- 0\n\t\tPara f <- 1 Hasta n Con Paso 1 Hacer\n\t\t\ts <- s + m[f,c]\n\t\tFinPara\n\t\tEscribir "  Columna ", c, ": ", s\n\tFinPara\n\n\tdiagP <- 0\n\tdiagS <- 0\n\tPara f <- 1 Hasta n Con Paso 1 Hacer\n\t\tdiagP <- diagP + m[f,f]\n\t\tdiagS <- diagS + m[f, n - f + 1]\n\tFinPara\n\tEscribir "Diagonal principal: ", diagP\n\tEscribir "Diagonal secundaria: ", diagS\n\n\tsimetrica <- Verdadero\n\tPara f <- 1 Hasta n Con Paso 1 Hacer\n\t\tPara c <- f + 1 Hasta n Con Paso 1 Hacer\n\t\t\tSi m[f,c] <> m[c,f] Entonces\n\t\t\t\tsimetrica <- Falso\n\t\t\tFinSi\n\t\tFinPara\n\tFinPara\n\tSi simetrica Entonces\n\t\tEscribir "La matriz ES simétrica"\n\tSino\n\t\tEscribir "La matriz NO es simétrica"\n\tFinSi\nFinAlgoritmo',
          solucion: `<p>Las cuatro ideas del ejercicio:</p>
<ul>
<li><b>Sumas por fila:</b> el acumulador se reinicia dentro del bucle de filas. Bucle externo f, interno c.</li>
<li><b>Sumas por columna:</b> exactamente el mismo código con los bucles <b>intercambiados</b>: externo c, interno f. Un ejemplo claro de que el orden de los bucles anidados cambia el significado, no solo el rendimiento.</li>
<li><b>Las dos diagonales en un solo bucle:</b> <code>m[f,f]</code> para la principal y <code>m[f, n−f+1]</code> para la secundaria. No hacen falta dos bucles anidados porque una diagonal tiene solo n elementos: para cada fila hay exactamente una columna que pertenece a la diagonal.</li>
<li><b>Simetría recorriendo solo el triángulo superior:</b> el bucle interno empieza en <code>f+1</code>. Comparar todos los pares contra todos haría cada comparación dos veces (<code>m[1,2]</code> con <code>m[2,1]</code> y luego <code>m[2,1]</code> con <code>m[1,2]</code>) y compararía la diagonal consigo misma, que es siempre igual. Aprovechar la simetría del propio problema reduce el trabajo a la mitad.</li>
</ul>
<p>La matriz del laboratorio <b>es</b> simétrica: compruébalo y luego cambia un valor fuera de la diagonal para ver cómo lo detecta.</p>` },
        { n: 5, titulo: 'Histograma de frecuencias',
          enunciado: 'Dadas 30 notas enteras de 0 a 20, construye un histograma: cuenta cuántas veces aparece cada nota y muéstralo con barras de asteriscos, indicando también la moda (la nota más frecuente). Usa un arreglo de frecuencias y explica por qué esta técnica es O(n) en lugar de O(n²).',
          pista: 'El valor del dato es el índice del arreglo de frecuencias. Es la idea clave.',
          lab: 'Algoritmo Histograma\n\tDefinir i, j, n, moda, maxFrec Como Entero\n\tDimension notas[30]\n\tDimension frec[21]\n\tn <- 30\n\n\t// datos de ejemplo\n\tnotas[1] <- 14\n\tnotas[2] <- 11\n\tnotas[3] <- 14\n\tnotas[4] <- 18\n\tnotas[5] <- 9\n\tnotas[6] <- 14\n\tnotas[7] <- 16\n\tnotas[8] <- 11\n\tnotas[9] <- 20\n\tnotas[10] <- 13\n\tnotas[11] <- 14\n\tnotas[12] <- 8\n\tnotas[13] <- 16\n\tnotas[14] <- 11\n\tnotas[15] <- 15\n\tnotas[16] <- 14\n\tnotas[17] <- 12\n\tnotas[18] <- 17\n\tnotas[19] <- 11\n\tnotas[20] <- 14\n\tnotas[21] <- 10\n\tnotas[22] <- 13\n\tnotas[23] <- 16\n\tnotas[24] <- 14\n\tnotas[25] <- 19\n\tnotas[26] <- 11\n\tnotas[27] <- 15\n\tnotas[28] <- 14\n\tnotas[29] <- 12\n\tnotas[30] <- 16\n\n\t// 1) inicializar el arreglo de frecuencias\n\tPara i <- 1 Hasta 21 Con Paso 1 Hacer\n\t\tfrec[i] <- 0\n\tFinPara\n\n\t// 2) una sola pasada: el valor es el indice\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tfrec[notas[i] + 1] <- frec[notas[i] + 1] + 1\n\tFinPara\n\n\t// 3) mostrar el histograma y buscar la moda\n\tmaxFrec <- 0\n\tmoda <- 0\n\tEscribir "Nota | Frecuencia"\n\tPara i <- 1 Hasta 21 Con Paso 1 Hacer\n\t\tSi frec[i] > 0 Entonces\n\t\t\tEscribir Sin Saltar "  ", i - 1, "  | "\n\t\t\tPara j <- 1 Hasta frec[i] Con Paso 1 Hacer\n\t\t\t\tEscribir Sin Saltar "*"\n\t\t\tFinPara\n\t\t\tEscribir " (", frec[i], ")"\n\t\tFinSi\n\t\tSi frec[i] > maxFrec Entonces\n\t\t\tmaxFrec <- frec[i]\n\t\t\tmoda <- i - 1\n\t\tFinSi\n\tFinPara\n\tEscribir "Moda: ", moda, " (aparece ", maxFrec, " veces)"\nFinAlgoritmo',
          solucion: `${cod('pseudo', `// La idea central: el VALOR del dato es el ÍNDICE del contador
Dimension frec[21]                      // una casilla por cada nota de 0 a 20

Para i <- 1 Hasta 21 Con Paso 1 Hacer   // inicializar en 0
	frec[i] <- 0
FinPara

Para i <- 1 Hasta n Con Paso 1 Hacer    // UNA sola pasada por los datos
	frec[notas[i] + 1] <- frec[notas[i] + 1] + 1
FinPara`)}
<p><b>El <code>+1</code> del índice</b> es porque las notas van de 0 a 20 y los índices de este pseudocódigo de 1 a 21: la nota 0 se cuenta en <code>frec[1]</code>. En un lenguaje con arreglos desde 0 el <code>+1</code> desaparece y el código queda más limpio, lo que explica por qué esa convención se impuso.</p>
<p><b>Por qué es O(n) y no O(n²):</b> la alternativa ingenua sería, para cada nota posible, recorrer todo el arreglo contando cuántas veces aparece: 21 × 30 = 630 comparaciones, y en general <code>k × n</code>. La técnica del arreglo de frecuencias recorre los datos <b>una sola vez</b> (30 operaciones) usando el valor como dirección: convierte una búsqueda en un acceso directo.</p>
<p>Esta idea, llamada <b>conteo por casillero</b> (<i>counting</i>), es muchísimo más general de lo que parece:</p>
<ul>
<li>Es la base del <b>counting sort</b> y el <b>radix sort</b>, que ordenan en O(n) sin comparar elementos (módulo 7).</li>
<li>Es la versión elemental de una <b>tabla hash</b>: usar una función del dato para calcular dónde guardarlo (módulo 6).</li>
<li>Se usa en procesamiento de imágenes (histogramas de color), compresión (frecuencia de símbolos para Huffman) y análisis de texto.</li>
</ul>
<p><b>Su limitación:</b> necesita un arreglo del tamaño del <b>rango</b> de valores, no de la cantidad de datos. Para notas de 0 a 20 es perfecto (21 casillas). Para contar frecuencias de sueldos entre 0 y 10 millones de céntimos, necesitarías 10 millones de casillas para quizá 50 datos: ahí la técnica correcta es un diccionario. Elegir la estructura según el rango y la densidad de los datos es exactamente el tipo de decisión que distingue a un programador con criterio.</p>
<p>Con los datos del laboratorio la moda es <b>14</b>, que aparece 7 veces.</p>` }
      ],
      quiz: [
        { p: 'En un arreglo de 10 elementos en C o Python, los índices válidos van de…',
          ops: ['1 a 10', '0 a 9', '0 a 10', '1 a 9'],
          ok: 1, exp: 'En casi todos los lenguajes reales los índices empiezan en 0, así que un arreglo de n elementos va de 0 a n−1. Acceder a a[10] es un error.' },
        { p: 'Para invertir un arreglo intercambiando elementos, el bucle debe llegar hasta…',
          ops: ['n', 'n−1', 'la mitad de n', 'n+1'],
          ok: 2, exp: 'Hasta la mitad. Si llegara hasta n, cada par se intercambiaría dos veces y el arreglo quedaría igual que al principio.' },
        { p: 'Si reservas un arreglo de 100 casillas pero solo cargas 37 datos, los recorridos deben ir…',
          ops: ['hasta 100 siempre', 'hasta 37, usando una variable que guarde cuántos elementos hay en uso',
            'hasta donde encuentre un 0', 'hasta 99'],
          ok: 1, exp: 'El tamaño reservado y el tamaño en uso son cosas distintas. Hace falta una variable que registre cuántas casillas contienen datos válidos.' }
      ]
    },

    {
      id: 'm3-6',
      titulo: 'Subprogramas: funciones y procedimientos',
      resumen: 'Cómo partir un programa, parámetros por valor y por referencia, ámbito y el valor de retorno.',
      objetivos: [
        'Escribir funciones y procedimientos con parámetros',
        'Distinguir el paso por valor del paso por referencia',
        'Diseñar subprogramas con una sola responsabilidad'
      ],
      lectura: `
<p>Un <strong>subprograma</strong> es un algoritmo con nombre que se puede invocar desde otro. Es la herramienta más
importante para manejar la complejidad, y la razón es simple: te permite <strong>olvidar</strong>. Una vez que
<code>raizCuadrada(x)</code> funciona, no vuelves a pensar en cómo calcula raíces; solo la usas.</p>

<h2>Función y procedimiento</h2>
${cod('pseudo', `// FUNCIÓN: devuelve un valor, se usa dentro de una expresión
Funcion area <- areaCirculo(radio)
	PI <- 3.14159265
	area <- PI * radio ^ 2
FinFuncion

// uso:
superficie <- areaCirculo(5) + areaCirculo(3)

// PROCEDIMIENTO: no devuelve nada, hace algo (imprimir, modificar)
SubProceso mostrarEncabezado(titulo)
	Escribir "========================="
	Escribir "   ", mayusculas(titulo)
	Escribir "========================="
FinSubProceso

// uso:
mostrarEncabezado("reporte de ventas")`)}

<p>La distinción tiene una consecuencia práctica: una función se usa <em>por su valor</em> y un procedimiento
<em>por su efecto</em>. Una función que además imprime cosas o modifica variables globales es confusa, porque hace dos
trabajos a la vez y no se puede reutilizar en un contexto donde no quieras esos efectos.</p>

<h2>Parámetros: la interfaz del subprograma</h2>
<p>Los <strong>parámetros</strong> son las variables que el subprograma declara recibir; los
<strong>argumentos</strong> son los valores concretos que le pasas al llamarlo. En
<code>areaCirculo(5)</code>, <code>radio</code> es el parámetro y <code>5</code> el argumento.</p>

<h3>Por valor</h3>
<p>Se pasa una <strong>copia</strong>. El subprograma puede modificar su parámetro y el original no se entera. Es el
comportamiento por defecto y el más seguro.</p>

${cod('pseudo', `SubProceso intentarCambiar(x)
	x <- 999
	Escribir "dentro: ", x        // 999
FinSubProceso

Algoritmo P
	Definir a Como Entero
	a <- 5
	intentarCambiar(a)
	Escribir "fuera: ", a         // 5 — no cambió
FinAlgoritmo`)}

<h3>Por referencia</h3>
<p>Se pasa la <strong>dirección</strong> de la variable original. El subprograma puede modificarla de verdad. Sirve para
devolver varios resultados, y hay que usarlo con cuidado porque hace que una llamada tenga efectos invisibles en el
punto de llamada.</p>

${cod('pseudo', `SubProceso intercambiar(x Por Referencia, y Por Referencia)
	Definir t Como Entero
	t <- x
	x <- y
	y <- t
FinSubProceso

Algoritmo P
	Definir a, b Como Entero
	a <- 3
	b <- 7
	intercambiar(a, b)
	Escribir a, " ", b            // 7 3 — sí cambiaron
FinAlgoritmo`)}

${tabla(['Aspecto', 'Por valor', 'Por referencia'], [
  ['Qué se pasa', 'una copia del valor', 'la dirección de la variable'],
  ['Modificar el parámetro', 'no afecta al original', 'modifica el original'],
  ['Costo', 'copiar el dato (caro si es grande)', 'copiar una dirección (siempre barato)'],
  ['Seguridad', 'alta: no hay efectos sorpresa', 'baja: la llamada puede cambiar tus variables'],
  ['Cuándo usarlo', 'por defecto, casi siempre', 'devolver varios valores, o datos muy grandes']
])}

<p>En los lenguajes reales la cosa es más matizada: Java y Python pasan <em>referencias por valor</em>, lo que significa
que no puedes reasignar el parámetro pero sí modificar el contenido de un objeto o lista que te pasaron. Es la causa de
mucha confusión, y lo verás en el módulo 5. Los arreglos, por su tamaño, casi siempre se pasan por referencia en
cualquier lenguaje.</p>

<h2>Ámbito de las variables</h2>
<p>Las variables declaradas dentro de un subprograma son <strong>locales</strong>: nacen al entrar y mueren al salir.
Dos subprogramas pueden tener variables con el mismo nombre sin interferirse, y ese aislamiento es lo que hace posible
escribir código sin tener que recordar todos los nombres usados en el resto del programa.</p>

${cod('pseudo', `SubProceso A()
	Definir i Como Entero          // esta i solo existe en A
	Para i <- 1 Hasta 3 Con Paso 1 Hacer
		Escribir "A: ", i
	FinPara
FinSubProceso

SubProceso B()
	Definir i Como Entero          // otra i, completamente distinta
	i <- 100
	Escribir "B: ", i
FinSubProceso`)}

<h2>Cómo diseñar un buen subprograma</h2>
<ol>
  <li><strong>Una sola responsabilidad.</strong> Si el nombre necesita un «y» (<code>calcularYMostrarTotal</code>), son
  dos subprogramas.</li>
  <li><strong>El nombre dice qué hace, no cómo.</strong> <code>ordenar(lista)</code>, no
  <code>burbujaConDosBuclesAnidados(lista)</code>: así puedes cambiar el algoritmo sin cambiar el nombre.</li>
  <li><strong>Pocos parámetros.</strong> Más de cuatro o cinco es señal de que faltan tipos agrupados. En lugar de
  <code>registrar(nombre, apellido, dni, direccion, telefono, correo)</code>, un parámetro <code>cliente</code>.</li>
  <li><strong>Sin efectos sorpresa.</strong> Una función que devuelve un valor no debería además modificar sus
  parámetros ni variables globales.</li>
  <li><strong>Corto.</strong> Si no cabe en una pantalla, probablemente hace más de una cosa.</li>
  <li><strong>Documenta las precondiciones.</strong> Qué supone sobre sus parámetros. El Ariane 5, de nuevo.</li>
</ol>

${nota('La prueba del nombre, otra vez',
  '<p>Si puedes describir exactamente qué hace un subprograma en una frase corta sin usar «y», está bien diseñado. ' +
  'Si la frase necesita conjunciones o condicionales, divídelo.</p>', 'key')}

<h2>La pila de llamadas</h2>
<p>Cada vez que se invoca un subprograma, el sistema apila un <strong>registro de activación</strong> con sus parámetros,
sus variables locales y la dirección a la que debe volver. Al terminar, ese registro se descarta y la ejecución retoma
donde estaba. Esa estructura se llama <strong>pila de llamadas</strong> (<em>call stack</em>) y explica tres cosas:</p>
<ul>
  <li>Por qué las variables locales desaparecen al salir: su espacio se libera.</li>
  <li>Por qué la recursión funciona: cada llamada tiene su propio juego de variables (módulo 7).</li>
  <li>Por qué existe el error <em>stack overflow</em>: la pila tiene un tamaño limitado, y una recursión sin caso base
  la llena.</li>
</ul>
<p>Cuando un programa falla, el <em>stack trace</em> que muestra el depurador es exactamente esa pila: la lista de quién
llamó a quién hasta llegar al punto del error. Aprender a leerla ahorra horas.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Función o procedimiento',
          enunciado: 'Decide si cada uno debería ser función o procedimiento y por qué: (a) calcular el IGV de un monto; (b) mostrar el menú principal; (c) validar un DNI; (d) guardar un registro en un archivo; (e) obtener el mayor de un arreglo; (f) ordenar un arreglo.',
          pista: '¿Produce un valor que el llamador va a usar, o realiza una acción?',
          solucion: `<p><b>(a) Función.</b> Devuelve un número que se va a usar en un cálculo: <code>igv ← calcularIGV(monto)</code>.</p>
<p><b>(b) Procedimiento.</b> Su propósito es el efecto (imprimir); no hay valor que devolver.</p>
<p><b>(c) Función</b> que devuelve un lógico: <code>Si esDNIValido(dni) Entonces</code>. Nombrarla como pregunta hace que la llamada se lea como una frase.</p>
<p><b>(d) Procedimiento</b>, aunque en código real suele devolver un indicador de éxito o lanzar una excepción si falla. Ignorar si una escritura funcionó es una fuente clásica de pérdida de datos.</p>
<p><b>(e) Función.</b> Devuelve el valor máximo. Si además necesitas la posición, la devuelves por referencia o agrupas ambos datos en un resultado compuesto.</p>
<p><b>(f) Las dos opciones son válidas y conviene saber la diferencia:</b> un procedimiento que ordena el arreglo recibido <i>en el sitio</i> (modificándolo por referencia), o una función que devuelve una <i>copia ordenada</i> y deja el original intacto. Python tiene exactamente las dos: <code>lista.sort()</code> (procedimiento, modifica) y <code>sorted(lista)</code> (función, devuelve copia). La segunda es más segura; la primera no gasta memoria extra.</p>` },
        { n: 2, titulo: 'Biblioteca de funciones',
          enunciado: 'Escribe cuatro funciones reutilizables y un programa que las use: <code>esPar(n)</code>, <code>maximo(a,b)</code>, <code>potencia(base,exp)</code> (sin usar el operador ^) y <code>factorial(n)</code>.',
          pista: 'potencia y factorial son acumuladores de producto, así que se inicializan en 1.',
          lab: 'Funcion r <- esPar(n)\n\tr <- (n MOD 2 = 0)\nFinFuncion\n\nFuncion r <- maximo(a, b)\n\tSi a > b Entonces\n\t\tr <- a\n\tSino\n\t\tr <- b\n\tFinSi\nFinFuncion\n\nFuncion r <- potencia(base, exp)\n\tDefinir i Como Entero\n\tr <- 1\n\tPara i <- 1 Hasta exp Con Paso 1 Hacer\n\t\tr <- r * base\n\tFinPara\nFinFuncion\n\nFuncion r <- factorial(n)\n\tDefinir i Como Entero\n\tr <- 1\n\tPara i <- 2 Hasta n Con Paso 1 Hacer\n\t\tr <- r * i\n\tFinPara\nFinFuncion\n\nAlgoritmo PruebaBiblioteca\n\tDefinir x Como Entero\n\tPara x <- 1 Hasta 6 Con Paso 1 Hacer\n\t\tEscribir x, ": par=", esPar(x), "  2^", x, "=", potencia(2, x), "  ", x, "!=", factorial(x)\n\tFinPara\n\tEscribir "maximo(13, 27) = ", maximo(13, 27)\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Funcion r <- esPar(n)
	r <- (n MOD 2 = 0)          // devolver la expresión directamente, sin Si
FinFuncion

Funcion r <- maximo(a, b)
	Si a > b Entonces  r <- a  Sino  r <- b  FinSi
FinFuncion

Funcion r <- potencia(base, exp)
	Definir i Como Entero
	r <- 1                      // neutro del producto
	Para i <- 1 Hasta exp Con Paso 1 Hacer
		r <- r * base
	FinPara
FinFuncion                      // con exp=0 el bucle no entra y devuelve 1 ✔

Funcion r <- factorial(n)
	Definir i Como Entero
	r <- 1
	Para i <- 2 Hasta n Con Paso 1 Hacer   // desde 2: multiplicar por 1 es inútil
		r <- r * i
	FinPara
FinFuncion                      // con n=0 o n=1 devuelve 1 ✔`)}
<p>Tres observaciones:</p>
<ul>
<li><b><code>esPar</code> devuelve la expresión directamente.</b> Escribir <code>Si n MOD 2 = 0 Entonces r ← Verdadero Sino r ← Falso FinSi</code> son cinco líneas para decir lo mismo que una. Cuando el resultado <i>es</i> el valor de una condición, asígnala.</li>
<li><b>Ambas funciones de producto manejan bien los casos límite</b> por la forma en que se inicializan: <code>potencia(x, 0)</code> da 1 y <code>factorial(0)</code> da 1, los dos matemáticamente correctos, sin necesidad de un caso especial.</li>
<li><b>Son funciones puras:</b> su resultado depende solo de los parámetros y no modifican nada externo. Eso las hace probables de forma trivial y reutilizables en cualquier contexto.</li>
</ul>` },
        { n: 3, titulo: 'Por valor contra por referencia',
          enunciado: 'Predice qué imprime este programa y explica cada línea. Luego modifícalo para que todos los cambios se vean fuera.<br><pre>SubProceso p1(x)\n    x ← x * 2\nFinSubProceso\n\nSubProceso p2(x Por Referencia)\n    x ← x * 2\nFinSubProceso\n\nAlgoritmo P\n    a ← 5\n    b ← 5\n    p1(a)\n    p2(b)\n    Escribir a, " ", b\nFinAlgoritmo</pre>',
          pista: 'p1 recibe una copia; p2 recibe la dirección.',
          solucion: `<p><b>Imprime <code>5 10</code>.</b></p>
<ul>
<li><code>p1(a)</code>: <code>x</code> es una <b>copia</b> de <code>a</code>. Se duplica a 10 dentro del subproceso, y al salir la copia se destruye. <code>a</code> sigue en 5.</li>
<li><code>p2(b)</code>: <code>x</code> es un <b>alias</b> de <code>b</code>. Duplicar <code>x</code> es duplicar <code>b</code>. Queda en 10.</li>
</ul>
<p><b>Para que ambos se vean fuera</b>, hay dos caminos, y la diferencia entre ellos es importante:</p>
${cod('pseudo', `// Opción A: ambos por referencia
SubProceso p1(x Por Referencia)
	x <- x * 2
FinSubProceso

// Opción B (preferible): funciones que devuelven el nuevo valor
Funcion r <- duplicar(x)
	r <- x * 2
FinFuncion

a <- duplicar(a)     // el cambio es explícito en el punto de llamada`)}
<p><b>Por qué la opción B es mejor</b> aunque sea más larga: en <code>p2(b)</code> no hay nada en la línea de llamada que indique que <code>b</code> va a cambiar. Hay que ir a leer la definición del subproceso para saberlo. En <code>a ← duplicar(a)</code>, la asignación hace visible el cambio justo donde ocurre. Eso se llama <b>transparencia en el punto de llamada</b>, y es la razón por la que muchos lenguajes modernos (Go, Rust, Swift) exigen marcar explícitamente los parámetros mutables, y por la que Java y Python simplemente no tienen paso por referencia de variables.</p>` },
        { n: 4, titulo: 'Refactoriza un programa monolítico',
          enunciado: 'Este programa calcula el sueldo neto en 25 líneas sin subprogramas. Divídelo en funciones con una sola responsabilidad cada una y escribe el programa principal resultante. Indica la firma y las precondiciones de cada función.<br><pre>Leer sueldoBruto, horasExtra, hijos\npagoExtra ← horasExtra * (sueldoBruto/240) * 1.25\nbruto ← sueldoBruto + pagoExtra\nafp ← bruto * 0.1\nsalud ← bruto * 0.09\nasigFamiliar ← 0\nSi hijos &gt; 0 Entonces asigFamiliar ← 102.5 FinSi\nneto ← bruto - afp - salud + asigFamiliar\nEscribir ...</pre>',
          pista: 'Cada cálculo con nombre propio es una función. Busca los conceptos del dominio.',
          solucion: `${cod('pseudo', `// ---- funciones de cálculo (puras, comprobables una por una) ----

Funcion pago <- pagoHorasExtra(sueldoBase, horas)
	// Pre: sueldoBase > 0, horas >= 0. Supone jornada mensual de 240 horas
	//      y recargo del 25% sobre la hora ordinaria.
	HORAS_MES <- 240
	RECARGO   <- 1.25
	pago <- horas * (sueldoBase / HORAS_MES) * RECARGO
FinFuncion

Funcion d <- descuentoAFP(bruto)
	// Pre: bruto > 0
	TASA_AFP <- 0.10
	d <- bruto * TASA_AFP
FinFuncion

Funcion d <- descuentoSalud(bruto)
	// Pre: bruto > 0
	TASA_SALUD <- 0.09
	d <- bruto * TASA_SALUD
FinFuncion

Funcion a <- asignacionFamiliar(hijos)
	// Pre: hijos >= 0. Monto fijo si tiene al menos un hijo.
	MONTO_ASIGNACION <- 102.5
	Si hijos > 0 Entonces  a <- MONTO_ASIGNACION  Sino  a <- 0  FinSi
FinFuncion

Funcion neto <- sueldoNeto(sueldoBase, horas, hijos)
	Definir bruto Como Real
	bruto <- sueldoBase + pagoHorasExtra(sueldoBase, horas)
	neto <- bruto - descuentoAFP(bruto) - descuentoSalud(bruto)
	        + asignacionFamiliar(hijos)
FinFuncion

// ---- programa principal: ahora se lee como el enunciado del problema ----
Algoritmo Planilla
	Definir sueldoBase, horas, neto Como Real
	Definir hijos Como Entero
	Leer sueldoBase
	Leer horas
	Leer hijos
	neto <- sueldoNeto(sueldoBase, horas, hijos)
	Escribir "Sueldo neto: S/ ", neto
FinAlgoritmo`)}
<p><b>Lo que se gana, concretamente:</b></p>
<ul>
<li><b>Cada tasa está en un solo lugar.</b> Si la AFP cambia a 11%, hay exactamente una línea que tocar, y su nombre dice qué es. En la versión monolítica habría que encontrar el <code>0.1</code> correcto entre varios decimales parecidos.</li>
<li><b>Se puede probar por partes.</b> <code>descuentoAFP(1000)</code> debe dar 100, y eso se verifica sin leer sueldos ni imprimir nada.</li>
<li><b>Las precondiciones están escritas.</b> El comentario de <code>pagoHorasExtra</code> documenta el supuesto de las 240 horas, que es una decisión de negocio invisible en el <code>240</code> suelto del original.</li>
<li><b>El programa principal se lee como el enunciado.</b> Quien lo lea entiende el proceso sin entender las fórmulas, y quien necesite una fórmula sabe exactamente dónde buscarla.</li>
</ul>
<p>Esta transformación se llama <b>extracción de método</b> y es la refactorización más frecuente en la práctica profesional. No cambia lo que hace el programa; cambia quién puede entenderlo y mantenerlo.</p>` },
        { n: 5, titulo: 'Devolver varios valores',
          enunciado: 'Necesitas una operación que, dado un arreglo, devuelva a la vez el máximo, el mínimo y el promedio. Propón tres formas de resolverlo en pseudocódigo, compáralas y di cuál usarías en cada lenguaje (C, Python, Java).',
          pista: 'Por referencia, con varias funciones separadas, o devolviendo algo compuesto.',
          solucion: `<p><b>Forma 1 — procedimiento con parámetros por referencia:</b></p>
${cod('pseudo', `SubProceso estadisticas(a, n, maxi Por Referencia, mini Por Referencia, prom Por Referencia)
	Definir i Como Entero
	Definir suma Como Real
	maxi <- a[1]
	mini <- a[1]
	suma <- 0
	Para i <- 1 Hasta n Con Paso 1 Hacer
		Si a[i] > maxi Entonces  maxi <- a[i]  FinSi
		Si a[i] < mini Entonces  mini <- a[i]  FinSi
		suma <- suma + a[i]
	FinPara
	prom <- suma / n
FinSubProceso`)}
<p>Ventaja: un solo recorrido. Desventaja: la llamada no revela qué se modifica, y hay que declarar tres variables antes de llamar.</p>
<p><b>Forma 2 — tres funciones independientes:</b></p>
${cod('pseudo', `maxi <- maximoDe(a, n)
mini <- minimoDe(a, n)
prom <- promedioDe(a, n)`)}
<p>Ventaja: cada función es pura, comprobable y reutilizable por separado; la llamada es clarísima. Desventaja: tres recorridos en lugar de uno, lo que importa solo si n es muy grande o los datos son costosos de leer.</p>
<p><b>Forma 3 — devolver un dato compuesto:</b></p>
${cod('pseudo', `Funcion r <- estadisticas(a, n)
	// r es un registro con tres campos
	r.maximo <- ...
	r.minimo <- ...
	r.promedio <- ...
FinFuncion

// uso:
e <- estadisticas(datos, 100)
Escribir e.maximo, e.minimo, e.promedio`)}
<p>Ventaja: un recorrido, función pura, llamada transparente, y el resultado tiene nombres. Desventaja: hay que definir el tipo compuesto.</p>
<p><b>Qué usar en cada lenguaje:</b></p>
${tabla(['Lenguaje', 'Forma idiomática', 'Cómo se escribe'], [
  ['C', 'Punteros de salida o un <code>struct</code>', '<code>void stats(int*a,int n,int*max,int*min,double*prom)</code> o devolver un <code>struct Stats</code>'],
  ['Python', 'Devolver una tupla (forma 3 nativa)', '<code>return maximo, minimo, promedio</code> y luego <code>mx, mn, pr = stats(datos)</code>'],
  ['Java', 'Un objeto o <code>record</code>', '<code>record Stats(double max, double min, double prom){}</code>'],
  ['JavaScript', 'Un objeto literal', '<code>return {max, min, prom}</code> y desestructurar al recibir'],
  ['Go', 'Valores de retorno múltiples', '<code>func stats(a []int) (int, int, float64)</code>']
], 'La forma 3 es la preferida en casi todos los lenguajes modernos: resultado nombrado, función pura y un solo recorrido.')}
<p><b>La recomendación:</b> empieza por la forma 2 (funciones separadas), que es la más simple y clara, y pasa a la forma 3 solo si mides que los recorridos múltiples son un problema real. Optimizar antes de medir es la causa más común de código complicado sin motivo. La forma 1 queda para C y para interfaces de sistema que la exigen.</p>` }
      ],
      quiz: [
        { p: 'La diferencia entre una función y un procedimiento es que…',
          ops: ['la función es más rápida', 'la función devuelve un valor y el procedimiento realiza una acción',
            'el procedimiento no admite parámetros', 'no hay diferencia'],
          ok: 1, exp: 'Una función se usa por su valor, dentro de una expresión; un procedimiento se usa por su efecto. Mezclar ambas cosas hace el código confuso.' },
        { p: 'Si pasas una variable <b>por valor</b> y el subprograma la modifica…',
          ops: ['la variable original cambia', 'solo cambia la copia local; el original no se entera',
            'da un error', 'depende del tipo de dato'],
          ok: 1, exp: 'Por valor se pasa una copia, que se destruye al salir. Por eso es el modo por defecto: no hay efectos sorpresa en el punto de llamada.' },
        { p: 'Un subprograma llamado <code>validarYGuardarCliente</code> probablemente…',
          ops: ['está bien diseñado', 'debería dividirse en dos, porque su nombre necesita un «y»',
            'es demasiado corto', 'necesita más parámetros'],
          ok: 1, exp: 'La «y» en el nombre delata dos responsabilidades. Separarlas permite validar sin guardar, probar cada parte y reutilizar la validación en otro contexto.' }
      ]
    }
  ]
});

