/* ===== MÓDULO 7 — Algoritmos y complejidad ===== */
CDC.registrar({
  id: 'm7',
  nivel: 'Avanzado',
  titulo: 'Algoritmos y complejidad',
  resumen: 'Cómo medir un algoritmo sin ejecutarlo, los algoritmos clásicos de búsqueda y ordenamiento, recursión y las grandes técnicas de diseño.',
  intro: '<p>Dos programas pueden resolver lo mismo y diferir en un factor de un millón. Este módulo te da el lenguaje ' +
    'para hablar de esa diferencia —la notación O— y los algoritmos clásicos que todo programador debe conocer, no para ' +
    'reimplementarlos (las bibliotecas ya los traen) sino para <strong>reconocer cuándo aplicarlos y por qué funcionan</strong>.</p>' +
    '<p>El <a href="#herramientas">comparador de complejidades</a> del laboratorio te deja ver estos números con tus propios datos.</p>',
  temas: [

    {
      id: 'm7-1',
      titulo: 'Notación O: medir sin ejecutar',
      resumen: 'Qué significa O(n), cómo calcularla contando operaciones, y qué ignora deliberadamente.',
      objetivos: [
        'Calcular la complejidad de un algoritmo contando sus operaciones dominantes',
        'Ordenar las complejidades habituales de mejor a peor',
        'Saber qué información oculta la notación O y cuándo eso importa'
      ],
      lectura: `
<p>Medir un algoritmo cronometrándolo tiene un problema: el resultado depende de la máquina, del lenguaje, del
compilador y de qué más esté corriendo. Lo que queremos saber es algo más profundo: <strong>cómo crece el trabajo
cuando crecen los datos</strong>. Eso es independiente de la máquina y es lo que mide la notación O.</p>

<h2>La idea</h2>
<p>La notación <strong>O grande</strong> describe el comportamiento asintótico: cómo se comporta el algoritmo cuando
<code>n</code> tiende a infinito, ignorando constantes y términos menores.</p>

<p>Si un algoritmo ejecuta <code>3n² + 5n + 100</code> operaciones, decimos que es <strong>O(n²)</strong>. Se descartan
el 3, el <code>5n</code> y el 100 porque, cuando <code>n</code> es grande, el <code>n²</code> domina todo lo demás:
con n = 1000, el término cuadrático aporta 3 000 000 y el resto 5100, menos del 0,2%.</p>

${tabla(['#n', '#3n²', '#5n', '#100', '% del n²'], [
  ['10', '300', '50', '100', '67%'], ['100', '30 000', '500', '100', '98%'],
  ['1 000', '3 000 000', '5 000', '100', '99,8%'], ['1 000 000', '3×10¹²', '5×10⁶', '100', '99,9998%']
], 'Cuanto mayor es n, menos importan los términos pequeños. Eso justifica quedarse solo con el dominante.')}

<h2>Las complejidades que vas a encontrar</h2>
${tabla(['Notación', 'Nombre', 'Ejemplo típico', 'n=10', 'n=1000', 'n=10⁶'], [
  ['<b>O(1)</b>', 'constante', 'acceder a <code>a[i]</code>, insertar en una pila', '1', '1', '1'],
  ['<b>O(log n)</b>', 'logarítmica', 'búsqueda binaria, altura de un árbol equilibrado', '3', '10', '20'],
  ['<b>O(n)</b>', 'lineal', 'recorrer un arreglo, búsqueda lineal', '10', '1 000', '10⁶'],
  ['<b>O(n log n)</b>', 'casi lineal', 'merge sort, quicksort, ordenar bien', '33', '10 000', '2×10⁷'],
  ['<b>O(n²)</b>', 'cuadrática', 'burbuja, comparar todos contra todos', '100', '10⁶', '10¹²'],
  ['<b>O(n³)</b>', 'cúbica', 'multiplicar matrices (versión ingenua)', '1 000', '10⁹', '10¹⁸'],
  ['<b>O(2ⁿ)</b>', 'exponencial', 'generar todos los subconjuntos', '1 024', '10³⁰¹', '—'],
  ['<b>O(n!)</b>', 'factorial', 'todas las permutaciones', '3,6×10⁶', '—', '—']
], 'Hasta O(n log n) todo es manejable. A partir de O(n²) hay que pensarlo, y O(2ⁿ) solo sirve para n pequeños.')}

${nota('La frontera práctica',
  '<p>Suponiendo 10⁸ operaciones por segundo: un algoritmo O(n²) con n = 100 000 tarda unos <strong>17 minutos</strong>; ' +
  'uno O(n log n) con los mismos datos tarda <strong>17 milésimas de segundo</strong>. No es una mejora: es la ' +
  'diferencia entre que el problema sea resoluble o no.</p>', 'key')}

<h2>Cómo calcularla</h2>
<p>Tres reglas bastan para casi todo:</p>

<p><strong>1. Instrucciones en secuencia: se suman, y manda la mayor.</strong></p>
${cod('pseudo', `Para i <- 1 Hasta n Hacer ... FinPara        // O(n)
Para i <- 1 Hasta n Hacer                      // O(n²)
	Para j <- 1 Hasta n Hacer ... FinPara
FinPara
// Total: O(n) + O(n²) = O(n²)`)}

<p><strong>2. Bucles anidados: se multiplican.</strong></p>
${cod('pseudo', `Para i <- 1 Hasta n Hacer
	Para j <- 1 Hasta m Hacer
		operacion()        // O(1)
	FinPara
FinPara
// Total: O(n × m). Si m = n, O(n²)`)}

<p><strong>3. Si algo se divide a la mitad en cada paso: aparece el logaritmo.</strong></p>
${cod('pseudo', `Mientras n > 1 Hacer
	n <- n / 2
FinMientras
// ¿Cuántas vueltas? Las que hagan falta para que n llegue a 1
// dividiendo entre 2: eso es log2(n). Con n = 1 000 000, unas 20.`)}

<p>El logaritmo crece tan despacio que es casi una constante: <code>log₂</code> de mil es 10, de un millón es 20, de mil
millones es 30. Un algoritmo logarítmico apenas nota que los datos crezcan, y por eso buscar en un índice de base de
datos con mil millones de registros es instantáneo.</p>

<h2>Lo que la notación O ignora deliberadamente</h2>
<p>Y aquí está el matiz que distingue a quien entiende la herramienta de quien la repite:</p>

<ul>
  <li><strong>Las constantes.</strong> Un O(n) que hace 1000 operaciones por elemento es peor que un O(n²) hasta
  n = 1000. En la práctica esto importa mucho: por eso <code>sort</code> de verdad usa inserción para tramos pequeños
  aunque sea O(n²).</li>
  <li><strong>El tamaño real de n.</strong> Si tu <code>n</code> nunca pasa de 20, todo da igual y gana el código más
  simple.</li>
  <li><strong>La memoria y la caché.</strong> Dos algoritmos O(n) pueden diferir en 10 veces por los patrones de acceso
  (módulo 6).</li>
  <li><strong>El caso que ocurre de verdad.</strong> Quicksort es O(n²) en el peor caso y aun así es el ordenamiento más
  usado, porque ese peor caso es rarísimo y su caso promedio es excelente.</li>
</ul>

<h2>Peor caso, mejor caso y caso promedio</h2>
${tabla(['Notación', 'Significado', 'Ejemplo: búsqueda lineal'], [
  ['<b>O</b> (O grande)', 'cota superior: no será peor que esto', 'O(n): el elemento no está'],
  ['<b>Ω</b> (omega)', 'cota inferior: no será mejor que esto', 'Ω(1): está en la primera posición'],
  ['<b>Θ</b> (theta)', 'cota ajustada: crece exactamente así', 'Θ(n) en el caso promedio']
], 'En la práctica se dice «O» para todo, pero cuando alguien distingue, se refiere a esto.')}

<p>Lo que importa al elegir un algoritmo depende del contexto: para un sistema interactivo importa el
<strong>peor caso</strong> (nadie quiere que una de cada mil búsquedas tarde diez segundos); para un proceso por lotes
importa el <strong>promedio</strong>.</p>

<h2>Complejidad espacial</h2>
<p>La misma notación se aplica a la memoria. Un algoritmo que ordena «en el sitio» usa O(1) de memoria extra; merge sort
necesita O(n) adicional. Casi siempre hay un <strong>intercambio</strong>: puedes gastar memoria para ganar tiempo
(el diccionario del módulo 6) o al revés (recalcular en lugar de guardar).</p>

${nota('Pruébalo ahora', '<p>Abre el <a href="#herramientas">comparador de complejidades</a> del laboratorio. Pon n = 10 ' +
  'y mira: todas las filas son parecidas. Ahora pon n = 100 000 y mira otra vez. Esa diferencia es de lo que trata ' +
  'todo este módulo.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Calcula la complejidad',
          enunciado: 'Da la complejidad de cada fragmento: (a) un bucle de 1 a n; (b) dos bucles de 1 a n, uno después del otro; (c) un bucle de 1 a n con otro de 1 a n dentro; (d) un bucle de 1 a n con otro de 1 a 100 dentro; (e) <code>Mientras n &gt; 1: n ← n/2</code>; (f) un bucle de 1 a n que dentro hace una búsqueda binaria.',
          pista: 'Secuencia suma, anidamiento multiplica, división a la mitad da logaritmo.',
          solucion: `<p><b>(a) O(n).</b></p>
<p><b>(b) O(n) + O(n) = O(2n) = <b>O(n)</b>.</b> Las constantes se descartan: dos recorridos siguen siendo lineales.</p>
<p><b>(c) O(n²).</b> Anidamiento con el mismo límite.</p>
<p><b>(d) O(100n) = <b>O(n)</b>.</b> El bucle interno no depende de n: es una constante. Este caso confunde a mucha gente, y la prueba es que duplicar n duplica el trabajo, no lo cuadruplica.</p>
<p><b>(e) O(log n).</b> Cada vuelta reduce n a la mitad.</p>
<p><b>(f) O(n log n).</b> n vueltas, cada una con una búsqueda binaria de O(log n).</p>` },
        { n: 2, titulo: 'Ordena por eficiencia',
          enunciado: 'Ordena de más rápida a más lenta y calcula cuántas operaciones hace cada una con n = 1000: O(n²), O(1), O(n log n), O(2ⁿ), O(n), O(log n), O(n³).',
          pista: 'log₂(1000) ≈ 10.',
          solucion: `${tabla(['#Orden', 'Complejidad', '#Operaciones con n = 1000', 'Tiempo a 10⁸ op/s'], [
  ['1', 'O(1)', '1', 'instantáneo'],
  ['2', 'O(log n)', '~10', 'instantáneo'],
  ['3', 'O(n)', '1 000', 'instantáneo'],
  ['4', 'O(n log n)', '~10 000', 'instantáneo'],
  ['5', 'O(n²)', '1 000 000', '0,01 s'],
  ['6', 'O(n³)', '10⁹', '10 segundos'],
  ['7', 'O(2ⁿ)', '~10³⁰¹', 'más que la edad del universo']
])}
<p>El salto más dramático está entre O(n³) y O(2ⁿ): la diferencia entre «lento pero posible» e «imposible para siempre». Y conviene notar que <b>una computadora mil veces más rápida no salva un algoritmo exponencial</b>: solo le permite aumentar n en 10 unidades. Con los algoritmos exponenciales no se gana comprando hardware, se gana cambiando de algoritmo.</p>` },
        { n: 3, titulo: 'Mide en la práctica',
          enunciado: 'En la consola JavaScript del laboratorio, escribe dos funciones que busquen duplicados en un arreglo: una O(n²) comparando todos contra todos y otra O(n) con un Set. Mide ambas con 1000, 5000 y 20 000 elementos y comprueba si los tiempos crecen como predice la teoría.',
          pista: 'Al cuadruplicar n, la O(n²) debería tardar 16 veces más y la O(n) solo 4.',
          solucion: `${cod('js', `function dupCuadratico(a) {
  for (let i = 0; i < a.length; i++)
    for (let j = i + 1; j < a.length; j++)
      if (a[i] === a[j]) return true;
  return false;
}

function dupLineal(a) {
  const vistos = new Set();
  for (const x of a) {
    if (vistos.has(x)) return true;
    vistos.add(x);
  }
  return false;
}

for (const n of [1000, 5000, 20000]) {
  // peor caso: sin duplicados, hay que recorrerlo todo
  const datos = Array.from({ length: n }, (_, i) => i);

  let t0 = performance.now();
  dupCuadratico(datos);
  let t1 = performance.now();
  dupLineal(datos);
  let t2 = performance.now();

  console.log(\`n=\${n}  cuadrático: \${(t1-t0).toFixed(1)} ms   lineal: \${(t2-t1).toFixed(2)} ms\`);
}`)}
<p><b>Resultados típicos:</b> con n = 1000 el cuadrático tarda ~0,5 ms; con 5000, ~12 ms (25 veces más al quintuplicar n: 5² = 25 ✔); con 20 000, ~200 ms (16 veces más al cuadruplicar: 4² = 16 ✔). El lineal se mantiene por debajo del milisegundo en los tres casos.</p>
<p><b>Lo valioso del ejercicio</b> es comprobar que la predicción teórica se cumple en la realidad: al multiplicar n por k, un O(n²) tarda k² veces más. Eso permite <b>extrapolar</b>: si con 20 000 tarda 200 ms, con 200 000 tardará unos 20 segundos y con 2 000 000, media hora. Puedes predecir si tu algoritmo sobrevivirá a los datos de producción sin esperar a que falle allí.</p>
<p>Detalle metodológico: hay que probar el <b>peor caso</b> (sin duplicados). Con duplicados al principio, el cuadrático sale en la primera comparación y parece rapidísimo. Medir el caso favorable es la forma más común de engañarse a uno mismo con un <i>benchmark</i>.</p>` },
        { n: 4, titulo: 'Cuándo O() engaña',
          enunciado: 'Da tres situaciones reales en las que elegir el algoritmo con mejor notación O sería un error, y explica por qué.',
          pista: 'Constantes, tamaño de n, y patrones de acceso a memoria.',
          solucion: `<p><b>1. Cuando n es pequeño y las constantes son grandes.</b> El ordenamiento por inserción es O(n²) y el merge sort O(n log n), pero para arreglos de menos de ~15 elementos el de inserción es <b>más rápido</b>: no hace llamadas recursivas, no reserva memoria y aprovecha la caché. Por eso las implementaciones reales de <code>sort</code> (Timsort en Python y Java, introsort en C++) usan inserción para los tramos pequeños. La notación O describe el comportamiento asintótico, y «asintótico» significa «cuando n es grande».</p>
<p><b>2. Cuando el patrón de acceso a memoria domina.</b> Recorrer una lista enlazada y un arreglo son ambos O(n), y el arreglo es 5-10 veces más rápido por la caché (módulo 6). La notación O cuenta operaciones y trata todos los accesos a memoria como iguales, cuando en el hardware real uno puede costar 200 veces más que otro.</p>
<p><b>3. Cuando el peor caso casi nunca ocurre.</b> Quicksort es O(n²) en el peor caso y merge sort O(n log n) garantizado; sin embargo quicksort suele ganar en la práctica, porque su caso promedio es O(n log n) con constantes menores, ordena en el sitio sin memoria extra, y con un pivote aleatorio el peor caso tiene una probabilidad despreciable.</p>
<p><b>Un cuarto caso que vale mencionar:</b> el algoritmo de multiplicación de matrices de Coppersmith-Winograd tiene mejor exponente que todos los conocidos, y <b>nadie lo usa</b>: sus constantes son tan astronómicas que solo gana con matrices mayores que cualquier cosa que quepa en el universo observable. Se les llama <i>algoritmos galácticos</i>.</p>
<p><b>La conclusión:</b> la notación O es una herramienta de <b>diseño</b> —te dice qué enfoques son viables antes de escribir código— y no un sustituto de <b>medir</b>. Las dos cosas, en ese orden.</p>` },
        { n: 5, titulo: 'Analiza un algoritmo real',
          enunciado: 'Analiza la complejidad temporal y espacial de este algoritmo, que busca el par de puntos más cercano en un plano. Luego investiga si existe algo mejor y qué técnica usa.<br><pre>mejor ← infinito\nPara i ← 1 Hasta n\n    Para j ← i+1 Hasta n\n        d ← distancia(p[i], p[j])\n        Si d &lt; mejor Entonces mejor ← d\n</pre>',
          pista: 'Cuenta los pares. Y la alternativa famosa usa divide y vencerás.',
          solucion: `<p><b>Complejidad temporal:</b> el bucle interno hace n−1, n−2, …, 1 iteraciones. El total es <code>n(n−1)/2 ≈ n²/2</code>, así que es <b>O(n²)</b>. Que sea la mitad de n² no cambia la clase: las constantes se descartan.</p>
<p><b>Complejidad espacial:</b> <b>O(1)</b> de memoria extra (solo <code>mejor</code>, <code>d</code>, <code>i</code> y <code>j</code>), sin contar los puntos de entrada.</p>
<p><b>Sí existe algo mejor: O(n log n)</b>, mediante <b>divide y vencerás</b> (Shamos y Hoey, 1975):</p>
<ol>
<li>Ordenar los puntos por la coordenada x: O(n log n).</li>
<li>Partir por la mitad con una línea vertical y resolver recursivamente cada mitad, obteniendo la distancia mínima <code>d</code> de ambas.</li>
<li><b>El paso ingenioso:</b> el par más cercano podría tener un punto en cada mitad. Solo hay que examinar los puntos que están a menos de <code>d</code> de la línea divisoria, y se demuestra que, ordenándolos por y, <b>cada punto solo necesita compararse con los 7 siguientes</b>. Ese número constante es lo que mantiene el paso de combinación en O(n).</li>
</ol>
<p>La recurrencia resultante, <code>T(n) = 2T(n/2) + O(n)</code>, da <b>O(n log n)</b>, igual que el merge sort. Con un millón de puntos: 10¹² operaciones contra 2×10⁷, es decir, de horas a milisegundos.</p>
<p><b>Lo que enseña este ejercicio</b> es la pregunta que hay que hacerse siempre ante un algoritmo cuadrático: <i>¿de verdad hace falta comparar todos los pares?</i> Muy a menudo la respuesta es no, y la forma de evitarlo es <b>aprovechar una estructura del problema</b> —aquí, que los puntos cercanos en el plano también lo están en el eje x—. Ordenar primero para que las cosas relacionadas queden juntas es una de las ideas más productivas de todo el diseño de algoritmos.</p>` }
      ],
      quiz: [
        { p: 'Un algoritmo que ejecuta <code>5n² + 100n + 2000</code> operaciones es…',
          ops: ['O(5n²)', 'O(n²)', 'O(n² + n)', 'O(2000)'],
          ok: 1, exp: 'Se descartan constantes y términos menores: solo queda el dominante. Con n grande, el n² es el 99,9% del trabajo.' },
        { p: 'Un bucle de 1 a n con otro de 1 a 100 dentro es…',
          ops: ['O(n²)', 'O(n), porque 100 es una constante', 'O(100n²)', 'O(log n)'],
          ok: 1, exp: 'El bucle interno no depende de n. Duplicar n duplica el trabajo, no lo cuadruplica: es lineal.' },
        { p: 'La notación O <b>no</b> tiene en cuenta…',
          ops: ['el número de operaciones', 'las constantes, el tamaño real de n y los efectos de la caché',
            'los bucles anidados', 'la recursión'],
          ok: 1, exp: 'Describe el crecimiento asintótico. Por eso un O(n²) puede ser más rápido que un O(n log n) para n pequeño, y por eso hay que medir además de analizar.' }
      ]
    },

    {
      id: 'm7-2',
      titulo: 'Búsqueda: lineal y binaria',
      resumen: 'Los dos algoritmos de búsqueda fundamentales, el poder de tener los datos ordenados y los errores clásicos.',
      objetivos: [
        'Implementar búsqueda lineal y binaria correctamente',
        'Decidir si vale la pena ordenar para poder buscar mejor',
        'Evitar los tres errores clásicos de la búsqueda binaria'
      ],
      lectura: `
<h2>Búsqueda lineal: mirar uno por uno</h2>
${cod('pseudo', `Funcion pos <- buscarLineal(a, n, x)
	pos <- 0                            // 0 = no encontrado
	i <- 1
	Mientras i <= n Y pos = 0 Hacer
		Si a[i] = x Entonces  pos <- i  Sino  i <- i + 1  FinSi
	FinMientras
FinFuncion`)}

<p><strong>O(n)</strong> en el peor caso, y es la <em>única</em> opción si los datos no están ordenados. En promedio
examina la mitad de los elementos. Su virtud es que no exige nada: funciona con cualquier colección, en cualquier
orden, con cualquier criterio de comparación.</p>

<h2>Búsqueda binaria: descartar la mitad en cada paso</h2>
<p>Si los datos están <strong>ordenados</strong>, cada comparación puede descartar la mitad del arreglo. Es el método que
usas sin pensarlo al buscar en un diccionario de papel: abres por el medio y decides hacia qué lado seguir.</p>

${cod('pseudo', `Funcion pos <- buscarBinaria(a, n, x)
	Definir izq, der, medio Como Entero
	izq <- 1
	der <- n
	pos <- 0
	Mientras izq <= der Y pos = 0 Hacer
		medio <- izq + trunc((der - izq) / 2)      // ver nota sobre el desbordamiento
		Si a[medio] = x Entonces
			pos <- medio
		Sino
			Si a[medio] < x Entonces
				izq <- medio + 1                    // descarta la mitad izquierda
			Sino
				der <- medio - 1                    // descarta la mitad derecha
			FinSi
		FinSi
	FinMientras
FinFuncion`)}

${fig(`<svg viewBox="0 0 560 190" width="560" height="190" role="img" aria-label="Pasos de una búsqueda binaria">
<g color="var(--fg-soft)">
${[[3, 7, 12, 18, 23, 31, 42, 56, 67, 78], [23, 31, 42, 56, 67, 78], [23, 31]].map(function (fila, f) {
  var y = 22 + f * 56;
  var off = f === 1 ? 4 : (f === 2 ? 4 : 0);
  return fila.map(function (v, i) {
    var x = 20 + (i + off) * 52;
    var esMedio = (f === 0 && i === 4) || (f === 1 && i === 2) || (f === 2 && i === 0);
    return '<rect x="' + x + '" y="' + y + '" width="46" height="34" rx="3" fill="' +
      (esMedio ? 'var(--warm-soft)' : 'var(--accent-soft)') + '" stroke="' +
      (esMedio ? 'var(--warm)' : 'var(--accent)') + '" stroke-width="' + (esMedio ? 2 : 1.3) + '"/>' +
      '<text x="' + (x + 23) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="12" font-weight="' +
      (esMedio ? '700' : '400') + '" fill="var(--fg)">' + v + '</text>';
  }).join('');
}).join('')}
<text x="545" y="44" text-anchor="end" font-size="10.5" fill="var(--fg-soft)">medio=23 &lt; 31 → derecha</text>
<text x="545" y="100" text-anchor="end" font-size="10.5" fill="var(--fg-soft)">medio=42 &gt; 31 → izquierda</text>
<text x="545" y="156" text-anchor="end" font-size="10.5" fill="var(--fg-soft)">medio=23 &lt; 31 → derecha</text>
<text x="280" y="182" text-anchor="middle" font-size="11.5" fill="var(--fg)">Buscando el 31: tres comparaciones en lugar de seis.</text>
</g></svg>`, 'Cada comparación descarta la mitad de los candidatos.')}

<h2>La diferencia es brutal</h2>
${tabla(['#Elementos', 'Lineal (peor caso)', 'Binaria (peor caso)'], [
  ['10', '10', '4'], ['1 000', '1 000', '10'], ['1 000 000', '1 000 000', '20'],
  ['1 000 000 000', '10⁹', '30'], ['Todos los átomos del universo (~10⁸⁰)', '10⁸⁰', '266']
], 'La búsqueda binaria sobre todos los átomos del universo necesitaría 266 comparaciones. Eso es un logaritmo.')}

<h2>Los tres errores clásicos</h2>
<p>La búsqueda binaria se describe en tres líneas y es <strong>notoriamente difícil</strong> de escribir bien. Jon
Bentley observó que el 90% de los programadores profesionales no consigue escribirla correctamente en dos horas, y la
versión de la biblioteca estándar de Java tuvo un bug durante <strong>nueve años</strong>.</p>

<p><strong>1. El bucle infinito.</strong> Si al descartar escribes <code>izq ← medio</code> en lugar de
<code>izq ← medio + 1</code>, cuando queden dos elementos el <code>medio</code> será siempre el mismo y el bucle no
terminará. El elemento del medio <strong>ya se comparó</strong>: hay que excluirlo.</p>

<p><strong>2. El desbordamiento.</strong> <code>medio ← (izq + der) / 2</code> parece inofensivo, y con arreglos de más
de mil millones de elementos la suma <code>izq + der</code> desborda un entero de 32 bits y da un número negativo. Este
fue el bug de Java (y del libro de Bentley que lo popularizó), descubierto en 2006. La forma segura es
<code>medio ← izq + (der − izq) / 2</code>, que nunca suma dos índices grandes.</p>

<p><strong>3. Los límites.</strong> ¿<code>izq &lt;= der</code> o <code>izq &lt; der</code>? ¿<code>der = n</code> o
<code>der = n − 1</code>? Las combinaciones incorrectas producen algoritmos que funcionan para casi todos los casos y
fallan con el primer elemento, el último o el arreglo vacío. La única defensa es probar esos casos siempre.</p>

${nota('La precondición que nadie documenta',
  '<p>La búsqueda binaria <strong>exige</strong> que el arreglo esté ordenado. Si no lo está, no da error: devuelve un ' +
  'resultado equivocado en silencio. Es la precondición más incumplida de la programación, y la razón por la que esa ' +
  'condición debe estar escrita en el contrato de la función.</p>', 'warn')}

<h2>¿Vale la pena ordenar para buscar?</h2>
<p>Ordenar cuesta O(n log n) y luego cada búsqueda cuesta O(log n). Buscar linealmente cuesta O(n) sin preparación.
Con <code>k</code> búsquedas sobre <code>n</code> datos:</p>

<p style="text-align:center;font-family:var(--f-mono)">ordenar + buscar: n log n + k log n &nbsp;&nbsp;vs&nbsp;&nbsp; lineal: k × n</p>

<p>Con n = 1 000 000: ordenar cuesta ~2×10⁷ operaciones. Una sola búsqueda lineal cuesta 10⁶. Así que si vas a buscar
<strong>menos de 20 veces</strong>, no vale la pena ordenar. A partir de ahí, ordenar se amortiza y luego cada búsqueda
es gratis. Y si vas a buscar millones de veces, el diccionario (O(1)) es mejor que ambos, salvo que necesites rangos.</p>

<h2>Variantes que aparecen todo el tiempo</h2>
<ul>
  <li><strong>Límite inferior / superior:</strong> en lugar de «¿está?», responder «¿dónde habría que insertarlo para
  mantener el orden?». Es lo que hace <code>bisect</code> en Python, y sirve para contar cuántos elementos son menores
  que x.</li>
  <li><strong>Búsqueda binaria sobre la respuesta.</strong> La técnica más potente y la menos obvia: cuando el problema
  es «encontrar el menor valor que cumple una condición monótona», se puede hacer búsqueda binaria sobre el
  <em>rango de respuestas posibles</em> aunque no haya ningún arreglo. Ejemplo: «¿cuál es la menor capacidad de barco
  que permite transportar toda la carga en 10 días?».</li>
  <li><strong>Búsqueda ternaria:</strong> para encontrar el máximo de una función con un solo pico.</li>
</ul>
      `,
      ejercicios: [
        { n: 1, titulo: 'Traza una búsqueda binaria',
          enunciado: 'Dado el arreglo [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], traza paso a paso la búsqueda del 23 y la del 40, mostrando izq, der y medio en cada vuelta. Cuenta las comparaciones.',
          pista: 'medio = izq + (der − izq) / 2, truncado.',
          solucion: `<p><b>Buscando el 23:</b></p>
${tabla(['Vuelta', '#izq', '#der', '#medio', 'a[medio]', 'Decisión'], [
  ['1', '1', '10', '5', '16', '16 &lt; 23 → izq = 6'],
  ['2', '6', '10', '8', '56', '56 &gt; 23 → der = 7'],
  ['3', '6', '7', '6', '23', '<b>¡encontrado en la posición 6!</b>']
], '3 comparaciones. La búsqueda lineal habría necesitado 6.')}
<p><b>Buscando el 40 (que no está):</b></p>
${tabla(['Vuelta', '#izq', '#der', '#medio', 'a[medio]', 'Decisión'], [
  ['1', '1', '10', '5', '16', '16 &lt; 40 → izq = 6'],
  ['2', '6', '10', '8', '56', '56 &gt; 40 → der = 7'],
  ['3', '6', '7', '6', '23', '23 &lt; 40 → izq = 7'],
  ['4', '7', '7', '7', '38', '38 &lt; 40 → izq = 8'],
  ['5', '—', '—', '—', '—', 'izq (8) &gt; der (7) → <b>no está</b>']
], '4 comparaciones para descartar 10 elementos.')}
<p>El caso «no está» es el que agota el bucle, y por eso la condición de salida <code>izq &gt; der</code> es la que hay que verificar con cuidado: es donde viven los bucles infinitos.</p>
<p><b>Dato interesante:</b> cuando el bucle termina sin encontrar, <code>izq</code> contiene exactamente la posición donde habría que insertar el 40 para mantener el orden (la 8, entre el 38 y el 56). Esa es la variante «límite inferior», y sale gratis.</p>` },
        { n: 2, titulo: 'Implementa y prueba',
          enunciado: 'Implementa la búsqueda binaria en el laboratorio y pruébala con los casos frontera: el primer elemento, el último, uno que no está y menor que todos, uno que no está y mayor que todos, y un arreglo de un solo elemento.',
          pista: 'Los casos frontera son donde fallan las implementaciones mal escritas.',
          lab: 'Funcion pos <- binaria(a, n, x)\n\tDefinir izq, der, medio, pasos Como Entero\n\tizq <- 1\n\tder <- n\n\tpos <- 0\n\tpasos <- 0\n\tMientras izq <= der Y pos = 0 Hacer\n\t\tpasos <- pasos + 1\n\t\tmedio <- izq + trunc((der - izq) / 2)\n\t\tSi a[medio] = x Entonces\n\t\t\tpos <- medio\n\t\tSino\n\t\t\tSi a[medio] < x Entonces\n\t\t\t\tizq <- medio + 1\n\t\t\tSino\n\t\t\t\tder <- medio - 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinMientras\n\tEscribir "   (", pasos, " comparaciones)"\nFinFuncion\n\nAlgoritmo ProbarBinaria\n\tDefinir i, n Como Entero\n\tDimension a[10]\n\tn <- 10\n\ta[1] <- 2\n\ta[2] <- 5\n\ta[3] <- 8\n\ta[4] <- 12\n\ta[5] <- 16\n\ta[6] <- 23\n\ta[7] <- 38\n\ta[8] <- 56\n\ta[9] <- 72\n\ta[10] <- 91\n\n\tEscribir "buscar 2 (primero):"\n\tEscribir "  -> posición ", binaria(a, n, 2)\n\tEscribir "buscar 91 (último):"\n\tEscribir "  -> posición ", binaria(a, n, 91)\n\tEscribir "buscar 23 (medio):"\n\tEscribir "  -> posición ", binaria(a, n, 23)\n\tEscribir "buscar 1 (menor que todos):"\n\tEscribir "  -> posición ", binaria(a, n, 1)\n\tEscribir "buscar 100 (mayor que todos):"\n\tEscribir "  -> posición ", binaria(a, n, 100)\n\tEscribir "buscar 40 (en el medio, no está):"\n\tEscribir "  -> posición ", binaria(a, n, 40)\n\tEscribir "arreglo de 1 elemento, buscar 2:"\n\tEscribir "  -> posición ", binaria(a, 1, 2)\n\tEscribir "arreglo de 1 elemento, buscar 9:"\n\tEscribir "  -> posición ", binaria(a, 1, 9)\n\tEscribir "arreglo vacío:"\n\tEscribir "  -> posición ", binaria(a, 0, 5)\nFinAlgoritmo',
          solucion: `<p>Resultados esperados: 1, 10, 6, 0, 0, 0, 1, 0, 0. Si alguno difiere, la implementación tiene un error de límites.</p>
<p><b>Por qué estos casos y no otros:</b></p>
<ul>
<li><b>Primero y último:</b> detectan un <code>der = n − 1</code> escrito por costumbre de los lenguajes que indexan desde 0, que haría invisible el último elemento.</li>
<li><b>Menor que todos:</b> <code>der</code> baja hasta 0 y el bucle debe salir sin acceder a <code>a[0]</code>.</li>
<li><b>Mayor que todos:</b> <code>izq</code> sube hasta n+1 y el bucle debe salir sin acceder a <code>a[n+1]</code>. En C, estos dos casos mal resueltos leen memoria ajena en silencio.</li>
<li><b>Arreglo de un elemento:</b> <code>izq = der = 1</code>, y el bucle debe entrar exactamente una vez. Con <code>Mientras izq &lt; der</code> no entraría nunca.</li>
<li><b>Arreglo vacío (n = 0):</b> <code>izq = 1 &gt; der = 0</code>, el bucle no entra y devuelve «no encontrado» sin tocar nada. Es el caso que más se olvida.</li>
</ul>
<p>Observa también el número de comparaciones: nunca más de 4 para 10 elementos, porque <code>log₂(10) ≈ 3,3</code>, que redondeado hacia arriba da 4.</p>` },
        { n: 3, titulo: 'El bug de Java',
          enunciado: 'Explica con números concretos por qué <code>medio = (izq + der) / 2</code> falla con arreglos grandes en un lenguaje con enteros de 32 bits, y por qué <code>medio = izq + (der − izq) / 2</code> es seguro. ¿Por qué estuvo nueve años sin detectarse?',
          pista: 'El máximo de un entero de 32 bits con signo es 2 147 483 647.',
          solucion: `<p><b>El fallo:</b> con un arreglo de 2 000 000 000 de elementos, en algún momento <code>izq ≈ 1 500 000 000</code> y <code>der ≈ 1 900 000 000</code>. Su suma es <code>3 400 000 000</code>, que supera el máximo de un entero de 32 bits con signo (2 147 483 647). El resultado <b>desborda</b> y se convierte en un número negativo (−894 967 296). Al dividirlo entre 2 sigue siendo negativo, y <code>a[medio]</code> con un índice negativo lanza una excepción o, en C, lee memoria arbitraria.</p>
<p><b>Por qué la otra forma es segura:</b> <code>der − izq</code> es siempre menor o igual que <code>der</code>, así que nunca desborda; dividirlo entre 2 lo hace aún menor; y sumárselo a <code>izq</code> da un valor entre <code>izq</code> y <code>der</code>, ambos dentro del rango. <b>Matemáticamente son idénticas; computacionalmente no.</b></p>
<p><b>Por qué tardó nueve años en salir:</b></p>
<ul>
<li>Hacen falta arreglos de <b>más de mil millones de elementos</b> para provocarlo. En 1997, cuando se escribió, ninguna máquina normal tenía memoria para eso: el bug era literalmente inalcanzable.</li>
<li>El código estaba en <code>java.util.Arrays.binarySearch</code>, revisado por expertos y copiado del libro de Jon Bentley, que a su vez lo había publicado como ejemplo de código correcto. <b>La autoridad de la fuente desalienta la revisión.</b></li>
<li>Nadie escribe pruebas con arreglos de mil millones de elementos: ocuparían 8 GB solo en datos.</li>
</ul>
<p><b>Las dos lecciones:</b> primero, el módulo 1 no era teoría —el desbordamiento de enteros tumba bibliotecas estándar revisadas durante una década—. Segundo, y más incómoda: <b>un programa correcto lo es respecto a los supuestos con los que se escribió</b>. El supuesto implícito «los arreglos no llegan a mil millones» era cierto en 1997 y dejó de serlo. Es exactamente el mismo mecanismo que destruyó el Ariane 5.</p>` },
        { n: 4, titulo: 'Ordenar o no ordenar',
          enunciado: 'Tienes 500 000 registros desordenados. (a) ¿Cuántas búsquedas tendrías que hacer para que compense ordenarlos primero? (b) ¿Qué pasa si los datos cambian constantemente? (c) ¿Y si necesitas tanto búsqueda exacta como consultas por rango?',
          pista: 'Compara n·log n + k·log n contra k·n. Y piensa en el costo de mantener el orden.',
          solucion: `<p><b>(a)</b> Ordenar cuesta aproximadamente <code>500 000 × log₂(500 000) ≈ 500 000 × 19 ≈ 9,5 millones</code> de operaciones. Cada búsqueda lineal cuesta en promedio 250 000 y cada búsqueda binaria unas 19. El punto de equilibrio:</p>
<p style="text-align:center;font-family:var(--f-mono)">9 500 000 + 19k = 250 000k → k ≈ 38</p>
<p>A partir de unas <b>38 búsquedas</b>, ordenar se amortiza. Con 1000 búsquedas, ordenar es unas 26 veces más rápido en total.</p>
<p><b>(b) Si los datos cambian constantemente</b>, mantener el orden tiene su propio costo: insertar en un arreglo ordenado es O(n) porque hay que correr elementos. Con muchas inserciones, eso puede superar lo que ahorras al buscar. Las opciones:</p>
<ul>
<li><b>Árbol equilibrado:</b> inserción y búsqueda en O(log n), siempre ordenado. Es lo adecuado para datos dinámicos con consultas ordenadas.</li>
<li><b>Tabla hash:</b> inserción y búsqueda exacta en O(1), pero sin orden.</li>
<li><b>Reordenar por lotes:</b> acumular las inserciones en una zona aparte y reordenar cada cierto tiempo. Es lo que hacen muchas bases de datos de series temporales.</li>
</ul>
<p><b>(c) Si necesitas búsqueda exacta <i>y</i> rangos:</b> un árbol equilibrado (o un arreglo ordenado si los datos son estáticos) da ambas cosas: exacta en O(log n) y rango en O(log n + k). La tabla hash sería más rápida en la exacta pero inútil para rangos. En la práctica, las bases de datos resuelven esto manteniendo <b>varios índices</b> sobre los mismos datos, cada uno optimizado para un tipo de consulta: pagas memoria y escrituras más lentas a cambio de lecturas rápidas en varios patrones.</p>
<p><b>La pregunta de diseño que resume todo:</b> ¿cuál es la proporción entre lecturas y escrituras, y qué forma tienen las consultas? Esa respuesta elige la estructura, no la elegancia del algoritmo.</p>` },
        { n: 5, titulo: 'Búsqueda binaria sobre la respuesta',
          enunciado: 'Un barco debe transportar n paquetes, en orden, en como máximo D días. Cada día carga paquetes consecutivos sin superar su capacidad. Encuentra la <b>menor capacidad</b> que permite hacerlo en D días. Explica por qué se puede usar búsqueda binaria si no hay ningún arreglo ordenado que buscar.',
          pista: 'Si una capacidad C funciona, cualquiera mayor también. Esa monotonía es lo que permite la búsqueda binaria.',
          solucion: `<p><b>La idea clave:</b> no buscamos en los datos, buscamos en el <b>espacio de respuestas posibles</b>. La capacidad está entre dos valores conocidos:</p>
<ul>
<li><b>Mínimo:</b> el paquete más pesado (si no cabe, es imposible).</li>
<li><b>Máximo:</b> la suma de todos (cabe todo en un día).</li>
</ul>
<p><b>La propiedad que lo hace posible — la monotonía:</b> si con capacidad C se puede en D días, con C+1 también (nunca puede empeorar). Así que la función «¿se puede con capacidad C?» va de <code>falso, falso, …, falso, verdadero, verdadero, …</code>, y buscamos la frontera. <b>Esa es exactamente la situación de una búsqueda binaria</b>, aunque no haya ningún arreglo: el «arreglo» es el rango de capacidades y la «comparación» es una simulación.</p>
${cod('pseudo', `Funcion cabe <- sePuede(pesos, n, capacidad, D)
	dias <- 1
	cargaActual <- 0
	cabe <- Verdadero
	Para i <- 1 Hasta n Con Paso 1 Hacer
		Si pesos[i] > capacidad Entonces
			cabe <- Falso                       // un paquete no entra: imposible
		FinSi
		Si cargaActual + pesos[i] > capacidad Entonces
			dias <- dias + 1                    // empieza un día nuevo
			cargaActual <- pesos[i]
		Sino
			cargaActual <- cargaActual + pesos[i]
		FinSi
	FinPara
	Si dias > D Entonces  cabe <- Falso  FinSi
FinFuncion

Funcion resp <- capacidadMinima(pesos, n, D)
	izq <- maximo(pesos, n)                     // cota inferior
	der <- suma(pesos, n)                       // cota superior
	resp <- der
	Mientras izq <= der Hacer
		medio <- izq + trunc((der - izq) / 2)
		Si sePuede(pesos, n, medio, D) Entonces
			resp <- medio                       // funciona: probemos con menos
			der <- medio - 1
		Sino
			izq <- medio + 1                    // no funciona: hace falta más
		FinSi
	FinMientras
FinFuncion`)}
<p><b>Complejidad:</b> <code>O(n log S)</code>, donde S es la suma de los pesos. Cada verificación recorre los n paquetes (greedy, O(n)) y hay log S verificaciones. Con 50 000 paquetes y suma 10⁹: unas 30 verificaciones × 50 000 = 1,5 millones de operaciones. Probar todas las capacidades una por una habría costado 10⁹ × 50 000 = 5×10¹³.</p>
<p><b>Por qué esta técnica importa tanto:</b> convierte un problema de optimización («encuentra el mínimo que cumple X») en un problema de decisión («¿cumple X con este valor?»), que casi siempre es mucho más fácil. Se aplica a cualquier problema con respuesta monótona: la mínima velocidad para llegar a tiempo, el mínimo tamaño de servidor que aguanta la carga, el mínimo número de máquinas para una producción, la máxima calidad que cabe en un ancho de banda.</p>
<p><b>La pregunta que hay que hacerse</b> ante un problema de optimización es siempre la misma: <i>si me dan una respuesta candidata, ¿puedo verificarla rápido? ¿Y es monótona?</i> Si ambas respuestas son sí, hay una búsqueda binaria esperando.</p>` }
      ],
      quiz: [
        { p: 'La búsqueda binaria en un arreglo de un millón de elementos necesita, como máximo…',
          ops: ['1 000 000 de comparaciones', '1000 comparaciones', '20 comparaciones', '100 comparaciones'],
          ok: 2, exp: 'log₂(1 000 000) ≈ 20. Cada comparación descarta la mitad de los candidatos.' },
        { p: '<code>medio = (izq + der) / 2</code> es peligroso porque…',
          ops: ['es lento', 'la suma puede desbordar el entero con arreglos muy grandes',
            'no da el medio exacto', 'no funciona con índices desde 1'],
          ok: 1, exp: 'Fue el bug de java.util.Arrays.binarySearch durante nueve años. La forma segura es <code>izq + (der − izq) / 2</code>.' },
        { p: 'Si la búsqueda binaria recibe un arreglo <b>no</b> ordenado…',
          ops: ['lanza un error', 'devuelve un resultado equivocado en silencio',
            'funciona igual pero más lento', 'ordena el arreglo primero'],
          ok: 1, exp: 'No tiene forma de detectarlo sin recorrerlo todo, lo que anularía su ventaja. Es la precondición más incumplida de la programación.' }
      ]
    },

    {
      id: 'm7-3',
      titulo: 'Ordenamientos elementales',
      resumen: 'Burbuja, selección e inserción: cómo funcionan, por qué son O(n²) y por qué uno de ellos sigue usándose.',
      objetivos: [
        'Implementar y trazar los tres ordenamientos cuadráticos',
        'Comparar sus comportamientos en el mejor y peor caso',
        'Entender qué significa que un ordenamiento sea estable'
      ],
      lectura: `
<p>Ordenar es, probablemente, el problema más estudiado de la informática. Los tres algoritmos elementales son
cuadráticos y por eso no se usan para grandes volúmenes, pero hay que conocerlos: aparecen dentro de los algoritmos
eficientes, son fáciles de razonar y uno de ellos tiene una propiedad que lo mantiene vivo.</p>

<h2>1. Ordenamiento por intercambio (burbuja)</h2>
<p>Compara elementos adyacentes y los intercambia si están desordenados. En cada pasada, el mayor «sube» hasta su sitio
como una burbuja.</p>

${cod('pseudo', `SubProceso burbuja(a, n)
	Para i <- 1 Hasta n - 1 Con Paso 1 Hacer
		huboCambio <- Falso
		Para j <- 1 Hasta n - i Con Paso 1 Hacer      // n-i: los últimos ya están
			Si a[j] > a[j + 1] Entonces
				intercambiar(a[j], a[j + 1])
				huboCambio <- Verdadero
			FinSi
		FinPara
		Si NO huboCambio Entonces
			salir            // ya está ordenado: optimización importante
		FinSi
	FinPara
FinSubProceso`)}

<p>La bandera <code>huboCambio</code> no es decorativa: sin ella el burbuja siempre hace n−1 pasadas; con ella, un
arreglo ya ordenado se detecta en una sola pasada, lo que hace su mejor caso <strong>O(n)</strong>.</p>

<h2>2. Ordenamiento por selección</h2>
<p>Busca el mínimo del tramo no ordenado y lo pone en su lugar definitivo.</p>

${cod('pseudo', `SubProceso seleccion(a, n)
	Para i <- 1 Hasta n - 1 Con Paso 1 Hacer
		minimo <- i
		Para j <- i + 1 Hasta n Con Paso 1 Hacer      // patrón "extremo"
			Si a[j] < a[minimo] Entonces  minimo <- j  FinSi
		FinPara
		Si minimo <> i Entonces  intercambiar(a[i], a[minimo])  FinSi
	FinPara
FinSubProceso`)}

<p>Su rasgo distintivo: hace <strong>exactamente n−1 intercambios</strong>, pase lo que pase. Eso lo hace interesante
cuando mover un elemento es muy caro (registros grandes, escrituras en memoria flash con desgaste limitado).</p>

<h2>3. Ordenamiento por inserción</h2>
<p>Es como ordenar cartas en la mano: tomas la siguiente y la insertas en su lugar entre las que ya tienes ordenadas.</p>

${cod('pseudo', `SubProceso insercion(a, n)
	Para i <- 2 Hasta n Con Paso 1 Hacer
		actual <- a[i]
		j <- i - 1
		Mientras j >= 1 Y a[j] > actual Hacer
			a[j + 1] <- a[j]        // corre los mayores a la derecha
			j <- j - 1
		FinMientras
		a[j + 1] <- actual          // y coloca el actual en el hueco
	FinPara
FinSubProceso`)}

<h2>Comparación</h2>
${tabla(['', 'Burbuja', 'Selección', 'Inserción'], [
  ['Peor caso', 'O(n²)', 'O(n²)', 'O(n²)'],
  ['Mejor caso', 'O(n) con bandera', 'O(n²) siempre', '<b>O(n)</b>'],
  ['Caso promedio', 'O(n²)', 'O(n²)', 'O(n²)'],
  ['Intercambios', 'hasta n²/2', '<b>exactamente n−1</b>', 'hasta n²/2'],
  ['Memoria extra', 'O(1)', 'O(1)', 'O(1)'],
  ['¿Estable?', 'sí', 'no', '<b>sí</b>'],
  ['¿En línea?', 'no', 'no', '<b>sí</b>: puede ordenar mientras llegan datos'],
  ['Casi ordenado', 'bueno', 'malo', '<b>excelente</b>']
], 'El ordenamiento por inserción gana en casi todo lo que importa de los tres.')}

<h2>Estabilidad: la propiedad que parece un detalle</h2>
<p>Un ordenamiento es <strong>estable</strong> si los elementos con la misma clave conservan su orden relativo original.
Parece irrelevante hasta que ordenas por dos criterios:</p>

<p>Quieres una lista de empleados ordenada <strong>por departamento y, dentro de cada uno, por sueldo</strong>. Con un
ordenamiento estable basta ordenar dos veces: primero por sueldo, después por departamento. Al ordenar por departamento,
los empleados del mismo departamento conservan el orden por sueldo que ya tenían. Con un ordenamiento inestable ese
truco no funciona y hay que escribir una función de comparación compuesta.</p>

<p>Por eso <code>sort()</code> de Python y Java garantizan estabilidad, y es la razón por la que ambos usan Timsort y no
quicksort (que es inestable).</p>

<h2>¿Por qué aprender algoritmos que no vas a usar?</h2>
<p>Tres razones concretas, más allá del examen:</p>
<ol>
  <li><strong>El de inserción sí se usa.</strong> Las implementaciones reales de <code>sort</code> (Timsort, introsort)
  lo emplean para los tramos de menos de ~16 elementos, porque ahí es más rápido que cualquier algoritmo recursivo.</li>
  <li><strong>Son los ejemplos canónicos de invariante de bucle.</strong> «Tras la pasada i, los i mayores están en su
  sitio» (burbuja) o «los primeros i elementos están ordenados entre sí» (inserción) son razonamientos que vas a aplicar
  a tus propios algoritmos.</li>
  <li><strong>Enseñan a comparar con criterio.</strong> Tres algoritmos con la misma complejidad y comportamientos muy
  distintos demuestran que la notación O no es toda la historia.</li>
</ol>

${nota('Lo que de verdad debes hacer',
  '<p>En producción, usa <code>sort()</code> de tu lenguaje. Está implementado por expertos, probado durante décadas, ' +
  'adaptado al hardware y es híbrido. Implementar un ordenamiento a mano en código real es casi siempre un error; ' +
  'entender cómo funcionan es casi siempre un acierto.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Traza los tres',
          enunciado: 'Con el arreglo [5, 2, 9, 1, 7], muestra el estado después de cada pasada completa del burbuja, del selección y del inserción. Cuenta las comparaciones y los intercambios de cada uno.',
          pista: 'Una fila por pasada del bucle externo.',
          solucion: `<p><b>Burbuja</b> (el mayor sube en cada pasada):</p>
${tabla(['Pasada', 'Estado al terminar', '#Comparaciones', '#Intercambios'], [
  ['inicio', '5 2 9 1 7', '—', '—'],
  ['1', '2 5 1 7 <b>9</b>', '4', '3'],
  ['2', '2 1 5 <b>7 9</b>', '3', '2'],
  ['3', '1 2 <b>5 7 9</b>', '2', '1'],
  ['4', '<b>1 2 5 7 9</b>', '1', '0 → la bandera detecta el fin']
], 'Total: 10 comparaciones, 6 intercambios.')}
<p><b>Selección</b> (busca el mínimo y lo coloca):</p>
${tabla(['Pasada', 'Mínimo encontrado', 'Estado al terminar', '#Intercambios'], [
  ['1', '1 (posición 4)', '<b>1</b> 2 9 5 7', '1'],
  ['2', '2 (ya está)', '<b>1 2</b> 9 5 7', '0'],
  ['3', '5 (posición 4)', '<b>1 2 5</b> 9 7', '1'],
  ['4', '7 (posición 5)', '<b>1 2 5 7 9</b>', '1']
], 'Total: 10 comparaciones, 3 intercambios (nunca más de n−1 = 4).')}
<p><b>Inserción</b> (inserta cada elemento entre los ya ordenados):</p>
${tabla(['Inserta', 'Estado al terminar', 'Desplazamientos'], [
  ['2', '<b>2 5</b> 9 1 7', '1'],
  ['9', '<b>2 5 9</b> 1 7', '0 → ya estaba en su sitio'],
  ['1', '<b>1 2 5 9</b> 7', '3'],
  ['7', '<b>1 2 5 7 9</b>', '1']
], 'Total: 7 comparaciones, 5 desplazamientos.')}
<p>El de inserción hizo menos trabajo, y la diferencia crece en arreglos casi ordenados: ahí hace casi cero desplazamientos mientras que el de selección sigue recorriendo todo.</p>` },
        { n: 2, titulo: 'Implementa y compara',
          enunciado: 'Implementa los tres en el laboratorio, con contadores de comparaciones e intercambios, y pruébalos con el mismo arreglo. Luego pruébalos con un arreglo ya ordenado y con uno al revés.',
          pista: 'Lleva variables globales de conteo e imprímelas al final de cada algoritmo.',
          lab: 'Algoritmo CompararOrdenamientos\n\tDefinir i, j, n, t, minimo, actual, comp, inter Como Entero\n\tDefinir huboCambio Como Logico\n\tDimension orig[8]\n\tDimension a[8]\n\tn <- 8\n\torig[1] <- 5\n\torig[2] <- 2\n\torig[3] <- 9\n\torig[4] <- 1\n\torig[5] <- 7\n\torig[6] <- 3\n\torig[7] <- 8\n\torig[8] <- 4\n\n\t// ---- BURBUJA ----\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\ta[i] <- orig[i]\n\tFinPara\n\tcomp <- 0\n\tinter <- 0\n\tPara i <- 1 Hasta n - 1 Con Paso 1 Hacer\n\t\thuboCambio <- Falso\n\t\tPara j <- 1 Hasta n - i Con Paso 1 Hacer\n\t\t\tcomp <- comp + 1\n\t\t\tSi a[j] > a[j + 1] Entonces\n\t\t\t\tt <- a[j]\n\t\t\t\ta[j] <- a[j + 1]\n\t\t\t\ta[j + 1] <- t\n\t\t\t\tinter <- inter + 1\n\t\t\t\thuboCambio <- Verdadero\n\t\t\tFinSi\n\t\tFinPara\n\tFinPara\n\tEscribir Sin Saltar "Burbuja:   "\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir "  (", comp, " comparaciones, ", inter, " intercambios)"\n\n\t// ---- SELECCION ----\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\ta[i] <- orig[i]\n\tFinPara\n\tcomp <- 0\n\tinter <- 0\n\tPara i <- 1 Hasta n - 1 Con Paso 1 Hacer\n\t\tminimo <- i\n\t\tPara j <- i + 1 Hasta n Con Paso 1 Hacer\n\t\t\tcomp <- comp + 1\n\t\t\tSi a[j] < a[minimo] Entonces\n\t\t\t\tminimo <- j\n\t\t\tFinSi\n\t\tFinPara\n\t\tSi minimo <> i Entonces\n\t\t\tt <- a[i]\n\t\t\ta[i] <- a[minimo]\n\t\t\ta[minimo] <- t\n\t\t\tinter <- inter + 1\n\t\tFinSi\n\tFinPara\n\tEscribir Sin Saltar "Selección: "\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir "  (", comp, " comparaciones, ", inter, " intercambios)"\n\n\t// ---- INSERCION ----\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\ta[i] <- orig[i]\n\tFinPara\n\tcomp <- 0\n\tinter <- 0\n\tPara i <- 2 Hasta n Con Paso 1 Hacer\n\t\tactual <- a[i]\n\t\tj <- i - 1\n\t\tMientras j >= 1 Y a[j] > actual Hacer\n\t\t\tcomp <- comp + 1\n\t\t\ta[j + 1] <- a[j]\n\t\t\tinter <- inter + 1\n\t\t\tj <- j - 1\n\t\tFinMientras\n\t\ta[j + 1] <- actual\n\tFinPara\n\tEscribir Sin Saltar "Inserción: "\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir "  (", comp, " comparaciones, ", inter, " desplazamientos)"\nFinAlgoritmo',
          solucion: `<p>Los tres deben producir el mismo arreglo ordenado con números de operaciones distintos. Los experimentos que conviene hacer modificando el arreglo inicial:</p>
<ul>
<li><b>Ya ordenado (1..8):</b> el de inserción hace 0 desplazamientos (su mejor caso, O(n)); el burbuja con bandera sale en una pasada; el de selección hace <b>las mismas 28 comparaciones de siempre</b>, porque no le importa el orden previo. Es su mayor debilidad.</li>
<li><b>Al revés (8..1):</b> el peor caso de los tres. El de inserción hace el máximo de desplazamientos, el burbuja el máximo de intercambios, y el de selección sigue con sus 28 comparaciones y 4 intercambios.</li>
<li><b>Casi ordenado</b> (un par de elementos fuera de sitio): el de inserción es casi lineal; los otros dos no mejoran apenas.</li>
</ul>
<p><b>La conclusión que se ve en los números:</b> el ordenamiento por inserción <b>se adapta a los datos</b>. Esa propiedad tiene nombre —<i>adaptativo</i>— y es la razón por la que Timsort está construido alrededor de él: los datos reales casi nunca están completamente desordenados, sino que tienen tramos ya ordenados que Timsort detecta y aprovecha.</p>` },
        { n: 3, titulo: 'Estabilidad en acción',
          enunciado: 'Tienes empleados con (departamento, sueldo): (Ventas, 3000), (TI, 5000), (Ventas, 4000), (TI, 3000), (RRHH, 3000). Muestra qué resultado da ordenar primero por sueldo y luego por departamento con un algoritmo estable, y por qué con uno inestable el resultado no está garantizado.',
          pista: 'Estable significa que los empates conservan el orden que tenían.',
          solucion: `<p><b>Paso 1 — ordenar por sueldo</b> (ascendente):</p>
<pre>(Ventas, 3000), (TI, 3000), (RRHH, 3000), (Ventas, 4000), (TI, 5000)</pre>
<p>Los tres de 3000 quedan en el orden en que aparecían originalmente, porque el algoritmo es estable.</p>
<p><b>Paso 2 — ordenar por departamento</b>, con un algoritmo <b>estable</b>:</p>
<pre>(RRHH, 3000), (TI, 3000), (TI, 5000), (Ventas, 3000), (Ventas, 4000)</pre>
<p>Dentro de TI quedan 3000 y 5000 <b>en ese orden</b>, y dentro de Ventas, 3000 y 4000. El segundo ordenamiento <b>respetó</b> el trabajo del primero porque no reordenó los empates.</p>
<p><b>Con un algoritmo inestable</b>, el resultado podría ser:</p>
<pre>(RRHH, 3000), (TI, 5000), (TI, 3000), (Ventas, 4000), (Ventas, 3000)</pre>
<p>Los departamentos están bien, pero el orden por sueldo dentro de cada uno <b>se perdió</b>, porque el algoritmo movió libremente los elementos con la misma clave de departamento.</p>
<p><b>Por qué importa:</b> esta técnica —ordenar varias veces, de la clave menos importante a la más importante— es la forma estándar de hacer ordenamientos multinivel en interfaces de usuario. Cuando en una tabla web haces clic en «sueldo» y luego en «departamento», esperas exactamente este comportamiento, y solo funciona si el ordenamiento es estable.</p>
<p>Python y Java <b>garantizan</b> estabilidad en <code>sort()</code>. C++ distingue: <code>std::sort</code> no la garantiza y <code>std::stable_sort</code> sí, a cambio de memoria extra. JavaScript la garantiza desde ES2019; antes dependía del navegador, lo que causó bugs reales difíciles de reproducir.</p>` },
        { n: 4, titulo: 'Mejora el burbuja',
          enunciado: 'El burbuja «bidireccional» (<i>cocktail sort</i>) alterna pasadas hacia la derecha y hacia la izquierda. Explica qué problema resuelve y da un ejemplo concreto donde la mejora sea drástica. ¿Cambia su complejidad?',
          pista: 'Piensa en un elemento pequeño que está al final del arreglo.',
          solucion: `<p><b>El problema que resuelve — las «tortugas»:</b> en el burbuja clásico, un elemento grande que está al principio sube hasta el final en <b>una sola pasada</b> (va saltando con cada comparación). Pero un elemento pequeño que está al final solo retrocede <b>una posición por pasada</b>.</p>
<p><b>Ejemplo drástico:</b> el arreglo <code>[2, 3, 4, 5, 6, 7, 8, 1]</code> está casi ordenado, y el burbuja clásico necesita <b>7 pasadas completas</b> para traer el 1 hasta el principio: unas 28 comparaciones. El bidireccional lo resuelve en <b>una pasada de ida y una de vuelta</b>: la pasada hacia la izquierda arrastra el 1 hasta el inicio de un tirón.</p>
${cod('pseudo', `izq <- 1
der <- n
Repetir
	huboCambio <- Falso
	Para j <- izq Hasta der - 1 Con Paso 1 Hacer        // hacia la derecha
		Si a[j] > a[j+1] Entonces  intercambiar  huboCambio <- Verdadero  FinSi
	FinPara
	der <- der - 1
	Para j <- der Hasta izq Con Paso -1 Hacer          // hacia la izquierda
		Si a[j] > a[j+1] Entonces  intercambiar  huboCambio <- Verdadero  FinSi
	FinPara
	izq <- izq + 1
Hasta Que NO huboCambio`)}
<p><b>¿Cambia la complejidad? No.</b> Sigue siendo <b>O(n²)</b> en el peor y en el caso promedio: con el arreglo en orden inverso hace exactamente el mismo trabajo. La mejora es un <b>factor constante</b> (aproximadamente 2 en muchos casos) y una mejora grande en el caso particular de los elementos pequeños al final.</p>
<p><b>La lección más valiosa del ejercicio:</b> una optimización puede ser muy útil en la práctica y <b>no cambiar la notación O</b>. Y al revés, cambiar la notación O suele requerir una idea <b>estructuralmente distinta</b>, no un ajuste del mismo algoritmo. Para pasar de O(n²) a O(n log n) hubo que inventar divide y vencerás, no pulir el burbuja. Reconocer cuándo estás puliendo y cuándo necesitas otra idea es criterio de diseño.</p>` },
        { n: 5, titulo: 'Ordenamiento sin comparar',
          enunciado: 'El <i>counting sort</i> ordena en O(n + k) sin comparar elementos, donde k es el rango de valores. Explica cómo funciona, impleméntalo para ordenar 20 notas de 0 a 20, y di por qué no contradice el límite teórico de O(n log n) para los ordenamientos.',
          pista: 'Es el casillero de frecuencias del módulo 4 llevado hasta el final.',
          lab: 'Algoritmo CountingSort\n\tDefinir i, j, n, k, pos Como Entero\n\tDimension a[20]\n\tDimension frec[21]\n\tDimension salida[20]\n\tn <- 20\n\tk <- 21\n\n\ta[1] <- 14\n\ta[2] <- 8\n\ta[3] <- 20\n\ta[4] <- 11\n\ta[5] <- 14\n\ta[6] <- 3\n\ta[7] <- 17\n\ta[8] <- 11\n\ta[9] <- 0\n\ta[10] <- 19\n\ta[11] <- 7\n\ta[12] <- 14\n\ta[13] <- 12\n\ta[14] <- 5\n\ta[15] <- 18\n\ta[16] <- 11\n\ta[17] <- 9\n\ta[18] <- 16\n\ta[19] <- 2\n\ta[20] <- 14\n\n\tEscribir Sin Saltar "Original: "\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\n\n\t// 1) contar\n\tPara i <- 1 Hasta k Con Paso 1 Hacer\n\t\tfrec[i] <- 0\n\tFinPara\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tfrec[a[i] + 1] <- frec[a[i] + 1] + 1\n\tFinPara\n\n\t// 2) reconstruir en orden\n\tpos <- 1\n\tPara i <- 1 Hasta k Con Paso 1 Hacer\n\t\tPara j <- 1 Hasta frec[i] Con Paso 1 Hacer\n\t\t\tsalida[pos] <- i - 1\n\t\t\tpos <- pos + 1\n\t\tFinPara\n\tFinPara\n\n\tEscribir Sin Saltar "Ordenado: "\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar salida[i], " "\n\tFinPara\n\tEscribir ""\n\tEscribir ""\n\tEscribir "Operaciones: ", n, " para contar + ", k, " para recorrer casilleros = ", n + k\n\tEscribir "Un O(n log n) habría hecho unas ", n * 5, " comparaciones."\nFinAlgoritmo',
          solucion: `<p><b>Cómo funciona</b>, en dos pasadas:</p>
<ol>
<li><b>Contar:</b> recorrer los datos y, para cada valor v, incrementar <code>frec[v]</code>. Una pasada, O(n).</li>
<li><b>Reconstruir:</b> recorrer los casilleros en orden de valor y escribir cada valor tantas veces como indique su contador. O(n + k).</li>
</ol>
<p>Nunca se compara un elemento con otro: se usa el <b>valor como dirección</b>. Es la misma idea del histograma del módulo 4, llevada a su conclusión.</p>
<p><b>Por qué no contradice el límite de O(n log n):</b> ese límite se demuestra para los <b>ordenamientos por comparación</b>. El argumento es elegante: con n elementos hay n! ordenaciones posibles, cada comparación distingue a lo sumo entre dos ramas, así que hace falta un árbol de decisión de altura al menos <code>log₂(n!) ≈ n log n</code>. <b>El counting sort no compara</b>, así que ese argumento no se le aplica: usa información adicional que el modelo de comparación no permite, a saber, que los valores son enteros en un rango conocido.</p>
<p><b>Sus limitaciones son reales y hay que conocerlas:</b></p>
<ul>
<li>Necesita un arreglo del tamaño del <b>rango</b> k, no de los datos. Para notas de 0 a 20 son 21 casillas y es perfecto; para ordenar 50 sueldos en céntimos entre 0 y 10⁹ necesitaría mil millones de casillas y sería absurdo.</li>
<li>Solo sirve para claves enteras (o convertibles a enteros en un rango acotado).</li>
<li>Es O(n + k), así que solo gana cuando <b>k es comparable a n</b>.</li>
</ul>
<p><b>Su hermano mayor, el <i>radix sort</i>,</b> levanta la restricción del rango ordenando dígito a dígito (o byte a byte) y aplicando counting sort a cada posición. Ordena enteros de 32 bits en O(n) real, y es lo que usan las bases de datos y los sistemas de procesamiento masivo cuando las claves son numéricas. Para que funcione, el counting sort interno <b>debe ser estable</b>: ahí es donde esa propiedad deja de ser un detalle y se vuelve imprescindible.</p>` }
      ],
      quiz: [
        { p: 'El ordenamiento por inserción con un arreglo ya ordenado es…',
          ops: ['O(n²)', 'O(n), porque el bucle interno no entra nunca', 'O(n log n)', 'igual de lento que siempre'],
          ok: 1, exp: 'Cada elemento ya está en su sitio, así que el Mientras interno no se ejecuta. Esa adaptabilidad es la razón de que Timsort se construya alrededor de él.' },
        { p: 'Un ordenamiento «estable» es aquel que…',
          ops: ['nunca falla', 'conserva el orden relativo de los elementos con la misma clave',
            'usa memoria constante', 'es siempre O(n log n)'],
          ok: 1, exp: 'Permite ordenar por varios criterios encadenando ordenamientos, que es cómo funcionan las tablas ordenables de cualquier interfaz.' },
        { p: 'El counting sort ordena en O(n + k) sin contradecir el límite de O(n log n) porque…',
          ops: ['el límite está mal', 'ese límite solo aplica a los ordenamientos basados en comparaciones',
            'usa más memoria', 'solo funciona con pocos datos'],
          ok: 1, exp: 'El límite se demuestra con un árbol de decisión de comparaciones. Counting sort usa el valor como índice, no compara, y por eso escapa al argumento.' }
      ]
    },

    {
      id: 'm7-4',
      titulo: 'Ordenamientos eficientes',
      resumen: 'Merge sort, quicksort y el límite teórico de O(n log n), más lo que usan de verdad las bibliotecas.',
      objetivos: [
        'Explicar merge sort y quicksort y sus diferencias',
        'Entender por qué O(n log n) es el límite de los ordenamientos por comparación',
        'Saber qué usa realmente el sort() de los lenguajes y por qué'
      ],
      lectura: `
<p>Los algoritmos cuadráticos se vuelven inútiles alrededor de los 10 000 elementos. Los dos algoritmos que resolvieron
el problema usan la misma idea general —<strong>divide y vencerás</strong>— con filosofías opuestas.</p>

<h2>Merge sort: divide fácil, combina con trabajo</h2>
<p>Publicado por John von Neumann en 1945. Parte el arreglo por la mitad (sin mirar los datos), ordena cada mitad
recursivamente y luego <strong>mezcla</strong> las dos mitades ordenadas.</p>

${cod('pseudo', `SubProceso mergeSort(a, izq, der)
	Si izq < der Entonces
		medio <- izq + trunc((der - izq) / 2)
		mergeSort(a, izq, medio)           // ordena la mitad izquierda
		mergeSort(a, medio + 1, der)       // ordena la mitad derecha
		mezclar(a, izq, medio, der)        // combina las dos ordenadas
	FinSi
FinSubProceso

SubProceso mezclar(a, izq, medio, der)
	// recorre las dos mitades a la vez tomando siempre el menor
	i <- izq
	j <- medio + 1
	k <- 1
	Mientras i <= medio Y j <= der Hacer
		Si a[i] <= a[j] Entonces          // <= y no < : así es ESTABLE
			temp[k] <- a[i]
			i <- i + 1
		Sino
			temp[k] <- a[j]
			j <- j + 1
		FinSi
		k <- k + 1
	FinMientras
	// copiar lo que quede de la mitad que no se agotó, y volcar temp a 'a'
FinSubProceso`)}

${fig(`<svg viewBox="0 0 560 200" width="560" height="200" role="img" aria-label="Esquema del merge sort dividiendo y combinando">
<g color="var(--fg-soft)" font-size="11.5">
<text x="280" y="18" text-anchor="middle" fill="var(--fg)" font-weight="700">[38 27 43 3 9 82 10]</text>
<text x="150" y="58" text-anchor="middle" fill="var(--fg)">[38 27 43]</text>
<text x="410" y="58" text-anchor="middle" fill="var(--fg)">[3 9 82 10]</text>
<text x="80" y="96" text-anchor="middle" fill="var(--fg-soft)">[38]</text>
<text x="215" y="96" text-anchor="middle" fill="var(--fg-soft)">[27 43]</text>
<text x="345" y="96" text-anchor="middle" fill="var(--fg-soft)">[3 9]</text>
<text x="475" y="96" text-anchor="middle" fill="var(--fg-soft)">[82 10]</text>
<g stroke="var(--accent)" stroke-width="1.3" fill="none">
<path d="M255 24 L165 48"/><path d="M305 24 L395 48"/>
<path d="M128 64 L90 86"/><path d="M172 64 L205 86"/>
<path d="M385 64 L355 86"/><path d="M435 64 L465 86"/>
</g>
<text x="280" y="134" text-anchor="middle" fill="var(--fg-soft)" font-size="11">↓ y ahora se mezclan hacia arriba ↓</text>
<text x="150" y="162" text-anchor="middle" fill="var(--fg)">[27 38 43]</text>
<text x="410" y="162" text-anchor="middle" fill="var(--fg)">[3 9 10 82]</text>
<text x="280" y="190" text-anchor="middle" fill="var(--fg)" font-weight="700">[3 9 10 27 38 43 82]</text>
<g stroke="var(--warm)" stroke-width="1.3" fill="none">
<path d="M170 170 L255 182"/><path d="M390 170 L305 182"/>
</g>
</g></svg>`, 'Merge sort: dividir siempre por la mitad y mezclar las partes ordenadas al volver.')}

<p><strong>O(n log n) garantizado</strong>: hay <code>log n</code> niveles de división y cada nivel mezcla
<code>n</code> elementos. Es <strong>estable</strong> y su rendimiento no depende de los datos. A cambio, necesita
<strong>O(n) de memoria extra</strong> para mezclar.</p>

<h2>Quicksort: divide con trabajo, combina gratis</h2>
<p>Inventado por Tony Hoare en 1959, cuando tenía 26 años. Elige un elemento como <strong>pivote</strong>, reordena el
arreglo para que los menores queden a la izquierda y los mayores a la derecha (<em>partición</em>), y ordena cada lado
recursivamente. Tras la partición no hay nada que combinar: el pivote ya está en su posición definitiva.</p>

${cod('pseudo', `SubProceso quickSort(a, izq, der)
	Si izq < der Entonces
		p <- particionar(a, izq, der)      // deja el pivote en su sitio final
		quickSort(a, izq, p - 1)
		quickSort(a, p + 1, der)
	FinSi
FinSubProceso

Funcion p <- particionar(a, izq, der)
	pivote <- a[der]                       // estrategia simple: el último
	i <- izq - 1
	Para j <- izq Hasta der - 1 Con Paso 1 Hacer
		Si a[j] <= pivote Entonces
			i <- i + 1
			intercambiar(a[i], a[j])
		FinSi
	FinPara
	intercambiar(a[i + 1], a[der])
	p <- i + 1
FinFuncion`)}

<p><strong>O(n log n) en promedio</strong>, pero <strong>O(n²) en el peor caso</strong>: si el pivote resulta ser
siempre el menor o el mayor, las particiones quedan de tamaño 0 y n−1, y el árbol de recursión degenera. Con la
estrategia «último elemento», ese peor caso ocurre justamente con un arreglo <strong>ya ordenado</strong>, que es el más
común en la vida real.</p>

<p>La solución estándar es elegir el pivote con cuidado: aleatorio, o la mediana de tres (primero, medio y último).
Con esas estrategias el peor caso se vuelve astronómicamente improbable.</p>

<h2>Comparación</h2>
${tabla(['', 'Merge sort', 'Quicksort'], [
  ['Peor caso', '<b>O(n log n)</b>', 'O(n²)'],
  ['Caso promedio', 'O(n log n)', 'O(n log n), con constantes menores'],
  ['Memoria extra', 'O(n)', '<b>O(log n)</b> (la pila de recursión)'],
  ['Estable', '<b>sí</b>', 'no'],
  ['Localidad de caché', 'buena', '<b>excelente</b>'],
  ['En disco / datos enormes', '<b>sí, es el estándar</b>', 'no'],
  ['Paralelizable', '<b>muy bien</b>', 'bien']
], 'Quicksort suele ser más rápido en memoria; merge sort es el que se usa cuando los datos no caben en RAM o cuando se necesita estabilidad.')}

<h2>El límite teórico</h2>
<p>¿Se puede ordenar más rápido que O(n log n)? Por comparaciones, <strong>no</strong>, y hay una demostración preciosa:</p>
<ol>
  <li>Con <code>n</code> elementos hay <code>n!</code> ordenaciones posibles.</li>
  <li>Cada comparación tiene dos resultados, así que el algoritmo es un árbol binario de decisión cuyas hojas son las
  ordenaciones posibles.</li>
  <li>Un árbol binario con <code>n!</code> hojas tiene altura al menos <code>log₂(n!)</code>.</li>
  <li>Por la aproximación de Stirling, <code>log₂(n!) ≈ n log₂ n</code>.</li>
</ol>
<p>Por lo tanto, <strong>todo</strong> algoritmo de ordenamiento por comparación necesita al menos ~<code>n log n</code>
comparaciones en el peor caso. Merge sort alcanza ese límite: es óptimo. Y los algoritmos como counting sort y radix
sort lo esquivan porque no comparan.</p>

<h2>Lo que usan de verdad las bibliotecas</h2>
${tabla(['Lenguaje', 'Algoritmo', 'Qué es'], [
  ['Python, Java (objetos)', '<b>Timsort</b>', 'merge sort + inserción, que detecta tramos ya ordenados'],
  ['C++ (<code>std::sort</code>)', '<b>Introsort</b>', 'quicksort que cambia a heapsort si la recursión se vuelve profunda, e inserción para tramos pequeños'],
  ['Java (primitivos)', 'Dual-pivot quicksort', 'quicksort con dos pivotes, más rápido en la práctica'],
  ['Rust', 'driftsort / pdqsort', 'variantes modernas, adaptativas y conscientes de patrones']
], 'Todos son híbridos. Ninguno es un algoritmo «puro» de los libros.')}

<p><strong>Timsort</strong> merece una mención especial: lo escribió Tim Peters en 2002 para Python y es un logro de
ingeniería. Su idea es que los datos reales <em>no</em> están aleatoriamente desordenados: tienen tramos ya ordenados.
Timsort los detecta, los aprovecha, usa inserción para los pequeños y mezcla los grandes. En datos ya ordenados es
O(n). Hoy ordena en Python, Java, Android, Swift y V8.</p>

${nota('Y por eso no implementes un sort',
  '<p>El <code>sort()</code> de tu lenguaje es el resultado de décadas de trabajo, está ajustado al hardware moderno y ' +
  'ha sido probado por millones de usuarios. Conocer los algoritmos sirve para <em>entender su comportamiento</em> ' +
  '—por qué es estable, por qué es rápido con datos casi ordenados, por qué hay que pasarle un comparador— no para ' +
  'sustituirlo.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Traza el merge sort',
          enunciado: 'Traza el merge sort completo con [38, 27, 43, 3, 9, 82, 10]: muestra cada división y cada mezcla. ¿Cuántos niveles de recursión hay?',
          pista: 'Divide hasta llegar a arreglos de un elemento, y después mezcla hacia arriba.',
          solucion: `<p><b>División</b> (de arriba hacia abajo):</p>
<pre>[38 27 43 3 9 82 10]
   ├── [38 27 43]
   │      ├── [38]
   │      └── [27 43]
   │             ├── [27]
   │             └── [43]
   └── [3 9 82 10]
          ├── [3 9]
          │      ├── [3]
          │      └── [9]
          └── [82 10]
                 ├── [82]
                 └── [10]</pre>
<p><b>Mezcla</b> (de abajo hacia arriba):</p>
${tabla(['Mezcla', 'Entradas', 'Resultado'], [
  ['1', '[27] + [43]', '[27 43]'], ['2', '[38] + [27 43]', '[27 38 43]'],
  ['3', '[3] + [9]', '[3 9]'], ['4', '[82] + [10]', '[10 82]'],
  ['5', '[3 9] + [10 82]', '[3 9 10 82]'], ['6', '[27 38 43] + [3 9 10 82]', '<b>[3 9 10 27 38 43 82]</b>']
])}
<p><b>Niveles de recursión: 3</b> (ceil de log₂(7) = 3). En cada nivel se procesan los 7 elementos, así que el trabajo total es 7 × 3 = 21 operaciones de mezcla, frente a las 21 comparaciones del burbuja con n = 7. Con n = 1000: merge sort hace ~10 000 y el burbuja ~500 000.</p>
<p><b>Observa la última mezcla:</b> combina dos arreglos de 3 y 4 elementos recorriéndolos en paralelo y tomando siempre el menor de los dos frentes. Esa operación es O(n) y es la clave de todo: mezclar dos listas ya ordenadas es barato, y por eso la recursión sale a cuenta.</p>` },
        { n: 2, titulo: 'El peor caso del quicksort',
          enunciado: 'Explica qué pasa al aplicar quicksort con pivote «último elemento» a un arreglo ya ordenado [1,2,3,4,5]. Dibuja el árbol de recursión, cuenta las comparaciones y propón dos soluciones.',
          pista: 'Si el pivote es el mayor, una partición queda vacía.',
          solucion: `<p>Con pivote = último elemento y el arreglo ya ordenado, <b>el pivote es siempre el mayor</b>, así que todos los elementos van a la partición izquierda:</p>
<pre>[1 2 3 4 5]  pivote 5 → [1 2 3 4] | 5 | []
[1 2 3 4]    pivote 4 → [1 2 3]   | 4 | []
[1 2 3]      pivote 3 → [1 2]     | 3 | []
[1 2]        pivote 2 → [1]       | 2 | []
[1]          caso base</pre>
<p><b>El árbol de recursión degenera en una lista</b> de profundidad n. Comparaciones: 4+3+2+1 = 10, es decir <code>n(n−1)/2</code>: exactamente lo mismo que el burbuja. <b>O(n²)</b>.</p>
<p>Y hay un segundo problema igual de grave: la profundidad de recursión es n, así que con 100 000 elementos <b>se desborda la pila</b> antes de terminar.</p>
<p><b>La ironía</b> es que el caso que destruye al quicksort —datos ya ordenados— es de los más frecuentes en la vida real.</p>
<p><b>Solución 1 — pivote aleatorio.</b> Elegir una posición al azar e intercambiarla con la última antes de particionar. Ahora ningún orden concreto de entrada provoca el peor caso: la probabilidad de que salga mal es astronómicamente baja, y además <b>no depende de la entrada</b>, lo que protege también frente a un atacante que conozca el algoritmo.</p>
<p><b>Solución 2 — mediana de tres.</b> Tomar el primero, el del medio y el último, y usar como pivote el valor intermedio de los tres. Con un arreglo ordenado, el elemento del medio es un pivote <b>perfecto</b>. Es determinista, barato (dos comparaciones) y es lo que usan la mayoría de las implementaciones reales.</p>
<p><b>Solución 3 — la de las bibliotecas:</b> <i>introsort</i> cuenta la profundidad de recursión y, si supera <code>2·log n</code>, cambia a <b>heapsort</b>, que garantiza O(n log n). Así conserva la velocidad del quicksort en el caso normal y pone un suelo al peor caso. Es un buen ejemplo de ingeniería frente a pureza algorítmica.</p>` },
        { n: 3, titulo: 'Implementa el merge',
          enunciado: 'Implementa en el laboratorio solo la operación de <b>mezcla</b>: recibe dos arreglos ya ordenados y produce uno ordenado con todos los elementos. Es la pieza central del merge sort.',
          pista: 'Dos índices que avanzan, tomando siempre el menor de los dos frentes. Y no olvides lo que quede al final.',
          lab: 'Algoritmo Mezclar\n\tDefinir i, j, k, n1, n2 Como Entero\n\tDimension a[5]\n\tDimension b[6]\n\tDimension r[11]\n\tn1 <- 5\n\tn2 <- 6\n\ta[1] <- 2\n\ta[2] <- 8\n\ta[3] <- 15\n\ta[4] <- 23\n\ta[5] <- 40\n\tb[1] <- 1\n\tb[2] <- 9\n\tb[3] <- 12\n\tb[4] <- 30\n\tb[5] <- 31\n\tb[6] <- 55\n\n\ti <- 1\n\tj <- 1\n\tk <- 1\n\tMientras i <= n1 Y j <= n2 Hacer\n\t\tSi a[i] <= b[j] Entonces\n\t\t\tr[k] <- a[i]\n\t\t\ti <- i + 1\n\t\tSino\n\t\t\tr[k] <- b[j]\n\t\t\tj <- j + 1\n\t\tFinSi\n\t\tk <- k + 1\n\tFinMientras\n\t// lo que quede de a\n\tMientras i <= n1 Hacer\n\t\tr[k] <- a[i]\n\t\ti <- i + 1\n\t\tk <- k + 1\n\tFinMientras\n\t// lo que quede de b\n\tMientras j <= n2 Hacer\n\t\tr[k] <- b[j]\n\t\tj <- j + 1\n\t\tk <- k + 1\n\tFinMientras\n\n\tEscribir Sin Saltar "A: "\n\tPara i <- 1 Hasta n1 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\n\tEscribir ""\n\tEscribir Sin Saltar "B: "\n\tPara i <- 1 Hasta n2 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar b[i], " "\n\tFinPara\n\tEscribir ""\n\tEscribir Sin Saltar "Mezclado: "\n\tPara i <- 1 Hasta n1 + n2 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar r[i], " "\n\tFinPara\n\tEscribir ""\n\tEscribir "Comparaciones: a lo sumo ", n1 + n2 - 1\nFinAlgoritmo',
          solucion: `<p>Las tres partes del algoritmo y por qué cada una es necesaria:</p>
<ol>
<li><b>El bucle principal</b> avanza mientras <b>ambos</b> arreglos tienen elementos, tomando siempre el menor de los dos frentes.</li>
<li><b>Los dos bucles de vaciado</b> copian lo que quede del arreglo que no se agotó. Solo uno de los dos llega a ejecutarse. <b>Olvidarlos es el error número uno</b> de este algoritmo, y produce un resultado al que le faltan elementos.</li>
<li><b>El <code>&lt;=</code> en la comparación</b> (y no <code>&lt;</code>) es lo que hace el merge sort <b>estable</b>: ante un empate, se toma primero el del arreglo izquierdo, que es el que venía antes en el original. Cambiar ese único carácter rompe la estabilidad sin que ninguna prueba de «¿está ordenado?» lo detecte.</li>
</ol>
<p><b>Costo:</b> cada elemento se copia exactamente una vez, así que mezclar dos arreglos de tamaño total n cuesta <b>O(n)</b> con a lo sumo n−1 comparaciones. Esa linealidad es lo que hace viable el merge sort: log n niveles × O(n) por nivel = O(n log n).</p>
<p><b>Dónde más aparece esta operación:</b> unir dos listas de resultados ya ordenadas, fusionar archivos ordenados que no caben en memoria (<i>external merge sort</i>, el algoritmo que usan las bases de datos para ordenar tablas gigantes), y combinar flujos de eventos por marca de tiempo. Saber mezclar bien es más útil que saber ordenar.</p>` },
        { n: 4, titulo: 'El límite teórico',
          enunciado: 'Explica con tus palabras por qué ningún algoritmo de ordenamiento por comparación puede ser mejor que O(n log n). Luego calcula el mínimo de comparaciones necesarias para ordenar 5 elementos y comprueba si algún algoritmo lo alcanza.',
          pista: 'Cuenta las ordenaciones posibles y piensa en cuánta información aporta cada comparación.',
          solucion: `<p><b>El argumento del árbol de decisión:</b></p>
<ol>
<li>Con n elementos distintos hay <b>n!</b> permutaciones posibles, y el algoritmo debe poder producir cualquiera de ellas según cómo estén los datos.</li>
<li>Cada comparación responde una pregunta de sí o no, así que la ejecución del algoritmo es un camino por un <b>árbol binario</b> donde cada nodo es una comparación.</li>
<li>Para distinguir n! casos distintos hacen falta al menos n! hojas, y un árbol binario con n! hojas tiene altura mínima <code>log₂(n!)</code>.</li>
<li>La altura del árbol es el número de comparaciones en el peor caso. Por Stirling, <code>log₂(n!) ≈ n log₂ n − 1,44n</code>, que es <b>Θ(n log n)</b>.</li>
</ol>
<p>Dicho de forma más intuitiva: cada comparación aporta <b>un bit</b> de información, y para identificar una entre n! posibilidades hacen falta log₂(n!) bits. No se puede extraer más información de la que cabe en las respuestas.</p>
<p><b>Para n = 5:</b> hay 5! = 120 permutaciones. <code>log₂(120) = 6,91</code>, y como el número de comparaciones es entero, el mínimo teórico es <b>7 comparaciones</b>.</p>
<p><b>¿Alguien lo alcanza?</b> Sí: existe un algoritmo específico para 5 elementos que lo consigue en 7 comparaciones (el ordenamiento por inserción binaria, con el orden adecuado). Pero <b>el merge sort necesita 8</b> y el quicksort más todavía. Y aquí está lo interesante: el mínimo teórico <b>no siempre es alcanzable</b> para todo n. Para n = 12 el límite inferior es 29 comparaciones y se demostró que hacen falta 30; para n = 13 se tardó décadas en resolver cuál es el mínimo real.</p>
<p><b>Lo que esto enseña sobre la informática teórica:</b> una cota inferior es una afirmación sobre <b>todos los algoritmos posibles, incluidos los que nadie ha inventado todavía</b>. Es un tipo de conocimiento muy valioso: te dice dónde dejar de buscar. Si alguien te promete un ordenamiento por comparación en O(n), sabes que se equivoca sin necesidad de ver su código.</p>` },
        { n: 5, titulo: 'Por qué Timsort',
          enunciado: 'Timsort aprovecha que los datos reales tienen tramos ya ordenados. (a) Da tres ejemplos de datos reales con esa propiedad. (b) Explica cómo los detecta y qué hace con ellos. (c) ¿Por qué Python y Java eligieron un algoritmo estable aunque sea algo más lento que quicksort?',
          pista: 'Piensa en de dónde salen los datos que ordenamos en la práctica.',
          solucion: `<p><b>(a) Datos reales con tramos ordenados:</b></p>
<ul>
<li><b>Registros con marca de tiempo</b> que se concatenan de varias fuentes: cada fuente viene ordenada, y el conjunto es una mezcla de tramos ordenados. Es el caso canónico.</li>
<li><b>Una lista ya ordenada a la que se añaden elementos nuevos</b> al final: un tramo enorme ordenado más una cola pequeña desordenada.</li>
<li><b>Datos reordenados por otra columna:</b> una tabla ordenada por fecha que ahora se ordena por cliente conserva, dentro de cada cliente, muchos tramos ordenados por fecha.</li>
<li><b>Mediciones físicas</b> (temperaturas, precios, sensores) que cambian de forma gradual y producen largas rachas monótonas.</li>
</ul>
<p><b>(b) Cómo funciona:</b></p>
<ol>
<li>Recorre el arreglo detectando <b>rachas</b> (<i>runs</i>): tramos consecutivos ya ordenados, ascendentes o descendentes. Los descendentes los invierte en el sitio, que es O(k) y gratis.</li>
<li>Si una racha es más corta que un mínimo (32-64 elementos), la <b>extiende</b> con ordenamiento por inserción, que es rapidísimo en tramos pequeños y casi ordenados.</li>
<li><b>Mezcla</b> las rachas con una estrategia que mantiene equilibrados los tamaños, usando una pila de rachas pendientes e invariantes sobre sus longitudes.</li>
<li>Usa una optimización llamada <i>galloping</i>: cuando detecta que una racha está aportando muchos elementos seguidos, avanza por búsqueda binaria en lugar de uno a uno.</li>
</ol>
<p><b>El resultado:</b> O(n) en datos ya ordenados o inversamente ordenados, O(n log n) garantizado en el peor caso, estable, y en datos reales a menudo <b>varias veces más rápido</b> que un merge sort puro.</p>
<p><b>(c) Por qué eligieron estabilidad:</b></p>
<ul>
<li><b>Es lo que la gente espera.</b> Ordenar una tabla por una columna y luego por otra debe respetar el primer orden. Sin estabilidad, el comportamiento parece aleatorio y los usuarios reportan bugs que no lo son.</li>
<li><b>Es una garantía que no se puede añadir después.</b> Si <code>sort()</code> no es estable, el programador tiene que construir claves compuestas a mano, lo que es más código y más errores. Si lo es, la estabilidad sale gratis para todos.</li>
<li><b>La diferencia de velocidad es pequeña</b> comparada con el costo de que el lenguaje se comporte de forma sorprendente. Y en datos reales, gracias a las rachas, Timsort a menudo <b>gana</b>.</li>
<li><b>Un detalle histórico revelador:</b> Java usa dual-pivot quicksort para arreglos de <b>primitivos</b> (donde la estabilidad no significa nada, porque dos enteros iguales son indistinguibles) y Timsort para arreglos de <b>objetos</b> (donde sí importa). Es una decisión de diseño muy consciente: cada caso, su algoritmo.</li>
</ul>
<p>Y una nota final que dice mucho sobre el oficio: en 2015, unos investigadores que verificaban formalmente Timsort <b>encontraron un bug</b> en la implementación de Java y Python, en los invariantes de la pila de rachas, que podía provocar una excepción con arreglos de más de 67 millones de elementos. Llevaba una década en producción en miles de millones de dispositivos. <b>El software correcto es difícil</b>, incluso cuando lo escriben los mejores y lo revisa todo el mundo.</p>` }
      ],
      quiz: [
        { p: 'El peor caso del quicksort es O(n²) y ocurre cuando…',
          ops: ['los datos son aleatorios', 'el pivote elegido es sistemáticamente el menor o el mayor',
            'hay elementos repetidos', 'el arreglo es muy grande'],
          ok: 1, exp: 'Las particiones quedan de tamaño 0 y n−1 y el árbol de recursión degenera. Con pivote «último elemento», eso pasa justamente con datos ya ordenados.' },
        { p: 'Ningún ordenamiento por comparación puede ser mejor que O(n log n) porque…',
          ops: ['nadie ha encontrado uno todavía', 'distinguir entre n! ordenaciones posibles exige al menos log₂(n!) comparaciones',
            'las computadoras son lentas', 'es una convención'],
          ok: 1, exp: 'Es una cota inferior demostrada con un árbol de decisión: cada comparación aporta un bit y hacen falta log₂(n!) bits para identificar la permutación.' },
        { p: 'Python y Java usan Timsort porque…',
          ops: ['es el más simple', 'aprovecha los tramos ya ordenados de los datos reales y además es estable',
            'usa menos memoria que todos', 'es el único O(n log n)'],
          ok: 1, exp: 'Detecta rachas ordenadas, usa inserción en los tramos pequeños y garantiza estabilidad. En datos ya ordenados llega a ser O(n).' }
      ]
    },

    {
      id: 'm7-5',
      titulo: 'Recursividad',
      resumen: 'Pensar recursivamente, caso base y caso recursivo, el costo real, y cuándo la recursión es la herramienta correcta.',
      objetivos: [
        'Escribir funciones recursivas con caso base correcto',
        'Reconocer cuándo la recursión es más clara que la iteración',
        'Identificar y arreglar la recursión exponencial con memoización'
      ],
      lectura: `
<p>Una función <strong>recursiva</strong> se llama a sí misma con un problema más pequeño. Suena circular y no lo es,
porque cada llamada reduce el problema hasta llegar a un caso tan simple que se resuelve directamente.</p>

<h2>Las dos partes obligatorias</h2>
${cod('pseudo', `Funcion r <- factorial(n)
	Si n <= 1 Entonces
		r <- 1                        // CASO BASE: se resuelve sin recursión
	Sino
		r <- n * factorial(n - 1)     // CASO RECURSIVO: problema más pequeño
	FinSi
FinFuncion`)}

<p>Las tres condiciones que debe cumplir toda recursión correcta:</p>
<ol>
  <li><strong>Hay al menos un caso base</strong> que se resuelve sin recursión.</li>
  <li><strong>Cada llamada recursiva reduce el problema</strong>, acercándolo al caso base.</li>
  <li><strong>El caso base siempre se alcanza</strong> partiendo de cualquier entrada válida.</li>
</ol>

<p>Fallar la primera o la tercera produce <em>stack overflow</em>. Fallar la segunda también. Y fíjate en que son las
mismas condiciones que garantizan la terminación de un bucle (módulo 2), expresadas de otra forma.</p>

<h2>Cómo pensar recursivamente</h2>
<p>El truco mental, que cuesta adquirir y luego no se olvida, es el <strong>salto de fe recursivo</strong>: supón que la
función <em>ya funciona</em> para problemas más pequeños, y pregúntate solo cómo construir la respuesta grande a partir
de la pequeña.</p>

<p>Para sumar los elementos de una lista: «la suma de toda la lista es el primer elemento más la suma del resto». No
hace falta imaginar toda la cadena de llamadas; basta confiar en que «la suma del resto» funciona.</p>

${cod('pseudo', `Funcion s <- suma(lista, i, n)
	Si i > n Entonces
		s <- 0                            // caso base: lista vacía suma 0
	Sino
		s <- lista[i] + suma(lista, i + 1, n)
	FinSi
FinFuncion`)}

<h2>Cuándo la recursión gana</h2>
<p>Hay problemas donde la versión recursiva es claramente mejor, y tienen algo en común: <strong>la estructura del
problema es recursiva</strong>.</p>

${tabla(['Problema', '¿Recursión?', 'Por qué'], [
  ['Recorrer un árbol', '<b>sí</b>', 'un árbol es un nodo con árboles colgando: la definición es recursiva'],
  ['Explorar un sistema de archivos', '<b>sí</b>', 'una carpeta contiene carpetas'],
  ['Merge sort, quicksort', '<b>sí</b>', 'divide y vencerás es recursión por definición'],
  ['Backtracking (sudoku, laberintos)', '<b>sí</b>', 'probar, retroceder y probar otra cosa'],
  ['Analizar expresiones anidadas', '<b>sí</b>', 'la gramática es recursiva (módulo 9)'],
  ['Recorrer un arreglo', 'no', 'un bucle es más claro y más eficiente'],
  ['Calcular un factorial', 'no', 'el bucle es trivial; la recursión solo añade costo'],
  ['Fibonacci ingenuo', '<b>¡nunca!</b>', 'es exponencial, como verás más abajo']
])}

<h2>El costo de la recursión</h2>
<p>Cada llamada apila un registro de activación: parámetros, variables locales y dirección de retorno. Eso cuesta
memoria y tiempo. Una versión iterativa del factorial usa <strong>una</strong> variable; la recursiva usa
<strong>n</strong> registros de pila.</p>

<p>Algunos lenguajes implementan la <strong>optimización de llamada final</strong>: si la llamada recursiva es la
<em>última</em> operación de la función, el registro actual se puede reutilizar en lugar de apilar uno nuevo, y la
recursión se vuelve un bucle. Scheme, Rust y algunos compiladores de C lo hacen; <strong>Python y Java no</strong>, por
decisión explícita (quieren conservar el <em>stack trace</em> completo para depurar).</p>

${cod('pseudo', `// NO es llamada final: después de la llamada queda una multiplicación pendiente
r <- n * factorial(n - 1)

// SÍ es llamada final: la llamada es lo último que ocurre
Funcion r <- factorialAcum(n, acumulado)
	Si n <= 1 Entonces
		r <- acumulado
	Sino
		r <- factorialAcum(n - 1, n * acumulado)
	FinSi
FinFuncion`)}

<h2>El desastre de Fibonacci</h2>
<p>El ejemplo que más se usa para enseñar recursión es, paradójicamente, el peor uso posible de la recursión:</p>

${cod('pseudo', `Funcion f <- fib(n)
	Si n <= 2 Entonces
		f <- 1
	Sino
		f <- fib(n - 1) + fib(n - 2)      // ¡dos llamadas por nivel!
	FinSi
FinFuncion`)}

<p>Para calcular <code>fib(5)</code>, esta función calcula <code>fib(3)</code> <strong>dos veces</strong>,
<code>fib(2)</code> tres veces, y la repetición crece exponencialmente. La complejidad es
<strong>O(1,618ⁿ)</strong>:</p>

${tabla(['#n', '#Llamadas', 'Tiempo aproximado'], [
  ['10', '177', 'instantáneo'], ['30', '2,7 millones', '~0,03 s'],
  ['40', '331 millones', '~3 s'], ['50', '40 mil millones', '~6 minutos'],
  ['100', '~10²¹', 'más que la edad del universo']
], 'El mismo problema que la versión iterativa resuelve en 100 operaciones.')}

<p>La solución es la <strong>memoización</strong>: guardar los resultados ya calculados en un diccionario y
consultarlos antes de recalcular.</p>

${cod('python', `memo = {}
def fib(n):
    if n <= 2:
        return 1
    if n in memo:            # ¿ya lo calculé?
        return memo[n]
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]`)}

<p>Con tres líneas más, la complejidad pasa de O(1,618ⁿ) a <strong>O(n)</strong>. Cada valor se calcula una sola vez.
Ese cambio —guardar resultados para no recalcularlos— es el principio de la <strong>programación dinámica</strong>, el
tema siguiente.</p>

${nota('Recursión e iteración son equivalentes',
  '<p>Todo lo que se puede escribir recursivamente se puede escribir con bucles y una pila explícita, y al revés. ' +
  'La elección es de <strong>claridad</strong>: usa recursión cuando la estructura del problema sea recursiva, ' +
  'y bucles cuando no lo sea.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Identifica las partes',
          enunciado: 'Para cada función recursiva, identifica el caso base, el caso recursivo y di si termina siempre: (a) <code>f(n) = n &lt;= 0 ? 0 : n + f(n-1)</code>; (b) <code>g(n) = n == 1 ? 1 : g(n/2)</code>; (c) <code>h(n) = n == 0 ? 1 : h(n+1)</code>; (d) <code>k(n) = n &lt; 2 ? n : k(n-1) + k(n-2)</code>.',
          pista: 'Comprueba que cada llamada se acerca al caso base desde cualquier entrada válida.',
          solucion: `<p><b>(a)</b> Base: <code>n ≤ 0 → 0</code>. Recursivo: <code>n + f(n−1)</code>. <b>Termina</b> para cualquier entero: n decrece y la condición <code>≤ 0</code> lo captura incluso si empieza en negativo. Calcula la suma de 1 a n.</p>
<p><b>(b)</b> Base: <code>n == 1</code>. Recursivo: <code>g(n/2)</code>. <b>Termina solo para potencias de 2</b> si la división es entera y n ≥ 1. Con n = 0 nunca llega a 1 (0/2 = 0): <b>bucle infinito</b>. Con n negativo, tampoco. El caso base debería ser <code>n &lt;= 1</code>.</p>
<p><b>(c)</b> Base: <code>n == 0</code>. Recursivo: <code>h(n+1)</code>, que se <b>aleja</b> del caso base. <b>No termina</b> salvo que n sea exactamente 0 de entrada. Viola la segunda condición.</p>
<p><b>(d)</b> Base: <code>n &lt; 2</code>. Recursivo: dos llamadas. <b>Termina</b> para n ≥ 0, pero es <b>exponencial</b>. Es Fibonacci.</p>
<p><b>La lección de (b):</b> el caso base <code>n == 1</code> con igualdad estricta es frágil. <code>n &lt;= 1</code> es más robusto porque captura también los valores que «se pasan». Esta es una regla general: <b>los casos base con desigualdad son más seguros que los de igualdad exacta</b>.</p>` },
        { n: 2, titulo: 'Escribe recursivas',
          enunciado: 'Escribe versiones recursivas de: (a) contar los dígitos de un número; (b) invertir una cadena; (c) calcular la potencia <code>b^e</code>; (d) determinar si una cadena es palíndroma. Pruébalas en el laboratorio.',
          pista: 'En cada caso, piensa: «si ya supiera resolver el problema más pequeño, ¿cómo construyo la respuesta?».',
          lab: 'Funcion c <- digitos(n)\n\tSi n < 10 Entonces\n\t\tc <- 1\n\tSino\n\t\tc <- 1 + digitos(trunc(n / 10))\n\tFinSi\nFinFuncion\n\nFuncion r <- invertir(s)\n\tSi longitud(s) <= 1 Entonces\n\t\tr <- s\n\tSino\n\t\tr <- invertir(Subcadena(s, 2, longitud(s))) + Subcadena(s, 1, 1)\n\tFinSi\nFinFuncion\n\nFuncion p <- potencia(b, e)\n\tSi e = 0 Entonces\n\t\tp <- 1\n\tSino\n\t\tp <- b * potencia(b, e - 1)\n\tFinSi\nFinFuncion\n\nFuncion es <- palindromo(s)\n\tSi longitud(s) <= 1 Entonces\n\t\tes <- Verdadero\n\tSino\n\t\tSi Subcadena(s, 1, 1) <> Subcadena(s, longitud(s), longitud(s)) Entonces\n\t\t\tes <- Falso\n\t\tSino\n\t\t\tes <- palindromo(Subcadena(s, 2, longitud(s) - 1))\n\t\tFinSi\n\tFinSi\nFinFuncion\n\nAlgoritmo ProbarRecursivas\n\tEscribir "digitos(45678) = ", digitos(45678)\n\tEscribir "digitos(7) = ", digitos(7)\n\tEscribir "invertir(\\"recursion\\") = ", invertir("recursion")\n\tEscribir "potencia(2, 10) = ", potencia(2, 10)\n\tEscribir "potencia(5, 0) = ", potencia(5, 0)\n\tEscribir "palindromo(\\"reconocer\\") = ", palindromo("reconocer")\n\tEscribir "palindromo(\\"programar\\") = ", palindromo("programar")\nFinAlgoritmo',
          solucion: `<p>Las cuatro, con su razonamiento recursivo:</p>
<ul>
<li><b>Dígitos:</b> «un número de una cifra tiene 1 dígito; cualquier otro tiene 1 más que el número sin su última cifra».</li>
<li><b>Invertir:</b> «invertir una cadena es invertir todo menos la primera letra, y poner esa letra al final».</li>
<li><b>Potencia:</b> «b⁰ = 1; b^e = b × b^(e−1)». El caso base <code>e = 0</code> devuelve 1 porque es el neutro de la multiplicación.</li>
<li><b>Palíndromo:</b> «una cadena de 0 o 1 caracteres es palíndroma; cualquier otra lo es si sus extremos coinciden <b>y</b> el interior es palíndromo». Es el razonamiento más elegante de los cuatro.</li>
</ul>
<p><b>Nota de eficiencia honesta:</b> las versiones de cadenas crean una copia nueva en cada llamada (<code>Subcadena</code>), así que son O(n²) en memoria y en tiempo. La versión del módulo 4, con dos índices que avanzan sobre la misma cadena, es O(n) y no copia nada. <b>La recursión aquí es más elegante pero peor</b>, y reconocerlo forma parte de usarla con criterio.</p>
<p><b>La potencia admite una mejora preciosa:</b> en lugar de restar 1 al exponente, dividirlo entre 2:</p>
${cod('pseudo', `Funcion p <- potenciaRapida(b, e)
	Si e = 0 Entonces
		p <- 1
	Sino
		Si e MOD 2 = 0 Entonces
			mitad <- potenciaRapida(b, e / 2)
			p <- mitad * mitad               // b^e = (b^(e/2))²
		Sino
			p <- b * potenciaRapida(b, e - 1)
		FinSi
	FinSi
FinFuncion`)}
<p>Esto pasa de O(e) a <b>O(log e)</b>: calcular 2¹⁰⁰⁰ pasa de 1000 multiplicaciones a 10. Se llama <b>exponenciación rápida</b> y es la base de la criptografía RSA, donde hay que elevar números enormes a exponentes enormes módulo otro número enorme.</p>` },
        { n: 3, titulo: 'Mide el desastre de Fibonacci',
          enunciado: 'En la consola JavaScript del laboratorio, implementa Fibonacci recursivo ingenuo con un contador de llamadas y mide el tiempo para n = 20, 25, 30 y 35. Luego implementa la versión con memoización y compara con n = 100.',
          pista: 'Un contador global que se incrementa en cada llamada revela el crecimiento exponencial.',
          solucion: `${cod('js', `let llamadas = 0;
function fibIngenuo(n) {
  llamadas++;
  if (n <= 2) return 1;
  return fibIngenuo(n - 1) + fibIngenuo(n - 2);
}

for (const n of [20, 25, 30, 35]) {
  llamadas = 0;
  const t0 = performance.now();
  const r = fibIngenuo(n);
  const t1 = performance.now();
  console.log(\`fib(\${n}) = \${r}  ·  \${llamadas.toLocaleString()} llamadas  ·  \${(t1-t0).toFixed(1)} ms\`);
}

// con memoización
const memo = new Map();
function fibMemo(n) {
  if (n <= 2) return 1n;
  if (memo.has(n)) return memo.get(n);
  const r = fibMemo(n - 1n) + fibMemo(n - 2n);
  memo.set(n, r);
  return r;
}
const t0 = performance.now();
console.log("fib(100) =", fibMemo(100n).toString(), \`en \${(performance.now()-t0).toFixed(2)} ms\`);`)}
<p><b>Resultados típicos:</b> fib(20) hace 13 529 llamadas; fib(25), 150 049; fib(30), 1 664 079; fib(35), 18 454 929 y tarda unos 150 ms. <b>Cada incremento de 5 en n multiplica el trabajo por unas 11 veces.</b></p>
<p>Con memoización, fib(100) se resuelve con <b>99 llamadas efectivas</b> en menos de un milisegundo, cuando la versión ingenua necesitaría más llamadas que átomos hay en la galaxia.</p>
<p><b>Por qué es exponencial:</b> el árbol de llamadas se bifurca en dos en cada nivel y tiene profundidad n, así que tiene del orden de 1,618ⁿ nodos (el número áureo aparece aquí por la misma razón que en la serie). La inmensa mayoría son recálculos: <code>fib(30)</code> calcula <code>fib(10)</code> más de 800 veces con el mismo resultado.</p>
<p><b>El uso de <code>BigInt</code></b> (la <code>n</code> tras los números) es necesario porque fib(100) vale 354 224 848 179 261 915 075, que excede el entero seguro de JavaScript (2⁵³). Sin eso, el resultado saldría con dígitos equivocados sin ningún aviso: la lección del módulo 1, otra vez.</p>` },
        { n: 4, titulo: 'Torres de Hanói',
          enunciado: 'Resuelve las Torres de Hanói recursivamente: mover n discos de la torre A a la C usando B como auxiliar, sin poner nunca un disco grande sobre uno pequeño. Escribe el algoritmo, cuenta los movimientos para n discos y explica por qué la solución recursiva es tan corta.',
          pista: 'Para mover n discos: mueve n−1 al auxiliar, mueve el grande al destino, y mueve los n−1 del auxiliar al destino.',
          lab: 'SubProceso hanoi(n, origen, destino, auxiliar)\n\tSi n = 1 Entonces\n\t\tEscribir "  mover disco 1 de ", origen, " a ", destino\n\tSino\n\t\thanoi(n - 1, origen, auxiliar, destino)\n\t\tEscribir "  mover disco ", n, " de ", origen, " a ", destino\n\t\thanoi(n - 1, auxiliar, destino, origen)\n\tFinSi\nFinSubProceso\n\nAlgoritmo TorresDeHanoi\n\tDefinir n, movimientos Como Entero\n\tn <- 4\n\tEscribir "Solución para ", n, " discos:"\n\thanoi(n, "A", "C", "B")\n\tmovimientos <- 1\n\tDefinir i Como Entero\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tmovimientos <- movimientos * 2\n\tFinPara\n\tEscribir ""\n\tEscribir "Movimientos: 2^", n, " - 1 = ", movimientos - 1\nFinAlgoritmo',
          solucion: `${cod('pseudo', `SubProceso hanoi(n, origen, destino, auxiliar)
	Si n = 1 Entonces
		mover(origen, destino)                      // caso base
	Sino
		hanoi(n - 1, origen, auxiliar, destino)     // 1) los n-1 de arriba, al auxiliar
		mover(origen, destino)                      // 2) el grande, al destino
		hanoi(n - 1, auxiliar, destino, origen)     // 3) los n-1, del auxiliar al destino
	FinSi
FinSubProceso`)}
<p><b>Movimientos:</b> <code>T(n) = 2·T(n−1) + 1</code>, cuya solución es <b>2ⁿ − 1</b>. Con 4 discos, 15 movimientos; con 20 discos, 1 048 575; con 64 discos (la leyenda de los monjes de Brahma), 1,8×10¹⁹ movimientos: a uno por segundo serían 585 mil millones de años.</p>
<p><b>Por qué la solución es tan corta:</b> porque el problema <b>es</b> recursivo en su estructura, y el salto de fe recursivo hace casi todo el trabajo. No hay que imaginar la secuencia completa de 15 movimientos: basta observar que, <i>si supiéramos mover n−1 discos</i>, mover n sería trivial en tres pasos. La recursión materializa exactamente ese razonamiento.</p>
<p>Una versión iterativa existe (hay una regla basada en la paridad de n y en mover siempre el disco pequeño en una dirección fija) y es <b>mucho menos evidente</b>: funciona, pero nadie diría por qué mirándola. Aquí la recursión no es solo más corta, es <b>más explicativa</b>.</p>
<p><b>Y la observación importante:</b> este algoritmo es exponencial y <b>eso no es un defecto</b>. Se puede demostrar que 2ⁿ−1 es el mínimo de movimientos posible: el problema mismo es exponencial, y ningún algoritmo puede hacerlo mejor. <b>Hay que distinguir un algoritmo lento de un problema difícil</b>: Fibonacci ingenuo es un mal algoritmo para un problema fácil; Hanói es un algoritmo óptimo para un problema caro.</p>` },
        { n: 5, titulo: 'Recursión sobre estructuras',
          enunciado: 'Escribe un algoritmo recursivo que calcule el tamaño total de una carpeta sumando los tamaños de todos los archivos que contiene, incluidos los de sus subcarpetas a cualquier profundidad. Explica por qué aquí la recursión es claramente superior a la iteración y qué problemas puede encontrar en la vida real.',
          pista: 'Una carpeta contiene archivos y carpetas; el tamaño de una carpeta es la suma de todo lo que hay dentro.',
          solucion: `${cod('pseudo', `Funcion total <- tamanio(ruta)
	total <- 0
	Para cada elemento en contenidoDe(ruta) Hacer
		Si esArchivo(elemento) Entonces
			total <- total + tamanioDe(elemento)       // caso base
		Sino
			total <- total + tamanio(elemento)        // caso recursivo
		FinSi
	FinPara
FinFuncion`)}
<p><b>Por qué la recursión es claramente superior:</b> la estructura del sistema de archivos <b>es</b> un árbol, y la definición del problema es literalmente recursiva («el tamaño de una carpeta es la suma de lo que contiene, y lo que contiene pueden ser carpetas»). El algoritmo tiene cinco líneas y se lee como el enunciado.</p>
<p>La versión iterativa necesita una <b>pila explícita</b> de carpetas pendientes:</p>
${cod('pseudo', `pila <- [ruta]
total <- 0
Mientras la pila no esté vacía Hacer
	actual <- desapilar()
	Para cada elemento en contenidoDe(actual) Hacer
		Si esArchivo(elemento) Entonces  total <- total + tamanioDe(elemento)
		Sino  apilar(elemento)  FinSi
	FinPara
FinMientras`)}
<p>Funciona, pero estás <b>reimplementando a mano la pila que el lenguaje ya te daba gratis</b>. Esa es la señal más clara de que la recursión era la herramienta adecuada.</p>
<p><b>Problemas de la vida real</b>, que convierten este ejercicio de juguete en código serio:</p>
<ul>
<li><b>Enlaces simbólicos y ciclos:</b> un enlace que apunta a una carpeta ancestro crea un ciclo y la recursión no termina nunca. Hay que llevar un conjunto de rutas reales ya visitadas, o no seguir enlaces. Es el mismo problema del «visitado» en los grafos (módulo 6), porque <b>un sistema de archivos con enlaces ya no es un árbol, es un grafo</b>.</li>
<li><b>Profundidad excesiva:</b> una jerarquía muy profunda puede desbordar la pila. La versión iterativa con pila explícita usa el montón, que es mucho más grande.</li>
<li><b>Permisos:</b> una carpeta a la que no se puede acceder lanza una excepción. Hay que decidir: ¿abortar todo o contar lo que se pueda y avisar?</li>
<li><b>Enlaces duros y archivos dispersos:</b> un mismo archivo enlazado desde dos carpetas se contaría dos veces, y el tamaño «aparente» puede ser mayor que el espacio real en disco. Por eso <code>du</code> y el explorador de archivos a veces dan números distintos: <b>no están respondiendo la misma pregunta</b>.</li>
</ul>
<p>Es un buen recordatorio de que la distancia entre un ejercicio correcto y una herramienta utilizable está llena de casos que el enunciado no mencionaba.</p>` }
      ],
      quiz: [
        { p: 'Las dos partes obligatorias de una función recursiva son…',
          ops: ['un bucle y una condición', 'un caso base y un caso recursivo que reduce el problema',
            'dos llamadas recursivas', 'una pila y una cola'],
          ok: 1, exp: 'Sin caso base, o si el caso recursivo no se acerca a él, la recursión no termina y desborda la pila.' },
        { p: 'Fibonacci recursivo ingenuo es exponencial porque…',
          ops: ['usa números muy grandes', 'recalcula los mismos valores una y otra vez en ramas distintas del árbol de llamadas',
            'la pila se llena', 'hace muchas sumas'],
          ok: 1, exp: 'fib(30) calcula fib(10) más de 800 veces. Memoizar hace que cada valor se calcule una sola vez: O(n) en lugar de O(1,618ⁿ).' },
        { p: 'La recursión es claramente preferible a la iteración cuando…',
          ops: ['el problema es grande', 'la estructura del problema es recursiva, como un árbol o un sistema de archivos',
            'se quiere ahorrar memoria', 'siempre'],
          ok: 1, exp: 'Si tienes que crear una pila explícita para hacerlo iterativo, estás reimplementando a mano lo que el lenguaje ya te daba.' }
      ]
    },

    {
      id: 'm7-6',
      titulo: 'Técnicas de diseño de algoritmos',
      resumen: 'Divide y vencerás, algoritmos voraces, programación dinámica y backtracking: las cuatro grandes estrategias.',
      objetivos: [
        'Reconocer qué técnica se aplica a un problema nuevo',
        'Distinguir cuándo un algoritmo voraz da el óptimo y cuándo no',
        'Aplicar programación dinámica a problemas con subproblemas repetidos'
      ],
      lectura: `
<p>Hay cuatro grandes estrategias para diseñar algoritmos. Reconocer cuál aplica a un problema nuevo es la habilidad más
valiosa de este módulo, porque convierte «no sé por dónde empezar» en «esto es un problema de X».</p>

<h2>1. Divide y vencerás</h2>
<p>Partir el problema en subproblemas <strong>independientes</strong> del mismo tipo, resolverlos recursivamente y
combinar las soluciones.</p>

${tabla(['Ejemplo', 'Divide', 'Combina'], [
  ['Merge sort', 'por la mitad', 'mezclar dos ordenados'],
  ['Quicksort', 'por el pivote', 'nada: ya quedan en su sitio'],
  ['Búsqueda binaria', 'por la mitad', 'nada: se descarta una mitad'],
  ['Par más cercano', 'por una línea vertical', 'revisar la franja central'],
  ['Multiplicación de Karatsuba', 'los números en mitades', 'tres productos en lugar de cuatro']
])}

<p>La clave es que los subproblemas <strong>no se solapan</strong>. Cuando sí se solapan, divide y vencerás repite
trabajo y hay que usar programación dinámica.</p>

<h2>2. Algoritmos voraces (greedy)</h2>
<p>Tomar en cada paso la decisión que parece mejor <em>localmente</em>, sin reconsiderar. Son rápidos y simples; el
problema es que <strong>no siempre dan el óptimo</strong>.</p>

${cod('pseudo', `// Dar vuelto: tomar siempre la moneda más grande que quepa
Para cada denominacion de mayor a menor Hacer
	cantidad <- trunc(faltante / denominacion)
	Si cantidad > 0 Entonces
		anotar(denominacion, cantidad)
		faltante <- faltante - cantidad * denominacion
	FinSi
FinPara`)}

<p>Con las monedas peruanas (o las de casi cualquier país) este algoritmo da el mínimo número de monedas. Con
denominaciones de 1, 3 y 4, para dar 6 toma 4+1+1 (tres monedas) cuando la óptima es 3+3 (dos). <strong>El mismo
algoritmo, óptimo o no, según los datos.</strong></p>

<p>Cuándo un voraz sí es óptimo: hay que <em>demostrarlo</em>, y la condición formal se llama <em>matroide</em>. En la
práctica, los casos clásicos demostrados son:</p>
<ul>
  <li><strong>Dijkstra</strong> (camino mínimo con pesos positivos).</li>
  <li><strong>Kruskal y Prim</strong> (árbol de expansión mínima).</li>
  <li><strong>Huffman</strong> (codificación óptima para compresión).</li>
  <li><strong>Selección de actividades</strong> (el máximo de tareas sin solaparse: elegir siempre la que termina antes).</li>
</ul>

<h2>3. Programación dinámica</h2>
<p>Para problemas donde los subproblemas <strong>sí se solapan</strong>. La idea es resolver cada subproblema una sola
vez y guardar el resultado. Hay dos formas:</p>

<ul>
  <li><strong>De arriba abajo (memoización):</strong> recursión normal + un diccionario de resultados. Es lo que viste
  con Fibonacci.</li>
  <li><strong>De abajo arriba (tabulación):</strong> llenar una tabla desde los casos base hasta la respuesta, sin
  recursión.</li>
</ul>

${cod('pseudo', `// Fibonacci con tabulación: O(n) tiempo, O(1) memoria
Funcion f <- fib(n)
	Si n <= 2 Entonces
		f <- 1
	Sino
		anterior <- 1
		actual <- 1
		Para i <- 3 Hasta n Con Paso 1 Hacer
			siguiente <- anterior + actual
			anterior <- actual
			actual <- siguiente
		FinPara
		f <- actual
	FinSi
FinFuncion`)}

<p>Para que la programación dinámica aplique hacen falta dos propiedades:</p>
<ol>
  <li><strong>Subestructura óptima:</strong> la solución óptima del problema contiene soluciones óptimas de sus
  subproblemas.</li>
  <li><strong>Subproblemas solapados:</strong> los mismos subproblemas aparecen una y otra vez.</li>
</ol>

<p>Problemas clásicos: la mochila, el cambio de monedas con denominaciones arbitrarias, la subsecuencia común más larga
(que es la base de <code>git diff</code>), la distancia de edición (corrección ortográfica), y la multiplicación
encadenada de matrices.</p>

<h2>4. Backtracking (vuelta atrás)</h2>
<p>Construir la solución paso a paso y, cuando se detecta que el camino actual no puede llevar a una solución válida,
<strong>retroceder</strong> y probar otra opción. Es una búsqueda en profundidad sobre el árbol de posibilidades, con
poda.</p>

${cod('pseudo', `Funcion exito <- resolver(estado)
	Si estado es solución completa Entonces
		exito <- Verdadero
	Sino
		exito <- Falso
		Para cada opción válida desde el estado Hacer
			aplicar(opción)
			Si resolver(nuevoEstado) Entonces
				exito <- Verdadero
			Sino
				deshacer(opción)        // ← el "backtrack"
			FinSi
		FinPara
	FinSi
FinFuncion`)}

<p>Resuelve sudoku, las ocho reinas, laberintos, coloreado de grafos y generación de permutaciones. Su complejidad es
exponencial en el peor caso, y la <strong>poda</strong> —descartar ramas cuanto antes— es lo que lo hace práctico:
un sudoku tiene 6×10²¹ configuraciones posibles y el backtracking con buena poda lo resuelve en milisegundos.</p>

<h2>Cómo reconocer cuál usar</h2>
${tabla(['Señal en el enunciado', 'Técnica probable'], [
  ['«ordenar», «buscar», «la mitad»', 'divide y vencerás'],
  ['«el mínimo número de», «el máximo valor», con elecciones sucesivas', 'voraz o programación dinámica'],
  ['«de cuántas formas», «el óptimo» con decisiones que se influyen', 'programación dinámica'],
  ['«todas las combinaciones», «existe alguna configuración que…»', 'backtracking'],
  ['«el camino más corto»', 'BFS si no hay pesos, Dijkstra si los hay'],
  ['«subproblemas que se repiten»', 'programación dinámica'],
  ['«la decisión local siempre es segura»', 'voraz (y demuéstralo)']
], 'La diferencia entre voraz y programación dinámica es la pregunta clave: ¿una decisión local puede arruinar el resultado global?')}

${nota('La prueba decisiva',
  '<p>Ante un problema de optimización, pregúntate: <strong>¿puede una decisión que parece buena ahora impedir la mejor ' +
  'solución después?</strong> Si la respuesta es no, un voraz sirve y es mucho más simple. Si es sí, necesitas ' +
  'programación dinámica para considerar las alternativas.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Clasifica los problemas',
          enunciado: 'Di qué técnica usarías: (a) encontrar el camino más corto en un mapa con distancias; (b) el mínimo número de monedas con denominaciones 1, 5, 7 para dar 10; (c) resolver un sudoku; (d) ordenar un millón de registros; (e) la subsecuencia común más larga de dos textos; (f) seleccionar el máximo número de reuniones que no se solapen.',
          pista: '¿Puede una decisión local arruinar el resultado global?',
          solucion: `<p><b>(a) Voraz (Dijkstra).</b> Está demostrado que elegir siempre el nodo no visitado más cercano da el óptimo, siempre que los pesos sean positivos. Con pesos negativos la garantía se rompe y hace falta Bellman-Ford.</p>
<p><b>(b) Programación dinámica.</b> Con 1, 5 y 7, el voraz daría 7+1+1+1 (<b>4 monedas</b>) para 10, pero el óptimo es 5+5 (<b>2 monedas</b>). Las denominaciones no son canónicas, así que la decisión local es mala.</p>
<p><b>(c) Backtracking</b> con poda: colocar un número, verificar las restricciones de fila, columna y bloque, y retroceder si no se puede continuar.</p>
<p><b>(d) Divide y vencerás</b> (merge sort o quicksort). En la práctica, el <code>sort()</code> del lenguaje.</p>
<p><b>(e) Programación dinámica.</b> Es el problema clásico de la tabla bidimensional, y es el corazón de <code>git diff</code> y <code>diff</code>.</p>
<p><b>(f) Voraz,</b> y con una demostración bonita: elegir siempre la reunión que <b>termina antes</b> entre las compatibles es óptimo, porque deja el máximo tiempo libre para las demás. Nótese que la estrategia intuitiva «elegir la más corta» <b>no</b> es óptima: una reunión corta en medio del día puede bloquear dos largas.</p>` },
        { n: 2, titulo: 'Cuándo falla el voraz',
          enunciado: 'Para el problema del cambio de monedas, encuentra un sistema de denominaciones donde el algoritmo voraz falle y demuéstralo con un ejemplo. Luego explica cómo lo resolvería la programación dinámica.',
          pista: 'Busca denominaciones donde una moneda grande «estorbe».',
          solucion: `<p><b>Sistema que falla: {1, 3, 4}.</b> Para dar <b>6</b>:</p>
<ul>
<li><b>Voraz:</b> toma 4 (la mayor que cabe), luego 1 y 1. Total: <b>3 monedas</b>.</li>
<li><b>Óptimo:</b> 3 + 3 = <b>2 monedas</b>.</li>
</ul>
<p>El 4 «estorba»: tomarlo deja un resto de 2 que solo se puede formar con unos.</p>
<p><b>Otro ejemplo real:</b> el antiguo sistema británico anterior a 1971 tenía monedas de 1, 3, 6, 12, 24 y 30 peniques. Para dar 48, el voraz da 30+12+6 (3 monedas) cuando el óptimo es 24+24 (2 monedas). No es un caso de laboratorio: era el dinero que la gente usaba.</p>
<p><b>Solución con programación dinámica:</b></p>
${cod('pseudo', `// minMonedas[v] = mínimo de monedas para formar el valor v
minMonedas[0] <- 0
Para v <- 1 Hasta objetivo Con Paso 1 Hacer
	minMonedas[v] <- INFINITO
	Para cada denominacion d Hacer
		Si d <= v Y minMonedas[v - d] + 1 < minMonedas[v] Entonces
			minMonedas[v] <- minMonedas[v - d] + 1
		FinSi
	FinPara
FinPara`)}
<p><b>La idea:</b> para formar el valor v, se prueban <b>todas</b> las monedas como última moneda usada, y se toma la mejor. Como <code>minMonedas[v − d]</code> ya está calculado (se llena la tabla de menor a mayor), cada valor se resuelve en O(d) y el total es <b>O(objetivo × denominaciones)</b>.</p>
${tabla(['#v', '0', '1', '2', '3', '4', '5', '6'], [
  ['<b>min monedas</b>', '0', '1', '2', '1', '1', '2', '<b>2</b>']
], 'Con denominaciones {1,3,4}: el valor 6 se resuelve con 2 monedas. ✔')}
<p><b>La diferencia conceptual:</b> el voraz toma <b>una</b> decisión y sigue; la programación dinámica <b>prueba todas las decisiones posibles</b> en cada paso, pero no las repite gracias a la tabla. Paga más tiempo (O(n·d) en lugar de O(d)) a cambio de la garantía de optimalidad.</p>` },
        { n: 3, titulo: 'Programación dinámica a mano',
          enunciado: 'Resuelve con una tabla: ¿de cuántas formas se puede subir una escalera de 10 escalones si en cada paso puedes subir 1 o 2 escalones? Luego generaliza a pasos de 1, 2 o 3.',
          pista: 'Para llegar al escalón n, vienes del n−1 o del n−2. ¿Te suena la fórmula?',
          lab: 'Algoritmo Escalera\n\tDefinir i, n Como Entero\n\tDimension formas[20]\n\tDimension formas3[20]\n\tn <- 10\n\n\t// pasos de 1 o 2\n\tformas[1] <- 1\n\tformas[2] <- 2\n\tPara i <- 3 Hasta n Con Paso 1 Hacer\n\t\tformas[i] <- formas[i - 1] + formas[i - 2]\n\tFinPara\n\tEscribir "Con pasos de 1 o 2:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir "  escalón ", i, ": ", formas[i], " formas"\n\tFinPara\n\n\t// pasos de 1, 2 o 3\n\tformas3[1] <- 1\n\tformas3[2] <- 2\n\tformas3[3] <- 4\n\tPara i <- 4 Hasta n Con Paso 1 Hacer\n\t\tformas3[i] <- formas3[i - 1] + formas3[i - 2] + formas3[i - 3]\n\tFinPara\n\tEscribir ""\n\tEscribir "Con pasos de 1, 2 o 3:"\n\tEscribir "  escalón ", n, ": ", formas3[n], " formas"\nFinAlgoritmo',
          solucion: `<p><b>El razonamiento:</b> para llegar al escalón <code>i</code> solo se puede venir del <code>i−1</code> (dando un paso de 1) o del <code>i−2</code> (dando uno de 2). Por lo tanto:</p>
<p style="text-align:center;font-family:var(--f-mono)">formas[i] = formas[i−1] + formas[i−2]</p>
${tabla(['#Escalón', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [
  ['<b>Formas</b>', '1', '2', '3', '5', '8', '13', '21', '34', '55', '<b>89</b>']
])}
<p><b>¡Es Fibonacci!</b> Desplazado un lugar. El mismo patrón matemático aparece en un problema de apariencia completamente distinta, y eso es una experiencia muy frecuente: problemas que parecen nuevos resultan ser viejos conocidos disfrazados.</p>
<p><b>Con pasos de 1, 2 o 3:</b> la recurrencia pasa a ser <code>formas[i] = formas[i−1] + formas[i−2] + formas[i−3]</code>, que son los <b>números de Tribonacci</b>. Para 10 escalones: <b>274 formas</b>.</p>
<p><b>Lo que ilustra este ejercicio sobre programación dinámica:</b></p>
<ul>
<li><b>Subestructura óptima:</b> la respuesta para 10 se construye con las de 9 y 8.</li>
<li><b>Subproblemas solapados:</b> en la versión recursiva ingenua, <code>formas(5)</code> se calcularía muchísimas veces.</li>
<li><b>La tabulación evita la recursión por completo:</b> se llena de abajo arriba y nunca hay riesgo de desbordar la pila.</li>
<li><b>Optimización de memoria:</b> solo se necesitan los 2 (o 3) valores anteriores, así que la tabla de n posiciones se puede reducir a <b>O(1)</b> de memoria. Es una optimización típica de la programación dinámica cuando la recurrencia solo mira unos pocos pasos atrás.</li>
</ul>` },
        { n: 4, titulo: 'Backtracking: las ocho reinas',
          enunciado: 'Explica cómo resolver el problema de colocar 8 reinas en un tablero de ajedrez sin que se ataquen. Describe el algoritmo, estima cuántas configuraciones hay por fuerza bruta y cuántas examina el backtracking con poda.',
          pista: 'Coloca una reina por columna y retrocede en cuanto haya conflicto.',
          solucion: `<p><b>El algoritmo:</b></p>
${cod('pseudo', `Funcion exito <- colocar(columna)
	Si columna > 8 Entonces
		exito <- Verdadero                    // las 8 están colocadas
	Sino
		exito <- Falso
		Para fila <- 1 Hasta 8 Con Paso 1 Hacer
			Si esSeguro(fila, columna) Entonces
				reina[columna] <- fila        // probar esta posición
				Si colocar(columna + 1) Entonces
					exito <- Verdadero
				Sino
					reina[columna] <- 0       // DESHACER: backtrack
				FinSi
			FinSi
		FinPara
	FinSi
FinFuncion

Funcion seguro <- esSeguro(fila, columna)
	seguro <- Verdadero
	Para c <- 1 Hasta columna - 1 Con Paso 1 Hacer
		Si reina[c] = fila Entonces  seguro <- Falso  FinSi               // misma fila
		Si abs(reina[c] - fila) = abs(c - columna) Entonces               // diagonal
			seguro <- Falso
		FinSi
	FinPara
FinFuncion`)}
<p><b>Las dos podas decisivas:</b></p>
<ol>
<li><b>Una reina por columna.</b> No hace falta probar las 64 casillas para cada reina: como dos reinas en la misma columna se atacan, se fija una por columna. Esto reduce el espacio de 64 sobre 8 (unas <b>4 400 millones</b> de configuraciones) a 8⁸ = <b>16,7 millones</b>.</li>
<li><b>Verificar antes de avanzar.</b> Si la reina de la columna 3 ya entra en conflicto, no se exploran las 8⁵ = 32 768 configuraciones que colgaban de esa decisión. <b>Se poda el árbol entero.</b></li>
</ol>
<p><b>Resultado:</b> el backtracking examina del orden de <b>2000 nodos</b> para encontrar la primera solución, frente a los millones de la fuerza bruta. Hay 92 soluciones en total (12 si se descartan rotaciones y reflexiones).</p>
<p><b>La comprobación de la diagonal</b> merece atención: dos reinas están en la misma diagonal si la diferencia de filas es igual a la diferencia de columnas, <code>|f1 − f2| = |c1 − c2|</code>. Es la clase de observación geométrica que convierte cuatro comprobaciones (dos diagonales × dos sentidos) en una sola línea.</p>
<p><b>Por qué esta técnica importa más allá del juego:</b> el backtracking con poda es la base de los <b>resolvedores SAT</b> y de los sistemas de <b>programación con restricciones</b>, que se usan para asignar horarios, planificar producción, verificar circuitos y comprobar formalmente programas. La idea —explorar sistemáticamente descartando ramas imposibles cuanto antes— escala a problemas con millones de variables.</p>` },
        { n: 5, titulo: 'Diseña con la técnica correcta',
          enunciado: 'Una empresa tiene n proyectos, cada uno con una duración y un beneficio, y dispone de T horas. (a) Si puede hacer fracciones de proyecto, ¿qué técnica usarías y por qué? (b) Si los proyectos son indivisibles, ¿y entonces? (c) Resuelve con números: T=10 y proyectos (4h, S/40), (6h, S/60), (5h, S/55), (3h, S/30).',
          pista: 'Es el problema de la mochila, en sus dos variantes clásicas.',
          solucion: `<p><b>(a) Fraccionario → algoritmo voraz, y es óptimo.</b> Se ordenan los proyectos por <b>beneficio por hora</b> y se toman de mayor a menor, partiendo el último si no cabe entero. Está demostrado que da el óptimo: si no tomaras el de mejor ratio, podrías cambiar cualquier parte de la solución por una porción de él y mejorarías. Costo: O(n log n), dominado por el ordenamiento.</p>
<p><b>(b) Indivisible → programación dinámica.</b> El voraz falla porque la decisión local puede arruinar el resultado: tomar el proyecto de mejor ratio puede dejar un hueco de horas que no se puede llenar bien. Es el problema de la <b>mochila 0/1</b>, y se resuelve con una tabla <code>mejor[i][t]</code> = beneficio máximo usando los primeros i proyectos con t horas disponibles:</p>
${cod('pseudo', `Para i <- 1 Hasta n Con Paso 1 Hacer
	Para t <- 0 Hasta T Con Paso 1 Hacer
		mejor[i][t] <- mejor[i-1][t]                        // no tomar el proyecto i
		Si duracion[i] <= t Entonces
			conEste <- mejor[i-1][t - duracion[i]] + beneficio[i]
			Si conEste > mejor[i][t] Entonces
				mejor[i][t] <- conEste                       // sí tomarlo
			FinSi
		FinSi
	FinPara
FinPara`)}
<p>Costo: <b>O(n × T)</b>. (Nota técnica interesante: esto se llama <i>pseudopolinómico</i>, porque T es un <b>valor</b> y no un tamaño de entrada. Con T = 10⁹ la tabla sería inviable, y de hecho la mochila 0/1 es NP-completa.)</p>
<p><b>(c) Con los números:</b> ratios de beneficio por hora: 40/4 = 10, 60/6 = 10, 55/5 = 11, 30/3 = 10.</p>
<ul>
<li><b>Voraz (fraccionario):</b> toma el de 5h (ratio 11, S/55), quedan 5 horas; luego cualquiera de ratio 10, por ejemplo el de 4h (S/40), queda 1 hora; y 1/6 del de 6h (S/10). Total: <b>S/105</b>.</li>
<li><b>Voraz (indivisible):</b> toma el de 5h (S/55) y el de 4h (S/40), con 1 hora sobrante inútil. Total: <b>S/95</b>.</li>
<li><b>Óptimo indivisible:</b> el de 4h + el de 6h = 10 horas exactas, S/40 + S/60 = <b>S/100</b>.</li>
</ul>
<p><b>El voraz se equivoca por S/5</b>, porque priorizó el mejor ratio y acabó con una hora muerta. La programación dinámica encuentra la combinación que usa las 10 horas exactas.</p>
<p><b>La lección final del módulo:</b> la diferencia entre S/95 y S/100 parece pequeña, pero la pregunta correcta no es cuánto se pierde en este caso, sino si tu algoritmo <b>garantiza</b> el óptimo o solo lo aproxima. Las dos cosas son respuestas legítimas —a veces una aproximación rápida vale más que un óptimo lento—, pero hay que <b>saber cuál estás dando</b> y poder decírselo a quien usa el resultado.</p>` }
      ],
      quiz: [
        { p: 'La diferencia esencial entre un algoritmo voraz y la programación dinámica es que…',
          ops: ['el voraz es más lento', 'el voraz toma una decisión local sin reconsiderar; la PD evalúa todas las opciones guardando resultados',
            'la PD solo sirve para números', 'son lo mismo'],
          ok: 1, exp: 'El voraz es más rápido y simple, pero solo es óptimo si se demuestra que la decisión local nunca arruina el resultado global.' },
        { p: 'La programación dinámica requiere que el problema tenga…',
          ops: ['datos ordenados', 'subestructura óptima y subproblemas solapados',
            'pocos elementos', 'una sola solución'],
          ok: 1, exp: 'Si los subproblemas no se solapan, divide y vencerás basta. Si no hay subestructura óptima, la solución del todo no se construye con las de las partes.' },
        { p: 'El backtracking es práctico en problemas exponenciales gracias a…',
          ops: ['la recursión', 'la poda: descartar ramas enteras en cuanto se detecta que no llevan a solución',
            'la memoria', 'los bucles'],
          ok: 1, exp: 'Un sudoku tiene 6×10²¹ configuraciones y se resuelve en milisegundos porque cada conflicto detectado elimina un subárbol completo de posibilidades.' }
      ]
    }
  ]
});
