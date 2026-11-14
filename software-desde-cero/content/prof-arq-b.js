(function () {
var S = SDC.S;

S('arq', 'arq.digital', { title: 'La ruta de datos y la unidad de control',
  ask: '¿Qué componente o concepto de la ruta de datos se aplica?',
  lesson: `
> **La idea en simple.** Un procesador es como una cocina muy organizada: hay estaciones (la memoria, los registros, la calculadora), caminos por donde se mueven los ingredientes entre estaciones, y un jefe de cocina que, al leer cada receta, decide qué estaciones se usan y por qué camino va cada cosa. En un procesador, los caminos y estaciones forman la **ruta de datos**, y el jefe es la **unidad de control**. Esta unidad muestra cómo se arma un procesador sencillo que ejecuta instrucciones reales.

## Los componentes
Una ruta de datos para un subconjunto de RISC-V necesita:
- **Contador de programa (PC):** un registro con la dirección de la instrucción actual.
- **Memoria de instrucciones:** dada una dirección, entrega la instrucción.
- **Banco de registros:** 32 registros de 64 bits; puede leer dos a la vez (rs1 y rs2) y escribir uno (rd) en cada ciclo. El registro x0 siempre vale 0.
- **ALU** (unidad aritmético-lógica): un circuito combinacional que suma, resta, hace AND, OR, compara y desplaza, según una señal de operación; además indica si el resultado es cero (para los saltos).
- **Generador de inmediatos:** extrae y extiende con signo las constantes codificadas dentro de la instrucción.
- **Memoria de datos:** para las instrucciones de carga y almacenamiento.
- **Multiplexores:** eligen entre varias fuentes de datos según una señal de control (por ejemplo, si el segundo operando de la ALU viene de un registro o de un inmediato).
- **Sumadores** para calcular PC + 4 (la siguiente instrucción) y PC + desplazamiento (el destino de un salto).

## El recorrido de cada tipo de instrucción
Patterson y Hennessy construyen el procesador agregando los caminos que necesita cada tipo de instrucción:
1. **Aritméticas entre registros** (add x5, x6, x7): se leen x6 y x7 del banco, la ALU los suma y el resultado se escribe en x5. El PC avanza a PC + 4.
2. **Aritméticas con inmediato** (addi x5, x6, 10): igual, pero el segundo operando sale del generador de inmediatos; un multiplexor elige entre registro e inmediato.
3. **Carga** (ld x5, 8(x6)): la ALU suma x6 + 8 para calcular la dirección, la memoria de datos lee esa dirección y otro multiplexor elige que lo que se escribe en x5 venga de la memoria y no de la ALU.
4. **Almacenamiento** (sd x5, 8(x6)): la ALU calcula la dirección y la memoria escribe el valor de x5; no se escribe ningún registro.
5. **Salto condicional** (beq x5, x6, etiqueta): la ALU resta x5 − x6; si el resultado es cero, el PC toma el valor PC + desplazamiento; si no, PC + 4. Un multiplexor en la entrada del PC elige.

## La unidad de control
La unidad de control lee el **código de operación** de la instrucción (y algunos campos de función) y genera las **señales de control** que configuran la ruta de datos en ese ciclo:
| Instrucción | Escribe registro | Fuente del operando B | Lee memoria | Escribe memoria | Dato al registro desde | Es salto |
| add | sí | registro | no | no | ALU | no |
| addi | sí | inmediato | no | no | ALU | no |
| ld | sí | inmediato | sí | no | memoria | no |
| sd | no | inmediato | no | sí | (no aplica) | no |
| beq | no | registro | no | no | (no aplica) | sí |
En un diseño **monociclo**, la unidad de control es un circuito combinacional: una tabla de verdad que traduce el código de operación en estas señales. Así, con unas pocas señales y multiplexores, el mismo hardware ejecuta todas las instrucciones.

## Monociclo, multiciclo y pipeline
- **Monociclo:** cada instrucción se completa en un ciclo de reloj. Es simple, pero el ciclo debe ser tan largo como la instrucción **más lenta** (la carga, que recorre la memoria de instrucciones, el banco, la ALU, la memoria de datos y vuelve al banco), así que las instrucciones rápidas desperdician tiempo.
- **Multiciclo:** cada instrucción se divide en pasos (captura, decodificación, ejecución, memoria, escritura), uno por ciclo, y cada instrucción usa solo los pasos que necesita. El reloj es más rápido, y la unidad de control pasa a ser una **máquina de estados**.
- **Pipeline:** los pasos de **distintas** instrucciones se solapan, como en una línea de montaje: mientras una instrucción se ejecuta, la siguiente se decodifica y la siguiente se captura. Es lo que viste en la unidad de paralelismo, con sus riesgos.
~~~js
// Comparar el tiempo de 1000 instrucciones (latencias de cada etapa en picosegundos)
const etapas = { captura: 200, decodificar: 100, ejecutar: 200, memoria: 200, escritura: 100 };
const mezcla = { carga: 0.25, almacena: 0.10, alu: 0.50, salto: 0.15 };
const usa = { carga: 5, almacena: 4, alu: 4, salto: 3 };            // pasos que necesita cada tipo
const n = 1000, maxEtapa = Math.max(...Object.values(etapas));
const monociclo = n * Object.values(etapas).reduce((a, b) => a + b, 0);
const multiciclo = n * maxEtapa * Object.entries(mezcla).reduce((s, [t, p]) => s + p * usa[t], 0);
const pipeline = (n + 4) * maxEtapa;                                  // ideal, sin riesgos
console.log({ monociclo, multiciclo: Math.round(multiciclo), pipeline });
~~~

## Control cableado y microprogramado
La unidad de control puede implementarse de dos formas:
- **Cableada:** circuitos lógicos que generan las señales directamente. Es rápida; es lo habitual en procesadores RISC.
- **Microprogramada:** idea de Maurice Wilkes (1951): las señales de control se guardan como **microinstrucciones** en una memoria interna (el **microcódigo**), y cada instrucción de máquina se ejecuta como una pequeña secuencia de ellas. Facilita implementar instrucciones complejas y corregir errores después de fabricar el chip. La familia IBM System/360 (1964) la usó para que modelos de muy distinto costo ejecutaran la misma ISA. Los procesadores x86 actuales traducen sus instrucciones complejas a micro-operaciones internas, y las **actualizaciones de microcódigo** se usaron para mitigar Spectre.

## Excepciones e interrupciones en la ruta de datos
Cuando una instrucción no se puede completar (código de operación inválido, división por cero, acceso a una página no presente) o cuando un dispositivo pide atención, el procesador debe detener el flujo normal: guarda el PC de la instrucción afectada en un registro especial (en RISC-V, **mepc**), registra la causa (**mcause**) y salta a la dirección del **manejador** del sistema operativo. Al terminar, una instrucción especial («mret») restaura el PC. Así se implementan las llamadas al sistema, los fallos de página de la memoria virtual y la atención de dispositivos, que verás en Sistemas operativos.

## Ejemplo resuelto: ejecutar ld x5, 8(x6) paso a paso
Supongamos x6 = 1000 y que en la dirección 1008 de la memoria de datos está el valor 60 (la tarifa de una estadía).
1. **Captura:** el PC vale 400; la memoria de instrucciones entrega la instrucción en 400 y un sumador calcula 404.
2. **Decodificación:** la unidad de control ve el código de operación de carga y genera: escribir registro = sí, fuente B = inmediato, leer memoria = sí, dato al registro = memoria. El banco lee x6 = 1000 y el generador de inmediatos produce 8.
3. **Ejecución:** la ALU suma 1000 + 8 = 1008.
4. **Memoria:** la memoria de datos lee la dirección 1008 y entrega 60.
5. **Escritura:** el multiplexor elige el dato de memoria y el banco escribe 60 en x5. El PC pasa a 404.
Si la dirección 1008 no estuviera mapeada en la memoria virtual del proceso, en el paso 4 se produciría una excepción y el sistema operativo decidiría qué hacer (cargar la página desde el disco o terminar el programa con un error de segmentación).

Este recorrido paso a paso, con valores concretos en cada cable, es la mejor forma de entender que un procesador no "sabe" programar: solo mueve bits por caminos que la unidad de control abre y cierra en cada ciclo.`,
  links: [['arq.isa', 'la ruta de datos implementa las instrucciones de la ISA'], ['m1.seq', 'registros, multiplexores y máquinas de estados son los bloques del procesador'], ['arq.pipe', 'el pipeline solapa los pasos de varias instrucciones']],
  read: 'Patterson y Hennessy, *Computer Organization and Design RISC-V Edition* (2.ª ed.), capítulo 4; Harris y Harris, *Digital Design and Computer Architecture: RISC-V Edition* (2021), capítulo 7.',
  terms: [
    ['Ruta de datos', 'conjunto de componentes y caminos por donde circulan y se transforman los datos en el procesador', ['Banco de registros, ALU, memorias.', 'Multiplexores.', 'Se configura con señales de control.']],
    ['Unidad de control', 'circuito que interpreta cada instrucción y genera las señales que configuran la ruta de datos', ['Lee el código de operación.', 'Cableada o microprogramada.', 'Máquina de estados en multiciclo.']],
    ['ALU', 'circuito combinacional que realiza operaciones aritméticas y lógicas según una señal de operación', ['Suma direcciones.', 'Compara para los saltos.', 'Indica si el resultado es cero.']],
    ['Banco de registros', 'conjunto de registros con puertos para leer dos y escribir uno por ciclo', ['32 registros en RISC-V.', 'x0 siempre es 0.', 'rs1, rs2 y rd.']],
    ['Multiplexor', 'circuito que elige una entre varias entradas según una señal de selección', ['Registro o inmediato.', 'ALU o memoria.', 'PC + 4 o destino del salto.']],
    ['Diseño monociclo', 'procesador que completa cada instrucción en un ciclo, cuya duración fija la instrucción más lenta', ['Simple.', 'Desperdicia tiempo.', 'Control combinacional.']],
    ['Microcódigo', 'secuencias de microinstrucciones internas que implementan las instrucciones de máquina', ['Wilkes, 1951.', 'IBM System/360.', 'Se actualiza para mitigar fallas.']],
    ['Excepción', 'evento que interrumpe el flujo normal y transfiere el control al sistema operativo', ['Fallo de página.', 'Instrucción inválida.', 'Se guarda el PC en mepc.']]
  ],
  q: [
    ['En la instrucción ld x5, 8(x6), ¿qué calcula la ALU?', 'La dirección de memoria x6 + 8', ['El valor de x5', 'El código de operación', 'El siguiente PC'], 'La memoria de datos lee en esa dirección.', 2],
    ['¿Qué instrucción no escribe en el banco de registros?', 'sd (almacenamiento)', ['add', 'ld', 'addi'], 'Escribe en la memoria de datos.', 2],
    ['¿Qué limita el ciclo de reloj de un procesador monociclo?', 'La instrucción más lenta, normalmente la carga', ['La instrucción más rápida', 'El tamaño del disco', 'La cantidad de registros'], 'Todas deben caber en un ciclo.', 3],
    ['¿Para qué sirve el multiplexor en la entrada del PC?', 'Para elegir entre PC + 4 y el destino de un salto', ['Para sumar registros', 'Para leer la memoria', 'Para decodificar'], 'Lo controla la condición del salto.', 2],
    ['¿Qué ventaja tiene el control microprogramado?', 'Facilita instrucciones complejas y permite corregir errores después de fabricar el chip', ['Es siempre más rápido', 'No necesita memoria', 'Elimina los registros'], 'Idea de Wilkes, 1951.', 3],
    ['¿Qué guarda el procesador al producirse una excepción en RISC-V?', 'El PC de la instrucción afectada (mepc) y la causa (mcause)', ['Todo el contenido de la memoria', 'Nada', 'Solo el valor de la ALU'], 'Luego salta al manejador.', 3],
    ['Con etapas de 200, 100, 200, 200 y 100 ps, ¿cuánto dura un ciclo en monociclo?', '800 ps', ['200 ps', '100 ps', '1000 ps'], 'La suma de todas las etapas.', 3],
    { tf: 'En el diseño multiciclo, la unidad de control es una máquina de estados.', v: true, e: 'Cada estado corresponde a un paso de la instrucción.', l: 3 },
    { tf: 'En RISC-V, el registro x0 puede guardar cualquier valor.', v: false, e: 'Siempre vale 0; escribirle no tiene efecto.', l: 1 },
    { c: 'Escribe «senales(op)»: devuelve un objeto {escribeReg, fuenteB, leeMem, escribeMem} para op "add", "addi", "ld" o "sd" (fuenteB es "registro" o "inmediato").', f: 'senales', p: ['op'], t: [[['add'], { escribeReg: true, fuenteB: 'registro', leeMem: false, escribeMem: false }], [['ld'], { escribeReg: true, fuenteB: 'inmediato', leeMem: true, escribeMem: false }], [['sd'], { escribeReg: false, fuenteB: 'inmediato', leeMem: false, escribeMem: true }]], sol: '  const t = { add: [true, "registro", false, false], addi: [true, "inmediato", false, false], ld: [true, "inmediato", true, false], sd: [false, "inmediato", false, true] }[op];\n  return { escribeReg: t[0], fuenteB: t[1], leeMem: t[2], escribeMem: t[3] };', l: 2 },
    { c: 'Escribe «ejecutarAdd(regs, rd, rs1, rs2)»: regs es un arreglo de registros; devuelve una copia con regs[rd] = regs[rs1] + regs[rs2], salvo que rd sea 0 (x0 no se modifica).', f: 'ejecutarAdd', p: ['regs', 'rd', 'rs1', 'rs2'], t: [[[[0, 5, 7, 0], 3, 1, 2], [0, 5, 7, 12]], [[[0, 5, 7], 0, 1, 2], [0, 5, 7]]], sol: '  const r = [...regs];\n  if (rd !== 0) r[rd] = regs[rs1] + regs[rs2];\n  return r;', l: 2 },
    { c: 'Escribe «siguientePC(pc, esSalto, iguales, desplazamiento)»: devuelve pc + desplazamiento si es un salto y los registros son iguales, o pc + 4 en otro caso.', f: 'siguientePC', p: ['pc', 'esSalto', 'iguales', 'desplazamiento'], t: [[[400, true, true, -16], 384], [[400, true, false, -16], 404], [[400, false, true, 100], 404]], sol: '  return esSalto && iguales ? pc + desplazamiento : pc + 4;', l: 1 }
  ],
  gen: function (g) {
    var co = [['Guarda la dirección de la instrucción actual', 'Contador de programa'], ['Suma, resta y compara', 'ALU'], ['Guarda 32 registros y lee dos por ciclo', 'Banco de registros'], ['Elige entre un registro y un inmediato', 'Multiplexor'], ['Extrae y extiende con signo la constante de la instrucción', 'Generador de inmediatos'], ['Genera las señales según el código de operación', 'Unidad de control']];
    co.forEach(function (c) { g.mcq(2, '¿Qué componente hace esto? ' + c[0], c[1], ['Contador de programa', 'ALU', 'Banco de registros', 'Multiplexor', 'Generador de inmediatos', 'Unidad de control'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Componentes de la ruta de datos.'); });
    var ds = [['add', 'ALU'], ['ld', 'Memoria'], ['addi', 'ALU']];
    ds.forEach(function (d) { g.mcq(3, 'En la instrucción ' + d[0] + ', ¿de dónde viene el dato que se escribe en el registro destino?', d[1], ['ALU', 'Memoria', 'Generador de inmediatos', 'Contador de programa'].filter(function (x) { return x !== d[1]; }), 'Multiplexor de escritura.'); });
    g.times(6, function (R) { var e = [R.pick([100, 200, 250]), R.pick([100, 150]), R.pick([150, 200, 300]), R.pick([200, 250, 300]), R.pick([100, 150])]; g.input(3, 'Las etapas tardan ' + e.join(', ') + ' ps. ¿Cuánto dura el ciclo de un procesador monociclo en ps?', e.reduce(function (a, b) { return a + b; }, 0), 'La suma de todas las etapas.'); });
  },
  checks: [
    ['Enumera los componentes de una ruta de datos sencilla y su función.', 'PC, memorias de instrucciones y datos, banco de registros, ALU, generador de inmediatos, multiplexores y sumadores.'],
    ['Describe el recorrido de una instrucción de carga por la ruta de datos.', 'Captura, lectura del registro base e inmediato, suma de la dirección en la ALU, lectura de memoria y escritura del dato en el registro destino.'],
    ['Compara monociclo, multiciclo y pipeline.', 'Monociclo: un ciclo largo por instrucción; multiciclo: varios ciclos cortos por instrucción; pipeline: solapa pasos de varias instrucciones.'],
    ['¿Qué hace el procesador ante una excepción?', 'Guarda el PC y la causa, salta al manejador del sistema operativo y luego puede volver con una instrucción especial.']
  ],
  cites: ['Patterson, D. y Hennessy, J. (2020). *Computer Organization and Design RISC-V Edition* (2.ª ed.). Morgan Kaufmann.', 'Harris, S. y Harris, D. (2021). *Digital Design and Computer Architecture: RISC-V Edition*. Morgan Kaufmann.', 'Wilkes, M. (1951). The Best Way to Design an Automatic Calculating Machine. *Manchester University Computer Inaugural Conference*.', 'Amdahl, G., Blaauw, G. y Brooks, F. (1964). Architecture of the IBM System/360. *IBM Journal of Research and Development*, 8(2).', 'Waterman, A. y Asanović, K. (eds.) (2019). *The RISC-V Instruction Set Manual, Volume I: Unprivileged ISA*.'],
  project: { t: 'Un procesador monociclo simulado',
    goal: 'Construir un simulador de la ruta de datos de un subconjunto de RISC-V.',
    steps: ['Define un subconjunto de instrucciones (add, addi, ld, sd, beq) y su codificación simplificada.', 'Implementa en JavaScript los componentes: PC, banco de registros, ALU, memorias y multiplexores.', 'Implementa la unidad de control como una tabla de señales y ejecuta programas paso a paso mostrando las señales de cada ciclo.', 'Escribe en tu ensamblador un programa que sume un arreglo y verifica el resultado.', 'Agrega excepciones para direcciones inválidas y una versión multiciclo que cuente ciclos.'],
    deliver: 'El simulador, los programas de prueba y la comparación de ciclos.' },
  hito: ['Escribe en el simulador de procesador un programa que calcule la tarifa de PatioApp y verifica el resultado contra la función de la API.', 'Agrega al simulador una excepción por dirección inválida y explica cómo la atendería el sistema operativo.']
});
SDC.after('arq.digital', 'arq.isa');

S('arq', 'arq.multi', { title: 'Multinúcleo, coherencia y paralelismo de datos',
  ask: '¿Qué concepto de procesamiento paralelo en hardware se aplica?',
  lesson: `
> **La idea en simple.** Hasta mediados de los 2000, cada nuevo procesador era más rápido porque su reloj era más rápido. Luego ese camino se agotó: los chips se calentaban demasiado. La industria cambió de estrategia: en lugar de un cocinero más rápido, varios cocineros en la misma cocina. Eso trajo un problema nuevo: cuando varios núcleos comparten la memoria, ¿cómo se aseguran de ver los mismos datos? Esta unidad explica cómo funciona el hardware paralelo y qué significa para quien programa.

## El fin del escalado de frecuencia
Robert Dennard observó en 1974 que, al reducir el tamaño de los transistores, su consumo de energía por área se mantenía constante (el **escalado de Dennard**), lo que permitía subir la frecuencia sin calentar más el chip. Hacia 2005 ese escalado se rompió: las corrientes de fuga hicieron que el consumo y el calor crecieran demasiado, y las frecuencias se estancaron alrededor de 3 a 5 GHz (el **muro de la potencia**). La ley de Moore siguió dando más transistores, pero ya no se podían usar para un solo núcleo más rápido. La respuesta fue poner **varios núcleos** en un mismo chip. Herb Sutter lo anunció en 2005 con un artículo titulado *The Free Lunch Is Over*: los programas ya no se acelerarían solos con cada generación de hardware; habría que escribirlos para aprovechar el paralelismo.

## Taxonomía de Flynn
Michael Flynn clasificó en 1966 las arquitecturas según cuántos flujos de instrucciones y de datos procesan:
| Clase | Significa | Ejemplo |
| SISD | una instrucción, un dato | un núcleo clásico |
| SIMD | una instrucción, múltiples datos | instrucciones vectoriales (AVX, NEON), GPU |
| MISD | múltiples instrucciones, un dato | raro; sistemas redundantes de aviónica |
| MIMD | múltiples instrucciones, múltiples datos | procesadores multinúcleo, clústeres |
Un procesador moderno combina varias: es MIMD (varios núcleos), cada núcleo tiene unidades SIMD y además ejecuta varias instrucciones a la vez (superescalar).

## Memoria compartida y coherencia de caché
En un multinúcleo, cada núcleo tiene sus propias cachés L1 y L2, y comparten la L3 y la memoria principal. Si el núcleo 1 tiene en su caché una copia del saldo de una estadía y el núcleo 2 la modifica en la suya, el núcleo 1 podría seguir viendo el valor viejo. Los **protocolos de coherencia** de caché garantizan que todos vean una versión consistente de cada dirección. El más conocido es **MESI** (Mark Papamarcos y Janak Patel, 1984), donde cada línea de caché está en uno de cuatro estados:
- **Modificada (M):** solo esta caché la tiene, y es distinta de la memoria.
- **Exclusiva (E):** solo esta caché la tiene, igual a la memoria.
- **Compartida (S):** varias cachés la tienen, todas iguales a la memoria.
- **Inválida (I):** la copia no sirve.
Cuando un núcleo quiere escribir una línea compartida, primero **invalida** las copias de los demás (por un bus que todos espían, *snooping*, o con un **directorio** que registra quién tiene cada línea en sistemas grandes). Esto funciona automáticamente, pero tiene un costo: las líneas que varios núcleos escriben con frecuencia "rebotan" entre cachés.

## Compartición falsa
La coherencia trabaja con líneas completas (normalmente 64 bytes), no con variables. Si dos núcleos escriben variables **distintas** que caen en la **misma línea** (por ejemplo, dos contadores en posiciones contiguas de un arreglo), la línea rebota entre ellos en cada escritura aunque no compartan datos: es la **compartición falsa** (*false sharing*). Puede hacer que un programa paralelo sea más lento que el secuencial. Se soluciona separando las variables con relleno hasta ocupar líneas distintas, o haciendo que cada hilo acumule en una variable local y combine al final.

## Modelos de consistencia de memoria
La coherencia garantiza que todos ven el mismo orden de escrituras **para una dirección**. Pero ¿en qué orden ven los núcleos las escrituras a **direcciones distintas**? Esa es la pregunta del **modelo de consistencia de memoria**:
- **Consistencia secuencial** (Lamport, 1979, que viste en Sistemas Distribuidos): todo ocurre como si las operaciones de todos los núcleos se intercalaran en algún orden que respeta el orden de cada uno. Es intuitiva, pero ningún procesador moderno la ofrece por defecto, porque impide optimizaciones importantes.
- **x86 (TSO, *total store order*):** un núcleo puede ver sus propias escrituras antes que los demás, porque las escrituras esperan en un **búfer de escritura**; una lectura posterior puede adelantarse a una escritura anterior a otra dirección.
- **ARM y RISC-V (modelos débiles):** permiten muchos más reordenamientos.
Por eso, en programación concurrente, hay que usar las primitivas de sincronización del lenguaje (cerrojos, variables atómicas, «volatile» de Java, el modelo de memoria de C++11) que insertan **barreras de memoria** (*fences*): instrucciones que obligan a completar las operaciones anteriores antes de seguir. Un código concurrente que "funciona" en x86 sin sincronización correcta puede fallar al moverlo a un servidor ARM.
~~~js
// Prueba clásica de reordenamiento: con consistencia secuencial, r1 y r2 no pueden ser ambos 0
// Hilo 1: x = 1; r1 = y        Hilo 2: y = 1; r2 = x
function intercalaciones() {
  const ops = [['h1', 'x=1'], ['h1', 'r1=y'], ['h2', 'y=1'], ['h2', 'r2=x']], res = new Set();
  const rec = (i, j, mem, regs) => {
    if (i === 2 && j === 2) { res.add('r1=' + regs.r1 + ',r2=' + regs.r2); return; }
    const paso = (op) => { const m = { ...mem }, r = { ...regs }; const [a, b] = op.split('='); if (b === '1') m[a] = 1; else r[a] = m[b]; return [m, r]; };
    if (i < 2) { const [m, r] = paso(ops[i][1]); rec(i + 1, j, m, r); }
    if (j < 2) { const [m, r] = paso(ops[2 + j][1]); rec(i, j + 1, m, r); }
  };
  rec(0, 0, { x: 0, y: 0 }, {});
  return [...res];
}
console.log('posibles con consistencia secuencial:', intercalaciones());   // nunca r1=0,r2=0; en x86 real sí puede ocurrir
~~~

## SIMD: una instrucción, muchos datos
Las **instrucciones vectoriales** operan sobre varios datos a la vez: una sola instrucción AVX-512 suma 16 números de 32 bits. Se aprovechan cuando el mismo cálculo se aplica a muchos elementos independientes: procesamiento de imágenes y audio, álgebra lineal, compresión, búsquedas en texto. Los compiladores **vectorizan automáticamente** los bucles simples; las bibliotecas numéricas (BLAS, NumPy) y los motores de bases de datos analíticas usan SIMD explícitamente. La organización de los datos importa: un **arreglo de estructuras** (cada estadía con sus campos juntos) es cómodo, pero una **estructura de arreglos** (un arreglo con todas las tarifas, otro con todos los días) permite cargar 16 tarifas consecutivas en un registro vectorial.

## GPU
Una **GPU** lleva la idea SIMD al extremo: miles de núcleos simples que ejecutan el mismo programa sobre datos distintos, organizados en grupos que avanzan juntos (*warps* de 32 hilos en NVIDIA). Diseñadas para gráficos, desde que NVIDIA lanzó **CUDA** en 2007 se usan para cómputo general: simulaciones científicas, criptografía y, sobre todo, el **aprendizaje profundo**, cuyo entrenamiento es casi enteramente multiplicación de matrices. En 2012, la red AlexNet (Alex Krizhevsky, Ilya Sutskever y Geoffrey Hinton) ganó el concurso ImageNet entrenada en dos GPU de consumo, y marcó el inicio de la era actual de la IA. Las GPU brillan con paralelismo masivo y regular; rinden mal con mucha lógica condicional (si los hilos de un grupo toman caminos distintos, se ejecutan por turnos: **divergencia**) o con transferencias frecuentes entre la memoria de la CPU y la de la GPU. Lo verás a fondo en Plataformas.

## Ejemplo resuelto: el contador de visitas por sede
PatioApp cuenta, en un servidor de 8 núcleos, las consultas recibidas por cada una de sus 8 sedes, con un hilo por sede.
1. **Primera versión:** un arreglo «contadores[8]» de enteros de 8 bytes, y cada hilo incrementa su posición. Los 8 contadores caben en **una sola línea** de caché de 64 bytes: compartición falsa. Con 8 hilos, el programa es más lento que con 1.
2. **Corrección:** cada contador se rellena hasta ocupar 64 bytes (o cada hilo acumula en una variable local y escribe al final). El tiempo baja casi 8 veces.
3. **Si los hilos compartieran un único contador total**, haría falta un incremento **atómico** (una instrucción como «lock xadd» en x86 o «amoadd» en RISC-V) para no perder actualizaciones; aun así, todos competirían por la misma línea. Por eso los contadores de alto rendimiento suelen ser **por núcleo** y se suman al leer.`,
  links: [['arq.mem', 'la coherencia trabaja sobre las líneas de la jerarquía de caché'], ['m8.conc', 'las condiciones de carrera y los cerrojos se ven en concurrencia'], ['plat.parallel', 'la programación de GPU se estudia en Plataformas']],
  read: 'Hennessy y Patterson, *Computer Architecture: A Quantitative Approach* (6.ª ed., 2017), capítulos 4 y 5; Sorin, Hill y Wood, *A Primer on Memory Consistency and Cache Coherence* (2.ª ed., 2020, libre en línea); Sutter (2005).',
  terms: [
    ['Muro de la potencia', 'límite al aumento de frecuencia por el consumo y el calor, que llevó a los multinúcleo', ['Fin del escalado de Dennard.', 'Hacia 2005.', 'The Free Lunch Is Over.']],
    ['Taxonomía de Flynn', 'clasificación de arquitecturas por flujos de instrucciones y de datos', ['SISD, SIMD, MISD, MIMD.', 'Flynn, 1966.', 'Los multinúcleo son MIMD.']],
    ['Coherencia de caché', 'garantía de que todos los núcleos ven una versión consistente de cada dirección', ['Protocolo MESI.', 'Invalidación.', 'Snooping o directorio.']],
    ['MESI', 'protocolo de coherencia con estados modificada, exclusiva, compartida e inválida', ['Papamarcos y Patel, 1984.', 'Invalidar antes de escribir.', 'Base de los protocolos actuales.']],
    ['Compartición falsa', 'pérdida de rendimiento cuando núcleos escriben variables distintas en la misma línea de caché', ['Contadores contiguos.', 'Se corrige con relleno.', 'False sharing.']],
    ['Modelo de consistencia de memoria', 'reglas sobre el orden en que los núcleos ven las escrituras a distintas direcciones', ['TSO en x86.', 'Débil en ARM.', 'Requiere barreras.']],
    ['Barrera de memoria', 'instrucción que obliga a completar las operaciones de memoria anteriores antes de seguir', ['Fence.', 'La insertan los cerrojos y atómicos.', 'Evita reordenamientos.']],
    ['SIMD', 'ejecución de una instrucción sobre múltiples datos a la vez', ['AVX-512.', 'Vectorización.', 'GPU.']]
  ],
  q: [
    ['¿Por qué los fabricantes pasaron a procesadores multinúcleo hacia 2005?', 'Porque subir la frecuencia hacía que el consumo y el calor crecieran demasiado', ['Porque se acabó la ley de Moore', 'Porque los programas eran paralelos', 'Por moda'], 'Fin del escalado de Dennard.', 2],
    ['¿Qué clase de Flynn es un procesador multinúcleo?', 'MIMD', ['SISD', 'MISD', 'SIMD únicamente'], 'Múltiples instrucciones, múltiples datos.', 2],
    ['En MESI, ¿qué hace un núcleo antes de escribir una línea compartida?', 'Invalida las copias de los demás núcleos', ['Espera a que todos la escriban', 'La borra de la memoria', 'Nada'], 'Pasa a estado Modificada.', 3],
    ['Dos hilos incrementan contadores distintos en posiciones contiguas de un arreglo y el programa es lento. ¿Por qué?', 'Por compartición falsa: los contadores comparten línea de caché', ['Por un interbloqueo', 'Porque los enteros son lentos', 'Por la recolección de basura'], 'Se corrige con relleno.', 3],
    ['¿Por qué un código concurrente sin sincronización que funciona en x86 puede fallar en ARM?', 'Porque ARM tiene un modelo de memoria más débil que permite más reordenamientos', ['Porque ARM no tiene caché', 'Porque ARM es de 16 bits', 'No puede fallar'], 'Hay que usar barreras y atómicos.', 4],
    ['¿Qué organización de datos favorece el uso de SIMD?', 'Estructura de arreglos: un arreglo por campo', ['Arreglo de estructuras siempre', 'Listas enlazadas', 'Árboles'], 'Permite cargar valores consecutivos de un mismo campo.', 3],
    ['¿Qué hecho de 2012 marcó el inicio de la era actual de la IA con GPU?', 'AlexNet ganó ImageNet entrenada en dos GPU de consumo', ['Se inventó CUDA', 'Se publicó la ley de Moore', 'Se lanzó RISC-V'], 'Krizhevsky, Sutskever y Hinton.', 2],
    { tf: 'La coherencia de caché garantiza que todos los núcleos ven las escrituras a direcciones distintas en el mismo orden.', v: false, e: 'Eso lo define el modelo de consistencia; la coherencia trata cada dirección por separado.', l: 4 },
    { tf: 'En una GPU, si los hilos de un grupo toman caminos distintos en un if, se ejecutan por turnos y se pierde rendimiento.', v: true, e: 'Es la divergencia.', l: 3 },
    { c: 'Escribe «mesiTrasEscritura(estados, nucleo)»: estados es un arreglo con el estado ("M", "E", "S" o "I") de una línea en cada núcleo; devuelve el nuevo arreglo después de que «nucleo» escribe la línea.', f: 'mesiTrasEscritura', p: ['estados', 'nucleo'], t: [[[['S', 'S', 'I'], 0], ['M', 'I', 'I']], [[['I', 'E'], 0], ['M', 'I']], [[['M', 'I'], 0], ['M', 'I']]], sol: '  return estados.map((_, i) => (i === nucleo ? "M" : "I"));', l: 2 },
    { c: 'Escribe «mismaLinea(dirA, dirB, tamLinea)»: true si dos direcciones de memoria caen en la misma línea de caché.', f: 'mismaLinea', p: ['dirA', 'dirB', 'tamLinea'], t: [[[0, 8, 64], true], [[56, 64, 64], false], [[128, 191, 64], true]], sol: '  return Math.floor(dirA / tamLinea) === Math.floor(dirB / tamLinea);', l: 1 },
    { c: 'Escribe «aEstructuraDeArreglos(estadias)»: convierte una lista de {tarifa, dias} en {tarifas: [...], dias: [...]}.', f: 'aEstructuraDeArreglos', p: ['estadias'], t: [[[[{ tarifa: 20, dias: 3 }, { tarifa: 45, dias: 1 }]], { tarifas: [20, 45], dias: [3, 1] }], [[[]], { tarifas: [], dias: [] }]], sol: '  return { tarifas: estadias.map(e => e.tarifa), dias: estadias.map(e => e.dias) };', l: 1 }
  ],
  gen: function (g) {
    var fl = [['Un núcleo clásico que procesa un dato por instrucción', 'SISD'], ['Una instrucción AVX que suma 16 números a la vez', 'SIMD'], ['Un procesador de 8 núcleos con programas distintos', 'MIMD'], ['Una GPU con miles de hilos ejecutando el mismo programa', 'SIMD']];
    fl.forEach(function (f) { g.mcq(2, '¿Qué clase de la taxonomía de Flynn es? ' + f[0], f[1], ['SISD', 'SIMD', 'MISD', 'MIMD'].filter(function (x) { return x !== f[1]; }), 'Taxonomía de Flynn.'); });
    var me = [['Solo esta caché tiene la línea y es distinta de la memoria', 'Modificada'], ['Solo esta caché tiene la línea, igual a la memoria', 'Exclusiva'], ['Varias cachés tienen la línea, igual a la memoria', 'Compartida'], ['La copia de esta caché no es válida', 'Inválida']];
    me.forEach(function (m) { g.mcq(2, '¿Qué estado de MESI es? ' + m[0], m[1], ['Modificada', 'Exclusiva', 'Compartida', 'Inválida'].filter(function (x) { return x !== m[1]; }), 'Protocolo MESI.'); });
    g.times(6, function (R) { var a = R.int(0, 300), b = a + R.int(1, 80); g.mcq(2, 'Con líneas de 64 bytes, ¿las direcciones ' + a + ' y ' + b + ' están en la misma línea de caché?', Math.floor(a / 64) === Math.floor(b / 64) ? 'Sí' : 'No', [Math.floor(a / 64) === Math.floor(b / 64) ? 'No' : 'Sí', 'Depende del núcleo', 'Solo en x86'], 'Se comparan las divisiones enteras entre 64.'); });
  },
  checks: [
    ['¿Por qué se acabó la "comida gratis" del rendimiento según Sutter?', 'Porque las frecuencias se estancaron por el calor, y los programas solo se aceleran si aprovechan varios núcleos.'],
    ['Explica el protocolo MESI y qué ocurre al escribir una línea compartida.', 'Cada línea está en M, E, S o I; antes de escribir una línea compartida se invalidan las otras copias y la propia pasa a M.'],
    ['¿Qué es la compartición falsa y cómo se evita?', 'Núcleos que escriben variables distintas en la misma línea de caché; se evita con relleno o acumulación local.'],
    ['Diferencia coherencia de caché y modelo de consistencia de memoria.', 'La coherencia ordena las escrituras de una misma dirección; el modelo de consistencia define el orden visible entre direcciones distintas.']
  ],
  cites: ['Flynn, M. (1966). Very High-Speed Computing Systems. *Proceedings of the IEEE*, 54(12).', 'Papamarcos, M. y Patel, J. (1984). A Low-Overhead Coherence Solution for Multiprocessors with Private Cache Memories. *ISCA 1984*.', 'Sutter, H. (2005). The Free Lunch Is Over: A Fundamental Turn Toward Concurrency in Software. *Dr. Dobb’s Journal*, 30(3).', 'Dennard, R. et al. (1974). Design of Ion-Implanted MOSFET’s with Very Small Physical Dimensions. *IEEE Journal of Solid-State Circuits*, 9(5).', 'Sorin, D., Hill, M. y Wood, D. (2020). *A Primer on Memory Consistency and Cache Coherence* (2.ª ed.). Morgan & Claypool.', 'Krizhevsky, A., Sutskever, I. y Hinton, G. (2012). ImageNet Classification with Deep Convolutional Neural Networks. *NeurIPS 2012*.'],
  project: { t: 'Medir el hardware paralelo',
    goal: 'Observar efectos de la arquitectura multinúcleo en programas reales.',
    steps: ['Escribe un programa con varios hilos (Worker threads en Node, hilos en Java o Python con procesos) que incremente contadores en un arreglo compartido y mide el tiempo con 1, 2, 4 y 8 hilos.', 'Introduce relleno entre contadores para evitar la compartición falsa y compara.', 'Ejecuta la prueba de reordenamiento clásica (dos hilos, dos variables) muchas veces en tu máquina y cuenta cuántas veces aparece r1 = r2 = 0.', 'Compara una suma de un arreglo grande con un bucle simple y con una versión que favorezca la vectorización (o con NumPy).', 'Escribe un informe que explique cada resultado con la teoría.'],
    deliver: 'El código, las mediciones y el informe.' },
  hito: ['Implementa en PatioApp los contadores de consultas por sede con un contador por núcleo y relleno, y mide la mejora frente al arreglo compacto.', 'Documenta en PatioApp por qué los contadores compartidos usan operaciones atómicas y no simples incrementos.']
});
SDC.after('arq.multi', 'arq.mem');
})();
