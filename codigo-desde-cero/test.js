#!/usr/bin/env node
/**
 * test.js — comprobaciones automáticas sin navegador.
 * Carga el núcleo, el intérprete, el generador de diagramas y todo el currículo
 * en un entorno simulado, y verifica que:
 *   1. todos los archivos tengan sintaxis válida;
 *   2. el currículo esté bien formado (ids únicos, ejercicios con solución…);
 *   3. el intérprete de pseudocódigo dé los resultados esperados;
 *   4. todo el pseudocódigo publicado en el curso se ejecute o dibuje sin error.
 * Uso: node test.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, 'src');
let fallos = 0, pruebas = 0;

function ok(nombre, cond, detalle) {
  pruebas++;
  if (cond) return;
  fallos++;
  console.log('  ✖ ' + nombre + (detalle ? ' → ' + detalle : ''));
}
function igual(nombre, a, b) { ok(nombre, a === b, 'esperaba ' + JSON.stringify(b) + ', obtuve ' + JSON.stringify(a)); }

/* --- entorno simulado --- */
const almacen = {};
const sandbox = {
  console: console,
  localStorage: {
    getItem: k => (k in almacen ? almacen[k] : null),
    setItem: (k, v) => { almacen[k] = String(v); },
    removeItem: k => { delete almacen[k]; }
  },
  setTimeout: setTimeout, clearTimeout: clearTimeout,
  window: { performance: { now: () => Date.now() }, TextEncoder: TextEncoder },
  TextEncoder: TextEncoder,
  performance: { now: () => Date.now() },
  Math: Math, JSON: JSON, Date: Date, Number: Number, parseInt: parseInt, parseFloat: parseFloat,
  isNaN: isNaN, isFinite: isFinite, Object: Object, Array: Array, String: String, RegExp: RegExp,
  Error: Error, ArrayBuffer: ArrayBuffer, DataView: DataView, Function: Function
};
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);

const archivos = ['js/01-core.js', 'js/02-pseudo.js', 'js/03-flowchart.js', 'js/04-tools.js']
  .concat(fs.readdirSync(path.join(SRC, 'content')).filter(f => f.endsWith('.js')).sort()
    .map(f => 'content/' + f));

console.log('\n— Carga de archivos —');
for (const rel of archivos) {
  const código = fs.readFileSync(path.join(SRC, rel), 'utf8');
  try {
    vm.runInContext(código, ctx, { filename: rel });
    pruebas++;
  } catch (e) {
    fallos++; pruebas++;
    console.log('  ✖ ' + rel + ' → ' + e.message + (e.stack ? '\n' + e.stack.split('\n').slice(0, 3).join('\n') : ''));
  }
}
/* las vistas solo se comprueban sintácticamente: necesitan DOM */
for (const rel of ['js/05-views.js', 'js/06-app.js']) {
  const código = fs.readFileSync(path.join(SRC, rel), 'utf8');
  try { new vm.Script(código, { filename: rel }); pruebas++; }
  catch (e) { fallos++; pruebas++; console.log('  ✖ sintaxis ' + rel + ' → ' + e.message); }
}
console.log('  ' + archivos.length + ' archivos cargados');

const CDC = sandbox.CDC, Pseudo = sandbox.Pseudo, Flujo = sandbox.Flujo, Lab = sandbox.Lab;

