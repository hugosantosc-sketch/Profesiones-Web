(function () {
var M = SDC.M, S = SDC.S;
M('mat2', { title: 'Matemática avanzada para ingenieros',
  desc: 'La matemática continua y la teoría de números que los planes de estudio de las mejores universidades exigen en los primeros ciclos: demostraciones por inducción, aritmética modular, cálculo, álgebra lineal y estadística.',
  thread: 'PatioApp se analiza con números: dígitos verificadores para los tickets, coordenadas y distancias en el plano del patio, y estadísticas confiables de cuánto tarda cada unidad en salir.',
  books: '*Mathematics for Computer Science* (Lehman, Leighton y Meyer), *Concrete Mathematics* (Graham, Knuth y Patashnik), *Cálculo* (Stewart), *Introduction to Linear Algebra* (Strang), *Applied Statistics and Probability for Engineers* (Montgomery y Runger).',
  uni: 'MIT 18.01 *Single Variable Calculus*, 18.06 *Linear Algebra* y 6.1200J *Mathematics for Computer Science*; Stanford CS109 *Probability for Computer Scientists* y CS103; Berkeley CS70, Math 54 y Data 100; Harvard Stat 110. En Perú: Cálculo I y II, Álgebra Lineal, Estadística y Probabilidades (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Analítica matemática del patio',
    goal: 'Usar todas las herramientas del módulo para responder con rigor preguntas reales sobre la operación de un patio.',
    steps: ['Demuestra por inducción una fórmula de costo de tu sistema y verifícala con un programa.', 'Implementa dígitos verificadores con aritmética modular y mide cuántos errores de digitación detectan.', 'Modela la ocupación del patio con funciones y encuentra con derivadas el punto de mayor ocupación de un día.', 'Representa el patio en coordenadas, calcula distancias y similitudes entre unidades con vectores.', 'Analiza un mes de datos simulados con estadística descriptiva, intervalos de confianza y una prueba de hipótesis.'],
    deliver: 'Un informe con las demostraciones, el código de cada parte y las conclusiones numéricas.' } });

S('mat2', 'mat2.ind', { title: 'Inducción, sumas y recurrencias',
  ask: '¿Qué concepto se aplica en este caso?',
  lesson: `
> **La idea en simple.** Si puedes subir al primer peldaño de una escalera y, estando en cualquier peldaño, sabes subir al siguiente, puedes llegar a cualquier peldaño. Eso es la inducción matemática, y es exactamente el razonamiento que justifica que una función recursiva o un bucle funcionen para todas las entradas.

## El principio de inducción
Para demostrar que una propiedad P(n) vale para todo natural n ≥ n₀ se prueban dos cosas:
1. **Caso base:** P(n₀) es verdadera.
2. **Paso inductivo:** para cualquier k ≥ n₀, si P(k) es verdadera (la **hipótesis inductiva**), entonces P(k + 1) también lo es.
Lehman, Leighton y Meyer, en *Mathematics for Computer Science* (el texto del curso 6.1200J del MIT), justifican el principio con el **buen orden**: todo conjunto no vacío de naturales tiene un mínimo. Si P fallara en algún n, habría un primer n donde falla; ese n no puede ser el caso base, y como P(n − 1) vale, el paso inductivo daría P(n). Contradicción.

Ejemplo clásico: 1 + 2 + … + n = n(n + 1)/2.
- Base: n = 1 da 1 = 1·2/2.
- Paso: si 1 + … + k = k(k + 1)/2, entonces 1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, que es la fórmula para k + 1.
~~~js
// Una demostración no se reemplaza con pruebas, pero comprobar ayuda a detectar fórmulas mal recordadas
let ok = true;
for (let n = 1; n <= 1000; n++) { let s = 0; for (let i = 1; i <= n; i++) s += i; if (s !== n * (n + 1) / 2) ok = false; }
console.log('fórmula comprobada del 1 al 1000:', ok);
~~~

## Variantes que usarás
- **Inducción fuerte:** en el paso se puede suponer que P vale para **todos** los valores desde n₀ hasta k, no solo para k. Sirve cuando el caso n depende de casos mucho menores, por ejemplo para probar que todo número mayor que 1 es producto de primos.
- **Inducción estructural:** sobre estructuras recursivas (listas, árboles, expresiones). Si la propiedad vale para los casos más simples (lista vacía, hoja) y se conserva al construir estructuras mayores, vale para todas. Es la base para razonar sobre funciones recursivas y compiladores.

## El error clásico
George Pólya presentó en *Induction and Analogy in Mathematics* (1954) una "demostración" de que todos los caballos son del mismo color: en un grupo de k + 1 caballos, quitas uno y los k restantes son iguales; quitas otro y también; por lo tanto los k + 1 son iguales. La falla está en el paso de 1 a 2: los dos subgrupos no se solapan. Moraleja: el paso inductivo debe funcionar para **todo** k, incluidos los más pequeños.

## Sumas que aparecen en el análisis de algoritmos
| Suma | Fórmula cerrada | Dónde aparece |
| 1 + 2 + … + n | n(n + 1)/2 | dos bucles anidados donde el interno crece: Θ(n²) |
| 1 + r + r² + … + rⁿ | (rⁿ⁺¹ − 1)/(r − 1) | duplicar un arreglo: el total de copias es menor que 2n |
| 1 + 1/2 + 1/3 + … + 1/n | ≈ ln n + 0.577 | quicksort aleatorio, cupones, hashing |
| 1² + 2² + … + n² | n(n + 1)(2n + 1)/6 | triple bucle triangular |
La **serie geométrica** explica el análisis amortizado de los arreglos dinámicos: si la capacidad se duplica, las copias suman 1 + 2 + 4 + … + n < 2n. La **serie armónica** crece como el logaritmo natural, algo que Graham, Knuth y Patashnik demuestran en *Concrete Mathematics*.

## Recurrencias
Una recurrencia define una sucesión en función de sus términos anteriores. El costo de un algoritmo recursivo se escribe así: merge sort cumple T(n) = 2T(n/2) + n con T(1) = 1. Tres métodos para resolverlas:
- **Sustitución:** adivinar la forma de la solución y demostrarla por inducción.
- **Árbol de recursión:** dibujar el costo de cada nivel. En merge sort cada nivel cuesta n y hay log₂ n niveles, así que T(n) = n log₂ n + n.
- **Teorema maestro:** Jon Bentley, Dorothea Haken y James Saxe lo popularizaron en 1980. Para T(n) = aT(n/b) + f(n), se compara f(n) con n^(log_b a):
| Caso | Condición | Resultado | Ejemplo |
| 1 | f crece más lento | Θ(n^(log_b a)) | T(n) = 8T(n/2) + n² → Θ(n³) |
| 2 | crecen igual | Θ(n^(log_b a) · log n) | merge sort → Θ(n log n) |
| 3 | f crece más rápido | Θ(f(n)) | T(n) = 2T(n/2) + n² → Θ(n²) |
Cormen y sus coautores presentan la versión precisa en el capítulo 4 de *Introduction to Algorithms*.

## Recurrencias lineales: Fibonacci
F(n) = F(n − 1) + F(n − 2) tiene una fórmula cerrada sorprendente (de Binet): F(n) = (φⁿ − ψⁿ)/√5, con φ = (1 + √5)/2 ≈ 1.618. Por eso el Fibonacci ingenuo hace del orden de φⁿ llamadas, y por eso el número áureo aparece en el análisis del algoritmo de Euclides que verás en el próximo tema. Las **funciones generadoras**, tratadas a fondo en *Concrete Mathematics*, resuelven este tipo de recurrencias de forma sistemática.

## Por qué un programador necesita esto
Demostrar que un bucle es correcto con un invariante es una inducción sobre las vueltas; demostrar que una función recursiva es correcta es una inducción sobre el tamaño de la entrada; calcular cuánto tarda es resolver una recurrencia o una suma. Esta es la diferencia entre "creo que funciona" y "sé que funciona y sé cuánto tarda".`,
  links: [['m2.prop', 'la inducción es una técnica de demostración de la lógica'], ['m3.rec', 'una función recursiva es una inducción convertida en código'], ['m4.bigo', 'las sumas y recurrencias dan la complejidad de los algoritmos']],
  read: 'Lehman, Leighton y Meyer, capítulos 5 y 14; Graham, Knuth y Patashnik, capítulos 1 y 2; Cormen et al., capítulo 4.',
  terms: [
    ['Caso base', 'primer valor para el que se demuestra directamente la propiedad', ['Antes del paso general compruebas que la fórmula vale para n = 1.', 'En una función recursiva es el caso que se responde sin volver a llamarse.', 'Sin él, la cadena de peldaños nunca empieza.']],
    ['Paso inductivo', 'demostración de que si la propiedad vale para k, también vale para k + 1', ['Supones la fórmula para k y la usas para obtenerla en k + 1.', 'Muestras que si el bucle es correcto tras k vueltas, lo es tras k + 1.', 'Es el razonamiento de "si llego a un peldaño, llego al siguiente".']],
    ['Inducción fuerte', 'variante que permite suponer la propiedad para todos los valores anteriores, no solo el inmediato', ['Para probar que todo número se factoriza en primos usas los factores, que son mucho menores.', 'Un caso n depende de n/2, no de n − 1.', 'Asumes que vale de n₀ hasta k para probar k + 1.']],
    ['Inducción estructural', 'demostración sobre estructuras recursivas: vale en los casos simples y se conserva al construir otras mayores', ['Pruebas una propiedad para todos los árboles partiendo de las hojas.', 'Demuestras que un evaluador de expresiones termina para toda expresión bien formada.', 'Razonas sobre listas: vacía o elemento seguido de lista.']],
    ['Serie geométrica', 'suma de términos donde cada uno es el anterior multiplicado por una razón constante', ['Calculas que duplicar un arreglo cuesta menos de 2n copias en total.', 'Sumas 1 + 2 + 4 + … + 512.', 'Proyectas un crecimiento de 5% mensual compuesto.']],
    ['Recurrencia', 'ecuación que define un valor en función de valores anteriores de la misma sucesión', ['Escribes T(n) = 2T(n/2) + n para describir el costo de merge sort.', 'Fibonacci se define con los dos términos anteriores.', 'El costo de las Torres de Hanói cumple T(n) = 2T(n − 1) + 1.']],
    ['Teorema maestro', 'regla que resuelve recurrencias del tipo T(n) = aT(n/b) + f(n) comparando f(n) con n^(log_b a)', ['Concluyes sin dibujar nada que T(n) = 4T(n/2) + n es Θ(n²).', 'Clasificas en un examen la complejidad de un divide y vencerás.', 'Comparas el trabajo de dividir con el de combinar.']],
    ['Número armónico', 'suma 1 + 1/2 + … + 1/n, que crece aproximadamente como ln n', ['Analizas cuántas compras hacen falta para completar un álbum de figuritas.', 'Aparece en el número esperado de comparaciones de quicksort aleatorio.', 'Crece sin límite pero muy despacio.']]
  ],
  q: [
    ['En el paso inductivo de "1 + … + n = n(n+1)/2", ¿qué se supone?', 'Que la fórmula vale para k', ['Que vale para k + 1', 'Que vale para todo n', 'Que n es par'], 'La hipótesis inductiva es P(k); con ella se demuestra P(k + 1).', 2],
    ['¿Dónde falla la "demostración" de que todos los caballos son del mismo color?', 'En el paso de 1 a 2 caballos, donde los subgrupos no se solapan', ['En el caso base', 'En el uso de la inducción fuerte', 'No falla'], 'El paso inductivo debe valer para todo k; para k = 1 el argumento no funciona.', 3],
    ['T(n) = 2T(n/2) + n² se resuelve como:', 'Θ(n²)', ['Θ(n log n)', 'Θ(n² log n)', 'Θ(n³)'], 'n^(log₂2) = n crece más lento que n², así que domina f(n) (caso 3).', 4],
    ['T(n) = T(n/2) + 1 (búsqueda binaria) se resuelve como:', 'Θ(log n)', ['Θ(1)', 'Θ(n)', 'Θ(n log n)'], 'a = 1, b = 2: n^0 = 1 y f(n) = 1 crecen igual (caso 2): Θ(log n).', 3],
    { tf: 'La serie armónica 1 + 1/2 + 1/3 + … converge a un número finito.', v: false, e: 'Diverge, aunque muy lentamente: crece como ln n.', l: 3 },
    { tf: 'Si un arreglo duplica su capacidad al llenarse, el total de copias para n inserciones es menor que 2n.', v: true, e: 'Es la suma geométrica 1 + 2 + 4 + … + n < 2n.', l: 3 },
    { i: '¿Cuánto vale 1 + 2 + 4 + … + 1024?', a: 2047, e: 'Suma geométrica con razón 2: 2^11 − 1 = 2047.', l: 2 },
    { c: 'Escribe «sumaGeometrica(a, r, n)» que devuelva a + a·r + … con n términos.', f: 'sumaGeometrica', p: ['a', 'r', 'n'], t: [[[1, 2, 10], 1023], [[3, 1, 4], 12], [[5, 3, 3], 65]], sol: '  let s = 0, t = a;\n  for (let i = 0; i < n; i++) { s += t; t *= r; }\n  return s;', h: 'Acumula el término y multiplícalo por r en cada vuelta.', l: 3 },
    { c: 'Escribe «costoMerge(n)» para n potencia de 2 con T(1) = 1 y T(n) = 2T(n/2) + n.', f: 'costoMerge', p: ['n'], t: [[[1], 1], [[8], 32], [[16], 80]], sol: '  if (n === 1) return 1;\n  return 2 * costoMerge(n / 2) + n;', h: 'Traduce la recurrencia literalmente.', e: 'El resultado coincide con n log₂ n + n.', l: 3 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var n = R.int(5, 60); g.input(2, 'Calcula 1 + 2 + … + ' + n + ' con la fórmula de Gauss.', n * (n + 1) / 2, n + '·' + (n + 1) + '/2 = ' + n * (n + 1) / 2 + '.'); });
    g.times(6, function (R) { var r = R.pick([2, 3]), k = R.int(3, 8), s = (Math.pow(r, k + 1) - 1) / (r - 1); g.input(3, 'Calcula 1 + ' + r + ' + ' + r + '² + … + ' + r + '^' + k + '.', s, '(' + r + '^' + (k + 1) + ' − 1)/(' + r + ' − 1) = ' + s + '.'); });
    g.times(5, function (R) { var k = R.int(2, 10), n = Math.pow(2, k); g.input(3, 'Con T(1) = 1 y T(n) = 2T(n/2) + n, ¿cuánto vale T(' + n + ')?', n * k + n, 'T(n) = n log₂ n + n = ' + n + '·' + k + ' + ' + n + '.'); });
    var rec = [['T(n) = 2T(n/2) + n', 'Θ(n log n)'], ['T(n) = 4T(n/2) + n', 'Θ(n²)'], ['T(n) = T(n/2) + n', 'Θ(n)'], ['T(n) = 8T(n/2) + n²', 'Θ(n³)'], ['T(n) = 2T(n/2) + 1', 'Θ(n)'], ['T(n) = 3T(n/3) + n', 'Θ(n log n)'], ['T(n) = 2T(n/2) + n²', 'Θ(n²)']];
    var cls = ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(n³)', 'Θ(log n)'];
    rec.forEach(function (r) { g.mcq(4, 'Resuelve con el teorema maestro: ' + r[0], r[1], g.R.sample(cls.filter(function (c) { return c !== r[1]; }), 3), 'Compara f(n) con n^(log_b a) y aplica el caso correspondiente.'); });
    g.times(4, function (R) { var n = R.int(6, 20), a = 0, b = 1; for (var i = 0; i < n; i++) { var t = a + b; a = b; b = t; } g.input(2, 'Con F(0) = 0 y F(1) = 1, ¿cuánto vale F(' + n + ') de Fibonacci?', a, 'Sumando los dos anteriores se llega a ' + a + '.'); });
  },
  checks: [
    ['¿Qué dos cosas hay que demostrar en una prueba por inducción?', 'El caso base (la propiedad vale para el primer valor) y el paso inductivo (si vale para k, vale para k + 1).'],
    ['¿Cuándo conviene la inducción fuerte?', 'Cuando el caso k + 1 depende de valores mucho menores que k, no solo de k, como al probar que todo número se factoriza en primos.'],
    ['Usa el árbol de recursión para explicar por qué merge sort es Θ(n log n).', 'Cada nivel del árbol suma un trabajo total de n (dividir y mezclar) y hay log₂ n niveles hasta llegar a subproblemas de tamaño 1; n por log n.'],
    ['¿Por qué duplicar la capacidad de un arreglo da inserciones O(1) amortizadas?', 'Porque las copias suman 1 + 2 + 4 + … + n < 2n, una serie geométrica; repartidas entre n inserciones dan un costo constante promedio.'],
    ['¿Qué relación hay entre la inducción y una función recursiva?', 'El caso base de la función corresponde al caso base de la inducción y la llamada recursiva al paso inductivo: si la función es correcta para entradas menores, lo es para la actual.']
  ],
  cites: ['Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT. Capítulos 5 y 14.', 'Graham, R., Knuth, D. y Patashnik, O. (1994). *Concrete Mathematics* (2.ª ed.). Addison-Wesley.', 'Bentley, J., Haken, D. y Saxe, J. (1980). A General Method for Solving Divide-and-Conquer Recurrences. *ACM SIGACT News*, 12(3).', 'Pólya, G. (1954). *Induction and Analogy in Mathematics*. Princeton University Press.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulo 4.'],
  project: { t: 'Demostrar y comprobar',
    goal: 'Practicar demostraciones por inducción y comprobar con código las fórmulas que demuestras.',
    steps: ['Demuestra por inducción las fórmulas de la suma de cuadrados y de la serie geométrica.', 'Demuestra por inducción fuerte que todo monto mayor o igual a 8 céntimos se puede pagar con monedas de 3 y 5.', 'Escribe un programa que compruebe cada fórmula hasta n = 10 000 y que encuentre el contraejemplo si una fórmula es falsa.', 'Resuelve tres recurrencias con árbol de recursión y teorema maestro y verifica numéricamente su crecimiento.', 'Encuentra y explica el error de una demostración falsa que te pase un compañero (o la de los caballos).'],
    deliver: 'Un documento con las demostraciones escritas y el código de comprobación.' },
  hito: ['Calcula con una serie geométrica cuántas unidades tendría el patio en 12 meses si los ingresos crecen 5% mensual y regístralo en el README como supuesto de capacidad.', 'Demuestra por inducción que tu fórmula de cobro acumulado (tarifa diaria por días más un recargo fijo) es correcta y compruébala con un programa para los primeros 365 días.']
});

