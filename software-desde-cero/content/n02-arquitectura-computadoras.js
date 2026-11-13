(function () {
var M = SDC.M, S = SDC.S;
M('arq', { title: 'Arquitectura de computadoras a fondo',
  desc: 'Cómo ejecuta realmente la máquina tu código: instrucciones, pipeline, cachés y almacenamiento. Es lo que separa a quien escribe código que funciona de quien escribe código que además es rápido y confiable.',
  thread: 'PatioApp se mide contra el hardware: cuánto cuesta un salto mal predicho, por qué un arreglo por columnas es más rápido que uno de objetos y cómo respaldar los datos para que sobrevivan a un disco que falla.',
  books: '*Computer Organization and Design: RISC-V Edition* (Patterson y Hennessy), *Computer Architecture: A Quantitative Approach* (Hennessy y Patterson), *Computer Systems: A Programmer\'s Perspective* (Bryant y O\'Hallaron), *Digital Design and Computer Architecture* (Harris y Harris).',
  uni: 'MIT 6.1910 (antes 6.004) *Computation Structures* y 6.5900 (antes 6.823) *Computer System Architecture*; CMU 15-213 *Introduction to Computer Systems* y 18-447 *Introduction to Computer Architecture*; Berkeley CS61C y CS152; Stanford CS107 *Computer Organization and Systems*. En Perú: Arquitectura y Organización de Computadoras (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp consciente del hardware',
    goal: 'Medir y explicar el rendimiento de PatioApp con lo que sabes del procesador, la memoria y el almacenamiento.',
    steps: ['Escribe un programa pequeño en ensamblador RISC-V (en un simulador como RARS o Venus) que calcule el cobro de una lista de unidades.', 'Mide el efecto de la predicción de saltos filtrando datos ordenados y desordenados.', 'Compara un arreglo de objetos con columnas en arreglos tipados para un millón de unidades y explica la diferencia con la caché.', 'Mide escrituras secuenciales contra aleatorias y con y sin fsync en tu disco.', 'Diseña la política de almacenamiento y respaldo (RAID o equivalente en la nube, regla 3-2-1) con su justificación.'],
    deliver: 'El programa en ensamblador, los benchmarks con gráficos y el documento de almacenamiento y respaldo.' } });

S('arq', 'arq.isa', { title: 'Conjunto de instrucciones y ensamblador',
  ask: '¿Qué concepto de arquitectura se describe?',
  lesson: `
> **La idea en simple.** El conjunto de instrucciones es el idioma que entiende el procesador: un vocabulario muy pequeño ("suma estos dos registros", "carga esta palabra de memoria", "salta si son iguales"). Todo lo que escribes en JavaScript termina traducido a ese idioma.

## El contrato entre hardware y software
La **arquitectura del conjunto de instrucciones** (ISA) define qué instrucciones existen, cuántos registros hay, cómo se direcciona la memoria y cómo se representan los datos. Es un contrato: el mismo programa compilado para x86-64 funciona en cualquier procesador Intel o AMD de las últimas décadas, aunque su diseño interno (la **microarquitectura**) sea completamente distinto. Patterson y Hennessy, en *Computer Organization and Design*, insisten en esta separación: la ISA es la abstracción más importante entre el software y el hardware.

## RISC contra CISC: una historia que ganaron los dos
En los años 70 las ISA crecían con instrucciones cada vez más complejas (**CISC**), pensando en facilitar el trabajo de los programadores en ensamblador. John Cocke, en IBM, observó con el proyecto 801 (1975 a 1980) que los compiladores casi nunca usaban esas instrucciones complejas y propuso lo contrario: pocas instrucciones simples, de tamaño fijo, que se ejecuten en un ciclo. Recibió el Premio Turing en 1987. Al mismo tiempo, David Patterson en Berkeley (proyecto RISC, 1980) y John Hennessy en Stanford (MIPS, 1981) mostraron que los procesadores **RISC** eran más rápidos con menos transistores. Ambos recibieron el Premio Turing en 2017.
| Familia | Tipo | Dónde está |
| x86-64 | CISC (por dentro traduce a microoperaciones tipo RISC) | PC y servidores |
| ARM | RISC | casi todos los celulares, Apple M, muchos servidores |
| RISC-V | RISC abierto y libre (Berkeley, 2010) | microcontroladores, investigación, chips nuevos |
Hoy la distinción es menos tajante: los x86 modernos convierten sus instrucciones complejas en microoperaciones simples, y el debate se trasladó a la eficiencia energética y al costo de licencias.

## RISC-V en lo esencial
RISC-V tiene 32 registros enteros (x0 a x31; x0 siempre vale cero) con nombres según su uso: «a0» a «a7» para argumentos y resultados, «t0» a «t6» temporales, «s0» a «s11» que se conservan entre llamadas, «sp» el puntero de pila y «ra» la dirección de retorno.
~~~txt
# suma = 1 + 2 + … + n   (n llega en a0, el resultado sale en a0)
suma:   addi t0, zero, 0      # t0 = acumulador
        addi t1, zero, 1      # t1 = i
bucle:  blt  a0, t1, fin      # si n < i, terminar
        add  t0, t0, t1       # acumulador += i
        addi t1, t1, 1        # i++
        j    bucle
fin:    mv   a0, t0           # resultado en a0
        ret                   # volver a la dirección guardada en ra
~~~
Tres tipos de instrucciones cubren casi todo: **aritméticas** entre registros («add», «sub», «and», «or», «sll»), **de memoria** que mueven datos entre registros y RAM («lw» carga una palabra, «sw» la guarda) y **de control** que cambian el contador de programa («beq», «bne», «blt», «jal»). Como RISC-V es una arquitectura de **carga y almacenamiento**, las operaciones aritméticas solo trabajan con registros: para sumar dos valores de memoria hay que cargarlos primero.

## Modos de direccionamiento
La forma de indicar dónde está un operando:
- **Inmediato:** el valor viene en la instrucción («addi t0, t0, 5»).
- **Registro:** el valor está en un registro.
- **Base más desplazamiento:** dirección = registro + constante («lw t0, 8(sp)» lee la palabra que está 8 bytes después del tope de la pila). Así se accede a variables locales y a campos de una estructura.
- **Relativo al PC:** los saltos indican cuántas instrucciones avanzar o retroceder.

## Qué pasa cuando llamas a una función
La **convención de llamada** es un acuerdo para que funciones compiladas por separado colaboren: los argumentos van en a0 a a7, el resultado vuelve en a0, la dirección de retorno queda en ra, y quien llama sabe qué registros puede perder. Si una función necesita más espacio, reserva un **marco** en la pila restando a sp y lo devuelve al terminar. Es la misma pila de llamadas que viste en programación, ahora con nombre y apellido.

## Del código fuente al ensamblador
El sitio *Compiler Explorer*, creado por Matt Godbolt, muestra en vivo el ensamblador que genera un compilador para cualquier función. Es la mejor forma de ver lo que hacen las optimizaciones: un bucle que suma una constante puede desaparecer por completo, reemplazado por una fórmula. Bryant y O'Hallaron dedican el capítulo 3 de *Computer Systems: A Programmer's Perspective* a leer el ensamblador de x86-64 que produce un compilador de C, precisamente porque entenderlo ayuda a escribir código más rápido y a detectar vulnerabilidades como los desbordamientos de búfer.

~~~js
// Un mini simulador: el estado de la máquina son registros y un contador de programa
const prog = [['addi', 'a0', 'zero', 0], ['addi', 't1', 'zero', 1], ['addi', 't2', 'zero', 6],
              ['add', 'a0', 'a0', 't1'], ['addi', 't1', 't1', 1], ['blt', 't1', 't2', 3]];
const r = { zero: 0 }; let pc = 0, ciclos = 0;
while (pc < prog.length) {
  const [op, d, a, b] = prog[pc]; ciclos++;
  if (op === 'addi') r[d] = (r[a] || 0) + b;
  if (op === 'add') r[d] = (r[a] || 0) + (r[b] || 0);
  if (op === 'blt' && (r[d] || 0) < (r[a] || 0)) { pc = b; continue; }
  pc++;
}
console.log('a0 =', r.a0, '· instrucciones ejecutadas:', ciclos);
~~~`,
  links: [['m1.cpu', 'el ciclo buscar-decodificar-ejecutar ejecuta estas instrucciones'], ['m8.comp', 'el compilador traduce tu código a esta ISA'], ['m3.func', 'la pila de llamadas se implementa con sp, ra y marcos']],
  read: 'Patterson y Hennessy, *Computer Organization and Design: RISC-V Edition*, capítulo 2; Bryant y O\'Hallaron, capítulo 3.',
  terms: [
    ['Conjunto de instrucciones (ISA)', 'contrato que define las instrucciones, registros y modos de acceso a memoria que ofrece un procesador', ['Un programa compilado para x86-64 corre en procesadores Intel y AMD de distintas generaciones.', 'Apple pasó sus computadoras de x86 a ARM y tuvo que traducir los programas.', 'RISC-V lo publica de forma abierta para que cualquiera lo implemente.']],
    ['Registro', 'pequeña celda de memoria dentro del procesador, la más rápida de toda la jerarquía', ['RISC-V tiene 32 enteros y uno siempre vale cero.', 'El compilador intenta mantener aquí las variables de un bucle.', 'Los argumentos de una función viajan en a0 a a7.']],
    ['RISC', 'estilo de diseño con pocas instrucciones simples y de tamaño fijo, pensadas para ejecutarse rápido', ['Los procesadores de casi todos los celulares siguen este estilo.', 'Patterson y Hennessy recibieron el Premio Turing por impulsarlo.', 'Solo las instrucciones de carga y almacenamiento tocan la memoria.']],
    ['CISC', 'estilo de diseño con muchas instrucciones, algunas complejas y de tamaño variable', ['x86 tiene instrucciones que copian bloques enteros de memoria.', 'Los procesadores modernos de este tipo las traducen por dentro a microoperaciones simples.', 'Nació cuando se programaba mucho en ensamblador a mano.']],
    ['Ensamblador', 'representación legible de las instrucciones de máquina, con una línea por instrucción', ['Lees «add t0, t0, t1» en lugar de una secuencia de bits.', 'Compiler Explorer muestra el de tu función en C.', 'Se usa para escribir el arranque de un sistema operativo.']],
    ['Modo de direccionamiento', 'forma en que una instrucción indica dónde está su operando', ['«lw t0, 8(sp)» usa base más desplazamiento.', '«addi t0, t0, 5» lleva el valor dentro de la instrucción.', 'Un salto indica cuántas instrucciones avanzar desde el PC.']],
    ['Convención de llamada', 'acuerdo sobre cómo se pasan argumentos, se devuelven resultados y qué registros conserva cada función', ['Una biblioteca compilada por otra persona funciona con tu código.', 'El resultado vuelve en a0 y la dirección de retorno queda en ra.', 'Quien llama sabe qué registros puede perder.']],
    ['Contador de programa', 'registro que guarda la dirección de la próxima instrucción a ejecutar', ['Un salto simplemente cambia su valor.', 'Al llamar a una función se guarda su valor anterior en ra.', 'Avanza 4 bytes después de cada instrucción de RISC-V.']]
  ],
  q: [
    ['¿Por qué en RISC-V el registro x0 siempre vale cero?', 'Porque simplifica muchas operaciones: copiar, negar o comparar con cero sin instrucciones extra', ['Porque es un error de diseño', 'Porque guarda el contador de programa', 'Porque se usa para la pila'], 'Por ejemplo, «add t0, t1, zero» copia t1 en t0.', 3],
    ['En una arquitectura de carga y almacenamiento, ¿cómo se suman dos valores que están en memoria?', 'Se cargan en registros, se suman y se guarda el resultado', ['Con una sola instrucción que suma en memoria', 'No se puede', 'Con un salto'], 'Solo lw y sw acceden a la memoria.', 2],
    ['¿Qué observó John Cocke con el proyecto IBM 801?', 'Que los compiladores casi no usaban las instrucciones complejas', ['Que hacían falta más instrucciones', 'Que la memoria era más rápida que la CPU', 'Que los programas debían escribirse en ensamblador'], 'De ahí nació la idea RISC.', 3],
    ['«lw t0, 12(sp)» lee la palabra ubicada en:', 'La dirección sp + 12', ['La dirección 12', 'El registro 12', 'La instrucción 12'], 'Es direccionamiento por base más desplazamiento.', 3],
    { tf: 'La ISA y la microarquitectura son lo mismo.', v: false, e: 'La ISA es el contrato; la microarquitectura es la implementación interna, que puede cambiar sin romper los programas.', l: 2 },
    { tf: 'En RISC-V, el resultado de una función se devuelve normalmente en el registro a0.', v: true, e: 'Es parte de la convención de llamada.', l: 2 },
    { o: 'Ordena lo que ocurre al llamar a una función con la convención de llamada.', s: ['Quien llama coloca los argumentos en a0 a a7', 'La instrucción jal guarda la dirección de retorno en ra y salta', 'La función reserva su marco restando a sp', 'La función deja el resultado en a0 y libera su marco', 'ret salta a la dirección guardada en ra'], e: 'Es el mismo protocolo que sigue cualquier compilador.', l: 3 },
    { c: 'Escribe «simular(prog)» para un mini RISC-V con instrucciones [op, destino, a, b]: «addi» (a + constante b), «add», «sub» (entre registros) y «blt» (si reg destino < reg a, salta al índice b). El registro «zero» siempre vale 0 y los no usados valen 0. Devuelve el valor final de «a0».', f: 'simular', p: ['prog'], t: [[[[['addi', 'a0', 'zero', 5], ['addi', 't0', 'zero', 3], ['add', 'a0', 'a0', 't0']]], 8], [[[['addi', 'a0', 'zero', 0], ['addi', 't0', 'zero', 1], ['addi', 't1', 'zero', 5], ['add', 'a0', 'a0', 't0'], ['addi', 't0', 't0', 1], ['blt', 't0', 't1', 3]]], 10], [[[['addi', 't0', 'zero', 7], ['sub', 'a0', 'zero', 't0']]], -7]], sol: '  const r = {}; const v = x => x === "zero" ? 0 : (r[x] || 0);\n  let pc = 0, pasos = 0;\n  while (pc < prog.length && pasos++ < 100000) {\n    const [op, d, a, b] = prog[pc];\n    if (op === "blt") { if (v(d) < v(a)) { pc = b; continue; } }\n    else if (op === "addi") r[d] = v(a) + b;\n    else if (op === "add") r[d] = v(a) + v(b);\n    else if (op === "sub") r[d] = v(a) - v(b);\n    if (d !== "zero") r.zero = 0;\n    pc++;\n  }\n  return v("a0");', h: 'Guarda los registros en un objeto y lleva un índice pc; en blt cambia pc en lugar de avanzar.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 20), b = R.int(1, 20), c = R.int(1, 9), code = 'addi t0, zero, ' + a + '\naddi t1, zero, ' + b + '\nadd  t2, t0, t1\naddi a0, t2, -' + c; g.input(2, '¿Cuánto vale a0 al terminar?', a + b - c, 't2 = ' + a + ' + ' + b + ' = ' + (a + b) + '; a0 = ' + (a + b) + ' − ' + c + '.', code); });
    g.times(6, function (R) { var n = R.int(3, 9), code = 'addi a0, zero, 0\naddi t0, zero, 0\naddi t1, zero, ' + n + '\nbucle: addi a0, a0, 2\n       addi t0, t0, 1\n       blt  t0, t1, bucle'; g.input(3, '¿Cuánto vale a0 al terminar?', 2 * n, 'El bucle se ejecuta ' + n + ' veces sumando 2.', code); });
    g.times(6, function (R) { var ic = R.int(1, 9), cpi = R.pick([1, 1.5, 2, 2.5]), ghz = R.pick([1, 2, 2.5, 4]), t = ic * cpi / ghz; g.input(3, 'Un programa ejecuta ' + ic + ' × 10⁹ instrucciones con CPI ' + cpi + ' en un procesador de ' + ghz + ' GHz. ¿Cuántos segundos tarda? Redondea a 2 decimales.', t.toFixed(2), 'Tiempo = instrucciones × CPI / frecuencia = ' + ic + ' × ' + cpi + ' / ' + ghz + ' = ' + t.toFixed(2) + ' s.'); });
    g.times(4, function (R) { var k = R.int(0, 30) * 4, b = R.pick([0, 4, 8, 16]); g.input(3, 'sp vale ' + (1000 + b) + '. ¿Qué dirección lee «lw t0, ' + k + '(sp)»?', 1000 + b + k, 'Base más desplazamiento: ' + (1000 + b) + ' + ' + k + '.'); });
  },
  checks: [
    ['¿Qué ventaja tiene separar la ISA de la microarquitectura?', 'Que los fabricantes pueden mejorar el diseño interno (pipeline, cachés, predicción) sin que los programas existentes dejen de funcionar.'],
    ['¿Por qué RISC-V solo permite acceder a memoria con instrucciones de carga y almacenamiento?', 'Porque mantiene las instrucciones simples y regulares, lo que facilita el pipeline; las operaciones trabajan con registros rápidos y el acceso a memoria queda explícito.'],
    ['¿Para qué sirve la convención de llamada?', 'Para que funciones compiladas por separado (tu código, bibliotecas, el sistema operativo) puedan llamarse entre sí sabiendo dónde van los argumentos, el resultado y qué registros se conservan.'],
    ['¿Qué es un marco de pila en ensamblador?', 'El espacio que una función reserva en la pila (moviendo sp) para guardar variables locales, registros que debe conservar y la dirección de retorno.'],
    ['¿Para qué te sirve leer el ensamblador que genera un compilador?', 'Para entender qué optimizaciones aplica, por qué un código es lento o rápido y para analizar errores de bajo nivel y vulnerabilidades.']
  ],
  cites: ['Patterson, D. y Hennessy, J. (2017). *Computer Organization and Design: RISC-V Edition*. Morgan Kaufmann. Capítulo 2.', 'Bryant, R. y O\'Hallaron, D. (2016). *Computer Systems: A Programmer\'s Perspective* (3.ª ed.). Pearson. Capítulo 3.', 'Patterson, D. y Ditzel, D. (1980). The Case for the Reduced Instruction Set Computer. *ACM SIGARCH Computer Architecture News*, 8(6).', 'Waterman, A. y Asanović, K. (eds.) (2019). *The RISC-V Instruction Set Manual, Volume I: Unprivileged ISA*. RISC-V Foundation.'],
  project: { t: 'Programar en ensamblador RISC-V',
    goal: 'Escribir, ejecutar y depurar programas reales en ensamblador para entender cómo trabaja el procesador.',
    steps: ['Instala un simulador de RISC-V (RARS o el simulador web Venus).', 'Escribe funciones en ensamblador para la suma de una lista, el máximo y el factorial recursivo, respetando la convención de llamada.', 'Ejecuta paso a paso observando registros, pila y memoria.', 'Escribe la misma función en C y compárala con el ensamblador que genera un compilador en Compiler Explorer con -O0 y con -O2.', 'Cuenta las instrucciones ejecutadas y estima el tiempo en un procesador de 1 GHz con CPI 1.'],
    deliver: 'Los programas en ensamblador comentados, capturas de la ejecución paso a paso y la comparación con el compilador.' },
  hito: ['Escribe en C (o tradúcelo desde JavaScript) la función de cobro de PatioApp, compílala en Compiler Explorer y explica en el README las instrucciones principales del ensamblador generado.', 'Compara el ensamblador sin optimizar y con -O2 y anota qué optimizaciones aplicó el compilador.']
});

S('arq', 'arq.pipe', { title: 'Pipeline, paralelismo y rendimiento',
  ask: '¿Qué concepto de rendimiento del procesador se aplica?',
  lesson: `
> **La idea en simple.** Una lavandería con lavadora, secadora y plancha no espera a terminar una carga entera para empezar la siguiente: mientras una se seca, otra se lava. Los procesadores hacen lo mismo con las instrucciones. Se llama segmentación o **pipeline**, y es la razón por la que un procesador moderno termina varias instrucciones por ciclo.

## El pipeline clásico de cinco etapas
Patterson y Hennessy usan en *Computer Organization and Design* el ejemplo de la lavandería y un pipeline de cinco etapas:
| Etapa | Qué hace |
| IF | buscar la instrucción en memoria |
| ID | decodificarla y leer los registros |
| EX | ejecutar la operación en la ALU |
| MEM | acceder a la memoria de datos |
| WB | escribir el resultado en el registro |
Cada instrucción sigue tardando cinco ciclos (**latencia**), pero cuando el pipeline está lleno termina una por ciclo (**rendimiento**). Para n instrucciones en k etapas se necesitan k + n − 1 ciclos en lugar de k·n: con muchas instrucciones, la mejora se acerca a k.

## Los riesgos (hazards)
El pipeline ideal se rompe por tres tipos de riesgos:
- **Estructurales:** dos instrucciones necesitan el mismo recurso a la vez. Se evitan duplicando recursos (por eso hay cachés separadas para instrucciones y datos).
- **De datos:** una instrucción necesita un resultado que la anterior aún no escribió («add t0, t1, t2» seguida de «sub t3, t0, t4»). La solución es el **adelantamiento** (*forwarding*): pasar el resultado directamente de la salida de la ALU a la entrada de la siguiente, sin esperar a que se escriba en el registro. Si el dato viene de una carga de memoria, a veces hay que insertar una **burbuja** (un ciclo de espera).
- **De control:** tras un salto condicional, el procesador no sabe qué instrucción buscar hasta evaluar la condición. Esperar desperdiciaría ciclos; en su lugar se **predice**.

## Predicción de saltos y especulación
Los predictores modernos aciertan más del 95% de las veces aprendiendo patrones de cada salto. Cuando fallan, hay que descartar el trabajo hecho y perder del orden de 15 a 20 ciclos. Esto tiene un efecto visible en el software: filtrar un arreglo con una condición es mucho más rápido si los datos están **ordenados**, porque el salto se vuelve predecible (todos falsos, luego todos verdaderos).
~~~js
const N = 2000000, datos = Array.from({ length: N }, () => Math.floor(Math.random() * 256));
function sumarMayores(l) { let s = 0; for (let i = 0; i < l.length; i++) if (l[i] >= 128) s += l[i]; return s; }
let t = performance.now(); sumarMayores(datos); const desordenado = performance.now() - t;
const ordenados = [...datos].sort((a, b) => a - b);
t = performance.now(); sumarMayores(ordenados); const ordenado = performance.now() - t;
console.log('desordenado', desordenado.toFixed(1), 'ms · ordenado', ordenado.toFixed(1), 'ms');
~~~
(En JavaScript el compilador puede eliminar el salto y la diferencia varía; en C con -O1 suele ser dramática.)
La **ejecución especulativa** va más lejos: ejecuta instrucciones del camino predicho antes de saber si son necesarias. En 2018 se publicaron **Spectre** y **Meltdown** (Kocher y otros; Lipp y otros), ataques que leen datos secretos observando los efectos que la ejecución especulativa deja en la caché, aunque el resultado se descarte. Mostraron que una optimización de rendimiento puede convertirse en una vulnerabilidad de seguridad, y obligaron a parchear sistemas operativos y navegadores de todo el mundo.

## Más paralelismo dentro de un núcleo
- **Superescalar:** varias unidades de ejecución terminan varias instrucciones por ciclo.
- **Ejecución fuera de orden:** el procesador ejecuta las instrucciones cuyos datos ya están listos aunque vengan después en el programa. La idea se remonta al algoritmo de Robert Tomasulo para el IBM System/360 Modelo 91 (1967).
- **SIMD:** una instrucción opera sobre varios datos a la vez (las extensiones SSE y AVX de x86, NEON de ARM). Michael Flynn clasificó en 1966 las arquitecturas según cuántos flujos de instrucciones y de datos manejan (SISD, SIMD, MISD, MIMD).

## El fin de la era fácil
La **ley de Moore** (más transistores cada dos años) siguió vigente durante décadas, pero el **escalado de Dennard** (transistores más pequeños consumen proporcionalmente menos) terminó alrededor de 2006: subir la frecuencia generaba demasiado calor. La industria pasó a **varios núcleos** y la responsabilidad de aprovecharlos pasó al software. En su conferencia del Premio Turing, publicada en 2019 como *A New Golden Age for Computer Architecture*, Hennessy y Patterson argumentaron que el futuro son las **arquitecturas de dominio específico**, como las TPU de Google para redes neuronales (Jouppi y otros, 2017), y los lenguajes y compiladores que las aprovechan.

## La ley de Amdahl
Gene Amdahl advirtió en 1967 que acelerar una parte de un programa tiene un límite: si una fracción p se acelera s veces, la mejora total es 1 / ((1 − p) + p/s). Si el 90% de un programa es paralelizable, ni con infinitos núcleos se supera una mejora de 10 veces: el 10% secuencial domina. Antes de optimizar, mide qué parte del tiempo ocupa realmente lo que quieres mejorar.

## Qué cambia en tu código
- Evita condiciones impredecibles dentro de bucles muy calientes: a veces se reemplazan por aritmética (sumar un booleano convertido en número) o por tablas.
- Ayuda al compilador a vectorizar: bucles simples sobre arreglos contiguos de un solo tipo se convierten en instrucciones SIMD.
- No adivines: usa un perfilador para saber si el cuello de botella es la CPU, la memoria o la entrada/salida antes de cambiar nada.`,
  links: [['m1.cpu', 'el ciclo de instrucción es lo que el pipeline superpone'], ['m8.conc', 'los núcleos múltiples exigen programar con concurrencia'], ['m16.crypto', 'Spectre mostró que el rendimiento puede filtrar secretos']],
  read: 'Patterson y Hennessy, *Computer Organization and Design*, capítulo 4; Hennessy y Patterson, *Computer Architecture: A Quantitative Approach*, capítulos 1 y 3.',
  terms: [
    ['Segmentación (pipeline)', 'técnica que superpone las etapas de varias instrucciones para terminar una por ciclo', ['Mientras una instrucción se ejecuta, la siguiente se decodifica y otra se busca.', 'La lavandería empieza a lavar la segunda carga mientras seca la primera.', 'Con k etapas la mejora ideal se acerca a k veces.']],
    ['Riesgo de datos', 'situación en la que una instrucción necesita un resultado que otra anterior todavía no produjo', ['«sub» usa t0 justo después de que «add» lo calcula.', 'Una carga de memoria obliga a esperar un ciclo antes de usar su valor.', 'El compilador reordena instrucciones para evitarlo.']],
    ['Adelantamiento (forwarding)', 'técnica que pasa un resultado directamente entre etapas sin esperar a que se escriba en el registro', ['El resultado de la ALU llega a la siguiente instrucción en el ciclo siguiente.', 'Evita insertar burbujas en la mayoría de los riesgos de datos.', 'Requiere caminos extra de hardware.']],
    ['Predicción de saltos', 'mecanismo que adivina el resultado de un salto condicional para seguir buscando instrucciones sin esperar', ['Filtrar datos ordenados es más rápido que filtrarlos desordenados.', 'Un fallo cuesta descartar unos 15 a 20 ciclos de trabajo.', 'Los procesadores modernos aciertan más del 95% de las veces.']],
    ['Ejecución especulativa', 'ejecución adelantada de instrucciones del camino predicho antes de saber si se necesitan', ['Spectre la aprovechó para leer datos secretos.', 'Si la predicción falla, los resultados se descartan.', 'Aumenta mucho el rendimiento a cambio de complejidad.']],
    ['Superescalar', 'diseño de procesador que puede iniciar y terminar varias instrucciones por ciclo', ['Un núcleo tiene varias ALU trabajando a la vez.', 'El CPI baja de 1.', 'Combinado con ejecución fuera de orden aprovecha el paralelismo del código.']],
    ['SIMD', 'paralelismo en el que una sola instrucción opera sobre varios datos a la vez', ['Una instrucción AVX suma ocho números de 32 bits de un golpe.', 'Las bibliotecas de procesamiento de imágenes lo usan mucho.', 'Es una de las categorías de la taxonomía de Flynn.']],
    ['Ley de Amdahl', 'límite de la mejora total al acelerar solo una parte de un programa: 1 / ((1 − p) + p/s)', ['Paralelizas el 90% y descubres que nunca superarás 10 veces de mejora.', 'Decides no optimizar una función que solo ocupa el 2% del tiempo.', 'La parte secuencial termina dominando.']]
  ],
  q: [
    ['¿Cuántos ciclos necesita un pipeline de 5 etapas para ejecutar 100 instrucciones sin riesgos?', '104', ['500', '100', '105'], 'k + n − 1 = 5 + 100 − 1 = 104.', 3],
    ['¿Qué técnica resuelve la mayoría de los riesgos de datos sin detener el pipeline?', 'El adelantamiento (forwarding)', ['La predicción de saltos', 'Aumentar la frecuencia', 'Agregar más memoria RAM'], 'El resultado se envía directamente a la etapa que lo necesita.', 3],
    ['¿Por qué filtrar un arreglo ordenado puede ser más rápido que uno desordenado?', 'Porque el salto de la condición se vuelve predecible', ['Porque ocupa menos memoria', 'Porque el compilador lo elimina siempre', 'Porque el arreglo ordenado tiene menos elementos'], 'Con datos ordenados el predictor casi nunca falla.', 4],
    ['Si el 75% de un programa se acelera 3 veces, ¿cuál es la mejora total?', '2 veces', ['3 veces', '2.25 veces', '4 veces'], '1/(0.25 + 0.75/3) = 1/0.5 = 2.', 4],
    ['¿Qué mostraron Spectre y Meltdown?', 'Que la ejecución especulativa puede filtrar datos secretos a través de la caché', ['Que los pipelines no sirven', 'Que RISC es inseguro', 'Que la predicción de saltos siempre falla'], 'Un efecto lateral de una optimización se volvió una vulnerabilidad.', 3],
    { tf: 'El pipeline reduce el tiempo que tarda cada instrucción individual.', v: false, e: 'Reduce el tiempo total (mejora el rendimiento); la latencia de cada instrucción sigue siendo de k etapas.', l: 2 },
    { tf: 'Según Amdahl, si el 95% de un programa es paralelizable, la mejora máxima con infinitos núcleos es 20 veces.', v: true, e: '1/(0.05) = 20.', l: 3 },
    { i: 'Un programa pasa el 60% del tiempo en una función que aceleras 4 veces. ¿Cuál es la mejora total? Redondea a 2 decimales.', a: '1.82', e: '1/(0.4 + 0.6/4) = 1/0.55 ≈ 1.82.', l: 4 },
    { c: 'Escribe «ciclosPipeline(n, k)»: ciclos para n instrucciones en un pipeline de k etapas sin riesgos (0 si n es 0).', f: 'ciclosPipeline', p: ['n', 'k'], t: [[[100, 5], 104], [[1, 5], 5], [[0, 5], 0], [[10, 3], 12]], sol: '  return n === 0 ? 0 : k + n - 1;', l: 2 },
    { c: 'Escribe «amdahl(p, s)» que devuelva la mejora total redondeada a 2 decimales.', f: 'amdahl', p: ['p', 's'], t: [[[0.5, 2], 1.33], [[0.9, 10], 5.26], [[0.95, 1000000000], 20]], sol: '  return Math.round(100 / ((1 - p) + p / s)) / 100;', h: '1 / ((1 − p) + p/s), luego redondea con Math.round(x·100)/100.', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.int(10, 1000), k = R.pick([4, 5, 6, 8, 12]); g.input(2, '¿Cuántos ciclos tarda un pipeline de ' + k + ' etapas en ejecutar ' + n + ' instrucciones sin riesgos?', k + n - 1, 'k + n − 1 = ' + (k + n - 1) + '.'); });
    g.times(8, function (R) { var p = R.pick([0.5, 0.6, 0.75, 0.8, 0.9, 0.95]), s = R.pick([2, 4, 8, 16]), v = 1 / ((1 - p) + p / s); g.input(4, 'El ' + Math.round(p * 100) + '% de un programa se acelera ' + s + ' veces. ¿Cuál es la mejora total? Redondea a 2 decimales.', v.toFixed(2), '1/((1 − ' + p + ') + ' + p + '/' + s + ') = ' + v.toFixed(2) + '.'); });
    g.times(5, function (R) { var p = R.pick([0.5, 0.8, 0.9, 0.95, 0.99]); g.input(3, 'Si el ' + Math.round(p * 100) + '% de un programa es paralelizable, ¿cuál es la mejora máxima con infinitos núcleos? Redondea a 2 decimales.', (1 / (1 - p)).toFixed(2), 'Con s → ∞ la mejora es 1/(1 − p) = ' + (1 / (1 - p)).toFixed(2) + '.'); });
    g.times(4, function (R) { var n = R.int(1, 20) * 1000, f = R.pick([0.02, 0.05, 0.1]), c = R.pick([15, 20]); g.input(3, 'Un programa ejecuta ' + n + ' saltos; el predictor falla el ' + Math.round(f * 100) + '% y cada fallo cuesta ' + c + ' ciclos. ¿Cuántos ciclos se pierden?', Math.round(n * f * c), n + ' × ' + f + ' × ' + c + ' = ' + Math.round(n * f * c) + '.'); });
  },
  checks: [
    ['Explica la diferencia entre latencia y rendimiento en un pipeline.', 'La latencia es lo que tarda una instrucción en recorrer todas las etapas (no baja); el rendimiento es cuántas instrucciones terminan por unidad de tiempo, que sí mejora porque se superponen.'],
    ['¿Por qué un salto condicional es un problema para el pipeline?', 'Porque no se sabe qué instrucción buscar hasta evaluar la condición; esperar desperdiciaría ciclos, así que se predice y, si falla, se descarta el trabajo especulativo.'],
    ['¿Qué lección de seguridad dejaron Spectre y Meltdown?', 'Que optimizaciones invisibles para el programa (la ejecución especulativa y la caché) pueden filtrar información; el rendimiento y la seguridad deben diseñarse juntos.'],
    ['¿Por qué terminó la era de subir la frecuencia cada año?', 'Porque el escalado de Dennard terminó: con más frecuencia el consumo y el calor crecían demasiado; la industria pasó a varios núcleos y a hardware especializado.'],
    ['Usa la ley de Amdahl para justificar medir antes de optimizar.', 'La mejora total depende de la fracción de tiempo que ocupa lo que optimizas; acelerar algo que ocupa el 5% del tiempo casi no cambia nada, así que primero hay que medir dónde se va el tiempo.']
  ],
  cites: ['Patterson, D. y Hennessy, J. (2017). *Computer Organization and Design: RISC-V Edition*. Morgan Kaufmann. Capítulo 4.', 'Hennessy, J. y Patterson, D. (2019). A New Golden Age for Computer Architecture. *Communications of the ACM*, 62(2).', 'Amdahl, G. (1967). Validity of the single processor approach to achieving large scale computing capabilities. *AFIPS Spring Joint Computer Conference*.', 'Kocher, P. et al. (2019). Spectre Attacks: Exploiting Speculative Execution. *IEEE Symposium on Security and Privacy*.', 'Tomasulo, R. (1967). An Efficient Algorithm for Exploiting Multiple Arithmetic Units. *IBM Journal of Research and Development*, 11(1).'],
  project: { t: 'Simulador de pipeline y experimentos de rendimiento',
    goal: 'Visualizar cómo avanza un pipeline y medir en tu computadora los efectos que predice la teoría.',
    steps: ['Programa un simulador que muestre ciclo a ciclo qué instrucción está en cada etapa (IF, ID, EX, MEM, WB).', 'Agrega detección de riesgos de datos con y sin adelantamiento, e inserta burbujas cuando haga falta.', 'Calcula el CPI resultante para tres programas cortos.', 'En C (o en JavaScript), mide el filtrado de datos ordenados y desordenados y explica el resultado.', 'Mide la mejora real al paralelizar una tarea con 1, 2, 4 y 8 hilos y compárala con la ley de Amdahl.'],
    deliver: 'El simulador, las tablas de ciclos y los gráficos de los experimentos con su explicación.' },
  hito: ['Mide en PatioApp el tiempo de filtrar un millón de unidades por kilometraje con los datos ordenados y desordenados, y explica la diferencia con la predicción de saltos.', 'Estima con la ley de Amdahl cuánto mejoraría el reporte de cierre si paralelizas el cálculo, a partir de la fracción de tiempo medida.']
});

S('arq', 'arq.mem', { title: 'Jerarquía de memoria y caché',
  ask: '¿Qué concepto de la jerarquía de memoria se aplica?',
  lesson: `
> **La idea en simple.** Tienes los papeles que estás usando sobre el escritorio, los del mes en un cajón y los del año en el archivo del sótano. Bajar al sótano cuesta mucho, así que cuando vas traes la carpeta completa. La computadora organiza su memoria exactamente así.

## La jerarquía y sus números
| Nivel | Tamaño típico | Latencia aproximada |
| Registros | cientos de bytes | menos de 1 ns |
| Caché L1 | 32 a 64 KB por núcleo | ~1 ns |
| Caché L2 | 256 KB a 2 MB | ~4 ns |
| Caché L3 | decenas de MB compartidos | ~10 a 40 ns |
| RAM (DRAM) | gigabytes | ~80 a 100 ns |
| SSD NVMe | terabytes | ~20 a 100 µs |
| Disco duro | terabytes | ~5 a 10 ms |
La memoria rápida (SRAM, con unos seis transistores por bit) es cara y grande; la RAM (DRAM, un transistor y un condensador por bit) es densa pero lenta y debe refrescarse. La jerarquía da la ilusión de una memoria grande **y** rápida, siempre que el programa tenga **localidad**.

## Cómo está organizada una caché
La caché guarda **líneas** de 64 bytes. Cada dirección se divide en tres partes:
:::flow Etiqueta (tag) | Índice (qué conjunto) | Desplazamiento (qué byte de la línea)
- **De correspondencia directa:** cada línea de memoria solo puede ir a un lugar. Simple, pero dos datos que caen en el mismo lugar se expulsan mutuamente.
- **Asociativa por conjuntos de n vías:** cada línea puede ir a cualquiera de n lugares de su conjunto. Es lo habitual (8 a 16 vías).
- **Totalmente asociativa:** puede ir a cualquier lugar; se usa en cachés pequeñas como la TLB.
Ejemplo: una caché de 32 KB, líneas de 64 bytes y 8 vías tiene 512 líneas y 64 conjuntos. Con direcciones de 32 bits: 6 bits de desplazamiento, 6 de índice y 20 de etiqueta.

## Por qué falla una caché: las tres C
Mark Hill clasificó en 1987 los fallos en tres tipos:
- **Obligatorios** (*compulsory*): el primer acceso a una línea siempre falla.
- **De capacidad:** los datos que usas no caben en la caché.
- **De conflicto:** caben, pero varios compiten por el mismo conjunto.
El **tiempo medio de acceso** resume el efecto: AMAT = tiempo de acierto + tasa de fallos × penalización. Con 1 ns de acierto, 5% de fallos y 100 ns de penalización: 1 + 0.05·100 = 6 ns. Bajar la tasa de fallos al 2% lo deja en 3 ns: la mitad, sin cambiar el hardware, solo con un mejor patrón de acceso.

## Escrituras
- **Write-through:** cada escritura va también a la memoria. Simple, más tráfico.
- **Write-back:** se escribe solo en la caché y la línea se marca como sucia; se copia a memoria al expulsarla. Es lo habitual.

## Varios núcleos: coherencia y compartición falsa
Si dos núcleos tienen copias de la misma línea y uno escribe, el otro debe enterarse. Los protocolos de **coherencia** como **MESI** (cada línea está Modificada, Exclusiva, Compartida o Inválida), descrito por Papamarcos y Patel en 1984, lo garantizan invalidando las otras copias. Tiene una trampa: la **compartición falsa**. Si dos hilos escriben variables distintas que **caen en la misma línea** de 64 bytes, la línea rebota entre núcleos en cada escritura y el programa paralelo puede ir más lento que el secuencial. Se evita separando los datos de cada hilo (relleno o arreglos por hilo).

## Diseñar los datos para la caché
Ulrich Drepper escribió en 2007 *What Every Programmer Should Know About Memory*, un texto largo y clásico. Mike Acton popularizó en la conferencia CppCon de 2014 el **diseño orientado a datos**: organizar los datos según cómo se recorren. Si un reporte solo mira el kilometraje de un millón de unidades, un arreglo de objetos obliga a traer a la caché todos los demás campos de cada unidad; un arreglo con **solo los kilometrajes** (estructura de arreglos) aprovecha cada byte de cada línea.
~~~js
const N = 1000000;
const objetos = Array.from({ length: N }, (_, i) => ({ placa: 'P' + i, marca: 'Kia', km: i % 300000, precio: 10000 + i, estado: 'lista' }));
const kms = new Float64Array(N); for (let i = 0; i < N; i++) kms[i] = objetos[i].km;
let t = performance.now(), s = 0; for (let i = 0; i < N; i++) s += objetos[i].km;
const tObj = performance.now() - t;
t = performance.now(); s = 0; for (let i = 0; i < N; i++) s += kms[i];
console.log('arreglo de objetos', tObj.toFixed(1), 'ms · columna tipada', (performance.now() - t).toFixed(1), 'ms');
~~~
Las bases de datos **columnares** (las que usan los almacenes de datos para analítica) aplican la misma idea a escala de disco.

## Reglas prácticas
- Recorre los datos en el orden en que están guardados (filas antes que columnas en una matriz por filas).
- Prefiere arreglos contiguos a listas enlazadas para recorrer: cada nodo de una lista puede ser un fallo de caché.
- Mantén juntos los datos que se usan juntos y separados los que escriben hilos distintos.
- Mide: los perfiladores muestran fallos de caché por línea de código.
- En JavaScript, los arreglos tipados («Float64Array», «Int32Array») garantizan memoria contigua de un solo tipo; los arreglos normales de objetos guardan referencias dispersas por el montículo.
- Recuerda los órdenes de magnitud: un fallo que llega a la RAM cuesta lo mismo que unas cien operaciones aritméticas, así que reducir fallos suele rendir más que reducir cálculos.`,
  links: [['m1.cpu', 'la caché nace del muro de la memoria y la localidad'], ['m8.os', 'la memoria virtual y la TLB son otro nivel de esta jerarquía'], ['m4.stack', 'los arreglos aprovechan la caché mejor que las listas enlazadas']],
  read: 'Patterson y Hennessy, capítulo 5; Bryant y O\'Hallaron, capítulo 6; Drepper, *What Every Programmer Should Know About Memory*.',
  terms: [
    ['Jerarquía de memoria', 'organización en niveles de memoria más pequeños y rápidos cerca del procesador y más grandes y lentos lejos', ['Los datos viajan del SSD a la RAM, luego a L3, L2 y L1.', 'Da la ilusión de una memoria grande y rápida.', 'Funciona gracias a la localidad de los programas.']],
    ['Línea de caché', 'bloque de bytes contiguos (típicamente 64) que se transfiere de una vez entre la memoria y la caché', ['Leer un entero trae también a sus vecinos.', 'Recorrer un arreglo en orden aprovecha cada transferencia.', 'Dos variables de hilos distintos pueden compartirla por accidente.']],
    ['Caché asociativa por conjuntos', 'caché en la que cada bloque de memoria puede ubicarse en cualquiera de las n vías de un conjunto determinado', ['Una L1 de 8 vías reduce los fallos de conflicto.', 'El índice de la dirección elige el conjunto y la etiqueta identifica el bloque.', 'Es un punto medio entre correspondencia directa y totalmente asociativa.']],
    ['Fallo de caché', 'acceso a un dato que no está en la caché y debe traerse de un nivel inferior', ['El primer acceso a un arreglo siempre lo produce.', 'Recorrer una matriz por columnas los multiplica.', 'Se clasifican en obligatorios, de capacidad y de conflicto.']],
    ['Tiempo medio de acceso (AMAT)', 'tiempo de acierto más la tasa de fallos por la penalización de cada fallo', ['Calculas 1 + 0.05·100 = 6 ns.', 'Bajar la tasa de fallos reduce mucho el tiempo promedio.', 'Sirve para comparar dos diseños de caché.']],
    ['Write-back', 'política en la que las escrituras quedan en la caché y se copian a memoria solo al expulsar la línea', ['La línea se marca como sucia al modificarla.', 'Reduce el tráfico hacia la RAM.', 'Es la política habitual en procesadores modernos.']],
    ['Coherencia de caché', 'garantía de que todos los núcleos ven un valor consistente para una misma dirección de memoria', ['Al escribir un núcleo, se invalidan las copias de los demás.', 'El protocolo MESI la implementa.', 'Sin ella, dos hilos verían valores distintos de la misma variable.']],
    ['Compartición falsa', 'pérdida de rendimiento cuando hilos escriben variables distintas que caen en la misma línea de caché', ['Dos contadores de hilos distintos están uno al lado del otro y el programa paralelo va más lento.', 'Se corrige separando los datos con relleno.', 'La línea rebota entre núcleos en cada escritura.']]
  ],
  q: [
    ['Con 1 ns de acierto, 10% de fallos y 50 ns de penalización, ¿cuál es el AMAT?', '6 ns', ['5 ns', '51 ns', '1.5 ns'], '1 + 0.1·50 = 6 ns.', 3],
    ['¿Qué tipo de fallo ocurre la primera vez que se accede a una línea?', 'Obligatorio', ['De capacidad', 'De conflicto', 'De coherencia'], 'Nunca estuvo en la caché, así que es inevitable.', 2],
    ['Un reporte solo suma el kilometraje de un millón de unidades. ¿Qué organización aprovecha mejor la caché?', 'Un arreglo con solo los kilometrajes', ['Un arreglo de objetos con todos los campos', 'Una lista enlazada de unidades', 'Un Map por placa'], 'Cada línea traída contiene solo datos útiles.', 3],
    ['Dos hilos incrementan contadores distintos que están juntos en memoria y el programa paralelo va más lento. ¿Por qué?', 'Compartición falsa: ambos contadores están en la misma línea de caché', ['Condición de carrera', 'Interbloqueo', 'Fallo obligatorio'], 'La coherencia hace rebotar la línea entre núcleos.', 4],
    { tf: 'La memoria DRAM es más rápida que la SRAM.', v: false, e: 'La SRAM (cachés) es más rápida y cara; la DRAM es más densa y lenta.', l: 2 },
    { tf: 'En una caché de correspondencia directa cada bloque de memoria tiene un único lugar posible.', v: true, e: 'Por eso sufre más fallos de conflicto.', l: 2 },
    { i: 'Una caché tiene líneas de 64 bytes. ¿Cuántos bits de desplazamiento usa la dirección?', a: 6, e: '2^6 = 64.', l: 3 },
    { c: 'Escribe «amat(acierto, tasaFallos, penalizacion)».', f: 'amat', p: ['acierto', 'tasaFallos', 'penalizacion'], t: [[[1, 0.05, 100], 6], [[4, 0.1, 50], 9], [[2, 0, 200], 2]], sol: '  return acierto + tasaFallos * penalizacion;', l: 2 },
    { c: 'Escribe «bitsCache(tamano, linea, vias, bitsDir)» que devuelva [etiqueta, indice, desplazamiento] en bits (todos los valores son potencias de 2).', f: 'bitsCache', p: ['tamano', 'linea', 'vias', 'bitsDir'], t: [[[32768, 64, 8, 32], [20, 6, 6]], [[1024, 16, 1, 16], [6, 6, 4]], [[4096, 64, 64, 32], [26, 0, 6]]], sol: '  const off = Math.log2(linea);\n  const conjuntos = tamano / linea / vias;\n  const idx = Math.log2(conjuntos);\n  return [bitsDir - idx - off, idx, off];', h: 'Desplazamiento = log₂(línea); conjuntos = tamaño / línea / vías; índice = log₂(conjuntos); etiqueta = el resto.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var h = R.pick([1, 2, 4]), m = R.pick([0.02, 0.05, 0.1, 0.2]), p = R.pick([50, 100, 200]); var v = h + m * p; g.input(3, 'Acierto de ' + h + ' ns, tasa de fallos ' + Math.round(m * 100) + '% y penalización de ' + p + ' ns. ¿Cuál es el AMAT en ns?', v, h + ' + ' + m + '·' + p + ' = ' + v + '.'); });
    g.times(8, function (R) { var kb = R.pick([16, 32, 64, 256]), line = R.pick([32, 64]), ways = R.pick([1, 2, 4, 8]), sets = kb * 1024 / line / ways; g.input(3, 'Caché de ' + kb + ' KB, líneas de ' + line + ' bytes y ' + ways + ' vía(s). ¿Cuántos conjuntos tiene?', sets, kb * 1024 + '/' + line + '/' + ways + ' = ' + sets + '.'); });
    g.times(6, function (R) { var kb = R.pick([16, 32, 64]), line = 64, ways = R.pick([2, 4, 8]), sets = kb * 1024 / line / ways, idx = Math.log2(sets), tag = 32 - idx - 6; g.input(4, 'Caché de ' + kb + ' KB, líneas de 64 bytes, ' + ways + ' vías y direcciones de 32 bits. ¿Cuántos bits tiene la etiqueta?', tag, 'Desplazamiento 6, índice log₂(' + sets + ') = ' + idx + ', etiqueta 32 − ' + idx + ' − 6 = ' + tag + '.'); });
    g.times(4, function (R) { var n = R.pick([1000, 4096, 10000]), b = R.pick([4, 8]); g.input(3, 'Recorres en orden un arreglo de ' + n + ' elementos de ' + b + ' bytes con líneas de 64 bytes. ¿Cuántos fallos obligatorios ocurren como mínimo? (redondea hacia arriba)', Math.ceil(n * b / 64), Math.ceil(n * b / 64) + ' líneas distintas.'); });
  },
  checks: [
    ['¿Por qué funciona la jerarquía de memoria?', 'Por la localidad: los programas reutilizan datos recientes (temporal) y usan datos vecinos (espacial), así la mayoría de los accesos se resuelve en los niveles rápidos.'],
    ['¿En qué tres partes se divide una dirección para una caché asociativa por conjuntos y para qué sirve cada una?', 'Desplazamiento (qué byte dentro de la línea), índice (qué conjunto) y etiqueta (identificar qué bloque de memoria ocupa la línea).'],
    ['Nombra las tres C de los fallos de caché y una forma de reducir cada uno.', 'Obligatorios (líneas más grandes o precarga), de capacidad (usar menos datos a la vez o una caché más grande) y de conflicto (más vías de asociatividad o cambiar el patrón de acceso).'],
    ['¿Qué es la compartición falsa y cómo se evita?', 'La pérdida de rendimiento cuando hilos escriben variables distintas en la misma línea de caché; se evita separando esos datos en líneas diferentes.'],
    ['¿Qué propone el diseño orientado a datos?', 'Organizar los datos según cómo se recorren (por ejemplo, columnas separadas) para que cada línea de caché traída contenga solo datos útiles.']
  ],
  cites: ['Patterson, D. y Hennessy, J. (2017). *Computer Organization and Design: RISC-V Edition*. Morgan Kaufmann. Capítulo 5.', 'Drepper, U. (2007). *What Every Programmer Should Know About Memory*. Red Hat.', 'Hill, M. (1987). *Aspects of Cache Memory and Instruction Buffer Performance*. Tesis doctoral, UC Berkeley.', 'Papamarcos, M. y Patel, J. (1984). A Low-overhead Coherence Solution for Multiprocessors with Private Cache Memories. *ISCA 1984*.', 'Bryant, R. y O\'Hallaron, D. (2016). *Computer Systems: A Programmer\'s Perspective* (3.ª ed.). Pearson. Capítulo 6.'],
  project: { t: 'Simulador de caché y experimentos de localidad',
    goal: 'Construir un simulador de caché y comprobar en tu computadora el efecto de los patrones de acceso.',
    steps: ['Programa un simulador de caché configurable (tamaño, línea, vías, reemplazo LRU) que reciba una lista de direcciones y cuente aciertos y fallos por tipo.', 'Genera las direcciones de recorrer una matriz por filas y por columnas y compara la tasa de fallos.', 'Mide en tu computadora el tiempo de recorrer una matriz de 4000×4000 por filas y por columnas.', 'Compara un arreglo de objetos con columnas tipadas para un millón de registros.', 'Provoca compartición falsa con dos workers y SharedArrayBuffer, y corrígela con relleno.'],
    deliver: 'El simulador, las tablas de aciertos y fallos y los tiempos medidos con su explicación.' },
  hito: ['Compara el reporte de PatioApp con un arreglo de objetos y con columnas en arreglos tipados (Float64Array) para un millón de unidades.', 'Documenta el resultado en el README explicándolo con la jerarquía de memoria y las líneas de caché.']
});

S('arq', 'arq.io', { title: 'Entrada/salida y almacenamiento',
  ask: '¿Qué concepto de entrada/salida o almacenamiento se aplica?',
  lesson: `
> **La idea en simple.** El procesador es un chef rapidísimo y el disco es el proveedor que tarda en traer los ingredientes. Si el chef se queda mirando la puerta, desperdicia su tiempo; mejor sigue cocinando y que le avisen cuando llegue el pedido. Así se organiza la entrada y salida.

## Tres formas de hablar con un dispositivo
- **Sondeo (polling):** la CPU pregunta una y otra vez "¿ya terminaste?". Sencillo, pero desperdicia ciclos si el dispositivo es lento.
- **Interrupciones:** el dispositivo avisa cuando termina y la CPU atiende el evento. Es lo habitual para eventos poco frecuentes.
- **Acceso directo a memoria (DMA):** un controlador copia bloques grandes entre el dispositivo y la RAM sin pasar byte a byte por la CPU, y avisa al final con una interrupción. Sin DMA, una red de 10 Gb/s saturaría el procesador.
Los dispositivos se conectan por **buses** como PCI Express, organizado en carriles que transmiten en paralelo. Bryant y O'Hallaron, en el capítulo 6 de *Computer Systems*, y los Arpaci-Dusseau, en la parte de persistencia de *OSTEP*, explican cómo el sistema operativo coordina todo esto.

## Discos duros: mecánica y latencia
Un disco duro tiene platos que giran y un cabezal que se mueve. Leer un dato aleatorio cuesta:
- **Búsqueda:** mover el cabezal a la pista, unos 4 a 10 ms.
- **Latencia rotacional:** esperar que el sector pase bajo el cabezal; en promedio, media vuelta. A 7200 rpm una vuelta dura 8.33 ms, así que la espera media es 4.17 ms.
- **Transferencia:** leer los datos, rápido una vez posicionado.
Por eso un disco duro hace unas 100 a 200 operaciones aleatorias por segundo (**IOPS**), pero lee de forma secuencial a más de 150 MB/s. La diferencia entre acceso secuencial y aleatorio es de dos o tres órdenes de magnitud, y explica el diseño de las bases de datos, los registros de escritura anticipada y los árboles LSM.

## SSD: memoria flash con sus propias reglas
Los SSD no tienen partes móviles: su latencia aleatoria es de decenas de microsegundos y alcanzan cientos de miles de IOPS. Pero la memoria flash NAND tiene restricciones:
- Se escribe por **páginas** (unos KB) y se borra por **bloques** (cientos de páginas); no se puede sobrescribir una página sin borrar su bloque.
- Cada celda soporta un número limitado de ciclos de borrado.
Un controlador interno, la **capa de traducción flash**, resuelve esto escribiendo siempre en páginas libres, moviendo datos vivos y repartiendo el desgaste (**nivelación de desgaste**). El efecto secundario es la **amplificación de escritura**: escribir 1 GB puede significar escribir varios GB físicamente. La especificación **NVMe** (2011) conecta los SSD directamente por PCI Express con muchas colas en paralelo, en lugar de usar protocolos pensados para discos mecánicos.

## RAID: discos baratos que no pierden datos
David Patterson, Garth Gibson y Randy Katz publicaron en 1988 *A Case for Redundant Arrays of Inexpensive Disks*: en lugar de un disco caro y confiable, combinar varios baratos con redundancia.
| Nivel | Cómo | Capacidad útil con n discos | Tolera |
| RAID 0 | reparte los datos (striping) | n | ninguna falla |
| RAID 1 | espejo | 1 disco | n − 1 fallas |
| RAID 5 | reparte datos y paridad | n − 1 | 1 falla |
| RAID 6 | doble paridad | n − 2 | 2 fallas |
| RAID 10 | espejos repartidos | n/2 | 1 por espejo |
La paridad de RAID 5 es un XOR de los bloques: si se pierde uno, se reconstruye con el XOR de los demás. Con discos enormes, reconstruir tarda horas y un segundo disco puede fallar en ese tiempo; por eso RAID 6 se prefiere hoy. Y una regla que no admite excepciones: **RAID no es respaldo**. Si borras un archivo por error o un ransomware lo cifra, RAID replica el daño en todos los discos.

## Detectar y corregir errores
Richard Hamming, molesto porque las computadoras de los Laboratorios Bell abandonaban sus cálculos de fin de semana por un bit erróneo, publicó en 1950 los **códigos de Hamming**, que detectan y corrigen errores de un bit agregando bits de paridad en posiciones potencia de 2. La memoria **ECC** de los servidores usa esta idea. Los sistemas de archivos modernos como ZFS (Sun, 2005) guardan sumas de verificación de cada bloque para detectar la **corrupción silenciosa** (*bit rot*) que los discos no reportan.

## Respaldos: la regla 3-2-1
El fotógrafo Peter Krogh popularizó una regla simple: **3** copias de los datos, en **2** medios distintos, con **1** fuera del lugar (otra ciudad o la nube). Hoy se agrega una copia **inmutable** o desconectada contra el ransomware, y algo que casi nadie hace y todos deberían: **probar la restauración**. Un respaldo que nunca se restauró es una esperanza, no un respaldo.

## Qué cambia en tu código
- Agrupa escrituras pequeñas en bloques grandes y secuenciales cuando puedas.
- Decide conscientemente cuándo llamar a fsync: en cada operación es lo más seguro y lo más lento; agrupar confirmaciones es el compromiso que hacen las bases de datos.
- Define dos números para cada sistema: cuántos datos puedes perder como máximo (RPO) y cuánto puedes tardar en recuperarte (RTO). De ahí salen la frecuencia de respaldos y el diseño de la redundancia.

~~~js
const rpm = [5400, 7200, 10000, 15000];
console.log(rpm.map(r => r + ' rpm → ' + (60000 / r / 2).toFixed(2) + ' ms de espera rotacional media').join('\\n'));
const xor = (a, b) => a.map((x, i) => x ^ b[i]);
const d1 = [1, 0, 1, 1], d2 = [0, 1, 1, 0], paridad = xor(d1, d2);
console.log('reconstruyo d1 desde d2 y la paridad:', xor(d2, paridad));
~~~`,
  links: [['m8.os', 'el sistema operativo gestiona interrupciones, archivos y fsync'], ['m10.nosql', 'los árboles LSM existen porque escribir secuencialmente es más rápido'], ['m15.cloud', 'en la nube el almacenamiento y los respaldos también se diseñan']],
  read: 'Bryant y O\'Hallaron, capítulos 6 y 10; Arpaci-Dusseau, *OSTEP*, parte III; Patterson, Gibson y Katz (1988).',
  terms: [
    ['Interrupción', 'señal de un dispositivo que hace que la CPU deje lo que hacía para atender un evento', ['El teclado avisa que se presionó una tecla.', 'La tarjeta de red avisa que llegó un paquete.', 'Evita que la CPU pregunte una y otra vez si el dispositivo terminó.']],
    ['DMA', 'mecanismo por el que un controlador copia datos entre un dispositivo y la memoria sin intervención de la CPU', ['Una red de 10 Gb/s funciona sin saturar el procesador.', 'El disco copia un bloque entero a la RAM y luego avisa.', 'La CPU queda libre para otro trabajo mientras se transfiere.']],
    ['Latencia de búsqueda', 'tiempo que tarda el cabezal de un disco duro en moverse hasta la pista correcta', ['Un acceso aleatorio en disco duro cuesta varios milisegundos por esto.', 'Los SSD no la tienen porque no tienen partes móviles.', 'Por ella las lecturas secuenciales son mucho más rápidas.']],
    ['Memoria flash', 'almacenamiento sin partes móviles que se escribe por páginas y se borra por bloques', ['Un SSD necesita borrar un bloque antes de reescribir sus páginas.', 'Cada celda soporta un número limitado de borrados.', 'Está en celulares, memorias USB y SSD.']],
    ['Nivelación de desgaste', 'técnica del controlador de un SSD que reparte las escrituras para que las celdas se gasten por igual', ['El SSD no escribe siempre en el mismo lugar aunque modifiques el mismo archivo.', 'Alarga la vida útil del disco.', 'Es una de las tareas de la capa de traducción flash.']],
    ['RAID', 'combinación de varios discos para obtener rendimiento, redundancia o ambos', ['Con RAID 6 el servidor sobrevive a la falla de dos discos.', 'RAID 0 suma velocidad pero pierde todo si falla un disco.', 'Patterson, Gibson y Katz lo propusieron en 1988.']],
    ['IOPS', 'cantidad de operaciones de entrada/salida por segundo que soporta un dispositivo', ['Un disco duro hace unas 150 aleatorias; un SSD NVMe, cientos de miles.', 'Una base de datos con muchas consultas pequeñas depende de esta medida.', 'Los proveedores de nube cobran discos según esta capacidad.']],
    ['Código de Hamming', 'código que agrega bits de paridad para detectar y corregir errores de un bit', ['La memoria ECC de un servidor corrige un bit alterado.', 'Hamming lo inventó para que sus cálculos de fin de semana no se perdieran.', 'Los bits de paridad van en posiciones potencia de 2.']]
  ],
  q: [
    ['¿Cuál es la latencia rotacional media de un disco de 7200 rpm?', 'Unos 4.17 ms', ['8.33 ms', '7.2 ms', '0.5 ms'], 'Una vuelta dura 60/7200 s = 8.33 ms; en promedio se espera media vuelta.', 3],
    ['¿Cuánta capacidad útil tiene un RAID 5 con 6 discos de 4 TB?', '20 TB', ['24 TB', '12 TB', '16 TB'], 'n − 1 discos de datos: 5 × 4 = 20 TB.', 3],
    ['¿Por qué RAID no es un respaldo?', 'Porque replica también los borrados accidentales y los archivos cifrados por un ataque', ['Porque es lento', 'Porque no usa paridad', 'Porque solo funciona con SSD'], 'Protege contra fallas de disco, no contra errores humanos ni malware.', 3],
    ['¿Qué ventaja tiene DMA frente a que la CPU copie cada byte?', 'Libera a la CPU durante transferencias grandes', ['Aumenta la capacidad del disco', 'Elimina las interrupciones', 'Hace innecesaria la RAM'], 'El controlador copia el bloque y avisa al final.', 2],
    ['¿Qué es la amplificación de escritura en un SSD?', 'Escribir físicamente más datos de los que pidió el programa por la gestión interna de bloques', ['Que el SSD se vuelve más rápido con el tiempo', 'Que las lecturas cuestan el doble', 'Que el SSD comprime los datos'], 'Mover páginas vivas para borrar bloques genera escrituras adicionales.', 4],
    { tf: 'En un disco duro, las lecturas aleatorias pequeñas son mucho más lentas que las secuenciales.', v: true, e: 'Cada acceso aleatorio paga búsqueda y latencia rotacional.', l: 2 },
    { tf: 'Un respaldo que nunca se probó restaurando es igual de confiable que uno probado.', v: false, e: 'Solo la restauración demuestra que los datos se pueden recuperar.', l: 2 },
    { o: 'Ordena lo que ocurre en una lectura con DMA.', s: ['El sistema operativo programa el controlador con la dirección y el tamaño', 'La CPU sigue con otro trabajo', 'El controlador copia los datos del dispositivo a la RAM', 'El controlador genera una interrupción al terminar', 'El sistema operativo despierta al proceso que esperaba los datos'], e: 'La CPU solo participa al inicio y al final.', l: 3 },
    { c: 'Escribe «capacidadRaid(nivel, n, tam)» para los niveles 0, 1, 5, 6 y 10.', f: 'capacidadRaid', p: ['nivel', 'n', 'tam'], t: [[[0, 4, 2], 8], [[1, 2, 4], 4], [[5, 6, 4], 20], [[6, 8, 10], 60], [[10, 4, 3], 6]], sol: '  if (nivel === 0) return n * tam;\n  if (nivel === 1) return tam;\n  if (nivel === 5) return (n - 1) * tam;\n  if (nivel === 6) return (n - 2) * tam;\n  return n * tam / 2;', l: 2 },
    { c: 'Escribe «latenciaRotacional(rpm)» que devuelva la espera media en ms redondeada a 2 decimales.', f: 'latenciaRotacional', p: ['rpm'], t: [[[7200], 4.17], [[15000], 2], [[5400], 5.56]], sol: '  return Math.round(60000 / rpm / 2 * 100) / 100;', h: 'Una vuelta dura 60 000/rpm milisegundos; la espera media es la mitad.', l: 3 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var r = R.pick([5400, 7200, 10000, 15000]); g.input(3, '¿Cuál es la latencia rotacional media en ms de un disco de ' + r + ' rpm? Redondea a 2 decimales.', (60000 / r / 2).toFixed(2), '60 000/' + r + '/2 = ' + (60000 / r / 2).toFixed(2) + ' ms.'); });
    g.times(8, function (R) { var lv = R.pick([0, 1, 5, 6, 10]), n = lv === 1 ? 2 : R.pick([4, 6, 8]), t = R.pick([2, 4, 8, 12]), c = lv === 0 ? n * t : lv === 1 ? t : lv === 5 ? (n - 1) * t : lv === 6 ? (n - 2) * t : n * t / 2; g.input(3, '¿Cuánta capacidad útil en TB tiene un RAID ' + lv + ' con ' + n + ' discos de ' + t + ' TB?', c, 'Según el nivel: ' + c + ' TB.'); });
    g.times(5, function (R) { var ops = R.pick([10000, 50000, 100000]), iops = R.pick([150, 200]), ssd = R.pick([50000, 100000]); g.input(3, '¿Cuántos segundos tarda un disco duro de ' + iops + ' IOPS en hacer ' + ops + ' lecturas aleatorias? Redondea a 1 decimal.', (ops / iops).toFixed(1), ops + '/' + iops + ' = ' + (ops / iops).toFixed(1) + ' s (un SSD de ' + ssd + ' IOPS tardaría ' + (ops / ssd).toFixed(2) + ' s).'); });
    g.times(5, function (R) { var a = [R.int(0, 1), R.int(0, 1), R.int(0, 1), R.int(0, 1)], b = [R.int(0, 1), R.int(0, 1), R.int(0, 1), R.int(0, 1)], p = a.map(function (x, i) { return x ^ b[i]; }); g.input(4, 'En un RAID 5 de dos discos de datos, el disco B tiene ' + b.join('') + ' y la paridad es ' + p.join('') + '. El disco A falló. ¿Qué bits tenía A?', a.join(''), 'A = B XOR paridad = ' + a.join('') + '.'); });
  },
  checks: [
    ['¿Cuándo conviene el sondeo y cuándo las interrupciones?', 'El sondeo conviene cuando el evento es muy frecuente o la espera muy corta; las interrupciones, cuando los eventos son poco frecuentes y no se quiere desperdiciar CPU preguntando.'],
    ['¿Por qué las bases de datos prefieren escribir de forma secuencial?', 'Porque en disco (y en menor medida en SSD) la escritura secuencial es muchísimo más rápida que la aleatoria; por eso usan registros de escritura anticipada y árboles LSM.'],
    ['Explica cómo RAID 5 reconstruye un disco perdido.', 'Guarda la paridad (XOR) de los bloques; si se pierde un disco, se calcula el XOR de los bloques restantes y la paridad, que da exactamente el bloque perdido.'],
    ['¿Qué es la corrupción silenciosa y cómo se detecta?', 'Bits que cambian en el almacenamiento sin que el disco lo reporte; se detecta con sumas de verificación por bloque, como hacen ZFS y otros sistemas de archivos modernos.'],
    ['Describe la regla 3-2-1 y qué le falta para protegerse del ransomware.', 'Tres copias, en dos medios distintos, una fuera del lugar; además conviene una copia inmutable o desconectada que el atacante no pueda cifrar, y probar la restauración.']
  ],
  cites: ['Patterson, D., Gibson, G. y Katz, R. (1988). A Case for Redundant Arrays of Inexpensive Disks (RAID). *ACM SIGMOD 1988*.', 'Hamming, R. (1950). Error Detecting and Error Correcting Codes. *Bell System Technical Journal*, 29(2).', 'Arpaci-Dusseau, R. y Arpaci-Dusseau, A. (2023). *Operating Systems: Three Easy Pieces*. Parte III (persistencia).', 'Bryant, R. y O\'Hallaron, D. (2016). *Computer Systems: A Programmer\'s Perspective* (3.ª ed.). Pearson. Capítulos 6 y 10.', 'Krogh, P. (2009). *The DAM Book: Digital Asset Management for Photographers* (2.ª ed.). O\'Reilly.'],
  project: { t: 'Laboratorio de almacenamiento',
    goal: 'Medir tu propio almacenamiento y diseñar una política de datos confiable.',
    steps: ['Escribe un programa que mida en tu disco la velocidad de escritura secuencial y aleatoria de bloques de 4 KB.', 'Mide el costo de llamar a fsync después de cada escritura frente a hacerlo cada 1000.', 'Implementa la paridad de RAID 5 sobre tres "discos" simulados con archivos y reconstruye uno borrado.', 'Implementa un código de Hamming (7,4) que corrija un bit alterado al azar.', 'Diseña y ejecuta un respaldo 3-2-1 de una carpeta, y documenta una prueba de restauración con su tiempo.'],
    deliver: 'El código, las mediciones y el procedimiento de respaldo y restauración probado.' },
  hito: ['Define la política de respaldo 3-2-1 de los datos de PatioApp y ejecuta una prueba de restauración completa documentada.', 'Mide las escrituras de PatioApp con y sin fsync y decide en qué operaciones forzar la escritura al disco.']
});
})();
