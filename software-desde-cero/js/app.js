/* Interfaz: rutas por hash (funciona en la raíz o en una subcarpeta de Vercel) y progreso en este navegador. */
(function () {
  'use strict';
  var SDC = window.SDC, KEY = 'software-desde-cero.v1', main = document.getElementById('main'), side = document.getElementById('side');
  var INTERVALS = [1, 3, 7, 16, 35];
  var S = load();

  function load() { try { var d = JSON.parse(localStorage.getItem(KEY)); if (d && d.ex) return d; } catch (e) {} return { ex: {}, read: {}, last: null, drafts: {} }; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d; }
  function today() { return Math.floor(Date.now() / 864e5); }

  function subProgress(sid) { var ex = SDC.exercises(sid), ok = 0; ex.forEach(function (e) { if (S.ex[e.id] && S.ex[e.id].ok) ok++; }); return { ok: ok, total: ex.length, pct: Math.round(ok / ex.length * 100) }; }
  function modProgress(m) { var ok = 0, t = 0; m.subs.forEach(function (s) { var p = subProgress(s); ok += p.ok; t += p.total; }); return { ok: ok, total: t, pct: t ? Math.round(ok / t * 100) : 0 }; }
  function allProgress() { var ok = 0, t = 0; SDC.modules.forEach(function (m) { var p = modProgress(m); ok += p.ok; t += p.total; }); return { ok: ok, total: t, pct: t ? Math.round(ok / t * 100) : 0 }; }
  function record(ex, good) {
    var r = S.ex[ex.id] || { ok: false, box: 0, tries: 0 };
    r.tries++;
    if (good) { r.ok = true; r.box = Math.min((r.box || 0) + 1, INTERVALS.length - 1); r.due = today() + INTERVALS[r.box]; r.miss = false; }
    else { r.box = 0; r.due = today(); r.miss = true; }
    S.ex[ex.id] = r; save();
  }

  /* Mini-markdown para las lecciones */
  function inline(s) { return esc(s).replace(/«([^»]+)»/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|\s)\*([^*\s][^*]*)\*/g, '$1<i>$2</i>'); }
  function md(src) {
    var lines = src.replace(/^\n+/, '').split('\n'), out = [], i = 0;
    while (i < lines.length) {
      var l = lines[i].trim();
      if (!l) { i++; continue; }
      if (l.indexOf('~~~') === 0) {
        var lang = l.slice(3).trim(), buf = []; i++;
        while (i < lines.length && lines[i].trim() !== '~~~') buf.push(lines[i++]);
        i++;
        var body = buf.join('\n');
        if (lang === 'js') out.push('<div class="play" data-code="' + esc(body) + '"></div>');
        else out.push('<pre><code>' + esc(body) + '</code></pre>');
        continue;
      }
      if (l.indexOf(':::flow') === 0) { out.push('<div class="flow">' + l.slice(7).split('|').map(function (x) { return '<span>' + inline(x.trim()) + '</span>'; }).join('<i></i>') + '</div>'); i++; continue; }
      if (l.indexOf(':::w ') === 0) { out.push('<div class="widget" data-w="' + l.slice(5).trim() + '"></div>'); i++; continue; }
      if (l.indexOf('### ') === 0) { out.push('<h3>' + inline(l.slice(4)) + '</h3>'); i++; continue; }
      if (l.indexOf('## ') === 0) { out.push('<h2>' + inline(l.slice(3)) + '</h2>'); i++; continue; }
      if (l.indexOf('> ') === 0) { out.push('<div class="call a"><p>' + inline(l.slice(2)) + '</p></div>'); i++; continue; }
      if (l.indexOf('! ') === 0) { out.push('<div class="call k"><p>' + inline(l.slice(2)) + '</p></div>'); i++; continue; }
      if (l[0] === '|') {
        var rows = [];
        while (i < lines.length && lines[i].trim()[0] === '|') { rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); })); i++; }
        out.push('<div class="tablew"><table><thead><tr>' + rows[0].map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.slice(1).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>');
        continue;
      }
      if (/^- /.test(l) || /^\d+\. /.test(l)) {
        var ord = /^\d/.test(l), items = [];
        while (i < lines.length && (ord ? /^\s*\d+\. /.test(lines[i]) : /^\s*- /.test(lines[i]))) { items.push(lines[i].trim().replace(/^(- |\d+\. )/, '')); i++; }
        var tag = ord ? 'ol' : 'ul';
        out.push('<' + tag + '>' + items.map(function (x) { return '<li>' + inline(x) + '</li>'; }).join('') + '</' + tag + '>');
        continue;
      }
      var p = [];
      while (i < lines.length && lines[i].trim() && !/^(#|~~~|:::|> |! |- |\d+\. |\|)/.test(lines[i].trim())) p.push(lines[i++].trim());
      if (!p.length) { p.push(lines[i++].trim()); }
      out.push('<p>' + inline(p.join(' ')) + '</p>');
    }
    return out.join('');
  }

  /* Ejecución aislada del código del estudiante en un Worker, con límite de tiempo */
  var WORKER = "onmessage=function(m){var d=m.data,logs=[];function f(v){return typeof v==='string'?v:(typeof v==='object'&&v!==null?JSON.stringify(v):String(v))}var c={log:function(){logs.push([].map.call(arguments,f).join(' '))},error:function(){logs.push([].map.call(arguments,f).join(' '))}};c.warn=c.info=c.log;try{if(d.mode==='script'){new Function('console',d.src)(c);postMessage({logs:logs})}else{var fn=new Function('console',d.src+'\\n;return typeof '+d.fn+\"==='function'?\"+d.fn+':null;')(c);if(!fn)throw new Error('No encontré una función llamada '+d.fn);var res=d.tests.map(function(t){var got,err=null;try{got=fn.apply(null,JSON.parse(JSON.stringify(t[0])))}catch(e){err=e.message}return{args:t[0],expected:t[1],got:got===undefined?null:got,ok:!err&&JSON.stringify(got)===JSON.stringify(t[1]),error:err}});postMessage({results:res,logs:logs})}}catch(e){postMessage({error:e.message,logs:logs})}}";
  function runInWorker(payload, cb) {
    var url = URL.createObjectURL(new Blob([WORKER], { type: 'text/javascript' })), w, timer, done = false;
    function end(r) { if (done) return; done = true; clearTimeout(timer); if (w) w.terminate(); URL.revokeObjectURL(url); cb(r); }
    try { w = new Worker(url); } catch (e) { return end({ error: 'Este navegador no permite ejecutar código aquí.', logs: [] }); }
    w.onmessage = function (m) { end(m.data); };
    w.onerror = function (e) { e.preventDefault(); end({ error: e.message || 'Error de sintaxis', logs: [] }); };
    timer = setTimeout(function () { end({ error: 'Se detuvo tras 3 segundos: revisa si hay un bucle infinito.', logs: [] }); }, 3000);
    w.postMessage(payload);
  }

  function tabInEditor(ta) { ta.addEventListener('keydown', function (e) { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); var a = ta.selectionStart; ta.value = ta.value.slice(0, a) + '  ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = a + 2; } }); }

  function mountEnhancements(root) {
    root.querySelectorAll('.play').forEach(function (box) {
      var code = box.getAttribute('data-code');
      box.innerHTML = '<textarea spellcheck="false" aria-label="Código de ejemplo editable"></textarea><div class="bar"><button>Ejecutar</button><button class="g">Restaurar</button></div>';
      var ta = box.querySelector('textarea'); ta.value = code; ta.rows = Math.min(code.split('\n').length + 1, 24); tabInEditor(ta);
      var bs = box.querySelectorAll('button');
      bs[0].onclick = function () {
        runInWorker({ mode: 'script', src: ta.value }, function (r) {
          var o = box.querySelector('output') || box.appendChild(document.createElement('output'));
          o.textContent = (r.logs || []).join('\n') + (r.error ? '\nError: ' + r.error : '') || '(El código no imprimió nada: agrega console.log)';
        });
      };
      bs[1].onclick = function () { ta.value = code; };
    });
    root.querySelectorAll('[data-w]').forEach(function (w) { (WIDGETS[w.getAttribute('data-w')] || function () {})(w); });
  }

  var WIDGETS = {
    bits: function (w) {
      var v = 65;
      function draw() {
        var html = '<div class="bits">';
        for (var i = 7; i >= 0; i--) { var on = v >> i & 1; html += '<div class="bit"><button data-i="' + i + '" class="' + (on ? 'on' : '') + '" aria-pressed="' + !!on + '" aria-label="Bit de valor ' + (1 << i) + '">' + on + '</button><small>' + (1 << i) + '</small></div>'; }
        html += '</div><div class="readout">Decimal ' + v + ' | Hexadecimal ' + v.toString(16).toUpperCase().padStart(2, '0') + ' | ASCII ' + (v >= 32 && v < 127 ? esc(String.fromCharCode(v)) : '(no imprimible)') + '</div>';
        w.innerHTML = '<p style="margin:0 0 8px">Toca cada bit y mira cómo cambia el número:</p>' + html;
        w.querySelectorAll('button').forEach(function (b) { b.onclick = function () { v ^= 1 << +b.getAttribute('data-i'); draw(); }; });
      }
      draw();
    },
    sort: function (w) {
      var a, steps, k, t;
      function gen() {
        a = []; for (var i = 0; i < 24; i++) a.push(10 + Math.floor(Math.random() * 90));
        steps = []; var c = a.slice();
        for (var x = 0; x < c.length; x++) for (var y = 0; y < c.length - 1 - x; y++) { steps.push({ arr: c.slice(), i: y, d: c.length - x }); if (c[y] > c[y + 1]) { var q = c[y]; c[y] = c[y + 1]; c[y + 1] = q; } }
        steps.push({ arr: c.slice(), i: -1, d: 0 }); k = 0;
      }
      function draw() {
        var s = steps[k];
        w.querySelector('.bars').innerHTML = s.arr.map(function (v, n) { return '<i class="' + (n === s.i || n === s.i + 1 ? 'a' : (n >= s.d ? 'd' : '')) + '" style="height:' + v + '%"></i>'; }).join('');
        w.querySelector('.readout').textContent = 'Comparación ' + (k + 1) + ' de ' + steps.length;
      }
      w.innerHTML = '<div class="bars" aria-hidden="true"></div><div class="row"><button class="btn alt" data-a="s">Un paso</button><button class="btn alt" data-a="p">Reproducir</button><button class="btn alt" data-a="n">Nuevos datos</button></div><div class="readout"></div>';
      gen(); draw();
      w.querySelector('[data-a=s]').onclick = function () { if (k < steps.length - 1) { k++; draw(); } };
      w.querySelector('[data-a=n]').onclick = function () { clearInterval(t); t = null; gen(); draw(); };
      w.querySelector('[data-a=p]').onclick = function () {
        if (t) { clearInterval(t); t = null; return; }
        t = setInterval(function () { if (k >= steps.length - 1 || !w.isConnected) { clearInterval(t); t = null; return; } k++; draw(); }, 60);
      };
    }
  };

  /* Un ejercicio. ctx.onDone(bien) avisa el resultado. */
  function renderExercise(ex, box, ctx) {
    ctx = ctx || {};
    var isCode = ex.type === 'code';
    var html = '<div class="card"><p class="prompt">' + inline(ex.prompt) + '</p>';
    if (ex.code) html += '<pre><code>' + esc(ex.code) + '</code></pre>';
    html += '<div class="body"></div><div class="row" style="margin-top:4px"><button class="btn check">' + (isCode ? 'Ejecutar pruebas' : 'Comprobar') + '</button>' +
      (ex.hint ? '<button class="btn alt showhint">Ver pista</button>' : '') + (isCode ? '<button class="btn alt showsol">Ver solución</button>' : '') + '</div><div class="res"></div></div>';
    box.innerHTML = html;
    var body = box.querySelector('.body'), res = box.querySelector('.res'), check = box.querySelector('.check'), value = null, locked = false;

    function feedback(good, msg) {
      record(ex, good);
      res.innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '"><b>' + (good ? 'Correcto.' : 'Todavía no.') + '</b>' + msg + '</div>';
      if (ctx.onDone) ctx.onDone(good);
    }

    if (ex.type === 'mcq' || ex.type === 'tf') {
      body.innerHTML = '<div class="opts" role="group" aria-label="Opciones">' + ex.options.map(function (o, i) { return '<button class="opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + inline(o) + '</span></button>'; }).join('') + '</div>';
      var opts = body.querySelectorAll('.opt');
      opts.forEach(function (b) { b.onclick = function () { if (locked) return; opts.forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); value = +b.getAttribute('data-i'); }; });
      check.onclick = function () {
        if (value === null) { res.innerHTML = '<div class="fb no">Elige una opción para comprobar.</div>'; return; }
        locked = true; check.disabled = true;
        opts.forEach(function (x, i) { x.disabled = true; if (i === ex.answer) x.classList.add('right'); else if (i === value) x.classList.add('wrong'); });
        feedback(value === ex.answer, inline(ex.explain || ''));
      };
    } else if (ex.type === 'input') {
      body.innerHTML = '<input class="answer" aria-label="Tu respuesta" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe tu respuesta">';
      var inp = body.querySelector('input');
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.stopPropagation(); check.click(); } });
      check.onclick = function () {
        if (!inp.value.trim()) { res.innerHTML = '<div class="fb no">Escribe una respuesta para comprobar.</div>'; return; }
        var good = SDC.checkInput(ex, inp.value);
        feedback(good, (good ? '' : 'Respuesta esperada: <code>' + esc(ex.answers[0]) + '</code>\n') + inline(ex.explain || ''));
        if (good) check.disabled = true;
      };
      setTimeout(function () { if (ctx.focus) inp.focus(); });
    } else if (ex.type === 'order') {
      var r = SDC.rng(ex.id), cur = r.shuffle(ex.steps);
      if (cur.join() === ex.steps.join()) cur.reverse();
      var drawO = function () {
        body.innerHTML = '<ol class="orderl">' + cur.map(function (s, i) { return '<li><span>' + inline(s) + '</span><button data-m="-1" data-i="' + i + '" aria-label="Subir" ' + (i === 0 ? 'disabled' : '') + '>↑</button><button data-m="1" data-i="' + i + '" aria-label="Bajar" ' + (i === cur.length - 1 ? 'disabled' : '') + '>↓</button></li>'; }).join('') + '</ol>';
        body.querySelectorAll('button').forEach(function (b) { b.onclick = function () { if (locked) return; var i = +b.getAttribute('data-i'), j = i + (+b.getAttribute('data-m')), t = cur[i]; cur[i] = cur[j]; cur[j] = t; drawO(); }; });
      };
      drawO();
      check.onclick = function () {
        var good = cur.join('|') === ex.steps.join('|');
        feedback(good, (good ? '' : 'El orden correcto es:\n' + ex.steps.map(function (s, i) { return (i + 1) + '. ' + inline(s); }).join('\n') + '\n') + inline(ex.explain || ''));
        if (good) { locked = true; check.disabled = true; }
      };
    } else if (isCode) {
      var start = S.drafts[ex.id] || ('function ' + ex.fn + '(' + ex.params.join(', ') + ') {\n  // Escribe tu solución aquí\n  \n}\n');
      body.innerHTML = '<textarea class="editor" spellcheck="false" aria-label="Editor de código"></textarea>';
      var ta = body.querySelector('textarea'); ta.value = start; tabInEditor(ta);
      ta.addEventListener('input', function () { S.drafts[ex.id] = ta.value; save(); });
      check.onclick = function () {
        check.disabled = true;
        runInWorker({ mode: 'tests', src: ta.value, fn: ex.fn, tests: ex.tests }, function (r) {
          check.disabled = false;
          if (r.error) { res.innerHTML = '<div class="fb no"><b>El código no llegó a pasar las pruebas.</b>' + esc(r.error) + '</div>'; return; }
          var passed = r.results.filter(function (t) { return t.ok; }).length, good = passed === r.results.length;
          var list = '<div class="tests">' + r.results.map(function (t) {
            return '<div class="' + (t.ok ? 'p' : 'f') + '">' + (t.ok ? 'Bien ' : 'Falla ') + esc(ex.fn + '(' + JSON.stringify(t.args).slice(1, -1) + ')') + ' → ' + esc(t.error ? 'error: ' + t.error : JSON.stringify(t.got)) + (t.ok ? '' : ', se esperaba ' + esc(JSON.stringify(t.expected))) + '</div>';
          }).join('') + '</div>';
          feedback(good, passed + ' de ' + r.results.length + ' pruebas pasan.' + list + (good ? '<p style="margin:8px 0 0">' + inline(ex.explain || '') + '</p>' : ''));
        });
      };
      box.querySelector('.showsol').onclick = function () {
        var d = document.createElement('div'); d.className = 'hint'; d.innerHTML = '<b>Una solución posible</b><pre style="margin:8px 0 0"><code>' + esc('function ' + ex.fn + '(' + ex.params.join(', ') + ') {\n' + ex.sol + '\n}') + '</code></pre>';
        res.appendChild(d); this.disabled = true;
      };
    }
    var hb = box.querySelector('.showhint');
    if (hb) hb.onclick = function () { var d = document.createElement('div'); d.className = 'hint'; d.textContent = ex.hint; res.prepend(d); hb.disabled = true; };
    box._keys = function (e) {
      if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      if (e.key === 'Enter' && !check.disabled && document.activeElement === document.body) { check.click(); }
      var n = +e.key; if (n >= 1 && body.querySelectorAll('.opt')[n - 1]) body.querySelectorAll('.opt')[n - 1].click();
    };
  }

  var keyHandler = null;
  document.addEventListener('keydown', function (e) { if (keyHandler) keyHandler(e); });

  /* Vistas */
  function renderSide(route) {
    var modHtml = SDC.modules.map(function (m, mi) {
      var p = modProgress(m), open = route.sub ? SDC.subs[route.sub] && SDC.subs[route.sub].mod === m.id : route.mod === m.id;
      return '<details class="trace-mod' + (p.pct === 100 ? ' full' : '') + '"' + (open ? ' open' : '') + '><summary><span class="pad ' + (p.pct ? 'on' : '') + '" style="--p:' + p.pct + '"></span><span>' + (mi + 1) + '. ' + esc(m.title) + '</span></summary><ul>' +
        m.subs.map(function (s) { var sp = subProgress(s); return '<li data-s="' + esc((SDC.subs[s].title + ' ' + (SDC.subs[s].terms || []).map(function (t) { return t[0]; }).join(' ')).toLowerCase()) + '"><a href="#/t/' + s + '" class="' + (route.sub === s ? 'on' : '') + '"><span>' + esc(SDC.subs[s].title) + '</span>' + (sp.ok ? '<small>' + sp.pct + '%</small>' : '') + '</a></li>'; }).join('') + '</ul></details>';
    }).join('');
    side.innerHTML = '<a class="side-brand" href="#/">Software<br>Desde Cero</a><nav class="side-links"><a href="#/repaso">Repaso</a><a href="#/mapa">Conexiones</a><a href="#/fuentes">Fuentes</a><a href="#/ajustes">Progreso</a><a href="#" id="themeside" role="button">Tema</a></nav><input id="q" type="search" placeholder="Buscar un tema" aria-label="Buscar un tema">' + modHtml;
    side.querySelector('#themeside').onclick = function (e) { e.preventDefault(); toggleTheme(); };
    side.querySelector('#q').oninput = function () {
      var v = this.value.toLowerCase().trim();
      side.querySelectorAll('.trace-mod').forEach(function (d) {
        var any = false;
        d.querySelectorAll('li').forEach(function (li) { var m = !v || li.getAttribute('data-s').indexOf(v) >= 0; li.style.display = m ? '' : 'none'; if (m) any = true; });
        d.style.display = any ? '' : 'none'; if (v) d.open = any;
      });
    };
  }

  function drawRoute(el) {
    var W = el.clientWidth, cols = W >= 980 ? 4 : W >= 620 ? 3 : 2, rowH = W >= 620 ? 104 : 118, cw = W / cols;
    var pts = SDC.modules.map(function (m, i) { var r = Math.floor(i / cols), c = i % cols; if (r % 2) c = cols - 1 - c; return { x: c * cw + 12, y: r * rowH + 14, m: m, i: i }; });
    var d = '', lit = '', lastLit = -1;
    pts.forEach(function (p, i) { if (modProgress(p.m).pct > 0) lastLit = i; });
    pts.forEach(function (p, i) {
      if (!i) { d = 'M' + p.x + ' ' + p.y; lit = d; return; }
      var q = pts[i - 1], seg;
      if (p.y === q.y) seg = 'L' + p.x + ' ' + p.y;
      else { var my = q.y + 26; seg = 'L' + q.x + ' ' + (my) + ' L' + p.x + ' ' + (p.y - 16) + ' L' + p.x + ' ' + p.y; }
      d += ' ' + seg; if (i <= lastLit) lit += ' ' + seg;
    });
    var rows = Math.ceil(pts.length / cols);
    el.style.height = rows * rowH + 'px';
    el.innerHTML = '<svg aria-hidden="true"><path d="' + d + '"/>' + (lastLit > 0 ? '<path class="lit" d="' + lit + '"/>' : '') + '</svg>' + pts.map(function (p) {
      var mp = modProgress(p.m);
      return '<a class="node" href="#/m/' + p.m.id + '" style="left:' + (p.x - 12) + 'px;top:' + p.y + 'px;width:' + (cw - 14) + 'px"><span class="pad ' + (mp.pct ? 'on' : '') + '" style="--p:' + mp.pct + ';background-color:var(--board)"></span><span><b>' + (p.i + 1) + '. ' + esc(p.m.title) + '</b><small>' + p.m.subs.length + ' temas' + (mp.pct ? ', ' + mp.pct + '%' : '') + '</small></span></a>';
    }).join('');
  }

  function viewHome() {
    var p = allProgress(), subs = SDC.order.length, last = S.last && SDC.subs[S.last] ? S.last : SDC.order[0];
    main.innerHTML = '<div class="wide"><section class="hero"><h1>Del primer bit a un sistema en producción</h1><p>Toda la carrera de ingeniería de software en un solo camino. Cada tema explica la idea en simple, la prueba con código que puedes ejecutar y termina en ejercicios que suben de dificultad.</p><div class="row"><a class="btn" href="#/t/' + last + '">' + (p.ok ? 'Continuar: ' + esc(SDC.subs[last].title) : 'Empezar por el primer tema') + '</a><a class="btn alt" href="#/repaso">Repasar lo aprendido</a></div><div class="route" id="route"></div></section>' +
      '<div class="stats"><div><b>' + SDC.modules.length + '</b>módulos</div><div><b>' + subs + '</b>temas</div><div><b>' + p.total.toLocaleString('es-PE') + '</b>ejercicios</div><div><b>' + p.ok.toLocaleString('es-PE') + '</b>resueltos por ti (' + p.pct + '%)</div></div>' +
      '<div class="how"><div><h3>Entiende con una imagen</h3><p>Cada lección parte de una analogía de la vida diaria y luego entra al detalle que de verdad se evalúa en el trabajo.</p></div><div><h3>Practica en cuatro niveles</h3><p>Básico, intermedio, avanzado y reto. Los ejercicios de código se ejecutan aquí mismo, con pruebas automáticas.</p></div><div><h3>Conecta lo que ya sabes</h3><p>Cada tema muestra de dónde viene y a dónde te lleva. El repaso mezcla temas para que no se te olviden.</p></div><div><h3>Construye un mismo sistema</h3><p>PatioApp, un sistema para gestionar vehículos en un patio, crece contigo en cada módulo hasta quedar como proyecto final.</p></div></div></div>';
    var r = document.getElementById('route'); drawRoute(r);
    window.onresize = function () { if (document.getElementById('route')) drawRoute(document.getElementById('route')); };
  }

  function viewModule(mid) {
    var m = SDC.modules.filter(function (x) { return x.id === mid; })[0]; if (!m) return viewHome();
    var idx = SDC.modules.indexOf(m), p = modProgress(m), next = SDC.modules[idx + 1];
    main.innerHTML = '<div class="wrap"><div class="crumbs"><a href="#/">Inicio</a> / Módulo ' + (idx + 1) + '</div><h1 class="t">' + esc(m.title) + '</h1><p class="lead">' + inline(m.desc) + '</p><div class="meter" aria-label="Avance ' + p.pct + '%"><i style="width:' + p.pct + '%"></i></div>' +
      '<ul class="subl">' + m.subs.map(function (s) { var sp = subProgress(s); return '<li><a href="#/t/' + s + '"><b>' + esc(SDC.subs[s].title) + '</b><small>' + sp.ok + ' de ' + sp.total + ' ejercicios</small></a></li>'; }).join('') + '</ul>' +
      '<div class="thread"><b>En PatioApp</b><br>' + inline(m.thread) + '</div>' +
      '<p class="books"><b>Libros base:</b> ' + inline(m.books) + '</p><p class="books"><b>Equivale en la universidad a:</b> ' + inline(m.uni) + '</p>' +
      (next ? '<p><a class="btn alt" href="#/m/' + next.id + '">Siguiente módulo: ' + esc(next.title) + '</a></p>' : '') + '</div>';
  }

  function incoming(sid) { return SDC.order.filter(function (o) { return (SDC.subs[o].links || []).some(function (l) { return l[0] === sid; }); }); }
  function subHeader(sub, tab) {
    var m = SDC.modules.filter(function (x) { return x.id === sub.mod; })[0], p = subProgress(sub.id);
    return '<div class="crumbs"><a href="#/">Inicio</a> / <a href="#/m/' + m.id + '">' + esc(m.title) + '</a></div><h1 class="t">' + esc(sub.title) + '</h1>' +
      '<nav class="tabs"><a href="#/t/' + sub.id + '" class="' + (tab === 'l' ? 'on' : '') + '">Lección</a><a href="#/t/' + sub.id + '/ej" class="' + (tab === 'e' ? 'on' : '') + '">Ejercicios (' + p.ok + ' de ' + p.total + ')</a></nav>';
  }
  function viewLesson(sid) {
    var sub = SDC.subs[sid]; if (!sub) return viewHome();
    S.last = sid; S.read[sid] = 1; save();
    var i = SDC.order.indexOf(sid), nx = SDC.order[i + 1], inc = incoming(sid);
    var links = '';
    if ((sub.links && sub.links.length) || inc.length) {
      links = '<section class="links"><h2>Cómo se conecta</h2><ul>' +
        inc.map(function (o) { var l = SDC.subs[o].links.filter(function (x) { return x[0] === sid; })[0]; return '<li><a href="#/t/' + o + '">' + esc(SDC.subs[o].title) + '</a>: ' + inline(l[1]) + '</li>'; }).join('') +
        (sub.links || []).map(function (l) { return SDC.subs[l[0]] ? '<li><a href="#/t/' + l[0] + '">' + esc(SDC.subs[l[0]].title) + '</a>: ' + inline(l[1]) + '</li>' : ''; }).join('') + '</ul></section>';
    }
    main.innerHTML = '<div class="wrap">' + subHeader(sub, 'l') + '<article class="prose">' + md(sub.lesson) + '</article>' + links +
      (sub.read ? '<p class="books"><b>Para profundizar:</b> ' + inline(sub.read) + '</p>' : '') +
      '<div class="row" style="margin-top:24px"><a class="btn" href="#/t/' + sid + '/ej">Practicar este tema</a>' + (nx ? '<a class="btn alt" href="#/t/' + nx + '">Siguiente tema: ' + esc(SDC.subs[nx].title) + '</a>' : '') + '</div></div>';
    mountEnhancements(main);
  }

  var exState = {};
  function viewPractice(sid) {
    var sub = SDC.subs[sid]; if (!sub) return viewHome();
    S.last = sid; save();
    var st = exState[sid] || (exState[sid] = { level: 0, i: null });
    function pool() { var all = SDC.exercises(sid); return st.level ? all.filter(function (e) { return e.level === st.level; }) : all; }
    if (st.i === null) { var firstOpen = pool().findIndex(function (e) { return !(S.ex[e.id] && S.ex[e.id].ok); }); st.i = firstOpen < 0 ? 0 : firstOpen; }
    function paint(focus) {
      var list = pool(); if (st.i >= list.length) st.i = 0;
      var ex = list[st.i];
      main.innerHTML = '<div class="wrap">' + subHeader(sub, 'e') +
        '<div class="filters" role="group" aria-label="Filtrar por nivel">' + [0, 1, 2, 3, 4].map(function (l) { var n = l ? SDC.exercises(sid).filter(function (e) { return e.level === l; }).length : SDC.exercises(sid).length; return '<button data-l="' + l + '" class="' + (st.level === l ? 'on' : '') + '">' + (l ? SDC.LEVELS[l] : 'Todos') + ' (' + n + ')</button>'; }).join('') + '</div>' +
        '<div class="exhead"><span>Ejercicio ' + (st.i + 1) + ' de ' + list.length + '</span><span class="lvl l' + ex.level + '">Nivel ' + SDC.LEVELS[ex.level] + '</span></div><div id="ex"></div>' +
        '<div class="nav"><button class="btn alt" id="prev" ' + (st.i === 0 ? 'disabled' : '') + '>Anterior</button><a class="btn alt" href="#/t/' + sid + '">Volver a la lección</a><button class="btn" id="next" ' + (st.i === list.length - 1 ? 'disabled' : '') + '>Siguiente</button></div>' +
        '<details class="grid"><summary>Ver todos los ejercicios</summary><div class="dots">' + list.map(function (e, i) { var r = S.ex[e.id]; return '<button data-i="' + i + '" aria-label="Ejercicio ' + (i + 1) + '" class="' + (r && r.ok ? 'ok' : r && r.miss ? 'no' : '') + (i === st.i ? ' cur' : '') + '">' + (i + 1) + '</button>'; }).join('') + '</div></details></div>';
      var box = document.getElementById('ex');
      renderExercise(ex, box, { focus: focus, onDone: function () { renderSide({ sub: sid }); var tab = main.querySelector('.tabs a:last-child'); var pr = subProgress(sid); tab.textContent = 'Ejercicios (' + pr.ok + ' de ' + pr.total + ')'; } });
      keyHandler = function (e) { if (box._keys) box._keys(e); };
      main.querySelectorAll('.filters button').forEach(function (b) { b.onclick = function () { st.level = +b.getAttribute('data-l'); st.i = 0; paint(); }; });
      document.getElementById('prev').onclick = function () { st.i--; paint(true); window.scrollTo(0, 0); };
      document.getElementById('next').onclick = function () { st.i++; paint(true); window.scrollTo(0, 0); };
      main.querySelectorAll('.dots button').forEach(function (b) { b.onclick = function () { st.i = +b.getAttribute('data-i'); paint(true); window.scrollTo(0, 0); }; });
    }
    paint();
  }

  function buildReview() {
    var t = today(), due = [];
    Object.keys(S.ex).forEach(function (id) { var r = S.ex[id]; if ((r.miss || (r.due !== undefined && r.due <= t))) due.push(id); });
    var R = SDC.rng('rev' + t), picked = R.shuffle(due).slice(0, 15).map(SDC.findExercise).filter(Boolean);
    var fuente = picked.length;
    if (picked.length < 15) {
      var started = Object.keys(S.read).filter(function (s) { return SDC.subs[s]; });
      if (!started.length) started = SDC.order.slice(0, 3);
      var fill = []; started.forEach(function (s) { R.sample(SDC.exercises(s), 4).forEach(function (e) { if (!S.ex[e.id] || !S.ex[e.id].ok) fill.push(e); }); });
      R.shuffle(fill).forEach(function (e) { if (picked.length < 15 && picked.indexOf(e) < 0) picked.push(e); });
    }
    return { list: R.shuffle(picked), due: fuente };
  }
  function viewReview() {
    var pack = buildReview(), i = 0, good = 0;
    function paint() {
      if (i >= pack.list.length) {
        main.innerHTML = '<div class="wrap"><h1 class="t">Repaso terminado</h1><p class="lead">Acertaste ' + good + ' de ' + pack.list.length + '. Lo que fallaste volverá mañana; lo que acertaste volverá cada vez más espaciado.</p><div class="row"><a class="btn" href="#/repaso" id="again">Hacer otra ronda</a><a class="btn alt" href="#/">Ir al inicio</a></div></div>';
        document.getElementById('again').onclick = function (e) { e.preventDefault(); viewReview(); };
        return;
      }
      var ex = pack.list[i], sub = SDC.subs[ex.sub];
      main.innerHTML = '<div class="wrap"><h1 class="t">Repaso mezclado</h1><p class="lead">' + (pack.due ? pack.due + ' ejercicios te tocaban hoy. ' : 'Hoy no tienes pendientes, así que practicas temas que ya abriste. ') + 'Mezclar temas cuesta más, y por eso se recuerda mejor.</p><div class="exhead"><span>' + (i + 1) + ' de ' + pack.list.length + '. Tema: <a href="#/t/' + sub.id + '">' + esc(sub.title) + '</a></span><span class="lvl l' + ex.level + '">Nivel ' + SDC.LEVELS[ex.level] + '</span></div><div id="ex"></div><div class="nav"><span></span><button class="btn" id="next">Siguiente</button></div></div>';
      var box = document.getElementById('ex'), counted = false;
      renderExercise(ex, box, { onDone: function (ok) { if (!counted && ok) good++; counted = true; renderSide({}); } });
      keyHandler = function (e) { if (box._keys) box._keys(e); };
      document.getElementById('next').onclick = function () { i++; paint(); window.scrollTo(0, 0); };
    }
    paint();
  }

  function viewMap() {
    main.innerHTML = '<div class="wide"><h1 class="t">Conexiones entre temas</h1><p class="lead">Toca un tema para ver qué necesita y qué desbloquea. Esas conexiones son las que hacen que lo aprendido se quede.</p><div id="mapinfo">Elige un tema de la lista.</div><div class="mapc">' + SDC.modules.map(function (m) {
      return '<div><h3>' + esc(m.title) + '</h3>' + m.subs.map(function (s) { return '<button class="chip" data-s="' + s + '">' + esc(SDC.subs[s].title) + '</button>'; }).join('') + '</div>';
    }).join('') + '</div></div>';
    var chips = main.querySelectorAll('.chip'), info = document.getElementById('mapinfo');
    chips.forEach(function (c) {
      c.onclick = function () {
        var s = c.getAttribute('data-s'), out = (SDC.subs[s].links || []).filter(function (l) { return SDC.subs[l[0]]; }), inc = incoming(s);
        chips.forEach(function (x) { var y = x.getAttribute('data-s'); x.className = 'chip ' + (y === s ? 'sel' : inc.indexOf(y) >= 0 ? 'from' : out.some(function (l) { return l[0] === y; }) ? 'to' : 'dim'); });
        info.innerHTML = '<b>' + esc(SDC.subs[s].title) + '</b> <a href="#/t/' + s + '">Abrir el tema</a><ul>' + inc.map(function (o) { return '<li><b>Viene de ' + esc(SDC.subs[o].title) + ':</b> ' + inline(SDC.subs[o].links.filter(function (l) { return l[0] === s; })[0][1]) + '</li>'; }).join('') + out.map(function (l) { return '<li><b>Lleva a ' + esc(SDC.subs[l[0]].title) + ':</b> ' + inline(l[1]) + '</li>'; }).join('') + '</ul>';
      };
    });
  }

  function viewSources() {
    var r = SDC.refs;
    main.innerHTML = '<div class="wrap"><h1 class="t">Fuentes del curso</h1><p class="lead">' + inline(r.intro) + '</p><article class="prose">' + md(r.body) + '</article></div>';
  }

  function viewSettings() {
    var p = allProgress();
    main.innerHTML = '<div class="wrap"><h1 class="t">Tu progreso</h1><p class="lead">Llevas ' + p.ok + ' de ' + p.total + ' ejercicios. Se guarda solo en este navegador; para pasarlo a otro dispositivo, descárgalo y cárgalo allá.</p><div class="row"><button class="btn" id="exp">Descargar progreso</button><label class="btn alt">Cargar progreso<input id="imp" type="file" accept="application/json" hidden></label><button class="btn alt" id="rst">Borrar todo mi progreso</button></div><p id="msg" role="status"></p></div>';
    document.getElementById('exp').onclick = function () {
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' })); a.download = 'progreso-software-desde-cero.json'; a.click();
    };
    document.getElementById('imp').onchange = function () {
      var f = this.files[0], rd = new FileReader();
      rd.onload = function () { try { var d = JSON.parse(rd.result); if (!d.ex) throw 0; S = d; S.drafts = S.drafts || {}; S.read = S.read || {}; save(); route(); document.getElementById('msg').textContent = 'Progreso cargado.'; } catch (e) { document.getElementById('msg').textContent = 'Ese archivo no es un progreso válido. Usa el que descargaste desde esta página.'; } };
      rd.readAsText(f);
    };
    var rs = document.getElementById('rst'), armed = false;
    rs.onclick = function () { if (!armed) { armed = true; rs.textContent = 'Toca otra vez para confirmar el borrado'; return; } S = { ex: {}, read: {}, last: null, drafts: {} }; save(); route(); };
  }

  function route() {
    keyHandler = null; window.onresize = null;
    var parts = (location.hash || '#/').slice(2).split('/'), r = {};
    if (parts[0] === 't') r.sub = parts[1]; if (parts[0] === 'm') r.mod = parts[1];
    renderSide(r);
    side.classList.remove('open'); document.getElementById('scrim').classList.remove('open');
    if (parts[0] === 't') { if (parts[2] === 'ej') viewPractice(parts[1]); else viewLesson(parts[1]); }
    else if (parts[0] === 'm') viewModule(parts[1]);
    else if (parts[0] === 'repaso') viewReview();
    else if (parts[0] === 'mapa') viewMap();
    else if (parts[0] === 'fuentes') viewSources();
    else if (parts[0] === 'ajustes') viewSettings();
    else viewHome();
    window.scrollTo(0, 0);
  }

  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    var nx = cur === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', nx);
    try { localStorage.setItem(KEY + '.theme', nx); } catch (e) {}
  }
  try { var th = localStorage.getItem(KEY + '.theme'); if (th) document.documentElement.setAttribute('data-theme', th); } catch (e) {}
  document.getElementById('theme').onclick = toggleTheme;
  document.getElementById('menu').onclick = function () { side.classList.add('open'); document.getElementById('scrim').classList.add('open'); };
  document.getElementById('scrim').onclick = function () { side.classList.remove('open'); this.classList.remove('open'); };
  window.addEventListener('hashchange', route);
  route();
})();
