/* Núcleo de contenido: registro de módulos/subtemas y generación de ejercicios.
   No toca el DOM, así también corre en Node para las pruebas (tools/verificar.js). */
(function (root) {
  'use strict';
  var SDC = { modules: [], subs: {}, order: [], LEVELS: ['', 'Básico', 'Intermedio', 'Avanzado', 'Reto'] };

  SDC.M = function (id, spec) { spec.id = id; spec.subs = []; SDC.modules.push(spec); };
  SDC.S = function (modId, id, spec) {
    spec.id = id; spec.mod = modId;
    SDC.subs[id] = spec; SDC.order.push(id);
    SDC.modules.filter(function (m) { return m.id === modId; })[0].subs.push(id);
  };

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
  function rng(seedText) {
    var a = parseInt(hash(seedText), 36) || 1;
    function next() { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
    var R = {
      next: next,
      int: function (lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); },
      pick: function (arr) { return arr[Math.floor(next() * arr.length)]; },
      shuffle: function (arr) { var c = arr.slice(); for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(next() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; } return c; },
      sample: function (arr, n) { return R.shuffle(arr).slice(0, n); }
    };
    return R;
  }
  SDC.rng = rng; SDC.hash = hash;

  /* Ejecuta un fragmento y devuelve lo impreso; lo usan los ejercicios de «qué imprime». */
  function runTrace(code) {
    var out = [];
    var fake = { log: function () { out.push([].map.call(arguments, fmt).join(' ')); } };
    new Function('console', code)(fake);
    return out.join(' ');
  }
  function fmt(v) { return typeof v === 'string' ? v : (typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)); }
  SDC.runTrace = runTrace;

  function builder(sub) {
    var list = [], seen = {}, R = rng(sub.id);
    function push(ex) {
      var key = ex.prompt + '|' + (ex.code || '');
      if (seen[key]) return false;
      seen[key] = 1;
      ex.id = sub.id + '#' + hash(key);
      ex.sub = sub.id;
      list.push(ex);
      return true;
    }
    var g = {
      R: R,
      mcq: function (level, prompt, correct, wrong, explain, code) {
        correct = String(correct);
        var opts = [];
        wrong.map(String).forEach(function (w) { if (w !== correct && opts.indexOf(w) < 0) opts.push(w); });
        var mix = rng(prompt + correct).shuffle([correct].concat(opts));
        return push({ type: 'mcq', level: level, prompt: prompt, options: mix, answer: mix.indexOf(correct), explain: explain, code: code });
      },
      tf: function (level, prompt, value, explain, code) {
        return push({ type: 'tf', level: level, prompt: prompt, options: ['Verdadero', 'Falso'], answer: value ? 0 : 1, explain: explain, code: code });
      },
      input: function (level, prompt, answers, explain, code, hint) {
        return push({ type: 'input', level: level, prompt: prompt, answers: [].concat(answers).map(String), explain: explain, code: code, hint: hint });
      },
      trace: function (level, code, why) {
        return push({ type: 'input', level: level, prompt: '¿Qué muestra la consola? Si imprime varias veces, separa los valores con un espacio.', answers: [runTrace(code)], explain: why || 'Ejecuta el código paso a paso en tu cabeza y anota cada valor.', code: code });
      },
      order: function (level, prompt, steps, explain) {
        return push({ type: 'order', level: level, prompt: prompt, steps: steps, explain: explain });
      },
      code: function (level, spec) {
        return push({ type: 'code', level: level, prompt: spec.prompt, fn: spec.fn, params: spec.params, tests: spec.tests, sol: spec.sol, hint: spec.hint, explain: spec.explain || 'Compara tu solución con la propuesta: hay más de una forma válida.' });
      },
      /* Repite un generador hasta conseguir n ejercicios distintos. */
      times: function (n, fn) { var made = 0, tries = 0; while (made < n && tries < n * 40) { tries++; var before = list.length; fn(R); if (list.length > before) made += list.length - before; } }
    };

    var terms = sub.terms || [], ask = sub.ask || '¿Qué concepto describe mejor esta situación?';
    terms.forEach(function (t, i) {
      var others = terms.filter(function (_, j) { return j !== i; });
      var dist = R.sample(others, 3);
      g.mcq(1, '¿Qué término corresponde a esta definición?\n' + t[1], t[0], dist.map(function (o) { return o[0]; }), '«' + t[0] + '»: ' + t[1] + '.');
      g.mcq(1, '¿Qué significa «' + t[0] + '»?', t[1], R.sample(others, 3).map(function (o) { return o[1]; }), '«' + t[0] + '»: ' + t[1] + '.');
      var falso = R.pick(others);
      g.tf(2, '«' + t[0] + '» se define así: ' + t[1] + '.', true, 'Correcto: esa es su definición.');
      g.tf(2, '«' + t[0] + '» se define así: ' + falso[1] + '.', false, 'Esa definición es de «' + falso[0] + '». «' + t[0] + '» es: ' + t[1] + '.');
      (t[2] || []).forEach(function (sc, k) {
        g.mcq(k === 0 ? 2 : 3, ask + '\n' + sc, t[0], R.sample(others, 3).map(function (o) { return o[0]; }), 'Se trata de «' + t[0] + '»: ' + t[1] + '.');
      });
    });
    /* Retos de conexión: mezclan casos y términos de este tema con los temas enlazados. */
    (sub.links || []).forEach(function (l) {
      var other = SDC.subs[l[0]];
      if (!other || !other.terms || !terms.length) return;
      var pair = [[terms, other.terms, sub], [other.terms, terms, other]];
      pair.forEach(function (p) {
        R.sample(p[0], 2).forEach(function (t) {
          var sc = (t[2] || [])[2]; if (!sc) return;
          var d = R.sample(p[1], 2).map(function (o) { return o[0]; }).concat(R.sample(p[0].filter(function (o) { return o !== t; }), 1).map(function (o) { return o[0]; }));
          g.mcq(4, 'Reto de conexión con «' + other.title + '». ¿Qué concepto explica este caso?\n' + sc, t[0], d, 'Es «' + t[0] + '» (tema ' + p[2].title + '): ' + t[1] + '.');
        });
      });
    });
    (sub.q || []).forEach(function (q) {
      if (Array.isArray(q)) { g.mcq(q[4] || 3, q[0], q[1], q[2], q[3], q[5]); return; }
      if (q.o) g.order(q.l || 3, q.o, q.s, q.e);
      else if (q.tf !== undefined) g.tf(q.l || 2, q.tf, q.v, q.e, q.code);
      else if (q.i) g.input(q.l || 2, q.i, q.a, q.e, q.code);
      else if (q.c) g.code(q.l || 3, { prompt: q.c, fn: q.f, params: q.p, tests: q.t, sol: q.sol, hint: q.h, explain: q.e });
    });
    if (sub.gen) sub.gen(g);

    /* Orden creciente de dificultad; dentro del nivel, mezcla estable para intercalar tipos. */
    var mix = rng(sub.id + ':mix').shuffle(list);
    return mix.map(function (e, i) { return [e, i]; }).sort(function (a, b) { return a[0].level - b[0].level || a[1] - b[1]; }).map(function (p) { return p[0]; });
  }

  var cache = {};
  SDC.exercises = function (subId) { return cache[subId] || (cache[subId] = builder(SDC.subs[subId])); };
  SDC.findExercise = function (exId) {
    var sid = exId.split('#')[0];
    if (!SDC.subs[sid]) return null;
    return SDC.exercises(sid).filter(function (e) { return e.id === exId; })[0] || null;
  };

  SDC.norm = function (s) { return String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.;]$/, '').replace(/,\s*/g, ','); };
  SDC.checkInput = function (ex, value) {
    var v = SDC.norm(value);
    return ex.answers.some(function (a) {
      var n = SDC.norm(a);
      if (n === v) return true;
      if (v === '' || n === '') return false;
      var x = Number(v.replace(',', '.')), y = Number(n);
      return !isNaN(x) && !isNaN(y) && Math.abs(x - y) < 1e-9;
    });
  };
  /* Valida el arreglo de pruebas de un ejercicio de código en un entorno controlado. */
  SDC.evalTests = function (src, fn, tests) {
    var f = new Function(src + '\n;return typeof ' + fn + "==='function'?" + fn + ':null;')();
    if (!f) throw new Error('No encontré una función llamada ' + fn);
    return tests.map(function (t) {
      var got, err = null;
      try { got = f.apply(null, JSON.parse(JSON.stringify(t[0]))); } catch (e) { err = e.message; }
      return { args: t[0], expected: t[1], got: got === undefined ? null : got, ok: !err && JSON.stringify(got) === JSON.stringify(t[1]), error: err };
    });
  };

  root.SDC = SDC;
})(typeof window !== 'undefined' ? window : globalThis);
