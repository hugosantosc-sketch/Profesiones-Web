# Software Desde Cero

Curso web para aprender ingeniería de software desde el bit hasta la arquitectura de sistemas.
17 módulos, 70 temas, 6 589 ejercicios (mínimo 75 por tema) y 276 retos de código que se corrigen en el navegador.

Es un sitio estático: HTML, CSS y JavaScript, sin instalar dependencias ni compilar.
El progreso de cada estudiante se guarda en su navegador (localStorage) y se puede exportar o importar desde «Progreso».

## Estructura
- `index.html`: entrada del sitio
- `css/app.css`: estilos (tema claro y oscuro)
- `js/core.js`: motor de ejercicios (generadores, niveles, corrección)
- `js/app.js`: interfaz, rutas (#/), repaso espaciado y ejecución de código en un Worker
- `content/mXX-*.js`: un archivo por módulo (lección, vocabulario, casos, ejercicios y retos)
- `content/referencias.js`: libros, universidades y método
- `tools/verificar.js`: revisa el contenido antes de publicar (no se sube a Vercel)

## Probar en tu PC
```bash
cd software-desde-cero
python -m http.server 8000      # luego abre http://localhost:8000
node tools/verificar.js -v      # opcional: valida que cada tema tenga 50+ ejercicios y que los retos pasen sus pruebas
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
Después de editar, corre `node tools/verificar.js` para comprobar que todo sigue correcto.