S('mat2', 'mat2.num', { title: 'Teoría de números y aritmética modular',
  ask: '¿Qué concepto de teoría de números se usa?',
  lesson: `
> **La idea en simple.** Un reloj trabaja "módulo 12": 9 horas después de las 5 son las 2, no las 14. La aritmética modular es la matemática de los relojes, y sostiene las tablas hash, los dígitos verificadores de tu tarjeta y la criptografía de HTTPS.

## Divisibilidad y primos
Decimos que a divide a b (a | b) si b = a·k para algún entero k. Un **número primo** solo es divisible por 1 y por sí mismo. Dos resultados con más de 2000 años:
- **Euclides** demostró en los *Elementos* (alrededor del 300 a. C.) que hay infinitos primos: si hubiera una lista finita, el producto de todos más uno no sería divisible por ninguno.
- **Teorema fundamental de la aritmética:** todo entero mayor que 1 se escribe de forma única como producto de primos (salvo el orden). La unicidad es lo que hace funcionar muchas técnicas criptográficas.
La **criba de Eratóstenes** encuentra todos los primos hasta n tachando los múltiplos de cada primo, con un costo cercano a O(n log log n).

## El algoritmo más antiguo en uso
El **algoritmo de Euclides** calcula el máximo común divisor con una idea: mcd(a, b) = mcd(b, a mod b), y mcd(a, 0) = a.
~~~js
function mcd(a, b) { while (b !== 0) { [a, b] = [b, a % b]; } return a; }
console.log(mcd(1071, 462), mcd(17, 5), mcd(48, 180));
~~~
Gabriel Lamé demostró en 1844 que el peor caso ocurre con dos números consecutivos de Fibonacci y que la cantidad de pasos es como máximo unas cinco veces la cantidad de dígitos del menor: es O(log n). Knuth lo analiza a fondo en el volumen 2 de *The Art of Computer Programming*. La **versión extendida** encuentra además enteros x e y tales que a·x + b·y = mcd(a, b) (identidad de Bézout), y con ella se calcula el **inverso modular**.

## Congruencias
Escribimos a ≡ b (mod m) cuando m divide a a − b, es decir, cuando a y b dejan el mismo resto al dividirlos entre m. Las congruencias se suman y multiplican como igualdades:
- (a + b) mod m = ((a mod m) + (b mod m)) mod m
- (a · b) mod m = ((a mod m) · (b mod m)) mod m
Esto permite trabajar con números enormes sin desbordamientos, reduciendo en cada paso. Cuidado con los negativos en JavaScript: «-7 % 3» da −1; el resto matemático es ((−7 % 3) + 3) % 3 = 2.

## Inverso modular y división
En aritmética modular no se divide: se multiplica por el **inverso**. El inverso de a módulo m es el número x tal que a·x ≡ 1 (mod m), y existe solo si mcd(a, m) = 1. Por ejemplo, 3·5 = 15 ≡ 1 (mod 7), así que el inverso de 3 módulo 7 es 5.

## Exponenciación rápida
Calcular 7^560 mod 561 multiplicando 560 veces sería lento; la **exponenciación por cuadrados** usa los bits del exponente y necesita solo unas 2·log₂(e) multiplicaciones:
~~~js
function potMod(b, e, m) {
  let r = 1n, x = BigInt(b) % BigInt(m), k = BigInt(e), M = BigInt(m);
  while (k > 0n) { if (k & 1n) r = (r * x) % M; x = (x * x) % M; k >>= 1n; }
  return Number(r);
}
console.log(potMod(4, 13, 497), potMod(2, 100, 1000003));
~~~

## Fermat, Euler y RSA
- **Pequeño teorema de Fermat** (1640): si p es primo y p no divide a a, entonces a^(p−1) ≡ 1 (mod p). Es la base de pruebas rápidas de primalidad (como la de Miller-Rabin).
- **Teorema de Euler:** a^φ(m) ≡ 1 (mod m) si mcd(a, m) = 1, donde φ(m) cuenta los números menores que m coprimos con m. Para m = p·q con p y q primos, φ(m) = (p − 1)(q − 1).
**RSA** (Rivest, Shamir y Adleman, 1977) usa justamente esto. Con el ejemplo pequeño de los libros de texto: p = 61, q = 53, n = 3233, φ = 3120; se elige e = 17 y se calcula d = 2753, el inverso de 17 módulo 3120. Cifrar es c = m^e mod n y descifrar, m = c^d mod n. La seguridad depende de que factorizar n sea muy difícil cuando p y q tienen cientos de dígitos.

## Teorema chino del resto
Si conoces el resto de un número módulo varios números coprimos, el número queda determinado de forma única módulo su producto. Aparece en el tratado de Sunzi (entre los siglos III y V) y hoy se usa para acelerar RSA y en aritmética con números grandes.

## Aplicaciones cotidianas
- **Dígitos verificadores:** Hans Peter Luhn, de IBM, patentó en 1960 (solicitud de 1954) el algoritmo que valida números de tarjetas de crédito: detecta cualquier error en un solo dígito y la mayoría de las transposiciones de dígitos vecinos. Los códigos ISBN, los códigos de barras y muchos documentos de identidad usan ideas parecidas.
- **Tablas hash:** h(k) = k mod m; por eso conviene que m sea primo.
- **Generadores pseudoaleatorios:** el generador congruencial de Derrick Lehmer (1949), x(n+1) = (a·x(n) + c) mod m, fue durante décadas el más usado (nunca para seguridad).
- **Rotaciones y turnos:** asignar turnos rotativos o recorrer un búfer circular es sumar módulo n.
Lehman, Leighton y Meyer dedican el capítulo 9 de su libro a la teoría de números precisamente porque es la base de la criptografía que el resto de la carrera da por sentada.`,
  links: [['m4.hash', 'la función hash más simple es un resto módulo m'], ['m16.crypto', 'RSA y Diffie-Hellman son aritmética modular'], ['m1.bin', 'las bases numéricas también son restos sucesivos']],
  read: 'Lehman, Leighton y Meyer, capítulo 9; Rosen, capítulo 4; Knuth, *The Art of Computer Programming*, vol. 2, sección 4.5.',
  terms: [
    ['Máximo común divisor', 'mayor entero que divide a dos números a la vez', ['Simplificas la fracción 48/180 dividiendo entre 12.', 'Compruebas si dos números son coprimos viendo si da 1.', 'Lo calcula el algoritmo de Euclides.']],
    ['Algoritmo de Euclides', 'método que calcula el mcd reemplazando el par (a, b) por (b, a mod b) hasta que b sea cero', ['Calculas mcd(1071, 462) en tres pasos.', 'Es el algoritmo en uso más antiguo que se conoce.', 'Su peor caso son dos números consecutivos de Fibonacci.']],
    ['Congruencia', 'relación entre dos enteros que dejan el mismo resto al dividirlos entre m', ['Las 17 horas y las 5 de la tarde coinciden en un reloj de 12.', 'Dices que 38 ≡ 2 (mod 12).', 'Dos claves caen en la misma casilla de una tabla hash.']],
    ['Inverso modular', 'número que multiplicado por a da 1 módulo m; existe solo si a y m son coprimos', ['Para "dividir" entre 3 módulo 7 multiplicas por 5.', 'En RSA la clave privada d es el inverso de e módulo φ(n).', 'Lo encuentra el algoritmo de Euclides extendido.']],
    ['Número primo', 'entero mayor que 1 cuyos únicos divisores positivos son 1 y él mismo', ['El tamaño de una tabla hash suele elegirse de este tipo.', 'Euclides demostró que hay infinitos.', 'RSA multiplica dos de ellos muy grandes.']],
    ['Pequeño teorema de Fermat', 'resultado que dice que a^(p−1) ≡ 1 (mod p) si p es primo y no divide a a', ['Una prueba rápida de primalidad lo usa para descartar compuestos.', 'Calculas 3^12 mod 13 sin hacer la potencia: da 1.', 'Es un caso particular del teorema de Euler.']],
    ['Exponenciación rápida', 'cálculo de b^e mod m con unas 2·log₂(e) multiplicaciones usando los bits del exponente', ['Calculas 7^560 mod 561 en una fracción de segundo.', 'RSA cifra y descifra con este método.', 'Elevas al cuadrado y multiplicas solo cuando el bit del exponente es 1.']],
    ['Dígito verificador', 'dígito adicional calculado a partir de los demás para detectar errores de digitación', ['La tarjeta de crédito se valida con el algoritmo de Luhn.', 'El último carácter de un ISBN detecta una cifra mal copiada.', 'Un ticket del patio se rechaza si alguien cambió un número.']]
  ],
  q: [
    ['¿Cuánto vale «((-7 % 3) + 3) % 3» en JavaScript?', '2', ['−1', '1', '0'], 'Es el resto matemático no negativo de −7 entre 3.', 2],
    ['¿Por qué no existe el inverso de 4 módulo 10?', 'Porque mcd(4, 10) = 2, no son coprimos', ['Porque 10 no es primo', 'Porque 4 es par y todo par carece de inverso', 'Sí existe y es 4'], 'El inverso existe solo cuando mcd(a, m) = 1.', 3],
    ['En RSA, ¿qué haría falta para obtener la clave privada a partir de la pública?', 'Factorizar n en sus dos primos', ['Calcular un mcd', 'Hacer una exponenciación rápida', 'Conocer el texto cifrado'], 'Con p y q se calcula φ(n) y luego d; factorizar n grande es lo difícil.', 4],
    ['¿Qué tipo de errores detecta con seguridad el algoritmo de Luhn?', 'Cualquier error en un solo dígito', ['Cualquier error posible', 'Solo errores de dos dígitos', 'Ninguno, solo da formato'], 'Detecta todo error de un dígito y la mayoría de las transposiciones de dígitos vecinos.', 3],
    { tf: 'El algoritmo de Euclides necesita un número de pasos proporcional al valor de los números.', v: false, e: 'Es proporcional al número de dígitos (O(log n)), como demostró Lamé.', l: 3 },
    { tf: 'Si p es primo y no divide a a, entonces a^(p−1) mod p = 1.', v: true, e: 'Es el pequeño teorema de Fermat.', l: 2 },
    { i: '¿Cuál es el inverso de 3 módulo 7?', a: 5, e: '3·5 = 15 = 2·7 + 1.', l: 3 },
    { c: 'Escribe «mcd(a, b)» con el algoritmo de Euclides.', f: 'mcd', p: ['a', 'b'], t: [[[48, 18], 6], [[17, 5], 1], [[0, 9], 9], [[100, 75], 25]], sol: '  while (b !== 0) { const t = a % b; a = b; b = t; }\n  return a;', h: 'mcd(a, b) = mcd(b, a mod b).', l: 2 },
    { c: 'Escribe «potMod(b, e, m)» con exponenciación rápida (los resultados caben en números normales).', f: 'potMod', p: ['b', 'e', 'm'], t: [[[2, 10, 1000], 24], [[3, 200, 13], 9], [[7, 0, 5], 1], [[4, 13, 497], 445]], sol: '  let r = 1; b = b % m;\n  while (e > 0) { if (e % 2 === 1) r = (r * b) % m; b = (b * b) % m; e = Math.floor(e / 2); }\n  return r;', h: 'Multiplica el resultado cuando el bit actual del exponente es 1 y eleva la base al cuadrado en cada vuelta.', l: 4 },
    { c: 'Escribe «luhnValido(s)» que reciba un texto de dígitos y diga si cumple el algoritmo de Luhn.', f: 'luhnValido', p: ['s'], t: [[['79927398713'], true], [['79927398710'], false], [['4111111111111111'], true], [['1234567812345678'], false]], sol: '  let suma = 0;\n  for (let i = 0; i < s.length; i++) {\n    let d = Number(s[s.length - 1 - i]);\n    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }\n    suma += d;\n  }\n  return suma % 10 === 0;', h: 'Desde la derecha, duplica uno de cada dos dígitos y resta 9 si pasa de 9; la suma debe ser múltiplo de 10.', l: 4 }
  ],
  gen: function (g) {
    function mcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
    g.times(8, function (R) { var k = R.int(2, 15), a = k * R.int(2, 20), b = k * R.int(2, 20); g.input(2, '¿Cuál es el mcd(' + a + ', ' + b + ')?', mcd(a, b), 'Con Euclides se llega a ' + mcd(a, b) + '.'); });
    g.times(6, function (R) { var a = -R.int(1, 50), m = R.int(3, 12), r = ((a % m) + m) % m; g.input(3, 'Calcula el resto matemático (no negativo) de ' + a + ' módulo ' + m + '.', r, '((' + a + ' % ' + m + ') + ' + m + ') % ' + m + ' = ' + r + '.'); });
    g.times(6, function (R) { var m = R.pick([7, 11, 13, 17]), a = R.int(2, m - 1), x = 1; while ((a * x) % m !== 1) x++; g.input(3, '¿Cuál es el inverso de ' + a + ' módulo ' + m + '?', x, a + '·' + x + ' = ' + a * x + ' ≡ 1 (mod ' + m + ').'); });
    g.times(6, function (R) { var b = R.int(2, 9), e = R.int(5, 40), m = R.pick([7, 11, 13, 100]), r = 1; for (var i = 0; i < e; i++) r = (r * b) % m; g.input(4, 'Calcula ' + b + '^' + e + ' mod ' + m + ' (reduce en cada paso).', r, 'Reduciendo módulo ' + m + ' en cada multiplicación se obtiene ' + r + '.'); });
    g.times(4, function (R) { var h = R.int(0, 23), d = R.int(5, 100), r = (h + d) % 24; g.input(2, 'Son las ' + h + ':00. ¿Qué hora será dentro de ' + d + ' horas (formato de 24 horas, solo el número)?', r, '(' + h + ' + ' + d + ') mod 24 = ' + r + '.'); });
  },
  checks: [
    ['Explica en una frase por qué el algoritmo de Euclides termina.', 'Porque el segundo número (el resto) es siempre menor que el anterior y no negativo; una sucesión de enteros decreciente llega a cero.'],
    ['¿Por qué se dice que en aritmética modular "no se divide"?', 'Porque la división se reemplaza por multiplicar por el inverso modular, que solo existe cuando el número es coprimo con el módulo.'],
    ['¿Qué hace rápida a la exponenciación por cuadrados?', 'Procesa el exponente bit a bit: en cada paso eleva la base al cuadrado y multiplica solo si el bit es 1, así usa unas 2·log₂(e) multiplicaciones.'],
    ['¿En qué se basa la seguridad de RSA?', 'En que es muy difícil factorizar el producto de dos primos grandes; sin los factores no se puede calcular φ(n) ni la clave privada.'],
    ['¿Por qué un dígito verificador no detecta todos los errores?', 'Porque es un solo dígito: hay pocas combinaciones posibles, y algunos errores (varios dígitos cambiados) producen por casualidad el mismo verificador.']
  ],
  cites: ['Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT. Capítulo 9.', 'Knuth, D. E. (1997). *The Art of Computer Programming, Vol. 2: Seminumerical Algorithms* (3.ª ed.). Addison-Wesley.', 'Rivest, R., Shamir, A. y Adleman, L. (1978). A Method for Obtaining Digital Signatures and Public-Key Cryptosystems. *Communications of the ACM*, 21(2).', 'Rosen, K. (2019). *Discrete Mathematics and Its Applications* (8.ª ed.). McGraw-Hill. Capítulo 4.', 'Luhn, H. P. (1960). *Computer for Verifying Numbers*. Patente de EE. UU. 2 950 048.'],
  project: { t: 'Caja de herramientas de teoría de números',
    goal: 'Implementar los algoritmos clásicos y usarlos para un RSA de juguete y para validar códigos.',
    steps: ['Implementa la criba de Eratóstenes, el mcd, el Euclides extendido, el inverso modular y la exponenciación rápida con BigInt.', 'Reproduce el RSA de juguete con p = 61 y q = 53: genera las claves, cifra un número y descífralo.', 'Implementa el algoritmo de Luhn para generar y validar códigos.', 'Escribe un experimento que cambie al azar un dígito o intercambie dos dígitos vecinos en 10 000 códigos y mida cuántos errores detecta Luhn.', 'Explica por escrito por qué tu RSA de juguete no es seguro.'],
    deliver: 'El código, el resultado del experimento y la explicación.' },
  hito: ['Agrega a los tickets internos de PatioApp un dígito verificador con el algoritmo de Luhn y rechaza los códigos mal digitados.', 'Asigna un espacio inicial sugerido con aritmética modular (código de la placa mod capacidad) y mide cuántas colisiones se producen con 200 unidades.']
});

