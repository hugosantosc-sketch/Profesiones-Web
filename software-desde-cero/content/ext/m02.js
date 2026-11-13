(function () {
var X = SDC.X, XM = SDC.XM;
XM('m2', {
  uni: 'MIT 6.1200J (antes 6.042J) *Mathematics for Computer Science*; Stanford CS103 *Mathematical Foundations of Computing*; Berkeley CS70 *Discrete Mathematics and Probability Theory*; Harvard CS20 *Discrete Mathematics for Computer Science*. En Perú: Matemática Discreta o Estructuras Discretas (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Motor de reglas y análisis del patio',
    goal: 'Usar lógica, conjuntos y probabilidad juntos para responder preguntas reales sobre un patio de vehículos.',
    steps: ['Escribe 5 reglas de negocio como fórmulas lógicas y genera su tabla de verdad para detectar reglas contradictorias o redundantes.', 'Representa cada filtro (revisadas, pagadas, con daños, por marca) como conjunto y responde consultas combinadas con unión, intersección y diferencia.', 'Comprueba con inclusión-exclusión que |A ∪ B| = |A| + |B| − |A ∩ B| en tus datos.', 'Simula 10 000 días de operación con probabilidades de falla por revisión y estima el valor esperado de reprocesos al mes.', 'Compara el resultado de la simulación con el cálculo exacto.'],
    deliver: 'Un informe en Markdown con las reglas, las consultas, la simulación y una conclusión de cuántos reprocesos esperar.' }
});

X('m2.prop', {
  deep: `
## Más allá de verdadero y falso: cuantificadores
La lógica proposicional no puede decir "todos los vehículos" ni "algún chofer". Para eso está la **lógica de predicados**, con dos cuantificadores:
- **Para todo (∀):** «∀x. revisado(x)» significa que todo vehículo está revisado.
- **Existe (∃):** «∃x. dañado(x)» significa que al menos uno está dañado.
Negarlos invierte el cuantificador: «¬∀x. P(x)» equivale a «∃x. ¬P(x)». Decir "no todos están revisados" es decir "hay al menos uno sin revisar". En código, «every» y «some» son exactamente estos cuantificadores:
~~~js
const autos = [{ placa: 'ABC123', revisado: true }, { placa: 'XYZ789', revisado: false }];
console.log(autos.every(a => a.revisado));        // ∀
console.log(autos.some(a => !a.revisado));        // ∃ ¬  (la negación de lo anterior)
console.log([].every(a => a.revisado));           // verdad vacía: true
~~~
Fíjate en el último caso: un "para todo" sobre un conjunto vacío es verdadero. Se llama **verdad vacía** y causa errores cuando un filtro no devuelve nada y el programa concluye que "todo está en orden".

## Reglas de inferencia
Son los pasos válidos de un razonamiento:
| Regla | Forma | Ejemplo |
| Modus ponens | P → Q, P ⊢ Q | Si está pagado se entrega; está pagado; se entrega. |
| Modus tollens | P → Q, ¬Q ⊢ ¬P | Si está pagado se entrega; no se entregó; no estaba pagado. |
| Silogismo hipotético | P → Q, Q → R ⊢ P → R | Encadenar reglas de negocio. |
| Silogismo disyuntivo | P ∨ Q, ¬P ⊢ Q | Falla la red o el servidor; la red funciona; falla el servidor. |
Dos falacias aparecen a diario: **afirmar el consecuente** (P → Q, Q, luego P) y **negar el antecedente** (P → Q, ¬P, luego ¬Q). Al depurar, "si hay un bug en el módulo, la prueba falla; la prueba falla, luego el bug está en el módulo" es afirmar el consecuente: la falla puede venir de otro lado.

## Técnicas de demostración
Lehman, Leighton y Meyer dedican la primera parte de *Mathematics for Computer Science* (el libro del curso del MIT) a estas técnicas:
- **Directa:** suponer P y llegar a Q por pasos válidos.
- **Por contrapositiva:** probar ¬Q → ¬P cuando es más fácil. Ejemplo: "si n² es par, n es par" se prueba mostrando que si n es impar, n² es impar.
- **Por contradicción:** suponer lo contrario y llegar a algo imposible. El ejemplo clásico es que √2 es irracional: si √2 = a/b en su forma reducida, entonces a² = 2b², a es par, luego b también, y la fracción no estaba reducida.
- **Por casos:** dividir en situaciones que cubren todo (n par o n impar).
- **Por inducción:** para afirmaciones sobre todos los naturales; la verás a fondo en el módulo de matemática avanzada.

## Equivalencias que simplifican código
~~~txt
P → Q        ≡  ¬P ∨ Q
¬(P → Q)     ≡  P ∧ ¬Q            (la única forma de romper un "si... entonces")
P ↔ Q        ≡  (P → Q) ∧ (Q → P)
(P ∧ Q) → R  ≡  P → (Q → R)       (exportación: anidar if equivale a usar &&)
~~~
La primera explica las **cláusulas de guarda**: «if (!pagado) return;» es la forma de programar "si está pagado, entonces sigue".

## Satisfacibilidad y verificación
Una fórmula es **tautología** si es verdadera en todas las filas, **contradicción** si es falsa en todas y **satisfacible** si es verdadera en al menos una. Decidir si una fórmula es satisfacible (el problema SAT) fue el primer problema que Stephen Cook demostró NP-completo en 1971. Aun así, los resolutores SAT modernos resuelven fórmulas con millones de variables y se usan para verificar circuitos, planificar y encontrar errores en software. Lo retomarás en teoría de la computación y en métodos formales.

## Por qué un ingeniero de software necesita esto
- Las especificaciones son lógica: "para todo pedido, si está pagado entonces existe una factura".
- Las consultas SQL son lógica de predicados: «WHERE» es un predicado y «NOT EXISTS» es una negación de un cuantificador.
- Rosen insiste en *Discrete Mathematics and Its Applications* en traducir frases del lenguaje natural a lógica, porque ahí aparecen las ambigüedades de los requisitos: "el usuario puede pagar con tarjeta o Yape" ¿admite ambos a la vez?`,
  checks: [
    ['Niega la afirmación "todos los choferes tienen licencia vigente" sin usar la palabra "no todos".', 'Existe al menos un chofer cuya licencia no está vigente (∃x. ¬vigente(x)).'],
    ['La regla es "si la unidad está pagada, se entrega". Se observa que se entregó. ¿Podemos concluir que estaba pagada?', 'No. Sería afirmar el consecuente: la implicación no impide entregar por otros motivos (por ejemplo, con autorización).'],
    ['¿Por qué «[].every(x => x > 5)» devuelve true?', 'Por la verdad vacía: un "para todo" sobre un conjunto sin elementos no tiene ningún contraejemplo, así que es verdadero.'],
    ['Reescribe P → Q usando solo ¬ y ∨, y explica cómo se relaciona con una cláusula de guarda.', 'P → Q equivale a ¬P ∨ Q. Una guarda «if (!P) return;» descarta el caso ¬P y el resto del código asume P para garantizar Q.'],
    ['¿Qué técnica usarías para probar que hay infinitos números primos y cuál es la idea?', 'Contradicción (prueba de Euclides): si hubiera finitos, el producto de todos más uno no sería divisible por ninguno, así que habría otro primo.']
  ],
  cites: ['Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT (libro abierto del curso 6.042J). Parte I.', 'Rosen, K. (2019). *Discrete Mathematics and Its Applications* (8.ª ed.). McGraw-Hill. Capítulo 1.', 'Velleman, D. (2019). *How to Prove It: A Structured Approach* (3.ª ed.). Cambridge University Press.', 'Cook, S. (1971). The complexity of theorem-proving procedures. *Proceedings of the 3rd ACM STOC*.'],
  project: { t: 'Calculadora de lógica proposicional',
    goal: 'Programar una herramienta que analice cualquier fórmula lógica y responda si es tautología, contradicción o satisfacible.',
    steps: ['Acepta fórmulas con variables de una letra y los operadores ! (no), & (y), | (o) y > (implica).', 'Detecta automáticamente las variables y genera todas las 2^n combinaciones.', 'Muestra la tabla de verdad completa.', 'Clasifica la fórmula (tautología, contradicción o satisfacible) y muestra un contraejemplo si no es tautología.', 'Agrega una opción para comprobar si dos fórmulas son equivalentes y úsala para verificar las leyes de De Morgan y la contrapositiva.'],
    deliver: 'Un archivo logica.js con pruebas de al menos 10 equivalencias clásicas.' },
  hito: ['Escribe en el README las reglas de negocio de PatioApp como implicaciones, cada una con su contrapositiva en lenguaje natural.', 'Agrega un invariante que se compruebe después de cada operación: unidades en patio = unidades ingresadas − unidades entregadas.']
});

X('m2.sets', {
  deep: `
## Describir conjuntos con precisión
Además de listar elementos, se puede definir un conjunto con una propiedad: «{x ∈ Vehículos | x.km > 100000}». Esta notación por comprensión es la idea detrás de «filter» en JavaScript, de las *list comprehensions* de Python y de la cláusula «WHERE» de SQL.

## Operaciones que crecen rápido
- **Producto cartesiano:** A × B es el conjunto de todos los pares (a, b). Si |A| = 3 y |B| = 4, hay 12 pares. Un «JOIN» sin condición en SQL produce exactamente esto, y por eso olvidar la condición devuelve millones de filas.
- **Conjunto potencia:** P(A) es el conjunto de todos los subconjuntos de A y tiene 2^|A| elementos. Probar todas las combinaciones de 30 funcionalidades activables significa 2^30, más de mil millones de configuraciones.
- **Inclusión-exclusión:** |A ∪ B| = |A| + |B| − |A ∩ B|. Con tres conjuntos se suman los tres, se restan las tres intersecciones de a dos y se suma la triple.

## Relaciones: propiedades y representaciones
Una relación R sobre A es un subconjunto de A × A. Se puede representar como lista de pares, como **matriz** de 0 y 1 o como **grafo dirigido**. Sus propiedades:
| Propiedad | Definición | Ejemplo |
| Reflexiva | todo a se relaciona consigo mismo | "tiene la misma marca que" |
| Simétrica | si aRb entonces bRa | "trabaja en el mismo turno que" |
| Antisimétrica | si aRb y bRa entonces a = b | "≤" |
| Transitiva | si aRb y bRc entonces aRc | "es más antiguo que" |
Una relación **de equivalencia** (reflexiva, simétrica y transitiva) divide el conjunto en **clases** que no se solapan: es una partición. Una relación **de orden parcial** (reflexiva, antisimétrica y transitiva) describe dependencias: "la tarea A debe hacerse antes que B". Ordenar las tareas respetando ese orden es el **ordenamiento topológico** que verás en grafos.

## Funciones: composición e inversa
Si f: A → B y g: B → C, la composición «g ∘ f» aplica primero f y luego g. Es exactamente lo que hace un *pipeline* de datos o una cadena «map(...).filter(...)». Una función solo tiene inversa si es **biyectiva**: por eso no se puede "desencriptar" un hash (no es inyectivo), pero sí descifrar un cifrado (que sí es biyectivo para una clave dada).

## Infinitos de distinto tamaño
Georg Cantor demostró en 1891, con su **argumento diagonal**, que los números reales no se pueden poner en una lista numerada: hay "más" reales que naturales. El mismo truco diagonal sirve, como verás en teoría de la computación, para probar que hay problemas que ningún programa puede resolver (Turing, 1936). Los conjuntos que sí se pueden numerar, como los naturales, los enteros, los racionales o todos los programas posibles, se llaman **numerables**.

## Del álgebra de conjuntos a las bases de datos
Edgar F. Codd, en *A Relational Model of Data for Large Shared Data Banks* (1970), propuso guardar los datos como **relaciones** en el sentido matemático: conjuntos de tuplas. De ahí vienen las propiedades que te sorprenderán en SQL: el orden de las filas no está garantizado (un conjunto no tiene orden) y «UNION» elimina duplicados mientras que «UNION ALL» no (porque la segunda ya no es una operación de conjuntos, sino de *multiconjuntos*).

~~~js
// Relación "mismo turno" como lista de pares y comprobación de propiedades
const A = ['ana', 'beto', 'cami'];
const R = [['ana','ana'],['beto','beto'],['cami','cami'],['ana','beto'],['beto','ana']];
const tiene = (a, b) => R.some(([x, y]) => x === a && y === b);
const reflexiva = A.every(a => tiene(a, a));
const simetrica = R.every(([a, b]) => tiene(b, a));
const transitiva = R.every(([a, b]) => R.every(([c, d]) => b !== c || tiene(a, d)));
console.log({ reflexiva, simetrica, transitiva });   // ¿es de equivalencia?
~~~

## El principio del palomar, en serio
Si metes n + 1 objetos en n cajas, alguna caja tiene al menos dos. Su versión general: con N objetos y k cajas, alguna tiene al menos ⌈N/k⌉. Consecuencias directas: ningún algoritmo de compresión sin pérdida puede reducir todos los archivos; dos personas en Lima tienen exactamente el mismo número de cabellos; y toda función hash con salida más pequeña que su entrada tiene colisiones.`,
  checks: [
    ['Si |A| = 5, ¿cuántos subconjuntos tiene A y cuántos pares tiene A × A?', '2^5 = 32 subconjuntos y 5 × 5 = 25 pares.'],
    ['En un patio, 40 autos están revisados, 30 pagados y 25 ambas cosas. ¿Cuántos están revisados o pagados?', '40 + 30 − 25 = 45, por inclusión-exclusión.'],
    ['¿La relación "es padre de" es transitiva? ¿Y "es ancestro de"?', '"Es padre de" no lo es: el padre de tu padre es tu abuelo. "Es ancestro de" sí lo es.'],
    ['¿Por qué una consulta SQL sin ORDER BY puede devolver las filas en distinto orden cada vez?', 'Porque una tabla es un conjunto (o multiconjunto) de filas y los conjuntos no tienen orden; el motor puede devolverlas en el orden que le resulte más eficiente.'],
    ['¿Por qué no existe un compresor sin pérdida que acorte todos los archivos?', 'Por el palomar: hay 2^n archivos de n bits y menos de 2^n archivos más cortos; si todos se acortaran, dos archivos distintos compartirían salida y no se podrían recuperar.']
  ],
  cites: ['Rosen, K. (2019). *Discrete Mathematics and Its Applications* (8.ª ed.). McGraw-Hill. Capítulos 2 y 9.', 'Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT. Capítulos 4 y 15.', 'Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. *Communications of the ACM*, 13(6).'],
  project: { t: 'Laboratorio de conjuntos y relaciones',
    goal: 'Construir una pequeña librería de conjuntos y relaciones y usarla con datos del patio.',
    steps: ['Implementa unión, intersección, diferencia, producto cartesiano y conjunto potencia sin usar librerías.', 'Escribe funciones que comprueben si una relación es reflexiva, simétrica, antisimétrica y transitiva.', 'Si la relación es de equivalencia, calcula sus clases; si es un orden parcial, produce un orden topológico.', 'Prueba con la relación "misma marca" sobre una lista de 20 vehículos y con la relación "debe revisarse antes que" sobre tareas del taller.'],
    deliver: 'Un archivo conjuntos.js con pruebas y un ejemplo impreso de clases de equivalencia.' },
  hito: ['Modela los filtros de PatioApp como conjuntos de placas (revisadas, pagadas, con daños) y calcula las unidades entregables como (revisadas ∩ pagadas) − con daños.', 'Representa la asignación chofer → unidad y verifica que cada unidad en tránsito tenga exactamente un chofer (que la relación sea una función).']
});

X('m2.prob', {
  deep: `
## Contar con repetición y con restricciones
| Situación | Fórmula | Ejemplo |
| Ordenar n elementos | n! | 5 autos en 5 espacios: 120 |
| Elegir k de n con orden, sin repetir | n!/(n−k)! | podio de 3 entre 10: 720 |
| Elegir k de n sin orden | C(n,k) = n!/(k!(n−k)!) | 2 revisores de 6: 15 |
| Secuencias de longitud k con n símbolos | n^k | PIN de 4 dígitos: 10 000 |
| Elegir k de n con repetición, sin orden | C(n+k−1, k) | 3 bebidas de 4 sabores: 20 |
El último caso se resuelve con la técnica de "estrellas y barras". El triángulo de Pascal reúne todos los C(n,k): cada número es la suma de los dos de arriba, porque C(n,k) = C(n−1,k−1) + C(n−1,k), una identidad que también es una recursión.

## Los axiomas y la probabilidad condicional
Andréi Kolmogórov formalizó la probabilidad en 1933 con tres axiomas: toda probabilidad es ≥ 0, la del espacio completo es 1, y la de eventos disjuntos se suma. De ahí sale todo lo demás. La **probabilidad condicional** «P(A|B) = P(A ∩ B) / P(B)» mide la probabilidad de A sabiendo que ocurrió B. Dos eventos son **independientes** si saber uno no cambia la probabilidad del otro: P(A|B) = P(A).

## El teorema de Bayes y la falacia de la tasa base
:::flow P(A|B) = P(B|A) · P(A) / P(B)
Ejemplo de patio: 2% de los autos que llegan tienen una falla oculta. El escáner la detecta en 95% de los casos, pero da falsa alarma en 5% de los autos sanos. Si el escáner alerta, ¿qué tan probable es la falla?
~~~js
const pFalla = 0.02, pAlertaSiFalla = 0.95, pAlertaSiSano = 0.05;
const pAlerta = pAlertaSiFalla * pFalla + pAlertaSiSano * (1 - pFalla);
console.log((pAlertaSiFalla * pFalla / pAlerta).toFixed(3)); // ¡solo ~0.28!
~~~
Aunque el escáner parece bueno, solo 28% de las alertas son fallas reales, porque las fallas son raras. Ignorar la tasa base es uno de los errores de razonamiento más estudiados (Kahneman y Tversky). Le pasa a los sistemas de alertas de monitoreo: si generan muchas falsas alarmas, el equipo deja de hacerles caso.

## Variables aleatorias y valor esperado
Una variable aleatoria asigna un número a cada resultado. Su **valor esperado** es el promedio ponderado: E[X] = Σ x · P(X = x). La propiedad más útil es la **linealidad**: E[X + Y] = E[X] + E[Y], incluso si X e Y no son independientes. Por eso el número esperado de colisiones entre n claves en m casillas es simplemente C(n,2)/m.
La **varianza** mide cuánto se dispersa X alrededor de su media; su raíz es la **desviación estándar**.

## Distribuciones que reaparecen en sistemas
- **Bernoulli y binomial:** número de éxitos en n intentos independientes con probabilidad p. Si cada revisión falla con p = 0.1, en 20 revisiones se esperan 2 fallas.
- **Geométrica:** número de intentos hasta el primer éxito; su media es 1/p. Un reintento que tiene 20% de éxito necesita en promedio 5 intentos.
- **Poisson:** cantidad de eventos raros por unidad de tiempo, como solicitudes que llegan a un servidor por segundo.
- **Distribuciones de cola larga:** los tiempos de respuesta reales no son simétricos; unos pocos son muchísimo más lentos. Por eso se miran percentiles como p95 y p99.

## La cota del cumpleaños
Con m valores posibles, la probabilidad de alguna colisión supera 50% con apenas unos 1.18·√m elementos. Para identificadores aleatorios de 32 bits (m ≈ 4.3 × 10^9) eso ocurre con solo unos 77 000 registros. Es la razón por la que los UUID usan 122 bits aleatorios y por la que los ataques "de cumpleaños" obligan a usar hashes de 256 bits.

## Simular cuando la fórmula es difícil
El **método de Montecarlo**, desarrollado por Stanisław Ulam y John von Neumann en los años 40, estima probabilidades repitiendo un experimento aleatorio muchas veces. Es una herramienta práctica para comprobar tus cálculos y para modelar sistemas complejos (colas, fallas en cascada).
~~~js
// Paradoja del cumpleaños con 23 personas: simulación
let coincide = 0, N = 20000;
for (let k = 0; k < N; k++) {
  const vistos = new Set();
  for (let p = 0; p < 23; p++) { const d = Math.floor(Math.random() * 365); if (vistos.has(d)) { coincide++; break; } vistos.add(d); }
}
console.log((coincide / N).toFixed(3));   // cerca de 0.507
~~~
Blitzstein y Hwang, autores del curso Stat 110 de Harvard, recomiendan siempre comprobar un resultado por dos caminos: el cálculo y la simulación.`,
  checks: [
    ['¿Cuántas contraseñas de 6 caracteres hay usando 26 letras minúsculas y 10 dígitos? ¿Por qué no es C(36,6)?', '36^6 ≈ 2.18 mil millones. No es una combinación porque el orden importa y los caracteres se pueden repetir.'],
    ['Una prueba detecta un error real 99% de las veces y da falsa alarma 10% de las veces. Si solo 1% del código tiene ese error, ¿una alarma significa casi seguro un error?', 'No. P(error|alarma) = 0.99·0.01 / (0.99·0.01 + 0.10·0.99) ≈ 0.09. Solo 9% de las alarmas son reales, por la baja tasa base.'],
    ['Un servicio responde bien en el primer intento con probabilidad 0.25. ¿Cuántos intentos se esperan en promedio hasta el éxito?', '1/0.25 = 4 intentos, por la distribución geométrica.'],
    ['¿Por qué la linealidad del valor esperado es tan útil?', 'Porque permite sumar valores esperados de partes simples sin preocuparse de si dependen entre sí; así se calculan colisiones esperadas o costos esperados con poco esfuerzo.'],
    ['¿Por qué no basta con un identificador aleatorio de 32 bits para millones de registros?', 'Por la cota del cumpleaños: con unos 77 000 identificadores ya hay más de 50% de probabilidad de alguna colisión.']
  ],
  cites: ['Lehman, E., Leighton, F. T. y Meyer, A. (2017). *Mathematics for Computer Science*. MIT. Partes III y IV.', 'Blitzstein, J. y Hwang, J. (2019). *Introduction to Probability* (2.ª ed.). CRC Press.', 'Kolmogórov, A. N. (1933). *Grundbegriffe der Wahrscheinlichkeitsrechnung*. Springer.', 'Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.'],
  project: { t: 'Laboratorio de probabilidad con simulaciones',
    goal: 'Calcular probabilidades de problemas reales de software por fórmula y comprobarlas simulando.',
    steps: ['Paradoja del cumpleaños: calcula la probabilidad exacta para n = 10, 23, 50 y compárala con 20 000 simulaciones.', 'Disponibilidad: simula un sistema con 3 servidores en paralelo y una base de datos en serie y estima su disponibilidad.', 'Bayes: simula el escáner de fallas del patio y comprueba que solo ~28% de las alertas son reales.', 'Reintentos: simula llamadas con 20% de éxito y grafica cuántos intentos se necesitan.', 'Escribe una conclusión: cuándo conviene la fórmula y cuándo la simulación.'],
    deliver: 'Un cuaderno o página web con las cuatro simulaciones, sus gráficos y la comparación con las fórmulas.' },
  hito: ['Calcula cuántas placas distintas permite el formato de PatioApp y la probabilidad de colisión si se generan códigos internos aleatorios de 4 caracteres para 500 unidades.', 'Registra el tiempo de cada operación de registro y reporta la mediana y el p95, no solo el promedio.']
});
})();
