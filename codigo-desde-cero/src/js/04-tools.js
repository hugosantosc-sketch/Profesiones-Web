/* ============================================================
   04-tools.js — Laboratorio: intérprete, conversor de bases,
   tablas de verdad, consola JS, complemento a dos, IEEE-754,
   codificación de texto y comparador de complejidades.
   ============================================================ */
var Lab = (function () {
  'use strict';
  var esc = CDC.esc;

  var EJEMPLOS = {
    'hola': 'Algoritmo HolaMundo\n\tEscribir "¡Hola, mundo!"\nFinAlgoritmo',
    'suma': 'Algoritmo SumaDeDos\n\tDefinir a, b, total Como Real\n\tEscribir "Escribe el primer número:"\n\tLeer a\n\tEscribir "Escribe el segundo número:"\n\tLeer b\n\ttotal <- a + b\n\tEscribir "La suma es ", total\nFinAlgoritmo',
    'mayor': 'Algoritmo MayorDeTres\n\tDefinir a, b, c, mayor Como Real\n\tLeer a\n\tLeer b\n\tLeer c\n\tmayor <- a\n\tSi b > mayor Entonces\n\t\tmayor <- b\n\tFinSi\n\tSi c > mayor Entonces\n\t\tmayor <- c\n\tFinSi\n\tEscribir "El mayor es ", mayor\nFinAlgoritmo',
    'tabla': 'Algoritmo TablaDeMultiplicar\n\tDefinir n, i Como Entero\n\tEscribir "¿De qué número quieres la tabla?"\n\tLeer n\n\tPara i <- 1 Hasta 12 Con Paso 1 Hacer\n\t\tEscribir n, " x ", i, " = ", n * i\n\tFinPara\nFinAlgoritmo',
    'promedio': 'Algoritmo PromedioDeNotas\n\tDefinir n, i Como Entero\n\tDefinir nota, suma, prom Como Real\n\tEscribir "¿Cuántas notas vas a ingresar?"\n\tLeer n\n\tsuma <- 0\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir "Nota ", i, ":"\n\t\tLeer nota\n\t\tsuma <- suma + nota\n\tFinPara\n\tSi n > 0 Entonces\n\t\tprom <- suma / n\n\t\tEscribir "Promedio: ", prom\n\t\tSi prom >= 11 Entonces\n\t\t\tEscribir "Aprobado"\n\t\tSino\n\t\t\tEscribir "Desaprobado"\n\t\tFinSi\n\tSino\n\t\tEscribir "No hay notas para promediar"\n\tFinSi\nFinAlgoritmo',
    'adivina': 'Algoritmo AdivinaConCentinela\n\tDefinir secreto, intento, intentos Como Entero\n\tsecreto <- 7\n\tintentos <- 0\n\tRepetir\n\t\tEscribir "Adivina el número (1 a 10):"\n\t\tLeer intento\n\t\tintentos <- intentos + 1\n\t\tSi intento > secreto Entonces\n\t\t\tEscribir "Muy alto"\n\t\tSino\n\t\t\tSi intento < secreto Entonces\n\t\t\t\tEscribir "Muy bajo"\n\t\t\tFinSi\n\t\tFinSi\n\tHasta Que intento = secreto\n\tEscribir "¡Correcto en ", intentos, " intento(s)!"\nFinAlgoritmo',
    'factorial': 'Funcion r <- factorial(n)\n\tSi n <= 1 Entonces\n\t\tr <- 1\n\tSino\n\t\tr <- n * factorial(n - 1)\n\tFinSi\nFinFuncion\n\nAlgoritmo PruebaFactorial\n\tDefinir i Como Entero\n\tPara i <- 0 Hasta 10 Con Paso 1 Hacer\n\t\tEscribir i, "! = ", factorial(i)\n\tFinPara\nFinAlgoritmo',
    'arreglo': 'Algoritmo MaximoDeUnArreglo\n\tDefinir i, n Como Entero\n\tDimension datos[8]\n\tn <- 8\n\tdatos[1] <- 14\n\tdatos[2] <- 3\n\tdatos[3] <- 27\n\tdatos[4] <- 9\n\tdatos[5] <- 27\n\tdatos[6] <- 1\n\tdatos[7] <- 18\n\tdatos[8] <- 6\n\tDefinir mayor, posicion Como Entero\n\tmayor <- datos[1]\n\tposicion <- 1\n\tPara i <- 2 Hasta n Con Paso 1 Hacer\n\t\tSi datos[i] > mayor Entonces\n\t\t\tmayor <- datos[i]\n\t\t\tposicion <- i\n\t\tFinSi\n\tFinPara\n\tEscribir "Mayor: ", mayor, " en la posición ", posicion\nFinAlgoritmo',
    'burbuja': 'Algoritmo OrdenamientoBurbuja\n\tDefinir i, j, temp, n Como Entero\n\tDimension a[6]\n\tn <- 6\n\ta[1] <- 5\n\ta[2] <- 2\n\ta[3] <- 9\n\ta[4] <- 1\n\ta[5] <- 7\n\ta[6] <- 3\n\tPara i <- 1 Hasta n - 1 Con Paso 1 Hacer\n\t\tPara j <- 1 Hasta n - i Con Paso 1 Hacer\n\t\t\tSi a[j] > a[j + 1] Entonces\n\t\t\t\ttemp <- a[j]\n\t\t\t\ta[j] <- a[j + 1]\n\t\t\t\ta[j + 1] <- temp\n\t\t\tFinSi\n\t\tFinPara\n\tFinPara\n\tEscribir "Arreglo ordenado:"\n\tPara i <- 1 Hasta n Con Paso 1 Hacer\n\t\tEscribir Sin Saltar a[i], " "\n\tFinPara\nFinAlgoritmo'
  };

  var ENTRADAS_EJ = {
    suma: '8\n5', mayor: '12\n47\n33', tabla: '7',
    promedio: '4\n14\n11\n8\n16', adivina: '5\n9\n7'
  };

  /* ---------------- 1. Intérprete de pseudocódigo ---------------- */
  function htmlPseudo() {
    var opts = Object.keys(EJEMPLOS).map(function (k) {
      var nombres = { hola: 'Hola mundo', suma: 'Suma de dos números', mayor: 'El mayor de tres',
        tabla: 'Tabla de multiplicar (Para)', promedio: 'Promedio de notas', adivina: 'Adivina el número (Repetir)',
        factorial: 'Factorial recursivo (Funcion)', arreglo: 'Máximo de un arreglo', burbuja: 'Ordenamiento burbuja' };
      return '<option value="' + k + '">' + nombres[k] + '</option>';
    }).join('');
    return '' +
      '<div class="tool">' +
      '  <div class="row">' +
      '    <select id="lpEj" aria-label="Ejemplos" style="flex:1 1 230px;min-width:0">' + opts + '</select>' +
      '    <button class="btn btn--sm" id="lpCargar" type="button">Cargar ejemplo</button>' +
      '    <button class="btn btn--sm btn--ghost" id="lpFmt" type="button">Indentar</button>' +
      '  </div>' +
      '  <div class="split split--2">' +
      '    <div><label for="lpSrc">Pseudocódigo</label>' +
      '      <textarea id="lpSrc" spellcheck="false" style="min-height:300px"></textarea></div>' +
      '    <div><label for="lpIn">Entradas (una por línea, para cada <code>Leer</code>)</label>' +
      '      <textarea id="lpIn" spellcheck="false" style="min-height:300px"></textarea></div>' +
      '  </div>' +
      '  <div class="row">' +
      '    <button class="btn" id="lpRun" type="button">▶ Ejecutar</button>' +
      '    <button class="btn btn--ghost" id="lpFlow" type="button">Generar diagrama de flujo</button>' +
      '    <button class="btn btn--ghost" id="lpClear" type="button">Limpiar salida</button>' +
      '  </div>' +
      '  <div><label>Salida</label><div class="console" id="lpOut">Pulsa <b>Ejecutar</b> para ver la salida del algoritmo.</div></div>' +
      '  <div id="lpVars"></div>' +
      '  <div id="lpSvg"></div>' +
      '</div>';
  }

  function montarPseudo(root) {
    var $ = function (id) { return root.querySelector('#' + id); };
    var src = $('lpSrc'), ent = $('lpIn'), out = $('lpOut'), svg = $('lpSvg'), vars = $('lpVars');
    var guardado = null;
    try { guardado = localStorage.getItem('cdc.lab.pseudo'); } catch (e) { }
    src.value = guardado || EJEMPLOS.promedio;
    ent.value = (guardado ? (function () { try { return localStorage.getItem('cdc.lab.ent') || ''; } catch (e) { return ''; } })() : ENTRADAS_EJ.promedio);
    src.addEventListener('input', function () {
      try { localStorage.setItem('cdc.lab.pseudo', src.value); } catch (e) { }
    });
    ent.addEventListener('input', function () {
      try { localStorage.setItem('cdc.lab.ent', ent.value); } catch (e) { }
    });

    $('lpCargar').addEventListener('click', function () {
      var k = $('lpEj').value;
      src.value = EJEMPLOS[k];
      ent.value = ENTRADAS_EJ[k] || '';
      try { localStorage.setItem('cdc.lab.pseudo', src.value); localStorage.setItem('cdc.lab.ent', ent.value); } catch (e) { }
      out.textContent = 'Ejemplo cargado. Pulsa Ejecutar.';
      svg.innerHTML = ''; vars.innerHTML = '';
    });

    $('lpFmt').addEventListener('click', function () {
      src.value = indentar(src.value);
      try { localStorage.setItem('cdc.lab.pseudo', src.value); } catch (e) { }
    });

    $('lpClear').addEventListener('click', function () {
      out.textContent = ''; svg.innerHTML = ''; vars.innerHTML = '';
    });

    $('lpRun').addEventListener('click', function () {
      var entradas = ent.value.split('\n').filter(function (l, i, arr) { return !(l === '' && i === arr.length - 1); });
      var t0 = (window.performance && performance.now) ? performance.now() : Date.now();
      try {
        var r = Pseudo.ejecutar(src.value, entradas);
        var t1 = (window.performance && performance.now) ? performance.now() : Date.now();
        out.innerHTML = (r.salida.length ? esc(r.salida.join('\n')) : '<span class="i">(el algoritmo no mostró nada)</span>') +
          '\n<span class="ok">— terminó bien · ' + r.pasos + ' operaciones · ' + Math.max(1, Math.round(t1 - t0)) + ' ms</span>';
        vars.innerHTML = tablaVars(r.vars);
      } catch (e) {
        out.innerHTML = '<span class="e">✖ ' + (e.linea ? 'Línea ' + e.linea + ': ' : '') + esc(e.message) + '</span>';
        vars.innerHTML = '';
      }
    });

    $('lpFlow').addEventListener('click', function () {
      try {
        svg.innerHTML = '<label style="margin-top:6px">Diagrama de flujo generado</label>' +
          '<div class="figure">' + Flujo.dibujar(src.value) + '</div>';
      } catch (e) {
        svg.innerHTML = '<div class="note note--warn"><div class="note__t">No pude dibujar el diagrama</div>' +
          (e.linea ? 'Línea ' + e.linea + ': ' : '') + esc(e.message) + '</div>';
      }
    });
  }

  function tablaVars(v) {
    var filas = Object.keys(v).filter(function (k) { return k !== '__ret'; }).map(function (k) {
      var val = v[k];
      if (val && val.__arr) {
        var items = Object.keys(val.v).slice(0, 40).map(function (ix) {
          return '[' + ix.replace(/\|/g, ',') + ']=' + Pseudo.fmt(val.v[ix]);
        }).join('  ');
        return [k, 'arreglo ' + val.dims.join('×'), '<code>' + esc(items) + '</code>'];
      }
      return [k, typeof val === 'number' ? 'número' : (typeof val === 'boolean' ? 'lógico' : 'texto'),
        '<code>' + esc(Pseudo.fmt(val)) + '</code>'];
    });
    if (!filas.length) return '';
    return '<label style="margin-top:6px">Estado final de las variables</label>' +
      CDC.tabla(['Variable', 'Tipo', 'Valor'], filas,
        'Esta tabla es tu "prueba de escritorio" automática: revisa que cada variable terminó con el valor que esperabas.');
  }

  function indentar(txt) {
    var abre = /^(si|mientras|para|repetir|segun|funcion|subproceso|algoritmo|proceso|caso|de otro modo)\b/i;
    var cierra = /^(finsi|finmientras|finpara|finsegun|finfuncion|finsubproceso|finalgoritmo|finproceso|hasta|sino|caso|de otro modo)\b/i;
    var nivel = 0;
    return txt.split('\n').map(function (l) {
      var t = l.trim();
      if (!t) return '';
      if (cierra.test(t)) nivel = Math.max(0, nivel - 1);
      var linea = new Array(nivel + 1).join('\t') + t;
      if (abre.test(t) && !/^finsi|^finmientras/i.test(t)) nivel++;
      if (/^sino\b/i.test(t) || /^caso\b/i.test(t) || /^de otro modo/i.test(t)) nivel++;
      if (/^hasta\b/i.test(t)) nivel = Math.max(0, nivel - 0);
      return linea;
    }).join('\n');
  }

  /* ---------------- 2. Conversor de bases ---------------- */
  function htmlBases() {
    return '<div class="tool">' +
      '<div class="row">' +
      '<div style="flex:1 1 160px"><label for="cbVal">Valor</label><input id="cbVal" type="text" value="214"></div>' +
      '<div style="flex:0 1 150px"><label for="cbBase">Base de origen</label>' +
      '<select id="cbBase"><option value="10" selected>10 · decimal</option><option value="2">2 · binario</option>' +
      '<option value="8">8 · octal</option><option value="16">16 · hexadecimal</option></select></div>' +
      '</div><div id="cbOut"></div></div>';
  }
  function montarBases(root) {
    var val = root.querySelector('#cbVal'), base = root.querySelector('#cbBase'), out = root.querySelector('#cbOut');
    function render() {
      var b = parseInt(base.value, 10);
      var s = val.value.trim().replace(/\s/g, '').toUpperCase();
      if (!s) { out.innerHTML = ''; return; }
      var validos = '0123456789ABCDEF'.slice(0, b);
      for (var i = 0; i < s.length; i++) {
        if (validos.indexOf(s[i]) < 0) {
          out.innerHTML = '<div class="note note--warn">El dígito <code>' + esc(s[i]) +
            '</code> no existe en base ' + b + '. Dígitos válidos: <code>' + validos + '</code>.</div>';
          return;
        }
      }
      var n = parseInt(s, b);
      if (!isFinite(n)) { out.innerHTML = '<div class="note note--warn">Número demasiado grande.</div>'; return; }
      var filas = [
        ['Binario (base 2)', '<code>' + n.toString(2) + '</code>', n.toString(2).length + ' bits'],
        ['Octal (base 8)', '<code>' + n.toString(8) + '</code>', ''],
        ['Decimal (base 10)', '<code>' + n + '</code>', ''],
        ['Hexadecimal (base 16)', '<code>' + n.toString(16).toUpperCase() + '</code>', ''],
        ['BCD (cada dígito en 4 bits)', '<code>' + String(n).split('').map(function (d) {
          return ('0000' + parseInt(d, 10).toString(2)).slice(-4);
        }).join(' ') + '</code>', '']
      ];
      var html = CDC.tabla(['Representación', 'Valor', 'Nota'], filas);
      // desarrollo posicional
      var bin = n.toString(2);
      var suma = bin.split('').map(function (d, i) {
        var p = bin.length - 1 - i;
        return d === '1' ? '2<sup>' + p + '</sup>' : null;
      }).filter(Boolean).join(' + ') || '0';
      html += '<div class="note" style="margin-top:12px"><div class="note__t">Cómo se forma el número</div>' +
        '<p><b>Suma de potencias:</b> ' + suma + ' = ' + n + '</p>' +
        '<p style="margin-top:6px"><b>Divisiones sucesivas entre 2</b> (lee los restos de abajo hacia arriba):</p>' +
        '<pre style="margin-top:6px">' + divisiones(n, 2) + '</pre>' +
        (n <= 65535 ? '<p style="margin-top:6px"><b>Agrupando el binario de 4 en 4</b> obtienes el hexadecimal directamente: <code>' +
          agrupar(('0000000000000000' + bin).slice(-Math.ceil(bin.length / 4) * 4), 4) + '</code> → <code>' +
          n.toString(16).toUpperCase() + '</code></p>' : '') +
        '</div>';
      out.innerHTML = html;
    }
    function divisiones(n, b) {
      var l = [], x = n, guard = 0;
      if (x === 0) return '0 ÷ 2 = 0, resto 0';
      while (x > 0 && guard++ < 64) { l.push(x + ' ÷ ' + b + ' = ' + Math.floor(x / b) + ', resto ' + (x % b)); x = Math.floor(x / b); }
      return esc(l.join('\n'));
    }
    function agrupar(s, k) { return s.replace(new RegExp('(.{' + k + '})', 'g'), '$1 ').trim(); }
    val.addEventListener('input', render);
    base.addEventListener('change', render);
    render();
  }

  /* ---------------- 3. Tablas de verdad ---------------- */
  function htmlVerdad() {
    return '<div class="tool">' +
      '<div><label for="tvExp">Expresión lógica (usa variables A, B, C y los operadores <code>Y</code>, <code>O</code>, <code>NO</code>, paréntesis)</label>' +
      '<input id="tvExp" type="text" value="(A Y B) O (NO C)"></div>' +
      '<div class="row">' +
      ['A Y B', 'A O B', 'NO A', 'A Y NO B', '(A O B) Y NO (A Y B)', '(A Y B) O (A Y C)'].map(function (e) {
        return '<button class="chip" type="button" data-exp="' + esc(e) + '">' + esc(e) + '</button>';
      }).join('') + '</div>' +
      '<div id="tvOut"></div></div>';
  }
  function montarVerdad(root) {
    var inp = root.querySelector('#tvExp'), out = root.querySelector('#tvOut');
    root.querySelectorAll('[data-exp]').forEach(function (b) {
      b.addEventListener('click', function () { inp.value = b.getAttribute('data-exp'); render(); });
    });
    function render() {
      var e = inp.value;
      var usadas = ['A', 'B', 'C'].filter(function (v) { return new RegExp('\\b' + v + '\\b').test(e); });
      if (!usadas.length) { out.innerHTML = '<div class="note note--warn">Usa al menos una variable A, B o C.</div>'; return; }
      var filas = [], n = Math.pow(2, usadas.length), unos = 0;
      for (var i = 0; i < n; i++) {
        var vals = {};
        usadas.forEach(function (v, k) { vals[v] = !!(i >> (usadas.length - 1 - k) & 1); });
        var src = 'Algoritmo T\n';
        usadas.forEach(function (v) { src += v + ' <- ' + (vals[v] ? 'Verdadero' : 'Falso') + '\n'; });
        src += 'Escribir (' + e + ')\nFinAlgoritmo';
        var r;
        try { r = Pseudo.ejecutar(src, []).salida.join(''); }
        catch (err) { out.innerHTML = '<div class="note note--warn">No pude evaluar la expresión: ' + esc(err.message) + '</div>'; return; }
        if (r === 'VERDADERO') unos++;
        filas.push(usadas.map(function (v) { return vals[v] ? '1' : '0'; })
          .concat(['<b style="color:var(--' + (r === 'VERDADERO' ? 'ok' : 'err') + ')">' + (r === 'VERDADERO' ? '1' : '0') + '</b>']));
      }
      out.innerHTML = CDC.tabla(usadas.map(function (v) { return '#' + v; }).concat(['#Resultado']), filas,
        unos + ' de ' + n + ' combinaciones dan verdadero. Una expresión que da 1 en todas las filas es una tautología; si da 0 en todas, es una contradicción.');
    }
    inp.addEventListener('input', render);
    render();
  }

  /* ---------------- 4. Bits: complemento a dos e IEEE-754 ---------------- */
  function htmlBits() {
    return '<div class="tool">' +
      '<div class="row">' +
      '<div style="flex:1 1 150px"><label for="bcNum">Número entero (puede ser negativo)</label><input id="bcNum" type="text" value="-37"></div>' +
      '<div style="flex:0 1 130px"><label for="bcBits">Tamaño</label><select id="bcBits">' +
      '<option>8</option><option selected>16</option><option>32</option></select></div></div>' +
      '<div id="bcOut"></div>' +
      '<hr style="border:0;border-top:1px solid var(--line);margin:6px 0">' +
      '<div><label for="bfNum">Número real (para ver su forma IEEE-754 de 64 bits)</label><input id="bfNum" type="text" value="0.1"></div>' +
      '<div id="bfOut"></div></div>';
  }
  function montarBits(root) {
    var num = root.querySelector('#bcNum'), bits = root.querySelector('#bcBits'), out = root.querySelector('#bcOut');
    var fnum = root.querySelector('#bfNum'), fout = root.querySelector('#bfOut');
    function renderEnt() {
      var n = parseInt(num.value, 10), w = parseInt(bits.value, 10);
      if (isNaN(n)) { out.innerHTML = '<div class="note note--warn">Escribe un número entero.</div>'; return; }
      var min = -Math.pow(2, w - 1), max = Math.pow(2, w - 1) - 1;
      if (n < min || n > max) {
        out.innerHTML = '<div class="note note--warn">Con ' + w + ' bits y signo solo caben los valores de ' +
          min + ' a ' + max + '. Esto es exactamente un <b>desbordamiento</b> (overflow).</div>';
        return;
      }
      var mask = w === 32 ? 0xFFFFFFFF : (Math.pow(2, w) - 1);
      var crudo = ((n < 0 ? Math.pow(2, w) + n : n)) >>> 0;
      var b = ('0'.repeat(w) + crudo.toString(2)).slice(-w);
      var pasos = '';
      if (n < 0) {
        var mag = ('0'.repeat(w) + Math.abs(n).toString(2)).slice(-w);
        var inv = mag.split('').map(function (c) { return c === '0' ? '1' : '0'; }).join('');
        pasos = '<p><b>1.</b> Magnitud ' + Math.abs(n) + ' en binario: <code>' + agr(mag) + '</code></p>' +
          '<p><b>2.</b> Invertir todos los bits: <code>' + agr(inv) + '</code></p>' +
          '<p><b>3.</b> Sumar 1: <code>' + agr(b) + '</code> ← complemento a dos de ' + n + '</p>';
      } else {
        pasos = '<p>Al ser positivo se escribe directamente en binario, con el bit de signo en 0.</p>';
      }
      out.innerHTML = CDC.tabla(['Interpretación', 'Valor'], [
        ['Bits (' + w + ')', '<code>' + agr(b) + '</code>'],
        ['Bit de signo', '<code>' + b[0] + '</code> → ' + (b[0] === '1' ? 'negativo' : 'positivo')],
        ['Como entero con signo (complemento a dos)', '<code>' + n + '</code>'],
        ['Como entero sin signo', '<code>' + crudo + '</code>'],
        ['Hexadecimal', '<code>0x' + crudo.toString(16).toUpperCase().padStart(w / 4, '0') + '</code>']
      ]) + '<div class="note" style="margin-top:12px"><div class="note__t">Cómo se obtiene</div>' + pasos + '</div>';
    }
    function agr(s) { return s.replace(/(.{4})/g, '$1 ').trim(); }
    function renderFloat() {
      var x = parseFloat(fnum.value);
      if (isNaN(x)) { fout.innerHTML = '<div class="note note--warn">Escribe un número, por ejemplo 0.1 o 3.75</div>'; return; }
      var buf = new ArrayBuffer(8), dv = new DataView(buf);
      dv.setFloat64(0, x);
      var bin = '';
      for (var i = 0; i < 8; i++) bin += ('00000000' + dv.getUint8(i).toString(2)).slice(-8);
      var signo = bin[0], expo = bin.slice(1, 12), mant = bin.slice(12);
      var e = parseInt(expo, 2);
      fout.innerHTML = CDC.tabla(['Campo', 'Bits', 'Significado'], [
        ['Signo (1 bit)', '<code>' + signo + '</code>', signo === '1' ? 'negativo' : 'positivo'],
        ['Exponente (11 bits)', '<code>' + expo + '</code>', e + ' − 1023 = <b>' + (e - 1023) + '</b>'],
        ['Mantisa (52 bits)', '<code style="word-break:break-all">' + mant + '</code>', 'parte fraccionaria de 1,…'],
        ['Valor exacto almacenado', '<code>' + x.toPrecision(20) + '</code>', x === parseFloat(x.toPrecision(17)) ? '' : '']
      ], 'Casi ningún decimal cabe exacto en binario. Por eso 0.1 + 0.2 da ' + (0.1 + 0.2) + ' y nunca debes comparar reales con "=".');
    }
    num.addEventListener('input', renderEnt); bits.addEventListener('change', renderEnt);
    fnum.addEventListener('input', renderFloat);
    renderEnt(); renderFloat();
  }

  /* ---------------- 5. Codificación de texto ---------------- */
  function htmlTexto() {
    return '<div class="tool"><div><label for="txIn">Escribe un texto</label>' +
      '<input id="txIn" type="text" value="Hola ñ 😀"></div><div id="txOut"></div></div>';
  }
  function montarTexto(root) {
    var inp = root.querySelector('#txIn'), out = root.querySelector('#txOut');
    function render() {
      var s = inp.value;
      if (!s) { out.innerHTML = ''; return; }
      var filas = [];
      var bytesTotal = 0;
      Array.from(s).slice(0, 24).forEach(function (ch) {
        var cp = ch.codePointAt(0);
        var bytes = [];
        if (window.TextEncoder) bytes = Array.from(new TextEncoder().encode(ch));
        bytesTotal += bytes.length;
        filas.push([
          '<code>' + (ch === ' ' ? '␣' : esc(ch)) + '</code>',
          'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
          String(cp),
          cp < 128 ? String(cp) : '—',
          '<code>' + bytes.map(function (b) { return ('00000000' + b.toString(2)).slice(-8); }).join(' ') + '</code>',
          bytes.length
        ]);
      });
      out.innerHTML = CDC.tabla(['Carácter', 'Unicode', '#Código', '#ASCII', 'Bytes UTF-8 (binario)', '#Bytes'], filas,
        'El texto completo ocupa ' + bytesTotal + ' byte(s) en UTF-8 y tiene ' + Array.from(s).length +
        ' carácter(es). Observa que "ñ" usa 2 bytes y un emoji usa 4: por eso contar bytes no es contar letras.');
    }
    inp.addEventListener('input', render); render();
  }

  /* ---------------- 6. Consola JavaScript ---------------- */
  function htmlJS() {
    return '<div class="tool">' +
      '<div><label for="jsSrc">JavaScript (se ejecuta en tu propio navegador)</label>' +
      '<textarea id="jsSrc" spellcheck="false">// Búsqueda binaria sobre un arreglo ordenado\nfunction buscar(a, x) {\n  let i = 0, f = a.length - 1, pasos = 0;\n  while (i <= f) {\n    pasos++;\n    const m = Math.floor((i + f) / 2);\n    if (a[m] === x) return { pos: m, pasos };\n    if (a[m] < x) i = m + 1; else f = m - 1;\n  }\n  return { pos: -1, pasos };\n}\n\nconst datos = Array.from({ length: 1000 }, (_, i) => i * 3);\nconsole.log(buscar(datos, 2991));\nconsole.log("Comparaciones esperadas ≈ log2(1000) =", Math.log2(1000).toFixed(1));</textarea></div>' +
      '<div class="row"><button class="btn" id="jsRun" type="button">▶ Ejecutar</button>' +
      '<button class="btn btn--ghost" id="jsClr" type="button">Limpiar</button></div>' +
      '<div class="console" id="jsOut">La salida de console.log aparecerá aquí.</div></div>';
  }
  function montarJS(root) {
    var src = root.querySelector('#jsSrc'), out = root.querySelector('#jsOut');
    function ins(txt, cls) {
      var d = document.createElement('div');
      if (cls) d.className = cls;
      d.textContent = txt;
      out.appendChild(d);
      out.scrollTop = out.scrollHeight;
    }
    function fmt(v) {
      if (typeof v === 'string') return v;
      try { return JSON.stringify(v, null, 1); } catch (e) { return String(v); }
    }
    root.querySelector('#jsClr').addEventListener('click', function () { out.textContent = ''; });
    root.querySelector('#jsRun').addEventListener('click', function () {
      out.textContent = '';
      var falso = {
        log: function () { ins(Array.prototype.map.call(arguments, fmt).join(' ')); },
        error: function () { ins(Array.prototype.map.call(arguments, fmt).join(' '), 'e'); },
        warn: function () { ins(Array.prototype.map.call(arguments, fmt).join(' '), 'i'); },
        info: function () { ins(Array.prototype.map.call(arguments, fmt).join(' '), 'i'); },
        table: function (v) { ins(fmt(v)); }
      };
      var t0 = Date.now();
      try {
        var f = new Function('console', '"use strict";\n' + src.value);
        var r = f(falso);
        if (r !== undefined) ins('→ ' + fmt(r), 'ok');
        ins('— terminó en ' + (Date.now() - t0) + ' ms', 'ok');
      } catch (e) {
        ins('✖ ' + e.name + ': ' + e.message, 'e');
      }
    });
  }

  /* ---------------- 7. Comparador de complejidades ---------------- */
  function htmlBigO() {
    return '<div class="tool">' +
      '<div class="row"><div style="flex:1 1 160px"><label for="boN">Tamaño de la entrada (n)</label>' +
      '<input id="boN" type="number" value="1000" min="1" max="1000000"></div>' +
      '<div style="flex:1 1 160px"><label for="boOps">Operaciones por segundo</label>' +
      '<input id="boOps" type="number" value="100000000" min="1000"></div></div>' +
      '<div id="boOut"></div><div id="boChart"></div></div>';
  }
  function montarBigO(root) {
    var n = root.querySelector('#boN'), ops = root.querySelector('#boOps');
    var out = root.querySelector('#boOut'), chart = root.querySelector('#boChart');
    var FS = [
      { t: 'O(1)', f: function () { return 1; }, ej: 'Acceder a a[5]; insertar en una pila' },
      { t: 'O(log n)', f: function (x) { return Math.log2(x); }, ej: 'Búsqueda binaria; altura de un árbol balanceado' },
      { t: 'O(n)', f: function (x) { return x; }, ej: 'Recorrer un arreglo; búsqueda lineal' },
      { t: 'O(n log n)', f: function (x) { return x * Math.log2(x); }, ej: 'Merge sort; quicksort promedio' },
      { t: 'O(n²)', f: function (x) { return x * x; }, ej: 'Burbuja; comparar todos contra todos' },
      { t: 'O(n³)', f: function (x) { return x * x * x; }, ej: 'Multiplicar matrices (versión ingenua)' },
      { t: 'O(2ⁿ)', f: function (x) { return Math.pow(2, Math.min(x, 1024)); }, ej: 'Subconjuntos; fuerza bruta' },
      { t: 'O(n!)', f: function (x) { var r = 1; for (var i = 2; i <= Math.min(x, 170); i++) r *= i; return r; }, ej: 'Permutaciones; viajante por fuerza bruta' }
    ];
    function tiempo(x, por) {
      var s = x / por;
      if (!isFinite(s)) return 'más que la edad del universo';
      if (s < 1e-6) return (s * 1e9).toFixed(0) + ' ns';
      if (s < 1e-3) return (s * 1e6).toFixed(1) + ' µs';
      if (s < 1) return (s * 1e3).toFixed(1) + ' ms';
      if (s < 60) return s.toFixed(2) + ' s';
      if (s < 3600) return (s / 60).toFixed(1) + ' min';
      if (s < 86400) return (s / 3600).toFixed(1) + ' h';
      if (s < 3.15e7) return (s / 86400).toFixed(1) + ' días';
      if (s < 3.15e10) return (s / 3.15e7).toFixed(1) + ' años';
      return (s / 3.15e7).toExponential(2) + ' años';
    }
    function render() {
      var N = Math.max(1, Math.min(1e6, parseInt(n.value, 10) || 1));
      var P = Math.max(1000, parseInt(ops.value, 10) || 1e8);
      out.innerHTML = CDC.tabla(['Complejidad', '#Operaciones con n=' + N, 'Tiempo estimado', 'Ejemplo típico'],
        FS.map(function (f) {
          var v = f.f(N);
          return ['<b>' + f.t + '</b>',
            isFinite(v) ? (v > 1e12 ? v.toExponential(2) : Math.round(v).toLocaleString('es-PE')) : '∞',
            tiempo(v, P), f.ej];
        }), 'Con n = ' + N + ' y ' + P.toLocaleString('es-PE') + ' operaciones por segundo. Cambia n a 10 y luego a 100 000: ahí se ve por qué el orden importa más que el lenguaje.');
      chart.innerHTML = grafico(Math.min(N, 64));
    }
    function grafico(N) {
      var W = 560, H = 260, m = { l: 46, r: 12, t: 14, b: 32 };
      var fs = FS.slice(1, 5);
      var max = Math.max.apply(null, fs.map(function (f) { return f.f(N); }));
      var cols = ['var(--accent)', 'var(--warm)', 'var(--ok)', 'var(--err)'];
      var paths = fs.map(function (f, i) {
        var d = '';
        for (var x = 1; x <= N; x++) {
          var px = m.l + (x - 1) / (N - 1) * (W - m.l - m.r);
          var py = H - m.b - Math.min(1, f.f(x) / max) * (H - m.t - m.b);
          d += (x === 1 ? 'M' : 'L') + px.toFixed(1) + ' ' + py.toFixed(1);
        }
        return '<path d="' + d + '" fill="none" stroke="' + cols[i] + '" stroke-width="2"/>';
      }).join('');
      var leyenda = fs.map(function (f, i) {
        return '<g transform="translate(' + (m.l + 8 + i * 118) + ',' + (m.t + 4) + ')">' +
          '<rect width="10" height="3" y="4" fill="' + cols[i] + '"/>' +
          '<text x="15" y="9" font-size="11" fill="var(--fg-soft)">' + f.t + '</text></g>';
      }).join('');
      return '<div class="figure"><svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H +
        '" role="img" aria-label="Comparación de curvas de crecimiento">' +
        '<line x1="' + m.l + '" y1="' + (H - m.b) + '" x2="' + (W - m.r) + '" y2="' + (H - m.b) + '" stroke="var(--line)"/>' +
        '<line x1="' + m.l + '" y1="' + m.t + '" x2="' + m.l + '" y2="' + (H - m.b) + '" stroke="var(--line)"/>' +
        '<text x="' + m.l + '" y="' + (H - 10) + '" font-size="11" fill="var(--fg-soft)">1</text>' +
        '<text x="' + (W - m.r - 14) + '" y="' + (H - 10) + '" font-size="11" fill="var(--fg-soft)">' + N + '</text>' +
        '<text x="6" y="' + (m.t + 10) + '" font-size="11" fill="var(--fg-soft)">ops</text>' +
        '<text x="' + (W / 2 - 30) + '" y="' + (H - 10) + '" font-size="11" fill="var(--fg-soft)">tamaño n</text>' +
        paths + leyenda + '</svg><figcaption>Las cuatro curvas salen del mismo punto: la diferencia aparece cuando n crece.</figcaption></div>';
    }
    n.addEventListener('input', render); ops.addEventListener('input', render);
    render();
  }

  var HERRAMIENTAS = [
    { id: 'pseudo', nom: 'Intérprete de pseudocódigo', desc: 'Escribe pseudocódigo en español, ejecútalo y genera su diagrama de flujo.', html: htmlPseudo, montar: montarPseudo },
    { id: 'bases', nom: 'Conversor de bases', desc: 'Decimal, binario, octal y hexadecimal con el desarrollo paso a paso.', html: htmlBases, montar: montarBases },
    { id: 'verdad', nom: 'Tablas de verdad', desc: 'Evalúa cualquier expresión lógica en todas sus combinaciones.', html: htmlVerdad, montar: montarVerdad },
    { id: 'bits', nom: 'Bits con signo y reales', desc: 'Complemento a dos, desbordamiento e IEEE-754 de 64 bits.', html: htmlBits, montar: montarBits },
    { id: 'texto', nom: 'Texto a bytes', desc: 'ASCII, Unicode y UTF-8 carácter por carácter.', html: htmlTexto, montar: montarTexto },
    { id: 'js', nom: 'Consola JavaScript', desc: 'Prueba el código real que escribas, sin instalar nada.', html: htmlJS, montar: montarJS },
    { id: 'bigo', nom: 'Comparador de complejidades', desc: 'Cuánto tarda cada orden de crecimiento con tu valor de n.', html: htmlBigO, montar: montarBigO }
  ];

  return { lista: HERRAMIENTAS, ejemplos: EJEMPLOS };
})();