S('mat2', 'mat2.calc', { title: 'Cálculo para la computación',
  ask: '¿Qué idea del cálculo se usa aquí?',
  lesson: `
> **La idea en simple.** El velocímetro de un auto no mide la distancia recorrida: mide qué tan rápido cambia. El cuentakilómetros, en cambio, acumula. El cálculo estudia justamente esas dos ideas: el **cambio instantáneo** (derivada) y la **acumulación** (integral).

## Por qué está en la malla de software
Isaac Newton y Gottfried Leibniz desarrollaron el cálculo de forma independiente en el siglo XVII. Para un ingeniero de software aparece en cuatro lugares: el **análisis asintótico** (límites para comparar crecimientos), la **optimización** (encontrar el mejor valor, como hace el entrenamiento de una red neuronal), los **métodos numéricos** (calcular raíces, integrales y funciones como «Math.sin») y el **modelado** de sistemas que cambian con el tiempo (carga de un servidor, física de un videojuego). James Stewart, en *Cálculo*, y Gilbert Strang, en su *Calculus* gratuito del MIT, son las referencias más usadas.

## Límites y crecimiento
El límite describe a qué valor se acerca una función. Sirve para comparar algoritmos: si lim f(n)/g(n) cuando n → ∞ es una constante positiva, f y g crecen igual (Θ); si es 0, f crece más lento.
- lim (3n² + 5n)/n² = 3, así que 3n² + 5n = Θ(n²).
- lim (log n)/n = 0: el logaritmo crece más lento que cualquier potencia de n.
- lim n^100/2ⁿ = 0: toda exponencial termina superando a todo polinomio.
La **regla de L'Hôpital** (derivar numerador y denominador) resuelve los casos ∞/∞ que aparecen al comparar n log n con n^1.5, por ejemplo.

## Derivadas: el ritmo de cambio
La derivada f′(x) es la pendiente de la curva en un punto: lim (f(x + h) − f(x))/h cuando h → 0. Reglas que bastan para casi todo:
| Función | Derivada |
| xⁿ | n·xⁿ⁻¹ |
| eˣ | eˣ |
| ln x | 1/x |
| f + g | f′ + g′ |
| f·g | f′g + fg′ |
| f(g(x)) | f′(g(x))·g′(x) (regla de la cadena) |
La **regla de la cadena** es el corazón del algoritmo de retropropagación con el que se entrenan las redes neuronales: el error se propaga hacia atrás multiplicando derivadas capa por capa. Lo verás en el módulo de inteligencia artificial.

## Optimizar
En un máximo o un mínimo, la pendiente es cero: se buscan los puntos donde f′(x) = 0 y se revisa el signo de la segunda derivada. Ejemplo: si el costo de mantener una cola es C(n) = 500/n + 2n (menos servidores, más espera; más servidores, más costo), el mínimo está donde C′(n) = −500/n² + 2 = 0, es decir n = √250 ≈ 16.
Cuando la función tiene miles de variables y no se puede resolver a mano, se usa el **descenso por gradiente**: dar pequeños pasos en la dirección opuesta a la derivada.
~~~js
// Minimizar f(x) = (x − 3)² + 1 con descenso por gradiente
let x = 10, tasa = 0.1;
for (let i = 0; i < 50; i++) { const derivada = 2 * (x - 3); x = x - tasa * derivada; }
console.log('mínimo cerca de x =', x.toFixed(4));
~~~

## Integrales: acumular
La integral definida ∫ₐᵇ f(x) dx es el área bajo la curva, el límite de las **sumas de Riemann** (sumar rectángulos cada vez más finos). El **teorema fundamental del cálculo** conecta ambas ideas: si F′ = f, entonces ∫ₐᵇ f = F(b) − F(a).
En software se usa para acumular (bytes transferidos a partir de una velocidad, horas-vehículo en un patio a partir de la ocupación) y para **acotar sumas**: la suma 1 + 1/2 + … + 1/n queda entre ln(n + 1) y 1 + ln n, comparándola con el área bajo 1/x. Así se demuestra que la serie armónica crece como el logaritmo.
Cuando no hay fórmula, se integra numéricamente: la **regla del trapecio** y la **de Simpson** aproximan el área con trapecios o parábolas.

## Series de Taylor: cómo calcula la computadora
Una función suave se puede aproximar con un polinomio alrededor de un punto: eˣ ≈ 1 + x + x²/2! + x³/3! + … Las bibliotecas matemáticas calculan «Math.exp» y «Math.sin» con polinomios bien elegidos (y reducciones del argumento), porque la CPU solo sabe sumar y multiplicar. Saber esto explica por qué los resultados de punto flotante pueden diferir en el último decimal entre plataformas.

## El método de Newton
Para encontrar donde f(x) = 0, Newton propuso repetir x ← x − f(x)/f′(x). Aplicado a f(x) = x² − a da la fórmula babilónica para la raíz cuadrada, x ← (x + a/x)/2, que ya usaba Herón de Alejandría. Su convergencia es **cuadrática**: la cantidad de dígitos correctos se duplica en cada paso.
~~~js
function raiz(a) { let x = a > 1 ? a : 1; for (let i = 0; i < 6; i++) { x = (x + a / x) / 2; console.log(i + 1, x); } return x; }
raiz(2);
~~~
Richard Burden y Douglas Faires, en *Numerical Analysis*, explican cuándo converge, cuándo no y cómo controlar el error, que siempre combina el error del método con el del redondeo de punto flotante.

## Errores frecuentes
- Confundir la derivada (ritmo de cambio) con el valor de la función: que la carga del servidor esté creciendo rápido no significa que ya sea alta.
- Calcular derivadas numéricas con un h demasiado pequeño: el error de redondeo crece y el resultado empeora en vez de mejorar.
- Creer que el descenso por gradiente siempre encuentra el mínimo global: en funciones con varios valles puede quedar atrapado en un mínimo local, y por eso importan el punto de partida y la tasa de aprendizaje.`,
  links: [['m4.bigo', 'los límites formalizan la comparación de crecimientos'], ['m1.data', 'el cálculo numérico convive con el error de punto flotante'], ['m2.prob', 'las distribuciones continuas se manejan con integrales']],
  read: 'Stewart, capítulos 2 a 5 y 11; Strang, *Calculus* (MIT OpenCourseWare); Burden y Faires, capítulos 2 y 4.',
  terms: [
    ['Límite', 'valor al que se acerca una función cuando la variable se acerca a un punto o al infinito', ['Compruebas que (3n² + n)/n² tiende a 3 para decir que crecen igual.', 'Defines la derivada como cociente de diferencias con h tendiendo a cero.', 'Muestras que n^100/2ⁿ tiende a 0.']],
    ['Derivada', 'ritmo de cambio instantáneo de una función, la pendiente de su curva en un punto', ['Mides qué tan rápido crece la carga del servidor en este momento.', 'Buscas donde la pendiente es cero para encontrar un mínimo.', 'La velocidad es la de la posición respecto al tiempo.']],
    ['Regla de la cadena', 'regla para derivar una composición: la derivada de f(g(x)) es f′(g(x))·g′(x)', ['La retropropagación de una red neuronal multiplica derivadas capa por capa.', 'Derivas (3x + 1)⁵ sin expandir el polinomio.', 'Calculas cómo afecta un cambio en la entrada a la salida de varias funciones encadenadas.']],
    ['Integral definida', 'acumulación de una función en un intervalo, equivalente al área bajo su curva', ['Calculas los gigabytes transferidos a partir de la velocidad en cada instante.', 'Sumas las horas-vehículo a partir de la ocupación del patio.', 'Acotas la suma armónica con el área bajo 1/x.']],
    ['Suma de Riemann', 'aproximación de una integral sumando áreas de rectángulos', ['Estimas el área bajo una curva de datos medida cada minuto.', 'Con rectángulos más angostos la aproximación mejora.', 'Es la definición formal de la integral.']],
    ['Serie de Taylor', 'aproximación de una función mediante un polinomio construido con sus derivadas en un punto', ['La biblioteca matemática calcula Math.exp con un polinomio.', 'Aproximas sen x ≈ x para ángulos pequeños.', 'Explicas por qué dos plataformas difieren en el último decimal.']],
    ['Método de Newton', 'procedimiento iterativo x ← x − f(x)/f′(x) para encontrar raíces de una función', ['Calculas √2 con la fórmula x ← (x + 2/x)/2.', 'Duplicas los dígitos correctos en cada paso.', 'Resuelves una ecuación que no tiene fórmula cerrada.']],
    ['Descenso por gradiente', 'método de optimización que avanza en pasos pequeños en contra de la derivada', ['Entrenas un modelo ajustando millones de pesos.', 'Minimizas el error de una regresión paso a paso.', 'Eliges una tasa de aprendizaje ni muy grande ni muy pequeña.']]
  ],
  q: [
    ['¿Cuánto vale lim (5n³ + 2n)/(n³ + 7) cuando n → ∞?', '5', ['∞', '0', '2/7'], 'Dominan los términos de mayor grado: 5n³/n³ = 5.', 2],
    ['¿Cuál es la derivada de f(x) = 4x³ − 2x + 7?', '12x² − 2', ['4x² − 2', '12x³ − 2x', '12x² − 2 + 7'], 'Se aplica n·xⁿ⁻¹ a cada término; la constante desaparece.', 2],
    ['El costo C(n) = 800/n + 2n se minimiza en:', 'n = 20', ['n = 400', 'n = 40', 'n = 10'], 'C′(n) = −800/n² + 2 = 0 → n² = 400 → n = 20.', 4],
    ['¿Qué teorema conecta derivadas e integrales?', 'El teorema fundamental del cálculo', ['El teorema maestro', 'El teorema de Fermat', 'El teorema chino del resto'], 'Si F′ = f, la integral de f entre a y b es F(b) − F(a).', 2],
    ['¿Qué pasa en el descenso por gradiente si la tasa de aprendizaje es demasiado grande?', 'Puede saltar el mínimo y divergir', ['Converge más rápido siempre', 'No cambia nada', 'Encuentra siempre el máximo'], 'Pasos muy grandes oscilan o se alejan del mínimo.', 3],
    { tf: 'El método de Newton duplica aproximadamente la cantidad de dígitos correctos en cada paso cerca de la raíz.', v: true, e: 'Tiene convergencia cuadrática cerca de una raíz simple.', l: 3 },
    { tf: 'La integral de una velocidad en el tiempo da la distancia recorrida.', v: true, e: 'Integrar un ritmo de cambio acumula la cantidad.', l: 2 },
    { i: 'Calcula la integral de 2x entre 0 y 5.', a: 25, e: 'Una primitiva es x²: 25 − 0 = 25.', l: 3 },
    { c: 'Escribe «evalPoly(c, x)» donde c[i] es el coeficiente de x^i.', f: 'evalPoly', p: ['c', 'x'], t: [[[[1, 2, 3], 2], 17], [[[0, 0, 1], 5], 25], [[[4], 10], 4]], sol: '  let r = 0;\n  for (let i = c.length - 1; i >= 0; i--) r = r * x + c[i];\n  return r;', h: 'El método de Horner evalúa de mayor a menor grado: r = r·x + c[i].', l: 3 },
    { c: 'Escribe «derivPoly(c)» que devuelva los coeficientes de la derivada (c[i] es el coeficiente de x^i).', f: 'derivPoly', p: ['c'], t: [[[[1, 2, 3]], [2, 6]], [[[5]], []], [[[0, 0, 0, 4]], [0, 0, 12]]], sol: '  return c.slice(1).map((a, i) => a * (i + 1));', h: 'El término a·x^i pasa a ser i·a·x^(i−1).', l: 3 },
    { c: 'Escribe «raizNewton(a)» que calcule √a con el método de Newton y devuelva el resultado redondeado a 6 decimales.', f: 'raizNewton', p: ['a'], t: [[[2], 1.414214], [[9], 3], [[0.25], 0.5]], sol: '  if (a === 0) return 0;\n  let x = a > 1 ? a : 1;\n  for (let i = 0; i < 60; i++) x = (x + a / x) / 2;\n  return Math.round(x * 1e6) / 1e6;', h: 'Repite x = (x + a/x)/2 y redondea con Math.round(x·1e6)/1e6.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 6), b = R.int(-5, 5), c = R.int(-9, 9), x = R.int(-3, 4), d = 2 * a * x + b; g.input(3, 'Si f(x) = ' + a + 'x² + (' + b + ')x + (' + c + '), ¿cuánto vale f′(' + x + ')?', d, 'f′(x) = ' + 2 * a + 'x + (' + b + '); evaluada en ' + x + ' da ' + d + '.'); });
    g.times(6, function (R) { var a = R.int(1, 4), u = R.int(1, 4), v = u + R.int(1, 4), r = a * (v * v * v - u * u * u); g.input(3, 'Calcula la integral de ' + 3 * a + 'x² entre ' + u + ' y ' + v + '.', r, 'Una primitiva es ' + a + 'x³: ' + a + '·(' + v + '³ − ' + u + '³) = ' + r + '.'); });
    g.times(5, function (R) { var a = R.int(2, 9), b = R.int(2, 9), k = R.int(1, 3); g.input(2, '¿A qué valor tiende (' + a + 'n^' + k + ' + 3)/(' + b + 'n^' + k + ' + 1) cuando n crece? Redondea a 2 decimales.', (a / b).toFixed(2), 'Dominan los términos de mayor grado: ' + a + '/' + b + ' ≈ ' + (a / b).toFixed(2) + '.'); });
    g.times(5, function (R) { var a = R.pick([2, 3, 5, 7, 10]), x0 = R.int(1, 4), x1 = (x0 + a / x0) / 2; g.input(3, 'Para calcular √' + a + ' con Newton empiezas en x₀ = ' + x0 + '. ¿Cuánto vale x₁? Redondea a 3 decimales.', x1.toFixed(3), 'x₁ = (x₀ + a/x₀)/2 = (' + x0 + ' + ' + a + '/' + x0 + ')/2 = ' + x1.toFixed(3) + '.'); });
    g.times(4, function (R) { var n = R.int(5, 30), A = 2 * n * n; g.input(4, 'El costo es C(n) = ' + A + '/n + 2n. ¿Para qué n es mínimo?', n, 'C′(n) = −' + A + '/n² + 2 = 0 → n² = ' + A / 2 + ' → n = ' + n + '.'); });
  },
  checks: [
    ['¿Cómo se usa un límite para decidir si f = Θ(g)?', 'Se calcula lim f(n)/g(n) cuando n tiende a infinito: si da una constante positiva, crecen igual; si da 0, f crece más lento; si da infinito, más rápido.'],
    ['¿Por qué la regla de la cadena es importante para la inteligencia artificial?', 'Porque la retropropagación calcula cómo influye cada peso en el error multiplicando derivadas a través de las capas, que es aplicar la regla de la cadena.'],
    ['Explica con tus palabras qué hace el descenso por gradiente.', 'Da pasos pequeños en la dirección en que la función baja más rápido (contraria a la derivada) hasta llegar cerca de un mínimo.'],
    ['¿Cómo se usa una integral para acotar la suma armónica?', 'Comparando los rectángulos de la suma con el área bajo 1/x: la suma queda entre ln(n + 1) y 1 + ln n, así que crece como el logaritmo.'],
    ['¿Por qué Math.sin puede dar resultados ligeramente distintos en dos plataformas?', 'Porque se calcula con aproximaciones polinómicas y reducciones del argumento implementadas de forma distinta, y cada operación de punto flotante redondea.']
  ],
  cites: ['Stewart, J., Clegg, D. y Watson, S. (2020). *Calculus: Early Transcendentals* (9.ª ed.). Cengage.', 'Strang, G. (2017). *Calculus* (3.ª ed.). Wellesley-Cambridge Press; libre en MIT OpenCourseWare.', 'Burden, R., Faires, J. D. y Burden, A. (2015). *Numerical Analysis* (10.ª ed.). Cengage.', 'Spivak, M. (2008). *Calculus* (4.ª ed.). Publish or Perish.'],
  project: { t: 'Laboratorio de cálculo numérico',
    goal: 'Programar las ideas del cálculo y comprobar con números lo que dicen los teoremas.',
    steps: ['Implementa la derivada numérica con diferencias finitas y observa cómo el error baja y luego sube al achicar h (por el redondeo).', 'Implementa las reglas del trapecio y de Simpson y compara su error al integrar x³ y sen x.', 'Implementa el método de Newton para raíces cuadradas y cúbicas, y muestra cuántos dígitos correctos gana en cada paso.', 'Minimiza con descenso por gradiente una función de dos variables y prueba tres tasas de aprendizaje distintas.', 'Aproxima eˣ con su serie de Taylor y grafica el error según la cantidad de términos.'],
    deliver: 'El código, los gráficos de error y una explicación de cada resultado.' },
  hito: ['Calcula con el método de Newton las distancias entre espacios del patio (raíces cuadradas) sin usar Math.sqrt y compara con el valor de la biblioteca.', 'Estima con una suma de Riemann las horas-vehículo de un día a partir de la ocupación registrada cada hora.']
});

S('mat2', 'mat2.lin', { title: 'Álgebra lineal para la computación',
  ask: '¿Qué concepto de álgebra lineal se aplica?',
  lesson: `
> **La idea en simple.** Una hoja de cálculo es una matriz; cada fila de clientes, un vector. Girar una imagen, recomendar una película o encontrar la página más importante de la web son operaciones con vectores y matrices.

## Por qué todas las universidades la exigen
Gilbert Strang dictó durante décadas el curso 18.06 del MIT, uno de los más vistos de la historia en línea, con una tesis: el álgebra lineal es la matemática más útil para las aplicaciones. Gráficos por computadora, aprendizaje automático, buscadores, compresión de imágenes, robótica y simulaciones dependen de ella. Su libro *Introduction to Linear Algebra* y la serie de videos *Essence of Linear Algebra* de Grant Sanderson (3Blue1Brown, 2016) son la mejor forma de empezar; *Linear Algebra Done Right* de Sheldon Axler, la de profundizar.

## Vectores
Un vector es una lista ordenada de números que puede verse como una flecha (geometría) o como un registro de datos (una unidad con km, año y precio). Operaciones:
- **Suma** componente a componente y **multiplicación por un escalar**.
- **Producto punto:** a·b = a₁b₁ + a₂b₂ + … Mide cuánto apuntan en la misma dirección: a·b = |a||b|cos θ. Si es cero, los vectores son **perpendiculares**.
- **Norma:** |a| = √(a·a), la longitud. La distancia entre dos puntos es la norma de su diferencia.
- **Similitud coseno:** a·b / (|a||b|). Los buscadores y los sistemas de recomendación comparan documentos o usuarios representados como vectores; los modelos de lenguaje representan palabras como vectores (*embeddings*) y las palabras de significado parecido quedan cerca.
~~~js
const punto = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norma = a => Math.sqrt(punto(a, a));
const coseno = (a, b) => punto(a, b) / (norma(a) * norma(b));
const u1 = [0.8, 0.3, 0.5], u2 = [0.7, 0.4, 0.5], u3 = [0.1, 0.9, 0.0];   // unidades normalizadas (km, año, precio)
console.log('u1~u2', coseno(u1, u2).toFixed(3), '· u1~u3', coseno(u1, u3).toFixed(3));
~~~

## Matrices como transformaciones
Una matriz no es solo una tabla: es una **función lineal** que transforma vectores. Una matriz de 2×2 dice a dónde van los vectores (1, 0) y (0, 1); todo lo demás sigue.
| Transformación | Matriz |
| Escalar por k | [[k, 0], [0, k]] |
| Rotar un ángulo θ | [[cos θ, −sen θ], [sen θ, cos θ]] |
| Reflejar sobre el eje x | [[1, 0], [0, −1]] |
Las tarjetas gráficas aplican millones de estas transformaciones por segundo. Para incluir traslaciones se usan **coordenadas homogéneas** (matrices de 3×3 en 2D y 4×4 en 3D), el estándar de OpenGL, WebGL y los motores de videojuegos.

## Multiplicar matrices
El elemento (i, j) de A·B es el producto punto de la fila i de A con la columna j de B. Componer dos transformaciones es multiplicar sus matrices, y por eso **el orden importa**: en general A·B ≠ B·A (rotar y luego trasladar no es lo mismo que trasladar y luego rotar). El algoritmo directo cuesta O(n³); Volker Strassen sorprendió en 1969 mostrando uno de O(n^2.81), y desde entonces se buscan exponentes menores. En la práctica, las bibliotecas optimizadas (BLAS) y las GPU hacen que estas operaciones sean la base del aprendizaje profundo.

## Sistemas de ecuaciones y eliminación
Un sistema de ecuaciones lineales es A·x = b. La **eliminación gaussiana** (que lleva el nombre de Gauss, aunque el método aparece en el texto chino *Los nueve capítulos sobre el arte matemático*, de alrededor del siglo II) lo resuelve restando múltiplos de filas hasta obtener una forma triangular, con un costo O(n³). Un sistema puede tener una solución, ninguna o infinitas; lo decide el **rango** de la matriz.

## Determinante, inversa y rango
- El **determinante** mide cuánto escala el área (o volumen) una transformación. Si es cero, la transformación aplasta el espacio a una dimensión menor y la matriz **no tiene inversa**. Para 2×2: det [[a, b], [c, d]] = ad − bc.
- La **inversa** A⁻¹ deshace la transformación: A·A⁻¹ = I. En la práctica casi nunca se calcula explícitamente; se resuelve el sistema, que es más rápido y estable numéricamente.
- El **rango** es la cantidad de direcciones independientes; indica cuánta información real hay en los datos.

## Vectores propios: los que no cambian de dirección
Un vector propio v de A cumple A·v = λv: la transformación solo lo estira por un factor λ (el valor propio). Aplicaciones famosas:
- **PageRank:** Sergey Brin y Larry Page (1998) ordenaron la web calculando el vector propio principal de la matriz de enlaces: la importancia de una página es la que le transmiten las páginas que la enlazan.
- **Análisis de componentes principales:** encuentra las direcciones de mayor variación de los datos para reducir dimensiones.
- **Descomposición en valores singulares (SVD):** factoriza cualquier matriz; fue clave en el concurso de recomendaciones de Netflix (2006-2009) y en la compresión de imágenes.

## Mínimos cuadrados
Adrien-Marie Legendre (1805) y Carl Friedrich Gauss propusieron ajustar una recta a datos con error minimizando la suma de los cuadrados de los errores. En álgebra lineal es proyectar el vector de datos sobre el espacio de las soluciones posibles. Es la **regresión lineal**, el primer modelo de aprendizaje automático que estudiarás.

## Errores frecuentes
- Multiplicar matrices con dimensiones incompatibles: una de m×n solo se multiplica por una de n×p, y el resultado es m×p.
- Suponer que A·B = B·A: el orden de las transformaciones cambia el resultado.
- Comparar vectores de características sin **normalizarlos**: si el kilometraje va de 0 a 300 000 y el año de 2000 a 2026, el kilometraje domina cualquier distancia o similitud. Escala cada columna a un rango comparable antes de comparar.`,
  links: [['m9.front', 'las transformaciones con matrices mueven y giran lo que se dibuja en pantalla'], ['m4.graphs', 'PageRank es un vector propio de la matriz de un grafo'], ['mat2.calc', 'la optimización por gradiente opera sobre vectores de parámetros']],
  read: 'Strang, *Introduction to Linear Algebra*, capítulos 1 a 6; Axler, *Linear Algebra Done Right*; Sanderson, *Essence of Linear Algebra* (videos).',
  terms: [
    ['Vector', 'lista ordenada de números que representa una magnitud con dirección o un registro de características', ['Representas una unidad como [km, año, precio].', 'Una palabra se codifica como una lista de 768 números.', 'Un punto del plano del patio es (x, y).']],
    ['Producto punto', 'suma de los productos componente a componente de dos vectores', ['Calculas qué tan parecidos son dos perfiles de cliente.', 'Si da cero, los vectores son perpendiculares.', 'Cada elemento de un producto de matrices es uno de estos.']],
    ['Norma', 'longitud de un vector, la raíz cuadrada de su producto punto consigo mismo', ['Calculas la distancia en metros entre dos espacios del patio.', 'Normalizas un vector dividiéndolo entre esta cantidad.', 'Mides la magnitud del error de un modelo.']],
    ['Multiplicación de matrices', 'operación que compone transformaciones; cada elemento es el producto punto de una fila por una columna', ['Aplicas una rotación y luego un escalado en una sola matriz.', 'Una capa de una red neuronal hace exactamente esto con sus pesos.', 'Al cambiar el orden obtienes otro resultado.']],
    ['Matriz identidad', 'matriz cuadrada con unos en la diagonal y ceros fuera, que deja igual a todo vector', ['Multiplicas cualquier matriz por ella y no cambia.', 'Es el resultado de multiplicar una matriz por su inversa.', 'Representa la transformación "no hacer nada".']],
    ['Determinante', 'número que indica cuánto escala el área o volumen una transformación; si es cero la matriz no es invertible', ['Compruebas si un sistema de ecuaciones tiene solución única.', 'Para [[a, b], [c, d]] calculas ad − bc.', 'Una transformación que aplasta el plano en una recta da este valor en cero.']],
    ['Matriz inversa', 'matriz que deshace la transformación de otra, de modo que su producto es la identidad', ['Quieres volver a las coordenadas originales después de rotar.', 'Solo existe si el determinante no es cero.', 'En la práctica se prefiere resolver el sistema en lugar de calcularla.']],
    ['Vector propio', 'vector que una transformación solo estira o encoge, sin cambiar su dirección', ['PageRank calcula el principal de la matriz de enlaces de la web.', 'El análisis de componentes principales busca las direcciones de mayor variación.', 'Cumple A·v = λv.']]
  ],
  q: [
    ['¿Cuánto vale el producto punto de (1, 2, 3) y (4, −5, 6)?', '12', ['32', '0', '−12'], '4 − 10 + 18 = 12.', 2],
    ['Si el producto punto de dos vectores no nulos es 0, son:', 'Perpendiculares', ['Paralelos', 'Iguales', 'Opuestos'], 'cos θ = 0 implica un ángulo de 90°.', 2],
    ['¿Cuál es el determinante de [[3, 8], [4, 6]]?', '−14', ['14', '50', '−50'], '3·6 − 8·4 = 18 − 32 = −14.', 3],
    ['¿Por qué al componer transformaciones importa el orden de las matrices?', 'Porque la multiplicación de matrices no es conmutativa', ['Porque las matrices siempre son cuadradas', 'Porque el determinante cambia de signo', 'No importa el orden'], 'En general A·B ≠ B·A.', 3],
    ['¿Qué calcula PageRank, en términos de álgebra lineal?', 'El vector propio principal de la matriz de enlaces', ['La inversa de la matriz de enlaces', 'El determinante del grafo', 'El producto punto de todas las páginas'], 'La importancia de cada página es un punto fijo de la transformación definida por los enlaces.', 4],
    { tf: 'Una matriz con determinante cero no tiene inversa.', v: true, e: 'Aplasta el espacio a una dimensión menor y la transformación no se puede deshacer.', l: 2 },
    { tf: 'Multiplicar dos matrices de n×n con el algoritmo directo cuesta O(n²).', v: false, e: 'Cuesta O(n³): n² elementos, cada uno con un producto punto de n términos.', l: 3 },
    { i: '¿Cuál es la norma del vector (3, 4)?', a: 5, e: '√(9 + 16) = 5.', l: 2 },
    { c: 'Escribe «productoPunto(a, b)».', f: 'productoPunto', p: ['a', 'b'], t: [[[[1, 2, 3], [4, 5, 6]], 32], [[[1, 0], [0, 1]], 0], [[[2], [3]], 6]], sol: '  let s = 0;\n  for (let i = 0; i < a.length; i++) s += a[i] * b[i];\n  return s;', l: 2 },
    { c: 'Escribe «multMatriz(A, B)» que multiplique dos matrices compatibles.', f: 'multMatriz', p: ['A', 'B'], t: [[[[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [[19, 22], [43, 50]]], [[[[1, 2]], [[3], [4]]], [[11]]], [[[[1, 0], [0, 1]], [[9, 8], [7, 6]]], [[9, 8], [7, 6]]]], sol: '  return A.map(f => B[0].map((_, j) => f.reduce((s, x, k) => s + x * B[k][j], 0)));', h: 'El elemento (i, j) es el producto punto de la fila i de A con la columna j de B.', l: 3 },
    { c: 'Escribe «resolver2x2(a, b, c, d, e, f)» para el sistema ax + by = e, cx + dy = f. Devuelve [x, y] o null si no hay solución única.', f: 'resolver2x2', p: ['a', 'b', 'c', 'd', 'e', 'f'], t: [[[1, 1, 1, -1, 10, 2], [6, 4]], [[2, 0, 0, 4, 8, 8], [4, 2]], [[1, 2, 2, 4, 3, 6], null]], sol: '  const det = a * d - b * c;\n  if (det === 0) return null;\n  return [(e * d - b * f) / det, (a * f - e * c) / det];', h: 'Usa la regla de Cramer con el determinante ad − bc.', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)], b = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)], d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; g.input(2, 'Calcula el producto punto de (' + a.join(', ') + ') y (' + b.join(', ') + ').', d, 'Suma de productos: ' + d + '.'); });
    g.times(8, function (R) { var a = R.int(-6, 6), b = R.int(-6, 6), c = R.int(-6, 6), d = R.int(-6, 6); g.input(3, '¿Cuál es el determinante de [[' + a + ', ' + b + '], [' + c + ', ' + d + ']]?', a * d - b * c, 'ad − bc = ' + a * d + ' − ' + b * c + ' = ' + (a * d - b * c) + '.'); });
    g.times(6, function (R) { var A = [[R.int(0, 4), R.int(0, 4)], [R.int(0, 4), R.int(0, 4)]], B = [[R.int(0, 4), R.int(0, 4)], [R.int(0, 4), R.int(0, 4)]], i = R.int(0, 1), j = R.int(0, 1), v = A[i][0] * B[0][j] + A[i][1] * B[1][j]; g.input(3, 'A = [[' + A[0] + '], [' + A[1] + ']] y B = [[' + B[0] + '], [' + B[1] + ']]. ¿Cuánto vale el elemento de la fila ' + (i + 1) + ', columna ' + (j + 1) + ' de A·B?', v, 'Fila ' + (i + 1) + ' de A por columna ' + (j + 1) + ' de B = ' + v + '.'); });
    g.times(5, function (R) { var t = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]); g.input(2, '¿Cuál es la distancia entre los espacios (0, 0) y (' + t[0] + ', ' + t[1] + ') del plano del patio?', t[2], '√(' + t[0] + '² + ' + t[1] + '²) = ' + t[2] + '.'); });
    g.times(4, function (R) { var x = R.int(-5, 5), y = R.int(-5, 5); g.input(4, 'Aplica una rotación de 90° en sentido antihorario (matriz [[0, −1], [1, 0]]) al punto (' + x + ', ' + y + '). Escribe el resultado como x,y.', (-y) + ',' + x, 'La rotación de 90° lleva (x, y) a (−y, x) = (' + (-y) + ', ' + x + ').'); });
  },
  checks: [
    ['¿Qué significa que el producto punto de dos vectores sea cero?', 'Que son perpendiculares (si no son nulos): no tienen componente en la dirección del otro.'],
    ['Explica por qué una matriz es una transformación.', 'Porque al multiplicarla por un vector produce otro vector de forma lineal; sus columnas indican a dónde van los vectores base y el resto se deduce.'],
    ['¿Por qué en la práctica se resuelve A·x = b en lugar de calcular A⁻¹?', 'Porque resolver el sistema (por eliminación o factorización) es más rápido y más estable numéricamente que calcular la inversa y multiplicar.'],
    ['¿Qué tiene que ver la similitud coseno con un buscador?', 'Los documentos y la consulta se representan como vectores; los resultados más parecidos son los de mayor similitud coseno con la consulta.'],
    ['¿Qué es un vector propio y por qué lo usa PageRank?', 'Un vector que la transformación solo estira, sin cambiar de dirección. PageRank busca la distribución de importancia que se mantiene estable al repartirla por los enlaces, que es el vector propio principal.']
  ],
  cites: ['Strang, G. (2023). *Introduction to Linear Algebra* (6.ª ed.). Wellesley-Cambridge Press.', 'Axler, S. (2024). *Linear Algebra Done Right* (4.ª ed.). Springer. Acceso abierto.', 'Brin, S. y Page, L. (1998). The Anatomy of a Large-Scale Hypertextual Web Search Engine. *Computer Networks and ISDN Systems*, 30.', 'Strassen, V. (1969). Gaussian Elimination is not Optimal. *Numerische Mathematik*, 13.', 'Sanderson, G. (2016). *Essence of Linear Algebra*. 3Blue1Brown.'],
  project: { t: 'Plano del patio y recomendador por similitud',
    goal: 'Aplicar vectores y matrices a gráficos y a recomendaciones con datos propios.',
    steps: ['Implementa vectores y matrices (suma, producto punto, norma, multiplicación, determinante) con pruebas.', 'Dibuja en un canvas el plano de un patio y aplica rotación, escalado y traslación con coordenadas homogéneas.', 'Implementa eliminación gaussiana para sistemas de 3×3 y compárala con la regla de Cramer.', 'Representa 50 unidades como vectores normalizados y recomienda las 3 más parecidas a una dada con similitud coseno.', 'Implementa PageRank con el método de la potencia sobre un grafo pequeño de páginas.'],
    deliver: 'La librería con pruebas, la página con el plano transformado y los resultados del recomendador y de PageRank.' },
  hito: ['Representa cada espacio de PatioApp con coordenadas (x, y), calcula distancias y dibuja el plano del patio rotado con una matriz de rotación.', 'Sugiere unidades parecidas a una dada usando similitud coseno sobre kilometraje, año y precio normalizados.']
});

