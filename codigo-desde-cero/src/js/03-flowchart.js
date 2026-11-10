/* ============================================================
   03-flowchart.js — Generador de diagramas de flujo a partir del
   AST del pseudocódigo. Devuelve un SVG que respeta los símbolos
   de la norma ISO 5807: óvalo (inicio/fin), rectángulo (proceso),
   paralelogramo (entrada/salida), rombo (decisión).
   ============================================================ */
var Flujo = (function () {
  'use strict';

  var FONT = 12, CH = 6.5, LH = 15;
  var GAPY = 30, GAPX = 34, LANE = 30;
  var DW = 172, DH = 72;

  /* --- expresiones -> texto legible --- */
  function txt(e) {
    if (!e) return '';
    switch (e.k) {
      case 'num': return Pseudo.fmt(e.v);
      case 'str': return '"' + e.v + '"';
      case 'bool': return e.v ? 'Verdadero' : 'Falso';
      case 'ref': return e.n + (e.idx.length ? '[' + e.idx.map(txt).join(',') + ']' : '');
      case 'call': return e.n + '(' + e.args.map(txt).join(', ') + ')';
      case 'un': return e.op === 'no' ? 'NO (' + txt(e.a) + ')' : '-' + txt(e.a);
      case 'bin': {
        var op = { 'y': ' Y ', 'o': ' O ', 'mod': ' mod ', '=': ' = ', '<>': ' ≠ ',
          '<=': ' ≤ ', '>=': ' ≥ ' }[e.op] || (' ' + e.op + ' ');
        return txt(e.a) + op + txt(e.b);
      }
    }
    return '?';
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function envolver(s, max) {
    var pal = String(s).split(/\s+/), lineas = [], act = '';
    pal.forEach(function (w) {
      if (!act.length) act = w;
      else if ((act + ' ' + w).length <= max) act += ' ' + w;
      else { lineas.push(act); act = w; }
    });
    if (act.length) lineas.push(act);
    if (!lineas.length) lineas = [''];
    return lineas.slice(0, 4);
  }

  /* --- primitivas de dibujo --- */
  function textoSVG(cx, cy, lineas, extra) {
    var y0 = cy - (lineas.length - 1) * LH / 2;
    return lineas.map(function (l, i) {
      return '<text x="' + cx.toFixed(1) + '" y="' + (y0 + i * LH + 4).toFixed(1) +
        '" text-anchor="middle"' + (extra || '') + '>' + esc(l) + '</text>';
    }).join('');
  }
  function flecha(x1, y1, x2, y2) {
    return '<path class="edge" marker-end="url(#fcA)" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
      ' L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '"/>';
  }
  function ruta(d, conFlecha) {
    return '<path class="edge"' + (conFlecha ? ' marker-end="url(#fcA)"' : '') + ' d="' + d + '"/>';
  }
  function etiqueta(x, y, t) {
    return '<text class="lbl" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '">' + esc(t) + '</text>';
  }

  /* Cada bloque: {w,h,cx,draw(x,y)} con entrada en (x+cx, y) y salida en (x+cx, y+h) */
  function caja(tipo, texto) {
    var lineas = envolver(texto, 30);
    var ancho = Math.min(300, Math.max(130, Math.max.apply(null, lineas.map(function (l) { return l.length; })) * CH + 34));
    var alto = Math.max(44, lineas.length * LH + 22);
    return {
      w: ancho, h: alto, cx: ancho / 2,
      draw: function (x, y) {
        var s = '';
        if (tipo === 'term') {
          s += '<rect class="term" x="' + x + '" y="' + y + '" width="' + ancho + '" height="' + alto +
            '" rx="' + (alto / 2) + '"/>';
        } else if (tipo === 'io') {
          var sk = 14;
          s += '<path class="io" d="M' + (x + sk) + ' ' + y + ' H' + (x + ancho) + ' L' + (x + ancho - sk) +
            ' ' + (y + alto) + ' H' + x + ' Z"/>';
        } else {
          s += '<rect class="box" x="' + x + '" y="' + y + '" width="' + ancho + '" height="' + alto + '" rx="4"/>';
        }
        s += textoSVG(x + ancho / 2, y + alto / 2, lineas);
        return s;
      }
    };
  }

  function rombo(texto) {
    var lineas = envolver(texto, 26);
    var ancho = Math.min(330, Math.max(DW, Math.max.apply(null, lineas.map(function (l) { return l.length; })) * CH + 80));
    var alto = Math.max(DH, lineas.length * LH + 46);
    return {
      w: ancho, h: alto, cx: ancho / 2,
      draw: function (x, y) {
        var cx = x + ancho / 2, cy = y + alto / 2;
        return '<path class="dec" d="M' + cx + ' ' + y + ' L' + (x + ancho) + ' ' + cy + ' L' + cx + ' ' +
          (y + alto) + ' L' + x + ' ' + cy + ' Z"/>' + textoSVG(cx, cy, lineas);
      }
    };
  }

  function vacio() { return { w: 2, h: 0, cx: 1, draw: function () { return ''; } }; }

  /* --- secuencia vertical --- */
  function secuencia(nodos) {
    var bloques = nodos.map(bloqueDe).filter(function (b) { return b; });
    if (!bloques.length) return vacio();
    if (bloques.length === 1) return bloques[0];
    var izq = Math.max.apply(null, bloques.map(function (b) { return b.cx; }));
    var der = Math.max.apply(null, bloques.map(function (b) { return b.w - b.cx; }));
    var h = bloques.reduce(function (a, b) { return a + b.h; }, 0) + GAPY * (bloques.length - 1);
    return {
      w: izq + der, h: h, cx: izq,
      draw: function (x, y) {
        var s = '', yy = y;
        bloques.forEach(function (b, i) {
          s += b.draw(x + izq - b.cx, yy);
          yy += b.h;
          if (i < bloques.length - 1) { s += flecha(x + izq, yy, x + izq, yy + GAPY); yy += GAPY; }
        });
        return s;
      }
    };
  }

  /* --- decisión --- */
  function decision(cond, ramaSi, ramaNo) {
    var d = rombo(txt(cond) + ' ?');
    var L = secuencia(ramaSi), R = secuencia(ramaNo);
    var Lw = Math.max(L.w, 60), Rw = Math.max(R.w, 60);
    var Lcx = L.h ? L.cx : Lw / 2, Rcx = R.h ? R.cx : Rw / 2;
    var ejeL = Lcx, ejeR = Lw + GAPX + Rcx;
    var eje = (ejeL + ejeR) / 2;
    var padIzq = Math.max(0, d.w / 2 - eje);
    eje += padIzq; ejeL += padIzq; ejeR += padIzq;
    var w = Math.max(padIzq + Lw + GAPX + Rw, eje + d.w / 2);
    var ramaY = d.h + GAPY;
    var altoRamas = Math.max(L.h, R.h);
    var joinY = ramaY + altoRamas + GAPY;
    return {
      w: w, h: joinY, cx: eje,
      draw: function (x, y) {
        var s = d.draw(x + eje - d.w / 2, y);
        var cyD = y + d.h / 2;
        // salida "Sí" por la izquierda
        s += ruta('M' + (x + eje - d.w / 2) + ' ' + cyD + ' H' + (x + ejeL) + ' V' + (y + ramaY), true);
        s += etiqueta(x + ejeL + 6, cyD - 6, 'Sí');
        // salida "No" por la derecha
        s += ruta('M' + (x + eje + d.w / 2) + ' ' + cyD + ' H' + (x + ejeR) + ' V' + (y + ramaY), true);
        s += etiqueta(x + ejeR - 22, cyD - 6, 'No');
        if (L.h) {
          s += L.draw(x + ejeL - L.cx, y + ramaY);
          s += ruta('M' + (x + ejeL) + ' ' + (y + ramaY + L.h) + ' V' + (y + joinY) + ' H' + (x + eje), true);
        } else {
          s += ruta('M' + (x + ejeL) + ' ' + (y + ramaY) + ' V' + (y + joinY) + ' H' + (x + eje), true);
        }
        if (R.h) {
          s += R.draw(x + ejeR - R.cx, y + ramaY);
          s += ruta('M' + (x + ejeR) + ' ' + (y + ramaY + R.h) + ' V' + (y + joinY) + ' H' + (x + eje), true);
        } else {
          s += ruta('M' + (x + ejeR) + ' ' + (y + ramaY) + ' V' + (y + joinY) + ' H' + (x + eje), true);
        }
        s += '<circle cx="' + (x + eje) + '" cy="' + (y + joinY) + '" r="3.5" fill="currentColor" opacity=".45"/>';
        return s;
      }
    };
  }

  /* --- bucle con condición al inicio (Mientras / Para) --- */
  function bucleInicio(cond, cuerpoNodos, antes, incremento) {
    var pre = antes ? caja('proc', antes) : null;
    var d = rombo(cond + ' ?');
    var cuerpo = secuencia(cuerpoNodos);
    var inc = incremento ? caja('proc', incremento) : null;
    var interno = inc ? apilar([cuerpo, inc]) : cuerpo;
    var izqInterno = Math.max(d.w / 2, interno.cx);
    var eje = LANE + izqInterno;
    var w = eje + Math.max(d.w / 2, interno.w - interno.cx) + LANE + 16;
    var topPad = 18;
    var yPre = 0, yD = topPad;
    if (pre) { yD = pre.h + GAPY + topPad; }
    var yCuerpo = yD + d.h + GAPY;
    var yFinCuerpo = yCuerpo + (interno.h || 10);
    var yRetorno = yFinCuerpo + 20;
    var h = yRetorno + 26;
    return {
      w: w, h: h, cx: eje,
      draw: function (x, y) {
        var s = '';
        if (pre) {
          s += pre.draw(x + eje - pre.cx, y + yPre);
          s += flecha(x + eje, y + pre.h, x + eje, y + pre.h + GAPY + topPad);
        } else {
          s += flecha(x + eje, y, x + eje, y + topPad);
        }
        s += d.draw(x + eje - d.w / 2, y + yD);
        var cyD = y + yD + d.h / 2;
        // verdadero: hacia el cuerpo
        s += flecha(x + eje, y + yD + d.h, x + eje, y + yCuerpo);
        s += etiqueta(x + eje + 7, y + yCuerpo - 8, 'Sí');
        if (interno.h) s += interno.draw(x + eje - interno.cx, y + yCuerpo);
        // retorno por la izquierda
        var laneX = x + eje - izqInterno - LANE + 8;
        s += ruta('M' + (x + eje) + ' ' + (y + yFinCuerpo) + ' V' + (y + yRetorno) +
          ' H' + laneX + ' V' + (y + yD - topPad / 2) + ' H' + (x + eje), true);
        // falso: salida por la derecha hacia abajo
        var exitX = x + w - 10;
        s += ruta('M' + (x + eje + d.w / 2) + ' ' + cyD + ' H' + exitX + ' V' + (y + h) + ' H' + (x + eje), true);
        s += etiqueta(x + eje + d.w / 2 + 6, cyD - 6, 'No');
        return s;
      }
    };
  }

  /* --- bucle con condición al final (Repetir … Hasta Que) --- */
  function bucleFin(cond, cuerpoNodos, negada) {
    var cuerpo = secuencia(cuerpoNodos);
    var d = rombo(cond + ' ?');
    var izq = Math.max(d.w / 2, cuerpo.cx);
    var eje = LANE + izq;
    var w = eje + Math.max(d.w / 2, cuerpo.w - cuerpo.cx) + LANE + 16;
    var yCuerpo = 0, yD = (cuerpo.h || 10) + GAPY;
    var h = yD + d.h + 34;
    return {
      w: w, h: h, cx: eje,
      draw: function (x, y) {
        var s = '';
        if (cuerpo.h) s += cuerpo.draw(x + eje - cuerpo.cx, y + yCuerpo);
        s += flecha(x + eje, y + (cuerpo.h || 10), x + eje, y + yD);
        s += d.draw(x + eje - d.w / 2, y + yD);
        var cyD = y + yD + d.h / 2;
        var laneX = x + eje - izq - LANE + 8;
        // repite mientras la condición NO se cumple (salida izquierda)
        s += ruta('M' + (x + eje - d.w / 2) + ' ' + cyD + ' H' + laneX + ' V' + (y - 9) + ' H' + (x + eje), true);
        s += etiqueta(laneX + 6, cyD - 6, negada ? 'Sí' : 'No');
        s += flecha(x + eje, y + yD + d.h, x + eje, y + h);
        s += etiqueta(x + eje + 7, y + yD + d.h + 14, negada ? 'No' : 'Sí');
        return s;
      }
    };
  }

  function apilar(bloques) {
    bloques = bloques.filter(function (b) { return b && b.h; });
    if (!bloques.length) return vacio();
    if (bloques.length === 1) return bloques[0];
    var izq = Math.max.apply(null, bloques.map(function (b) { return b.cx; }));
    var der = Math.max.apply(null, bloques.map(function (b) { return b.w - b.cx; }));
    var h = bloques.reduce(function (a, b) { return a + b.h; }, 0) + GAPY * (bloques.length - 1);
    return {
      w: izq + der, h: h, cx: izq,
      draw: function (x, y) {
        var s = '', yy = y;
        bloques.forEach(function (b, i) {
          s += b.draw(x + izq - b.cx, yy); yy += b.h;
          if (i < bloques.length - 1) { s += flecha(x + izq, yy, x + izq, yy + GAPY); yy += GAPY; }
        });
        return s;
      }
    };
  }

  /* --- un nodo del AST -> bloque --- */
  function bloqueDe(st) {
    switch (st.k) {
      case 'asignar': return caja('proc', txt(st.dest) + ' ← ' + txt(st.e));
      case 'escribir': return caja('io', 'Mostrar ' + st.xs.map(txt).join(', '));
      case 'leer': return caja('io', 'Leer ' + st.ds.map(txt).join(', '));
      case 'definir': return caja('proc', 'Declarar ' + st.ns.join(', ') + ' : ' + st.tipo);
      case 'dimension': return caja('proc', 'Dimensionar ' + st.arrs.map(function (a) {
        return a.n + '[' + a.dims.map(txt).join(',') + ']';
      }).join(', '));
      case 'si': return decision(st.cond, st.luego, st.sino);
      case 'mientras': return bucleInicio(txt(st.cond), st.cuerpo, null, null);
      case 'para': {
        var v = txt(st.v);
        return bucleInicio(v + ' ≤ ' + txt(st.hasta), st.cuerpo,
          v + ' ← ' + txt(st.desde), v + ' ← ' + v + ' + ' + txt(st.paso));
      }
      case 'repetir': return bucleFin(txt(st.cond), st.cuerpo, false);
      case 'repetirMientras': return bucleFin(txt(st.cond), st.cuerpo, true);
      case 'retornar': return caja('term', 'Retornar ' + txt(st.e));
      case 'llamar': return caja('proc', st.n + '(' + st.args.map(txt).join(', ') + ')');
      case 'limpiar': return caja('proc', 'Limpiar pantalla');
      case 'segun': {
        // Segun equivale a decisiones encadenadas; se dibuja así.
        var nodos = st.casos.slice().reverse().reduce(function (acc, c) {
          var cond = c.vals.map(function (v) { return { k: 'bin', op: '=', a: st.e, b: v }; })
            .reduce(function (a, b) { return a ? { k: 'bin', op: 'o', a: a, b: b } : b; }, null);
          return [{ k: 'si', cond: cond, luego: c.cuerpo, sino: acc, l: st.l }];
        }, st.otro || []);
        return secuencia(nodos);
      }
    }
    return caja('proc', st.k);
  }

  /* --- API: pseudocódigo -> SVG --- */
  function dibujar(src, opciones) {
    opciones = opciones || {};
    var prog = typeof src === 'string' ? Pseudo.parse(src) : src;
    var cuerpo = opciones.funcion ? prog.funcs[opciones.funcion.toLowerCase()].cuerpo : prog.cuerpo;
    var ini = caja('term', opciones.inicio || 'Inicio');
    var fin = caja('term', opciones.fin || 'Fin');
    var cuerpoB = secuencia(cuerpo);
    var total = apilar([ini, cuerpoB, fin]);
    var pad = 16;
    var W = total.w + pad * 2, H = total.h + pad * 2;
    var svg = '<svg class="fc" viewBox="0 0 ' + Math.ceil(W) + ' ' + Math.ceil(H) + '" width="' +
      Math.ceil(W) + '" height="' + Math.ceil(H) + '" role="img" aria-label="Diagrama de flujo del algoritmo">' +
      '<defs><marker id="fcA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
      '<path d="M0 0 L10 5 L0 10 z" fill="currentColor" opacity=".55"/></marker></defs>' +
      '<g color="var(--fg-soft)">' + total.draw(pad, pad) + '</g></svg>';
    return svg;
  }

  return { dibujar: dibujar, txt: txt };
})();

/* Helper global usado por los archivos de contenido: pseudocódigo -> figura. */
function diag(src, cap, opciones) {
  try {
    return CDC.fig(Flujo.dibujar(src, opciones), cap);
  } catch (e) {
    return CDC.nota('Diagrama no disponible',
      '<p>No se pudo generar este diagrama (' + CDC.esc(e.message) + ').</p>', 'warn');
  }
}
