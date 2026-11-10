/* ============================================================
   CONTENIDO DEL CURSO
   cont: mini-marcado por bloques (separados por línea en blanco)
     "# "  subtítulo        "- "  lista        "1. " lista numerada
     "> "  nota             "! "  advertencia  "$ "  fórmula / cálculo
     "|"   tabla (1ª fila = encabezado)
     "@"   asiento contable: 1ª línea título, luego cta|detalle|debe|haber
   Inline: **negrita**  ~código~
   ej: l = nivel (1 fácil, 2 medio, 3 difícil), t = mc | num | ab
   ============================================================ */
const CURSO = window.CURSO || [];


/* ============================================================
   RENDERIZADO DEL MINI-MARCADO
   ============================================================ */
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const inl = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/~(.+?)~/g,'<code>$1</code>');
const nf = n => n.toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});

function tabla(lines){
  const rows = lines.map(l => l.replace(/^\|/,'').replace(/\|$/,'').split('|'))
                    .filter(r => !r.every(c => /^\s*-+\s*$/.test(c)));
  if(!rows.length) return '';
  const cell = (c,tag) => {
    const v = c.trim();
    const num = /^[−-]?[S/\s]*[\d.,]+%?$/.test(v) && /\d/.test(v);
    return '<' + tag + (num ? ' class="num"' : '') + '>' + inl(v) + '</' + tag + '>';
  };
  let h = '<div class="tablewrap"><table><thead><tr>' + rows[0].map(c => cell(c,'th')).join('') + '</tr></thead><tbody>';
  for(let i=1;i<rows.length;i++) h += '<tr>' + rows[i].map(c => cell(c,'td')).join('') + '</tr>';
  return h + '</tbody></table></div>';
}

function asiento(lines){
  const body = lines.map(l => l.replace(/^@\s?/,''));
  const tit = body[0].includes('|') ? '' : body.shift();
  const rows = body.filter(l => l.includes('|')).map(l => l.split('|'));
  let d=0,hb=0;
  const tr = rows.map(r => {
    const dv = parseFloat((r[2]||'').replace(/,/g,'')) || 0;
    const hv = parseFloat((r[3]||'').replace(/,/g,'')) || 0;
    d+=dv; hb+=hv;
    const sub = !r[0].trim();
    return '<tr' + (sub?' class="sub"':'') + '><td>' + esc(r[0].trim()) + '</td><td>' + inl((r[1]||'').trim()) +
      '</td><td class="num">' + (dv?nf(dv):'') + '</td><td class="num">' + (hv?nf(hv):'') + '</td></tr>';
  }).join('');
  const tot = (d||hb) ? '<tr class="tot"><td></td><td>Totales</td><td class="num">'+nf(d)+'</td><td class="num">'+nf(hb)+'</td></tr>' : '';
  return '<div class="asiento">' + (tit ? '<div class="cab"><b>Asiento</b><span>'+inl(tit)+'</span></div>' : '') +
    '<div class="tablewrap"><table><thead><tr><th>Cta.</th><th>Detalle</th><th class="num">Debe</th><th class="num">Haber</th></tr></thead><tbody>' +
    tr + tot + '</tbody></table></div></div>';
}

