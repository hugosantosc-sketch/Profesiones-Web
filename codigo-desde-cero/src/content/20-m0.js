/* ===== MÓDULO 0 — Pensar como programador ===== */
CDC.registrar({
  id: 'm0',
  nivel: 'Cero absoluto',
  titulo: 'Pensar como programador',
  resumen: 'Qué es realmente un algoritmo, cómo partir un problema en pedazos y por qué una computadora no entiende intenciones, solo instrucciones.',
  intro: '<p>Antes de escribir una línea de código hay que aprender a pensar de una forma muy concreta: ' +
    'decir exactamente qué hacer, en qué orden, sin suponer nada. Este módulo entrena eso. No hay sintaxis ' +
    'que memorizar todavía; hay una forma de razonar que vas a usar el resto de tu vida como programador.</p>',
  temas: [

    /* ---------------------------------------------------------- */
    {
      id: 'm0-1',
      titulo: '¿Qué es un algoritmo?',
      resumen: 'La definición formal, por qué la precisión importa y las cinco propiedades que debe cumplir.',
      objetivos: [
        'Definir con precisión qué es y qué no es un algoritmo',
        'Reconocer las cinco propiedades obligatorias: finitud, precisión, entrada, salida y efectividad',
        'Detectar ambigüedades en instrucciones escritas en lenguaje natural'
      ],
      lectura: `
<p>Un <strong>algoritmo</strong> es una secuencia finita de pasos, descritos sin ambigüedad, que transforma unos datos de entrada
en un resultado. Esa definición es antigua: el nombre viene del matemático persa <em>al-Juarismi</em> (siglo IX), y existían
algoritmos miles de años antes de que existieran computadoras. El algoritmo de Euclides para calcular el máximo común divisor
tiene más de 2300 años y hoy sigue corriendo dentro de tu teléfono.</p>

<p>La palabra clave de esa definición es <strong>sin ambigüedad</strong>. Compara estas dos instrucciones:</p>

<blockquote>
<p><strong>A.</strong> «Agrega sal al gusto».</p>
<p><strong>B.</strong> «Agrega 4 gramos de sal, revuelve 10 segundos y prueba; si todavía está sosa, repite hasta un máximo de 3 veces».</p>
</blockquote>

<p>La primera es una receta para un humano: confía en tu criterio, en tu memoria y en tu paladar. La segunda es un algoritmo:
cualquiera que la siga, incluso sin saber cocinar, obtiene el mismo resultado. Programar es convertir instrucciones del tipo A
en instrucciones del tipo B, porque la computadora no tiene criterio: ejecuta literalmente lo que escribiste, incluso cuando
es obvio que no era eso lo que querías.</p>

<h2>Las cinco propiedades obligatorias</h2>

<p>Un procedimiento solo merece llamarse algoritmo si cumple las cinco condiciones que Donald Knuth formalizó en
<em>The Art of Computer Programming</em>:</p>

${tabla(['Propiedad', 'Qué exige', 'Ejemplo de incumplimiento'], [
  ['<b>Finitud</b>', 'Debe terminar después de un número finito de pasos.', '«Suma 1 a <code>x</code> y repite para siempre»: no termina nunca.'],
  ['<b>Precisión</b>', 'Cada paso debe estar definido sin ambigüedad.', '«Elige un número apropiado»: ¿cuál es apropiado?'],
  ['<b>Entrada</b>', 'Cero o más datos de entrada, bien definidos.', '«Calcula el promedio»: ¿el promedio de qué?'],
  ['<b>Salida</b>', 'Al menos un resultado relacionado con la entrada.', 'Un procedimiento que calcula algo y no lo informa ni lo guarda.'],
  ['<b>Efectividad</b>', 'Cada paso debe ser realizable de forma mecánica, en tiempo finito.', '«Comprueba si este programa se detiene algún día»: es indecidible.']
], 'Las cinco propiedades de un algoritmo según Knuth. La finitud y la precisión son las que más se violan cuando uno empieza.')}

<p>La quinta merece un comentario: hay problemas para los que <em>se ha demostrado</em> que no existe ningún algoritmo.
El más famoso es el <strong>problema de la parada</strong>, que Alan Turing demostró indecidible en 1936: no puede existir
un programa que, mirando cualquier otro programa, diga siempre y con certeza si ese programa terminará o se quedará
colgado para siempre. Programar no es solo saber resolver; también es saber qué no se puede resolver.</p>

<h2>Entrada, proceso y salida</h2>

<p>Todo algoritmo, por complejo que sea, tiene la misma forma de tres partes. Es el modelo <strong>EPS</strong>:</p>

${fig(`<svg viewBox="0 0 560 120" width="560" height="120" role="img" aria-label="Esquema entrada, proceso y salida">
<defs><marker id="m0a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".5"/></marker></defs>
<g color="var(--fg-soft)">
<rect x="10" y="32" width="140" height="56" rx="8" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.6"/>
<text x="80" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">ENTRADA</text>
<text x="80" y="74" text-anchor="middle" font-size="11" fill="var(--fg-soft)">datos que llegan</text>
<rect x="210" y="32" width="140" height="56" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="280" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">PROCESO</text>
<text x="280" y="74" text-anchor="middle" font-size="11" fill="var(--fg-soft)">cálculos y decisiones</text>
<rect x="410" y="32" width="140" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="480" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">SALIDA</text>
<text x="480" y="74" text-anchor="middle" font-size="11" fill="var(--fg-soft)">resultado útil</text>
<path d="M150 60 H205" stroke="currentColor" stroke-width="1.5" marker-end="url(#m0a)"/>
<path d="M350 60 H405" stroke="currentColor" stroke-width="1.5" marker-end="url(#m0a)"/>
</g></svg>`, 'El modelo entrada–proceso–salida. Antes de programar algo, escribe sus tres casillas.')}

<p>Antes de resolver cualquier ejercicio de este curso, escribe en papel las tres casillas. Si no puedes decir qué entra
y qué debe salir, todavía no entendiste el problema, y escribir código solo te va a confundir más.</p>

<h3>Ejemplo completo: el promedio de un alumno</h3>
<ul>
  <li><strong>Entrada:</strong> tres notas, cada una un número real entre 0 y 20.</li>
  <li><strong>Proceso:</strong> sumar las tres notas y dividir el total entre 3; comparar el resultado con 11.</li>
  <li><strong>Salida:</strong> el promedio con dos decimales y la palabra «Aprobado» o «Desaprobado».</li>
</ul>

<p>Fíjate en todo lo que ya decidimos sin escribir código: el rango válido de las notas, cuántas son, el criterio de
aprobación y el formato de salida. Cada una de esas decisiones se convertirá después en una línea concreta. Los programas
que fallan casi nunca fallan por sintaxis; fallan porque alguien no decidió estas cosas a tiempo.</p>

${nota('La regla de oro', '<p>Si no puedes explicar tu algoritmo por teléfono a una persona que no ve tu pantalla, ' +
  'todavía no lo tienes claro. El código es la última traducción, no el primer paso.</p>', 'key')}

<h2>Algoritmo, programa y proceso</h2>
<p>Tres palabras que se confunden a diario:</p>
<ul>
  <li>Un <strong>algoritmo</strong> es la idea: la receta, independiente del lenguaje.</li>
  <li>Un <strong>programa</strong> es esa idea escrita en un lenguaje concreto, guardada en un archivo.</li>
  <li>Un <strong>proceso</strong> es ese programa mientras se ejecuta, con su memoria y su estado en un instante dado.</li>
</ul>
<p>La misma receta de ordenamiento (algoritmo) puede escribirse en Python y en C (dos programas) y correr tres veces
a la vez en tu máquina (tres procesos). Cuando alguien dice «mi programa es lento», a veces el problema está en el
programa y a veces en el algoritmo; son capas distintas y se arreglan de forma distinta.</p>
      `,
      ejercicios: [
        {
          n: 1,
          titulo: 'Detecta la ambigüedad',
          enunciado: 'Señala qué propiedad de un algoritmo incumple cada instrucción: <br>(a) «Ordena los números más o menos de menor a mayor». <br>(b) «Mientras el número sea mayor que cero, súmale 1». <br>(c) «Calcula el área» (sin decir de qué figura).',
          pista: 'Repasa las cinco propiedades: finitud, precisión, entrada, salida y efectividad.',
          solucion: `<p><b>(a)</b> Incumple la <b>precisión</b>: «más o menos» no está definido, dos personas obtendrían resultados distintos.</p>
<p><b>(b)</b> Incumple la <b>finitud</b>: si el número empieza en 1, la condición nunca se vuelve falsa porque el número solo crece. Es un bucle infinito.</p>
<p><b>(c)</b> Incumple la <b>entrada</b>: no dice qué datos recibe ni de qué figura se trata, así que el proceso no está determinado.</p>`
        },
        {
          n: 2,
          titulo: 'EPS de un cajero automático',
          enunciado: 'Escribe las tres casillas (entrada, proceso, salida) de la operación «retirar dinero» en un cajero. Incluye al menos dos validaciones en el proceso.',
          pista: '¿Qué datos aporta el cliente y qué datos ya tiene el banco? ¿Qué puede salir mal?',
          solucion: `<p><b>Entrada:</b> número de tarjeta, clave de 4 dígitos, monto solicitado. (El saldo disponible y los billetes del cajero no los escribe el usuario, pero el proceso los necesita.)</p>
<p><b>Proceso:</b></p>
<ol>
  <li>Validar que la clave corresponde a la tarjeta (máximo 3 intentos).</li>
  <li>Validar que el monto es múltiplo de la denominación disponible (por ejemplo, de 20).</li>
  <li>Validar que el monto no excede el saldo ni el límite diario.</li>
  <li>Validar que el cajero tiene suficientes billetes.</li>
  <li>Descontar el monto del saldo y registrar la operación.</li>
</ol>
<p><b>Salida:</b> los billetes, el comprobante con el nuevo saldo o, si alguna validación falla, un mensaje de error específico.</p>
<p>Lo importante del ejercicio: las validaciones son <em>la mayor parte</em> del algoritmo. En programas reales, el camino felizmente correcto suele ser el 20% del código.</p>`
        },
        {
          n: 3,
          titulo: 'El algoritmo del sándwich',
          enunciado: 'Escribe un algoritmo para preparar un sándwich de jamón y queso con la precisión suficiente para que lo ejecute un robot que no sabe nada de cocina: no sabe qué es «untar», no sabe que el pan se abre y tomará todo literalmente. Mínimo 10 pasos.',
          pista: 'Asume que el robot no sabe nada implícito. ¿Cuántas rebanadas? ¿De qué lado? ¿Cómo sabe que ya terminó?',
          solucion: `<p>Una versión aceptable:</p>
<pre>1.  Toma 2 rebanadas de pan de molde de la bolsa y colócalas sobre el plato, separadas.
2.  Llama A a la rebanada de la izquierda y B a la de la derecha.
3.  Toma el cuchillo por el mango, con el filo hacia abajo.
4.  Introduce la punta del cuchillo en el envase de mantequilla y retira
    aproximadamente 5 gramos sobre el filo.
5.  Apoya el filo en la cara superior de A y deslízalo de borde a borde,
    repitiendo hasta que no quede superficie sin cubrir.
6.  Deja el cuchillo sobre el plato.
7.  Toma 1 rebanada de jamón y colócala centrada sobre la cara untada de A.
8.  Toma 1 rebanada de queso y colócala centrada sobre el jamón.
9.  Toma la rebanada B y colócala encima del queso, con su cara limpia hacia arriba,
    alineando los bordes con A.
10. Si la pila se mantiene unida al levantarla 2 cm, el sándwich está terminado;
    si no, presiona suavemente desde arriba y repite esta comprobación una vez.</pre>
<p><b>Lo que enseña el ejercicio:</b> cada «paso obvio» que olvidaste (tomar el cuchillo por el mango, dejarlo después, alinear los bordes) es exactamente la clase de detalle que produce errores en un programa. La computadora es ese robot.</p>`
        },
        {
          n: 4,
          titulo: 'Euclides a mano',
          enunciado: 'El algoritmo de Euclides calcula el máximo común divisor así: mientras <code>b</code> no sea 0, reemplaza el par <code>(a, b)</code> por <code>(b, a mod b)</code>; cuando <code>b</code> llegue a 0, el MCD es <code>a</code>. Ejecútalo a mano con <code>a = 1071</code> y <code>b = 462</code>, mostrando cada paso en una tabla. Luego argumenta por qué siempre termina.',
          pista: '<code>a mod b</code> es el resto de dividir a entre b. Observa qué le pasa al segundo número en cada vuelta.',
          solucion: `${tabla(['#Vuelta', '#a', '#b', '#a mod b'], [
            ['1', '1071', '462', '147'], ['2', '462', '147', '21'],
            ['3', '147', '21', '0'], ['4', '21', '0', '— termina']
          ], 'El MCD de 1071 y 462 es 21.')}
<p><b>¿Por qué termina siempre?</b> Porque el resto de una división entera es siempre estrictamente menor que el divisor: <code>a mod b &lt; b</code>. Entonces el valor de <code>b</code> disminuye en cada vuelta y, al ser un entero no negativo, no puede disminuir indefinidamente: en algún momento llega a 0. Este razonamiento (encontrar una cantidad entera que decrece y está acotada por abajo) es la forma estándar de demostrar la <b>finitud</b> de un bucle, y lo volverás a usar muchas veces.</p>`
        },
        {
          n: 5,
          titulo: 'Un problema sin algoritmo',
          enunciado: 'Explica con tus palabras por qué no puede existir un programa <code>¿SeDetiene(P, e)?</code> que, para cualquier programa <code>P</code> y cualquier entrada <code>e</code>, responda siempre y correctamente si <code>P</code> termina con esa entrada. Construye la contradicción.',
          pista: 'Supón que existe y úsalo para construir un programa malicioso que haga lo contrario de lo que ¿SeDetiene? predice sobre sí mismo.',
          solucion: `<p>Supongamos que <code>¿SeDetiene(P, e)</code> existe y siempre acierta. Construimos entonces este programa:</p>
${cod('pseudo', `Algoritmo Rebelde
	// recibe el texto de un programa X
	Si ¿SeDetiene(X, X) Entonces
		Mientras Verdadero Hacer    // se cuelga a propósito
		FinMientras
	Sino
		Escribir "termino"          // termina a propósito
	FinSi
FinAlgoritmo`)}
<p>Ahora preguntamos: ¿qué hace <code>Rebelde</code> cuando le damos como entrada su propio texto?</p>
<ul>
  <li>Si <code>¿SeDetiene(Rebelde, Rebelde)</code> responde «sí, termina», entonces <code>Rebelde</code> entra al bucle infinito y <b>no</b> termina. La predicción fue falsa.</li>
  <li>Si responde «no, no termina», entonces <code>Rebelde</code> escribe «termino» y <b>sí</b> termina. La predicción también fue falsa.</li>
</ul>
<p>En ambos casos el oráculo se equivoca, lo que contradice la suposición de que siempre acierta. Por lo tanto <code>¿SeDetiene?</code> no puede existir. Esto es el <b>problema de la parada</b> de Turing (1936), y es la razón de fondo por la que ningún analizador de código puede garantizar que tu programa no se cuelgue: solo puede dar aproximaciones.</p>`
        }
      ],
      quiz: [
        { p: '¿Cuál de estos procedimientos <b>no</b> es un algoritmo?',
          ops: ['Sumar los 100 primeros números naturales', 'Buscar un nombre en una lista ordenada',
            'Repetir «hola» mientras 1 sea igual a 1', 'Calcular el área de un triángulo dadas su base y altura'],
          ok: 2, exp: 'Viola la propiedad de finitud: la condición <code>1 = 1</code> nunca se vuelve falsa, así que el procedimiento no termina nunca.' },
        { p: 'Un algoritmo escrito en Python y el mismo algoritmo escrito en C son…',
          ops: ['dos algoritmos distintos', 'dos programas distintos del mismo algoritmo',
            'dos procesos', 'lo mismo en todos los sentidos'],
          ok: 1, exp: 'El algoritmo es la idea; el programa es su escritura en un lenguaje concreto. Un proceso es el programa mientras corre.' },
        { p: '¿Cuántos datos de entrada debe tener como mínimo un algoritmo?',
          ops: ['Uno', 'Dos', 'Ninguno: puede tener cero entradas', 'Tantos como salidas'],
          ok: 2, exp: 'Puede tener cero entradas (por ejemplo, un algoritmo que imprime los 10 primeros números primos), pero debe producir al menos una salida.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm0-2',
      titulo: 'Descomponer, abstraer y reconocer patrones',
      resumen: 'Las cuatro herramientas del pensamiento computacional y cómo atacar un problema que te queda grande.',
      objetivos: [
        'Partir un problema grande en subproblemas que quepan en tu cabeza',
        'Distinguir qué detalles son esenciales y cuáles se pueden abstraer',
        'Reconocer cuándo dos problemas distintos son el mismo problema disfrazado'
      ],
      lectura: `
<p>Cuando un problema te parece imposible, casi nunca es porque sea difícil: es porque es <em>grande</em>. Tu memoria de
trabajo maneja unas pocas cosas a la vez, y un problema grande no cabe. La solución no es pensar más fuerte, sino aplicar
cuatro técnicas que en conjunto se llaman <strong>pensamiento computacional</strong>.</p>

<h2>1. Descomposición</h2>
<p>Partir el problema en pedazos que puedas resolver por separado. La prueba de que un pedazo es lo bastante pequeño es
que puedes describir qué recibe y qué devuelve en una sola frase.</p>

<p>Supón que quieres programar un sistema para tu negocio que «controle el inventario». Eso no se puede programar: es un
deseo, no un problema. Descompuesto, aparece esto:</p>

<ul>
  <li>Registrar un producto nuevo (código, nombre, precio, cantidad).</li>
  <li>Buscar un producto por código.</li>
  <li>Aumentar la cantidad cuando llega mercadería.</li>
  <li>Disminuir la cantidad cuando se vende.</li>
  <li>Avisar cuando la cantidad baja de un mínimo.</li>
  <li>Listar todo el inventario ordenado por nombre.</li>
</ul>

<p>Ahora sí hay seis problemas programables. Y fíjate en algo importante: «aumentar» y «disminuir» son casi el mismo
problema (cambiar una cantidad sumando un número positivo o negativo), y «buscar por código» aparece dentro de casi todos
los demás. Descomponer no solo reduce el tamaño: revela repeticiones.</p>

<h2>2. Abstracción</h2>
<p>Abstraer es decidir qué ignorar. Un mapa del metro es útil precisamente porque <em>miente</em> sobre la geografía: las
distancias no son reales, las curvas no son reales, pero la información que necesitas (qué estación sigue, dónde cambiar
de línea) está perfecta. Un mapa fiel a la escala sería más exacto y menos útil.</p>

<p>En programación abstraes todo el tiempo:</p>
${tabla(['Cosa real', 'Lo que guardas', 'Lo que decides ignorar'], [
  ['Un cliente', 'nombre, documento, teléfono', 'su estatura, su color favorito, su historia'],
  ['Una fecha', 'día, mes, año', 'la hora exacta, el huso horario, los segundos intercalares'],
  ['Un producto', 'código, descripción, precio, stock', 'su peso real, su textura, su olor']
], 'Abstraer es quedarse con los datos que el problema necesita, no con todos los que existen.')}

${nota('Cuidado con abstraer de más', '<p>Si guardas el precio pero no la moneda, tu sistema funciona hasta el día en que te ' +
  'compren desde otro país. Gran parte de la experiencia de un programador consiste en haber elegido mal lo que ignoró, ' +
  'y acordarse de eso la próxima vez.</p>', 'warn')}

<h2>3. Reconocimiento de patrones</h2>
<p>Dos problemas que parecen distintos suelen ser el mismo. Mira estos tres:</p>
<ul>
  <li>Encontrar la nota más alta de un salón.</li>
  <li>Encontrar el producto más caro del inventario.</li>
  <li>Encontrar el día más frío del mes.</li>
</ul>
<p>Los tres son el patrón <strong>«máximo de una colección»</strong>: guardas un candidato, recorres el resto y lo reemplazas
cuando encuentras algo mejor. Si lo resuelves una vez de forma general, lo resolviste para siempre. Este curso te va a dar
un vocabulario de patrones (contador, acumulador, bandera, centinela, búsqueda, máximo, intercambio) que cubre
la enorme mayoría de los ejercicios que vas a encontrar.</p>

<h2>4. Diseño de algoritmos</h2>
<p>Es el paso final: escribir la secuencia concreta. Y aquí va el consejo más práctico de todo el módulo: <strong>resuelve
el problema a mano primero</strong>, con datos pequeños y concretos, anotando lo que haces. Si no sabes cómo encontrar el
mayor de cinco números con lápiz y papel, no vas a poder escribirlo en ningún lenguaje.</p>

<h3>Un método que funciona siempre</h3>
<ol>
  <li><strong>Lee el enunciado dos veces</strong> y subraya los datos (entradas) y lo que te piden (salidas).</li>
  <li><strong>Inventa un caso pequeño</strong> con números concretos y resuélvelo a mano.</li>
  <li><strong>Describe lo que hiciste</strong> en frases, en el orden en que lo hiciste.</li>
  <li><strong>Busca el patrón</strong>: ¿hay algo que repetiste? Eso será un bucle. ¿Hubo un «si pasa esto, entonces…»? Eso será un condicional.</li>
  <li><strong>Prueba casos límite</strong>: la lista vacía, un solo elemento, todos iguales, negativos, el cero.</li>
  <li><strong>Recién ahora</strong> escribe el pseudocódigo y después el código.</li>
</ol>

<p>El paso 5 es el que distingue a un principiante de alguien con oficio. Los casos límite son donde vive el 90% de los
errores reales: la lista vacía, el usuario que escribe letras donde esperabas números, el mes con 28 días.</p>
      `,
      ejercicios: [
        {
          n: 1,
          titulo: 'Descompón una tarea diaria',
          enunciado: 'Descompón «pagar el recibo de luz por internet» en al menos 6 subproblemas, cada uno descrito con su entrada y su salida en una frase.',
          pista: 'Piensa en todo lo que ocurre entre abrir la página y recibir el comprobante.',
          solucion: `<ol>
<li><b>Autenticar al usuario.</b> Entrada: usuario y clave. Salida: sesión válida o error.</li>
<li><b>Localizar el suministro.</b> Entrada: número de cliente. Salida: datos del suministro.</li>
<li><b>Listar deudas pendientes.</b> Entrada: suministro. Salida: lista de recibos con monto y vencimiento.</li>
<li><b>Calcular el total a pagar.</b> Entrada: recibos seleccionados. Salida: monto total con moras si corresponde.</li>
<li><b>Procesar el pago.</b> Entrada: total y datos de la tarjeta. Salida: autorización o rechazo.</li>
<li><b>Registrar y notificar.</b> Entrada: autorización. Salida: comprobante en pantalla y correo enviado.</li>
</ol>
<p>Observa que «autenticar al usuario» reaparece en cualquier sistema con cuentas: es un subproblema reutilizable, no parte del problema de la luz.</p>`
        },
        {
          n: 2,
          titulo: 'Abstrae un vehículo',
          enunciado: 'Una app de taxis y una aseguradora de autos guardan datos sobre el mismo vehículo. Escribe qué datos guardaría cada una y explica por qué difieren.',
          pista: 'La abstracción correcta depende de la pregunta que el sistema necesita responder.',
          solucion: `<p><b>App de taxis:</b> placa, marca y modelo (para que el pasajero lo reconozca), color, capacidad de pasajeros, posición GPS actual, estado (libre/ocupado), conductor asignado.</p>
<p><b>Aseguradora:</b> placa, número de motor y de chasis, año de fabricación, valor comercial, historial de siniestros, titular legal, tipo de uso (particular o comercial).</p>
<p><b>Por qué difieren:</b> la app necesita responder «¿qué auto llega y dónde está ahora?»; la aseguradora necesita responder «¿cuánto cuesta cubrir este riesgo y a quién le pago?». El mismo objeto del mundo real produce dos abstracciones casi sin datos en común. No existe «la» representación correcta de un auto: existe la correcta <i>para un propósito</i>.</p>`
        },
        {
          n: 3,
          titulo: 'El mismo problema disfrazado',
          enunciado: 'Agrupa estos seis problemas en patrones y nombra cada patrón: (a) contar cuántos alumnos aprobaron; (b) sumar las ventas del mes; (c) ver si algún producto está agotado; (d) hallar el alumno más joven; (e) contar cuántas vocales tiene una palabra; (f) ver si una contraseña tiene al menos un número.',
          pista: 'Hay tres patrones y cada uno aparece dos veces.',
          solucion: `<p><b>Patrón «contador condicional»</b> — recorre, y cada vez que se cumple una condición suma 1: <b>(a)</b> y <b>(e)</b>.</p>
<p><b>Patrón «acumulador»</b> — recorre, y va sumando valores: <b>(b)</b>. Y <b>(d)</b> es el patrón «mínimo».</p>
<p><b>Patrón «bandera» o «existe alguno»</b> — recorre hasta encontrar el primero que cumple y recuerda que lo encontró: <b>(c)</b> y <b>(f)</b>.</p>
<p>Corrección del agrupamiento: quedan <b>(a, e)</b> contador, <b>(b)</b> acumulador, <b>(d)</b> extremo (mínimo/máximo) y <b>(c, f)</b> bandera. Lo valioso es darse cuenta de que resolver <b>(c)</b> te da gratis <b>(f)</b>: cambia solo la condición.</p>`
        },
        {
          n: 4,
          titulo: 'Casos límite',
          enunciado: 'Alguien escribió un algoritmo que «calcula el promedio de una lista de notas». Enumera al menos 6 casos límite que deberías probar antes de considerarlo correcto, y di qué debería hacer el algoritmo en cada uno.',
          pista: 'Piensa en el tamaño de la lista, en los valores extremos y en datos que no deberían existir.',
          solucion: `<ol>
<li><b>Lista vacía:</b> dividir entre 0. Debe informar «no hay notas» en lugar de fallar.</li>
<li><b>Una sola nota:</b> el promedio es esa nota. Comprueba que no haya un <code>-1</code> perdido en el conteo.</li>
<li><b>Todas iguales:</b> el promedio debe ser exactamente ese valor, sin error de redondeo visible.</li>
<li><b>Notas en los extremos (0 y 20):</b> verifica que no haya un filtro que descarte el 0 por «falso».</li>
<li><b>Nota fuera de rango (25, −3):</b> ¿se rechaza, se ignora o se acepta? Hay que decidirlo explícitamente.</li>
<li><b>Entrada no numérica («abc», vacío):</b> debe pedirla de nuevo, no sumar basura.</li>
<li><b>Lista enorme:</b> ¿la suma desborda el tipo de dato? Con enteros de 32 bits y millones de valores grandes, sí.</li>
</ol>
<p>Escribir esta lista <i>antes</i> de programar se llama pensar en términos de pruebas, y es lo que convierte código que «funciona en mi máquina» en código que funciona.</p>`
        },
        {
          n: 5,
          titulo: 'Diseña sin código: el vuelto',
          enunciado: 'Diseña (en frases, sin pseudocódigo todavía) un algoritmo que calcule el vuelto de una compra usando la menor cantidad posible de billetes y monedas, con las denominaciones peruanas: 200, 100, 50, 20, 10 soles en billetes y 5, 2, 1, 0.50, 0.20, 0.10 en monedas. Explica por qué recorrer las denominaciones de mayor a menor da el resultado óptimo con este sistema de monedas y muestra un sistema donde esa estrategia falla.',
          pista: 'La estrategia «toma siempre la más grande que quepa» se llama algoritmo voraz (greedy).',
          solucion: `<p><b>Diseño:</b></p>
<ol>
<li>Calcula el vuelto como <code>pagado − total</code>; si es negativo, informa que falta dinero y termina.</li>
<li>Convierte el vuelto a céntimos (multiplica por 100 y redondea) para no trabajar con decimales. Este detalle evita errores de punto flotante y es un reflejo profesional.</li>
<li>Guarda las denominaciones en céntimos, ordenadas de mayor a menor: 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10.</li>
<li>Para cada denominación: cuántas veces cabe en lo que falta (división entera); si cabe al menos una, anótala y réstale ese monto a lo que falta.</li>
<li>Cuando lo que falta llegue a 0, informa la lista de denominaciones y cantidades.</li>
</ol>
<p><b>Por qué funciona aquí:</b> el sistema peruano es «canónico»: cada denominación es múltiplo o divisor conveniente de las demás, así que tomar la más grande posible nunca te obliga a usar más piezas después. Esta propiedad hay que verificarla, no suponerla.</p>
<p><b>Un sistema donde falla:</b> imagina monedas de 1, 3 y 4. Para dar 6, el algoritmo voraz toma 4 + 1 + 1 = <b>3 monedas</b>, pero la solución óptima es 3 + 3 = <b>2 monedas</b>. Con denominaciones arbitrarias el problema requiere programación dinámica (módulo 7). Moraleja: una estrategia que parece obviamente óptima puede no serlo, y la diferencia entre creerlo y demostrarlo es lo que separa el código que funciona del que funciona por casualidad.</p>`
        }
      ],
      quiz: [
        { p: 'Abstraer, en programación, significa…',
          ops: ['hacer el código más difícil de entender', 'quedarse con los datos relevantes para el problema e ignorar el resto',
            'usar nombres de variables cortos', 'escribir el programa en lenguaje de máquina'],
          ok: 1, exp: 'Abstraer es elegir qué ignorar. Un buen modelo guarda lo que el problema necesita y nada más.' },
        { p: '¿Cuál es el momento correcto para pensar en los casos límite?',
          ops: ['Después de que el usuario reporte el error', 'Al diseñar, antes de escribir el código',
            'Nunca: el lenguaje los maneja solo', 'Solo en programas grandes'],
          ok: 1, exp: 'Pensarlos al diseñar cuesta minutos; descubrirlos en producción cuesta mucho más. Además, la lista de casos límite es prácticamente la lista de tus pruebas.' },
        { p: '«Contar cuántos números negativos hay en una lista» y «contar cuántas letras A tiene un texto» son…',
          ops: ['problemas sin relación', 'el mismo patrón con distinta condición',
            'ambos el patrón acumulador', 'ambos imposibles sin bucles anidados'],
          ok: 1, exp: 'Los dos son el patrón contador condicional: recorrer una colección y sumar 1 cuando se cumple una condición. Solo cambia la condición.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm0-3',
      titulo: 'Cómo se ejecuta un programa: el modelo mental',
      resumen: 'Qué hace la máquina línea por línea, qué es el estado y por qué la asignación no es una ecuación.',
      objetivos: [
        'Simular en papel la ejecución de un programa paso a paso',
        'Entender el estado como el conjunto de valores en un instante dado',
        'Distinguir la asignación de la igualdad matemática'
      ],
      lectura: `
<p>Los principiantes no fallan por no saber la sintaxis: fallan porque no tienen un <strong>modelo mental</strong> de lo que
hace la máquina. Vamos a construirlo ahora, porque es la diferencia entre adivinar y saber.</p>

<h2>La máquina es tonta y ordenada</h2>
<p>Imagina un empleado con tres reglas:</p>
<ol>
  <li>Lee una instrucción de la lista, la ejecuta y pasa a la siguiente.</li>
  <li>Tiene una pizarra con casillas etiquetadas; en cada casilla cabe un solo valor.</li>
  <li>No sabe nada más. No deduce, no supone, no corrige.</li>
</ol>
<p>Ese empleado es el procesador, la pizarra es la memoria y las casillas son las variables. Todo lo que vas a programar
se explica con esta imagen.</p>

<h2>La asignación no es una igualdad</h2>
<p>Esta es la confusión número uno de quien viene de las matemáticas. En matemática, <code>x = x + 1</code> es una ecuación
sin solución. En programación, <code>x ← x + 1</code> es una <strong>orden</strong> que se lee de derecha a izquierda:</p>

<blockquote><p>«Toma el valor que hay ahora en la casilla <code>x</code>, súmale 1 y guarda el resultado en la casilla
<code>x</code>, borrando lo que había».</p></blockquote>

<p>Por eso en pseudocódigo escribimos la flecha <code>←</code> en lugar del signo igual: para recordarte que hay una
dirección. El valor viaja hacia la casilla.</p>

${cod('pseudo', `a <- 5        // la casilla a contiene 5
b <- a        // se COPIA el valor: a=5, b=5
a <- 9        // solo cambia a: a=9, b sigue en 5
b <- b + a    // b = 5 + 9 = 14`)}

${nota('Un error clásico', '<p>Mucha gente espera que, al haber escrito <code>b ← a</code>, la casilla <code>b</code> ' +
  '«siga» a <code>a</code> cuando esta cambie. No: se copió el valor en ese instante, y la relación terminó ahí. ' +
  'Las variables guardan valores, no fórmulas.</p>', 'warn')}

<h2>El estado y la prueba de escritorio</h2>
<p>El <strong>estado</strong> de un programa es la foto de todas sus casillas en un momento dado. Ejecutar un programa es
transformar un estado en otro, instrucción por instrucción. La técnica para seguirlo a mano se llama <strong>prueba de
escritorio</strong> o <strong>traza</strong>: una tabla con una columna por variable y una fila por paso.</p>

<p>Tracemos este intercambio de valores, que es el ejercicio clásico:</p>

${cod('pseudo', `Algoritmo Intercambio
	Definir a, b, temp Como Entero
	a <- 3
	b <- 7
	temp <- a
	a <- b
	b <- temp
	Escribir "a=", a, " b=", b
FinAlgoritmo`)}

${tabla(['#Paso', 'Instrucción', '#a', '#b', '#temp', 'Qué pasó'], [
  ['1', '<code>a ← 3</code>', '3', '—', '—', 'a recibe 3'],
  ['2', '<code>b ← 7</code>', '3', '7', '—', 'b recibe 7'],
  ['3', '<code>temp ← a</code>', '3', '7', '3', 'se guarda una copia de a'],
  ['4', '<code>a ← b</code>', '7', '7', '3', 'a se pierde, pero estaba copiado'],
  ['5', '<code>b ← temp</code>', '7', '3', '3', 'b recupera el 3 original'],
  ['6', '<code>Escribir…</code>', '7', '3', '3', 'muestra <code>a=7 b=3</code>']
], 'Prueba de escritorio del intercambio. La variable temporal existe porque el paso 4 destruye el valor de a.')}

<p>¿Por qué no basta con <code>a ← b</code> y luego <code>b ← a</code>? Porque después del primer paso ya no existe el valor
original de <code>a</code> en ninguna parte: ambas casillas valen 7. La variable temporal no es un capricho del profesor,
es la única forma de no perder información cuando solo puedes mover un valor a la vez.</p>

<h2>El flujo de control</h2>
<p>Por defecto el empleado va de arriba hacia abajo, una instrucción tras otra: eso es la <strong>secuencia</strong>. Solo
hay dos formas de alterar ese flujo, y con ellas se construye absolutamente todo:</p>
<ul>
  <li><strong>Selección:</strong> saltarse un bloque según una condición (el <code>Si</code>).</li>
  <li><strong>Repetición:</strong> volver atrás y repetir un bloque (el <code>Mientras</code>).</li>
</ul>
<p>Eso es todo. En 1966, Böhm y Jacopini demostraron un resultado notable: <strong>cualquier</strong> programa, por complicado
que sea, puede escribirse usando solo secuencia, selección y repetición. Es el <em>teorema de la programación estructurada</em>,
y es la razón por la que este curso insiste tanto en esas tres estructuras: no son tres de muchas, son las tres.</p>

<h2>Tu programa frente a la máquina real</h2>
<p>Para cerrar el modelo mental, conviene saber en qué se convierte lo que escribes:</p>
${tabla(['Nivel', 'Qué ves', 'Quién lo entiende'], [
  ['Tu idea', 'un diagrama, un pseudocódigo', 'tú y tus compañeros'],
  ['Código fuente', '<code>total = a + b</code>', 'el compilador o intérprete'],
  ['Ensamblador', '<code>ADD R1, R2, R3</code>', 'el procesador, con nombres legibles'],
  ['Lenguaje de máquina', '<code>10001011 11000001</code>', 'el circuito, literalmente'],
  ['Electricidad', 'voltajes alto y bajo', 'los transistores']
], 'De tu idea a los voltajes. Cada fila es una traducción mecánica de la anterior; el módulo 1 y el módulo 9 explican cómo ocurre cada salto.')}
      `,
      ejercicios: [
        {
          n: 1,
          titulo: 'Traza elemental',
          enunciado: 'Haz la prueba de escritorio de este fragmento y di qué muestra: <br><code>x ← 2</code><br><code>y ← x * 3</code><br><code>x ← x + y</code><br><code>y ← y − x</code><br><code>Escribir x, " ", y</code>',
          pista: 'Una fila por instrucción; copia los valores que no cambian.',
          solucion: `${tabla(['#Paso', 'Instrucción', '#x', '#y'], [
            ['1', 'x ← 2', '2', '—'], ['2', 'y ← x * 3', '2', '6'],
            ['3', 'x ← x + y', '8', '6'], ['4', 'y ← y − x', '8', '−2']
          ])}<p>Muestra <code>8 -2</code>. El paso 4 usa el <b>nuevo</b> valor de x (8), no el original: siempre se evalúa con el estado actual.</p>`
        },
        {
          n: 2,
          titulo: 'Intercambio sin variable temporal',
          enunciado: 'Intercambia los valores de dos variables numéricas <code>a</code> y <code>b</code> sin usar una tercera variable, solo con sumas y restas. Traza tu solución con <code>a=4, b=9</code> y explica en qué caso real esta técnica sería peligrosa.',
          pista: 'Si guardas la suma en una de las dos casillas, puedes recuperar cada valor original restando.',
          solucion: `${cod('pseudo', `a <- a + b     // a = 13, b = 9
b <- a - b     // b = 13 - 9 = 4   (el a original)
a <- a - b     // a = 13 - 4 = 9   (el b original)`)}
${tabla(['#Paso', '#a', '#b'], [['inicio', '4', '9'], ['1', '13', '9'], ['2', '13', '4'], ['3', '9', '4']])}
<p><b>Por qué es peligrosa:</b> si <code>a</code> y <code>b</code> son enteros grandes, <code>a + b</code> puede <b>desbordar</b> el tipo de dato y producir basura. Con números reales, además, se pierde precisión. Y si por error ambas variables son la misma casilla, el valor queda en 0. En código real se usa la variable temporal: es más clara, más rápida y no tiene estos riesgos. El truco sirve para entender el estado, no para producción.</p>`
        },
        {
          n: 3,
          titulo: 'Encuentra el error de estado',
          enunciado: 'Este algoritmo debería mostrar la suma de 1 a 5 (es decir, 15) pero muestra 5. Encuentra el error, explica qué pasa en cada vuelta y corrígelo.',
          pista: 'Dibuja la traza de las dos variables en cada vuelta y mira dónde se pierde la suma anterior.',
          lab: 'Algoritmo SumaRota\n\tDefinir i, suma Como Entero\n\tPara i <- 1 Hasta 5 Con Paso 1 Hacer\n\t\tsuma <- i\n\tFinPara\n\tEscribir suma\nFinAlgoritmo',
          solucion: `<p>El error está en <code>suma ← i</code>: eso <b>reemplaza</b> el contenido de <code>suma</code> en cada vuelta en lugar de agregarle. Al terminar, <code>suma</code> contiene solo el último valor de <code>i</code>, que es 5.</p>
${tabla(['#Vuelta', '#i', 'suma ← i (mal)', 'suma ← suma + i (bien)'], [
  ['1', '1', '1', '1'], ['2', '2', '2', '3'], ['3', '3', '3', '6'], ['4', '4', '4', '10'], ['5', '5', '5', '15']
])}
<p>Corregido:</p>
${cod('pseudo', `Algoritmo SumaCorrecta
	Definir i, suma Como Entero
	suma <- 0                 // el acumulador SIEMPRE se inicializa
	Para i <- 1 Hasta 5 Con Paso 1 Hacer
		suma <- suma + i
	FinPara
	Escribir suma
FinAlgoritmo`)}
<p>Este es el patrón <b>acumulador</b>, y tiene dos reglas que valen oro: inicialízalo antes del bucle y acumula sobre su propio valor dentro del bucle.</p>`
        },
        {
          n: 4,
          titulo: 'Rotación de tres valores',
          enunciado: 'Tienes <code>a=1, b=2, c=3</code>. Escribe las asignaciones necesarias para que queden <code>a=3, b=1, c=2</code> (cada valor se mueve una posición a la derecha, circularmente) usando una sola variable temporal. Traza el resultado.',
          pista: 'Decide primero qué valor vas a salvar en temp: el que se va a sobrescribir primero.',
          solucion: `${cod('pseudo', `temp <- c      // temp=3  (salvamos el que se perdería)
c <- b         // c=2
b <- a         // b=1
a <- temp      // a=3`)}
${tabla(['#Paso', '#a', '#b', '#c', '#temp'], [
  ['inicio', '1', '2', '3', '—'], ['1', '1', '2', '3', '3'],
  ['2', '1', '2', '2', '3'], ['3', '1', '1', '2', '3'], ['4', '3', '1', '2', '3']
])}
<p>La regla general: en una rotación hay que recorrer las asignaciones <b>en sentido contrario</b> al movimiento de los datos, y salvar primero el eslabón que se va a sobrescribir.</p>`
        },
        {
          n: 5,
          titulo: 'Simula la máquina',
          enunciado: 'Este programa usa solo tres instrucciones de una máquina imaginaria: <code>CARGA v</code> (pone v en el acumulador), <code>SUMA dir</code> (suma a lo que hay en el acumulador el contenido de la casilla dir), <code>GUARDA dir</code> (copia el acumulador a la casilla dir) y <code>SALTA_SI_CERO dir, linea</code>. Traza la ejecución y di qué calcula.<br><pre>1  CARGA 0\n2  GUARDA 100        ; casilla 100 = resultado\n3  CARGA 5\n4  GUARDA 101        ; casilla 101 = contador\n5  CARGA 101\n6  SALTA_SI_CERO 101, 12\n7  CARGA 100\n8  SUMA 101\n9  GUARDA 100\n10 CARGA 101\n11 RESTA_UNO_Y_GUARDA 101, 5\n12 FIN</pre>',
          pista: 'Lleva dos columnas: casilla 100 y casilla 101, además del acumulador. La línea 11 resta 1 a la casilla 101 y vuelve a la línea 5.',
          solucion: `${tabla(['#Vuelta', 'Casilla 101 (contador)', 'Casilla 100 (resultado)'], [
            ['antes', '5', '0'], ['1', '4', '5'], ['2', '3', '9'],
            ['3', '2', '12'], ['4', '1', '14'], ['5', '0', '15']
          ], 'La casilla 100 acumula 5+4+3+2+1.')}
<p>El programa calcula la <b>suma de los enteros de 1 a 5</b>, es decir 15, usando un contador que decrece y un acumulador. Y eso es exactamente lo que hace un procesador real: un acumulador, unas pocas instrucciones, y un salto condicional que permite repetir. Todas las estructuras elegantes que aprenderás (<code>Para</code>, <code>Mientras</code>, funciones, objetos) terminan compiladas en algo muy parecido a estas doce líneas. Lo verás con detalle en el módulo 9.</p>`
        }
      ],
      quiz: [
        { p: 'Después de <code>a ← 5</code>, <code>b ← a</code>, <code>a ← 8</code>, ¿cuánto vale <code>b</code>?',
          ops: ['8', '5', '13', 'depende del lenguaje'],
          ok: 1, exp: '<code>b ← a</code> copió el valor 5 en ese instante. Cambiar <code>a</code> después no afecta a <code>b</code>.' },
        { p: '¿Cuántas estructuras de control bastan para escribir cualquier programa?',
          ops: ['Una: la secuencia', 'Dos: secuencia y selección', 'Tres: secuencia, selección y repetición', 'Cinco o más'],
          ok: 2, exp: 'El teorema de Böhm-Jacopini (1966) demuestra que secuencia, selección y repetición son suficientes para expresar cualquier algoritmo.' },
        { p: 'El «estado» de un programa es…',
          ops: ['el lenguaje en que está escrito', 'el conjunto de valores de todas sus variables en un instante',
            'la cantidad de líneas que tiene', 'si está compilado o interpretado'],
          ok: 1, exp: 'El estado es la foto de la memoria en un momento dado. Ejecutar es transformar un estado en el siguiente.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm0-4',
      titulo: 'Errores y depuración: tu oficio real',
      resumen: 'Los tres tipos de error, cómo leer un mensaje de error y el método para encontrar un fallo sin adivinar.',
      objetivos: [
        'Distinguir errores de sintaxis, de ejecución y de lógica',
        'Leer un mensaje de error y extraer la información útil',
        'Aplicar un método sistemático de depuración en lugar de cambiar cosas al azar'
      ],
      lectura: `
<p>Vas a pasar más tiempo arreglando código que escribiéndolo. Eso no es un defecto de tu aprendizaje: es la profesión.
La diferencia entre alguien que avanza rápido y alguien que se frustra es que el primero tiene un <strong>método</strong>
para depurar, y el segundo cambia cosas al azar esperando que funcione.</p>

<h2>Los tres tipos de error</h2>

${tabla(['Tipo', 'Cuándo aparece', 'Quién lo detecta', 'Ejemplo'], [
  ['<b>Sintaxis</b>', 'Antes de ejecutar', 'El compilador o intérprete', 'Falta un <code>FinSi</code>, un paréntesis sin cerrar'],
  ['<b>Ejecución</b> (excepción)', 'Durante la ejecución', 'El programa, que se detiene', 'División entre cero, índice fuera de rango'],
  ['<b>Lógica</b>', 'Nunca, por sí solo', '<b>Tú</b>, comparando con lo esperado', 'El promedio divide entre 2 cuando hay 3 notas']
], 'Los errores de lógica son los peligrosos: el programa corre, no se queja y da un resultado equivocado.')}

<p>El orden en que los arreglarás es el de la tabla, y la dificultad crece en el mismo sentido. Un error de sintaxis te
grita. Uno de ejecución te detiene en el lugar del crimen. Uno de lógica te deja entregar una planilla de sueldos con
los montos mal calculados y enterarte un mes después.</p>

<h2>Cómo leer un mensaje de error</h2>
<p>Los principiantes ven un mensaje de error y entran en pánico o lo cierran. El mensaje contiene, casi siempre, tres
datos valiosísimos:</p>
<ol>
  <li><strong>El tipo</strong> de error (<code>TypeError</code>, <code>SyntaxError</code>, <code>IndexError</code>…).</li>
  <li><strong>La línea</strong> donde se detectó. Ojo: donde se <em>detectó</em>, no siempre donde está la causa.</li>
  <li><strong>Una descripción</strong>, a veces en inglés pero casi siempre literal y precisa.</li>
</ol>

${cod('txt', `Traceback (most recent call last):
  File "notas.py", line 12, in <module>
    promedio = suma / cantidad
ZeroDivisionError: division by zero`)}

<p>Eso dice, en orden: ocurrió en el archivo <code>notas.py</code>, línea 12, al ejecutar <code>suma / cantidad</code>,
y el problema es una división entre cero. Por lo tanto <code>cantidad</code> vale 0. La pregunta correcta no es «por qué
falla la línea 12» sino <strong>«por qué <code>cantidad</code> llegó a la línea 12 valiendo cero»</strong>, y la respuesta
está más arriba: probablemente la lista de notas estaba vacía. El error se detecta donde explota, pero se origina antes.</p>

${nota('Lee el mensaje. Literalmente.',
  '<p>El 80% de los errores de principiante se resuelven leyendo el mensaje completo en voz alta. ' +
  'Si está en inglés, tradúcelo palabra por palabra; no lo ignores. El mensaje casi nunca miente.</p>', 'key')}

<h2>El método de depuración</h2>
<p>Depurar es una investigación, no una lotería. Este método funciona siempre:</p>

<ol>
  <li><strong>Reproduce el error.</strong> Encuentra la entrada exacta y mínima con la que falla. Si falla «a veces», busca qué cambia entre las veces.</li>
  <li><strong>Formula una hipótesis concreta.</strong> No «algo está mal en el bucle», sino «creo que <code>i</code> llega a valer 6 cuando el arreglo solo tiene 5 posiciones».</li>
  <li><strong>Hazla observable.</strong> Imprime el valor de las variables sospechosas justo antes del punto crítico, o usa un depurador para detenerte ahí.</li>
  <li><strong>Confirma o descarta.</strong> Si la hipótesis era falsa, descártala del todo y formula otra. No vuelvas a ella.</li>
  <li><strong>Reduce el espacio de búsqueda por mitades.</strong> Comenta la mitad del código: si el error persiste, está en la otra mitad. Esto es búsqueda binaria aplicada a tu propio programa, y encuentra el fallo en unos pocos intentos incluso en archivos largos.</li>
  <li><strong>Arregla la causa, no el síntoma.</strong> Si el promedio sale mal con listas vacías, no pongas un <code>Si suma = 0</code> parchado: decide qué debe hacer el programa con una lista vacía.</li>
</ol>

<h3>La técnica del pato de goma</h3>
<p>Explícale el problema en voz alta a un objeto inanimado, línea por línea, como si no supiera nada. Suena absurdo y es
el truco más eficaz que existe: al forzarte a verbalizar cada paso, encuentras el salto lógico que tu cabeza estaba
rellenando sin avisar. En este curso tienes una ventaja: el <a href="#herramientas">laboratorio</a> ejecuta tu pseudocódigo
y te muestra el estado final de todas las variables, que es una prueba de escritorio automática.</p>

<h2>Errores que vas a cometer esta semana</h2>
${tabla(['Error', 'Síntoma', 'Causa habitual'], [
  ['Confundir <code>=</code> con <code>==</code>', 'La condición siempre es verdadera', 'En muchos lenguajes <code>=</code> asigna y <code>==</code> compara'],
  ['Olvidar inicializar un acumulador', 'Resultados enormes o basura', 'La variable arranca con un valor indefinido'],
  ['Error por uno (<i>off-by-one</i>)', 'Falta o sobra un elemento', 'Confundir «hasta n» con «hasta n−1», o empezar en 0 vs en 1'],
  ['Bucle infinito', 'El programa se cuelga', 'La variable de la condición nunca cambia dentro del bucle'],
  ['Comparar reales con <code>=</code>', 'Una condición que debería cumplirse no se cumple', '<code>0.1 + 0.2</code> no es exactamente <code>0.3</code> (módulo 1)'],
  ['Índice fuera de rango', 'El programa se detiene', 'Recorrer de 1 a n cuando el arreglo empieza en 0']
], 'Esta tabla es tu primera lista de sospechosos cada vez que algo no funciona.')}
      `,
      ejercicios: [
        {
          n: 1,
          titulo: 'Clasifica el error',
          enunciado: 'Di de qué tipo es cada error: (a) escribiste <code>Mientra</code> en lugar de <code>Mientras</code>; (b) el programa calcula el IGV multiplicando por 0.19 cuando en Perú es 0.18; (c) el programa pide el elemento 10 de un arreglo de 5; (d) el total de la boleta sale negativo.',
          pista: 'Pregúntate quién detecta el error y en qué momento.',
          solucion: `<p><b>(a) Sintaxis.</b> El intérprete no reconoce la palabra y se detiene antes de ejecutar nada.</p>
<p><b>(b) Lógica.</b> El programa corre perfectamente y entrega un número equivocado. Es el peor tipo: nadie te avisa.</p>
<p><b>(c) Ejecución.</b> Se lanza una excepción de índice fuera de rango en el momento del acceso.</p>
<p><b>(d) Lógica</b> (probablemente). El programa funcionó sin quejarse, pero el resultado es imposible. Nota que un total negativo es también una buena oportunidad para una <b>validación defensiva</b>: si el programa sabe que un total nunca puede ser negativo, puede detectarlo y avisar en lugar de seguir.</p>`
        },
        {
          n: 2,
          titulo: 'Lee el error',
          enunciado: 'Un alumno te muestra este mensaje y dice «no entiendo, la línea 7 está bien»:<br><pre>IndexError: list index out of range\n  File "ventas.py", line 7\n    print(ventas[i])</pre>¿Qué le preguntas y en qué orden?',
          pista: 'El error se detecta en la línea 7, pero el valor de i se decidió antes.',
          solucion: `<ol>
<li><b>«¿Cuánto vale <code>i</code> exactamente en el momento del fallo?»</b> — se averigua imprimiéndolo justo antes, o mirando el depurador.</li>
<li><b>«¿Cuántos elementos tiene <code>ventas</code>?»</b> — porque el problema es la relación entre esos dos números, no la línea.</li>
<li><b>«¿Cómo se construyó el bucle que fija <code>i</code>?»</b> — ahí está casi seguro la causa: un <code>range(1, len(ventas)+1)</code> en lugar de <code>range(len(ventas))</code>, un índice que empieza en 1 cuando las listas de Python empiezan en 0, o una lista que quedó vacía.</li>
</ol>
<p>La lección: <b>la línea del error es la escena del crimen, no el domicilio del culpable</b>. Y el error de este alumno tiene nombre propio: <i>off-by-one</i>.</p>`
        },
        {
          n: 3,
          titulo: 'Depura por mitades',
          enunciado: 'Tienes un algoritmo de 80 líneas que debería imprimir un reporte y no imprime nada. No tienes depurador, solo la posibilidad de agregar <code>Escribir</code>. Describe cuántas pruebas necesitas, en el peor caso, para localizar la línea culpable y cómo las ordenas.',
          pista: 'Cada prueba debería descartar la mitad de las líneas restantes.',
          solucion: `<p>Coloca un <code>Escribir "llegué a la línea 40"</code> en el medio y ejecuta:</p>
<ul>
<li>Si el mensaje aparece, el problema está en las líneas 41–80.</li>
<li>Si no aparece, está en las líneas 1–40.</li>
</ul>
<p>Repite dentro de la mitad sospechosa. Cada prueba divide el espacio en dos, así que el número de pruebas en el peor caso es <b>log₂(80) ≈ 7</b>. Con búsqueda lineal (poner un <code>Escribir</code> línea por línea) podrías necesitar 80.</p>
<p>Esto es exactamente el algoritmo de <b>búsqueda binaria</b> del módulo 7, y es la misma idea que usa <code>git bisect</code> para encontrar en qué commit se rompió un proyecto. Un algoritmo que aprendes para ordenar datos acaba sirviéndote para depurar tu propio trabajo: eso pasa todo el tiempo.</p>`
        },
        {
          n: 4,
          titulo: 'Encuentra los tres errores',
          enunciado: 'Este algoritmo debería contar cuántos números de una lista de 5 son mayores que 10, pero tiene tres errores distintos (uno de cada tipo si lo ejecutas mentalmente). Encuéntralos y corrígelos. Pruébalo en el laboratorio.',
          lab: 'Algoritmo ContarGrandes\n\tDefinir i, cuantos Como Entero\n\tDimension datos[5]\n\tdatos[1] <- 4\n\tdatos[2] <- 15\n\tdatos[3] <- 10\n\tdatos[4] <- 23\n\tdatos[5] <- 8\n\tPara i <- 1 Hasta 6 Con Paso 1 Hacer\n\t\tSi datos[i] >= 10 Entonces\n\t\t\tcuantos <- cuantos + 1\n\t\tFinSi\n\tFinPara\n\tEscribir "Mayores que 10: ", cuantos\nFinAlgoritmo',
          pista: 'Mira el rango del Para, la condición y qué valor tiene «cuantos» en la primera vuelta.',
          solucion: `<p><b>Error 1 — ejecución (índice fuera de rango):</b> el <code>Para</code> va <code>Hasta 6</code> pero el arreglo tiene 5 casillas. Debe ser <code>Hasta 5</code>. Este es el <i>off-by-one</i> clásico.</p>
<p><b>Error 2 — lógica (condición):</b> se pide «mayores que 10» y la condición es <code>&gt;= 10</code>, que incluye el 10 mismo. Debe ser <code>&gt; 10</code>. Con los datos dados, la diferencia es entre responder 3 y responder 2.</p>
<p><b>Error 3 — lógica (acumulador sin inicializar):</b> <code>cuantos</code> nunca se puso en 0. En este intérprete <code>Definir … Como Entero</code> lo inicializa en 0 por conveniencia, pero en C o en muchos lenguajes contendría basura, y el resultado sería impredecible. Nunca dependas de la inicialización implícita.</p>
${cod('pseudo', `Algoritmo ContarGrandes
	Definir i, cuantos Como Entero
	Dimension datos[5]
	datos[1] <- 4
	datos[2] <- 15
	datos[3] <- 10
	datos[4] <- 23
	datos[5] <- 8
	cuantos <- 0                             // 3) inicialización explícita
	Para i <- 1 Hasta 5 Con Paso 1 Hacer     // 1) rango correcto
		Si datos[i] > 10 Entonces            // 2) condición correcta
			cuantos <- cuantos + 1
		FinSi
	FinPara
	Escribir "Mayores que 10: ", cuantos     // muestra 2
FinAlgoritmo`)}`
        },
        {
          n: 5,
          titulo: 'Programación defensiva',
          enunciado: 'Escribe la lista de comprobaciones (<i>asserts</i> o validaciones) que agregarías a un algoritmo que calcula el sueldo neto de un trabajador a partir del sueldo bruto, los descuentos y las horas extra, de modo que un error de lógica se delate solo en lugar de pasar inadvertido. Justifica cada comprobación.',
          pista: 'Piensa en invariantes: afirmaciones que deben ser verdaderas siempre, antes y después del cálculo.',
          solucion: `<p><b>Validaciones de entrada</b> (datos que entran del exterior y no puedes confiar en ellos):</p>
<ul>
<li><code>sueldoBruto &gt; 0</code>: un sueldo cero o negativo indica un dato mal cargado.</li>
<li><code>0 ≤ horasExtra ≤ 80</code>: un tope razonable detecta el típico error de digitar 400 en lugar de 40.</li>
<li><code>0 ≤ tasaDescuento &lt; 1</code>: una tasa expresada como 13 en lugar de 0.13 es el error más común en planillas.</li>
</ul>
<p><b>Invariantes de salida</b> (afirmaciones que deben cumplirse siempre al final):</p>
<ul>
<li><code>sueldoNeto ≤ sueldoBruto + pagoHorasExtra</code>: nadie puede recibir más de lo que generó.</li>
<li><code>sueldoNeto &gt; 0</code>: si sale negativo, los descuentos superaron el ingreso y eso requiere revisión humana, no un número en una boleta.</li>
<li><code>sueldoBruto − descuentos − sueldoNeto ≈ 0</code> (con tolerancia de un céntimo): comprueba que la cuenta cierra y detecta errores de redondeo.</li>
</ul>
<p><b>Por qué importa:</b> un error de lógica es invisible por definición. Las invariantes lo vuelven visible: convierten un error silencioso en un error de ejecución ruidoso, que es muchísimo más barato de arreglar. En la industria esto se llama <i>fail fast</i>: es mejor que el programa se detenga con un mensaje claro que entregue 3000 boletas mal calculadas.</p>`
        }
      ],
      quiz: [
        { p: '¿Cuál de estos errores <b>no</b> detiene el programa?',
          ops: ['División entre cero', 'Paréntesis sin cerrar', 'Usar 0.19 en lugar de 0.18 para el IGV', 'Índice fuera de rango'],
          ok: 2, exp: 'Es un error de lógica: el programa corre sin quejarse y entrega un resultado equivocado. Solo tú puedes detectarlo, comparando con lo esperado.' },
        { p: 'El mensaje dice «line 7» y en la línea 7 todo parece correcto. ¿Qué significa?',
          ops: ['El mensaje está equivocado', 'La causa está antes: la línea 7 es solo donde se notó',
            'Hay que reinstalar el lenguaje', 'Falta un punto y coma en la línea 6'],
          ok: 1, exp: 'El error se detecta donde explota, pero el valor equivocado se produjo antes. Hay que rastrear hacia atrás cómo llegó ese valor.' },
        { p: 'Depurar comentando la mitad del código para ver si el error persiste es…',
          ops: ['una pérdida de tiempo', 'búsqueda binaria aplicada a tu programa',
            'solo válido en lenguajes compilados', 'lo mismo que usar un depurador'],
          ok: 1, exp: 'Cada prueba descarta la mitad de las líneas, así que encuentras la causa en aproximadamente log₂(n) pruebas. Es la misma idea que <code>git bisect</code>.' }
      ]
    }
  ]
});
