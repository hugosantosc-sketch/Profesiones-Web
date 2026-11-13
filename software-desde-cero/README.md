# Software Desde Cero

Curso web para aprender ingeniería de software desde el bit hasta la arquitectura de sistemas.
27 módulos, 107 temas, más de 10 000 ejercicios (mínimo 75 por tema) y 364 retos de código que se corrigen en el navegador.
Cada tema trae lección a fondo con autores citados, preguntas de comprensión, un proyecto propio y dos hitos del
proyecto acumulativo **PatioApp**, que crece tema a tema; cada módulo cierra con un proyecto integrador y su
equivalencia con cursos de universidades del mundo y del Perú (ver «Plan»).

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
- `content/ext/mXX.js`: amplían los módulos originales con «A fondo», preguntas de comprensión, fuentes, proyectos e hitos
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
y para un módulo, `SDC.XM('m3', { uni, capstone })`. Los archivos nuevos se agregan a `index.html` en el orden del plan.
Después de editar, corre `node tools/verificar.js` para comprobar que todo sigue correcto.
