# Código Desde Cero

Curso interactivo de programación en español que va **desde el bit hasta el compilador**: sistemas de numeración, diagramas de flujo, pseudocódigo, lógica de programación, estructuras de datos, algoritmos, programación orientada a objetos y cómo funciona un lenguaje por dentro.

No es una colección de tutoriales: es un currículo ordenado de **11 módulos, 57 temas, 285 ejercicios resueltos y 171 preguntas de autoevaluación**, con un laboratorio interactivo donde el pseudocódigo se **ejecuta de verdad** y se convierte automáticamente en diagrama de flujo.

---

## Qué incluye

| | |
|---|---|
| **Intérprete de pseudocódigo** | Compatible con la sintaxis de PSeInt. Lexer, parser y evaluador propios, escritos desde cero. Ejecuta el código de los ejercicios dentro de la página, sin servidor. |
| **Generador de diagramas de flujo** | Convierte cualquier pseudocódigo en un diagrama ISO 5807 en SVG, con secuencias, decisiones, bucles anidados y subprocesos. |
| **7 herramientas interactivas** | Laboratorio de pseudocódigo, conversor de bases, tablas de verdad, inspector de bits y IEEE 754, analizador de cadenas, consola de JavaScript y comparador de complejidad. |
| **Progreso guardado** | Temas completados, ejercicios marcados y resultados de los cuestionarios se guardan en el navegador (`localStorage`). No se envía nada a ningún servidor. |
| **Biblioteca comentada** | Los 12 libros de referencia en los que se apoya el curso, con el módulo al que corresponde cada uno. |

## El currículo

| Módulo | Título | Temas |
|---:|---|---:|
| 0 | Pensar como programador | 4 |
| 1 | La máquina y los datos *(bits, binario, complemento a dos, IEEE 754, Unicode, Boole)* | 7 |
| 2 | Diagramas de flujo | 5 |
| 3 | Pseudocódigo | 6 |
| 4 | Lógica de programación aplicada | 4 |
| 5 | Del pseudocódigo al código real *(Python, JavaScript, Java)* | 4 |
| 6 | Estructuras de datos | 5 |
| 7 | Algoritmos y complejidad | 6 |
| 8 | Objetos y diseño | 5 |
| 9 | Cómo se procesa un lenguaje *(compiladores e intérpretes)* | 6 |
| 10 | Del código al producto *(Git, pruebas, código limpio, despliegue)* | 5 |

Cada tema tiene objetivos, una lectura detallada con ejemplos y diagramas, **5 ejercicios graduados del nivel 1 al 5** con pista y solución desarrollada, y un cuestionario de 3 preguntas con explicación.

---

## Requisitos

- **Para verlo:** cualquier navegador moderno. Nada más.
- **Para construirlo:** Node.js 18 o superior. **Sin dependencias** — no hay `npm install`.

## Cómo ejecutarlo en local

```bash
git clone <la-url-de-tu-repositorio>
cd codigo-desde-cero

node test.js     # 2507 comprobaciones
node build.js    # genera public/index.html
node serve.js    # → http://localhost:4173
```

O, con los atajos de `package.json`:

```bash
npm test      # pruebas
npm run build # construir
npm start     # construir y servir
```

El resultado, `public/index.html`, es un **único archivo autocontenido**: funciona servido por HTTP y también abriéndolo con doble clic desde el disco, sin conexión.

---

## Cómo desplegarlo

### Vercel

El repositorio incluye `vercel.json` con el comando de construcción y las cabeceras de seguridad ya configuradas.

```bash
npm i -g vercel
vercel          # vista previa
vercel --prod   # producción
```

O desde la interfaz: **Add New → Project**, elige el repositorio y despliega. La configuración se detecta sola; no hay que tocar nada.

### GitHub Pages

El flujo de trabajo de `.github/workflows/ci.yml` ya lo hace. Solo hay que activarlo una vez:

**Settings → Pages → Source: GitHub Actions**

Desde entonces, cada `push` a `main` ejecuta las pruebas y, si pasan, despliega.

### Netlify