function md(src){
  const lines = String(src).trim().split('\n');
  let out = '', buf = [], modo = null;
  const cerrar = () => {
    if(!buf.length){ modo = null; return; }
    if(modo === 'p')         out += '<p>' + inl(buf.join(' ')) + '</p>';
    else if(modo === 'ul')   out += '<ul>' + buf.map(l => '<li>' + inl(l) + '</li>').join('') + '</ul>';
    else if(modo === 'ol')   out += '<ol>' + buf.map(l => '<li>' + inl(l) + '</li>').join('') + '</ol>';
    else if(modo === 'tabla')   out += tabla(buf);
    else if(modo === 'asiento') out += asiento(buf);
    else if(modo === 'nota')    out += '<div class="nota">' + buf.map(inl).join(' ') + '</div>';
    else if(modo === 'alerta')  out += '<div class="nota alerta">' + buf.map(inl).join(' ') + '</div>';
    else if(modo === 'formula') out += '<div class="formula">' + buf.map(inl).join('<br>') + '</div>';
    buf = []; modo = null;
  };
  for(const bruto of lines){
    const l = bruto.trim();
    if(!l){ cerrar(); continue; }
    if(l.startsWith('# ')){ cerrar(); out += '<h3>' + inl(l.slice(2)) + '</h3>'; continue; }
    let m, txt = l;
    if(l.startsWith('@')){ m = 'asiento'; }
    else if(l.startsWith('|')){ m = 'tabla'; }
    else if(l.startsWith('> ')){ m = 'nota'; txt = l.slice(2); }
    else if(l.startsWith('! ')){ m = 'alerta'; txt = l.slice(2); }
    else if(l.startsWith('$ ')){ m = 'formula'; txt = l.slice(2); }
    else if(l.startsWith('- ')){ m = 'ul'; txt = l.slice(2); }
    else if(/^\d+\.\s/.test(l)){ m = 'ol'; txt = l.replace(/^\d+\.\s/,''); }
    else { m = 'p'; }
    if(modo && modo !== m) cerrar();
    modo = m; buf.push(txt);
  }
  cerrar();
  return out;
}

/* ============================================================
   ESTADO Y PROGRESO
   ============================================================ */
const LS = {
  get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
};
let hechos = LS.get('acp.hechos',{});
let filtro = 0;
const temas = () => CURSO.flatMap(m => m.temas.map(t => ({...t, mod:m})));
const findTema = id => temas().find(t => t.id === id);

/* ============================================================
   NAVEGACIÓN
   ============================================================ */
function renderNav(actual){
  const nav = document.getElementById('nav');
  nav.innerHTML = CURSO.map((m,i) => {
    const total = m.temas.length;
    const list = m.temas.filter(t => hechos[t.id]).length;
    const abierto = m.temas.some(t => t.id === actual) || (!actual && i === 0);
    return '<details class="mod"' + (abierto ? ' open' : '') + '>' +
      '<summary><span class="mtitle">' + (i+1) + '. ' + esc(m.titulo) + '</span>' +
      '<span class="nivel">' + esc(m.nivel) + '</span>' +
      '<span class="mmeta"><span class="bar"><i style="width:' + (total?Math.round(list/total*100):0) + '%"></i></span>' + list + '/' + total + '</span></summary>' +
      '<ol>' + m.temas.map(t =>
        '<li><button data-id="' + t.id + '" class="' + (hechos[t.id] ? 'done' : '') + '"' +
        (t.id === actual ? ' aria-current="true"' : '') + '><span class="tick"></span><span>' + esc(t.titulo) + '</span></button></li>'
      ).join('') + '</ol></details>';
  }).join('');
  nav.querySelectorAll('button[data-id]').forEach(b => b.onclick = () => {
    location.hash = b.dataset.id;
    document.getElementById('rail').classList.remove('abierto');
  });
}

/* ============================================================
   PORTADA
   ============================================================ */
