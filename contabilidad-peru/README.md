# Aula Contable Perú

Curso web de contabilidad peruana, de nivel básico a avanzado. Sitio estático: no necesita servidor, build ni dependencias.

- 8 módulos · 36 subtemas · 170 ejercicios (68 fáciles, 68 medios, 34 difíciles)
- Asientos con cuentas reales del PCGE 2019
- Datos tributarios vigentes 2026 (UIT S/ 5,500 · IGV 18% · RMV S/ 1,230)

## Estructura

```
contabilidad-peru/
├── index.html        Estructura de la página (cabecera, rail de navegación, contenedor)
├── styles.css        Todos los estilos, con tema claro y oscuro por tokens
├── app.js            Renderizador del contenido, navegación, buscador, motor de ejercicios y progreso
├── vercel.json       Configuración mínima de Vercel
└── data/
    ├── m1.js         Módulo 1 · Fundamentos de la contabilidad
    ├── m2.js         Módulo 2 · El ciclo contable completo
    ├── m3.js         Módulo 3 · IGV, regímenes tributarios y renta empresarial
    ├── m4.js         Módulo 4 · Contabilidad laboral y planilla
    ├── m5.js         Módulo 5 · Costos y contabilidad de gestión
    ├── m6.js         Módulo 6 · NIIF aplicadas y análisis financiero
    ├── m7.js         Módulo 7 · Cierre tributario y gestión corporativa
    └── ref.js        Ficha de datos 2026 y glosario
```

Los archivos de `data/` se cargan antes que `app.js` y cada uno hace `window.CURSO.push({...})`. Para agregar un módulo nuevo basta crear `data/m8.js` con la misma forma y añadir su `<script src="data/m8.js"></script>` en `index.html`, antes de `app.js`.

## Subir a Vercel

**Opción A — proyecto independiente**

1. Entra a vercel.com → *Add New* → *Project*.
2. Si lo subes desde GitHub, sube esta carpeta como repo y selecciónalo.
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: vacío (raíz).
4. Deploy.

También funciona arrastrando la carpeta en vercel.com/new con *Deploy without Git*.

**Opción B — junto a tus otras carreras, en un solo proyecto**

Coloca esta carpeta dentro del repo que ya usas:

```
mis-cursos/
├── index.html              ← tu portada con los enlaces a cada carrera
├── contabilidad/           ← el contenido de esta carpeta
├── ingles/
├── ingenieria-civil/
└── ingenieria-software/
```

Queda en `tudominio.vercel.app/contabilidad/`. Todas las rutas internas del proyecto son **relativas** (`styles.css`, `data/m1.js`), así que funciona en cualquier subcarpeta sin tocar nada.

Dos detalles si usas esta opción:
- Vercel solo lee el `vercel.json` de la **raíz** del proyecto, no el de las subcarpetas. Puedes borrar el de aquí o mover su contenido al de la raíz.
- En tu portada, el enlace es `<a href="/contabilidad/">Contabilidad</a>` (con la barra final, para que cargue el `index.html`).

## Editar el contenido

Cada subtema es un objeto dentro del array del módulo:

```js
{
  id:'m1t1', titulo:'¿Qué es la contabilidad...', min:14,
  cont:`...texto con el mini-marcado...`,
  claves:['...','...'],
  ej:[ {l:1, t:'mc', p:'pregunta', o:['a','b','c','d'], r:1, s:'solución'} ]
}
```

**Mini-marcado del campo `cont`** (bloques separados por línea en blanco):

| Prefijo | Resultado |
|---|---|
| `# ` | Subtítulo |
| `- ` | Lista con viñetas |
| `1. ` | Lista numerada |
| `> ` | Nota destacada |
| `! ` | Advertencia ("Ojo con esto") |
| `$ ` | Fórmula o cálculo en monoespaciada |
| `\|a\|b\|c` | Tabla (la primera fila es el encabezado) |
| `@` | Asiento contable: primera línea el título, luego `cuenta\|detalle\|debe\|haber` |

En línea: `**negrita**` y `~código~`. No uses acentos graves dentro de `cont`, porque el texto va en template literals.

**Ejercicios**: `l` es el nivel (1 fácil, 2 medio, 3 difícil) y `t` el tipo:

- `mc` — opción múltiple: `o` con las alternativas y `r` con el índice de la correcta (empieza en 0).
- `num` — respuesta numérica: `r` el valor esperado, `tol` la tolerancia y `u` la unidad (`'S/'`, `'%'`, `'días'`).
- `ab` — desarrollo: solo muestra el botón de ver la solución.

El campo `s` admite el mismo mini-marcado (tablas y saltos con `\n`).

## Notas técnicas

- El progreso de estudio y el tema claro/oscuro se guardan en `localStorage` del navegador de cada visitante; no hay backend ni base de datos.
- Las tipografías vienen de Google Fonts. Si necesitas que funcione sin internet, descárgalas y reemplaza el `<link>` del `index.html`.
- Los datos tributarios corresponden a 2026. La UIT y la RMV se fijan por decreto supremo cada año: cuando cambien, actualiza `data/ref.js` y los ejercicios que las usan.
