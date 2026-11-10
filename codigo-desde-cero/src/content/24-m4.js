/* ===== MÓDULO 4 — Lógica de programación aplicada ===== */
CDC.registrar({
  id: 'm4',
  nivel: 'Intermedio',
  titulo: 'Lógica de programación aplicada',
  resumen: 'El catálogo de patrones que resuelve la mayoría de los ejercicios, validación robusta, manejo de cadenas y cómo atacar un problema grande.',
  intro: '<p>Ya tienes las estructuras. Este módulo te da el <em>vocabulario</em>: una docena de patrones que, combinados, ' +
    'resuelven casi cualquier ejercicio de programación que te vayan a pedir. Dejar de improvisar y empezar a reconocer ' +
    'patrones es el salto de calidad más grande que vas a dar.</p>',
  temas: [

    {
      id: 'm4-1',
      titulo: 'El catálogo de patrones',
      resumen: 'Contador, acumulador, bandera, centinela, extremo, intercambio y conteo por casillero, con su forma canónica.',
      objetivos: [
        'Reconocer qué patrón resuelve un enunciado nuevo',
        'Escribir cada patrón en su forma canónica, sin dudar de la inicialización',
        'Combinar varios patrones en un solo recorrido'
      ],
      lectura: `
<p>Un programador con experiencia no resuelve cada ejercicio desde cero: reconoce de qué tipo es y aplica una plantilla
que ya tiene interiorizada. Aquí está el catálogo completo. Memorizar la forma canónica de cada uno —sobre todo su
<strong>inicialización</strong>— elimina la mayoría de los errores de principiante.</p>

<h2>1. Contador</h2>
<p><em>Pregunta que responde:</em> ¿cuántos elementos cumplen una condición?</p>
${cod('pseudo', `cuantos <- 0                              // inicia en 0
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si condicion(a[i]) Entonces
		cuantos <- cuantos + 1            // siempre +1
	FinSi
FinPara`)}

<h2>2. Acumulador</h2>
<p><em>¿Cuál es el total / el producto de los elementos?</em></p>
${cod('pseudo', `suma <- 0                                 // neutro de la suma
producto <- 1                             // neutro del producto
Para i <- 1 Hasta n Con Paso 1 Hacer
	suma <- suma + a[i]
	producto <- producto * a[i]
FinPara`)}

<h2>3. Extremo (máximo / mínimo)</h2>
<p><em>¿Cuál es el mayor? ¿Y en qué posición está?</em></p>
${cod('pseudo', `mayor <- a[1]                             // el PRIMER elemento, nunca 0
posMayor <- 1
Para i <- 2 Hasta n Con Paso 1 Hacer      // empieza en 2
	Si a[i] > mayor Entonces
		mayor <- a[i]
		posMayor <- i
	FinSi
FinPara`)}
<p>Con <code>&gt;</code> estricto se queda la <strong>primera</strong> aparición del máximo; con <code>&gt;=</code>, la
última. Cuál quieres es una decisión, no un detalle.</p>

<h2>4. Bandera (¿existe alguno?)</h2>
<p><em>¿Hay al menos un elemento que cumpla X?</em></p>
${cod('pseudo', `hayAlguno <- Falso                        // pesimista: aún no vimos ninguno
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si condicion(a[i]) Entonces
		hayAlguno <- Verdadero
	FinSi
FinPara`)}

<h2>5. Bandera universal (¿todos cumplen?)</h2>
<p><em>¿Todos los elementos cumplen X?</em> Es el patrón espejo, y la inicialización se invierte:</p>
${cod('pseudo', `todosCumplen <- Verdadero                 // optimista: hasta ahora ninguno falla
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si NO condicion(a[i]) Entonces
		todosCumplen <- Falso             // UN contraejemplo basta
	FinSi
FinPara`)}

${nota('La asimetría que hay que entender',
  '<p>Para demostrar que «existe alguno» basta <strong>un</strong> caso favorable. Para demostrar que «todos cumplen» ' +
  'hace falta revisar <strong>todos</strong>, y basta un contraejemplo para refutarlo. Por eso una bandera arranca en ' +
  '<code>Falso</code> y la otra en <code>Verdadero</code>. Confundirlas da un programa que siempre responde lo mismo.</p>', 'key')}

<h2>6. Centinela</h2>
<p><em>Leer datos hasta que llegue un valor especial que marca el final.</em></p>
${cod('pseudo', `Leer dato                                 // lectura adelantada
Mientras dato <> CENTINELA Hacer
	procesar(dato)
	Leer dato                             // al final del cuerpo
FinMientras`)}
<p>El centinela debe ser un valor <strong>imposible</strong> en los datos reales: −1 para edades, 0 para cantidades,
una cadena vacía para nombres. Si eliges un valor posible (por ejemplo 0 para una temperatura), el programa cortará
donde no debe.</p>

<h2>7. Intercambio</h2>
<p><em>Permutar dos valores.</em> Necesita una variable temporal, como viste en el módulo 0.</p>
${cod('pseudo', `t <- a[i]
a[i] <- a[j]
a[j] <- t`)}

<h2>8. Búsqueda con salida temprana</h2>
<p><em>Encontrar la posición de un elemento, sin seguir buscando después.</em></p>
${cod('pseudo', `pos <- 0                                  // 0 significa "no encontrado"
i <- 1
Mientras i <= n Y pos = 0 Hacer
	Si a[i] = buscado Entonces
		pos <- i
	Sino
		i <- i + 1
	FinSi
FinMientras`)}

<h2>9. Conteo por casillero</h2>
<p><em>¿Cuántas veces aparece cada valor?</em> El valor del dato se usa como índice del contador.</p>
${cod('pseudo', `Dimension frec[RANGO]
Para v <- 1 Hasta RANGO Con Paso 1 Hacer   frec[v] <- 0   FinPara
Para i <- 1 Hasta n Con Paso 1 Hacer
	frec[a[i]] <- frec[a[i]] + 1
FinPara`)}

<h2>10. Recorrido en paralelo</h2>
<p><em>Procesar dos colecciones del mismo tamaño a la vez.</em></p>
${cod('pseudo', `Para i <- 1 Hasta n Con Paso 1 Hacer
	total <- total + cantidades[i] * precios[i]
FinPara`)}

<h2>11. Acumulación condicional por grupos</h2>
<p><em>Totales por categoría.</em> Combina el casillero con el acumulador:</p>
${cod('pseudo', `Dimension totalPorMes[12]
Para m <- 1 Hasta 12 Con Paso 1 Hacer   totalPorMes[m] <- 0   FinPara
Para i <- 1 Hasta n Con Paso 1 Hacer
	totalPorMes[mesDeVenta[i]] <- totalPorMes[mesDeVenta[i]] + monto[i]
FinPara`)}

<h2>Tabla de reconocimiento rápido</h2>
${tabla(['Si el enunciado dice…', 'El patrón es…', 'Inicialización'], [
  ['«cuántos», «cuántas veces»', 'contador', '0'],
  ['«la suma», «el total»', 'acumulador', '0'],
  ['«el producto», «el factorial»', 'acumulador', '1'],
  ['«el mayor», «el más caro», «el primero en…»', 'extremo', 'el primer elemento'],
  ['«hay algún», «existe», «al menos uno»', 'bandera', '<code>Falso</code>'],
  ['«todos», «ninguno», «siempre»', 'bandera universal', '<code>Verdadero</code>'],
  ['«hasta que el usuario…»', 'centinela', 'lectura adelantada'],
  ['«en qué posición está»', 'búsqueda', '0 = no encontrado'],
  ['«cuántas veces aparece cada»', 'casillero', 'arreglo de ceros'],
  ['«el promedio»', 'acumulador + contador, y <b>validar la división</b>', '0 y 0'],
  ['«intercambia», «ordena»', 'intercambio', 'variable temporal']
], 'Esta tabla resuelve la mitad de los exámenes de programación básica.')}

<h2>Combinar patrones</h2>
<p>Un enunciado real pide varias cosas a la vez, y lo eficiente es hacerlas en un solo recorrido. La disciplina es
sencilla: declara e inicializa <strong>todas</strong> las variables de todos los patrones antes del bucle, y dentro
del bucle escribe un bloque por patrón.</p>

${cod('pseudo', `// "De una lista de ventas: total, cantidad de ventas grandes,
//  la venta mayor, y si hubo alguna venta nula"
suma <- 0                       // acumulador
grandes <- 0                    // contador
mayor <- venta[1]               // extremo
hubonula <- Falso               // bandera
Para i <- 1 Hasta n Con Paso 1 Hacer
	suma <- suma + venta[i]
	Si venta[i] > 1000 Entonces   grandes <- grandes + 1   FinSi
	Si venta[i] > mayor Entonces  mayor <- venta[i]        FinSi
	Si venta[i] = 0 Entonces      hubonula <- Verdadero    FinSi
FinPara`)}
      `,
      ejercicios: [
        { n: 1, titulo: 'Identifica el patrón',
          enunciado: 'Di qué patrón (o combinación) usarías para cada enunciado: (a) «¿cuántos alumnos sacaron 20?»; (b) «¿algún producto está agotado?»; (c) «¿todos los campos del formulario están llenos?»; (d) «el cliente que más compró»; (e) «total facturado por cada vendedor»; (f) «leer pedidos hasta que escriban FIN».',
          pista: 'Busca las palabras clave de la tabla de reconocimiento.',
          solucion: `<p><b>(a)</b> Contador (inicia en 0). <b>(b)</b> Bandera existencial (inicia en <code>Falso</code>). <b>(c)</b> Bandera universal (inicia en <code>Verdadero</code>). <b>(d)</b> Extremo, guardando también la posición o el nombre del cliente. <b>(e)</b> Acumulación por grupos: un arreglo de totales indexado por vendedor. <b>(f)</b> Centinela con lectura adelantada, donde el centinela es la cadena <code>"FIN"</code>.</p>` },
        { n: 2, titulo: 'Las dos banderas',
          enunciado: 'Escribe un algoritmo que, sobre un arreglo de 8 notas, responda las dos preguntas a la vez: «¿hay alguna nota desaprobatoria?» y «¿todas las notas son mayores que 8?». Pruébalo con un arreglo donde las respuestas sean distintas.',
          pista: 'Dos banderas con inicializaciones opuestas, en el mismo bucle.',
          lab: 'Algoritmo DosBanderas\n\tDefinir i, n Como Entero\n\tDefinir hayDesaprobada, todasSobre8 Como Logico\n\tDimension nota[8]\n\tn <- 8\n\tnota[1] <- 14\n\tnota[2] <- 10\n\tnota[3] <- 17\n\tnota[4] <- 9\n\tnota[5] <- 12\n\tnota[6] <- 18\n\tnota[7] <- 11\n\tnota[8] <- 13\n\n\thayDesaprobada <- Falso\n\ttodasSobre8 <- Verdadero\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tSi nota[i] < 11 Entonces\n\t\t\thayDesaprobada <- Verdadero\n\t\tFinSi\n\t\tSi nota[i] <= 8 Entonces\n\t\t\ttodasSobre8 <- Falso\n\t\tFinSi\n\tFinPara\n\n\tSi hayDesaprobada Entonces\n\t\tEscribir "Sí hay al menos una nota desaprobatoria"\n\tSino\n\t\tEscribir "Ninguna nota es desaprobatoria"\n\tFinSi\n\tSi todasSobre8 Entonces\n\t\tEscribir "Todas las notas son mayores que 8"\n\tSino\n\t\tEscribir "Alguna nota es 8 o menos"\n\tFinSi\nFinAlgoritmo',
          solucion: `${cod('pseudo', `hayDesaprobada <- Falso        // existencial: pesimista
todasSobre8    <- Verdadero    // universal: optimista
Para i <- 1 Hasta n Con Paso 1 Hacer
	Si nota[i] < 11 Entonces   hayDesaprobada <- Verdadero  FinSi
	Si nota[i] <= 8 Entonces   todasSobre8 <- Falso         FinSi
FinPara`)}
<p>Con los datos del laboratorio (incluye un 9 y un 10): <b>hay</b> notas desaprobatorias y, sin embargo, <b>todas</b> son mayores que 8. Las dos respuestas son distintas, que es lo que hace útil el ejemplo.</p>
<p>Fíjate en que cada bandera solo se escribe en <b>una</b> dirección: la existencial solo pasa de Falso a Verdadero y la universal solo de Verdadero a Falso. Nunca se vuelven atrás, porque un hallazgo no se puede «desencontrar». Si tu código tiene un <code>Sino</code> que reasigna la bandera al otro valor, el resultado dependerá del último elemento en lugar del conjunto: ese es el error clásico de este patrón.</p>` },
        { n: 3, titulo: 'Totales por grupo',
          enunciado: 'Tienes 15 ventas, cada una con el número de vendedor (1 a 4) y el monto. Calcula el total vendido por cada vendedor, el mejor vendedor y el promedio de venta de cada uno.',
          pista: 'Dos arreglos indexados por vendedor: uno para los totales y otro para contar las ventas de cada uno.',
          lab: 'Algoritmo TotalesPorVendedor\n\tDefinir i, v, mejor Como Entero\n\tDefinir maxTotal Como Real\n\tDimension vendedor[15]\n\tDimension monto[15]\n\tDimension total[4]\n\tDimension ventas[4]\n\n\tvendedor[1] <- 1\n\tmonto[1] <- 1200\n\tvendedor[2] <- 3\n\tmonto[2] <- 450\n\tvendedor[3] <- 2\n\tmonto[3] <- 890\n\tvendedor[4] <- 1\n\tmonto[4] <- 300\n\tvendedor[5] <- 4\n\tmonto[5] <- 2100\n\tvendedor[6] <- 2\n\tmonto[6] <- 670\n\tvendedor[7] <- 1\n\tmonto[7] <- 1550\n\tvendedor[8] <- 3\n\tmonto[8] <- 120\n\tvendedor[9] <- 4\n\tmonto[9] <- 980\n\tvendedor[10] <- 2\n\tmonto[10] <- 1340\n\tvendedor[11] <- 1\n\tmonto[11] <- 760\n\tvendedor[12] <- 3\n\tmonto[12] <- 2300\n\tvendedor[13] <- 4\n\tmonto[13] <- 410\n\tvendedor[14] <- 2\n\tmonto[14] <- 55\n\tvendedor[15] <- 1\n\tmonto[15] <- 1890\n\n\tPara v <- 1 Hasta 4 Con Paso 1 Hacer\n\t\ttotal[v] <- 0\n\t\tventas[v] <- 0\n\tFinPara\n\n\tPara i <- 1 Hasta 15 Con Paso 1 Hacer\n\t\ttotal[vendedor[i]] <- total[vendedor[i]] + monto[i]\n\t\tventas[vendedor[i]] <- ventas[vendedor[i]] + 1\n\tFinPara\n\n\tmejor <- 1\n\tmaxTotal <- total[1]\n\tPara v <- 1 Hasta 4 Con Paso 1 Hacer\n\t\tEscribir "Vendedor ", v, ": total S/ ", total[v], " en ", ventas[v], " ventas, promedio S/ ", total[v] / ventas[v]\n\t\tSi total[v] > maxTotal Entonces\n\t\t\tmaxTotal <- total[v]\n\t\t\tmejor <- v\n\t\tFinSi\n\tFinPara\n\tEscribir "Mejor vendedor: ", mejor, " con S/ ", maxTotal\nFinAlgoritmo',
          solucion: `${cod('pseudo', `// 1) inicializar los casilleros
Para v <- 1 Hasta 4 Con Paso 1 Hacer
	total[v] <- 0
	ventas[v] <- 0
FinPara

// 2) una sola pasada: el vendedor es el índice
Para i <- 1 Hasta 15 Con Paso 1 Hacer
	total[vendedor[i]]  <- total[vendedor[i]] + monto[i]
	ventas[vendedor[i]] <- ventas[vendedor[i]] + 1
FinPara

// 3) recorrer los casilleros para informar y buscar el extremo`)}
<p>La estructura es <b>casillero + acumulador + contador</b>, y luego un <b>extremo</b> sobre los casilleros. Observa que el segundo recorrido ya no es sobre las 15 ventas sino sobre los 4 vendedores: cambiar de colección a mitad del algoritmo es normal y conviene tenerlo claro.</p>
<p><b>El detalle que falla en producción:</b> el promedio <code>total[v] / ventas[v]</code> divide entre cero si un vendedor no hizo ninguna venta. Con estos datos todos vendieron, pero el código correcto necesita <code>Si ventas[v] &gt; 0</code>. Un algoritmo que funciona con los datos de prueba y se cae con los datos reales es el pan de cada día: los datos de prueba casi nunca incluyen los casos vacíos.</p>` },
        { n: 4, titulo: 'Segunda mayor',
          enunciado: 'Encuentra el segundo elemento más grande de un arreglo en <b>un solo recorrido</b>, sin ordenar. Considera qué debe pasar si el máximo está repetido y si el arreglo tiene menos de 2 elementos distintos.',
          pista: 'Lleva dos candidatos y actualízalos en cascada: cuando aparece uno mayor que el primero, el primero pasa a ser el segundo.',
          lab: 'Algoritmo SegundoMayor\n\tDefinir i, n Como Entero\n\tDefinir primero, segundo Como Real\n\tDimension a[10]\n\tn <- 10\n\ta[1] <- 14\n\ta[2] <- 31\n\ta[3] <- 7\n\ta[4] <- 31\n\ta[5] <- 28\n\ta[6] <- 3\n\ta[7] <- 19\n\ta[8] <- 31\n\ta[9] <- 22\n\ta[10] <- 11\n\n\tprimero <- a[1]\n\tsegundo <- -999999\n\tPara i <- 2 Hasta n Con Paso 1 Hacer\n\t\tSi a[i] > primero Entonces\n\t\t\tsegundo <- primero\n\t\t\tprimero <- a[i]\n\t\tSino\n\t\t\tSi a[i] < primero Y a[i] > segundo Entonces\n\t\t\t\tsegundo <- a[i]\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\tEscribir "Mayor: ", primero\n\tSi segundo = -999999 Entonces\n\t\tEscribir "No hay un segundo valor distinto"\n\tSino\n\t\tEscribir "Segundo mayor distinto: ", segundo\n\tFinSi\nFinAlgoritmo',
          solucion: `${cod('pseudo', `primero <- a[1]
segundo <- SIN_VALOR               // marcador: aún no hay segundo
Para i <- 2 Hasta n Con Paso 1 Hacer
	Si a[i] > primero Entonces
		segundo <- primero         // el antiguo campeón baja al segundo puesto
		primero <- a[i]
	Sino
		Si a[i] < primero Y a[i] > segundo Entonces
			segundo <- a[i]
		FinSi
	FinSi
FinPara`)}
<p><b>La decisión de diseño:</b> ¿el «segundo mayor» de <code>[31, 31, 28]</code> es 31 o 28? El enunciado no lo dice, así que hay que decidirlo y documentarlo. Esta versión devuelve <b>28</b>: busca el segundo valor <i>distinto</i>, gracias al <code>a[i] &lt; primero</code>. Si quisieras que los repetidos cuenten, la condición sería <code>a[i] &lt;= primero Y a[i] &gt; segundo</code>... que con <code>&gt;</code> estricto tampoco capturaría el empate. Para «segundo por posición» habría que usar <code>a[i] &gt;= segundo</code>. Tres variantes de dos caracteres cada una, tres significados distintos: por eso los enunciados ambiguos son el enemigo.</p>
<p><b>El caso límite:</b> si todos los elementos son iguales, <code>segundo</code> nunca se asigna y conserva el marcador. Hay que comprobarlo antes de informar, en lugar de mostrar un número inventado. Usar un número «imposible» como marcador (−999999) funciona pero es frágil; en un lenguaje real se usa un valor nulo o un booleano acompañante.</p>` },
        { n: 5, titulo: 'Combina seis patrones',
          enunciado: 'Un registro de 20 temperaturas diarias. Calcula en un solo recorrido: el promedio, el día más caluroso, el más frío, cuántos días superaron el promedio histórico de 22°, si hubo algún día bajo cero, si todos los días fueron sobre 10°, y cuántos días hubo de cada rango (frío &lt;15, templado 15-25, caluroso &gt;25). Después explica qué parte no se puede hacer en ese mismo recorrido y por qué.',
          pista: 'Son acumulador, dos extremos con posición, contador, dos banderas y un casillero de 3 rangos. Y hay una pregunta que necesita el promedio ya calculado.',
          lab: 'Algoritmo AnalisisTemperaturas\n\tDefinir i, n, diaMax, diaMin, sobre22, sobrePromedio Como Entero\n\tDefinir suma, promedio, maxT, minT Como Real\n\tDefinir huboBajoCero, todosSobre10 Como Logico\n\tDimension t[20]\n\tDimension rango[3]\n\tn <- 20\n\tt[1] <- 18.5\n\tt[2] <- 23.1\n\tt[3] <- 14.2\n\tt[4] <- 27.8\n\tt[5] <- 12.0\n\tt[6] <- 25.4\n\tt[7] <- 19.9\n\tt[8] <- 30.2\n\tt[9] <- 16.7\n\tt[10] <- 21.3\n\tt[11] <- 11.5\n\tt[12] <- 24.6\n\tt[13] <- 28.9\n\tt[14] <- 13.8\n\tt[15] <- 22.0\n\tt[16] <- 17.4\n\tt[17] <- 26.1\n\tt[18] <- 15.0\n\tt[19] <- 20.8\n\tt[20] <- 29.3\n\n\tsuma <- 0\n\tmaxT <- t[1]\n\tminT <- t[1]\n\tdiaMax <- 1\n\tdiaMin <- 1\n\tsobre22 <- 0\n\thuboBajoCero <- Falso\n\ttodosSobre10 <- Verdadero\n\trango[1] <- 0\n\trango[2] <- 0\n\trango[3] <- 0\n\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tsuma <- suma + t[i]\n\t\tSi t[i] > maxT Entonces\n\t\t\tmaxT <- t[i]\n\t\t\tdiaMax <- i\n\t\tFinSi\n\t\tSi t[i] < minT Entonces\n\t\t\tminT <- t[i]\n\t\t\tdiaMin <- i\n\t\tFinSi\n\t\tSi t[i] > 22 Entonces\n\t\t\tsobre22 <- sobre22 + 1\n\t\tFinSi\n\t\tSi t[i] < 0 Entonces\n\t\t\thuboBajoCero <- Verdadero\n\t\tFinSi\n\t\tSi t[i] <= 10 Entonces\n\t\t\ttodosSobre10 <- Falso\n\t\tFinSi\n\t\tSi t[i] < 15 Entonces\n\t\t\trango[1] <- rango[1] + 1\n\t\tSino\n\t\t\tSi t[i] <= 25 Entonces\n\t\t\t\trango[2] <- rango[2] + 1\n\t\t\tSino\n\t\t\t\trango[3] <- rango[3] + 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\n\tpromedio <- suma / n\n\n\tsobrePromedio <- 0\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tSi t[i] > promedio Entonces\n\t\t\tsobrePromedio <- sobrePromedio + 1\n\t\tFinSi\n\tFinPara\n\n\tEscribir "Promedio: ", promedio\n\tEscribir "Más caluroso: día ", diaMax, " con ", maxT, " grados"\n\tEscribir "Más frío: día ", diaMin, " con ", minT, " grados"\n\tEscribir "Días sobre 22 grados: ", sobre22\n\tEscribir "Días sobre el promedio del periodo: ", sobrePromedio\n\tSi huboBajoCero Entonces\n\t\tEscribir "Hubo días bajo cero"\n\tSino\n\t\tEscribir "Ningún día bajo cero"\n\tFinSi\n\tSi todosSobre10 Entonces\n\t\tEscribir "Todos los días sobre 10 grados"\n\tSino\n\t\tEscribir "Algún día de 10 grados o menos"\n\tFinSi\n\tEscribir "Fríos (<15): ", rango[1], " · Templados (15-25): ", rango[2], " · Calurosos (>25): ", rango[3]\nFinAlgoritmo',
          solucion: `<p>Seis patrones conviven en el bucle, cada uno en su bloque: acumulador (<code>suma</code>), dos extremos con posición (<code>maxT/diaMax</code>, <code>minT/diaMin</code>), contador (<code>sobre22</code>), dos banderas con inicializaciones opuestas (<code>huboBajoCero</code>, <code>todosSobre10</code>) y un casillero de tres rangos.</p>
<p><b>Lo que no se puede hacer en el mismo recorrido:</b> contar cuántos días superaron <b>el promedio del propio periodo</b>. El promedio no existe hasta haber visto el último dato, así que esa pregunta exige un <b>segundo recorrido</b>. Nótese el contraste con «cuántos superaron 22», que es un umbral conocido de antemano y sí cabe en la primera pasada.</p>
<p>Esta distinción es más profunda de lo que parece y tiene nombre propio en el procesamiento de datos: un <b>algoritmo en línea</b> (<i>streaming</i>) puede calcular suma, conteos, extremos y banderas viendo cada dato una sola vez y sin guardarlos; cualquier cosa que dependa de un estadístico global del conjunto necesita una segunda pasada o guardar todos los datos. Por eso una suma se puede calcular sobre un flujo infinito y una <b>mediana</b> no.</p>
<p>Curiosidad útil: la <b>varianza</b> parece necesitar dos pasadas (hace falta el promedio para medir las desviaciones), pero existe una fórmula que la obtiene en una sola acumulando <code>suma</code> y <code>sumaDeCuadrados</code>. Es numéricamente inestable con datos grandes, y la solución robusta es el algoritmo de Welford, que también es de una pasada. Que algo parezca necesitar dos recorridos no significa que los necesite: merece la pena buscar.</p>
<p><b>Sobre el casillero de rangos:</b> fíjate en la cascada <code>&lt; 15</code> / <code>&lt;= 25</code> / resto. Escribir las tres condiciones de forma independiente (<code>&gt;= 15 Y &lt;= 25</code>) funcionaría, pero duplica los límites y permite que un cambio desincronice los rangos dejando huecos. Aprovechar el <code>Sino</code> hace imposible el solapamiento.</p>` }
      ],
      quiz: [
        { p: 'Para responder «¿hay algún elemento negativo?», la bandera se inicializa en…',
          ops: ['Verdadero', 'Falso', '0', 'el primer elemento'],
          ok: 1, exp: 'Es una bandera existencial: se asume que no hay ninguno y un solo caso favorable la pone en Verdadero.' },
        { p: 'Para responder «¿todos los elementos son positivos?», la bandera se inicializa en…',
          ops: ['Verdadero, y un contraejemplo la pone en Falso', 'Falso', 'depende de los datos', '1'],
          ok: 0, exp: 'Es el patrón universal: se asume que se cumple y basta un contraejemplo para refutarlo. Es el espejo exacto del existencial.' },
        { p: 'Contar cuántos elementos superan <b>el promedio del propio conjunto</b> requiere…',
          ops: ['un solo recorrido', 'dos recorridos, porque el promedio no se conoce hasta terminar el primero',
            'ordenar primero', 'un casillero'],
          ok: 1, exp: 'El promedio depende de todos los datos, así que no está disponible mientras se recorren. Umbrales conocidos de antemano sí caben en una sola pasada.' }
      ]
    },

    {
      id: 'm4-2',
      titulo: 'Validación y programación defensiva',
      resumen: 'No confiar en la entrada, qué validar, dónde validar y cómo fallar de forma útil.',
      objetivos: [
        'Enumerar qué hay que validar en cualquier entrada de datos',
        'Escribir validaciones que den mensajes accionables',
        'Distinguir validación de entrada de invariantes internas'
      ],
      lectura: `
<p>Hay una regla que separa el código de aula del código que funciona en la calle: <strong>nunca confíes en los datos
que vienen de fuera</strong>. El usuario escribirá letras donde esperas números, dejará campos vacíos, pegará un texto
de 10 000 caracteres y pulsará el botón dos veces. No por maldad: porque es lo que pasa.</p>

<h2>Qué validar, siempre</h2>
${tabla(['Validación', 'Qué comprueba', 'Ejemplo de fallo que evita'], [
  ['<b>Presencia</b>', 'que el dato exista y no esté vacío', 'un nombre en blanco se guarda en la base de datos'],
  ['<b>Tipo</b>', 'que sea un número si esperas un número', '«abc» convertido a 0 en silencio'],
  ['<b>Rango</b>', 'que esté entre el mínimo y el máximo razonables', 'una edad de 500, una talla de 175 metros'],
  ['<b>Formato</b>', 'que siga el patrón esperado', 'un correo sin arroba, un DNI de 3 dígitos'],
  ['<b>Longitud</b>', 'que no sea más largo ni más corto de lo permitido', 'un texto que desborda el campo de la base de datos'],
  ['<b>Coherencia</b>', 'que los datos entre sí tengan sentido', 'fecha de nacimiento posterior a la fecha de ingreso'],
  ['<b>Existencia</b>', 'que lo referenciado exista', 'una venta a un cliente que no está registrado'],
  ['<b>Unicidad</b>', 'que no esté duplicado', 'dos productos con el mismo código']
], 'Las ocho validaciones. Las cuatro primeras son mecánicas; las cuatro últimas requieren conocer el negocio.')}

<h2>El patrón de validación con bucle</h2>
${cod('pseudo', `Funcion v <- pedirEnteroEntre(etiqueta, minimo, maximo)
	Repetir
		Escribir etiqueta, " (", minimo, " a ", maximo, "):"
		Leer v
		Si v < minimo Entonces
			Escribir "  Muy bajo. El mínimo es ", minimo
		FinSi
		Si v > maximo Entonces
			Escribir "  Muy alto. El máximo es ", maximo
		FinSi
	Hasta Que v >= minimo Y v <= maximo
FinFuncion`)}

<p>Tres cosas que hacen buena esta función: está <strong>parametrizada</strong> (sirve para cualquier rango), el mensaje
de error dice <strong>qué estaba mal y cuál es el límite</strong>, y usa <code>Repetir</code> porque hay que pedir antes
de poder validar.</p>

<h2>Mensajes de error accionables</h2>
<p>Un mensaje de error debe responder tres preguntas: qué pasó, por qué está mal y qué hacer ahora.</p>

${tabla(['Mensaje malo', 'Por qué es malo', 'Mensaje bueno'], [
  ['«Error»', 'no dice nada', '«La fecha de ingreso no puede ser anterior a la de nacimiento»'],
  ['«Dato inválido»', 'no dice qué dato ni por qué', '«El DNI debe tener exactamente 8 dígitos; escribiste 7»'],
  ['«Error 0x8007»', 'no es para humanos', '«No se pudo guardar: el código ABC-001 ya existe»'],
  ['«Campo requerido»', 'no dice cuál', '«Falta el correo electrónico»'],
  ['«Valor fuera de rango»', 'no dice el rango', '«La talla debe estar entre 0.4 y 2.6 metros. ¿La escribiste en centímetros?»']
], 'El último ejemplo hace algo valiosísimo: adivina el error más probable y lo nombra.')}

<h2>Validar en el borde, confiar dentro</h2>
<p>Una pregunta de diseño importante: ¿hay que validar en todas las funciones? La respuesta profesional es
<strong>no</strong>, y la razón es que validar diez veces lo mismo llena el código de ruido y no añade seguridad.</p>

<p>La estrategia es la del <strong>castillo</strong>: validar <em>exhaustivamente</em> en las puertas, es decir donde
los datos entran al sistema (formularios, archivos leídos, respuestas de otros sistemas, parámetros de la línea de
comandos), y dentro del castillo trabajar con datos que ya se sabe válidos. Las funciones internas documentan sus
<strong>precondiciones</strong> en lugar de comprobarlas.</p>

${cod('pseudo', `// EN EL BORDE: validación completa, mensajes para el usuario
Funcion edad <- pedirEdad()
	Repetir
		Leer edad
		Si edad < 0 O edad > 120 Entonces
			Escribir "La edad debe estar entre 0 y 120"
		FinSi
	Hasta Que edad >= 0 Y edad <= 120
FinFuncion

// DENTRO: precondición documentada, sin revalidar
Funcion cat <- categoriaEdad(edad)
	// Pre: 0 <= edad <= 120 (garantizado por quien llama)
	Si edad < 13 Entonces   cat <- "Niño"
	Sino ...`)}

<h2>Invariantes: fallar pronto y fuerte</h2>
<p>Una cosa distinta de validar la entrada es comprobar que <em>tu propio código</em> no se equivocó. Para eso están las
<strong>aserciones</strong>: afirmaciones que deben ser verdaderas siempre, y que si fallan indican un error de
programación, no un error del usuario.</p>

${cod('pseudo', `// Tras repartir un monto entre tres conceptos:
Si abs(bruto - (neto + afp + salud)) > 0.01 Entonces
	Escribir "ERROR INTERNO: el reparto no cuadra. Revisar el cálculo."
	// en un lenguaje real: lanzar una excepción, abortar, registrar en el log
FinSi`)}

<p>La diferencia es crucial:</p>
${tabla(['', 'Validación de entrada', 'Aserción / invariante'], [
  ['Qué detecta', 'un error del usuario o de otro sistema', 'un error del programador'],
  ['Es esperable', 'sí, ocurrirá a diario', 'no, nunca debería ocurrir'],
  ['Qué hacer', 'mensaje amable y volver a pedir', 'detener, registrar y avisar a quien mantiene el sistema'],
  ['En producción', 'siempre activa', 'a veces se desactiva por rendimiento']
])}

${nota('Fail fast',
  '<p>Cuando algo imposible ocurre, el peor comportamiento es seguir adelante: el programa producirá resultados ' +
  'equivocados que nadie notará hasta que sea caro. Detenerse ruidosamente en el punto exacto del problema es ' +
  'más barato que descubrirlo tres meses después en una auditoría.</p>', 'key')}

<h2>La validación es también seguridad</h2>
<p>Las vulnerabilidades más explotadas del mundo son, en el fondo, fallos de validación: la inyección SQL ocurre porque
un dato del usuario se usó como código; el desbordamiento de búfer, porque no se comprobó una longitud; el XSS, porque
un texto se insertó en una página sin escaparlo. La regla profesional, que se repite en todos los manuales de seguridad,
es exactamente la de esta lección: <strong>toda entrada es hostil hasta que se demuestre lo contrario</strong>, y la
validación de la que te puedes fiar es la que ocurre en el servidor, no la del navegador, porque la del navegador la
puede desactivar cualquiera.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Enumera las validaciones',
          enunciado: 'Para un formulario de registro con nombre, correo, contraseña, fecha de nacimiento y DNI, escribe todas las validaciones que aplicarías a cada campo, indicando el tipo de validación de la tabla.',
          pista: 'Recorre las ocho validaciones campo por campo.',
          solucion: `${tabla(['Campo', 'Validaciones'], [
  ['<b>Nombre</b>', 'Presencia (no vacío); longitud (2 a 80); formato (letras, espacios, tildes y apóstrofos, sin dígitos ni símbolos raros)'],
  ['<b>Correo</b>', 'Presencia; formato (hay texto, una arroba, un dominio con punto); longitud (máx. 254 por el estándar); unicidad (no registrado ya)'],
  ['<b>Contraseña</b>', 'Presencia; longitud mínima (12 caracteres es el consejo actual, mejor que exigir símbolos); coherencia (coincide con la confirmación); y <b>no</b> estar en listas de contraseñas filtradas'],
  ['<b>Fecha de nacimiento</b>', 'Presencia; formato (fecha real: el 31 de febrero no existe); rango (no futura, no anterior a 1900); coherencia (edad mínima si el servicio la exige)'],
  ['<b>DNI</b>', 'Presencia; formato (8 dígitos exactos en Perú); tipo (solo dígitos, guardado como texto); unicidad']
])}
<p>Dos consejos que se aprenden con los años:</p>
<ul>
<li><b>No valides correos con una expresión regular compleja.</b> La especificación de las direcciones válidas es tan permisiva que cualquier regex «estricta» rechaza correos legítimos. Comprueba lo mínimo (tiene arroba y un dominio con punto) y verifica de verdad enviando un correo de confirmación.</li>
<li><b>Las reglas de contraseña con símbolos obligatorios empeoran la seguridad:</b> empujan a la gente a <code>Password1!</code> y a reutilizarla. La recomendación actual (NIST) es exigir longitud, permitir todo carácter y comprobar contra listas de contraseñas comprometidas.</li>
</ul>` },
        { n: 2, titulo: 'Reescribe los mensajes',
          enunciado: 'Reescribe estos mensajes para que sean accionables: (a) «Error en el campo 3»; (b) «Operación fallida»; (c) «Dato incorrecto»; (d) «No se puede continuar»; (e) «Valor inválido: 2026-02-30».',
          pista: 'Qué pasó, por qué está mal, qué hacer.',
          solucion: `<p><b>(a)</b> «El teléfono debe tener 9 dígitos y empezar por 9. Escribiste 7 dígitos.»</p>
<p><b>(b)</b> «No se pudo guardar la venta porque el producto ABC-001 no tiene stock suficiente (pediste 5, hay 2).»</p>
<p><b>(c)</b> «La cantidad debe ser un número entero mayor que 0. Escribiste "dos".»</p>
<p><b>(d)</b> «No puedes emitir la boleta hasta registrar el método de pago. Vuelve al paso 2.»</p>
<p><b>(e)</b> «El 30 de febrero no existe. Febrero de 2026 tiene 28 días; ¿querías decir 28/02/2026?»</p>
<p>Lo que tienen en común las versiones buenas: nombran el campo concreto, dicen la regla, muestran el valor recibido y proponen el siguiente paso. El (e) además sugiere la corrección más probable, que es lo que distingue un buen producto de uno correcto.</p>` },
        { n: 3, titulo: 'Validación coherente entre campos',
          enunciado: 'Escribe las validaciones de coherencia (no de formato) de un sistema de reservas de hotel con: fecha de entrada, fecha de salida, cantidad de huéspedes, tipo de habitación y monto pagado. Son validaciones que miran varios campos a la vez.',
          pista: 'Las validaciones de coherencia son las que no se pueden hacer campo por campo.',
          solucion: `<ol>
<li><b>Salida posterior a entrada:</b> <code>fechaSalida &gt; fechaEntrada</code>. Con <code>&gt;=</code> permitirías una reserva de cero noches.</li>
<li><b>Entrada no anterior a hoy</b> (para reservas nuevas), pero sí permitida en el pasado si es un registro histórico que se está corrigiendo: la regla depende del caso de uso, y hay que decidirlo explícitamente.</li>
<li><b>Huéspedes dentro de la capacidad del tipo de habitación:</b> <code>huespedes &lt;= capacidadDe(tipoHabitacion)</code>. Es coherencia pura: 4 huéspedes es válido y «simple» es válido, pero juntos no.</li>
<li><b>Estancia máxima:</b> <code>fechaSalida − fechaEntrada &lt;= 30 noches</code>, porque una estancia de 3 años suele ser un error de digitación del año.</li>
<li><b>Monto pagado coherente con la tarifa:</b> <code>montoPagado = noches × tarifaDe(tipo) × (1 + IGV)</code>, con tolerancia de un céntimo. Si no cuadra, hay un error de cálculo o un intento de manipulación.</li>
<li><b>Disponibilidad:</b> no existe otra reserva de la misma habitación que se solape con el rango. Esta es la más difícil y la que más se olvida. Dos rangos se solapan si <code>entradaA &lt; salidaB Y entradaB &lt; salidaA</code>, y conviene escribir esa condición una sola vez en una función con nombre, porque razonarla cada vez lleva a errores.</li>
</ol>
<p><b>Lo importante del ejercicio:</b> las validaciones de coherencia son las que requieren entender el negocio, no se pueden deducir del tipo de dato y son exactamente las que ningún validador automático de formularios va a escribir por ti.</p>` },
        { n: 4, titulo: 'Validación o aserción',
          enunciado: 'Clasifica cada comprobación como validación de entrada o aserción interna, y di qué debe hacer el programa si falla: (a) la edad escrita por el usuario está entre 0 y 120; (b) tras calcular el reparto de un sueldo, la suma de las partes es igual al bruto; (c) el archivo que se va a leer existe; (d) el índice que va a usar un bucle interno está dentro del arreglo; (e) la respuesta de un servicio externo trae el campo «total».',
          pista: 'Pregúntate si el fallo es culpa del usuario/entorno o del programador.',
          solucion: `<p><b>(a) Validación de entrada.</b> Falla a diario. Acción: mensaje claro y volver a pedir.</p>
<p><b>(b) Aserción.</b> Si el reparto no cuadra, el usuario no hizo nada mal: hay un error en el cálculo. Acción: detener, registrar en el log con todos los valores involucrados, y avisar. Nunca «arreglarlo» ajustando la diferencia en silencio, que es la tentación habitual y la forma de ocultar un bug para siempre.</p>
<p><b>(c) Validación de entorno.</b> Falla por causas externas (el archivo se movió, falta un permiso). Acción: mensaje que diga qué ruta se intentó abrir y por qué falló; no es un bug, es una condición del mundo.</p>
<p><b>(d) Aserción.</b> El índice lo calculó tu propio código. Si se sale del rango, el bug está en la fórmula del bucle. Acción: fallar ruidosamente en desarrollo. (En C, donde no hay comprobación automática, esta aserción es lo único que te separa de corromper memoria en silencio.)</p>
<p><b>(e) Validación de entrada.</b> Un servicio externo es una entrada, y tan hostil como un usuario: puede cambiar su formato, devolver un error con código 200 o estar caído. Acción: comprobar la estructura antes de usarla y tratar el caso con un mensaje claro; nunca suponer que la respuesta tiene la forma esperada.</p>
<p><b>La regla general:</b> si el fallo es previsible y depende del mundo exterior, es validación y se maneja con elegancia. Si el fallo significa que tu lógica está mal, es aserción y se maneja con ruido.</p>` },
        { n: 5, titulo: 'Validador completo de DNI y RUC',
          enunciado: 'Escribe un algoritmo que valide un DNI peruano (8 dígitos) y un RUC (11 dígitos, donde el primero es 1 o 2 y el último es un dígito verificador). El verificador del RUC se calcula multiplicando los 10 primeros dígitos por los pesos 5,4,3,2,7,6,5,4,3,2, sumando, tomando el resto entre 11, y el verificador es 11 menos ese resto (si da 10 es 0, si da 11 es 1). Pruébalo en el laboratorio.',
          pista: 'Recorre la cadena carácter por carácter con Subcadena y conviértelo a número. El dígito verificador es el patrón acumulador con pesos.',
          lab: 'Funcion v <- soloDigitos(s)\n\tDefinir i Como Entero\n\tDefinir c Como Cadena\n\tv <- Verdadero\n\tPara i <- 1 Hasta longitud(s) Con Paso 1 Hacer\n\t\tc <- Subcadena(s, i, i)\n\t\tSi c < "0" O c > "9" Entonces\n\t\t\tv <- Falso\n\t\tFinSi\n\tFinPara\nFinFuncion\n\nFuncion v <- dniValido(dni)\n\tSi longitud(dni) <> 8 Entonces\n\t\tv <- Falso\n\tSino\n\t\tv <- soloDigitos(dni)\n\tFinSi\nFinFuncion\n\nFuncion v <- rucValido(ruc)\n\tDefinir i, suma, resto, verificador, digito Como Entero\n\tDimension peso[10]\n\tpeso[1] <- 5\n\tpeso[2] <- 4\n\tpeso[3] <- 3\n\tpeso[4] <- 2\n\tpeso[5] <- 7\n\tpeso[6] <- 6\n\tpeso[7] <- 5\n\tpeso[8] <- 4\n\tpeso[9] <- 3\n\tpeso[10] <- 2\n\n\tv <- Verdadero\n\tSi longitud(ruc) <> 11 Entonces\n\t\tv <- Falso\n\tFinSi\n\tSi v Y NO soloDigitos(ruc) Entonces\n\t\tv <- Falso\n\tFinSi\n\tSi v Entonces\n\t\tdigito <- ConvertirANumero(Subcadena(ruc, 1, 1))\n\t\tSi digito <> 1 Y digito <> 2 Entonces\n\t\t\tv <- Falso\n\t\tFinSi\n\tFinSi\n\tSi v Entonces\n\t\tsuma <- 0\n\t\tPara i <- 1 Hasta 10 Con Paso 1 Hacer\n\t\t\tsuma <- suma + ConvertirANumero(Subcadena(ruc, i, i)) * peso[i]\n\t\tFinPara\n\t\tresto <- suma MOD 11\n\t\tverificador <- 11 - resto\n\t\tSi verificador = 10 Entonces\n\t\t\tverificador <- 0\n\t\tFinSi\n\t\tSi verificador = 11 Entonces\n\t\t\tverificador <- 1\n\t\tFinSi\n\t\tSi verificador <> ConvertirANumero(Subcadena(ruc, 11, 11)) Entonces\n\t\t\tv <- Falso\n\t\tFinSi\n\tFinSi\nFinFuncion\n\nAlgoritmo ProbarValidadores\n\tEscribir "DNI 45678912: ", dniValido("45678912")\n\tEscribir "DNI 4567891 (7 digitos): ", dniValido("4567891")\n\tEscribir "DNI 4567891a: ", dniValido("4567891a")\n\tEscribir "RUC 20100047218: ", rucValido("20100047218")\n\tEscribir "RUC 20100047219 (verificador mal): ", rucValido("20100047219")\n\tEscribir "RUC 30100047218 (empieza en 3): ", rucValido("30100047218")\nFinAlgoritmo',
          solucion: `<p>La solución completa está en el laboratorio. Las ideas de diseño que importan:</p>
<ul>
<li><b>Una función por responsabilidad:</b> <code>soloDigitos</code> se reutiliza en las dos validaciones. Si estuviera copiada en ambas, una de las dos copias acabaría distinta.</li>
<li><b>El orden de las comprobaciones.</b> Primero la longitud, después que sean dígitos, después el prefijo y solo al final el dígito verificador. Hacerlo al revés haría que un RUC con letras intentara convertirse a número y produjera basura. <b>Validar de lo más barato y general a lo más caro y específico</b> es la regla.</li>
<li><b>Se usa una bandera <code>v</code> con guardas <code>Si v Y …</code></b> en lugar de salir anticipadamente, porque este pseudocódigo asigna el resultado a la variable de retorno. En un lenguaje real cada comprobación sería un <code>return false</code> inmediato, que es más legible: las cláusulas de guarda del módulo 3.</li>
<li><b>Los pesos van en un arreglo</b>, no en un <code>Segun</code> de 10 casos ni en una expresión de 10 términos. Es una tabla de datos, y las tablas de datos van en estructuras de datos.</li>
<li><b>Los casos especiales del verificador (10 → 0, 11 → 1)</b> son una regla externa arbitraria. En código real esto merece un comentario con la fuente de la norma, porque dentro de dos años nadie recordará de dónde salió y parecerá un error.</li>
</ul>
<p><b>Lo más valioso del ejercicio</b> es el concepto de <b>dígito verificador</b>: un dígito redundante calculado a partir de los demás, que permite detectar errores de digitación sin consultar ninguna base de datos. El mismo principio está en el IBAN de las cuentas bancarias, el ISBN de los libros, el código de barras EAN-13 y el número de las tarjetas de crédito (algoritmo de Luhn). Es detección de errores con aritmética elemental, y es la versión más simple de la teoría de códigos que hace funcionar los discos, las comunicaciones y los códigos QR.</p>
<p>Nota de honestidad técnica: el RUC de ejemplo es un formato válido según el algoritmo, pero que un RUC pase la validación aritmética no significa que exista. Validar formato y validar existencia son cosas distintas, y confundirlas es un error de diseño frecuente.</p>` }
      ],
      quiz: [
        { p: 'La validación en la que puedes confiar es la que ocurre…',
          ops: ['en el navegador, que es más rápida', 'en el servidor, porque la del navegador se puede desactivar',
            'en la base de datos únicamente', 'en ambos sitios da igual'],
          ok: 1, exp: 'La validación del cliente mejora la experiencia, pero cualquiera puede saltársela. La del servidor es la única barrera real.' },
        { p: 'Si al calcular un reparto de sueldo las partes no suman el bruto, eso es…',
          ops: ['un error del usuario: pedir los datos otra vez', 'un error del programador: detener, registrar y avisar',
            'normal por el redondeo: ajustar la diferencia en silencio', 'un problema de la base de datos'],
          ok: 1, exp: 'Es una aserción interna que falló: el usuario no hizo nada mal. Ajustar la diferencia en silencio oculta el bug para siempre.' },
        { p: 'La estrategia del «castillo» consiste en…',
          ops: ['validar en todas las funciones por seguridad', 'validar exhaustivamente en los bordes del sistema y documentar precondiciones dentro',
            'no validar nada y confiar en el usuario', 'validar solo en la base de datos'],
          ok: 1, exp: 'Validar diez veces lo mismo añade ruido sin añadir seguridad. Se valida donde los datos entran, y las funciones internas declaran qué suponen.' }
      ]
    },

    {
      id: 'm4-3',
      titulo: 'Cadenas de texto',
      resumen: 'Recorrer, buscar, transformar y partir texto, con los errores que trae Unicode.',
      objetivos: [
        'Recorrer una cadena carácter por carácter',
        'Implementar operaciones de búsqueda y transformación de texto',
        'Evitar los errores de longitud, índices y acentos'
      ],
      lectura: `
<p>Una <strong>cadena</strong> es una secuencia de caracteres, y conceptualmente es un arreglo: tiene longitud y se
puede recorrer por índice. La mayoría de los lenguajes la tratan como un tipo especial con funciones propias, porque el
texto es el dato más manipulado del mundo.</p>

<h2>Las operaciones básicas</h2>
${tabla(['Operación', 'En este pseudocódigo', 'Python', 'JavaScript'], [
  ['Longitud', '<code>longitud(s)</code>', '<code>len(s)</code>', '<code>s.length</code>'],
  ['Un carácter', '<code>Subcadena(s,i,i)</code>', '<code>s[i]</code>', '<code>s[i]</code>'],
  ['Trozo', '<code>Subcadena(s,d,h)</code>', '<code>s[d:h]</code>', '<code>s.slice(d,h)</code>'],
  ['Concatenar', '<code>a + b</code>', '<code>a + b</code>', '<code>a + b</code>'],
  ['Mayúsculas', '<code>Mayusculas(s)</code>', '<code>s.upper()</code>', '<code>s.toUpperCase()</code>'],
  ['Buscar', 'recorrido manual', '<code>s.find(x)</code>', '<code>s.indexOf(x)</code>'],
  ['Partir', 'recorrido manual', '<code>s.split(",")</code>', '<code>s.split(",")</code>'],
  ['Quitar espacios', 'recorrido manual', '<code>s.strip()</code>', '<code>s.trim()</code>']
], 'Aquí las implementaremos a mano para entenderlas; en producción se usan las del lenguaje, que están optimizadas y conocen Unicode.')}

<h2>Recorrer una cadena</h2>
${cod('pseudo', `Definir i Como Entero
Definir c Como Caracter
Para i <- 1 Hasta longitud(texto) Con Paso 1 Hacer
	c <- Subcadena(texto, i, i)
	Escribir "Carácter ", i, ": ", c
FinPara`)}

<p>Con ese bucle y los patrones del tema 1 ya puedes resolver casi todo: contar vocales (contador), buscar un carácter
(bandera), construir una cadena nueva (acumulador de concatenación), invertir (recorrido hacia atrás).</p>

${cod('pseudo', `// Contar vocales: patrón contador
vocales <- 0
Para i <- 1 Hasta longitud(s) Con Paso 1 Hacer
	c <- Minusculas(Subcadena(s, i, i))
	Si c = "a" O c = "e" O c = "i" O c = "o" O c = "u" Entonces
		vocales <- vocales + 1
	FinSi
FinPara

// Invertir: acumulador construido al revés
inverso <- ""
Para i <- longitud(s) Hasta 1 Con Paso -1 Hacer
	inverso <- inverso + Subcadena(s, i, i)
FinPara`)}

<h2>Comparar texto: más difícil de lo que parece</h2>
<p>Comparar dos cadenas con <code>=</code> compara carácter por carácter, lo que produce resultados correctos pero a
menudo inútiles para un humano:</p>

${tabla(['Comparación', 'Resultado con <code>=</code>', '¿Lo que querías?'], [
  ['<code>"Ana" = "ana"</code>', 'falso', 'normalmente sí son la misma persona'],
  ['<code>"José" = "Jose"</code>', 'falso', 'a veces sí'],
  ['<code>"Ana " = "Ana"</code>', 'falso', 'casi siempre sí (espacio sobrante)'],
  ['<code>"café" = "café"</code>', 'puede ser falso', 'sí: la é puede estar compuesta de dos formas (módulo 1)']
], 'Por eso comparar nombres requiere normalizar primero: minúsculas, quitar espacios de los extremos, y normalización Unicode NFC.')}

<p>La secuencia profesional para comparar texto introducido por humanos es: <strong>recortar extremos → pasar a
minúsculas → normalizar Unicode → comparar</strong>. Y para búsquedas tolerantes, además quitar los acentos.</p>

<h2>Partir una cadena</h2>
<p>Separar <code>"Juan,Pérez,25"</code> en tres partes es la operación más común al leer archivos CSV. El algoritmo es
un acumulador que se vacía en cada separador:</p>

${cod('pseudo', `// Partir por comas, guardando las partes en un arreglo
Dimension partes[20]
cuantas <- 0
actual <- ""
Para i <- 1 Hasta longitud(linea) Con Paso 1 Hacer
	c <- Subcadena(linea, i, i)
	Si c = "," Entonces
		cuantas <- cuantas + 1
		partes[cuantas] <- actual     // guardar lo acumulado
		actual <- ""                  // y vaciar el acumulador
	Sino
		actual <- actual + c
	FinSi
FinPara
cuantas <- cuantas + 1
partes[cuantas] <- actual             // ¡la última parte, fuera del bucle!`)}

${nota('El error de la última parte',
  '<p>Después del bucle hay que guardar lo que quedó en el acumulador, porque la última parte no termina en un ' +
  'separador. Olvidarlo hace que <code>"a,b,c"</code> devuelva solo <code>["a","b"]</code>. Es el error número uno ' +
  'al implementar un <em>split</em> a mano.</p>', 'warn')}

<p>Y una advertencia importante: partir CSV por comas <strong>no es correcto</strong> para CSV real, porque un campo
puede contener comas si está entre comillas (<code>"Pérez, Juan",25</code>). El formato CSV tiene una especificación
(RFC 4180) con comillas, comillas escapadas y saltos de línea dentro de campos. Escribir un analizador de CSV a mano es
un rito de paso, y la conclusión profesional es siempre la misma: <strong>usa la biblioteca</strong>.</p>

<h2>El costo oculto de concatenar</h2>
<p>En casi todos los lenguajes las cadenas son <strong>inmutables</strong>: <code>s ← s + c</code> no añade un carácter,
crea una cadena nueva y copia todo lo anterior. Dentro de un bucle de <code>n</code> vueltas, eso copia
<code>1+2+3+…+n</code> caracteres, es decir <strong>O(n²)</strong>. Con 100 000 concatenaciones el programa se arrastra.</p>

<p>La solución, en cualquier lenguaje, es acumular las piezas en una lista y unirlas al final de una sola vez
(<code>"".join(lista)</code> en Python, <code>array.join("")</code> en JavaScript, <code>StringBuilder</code> en Java y
C#). Es la optimización de texto más rentable que existe y la que más veces vas a aplicar.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Contar y transformar',
          enunciado: 'Escribe un algoritmo que lea una frase y muestre: su longitud, cuántas vocales tiene, cuántas consonantes, cuántos espacios, y la frase en mayúsculas y al revés.',
          pista: 'Un solo recorrido para los tres contadores, y uno hacia atrás para invertir.',
          lab: 'Funcion esVocal <- vocal(c)\n\tDefinir m Como Cadena\n\tm <- minusculas(c)\n\tesVocal <- (m = "a" O m = "e" O m = "i" O m = "o" O m = "u" O m = "á" O m = "é" O m = "í" O m = "ó" O m = "ú")\nFinFuncion\n\nAlgoritmo AnalizarFrase\n\tDefinir frase, c, inverso Como Cadena\n\tDefinir i, vocales, consonantes, espacios Como Entero\n\tEscribir "Escribe una frase:"\n\tLeer frase\n\n\tvocales <- 0\n\tconsonantes <- 0\n\tespacios <- 0\n\tPara i <- 1 Hasta longitud(frase) Con Paso 1 Hacer\n\t\tc <- Subcadena(frase, i, i)\n\t\tSi c = " " Entonces\n\t\t\tespacios <- espacios + 1\n\t\tSino\n\t\t\tSi vocal(c) Entonces\n\t\t\t\tvocales <- vocales + 1\n\t\t\tSino\n\t\t\t\tconsonantes <- consonantes + 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\n\tinverso <- ""\n\tPara i <- longitud(frase) Hasta 1 Con Paso -1 Hacer\n\t\tinverso <- inverso + Subcadena(frase, i, i)\n\tFinPara\n\n\tEscribir "Longitud: ", longitud(frase)\n\tEscribir "Vocales: ", vocales\n\tEscribir "Consonantes (o símbolos): ", consonantes\n\tEscribir "Espacios: ", espacios\n\tEscribir "Mayúsculas: ", mayusculas(frase)\n\tEscribir "Al revés: ", inverso\nFinAlgoritmo',
          labEntradas: 'Programar es pensar dos veces',
          solucion: `<p>La solución está en el laboratorio. Dos observaciones:</p>
<ul>
<li><b>La función <code>vocal(c)</code> incluye las vocales acentuadas.</b> Sin ellas, «canción» tendría dos vocales menos de las que tiene. Es el típico detalle que se descubre al probar con datos en español después de haber copiado un ejercicio en inglés.</li>
<li><b>«Consonantes» en realidad cuenta todo lo que no es vocal ni espacio</b>, incluidos dígitos y signos de puntuación. El nombre de la variable miente, y eso es un bug en potencia. Lo correcto es contar explícitamente las letras consonantes o renombrar la variable a <code>noVocales</code>. Que el nombre y el contenido coincidan no es cosmética: es la diferencia entre un programa que se puede razonar y uno que no.</li>
</ul>` },
        { n: 2, titulo: 'Palíndromo',
          enunciado: 'Determina si una frase es palíndroma (se lee igual al derecho y al revés), ignorando espacios, acentos y mayúsculas. Prueba con «Anita lava la tina» y «Dábale arroz a la zorra el abad».',
          pista: 'Primero normaliza (quita lo que no sea letra, pasa a minúsculas, quita acentos) y después compara desde los dos extremos hacia el centro.',
          lab: 'Funcion r <- sinTildes(c)\n\tDefinir m Como Cadena\n\tm <- minusculas(c)\n\tSi m = "á" Entonces\n\t\tr <- "a"\n\tSino\n\t\tSi m = "é" Entonces\n\t\t\tr <- "e"\n\t\tSino\n\t\t\tSi m = "í" Entonces\n\t\t\t\tr <- "i"\n\t\t\tSino\n\t\t\t\tSi m = "ó" Entonces\n\t\t\t\t\tr <- "o"\n\t\t\t\tSino\n\t\t\t\t\tSi m = "ú" Entonces\n\t\t\t\t\t\tr <- "u"\n\t\t\t\t\tSino\n\t\t\t\t\t\tr <- m\n\t\t\t\t\tFinSi\n\t\t\t\tFinSi\n\t\t\tFinSi\n\t\tFinSi\n\tFinSi\nFinFuncion\n\nFuncion limpia <- normalizar(s)\n\tDefinir i Como Entero\n\tDefinir c Como Cadena\n\tlimpia <- ""\n\tPara i <- 1 Hasta longitud(s) Con Paso 1 Hacer\n\t\tc <- sinTildes(Subcadena(s, i, i))\n\t\tSi c >= "a" Y c <= "z" Entonces\n\t\t\tlimpia <- limpia + c\n\t\tFinSi\n\tFinPara\nFinFuncion\n\nFuncion esPal <- palindromo(s)\n\tDefinir limpia Como Cadena\n\tDefinir i, j Como Entero\n\tlimpia <- normalizar(s)\n\tesPal <- Verdadero\n\ti <- 1\n\tj <- longitud(limpia)\n\tMientras i < j Y esPal Hacer\n\t\tSi Subcadena(limpia, i, i) <> Subcadena(limpia, j, j) Entonces\n\t\t\tesPal <- Falso\n\t\tFinSi\n\t\ti <- i + 1\n\t\tj <- j - 1\n\tFinMientras\nFinFuncion\n\nAlgoritmo ProbarPalindromos\n\tEscribir "Anita lava la tina -> ", palindromo("Anita lava la tina")\n\tEscribir "Dábale arroz a la zorra el abad -> ", palindromo("Dábale arroz a la zorra el abad")\n\tEscribir "Hola mundo -> ", palindromo("Hola mundo")\n\tEscribir "Reconocer -> ", palindromo("Reconocer")\nFinAlgoritmo',
          solucion: `<p>La solución tiene tres partes bien separadas, y esa separación es la lección:</p>
<ol>
<li><b><code>sinTildes</code></b> traduce un carácter acentuado a su base. (En código real se usaría la normalización Unicode NFD y se descartarían los diacríticos, en lugar de una cascada de <code>Si</code>.)</li>
<li><b><code>normalizar</code></b> deja solo las letras a-z en minúscula, descartando espacios y puntuación.</li>
<li><b><code>palindromo</code></b> compara con <b>dos índices que avanzan en direcciones opuestas</b> hasta cruzarse.</li>
</ol>
<p><b>Por qué dos índices y no invertir y comparar:</b> invertir la cadena y compararla con la original también funciona y es más corto de escribir, pero gasta memoria para una copia completa y hace <code>n</code> comparaciones siempre. La técnica de los dos extremos no copia nada y termina en cuanto encuentra la primera diferencia, lo que en el caso típico (no es palíndromo) es muchísimo antes. Esa técnica se llama <b>dos punteros</b> y es una de las más útiles del repertorio: aparece en problemas de arreglos ordenados, en detección de ciclos y en la partición del quicksort (módulo 7).</p>
<p><b>La condición de parada <code>i &lt; j</code>:</b> con longitud par los índices se cruzan sin tocarse; con longitud impar llegan a ser iguales en el centro, y comparar el carácter central consigo mismo es innecesario. Usar <code>&lt;=</code> funcionaría igual pero haría una comparación de más.</p>` },
        { n: 3, titulo: 'Partir una línea CSV',
          enunciado: 'Implementa el algoritmo que parte una línea <code>"Juan,Pérez,25,Lima"</code> en un arreglo de 4 partes y las muestra numeradas. Comprueba qué pasa con <code>"a,,b"</code> y con una línea que termina en coma, y explica por qué esos casos importan.',
          pista: 'Acumulador que se vacía en cada separador, y no olvides guardar la última parte después del bucle.',
          lab: 'Algoritmo PartirCSV\n\tDefinir linea, actual, c Como Cadena\n\tDefinir i, cuantas Como Entero\n\tDimension partes[20]\n\n\tEscribir "Escribe una línea separada por comas:"\n\tLeer linea\n\n\tcuantas <- 0\n\tactual <- ""\n\tPara i <- 1 Hasta longitud(linea) Con Paso 1 Hacer\n\t\tc <- Subcadena(linea, i, i)\n\t\tSi c = "," Entonces\n\t\t\tcuantas <- cuantas + 1\n\t\t\tpartes[cuantas] <- actual\n\t\t\tactual <- ""\n\t\tSino\n\t\t\tactual <- actual + c\n\t\tFinSi\n\tFinPara\n\tcuantas <- cuantas + 1\n\tpartes[cuantas] <- actual\n\n\tEscribir "Se encontraron ", cuantas, " campos:"\n\tPara i <- 1 Hasta cuantas Con Paso 1 Hacer\n\t\tEscribir "  [", i, "] = \\"", partes[i], "\\""\n\tFinPara\nFinAlgoritmo',
          labEntradas: 'Juan,Pérez,25,Lima',
          solucion: `<p>Los dos casos límite y por qué importan:</p>
<ul>
<li><b><code>"a,,b"</code> → 3 campos: <code>"a"</code>, <code>""</code>, <code>"b"</code>.</b> El campo vacío del medio es correcto y hay que preservarlo: en un CSV significa «este dato no se informó», que es distinto de que no exista la columna. Un <i>split</i> que descarte los vacíos desalinea todas las columnas siguientes, y entonces la edad de alguien acaba en la columna de la ciudad. Este error es la causa habitual de las importaciones de datos corruptas.</li>
<li><b><code>"a,b,"</code> → 3 campos, el último vacío.</b> Gracias a la línea que guarda el acumulador después del bucle. Si faltara, devolvería 2 campos y la última columna desaparecería en silencio.</li>
</ul>
<p>Prueba también <code>","</code> (dos campos vacíos) y la cadena vacía (un campo vacío, que es lo correcto: una línea sin comas tiene un campo).</p>
<p><b>Y la advertencia que vale más que el ejercicio:</b> este algoritmo es incorrecto para CSV real. Con <code>"Pérez, Juan",25</code> devuelve tres campos en lugar de dos, porque la coma está dentro de un campo entrecomillado. El formato admite además comillas dobles escapadas (<code>""</code>) y saltos de línea dentro de un campo. Implementarlo bien exige una pequeña máquina de estados (dentro o fuera de comillas), que es un ejercicio excelente y exactamente el tipo de problema que el módulo 9 resuelve con analizadores léxicos. En producción: usa la biblioteca de CSV del lenguaje, que ya tiene todos esos casos cubiertos y probados por miles de personas.</p>` },
        { n: 4, titulo: 'Buscar una subcadena',
          enunciado: 'Implementa <code>posicionDe(texto, patron)</code> que devuelva la posición de la primera aparición de <code>patron</code> dentro de <code>texto</code>, o 0 si no está. ¿Cuántas comparaciones hace en el peor caso?',
          pista: 'Para cada posición posible de inicio, comprueba si el patrón coincide a partir de ahí. Son dos bucles anidados.',
          lab: 'Funcion pos <- posicionDe(texto, patron)\n\tDefinir i, j, n, m Como Entero\n\tDefinir coincide Como Logico\n\tn <- longitud(texto)\n\tm <- longitud(patron)\n\tpos <- 0\n\tSi m > 0 Y m <= n Entonces\n\t\ti <- 1\n\t\tMientras i <= n - m + 1 Y pos = 0 Hacer\n\t\t\tcoincide <- Verdadero\n\t\t\tj <- 1\n\t\t\tMientras j <= m Y coincide Hacer\n\t\t\t\tSi Subcadena(texto, i + j - 1, i + j - 1) <> Subcadena(patron, j, j) Entonces\n\t\t\t\t\tcoincide <- Falso\n\t\t\t\tFinSi\n\t\t\t\tj <- j + 1\n\t\t\tFinMientras\n\t\t\tSi coincide Entonces\n\t\t\t\tpos <- i\n\t\t\tFinSi\n\t\t\ti <- i + 1\n\t\tFinMientras\n\tFinSi\nFinFuncion\n\nAlgoritmo BuscarTexto\n\tEscribir "buscar \\"gra\\" en \\"programar\\" -> ", posicionDe("programar", "gra")\n\tEscribir "buscar \\"mar\\" en \\"programar\\" -> ", posicionDe("programar", "mar")\n\tEscribir "buscar \\"xyz\\" en \\"programar\\" -> ", posicionDe("programar", "xyz")\n\tEscribir "buscar \\"pro\\" en \\"programar\\" -> ", posicionDe("programar", "pro")\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Funcion pos <- posicionDe(texto, patron)
	n <- longitud(texto)
	m <- longitud(patron)
	pos <- 0
	i <- 1
	Mientras i <= n - m + 1 Y pos = 0 Hacer     // posiciones de inicio posibles
		coincide <- Verdadero
		j <- 1
		Mientras j <= m Y coincide Hacer         // comparar el patrón completo
			Si Subcadena(texto, i + j - 1, i + j - 1) <> Subcadena(patron, j, j) Entonces
				coincide <- Falso
			FinSi
			j <- j + 1
		FinMientras
		Si coincide Entonces  pos <- i  FinSi
		i <- i + 1
	FinMientras
FinFuncion`)}
<p><b>El límite del bucle externo, <code>n − m + 1</code></b>, es el detalle fino: si el patrón tiene 3 caracteres y el texto 9, la última posición donde puede empezar una coincidencia es la 7. Ir hasta <code>n</code> provocaría accesos fuera de rango. Verifícalo con los extremos: con m = n debe dar 1 (solo una posición posible) ✔, y con m = 1 debe dar n ✔.</p>
<p><b>Comparaciones en el peor caso: O(n × m).</b> Se alcanza con textos muy repetitivos, por ejemplo buscar <code>"aaab"</code> en <code>"aaaaaaaaaa"</code>: cada posición de inicio compara 3 caracteres iguales antes de fallar en el cuarto. Con n = 1 000 000 y m = 1000 serían hasta 10⁹ comparaciones.</p>
<p><b>Hay algoritmos mucho mejores,</b> y vale la pena saber que existen: <b>Knuth-Morris-Pratt</b> (KMP) logra O(n + m) aprovechando la información de los fallos anteriores para no retroceder nunca en el texto; <b>Boyer-Moore</b> compara el patrón de derecha a izquierda y puede <i>saltar</i> varios caracteres de golpe, llegando a ser sublineal en la práctica, y es el que usa la mayoría de las implementaciones reales. Que un problema tan simple de enunciar tenga algoritmos con nombre propio y décadas de investigación es una buena medida de lo profundo que es el campo.</p>` },
        { n: 5, titulo: 'Formateador de nombres',
          enunciado: 'Escribe una función que normalice un nombre escrito por un usuario: quitar espacios de los extremos, reducir espacios múltiples a uno, poner la primera letra de cada palabra en mayúscula y el resto en minúscula. Casos de prueba: <code>"  juan  CARLOS  pérez  "</code>, <code>"MARÍA DEL cARMEN"</code>. Luego explica por qué esta función, pese a hacer lo que se le pide, no debería aplicarse a ciegas a nombres reales.',
          pista: 'Recorre acumulando y lleva una bandera que indique si el carácter anterior fue un espacio.',
          lab: 'Funcion r <- formatearNombre(s)\n\tDefinir i Como Entero\n\tDefinir c, limpio Como Cadena\n\tDefinir anteriorEspacio Como Logico\n\n\t// 1) recortar y colapsar espacios\n\tlimpio <- ""\n\tanteriorEspacio <- Verdadero\n\tPara i <- 1 Hasta longitud(s) Con Paso 1 Hacer\n\t\tc <- Subcadena(s, i, i)\n\t\tSi c = " " Entonces\n\t\t\tSi NO anteriorEspacio Entonces\n\t\t\t\tlimpio <- limpio + " "\n\t\t\tFinSi\n\t\t\tanteriorEspacio <- Verdadero\n\t\tSino\n\t\t\tlimpio <- limpio + c\n\t\t\tanteriorEspacio <- Falso\n\t\tFinSi\n\tFinPara\n\t// quitar un espacio final si quedó\n\tSi longitud(limpio) > 0 Y Subcadena(limpio, longitud(limpio), longitud(limpio)) = " " Entonces\n\t\tlimpio <- Subcadena(limpio, 1, longitud(limpio) - 1)\n\tFinSi\n\n\t// 2) capitalizar cada palabra\n\tr <- ""\n\tanteriorEspacio <- Verdadero\n\tPara i <- 1 Hasta longitud(limpio) Con Paso 1 Hacer\n\t\tc <- Subcadena(limpio, i, i)\n\t\tSi c = " " Entonces\n\t\t\tr <- r + " "\n\t\t\tanteriorEspacio <- Verdadero\n\t\tSino\n\t\t\tSi anteriorEspacio Entonces\n\t\t\t\tr <- r + mayusculas(c)\n\t\t\tSino\n\t\t\t\tr <- r + minusculas(c)\n\t\t\tFinSi\n\t\t\tanteriorEspacio <- Falso\n\t\tFinSi\n\tFinPara\nFinFuncion\n\nAlgoritmo ProbarFormateo\n\tEscribir "[", formatearNombre("  juan  CARLOS  pérez  "), "]"\n\tEscribir "[", formatearNombre("MARÍA DEL cARMEN"), "]"\n\tEscribir "[", formatearNombre("ana"), "]"\n\tEscribir "[", formatearNombre("   "), "]"\nFinAlgoritmo',
          solucion: `<p>La solución del laboratorio hace dos pasadas: una para colapsar espacios y otra para capitalizar. <b>La bandera <code>anteriorEspacio</code> es el corazón del algoritmo</b> en las dos: en la primera decide si copiar un espacio, en la segunda decide si la letra actual es inicial de palabra. Este patrón (recordar algo del carácter anterior) es una <b>máquina de estados</b> de dos estados, y es la base del análisis léxico del módulo 9.</p>
<p><b>Resultados:</b> <code>"Juan Carlos Pérez"</code> y <code>"María Del Carmen"</code>.</p>
<p><b>Por qué no aplicarla a ciegas a nombres reales</b> —y esta es la parte importante del ejercicio:</p>
<ul>
<li><b>«María Del Carmen» está mal.</b> Las partículas españolas van en minúscula: «María del Carmen», «Juan de la Cruz», «Luis von Humboldt». La regla correcta necesita una lista de excepciones (<i>de, del, la, las, los, y, van, von, da, di</i>) que además no se aplican si la partícula es la primera palabra.</li>
<li><b>Hay apellidos con mayúscula interna legítima:</b> McDonald, MacArthur, O'Brien, DeWitt. Capitalizar «solo la primera letra» los destruye.</li>
<li><b>Hay nombres que se escriben en minúscula a propósito</b>, y hay personas con un solo nombre, con guiones, con apóstrofos y con caracteres de otros alfabetos.</li>
</ul>
<p>Esto conecta con uno de los textos más citados de la industria, <i>«Falsehoods programmers believe about names»</i>: casi todas las suposiciones que hacemos sobre los nombres (tienen nombre y apellido, se pueden poner en mayúsculas, caben en 50 caracteres, no cambian) son falsas para millones de personas.</p>
<p><b>La conclusión de diseño:</b> normaliza para <b>comparar y buscar</b> (ahí sí conviene minúsculas sin acentos, porque la normalización es interna y nadie la ve), pero guarda y muestra el nombre <b>tal como la persona lo escribió</b>. Corregirle el nombre a un usuario es una decisión de producto, no una tarea del formateador, y casi siempre es la decisión equivocada.</p>` }
      ],
      quiz: [
        { p: 'Al implementar un <i>split</i> a mano, el error más frecuente es…',
          ops: ['usar el separador equivocado', 'olvidar guardar la última parte después del bucle',
            'no convertir a minúsculas', 'usar un arreglo demasiado grande'],
          ok: 1, exp: 'La última parte no termina en separador, así que hay que volcar el acumulador después del bucle. Si no, «a,b,c» devuelve solo dos campos.' },
        { p: 'Concatenar dentro de un bucle (<code>s ← s + c</code>) en un lenguaje con cadenas inmutables es…',
          ops: ['O(n)', 'O(n²), porque cada concatenación copia toda la cadena anterior', 'O(log n)', 'gratis'],
          ok: 1, exp: 'Cada paso crea una cadena nueva copiando lo anterior. La solución es acumular las piezas en una lista y unirlas una sola vez al final.' },
        { p: 'Para comparar nombres escritos por humanos conviene…',
          ops: ['compararlos directamente con <code>=</code>', 'recortar extremos, pasar a minúsculas y normalizar Unicode antes de comparar',
            'comparar solo la primera letra', 'convertirlos a números'],
          ok: 1, exp: '«Ana », «ana» y «Ana» son distintas carácter por carácter. Se normaliza para comparar, pero se guarda el nombre tal como lo escribió la persona.' }
      ]
    },

    {
      id: 'm4-4',
      titulo: 'Resolver un problema grande de principio a fin',
      resumen: 'Un caso completo: del enunciado ambiguo al algoritmo probado, aplicando todo lo anterior.',
      objetivos: [
        'Convertir un enunciado vago en requisitos concretos',
        'Descomponer, diseñar y probar un sistema pequeño completo',
        'Reconocer qué decisiones son de negocio y cuáles técnicas'
      ],
      lectura: `
<p>Hasta aquí los ejercicios venían con el enunciado resuelto a medias. En la vida real alguien te dirá algo como:</p>

<blockquote><p>«Necesito un programa para controlar la asistencia de mis trabajadores y sacar el pago de la semana.»</p></blockquote>

<p>Eso no se puede programar. Este tema muestra el proceso completo, con el razonamiento explícito, para que puedas
repetirlo con cualquier problema.</p>

<h2>Paso 1: convertir el deseo en preguntas</h2>
<p>Antes de escribir nada, hay que preguntar. Las preguntas que faltan son el principal motivo de que un programa se
tenga que rehacer:</p>
<ul>
  <li>¿Cuántos trabajadores? ¿Son fijos o cambian? <em>(decide si basta un arreglo de tamaño fijo)</em></li>
  <li>¿Cómo se registra la asistencia: horas de entrada y salida, o solo presente/ausente?</li>
  <li>¿El pago es por hora, por día o fijo semanal?</li>
  <li>¿Hay horas extra? ¿Desde cuándo cuentan y con qué recargo?</li>
  <li>¿Se descuenta algo? ¿Hay bonos?</li>
  <li>¿Qué pasa si alguien falta? ¿Hay tolerancia de tardanza?</li>
  <li>¿El resultado es para imprimir, para pantalla o para exportar?</li>
</ul>

<p>Supongamos estas respuestas: <strong>5 trabajadores fijos; se registran las horas trabajadas de lunes a sábado; pago
por hora con tarifa distinta por trabajador; las horas que pasen de 48 en la semana se pagan con 25% de recargo; se
descuenta 10% de AFP del total; se muestra en pantalla un reporte por trabajador y un resumen general.</strong></p>

<h2>Paso 2: entrada, proceso y salida</h2>
${tabla(['', 'Contenido'], [
  ['<b>Entrada</b>', 'Por cada trabajador: nombre, tarifa por hora, y 6 valores de horas (lunes a sábado)'],
  ['<b>Proceso</b>', 'Total de horas; separar normales y extra respecto de 48; calcular pago normal, pago extra, bruto, AFP y neto; acumular totales de la empresa; detectar el de mayor pago'],
  ['<b>Salida</b>', 'Una línea por trabajador con su desglose, y un resumen con el total pagado, el promedio y quién ganó más']
])}

<h2>Paso 3: elegir las estructuras de datos</h2>
<p>Esta decisión condiciona todo lo demás. Con 5 trabajadores y 6 días, la elección natural son <strong>arreglos
paralelos</strong> y una matriz:</p>

${cod('pseudo', `Dimension nombre[5]          // Cadena
Dimension tarifa[5]          // Real: soles por hora
Dimension horas[5,6]         // Real: horas[trabajador, día]
Dimension neto[5]            // Real: resultado por trabajador`)}

<p>Los arreglos paralelos (varios arreglos donde el índice <code>i</code> se refiere al mismo trabajador en todos)
funcionan bien y tienen un riesgo: si ordenas uno y no los demás, los datos se desalinean y el programa produce basura
coherente, que es lo peor que puede pasar. La solución correcta son los <strong>registros</strong> u
<strong>objetos</strong>, donde cada trabajador es una sola cosa con campos. Lo verás en el módulo 8; con lo que sabes
hoy, los arreglos paralelos son la respuesta, y conviene saber que son una solución provisional.</p>

<h2>Paso 4: descomponer en subprogramas</h2>
${tabla(['Subprograma', 'Responsabilidad'], [
  ['<code>leerDatos()</code>', 'Pedir nombres, tarifas y horas, validando cada entrada'],
  ['<code>totalHoras(t)</code>', 'Sumar las 6 horas del trabajador t'],
  ['<code>pagoBruto(horasTot, tarifa)</code>', 'Separar normales y extra, aplicar el recargo'],
  ['<code>descuentoAFP(bruto)</code>', 'Aplicar el 10%'],
  ['<code>mostrarDetalle(t)</code>', 'Imprimir la línea de un trabajador'],
  ['<code>mostrarResumen()</code>', 'Totales, promedio y el mejor pagado']
], 'Seis subprogramas, cada uno con una sola responsabilidad y un nombre que la describe.')}

<h2>Paso 5: el algoritmo</h2>
${cod('pseudo', `Funcion bruto <- pagoBruto(horasTot, tarifaHora)
	// Pre: horasTot >= 0, tarifaHora > 0
	Definir normales, extras Como Real
	JORNADA_SEMANAL <- 48
	RECARGO_EXTRA   <- 1.25
	Si horasTot > JORNADA_SEMANAL Entonces
		normales <- JORNADA_SEMANAL
		extras   <- horasTot - JORNADA_SEMANAL
	Sino
		normales <- horasTot
		extras   <- 0
	FinSi
	bruto <- normales * tarifaHora + extras * tarifaHora * RECARGO_EXTRA
FinFuncion

Algoritmo Planilla
	Definir t, d Como Entero
	Definir horasTot, bruto, afp, netoT Como Real
	Definir totalEmpresa, mayorPago Como Real
	Definir mejorT Como Entero
	TASA_AFP <- 0.10
	N_TRAB <- 5
	N_DIAS <- 6

	leerDatos()

	totalEmpresa <- 0
	mayorPago <- -1
	mejorT <- 0

	Para t <- 1 Hasta N_TRAB Con Paso 1 Hacer
		horasTot <- 0
		Para d <- 1 Hasta N_DIAS Con Paso 1 Hacer      // acumulador por fila
			horasTot <- horasTot + horas[t, d]
		FinPara
		bruto  <- pagoBruto(horasTot, tarifa[t])
		afp    <- bruto * TASA_AFP
		netoT  <- bruto - afp
		neto[t] <- netoT

		totalEmpresa <- totalEmpresa + netoT           // acumulador general
		Si netoT > mayorPago Entonces                  // extremo
			mayorPago <- netoT
			mejorT <- t
		FinSi
		mostrarDetalle(t, horasTot, bruto, afp, netoT)
	FinPara

	Escribir "Total de la planilla: S/ ", totalEmpresa
	Escribir "Promedio por trabajador: S/ ", totalEmpresa / N_TRAB
	Escribir "Mayor pago: ", nombre[mejorT], " con S/ ", mayorPago
FinAlgoritmo`)}

<h2>Paso 6: probar antes de entregar</h2>
${tabla(['Caso de prueba', 'Qué comprueba', 'Resultado esperado'], [
  ['Un trabajador con 40 h', 'camino normal, sin extras', '40 × tarifa, menos 10%'],
  ['Exactamente 48 h', '<b>frontera</b>: ¿cuenta como extra?', 'sin recargo (la condición es <code>&gt; 48</code>)'],
  ['49 h', 'frontera + 1', '48 normales + 1 extra con recargo'],
  ['0 h (faltó toda la semana)', 'el caso vacío', 'pago 0, sin división entre cero'],
  ['Horas negativas', 'validación de entrada', 'rechazado al leer'],
  ['80 h', 'valor extremo plausible', 'muchas extras; ¿hay un tope legal que avisar?'],
  ['Todos con 0 h', 'el promedio general', '0, sin fallar'],
  ['Dos trabajadores empatados en el mayor', 'ambigüedad del requisito', 'decidir: ¿el primero o el último?']
], 'Ocho casos, y tres de ellos (las fronteras y el empate) revelan decisiones que el enunciado no especificaba.')}

${nota('Lo que de verdad enseña este tema',
  '<p>El código es la parte fácil. Lo difícil, y lo que distingue a un profesional, es: hacer las preguntas correctas ' +
  'antes de empezar, elegir las estructuras de datos, descomponer en piezas con una sola responsabilidad, y probar los ' +
  'casos frontera. Si haces esas cuatro cosas, la sintaxis es un detalle que se busca en la documentación.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Convierte el deseo en requisitos',
          enunciado: 'Un cliente dice: «quiero un sistema para manejar el inventario de mi bodega». Escribe al menos 10 preguntas que harías antes de diseñar nada, y marca cuáles son decisiones de negocio y cuáles técnicas.',
          pista: 'Piensa en el qué, el quién, el cuánto, los casos raros y el futuro.',
          solucion: `<p><b>Preguntas de negocio</b> (las contesta el cliente y determinan qué hace el sistema):</p>
<ol>
<li>¿Cuántos productos distintos maneja, hoy y en dos años?</li>
<li>¿Qué datos de cada producto necesita: código, nombre, precio de compra, de venta, stock, vencimiento, proveedor?</li>
<li>¿Vende por unidad, por peso, o ambos? (cambia si el stock es entero o real)</li>
<li>¿Quiere registrar las ventas o solo el stock actual?</li>
<li>¿Necesita saber el histórico o solo la foto de hoy?</li>
<li>¿Hay varios usuarios? ¿Con permisos distintos?</li>
<li>¿Qué hace si el stock llega a cero: bloquear la venta o permitir negativo?</li>
<li>¿Maneja productos con vencimiento? ¿Debe avisar?</li>
<li>¿Necesita emitir comprobantes con validez fiscal? (esto cambia el proyecto por completo)</li>
<li>¿Quién va a usarlo y con qué dispositivo?</li>
</ol>
<p><b>Preguntas técnicas</b> (las decides tú, informado por las anteriores):</p>
<ol>
<li>¿Datos en memoria, en archivo o en base de datos? (lo decide el punto 5 y el 6)</li>
<li>¿Aplicación de escritorio, web o móvil? (lo decide el punto 10)</li>
<li>¿Hace falta que funcione sin internet?</li>
<li>¿Cómo se respaldan los datos? (esta no es opcional: un inventario perdido es un negocio parado)</li>
</ol>
<p><b>La pregunta 9 es la más importante</b> y casi nadie la hace al principio: si necesita facturación electrónica, el proyecto pasa de un ejercicio de inventario a integrarse con la administración tributaria, con sus formatos, firmas digitales y certificaciones. Descubrirlo a mitad del desarrollo significa rehacerlo. <b>Las preguntas que cambian el tamaño del proyecto van primero.</b></p>` },
        { n: 2, titulo: 'Diseña las estructuras',
          enunciado: 'Para el sistema de planilla del tema, el cliente ahora dice que los trabajadores entran y salen (ya no son 5 fijos) y que quiere guardar también el DNI y el cargo. Rediseña las estructuras de datos y di qué partes del algoritmo hay que cambiar.',
          pista: 'Un arreglo de tamaño fijo con una variable de cantidad en uso, y el problema de los arreglos paralelos crece.',
          solucion: `${cod('pseudo', `MAX_TRAB <- 100                   // capacidad
Definir cantidadTrab Como Entero  // cuántos están en uso: ¡imprescindible!

Dimension nombre[MAX_TRAB]
Dimension dni[MAX_TRAB]           // Cadena, no Entero
Dimension cargo[MAX_TRAB]
Dimension tarifa[MAX_TRAB]
Dimension activo[MAX_TRAB]        // Logico: para "salió" sin borrar el histórico
Dimension horas[MAX_TRAB, 6]
Dimension neto[MAX_TRAB]`)}
<p><b>Cambios en el algoritmo:</b></p>
<ul>
<li>Todos los recorridos pasan de <code>Hasta N_TRAB</code> a <code>Hasta cantidadTrab</code>. Olvidar uno procesa casillas vacías.</li>
<li>Hace falta <code>agregarTrabajador()</code>, que comprueba <code>cantidadTrab &lt; MAX_TRAB</code> y la unicidad del DNI.</li>
<li>Hace falta <code>buscarPorDNI()</code>, porque ahora la identidad del trabajador es el DNI y no su posición.</li>
<li>«Dar de baja» se resuelve mejor con la bandera <code>activo</code> que eliminando la fila: si borras al trabajador, pierdes su histórico de pagos y las planillas antiguas dejan de cuadrar. Esto se llama <b>borrado lógico</b> y en sistemas con contabilidad o auditoría es obligatorio.</li>
<li>Los cálculos y el promedio deben considerar solo a los activos, lo que introduce un contador aparte y un riesgo nuevo de división entre cero si no hay ninguno.</li>
</ul>
<p><b>El problema de fondo se agrava:</b> ya son siete arreglos paralelos. Añadir un dato significa tocar siete declaraciones; ordenar la planilla por sueldo significa reordenar siete arreglos a la vez, y si uno falla los datos quedan mezclados sin ningún error visible. <b>Esto es exactamente el dolor que inventó los registros y los objetos:</b> un único arreglo de <code>Trabajador</code>, donde cada elemento lleva todos sus campos juntos y es imposible desalinearlos. Si al diseñar sientes ese dolor, el módulo 8 es la respuesta, y notarlo por ti mismo vale más que leerlo.</p>` },
        { n: 3, titulo: 'Implementa el caso de la planilla',
          enunciado: 'Implementa el sistema de planilla completo del tema con 3 trabajadores y datos fijos en el código (para no escribir tanto al probar), incluyendo el desglose por trabajador y el resumen. Verifica a mano uno de los cálculos.',
          pista: 'Usa la función pagoBruto del tema y acumula los totales en el mismo bucle.',
          lab: 'Funcion bruto <- pagoBruto(horasTot, tarifaHora)\n\tDefinir normales, extras Como Real\n\tJORNADA <- 48\n\tRECARGO <- 1.25\n\tSi horasTot > JORNADA Entonces\n\t\tnormales <- JORNADA\n\t\textras <- horasTot - JORNADA\n\tSino\n\t\tnormales <- horasTot\n\t\textras <- 0\n\tFinSi\n\tbruto <- normales * tarifaHora + extras * tarifaHora * RECARGO\nFinFuncion\n\nAlgoritmo PlanillaSemanal\n\tDefinir t, d, mejorT Como Entero\n\tDefinir horasTot, bruto, afp, netoT, totalEmpresa, mayorPago Como Real\n\tDimension nombre[3]\n\tDimension tarifa[3]\n\tDimension horas[3,6]\n\tTASA_AFP <- 0.10\n\n\tnombre[1] <- "Rosa Quispe"\n\ttarifa[1] <- 12.5\n\tnombre[2] <- "Luis Mendoza"\n\ttarifa[2] <- 15\n\tnombre[3] <- "Ana Flores"\n\ttarifa[3] <- 10\n\n\t// trabajador 1: 44 horas (sin extras)\n\thoras[1,1] <- 8\n\thoras[1,2] <- 8\n\thoras[1,3] <- 8\n\thoras[1,4] <- 8\n\thoras[1,5] <- 8\n\thoras[1,6] <- 4\n\t// trabajador 2: 54 horas (6 extras)\n\thoras[2,1] <- 9\n\thoras[2,2] <- 9\n\thoras[2,3] <- 9\n\thoras[2,4] <- 9\n\thoras[2,5] <- 9\n\thoras[2,6] <- 9\n\t// trabajador 3: 48 horas (frontera exacta)\n\thoras[3,1] <- 8\n\thoras[3,2] <- 8\n\thoras[3,3] <- 8\n\thoras[3,4] <- 8\n\thoras[3,5] <- 8\n\thoras[3,6] <- 8\n\n\ttotalEmpresa <- 0\n\tmayorPago <- -1\n\tmejorT <- 0\n\n\tEscribir "===== PLANILLA SEMANAL ====="\n\tPara t <- 1 Hasta 3 Con Paso 1 Hacer\n\t\thorasTot <- 0\n\t\tPara d <- 1 Hasta 6 Con Paso 1 Hacer\n\t\t\thorasTot <- horasTot + horas[t,d]\n\t\tFinPara\n\t\tbruto <- pagoBruto(horasTot, tarifa[t])\n\t\tafp <- bruto * TASA_AFP\n\t\tnetoT <- bruto - afp\n\t\ttotalEmpresa <- totalEmpresa + netoT\n\t\tSi netoT > mayorPago Entonces\n\t\t\tmayorPago <- netoT\n\t\t\tmejorT <- t\n\t\tFinSi\n\t\tEscribir nombre[t], " | ", horasTot, " h | tarifa ", tarifa[t], " | bruto ", bruto, " | AFP ", afp, " | NETO ", netoT\n\tFinPara\n\tEscribir "----------------------------"\n\tEscribir "Total planilla: S/ ", totalEmpresa\n\tEscribir "Promedio: S/ ", totalEmpresa / 3\n\tEscribir "Mayor pago: ", nombre[mejorT], " con S/ ", mayorPago\nFinAlgoritmo',
          solucion: `<p><b>Verificación a mano del trabajador 2</b> (54 horas, tarifa 15):</p>
<ul>
<li>Horas normales: 48 → 48 × 15 = <b>720</b></li>
<li>Horas extra: 6 → 6 × 15 × 1.25 = 6 × 18.75 = <b>112.50</b></li>
<li>Bruto: 720 + 112.50 = <b>832.50</b></li>
<li>AFP (10%): <b>83.25</b></li>
<li>Neto: 832.50 − 83.25 = <b>749.25</b></li>
</ul>
<p>Ejecuta el laboratorio y compara. Si no coincide, el error está en el algoritmo y no en tu aritmética: eso es exactamente para lo que sirve verificar un caso a mano.</p>
<p><b>El trabajador 3 prueba la frontera:</b> con exactamente 48 horas no debe recibir recargo, porque la condición es <code>&gt; 48</code>. Si el requisito real fuera «a partir de 48 se paga recargo», habría que cambiar a <code>&gt;=</code> y el resultado cambiaría. <b>Esa diferencia de un carácter es dinero real en la cuenta de una persona</b>, y es el tipo de detalle que hay que confirmar con quien define la regla en lugar de suponerlo.</p>` },
        { n: 4, titulo: 'Encuentra los requisitos ocultos',
          enunciado: 'El sistema de planilla ya funciona. Enumera al menos 6 requisitos que el cliente no mencionó pero que seguramente va a pedir en cuanto lo use, y di qué parte del diseño actual habría que cambiar para cada uno.',
          pista: 'Piensa en lo que pasa la segunda semana, lo que pasa cuando alguien se equivoca, y lo que pasa cuando el negocio crece.',
          solucion: `<ol>
<li><b>«¿Y la semana pasada?»</b> — Necesita histórico. Hoy todo vive en memoria y se pierde al cerrar. Requiere persistencia en archivo o base de datos, y una dimensión más (la semana) en todas las estructuras. Es el cambio más grande de la lista.</li>
<li><b>«Me equivoqué al escribir las horas de Luis.»</b> — Necesita edición y recálculo, no solo carga inicial. Implica buscar al trabajador, modificar un dato y volver a calcular, en lugar de un flujo de un solo paso.</li>
<li><b>«Quiero imprimir la boleta de cada uno.»</b> — Necesita salida formateada por trabajador, con un formato fijo y probablemente exportación a PDF o impresión directa. La lógica de cálculo no cambia; la de presentación sí, y conviene que ya estén separadas.</li>
<li><b>«Rosa tiene adelantos que hay que descontar.»</b> — Un concepto nuevo de descuento, variable por trabajador y por semana. Si los descuentos están codificados como «AFP 10%» y nada más, habrá que generalizarlos a una lista de conceptos. Esto se ve venir desde el diseño: <b>los conceptos de pago y descuento son datos, no código</b>.</li>
<li><b>«Ahora hay un feriado y se paga doble.»</b> — Reglas por día y no solo por total semanal. La función <code>pagoBruto</code> actual recibe solo el total de horas, así que pierde la información del día: habría que pasarle el detalle. Es un ejemplo de cómo una abstracción cómoda hoy bloquea un requisito mañana.</li>
<li><b>«Que no lo vea todo el mundo.»</b> — Usuarios y permisos. Afecta a la arquitectura completa, no a un cálculo.</li>
<li><b>«El contador necesita el archivo en Excel.»</b> — Exportación. Relativamente fácil si la lógica está separada de la presentación.</li>
<li><b>«Cambió la tasa de AFP.»</b> — Si está en una constante con nombre, es una línea. Si está como <code>0.1</code> repetido en cuatro sitios, es un bug esperando a ocurrir. <b>Aquí se cobra la disciplina de las constantes.</b></li>
</ol>
<p><b>La lección:</b> ningún requisito está completo, y el objetivo del diseño no es adivinar el futuro sino <b>no cerrarse puertas</b>. Las dos decisiones que más puertas dejan abiertas son siempre las mismas: separar el cálculo de la presentación, y tratar las reglas de negocio como datos con nombre en lugar de números incrustados en el código.</p>` },
        { n: 5, titulo: 'Proyecto propio',
          enunciado: 'Elige un problema de tu propio entorno (un inventario, un registro de notas, un control de gastos, una agenda) y recorre los seis pasos completos: preguntas, EPS, estructuras de datos, descomposición en subprogramas, pseudocódigo y tabla de casos de prueba. Impleméntalo en el laboratorio.',
          pista: 'Elige algo pequeño y real. Un problema de 5 funciones que termines vale más que uno de 30 que abandones.',
          solucion: `<p>No hay una solución única, pero sí una lista de verificación para evaluar la tuya:</p>
${tabla(['Paso', 'Está bien si…', 'Está mal si…'], [
  ['Preguntas', 'tienes al menos 8, y algunas cambian el tamaño del proyecto', 'solo preguntaste detalles de formato'],
  ['EPS', 'puedes nombrar cada entrada con su tipo y rango válido', 'la entrada dice «los datos»'],
  ['Estructuras', 'justificas cada tipo, y los importes son enteros en céntimos', 'usas Real para dinero o Entero para un DNI'],
  ['Descomposición', 'ningún subprograma necesita «y» en su nombre', 'tienes un <code>procesarTodo()</code> de 80 líneas'],
  ['Pseudocódigo', 'las constantes tienen nombre y las validaciones están en los bordes', 'hay números mágicos y la lógica está anidada en 5 niveles'],
  ['Pruebas', 'incluyes el caso vacío, el de un elemento y las fronteras exactas', 'solo probaste el caso típico']
])}
<p><b>Dos consejos para que lo termines,</b> que valen más que cualquier técnica:</p>
<ul>
<li><b>Haz primero la versión mínima que funcione de punta a punta</b>, aunque sea con datos fijos en el código y sin validaciones. Un programa que carga 3 productos y muestra el total es un cimiento sobre el que se puede construir; cinco funciones perfectas que nunca se conectan entre sí no son nada. Esto se llama <i>vertical slice</i> y es cómo trabajan los equipos profesionales.</li>
<li><b>Prueba cada pieza en cuanto la escribas</b>, no al final. Encontrar un error en la función que acabas de escribir toma un minuto; encontrarlo cuando hay 300 líneas nuevas encima toma una tarde. Esta es la razón de ser del laboratorio de este curso: ejecutar es gratis, así que ejecuta constantemente.</li>
</ul>
<p>Cuando lo tengas funcionando, vuelve a este ejercicio y hazte la pregunta del ejercicio 4: ¿qué va a pedir el usuario en cuanto lo use? Esa pregunta, hecha con un programa ya funcionando delante, es la mejor clase de diseño que vas a recibir.</p>` }
      ],
      quiz: [
        { p: 'Ante el pedido «quiero un sistema para mi negocio», lo primero que hay que hacer es…',
          ops: ['elegir el lenguaje de programación', 'hacer preguntas hasta convertir el deseo en requisitos concretos',
            'empezar a programar la pantalla principal', 'diseñar la base de datos'],
          ok: 1, exp: 'Las preguntas que no se hacen al principio son la causa principal de que un programa haya que rehacerlo. Y las que cambian el tamaño del proyecto van primero.' },
        { p: 'El riesgo principal de usar arreglos paralelos es que…',
          ops: ['ocupan mucha memoria', 'si se ordena uno y no los demás, los datos se desalinean sin dar ningún error',
            'no se pueden recorrer con bucles', 'solo admiten números'],
          ok: 1, exp: 'El resultado es «basura coherente»: el programa sigue funcionando y entrega datos mezclados. Es el problema que resuelven los registros y los objetos.' },
        { p: 'Al probar un cálculo con un umbral de 48 horas, el caso de prueba más valioso es…',
          ops: ['40 horas', 'exactamente 48 y 49 horas', '100 horas', 'cualquier valor típico'],
          ok: 1, exp: 'Las fronteras exactas son donde vive la diferencia entre <code>&gt;</code> y <code>&gt;=</code>, y en este caso esa diferencia es dinero en la cuenta de una persona.' }
      ]
    }
  ]
});
