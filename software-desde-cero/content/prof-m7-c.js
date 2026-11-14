(function () {
var S = SDC.S;

S('m7', 'm7.script', { title: 'Automatización: expresiones regulares, scripts y Make',
  ask: '¿Cómo automatizarías esta tarea con regex, un script o Make?',
  lesson: `
> **La idea en simple.** Todo lo que haces más de tres veces a mano merece un script: renombrar cien archivos, limpiar un CSV exportado, validar placas, generar un reporte cada mañana, preparar el proyecto con un comando. Las expresiones regulares, los scripts y herramientas como Make son la navaja suiza que convierte horas de trabajo repetitivo en segundos, y reducen los errores humanos.

## Expresiones regulares
Una **expresión regular** (regex) describe un patrón de texto. La teoría viene de Stephen Kleene (1951), que definió los lenguajes regulares (los mismos que reconocen los autómatas finitos del curso de teoría de la computación); Ken Thompson las llevó a la práctica en el editor QED en 1968 y después en «grep». Hoy están en todos los lenguajes y editores.
Lo esencial:
| Elemento | Significa | Ejemplo |
|---|---|---|
| . | cualquier carácter | a.c: abc, a7c |
| [abc] y [a-z] | uno de esos caracteres | [0-9] un dígito |
| [^abc] | cualquiera menos esos | [^ ] no espacio |
| \\d \\w \\s | dígito, letra o dígito o guion bajo, espacio | \\d{3}: tres dígitos |
| * + ? | 0 o más, 1 o más, 0 o 1 | colou?r |
| {n} {n,m} | exactamente n, entre n y m | \\d{2,4} |
| ^ y $ | inicio y fin del texto | ^ABC |
| ( ) | grupo que se captura | (\\d+)-(\\d+) |
| a o b | alternativa con la barra vertical | gato o perro |
| \\b | borde de palabra | \\bsol\\b |
En JavaScript se escriben entre barras y se usan con «test», «match», «matchAll» y «replace»:
~~~js
const placa = /^[A-Z0-9]{3}-\\d{3}$/;                     // formato peruano ABC-123
console.log(placa.test('ABC-123'), placa.test('abc-123'), placa.test('ABC-1234'));   // true false false

const ruc = /^(10|15|17|20)\\d{9}$/;                       // RUC de 11 dígitos con prefijo válido
console.log(ruc.test('20123456789'), ruc.test('30123456789'));                    // true false

// Extraer con grupos con nombre: "F001-00000057" → serie y número
const m = 'F001-00000057'.match(/^(?<serie>[FB]\\d{3})-(?<numero>\\d{1,8})$/);
console.log(m.groups.serie, Number(m.groups.numero));                            // F001 57

// Normalizar placas digitadas con espacios o minúsculas
console.log(' abc 123 '.trim().toUpperCase().replace(/\\s+|-/g, '').replace(/^(.{3})(.{3})$/, '$1-$2'));   // ABC-123
~~~
Los **modificadores** cambian el comportamiento: «g» (todas las coincidencias), «i» (ignorar mayúsculas), «m» (^ y $ por línea), «u» (Unicode correcto, necesario para tildes y emojis).

## Cuándo no usar regex
Las expresiones regulares son perfectas para patrones **planos**: formatos de códigos, fechas, búsquedas en registros. No sirven para estructuras **anidadas**: HTML, JSON o expresiones con paréntesis balanceados no son lenguajes regulares (es un teorema, el lema de bombeo), y para ellos se usa un analizador de verdad («DOMParser», «JSON.parse»). Jamie Zawinski lo resumió en una frase famosa de 1997: "Algunas personas, ante un problema, piensan: ya sé, usaré expresiones regulares. Ahora tienen dos problemas". Dos cuidados más:
- **Legibilidad:** una regex de 80 caracteres es ilegible. Divídela, nómbrala, coméntala y pruébala con casos válidos e inválidos.
- **Retroceso catastrófico:** patrones como «(a+)+$» sobre un texto largo que casi coincide tardan un tiempo exponencial, porque el motor prueba todas las formas de repartir las letras. Es un ataque real llamado **ReDoS**: en julio de 2019, una regex mal escrita en el firewall de Cloudflare saturó sus CPU y tumbó buena parte de sus servicios durante 27 minutos. Evita cuantificadores anidados y limita el tamaño de la entrada.

## Scripts: automatizar con código
Un **script** es un programa corto para una tarea concreta. Elige el lenguaje según la tarea:
- **Bash** para encadenar comandos del sistema y archivos: si el script es casi todo llamadas a otros programas.
- **Node o Python** cuando hay lógica, datos estructurados (JSON, CSV), llamadas a APIs o cálculo. Son portables entre Windows, macOS y Linux.
- **PowerShell** en entornos Windows con administración del sistema.
Un buen script de Bash empieza con «set -euo pipefail» (detenerse ante el primer error, ante variables no definidas y ante fallos en tuberías), valida sus argumentos, imprime lo que hace y es **idempotente** cuando se puede (ejecutarlo dos veces deja el mismo resultado que una).
~~~js
// scripts/limpiar-csv.mjs: normaliza el CSV exportado de la garita (uso: node scripts/limpiar-csv.mjs entrada.csv)
import { readFileSync, writeFileSync } from 'node:fs';
const [, , archivo] = process.argv;
if (!archivo) { console.error('Uso: node limpiar-csv.mjs archivo.csv'); process.exit(1); }
const lineas = readFileSync(archivo, 'utf8').replace(/\\r\\n/g, '\\n').trim().split('\\n');
const placaOk = /^[A-Z0-9]{3}-\\d{3}$/;
let malas = 0;
const limpias = lineas.slice(1).map(l => {
  const [placa, fecha, sede] = l.split(',').map(c => c.trim());
  const p = placa.toUpperCase().replace(/\\s+/g, '').replace(/^(.{3})-?(.{3})$/, '$1-$2');
  if (!placaOk.test(p)) malas++;
  return [p, fecha, sede.toUpperCase()].join(',');
});
writeFileSync(archivo.replace(/\.csv$/, '.limpio.csv'), [lineas[0], ...limpias].join('\\n'));
console.log(limpias.length, 'filas;', malas, 'placas con formato inválido');
~~~

## Make: un menú de tareas con dependencias
**Make** (Stuart Feldman, 1976) lee un archivo «Makefile» con **reglas**: un objetivo, sus dependencias y los comandos para producirlo. Su idea central es que solo rehace un objetivo si alguna dependencia es más nueva (compara fechas de modificación), lo que en proyectos de C ahorra recompilar todo. Hoy muchos repositorios lo usan además como **menú de tareas** con objetivos que no son archivos (marcados con «.PHONY»):
~~~txt
.PHONY: instalar dev prueba reporte limpiar
instalar:
	npm ci
dev: instalar
	npm run dev
prueba:
	npm run lint && npm test
reporte.csv: datos/estadias.json scripts/reporte.mjs
	node scripts/reporte.mjs datos/estadias.json > reporte.csv
limpiar:
	rm -rf dist reporte.csv
~~~
Detalle que confunde a todos la primera vez: los comandos deben empezar con un carácter de **tabulación**, no con espacios. Feldman contó después que lo eligió así un fin de semana y que, cuando quiso cambiarlo, ya tenía una docena de usuarios y no quiso romperles los archivos. Alternativas modernas: los «scripts» de package.json, **just** (un "Make sin sorpresas") y Task.

## Programar tareas: cron y similares
Para que un script se ejecute solo cada cierto tiempo, Unix tiene **cron** (desde 1975): una línea «0 6 * * 1-5 /usr/bin/node /app/reporte.mjs» lo corre a las 6:00 de lunes a viernes (los cinco campos son minuto, hora, día del mes, mes y día de la semana). Windows tiene el Programador de tareas; en la nube, las tareas programadas de GitHub Actions («schedule»), las funciones con cron de Vercel o los programadores de cada proveedor. Toda tarea programada debe registrar lo que hizo y avisar cuando falla: un reporte que dejó de generarse hace tres semanas sin que nadie lo note es peor que no tenerlo.

## Ejemplo resuelto: el reporte matutino de ocupación
Cada mañana, un supervisor de PatioApp copiaba datos de tres sedes a una hoja y calculaba la ocupación: 40 minutos diarios.
1. **Script:** «scripts/ocupacion.mjs» consulta la API de cada sede, calcula espacios ocupados, libres y porcentaje, y genera un CSV y un resumen en texto.
2. **Validación con regex:** descarta y reporta las filas con placas o fechas con formato inválido, en lugar de fallar en silencio.
3. **Makefile:** «make reporte» instala, ejecuta y deja el archivo en «reportes/AAAA-MM-DD.csv»; «make prueba» corre las pruebas del script con datos de ejemplo.
4. **Programación:** una tarea programada de lunes a sábado a las 6:30 ejecuta el script y envía el resumen por correo; si falla, envía el error.
5. **Resultado:** el supervisor recibe el reporte antes de llegar, sin errores de copiado. Unas 200 horas al año liberadas, con un script de 80 líneas.`,
  links: [['m7.cli', 'la terminal y los scripts de Bash'], ['teo.auto', 'los autómatas finitos detrás de las expresiones regulares'], ['m7.build', 'scripts de package.json y herramientas de construcción']],
  read: 'Friedl, *Mastering Regular Expressions* (3.ª ed., 2006); MDN, "Regular expressions"; Mecklenburg, *Managing Projects with GNU Make* (3.ª ed., 2004).',
  terms: [
    ['Expresión regular', 'patrón que describe un conjunto de cadenas de texto', ['Kleene, 1951.', 'grep.', '/^ABC/.']],
    ['Grupo de captura', 'parte de una expresión regular entre paréntesis cuyo texto coincidente se puede extraer', ['(\\d+).', 'Grupos con nombre.', '$1 en replace.']],
    ['Cuantificador', 'símbolo que indica cuántas veces se repite un elemento', ['*, +, ?.', '{n,m}.', 'Cuidado si se anidan.']],
    ['ReDoS', 'ataque que provoca tiempos exponenciales con expresiones regulares de retroceso catastrófico', ['(a+)+$.', 'Cloudflare, 2019.', 'Limitar la entrada.']],
    ['Script', 'programa corto que automatiza una tarea concreta', ['Bash, Node, Python.', 'Idempotente.', 'Valida argumentos.']],
    ['Idempotencia', 'propiedad de una operación cuyo efecto es el mismo si se ejecuta una o varias veces', ['Scripts seguros.', 'Reintentos.', 'mkdir -p.']],
    ['Makefile', 'archivo de reglas con objetivos, dependencias y comandos que Make ejecuta solo si hace falta', ['Feldman, 1976.', '.PHONY.', 'Tabulación obligatoria.']],
    ['Cron', 'servicio de Unix que ejecuta tareas según un calendario de cinco campos', ['0 6 * * 1-5.', 'Desde 1975.', 'Tareas programadas.']]
  ],
  q: [
    ['¿Qué textos acepta /^[A-Z0-9]{3}-\\d{3}$/?', 'Tres letras mayúsculas o dígitos, un guion y tres dígitos, sin nada más', ['Cualquier texto con un guion', 'Solo números', 'Placas en minúsculas'], '^ y $ anclan el inicio y el fin.', 2],
    ['¿Qué significa el modificador «g» en una regex de JavaScript?', 'Buscar todas las coincidencias, no solo la primera', ['Ignorar mayúsculas', 'Usar Unicode', 'Agrupar'], 'Global.', 1],
    ['¿Por qué no conviene analizar HTML con expresiones regulares?', 'Porque el HTML tiene estructuras anidadas que no son un lenguaje regular', ['Porque el HTML es binario', 'Porque las regex son lentas siempre', 'Porque JavaScript no lo permite'], 'Se usa un analizador real.', 3],
    ['¿Qué riesgo tiene un patrón como (a+)+$?', 'Retroceso catastrófico con tiempo exponencial (ReDoS)', ['Ninguno', 'No compila', 'Solo acepta una letra'], 'Cuantificadores anidados.', 3],
    ['¿Qué hace «set -euo pipefail» al inicio de un script de Bash?', 'Detiene el script ante errores, variables no definidas y fallos en tuberías', ['Lo hace más rápido', 'Oculta los errores', 'Lo ejecuta en paralelo'], 'Scripts robustos.', 2],
    ['¿Cuándo vuelve Make a generar un objetivo que es un archivo?', 'Cuando alguna de sus dependencias es más nueva que él', ['Siempre', 'Nunca', 'Solo los lunes'], 'Compara fechas de modificación.', 3],
    ['¿Qué significa la línea de cron «30 6 * * 1-6»?', 'A las 6:30 de lunes a sábado', ['Cada 30 minutos', 'El día 6 de cada mes', 'A las 30 horas'], 'Minuto, hora, día, mes, día de la semana.', 4],
    { tf: 'En un Makefile, los comandos de una regla pueden empezar con espacios o con tabulación indistintamente.', v: false, e: 'Deben empezar con tabulación.', l: 2 },
    { tf: 'Un script idempotente deja el mismo resultado si se ejecuta una o varias veces.', v: true, e: 'Permite reintentar sin miedo.', l: 1 },
    { c: 'Escribe «placaValida(p)»: true si p cumple el formato ABC-123 (tres letras mayúsculas o dígitos, guion, tres dígitos).', f: 'placaValida', p: ['p'], t: [[['ABC-123'], true], [['abc-123'], false], [['AB-1234'], false], [['A1B-999'], true]], sol: '  return /^[A-Z0-9]{3}-\\d{3}$/.test(p);', l: 1 },
    { c: 'Escribe «normalizarPlaca(p)»: quita espacios y guiones, pasa a mayúsculas y vuelve a poner un guion tras el tercer carácter (si tiene 6 caracteres).', f: 'normalizarPlaca', p: ['p'], t: [[[' abc 123 '], 'ABC-123'], [['abc-123'], 'ABC-123'], [['xy9876'], 'XY9-876']], sol: '  const s = p.toUpperCase().replace(/[\\s-]/g, \'\');\n  return s.length === 6 ? s.slice(0, 3) + \'-\' + s.slice(3) : s;', l: 2 },
    { c: 'Escribe «extraerComprobante(t)»: de un texto como "F001-00000057" devuelve { serie, numero } (número como entero), o null si no cumple el formato [FB] más 3 dígitos, guion y 1 a 8 dígitos.', f: 'extraerComprobante', p: ['t'], t: [[['F001-00000057'], { serie: 'F001', numero: 57 }], [['B002-12'], { serie: 'B002', numero: 12 }], [['X001-1'], null]], sol: '  const m = /^([FB]\\d{3})-(\\d{1,8})$/.exec(t);\n  return m ? { serie: m[1], numero: Number(m[2]) } : null;', l: 3 }
  ],
  gen: function (g) {
    var rx = [['/^\\d{8}$/', '12345678', 'Sí'], ['/^\\d{8}$/', '1234567', 'No'], ['/^[FB]\\d{3}$/', 'F001', 'Sí'], ['/^[FB]\\d{3}$/', 'E001', 'No'], ['/colou?r/', 'color', 'Sí'], ['/^a+b$/', 'aaab', 'Sí'], ['/^a+b$/', 'b', 'No'], ['/^[^0-9]+$/', 'Lima', 'Sí'], ['/^[^0-9]+$/', 'Lima1', 'No']];
    rx.forEach(function (r) { g.mcq(2, '¿La expresión ' + r[0] + ' acepta el texto "' + r[1] + '"?', r[2], [r[2] === 'Sí' ? 'No' : 'Sí', 'Solo con el modificador g', 'Depende del navegador'], 'Lectura de expresiones regulares.'); });
    var cr = [['0 6 * * *', 'Todos los días a las 6:00'], ['*/15 * * * *', 'Cada 15 minutos'], ['0 6 * * 1-5', 'A las 6:00 de lunes a viernes'], ['0 0 1 * *', 'A medianoche del primer día de cada mes']];
    cr.forEach(function (c) { g.mcq(3, '¿Qué significa la línea de cron "' + c[0] + '"?', c[1], ['Todos los días a las 6:00', 'Cada 15 minutos', 'A las 6:00 de lunes a viernes', 'A medianoche del primer día de cada mes'].filter(function (x) { return x !== c[1]; }), 'Minuto, hora, día del mes, mes, día de la semana.'); });
    g.times(5, function (R) { var min = R.int(5, 60), veces = R.int(3, 6); g.input(2, 'Una tarea manual toma ' + min + ' minutos y se hace ' + veces + ' veces por semana. ¿Cuántas horas al año (52 semanas) ahorra automatizarla? Redondea al entero.', Math.round(min * veces * 52 / 60), 'Minutos por veces por semanas, dividido entre 60.'); });
  },
  checks: [
    ['Explica los elementos básicos de una expresión regular con un ejemplo.', 'Clases como [A-Z] y \\d, cuantificadores como {3} y +, anclas ^ y $, grupos con paréntesis; por ejemplo, el formato de placa.'],
    ['¿Cuándo no usar expresiones regulares y qué es el ReDoS?', 'Para estructuras anidadas como HTML o JSON; ReDoS es el tiempo exponencial que provocan patrones con cuantificadores anidados.'],
    ['¿Qué hace que un script sea robusto?', 'Detenerse ante errores, validar argumentos, informar lo que hace, ser idempotente y portable.'],
    ['¿Para qué sirve Make hoy y cómo se programa una tarea periódica?', 'Para rehacer solo lo necesario y como menú de tareas; las tareas periódicas se programan con cron o servicios equivalentes, con registro y avisos de fallo.']
  ],
  cites: ['Kleene, S. C. (1956). Representation of Events in Nerve Nets and Finite Automata. *Automata Studies*, Princeton.', 'Thompson, K. (1968). Regular Expression Search Algorithm. *Communications of the ACM*, 11(6).', 'Feldman, S. (1979). Make: A Program for Maintaining Computer Programs. *Software: Practice and Experience*, 9(4).', 'Friedl, J. (2006). *Mastering Regular Expressions* (3.ª ed.). O\'Reilly.', 'Cloudflare (2019). Details of the Cloudflare outage on July 2, 2019. blog.cloudflare.com.'],
  project: { t: 'Automatiza una tarea real',
    goal: 'Identificar una tarea repetitiva y automatizarla con expresiones regulares, un script y Make.',
    steps: ['Elige una tarea que hagas a mano cada semana (limpiar datos, renombrar archivos, generar un reporte) y mide cuánto tarda.', 'Escribe las expresiones regulares de validación con al menos diez casos válidos e inválidos como pruebas.', 'Escribe el script en Node o Python, con validación de argumentos, mensajes claros y comportamiento idempotente.', 'Crea un Makefile (o scripts de package.json) con objetivos para instalar, probar y ejecutar.', 'Prográmalo con cron o una tarea programada en la nube, con registro y aviso de fallos, y calcula el tiempo ahorrado al año.'],
    deliver: 'El repositorio con el script, las pruebas, el Makefile y la medición del ahorro.' },
  hito: ['Escribe en PatioApp el script que limpia y valida el CSV de la garita con expresiones regulares para placas y comprobantes.', 'Crea el Makefile de PatioApp y programa el reporte matutino de ocupación con aviso en caso de fallo.']
});
SDC.after('m7.script', 'm7.ide');


SDC.D('m7.build', `## Compilación incremental y caché
En proyectos grandes, construir todo desde cero puede tardar decenas de minutos. Las herramientas modernas evitan repetir trabajo con dos ideas, ambas heredadas de Make:
- **Construcción incremental:** solo se recompila lo que cambió y lo que depende de ello. TypeScript lo hace con «incremental: true», que guarda información de la construcción anterior; Gradle y Cargo, por defecto.
- **Caché de resultados:** si una tarea recibe exactamente las mismas entradas (archivos, versiones, configuración) que una ejecución anterior, se reutiliza su salida sin ejecutarla. Bazel, Nx y Turborepo calculan un hash de las entradas y pueden compartir la caché entre todo el equipo y la integración continua: si un compañero ya construyó ese módulo, tú descargas el resultado.
Para que la caché sea correcta, las tareas deben ser **puras**: misma entrada, misma salida, sin leer nada no declarado (como la hora o una variable de entorno olvidada). Es la misma idea que hace reproducible una construcción.

## Publicar un paquete propio
Cuando una parte de tu código sirve en varios proyectos, puedes publicarla como paquete. En npm, los pasos son: elegir un nombre (o un **ámbito** propio, como «@patioapp/tarifas», que evita choques), definir en el manifiesto los campos «main» o «exports» (qué se importa), «files» (qué se publica: nunca pruebas ni secretos), la licencia y la versión; construir; y ejecutar «npm publish». Cada versión publicada es **inmutable**: no se puede reemplazar, solo publicar otra. Por eso conviene probar el paquete localmente con «npm pack» antes, y automatizar la publicación desde la integración continua con **procedencia** (*provenance*), que firma qué commit y qué flujo de trabajo produjeron el paquete. Para paquetes internos de una empresa se usan registros privados (GitHub Packages, Verdaccio, Artifactory).

## Más allá de JavaScript
Los conceptos se repiten en todos los ecosistemas con otros nombres: en Python, «pyproject.toml» es el manifiesto, «uv» o «poetry» generan el archivo de bloqueo y los **entornos virtuales** aíslan las dependencias de cada proyecto; en Java, el «pom.xml» de Maven; en Rust, «Cargo.toml» y «Cargo.lock». Quien entiende manifiesto, rangos, archivo de bloqueo, registro y construcción reproducible se orienta en cualquiera de ellos en una tarde.`);

SDC.D('m7.ide', `## Perfilar: el depurador del rendimiento
Cuando el problema no es un resultado incorrecto sino la lentitud, la herramienta es el **perfilador** (*profiler*). Mide en qué funciones pasa el tiempo el programa y cuánta memoria usa. En Chrome y en Node («node --cpu-prof» o la pestaña Performance), el resultado se ve como un **gráfico de llamas** (*flame graph*, inventado por Brendan Gregg en 2011): cada barra es una función, su ancho es el tiempo que consumió y encima están las funciones que llamó. Lo ancho y alto es donde hay que mirar. La regla es medir antes de optimizar: casi siempre, la lentitud está en un lugar distinto del que se sospechaba. Las mismas herramientas tienen un **perfil de memoria** que toma instantáneas del heap y muestra qué objetos crecen entre una y otra, la forma de encontrar fugas como los oyentes que nunca se desuscriben.

## Depurar lo que no puedes detener
Hay programas que no se pueden pausar: un servidor en producción, un sistema concurrente donde detener un hilo cambia el comportamiento, un error que aparece una vez al día. Para ellos:
- **Registros estructurados** con identificadores de petición, para reconstruir lo que pasó (lo verás en observabilidad).
- **Volcados** (*core dumps*, *heap snapshots*) tomados en el momento del fallo y analizados después con el depurador.
- **Depuración remota:** conectar el depurador a un proceso en otra máquina («node --inspect=0.0.0.0:9229», solo en redes seguras, nunca expuesto a internet).
- **Depuración que retrocede** (*time-travel debugging*): herramientas como rr (de Mozilla, para Linux) graban la ejecución y permiten ir hacia atrás, una ayuda enorme con errores intermitentes.

## Entornos de desarrollo reproducibles
"En mi máquina funciona" también se aplica al entorno: versión del lenguaje, extensiones, variables. Los **contenedores de desarrollo** (*Dev Containers*, una especificación abierta usada por VS Code y GitHub Codespaces) describen en un archivo del repositorio la imagen, las herramientas y las extensiones del editor. Una persona nueva abre el proyecto y en minutos tiene el mismo entorno que el resto del equipo, sin seguir una lista de instalación de dos páginas. Las configuraciones compartidas del editor («.vscode/settings.json», «extensions.json» con las extensiones recomendadas) son la versión liviana de lo mismo.`);

SDC.D('m7.script', `## Probar los scripts
Un script que procesa datos de producción merece pruebas, como cualquier código. La técnica más simple es separar la lógica (funciones puras que reciben texto o datos y devuelven el resultado) de la entrada y salida (leer archivos, argumentos, escribir), y probar la lógica con casos pequeños: una línea válida, una con espacios, una con placa inválida, una vacía, una con comas dentro de comillas. Ese último caso es un recordatorio útil: el formato CSV real admite comas entre comillas y saltos de línea dentro de un campo, así que dividir por comas solo sirve para archivos controlados; para el resto se usa una biblioteca de CSV. Otro hábito valioso es un modo de **ensayo** («--dry-run»), que muestra lo que el script haría sin hacerlo: indispensable antes de renombrar o borrar cien archivos.

## Probar expresiones regulares
Herramientas como regex101 muestran paso a paso cómo el motor recorre el texto, explican cada parte del patrón y avisan del retroceso excesivo. Una buena costumbre es guardar junto a cada expresión regular importante una lista de ejemplos que **debe** aceptar y otra que **debe** rechazar, y convertirlas en pruebas automáticas.`);
})();
