#!/usr/bin/env node
/**
 * build.js — empaquetador del proyecto.
 *
 * Genera dos salidas desde una sola fuente:
 *   public/index.html   documento HTML completo y autocontenido (para Vercel,
 *                       GitHub Pages, Netlify, Apache o incluso abrirlo con
 *                       doble clic desde el disco).
 *   dist/artifact.html  el mismo contenido sin <!doctype>/<html>/<head>/<body>,
 *                       para publicarlo como artifact de Claude.
 *
 * No hay dependencias: solo Node. `node build.js`
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RAIZ = __dirname;
const SRC = path.join(RAIZ, 'src');

/* El orden importa: core define CDC; pseudo y flujo deben existir antes de que
   los archivos de contenido llamen a diag(); las vistas y la app se ejecutan al
   final, cuando el currículo ya está registrado. */
const JS_ANTES = [
  'js/01-core.js',
  'js/02-pseudo.js',
  'js/03-flowchart.js',
  'js/04-tools.js'
];
const JS_DESPUES = [
  'js/05-views.js',
  'js/06-app.js'
];

const TITULO = 'Código Desde Cero';
const DESC = 'Curso completo de programación en español: desde el código binario, ' +
  'los diagramas de flujo y el pseudocódigo hasta estructuras de datos, programación ' +
  'orientada a objetos y cómo funciona un compilador. Con ejercicios resueltos y laboratorio interactivo.';

function leer(rel) {
  const p = path.join(SRC, rel);
  if (!fs.existsSync(p)) throw new Error('No existe ' + p);
  return fs.readFileSync(p, 'utf8');
}

function contenidoOrdenado() {
  const dir = path.join(SRC, 'content');
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .sort()
    .map(f => ({ nombre: 'content/' + f, src: fs.readFileSync(path.join(dir, f), 'utf8') }));
}

function bloquesJS() {
  const partes = [];
  JS_ANTES.forEach(f => partes.push({ nombre: f, src: leer(f) }));
  contenidoOrdenado().forEach(c => partes.push(c));
  JS_DESPUES.forEach(f => partes.push({ nombre: f, src: leer(f) }));
  return partes;
}

function construir() {
  const css = leer('styles.css');
  const shell = leer('shell.html');
  const js = bloquesJS();

  const fuentes =
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' +
    'family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&' +
    'family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&' +
    'family=JetBrains+Mono:wght@400;600&display=swap">';

  const scripts = js.map(p =>
    '<script>/* ' + p.nombre + ' */\n' + p.src + '\n</script>').join('\n');

  /* ---------- salida 1: documento completo para producción ---------- */
  const completo = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITULO} — aprende a programar desde los bits</title>
<meta name="description" content="${DESC}">
<meta name="author" content="Código Desde Cero">
<meta name="theme-color" content="#0f766e" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d1411" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<meta property="og:type" content="website">
<meta property="og:title" content="${TITULO}">
<meta property="og:description" content="${DESC}">
<meta property="og:locale" content="es_PE">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="favicon.svg">
<link rel="manifest" href="manifest.webmanifest">
<link rel="canonical" href="/">
${fuentes}
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{min-height:100%}
${css}
</style>
</head>
<body>
<a href="#view" class="sr">Saltar al contenido</a>
${shell}
<noscript><div style="padding:24px;max-width:60ch;margin:0 auto">
<h1>Activa JavaScript</h1>
<p>Este curso es interactivo: ejecuta pseudocódigo, genera diagramas de flujo y guarda tu
progreso en tu propio navegador. Para eso necesita JavaScript activado. No usa servidores
ni envía datos a ningún sitio.</p></div></noscript>
${scripts}
</body>
</html>
`;

  /* ---------- salida 2: artifact (sin esqueleto) ---------- */
  const artifact = `<title>${TITULO}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${DESC}">
${fuentes}
<style>
html,body{min-height:100%}
${css}
</style>
<a href="#view" class="sr">Saltar al contenido</a>
${shell}
${scripts}
`;

  fs.mkdirSync(path.join(RAIZ, 'public'), { recursive: true });
  fs.mkdirSync(path.join(RAIZ, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, 'public', 'index.html'), completo, 'utf8');
  fs.writeFileSync(path.join(RAIZ, 'dist', 'artifact.html'), artifact, 'utf8');

  const kb = n => (n / 1024).toFixed(1) + ' KiB';
  console.log('✔ public/index.html    ' + kb(Buffer.byteLength(completo)));
  console.log('✔ dist/artifact.html   ' + kb(Buffer.byteLength(artifact)));
  console.log('  módulos de contenido: ' + contenidoOrdenado().length);
}

construir();
