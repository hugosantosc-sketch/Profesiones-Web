/* ===== MÓDULO 2 — Diagramas de flujo ===== */
CDC.registrar({
  id: 'm2',
  nivel: 'Básico',
  titulo: 'Diagramas de flujo',
  resumen: 'Los símbolos normalizados, las tres estructuras de control dibujadas, la prueba de escritorio y cómo diseñar antes de escribir.',
  intro: '<p>Un diagrama de flujo es el plano de tu algoritmo. Se dibuja antes de programar por la misma razón ' +
    'por la que un edificio se diseña antes de comprar el cemento: cambiar una línea en el papel cuesta segundos y ' +
    'cambiarla en 500 líneas de código cuesta horas. Vas a aprender la notación normalizada (ISO 5807) y, sobre todo, ' +
    'a <em>pensar</em> en estructuras.</p><p>Todos los diagramas de este módulo están generados por el propio ' +
    'laboratorio a partir del pseudocódigo, así que puedes reproducir cualquiera y modificarlo.</p>',
  temas: [

    {
      id: 'm2-1',
      titulo: 'Símbolos y reglas de la notación',
      resumen: 'Los seis símbolos que necesitas, las reglas de un diagrama bien formado y los errores de dibujo más comunes.',
      objetivos: [
        'Identificar y usar correctamente los símbolos de la norma ISO 5807',
        'Reconocer cuándo un diagrama está mal formado',
        'Dibujar un diagrama de flujo con un solo inicio y un solo fin'
      ],
      lectura: `
<p>La notación de los diagramas de flujo está normalizada desde 1970 (ANSI, luego ISO 5807). No es una convención
caprichosa: usar el símbolo correcto comunica <em>qué clase de paso</em> es cada cosa, y un diagrama bien dibujado se
entiende sin explicaciones.</p>

${fig(`<svg viewBox="0 0 580 300" width="580" height="300" role="img" aria-label="Los seis símbolos de un diagrama de flujo">
<g color="var(--fg-soft)">
<rect x="30" y="20" width="140" height="44" rx="22" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="100" y="47" text-anchor="middle" font-size="13" fill="var(--fg)">Inicio / Fin</text>
<text x="100" y="80" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">terminal · óvalo</text>

<path d="M244 20 H390 L376 64 H230 Z" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.6"/>
<text x="310" y="47" text-anchor="middle" font-size="13" fill="var(--fg)">Leer / Escribir</text>
<text x="310" y="80" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">entrada-salida · paralelogramo</text>

<rect x="430" y="20" width="130" height="44" rx="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="495" y="47" text-anchor="middle" font-size="13" fill="var(--fg)">x ← a + b</text>
<text x="495" y="80" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">proceso · rectángulo</text>

<path d="M100 110 L178 152 L100 194 L22 152 Z" fill="var(--surface)" stroke="var(--warm)" stroke-width="1.6"/>
<text x="100" y="157" text-anchor="middle" font-size="13" fill="var(--fg)">¿x &gt; 0?</text>
<text x="100" y="212" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">decisión · rombo</text>

<rect x="245" y="128" width="130" height="48" rx="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<line x1="258" y1="128" x2="258" y2="176" stroke="var(--accent)" stroke-width="1.6"/>
<line x1="362" y1="128" x2="362" y2="176" stroke="var(--accent)" stroke-width="1.6"/>
<text x="310" y="157" text-anchor="middle" font-size="12" fill="var(--fg)">calcularIGV()</text>
<text x="310" y="212" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">subproceso</text>

<circle cx="495" cy="152" r="17" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.6"/>
<text x="495" y="157" text-anchor="middle" font-size="12" fill="var(--fg)">A</text>
<text x="495" y="212" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">conector</text>

<path d="M60 250 H180" stroke="var(--fg-soft)" stroke-width="1.6" marker-end="url(#m2arr)"/>
<defs><marker id="m2arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
<text x="120" y="275" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">línea de flujo · siempre con punta</text>
<text x="400" y="258" text-anchor="middle" font-size="11.5" fill="var(--fg)">El símbolo comunica el tipo de paso.</text>
<text x="400" y="275" text-anchor="middle" font-size="11.5" fill="var(--fg)">Usar el equivocado es un error de notación.</text>
</g></svg>`, 'Los seis símbolos que cubren el 99% de los diagramas de flujo.')}

${tabla(['Símbolo', 'Nombre', 'Se usa para', 'Entradas / salidas'], [
  ['Óvalo', 'Terminal', 'Inicio y fin del algoritmo', 'Inicio: 0 entradas, 1 salida. Fin: 1 entrada, 0 salidas'],
  ['Paralelogramo', 'Entrada / salida', '<code>Leer</code> datos, <code>Escribir</code> resultados', '1 entrada, 1 salida'],
  ['Rectángulo', 'Proceso', 'Asignaciones y cálculos', '1 entrada, 1 salida'],
  ['Rombo', 'Decisión', 'Preguntas de sí o no', '1 entrada, <b>exactamente 2</b> salidas'],
  ['Rectángulo con barras', 'Subproceso', 'Llamada a otro algoritmo o función', '1 entrada, 1 salida'],
  ['Círculo pequeño', 'Conector', 'Unir partes separadas del dibujo', 'variable']
])}

<h2>Las reglas de un diagrama bien formado</h2>
<ol>
  <li><strong>Un solo Inicio y un solo Fin.</strong> Si tu diagrama tiene tres óvalos de «Fin», hay tres salidas y es
  mucho más difícil de razonar. Las ramas deben volver a juntarse.</li>
  <li><strong>El flujo va de arriba hacia abajo y de izquierda a derecha.</strong> Es la dirección de lectura; respetarla
  hace el diagrama legible sin seguir las flechas con el dedo.</li>
  <li><strong>Toda línea termina en una punta de flecha</strong> y conecta exactamente dos símbolos.</li>
  <li><strong>Del rombo salen siempre dos caminos, etiquetados</strong> con «Sí»/«No» o «V»/«F». Un rombo con una sola
  salida no es una decisión, y con tres no es un rombo.</li>
  <li><strong>Las líneas no se cruzan.</strong> Si se cruzan, usa conectores con letras o reordena el dibujo.</li>
  <li><strong>Dentro de cada símbolo va una sola acción</strong>, escrita de forma clara y breve.</li>
  <li><strong>Ningún símbolo queda aislado</strong> ni con el flujo «colgando» sin destino.</li>
</ol>

${nota('La regla más importante no está en la norma',
  '<p>Un diagrama de flujo sirve para <strong>pensar</strong> y para <strong>comunicar</strong>. Si tu diagrama es tan ' +
  'grande que no cabe en una hoja, el problema no es el diagrama: es que el algoritmo necesita descomponerse en ' +
  'subprocesos. Un diagrama gigante es un síntoma, no un logro.</p>', 'key')}

<h2>Un primer diagrama completo</h2>
<p>El algoritmo más simple que hace algo útil: pedir dos números y mostrar su suma.</p>

${diag(`Algoritmo Suma
	Definir a, b, total Como Real
	Leer a
	Leer b
	total <- a + b
	Escribir "La suma es ", total
FinAlgoritmo`, 'Secuencia pura: cada paso lleva al siguiente, sin decisiones ni repeticiones.')}

<p>Observa cómo cada tipo de paso usa su símbolo: los <code>Leer</code> y el <code>Escribir</code> son paralelogramos, la
asignación <code>total ← a + b</code> es un rectángulo, y los extremos son óvalos. Nada se repite, nada se decide: esto
es una <strong>secuencia</strong>.</p>

<h2>Diagrama de flujo, diagrama de actividades y pseudocódigo</h2>
<p>Para no confundirte cuando los encuentres en la industria:</p>
${tabla(['Herramienta', 'Qué describe', 'Cuándo conviene'], [
  ['Diagrama de flujo', 'El flujo de control de un algoritmo, paso a paso', 'Aprender, documentar lógica compleja, explicar a alguien que no programa'],
  ['Pseudocódigo', 'Lo mismo, en texto estructurado', 'Diseñar algo que vas a programar; es más rápido de escribir y de modificar'],
  ['Diagrama de actividades (UML)', 'Procesos con varios actores y concurrencia', 'Procesos de negocio, varios sistemas interactuando'],
  ['Diagrama de secuencia (UML)', 'Mensajes entre objetos a lo largo del tiempo', 'Diseño orientado a objetos (módulo 8)'],
  ['Diagrama N-S (Nassi-Shneiderman)', 'Estructuras anidadas en cajas, sin flechas', 'Forzar programación estructurada: no se puede dibujar un salto']
], 'En la práctica profesional se usa más el pseudocódigo que el diagrama de flujo, pero el diagrama es insuperable para aprender a ver las estructuras.')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Identifica el símbolo',
          enunciado: 'Di qué símbolo corresponde a cada paso: (a) «pedir la edad al usuario»; (b) «calcular el descuento»; (c) «¿es mayor de edad?»; (d) «mostrar el total»; (e) «llamar a validarDNI»; (f) «fin del programa».',
          pista: 'Pregúntate si el paso entra/saca datos, calcula, decide o delega.',
          solucion: `<p><b>(a)</b> Paralelogramo (entrada). <b>(b)</b> Rectángulo (proceso). <b>(c)</b> Rombo (decisión). <b>(d)</b> Paralelogramo (salida). <b>(e)</b> Rectángulo con barras laterales (subproceso). <b>(f)</b> Óvalo (terminal).</p>
<p>Error frecuente: usar un rectángulo para «pedir la edad». La distinción importa porque las entradas y salidas son los puntos donde el algoritmo toca el mundo exterior, y ahí es donde hay que validar.</p>` },
        { n: 2, titulo: 'Encuentra los errores de notación',
          enunciado: 'Un diagrama tiene: dos óvalos de «Fin», un rombo con tres flechas de salida, una flecha sin punta, un rectángulo que dice «leer nombre y validarlo y guardarlo» y dos líneas que se cruzan. Explica por qué cada cosa está mal y cómo se corrige.',
          pista: 'Repasa las siete reglas.',
          solucion: `<ol>
<li><b>Dos «Fin»:</b> viola la regla de un solo punto de salida. Las ramas deben confluir antes del óvalo final. Un diagrama con varias salidas es más difícil de verificar y se traduce a código con varios <code>return</code> dispersos.</li>
<li><b>Rombo con tres salidas:</b> una decisión responde sí o no. Para tres o más casos hay que encadenar rombos o usar la estructura de selección múltiple (<code>Segun</code>).</li>
<li><b>Flecha sin punta:</b> el flujo tiene dirección. Sin punta, el diagrama es ambiguo: no se sabe si el camino va o viene.</li>
<li><b>Rectángulo con tres acciones:</b> cada símbolo, una acción. Además «leer» es entrada (paralelogramo) y «validar» probablemente implica una decisión. Hay que separarlo en tres símbolos.</li>
<li><b>Líneas cruzadas:</b> se resuelve reordenando el dibujo o usando conectores etiquetados (A, B, C). Un cruce casi siempre indica que la estructura se puede reorganizar mejor.</li>
</ol>` },
        { n: 3, titulo: 'Dibuja una secuencia',
          enunciado: 'Dibuja (en papel o con el laboratorio) el diagrama de flujo de un algoritmo que lea la base y la altura de un triángulo, calcule el área y la muestre con un mensaje. Después escribe el pseudocódigo equivalente y genera el diagrama automáticamente para comparar con el tuyo.',
          pista: 'Son dos entradas, un proceso y una salida, entre dos terminales.',
          lab: 'Algoritmo AreaTriangulo\n\tDefinir base, altura, area Como Real\n\tEscribir "Base del triángulo:"\n\tLeer base\n\tEscribir "Altura del triángulo:"\n\tLeer altura\n\tarea <- (base * altura) / 2\n\tEscribir "El área es ", area\nFinAlgoritmo',
          labEntradas: '10\n6',
          solucion: `${diag(`Algoritmo AreaTriangulo
	Definir base, altura, area Como Real
	Leer base
	Leer altura
	area <- (base * altura) / 2
	Escribir "El área es ", area
FinAlgoritmo`, 'La estructura es idéntica a la del ejemplo de la suma: cambia solo la fórmula.')}
<p>Pulsa «Abrir en el laboratorio» para ejecutarlo con base 10 y altura 6 (debe dar 30) y generar el diagrama tú mismo.</p>
<p>Detalle de calidad: los <code>Escribir</code> antes de cada <code>Leer</code> no son decorativos. Un programa que pide datos sin decir qué pide es inutilizable, y en el diagrama se ven como paralelogramos de salida. Muchos cursos los omiten; no los omitas.</p>` },
        { n: 4, titulo: 'Del diagrama al significado',
          enunciado: 'Observa este diagrama generado y responde sin ejecutarlo: ¿qué hace? ¿Cuántas veces se muestra algo? ¿Qué pasa si el usuario escribe 0?' + diag(`Algoritmo Misterio
	Definir n, i, r Como Entero
	Leer n
	r <- 1
	Para i <- 1 Hasta n Con Paso 1 Hacer
		r <- r * i
	FinPara
	Escribir r
FinAlgoritmo`, 'Diagrama a interpretar.'),
          pista: 'Traza los valores de r e i con n = 4.',
          solucion: `<p>Calcula el <b>factorial</b> de n. Con n = 4: r pasa por 1, 1, 2, 6, 24.</p>
<p><b>Cuántas veces muestra algo:</b> una sola, al final. El <code>Escribir</code> está fuera del bucle.</p>
<p><b>Con n = 0:</b> el <code>Para</code> no entra ni una vez (porque 1 &gt; 0 desde el inicio), así que r conserva su valor inicial 1 y el programa muestra <b>1</b>. Y resulta que es matemáticamente correcto: 0! = 1. Es uno de esos casos felices en los que el caso límite sale bien por la forma en que se inicializó el acumulador, pero conviene <i>comprobarlo</i> y no suponerlo: si r se hubiera inicializado en 0, todos los factoriales darían 0.</p>
<p>Con n negativo tampoco entra al bucle y también muestra 1, que esta vez <b>no</b> es correcto: el factorial de un negativo no existe. Falta una validación de entrada.</p>` },
        { n: 5, titulo: 'Rediseña un diagrama gigante',
          enunciado: 'Un compañero te trae un diagrama de 60 símbolos en una sola columna que gestiona una venta: valida al cliente, calcula precios, aplica descuentos, calcula impuestos, registra la venta e imprime la boleta. Explica cómo lo reorganizarías con subprocesos, cuántos diagramas resultarían y qué beneficios concretos tiene.',
          pista: 'Agrupa los símbolos por responsabilidad y dale un nombre a cada grupo.',
          solucion: `<p><b>Reorganización:</b> un diagrama principal de unos 8 símbolos, donde cada bloque de responsabilidad es un subproceso, más un diagrama por subproceso:</p>
<pre>Principal:  Inicio → validarCliente() → cargarCarrito() → calcularTotales()
            → registrarVenta() → imprimirBoleta() → Fin

validarCliente():   ~10 símbolos
cargarCarrito():    ~12 símbolos
calcularTotales():  ~15 símbolos  (precios, descuentos, IGV)
registrarVenta():   ~10 símbolos
imprimirBoleta():   ~8 símbolos</pre>
<p><b>Resultado:</b> 6 diagramas de una hoja cada uno en lugar de uno ilegible.</p>
<p><b>Beneficios concretos:</b></p>
<ul>
<li><b>Se puede leer.</b> El diagrama principal se entiende en 20 segundos y cuenta la historia completa del proceso.</li>
<li><b>Se puede probar por partes.</b> Puedes verificar <code>calcularTotales()</code> con datos de prueba sin tocar el resto.</li>
<li><b>Se puede repartir el trabajo.</b> Dos personas pueden implementar dos subprocesos en paralelo si acuerdan qué recibe y qué devuelve cada uno.</li>
<li><b>Se puede reutilizar.</b> <code>validarCliente()</code> sirve igual para una devolución o una cotización.</li>
<li><b>Se puede cambiar sin miedo.</b> Si mañana el IGV cambia, sabes exactamente qué diagrama abrir.</li>
</ul>
<p>Esto no es una técnica de dibujo: es <b>descomposición funcional</b>, y es el mismo criterio con el que se parte un programa en funciones (módulo 3) y un sistema en módulos (módulo 8). El diagrama solo hace visible una decisión de diseño que de todos modos tendrías que tomar.</p>` }
      ],
      quiz: [
        { p: '¿Cuántas salidas tiene siempre un símbolo de decisión (rombo)?',
          ops: ['Una', 'Exactamente dos', 'Tres', 'Las que necesites'],
          ok: 1, exp: 'Un rombo responde una pregunta de sí o no, así que tiene exactamente dos salidas etiquetadas. Para más casos se encadenan rombos.' },
        { p: 'Para «Leer la edad del usuario» se usa…',
          ops: ['un rectángulo', 'un paralelogramo', 'un rombo', 'un óvalo'],
          ok: 1, exp: 'Las entradas y salidas de datos usan el paralelogramo. El rectángulo es para procesos y cálculos internos.' },
        { p: 'Un diagrama de flujo de 60 símbolos en una sola columna indica que…',
          ops: ['el algoritmo es muy bueno', 'hace falta descomponerlo en subprocesos',
            'hay que usar hojas más grandes', 'está bien si funciona'],
          ok: 1, exp: 'Un diagrama que no cabe en una hoja ya no comunica. La solución es agrupar responsabilidades en subprocesos con nombre.' }
      ]
    },

    {
      id: 'm2-2',
      titulo: 'Secuencia y decisión',
      resumen: 'El rombo en todas sus formas: simple, doble, anidada y múltiple, con los errores clásicos de cada una.',
      objetivos: [
        'Dibujar decisiones simples, dobles y anidadas correctamente',
        'Elegir entre decisiones anidadas y selección múltiple',
        'Evitar el error de condiciones solapadas o incompletas'
      ],
      lectura: `
<p>La <strong>secuencia</strong> no necesita más explicación: un paso tras otro. Lo interesante empieza cuando el camino
se bifurca.</p>

<h2>Decisión simple: hacer algo o no hacer nada</h2>
<p>Una rama tiene acciones y la otra está vacía. Fíjate en que el flujo «No» no desaparece: baja y se vuelve a unir.</p>

${diag(`Algoritmo Descuento
	Definir monto Como Real
	Leer monto
	Si monto > 100 Entonces
		monto <- monto * 0.9
	FinSi
	Escribir "A pagar: ", monto
FinAlgoritmo`, 'Decisión simple. Si la condición es falsa, el flujo salta directo al punto de unión.')}

<h2>Decisión doble: dos caminos excluyentes</h2>
${diag(`Algoritmo Aprobado
	Definir nota Como Real
	Leer nota
	Si nota >= 11 Entonces
		Escribir "Aprobado"
	Sino
		Escribir "Desaprobado"
	FinSi
FinAlgoritmo`, 'Decisión doble. Cada rama hace algo distinto y ambas confluyen antes del fin.')}

${nota('Un error muy común',
  '<p>Usar dos decisiones simples en lugar de una doble:</p>' +
  '<pre>Si nota >= 11 Entonces Escribir "Aprobado" FinSi\nSi nota < 11 Entonces Escribir "Desaprobado" FinSi</pre>' +
  '<p>Funciona, pero evalúa la condición dos veces, duplica la lógica y abre la puerta a que las dos condiciones ' +
  'dejen de ser complementarias cuando alguien las modifique. Si los casos son excluyentes, usa <code>Sino</code>.</p>', 'warn')}

<h2>Decisiones anidadas</h2>
<p>Un rombo dentro de la rama de otro rombo. Es la forma de expresar «si pasa A, entonces mira si pasa B».</p>

${diag(`Algoritmo MayorDeTres
	Definir a, b, c Como Real
	Leer a
	Leer b
	Leer c
	Si a > b Entonces
		Si a > c Entonces
			Escribir a
		Sino
			Escribir c
		FinSi
	Sino
		Si b > c Entonces
			Escribir b
		Sino
			Escribir c
		FinSi
	FinSi
FinAlgoritmo`, 'El mayor de tres números con decisiones anidadas: exactamente 2 comparaciones en cualquier camino.')}

<p>Esta versión es la óptima en número de comparaciones (siempre 2), pero crece muy rápido: con cuatro números serían
tres niveles de anidamiento y ocho caminos. La alternativa, que escala sin límite, es el patrón del <strong>candidato</strong>:
guardar un provisional e ir comparando. Lo verás en el módulo 4, y es el camino correcto en cuanto hay más de tres datos.</p>

<h2>Selección en cascada y selección múltiple</h2>
<p>Para clasificar en rangos se usan rombos en cascada, cada uno en la rama «No» del anterior:</p>

${diag(`Algoritmo Categoria
	Definir edad Como Entero
	Leer edad
	Si edad < 13 Entonces
		Escribir "Niño"
	Sino
		Si edad < 18 Entonces
			Escribir "Adolescente"
		Sino
			Si edad < 65 Entonces
				Escribir "Adulto"
			Sino
				Escribir "Adulto mayor"
			FinSi
		FinSi
	FinSi
FinAlgoritmo`, 'Cascada de decisiones. El orden de las comparaciones es lo que hace que no haga falta decir «entre 13 y 18».')}

<p>Fíjate en el detalle más valioso de este diagrama: la segunda condición es <code>edad &lt; 18</code> y no
<code>edad &gt;= 13 Y edad &lt; 18</code>. ¿Por qué basta? Porque si llegaste ahí, es que la primera condición fue falsa,
y por lo tanto <code>edad &gt;= 13</code> ya es cierto. <strong>Cada rama «No» arrastra la negación de todas las
condiciones anteriores.</strong> Aprovecharlo hace el código más corto y, sobre todo, imposible de dejar inconsistente:
si alguien cambia el 13, no hay un segundo 13 que actualizar.</p>

<p>Cuando la decisión no es por rangos sino por <strong>valores exactos</strong>, existe la selección múltiple
(<code>Segun</code>), que se dibuja con un rombo de varias salidas o con un bloque específico:</p>

${diag(`Algoritmo MenuOpcion
	Definir op Como Entero
	Leer op
	Segun op Hacer
		caso 1: Escribir "Registrar"
		caso 2: Escribir "Consultar"
		caso 3: Escribir "Salir"
		De Otro Modo: Escribir "Opción inválida"
	FinSegun
FinAlgoritmo`, 'Selección múltiple dibujada como decisiones encadenadas, que es a lo que equivale.')}

${tabla(['Situación', 'Estructura adecuada'], [
  ['Hacer algo solo si se cumple una condición', 'Decisión simple'],
  ['Dos caminos excluyentes', 'Decisión doble (<code>Sino</code>)'],
  ['Clasificar en rangos (&lt;13, &lt;18, &lt;65…)', 'Cascada de decisiones'],
  ['Comparar un valor contra una lista de valores exactos', 'Selección múltiple (<code>Segun</code>)'],
  ['Una condición depende de otra', 'Decisiones anidadas'],
  ['Buscar el mayor/menor de muchos', 'Patrón candidato + bucle (módulo 4)']
])}

<h2>Los dos errores de lógica que hay que vigilar</h2>
<p><strong>Condiciones solapadas:</strong> dos ramas que pueden cumplirse a la vez. Si escribes «si edad &gt; 18
→ adulto» y luego «si edad &gt; 65 → adulto mayor» en cascada, nadie llega nunca a adulto mayor, porque todos los
mayores de 65 cumplen la primera condición. El orden en una cascada <strong>es parte de la lógica</strong>.</p>

<p><strong>Casos no cubiertos:</strong> una cascada sin <code>Sino</code> final deja casos sin tratar en silencio.
Pregúntate siempre: «si ninguna condición se cumple, ¿qué pasa?». Si la respuesta es «nada», que sea una decisión
consciente y no un olvido. En un menú, el <code>De Otro Modo</code> con «opción inválida» no es opcional.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Par o impar',
          enunciado: 'Dibuja y escribe el algoritmo que lea un número entero y diga si es par o impar. Pruébalo en el laboratorio con 7 y con 0.',
          pista: 'Un número es par si el resto de dividirlo entre 2 es cero: <code>n MOD 2 = 0</code>.',
          lab: 'Algoritmo ParOImpar\n\tDefinir n Como Entero\n\tEscribir "Escribe un número entero:"\n\tLeer n\n\tSi n MOD 2 = 0 Entonces\n\t\tEscribir n, " es par"\n\tSino\n\t\tEscribir n, " es impar"\n\tFinSi\nFinAlgoritmo',
          labEntradas: '7',
          solucion: `${diag(`Algoritmo ParOImpar
	Definir n Como Entero
	Leer n
	Si n MOD 2 = 0 Entonces
		Escribir "es par"
	Sino
		Escribir "es impar"
	FinSi
FinAlgoritmo`, 'Decisión doble con el operador MOD.')}
<p>Con 0 el resultado es «par», que es matemáticamente correcto. Con números negativos hay un detalle: en muchos lenguajes <code>-7 MOD 2</code> da <code>-1</code> y no <code>1</code>, así que la condición <code>n MOD 2 = 1</code> fallaría con negativos. Comparar contra 0 (como aquí) es inmune a ese problema, y es la razón por la que se prefiere <code>n MOD 2 = 0</code> a <code>n MOD 2 = 1</code>.</p>` },
        { n: 2, titulo: 'Arregla la cascada',
          enunciado: 'Esta cascada nunca muestra «Adulto mayor» ni «Adolescente». Encuentra el error, explícalo y corrígelo.<br><pre>Si edad &gt; 12 Entonces\n    Escribir "Adulto"\nSino\n    Si edad &gt; 64 Entonces\n        Escribir "Adulto mayor"\n    Sino\n        Si edad &gt; 17 Entonces\n            Escribir "Adolescente"\n        Sino\n            Escribir "Niño"\n        FinSi\n    FinSi\nFinSi</pre>',
          pista: 'Piensa en qué rama caen los de 70 años y los de 15.',
          solucion: `<p><b>El error es el orden.</b> La primera condición <code>edad &gt; 12</code> captura a todos los mayores de 12 años, incluidos los adolescentes y los adultos mayores. Las ramas siguientes solo reciben a los de 12 o menos, donde <code>edad &gt; 64</code> y <code>edad &gt; 17</code> son imposibles.</p>
<p><b>Regla:</b> en una cascada con <code>&gt;</code>, las condiciones deben ir <b>de mayor a menor</b>; con <code>&lt;</code>, de menor a mayor. La condición más restrictiva primero.</p>
${cod('pseudo', `Si edad > 64 Entonces
	Escribir "Adulto mayor"
Sino
	Si edad > 17 Entonces
		Escribir "Adulto"
	Sino
		Si edad > 12 Entonces
			Escribir "Adolescente"
		Sino
			Escribir "Niño"
		FinSi
	FinSi
FinSi`)}
<p>Comprobación con casos frontera, que es lo que hay que hacer siempre: 65 → adulto mayor; 64 → adulto; 18 → adulto; 17 → adolescente; 13 → adolescente; 12 → niño. ✔</p>` },
        { n: 3, titulo: 'Tres números ordenados',
          enunciado: 'Escribe un algoritmo que lea tres números distintos y los muestre ordenados de menor a mayor, usando solo decisiones (sin arreglos ni bucles). ¿Cuántos casos hay? Genera su diagrama de flujo.',
          pista: 'Con tres elementos hay 3! = 6 ordenamientos posibles. Puedes cubrirlos con decisiones anidadas o con intercambios sucesivos.',
          lab: 'Algoritmo OrdenarTres\n\tDefinir a, b, c, t Como Real\n\tEscribir "Tres números:"\n\tLeer a\n\tLeer b\n\tLeer c\n\tSi a > b Entonces\n\t\tt <- a\n\t\ta <- b\n\t\tb <- t\n\tFinSi\n\tSi b > c Entonces\n\t\tt <- b\n\t\tb <- c\n\t\tc <- t\n\tFinSi\n\tSi a > b Entonces\n\t\tt <- a\n\t\ta <- b\n\t\tb <- t\n\tFinSi\n\tEscribir a, " ", b, " ", c\nFinAlgoritmo',
          labEntradas: '7\n3\n5',
          solucion: `<p>Hay <b>6 casos</b> (las 6 permutaciones de tres elementos). Cubrirlos con decisiones anidadas requiere un árbol de tres niveles y seis hojas, cada una con un <code>Escribir</code> distinto: funciona, pero es feo y no escala.</p>
<p>La solución elegante usa <b>tres intercambios condicionales</b>, que es el ordenamiento burbuja en miniatura:</p>
${cod('pseudo', `Si a > b Entonces  t <- a  a <- b  b <- t  FinSi   // deja el menor de a,b en a
Si b > c Entonces  t <- b  b <- c  c <- t  FinSi   // deja el mayor de todos en c
Si a > b Entonces  t <- a  a <- b  b <- t  FinSi   // reordena los dos primeros
Escribir a, " ", b, " ", c`)}
<p>¿Por qué basta con tres comparaciones y por qué hace falta repetir la primera? Tras los dos primeros pasos, <code>c</code> contiene con certeza el mayor de los tres (porque el segundo paso comparó el mayor de a y b contra c). Pero el primer intercambio pudo dejar en <code>b</code> un valor que ahora es menor que <code>a</code>, así que hay que volver a comparar. Este razonamiento (¿qué está garantizado después de cada paso?) se llama <b>invariante</b>, y es la forma de demostrar que un algoritmo de ordenamiento es correcto. Volverás a él en el módulo 7.</p>
${diag(`Algoritmo OrdenarTres
	Definir a, b, c, t Como Real
	Leer a
	Leer b
	Leer c
	Si a > b Entonces
		t <- a
		a <- b
		b <- t
	FinSi
	Si b > c Entonces
		t <- b
		b <- c
		c <- t
	FinSi
	Si a > b Entonces
		t <- a
		a <- b
		b <- t
	FinSi
	Escribir a, b, c
FinAlgoritmo`, 'Tres decisiones simples en secuencia: mucho más legible que seis ramas anidadas.')}` },
        { n: 4, titulo: 'Año bisiesto',
          enunciado: 'Un año es bisiesto si es divisible entre 4, <b>excepto</b> si es divisible entre 100, <b>salvo</b> que además sea divisible entre 400. Escribe el algoritmo, dibuja el diagrama y verifica con 2024, 1900, 2000 y 2023.',
          pista: 'Se puede resolver con decisiones anidadas o con una sola condición compuesta. Haz las dos y compara.',
          lab: 'Algoritmo Bisiesto\n\tDefinir anio Como Entero\n\tEscribir "Año:"\n\tLeer anio\n\tSi (anio MOD 4 = 0 Y anio MOD 100 <> 0) O (anio MOD 400 = 0) Entonces\n\t\tEscribir anio, " es bisiesto"\n\tSino\n\t\tEscribir anio, " no es bisiesto"\n\tFinSi\nFinAlgoritmo',
          labEntradas: '1900',
          solucion: `<p><b>Versión con una condición compuesta</b> (la que se usa en producción):</p>
${cod('pseudo', `Si (anio MOD 4 = 0 Y anio MOD 100 <> 0) O (anio MOD 400 = 0) Entonces
	Escribir "bisiesto"
Sino
	Escribir "no bisiesto"
FinSi`)}
<p><b>Versión anidada</b>, que refleja literalmente la frase de la regla:</p>
${cod('pseudo', `Si anio MOD 4 = 0 Entonces
	Si anio MOD 100 = 0 Entonces
		Si anio MOD 400 = 0 Entonces
			Escribir "bisiesto"        // 2000
		Sino
			Escribir "no bisiesto"     // 1900
		FinSi
	Sino
		Escribir "bisiesto"            // 2024
	FinSi
Sino
	Escribir "no bisiesto"             // 2023
FinSi`)}
${tabla(['#Año', '÷4', '÷100', '÷400', 'Resultado'], [
  ['2024', 'sí', 'no', '—', '<b>bisiesto</b>'], ['1900', 'sí', 'sí', 'no', 'no bisiesto'],
  ['2000', 'sí', 'sí', 'sí', '<b>bisiesto</b>'], ['2023', 'no', '—', '—', 'no bisiesto']
])}
<p>La versión anidada es más fácil de verificar contra la regla escrita (cada rama corresponde a una cláusula), y la compuesta es más corta. Para una regla con tres niveles de excepción, muchos equipos prefieren la anidada precisamente porque se puede auditar frase por frase. Y para que nadie tenga que redescubrir nada, el nombre de una función (<code>esBisiesto(anio)</code>) vale más que cualquier comentario.</p>` },
        { n: 5, titulo: 'Validación de triángulo',
          enunciado: 'Escribe un algoritmo que lea tres longitudes y determine: si forman un triángulo (la suma de dos lados cualesquiera debe ser mayor que el tercero) y, si lo forman, de qué tipo es (equilátero, isósceles o escaleno) y si es rectángulo. Diseña la cascada de decisiones completa y justifica el orden.',
          pista: 'Primero valida que sean positivos, luego la desigualdad triangular, y solo después clasifica.',
          lab: 'Algoritmo Triangulo\n\tDefinir a, b, c Como Real\n\tEscribir "Tres lados:"\n\tLeer a\n\tLeer b\n\tLeer c\n\tSi a <= 0 O b <= 0 O c <= 0 Entonces\n\t\tEscribir "Los lados deben ser positivos"\n\tSino\n\t\tSi a + b <= c O a + c <= b O b + c <= a Entonces\n\t\t\tEscribir "No forman un triángulo"\n\t\tSino\n\t\t\tSi a = b Y b = c Entonces\n\t\t\t\tEscribir "Equilátero"\n\t\t\tSino\n\t\t\t\tSi a = b O b = c O a = c Entonces\n\t\t\t\t\tEscribir "Isósceles"\n\t\t\t\tSino\n\t\t\t\t\tEscribir "Escaleno"\n\t\t\t\tFinSi\n\t\t\tFinSi\n\t\t\tSi abs(a*a + b*b - c*c) < 0.0001 O abs(a*a + c*c - b*b) < 0.0001 O abs(b*b + c*c - a*a) < 0.0001 Entonces\n\t\t\t\tEscribir "y además es rectángulo"\n\t\t\tFinSi\n\t\tFinSi\n\tFinSi\nFinAlgoritmo',
          labEntradas: '3\n4\n5',
          solucion: `${cod('pseudo', `Algoritmo Triangulo
	Definir a, b, c Como Real
	Leer a
	Leer b
	Leer c
	// 1) validación de dominio: antes que cualquier otra cosa
	Si a <= 0 O b <= 0 O c <= 0 Entonces
		Escribir "Los lados deben ser positivos"
	Sino
		// 2) desigualdad triangular: ¿existe el triángulo?
		Si a + b <= c O a + c <= b O b + c <= a Entonces
			Escribir "No forman un triángulo"
		Sino
			// 3) clasificación por lados: de la condición más restrictiva a la más general
			Si a = b Y b = c Entonces
				Escribir "Equilátero"
			Sino
				Si a = b O b = c O a = c Entonces
					Escribir "Isósceles"
				Sino
					Escribir "Escaleno"
				FinSi
			FinSi
			// 4) clasificación por ángulos: independiente de la anterior
			Si abs(a*a + b*b - c*c) < 0.0001 O abs(a*a + c*c - b*b) < 0.0001
			   O abs(b*b + c*c - a*a) < 0.0001 Entonces
				Escribir "y además es rectángulo"
			FinSi
		FinSi
	FinSi
FinAlgoritmo`)}
<p><b>Justificación del orden:</b></p>
<ol>
<li><b>Dominio primero.</b> Con un lado negativo no tiene sentido ni evaluar la desigualdad triangular: los datos son inválidos, no el triángulo imposible. Mezclar las dos cosas daría un mensaje de error engañoso.</li>
<li><b>Existencia antes que clasificación.</b> Los lados 1, 1, 5 son «isósceles» si solo mira los lados, pero no son un triángulo. Clasificar algo que no existe es el error clásico de este ejercicio.</li>
<li><b>Equilátero antes que isósceles.</b> Un equilátero también cumple la condición de isósceles (tiene dos lados iguales), así que la comprobación más restrictiva va primero. Esto es el mismo problema de orden de la cascada del ejercicio 2.</li>
<li><b>Rectángulo aparte.</b> Ser rectángulo es ortogonal a la clasificación por lados: un triángulo puede ser isósceles y rectángulo a la vez (45-45-90). Por eso es un <code>Si</code> independiente y no una rama de la cascada.</li>
</ol>
<p><b>Y el detalle que separa un ejercicio de aula de código real:</b> la comparación de Pitágoras usa una tolerancia (<code>abs(…) &lt; 0.0001</code>) en lugar de <code>=</code>, porque los lados son reales. Con 3, 4 y 5 funcionaría la igualdad exacta; con 1, 1 y <code>raiz(2)</code> no, y es un triángulo rectángulo perfectamente válido. Es exactamente la lección del módulo 1 sobre IEEE 754 aplicada aquí.</p>` }
      ],
      quiz: [
        { p: 'En una cascada <code>Si edad &lt; 13 … Sino Si edad &lt; 18 …</code>, ¿por qué no hace falta escribir <code>edad &gt;= 13 Y edad &lt; 18</code>?',
          ops: ['Porque el lenguaje lo deduce', 'Porque llegar a la rama Sino ya garantiza que la condición anterior es falsa',
            'Porque es un error no escribirlo', 'Porque las edades son enteras'],
          ok: 1, exp: 'Cada rama Sino arrastra la negación de todas las condiciones anteriores. Aprovecharlo acorta el código y evita que dos copias del mismo límite se desincronicen.' },
        { p: '¿Cuál es el problema de escribir dos decisiones simples con condiciones complementarias en lugar de un <code>Sino</code>?',
          ops: ['Ninguno, es igual', 'Se evalúa la condición dos veces y la lógica queda duplicada',
            'No funciona', 'Es más rápido'],
          ok: 1, exp: 'Funciona, pero duplica la condición: si alguien modifica una y olvida la otra, aparecen casos sin tratar o tratados dos veces.' },
        { p: 'Para clasificar un valor en cuatro rangos numéricos, lo adecuado es…',
          ops: ['selección múltiple (<code>Segun</code>)', 'una cascada de decisiones ordenada',
            'cuatro decisiones simples independientes', 'un bucle'],
          ok: 1, exp: 'La selección múltiple compara contra valores exactos, no rangos. Para rangos se usa una cascada, con las condiciones ordenadas de la más restrictiva a la más general.' }
      ]
    },

    {
      id: 'm2-3',
      titulo: 'Repetición: mientras, repetir y para',
      resumen: 'Los tres bucles dibujados, cuándo usar cada uno y cómo garantizar que terminan.',
      objetivos: [
        'Distinguir bucles de condición inicial, condición final y contador',
        'Elegir el bucle correcto según el problema',
        'Garantizar la terminación identificando qué hace avanzar la condición'
      ],
      lectura: `
<p>La repetición es lo que hace a un programa valioso: un algoritmo de 10 líneas puede procesar 10 millones de registros.
Hay tres formas de dibujarla, y aunque son intercambiables en teoría, cada una expresa una intención distinta.</p>

<h2>Mientras: comprueba antes (0 o más vueltas)</h2>
<p>La condición se evalúa <strong>antes</strong> de cada vuelta. Si es falsa desde el principio, el cuerpo no se ejecuta
ni una vez. Es el bucle por defecto cuando no sabes cuántas vueltas habrá.</p>

${diag(`Algoritmo SumaHastaCero
	Definir n, suma Como Real
	suma <- 0
	Leer n
	Mientras n <> 0 Hacer
		suma <- suma + n
		Leer n
	FinMientras
	Escribir "Total: ", suma
FinAlgoritmo`, 'Mientras con centinela: se suma hasta que el usuario escribe un 0. Nota el Leer antes del bucle y otro al final del cuerpo.')}

<p>Ese patrón de dos <code>Leer</code> (uno antes del bucle y otro al final del cuerpo) se llama <strong>lectura
adelantada</strong>, y es la forma correcta de usar un centinela: hay que tener un valor para poder evaluar la condición
la primera vez. Olvidar el primero es uno de los errores más repetidos en los exámenes.</p>

<h2>Repetir … Hasta Que: comprueba después (1 o más vueltas)</h2>
<p>El cuerpo se ejecuta y <em>después</em> se pregunta. Garantiza <strong>al menos una vuelta</strong>, lo que lo hace
perfecto para menús y para validar entradas: hay que pedir el dato antes de poder comprobarlo.</p>

${diag(`Algoritmo PedirNotaValida
	Definir nota Como Real
	Repetir
		Escribir "Nota entre 0 y 20:"
		Leer nota
	Hasta Que nota >= 0 Y nota <= 20
	Escribir "Nota aceptada: ", nota
FinAlgoritmo`, 'Repetir-Hasta Que: el bucle de validación de entradas. Observa que la condición es la de SALIDA, no la de continuación.')}

${nota('El error de invertir la condición',
  '<p>En <code>Mientras</code> la condición dice <strong>cuándo seguir</strong>; en <code>Repetir…Hasta Que</code> dice ' +
  '<strong>cuándo parar</strong>. Son opuestas. «Mientras la nota sea inválida, pedirla» equivale a «repetir pedirla ' +
  'hasta que la nota sea válida». Confundirlas produce un bucle infinito o uno que no se repite nunca.</p>', 'warn')}

<h2>Para: cuando sabes cuántas vueltas</h2>
<p>El <code>Para</code> no es una estructura nueva: es un <code>Mientras</code> con la inicialización, la condición y
el incremento de la variable de control empaquetados. Mira el diagrama que genera el laboratorio y verás los tres
elementos dibujados por separado:</p>

${diag(`Algoritmo TablaDel7
	Definir i Como Entero
	Para i <- 1 Hasta 12 Con Paso 1 Hacer
		Escribir "7 x ", i, " = ", 7 * i
	FinPara
FinAlgoritmo`, 'El Para desplegado: inicialización arriba, condición en el rombo, incremento al final del cuerpo.')}

<p>Usa <code>Para</code> siempre que el número de vueltas se conozca antes de entrar. Es más corto, más seguro (no
puedes olvidar el incremento) y comunica tu intención a quien lee: «esto se repite una cantidad conocida de veces».</p>

${tabla(['Bucle', 'Evalúa la condición', 'Vueltas mínimas', 'Úsalo cuando…'], [
  ['<code>Mientras … Hacer</code>', 'Antes', '0', 'no sabes cuántas vueltas y puede no hacer falta ninguna'],
  ['<code>Repetir … Hasta Que</code>', 'Después', '1', 'el cuerpo debe ejecutarse al menos una vez (menús, validación)'],
  ['<code>Para … Hasta … Con Paso</code>', 'Antes (implícita)', '0', 'conoces el número de vueltas o recorres un rango']
])}

<h2>La pregunta que evita todos los bucles infinitos</h2>
<p>Antes de dar por terminado cualquier bucle, responde: <strong>¿qué instrucción del cuerpo hace que la condición se
acerque a volverse falsa?</strong> Si no puedes señalarla con el dedo, tienes un bucle infinito.</p>

${cod('pseudo', `// INFINITO: nada dentro del cuerpo cambia 'i'
i <- 1
Mientras i <= 10 Hacer
	Escribir i
FinMientras

// CORRECTO: el incremento acerca la condición a ser falsa
i <- 1
Mientras i <= 10 Hacer
	Escribir i
	i <- i + 1
FinMientras`)}

<p>Formalmente, lo que buscas es una <strong>función de terminación</strong>: una cantidad entera que decrezca en cada
vuelta y esté acotada por abajo. En el ejemplo es <code>10 − i</code>: empieza en 9, baja de uno en uno y no puede bajar
de 0 indefinidamente. Es exactamente el mismo argumento con el que demostraste que el algoritmo de Euclides termina.</p>

<p>Tres variantes del mismo error que conviene reconocer:</p>
<ul>
  <li><strong>La variable no cambia.</strong> El caso de arriba.</li>
  <li><strong>Cambia pero en la dirección equivocada.</strong> <code>Mientras i &lt;= 10 … i ← i − 1</code>.</li>
  <li><strong>Cambia pero nunca cruza el límite.</strong> <code>Mientras x &lt;&gt; 1 … x ← x / 2</code> con
  <code>x</code> real: se acerca a 0, nunca vale exactamente 1. Comparar reales por igualdad, otra vez.</li>
</ul>

<h2>Salir de un bucle a mitad de camino</h2>
<p>Muchos lenguajes permiten <code>romper</code> (break) para abandonar un bucle antes de tiempo, por ejemplo al
encontrar lo que buscabas. En un diagrama de flujo eso dibuja una flecha que sale del cuerpo hacia fuera del bucle, lo
que rompe la regla de «una entrada, una salida» de la programación estructurada. La alternativa estructurada es una
<strong>bandera</strong>:</p>

${cod('pseudo', `// Con bandera: una sola salida, totalmente estructurado
encontrado <- Falso
i <- 1
Mientras i <= n Y NO encontrado Hacer
	Si datos[i] = buscado Entonces
		encontrado <- Verdadero
	Sino
		i <- i + 1
	FinSi
FinMientras`)}

<p>¿Cuál es mejor? La bandera es más fácil de dibujar y de demostrar correcta; el <code>break</code> es más corto y suele
leerse mejor en código real. Para aprender a estructurar, usa la bandera. En producción, usa lo que haga el código más
claro, y sé consciente de lo que estás eligiendo. Nota el detalle del <code>Sino</code>: si incrementaras <code>i</code>
siempre, al encontrar el elemento <code>i</code> ya apuntaría al siguiente y perderías la posición.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Elige el bucle',
          enunciado: 'Di qué bucle usarías en cada caso y por qué: (a) mostrar los números del 1 al 100; (b) pedir una contraseña hasta que sea correcta; (c) leer notas hasta que el usuario escriba −1; (d) recorrer los 12 meses del año; (e) dividir un número entre 2 hasta que sea menor que 1.',
          pista: '¿Sabes el número de vueltas? ¿Debe ejecutarse al menos una vez?',
          solucion: `<p><b>(a) Para.</b> Número de vueltas conocido (100).</p>
<p><b>(b) Repetir…Hasta Que.</b> Hay que pedir la contraseña al menos una vez antes de poder comprobarla.</p>
<p><b>(c) Mientras</b> con lectura adelantada. El usuario puede escribir −1 de entrada, y entonces no debe procesarse ninguna nota: cero vueltas es un caso válido.</p>
<p><b>(d) Para.</b> Doce vueltas conocidas.</p>
<p><b>(e) Mientras.</b> Si el número ya es menor que 1, no hay que dividir nada. Con <code>Repetir</code> dividirías una vez de más.</p>` },
        { n: 2, titulo: 'Convierte entre bucles',
          enunciado: 'Reescribe este <code>Para</code> como <code>Mientras</code> y luego como <code>Repetir…Hasta Que</code>, cuidando que los tres hagan exactamente lo mismo, incluso con <code>n = 0</code>.<br><code>Para i ← 1 Hasta n Con Paso 1 Hacer · Escribir i · FinPara</code>',
          pista: 'Con la versión Repetir vas a necesitar un Si alrededor, y ahí está la lección.',
          solucion: `<p><b>Como Mientras</b> (equivalencia directa):</p>
${cod('pseudo', `i <- 1
Mientras i <= n Hacer
	Escribir i
	i <- i + 1
FinMientras`)}
<p><b>Como Repetir…Hasta Que</b> (necesita protección):</p>
${cod('pseudo', `Si n >= 1 Entonces              // sin este Si, con n=0 escribiría un 1
	i <- 1
	Repetir
		Escribir i
		i <- i + 1
	Hasta Que i > n
FinSi`)}
<p>La moraleja es la parte importante del ejercicio: <b>un <code>Repetir</code> no puede imitar cero vueltas sin ayuda externa</b>, porque su cuerpo se ejecuta antes de preguntar. Por eso <code>Mientras</code> es el bucle más general de los tres: cualquier bucle se puede escribir con él, y de hecho es el único que se necesita para el teorema de Böhm-Jacopini.</p>` },
        { n: 3, titulo: 'Suma con centinela',
          enunciado: 'Escribe el algoritmo que lea números hasta que el usuario escriba −1, y muestre la suma, la cantidad de números leídos y el promedio. Cuida el caso de que el usuario escriba −1 de entrada. Genera el diagrama.',
          pista: 'El centinela no debe sumarse ni contarse. Y si no hay números, no se puede dividir.',
          lab: 'Algoritmo SumaConCentinela\n\tDefinir n, suma, prom Como Real\n\tDefinir cuantos Como Entero\n\tsuma <- 0\n\tcuantos <- 0\n\tEscribir "Escribe números; -1 para terminar:"\n\tLeer n\n\tMientras n <> -1 Hacer\n\t\tsuma <- suma + n\n\t\tcuantos <- cuantos + 1\n\t\tLeer n\n\tFinMientras\n\tSi cuantos > 0 Entonces\n\t\tprom <- suma / cuantos\n\t\tEscribir "Suma: ", suma\n\t\tEscribir "Cantidad: ", cuantos\n\t\tEscribir "Promedio: ", prom\n\tSino\n\t\tEscribir "No ingresaste ningún número"\n\tFinSi\nFinAlgoritmo',
          labEntradas: '10\n20\n30\n-1',
          solucion: `${diag(`Algoritmo SumaConCentinela
	Definir n, suma, prom Como Real
	Definir cuantos Como Entero
	suma <- 0
	cuantos <- 0
	Leer n
	Mientras n <> -1 Hacer
		suma <- suma + n
		cuantos <- cuantos + 1
		Leer n
	FinMientras
	Si cuantos > 0 Entonces
		prom <- suma / cuantos
		Escribir prom
	Sino
		Escribir "sin datos"
	FinSi
FinAlgoritmo`, 'Patrón completo: lectura adelantada, acumulador, contador y protección contra la división entre cero.')}
<p>Los cuatro detalles que hacen correcto este algoritmo:</p>
<ul>
<li><b>Lectura adelantada:</b> el primer <code>Leer</code> está antes del bucle. Sin él no habría valor para evaluar la condición.</li>
<li><b>El centinela no se procesa:</b> la condición se comprueba antes de sumar, así que el −1 nunca entra al acumulador.</li>
<li><b>El segundo <code>Leer</code> va al final del cuerpo</b>, no al principio: si estuviera al principio, el primer número leído se perdería sin sumarse.</li>
<li><b>La división está protegida:</b> con <code>cuantos = 0</code> el promedio no existe, y hay que decirlo en lugar de dividir entre cero.</li>
</ul>` },
        { n: 4, titulo: 'Encuentra el bucle infinito',
          enunciado: 'Los tres fragmentos tienen un bucle que no termina. Para cada uno, di qué falla y corrígelo.<br>(a) <code>i ← 10; Mientras i &gt; 0 Hacer · Escribir i · i ← i + 1 · FinMientras</code><br>(b) <code>x ← 100.0; Mientras x &lt;&gt; 0 Hacer · x ← x / 2 · FinMientras</code><br>(c) <code>Leer op; Mientras op &lt;&gt; 9 Hacer · mostrarMenu() · FinMientras</code>',
          pista: 'Busca en cada uno qué debería acercar la condición a volverse falsa.',
          solucion: `<p><b>(a)</b> La variable cambia en la <b>dirección equivocada</b>: la condición es <code>i &gt; 0</code> y el incremento aleja a <code>i</code> de 0. Corrección: <code>i ← i − 1</code>. (Y en realidad esto además desborda el entero tras unos miles de millones de vueltas, lo que produce un comportamiento aún más confuso.)</p>
<p><b>(b)</b> Dividir un real entre 2 nunca da exactamente 0: da valores cada vez más pequeños (y al final un <i>subnormal</i>, y luego sí cero, tras más de 1000 vueltas; pero la intención del autor claramente era otra). La corrección es comparar con una tolerancia: <code>Mientras x &gt; 0.0001 Hacer</code>. Es el error de comparar reales por igualdad del módulo 1.</p>
<p><b>(c)</b> Falta <b>leer de nuevo</b> dentro del cuerpo: <code>op</code> conserva su valor original para siempre. Corrección: agregar <code>Leer op</code> al final del cuerpo. Este es el error más común en menús, y se evita usando <code>Repetir … Hasta Que op = 9</code>, que fuerza a pedir el dato dentro del bucle.</p>
<p>Patrón general de diagnóstico: <b>señala con el dedo la instrucción que hace progresar la condición</b>. Si no existe, no cambia lo correcto o no llega a cruzar el límite, el bucle es infinito.</p>` },
        { n: 5, titulo: 'Conjetura de Collatz',
          enunciado: 'La secuencia de Collatz parte de un número n: si es par, se divide entre 2; si es impar, se multiplica por 3 y se suma 1. Se repite hasta llegar a 1. Escribe el algoritmo que muestre la secuencia y cuente los pasos, pruébalo con 27 (debe dar 111 pasos) y explica por qué nadie puede demostrar que este bucle termine siempre.',
          pista: 'Es un Mientras con una decisión dentro. El valor puede subir mucho antes de bajar.',
          lab: 'Algoritmo Collatz\n\tDefinir n, pasos Como Entero\n\tEscribir "Número inicial:"\n\tLeer n\n\tpasos <- 0\n\tEscribir "Secuencia desde ", n, ":"\n\tMientras n <> 1 Hacer\n\t\tSi n MOD 2 = 0 Entonces\n\t\t\tn <- n / 2\n\t\tSino\n\t\t\tn <- 3 * n + 1\n\t\tFinSi\n\t\tpasos <- pasos + 1\n\t\tEscribir Sin Saltar n, " "\n\tFinMientras\n\tEscribir ""\n\tEscribir "Pasos: ", pasos\nFinAlgoritmo',
          labEntradas: '27',
          solucion: `${cod('pseudo', `Algoritmo Collatz
	Definir n, pasos, maximo Como Entero
	Leer n
	pasos <- 0
	maximo <- n
	Mientras n <> 1 Hacer
		Si n MOD 2 = 0 Entonces
			n <- n / 2
		Sino
			n <- 3 * n + 1
		FinSi
		Si n > maximo Entonces
			maximo <- n
		FinSi
		pasos <- pasos + 1
	FinMientras
	Escribir "Pasos: ", pasos, " · valor máximo alcanzado: ", maximo
FinAlgoritmo`)}
<p>Con n = 27 el resultado es <b>111 pasos</b>, y lo notable es que la secuencia llega hasta <b>9232</b> antes de bajar a 1: parte de 27 y sube 342 veces su valor inicial. Pruébalo en el laboratorio.</p>
<p><b>Por qué nadie puede demostrar que termina:</b> para probar la terminación de un bucle hace falta una función de terminación, una cantidad que decrezca monótonamente en cada vuelta. Aquí no existe ninguna conocida: cuando n es par el valor baja, pero cuando es impar <b>sube</b> (casi se triplica). No hay forma conocida de demostrar que la bajada siempre gana a la larga.</p>
<p>La <b>conjetura de Collatz</b> (1937) afirma que la secuencia llega a 1 para todo entero positivo. Se ha verificado por computadora para todos los números hasta más de 2⁶⁸ y nunca ha fallado, pero <b>no hay demostración</b>, y Paul Erdős dijo que «las matemáticas no están preparadas para este problema».</p>
<p>La conexión con el módulo 0 es directa: este bucle es un ejemplo concreto y minúsculo del <b>problema de la parada</b>. Un analizador automático que mirara este código no podría decidir si termina, porque nadie puede. Y si un programa de siete líneas ya es indecidible, queda claro por qué ninguna herramienta puede garantizarte que tu programa no se cuelgue.</p>` }
      ],
      quiz: [
        { p: '¿Cuál es la diferencia esencial entre <code>Mientras</code> y <code>Repetir…Hasta Que</code>?',
          ops: ['Ninguna, son sinónimos', '<code>Mientras</code> puede ejecutar el cuerpo cero veces; <code>Repetir</code> al menos una',
            '<code>Repetir</code> es más rápido', '<code>Mientras</code> solo sirve para contadores'],
          ok: 1, exp: 'Mientras evalúa la condición antes del cuerpo (0 o más vueltas); Repetir la evalúa después (1 o más). Por eso Repetir es el bucle de los menús y la validación de entradas.' },
        { p: 'Un bucle no termina. La primera cosa que hay que buscar es…',
          ops: ['un error de sintaxis', 'la instrucción que hace progresar la condición hacia volverse falsa',
            'si el lenguaje soporta bucles', 'si hay suficiente memoria'],
          ok: 1, exp: 'Todo bucle correcto tiene una función de terminación: algo que decrece y está acotado. Si no puedes señalar la instrucción que la hace avanzar, el bucle es infinito.' },
        { p: 'En el patrón de centinela, ¿por qué hay un <code>Leer</code> antes del bucle y otro al final del cuerpo?',
          ops: ['Por costumbre', 'Porque hace falta un valor para evaluar la condición la primera vez',
            'Para leer el doble de datos', 'Es un error, con uno basta'],
          ok: 1, exp: 'Es la lectura adelantada: sin el primer Leer no hay valor que comparar con el centinela. Y el segundo va al final para que el valor leído se procese en la vuelta siguiente.' }
      ]
    },

    {
      id: 'm2-4',
      titulo: 'Prueba de escritorio: verificar sin computadora',
      resumen: 'La técnica para demostrar que un algoritmo funciona antes de escribirlo, y cómo elegir los casos de prueba.',
      objetivos: [
        'Trazar a mano cualquier algoritmo con bucles y decisiones',
        'Elegir casos de prueba que puedan revelar errores',
        'Identificar invariantes de bucle'
      ],
      lectura: `
<p>La <strong>prueba de escritorio</strong> (o traza) consiste en ejecutar el algoritmo a mano, anotando el valor de cada
variable en cada paso. Es tediosa, y es la habilidad que más rápido separa a quien entiende de quien copia. Un algoritmo
que no puedes trazar, no lo entiendes.</p>

<h2>Cómo se hace</h2>
<ol>
  <li>Dibuja una tabla con una columna por variable, más una columna para la condición de los bucles y otra para la salida.</li>
  <li>Elige valores de entrada concretos y pequeños.</li>
  <li>Avanza una instrucción por fila. Copia los valores que no cambian: ver la columna completa es parte del valor de la técnica.</li>
  <li>En los bucles, anota el resultado de la condición <em>antes</em> de decidir si entras.</li>
  <li>Compara la salida final con lo que esperabas. Si difiere, la primera fila donde algo te sorprende es el error.</li>
</ol>

<h3>Ejemplo: suma de dígitos</h3>
${cod('pseudo', `Algoritmo SumaDigitos
	Definir n, suma, d Como Entero
	Leer n                    // probamos con 472
	suma <- 0
	Mientras n > 0 Hacer
		d <- n MOD 10         // último dígito
		suma <- suma + d
		n <- trunc(n / 10)    // quita el último dígito
	FinMientras
	Escribir suma
FinAlgoritmo`)}

${tabla(['#Vuelta', 'Condición <code>n &gt; 0</code>', '#n', '#d', '#suma'], [
  ['—', '—', '472', '—', '0'],
  ['1', '472 &gt; 0 ✔', '47', '2', '2'],
  ['2', '47 &gt; 0 ✔', '4', '7', '9'],
  ['3', '4 &gt; 0 ✔', '0', '4', '13'],
  ['4', '0 &gt; 0 ✖', '0', '4', '13 → sale'],
  ['salida', '', '', '', '<b>13</b>']
], 'Traza completa de la suma de dígitos de 472 = 4+7+2 = 13 ✔')}

<p>La traza demuestra tres cosas a la vez: que el resultado es correcto, que el bucle termina (porque <code>n</code>
decrece estrictamente y está acotado por 0) y que las tres vueltas corresponden a los tres dígitos.</p>

<h2>Invariantes de bucle: la idea que lo explica todo</h2>
<p>Un <strong>invariante</strong> es una afirmación que es verdadera antes del bucle, sigue siendo verdadera después de
cada vuelta, y al terminar implica que el resultado es correcto. Es la herramienta formal para <em>demostrar</em> que un
bucle funciona, en lugar de confiar en que funcionó con los tres casos que probaste.</p>

<p>En el ejemplo anterior el invariante es: <em>«<code>suma</code> contiene la suma de los dígitos ya quitados de
<code>n</code>»</em>. Compruébalo en la tabla:</p>
<ul>
  <li>Antes del bucle: no se quitó ningún dígito y <code>suma = 0</code>. ✔</li>
  <li>Después de cada vuelta: se quitó un dígito más y se sumó. ✔</li>
  <li>Al terminar, <code>n = 0</code> significa que se quitaron <em>todos</em> los dígitos, así que <code>suma</code>
  es la suma de todos. <strong>Eso es exactamente lo que se pedía.</strong></li>
</ul>

${nota('Por qué importa el invariante',
  '<p>Probar con tres ejemplos te dice que funciona en tres casos. Un invariante te dice que funciona en ' +
  '<strong>todos</strong>. Cuando un bucle te confunde, escribir su invariante en una frase suele resolver la ' +
  'confusión más rápido que trazar diez casos.</p>', 'key')}

<h2>Cómo elegir los casos de prueba</h2>
<p>Probar con 472 no vale mucho si todos tus casos se parecen. Los casos que encuentran errores son siempre los mismos
tipos, y conviene tenerlos como lista mental:</p>

${tabla(['Tipo de caso', 'Por qué encuentra errores', 'Ejemplo (suma de dígitos)'], [
  ['<b>Caso típico</b>', 'Confirma que la idea general funciona', '472 → 13'],
  ['<b>Valor mínimo</b>', 'El bucle debe entrar al menos una vez', '0 → ¿0? El bucle no entra: suma queda en 0 ✔ por suerte'],
  ['<b>Un solo elemento</b>', 'Revela errores de inicialización', '7 → 7'],
  ['<b>Frontera exacta</b>', 'Donde cambia el comportamiento (&lt; vs &lt;=)', '10 → 1; 9 → 9'],
  ['<b>Todos iguales</b>', 'Revela comparaciones mal puestas', '111 → 3'],
  ['<b>Negativo o inválido</b>', 'Revela validaciones faltantes', '−472 → el bucle no entra y da 0: <b>error no detectado</b>'],
  ['<b>Valor grande</b>', 'Revela desbordamientos y lentitud', '999999999']
], 'La tabla de casos de prueba que conviene aplicar a cualquier algoritmo. El caso negativo delata que falta una validación.')}

<p>Mira lo que pasó con el caso negativo: el algoritmo devuelve 0 sin quejarse, lo que es un error de lógica silencioso.
La prueba de escritorio no solo verifica: <strong>descubre requisitos que nadie escribió</strong>.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Traza un acumulador',
          enunciado: 'Haz la prueba de escritorio completa de este algoritmo con <code>n = 5</code> e indica qué calcula.<br><code>suma ← 0; i ← 1; Mientras i &lt;= n Hacer · suma ← suma + i * i · i ← i + 1 · FinMientras; Escribir suma</code>',
          pista: 'Una fila por vuelta, con las columnas i, i*i y suma.',
          solucion: `${tabla(['#Vuelta', 'Condición', '#i', '#i*i', '#suma'], [
  ['—', '—', '1', '—', '0'], ['1', '1≤5 ✔', '2', '1', '1'], ['2', '2≤5 ✔', '3', '4', '5'],
  ['3', '3≤5 ✔', '4', '9', '14'], ['4', '4≤5 ✔', '5', '16', '30'],
  ['5', '5≤5 ✔', '6', '25', '55'], ['6', '6≤5 ✖', '6', '—', '55 → sale']
])}
<p>Calcula la <b>suma de los cuadrados</b> de 1 a n: 1+4+9+16+25 = <b>55</b>. (Comprobación con la fórmula cerrada n(n+1)(2n+1)/6 = 5·6·11/6 = 55 ✔)</p>
<p>Invariante: «<code>suma</code> contiene la suma de los cuadrados de 1 hasta <code>i−1</code>». Al salir, <code>i−1 = n</code>, así que suma contiene lo pedido.</p>` },
        { n: 2, titulo: 'Encuentra el error trazando',
          enunciado: 'Este algoritmo debería contar cuántos dígitos tiene un número, pero con 100 responde 2. Traza con <code>n = 100</code>, encuentra el error y corrígelo.<br><code>cuantos ← 0; Leer n; Mientras n &gt; 1 Hacer · n ← trunc(n/10) · cuantos ← cuantos + 1 · FinMientras; Escribir cuantos</code>',
          pista: 'Mira la condición del bucle y el valor de n en la última vuelta.',
          solucion: `${tabla(['#Vuelta', 'Condición <code>n &gt; 1</code>', '#n', '#cuantos'], [
  ['—', '—', '100', '0'], ['1', '100&gt;1 ✔', '10', '1'], ['2', '10&gt;1 ✔', '1', '2'], ['3', '1&gt;1 ✖', '1', '2 → sale']
])}
<p><b>El error es la condición:</b> debe ser <code>n &gt; 0</code>, no <code>n &gt; 1</code>. Con <code>&gt; 1</code>, cuando n baja a 1 el bucle sale sin contar ese último dígito.</p>
<p>Corregido, la traza da: 100 → 10 → 1 → 0, tres vueltas, <b>3 dígitos</b> ✔</p>
<p>Y queda un caso límite que ninguna de las dos versiones maneja: con <code>n = 0</code> el bucle no entra y responde 0 dígitos, cuando el 0 tiene un dígito. Hace falta un <code>Si n = 0 Entonces cuantos ← 1</code>. Este es exactamente el tipo de error que solo aparece eligiendo bien los casos de prueba.</p>` },
        { n: 3, titulo: 'Diseña los casos de prueba',
          enunciado: 'Para un algoritmo que «busca un nombre en una lista de n nombres y devuelve su posición, o 0 si no está», escribe la tabla de casos de prueba completa con el resultado esperado de cada uno. Mínimo 7 casos.',
          pista: 'Piensa en dónde puede estar el elemento y en qué tamaños puede tener la lista.',
          solucion: `${tabla(['#', 'Caso', 'Resultado esperado', 'Qué error detecta'], [
  ['1', 'Lista de 5, el nombre está en la posición 3', '3', 'funcionamiento general'],
  ['2', 'Está en la <b>primera</b> posición', '1', 'inicialización del índice (empezar en 0 o en 2)'],
  ['3', 'Está en la <b>última</b> posición', 'n', '<i>off-by-one</i> en la condición (<code>&lt;</code> vs <code>&lt;=</code>)'],
  ['4', 'No está', '0', 'valor de retorno del caso «no encontrado»'],
  ['5', 'Lista <b>vacía</b> (n = 0)', '0', 'que el bucle no acceda a <code>datos[1]</code> antes de comprobar'],
  ['6', 'Lista de <b>un solo</b> elemento, y es el buscado', '1', 'bucles que no entran con n = 1'],
  ['7', 'Aparece <b>dos veces</b>', 'la primera posición', 'requisito ambiguo: ¿primera o última?'],
  ['8', 'Mayúsculas distintas («ANA» vs «ana»)', 'según requisito', 'requisito no especificado'],
  ['9', 'Nombre con tildes o espacios al final', 'según requisito', 'normalización de texto (módulo 1)']
])}
<p>Los casos 7, 8 y 9 son los más valiosos: <b>no revelan errores de código sino de especificación</b>. Nadie dijo qué hacer si el nombre aparece dos veces, ni si «Ana» y «ana» son el mismo. Si no lo decides tú, lo decidirá un accidente en el código y descubrirás cuál fue cuando un usuario reclame.</p>` },
        { n: 4, titulo: 'Escribe el invariante',
          enunciado: 'Escribe el invariante de bucle de estos dos algoritmos y explica por qué al terminar implica que el resultado es correcto.<br>(a) máximo de un arreglo: <code>mayor ← a[1]; Para i ← 2 Hasta n · Si a[i] &gt; mayor Entonces mayor ← a[i] FinSi · FinPara</code><br>(b) potencia: <code>r ← 1; Para i ← 1 Hasta e · r ← r * b · FinPara</code>',
          pista: 'La frase tiene la forma «en este punto, la variable X contiene … de los elementos ya procesados».',
          solucion: `<p><b>(a) Invariante:</b> «<code>mayor</code> contiene el máximo de los elementos <code>a[1]</code> hasta <code>a[i−1]</code>».</p>
<ul>
<li><b>Antes del bucle:</b> i = 2, y <code>mayor = a[1]</code> es trivialmente el máximo de <code>a[1..1]</code>. ✔</li>
<li><b>Se conserva:</b> si <code>a[i]</code> es mayor que el máximo de los anteriores, pasa a ser el nuevo máximo; si no, el máximo no cambia. En ambos casos <code>mayor</code> es el máximo de <code>a[1..i]</code>, y tras incrementar i, de <code>a[1..i−1]</code>. ✔</li>
<li><b>Al terminar:</b> i = n+1, así que <code>mayor</code> es el máximo de <code>a[1..n]</code>, es decir de todo el arreglo. ✔</li>
</ul>
<p>Nota que el invariante también explica <b>por qué <code>mayor</code> se inicializa con <code>a[1]</code> y no con 0</b>: con 0, el invariante sería falso antes de empezar si todos los elementos fueran negativos. El invariante no solo demuestra: dicta la inicialización correcta.</p>
<p><b>(b) Invariante:</b> «<code>r</code> contiene <code>b</code> elevado a <code>i−1</code>».</p>
<ul>
<li>Antes: i = 1 y <code>r = 1 = b⁰</code>. ✔ (Esto justifica inicializar en 1 y no en 0: el 1 es el elemento neutro de la multiplicación.)</li>
<li>Se conserva: multiplicar por b aumenta el exponente en 1, igual que el incremento de i. ✔</li>
<li>Al terminar: i = e+1, así que <code>r = b^e</code>. ✔ Y con e = 0 el bucle no entra y r vale 1, que es correcto.</li>
</ul>` },
        { n: 5, titulo: 'Traza un algoritmo con dos bucles',
          enunciado: 'Traza completamente este ordenamiento burbuja con el arreglo <code>[3, 1, 2]</code>. Muestra el estado del arreglo después de cada comparación e indica cuántas comparaciones e intercambios hace en total. Luego di cuántas haría en el peor caso con n elementos.',
          pista: 'El bucle externo controla las pasadas y el interno las comparaciones de cada pasada. Son 3 comparaciones en total aquí.',
          lab: 'Algoritmo BurbujaTraza\n\tDefinir i, j, t, n Como Entero\n\tDimension a[3]\n\tn <- 3\n\ta[1] <- 3\n\ta[2] <- 1\n\ta[3] <- 2\n\tPara i <- 1 Hasta n - 1 Con Paso 1 Hacer\n\t\tPara j <- 1 Hasta n - i Con Paso 1 Hacer\n\t\t\tEscribir "comparo a[", j, "]=", a[j], " con a[", j+1, "]=", a[j+1]\n\t\t\tSi a[j] > a[j + 1] Entonces\n\t\t\t\tt <- a[j]\n\t\t\t\ta[j] <- a[j + 1]\n\t\t\t\ta[j + 1] <- t\n\t\t\t\tEscribir "  -> intercambio"\n\t\t\tFinSi\n\t\tFinPara\n\tFinPara\n\tEscribir "Ordenado: ", a[1], " ", a[2], " ", a[3]\nFinAlgoritmo',
          solucion: `${tabla(['#i', '#j', 'Compara', '¿Intercambia?', 'Arreglo después'], [
  ['1', '1', 'a[1]=3 con a[2]=1', 'sí', '[1, 3, 2]'],
  ['1', '2', 'a[2]=3 con a[3]=2', 'sí', '[1, 2, 3]'],
  ['2', '1', 'a[1]=1 con a[2]=2', 'no', '[1, 2, 3]']
], 'Total: 3 comparaciones y 2 intercambios. El arreglo queda ordenado.')}
<p><b>Por qué el bucle interno llega hasta <code>n − i</code>:</b> después de la pasada i, los i elementos mayores ya están colocados al final (eso es el invariante del burbuja), así que no hace falta volver a compararlos. Si el interno fuera siempre hasta <code>n − 1</code>, el algoritmo funcionaría igual pero haría comparaciones inútiles.</p>
<p><b>Peor caso con n elementos:</b> el número de comparaciones es <code>(n−1) + (n−2) + … + 1 = n(n−1)/2</code>. Con n = 3 son 3; con n = 10, 45; con n = 1000, <b>499 500</b>. Crece con el cuadrado de n, y de ahí viene la notación O(n²) del módulo 7. Los intercambios en el peor caso (arreglo al revés) son también n(n−1)/2.</p>
<p>Ejecuta la versión del laboratorio: imprime cada comparación, lo que convierte el programa en su propia prueba de escritorio. Esa técnica (instrumentar el código con salidas temporales) es depuración real, y es la que usarás cuando no tengas un depurador a mano.</p>` }
      ],
      quiz: [
        { p: 'Un invariante de bucle es…',
          ops: ['una variable que no cambia', 'una afirmación verdadera antes y después de cada vuelta que al terminar implica el resultado correcto',
            'el contador del bucle', 'una condición que siempre es falsa'],
          ok: 1, exp: 'Es la herramienta para demostrar que un bucle es correcto en todos los casos, no solo en los que probaste. Además suele dictar cómo inicializar las variables.' },
        { p: '¿Cuál de estos casos de prueba es más probable que encuentre un error?',
          ops: ['Una lista típica de 5 elementos', 'La lista vacía y la de un solo elemento',
            'Una lista de 100 elementos', 'Siempre el mismo caso repetido'],
          ok: 1, exp: 'Los casos frontera (vacío, uno, el primero, el último) son donde viven los errores de inicialización y los off-by-one. Los casos típicos confirman lo que ya funciona.' },
        { p: 'Haces la prueba de escritorio de un algoritmo correcto y el resultado no es el esperado. Eso significa que…',
          ops: ['la traza está mal hecha, hay que confiar en el código', 'el algoritmo tiene un error en la primera fila donde algo te sorprendió',
            'hay que ejecutarlo en la computadora para saber', 'el algoritmo es correcto igual'],
          ok: 1, exp: 'La traza es la ejecución, hecha a mano. La primera fila donde el valor no es el que esperabas señala la instrucción culpable.' }
      ]
    },

    {
      id: 'm2-5',
      titulo: 'Bucles anidados y subprocesos en el diagrama',
      resumen: 'Un bucle dentro de otro, cuándo aparecen, su costo, y cómo dibujar llamadas a subprocesos.',
      objetivos: [
        'Dibujar y razonar bucles anidados',
        'Calcular cuántas veces se ejecuta el cuerpo de un bucle anidado',
        'Representar subprocesos y el paso de datos en un diagrama'
      ],
      lectura: `
<p>Un bucle anidado es un bucle dentro del cuerpo de otro. Aparecen de forma natural siempre que haya <strong>dos
dimensiones</strong>: filas y columnas, cada elemento contra cada elemento, cada día de cada mes.</p>

${diag(`Algoritmo TablasDel1Al5
	Definir i, j Como Entero
	Para i <- 1 Hasta 5 Con Paso 1 Hacer
		Escribir "Tabla del ", i
		Para j <- 1 Hasta 10 Con Paso 1 Hacer
			Escribir i, " x ", j, " = ", i * j
		FinPara
	FinPara
FinAlgoritmo`, 'Bucle anidado: el interno completa sus 10 vueltas por cada una de las 5 vueltas del externo. En total 50 ejecuciones del cuerpo.')}

<h2>La regla del producto</h2>
<p>El cuerpo del bucle interno se ejecuta <strong>(vueltas del externo) × (vueltas del interno)</strong> veces. Esta
multiplicación es la razón por la que los bucles anidados importan tanto:</p>

${tabla(['Externo', 'Interno', '#Ejecuciones', 'Tiempo a 10⁸ op/s'], [
  ['10', '10', '100', 'instantáneo'],
  ['1 000', '1 000', '1 000 000', '0,01 s'],
  ['100 000', '100 000', '10 000 000 000', '100 s'],
  ['1 000 000', '1 000 000', '10¹²', '~3 horas']
], 'Multiplicar por 10 el tamaño del problema multiplica por 100 el tiempo. Esto es O(n²), y es el tema del módulo 7.')}

${nota('La señal de alarma',
  '<p>Cuando veas dos bucles anidados sobre los <em>mismos</em> datos, pregúntate si se puede evitar. Muchas veces sí: ' +
  'un diccionario, un ordenamiento previo o una sola pasada guardando información suelen convertir un O(n²) en O(n) ' +
  'o O(n log n). Otras veces no se puede, y entonces el anidamiento es legítimo.</p>', 'warn')}

<h2>Anidamiento con límites dependientes</h2>
<p>El bucle interno no tiene que ir siempre de 1 a n: su límite puede depender de la variable del externo. Eso produce
los patrones triangulares, y es lo que hace que el burbuja no compare dos veces el mismo par:</p>

${cod('pseudo', `// Triángulo: el interno depende de i
Para i <- 1 Hasta 5 Con Paso 1 Hacer
	Para j <- 1 Hasta i Con Paso 1 Hacer
		Escribir Sin Saltar "*"
	FinPara
	Escribir ""        // salto de línea al terminar la fila
FinPara

// Salida:
// *
// **
// ***
// ****
// *****`)}

<p>El total de ejecuciones aquí no es 25 sino <code>1+2+3+4+5 = 15</code>, es decir <code>n(n+1)/2</code>. Sigue siendo
cuadrático (la mitad de un cuadrado es un cuadrado a efectos de crecimiento), pero el factor constante importa en la
práctica.</p>

<h2>Error clásico: reinicializar en el lugar equivocado</h2>
<p>Con bucles anidados hay que decidir <strong>dónde</strong> va cada inicialización, y equivocarse es muy fácil:</p>

${cod('pseudo', `// Suma de cada fila de una matriz 3x4
Para i <- 1 Hasta 3 Con Paso 1 Hacer
	sumaFila <- 0                      // DENTRO del externo: se reinicia por fila ✔
	Para j <- 1 Hasta 4 Con Paso 1 Hacer
		sumaFila <- sumaFila + m[i, j]
	FinPara
	Escribir "Fila ", i, ": ", sumaFila
FinPara

// Si 'sumaFila <- 0' estuviera ANTES del bucle externo, acumularía
// todas las filas y mostraría totales acumulados en lugar de por fila.`)}

<p>La regla: la inicialización va <strong>justo antes del bucle cuyos resultados quieres acumular</strong>. Si quieres un
total por fila, dentro del externo. Si quieres el total general, fuera de todo.</p>

<h2>Subprocesos en el diagrama</h2>
<p>Cuando un bloque de lógica tiene nombre propio, se dibuja como un rectángulo con barras laterales y se detalla en su
propio diagrama. Eso convierte un diagrama gigante en varios legibles:</p>

${diag(`Algoritmo Principal
	Definir monto, total Como Real
	Leer monto
	total <- aplicarIGV(monto)
	Escribir "Total con IGV: ", total
FinAlgoritmo`, 'El diagrama principal: "aplicarIGV" aparece como un solo paso (subproceso).')}

${diag(`Funcion r <- aplicarIGV(m)
	Definir igv Como Real
	igv <- m * 0.18
	r <- m + igv
FinFuncion`, 'El diagrama del subproceso, dibujado por separado. El Retornar es su punto de salida.', { funcion: 'aplicarIGV', inicio: 'aplicarIGV(m)', fin: 'Devolver r' })}

<p>Un subproceso tiene tres partes que hay que documentar siempre, porque son su contrato:</p>
<ul>
  <li><strong>Qué recibe</strong> (parámetros) y con qué restricciones.</li>
  <li><strong>Qué devuelve</strong> (resultado) y en qué unidades.</li>
  <li><strong>Qué supone</strong> (precondiciones): «el monto debe ser positivo», «el arreglo debe estar ordenado».</li>
</ul>

<p>Esa tercera parte es la que casi nadie escribe y la que causa los errores más caros. El bug del Ariane 5 del módulo 1
fue exactamente eso: una función que suponía un rango de velocidades que nadie documentó, reutilizada en un cohete más
rápido.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Cuenta las ejecuciones',
          enunciado: '¿Cuántas veces se ejecuta la instrucción <code>Escribir</code> en cada caso? (a) externo 1..4, interno 1..6; (b) externo 1..n, interno 1..n; (c) externo 1..5, interno 1..i; (d) tres bucles anidados de 1..10 cada uno.',
          pista: 'Multiplica, salvo cuando el límite interno depende del externo: ahí hay que sumar.',
          solucion: `<p><b>(a)</b> 4 × 6 = <b>24</b></p>
<p><b>(b)</b> n × n = <b>n²</b></p>
<p><b>(c)</b> 1+2+3+4+5 = <b>15</b> (fórmula: n(n+1)/2)</p>
<p><b>(d)</b> 10 × 10 × 10 = <b>1000</b>. Tres bucles anidados dan O(n³): con n = 1000 serían 10⁹ ejecuciones, unos 10 segundos. Con n = 10 000, más de dos horas.</p>` },
        { n: 2, titulo: 'Dibuja un patrón',
          enunciado: 'Escribe el algoritmo que imprima esta pirámide con n = 5 y genera su diagrama de flujo.<br><pre>    *\n   ***\n  *****\n *******\n*********</pre>',
          pista: 'Cada fila i tiene (n−i) espacios y (2i−1) asteriscos. Son dos bucles internos dentro del externo.',
          lab: 'Algoritmo Piramide\n\tDefinir n, i, j Como Entero\n\tEscribir "Altura de la pirámide:"\n\tLeer n\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tPara j <- 1 Hasta n - i Con Paso 1 Hacer\n\t\t\tEscribir Sin Saltar " "\n\t\tFinPara\n\t\tPara j <- 1 Hasta 2 * i - 1 Con Paso 1 Hacer\n\t\t\tEscribir Sin Saltar "*"\n\t\tFinPara\n\t\tEscribir ""\n\tFinPara\nFinAlgoritmo',
          labEntradas: '5',
          solucion: `${cod('pseudo', `Algoritmo Piramide
	Definir n, i, j Como Entero
	Leer n
	Para i <- 1 Hasta n Con Paso 1 Hacer
		Para j <- 1 Hasta n - i Con Paso 1 Hacer      // espacios
			Escribir Sin Saltar " "
		FinPara
		Para j <- 1 Hasta 2 * i - 1 Con Paso 1 Hacer  // asteriscos
			Escribir Sin Saltar "*"
		FinPara
		Escribir ""                                    // fin de fila
	FinPara
FinAlgoritmo`)}
${tabla(['#Fila i', '#Espacios (n−i)', '#Asteriscos (2i−1)'], [
  ['1', '4', '1'], ['2', '3', '3'], ['3', '2', '5'], ['4', '1', '7'], ['5', '0', '9']
])}
<p>Los dos bucles internos son <b>hermanos, no anidados</b>: se ejecutan uno tras otro dentro del externo. Confundir hermanos con anidados es el error típico aquí, y produce un patrón muy distinto. En el diagrama se ve con claridad: dos rombos en secuencia dentro del bucle grande.</p>
<p>Y el <code>Escribir ""</code> final es imprescindible: sin él, todo saldría en una sola línea. Los ejercicios de dibujo con asteriscos parecen un juego, pero entrenan exactamente lo que después usarás para generar tablas, reportes y matrices.</p>` },
        { n: 3, titulo: 'Tabla de multiplicar completa',
          enunciado: 'Escribe el algoritmo que imprima la tabla de multiplicar completa del 1 al 9 en forma de cuadrícula, con los encabezados de fila y de columna alineados.',
          pista: 'Una fila de encabezado antes de los bucles, y dentro del externo un encabezado de fila antes del bucle interno.',
          lab: 'Algoritmo TablaCuadricula\n\tDefinir i, j Como Entero\n\tEscribir Sin Saltar "     "\n\tPara j <- 1 Hasta 9 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar j, "   "\n\tFinPara\n\tEscribir ""\n\tPara i <- 1 Hasta 9 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar i, " | "\n\t\tPara j <- 1 Hasta 9 Con Paso 1 Hacer\n\t\t\tSi i * j < 10 Entonces\n\t\t\t\tEscribir Sin Saltar " "\n\t\t\tFinSi\n\t\t\tEscribir Sin Saltar i * j, " "\n\t\tFinPara\n\t\tEscribir ""\n\tFinPara\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Algoritmo TablaCuadricula
	Definir i, j Como Entero
	// encabezado de columnas
	Escribir Sin Saltar "     "
	Para j <- 1 Hasta 9 Con Paso 1 Hacer
		Escribir Sin Saltar j, "   "
	FinPara
	Escribir ""
	// cuerpo
	Para i <- 1 Hasta 9 Con Paso 1 Hacer
		Escribir Sin Saltar i, " | "          // encabezado de fila
		Para j <- 1 Hasta 9 Con Paso 1 Hacer
			Si i * j < 10 Entonces            // alineación simple
				Escribir Sin Saltar " "
			FinSi
			Escribir Sin Saltar i * j, " "
		FinPara
		Escribir ""
	FinPara
FinAlgoritmo`)}
<p>El <code>Si i * j &lt; 10</code> añade un espacio a los números de un dígito para que las columnas queden alineadas. Es la versión manual de lo que en los lenguajes reales hace el formateo de cadenas (<code>printf("%3d")</code> en C, f-strings en Python). Vale la pena hacerlo a mano una vez para entender qué problema resuelven esas funciones.</p>
<p>Nota la simetría del resultado: <code>i*j = j*i</code>, así que la mitad de la tabla es redundante. Si el objetivo fuera solo <i>calcular</i> y no <i>mostrar</i>, se podría recorrer solo el triángulo con <code>Para j ← i Hasta 9</code> y ahorrar la mitad del trabajo. Reconocer simetrías para reducir trabajo es una técnica de optimización que reaparece constantemente.</p>` },
        { n: 4, titulo: 'Diseña con subprocesos',
          enunciado: 'Diseña un sistema de notas con subprocesos: debe leer las notas de n alumnos (3 notas cada uno), calcular el promedio de cada alumno, decir si aprobó, y al final mostrar el promedio general y cuántos aprobaron. Define la firma de cada subproceso (qué recibe, qué devuelve, qué supone) y dibuja el diagrama principal.',
          pista: 'Busca los bloques con nombre propio: leer, promediar, clasificar, resumir.',
          solucion: `<p><b>Subprocesos y sus contratos:</b></p>
${tabla(['Subproceso', 'Recibe', 'Devuelve', 'Precondiciones'], [
  ['<code>leerNota(etiqueta)</code>', 'texto a mostrar', 'una nota válida', 'ninguna; valida internamente que esté entre 0 y 20'],
  ['<code>promedio(n1,n2,n3)</code>', 'tres notas', 'el promedio', 'las tres notas ya validadas'],
  ['<code>aprobo(prom)</code>', 'un promedio', 'Verdadero / Falso', 'prom entre 0 y 20'],
  ['<code>mostrarResumen(sum,cant,aprob)</code>', 'suma, cantidad, aprobados', 'nada (solo imprime)', 'cant &gt; 0']
], 'Cada subproceso hace una sola cosa y su nombre dice cuál.')}
${cod('pseudo', `Algoritmo SistemaNotas
	Definir i, n, aprobados Como Entero
	Definir n1, n2, n3, prom, sumaGeneral Como Real
	Leer n
	sumaGeneral <- 0
	aprobados <- 0
	Para i <- 1 Hasta n Con Paso 1 Hacer
		n1 <- leerNota("Nota 1")
		n2 <- leerNota("Nota 2")
		n3 <- leerNota("Nota 3")
		prom <- promedio(n1, n2, n3)
		Escribir "Alumno ", i, ": ", prom
		Si aprobo(prom) Entonces
			Escribir "  Aprobado"
			aprobados <- aprobados + 1
		Sino
			Escribir "  Desaprobado"
		FinSi
		sumaGeneral <- sumaGeneral + prom
	FinPara
	mostrarResumen(sumaGeneral, n, aprobados)
FinAlgoritmo`)}
<p>El diagrama principal queda en unos 10 símbolos y se lee de un golpe; cada subproceso tiene su propio diagrama de 5 a 8 símbolos. Compáralo con la versión monolítica: la misma lógica, 40 símbolos en una columna, imposible de revisar.</p>
<p><b>Lo valioso del ejercicio:</b> <code>leerNota</code> encapsula la validación, así que el bucle de validación aparece <b>una sola vez</b> en todo el programa aunque se use tres veces por alumno. Eliminar repetición no es cosmética: es la diferencia entre corregir un bug en un lugar o en tres.</p>` },
        { n: 5, titulo: 'Reduce un O(n²) a O(n)',
          enunciado: 'Este algoritmo busca si hay elementos repetidos en un arreglo comparando todos contra todos. (a) ¿Cuántas comparaciones hace con n = 1000? (b) Propón un algoritmo que resuelva lo mismo con muchas menos comparaciones y explica el costo de tu solución. (c) ¿En qué caso la versión O(n²) sigue siendo preferible?<br><pre>Para i ← 1 Hasta n−1\n    Para j ← i+1 Hasta n\n        Si a[i] = a[j] Entonces hay repetido\n</pre>',
          pista: 'Piensa en ordenar primero, o en recordar lo que ya viste.',
          solucion: `<p><b>(a)</b> Compara cada par una sola vez: <code>n(n−1)/2 = 1000 × 999 / 2 = <b>499 500</b></code> comparaciones. Con n = 100 000 serían 5 × 10⁹, unos 50 segundos.</p>
<p><b>(b) Dos alternativas:</b></p>
<p><b>Opción 1 — ordenar y comparar vecinos.</b> Si el arreglo está ordenado, los duplicados quedan juntos, así que basta una pasada:</p>
${cod('pseudo', `ordenar(a, n)                    // O(n log n)
Para i <- 1 Hasta n - 1 Con Paso 1 Hacer
	Si a[i] = a[i + 1] Entonces
		Escribir "hay repetido: ", a[i]
	FinSi
FinPara                           // O(n)`)}
<p>Costo total: <b>O(n log n)</b>, dominado por el ordenamiento. Con n = 1000 son unas 10 000 operaciones en lugar de 499 500: <b>50 veces menos</b>. Desventaja: modifica el orden del arreglo original (salvo que hagas una copia, lo que cuesta memoria).</p>
<p><b>Opción 2 — conjunto o diccionario.</b> Recorres una sola vez y guardas lo que ya viste:</p>
${cod('pseudo', `vistos <- conjunto vacío
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si a[i] está en vistos Entonces
		Escribir "hay repetido: ", a[i]
	Sino
		agregar a[i] a vistos
	FinSi
FinPara`)}
<p>Costo: <b>O(n)</b> en tiempo, porque buscar e insertar en una tabla hash es O(1) en promedio. A cambio usa <b>O(n) de memoria extra</b>. Es el clásico intercambio <i>tiempo por espacio</i>, y es la solución que se espera en una entrevista técnica.</p>
<p><b>(c) Cuándo la versión O(n²) sigue siendo preferible:</b></p>
<ul>
<li><b>Cuando n es pequeño.</b> Con n = 10, son 45 comparaciones: cualquier cosa es instantánea, y el código de tres líneas es más fácil de leer y de verificar que uno con una estructura auxiliar.</li>
<li><b>Cuando la memoria es crítica</b> (un microcontrolador, por ejemplo) y no puedes permitirte el conjunto auxiliar ni copiar el arreglo.</li>
<li><b>Cuando no puedes ordenar ni hashear</b> los elementos: si la «igualdad» es una comparación difusa (nombres parecidos, imágenes similares), no hay orden total ni clave hash, y comparar todos contra todos es lo único que funciona.</li>
</ul>
<p>Esta es la lección de diseño del ejercicio: <b>«más eficiente» no es una propiedad absoluta</b>. Depende del tamaño de los datos, de la memoria disponible y de las operaciones que tus datos admiten. El módulo 7 te dará el vocabulario para discutirlo con precisión.</p>` }
      ],
      quiz: [
        { p: 'Un bucle de 1 a 100 con otro de 1 a 50 dentro ejecuta el cuerpo interno…',
          ops: ['150 veces', '5000 veces', '100 veces', 'depende de los datos'],
          ok: 1, exp: '100 × 50 = 5000. El cuerpo del bucle interno se ejecuta el producto de las vueltas.' },
        { p: 'Para sumar cada fila de una matriz por separado, la inicialización <code>sumaFila ← 0</code> debe ir…',
          ops: ['antes del bucle externo', 'dentro del externo, antes del interno',
            'dentro del interno', 'después de los dos bucles'],
          ok: 1, exp: 'Debe reiniciarse en cada fila, así que va dentro del externo. Antes del externo acumularía todas las filas juntas.' },
        { p: 'La parte del contrato de un subproceso que casi nadie documenta y causa los errores más caros es…',
          ops: ['el nombre', 'los parámetros', 'las precondiciones (qué supone)', 'el tipo de retorno'],
          ok: 2, exp: 'Las precondiciones («el arreglo debe estar ordenado», «el monto es positivo»). El fallo del Ariane 5 fue exactamente reutilizar una función cuyos supuestos de rango nadie había escrito.' }
      ]
    }
  ]
});
