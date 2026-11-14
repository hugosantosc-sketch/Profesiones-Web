(function () {
var S = SDC.S;

S('lc', 'lc.runtime', { title: 'Entorno de ejecución y recolección de basura',
  ask: '¿Qué concepto del entorno de ejecución se aplica?',
  lesson: `
> **La idea en simple.** Cuando llamas a una función, el programa necesita un lugar para sus parámetros, sus variables y la dirección a la que volver: una "hoja de trabajo" que se apila sobre la de quien la llamó y se descarta al terminar. Y los datos que deben sobrevivir más allá de una llamada van a otro lugar, el montículo, donde alguien tiene que limpiar lo que ya no se usa. Esa limpieza automática es la recolección de basura.

## La memoria de un programa en ejecución
Un proceso organiza su memoria en zonas:
- **Código:** las instrucciones, normalmente de solo lectura.
- **Datos estáticos:** variables globales y constantes, con tamaño conocido al compilar.
- **Pila:** los registros de activación de las llamadas en curso; crece y decrece con cada llamada y retorno.
- **Montículo** (*heap*): datos creados en tiempo de ejecución cuyo tiempo de vida no sigue el anidamiento de las llamadas (objetos, listas, clausuras).
La pila se administra sola y es rapidísima (reservar es mover un registro); el montículo exige un administrador.

## El registro de activación
Cada llamada crea un **registro de activación** (o **marco**). Según el libro del dragón contiene, en general:
- Los **parámetros reales** y el espacio para el **valor de retorno**.
- El **enlace de control** (o dinámico): apunta al marco de quien llamó, para restaurarlo al volver.
- El **enlace de acceso** (o estático): en lenguajes con funciones anidadas, apunta al marco de la función que la **encierra en el texto**, para acceder a sus variables según el ámbito léxico.
- El **estado guardado de la máquina**: la dirección de retorno y los registros que hay que preservar.
- Las **variables locales** y los **temporales**.
La forma exacta la fija la **convención de llamada** de cada plataforma: en Linux sobre x86-64 (System V), los seis primeros argumentos enteros viajan en los registros rdi, rsi, rdx, rcx, r8 y r9 y el resultado vuelve en rax; Windows usa otra convención. Respetarla permite que código compilado por distintos compiladores, e incluso escrito en distintos lenguajes, se llame entre sí. Una recursión demasiado profunda agota la pila: es el **desbordamiento de pila**.
~~~js
// Cada llamada de fib ingenuo crea un marco: contamos marcos y profundidad máxima
function medir(n) {
  let marcos = 0, prof = 0, max = 0;
  function fib(k) { marcos++; prof++; max = Math.max(max, prof); const r = k < 2 ? k : fib(k - 1) + fib(k - 2); prof--; return r; }
  const v = fib(n);
  return 'fib(' + n + ') = ' + v + ' · marcos creados: ' + marcos + ' · profundidad máxima de la pila: ' + max;
}
[5, 10, 20].forEach(n => console.log(medir(n)));
~~~

## Formas de pasar parámetros
| Mecanismo | Qué recibe la función | Ejemplo |
| Por valor | una copia del valor | C; en Java, Python y JavaScript se copia la referencia (llamada "por compartición") |
| Por referencia | un alias de la variable del llamador | parámetros «&» de C++, «var» de Pascal |
| Por valor-resultado | una copia que se devuelve al terminar | parámetros «in out» de Ada |
| Por nombre | la expresión sin evaluar, que se evalúa en cada uso | ALGOL 60 |
| Por necesidad | la expresión, evaluada como mucho una vez | Haskell |
La confusión más común en JavaScript o Python: al pasar un objeto, la función recibe una copia de la **referencia**; puede modificar el objeto (y el llamador lo verá), pero si reasigna el parámetro a otro objeto, el llamador no se entera. Barbara Liskov llamó a esto **llamada por compartición** en su lenguaje CLU.

## Administrar el montículo a mano
En C y C++, el programador pide memoria («malloc», «new») y la libera («free», «delete»). Errores clásicos:
- **Puntero colgante:** usar memoria ya liberada.
- **Doble liberación:** liberar dos veces el mismo bloque.
- **Fuga:** olvidar liberar memoria que ya no se usa.
- **Desbordamiento de búfer:** escribir fuera de los límites de un bloque.
No son solo fallos: son vulnerabilidades. Matt Miller, de Microsoft, informó en 2019 que alrededor del 70% de las vulnerabilidades que Microsoft corregía cada año se debían a errores de seguridad de memoria, y el proyecto Chromium reportó una proporción parecida. Por eso agencias como la CISA de Estados Unidos recomiendan lenguajes con seguridad de memoria.

## Recolección de basura
La **recolección de basura** libera automáticamente los objetos que ya no son **alcanzables** desde las **raíces** (variables globales, la pila y los registros). Técnicas principales:
- **Conteo de referencias** (George Collins, 1960): cada objeto cuenta cuántas referencias apuntan a él y se libera cuando llega a cero. Libera de inmediato y de forma incremental, pero cada asignación de referencia cuesta y **no recupera ciclos**: dos objetos que se apuntan entre sí nunca bajan a cero. CPython lo usa con un detector de ciclos adicional; Swift lo usa en su sistema ARC.
- **Marcar y barrer** (John McCarthy, 1960, para LISP): se marcan los objetos alcanzables recorriendo el grafo desde las raíces y luego se barre la memoria liberando los no marcados. Recupera ciclos, pero la pausa recorre todo y deja la memoria fragmentada.
- **Copia** (C. J. Cheney, 1970): la memoria se divide en dos mitades; se copian los objetos vivos de una a otra, compactándolos, y la mitad vieja se descarta entera. Rápido y sin fragmentación, a costa de usar el doble de memoria.
- **Generacional:** Henry Lieberman y Carl Hewitt (1983) y David Ungar (1984) aprovecharon la **hipótesis generacional**: la mayoría de los objetos mueren jóvenes. Los objetos nuevos se crean en una generación joven que se recolecta seguido y rápido; los que sobreviven varias veces pasan a la generación vieja, recolectada raramente. Casi todos los recolectores modernos (JVM, .NET, V8) son generacionales.
- **Incremental y concurrente:** Edsger Dijkstra, Leslie Lamport y sus coautores describieron en 1978 el **marcado tricolor** (blanco, gris, negro), que permite marcar mientras el programa sigue corriendo, con **barreras de escritura** que avisan al recolector de los cambios. Así trabajan el recolector concurrente de Go y ZGC de Java, con pausas de menos de un milisegundo.
~~~js
// Marcar desde las raíces y comparar con el conteo de referencias
const heap = { A: ['B'], B: [], C: ['D'], D: ['C'] };   // C y D forman un ciclo sin raíz
function marcar(raices) { const vivo = new Set(), pila = [...raices]; while (pila.length) { const o = pila.pop(); if (!vivo.has(o)) { vivo.add(o); pila.push(...heap[o]); } } return vivo; }
const vivos = marcar(['A']);
const conteo = {}; Object.values(heap).flat().forEach(o => conteo[o] = (conteo[o] || 0) + 1);
console.log('alcanzables:', [...vivos].join(', '));
console.log('el conteo de referencias no libera:', Object.keys(heap).filter(o => !vivos.has(o) && conteo[o] > 0).join(', '));
~~~

## Las tres métricas
Todo recolector equilibra tres cosas que se contraponen:
- **Rendimiento:** qué fracción del tiempo hace trabajo útil el programa.
- **Latencia:** cuánto duran las pausas (crítico en servidores y juegos).
- **Huella de memoria:** cuánta memoria extra necesita para funcionar bien.
Richard Jones, Antony Hosking y Eliot Moss estudian estos compromisos en *The Garbage Collection Handbook*. Una alternativa sin recolector es la de **Rust**: el compilador sigue la **propiedad** de cada valor y lo libera de forma determinista al salir de su ámbito, rechazando al compilar los usos que podrían dejar punteros colgantes.

## Ejemplo resuelto: la memoria del servidor de PatioApp
El servidor de PatioApp en Node.js crece de 200 MB a 1.5 GB en un día y se reinicia por falta de memoria. Diagnóstico:
1. Dos **instantáneas del montículo** (*heap snapshots*) con una hora de diferencia muestran miles de objetos «Estadia» que deberían haberse liberado.
2. Sus **cadenas de retención** (qué referencias los mantienen alcanzables) llevan a un objeto global «cacheFotos» que guarda cada estadía consultada y nunca la borra: no es que el recolector falle, es que los objetos siguen siendo **alcanzables**.
3. Corrección: reemplazar el objeto por una caché LRU con tamaño máximo (o un «WeakMap» si la clave es el objeto mismo, que no impide su recolección).
4. Verificación: la memoria se estabiliza en unos 300 MB y las pausas del recolector, medidas con las herramientas de diagnóstico de V8, bajan de 400 ms a menos de 20 ms porque la generación vieja ya no crece sin límite.
La lección: en lenguajes con recolector también hay **fugas**, solo que son referencias olvidadas.`,
  links: [['so.mem', 'la pila y el montículo son regiones del espacio de direcciones del proceso'], ['lc.sem', 'el enlace de acceso implementa el ámbito léxico en tiempo de ejecución'], ['m4.graphs', 'marcar los objetos vivos es recorrer un grafo desde las raíces']],
  read: 'Aho, Lam, Sethi y Ullman, capítulo 7; Jones, Hosking y Moss, *The Garbage Collection Handbook*, capítulos 1 a 5; Nystrom, *Crafting Interpreters*, capítulo 26 (Garbage Collection).',
  terms: [
    ['Registro de activación', 'bloque de memoria en la pila con los parámetros, variables locales, dirección de retorno y enlaces de una llamada', ['Se crea en cada llamada y se descarta al retornar.', 'Incluye el enlace al marco del llamador.', 'Se llama también marco.']],
    ['Convención de llamada', 'acuerdo de una plataforma sobre cómo se pasan argumentos, se devuelven resultados y se preservan registros', ['System V usa rdi, rsi y rdx para los primeros argumentos.', 'Permite llamar código de otros compiladores.', 'Windows usa una distinta.']],
    ['Llamada por compartición', 'paso de parámetros en que la función recibe una copia de la referencia a un objeto', ['Puede modificar el objeto del llamador.', 'Reasignar el parámetro no afecta al llamador.', 'Así funcionan Java, Python y JavaScript.']],
    ['Puntero colgante', 'puntero a memoria que ya fue liberada', ['Usarlo causa comportamientos impredecibles.', 'Es una fuente de vulnerabilidades.', 'Rust lo impide al compilar.']],
    ['Conteo de referencias', 'técnica que libera un objeto cuando la cantidad de referencias a él llega a cero', ['Libera de inmediato.', 'No recupera ciclos.', 'CPython y Swift lo usan.']],
    ['Marcar y barrer', 'recolección que marca los objetos alcanzables desde las raíces y libera los no marcados', ['McCarthy la creó para LISP en 1960.', 'Recupera ciclos.', 'Puede causar pausas y fragmentación.']],
    ['Hipótesis generacional', 'observación de que la mayoría de los objetos mueren poco después de ser creados', ['Justifica recolectar seguido la generación joven.', 'Lieberman, Hewitt y Ungar la aprovecharon en los 80.', 'Casi todos los recolectores modernos se basan en ella.']],
    ['Barrera de escritura', 'código que se ejecuta en cada escritura de una referencia para mantener informado al recolector', ['Permite recolectar mientras el programa corre.', 'Registra referencias de objetos viejos a jóvenes.', 'Tiene un pequeño costo en cada asignación.']]
  ],
  q: [
    ['¿Dónde se guardan las variables locales de una llamada a función?', 'En su registro de activación en la pila', ['En el montículo siempre', 'En el código', 'En el disco'], 'Salvo que una clausura las capture.', 1],
    ['¿Para qué sirve el enlace de acceso de un marco?', 'Para acceder a las variables de la función que encierra a esta en el texto', ['Para volver al llamador', 'Para liberar memoria', 'Para llamar al recolector'], 'Implementa el ámbito léxico con funciones anidadas.', 4],
    ['En JavaScript, una función recibe un objeto y le asigna una propiedad nueva. ¿El llamador ve el cambio?', 'Sí, porque ambos apuntan al mismo objeto', ['No, porque recibió una copia del objeto', 'Solo en modo estricto', 'Solo si el objeto es un arreglo'], 'Llamada por compartición.', 3],
    ['¿Qué objetos no puede liberar el conteo de referencias por sí solo?', 'Los que forman ciclos sin referencias desde las raíces', ['Los objetos pequeños', 'Los arreglos', 'Las cadenas'], 'Sus contadores nunca llegan a cero.', 3],
    ['¿Qué aprovecha un recolector generacional?', 'Que la mayoría de los objetos mueren jóvenes', ['Que los objetos viejos mueren pronto', 'Que no hay ciclos', 'Que la memoria es infinita'], 'Recolecta seguido y rápido la generación joven.', 3],
    ['¿Qué desventaja tiene un recolector por copia?', 'Necesita aproximadamente el doble de memoria', ['No recupera ciclos', 'Fragmenta la memoria', 'No puede mover objetos'], 'Usa dos mitades.', 3],
    ['Según Microsoft (2019), ¿qué proporción aproximada de sus vulnerabilidades corregidas se debía a errores de seguridad de memoria?', 'Alrededor del 70%', ['Alrededor del 5%', 'Alrededor del 20%', 'El 100%'], 'Chromium reportó una proporción parecida.', 3],
    { tf: 'En un lenguaje con recolector de basura no puede haber fugas de memoria.', v: false, e: 'Si una referencia olvidada mantiene objetos alcanzables, no se liberan.', l: 2 },
    { tf: 'Rust libera la memoria de forma determinista sin recolector, siguiendo la propiedad de cada valor.', v: true, e: 'El compilador verifica los préstamos.', l: 2 },
    { c: 'Escribe «alcanzables(heap, raices)»: heap es un objeto {id: [ids referenciados]}; devuelve los ids alcanzables desde las raíces, ordenados.', f: 'alcanzables', p: ['heap', 'raices'], t: [[[{ A: ['B'], B: [], C: ['D'], D: ['C'] }, ['A']], ['A', 'B']], [[{ A: ['B'], B: [], C: ['D'], D: ['C'] }, ['C']], ['C', 'D']], [[{ A: [] }, []], []], [[{ X: ['Y'], Y: ['Z'], Z: ['X'] }, ['Y']], ['X', 'Y', 'Z']]], sol: '  const vivo = new Set(), pila = [...raices];\n  while (pila.length) { const o = pila.pop(); if (!vivo.has(o)) { vivo.add(o); pila.push(...(heap[o] || [])); } }\n  return [...vivo].sort();', l: 3 },
    { c: 'Escribe «fugasPorConteo(heap, raices)»: devuelve, ordenados, los objetos no alcanzables desde las raíces que el conteo de referencias no liberaría porque alguien todavía los referencia.', f: 'fugasPorConteo', p: ['heap', 'raices'], t: [[[{ A: ['B'], B: [], C: ['D'], D: ['C'] }, ['A']], ['C', 'D']], [[{ A: [], B: [] }, ['A']], []], [[{ A: [], B: ['C'], C: [] }, ['A']], ['C']]], sol: '  const vivo = new Set(), pila = [...raices];\n  while (pila.length) { const o = pila.pop(); if (!vivo.has(o)) { vivo.add(o); pila.push(...(heap[o] || [])); } }\n  const ref = {};\n  for (const v of Object.values(heap)) for (const o of v) ref[o] = (ref[o] || 0) + 1;\n  return Object.keys(heap).filter(o => !vivo.has(o) && ref[o] > 0).sort();', h: 'Cuenta las referencias entrantes de cada objeto y quédate con los no alcanzables que tienen alguna.', l: 4 },
    { c: 'Escribe «llamadasFib(n)»: cuántas llamadas (marcos) hace la función fib recursiva ingenua para calcular fib(n).', f: 'llamadasFib', p: ['n'], t: [[[0], 1], [[1], 1], [[5], 15], [[10], 177]], sol: '  const a = [1, 1];\n  for (let i = 2; i <= n; i++) a[i] = 1 + a[i - 1] + a[i - 2];\n  return a[n];', l: 2 }
  ],
  gen: function (g) {
    var pp = [['C++ con un parámetro int&', 'Por referencia'], ['C con un parámetro int', 'Por valor'], ['Java con un objeto como parámetro', 'Por compartición'], ['ALGOL 60 con parámetros por nombre', 'Por nombre'], ['Haskell con evaluación perezosa', 'Por necesidad'], ['Ada con un parámetro in out', 'Por valor-resultado']];
    pp.forEach(function (p) { g.mcq(3, '¿Qué mecanismo de paso de parámetros corresponde a ' + p[0] + '?', p[1], ['Por valor', 'Por referencia', 'Por compartición', 'Por nombre', 'Por necesidad', 'Por valor-resultado'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Cada lenguaje define cómo llegan los argumentos.'); });
    var gc = [['Libera un objeto en cuanto nadie lo referencia, pero no recupera ciclos', 'Conteo de referencias'], ['Recorre desde las raíces y luego libera lo no visitado', 'Marcar y barrer'], ['Copia los objetos vivos a otra mitad de la memoria', 'Copia'], ['Recolecta seguido los objetos jóvenes y raramente los viejos', 'Generacional'], ['Marca mientras el programa sigue ejecutándose con barreras de escritura', 'Concurrente tricolor']];
    gc.forEach(function (x) { g.mcq(2, '¿Qué técnica de recolección describe esto? ' + x[0], x[1], ['Conteo de referencias', 'Marcar y barrer', 'Copia', 'Generacional', 'Concurrente tricolor'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Familias de recolectores.'); });
    g.times(5, function (R) { var n = R.int(2, 15), a = [1, 1]; for (var i = 2; i <= n; i++) a[i] = 1 + a[i - 1] + a[i - 2]; g.input(3, '¿Cuántas llamadas hace fib recursivo ingenuo para calcular fib(' + n + ')? (llamadas(n) = 1 + llamadas(n − 1) + llamadas(n − 2), con llamadas(0) = llamadas(1) = 1)', a[n], 'Crece de forma exponencial.'); });
  },
  checks: [
    ['¿Qué contiene un registro de activación?', 'Parámetros, espacio para el retorno, enlace de control, enlace de acceso, estado guardado (dirección de retorno y registros), variables locales y temporales.'],
    ['Explica la llamada por compartición con un ejemplo.', 'La función recibe una copia de la referencia: si modifica una propiedad del objeto, el llamador lo ve; si reasigna el parámetro a otro objeto, no.'],
    ['¿Por qué el conteo de referencias no recupera ciclos y cómo se resuelve?', 'Porque los objetos del ciclo se referencian entre sí y su contador nunca llega a cero; se resuelve con un detector de ciclos o con un recolector por marcado.'],
    ['¿Qué compromiso existe entre rendimiento, latencia y huella de memoria en un recolector?', 'Reducir las pausas suele exigir trabajo concurrente con barreras (menos rendimiento) o más memoria; maximizar el rendimiento puede implicar pausas más largas.'],
    ['¿Cómo puede haber una fuga en un lenguaje con recolector?', 'Cuando una referencia olvidada, como una caché global sin límite, mantiene alcanzables objetos que ya no se necesitan.']
  ],
  cites: ['McCarthy, J. (1960). Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I. *Communications of the ACM*, 3(4).', 'Collins, G. (1960). A Method for Overlapping and Erasure of Lists. *Communications of the ACM*, 3(12).', 'Cheney, C. J. (1970). A Nonrecursive List Compacting Algorithm. *Communications of the ACM*, 13(11).', 'Lieberman, H. y Hewitt, C. (1983). A Real-Time Garbage Collector Based on the Lifetimes of Objects. *Communications of the ACM*, 26(6).', 'Dijkstra, E. et al. (1978). On-the-Fly Garbage Collection: An Exercise in Cooperation. *Communications of the ACM*, 21(11).', 'Jones, R., Hosking, A. y Moss, E. (2023). *The Garbage Collection Handbook* (2.ª ed.). CRC Press.'],
  project: { t: 'Recolector de basura para un intérprete',
    goal: 'Agregar administración automática de memoria a un intérprete propio.',
    steps: ['Representa los objetos de un intérprete pequeño en un montículo simulado con referencias entre ellos.', 'Implementa conteo de referencias y demuestra con un ciclo que pierde memoria.', 'Implementa marcar y barrer con raíces en la pila del intérprete y en las variables globales.', 'Agrega una generación joven y mide cuántos objetos sobreviven a cada recolección en un programa típico.', 'Grafica la memoria usada y las pausas con cada estrategia.'],
    deliver: 'El intérprete con sus recolectores, las mediciones y el informe.' },
  hito: ['Toma dos instantáneas del montículo del servidor de PatioApp con una hora de carga entre ellas y documenta qué objetos crecen y por qué.', 'Corrige en PatioApp cualquier caché sin límite reemplazándola por una LRU acotada o un WeakMap, y verifica que la memoria se estabiliza.']
});

S('lc', 'lc.ir', { title: 'Código intermedio y generación de código',
  ask: '¿Qué concepto de código intermedio o generación de código se aplica?',
  lesson: `
> **La idea en simple.** Traducir directamente de español a japonés, a ruso y a árabe exige tres diccionarios distintos por cada idioma de origen. Es más práctico traducir primero a un idioma intermedio preciso y desde ahí a cada destino. Los compiladores hacen lo mismo: traducen el programa a un **código intermedio** sencillo y uniforme, lo mejoran ahí, y recién al final lo convierten en instrucciones de una máquina concreta.

## Por qué un código intermedio
- **Separar** la parte frontal (que depende del lenguaje fuente) de la final (que depende de la máquina): con n lenguajes y m máquinas se necesitan n + m piezas.
- **Optimizar una sola vez**, sobre una representación simple, para todos los lenguajes y todas las máquinas.
- **Simplificar** cada fase: el código intermedio no tiene la riqueza sintáctica del lenguaje fuente ni las peculiaridades del procesador.
Los compiladores suelen usar varias representaciones: una de **alto nivel** cercana al AST, una de **nivel medio** como el código de tres direcciones y una de **bajo nivel** cercana a las instrucciones de la máquina.

## Código de tres direcciones
En el **código de tres direcciones**, cada instrucción tiene como máximo un operador y tres operandos: «x = y op z». Las expresiones complejas se descomponen con **temporales**:
~~~txt
fuente:  tarifa = base * 2 - descuento * horas
t1 = base * 2
t2 = descuento * horas
t3 = t1 - t2
tarifa = t3
~~~
El control de flujo se expresa con **etiquetas** y **saltos**: «si x < y ir a L1», «ir a L2». Así, un «si» o un «mientras» se traducen en comparaciones y saltos, igual que en el lenguaje de máquina pero sin registros ni direcciones reales.

## Bloques básicos y grafo de flujo de control
Un **bloque básico** es una secuencia de instrucciones que se ejecuta siempre completa: solo se entra por la primera y solo se sale por la última. Para encontrarlos se marcan los **líderes**: la primera instrucción, el destino de cualquier salto y la instrucción que sigue a un salto; cada bloque va de un líder hasta antes del siguiente. Los bloques se conectan en el **grafo de flujo de control** (CFG), con una arista por cada posible paso de uno a otro. Sobre ese grafo se hacen casi todas las optimizaciones globales.

## Forma SSA
La **forma de asignación estática única** (SSA) exige que cada variable se asigne **una sola vez** en el texto del programa. Si una variable cambia, cada asignación crea una versión nueva: x₁, x₂, x₃. Donde dos caminos se juntan (después de un «si»), una función **φ** elige la versión según por dónde se llegó: «x₃ = φ(x₁, x₂)».
~~~txt
si horas > 24 entonces tarifa = base * 2 sino tarifa = base
total = tarifa + impuesto

en SSA:
  si horas > 24 ir a L1 sino ir a L2
L1: tarifa1 = base * 2      ir a L3
L2: tarifa2 = base          ir a L3
L3: tarifa3 = φ(tarifa1, tarifa2)
    total1 = tarifa3 + impuesto
~~~
Con SSA, cada uso de una variable apunta a una única definición, lo que simplifica muchísimo la propagación de constantes, la eliminación de código muerto y otras optimizaciones. Ron Cytron y sus coautores publicaron en 1991 un algoritmo eficiente para construirla usando la **frontera de dominancia**. Hoy la usan LLVM, GCC (desde 2005), el compilador de Go, TurboFan de V8 y el compilador C2 de HotSpot.

## Máquinas de pila
Otra forma de código intermedio es el código para una **máquina de pila**: las instrucciones toman sus operandos de una pila y dejan ahí el resultado. «base * 2 - descuento» se traduce en «cargar base; empujar 2; multiplicar; cargar descuento; restar». Es el formato del **bytecode** de la JVM (Java, Kotlin, Scala), de CPython, del CIL de .NET y de **WebAssembly** (publicado en 2017 y recomendación del W3C desde 2019). Ventajas: el código es compacto, fácil de generar y portable. Un JIT luego lo traduce a código que usa registros.
~~~js
// Una máquina de pila mínima: el destino de nuestro compilador de tarifas
function ejecutar(programa, entorno) {
  const pila = [];
  for (const [op, arg] of programa) {
    if (op === 'push') pila.push(arg);
    else if (op === 'load') pila.push(entorno[arg]);
    else { const b = pila.pop(), a = pila.pop(); pila.push(op === 'add' ? a + b : op === 'sub' ? a - b : op === 'mul' ? a * b : a / b); }
  }
  return pila.pop();
}
const codigo = [['load', 'base'], ['push', 2], ['mul'], ['load', 'descuento'], ['load', 'horas'], ['mul'], ['sub']];
console.log(ejecutar(codigo, { base: 50, descuento: 1, horas: 30 }));   // 50 * 2 - 1 * 30 = 70
~~~
Generar código de pila desde un AST es un recorrido en **postorden**: primero los hijos, luego la operación del padre.

## LLVM
Chris Lattner y Vikram Adve presentaron en 2004 **LLVM**, una infraestructura de compilación con un código intermedio en SSA bien definido, tipado y con forma textual legible. Clang (C, C++, Objective-C), Rust, Swift, Julia y muchos más generan LLVM IR y aprovechan sus optimizaciones y sus generadores de código para decenas de procesadores. Crear un lenguaje nuevo se volvió mucho más barato: basta con escribir la parte frontal.

## Generación de código
La parte final convierte el código intermedio en instrucciones reales. Tres problemas centrales:
- **Selección de instrucciones:** elegir qué instrucciones de la máquina implementan cada operación. Se modela como cubrir el árbol de la expresión con "baldosas" que corresponden a instrucciones, eligiendo la cobertura más barata. Por ejemplo, x86 puede sumar y multiplicar por 4 una dirección en una sola instrucción «lea».
- **Asignación de registros:** el procesador tiene pocos registros (16 de uso general en x86-64) y muchos temporales. Gregory Chaitin y sus colegas de IBM propusieron en 1981 modelarlo como **coloreo de grafos**: cada variable es un nodo, hay una arista entre dos variables que están **vivas a la vez** (no pueden compartir registro) y cada color es un registro. Si no alcanza, algunas variables se **derraman** a la memoria. Los JIT, que deben compilar rápido, usan la **exploración lineal** (Massimiliano Poletto y Vivek Sarkar, 1999), más simple y casi tan buena.
- **Planificación de instrucciones:** reordenar instrucciones independientes para aprovechar la segmentación del procesador y no esperar a la memoria.

## Generar código para una máquina de pila o de registros
Ambos diseños existen en la práctica: la JVM y WebAssembly usan pila, mientras que la máquina virtual de Lua (desde la versión 5.0) y la de Dalvik en Android usan registros virtuales. Roberto Ierusalimschy y sus coautores explicaron en 2005 que el cambio de Lua a registros redujo la cantidad de instrucciones ejecutadas, a costa de instrucciones más largas.

## Enlace y carga
El compilador produce **archivos objeto** con código, datos y una tabla de símbolos con lo que definen y lo que necesitan. El **enlazador** los une, resuelve las referencias entre ellos y aplica las **reubicaciones** (ajusta direcciones). El enlace puede ser **estático** (todo en un ejecutable) o **dinámico** (bibliotecas compartidas que se cargan al ejecutar, como las «.so» de Linux y las «.dll» de Windows). El **cargador** del sistema operativo pone el ejecutable en memoria y salta a su punto de entrada.

## Ejemplo resuelto: compilar una regla de tarifas
La regla «tarifa = base * 2 - descuento * horas» tiene el AST «−(*(base, 2), *(descuento, horas))». El generador recorre el árbol en postorden y emite:
1. Para «*(base, 2)»: «load base», «push 2», «mul».
2. Para «*(descuento, horas)»: «load descuento», «load horas», «mul».
3. Para la resta: «sub».
4. Para la asignación: «store tarifa».
Son ocho instrucciones que ejecuta la máquina de pila de PatioApp. Comparado con el intérprete de árbol, el código compilado se puede guardar junto a la regla, no necesita volver a analizar el texto en cada estadía y recorre un arreglo plano en lugar de saltar entre nodos del árbol, lo que mejora el uso de la caché: en las pruebas de PatioApp evaluar 100 000 estadías bajó de 180 ms a 60 ms.`,
  links: [['arq.isa', 'la generación de código produce instrucciones de un conjunto de instrucciones concreto'], ['lc.opt', 'las optimizaciones trabajan sobre el código intermedio y el grafo de flujo'], ['m4.graphs', 'la asignación de registros por coloreo es un problema de grafos']],
  read: 'Aho, Lam, Sethi y Ullman, capítulos 6 y 8; Cooper y Torczon, *Engineering a Compiler*, capítulos 5, 9, 11 y 13; Nystrom, *Crafting Interpreters*, capítulos 14 a 17; Cytron y otros (1991); Lattner y Adve (2004).',
  terms: [
    ['Código intermedio', 'representación del programa entre el código fuente y el de máquina, independiente de ambos', ['El código de tres direcciones.', 'LLVM IR.', 'El bytecode de la JVM.']],
    ['Código de tres direcciones', 'código intermedio con instrucciones de la forma x = y op z', ['t1 = base * 2.', 'Usa temporales para expresiones complejas.', 'Los saltos expresan el control de flujo.']],
    ['Bloque básico', 'secuencia de instrucciones que solo tiene entrada por la primera y salida por la última', ['Empieza en un líder.', 'Se ejecuta siempre completa.', 'Es el nodo del grafo de flujo de control.']],
    ['Forma SSA', 'representación en la que cada variable se asigna una sola vez y las uniones de caminos usan funciones φ', ['tarifa3 = φ(tarifa1, tarifa2).', 'Simplifica muchas optimizaciones.', 'La usan LLVM y GCC.']],
    ['Máquina de pila', 'modelo de ejecución en que las instrucciones toman operandos de una pila y dejan el resultado en ella', ['El bytecode de la JVM y de CPython.', 'WebAssembly.', 'El código es compacto y fácil de generar.']],
    ['Asignación de registros', 'decisión de qué valores se guardan en los pocos registros del procesador y cuáles en memoria', ['Se modela como coloreo de grafos.', 'Los JIT usan exploración lineal.', 'Lo que no cabe se derrama a memoria.']],
    ['Selección de instrucciones', 'elección de las instrucciones de la máquina que implementan cada operación del código intermedio', ['Cubrir el árbol con baldosas de costo mínimo.', 'Usar lea para calcular una dirección.', 'Depende del procesador destino.']],
    ['Enlazador', 'programa que une archivos objeto, resuelve sus referencias y ajusta direcciones', ['Produce el ejecutable.', 'Informa símbolos no definidos.', 'Puede enlazar de forma estática o dinámica.']]
  ],
  q: [
    ['¿Cuántas instrucciones de tres direcciones (sin contar la asignación final) genera «a + b * c»?', '2', ['1', '3', '4'], 't1 = b * c; t2 = a + t1.', 2],
    ['¿Qué instrucción es líder de un bloque básico?', 'El destino de un salto', ['Cualquier suma', 'La última instrucción del programa', 'Una instrucción sin temporales'], 'También la primera y la que sigue a un salto.', 3],
    ['¿Para qué sirve una función φ en SSA?', 'Para elegir la versión de una variable según el camino por el que se llegó a un punto de unión', ['Para llamar a una función', 'Para liberar memoria', 'Para optimizar bucles'], 'Aparece donde se juntan caminos.', 3],
    ['¿Qué deja en la pila el programa «push 3, push 4, mul, push 2, sub»?', '10', ['14', '5', '24'], '3 × 4 − 2.', 2],
    ['En la asignación de registros por coloreo, ¿qué significa una arista entre dos variables?', 'Que están vivas a la vez y no pueden compartir registro', ['Que tienen el mismo nombre', 'Que se suman', 'Que una depende de la otra'], 'Chaitin, 1981.', 4],
    ['¿Qué ventaja dio LLVM a quienes crean lenguajes nuevos?', 'Basta escribir la parte frontal para obtener optimizaciones y generación de código para muchas máquinas', ['Elimina la necesidad de un analizador', 'Interpreta cualquier lenguaje', 'Evita los tipos'], 'Rust y Swift lo usan.', 3],
    ['¿Qué recorrido del AST produce código para una máquina de pila?', 'Postorden: primero los hijos y luego la operación', ['Preorden', 'Por niveles', 'Al azar'], 'Los operandos deben estar en la pila antes del operador.', 3],
    { tf: 'En SSA una variable puede asignarse varias veces en el texto del programa.', v: false, e: 'Cada asignación crea una versión nueva con otro nombre.', l: 2 },
    { tf: 'WebAssembly es un código para una máquina de pila.', v: true, e: 'Sus instrucciones operan sobre una pila de valores.', l: 2 },
    { c: 'Escribe «ejecutarPila(programa, entorno)»: instrucciones ["push", n], ["load", nombre], ["add"], ["sub"], ["mul"], ["div"]; devuelve el valor en la cima al final.', f: 'ejecutarPila', p: ['programa', 'entorno'], t: [[[[['push', 3], ['push', 4], ['mul'], ['push', 2], ['sub']], {}], 10], [[[['load', 'base'], ['push', 2], ['mul'], ['load', 'descuento'], ['load', 'horas'], ['mul'], ['sub']], { base: 50, descuento: 1, horas: 30 }], 70], [[[['push', 8], ['push', 2], ['div']], {}], 4]], sol: '  const p = [];\n  for (const [op, a] of programa) {\n    if (op === "push") p.push(a);\n    else if (op === "load") p.push(entorno[a]);\n    else { const y = p.pop(), x = p.pop(); p.push(op === "add" ? x + y : op === "sub" ? x - y : op === "mul" ? x * y : x / y); }\n  }\n  return p.pop();', l: 3 },
    { c: 'Escribe «tresDirecciones(rpn)»: rpn es una lista de operandos y operadores (+ − * /) en notación polaca inversa; devuelve las instrucciones "tN = a op b" con temporales t1, t2…', f: 'tresDirecciones', p: ['rpn'], t: [[[['a', 'b', 'c', '*', '+']], ['t1 = b * c', 't2 = a + t1']], [[['x', 'y', '+', 'z', '*']], ['t1 = x + y', 't2 = t1 * z']], [[['a']], []]], sol: '  const p = [], r = [];\n  let n = 0;\n  for (const t of rpn) {\n    if (["+", "-", "*", "/"].includes(t)) { const b = p.pop(), a = p.pop(), tmp = "t" + (++n); r.push(tmp + " = " + a + " " + t + " " + b); p.push(tmp); }\n    else p.push(t);\n  }\n  return r;', h: 'Usa una pila de nombres: cada operador saca dos operandos y empuja un temporal nuevo.', l: 3 },
    { c: 'Escribe «registrosNecesarios(intervalos)»: cada intervalo [inicio, fin) indica cuándo está viva una variable; devuelve el máximo de variables vivas a la vez (registros necesarios sin derramar).', f: 'registrosNecesarios', p: ['intervalos'], t: [[[[[0, 3], [1, 4], [5, 6]]], 2], [[[[0, 10], [1, 2], [3, 4], [5, 6]]], 2], [[[[0, 1], [1, 2]]], 1], [[[[0, 5], [1, 5], [2, 5]]], 3]], sol: '  const ev = [];\n  for (const [a, b] of intervalos) { ev.push([a, 1]); ev.push([b, -1]); }\n  ev.sort((x, y) => x[0] - y[0] || x[1] - y[1]);\n  let c = 0, m = 0;\n  for (const [, d] of ev) { c += d; m = Math.max(m, c); }\n  return m;', l: 4 }
  ],
  gen: function (g) {
    var pil = [[[3, 4, '+', 2, '*'], 14], [[10, 2, '-', 3, '*'], 24], [[5, 1, 2, '+', '*'], 15], [[8, 4, '/', 1, '+'], 3], [[2, 3, 4, '*', '+'], 14], [[9, 3, '-', 2, '/'], 3]];
    pil.forEach(function (p) { g.input(2, 'En una máquina de pila, ¿qué valor queda tras ejecutar: ' + p[0].map(function (x) { return typeof x === 'number' ? 'push ' + x : x === '+' ? 'add' : x === '-' ? 'sub' : x === '*' ? 'mul' : 'div'; }).join(', ') + '?', p[1], 'Cada operación saca dos valores y empuja el resultado.'); });
    var tac = [['a + b', 1], ['a + b * c', 2], ['(a + b) * (c + d)', 3], ['a * b + c * d - e', 4], ['a - b - c', 2], ['a', 0]];
    tac.forEach(function (t) { g.input(2, '¿Cuántas instrucciones con operador genera en código de tres direcciones la expresión ' + t[0] + '?', t[1], 'Una por cada operador binario.'); });
    var ir = [['Bytecode de la JVM', 'Máquina de pila'], ['LLVM IR', 'SSA'], ['t1 = b * c; t2 = a + t1', 'Tres direcciones'], ['WebAssembly', 'Máquina de pila'], ['Representación intermedia de GCC desde 2005', 'SSA']];
    ir.forEach(function (x) { g.mcq(2, '¿Qué tipo de código intermedio es ' + x[0] + '?', x[1], ['Máquina de pila', 'SSA', 'Tres direcciones', 'Código fuente'].filter(function (y) { return y !== x[1]; }), 'Formas de representación intermedia.'); });
  },
  checks: [
    ['¿Por qué los compiladores usan un código intermedio?', 'Para separar la parte frontal de la final, optimizar una sola vez para todos los lenguajes y máquinas, y simplificar cada fase.'],
    ['Traduce «tarifa = base * 2 + extra * horas» a código de tres direcciones.', 't1 = base * 2; t2 = extra * horas; t3 = t1 + t2; tarifa = t3.'],
    ['¿Qué es la forma SSA y por qué simplifica las optimizaciones?', 'Cada variable se asigna una vez, con funciones φ en las uniones; cada uso apunta a una única definición, lo que facilita propagar constantes y eliminar código muerto.'],
    ['Explica la asignación de registros por coloreo de grafos.', 'Las variables son nodos, hay una arista entre las que están vivas a la vez y cada color es un registro; si no alcanzan los colores, algunas variables se derraman a memoria.'],
    ['¿Qué hacen el enlazador y el cargador?', 'El enlazador une archivos objeto, resuelve referencias y ajusta direcciones; el cargador pone el ejecutable en memoria y salta a su punto de entrada.']
  ],
  cites: ['Cytron, R. et al. (1991). Efficiently Computing Static Single Assignment Form and the Control Dependence Graph. *ACM TOPLAS*, 13(4).', 'Lattner, C. y Adve, V. (2004). LLVM: A Compilation Framework for Lifelong Program Analysis & Transformation. *CGO 2004*.', 'Chaitin, G. (1982). Register Allocation & Spilling via Graph Coloring. *SIGPLAN Symposium on Compiler Construction*.', 'Poletto, M. y Sarkar, V. (1999). Linear Scan Register Allocation. *ACM TOPLAS*, 21(5).', 'Cooper, K. y Torczon, L. (2022). *Engineering a Compiler* (3.ª ed.). Morgan Kaufmann.', 'Haas, A. et al. (2017). Bringing the Web up to Speed with WebAssembly. *PLDI 2017*.', 'Ierusalimschy, R., de Figueiredo, L. H. y Celes, W. (2005). The Implementation of Lua 5.0. *Journal of Universal Computer Science*, 11(7).'],
  project: { t: 'Compilador a una máquina de pila',
    goal: 'Compilar un lenguaje pequeño a bytecode y ejecutarlo en una máquina virtual propia.',
    steps: ['Define un bytecode para una máquina de pila con aritmética, comparaciones, variables y saltos condicionales.', 'Escribe el generador que recorre el AST en postorden y emite el bytecode, incluidos los saltos de un «si».', 'Implementa la máquina virtual que ejecuta el bytecode con un bucle de despacho.', 'Traduce el mismo AST a código de tres direcciones, divídelo en bloques básicos y dibuja su grafo de flujo.', 'Compara la velocidad del intérprete de árbol con la de la máquina virtual.'],
    deliver: 'El compilador, la máquina virtual, los grafos de flujo y las mediciones.' },
  hito: ['Compila las reglas de tarifas de PatioApp a bytecode de una máquina de pila y guárdalo junto a cada regla.', 'Mide en PatioApp el tiempo de evaluar las reglas de 100 000 estadías con el intérprete de árbol y con la máquina de pila, y documenta la diferencia.']
});

S('lc', 'lc.opt', { title: 'Optimización y compilación justo a tiempo',
  ask: '¿Qué concepto de optimización de código se aplica?',
  lesson: `
> **La idea en simple.** Si una receta dice "pon 2 tazas más 1 taza de harina", un buen cocinero pone 3 tazas de una vez. Si dice "bate los huevos" en un paso que nunca se usa, lo salta. Un compilador optimizador hace esas mejoras con tu código, miles de veces, sin cambiar el resultado. Y los compiladores justo a tiempo van más allá: observan cómo se usa el programa mientras corre y lo recompilan a la medida.

## La regla de oro
Una optimización debe **preservar el comportamiento observable** del programa: mismos resultados, mismos efectos, en el mismo orden visible. "Optimizar" no quiere decir alcanzar el óptimo (es indecidible en general), sino **mejorar**: menos instrucciones, menos accesos a memoria, mejor uso de la caché y de los registros. Frances Allen, de IBM, fue pionera del campo; con John Cocke publicó en 1971 *A Catalogue of Optimizing Transformations* y en 2006 se convirtió en la primera mujer en recibir el Premio Turing.

## Alcance de las optimizaciones
- **Locales:** dentro de un bloque básico.
- **Globales:** en toda una función, sobre el grafo de flujo de control.
- **Interprocedurales:** entre funciones, como la expansión en línea o el análisis de todo el programa en el momento del enlace (LTO).

## El catálogo clásico
| Optimización | Antes | Después |
| Plegado de constantes | x = 2 * 3 + 1 | x = 7 |
| Propagación de constantes | n = 10; y = n * 2 | y = 20 |
| Propagación de copias | b = a; c = b + 1 | c = a + 1 |
| Subexpresión común | x = a * b + 1; y = a * b - 2 | t = a * b; x = t + 1; y = t - 2 |
| Eliminación de código muerto | t = x * 9 (t nunca se usa) | se borra |
| Reducción de fuerza | i * 8 | i << 3 |
| Movimiento de código invariante | dentro del bucle: z = base * 2 | se calcula una vez antes del bucle |
| Expansión en línea | llamar a una función corta | se copia su cuerpo en el lugar de la llamada |
Las optimizaciones se **habilitan unas a otras**: la expansión en línea expone constantes, la propagación las lleva a sus usos, el plegado las calcula y la eliminación de código muerto borra lo que quedó sin usar. Por eso los compiladores aplican una secuencia de pasadas, varias veces.
~~~js
// Plegado de constantes y simplificaciones algebraicas sobre un AST
function plegar(e) {
  if (typeof e !== 'object') return e;
  const a = plegar(e.a), b = plegar(e.b);
  if (typeof a === 'number' && typeof b === 'number') return e.op === '+' ? a + b : e.op === '-' ? a - b : a * b;
  if (e.op === '*' && (a === 1 || b === 1)) return a === 1 ? b : a;
  if ((e.op === '+' && (a === 0 || b === 0))) return a === 0 ? b : a;
  return { op: e.op, a, b };
}
const regla = { op: '+', a: { op: '*', a: 'base', b: { op: '-', a: 3, b: 2 } }, b: { op: '*', a: 4, b: 0 } };
console.log(JSON.stringify(plegar(regla)));   // base * (3 − 2) + 4 * 0  →  "base"
~~~

## Análisis de flujo de datos
Para optimizar globalmente, el compilador necesita saber hechos sobre el programa en cada punto: ¿qué constantes valen?, ¿qué variables se usarán después? Gary Kildall formalizó en 1973 el **análisis de flujo de datos** como un sistema de ecuaciones sobre el grafo de flujo que se resuelve **iterando hasta un punto fijo**, en un marco algebraico de retículos. Ejemplos:
- **Variables vivas** (análisis hacia atrás): una variable está viva en un punto si su valor puede usarse más adelante. Una asignación a una variable muerta es código muerto, y las variables vivas definen el grafo de interferencia de la asignación de registros.
- **Definiciones que alcanzan** (hacia adelante): qué asignaciones pueden haber producido el valor de una variable en cada punto; base de la propagación de constantes.
- **Expresiones disponibles** (hacia adelante): qué expresiones ya calculadas siguen valiendo; base de la eliminación de subexpresiones comunes.
En forma SSA muchos de estos análisis se vuelven casi triviales, porque cada uso tiene una sola definición.

## Bucles: donde vive el tiempo
La mayor parte del tiempo de ejecución se pasa en los bucles, así que los compiladores les dedican transformaciones especiales: sacar el código invariante, **desenrollar** (repetir el cuerpo varias veces para reducir saltos y comparaciones), **vectorizar** (usar instrucciones SIMD que operan sobre varios datos a la vez) e **intercambiar** bucles anidados para recorrer la memoria en orden y aprovechar la caché.

## Cuidado con el comportamiento indefinido
En C y C++, ciertas operaciones (desbordar un entero con signo, desreferenciar un puntero nulo, leer fuera de un arreglo) tienen **comportamiento indefinido**: la norma no dice qué pasa. Los compiladores suponen que nunca ocurren y optimizan con esa suposición, a veces eliminando comprobaciones que el programador creía importantes. Xi Wang y sus coautores estudiaron en 2013 cómo esto había introducido errores y vulnerabilidades en sistemas reales, como el núcleo de Linux. La lección: un programa "que funcionaba" sin optimizaciones puede fallar con ellas si dependía de un comportamiento indefinido.

## Compiladores justo a tiempo
Un **compilador JIT** compila durante la ejecución y puede usar información que un compilador anticipado no tiene: qué funciones se ejecutan más, qué tipos llegan realmente a cada operación.
- **Cachés en línea:** Peter Deutsch y Allan Schiffman (1984, Smalltalk) guardaron en cada punto de llamada el método encontrado la última vez; Urs Hölzle, Craig Chambers y David Ungar las extendieron en 1991 a **cachés polimórficas** en el lenguaje Self.
- **Especialización y desoptimización:** el JIT compila una versión rápida suponiendo, por ejemplo, que una variable siempre es un entero; si alguna vez llega otra cosa, **desoptimiza**: vuelve al código genérico y descarta la versión especializada.
- **Compilación por niveles:** se empieza interpretando y se sube de nivel a medida que el código se "calienta". V8 tiene un intérprete (Ignition) y varios compiladores cada vez más optimizadores; HotSpot de Java, desarrollado a partir de las ideas de Self, usa los compiladores C1 y C2.
- **JIT de trazas:** en lugar de funciones, se compilan los caminos más frecuentes a través de los bucles (TraceMonkey en Firefox, PyPy en Python).

## ¿Cuánto ayudan los compiladores?
Todd Proebsting formuló en 1998, medio en broma, la **ley de Proebsting**: los avances en optimización de compiladores duplican el rendimiento cada 18 años, frente a los 18 meses del hardware de entonces. La lección no es que optimizar no sirva (la diferencia entre compilar C sin optimizar y con optimización alta suele ser de varias veces), sino que **los algoritmos y las estructuras de datos** que eliges importan más que lo que el compilador pueda hacer por ti.

## Compiladores correctos
Un compilador con errores produce programas con errores aunque el código fuente sea correcto. Xuejun Yang y sus coautores generaron con **Csmith** (2011) programas aleatorios en C y encontraron más de 325 errores desconocidos en GCC y LLVM. En respuesta, Xavier Leroy construyó **CompCert**, un compilador de C cuya corrección está **demostrada formalmente** con el asistente Coq: el código generado se comporta como especifica el programa fuente. Se usa en la industria aeronáutica.

## Ejemplo resuelto: optimizar el compilador de tarifas
Una regla generada por la interfaz de PatioApp es «tarifa = base * (1 + 0) + extra * 0 + recargo * horas * 1». Pasadas aplicadas sobre el AST:
1. **Plegado:** «1 + 0» → 1.
2. **Simplificación algebraica:** «base * 1» → base; «extra * 0» → 0 (seguro porque las expresiones del lenguaje no tienen efectos secundarios); «… * 1» → se elimina.
3. **Plegado otra vez:** «base + 0» → base.
Resultado: «tarifa = base + recargo * horas», 6 instrucciones de pila en lugar de 15. Como cada regla se compila una vez y se ejecuta para miles de estadías, la optimización se paga sola. Se agregó una prueba que, para cada regla de ejemplo, evalúa la versión optimizada y la original con mil entornos aleatorios y exige el mismo resultado: la regla de oro convertida en prueba automática.`,
  links: [['lc.ir', 'las optimizaciones trabajan sobre el código intermedio y el grafo de flujo'], ['arq.pipe', 'la planificación y la vectorización aprovechan la segmentación y las instrucciones SIMD'], ['for.verif', 'CompCert es un compilador verificado formalmente']],
  read: 'Aho, Lam, Sethi y Ullman, capítulo 9; Cooper y Torczon, *Engineering a Compiler*, capítulos 8 a 10; Kildall (1973); Hölzle, Chambers y Ungar (1991); Leroy (2009).',
  terms: [
    ['Plegado de constantes', 'cálculo en tiempo de compilación de las expresiones cuyos operandos son constantes', ['2 * 3 + 1 se reemplaza por 7.', 'Se combina con la propagación de constantes.', 'Es la optimización más simple.']],
    ['Eliminación de código muerto', 'borrado de instrucciones cuyo resultado nunca se usa', ['Una asignación a una variable que nadie lee.', 'Requiere saber qué variables están vivas.', 'Debe respetar los efectos secundarios.']],
    ['Subexpresión común', 'expresión que se calcula varias veces con los mismos valores y puede calcularse una sola vez', ['a * b en dos líneas seguidas.', 'Se guarda en un temporal.', 'Se detecta con expresiones disponibles.']],
    ['Movimiento de código invariante', 'traslado fuera del bucle de los cálculos que no cambian entre iteraciones', ['base * 2 se calcula antes del bucle.', 'Reduce el trabajo en cada vuelta.', 'Exige que el cálculo no tenga efectos.']],
    ['Análisis de flujo de datos', 'cálculo de hechos sobre el programa en cada punto del grafo de flujo iterando hasta un punto fijo', ['Variables vivas, hacia atrás.', 'Definiciones que alcanzan, hacia adelante.', 'Kildall lo formalizó en 1973.']],
    ['Comportamiento indefinido', 'operación cuyo efecto no define la norma del lenguaje y que el compilador puede suponer que nunca ocurre', ['El desbordamiento de enteros con signo en C.', 'Puede hacer desaparecer comprobaciones.', 'Wang y otros lo estudiaron en 2013.']],
    ['Desoptimización', 'regreso de un JIT al código genérico cuando falla una suposición con la que especializó el código', ['Llega un texto donde siempre llegaba un entero.', 'Permite especializar con seguridad.', 'Hölzle la desarrolló en Self.']],
    ['Caché en línea', 'memoria en cada punto de llamada del método encontrado la última vez, para evitar buscarlo de nuevo', ['Deutsch y Schiffman la usaron en Smalltalk.', 'V8 la usa para acceder a propiedades.', 'Puede ser polimórfica.']]
  ],
  q: [
    ['¿Qué optimización convierte «x = 4 * 5 - 2» en «x = 18»?', 'Plegado de constantes', ['Eliminación de código muerto', 'Reducción de fuerza', 'Expansión en línea'], 'Se calcula al compilar.', 1],
    ['¿Qué optimización reemplaza «i * 8» por «i << 3»?', 'Reducción de fuerza', ['Plegado de constantes', 'Propagación de copias', 'Desenrollado'], 'Usa una operación más barata.', 2],
    ['¿Qué análisis se necesita para saber si una asignación es código muerto?', 'Variables vivas', ['Definiciones que alcanzan', 'Expresiones disponibles', 'Análisis léxico'], 'Si la variable no se usará después, la asignación sobra.', 3],
    ['¿Por qué la expansión en línea es tan valiosa?', 'Porque expone oportunidades para otras optimizaciones, como propagar constantes', ['Porque siempre reduce el tamaño del código', 'Porque elimina los bucles', 'Porque evita el análisis semántico'], 'Las optimizaciones se habilitan entre sí.', 3],
    ['¿Qué hace un JIT cuando falla una suposición con la que especializó el código?', 'Desoptimiza y vuelve al código genérico', ['Detiene el programa', 'Ignora el error', 'Recompila todo el programa desde cero siempre'], 'Permite especializar con seguridad.', 3],
    ['¿Qué dice la ley de Proebsting?', 'Que los avances en optimización de compiladores duplican el rendimiento cada 18 años', ['Que los compiladores duplican el rendimiento cada 18 meses', 'Que optimizar nunca sirve', 'Que los JIT son siempre más rápidos'], 'Los algoritmos importan más.', 3],
    ['¿Qué es CompCert?', 'Un compilador de C con su corrección demostrada formalmente', ['Un generador de programas aleatorios', 'Un recolector de basura', 'Un JIT de Java'], 'Xavier Leroy, con Coq.', 3],
    { tf: 'Un compilador puede eliminar una comprobación de desbordamiento de enteros con signo en C porque supone que el comportamiento indefinido nunca ocurre.', v: true, e: 'Por eso depender de comportamiento indefinido es peligroso.', l: 4 },
    { tf: 'Optimizar significa encontrar siempre el programa más rápido posible.', v: false, e: 'Significa mejorar preservando el comportamiento; el óptimo es indecidible en general.', l: 2 },
    { c: 'Escribe «plegar(e)»: e es un número, un nombre (texto) o {op, a, b} con op "+", "-" o "*"; pliega operaciones entre números y simplifica x*1, 1*x, x+0 y 0+x. Devuelve número, texto u objeto {op, a, b}.', f: 'plegar', p: ['e'], t: [[[{ op: '+', a: 2, b: 3 }], 5], [[{ op: '*', a: 'x', b: { op: '-', a: 3, b: 2 } }], 'x'], [[{ op: '+', a: 'y', b: { op: '*', a: 2, b: 'z' } }], { op: '+', a: 'y', b: { op: '*', a: 2, b: 'z' } }], [[{ op: '+', a: { op: '*', a: 'base', b: { op: '-', a: 3, b: 2 } }, b: { op: '*', a: 4, b: 0 } }], 'base'], [['k'], 'k']], sol: '  if (typeof e !== "object") return e;\n  const a = plegar(e.a), b = plegar(e.b);\n  if (typeof a === "number" && typeof b === "number") return e.op === "+" ? a + b : e.op === "-" ? a - b : a * b;\n  if (e.op === "*" && (a === 1 || b === 1)) return a === 1 ? b : a;\n  if (e.op === "+" && (a === 0 || b === 0)) return a === 0 ? b : a;\n  return { op: e.op, a, b };', h: 'Pliega primero los hijos de forma recursiva y luego mira si el nodo se puede simplificar.', l: 4 },
    { c: 'Escribe «instruccionesVivas(instrs, vivasAlFinal)»: instrs es una lista de [destino, [usos]]; recorriendo hacia atrás, una instrucción se conserva si su destino está vivo, y entonces sus usos pasan a estar vivos y su destino deja de estarlo. Devuelve los índices conservados en orden.', f: 'instruccionesVivas', p: ['instrs', 'vivasAlFinal'], t: [[[[['a', ['x']], ['b', ['a']], ['c', ['x']]], ['b']], [0, 1]], [[[['t', ['x']], ['t', ['y']]], ['t']], [1]], [[[['a', []], ['b', ['a']]], []], []], [[[['a', ['x']], ['b', ['a']], ['c', ['b', 'a']]], ['c']], [0, 1, 2]]], sol: '  const vivas = new Set(vivasAlFinal), r = [];\n  for (let i = instrs.length - 1; i >= 0; i--) {\n    const [d, usos] = instrs[i];\n    if (vivas.has(d)) { r.push(i); vivas.delete(d); usos.forEach(u => vivas.add(u)); }\n  }\n  return r.reverse();', l: 4 }
  ],
  gen: function (g) {
    var op = [['x = 3 * 4 + 1 → x = 13', 'Plegado de constantes'], ['n = 5; y = n + 2 → y = 7', 'Propagación de constantes'], ['b = a; c = b * 2 → c = a * 2', 'Propagación de copias'], ['t = x * 9 sin usarse nunca → se borra', 'Eliminación de código muerto'], ['i * 4 → i << 2', 'Reducción de fuerza'], ['z = base * 2 dentro del bucle → antes del bucle', 'Movimiento de código invariante'], ['x = a * b + 1; y = a * b → t = a * b', 'Subexpresión común'], ['llamar a doble(x) → x * 2 en el lugar de la llamada', 'Expansión en línea']];
    var os = op.map(function (o) { return o[1]; });
    op.forEach(function (o) { g.mcq(2, '¿Qué optimización se aplicó? ' + o[0], o[1], g.R.sample(os.filter(function (x) { return x !== o[1]; }), 3), 'Catálogo clásico de Allen y Cocke.'); });
    var pl = [['2 * 3 + 4', 10], ['(10 - 4) * 2', 12], ['1 + 2 + 3 + 4', 10], ['7 * (2 - 2)', 0], ['5 * 1 + 0', 5]];
    pl.forEach(function (p) { g.input(1, '¿A qué valor pliega el compilador la expresión constante ' + p[0] + '?', p[1], 'Se calcula al compilar.'); });
    var an = [['Saber si una variable se usará más adelante', 'Variables vivas'], ['Saber qué asignaciones pueden haber producido un valor', 'Definiciones que alcanzan'], ['Saber qué expresiones ya calculadas siguen valiendo', 'Expresiones disponibles']];
    an.forEach(function (a) { g.mcq(3, '¿Qué análisis de flujo de datos responde esto? ' + a[0], a[1], ['Variables vivas', 'Definiciones que alcanzan', 'Expresiones disponibles', 'Análisis léxico'].filter(function (x) { return x !== a[1]; }), 'Análisis clásicos de Kildall.'); });
  },
  checks: [
    ['¿Cuál es la regla de oro de toda optimización?', 'Preservar el comportamiento observable del programa: mismos resultados y efectos visibles.'],
    ['Da un ejemplo de cómo unas optimizaciones habilitan a otras.', 'La expansión en línea expone una constante, la propagación la lleva a sus usos, el plegado la calcula y la eliminación de código muerto borra lo que quedó sin usar.'],
    ['¿Qué calcula el análisis de variables vivas y para qué sirve?', 'Qué variables pueden usarse después de cada punto; sirve para eliminar código muerto y para construir el grafo de interferencia de la asignación de registros.'],
    ['¿Qué información aprovecha un JIT que no tiene un compilador anticipado?', 'Qué código se ejecuta más y qué tipos llegan realmente a cada operación, lo que permite especializar y desoptimizar si cambia.'],
    ['¿Por qué depender de comportamiento indefinido en C es peligroso?', 'Porque el compilador supone que no ocurre y puede eliminar comprobaciones o reordenar código, haciendo fallar con optimizaciones un programa que parecía funcionar.']
  ],
  cites: ['Allen, F. y Cocke, J. (1971). A Catalogue of Optimizing Transformations. En *Design and Optimization of Compilers*. Prentice Hall.', 'Kildall, G. (1973). A Unified Approach to Global Program Optimization. *POPL 1973*.', 'Hölzle, U., Chambers, C. y Ungar, D. (1991). Optimizing Dynamically-Typed Object-Oriented Languages with Polymorphic Inline Caches. *ECOOP 1991*.', 'Wang, X. et al. (2013). Towards Optimization-Safe Systems: Analyzing the Impact of Undefined Behavior. *SOSP 2013*.', 'Yang, X., Chen, Y., Eide, E. y Regehr, J. (2011). Finding and Understanding Bugs in C Compilers. *PLDI 2011*.', 'Leroy, X. (2009). Formal Verification of a Realistic Compiler. *Communications of the ACM*, 52(7).'],
  project: { t: 'Optimizador para tu compilador',
    goal: 'Agregar pasadas de optimización verificables a un compilador pequeño.',
    steps: ['Implementa plegado de constantes y simplificaciones algebraicas sobre el AST.', 'Implementa sobre el código de tres direcciones el análisis de variables vivas y la eliminación de código muerto.', 'Implementa la eliminación de subexpresiones comunes dentro de un bloque básico.', 'Escribe una prueba diferencial que compare, con miles de entradas aleatorias, el resultado del programa original y del optimizado.', 'Mide la reducción de instrucciones y de tiempo en programas de ejemplo.'],
    deliver: 'El optimizador, la prueba diferencial y las mediciones.' },
  hito: ['Agrega al compilador de tarifas de PatioApp plegado de constantes y simplificaciones algebraicas, y mide la reducción de instrucciones en las reglas reales.', 'Escribe en PatioApp una prueba diferencial que verifique, con mil entornos aleatorios por regla, que la versión optimizada da el mismo resultado que la original.']
});
})();
