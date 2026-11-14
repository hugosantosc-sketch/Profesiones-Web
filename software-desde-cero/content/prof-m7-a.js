(function () {
var D = SDC.D;
SDC.XM('m7', { prof: true });

D('m7.cli', `## Dónde está cada cosa: la jerarquía de archivos de Unix
Los sistemas tipo Unix siguen una organización estándar, el **FHS** (*Filesystem Hierarchy Standard*, mantenido por la Linux Foundation). Conocerla evita buscar a ciegas:
| Ruta | Qué contiene |
|---|---|
| /bin, /usr/bin | programas para todos los usuarios |
| /etc | configuración del sistema (texto plano) |
| /home | carpetas personales de cada usuario |
| /var | datos que cambian: registros (/var/log), colas, bases |
| /tmp | archivos temporales, se borran al reiniciar |
| /opt | software instalado aparte del sistema |
| /proc, /sys | archivos virtuales que exponen el estado del núcleo |
Que la configuración sea texto en /etc y que el estado del núcleo se lea como archivos en /proc («cat /proc/cpuinfo») es la filosofía de "todo es un archivo" llevada a la práctica.

## Buscar: find, grep y sus sucesores
- «find . -name '*.js' -mtime -1» busca archivos JavaScript modificados en el último día; «-exec» ejecuta un comando sobre cada resultado.
- «grep -rn 'calcularMonto' src/» busca un texto en todos los archivos de una carpeta y muestra el número de línea; «-i» ignora mayúsculas, «-v» invierte, «-E» admite expresiones regulares extendidas.
- Herramientas modernas como **ripgrep** («rg», de Andrew Gallant, 2016) y **fd** hacen lo mismo mucho más rápido, respetan el «.gitignore» y tienen mejores valores por defecto. Los editores como VS Code usan ripgrep por dentro para su búsqueda global.
- «xargs» convierte la salida de un comando en argumentos de otro: «git ls-files '*.js' | xargs wc -l | sort -n | tail -5» muestra los cinco archivos más largos del repositorio.

## Instalar software: gestores de paquetes
Cada sistema tiene un **gestor de paquetes** que descarga programas con sus dependencias, verifica firmas y permite actualizar todo de una vez: «apt» en Debian y Ubuntu, «dnf» en Fedora, «pacman» en Arch, **Homebrew** en macOS, **winget**, Chocolatey o Scoop en Windows. Instalar con el gestor, en lugar de descargar instaladores de páginas web, es más seguro y reproducible: una lista de paquetes en un archivo basta para reconstruir una máquina de desarrollo.

## La terminal en Windows
Windows tiene su propia tradición. **CMD** es el intérprete heredado de MS-DOS. **PowerShell** (Jeffrey Snover, 2006) es un shell moderno cuya diferencia de fondo es que las tuberías pasan **objetos**, no texto: «Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU» filtra por una propiedad sin tener que recortar columnas. **Git Bash** trae una versión de Bash y las herramientas de Unix más comunes, suficiente para Git y scripts sencillos. **WSL** (*Windows Subsystem for Linux*, desde 2016; WSL 2 usa un núcleo Linux real en una máquina virtual liviana) permite trabajar con un Linux completo dentro de Windows, y es la opción recomendada para desarrollo web y de servidores si tu equipo usa Windows. Cuidado con dos diferencias que causan errores: Windows separa rutas con «\\» y Unix con «/», y los finales de línea son CRLF en Windows y LF en Unix (un script de Bash guardado con CRLF falla con mensajes confusos como "bad interpreter").

## Hacerla tuya
La terminal se vuelve cómoda cuando se adapta a ti: **alias** para comandos que repites («alias gs='git status'»), un archivo de configuración («~/.bashrc» o «~/.zshrc») versionado en un repositorio personal (los famosos *dotfiles*), un prompt que muestre la rama de Git, y la búsqueda en el historial con Ctrl+R. Diez minutos de configuración ahorran horas al año.`);

D('m7.git', `## Varias cuentas en una misma máquina
Es común tener una cuenta personal y otra de trabajo o de estudio. Git identifica al **autor** de cada commit con «user.name» y «user.email», y GitHub autentica la **conexión** con una clave SSH o un token. Son dos cosas distintas, y se configuran por separado:
1. Una clave SSH por cuenta («ssh-keygen -t ed25519 -C 'cuenta-trabajo'»), registrada en cada cuenta de GitHub.
2. En «~/.ssh/config», un **alias de host** por cuenta que elige la clave:
~~~txt
Host github-trabajo
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_trabajo
  IdentitiesOnly yes
~~~
3. Clonar con el alias: «git clone git@github-trabajo:empresa/repo.git». Para un repositorio existente, «git remote set-url origin git@github-trabajo:empresa/repo.git».
4. El autor se configura por repositorio («git config user.email 'yo@empresa.pe'», sin «--global»), o automáticamente por carpeta con «includeIf» en «~/.gitconfig»: todos los repos bajo «~/trabajo/» usan el correo del trabajo.
Si un push falla con "Permission denied", casi siempre es que la conexión usó la clave de otra cuenta: «ssh -T git@github-trabajo» dice con qué cuenta te reconoce GitHub.

## Herramientas que salvan el día
- **«git stash»** guarda los cambios sin commit para cambiar de rama y los recupera con «git stash pop».
- **«git bisect»** encuentra el commit que introdujo un error por **búsqueda binaria**: marcas un commit bueno y uno malo, Git te lleva al del medio, lo pruebas y le dices «good» o «bad». Con 1000 commits de diferencia, en unos 10 pasos tienes al culpable. Con «git bisect run npm test» lo hace solo.
- **«git cherry-pick <commit>»** copia un commit concreto a la rama actual (por ejemplo, llevar una corrección urgente a la rama de producción).
- **«git worktree add ../hotfix main»** abre otra rama en otra carpeta, sin tener que guardar ni cambiar lo que estás haciendo.
- **«git blame»** muestra quién cambió cada línea y en qué commit; útil para encontrar el **porqué** de un código (leyendo el mensaje del commit), no para culpar a nadie.
- **«git log -S 'calcularMonto'»** encuentra los commits que agregaron o quitaron ese texto.

## Ganchos (hooks)
Git puede ejecutar scripts en ciertos momentos: «pre-commit» (antes de crear el commit), «commit-msg» (para validar el mensaje), «pre-push». Los equipos los usan para correr el formateador y el linter sobre los archivos modificados, de modo que nada mal formateado llegue al repositorio. Herramientas como Husky y lint-staged en JavaScript, o el framework pre-commit en Python, los instalan para todo el equipo. Los ganchos locales se pueden saltar («--no-verify»), así que la verificación definitiva debe repetirse en la integración continua.

## Archivos grandes y secretos
Git guarda **toda** la historia: un archivo de 500 MB agregado y luego borrado sigue pesando en cada clon. Para binarios grandes existe **Git LFS**, que guarda en el repositorio solo un puntero. Y si un secreto (una contraseña, una clave de API) llegó a un commit publicado, borrarlo en un commit nuevo **no basta**: hay que **rotar** el secreto de inmediato (darlo por comprometido) y, si se quiere limpiar la historia, usar «git filter-repo». GitHub escanea los repositorios públicos en busca de claves filtradas, y los atacantes también.`);

D('m7.team', `## La integración continua en el flujo de pull requests
Un pull request es el lugar natural para la verificación automática. Cada vez que se abre o actualiza, la **integración continua** (GitHub Actions, GitLab CI y similares) instala dependencias, compila, corre el linter, las pruebas y los análisis de seguridad, y muestra el resultado en el propio PR. Las **reglas de protección de rama** convierten esa verificación en obligatoria: la rama principal no acepta merges si las verificaciones fallan o si falta la aprobación de un revisor. Así, la revisión humana se concentra en el diseño y la lógica, y deja a las máquinas el formato, los errores obvios y las pruebas. Muchos servicios crean además un **entorno de vista previa** por PR (Vercel lo hace automáticamente con cada rama), de modo que quien revisa puede probar el cambio en una URL sin descargar nada.

## Responsables y plantillas
- El archivo **CODEOWNERS** asigna responsables por carpeta («/facturacion/ @equipo-facturacion»); GitHub los pide como revisores automáticamente cuando un PR toca esa parte.
- Una **plantilla de PR** («.github/pull_request_template.md») pide siempre lo mismo: qué cambia, por qué, cómo se probó, capturas si hay cambios visuales y riesgos. Reduce las idas y vueltas.
- Las **plantillas de issues** separan reportes de error (pasos para reproducir, resultado esperado y obtenido, versión) de solicitudes de funcionalidad.

## Un repositorio o muchos
Un **monorepo** guarda varios proyectos (el frontend, la API, las bibliotecas compartidas) en un solo repositorio; Google, Meta y Microsoft trabajan así a escala masiva. Ventajas: un cambio que afecta a varios proyectos es un solo PR atómico, y todos usan la misma versión de las bibliotecas internas. Desventajas: necesita herramientas para construir y probar solo lo afectado (Nx, Turborepo, Bazel) y permisos más finos. Los **multirepos** dan independencia a cada equipo, a costa de coordinar versiones entre repositorios. Para un equipo pequeño, un monorepo con espacios de trabajo de npm suele ser lo más simple.

## Documentar decisiones
El código muestra **qué** se decidió, pero no **por qué**. Michael Nygard propuso en 2011 los **registros de decisiones de arquitectura** (ADR): archivos cortos y numerados en el repositorio («docs/adr/0007-usar-postgresql.md») con el contexto, la decisión, las alternativas descartadas y las consecuencias. Cuando alguien pregunte dentro de un año "¿por qué no usamos MongoDB?", la respuesta estará versionada junto al código. Lo verás con más detalle en arquitectura de software.

## Trabajo remoto y asíncrono
En equipos distribuidos, la colaboración se apoya en lo escrito: descripciones de PR completas, issues con contexto, decisiones registradas, y reuniones cortas solo para lo que de verdad necesita conversación. La regla útil es escribir para alguien que lo leerá horas después, en otra zona horaria y sin poder preguntarte.`);
})();
