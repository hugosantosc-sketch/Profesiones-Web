/* ===== MÓDULO 6 — Estructuras de datos ===== */
CDC.registrar({
  id: 'm6',
  nivel: 'Intermedio',
  titulo: 'Estructuras de datos',
  resumen: 'Arreglos, listas enlazadas, pilas, colas, diccionarios, árboles y grafos: qué hace rápida cada una y cuándo elegirla.',
  intro: '<p>«Los algoritmos malos con buenas estructuras de datos suelen ganarle a los algoritmos buenos con malas ' +
    'estructuras de datos». La frase es de Rob Pike y resume el módulo: <strong>elegir la estructura correcta suele ' +
    'importar más que optimizar el código</strong>.</p><p>Cada estructura hace rápidas unas operaciones y lentas otras. ' +
    'No existe la mejor; existe la adecuada para lo que vas a hacer más veces.</p>',
  temas: [

    {
      id: 'm6-1',
      titulo: 'Arreglos y listas enlazadas',
      resumen: 'Memoria contigua contra nodos enlazados, el costo real de cada operación y por qué el arreglo suele ganar.',
      objetivos: [
        'Explicar cómo se guarda un arreglo en memoria y por qué el acceso es O(1)',
        'Describir una lista enlazada y sus operaciones',
        'Elegir entre arreglo y lista según las operaciones dominantes'
      ],
      lectura: `
<p>Las dos formas básicas de guardar una secuencia de datos son opuestas en todo, y entender por qué explica la mitad
de las decisiones de rendimiento que vas a tomar.</p>

<h2>El arreglo: memoria contigua</h2>
<p>Un arreglo ocupa un bloque <strong>continuo</strong> de memoria. Por eso el acceso por índice es instantáneo: la
dirección del elemento <code>i</code> se calcula con una multiplicación y una suma.</p>

<p style="text-align:center;font-family:var(--f-mono)">dirección(a[i]) = base + i × tamaño_del_elemento</p>

<p>Ese cálculo no depende de <code>i</code>: acceder al elemento 5 y al elemento 5 000 000 cuesta exactamente lo mismo.
Eso es <strong>O(1)</strong>, acceso en tiempo constante, y es la gran virtud del arreglo.</p>

<p>El precio es la rigidez: el bloque tiene un tamaño fijo. Insertar en el medio obliga a correr todos los elementos
posteriores, y crecer obliga a pedir un bloque más grande y copiar todo.</p>

<h2>La lista enlazada: nodos dispersos</h2>
<p>Una lista enlazada guarda cada elemento en un <strong>nodo</strong> que contiene el dato y la dirección del
siguiente. Los nodos pueden estar en cualquier parte de la memoria.</p>

${fig(`<svg viewBox="0 0 580 210" width="580" height="210" role="img" aria-label="Comparación entre un arreglo contiguo y una lista enlazada">
<g color="var(--fg-soft)">
<text x="14" y="20" font-size="12" font-weight="700" fill="var(--fg)">Arreglo: bloque contiguo</text>
${[14, 11, 18, 9, 16].map(function (v, i) {
  var x = 16 + i * 74;
  return '<rect x="' + x + '" y="32" width="70" height="40" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>' +
    '<text x="' + (x + 35) + '" y="57" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">' + v + '</text>' +
    '<text x="' + (x + 35) + '" y="86" text-anchor="middle" font-size="10" fill="var(--fg-soft)">' + (1000 + i * 4) + '</text>';
}).join('')}
<text x="400" y="57" font-size="11" fill="var(--fg-soft)">direcciones consecutivas</text>
<text x="400" y="86" font-size="11" fill="var(--fg-soft)">a[i] = base + i×4</text>

<text x="14" y="124" font-size="12" font-weight="700" fill="var(--fg)">Lista enlazada: nodos dispersos</text>
${[[16, 14, 2048], [140, 11, 7312], [264, 18, 1096], [388, 9, 9004]].map(function (n, i) {
  var x = n[0];
  return '<rect x="' + x + '" y="136" width="64" height="40" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.5"/>' +
    '<line x1="' + (x + 42) + '" y1="136" x2="' + (x + 42) + '" y2="176" stroke="var(--warm)" stroke-width="1.2"/>' +
    '<text x="' + (x + 21) + '" y="161" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">' + n[1] + '</text>' +
    '<text x="' + (x + 53) + '" y="161" text-anchor="middle" font-size="9" fill="var(--fg-soft)">→</text>' +
    '<text x="' + (x + 32) + '" y="190" text-anchor="middle" font-size="10" fill="var(--fg-soft)">' + n[2] + '</text>' +
    (i < 3 ? '<path d="M' + (x + 64) + ' 156 H' + (x + 136) + '" stroke="var(--fg-soft)" stroke-width="1.4" marker-end="url(#m6a)"/>' : '');
}).join('')}
<text x="470" y="161" font-size="12" fill="var(--fg-soft)">→ nulo</text>
<defs><marker id="m6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>
</g></svg>`, 'El arreglo calcula la dirección; la lista la sigue nodo a nodo.')}

${cod('pseudo', `// Un nodo tiene dos campos
Nodo:
	dato
	siguiente   // dirección del nodo siguiente, o nulo si es el último

// Recorrer una lista
actual <- cabeza
Mientras actual <> nulo Hacer
	Escribir actual.dato
	actual <- actual.siguiente
FinMientras`)}

<p>Para llegar al elemento 1000 hay que seguir 1000 flechas: el acceso por posición es <strong>O(n)</strong>. A cambio,
insertar o eliminar en un punto conocido es <strong>O(1)</strong>: basta cambiar dos punteros, sin mover nada.</p>

${cod('pseudo', `// Insertar 'nuevo' después de 'p': solo dos asignaciones
nuevo.siguiente <- p.siguiente
p.siguiente <- nuevo`)}

<h2>La tabla de costos</h2>
${tabla(['Operación', 'Arreglo', 'Lista enlazada', 'Por qué'], [
  ['Acceder a la posición i', '<b>O(1)</b>', 'O(n)', 'el arreglo calcula la dirección; la lista la recorre'],
  ['Buscar un valor', 'O(n)', 'O(n)', 'hay que mirar uno por uno en ambos'],
  ['Insertar al principio', 'O(n)', '<b>O(1)</b>', 'el arreglo debe correr todo; la lista cambia un puntero'],
  ['Insertar al final', 'O(1)*', 'O(1)**', '*amortizado; **si guardas un puntero al último'],
  ['Insertar en el medio', 'O(n)', 'O(1)***', '***si ya estás en el lugar; llegar cuesta O(n)'],
  ['Eliminar en el medio', 'O(n)', 'O(1)***', 'igual que insertar'],
  ['Memoria por elemento', 'solo el dato', 'dato + puntero (8 bytes más)', 'la lista paga por cada nodo'],
  ['Localidad de caché', '<b>excelente</b>', 'mala', 'el arreglo va seguido; los nodos están dispersos']
], 'La última fila es la que la teoría suele ignorar y la que más decide en la práctica.')}

<h2>El arreglo dinámico: lo mejor de los dos mundos</h2>
<p>Las listas de Python, los <code>ArrayList</code> de Java y los arreglos de JavaScript no son listas enlazadas: son
<strong>arreglos dinámicos</strong>. Mantienen un arreglo con espacio sobrante y, cuando se llena,
<strong>duplican</strong> su capacidad copiando todo a un bloque nuevo.</p>

<p>Copiar parece caro, y aquí está lo bonito: como la capacidad se duplica, las copias son cada vez más raras. Al
insertar <code>n</code> elementos, el total copiado es <code>1+2+4+8+…+n &lt; 2n</code>. Repartido entre las
<code>n</code> inserciones da un costo <strong>amortizado</strong> de O(1) por inserción. Una operación ocasionalmente
cara, promediada, sale barata.</p>

${nota('Por qué el arreglo casi siempre gana en la práctica',
  '<p>La tabla dice que la lista enlazada inserta más rápido. Las mediciones reales dicen lo contrario en casi todos ' +
  'los casos, por la <strong>caché</strong> (módulo 1): recorrer un arreglo trae bloques contiguos y acierta siempre; ' +
  'recorrer una lista salta por toda la memoria y falla constantemente. Un fallo de caché cuesta unos 200 ciclos, ' +
  'más que correr cien elementos de un arreglo.</p>' +
  '<p>La recomendación profesional es clara: <strong>usa el arreglo dinámico de tu lenguaje por defecto</strong>, y ' +
  'cambia solo si mides que es el problema.</p>', 'key')}

<h2>Variantes de lista</h2>
<ul>
  <li><strong>Simplemente enlazada:</strong> cada nodo apunta al siguiente. Solo se recorre hacia adelante.</li>
  <li><strong>Doblemente enlazada:</strong> cada nodo apunta al siguiente y al anterior. Permite recorrer en ambos
  sentidos y eliminar un nodo teniéndolo a él solo, a cambio de un puntero más por nodo. Es lo que usan las listas de
  «deshacer» y los navegadores para el historial.</li>
  <li><strong>Circular:</strong> el último apunta al primero. Útil para turnos rotativos y planificadores de tareas.</li>
</ul>

<p>Dónde sí gana la lista enlazada: cuando insertas y eliminas constantemente en posiciones que ya tienes localizadas,
cuando no puedes permitirte que una operación ocasional sea cara (un sistema de tiempo real no tolera la copia de un
arreglo que crece), o cuando los elementos son muy grandes y copiarlos sale caro.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Elige la estructura',
          enunciado: 'Di qué estructura elegirías y por qué: (a) las notas de 30 alumnos para calcular promedios; (b) el historial de «deshacer» de un editor; (c) la lista de reproducción de un reproductor con repetición; (d) un millón de registros que se recorren secuencialmente; (e) una lista de tareas donde se inserta y borra en cualquier posición todo el tiempo.',
          pista: 'Pregúntate qué operación se hace más veces.',
          solucion: `<p><b>(a) Arreglo.</b> Tamaño conocido, acceso por índice, recorridos completos. No hay inserciones.</p>
<p><b>(b) Lista doblemente enlazada</b> o una pila. Se añade y quita siempre por el mismo extremo, y «rehacer» necesita moverse en ambas direcciones. En la práctica, un arreglo dinámico usado como pila también sirve y es más rápido.</p>
<p><b>(c) Lista circular.</b> Al terminar el último, continuar con el primero sin ningún caso especial. Si además hay «anterior», doblemente enlazada circular.</p>
<p><b>(d) Arreglo, sin dudarlo.</b> Un millón de nodos dispersos haría fallar la caché en cada elemento; el arreglo aprovecha cada línea de caché completa. La diferencia medida suele ser de 5 a 10 veces.</p>
<p><b>(e) Depende de cómo llegas a la posición.</b> Si tienes una referencia directa al elemento (porque lo acabas de encontrar o te lo dio la interfaz), la lista enlazada borra en O(1). Si tienes que <i>buscar</i> la posición cada vez, el recorrido ya cuesta O(n) y el arreglo gana por la caché. Esta distinción es la que más se pasa por alto.</p>` },
        { n: 2, titulo: 'Calcula los costos',
          enunciado: 'Tienes un arreglo de 1 000 000 de elementos. ¿Cuántas operaciones cuesta en el peor caso: (a) leer el elemento 500 000; (b) insertar al principio; (c) insertar al final habiendo espacio; (d) buscar un valor que no está; (e) insertar al final cuando está lleno?',
          pista: 'Piensa en cuántos elementos hay que tocar en cada caso.',
          solucion: `<p><b>(a) 1 operación.</b> Una multiplicación y una suma: O(1), sin importar el tamaño.</p>
<p><b>(b) 1 000 000 de movimientos.</b> Todos los elementos se corren un lugar: O(n).</p>
<p><b>(c) 1 operación.</b> Escribir en la primera casilla libre y aumentar el contador: O(1).</p>
<p><b>(d) 1 000 000 de comparaciones.</b> Hay que mirar todos para saber que no está: O(n). (Si estuviera ordenado, la búsqueda binaria lo haría en 20 comparaciones; es el tema del módulo 7.)</p>
<p><b>(e) 1 000 000 de copias</b> en esa operación concreta: reservar un bloque de 2 000 000 y copiar todo. Pero el <b>costo amortizado</b> sigue siendo O(1), porque la próxima duplicación no ocurrirá hasta dentro de otro millón de inserciones.</p>
<p>La distinción entre peor caso y costo amortizado importa: una aplicación interactiva puede notar ese tirón puntual de un millón de copias, y por eso los sistemas de tiempo real prefieren estructuras con costo uniforme aunque el promedio sea peor.</p>` },
        { n: 3, titulo: 'Implementa una lista enlazada',
          enunciado: 'Implementa una lista enlazada simple con arreglos paralelos (dato y siguiente, usando índices en lugar de direcciones) con las operaciones: insertar al inicio, recorrer y buscar. Explica por qué esta técnica se usaba de verdad.',
          pista: 'Usa dos arreglos, un índice de cabeza y 0 como «nulo».',
          lab: 'Algoritmo ListaEnlazada\n\tDefinir i, cabeza, libre, nuevo, actual Como Entero\n\tDimension dato[20]\n\tDimension siguiente[20]\n\n\t// 0 representa "nulo"\n\tcabeza <- 0\n\tlibre <- 1\n\n\t// insertar al inicio: 30, luego 20, luego 10\n\tdato[libre] <- 30\n\tsiguiente[libre] <- cabeza\n\tcabeza <- libre\n\tlibre <- libre + 1\n\n\tdato[libre] <- 20\n\tsiguiente[libre] <- cabeza\n\tcabeza <- libre\n\tlibre <- libre + 1\n\n\tdato[libre] <- 10\n\tsiguiente[libre] <- cabeza\n\tcabeza <- libre\n\tlibre <- libre + 1\n\n\tEscribir "Recorrido de la lista:"\n\tactual <- cabeza\n\tMientras actual <> 0 Hacer\n\t\tEscribir Sin Saltar dato[actual], " -> "\n\t\tactual <- siguiente[actual]\n\tFinMientras\n\tEscribir "nulo"\n\n\t// insertar 15 despues del nodo que contiene 10 (la cabeza)\n\tnuevo <- libre\n\tdato[nuevo] <- 15\n\tsiguiente[nuevo] <- siguiente[cabeza]\n\tsiguiente[cabeza] <- nuevo\n\tlibre <- libre + 1\n\n\tEscribir "Tras insertar 15 en segunda posición:"\n\tactual <- cabeza\n\tMientras actual <> 0 Hacer\n\t\tEscribir Sin Saltar dato[actual], " -> "\n\t\tactual <- siguiente[actual]\n\tFinMientras\n\tEscribir "nulo"\nFinAlgoritmo',
          solucion: `<p>La implementación está en el laboratorio. La idea central: <b>el «puntero» es un índice del arreglo</b>, y el 0 hace de nulo porque este pseudocódigo indexa desde 1.</p>
${cod('pseudo', `// Insertar al inicio: tres líneas, sin mover ningún dato
dato[libre] <- valor
siguiente[libre] <- cabeza      // el nuevo apunta al antiguo primero
cabeza <- libre                 // la cabeza pasa a ser el nuevo`)}
<p><b>Por qué esta técnica se usaba de verdad:</b></p>
<ul>
<li><b>En lenguajes sin punteros</b> (FORTRAN, BASIC, COBOL antiguos) era la <b>única</b> forma de construir estructuras enlazadas. Miles de sistemas en producción están escritos así.</li>
<li><b>En sistemas embebidos</b> sigue siendo habitual: reservar memoria dinámicamente es caro e impredecible, y un arreglo de nodos del tamaño máximo permite saber exactamente cuánta memoria usará el programa.</li>
<li><b>Mejora la localidad de caché:</b> todos los nodos están en el mismo bloque contiguo, así que recupera gran parte de la ventaja que el arreglo le lleva a la lista enlazada clásica.</li>
<li><b>Permite guardar la estructura en disco</b> tal cual, porque los índices siguen siendo válidos al recargarla, mientras que las direcciones de memoria no.</li>
</ul>
<p>Lo que falta para que sea completa: una <b>lista de nodos libres</b>. Al eliminar un nodo, en lugar de perderlo, se encadena a una lista de huecos para reutilizarlo. Eso es, en miniatura, lo que hace un <b>gestor de memoria</b>, y construirlo enseña más sobre cómo funciona <code>malloc</code> que cualquier explicación.</p>` },
        { n: 4, titulo: 'Mide la localidad',
          enunciado: 'En la consola JavaScript del laboratorio, compara el tiempo de sumar un millón de números guardados en un arreglo contra el tiempo de sumarlos siguiendo una lista enlazada construida con objetos. Explica el resultado.',
          pista: 'Construye ambas estructuras con los mismos datos y mide con performance.now().',
          solucion: `${cod('js', `const N = 1000000;

// 1) arreglo contiguo
const arr = new Array(N);
for (let i = 0; i < N; i++) arr[i] = i;

// 2) lista enlazada con objetos (nodos dispersos en el montón)
let cabeza = null;
for (let i = N - 1; i >= 0; i--) cabeza = { dato: i, sig: cabeza };

let t0 = performance.now();
let s1 = 0;
for (let i = 0; i < N; i++) s1 += arr[i];
let t1 = performance.now();

let s2 = 0;
let p = cabeza;
while (p !== null) { s2 += p.dato; p = p.sig; }
let t2 = performance.now();

console.log("arreglo:", (t1 - t0).toFixed(1), "ms   suma:", s1);
console.log("lista:  ", (t2 - t1).toFixed(1), "ms   suma:", s2);
console.log("la lista es", ((t2 - t1) / (t1 - t0)).toFixed(1), "veces más lenta");`)}
<p><b>Resultado típico:</b> la lista tarda entre 3 y 10 veces más, y ambas hacen <b>exactamente el mismo número de sumas</b>. Toda la diferencia está en los accesos a memoria.</p>
<p><b>Por qué:</b> el arreglo recorre memoria contigua, así que cada línea de caché traída (64 bytes) sirve para varios elementos y el procesador además <b>precarga</b> las siguientes al detectar el patrón. La lista salta a direcciones impredecibles: cada nodo es probablemente un fallo de caché de unos 200 ciclos, y el procesador no puede precargar porque no sabe dónde estará el siguiente hasta leer el actual. Esa dependencia en cadena también impide el paralelismo interno de la CPU.</p>
<p><b>La conclusión que importa:</b> el análisis O() dice que ambos recorridos son O(n) y por tanto equivalentes. La realidad dice que uno es 5 veces más rápido. <b>La notación O ignora las constantes, y a veces las constantes son lo único que importa.</b> Por eso hay que medir y no solo razonar.</p>` },
        { n: 5, titulo: 'Diseña un buffer circular',
          enunciado: 'Diseña una estructura que guarde las últimas 100 mediciones de un sensor: cuando llega la 101, se descarta la más antigua. Debe ser O(1) tanto al insertar como al leer cualquier posición, sin mover datos nunca. Impleméntala y explica dónde se usa de verdad.',
          pista: 'Un arreglo fijo con dos índices y aritmética modular. Nada se mueve: los índices giran.',
          lab: 'Algoritmo BufferCircular\n\tDefinir i, inicio, cantidad, pos, valor Como Entero\n\tDefinir CAP Como Entero\n\tCAP <- 5\n\tDimension buf[5]\n\tinicio <- 0\n\tcantidad <- 0\n\n\t// insertamos 8 valores en un buffer de capacidad 5\n\tPara i <- 1 Hasta 8 Con Paso 1 Hacer\n\t\tvalor <- i * 10\n\t\tpos <- (inicio + cantidad) MOD CAP\n\t\tbuf[pos + 1] <- valor\n\t\tSi cantidad < CAP Entonces\n\t\t\tcantidad <- cantidad + 1\n\t\tSino\n\t\t\tinicio <- (inicio + 1) MOD CAP\n\t\tFinSi\n\t\tEscribir "Inserto ", valor, " -> contenido actual:"\n\t\tEscribir Sin Saltar "   "\n\t\tPara pos <- 0 Hasta cantidad - 1 Con Paso 1 Hacer\n\t\t\tEscribir Sin Saltar buf[((inicio + pos) MOD CAP) + 1], " "\n\t\tFinPara\n\t\tEscribir ""\n\tFinPara\nFinAlgoritmo',
          solucion: `${cod('pseudo', `// Estado: el arreglo, el índice del elemento más antiguo y cuántos hay
Dimension buf[CAP]
inicio <- 0        // dónde está el más antiguo
cantidad <- 0      // cuántos elementos válidos hay

// INSERTAR: siempre O(1), nada se mueve
SubProceso insertar(valor)
	pos <- (inicio + cantidad) MOD CAP
	buf[pos] <- valor
	Si cantidad < CAP Entonces
		cantidad <- cantidad + 1
	Sino
		inicio <- (inicio + 1) MOD CAP    // se pisó el más antiguo
	FinSi
FinSubProceso

// LEER el i-ésimo más antiguo (0 = el más viejo): O(1)
Funcion v <- obtener(i)
	v <- buf[(inicio + i) MOD CAP]
FinFuncion`)}
<p><b>La clave es el <code>MOD</code>:</b> convierte el arreglo en un anillo. Cuando el índice llega al final, vuelve al principio automáticamente, sin ningún <code>Si</code> especial. Por eso nunca hay que mover datos: lo que «gira» son los índices, no los elementos.</p>
<p><b>Dónde se usa de verdad</b> —y la lista es larga, lo que dice mucho de su utilidad:</p>
<ul>
<li><b>Audio y video en tiempo real:</b> el <i>buffer</i> entre la tarjeta de sonido y el programa es circular. Una estructura que reservara memoria en medio de la reproducción produciría un chasquido.</li>
<li><b>Registros de sistema</b> (<code>dmesg</code> en Linux, las cajas negras de los aviones): guardan los últimos N eventos descartando los antiguos, con memoria acotada garantizada.</li>
<li><b>Comunicación entre hilos o entre el hardware y el sistema operativo:</b> un productor escribe y un consumidor lee, y con un solo productor y un solo consumidor se puede hacer <b>sin bloqueos</b>, que es una propiedad valiosísima.</li>
<li><b>Ventanas deslizantes</b> de estadísticas: la media de los últimos 100 valores.</li>
</ul>
<p><b>La sutileza del diseño:</b> hace falta distinguir «vacío» de «lleno», porque en ambos casos los índices de inicio y fin coinciden. Aquí se resuelve guardando <code>cantidad</code>; otras implementaciones sacrifican una casilla (lleno = quedan CAP−1) o usan un contador de vueltas. Es un detalle pequeño que, mal resuelto, produce un bug que solo aparece cuando el buffer se llena exactamente, es decir, en producción y no en las pruebas.</p>` }
      ],
      quiz: [
        { p: 'Acceder a <code>a[500000]</code> en un arreglo de un millón de elementos cuesta…',
          ops: ['500 000 operaciones', '1 operación, porque la dirección se calcula', '20 operaciones', 'depende del dato'],
          ok: 1, exp: 'dirección = base + i × tamaño. El cálculo no depende de i, por eso es O(1).' },
        { p: 'Las listas de Python y los arreglos de JavaScript son…',
          ops: ['listas enlazadas', 'arreglos dinámicos que duplican su capacidad al llenarse',
            'árboles', 'tablas hash'],
          ok: 1, exp: 'Son arreglos contiguos con capacidad sobrante. Duplicar al llenarse da un costo amortizado O(1) por inserción al final.' },
        { p: 'En la práctica el arreglo suele ganarle a la lista enlazada incluso cuando la teoría dice lo contrario, por…',
          ops: ['el compilador', 'la localidad de caché: la memoria contigua se recorre mucho más rápido',
            'el recolector de basura', 'el tamaño de los punteros'],
          ok: 1, exp: 'Un fallo de caché cuesta unos 200 ciclos. Recorrer nodos dispersos falla casi siempre; recorrer un arreglo aprovecha cada línea de caché completa.' }
      ]
    },

    {
      id: 'm6-2',
      titulo: 'Pilas y colas',
      resumen: 'LIFO y FIFO, sus operaciones, y los problemas reales que resuelven: deshacer, recursión, impresión y recorridos.',
      objetivos: [
        'Implementar una pila y una cola con un arreglo',
        'Reconocer problemas que se resuelven con cada una',
        'Entender la pila de llamadas como una pila de verdad'
      ],
      lectura: `
<p>Una pila y una cola son arreglos con una <strong>restricción deliberada</strong>: solo se puede añadir y quitar por
ciertos extremos. Esa limitación, que parece una pérdida, es exactamente lo que las hace útiles: modelan directamente
problemas donde el orden importa.</p>

<h2>Pila (LIFO: el último en entrar es el primero en salir)</h2>
<p>Como una pila de platos: apilas encima y retiras de encima.</p>

${tabla(['Operación', 'Nombre habitual', 'Qué hace', 'Costo'], [
  ['Apilar', '<code>push</code>', 'pone un elemento en la cima', 'O(1)'],
  ['Desapilar', '<code>pop</code>', 'quita y devuelve el de la cima', 'O(1)'],
  ['Cima', '<code>peek</code> / <code>top</code>', 'mira el de arriba sin quitarlo', 'O(1)'],
  ['¿Vacía?', '<code>isEmpty</code>', 'dice si no hay elementos', 'O(1)']
])}

${cod('pseudo', `// Pila con un arreglo y un índice de cima
Dimension pila[MAX]
cima <- 0                          // 0 = vacía

SubProceso apilar(x)
	Si cima >= MAX Entonces
		Escribir "Desbordamiento de pila"     // ¡validar siempre!
	Sino
		cima <- cima + 1
		pila[cima] <- x
	FinSi
FinSubProceso

Funcion x <- desapilar()
	Si cima = 0 Entonces
		Escribir "La pila está vacía"
		x <- nulo
	Sino
		x <- pila[cima]
		cima <- cima - 1
	FinSi
FinFuncion`)}

<h3>Dónde aparece una pila</h3>
<ul>
  <li><strong>La pila de llamadas.</strong> Cada llamada a función apila su registro de activación; cada <code>return</code>
  desapila. Por eso el último en ser llamado es el primero en volver, y por eso una recursión infinita produce
  <em>stack overflow</em> (módulo 3).</li>
  <li><strong>Deshacer / rehacer.</strong> Cada acción se apila; deshacer desapila.</li>
  <li><strong>Equilibrio de paréntesis.</strong> Apilar cada apertura, desapilar al cerrar; si al final la pila no está
  vacía, falta cerrar algo. Es el primer paso de todo analizador sintáctico (módulo 9).</li>
  <li><strong>Evaluación de expresiones.</strong> La notación polaca inversa se evalúa con una pila, y así funcionan
  muchas máquinas virtuales.</li>
  <li><strong>Recorrido en profundidad</strong> de árboles y grafos.</li>
  <li><strong>El botón «atrás» del navegador.</strong></li>
</ul>

<h2>Cola (FIFO: el primero en entrar es el primero en salir)</h2>
<p>Como la fila del banco: el que llega se pone al final y se atiende al de adelante.</p>

${tabla(['Operación', 'Nombre habitual', 'Qué hace', 'Costo'], [
  ['Encolar', '<code>enqueue</code>', 'añade al final', 'O(1)'],
  ['Desencolar', '<code>dequeue</code>', 'quita y devuelve el del frente', 'O(1) si está bien hecha'],
  ['Frente', '<code>front</code>', 'mira el primero sin quitarlo', 'O(1)'],
  ['¿Vacía?', '<code>isEmpty</code>', '', 'O(1)']
])}

${nota('El error clásico de la cola',
  '<p>Implementarla como un arreglo donde desencolar quita la posición 1 y <strong>corre todos los demás</strong>. ' +
  'Eso hace que desencolar cueste O(n) en lugar de O(1), y con muchos elementos el programa se arrastra. La solución ' +
  'es el <strong>buffer circular</strong>: dos índices y aritmética modular, sin mover nada.</p>', 'warn')}

${cod('pseudo', `// Cola circular: frente y cantidad, igual que el buffer del tema anterior
Dimension cola[CAP]
frente <- 0
cantidad <- 0

SubProceso encolar(x)
	Si cantidad = CAP Entonces
		Escribir "Cola llena"
	Sino
		cola[(frente + cantidad) MOD CAP] <- x
		cantidad <- cantidad + 1
	FinSi
FinSubProceso

Funcion x <- desencolar()
	Si cantidad = 0 Entonces
		Escribir "Cola vacía"
	Sino
		x <- cola[frente]
		frente <- (frente + 1) MOD CAP
		cantidad <- cantidad - 1
	FinSi
FinFuncion`)}

<h3>Dónde aparece una cola</h3>
<ul>
  <li><strong>Colas de impresión y de tareas.</strong> El primer documento enviado es el primero en imprimirse.</li>
  <li><strong>Atención de peticiones</strong> en un servidor.</li>
  <li><strong>Recorrido en anchura</strong> de grafos: el algoritmo del camino más corto (tema 5).</li>
  <li><strong>Buffers entre procesos</strong> que producen y consumen a ritmos distintos.</li>
  <li><strong>Planificación de procesos</strong> en el sistema operativo.</li>
</ul>

<h2>Dos variantes muy usadas</h2>
<p><strong>Cola de prioridad.</strong> No sale el que llegó primero sino el <em>más urgente</em>. Es la estructura de
una sala de emergencias: un infarto pasa antes que un esguince aunque haya llegado después. Se implementa con un
<em>heap</em> (montículo), que permite insertar y extraer el mínimo en O(log n). Es el corazón del algoritmo de Dijkstra
para caminos mínimos y de los planificadores de tareas.</p>

<p><strong>Deque</strong> (cola doblemente terminada). Permite añadir y quitar por los dos extremos, así que sirve como
pila y como cola a la vez. Es lo que usa <code>collections.deque</code> en Python, y lo adecuado cuando necesitas ambos
comportamientos.</p>

<h2>Por qué limitar es útil</h2>
<p>Podrías hacer todo con un arreglo y acceder donde quisieras. Usar una pila cuando el problema es LIFO tiene tres
ventajas concretas: el código <strong>expresa la intención</strong> (quien lo lee sabe de inmediato qué clase de
problema es), <strong>impide errores</strong> (no puedes acceder por accidente a un elemento del medio), y
<strong>garantiza el costo</strong> (todas las operaciones son O(1), sin sorpresas).</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Pila o cola',
          enunciado: 'Di qué estructura usarías: (a) el botón atrás del navegador; (b) los mensajes pendientes de enviar de una app de chat; (c) deshacer en un editor; (d) los autos esperando en un peaje; (e) comprobar si los paréntesis de una fórmula están bien cerrados; (f) la sala de espera de una clínica con casos urgentes.',
          pista: '¿Importa quién llegó primero o quién llegó último?',
          solucion: `<p><b>(a) Pila.</b> «Atrás» va a la última página visitada. (Y «adelante» es una segunda pila: al retroceder, la página actual se apila ahí.)</p>
<p><b>(b) Cola.</b> Los mensajes deben enviarse en el orden en que se escribieron; invertirlos sería incomprensible.</p>
<p><b>(c) Pila.</b> Deshacer revierte la última acción. Y rehacer, otra pila.</p>
<p><b>(d) Cola.</b> El primero que llegó es el primero que pasa.</p>
<p><b>(e) Pila.</b> Cada apertura se apila y cada cierre debe corresponder con la última apertura pendiente.</p>
<p><b>(f) Cola de prioridad.</b> No es FIFO puro: el orden lo determina la gravedad, y entre iguales, el orden de llegada.</p>` },
        { n: 2, titulo: 'Equilibrio de paréntesis',
          enunciado: 'Escribe un algoritmo que compruebe si una expresión tiene los paréntesis, corchetes y llaves correctamente balanceados. Debe detectar: cierre sin apertura, apertura sin cierre y cierre del tipo equivocado. Prueba con <code>"{[()]}"</code>, <code>"([)]"</code> y <code>"(()"</code>.',
          pista: 'Apila cada apertura. Al encontrar un cierre, desapila y comprueba que el tipo corresponda.',
          lab: 'Funcion par <- correspondeA(cierre)\n\tSi cierre = ")" Entonces\n\t\tpar <- "("\n\tSino\n\t\tSi cierre = "]" Entonces\n\t\t\tpar <- "["\n\t\tSino\n\t\t\tpar <- "{"\n\t\tFinSi\n\tFinSi\nFinFuncion\n\nFuncion ok <- balanceada(s)\n\tDefinir i, cima Como Entero\n\tDefinir c Como Cadena\n\tDimension pila[100]\n\tcima <- 0\n\tok <- Verdadero\n\tPara i <- 1 Hasta longitud(s) Con Paso 1 Hacer\n\t\tc <- Subcadena(s, i, i)\n\t\tSi c = "(" O c = "[" O c = "{" Entonces\n\t\t\tcima <- cima + 1\n\t\t\tpila[cima] <- c\n\t\tFinSi\n\t\tSi c = ")" O c = "]" O c = "}" Entonces\n\t\t\tSi cima = 0 Entonces\n\t\t\t\tok <- Falso\n\t\t\tSino\n\t\t\t\tSi pila[cima] <> correspondeA(c) Entonces\n\t\t\t\t\tok <- Falso\n\t\t\t\tFinSi\n\t\t\t\tcima <- cima - 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\tSi cima <> 0 Entonces\n\t\tok <- Falso\n\tFinSi\nFinFuncion\n\nAlgoritmo ProbarBalance\n\tEscribir "{[()]}   -> ", balanceada("{[()]}")\n\tEscribir "([)]     -> ", balanceada("([)]")\n\tEscribir "(()      -> ", balanceada("(()")\n\tEscribir "())      -> ", balanceada("())")\n\tEscribir "a*(b+c)  -> ", balanceada("a*(b+c)")\n\tEscribir "vacío    -> ", balanceada("")\nFinAlgoritmo',
          solucion: `<p>El algoritmo completo está en el laboratorio. La lógica es exactamente la pila:</p>
<ol>
<li><b>Apertura:</b> apilarla.</li>
<li><b>Cierre con la pila vacía:</b> hay un cierre sin apertura → falso. (Caso <code>"())"</code>.)</li>
<li><b>Cierre cuyo par no coincide con la cima:</b> están mal anidados → falso. (Caso <code>"([)]"</code>: al llegar al <code>)</code>, la cima es <code>[</code>.)</li>
<li><b>Al terminar, la pila no está vacía:</b> quedaron aperturas sin cerrar → falso. (Caso <code>"(()"</code>.)</li>
</ol>
<p>Los cuatro casos corresponden a los cuatro errores posibles, y ninguno se puede detectar sin una pila: hay que recordar qué aperturas siguen pendientes y en qué orden. Contar aperturas y cierres <b>no basta</b>: <code>"([)]"</code> tiene dos de cada una y está mal.</p>
<p><b>Por qué este ejercicio es más importante de lo que parece:</b> es el primer paso de cualquier analizador sintáctico. Un compilador hace exactamente esto, con más tipos de pares (paréntesis, llaves, <code>if/FinSi</code>, <code>begin/end</code>, etiquetas HTML), y el mensaje «falta cerrar la llave de la línea 47» sale de guardar también la línea de cada apertura junto al símbolo. Lo verás a fondo en el módulo 9.</p>
<p><b>Mejora útil:</b> en lugar de devolver solo verdadero o falso, devolver la posición y el tipo del primer error. Es la diferencia entre un validador y una herramienta que de verdad ayuda.</p>` },
        { n: 3, titulo: 'Cola circular completa',
          enunciado: 'Implementa una cola circular de capacidad 4 y simula esta secuencia, mostrando el estado en cada paso: encolar A, B, C; desencolar; encolar D, E; desencolar; desencolar; encolar F. Indica en qué momento la cola está llena y qué pasa si intentas encolar entonces.',
          pista: 'Lleva frente y cantidad, y muestra las posiciones físicas además del contenido lógico.',
          lab: 'Algoritmo ColaCircular\n\tDefinir frente, cantidad, i, pos Como Entero\n\tDefinir CAP Como Entero\n\tCAP <- 4\n\tDimension cola[4]\n\tfrente <- 0\n\tcantidad <- 0\n\n\tEscribir "Capacidad 4. Secuencia de operaciones:"\n\tEscribir ""\n\n\t// encolar A, B, C\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "A"\n\tcantidad <- cantidad + 1\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "B"\n\tcantidad <- cantidad + 1\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "C"\n\tcantidad <- cantidad + 1\n\tEscribir "encolar A,B,C -> frente=", frente, " cantidad=", cantidad\n\tEscribir Sin Saltar "   contenido: "\n\tPara i <- 0 Hasta cantidad - 1 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar cola[((frente + i) MOD CAP) + 1], " "\n\tFinPara\n\tEscribir ""\n\n\t// desencolar\n\tEscribir "desencolar -> sale ", cola[frente + 1]\n\tfrente <- (frente + 1) MOD CAP\n\tcantidad <- cantidad - 1\n\n\t// encolar D, E\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "D"\n\tcantidad <- cantidad + 1\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "E"\n\tcantidad <- cantidad + 1\n\tEscribir "encolar D,E -> frente=", frente, " cantidad=", cantidad, " (LLENA)"\n\tEscribir Sin Saltar "   contenido: "\n\tPara i <- 0 Hasta cantidad - 1 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar cola[((frente + i) MOD CAP) + 1], " "\n\tFinPara\n\tEscribir ""\n\n\tSi cantidad = CAP Entonces\n\t\tEscribir "intento encolar X -> RECHAZADO: cola llena"\n\tFinSi\n\n\tEscribir "desencolar -> sale ", cola[frente + 1]\n\tfrente <- (frente + 1) MOD CAP\n\tcantidad <- cantidad - 1\n\tEscribir "desencolar -> sale ", cola[frente + 1]\n\tfrente <- (frente + 1) MOD CAP\n\tcantidad <- cantidad - 1\n\n\tcola[((frente + cantidad) MOD CAP) + 1] <- "F"\n\tcantidad <- cantidad + 1\n\tEscribir "encolar F -> frente=", frente, " cantidad=", cantidad\n\tEscribir Sin Saltar "   contenido: "\n\tPara i <- 0 Hasta cantidad - 1 Con Paso 1 Hacer\n\t\tEscribir Sin Saltar cola[((frente + i) MOD CAP) + 1], " "\n\tFinPara\n\tEscribir ""\nFinAlgoritmo',
          solucion: `${tabla(['Operación', '#frente', '#cantidad', 'Posiciones físicas (1-4)', 'Contenido lógico'], [
  ['inicio', '0', '0', '_ _ _ _', '(vacía)'],
  ['encolar A,B,C', '0', '3', 'A B C _', 'A B C'],
  ['desencolar → A', '1', '2', '_ B C _', 'B C'],
  ['encolar D', '1', '3', '_ B C D', 'B C D'],
  ['encolar E', '1', '4', '<b>E</b> B C D', 'B C D <b>E</b> ← <b>LLENA</b>'],
  ['encolar X', '1', '4', 'rechazado', 'sin espacio'],
  ['desencolar → B', '2', '3', 'E _ C D', 'C D E'],
  ['desencolar → C', '3', '2', 'E _ _ D', 'D E'],
  ['encolar F', '3', '3', 'E <b>F</b> _ D', 'D E <b>F</b>']
], 'La E se escribe en la posición 1 aunque sea el último elemento: ahí está el giro del anillo.')}
<p><b>Los dos momentos reveladores:</b></p>
<ul>
<li><b>Al encolar E</b>, la posición física es <code>(1 + 3) MOD 4 = 0</code>, es decir la primera casilla, que había quedado libre al desencolar A. El orden físico ya no coincide con el lógico, y eso es exactamente lo que permite no mover nada nunca.</li>
<li><b>Al encolar F</b>, la cola vuelve a ocupar casillas no consecutivas. Un recorrido ingenuo que leyera el arreglo de izquierda a derecha mostraría «E F D», que es incorrecto: hay que recorrerlo siempre con <code>(frente + i) MOD CAP</code>.</li>
</ul>
<p><b>Qué pasa al encolar con la cola llena:</b> hay que <b>rechazar</b> explícitamente. Las tres alternativas de diseño son: rechazar e informar (lo habitual en una cola de tareas), bloquear hasta que haya espacio (lo habitual entre hilos productor-consumidor) o sobrescribir el más antiguo (lo habitual en un buffer de registro). <b>Son tres comportamientos muy distintos y hay que elegir uno a conciencia</b>; la peor opción es no comprobarlo y escribir fuera del arreglo.</p>` },
        { n: 4, titulo: 'Evaluación con pila',
          enunciado: 'La notación polaca inversa escribe los operadores después de los operandos: <code>3 4 + 2 *</code> significa <code>(3+4)*2 = 14</code>. Escribe un algoritmo que evalúe una expresión así usando una pila, y explica por qué esta notación no necesita paréntesis.',
          pista: 'Si es número, apílalo. Si es operador, desapila dos, opera y apila el resultado.',
          lab: 'Algoritmo EvaluarRPN\n\tDefinir i, cima, a, b Como Entero\n\tDefinir t Como Cadena\n\tDimension pila[50]\n\tDimension token[9]\n\tDefinir n Como Entero\n\n\t// 3 4 + 2 * 7 5 - /   =  (3+4)*2 / (7-5) = 14/2 = 7\n\ttoken[1] <- "3"\n\ttoken[2] <- "4"\n\ttoken[3] <- "+"\n\ttoken[4] <- "2"\n\ttoken[5] <- "*"\n\ttoken[6] <- "7"\n\ttoken[7] <- "5"\n\ttoken[8] <- "-"\n\ttoken[9] <- "/"\n\tn <- 9\n\n\tcima <- 0\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tt <- token[i]\n\t\tSi t = "+" O t = "-" O t = "*" O t = "/" Entonces\n\t\t\tb <- pila[cima]\n\t\t\tcima <- cima - 1\n\t\t\ta <- pila[cima]\n\t\t\tcima <- cima - 1\n\t\t\tSi t = "+" Entonces\n\t\t\t\tpila[cima + 1] <- a + b\n\t\t\tFinSi\n\t\t\tSi t = "-" Entonces\n\t\t\t\tpila[cima + 1] <- a - b\n\t\t\tFinSi\n\t\t\tSi t = "*" Entonces\n\t\t\t\tpila[cima + 1] <- a * b\n\t\t\tFinSi\n\t\t\tSi t = "/" Entonces\n\t\t\t\tpila[cima + 1] <- a / b\n\t\t\tFinSi\n\t\t\tcima <- cima + 1\n\t\t\tEscribir t, " -> saco ", a, " y ", b, ", apilo ", pila[cima]\n\t\tSino\n\t\t\tcima <- cima + 1\n\t\t\tpila[cima] <- ConvertirANumero(t)\n\t\t\tEscribir "apilo ", t\n\t\tFinSi\n\tFinPara\n\tEscribir "Resultado: ", pila[1]\nFinAlgoritmo',
          solucion: `${cod('pseudo', `Para cada token:
	Si es número Entonces
		apilar(número)
	Sino                          // es operador
		b <- desapilar()          // ¡OJO: el segundo operando sale primero!
		a <- desapilar()
		apilar(a operador b)
	FinSi
Al terminar, el resultado es el único elemento de la pila.`)}
<p><b>El detalle crítico:</b> el primer valor que se desapila es el operando <b>derecho</b>. Con <code>7 5 -</code>, la pila tiene [7, 5]; desapilas 5 (que es <code>b</code>) y luego 7 (que es <code>a</code>), y calculas <code>a − b = 2</code>. Invertirlo daría −2. Con la suma y la multiplicación el error no se nota (son conmutativas), lo que lo hace especialmente traicionero: pasa las pruebas con <code>+</code> y falla con <code>−</code> y <code>/</code>.</p>
<p><b>Por qué no necesita paréntesis:</b> en la notación infija, <code>3 + 4 * 2</code> es ambiguo sin reglas de precedencia, y los paréntesis sirven para romper esas reglas. En notación polaca inversa, <b>la posición del operador ya determina sus operandos</b>: siempre son los dos resultados pendientes más recientes. <code>3 4 + 2 *</code> y <code>3 4 2 * +</code> son expresiones distintas y ambas no ambiguas, sin un solo paréntesis.</p>
<p><b>Dónde se usa de verdad:</b> las calculadoras HP científicas usaron esta notación durante décadas; la <b>máquina virtual de Java</b> y el <b>bytecode de Python</b> son máquinas de pila que ejecutan exactamente esto; PostScript y Forth son lenguajes basados en pila. Convertir de infija a postfija se hace con el <b>algoritmo shunting-yard</b> de Dijkstra, que también usa una pila, y es lo que hace un compilador al analizar una expresión aritmética (módulo 9).</p>` },
        { n: 5, titulo: 'Simula la pila de llamadas',
          enunciado: 'Dibuja el estado de la pila de llamadas, paso a paso, para <code>factorial(4)</code> implementado recursivamente. Indica cuántos registros de activación llegan a existir simultáneamente, en qué orden se devuelven los valores y qué pasaría con <code>factorial(100000)</code>.',
          pista: 'Las llamadas se apilan hasta el caso base, y después se desapilan devolviendo valores hacia arriba.',
          solucion: `${cod('pseudo', `Funcion r <- factorial(n)
	Si n <= 1 Entonces
		r <- 1
	Sino
		r <- n * factorial(n - 1)
	FinSi
FinFuncion`)}
<p><b>Fase de apilado</b> (bajando hacia el caso base):</p>
${tabla(['Paso', 'Contenido de la pila (la cima arriba)', 'Qué ocurre'], [
  ['1', 'factorial(4)', 'necesita factorial(3)'],
  ['2', 'factorial(3) · factorial(4)', 'necesita factorial(2)'],
  ['3', 'factorial(2) · factorial(3) · factorial(4)', 'necesita factorial(1)'],
  ['4', '<b>factorial(1)</b> · factorial(2) · factorial(3) · factorial(4)', '<b>caso base:</b> devuelve 1']
])}
<p><b>Fase de desapilado</b> (subiendo con los resultados):</p>
${tabla(['Paso', 'Se desapila', 'Calcula', 'Devuelve'], [
  ['5', 'factorial(1)', '—', '1'],
  ['6', 'factorial(2)', '2 × 1', '2'],
  ['7', 'factorial(3)', '3 × 2', '6'],
  ['8', 'factorial(4)', '4 × 6', '<b>24</b>']
])}
<p><b>Registros simultáneos: 4</b>, es decir n. La profundidad máxima de la pila es proporcional a n, y <b>ninguna multiplicación ocurre hasta llegar al caso base</b>: todas quedan pendientes, esperando. Eso es lo que ocupa memoria.</p>
<p><b>Con factorial(100000):</b> <b>desbordamiento de pila</b> (<i>stack overflow</i>). La pila tiene entre 1 y 8 MB; con unas decenas de bytes por registro de activación, el límite está entre unos 10 000 y 100 000 niveles según el lenguaje y el sistema. El programa muere antes de calcular nada. (Y aunque cupiera, el resultado tendría 456 574 dígitos y desbordaría cualquier entero que no sea de precisión arbitraria.)</p>
<p><b>La solución y un matiz importante:</b> la versión iterativa con un bucle usa <b>un solo</b> registro de activación y memoria constante, así que no desborda. Algunos lenguajes implementan <i>optimización de llamada final</i> (<i>tail call</i>), que reutiliza el registro cuando la llamada recursiva es la última operación; pero esta función <b>no</b> es de llamada final, porque después de la llamada todavía queda la multiplicación pendiente. Reescribirla con un acumulador sí la haría de llamada final. Python y Java no implementan esa optimización en ningún caso; Scheme y Rust sí.</p>` }
      ],
      quiz: [
        { p: 'Una pila funciona con el criterio…',
          ops: ['FIFO: el primero en entrar es el primero en salir', 'LIFO: el último en entrar es el primero en salir',
            'por prioridad', 'aleatorio'],
          ok: 1, exp: 'Como una pila de platos: se apila y se retira por el mismo extremo. La pila de llamadas de un programa funciona exactamente así.' },
        { p: 'Implementar una cola con un arreglo donde desencolar corre todos los elementos hace que esa operación cueste…',
          ops: ['O(1)', 'O(n), cuando debería ser O(1)', 'O(log n)', 'O(n²)'],
          ok: 1, exp: 'Mover todos los elementos es O(n). La solución correcta es el buffer circular con dos índices y aritmética modular.' },
        { p: 'Para comprobar si los paréntesis de una expresión están bien anidados…',
          ops: ['basta contar aperturas y cierres', 'hace falta una pila, porque hay que recordar el orden de las aperturas pendientes',
            'hace falta una cola', 'basta un contador'],
          ok: 1, exp: '«([)]» tiene dos aperturas y dos cierres y está mal. Hay que recordar qué aperturas siguen pendientes y en qué orden: eso es una pila.' }
      ]
    },

    {
      id: 'm6-3',
      titulo: 'Diccionarios y tablas hash',
      resumen: 'Buscar por clave en tiempo constante: cómo funciona por dentro, qué son las colisiones y cuándo falla.',
      objetivos: [
        'Usar diccionarios para resolver problemas de búsqueda y conteo',
        'Explicar cómo una función hash convierte una clave en una posición',
        'Reconocer las limitaciones: colisiones, orden y claves mutables'
      ],
      lectura: `
<p>Un <strong>diccionario</strong> (o mapa, tabla asociativa, objeto) guarda pares <em>clave → valor</em> y permite
buscar por la clave en <strong>tiempo constante promedio</strong>. Es, con diferencia, la estructura de datos más útil
que existe después del arreglo, y usarla bien es lo que convierte muchos algoritmos O(n²) en O(n).</p>

${cod('python', `precios = {"ABC-001": 19.90, "XYZ-200": 45.00, "QRS-310": 8.50}

precios["ABC-001"]            # 19.90, sin recorrer nada
precios["NUEVO"] = 12.00      # insertar
"XYZ-200" in precios          # True
del precios["QRS-310"]        # eliminar`)}

<h2>La idea: convertir la clave en una posición</h2>
<p>El truco está en la <strong>función hash</strong>: una función que convierte cualquier clave en un número, y ese
número (reducido con <code>MOD</code> al tamaño de la tabla) es la posición donde se guarda el valor.</p>

${fig(`<svg viewBox="0 0 580 220" width="580" height="220" role="img" aria-label="Funcionamiento de una tabla hash">
<g color="var(--fg-soft)">
<rect x="12" y="30" width="118" height="30" rx="4" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.4"/>
<text x="71" y="50" text-anchor="middle" font-size="12" fill="var(--fg)">"ABC-001"</text>
<rect x="12" y="76" width="118" height="30" rx="4" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.4"/>
<text x="71" y="96" text-anchor="middle" font-size="12" fill="var(--fg)">"XYZ-200"</text>
<rect x="12" y="122" width="118" height="30" rx="4" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.4"/>
<text x="71" y="142" text-anchor="middle" font-size="12" fill="var(--fg)">"QRS-310"</text>
<text x="71" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">claves</text>

<rect x="170" y="62" width="112" height="58" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="226" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">hash(clave)</text>
<text x="226" y="105" text-anchor="middle" font-size="10.5" fill="var(--fg-soft)">MOD tamaño</text>
<path d="M132 45 C155 45 150 80 168 85" stroke="var(--fg-soft)" stroke-width="1.3" fill="none" marker-end="url(#m6h)"/>
<path d="M132 91 H166" stroke="var(--fg-soft)" stroke-width="1.3" fill="none" marker-end="url(#m6h)"/>
<path d="M132 137 C155 137 150 102 168 97" stroke="var(--fg-soft)" stroke-width="1.3" fill="none" marker-end="url(#m6h)"/>
<defs><marker id="m6h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".6"/></marker></defs>

${[0, 1, 2, 3, 4, 5, 6].map(function (i) {
  var y = 18 + i * 27;
  var lleno = (i === 1 || i === 3 || i === 5);
  var val = { 1: '19.90', 3: '45.00', 5: '8.50' }[i] || '';
  return '<rect x="340" y="' + y + '" width="150" height="24" fill="' + (lleno ? 'var(--accent-soft)' : 'var(--surface-2)') +
    '" stroke="var(--line)" stroke-width="1"/>' +
    '<text x="330" y="' + (y + 16) + '" text-anchor="end" font-size="10.5" fill="var(--fg-soft)">' + i + '</text>' +
    '<text x="415" y="' + (y + 16) + '" text-anchor="middle" font-size="11" fill="var(--fg)">' + val + '</text>';
}).join('')}
<text x="415" y="212" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)">tabla interna (arreglo)</text>
<path d="M286 91 H336" stroke="var(--fg-soft)" stroke-width="1.3" fill="none" marker-end="url(#m6h)"/>
</g></svg>`, 'La función hash convierte la clave en un índice del arreglo interno. Por eso buscar no requiere recorrer.')}

${cod('pseudo', `// Una función hash elemental para cadenas
Funcion h <- hash(clave, tamanio)
	h <- 0
	Para i <- 1 Hasta longitud(clave) Con Paso 1 Hacer
		h <- (h * 31 + codigo(Subcadena(clave, i, i))) MOD tamanio
	FinPara
FinFuncion`)}

<p>El multiplicador 31 no es casual: es primo, lo que distribuye mejor los resultados, y la multiplicación por 31 se
calcula rápido (<code>x*31 = (x&lt;&lt;5) − x</code>). Es exactamente la función que usa Java para las cadenas.</p>

<h2>Colisiones: el problema inevitable</h2>
<p>Dos claves distintas pueden dar el mismo número. No es un defecto evitable: hay infinitas claves posibles y un número
finito de posiciones, así que las colisiones son <strong>matemáticamente inevitables</strong>. Las dos soluciones
clásicas:</p>

<ul>
  <li><strong>Encadenamiento.</strong> Cada casilla guarda una pequeña lista con todos los pares que cayeron ahí. Al
  buscar, se calcula el hash y se recorre esa lista corta. Es lo que usan Python y Java (que desde Java 8 convierte la
  lista en un árbol si crece mucho, para que el peor caso sea O(log n) en lugar de O(n)).</li>
  <li><strong>Direccionamiento abierto.</strong> Si la casilla está ocupada, se busca la siguiente libre con alguna
  regla. Ahorra la memoria de las listas y aprovecha mejor la caché, pero eliminar es delicado.</li>
</ul>

<p>El <strong>factor de carga</strong> (elementos ÷ casillas) determina la frecuencia de colisiones. Cuando supera un
umbral (0,75 en Java, 0,66 en Python), la tabla <strong>se redimensiona</strong>: se crea una más grande y se
<em>rehashea</em> todo. Esa operación es O(n) y ocurre rara vez, así que el costo amortizado sigue siendo O(1).</p>

<h2>Los costos reales</h2>
${tabla(['Operación', 'Promedio', 'Peor caso', 'Comentario'], [
  ['Buscar por clave', '<b>O(1)</b>', 'O(n)', 'el peor caso requiere que todas las claves colisionen'],
  ['Insertar', '<b>O(1)</b>*', 'O(n)', '*amortizado, por los redimensionamientos'],
  ['Eliminar', '<b>O(1)</b>', 'O(n)', ''],
  ['Recorrer todo', 'O(n)', 'O(n)', 'pero el orden no está garantizado'],
  ['Buscar por <b>valor</b>', 'O(n)', 'O(n)', 'la tabla solo indexa claves']
], 'La última fila se olvida constantemente: un diccionario es rapidísimo buscando por clave y tan lento como un arreglo buscando por valor.')}

<h2>Lo que hay que saber para no equivocarse</h2>

<p><strong>1. Las claves deben ser inmutables.</strong> Si modificas un objeto usado como clave, su hash cambia y el
valor queda «perdido» en una casilla donde ya nadie lo busca. Por eso en Python las claves pueden ser cadenas, números
y tuplas, pero <strong>no listas</strong>.</p>

<p><strong>2. El orden.</strong> Históricamente un diccionario no garantizaba ningún orden. Desde Python 3.7 se
garantiza el orden de inserción, y en JavaScript los objetos siguen reglas peculiares (las claves que parecen enteros
van primero y ordenadas). Nunca dependas del orden salvo que la documentación lo garantice; si lo necesitas, usa una
estructura ordenada.</p>

<p><strong>3. El peor caso puede ser un ataque.</strong> Si un atacante conoce tu función hash, puede enviar miles de
claves que colisionen todas, degradando cada búsqueda a O(n) y tumbando el servidor. Es el <em>hash flooding</em>, y por
eso los lenguajes modernos usan una semilla aleatoria por proceso para el hash de cadenas.</p>

<p><strong>4. El conjunto es un diccionario sin valores.</strong> Un <em>set</em> usa la misma maquinaria para responder
«¿está este elemento?» en O(1). Para comprobar pertenencia, duplicados o hacer uniones e intersecciones, es la
estructura correcta.</p>

${nota('El patrón que más veces vas a usar',
  '<p>Siempre que un algoritmo tenga dos bucles anidados buscando coincidencias entre datos, pregúntate si un ' +
  'diccionario lo convierte en un solo bucle. La respuesta es que sí sorprendentemente a menudo, y el cambio es de ' +
  'O(n²) a O(n): con 100 000 elementos, de horas a un segundo.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'De O(n²) a O(n)',
          enunciado: 'Este algoritmo busca pares de números que sumen un objetivo, comparando todos contra todos. Reescríbelo con un diccionario para que haga un solo recorrido, y explica la idea.<br><pre>Para i ← 1 Hasta n\n    Para j ← i+1 Hasta n\n        Si a[i] + a[j] = objetivo Entonces encontrado\n</pre>',
          pista: 'Para cada número, el complemento que necesitas es objetivo − a[i]. ¿Lo has visto ya?',
          solucion: `${cod('python', `def dos_que_suman(nums, objetivo):
    vistos = {}                       # valor -> posición donde lo vi
    for i, x in enumerate(nums):
        complemento = objetivo - x
        if complemento in vistos:     # O(1)
            return (vistos[complemento], i)
        vistos[x] = i
    return None`)}
<p><b>La idea:</b> en lugar de preguntar «¿existe más adelante un número que complete la suma?» (lo que obliga a recorrer el resto), se pregunta «¿<b>ya vi</b> el número que necesito?». Esa pregunta la responde un diccionario en O(1).</p>
<p><b>El costo:</b> de O(n²) a <b>O(n)</b> en tiempo, a cambio de O(n) de memoria. Con n = 100 000: de 5 000 millones de comparaciones (varios minutos) a 100 000 operaciones (milisegundos).</p>
<p><b>El detalle fino:</b> hay que comprobar el complemento <b>antes</b> de insertar el elemento actual. Si se invierte el orden, con objetivo 10 y un único 5 en la lista, el 5 se encontraría a sí mismo y daría un par falso.</p>
<p>Este intercambio —memoria por tiempo— es uno de los más frecuentes en diseño de algoritmos, y este problema concreto es un clásico absoluto de las entrevistas técnicas precisamente porque distingue a quien ve el patrón del diccionario de quien no.</p>` },
        { n: 2, titulo: 'Contar con diccionario',
          enunciado: 'Escribe en JavaScript (pruébalo en la consola del laboratorio) una función que reciba un texto y devuelva las 5 palabras más frecuentes con su conteo, ignorando mayúsculas y signos de puntuación.',
          pista: 'Normalizar → partir en palabras → contar con un Map → ordenar por frecuencia.',
          solucion: `${cod('js', `function palabrasFrecuentes(texto, n = 5) {
  const palabras = texto
    .toLowerCase()
    .replace(/[^\\p{L}\\s]/gu, " ")     // deja solo letras (Unicode) y espacios
    .split(/\\s+/)
    .filter(p => p.length > 2);        // descarta "el", "la", "de"

  const conteo = new Map();
  for (const p of palabras) {
    conteo.set(p, (conteo.get(p) ?? 0) + 1);
  }

  return [...conteo.entries()]
    .sort((a, b) => b[1] - a[1])       // por frecuencia, descendente
    .slice(0, n);
}

const texto = "Programar es pensar. Pensar bien es programar bien, y programar mal es pensar mal.";
console.log(palabrasFrecuentes(texto));`)}
<p>Cuatro decisiones que merecen comentario:</p>
<ul>
<li><b><code>\\p{L}</code> con la bandera <code>u</code></b> reconoce letras Unicode, así que «canción» y «ñandú» no se parten. Con <code>[a-z]</code> se romperían, y es un error muy común en código escrito pensando en inglés.</li>
<li><b><code>Map</code> en lugar de un objeto literal:</b> un objeto de JavaScript tiene claves heredadas (<code>constructor</code>, <code>toString</code>) que pueden colisionar con palabras reales, y convierte todas las claves a texto. <code>Map</code> es la estructura correcta para datos.</li>
<li><b>Contar es O(n) y ordenar es O(k log k)</b> sobre las palabras distintas, que son muchas menos que las totales. Para «las 5 más frecuentes» de un corpus gigante, un <i>heap</i> de tamaño 5 sería aún mejor: O(n log 5).</li>
<li><b>El filtro de longitud es una heurística tosca.</b> Lo correcto es una lista de palabras vacías (<i>stop words</i>) del idioma, porque «no», «sí» y «yo» son cortas y significativas, mientras que «para» y «como» son largas y vacías.</li>
</ul>` },
        { n: 3, titulo: 'Implementa una tabla hash',
          enunciado: 'Implementa en pseudocódigo una tabla hash elemental con encadenamiento usando arreglos paralelos: la función hash, insertar y buscar. Usa una tabla de 7 casillas y muestra qué pasa al insertar claves que colisionan.',
          pista: 'Arreglos paralelos para clave, valor y «siguiente en la cadena», y un arreglo de cabezas por casilla.',
          lab: 'Funcion h <- hashDe(clave, tam)\n\tDefinir i, c Como Entero\n\th <- 0\n\tPara i <- 1 Hasta longitud(clave) Con Paso 1 Hacer\n\t\tc <- i * 7 + longitud(Subcadena(clave, i, i))\n\t\th <- (h * 31 + c + i) MOD tam\n\tFinPara\nFinFuncion\n\nAlgoritmo TablaHash\n\tDefinir TAM, libre, i, pos, p Como Entero\n\tTAM <- 7\n\tDimension cabeza[7]\n\tDimension clave[20]\n\tDimension valor[20]\n\tDimension sig[20]\n\n\tPara i <- 1 Hasta TAM Con Paso 1 Hacer\n\t\tcabeza[i] <- 0\n\tFinPara\n\tlibre <- 1\n\n\t// insertar 6 pares\n\tDimension ks[6]\n\tDimension vs[6]\n\tks[1] <- "ABC"\n\tvs[1] <- 100\n\tks[2] <- "XYZ"\n\tvs[2] <- 200\n\tks[3] <- "QRS"\n\tvs[3] <- 300\n\tks[4] <- "MNO"\n\tvs[4] <- 400\n\tks[5] <- "DEF"\n\tvs[5] <- 500\n\tks[6] <- "GHI"\n\tvs[6] <- 600\n\n\tPara i <- 1 Hasta 6 Con Paso 1 Hacer\n\t\tpos <- hashDe(ks[i], TAM) + 1\n\t\tclave[libre] <- ks[i]\n\t\tvalor[libre] <- vs[i]\n\t\tsig[libre] <- cabeza[pos]\n\t\tcabeza[pos] <- libre\n\t\tEscribir "insertar ", ks[i], " -> casilla ", pos - 1\n\t\tlibre <- libre + 1\n\tFinPara\n\n\tEscribir ""\n\tEscribir "Contenido de la tabla:"\n\tPara i <- 1 Hasta TAM Con Paso 1 Hacer\n\t\tEscribir Sin Saltar "  casilla ", i - 1, ": "\n\t\tp <- cabeza[i]\n\t\tSi p = 0 Entonces\n\t\t\tEscribir Sin Saltar "(vacía)"\n\t\tFinSi\n\t\tMientras p <> 0 Hacer\n\t\t\tEscribir Sin Saltar clave[p], "=", valor[p], "  "\n\t\t\tp <- sig[p]\n\t\tFinMientras\n\t\tEscribir ""\n\tFinPara\n\n\t// buscar\n\tEscribir ""\n\tpos <- hashDe("QRS", TAM) + 1\n\tp <- cabeza[pos]\n\tMientras p <> 0 Y clave[p] <> "QRS" Hacer\n\t\tp <- sig[p]\n\tFinMientras\n\tSi p <> 0 Entonces\n\t\tEscribir "buscar QRS -> ", valor[p], " (casilla ", pos - 1, ")"\n\tSino\n\t\tEscribir "buscar QRS -> no está"\n\tFinSi\nFinAlgoritmo',
          solucion: `<p>La implementación está en el laboratorio. Las tres piezas:</p>
<ol>
<li><b>La función hash</b> acumula <code>h = (h × 31 + código) MOD tamaño</code> sobre los caracteres de la clave.</li>
<li><b>Insertar:</b> calcular la casilla y añadir el nodo <b>al principio</b> de su cadena, lo que es O(1) y no requiere recorrerla.</li>
<li><b>Buscar:</b> calcular la casilla y recorrer solo esa cadena, no toda la tabla.</li>
</ol>
<p><b>Lo que hay que observar al ejecutarlo:</b> con 6 claves y 7 casillas, algunas casillas quedan vacías y otras tienen dos o tres claves encadenadas. Eso son <b>colisiones</b>, y son normales. Lo importante es que las cadenas sean <b>cortas</b>: si las 6 claves cayeran en la misma casilla, buscar costaría recorrer 6 elementos y la tabla se habría degradado a una lista enlazada.</p>
<p><b>La paradoja del cumpleaños</b> explica por qué las colisiones aparecen antes de lo que la intuición sugiere: con solo 23 personas la probabilidad de que dos compartan cumpleaños supera el 50%, aunque haya 365 días. Igual aquí: con pocas claves y muchas casillas ya hay colisiones. Por eso un buen diccionario no intenta evitarlas, sino manejarlas con eficiencia.</p>
<p><b>Lo que falta para una implementación de verdad:</b> redimensionar cuando el factor de carga supera 0,7 (rehasheando todo), eliminar claves, y una función hash mejor distribuida. Pero el esqueleto es exactamente este, y entenderlo explica por qué un diccionario es O(1): <b>el hash te lleva directamente a un grupo pequeño en lugar de recorrer todo.</b></p>` },
        { n: 4, titulo: 'Cuándo NO usar un diccionario',
          enunciado: 'Da tres situaciones donde un diccionario es la estructura equivocada y di qué usarías en su lugar, justificando cada caso.',
          pista: 'Piensa en el orden, en la búsqueda por valor y en los rangos.',
          solucion: `<p><b>1. Cuando necesitas los datos ordenados o consultar rangos.</b> «Dame todos los productos con precio entre 10 y 50» obliga a recorrer el diccionario entero (O(n)), porque el hash destruye cualquier relación de orden entre las claves. <b>Usa un árbol de búsqueda equilibrado</b> (el <code>TreeMap</code> de Java, el <code>map</code> de C++, o una lista ordenada con búsqueda binaria): la consulta por rango pasa a O(log n + k).</p>
<p><b>2. Cuando buscas por valor y no por clave.</b> «¿Qué código tiene el producto que cuesta 19.90?» recorre todo el diccionario. Si esa consulta es frecuente, <b>mantén un segundo diccionario invertido</b> (valor → clave) o usa una estructura que indexe ambos. Es exactamente lo que hace una base de datos cuando creas un índice sobre otra columna, y tiene el mismo costo: más memoria y más trabajo en cada escritura.</p>
<p><b>3. Cuando las claves son enteros pequeños y densos.</b> Para guardar algo indexado por mes (1-12) o por día del año (1-365), un <b>arreglo</b> es mejor en todo: más rápido (sin calcular hash ni resolver colisiones), menos memoria (sin punteros ni casillas vacías) y con mejor localidad de caché. Es el patrón «conteo por casillero» del módulo 4. Usar un diccionario ahí es pagar una maquinaria sofisticada para un problema que ya estaba resuelto.</p>
<p><b>Y un cuarto caso que vale mencionar:</b> cuando hay muy pocos elementos. Con 5 o 10 pares, un arreglo de pares con búsqueda lineal es más rápido que una tabla hash, porque el costo de calcular el hash supera al de comparar 5 elementos contiguos. Algunas bibliotecas lo aprovechan: empiezan con una lista y se convierten en tabla hash al crecer.</p>` },
        { n: 5, titulo: 'Detecta anagramas',
          enunciado: 'Dado un arreglo de palabras, agrúpalas por anagramas (palabras con las mismas letras: «roma», «amor», «mora»). (a) Resuélvelo comparando todas contra todas y di su costo. (b) Resuélvelo con un diccionario en O(n·k log k) y explica cuál es la clave. (c) Propón una clave alternativa que evite ordenar.',
          pista: 'Dos palabras son anagramas si al ordenar sus letras dan lo mismo. Eso puede ser una clave.',
          solucion: `<p><b>(a) Fuerza bruta:</b> comparar cada palabra con todas las demás, y cada comparación requiere ordenar o contar letras. Costo: <b>O(n² · k log k)</b>, donde k es la longitud media. Con 100 000 palabras es inviable.</p>
<p><b>(b) Con diccionario:</b> la clave es <b>la palabra con sus letras ordenadas</b>. Todos los anagramas producen exactamente la misma clave:</p>
${cod('python', `from collections import defaultdict

def agrupar_anagramas(palabras):
    grupos = defaultdict(list)
    for p in palabras:
        clave = "".join(sorted(p.lower()))   # "roma" -> "amor", "amor" -> "amor"
        grupos[clave].append(p)
    return list(grupos.values())

print(agrupar_anagramas(["roma", "amor", "mora", "casa", "saca", "perro"]))
# [['roma', 'amor', 'mora'], ['casa', 'saca'], ['perro']]`)}
<p>Costo: <b>O(n · k log k)</b> —ordenar cada palabra una sola vez— frente a O(n² · k log k). Un recorrido en lugar de n recorridos.</p>
<p><b>(c) Clave sin ordenar:</b> el <b>vector de conteo de letras</b>. Para cada palabra, cuenta cuántas veces aparece cada letra y usa esa tupla como clave:</p>
${cod('python', `def clave_conteo(p):
    conteo = [0] * 26
    for c in p.lower():
        if 'a' <= c <= 'z':
            conteo[ord(c) - ord('a')] += 1
    return tuple(conteo)        # tupla porque debe ser inmutable para ser clave`)}
<p>Costo por palabra: <b>O(k)</b> en lugar de O(k log k), así que el total es <b>O(n · k)</b>. Es asintóticamente mejor, y es el patrón del casillero del módulo 4 usado como <i>huella digital</i>.</p>
<p><b>Cuál conviene en la práctica:</b> para palabras cortas, ordenar suele ser más rápido pese a su peor costo asintótico, porque ordenar 6 caracteres es trivial mientras que construir una tupla de 26 posiciones tiene su costo fijo. Para textos largos o alfabetos pequeños, el conteo gana. Y para alfabetos grandes (Unicode completo), el vector de 26 no sirve y habría que usar un diccionario de conteos como clave, lo que complica las cosas. <b>Otra vez: «más eficiente» depende de los datos reales, y la forma de saberlo es medir.</b></p>` }
      ],
      quiz: [
        { p: 'Buscar por clave en un diccionario cuesta, en promedio…',
          ops: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
          ok: 2, exp: 'La función hash lleva directamente a la casilla correcta. El peor caso es O(n) si todas las claves colisionan, pero es raro con una función hash decente.' },
        { p: 'En Python no se puede usar una lista como clave de un diccionario porque…',
          ops: ['las listas son muy grandes', 'es mutable: si cambia, su hash cambia y el valor quedaría perdido',
            'no tienen orden', 'solo se admiten cadenas'],
          ok: 1, exp: 'Las claves deben ser inmutables. Por eso sirven cadenas, números y tuplas, pero no listas ni diccionarios.' },
        { p: 'Un algoritmo con dos bucles anidados que busca coincidencias entre datos a menudo se puede convertir con un diccionario en…',
          ops: ['O(n²) igual', 'O(n), a cambio de usar memoria extra', 'O(log n)', 'O(1)'],
          ok: 1, exp: 'En vez de buscar en el resto de los datos, se pregunta «¿ya lo vi?» a un diccionario en O(1). Es el intercambio clásico de memoria por tiempo.' }
      ]
    },

    {
      id: 'm6-4',
      titulo: 'Árboles y árboles binarios de búsqueda',
      resumen: 'Jerarquías, recorridos, el árbol binario de búsqueda y por qué el equilibrio lo es todo.',
      objetivos: [
        'Manejar la terminología de árboles y sus recorridos',
        'Implementar inserción y búsqueda en un árbol binario de búsqueda',
        'Explicar por qué un árbol desequilibrado degenera en una lista'
      ],
      lectura: `
<p>Un <strong>árbol</strong> organiza datos de forma jerárquica: cada nodo tiene un padre y cero o más hijos. Es la
estructura natural para todo lo que tiene jerarquía, y eso es muchísimo: el sistema de archivos, el DOM de una página
web, el organigrama de una empresa, las categorías de una tienda, el árbol sintáctico de un programa.</p>

${fig(`<svg viewBox="0 0 520 230" width="520" height="230" role="img" aria-label="Un árbol binario de búsqueda con sus términos">
<g color="var(--fg-soft)">
${[[260, 34, '50'], [160, 94, '30'], [360, 94, '70'], [110, 154, '20'], [210, 154, '40'], [310, 154, '60'], [410, 154, '80']].map(function (n) {
  return '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="21" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.7"/>' +
    '<text x="' + n[0] + '" y="' + (n[1] + 5) + '" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)">' + n[2] + '</text>';
}).join('')}
<g stroke="var(--fg-soft)" stroke-width="1.5" fill="none">
<path d="M245 48 L175 80"/><path d="M275 48 L345 80"/>
<path d="M146 109 L124 139"/><path d="M174 109 L196 139"/>
<path d="M346 109 L324 139"/><path d="M374 109 L396 139"/>
</g>
<text x="300" y="30" font-size="11" fill="var(--fg-soft)">raíz</text>
<text x="440" y="158" font-size="11" fill="var(--fg-soft)">hojas</text>
<text x="40" y="98" font-size="11" fill="var(--fg-soft)">nivel 1</text>
<text x="40" y="158" font-size="11" fill="var(--fg-soft)">nivel 2</text>
<text x="40" y="38" font-size="11" fill="var(--fg-soft)">nivel 0</text>
<text x="260" y="205" text-anchor="middle" font-size="11.5" fill="var(--fg)">Todo lo que está a la izquierda de un nodo es menor; a la derecha, mayor.</text>
<text x="260" y="222" text-anchor="middle" font-size="11.5" fill="var(--fg-soft)">altura = 2 · 7 nodos · buscar cualquiera cuesta a lo sumo 3 comparaciones</text>
</g></svg>`, 'Un árbol binario de búsqueda con 7 nodos y altura 2.')}

${tabla(['Término', 'Significado'], [
  ['<b>Raíz</b>', 'el único nodo sin padre'],
  ['<b>Hoja</b>', 'un nodo sin hijos'],
  ['<b>Altura</b>', 'la longitud del camino más largo de la raíz a una hoja'],
  ['<b>Nivel / profundidad</b>', 'distancia de un nodo a la raíz'],
  ['<b>Subárbol</b>', 'cualquier nodo con todos sus descendientes'],
  ['<b>Grado</b>', 'número de hijos de un nodo'],
  ['<b>Binario</b>', 'cada nodo tiene como máximo 2 hijos']
])}

<h2>El árbol binario de búsqueda (ABB)</h2>
<p>Un árbol binario con una regla: <strong>para cada nodo, todo lo que está en su subárbol izquierdo es menor, y todo lo
que está en el derecho es mayor</strong>. Esa invariante es lo que lo hace útil, porque convierte la búsqueda en una
serie de decisiones que descartan la mitad de los datos:</p>

${cod('pseudo', `Funcion encontrado <- buscar(nodo, x)
	Si nodo = nulo Entonces
		encontrado <- Falso
	Sino
		Si x = nodo.dato Entonces
			encontrado <- Verdadero
		Sino
			Si x < nodo.dato Entonces
				encontrado <- buscar(nodo.izq, x)     // descarta todo el lado derecho
			Sino
				encontrado <- buscar(nodo.der, x)     // descarta todo el lado izquierdo
			FinSi
		FinSi
	FinSi
FinFuncion`)}

<p>Insertar sigue el mismo camino hasta encontrar un hueco y lo ocupa. Y la operación más interesante, eliminar, tiene
tres casos: si el nodo es una hoja se borra; si tiene un hijo, el hijo ocupa su lugar; y si tiene dos hijos, se
reemplaza por su <strong>sucesor en orden</strong> (el menor del subárbol derecho), que es el único valor que mantiene
la invariante.</p>

<h2>Los recorridos</h2>
<p>Hay tres formas de visitar todos los nodos, y cada una sirve para algo distinto:</p>

${cod('pseudo', `// INORDEN (izquierda, nodo, derecha) -> devuelve los datos ORDENADOS
SubProceso inorden(nodo)
	Si nodo <> nulo Entonces
		inorden(nodo.izq)
		Escribir nodo.dato
		inorden(nodo.der)
	FinSi
FinSubProceso

// PREORDEN (nodo, izquierda, derecha) -> para COPIAR el árbol o serializarlo
// POSTORDEN (izquierda, derecha, nodo) -> para LIBERAR o evaluar expresiones`)}

${tabla(['Recorrido', 'Orden en el árbol del dibujo', 'Para qué sirve'], [
  ['<b>Inorden</b>', '20 30 40 50 60 70 80', 'obtener los datos <b>ordenados</b>'],
  ['<b>Preorden</b>', '50 30 20 40 70 60 80', 'copiar o guardar el árbol conservando su forma'],
  ['<b>Postorden</b>', '20 40 30 60 80 70 50', 'liberar memoria; evaluar un árbol de expresión'],
  ['<b>Por niveles</b>', '50 30 70 20 40 60 80', 'recorrido en anchura, con una <b>cola</b>']
], 'El inorden de un ABB siempre produce los datos ordenados: esa es la prueba de que la invariante se cumple.')}

<h2>El equilibrio lo es todo</h2>
<p>La promesa del ABB es buscar en <strong>O(log n)</strong>, porque cada comparación descarta la mitad. Pero eso solo
se cumple si el árbol está <strong>equilibrado</strong>. Si insertas datos ya ordenados (1, 2, 3, 4, 5…), cada nuevo
elemento va siempre a la derecha y el árbol degenera en una lista enlazada con altura <code>n</code>:</p>

${tabla(['Árbol con n = 1 000 000', 'Altura', 'Comparaciones para buscar'], [
  ['Equilibrado', '~20', '<b>20</b>'],
  ['Degenerado (datos ordenados)', '1 000 000', '<b>1 000 000</b>']
], 'El mismo algoritmo, 50 000 veces más lento. Y el caso que lo provoca —insertar datos ya ordenados— es de los más comunes.')}

${nota('La ironía del ABB ingenuo',
  '<p>El caso que destruye su rendimiento es precisamente el más probable en la vida real: cargar datos que ya vienen ' +
  'ordenados de una base de datos o de un archivo. Por eso <strong>nadie usa un ABB simple en producción</strong>: se ' +
  'usan variantes que se reequilibran solas.</p>', 'warn')}

<p>Los árboles autoequilibrados garantizan altura O(log n) reorganizándose en cada inserción:</p>
<ul>
  <li><strong>AVL:</strong> mantiene la diferencia de alturas entre subárboles en ±1. Muy equilibrado, ideal si buscas
  mucho más de lo que insertas.</li>
  <li><strong>Rojo-negro:</strong> equilibrio más relajado y reequilibrios más baratos. Es lo que usan el
  <code>TreeMap</code> de Java, el <code>map</code> de C++ y el planificador de procesos de Linux.</li>
  <li><strong>Árbol B / B+:</strong> nodos con muchas claves, pensados para disco. <strong>Todos</strong> los índices de
  todas las bases de datos relacionales del mundo son árboles B+. Su gracia es que un nodo ocupa un bloque de disco, así
  que la altura es muy pequeña: con 3 o 4 niveles se indexan millones de registros, y cada nivel es un acceso a disco.</li>
</ul>

<h2>Árbol o tabla hash</h2>
${tabla(['', 'Tabla hash', 'Árbol equilibrado'], [
  ['Buscar por clave exacta', '<b>O(1)</b>', 'O(log n)'],
  ['Mantener orden', 'no', '<b>sí</b>'],
  ['Consultar un rango', 'O(n)', '<b>O(log n + k)</b>'],
  ['Mínimo / máximo', 'O(n)', '<b>O(log n)</b>'],
  ['Peor caso garantizado', 'O(n)', '<b>O(log n)</b>'],
  ['Memoria', 'casillas vacías', 'dos punteros por nodo']
], 'Si solo buscas por clave exacta, la tabla hash gana. Si necesitas orden, rangos o garantías en el peor caso, el árbol.')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Construye el árbol',
          enunciado: 'Dibuja el ABB que resulta de insertar en este orden: 50, 30, 70, 20, 40, 60, 80, 35. Luego escribe sus tres recorridos y su altura.',
          pista: 'Cada valor baja comparándose: menor a la izquierda, mayor a la derecha, hasta encontrar un hueco.',
          solucion: `<pre>            50
          /    \\
        30      70
       /  \\    /  \\
     20   40  60   80
         /
       35</pre>
<p><b>Cómo llegó el 35:</b> 35 &lt; 50 → izquierda; 35 &gt; 30 → derecha; 35 &lt; 40 → izquierda, y ahí había hueco.</p>
<p><b>Inorden:</b> 20, 30, 35, 40, 50, 60, 70, 80 ← <b>ordenado</b>, como debe ser.</p>
<p><b>Preorden:</b> 50, 30, 20, 40, 35, 70, 60, 80 ← empieza por la raíz; sirve para reconstruir el árbol idéntico.</p>
<p><b>Postorden:</b> 20, 35, 40, 30, 60, 80, 70, 50 ← la raíz al final; sirve para liberar memoria sin dejar nodos huérfanos.</p>
<p><b>Altura: 3</b> (el camino 50 → 30 → 40 → 35). El árbol está razonablemente equilibrado: con 8 nodos, la altura mínima posible es 3.</p>` },
        { n: 2, titulo: 'El árbol degenerado',
          enunciado: 'Dibuja el ABB que resulta de insertar 10, 20, 30, 40, 50 en ese orden. ¿Cuál es su altura? ¿Cuántas comparaciones cuesta buscar el 50? Compáralo con insertar los mismos valores en el orden 30, 20, 40, 10, 50.',
          pista: 'Los datos ordenados son el peor caso del ABB.',
          solucion: `<p><b>Insertando 10, 20, 30, 40, 50</b> (orden creciente):</p>
<pre>10
  \\
   20
     \\
      30
        \\
         40
           \\
            50</pre>
<p><b>Altura: 4.</b> Buscar el 50 cuesta <b>5 comparaciones</b>. El árbol es una lista enlazada disfrazada: toda la ventaja del ABB desapareció.</p>
<p><b>Insertando 30, 20, 40, 10, 50:</b></p>
<pre>      30
     /  \\
   20    40
  /        \\
10          50</pre>
<p><b>Altura: 2.</b> Buscar el 50 cuesta <b>3 comparaciones</b>.</p>
<p><b>Mismos datos, mismo algoritmo, distinto orden de inserción, distinto rendimiento.</b> Con 1 000 000 de elementos la diferencia es de 20 comparaciones contra un millón.</p>
<p><b>La solución clásica y por qué no basta:</b> insertar en orden aleatorio da una altura esperada de unos 1,39·log₂(n), que es aceptable. Pero no puedes elegir el orden en que llegan los datos de un usuario o de un archivo. Por eso existen los árboles autoequilibrados (AVL, rojo-negro): hacen rotaciones al insertar para garantizar O(log n) <b>sin importar el orden de llegada</b>. La garantía, y no el promedio, es lo que se paga.</p>` },
        { n: 3, titulo: 'Recorridos recursivos',
          enunciado: 'Implementa los tres recorridos de un árbol binario usando arreglos paralelos (dato, izq, der) y verifica que el inorden devuelve los datos ordenados.',
          pista: 'Tres funciones recursivas que solo cambian el orden de las tres líneas.',
          lab: 'SubProceso inorden(n)\n\tSi n <> 0 Entonces\n\t\tinorden(izq[n])\n\t\tEscribir Sin Saltar dato[n], " "\n\t\tinorden(der[n])\n\tFinSi\nFinSubProceso\n\nSubProceso preorden(n)\n\tSi n <> 0 Entonces\n\t\tEscribir Sin Saltar dato[n], " "\n\t\tpreorden(izq[n])\n\t\tpreorden(der[n])\n\tFinSi\nFinSubProceso\n\nSubProceso postorden(n)\n\tSi n <> 0 Entonces\n\t\tpostorden(izq[n])\n\t\tpostorden(der[n])\n\t\tEscribir Sin Saltar dato[n], " "\n\tFinSi\nFinSubProceso\n\nAlgoritmo RecorrerArbol\n\tDimension dato[10]\n\tDimension izq[10]\n\tDimension der[10]\n\n\t//        50(1)\n\t//      /      \\\n\t//   30(2)     70(3)\n\t//   /   \\     /   \\\n\t// 20(4) 40(5) 60(6) 80(7)\n\tdato[1] <- 50\n\tizq[1] <- 2\n\tder[1] <- 3\n\tdato[2] <- 30\n\tizq[2] <- 4\n\tder[2] <- 5\n\tdato[3] <- 70\n\tizq[3] <- 6\n\tder[3] <- 7\n\tdato[4] <- 20\n\tizq[4] <- 0\n\tder[4] <- 0\n\tdato[5] <- 40\n\tizq[5] <- 0\n\tder[5] <- 0\n\tdato[6] <- 60\n\tizq[6] <- 0\n\tder[6] <- 0\n\tdato[7] <- 80\n\tizq[7] <- 0\n\tder[7] <- 0\n\n\tEscribir Sin Saltar "Inorden   (ordenado): "\n\tinorden(1)\n\tEscribir ""\n\tEscribir Sin Saltar "Preorden  (raíz primero): "\n\tpreorden(1)\n\tEscribir ""\n\tEscribir Sin Saltar "Postorden (raíz al final): "\n\tpostorden(1)\n\tEscribir ""\nFinAlgoritmo',
          solucion: `<p>Las tres funciones son <b>idénticas salvo el orden de tres líneas</b>:</p>
${cod('pseudo', `inorden:    recorrer izq | ESCRIBIR | recorrer der
preorden:   ESCRIBIR | recorrer izq | recorrer der
postorden:  recorrer izq | recorrer der | ESCRIBIR`)}
<p>Esa simetría es una de las cosas más elegantes de las estructuras recursivas, y explica los nombres: «pre», «in» y «post» indican <b>cuándo se visita el nodo</b> respecto de sus hijos.</p>
<p><b>La recursión aquí no es un truco, es la definición:</b> un árbol <i>es</i> un nodo con dos árboles colgando. El caso base (<code>n = 0</code>, árbol vacío) y el caso recursivo (procesar los subárboles) salen directamente de esa definición. Escribir estos recorridos de forma iterativa es posible pero requiere una pila explícita y es mucho menos claro: es el ejemplo canónico de problema donde la recursión gana.</p>
<p><b>La verificación clave:</b> si el inorden no sale ordenado, el árbol <b>no es</b> un ABB válido. Es la forma estándar de comprobar la invariante después de insertar o eliminar, y la primera prueba que se escribe al implementar uno.</p>` },
        { n: 4, titulo: 'Elimina de un ABB',
          enunciado: 'Partiendo del árbol del ejercicio 1 (50, 30, 70, 20, 40, 60, 80, 35), dibuja cómo queda tras eliminar: (a) el 20 (hoja); (b) el 70 (dos hijos); (c) el 40 (un hijo). Explica la regla de cada caso.',
          pista: 'Hoja: se borra. Un hijo: lo reemplaza. Dos hijos: lo reemplaza su sucesor en orden.',
          solucion: `<p><b>(a) Eliminar el 20 (hoja):</b> se borra sin más. Ninguna invariante se rompe.</p>
<pre>        50
      /    \\
    30      70
      \\    /  \\
      40  60   80
     /
   35</pre>
<p><b>(b) Eliminar el 70 (dos hijos):</b> no se puede borrar sin dejar huérfanos al 60 y al 80. Se reemplaza por su <b>sucesor en orden</b>, que es el <b>menor del subárbol derecho</b>: el 80. (También valdría su predecesor, el mayor del subárbol izquierdo: el 60.)</p>
<pre>        50
      /    \\
    30      80
      \\    /
      40  60
     /
   35</pre>
<p><b>(c) Eliminar el 40 (un hijo):</b> su único hijo, el 35, ocupa su lugar directamente.</p>
<pre>        50
      /    \\
    30      80
      \\    /
      35  60</pre>
<p><b>Por qué el sucesor en orden es el único reemplazo válido:</b> debe ser un valor <b>mayor que todo el subárbol izquierdo</b> y <b>menor que todo el derecho</b>. El menor del subárbol derecho cumple ambas condiciones por construcción, y además tiene como mucho un hijo (no puede tener hijo izquierdo, porque entonces no sería el menor), así que eliminarlo de su posición original es uno de los dos casos fáciles.</p>
<p>La eliminación es la operación más delicada de un ABB, y en los árboles autoequilibrados es aún más compleja porque después hay que rotar para restaurar el equilibrio. Es la razón por la que casi nadie implementa estos árboles a mano: se usa la biblioteca del lenguaje, que tiene décadas de pruebas encima.</p>` },
        { n: 5, titulo: 'Árbol o tabla hash',
          enunciado: 'Para cada caso elige entre tabla hash y árbol equilibrado, justificando: (a) una agenda telefónica donde solo buscas por nombre exacto; (b) un índice de una base de datos para consultas «entre dos fechas»; (c) un autocompletado que sugiere palabras que empiezan por un prefijo; (d) un contador de palabras de un texto; (e) un sistema que debe garantizar que ninguna consulta tarde más de X milisegundos.',
          pista: 'La pregunta clave es si necesitas orden y si necesitas garantías en el peor caso.',
          solucion: `<p><b>(a) Tabla hash.</b> Solo búsqueda exacta por clave: O(1) imbatible. Un árbol daría O(log n) sin ninguna ventaja a cambio.</p>
<p><b>(b) Árbol (B+ en la práctica).</b> «Entre dos fechas» es una consulta de rango: el árbol localiza el extremo inferior en O(log n) y luego recorre las hojas en orden. Una tabla hash tendría que examinar <b>todas</b> las claves, porque el hash destruye el orden. Por esto los índices de todas las bases de datos relacionales son árboles B+, no tablas hash.</p>
<p><b>(c) Árbol, y en concreto un <i>trie</i></b> (árbol de prefijos), que es la estructura diseñada exactamente para esto: cada camino desde la raíz deletrea un prefijo, así que encontrar todas las palabras que empiezan por «pro» es bajar tres niveles y recorrer ese subárbol. Un ABB ordenado también serviría (las palabras con un prefijo común son contiguas en orden alfabético), pero el trie es más directo y permite además corrección ortográfica por distancia de edición.</p>
<p><b>(d) Tabla hash.</b> Solo necesitas «¿ya vi esta palabra?» y sumar uno: búsqueda exacta, O(1). Es el patrón del tema anterior.</p>
<p><b>(e) Árbol equilibrado.</b> Y aquí está la razón menos conocida para elegir árbol: la tabla hash tiene un promedio excelente pero un <b>peor caso</b> de O(n), y además sus redimensionamientos producen pausas impredecibles. Un árbol AVL o rojo-negro <b>garantiza</b> O(log n) en cada operación individual, sin excepciones. En sistemas de tiempo real, trading de alta frecuencia o control industrial, <b>la previsibilidad vale más que la velocidad media</b>.</p>
<p>Esa última idea es importante y se aplica más allá de las estructuras de datos: un sistema que responde en 1 ms el 99% de las veces y en 2 segundos el 1% restante puede ser inaceptable, mientras que uno que siempre responde en 5 ms es perfecto. El promedio miente.</p>` }
      ],
      quiz: [
        { p: 'El recorrido inorden de un árbol binario de búsqueda produce…',
          ops: ['los datos en orden de inserción', 'los datos ordenados de menor a mayor',
            'los datos por niveles', 'la raíz primero'],
          ok: 1, exp: 'Izquierda (menores), nodo, derecha (mayores). Es la forma estándar de verificar que la invariante del ABB se cumple.' },
        { p: 'Insertar 1, 2, 3, 4, 5 en ese orden en un ABB simple produce…',
          ops: ['un árbol equilibrado de altura 2', 'un árbol degenerado de altura 4, equivalente a una lista',
            'un error', 'un árbol perfecto'],
          ok: 1, exp: 'Cada valor es mayor que el anterior, así que siempre va a la derecha. El árbol se convierte en una lista enlazada y la búsqueda pasa de O(log n) a O(n).' },
        { p: 'Los índices de las bases de datos relacionales usan árboles B+ en lugar de tablas hash porque…',
          ops: ['son más fáciles de programar', 'permiten consultas por rango y mantienen el orden',
            'ocupan menos memoria', 'las tablas hash no existían'],
          ok: 1, exp: 'Un hash destruye el orden, así que una consulta «entre dos valores» obligaría a recorrerlo todo. El árbol localiza el extremo y recorre en orden.' }
      ]
    },

    {
      id: 'm6-5',
      titulo: 'Grafos: la estructura más general',
      resumen: 'Nodos y conexiones, formas de representarlos, y los dos recorridos que resuelven media informática.',
      objetivos: [
        'Representar un grafo con matriz de adyacencia o listas de adyacencia',
        'Implementar recorrido en anchura y en profundidad',
        'Reconocer problemas que son, en el fondo, problemas de grafos'
      ],
      lectura: `
<p>Un <strong>grafo</strong> es un conjunto de <strong>nodos</strong> (o vértices) conectados por
<strong>aristas</strong>. Es la estructura más general de todas: un árbol es un grafo sin ciclos, una lista es un grafo
donde cada nodo tiene una conexión. Y modela una cantidad asombrosa de cosas:</p>

${tabla(['Dominio', 'Nodos', 'Aristas'], [
  ['Red social', 'personas', 'amistades'],
  ['Mapa de calles', 'intersecciones', 'calles (con longitud y sentido)'],
  ['Internet', 'routers', 'enlaces'],
  ['Web', 'páginas', 'enlaces (dirigidos)'],
  ['Dependencias de un proyecto', 'tareas o módulos', '«A debe terminar antes que B»'],
  ['Un laberinto', 'casillas', 'pasos posibles'],
  ['Vuelos', 'aeropuertos', 'rutas con precio y duración'],
  ['Un programa', 'bloques de código', 'saltos posibles (módulo 9)']
], 'Si un problema habla de «conexiones», «rutas», «redes» o «dependencias», es un problema de grafos.')}

<h2>Tipos</h2>
<ul>
  <li><strong>No dirigido:</strong> las aristas van en ambos sentidos (una amistad).</li>
  <li><strong>Dirigido:</strong> tienen sentido (un «sigue a» en una red social, una calle de un solo sentido).</li>
  <li><strong>Ponderado:</strong> cada arista tiene un peso (distancia, costo, tiempo).</li>
  <li><strong>Cíclico / acíclico:</strong> si se puede volver al punto de partida. Un grafo dirigido acíclico (DAG) es
  la estructura de las dependencias y de los sistemas de control de versiones.</li>
</ul>

<h2>Dos formas de representarlo</h2>

${cod('pseudo', `// MATRIZ DE ADYACENCIA: m[i,j] = 1 si hay arista de i a j
//        A  B  C  D
//    A [ 0  1  1  0 ]
//    B [ 1  0  0  1 ]
//    C [ 1  0  0  1 ]
//    D [ 0  1  1  0 ]

// LISTAS DE ADYACENCIA: para cada nodo, la lista de sus vecinos
//    A -> B, C
//    B -> A, D
//    C -> A, D
//    D -> B, C`)}

${tabla(['', 'Matriz de adyacencia', 'Listas de adyacencia'], [
  ['Memoria', 'O(V²) siempre', 'O(V + E)'],
  ['¿Hay arista i-j?', '<b>O(1)</b>', 'O(grado)'],
  ['Recorrer los vecinos de i', 'O(V)', '<b>O(grado)</b>'],
  ['Mejor para', 'grafos <b>densos</b> (muchas aristas)', 'grafos <b>dispersos</b> (pocas aristas)']
], 'V = nodos, E = aristas. Casi todos los grafos reales son dispersos, así que las listas de adyacencia son la opción habitual.')}

<p>Un ejemplo que lo deja claro: una red social con 1 000 millones de usuarios donde cada uno tiene unos 300 amigos.
La matriz necesitaría 10¹⁸ casillas, lo que es físicamente imposible. Las listas necesitan 3×10¹¹ entradas, que cabe en
un centro de datos. Elegir la representación no es un detalle: decide si el problema es resoluble.</p>

<h2>Los dos recorridos</h2>
<p>Casi todo lo que se hace con un grafo empieza por recorrerlo, y hay dos formas. La diferencia entre ellas es
<strong>una sola estructura de datos</strong>: pila o cola.</p>

<h3>Recorrido en anchura (BFS): explora por niveles</h3>
${cod('pseudo', `SubProceso bfs(inicio)
	Dimension visitado[V]
	cola <- cola vacía
	encolar(inicio)
	visitado[inicio] <- Verdadero
	Mientras la cola no esté vacía Hacer
		actual <- desencolar()
		Escribir actual
		Para cada vecino de actual Hacer
			Si NO visitado[vecino] Entonces
				visitado[vecino] <- Verdadero     // marcar al ENCOLAR
				encolar(vecino)
			FinSi
		FinPara
	FinMientras
FinSubProceso`)}

<p>BFS visita primero todos los nodos a distancia 1, luego los de distancia 2, y así. De ahí su propiedad más valiosa:
<strong>en un grafo sin pesos, BFS encuentra el camino más corto</strong>, porque llega a cada nodo por el camino con
menos aristas. Es lo que usa «grados de separación» en una red social.</p>

<h3>Recorrido en profundidad (DFS): se adentra todo lo que puede</h3>
${cod('pseudo', `SubProceso dfs(nodo)
	visitado[nodo] <- Verdadero
	Escribir nodo
	Para cada vecino de nodo Hacer
		Si NO visitado[vecino] Entonces
			dfs(vecino)                           // recursión = pila implícita
		FinSi
	FinPara
FinSubProceso`)}

<p>DFS sigue un camino hasta el final, retrocede y prueba otro. Sirve para detectar ciclos, encontrar componentes
conexas, ordenar dependencias topológicamente y resolver laberintos y rompecabezas con retroceso
(<em>backtracking</em>).</p>

${nota('La diferencia es una sola línea',
  '<p>BFS usa una <strong>cola</strong>, DFS usa una <strong>pila</strong> (explícita, o la del propio programa si lo ' +
  'escribes recursivo). Por lo demás el algoritmo es el mismo. Que un cambio tan pequeño produzca comportamientos tan ' +
  'distintos es una de las cosas más bonitas de la materia.</p>', 'key')}

${tabla(['', 'BFS (anchura)', 'DFS (profundidad)'], [
  ['Estructura', 'cola', 'pila / recursión'],
  ['Encuentra', 'el camino con menos aristas', 'un camino cualquiera'],
  ['Memoria', 'puede ser enorme (todo un nivel)', 'proporcional a la profundidad'],
  ['Úsalo para', 'camino más corto, grados de separación, difusión', 'ciclos, componentes, orden topológico, backtracking']
])}

<h2>El marcado: el error que todos cometen</h2>
<p>Olvidar el arreglo <code>visitado</code> hace que el algoritmo entre en un bucle infinito en cuanto el grafo tenga un
ciclo. Y hay una sutileza: en BFS hay que marcar <strong>al encolar</strong>, no al desencolar. Si marcas al desencolar,
un nodo con varios vecinos puede entrar varias veces en la cola antes de ser procesado, y el algoritmo degenera
gravemente.</p>

<h2>Algoritmos famosos sobre grafos</h2>
${tabla(['Algoritmo', 'Qué resuelve', 'Dónde lo ves'], [
  ['<b>Dijkstra</b>', 'camino más corto con pesos positivos', 'GPS, enrutamiento de red'],
  ['<b>A*</b>', 'Dijkstra con una heurística que lo guía', 'videojuegos, robótica'],
  ['<b>Orden topológico</b>', 'ordenar tareas respetando dependencias', 'compiladores, gestores de paquetes, hojas de cálculo'],
  ['<b>Kruskal / Prim</b>', 'árbol de expansión mínima', 'tender una red con el mínimo cable'],
  ['<b>PageRank</b>', 'importancia de un nodo por sus enlaces', 'el algoritmo original de Google'],
  ['<b>Flujo máximo</b>', 'cuánto puede circular por una red', 'logística, asignación de recursos']
], 'Todos parten de un recorrido. BFS y DFS son los cimientos.')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Modela con un grafo',
          enunciado: 'Para cada situación di qué son los nodos, qué son las aristas, si el grafo es dirigido y si es ponderado: (a) las amistades de una red social; (b) las rutas de buses de una ciudad; (c) las dependencias entre tareas de un proyecto; (d) las páginas de un sitio web y sus enlaces; (e) los prerrequisitos de los cursos de una carrera.',
          pista: 'Dirigido si la relación no es simétrica; ponderado si las conexiones tienen un costo.',
          solucion: `<p><b>(a)</b> Nodos: personas. Aristas: amistades. <b>No dirigido</b> (si somos amigos, lo somos los dos) y <b>no ponderado</b>. En X o Instagram sería <b>dirigido</b>, porque «seguir» no es recíproco: ese cambio de modelo altera todos los algoritmos que se apliquen encima.</p>
<p><b>(b)</b> Nodos: paraderos. Aristas: tramos. <b>Dirigido</b> (hay calles de un solo sentido y rutas de ida distintas de las de vuelta) y <b>ponderado</b> por tiempo, distancia o precio. Qué peso elijas cambia la respuesta: la ruta más corta en kilómetros rara vez es la más rápida.</p>
<p><b>(c)</b> Nodos: tareas. Aristas: «A debe terminar antes que B». <b>Dirigido</b> y <b>acíclico</b> (un ciclo significaría una dependencia circular imposible de satisfacer, y detectarlo es justamente para lo que sirve el orden topológico). Puede ponderarse con la duración, y entonces el camino más largo da la <b>ruta crítica</b> del proyecto.</p>
<p><b>(d)</b> Nodos: páginas. Aristas: enlaces. <b>Dirigido</b> (enlazar no es ser enlazado). Sobre este grafo exacto funciona PageRank.</p>
<p><b>(e)</b> Nodos: cursos. Aristas: prerrequisitos. <b>Dirigido y acíclico.</b> El orden topológico da un orden válido para llevarlos, y el camino más largo indica el mínimo de ciclos para terminar la carrera.</p>` },
        { n: 2, titulo: 'Recorre a mano',
          enunciado: 'Dado este grafo no dirigido: A-B, A-C, B-D, C-D, C-E, D-F, E-F. Escribe el recorrido BFS y el DFS empezando en A, visitando los vecinos en orden alfabético. Indica el camino más corto de A a F y cuál de los dos recorridos lo encuentra.',
          pista: 'BFS con cola, DFS con pila. Lleva la lista de visitados.',
          solucion: `<p><b>BFS desde A</b> (cola):</p>
${tabla(['Paso', 'Desencolo', 'Encolo', 'Cola después'], [
  ['1', '—', 'A', 'A'], ['2', 'A', 'B, C', 'B, C'], ['3', 'B', 'D', 'C, D'],
  ['4', 'C', 'E', 'D, E'], ['5', 'D', 'F', 'E, F'], ['6', 'E', '—', 'F'], ['7', 'F', '—', '(vacía)']
])}
<p>Orden BFS: <b>A, B, C, D, E, F</b> — por niveles: {A}, {B, C}, {D, E}, {F}.</p>
<p><b>DFS desde A</b> (recursivo): A → B → D → C → E → F.</p>
<p>Detalle: desde D los vecinos son B (visitado), C y F; en orden alfabético va a C, y desde C a E, y desde E a F. Orden DFS: <b>A, B, D, C, E, F</b>.</p>
<p><b>Camino más corto de A a F:</b> A-C-D-F o A-C-E-F, ambos de <b>3 aristas</b>. <b>BFS lo encuentra</b>: al explorar por niveles, la primera vez que alcanza F es necesariamente por el camino con menos aristas. DFS encontró F por A-B-D-C-E-F, que son 5 aristas: un camino válido pero no el más corto.</p>
<p><b>La moraleja:</b> si necesitas el camino más corto en un grafo sin pesos, usa BFS. DFS llega, pero no da ninguna garantía sobre la longitud.</p>` },
        { n: 3, titulo: 'Implementa BFS',
          enunciado: 'Implementa BFS en pseudocódigo con una matriz de adyacencia de 6 nodos, mostrando el orden de visita y la distancia desde el origen a cada nodo.',
          pista: 'Usa una cola circular y un arreglo de distancias inicializado en −1 (no alcanzado).',
          lab: 'Algoritmo BFS\n\tDefinir i, j, n, frente, fin, actual Como Entero\n\tn <- 6\n\tDimension ady[6,6]\n\tDimension visitado[6]\n\tDimension distancia[6]\n\tDimension cola[6]\n\tDimension nombre[6]\n\tnombre[1] <- "A"\n\tnombre[2] <- "B"\n\tnombre[3] <- "C"\n\tnombre[4] <- "D"\n\tnombre[5] <- "E"\n\tnombre[6] <- "F"\n\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tPara j <- 1 Hasta n Con Paso 1 Hacer\n\t\t\tady[i,j] <- 0\n\t\tFinPara\n\t\tvisitado[i] <- 0\n\t\tdistancia[i] <- -1\n\tFinPara\n\n\t// aristas: A-B A-C B-D C-D C-E D-F E-F\n\tady[1,2] <- 1\n\tady[2,1] <- 1\n\tady[1,3] <- 1\n\tady[3,1] <- 1\n\tady[2,4] <- 1\n\tady[4,2] <- 1\n\tady[3,4] <- 1\n\tady[4,3] <- 1\n\tady[3,5] <- 1\n\tady[5,3] <- 1\n\tady[4,6] <- 1\n\tady[6,4] <- 1\n\tady[5,6] <- 1\n\tady[6,5] <- 1\n\n\tfrente <- 1\n\tfin <- 1\n\tcola[1] <- 1\n\tvisitado[1] <- 1\n\tdistancia[1] <- 0\n\n\tEscribir "Orden de visita (BFS desde A):"\n\tMientras frente <= fin Hacer\n\t\tactual <- cola[frente]\n\t\tfrente <- frente + 1\n\t\tEscribir Sin Saltar nombre[actual], " "\n\t\tPara j <- 1 Hasta n Con Paso 1 Hacer\n\t\t\tSi ady[actual, j] = 1 Y visitado[j] = 0 Entonces\n\t\t\t\tvisitado[j] <- 1\n\t\t\t\tdistancia[j] <- distancia[actual] + 1\n\t\t\t\tfin <- fin + 1\n\t\t\t\tcola[fin] <- j\n\t\t\tFinSi\n\t\tFinPara\n\tFinMientras\n\tEscribir ""\n\tEscribir ""\n\tEscribir "Distancias desde A:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir "  ", nombre[i], ": ", distancia[i], " aristas"\n\tFinPara\nFinAlgoritmo',
          solucion: `<p>El resultado: orden <b>A B C D E F</b> y distancias A=0, B=1, C=1, D=2, E=2, F=3.</p>
<p><b>Las tres decisiones que hacen correcto el algoritmo:</b></p>
<ul>
<li><b>Marcar al encolar, no al desencolar.</b> Si se marcara al desencolar, D entraría en la cola dos veces (como vecino de B y como vecino de C) y el algoritmo haría trabajo repetido; en grafos densos la cola puede crecer exponencialmente.</li>
<li><b><code>distancia[j] = distancia[actual] + 1</code></b> obtiene gratis el camino más corto: cada nodo recibe su distancia la <b>primera</b> vez que se descubre, y por la forma en que BFS explora, esa primera vez es siempre por el camino más corto.</li>
<li><b>Inicializar distancias en −1</b> distingue «no alcanzado» de «distancia 0». Al terminar, los nodos que siguen en −1 no son alcanzables desde el origen, lo que identifica las <b>componentes conexas</b> del grafo.</li>
</ul>
<p><b>Para reconstruir el camino</b>, no solo su longitud, basta guardar un arreglo <code>padre[]</code> con el nodo desde el que se descubrió cada uno, y luego remontar desde el destino hasta el origen. Es una línea más y convierte «está a 3 pasos» en «ve por A, C, D, F».</p>` },
        { n: 4, titulo: 'Detecta un ciclo',
          enunciado: 'Explica cómo detectar si un grafo <b>no dirigido</b> tiene un ciclo usando DFS, y por qué el método no sirve tal cual para grafos dirigidos. Da un ejemplo de por qué detectar ciclos importa.',
          pista: 'En un grafo no dirigido, encontrar un nodo ya visitado que no sea el padre indica un ciclo.',
          solucion: `<p><b>En un grafo no dirigido:</b> durante el DFS, si llegas a un vecino <b>ya visitado</b> que <b>no es el nodo desde el que viniste</b>, has encontrado un camino alternativo hacia él, es decir, un ciclo.</p>
${cod('pseudo', `Funcion hayCiclo <- dfs(nodo, padre)
	visitado[nodo] <- Verdadero
	hayCiclo <- Falso
	Para cada vecino de nodo Hacer
		Si NO visitado[vecino] Entonces
			Si dfs(vecino, nodo) Entonces  hayCiclo <- Verdadero  FinSi
		Sino
			Si vecino <> padre Entonces    hayCiclo <- Verdadero  FinSi
		FinSi
	FinPara
FinFuncion`)}
<p>La condición <code>vecino &lt;&gt; padre</code> es imprescindible: en un grafo no dirigido, la arista A-B se ve desde B como una arista hacia A, que ya está visitado. Sin esa comprobación, <b>toda</b> arista parecería un ciclo.</p>
<p><b>Por qué no sirve para grafos dirigidos:</b> en un dirigido, encontrar un nodo ya visitado <b>no</b> implica un ciclo. En A→B, A→C, B→C, al llegar a C desde B ya estaba visitado, y sin embargo no hay ningún ciclo: es simplemente un camino alternativo. Lo que importa en un dirigido es si el nodo está <b>en la pila de recursión actual</b>, es decir, si es un ancestro del nodo donde estás. Se resuelve con tres estados por nodo:</p>
<ul>
<li><b>blanco:</b> sin visitar.</li>
<li><b>gris:</b> en proceso, está en la pila de recursión actual.</li>
<li><b>negro:</b> terminado, ya se exploró por completo.</li>
</ul>
<p>Encontrar un vecino <b>gris</b> significa haber vuelto a un ancestro: eso sí es un ciclo.</p>
<p><b>Por qué importa detectarlos:</b></p>
<ul>
<li><b>Dependencias circulares:</b> si la tarea A espera a B y B espera a A, el proyecto nunca termina. Los gestores de paquetes (npm, pip, Maven) detectan ciclos para rechazar configuraciones imposibles.</li>
<li><b>Hojas de cálculo:</b> si A1 = B1 + 1 y B1 = A1 + 1, el recálculo sería infinito. El mensaje «referencia circular» de Excel viene de esta detección exacta.</li>
<li><b>Interbloqueos</b> (<i>deadlocks</i>): si el proceso P espera un recurso que tiene Q, y Q espera uno que tiene P, ambos quedan congelados. Los sistemas operativos y las bases de datos detectan el ciclo en el grafo de espera y abortan una de las transacciones.</li>
<li><b>Compiladores:</b> detectar ciclos en las inclusiones de archivos y en la herencia de clases.</li>
</ul>` },
        { n: 5, titulo: 'Resuelve un laberinto',
          enunciado: 'Un laberinto es una matriz donde 0 es paso libre y 1 es pared. Explica cómo modelarlo como grafo y escribe el algoritmo que encuentra el camino más corto de la entrada a la salida. Indica qué recorrido usarías y por qué, y cómo reconstruir el camino.',
          pista: 'Cada casilla libre es un nodo; sus vecinos son las casillas libres adyacentes. El camino más corto pide BFS.',
          solucion: `<p><b>Modelado:</b> cada casilla libre <code>(f, c)</code> es un nodo. Sus aristas van a las casillas libres adyacentes: arriba, abajo, izquierda y derecha (y las diagonales si el laberinto las permite). No hace falta construir el grafo explícitamente: <b>las aristas se calculan sobre la marcha</b> a partir de las coordenadas, lo que ahorra toda la memoria de la estructura.</p>
${cod('pseudo', `Algoritmo CaminoMasCorto
	// dirección: arriba, abajo, izquierda, derecha
	df <- [-1, 1, 0, 0]
	dc <- [0, 0, -1, 1]

	Dimension dist[F, C]
	Dimension padreF[F, C]
	Dimension padreC[F, C]
	// inicializar dist en -1 (no alcanzado)

	encolar(entradaF, entradaC)
	dist[entradaF, entradaC] <- 0

	Mientras la cola no esté vacía Hacer
		(f, c) <- desencolar()
		Si (f, c) = salida Entonces  terminar  FinSi
		Para d <- 1 Hasta 4 Con Paso 1 Hacer
			nf <- f + df[d]
			nc <- c + dc[d]
			Si nf >= 1 Y nf <= F Y nc >= 1 Y nc <= C Entonces     // dentro del mapa
				Si lab[nf, nc] = 0 Y dist[nf, nc] = -1 Entonces   // libre y no visitada
					dist[nf, nc] <- dist[f, c] + 1
					padreF[nf, nc] <- f                            // de dónde vine
					padreC[nf, nc] <- c
					encolar(nf, nc)
				FinSi
			FinSi
		FinPara
	FinMientras`)}
<p><b>Por qué BFS y no DFS:</b> se pide el camino <b>más corto</b>, y BFS lo garantiza porque explora por niveles: la primera vez que alcanza la salida es por el camino con menos pasos. DFS encontraría <i>una</i> salida, probablemente dando un rodeo enorme, y además en un laberinto grande puede desbordar la pila por la profundidad de la recursión.</p>
<p><b>Reconstruir el camino:</b> los arreglos <code>padreF/padreC</code> guardan desde qué casilla se descubrió cada una. Partiendo de la salida y saltando de padre en padre se llega a la entrada; el camino resultante está invertido, así que se le da la vuelta (patrón del módulo 3) o se recorre al revés al mostrarlo.</p>
<p><b>Los dos trucos que vale la pena quedarse:</b></p>
<ul>
<li><b>Los arreglos de desplazamiento <code>df</code> y <code>dc</code></b> evitan escribir cuatro bloques casi idénticos. Pasar de 4 a 8 direcciones es añadir cuatro números, no duplicar código. Este patrón aparece en todo algoritmo sobre cuadrículas.</li>
<li><b>El arreglo de distancias hace de «visitado»</b>: un valor distinto de −1 significa ya descubierto. Dos usos con una sola estructura.</li>
</ul>
<p><b>Si el laberinto tuviera costos distintos</b> (barro que cuesta 3, camino que cuesta 1), BFS deja de servir y hace falta <b>Dijkstra</b>, que es el mismo algoritmo cambiando la cola por una cola de prioridad. Y si además sabes dónde está la salida, <b>A*</b> usa esa información para explorar primero hacia allá y llega mucho antes. Los tres son el mismo esqueleto con una estructura de datos distinta: esa es, en una frase, la lección de todo el módulo.</p>` }
      ],
      quiz: [
        { p: 'La diferencia esencial entre BFS y DFS es…',
          ops: ['uno es recursivo y el otro no', 'BFS usa una cola y DFS una pila',
            'BFS es más rápido', 'DFS no necesita marcar visitados'],
          ok: 1, exp: 'El algoritmo es el mismo; cambiar la cola por una pila cambia el orden de exploración y, con él, las propiedades del recorrido.' },
        { p: 'Para encontrar el camino con menos pasos en un grafo sin pesos se usa…',
          ops: ['DFS', 'BFS, porque explora por niveles y llega primero por el camino más corto',
            'cualquiera de los dos', 'una tabla hash'],
          ok: 1, exp: 'BFS visita todos los nodos a distancia 1, luego los de distancia 2… así que la primera vez que alcanza un nodo es por el camino más corto.' },
        { p: 'Para una red social de mil millones de usuarios con 300 amigos cada uno, la representación adecuada es…',
          ops: ['matriz de adyacencia', 'listas de adyacencia, porque el grafo es muy disperso',
            'un arreglo', 'un árbol'],
          ok: 1, exp: 'La matriz necesitaría 10¹⁸ casillas, físicamente imposible. Las listas solo guardan las aristas que existen: O(V + E).' }
      ]
    }
  ]
});
