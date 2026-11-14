(function () {
var S = SDC.S;

S('arq', 'arq.perf', { title: 'Medir y comparar el rendimiento del hardware',
  ask: '¿Qué concepto de evaluación de rendimiento se aplica?',
  lesson: `
> **La idea en simple.** "Este procesador es más rápido" es una frase engañosa: ¿más rápido haciendo qué? Un auto deportivo gana una carrera, pero un camión mueve más carga por día. Con las computadoras pasa igual: hay que decidir qué se mide, cómo se mide y cómo se resume, o se termina comprando el hardware equivocado. Esta unidad da las herramientas para medir y comparar sin engañarse.

## Latencia y rendimiento
Dos medidas distintas que se confunden a menudo:
- **Tiempo de respuesta** o **latencia:** cuánto tarda una tarea, desde que empieza hasta que termina. Es lo que percibe un usuario.
- **Rendimiento** (*throughput*): cuántas tareas se completan por unidad de tiempo. Es lo que le importa a un servidor que atiende a miles.
Mejorar una no siempre mejora la otra: agregar núcleos aumenta el rendimiento de un servidor, pero no hace más rápida una consulta individual; un pipeline más profundo aumenta las instrucciones por segundo, pero no acelera una instrucción concreta.

## La ecuación del rendimiento del procesador
Para un programa en un procesador, el tiempo de CPU es:
**Tiempo = Instrucciones × CPI × Tiempo de ciclo** (o, lo que es lo mismo, Instrucciones × CPI / Frecuencia)
donde CPI son los ciclos por instrucción promedio. Cada factor depende de cosas distintas:
| Factor | Lo afectan |
| Número de instrucciones | el algoritmo, el lenguaje, el compilador y la ISA |
| CPI | la microarquitectura, el compilador y la mezcla de instrucciones del programa |
| Tiempo de ciclo | la tecnología de fabricación y el diseño (camino crítico) |
Mejorar un factor a costa de empeorar otro puede no ayudar: un compilador que reduce las instrucciones usando otras más lentas puede subir el CPI y no ganar nada.

## Métricas engañosas
- **Frecuencia de reloj:** durante años se vendieron procesadores por sus GHz. A mediados de los 2000, el Pentium 4 tenía frecuencias mucho más altas que el Athlon 64 de AMD, pero rendía igual o peor en muchas tareas, porque su pipeline muy profundo tenía un CPI alto. AMD llegó a nombrar sus modelos con números de "rendimiento equivalente" para contrarrestar el "mito del megahercio".
- **MIPS** (millones de instrucciones por segundo): no sirve para comparar ISA distintas (una instrucción CISC puede hacer el trabajo de varias RISC), y un programa puede tener más MIPS y tardar más (si ejecuta muchas instrucciones simples). Se le dice, en broma, "indicador sin sentido del rendimiento del procesador".
- **FLOPS pico:** las operaciones de punto flotante por segundo que un chip podría hacer en teoría; casi ningún programa real se acerca, porque lo limita la memoria (lo verás en el modelo roofline).
La única medida confiable es el **tiempo de ejecución de los programas que te importan**.

## Benchmarks
Un **benchmark** es un programa o conjunto de programas estándar para comparar sistemas:
- **SPEC CPU** (Standard Performance Evaluation Corporation, desde 1989; la versión actual es SPEC CPU 2017): programas reales de compilación, compresión, simulación y otros, en versiones de enteros y de punto flotante.
- **TPC** (Transaction Processing Performance Council): benchmarks de bases de datos transaccionales (TPC-C) y analíticas (TPC-H, TPC-DS).
- **MLPerf** (MLCommons, desde 2018): entrenamiento e inferencia de modelos de aprendizaje automático.
- **Geekbench**, **Cinebench** y otros, populares para equipos de consumo.
Peligros: los fabricantes **optimizan para el benchmark** (y ha habido casos de compiladores y teléfonos que detectaban el benchmark para comportarse distinto: en 2013 se descubrió que varios teléfonos subían la frecuencia de su procesador solo al detectar aplicaciones de benchmark conocidas). Un benchmark que no se parece a tu carga de trabajo no predice tu rendimiento.

## Resumir varias mediciones
Si un sistema es 2 veces más rápido en un programa y 0,5 veces en otro, ¿es mejor o peor? Depende de cómo se resuma:
- La **media aritmética de los tiempos** tiene sentido si los programas representan proporciones reales de la carga.
- Para **cocientes** de rendimiento normalizados respecto de una máquina de referencia, se usa la **media geométrica**: es la que usa SPEC. Su propiedad clave es que el orden de los sistemas no depende de qué máquina se elija como referencia (con la media aritmética de cocientes, sí). Philip Fleming y John Wallace lo mostraron en 1986 en *How Not to Lie with Statistics*.
- Siempre conviene reportar también la **variabilidad**: repetir las mediciones, mostrar la dispersión e informar las condiciones (versión del compilador, opciones, temperatura, otros procesos).
~~~js
// Dos máquinas, tres programas: tiempos en segundos. Referencia: máquina R.
const R = [10, 100, 20], A = [5, 120, 10], B = [8, 60, 30];
const cocientes = (X) => X.map((t, i) => R[i] / t);                       // cuántas veces más rápida que R
const geo = v => Math.pow(v.reduce((a, b) => a * b, 1), 1 / v.length);
const ari = v => v.reduce((a, b) => a + b, 0) / v.length;
console.log('A: geométrica', geo(cocientes(A)).toFixed(2), '· aritmética', ari(cocientes(A)).toFixed(2));
console.log('B: geométrica', geo(cocientes(B)).toFixed(2), '· aritmética', ari(cocientes(B)).toFixed(2));
console.log('tiempo total A:', A.reduce((a, b) => a + b), 's · B:', B.reduce((a, b) => a + b), 's');
~~~

## Amdahl y Gustafson
La **ley de Amdahl** (Gene Amdahl, 1967), que viste en la unidad de paralelismo, dice que si una fracción f del programa se acelera s veces, la aceleración total es 1 / ((1 − f) + f/s): la parte no mejorada limita el beneficio. Con un 95 % paralelo, ni infinitos núcleos dan más de 20 veces. John Gustafson observó en 1988 que, en la práctica, cuando se tienen más procesadores se resuelven **problemas más grandes** en el mismo tiempo (más resolución en una simulación, más datos en un análisis), y la parte paralela crece con el problema: la **ley de Gustafson** da una aceleración escalada de (1 − f) + f·N, casi lineal. Ambas son correctas; responden preguntas distintas: Amdahl, "¿cuánto más rápido resuelvo **este** problema?"; Gustafson, "¿cuánto **más grande** puedo resolver en el mismo tiempo?".

## El modelo roofline
Samuel Williams, Andrew Waterman y David Patterson propusieron en 2009 el **modelo roofline** para entender qué limita el rendimiento de un programa en un procesador. Se define la **intensidad aritmética** como las operaciones realizadas por byte traído de memoria. El rendimiento alcanzable es el **mínimo** entre el pico de cómputo del procesador y el ancho de banda de memoria por la intensidad aritmética. Gráficamente es un "techo" con una rampa (limitado por la memoria) y una parte plana (limitado por el cómputo). Un programa con baja intensidad (sumar dos vectores: una suma por cada 12 bytes) está limitado por la memoria y no mejora con un procesador más potente; uno con alta intensidad (multiplicar matrices grandes, que reutiliza cada dato muchas veces) puede acercarse al pico. Saber de qué lado del techo está un programa indica qué optimizar.

## Energía
Hoy el rendimiento por **vatio** importa tanto como el rendimiento: en teléfonos por la batería, en centros de datos por la factura eléctrica y el enfriamiento. La potencia dinámica de un circuito CMOS es aproximadamente **P = C · V² · f** (capacitancia, voltaje al cuadrado y frecuencia): bajar un poco el voltaje reduce mucho el consumo, y por eso los procesadores ajustan voltaje y frecuencia dinámicamente según la carga (DVFS). Los procesadores de teléfonos combinan núcleos grandes y rápidos con núcleos pequeños y eficientes (la arquitectura big.LITTLE de ARM, 2011), y el sistema operativo asigna cada tarea al tipo adecuado. Los centros de datos se evalúan con el **PUE** (*power usage effectiveness*): la energía total de la instalación dividida entre la que consumen los equipos de cómputo; los grandes proveedores reportan valores cercanos a 1,1.

## Ejemplo resuelto: ¿qué servidor comprar para PatioApp?
Dos opciones de servidor para la base de datos: A, con procesador de 3,8 GHz y 16 núcleos; B, con 2,9 GHz y 32 núcleos, mismo precio.
1. **No decidir por GHz ni por núcleos:** se mide con la carga real. Se reproduce una hora de tráfico de hora punta grabado (consultas reales, anonimizadas) contra cada servidor.
2. **Resultados:** las consultas individuales tardan un 20 % menos en A (mayor frecuencia, mejor latencia), pero B atiende un 55 % más de consultas por segundo antes de saturarse (más núcleos, mejor rendimiento).
3. **Requisito que decide:** el SLO es p95 menor a 50 ms con la carga de hora punta. Ambos lo cumplen hoy; con la carga proyectada para el próximo año (el doble), A se satura y su p95 sube a 300 ms, mientras que B lo cumple.
4. **Decisión:** B. Si el requisito hubiera sido minimizar la latencia de consultas pesadas individuales (por ejemplo, reportes), A habría sido mejor.
5. **Registro:** se documentan la carga usada, las versiones y las condiciones, para poder repetir la comparación cuando haya nuevas opciones.`,
  links: [['arq.pipe', 'la ley de Amdahl se presentó con el paralelismo'], ['m14.perf', 'las pruebas de carga miden el rendimiento del sistema completo'], ['m1.cpu', 'la ecuación del rendimiento parte del ciclo de instrucción']],
  read: 'Hennessy y Patterson, *Computer Architecture: A Quantitative Approach* (6.ª ed.), capítulo 1; Jain, *The Art of Computer Systems Performance Analysis* (1991); Williams, Waterman y Patterson (2009); Fleming y Wallace (1986).',
  terms: [
    ['Latencia', 'tiempo que tarda una tarea individual desde que empieza hasta que termina', ['Lo percibe el usuario.', 'Mayor frecuencia ayuda.', 'Se mide con percentiles.']],
    ['Rendimiento (throughput)', 'cantidad de tareas completadas por unidad de tiempo', ['Lo importa a un servidor.', 'Más núcleos ayudan.', 'Consultas por segundo.']],
    ['CPI', 'ciclos de reloj promedio por instrucción', ['Depende de la microarquitectura.', 'Factor de la ecuación del rendimiento.', 'Pipeline ideal: 1.']],
    ['Benchmark', 'programa estándar usado para comparar el rendimiento de sistemas', ['SPEC CPU.', 'TPC-C.', 'MLPerf.']],
    ['Media geométrica', 'resumen de cocientes de rendimiento que no depende de la máquina de referencia', ['La usa SPEC.', 'Fleming y Wallace, 1986.', 'Raíz n-ésima del producto.']],
    ['Ley de Gustafson', 'aceleración escalada al crecer el problema con el número de procesadores', ['Gustafson, 1988.', '(1 − f) + f·N.', 'Complementa a Amdahl.']],
    ['Modelo roofline', 'modelo que acota el rendimiento por el pico de cómputo y el ancho de banda de memoria según la intensidad aritmética', ['Williams, Waterman y Patterson, 2009.', 'Rampa y techo.', 'Indica qué optimizar.']],
    ['PUE', 'cociente entre la energía total de un centro de datos y la que consumen los equipos de cómputo', ['Cerca de 1,1 en los grandes proveedores.', 'Mide eficiencia de la instalación.', 'Power usage effectiveness.']]
  ],
  q: [
    ['¿Qué mejora agregar núcleos a un servidor de base de datos?', 'El rendimiento (consultas por segundo), no necesariamente la latencia de una consulta', ['La latencia de cada consulta siempre', 'La frecuencia del reloj', 'Nada'], 'Latencia y rendimiento son distintos.', 2],
    ['Un programa ejecuta 10⁹ instrucciones con CPI 2 en un procesador de 2 GHz. ¿Cuánto tarda?', '1 segundo', ['2 segundos', '0,5 segundos', '4 segundos'], '10⁹ × 2 / (2 × 10⁹).', 3],
    ['¿Por qué los MIPS son una mala métrica para comparar procesadores con ISA distintas?', 'Porque una instrucción no hace el mismo trabajo en ISA distintas', ['Porque son difíciles de calcular', 'Porque solo miden memoria', 'Son una métrica excelente'], 'Indicador sin sentido del rendimiento.', 2],
    ['¿Por qué SPEC usa la media geométrica de los cocientes?', 'Porque el orden de los sistemas no depende de la máquina de referencia elegida', ['Porque es más grande', 'Porque es más fácil', 'Por tradición'], 'Fleming y Wallace, 1986.', 4],
    ['Según Amdahl, con un 90 % paralelizable, ¿cuál es la aceleración máxima con infinitos núcleos?', '10', ['90', 'infinita', '9'], '1 / (1 − 0,9).', 3],
    ['Un programa suma dos vectores grandes y no mejora con un procesador más potente. ¿Qué indica el modelo roofline?', 'Que está limitado por el ancho de banda de memoria', ['Que está limitado por el cómputo', 'Que el procesador está roto', 'Nada'], 'Baja intensidad aritmética.', 4],
    ['¿Qué efecto tiene bajar el voltaje en la potencia dinámica?', 'La reduce mucho, porque depende del cuadrado del voltaje', ['La aumenta', 'No la cambia', 'La reduce linealmente'], 'P ≈ C·V²·f.', 3],
    { tf: 'La frecuencia de reloj por sí sola determina qué procesador es más rápido.', v: false, e: 'También importan el CPI y el número de instrucciones; el mito del megahercio.', l: 1 },
    { tf: 'La ley de Gustafson considera que con más procesadores se resuelven problemas más grandes.', v: true, e: 'Responde cuánto más grande se puede resolver en el mismo tiempo.', l: 2 },
    { c: 'Escribe «tiempoCPU(instrucciones, cpi, ghz)»: segundos de CPU.', f: 'tiempoCPU', p: ['instrucciones', 'cpi', 'ghz'], t: [[[1e9, 2, 2], 1], [[3e9, 1, 3], 1], [[5e8, 1.5, 1.5], 0.5]], sol: '  return instrucciones * cpi / (ghz * 1e9);', l: 1 },
    { c: 'Escribe «mediaGeometrica(v)»: media geométrica de una lista de números positivos, redondeada a 4 decimales.', f: 'mediaGeometrica', p: ['v'], t: [[[[2, 8]], 4], [[[1, 10, 100]], 10], [[[5]], 5]], sol: '  return Math.round(Math.pow(v.reduce((a, b) => a * b, 1), 1 / v.length) * 10000) / 10000;', l: 2 },
    { c: 'Escribe «roofline(pico, anchoBanda, intensidad)»: rendimiento alcanzable = mínimo entre pico y anchoBanda × intensidad.', f: 'roofline', p: ['pico', 'anchoBanda', 'intensidad'], t: [[[1000, 100, 0.25], 25], [[1000, 100, 50], 1000], [[1000, 100, 10], 1000]], sol: '  return Math.min(pico, anchoBanda * intensidad);', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var i = R.pick([1, 2, 4, 6]), c = R.pick([1, 1.5, 2, 3]), f = R.pick([1, 2, 3, 4]); g.input(3, 'Un programa ejecuta ' + i + ' × 10⁹ instrucciones con CPI ' + c + ' en un procesador de ' + f + ' GHz. ¿Cuántos segundos tarda? (2 decimales)', (i * c / f).toFixed(2), 'Instrucciones × CPI / frecuencia.'); });
    g.times(6, function (R) { var p = R.pick([0.5, 0.75, 0.9, 0.95, 0.99]); g.input(3, 'Si una fracción ' + p + ' del programa es paralelizable, ¿cuál es la aceleración máxima con infinitos núcleos? (2 decimales)', (1 / (1 - p)).toFixed(2), 'Amdahl: 1 / (1 − f).'); });
    var mt = [['Cuánto tarda una consulta individual', 'Latencia'], ['Cuántas consultas por segundo atiende el servidor', 'Rendimiento'], ['Ciclos promedio por instrucción', 'CPI'], ['Energía total del centro de datos sobre la de los equipos', 'PUE'], ['Operaciones por byte traído de memoria', 'Intensidad aritmética']];
    mt.forEach(function (m) { g.mcq(2, '¿Qué métrica es esta? ' + m[0], m[1], ['Latencia', 'Rendimiento', 'CPI', 'PUE', 'Intensidad aritmética'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Métricas de rendimiento.'); });
  },
  checks: [
    ['Diferencia latencia y rendimiento con un ejemplo de mejora que favorezca solo a una.', 'Agregar núcleos aumenta el rendimiento de un servidor sin acelerar una consulta individual.'],
    ['Escribe la ecuación del rendimiento del procesador y qué afecta a cada factor.', 'Tiempo = instrucciones × CPI × tiempo de ciclo; algoritmo y compilador, microarquitectura, y tecnología de fabricación.'],
    ['¿Por qué se usa la media geométrica para resumir cocientes de rendimiento?', 'Porque el orden de los sistemas no depende de la máquina de referencia.'],
    ['¿Qué indica el modelo roofline sobre un programa?', 'Si está limitado por el cómputo o por el ancho de banda de memoria según su intensidad aritmética, y por tanto qué optimizar.']
  ],
  cites: ['Hennessy, J. y Patterson, D. (2017). *Computer Architecture: A Quantitative Approach* (6.ª ed.). Morgan Kaufmann.', 'Fleming, P. y Wallace, J. (1986). How Not to Lie with Statistics: The Correct Way to Summarize Benchmark Results. *Communications of the ACM*, 29(3).', 'Gustafson, J. (1988). Reevaluating Amdahl’s Law. *Communications of the ACM*, 31(5).', 'Williams, S., Waterman, A. y Patterson, D. (2009). Roofline: An Insightful Visual Performance Model for Multicore Architectures. *Communications of the ACM*, 52(4).', 'Jain, R. (1991). *The Art of Computer Systems Performance Analysis*. Wiley.', 'Amdahl, G. (1967). Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities. *AFIPS Spring Joint Computer Conference*.'],
  project: { t: 'Comparar dos sistemas con rigor',
    goal: 'Diseñar y ejecutar una comparación de rendimiento confiable.',
    steps: ['Elige dos sistemas (dos computadoras, dos configuraciones o dos versiones de un programa) y una carga de trabajo representativa.', 'Mide latencia y rendimiento con repeticiones suficientes, registrando las condiciones.', 'Resume los resultados con la media adecuada y muestra la variabilidad.', 'Calcula la intensidad aritmética de dos funciones y ubícalas en un modelo roofline aproximado de tu máquina.', 'Escribe una recomendación justificada y explica qué métrica habría cambiado la decisión.'],
    deliver: 'El plan de medición, los datos, los gráficos y la recomendación.' },
  hito: ['Graba una hora de tráfico anonimizado de PatioApp y úsala como benchmark propio para comparar configuraciones de servidor.', 'Documenta en un ADR de PatioApp la elección del servidor de base de datos con las mediciones de latencia y rendimiento.']
});
SDC.after('arq.perf', 'arq.io');
})();
