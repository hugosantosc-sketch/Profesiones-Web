(function () {
var S = SDC.S;

S('m8', 'm8.runtime', { title: 'Entornos de ejecución: máquinas virtuales, JIT y recolección de basura',
  ask: '¿Qué hace el entorno de ejecución en este caso?',
  lesson: `
> **La idea en simple.** Cuando ejecutas «node app.js» o un programa en Java, entre tu código y el procesador hay un programa enorme y sofisticado: el **entorno de ejecución** (*runtime*). Traduce tu código mientras corre, lo optimiza según cómo se usa, administra la memoria por ti y te da servicios como excepciones y temporizadores. Entenderlo explica por qué un programa se vuelve más rápido después de calentar, por qué a veces se pausa, y cómo escribir código que el motor sepa optimizar.

## Qué es un entorno de ejecución
Todo lenguaje necesita algo de soporte en tiempo de ejecución. En C es mínimo (iniciar el programa, la biblioteca estándar). En Java, C#, JavaScript, Python o Go es mucho más: una **máquina virtual** o un motor que ejecuta el código, un **recolector de basura** que libera la memoria que ya no se usa, manejo de excepciones e hilos, carga dinámica de código, reflexión y, en JavaScript, el **bucle de eventos**. Ejemplos: la **JVM** (Java, Kotlin, Scala), el **CLR** de .NET (C#, F#), **V8** (Chrome, Node, Deno), SpiderMonkey (Firefox), JavaScriptCore (Safari, Bun), **CPython** (Python) y el runtime de **Go**, que se compila dentro de cada binario.

## Bytecode y máquinas virtuales
Muchos lenguajes no se compilan directamente a código máquina, sino a un **bytecode**: instrucciones de una máquina imaginaria, simples y portables. «javac» produce archivos «.class» con bytecode de la JVM; CPython compila cada módulo a bytecode (los archivos «.pyc»); V8 genera bytecode para su intérprete Ignition. La idea viene de lejos: el **P-code** de Pascal (1973) permitió llevar el lenguaje a decenas de computadoras distintas escribiendo solo un intérprete pequeño para cada una. Java la convirtió en lema en 1995: "escríbelo una vez, ejecútalo en cualquier parte".
Las máquinas virtuales son de dos tipos:
- **De pila:** las instrucciones toman sus operandos de una pila (la JVM, el CLR, WebAssembly, CPython). «a + b * c» se vuelve: apilar a, apilar b, apilar c, multiplicar, sumar. El bytecode es compacto y fácil de generar.
- **De registros:** las instrucciones nombran registros virtuales (Lua 5, Dalvik de Android, el Ignition de V8). Menos instrucciones por operación, algo más rápidas de interpretar.
~~~js
// Una máquina virtual de pila mínima
function ejecutar(programa) {
  const pila = [];
  for (const [op, arg] of programa) {
    if (op === 'push') pila.push(arg);
    else if (op === 'add') pila.push(pila.pop() + pila.pop());
    else if (op === 'mul') pila.push(pila.pop() * pila.pop());
  }
  return pila.pop();
}
// días * tarifa + recargo  →  3 * 20 + 5
console.log(ejecutar([['push', 3], ['push', 20], ['mul'], ['push', 5], ['add']]));   // 65
~~~
**WebAssembly** (2017) es una máquina virtual de pila estandarizada para la web: C, C++, Rust o Go se compilan a ella y corren en el navegador a velocidad cercana a la nativa, dentro de la misma caja de seguridad que JavaScript. Hoy también se usa fuera del navegador, en servidores y en la nube.

## Interpretar, compilar o ambas: JIT
Interpretar bytecode es portable pero lento: cada instrucción pasa por un «switch». Compilar todo a código máquina antes de ejecutar (**AOT**, *ahead of time*) es rápido pero pierde información que solo existe al ejecutar: qué tipos llegan realmente a una función, qué ramas se toman. La compilación **justo a tiempo** (**JIT**) combina lo mejor: empieza interpretando, **observa** el programa y compila a código máquina optimizado solo las partes que se ejecutan mucho (el código **caliente**). La idea maduró en Smalltalk (Peter Deutsch y Allan Schiffman, 1984) y en Self, y llegó a la industria con el **HotSpot** de Java (1999), cuyo nombre lo dice todo.
Los motores modernos tienen **niveles** (*tiers*). En V8:
1. **Ignition** interpreta el bytecode y recoge información de tipos en cada operación.
2. **Sparkplug** traduce rápidamente el bytecode a código máquina sin optimizar.
3. **Maglev** (desde 2023) optimiza a medio camino.
4. **TurboFan** genera código muy optimizado para las funciones más calientes, **especulando** con lo observado: "esta función siempre recibió enteros, compilo una versión solo para enteros".
Si la especulación falla (llega un texto donde siempre hubo números), el motor **desoptimiza**: descarta el código optimizado y vuelve al intérprete con el estado exacto. Por eso un programa JavaScript se acelera después de unos segundos de "calentamiento", y por eso las funciones que reciben siempre el mismo tipo de datos son más rápidas. Las **clases ocultas** y las **cachés en línea** (vistas en la unidad de modelos de objetos) son las técnicas que permiten especular sobre la forma de los objetos.

## Recolección de basura
Un programa crea objetos sin cesar. En C, el programador debe liberarlos con «free»; olvidarlo produce **fugas**, liberarlos dos veces o usarlos después corrompe la memoria. Un **recolector de basura** (GC), inventado por John McCarthy para Lisp en 1959, libera automáticamente los objetos que ya no son **alcanzables**: aquellos a los que no se puede llegar siguiendo referencias desde las **raíces** (variables locales en la pila, variables globales, registros).
Los algoritmos fundamentales:
- **Conteo de referencias:** cada objeto lleva la cuenta de cuántas referencias apuntan a él y se libera al llegar a cero. Es inmediato y predecible (lo usan CPython y Swift), pero no libera **ciclos** (A apunta a B y B a A, aunque nadie más los use); CPython tiene un recolector adicional para ellos.
- **Marcar y barrer** (McCarthy, 1960): recorrer el grafo de objetos desde las raíces marcando los alcanzables, y luego barrer liberando los no marcados. Libera ciclos, pero deja la memoria fragmentada.
- **Copia** (Cheney, 1970): dividir la memoria en dos mitades y copiar los objetos vivos de una a otra, compactándolos. Rápido cuando sobreviven pocos.
- **Generacional:** se basa en la **hipótesis generacional** (David Ungar, 1984): la mayoría de los objetos muere joven. La memoria se divide en una generación **joven**, que se recolecta muy seguido y rápido con copia, y una **vieja**, a la que pasan los sobrevivientes y que se recolecta rara vez. Casi todos los recolectores modernos son generacionales. En V8, el **Scavenger** recolecta la generación joven y **Orinoco** la vieja, en paralelo y en gran parte de forma concurrente.
El gran problema del GC son las **pausas**: si el programa se detiene para recolectar, una interfaz se traba o un servidor tarda en responder. Los recolectores modernos trabajan **incremental** y **concurrentemente** con el programa: ZGC y Shenandoah en Java mantienen pausas por debajo del milisegundo incluso con cientos de gigabytes de memoria; el GC de Go, rediseñado en 2015, prioriza pausas cortas por encima del rendimiento total.

## Fugas de memoria con recolector
Tener GC no impide las fugas: si un objeto sigue siendo **alcanzable** aunque ya no se necesite, no se libera. Las causas típicas en JavaScript: cachés que solo crecen («Map» global sin límite), oyentes de eventos que no se quitan, temporizadores con «setInterval» que nunca se cancelan y clausuras que retienen objetos grandes. Herramientas: «WeakMap» y «WeakRef», cuyas referencias no impiden la recolección, y las instantáneas del heap en las herramientas de desarrollo.

## Ejemplo resuelto: la API de PatioApp que se pone lenta cada tarde
El servidor responde en 40 ms por la mañana, pero hacia las 17:00 algunas respuestas tardan 2 segundos y la memoria pasó de 150 MB a 1,4 GB.
1. **Medir:** se activa el registro del recolector («node --trace-gc») y se ven pausas de la generación vieja cada vez más largas: el GC trabaja mucho porque la memoria viva crece.
2. **Instantáneas del heap:** dos instantáneas con una hora de diferencia muestran que crece un «Map» con millones de entradas: una caché de tarifas calculadas por «placa + fecha + hora», que nunca se limpia.
3. **Causa:** la clave incluye la hora exacta, así que cada consulta crea una entrada nueva que nunca se vuelve a usar. La caché no ahorraba nada y retenía todo.
4. **Corrección:** la clave pasa a ser «tipo de unidad + convenio + días» (solo lo que determina la tarifa), y la caché se limita a 1000 entradas con política LRU.
5. **Resultado:** memoria estable en 160 MB todo el día, pausas del GC menores a 5 ms y tiempos de respuesta constantes. Además, la función de cálculo, que antes recibía a veces números y a veces textos desde distintas rutas, se normalizó para recibir siempre números: el perfilador mostró que dejó de desoptimizarse.`,
  links: [['m8.comp', 'compiladores, intérpretes y V8'], ['m5.proto', 'clases ocultas y cachés en línea'], ['m8.os', 'la memoria virtual sobre la que trabaja el recolector']],
  read: 'Jones, Hosking y Moss, *The Garbage Collection Handbook* (2.ª ed., 2023); Nystrom, *Crafting Interpreters* (2021), parte III; blog de V8 (v8.dev/blog).',
  terms: [
    ['Entorno de ejecución', 'software que ejecuta un programa y le ofrece servicios como memoria automática, excepciones e hilos', ['JVM.', 'V8.', 'Runtime de Go.']],
    ['Bytecode', 'instrucciones de una máquina virtual, portables y más simples que el código fuente', ['.class de Java.', '.pyc de Python.', 'P-code, 1973.']],
    ['Compilación JIT', 'compilación a código máquina durante la ejecución de las partes que más se usan', ['HotSpot, 1999.', 'Código caliente.', 'Calentamiento.']],
    ['Desoptimización', 'abandono del código optimizado cuando falla una suposición especulativa, volviendo al intérprete', ['Cambio de tipo.', 'TurboFan.', 'Pérdida de rendimiento.']],
    ['Recolector de basura', 'componente que libera automáticamente la memoria de los objetos inalcanzables', ['McCarthy, 1959.', 'Raíces.', 'Pausas.']],
    ['Conteo de referencias', 'técnica que libera un objeto cuando ninguna referencia apunta a él', ['CPython, Swift.', 'Inmediato.', 'No libera ciclos.']],
    ['Hipótesis generacional', 'observación de que la mayoría de los objetos muere poco después de ser creada', ['Ungar, 1984.', 'Generación joven.', 'Recolección frecuente y barata.']],
    ['WebAssembly', 'formato de bytecode estandarizado que ejecuta código compilado de varios lenguajes en el navegador y fuera de él', ['2017.', 'Rust, C++.', 'Casi nativo.']]
  ],
  q: [
    ['¿Por qué un programa JavaScript suele acelerarse después de unos segundos?', 'Porque el JIT compila y optimiza el código caliente tras observarlo', ['Porque el procesador se calienta', 'Porque se libera la caché', 'Porque el navegador se actualiza'], 'Calentamiento del JIT.', 2],
    ['¿Qué provoca una desoptimización en V8?', 'Que falle una suposición, como recibir un tipo distinto del observado', ['Un error de sintaxis', 'Usar const', 'Tener muchas funciones'], 'La especulación tiene un costo si falla.', 3],
    ['¿Qué objetos libera un recolector de basura?', 'Los que ya no son alcanzables desde las raíces', ['Los más viejos', 'Los más grandes', 'Los que el programador marca'], 'Alcanzabilidad.', 2],
    ['¿Qué limitación tiene el conteo de referencias puro?', 'No libera ciclos de objetos que se apuntan entre sí', ['Es lento siempre', 'No funciona con números', 'Necesita dos mitades de memoria'], 'CPython usa un recolector adicional.', 3],
    ['¿En qué se basa la recolección generacional?', 'En que la mayoría de los objetos muere joven', ['En que los objetos viejos son inútiles', 'En la fecha de creación del programa', 'En el tamaño de los objetos'], 'Hipótesis generacional.', 2],
    ['Con recolector de basura, ¿cómo puede haber una fuga de memoria?', 'Si objetos que ya no se necesitan siguen siendo alcanzables, por ejemplo en una caché sin límite', ['No puede haber fugas', 'Solo por errores del motor', 'Solo en C'], 'Alcanzable no es lo mismo que útil.', 3],
    ['¿Qué ventaja tiene compilar con JIT frente a compilar todo antes (AOT)?', 'Puede optimizar con información que solo existe al ejecutar, como los tipos reales', ['Arranca más rápido siempre', 'No usa memoria', 'No necesita intérprete'], 'Especulación guiada por la ejecución.', 4],
    { tf: 'WebAssembly solo puede ejecutarse dentro de un navegador.', v: false, e: 'También se usa en servidores y en la nube.', l: 2 },
    { tf: 'La máquina virtual de Java es una máquina de pila.', v: true, e: 'Sus instrucciones toman operandos de una pila.', l: 2 },
    { c: 'Escribe «vmPila(programa)»: ejecuta instrucciones [op, arg] con op en push, add, sub, mul (sub resta el tope al anterior) y devuelve el tope final.', f: 'vmPila', p: ['programa'], t: [[[[['push', 3], ['push', 20], ['mul'], ['push', 5], ['add']]], 65], [[[['push', 10], ['push', 4], ['sub']]], 6], [[[['push', 7]]], 7]], sol: '  const p = [];\n  for (const [op, a] of programa) {\n    if (op === \'push\') p.push(a);\n    else { const b = p.pop(), x = p.pop(); p.push(op === \'add\' ? x + b : op === \'sub\' ? x - b : x * b); }\n  }\n  return p.pop();', l: 3 },
    { c: 'Escribe «alcanzables(grafo, raices)»: grafo es {objeto: [referencias]}; devuelve la lista ordenada de objetos alcanzables desde las raíces (fase de marcado).', f: 'alcanzables', p: ['grafo', 'raices'], t: [[[{ a: ['b'], b: ['c'], c: [], d: ['e'], e: ['d'] }, ['a']], ['a', 'b', 'c']], [[{ x: [], y: [] }, []], []]], sol: '  const m = new Set(), pila = [...raices];\n  while (pila.length) { const o = pila.pop(); if (m.has(o)) continue; m.add(o); pila.push(...(grafo[o] || [])); }\n  return [...m].sort();', l: 3 },
    { c: 'Escribe «basura(grafo, raices)»: lista ordenada de objetos NO alcanzables (los que barrería el recolector).', f: 'basura', p: ['grafo', 'raices'], t: [[[{ a: ['b'], b: [], d: ['e'], e: ['d'] }, ['a']], ['d', 'e']], [[{ a: [] }, ['a']], []]], sol: '  const m = new Set(), pila = [...raices];\n  while (pila.length) { const o = pila.pop(); if (m.has(o)) continue; m.add(o); pila.push(...(grafo[o] || [])); }\n  return Object.keys(grafo).filter(o => !m.has(o)).sort();', l: 4 }
  ],
  gen: function (g) {
    var rt = [['Java, Kotlin y Scala', 'JVM'], ['C# y F#', 'CLR'], ['Chrome y Node', 'V8'], ['Firefox', 'SpiderMonkey'], ['Python de referencia', 'CPython'], ['Safari y Bun', 'JavaScriptCore']];
    rt.forEach(function (r) { g.mcq(1, '¿Qué entorno de ejecución usan ' + r[0] + '?', r[1], ['JVM', 'CLR', 'V8', 'SpiderMonkey', 'CPython', 'JavaScriptCore'].filter(function (x) { return x !== r[1]; }).slice(0, 3), 'Entornos de ejecución.'); });
    var gc = [['Libera al instante cuando nadie apunta al objeto, pero no libera ciclos', 'Conteo de referencias'], ['Marca lo alcanzable desde las raíces y libera el resto', 'Marcar y barrer'], ['Copia los objetos vivos a otra mitad de la memoria, compactando', 'Copia'], ['Recolecta seguido los objetos jóvenes y rara vez los viejos', 'Generacional']];
    gc.forEach(function (c) { g.mcq(2, '¿Qué técnica de recolección describe? ' + c[0], c[1], ['Conteo de referencias', 'Marcar y barrer', 'Copia', 'Generacional'].filter(function (x) { return x !== c[1]; }), 'Algoritmos de recolección de basura.'); });
    g.times(6, function (R) { var a = R.int(2, 9), b = R.int(2, 30), c = R.int(1, 20); g.input(3, 'En una máquina de pila se ejecuta: push ' + a + ', push ' + b + ', mul, push ' + c + ', add. ¿Qué queda en el tope?', a * b + c, 'Multiplica los dos primeros y suma el tercero.'); });
  },
  checks: [
    ['¿Qué es un entorno de ejecución y qué servicios ofrece?', 'El software que ejecuta el programa: máquina virtual o motor, recolección de basura, excepciones, hilos, carga de código y, en JavaScript, el bucle de eventos.'],
    ['Explica cómo funciona un JIT con niveles y qué es desoptimizar.', 'Empieza interpretando y observando; compila y optimiza el código caliente especulando con los tipos; si una suposición falla, descarta el código optimizado y vuelve al intérprete.'],
    ['Compara conteo de referencias, marcar y barrer y recolección generacional.', 'Conteo: inmediato pero no libera ciclos; marcar y barrer: libera ciclos pero fragmenta; generacional: aprovecha que los objetos mueren jóvenes.'],
    ['¿Cómo puede haber fugas de memoria con recolector y cómo se encuentran?', 'Por objetos innecesarios que siguen alcanzables (cachés, oyentes, temporizadores); con instantáneas del heap y referencias débiles.']
  ],
  cites: ['McCarthy, J. (1960). Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I. *Communications of the ACM*, 3(4).', 'Ungar, D. (1984). Generation Scavenging: A Non-disruptive High Performance Storage Reclamation Algorithm. *ACM SIGSOFT/SIGPLAN Symposium on Practical Software Development Environments*.', 'Deutsch, L. P. y Schiffman, A. (1984). Efficient Implementation of the Smalltalk-80 System. *POPL 84*.', 'Aycock, J. (2003). A Brief History of Just-In-Time. *ACM Computing Surveys*, 35(2).', 'Jones, R., Hosking, A. y Moss, E. (2023). *The Garbage Collection Handbook* (2.ª ed.). CRC Press.', 'Haas, A. y otros (2017). Bringing the Web up to Speed with WebAssembly. *PLDI 2017*.'],
  project: { t: 'Dentro del motor',
    goal: 'Construir una máquina virtual pequeña y observar el JIT y el recolector de un motor real.',
    steps: ['Implementa una máquina virtual de pila con aritmética, comparaciones, saltos y variables, y un compilador de expresiones a su bytecode.', 'Implementa un recolector de marcar y barrer para un heap simulado con objetos y referencias, incluidos ciclos.', 'Mide en Node una función llamada un millón de veces con números y luego con un texto intercalado; explica la diferencia con lo aprendido de desoptimización.', 'Provoca una fuga con una caché sin límite, encuéntrala con instantáneas del heap y corrígela.', 'Escribe un informe comparando los modelos de memoria de JavaScript, Python y Go.'],
    deliver: 'El código de la máquina virtual y del recolector, las mediciones y el informe.' },
  hito: ['Revisa las cachés y temporizadores de la API de PatioApp en busca de objetos que nunca se liberan y limita las cachés.', 'Mide la memoria y las pausas del recolector de la API de PatioApp durante una jornada simulada.']
});
SDC.after('m8.runtime', 'm8.comp');

S('m8', 'm8.memsafe', { title: 'Seguridad de memoria y el modelo de propiedad de Rust',
  ask: '¿Qué error de memoria hay aquí y cómo lo evitaría un lenguaje seguro?',
  lesson: `
> **La idea en simple.** En lenguajes como C y C++, el programador administra la memoria a mano, y un descuido (escribir un byte más allá de un arreglo, usar un dato ya liberado) no produce un error claro: corrompe la memoria en silencio, y un atacante puede aprovecharlo para tomar el control del programa. Estos errores causan cerca del 70 % de las vulnerabilidades graves en productos como Windows y Chrome. Los lenguajes con **seguridad de memoria** los hacen imposibles, y Rust lo logra sin recolector de basura.

## Los errores de memoria
Un programa en C puede leer y escribir cualquier dirección. Los errores clásicos:
- **Desbordamiento de búfer** (*buffer overflow*): escribir más allá del final de un arreglo, pisando lo que hay al lado. Si al lado está la dirección de retorno de la función (en la pila), el atacante puede reemplazarla para saltar a su propio código.
- **Uso después de liberar** (*use-after-free*): seguir usando un puntero a memoria que ya se devolvió con «free» y que ahora puede contener otro objeto, quizás controlado por el atacante.
- **Doble liberación:** liberar dos veces la misma memoria, corrompiendo las estructuras del administrador de memoria.
- **Lectura fuera de límites:** leer más allá del arreglo, filtrando datos secretos.
- **Desreferenciar un puntero nulo** o no inicializado.
- **Carreras de datos:** dos hilos acceden a la misma memoria sin sincronizar y al menos uno escribe.
~~~txt
// C: un desbordamiento clásico
void registrar(const char *placa) {
  char buffer[8];          // espacio para 7 caracteres + el fin de texto
  strcpy(buffer, placa);   // si placa tiene 40 caracteres, escribe 32 bytes fuera del arreglo
}
~~~

## Una historia de incidentes
- **Gusano de Morris** (1988): Robert Morris, estudiante de Cornell, liberó un programa que se propagaba aprovechando, entre otras cosas, un desbordamiento de búfer en el servicio «fingerd» de Unix. Infectó alrededor del 10 % de las computadoras conectadas a internet de la época y fue el origen del primer equipo de respuesta a emergencias informáticas (CERT).
- **Aleph One** publicó en 1996, en la revista Phrack, *Smashing the Stack for Fun and Profit*, que explicó paso a paso cómo explotar desbordamientos en la pila y desató una ola de ataques.
- **Heartbleed** (2014): una lectura fuera de límites en OpenSSL, la biblioteca que cifraba gran parte de la web, permitía pedir a un servidor que devolviera hasta 64 KB de su memoria, incluidas claves privadas y contraseñas. El error era una sola verificación de longitud faltante.
- Los equipos de seguridad de **Microsoft** (2019) y de **Chromium** (2020) informaron que alrededor del **70 %** de sus vulnerabilidades graves eran errores de seguridad de memoria. En 2024, la Casa Blanca de Estados Unidos y la agencia CISA publicaron recomendaciones para que la industria migre hacia lenguajes seguros en memoria.

## Defensas sin cambiar de lenguaje
Los sistemas operativos y compiladores agregaron mitigaciones que hacen más difícil explotar estos errores, aunque no los eliminan:
- **Canarios de pila:** un valor aleatorio antes de la dirección de retorno; si un desbordamiento lo cambia, el programa se detiene.
- **Memoria no ejecutable** (NX, DEP): la pila y el heap no pueden contener código ejecutable.
- **ASLR:** las direcciones de la pila, el heap y las bibliotecas cambian en cada ejecución, para que el atacante no sepa a dónde saltar.
- **Herramientas de detección:** AddressSanitizer (Google, 2012) instrumenta el programa para detectar accesos inválidos durante las pruebas; Valgrind los detecta emulando la ejecución; el **fuzzing** (generar millones de entradas aleatorias o mutadas, con herramientas como AFL y libFuzzer) los encuentra automáticamente. El proyecto OSS-Fuzz de Google ha encontrado decenas de miles de errores en software libre.
- **C++ moderno:** punteros inteligentes («unique_ptr», «shared_ptr»), contenedores con verificación de límites y la regla RAII (liberar los recursos al salir del ámbito) evitan muchos errores, pero el lenguaje sigue permitiendo cometerlos.

## Lenguajes seguros en memoria
JavaScript, Python, Java, C#, Go y Swift son **seguros en memoria**: verifican los límites de los arreglos, no permiten aritmética de punteros y liberan la memoria con un recolector de basura o con conteo de referencias. Un acceso fuera de límites da «undefined» o una excepción, nunca la memoria de al lado. El precio es el recolector: pausas, más memoria y menos control, que en un núcleo de sistema operativo, un navegador o un sistema embebido pueden ser inaceptables.

## Rust: seguridad sin recolector
**Rust** (iniciado por Graydon Hoare en 2006, patrocinado por Mozilla desde 2009, versión 1.0 en 2015) garantiza la seguridad de memoria **al compilar**, sin recolector de basura y con rendimiento comparable a C++. Lo hace con tres reglas que el compilador verifica:
1. **Propiedad** (*ownership*): cada valor tiene un único **dueño**, una variable. Cuando el dueño sale del ámbito, el valor se libera automáticamente. No hay «free» manual, así que no hay doble liberación ni fugas por olvido.
2. **Mover:** asignar un valor a otra variable o pasarlo a una función **transfiere** la propiedad; la variable original ya no se puede usar. El compilador rechaza usarla.
3. **Préstamo** (*borrowing*): se puede prestar un valor con referencias, con una regla de oro: en cada momento puede haber **muchas referencias de solo lectura** («&T») **o una sola referencia mutable** («&mut T»), nunca ambas. Y ninguna referencia puede vivir más que el valor al que apunta (**tiempos de vida**, *lifetimes*).
~~~txt
fn main() {
    let placa = String::from("ABC-123");   // placa es dueña del texto
    let otra = placa;                       // la propiedad se mueve a otra
    // println!("{}", placa);              // ERROR de compilación: placa ya no es dueña

    let mut estadias = vec![1, 2, 3];
    let primera = &estadias[0];             // préstamo de lectura
    // estadias.push(4);                    // ERROR: no se puede mutar mientras hay un préstamo vivo
    println!("{}", primera);                // (push podría mover el vector y dejar 'primera' colgando)
}                                           // aquí se liberan otra y estadias, automáticamente
~~~
La regla "muchos lectores o un escritor" elimina a la vez el uso después de liberar y las **carreras de datos**: dos hilos no pueden tener acceso mutable a lo mismo sin sincronización, porque el programa no compila. Es lo que la comunidad de Rust llama "concurrencia sin miedo". Para los casos que las reglas no pueden verificar (hablar con el hardware, estructuras de datos muy especiales), existe el bloque «unsafe», que concentra el riesgo en pocas líneas auditables.
El costo de Rust es la curva de aprendizaje: el **verificador de préstamos** (*borrow checker*) rechaza programas que en otros lenguajes compilarían, y hay que aprender a estructurar los datos según la propiedad. A cambio, encuestas de Stack Overflow lo eligen desde 2016 como el lenguaje más "admirado", el núcleo de Linux acepta código en Rust desde la versión 6.1 (2022), Android informó en 2022 que la proporción de vulnerabilidades de memoria bajó del 76 % al 35 % a medida que el código nuevo se escribía en lenguajes seguros, y Microsoft reescribe partes del núcleo de Windows en Rust.

## Por qué te importa aunque programes en JavaScript
Tu código en JavaScript corre sobre V8, Node y bibliotecas nativas escritas en C++: cuando aparece una vulnerabilidad crítica en un navegador, casi siempre es un error de memoria en ese código. Además, existen errores **análogos** en los lenguajes seguros: la **contaminación de prototipos** (modificar «Object.prototype» desde datos del usuario) o los índices sin validar pueden producir efectos parecidos a nivel lógico. Y si alguna vez escribes un módulo de alto rendimiento (para WebAssembly, por ejemplo), Rust es hoy la opción más sensata.

## Ejemplo resuelto: el lector de placas de la garita
La cámara de la garita de PatioApp tiene un programa en C que lee la placa reconocida y la envía al servidor. Un día la cámara se reinicia sola cada vez que entra cierto camión.
1. **Reproducir:** la placa del camión venía con un texto de 40 caracteres por un error del reconocimiento (leyó también un letrero).
2. **Diagnóstico con AddressSanitizer:** al compilar con «-fsanitize=address» y repetir la entrada, la herramienta informa "stack-buffer-overflow" en la función que copia la placa a un arreglo de 8 caracteres con «strcpy».
3. **Riesgo:** no es solo un reinicio: con una entrada diseñada, alguien que muestre un cartel a la cámara podría ejecutar código en ella. El fallo se trata como vulnerabilidad.
4. **Corrección inmediata:** validar la longitud y usar una copia con límite; agregar fuzzing con entradas de texto aleatorias a la integración continua del programa de la cámara.
5. **Corrección de fondo:** el módulo de lectura se reescribe en Rust. La función equivalente recibe un «&str» y devuelve un «Result»: una placa demasiado larga es un error manejado, y el desbordamiento ya no es posible por construcción.`,
  links: [['m8.runtime', 'recolección de basura frente a propiedad'], ['m8.conc', 'carreras de datos y concurrencia'], ['arq.digital', 'la memoria y los punteros a nivel de máquina']],
  read: 'Aleph One, *Smashing the Stack for Fun and Profit* (Phrack 49, 1996); Klabnik y Nichols, *The Rust Programming Language* (capítulo 4); CISA y otros, *The Case for Memory Safe Roadmaps* (2023).',
  terms: [
    ['Seguridad de memoria', 'garantía de que un programa no puede leer ni escribir memoria fuera de los objetos válidos', ['JavaScript, Java, Rust.', 'Verificación de límites.', 'Sin aritmética de punteros.']],
    ['Desbordamiento de búfer', 'escritura más allá del final de un arreglo que pisa la memoria vecina', ['strcpy.', 'Gusano de Morris.', 'Dirección de retorno.']],
    ['Uso después de liberar', 'uso de un puntero a memoria que ya fue liberada', ['Use-after-free.', 'Muy explotable.', 'Imposible en Rust seguro.']],
    ['ASLR', 'aleatorización de las direcciones de memoria de un proceso en cada ejecución', ['Mitigación.', 'Dificulta saltos.', 'Sistemas operativos.']],
    ['Fuzzing', 'técnica de prueba que alimenta un programa con enormes cantidades de entradas generadas para provocar fallos', ['AFL, libFuzzer.', 'OSS-Fuzz.', 'Encuentra desbordamientos.']],
    ['Propiedad', 'regla de Rust por la que cada valor tiene un único dueño que lo libera al salir de su ámbito', ['Ownership.', 'Sin free manual.', 'Mover transfiere.']],
    ['Préstamo', 'acceso temporal a un valor mediante referencias: muchas de lectura o una mutable', ['Borrowing.', '&T y &mut T.', 'Borrow checker.']],
    ['Tiempo de vida', 'región del programa durante la cual una referencia es válida, verificada por el compilador de Rust', ['Lifetimes.', 'Sin referencias colgantes.', 'Al compilar.']]
  ],
  q: [
    ['¿Qué proporción aproximada de sus vulnerabilidades graves atribuyeron Microsoft y Chromium a errores de memoria?', 'Alrededor del 70 %', ['Alrededor del 5 %', 'Alrededor del 25 %', 'El 100 %'], 'Informes de 2019 y 2020.', 2],
    ['¿Qué ocurre en C si se copia un texto de 40 caracteres en un arreglo de 8 con strcpy?', 'Se escribe fuera del arreglo, corrompiendo la memoria vecina', ['Se recorta automáticamente', 'Se lanza una excepción', 'El compilador lo impide'], 'Desbordamiento de búfer.', 2],
    ['¿Qué error permitió Heartbleed?', 'Una lectura fuera de límites que filtraba memoria del servidor', ['Una contraseña débil', 'Un error de red', 'Un desbordamiento de enteros en JavaScript'], 'Faltaba una verificación de longitud.', 3],
    ['¿Cómo libera Rust la memoria sin recolector de basura?', 'Cada valor tiene un dueño y se libera cuando el dueño sale de su ámbito', ['Con free manual', 'Nunca la libera', 'Con conteo de referencias siempre'], 'Propiedad.', 2],
    ['¿Qué regla de préstamos aplica el compilador de Rust?', 'Muchas referencias de lectura o una sola mutable, nunca ambas a la vez', ['Solo una referencia de cualquier tipo', 'Cualquier cantidad de referencias mutables', 'No hay referencias'], 'Elimina carreras de datos.', 3],
    ['¿Qué hace ASLR?', 'Cambia las direcciones de memoria en cada ejecución para dificultar los ataques', ['Elimina los errores de memoria', 'Cifra el disco', 'Acelera el programa'], 'Mitigación, no solución.', 2],
    ['¿Por qué la regla de préstamos de Rust impide las carreras de datos?', 'Porque dos hilos no pueden tener acceso mutable a la misma memoria sin sincronización: el programa no compila', ['Porque Rust no tiene hilos', 'Porque usa un candado global', 'Porque los hilos se ejecutan en orden'], 'Concurrencia sin miedo.', 4],
    { tf: 'JavaScript es un lenguaje seguro en memoria: un acceso fuera de un arreglo no lee la memoria vecina.', v: true, e: 'Devuelve undefined.', l: 1 },
    { tf: 'Las mitigaciones como los canarios de pila y ASLR eliminan por completo los errores de memoria.', v: false, e: 'Solo dificultan su explotación.', l: 2 },
    { c: 'Escribe «copiaSegura(texto, capacidad)»: devuelve el texto si su longitud es menor que la capacidad (deja espacio para el fin de texto), o null si no cabe.', f: 'copiaSegura', p: ['texto', 'capacidad'], t: [[['ABC-123', 8], 'ABC-123'], [['ABC-1234', 8], null], [['', 1], '']], sol: '  return texto.length < capacidad ? texto : null;', l: 1 },
    { c: 'Escribe «verificarPrestamos(operaciones)»: recibe operaciones "lee", "escribe", "fin-lee", "fin-escribe" en orden y devuelve true si nunca hay una escritura activa junto con otra lectura o escritura activa (regla de Rust).', f: 'verificarPrestamos', p: ['operaciones'], t: [[[['lee', 'lee', 'fin-lee', 'fin-lee', 'escribe', 'fin-escribe']], true], [[['lee', 'escribe']], false], [[['escribe', 'escribe']], false], [[['escribe', 'fin-escribe', 'lee']], true]], sol: '  let l = 0, e = 0;\n  for (const op of operaciones) {\n    if (op === \'lee\') { if (e) return false; l++; }\n    else if (op === \'escribe\') { if (e || l) return false; e = 1; }\n    else if (op === \'fin-lee\') l--;\n    else if (op === \'fin-escribe\') e = 0;\n  }\n  return true;', l: 4 },
    { c: 'Escribe «accesoSeguro(arr, i)»: devuelve arr[i] si 0 ≤ i < longitud y i es entero; si no, devuelve null.', f: 'accesoSeguro', p: ['arr', 'i'], t: [[[[10, 20, 30], 1], 20], [[[10, 20, 30], 3], null], [[[10], -1], null], [[[10, 20], 0.5], null]], sol: '  return Number.isInteger(i) && i >= 0 && i < arr.length ? arr[i] : null;', l: 2 }
  ],
  gen: function (g) {
    var er = [['Copiar 40 caracteres en un arreglo de 8', 'Desbordamiento de búfer'], ['Usar un puntero después de llamar a free', 'Uso después de liberar'], ['Llamar a free dos veces sobre el mismo puntero', 'Doble liberación'], ['Leer 64 KB más allá del dato pedido', 'Lectura fuera de límites'], ['Dos hilos escriben la misma variable sin candado', 'Carrera de datos']];
    var op = ['Desbordamiento de búfer', 'Uso después de liberar', 'Doble liberación', 'Lectura fuera de límites', 'Carrera de datos'];
    er.forEach(function (e) { g.mcq(2, '¿Qué error de memoria es? ' + e[0], e[1], op.filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Errores de seguridad de memoria.'); });
    var mi = [['Valor aleatorio antes de la dirección de retorno', 'Canario de pila'], ['La pila no puede contener código ejecutable', 'Memoria no ejecutable (NX)'], ['Direcciones distintas en cada ejecución', 'ASLR'], ['Instrumentar el programa para detectar accesos inválidos en pruebas', 'AddressSanitizer'], ['Millones de entradas generadas para provocar fallos', 'Fuzzing']];
    mi.forEach(function (m) { g.mcq(2, '¿Qué defensa es? ' + m[0], m[1], ['Canario de pila', 'Memoria no ejecutable (NX)', 'ASLR', 'AddressSanitizer', 'Fuzzing'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Mitigaciones y detección.'); });
    var ru = [['let a = String::from("x"); let b = a; usar a', 'No compila'], ['Dos referencias &v al mismo vector a la vez', 'Compila'], ['Una referencia &v viva y luego v.push(1)', 'No compila'], ['Una sola referencia &mut v y nada más', 'Compila']];
    ru.forEach(function (r) { g.mcq(3, 'En Rust: ' + r[0] + '. ¿Compila?', r[1], [r[1] === 'Compila' ? 'No compila' : 'Compila', 'Compila con advertencia y falla al ejecutar', 'Depende del sistema operativo'], 'Propiedad y préstamos.'); });
  },
  checks: [
    ['Nombra cuatro errores de memoria y explica por qué son peligrosos.', 'Desbordamiento de búfer, uso después de liberar, doble liberación y lectura fuera de límites; corrompen o filtran memoria y permiten ejecutar código del atacante.'],
    ['¿Qué mitigaciones existen y por qué no bastan?', 'Canarios, memoria no ejecutable, ASLR, sanitizadores y fuzzing; dificultan o detectan, pero el lenguaje sigue permitiendo el error.'],
    ['Explica propiedad, préstamo y tiempos de vida en Rust.', 'Cada valor tiene un dueño que lo libera; se presta con muchas referencias de lectura o una mutable; ninguna referencia vive más que el valor.'],
    ['¿Qué relación hay entre la seguridad de memoria y la seguridad del software que usas a diario?', 'La mayoría de las vulnerabilidades graves en sistemas y navegadores son errores de memoria; los lenguajes seguros los eliminan por construcción.']
  ],
  cites: ['Aleph One (1996). Smashing the Stack for Fun and Profit. *Phrack*, 7(49).', 'Spafford, E. (1989). The Internet Worm Program: An Analysis. *ACM SIGCOMM Computer Communication Review*, 19(1).', 'Durumeric, Z. y otros (2014). The Matter of Heartbleed. *Internet Measurement Conference 2014*.', 'Serebryany, K. y otros (2012). AddressSanitizer: A Fast Address Sanity Checker. *USENIX ATC 2012*.', 'Jung, R., Jourdan, J.-H., Krebbers, R. y Dreyer, D. (2018). RustBelt: Securing the Foundations of the Rust Programming Language. *POPL 2018*.', 'CISA, NSA, FBI y otros (2023). *The Case for Memory Safe Roadmaps*. cisa.gov.'],
  project: { t: 'Del error de memoria al código seguro',
    goal: 'Observar errores de memoria, detectarlos con herramientas y evitarlos con un lenguaje seguro.',
    steps: ['En C, escribe una función con un desbordamiento de búfer y otra con uso después de liberar; compílalas con AddressSanitizer y lee sus informes.', 'Escribe un fuzzer sencillo (aunque sea en JavaScript) que genere entradas de distintas longitudes para un validador y registre los fallos.', 'Reescribe las funciones en Rust y anota cada error de compilación del verificador de préstamos y qué problema evitaba.', 'Compara el rendimiento de la versión en C, la de Rust y una en JavaScript para una tarea de procesamiento de texto.', 'Escribe una guía breve de buenas prácticas de memoria para tu equipo.'],
    deliver: 'El código, los informes de las herramientas, las comparaciones y la guía.' },
  hito: ['Revisa en PatioApp las entradas que llegan de dispositivos externos (cámara, lector) y valida su longitud y formato antes de procesarlas.', 'Documenta en PatioApp qué componentes nativos usa el sistema y en qué lenguaje están escritos, como parte del análisis de riesgos.']
});
SDC.after('m8.memsafe', 'm8.runtime');
})();
