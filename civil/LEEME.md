# Civil Desde Cero

## Carpetas
- `civil/index.html`: la app lista para publicar. Es lo único que va a Vercel.
- `fuente/`: el código para editar la app.
  - `core.js`: motor de ejercicios y formato de fórmulas.
  - `c1.js` a `c4.js`: contenido de los 21 módulos (teoría y generadores de ejercicios).
  - `app.js`: pantallas, figuras, laboratorios y guardado del progreso.
  - `shell.html`: estilos y estructura de la página.
  - `build.py`: une todo en un solo archivo.
  - `test.js`: revisa que cada subtema tenga 60 ejercicios válidos.

## Cómo publicar
Copia la carpeta `civil` dentro de tu proyecto de Vercel, junto a las otras carreras, y enlázala con `/civil/`.

## Cómo regenerar después de editar
Desde la carpeta `fuente`:
```
python build.py
node test.js
```
`build.py` actualiza directamente `civil/index.html`. Necesitas Python 3 para construir y Node.js para la prueba.