function renderHome(){
  const tt = temas();
  const hechosN = tt.filter(t => hechos[t.id]).length;
  const ejN = CURSO.reduce((a,m) => a + m.temas.reduce((b,t) => b + t.ej.length, 0), 0);
  const minN = CURSO.reduce((a,m) => a + m.temas.reduce((b,t) => b + (t.min||0), 0), 0);
  document.getElementById('vista').innerHTML =
    '<div class="hero"><div class="crumb">Curso completo · del asiento básico a la consolidación</div>' +
    '<h1>Contabilidad peruana, de cero a nivel avanzado</h1>' +
    '<p class="lede">Un programa estructurado sobre el PCGE 2019, las NIIF oficializadas por el CNC y la normativa tributaria vigente. ' +
    'Cada subtema explica el concepto con ejemplos reales de empresas peruanas, muestra los asientos tal como se registran y cierra con ejercicios de nivel fácil, medio y difícil con solución desarrollada.</p>' +
    '<div class="kpis">' +
    '<div class="kpi"><b>' + CURSO.length + '</b><span>Módulos</span></div>' +
    '<div class="kpi"><b>' + tt.length + '</b><span>Subtemas</span></div>' +
    '<div class="kpi"><b>' + ejN + '</b><span>Ejercicios</span></div>' +
    '<div class="kpi"><b>' + Math.round(minN/60*10)/10 + ' h</b><span>De lectura</span></div>' +
    '<div class="kpi"><b>' + hechosN + '/' + tt.length + '</b><span>Tu avance</span></div>' +
    '</div></div>' +
    '<div class="modcards">' + CURSO.map((m,i) => {
      const done = m.temas.filter(t => hechos[t.id]).length;
      return '<button class="modcard" data-go="' + m.temas[0].id + '">' +
        '<div class="r1"><span class="nivel">' + esc(m.nivel) + '</span><h3>' + (i+1) + '. ' + esc(m.titulo) + '</h3></div>' +
        '<p>' + esc(m.resumen) + '</p>' +
        '<div class="r2"><span>' + m.temas.length + ' subtemas</span><span>·</span><span>' +
        m.temas.reduce((a,t) => a + t.ej.length, 0) + ' ejercicios</span><span>·</span><span>' + done + ' estudiados</span></div></button>';
    }).join('') + '</div>';
  document.getElementById('vista').querySelectorAll('[data-go]').forEach(b => b.onclick = () => location.hash = b.dataset.go);
  renderNav(null);
  document.title = 'Aula Contable Perú';
}

/* ============================================================
   EJERCICIOS
   ============================================================ */
const LVL = {1:'Fácil',2:'Medio',3:'Difícil'};

function renderEj(t){
  const vis = t.ej.filter(e => !filtro || e.l === filtro);
  const cuenta = n => t.ej.filter(e => e.l === n).length;
  return '<div class="ejhead"><h2>Ejercicios</h2><div class="filtros">' +
    [[0,'Todos ('+t.ej.length+')'],[1,'Fácil ('+cuenta(1)+')'],[2,'Medio ('+cuenta(2)+')'],[3,'Difícil ('+cuenta(3)+')']]
      .map(([v,lab]) => '<button data-f="' + v + '" aria-pressed="' + (filtro===v) + '">' + lab + '</button>').join('') +
    '</div></div>' +
    (vis.length ? vis.map((e,i) => {
      const idx = t.ej.indexOf(e), uid = t.id + '-' + idx;
      let input = '';
      if(e.t === 'mc'){
        input = '<div class="opts" data-uid="' + uid + '">' + e.o.map((o,j) =>
          '<label><input type="radio" name="' + uid + '" id="' + uid + '-o' + j + '" value="' + j + '"><span>' + inl(o) + '</span></label>').join('') + '</div>';
      } else if(e.t === 'num'){
        input = '<div class="numin">' + (e.u ? '<span>' + esc(e.u) + '</span>' : '') +
          '<input type="text" inputmode="decimal" id="' + uid + '-n" placeholder="Tu respuesta"></div>';
      }
      const btn = e.t === 'ab'
        ? '<button class="btn" data-sol="' + uid + '">Ver solución desarrollada</button>'
        : '<button class="btn" data-chk="' + uid + '">Comprobar</button><button class="btn ghost" data-sol="' + uid + '">Ver solución</button>';
      return '<div class="ej" id="ej-' + uid + '"><div class="top">' +
        '<span class="lvl lvl' + e.l + '">' + LVL[e.l] + '</span>' +
        '<span class="nro">Ejercicio ' + (idx+1) + ' de ' + t.ej.length + '</span>' +
        (e.t === 'ab' ? '<span class="nro">· desarrollo</span>' : '') + '</div>' +
        '<div class="q">' + md(e.p) + '</div>' + input +
        '<div class="ejbtns">' + btn + '</div>' +
        '<div class="fb" id="fb-' + uid + '" hidden></div>' +
        '<div class="sol" id="sol-' + uid + '" hidden><h4>Solución</h4>' + md(e.s) + '</div></div>';
    }).join('') : '<p style="color:var(--ink-3)">No hay ejercicios de ese nivel en este subtema.</p>');
}

