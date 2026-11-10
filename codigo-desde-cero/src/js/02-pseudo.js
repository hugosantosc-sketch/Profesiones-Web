/* ============================================================
   02-pseudo.js — Intérprete de pseudocódigo en español
   Léxico -> sintáctico (AST) -> ejecución. El mismo AST alimenta
   el generador de diagramas de flujo (03-flowchart.js).
   ============================================================ */
var Pseudo = (function () {
  'use strict';

  /* ------------------------------------------------------------
     1. ANÁLISIS LÉXICO
     ------------------------------------------------------------ */
  var PALABRAS = ['algoritmo', 'finalgoritmo', 'proceso', 'finproceso', 'subproceso',
    'finsubproceso', 'funcion', 'finfuncion', 'definir', 'como', 'dimension', 'escribir', 'leer',
    'si', 'entonces', 'sino', 'finsi', 'mientras', 'hacer', 'finmientras', 'repetir', 'hasta',
    'que', 'para', 'con', 'finpara', 'segun', 'finsegun', 'caso', 'de',
    'retornar', 'verdadero', 'falso', 'mod', 'sin', 'saltar', 'por',
    'borrar', 'limpiar'];
  /* Reconocidas por contexto y NO reservadas, para que puedan usarse como nombres
     de variable: los nombres de tipo (Entero, Real, Cadena, Texto, Logico, Caracter),
     'valor', 'referencia', 'otro', 'modo', 'pantalla', 'paso', y los operadores
     logicos 'y', 'o', 'no'. */

  function esLetra(c) { return /[A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]/.test(c); }
  function esDigito(c) { return c >= '0' && c <= '9'; }

  function lexer(src) {
    var toks = [], i = 0, linea = 1, s = src;
    function push(t, v) { toks.push({ t: t, v: v, l: linea }); }
    while (i < s.length) {
      var c = s[i];
      if (c === '\r') { i++; continue; }
      if (c === '\n') { push('nl'); linea++; i++; continue; }
      if (c === ' ' || c === '\t') { i++; continue; }
      if (c === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue; }
      if (c === '#') { while (i < s.length && s[i] !== '\n') i++; continue; }
      if (c === '/' && s[i + 1] === '*') {
        var fin = s.indexOf('*/', i + 2);
        var trozo = s.slice(i, fin < 0 ? s.length : fin);
        linea += (trozo.match(/\n/g) || []).length;
        i = fin < 0 ? s.length : fin + 2; continue;
      }
      if (c === '"' || c === "'") {
        var q = c, j = i + 1, out = '';
        while (j < s.length && s[j] !== q) {
          if (s[j] === '\\' && j + 1 < s.length) { out += s[j + 1]; j += 2; }
          else { if (s[j] === '\n') linea++; out += s[j]; j++; }
        }
        if (j >= s.length) throw err(linea, 'Falta cerrar la cadena de texto con ' + q);
        push('str', out); i = j + 1; continue;
      }
      if (esDigito(c)) {
        var j2 = i; while (j2 < s.length && (esDigito(s[j2]) || s[j2] === '.')) j2++;
        push('num', parseFloat(s.slice(i, j2))); i = j2; continue;
      }
      if (esLetra(c)) {
        var j3 = i; while (j3 < s.length && (esLetra(s[j3]) || esDigito(s[j3]))) j3++;
        var w = s.slice(i, j3), lw = w.toLowerCase();
        if (PALABRAS.indexOf(lw) >= 0) push('kw', lw); else push('id', w);
        i = j3; continue;
      }
      var dos = s.substr(i, 2);
      if (dos === '<-' || dos === '<=' || dos === '>=' || dos === '<>' || dos === '!=' ||
        dos === ':=' || dos === '==' || dos === '&&' || dos === '||') {
        push('op', dos === '==' ? '=' : (dos === '!=' ? '<>' : (dos === ':=' ? '<-' : (dos === '&&' ? 'y' : (dos === '||' ? 'o' : dos)))));
        i += 2; continue;
      }
      if ('+-*/^%()[],:=<>&|~;'.indexOf(c) >= 0) {
        var mapa = { '&': 'y', '|': 'o', '~': 'no' };
        push(c === ';' ? 'nl' : 'op', mapa[c] || c); i++; continue;
      }
      throw err(linea, 'Carácter no reconocido: "' + c + '"');
    }
    push('eof');
    return toks;
  }

  function err(l, m) { var e = new Error(m); e.linea = l; e.pseudo = true; return e; }

  /* ------------------------------------------------------------
     2. ANÁLISIS SINTÁCTICO -> AST
     ------------------------------------------------------------ */
  function parse(src) {
    var toks = lexer(src), p = 0;

    function tk() { return toks[p]; }
    function linea() { return toks[p].l || 0; }
    function esKw(k) { return toks[p].t === 'kw' && toks[p].v === k; }
    /* Coincidencia por texto, sea palabra reservada o identificador. */
    function esTxt(w) {
      var t = toks[p];
      return (t.t === 'kw' || t.t === 'id') && String(t.v).toLowerCase() === w;
    }
    /* y / o / no son operadores solo en posicion de operador: asi 'y' u 'o'
       pueden usarse como nombres de variable, que es lo habitual en matematicas. */
    function esLog(w) {
      var t = toks[p];
      if (t.t === 'op' && t.v === w) return true;
      if ((t.t === 'id' || t.t === 'kw') && String(t.v).toLowerCase() === w) {
        if (w !== 'no') return true;
        var sig = toks[p + 1];
        if (!sig) return false;
        return sig.t === 'num' || sig.t === 'str' || sig.t === 'id' ||
          (sig.t === 'op' && sig.v === '(') ||
          (sig.t === 'kw' && ['verdadero', 'falso'].indexOf(sig.v) >= 0) ||
          ((sig.t === 'id' || sig.t === 'kw') && String(sig.v).toLowerCase() === 'no');
      }
      return false;
    }
    function pedirTxt(w) {
      if (!esTxt(w)) throw err(linea(), 'Esperaba "' + w + '" y encontré "' + muestra(toks[p]) + '"');
      return avanzar();
    }
    function esOp(o) { return toks[p].t === 'op' && toks[p].v === o; }
    function avanzar() { return toks[p++]; }
    function comerNl() { while (toks[p].t === 'nl') p++; }
    function pedirKw(k, ctx) {
      if (!esKw(k)) throw err(linea(), 'Esperaba "' + k + '"' + (ctx ? ' en ' + ctx : '') +
        ' y encontré "' + muestra(toks[p]) + '"');
      return avanzar();
    }
    function pedirOp(o) {
      if (!esOp(o)) throw err(linea(), 'Esperaba "' + o + '" y encontré "' + muestra(toks[p]) + '"');
      return avanzar();
    }
    function muestra(t) {
      if (t.t === 'eof') return 'fin del código';
      if (t.t === 'nl') return 'fin de línea';
      return String(t.v);
    }

    /* --- expresiones --- */
    function expr() { return nivelO(); }
    function nivelO() {
      var e = nivelY();
      while (esLog('o')) { avanzar(); e = { k: 'bin', op: 'o', a: e, b: nivelY() }; }
      return e;
    }
    function nivelY() {
      var e = nivelNo();
      while (esLog('y')) { avanzar(); e = { k: 'bin', op: 'y', a: e, b: nivelNo() }; }
      return e;
    }
    function nivelNo() {
      if (esLog('no')) { avanzar(); return { k: 'un', op: 'no', a: nivelNo() }; }
      return nivelRel();
    }
    function nivelRel() {
      var e = nivelSuma();
      while (toks[p].t === 'op' && ['=', '<>', '<', '>', '<=', '>='].indexOf(toks[p].v) >= 0) {
        var o = avanzar().v; e = { k: 'bin', op: o, a: e, b: nivelSuma() };
      }
      return e;
    }
    function nivelSuma() {
      var e = nivelMul();
      while (toks[p].t === 'op' && (toks[p].v === '+' || toks[p].v === '-')) {
        var o = avanzar().v; e = { k: 'bin', op: o, a: e, b: nivelMul() };
      }
      return e;
    }
    function nivelMul() {
      var e = nivelPot();
      while ((toks[p].t === 'op' && ['*', '/', '%'].indexOf(toks[p].v) >= 0) || esTxt('mod')) {
        var o = (toks[p].t === 'op') ? toks[p].v : 'mod'; avanzar();
        e = { k: 'bin', op: o === '%' ? 'mod' : o, a: e, b: nivelPot() };
      }
      return e;
    }
    function nivelPot() {
      var e = unario();
      if (esOp('^')) { avanzar(); return { k: 'bin', op: '^', a: e, b: nivelPot() }; }
      return e;
    }
    function unario() {
      if (esOp('-')) { avanzar(); return { k: 'un', op: '-', a: unario() }; }
      if (esOp('+')) { avanzar(); return unario(); }
      return primario();
    }
    function primario() {
      var t = toks[p];
      if (t.t === 'num') { avanzar(); return { k: 'num', v: t.v }; }
      if (t.t === 'str') { avanzar(); return { k: 'str', v: t.v }; }
      if (esKw('verdadero')) { avanzar(); return { k: 'bool', v: true }; }
      if (esKw('falso')) { avanzar(); return { k: 'bool', v: false }; }
      if (esOp('(')) { avanzar(); var e = expr(); pedirOp(')'); return e; }
      if (t.t === 'id') {
        avanzar();
        if (esOp('(')) {
          avanzar(); var args = [];
          if (!esOp(')')) { args.push(expr()); while (esOp(',')) { avanzar(); args.push(expr()); } }
          pedirOp(')');
          return { k: 'call', n: t.v, args: args, l: t.l };
        }
        var idx = [];
        if (esOp('[')) {
          avanzar(); idx.push(expr());
          while (esOp(',')) { avanzar(); idx.push(expr()); }
          pedirOp(']');
        }
        return { k: 'ref', n: t.v, idx: idx, l: t.l };
      }
      throw err(t.l, 'No entiendo "' + muestra(t) + '" dentro de una expresión');
    }

    /* --- instrucciones --- */
    function bloque(finales) {
      var lista = [];
      for (;;) {
        comerNl();
        if (toks[p].t === 'eof') break;
        if (toks[p].t === 'kw' && finales.indexOf(toks[p].v) >= 0) break;
        if (esKw('de') && toks[p + 1] && String(toks[p + 1].v).toLowerCase() === 'otro' &&
          finales.indexOf('de') >= 0) break;
        var st = instruccion();
        if (st) lista.push(st);
      }
      return lista;
    }

    function instruccion() {
      var l = linea();
      /* Escribir */
      if (esKw('escribir')) {
        avanzar();
        var salto = true;
        if (esKw('sin')) { avanzar(); pedirKw('saltar'); salto = false; }
        var xs = [expr()];
        while (esOp(',')) { avanzar(); xs.push(expr()); }
        return { k: 'escribir', xs: xs, salto: salto, l: l };
      }
      /* Leer */
      if (esKw('leer')) {
        avanzar();
        var ds = [refDestino()];
        while (esOp(',')) { avanzar(); ds.push(refDestino()); }
        return { k: 'leer', ds: ds, l: l };
      }
      /* Definir … Como Tipo */
      if (esKw('definir')) {
        avanzar();
        var ns = [];
        ns.push(avanzar().v);
        while (esOp(',')) { avanzar(); ns.push(avanzar().v); }
        var tipo = 'real';
        if (esKw('como')) { avanzar(); tipo = avanzar().v; }
        return { k: 'definir', ns: ns, tipo: String(tipo).toLowerCase(), l: l };
      }
      /* Dimension a[10], m[3,4] */
      if (esKw('dimension')) {
        avanzar();
        var arrs = [];
        for (;;) {
          var nm = avanzar();
          if (nm.t !== 'id') throw err(l, 'Dimension necesita el nombre del arreglo');
          pedirOp('[');
          var dims = [expr()];
          while (esOp(',')) { avanzar(); dims.push(expr()); }
          pedirOp(']');
          arrs.push({ n: nm.v, dims: dims });
          if (esOp(',')) { avanzar(); continue; }
          break;
        }
        return { k: 'dimension', arrs: arrs, l: l };
      }
      /* Si … Entonces */
      if (esKw('si')) {
        avanzar();
        var cond = expr();
        if (esKw('entonces')) avanzar();
        var luego = bloque(['sino', 'finsi']);
        var sino = [];
        if (esKw('sino')) { avanzar(); sino = bloque(['finsi']); }
        pedirKw('finsi', 'la instrucción Si');
        return { k: 'si', cond: cond, luego: luego, sino: sino, l: l };
      }
      /* Mientras … Hacer */
      if (esKw('mientras')) {
        avanzar();
        var c2 = expr();
        if (esKw('hacer')) avanzar();
        var cuerpo = bloque(['finmientras']);
        pedirKw('finmientras', 'la instrucción Mientras');
        return { k: 'mientras', cond: c2, cuerpo: cuerpo, l: l };
      }
      /* Repetir … Hasta Que */
      if (esKw('repetir')) {
        avanzar();
        var cu = bloque(['hasta', 'mientras']);
        if (esKw('mientras')) { avanzar(); var cm = expr(); return { k: 'repetirMientras', cond: cm, cuerpo: cu, l: l }; }
        pedirKw('hasta', 'la instrucción Repetir');
        if (esKw('que')) avanzar();
        var c3 = expr();
        return { k: 'repetir', cond: c3, cuerpo: cu, l: l };
      }
      /* Para v <- a Hasta b Con Paso p Hacer */
      if (esKw('para')) {
        avanzar();
        var v = refDestino();
        if (esOp('<-') || esOp('=')) avanzar(); else throw err(l, 'En Para falta la asignación inicial (<-)');
        var desde = expr();
        pedirKw('hasta', 'la instrucción Para');
        var hastaE = expr();
        var paso = { k: 'num', v: 1 };
        if (esKw('con')) { avanzar(); pedirTxt('paso'); paso = expr(); }
        else if (esTxt('paso')) { avanzar(); paso = expr(); }
        if (esKw('hacer')) avanzar();
        var cp = bloque(['finpara']);
        pedirKw('finpara', 'la instrucción Para');
        return { k: 'para', v: v, desde: desde, hasta: hastaE, paso: paso, cuerpo: cp, l: l };
      }
      /* Segun … Hacer */
      if (esKw('segun')) {
        avanzar();
        var e4 = expr();
        if (esKw('hacer')) avanzar();
        var casos = [], otro = null;
        for (;;) {
          comerNl();
          if (esKw('caso')) {
            avanzar();
            var vals = [expr()];
            while (esOp(',')) { avanzar(); vals.push(expr()); }
            if (esOp(':')) avanzar();
            casos.push({ vals: vals, cuerpo: bloque(['caso', 'de', 'finsegun']) });
            continue;
          }
          if (esKw('de')) {
            avanzar(); pedirTxt('otro'); pedirTxt('modo');
            if (esOp(':')) avanzar();
            otro = bloque(['caso', 'finsegun']);
            continue;
          }
          break;
        }
        pedirKw('finsegun', 'la instrucción Segun');
        return { k: 'segun', e: e4, casos: casos, otro: otro, l: l };
      }
      if (esKw('retornar')) {
        avanzar();
        var ev = (toks[p].t === 'nl' || toks[p].t === 'eof') ? null : expr();
        return { k: 'retornar', e: ev, l: l };
      }
      if (esKw('borrar') || esKw('limpiar')) {
        avanzar(); if (esTxt('pantalla')) avanzar();
        return { k: 'limpiar', l: l };
      }
      /* asignación o llamada a procedimiento */
      if (toks[p].t === 'id') {
        var guard = p;
        var destino = refDestino();
        if (esOp('<-') || esOp('=')) {
          avanzar();
          return { k: 'asignar', dest: destino, e: expr(), l: l };
        }
        p = guard;
        var nm2 = avanzar().v, args2 = [];
        if (esOp('(')) {
          avanzar();
          if (!esOp(')')) { args2.push(expr()); while (esOp(',')) { avanzar(); args2.push(expr()); } }
          pedirOp(')');
        }
        return { k: 'llamar', n: nm2, args: args2, l: l };
      }
      throw err(l, 'No reconozco la instrucción que empieza en "' + muestra(toks[p]) + '"');
    }

    function refDestino() {
      var t = avanzar();
      if (t.t !== 'id') throw err(t.l, 'Esperaba el nombre de una variable');
      var idx = [];
      if (esOp('[')) {
        avanzar(); idx.push(expr());
        while (esOp(',')) { avanzar(); idx.push(expr()); }
        pedirOp(']');
      }
      return { k: 'ref', n: t.v, idx: idx, l: t.l };
    }

    /* --- programa completo --- */
    var prog = { nombre: 'sin_nombre', cuerpo: [], funcs: {} };
    var vistoPrincipal = false;
    for (;;) {
      comerNl();
      if (toks[p].t === 'eof') break;
      if (esKw('algoritmo') || esKw('proceso')) {
        var cual = avanzar().v;
        if (toks[p].t === 'id' || toks[p].t === 'kw') prog.nombre = String(avanzar().v);
        prog.cuerpo = prog.cuerpo.concat(bloque(['finalgoritmo', 'finproceso', 'funcion', 'subproceso']));
        if (esKw('finalgoritmo') || esKw('finproceso')) avanzar();
        else throw err(linea(), 'Falta ' + (cual === 'proceso' ? 'FinProceso' : 'FinAlgoritmo'));
        vistoPrincipal = true;
        continue;
      }
      if (esKw('funcion') || esKw('subproceso')) {
        var tipoF = avanzar().v;
        var retVar = null, nombreF, params = [];
        var a = avanzar();
        if (a.t !== 'id') throw err(a.l, 'La función necesita un nombre');
        if (esOp('<-') || esOp('=')) { avanzar(); retVar = a.v; var b = avanzar(); nombreF = b.v; }
        else nombreF = a.v;
        if (esOp('(')) {
          avanzar();
          while (!esOp(')')) {
            var porRef = false;
            if (esKw('por')) { avanzar(); if (esTxt('referencia')) { porRef = true; } avanzar(); }
            var pn = avanzar();
            if (pn.t !== 'id') throw err(pn.l, 'Parámetro inválido en la función ' + nombreF);
            if (esKw('por')) { avanzar(); if (esTxt('referencia')) { porRef = true; } avanzar(); }
            if (esOp('[')) { avanzar(); while (!esOp(']') && toks[p].t !== 'eof') avanzar(); pedirOp(']'); porRef = true; }
            params.push({ n: pn.v, ref: porRef });
            if (esOp(',')) avanzar();
            else break;
          }
          pedirOp(')');
        }
        var cuerpoF = bloque(['finfuncion', 'finsubproceso', 'finproceso']);
        if (esKw('finfuncion') || esKw('finsubproceso') || esKw('finproceso')) avanzar();
        else throw err(linea(), 'Falta FinFuncion en ' + nombreF);
        prog.funcs[nombreF.toLowerCase()] = {
          nombre: nombreF, retVar: retVar, params: params, cuerpo: cuerpoF, tipo: tipoF
        };
        continue;
      }
      /* Código suelto sin cabecera Algoritmo: lo tomamos como programa principal. */
      prog.cuerpo = prog.cuerpo.concat(bloque(['finalgoritmo', 'finproceso', 'funcion', 'subproceso']));
      if (esKw('finalgoritmo') || esKw('finproceso')) { avanzar(); vistoPrincipal = true; }
    }
    prog.explicito = vistoPrincipal;
    return prog;
  }

  /* ------------------------------------------------------------
     3. EJECUCIÓN
     ------------------------------------------------------------ */
  var MAX_PASOS = 4000000;
  var MAX_SALIDA = 6000;

  function fmt(v) {
    if (typeof v === 'boolean') return v ? 'VERDADERO' : 'FALSO';
    if (typeof v === 'number') {
      if (!isFinite(v)) return String(v);
      if (Number.isInteger(v)) return String(v);
      return String(parseFloat(v.toFixed(10)));
    }
    if (v === undefined || v === null) return '';
    if (v && v.__arr) return '[arreglo]';
    return String(v);
  }

  function ejecutar(src, entradas, opciones) {
    opciones = opciones || {};
    var prog = parse(src);
    var salida = [], pasos = 0, colaEntrada = (entradas || []).slice(), pedidas = [];
    var lineaActual = 0;

    function out(txt, salto) {
      if (salida.length === 0) salida.push('');
      salida[salida.length - 1] += txt;
      if (salto) salida.push('');
      if (salida.length > MAX_SALIDA) throw err(lineaActual, 'Demasiada salida (más de ' + MAX_SALIDA + ' líneas). ¿Un bucle que nunca termina?');
    }

    function Ambito(padre) { this.v = {}; this.padre = padre || null; }
    Ambito.prototype.tiene = function (n) { return Object.prototype.hasOwnProperty.call(this.v, n.toLowerCase()); };
    Ambito.prototype.get = function (n) { return this.v[n.toLowerCase()]; };
    Ambito.prototype.set = function (n, val) { this.v[n.toLowerCase()] = val; };

    var global = new Ambito(null);

    function nuevoArreglo(dims) {
      return { __arr: true, dims: dims, v: {} };
    }
    function clave(ix) { return ix.join('|'); }

    function leerRef(ref, amb) {
      var nom = ref.n.toLowerCase();
      var cont = amb.tiene(nom) ? amb : (global.tiene(nom) ? global : null);
      if (!cont) throw err(ref.l, 'La variable "' + ref.n + '" se usa antes de tener un valor');
      var val = cont.get(nom);
      if (ref.idx.length) {
        if (!val || !val.__arr) throw err(ref.l, '"' + ref.n + '" no es un arreglo (falta Dimension)');
        var ix = ref.idx.map(function (e) { return idxNum(ev(e, amb), ref); });
        chequeaRango(val, ix, ref);
        var r = val.v[clave(ix)];
        if (r === undefined) throw err(ref.l, 'La casilla ' + ref.n + '[' + ix.join(',') + '] todavía no tiene valor');
        return r;
      }
      if (val && val.__arr) return val;
      if (val === undefined) throw err(ref.l, 'La variable "' + ref.n + '" se usa antes de tener un valor');
      return val;
    }
    function idxNum(v, ref) {
      var n = Number(v);
      if (!isFinite(n) || !Number.isInteger(n)) throw err(ref.l, 'El índice de "' + ref.n + '" debe ser un número entero');
      return n;
    }
    function chequeaRango(arr, ix, ref) {
      if (ix.length !== arr.dims.length)
        throw err(ref.l, '"' + ref.n + '" tiene ' + arr.dims.length + ' dimensión(es) y lo estás usando con ' + ix.length);
      for (var d = 0; d < ix.length; d++) {
        if (ix[d] < 1 || ix[d] > arr.dims[d])
          throw err(ref.l, 'Índice fuera de rango: ' + ref.n + '[' + ix.join(',') + ']; el válido va de 1 a ' + arr.dims[d]);
      }
    }
    function escribirRef(ref, val, amb) {
      var nom = ref.n.toLowerCase();
      if (ref.idx.length) {
        var cont = amb.tiene(nom) ? amb : (global.tiene(nom) ? global : null);
        if (!cont) throw err(ref.l, 'Primero declara el arreglo con Dimension ' + ref.n + '[...]');
        var arr = cont.get(nom);
        if (!arr || !arr.__arr) throw err(ref.l, '"' + ref.n + '" no es un arreglo');
        var ix = ref.idx.map(function (e) { return idxNum(ev(e, amb), ref); });
        chequeaRango(arr, ix, ref);
        arr.v[clave(ix)] = val;
        return;
      }
      (amb.tiene(nom) || !global.tiene(nom) ? amb : global).set(nom, val);
    }

    /* --- funciones internas --- */
    var INTERNAS = {
      longitud: function (a) { return String(a).length; },
      largo: function (a) { return String(a).length; },
      mayusculas: function (a) { return String(a).toUpperCase(); },
      minusculas: function (a) { return String(a).toLowerCase(); },
      subcadena: function (a, d, h) { return String(a).substring(d - 1, h); },
      concatenar: function (a, b) { return String(a) + String(b); },
      convertiranumero: function (a) { var n = parseFloat(a); return isNaN(n) ? 0 : n; },
      convertiratexto: function (a) { return fmt(a); },
      raiz: function (a) { return Math.sqrt(a); },
      abs: function (a) { return Math.abs(a); },
      trunc: function (a) { return Math.trunc(a); },
      redon: function (a) { return Math.round(a); },
      ln: function (a) { return Math.log(a); },
      exp: function (a) { return Math.exp(a); },
      sen: function (a) { return Math.sin(a); },
      cos: function (a) { return Math.cos(a); },
      tan: function (a) { return Math.tan(a); },
      pi: function () { return Math.PI; },
      aleatorio: function (a, b) {
        if (b === undefined) return Math.floor(Math.random() * (a + 1));
        return a + Math.floor(Math.random() * (b - a + 1));
      },
      azar: function (a) { return Math.floor(Math.random() * a); }
    };

    function numerico(v, l, op) {
      if (typeof v === 'boolean') return v ? 1 : 0;
      var n = typeof v === 'number' ? v : parseFloat(v);
      if (typeof v === 'string' && isNaN(n)) throw err(l, 'No puedo usar el texto "' + v + '" en la operación ' + op);
      return n;
    }

    function ev(e, amb) {
      switch (e.k) {
        case 'num': case 'str': case 'bool': return e.v;
        case 'ref': return leerRef(e, amb);
        case 'un':
          if (e.op === '-') return -numerico(ev(e.a, amb), e.a.l, '-');
          return !verdad(ev(e.a, amb));
        case 'bin': {
          var op = e.op;
          if (op === 'y') return verdad(ev(e.a, amb)) && verdad(ev(e.b, amb));
          if (op === 'o') return verdad(ev(e.a, amb)) || verdad(ev(e.b, amb));
          var a = ev(e.a, amb), b = ev(e.b, amb);
          switch (op) {
            case '+':
              if (typeof a === 'string' || typeof b === 'string') return fmt(a) + fmt(b);
              return numerico(a, e.a.l, '+') + numerico(b, e.b.l, '+');
            case '-': return numerico(a, e.a.l, '-') - numerico(b, e.b.l, '-');
            case '*': return numerico(a, e.a.l, '*') * numerico(b, e.b.l, '*');
            case '/': {
              var d = numerico(b, e.b.l, '/');
              if (d === 0) throw err(e.b.l || 0, 'División entre cero');
              return numerico(a, e.a.l, '/') / d;
            }
            case 'mod': {
              var m = numerico(b, e.b.l, 'MOD');
              if (m === 0) throw err(e.b.l || 0, 'MOD entre cero');
              return numerico(a, e.a.l, 'MOD') % m;
            }
            case '^': return Math.pow(numerico(a, e.a.l, '^'), numerico(b, e.b.l, '^'));
            case '=': return igual(a, b);
            case '<>': return !igual(a, b);
            case '<': return cmp(a, b) < 0;
            case '>': return cmp(a, b) > 0;
            case '<=': return cmp(a, b) <= 0;
            case '>=': return cmp(a, b) >= 0;
          }
          throw err(0, 'Operador desconocido ' + op);
        }
        case 'call': {
          var ln = e.n.toLowerCase();
          if (prog.funcs[ln]) return invocar(prog.funcs[ln], e, amb);
          if (INTERNAS[ln]) {
            var args = e.args.map(function (x) { return ev(x, amb); });
            return INTERNAS[ln].apply(null, args);
          }
          throw err(e.l, 'No existe la función "' + e.n + '"');
        }
      }
      throw err(0, 'Expresión no soportada');
    }

    function igual(a, b) {
      if (typeof a === 'number' || typeof b === 'number') {
        if (typeof a === 'boolean' || typeof b === 'boolean') return verdad(a) === verdad(b);
        if (typeof a === 'string' || typeof b === 'string') {
          var na = parseFloat(a), nb = parseFloat(b);
          if (!isNaN(na) && !isNaN(nb)) return na === nb;
          return String(a) === String(b);
        }
        return a === b;
      }
      if (typeof a === 'boolean' || typeof b === 'boolean') return verdad(a) === verdad(b);
      return String(a) === String(b);
    }
    function cmp(a, b) {
      if (typeof a === 'string' && typeof b === 'string' && (isNaN(parseFloat(a)) || isNaN(parseFloat(b))))
        return a < b ? -1 : (a > b ? 1 : 0);
      var x = numerico(a, 0, 'comparación'), y = numerico(b, 0, 'comparación');
      return x < y ? -1 : (x > y ? 1 : 0);
    }
    function verdad(v) {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'number') return v !== 0;
      var s = String(v).toLowerCase();
      if (s === 'verdadero' || s === 'si' || s === 'sí' || s === 'true') return true;
      if (s === 'falso' || s === 'no' || s === 'false' || s === '') return false;
      return true;
    }

    var SALIR = { ret: true };

    function invocar(f, llamada, ambLlamador) {
      if (llamada.args.length !== f.params.length)
        throw err(llamada.l, 'La función "' + f.nombre + '" espera ' + f.params.length +
          ' parámetro(s) y recibió ' + llamada.args.length);
      var amb = new Ambito(null);
      var porRef = [];
      f.params.forEach(function (pm, i) {
        var arg = llamada.args[i];
        var val = ev(arg, ambLlamador);
        if (pm.ref && arg.k === 'ref' && !arg.idx.length) porRef.push({ pm: pm, destino: arg });
        if (val && val.__arr) amb.set(pm.n, val);           // los arreglos pasan por referencia
        else amb.set(pm.n, val);
      });
      var r = correr(f.cuerpo, amb);
      porRef.forEach(function (x) { escribirRef(x.destino, amb.get(x.pm.n), ambLlamador); });
      var valor;
      if (r === SALIR && amb.tiene('__ret')) valor = amb.get('__ret');
      else if (f.retVar && amb.tiene(f.retVar)) valor = amb.get(f.retVar);
      else if (amb.tiene('__ret')) valor = amb.get('__ret');
      else valor = undefined;
      if (valor === undefined && f.retVar)
        throw err(llamada.l, 'La función "' + f.nombre + '" no asignó un valor a "' + f.retVar + '"');
      return valor;
    }

    function correr(lista, amb) {
      for (var i = 0; i < lista.length; i++) {
        var r = paso(lista[i], amb);
        if (r === SALIR) return SALIR;
      }
      return null;
    }

    function paso(st, amb) {
      if (++pasos > MAX_PASOS) throw err(st.l, 'El programa hizo demasiadas operaciones. Revisa si algún bucle nunca termina.');
      lineaActual = st.l;
      switch (st.k) {
        case 'escribir': {
          var txt = st.xs.map(function (x) { return fmt(ev(x, amb)); }).join('');
          out(txt, st.salto);
          return null;
        }
        case 'leer': {
          for (var i = 0; i < st.ds.length; i++) {
            if (!colaEntrada.length)
              throw err(st.l, 'El programa pidió un dato con Leer y no quedan entradas. Agrega una línea en el panel "Entradas".');
            var crudo = String(colaEntrada.shift()).trim();
            pedidas.push(crudo);
            var n = parseFloat(crudo);
            var val = (crudo !== '' && !isNaN(n) && /^[-+]?[0-9]*\.?[0-9]+$/.test(crudo)) ? n : crudo;
            escribirRef(st.ds[i], val, amb);
          }
          return null;
        }
        case 'asignar': escribirRef(st.dest, ev(st.e, amb), amb); return null;
        case 'definir': {
          var inic = { entero: 0, enteros: 0, real: 0, reales: 0, logico: false, caracter: '', cadena: '', texto: '' };
          st.ns.forEach(function (n) {
            if (!amb.tiene(n)) amb.set(n, inic[st.tipo] !== undefined ? inic[st.tipo] : 0);
          });
          return null;
        }
        case 'dimension': {
          st.arrs.forEach(function (a) {
            var dims = a.dims.map(function (d) {
              var v = Number(ev(d, amb));
              if (!isFinite(v) || v < 1) throw err(st.l, 'El tamaño de ' + a.n + ' debe ser un entero positivo');
              return Math.trunc(v);
            });
            var arr = nuevoArreglo(dims);
            var total = dims.reduce(function (x, y) { return x * y; }, 1);
            if (total > 500000) throw err(st.l, 'Arreglo demasiado grande (' + total + ' casillas)');
            llenarCeros(arr, dims, []);
            amb.set(a.n, arr);
          });
          return null;
        }
        case 'si': return correr(verdad(ev(st.cond, amb)) ? st.luego : st.sino, amb);
        case 'mientras': {
          while (verdad(ev(st.cond, amb))) {
            if (++pasos > MAX_PASOS) throw err(st.l, 'Bucle Mientras sin fin: la condición nunca se vuelve falsa.');
            if (correr(st.cuerpo, amb) === SALIR) return SALIR;
          }
          return null;
        }
        case 'repetir': {
          do {
            if (++pasos > MAX_PASOS) throw err(st.l, 'Bucle Repetir sin fin: la condición nunca se cumple.');
            if (correr(st.cuerpo, amb) === SALIR) return SALIR;
          } while (!verdad(ev(st.cond, amb)));
          return null;
        }
        case 'repetirMientras': {
          do {
            if (++pasos > MAX_PASOS) throw err(st.l, 'Bucle sin fin.');
            if (correr(st.cuerpo, amb) === SALIR) return SALIR;
          } while (verdad(ev(st.cond, amb)));
          return null;
        }
        case 'para': {
          var pasoV = numerico(ev(st.paso, amb), st.l, 'paso');
          if (pasoV === 0) throw err(st.l, 'El paso del Para no puede ser 0');
          var ini = numerico(ev(st.desde, amb), st.l, 'desde');
          var fin = numerico(ev(st.hasta, amb), st.l, 'hasta');
          escribirRef(st.v, ini, amb);
          for (;;) {
            var act = numerico(leerRef(st.v, amb), st.l, 'para');
            if (pasoV > 0 ? act > fin : act < fin) break;
            if (++pasos > MAX_PASOS) throw err(st.l, 'Bucle Para demasiado largo.');
            if (correr(st.cuerpo, amb) === SALIR) return SALIR;
            act = numerico(leerRef(st.v, amb), st.l, 'para');
            escribirRef(st.v, act + pasoV, amb);
          }
          return null;
        }
        case 'segun': {
          var v2 = ev(st.e, amb);
          for (var ci = 0; ci < st.casos.length; ci++) {
            var cs = st.casos[ci];
            for (var vi = 0; vi < cs.vals.length; vi++) {
              if (igual(v2, ev(cs.vals[vi], amb))) return correr(cs.cuerpo, amb);
            }
          }
          if (st.otro) return correr(st.otro, amb);
          return null;
        }
        case 'retornar': {
          if (st.e) amb.set('__ret', ev(st.e, amb));
          return SALIR;
        }
        case 'llamar': {
          var ln2 = st.n.toLowerCase();
          if (prog.funcs[ln2]) { invocar(prog.funcs[ln2], { n: st.n, args: st.args, l: st.l }, amb); return null; }
          if (INTERNAS[ln2]) { INTERNAS[ln2].apply(null, st.args.map(function (x) { return ev(x, amb); })); return null; }
          throw err(st.l, 'No existe el subproceso o función "' + st.n + '"');
        }
        case 'limpiar': salida.length = 0; return null;
      }
      throw err(st.l, 'Instrucción no soportada: ' + st.k);
    }

    function llenarCeros(arr, dims, pre) {
      if (pre.length === dims.length) { arr.v[clave(pre)] = 0; return; }
      for (var i = 1; i <= dims[pre.length]; i++) llenarCeros(arr, dims, pre.concat(i));
    }

    correr(prog.cuerpo, global);
    if (salida.length && salida[salida.length - 1] === '') salida.pop();
    return { salida: salida, pasos: pasos, prog: prog, vars: global.v, pedidas: pedidas };
  }

  return { parse: parse, ejecutar: ejecutar, lexer: lexer, fmt: fmt };
})();
