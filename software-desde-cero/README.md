# Software Desde Cero

Carrera virtual de Ingeniería de Software, desde el bit hasta los sistemas distribuidos.
Está organizada como una carrera universitaria: **10 ciclos, 32 cursos y 126 créditos**, con código de curso,
prerrequisitos, sílabo (sumilla, logros, unidades, evaluación y bibliografía) y un **examen final** por curso
(20 preguntas, escala vigesimal, se aprueba con 11). El **récord académico** muestra notas, créditos aprobados,
promedio ponderado y ciclo actual. En total hay **238 unidades**, más de **23 000 ejercicios** (mínimo 75 por unidad)
y **732 retos de código** que se corrigen en el navegador.

Cada unidad trae una lección a fondo (**más de 1300 palabras en todas las unidades de los 32 cursos**) con autores
y casos reales citados, ejemplos resueltos, vocabulario, preguntas de comprensión, un proyecto propio y dos hitos del
proyecto acumulativo **PatioApp**, que crece unidad a unidad; cada curso tiene sumilla, logros, un proyecto integrador
y su equivalencia con cursos de universidades del mundo y del Perú (ver «Malla»).

### Qué cubre la carrera (entre 6 y 11 unidades por curso)
- **Fundamentos de computación:** cómo funciona una computadora, arquitectura de computadoras, programación,
  estructuras de datos y algoritmos (incluidos montículos, árboles balanceados, caminos mínimos y algoritmos de cadenas),
  sistemas operativos, programación de sistemas, entornos de ejecución y seguridad de memoria, redes, lenguajes y
  compiladores, sistemas distribuidos y teoría de la computación.
- **Matemática:** lógica, conjuntos, grafos, álgebra, probabilidad, cálculo, álgebra lineal, métodos numéricos,
  optimización, estadística, teoría de la información y métodos formales.
- **Construcción de software:** diseño orientado a objetos (GRASP, prototipos, SOLID, inyección de dependencias,
  patrones), construcción, herramientas del oficio (terminal, Git, editores, depuradores, construcción, scripts y regex),
  pruebas y calidad, DevOps y seguridad de software.
- **Datos y web:** bases de datos (desde la aplicación, operación, análisis y almacenes de datos), backend, plataforma
  del navegador, publicación en la web e interacción humano-computador (investigación con usuarios, diseño visual,
  diseño de interacción y accesibilidad).
- **Ingeniería y profesión:** requisitos, procesos y gestión de proyectos, arquitectura de software, economía del
  software (modelos de negocio, FinOps), equipos y liderazgo, conflictos y negociación, trabajo con clientes,
  mantenimiento (deuda técnica, migraciones), IA (no supervisado, IA responsable), plataformas (multiplataforma,
  escritorio, IoT), ética, código abierto, lectura de investigación, carrera y proyecto final.

Es un sitio estático: HTML, CSS y JavaScript, sin instalar dependencias ni compilar.
El progreso de cada estudiante se guarda en su navegador (localStorage) y se puede exportar o importar desde «Progreso».

## Estructura
- `index.html`: entrada del sitio
- `css/app.css`: estilos (tema claro y oscuro)
- `js/core.js`: motor de ejercicios (generadores, niveles, corrección)
- `js/app.js`: interfaz, rutas (#/), repaso espaciado y ejecución de código en un Worker
- `content/mXX-*.js`: módulos originales (lección, vocabulario, casos, ejercicios y retos)
- `content/nXX-*.js`: módulos nuevos (matemática avanzada, arquitectura de computadoras, teoría de la computación,
  HCI, métodos formales, economía, equipos y gestión, mantenimiento, IA y datos, plataformas)
- `content/curso-*.js`: cursos de fundamentos en profundidad (so, red, bd2, lc, sd)
- `content/carrera.js`: malla curricular (ciclos, códigos, créditos, prerrequisitos y logros de cada curso)
- `content/ext/mXX.js`: amplían los módulos originales con «A fondo», preguntas de comprensión, fuentes, proyectos e hitos
- `content/prof-<curso>-*.js`: profundizan cada curso (con `SDC.D` se amplía el «A fondo» de una unidad existente y con
  `SDC.S` + `SDC.after` se agregan unidades nuevas en su posición); `content/prof-zz-silabos.js` actualiza la sumilla y los logros
- `content/orden.js`: se carga al final y fija el orden global de las unidades según la malla
- `content/referencias.js`: libros, universidades y método
- `tools/verificar.js`: revisa el contenido antes de publicar (no se sube a Vercel)

## Probar en tu PC
```bash
cd software-desde-cero
python -m http.server 8000      # luego abre http://localhost:8000
node tools/verificar.js -v      # opcional: valida ejercicios, retos, extensión de lecciones, fuentes y proyectos
node tools/verificar.js -e -p   # modo estricto: cualquier pendiente cuenta como error
```

## Publicar en Vercel (Git Bash)
```bash
cd software-desde-cero
git init
git add .
git commit -m "Software Desde Cero"
git branch -M main
git remote add origin git@<tu-alias-ssh>:<tu-usuario>/software-desde-cero.git
git push -u origin main
```
En Vercel: **Add New → Project**, importa el repositorio, deja **Framework Preset = Other**, sin comando de build ni carpeta de salida, y pulsa **Deploy**.
Cada vez que hagas `git push`, Vercel vuelve a publicar solo.

## Agregar contenido
Cada tema se registra con `SDC.S('m3', 'm3.loops', { ... })` dentro del archivo de su módulo.
Para ampliar un tema existente sin tocar su archivo se usa `SDC.X('m3.loops', { deep, checks, cites, project, hito })`,
y para un módulo, `SDC.XM('m3', { uni, capstone })`. Los archivos nuevos se agregan a `index.html` en el orden del plan, y cada curso nuevo debe registrarse en un ciclo
de `content/carrera.js` (con código, créditos, prerrequisitos de ciclos anteriores y logros); el verificador lo comprueba.
Después de editar, corre `node tools/verificar.js` para comprobar que todo sigue correcto.