function bindEj(t){
  const v = document.getElementById('vista');
  v.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filtro = +b.dataset.f; renderTema(t.id,true); });
  v.querySelectorAll('[data-sol]').forEach(b => b.onclick = () => {
    const s = document.getElementById('sol-' + b.dataset.sol);
    s.hidden = !s.hidden;
    b.textContent = s.hidden ? (b.classList.contains('ghost') ? 'Ver solución' : 'Ver solución desarrollada') : 'Ocultar solución';
  });
  v.querySelectorAll('[data-chk]').forEach(b => b.onclick = () => {
    const uid = b.dataset.chk, idx = +uid.split('-').pop(), e = t.ej[idx];
    const fb = document.getElementById('fb-' + uid);
    fb.hidden = false;
    if(e.t === 'mc'){
      const sel = v.querySelector('input[name="' + uid + '"]:checked');
      if(!sel){ fb.className = 'fb mal'; fb.textContent = 'Elige una alternativa antes de comprobar.'; return; }
      const ok = +sel.value === e.r;
      v.querySelectorAll('[data-uid="' + uid + '"] label').forEach((l,j) => {
        l.classList.remove('bien','mal');
        if(j === e.r) l.classList.add('bien');
        else if(j === +sel.value) l.classList.add('mal');
      });
      fb.className = 'fb ' + (ok ? 'bien' : 'mal');
      fb.textContent = ok ? 'Correcto. Revisa la solución para afianzar el razonamiento.' : 'No es la correcta. La alternativa marcada en verde es la que corresponde.';
    } else {
      const raw = (document.getElementById(uid + '-n').value || '').replace(/[S/\s,]/g,'').replace(/%/g,'');
      const val = parseFloat(raw);
      if(isNaN(val)){ fb.className = 'fb mal'; fb.textContent = 'Escribe un número para comprobar.'; return; }
      const ok = Math.abs(val - e.r) <= (e.tol ?? 0.5);
      fb.className = 'fb ' + (ok ? 'bien' : 'mal');
      fb.textContent = ok ? 'Correcto: ' + (e.u ? e.u + ' ' : '') + nf(e.r) + '.' : 'Aún no. Revisa el cálculo y vuelve a intentar; la solución explica el procedimiento.';
    }
    const s = document.getElementById('sol-' + uid);
    if(fb.classList.contains('bien')) s.hidden = false;
  });
}

/* ============================================================
   VISTA DE TEMA
   ============================================================ */
