/* Comprueba el contenido antes de publicar: node tools/verificar.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.endsWith('app.js'));
const ctx = vm.createContext({ console, Math, JSON, Function, Array, Object, Number, String, Set, Map });
ctx.globalThis = ctx;
for (const s of scripts) { const f = path.join(root, s); if (!fs.existsSync(f)) { console.log('Falta', s); continue; } vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: s }); }
const SDC = ctx.SDC;
let errors = [], pend = [], total = 0, min = 1e9, codeN = 0, summary = [];
for (const id of SDC.order) {
  const sub = SDC.subs[id], ex = SDC.exercises(id);
  total += ex.length; min = Math.min(min, ex.length);
  const lv = [0, 0, 0, 0, 0]; ex.forEach(e => lv[e.level]++);
  const words = ((sub.lesson || '') + ' ' + (sub.deep || '')).split(/\s+/).length;
  summary.push(`${id.padEnd(22)} ${String(ex.length).padStart(4)}  [${lv.slice(1).join('/')}]  ${String(words).padStart(5)} palabras`);
  const minW = (SDC.modules.find(m => m.id === sub.mod) || {}).prof ? 1300 : 900;
  if (words < minW) pend.push(`${id}: teoría corta (${words} de ${minW} palabras)`);
  if (!sub.checks || sub.checks.length < 4) pend.push(`${id}: faltan preguntas de comprensión`);
  if (!sub.cites || sub.cites.length < 2) pend.push(`${id}: faltan fuentes citadas`);
  if (!sub.project || !sub.project.steps || !sub.project.deliver) pend.push(`${id}: falta proyecto del tema`);
  if (!sub.hito || sub.hito.length < 2) pend.push(`${id}: falta hito acumulativo`);
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
SDC.modules.forEach(m => { if (!m.capstone) pend.push(`${m.id}: falta proyecto integrador`); if (!m.uni) pend.push(`${m.id}: faltan equivalencias`); });
SDC.missing.forEach(x => errors.push(`ampliación apunta a un id inexistente: ${x}`));
/* Malla: cada curso en un ciclo, con código, créditos y logros; prerrequisitos en ciclos anteriores */
if (SDC.CICLOS) {
  const cic = {}; SDC.CICLOS.forEach(c => c.cursos.forEach(id => { if (cic[id]) errors.push(`malla: ${id} aparece dos veces`); cic[id] = c.n; }));
  Object.keys(cic).forEach(id => { if (!SDC.modules.find(m => m.id === id)) pend.push(`malla: el curso ${id} todavía no existe`); });
  SDC.modules.forEach(m => {
    if (!cic[m.id]) errors.push(`malla: ${m.id} no está en ningún ciclo`);
    if (!m.code || !m.cred || !m.logros || m.logros.length < 3) errors.push(`malla: ${m.id} sin código, créditos o logros`);
    (m.prereq || []).forEach(q => { if (!cic[q]) errors.push(`malla: prerrequisito inexistente ${q} en ${m.id}`); else if (cic[q] >= cic[m.id]) errors.push(`malla: ${m.id} (ciclo ${cic[m.id]}) pide ${q} del ciclo ${cic[q]}`); });
  });
}
if (process.argv.includes('-v')) console.log(summary.join('\n'));
if (pend.length) { console.log('PENDIENTES DE AMPLIACIÓN (' + pend.length + '):\n' + pend.slice(0, process.argv.includes('-p') ? 999 : 15).join('\n')); if (process.argv.includes('-e')) errors.push(pend.length + ' pendientes'); }
console.log(`Módulos ${SDC.modules.length} | Temas ${SDC.order.length} | Ejercicios ${total} | Mínimo por tema ${min} | De código ${codeN}`);
if (errors.length) { console.log('ERRORES (' + errors.length + '):\n' + errors.slice(0, 80).join('\n')); process.exit(1); }
console.log('Todo correcto.');
