(function () {
var D = SDC.D;
SDC.XM('mat2', { prof: true });

D('mat2.ind', `## El teorema maestro
Los algoritmos de **divide y vencerás** (dividir el problema en partes, resolverlas recursivamente y combinar) producen recurrencias de la forma T(n) = a·T(n/b) + f(n): **a** subproblemas de tamaño **n/b** más un costo **f(n)** de dividir y combinar. El **teorema maestro**, popularizado por el libro de Cormen, Leiserson, Rivest y Stein a partir del trabajo de Bentley, Haken y Saxe (1980), resuelve la mayoría comparando f(n) con n^(log_b a):
| Caso | Condición | Resultado | Ejemplo |
| 1 | f(n) crece más lento que n^(log_b a) | T(n) = Θ(n^(log_b a)) | T(n) = 8T(n/2) + n² → Θ(n³) |
| 2 | f(n) crece igual que n^(log_b a) | T(n) = Θ(n^(log_b a) · log n) | merge sort: T(n) = 2T(n/2) + n → Θ(n log n) |
| 3 | f(n) crece más rápido (con una condición de regularidad) | T(n) = Θ(f(n)) | T(n) = 2T(n/2) + n² → Θ(n²) |
La búsqueda binaria, T(n) = T(n/2) + 1, cae en el caso 2 con n^(log₂ 1) = 1: Θ(log n). El algoritmo de Karatsuba (1960) para multiplicar números grandes, T(n) = 3T(n/2) + n, cae en el caso 1: Θ(n^(log₂ 3)) ≈ Θ(n^1,585), mejor que el Θ(n²) de la multiplicación escolar. Fue la primera vez que alguien demostró que se podía multiplicar más rápido que como se enseña en la escuela, refutando una conjetura de Kolmogórov.

## Ejemplo resuelto: el costo de la búsqueda de PatioApp
El buscador de unidades divide la lista ordenada por placa en dos mitades y descarta una en cada paso. Con 1 millón de unidades:
1. La recurrencia es T(n) = T(n/2) + c, con T(1) = c.
2. Desplegándola: T(n) = c + c + … + c, tantas veces como se puede dividir n entre 2 hasta llegar a 1, es decir, ⌈log₂ n⌉ + 1 veces.
3. Para n = 10⁶: log₂ 10⁶ ≈ 19,93, así que bastan 21 comparaciones como máximo.
4. Se **demuestra por inducción** que T(n) ≤ c(log₂ n + 1) para toda potencia de 2: base n = 1, T(1) = c ≤ c(0 + 1); paso: T(2n) = T(n) + c ≤ c(log₂ n + 1) + c = c(log₂ 2n + 1).
Una búsqueda lineal necesitaría en promedio 500 000 comparaciones; la diferencia la explica la matemática antes de escribir el código.

Las mismas herramientas (recurrencias, inducción y sumas) permiten analizar después algoritmos más complejos, como el ordenamiento por mezcla o los árboles balanceados del curso de Algoritmos.`);

D('mat2.num', `## Ejemplo resuelto: el dígito verificador de los códigos de PatioApp
Los operadores digitan a mano códigos de estadía cuando la impresora falla, y se equivocan. Se agrega un **dígito verificador** para detectar errores de tipeo antes de buscar en la base.
1. **Primer intento (suma módulo 10):** el dígito es la suma de los dígitos módulo 10. Detecta cualquier error en un solo dígito, pero **no** detecta la transposición de dos dígitos vecinos (21 y 12 suman lo mismo), que es el segundo error humano más frecuente.
2. **Algoritmo de Luhn** (Hans Peter Luhn, IBM, 1954), el de las tarjetas de crédito: duplica uno de cada dos dígitos antes de sumar. Detecta todo error de un dígito y casi todas las transposiciones (falla solo con 09 ↔ 90).
3. **Pesos con módulo primo:** el ISBN-10 usa pesos 10, 9, …, 1 y módulo 11. Como 11 es primo, detecta **todos** los errores de un dígito y **todas** las transposiciones, al precio de necesitar un símbolo extra (la X para el valor 10).
4. **Decisión:** el código de estadía usa el algoritmo de Damm (H. Michael Damm, 2004), basado en un cuasigrupo de orden 10, que detecta todos los errores de un dígito y todas las transposiciones de vecinos usando solo dígitos decimales.
~~~js
// Luhn: ¿es válido un número con su dígito verificador al final?
function luhnValido(numero) {
  let suma = 0;
  [...numero].reverse().forEach((c, i) => { let d = +c; if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; } suma += d; });
  return suma % 10 === 0;
}
console.log(luhnValido('79927398713'), luhnValido('79927398731'));     // el segundo tiene dos dígitos transpuestos
~~~
El RUC peruano también tiene un dígito verificador calculado con pesos y módulo 11: la teoría de números está presente en casi cualquier identificador que digitamos.

## Números aleatorios y aritmética modular
Los generadores de números pseudoaleatorios más antiguos y simples son los **congruenciales lineales**, propuestos por Derrick Lehmer en 1949: x_(n+1) = (a·x_n + c) mod m. Con a, c y m bien elegidos (el teorema de Hull y Dobell, de 1962, da las condiciones para que recorran todos los valores antes de repetirse) producen secuencias que parecen aleatorias, pero son **completamente predecibles** si se conocen unos pocos valores. Por eso nunca deben usarse para generar códigos, tokens o contraseñas: para eso existen los generadores criptográficamente seguros, como «crypto.getRandomValues» en el navegador.`);

D('mat2.calc', `## Derivadas en el aprendizaje automático
La aplicación más importante del cálculo en el software actual es el **entrenamiento de redes neuronales**. Una red es una función con millones de parámetros, y entrenarla es minimizar una función de error. Para saber en qué dirección mover cada parámetro, se necesita la **derivada** del error respecto de cada uno (el **gradiente**). El algoritmo de **retropropagación** (popularizado por David Rumelhart, Geoffrey Hinton y Ronald Williams en 1986) no es más que la **regla de la cadena** aplicada de forma sistemática desde la salida hacia la entrada. Las bibliotecas como PyTorch y TensorFlow implementan la **diferenciación automática**: el programador escribe la función, y la biblioteca calcula sus derivadas exactas siguiendo las operaciones, sin fórmulas simbólicas ni aproximaciones numéricas.

## Ejemplo resuelto: la tarifa óptima de PatioApp
Gerencia estima que, con una tarifa diaria p (en soles), el número de unidades que se quedan en el patio es aproximadamente u(p) = 400 − 10p. El ingreso diario es I(p) = p · u(p) = 400p − 10p².
1. **Derivar:** I'(p) = 400 − 20p.
2. **Igualar a cero:** 400 − 20p = 0, p = 20 soles.
3. **Verificar que es un máximo:** I''(p) = −20 < 0, la función es cóncava, así que p = 20 es el máximo.
4. **Resultado:** I(20) = 400·20 − 10·400 = 4000 soles diarios, con 200 unidades.
5. **Sensibilidad:** cerca del óptimo, la derivada es casi cero, así que una tarifa de 19 o 21 soles da un ingreso casi igual (3990): el ingreso es poco sensible a errores pequeños de precio, pero muy sensible a errores grandes. El modelo lineal de demanda es, por supuesto, una simplificación que habría que validar con datos reales.

## Integrales en la práctica
Las integrales aparecen cuando hay que **acumular** algo que cambia: el total de horas-espacio ocupadas en un día a partir de la ocupación en cada instante, el consumo de energía de un servidor a partir de su potencia, el área bajo la curva de una distribución de probabilidad. Cuando no hay fórmula, se calculan numéricamente sumando rectángulos o trapecios, como verás en Métodos numéricos.`);

D('mat2.lin', `## Ejemplo resuelto: el patio como sistema de ecuaciones
Tres sedes intercambian unidades cada semana: de las unidades de Callao, el 70 % se queda, el 20 % pasa a Ate y el 10 % a Lurín; de Ate, el 10 % pasa a Callao, el 80 % se queda y el 10 % pasa a Lurín; de Lurín, el 20 % a Callao, el 20 % a Ate y el 60 % se queda. Si hoy hay [300, 200, 100] unidades, la distribución de la semana siguiente es el producto de la **matriz de transición** por el vector:
~~~js
const M = [[0.7, 0.1, 0.2],      // fila: destino; columna: origen (Callao, Ate, Lurín)
           [0.2, 0.8, 0.2],
           [0.1, 0.1, 0.6]];
const mult = (A, v) => A.map(fila => fila.reduce((s, a, j) => s + a * v[j], 0));
let v = [300, 200, 100];
for (let semana = 1; semana <= 30; semana++) v = mult(M, v);
console.log('tras 30 semanas:', v.map(x => Math.round(x)));
~~~
Tras muchas semanas, la distribución converge a un **estado estacionario** que no cambia: un vector x con Mx = x, es decir, un **vector propio con valor propio 1**. Resolviendo el sistema (M − I)x = 0 con la condición de que la suma sea 600, se obtiene exactamente [180, 300, 120]: la sede de Ate terminará concentrando la mitad de las unidades, información útil para dimensionar su capacidad. Este mismo razonamiento, aplicado a la matriz de enlaces de la web, es el algoritmo **PageRank** de Brin y Page: la importancia de cada página es la componente del vector propio dominante.

## Matrices dispersas
Las matrices reales de la computación suelen ser enormes y casi vacías: la matriz de enlaces de la web tiene miles de millones de filas, pero cada página enlaza a pocas otras. Guardarlas completas sería imposible; se usan formatos **dispersos** que solo almacenan los valores distintos de cero (por ejemplo, el formato CSR guarda tres listas: los valores, sus columnas y dónde empieza cada fila). Las operaciones se adaptan para recorrer solo esos valores, y por eso PageRank se puede calcular multiplicando repetidamente por la matriz sin construirla nunca completa.`);

D('mat2.stat', `## Ejemplo resuelto: ¿mejoró el tiempo de salida?
Después de introducir el escaneo de placas, el equipo mide el tiempo de registro de salida. Antes: 40 mediciones con media 38 segundos y desviación estándar 9. Después: 40 mediciones con media 31 segundos y desviación estándar 8.
1. **Pregunta:** ¿la diferencia de 7 segundos es real o puede deberse al azar?
2. **Error estándar de la diferencia:** √(9²/40 + 8²/40) = √(2,025 + 1,6) ≈ 1,90 segundos.
3. **Estadístico:** z ≈ 7 / 1,90 ≈ 3,7. Con muestras de este tamaño, un valor tan extremo ocurriría por azar con una probabilidad muy pequeña (p < 0,001) si no hubiera diferencia real.
4. **Intervalo de confianza del 95 %:** 7 ± 1,96 · 1,90, es decir, entre 3,3 y 10,7 segundos de mejora.
5. **Interpretación prudente:** la mejora es estadísticamente clara, pero el intervalo dice que puede ser de apenas 3 segundos o de casi 11. Además, el estudio no es un experimento aleatorizado: si las mediciones de "después" se hicieron en días de menos tráfico, parte de la mejora podría deberse a eso (una variable de confusión). Para una conclusión firme, se compararían operadores con y sin escaneo en los mismos días, asignados al azar.
La estadística no da certezas: cuantifica la incertidumbre y obliga a decir qué tan seguros estamos y por qué.

## Errores frecuentes al usar estadística en software
- **Mirar los resultados a cada rato y detenerse cuando "dan significativo"** (*peeking*): aumenta mucho la probabilidad de falsos positivos. Hay que fijar de antemano el tamaño de la muestra o usar métodos secuenciales diseñados para eso.
- **Probar muchas hipótesis y reportar solo la que salió:** con 20 comparaciones al nivel del 5 %, se espera en promedio un falso positivo aunque nada haya cambiado (el problema de las **comparaciones múltiples**; la corrección de Bonferroni divide el umbral entre el número de pruebas).
- **Confundir significativo con importante:** con millones de datos, una diferencia de 0,01 segundos puede ser estadísticamente significativa y no importarle a nadie. Siempre se reporta el **tamaño del efecto** con su intervalo.
- **Usar el promedio con distribuciones sesgadas:** los tiempos de respuesta tienen colas largas; se reportan percentiles.

- **Sesgo de supervivencia:** analizar solo los casos que "sobrevivieron" (los usuarios que siguen activos, los proyectos que terminaron) y sacar conclusiones sobre todos.`);
})();
