(function () {
var S = SDC.S;

S('mat2', 'mat2.prob', { title: 'Probabilidad avanzada: distribuciones, límites y cadenas de Markov',
  ask: '¿Qué distribución o resultado de probabilidad se aplica?',
  lesson: `
> **La idea en simple.** No sabemos cuándo llegará el próximo camión al patio, pero sí podemos saber que llegan en promedio 12 por hora y que rara vez llegan más de 20. No sabemos cuál petición será lenta, pero sí qué fracción lo será. La probabilidad avanzada da los modelos para razonar con precisión sobre lo incierto: cuántos servidores hacen falta, cuánto esperará un cliente en la cola, cuánto se tarda en llenar un disco.

## Variables aleatorias discretas y continuas
Una **variable aleatoria** asigna un número a cada resultado de un experimento. Si toma valores contables (el número de unidades que llegan en una hora) es **discreta** y se describe con una **función de probabilidad** P(X = k). Si toma valores en un intervalo continuo (el tiempo hasta la próxima llegada) es **continua** y se describe con una **función de densidad** f(x): la probabilidad de un valor exacto es cero, y la de un intervalo es el **área** bajo la densidad, P(a ≤ X ≤ b) = ∫ f(x) dx. Para ambas, la **función de distribución acumulada** F(x) = P(X ≤ x) va de 0 a 1.

Dos números resumen una variable: la **esperanza** E[X] (el valor promedio a largo plazo) y la **varianza** Var(X) = E[(X − E[X])²] (cuánto se aleja de ese promedio); su raíz es la **desviación estándar**. Propiedades útiles: E[aX + b] = aE[X] + b; Var(aX + b) = a²Var(X); y si X e Y son **independientes**, Var(X + Y) = Var(X) + Var(Y).

## Las distribuciones que reaparecen en sistemas
| Distribución | Modela | Media | Varianza |
| Bernoulli(p) | un intento con éxito o fracaso | p | p(1 − p) |
| Binomial(n, p) | número de éxitos en n intentos independientes | np | np(1 − p) |
| Geométrica(p) | número de intentos hasta el primer éxito | 1/p | (1 − p)/p² |
| Poisson(λ) | número de eventos raros en un intervalo (llegadas por hora) | λ | λ |
| Exponencial(λ) | tiempo entre eventos de un proceso de Poisson | 1/λ | 1/λ² |
| Uniforme(a, b) | un valor igualmente probable en un intervalo | (a + b)/2 | (b − a)²/12 |
| Normal(μ, σ²) | sumas de muchos efectos pequeños | μ | σ² |
Ejemplos en software:
- **Binomial:** si un disco falla con probabilidad 2 % al año, ¿cuántos de 500 discos fallarán? En promedio 10, con desviación √(500·0,02·0,98) ≈ 3,1.
- **Geométrica:** si cada intento de conexión tiene éxito con probabilidad 0,8, el número esperado de intentos es 1/0,8 = 1,25. Un reintento con éxito del 50 % necesita en promedio 2 intentos.
- **Poisson:** las llegadas independientes a un sistema (peticiones a un servidor, unidades a un patio, errores en un registro) se modelan muy bien con Poisson. P(X = k) = e^(−λ) λᵏ / k!. Siméon Denis Poisson la publicó en 1837, y Ladislaus Bortkiewicz la hizo famosa en 1898 mostrando que describía el número de soldados prusianos muertos por coces de caballo.
- **Exponencial:** si las llegadas son de Poisson con tasa λ, el tiempo entre llegadas es exponencial con media 1/λ. Tiene la propiedad de **falta de memoria**: si ya esperaste 10 minutos, el tiempo que falta tiene la misma distribución que al principio. Por eso se usa para modelar fallas de componentes electrónicos sin desgaste.

## Colas largas
No todo es normal. Muchas magnitudes de los sistemas informáticos siguen distribuciones de **cola pesada**, como la de **Pareto** o la **lognormal**: el tamaño de los archivos, la duración de los procesos, la popularidad de las páginas web, los tiempos de respuesta de los servicios. En ellas, los valores extremos son mucho más frecuentes de lo que predice la normal: unos pocos archivos ocupan la mayor parte del disco, unas pocas páginas reciben la mayor parte de las visitas (la **ley de Zipf**), unas pocas peticiones lentas dominan la experiencia. Mark Crovella y Azer Bestavros mostraron en 1997 que el tráfico web es **autosimilar** por la distribución de cola pesada de los tamaños de archivo. Consecuencia práctica: el promedio y la desviación estándar engañan, y hay que mirar percentiles.

## Las leyes de los grandes números y el teorema central del límite
- **Ley de los grandes números** (Jakob Bernoulli, 1713): el promedio de muchas observaciones independientes de una variable converge a su esperanza. Es lo que justifica estimar probabilidades con frecuencias y usar simulaciones de **Monte Carlo** (estimar un valor promediando muchos experimentos aleatorios).
- **Teorema central del límite:** la suma (o el promedio) de muchas variables independientes con varianza finita tiene una distribución aproximadamente **normal**, sea cual sea la distribución original. Por eso la normal aparece en todas partes, y por eso los intervalos de confianza de los promedios funcionan aunque los datos individuales no sean normales. Con variables de cola muy pesada (varianza infinita), el teorema no se aplica.
- **Desigualdades** que acotan sin conocer la distribución: la de **Markov** (P(X ≥ a) ≤ E[X]/a para X no negativa) y la de **Chebyshov** (P(|X − μ| ≥ kσ) ≤ 1/k²). Son flojas pero seguras: con solo saber la media y la varianza, garantizan que como máximo el 25 % de los valores está a más de 2 desviaciones de la media.

## Cadenas de Markov
Una **cadena de Markov** (Andréi Márkov, 1906) es un sistema que pasa de un estado a otro con probabilidades que dependen **solo del estado actual**, no de la historia (la propiedad de Markov). Se describe con una **matriz de transición** P, donde Pᵢⱼ es la probabilidad de pasar del estado i al j. La distribución tras n pasos es la inicial multiplicada n veces por P. Bajo condiciones generales (la cadena es irreducible y aperiódica), converge a una **distribución estacionaria** π con πP = π, independiente del punto de partida.
Aplicaciones:
- **PageRank:** un navegante aleatorio que sigue enlaces; la importancia de una página es la probabilidad estacionaria de estar en ella.
- **Modelos de fiabilidad:** estados "funcionando", "degradado", "caído" con probabilidades de transición para calcular la disponibilidad a largo plazo.
- **Texto predictivo:** las primeras versiones predecían la siguiente palabra a partir de la anterior con una cadena de Markov; Claude Shannon lo ilustró ya en 1948.
- **Algoritmos MCMC** (Monte Carlo con cadenas de Markov), como el de Metropolis (1953), para muestrear distribuciones complicadas en física, estadística bayesiana y aprendizaje automático.
~~~js
// Disponibilidad de un servicio modelado como cadena de Markov (paso = 1 hora)
const P = [[0.98, 0.015, 0.005],   // desde funcionando: sigue, se degrada, cae
           [0.30, 0.65, 0.05],     // desde degradado
           [0.60, 0.10, 0.30]];    // desde caído: se recupera, queda degradado, sigue caído
let pi = [1, 0, 0];
for (let h = 0; h < 1000; h++) pi = pi.map((_, j) => pi.reduce((s, p, i) => s + p * P[i][j], 0));
console.log('a largo plazo → funcionando:', (100 * pi[0]).toFixed(2) + '%',
            'degradado:', (100 * pi[1]).toFixed(2) + '%', 'caído:', (100 * pi[2]).toFixed(2) + '%');
~~~

## Procesos de Poisson y colas
Un **proceso de Poisson** con tasa λ modela llegadas independientes: el número de llegadas en un intervalo de duración t es Poisson(λt) y los tiempos entre llegadas son exponenciales. Es la base de la **teoría de colas**, iniciada por Agner Krarup Erlang en 1909 para dimensionar centrales telefónicas en Copenhague. En la notación de David Kendall (1953), una cola **M/M/1** tiene llegadas de Poisson (M de "markoviano"), tiempos de servicio exponenciales y un servidor. Con utilización ρ = λ/μ (tasa de llegada sobre tasa de servicio) menor que 1:
- Número medio en el sistema: L = ρ / (1 − ρ).
- Tiempo medio en el sistema: W = 1 / (μ − λ), coherente con la ley de Little (L = λW).
Esto explica la explosión de la latencia cerca del 100 % de utilización que viste en Pruebas, y la fórmula de **Erlang C** permite calcular cuántos servidores (o cajeros, o puertas de un patio) hacen falta para que la espera no supere un objetivo.

## Ejemplo resuelto: ¿cuántas puertas necesita el patio?
En hora punta llegan en promedio λ = 50 unidades por hora a un patio, y registrar cada ingreso toma en promedio 1 minuto (μ = 60 por hora por puerta).
1. **Con una puerta:** ρ = 50/60 ≈ 0,83. Tiempo medio en el sistema W = 1/(60 − 50) = 0,1 horas = 6 minutos, y en promedio L = 0,83/0,17 ≈ 5 unidades esperando o siendo atendidas. La cola llega a la calle en los picos.
2. **Probabilidad de picos:** el número de llegadas en una hora es Poisson(50); la probabilidad de 60 o más llegadas en una hora es de alrededor del 9 %: aproximadamente una de cada once horas punta supera la capacidad de la puerta.
3. **Con dos puertas** (y una sola fila), la utilización por puerta baja a 0,42, y la fórmula de Erlang C da un tiempo medio de espera en la fila de solo unos 13 segundos.
4. **Decisión:** dos puertas en hora punta, con la segunda abierta solo de 7:00 a 9:00. La probabilidad dio el dato que una intuición lineal ("si una puerta atiende 60 y llegan 50, alcanza") habría ocultado.`,
  links: [['m2.prob', 'la probabilidad básica y la combinatoria se vieron en Matemática para software'], ['m14.perf', 'la teoría de colas explica el comportamiento bajo carga'], ['mat2.stat', 'el teorema central del límite justifica los intervalos de confianza']],
  read: 'Blitzstein y Hwang, *Introduction to Probability* (2.ª ed., 2019); Harchol-Balter, *Performance Modeling and Design of Computer Systems* (2013); Ross, *Introduction to Probability Models* (12.ª ed., 2019).',
  terms: [
    ['Variable aleatoria', 'función que asigna un número a cada resultado de un experimento aleatorio', ['Llegadas por hora.', 'Tiempo hasta una falla.', 'Discreta o continua.']],
    ['Esperanza', 'valor promedio a largo plazo de una variable aleatoria', ['E[aX + b] = aE[X] + b.', 'Lineal aunque no haya independencia.', 'Media de la distribución.']],
    ['Distribución de Poisson', 'distribución del número de eventos raros e independientes en un intervalo', ['Llegadas de peticiones.', 'Media y varianza iguales a λ.', 'Poisson, 1837.']],
    ['Distribución exponencial', 'distribución del tiempo entre eventos de un proceso de Poisson', ['Media 1/λ.', 'Falta de memoria.', 'Fallas sin desgaste.']],
    ['Cola pesada', 'distribución en la que los valores extremos son mucho más frecuentes que en la normal', ['Tamaños de archivo.', 'Ley de Zipf.', 'Engaña al promedio.']],
    ['Teorema central del límite', 'la suma de muchas variables independientes con varianza finita es aproximadamente normal', ['Justifica los intervalos de confianza.', 'Explica por qué la normal es común.', 'No vale con varianza infinita.']],
    ['Cadena de Markov', 'proceso en que la probabilidad del siguiente estado depende solo del actual', ['Márkov, 1906.', 'Matriz de transición.', 'PageRank.']],
    ['Distribución estacionaria', 'distribución de estados que no cambia al aplicar la matriz de transición', ['πP = π.', 'Disponibilidad a largo plazo.', 'No depende del inicio.']]
  ],
  q: [
    ['Cada intento de conexión tiene éxito con probabilidad 0,5. ¿Cuántos intentos se esperan hasta el primer éxito?', '2', ['0,5', '1', '4'], 'Geométrica: 1/p.', 2],
    ['Llegan en promedio 12 peticiones por segundo de forma independiente. ¿Qué distribución modela cuántas llegan en un segundo?', 'Poisson con λ = 12', ['Normal con media 0', 'Uniforme entre 0 y 12', 'Geométrica con p = 12'], 'Eventos independientes en un intervalo.', 2],
    ['¿Qué significa la falta de memoria de la exponencial?', 'Que el tiempo restante no depende de cuánto ya se esperó', ['Que no tiene media', 'Que siempre vale cero', 'Que se olvida de su varianza'], 'P(X > s + t | X > s) = P(X > t).', 3],
    ['¿Por qué el promedio engaña con distribuciones de cola pesada?', 'Porque unos pocos valores extremos dominan y el promedio no describe al caso típico', ['Porque es siempre cero', 'Porque no se puede calcular', 'No engaña'], 'Se miran percentiles.', 3],
    ['500 discos fallan cada uno con probabilidad 0,02 al año. ¿Cuántos fallos se esperan?', '10', ['2', '50', '25'], 'Binomial: np.', 2],
    ['En una cola M/M/1 con λ = 50 y μ = 60 por hora, ¿cuál es el tiempo medio en el sistema?', '6 minutos', ['1 minuto', '50 minutos', '10 segundos'], 'W = 1/(μ − λ) = 0,1 h.', 4],
    ['Según Chebyshov, ¿qué fracción máxima de valores puede estar a más de 2 desviaciones estándar de la media?', '25 %', ['5 %', '50 %', '1 %'], '1/k² con k = 2.', 3],
    { tf: 'El teorema central del límite solo se aplica si los datos originales son normales.', v: false, e: 'Se aplica a sumas de variables con cualquier distribución de varianza finita.', l: 2 },
    { tf: 'En una cadena de Markov, la probabilidad del siguiente estado depende solo del estado actual.', v: true, e: 'Es la propiedad de Markov.', l: 1 },
    { c: 'Escribe «poisson(lambda, k)»: probabilidad de exactamente k eventos, e^(−λ) λ^k / k!, redondeada a 4 decimales.', f: 'poisson', p: ['lambda', 'k'], t: [[[2, 0], 0.1353], [[2, 2], 0.2707], [[1, 1], 0.3679]], sol: '  let f = 1;\n  for (let i = 2; i <= k; i++) f *= i;\n  return Math.round(Math.exp(-lambda) * Math.pow(lambda, k) / f * 10000) / 10000;', l: 2 },
    { c: 'Escribe «estacionaria(P, pasos)»: parte de la distribución [1, 0, …, 0] y aplica la matriz de transición P el número de pasos dado; devuelve la distribución con cada valor redondeado a 3 decimales.', f: 'estacionaria', p: ['P', 'pasos'], t: [[[[[0.5, 0.5], [0.5, 0.5]], 10], [0.5, 0.5]], [[[[0.9, 0.1], [0.5, 0.5]], 200], [0.833, 0.167]]], sol: '  let pi = P.map((_, i) => (i === 0 ? 1 : 0));\n  for (let s = 0; s < pasos; s++) pi = pi.map((_, j) => pi.reduce((acc, p, i) => acc + p * P[i][j], 0));\n  return pi.map(x => Math.round(x * 1000) / 1000);', l: 3 },
    { c: 'Escribe «mm1(lambda, mu)»: devuelve [L, W] de una cola M/M/1 (L = ρ/(1 − ρ), W = 1/(μ − λ)), redondeados a 2 decimales; si λ ≥ μ devuelve null.', f: 'mm1', p: ['lambda', 'mu'], t: [[[50, 60], [5, 0.1]], [[30, 60], [1, 0.03]], [[60, 60], null]], sol: '  if (lambda >= mu) return null;\n  const r = lambda / mu;\n  return [Math.round(r / (1 - r) * 100) / 100, Math.round(100 / (mu - lambda)) / 100];', l: 3 }
  ],
  gen: function (g) {
    var di = [['Número de discos que fallan entre 500 en un año', 'Binomial'], ['Intentos hasta conectarse por primera vez', 'Geométrica'], ['Peticiones que llegan en un segundo', 'Poisson'], ['Tiempo entre dos llegadas de un proceso de Poisson', 'Exponencial'], ['Suma de los tiempos de 1000 tareas independientes', 'Normal (aproximada)'], ['Tamaño de los archivos de un servidor', 'Cola pesada (Pareto o lognormal)']];
    di.forEach(function (d) { g.mcq(2, '¿Qué distribución modela mejor esto? ' + d[0], d[1], ['Binomial', 'Geométrica', 'Poisson', 'Exponencial', 'Normal (aproximada)', 'Cola pesada (Pareto o lognormal)'].filter(function (x) { return x !== d[1]; }).slice(0, 3), 'Distribuciones que reaparecen en sistemas.'); });
    g.times(6, function (R) { var p = R.pick([0.1, 0.2, 0.25, 0.5, 0.8]); g.input(2, 'Cada intento tiene éxito con probabilidad ' + p + '. ¿Cuántos intentos se esperan hasta el primer éxito?', String(Math.round(100 / p) / 100), 'Geométrica: 1/p.'); });
    g.times(6, function (R) { var mu = R.pick([20, 30, 60, 120]), l = Math.round(mu * R.pick([0.5, 0.75, 0.8, 0.9])); g.input(4, 'Cola M/M/1 con λ = ' + l + ' y μ = ' + mu + ' por hora. ¿Cuántas unidades hay en promedio en el sistema? (2 decimales)', (l / mu / (1 - l / mu)).toFixed(2), 'L = ρ/(1 − ρ) con ρ = λ/μ.'); });
  },
  checks: [
    ['¿Qué relación hay entre la distribución de Poisson y la exponencial?', 'Si el número de llegadas en un intervalo es Poisson(λ), el tiempo entre llegadas es exponencial con media 1/λ.'],
    ['Explica la ley de los grandes números y el teorema central del límite.', 'La primera dice que el promedio converge a la esperanza; el segundo, que la suma de muchas variables independientes es aproximadamente normal.'],
    ['¿Qué es una cadena de Markov y qué es su distribución estacionaria?', 'Un proceso donde el siguiente estado depende solo del actual; la estacionaria es la distribución que no cambia al aplicar la matriz de transición.'],
    ['¿Por qué la latencia de una cola crece tan rápido cerca del 100 % de utilización?', 'Porque en una M/M/1 el número medio en el sistema es ρ/(1 − ρ), que tiende a infinito cuando ρ tiende a 1.']
  ],
  cites: ['Blitzstein, J. y Hwang, J. (2019). *Introduction to Probability* (2.ª ed.). CRC Press.', 'Harchol-Balter, M. (2013). *Performance Modeling and Design of Computer Systems: Queueing Theory in Action*. Cambridge University Press.', 'Crovella, M. y Bestavros, A. (1997). Self-Similarity in World Wide Web Traffic: Evidence and Possible Causes. *IEEE/ACM Transactions on Networking*, 5(6).', 'Erlang, A. K. (1909). The Theory of Probabilities and Telephone Conversations. *Nyt Tidsskrift for Matematik B*, 20.', 'Ross, S. (2019). *Introduction to Probability Models* (12.ª ed.). Academic Press.'],
  project: { t: 'Modelar la capacidad de un servicio',
    goal: 'Usar distribuciones, cadenas de Markov y colas para dimensionar un servicio real.',
    steps: ['Recolecta los tiempos de llegada de un fenómeno (mensajes, clientes, peticiones de un servidor de prueba) y verifica si se parecen a un proceso de Poisson.', 'Estima λ y μ, y calcula L y W con el modelo M/M/1.', 'Simula la cola con Monte Carlo y compara con las fórmulas.', 'Modela la disponibilidad del servicio con una cadena de Markov de tres estados y calcula su distribución estacionaria.', 'Decide cuántos servidores hacen falta para un objetivo de espera y justifica.'],
    deliver: 'Los datos, el análisis, la simulación y la recomendación.' },
  hito: ['Modela las llegadas de unidades a PatioApp como proceso de Poisson y calcula con teoría de colas cuántas puertas hacen falta en hora punta.', 'Agrega a PatioApp un simulador Monte Carlo de la puerta que compare la espera con una y con dos puertas.']
});
SDC.after('mat2.prob', 'mat2.lin');

S('mat2', 'mat2.numer', { title: 'Métodos numéricos y aritmética de punto flotante',
  ask: '¿Qué concepto de cálculo numérico se aplica?',
  lesson: `
> **La idea en simple.** Una computadora no puede guardar el número π ni siquiera 0,1 de forma exacta: usa aproximaciones con una cantidad fija de dígitos. Casi siempre eso no importa, pero a veces los pequeños errores se acumulan o se amplifican y el resultado sale muy mal. Los métodos numéricos estudian cómo calcular con números aproximados de forma que el resultado siga siendo confiable.

## Por qué 0,1 + 0,2 no es 0,3
En JavaScript, Python y casi todos los lenguajes, «0.1 + 0.2 === 0.3» es **falso**: el resultado es 0,30000000000000004. La razón es que la computadora guarda los números en **binario**, y 0,1 en binario es periódico (0,000110011001100…), como 1/3 en decimal: no cabe exactamente en una cantidad finita de bits. Se guarda la aproximación más cercana, y al sumar dos aproximaciones se obtiene algo ligeramente distinto de la aproximación de 0,3.

## El estándar IEEE 754
Hasta los años ochenta, cada fabricante representaba los números reales a su manera, y el mismo programa daba resultados distintos en máquinas distintas. William Kahan, de la Universidad de California en Berkeley, lideró la creación del estándar **IEEE 754** (1985, revisado en 2008 y 2019), que hoy usan prácticamente todos los procesadores; recibió por ello el Premio Turing en 1989. Un número de **doble precisión** (64 bits) tiene:
- 1 bit de **signo**,
- 11 bits de **exponente** (con un sesgo de 1023),
- 52 bits de **mantisa** (más un 1 implícito al inicio).
El valor es (−1)^signo × 1,mantisa × 2^(exponente − 1023), como la notación científica pero en base 2. Consecuencias:
- Hay unos **15 a 17 dígitos decimales** significativos.
- El **épsilon de máquina** (la distancia entre 1 y el siguiente número representable) es 2⁻⁵² ≈ 2,2 × 10⁻¹⁶.
- Los números representables **no están igualmente espaciados**: son densos cerca de 0 y se separan al crecer. Por encima de 2⁵³ (unos 9 × 10¹⁵) ya no se pueden representar todos los enteros, y por eso JavaScript tiene «Number.MAX_SAFE_INTEGER» y el tipo «BigInt».
- Existen valores especiales: **+∞ y −∞** (resultado de 1/0), **NaN** ("no es un número", resultado de 0/0, que no es igual ni a sí mismo) y el **cero negativo**.
~~~js
console.log(0.1 + 0.2, 0.1 + 0.2 === 0.3);
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);          // comparar con tolerancia
console.log(2 ** 53, 2 ** 53 + 1, Number.MAX_SAFE_INTEGER);          // 2^53 + 1 no es representable
console.log(1 / 0, 0 / 0, NaN === NaN, Object.is(-0, 0));
~~~

## Errores numéricos
- **Error de redondeo:** el que se comete al representar o al operar con precisión finita.
- **Error de truncamiento:** el que se comete al aproximar un proceso infinito con uno finito (cortar una serie de Taylor, usar un paso finito en una integral).
- **Cancelación catastrófica:** al **restar dos números muy parecidos**, los dígitos iguales se cancelan y los que quedan son sobre todo error. Ejemplo: calcular √(x + 1) − √x para x = 10¹⁰ pierde casi todos los dígitos; reescribirlo como 1 / (√(x + 1) + √x) da el resultado exacto con toda la precisión.
- **Acumulación:** sumar millones de números pequeños a un total grande pierde precisión, porque cada número pequeño se redondea al sumarse al grande. La **suma compensada de Kahan** (1965) lleva una variable con el error perdido y lo reincorpora, con una precisión mucho mayor al mismo costo asintótico.
- **Desbordamiento** (*overflow*, el resultado es demasiado grande y da infinito) y **subdesbordamiento** (*underflow*, demasiado pequeño y da cero). Al multiplicar muchas probabilidades pequeñas, el producto se vuelve cero; por eso los algoritmos de aprendizaje automático suman **logaritmos** de probabilidades en lugar de multiplicarlas.

## Errores famosos
- **Misil Patriot (1991):** durante la Guerra del Golfo, una batería en Dhahran, Arabia Saudita, no interceptó un misil Scud que mató a 28 soldados. El sistema medía el tiempo en décimas de segundo con un registro de 24 bits, y 0,1 no es exacto en binario: el error, de unas 0,0001 % por décima, acumulado tras 100 horas de funcionamiento continuo, sumaba 0,34 segundos, suficiente para buscar el misil en el lugar equivocado.
- **Ariane 5 (1996):** el cohete se autodestruyó 37 segundos después del despegue porque una conversión de un número de punto flotante de 64 bits a un entero de 16 bits se desbordó en el software de navegación, reutilizado del Ariane 4 sin revalidar los rangos.
- **El error de la división del Pentium (1994):** el profesor Thomas Nicely descubrió que el procesador Pentium de Intel daba resultados incorrectos en ciertas divisiones por entradas faltantes en una tabla; Intel reemplazó los procesadores con un costo de unos 475 millones de dólares.

## El dinero no se guarda en punto flotante
Como 0,1 no es exacto, sumar montos en soles con números de punto flotante produce céntimos fantasma: sumar 0,10 diez veces no da exactamente 1,00. Para dinero se usa:
- **Enteros en la unidad mínima:** guardar céntimos (1050 en lugar de 10,50).
- **Tipos decimales** de precisión exacta: «DECIMAL» o «NUMERIC» en SQL, «BigDecimal» en Java, «decimal» en Python y C#.
- **Reglas de redondeo explícitas** y documentadas: el **redondeo del banquero** (al par más cercano en los empates, para que los redondeos no sesguen el total), y la regla de dónde se redondea (por línea o por total), que en la facturación electrónica viene fijada por la SUNAT.

## Condicionamiento y estabilidad
Dos ideas distintas que conviene no confundir:
- El **condicionamiento** es una propiedad del **problema**: cuánto cambia la solución ante pequeños cambios en los datos. Un sistema de ecuaciones **mal condicionado** (con matriz casi singular) amplifica cualquier error de los datos, sin importar el algoritmo. El **número de condición** lo mide: si es 10⁸, se pueden perder unos 8 dígitos de precisión.
- La **estabilidad** es una propiedad del **algoritmo**: si introduce errores mayores de los inevitables. La eliminación de Gauss sin pivoteo puede ser inestable (dividir por un número muy pequeño); con **pivoteo parcial** (elegir como pivote el mayor de la columna) es estable en la práctica.
Un buen algoritmo aplicado a un problema mal condicionado sigue dando malos resultados; lo que hay que hacer es reformular el problema.

## Algoritmos numéricos básicos
- **Raíces de ecuaciones:** el método de **bisección** (si una función continua cambia de signo en un intervalo, partirlo por la mitad repetidamente; lento pero seguro, gana un bit por iteración) y el de **Newton** (x ← x − f(x)/f'(x); converge cuadráticamente, duplicando los dígitos correctos en cada paso, pero puede fallar si se empieza lejos).
- **Integración numérica:** la regla del **trapecio** y la de **Simpson** aproximan el área con trapecios o parábolas; Simpson tiene error de orden h⁴ frente a h² del trapecio.
- **Interpolación:** construir una función que pase por puntos conocidos (polinomios de Lagrange, splines). Carl Runge mostró en 1901 que interpolar con un polinomio de grado alto en puntos equiespaciados puede oscilar violentamente en los bordes; por eso se prefieren los splines por tramos.
- **Ecuaciones diferenciales:** el método de **Euler** (avanzar con la pendiente actual) y los de **Runge-Kutta** (más precisos) simulan sistemas que cambian con el tiempo: física de videojuegos, circuitos, epidemias.
~~~js
// Raíz de f(x) = x² − 2 por bisección y por Newton
const f = x => x * x - 2, df = x => 2 * x;
let a = 1, b = 2, pasosB = 0;
while (b - a > 1e-12) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; pasosB++; }
let x = 1, pasosN = 0;
while (Math.abs(f(x)) > 1e-12) { x = x - f(x) / df(x); pasosN++; }
console.log('bisección:', a.toFixed(12), 'en', pasosB, 'pasos · Newton:', x.toFixed(12), 'en', pasosN, 'pasos');
~~~

## Ejemplo resuelto: los montos de PatioApp
Un reporte mensual de facturación no cuadraba con la suma de los comprobantes por 3 céntimos.
1. **Diagnóstico:** el reporte sumaba los montos como números de punto flotante leídos de un archivo CSV, y además redondeaba el IGV por comprobante con «toFixed(2)», que en algunos valores como 1,005 redondea hacia abajo, porque 1,005 se guarda internamente como 1,00499999….
2. **Corrección:** todos los montos se manejan en **céntimos enteros**; el IGV se calcula en céntimos con una regla de redondeo explícita (por línea, al entero más cercano y, en los empates, hacia arriba, según la regla adoptada por la empresa y su proveedor de facturación electrónica).
3. **Base de datos:** columnas «NUMERIC(12,2)» en lugar de «REAL».
4. **Prueba de propiedades:** para miles de facturas aleatorias, la suma de los comprobantes del mes es exactamente igual al total del reporte.
5. **Lección del equipo:** nunca comparar números de punto flotante con «===»; nunca guardar dinero en punto flotante; y documentar dónde y cómo se redondea.`,
  links: [['m1.data', 'la representación de los números en binario se vio en Cómo funciona una computadora'], ['mat2.calc', 'el método de Newton y las series de Taylor vienen del cálculo'], ['mat2.lin', 'la eliminación de Gauss y el condicionamiento son temas de álgebra lineal']],
  read: 'Goldberg, *What Every Computer Scientist Should Know About Floating-Point Arithmetic* (1991); Burden, Faires y Burden, *Análisis numérico* (10.ª ed.); Higham, *Accuracy and Stability of Numerical Algorithms* (2.ª ed., 2002).',
  terms: [
    ['IEEE 754', 'estándar de representación y aritmética de números de punto flotante', ['Kahan, 1985.', 'Doble precisión: 64 bits.', 'Usado por casi todos los procesadores.']],
    ['Épsilon de máquina', 'distancia entre 1 y el siguiente número representable', ['2⁻⁵² en doble precisión.', 'Number.EPSILON.', 'Mide la precisión relativa.']],
    ['Error de redondeo', 'error al representar u operar números con precisión finita', ['0,1 + 0,2.', 'Se acumula.', 'Misil Patriot.']],
    ['Cancelación catastrófica', 'pérdida de dígitos significativos al restar números muy parecidos', ['√(x + 1) − √x.', 'Se evita reescribiendo la fórmula.', 'Muy común.']],
    ['Suma compensada de Kahan', 'algoritmo que reincorpora el error de redondeo perdido en cada suma', ['Kahan, 1965.', 'Mucho más precisa.', 'Mismo costo asintótico.']],
    ['Condicionamiento', 'sensibilidad de la solución de un problema a pequeños cambios en los datos', ['Número de condición.', 'Propiedad del problema.', 'Matrices casi singulares.']],
    ['Estabilidad numérica', 'propiedad de un algoritmo de no introducir más error del inevitable', ['Pivoteo parcial.', 'Propiedad del algoritmo.', 'Se distingue del condicionamiento.']],
    ['Método de Newton', 'método iterativo para hallar raíces con x ← x − f(x)/f′(x)', ['Convergencia cuadrática.', 'Puede fallar lejos de la raíz.', 'Se usa para raíces cuadradas.']]
  ],
  q: [
    ['¿Por qué 0.1 + 0.2 === 0.3 es falso en JavaScript?', 'Porque 0,1 y 0,2 no se representan exactamente en binario', ['Por un error del lenguaje', 'Porque los números son textos', 'Porque === compara tipos'], 'IEEE 754.', 1],
    ['¿Cómo se comparan dos números de punto flotante?', 'Con una tolerancia: |a − b| < ε', ['Con ===', 'Convirtiéndolos a texto', 'No se pueden comparar'], 'Se elige una tolerancia adecuada.', 2],
    ['¿Cómo se deben guardar los montos de dinero?', 'En enteros de la unidad mínima o en tipos decimales exactos', ['En float', 'En texto sin formato', 'En double siempre'], 'Para evitar céntimos fantasma.', 2],
    ['¿Qué causó el fallo del misil Patriot en 1991?', 'La acumulación del error de representar 0,1 segundos en binario durante 100 horas', ['Un virus', 'Una división por cero', 'Un corte eléctrico'], 'El error sumó 0,34 segundos.', 3],
    ['¿Qué es la cancelación catastrófica?', 'La pérdida de dígitos al restar números muy parecidos', ['Un desbordamiento', 'Un error de compilación', 'Una división por cero'], 'Se evita reescribiendo la fórmula.', 3],
    ['¿Qué diferencia hay entre condicionamiento y estabilidad?', 'El condicionamiento es del problema; la estabilidad, del algoritmo', ['Son sinónimos', 'El condicionamiento es del algoritmo', 'La estabilidad es del hardware'], 'Un buen algoritmo no salva un problema mal condicionado.', 4],
    ['¿Por qué los algoritmos de aprendizaje automático suman logaritmos de probabilidades?', 'Porque multiplicar muchas probabilidades pequeñas produce subdesbordamiento a cero', ['Porque es más bonito', 'Porque los logaritmos son enteros', 'Por compatibilidad'], 'Subdesbordamiento.', 3],
    { tf: 'Por encima de 2⁵³, un número de doble precisión puede representar todos los enteros.', v: false, e: 'Por encima de 2⁵³ no se representan todos; por eso existe BigInt.', l: 2 },
    { tf: 'El método de Newton duplica aproximadamente los dígitos correctos en cada paso cerca de la raíz.', v: true, e: 'Convergencia cuadrática.', l: 3 },
    { c: 'Escribe «sumaKahan(valores)»: suma compensada de Kahan.', f: 'sumaKahan', p: ['valores'], t: [[[[0.1, 0.2, 0.3]], 0.6], [[[]], 0], [[[1, 2, 3]], 6]], sol: '  let s = 0, c = 0;\n  for (const v of valores) { const y = v - c, t = s + y; c = (t - s) - y; s = t; }\n  return s;', l: 3 },
    { c: 'Escribe «sumarCentimos(montos)»: montos es una lista de textos como "10.50"; devuelve el total en céntimos enteros sin usar punto flotante para sumar.', f: 'sumarCentimos', p: ['montos'], t: [[[['10.50', '0.10', '0.20']], 1080], [[['1.05', '1.05', '1.05']], 315], [[[]], 0]], sol: '  let t = 0;\n  for (const m of montos) { const [e, d = "0"] = m.split("."); t += parseInt(e, 10) * 100 + parseInt((d + "00").slice(0, 2), 10); }\n  return t;', l: 3 },
    { c: 'Escribe «biseccion(a, b, iter)»: aproxima la raíz de x² − 2 en [a, b] con iter iteraciones de bisección y devuelve el punto medio final redondeado a 6 decimales.', f: 'biseccion', p: ['a', 'b', 'iter'], t: [[[1, 2, 40], 1.414214], [[0, 2, 50], 1.414214]], sol: '  const f = x => x * x - 2;\n  for (let i = 0; i < iter; i++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; }\n  return Math.round((a + b) / 2 * 1e6) / 1e6;', l: 2 }
  ],
  gen: function (g) {
    var er = [['Restar dos números casi iguales y perder dígitos', 'Cancelación catastrófica'], ['Cortar una serie de Taylor en el quinto término', 'Error de truncamiento'], ['Representar 0,1 en binario', 'Error de redondeo'], ['Multiplicar mil probabilidades pequeñas y obtener 0', 'Subdesbordamiento'], ['Calcular 10³⁰⁸ × 10 y obtener infinito', 'Desbordamiento']];
    er.forEach(function (e) { g.mcq(2, '¿Qué tipo de error numérico es? ' + e[0], e[1], ['Cancelación catastrófica', 'Error de truncamiento', 'Error de redondeo', 'Subdesbordamiento', 'Desbordamiento'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Errores numéricos.'); });
    var ca = [['El misil Patriot no intercepta un Scud en 1991', 'Acumulación del error de 0,1 en binario'], ['El cohete Ariane 5 se autodestruye en 1996', 'Desbordamiento al convertir a entero de 16 bits'], ['Intel reemplaza procesadores en 1994', 'Error en la división del Pentium']];
    ca.forEach(function (c) { g.mcq(3, '¿Qué causó este caso? ' + c[0], c[1], ['Acumulación del error de 0,1 en binario', 'Desbordamiento al convertir a entero de 16 bits', 'Error en la división del Pentium', 'Un virus informático'].filter(function (x) { return x !== c[1]; }), 'Errores numéricos famosos.'); });
    g.times(6, function (R) { var a = R.int(1, 99), b = R.int(1, 99), c = R.int(1, 99); g.input(1, 'Si guardas los montos en céntimos, ¿cuánto es S/ ' + (a / 100).toFixed(2) + ' + S/ ' + (b / 100).toFixed(2) + ' + S/ ' + (c / 100).toFixed(2) + ' en céntimos?', a + b + c, 'Se suman enteros: no hay error de redondeo.'); });
    g.times(4, function (R) { var n = R.int(10, 40); g.input(3, 'La bisección parte de un intervalo de longitud 1. ¿Qué longitud tiene tras ' + n + ' iteraciones? Escribe el exponente k de 2^(−k).', n, 'Cada iteración divide el intervalo entre 2.'); });
  },
  checks: [
    ['Explica por qué 0,1 + 0,2 no es exactamente 0,3 en la computadora.', 'Porque 0,1 y 0,2 son periódicos en binario y se guardan como aproximaciones; la suma de las aproximaciones difiere de la aproximación de 0,3.'],
    ['¿Cómo deben manejarse los montos de dinero en el software?', 'En enteros de la unidad mínima o tipos decimales exactos, con reglas de redondeo explícitas.'],
    ['Diferencia condicionamiento y estabilidad con un ejemplo.', 'Un sistema con matriz casi singular está mal condicionado (problema); Gauss sin pivoteo puede ser inestable (algoritmo).'],
    ['Compara la bisección y el método de Newton.', 'La bisección es segura pero lenta (un bit por paso); Newton converge cuadráticamente pero puede fallar si se empieza lejos.']
  ],
  cites: ['Goldberg, D. (1991). What Every Computer Scientist Should Know About Floating-Point Arithmetic. *ACM Computing Surveys*, 23(1).', 'IEEE (2019). *IEEE Standard for Floating-Point Arithmetic* (IEEE Std 754-2019).', 'Kahan, W. (1965). Further Remarks on Reducing Truncation Errors. *Communications of the ACM*, 8(1).', 'U.S. General Accounting Office (1992). *Patriot Missile Defense: Software Problem Led to System Failure at Dhahran, Saudi Arabia*. GAO/IMTEC-92-26.', 'Lions, J. L. et al. (1996). *ARIANE 5 Flight 501 Failure: Report by the Inquiry Board*.', 'Higham, N. (2002). *Accuracy and Stability of Numerical Algorithms* (2.ª ed.). SIAM.'],
  project: { t: 'Calcular con confianza',
    goal: 'Detectar y corregir errores numéricos en cálculos reales.',
    steps: ['Escribe un programa que sume un millón de veces 0,1 de forma ingenua y con la suma de Kahan, y compara con el valor exacto.', 'Encuentra una fórmula con cancelación catastrófica (por ejemplo, la cuadrática con b² mucho mayor que 4ac) y reescríbela de forma estable.', 'Implementa bisección y Newton para una ecuación y compara iteraciones y precisión.', 'Revisa un programa que maneje dinero y corrígelo para usar céntimos enteros o decimales con redondeo explícito.', 'Escribe pruebas basadas en propiedades que verifiquen que los totales cuadran.'],
    deliver: 'El código, las comparaciones y las pruebas.' },
  hito: ['Migra todos los montos de PatioApp a céntimos enteros y tipos decimales en la base, con una regla de redondeo del IGV documentada.', 'Agrega a PatioApp una prueba de propiedades que verifique que la suma de los comprobantes del mes coincide exactamente con el reporte.']
});
SDC.after('mat2.numer', 'mat2.prob');
})();
