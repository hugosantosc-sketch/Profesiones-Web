(function () {
var S = SDC.S;

S('m7', 'm7.build', { title: 'Construcción, paquetes y dependencias',
  ask: '¿Cómo se construye y empaqueta este proyecto y cómo se gestionan sus dependencias?',
  lesson: `
> **La idea en simple.** Un proyecto real no es un archivo que se ejecuta: es código propio más cientos de bibliotecas ajenas, que hay que descargar en versiones compatibles, transformar (compilar, empaquetar, minificar) y verificar antes de publicar. Hacer eso a mano es lento y frágil. Las herramientas de construcción y los gestores de paquetes lo automatizan, y entenderlas es lo que separa "funciona en mi máquina" de "funciona en todas".

## Qué es "construir"
**Construir** (*build*) es convertir el código fuente en algo que se pueda ejecutar o distribuir. Según el lenguaje incluye:
- **Resolver dependencias:** descargar las bibliotecas declaradas, en versiones compatibles entre sí.
- **Compilar o transpilar:** de C a código máquina, de Java a bytecode, de TypeScript a JavaScript.
- **Empaquetar:** juntar muchos módulos en pocos archivos (un JAR, un binario, un *bundle* de JavaScript para el navegador).
- **Optimizar:** minificar, eliminar código no usado, comprimir imágenes.
- **Verificar:** correr el linter, las pruebas y los análisis.
El objetivo es que todo esto sea **un solo comando** («npm run build», «mvn package», «cargo build»), igual en la máquina de cada desarrollador y en la integración continua.

## Gestores de paquetes de lenguaje
Cada ecosistema tiene su gestor y su registro público: **npm** (JavaScript, más de dos millones de paquetes), **pip** y PyPI (Python), **Maven** y Gradle (Java), **Cargo** (Rust), **NuGet** (.NET), **Composer** (PHP), los módulos de **Go**. Todos resuelven el mismo problema: un archivo de manifiesto declara qué necesita el proyecto, y el gestor descarga eso y todo lo que eso necesita (las **dependencias transitivas**).
En JavaScript, el manifiesto es «package.json»:
~~~js
{
  "name": "patioapp",
  "version": "1.4.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "test": "vitest run", "lint": "eslint ." },
  "dependencies": { "express": "^4.19.2", "pg": "^8.11.0" },
  "devDependencies": { "vite": "^5.2.0", "vitest": "^1.6.0", "eslint": "^9.3.0" }
}
~~~
Las **dependencies** se necesitan al ejecutar; las **devDependencies**, solo al desarrollar y construir. Los **scripts** son la interfaz del proyecto: cualquier persona nueva sabe que «npm test» corre las pruebas, sin leer documentación.

## Rangos de versión y el archivo de bloqueo
Con versionado semántico (MAYOR.MENOR.PARCHE), «^4.19.2» significa "cualquier 4.x.y mayor o igual a 4.19.2" (cambios compatibles), y «~4.19.2» significa "cualquier 4.19.y". Los rangos permiten recibir correcciones, pero tienen un problema: dos personas que instalan el mismo día pueden obtener versiones distintas si salió una nueva entre medio. Por eso existe el **archivo de bloqueo** («package-lock.json», «yarn.lock», «poetry.lock», «Cargo.lock»): registra la versión **exacta** y el hash de cada paquete del árbol completo. Reglas:
- El archivo de bloqueo **se versiona** en Git (en aplicaciones).
- En la integración continua se instala con «npm ci», que usa exactamente el archivo de bloqueo y falla si no coincide con el manifiesto.
- Actualizar es una acción deliberada («npm update», o PRs automáticos de herramientas como Dependabot o Renovate), revisada y probada como cualquier cambio.

## El infierno de las dependencias
Un proyecto de JavaScript mediano puede tener mil dependencias transitivas. Eso trae problemas conocidos:
- **Conflictos de versión:** A necesita la biblioteca X 1.x y B necesita X 2.x. npm puede instalar ambas en carpetas anidadas; Python y Java, en general, no, y hay que buscar una combinación compatible. Es el "infierno de las dependencias" (*dependency hell*).
- **Fragilidad:** en marzo de 2016, un desarrollador retiró de npm su paquete «left-pad», de 11 líneas, y miles de proyectos (incluidos React y Babel) dejaron de construirse durante horas. npm cambió sus reglas para impedir retirar paquetes de los que otros dependen.
- **Ataques a la cadena de suministro:** un atacante que toma el control de un paquete popular, o publica uno con un nombre parecido (*typosquatting*: «expresss» en lugar de «express»), ejecuta su código en miles de máquinas. Casos reales: «event-stream» en 2018 (robo de billeteras de criptomonedas) y la puerta trasera de **xz utils** descubierta en marzo de 2024 por Andres Freund, tras años de infiltración paciente de un mantenedor falso.
Defensas: depender de pocas bibliotecas y bien mantenidas, auditar («npm audit», alertas de GitHub), bloquear versiones, revisar los cambios de dependencias en los PR, y desconfiar de los scripts que se ejecutan al instalar.

## Herramientas de construcción
- **Make** (Stuart Feldman, Bell Labs, 1976) fue la primera: un archivo describe qué archivos dependen de cuáles y cómo regenerarlos, y Make solo rehace lo que cambió. Sigue vivo en proyectos de C y como "menú de tareas" de muchos repositorios (lo verás en la unidad de scripting).
- **Maven** (2004) y **Gradle** (2008) en Java: convenciones fijas de carpetas, ciclo de vida (compilar, probar, empaquetar) y gestión de dependencias integrada.
- **Bazel** (de Google, 2015) y similares: construcciones **herméticas** y en caché compartida, para monorepos gigantes.
- En el frontend: **empaquetadores** (*bundlers*) como webpack (2012), Rollup, esbuild (escrito en Go, decenas de veces más rápido) y **Vite** (Evan You, 2020), que en desarrollo sirve los módulos nativos del navegador sin empaquetar y en producción genera un bundle optimizado. Hacen **tree shaking** (eliminar el código que nadie importa) y **code splitting** (partir el bundle para que cada página descargue solo lo que usa).

## Construcciones reproducibles
Una construcción es **reproducible** si, con el mismo código fuente, produce exactamente los mismos bytes, en cualquier máquina. Importa para la seguridad: si cualquiera puede reconstruir el binario y obtener el mismo hash, nadie pudo insertar algo en el camino. El proyecto Reproducible Builds (desde 2013, impulsado por Debian) ha llevado a la mayoría de los paquetes de Debian a ser reproducibles. Los enemigos son las fechas incrustadas, el orden de los archivos y las rutas absolutas. Los contenedores y los archivos de bloqueo son pasos hacia lo mismo en tu proyecto.

## Ejemplo resuelto: "en mi máquina funciona"
Un desarrollador nuevo clona PatioApp, ejecuta «npm install» y el servidor falla al arrancar con un error en la biblioteca de fechas.
1. **Diagnóstico:** el repositorio no tenía «package-lock.json» (estaba en el «.gitignore»). Su instalación resolvió «^2.29.0» a la 2.30.1, publicada ayer con un cambio que rompió una función.
2. **Corrección inmediata:** fijar la versión que funciona y generar el archivo de bloqueo; versionarlo.
3. **Prevención:** la integración continua usa «npm ci»; se agrega «"engines": { "node": ">=20" }» al manifiesto y un archivo «.nvmrc» para que todos usen la misma versión de Node.
4. **Actualizaciones controladas:** Renovate abre un PR semanal con las actualizaciones; las pruebas corren sobre él antes de aceptar.
5. **Resultado:** cualquier persona, y el servidor de Vercel, construye exactamente lo mismo. El error de la biblioteca se reportó a sus autores con un caso mínimo.`,
  links: [['m7.team', 'versionado semántico y PR de actualización'], ['m15.cicd', 'la integración continua ejecuta la construcción'], ['m15.containers', 'contenedores para entornos reproducibles']],
  read: 'Documentación de npm: "package.json" y "package-lock.json"; Humble y Farley, *Continuous Delivery* (2010), capítulos 5 y 13; reproducible-builds.org.',
  terms: [
    ['Construcción', 'proceso automatizado que convierte el código fuente en un artefacto ejecutable o distribuible', ['npm run build.', 'Compilar y empaquetar.', 'Un solo comando.']],
    ['Gestor de paquetes', 'herramienta que descarga e instala bibliotecas y sus dependencias desde un registro', ['npm, pip, Cargo.', 'Manifiesto.', 'Dependencias transitivas.']],
    ['Dependencia transitiva', 'biblioteca que tu proyecto necesita indirectamente porque la usa otra de tus dependencias', ['Árbol de dependencias.', 'Miles en npm.', 'Riesgo de seguridad.']],
    ['Archivo de bloqueo', 'archivo que registra la versión exacta y el hash de cada dependencia instalada', ['package-lock.json.', 'Se versiona.', 'npm ci.']],
    ['Rango de versión', 'expresión que acepta varias versiones compatibles de una dependencia', ['^4.19.2.', '~4.19.2.', 'Versionado semántico.']],
    ['Empaquetador', 'herramienta que combina y optimiza los módulos de una aplicación web en pocos archivos', ['Vite, webpack.', 'Tree shaking.', 'Code splitting.']],
    ['Ataque a la cadena de suministro', 'ataque que compromete una dependencia o herramienta para llegar a quienes la usan', ['event-stream.', 'xz utils, 2024.', 'Typosquatting.']],
    ['Construcción reproducible', 'construcción que produce exactamente los mismos bytes a partir del mismo código fuente', ['Mismo hash.', 'Debian.', 'Seguridad.']]
  ],
  q: [
    ['¿Qué rango acepta «^4.19.2»?', 'Cualquier 4.x.y mayor o igual a 4.19.2', ['Solo la 4.19.2', 'Cualquier versión', 'Cualquier 4.19.y'], 'El circunflejo acepta cambios menores y parches.', 2],
    ['¿Para qué sirve el archivo package-lock.json?', 'Para fijar la versión exacta de cada dependencia del árbol', ['Para bloquear el repositorio', 'Para guardar contraseñas', 'Para listar los scripts'], 'Instalaciones idénticas.', 2],
    ['¿Qué diferencia hay entre «npm install» y «npm ci»?', 'npm ci instala exactamente lo del archivo de bloqueo y falla si no coincide', ['Son iguales', 'npm ci no instala nada', 'npm install es solo para CI'], 'Ideal para integración continua.', 3],
    ['¿Dónde va una biblioteca que solo se usa para correr las pruebas?', 'En devDependencies', ['En dependencies', 'En scripts', 'En el archivo de bloqueo a mano'], 'No se necesita al ejecutar.', 1],
    ['¿Qué mostró el caso de left-pad en 2016?', 'La fragilidad de depender de miles de paquetes ajenos', ['Que npm es inseguro siempre', 'Que JavaScript no sirve', 'Que los bundlers son lentos'], 'Un paquete de 11 líneas rompió miles de builds.', 3],
    ['¿Qué hace el tree shaking?', 'Elimina del bundle el código que nadie importa', ['Ordena las dependencias', 'Actualiza paquetes', 'Comprime imágenes'], 'Optimización de empaquetadores.', 2],
    ['¿Por qué las construcciones reproducibles mejoran la seguridad?', 'Porque cualquiera puede verificar que el binario corresponde al código fuente', ['Porque son más rápidas', 'Porque no tienen dependencias', 'Porque cifran el código'], 'Mismo código, mismos bytes.', 4],
    { tf: 'El archivo de bloqueo de una aplicación debe agregarse al .gitignore.', v: false, e: 'Se versiona para que todos instalen lo mismo.', l: 1 },
    { tf: 'Un atacante puede publicar un paquete con un nombre parecido a uno popular para engañar a quienes se equivocan al escribir.', v: true, e: 'Se llama typosquatting.', l: 2 },
    { c: 'Escribe «satisfaceCaret(version, base)»: true si version (texto "M.m.p") cumple el rango ^base (mismo mayor y mayor o igual a base). Supón mayor > 0.', f: 'satisfaceCaret', p: ['version', 'base'], t: [[['4.20.0', '4.19.2'], true], [['4.19.1', '4.19.2'], false], [['5.0.0', '4.19.2'], false], [['4.19.2', '4.19.2'], true]], sol: '  const v = version.split(\'.\').map(Number), b = base.split(\'.\').map(Number);\n  if (v[0] !== b[0]) return false;\n  for (let i = 1; i < 3; i++) { if (v[i] > b[i]) return true; if (v[i] < b[i]) return false; }\n  return true;', l: 3 },
    { c: 'Escribe «compararVersiones(a, b)»: devuelve −1, 0 o 1 según a sea menor, igual o mayor que b (formato "M.m.p").', f: 'compararVersiones', p: ['a', 'b'], t: [[['1.2.3', '1.10.0'], -1], [['2.0.0', '2.0.0'], 0], [['3.1.0', '3.0.9'], 1]], sol: '  const x = a.split(\'.\').map(Number), y = b.split(\'.\').map(Number);\n  for (let i = 0; i < 3; i++) { if (x[i] < y[i]) return -1; if (x[i] > y[i]) return 1; }\n  return 0;', l: 2 },
    { c: 'Escribe «dependenciasTotales(grafo, raiz)»: grafo es {paquete: [dependencias]}; devuelve cuántos paquetes distintos (sin contar la raíz) se instalan.', f: 'dependenciasTotales', p: ['grafo', 'raiz'], t: [[[{ app: ['a', 'b'], a: ['c'], b: ['c', 'd'], c: [], d: [] }, 'app'], 4], [[{ app: [] }, 'app'], 0]], sol: '  const vistos = new Set(), pila = [...(grafo[raiz] || [])];\n  while (pila.length) { const p = pila.pop(); if (vistos.has(p)) continue; vistos.add(p); pila.push(...(grafo[p] || [])); }\n  vistos.delete(raiz);\n  return vistos.size;', l: 3 }
  ],
  gen: function (g) {
    var ra = [['^1.4.2', '1.9.0', 'Sí'], ['^1.4.2', '2.0.0', 'No'], ['~1.4.2', '1.4.9', 'Sí'], ['~1.4.2', '1.5.0', 'No'], ['^1.4.2', '1.4.1', 'No'], ['1.4.2', '1.4.3', 'No'], ['^3.0.0', '3.12.7', 'Sí']];
    ra.forEach(function (r) { g.mcq(2, '¿La versión ' + r[1] + ' cumple el rango ' + r[0] + '?', r[2], [r[2] === 'Sí' ? 'No' : 'Sí', 'Depende del sistema operativo', 'Solo en producción'], '^ acepta menores y parches; ~ solo parches; sin símbolo, la exacta.'); });
    var he = [['Gestor de paquetes de Rust', 'Cargo'], ['Gestor de paquetes de Python', 'pip'], ['Construcción de proyectos Java', 'Gradle'], ['Empaquetador moderno del frontend', 'Vite'], ['Herramienta clásica de 1976 que solo rehace lo que cambió', 'Make'], ['Construcciones herméticas para monorepos de Google', 'Bazel']];
    he.forEach(function (h) { g.mcq(1, '¿Qué herramienta corresponde? ' + h[0], h[1], ['Cargo', 'pip', 'Gradle', 'Vite', 'Make', 'Bazel'].filter(function (x) { return x !== h[1]; }).slice(0, 3), 'Herramientas de construcción.'); });
    g.times(5, function (R) { var M = R.int(1, 5), m = R.int(0, 9), p = R.int(0, 9); g.mcq(2, 'Tu proyecto está en ' + M + '.' + m + '.' + p + ' y agregas una función nueva compatible. ¿Cuál es la siguiente versión?', M + '.' + (m + 1) + '.0', [M + '.' + m + '.' + (p + 1), (M + 1) + '.0.0', M + '.' + (m + 1) + '.' + p], 'Funcionalidad compatible: sube MENOR y PARCHE vuelve a 0.'); });
  },
  checks: [
    ['¿Qué etapas incluye construir un proyecto?', 'Resolver dependencias, compilar o transpilar, empaquetar, optimizar y verificar, idealmente en un solo comando.'],
    ['Explica para qué sirven los rangos de versión y el archivo de bloqueo.', 'Los rangos permiten recibir versiones compatibles; el archivo de bloqueo fija la versión exacta para que todos instalen lo mismo.'],
    ['¿Qué riesgos traen las dependencias y cómo se mitigan?', 'Conflictos, fragilidad y ataques a la cadena de suministro; con pocas dependencias, auditoría, versiones bloqueadas y revisión de cambios.'],
    ['¿Qué es una construcción reproducible y por qué importa?', 'Produce los mismos bytes con el mismo código; permite verificar que nadie alteró el artefacto.']
  ],
  cites: ['Feldman, S. (1979). Make: A Program for Maintaining Computer Programs. *Software: Practice and Experience*, 9(4).', 'Humble, J. y Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.', 'Preston-Werner, T. *Semantic Versioning 2.0.0*. semver.org.', 'Lamb, C. y Zacchiroli, S. (2022). Reproducible Builds: Increasing the Integrity of Software Supply Chains. *IEEE Software*, 39(2).', 'Ohm, M., Plate, H., Sykosch, A. y Meier, M. (2020). Backstabber\'s Knife Collection: A Review of Open Source Software Supply Chain Attacks. *DIMVA 2020*.'],
  project: { t: 'Un proyecto que se construye igual en todas partes',
    goal: 'Configurar la construcción y las dependencias de un proyecto de forma reproducible y segura.',
    steps: ['Crea un proyecto con package.json, scripts para dev, build, test y lint, y separa dependencies de devDependencies.', 'Genera y versiona el archivo de bloqueo; fija la versión de Node con engines y .nvmrc.', 'Configura la integración continua para instalar con npm ci y correr build y test.', 'Ejecuta npm audit, revisa el árbol con npm ls y elimina una dependencia que puedas reemplazar con pocas líneas propias.', 'Construye dos veces en limpio y compara los hashes del resultado; explica las diferencias que encuentres.'],
    deliver: 'El repositorio, el archivo de CI y un informe de dependencias y reproducibilidad.' },
  hito: ['Versiona el archivo de bloqueo de PatioApp, fija la versión de Node y haz que la integración continua instale con npm ci.', 'Audita las dependencias de PatioApp y configura actualizaciones automáticas revisadas por PR.']
});
SDC.after('m7.build', 'm7.team');

S('m7', 'm7.ide', { title: 'Editores, depuradores y herramientas de calidad',
  ask: '¿Qué herramienta del entorno de desarrollo resuelve esto?',
  lesson: `
> **La idea en simple.** Programar no es solo escribir: es navegar por miles de líneas, entender qué hace el código mientras corre, encontrar errores antes de que lleguen al usuario y mantener un estilo que todo el equipo pueda leer. Un buen entorno de desarrollo hace todo eso por ti, y saber usarlo a fondo multiplica tu productividad más que cualquier otra cosa en el primer año.

## Editor o IDE
Un **editor de texto** para código (Vim, Emacs, Sublime Text) edita archivos con resaltado y atajos. Un **entorno de desarrollo integrado** (IDE) agrega comprensión del programa: autocompletado según los tipos, navegación a la definición, refactorizaciones seguras, depurador y pruebas integradas. Los primeros IDE fueron Turbo Pascal (Borland, 1983, que compilaba en segundos dentro del mismo programa) y Visual Basic (1991). Hoy la frontera es difusa: **Visual Studio Code** (Microsoft, 2015), el editor más usado según las encuestas de Stack Overflow, es un editor liviano que se vuelve IDE con extensiones; **IntelliJ IDEA** y la familia JetBrains son IDE completos con análisis profundos; **Neovim** es la evolución moderna de Vim para quienes prefieren el teclado.

## El protocolo que lo cambió todo: LSP
Antes de 2016, cada editor necesitaba su propio soporte para cada lenguaje: M editores por N lenguajes eran M × N integraciones. Microsoft publicó entonces el **Language Server Protocol** (LSP): un **servidor de lenguaje** (como «typescript-language-server», «rust-analyzer» o «pyright») entiende el lenguaje, y cualquier editor que hable LSP le pregunta "¿qué hay en esta posición?", "¿dónde se define esto?", "¿qué errores tiene este archivo?". El problema pasó a ser M + N. Por eso hoy Neovim, Emacs, VS Code y otros ofrecen casi la misma inteligencia para cualquier lenguaje. El mismo diseño se aplicó a la depuración con el **Debug Adapter Protocol** (DAP).

## Habilidades del editor que más rinden
- **Ir a la definición** (F12 en VS Code) y **buscar referencias**: entender código ajeno es saltar entre definiciones.
- **Paleta de comandos** (Ctrl+Shift+P) y **abrir archivo por nombre** (Ctrl+P): nunca navegar el árbol de carpetas con el mouse.
- **Renombrar símbolo** (F2): cambia el nombre en todos los usos, entendiendo el código, no buscando texto.
- **Múltiples cursores** (Alt+clic, Ctrl+D): editar varias líneas parecidas a la vez.
- **Búsqueda global** con expresiones regulares y reemplazo.
- **Terminal integrada** y el panel de **control de versiones** para ver diferencias antes de confirmar.
Aprender diez atajos al mes, a propósito, es una inversión que se paga sola.

## El depurador
Llenar el código de «console.log» funciona, pero un **depurador** es mucho más poderoso: detiene el programa en un punto y te deja inspeccionar todo su estado.
- Un **punto de interrupción** (*breakpoint*) detiene la ejecución en una línea. Los **condicionales** solo se detienen si se cumple una expresión («placa === 'ABC-123'»), y los **logpoints** imprimen un mensaje sin detenerse ni modificar el código.
- **Paso a paso:** *step over* ejecuta la línea actual, *step into* entra en la función llamada, *step out* termina la función actual.
- La **pila de llamadas** muestra cómo se llegó hasta aquí; las **variables** y las **expresiones vigiladas** muestran el estado; la **consola de depuración** evalúa expresiones en ese contexto.
- En JavaScript: la palabra «debugger» en el código detiene la ejecución si las herramientas están abiertas; «node --inspect» permite depurar Node desde Chrome o VS Code; las **herramientas de desarrollo** del navegador (F12) depuran el frontend, inspeccionan la red, el almacenamiento y el rendimiento.
- Los **source maps** relacionan el código transformado (minificado o transpilado de TypeScript) con el original, para que depures lo que escribiste y no lo que generó el empaquetador.

## Linters y formateadores
- Un **formateador** (Prettier en JavaScript, Black en Python, gofmt en Go, rustfmt) reescribe el código con un estilo único: sangrías, comillas, saltos de línea. Termina las discusiones de estilo en las revisiones: el formato no se discute, lo decide la herramienta. gofmt (2009) demostró que un estilo único y obligatorio es aceptado por toda una comunidad.
- Un **linter** (ESLint, Pylint, Ruff, Clippy en Rust) analiza el código sin ejecutarlo en busca de errores probables y malas prácticas: variables no usadas, comparaciones con «==» en lugar de «===», promesas sin «await», código inalcanzable. El nombre viene de **lint**, de Stephen Johnson (Bell Labs, 1978), que buscaba "pelusa" en programas en C.
- Un **verificador de tipos** (TypeScript con «tsc --noEmit», mypy en Python) encuentra errores de tipos antes de ejecutar.
Se configuran en archivos del repositorio («eslint.config.js», «.prettierrc», «.editorconfig») para que todo el equipo use las mismas reglas, se ejecutan al guardar en el editor, en un gancho de pre-commit y en la integración continua.

## Asistentes de IA en el editor
Desde GitHub Copilot (2021), los editores incluyen asistentes que completan líneas o funciones, explican código, generan pruebas y proponen cambios en varios archivos. Son útiles para el código repetitivo y para explorar APIs desconocidas, pero producen código plausible que puede estar mal. Las reglas profesionales: entender todo lo que aceptas, revisarlo como revisarías un PR de alguien nuevo, mantener las pruebas como red de seguridad y no pegar secretos ni datos personales en las instrucciones. Para aprender, conviene escribir primero tu solución y usar el asistente para compararla.

## Ejemplo resuelto: un error que solo aparece con una placa
En PatioApp, la salida de la placa «B7Q-0O1» calcula un monto negativo; con las demás funciona.
1. **Reproducir:** se escribe una prueba con esa placa. Falla.
2. **Depurar:** punto de interrupción condicional en «calcularMonto» con «estadia.placa === 'B7Q-0O1'». Al detenerse, la pila de llamadas muestra que la estadía llegó desde «buscarPorPlaca».
3. **Inspeccionar:** en la consola de depuración, «estadia.entrada» es una fecha del año 2027: la búsqueda devolvió otra estadía, de una placa con «0» en lugar de «O», cuya entrada se digitó mal.
4. **Causa:** la búsqueda tolerante a errores tomaba la primera coincidencia aproximada aunque hubiera una exacta.
5. **Corrección:** priorizar la coincidencia exacta, validar que la entrada no sea futura y agregar las pruebas. ESLint, configurado con una regla nueva, impide que vuelva a usarse «find» sobre resultados aproximados sin ordenarlos.
Sin depurador, este error habría costado una tarde de «console.log»; con él, quince minutos.`,
  links: [['m3.debug', 'la depuración como método'], ['m14.static', 'el análisis estático en las pruebas'], ['m7.git', 'los ganchos que ejecutan linters y formateadores']],
  read: 'Documentación de VS Code: "Debugging" y "Language Server Extension Guide"; Microsoft, especificación del Language Server Protocol; Johnson, S. (1978), "Lint, a C Program Checker".',
  terms: [
    ['IDE', 'entorno de desarrollo que integra edición, comprensión del código, depuración y pruebas', ['IntelliJ.', 'VS Code con extensiones.', 'Turbo Pascal, 1983.']],
    ['Language Server Protocol', 'protocolo que separa la inteligencia de un lenguaje del editor que la muestra', ['Microsoft, 2016.', 'M + N.', 'rust-analyzer.']],
    ['Punto de interrupción', 'marca que detiene la ejecución del programa en una línea para inspeccionar su estado', ['Condicional.', 'Logpoint.', 'debugger.']],
    ['Pila de llamadas', 'lista de funciones activas que muestra cómo se llegó al punto actual', ['Call stack.', 'En el depurador.', 'En los errores.']],
    ['Source map', 'archivo que relaciona el código transformado con el código fuente original', ['TypeScript.', 'Minificado.', 'Depurar lo que escribiste.']],
    ['Formateador', 'herramienta que reescribe el código con un estilo único y automático', ['Prettier.', 'gofmt.', 'Fin de discusiones.']],
    ['Linter', 'herramienta que analiza el código sin ejecutarlo en busca de errores probables y malas prácticas', ['ESLint.', 'lint, 1978.', 'Ruff.']],
    ['Paso a paso', 'ejecución controlada línea por línea entrando o no en las funciones', ['Step over.', 'Step into.', 'Step out.']]
  ],
  q: [
    ['¿Qué problema resolvió el Language Server Protocol?', 'Que cada editor necesitara su propia integración para cada lenguaje', ['La lentitud de los compiladores', 'La seguridad de los editores', 'El control de versiones'], 'De M × N a M + N.', 3],
    ['¿Qué hace un punto de interrupción condicional?', 'Detiene la ejecución solo cuando se cumple una expresión', ['Detiene siempre', 'Borra la línea', 'Imprime sin detener'], 'Ideal para casos específicos.', 2],
    ['¿Qué diferencia hay entre step over y step into?', 'Step over ejecuta la línea sin entrar en la función; step into entra en ella', ['Son iguales', 'Step into termina el programa', 'Step over retrocede'], 'Navegación del depurador.', 2],
    ['¿Qué hace un formateador como Prettier?', 'Reescribe el código con un estilo único automáticamente', ['Encuentra errores de lógica', 'Ejecuta las pruebas', 'Compila el código'], 'El formato no se discute.', 1],
    ['¿Para qué sirven los source maps?', 'Para depurar el código original aunque se ejecute una versión transformada', ['Para dibujar mapas', 'Para comprimir el código', 'Para ocultar el código'], 'TypeScript y minificado.', 3],
    ['¿Qué tipo de problema detecta un linter?', 'Errores probables y malas prácticas sin ejecutar el código', ['Fallos de red en producción', 'Lentitud del servidor', 'Errores de hardware'], 'Análisis estático.', 2],
    ['¿Cuál es la práctica correcta con el código sugerido por un asistente de IA?', 'Entenderlo y revisarlo como un PR, con pruebas que lo respalden', ['Aceptarlo siempre', 'Rechazarlo siempre', 'Pegarlo con los secretos del proyecto'], 'Código plausible no es código correcto.', 4],
    { tf: 'Renombrar un símbolo con F2 en un IDE es lo mismo que buscar y reemplazar texto.', v: false, e: 'Entiende el código y solo cambia los usos de ese símbolo.', l: 2 },
    { tf: 'Un logpoint imprime un mensaje sin detener la ejecución ni modificar el código.', v: true, e: 'Útil en lugar de console.log temporales.', l: 2 },
    { c: 'Escribe «sinUsar(declaradas, usadas)»: lista ordenada de variables declaradas que nunca se usan (como haría un linter).', f: 'sinUsar', p: ['declaradas', 'usadas'], t: [[[['a', 'b', 'c'], ['a', 'c', 'c']], ['b']], [[['x'], ['x']], []], [[['z', 'y'], []], ['y', 'z']]], sol: '  const u = new Set(usadas);\n  return declaradas.filter(d => !u.has(d)).sort();', l: 1 },
    { c: 'Escribe «sangria(lineas)»: recibe líneas con llaves y devuelve las líneas reformateadas con 2 espacios por nivel (sube tras una línea que termina en «{», baja en una que empieza con «}»). Quita los espacios originales.', f: 'sangria', p: ['lineas'], t: [[[['if (a) {', 'x();', '}']], ['if (a) {', '  x();', '}']], [[['a {', 'b {', 'c', '}', '}']], ['a {', '  b {', '    c', '  }', '}']]], sol: '  let n = 0;\n  return lineas.map(l => { const t = l.trim(); if (t.startsWith(\'}\')) n--; const r = \'  \'.repeat(Math.max(0, n)) + t; if (t.endsWith(\'{\')) n++; return r; });', l: 3 },
    { c: 'Escribe «usaDobleIgual(codigo)»: true si el código contiene «==» o «!=» que no sean «===» o «!==».', f: 'usaDobleIgual', p: ['codigo'], t: [[['if (a == b) x();'], true], [['if (a === b) x();'], false], [['a != b'], true], [['a !== b'], false]], sol: '  return /[^=!]==[^=]|!=[^=]/.test(\' \' + codigo + \' \');', l: 3 }
  ],
  gen: function (g) {
    var he = [['Unificar sangrías y comillas en todo el equipo', 'Formateador'], ['Detectar variables declaradas y no usadas', 'Linter'], ['Detener el programa cuando placa sea ABC-123', 'Punto de interrupción condicional'], ['Ver cómo se llegó a la función actual', 'Pila de llamadas'], ['Depurar TypeScript aunque corre JavaScript', 'Source map'], ['Que un editor entienda Rust sin plugin propio', 'Language Server Protocol'], ['Imprimir un valor sin tocar el código ni detenerse', 'Logpoint']];
    var op = ['Formateador', 'Linter', 'Punto de interrupción condicional', 'Pila de llamadas', 'Source map', 'Language Server Protocol', 'Logpoint'];
    he.forEach(function (h) { g.mcq(2, '¿Qué herramienta o concepto corresponde? ' + h[0], h[1], op.filter(function (x) { return x !== h[1]; }).slice(0, 3), 'Herramientas del entorno de desarrollo.'); });
    var pa = [['Ejecutar la línea actual sin entrar en las funciones que llama', 'Step over'], ['Entrar en la función que se llama en la línea actual', 'Step into'], ['Terminar la función actual y volver a quien la llamó', 'Step out'], ['Seguir hasta el siguiente punto de interrupción', 'Continuar']];
    pa.forEach(function (p) { g.mcq(1, '¿Qué acción del depurador hace esto? ' + p[0], p[1], ['Step over', 'Step into', 'Step out', 'Continuar'].filter(function (x) { return x !== p[1]; }), 'Navegación del depurador.'); });
    g.times(4, function (R) { var m = R.int(3, 12), n = R.int(5, 30); g.input(3, 'Sin LSP, ' + m + ' editores y ' + n + ' lenguajes necesitan M × N integraciones. ¿Cuántas necesitan con LSP (M + N)?', m + n, 'Cada editor implementa el cliente y cada lenguaje su servidor.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre un editor y un IDE, y qué cambió el LSP?', 'El IDE entiende el programa (tipos, navegación, depuración); el LSP permite que cualquier editor obtenga esa inteligencia de un servidor de lenguaje.'],
    ['Describe las herramientas principales de un depurador.', 'Puntos de interrupción (condicionales y logpoints), paso a paso, pila de llamadas, variables y consola de evaluación.'],
    ['¿Qué hace un formateador y qué hace un linter?', 'El formateador impone el estilo automáticamente; el linter detecta errores probables y malas prácticas sin ejecutar.'],
    ['¿Cómo usar con responsabilidad un asistente de IA en el editor?', 'Entender y revisar lo que sugiere, respaldarlo con pruebas y no compartir secretos ni datos personales.']
  ],
  cites: ['Johnson, S. C. (1978). Lint, a C Program Checker. Bell Laboratories Computer Science Technical Report 65.', 'Microsoft (2016). *Language Server Protocol Specification*. microsoft.github.io/language-server-protocol.', 'Beller, M., Spruit, N., Spinellis, D. y Zaidman, A. (2018). On the Dichotomy of Debugging Behavior Among Programmers. *ICSE 2018*.', 'Stack Overflow (2024). *Developer Survey 2024*. survey.stackoverflow.co.'],
  project: { t: 'Tu entorno profesional',
    goal: 'Configurar un entorno de desarrollo completo y dominar el depurador.',
    steps: ['Configura en un proyecto ESLint, Prettier y .editorconfig, con formateo al guardar.', 'Agrega un gancho de pre-commit que ejecute el linter y el formateador sobre los archivos modificados.', 'Introduce tres errores sutiles en un programa y encuéntralos solo con el depurador (sin console.log), documentando los pasos.', 'Configura la depuración de Node desde el editor y la del frontend con source maps.', 'Elige diez atajos de tu editor, practícalos una semana y mide el antes y el después en una tarea repetida.'],
    deliver: 'La configuración en el repositorio, el registro de depuración y la lista de atajos con tu medición.' },
  hito: ['Configura ESLint, Prettier y un gancho de pre-commit en el repositorio de PatioApp.', 'Depura en PatioApp un caso de cálculo incorrecto con un punto de interrupción condicional y documenta la causa.']
});
SDC.after('m7.ide', 'm7.cli');
})();
