/* ============================================================
   05-views.js — Construcción de cada pantalla
   ============================================================ */
var Vistas = (function () {
  'use strict';
  var esc = CDC.esc;
  var NIV = ['', 'Muy fácil', 'Fácil', 'Intermedio', 'Difícil', 'Reto'];

  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

  function progresoModulo(mod) {
    var t = mod.temas.length, h = 0;
    mod.temas.forEach(function (x) { if (CDC.temaHecho(x.id)) h++; });
    return { hechos: h, total: t, pct: pct(h, t) };
  }

  /* ---------------- árbol de navegación ---------------- */
  function navArbol(activo) {
    var abiertos = CDC.datos.tema_abiertos || {};
    return CDC.modulos.map(function (m) {
      var pr = progresoModulo(m);
      var hayActivo = m.temas.some(function (t) { return t.id === activo; });
      var open = hayActivo || abiertos[m.id] ? '1' : '0';
      return '<div class="navmod" data-open="' + open + '" data-mod="' + m.id + '">' +
        '<button class="navmod__btn" type="button" data-toggle="' + m.id + '" aria-expanded="' + (open === '1') + '">' +
        '<span class="navmod__n">' + (m.n) + '</span>' +
        '<span class="navmod__t">' + esc(m.titulo) +
        '<span class="navmod__meta"><br>' + pr.hechos + '/' + pr.total + ' temas · ' + esc(m.nivel) + '</span></span>' +
        '<svg class="navmod__caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>' +
        '</button><ul class="navmod__list">' +
        m.temas.map(function (t) {
          return '<li><a href="#t-' + t.id + '"' + (t.id === activo ? ' aria-current="page"' : '') + '>' +
            '<span class="dot" data-done="' + (CDC.temaHecho(t.id) ? 1 : 0) + '"></span>' +
            '<span>' + esc(t.titulo) + '</span></a></li>';
        }).join('') + '</ul></div>';
    }).join('');
  }

  /* ---------------- inicio ---------------- */
  function inicio() {
    var tot = CDC.totales();
    var ult = CDC.ultimoTema();
    var temaUlt = ult && CDC.temas[ult];
    var cards = CDC.modulos.map(function (m) {
      var pr = progresoModulo(m);
      return '<a class="modcard" href="#m-' + m.id + '">' +
        '<span class="modcard__n">MÓDULO ' + m.n + ' · ' + esc(m.nivel) + '</span>' +
        '<h3>' + esc(m.titulo) + '</h3>' +
        '<p>' + esc(m.resumen) + '</p>' +
        '<span class="row" style="gap:8px;margin-top:auto">' +
        '<span class="bar" style="max-width:120px"><i style="width:' + pr.pct + '%"></i></span>' +
        '<span style="font-size:.76rem;color:var(--fg-soft)">' + pr.hechos + '/' + pr.total + '</span></span>' +
        '</a>';
    }).join('');

    return '' +
      '<section class="hero">' +
      '  <div class="hero__grid">' +
      '    <div class="stack" style="--g:16px">' +
      '      <span class="eyebrow">Curso completo · español · ' + tot.temas + ' lecciones · ' + tot.ejTot + ' ejercicios</span>' +
      '      <h1>Aprende a programar entendiendo <em>por qué</em> funciona cada cosa</h1>' +
      '      <p class="lead">Un recorrido ordenado que empieza en los bits y las compuertas lógicas, pasa por los diagramas de flujo y el pseudocódigo, y llega hasta estructuras de datos, programación orientada a objetos y cómo un compilador convierte tu código en algo que la máquina ejecuta.</p>' +
      '      <div class="row">' +
      (temaUlt ? '<a class="btn" href="#t-' + temaUlt.id + '">Continuar: ' + esc(temaUlt.titulo) + '</a>'
        : '<a class="btn" href="#t-' + CDC.orden[0].id + '">Empezar por el principio</a>') +
      '        <a class="btn btn--ghost" href="#herramientas">Abrir el laboratorio</a>' +
      '      </div>' +
      '    </div>' +
      '    <div class="grid grid--2" style="gap:10px">' +
      '      <div class="stat"><b>' + CDC.modulos.length + '</b><span>módulos, de lo básico a lo avanzado</span></div>' +
      '      <div class="stat"><b>' + tot.ejTot + '</b><span>ejercicios con solución explicada</span></div>' +
      '      <div class="stat"><b>7</b><span>herramientas interactivas</span></div>' +
      '      <div class="stat"><b>' + tot.pct + '%</b><span>de tu avance guardado aquí</span></div>' +
      '    </div>' +
      '  </div>' +
      '</section>' +

      '<section style="margin-top:34px">' +
      '  <h2>Cómo está pensado el curso</h2>' +
      '  <div class="grid grid--3" style="margin-top:14px">' +
      '    <div class="card pad"><h3>1 · Primero la idea</h3><p style="margin-top:7px;color:var(--fg-soft);font-size:.92rem">Cada tema arranca con una explicación larga y con ejemplos de la vida real antes de mostrar una sola línea de código. Si no entiendes el <i>para qué</i>, la sintaxis no sirve.</p></div>' +
      '    <div class="card pad"><h3>2 · Luego el diagrama y el pseudocódigo</h3><p style="margin-top:7px;color:var(--fg-soft);font-size:.92rem">Diseñas la solución en lenguaje humano estructurado. Puedes ejecutar ese pseudocódigo aquí mismo y ver su diagrama de flujo generado automáticamente.</p></div>' +
      '    <div class="card pad"><h3>3 · Al final, el lenguaje</h3><p style="margin-top:7px;color:var(--fg-soft);font-size:.92rem">La misma lógica se traduce a Python, JavaScript y C en paralelo, para que veas que el lenguaje es solo un vestido sobre las mismas ideas.</p></div>' +
      '  </div>' +
      '</section>' +

      '<section style="margin-top:34px">' +
      '  <h2>La ruta completa</h2>' +
      '  <p style="color:var(--fg-soft);margin-top:6px">Puedes saltar a cualquier módulo, pero el orden está pensado para que cada uno use lo anterior.</p>' +
      '  <div class="grid grid--2" style="margin-top:16px">' + cards + '</div>' +
      '</section>' +

      '<section style="margin-top:34px" class="card pad">' +
      '  <h2>Cómo estudiar cada lección</h2>' +
      '  <ol class="ruta" style="margin-top:12px">' +
      '    <li><b>Lee la explicación completa</b> sin saltarte las analogías: están ahí para anclar el concepto.</li>' +
      '    <li><b>Copia el ejemplo al laboratorio</b> y cámbiale cosas a propósito para ver qué se rompe. Romper código es la forma más rápida de entenderlo.</li>' +
      '    <li><b>Haz los ejercicios en orden de dificultad</b> y resuélvelos en papel antes de escribirlos.</li>' +
      '    <li><b>Mira la solución solo después de intentarlo</b> de verdad, y compárala con la tuya en lugar de copiarla.</li>' +
      '    <li><b>Marca el tema como completado</b> para llevar tu progreso. Se guarda en este navegador.</li>' +
      '  </ol>' +
      '</section>';
  }

  /* ---------------- módulo ---------------- */
  function modulo(m) {
    var pr = progresoModulo(m);
    return '<nav class="eyebrow" style="margin-bottom:10px"><a href="#inicio" style="color:inherit">Inicio</a> › Módulo ' + m.n + '</nav>' +
      '<header class="stack" style="--g:10px">' +
      '<span class="eyebrow">Módulo ' + m.n + ' · nivel ' + esc(m.nivel) + '</span>' +
      '<h1>' + esc(m.titulo) + '</h1>' +
      '<p class="lead" style="color:var(--fg-soft);font-size:1.04rem">' + esc(m.resumen) + '</p>' +
      '<div class="row"><span class="bar" style="max-width:200px"><i style="width:' + pr.pct + '%"></i></span>' +
      '<span style="font-size:.82rem;color:var(--fg-soft)">' + pr.hechos + ' de ' + pr.total + ' temas completados</span></div>' +
      (m.intro ? '<div class="prose" style="margin-top:8px">' + m.intro + '</div>' : '') +
      '</header>' +
      '<div class="grid" style="margin-top:26px;gap:11px">' +
      m.temas.map(function (t, i) {
        var hecho = CDC.temaHecho(t.id);
        var ej = (t.ejercicios || []).length;
        return '<a class="modcard" href="#t-' + t.id + '" style="flex-direction:row;align-items:flex-start;gap:13px">' +
          '<span class="navmod__n" style="margin-top:4px">' + (i + 1) + '</span>' +
          '<span style="flex:1;min-width:0">' +
          '<h3 style="font-size:1rem">' + esc(t.titulo) + (hecho ? ' <span class="tag" style="vertical-align:middle">hecho</span>' : '') + '</h3>' +
          '<p style="margin-top:4px">' + esc(t.resumen || '') + '</p>' +
          '<span style="font-size:.76rem;color:var(--fg-soft);display:block;margin-top:6px">' +
          ej + ' ejercicio' + (ej === 1 ? '' : 's') + (t.quiz ? ' · ' + t.quiz.length + ' preguntas de repaso' : '') + '</span>' +
          '</span></a>';
      }).join('') + '</div>';
  }

  /* ---------------- tema ---------------- */
  function tema(t) {
    var m = t.modulo;
    var pos = CDC.orden.indexOf(t);
    var prev = CDC.orden[pos - 1], sig = CDC.orden[pos + 1];
    var h = '<nav class="eyebrow" style="margin-bottom:10px">' +
      '<a href="#inicio" style="color:inherit">Inicio</a> › <a href="#m-' + m.id + '" style="color:inherit">Módulo ' + m.n + '</a> › Tema ' + (m.temas.indexOf(t) + 1) +
      '</nav>';
    h += '<header class="stack" style="--g:12px">' +
      '<span class="eyebrow">' + esc(m.titulo) + '</span>' +
      '<h1>' + esc(t.titulo) + '</h1>';
    if (t.objetivos && t.objetivos.length) {
      h += '<div class="note note--key"><div class="note__t">Al terminar este tema vas a poder</div><ul style="margin:4px 0 0;padding-left:18px">' +
        t.objetivos.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul></div>';
    }
    h += '</header>';

    h += '<article class="prose reading" style="margin-top:26px">' + (t.lectura || '') + '</article>';

    if (t.ejercicios && t.ejercicios.length) {
      h += '<section style="margin-top:40px"><h2>Ejercicios</h2>' +
        '<p style="color:var(--fg-soft);margin-top:6px;max-width:68ch">Están ordenados de menor a mayor dificultad. ' +
        'Resuélvelos en papel o en el laboratorio antes de abrir la solución.</p>' +
        '<div style="margin-top:16px">' +
        t.ejercicios.map(function (e, i) { return ejercicio(t, e, i); }).join('') +
        '</div></section>';
    }

    if (t.quiz && t.quiz.length) {
      h += '<section style="margin-top:40px"><h2>Repaso rápido</h2><div style="margin-top:14px">' +
        t.quiz.map(function (q, i) { return quiz(t, q, i); }).join('') + '</div></section>';
    }

    h += '<section style="margin-top:36px" class="card pad">' +
      '<label class="check" style="font-size:.95rem;color:var(--fg)">' +
      '<input type="checkbox" id="temaHecho"' + (CDC.temaHecho(t.id) ? ' checked' : '') + '> ' +
      '<b>Marcar este tema como completado</b></label>' +
      '<p style="font-size:.84rem;color:var(--fg-soft);margin-top:6px">Tu avance se guarda solo en este navegador. Si borras los datos del sitio, empiezas de nuevo.</p>' +
      '</section>';

    h += '<nav class="pager">' +
      (prev ? '<a href="#t-' + prev.id + '"><span>← Anterior</span><b>' + esc(prev.titulo) + '</b></a>' : '') +
      (sig ? '<a href="#t-' + sig.id + '" style="text-align:right"><span>Siguiente →</span><b>' + esc(sig.titulo) + '</b></a>' : '') +
      '</nav>';
    return h;
  }

  function ejercicio(t, e, i) {
    var id = t.id + ':' + i;
    var n = e.n || 1;
    return '<div class="ex" data-ex="' + id + '">' +
      '<div class="ex__h">' +
      '<span class="ex__lvl lvl' + n + '">' + NIV[n] + '</span>' +
      '<div class="ex__body">' +
      (e.titulo ? '<div class="ex__t">' + e.titulo + '</div>' : '') +
      '<div class="ex__q">' + e.enunciado + '</div>' +
      '</div></div>' +
      '<div class="ex__tools">' +
      (e.pista ? '<button class="btn btn--sm btn--ghost" type="button" data-pista="' + id + '">Ver pista</button>' : '') +
      '<button class="btn btn--sm btn--ghost" type="button" data-sol="' + id + '">Ver solución</button>' +
      (e.lab ? '<button class="btn btn--sm btn--ghost" type="button" data-lab="' + id + '">Abrir en el laboratorio</button>' : '') +
      '<label class="check" style="margin-left:auto"><input type="checkbox" data-done="' + id + '"' +
      (CDC.ejerHecho(id) ? ' checked' : '') + '> resuelto</label>' +
      '</div>' +
      (e.pista ? '<div class="ex__sol" data-panel="pista-' + id + '" hidden><b>Pista.</b> ' + e.pista + '</div>' : '') +
      '<div class="ex__sol" data-panel="sol-' + id + '" hidden>' + e.solucion + '</div>' +
      '</div>';
  }

  function quiz(t, q, i) {
    var id = t.id + '#' + i;
    var prev = CDC.quizEstado(id);
    return '<div class="quiz" data-quiz="' + id + '" data-ok="' + q.ok + '">' +
      '<div class="quiz__p">' + (i + 1) + '. ' + q.p + '</div>' +
      '<div class="quiz__o">' + q.ops.map(function (o, k) {
        return '<button type="button" data-op="' + k + '"><b>' + 'abcde'[k] + ')</b><span>' + o + '</span></button>';
      }).join('') + '</div>' +
      '<div class="quiz__fb" data-fb hidden>' + q.exp + '</div>' +
      (prev !== undefined ? '<div style="font-size:.78rem;color:var(--fg-soft);margin-top:8px">Ya la respondiste ' +
        (prev ? 'correctamente' : 'incorrectamente') + ' antes.</div>' : '') +
      '</div>';
  }

  /* ---------------- herramientas ---------------- */
  function herramientas(activa) {
    var lista = Lab.lista;
    var act = lista.filter(function (x) { return x.id === activa; })[0] || lista[0];
    return '<header class="stack" style="--g:10px">' +
      '<span class="eyebrow">Laboratorio</span>' +
      '<h1>Prueba las ideas, no solo las leas</h1>' +
      '<p class="lead" style="color:var(--fg-soft)">Todo corre dentro de tu navegador: nada se envía a ningún servidor y funciona también sin conexión.</p>' +
      '</header>' +
      '<div class="tabs" role="tablist" style="margin-top:22px">' +
      lista.map(function (x) {
        return '<button role="tab" type="button" data-tool="' + x.id + '" aria-selected="' + (x.id === act.id) + '">' + esc(x.nom) + '</button>';
      }).join('') + '</div>' +
      '<div class="card pad" id="toolHost" data-active="' + act.id + '">' +
      '<h2 style="font-size:1.2rem">' + esc(act.nom) + '</h2>' +
      '<p style="color:var(--fg-soft);font-size:.92rem;margin:6px 0 16px">' + esc(act.desc) + '</p>' +
      '<div id="toolBody">' + act.html() + '</div></div>';
  }

  /* ---------------- biblioteca ---------------- */
  var LIBROS = [
    { t: 'Code: The Hidden Language of Computer Hardware and Software', a: 'Charles Petzold',
      m: 'M1', d: 'Construye una computadora desde cero: empieza con dos linternas y un código de señales, y acaba en una CPU con memoria. Es la mejor explicación publicada de por qué el binario y las compuertas lógicas son inevitables.' },
    { t: 'Fundamentos de programación: algoritmos, estructuras de datos y objetos', a: 'Luis Joyanes Aguilar',
      m: 'M2–M4', d: 'El clásico en español para diagramas de flujo, pseudocódigo y lógica de programación. Su notación es la base del pseudocódigo que usamos en este curso.' },
    { t: 'Think Python / Aprende a pensar como un programador', a: 'Allen B. Downey',
      m: 'M5', d: 'Enseña a traducir ideas a código con un lenguaje mínimo. Gratis y legal en la web del autor, con ejercicios muy bien graduados.' },
    { t: 'Grokking Algorithms / Entender los algoritmos', a: 'Aditya Bhargava',
      m: 'M6–M7', d: 'Algoritmos y estructuras de datos explicados con dibujos. Es la puerta de entrada amable a Big-O, recursión, búsqueda binaria y grafos.' },
    { t: 'Introduction to Algorithms (CLRS)', a: 'Cormen, Leiserson, Rivest y Stein',
      m: 'M7', d: 'La referencia rigurosa. No es para leer de corrido: se consulta cuando necesitas la demostración o el caso límite exacto de un algoritmo.' },
    { t: 'Structure and Interpretation of Computer Programs (SICP)', a: 'Abelson y Sussman',
      m: 'M8–M9', d: 'Cambia la forma de pensar sobre abstracción, recursión e intérpretes. En el capítulo 4 escribes un intérprete del propio lenguaje en el que programas.' },
    { t: 'Clean Code', a: 'Robert C. Martin',
      m: 'M8', d: 'Cómo escribir código que otro humano pueda leer: nombres, funciones pequeñas, responsabilidad única. Léelo con criterio, no como dogma.' },
    { t: 'Design Patterns', a: 'Gamma, Helm, Johnson y Vlissides',
      m: 'M8', d: 'El catálogo original de patrones de diseño. Útil cuando ya sentiste el problema que cada patrón resuelve; antes de eso, confunde.' },
    { t: 'Crafting Interpreters', a: 'Robert Nystrom',
      m: 'M9', d: 'Escribes dos intérpretes completos, uno en Java y otro en C con su propia máquina virtual. Es la mejor forma de entender cómo se procesa un lenguaje.' },
    { t: 'Compilers: Principles, Techniques and Tools (el libro del dragón)', a: 'Aho, Lam, Sethi y Ullman',
      m: 'M9', d: 'El tratado formal sobre análisis léxico, sintáctico, semántico y generación de código. Denso, pero es la fuente de casi todo lo demás.' },
    { t: 'Computer Systems: A Programmer\'s Perspective', a: 'Bryant y O\'Hallaron',
      m: 'M9', d: 'Qué ocurre de verdad con tu programa: memoria virtual, caché, enlazado, excepciones. Explica por qué dos programas correctos pueden diferir 100× en velocidad.' },
    { t: 'The Pragmatic Programmer', a: 'Hunt y Thomas',
      m: 'M10', d: 'Hábitos profesionales: control de versiones, automatización, pruebas, no repetirte. Es el libro que más rápido mejora tu día a día.' }
  ];
  function biblioteca() {
    return '<header class="stack" style="--g:10px">' +
      '<span class="eyebrow">Bibliografía</span>' +
      '<h1>Los libros en los que se apoya este curso</h1>' +
      '<p class="lead" style="color:var(--fg-soft)">Cada módulo resume y ordena ideas que están desarrolladas a fondo en estos textos. Si un tema te engancha, el siguiente paso es el libro, no otro tutorial.</p>' +
      '</header>' +
      '<div class="grid grid--2" style="margin-top:24px">' +
      LIBROS.map(function (b) {
        return '<div class="book"><span class="book__spine"></span><div style="min-width:0">' +
          '<span class="tag tag--line">' + b.m + '</span>' +
          '<h4 style="margin-top:7px">' + esc(b.t) + '</h4>' +
          '<div class="by">' + esc(b.a) + '</div>' +
          '<p>' + esc(b.d) + '</p></div></div>';
      }).join('') + '</div>' +
      '<div class="note" style="margin-top:24px"><div class="note__t">Cómo leer un libro técnico sin abandonarlo</div>' +
      '<p>Lee un capítulo, cierra el libro y reimplementa su ejemplo principal de memoria. Si no puedes, vuelve a ese capítulo. ' +
      'Avanzar 30 páginas entendiendo vale más que 300 subrayadas.</p></div>';
  }

  /* ---------------- progreso ---------------- */
  function progreso() {
    var tot = CDC.totales();
    var filas = CDC.modulos.map(function (m) {
      var pr = progresoModulo(m);
      var ejT = 0, ejH = 0;
      m.temas.forEach(function (t) {
        (t.ejercicios || []).forEach(function (_, i) { ejT++; if (CDC.ejerHecho(t.id + ':' + i)) ejH++; });
      });
      return ['<a href="#m-' + m.id + '">' + esc(m.titulo) + '</a>',
        pr.hechos + ' / ' + pr.total, ejH + ' / ' + ejT,
        '<span class="bar" style="min-width:90px"><i style="width:' + pr.pct + '%"></i></span>'];
    });
    return '<header class="stack" style="--g:10px">' +
      '<span class="eyebrow">Tu avance</span><h1>Progreso</h1>' +
      '<p class="lead" style="color:var(--fg-soft)">Se guarda en este navegador con <code>localStorage</code>. No hay cuentas ni servidores: si abres el curso en otro dispositivo, su progreso será independiente.</p></header>' +
      '<div class="grid grid--3" style="margin-top:22px">' +
      '<div class="stat"><b>' + tot.pct + '%</b><span>del curso completado</span></div>' +
      '<div class="stat"><b>' + tot.hechos + ' / ' + tot.temas + '</b><span>temas marcados</span></div>' +
      '<div class="stat"><b>' + tot.ejHechos + ' / ' + tot.ejTot + '</b><span>ejercicios resueltos</span></div>' +
      '</div>' +
      '<div style="margin-top:22px">' + CDC.tabla(['Módulo', 'Temas', 'Ejercicios', 'Avance'], filas) + '</div>' +
      '<div class="card pad" style="margin-top:22px">' +
      '<h3>Reiniciar el progreso</h3>' +
      '<p style="color:var(--fg-soft);font-size:.9rem;margin-top:6px">Borra las marcas de temas, ejercicios y respuestas de repaso guardadas en este navegador.</p>' +
      '<div class="row" style="margin-top:12px"><button class="btn btn--ghost" id="resetBtn" type="button">Borrar mi progreso</button>' +
      '<span id="resetMsg" style="font-size:.85rem;color:var(--fg-soft)"></span></div></div>';
  }

  /* ---------------- búsqueda ---------------- */
  function buscar(q) {
    var res = CDC.buscar(q);
    var h = '<header class="stack" style="--g:8px"><span class="eyebrow">Búsqueda</span>' +
      '<h1>' + res.length + ' resultado' + (res.length === 1 ? '' : 's') + ' para «' + esc(q) + '»</h1></header>';
    if (!res.length) {
      h += '<div class="note" style="margin-top:20px">No encontré nada con ese término. Prueba con una palabra más corta o revisa el ' +
        '<a href="#inicio">índice de módulos</a>.</div>';
      return h;
    }
    h += '<div style="margin-top:20px">' + res.map(function (r) {
      return '<a class="hit" href="#t-' + r.tema.id + '">' +
        '<span class="eyebrow">' + esc(r.tema.modulo.titulo) + '</span>' +
        '<b style="display:block;margin:3px 0 4px">' + esc(r.tema.titulo) + '</b>' +
        '<span style="font-size:.86rem;color:var(--fg-soft)">…' + esc(r.frag) + '…</span></a>';
    }).join('') + '</div>';
    return h;
  }

  function noEncontrado() {
    return '<h1>Esa página no existe</h1><p style="margin-top:10px;color:var(--fg-soft)">' +
      'Puede que el enlace esté mal escrito. Vuelve al <a href="#inicio">inicio</a> o usa el buscador de la barra lateral.</p>';
  }

  return { navArbol: navArbol, inicio: inicio, modulo: modulo, tema: tema,
    herramientas: herramientas, biblioteca: biblioteca, progreso: progreso,
    buscar: buscar, noEncontrado: noEncontrado, libros: LIBROS };
})();
