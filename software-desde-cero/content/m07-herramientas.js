(function () {
var M = SDC.M, S = SDC.S;
M('m7', { title: 'Herramientas del oficio', desc: 'La terminal y Git son las herramientas que usarás todos los días de tu carrera. Dominarlas te hace mucho más rápido y te salva de los desastres.',
  thread: 'PatioApp entra a un repositorio. Cada función nueva vive en su rama, pasa por un pull request y queda en un historial que permite volver atrás.',
  books: '*Pro Git* (Chacon y Straub), *The Linux Command Line* (Shotts), *The Pragmatic Programmer* (Hunt y Thomas).',
  uni: 'Herramientas de Desarrollo (UTP), The Missing Semester (MIT), Software Configuration Management de SWEBOK v4.' });

S('m7', 'm7.cli', { title: 'Línea de comandos',
  ask: '¿Qué comando o concepto corresponde?',
  lesson: `
> **La idea en simple.** La interfaz gráfica es un menú con fotos: solo pides lo que aparece. La terminal es hablar con el cocinero: puedes pedir cualquier combinación, y repetirla mil veces sin cansarte.

## Lo esencial
~~~txt
pwd                 ¿dónde estoy?
ls -la              qué hay aquí, incluidos ocultos
cd proyecto         entrar a una carpeta (cd .. para salir)
mkdir src           crear carpeta
cp a.txt b.txt      copiar          mv a.txt c.txt   mover o renombrar
rm a.txt            borrar (¡sin papelera!)
cat a.txt           mostrar archivo
grep "error" a.log  buscar texto
~~~

## La filosofía Unix
Programas pequeños que hacen una sola cosa y se conectan con **tuberías**.
~~~txt
cat acceso.log | grep "500" | wc -l
# cuántos errores 500 hay en un registro

ls > lista.txt       # guarda la salida en un archivo (sobrescribe)
echo hola >> a.txt   # agrega al final
~~~

## Permisos
~~~txt
-rwxr-xr--  dueño: rwx, grupo: r-x, otros: r--
chmod 755 script.sh    r=4, w=2, x=1 → 7=4+2+1, 5=4+1
~~~

## Variables de entorno y scripts
«PATH» indica dónde buscar programas. Una clave secreta se guarda en una variable de entorno y nunca en el código. Un script une comandos que haces siempre.

## Rutas
- **Absoluta:** desde la raíz: «/home/ana/app».
- **Relativa:** desde donde estás: «../img/logo.png».

## Puntos que no debes omitir
- En Windows, Git Bash o WSL te dan estas mismas herramientas.
- «man comando» o «comando --help» te explican todo.
- La flecha arriba y Tab para autocompletar ahorran horas.
- «rm -rf» no pregunta. Revisa la ruta dos veces.

! Error común: copiar comandos de internet con sudo sin entenderlos.`,
  links: [['m8.os', 'cada comando es un proceso que el sistema operativo ejecuta'], ['m7.git', 'Git se usa principalmente desde aquí'], ['m15.containers', 'los contenedores se manejan desde la terminal'], ['m16.owasp', 'los secretos se guardan en variables de entorno']],
  read: 'Shotts, *The Linux Command Line*; MIT, *The Missing Semester*.',
  terms: [
    ['ls', 'comando que lista el contenido de una carpeta', ['Quieres ver los archivos de la carpeta actual.', 'Añades «-la» para ver los ocultos con detalles.', 'Revisas si un archivo se creó.']],
    ['cd', 'comando que cambia de carpeta', ['Entras a «src».', 'Subes un nivel con dos puntos.', 'Vas a tu carpeta personal con solo escribirlo.']],
    ['grep', 'comando que busca patrones de texto', ['Encuentras cada línea con "ERROR" en un registro.', 'Buscas dónde se usa una función en todo el proyecto.', 'Filtras la salida de otro comando.']],
    ['Tubería', 'mecanismo que envía la salida de un comando a la entrada de otro', ['«cat log | grep 500 | wc -l».', 'Se simboliza con una barra vertical.', 'Se combinan programas pequeños sin archivos intermedios.']],
    ['Redirección', 'enviar la salida de un comando a un archivo', ['«ls > lista.txt».', 'Con ">>" se agrega en vez de sobrescribir.', 'Se guardan los errores con «2> err.log».']],
    ['chmod', 'comando que cambia los permisos de un archivo', ['Haces ejecutable un script.', '«755» da todo al dueño y lectura al resto.', 'Se corrige un "Permission denied".']],
    ['Variable de entorno', 'valor configurable que el sistema entrega a los programas', ['«DATABASE_URL» cambia entre desarrollo y producción.', 'Una clave de API no se guarda en el código.', '«PATH» indica dónde buscar programas.']]
  ],
  q: [
    ['¿Qué permisos da chmod 644?', 'Dueño lee y escribe; grupo y otros solo leen', ['Todos leen y escriben', 'Dueño ejecuta; nadie más', 'Nadie tiene acceso'], '6 = 4+2 (rw), 4 = r.', 3],
    ['¿Qué hace «cat a.log | grep ERROR | sort | uniq -c»?', 'Cuenta cuántas veces aparece cada línea de error distinta', ['Borra los errores', 'Ordena todo el archivo', 'Copia el archivo'], 'Cada programa recibe la salida del anterior.', 4],
    ['¿Cuál es la ruta relativa de img/logo.png vista desde src/?', '../img/logo.png', ['/img/logo.png', 'img/logo.png', './src/img/logo.png'], '.. sube un nivel.', 3],
    { o: 'Ordena: crear un proyecto desde cero en la terminal.', s: ['mkdir app', 'cd app', 'git init', 'touch README.md', 'ls -la'], e: 'Creas la carpeta, entras, inicias el repositorio, creas el archivo y verificas.', l: 3 },
    ['Un script dice «Permission denied» al ejecutar. ¿Qué lo resuelve?', 'chmod +x script.sh', ['rm script.sh', 'cat script.sh', 'mkdir script.sh'], 'Falta el permiso de ejecución.', 2],
    ['¿Por qué no se guarda una clave de API en el código?', 'Queda en el historial del repositorio y cualquiera con acceso la ve', ['Porque Git no admite texto', 'Porque ocupa mucho', 'Porque hace lento el código'], 'Incluso borrándola sigue en el historial de Git.', 4],
    { c: 'Simula grep: «grep(lineas, patron)» devuelve las líneas que contienen el patrón.', f: 'grep', p: ['lineas', 'patron'], t: [[[['hola', 'error 1', 'ok'], 'error'], ['error 1']], [[[], 'x'], []]], sol: '  return lineas.filter(l => l.includes(patron));', l: 2 },
    { c: 'Simula «wc -l» con grep: «contarCoincidencias(texto, patron)» recibe un texto con saltos de línea y cuenta las líneas que contienen el patrón.', f: 'contarCoincidencias', p: ['texto', 'patron'], t: [[['a\nerror\nerror b', 'error'], 2], [['', 'x'], 0]], sol: "  return texto.split('\\n').filter(l => l.includes(patron)).length;", l: 3 },
    { c: 'Convierte permisos: «octal(s)» recibe un texto como "rwxr-xr--" y devuelve el número "754".', f: 'octal', p: ['s'], t: [[['rwxr-xr--'], '754'], [['rw-r--r--'], '644'], [['---------'], '000']], sol: "  let r = '';\n  for (let i = 0; i < 9; i += 3) {\n    const t = s.slice(i, i + 3);\n    r += (t[0] === 'r' ? 4 : 0) + (t[1] === 'w' ? 2 : 0) + (t[2] === 'x' ? 1 : 0);\n  }\n  return r;", l: 4 },
    { c: 'Resuelve rutas: «resolver(base, rel)» combina dos rutas absolutas y relativas manejando ".." y "." y devuelve la ruta final. Ej: ("/a/b", "../c") da "/a/c".', f: 'resolver', p: ['base', 'rel'], t: [[['/a/b', '../c'], '/a/c'], [['/a', './b'], '/a/b'], [['/', '..'], '/'], [['/a/b', '../../d/e'], '/d/e']], sol: "  const p = base.split('/').filter(Boolean);\n  for (const s of rel.split('/')) {\n    if (s === '..') p.pop();\n    else if (s !== '.' && s) p.push(s);\n  }\n  return '/' + p.join('/');", l: 4 }
  ],
  gen: function (g) {
    g.times(16, function (R) { var o = R.int(4, 7), gr = R.pick([0, 4, 5, 6, 7]), ot = R.pick([0, 4, 5]); var n = '' + o + gr + ot; var t = function (v) { return (v & 4 ? 'r' : '-') + (v & 2 ? 'w' : '-') + (v & 1 ? 'x' : '-'); }; g.input(2, '¿Cómo se escribe el permiso ' + n + ' en formato rwx?', t(o) + t(gr) + t(ot), 'Cada dígito: r=4, w=2, x=1.'); });
    var usos = [['Ver en qué carpeta estás.', 'pwd'], ['Mostrar el contenido de un archivo.', 'cat'], ['Crear una carpeta.', 'mkdir'], ['Renombrar un archivo.', 'mv'], ['Copiar un archivo.', 'cp'], ['Borrar un archivo.', 'rm'], ['Ver la ayuda de un comando.', 'man'], ['Ver las últimas líneas de un registro.', 'tail']];
    usos.forEach(function (u) { g.mcq(1, '¿Qué comando sirve para esto?\n' + u[0], u[1], g.R.sample(['pwd', 'cat', 'mkdir', 'mv', 'cp', 'rm', 'man', 'tail'].filter(function (x) { return x !== u[1]; }), 3), 'El comando es ' + u[1] + '.'); });
  } });

S('m7', 'm7.git', { title: 'Git: control de versiones',
  ask: '¿Qué concepto o comando de Git aplica?',
  lesson: `
> **La idea en simple.** Git es una máquina del tiempo para tu proyecto. Cada commit es una foto completa con nombre. Puedes volver a cualquier foto, y crear líneas de tiempo paralelas para probar ideas sin riesgo.

## Las tres zonas
:::flow Directorio de trabajo | Staging (git add) | Repositorio (git commit) | Remoto (git push)

## El flujo diario
~~~txt
git status                ¿qué cambió?
git add archivo.js        preparar el cambio
git commit -m "Valida el formato de placa"
git pull                  traer cambios del equipo
git push                  publicar los tuyos
git log --oneline         ver la historia
git diff                  ver qué líneas cambiaron
~~~

## Ramas
Una rama es solo un puntero a un commit. Crearlas es instantáneo.
~~~txt
git switch -c validar-placa   crear y entrar
git switch main               volver a main
git merge validar-placa       integrar
~~~

## Deshacer
| Quiero... | Comando | ¿Es seguro? |
| quitar del staging | git restore --staged a.js | sí |
| descartar cambios locales | git restore a.js | se pierden |
| revertir un commit ya publicado | git revert abc123 | sí, crea otro |
| cambiar la historia local | git reset | no, si ya publicaste |

## Por dentro
Cada commit se identifica por un hash de su contenido y apunta a su padre: un grafo dirigido acíclico. Por eso no se puede alterar un commit sin cambiar todos los siguientes.

## Buenos commits
- Pequeños y de una sola idea.
- Mensaje en imperativo que explica el porqué: «Corrige cálculo de días cuando cruza un año».
- Archivo «.gitignore» para no subir «node_modules» ni «.env».

## Puntos que no debes omitir
- Git es local y distribuido; GitHub es un servicio que aloja repositorios.
- Una clave subida por accidente queda en la historia: se debe revocar.
- Usa una clave SSH distinta si manejas varias cuentas.

! Error común: «git push --force» en una rama compartida. Borra trabajo ajeno. Si es necesario, usa «--force-with-lease» y avisa.`,
  links: [['m4.graphs', 'la historia de Git es un grafo'], ['m4.hash', 'cada commit se identifica por un hash'], ['m7.team', 'las ramas son la base del trabajo en equipo'], ['m15.cicd', 'cada push puede disparar pruebas y despliegue']],
  read: 'Chacon y Straub, *Pro Git*, capítulos 1 a 3 (gratis en línea).',
  terms: [
    ['Commit', 'foto guardada del proyecto con autor, fecha y mensaje', ['Guardas un punto al que puedes volver.', 'Se identifica por un hash.', 'Apunta a su padre.']],
    ['Staging', 'zona donde se preparan los cambios que irán al próximo commit', ['«git add» pone aquí un archivo.', 'Eliges solo dos de los cinco archivos cambiados.', '«git status» muestra lo que está listo.']],
    ['Rama', 'puntero móvil a un commit que permite líneas de trabajo paralelas', ['Pruebas una idea sin tocar main.', 'Crearla es casi instantáneo.', 'Cada función nueva tiene la suya.']],
    ['Merge', 'integrar en una rama los cambios de otra', ['Unes tu función a main.', 'Puede crear un commit con dos padres.', 'Puede producir conflictos si se tocó lo mismo.']],
    ['Revert', 'crear un commit nuevo que deshace los efectos de otro', ['Se retira un cambio ya publicado sin reescribir historia.', 'Es la forma segura de deshacer en main.', 'La historia conserva ambos commits.']],
    ['Reset', 'mover la rama a otro commit, reescribiendo la historia local', ['Quitas los últimos dos commits aún no publicados.', 'Con «--hard» además pierdes los cambios.', 'Es peligroso si ya se compartió.']],
    ['Gitignore', 'archivo que indica qué no debe versionarse', ['«node_modules» no se sube.', 'Un «.env» con claves queda fuera.', 'Se excluyen los archivos generados.']]
  ],
  q: [
    { o: 'Ordena el flujo para publicar un cambio.', s: ['git status', 'git add', 'git commit', 'git pull', 'git push'], e: 'Se revisa, se prepara, se guarda, se integra lo ajeno y se publica.', l: 2 },
    ['Subiste por error un .env con claves. ¿Qué es lo primero que haces?', 'Revocar y cambiar las claves', ['Borrar el archivo y hacer commit', 'Nada, nadie lo verá', 'Renombrar el repositorio'], 'Sigue en la historia. La clave ya se debe considerar filtrada.', 4],
    ['Quieres deshacer un commit que ya está en main y otros lo han bajado. ¿Qué usas?', 'git revert', ['git reset --hard y push --force', 'Borrar el repositorio', 'git add'], 'revert no reescribe la historia compartida.', 3],
    ['¿Qué es mejor mensaje de commit?', 'Corrige cálculo de días al cruzar de año', ['arreglos', 'wip', 'cambios varios'], 'Dice qué y por qué.', 2],
    ['¿Por qué cambiar un commit antiguo cambia todos los siguientes?', 'Porque cada hash depende del contenido y del hash del padre', ['Porque Git borra todo', 'Porque el servidor lo exige', 'Porque tienen la misma fecha'], 'La historia es una cadena de hashes.', 4],
    { c: 'Simula «git log»: «historia(commits, hash)» recibe un objeto {hash: padre} y un hash, y devuelve la lista desde ese commit hasta la raíz.', f: 'historia', p: ['commits', 'hash'], t: [[[{ c: 'b', b: 'a', a: null }, 'c'], ['c', 'b', 'a']], [[{ a: null }, 'a'], ['a']]], sol: '  const r = [];\n  for (let h = hash; h; h = commits[h]) r.push(h);\n  return r;', l: 3 },
    { c: 'Halla el ancestro común: «ancestro(c, a, b)» devuelve el primer commit común entre los historiales de a y b. Es lo que usa merge para saber desde dónde comparar.', f: 'ancestro', p: ['c', 'a', 'b'], t: [[[{ d: 'b', e: 'b', b: 'a', a: null }, 'd', 'e'], 'b'], [[{ b: 'a', a: null }, 'b', 'a'], 'a']], sol: '  const v = new Set();\n  for (let h = a; h; h = c[h]) v.add(h);\n  for (let h = b; h; h = c[h]) if (v.has(h)) return h;\n  return null;', l: 4 }
  ],
  gen: function (g) {
    var u = [['Ver qué archivos cambiaron.', 'git status'], ['Preparar un archivo para el commit.', 'git add'], ['Guardar los cambios preparados.', 'git commit'], ['Subir commits al remoto.', 'git push'], ['Traer e integrar del remoto.', 'git pull'], ['Copiar un repositorio remoto a tu PC.', 'git clone'], ['Ver la historia.', 'git log'], ['Ver líneas cambiadas.', 'git diff'], ['Crear y cambiar a una rama.', 'git switch -c'], ['Integrar otra rama en la actual.', 'git merge'], ['Encontrar el commit que introdujo un bug.', 'git bisect'], ['Guardar cambios temporalmente sin commit.', 'git stash']];
    var o = u.map(function (x) { return x[1]; });
    u.forEach(function (x, i) { g.mcq(i < 8 ? 1 : 2, '¿Qué comando usas?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'El comando es ' + x[1] + '.'); });
    g.times(5, function (R) { var e = R.int(4, 12); g.input(3, 'Con git bisect, ¿cuántos commits debes probar como máximo para hallar el culpable entre ' + Math.pow(2, e) + '?', e, 'Es búsqueda binaria: log₂ = ' + e + '.'); });
  } });

S('m7', 'm7.team', { title: 'Git en equipo y revisión de código',
  ask: '¿Qué práctica de equipo se describe?',
  lesson: `
> **La idea en simple.** Dos personas editando un mismo documento impreso terminan en conflicto. Las ramas y los pull requests son el acuerdo de cómo trabajar en paralelo y juntar sin pisarse.

## Flujo con pull request
:::flow Rama desde main | Commits pequeños | Pull request | Pruebas automáticas | Revisión | Merge | Despliegue

## Conflictos: no te asustes
Git los marca cuando dos personas cambiaron las mismas líneas.
~~~txt
<<<<<<< HEAD
const TARIFA = 20;
=======
const TARIFA = 25;
>>>>>>> nueva-tarifa
~~~
Editas, dejas lo correcto, borras las marcas, «git add» y «git commit». Los conflictos pequeños y frecuentes son fáciles; los enormes aparecen cuando una rama vive semanas.

## Merge contra rebase
- **Merge:** une conservando la historia real; agrega un commit de unión.
- **Rebase:** reaplica tus commits sobre la punta de otra rama; historia lineal, pero con hashes nuevos. **Nunca hagas rebase de commits ya compartidos.**

## Estrategias
- **GitHub Flow:** main siempre desplegable, ramas cortas y PR.
- **Trunk-based:** integrar a main varias veces al día, con *feature flags*. Lo que más se asocia a alto rendimiento (*Accelerate*).
- **Git Flow:** ramas develop y release. Útil para versiones planificadas; pesado para web.

## Revisión de código
Revisar encuentra errores, pero sobre todo reparte conocimiento.
- **Autor:** PR pequeño (bajo 400 líneas), descripción clara, autorrevisión antes.
- **Revisor:** primero diseño y corrección; el estilo lo hace la máquina. Comenta sobre el código, no sobre la persona. Pregunta en vez de ordenar.

## Versionado semántico
«MAYOR.MENOR.PARCHE»: rompe compatibilidad, agrega función, corrige error.

## Puntos que no debes omitir
- Si solo una persona entiende un módulo, tienes un factor de autobús de 1.
- Protege main: exige PR y pruebas.
- Un PR de 2000 líneas recibe un "se ve bien" sin leer.

! Error común: dejar una rama abierta tres semanas. Integra pronto y seguido.`,
  links: [['m7.git', 'se construye sobre ramas y commits'], ['m15.cicd', 'CI valida cada pull request'], ['m12.agile', 'la revisión es parte de la definición de terminado'], ['m6.clean', 'la revisión mantiene la calidad del código']],
  read: 'Forsgren, Humble y Kim, *Accelerate*; Google, *Software Engineering at Google*, capítulo 9.',
  terms: [
    ['Pull request', 'solicitud para revisar e integrar los cambios de una rama', ['Pides a un compañero que mire tu trabajo antes de unir.', 'CI corre las pruebas y el revisor comenta.', 'Se discute sobre líneas concretas.']],
    ['Conflicto de merge', 'situación en que Git no puede combinar cambios sobre las mismas líneas', ['Aparecen marcas <<<<<<< en un archivo.', 'Dos personas editaron la misma función.', 'Hay que elegir qué versión queda.']],
    ['Rebase', 'reaplicar commits sobre otra base para obtener una historia lineal', ['Actualizas tu rama local con lo último de main.', 'Tus commits obtienen hashes nuevos.', 'Es peligroso en ramas ya compartidas.']],
    ['Trunk-based', 'estrategia de integrar a la rama principal con mucha frecuencia', ['Todos integran a main cada día.', 'Las ramas duran horas y no semanas.', 'Lo inacabado se oculta con una bandera.']],
    ['Feature flag', 'interruptor que activa o desactiva una función sin desplegar', ['El código ya está en producción pero oculto.', 'Se activa para el 5% de usuarios.', 'Se apaga al instante si algo falla.']],
    ['Versionado semántico', 'esquema de versión mayor, menor y parche', ['Pasar de 2.3.1 a 3.0.0 avisa que algo se rompe.', 'Una corrección sube de 2.3.1 a 2.3.2.', 'Una función nueva compatible da 2.4.0.']],
    ['Factor de autobús', 'cuántas personas pueden faltar antes de que el proyecto se detenga', ['Solo Ana entiende los pagos.', 'La revisión de código reparte conocimiento.', 'Un sistema queda detenido cuando alguien renuncia.']]
  ],
  q: [
    ['La versión es 1.4.2 y agregas una función compatible. ¿Cuál es la nueva?', '1.5.0', ['2.0.0', '1.4.3', '1.4.2.1'], 'Función compatible: sube el menor y el parche vuelve a 0.', 3],
    ['Tienes tu rama con 3 commits sin publicar y main avanzó. ¿Qué puedes usar para mantener historia lineal?', 'git rebase main', ['git reset --hard', 'git push --force a main', 'git clone'], 'Es seguro porque tus commits no se han compartido.', 3],
    ['¿Cuál es el mejor comentario de revisión?', '¿Qué pasa aquí si la lista viene vacía? Podría dividir entre cero', ['Esto está mal', 'Nunca escribas así', 'Yo lo haría distinto'], 'Es concreto, respetuoso y explica el riesgo.', 3],
    ['¿Qué dice la investigación de Accelerate sobre ramas de larga vida?', 'Los equipos de alto rendimiento integran a menudo con ramas cortas', ['Las ramas largas dan mejor calidad', 'No hay diferencia', 'Lo mejor es no usar ramas nunca'], 'Lo asocia a mejor entrega y estabilidad.', 4],
    ['Un PR tiene 2500 líneas. ¿Qué haces?', 'Pedir partirlo en varios PR pequeños', ['Aprobarlo rápido', 'Revisar solo el primer archivo', 'Rechazar al autor'], 'Más allá de unas 400 líneas la revisión pierde efectividad.', 3],
    { c: 'Escribe «siguienteVersion(v, tipo)» donde tipo es "mayor", "menor" o "parche".', f: 'siguienteVersion', p: ['v', 'tipo'], t: [[['1.4.2', 'parche'], '1.4.3'], [['1.4.2', 'menor'], '1.5.0'], [['1.4.2', 'mayor'], '2.0.0']], sol: "  let [a, b, c] = v.split('.').map(Number);\n  if (tipo === 'mayor') return (a + 1) + '.0.0';\n  if (tipo === 'menor') return a + '.' + (b + 1) + '.0';\n  return a + '.' + b + '.' + (c + 1);", l: 3 },
    { c: 'Escribe «compararVersiones(a, b)» que devuelva −1, 0 o 1 comparando numéricamente (1.10.0 es mayor que 1.9.0).', f: 'compararVersiones', p: ['a', 'b'], t: [[['1.10.0', '1.9.0'], 1], [['1.0.0', '1.0.0'], 0], [['1.2.3', '2.0.0'], -1]], sol: "  const x = a.split('.').map(Number), y = b.split('.').map(Number);\n  for (let i = 0; i < 3; i++) {\n    if (x[i] > y[i]) return 1;\n    if (x[i] < y[i]) return -1;\n  }\n  return 0;", h: 'Como texto, "10" es menor que "9".', l: 4 },
    { c: 'Detecta conflictos: «hayConflicto(a, b)» recibe dos listas de rangos de líneas editadas [inicio, fin] y dice si alguno se solapa.', f: 'hayConflicto', p: ['a', 'b'], t: [[[[[1, 3]], [[3, 5]]], true], [[[[1, 2]], [[3, 4]]], false], [[[], [[1, 1]]], false]], sol: '  return a.some(([i, f]) => b.some(([x, y]) => i <= y && x <= f));', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var a = R.int(0, 5), b = R.int(0, 9), c = R.int(0, 9), t = R.pick([['una corrección de error compatible', a + '.' + b + '.' + (c + 1)], ['una función nueva compatible', a + '.' + (b + 1) + '.0'], ['un cambio que rompe la compatibilidad', (a + 1) + '.0.0']]); g.input(2, 'La versión es ' + a + '.' + b + '.' + c + ' y publicas ' + t[0] + '. ¿Cuál es la nueva versión?', t[1], 'Sigue el esquema mayor.menor.parche.'); });
    var o = ['GitHub Flow', 'Git Flow', 'Trunk-based'];
    [['Un equipo web despliega muchas veces al día, integra a main con banderas de función.', 'Trunk-based'], ['Software instalado con versiones planificadas y varias versiones con soporte.', 'Git Flow'], ['Equipo pequeño: main desplegable y una rama corta con PR por tarea.', 'GitHub Flow']].forEach(function (x) { g.mcq(3, '¿Qué estrategia encaja?\n' + x[0], x[1], o.filter(function (y) { return y !== x[1]; }), 'Es el contexto típico de ' + x[1] + '.'); });
  } });
})();
