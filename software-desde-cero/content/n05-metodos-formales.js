(function () {
var M = SDC.M, S = SDC.S;
M('for', { title: 'Modelos y métodos formales',
  desc: 'Especificar con precisión matemática qué debe hacer un sistema y comprobar que lo hace en todos los casos, no solo en los que se probaron. Es lo que usan la aviación, los trenes autónomos y los servicios de nube más grandes del mundo.',
  thread: 'El ciclo de vida de una unidad de PatioApp se define como máquina de estados, sus operaciones llevan contratos verificables y la reserva concurrente se comprueba explorando todos los intercalados posibles.',
  books: '*A Discipline of Programming* (Dijkstra), *The Science of Programming* (Gries), *Object-Oriented Software Construction* (Meyer), *Specifying Systems* (Lamport), *Software Abstractions* (Jackson).',
  uni: 'CMU 15-414 *Bug Catching: Automated Program Verification*; MIT 6.1040 *Software Design* (Daniel Jackson, autor de Alloy); *Software Foundations* (Pierce y otros, usado en Penn, Princeton y otras universidades); área *Software Engineering Models and Methods* de SWEBOK v4. En Perú: cursos electivos de métodos formales y verificación de software.',
  capstone: { t: 'Especificación formal del ciclo de vida de una unidad',
    goal: 'Especificar, implementar y verificar la parte más crítica de PatioApp con las herramientas del módulo.',
    steps: ['Define el ciclo de vida de una unidad como máquina de estados con guardas y acciones, y genera de ella diagramas y pruebas.', 'Agrega contratos (precondiciones, postcondiciones e invariantes) a las operaciones y demuestra uno de ellos con un invariante de bucle.', 'Modela la reserva concurrente de unidades y explora todos los intercalados para comprobar que nunca se asigna dos veces.', 'Introduce a propósito un error en el modelo y muestra el contraejemplo que encuentra el explorador.', 'Opcional: escribe el mismo modelo en TLA+ o Alloy y verifícalo con su herramienta.'],
    deliver: 'La especificación, el código con contratos, el explorador de estados con sus resultados y el contraejemplo documentado.' } });

S('for', 'for.sm', { title: 'Máquinas de estados y statecharts',
  ask: '¿Qué concepto de máquinas de estados se aplica?',
  lesson: `
> **La idea en simple.** Un semáforo no puede estar en verde y rojo a la vez, y no pasa de verde a rojo sin el amarillo. Si escribes su lógica con variables sueltas («estaVerde», «estaRojo»), tarde o temprano alguien dejará ambas en verdadero. Si la escribes como **máquina de estados**, ese error es imposible por construcción.

## De los autómatas al software
En teoría de la computación los autómatas solo aceptan o rechazan. En ingeniería se usan máquinas que además **producen salidas**:
- **Máquina de Mealy** (George Mealy, 1955): la salida depende del estado y del evento ("al recibir el pago estando revisada, emitir factura").
- **Máquina de Moore** (Edward Moore, 1956): la salida depende solo del estado ("mientras está en reparación, la luz es naranja").
Una máquina de estados en software tiene **estados**, **eventos** que llegan desde afuera, **transiciones** entre estados, **guardas** (condiciones que deben cumplirse para que la transición ocurra) y **acciones** (lo que se ejecuta al transitar, al entrar o al salir de un estado).

## La tabla de transiciones
La forma más precisa de especificarla es una tabla: una fila por estado, una columna por evento.
| Estado \\ Evento | revisar | aprobar | rechazar | entregar | anular |
| ingresada | en_revision | — | — | — | anulada |
| en_revision | — | lista | taller | — | anulada |
| taller | en_revision | — | — | — | anulada |
| lista | — | — | — | entregada [si está pagada] | anulada |
| entregada | — | — | — | — | — |
Las celdas vacías son **transiciones inválidas**. Escribir la tabla completa obliga a decidir qué pasa en cada combinación, incluidas las que nadie había pensado: ¿se puede anular una unidad en el taller? ¿qué pasa si llega "entregar" dos veces? Cada celda se convierte en un caso de prueba.
~~~js
const tabla = {
  ingresada:   { revisar: 'en_revision', anular: 'anulada' },
  en_revision: { aprobar: 'lista', rechazar: 'taller', anular: 'anulada' },
  taller:      { revisar: 'en_revision', anular: 'anulada' },
  lista:       { entregar: 'entregada', anular: 'anulada' },
  entregada:   {}, anulada: {}
};
const guardas = { entregar: u => u.pagada };
function procesar(u, evento) {
  const destino = tabla[u.estado][evento];
  if (!destino) throw new Error('No se puede "' + evento + '" en estado ' + u.estado);
  if (guardas[evento] && !guardas[evento](u)) throw new Error('Guarda no cumplida para ' + evento);
  return { ...u, estado: destino };
}
let u = { placa: 'ABC123', estado: 'ingresada', pagada: true };
for (const e of ['revisar', 'rechazar', 'revisar', 'aprobar', 'entregar']) u = procesar(u, e);
console.log(u.estado);
try { procesar(u, 'revisar'); } catch (e) { console.log(e.message); }
~~~

## Statecharts: estados con estructura
Las máquinas planas sufren de **explosión de estados**: si una unidad tiene 5 estados de proceso y además puede estar "con GPS" o "sin GPS" y "asegurada" o "no asegurada", las combinaciones son 5 × 2 × 2 = 20 estados. David Harel resolvió el problema en 1987 con los **statecharts** (*Statecharts: A Visual Formalism for Complex Systems*), diseñados para la aviónica de un avión de combate. Agregan:
- **Jerarquía:** estados que contienen subestados. "En patio" contiene ingresada, en revisión y lista; un evento "anular" definido en el estado padre aplica a todos sus hijos, en lugar de repetirlo en cada uno.
- **Concurrencia (regiones ortogonales):** partes independientes que avanzan en paralelo (proceso, seguro y GPS), que suman en lugar de multiplicar: 5 + 2 + 2 estados en vez de 20.
- **Historia:** al volver a un estado compuesto, recordar en qué subestado se estaba.
Los diagramas de estado de UML se basan en los statecharts de Harel, el W3C los estandarizó en XML como SCXML (2015) y bibliotecas como XState (de David Khourshid) los implementan en JavaScript.

## Hacer imposibles los estados imposibles
Richard Feldman popularizó en 2016 una regla de diseño de tipos: **haz imposibles los estados imposibles**. En lugar de «{ cargando: true, error: 'x', datos: [...] }», que permite combinaciones absurdas, se modela un solo campo de estado con variantes excluyentes: «cargando», «error con mensaje» o «listo con datos». Las máquinas de estados son la versión de comportamiento de la misma idea.

## Dónde aparecen
- **Protocolos:** TCP define 11 estados de conexión en su especificación original (RFC 793, 1981), de LISTEN a TIME-WAIT.
- **Interfaces:** un formulario de varios pasos, un reproductor de video, un carrito de compras.
- **Procesos de negocio:** pedidos, solicitudes, trámites; su estado es exactamente lo que el negocio pregunta.
- **Sistemas embebidos y juegos:** el comportamiento de un enemigo, el control de un ascensor.

## Probar una máquina de estados
Criterios de cobertura de menor a mayor: visitar **todos los estados**, recorrer **todas las transiciones válidas**, intentar **todas las transiciones inválidas** (cada celda vacía de la tabla) y recorrer **secuencias** de transiciones (pares, caminos hasta cierta longitud). Como la tabla es un dato, las pruebas se pueden **generar automáticamente** a partir de ella, y el diagrama también.

## Errores frecuentes al implementarlas
- **Estado repartido en varias variables.** Si además del campo «estado» existen «estaPagada», «enTaller» y «fueEntregada», tarde o temprano quedarán contradictorios. Lo que forma parte del ciclo de vida debe vivir en un solo lugar.
- **Transiciones escondidas en muchos archivos.** Cuando cada pantalla cambia el estado a su manera, nadie puede responder "¿desde dónde se puede anular?". Centraliza las transiciones en la tabla y haz que todo el código pase por una única función que las aplique.
- **No guardar la historia.** El estado actual dice dónde está la unidad, pero el negocio pregunta también cuándo y quién la cambió. Registra cada transición como un evento (fecha, usuario, evento, estado anterior y nuevo): es la base de la auditoría y, llevada al extremo, del patrón *event sourcing*.
- **Olvidar los eventos que llegan dos veces.** En sistemas distribuidos un mismo evento puede repetirse; decide si una transición repetida se ignora (idempotencia) o es un error.`,
  links: [['teo.auto', 'una máquina de estados es un autómata finito con salidas'], ['m5.pat2', 'el patrón State implementa una máquina de estados con objetos'], ['m11.uml', 'el diagrama de estados de UML proviene de los statecharts de Harel']],
  read: 'Harel (1987); Samek, *Practical UML Statecharts in C/C++*; especificación de XState y SCXML.',
  terms: [
    ['Estado', 'situación del sistema que determina cómo responde a los eventos', ['Una unidad "en revisión" no puede entregarse.', 'Un semáforo en amarillo solo puede pasar a rojo.', 'Una conexión TCP en LISTEN espera un SYN.']],
    ['Transición', 'cambio de un estado a otro provocado por un evento', ['"aprobar" lleva una unidad de en revisión a lista.', 'Cada celda llena de la tabla define una.', 'Una celda vacía indica que no está permitida.']],
    ['Evento', 'suceso externo que puede provocar una transición', ['Llega el pago de un cliente.', 'El revisor presiona "Aprobar".', 'Vence un temporizador de espera.']],
    ['Guarda', 'condición que debe cumplirse para que una transición ocurra', ['Solo se entrega si la unidad está pagada.', 'Se reintenta solo si quedan intentos.', 'Se escribe entre corchetes en el diagrama.']],
    ['Acción de entrada', 'operación que se ejecuta automáticamente al entrar en un estado', ['Al entrar en "lista" se notifica al supervisor.', 'Al entrar en "taller" se crea una orden de trabajo.', 'Evita repetir la misma acción en cada transición que llega al estado.']],
    ['Máquina de Mealy', 'máquina de estados cuya salida depende del estado actual y del evento recibido', ['Al recibir el pago estando revisada, se emite la factura.', 'Un protocolo responde distinto al mismo mensaje según su estado.', 'Su contraparte es la máquina de Moore.']],
    ['Estado jerárquico', 'estado que contiene subestados y comparte con ellos sus transiciones', ['"En patio" agrupa ingresada, en revisión y lista.', 'Un evento "anular" definido en el padre aplica a todos los hijos.', 'Harel lo introdujo en los statecharts.']],
    ['Explosión de estados', 'crecimiento multiplicativo de la cantidad de estados al combinar aspectos independientes en una máquina plana', ['Cinco estados de proceso con dos de GPS y dos de seguro dan 20 combinaciones.', 'Las regiones ortogonales de los statecharts la evitan.', 'Hace que los diagramas planos sean ilegibles.']]
  ],
  q: [
    ['¿Qué ventaja tiene especificar la máquina como tabla de transiciones?', 'Obliga a decidir qué pasa en cada combinación de estado y evento, y cada celda se vuelve una prueba', ['Ocupa menos memoria', 'Elimina la necesidad de pruebas', 'Hace el código más rápido'], 'Las celdas vacías revelan casos que nadie había pensado.', 3],
    ['Un sistema tiene 4 estados de proceso, 3 de pago y 2 de seguro, independientes entre sí. ¿Cuántos estados tendría una máquina plana?', '24', ['9', '12', '6'], '4 × 3 × 2 = 24; con regiones ortogonales bastan 4 + 3 + 2.', 3],
    ['¿Qué aportan las regiones ortogonales de un statechart?', 'Modelar aspectos independientes en paralelo sin multiplicar estados', ['Recordar el último subestado', 'Ejecutar acciones al entrar', 'Validar guardas'], 'Los estados de cada región se suman en lugar de multiplicarse.', 3],
    ['¿Qué significa "haz imposibles los estados imposibles"?', 'Modelar los datos para que las combinaciones inválidas no se puedan representar', ['Validar todo con if', 'Eliminar los estados de error', 'Usar solo booleanos'], 'Un único campo con variantes excluyentes reemplaza a varios booleanos contradictorios.', 4],
    { tf: 'En una máquina de Moore, la salida depende solo del estado actual.', v: true, e: 'En la de Mealy depende también del evento.', l: 2 },
    { tf: 'Si una prueba visita todos los estados, ya recorrió todas las transiciones.', v: false, e: 'Puedes visitar todos los estados sin usar todas las transiciones; son criterios distintos.', l: 3 },
    { i: 'Una máquina tiene 5 estados y 4 eventos. ¿Cuántas celdas tiene su tabla de transiciones completa?', a: 20, e: '5 × 4 = 20 combinaciones, cada una válida o inválida.', l: 2 },
    { c: 'Escribe «procesar(tabla, inicial, eventos)»: aplica los eventos en orden usando tabla[estado][evento]; si alguno no está permitido, devuelve "invalido"; si no, el estado final.', f: 'procesar', p: ['tabla', 'inicial', 'eventos'], t: [[[{ ingresada: { revisar: 'en_revision' }, en_revision: { aprobar: 'lista', rechazar: 'taller' }, taller: { revisar: 'en_revision' }, lista: { entregar: 'entregada' }, entregada: {} }, 'ingresada', ['revisar', 'rechazar', 'revisar', 'aprobar']], 'lista'], [[{ ingresada: { revisar: 'en_revision' }, en_revision: { aprobar: 'lista' }, lista: { entregar: 'entregada' }, entregada: {} }, 'ingresada', ['entregar']], 'invalido'], [[{ a: { x: 'b' }, b: { x: 'a' } }, 'a', []], 'a']], sol: '  let e = inicial;\n  for (const ev of eventos) {\n    const d = tabla[e] && tabla[e][ev];\n    if (!d) return "invalido";\n    e = d;\n  }\n  return e;', l: 3 }
  ],
  gen: function (g) {
    var tabla = { ingresada: { revisar: 'en_revision', anular: 'anulada' }, en_revision: { aprobar: 'lista', rechazar: 'taller', anular: 'anulada' }, taller: { revisar: 'en_revision', anular: 'anulada' }, lista: { entregar: 'entregada', anular: 'anulada' }, entregada: {}, anulada: {} };
    var eventos = ['revisar', 'aprobar', 'rechazar', 'entregar', 'anular'];
    g.times(12, function (R) { var e = 'ingresada', seq = [], ok = true; var n = R.int(2, 5); for (var i = 0; i < n; i++) { var ev = R.pick(eventos); seq.push(ev); if (ok) { var d = tabla[e][ev]; if (d) e = d; else ok = false; } } g.input(3, 'Con la tabla del ciclo de vida de la unidad, partiendo de "ingresada", ¿en qué estado termina con los eventos ' + seq.join(', ') + '? Si algún evento no está permitido, responde invalido.', ok ? e : 'invalido', ok ? 'Aplicando la tabla paso a paso se llega a ' + e + '.' : 'Algún evento no tiene transición desde el estado en que llega.', 'ingresada: revisar→en_revision, anular→anulada\nen_revision: aprobar→lista, rechazar→taller, anular→anulada\ntaller: revisar→en_revision, anular→anulada\nlista: entregar→entregada, anular→anulada\nentregada y anulada: sin transiciones'); });
    g.times(5, function (R) { var a = R.int(2, 6), b = R.int(2, 4), c = R.int(2, 3); g.input(3, 'Tres aspectos independientes tienen ' + a + ', ' + b + ' y ' + c + ' estados. ¿Cuántos estados necesita una máquina plana y cuántos un statechart con regiones ortogonales? Escribe ambos números separados por coma.', (a * b * c) + ',' + (a + b + c), 'Plana: ' + a + '×' + b + '×' + c + ' = ' + a * b * c + '; regiones: ' + a + '+' + b + '+' + c + ' = ' + (a + b + c) + '.'); });
  },
  checks: [
    ['¿Qué ventaja tiene modelar el ciclo de vida de una unidad como máquina de estados en lugar de varios booleanos?', 'Los estados son excluyentes y las transiciones explícitas, así que las combinaciones inválidas (entregada y en revisión a la vez) son imposibles por construcción.'],
    ['¿Qué es una guarda y en qué se diferencia de una transición inválida?', 'La guarda es una condición adicional sobre una transición que existe (entregar solo si está pagada); una transición inválida directamente no existe para ese estado.'],
    ['¿Qué problema resuelven los statecharts de Harel?', 'La explosión de estados y la repetición: con jerarquía, concurrencia e historia modelan sistemas complejos sin multiplicar estados ni duplicar transiciones.'],
    ['¿Qué criterios de cobertura usarías para probar una máquina de estados?', 'Todos los estados, todas las transiciones válidas, todos los intentos de transición inválida y secuencias de transiciones.'],
    ['¿Por qué conviene que la tabla de transiciones sea un dato y no código disperso?', 'Porque se puede leer, revisar, dibujar y usar para generar pruebas automáticamente; un cambio de regla es un cambio en un solo lugar.']
  ],
  cites: ['Harel, D. (1987). Statecharts: A Visual Formalism for Complex Systems. *Science of Computer Programming*, 8(3).', 'Mealy, G. (1955). A Method for Synthesizing Sequential Circuits. *Bell System Technical Journal*, 34(5).', 'Moore, E. F. (1956). Gedanken-experiments on Sequential Machines. *Automata Studies*, Princeton University Press.', 'W3C (2015). *State Chart XML (SCXML): State Machine Notation for Control Abstraction*.', 'Postel, J. (ed.) (1981). *RFC 793: Transmission Control Protocol*. IETF.'],
  project: { t: 'Máquina de estados declarativa con pruebas generadas',
    goal: 'Implementar una máquina de estados como dato y generar a partir de ella su diagrama y sus pruebas.',
    steps: ['Define un proceso real (un trámite, un pedido o un ticket de soporte) con al menos 6 estados, 6 eventos, una guarda y acciones de entrada.', 'Implementa un intérprete genérico que reciba la tabla, el estado y el evento.', 'Genera automáticamente el diagrama en Mermaid desde la tabla.', 'Genera automáticamente las pruebas de todas las transiciones válidas e inválidas.', 'Rehaz el modelo como statechart con un estado compuesto y una región ortogonal, y compara la cantidad de estados.'],
    deliver: 'El intérprete, la tabla, el diagrama generado, las pruebas generadas y la comparación plano contra statechart.' },
  hito: ['Define el ciclo de vida de la unidad de PatioApp como tabla de transiciones (estados, eventos, guardas y acciones) y úsala como única fuente de verdad del código.', 'Genera desde la tabla el diagrama de estados y las pruebas de todas las transiciones válidas e inválidas.']
});

S('for', 'for.contract', { title: 'Especificación, contratos y lógica de Hoare',
  ask: '¿Qué concepto de especificación o corrección se aplica?',
  lesson: `
> **La idea en simple.** Un contrato de alquiler dice qué debe hacer cada parte: si pagas a tiempo (tu obligación), te entrego el departamento en buen estado (mi obligación). Una función también puede tener un contrato: si la llamas con datos válidos, garantiza un resultado con ciertas propiedades. Escribirlo convierte el "creo que funciona" en algo que se puede razonar y verificar.

## Dar significado a los programas
Robert Floyd (1967, *Assigning Meanings to Programs*) y Tony Hoare (1969, *An Axiomatic Basis for Computer Programming*) propusieron razonar sobre programas con lógica. Hoare introdujo la **tripleta** {P} C {Q}: si la **precondición** P es verdadera antes de ejecutar el comando C, y C termina, entonces la **postcondición** Q es verdadera después.
- {x = 5} x := x + 1 {x = 6} es válida.
- {x > 0} x := x − 1 {x ≥ 0} es válida para enteros.
- {verdadero} x := 10 / y {…} necesita la precondición y ≠ 0 para tener sentido.

## Las reglas, en lo esencial
- **Asignación:** para que Q valga después de «x := e», antes debe valer Q con e en lugar de x. Para que «x > 10» valga después de «x := x + 3», antes debe valer «x + 3 > 10», es decir «x > 7».
- **Secuencia:** si {P} C1 {R} y {R} C2 {Q}, entonces {P} C1; C2 {Q}.
- **Condicional:** hay que demostrar Q en ambas ramas, cada una con su condición.
- **Bucles:** se necesita un **invariante** I que valga antes del bucle y se mantenga en cada vuelta; al salir valen I y la negación de la condición. Es la misma técnica de invariantes que viste en programación y algoritmos, ahora como regla formal.
Edsger Dijkstra reformuló el método en *A Discipline of Programming* (1976) con la **precondición más débil** wp(C, Q): la condición mínima que garantiza Q después de C. En el ejemplo anterior, wp(x := x + 3, x > 10) = x > 7. David Gries lo convirtió en una metodología para **derivar** programas correctos en *The Science of Programming* (1981).

## Corrección parcial y total
- **Corrección parcial:** si el programa termina, el resultado es correcto.
- **Corrección total:** además, siempre termina. Para los bucles se demuestra con una **variante**: una cantidad entera no negativa que disminuye en cada vuelta.

## Un programa derivado con su invariante
~~~js
// Raíz entera: el mayor r tal que r·r ≤ n (n ≥ 0)
function raizEntera(n) {
  console.assert(Number.isInteger(n) && n >= 0, 'precondición: n entero no negativo');
  let lo = 0, hi = n + 1;               // invariante: lo·lo ≤ n < hi·hi
  while (hi - lo > 1) {                 // variante: hi − lo, entero que disminuye
    const m = Math.floor((lo + hi) / 2);
    if (m * m <= n) lo = m; else hi = m; // ambas ramas conservan el invariante
  }
  console.assert(lo * lo <= n && n < (lo + 1) * (lo + 1), 'postcondición');
  return lo;                             // al salir hi = lo + 1, así que lo es la respuesta
}
console.log(raizEntera(0), raizEntera(15), raizEntera(16), raizEntera(1000000));
~~~
El invariante explica **por qué** el código es correcto: al empezar, 0·0 ≤ n < (n+1)²; cada vuelta mantiene la desigualdad; al terminar con hi = lo + 1, el invariante dice exactamente que lo es la raíz entera.

## Diseño por contrato en la práctica
Bertrand Meyer llevó estas ideas a la programación cotidiana con el lenguaje Eiffel (1986) y el **diseño por contrato**: cada rutina declara su precondición («require»), su postcondición («ensure») y cada clase su **invariante**. Si falla una precondición, la culpa es de quien llamó; si falla una postcondición, de la rutina. En otros lenguajes se aproxima con:
- **Aserciones** que verifican el contrato en desarrollo y pruebas.
- **Tipos** (TypeScript) y **esquemas de validación** (Zod, JSON Schema) para las precondiciones en las fronteras.
- **Constructores que validan** y métodos que mantienen el invariante, como viste en orientación a objetos.
- **Pruebas basadas en propiedades**, que son postcondiciones comprobadas con muchas entradas aleatorias.
El principio de sustitución de Liskov también se expresa con contratos: una subclase no puede fortalecer precondiciones ni debilitar postcondiciones.

## Ejemplo resuelto: el contrato de entregar
~~~txt
entregar(placa)
  requiere: existe una unidad con esa placa, su estado es "lista" y está pagada
  asegura:  su estado es "entregada", se registró la fecha de salida
            y la cantidad de unidades en el patio disminuyó en 1
  invariante del patio: unidades en patio = ingresos − salidas, y ninguna placa aparece dos veces
~~~
Con el contrato escrito, las pruebas se diseñan solas (una por cláusula), la revisión de código tiene un criterio claro y un futuro cambio que rompa el invariante se detecta de inmediato. Hoare recibió el Premio Turing en 1980, y Dijkstra en 1972, en buena parte por convertir la programación en una disciplina con razonamiento riguroso.

## Contratos en las fronteras del sistema
Dentro de tu código, los contratos se verifican con aserciones y pruebas. En las **fronteras** (una API, un archivo que se importa, un mensaje de una cola) los datos vienen de afuera y no se puede confiar en ellos: ahí la precondición se convierte en **validación** que rechaza la entrada con un error claro. Una regla práctica es "validar en la frontera, confiar adentro": convierte los datos externos en objetos que ya cumplen sus invariantes (una Placa válida, un Monto no negativo) apenas entran, y el resto del sistema trabaja con esos objetos sin volver a validar. Alexis King lo resumió en 2019 con la frase *Parse, don't validate*: en lugar de comprobar los datos y seguir usando el tipo original, conviértelos a un tipo que garantice la propiedad.`,
  links: [['m3.loops', 'los invariantes de bucle son la regla de Hoare para la iteración'], ['m5.oop1', 'el diseño por contrato protege las invariantes de las clases'], ['m14.techniques', 'las pruebas basadas en propiedades verifican postcondiciones con entradas aleatorias']],
  read: 'Hoare (1969); Dijkstra, *A Discipline of Programming*; Gries, *The Science of Programming*; Meyer, *Object-Oriented Software Construction*, capítulo 11.',
  terms: [
    ['Precondición', 'condición que debe cumplirse antes de ejecutar una operación para que esta garantice su resultado', ['Entregar exige que la unidad esté lista y pagada.', 'Dividir exige que el divisor no sea cero.', 'Si no se cumple, la responsabilidad es de quien llama.']],
    ['Postcondición', 'condición que una operación garantiza al terminar si se cumplió su precondición', ['Después de entregar, el estado es "entregada".', 'Ordenar garantiza que el resultado está en orden y tiene los mismos elementos.', 'Si no se cumple, la responsabilidad es de la operación.']],
    ['Invariante de clase', 'condición que todos los objetos de una clase cumplen antes y después de cada operación pública', ['Las unidades en patio siempre son ingresos menos salidas.', 'Un saldo nunca es negativo.', 'El constructor la establece y cada método la conserva.']],
    ['Triple de Hoare', 'afirmación {P} C {Q}: si P vale antes de C y C termina, Q vale después', ['{x = 5} x := x + 1 {x = 6}.', 'Se usa para demostrar la corrección de un fragmento de programa.', 'Hoare la propuso en 1969.']],
    ['Precondición más débil', 'condición mínima que, antes de un comando, garantiza una postcondición dada', ['Para que x > 10 después de x := x + 3, antes basta x > 7.', 'Dijkstra la usó para derivar programas correctos.', 'Se calcula hacia atrás desde la postcondición.']],
    ['Corrección parcial', 'garantía de que, si el programa termina, su resultado es correcto', ['Demuestras con un invariante que el resultado es el esperado al salir del bucle.', 'No dice nada sobre si el programa se cuelga.', 'Le falta la terminación para ser corrección total.']],
    ['Corrección total', 'garantía de que el programa siempre termina y su resultado es correcto', ['Agregas una variante que disminuye en cada vuelta del bucle.', 'Combina corrección parcial con terminación.', 'Es la que se exige en sistemas críticos.']],
    ['Diseño por contrato', 'metodología que declara para cada operación sus precondiciones, postcondiciones e invariantes', ['Eiffel la incorpora con require y ensure.', 'Decide quién tiene la culpa cuando algo falla.', 'Bertrand Meyer la propuso en los años 80.']]
  ],
  q: [
    ['¿Cuál es la precondición más débil de «x := x + 3» para la postcondición «x > 10»?', 'x > 7', ['x > 10', 'x > 13', 'x ≥ 7'], 'Se reemplaza x por x + 3 en la postcondición: x + 3 > 10.', 3],
    ['Si se viola la precondición de una función, ¿de quién es la responsabilidad según el diseño por contrato?', 'De quien la llamó', ['De la función', 'Del compilador', 'Del usuario final'], 'La precondición es la obligación del llamador.', 2],
    ['¿Qué se necesita además del invariante para demostrar que un bucle termina?', 'Una variante que disminuye en cada vuelta y no puede bajar indefinidamente', ['Una postcondición más fuerte', 'Más pruebas', 'Una guarda'], 'Eso convierte la corrección parcial en total.', 3],
    ['Una subclase exige que el monto sea mayor que 100, aunque el padre aceptaba cualquier monto positivo. ¿Qué regla de contratos viola?', 'Fortalece una precondición', ['Debilita una postcondición', 'Rompe la variante', 'Ninguna'], 'Es una violación del principio de sustitución de Liskov.', 4],
    { tf: 'La tripleta {x > 0} x := x − 1 {x ≥ 0} es válida para enteros.', v: true, e: 'Si x es un entero mayor que 0, x − 1 es al menos 0.', l: 3 },
    { tf: 'Corrección parcial garantiza que el programa siempre termina.', v: false, e: 'Solo garantiza que, si termina, el resultado es correcto.', l: 2 },
    { i: 'wp(x := 2·x, x < 20): ¿cuál es el mayor entero x que la cumple antes de la asignación?', a: 9, e: 'La condición es 2x < 20, es decir x < 10; el mayor entero es 9.', l: 4 },
    { c: 'Escribe «raizEntera(n)» que devuelva el mayor r con r·r ≤ n, usando búsqueda binaria con el invariante lo·lo ≤ n < hi·hi.', f: 'raizEntera', p: ['n'], t: [[[0], 0], [[15], 3], [[16], 4], [[1000000], 1000]], sol: '  let lo = 0, hi = n + 1;\n  while (hi - lo > 1) {\n    const m = Math.floor((lo + hi) / 2);\n    if (m * m <= n) lo = m; else hi = m;\n  }\n  return lo;', h: 'Empieza con lo = 0 y hi = n + 1; cada vuelta conserva el invariante.', l: 4 },
    { c: 'Escribe «verificaInvariante(movimientos)» que reciba una lista de "in" y "out" y diga si en ningún momento salen más unidades de las que entraron (las unidades en patio nunca son negativas).', f: 'verificaInvariante', p: ['movimientos'], t: [[[['in', 'in', 'out', 'out']], true], [[['in', 'out', 'out']], false], [[[]], true]], sol: '  let n = 0;\n  for (const m of movimientos) { n += m === "in" ? 1 : -1; if (n < 0) return false; }\n  return true;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 9), b = R.int(10, 40); g.input(3, 'Calcula wp(x := x + ' + a + ', x > ' + b + '): ¿x debe ser mayor que qué número?', b - a, 'x + ' + a + ' > ' + b + ' equivale a x > ' + (b - a) + '.'); });
    g.times(6, function (R) { var k = R.pick([2, 3, 4, 5]), b = k * R.int(3, 12); g.input(4, 'Calcula wp(x := ' + k + '·x, x ≥ ' + b + ') para enteros: ¿cuál es el menor x válido antes de la asignación?', b / k, k + 'x ≥ ' + b + ' equivale a x ≥ ' + b / k + '.'); });
    var trip = [['{x = 3} x := x · 2 {x = 6}', true], ['{x > 0} x := x − 2 {x > 0}', false], ['{verdadero} x := 7 {x = 7}', true], ['{x ≥ 5} y := x − 5 {y ≥ 0}', true], ['{x < 10} x := x + 1 {x < 10}', false], ['{a = b} a := a + 1 {a > b}', true]];
    trip.forEach(function (t) { g.mcq(3, '¿Es válida esta tripleta de Hoare (para enteros)? ' + t[0], t[1] ? 'Sí' : 'No', [t[1] ? 'No' : 'Sí', 'Solo si el programa no termina', 'Depende del lenguaje'], t[1] ? 'Desde cualquier estado que cumple la precondición se llega a la postcondición.' : 'Existe un valor que cumple la precondición y no la postcondición (por ejemplo, el borde).'); });
  },
  checks: [
    ['Escribe la tripleta de Hoare para una operación de depósito en una cuenta.', '{saldo = s y monto > 0} depositar(monto) {saldo = s + monto}.'],
    ['Calcula la precondición más débil de «y := x − 5» para que «y ≥ 0» valga después.', 'x − 5 ≥ 0, es decir x ≥ 5.'],
    ['¿Qué diferencia hay entre corrección parcial y total?', 'La parcial garantiza un resultado correcto si el programa termina; la total además garantiza que termina, demostrado con una variante.'],
    ['¿Cómo ayuda escribir el contrato de una función a diseñar sus pruebas?', 'Cada cláusula de la precondición sugiere casos inválidos y cada cláusula de la postcondición e invariante sugiere una aserción a verificar.'],
    ['¿Cómo se relacionan los contratos con el principio de sustitución de Liskov?', 'Una subclase respeta el contrato del padre si no fortalece las precondiciones, no debilita las postcondiciones y conserva las invariantes.']
  ],
  cites: ['Hoare, C. A. R. (1969). An Axiomatic Basis for Computer Programming. *Communications of the ACM*, 12(10).', 'Floyd, R. (1967). Assigning Meanings to Programs. *Proceedings of Symposia in Applied Mathematics*, 19.', 'Dijkstra, E. W. (1976). *A Discipline of Programming*. Prentice Hall.', 'Gries, D. (1981). *The Science of Programming*. Springer.', 'Meyer, B. (1997). *Object-Oriented Software Construction* (2.ª ed.). Prentice Hall. Capítulo 11.'],
  project: { t: 'Programas derivados con su demostración',
    goal: 'Escribir funciones junto con su especificación y la demostración de su corrección.',
    steps: ['Escribe con precondición, postcondición, invariante y variante: búsqueda binaria, raíz entera, máximo común divisor y partición de quicksort.', 'Implementa cada una con aserciones que verifiquen el contrato en desarrollo.', 'Escribe pruebas basadas en propiedades que comprueben las postcondiciones con miles de entradas aleatorias.', 'Calcula a mano la precondición más débil de cinco fragmentos de código con asignaciones y condicionales.', 'Introduce un error sutil en una función (un < por ≤) y muestra qué parte de la demostración deja de valer.'],
    deliver: 'El código con sus contratos y demostraciones comentadas, las pruebas y el análisis del error introducido.' },
  hito: ['Agrega contratos (precondiciones, postcondiciones e invariantes verificados con aserciones) a las operaciones de PatioApp: ingresar, entregar y cobrar.', 'Demuestra con un invariante, en el README, que el cobro total y las unidades en patio nunca son negativos.']
});

S('for', 'for.verif', { title: 'Verificación: model checking, TLA+ y Alloy',
  ask: '¿Qué concepto de verificación formal se aplica?',
  lesson: `
> **La idea en simple.** Las pruebas revisan algunos caminos de tu programa. Un verificador de modelos revisa **todos** los caminos de un modelo del sistema, incluidos los intercalados raros entre procesos concurrentes que ninguna prueba encontraría. Si existe un error, devuelve la secuencia exacta de pasos que lo produce.

## Verificación de modelos
Edmund Clarke y E. Allen Emerson (1981) y, de forma independiente, Jean-Pierre Queille y Joseph Sifakis (1982) propusieron el **model checking**: describir el sistema como un conjunto de estados y transiciones, describir la propiedad deseada en **lógica temporal**, y explorar automáticamente todos los estados alcanzables. Los tres recibieron el Premio Turing en 2007. La lógica temporal para programas la había introducido Amir Pnueli en 1977 (Premio Turing 1996), con operadores como "siempre" y "alguna vez".

## Seguridad y vivacidad
Leslie Lamport distinguió en 1977 dos tipos de propiedades:
- **Seguridad** (*safety*): "nunca ocurre algo malo". Dos revisores nunca tienen la misma unidad; el saldo nunca es negativo. Si se viola, hay una secuencia finita de pasos que lo muestra.
- **Vivacidad** (*liveness*): "algo bueno terminará ocurriendo". Toda unidad pagada termina entregada; todo proceso que pide el recurso termina obteniéndolo. Su violación es una ejecución infinita (por ejemplo, alguien que espera para siempre).

## La explosión del espacio de estados
El gran enemigo es el tamaño: dos procesos de 10 pasos cada uno se pueden intercalar de C(20, 10) = 184 756 formas; con más procesos y variables, el número crece de forma exponencial. Las herramientas usan técnicas como reducción por orden parcial, representaciones simbólicas (diagramas de decisión binarios) y abstracción. En la práctica se verifican **modelos pequeños** del diseño, no el código completo.

## Un verificador de juguete
~~~js
// Dos revisores reservan con "leer y luego escribir" (sin operación atómica). ¿Puede asignarse dos veces?
function explorar() {
  const inicio = { pc: [0, 0], libre: true, vistoLibre: [false, false], reservas: 0 };
  const vistos = new Set(), cola = [inicio];
  while (cola.length) {
    const s = cola.shift(), k = JSON.stringify(s);
    if (vistos.has(k)) continue; vistos.add(k);
    if (s.reservas > 1) return 'CONTRAEJEMPLO: dos reservas de la misma unidad, ' + vistos.size + ' estados explorados';
    for (const p of [0, 1]) {
      const n = JSON.parse(k);
      if (n.pc[p] === 0) { n.vistoLibre[p] = n.libre; n.pc[p] = 1; }            // paso 1: leer
      else if (n.pc[p] === 1) { if (n.vistoLibre[p]) { n.libre = false; n.reservas++; } n.pc[p] = 2; } // paso 2: escribir
      else continue;
      cola.push(n);
    }
  }
  return 'Propiedad verificada en ' + vistos.size + ' estados';
}
console.log(explorar());
~~~
El explorador encuentra el intercalado en que ambos leen "libre" antes de que cualquiera escriba: la misma condición de carrera que viste en concurrencia, ahora **demostrada** en lugar de esperar a que aparezca en producción. Si reemplazas los dos pasos por uno atómico, el explorador recorre todos los estados y confirma que la propiedad se cumple.

## TLA+: especificar sistemas
Leslie Lamport creó **TLA+** (*Temporal Logic of Actions*) y lo presentó en *Specifying Systems* (2002). Una especificación describe el estado inicial y las acciones posibles con matemática simple (conjuntos y funciones); el verificador TLC explora los estados y busca violaciones de invariantes y de propiedades temporales. En 2015, Chris Newcombe y sus colegas publicaron *How Amazon Web Services Uses Formal Methods*: los ingenieros de AWS usaron TLA+ en el diseño de DynamoDB, S3 y otros sistemas y encontraron errores sutiles que requerían secuencias de más de 30 pasos, imposibles de hallar con pruebas o revisiones. Concluyeron que especificar formalmente también mejoraba la comprensión del diseño.

## Alloy y la hipótesis del alcance pequeño
Daniel Jackson, del MIT, creó **Alloy** y lo presentó en *Software Abstractions* (2006; 2.ª ed., 2012). Alloy modela estructuras (relaciones entre entidades) y busca contraejemplos en todos los casos hasta un tamaño dado. Se apoya en la **hipótesis del alcance pequeño**: la mayoría de los errores de diseño tienen un contraejemplo pequeño. Probar exhaustivamente todos los casos con hasta 4 unidades y 3 revisores encuentra más errores que probar unos pocos casos grandes.

## Demostrar programas completos
Los **asistentes de demostración** (Coq, hoy llamado Rocq; Isabelle; Lean) permiten escribir demostraciones que una computadora verifica paso a paso. Dos hitos:
- **CompCert** (Xavier Leroy, 2009): un compilador de C con demostración formal de que el código generado se comporta como el fuente. Cuando el proyecto Csmith (Yang y otros, 2011) generó millones de programas aleatorios y encontró cientos de errores en GCC y LLVM, no encontró ninguno en las partes verificadas de CompCert.
- **seL4** (Klein y otros, 2009): un micronúcleo de sistema operativo con demostración de que su implementación en C cumple su especificación.
En un punto intermedio está el **análisis estático por interpretación abstracta** (Patrick y Radhia Cousot, 1977): la herramienta Astrée demostró la ausencia de ciertos errores de ejecución en el software de control de vuelo del Airbus A380. Y la línea 14 del metro de París, automática desde 1998, se desarrolló con el método B, con su lógica de control demostrada formalmente.

## Cuándo vale la pena
Los métodos formales cuestan tiempo y formación. Rinden más en: algoritmos concurrentes y distribuidos, protocolos, sistemas críticos para la seguridad de personas (aviación con la norma DO-178C, ferrocarriles, dispositivos médicos), criptografía y componentes centrales que miles de sistemas reutilizan. Para el resto, la versión **ligera** (máquinas de estados explícitas, contratos, pruebas basadas en propiedades y un modelo pequeño de la parte concurrente) da gran parte del beneficio con poco costo.`,
  links: [['m8.conc', 'los intercalados que explora un verificador son las condiciones de carrera de la concurrencia'], ['m13.dist', 'los algoritmos de consenso se especifican y verifican con TLA+'], ['teo.turing', 'por la indecidibilidad se verifican modelos finitos o propiedades acotadas']],
  read: 'Lamport, *Specifying Systems*; Jackson, *Software Abstractions*; Newcombe y otros (2015); Clarke, Grumberg y Peled, *Model Checking*.',
  terms: [
    ['Verificación de modelos', 'técnica que explora automáticamente todos los estados alcanzables de un modelo para comprobar una propiedad', ['Encuentras el intercalado exacto en que dos revisores reservan la misma unidad.', 'Clarke, Emerson y Sifakis recibieron el Premio Turing por ella.', 'Devuelve un contraejemplo si la propiedad falla.']],
    ['Explosión del espacio de estados', 'crecimiento exponencial de los estados a explorar al agregar procesos o variables', ['Dos procesos de 10 pasos se intercalan de 184 756 formas.', 'Obliga a verificar modelos pequeños del diseño.', 'Se combate con abstracción y reducciones.']],
    ['Propiedad de seguridad', 'propiedad que afirma que algo malo nunca ocurre', ['Nunca hay dos reservas de la misma unidad.', 'El saldo nunca es negativo.', 'Su violación se muestra con una secuencia finita de pasos.']],
    ['Propiedad de vivacidad', 'propiedad que afirma que algo bueno terminará ocurriendo', ['Toda unidad pagada termina siendo entregada.', 'Todo proceso que pide un recurso lo obtiene alguna vez.', 'Se viola con una ejecución infinita.']],
    ['Lógica temporal', 'lógica con operadores como "siempre" y "alguna vez" para describir el comportamiento en el tiempo', ['Escribes "siempre, reservas ≤ 1".', 'Escribes "si se paga, alguna vez se entrega".', 'Pnueli la introdujo para programas en 1977.']],
    ['TLA+', 'lenguaje de especificación de Lamport basado en matemática y lógica temporal, con un verificador de modelos', ['AWS lo usó para encontrar errores en el diseño de DynamoDB.', 'Especificas un algoritmo de consenso antes de programarlo.', 'El verificador TLC explora los estados de la especificación.']],
    ['Hipótesis del alcance pequeño', 'idea de que la mayoría de los errores de diseño tienen un contraejemplo pequeño', ['Alloy prueba todos los casos con hasta 4 unidades y encuentra el error.', 'Explorar exhaustivamente casos chicos rinde más que probar pocos casos grandes.', 'Daniel Jackson la formuló al crear Alloy.']],
    ['Asistente de demostración', 'herramienta que verifica paso a paso demostraciones formales escritas por personas', ['CompCert se demostró con Coq.', 'Lean se usa para formalizar matemática y software.', 'seL4 se verificó con Isabelle.']]
  ],
  q: [
    ['"Nunca dos revisores tienen asignada la misma unidad" es una propiedad de:', 'Seguridad', ['Vivacidad', 'Rendimiento', 'Usabilidad'], 'Afirma que algo malo nunca ocurre.', 2],
    ['"Toda solicitud recibe respuesta alguna vez" es una propiedad de:', 'Vivacidad', ['Seguridad', 'Consistencia', 'Disponibilidad numérica'], 'Afirma que algo bueno termina ocurriendo.', 2],
    ['¿Qué encontraron los ingenieros de AWS al usar TLA+?', 'Errores de diseño sutiles que requerían secuencias largas de pasos', ['Que TLA+ no sirve para sistemas reales', 'Errores de sintaxis en su código', 'Que las pruebas eran suficientes'], 'Newcombe y otros (2015) lo documentaron en Communications of the ACM.', 3],
    ['¿Qué dice la hipótesis del alcance pequeño?', 'La mayoría de los errores de diseño tienen un contraejemplo pequeño', ['Los sistemas pequeños no tienen errores', 'Solo hay que verificar el código más corto', 'Basta con probar un caso'], 'Por eso Alloy explora exhaustivamente casos de tamaño acotado.', 3],
    ['¿Por qué se verifican modelos del diseño y no siempre el código completo?', 'Por la explosión del espacio de estados y porque el diseño concentra los errores más costosos', ['Porque el código no tiene errores', 'Porque los verificadores no leen código', 'Porque es más rápido de escribir'], 'Un modelo pequeño captura la lógica esencial con un espacio de estados manejable.', 4],
    { tf: 'Un verificador de modelos que encuentra una violación de una propiedad de seguridad devuelve una secuencia finita de pasos que la produce.', v: true, e: 'Es el contraejemplo, muy útil para depurar.', l: 2 },
    { tf: 'Si un programa pasa 10 000 pruebas, está verificado formalmente.', v: false, e: 'Las pruebas revisan casos; la verificación formal razona sobre todos los casos del modelo.', l: 2 },
    { i: '¿De cuántas formas se pueden intercalar dos procesos de 3 pasos cada uno?', a: 20, e: 'C(6, 3) = 20.', l: 3 },
    { c: 'Escribe «intercalados(a, b)»: cantidad de formas de intercalar dos procesos de a y b pasos, C(a + b, a).', f: 'intercalados', p: ['a', 'b'], t: [[[3, 3], 20], [[10, 10], 184756], [[0, 5], 1], [[2, 1], 3]], sol: '  let r = 1;\n  for (let i = 1; i <= a; i++) r = r * (b + i) / i;\n  return Math.round(r);', h: 'C(a+b, a) se puede calcular multiplicando (b + i)/i para i de 1 a a.', l: 3 },
    { c: 'Escribe «alcanzables(grafo, inicio)»: cantidad de estados alcanzables desde inicio en un grafo dado como {estado: [siguientes]} (incluye el inicio).', f: 'alcanzables', p: ['grafo', 'inicio'], t: [[[{ a: ['b', 'c'], b: ['d'], c: ['d'], d: [] }, 'a'], 4], [[{ a: ['b'], b: ['a'], c: ['a'] }, 'a'], 2], [[{ x: [] }, 'x'], 1]], sol: '  const vistos = new Set([inicio]), cola = [inicio];\n  while (cola.length) {\n    const s = cola.shift();\n    for (const t of grafo[s] || []) if (!vistos.has(t)) { vistos.add(t); cola.push(t); }\n  }\n  return vistos.size;', h: 'Un BFS con un conjunto de visitados es el núcleo de cualquier verificador de modelos explícito.', l: 3 }
  ],
  gen: function (g) {
    function C(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
    g.times(8, function (R) { var a = R.int(2, 8), b = R.int(2, 8); g.input(3, '¿De cuántas formas se intercalan dos procesos de ' + a + ' y ' + b + ' pasos?', C(a + b, a), 'C(' + (a + b) + ', ' + a + ') = ' + C(a + b, a) + '.'); });
    var props = [['Nunca hay más unidades asignadas que revisores', 'Seguridad'], ['Toda unidad pagada termina entregada', 'Vivacidad'], ['El saldo nunca es negativo', 'Seguridad'], ['Todo mensaje enviado termina procesado', 'Vivacidad'], ['Dos procesos nunca están a la vez en la sección crítica', 'Seguridad'], ['Todo proceso que pide entrar a la sección crítica termina entrando', 'Vivacidad'], ['Una transacción confirmada nunca se pierde', 'Seguridad'], ['El sistema termina eligiendo un líder', 'Vivacidad']];
    props.forEach(function (p) { g.mcq(3, '¿Qué tipo de propiedad es? ' + p[0], p[1], [p[1] === 'Seguridad' ? 'Vivacidad' : 'Seguridad', 'De rendimiento', 'De usabilidad'], p[1] === 'Seguridad' ? 'Afirma que algo malo nunca ocurre.' : 'Afirma que algo bueno termina ocurriendo.'); });
    g.times(5, function (R) { var v = R.int(2, 5), k = R.int(2, 6); g.input(3, 'Un modelo tiene ' + v + ' variables independientes y cada una puede tomar ' + k + ' valores. ¿Cuántos estados posibles hay como máximo?', Math.pow(k, v), k + '^' + v + ' = ' + Math.pow(k, v) + '.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre probar y verificar con un model checker?', 'Las pruebas ejecutan algunos casos; el verificador explora todos los estados alcanzables del modelo y, si hay un error, entrega el contraejemplo.'],
    ['Distingue seguridad de vivacidad con un ejemplo de PatioApp.', 'Seguridad: nunca se asigna la misma unidad a dos revisores. Vivacidad: toda unidad pagada termina entregada.'],
    ['¿Por qué el explorador de juguete encuentra la condición de carrera y las pruebas normales a veces no?', 'Porque recorre todos los intercalados posibles, incluido el raro en que ambos leen antes de que alguno escriba, mientras que una prueba depende de la sincronización real.'],
    ['¿Qué lección dejó la experiencia de AWS con TLA+?', 'Que especificar y verificar el diseño encuentra errores sutiles de sistemas distribuidos que ni las pruebas ni las revisiones detectan, y mejora la comprensión del sistema.'],
    ['¿Cuándo justificarías el costo de métodos formales en un proyecto?', 'En algoritmos concurrentes o distribuidos, protocolos, sistemas críticos para personas, criptografía y componentes centrales muy reutilizados; en el resto, conviene la versión ligera.']
  ],
  cites: ['Clarke, E. y Emerson, E. A. (1981). Design and Synthesis of Synchronization Skeletons Using Branching Time Temporal Logic. *Logics of Programs Workshop*.', 'Pnueli, A. (1977). The Temporal Logic of Programs. *18th Annual Symposium on Foundations of Computer Science*.', 'Lamport, L. (2002). *Specifying Systems: The TLA+ Language and Tools for Hardware and Software Engineers*. Addison-Wesley.', 'Jackson, D. (2012). *Software Abstractions: Logic, Language, and Analysis* (2.ª ed.). MIT Press.', 'Newcombe, C. et al. (2015). How Amazon Web Services Uses Formal Methods. *Communications of the ACM*, 58(4).', 'Leroy, X. (2009). Formal Verification of a Realistic Compiler. *Communications of the ACM*, 52(7).'],
  project: { t: 'Verificar un protocolo de exclusión mutua',
    goal: 'Construir un verificador de modelos explícito y usarlo con algoritmos concurrentes clásicos.',
    steps: ['Generaliza el explorador del tema: estados como objetos, acciones por proceso y una función de invariante.', 'Modela un cerrojo ingenuo de "leer y escribir" y obtén el contraejemplo de exclusión mutua.', 'Modela el algoritmo de Peterson (1981) para dos procesos y verifica que nunca están ambos en la sección crítica.', 'Agrega la detección de interbloqueos (estados sin acciones posibles que no son finales).', 'Opcional: escribe el modelo de Peterson en TLA+ con PlusCal y verifícalo con TLC.'],
    deliver: 'El verificador, los modelos, los contraejemplos encontrados y la comparación con la versión en TLA+ si la hiciste.' },
  hito: ['Modela la reserva concurrente de unidades de PatioApp y explora todos los intercalados de dos o tres revisores para demostrar que nunca se asigna la misma unidad dos veces con la versión atómica.', 'Muestra el contraejemplo que aparece con la versión ingenua y guárdalo como prueba de regresión.']
});
})();
