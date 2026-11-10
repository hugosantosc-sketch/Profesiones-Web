/* ============================================================
   01-core.js — registro de contenido, almacenamiento, utilidades
   ============================================================ */
var CDC = (function () {
  'use strict';

  var modulos = [];
  var indiceTemas = {};   // id -> {tema, modulo, pos}
  var ordenTemas = [];    // [{id, titulo, modulo}]

  /* ---------- registro del currículo ---------- */
  function registrar(mod) {
    mod.n = modulos.length;
    modulos.push(mod);
    (mod.temas || []).forEach(function (t) {
      t.modulo = mod;
      indiceTemas[t.id] = t;
      ordenTemas.push(t);
    });
  }

  /* ---------- utilidades de texto ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var KW = {
    pseudo: ['Algoritmo', 'FinAlgoritmo', 'Proceso', 'FinProceso', 'SubProceso', 'FinSubProceso',
      'Funcion', 'FinFuncion', 'Definir', 'Como', 'Dimension', 'Entero', 'Real', 'Caracter',
      'Cadena', 'Logico', 'Texto', 'Escribir', 'Leer', 'Si', 'Entonces', 'Sino', 'FinSi',
      'Mientras', 'Hacer', 'FinMientras', 'Repetir', 'Hasta', 'Que', 'Para', 'Con', 'Paso',
      'FinPara', 'Segun', 'FinSegun', 'caso', 'De', 'Otro', 'Modo', 'Retornar', 'Verdadero',
      'Falso', 'MOD', 'Y', 'O', 'NO', 'Sin', 'Saltar', 'Referencia', 'Valor', 'Borrar', 'Pantalla'],
    python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
      'import', 'from', 'as', 'class', 'try', 'except', 'finally', 'raise', 'with', 'lambda',
      'None', 'True', 'False', 'print', 'input', 'range', 'len', 'int', 'float', 'str', 'pass',
      'break', 'continue', 'global', 'yield', 'self', 'is', 'del', 'assert'],
    js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
      'switch', 'case', 'default', 'break', 'continue', 'new', 'class', 'extends', 'this',
      'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'null', 'undefined', 'true',
      'false', 'of', 'in', 'async', 'await', 'static', 'get', 'set', 'super', 'delete', 'void'],
    c: ['int', 'float', 'double', 'char', 'void', 'long', 'short', 'unsigned', 'signed',
      'struct', 'union', 'enum', 'typedef', 'const', 'static', 'return', 'if', 'else', 'for',
      'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'sizeof', 'include',
      'define', 'printf', 'scanf', 'malloc', 'free', 'NULL'],
    java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
      'static', 'void', 'int', 'double', 'boolean', 'String', 'new', 'return', 'if', 'else',
      'for', 'while', 'this', 'super', 'true', 'false', 'null', 'abstract', 'final', 'import'],
    txt: []
  };

  /* Resaltador ligero: comentarios, cadenas, números, palabras clave. */
  function hl(src, lang) {
    lang = lang || 'pseudo';
    var kws = KW[lang] || KW.pseudo;
    var out = '';
    var i = 0, s = String(src);
    var comStart = (lang === 'python') ? '#' : '//';
    function isW(c) { return /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ_0-9]/.test(c); }
    while (i < s.length) {
      var c = s[i];
      // comentarios
      if (s.startsWith(comStart, i) || (lang === 'pseudo' && s.startsWith('//', i))) {
        var j = s.indexOf('\n', i); if (j < 0) j = s.length;
        out += '<span class="tk-com">' + esc(s.slice(i, j)) + '</span>'; i = j; continue;
      }
      if (s.startsWith('/*', i)) {
        var k = s.indexOf('*/', i); k = k < 0 ? s.length : k + 2;
        out += '<span class="tk-com">' + esc(s.slice(i, k)) + '</span>'; i = k; continue;
      }
      // cadenas
      if (c === '"' || c === "'") {
        var q = c, j2 = i + 1;
        while (j2 < s.length && s[j2] !== q) { if (s[j2] === '\\') j2++; j2++; }
        out += '<span class="tk-str">' + esc(s.slice(i, Math.min(j2 + 1, s.length))) + '</span>';
        i = j2 + 1; continue;
      }
      // números
      if (/[0-9]/.test(c) && !isW(s[i - 1] || ' ')) {
        var j3 = i; while (j3 < s.length && /[0-9.xXbBa-fA-F]/.test(s[j3])) j3++;
        out += '<span class="tk-num">' + esc(s.slice(i, j3)) + '</span>'; i = j3; continue;
      }
      // palabras
      if (isW(c) && !/[0-9]/.test(c)) {
        var j4 = i; while (j4 < s.length && isW(s[j4])) j4++;
        var w = s.slice(i, j4);
        var low = w.toLowerCase();
        var hit = kws.some(function (k) { return k.toLowerCase() === low; });
        if (hit) out += '<span class="tk-kw">' + esc(w) + '</span>';
        else if (s[j4] === '(') out += '<span class="tk-fn">' + esc(w) + '</span>';
        else out += esc(w);
        i = j4; continue;
      }
      if ('+-*/<>=%^&|!~'.indexOf(c) >= 0) { out += '<span class="tk-op">' + esc(c) + '</span>'; i++; continue; }
      out += esc(c); i++;
    }
    return out;
  }

  var ETIQ = { pseudo: 'Pseudocódigo', python: 'Python', js: 'JavaScript', c: 'C', java: 'Java', txt: '' };

  function cod(lang, src) {
    src = String(src).replace(/^\n/, '').replace(/\s+$/, '');
    var lbl = ETIQ[lang] === undefined ? lang : ETIQ[lang];
    return '<div class="codeblock">' + (lbl ? '<span class="codeblock__lbl">' + esc(lbl) + '</span>' : '') +
      '<pre><code>' + hl(src, lang) + '</code></pre></div>';
  }

  function nota(titulo, html, tipo) {
    var cls = 'note' + (tipo ? ' note--' + tipo : '');
    return '<div class="' + cls + '">' + (titulo ? '<div class="note__t">' + titulo + '</div>' : '') + html + '</div>';
  }

  function tabla(heads, rows, cap) {
    var h = '<div class="tablewrap"><table><thead><tr>' +
      heads.map(function (x) { return '<th' + (/^#/.test(x) ? ' class="num"' : '') + '>' + x.replace(/^#/, '') + '</th>'; }).join('') +
      '</tr></thead><tbody>';
    rows.forEach(function (r) {
      h += '<tr>' + r.map(function (c, idx) {
        return '<td' + (/^#/.test(heads[idx] || '') ? ' class="num"' : '') + '>' + c + '</td>';
      }).join('') + '</tr>';
    });
    h += '</tbody>' + (cap ? '<caption>' + cap + '</caption>' : '') + '</table></div>';
    return h;
  }

  function fig(svg, cap) {
    return '<figure class="figure">' + svg + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
  }

  /* ---------- almacenamiento local (tolerante a fallos) ---------- */
  var KEY = 'cdc.v1';
  var datos = { temas: {}, ejer: {}, quiz: {}, tema: null, tema_ts: {}, tema_abiertos: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object') {
        ['temas', 'ejer', 'quiz', 'tema_ts', 'tema_abiertos'].forEach(function (k) {
          if (p[k] && typeof p[k] === 'object') datos[k] = p[k];
        });
        if (typeof p.tema === 'string') datos.tema = p.tema;
      }
    }
  } catch (e) { /* modo privado o almacenamiento bloqueado: seguimos sin persistencia */ }

  var guardarPend = null;
  function guardar() {
    if (guardarPend) return;
    guardarPend = setTimeout(function () {
      guardarPend = null;
      try { localStorage.setItem(KEY, JSON.stringify(datos)); } catch (e) { }
    }, 180);
  }

  function marcarTema(id, v) {
    if (v) { datos.temas[id] = 1; datos.tema_ts[id] = Date.now(); }
    else delete datos.temas[id];
    guardar();
  }
  function temaHecho(id) { return !!datos.temas[id]; }
  function marcarEjer(id, v) { if (v) datos.ejer[id] = 1; else delete datos.ejer[id]; guardar(); }
  function ejerHecho(id) { return !!datos.ejer[id]; }
  function guardarQuiz(id, ok) { datos.quiz[id] = ok ? 1 : 0; guardar(); }
  function quizEstado(id) { return datos.quiz[id]; }
  function ultimoTema(v) { if (v !== undefined) { datos.tema = v; guardar(); } return datos.tema; }

  function totales() {
    var tot = ordenTemas.length, hechos = 0, ejTot = 0, ejHechos = 0;
    ordenTemas.forEach(function (t) {
      if (datos.temas[t.id]) hechos++;
      (t.ejercicios || []).forEach(function (_, i) {
        ejTot++; if (datos.ejer[t.id + ':' + i]) ejHechos++;
      });
    });
    return { temas: tot, hechos: hechos, ejTot: ejTot, ejHechos: ejHechos,
      pct: tot ? Math.round(hechos / tot * 100) : 0 };
  }

  function reiniciar() {
    datos = { temas: {}, ejer: {}, quiz: {}, tema: null, tema_ts: {}, tema_abiertos: {} };
    try { localStorage.removeItem(KEY); } catch (e) { }
  }

  /* ---------- búsqueda ---------- */
  function sinTildes(s) {
    return String(s).toLowerCase()
      .replace(/[áàä]/g, 'a').replace(/[éè]/g, 'e').replace(/[íï]/g, 'i')
      .replace(/[óö]/g, 'o').replace(/[úü]/g, 'u').replace(/ñ/g, 'n');
  }
  function textoPlano(html) {
    return String(html || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
  }
  function buscar(q) {
    var n = sinTildes(q).trim();
    if (n.length < 2) return [];
    var terms = n.split(/\s+/);
    var res = [];
    ordenTemas.forEach(function (t) {
      var cuerpo = textoPlano((t.lectura || '') + ' ' + (t.objetivos || []).join(' ') +
        ' ' + (t.ejercicios || []).map(function (e) { return e.enunciado || ''; }).join(' '));
      var campo = sinTildes(t.titulo + ' ' + (t.resumen || '') + ' ' + cuerpo);
      var score = 0, pos = -1;
      terms.forEach(function (w) {
        var i = campo.indexOf(w);
        if (i >= 0) { score += (sinTildes(t.titulo).indexOf(w) >= 0 ? 12 : 1); if (pos < 0) pos = i; }
      });
      if (score > 0) {
        var frag = cuerpo.slice(Math.max(0, pos - 70), pos + 150).trim();
        res.push({ tema: t, score: score, frag: frag });
      }
    });
    return res.sort(function (a, b) { return b.score - a.score; }).slice(0, 25);
  }

  return {
    registrar: registrar, modulos: modulos, temas: indiceTemas, orden: ordenTemas,
    esc: esc, hl: hl, cod: cod, nota: nota, tabla: tabla, fig: fig,
    marcarTema: marcarTema, temaHecho: temaHecho, marcarEjer: marcarEjer, ejerHecho: ejerHecho,
    guardarQuiz: guardarQuiz, quizEstado: quizEstado, ultimoTema: ultimoTema,
    totales: totales, reiniciar: reiniciar, buscar: buscar, datos: datos, guardar: guardar
  };
})();

/* atajos globales usados por los archivos de contenido */
var cod = CDC.cod, nota = CDC.nota, tabla = CDC.tabla, fig = CDC.fig;
