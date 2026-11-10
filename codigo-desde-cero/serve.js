#!/usr/bin/env node
/**
 * serve.js — servidor estático mínimo para ver el sitio en local.
 * Sin dependencias.  `node serve.js [puerto]`  →  http://localhost:4173
 *
 * No es para producción: en producción se sirve la carpeta public/ con
 * Vercel, Netlify, GitHub Pages, Nginx o cualquier CDN.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, 'public');
const PUERTO = Number(process.argv[2] || process.env.PORT || 4173);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

if (!fs.existsSync(path.join(RAIZ, 'index.html'))) {
  console.error('Falta public/index.html — ejecuta primero:  node build.js');
  process.exit(1);
}

http.createServer(function (req, res) {
  let rel;
  try {
    rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch (e) {
    res.writeHead(400).end('Petición inválida');
    return;
  }
  if (rel.endsWith('/')) rel += 'index.html';

  /* Resolver y comprobar que no se sale de public/ (travesía de rutas). */
  const archivo = path.resolve(RAIZ, '.' + rel);
  if (archivo !== RAIZ && !archivo.startsWith(RAIZ + path.sep)) {
    res.writeHead(403).end('Prohibido');
    return;
  }

  fs.readFile(archivo, function (err, datos) {
    if (err) {
      /* SPA: cualquier ruta desconocida cae en index.html (el router usa hash,
         pero esto evita 404 si alguien entra a una subruta). */
      fs.readFile(path.join(RAIZ, 'index.html'), function (e2, inicio) {
        if (e2) { res.writeHead(404).end('No encontrado'); return; }
        res.writeHead(200, { 'Content-Type': TIPOS['.html'] }).end(inicio);
      });
      return;
    }
    const tipo = TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': tipo,
      'Cache-Control': 'no-cache'
    }).end(datos);
  });
}).listen(PUERTO, function () {
  console.log('→ http://localhost:' + PUERTO + '   (Ctrl+C para detener)');
});