```
Build command:    node build.js
Publish directory: public
```

### Cualquier otro sitio

Sube el contenido de `public/` a cualquier servidor estático, CDN o `/var/www`. No necesita Node en el servidor, ni base de datos, ni variables de entorno.

---

## Estructura del proyecto

```
codigo-desde-cero/
├── build.js                  Empaquetador (sin dependencias)
├── test.js                   Batería de pruebas (sin dependencias)
├── serve.js                  Servidor estático para desarrollo
├── vercel.json               Configuración y cabeceras de seguridad
├── src/
│   ├── styles.css            Sistema de diseño: tokens, componentes, tema claro/oscuro
│   ├── shell.html            Estructura de la página (barra lateral, cabecera, vista)
│   ├── js/
│   │   ├── 01-core.js        Registro del currículo, progreso, plantillas, búsqueda
│   │   ├── 02-pseudo.js      Intérprete de pseudocódigo: lexer, parser, evaluador
│   │   ├── 03-flowchart.js   Generador de diagramas de flujo en SVG
│   │   ├── 04-tools.js       Las 7 herramientas interactivas
│   │   ├── 05-views.js       Vistas y biblioteca de libros
│   │   └── 06-app.js         Router, tema, navegación móvil, eventos
│   └── content/              Un archivo por módulo (20-m0.js … 30-m10.js)
└── public/                   Salida construida + favicon, manifiesto y robots.txt
```

### Por qué está organizado así

El contenido está **separado del motor**: añadir un tema es editar un archivo de `src/content/` y llamar a `CDC.registrar({...})`, sin tocar nada más. El empaquetador concatena en un orden fijo (núcleo → intérprete → diagramas → contenido → vistas → aplicación) porque el contenido llama a `diag()` en el momento de registrarse.

De la misma fuente salen **dos destinos**: `public/index.html`, el documento completo para desplegar, y `dist/artifact.html`, el mismo contenido sin el esqueleto HTML para publicarlo como artifact de Claude.

---

## Compatibilidad y accesibilidad

- **Navegadores:** Chrome, Firefox, Safari y Edge recientes. Solo usa JavaScript ES5 y CSS con reservas.
- **Responsive:** diseñado primero para móvil. La barra lateral se convierte en un panel deslizable por debajo de 900 px; se respetan las zonas seguras de los dispositivos con muesca (`env(safe-area-inset-*)`).
- **Tema claro y oscuro** automático según el sistema, con conmutador manual que se recuerda.
- **Accesibilidad:** HTML semántico, enlace para saltar al contenido, navegación completa por teclado, foco visible, contraste AA, `aria-label` en los diagramas y respeto por `prefers-reduced-motion`.
- **Impresión:** hoja de estilos propia para imprimir o guardar un tema en PDF.
- **Sin conexión:** una vez cargada, la página funciona sin red (solo las tipografías vienen de un CDN y degradan a las del sistema).

## Privacidad

No hay servidores, cuentas, cookies, analítica ni telemetría. Todo se ejecuta en el navegador y el progreso se guarda únicamente en el `localStorage` del propio equipo. Puedes borrarlo desde la página de progreso.

## Pruebas

```bash
node test.js
```

Las 2507 comprobaciones verifican, sin dependencias y en un `vm` aislado:

- que todos los archivos fuente sean sintácticamente válidos;
- la **estructura del currículo**: identificadores únicos, longitud mínima de cada lectura, al menos 2 objetivos, 5 ejercicios con enunciado y solución desarrollada, nivel entre 1 y 5, y cuestionarios con respuesta correcta válida;
- que todos los **enlaces internos** entre temas resuelvan a un tema existente;
- el **intérprete**: operadores, precedencia, condicionales, bucles, arreglos, funciones, paso por valor y por referencia, palabras clave contextuales y límites de ejecución;
- el **generador de diagramas** para cada construcción, comprobando que no produzca coordenadas inválidas;
- que **cada fragmento de pseudocódigo publicado en el curso** se analice y se dibuje correctamente;
- la búsqueda.

## Licencia

MIT — ver [LICENSE](LICENSE).