S('mat2', 'mat2.stat', { title: 'Estadística e inferencia',
  ask: '¿Qué concepto estadístico se aplica?',
  lesson: `
> **La idea en simple.** Un promedio de 2 días en patio suena bien, pero si la mitad de las unidades sale en 1 día y unas pocas pasan 30, el promedio miente. La estadística enseña a describir datos sin engañar y a sacar conclusiones de una muestra sabiendo cuánto podemos equivocarnos.

## Describir: centro y dispersión
- **Media:** suma entre cantidad. Sensible a valores extremos.
- **Mediana:** el valor del medio al ordenar. Robusta ante extremos; para tiempos de respuesta o ingresos suele ser más honesta.
- **Moda:** el valor más frecuente.
- **Varianza y desviación estándar:** cuánto se alejan los datos de la media. En una **muestra** se divide entre n − 1 (corrección de Bessel) para no subestimar la variabilidad real.
- **Percentiles:** el p95 es el valor bajo el cual queda el 95% de los datos. Por eso los SLO de latencia usan p95 o p99 y no promedios.
- **Rango intercuartílico** (entre p25 y p75): base de los diagramas de caja y de la detección de valores atípicos.
Francis Anscombe mostró en 1973 cuatro conjuntos de datos (el **cuarteto de Anscombe**) con la misma media, varianza, correlación y recta de regresión, pero formas completamente distintas al graficarlos. Lección: **siempre grafica los datos** antes de resumirlos.
~~~js
const dias = [1, 1, 2, 1, 2, 1, 3, 2, 1, 30];
const orden = [...dias].sort((a, b) => a - b), n = dias.length;
const media = dias.reduce((s, x) => s + x, 0) / n;
const mediana = (orden[n / 2 - 1] + orden[n / 2]) / 2;
const sd = Math.sqrt(dias.reduce((s, x) => s + (x - media) ** 2, 0) / (n - 1));
console.log({ media, mediana, sd: sd.toFixed(2) });   // la media engaña; la mediana no
~~~

## La distribución normal y el teorema central del límite
La **distribución normal** (la campana de Gauss) aparece cuando un valor resulta de sumar muchos efectos pequeños e independientes. Regla práctica: alrededor del 68% de los datos cae a una desviación estándar de la media, 95% a dos y 99.7% a tres. El **puntaje z**, (x − media)/desviación, dice a cuántas desviaciones está un valor.
El **teorema central del límite** explica por qué la normal está en todas partes: la media de muchas muestras independientes se distribuye aproximadamente normal, **aunque los datos originales no lo sean**. Eso permite calcular márgenes de error para promedios de casi cualquier cosa. Cuidado: muchos datos de software (latencias, tamaños de archivos) tienen colas largas y están lejos de ser normales; la normalidad aplica a la **media** de muestras grandes, no a cada dato.

## Inferencia: de la muestra a la población
- **Intervalo de confianza:** Jerzy Neyman formalizó la idea en 1937. Un intervalo de 95% para una media es aproximadamente media ± 1.96·(desviación/√n). Su significado preciso: si repitieras el muestreo muchas veces, el 95% de los intervalos construidos así contendría el valor real. Observa el √n: para reducir el margen a la mitad hace falta cuatro veces más datos.
- **Prueba de hipótesis:** se plantea una hipótesis nula (no hay diferencia) y se calcula el **valor p**: la probabilidad de observar datos tan extremos como los obtenidos **si la hipótesis nula fuera cierta**. No es la probabilidad de que la hipótesis sea verdadera. La Asociación Estadounidense de Estadística publicó en 2016 una declaración (Wasserstein y Lazar) advirtiendo contra el uso mecánico de "p < 0.05" como sinónimo de verdad.
- **Errores:** tipo I (falso positivo: concluir que hay efecto cuando no lo hay) y tipo II (falso negativo). La **potencia** de una prueba es la probabilidad de detectar un efecto real; depende del tamaño de muestra.

## Experimentos A/B
Las empresas de software comparan dos versiones de una página asignando usuarios al azar. Ron Kohavi, Diane Tang y Ya Xu, en *Trustworthy Online Controlled Experiments* (2020), resumen la experiencia de Microsoft, Google y LinkedIn: calcula de antemano el tamaño de muestra, no mires los resultados cada hora para detener el experimento cuando "da significativo" (eso infla los falsos positivos) y desconfía de los resultados demasiado buenos.

## Correlación no es causalidad
El **coeficiente de correlación** de Pearson mide qué tan bien una recta describe la relación entre dos variables, de −1 a 1. Que dos cosas varíen juntas no prueba que una cause la otra: puede haber una tercera variable. La **paradoja de Simpson** lo muestra de forma dramática: en 1973 los datos de admisión de posgrado de la Universidad de California en Berkeley parecían favorecer a los hombres, pero Bickel, Hammel y O'Connell (1975) mostraron que, departamento por departamento, la ventaja desaparecía o se invertía; las mujeres postulaban más a los departamentos más competitivos. Para concluir causalidad se necesitan experimentos con asignación aleatoria o métodos causales cuidadosos.

## Regresión
La regresión lineal ajusta una recta y = a + b·x por mínimos cuadrados (el tema anterior). Su **R²** indica qué fracción de la variación explica el modelo. Es la base de los pronósticos simples (demanda, capacidad) y la puerta de entrada al aprendizaje automático.

## Dos escuelas
La estadística **frecuentista** (intervalos de confianza, valores p) interpreta la probabilidad como frecuencia a largo plazo; la **bayesiana** la interpreta como grado de creencia que se actualiza con los datos (el teorema de Bayes que viste en probabilidad). Ambas se usan en la industria; lo importante es entender qué afirma cada resultado. Douglas Montgomery y George Runger, en *Applied Statistics and Probability for Engineers*, y Freedman, Pisani y Purves, en *Statistics*, son las referencias clásicas.`,
  links: [['m2.prob', 'la inferencia se apoya en las distribuciones de probabilidad'], ['m15.obs', 'los SLO y alertas usan percentiles y tasas'], ['m14.metrics', 'medir calidad exige estadística honesta']],
  read: 'Montgomery y Runger, capítulos 6 a 11; Freedman, Pisani y Purves, partes II a VIII; Kohavi, Tang y Xu, capítulos 1 a 3.',
  terms: [
    ['Media', 'suma de los valores dividida entre la cantidad de valores', ['Calculas el tiempo promedio en patio y un caso de 30 días lo distorsiona.', 'Es el centro de gravedad de los datos.', 'Se usa en la fórmula del intervalo de confianza.']],
    ['Mediana', 'valor central de los datos ordenados, que deja la mitad por debajo y la mitad por encima', ['Reportas el ingreso típico de los trabajadores sin que lo distorsionen los sueldos más altos.', 'Para 1, 2, 3, 100 vale 2.5.', 'Es el percentil 50.']],
    ['Desviación estándar', 'medida de cuánto se alejan los datos de su media en promedio', ['Dos equipos tienen la misma media de entregas, pero uno es mucho más irregular.', 'En una muestra se calcula dividiendo entre n − 1.', 'El 95% de una normal cae a dos de ellas de la media.']],
    ['Percentil', 'valor por debajo del cual queda un porcentaje dado de los datos', ['El SLO exige que el p95 de latencia sea menor a 300 ms.', 'Un estudiante quedó en el 90 de su promoción.', 'El p50 es la mediana.']],
    ['Distribución normal', 'distribución simétrica en forma de campana definida por su media y su desviación estándar', ['Las estaturas de una población se ajustan bien a ella.', 'La media de muchas muestras se aproxima a ella por el teorema central del límite.', 'Sigue la regla 68-95-99.7.']],
    ['Intervalo de confianza', 'rango calculado con una muestra que, con un procedimiento que acierta un porcentaje fijo de veces, contiene el valor real', ['Reportas que el tiempo medio está entre 2.1 y 2.6 días con 95% de confianza.', 'Para reducir el margen a la mitad necesitas cuatro veces más datos.', 'Se construye con media ± 1.96 veces el error estándar.']],
    ['Valor p', 'probabilidad de observar datos tan extremos como los obtenidos si la hipótesis nula fuera cierta', ['Un experimento A/B da 0.03 y se interpreta mal como "97% de que funciona".', 'La ASA advirtió en 2016 contra su uso mecánico.', 'Un valor pequeño indica datos poco compatibles con "no hay diferencia".']],
    ['Correlación', 'medida de qué tan fuerte es la relación lineal entre dos variables, de −1 a 1', ['Las ventas de helados y los ahogamientos suben juntos en verano.', 'Un valor de 0.9 no prueba que una variable cause la otra.', 'El cuarteto de Anscombe tiene el mismo valor en cuatro gráficos muy distintos.']]
  ],
  q: [
    ['Los tiempos de respuesta son 100, 110, 120, 105 y 3000 ms. ¿Qué medida representa mejor el caso típico?', 'La mediana', ['La media', 'La desviación estándar', 'El máximo'], 'Un valor extremo distorsiona la media; la mediana (110) es robusta.', 2],
    ['Un valor p de 0.03 significa:', 'Que datos así serían poco probables si no hubiera efecto', ['Que hay 97% de probabilidad de que el efecto exista', 'Que el efecto es grande', 'Que el experimento está bien diseñado'], 'El valor p se calcula suponiendo cierta la hipótesis nula.', 4],
    ['Para reducir a la mitad el margen de error de un intervalo de confianza necesitas:', 'Cuatro veces más datos', ['El doble de datos', 'La mitad de datos', 'Cambiar a una confianza de 50%'], 'El margen depende de 1/√n.', 3],
    ['¿Qué muestra la paradoja de Simpson?', 'Que una tendencia en datos agregados puede invertirse al separarlos por grupos', ['Que la media siempre engaña', 'Que la correlación implica causalidad', 'Que las muestras pequeñas son inútiles'], 'Las admisiones de Berkeley de 1973 son el ejemplo clásico.', 3],
    ['¿Por qué no hay que detener un experimento A/B en cuanto "da significativo"?', 'Porque mirar repetidamente infla la tasa de falsos positivos', ['Porque los usuarios se cansan', 'Porque el valor p siempre baja con el tiempo', 'Porque la media cambia de signo'], 'Cada mirada es una oportunidad de encontrar un resultado por azar.', 4],
    { tf: 'El teorema central del límite dice que los datos individuales siempre siguen una distribución normal.', v: false, e: 'Habla de la distribución de la media de muchas muestras, no de cada dato.', l: 3 },
    { tf: 'Una correlación de 0.95 entre dos variables prueba que una causa la otra.', v: false, e: 'Correlación no implica causalidad; puede haber una tercera variable o coincidencia.', l: 2 },
    { i: '¿Cuál es la mediana de 4, 1, 3, 2?', a: 2.5, e: 'Ordenados 1, 2, 3, 4: el promedio de los dos centrales es 2.5.', l: 2 },
    { c: 'Escribe «media(l)».', f: 'media', p: ['l'], t: [[[[2, 4, 9]], 5], [[[10]], 10], [[[1, 2]], 1.5]], sol: '  return l.reduce((s, x) => s + x, 0) / l.length;', l: 1 },
    { c: 'Escribe «mediana(l)» sin modificar la lista recibida.', f: 'mediana', p: ['l'], t: [[[[5, 1, 3]], 3], [[[4, 1, 3, 2]], 2.5], [[[7]], 7]], sol: '  const o = [...l].sort((a, b) => a - b), n = o.length;\n  return n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2;', h: 'Ordena una copia numéricamente y toma el centro o el promedio de los dos centrales.', l: 3 },
    { c: 'Escribe «desviacionMuestral(l)» (dividiendo entre n − 1) redondeada a 2 decimales.', f: 'desviacionMuestral', p: ['l'], t: [[[[2, 4, 4, 4, 5, 5, 7, 9]], 2.14], [[[1, 1, 1]], 0], [[[2, 4]], 1.41]], sol: '  const m = l.reduce((s, x) => s + x, 0) / l.length;\n  const v = l.reduce((s, x) => s + (x - m) ** 2, 0) / (l.length - 1);\n  return Math.round(Math.sqrt(v) * 100) / 100;', h: 'Suma los cuadrados de las diferencias con la media, divide entre n − 1 y saca raíz.', l: 3 },
    { c: 'Escribe «percentil(l, p)» con el método del rango más cercano: ordena y toma el elemento en la posición ⌈p/100·n⌉ (contando desde 1).', f: 'percentil', p: ['l', 'p'], t: [[[[15, 20, 35, 40, 50], 30], 20], [[[15, 20, 35, 40, 50], 50], 35], [[[15, 20, 35, 40, 50], 100], 50], [[[40, 15, 50, 20, 35], 40], 20]], sol: '  const o = [...l].sort((a, b) => a - b);\n  const r = Math.ceil(p / 100 * o.length);\n  return o[Math.max(r, 1) - 1];', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.pick([5, 7]), l = []; for (var i = 0; i < n; i++) l.push(R.int(1, 40)); var o = l.slice().sort(function (a, b) { return a - b; }); g.input(2, '¿Cuál es la mediana de ' + l.join(', ') + '?', o[(n - 1) / 2], 'Ordenados: ' + o.join(', ') + '. El central es ' + o[(n - 1) / 2] + '.'); });
    g.times(6, function (R) { var l = [R.int(1, 20), R.int(1, 20), R.int(1, 20), R.int(1, 20)], s = l.reduce(function (a, b) { return a + b; }, 0); g.input(2, '¿Cuál es la media de ' + l.join(', ') + '? Redondea a 2 decimales.', (s / 4).toFixed(2), s + '/4 = ' + (s / 4).toFixed(2) + '.'); });
    g.times(6, function (R) { var m = R.int(50, 200), sd = R.int(5, 20), k = R.pick([-2, -1, 1, 2, 3]), x = m + k * sd; g.input(3, 'Con media ' + m + ' y desviación estándar ' + sd + ', ¿cuál es el puntaje z de ' + x + '?', k, '(' + x + ' − ' + m + ')/' + sd + ' = ' + k + '.'); });
    g.times(5, function (R) { var k = R.pick([1, 2, 3]), p = { 1: 68, 2: 95, 3: 99.7 }[k]; g.input(2, 'En una distribución normal, ¿qué porcentaje aproximado de datos cae a ' + k + ' desviación(es) estándar de la media? (solo el número)', p, 'Regla 68-95-99.7.'); });
    g.times(5, function (R) { var sd = R.pick([10, 20, 40]), n = R.pick([25, 100, 400]), m = (1.96 * sd / Math.sqrt(n)).toFixed(2); g.input(4, 'Con desviación estándar ' + sd + ' y n = ' + n + ', ¿cuál es el margen de error del intervalo de 95% (1.96·sd/√n)? Redondea a 2 decimales.', m, '1.96·' + sd + '/√' + n + ' = ' + m + '.'); });
  },
  checks: [
    ['¿Cuándo prefieres la mediana a la media?', 'Cuando hay valores extremos o la distribución es asimétrica (tiempos de respuesta, ingresos), porque la mediana no se deja arrastrar por ellos.'],
    ['¿Qué enseña el cuarteto de Anscombe?', 'Que datos muy distintos pueden tener las mismas estadísticas resumidas; hay que graficarlos antes de concluir.'],
    ['Interpreta correctamente un intervalo de confianza de 95%.', 'Es un intervalo construido con un procedimiento que, repetido muchas veces, contendría el valor real en el 95% de los casos; no es la probabilidad de que este intervalo concreto lo contenga.'],
    ['¿Qué es un error de tipo I y qué lo infla en los experimentos A/B?', 'Concluir que hay un efecto cuando no lo hay; lo infla mirar los resultados muchas veces y detener el experimento cuando parece significativo.'],
    ['Da un ejemplo de correlación sin causalidad en un patio de autos.', 'Las unidades más caras pasan más días en el patio, pero no por ser caras: requieren más revisiones y documentos (una tercera variable explica ambas cosas).']
  ],
  cites: ['Montgomery, D. y Runger, G. (2018). *Applied Statistics and Probability for Engineers* (7.ª ed.). Wiley.', 'Freedman, D., Pisani, R. y Purves, R. (2007). *Statistics* (4.ª ed.). W. W. Norton.', 'Wasserstein, R. y Lazar, N. (2016). The ASA Statement on p-Values: Context, Process, and Purpose. *The American Statistician*, 70(2).', 'Bickel, P., Hammel, E. y O\'Connell, J. (1975). Sex Bias in Graduate Admissions: Data from Berkeley. *Science*, 187.', 'Anscombe, F. (1973). Graphs in Statistical Analysis. *The American Statistician*, 27(1).', 'Kohavi, R., Tang, D. y Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.'],
  project: { t: 'Estadística de la operación de un patio',
    goal: 'Analizar datos de operación con honestidad: describir, graficar, estimar y probar hipótesis.',
    steps: ['Simula (o recopila) los tiempos en patio de 500 unidades con una distribución de cola larga.', 'Calcula media, mediana, desviación estándar, p90, p95 y p99, y grafica un histograma y un diagrama de caja.', 'Toma 1000 muestras de 30 unidades y grafica la distribución de sus medias para ver el teorema central del límite.', 'Calcula un intervalo de confianza de 95% para el tiempo medio y compáralo con el valor real de la población simulada.', 'Diseña un experimento A/B (por ejemplo, revisión en la mañana o en la tarde), calcula el tamaño de muestra y analiza los resultados.'],
    deliver: 'Un cuaderno o página con el código, los gráficos y las conclusiones redactadas sin exagerar.' },
  hito: ['Agrega al reporte de PatioApp media, mediana, desviación estándar y p95 de los días en patio, con un histograma.', 'Formula una hipótesis sobre la operación (por ejemplo, que las unidades revisadas en la mañana se entregan antes), pruébala con datos simulados y reporta un intervalo de confianza.']
});
})();
