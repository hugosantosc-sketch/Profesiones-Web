(function () {
var X = SDC.X, XM = SDC.XM;
XM('m14', {
  uni: 'CMU 17-313 *Foundations of Software Engineering* (pruebas y calidad) y 17-214 (pruebas unitarias y diseño para la prueba); MIT 6.1020 (antes 6.031) *Software Construction* (pruebas y especificaciones); certificación profesional ISTQB Foundation Level como referencia de la industria. En Perú: Pruebas de Software y Calidad de Software (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Estrategia de calidad completa para PatioApp',
    goal: 'Diseñar y ejecutar la estrategia de pruebas y calidad de PatioApp, con evidencia medible de su efectividad.',
    steps: ['Escribe la estrategia de pruebas: qué se prueba en cada nivel, con qué herramientas y qué se ejecuta en cada cambio.', 'Desarrolla con TDD las reglas de negocio nuevas y usa dobles de prueba solo donde aportan.', 'Diseña casos con particiones, valores límite, tablas de decisión y transiciones de estado para las funciones críticas.', 'Mide cobertura de ramas y puntaje de mutación, y agrega pruebas basadas en propiedades.', 'Publica un panel de calidad con métricas de código y métricas DORA.'],
    deliver: 'El documento de estrategia, la suite de pruebas en la integración continua, los informes de mutación y el panel de calidad.' }
});

X('m14.types', {
  deep: `
## Lo que las pruebas pueden y no pueden hacer
Edsger Dijkstra lo escribió en 1970 (*Notes on Structured Programming*):
:::cita Las pruebas de un programa pueden usarse para mostrar la presencia de errores, pero nunca para mostrar su ausencia. | Edsger W. Dijkstra (1970), traducción propia.
Glenford Myers, en *The Art of Software Testing* (1979), cambió la mentalidad del área con su definición: probar es ejecutar un programa **con la intención de encontrar errores**. Si una prueba no encuentra nada, no es un éxito: quizá era una mala prueba. Esa mentalidad "destructiva" es la que hace buenas pruebas.

## Los siete principios
La certificación ISTQB, la más usada en la industria, resume siete principios:
1. Las pruebas muestran la presencia de defectos, no su ausencia.
2. Probar todo es imposible: hay que elegir con técnicas y riesgo.
3. Probar temprano ahorra tiempo y dinero.
4. Los defectos se agrupan: pocos módulos concentran la mayoría.
5. **Paradoja del pesticida:** repetir las mismas pruebas deja de encontrar errores nuevos; hay que renovarlas.
6. Las pruebas dependen del contexto: no se prueba igual un videojuego que un sistema bancario.
7. **Falacia de la ausencia de errores:** un sistema sin defectos que no sirve a los usuarios igual fracasa.

## Vocabulario preciso
La norma ISO/IEC/IEEE 24765 distingue:
- **Error (equivocación):** la acción humana que produce un resultado incorrecto ("usé > en lugar de >=").
- **Defecto o falta:** la imperfección en el código o en un documento.
- **Falla:** el comportamiento incorrecto observable cuando se ejecuta el defecto.
Un defecto puede existir años sin producir fallas, hasta que llega la entrada exacta que lo activa. Barry Boehm resumió la diferencia entre **verificación** (¿estamos construyendo el producto correctamente?) y **validación** (¿estamos construyendo el producto correcto?).

## La pirámide y sus alternativas
Mike Cohn propuso la **pirámide de pruebas** en *Succeeding with Agile* (2009): muchas pruebas unitarias (rápidas y baratas), menos de servicio o integración y pocas de interfaz (lentas y frágiles). Kent C. Dodds propuso en 2018 el **trofeo de pruebas**, que pone el mayor peso en las pruebas de integración, porque dan más confianza por cada prueba escrita en aplicaciones web. Ambas coinciden en lo esencial: la mayoría de las pruebas deben ser rápidas, y la confianza debe venir de varios niveles.

## Pruebas inestables (flaky)
Una prueba inestable pasa o falla sin que el código cambie. John Micco informó en 2016 que en Google alrededor del 16% de sus pruebas mostraba alguna inestabilidad. Las causas típicas son esperas fijas en lugar de esperar condiciones, dependencia del orden de ejecución, de la hora o de servicios externos, y estado compartido entre pruebas. Una prueba inestable es peor que ninguna: enseña al equipo a ignorar los fallos.

## Más tipos que debes conocer
- **Pruebas de contrato:** verifican que un proveedor de una API cumple lo que sus consumidores esperan (por ejemplo, con Pact), sin levantar todo el sistema.
- **Pruebas exploratorias:** término acuñado por Cem Kaner en 1984; aprender, diseñar y ejecutar a la vez, guiado por la curiosidad y la experiencia. Encuentran lo que ningún guion previó.
- **Ingeniería del caos:** Netflix publicó en 2011 Chaos Monkey, que apaga servidores al azar en producción para comprobar que el sistema sobrevive. Hoy es una disciplina con experimentos controlados.
- **Pruebas en producción:** despliegues canario, comparación de resultados entre versiones y monitoreo sintético. No reemplazan a las pruebas previas, pero detectan lo que solo ocurre con datos y tráfico reales.

~~~js
// Un oráculo de prueba: ¿cómo sabemos cuál es el resultado correcto?
function diasEntre(a, b) { return Math.round((new Date(b) - new Date(a)) / 864e5); }
const casos = [['2026-12-30', '2027-01-02', 3], ['2026-02-28', '2026-03-01', 1], ['2028-02-28', '2028-03-01', 2]];
for (const [a, b, esperado] of casos) console.log(a, '→', b, diasEntre(a, b) === esperado ? 'ok' : 'FALLA');
~~~
El tercer caso (año bisiesto) es el tipo de entrada que Myers recomendaba buscar: la que un programador apurado olvidaría.`,
  checks: [
    ['¿Qué diferencia hay entre error, defecto y falla?', 'El error es la equivocación humana; el defecto es la imperfección que queda en el código; la falla es el comportamiento incorrecto observable cuando ese defecto se ejecuta.'],
    ['Explica la paradoja del pesticida.', 'Repetir siempre las mismas pruebas deja de encontrar defectos nuevos, igual que los insectos se vuelven resistentes a un pesticida; hay que revisar y renovar las pruebas.'],
    ['¿En qué se diferencian la pirámide de Cohn y el trofeo de Dodds?', 'La pirámide pone el mayor peso en las pruebas unitarias; el trofeo, en las de integración. Ambas buscan pruebas mayormente rápidas con confianza en varios niveles.'],
    ['¿Por qué una prueba inestable es peor que no tener prueba?', 'Porque enseña al equipo a ignorar los fallos; cuando falle por un defecto real, nadie le hará caso.'],
    ['¿Qué pregunta responde la validación y cuál la verificación?', 'La validación: ¿estamos construyendo el producto correcto? La verificación: ¿lo estamos construyendo correctamente?']
  ],
  cites: ['Myers, G., Sandler, C. y Badgett, T. (2011). *The Art of Software Testing* (3.ª ed.). Wiley. (1.ª ed., 1979.)', 'Dijkstra, E. W. (1970). *Notes on Structured Programming* (EWD249).', 'Cohn, M. (2009). *Succeeding with Agile*. Addison-Wesley.', 'ISTQB (2023). *Certified Tester Foundation Level Syllabus v4.0*.', 'Micco, J. (2016). Flaky Tests at Google and How We Mitigate Them. Google Testing Blog.'],
  project: { t: 'Estrategia de pruebas de un sistema',
    goal: 'Planificar qué probar, cómo y cuándo, y comprobar que la estrategia encuentra defectos reales.',
    steps: ['Elige un sistema propio y lista sus riesgos principales (qué sería grave que fallara).', 'Escribe la estrategia: niveles, herramientas, qué corre en cada commit y qué antes de cada versión.', 'Implementa al menos una prueba de cada nivel (unitaria, integración, contrato o API, y E2E).', 'Haz una sesión de pruebas exploratorias de 45 minutos con una misión escrita y documenta lo que encuentres.', 'Busca y corrige al menos una prueba inestable (o crea una a propósito y luego hazla estable).'],
    deliver: 'El documento de estrategia, las pruebas y el informe de la sesión exploratoria.' },
  hito: ['Escribe en el README de PatioApp su estrategia de pruebas: qué se prueba en cada nivel y con qué herramienta.', 'Agrega pruebas de integración de la API contra una base de datos de prueba y una prueba E2E del flujo completo de entrega.']
});

X('m14.unit', {
  deep: `
## Una historia corta de las pruebas automatizadas
Kent Beck escribió SUnit para Smalltalk en 1994, y en 1997, en un vuelo a la conferencia OOPSLA, Beck y Erich Gamma escribieron **JUnit** para Java. De ahí nació la familia xUnit que hoy existe en todos los lenguajes (Jest y Vitest en JavaScript, pytest en Python). Beck describió el **desarrollo guiado por pruebas** en *Test-Driven Development: By Example* (2002) y aclaró que no lo inventó: lo "redescubrió" en prácticas antiguas, como escribir primero la salida esperada de un programa.

## El ciclo y sus reglas
:::flow Rojo: escribe una prueba que falla | Verde: el código mínimo para que pase | Refactorizar: mejora sin romper
Robert C. Martin lo convirtió en tres leyes estrictas: no escribas código de producción salvo para hacer pasar una prueba que falla; no escribas más prueba de la necesaria para que falle; no escribas más código del necesario para que pase. Su efecto: ciclos de segundos o minutos y una suite que crece junto con el código. Beck propone además **triangular**: si una implementación falsa («return 42») pasa la prueba, agrega otro ejemplo que la obligue a generalizar.

## ¿Funciona? Lo que dice la evidencia
Nagappan, Maximilien, Bhat y Williams estudiaron en 2008 equipos de Microsoft e IBM que adoptaron TDD: la densidad de defectos antes de la publicación bajó entre 40% y 90% respecto a proyectos similares, a cambio de un 15% a 35% más de tiempo inicial de desarrollo. Otros estudios muestran resultados más modestos. La conclusión razonable: TDD mejora la calidad interna y el diseño para la prueba, y su costo se recupera en el mantenimiento.

## Cuatro pilares de una buena prueba
Vladimir Khorikov propone en *Unit Testing Principles, Practices, and Patterns* (2020) cuatro propiedades:
1. **Protección contra regresiones:** detecta errores cuando el código se rompe.
2. **Resistencia a refactorizaciones:** no falla cuando cambias la implementación sin cambiar el comportamiento (los "falsos positivos" destruyen la confianza en la suite).
3. **Retroalimentación rápida.**
4. **Mantenibilidad:** fácil de leer y de mantener.
La forma más segura de cumplir la segunda es **probar el comportamiento observable**, no los detalles internos. Una prueba que verifica que se llamó a un método privado se romperá en la próxima refactorización.

## Dobles de prueba con precisión
Gerard Meszaros definió en *xUnit Test Patterns* (2007) la taxonomía que todos usan:
| Doble | Qué hace | Ejemplo |
| Dummy | se pasa pero nunca se usa | un parámetro obligatorio irrelevante |
| Stub | devuelve respuestas preparadas | un servicio de placas que siempre responde "Toyota 2019" |
| Spy | registra cómo fue llamado | un notificador que guarda los mensajes enviados |
| Mock | viene programado con expectativas y falla si no se cumplen | "debe llamarse enviar exactamente una vez" |
| Fake | una implementación funcional simplificada | un repositorio en memoria en lugar de PostgreSQL |
Martin Fowler describió en *Mocks Aren't Stubs* (2007) dos escuelas: la **clásica** (de Detroit), que usa objetos reales siempre que puede y dobles solo para lo lento o externo, y la **mockista** (de Londres), que aísla cada clase con mocks. La clásica tiende a producir pruebas más resistentes a la refactorización; la mockista, un diseño guiado por las interacciones. Una regla práctica: **usa mocks solo en las fronteras del sistema** (correo, pagos, servicios externos), donde la interacción es justamente lo que importa.

## Un mini framework para ver que no hay magia
~~~js
const resultados = [];
function prueba(nombre, fn) { try { fn(); resultados.push('✓ ' + nombre); } catch (e) { resultados.push('✗ ' + nombre + ': ' + e.message); } }
function igual(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('esperaba ' + JSON.stringify(b) + ' y obtuve ' + JSON.stringify(a)); }
// Código bajo prueba
function cobro(dias, { vip = false } = {}) { if (dias < 0) throw new Error('días negativos'); return Math.round(dias * 2000 * (vip ? 0.8 : 1)); }
// Pruebas con la forma Preparar-Actuar-Afirmar
prueba('cobra 2000 por día', () => igual(cobro(3), 6000));
prueba('cero días no cobra', () => igual(cobro(0), 0));
prueba('VIP tiene 20% de descuento', () => igual(cobro(5, { vip: true }), 8000));
prueba('rechaza días negativos', () => { let lanzo = false; try { cobro(-1); } catch { lanzo = true; } igual(lanzo, true); });
console.log(resultados.join('\\n'));
~~~
Un framework real agrega descubrimiento automático de pruebas, informes, preparación compartida y ejecución en paralelo, pero la idea es esta.

## Pruebas que documentan
Una buena suite es la mejor documentación de lo que hace el código, porque nunca se desactualiza sin que alguien lo note. Nombra las pruebas como frases de comportamiento ("rechaza la entrega sin revisión") y no como «test1» ni con el nombre del método probado.`,
  checks: [
    ['¿Qué es "triangular" en TDD?', 'Agregar otro ejemplo de prueba cuando una implementación falsa o demasiado específica hace pasar la primera, obligando a generalizar el código.'],
    ['¿Por qué una prueba que verifica detalles internos es frágil?', 'Porque falla cuando se refactoriza la implementación aunque el comportamiento siga siendo correcto, generando falsos positivos.'],
    ['¿Qué diferencia hay entre un stub y un mock?', 'El stub solo devuelve respuestas preparadas para que el código avance; el mock trae expectativas sobre cómo debe ser llamado y la prueba falla si no se cumplen.'],
    ['¿Cuándo conviene usar mocks según la escuela clásica?', 'Solo en las fronteras del sistema (servicios externos, correo, pagos) o para lo que es lento o no determinista; el resto se prueba con objetos reales.'],
    ['¿Qué encontró el estudio de Nagappan y otros sobre TDD?', 'Entre 40% y 90% menos defectos antes de publicar en los equipos estudiados, a cambio de 15% a 35% más de tiempo inicial de desarrollo.']
  ],
  cites: ['Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley.', 'Meszaros, G. (2007). *xUnit Test Patterns: Refactoring Test Code*. Addison-Wesley.', 'Khorikov, V. (2020). *Unit Testing Principles, Practices, and Patterns*. Manning.', 'Fowler, M. (2007). Mocks Aren\'t Stubs. martinfowler.com.', 'Nagappan, N., Maximilien, E. M., Bhat, T. y Williams, L. (2008). Realizing quality improvement through test driven development. *Empirical Software Engineering*, 13(3).'],
  project: { t: 'Kata de TDD con commits visibles',
    goal: 'Practicar el ciclo rojo-verde-refactorizar de forma disciplinada y usar dobles de prueba con criterio.',
    steps: ['Elige una regla con varios casos (descuentos por permanencia, recargos por tipo de vehículo, días gratis los domingos).', 'Desarrolla con TDD haciendo un commit en cada fase (rojo, verde y refactor) para que el historial muestre el ciclo.', 'Escribe un servicio que use un repositorio y un notificador, y pruébalo con un fake del repositorio y un spy del notificador.', 'Reescribe una de esas pruebas con mocks estrictos, refactoriza el servicio y observa cuál versión se rompe.', 'Mide cuánto tarda la suite completa y mantenla por debajo de 2 segundos.'],
    deliver: 'El repositorio con el historial rojo-verde-refactor, las pruebas y una reflexión sobre los dobles usados.' },
  hito: ['Desarrolla con TDD la próxima regla de PatioApp (por ejemplo, descuentos por permanencia larga), con commits rojo-verde-refactor visibles en el historial.', 'Usa un fake del repositorio y un spy del notificador en las pruebas del servicio de entregas.']
});

X('m14.techniques', {
  deep: `
## Por qué hacen falta técnicas
Una función que recibe dos enteros de 32 bits tiene 2^64 combinaciones de entrada: probarlas todas a mil millones por segundo tomaría más de 500 años. Las técnicas de diseño de casos eligen **pocas pruebas con mucha probabilidad de encontrar defectos**. Myers las sistematizó en 1979 y siguen siendo la base.

## Particiones y valores límite con método
1. Identifica las condiciones de entrada (días en patio: entero de 0 a 365).
2. Define clases **válidas e inválidas**: [0, 365] válida; < 0, > 365, decimal y vacío inválidas.
3. Elige un representante de cada clase.
4. Agrega los **límites** de cada frontera: −1, 0, 1, 364, 365, 366.
5. Cada caso inválido se prueba **por separado**: si combinas dos inválidos, uno puede ocultar al otro.

## Transiciones de estado
Si el sistema tiene estados (ingresada, en revisión, lista, entregada, anulada), se diseñan casos que cubran **cada transición válida** y que intenten **cada transición inválida** desde cada estado. Con 5 estados y 6 eventos hay 30 combinaciones; la tabla completa revela qué pasa, por ejemplo, si se intenta anular una unidad ya entregada.

## Pruebas combinatorias
D. Richard Kuhn y sus colegas del NIST estudiaron fallas reales en sistemas médicos, aeroespaciales y navegadores (2004) y encontraron que la mayoría se dispara con la interacción de **uno o dos parámetros**, y prácticamente todas con seis o menos. Las pruebas **por pares** (*pairwise*) cubren todas las combinaciones de cada par de parámetros con muchísimos menos casos: 10 parámetros con 3 valores cada uno suman 59 049 combinaciones, pero los pares se cubren con unas 15 pruebas.

## Criterios de cobertura
| Criterio | Exige | Fuerza |
| Sentencias | ejecutar cada línea | débil |
| Ramas (decisiones) | cada if en verdadero y en falso | media |
| Condiciones | cada condición atómica verdadera y falsa | media |
| MC/DC | demostrar que cada condición, por sí sola, puede cambiar la decisión | alta |
| Caminos | cada camino posible | casi siempre imposible |
MC/DC (cobertura de condición/decisión modificada) es obligatoria para el software de vuelo de nivel A según la norma aeronáutica DO-178C. Recuerda que **alta cobertura no implica buenas pruebas**: una prueba sin aserciones puede ejecutar todo el código sin verificar nada.

## Pruebas de mutación: probar las pruebas
Richard DeMillo, Richard Lipton y Frederick Sayward propusieron en 1978 la idea: introducir pequeños errores artificiales (**mutantes**) en el código, como cambiar «>» por «>=» o «+» por «−», y ver si las pruebas los detectan ("matan"). El **puntaje de mutación** (mutantes matados / total) mide la calidad real de la suite mucho mejor que la cobertura. Herramientas como Stryker lo automatizan para JavaScript.
~~~js
const original = d => d > 30 ? d * 2500 : d * 2000;
const mutantes = [d => d >= 30 ? d * 2500 : d * 2000, d => d > 30 ? d * 2000 : d * 2000, d => d < 30 ? d * 2500 : d * 2000];
const pruebas = [[10, 20000], [31, 77500], [30, 60000]];          // ¿matan a todos?
mutantes.forEach((m, i) => console.log('mutante', i + 1, pruebas.some(([d, esp]) => m(d) !== esp) ? 'muerto' : 'VIVO'));
~~~
Quita la prueba con 30 días y verás que el primer mutante sobrevive: faltaba un valor límite.

## Pruebas basadas en propiedades
Koen Claessen y John Hughes presentaron QuickCheck para Haskell en 2000: en lugar de escribir ejemplos, escribes **propiedades** que deben cumplirse para cualquier entrada, y la herramienta genera cientos de entradas aleatorias y, si encuentra un fallo, lo **reduce** al ejemplo más pequeño posible. Propiedades típicas: ordenar dos veces es igual que ordenar una vez; convertir a JSON y de vuelta devuelve lo mismo; el cobro nunca es negativo; el total de un reporte es la suma de sus partes. En JavaScript existe fast-check.

## Fuzzing
Barton Miller y sus estudiantes enviaron en 1988 datos aleatorios a las utilidades de Unix y lograron que entre una cuarta y una tercera parte fallaran o se colgaran (publicado en 1990). Hoy el **fuzzing** guiado por cobertura (AFL, libFuzzer, OSS-Fuzz de Google) es una de las técnicas más efectivas para encontrar vulnerabilidades de seguridad.`,
  checks: [
    ['¿Por qué cada clase inválida se prueba por separado?', 'Porque si se combinan dos entradas inválidas, el rechazo de una puede ocultar que la otra no se valida.'],
    ['Para la regla "edad entre 18 y 70", ¿qué valores límite probarías?', '17, 18, 19, 69, 70 y 71.'],
    ['¿Qué demostró el estudio del NIST sobre combinaciones de parámetros?', 'Que la mayoría de las fallas se activan con la interacción de uno o dos parámetros y casi todas con seis o menos; por eso las pruebas por pares son tan eficientes.'],
    ['¿Por qué el puntaje de mutación es mejor indicador que la cobertura?', 'Porque mide si las pruebas detectan cambios en el comportamiento; la cobertura solo dice qué código se ejecutó, aunque nada se verifique.'],
    ['Escribe una propiedad para una función que ordena listas.', 'Por ejemplo: el resultado tiene los mismos elementos que la entrada, está en orden no decreciente y ordenar el resultado de nuevo no lo cambia.']
  ],
  cites: ['Myers, G., Sandler, C. y Badgett, T. (2011). *The Art of Software Testing* (3.ª ed.). Wiley. Capítulo 4.', 'Kuhn, D. R., Wallace, D. y Gallo, A. (2004). Software Fault Interactions and Implications for Software Testing. *IEEE Transactions on Software Engineering*, 30(6).', 'DeMillo, R., Lipton, R. y Sayward, F. (1978). Hints on Test Data Selection: Help for the Practicing Programmer. *IEEE Computer*, 11(4).', 'Claessen, K. y Hughes, J. (2000). QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs. *ICFP 2000*.', 'Miller, B., Fredriksen, L. y So, B. (1990). An Empirical Study of the Reliability of UNIX Utilities. *Communications of the ACM*, 33(12).'],
  project: { t: 'Diseño de casos para una función crítica',
    goal: 'Aplicar todas las técnicas a una misma función y medir cuál encuentra más defectos.',
    steps: ['Elige una función con varias reglas (cálculo de cobro con días, tipo de vehículo, cliente VIP y feriados).', 'Diseña casos con particiones, valores límite, tabla de decisiones y transiciones de estado; documenta cada uno.', 'Mide la cobertura de ramas y luego el puntaje de mutación con Stryker; agrega pruebas hasta superar 85%.', 'Escribe tres pruebas basadas en propiedades con fast-check.', 'Pide a un compañero que siembre cinco defectos sin decirte dónde y cuenta cuántos detecta tu suite.'],
    deliver: 'El documento de diseño de casos, la suite, los informes de cobertura y mutación, y el resultado de los defectos sembrados.' },
  hito: ['Diseña los casos de prueba de la validación de placas y del cálculo de cobros de PatioApp con particiones de equivalencia y valores límite.', 'Mide la cobertura de ramas y el puntaje de mutación de PatioApp y súbelos por encima de 80%.']
});

X('m14.metrics', {
  deep: `
## ¿Qué es calidad?
Philip Crosby la definió en *Quality Is Free* (1979) como **conformidad con los requisitos**; Joseph Juran, como **aptitud para el uso**. La primera mira la especificación; la segunda, al usuario. Un software puede cumplir su especificación y no servir, y por eso ambas visiones se complementan. Los primeros modelos de calidad del software los propusieron Jim McCall (1977) y Barry Boehm (1978), y de ellos desciende la norma ISO/IEC 25010.

## Métricas de código clásicas
- **Complejidad ciclomática** (McCabe, 1976): caminos independientes; más de 10 por función es señal de alerta.
- **Métricas de Halstead** (1977): a partir de la cantidad de operadores y operandos estiman el volumen y la dificultad de un programa.
- **Índice de mantenibilidad** (Oman y Hagemeister, 1992): combina Halstead, complejidad y líneas en un número de 0 a 100.
- **Métricas orientadas a objetos** (Chidamber y Kemerer, 1994): acoplamiento entre objetos (CBO), profundidad de herencia (DIT), número de hijos, falta de cohesión de métodos (LCOM), entre otras.
- **Duplicación** y **advertencias de análisis estático** (ESLint, SonarQube).
Una advertencia: estas métricas indican dónde mirar, no si el código es bueno. Úsalas como **tendencia** en el tiempo y como alarma, no como meta.

## Dónde están los defectos
Nachiappan Nagappan y Thomas Ball mostraron en Microsoft (2005) que la **frecuencia de cambios** de un archivo (*code churn*) predice muy bien dónde aparecerán defectos: lo que más se modifica, más se rompe. Combinado con el principio de agrupamiento de defectos, sugiere concentrar revisiones y pruebas en los archivos más cambiados y complejos (los *hotspots*), como propone Adam Tornhill en *Your Code as a Crime Scene*.

## Eficiencia en la remoción de defectos
Capers Jones popularizó la **eficiencia de remoción de defectos** (DRE): el porcentaje de defectos que se encuentran antes de la publicación sobre el total (antes + después). En sus datos, las organizaciones promedio rondan el 85% y las mejores superan el 95%, combinando revisiones, análisis estático y pruebas; ninguna técnica por sí sola supera el 60% a 70%.
~~~js
function dre(antes, despues) { return (100 * antes / (antes + despues)).toFixed(1) + '%'; }
console.log('equipo A:', dre(170, 30), '· equipo B:', dre(285, 15));
~~~

## Las métricas DORA
El programa DevOps Research and Assessment, cuyos resultados presentan Nicole Forsgren, Jez Humble y Gene Kim en *Accelerate* (2018), identificó cuatro métricas que distinguen a los equipos de alto rendimiento:
| Métrica | Mide | Alto rendimiento |
| Frecuencia de despliegue | con qué frecuencia se publica a producción | varias veces al día o a demanda |
| Tiempo de entrega de cambios | del commit a producción | menos de un día |
| Tasa de fallos de cambio | qué porcentaje de despliegues causa problemas | baja |
| Tiempo de restauración | cuánto se tarda en recuperarse de una falla | menos de una hora |
Su hallazgo más importante: **velocidad y estabilidad no se oponen**. Los mejores equipos despliegan más seguido y fallan menos, porque cambios pequeños y frecuentes son más fáciles de verificar y de revertir. Desde 2021 los informes agregan una quinta dimensión, la fiabilidad operativa.

## Madurez de procesos
El **CMMI** (Integración de Modelos de Madurez de Capacidades), desarrollado por el Software Engineering Institute de Carnegie Mellon, describe cinco niveles de madurez: inicial (caótico), gestionado (proyectos planificados), definido (procesos estándar de la organización), gestionado cuantitativamente (medido) y en optimización (mejora continua). Muchas licitaciones públicas y contratos grandes lo exigen. La norma ISO 9001 certifica sistemas de gestión de calidad en general, y en el Perú también es común en empresas que contratan con el Estado.

## Medir sin destruir lo medido
La ley de Goodhart se cumple con crueldad en el software: si se premia la cobertura, aparecen pruebas sin aserciones; si se premia cerrar tickets, se dividen tickets; si se cuentan líneas de código, el código crece. Las métricas sirven para **aprender y conversar**, se interpretan en conjunto y siempre se preguntan para qué se miden, como propone el método GQM que verás en el módulo de fundamentos de ingeniería.`,
  checks: [
    ['¿En qué se diferencian las definiciones de calidad de Crosby y de Juran?', 'Crosby la define como conformidad con los requisitos; Juran, como aptitud para el uso. La primera mira la especificación y la segunda, la utilidad para el usuario.'],
    ['Un equipo encontró 170 defectos antes de publicar y los usuarios reportaron 30. ¿Cuál es su DRE?', '170 / 200 = 85%.'],
    ['¿Cuál es el hallazgo central de las métricas DORA sobre velocidad y estabilidad?', 'Que no se oponen: los equipos de mejor desempeño despliegan con más frecuencia y a la vez tienen menos fallas y se recuperan más rápido.'],
    ['¿Qué predice la frecuencia de cambios de un archivo y cómo lo aprovecharías?', 'Dónde aparecerán más defectos; concentraría revisiones, pruebas y refactorizaciones en los archivos más modificados y complejos.'],
    ['¿Qué pasa si se pone como meta "100% de cobertura"?', 'Por la ley de Goodhart, el equipo escribirá pruebas para subir el número aunque no verifiquen nada útil; la métrica deja de reflejar la calidad.']
  ],
  cites: ['Crosby, P. (1979). *Quality Is Free*. McGraw-Hill.', 'Chidamber, S. y Kemerer, C. (1994). A Metrics Suite for Object Oriented Design. *IEEE Transactions on Software Engineering*, 20(6).', 'Nagappan, N. y Ball, T. (2005). Use of Relative Code Churn Measures to Predict System Defect Density. *ICSE 2005*.', 'Jones, C. (2008). *Applied Software Measurement* (3.ª ed.). McGraw-Hill.', 'Forsgren, N., Humble, J. y Kim, G. (2018). *Accelerate*. IT Revolution.', 'Tornhill, A. (2015). *Your Code as a Crime Scene*. Pragmatic Bookshelf.'],
  project: { t: 'Panel de calidad del proyecto',
    goal: 'Recolectar métricas de calidad reales de un repositorio y usarlas para decidir dónde mejorar.',
    steps: ['Mide complejidad ciclomática, duplicación y advertencias de análisis estático de tu proyecto con herramientas como ESLint o SonarQube.', 'Calcula con un script sobre git log qué archivos cambian más y crúzalo con su complejidad para hallar los puntos críticos.', 'Calcula tus cuatro métricas DORA a partir del historial de Git y de la integración continua.', 'Elige los dos puntos críticos principales y mejóralos; vuelve a medir.', 'Escribe qué métrica no usarías como meta y por qué.'],
    deliver: 'El panel (una página o un informe en Markdown) con las métricas antes y después y las decisiones tomadas.' },
  hito: ['Agrega a la integración continua de PatioApp un panel de calidad: cobertura, complejidad, duplicación y advertencias de análisis estático en cada pull request.', 'Calcula las métricas DORA de PatioApp (frecuencia de despliegue, tiempo de entrega, tasa de fallos y tiempo de restauración) a partir de Git y la integración continua.']
});
})();