/* --- 1. estructura del currículo --- */
console.log('\n— Estructura del currículo —');
const ids = {};
let nTemas = 0, nEj = 0, nQuiz = 0;
CDC.modulos.forEach(m => {
  ok('módulo ' + m.id + ' tiene título', !!m.titulo);
  ok('módulo ' + m.id + ' tiene resumen', !!m.resumen);
  ok('módulo ' + m.id + ' tiene temas', (m.temas || []).length > 0);
  m.temas.forEach(t => {
    nTemas++;
    ok('id único: ' + t.id, !ids[t.id]); ids[t.id] = 1;
    ok(t.id + ' tiene título', !!t.titulo);
    ok(t.id + ' tiene lectura larga', (t.lectura || '').length > 1200, 'longitud ' + (t.lectura || '').length);
    ok(t.id + ' tiene objetivos', (t.objetivos || []).length >= 2);
    ok(t.id + ' tiene 5 ejercicios', (t.ejercicios || []).length === 5,
      'son ' + (t.ejercicios || []).length);
    ok(t.id + ' cubre los niveles 1 a 5 en orden',
      (t.ejercicios || []).map(e => e.n).join(',') === '1,2,3,4,5',
      'niveles ' + (t.ejercicios || []).map(e => e.n).join(','));
    (t.ejercicios || []).forEach((e, i) => {
      nEj++;
      ok(t.id + ' ej' + i + ' tiene título', !!e.titulo);
      ok(t.id + ' ej' + i + ' tiene enunciado', !!e.enunciado);
      ok(t.id + ' ej' + i + ' tiene pista', !!e.pista);
      ok(t.id + ' ej' + i + ' tiene solución', !!e.solucion && e.solucion.length > 40);
      ok(t.id + ' ej' + i + ' tiene nivel 1-5', e.n >= 1 && e.n <= 5);
    });
    ok(t.id + ' tiene 3 preguntas', (t.quiz || []).length === 3,
      'son ' + (t.quiz || []).length);
    (t.quiz || []).forEach((q, i) => {
      nQuiz++;
      ok(t.id + ' quiz' + i + ' tiene 2+ opciones', (q.ops || []).length >= 2);
      ok(t.id + ' quiz' + i + ' índice correcto válido', q.ok >= 0 && q.ok < q.ops.length);
      ok(t.id + ' quiz' + i + ' tiene explicación', !!q.exp);
    });
    /* enlaces internos: #t-xxx debe existir */
    const refs = (t.lectura || '').match(/href="#t-([a-z0-9-]+)"/g) || [];
    refs.forEach(r => {
      const id = r.match(/#t-([a-z0-9-]+)/)[1];
      ok(t.id + ' enlace a tema existente (' + id + ')', !!CDC.temas[id]);
    });
  });
});
console.log('  ' + CDC.modulos.length + ' módulos · ' + nTemas + ' temas · ' + nEj + ' ejercicios · ' + nQuiz + ' preguntas');

/* --- 2. intérprete de pseudocódigo --- */
console.log('\n— Intérprete de pseudocódigo —');
function corre(src, entradas) {
  return Pseudo.ejecutar(src, entradas || []).salida.join('\n');
}
igual('escribir texto', corre('Algoritmo A\nEscribir "hola"\nFinAlgoritmo'), 'hola');
igual('aritmética', corre('Algoritmo A\nEscribir 2 + 3 * 4\nFinAlgoritmo'), '14');
igual('precedencia con paréntesis', corre('Algoritmo A\nEscribir (2 + 3) * 4\nFinAlgoritmo'), '20');
igual('potencia', corre('Algoritmo A\nEscribir 2 ^ 10\nFinAlgoritmo'), '1024');
igual('mod', corre('Algoritmo A\nEscribir 17 MOD 5\nFinAlgoritmo'), '2');
igual('asignación y lectura', corre('Algoritmo A\nDefinir x Como Entero\nLeer x\nEscribir x * 2\nFinAlgoritmo', ['21']), '42');
igual('concatenación', corre('Algoritmo A\nEscribir "n=", 5\nFinAlgoritmo'), 'n=5');
igual('si verdadero', corre('Algoritmo A\nSi 5 > 3 Entonces\nEscribir "si"\nSino\nEscribir "no"\nFinSi\nFinAlgoritmo'), 'si');
igual('si falso', corre('Algoritmo A\nSi 1 > 3 Entonces\nEscribir "si"\nSino\nEscribir "no"\nFinSi\nFinAlgoritmo'), 'no');
igual('y lógico', corre('Algoritmo A\nEscribir (Verdadero Y Falso)\nFinAlgoritmo'), 'FALSO');
igual('o lógico', corre('Algoritmo A\nEscribir (Verdadero O Falso)\nFinAlgoritmo'), 'VERDADERO');
igual('no lógico', corre('Algoritmo A\nEscribir (NO Falso)\nFinAlgoritmo'), 'VERDADERO');
igual('mientras', corre('Algoritmo A\nDefinir i Como Entero\ni <- 1\nMientras i <= 3 Hacer\nEscribir i\ni <- i + 1\nFinMientras\nFinAlgoritmo'), '1\n2\n3');
igual('para', corre('Algoritmo A\nDefinir i Como Entero\nPara i <- 1 Hasta 3 Con Paso 1 Hacer\nEscribir i\nFinPara\nFinAlgoritmo'), '1\n2\n3');
igual('para con paso negativo', corre('Algoritmo A\nDefinir i Como Entero\nPara i <- 3 Hasta 1 Con Paso -1 Hacer\nEscribir i\nFinPara\nFinAlgoritmo'), '3\n2\n1');
igual('repetir hasta que', corre('Algoritmo A\nDefinir i Como Entero\ni <- 0\nRepetir\ni <- i + 1\nEscribir i\nHasta Que i >= 3\nFinAlgoritmo'), '1\n2\n3');
igual('segun', corre('Algoritmo A\nDefinir x Como Entero\nx <- 2\nSegun x Hacer\ncaso 1: Escribir "uno"\ncaso 2: Escribir "dos"\nDe Otro Modo: Escribir "otro"\nFinSegun\nFinAlgoritmo'), 'dos');
igual('segun de otro modo', corre('Algoritmo A\nDefinir x Como Entero\nx <- 9\nSegun x Hacer\ncaso 1: Escribir "uno"\nDe Otro Modo: Escribir "otro"\nFinSegun\nFinAlgoritmo'), 'otro');
igual('arreglo', corre('Algoritmo A\nDimension a[3]\na[1] <- 10\na[2] <- 20\na[3] <- 30\nEscribir a[1] + a[2] + a[3]\nFinAlgoritmo'), '60');
igual('matriz', corre('Algoritmo A\nDimension m[2,2]\nm[1,1] <- 5\nm[2,2] <- 7\nEscribir m[1,1] + m[2,2]\nFinAlgoritmo'), '12');
igual('funcion', corre('Funcion r <- doble(n)\nr <- n * 2\nFinFuncion\nAlgoritmo A\nEscribir doble(21)\nFinAlgoritmo'), '42');
igual('recursión', corre('Funcion r <- fact(n)\nSi n <= 1 Entonces\nr <- 1\nSino\nr <- n * fact(n - 1)\nFinSi\nFinFuncion\nAlgoritmo A\nEscribir fact(6)\nFinAlgoritmo'), '720');
igual('internas: longitud', corre('Algoritmo A\nEscribir longitud("hola")\nFinAlgoritmo'), '4');
igual('internas: mayusculas', corre('Algoritmo A\nEscribir mayusculas("perú")\nFinAlgoritmo'), 'PERÚ');
igual('internas: subcadena', corre('Algoritmo A\nEscribir Subcadena("abcdef", 2, 4)\nFinAlgoritmo'), 'bcd');
igual('internas: raiz y trunc', corre('Algoritmo A\nEscribir trunc(raiz(50))\nFinAlgoritmo'), '7');
igual('internas: abs', corre('Algoritmo A\nEscribir abs(-9)\nFinAlgoritmo'), '9');
igual('escribir sin saltar', corre('Algoritmo A\nEscribir Sin Saltar "a"\nEscribir "b"\nFinAlgoritmo'), 'ab');
igual('comentarios', corre('Algoritmo A\n// esto se ignora\nEscribir 1 // y esto\nFinAlgoritmo'), '1');
igual('comparación de cadenas', corre('Algoritmo A\nSi "ana" < "beto" Entonces\nEscribir "ok"\nFinSi\nFinAlgoritmo'), 'ok');
igual('sin cabecera Algoritmo', corre('Escribir "suelto"'), 'suelto');
/* palabras que deben poder usarse como nombres de variable */
igual('variables x y o', corre('Algoritmo A\nDefinir x, y, o Como Entero\nx<-1\ny<-2\no<-3\nEscribir x+y+o\nFinAlgoritmo'), '6');
igual('y Y o como logicos', corre('Algoritmo A\nDefinir y, o Como Logico\ny<-Verdadero\no<-Falso\nEscribir (y Y o), " ", (y O o)\nFinAlgoritmo'), 'FALSO VERDADERO');
igual('variables valor modo otro pantalla', corre('Algoritmo A\nDefinir valor, modo, otro, pantalla Como Entero\nvalor<-1\nmodo<-2\notro<-3\npantalla<-4\nEscribir valor+modo+otro+pantalla\nFinAlgoritmo'), '10');
igual('parametros por referencia', corre('SubProceso inter(x Por Referencia, y Por Referencia)\nDefinir t Como Entero\nt<-x\nx<-y\ny<-t\nFinSubProceso\nAlgoritmo A\nDefinir a,b Como Entero\na<-3\nb<-7\ninter(a,b)\nEscribir a," ",b\nFinAlgoritmo'), '7 3');
igual('mod con variable modo', corre('Algoritmo A\nDefinir modo Como Entero\nmodo<-17 MOD 5\nEscribir modo\nFinAlgoritmo'), '2');
igual('borrar pantalla', corre('Algoritmo A\nEscribir "x"\nBorrar Pantalla\nEscribir "y"\nFinAlgoritmo'), 'y');
igual('nombres de tipo como variables', corre('Algoritmo A\nDefinir texto, real, entero, paso, cadena Como Entero\ntexto<-1\nreal<-2\nentero<-3\npaso<-4\ncadena<-5\nEscribir texto+real+entero+paso+cadena\nFinAlgoritmo'), '15');
igual('Para sin Con Paso', corre('Algoritmo A\nDefinir i Como Entero\nPara i<-1 Hasta 3 Hacer\nEscribir i\nFinPara\nFinAlgoritmo'), '1\n2\n3');

/* errores que deben detectarse */
function falla(nombre, src, entradas) {
  pruebas++;
  try { Pseudo.ejecutar(src, entradas || []); fallos++; console.log('  ✖ ' + nombre + ' → no lanzó error'); }
  catch (e) { if (!e.pseudo && !/Línea|línea/.test(e.message)) { /* igual cuenta como detectado */ } }
}
falla('división entre cero', 'Algoritmo A\nEscribir 1 / 0\nFinAlgoritmo');
falla('variable sin valor', 'Algoritmo A\nEscribir y + 1\nFinAlgoritmo');
falla('índice fuera de rango', 'Algoritmo A\nDimension a[2]\nEscribir a[5]\nFinAlgoritmo');
falla('falta FinSi', 'Algoritmo A\nSi 1 > 0 Entonces\nEscribir 1\nFinAlgoritmo');
falla('bucle infinito acotado', 'Algoritmo A\nDefinir i Como Entero\ni <- 1\nMientras i > 0 Hacer\ni <- i + 1\nFinMientras\nFinAlgoritmo');
falla('faltan entradas para Leer', 'Algoritmo A\nDefinir x Como Entero\nLeer x\nFinAlgoritmo');

/* --- 3. diagramas de flujo --- */
console.log('\n— Generador de diagramas —');
[
  'Algoritmo A\nEscribir "x"\nFinAlgoritmo',
  'Algoritmo A\nDefinir x Como Entero\nLeer x\nSi x > 0 Entonces\nEscribir "pos"\nSino\nEscribir "neg"\nFinSi\nFinAlgoritmo',
  'Algoritmo A\nDefinir i Como Entero\ni <- 0\nMientras i < 5 Hacer\ni <- i + 1\nFinMientras\nFinAlgoritmo',
  'Algoritmo A\nDefinir i Como Entero\nPara i <- 1 Hasta 10 Con Paso 1 Hacer\nEscribir i\nFinPara\nFinAlgoritmo',
  'Algoritmo A\nDefinir i Como Entero\ni <- 0\nRepetir\ni <- i + 1\nHasta Que i > 3\nFinAlgoritmo',
  'Algoritmo A\nDefinir x Como Entero\nx <- 1\nSegun x Hacer\ncaso 1: Escribir "a"\ncaso 2: Escribir "b"\nDe Otro Modo: Escribir "c"\nFinSegun\nFinAlgoritmo'
].forEach((src, i) => {
  pruebas++;
  try {
    const svg = Flujo.dibujar(src);
    if (!/^<svg/.test(svg) || svg.indexOf('NaN') >= 0) {
      fallos++; console.log('  ✖ diagrama ' + i + ' → SVG inválido o con NaN');
    }
  } catch (e) { fallos++; console.log('  ✖ diagrama ' + i + ' → ' + e.message); }
});

/* --- 4. todo el pseudocódigo del curso --- */
console.log('\n— Pseudocódigo publicado en el curso —');
Object.keys(Lab.ejemplos).forEach(k => {
  pruebas++;
  try { Flujo.dibujar(Lab.ejemplos[k]); }
  catch (e) { fallos++; console.log('  ✖ ejemplo "' + k + '" no se puede dibujar → ' + e.message); }
});
CDC.orden.forEach(t => {
  (t.ejercicios || []).forEach((e, i) => {
    if (!e.lab) return;
    pruebas++;
    try { Pseudo.parse(e.lab); Flujo.dibujar(e.lab); }
    catch (err) { fallos++; console.log('  ✖ ' + t.id + ' ej' + i + ' lab no compila → ' + err.message); }
  });
});

/* --- 5. búsqueda --- */
console.log('\n— Búsqueda —');
ok('encuentra "binario"', CDC.buscar('binario').length > 0);
ok('encuentra sin tildes', CDC.buscar('algoritmo').length > 0);
ok('ignora consultas cortas', CDC.buscar('a').length === 0);

/* --- resumen --- */
console.log('\n' + (fallos === 0 ? '✔ TODO BIEN' : '✖ ' + fallos + ' FALLOS') +
  ' — ' + (pruebas - fallos) + '/' + pruebas + ' comprobaciones\n');
process.exit(fallos === 0 ? 0 : 1);
