/* ============================================================
   06-app.js — Enrutador, eventos y arranque de la aplicación
   ============================================================ */
(function () {
  'use strict';

  var view = document.getElementById('view');
  var crumb = document.getElementById('crumb');
  var navTree = document.getElementById('navTree');
  var inputQ = document.getElementById('q');
  var ultimaQ = '';
  var toolActiva = Lab.lista[0].id;

  /* ---------------- tema claro / oscuro ---------------- */
  (function temaInicial() {
    var t = null;
    try { t = localStorage.getItem('cdc.tema'); } catch (e) { }
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  })();
  document.getElementById('themeBtn').addEventListener('click', function () {
    var el = document.documentElement;
    var actual = el.getAttribute('data-theme');
    var oscuroSistema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var siguiente = actual ? (actual === 'dark' ? 'light' : 'dark') : (oscuroSistema ? 'light' : 'dark');
    el.setAttribute('data-theme', siguiente);
    try { localStorage.setItem('cdc.tema', siguiente); } catch (e) { }
  });

  /* ---------------- menú lateral en móvil ---------------- */
  var burger = document.getElementById('burger');
  var scrim = document.getElementById('scrim');
  function menu(abrir) {
    document.body.setAttribute('data-nav', abrir ? '1' : '0');
    burger.setAttribute('aria-expanded', abrir ? 'true' : 'false');
  }
  burger.addEventListener('click', function () {
    menu(document.body.getAttribute('data-nav') !== '1');
  });
  scrim.addEventListener('click', function () { menu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') menu(false);
    if (e.key === '/' && document.activeElement !== inputQ &&
      ['INPUT', 'TEXTAREA', 'SELECT'].indexOf((document.activeElement || {}).tagName) < 0) {
      e.preventDefault(); inputQ.focus();
    }
  });

  /* ---------------- navegación lateral ---------------- */
  function pintarNav(activo) {
    navTree.innerHTML = Vistas.navArbol(activo);
    var tot = CDC.totales();
    document.getElementById('progBar').style.width = tot.pct + '%';
    document.getElementById('progPct').textContent = tot.pct + '%';
    document.querySelectorAll('.nav__links .chip').forEach(function (a) {
      var h = a.getAttribute('href').slice(1);
      if ((location.hash.slice(1) || 'inicio') === h) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  navTree.addEventListener('click', function (e) {
    var b = e.target.closest('[data-toggle]');
    if (b) {
      var cont = b.parentNode;
      var ab = cont.getAttribute('data-open') === '1';
      cont.setAttribute('data-open', ab ? '0' : '1');
      b.setAttribute('aria-expanded', ab ? 'false' : 'true');
      CDC.datos.tema_abiertos[cont.getAttribute('data-mod')] = ab ? 0 : 1;
      CDC.guardar();
      return;
    }
    if (e.target.closest('a')) menu(false);
  });

  /* ---------------- buscador ---------------- */
  var tQ = null;
  inputQ.addEventListener('input', function () {
    clearTimeout(tQ);
    tQ = setTimeout(function () {
      ultimaQ = inputQ.value;
      if (ultimaQ.trim().length >= 2) {
        if (location.hash !== '#buscar') location.hash = '#buscar';
        else render();
      } else if (location.hash === '#buscar') {
        render();
      }
    }, 170);
  });

  /* ---------------- montaje de herramientas ---------------- */
  function montarTool(id) {
    var t = Lab.lista.filter(function (x) { return x.id === id; })[0];
    if (!t) return;
    var body = document.getElementById('toolBody');
    if (body) t.montar(body);
  }

  /* ---------------- enrutador ---------------- */
  function render() {
    var h = (location.hash || '').replace(/^#/, '');
    if (!h) h = 'inicio';
    var html, activo = null, titulo = 'Inicio';

    if (h.indexOf('t-') === 0) {
      var t = CDC.temas[h.slice(2)];
      if (t) {
        html = Vistas.tema(t); activo = t.id;
        titulo = t.modulo.titulo + ' › ' + t.titulo;
        CDC.ultimoTema(t.id);
      } else { html = Vistas.noEncontrado(); titulo = 'No encontrado'; }
    } else if (h.indexOf('m-') === 0) {
      var m = CDC.modulos.filter(function (x) { return x.id === h.slice(2); })[0];
      if (m) { html = Vistas.modulo(m); titulo = 'Módulo ' + m.n + ' · ' + m.titulo; }
      else { html = Vistas.noEncontrado(); titulo = 'No encontrado'; }
    } else if (h === 'herramientas') {
      html = Vistas.herramientas(toolActiva); titulo = 'Laboratorio';
    } else if (h === 'biblioteca') {
      html = Vistas.biblioteca(); titulo = 'Bibliografía';
    } else if (h === 'progreso') {
      html = Vistas.progreso(); titulo = 'Progreso';
    } else if (h === 'buscar') {
      html = Vistas.buscar(ultimaQ || inputQ.value); titulo = 'Búsqueda';
    } else if (h === 'inicio') {
      html = Vistas.inicio(); titulo = 'Inicio';
    } else {
      html = Vistas.noEncontrado(); titulo = 'No encontrado';
    }

    view.innerHTML = html;
    crumb.textContent = titulo;
    document.title = (h === 'inicio' ? 'Código Desde Cero — aprende a programar desde los bits' : titulo + ' · Código Desde Cero');
    pintarNav(activo);
    if (h === 'herramientas') montarTool(toolActiva);
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', render);

  /* ---------------- eventos delegados del contenido ---------------- */
  view.addEventListener('click', function (e) {
    var el;

    /* pestañas del laboratorio */
    if ((el = e.target.closest('[data-tool]'))) {
      toolActiva = el.getAttribute('data-tool');
      render();
      return;
    }
    /* pista y solución */
    if ((el = e.target.closest('[data-pista]'))) {
      togglePanel('pista-' + el.getAttribute('data-pista'), el, 'Ver pista', 'Ocultar pista');
      return;
    }
    if ((el = e.target.closest('[data-sol]'))) {
      togglePanel('sol-' + el.getAttribute('data-sol'), el, 'Ver solución', 'Ocultar solución');
      return;
    }
    /* enviar un ejercicio al laboratorio */
    if ((el = e.target.closest('[data-lab]'))) {
      var ref = el.getAttribute('data-lab').split(':');
      var tm = CDC.temas[ref[0]];
      var ex = tm && tm.ejercicios[+ref[1]];
      if (ex && ex.lab) {
        try {
          localStorage.setItem('cdc.lab.pseudo', ex.lab);
          localStorage.setItem('cdc.lab.ent', ex.labEntradas || '');
        } catch (err) { }
        toolActiva = 'pseudo';
        location.hash = '#herramientas';
      }
      return;
    }
    /* quiz */
    if ((el = e.target.closest('.quiz__o button'))) {
      var caja = el.closest('.quiz');
      if (caja.getAttribute('data-resuelto')) return;
      caja.setAttribute('data-resuelto', '1');
      var ok = +caja.getAttribute('data-ok');
      var elegida = +el.getAttribute('data-op');
      caja.querySelectorAll('.quiz__o button').forEach(function (b, k) {
        if (k === ok) b.setAttribute('data-s', 'ok');
        else if (k === elegida) b.setAttribute('data-s', 'no');
        b.disabled = true;
      });
      var fb = caja.querySelector('[data-fb]');
      fb.hidden = false;
      fb.insertAdjacentHTML('afterbegin', '<b>' + (elegida === ok ? '¡Correcto. ' : 'No era esa. ') + '</b>');
      CDC.guardarQuiz(caja.getAttribute('data-quiz'), elegida === ok);
      return;
    }
    /* reiniciar progreso */
    if (e.target.id === 'resetBtn') {
      var btn = e.target;
      if (btn.getAttribute('data-confirm') !== '1') {
        btn.setAttribute('data-confirm', '1');
        btn.textContent = 'Pulsa otra vez para confirmar';
        document.getElementById('resetMsg').textContent = 'Esta acción no se puede deshacer.';
        return;
      }
      CDC.reiniciar();
      render();
      return;
    }
  });

  function togglePanel(nombre, boton, txtOff, txtOn) {
    var p = view.querySelector('[data-panel="' + nombre + '"]');
    if (!p) return;
    p.hidden = !p.hidden;
    boton.textContent = p.hidden ? txtOff : txtOn;
  }

  view.addEventListener('change', function (e) {
    if (e.target.id === 'temaHecho') {
      var h = location.hash.replace(/^#t-/, '');
      CDC.marcarTema(h, e.target.checked);
      pintarNav(h);
      return;
    }
    var d = e.target.getAttribute && e.target.getAttribute('data-done');
    if (d) {
      CDC.marcarEjer(d, e.target.checked);
      var tot = CDC.totales();
      document.getElementById('progBar').style.width = tot.pct + '%';
    }
  });

  /* ---------------- arranque ---------------- */
  if (!location.hash) location.hash = '#inicio';
  render();
})();
