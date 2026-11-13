(function () {
var X = SDC.X, XM = SDC.XM;
XM('m3', {
  uni: 'MIT 6.100L (antes 6.0001) *Introduction to Computer Science and Programming*; Harvard CS50; Stanford CS106A *Programming Methodology*; Berkeley CS61A *Structure and Interpretation of Computer Programs*; CMU 15-112 *Fundamentals of Programming and Computer Science*. En Perú: Fundamentos de Programación, Programación I y Algoritmos (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp de consola, versión 1',
    goal: 'Construir un programa completo de consola que use todo el módulo: tipos, decisiones, bucles, funciones, estructuras de datos y recursión.',
    steps: ['Un menú en bucle con opciones: registrar ingreso, registrar salida, buscar por placa, listar pendientes, reporte y salir.', 'Cada opción es una función pequeña y pura cuando sea posible; la entrada y salida de consola quedan separadas de la lógica.', 'Las unidades se guardan como arreglo de objetos y se persisten en un archivo JSON entre ejecuciones.', 'Las ubicaciones del patio forman un árbol y se recorren con recursión.', 'Escribe al menos 20 pruebas con console.assert para la lógica, incluyendo casos de frontera.'],
    deliver: 'Un repositorio con el programa, el archivo de datos de ejemplo, las pruebas y un README con instrucciones de uso.' }
});

X('m3.vars', {
  deep: `
## Qué es un programa
Niklaus Wirth, creador de Pascal, tituló su libro de 1976 con una fórmula que sigue vigente: *Algorithms + Data Structures = Programs*. Un programa combina datos (lo que el programa sabe) con instrucciones (lo que hace con ellos). Las variables son la forma de dar nombre a los datos para poder razonar sobre ellos.

## Valores, variables y memoria
Un **valor** existe en memoria (el número 45000, el texto "ABC-123"). Una **variable** es un nombre que apunta a un valor. En JavaScript los valores primitivos (number, string, boolean, null, undefined, bigint, symbol) son **inmutables**: «km = km + 1» no modifica el 45000, crea el valor 45001 y hace que «km» apunte a él. Los objetos y arreglos, en cambio, se pueden modificar por dentro; por eso «const» impide reasignar la variable, pero no impide cambiar el contenido de un objeto.
~~~js
const unidad = { placa: 'ABC123', km: 1000 };
unidad.km = 2000;          // permitido: cambia el objeto
// unidad = {};            // error: no se puede reasignar una constante
console.log(unidad);
console.log(Object.isFrozen(Object.freeze({ a: 1 }))); // congelar sí lo hace inmutable
~~~

## Sistemas de tipos: dos ejes distintos
| | Tipado débil (convierte solo) | Tipado fuerte (no convierte) |
| **Dinámico** (se revisa al ejecutar) | JavaScript, PHP | Python, Ruby |
| **Estático** (se revisa al compilar) | C | Java, TypeScript, Rust, Go |
Benjamin Pierce, en *Types and Programming Languages* (2002), define un sistema de tipos como un método sintáctico tratable para demostrar la ausencia de ciertos comportamientos del programa, clasificando las expresiones según el tipo de valores que calculan. Dicho simple: los tipos son pruebas automáticas que el compilador hace gratis. Por eso los equipos grandes de JavaScript suelen adoptar TypeScript:
~~~txt
function costo(dias: number, tarifa: number): number { return dias * tarifa; }
costo("3", 20);   // TypeScript lo rechaza ANTES de ejecutar
~~~

## Expresiones y sentencias
Una **expresión** produce un valor («dias * tarifa», «edad >= 18»). Una **sentencia** realiza una acción («let x = 5;», «if (...) {...}»). Los lenguajes funcionales tienden a que todo sea expresión, lo que facilita componer.

## Detalles de los operadores que causan errores
- **División entera y resto:** «Math.trunc(7 / 2)» da 3. El operador «%» conserva el signo del dividendo: «-7 % 3» da −1, no 2. Para un módulo matemático usa «((a % n) + n) % n».
- **Precedencia y asociatividad:** «2 ** 3 ** 2» es 2^9 = 512 porque la potencia asocia a la derecha. Ante la duda, usa paréntesis.
- **Incremento:** «x++» devuelve el valor viejo y «++x» el nuevo.
- **Coerción:** «"5" * 2» da 10, pero «"5" + 2» da «"52"», porque «+» también concatena. «Number("")» da 0 y «Number("abc")» da NaN.

## La ausencia de valor
Tony Hoare introdujo la referencia nula en ALGOL W en 1965 y, en una conferencia de 2009, la llamó su "error de mil millones de dólares" por todos los fallos que ha causado. JavaScript tiene dos ausencias: «undefined» (nadie asignó nada) y «null» (alguien dijo explícitamente "no hay"). Los operadores modernos ayudan:
~~~js
const unidad = { placa: 'ABC123', chofer: null };
console.log(unidad.chofer?.nombre);          // encadenamiento opcional: undefined, sin error
console.log(unidad.km ?? 0);                 // valor por defecto solo si es null o undefined
console.log(0 || 50, 0 ?? 50);               // || trata el 0 como falso; ?? no
~~~

## Nombres
Steve McConnell dedica un capítulo entero de *Code Complete* a nombrar variables: el nombre debe describir **qué** representa, no **cómo** se calcula, y su longitud debe crecer con su alcance. Un índice de un bucle de tres líneas puede llamarse «i»; una variable que vive en todo un módulo merece «diasMaximosEnPatio». Las convenciones de JavaScript son «camelCase» para variables y funciones, «PascalCase» para clases y «MAYUSCULAS_CON_GUIONES» para constantes de configuración.`,
  checks: [
    ['¿Por qué se puede hacer «const o = {}; o.x = 1;» pero no «const n = 1; n = 2;»?', '«const» impide reasignar la variable, no modificar el objeto al que apunta. Cambiar o.x modifica el objeto; n = 2 intenta que la variable apunte a otro valor.'],
    ['Clasifica Python y JavaScript según el tipado (fuerte/débil y estático/dinámico).', 'Ambos son dinámicos. Python es fuerte (no suma "1" + 1, da error) y JavaScript es débil (convierte y da "11").'],
    ['¿Cuál es la diferencia entre «x || 10» y «x ?? 10» cuando x vale 0?', '«x || 10» da 10 porque 0 es falsy; «x ?? 10» da 0 porque solo reemplaza null o undefined.'],
    ['¿Cuánto vale «-7 % 3» en JavaScript y cómo obtienes el resto matemático positivo?', '−1. El resto positivo se obtiene con ((−7 % 3) + 3) % 3 = 2.'],
    ['¿Qué ventaja da un sistema de tipos estático en un equipo grande?', 'Detecta antes de ejecutar errores como pasar texto donde se espera un número o llamar a métodos que no existen, y documenta el código; reduce errores en producción y facilita refactorizar.']
  ],
  cites: ['Wirth, N. (1976). *Algorithms + Data Structures = Programs*. Prentice Hall.', 'Pierce, B. (2002). *Types and Programming Languages*. MIT Press. Capítulo 1.', 'McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press. Capítulo 11.', 'Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. Capítulo 1.', 'Hoare, C. A. R. (2009). Null References: The Billion Dollar Mistake. Conferencia QCon Londres.'],
  project: { t: 'Calculadora de cobros con validación',
    goal: 'Practicar tipos, conversiones y expresiones construyendo una calculadora de cobros del patio que nunca acepte datos inválidos.',
    steps: ['Lee como texto los días de permanencia, la tarifa diaria y un descuento en porcentaje.', 'Convierte cada dato con Number, rechaza NaN, negativos y vacíos con mensajes claros.', 'Calcula subtotal, descuento e IGV (18%) trabajando en céntimos enteros.', 'Muestra el resultado con formato de moneda peruana usando Intl.NumberFormat("es-PE").', 'Escribe pruebas para entradas raras: "", "abc", "-3", "3.5", "  7 ".'],
    deliver: 'Un archivo cobros.js con la función de cálculo, sus pruebas y una tabla en el README con los casos probados.' },
  hito: ['Crea «patio.js» con constantes de configuración (tarifa diaria en céntimos, capacidad, horario) y una función que convierta los datos de un formulario (siempre texto) a valores validados.', 'Documenta el tipo de cada campo de una unidad (placa, marca, km, ingreso, estado, precio) con comentarios JSDoc.']
});

X('m3.cond', {
  deep: `
## Solo tres estructuras bastan
Corrado Böhm y Giuseppe Jacopini demostraron en 1966 que cualquier algoritmo se puede escribir con solo tres estructuras: **secuencia**, **selección** (if) e **iteración** (bucles). Dos años después, Edsger Dijkstra publicó la carta *Go To Statement Considered Harmful* (1968), donde argumentó que los saltos arbitrarios («goto») hacen imposible seguir un programa. De ahí nació la **programación estructurada**, que todos los lenguajes modernos dan por sentada.

## Ordenar los casos
Steve McConnell recomienda en *Code Complete* (capítulo 15):
- Escribe primero el caso **normal** y luego los excepcionales, o usa guardas para despachar los excepcionales al inicio.
- Ordena una cadena de «else if» por frecuencia o por claridad, y asegúrate de que el último «else» cubra realmente "todo lo demás". Si no debería ocurrir nunca, haz que lance un error en vez de callar.
- Evita las comparaciones negadas dobles: «if (!noEstaRevisado)» confunde.

## Guardas en lugar de pirámides
Martin Fowler cataloga en *Refactoring* la técnica "reemplazar condicional anidado con cláusulas de guarda":
~~~js
// Antes: pirámide
function cobro(u) {
  let r;
  if (u) {
    if (u.estado !== 'anulada') {
      if (u.dias > 0) { r = u.dias * 2000; } else { r = 0; }
    } else { r = 0; }
  } else { r = 0; }
  return r;
}
// Después: guardas
function cobro2(u) {
  if (!u || u.estado === 'anulada') return 0;
  if (u.dias <= 0) return 0;
  return u.dias * 2000;
}
console.log(cobro({ estado: 'activa', dias: 3 }), cobro2({ estado: 'activa', dias: 3 }));
~~~

## Tablas en lugar de cadenas de if
Cuando una decisión es "según el valor X, el resultado es Y", una **tabla** (un objeto o un Map) es más clara y más fácil de cambiar que un «switch». McConnell lo llama *table-driven methods* (capítulo 18):
~~~js
const TARIFA_POR_TIPO = { auto: 2000, camioneta: 3000, camion: 6000 };
function tarifa(tipo) {
  if (!(tipo in TARIFA_POR_TIPO)) throw new Error('Tipo desconocido: ' + tipo);
  return TARIFA_POR_TIPO[tipo];
}
console.log(tarifa('camioneta'));
~~~
La regla de negocio pasa a ser **datos**: se puede leer desde una configuración sin tocar el código.

## Tablas de decisión
Para reglas con varias condiciones, una tabla de decisión lista cada combinación y su acción. Con n condiciones booleanas hay 2^n columnas; dibujarla obliga a decidir qué pasa en combinaciones que nadie había pensado, y cada columna se vuelve un caso de prueba.
| Revisada | Pagada | Con daños | Acción |
| sí | sí | no | entregar |
| sí | sí | sí | enviar a taller |
| sí | no | — | cobrar |
| no | — | — | revisar |
El guion (—) significa "no importa", lo que reduce las ocho combinaciones a cuatro reglas.

## Condiciones y complejidad
Cada decisión agrega un camino posible por la función. Thomas McCabe propuso en 1976 la **complejidad ciclomática**, que cuenta esos caminos independientes (aproximadamente, número de decisiones + 1). Una función con complejidad 15 necesita al menos 15 casos de prueba para recorrer todos sus caminos: es una señal objetiva de que conviene dividirla. La verás de nuevo en el módulo de pruebas.

## Exhaustividad
Si una variable solo puede tomar ciertos valores ("pendiente", "lista", "entregada"), un buen diseño hace que olvidar un caso sea un error visible. En TypeScript se logra con tipos unión y el tipo «never»; en JavaScript, con un «default» que lance error. Así, cuando alguien agregue el estado "anulada", el programa avisará en vez de tratarlo en silencio como otro caso.

## Comparaciones con decimales y textos
Nunca uses «===» con resultados de punto flotante («0.1 + 0.2 === 0.3» es falso). Al comparar textos escritos por personas, normaliza antes: «placa.trim().toUpperCase()». Y para ordenar o comparar palabras con tildes usa «localeCompare», que respeta las reglas del español.

## Cuando los if se multiplican: polimorfismo
Si la misma cadena de «if (tipo === 'auto') ... else if (tipo === 'camion') ...» aparece en varias funciones (cobro, revisión, espacio que ocupa), cada tipo nuevo obliga a editar todas. La programación orientada a objetos ofrece otra salida: que cada tipo sea un objeto que sabe responder «cobro()» o «espacio()» a su manera. Fowler llama a esta refactorización "reemplazar condicional con polimorfismo"; la estudiarás en el módulo de diseño orientado a objetos.`,
  checks: [
    ['¿Qué demostraron Böhm y Jacopini y por qué importa?', 'Que todo algoritmo se puede escribir con secuencia, selección e iteración. Es la base de la programación estructurada: no hace falta goto.'],
    ['¿Qué ventaja tiene reemplazar un switch largo por un objeto-tabla?', 'La regla se vuelve datos: es más corta, se puede cambiar o cargar desde configuración sin tocar la lógica y es fácil de probar.'],
    ['Una función tiene 4 if independientes. ¿Cuál es su complejidad ciclomática aproximada y qué implica para las pruebas?', 'Unas 5 (decisiones + 1). Se necesitan al menos 5 casos para recorrer todos los caminos independientes.'],
    ['¿Por qué conviene que el último else de una cadena lance un error si "nunca debería ocurrir"?', 'Porque si en el futuro aparece un valor nuevo, el error lo hará visible de inmediato en lugar de procesarlo en silencio de forma incorrecta.'],
    ['Con 3 condiciones booleanas, ¿cuántas columnas tiene la tabla de decisión completa?', '2^3 = 8 columnas, que luego pueden reducirse usando "no importa".']
  ],
  cites: ['Böhm, C. y Jacopini, G. (1966). Flow diagrams, Turing machines and languages with only two formation rules. *Communications of the ACM*, 9(5).', 'Dijkstra, E. W. (1968). Go To Statement Considered Harmful. *Communications of the ACM*, 11(3).', 'McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press. Capítulos 15, 18 y 19.', 'Fowler, M. (2018). *Refactoring* (2.ª ed.). Addison-Wesley.', 'McCabe, T. (1976). A Complexity Measure. *IEEE Transactions on Software Engineering*, SE-2(4).'],
  project: { t: 'Clasificador de unidades por tabla de decisión',
    goal: 'Convertir reglas de negocio en una tabla de decisión, implementarla de dos formas y demostrar con pruebas que son equivalentes.',
    steps: ['Escribe la tabla de decisión completa para revisada, pagada, con daños y con autorización (16 columnas) y redúcela con "no importa".', 'Implementa la decisión con if y guardas.', 'Implementa la misma decisión con una tabla de datos (arreglo de reglas que se recorre).', 'Prueba ambas con las 16 combinaciones y comprueba que coinciden.', 'Agrega un caso nuevo (estado "anulada") y observa cuál de las dos versiones fue más fácil de cambiar.'],
    deliver: 'El archivo con ambas versiones, las pruebas y una nota de qué aprendiste al comparar.' },
  hito: ['Agrega estadoUnidad(u), que devuelva "pendiente", "en revisión", "lista" o "entregada" usando cláusulas de guarda, con un error explícito ante estados desconocidos.', 'Escribe pruebas de frontera para la regla de kilometraje alto (99 999, 100 000 y 100 001 km) y para el cobro con 0 y 1 día.']
});

X('m3.loops', {
  deep: `
## Invariante, inicialización, mantenimiento y terminación
Cormen, Leiserson, Rivest y Stein, en el capítulo 2 de *Introduction to Algorithms*, enseñan a demostrar que un bucle es correcto con tres pasos:
- **Inicialización:** el invariante es verdadero antes de la primera vuelta.
- **Mantenimiento:** si es verdadero antes de una vuelta, sigue siéndolo después.
- **Terminación:** al salir, el invariante junto con la condición de salida da el resultado deseado.
~~~js
function maximo(l) {
  let mejor = l[0];
  // Invariante: mejor es el máximo de l[0..i-1]
  for (let i = 1; i < l.length; i++) {
    if (l[i] > mejor) mejor = l[i];
    // se mantiene: ahora mejor es el máximo de l[0..i]
  }
  // al terminar i = l.length, así que mejor es el máximo de toda la lista
  return mejor;
}
console.log(maximo([30, 80, 45, 12]));
~~~
Para la **terminación** se busca una **variante**: una cantidad entera que baja en cada vuelta y no puede bajar para siempre (por ejemplo, «l.length − i» o «n» en «while (n > 1) n = Math.floor(n / 2)»). Si no encuentras una variante, sospecha de un bucle infinito.

## Por qué los índices empiezan en cero
Dijkstra explicó en la nota EWD831, *Why numbering should start at zero* (1982), que los rangos semiabiertos «0 ≤ i < n» son los más cómodos: la cantidad de elementos es n − 0, dos rangos consecutivos «[a, b)» y «[b, c)» se unen sin solaparse, y el rango vacío se escribe «[a, a)». Por eso el patrón «for (let i = 0; i < n; i++)» es el estándar y «<=» suele ser un error de uno de más.

## Elegir el bucle adecuado
| Bucle | Cuándo |
| «for (let i...)» | necesitas el índice o recorrer parte de la colección |
| «for (const x of lista)» | recorrer todos los elementos, sin índice |
| «for (const k in obj)» | recorrer las claves de un objeto (no lo uses en arreglos) |
| «while (cond)» | no sabes cuántas vueltas habrá |
| «do { } while (cond)» | el cuerpo debe ejecutarse al menos una vez (pedir datos hasta que sean válidos) |
McConnell aconseja en *Code Complete* (capítulo 16) que cada bucle tenga **una sola entrada y una sola salida clara**, que su cuerpo no sea tan largo que no quepa en pantalla y que no se anide más de tres niveles.

## Iteradores: qué hace realmente «for...of»
«for...of» funciona con cualquier objeto que siga el **protocolo de iteración**: tener un método que devuelve, una y otra vez, «{ value, done }». Arreglos, textos, Map y Set lo implementan, y tú puedes implementarlo también. Los generadores («function*») permiten producir valores de a uno, incluso infinitos, sin crear una lista completa en memoria:
~~~js
function* numerosDeTicket(desde) { let n = desde; while (true) yield n++; }
const gen = numerosDeTicket(1001);
console.log(gen.next().value, gen.next().value, gen.next().value);
~~~

## Costo de los bucles
- Un bucle simple sobre n elementos hace del orden de n pasos.
- Dos bucles anidados sobre la misma colección hacen del orden de n² pasos: con 10 000 unidades son 100 millones de comparaciones.
- Un bucle que divide el problema a la mitad en cada vuelta hace del orden de log₂ n pasos: con mil millones de elementos, unas 30 vueltas.
Este razonamiento se formaliza con la notación Big-O en el módulo de algoritmos.

## Errores clásicos
- **Modificar la colección mientras se recorre:** borrar elementos de un arreglo en un «for» con índice salta el siguiente elemento. Recorre al revés o construye una lista nueva con «filter».
- **Acumuladores mal inicializados:** el total debe empezar en 0 y el producto en 1; el máximo, en el primer elemento (no en 0, que falla si todos son negativos).
- **Trabajo repetido dentro del bucle:** calcular algo que no cambia en cada vuelta. Sácalo fuera.
- **Concatenar textos en bucles muy largos:** en algunos lenguajes es costoso; reúne las partes en un arreglo y usa «join».`,
  checks: [
    ['¿Cuáles son las tres partes para demostrar que un bucle es correcto con un invariante?', 'Inicialización (vale antes de empezar), mantenimiento (si vale antes de una vuelta, vale después) y terminación (al salir, junto con la condición de salida, implica el resultado).'],
    ['¿Qué variante garantiza que «while (n > 1) n = Math.floor(n / 2)» termina?', 'El propio n: es un entero que disminuye en cada vuelta y no puede bajar indefinidamente sin llegar a 1.'],
    ['¿Por qué iniciar el máximo en 0 es un error?', 'Si todos los valores son negativos, el resultado sería 0, que ni siquiera está en la lista. Debe iniciarse con el primer elemento.'],
    ['¿Qué pasa si eliminas elementos con splice dentro de un for que avanza con i++?', 'Al borrar el elemento i, el siguiente se corre a la posición i y el bucle lo salta. Se debe recorrer de atrás hacia adelante o crear una nueva lista con filter.'],
    ['¿Cuántas comparaciones aproximadas hace un doble bucle sobre 5000 elementos?', 'Del orden de 5000² = 25 millones.']
  ],
  cites: ['Cormen, T., Leiserson, C., Rivest, R. y Stein, C. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulo 2.', 'Dijkstra, E. W. (1982). *Why numbering should start at zero* (EWD831).', 'McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press. Capítulo 16.', 'Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. Capítulo 2.'],
  project: { t: 'Reporte de cierre del día',
    goal: 'Dominar los patrones de bucle (acumulador, contador, máximo, búsqueda) produciendo un reporte real, sin usar map, filter ni reduce.',
    steps: ['Genera una lista de 200 unidades de prueba con días en patio y estado aleatorios.', 'Con bucles, calcula: total de unidades, cantidad por estado, monto total a cobrar y la unidad con más días.', 'Busca la primera unidad con más de 30 días y detén la búsqueda con break.', 'Escribe como comentario el invariante de cada bucle.', 'Mide el tiempo con 200, 20 000 y 2 000 000 de unidades y anota cómo crece.'],
    deliver: 'El archivo del reporte, los invariantes comentados y una tabla con los tiempos medidos.' },
  hito: ['Agrega a PatioApp un reporte de cierre: total de unidades, cantidad por estado, cobro total y la unidad con más días en patio, usando bucles.', 'Escribe el invariante de cada bucle como comentario y agrega una validación que pida datos hasta que sean correctos (do...while).']
});

X('m3.func', {
  deep: `
## La abstracción como herramienta principal
Abelson y Sussman abren *Structure and Interpretation of Computer Programs* (1985; 2.ª ed., 1996), el libro del curso introductorio del MIT durante décadas, mostrando que las funciones son **abstracciones de caja negra**: quien usa «raizCuadrada(x)» no necesita saber si usa el método de Newton o una tabla. Esa separación entre **qué hace** (la interfaz) y **cómo lo hace** (la implementación) es la idea que, a mayor escala, se convierte en módulos, clases, servicios y arquitecturas.

## Qué ocurre en una llamada
1. Se evalúan los argumentos.
2. Se crea un **marco** (frame) en la pila de llamadas con los parámetros, las variables locales y la dirección de retorno.
3. Se ejecuta el cuerpo.
4. Al llegar a «return», se descarta el marco y se vuelve al punto de llamada con el valor.
Por eso las variables locales "desaparecen" al terminar: vivían en un marco que ya no existe. Los cierres son la excepción, porque guardan una referencia a su entorno.

## ¿Paso por valor o por referencia?
JavaScript siempre pasa **una copia del valor**; pero cuando el valor es un objeto, lo copiado es la referencia. Barbara Liskov llamó a este modelo "paso por compartición" en su lenguaje CLU, en los años 70:
~~~js
function cambiar(o, n) { o.km = 999; n = 5; o = { km: 0 }; }
const unidad = { km: 1 }; let x = 1;
cambiar(unidad, x);
console.log(unidad.km, x);   // 999 y 1: se modificó el objeto compartido, no las variables
~~~
Modificar un objeto recibido como parámetro es un **efecto secundario** que el llamador quizá no espera. Si necesitas cambiar algo, devuelve un objeto nuevo.

## Funciones de orden superior
Una función de orden superior recibe o devuelve funciones. «map», «filter», «reduce», «sort» y los manejadores de eventos lo son. Permiten separar el **recorrido** (genérico) de la **acción** (específica):
~~~js
const porPropiedad = prop => (a, b) => a[prop] - b[prop];   // devuelve un comparador
const unidades = [{ placa: 'B', km: 300 }, { placa: 'A', km: 100 }];
console.log(unidades.slice().sort(porPropiedad('km')).map(u => u.placa));
~~~

## Pureza y transparencia referencial
Una función es **pura** si su resultado depende solo de sus argumentos y no produce efectos secundarios (no modifica variables externas, no escribe en pantalla, no lee la hora). Entonces cualquier llamada se puede reemplazar por su resultado sin cambiar el programa: eso es la **transparencia referencial**. Las funciones puras se prueban sin preparar nada, se pueden memoizar y se ejecutan en paralelo sin riesgo. El patrón profesional es un **núcleo puro con una capa delgada de efectos** alrededor (leer datos, guardar, mostrar).

## Cómo diseñar una buena función
Robert C. Martin propone en el capítulo 3 de *Clean Code* (2008) reglas que conviene conocer y aplicar con criterio:
- **Pequeña y con un solo propósito.** Si para describirla usas "y", probablemente hace dos cosas.
- **Un solo nivel de abstracción:** no mezcles "calcular el cobro" con "concatenar el HTML del recibo".
- **Pocos parámetros.** Más de tres suele indicar que falta un objeto: «registrar({ placa, marca, km, zona })».
- **Sin parámetros "bandera":** «imprimir(true)» no dice nada; mejor dos funciones con nombres claros.
- **Separar órdenes de consultas:** una función o cambia algo o responde algo, no ambas cosas.

## Detalles de JavaScript que confunden
- Las declaraciones «function f() {}» se **elevan** (hoisting): se pueden usar antes de la línea donde aparecen. Las expresiones «const f = () => {}» no.
- Las funciones flecha no tienen su propio «this»; lo toman del contexto. Es útil en callbacks y un problema si las usas como métodos de objetos.
- Los parámetros por defecto se evalúan en cada llamada: «function f(lista = [])» crea una lista nueva cada vez (a diferencia de Python, donde es un error clásico).`,
  checks: [
    ['¿Qué imprime el ejemplo de cambiar(unidad, x) y por qué no cambia x?', '999 y 1. Se pasó una copia de x (un número), así que reasignarla dentro no afecta afuera; en cambio, la copia de la referencia apunta al mismo objeto, y modificarlo se ve afuera.'],
    ['¿Por qué una función pura es más fácil de probar?', 'Porque basta darle argumentos y comparar el resultado; no hay que preparar estado externo, simular la hora, la red o la base de datos, y siempre da lo mismo.'],
    ['Una función se llama «guardarYEnviarYMostrar». ¿Qué sugiere su nombre?', 'Que hace tres cosas distintas; debería dividirse en funciones con un solo propósito y una que las coordine.'],
    ['¿Qué es una función de orden superior? Da un ejemplo de la vida diaria en JavaScript.', 'Una que recibe o devuelve funciones. Ejemplos: map, filter, addEventListener o setTimeout.'],
    ['¿Qué significa "núcleo puro, capa de efectos"?', 'Que la lógica de negocio se escribe con funciones puras y que solo una capa externa delgada lee entradas, guarda datos o muestra resultados, para que la mayor parte del código sea fácil de probar.']
  ],
  cites: ['Abelson, H. y Sussman, G. J. (1996). *Structure and Interpretation of Computer Programs* (2.ª ed.). MIT Press. Capítulo 1.', 'Martin, R. C. (2008). *Clean Code*. Prentice Hall. Capítulo 3.', 'Liskov, B. et al. (1981). *CLU Reference Manual*. Springer.', 'Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. Capítulos 3 y 5.'],
  project: { t: 'Librería de utilidades del patio',
    goal: 'Diseñar un conjunto de funciones pequeñas, puras y bien nombradas, y comprobar sus ventajas con pruebas.',
    steps: ['Escribe funciones puras: diasEntre(fecha1, fecha2), cobro(dias, tarifa), normalizarPlaca(texto), esPlacaValida(texto).', 'Escribe funciones de orden superior: ordenarPor(prop), filtrarPor(predicado), agruparPor(prop).', 'Crea con un cierre un generador de números de ticket que no se pueda alterar desde afuera.', 'Escribe una capa de efectos separada que lea datos y muestre resultados usando tus funciones.', 'Escribe al menos 3 pruebas por función pura.'],
    deliver: 'Un módulo utilidades.js exportando las funciones, sus pruebas y un ejemplo de uso.' },
  hito: ['Refactoriza PatioApp para que la lógica esté en funciones puras pequeñas (calcularCobro, diasEnPatio, puedeEntregar, estadoUnidad) separadas de las funciones que leen o imprimen.', 'Agrega generadorDeTickets(), implementado con un cierre, para numerar cada ingreso.']
});

X('m3.arr', {
  deep: `
## Arreglos en memoria
En lenguajes como C o Java un arreglo ocupa un bloque **contiguo** de memoria: para leer «a[i]» basta calcular «dirección inicial + i × tamaño del elemento», por eso el acceso por índice es instantáneo sin importar el tamaño. Insertar al inicio, en cambio, obliga a mover todos los demás elementos.
Cuando un arreglo dinámico se llena, se reserva otro bloque más grande (típicamente el doble) y se copian los elementos. Una copia cuesta mucho, pero ocurre cada vez menos: repartido entre todas las inserciones, el costo promedio de «push» sigue siendo constante. Cormen y sus coautores llaman a esto **análisis amortizado** en *Introduction to Algorithms*.

## Objetos y Map
Un objeto de JavaScript funciona como un diccionario de claves de texto. Para colecciones donde las claves cambian mucho o no son texto, «Map» es mejor: acepta cualquier tipo de clave, mantiene el orden de inserción y sabe su tamaño. «Set» guarda valores sin repetir.
~~~js
const porPlaca = new Map();
porPlaca.set('ABC123', { km: 1000 });
porPlaca.set('XYZ789', { km: 5000 });
console.log(porPlaca.get('ABC123').km, porPlaca.size, porPlaca.has('LMN456'));
const marcas = new Set(['Toyota', 'Kia', 'Toyota']);
console.log([...marcas]);   // sin duplicados
~~~
Buscar por placa en un arreglo obliga a recorrerlo; en un Map es casi inmediato. Esa diferencia, insignificante con 10 elementos, decide si un sistema responde o no con un millón.

## Copias superficiales y profundas
La propagación «{ ...u }» o «[...l]» copia solo el primer nivel: los objetos anidados siguen compartidos. Para una copia completa existe «structuredClone»:
~~~js
const u = { placa: 'ABC123', danos: ['rayón'] };
const sup = { ...u }, prof = structuredClone(u);
sup.danos.push('abolladura');
console.log(u.danos.length, prof.danos.length);   // 2 y 1
~~~
Muchos errores difíciles vienen de modificar un objeto que se creía copiado. Una práctica sana es **no mutar**: crear objetos nuevos con los cambios («{ ...u, estado: 'lista' }»). Así trabajan librerías como React.

## Desestructuración
Permite sacar partes de un objeto o arreglo en una línea, y hace que las funciones con muchos parámetros sean legibles:
~~~js
function registrar({ placa, marca = 'sin marca', km = 0 }) { return placa + ' ' + marca + ' ' + km; }
console.log(registrar({ placa: 'ABC123', km: 500 }));
const [primera, ...resto] = ['A', 'B', 'C'];
console.log(primera, resto);
~~~

## Textos: inmutables y con detalles
- Los textos no se modifican: «toUpperCase» devuelve otro texto. En bucles muy largos, reúne partes en un arreglo y usa «join».
- La «é» puede guardarse como un solo carácter o como «e» + tilde combinada; se ven iguales, pero no son iguales para «===». «normalize('NFC')» los unifica antes de comparar.
- Para buscar sin importar mayúsculas ni tildes: «texto.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()».

## Ordenar bien
Desde ES2019, «sort» es **estable**: los elementos iguales conservan su orden original, lo que permite ordenar por varios criterios en pasos. Ordenar por un criterio y desempatar con otro:
~~~js
const l = [{ m: 'Kia', km: 5 }, { m: 'Audi', km: 9 }, { m: 'Kia', km: 1 }];
l.sort((a, b) => a.m.localeCompare(b.m) || a.km - b.km);
console.log(l.map(x => x.m + x.km).join(' '));
~~~
Recuerda que «sort» modifica el arreglo; «toSorted» (ES2023) devuelve uno nuevo.

## JSON: el idioma común
JSON (JavaScript Object Notation) fue popularizado por Douglas Crockford a inicios de los 2000 y hoy está especificado en el RFC 8259 (2017). Solo admite objetos, arreglos, textos, números, booleanos y null: no hay fechas, ni «undefined», ni funciones. Por eso al guardar una fecha se convierte a texto ISO 8601 («2026-11-12T10:00:00Z») y hay que volver a convertirla al leer. Nunca uses «eval» para leer JSON: usa «JSON.parse», que no ejecuta código.

## Elegir la estructura correcta
| Necesito... | Usa |
| una secuencia en orden, con acceso por posición | arreglo |
| buscar rápido por una clave | Map (u objeto si las claves son fijas) |
| saber si algo ya existe, sin repetidos | Set |
| un registro con campos con nombre | objeto |
| datos que se anidan (carpetas, ubicaciones) | árbol de objetos |
Elegir bien la estructura suele simplificar el algoritmo más que cualquier truco de código: como recuerda Wirth, algoritmos y estructuras de datos van juntos.`,
  checks: [
    ['¿Por qué acceder a «a[500000]» es tan rápido como «a[0]» en un arreglo?', 'Porque los elementos están en memoria contigua y la dirección se calcula con una multiplicación y una suma, sin recorrer los anteriores.'],
    ['¿Cuándo preferirías un Map en lugar de un arreglo para guardar unidades?', 'Cuando se busca con frecuencia por una clave (como la placa): el Map encuentra el elemento casi de inmediato, mientras que el arreglo obliga a recorrerlo.'],
    ['Después de «const c = { ...u }», cambias c.danos.push("x"). ¿Cambia u?', 'Sí, si danos es un arreglo: la copia es superficial y ambos objetos comparten el mismo arreglo interno. Para evitarlo se usa structuredClone o se crea un arreglo nuevo.'],
    ['¿Por qué una fecha guardada con JSON.stringify vuelve como texto al hacer JSON.parse?', 'Porque JSON no tiene tipo fecha; la fecha se serializa como texto ISO y al leerla hay que convertirla de nuevo con new Date().'],
    ['¿Qué significa que un ordenamiento sea estable y para qué sirve?', 'Que los elementos con la misma clave conservan su orden relativo original; permite ordenar por varios criterios sin perder el orden previo.']
  ],
  cites: ['Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. Capítulo 4.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulo 16 (análisis amortizado).', 'Bray, T. (ed.) (2017). *RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format*. IETF.', 'Ecma International (2024). *ECMAScript Language Specification (ECMA-262)*.'],
  project: { t: 'Inventario en memoria con importación y exportación JSON',
    goal: 'Construir un inventario de unidades con altas, bajas, cambios y consultas, que se guarde y cargue en JSON sin errores de referencias.',
    steps: ['Guarda las unidades en un Map indexado por placa.', 'Implementa agregar, actualizar (sin mutar: crea un objeto nuevo), eliminar y buscar.', 'Implementa consultas con filter, map y reduce: por marca, por rango de kilometraje y total a cobrar.', 'Exporta el inventario a JSON convirtiendo las fechas a ISO 8601 y vuelve a importarlo reconstruyendo las fechas.', 'Prueba que exportar e importar devuelve exactamente los mismos datos.'],
    deliver: 'El módulo de inventario, un archivo JSON de ejemplo y las pruebas de ida y vuelta.' },
  hito: ['Guarda las unidades de PatioApp en un Map por placa y reescribe el reporte de cierre con filter, map y reduce.', 'Agrega exportar e importar el patio en JSON, reconstruyendo las fechas y usando copias profundas para no compartir objetos.']
});

X('m3.rec', {
  deep: `
## Definiciones recursivas
Muchos datos se definen a sí mismos: una **lista** es vacía o es un elemento seguido de una lista; un **árbol** es un nodo con hijos que son árboles; una **carpeta** contiene archivos y carpetas. Cuando los datos son recursivos, la función que los procesa tiende naturalmente a serlo. A esto se le llama **recursión estructural**: la forma del código sigue la forma de los datos.
~~~js
// Un patio como árbol: sede → zonas → filas → espacios
const patio = { nombre: 'Sede Lima', hijos: [
  { nombre: 'Zona A', hijos: [{ nombre: 'A1', libre: true }, { nombre: 'A2', libre: false }] },
  { nombre: 'Zona B', hijos: [{ nombre: 'B1', libre: true }] }
] };
function libres(n) {
  if (!n.hijos) return n.libre ? 1 : 0;              // caso base: un espacio
  return n.hijos.reduce((s, h) => s + libres(h), 0); // caso recursivo: suma de los hijos
}
console.log(libres(patio));
~~~

## Procesos recursivos e iterativos
Abelson y Sussman distinguen en la sección 1.2 de *SICP* entre el **procedimiento** (el texto del código) y el **proceso** que genera. Un factorial escrito como «n * f(n − 1)» genera un proceso recursivo: la pila crece con n porque cada llamada espera a la siguiente. Una versión con acumulador, «f(n − 1, acc * n)», genera un proceso iterativo: la llamada recursiva es lo último que se hace (**llamada de cola**) y no queda trabajo pendiente. Algunos lenguajes (Scheme, por norma) reutilizan el marco en ese caso; en JavaScript solo Safari lo hace, así que para recursiones muy profundas conviene un bucle.

## De recursión a iteración con una pila explícita
Toda recursión se puede convertir en un bucle si guardas tú mismo lo pendiente en una pila. Es útil cuando la profundidad podría desbordar la pila del lenguaje (en navegadores suele aguantar unas 10 000 llamadas):
~~~js
function libresIterativo(raiz) {
  const pila = [raiz]; let total = 0;
  while (pila.length) {
    const n = pila.pop();
    if (!n.hijos) total += n.libre ? 1 : 0; else pila.push(...n.hijos);
  }
  return total;
}
console.log(libresIterativo({ hijos: [{ libre: true }, { hijos: [{ libre: true }, { libre: false }] }] }));
~~~

## El costo: árboles de llamadas y recurrencias
El costo de una función recursiva se describe con una **recurrencia**. Las Torres de Hanói, planteadas por Édouard Lucas en 1883, son el ejemplo con el que Graham, Knuth y Patashnik abren *Concrete Mathematics*: mover n discos exige mover n − 1, mover el mayor y mover n − 1 otra vez, así que T(n) = 2T(n − 1) + 1, cuya solución es 2^n − 1. Con 64 discos, a un movimiento por segundo, se necesitarían unos 585 mil millones de años.
El Fibonacci ingenuo hace dos llamadas por nivel y repite subproblemas: su árbol de llamadas crece de forma exponencial (alrededor de 1.6^n). Dibujar el árbol de llamadas es la forma más rápida de detectar ese trabajo repetido.

## Memoización
Donald Michie acuñó el término *memo functions* en un artículo de *Nature* en 1968: una función que recuerda los resultados ya calculados. Solo es correcta si la función es **pura**. Convierte el Fibonacci exponencial en lineal y es el primer paso hacia la **programación dinámica**.
~~~js
function memoizar(f) {
  const cache = new Map();
  return function (n) { if (!cache.has(n)) cache.set(n, f(n)); return cache.get(n); };
}
const fib = memoizar(n => n < 2 ? n : fib(n - 1) + fib(n - 2));
console.log(fib(90));   // instantáneo
~~~

## Recursión mutua y backtracking
Dos funciones pueden llamarse entre sí (por ejemplo, un analizador de expresiones donde «expresión» llama a «término» y «término» vuelve a llamar a «expresión» al ver un paréntesis). El **backtracking** usa recursión para explorar opciones y retroceder cuando una no sirve: resolver un sudoku, generar todas las permutaciones o encontrar una ruta en un laberinto.

## Cómo pensar una solución recursiva
1. ¿Cuál es el caso más pequeño que sé resolver directamente? (caso base)
2. ¿Cómo reduzco el problema a uno más pequeño del mismo tipo?
3. Suponiendo que la llamada recursiva funciona (el "salto de fe"), ¿cómo combino su resultado?
4. ¿Cada llamada se acerca de verdad al caso base?
La justificación del paso 3 es la **inducción**: si funciona para el caso base y funcionar para n − 1 implica funcionar para n, funciona para todos.`,
  checks: [
    ['¿Qué diferencia hay entre un proceso recursivo y uno iterativo según SICP?', 'En el recursivo quedan operaciones pendientes en cada llamada y la pila crece; en el iterativo la llamada recursiva es lo último (llamada de cola) y el estado completo viaja en los parámetros.'],
    ['Resuelve la recurrencia de Hanói para n = 5.', 'T(5) = 2^5 − 1 = 31 movimientos.'],
    ['¿Por qué la memoización solo es correcta con funciones puras?', 'Porque reutiliza el resultado guardado para los mismos argumentos; si la función dependiera de algo externo o tuviera efectos, el resultado guardado podría ser incorrecto o se perderían los efectos.'],
    ['¿Cuándo convertirías una recursión en un bucle con pila explícita?', 'Cuando la profundidad puede ser muy grande (miles de niveles) y desbordar la pila del lenguaje, o cuando necesitas pausar y reanudar el recorrido.'],
    ['¿Qué es la recursión estructural?', 'Una función recursiva cuya forma sigue la definición de los datos: un caso por cada forma del dato (vacío, hoja, nodo con hijos).']
  ],
  cites: ['Abelson, H. y Sussman, G. J. (1996). *Structure and Interpretation of Computer Programs* (2.ª ed.). MIT Press. Sección 1.2.', 'Graham, R., Knuth, D. y Patashnik, O. (1994). *Concrete Mathematics* (2.ª ed.). Addison-Wesley. Capítulo 1.', 'Michie, D. (1968). "Memo" functions and machine learning. *Nature*, 218.', 'Cormen, T. et al. (2022). *Introduction to Algorithms* (4.ª ed.). MIT Press. Capítulo 4.'],
  project: { t: 'Explorador recursivo de ubicaciones',
    goal: 'Modelar un patio con varias sedes como árbol y resolver consultas con recursión estructural, comparándola con una versión iterativa.',
    steps: ['Crea un JSON de 2 sedes, 3 zonas por sede, 4 filas por zona y 10 espacios por fila.', 'Escribe funciones recursivas: contar espacios libres, encontrar la ruta completa de una placa ("Sede Lima > Zona A > Fila 2 > A2-07") y listar espacios ocupados.', 'Imprime el árbol con sangría según la profundidad.', 'Escribe la versión iterativa con pila explícita de contar libres y comprueba que coincide.', 'Genera un árbol de 50 000 niveles de profundidad (una sola rama) y observa qué versión falla.'],
    deliver: 'El código con ambas versiones, la salida impresa del árbol y una explicación del desbordamiento de pila observado.' },
  hito: ['Modela las ubicaciones de PatioApp como árbol (sede → zona → fila → espacio) y escribe funciones recursivas para contar espacios libres y encontrar la ruta de una placa.', 'Agrega la versión iterativa con pila explícita y una prueba que compare ambas en un patio grande.']
});
})();
