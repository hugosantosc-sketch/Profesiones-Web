/* ===== MÓDULO 1 — La máquina y los datos ===== */
CDC.registrar({
  id: 'm1',
  nivel: 'Básico',
  titulo: 'La máquina y los datos: del bit a la CPU',
  resumen: 'Por qué todo es binario, cómo se guardan números negativos, decimales y texto, y cómo unas compuertas lógicas acaban formando un procesador.',
  intro: '<p>Este módulo responde la pregunta que casi ningún curso de programación responde: <em>¿qué está pasando ' +
    'realmente ahí dentro?</em> No es cultura general. Entender el binario explica por qué <code>0.1 + 0.2</code> no da ' +
    '<code>0.3</code>, por qué un entero se da la vuelta al pasarse de 2 147 483 647 y por qué contar letras no es contar ' +
    'bytes. Son errores que vas a encontrar en código real.</p>',
  temas: [

    /* ---------------------------------------------------------- */
    {
      id: 'm1-1',
      titulo: 'El bit: por qué todo es binario',
      resumen: 'De los voltajes al bit, unidades reales (bit, byte, KiB vs KB) y cuánta información cabe en n bits.',
      objetivos: [
        'Explicar por qué las computadoras usan base 2 y no base 10',
        'Calcular cuántos valores distintos se representan con n bits',
        'Usar correctamente bit, byte, KiB, MiB y distinguirlos de KB y MB'
      ],
      lectura: `
<p>Dentro de un procesador no hay números ni letras: hay voltajes. Un transistor, que es el ladrillo de todo, se comporta
como un interruptor microscópico: conduce o no conduce. No hay un «medio conduce» fiable.</p>

<p>Podría parecer que esto es una limitación a superar. En realidad fue una <strong>decisión de ingeniería</strong>.
En los años 50 existieron computadoras decimales de verdad (la ENIAC era una de ellas), y se abandonaron por una razón
contundente: <strong>el ruido</strong>. Para distinguir diez niveles de voltaje entre 0 y 5 voltios, cada nivel tiene
medio voltio de margen; cualquier interferencia convierte un 7 en un 6. Para distinguir solo dos niveles tienes
2,5 voltios de margen a cada lado. Una señal binaria se puede ensuciar muchísimo y seguir siendo legible, y además se puede
<em>regenerar</em>: cada compuerta vuelve a emitir un 0 o un 1 limpio. Por eso el binario ganó, y por eso un CD rayado
todavía suena bien mientras un casete estirado no.</p>

${nota('Dos estados, muchos nombres',
  '<p>Los dos estados se llaman 0 y 1, pero también falso/verdadero, bajo/alto, apagado/encendido o L/H. ' +
  'Son la misma cosa vista desde la electrónica, la lógica o la programación.</p>')}

<h2>Bit, byte y las potencias de dos</h2>
<p>Un <strong>bit</strong> (<em>binary digit</em>) es una respuesta a una pregunta de sí o no: la menor cantidad de
información posible. Con un bit distingues 2 cosas. Con dos bits, 4 (00, 01, 10, 11). Cada bit que agregas
<strong>duplica</strong> las posibilidades:</p>

${tabla(['#Bits', '#Combinaciones (2ⁿ)', 'Qué alcanza a representar'], [
  ['1', '2', 'sí/no, encendido/apagado'],
  ['2', '4', 'los cuatro puntos cardinales'],
  ['3', '8', 'una nota musical de la escala'],
  ['4', '16', 'un dígito hexadecimal; los palos y figuras de una carta'],
  ['8', '256', 'un carácter ASCII extendido; un nivel de gris'],
  ['10', '1 024', 'un poco más de mil cosas'],
  ['16', '65 536', 'un carácter Unicode básico; una coordenada de pantalla'],
  ['32', '4 294 967 296', 'una dirección IPv4; un entero grande; un color con transparencia'],
  ['64', '≈ 1,8 × 10¹⁹', 'direcciones de memoria de una máquina moderna']
], 'La tabla que conviene conocer de memoria. Observa que 2¹⁰ = 1024, muy cerca de mil: de ahí viene toda la confusión de las unidades.')}

<p>La fórmula es simple y vale para todo: con <strong>n</strong> bits representas <strong>2ⁿ</strong> valores distintos.
Al revés, para representar <strong>V</strong> valores distintos necesitas <strong>⌈log₂ V⌉</strong> bits. ¿Cuántos bits
para los 7 días de la semana? <code>log₂ 7 ≈ 2,8</code>, redondeado hacia arriba: <strong>3 bits</strong> (y te sobran
una combinación de ocho).</p>

<h2>El byte y por qué son 8 bits</h2>
<p>Un <strong>byte</strong> son 8 bits, es decir 256 valores. No es un número mágico: se impuso con el IBM System/360
en 1964 porque 8 bits alcanzaban para todos los caracteres del inglés con margen, y porque es una potencia de dos que se
parte limpiamente en dos mitades de 4 bits (cada mitad es exactamente un dígito hexadecimal). Antes hubo máquinas de 6, 7,
9 y 12 bits por carácter. Hoy el byte es la unidad mínima que la memoria sabe direccionar: no puedes pedirle a la RAM
«dame el bit 5»; pides el byte y luego aislas el bit con operaciones lógicas.</p>

<h2>KB, KiB y la mentira del disco duro</h2>
<p>Aquí hay una trampa real que cuesta dinero. Existen dos sistemas de prefijos:</p>

${tabla(['Unidad', 'Valor', 'Base', 'Quién la usa'], [
  ['1 kB (kilobyte)', '1 000 bytes', '10³', 'Fabricantes de discos, redes, el SI'],
  ['1 KiB (kibibyte)', '1 024 bytes', '2¹⁰', 'Memoria RAM, Linux, el estándar IEC'],
  ['1 MB', '1 000 000', '10⁶', 'Cajas de discos duros'],
  ['1 MiB', '1 048 576', '2²⁰', 'Windows (que escribe «MB» pero calcula MiB)'],
  ['1 GB', '10⁹', '10⁹', 'Marketing'],
  ['1 GiB', '1 073 741 824', '2³⁰', 'Tu sistema operativo']
], 'Los prefijos binarios (Ki, Mi, Gi) son los correctos para la memoria desde 1998. Casi nadie los usa, y de ahí la confusión.')}

<p>Compras un disco de «1 TB» y Windows te muestra 931 GB. Nadie te robó nada: el fabricante contó 10¹² bytes
(1 000 000 000 000) y el sistema los dividió entre 2³⁰ para mostrarlos como gibibytes, escribiendo «GB» en la etiqueta.
<code>10¹² / 2³⁰ = 931,3</code>. La diferencia crece con el tamaño: en un disco de 8 TB «faltan» más de 500 GB aparentes.</p>

${nota('Bit y byte se abrevian distinto',
  '<p><code>b</code> minúscula es <strong>bit</strong>; <code>B</code> mayúscula es <strong>byte</strong>. ' +
  'Tu conexión de «100 Mbps» son 100 megabits por segundo, es decir unos 12,5 MB/s de descarga real. ' +
  'Los proveedores de internet miden en bits precisamente porque el número suena ocho veces mejor.</p>', 'warn')}

<h2>Lo que un bit no tiene</h2>
<p>Un patrón de bits no tiene significado por sí mismo. Los ocho bits <code>01000001</code> son, al mismo tiempo:</p>
<ul>
  <li>el número 65, si los interpretas como un entero sin signo;</li>
  <li>la letra <code>A</code>, si los interpretas como ASCII;</li>
  <li>el color gris oscuro, si son un nivel de luminosidad;</li>
  <li>parte de una instrucción de máquina, si el procesador los está leyendo como código.</li>
</ul>
<p>El significado lo da el <strong>tipo</strong>, y el tipo lo pones tú al declarar la variable. Esto es literalmente lo
que hace el sistema de tipos de un lenguaje: recordar qué interpretación corresponde a cada grupo de bits para que no
sumes una fecha con un color. Cuando en C haces un <em>cast</em> de puntero estás diciéndole al compilador «interpreta
estos mismos bits de otra manera», y si te equivocas, nadie te salva.</p>

${nota('Pruébalo ahora', '<p>Abre el <a href="#herramientas">conversor de bases</a> del laboratorio y escribe 214. ' +
  'Vas a ver el mismo número en cuatro bases, su desarrollo en potencias de 2 y las divisiones sucesivas. ' +
  'Vuelve aquí cuando hayas probado tres o cuatro números distintos.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Cuenta combinaciones',
          enunciado: '¿Cuántos valores distintos puedes representar con 5 bits? ¿Y con 12? ¿Cuántos bits necesitas como mínimo para representar los 31 días de un mes?',
          pista: 'Combinaciones = 2ⁿ. Para el camino inverso, busca la menor n tal que 2ⁿ ≥ valores.',
          solucion: `<p>Con 5 bits: <code>2⁵ = 32</code> valores (del 0 al 31).</p>
<p>Con 12 bits: <code>2¹² = 4096</code> valores.</p>
<p>Para 31 días: necesitas al menos 31 combinaciones. <code>2⁴ = 16</code> es insuficiente, <code>2⁵ = 32</code> alcanza. Por lo tanto <b>5 bits</b>. Fíjate en el detalle fino: si numeras los días del 1 al 31 usas 31 de las 32 combinaciones y desperdicias una; si los numeras del 0 al 30, usas 31 y desperdicias una igual. El desperdicio es inevitable salvo que el total sea potencia de 2.</p>` },
        { n: 2, titulo: 'Unidades en la vida real',
          enunciado: 'Tienes una conexión de 200 Mbps. (a) ¿Cuántos MB por segundo son, como máximo? (b) ¿Cuánto tardaría en descargar un archivo de 3 GiB en condiciones ideales?',
          pista: '8 bits = 1 byte. Y recuerda que Mbps usa 10⁶ mientras que GiB usa 2³⁰.',
          solucion: `<p><b>(a)</b> 200 Mbps = 200 000 000 bits/s ÷ 8 = 25 000 000 bytes/s = <b>25 MB/s</b> (o 23,8 MiB/s).</p>
<p><b>(b)</b> 3 GiB = 3 × 1 073 741 824 = 3 221 225 472 bytes. Dividido entre 25 000 000 B/s ≈ <b>129 segundos</b>, poco más de dos minutos. En la práctica será más por la sobrecarga de protocolos (TCP/IP añade cabeceras a cada paquete) y porque la velocidad anunciada es un máximo teórico.</p>` },
        { n: 3, titulo: 'El disco que falta',
          enunciado: 'Un cliente reclama que compró un disco de 2 TB y su computadora muestra 1,81 TB. Explícale con números exactos qué pasó, sin decirle que lo estafaron.',
          pista: 'El fabricante usa potencias de 10; el sistema operativo divide entre potencias de 2.',
          solucion: `<p>El fabricante vendió <b>2 × 10¹² = 2 000 000 000 000 bytes</b>, que es lo que dice la caja y es cierto.</p>
<p>El sistema operativo divide entre 2⁴⁰ (1 099 511 627 776) para mostrar tebibytes, pero escribe la etiqueta «TB»:</p>
<p><code>2 000 000 000 000 ÷ 1 099 511 627 776 = 1,819</code></p>
<p>Así que muestra <b>1,81 TB</b> donde debería escribir <b>1,81 TiB</b>. Los bytes están todos ahí; lo que cambia es la unidad con la que se cuentan. La «pérdida» es siempre del 9,1% en el rango de los tera, y crece: 0,0% en bytes, 2,4% en kilo, 4,9% en mega, 7,4% en giga, 9,1% en tera.</p>` },
        { n: 4, titulo: 'Diseña una codificación',
          enunciado: 'Debes guardar el estado de un semáforo peatonal en la menor cantidad de bits posible. Los estados son: rojo, verde, verde intermitente y apagado (fuera de servicio). Además hay que guardar si el pulsador fue presionado y si es horario nocturno. Diseña la codificación bit por bit y di cuántos bits ocupa en total.',
          pista: 'Agrupa los datos por su cantidad de valores posibles y asigna campos de bits.',
          solucion: `${tabla(['Campo', 'Valores', 'Bits', 'Codificación'], [
  ['Estado de la luz', '4', '2', '00 rojo · 01 verde · 10 verde intermitente · 11 apagado'],
  ['Pulsador presionado', '2', '1', '0 no · 1 sí'],
  ['Horario nocturno', '2', '1', '0 día · 1 noche']
], 'Total: 4 bits, que cabe en medio byte (un nibble).')}
<p>El estado completo se guarda entonces en un patrón como <code>0110</code>: luz verde (01), pulsador presionado (1), horario diurno (0).</p>
<p>Esta técnica se llama <b>campos de bits</b> (<i>bit fields</i>) y se usa de verdad: las cabeceras de los protocolos de red, los permisos de archivos en Unix (<code>rwxr-xr-x</code> son 9 bits) y los registros de configuración del hardware funcionan exactamente así. Guardar cada dato en un byte separado habría costado 3 bytes = 24 bits en lugar de 4.</p>` },
        { n: 5, titulo: 'El límite teórico',
          enunciado: 'Una contraseña usa los 95 caracteres imprimibles del ASCII y tiene 10 posiciones. (a) ¿Cuántas contraseñas distintas existen? (b) ¿Cuántos bits de información representa, es decir, cuántos bits tendría una clave binaria igual de difícil de adivinar? (c) Si un atacante prueba 10¹² por segundo, ¿cuánto tarda en promedio?',
          pista: 'Cada posición es independiente: multiplica. Y los bits son log₂ del total.',
          solucion: `<p><b>(a)</b> <code>95¹⁰ ≈ 5,99 × 10¹⁹</code> contraseñas posibles.</p>
<p><b>(b)</b> <code>log₂(95¹⁰) = 10 × log₂ 95 = 10 × 6,57 ≈ 65,7 bits</code>. Es decir, esa contraseña equivale a una clave aleatoria de unos <b>66 bits</b>. Por eso las claves criptográficas de 128 bits se consideran seguras y las de 56 (el viejo DES) se rompieron.</p>
<p><b>(c)</b> En promedio hay que probar la mitad del espacio: <code>3 × 10¹⁹ ÷ 10¹² = 3 × 10⁷ s ≈ 347 días</code>. Suena mucho, pero si la contraseña no es aleatoria (es una palabra con sustituciones tipo <code>P4ssw0rd!</code>) el espacio real de búsqueda cae a millones y se rompe en segundos. La entropía que importa es la real, no la teórica: por eso una frase larga de palabras comunes es mejor que una palabra corta con símbolos raros.</p>` }
      ],
      quiz: [
        { p: '¿Por qué las computadoras usan base 2 en lugar de base 10?',
          ops: ['Porque es más rápido multiplicar en base 2', 'Porque distinguir dos niveles de voltaje es mucho más robusto frente al ruido',
            'Porque los humanos tenemos 2 manos', 'Por una convención histórica arbitraria'],
          ok: 1, exp: 'Con dos estados hay un enorme margen de tolerancia al ruido y la señal se puede regenerar en cada compuerta. Hubo computadoras decimales y se abandonaron por poco fiables.' },
        { p: '1 KiB es exactamente…',
          ops: ['1000 bytes', '1024 bytes', '1024 bits', '8000 bits'],
          ok: 1, exp: '1 KiB = 2¹⁰ = 1024 bytes. El kilobyte (kB) del SI son 1000 bytes; la confusión entre ambos es la causa de los «GB que faltan» en los discos.' },
        { p: 'Los bits <code>01000001</code> representan…',
          ops: ['solo el número 65', 'solo la letra A', 'lo que diga el tipo con el que se interpreten', 'un error'],
          ok: 2, exp: 'Un patrón de bits no tiene significado propio. 65, la letra A, un tono de gris o parte de una instrucción: lo decide la interpretación.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-2',
      titulo: 'Sistemas de numeración y conversiones',
      resumen: 'Notación posicional, conversión entre decimal, binario, octal y hexadecimal, y por qué el hexadecimal existe.',
      objetivos: [
        'Convertir entre decimal, binario, octal y hexadecimal en ambos sentidos',
        'Aplicar el método de divisiones sucesivas y el de sumas de potencias',
        'Explicar por qué el hexadecimal es la notación natural para agrupar bits'
      ],
      lectura: `
<p>Todo sistema de numeración posicional funciona igual: el valor de un dígito depende de <em>dónde está</em>. El número
2 habla distinto en 20 que en 200. Lo que escribimos como <code>347</code> significa en realidad:</p>

<p style="text-align:center;font-family:var(--f-mono)">3 × 10² &nbsp;+&nbsp; 4 × 10¹ &nbsp;+&nbsp; 7 × 10⁰ &nbsp;=&nbsp; 300 + 40 + 7</p>

<p>La base 10 no tiene nada de especial salvo nuestros diez dedos. La misma mecánica con base 2 usa potencias de 2:</p>

${fig(`<svg viewBox="0 0 540 150" width="540" height="150" role="img" aria-label="Descomposición posicional del binario 11010110">
<g color="var(--fg-soft)">
${[1, 1, 0, 1, 0, 1, 1, 0].map(function (b, i) {
  var x = 30 + i * 60, p = 7 - i, val = b ? Math.pow(2, p) : 0;
  return '<rect x="' + x + '" y="20" width="46" height="40" rx="5" fill="' + (b ? 'var(--accent-soft)' : 'var(--surface-2)') +
    '" stroke="' + (b ? 'var(--accent)' : 'var(--line)') + '" stroke-width="1.5"/>' +
    '<text x="' + (x + 23) + '" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="var(--fg)">' + b + '</text>' +
    '<text x="' + (x + 23) + '" y="78" text-anchor="middle" font-size="11" fill="var(--fg-soft)">2^' + p + '</text>' +
    '<text x="' + (x + 23) + '" y="96" text-anchor="middle" font-size="11" fill="var(--fg-soft)">' + Math.pow(2, p) + '</text>' +
    '<text x="' + (x + 23) + '" y="120" text-anchor="middle" font-size="12" font-weight="' + (b ? '700' : '400') +
    '" fill="' + (b ? 'var(--accent)' : 'var(--fg-soft)') + '">' + val + '</text>';
}).join('')}
<text x="270" y="142" text-anchor="middle" font-size="13" fill="var(--fg)">128 + 64 + 16 + 4 + 2 = 214</text>
</g></svg>`, 'El binario 11010110 vale 214. Solo se suman las posiciones que tienen un 1.')}

<h2>De cualquier base a decimal: sumar potencias</h2>
<p>Multiplica cada dígito por la base elevada a su posición (contando desde 0 por la derecha) y suma:</p>
${cod('txt', `1101 en base 2  = 1×8 + 1×4 + 0×2 + 1×1 = 13
347 en base 8   = 3×64 + 4×8 + 7×1 = 231
2AF en base 16  = 2×256 + 10×16 + 15×1 = 687`)}
<p>En hexadecimal, las letras A a F valen 10 a 15. Es la única parte que hay que memorizar y basta con recordar que
<code>A = 10</code> y contar: B=11, C=12, D=13, E=14, F=15.</p>

<h2>De decimal a cualquier base: divisiones sucesivas</h2>
<p>Divide entre la base, anota el resto, repite con el cociente hasta llegar a 0 y <strong>lee los restos de abajo hacia
arriba</strong>. Convirtamos 214 a binario:</p>

${tabla(['#División', '#Cociente', '#Resto'], [
  ['214 ÷ 2', '107', '<b>0</b>'], ['107 ÷ 2', '53', '<b>1</b>'], ['53 ÷ 2', '26', '<b>1</b>'],
  ['26 ÷ 2', '13', '<b>0</b>'], ['13 ÷ 2', '6', '<b>1</b>'], ['6 ÷ 2', '3', '<b>0</b>'],
  ['3 ÷ 2', '1', '<b>1</b>'], ['1 ÷ 2', '0', '<b>1</b>']
], 'Leyendo los restos de abajo hacia arriba: 11010110. El último resto es el bit más significativo.')}

<p><strong>¿Por qué funciona?</strong> Porque el resto de dividir entre 2 es exactamente el último bit (dice si el número
es par o impar), y dividir entre 2 es desplazar todos los bits una posición a la derecha, descartando el que acabas de
leer. Cada división te entrega un bit, del menos significativo al más significativo. No es un truco memorístico: es la
definición de la notación posicional aplicada al revés.</p>

<h2>El método rápido: restar potencias</h2>
<p>Para números pequeños suele ser más veloz ir restando la mayor potencia de 2 que quepa:</p>
${cod('txt', `214 − 128 = 86    → bit 2^7 = 1
 86 −  64 = 22    → bit 2^6 = 1
 22 −  32 < 0     → bit 2^5 = 0
 22 −  16 =  6    → bit 2^4 = 1
  6 −   8 < 0     → bit 2^3 = 0
  6 −   4 =  2    → bit 2^2 = 1
  2 −   2 =  0    → bit 2^1 = 1
  0 −   1 < 0     → bit 2^0 = 0
Resultado: 11010110`)}

<h2>Por qué existe el hexadecimal</h2>
<p>El hexadecimal no es una rareza de programadores: es taquigrafía para binario. Como <code>16 = 2⁴</code>, cada dígito
hexadecimal equivale <strong>exactamente</strong> a 4 bits, sin cálculos. Convertir es solo agrupar de cuatro en cuatro,
de derecha a izquierda:</p>

${cod('txt', `1101 0110        binario, agrupado de 4 en 4
  D    6         cada grupo es un dígito hex
= 0xD6           214 en decimal`)}

${tabla(['#Hex', '#Binario', '#Dec', '#Hex', '#Binario', '#Dec'], [
  ['0', '0000', '0', '8', '1000', '8'], ['1', '0001', '1', '9', '1001', '9'],
  ['2', '0010', '2', 'A', '1010', '10'], ['3', '0011', '3', 'B', '1011', '11'],
  ['4', '0100', '4', 'C', '1100', '12'], ['5', '0101', '5', 'D', '1101', '13'],
  ['6', '0110', '6', 'E', '1110', '14'], ['7', '0111', '7', 'F', '1111', '15']
], 'La tabla de los 16 nibbles. Vale la pena memorizarla: aparece en colores CSS, direcciones de memoria, volcados de bytes y máscaras de red.')}

<p>Por eso un color en CSS es <code>#FF8000</code>: tres bytes, uno por canal, dos dígitos hex cada uno. Y por eso una
dirección de memoria se escribe <code>0x7FFE3A20</code> y no en decimal: en hexadecimal ves de un golpe la estructura de
los bits, y en decimal no ves nada.</p>

<p>El octal (base 8, tres bits por dígito) es el pariente venido a menos: se usaba en máquinas cuyas palabras eran
múltiplos de 3 bits y hoy casi solo sobrevive en los permisos de Unix (<code>chmod 755</code>: tres grupos de tres bits
<code>rwx</code>).</p>

${nota('Prefijos para no confundirse',
  '<p>Como <code>10</code> puede ser diez, dos o dieciséis según la base, se usan prefijos: <code>0b1010</code> binario, ' +
  '<code>0o17</code> octal, <code>0x1F</code> hexadecimal, y sin prefijo decimal. En matemáticas se escribe con subíndice: ' +
  '1010₂ = 10₁₀.</p>')}

<h2>Fracciones en binario</h2>
<p>A la derecha del punto las potencias siguen bajando: 2⁻¹ = 0,5; 2⁻² = 0,25; 2⁻³ = 0,125. Entonces:</p>
<p style="text-align:center;font-family:var(--f-mono)">101,101₂ = 4 + 0 + 1 + 0,5 + 0 + 0,125 = 5,625</p>
<p>Para convertir una fracción decimal a binario se multiplica por 2 repetidamente y se leen las partes enteras de arriba
hacia abajo. Pruébalo con 0,625: <code>0,625×2 = <b>1</b>,25</code> → <code>0,25×2 = <b>0</b>,5</code> →
<code>0,5×2 = <b>1</b>,0</code> → resultado <code>0,101</code>. Exacto.</p>
<p>Ahora hazlo con 0,1: <code>0,1×2 = 0,2</code> → <code>0,4</code> → <code>0,8</code> → <code>1,6</code> →
<code>1,2</code> → <code>0,4</code>… y ahí reaparece el 0,4: el ciclo se repite para siempre. <strong>0,1 no tiene
representación binaria finita</strong>, igual que 1/3 no la tiene en decimal. Esa es la raíz de uno de los errores más
famosos de la programación, y es el tema del siguiente par de lecciones.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Conversiones básicas',
          enunciado: 'Convierte a decimal: (a) <code>1011₂</code>, (b) <code>11111111₂</code>, (c) <code>0x2F</code>, (d) <code>0o17</code>.',
          pista: 'Suma dígito × base^posición, contando posiciones desde 0 por la derecha.',
          solucion: `<p><b>(a)</b> 8+0+2+1 = <b>11</b></p><p><b>(b)</b> 128+64+32+16+8+4+2+1 = <b>255</b> (el máximo de un byte sin signo)</p>
<p><b>(c)</b> 2×16 + 15 = <b>47</b></p><p><b>(d)</b> 1×8 + 7 = <b>15</b></p>` },
        { n: 2, titulo: 'Decimal a binario y hex',
          enunciado: 'Convierte 173 a binario y a hexadecimal mostrando el procedimiento completo. Comprueba tu resultado con el conversor del laboratorio.',
          pista: 'Divisiones sucesivas entre 2, y luego agrupa de 4 en 4.',
          solucion: `${tabla(['#División', '#Cociente', '#Resto'], [
  ['173÷2', '86', '1'], ['86÷2', '43', '0'], ['43÷2', '21', '1'], ['21÷2', '10', '1'],
  ['10÷2', '5', '0'], ['5÷2', '2', '1'], ['2÷2', '1', '0'], ['1÷2', '0', '1']
])}
<p>Leyendo de abajo hacia arriba: <code>10101101₂</code>.</p>
<p>Agrupando de 4 en 4: <code>1010 1101</code> → <code>A D</code> → <code>0xAD</code>.</p>
<p>Comprobación: 10×16 + 13 = 160 + 13 = 173. ✔</p>` },
        { n: 3, titulo: 'Aritmética en hexadecimal',
          enunciado: 'Sin pasar por decimal, calcula <code>0x1F + 0x01</code>, <code>0xFF + 0x01</code> y <code>0x2A × 2</code>. Explica qué le pasa a los bits en cada caso.',
          pista: 'En hex, al pasar de F se lleva 1 a la siguiente posición, igual que al pasar de 9 en decimal.',
          solucion: `<p><b>0x1F + 0x01 = 0x20.</b> F+1 se desborda a 0 y lleva 1: el 1 se convierte en 2. En binario: <code>0001 1111 + 1 = 0010 0000</code>. Todos los unos de la derecha se vuelven cero y aparece un 1 a la izquierda.</p>
<p><b>0xFF + 0x01 = 0x100.</b> En un byte de 8 bits esto <b>no cabe</b>: el resultado se trunca a 0x00 y se activa el acarreo. Es el desbordamiento clásico de un contador de 8 bits, el mismo que hacía que las vidas de los videojuegos antiguos volvieran a cero.</p>
<p><b>0x2A × 2 = 0x54.</b> Multiplicar por 2 en binario es <b>desplazar todos los bits una posición a la izquierda</b>: <code>0010 1010</code> → <code>0101 0100</code>. Por eso duplicar es una de las operaciones más baratas que existe, y por eso los compiladores convierten <code>x*2</code> en <code>x &lt;&lt; 1</code>.</p>` },
        { n: 4, titulo: 'Fracción binaria',
          enunciado: 'Convierte <code>0,8125</code> a binario exactamente, y luego intenta convertir <code>0,3</code>; muestra las primeras 10 cifras y explica qué observas.',
          pista: 'Multiplica la parte fraccionaria por 2 y anota la parte entera; repite con lo que queda.',
          solucion: `<p><b>0,8125:</b></p>
<pre>0,8125 × 2 = <b>1</b>,625
0,625  × 2 = <b>1</b>,25
0,25   × 2 = <b>0</b>,5
0,5    × 2 = <b>1</b>,0   → termina</pre>
<p>Resultado exacto: <code>0,1101₂</code>. Comprobación: 0,5 + 0,25 + 0,0625 = 0,8125 ✔ (funciona porque 0,8125 = 13/16, y 16 es potencia de 2).</p>
<p><b>0,3:</b></p>
<pre>0,3 ×2=0,6 → 0    0,6 ×2=1,2 → 1    0,2 ×2=0,4 → 0
0,4 ×2=0,8 → 0    0,8 ×2=1,6 → 1    0,6 ×2=1,2 → 1  ← ya vimos 0,6</pre>
<p>Primeras cifras: <code>0,0100110011...₂</code>, con el grupo <code>0011</code> repitiéndose para siempre. <b>0,3 es periódico en binario</b> y por tanto imposible de guardar exacto en una variable real. Solo las fracciones cuyo denominador (simplificado) es una potencia de 2 tienen representación binaria finita: 1/2, 1/4, 3/8, 13/16 sí; 1/3, 1/5, 1/10 no.</p>` },
        { n: 5, titulo: 'Base arbitraria',
          enunciado: 'Escribe un algoritmo en pseudocódigo que convierta un número decimal a cualquier base entre 2 y 16, y pruébalo en el laboratorio con 255 en base 16 (debe dar FF) y 100 en base 7 (debe dar 202).',
          pista: 'Necesitas los restos en orden inverso y una cadena de dígitos "0123456789ABCDEF" para traducir restos mayores a 9.',
          lab: 'Algoritmo ConvertirBase\n\tDefinir n, base, resto Como Entero\n\tDefinir digitos, salida Como Cadena\n\tdigitos <- "0123456789ABCDEF"\n\tEscribir "Número decimal:"\n\tLeer n\n\tEscribir "Base destino (2 a 16):"\n\tLeer base\n\tsalida <- ""\n\tSi n = 0 Entonces\n\t\tsalida <- "0"\n\tFinSi\n\tMientras n > 0 Hacer\n\t\tresto <- n MOD base\n\t\tsalida <- Subcadena(digitos, resto + 1, resto + 1) + salida\n\t\tn <- trunc(n / base)\n\tFinMientras\n\tEscribir "Resultado: ", salida\nFinAlgoritmo',
          labEntradas: '255\n16',
          solucion: `${cod('pseudo', `Algoritmo ConvertirBase
	Definir n, base, resto Como Entero
	Definir digitos, salida Como Cadena
	digitos <- "0123456789ABCDEF"
	Escribir "Número decimal:"
	Leer n
	Escribir "Base destino (2 a 16):"
	Leer base
	salida <- ""
	Si n = 0 Entonces
		salida <- "0"               // caso límite que todos olvidan
	FinSi
	Mientras n > 0 Hacer
		resto <- n MOD base
		// se agrega POR DELANTE: así los restos quedan en orden correcto
		salida <- Subcadena(digitos, resto + 1, resto + 1) + salida
		n <- trunc(n / base)
	FinMientras
	Escribir "Resultado: ", salida
FinAlgoritmo`)}
<p>Tres decisiones de diseño que vale la pena notar:</p>
<ul>
<li><b>La cadena de dígitos</b> evita un <code>Segun</code> de 16 casos: el resto es directamente la posición del carácter. Es una tabla de búsqueda, el patrón más barato que existe.</li>
<li><b>Agregar por delante</b> (<code>nuevo + salida</code>) resuelve gratis el problema de «leer los restos al revés».</li>
<li><b>El caso n = 0</b> hay que tratarlo aparte, porque el <code>Mientras</code> no entra ni una vez y la salida quedaría vacía. Es un caso límite típico de examen.</li>
</ul>
<p>Pulsa «Abrir en el laboratorio» para ejecutarlo y «Generar diagrama de flujo» para verlo dibujado.</p>` }
      ],
      quiz: [
        { p: '<code>1011₂</code> en decimal es…', ops: ['9', '11', '13', '23'],
          ok: 1, exp: '8 + 0 + 2 + 1 = 11.' },
        { p: '¿Por qué un dígito hexadecimal equivale exactamente a 4 bits?',
          ops: ['Por convención histórica', 'Porque 16 = 2⁴, así que hay 16 combinaciones de 4 bits',
            'Porque un byte tiene 8 bits', 'Porque los colores usan 6 dígitos'],
          ok: 1, exp: 'Con 4 bits hay 2⁴ = 16 combinaciones, exactamente los 16 dígitos del hexadecimal. Por eso convertir es solo agrupar.' },
        { p: '¿Cuál de estas fracciones <b>sí</b> tiene representación binaria finita?',
          ops: ['0,1', '0,3', '0,375', '0,7'],
          ok: 2, exp: '0,375 = 3/8 y 8 es potencia de 2, así que es <code>0,011₂</code> exacto. Las otras son periódicas en binario.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-3',
      titulo: 'Números negativos y desbordamiento',
      resumen: 'Complemento a dos, por qué existe, el rango asimétrico y el desbordamiento que estrelló un cohete.',
      objetivos: [
        'Representar enteros negativos en complemento a dos',
        'Calcular el rango exacto de un entero con signo de n bits',
        'Reconocer y prevenir desbordamientos de entero'
      ],
      lectura: `
<p>En binario no hay signo «−». Hay bits. Entonces, ¿cómo se guarda el −5? La respuesta que se impuso en todo el hardware
moderno es el <strong>complemento a dos</strong>, y conviene entender por qué se descartaron las alternativas.</p>

<h2>Dos intentos fallidos</h2>
<p><strong>Signo y magnitud.</strong> Reservar el bit más a la izquierda para el signo (0 positivo, 1 negativo) y el resto
para el valor. Con 8 bits: <code>00000101</code> = +5 y <code>10000101</code> = −5. Es lo más intuitivo y tiene dos
problemas graves: existen <strong>dos ceros</strong> (<code>00000000</code> y <code>10000000</code>, +0 y −0), y la suma
necesita un circuito aparte que compare signos y decida si sumar o restar. Más hardware, más lento.</p>

<p><strong>Complemento a uno.</strong> Negar un número es invertir todos sus bits. Sigue habiendo dos ceros
(<code>00000000</code> y <code>11111111</code>) y la suma requiere un acarreo circular. Mejor, pero no suficiente.</p>

<h2>Complemento a dos: la solución elegante</h2>
<p>Para obtener el negativo de un número: <strong>invierte todos los bits y suma 1</strong>. Con 8 bits, para −5:</p>

${cod('txt', `  5 = 0000 0101
invierto = 1111 1010      (complemento a uno)
  sumo 1 = 1111 1011  →  −5`)}

<p>Comprobemos que funciona sumando 5 + (−5):</p>
${cod('txt', `  0000 0101   (+5)
+ 1111 1011   (−5)
-----------
1 0000 0000   → el 1 de la izquierda se descarta (no cabe en 8 bits)
  0000 0000   = 0  ✔`)}

<p>Ahí está la magia: <strong>la resta desaparece</strong>. Restar es sumar el complemento a dos, y el procesador solo
necesita un circuito sumador. Hay un único cero. Y el bit más significativo sigue indicando el signo, aunque ahora no es
un bit «aparte»: es el bit de peso <code>−2ⁿ⁻¹</code>.</p>

<p>Esa es la forma más útil de entenderlo: en complemento a dos de 8 bits, el bit más alto vale <strong>−128</strong>
en lugar de +128, y los demás siguen valiendo lo de siempre:</p>

${tabla(['#Bits', 'Interpretación con signo', '#Valor'], [
  ['<code>0111 1111</code>', '64+32+16+8+4+2+1', '+127 (el máximo)'],
  ['<code>0000 0001</code>', '1', '+1'],
  ['<code>0000 0000</code>', '0', '0'],
  ['<code>1111 1111</code>', '−128+64+32+16+8+4+2+1', '−1'],
  ['<code>1111 1011</code>', '−128+64+32+16+8+2+1', '−5'],
  ['<code>1000 0000</code>', '−128', '−128 (el mínimo)']
], 'Con 8 bits el rango es de −128 a +127: hay un negativo más que positivos porque el cero ocupa un lugar del lado positivo.')}

<p>El rango general de un entero con signo de <strong>n</strong> bits es:</p>
<p style="text-align:center;font-family:var(--f-mono)">de −2ⁿ⁻¹ hasta 2ⁿ⁻¹ − 1</p>

${tabla(['Tipo habitual', '#Bits', '#Mínimo', '#Máximo'], [
  ['<code>byte</code> / <code>int8</code>', '8', '−128', '127'],
  ['<code>short</code> / <code>int16</code>', '16', '−32 768', '32 767'],
  ['<code>int</code> / <code>int32</code>', '32', '−2 147 483 648', '2 147 483 647'],
  ['<code>long</code> / <code>int64</code>', '64', '−9 223 372 036 854 775 808', '9 223 372 036 854 775 807']
], 'Estos límites explican muchos errores reales. El 2 147 483 647 es un número que vas a reconocer de por vida.')}

<h2>Desbordamiento: cuando el contador se da la vuelta</h2>
<p>Si sumas 1 al máximo, el resultado no cabe y los bits «dan la vuelta»:</p>
${cod('txt', `  0111 1111  (+127)
+ 0000 0001  (  +1)
-----------
  1000 0000  = −128  (no +128)`)}

<p>Esto no es un error que el hardware reporte: en C, por ejemplo, el desbordamiento de enteros con signo es
<em>comportamiento indefinido</em>, y el programa simplemente sigue con un número equivocado. Casos reales:</p>

<ul>
  <li><strong>Ariane 5, vuelo 501 (1996).</strong> Un valor de velocidad horizontal almacenado en un real de 64 bits se
  convirtió a un entero con signo de 16 bits. El valor era mayor que 32 767, el desbordamiento produjo basura, el sistema
  de referencia inercial se apagó y el cohete se autodestruyó 37 segundos después del despegue. Costo: unos 370 millones
  de dólares por una conversión de tipo sin validar.</li>
  <li><strong>El «problema del año 2038».</strong> El tiempo Unix cuenta segundos desde 1970 en un entero de 32 bits con
  signo. El 19 de enero de 2038 a las 03:14:07 UTC ese contador se desborda y pasa a 1901. Es la razón por la que los
  sistemas migraron a 64 bits.</li>
  <li><strong>Gandhi nuclear.</strong> En <em>Civilization</em>, la agresividad de Gandhi era 1 y un efecto de gobierno
  le restaba 2 en un entero sin signo de 8 bits: 1 − 2 dio 255, el máximo. El líder más pacífico del juego empezó a
  lanzar misiles. La anécdota es probablemente una leyenda urbana, pero el mecanismo (<em>underflow</em> en un entero sin
  signo) es exactísimo y ocurre a diario en código real.</li>
</ul>

${nota('Cómo protegerse',
  '<ul><li>Elige el tipo pensando en el <b>máximo valor posible</b>, no en el habitual.</li>' +
  '<li>Valida <b>antes</b> de operar: en lugar de comprobar <code>a + b &gt; MAX</code> (que ya desbordó), comprueba <code>a &gt; MAX − b</code>.</li>' +
  '<li>Desconfía de toda conversión a un tipo más pequeño; es exactamente lo que destruyó el Ariane 5.</li>' +
  '<li>Para dinero, usa enteros en céntimos o un tipo decimal, nunca reales.</li></ul>', 'warn')}

<h2>Con signo y sin signo</h2>
<p>Los mismos bits <code>1111 1111</code> son −1 como entero con signo y 255 como entero sin signo. El hardware no sabe
cuál es: lo decide la instrucción que uses. De ahí vienen dos clases de error muy comunes:</p>
<ul>
  <li><code>for (unsigned i = n; i &gt;= 0; i--)</code> nunca termina, porque un entero sin signo jamás es menor que 0:
  al llegar a 0 y decrementar, se vuelve el máximo.</li>
  <li>Comparar un entero con signo con uno sin signo hace que el compilador convierta el primero al segundo, y
  <code>−1 &gt; 2</code> acaba siendo <strong>verdadero</strong> porque −1 se lee como 4 294 967 295.</li>
</ul>

${nota('Pruébalo ahora', '<p>Abre la herramienta <a href="#herramientas">Bits con signo y reales</a> del laboratorio: ' +
  'escribe −37 con 8 bits, mira los tres pasos del complemento a dos, y luego intenta 200 con 8 bits para ver el ' +
  'mensaje de desbordamiento.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Complemento a dos a mano',
          enunciado: 'Representa en complemento a dos de 8 bits: (a) −1, (b) −16, (c) −100. Muestra los tres pasos de cada uno.',
          pista: 'Magnitud en binario → invertir todos los bits → sumar 1.',
          solucion: `<p><b>(a) −1:</b> 1 = <code>0000 0001</code> → invertido <code>1111 1110</code> → +1 = <code><b>1111 1111</b></code>. El −1 es siempre «todos unos», en cualquier tamaño.</p>
<p><b>(b) −16:</b> 16 = <code>0001 0000</code> → invertido <code>1110 1111</code> → +1 = <code><b>1111 0000</b></code>.</p>
<p><b>(c) −100:</b> 100 = <code>0110 0100</code> → invertido <code>1001 1011</code> → +1 = <code><b>1001 1100</b></code>.</p>
<p>Verificación de (c) con los pesos: −128+16+8+4 = −100 ✔</p>` },
        { n: 2, titulo: 'Interpreta los bits',
          enunciado: 'Los bits <code>1010 0110</code> en 8 bits: ¿qué valor son como entero sin signo? ¿Y como entero con signo en complemento a dos?',
          pista: 'Para el valor con signo, el bit más alto vale −128.',
          solucion: `<p><b>Sin signo:</b> 128+32+4+2 = <b>166</b>.</p>
<p><b>Con signo:</b> el bit más alto es 1, así que es negativo. Con los pesos: −128+32+4+2 = <b>−90</b>.</p>
<p>Alternativa (el método inverso): invierte y suma 1 para obtener la magnitud: <code>1010 0110</code> → <code>0101 1001</code> → +1 = <code>0101 1010</code> = 90, luego el valor es −90 ✔. Nota que <code>166 + 90 = 256 = 2⁸</code>: siempre se cumple que el valor sin signo y la magnitud del negativo suman 2ⁿ.</p>` },
        { n: 3, titulo: 'Predice el desbordamiento',
          enunciado: 'Con enteros de 16 bits con signo (rango −32 768 a 32 767), ¿qué valor queda en cada caso? (a) <code>32767 + 1</code>; (b) <code>−32768 − 1</code>; (c) <code>30000 + 30000</code>; (d) <code>20000 × 2</code>.',
          pista: 'Al pasarse del máximo se continúa desde el mínimo, de forma circular.',
          solucion: `<p><b>(a)</b> <code>32767 + 1 = −32768</code>. El contador da la vuelta al mínimo.</p>
<p><b>(b)</b> <code>−32768 − 1 = 32767</code>. Da la vuelta hacia el otro lado.</p>
<p><b>(c)</b> El resultado real es 60 000, que excede el máximo por 60000 − 65536 = <b>−5536</b>. Queda <code>−5536</code>.</p>
<p><b>(d)</b> 40 000 − 65 536 = <b>−25 536</b>.</p>
<p>La regla: el resultado es el valor real módulo 2¹⁶, reinterpretado en el rango con signo. Y lo más peligroso es que el programa no se detiene: sigue calculando con esos números.</p>` },
        { n: 4, titulo: 'Suma segura',
          enunciado: 'Escribe en pseudocódigo una función <code>sumaSegura(a, b, maximo)</code> que devuelva la suma solo si no desborda, y un código de error si lo haría. No debes calcular <code>a + b</code> para comprobarlo. Considera también los negativos.',
          pista: 'Si a y b son positivos, desbordaría cuando a > maximo − b. Hazlo sin sumar.',
          solucion: `${cod('pseudo', `Funcion ok <- sumaSegura(a, b, maximo, minimo)
	// ok = 1 si la suma cabe; devolvemos el resultado por referencia aparte
	Si a > 0 Y b > 0 Entonces
		Si a > maximo - b Entonces      // nunca calculamos a+b
			ok <- 0
		Sino
			ok <- 1
		FinSi
	Sino
		Si a < 0 Y b < 0 Entonces
			Si a < minimo - b Entonces
				ok <- 0
			Sino
				ok <- 1
			FinSi
		Sino
			ok <- 1    // signos distintos: el resultado está entre a y b, nunca desborda
		FinSi
	FinSi
FinFuncion`)}
<p>La idea clave está en la línea <code>a &gt; maximo - b</code>: es la misma desigualdad que <code>a + b &gt; maximo</code> despejada, pero el lado derecho <b>sí cabe</b> en el tipo porque <code>maximo - b</code> con b positivo nunca desborda. Reescribir una comparación para que ningún término intermedio se salga del rango es una técnica que se usa de verdad en bibliotecas numéricas.</p>
<p>El tercer caso merece atención: si los signos son distintos, el resultado está entre <code>a</code> y <code>b</code>, y ambos caben; por lo tanto la suma cabe. Razonar así evita comprobaciones innecesarias.</p>` },
        { n: 5, titulo: 'El bug del Ariane 5',
          enunciado: 'Un sensor entrega la velocidad horizontal como un real de 64 bits. El software la convierte a un entero con signo de 16 bits para enviarla por un bus antiguo. (a) ¿A partir de qué velocidad falla? (b) Propón tres defensas distintas y di qué sacrifica cada una. (c) ¿Por qué el código había funcionado perfectamente durante años en el Ariane 4?',
          pista: 'El rango de un entero de 16 bits con signo llega a 32 767. Piensa también en qué cambió entre un cohete y el otro.',
          solucion: `<p><b>(a)</b> Falla en cuanto el valor convertido supera <b>32 767</b> (o baja de −32 768). Cualquier velocidad por encima de ese número en las unidades internas produce un valor truncado sin relación con la realidad.</p>
<p><b>(b) Tres defensas:</b></p>
<ol>
<li><b>Validar antes de convertir</b> (<code>Si v &gt; 32767 Entonces usar 32767 y marcar saturación</code>). Sacrificio: pierdes precisión en el extremo, pero el sistema sigue volando con un valor plausible. Esto se llama <i>saturación</i> y es lo que hace el procesamiento de audio y video.</li>
<li><b>Usar un tipo más grande</b> (32 bits). Sacrificio: hay que cambiar el bus y el protocolo, es decir, hardware y compatibilidad.</li>
<li><b>Escalar las unidades</b> (guardar decímetros por segundo en lugar de milímetros). Sacrificio: menos resolución para valores pequeños, y hay que cambiar todos los consumidores del dato.</li>
</ol>
<p><b>(c)</b> Porque el Ariane 4 era un cohete más lento: su trayectoria nunca generaba un valor fuera de rango, así que la conversión jamás desbordó. El código se reutilizó sin volver a analizar sus supuestos en un vehículo más potente. La lección no es sobre enteros: es que <b>un programa correcto lo es solo respecto a los supuestos con los que se escribió</b>, y reutilizar código significa heredar esos supuestos. Documenta los rangos válidos de tus funciones; son parte del contrato, no un comentario decorativo.</p>` }
      ],
      quiz: [
        { p: 'En complemento a dos de 8 bits, <code>1111 1111</code> representa…',
          ops: ['255', '−1', '−127', '−128'],
          ok: 1, exp: 'Con los pesos: −128+64+32+16+8+4+2+1 = −1. El −1 es «todos unos» en cualquier tamaño.' },
        { p: '¿Por qué el rango de 8 bits con signo es −128 a +127 y no −127 a +127?',
          ops: ['Por un error histórico del estándar', 'Porque el cero ocupa una de las 256 combinaciones del lado positivo',
            'Porque −128 es más útil que +128', 'Porque el bit de signo se desperdicia'],
          ok: 1, exp: 'Hay 256 combinaciones: una para el cero y las 255 restantes repartidas en 128 negativos y 127 positivos.' },
        { p: 'El bucle <code>for (unsigned i = 10; i >= 0; i--)</code>…',
          ops: ['recorre del 10 al 0 correctamente', 'no entra nunca', 'es infinito porque un entero sin signo nunca es menor que 0', 'da error de compilación'],
          ok: 2, exp: 'Al llegar a 0 y decrementar, i se convierte en el máximo del tipo. La condición <code>i >= 0</code> es siempre verdadera para un tipo sin signo.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-4',
      titulo: 'Números reales: IEEE 754 y por qué 0,1 + 0,2 ≠ 0,3',
      resumen: 'Coma flotante, signo-exponente-mantisa, errores de redondeo y cómo comparar reales sin equivocarse.',
      objetivos: [
        'Describir los tres campos de un número en coma flotante',
        'Explicar por qué ciertos decimales no son exactos en binario',
        'Comparar números reales correctamente y elegir el tipo adecuado para dinero'
      ],
      lectura: `
<p>Abre la consola de cualquier navegador y escribe <code>0.1 + 0.2</code>. La respuesta es
<code>0.30000000000000004</code>. No es un error del navegador ni de JavaScript: lo mismo ocurre en Python, Java, C y
Excel. Es una consecuencia inevitable de cómo se guardan los números con decimales, y entenderla te va a evitar horas de
desconcierto.</p>

<h2>Notación científica en binario</h2>
<p>La idea de la <strong>coma flotante</strong> es la notación científica: en lugar de guardar todos los dígitos, se
guarda un valor significativo y un exponente que indica dónde va la coma. En decimal, 6 370 000 se escribe
<code>6,37 × 10⁶</code>. En binario es igual, con base 2:</p>

<p style="text-align:center;font-family:var(--f-mono)">valor = (−1)<sup>signo</sup> × 1,mantisa × 2<sup>exponente</sup></p>

<p>El estándar <strong>IEEE 754</strong> (1985) fija cómo se reparten los bits. El formato de doble precisión, que es el
que usa por defecto casi todo (el <code>double</code> de C y Java, el <code>float</code> de Python, todos los números de
JavaScript), reparte 64 bits así:</p>

${fig(`<svg viewBox="0 0 560 120" width="560" height="120" role="img" aria-label="Campos de un número IEEE 754 de doble precisión">
<g color="var(--fg-soft)">
<rect x="12" y="30" width="40" height="40" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.5"/>
<rect x="52" y="30" width="130" height="40" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
<rect x="182" y="30" width="366" height="40" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.5"/>
<text x="32" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">S</text>
<text x="117" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Exponente</text>
<text x="365" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Mantisa (fracción)</text>
<text x="32" y="88" text-anchor="middle" font-size="11" fill="var(--fg-soft)">1 bit</text>
<text x="117" y="88" text-anchor="middle" font-size="11" fill="var(--fg-soft)">11 bits</text>
<text x="365" y="88" text-anchor="middle" font-size="11" fill="var(--fg-soft)">52 bits</text>
<text x="32" y="104" text-anchor="middle" font-size="10" fill="var(--fg-soft)">signo</text>
<text x="117" y="104" text-anchor="middle" font-size="10" fill="var(--fg-soft)">sesgo 1023</text>
<text x="365" y="104" text-anchor="middle" font-size="10" fill="var(--fg-soft)">≈ 15-17 dígitos decimales</text>
<text x="20" y="22" font-size="10" fill="var(--fg-soft)">bit 63</text>
<text x="520" y="22" font-size="10" fill="var(--fg-soft)">bit 0</text>
</g></svg>`, 'Los 64 bits de un double: 1 de signo, 11 de exponente y 52 de mantisa.')}

${tabla(['Formato', '#Bits', 'Signo', 'Exponente', 'Mantisa', 'Dígitos decimales fiables'], [
  ['Media (<code>half</code>)', '16', '1', '5', '10', '~3'],
  ['Simple (<code>float</code>)', '32', '1', '8', '23', '~7'],
  ['Doble (<code>double</code>)', '64', '1', '11', '52', '~15–17'],
  ['Cuádruple', '128', '1', '15', '112', '~34']
], 'Cuanta más mantisa, más precisión; cuanto más exponente, más rango. Son dos cosas distintas.')}

<p>Dos detalles ingeniosos del estándar: el <strong>1 implícito</strong> (como todo número normalizado empieza por
<code>1,</code>, ese bit no se guarda y se gana un bit gratis de precisión) y el <strong>exponente sesgado</strong>
(se guarda el exponente real más 1023, para que los exponentes negativos no necesiten signo y los números se puedan
comparar como si fueran enteros).</p>

<h2>Por qué 0,1 no es 0,1</h2>
<p>Como viste en la lección anterior, <code>0,1</code> en binario es <code>0,0001100110011…</code> periódico. Al
guardarlo en 52 bits de mantisa hay que <strong>cortar</strong>, y lo que queda almacenado no es 0,1 sino:</p>

<p style="text-align:center;font-family:var(--f-mono)">0,1000000000000000055511151231257827…</p>

<p>El mismo redondeo le pasa a 0,2. Al sumar los dos valores almacenados, los errores no se cancelan: se acumulan, y el
resultado más cercano representable es <code>0,30000000000000004</code>. Nada falló; simplemente pediste guardar algo
que no cabe.</p>

${nota('La regla práctica más importante de esta lección',
  '<p><strong>Nunca compares dos números reales con <code>=</code>.</strong> Compara si su diferencia es menor que una ' +
  'tolerancia pequeña: en lugar de <code>Si a = b</code>, escribe <code>Si abs(a − b) &lt; 0.000001</code>. ' +
  'Esa tolerancia se llama <em>epsilon</em>.</p>', 'key')}

<h2>Los valores especiales</h2>
<p>El estándar reserva combinaciones de exponente para casos límite, y por eso las operaciones «imposibles» no siempre
detienen el programa:</p>
${tabla(['Valor', 'Cuándo aparece', 'Comportamiento'], [
  ['<code>+Infinity</code>', '<code>1.0 / 0.0</code>, desbordamiento', 'Sigue operando: <code>Inf + 1 = Inf</code>'],
  ['<code>−Infinity</code>', '<code>−1.0 / 0.0</code>', 'Igual, con signo'],
  ['<code>NaN</code> (<i>Not a Number</i>)', '<code>0.0/0.0</code>, <code>raiz(−1)</code>, <code>Inf − Inf</code>', '<b>Contagia</b>: cualquier operación con NaN da NaN'],
  ['<code>−0.0</code>', 'Resultados negativos muy pequeños', '<code>−0.0 = 0.0</code> es verdadero, pero <code>1/−0.0 = −Inf</code>']
], 'NaN tiene una propiedad única en toda la aritmética: no es igual a sí mismo. <code>NaN = NaN</code> es falso, y de hecho así se detecta.')}

<p>El contagio de <code>NaN</code> es una fuente clásica de desconcierto: un solo dato corrupto en una planilla
convierte todos los promedios en <code>NaN</code>, y rastrear de dónde salió exige revisar la entrada, no el cálculo.</p>

<h2>El error se acumula</h2>
<p>Sumar 0,1 diez mil veces no da 1000. Da 1000,0000000001588… El error de cada redondeo se suma. En cálculos
financieros o científicos largos esto importa, y hay técnicas para controlarlo (sumar de menor a mayor, usar la
suma compensada de Kahan, reordenar las operaciones). La regla general: <strong>sumar números de magnitudes muy
distintas destruye precisión</strong>, porque el pequeño se redondea a nada frente al grande.</p>

<h2>Nunca uses reales para dinero</h2>
<p>Esta es la aplicación práctica más valiosa de toda la lección. <code>19.99</code> no se puede guardar exacto, y después
de miles de operaciones los céntimos no cuadran. Hay dos soluciones correctas:</p>
<ol>
  <li><strong>Enteros en la unidad mínima:</strong> guarda <strong>céntimos</strong> en un entero. 19,99 soles se
  almacena como <code>1999</code>. Toda la aritmética es exacta y solo divides entre 100 al mostrar.</li>
  <li><strong>Tipos decimales:</strong> <code>DECIMAL(10,2)</code> en SQL, <code>decimal</code> en C#,
  <code>BigDecimal</code> en Java, el módulo <code>decimal</code> en Python. Guardan los dígitos en base 10 y son
  exactos para decimales, a cambio de ser más lentos.</li>
</ol>

${cod('python', `# MAL: errores de céntimos que se acumulan
total = 0.0
for i in range(1000):
    total += 19.99
print(total)            # 19989.999999999923

# BIEN: enteros en céntimos
total_centimos = 0
for i in range(1000):
    total_centimos += 1999
print(total_centimos / 100)   # 19990.0 exacto`)}

${nota('Pruébalo ahora', '<p>En la herramienta <a href="#herramientas">Bits con signo y reales</a> escribe 0.1 y mira sus ' +
  '64 bits reales: el signo, el exponente sesgado y la mantisa recortada. Prueba también 0.5 y 0.75, que sí son exactos, ' +
  'y compara las mantisas.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Exactos e inexactos',
          enunciado: '¿Cuáles de estos valores se pueden guardar <b>exactamente</b> en binario con coma flotante? 0,5 · 0,25 · 0,1 · 0,75 · 0,2 · 3,5 · 1/3 · 2,125',
          pista: 'Una fracción es exacta en binario si su denominador simplificado es una potencia de 2.',
          solucion: `<p><b>Exactos:</b> 0,5 (=1/2), 0,25 (=1/4), 0,75 (=3/4), 3,5 (=7/2), 2,125 (=17/8). Todos tienen denominador potencia de 2.</p>
<p><b>Inexactos:</b> 0,1 (=1/10, el 10 tiene un factor 5), 0,2 (=1/5), 1/3. Sus representaciones binarias son periódicas infinitas y hay que truncarlas.</p>
<p>Regla general: simplifica la fracción; si el denominador solo tiene factores 2, es exacta.</p>` },
        { n: 2, titulo: 'Compara correctamente',
          enunciado: 'Este fragmento no entra nunca al <code>Si</code>. Explica por qué y corrígelo.<br><code>x ← 0.1 + 0.2</code><br><code>Si x = 0.3 Entonces Escribir "iguales" FinSi</code>',
          pista: 'Compara la diferencia con una tolerancia en lugar de comparar por igualdad.',
          lab: 'Algoritmo CompararReales\n\tDefinir x, epsilon Como Real\n\tx <- 0.1 + 0.2\n\tepsilon <- 0.000001\n\tSi abs(x - 0.3) < epsilon Entonces\n\t\tEscribir "Son iguales dentro de la tolerancia"\n\tSino\n\t\tEscribir "Distintos"\n\tFinSi\n\tEscribir "La diferencia real es: ", x - 0.3\nFinAlgoritmo',
          solucion: `<p><b>Por qué falla:</b> <code>0.1</code> y <code>0.2</code> se guardan con un pequeño error de redondeo; su suma almacenada es 0,30000000000000004, que no es el valor almacenado para <code>0.3</code>. La comparación por igualdad compara patrones de bits, y son distintos.</p>
<p><b>Corregido:</b></p>
${cod('pseudo', `Definir x, epsilon Como Real
x <- 0.1 + 0.2
epsilon <- 0.000001              // tolerancia
Si abs(x - 0.3) < epsilon Entonces
	Escribir "iguales"
FinSi`)}
<p>Elegir el epsilon no es trivial: una tolerancia absoluta como <code>1e-6</code> sirve para números cercanos a 1, pero es absurda para magnitudes de 10⁹ (donde el error representable ya es mayor) o de 10⁻¹² (donde descarta diferencias reales). En código serio se usa una <b>tolerancia relativa</b>: <code>abs(a−b) ≤ epsilon × max(abs(a), abs(b))</code>.</p>` },
        { n: 3, titulo: 'Rango y precisión',
          enunciado: 'Un <code>float</code> de 32 bits tiene 23 bits de mantisa (24 contando el 1 implícito). (a) ¿Cuál es el mayor entero que puede representar sin perder exactitud? (b) ¿Qué pasa al sumarle 1 a ese número más uno? (c) ¿Por qué un <code>double</code> es seguro para enteros hasta 2⁵³?',
          pista: 'Con m bits de mantisa, todos los enteros hasta 2^m son representables exactamente.',
          solucion: `<p><b>(a)</b> Con 24 bits de significando, todos los enteros de 0 a <code>2²⁴ = 16 777 216</code> son exactos.</p>
<p><b>(b)</b> <code>16777216 + 1</code> no es representable: el siguiente valor disponible es 16 777 218, así que el resultado se redondea a 16 777 216. Es decir, <b>sumar 1 no cambia nada</b>. Un bucle <code>mientras x &lt; 20000000: x = x + 1</code> con un float de 32 bits no termina nunca.</p>
<p><b>(c)</b> Un <code>double</code> tiene 53 bits de significando, así que todos los enteros hasta <code>2⁵³ = 9 007 199 254 740 992</code> son exactos. Por eso JavaScript, que solo tiene doubles, puede manejar enteros con seguridad hasta ese límite (<code>Number.MAX_SAFE_INTEGER</code>), y por eso los identificadores de bases de datos grandes se transmiten como texto y no como número en JSON: un ID de 64 bits perdería precisión.</p>` },
        { n: 4, titulo: 'Dinero bien hecho',
          enunciado: 'Escribe en pseudocódigo el cálculo de una boleta con 3 productos (precio unitario y cantidad), aplicando 18% de IGV, usando enteros en céntimos para que no se pierda ni un céntimo. Muestra el subtotal, el IGV y el total con dos decimales.',
          pista: 'Trabaja todo en céntimos enteros y divide entre 100 solo al mostrar. Cuidado con el redondeo del IGV.',
          solucion: `${cod('pseudo', `Algoritmo BoletaExacta
	Definir i, cant, precioCent, subtotalCent, igvCent, totalCent Como Entero
	subtotalCent <- 0
	Para i <- 1 Hasta 3 Con Paso 1 Hacer
		Escribir "Precio unitario en céntimos (ej. 1999 = S/ 19.99):"
		Leer precioCent
		Escribir "Cantidad:"
		Leer cant
		subtotalCent <- subtotalCent + precioCent * cant
	FinPara
	// IGV 18%: multiplicamos por 18 y dividimos entre 100 con redondeo al céntimo
	igvCent <- trunc((subtotalCent * 18 + 50) / 100)
	totalCent <- subtotalCent + igvCent
	Escribir "Subtotal: S/ ", trunc(subtotalCent / 100), ".", subtotalCent MOD 100
	Escribir "IGV:      S/ ", trunc(igvCent / 100), ".", igvCent MOD 100
	Escribir "Total:    S/ ", trunc(totalCent / 100), ".", totalCent MOD 100
FinAlgoritmo`)}
<p>Tres puntos finos:</p>
<ul>
<li><b>Multiplicar antes de dividir.</b> <code>(subtotal × 18) / 100</code> conserva precisión; <code>subtotal × (18/100)</code> introduce un real y arruina la exactitud.</li>
<li><b>El <code>+ 50</code></b> antes de dividir entre 100 implementa el redondeo al céntimo más cercano con aritmética entera (es el equivalente a sumar 0,5 antes de truncar).</li>
<li><b>La regla de redondeo es una decisión del negocio</b>, no del programador: hacia arriba, al par, o truncando. En facturación electrónica suele estar normado, y hay que seguir la norma, no la intuición.</li>
</ul>` },
        { n: 5, titulo: 'Pérdida catastrófica de precisión',
          enunciado: 'Con un <code>double</code>, calcula <code>(1e16 + 1) − 1e16</code> y explica por qué el resultado es 0 en lugar de 1. Luego explica qué estrategia usarías para sumar un millón de números de magnitudes muy distintas sin perder precisión, y por qué funciona.',
          pista: 'Piensa en cuántos dígitos significativos tiene un double y qué le pasa al 1 frente a 10¹⁶.',
          solucion: `<p><b>Por qué da 0:</b> un <code>double</code> tiene unos 15–17 dígitos decimales significativos. El número 10¹⁶ ya ocupa 17 dígitos, así que el «+1» cae fuera de la precisión disponible: el valor representable más cercano a 10¹⁶+1 es exactamente 10¹⁶. El 1 se pierde en el redondeo <i>antes</i> de la resta, y después se resta 10¹⁶ de 10¹⁶. Resultado: 0.</p>
<p>Esto se llama <b>absorción</b>: al sumar un número pequeño a uno muy grande, el pequeño desaparece. Y lo que viene después, la <b>cancelación catastrófica</b>, es peor: al restar dos números casi iguales, los dígitos significativos se cancelan y lo que queda es puro error de redondeo amplificado.</p>
<p><b>Estrategias para sumar un millón de valores:</b></p>
<ol>
<li><b>Ordenar de menor a mayor</b> y sumar en ese orden: los pequeños se agrupan entre sí y crecen juntos antes de encontrarse con los grandes, en lugar de ser absorbidos uno por uno.</li>
<li><b>Suma por pares</b> (<i>pairwise</i>): sumar de dos en dos, luego los resultados de dos en dos, como un torneo. El error crece como log n en lugar de n, y es lo que hace NumPy internamente.</li>
<li><b>Suma compensada de Kahan</b>: se lleva una variable extra que acumula el error perdido en cada paso y se reinyecta en la siguiente suma. Mantiene el error prácticamente constante sin importar cuántos términos sumes.</li>
</ol>
${cod('pseudo', `// Suma de Kahan: 'c' arrastra el error de redondeo
suma <- 0
c <- 0
Para i <- 1 Hasta n Con Paso 1 Hacer
	y <- dato[i] - c           // corrige con el error pendiente
	t <- suma + y
	c <- (t - suma) - y        // lo que se perdió al sumar
	suma <- t
FinPara`)}
<p>Este es el tipo de código que parece no hacer nada (matemáticamente <code>c</code> siempre valdría 0) pero existe precisamente porque la aritmética de la máquina no es la de la matemática.</p>` }
      ],
      quiz: [
        { p: '¿Por qué <code>0.1 + 0.2</code> no da exactamente <code>0.3</code>?',
          ops: ['Es un bug del lenguaje', 'Porque 0,1 y 0,2 no tienen representación binaria finita y se redondean',
            'Porque falta precisión en el procesador', 'Porque se usan enteros internamente'],
          ok: 1, exp: 'Ambos son periódicos en binario. Se guardan redondeados y los errores se acumulan al sumar. Pasa igual en todos los lenguajes que usan IEEE 754.' },
        { p: 'Para guardar importes de dinero, lo correcto es…',
          ops: ['un <code>float</code>', 'un <code>double</code>, que tiene más precisión',
            'un entero en céntimos o un tipo decimal', 'texto'],
          ok: 2, exp: 'Los reales binarios no pueden representar exactamente valores como 19,99. Con enteros en céntimos o un tipo decimal la aritmética es exacta.' },
        { p: '¿Cuál de estas afirmaciones sobre <code>NaN</code> es cierta?',
          ops: ['<code>NaN = NaN</code> es verdadero', '<code>NaN</code> no es igual a sí mismo',
            '<code>NaN</code> detiene el programa', '<code>NaN</code> vale 0 al operar'],
          ok: 1, exp: 'Es el único valor de la aritmética que no es igual a sí mismo, y así se lo detecta. Además contagia: cualquier operación con NaN produce NaN.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-5',
      titulo: 'Texto: ASCII, Unicode y UTF-8',
      resumen: 'Cómo se guardan las letras, por qué aparecen los caracteres raros y por qué contar letras no es contar bytes.',
      objetivos: [
        'Explicar la diferencia entre un juego de caracteres y una codificación',
        'Entender cómo funciona UTF-8 y por qué es de longitud variable',
        'Diagnosticar y prevenir los problemas de «caracteres raros»'
      ],
      lectura: `
<p>Una computadora solo guarda números, así que para guardar texto hace falta un acuerdo: qué número representa cada
letra. Ese acuerdo tiene dos partes que conviene no confundir:</p>
<ul>
  <li>Un <strong>juego de caracteres</strong> (<em>charset</em>) asigna un número a cada símbolo. Unicode dice que la
  letra <code>Ñ</code> es el número 209.</li>
  <li>Una <strong>codificación</strong> (<em>encoding</em>) dice cómo se escribe ese número en bytes. UTF-8 escribe el 209
  como dos bytes: <code>C3 91</code>.</li>
</ul>
<p>Casi todos los problemas de texto vienen de leer unos bytes con la codificación equivocada.</p>

<h2>ASCII: 7 bits y el mundo en inglés</h2>
<p>ASCII (1963) usa 7 bits, o sea 128 códigos: 33 de control (salto de línea, tabulación, el antiguo «campana»), el
espacio, los dígitos, los signos de puntuación y las 26 letras del alfabeto inglés en mayúscula y minúscula. Su diseño
tiene detalles deliberadamente útiles:</p>
<ul>
  <li>Los dígitos <code>0</code> a <code>9</code> son 48 a 57 <strong>consecutivos</strong>: para convertir el carácter
  <code>'7'</code> en el número 7, se le resta 48 (o el código de <code>'0'</code>). Ese truco se usa en todos los
  conversores de texto a número del mundo.</li>
  <li><code>A</code> a <code>Z</code> son 65 a 90 y <code>a</code> a <code>z</code> son 97 a 122: la diferencia es
  exactamente 32, que es <code>0010 0000</code>. Cambiar de mayúscula a minúscula es activar un solo bit.</li>
  <li>Las letras están en orden alfabético, así que comparar códigos ordena palabras (en inglés; con tildes y ñ, no).</li>
</ul>

${tabla(['Carácter', '#Decimal', '#Hex', '#Binario'], [
  ['<code>(espacio)</code>', '32', '20', '0100000'], ['<code>0</code>', '48', '30', '0110000'],
  ['<code>9</code>', '57', '39', '0111001'], ['<code>A</code>', '65', '41', '1000001'],
  ['<code>Z</code>', '90', '5A', '1011010'], ['<code>a</code>', '97', '61', '1100001'],
  ['<code>z</code>', '122', '7A', '1111010'], ['<code>\\n</code> (salto de línea)', '10', '0A', '0001010']
], 'Códigos ASCII que conviene reconocer. Nota la distancia de 32 entre mayúsculas y minúsculas.')}

<h2>El caos de las páginas de código</h2>
<p>ASCII no tiene Ñ, ni tildes, ni ¿, ni ¡. Al sobrar un bit del byte, cada región inventó su propio uso para los códigos
128 a 255: Latin-1 para Europa occidental, Windows-1252, KOI8-R para el ruso, Shift-JIS para el japonés… El resultado es
que el byte 241 era <code>ñ</code> en una máquina y otra cosa en otra. Si abrías un archivo con la página equivocada
veías <code>Ma&#xFFFD;ana</code> o <code>MaÃ±ana</code>. Y para los idiomas con miles de caracteres, 256 códigos no alcanzaban
de ninguna manera.</p>

<h2>Unicode: un número para cada carácter del mundo</h2>
<p>Unicode (1991) asigna un número único, llamado <strong>punto de código</strong> y escrito <code>U+XXXX</code>, a cada
carácter de cada sistema de escritura: latino, árabe, chino, cirílico, jeroglíficos egipcios, símbolos matemáticos,
emojis. Hoy cubre más de 149 000 caracteres y tiene espacio para más de un millón.</p>

${tabla(['Carácter', 'Punto de código', 'Nombre'], [
  ['<code>A</code>', 'U+0041', 'LATIN CAPITAL LETTER A'],
  ['<code>ñ</code>', 'U+00F1', 'LATIN SMALL LETTER N WITH TILDE'],
  ['<code>€</code>', 'U+20AC', 'EURO SIGN'],
  ['<code>漢</code>', 'U+6F22', 'ideograma CJK'],
  ['<code>😀</code>', 'U+1F600', 'GRINNING FACE']
], 'Unicode solo dice qué número le toca a cada carácter. Cómo se escriben esos números en bytes es otro problema.')}

<h2>UTF-8: la codificación que ganó</h2>
<p>UTF-8 (Thompson y Pike, 1992) es de <strong>longitud variable</strong>: usa de 1 a 4 bytes según el carácter, y está
diseñada con una astucia que explica su dominio absoluto en la web:</p>

${tabla(['Rango Unicode', '#Bytes', 'Patrón de bits', 'Ejemplo'], [
  ['U+0000 – U+007F', '1', '<code>0xxxxxxx</code>', '<code>A</code> → <code>41</code>'],
  ['U+0080 – U+07FF', '2', '<code>110xxxxx 10xxxxxx</code>', '<code>ñ</code> → <code>C3 B1</code>'],
  ['U+0800 – U+FFFF', '3', '<code>1110xxxx 10xxxxxx 10xxxxxx</code>', '<code>漢</code> → <code>E6 BC A2</code>'],
  ['U+10000 – U+10FFFF', '4', '<code>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</code>', '<code>😀</code> → <code>F0 9F 98 80</code>']
], 'Las marcas 10xxxxxx de continuación permiten saber, desde cualquier byte, si estás al inicio de un carácter o en medio de uno.')}

<p>Las propiedades que lo hicieron universal:</p>
<ul>
  <li><strong>Compatible con ASCII.</strong> Los 128 primeros caracteres se codifican con el mismo byte de siempre, así que
  todo archivo ASCII ya es UTF-8 válido. La migración no rompió nada.</li>
  <li><strong>Autosincronizable.</strong> Si te pierdes en medio de un flujo, solo tienes que avanzar hasta un byte que no
  empiece por <code>10</code>: ahí comienza un carácter. Un byte corrupto no arruina el resto del archivo.</li>
  <li><strong>Sin orden de bytes.</strong> No tiene el problema <em>endianness</em> de UTF-16, que necesita una marca
  (BOM) para saber si los bytes vienen al revés.</li>
  <li><strong>Económico</strong> para texto latino, que es la mayoría del texto de la web.</li>
</ul>

<h2>Las consecuencias prácticas</h2>
<p><strong>1. Contar letras no es contar bytes.</strong> La palabra <code>"Ñandú"</code> tiene 5 caracteres pero 7 bytes
en UTF-8. Cortar una cadena por bytes puede partir un carácter en dos y producir basura. Siempre usa las funciones de
cadena del lenguaje, no manipulación de bytes.</p>

<p><strong>2. Un «carácter» puede ser más de un punto de código.</strong> La <code>é</code> puede ser U+00E9 (un solo
punto) o <code>e</code> + U+0301 (la e seguida de un acento combinante): se ven igual y no son iguales para el
computador. Y una familia emoji 👨‍👩‍👧 son varios emojis unidos por caracteres invisibles: un solo «carácter» visible
que ocupa 25 bytes. Por eso existe la <em>normalización</em> Unicode (NFC y NFD), que es obligatoria antes de comparar
nombres o contraseñas.</p>

<p><strong>3. Los «caracteres raros» tienen diagnóstico.</strong> Si ves <code>Ã±</code> donde debía haber
<code>ñ</code>, estás leyendo bytes UTF-8 interpretándolos como Latin-1. Si ves <code>&#xFFFD;</code>, el decodificador
encontró una secuencia inválida y la sustituyó. La solución nunca es reemplazar letra por letra: es declarar bien la
codificación en todos los puntos de la cadena (base de datos, conexión, archivo, cabecera HTTP y
<code>&lt;meta charset="utf-8"&gt;</code>).</p>

${nota('Pruébalo ahora', '<p>Abre la herramienta <a href="#herramientas">Texto a bytes</a> del laboratorio y escribe tu ' +
  'nombre con tildes, una ñ y un emoji. Vas a ver el punto de código, el ASCII cuando aplica y los bytes UTF-8 reales ' +
  'de cada carácter, con el total.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'De carácter a número',
          enunciado: 'Usando la tabla ASCII: (a) ¿qué número es la letra <code>M</code>? (b) ¿qué letra es el 115? (c) ¿Cómo convertirías el carácter <code>\'8\'</code> en el número 8 con una resta?',
          pista: 'A=65, a=97, 0=48.',
          solucion: `<p><b>(a)</b> <code>M</code> es la 13.ª letra: 65 + 12 = <b>77</b>.</p>
<p><b>(b)</b> 115 − 97 = 18, así que es la 19.ª minúscula: <b>s</b>.</p>
<p><b>(c)</b> <code>'8'</code> es 56, y <code>'0'</code> es 48, así que <code>56 − 48 = 8</code>. La forma correcta de escribirlo es <code>codigo(c) − codigo('0')</code>, nunca <code>codigo(c) − 48</code>: así el código dice <i>por qué</i> resta y no depende de recordar el número.</p>` },
        { n: 2, titulo: 'Diagnostica el texto roto',
          enunciado: 'Una página muestra «CorazÃ³n» donde debía decir «Corazón». Explica exactamente qué ocurrió con los bytes y cómo se arregla.',
          pista: 'La ó en UTF-8 son dos bytes. ¿Qué pasa si se interpretan uno por uno como Latin-1?',
          solucion: `<p>La <code>ó</code> (U+00F3) se codificó correctamente en UTF-8 como los dos bytes <code>C3 B3</code>. Pero el navegador o el programa que leyó el archivo asumió Latin-1, donde cada byte es un carácter: <code>C3</code> es <code>Ã</code> y <code>B3</code> es <code>³</code>. De ahí sale «Ã³».</p>
<p><b>Arreglo:</b> declarar UTF-8 en todos los eslabones de la cadena, porque basta que uno falle:</p>
<ul>
<li><code>&lt;meta charset="utf-8"&gt;</code> en el HTML, lo más arriba posible del <code>&lt;head&gt;</code>.</li>
<li>Cabecera HTTP <code>Content-Type: text/html; charset=utf-8</code> (tiene prioridad sobre el meta).</li>
<li>El archivo fuente guardado como UTF-8 sin BOM.</li>
<li>La base de datos y la conexión en <code>utf8mb4</code> (en MySQL, <code>utf8</code> a secas no cubre los emojis).</li>
</ul>
<p>Lo que <b>no</b> se debe hacer es reemplazar «Ã³» por «ó» con un buscar-y-reemplazar: eso arregla el síntoma, deja el resto roto y crea datos doblemente corruptos (<i>mojibake</i> anidado) que ya no se pueden recuperar automáticamente.</p>` },
        { n: 3, titulo: 'Cuenta bytes',
          enunciado: 'Calcula cuántos bytes ocupa en UTF-8 cada cadena y cuántos caracteres tiene: (a) <code>"Hola"</code>; (b) <code>"Mañana"</code>; (c) <code>"día 1"</code>; (d) <code>"Perú 🇵🇪"</code> (la bandera son dos puntos de código de 4 bytes cada uno).',
          pista: 'ASCII = 1 byte; letras acentuadas y ñ = 2 bytes; emojis = 4 bytes.',
          solucion: `${tabla(['Cadena', '#Caracteres', '#Bytes', 'Detalle'], [
  ['<code>"Hola"</code>', '4', '4', 'todo ASCII'],
  ['<code>"Mañana"</code>', '6', '7', 'la ñ aporta 2 bytes'],
  ['<code>"día 1"</code>', '5', '6', 'la í aporta 2 bytes'],
  ['<code>"Perú 🇵🇪"</code>', '5 + 2 = 7', '4+2+1+4+4 = 15', 'ú son 2 bytes; la bandera son 2 puntos de 4 bytes']
])}
<p>El caso (d) es especialmente instructivo: la bandera es un <b>único glifo visible</b> formado por dos «indicadores regionales» (P y E). Según cómo cuentes, esa cadena tiene 7 puntos de código, 15 bytes o 6 caracteres percibidos por un humano. Las tres respuestas son correctas para preguntas distintas, y una validación de «máximo 20 caracteres» tiene que decidir cuál usa.</p>` },
        { n: 4, titulo: 'Mayúsculas con un bit',
          enunciado: 'Escribe un algoritmo que convierta una letra minúscula del alfabeto inglés a mayúscula sin usar la función <code>Mayusculas</code>, operando sobre su código. Luego explica por qué ese método falla con <code>ñ</code> y con <code>á</code>.',
          pista: 'La diferencia entre una minúscula y su mayúscula es 32 en ASCII.',
          solucion: `${cod('pseudo', `Funcion r <- aMayuscula(c)
	Definir cod Como Entero
	cod <- codigoAscii(c)                    // en PSeInt: Asc(c)
	Si cod >= 97 Y cod <= 122 Entonces       // es minúscula a-z
		r <- caracterDe(cod - 32)
	Sino
		r <- c                               // no se toca
	FinSi
FinFuncion`)}
<p><b>Por qué falla con ñ y á:</b> la relación «−32» solo existe para el bloque ASCII a–z. La <code>ñ</code> es U+00F1 y su mayúscula <code>Ñ</code> es U+00D1: la diferencia también es 32 por casualidad en Latin-1, pero en UTF-8 son <i>dos bytes</i>, así que operar sobre un byte no sirve. Y hay casos donde la relación no es aritmética en absoluto:</p>
<ul>
<li>La <code>ß</code> alemana en mayúscula es <code>SS</code>: <b>un carácter se convierte en dos</b>.</li>
<li>En turco, la mayúscula de <code>i</code> es <code>İ</code> (con punto), no <code>I</code>. Un <code>toUpperCase()</code> sin configuración regional rompe el turco, y es un bug real y famoso.</li>
</ul>
<p>Conclusión profesional: usa siempre las funciones de cadena del lenguaje, que conocen Unicode y la configuración regional. La aritmética de códigos solo es válida en ASCII, y conviene saberla para entender qué ocurre por debajo, no para escribirla en producción.</p>` },
        { n: 5, titulo: 'Decodifica UTF-8 a mano',
          enunciado: 'Decodifica a mano la secuencia de bytes <code>E2 82 AC</code> siguiendo el patrón de 3 bytes de UTF-8, obtén el punto de código y di qué carácter es. Luego explica por qué la secuencia <code>C0 80</code> es inválida en UTF-8 aunque parezca seguir el patrón.',
          pista: 'En el patrón de 3 bytes, los bits útiles son los 4 últimos del primer byte y los 6 últimos de cada byte de continuación.',
          solucion: `<p><b>Decodificación:</b></p>
<pre>E2 = 1110 0010   → patrón 1110xxxx, bits útiles: 0010
82 = 1000 0010   → patrón 10xxxxxx, bits útiles: 000010
AC = 1010 1100   → patrón 10xxxxxx, bits útiles: 101100

Concatenando: 0010 000010 101100 = 0010 0000 1010 1100 = 0x20AC</pre>
<p><code>U+20AC</code> es el <b>signo del euro €</b>.</p>
<p><b>Por qué <code>C0 80</code> es inválido:</b> <code>C0 = 1100 0000</code> y <code>80 = 1000 0000</code> dan los bits útiles <code>00000 000000</code>, es decir el punto de código 0, que debería escribirse con <b>un solo byte</b> (<code>00</code>). UTF-8 exige la <b>codificación más corta posible</b>: cada punto de código tiene una sola representación válida.</p>
<p>Esto no es purismo: las «codificaciones sobrelargas» fueron un vector de ataque real. Un validador que rechazaba la barra <code>/</code> (byte <code>2F</code>) podía ser burlado enviando <code>C0 AF</code>, que decodificadores permisivos traducían igual a <code>/</code>, permitiendo salir del directorio permitido. Por eso el estándar las declaró ilegales y todo decodificador correcto las rechaza. Moraleja: <b>validar después de normalizar</b>, nunca antes.</p>` }
      ],
      quiz: [
        { p: 'La diferencia entre un juego de caracteres y una codificación es que…',
          ops: ['son sinónimos', 'el juego asigna números a los símbolos; la codificación dice cómo se escriben esos números en bytes',
            'el juego es para inglés y la codificación para otros idiomas', 'la codificación es más moderna'],
          ok: 1, exp: 'Unicode es el juego (la ñ es el número 241); UTF-8 es una codificación de ese juego (el 241 se escribe C3 B1).' },
        { p: '¿Cuántos bytes ocupa la palabra «Ñandú» en UTF-8?',
          ops: ['5', '6', '7', '10'],
          ok: 2, exp: 'Ñ y ú ocupan 2 bytes cada una; a, n y d ocupan 1. Total 2+1+1+1+2 = 7 bytes para 5 caracteres.' },
        { p: 'Ver «Ã±» donde debía haber «ñ» significa que…',
          ops: ['el archivo está corrupto', 'se leyeron bytes UTF-8 interpretándolos como Latin-1',
            'falta instalar una fuente', 'el texto se guardó dos veces'],
          ok: 1, exp: 'Los dos bytes de la ñ en UTF-8 (C3 B1) se interpretaron como dos caracteres sueltos de Latin-1. Se arregla declarando bien la codificación, no reemplazando letras.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-6',
      titulo: 'Álgebra de Boole y compuertas lógicas',
      resumen: 'AND, OR, NOT, XOR, tablas de verdad, leyes de De Morgan y cómo esto aparece en tus condiciones if.',
      objetivos: [
        'Construir tablas de verdad de cualquier expresión lógica',
        'Aplicar las leyes de De Morgan para simplificar condiciones',
        'Relacionar las compuertas lógicas con los operadores de un lenguaje'
      ],
      lectura: `
<p>En 1847 George Boole publicó un álgebra con solo dos valores, verdadero y falso, pensando en la lógica del
razonamiento humano. Noventa años después, Claude Shannon se dio cuenta en su tesis de maestría (1937, quizá la tesis
más influyente del siglo XX) de que esa álgebra describía exactamente el comportamiento de los circuitos con relés. Ese
puente entre lógica y electricidad es el fundamento de toda la computación.</p>

<p>Y es el mismo álgebra que usas cuando escribes <code>Si edad &gt;= 18 Y tieneDNI Entonces</code>. No son dos temas:
es uno.</p>

<h2>Las tres operaciones básicas</h2>

${tabla(['#A', '#B', '#A Y B (AND)', '#A O B (OR)', '#NO A (NOT)', '#A XOR B'], [
  ['0', '0', '0', '0', '1', '0'],
  ['0', '1', '0', '1', '1', '1'],
  ['1', '0', '0', '1', '0', '1'],
  ['1', '1', '1', '1', '0', '0']
], 'Las tablas de verdad fundamentales. AND exige las dos; OR se contenta con una; XOR exige exactamente una.')}

<ul>
  <li><strong>AND (Y, conjunción, <code>&amp;&amp;</code>)</strong> es verdadero solo si <em>ambas</em> lo son. Es el
  «y además» del español: «mayor de edad <em>y</em> con documento».</li>
  <li><strong>OR (O, disyunción, <code>||</code>)</strong> es verdadero si <em>al menos una</em> lo es. Cuidado: es el «o»
  inclusivo. «¿Quieres café o té?» en lógica admite «los dos».</li>
  <li><strong>NOT (NO, negación, <code>!</code>)</strong> invierte el valor. Es la única que opera sobre una sola entrada.</li>
  <li><strong>XOR (O exclusivo, <code>^</code>)</strong> es verdadero si son <em>distintas</em>. Es el «o» excluyente:
  «o entras o sales». Tiene una propiedad preciosa: <code>a XOR b XOR b = a</code>, lo que lo hace la base del cifrado
  más simple y de los códigos de detección de errores.</li>
</ul>

<h2>Las compuertas: la lógica hecha circuito</h2>
<p>Cada operación tiene un símbolo de circuito y se construye con unos pocos transistores:</p>

${fig(`<svg viewBox="0 0 580 170" width="580" height="170" role="img" aria-label="Símbolos de las compuertas lógicas AND, OR, NOT, NAND y XOR">
<g color="var(--fg-soft)" stroke="var(--accent)" stroke-width="1.8" fill="var(--surface)">
<path d="M40 30 h26 a26 26 0 0 1 0 52 h-26 z"/>
<path d="M20 42 h20 M20 70 h20 M92 56 h20" stroke="var(--fg-soft)" stroke-width="1.4" fill="none"/>
<path d="M170 30 q30 26 0 52 q34 -4 48 -26 q-14 -22 -48 -26 z"/>
<path d="M150 42 h22 M150 70 h22 M218 56 h20" stroke="var(--fg-soft)" stroke-width="1.4" fill="none"/>
<path d="M290 30 l44 26 l-44 26 z"/>
<circle cx="339" cy="56" r="5"/>
<path d="M270 56 h20 M344 56 h22" stroke="var(--fg-soft)" stroke-width="1.4" fill="none"/>
<path d="M410 30 h26 a26 26 0 0 1 0 52 h-26 z"/>
<circle cx="469" cy="56" r="5"/>
<path d="M390 42 h20 M390 70 h20 M474 56 h18" stroke="var(--fg-soft)" stroke-width="1.4" fill="none"/>
<path d="M520 30 q30 26 0 52 q34 -4 48 -26 q-14 -22 -48 -26 z"/>
<path d="M512 30 q30 26 0 52" fill="none"/>
<path d="M500 42 h12 M500 70 h12" stroke="var(--fg-soft)" stroke-width="1.4" fill="none"/>
</g>
<g fill="var(--fg)" font-size="12" font-weight="700" text-anchor="middle">
<text x="66" y="104">AND</text><text x="188" y="104">OR</text><text x="315" y="104">NOT</text>
<text x="440" y="104">NAND</text><text x="540" y="104">XOR</text>
</g>
<g fill="var(--fg-soft)" font-size="10.5" text-anchor="middle">
<text x="66" y="122">A·B</text><text x="188" y="122">A+B</text><text x="315" y="122">Ā</text>
<text x="440" y="122">universal</text><text x="540" y="122">A⊕B</text>
<text x="290" y="150">El circulito en la salida siempre significa «negado»</text>
</g></svg>`, 'Las cinco compuertas que conviene reconocer. El círculo en la salida indica negación.')}

<p>NAND (AND negada) y NOR tienen una propiedad extraordinaria: son <strong>universales</strong>. Con solo compuertas
NAND se puede construir cualquier función lógica, incluidas AND, OR y NOT. Por eso muchos circuitos integrados reales
están hechos casi exclusivamente de NAND: fabricar un solo tipo de compuerta es más barato.</p>

${cod('txt', `NOT A      = A NAND A
A AND B    = NOT(A NAND B)   = (A NAND B) NAND (A NAND B)
A OR B     = (NOT A) NAND (NOT B)`)}

<h2>Las leyes que vas a usar de verdad</h2>

${tabla(['Ley', 'Forma', 'Para qué sirve en código'], [
  ['Identidad', '<code>A Y 1 = A</code> · <code>A O 0 = A</code>', 'Eliminar condiciones que no aportan'],
  ['Dominación', '<code>A Y 0 = 0</code> · <code>A O 1 = 1</code>', 'Detectar condiciones siempre falsas o siempre verdaderas'],
  ['Idempotencia', '<code>A Y A = A</code>', 'Quitar comprobaciones repetidas'],
  ['Complemento', '<code>A Y NO A = 0</code> · <code>A O NO A = 1</code>', 'Descubrir condiciones imposibles o redundantes'],
  ['Doble negación', '<code>NO (NO A) = A</code>', 'Simplificar <code>!!x</code>'],
  ['Conmutativa', '<code>A Y B = B Y A</code>', 'Reordenar para evaluar primero lo más barato'],
  ['Distributiva', '<code>A Y (B O C) = (A Y B) O (A Y C)</code>', 'Factorizar condiciones largas'],
  ['<b>De Morgan</b>', '<code>NO (A Y B) = NO A O NO B</code>', 'Negar una condición compuesta sin equivocarse'],
  ['<b>De Morgan</b>', '<code>NO (A O B) = NO A Y NO B</code>', 'Lo mismo, al revés']
], 'Las dos leyes de De Morgan son las más útiles del día a día de un programador.')}

<h3>De Morgan en la práctica</h3>
<p>Quieres rechazar a quien no cumpla «mayor de edad <strong>y</strong> con DNI». La negación natural de un principiante
es «menor de edad <strong>y</strong> sin DNI», y está mal: eso solo rechaza a quien falla en las dos cosas. La negación
correcta, por De Morgan, es «menor de edad <strong>o</strong> sin DNI»:</p>

${cod('pseudo', `// Estas dos condiciones son EQUIVALENTES
Si NO (edad >= 18 Y tieneDNI) Entonces
	Escribir "No puede ingresar"
FinSi

Si edad < 18 O NO tieneDNI Entonces
	Escribir "No puede ingresar"
FinSi`)}

<p>Observa que al negar también se invierte cada comparación: <code>NO (edad &gt;= 18)</code> es
<code>edad &lt; 18</code>. Es el error más común al aplicar De Morgan: cambiar la Y por la O y olvidarse de negar
los operandos.</p>

${nota('La regla mnemotécnica',
  '<p>Para negar una condición compuesta: <strong>niega cada parte y cambia Y por O</strong> (o al revés). ' +
  'Los paréntesis se quedan donde estaban.</p>', 'key')}

<h2>Evaluación en cortocircuito</h2>
<p>Casi todos los lenguajes evalúan <code>Y</code> y <code>O</code> de <strong>izquierda a derecha y se detienen en
cuanto el resultado está decidido</strong>. Si el primer operando de un <code>Y</code> es falso, el segundo no se evalúa
nunca: el resultado ya es falso. Esto no es una optimización invisible, es una herramienta:</p>

${cod('pseudo', `// El orden IMPORTA: si cantidad es 0, nunca se divide
Si cantidad > 0 Y (suma / cantidad) > 10 Entonces
	Escribir "promedio alto"
FinSi

// Al revés, esto fallaría con división entre cero
Si (suma / cantidad) > 10 Y cantidad > 0 Entonces   // MAL`)}

<p>Ese patrón, llamado <strong>condición de guarda</strong>, se usa constantemente: primero compruebas que algo existe
o es válido, y solo entonces lo usas. Por eso también conviene poner primero la condición más barata o la que descarta
más casos.</p>

<h2>Operadores lógicos y operadores de bits</h2>
<p>No hay que confundir dos familias que se parecen:</p>
${tabla(['Familia', 'Operadores', 'Opera sobre', 'Ejemplo'], [
  ['Lógicos', '<code>&amp;&amp;</code> <code>||</code> <code>!</code>', 'valores verdadero/falso completos', '<code>a &gt; 0 &amp;&amp; b &lt; 10</code>'],
  ['De bits', '<code>&amp;</code> <code>|</code> <code>^</code> <code>~</code> <code>&lt;&lt;</code> <code>&gt;&gt;</code>', 'cada bit por separado', '<code>12 &amp; 10 = 8</code>']
], 'Los lógicos hacen cortocircuito; los de bits no, porque deben procesar todos los bits.')}

<p><code>12 &amp; 10</code> es <code>1100 &amp; 1010 = 1000 = 8</code>: la operación AND se aplica bit por bit. Los
operadores de bits sirven para máscaras, banderas y optimizaciones: <code>x &lt;&lt; 1</code> duplica,
<code>x &gt;&gt; 1</code> divide entre dos, <code>x &amp; 1</code> dice si es impar.</p>

${nota('Pruébalo ahora', '<p>Abre la herramienta <a href="#herramientas">Tablas de verdad</a> del laboratorio y comprueba ' +
  'De Morgan tú mismo: escribe <code>NO (A Y B)</code>, anota la columna de resultados, y luego escribe ' +
  '<code>NO A O NO B</code>. Las cuatro filas deben coincidir exactamente.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Tabla de verdad a mano',
          enunciado: 'Construye la tabla de verdad completa de <code>(A O B) Y NO C</code>. Son 8 filas.',
          pista: 'Agrega columnas intermedias para (A O B) y para NO C antes de combinarlas.',
          solucion: `${tabla(['#A', '#B', '#C', '#A O B', '#NO C', '#Resultado'], [
  ['0', '0', '0', '0', '1', '0'], ['0', '0', '1', '0', '0', '0'],
  ['0', '1', '0', '1', '1', '<b>1</b>'], ['0', '1', '1', '1', '0', '0'],
  ['1', '0', '0', '1', '1', '<b>1</b>'], ['1', '0', '1', '1', '0', '0'],
  ['1', '1', '0', '1', '1', '<b>1</b>'], ['1', '1', '1', '1', '0', '0']
])}
<p>El resultado es verdadero en 3 de las 8 filas: cuando C es falso y al menos una de A o B es verdadera. Compruébalo en la herramienta de tablas de verdad.</p>` },
        { n: 2, titulo: 'Aplica De Morgan',
          enunciado: 'Niega correctamente cada condición, sin usar el operador NO delante de todo: (a) <code>edad &gt;= 18 Y pais = "Perú"</code>; (b) <code>stock = 0 O precio &gt; 100</code>; (c) <code>esSocio Y (compras &gt; 10 O antiguedad &gt;= 2)</code>.',
          pista: 'Niega cada parte, invierte las comparaciones y cambia Y por O.',
          solucion: `<p><b>(a)</b> <code>edad &lt; 18 O pais &lt;&gt; "Perú"</code></p>
<p><b>(b)</b> <code>stock &lt;&gt; 0 Y precio &lt;= 100</code></p>
<p><b>(c)</b> Se aplica De Morgan dos veces, de fuera hacia dentro:<br>
<code>NO esSocio O NO (compras &gt; 10 O antiguedad &gt;= 2)</code><br>
<code>NO esSocio O (compras &lt;= 10 Y antiguedad &lt; 2)</code></p>
<p>Nota que los paréntesis internos se vuelven necesarios: sin ellos la precedencia cambiaría el significado, porque <code>Y</code> se evalúa antes que <code>O</code>.</p>` },
        { n: 3, titulo: 'Simplifica',
          enunciado: 'Simplifica estas condiciones usando las leyes del álgebra de Boole y di qué ley usaste: (a) <code>A Y (A O B)</code>; (b) <code>(A Y B) O (A Y NO B)</code>; (c) <code>NO (NO A O NO B)</code>; (d) <code>A O (NO A Y B)</code>.',
          pista: 'Busca factores comunes y usa complemento, distributiva y De Morgan.',
          solucion: `<p><b>(a)</b> <code>A Y (A O B) = A</code>. Ley de absorción: si A es falso, todo es falso; si A es verdadero, <code>A O B</code> también, así que el resultado es A. El valor de B es irrelevante.</p>
<p><b>(b)</b> <code>(A Y B) O (A Y NO B) = A Y (B O NO B) = A Y 1 = A</code>. Distributiva, luego complemento, luego identidad.</p>
<p><b>(c)</b> <code>NO (NO A O NO B) = NO(NO A) Y NO(NO B) = A Y B</code>. De Morgan y doble negación.</p>
<p><b>(d)</b> <code>A O (NO A Y B) = (A O NO A) Y (A O B) = 1 Y (A O B) = A O B</code>. Distributiva, complemento, identidad.</p>
<p>Estas simplificaciones no son un juego académico: condiciones de 6 u 8 términos aparecen en código real (reglas de descuento, permisos, validaciones) y simplificarlas elimina bugs además de líneas.</p>` },
        { n: 4, titulo: 'Un sumador con compuertas',
          enunciado: 'Un <b>semisumador</b> suma dos bits y produce la suma y el acarreo. Completa su tabla de verdad y luego deduce con qué compuertas se construye cada salida. Después explica qué le falta para ser un sumador completo.',
          pista: 'Mira la columna de la suma: ¿a qué compuerta de la tabla inicial se parece? Y la del acarreo.',
          solucion: `${tabla(['#A', '#B', '#Suma', '#Acarreo'], [
  ['0', '0', '0', '0'], ['0', '1', '1', '0'], ['1', '0', '1', '0'], ['1', '1', '0', '1']
], 'La columna Suma es exactamente XOR; la columna Acarreo es exactamente AND.')}
<p><b>Construcción:</b> <code>Suma = A XOR B</code> y <code>Acarreo = A Y B</code>. Dos compuertas, y ya sabes sumar en binario.</p>
<p><b>Qué le falta:</b> un semisumador no acepta el acarreo <i>que viene de la columna anterior</i>, y para sumar números de varios bits hace falta. El <b>sumador completo</b> tiene tres entradas (A, B y acarreo de entrada) y se construye con dos semisumadores más una compuerta OR:</p>
<pre>Suma     = (A XOR B) XOR Cin
Cout     = (A Y B) O ((A XOR B) Y Cin)</pre>
<p>Encadenando 32 sumadores completos, cada uno pasando su acarreo al siguiente, se obtiene el circuito que suma dos enteros de 32 bits. Eso es, literalmente, el corazón de la ALU de tu procesador: <b>una suma de enteros no es más que unas 150 compuertas lógicas bien conectadas</b>. Y como vimos en la lección de complemento a dos, la resta usa el mismo circuito.</p>` },
        { n: 5, titulo: 'Condición compleja del mundo real',
          enunciado: 'Una tienda da descuento si: el cliente es socio y compró más de 100 soles; o no es socio pero compró más de 300; o es socio con más de 2 años de antigüedad, cualquiera sea el monto. Pero nunca se da descuento en productos de liquidación. (a) Escribe la condición completa. (b) Simplifica lo que puedas. (c) Ordena los términos para que el cortocircuito evalúe primero lo más barato y lo que descarta más casos. (d) Escribe tres casos de prueba que distingan entre la versión correcta y una que olvide los paréntesis.',
          pista: 'Traduce frase por frase y luego factoriza los términos que empiezan con «socio».',
          solucion: `<p><b>(a) Traducción literal:</b></p>
${cod('pseudo', `Si NO esLiquidacion Y (
       (esSocio Y monto > 100)
    O  (NO esSocio Y monto > 300)
    O  (esSocio Y antiguedad > 2)
   ) Entonces
	aplicarDescuento()
FinSi`)}
<p><b>(b) Simplificación.</b> Los términos 1 y 3 comparten <code>esSocio</code>; se factorizan:</p>
${cod('pseudo', `Si NO esLiquidacion Y (
       (esSocio Y (monto > 100 O antiguedad > 2))
    O  (NO esSocio Y monto > 300)
   ) Entonces`)}
<p>De cinco comparaciones pasamos a cuatro, y además la estructura refleja la regla de negocio: «para socios una cosa, para no socios otra».</p>
<p><b>(c) Orden para el cortocircuito.</b> <code>NO esLiquidacion</code> va primero porque es una simple lectura booleana (baratísima) y descarta todos los productos en liquidación de un golpe. Dentro, <code>esSocio</code> antes que las comparaciones numéricas por el mismo motivo. Si alguno de los datos viniera de una consulta a base de datos, iría al final: el cortocircuito evita la consulta cuando ya está decidido.</p>
<p><b>(d) Casos de prueba.</b> La versión sin paréntesis sería <code>NO esLiquidacion Y A O B O C</code>, que por precedencia se agrupa como <code>(NO esLiquidacion Y A) O B O C</code>: la exclusión por liquidación solo se aplicaría al primer caso.</p>
${tabla(['Caso', 'Datos', 'Correcto', 'Sin paréntesis'], [
  ['1', 'liquidación, no socio, monto 400', 'sin descuento', '<b>con descuento</b> ✖'],
  ['2', 'liquidación, socio, antigüedad 5, monto 10', 'sin descuento', '<b>con descuento</b> ✖'],
  ['3', 'no liquidación, socio, monto 150', 'con descuento', 'con descuento ✔']
], 'Los casos 1 y 2 delatan el error; el caso 3 no distingue nada y por sí solo daría una falsa sensación de que todo funciona.')}
<p>Última lección del ejercicio: <b>una prueba que pasa no demuestra que el código sea correcto</b>; hay que elegir casos que puedan fallar.</p>` }
      ],
      quiz: [
        { p: '<code>NO (A Y B)</code> es equivalente a…',
          ops: ['<code>NO A Y NO B</code>', '<code>NO A O NO B</code>', '<code>A O B</code>', '<code>NO A Y B</code>'],
          ok: 1, exp: 'Es la primera ley de De Morgan: al negar una conjunción, se niega cada parte y la Y se convierte en O.' },
        { p: 'En <code>Si cantidad &gt; 0 Y suma/cantidad &gt; 10</code>, ¿por qué el orden importa?',
          ops: ['No importa, el resultado es el mismo', 'Por el cortocircuito: si cantidad es 0, la división nunca se evalúa',
            'Porque Y evalúa de derecha a izquierda', 'Porque la división es más lenta'],
          ok: 1, exp: 'La evaluación en cortocircuito detiene el Y en cuanto encuentra un falso, así que la división solo ocurre si cantidad > 0. Es el patrón de condición de guarda.' },
        { p: '¿Qué compuerta es «universal», es decir, permite construir todas las demás?',
          ops: ['AND', 'OR', 'NAND', 'XOR'],
          ok: 2, exp: 'Con solo compuertas NAND (y también con solo NOR) se construye cualquier función lógica. Por eso muchos circuitos reales usan un único tipo de compuerta.' }
      ]
    },

    /* ---------------------------------------------------------- */
    {
      id: 'm1-7',
      titulo: 'De las compuertas a la CPU',
      resumen: 'Memoria, registros, ALU y el ciclo buscar-decodificar-ejecutar que corre tu programa.',
      objetivos: [
        'Describir los componentes de una CPU y el papel de cada uno',
        'Explicar el ciclo de instrucción paso a paso',
        'Entender la jerarquía de memoria y por qué la caché cambia el rendimiento'
      ],
      lectura: `
<p>Ya tienes las piezas: bits, compuertas y aritmética binaria. Falta un último salto para completar el panorama: cómo
unas compuertas acaban ejecutando un programa. Esta lección es el puente entre el hardware y todo lo que vas a programar
en el resto del curso, y vuelve a aparecer, mucho más a fondo, en el módulo 9.</p>

<h2>Recordar: del circuito a la memoria</h2>
<p>Una compuerta sola no recuerda nada: su salida depende solo de sus entradas actuales. Pero si conectas la salida a la
entrada, aparece algo nuevo: un circuito que se mantiene en un estado. Dos compuertas NOR cruzadas forman un
<strong>biestable</strong> (<em>latch</em>): un circuito con dos estados estables que guarda <strong>un bit</strong> hasta
que se le indique cambiar. Agrupa 8 biestables y tienes un byte de memoria; agrupa miles de millones y tienes la RAM.</p>

<p>La memoria se organiza como una enorme fila de casillas numeradas. El número de casilla es su <strong>dirección</strong>,
y por eso una máquina de 32 bits solo podía direccionar 2³² bytes = 4 GiB: no es que no quepan más chips, es que no
había números para nombrarlos.</p>

<h2>Los componentes de una CPU</h2>

${fig(`<svg viewBox="0 0 560 250" width="560" height="250" role="img" aria-label="Diagrama de los componentes de una CPU y su conexión con la memoria">
<g color="var(--fg-soft)">
<rect x="14" y="14" width="330" height="222" rx="10" fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="26" y="34" font-size="11" font-weight="700" fill="var(--fg-soft)">CPU</text>

<rect x="34" y="48" width="130" height="52" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="99" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Unidad de control</text>
<text x="99" y="87" text-anchor="middle" font-size="10" fill="var(--fg-soft)">decodifica y dirige</text>

<rect x="190" y="48" width="130" height="52" rx="6" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.6"/>
<text x="255" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">ALU</text>
<text x="255" y="87" text-anchor="middle" font-size="10" fill="var(--fg-soft)">suma, resta, AND, OR</text>

<rect x="34" y="120" width="286" height="44" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="177" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Registros</text>
<text x="177" y="156" text-anchor="middle" font-size="10" fill="var(--fg-soft)">PC · IR · acumulador · R1…Rn · banderas</text>

<rect x="34" y="182" width="286" height="38" rx="6" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.5"/>
<text x="177" y="206" text-anchor="middle" font-size="11.5" fill="var(--fg)">Caché L1 / L2 / L3</text>

<rect x="392" y="48" width="150" height="100" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.6"/>
<text x="467" y="76" text-anchor="middle" font-size="12" font-weight="700" fill="var(--fg)">Memoria (RAM)</text>
<text x="467" y="96" text-anchor="middle" font-size="10" fill="var(--fg-soft)">instrucciones</text>
<text x="467" y="112" text-anchor="middle" font-size="10" fill="var(--fg-soft)">+ datos</text>
<text x="467" y="134" text-anchor="middle" font-size="10" fill="var(--fg-soft)">direcciones 0…2ⁿ−1</text>

<path d="M344 90 H390" stroke="var(--fg-soft)" stroke-width="1.6"/>
<path d="M344 110 H390" stroke="var(--fg-soft)" stroke-width="1.6"/>
<text x="367" y="84" text-anchor="middle" font-size="9" fill="var(--fg-soft)">bus</text>

<text x="280" y="242" text-anchor="middle" font-size="10" fill="var(--fg-soft)">Arquitectura de Von Neumann: los datos y el programa viven en la misma memoria</text>
</g></svg>`, 'Los bloques de una CPU y el bus que la conecta con la memoria.')}

${tabla(['Componente', 'Qué hace'], [
  ['<b>ALU</b> (unidad aritmético-lógica)', 'Hace las operaciones: sumas, restas, AND, OR, comparaciones. Es el sumador de compuertas de la lección anterior, multiplicado.'],
  ['<b>Unidad de control</b>', 'Lee la instrucción, la decodifica y activa las señales que hacen que el resto obedezca.'],
  ['<b>Registros</b>', 'Unas pocas decenas de casillas <i>dentro</i> del procesador. Son la memoria más rápida que existe: 0 ciclos de espera.'],
  ['<b>PC</b> (contador de programa)', 'Registro especial que guarda la dirección de la siguiente instrucción a ejecutar.'],
  ['<b>IR</b> (registro de instrucción)', 'Guarda la instrucción que se está ejecutando ahora.'],
  ['<b>Registro de banderas</b>', 'Bits que recuerdan el resultado de la última operación: fue cero, dio negativo, hubo acarreo, hubo desbordamiento.'],
  ['<b>Caché</b>', 'Memoria intermedia pequeña y rápida que guarda copias de lo que se usó hace poco.']
])}

<p>El registro de banderas merece atención porque explica algo que vas a usar siempre: <strong>así es como funciona un
<code>if</code></strong>. La CPU no «sabe» comparar: resta los dos valores, y si la bandera de cero queda activada,
eran iguales. Luego una instrucción de salto condicional consulta esa bandera y decide si continuar o saltar a otra
dirección. Todo <code>Si</code>, todo <code>Mientras</code> y todo <code>Para</code> que escribas termina siendo una
resta, una bandera y un salto.</p>

<h2>El ciclo de instrucción</h2>
<p>La CPU repite el mismo ciclo miles de millones de veces por segundo, y no hace nada más:</p>

<ol>
  <li><strong>Buscar (<em>fetch</em>).</strong> Leer de la memoria la instrucción que está en la dirección del PC, y
  guardarla en el IR. Incrementar el PC para que apunte a la siguiente.</li>
  <li><strong>Decodificar (<em>decode</em>).</strong> La unidad de control interpreta los bits del IR: qué operación es,
  sobre qué operandos, con qué modo de direccionamiento.</li>
  <li><strong>Ejecutar (<em>execute</em>).</strong> Se activan los circuitos correspondientes: la ALU opera, se lee o
  escribe memoria, o se modifica el PC si es un salto.</li>
  <li><strong>Guardar (<em>writeback</em>).</strong> El resultado va a un registro o a la memoria, y se actualizan las
  banderas. Vuelta al paso 1.</li>
</ol>

<p>Un detalle clave de la <strong>arquitectura de Von Neumann</strong>: las instrucciones y los datos viven en la misma
memoria y están hechos de los mismos bits. Eso es lo que permite que un programa cargue otro programa, que exista un
compilador, y también que un atacante que logre escribir en la memoria equivocada consiga que sus datos se ejecuten
como código. Potencia y vulnerabilidad vienen del mismo lugar.</p>

<h2>Cómo se hace rápido un procesador</h2>
<p>Si cada instrucción necesitara los cuatro pasos completos antes de empezar la siguiente, se desperdiciaría casi todo
el circuito. Las técnicas reales:</p>
<ul>
  <li><strong>Segmentación (<em>pipeline</em>).</strong> Como una línea de montaje: mientras una instrucción se ejecuta,
  la siguiente se decodifica y la tercera se busca. Un pipeline de 5 etapas puede terminar casi una instrucción por
  ciclo en lugar de una cada cinco.</li>
  <li><strong>Predicción de saltos.</strong> Un salto condicional rompe el pipeline porque no se sabe qué instrucción
  viene hasta evaluar la condición. La CPU <em>apuesta</em> por el resultado más probable y sigue adelante; si acierta,
  no pierde nada, y si falla, descarta el trabajo. Acierta más del 95% de las veces. Esta es la razón por la que un
  bucle con una condición predecible corre mucho más rápido que uno con datos aleatorios, aunque ejecute las mismas
  operaciones.</li>
  <li><strong>Ejecución fuera de orden y superescalar.</strong> La CPU reordena instrucciones independientes y ejecuta
  varias a la vez en unidades paralelas.</li>
  <li><strong>Varios núcleos.</strong> Procesadores completos e independientes en el mismo chip.</li>
</ul>

<h2>La jerarquía de memoria</h2>
<p>Esta tabla explica el 90% de las diferencias de rendimiento que vas a encontrar en tu vida:</p>

${tabla(['Nivel', 'Tamaño típico', 'Latencia', 'Equivalente humano si un ciclo fuera 1 segundo'], [
  ['Registros', 'unos cientos de bytes', '0–1 ciclo', 'lo tienes en la mano'],
  ['Caché L1', '32–64 KiB', '~4 ciclos', 'un cajón del escritorio: 4 segundos'],
  ['Caché L2', '256 KiB – 2 MiB', '~12 ciclos', 'el estante de la pared: 12 segundos'],
  ['Caché L3', '8–64 MiB', '~40 ciclos', 'otra habitación: 40 segundos'],
  ['RAM', '8–64 GiB', '~200 ciclos', 'ir a la biblioteca del barrio: 3 minutos'],
  ['SSD', '0,5–4 TiB', '~100 000 ciclos', 'un viaje de un día'],
  ['Disco duro', '1–20 TiB', '~10 000 000 ciclos', 'un viaje de cuatro meses']
], 'Cada nivel es unas 10 veces más grande y más lento que el anterior. La caché existe porque el 90% de los accesos van al 10% de los datos.')}

<p>La consecuencia práctica es enorme: <strong>cómo recorres los datos importa más que cuántas operaciones haces</strong>.
Recorrer un arreglo en orden es rapidísimo porque la caché trae bloques contiguos y acierta casi siempre; recorrerlo
saltando al azar puede ser 10 o 20 veces más lento con el mismo número de operaciones. Por eso un arreglo suele ganarle
a una lista enlazada en la práctica aunque la teoría diga que empatan, y por eso recorrer una matriz por filas es más
rápido que por columnas. Lo verás con números en el módulo 6.</p>

${nota('Lo que te llevas de este módulo',
  '<p>Tu programa acaba siendo una secuencia de instrucciones que mueven bits entre registros y memoria, y unas pocas ' +
  'compuertas que suman y comparan. Nada de lo que escribas en el resto del curso rompe ese modelo: los bucles, las ' +
  'funciones, los objetos y las clases son formas de organizar <em>tu pensamiento</em>, no cosas que la máquina ' +
  'entienda. Esa traducción es el trabajo de un compilador, y es el módulo 9.</p>', 'key')}
      `,
      ejercicios: [
        { n: 1, titulo: 'El ciclo paso a paso',
          enunciado: 'Describe qué ocurre con el PC, el IR y los registros durante la ejecución de la instrucción «sumar el contenido de la dirección 200 al acumulador», suponiendo que la instrucción está en la dirección 50 y ocupa 2 bytes.',
          pista: 'Sigue los cuatro pasos del ciclo en orden.',
          solucion: `<ol>
<li><b>Buscar:</b> se lee la memoria en la dirección 50, los bits de la instrucción pasan al IR, y el PC se incrementa a 52 (porque la instrucción ocupa 2 bytes).</li>
<li><b>Decodificar:</b> la unidad de control reconoce el código de operación «SUMA» y el operando «dirección 200».</li>
<li><b>Ejecutar:</b> se lee la memoria en la dirección 200 y su valor entra a la ALU junto con el acumulador; la ALU suma.</li>
<li><b>Guardar:</b> el resultado vuelve al acumulador y se actualizan las banderas (cero si el resultado es 0, negativo si el bit alto es 1, acarreo si hubo desbordamiento).</li>
</ol>
<p>Siguiente ciclo: se busca la instrucción en la dirección 52. Observa que el PC se incrementa <b>durante la búsqueda</b>, no al final: así, si la instrucción es un salto, lo único que hace es sobrescribir el PC.</p>` },
        { n: 2, titulo: 'Direccionamiento',
          enunciado: 'Un procesador tiene un bus de direcciones de 20 bits y cada dirección apunta a un byte. (a) ¿Cuánta memoria puede direccionar? (b) ¿Y si cada dirección apuntara a una palabra de 4 bytes? (c) ¿Por qué una máquina de 32 bits se quedaba en 4 GiB?',
          pista: 'Memoria direccionable = 2^(bits de dirección) × tamaño de la unidad direccionable.',
          solucion: `<p><b>(a)</b> 2²⁰ = 1 048 576 direcciones × 1 byte = <b>1 MiB</b>. Este era exactamente el límite del Intel 8086 y la razón del famoso límite de 640 KB del MS-DOS.</p>
<p><b>(b)</b> 2²⁰ × 4 bytes = <b>4 MiB</b>. Direccionar palabras en lugar de bytes cuadruplica el alcance, pero impide acceder a un byte individual sin leer la palabra completa y aislarlo.</p>
<p><b>(c)</b> Con direcciones de 32 bits hay 2³² = 4 294 967 296 direcciones distintas; si cada una es un byte, el total es 4 GiB. No era una limitación de los chips de memoria: simplemente no existían más números para nombrar las casillas. Hubo parches (PAE permitía 64 GiB físicos), pero un solo proceso seguía sin poder ver más de 4 GiB de su espacio de direcciones.</p>` },
        { n: 3, titulo: 'Predicción de saltos',
          enunciado: 'Estos dos bucles hacen exactamente las mismas operaciones y el segundo puede ser 3 o 4 veces más lento. Explica por qué.<br><pre>// A: datos ordenados\npara i de 1 a 1000000:\n    si datos[i] &gt; 500: suma += datos[i]\n\n// B: los mismos datos, desordenados al azar\npara i de 1 a 1000000:\n    si datos[i] &gt; 500: suma += datos[i]</pre>',
          pista: 'Piensa en qué puede adivinar la CPU sobre el resultado de la condición en cada caso.',
          solucion: `<p>Con los datos <b>ordenados</b>, la condición <code>datos[i] &gt; 500</code> es falsa en toda la primera mitad y verdadera en toda la segunda. El predictor de saltos aprende el patrón y acierta prácticamente siempre: el pipeline nunca se vacía.</p>
<p>Con los datos <b>al azar</b>, la condición cambia de forma impredecible. El predictor acierta un 50%, y cada fallo obliga a descartar el trabajo especulativo del pipeline (unos 15–20 ciclos en un procesador moderno). Con medio millón de fallos, eso son millones de ciclos perdidos sin ejecutar ni una operación útil.</p>
<p>Este es uno de los resultados más contraintuitivos del rendimiento real: <b>ordenar los datos antes del bucle puede hacer que el bucle sea más rápido, incluso contando el costo de ordenar</b>. Y es la razón por la que el código sin ramas (<i>branchless</i>), por ejemplo <code>suma += datos[i] × (datos[i] &gt; 500)</code>, puede ganarle a la versión con <code>if</code> aunque haga más operaciones. Es también uno de los ejemplos más votados de la historia de Stack Overflow.</p>` },
        { n: 4, titulo: 'Localidad de caché',
          enunciado: 'Dada una matriz de 10 000 × 10 000 enteros guardada por filas en memoria contigua, recorrerla sumando todos sus elementos puede tardar 8 veces más en un orden que en el otro. (a) ¿Qué orden es el rápido y por qué? (b) Estima cuántas líneas de caché se traen en cada caso suponiendo líneas de 64 bytes y enteros de 4 bytes.',
          pista: 'Una línea de caché trae 64 bytes contiguos, se use uno o se usen todos.',
          solucion: `<p><b>(a)</b> El orden rápido es <b>por filas</b> (el índice de columna variando más rápido en el bucle interno), porque coincide con el orden físico en memoria. Cada línea de caché traída contiene los 16 enteros siguientes, y los 16 se usan antes de pedir otra.</p>
<p>Recorrer <b>por columnas</b> salta 40 000 bytes entre un elemento y el siguiente: cada acceso cae en una línea distinta, se traen 64 bytes para usar solo 4, y se desperdicia el 94% del ancho de banda. Peor aún, para cuando el recorrido vuelve a la fila 1 para la columna 2, esa línea ya fue expulsada de la caché.</p>
<p><b>(b)</b> La matriz ocupa 10⁸ enteros × 4 B = 400 MB.</p>
<ul>
<li><b>Por filas:</b> 400 MB ÷ 64 B = <b>6,25 millones</b> de líneas traídas, una sola vez cada una. Es el mínimo teórico.</li>
<li><b>Por columnas:</b> cada uno de los 10⁸ accesos provoca una línea nueva (la anterior ya fue expulsada), es decir <b>10⁸ líneas</b>, 16 veces más tráfico de memoria.</li>
</ul>
<p>El número de sumas es idéntico. Toda la diferencia está en el patrón de acceso. Esto se llama <b>localidad espacial</b>, y es el motivo por el que las bibliotecas de álgebra lineal de alto rendimiento están escritas en función del tamaño de la caché y no del número de operaciones.</p>` },
        { n: 5, titulo: 'Diseña un juego de instrucciones',
          enunciado: 'Diseña el juego de instrucciones mínimo de una máquina capaz de ejecutar cualquier algoritmo del módulo 0: necesitas mover datos, operar, comparar y repetir. (a) Lista las instrucciones con su formato en bits suponiendo 16 bits por instrucción. (b) Traduce a tu juego el algoritmo «sumar los números de 1 a 5». (c) Explica qué ganas y qué pierdes al tener pocas instrucciones.',
          pista: 'Reparte los 16 bits entre código de operación y operando. Con 4 bits de opcode tienes 16 instrucciones y 12 bits de dirección.',
          solucion: `<p><b>(a) Formato:</b> 4 bits de código de operación + 12 bits de operando (4096 direcciones).</p>
${tabla(['#Opcode', 'Instrucción', 'Efecto'], [
  ['0000', '<code>CARGA dir</code>', 'ACC ← memoria[dir]'],
  ['0001', '<code>CARGAI valor</code>', 'ACC ← valor inmediato'],
  ['0010', '<code>GUARDA dir</code>', 'memoria[dir] ← ACC'],
  ['0011', '<code>SUMA dir</code>', 'ACC ← ACC + memoria[dir]; actualiza banderas'],
  ['0100', '<code>RESTA dir</code>', 'ACC ← ACC − memoria[dir]; actualiza banderas'],
  ['0101', '<code>SALTA dir</code>', 'PC ← dir'],
  ['0110', '<code>SALTAZ dir</code>', 'si bandera cero: PC ← dir'],
  ['0111', '<code>SALTAN dir</code>', 'si bandera negativo: PC ← dir'],
  ['1000', '<code>IMPRIME</code>', 'muestra el ACC'],
  ['1111', '<code>ALTO</code>', 'detiene la máquina']
], 'Diez instrucciones bastan. Sobran 6 opcodes para multiplicación, lectura o direccionamiento indirecto.')}
<p><b>(b) Sumar 1 a 5</b> (dir 100 = suma, dir 101 = contador, dir 102 = constante 1, dir 103 = constante 6):</p>
<pre> 0  CARGAI 0
 1  GUARDA 100        ; suma ← 0
 2  CARGAI 1
 3  GUARDA 101        ; contador ← 1
 4  CARGA  101        ; ---- inicio del bucle
 5  RESTA  103        ; contador − 6
 6  SALTAZ 13         ; si contador = 6, salir
 7  CARGA  100
 8  SUMA   101
 9  GUARDA 100        ; suma ← suma + contador
10  CARGA  101
11  SUMA   102
12  GUARDA 101        ; contador ← contador + 1
13  SALTA  4          ; volver al inicio  (ojo: ver nota)
14  CARGA  100
15  IMPRIME
16  ALTO</pre>
<p>(La línea 6 debería saltar a 14; el salto de la 13 vuelve al inicio. Corregir esas dos direcciones es exactamente el tipo de trabajo tedioso y propenso a error que motivó la invención del ensamblador con etiquetas, y después de los compiladores.)</p>
<p><b>(c) Qué ganas y qué pierdes.</b> Con pocas instrucciones el circuito de decodificación es pequeño, rápido y barato de verificar: es la filosofía <b>RISC</b> (ARM, RISC-V), y es la razón por la que domina en móviles, donde importa el consumo. Lo que pierdes es densidad: un programa necesita más instrucciones para lo mismo, ocupa más memoria y exige más trabajo al compilador. La filosofía opuesta, <b>CISC</b> (x86), tiene instrucciones complejas que hacen mucho de una vez: programas más cortos, decodificador enorme. En la práctica los procesadores x86 actuales traducen internamente sus instrucciones complejas a microoperaciones parecidas a RISC, así que la discusión terminó en empate técnico.</p>` }
      ],
      quiz: [
        { p: 'El registro PC (contador de programa) guarda…',
          ops: ['el resultado de la última operación', 'la dirección de la siguiente instrucción a ejecutar',
            'la cantidad de instrucciones ejecutadas', 'el programa completo'],
          ok: 1, exp: 'El PC apunta a la siguiente instrucción. Un salto no hace más que escribir otra dirección en el PC.' },
        { p: 'Recorrer un arreglo en orden es mucho más rápido que recorrerlo al azar porque…',
          ops: ['hay menos operaciones', 'la caché trae bloques contiguos y acierta casi siempre',
            'el compilador lo optimiza', 'los índices bajos son más rápidos'],
          ok: 1, exp: 'Es localidad espacial: una línea de caché trae 64 bytes contiguos. En orden se usan todos; al azar se desperdicia casi toda la línea.' },
        { p: 'En la arquitectura de Von Neumann, instrucciones y datos…',
          ops: ['viven en memorias separadas', 'comparten la misma memoria',
            'se guardan en registros distintos', 'no pueden coexistir'],
          ok: 1, exp: 'Comparten memoria y están hechos de los mismos bits. Eso permite compiladores y programas que cargan programas, y también hace posibles los ataques por inyección de código.' }
      ]
    }
  ]
});
