# Aula de Derecho Peruano

Sitio estático (HTML, CSS y JavaScript sin dependencias ni build).

- `index.html`: la aplicación (diseño, navegación, ejercicios, examen, glosario, progreso).
- `data/01-…21-*.js`: el contenido de cada módulo. Para agregar uno, crea `data/22-nombre.js`
  con la misma estructura y añade su `<script src="data/22-nombre.js"></script>` en `index.html`
  (entre `<!--DATOS-->` y `<!--/DATOS-->`).

## Publicar en Vercel

**Como proyecto propio:** sube esta carpeta, Framework Preset «Other», sin comando de build
ni directorio de salida.

**Como subcarpeta de un proyecto con varias carreras:**

```
mis-carreras/
├── vercel.json          ← { "trailingSlash": true }
├── index.html           ← tu portada con enlaces a cada carrera
├── derecho-peru/        ← esta carpeta
├── ingenieria-civil/
└── ingenieria-software/
```

Enlaza la carrera como `/derecho-peru/` (con la barra final). El `vercel.json` con
`trailingSlash: true` en la raíz asegura que la ruta `data/...` se resuelva dentro de la carpeta.

El progreso de cada estudiante se guarda en su navegador (localStorage).
