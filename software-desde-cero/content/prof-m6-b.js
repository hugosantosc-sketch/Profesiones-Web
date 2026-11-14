(function () {
var S = SDC.S;

S('m6', 'm6.types', { title: 'Diseñar con tipos',
  ask: '¿Qué concepto de diseño con tipos se aplica?',
  lesson: `
> **La idea en simple.** Un enchufe de tres patas no entra en un tomacorriente de dos: el diseño físico impide un error antes de que ocurra. Los tipos son lo mismo en el código: si el sistema de tipos sabe que una función espera un monto en soles y le pasas una placa, el error aparece al escribir el código, no a las tres de la mañana en producción. Diseñar con tipos es usar esa herramienta a propósito para que los errores sean imposibles de escribir.

## Qué es un tipo y para qué sirve
Un **tipo** describe un conjunto de valores posibles y las operaciones permitidas sobre ellos: un número, un texto, una lista de estadías, una función que recibe una placa y devuelve una unidad. Los tipos sirven para:
- **Detectar errores** antes de ejecutar (pasar un texto donde va un número, llamar a un método que no existe, olvidar un caso).
- **Documentar** el código de forma que nunca se desactualiza, porque el compilador la verifica.
- **Ayudar a las herramientas:** autocompletado, navegación y refactorizaciones seguras en el editor.
- **Modelar el dominio**: expresar en el código qué estados son posibles y cuáles no.
En Lenguajes y Compiladores verás la teoría (sistemas de tipos, inferencia, solidez); aquí el foco es **cómo usarlos al construir software**.

## Estático y dinámico, fuerte y débil
- Con **tipado estático** (Java, C#, Go, Rust, TypeScript, Kotlin), los tipos se verifican antes de ejecutar; con **tipado dinámico** (JavaScript, Python, Ruby), durante la ejecución.
- Con **tipado fuerte**, el lenguaje no convierte valores de un tipo a otro de forma implícita y sorprendente; con **débil**, sí («"5" * 2» da 10 en JavaScript).
- El **tipado gradual** permite agregar tipos de a poco a un lenguaje dinámico: TypeScript (Microsoft, 2012) sobre JavaScript, y las anotaciones de tipo de Python (PEP 484, 2014) verificadas con mypy o Pyright. Su adopción masiva en la industria muestra que los equipos valoran los tipos a medida que el código y el equipo crecen: el estudio de Gao, Bird y Barr (2017) estimó que los tipos estáticos habrían evitado alrededor del 15 % de los defectos públicos analizados en proyectos de JavaScript.

## El error del millón de dólares
Tony Hoare, el inventor del algoritmo Quicksort, introdujo en 1965 la **referencia nula** en el lenguaje ALGOL W. En 2009 la llamó públicamente su "**error del millón de dólares**", porque ha causado innumerables fallas, vulnerabilidades y caídas de sistemas: cualquier referencia podía ser nula, y el tipo no lo decía. Los lenguajes modernos lo corrigen haciendo explícita la ausencia:
- **Tipos opcionales:** «Option» en Rust y Scala, «Optional» en Java, «Maybe» en Haskell.
- **Seguridad de nulos:** en Kotlin, Swift, C# 8+ y TypeScript con «strictNullChecks», el tipo «string» no admite nulo; para permitirlo hay que escribir «string | null» o «String?», y el compilador obliga a verificarlo antes de usarlo.

## Tipos algebraicos
Dos formas de combinar tipos, llamadas **algebraicas** por su parecido con la suma y la multiplicación:
- **Tipos producto:** contienen varios valores a la vez (un registro, una tupla, un objeto). Una estadía **tiene** placa **y** ingreso **y** espacio.
- **Tipos suma** (uniones discriminadas, enumeraciones con datos, variantes): son **una entre varias** alternativas. Un pago **es** en efectivo **o** con tarjeta (con su número de autorización) **o** por convenio (con el código del convenio).
Con tipos suma y la **verificación de exhaustividad** del compilador, si se agrega un nuevo medio de pago, el compilador señala todos los lugares que no lo manejan. Lenguajes como Rust, Swift, Kotlin, Scala, F#, Haskell y TypeScript (con uniones discriminadas) los tienen; en JavaScript sin tipos se imitan con un campo «tipo» y disciplina.
~~~js
// Unión discriminada imitada en JavaScript: el campo "medio" decide la forma
function describir(pago) {
  switch (pago.medio) {
    case 'efectivo': return 'Efectivo: S/ ' + pago.monto;
    case 'tarjeta':  return 'Tarjeta (autorización ' + pago.autorizacion + '): S/ ' + pago.monto;
    case 'convenio': return 'Convenio ' + pago.codigo + ': S/ ' + pago.monto;
    default: throw new Error('medio de pago no manejado: ' + pago.medio);   // en TypeScript, el compilador lo detectaría
  }
}
console.log(describir({ medio: 'tarjeta', monto: 60, autorizacion: 'A81F' }));
console.log(describir({ medio: 'convenio', monto: 45, codigo: 'ASEG-01' }));
~~~

## Hacer irrepresentables los estados ilegales
Yaron Minsky, de la empresa Jane Street, acuñó la frase **"haz irrepresentables los estados ilegales"** (*make illegal states unrepresentable*). Ejemplo: una estadía modelada así:
~~~txt
Estadia { estado: texto, salida: fecha o nulo, monto: número o nulo, motivoAnulacion: texto o nulo }
~~~
permite combinaciones absurdas: estado "abierta" con fecha de salida, estado "cerrada" sin monto, una anulación sin motivo. Cada función debe verificarlas y alguna olvidará hacerlo. Con un tipo suma, cada estado tiene exactamente los datos que le corresponden:
~~~txt
Estadia =
  | Abierta  { placa, ingreso, espacio }
  | Cerrada  { placa, ingreso, salida, monto }
  | Anulada  { placa, ingreso, motivo }
~~~
Ahora es **imposible** construir una estadía cerrada sin monto o una anulada sin motivo. Scott Wlaschin desarrolla esta idea en *Domain Modeling Made Functional* (2018), que muestra cómo expresar todo un dominio con tipos.

## Tipos para el dominio
- **Tipos con nombre en lugar de primitivos** (contra la "obsesión por los primitivos" de Fowler): «Placa», «Soles», «Dni» en lugar de «string» y «number» por todas partes. Así el compilador impide pasar un DNI donde va una placa, aunque ambos sean textos. En TypeScript se logra con "tipos marcados" (*branded types*); en otros lenguajes, con tipos envoltorio de costo cero.
- **Validar en el borde, confiar dentro** (*parse, don't validate*, título de un artículo de Alexis King de 2019): en lugar de validar un texto y seguir pasándolo como texto (y volver a validarlo, o olvidarlo, en otros lugares), se lo **convierte** una sola vez, al entrar al sistema, en un tipo que solo puede contener valores válidos. Una función que recibe una «Placa» sabe que es válida porque la única forma de obtener una es a través de la función que la valida.
- **Unidades de medida:** confundir unidades ha causado desastres. La sonda **Mars Climate Orbiter** de la NASA se perdió en 1999 porque un equipo calculaba el impulso en libras-fuerza por segundo y otro esperaba newtons por segundo. F# tiene unidades de medida en su sistema de tipos; en otros lenguajes se usan tipos distintos para cada unidad.
~~~js
// "Parse, don't validate": la única forma de obtener una Placa es a través de crearPlaca
function crearPlaca(texto) {
  const t = String(texto).trim().toUpperCase();
  if (!/^[A-Z0-9]{3}-[0-9]{3}$/.test(t)) return { ok: false, error: 'placa inválida: ' + texto };
  return { ok: true, valor: Object.freeze({ tipo: 'Placa', valor: t }) };
}
console.log(crearPlaca(' abc-123 '));
console.log(crearPlaca('ABC123'));
~~~

## Genéricos
Los **genéricos** (o polimorfismo paramétrico) permiten escribir código que funciona con muchos tipos sin perder la información de tipo: una «Lista<Estadia>», una función «primero<T>(lista: T[]): T | undefined», un repositorio «Repositorio<Unidad>». Java los incorporó en 2004 (versión 5), C# en 2005 y Go en 2022 (versión 1.18), tras años de debate. Las **restricciones** de los genéricos (por ejemplo, "cualquier T que tenga un identificador") permiten operar sobre ellos sin perder seguridad.

## Los límites de los tipos
Los tipos no lo verifican todo: que una tarifa se calcule correctamente, que una lista quede ordenada o que no haya condiciones de carrera normalmente quedan fuera de lo que puede expresar un sistema de tipos común. Por eso tipos y pruebas son **complementarios**: los tipos eliminan clases enteras de errores para siempre; las pruebas verifican el comportamiento. Los lenguajes con **tipos dependientes** (Idris, Agda, Lean, Coq) pueden expresar propiedades mucho más fuertes ("una lista de longitud n"), y llevan a la verificación formal que verás en Métodos formales.

## Ejemplo resuelto: migrar PatioApp a TypeScript
1. **Gradualmente:** se activa TypeScript con «allowJs»; los archivos se migran uno por uno empezando por el dominio (tarifas, estadías).
2. **Modo estricto** con «strictNullChecks»: aparecen 37 lugares donde podía llegar un nulo sin verificación; 4 de ellos eran errores reales que ocurrían en producción con unidades sin espacio asignado.
3. **Estadía como unión discriminada** (abierta, cerrada, anulada): se eliminan decenas de verificaciones defensivas y el compilador señala dos funciones que no manejaban las estadías anuladas.
4. **Tipos marcados** para «Placa», «Soles» y «SedeId», creados solo por funciones de validación en el borde (controladores y consumidores de eventos).
5. **Medio de pago** como unión discriminada con verificación exhaustiva: cuando se agregó el pago con Yape, el compilador listó los seis lugares que debían manejarlo.`,
  links: [['lc.types', 'la teoría de los sistemas de tipos se estudia en Lenguajes y Compiladores'], ['m13.ddd', 'los objetos de valor del dominio se expresan bien con tipos'], ['m6.design', 'los tipos hacen explícitas las interfaces entre módulos']],
  read: 'Wlaschin, *Domain Modeling Made Functional* (2018); King, *Parse, don’t validate* (2019); Hoare, *Null References: The Billion Dollar Mistake* (QCon, 2009); manual de TypeScript.',
  terms: [
    ['Tipado estático', 'verificación de los tipos antes de ejecutar el programa', ['TypeScript, Java, Rust.', 'Detecta errores al compilar.', 'Se opone al dinámico.']],
    ['Tipado gradual', 'posibilidad de agregar tipos de a poco a un lenguaje dinámico', ['TypeScript sobre JavaScript.', 'Anotaciones de Python con mypy.', 'Migración archivo por archivo.']],
    ['Seguridad de nulos', 'característica del sistema de tipos que obliga a declarar y verificar los valores que pueden ser nulos', ['strictNullChecks.', 'String? en Kotlin.', 'Corrige el error del millón de dólares.']],
    ['Tipo suma', 'tipo cuyos valores son una entre varias alternativas, cada una con sus datos', ['Pago en efectivo, tarjeta o convenio.', 'Unión discriminada.', 'Permite verificar exhaustividad.']],
    ['Tipo producto', 'tipo que contiene varios valores a la vez', ['Un registro o una tupla.', 'Placa y ingreso y espacio.', 'Se combina con los tipos suma.']],
    ['Estados ilegales irrepresentables', 'principio de modelar los tipos para que las combinaciones inválidas no puedan construirse', ['Minsky, Jane Street.', 'Estadía cerrada siempre con monto.', 'Elimina verificaciones defensivas.']],
    ['Parse, don’t validate', 'convertir los datos externos una sola vez en tipos que solo admiten valores válidos', ['Alexis King, 2019.', 'Validar en el borde.', 'Dentro se confía en el tipo.']],
    ['Genéricos', 'mecanismo para escribir código que funciona con muchos tipos sin perder la información de tipo', ['Lista<Estadia>.', 'Java 5, Go 1.18.', 'Polimorfismo paramétrico.']]
  ],
  q: [
    ['¿Qué llamó Tony Hoare su "error del millón de dólares"?', 'La referencia nula', ['El goto', 'Quicksort', 'Las variables globales'], 'ALGOL W, 1965.', 2],
    ['En JavaScript, ¿por qué "5" * 2 da 10?', 'Porque el tipado es débil y convierte implícitamente el texto a número', ['Porque es tipado estático', 'Porque es un error de sintaxis', 'Porque 5 es un número'], 'Tipado débil.', 2],
    ['¿Qué ventaja tiene modelar el medio de pago como tipo suma con verificación exhaustiva?', 'Al agregar un medio nuevo, el compilador señala todos los lugares que no lo manejan', ['Ocupa menos memoria', 'Evita usar bases de datos', 'No tiene ventajas'], 'Exhaustividad.', 3],
    ['¿Qué significa "haz irrepresentables los estados ilegales"?', 'Diseñar los tipos para que las combinaciones inválidas no se puedan construir', ['Borrar los estados inválidos de la base', 'Ocultar los errores al usuario', 'Usar solo números'], 'Frase de Yaron Minsky.', 3],
    ['¿Por qué se perdió la Mars Climate Orbiter en 1999?', 'Por una confusión de unidades entre libras-fuerza y newtons', ['Por una referencia nula', 'Por un desbordamiento de enteros', 'Por un ataque informático'], 'Unidades de medida en los tipos lo habrían evitado.', 3],
    ['Según "parse, don’t validate", ¿dónde se valida una placa?', 'Una sola vez en el borde, convirtiéndola en un tipo Placa que solo admite valores válidos', ['En cada función que la usa', 'Nunca', 'Solo en la base de datos'], 'Alexis King, 2019.', 4],
    ['¿Qué verifican normalmente los tipos y qué no?', 'Que los valores tengan la forma correcta, pero no que una tarifa se calcule bien', ['Todo el comportamiento del programa', 'Solo el formato del código', 'Nada útil'], 'Tipos y pruebas son complementarios.', 2],
    { tf: 'TypeScript permite migrar un proyecto de JavaScript de forma gradual, archivo por archivo.', v: true, e: 'Es un sistema de tipado gradual.', l: 1 },
    { tf: 'Con tipos estáticos ya no hacen falta pruebas.', v: false, e: 'Los tipos no verifican el comportamiento; se complementan con pruebas.', l: 1 },
    { c: 'Escribe «crearPlaca(texto)»: limpia espacios y pasa a mayúsculas; si cumple el formato AAA-999 (tres letras o dígitos, guion, tres dígitos) devuelve {ok: true, valor}, si no, {ok: false}.', f: 'crearPlaca', p: ['texto'], t: [[[' abc-123 '], { ok: true, valor: 'ABC-123' }], [['ABC123'], { ok: false }], [['A1B-999'], { ok: true, valor: 'A1B-999' }]], sol: '  const t = String(texto).trim().toUpperCase();\n  return /^[A-Z0-9]{3}-[0-9]{3}$/.test(t) ? { ok: true, valor: t } : { ok: false };', l: 2 },
    { c: 'Escribe «montoEstadia(e)»: e es una unión discriminada con estado "abierta" (sin monto), "cerrada" ({monto}) o "anulada"; devuelve el monto si está cerrada y 0 en los otros casos; si el estado es desconocido, lanza un Error.', f: 'montoEstadia', p: ['e'], t: [[[{ estado: 'cerrada', monto: 60 }], 60], [[{ estado: 'abierta' }], 0], [[{ estado: 'anulada', motivo: 'error' }], 0]], sol: '  switch (e.estado) { case "cerrada": return e.monto; case "abierta": case "anulada": return 0; default: throw new Error("estado desconocido"); }', l: 2 },
    { c: 'Escribe «estadosIlegales(estadias)»: cada estadía es {estado, salida, monto}; devuelve cuántas son inconsistentes: "abierta" con salida no nula, o "cerrada" con monto nulo.', f: 'estadosIlegales', p: ['estadias'], t: [[[[{ estado: 'abierta', salida: null, monto: null }, { estado: 'abierta', salida: 5, monto: null }, { estado: 'cerrada', salida: 9, monto: null }]], 2], [[[]], 0]], sol: '  return estadias.filter(e => (e.estado === "abierta" && e.salida !== null) || (e.estado === "cerrada" && e.monto === null)).length;', l: 3 }
  ],
  gen: function (g) {
    var le = [['TypeScript', 'Estático y gradual'], ['JavaScript', 'Dinámico'], ['Rust', 'Estático'], ['Python con anotaciones verificadas por mypy', 'Estático y gradual'], ['Ruby', 'Dinámico'], ['Go', 'Estático']];
    le.forEach(function (l) { g.mcq(2, '¿Cómo se clasifica el tipado de ' + l[0] + '?', l[1], ['Estático', 'Dinámico', 'Estático y gradual', 'Sin tipos'].filter(function (x) { return x !== l[1]; }), 'Estático, dinámico y gradual.'); });
    var ad = [['Una estadía tiene placa, ingreso y espacio', 'Tipo producto'], ['Un pago es en efectivo, con tarjeta o por convenio', 'Tipo suma'], ['Una función primero<T> que sirve para cualquier lista', 'Genéricos'], ['Un texto que puede faltar se declara como string | null', 'Seguridad de nulos'], ['Un tipo Placa distinto de string aunque por dentro sea texto', 'Tipo con nombre del dominio']];
    ad.forEach(function (a) { g.mcq(2, '¿Qué concepto de tipos es? ' + a[0], a[1], ['Tipo producto', 'Tipo suma', 'Genéricos', 'Seguridad de nulos', 'Tipo con nombre del dominio'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Herramientas para diseñar con tipos.'); });
    var il = [['Estadía con estado "abierta" y fecha de salida', 'Ilegal'], ['Estadía cerrada con monto y salida', 'Válida'], ['Estadía anulada sin motivo', 'Ilegal'], ['Estadía abierta con espacio asignado', 'Válida'], ['Estadía cerrada sin monto', 'Ilegal']];
    il.forEach(function (i) { g.mcq(1, 'Con el modelo Abierta/Cerrada/Anulada, ¿este estado es válido o ilegal? ' + i[0], i[1], ['Válida', 'Ilegal', 'Depende del operador'].concat(['Indefinido']).filter(function (x) { return x !== i[1]; }), 'Los tipos suma impiden los estados ilegales.'); });
  },
  checks: [
    ['¿Para qué sirven los tipos al construir software?', 'Para detectar errores antes de ejecutar, documentar de forma verificada, ayudar a las herramientas y modelar el dominio.'],
    ['Explica con un ejemplo cómo un tipo suma hace irrepresentables los estados ilegales.', 'Una estadía como Abierta, Cerrada o Anulada, cada una con sus datos, impide construir una cerrada sin monto.'],
    ['¿Qué significa "parse, don’t validate"?', 'Convertir los datos externos una vez, en el borde, en tipos que solo admiten valores válidos, y confiar en esos tipos dentro del sistema.'],
    ['¿Por qué tipos y pruebas son complementarios?', 'Los tipos eliminan clases enteras de errores de forma, pero no verifican el comportamiento; las pruebas sí.']
  ],
  cites: ['Hoare, C. A. R. (2009). Null References: The Billion Dollar Mistake. *QCon London*.', 'Minsky, Y. (2011). Effective ML. *Jane Street Tech Blog*.', 'Wlaschin, S. (2018). *Domain Modeling Made Functional*. Pragmatic Bookshelf.', 'King, A. (2019). Parse, don’t validate. lexi-lambda.github.io.', 'Gao, Z., Bird, C. y Barr, E. (2017). To Type or Not to Type: Quantifying Detectable Bugs in JavaScript. *ICSE 2017*.', 'NASA (1999). *Mars Climate Orbiter Mishap Investigation Board Phase I Report*.'],
  project: { t: 'Modelar un dominio con tipos',
    goal: 'Expresar las reglas de un dominio con un sistema de tipos y medir los errores que evita.',
    steps: ['Elige un dominio con estados (un pedido, una reserva, un trámite) y lista sus estados y los datos de cada uno.', 'Modélalo en TypeScript (u otro lenguaje con tipos suma) de forma que los estados ilegales sean irrepresentables.', 'Crea tipos con nombre para los valores del dominio, construidos solo por funciones de validación en el borde.', 'Activa el modo estricto y documenta los errores que detecta el compilador.', 'Agrega un estado nuevo y registra cuántos lugares señala la verificación exhaustiva.'],
    deliver: 'El código, la lista de errores detectados y el análisis.' },
  hito: ['Migra el dominio de PatioApp (estadías, tarifas y pagos) a TypeScript estricto con la estadía como unión discriminada.', 'Crea en PatioApp los tipos Placa, Soles y SedeId validados en el borde, y agrega el pago con Yape siguiendo los avisos del compilador.']
});
SDC.after('m6.types', 'm6.design');

S('m6', 'm6.perf', { title: 'Rendimiento en el código: medir, perfilar y optimizar',
  ask: '¿Qué concepto de rendimiento en la construcción de software se aplica?',
  lesson: `
> **La idea en simple.** Un programa lento no se arregla adivinando. Es como un médico que receta sin examinar: puede acertar, pero lo más probable es que trate el síntoma equivocado. Optimizar bien es medir dónde se va realmente el tiempo, corregir eso, y volver a medir. Y casi siempre la mejora grande viene de un mejor algoritmo o de evitar trabajo innecesario, no de trucos ingeniosos en una línea.

## La cita completa de Knuth
Donald Knuth escribió en 1974, en *Structured Programming with go to Statements*, una frase que se cita a medias:
:::cita Deberíamos olvidarnos de las pequeñas eficiencias, digamos el 97 % del tiempo: la optimización prematura es la raíz de todos los males. Sin embargo, no deberíamos dejar pasar nuestras oportunidades en ese 3 % crítico. | Donald Knuth, 1974
La segunda parte importa tanto como la primera: no se trata de ignorar el rendimiento, sino de no sacrificar claridad por micro-optimizaciones **sin evidencia**, y de concentrar el esfuerzo en las pocas partes que realmente importan. Knuth agregaba que la intuición de los programadores sobre dónde están esas partes suele fallar, y que por eso hay que medir.

## El orden de las optimizaciones
De mayor a menor impacto habitual:
1. **No hacer el trabajo:** ¿hace falta calcular esto? ¿Se puede calcular una vez y guardar el resultado (caché, memoización)? ¿Se puede hacer de forma diferida, solo si se necesita?
2. **Mejor algoritmo y estructura de datos:** pasar de O(n²) a O(n log n) o de buscar en una lista a buscar en un mapa cambia los órdenes de magnitud. Con 100 000 elementos, O(n²) son 10 000 millones de operaciones; O(n log n), unos 1,7 millones.
3. **Menos entrada y salida:** acceder a disco o red es miles de veces más lento que a memoria. Agrupar consultas a la base, evitar el problema de "N + 1" consultas, traer solo las columnas necesarias.
4. **Mejor uso de la memoria y la caché del procesador:** recorrer los datos en el orden en que están guardados, evitar crear objetos innecesarios.
5. **Concurrencia y paralelismo**, cuando el trabajo se puede dividir.
6. **Micro-optimizaciones** en el código caliente, guiadas por el perfilador.

## Los números que todo programador debería conocer
Jeff Dean, de Google, popularizó una tabla de latencias aproximadas (actualizada por varios autores con el tiempo) para razonar sin medir cada vez. Órdenes de magnitud típicos:
| Operación | Tiempo aproximado |
| Referencia a la caché L1 del procesador | 1 ns |
| Referencia a la memoria principal | 100 ns |
| Leer 1 MB secuencial de memoria | unos 3 µs |
| Lectura aleatoria en un SSD | unos 16 µs |
| Ida y vuelta dentro de un mismo centro de datos | unos 500 µs |
| Leer 1 MB secuencial de un SSD | unos 50 µs a 1 ms |
| Búsqueda en un disco duro mecánico | unos 2 a 10 ms |
| Ida y vuelta de Lima a São Paulo | unos 60 a 80 ms |
| Ida y vuelta de Lima a Estados Unidos | unos 100 a 150 ms |
La lección: una sola consulta de red cuesta lo mismo que cientos de miles de operaciones en memoria. Un programa que hace 200 consultas a la base de datos para mostrar una pantalla será lento aunque cada consulta sea "rápida".

## Medir bien
- **Perfiladores:** muestran en qué funciones se gasta el tiempo de CPU o la memoria. En el navegador y en Node.js, las herramientas de desarrollo de Chrome; en Python, cProfile y py-spy; en Java, async-profiler y JFR. Los **gráficos de llama** que viste en Pruebas resumen el resultado.
- **Microbenchmarks:** medir una función aislada exige cuidado: calentar el código (los compiladores JIT optimizan después de muchas ejecuciones), repetir muchas veces, mirar la distribución y no solo el promedio, y evitar que el compilador elimine el código "inútil" cuyo resultado no se usa. Bibliotecas como Benchmark.js, JMH (Java) o pytest-benchmark lo resuelven.
- **Medir en condiciones realistas:** con volúmenes de datos parecidos a los de producción y, si es posible, en producción misma, con trazas.
- **Una cosa a la vez:** cambiar una sola cosa, medir de nuevo y conservar el cambio solo si mejora.

## Problemas típicos en aplicaciones
- **El problema N + 1:** se consulta una lista de N estadías y luego, por cada una, se hace otra consulta para traer su unidad: N + 1 consultas en lugar de 1 o 2. Es el problema de rendimiento más común con los ORM, que lo esconden detrás de un acceso a una propiedad. Se resuelve con un JOIN o con carga anticipada (*eager loading*).
- **Algoritmos cuadráticos escondidos:** un «includes» o un «indexOf» dentro de un bucle sobre una lista convierte una operación lineal en cuadrática.
- **Concatenar textos en un bucle** en lenguajes donde los textos son inmutables crea una copia nueva en cada paso.
- **Expresiones regulares con retroceso catastrófico:** patrones como «(a+)+$» pueden tardar un tiempo exponencial con ciertas entradas. En julio de 2019, una regla de su firewall con una expresión así consumió el 100 % de la CPU de los servidores de Cloudflare en todo el mundo y dejó caídos millones de sitios durante 27 minutos.
- **Fugas de memoria:** cachés sin límite, oyentes de eventos que nunca se quitan, referencias que impiden al recolector de basura liberar memoria.
~~~js
// Un algoritmo cuadrático escondido y su versión lineal
function duplicadasLento(placas) {          // includes dentro del bucle: O(n²)
  const vistas = [], dup = [];
  for (const p of placas) { if (vistas.includes(p)) dup.push(p); else vistas.push(p); }
  return dup;
}
function duplicadasRapido(placas) {         // Set: O(n)
  const vistas = new Set(), dup = [];
  for (const p of placas) { if (vistas.has(p)) dup.push(p); else vistas.add(p); }
  return dup;
}
const muchas = Array.from({ length: 20000 }, (_, i) => 'P' + (i % 15000));
let t = Date.now(); duplicadasLento(muchas); const lento = Date.now() - t;
t = Date.now(); duplicadasRapido(muchas); const rapido = Date.now() - t;
console.log('lento:', lento, 'ms · rápido:', rapido, 'ms');
~~~

## Caché y memoización
Guardar resultados para no recalcularlos es la optimización más poderosa y la más peligrosa. Phil Karlton dijo que en informática hay solo dos cosas difíciles: **invalidar cachés** y ponerle nombre a las cosas. Preguntas antes de agregar una caché: ¿cuándo deja de ser válido el dato guardado? ¿Qué pasa si alguien ve un dato viejo? ¿Cuánta memoria puede ocupar (y qué se expulsa cuando se llena: el menos usado recientemente, LRU)? La **memoización** es la caché de una función pura: como su resultado solo depende de sus argumentos, nunca se invalida.

## Rendimiento y legibilidad
Cuando una optimización complica el código, conviene:
- Encapsularla detrás de una interfaz clara, para que el resto del código no la vea.
- Documentar **por qué** existe y con qué medición se justificó.
- Proteger el resultado con un benchmark en la integración continua, para detectar si alguien la deshace sin querer.
- Eliminarla si las condiciones cambian y ya no hace falta.

## Ejemplo resuelto: la pantalla de deudas de PatioApp
La pantalla que lista las estadías con deuda de un patio tarda 9 segundos con 2000 estadías abiertas.
1. **Medir:** las trazas muestran 2001 consultas a la base: una para las estadías y una por cada estadía para traer la unidad (N + 1). El perfilador del servidor muestra además que el 30 % de la CPU se va en una función que busca el convenio de cada unidad recorriendo la lista de convenios con «find».
2. **Corregir el N + 1:** una sola consulta con JOIN. Tiempo: 1,4 segundos.
3. **Corregir el cuadrático:** los convenios se cargan en un Map por código antes del bucle. Tiempo: 0,5 segundos.
4. **No hacer el trabajo:** la tarifa de cada estadía se recalculaba con todas las reglas; las tarifas del día se calculan una vez por tipo de unidad y convenio (memoización). Tiempo: 0,3 segundos.
5. **Paginación:** la pantalla muestra 50 por página; la consulta trae solo esas. Tiempo: 80 ms.
6. Se agrega una prueba de rendimiento con 5000 estadías que falla si la consulta supera los 300 ms, y un detector de consultas N + 1 en las pruebas de integración.`,
  links: [['m4.bigo', 'la notación O mide el crecimiento del costo de los algoritmos'], ['m14.perf', 'las pruebas de rendimiento miden el sistema completo bajo carga'], ['arq.mem', 'la jerarquía de memoria explica las diferencias de latencia']],
  read: 'Knuth (1974); Bentley, *Programming Pearls* (2.ª ed., 2000); Gregg, *Systems Performance* (2.ª ed., 2020); informe de Cloudflare sobre la caída del 2 de julio de 2019.',
  terms: [
    ['Optimización prematura', 'sacrificar claridad por eficiencia sin evidencia de que importa', ['Knuth, 1974.', 'El 97 % del tiempo no conviene.', 'Pero no hay que ignorar el 3 % crítico.']],
    ['Perfilador', 'herramienta que mide en qué partes del programa se gasta el tiempo o la memoria', ['Herramientas de Chrome.', 'py-spy.', 'Produce gráficos de llama.']],
    ['Problema N + 1', 'hacer una consulta por cada elemento de una lista en lugar de una consulta conjunta', ['Común con los ORM.', '2001 consultas para 2000 estadías.', 'Se resuelve con JOIN o carga anticipada.']],
    ['Memoización', 'guardar el resultado de una función pura para no recalcularlo con los mismos argumentos', ['Nunca se invalida.', 'Tarifa por tipo y convenio.', 'Caché de funciones puras.']],
    ['Microbenchmark', 'medición aislada del rendimiento de una función pequeña', ['Requiere calentar el JIT.', 'Benchmark.js, JMH.', 'Se mira la distribución.']],
    ['Retroceso catastrófico', 'comportamiento exponencial de ciertas expresiones regulares con algunas entradas', ['Cloudflare, 2019.', 'Patrón (a+)+$.', 'Se evita con patrones seguros.']],
    ['LRU', 'política de expulsión de caché que descarta el elemento usado hace más tiempo', ['Least Recently Used.', 'Limita la memoria.', 'Muy común.']],
    ['Algoritmo cuadrático escondido', 'operación lineal dentro de un bucle que hace el costo total O(n²)', ['includes dentro de un for.', 'Se corrige con un Set o un Map.', 'Invisible con pocos datos.']]
  ],
  q: [
    ['¿Qué dice la cita completa de Knuth sobre la optimización?', 'Que la prematura es la raíz de todos los males, pero que no hay que dejar pasar las oportunidades en el 3 % crítico', ['Que nunca hay que optimizar', 'Que siempre hay que optimizar', 'Que la optimización es innecesaria con hardware moderno'], 'La segunda parte se olvida.', 2],
    ['¿Qué optimización suele tener mayor impacto?', 'Evitar trabajo innecesario o usar un mejor algoritmo', ['Renombrar variables', 'Cambiar comillas dobles por simples', 'Usar menos comentarios'], 'Orden de las optimizaciones.', 2],
    ['Una pantalla hace una consulta para la lista y luego una por cada elemento. ¿Qué problema es?', 'El problema N + 1', ['Una fuga de memoria', 'Un retroceso catastrófico', 'Una condición de carrera'], 'Se resuelve con JOIN.', 2],
    ['¿Por qué un includes dentro de un bucle puede ser lento?', 'Porque convierte el algoritmo en cuadrático', ['Porque includes está obsoleto', 'Porque usa la red', 'No es lento nunca'], 'Se usa un Set.', 3],
    ['¿Cuántas veces más lenta es aproximadamente una ida y vuelta en el mismo centro de datos que una referencia a memoria principal?', 'Unas 5000 veces', ['Unas 2 veces', 'Igual', 'Un millón de veces'], '500 µs frente a 100 ns.', 4],
    ['¿Qué causó la caída global de Cloudflare en julio de 2019?', 'Una expresión regular con retroceso catastrófico que consumió toda la CPU', ['Un ataque de denegación de servicio', 'Un corte eléctrico', 'Una base de datos llena'], 'Duró 27 minutos.', 3],
    ['¿Por qué la memoización de una función pura nunca necesita invalidarse?', 'Porque su resultado depende solo de sus argumentos', ['Porque se borra cada minuto', 'Porque no guarda nada', 'Sí necesita invalidarse siempre'], 'Funciones puras.', 3],
    { tf: 'Al medir una función con un microbenchmark conviene ejecutarla una sola vez.', v: false, e: 'Hay que calentar el JIT, repetir muchas veces y mirar la distribución.', l: 2 },
    { tf: 'Una sola consulta de red puede costar lo mismo que cientos de miles de operaciones en memoria.', v: true, e: 'Por eso importa reducir la entrada y salida.', l: 2 },
    { c: 'Escribe «duplicadas(placas)»: devuelve las placas que aparecen por segunda vez o más (en el orden en que se repiten), en tiempo lineal.', f: 'duplicadas', p: ['placas'], t: [[[['A', 'B', 'A', 'C', 'B', 'A']], ['A', 'B', 'A']], [[[]], []]], sol: '  const v = new Set(), d = [];\n  for (const p of placas) { if (v.has(p)) d.push(p); else v.add(p); }\n  return d;', l: 2 },
    { c: 'Escribe «unirConvenios(estadias, convenios)»: estadias es una lista de {id, convenio}; convenios, una lista de {codigo, descuento}. Devuelve una lista de {id, descuento} (0 si no hay convenio) usando un Map para que sea lineal.', f: 'unirConvenios', p: ['estadias', 'convenios'], t: [[[[{ id: 1, convenio: 'A' }, { id: 2, convenio: null }], [{ codigo: 'A', descuento: 0.25 }]], [{ id: 1, descuento: 0.25 }, { id: 2, descuento: 0 }]]], sol: '  const m = new Map(convenios.map(c => [c.codigo, c.descuento]));\n  return estadias.map(e => ({ id: e.id, descuento: m.get(e.convenio) || 0 }));', l: 3 },
    { c: 'Escribe «memo(f)»: devuelve una versión memoizada de una función de un argumento; además expone la propiedad «llamadas» con cuántas veces se ejecutó realmente f.', f: 'memoPrueba', p: ['valores'], t: [[[[1, 2, 1, 1, 3]], 3], [[[5, 5, 5]], 1]], sol: '  function memo(f) { const c = new Map(); const g = x => { if (!c.has(x)) { g.llamadas++; c.set(x, f(x)); } return c.get(x); }; g.llamadas = 0; return g; }\n  const m = memo(x => x * 2);\n  valores.forEach(m);\n  return m.llamadas;', h: 'La función a escribir es memoPrueba(valores): dentro define memo, aplica la versión memoizada a cada valor y devuelve cuántas veces se ejecutó realmente.', l: 4 }
  ],
  gen: function (g) {
    var op = [['Calcular una tarifa que nadie va a ver', 'No hacer el trabajo'], ['Cambiar una búsqueda en lista por un Map', 'Mejor algoritmo o estructura'], ['Reemplazar 200 consultas por un JOIN', 'Menos entrada y salida'], ['Dividir un cálculo independiente entre 4 núcleos', 'Paralelismo'], ['Guardar el resultado de una función pura', 'Memoización']];
    op.forEach(function (o) { g.mcq(2, '¿Qué tipo de optimización es? ' + o[0], o[1], ['No hacer el trabajo', 'Mejor algoritmo o estructura', 'Menos entrada y salida', 'Paralelismo', 'Memoización'].filter(function (x) { return x !== o[1]; }).slice(0, 3), 'Orden de las optimizaciones.'); });
    var la = [['Referencia a la caché L1', '1 ns'], ['Referencia a memoria principal', '100 ns'], ['Ida y vuelta en el mismo centro de datos', '500 µs'], ['Ida y vuelta de Lima a Estados Unidos', '100 a 150 ms']];
    la.forEach(function (l) { g.mcq(3, '¿Qué orden de magnitud de tiempo tiene? ' + l[0], l[1], ['1 ns', '100 ns', '500 µs', '100 a 150 ms'].filter(function (x) { return x !== l[1]; }), 'Números que todo programador debería conocer.'); });
    g.times(6, function (R) { var n = R.pick([10, 100, 2000]); g.input(2, 'Una pantalla lista ' + n + ' estadías y por cada una consulta su unidad por separado. ¿Cuántas consultas hace en total?', n + 1, 'Una para la lista más una por elemento: N + 1.'); });
  },
  checks: [
    ['Explica la cita completa de Knuth y qué implica en la práctica.', 'No sacrificar claridad por micro-optimizaciones sin evidencia, pero sí atender el pequeño porcentaje crítico, identificado midiendo.'],
    ['¿En qué orden conviene buscar optimizaciones?', 'No hacer el trabajo, mejor algoritmo, menos entrada y salida, mejor uso de memoria, paralelismo y, al final, micro-optimizaciones.'],
    ['¿Qué es el problema N + 1 y cómo se resuelve?', 'Hacer una consulta por cada elemento de una lista; se resuelve con un JOIN o carga anticipada.'],
    ['¿Qué preguntas hay que hacerse antes de agregar una caché?', 'Cuándo deja de ser válido el dato, qué pasa si se ve un dato viejo, cuánta memoria ocupa y qué se expulsa cuando se llena.']
  ],
  cites: ['Knuth, D. E. (1974). Structured Programming with go to Statements. *ACM Computing Surveys*, 6(4).', 'Bentley, J. (2000). *Programming Pearls* (2.ª ed.). Addison-Wesley.', 'Gregg, B. (2020). *Systems Performance* (2.ª ed.). Addison-Wesley.', 'Graham-Cumming, J. (2019). Details of the Cloudflare outage on July 2, 2019. *The Cloudflare Blog*.', 'Dean, J. (2009). Designs, Lessons and Advice from Building Large Distributed Systems. *LADIS 2009* (keynote).'],
  project: { t: 'Optimizar con evidencia',
    goal: 'Encontrar y corregir problemas de rendimiento reales en un programa midiendo antes y después.',
    steps: ['Elige una funcionalidad lenta de un programa propio y mide su tiempo con datos realistas.', 'Usa un perfilador y trazas para encontrar dónde se va el tiempo.', 'Aplica optimizaciones en el orden recomendado, una a la vez, midiendo después de cada una.', 'Escribe un microbenchmark correcto de la función crítica.', 'Agrega una prueba que falle si el rendimiento empeora más de un umbral.'],
    deliver: 'Las mediciones de cada paso, los perfiles, el código y la prueba de rendimiento.' },
  hito: ['Optimiza la pantalla de deudas de PatioApp eliminando el N + 1 y el algoritmo cuadrático, con mediciones antes y después.', 'Agrega a PatioApp un detector de consultas N + 1 en las pruebas de integración y una prueba de rendimiento de la consulta de deudas.']
});
SDC.after('m6.perf', 'm6.func');
})();
