/* Comprueba el contenido antes de publicar: node tools/verificar.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.endsWith('app.js'));
const ctx = vm.createContext({ console, Math, JSON, Function, Array, Object, Number, String, Set, Map });
ctx.globalThis = ctx;
for (const s of scripts) { const f = path.join(root, s); if (!fs.existsSync(f)) { console.log('Falta', s); continue; } vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: s }); }
const SDC = ctx.SDC;
let errors = [], total = 0, min = 1e9, codeN = 0, summary = [];
for (const id of SDC.order) {
  const sub = SDC.subs[id], ex = SDC.exercises(id);
  total += ex.length; min = Math.min(min, ex.length);
  const lv = [0, 0, 0, 0, 0]; ex.forEach(e => lv[e.level]++);
  summary.push(`${id.padEnd(22)} ${String(ex.length).padStart(4)}  [${lv.slice(1).join('/')}]`);
  if (ex.length < 50) errors.push(`${id}: solo ${ex.length} ejercicios`);
  for (let l = 1; l <= 4; l++) if (!lv[l]) errors.push(`${id}: sin nivel ${l}`);
  if (!sub.lesson || sub.lesson.length < 400) errors.push(`${id}: lección corta`);
  (sub.links || []).forEach(l => { if (!SDC.subs[l[0]]) errors.push(`${id}: enlace roto ${l[0]}`); });
  let prev = 0;
  ex.forEach(e => {
    const txt = JSON.stringify(e);
    if (/\[object/.test(e.prompt + (e.options || []).join()) || (e.answers || []).some(x => x === 'NaN')) errors.push(`${id}: valor roto en "${e.prompt.slice(0, 60)}"`);
    if (e.level < prev) errors.push(`${id}: niveles fuera de orden`); prev = e.level;
    if (e.type === 'mcq') {
      if (e.options.length < 3) errors.push(`${id}: pocas opciones en "${e.prompt.slice(0, 70)}"`);
      if (new Set(e.options).size !== e.options.length) errors.push(`${id}: opciones repetidas`);
      if (!(e.answer >= 0)) errors.push(`${id}: sin respuesta "${e.prompt.slice(0, 70)}"`);
      if (!e.explain) errors.push(`${id}: sin explicación "${e.prompt.slice(0, 70)}"`);
    }
    if (e.type === 'input' && (!e.answers.length || e.answers[0] === '')) errors.push(`${id}: entrada vacía "${(e.code || e.prompt).slice(0, 70)}"`);
    if (e.type === 'code') {
      codeN++;
      try {
        const r = SDC.evalTests(`function ${e.fn}(${e.params.join(',')}){\n${e.sol}\n}`, e.fn, e.tests);
        r.forEach(t => { if (!t.ok) errors.push(`${id}/${e.fn}: solución falla ${JSON.stringify(t.args)} -> ${JSON.stringify(t.got)} (espera ${JSON.stringify(t.expected)}) ${t.error || ''}`); });
      } catch (err) { errors.push(`${id}/${e.fn}: ${err.message}`); }
    }
  });
}
if (process.argv.includes('-v')) console.log(summary.join('\n'));
console.log(`Módulos ${SDC.modules.length} | Temas ${SDC.order.length} | Ejercicios ${total} | Mínimo por tema ${min} | De código ${codeN}`);
if (errors.length) { console.log('ERRORES (' + errors.length + '):\n' + errors.slice(0, 80).join('\n')); process.exit(1); }
console.log('Todo correcto.');