function renderTema(id,keepScroll){
  const t = findTema(id);
  if(!t){ renderHome(); return; }
  const lista = temas(), i = lista.findIndex(x => x.id === id);
  const prev = lista[i-1], next = lista[i+1];
  const mi = CURSO.indexOf(t.mod) + 1, ti = t.mod.temas.indexOf(t.mod.temas.find(x => x.id === id)) + 1;
  const y = keepScroll ? window.scrollY : 0;
  document.getElementById('vista').innerHTML =
    '<div class="crumb"><em>Módulo ' + mi + '</em> · ' + esc(t.mod.titulo) + ' · <span class="nivel">' + esc(t.mod.nivel) + '</span></div>' +
    '<h1>' + mi + '.' + ti + ' ' + esc(t.titulo) + '</h1>' +
    '<p class="lede">Lectura estimada: ' + t.min + ' min' + (t.ej.length ? ' · ' + t.ej.length + ' ejercicios' : ' · material de consulta') + '</p>' +
    '<div class="prose">' + md(t.cont) + '</div>' +
    '<div class="claves"><h3>Para recordar</h3><ul>' + t.claves.map(c => '<li>' + inl(c) + '</li>').join('') + '</ul></div>' +
    (t.ej.length ? renderEj(t) : '') +
    '<div class="foot"><button class="btn ghost" id="marcar">' + (hechos[id] ? '✓ Estudiado — desmarcar' : 'Marcar como estudiado') + '</button>' +
    '<nav>' + (prev ? '<button class="btn ghost" data-go="' + prev.id + '">← ' + esc(prev.titulo.slice(0,28)) + (prev.titulo.length>28?'…':'') + '</button>' : '') +
    (next ? '<button class="btn" data-go="' + next.id + '">' + esc(next.titulo.slice(0,28)) + (next.titulo.length>28?'…':'') + ' →</button>' : '') + '</nav></div>';
  const v = document.getElementById('vista');
  v.querySelectorAll('[data-go]').forEach(b => b.onclick = () => location.hash = b.dataset.go);
  document.getElementById('marcar').onclick = () => {
    hechos[id] = !hechos[id];
    if(!hechos[id]) delete hechos[id];
    LS.set('acp.hechos',hechos);
    renderTema(id,true);
  };
  if(t.ej.length) bindEj(t);
  renderNav(id);
  if(!keepScroll) window.scrollTo(0,0); else window.scrollTo(0,y);
  document.title = t.titulo + ' · Aula Contable Perú';
}

/* ============================================================
   BÚSQUEDA
   ============================================================ */
const q = document.getElementById('q'), res = document.getElementById('res');
q.addEventListener('input', () => {
  const s = q.value.trim().toLowerCase();
  if(s.length < 2){ res.hidden = true; return; }
  const hits = temas().map(t => {
    const hay = (t.titulo + ' ' + t.cont + ' ' + t.claves.join(' ')).toLowerCase();
    const n = hay.split(s).length - 1;
    return n ? {t,n} : null;
  }).filter(Boolean).sort((a,b) => b.n - a.n).slice(0,8);
  res.innerHTML = hits.length
    ? hits.map(h => '<button data-id="' + h.t.id + '"><b>' + esc(h.t.titulo) + '</b><i>' + esc(h.t.mod.titulo) + ' · ' + h.n + ' menciones</i></button>').join('')
    : '<button disabled style="color:var(--ink-3)"><b>Sin resultados</b><i>Prueba con otra palabra: IGV, depreciación, CTS…</i></button>';
  res.hidden = false;
  res.querySelectorAll('button[data-id]').forEach(b => b.onclick = () => {
    location.hash = b.dataset.id; res.hidden = true; q.value = '';
  });
});
document.addEventListener('click', e => { if(!e.target.closest('.searchwrap')) res.hidden = true; });

/* ============================================================
   TEMA CLARO / OSCURO, MENÚ, RUTEO
   ============================================================ */
const guardado = LS.get('acp.tema',null);
if(guardado) document.documentElement.setAttribute('data-theme',guardado);
document.getElementById('tema').onclick = () => {
  const oscuro = document.documentElement.getAttribute('data-theme') === 'dark'
    || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
  const nuevo = oscuro ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme',nuevo);
  LS.set('acp.tema',nuevo);
};
document.getElementById('menubtn').onclick = () => document.getElementById('rail').classList.toggle('abierto');
document.getElementById('home').onclick = () => { location.hash = ''; renderHome(); };

function ruta(){
  const h = (location.hash || '').replace('#','');
  if(h && findTema(h)) renderTema(h); else renderHome();
}
addEventListener('hashchange', ruta);
ruta();
