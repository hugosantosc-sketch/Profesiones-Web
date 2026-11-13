(function () {
var X = SDC.X, XM = SDC.XM;
XM('m7', {
  uni: 'MIT *The Missing Semester of Your CS Education* (herramientas: terminal, Git, depuración); CMU 17-313 *Foundations of Software Engineering* (flujo con GitHub y revisión de código); Berkeley CS169 *Software Engineering*; Harvard CS50 (herramientas de desarrollo). En Perú: talleres de desarrollo e Ingeniería de Software (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp con flujo profesional de equipo',
    goal: 'Trabajar PatioApp como lo haría un equipo real: terminal automatizada, historial limpio y cambios integrados mediante revisión.',
    steps: ['Automatiza con scripts de terminal la instalación, las pruebas, el respaldo y el análisis de registros.', 'Organiza el repositorio con .gitignore, .gitattributes, README, CHANGELOG y mensajes de commit convencionales.', 'Protege la rama principal: exige pull request, pruebas automáticas y al menos una aprobación.', 'Integra tres funcionalidades en ramas cortas con PR, incluyendo un conflicto resuelto a propósito.', 'Publica la versión 1.0.0 con una etiqueta y notas de versión según el versionado semántico.'],
    deliver: 'El repositorio público con su historial, los PR revisados y la versión etiquetada.' }
});

X('m7.cli', {
  deep: `
## La filosofía Unix, de primera mano
Ken Thompson y Dennis Ritchie crearon Unix en los Laboratorios Bell a partir de 1969 y lo describieron en *The UNIX Time-Sharing System* (1974). Doug McIlroy, inventor de las tuberías, propuso la filosofía que Peter Salus resumió así en 1994: escribe programas que hagan una cosa y la hagan bien; escribe programas que trabajen juntos; escribe programas que manejen flujos de texto, porque esa es una interfaz universal. Medio siglo después, Linux, macOS y Git Bash en Windows siguen esas reglas.

## Tres flujos y un código de salida
Todo proceso nace con tres flujos abiertos:
| Número | Nombre | Para qué |
| 0 | stdin | entrada (teclado o una tubería) |
| 1 | stdout | salida normal |
| 2 | stderr | mensajes de error |
~~~txt
node reporte.js > salida.txt 2> errores.txt   # separa salida y errores
node reporte.js > todo.txt 2>&1               # ambos al mismo archivo
node reporte.js | tee copia.txt               # muestra y guarda a la vez
~~~
Al terminar, cada programa devuelve un **código de salida**: 0 significa éxito y cualquier otro número, falla. Se consulta con «echo $?» y permite encadenar con lógica: «npm test && git push» solo publica si las pruebas pasaron; «ping -c1 servidor || echo caído» avisa si falla.

## Las herramientas que más rinden
~~~txt
find . -name "*.js" -mtime -1            # archivos .js modificados en el último día
grep -rn "TODO" src/                     # buscar en todos los archivos, con número de línea
cut -d, -f2 ventas.csv | sort | uniq -c | sort -rn | head   # ranking de la columna 2
tail -f app.log | grep --line-buffered ERROR                # seguir un registro en vivo
curl -s https://api.ejemplo.com/unidades | jq '.[].placa'   # consumir una API y filtrar JSON
xargs -n1 < placas.txt                   # convertir líneas en argumentos
~~~
La combinación «sort | uniq -c | sort -rn» responde en segundos preguntas como "¿qué IP hizo más peticiones?" sobre archivos de millones de líneas, sin escribir un programa.

## Comillas, comodines y variables
- **Comodines (globbing):** «*.log» lo expande el shell antes de ejecutar el comando.
- **Comillas dobles:** permiten variables («"Hola $USER"»). **Simples:** todo literal («'$USER'»).
- Pon siempre las variables entre comillas («"$archivo"»): un nombre con espacios rompe un script sin ellas.

## Procesos y señales
«ps aux» lista los procesos, «top» o «htop» los muestra en vivo y «kill» envía **señales**: SIGINT (Ctrl+C, pide terminar), SIGTERM (terminar ordenadamente) y SIGKILL (matar sin aviso, no se puede atrapar). Un servidor bien hecho atrapa SIGTERM para cerrar conexiones y guardar datos antes de salir; es lo que hacen las plataformas de nube al detener una instancia.

## Scripts robustos
~~~txt
#!/usr/bin/env bash
set -euo pipefail        # detenerse ante errores, variables no definidas y fallas en tuberías
DESTINO="respaldos/$(date +%Y-%m-%d_%H%M)"
mkdir -p "$DESTINO"
cp datos/*.json "$DESTINO"/
ls -dt respaldos/*/ | tail -n +8 | xargs -r rm -rf    # conservar solo los 7 más recientes
echo "Respaldo listo en $DESTINO"
~~~
Sin «set -e», un script sigue ejecutándose después de que un comando falla, y puede borrar o sobrescribir lo que no debía.

## Acceso remoto con SSH
SSH (Secure Shell, creado por Tatu Ylönen en 1995) permite trabajar en otra máquina de forma cifrada. Con un par de claves (pública en el servidor, privada en tu máquina) no necesitas contraseña. Un archivo «~/.ssh/config» guarda alias, por ejemplo uno por cada cuenta de GitHub con su propia clave. La clave privada nunca se comparte ni se sube a un repositorio.

## Por qué vale la pena aprenderla
El curso *The Missing Semester of Your CS Education* del MIT nació porque los estudiantes dominaban la teoría pero perdían horas en tareas que la terminal resuelve en segundos. Kernighan y Pike lo explicaron en *The Unix Programming Environment* (1984): el poder no está en cada herramienta, sino en combinarlas. Además, casi todos los servidores, contenedores y sistemas de integración continua se manejan por terminal.`,
  checks: [
    ['¿Qué hace «comando > a.txt 2>&1» y en qué se diferencia de «comando 2>&1 > a.txt»?', 'El primero envía stdout al archivo y luego stderr a donde va stdout (el archivo). En el segundo, stderr se redirige a la pantalla (donde estaba stdout en ese momento) y solo stdout va al archivo: el orden importa.'],
    ['¿Para qué sirve el código de salida de un programa?', 'Para saber si terminó bien (0) o con error (distinto de 0); permite encadenar comandos con && y || y que los scripts y la integración continua detecten fallas.'],
    ['¿Qué hace «set -euo pipefail» en un script?', 'Detiene el script si un comando falla (-e), si se usa una variable no definida (-u) o si falla cualquier comando de una tubería (pipefail).'],
    ['Escribe una tubería que muestre las 5 placas que más aparecen en «registro.log», donde la placa está en la tercera columna separada por espacios.', 'cut -d" " -f3 registro.log | sort | uniq -c | sort -rn | head -5'],
    ['¿Qué diferencia hay entre SIGTERM y SIGKILL?', 'SIGTERM pide terminar y el programa puede atraparla para cerrar ordenadamente; SIGKILL lo termina de inmediato y no se puede atrapar.']
  ],
  cites: ['Ritchie, D. y Thompson, K. (1974). The UNIX Time-Sharing System. *Communications of the ACM*, 17(7).', 'Kernighan, B. y Pike, R. (1984). *The Unix Programming Environment*. Prentice Hall.', 'Shotts, W. (2019). *The Linux Command Line* (2.ª ed.). No Starch Press.', 'Salus, P. (1994). *A Quarter Century of UNIX*. Addison-Wesley.', 'MIT CSAIL (2020). *The Missing Semester of Your CS Education*. missing.csail.mit.edu.'],
  project: { t: 'Kit de scripts del patio',
    goal: 'Automatizar con la terminal las tareas repetitivas de un proyecto y analizar datos sin escribir programas.',
    steps: ['Script de respaldo con fecha en el nombre que conserve los 7 más recientes y falle con un mensaje claro si no hay datos.', 'Genera un registro de 100 000 líneas de prueba y responde con tuberías: operaciones por tipo, errores por hora y las 10 placas más activas.', 'Script que cree el esqueleto de un proyecto nuevo (carpetas, README, .gitignore) recibiendo el nombre como argumento.', 'Script que ejecute las pruebas y solo si pasan haga el commit y el push.', 'Configura alias y funciones útiles en tu archivo .bashrc.'],
    deliver: 'La carpeta de scripts con un README que explique cada uno y la salida de los análisis.' },
  hito: ['Agrega a PatioApp un script «respaldar.sh» que copie los datos JSON en una carpeta con la fecha en el nombre y conserve solo los últimos 7 respaldos.', 'Haz que PatioApp escriba un registro de operaciones y crea un script que cuente las operaciones por tipo con grep, sort y uniq -c.']
});

X('m7.git', {
  deep: `
## Un poco de historia
Linus Torvalds escribió Git en abril de 2005, en pocas semanas, cuando el núcleo de Linux perdió la licencia gratuita de la herramienta que usaba (BitKeeper). Sus objetivos fueron velocidad, diseño distribuido y protección fuerte contra la corrupción de datos. Hoy es el sistema de control de versiones dominante. Scott Chacon y Ben Straub explican su funcionamiento en *Pro Git*, libro gratuito y oficial.

## Por dentro: un almacén de objetos
Git guarda cuatro tipos de objetos, cada uno identificado por el **hash** de su contenido:
| Objeto | Qué guarda |
| blob | el contenido de un archivo (sin nombre) |
| tree | una carpeta: nombres de archivos y los hashes de sus blobs y subárboles |
| commit | un tree raíz, el o los commits padres, autor, fecha y mensaje |
| tag | un nombre fijo y anotado para un commit |
Si dos archivos tienen el mismo contenido, se guardan una sola vez. Si cambias un byte en un commit antiguo, cambia su hash y el de todos los commits posteriores: por eso la historia no se puede alterar sin que se note. Puedes ver los objetos con «git cat-file -p HEAD».

## Ramas, HEAD y referencias
Una rama es un archivo de texto con el hash de un commit. **HEAD** indica en qué rama estás. Al hacer commit, la rama actual avanza al nuevo commit. Si haces «checkout» de un commit específico en lugar de una rama, quedas en **HEAD separado**: puedes mirar, pero los commits que hagas no pertenecerán a ninguna rama hasta que crees una.

## Cómo funciona un merge
- **Avance rápido (fast-forward):** si la rama destino no avanzó, Git solo mueve el puntero.
- **Merge de tres vías:** si ambas ramas avanzaron, Git busca su **ancestro común** y compara cada rama contra él. Lo que cambió en un solo lado se toma automáticamente; lo que cambió en ambos lados sobre las mismas líneas es un **conflicto**.

## La red de seguridad: reflog
Git registra durante un tiempo (por defecto 90 días) cada movimiento de HEAD en el **reflog**. Si hiciste un «reset --hard» por error, el commit sigue existiendo:
~~~txt
git reflog                       # lista los estados recientes de HEAD
git reset --hard HEAD@{2}        # vuelve a como estabas dos movimientos atrás
git branch rescate abc1234       # o crea una rama en el commit "perdido"
~~~
Casi nada de lo que se commiteó se pierde de verdad; lo que nunca se commiteó, sí.

## Herramientas del día a día
~~~txt
git stash                     # guarda cambios a medias para cambiar de rama
git cherry-pick abc1234       # aplica un commit puntual en la rama actual
git log --oneline --graph --all   # la historia como grafo
git blame -L 10,20 app.js     # quién cambió esas líneas y en qué commit
git diff --staged             # lo que vas a commitear
git tag -a v1.2.0 -m "Versión 1.2.0"
~~~

## Finales de línea en Windows
Windows termina las líneas con CRLF y Linux y macOS con LF. Si el equipo mezcla sistemas, los diffs se llenan de cambios fantasma. Un archivo «.gitattributes» con «* text=auto eol=lf» normaliza el repositorio para todos.

## Mensajes de commit que sirven
Chris Beams propuso en 2014 siete reglas muy adoptadas: separa el asunto del cuerpo con una línea en blanco, limita el asunto a unos 50 caracteres, empieza con mayúscula, sin punto final, en **modo imperativo** ("Agrega", no "Agregado"), envuelve el cuerpo en 72 caracteres y explica **qué y por qué**, no cómo. La especificación **Conventional Commits** agrega un prefijo («feat:», «fix:», «docs:», «refactor:») que permite generar el CHANGELOG y decidir la versión automáticamente.
~~~txt
fix: calcula bien los días cuando el ingreso cruza el año

La resta de fechas usaba getDay() en lugar de la diferencia en
milisegundos, por lo que el 31/12 → 02/01 daba -29 días.
Cierra #42.
~~~

## Lo que nunca debe entrar al repositorio
Dependencias instaladas («node_modules»), archivos generados («dist»), configuraciones personales del editor y, sobre todo, **secretos** («.env», claves, tokens). Si un secreto se sube, borrarlo en un commit nuevo no basta: sigue en la historia. Hay que **revocarlo** de inmediato y, si se quiere limpiar la historia, usar herramientas como «git filter-repo».`,
  checks: [
    ['¿Por qué no se puede modificar un commit antiguo sin que cambien los hashes de los siguientes?', 'Porque cada commit incluye el hash de su padre; cambiar uno cambia su hash, lo que cambia el contenido (y el hash) de su hijo, y así en cadena.'],
    ['¿Qué es un merge de tres vías y cuándo produce conflicto?', 'Compara cada rama con su ancestro común; hay conflicto cuando ambas ramas cambiaron las mismas líneas de forma distinta respecto a ese ancestro.'],
    ['Hiciste «git reset --hard» y perdiste un commit. ¿Cómo lo recuperas?', 'Con «git reflog» encuentras el hash del estado anterior y vuelves con «git reset --hard <hash>» o creas una rama en ese commit.'],
    ['¿Para qué sirve un archivo .gitattributes con «* text=auto eol=lf»?', 'Para normalizar los finales de línea y evitar diffs falsos cuando el equipo mezcla Windows (CRLF) con Linux o macOS (LF).'],
    ['Subiste por error un archivo .env con una clave a GitHub. ¿Qué haces primero?', 'Revocar o rotar la clave de inmediato, porque ya puede haber sido copiada; luego agregar .env al .gitignore y, si se requiere, limpiar la historia.']
  ],
  cites: ['Chacon, S. y Straub, B. (2014). *Pro Git* (2.ª ed.). Apress. Disponible en git-scm.com/book.', 'Torvalds, L. (2005). Primer commit de Git, 7 de abril de 2005. git.kernel.org.', 'Beams, C. (2014). How to Write a Git Commit Message. cbea.ms.', 'Conventional Commits 1.0.0. conventionalcommits.org.'],
  project: { t: 'Laboratorio de Git por dentro',
    goal: 'Entender Git a nivel de objetos y practicar sin miedo las operaciones de deshacer y recuperar.',
    steps: ['Crea un repositorio con tres commits e inspecciona sus objetos con «git cat-file -p» hasta dibujar a mano el grafo de commits, árboles y blobs.', 'Crea dos ramas con cambios que se puedan fusionar sin conflicto y otras dos con conflicto; resuelve el conflicto.', 'Practica restore, revert, reset (soft, mixed y hard) y documenta qué cambia en cada zona.', 'Pierde un commit a propósito con reset --hard y recupéralo con reflog.', 'Configura .gitignore, .gitattributes y una plantilla de mensaje de commit.'],
    deliver: 'Un documento con el dibujo del grafo de objetos, la tabla de comandos y capturas de la recuperación.' },
  hito: ['Pon PatioApp bajo Git con .gitignore (node_modules, .env, respaldos), .gitattributes para los finales de línea y commits que sigan Conventional Commits.', 'Etiqueta la versión v0.1.0 y publica el repositorio en GitHub usando SSH.']
});

X('m7.team', {
  deep: `
## De las inspecciones a la revisión moderna
Michael Fagan formalizó en IBM, en 1976, las **inspecciones de código**: reuniones con roles definidos (moderador, lector, autor, inspectores) que revisaban el código línea por línea y encontraban la mayoría de los defectos antes de las pruebas. Eran eficaces pero lentas. La **revisión moderna** es liviana, asíncrona y basada en herramientas (el pull request). Alberto Bacchelli y Christian Bird estudiaron cómo se revisa en Microsoft (2013) y encontraron algo revelador: los desarrolladores esperan encontrar defectos, pero el beneficio principal resulta ser la **transferencia de conocimiento**, la conciencia del equipo sobre lo que cambia y la búsqueda de mejores soluciones.

## Tamaño y ritmo
Un estudio de SmartBear con equipos de Cisco (2006) observó que la capacidad de detectar defectos cae cuando se revisan más de 200 a 400 líneas de una vez o durante más de 60 minutos seguidos. La guía pública de revisión de código de Google lo resume en dos reglas:
- Los cambios deben ser **pequeños**: se revisan más rápido, con más cuidado y se revierten fácil.
- Un revisor debe aprobar un cambio cuando **mejora la salud general del código**, aunque no sea perfecto. Buscar la perfección bloquea al equipo.

## Qué mirar, en orden
1. **Diseño:** ¿el cambio pertenece aquí? ¿encaja con el resto del sistema?
2. **Funcionalidad:** ¿hace lo que pretende? ¿qué pasa con casos límite y errores?
3. **Complejidad:** ¿lo entenderá otra persona en seis meses?
4. **Pruebas:** ¿existen, son correctas y fallarían si el código se rompe?
5. **Nombres, comentarios y documentación.**
6. **Estilo:** solo lo que la herramienta automática no cubre.
Gerald Weinberg propuso en *The Psychology of Computer Programming* (1971) la **programación sin ego**: el código no es el programador, y criticar uno no es atacar al otro. Escribir "¿qué pasa si la lista viene vacía?" en lugar de "esto está mal" mantiene la conversación sobre el código.

## Estrategias de ramas con contexto
- **Git Flow:** propuesto por Vincent Driessen en 2010, con ramas «develop», «feature», «release» y «hotfix». En 2020 el propio Driessen agregó una nota aclarando que para aplicaciones web con entrega continua recomienda algo más simple.
- **GitHub Flow:** descrito por Scott Chacon en 2011: «main» siempre desplegable, una rama corta por cambio, pull request y despliegue al fusionar.
- **Trunk-based development:** todos integran a la rama principal al menos una vez al día. Las investigaciones de Forsgren, Humble y Kim en *Accelerate* (2018) lo asocian con equipos de alto rendimiento.

## Feature flags: integrar sin publicar
Un **feature flag** es un interruptor en el código que activa o desactiva una funcionalidad sin desplegar de nuevo. Permite integrar código a medio terminar escondido, liberar a un porcentaje de usuarios o apagar algo que falla en producción. Pete Hodgson los clasificó en 2017 (en el sitio de Martin Fowler) en flags de liberación, de experimento, operativos y de permisos. Su costo es la deuda: cada flag que queda olvidado es un if más que nadie entiende; hay que retirarlos cuando cumplieron su función.

## Versionado semántico en detalle
La especificación SemVer 2.0.0, escrita por Tom Preston-Werner (cofundador de GitHub), define:
- **MAYOR** sube cuando cambias la API de forma incompatible.
- **MENOR**, cuando agregas funcionalidad compatible.
- **PARCHE**, cuando corriges errores de forma compatible.
- Versiones previas: «2.0.0-beta.1»; la versión «0.y.z» es para desarrollo inicial, donde todo puede cambiar.
En npm, «^1.4.2» acepta cualquier 1.x.x desde 1.4.2 (no 2.0.0) y «~1.4.2» acepta solo 1.4.x. Un archivo de bloqueo («package-lock.json») fija las versiones exactas para que todos instalen lo mismo.

## Prácticas colaborativas
- **Programación en pareja:** dos personas, un teclado; una escribe ("conductor") y otra revisa y piensa la estrategia ("navegador"). Es una revisión continua.
- **Programación en grupo (mob):** popularizada por Woody Zuill; todo el equipo trabaja en lo mismo a la vez. Útil para problemas difíciles y para difundir conocimiento.
- **CODEOWNERS y ramas protegidas:** definen quién debe aprobar cambios en cada parte y evitan que alguien publique en «main» sin revisión ni pruebas.

## El factor de autobús
Es la cantidad mínima de personas que tendrían que faltar (por un "autobús" o, más amablemente, por vacaciones o un cambio de trabajo) para que un proyecto se detenga. Si solo una persona entiende la facturación, el factor es 1. La revisión de código, la rotación de tareas y la documentación lo suben.`,
  checks: [
    ['Según Bacchelli y Bird, ¿cuál es el beneficio principal real de la revisión de código?', 'La transferencia de conocimiento y la conciencia del equipo sobre los cambios, más que la detección de defectos que esperaban los desarrolladores.'],
    ['¿Por qué conviene que los pull requests sean pequeños?', 'Porque se revisan más rápido y con más atención (la detección cae tras 200 a 400 líneas), se integran antes y son fáciles de revertir.'],
    ['Con «"lodash": "^4.17.0"», ¿se instalaría la versión 4.18.2? ¿Y la 5.0.0?', 'La 4.18.2 sí, porque «^» acepta cambios menores y parches dentro de la misma versión mayor; la 5.0.0 no.'],
    ['¿Qué riesgo tienen los feature flags y cómo se controla?', 'Se acumulan como condicionales que nadie recuerda y complican el código; se controla retirándolos cuando cumplieron su función y registrando su dueño y fecha de vencimiento.'],
    ['Un módulo solo lo entiende una persona del equipo. ¿Qué tres medidas tomarías?', 'Revisiones de código obligatorias en ese módulo por otras personas, programación en pareja o rotación de tareas, y documentación de sus decisiones principales.']
  ],
  cites: ['Fagan, M. (1976). Design and code inspections to reduce errors in program development. *IBM Systems Journal*, 15(3).', 'Bacchelli, A. y Bird, C. (2013). Expectations, Outcomes, and Challenges of Modern Code Review. *ICSE 2013*.', 'Google (2019). *Google Engineering Practices: Code Review Developer Guide*. google.github.io/eng-practices.', 'Forsgren, N., Humble, J. y Kim, G. (2018). *Accelerate*. IT Revolution.', 'Preston-Werner, T. *Semantic Versioning 2.0.0*. semver.org.', 'Weinberg, G. (1971). *The Psychology of Computer Programming*. Van Nostrand Reinhold.'],
  project: { t: 'Simulación de un equipo con pull requests',
    goal: 'Vivir el ciclo completo de trabajo en equipo: ramas, PR, revisión, conflicto, versión y notas de cambio.',
    steps: ['Con un compañero (o con dos cuentas tuyas), protege main exigiendo PR, una aprobación y pruebas automáticas.', 'Crea una plantilla de PR (qué cambia, por qué, cómo probarlo) y una lista de verificación de revisión.', 'Desarrollen dos funcionalidades en paralelo que toquen el mismo archivo, provoquen un conflicto y resuélvanlo.', 'Revisen mutuamente sus PR dejando al menos tres comentarios de diseño y respondiéndolos.', 'Publiquen una versión con SemVer, etiqueta y CHANGELOG, y agreguen un feature flag para algo a medio terminar.'],
    deliver: 'El repositorio con los PR cerrados (incluidos los comentarios), la plantilla, la lista de verificación y el CHANGELOG.' },
  hito: ['Configura para PatioApp un flujo con pull requests: una rama por funcionalidad, plantilla de PR, main protegida y pruebas obligatorias.', 'Revisa (o pide que revisen) un PR con la lista de verificación del tema y publica la versión v0.2.0 con su CHANGELOG.']
});
})();
