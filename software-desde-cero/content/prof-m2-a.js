(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m2', { prof: true });

D('m2.prop', `## Ejemplo resuelto: simplificar una condición de PatioApp
En el código de salida aparece esta condición para bloquear la salida de una unidad:
~~~js
if (!(pagado && !deudaAnterior) || (!pagado && autorizado === false)) bloquear();
~~~
Sea P = «pagado», Q = «deudaAnterior», A = «autorizado». La condición es ¬(P ∧ ¬Q) ∨ (¬P ∧ ¬A).
1. Por De Morgan, ¬(P ∧ ¬Q) ≡ ¬P ∨ Q.
2. La condición queda (¬P ∨ Q) ∨ (¬P ∧ ¬A).
3. Por absorción, ¬P ∨ (¬P ∧ ¬A) ≡ ¬P, así que todo queda ¬P ∨ Q.
Resultado: «if (!pagado || deudaAnterior) bloquear();». La variable «autorizado» no influía en nada: la regla de negocio "un supervisor puede autorizar la salida sin pago" **no estaba implementada**, aunque el código parecía considerarla. La lógica no solo simplifica: revela defectos.

## Verificar equivalencias con una tabla de verdad
Cuando una simplificación no es obvia, se puede comprobar exhaustivamente: con n variables hay 2ⁿ combinaciones, y para condiciones de código (rara vez más de 5 o 6 variables) eso es instantáneo.
~~~js
// ¿Son equivalentes dos condiciones? Se prueban todas las combinaciones
function equivalentes(f, g, n) {
  for (let m = 0; m < (1 << n); m++) {
    const v = Array.from({ length: n }, (_, i) => Boolean(m & (1 << i)));
    if (f(...v) !== g(...v)) return 'no: difieren en ' + JSON.stringify(v);
  }
  return 'sí, en las ' + (1 << n) + ' combinaciones';
}
console.log(equivalentes((p, q, a) => !(p && !q) || (!p && a === false), (p, q) => !p || q, 3));
~~~
Esta idea, probar todas las combinaciones de un espacio finito, es la semilla de la verificación de modelos que verás en Métodos formales.`);

D('m2.sets', `## Relaciones de equivalencia y particiones
Una relación es de **equivalencia** si es reflexiva, simétrica y transitiva ("tener la misma placa", "estar en la misma sede", "ser congruente módulo 7"). Toda relación de equivalencia **parte** el conjunto en **clases de equivalencia** disjuntas que lo cubren por completo, y toda partición define una relación de equivalencia. En software aparecen continuamente: agrupar registros (un GROUP BY de SQL calcula las clases de la relación "tener el mismo valor en la columna"), detectar duplicados, o la técnica de **particiones de equivalencia** en pruebas, que elige un caso por clase porque se espera que todos los elementos de una clase se comporten igual.

## Órdenes parciales
Una relación es un **orden parcial** si es reflexiva, antisimétrica y transitiva: "es divisor de", "es subconjunto de", "debe hacerse antes de". A diferencia de un orden total, puede haber elementos **incomparables** (dos tareas sin relación de precedencia). Un **orden topológico** extiende un orden parcial a uno total compatible: es lo que hacen los gestores de paquetes para decidir en qué orden instalar dependencias, los sistemas de construcción como Make para compilar, y las hojas de cálculo para recalcular celdas. Existe si y solo si el grafo de la relación no tiene ciclos.

## Cierres de relaciones
A veces una relación no tiene la propiedad que necesitamos y se la "completa". El **cierre transitivo** de una relación R agrega todos los pares (a, c) para los que hay un camino a → b → … → c: si «patios» depende de «sedes» y «espacios» de «patios», el cierre agrega que «espacios» depende (indirectamente) de «sedes». El algoritmo de Warshall (1962) lo calcula en O(n³) con una matriz de adyacencia. En software responde preguntas como "¿qué módulos se ven afectados si cambio este?" o "¿quién puede acceder a este recurso a través de roles heredados?".

## Ejemplo resuelto: el orden de las migraciones de PatioApp
Las migraciones de la base de datos tienen dependencias: «crear_sedes» antes de «crear_patios»; «crear_patios» antes de «crear_espacios» y de «crear_tarifas»; «crear_espacios» y «crear_unidades» antes de «crear_estadias». La relación "debe aplicarse antes de" es un orden parcial: «crear_tarifas» y «crear_unidades» son incomparables. Un orden topológico válido es: sedes, patios, unidades, espacios, tarifas, estadías; hay otros igualmente válidos. Si alguien agregara por error "crear_estadias antes de crear_sedes", aparecería un ciclo y no existiría ningún orden posible: la herramienta de migraciones debe detectarlo y negarse a ejecutar.`);

D('m2.prob', `## La linealidad de la esperanza
Una propiedad sorprendentemente útil: la esperanza de una suma es la suma de las esperanzas, **aunque las variables no sean independientes**: E[X + Y] = E[X] + E[Y]. Permite resolver problemas que parecen difíciles descomponiéndolos en indicadores. Ejemplo: si 30 operadores eligen al azar uno de 10 turnos, ¿cuántos turnos quedan vacíos en promedio? Para cada turno, el indicador "queda vacío" tiene probabilidad (9/10)³⁰ ≈ 0,042; por linealidad, el número esperado de turnos vacíos es 10 × 0,042 ≈ 0,42, sin necesidad de analizar las dependencias entre turnos.

## Ejemplo resuelto: ¿cuán largo debe ser un código de estadía?
PatioApp imprime en el comprobante un código aleatorio para que el dueño consulte su estadía sin iniciar sesión. Si los códigos tienen 6 caracteres de un alfabeto de 32 símbolos (sin letras confusas como O, 0, I y 1), hay 32⁶ ≈ 1074 millones de códigos.
- **Colisiones entre códigos legítimos:** por la cota del cumpleaños, la probabilidad de alguna colisión con k códigos es aproximadamente 1 − e^(−k²/(2N)). Con 100 000 estadías al año: k²/(2N) ≈ 10¹⁰ / (2,15 × 10⁹) ≈ 4,7, así que la colisión es casi segura (1 − e^(−4,7) ≈ 0,99). Hay que verificar unicidad al generar, o alargar el código.
- **Adivinar un código ajeno:** con 50 000 estadías abiertas, un atacante acierta un código válido con probabilidad 50 000 / 1074 millones ≈ 1 en 21 000 por intento. Con un límite de 10 intentos por hora por dirección, lograrlo llevaría en promedio unas 2100 horas desde una dirección, pero un atacante con muchas direcciones podría acelerarlo. Decisión: 10 caracteres (32¹⁰ ≈ 1,1 × 10¹⁵ combinaciones), lo que lleva la probabilidad por intento a 1 en 22 000 millones, y el límite de intentos como defensa adicional.
La probabilidad no es solo para la estadística: decide el tamaño de identificadores, claves y tablas hash.`);

S('m2', 'm2.pred', { title: 'Lógica de predicados y demostraciones',
  ask: '¿Qué concepto de lógica de predicados o de demostración se aplica?',
  lesson: `
> **La idea en simple.** La lógica proposicional trata frases enteras como "llueve" o "hay deuda", sin mirar adentro. Pero las afirmaciones importantes del software hablan de **todos** o de **algunos**: "toda estadía cerrada tiene un pago", "existe un espacio libre en la zona B", "ninguna unidad está en dos espacios a la vez". Para decir eso con precisión, y para demostrar que un programa lo cumple, hace falta la lógica de predicados.

## Predicados y cuantificadores
Un **predicado** es una afirmación con variables que se vuelve verdadera o falsa cuando se les da valor: «Libre(e)» ("el espacio e está libre"), «Ocupa(u, e)» ("la unidad u ocupa el espacio e"), «x > 3». Los **cuantificadores** dicen de cuántos valores se afirma:
- **Universal** ∀ ("para todo"): ∀e Libre(e) significa "todos los espacios están libres".
- **Existencial** ∃ ("existe al menos uno"): ∃e Libre(e) significa "hay al menos un espacio libre".
Cada cuantificador se refiere a un **dominio** (el universo de valores posibles): los espacios del patio, los números naturales. La misma fórmula puede ser verdadera en un dominio y falsa en otro: ∀x ∃y (y < x) es falsa en los naturales (para x = 0 no hay menor) y verdadera en los enteros.

Una variable está **ligada** si está bajo un cuantificador y **libre** si no. Una fórmula sin variables libres es una **sentencia**: tiene un valor de verdad definido en cada interpretación.

## Traducir del lenguaje natural
Traducir con precisión es la habilidad más útil y la más difícil:
| Frase | Fórmula |
| Todo espacio ocupado tiene exactamente una unidad | ∀e (Ocupado(e) → ∃u (Ocupa(u, e) ∧ ∀v (Ocupa(v, e) → v = u))) |
| Ninguna unidad ocupa dos espacios | ∀u ∀e ∀f ((Ocupa(u, e) ∧ Ocupa(u, f)) → e = f) |
| Alguna sede no tiene espacios libres | ∃s ∀e (EnSede(e, s) → ¬Libre(e)) |
| Toda estadía cerrada tiene un pago | ∀x (Cerrada(x) → ∃p PagoDe(p, x)) |
Dos patrones casi siempre correctos: el **universal va con implicación** ("todo A es B": ∀x (A(x) → B(x))) y el **existencial va con conjunción** ("algún A es B": ∃x (A(x) ∧ B(x))). El error clásico es invertirlos: ∀x (A(x) ∧ B(x)) dice que **todo** es A y B, y ∃x (A(x) → B(x)) es verdadera casi siempre (basta un x que no sea A).

## Negar cuantificadores
Las leyes de De Morgan se extienden a los cuantificadores:
- ¬∀x P(x) ≡ ∃x ¬P(x): "no todos pagaron" equivale a "alguno no pagó".
- ¬∃x P(x) ≡ ∀x ¬P(x): "no existe un espacio libre" equivale a "todos están ocupados".
Para negar una fórmula con varios cuantificadores, se invierten todos y se niega lo de adentro: ¬∀u ∃e Ocupa(u, e) ≡ ∃u ∀e ¬Ocupa(u, e) ("hay una unidad que no ocupa ningún espacio"). El **orden** de cuantificadores distintos importa: ∀u ∃e Ocupa(u, e) ("cada unidad ocupa algún espacio") no es lo mismo que ∃e ∀u Ocupa(u, e) ("hay un espacio que ocupan todas las unidades").

## Cuantificadores en el código
Los cuantificadores sobre dominios finitos son operaciones que usas todos los días:
- ∀x ∈ L: P(x) es «L.every(P)»; en SQL, «NOT EXISTS (… WHERE NOT P)».
- ∃x ∈ L: P(x) es «L.some(P)»; en SQL, «EXISTS (…)».
- Sobre una lista vacía, «every» devuelve **true** (todo elemento de la nada cumple cualquier cosa: verdad vacía) y «some» devuelve **false**. Esto no es una rareza de JavaScript, sino lógica: ∀x ∈ ∅ P(x) es verdadero.
~~~js
// Invariantes del patio expresadas con cuantificadores
const ocupaciones = [{ unidad: 'ABC-123', espacio: 'B-14' }, { unidad: 'XYZ-987', espacio: 'B-15' }, { unidad: 'JKL-555', espacio: 'B-14' }];
const unidades = [...new Set(ocupaciones.map(o => o.unidad))];
const espacios = [...new Set(ocupaciones.map(o => o.espacio))];
// ∀u: la unidad ocupa a lo sumo un espacio
const unaPorUnidad = unidades.every(u => ocupaciones.filter(o => o.unidad === u).length <= 1);
// ∀e: el espacio tiene a lo sumo una unidad
const unaPorEspacio = espacios.every(e => ocupaciones.filter(o => o.espacio === e).length <= 1);
console.log('cada unidad en un solo espacio:', unaPorUnidad);
console.log('cada espacio con una sola unidad:', unaPorEspacio, '← contraejemplo: B-14');
console.log('verdad vacía:', [].every(x => x > 100), [].some(x => x > 100));
~~~

## Reglas de inferencia para cuantificadores
Para razonar con cuantificadores se agregan cuatro reglas:
- **Instanciación universal:** de ∀x P(x) se deduce P(c) para cualquier c del dominio.
- **Generalización universal:** si P(c) se demostró para un c **arbitrario** (sin suponer nada especial de él), se concluye ∀x P(x).
- **Instanciación existencial:** de ∃x P(x) se puede introducir un c **nuevo** con P(c).
- **Generalización existencial:** de P(c) se deduce ∃x P(x).
Con ellas se demuestran razonamientos clásicos como "todos los hombres son mortales; Sócrates es hombre; luego Sócrates es mortal" o, en nuestro mundo, "toda estadía cerrada tiene un pago; E-91 está cerrada; luego E-91 tiene un pago".

## Técnicas de demostración
Demostrar es convencer sin dejar lugar a dudas. Las técnicas principales, con ejemplos que aparecen en computación:
- **Directa:** suponer la hipótesis y deducir la conclusión. "Si n es par, n² es par": n = 2k, n² = 4k² = 2(2k²).
- **Por contraposición:** demostrar ¬Q → ¬P en lugar de P → Q. "Si n² es par, n es par": si n es impar, n = 2k + 1 y n² = 4k² + 4k + 1, impar.
- **Por contradicción:** suponer lo contrario y llegar a un absurdo. Euclides demostró así, hace más de 2300 años, que hay infinitos primos: si hubiera una lista finita p₁, …, pₙ, el número p₁·…·pₙ + 1 no sería divisible por ninguno.
- **Por casos:** dividir en casos que cubran todo y demostrar cada uno.
- **Constructiva** (exhibir el objeto) y **no constructiva** (demostrar que existe sin decir cuál).
- **Por contraejemplo:** para refutar un "para todo" basta un caso que no cumpla. "Todo número de la forma n² + n + 41 es primo" falla en n = 40: 40² + 40 + 41 = 41².
- **Por inducción:** para afirmaciones sobre todos los naturales o sobre estructuras recursivas, que verás a fondo en Matemática avanzada.

## Inducción estructural
En computación, muchas estructuras se definen **recursivamente**: una lista es vacía o un elemento seguido de una lista; un árbol binario es vacío o un nodo con dos subárboles; una expresión es un número o dos expresiones unidas por un operador. La **inducción estructural** demuestra una propiedad para todas ellas: se prueba para los casos base y se prueba que, si vale para las partes, vale para lo construido con ellas. Ejemplo: "en todo árbol binario lleno, el número de hojas es el número de nodos internos más uno". Caso base: un árbol de un solo nodo tiene 1 hoja y 0 internos. Paso: un árbol lleno con raíz y subárboles izquierdo y derecho tiene hojas h₁ + h₂ = (i₁ + 1) + (i₂ + 1) = (i₁ + i₂ + 1) + 1, donde i₁ + i₂ + 1 son sus nodos internos (incluida la raíz). Es exactamente el razonamiento detrás de por qué una función recursiva bien escrita es correcta.

## Lógica y especificación de software
La lógica de predicados es el lenguaje de las especificaciones precisas: las precondiciones, poscondiciones e invariantes de los contratos, las restricciones de las bases de datos (CHECK, claves foráneas: ∀ fila de estadías ∃ fila de unidades con esa placa), las reglas de los verificadores de modelos y los lenguajes como Alloy y TLA+. También es la base de **SQL**, que Codd diseñó sobre el cálculo relacional, una forma de lógica de predicados. Y su límite es profundo: Kurt Gödel (1931) y Alonzo Church y Alan Turing (1936) demostraron que no existe un procedimiento general para decidir si una fórmula de la lógica de predicados es válida, lo que verás en Teoría de la computación.

## Ejemplo resuelto: especificar las reglas de los espacios
Gerencia dice: "una unidad no puede estar en dos espacios, un espacio no puede tener dos unidades, y en cada zona siempre debe quedar al menos un espacio libre para emergencias".
1. ∀u ∀e ∀f ((Ocupa(u, e) ∧ Ocupa(u, f)) → e = f).
2. ∀e ∀u ∀v ((Ocupa(u, e) ∧ Ocupa(v, e)) → u = v).
3. ∀z ∃e (EnZona(e, z) ∧ Libre(e)).
Al formalizar la tercera regla surge una pregunta que la frase ocultaba: ¿una zona **sin espacios** la cumple? Según la fórmula, no (no existe ningún espacio libre en ella). Gerencia aclara que las zonas en construcción, sin espacios, no cuentan, y la regla se corrige: ∀z (TieneEspacios(z) → ∃e (EnZona(e, z) ∧ Libre(e))). Las reglas 1 y 2 se implementan como restricciones de unicidad en la base de datos; la 3, como una verificación en la asignación de espacios con su prueba automatizada.`,
  links: [['m2.prop', 'la lógica de predicados extiende la proposicional con cuantificadores'], ['for.contract', 'los contratos se escriben en lógica de predicados'], ['m10.model', 'SQL se basa en el cálculo relacional, una forma de lógica de predicados']],
  read: 'Rosen, *Matemática discreta y sus aplicaciones* (7.ª ed.), capítulo 1; Lehman, Leighton y Meyer, *Mathematics for Computer Science* (2017), capítulos 1 a 3; Velleman, *How to Prove It* (3.ª ed., 2019).',
  terms: [
    ['Predicado', 'afirmación con variables que se vuelve verdadera o falsa al dar valores a sus variables', ['Libre(e).', 'Ocupa(u, e).', 'x > 3.']],
    ['Cuantificador universal', 'símbolo ∀ que afirma algo de todos los elementos del dominio', ['∀e Libre(e).', 'Se corresponde con every.', 'Va con implicación.']],
    ['Cuantificador existencial', 'símbolo ∃ que afirma que al menos un elemento del dominio cumple algo', ['∃e Libre(e).', 'Se corresponde con some.', 'Va con conjunción.']],
    ['Dominio', 'conjunto de valores sobre el que se interpretan las variables cuantificadas', ['Los espacios del patio.', 'Los números naturales.', 'Cambia el valor de verdad.']],
    ['Verdad vacía', 'una afirmación universal sobre un conjunto vacío es verdadera', ['[].every(...) es true.', '∀x ∈ ∅ P(x).', 'No es un error del lenguaje.']],
    ['Contraejemplo', 'caso concreto que refuta una afirmación universal', ['n = 40 en n² + n + 41.', 'B-14 con dos unidades.', 'Basta uno solo.']],
    ['Demostración por contradicción', 'técnica que supone lo contrario de lo que se quiere probar y llega a un absurdo', ['Infinitud de los primos.', 'Euclides.', 'También se llama reducción al absurdo.']],
    ['Inducción estructural', 'técnica que prueba una propiedad para estructuras definidas recursivamente', ['Listas y árboles.', 'Casos base y paso.', 'Justifica la recursión.']]
  ],
  q: [
    ['¿Cómo se formaliza "todo espacio ocupado tiene una unidad"?', '∀e (Ocupado(e) → ∃u Ocupa(u, e))', ['∀e (Ocupado(e) ∧ ∃u Ocupa(u, e))', '∃e (Ocupado(e) → ∃u Ocupa(u, e))', '∃u ∀e Ocupa(u, e)'], 'Universal con implicación.', 3],
    ['¿Cuál es la negación de "todos pagaron"?', 'Alguno no pagó', ['Ninguno pagó', 'Todos no pagaron', 'Alguno pagó'], '¬∀x P(x) ≡ ∃x ¬P(x).', 2],
    ['¿Qué devuelve [].every(x => x > 100) en JavaScript?', 'true', ['false', 'undefined', 'Un error'], 'Verdad vacía.', 2],
    ['¿Son equivalentes ∀u ∃e Ocupa(u, e) y ∃e ∀u Ocupa(u, e)?', 'No: la primera dice que cada unidad ocupa algún espacio; la segunda, que hay un espacio que ocupan todas', ['Sí, siempre', 'Solo si hay un espacio', 'Solo en SQL'], 'El orden de los cuantificadores importa.', 3],
    ['¿Qué basta para refutar "todo número de la forma n² + n + 41 es primo"?', 'Un contraejemplo, como n = 40', ['Una demostración por inducción', 'Probar con n = 1', 'Nada: es verdad'], '40² + 40 + 41 = 41².', 2],
    ['¿Qué técnica demuestra "si n² es par, entonces n es par" probando que si n es impar, n² es impar?', 'Contraposición', ['Contradicción', 'Inducción', 'Contraejemplo'], '¬Q → ¬P.', 3],
    ['¿Cuál es la negación de ∀u ∃e Ocupa(u, e)?', '∃u ∀e ¬Ocupa(u, e)', ['∀u ∃e ¬Ocupa(u, e)', '∃u ∃e ¬Ocupa(u, e)', '¬∀u ∀e Ocupa(u, e)'], 'Se invierten los cuantificadores y se niega el interior.', 4],
    { tf: '∃x (A(x) → B(x)) es una buena forma de escribir "algún A es B".', v: false, e: 'Es verdadera casi siempre (basta un x que no sea A); se usa ∃x (A(x) ∧ B(x)).', l: 3 },
    { tf: 'La generalización universal exige haber demostrado la propiedad para un elemento arbitrario, sin suponer nada especial de él.', v: true, e: 'Si se usara algo particular del elemento, no valdría para todos.', l: 3 },
    { c: 'Escribe «paraTodo(lista, p)» y «existe(lista, p)» sin usar every ni some, y devuelve [paraTodo, existe] para la lista y el predicado "mayor que 2".', f: 'cuantificar', p: ['lista'], t: [[[[3, 4, 5]], [true, true]], [[[1, 5]], [false, true]], [[[]], [true, false]]], sol: '  const p = x => x > 2;\n  let todos = true, alguno = false;\n  for (const x of lista) { if (!p(x)) todos = false; if (p(x)) alguno = true; }\n  return [todos, alguno];', l: 2 },
    { c: 'Escribe «unaPorEspacio(ocupaciones)»: cada ocupación es {unidad, espacio}; devuelve true si ningún espacio tiene dos unidades distintas.', f: 'unaPorEspacio', p: ['ocupaciones'], t: [[[[{ unidad: 'A', espacio: 'B1' }, { unidad: 'B', espacio: 'B2' }]], true], [[[{ unidad: 'A', espacio: 'B1' }, { unidad: 'C', espacio: 'B1' }]], false], [[[]], true]], sol: '  const m = {};\n  for (const o of ocupaciones) { if (m[o.espacio] && m[o.espacio] !== o.unidad) return false; m[o.espacio] = o.unidad; }\n  return true;', l: 2 },
    { c: 'Escribe «contraejemplo(desde, hasta)»: devuelve el menor n en [desde, hasta] para el que n² + n + 41 no es primo, o -1 si no hay.', f: 'contraejemplo', p: ['desde', 'hasta'], t: [[[0, 50], 40], [[0, 39], -1], [[41, 45], 41]], sol: '  const primo = k => { if (k < 2) return false; for (let d = 2; d * d <= k; d++) if (k % d === 0) return false; return true; };\n  for (let n = desde; n <= hasta; n++) if (!primo(n * n + n + 41)) return n;\n  return -1;', l: 3 }
  ],
  gen: function (g) {
    var ng = [['Todos los espacios están libres', 'Algún espacio no está libre'], ['Alguna unidad tiene deuda', 'Ninguna unidad tiene deuda'], ['Todas las sedes tienen algún espacio libre', 'Alguna sede no tiene ningún espacio libre'], ['Existe un operador que trabaja todos los días', 'Todo operador descansa algún día'], ['Ninguna estadía está anulada', 'Alguna estadía está anulada']];
    ng.forEach(function (n) { g.mcq(3, '¿Cuál es la negación correcta de: "' + n[0] + '"?', n[1], [n[0].replace('Todos', 'Ningún').replace('Alguna', 'Todas las'), 'No se puede negar', 'La misma frase con "no" al final'].filter(function (x) { return x !== n[1]; }), 'Se invierte el cuantificador y se niega lo de adentro.'); });
    var tc = [['Suponer que hay finitos primos y llegar a un absurdo', 'Contradicción'], ['Probar que si n es impar, n² es impar, para concluir que si n² es par, n es par', 'Contraposición'], ['Mostrar n = 40 para refutar una afirmación universal', 'Contraejemplo'], ['Probar para la lista vacía y para un elemento seguido de una lista', 'Inducción estructural'], ['Separar en n par y n impar y probar cada caso', 'Por casos'], ['Escribir n = 2k y deducir n² = 2(2k²)', 'Directa']];
    tc.forEach(function (t) { g.mcq(2, '¿Qué técnica de demostración se usa? ' + t[0], t[1], ['Contradicción', 'Contraposición', 'Contraejemplo', 'Inducción estructural', 'Por casos', 'Directa'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Técnicas de demostración.'); });
    g.times(6, function (R) { var n = R.int(0, 6), arr = []; for (var i = 0; i < n; i++) arr.push(R.int(0, 9)); var k = R.int(1, 8); var t = arr.every(function (x) { return x > k; }); g.mcq(2, '¿Qué devuelve [' + arr.join(', ') + '].every(x => x > ' + k + ')?', String(t), [String(!t), 'undefined', 'Error'], n ? 'every es verdadero si todos cumplen.' : 'Verdad vacía: sobre una lista vacía, every es true.'); });
  },
  checks: [
    ['Traduce "ninguna unidad ocupa dos espacios" a lógica de predicados.', '∀u ∀e ∀f ((Ocupa(u, e) ∧ Ocupa(u, f)) → e = f).'],
    ['¿Por qué el universal va con implicación y el existencial con conjunción?', 'Porque "todo A es B" restringe la afirmación a los A (A → B), y "algún A es B" pide un elemento que sea A y B a la vez; invertirlos cambia el significado.'],
    ['Niega ∀z ∃e (EnZona(e, z) ∧ Libre(e)) y explícala en palabras.', '∃z ∀e (¬EnZona(e, z) ∨ ¬Libre(e)): hay una zona en la que ningún espacio está libre.'],
    ['Da un ejemplo de inducción estructural en programación.', 'Probar que una función recursiva sobre listas es correcta para la lista vacía y que, si lo es para el resto, lo es para un elemento seguido del resto.']
  ],
  cites: ['Rosen, K. (2019). *Discrete Mathematics and Its Applications* (8.ª ed.). McGraw-Hill.', 'Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT.', 'Velleman, D. (2019). *How to Prove It: A Structured Approach* (3.ª ed.). Cambridge University Press.', 'Gödel, K. (1931). Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I. *Monatshefte für Mathematik und Physik*, 38.', 'Codd, E. F. (1972). Relational Completeness of Data Base Sublanguages. *Database Systems*, Prentice Hall.'],
  project: { t: 'Reglas de negocio en lógica',
    goal: 'Formalizar reglas reales en lógica de predicados y verificarlas sobre datos.',
    steps: ['Elige un sistema conocido y escribe diez reglas de negocio en lenguaje natural.', 'Tradúcelas a lógica de predicados, definiendo predicados y dominios.', 'Identifica al menos dos ambigüedades que la formalización revele y resuélvelas.', 'Implementa cada regla como una función con every/some o una consulta SQL con EXISTS.', 'Ejecuta las verificaciones sobre un conjunto de datos y reporta los contraejemplos encontrados.'],
    deliver: 'Las reglas en español y en lógica, las ambigüedades resueltas, el código y el reporte.' },
  hito: ['Formaliza en lógica de predicados las reglas de ocupación de espacios de PatioApp y las del espacio libre por zona.', 'Implementa en PatioApp un verificador de invariantes que recorra los datos y reporte contraejemplos de cada regla.']
});
SDC.after('m2.pred', 'm2.prop');
})();
