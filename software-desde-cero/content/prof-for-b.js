(function () {
var S = SDC.S;

S('for', 'for.spec', { title: 'Especificación basada en modelos y refinamiento',
  ask: '¿Qué concepto de especificación formal o refinamiento se aplica?',
  lesson: `
> **La idea en simple.** Antes de construir un puente, los ingenieros calculan en el papel que soportará el peso; no lo construyen para ver si se cae. La especificación formal hace lo mismo con el software: describe con matemática precisa **qué** debe hacer el sistema, antes de decidir **cómo**, y luego se baja de esa descripción abstracta al código en pasos pequeños, demostrando en cada paso que no se rompió nada.

## Especificar es pensar
Leslie Lamport insiste en que escribir una especificación formal es, sobre todo, una forma de **pensar con claridad**: obliga a decidir qué pasa en cada caso, y muchas veces los errores se encuentran al escribir, antes de verificar nada. Una especificación responde qué estados puede tener el sistema, qué operaciones hay, qué condiciones deben cumplirse antes de cada operación (precondiciones) y qué cambia después (poscondiciones), y qué debe ser siempre cierto (invariantes). A diferencia del lenguaje natural, una especificación formal **no admite dos lecturas**, y se puede analizar con herramientas.

## Especificación basada en modelos
En los métodos **basados en modelos**, el estado del sistema se describe con objetos matemáticos (conjuntos, relaciones, funciones, secuencias) y cada operación como una relación entre el estado antes y el estado después. Los principales:
- **Z** (pronunciado "zed"): creado en la Universidad de Oxford a fines de los setenta a partir de una idea de Jean-Raymond Abrial, con la teoría de conjuntos y la lógica de predicados como base. Organiza la especificación en **esquemas** (cajas con declaraciones y predicados). Fue norma ISO/IEC 13568 en 2002.
- **VDM** (*Vienna Development Method*): desarrollado en el laboratorio de IBM en Viena en los años setenta, con un lenguaje de especificación (VDM-SL) y reglas para demostrar el refinamiento.
- **B** y **Event-B**: también de Abrial (método B en 1996, Event-B hacia 2010), con un fuerte énfasis en el **refinamiento** demostrado con herramientas (Atelier B, Rodin).
- **Alloy** (Daniel Jackson, MIT, 2002), que viste en Verificación, con un lenguaje relacional pensado para el análisis automático.
- **TLA+** (Lamport, 1999), centrado en sistemas concurrentes y distribuidos.

## Un esquema de ejemplo
La asignación de espacios de PatioApp, al estilo de Z (escrito en texto plano):
~~~txt
Estado
  libres, ocupados : conjunto de Espacio
  ubicacion : Unidad ⇸ Espacio            (función parcial: cada unidad, a lo sumo un espacio)
  invariantes:
    libres ∩ ocupados = ∅
    ocupados = rango(ubicacion)
    ubicacion es inyectiva                  (dos unidades no comparten espacio)

Asignar(u?: Unidad, e?: Espacio)
  pre:  u? ∉ dominio(ubicacion)  ∧  e? ∈ libres
  post: ubicacion' = ubicacion ∪ {u? ↦ e?}
        libres'    = libres \\ {e?}
        ocupados'  = ocupados ∪ {e?}
~~~
Las variables con apóstrofe son el estado **después**; el signo de interrogación marca las entradas. A partir de este texto se pueden **demostrar** propiedades: por ejemplo, que si el estado cumple los invariantes y se cumple la precondición, el estado después también los cumple (la operación **preserva** los invariantes). Si alguien olvidara la precondición «e? ∈ libres», la demostración fallaría, señalando el error de diseño antes de programar.

## Leer una especificación en voz alta
Una buena práctica es "traducir" cada línea de la especificación a lenguaje natural y revisarla con quien conoce el negocio: "la función ubicacion es inyectiva" se lee "no puede haber dos unidades en el mismo espacio"; "libres ∩ ocupados = ∅" se lee "ningún espacio está a la vez libre y ocupado". Si la persona de negocio dice "en realidad, un espacio grande puede tener dos autos pequeños", se descubrió un requisito que la especificación contradecía, y es mucho más barato descubrirlo así que en producción. Esta revisión conjunta valida la especificación, algo que ninguna demostración puede hacer, porque una demostración solo garantiza que el código cumple lo especificado.

## Especificaciones ejecutables
Una crítica habitual es que las especificaciones formales no se pueden "probar" con datos como un programa. Hay herramientas que lo resuelven parcialmente: **animadores** de especificaciones (ProB para B y Event-B, que también hace verificación de modelos), el analizador de Alloy, que genera instancias de ejemplo, y el uso de la especificación como **oráculo** de pruebas: una implementación de referencia lenta y obvia, escrita casi literalmente desde la especificación, contra la que se compara la implementación real en miles de casos aleatorios.

Así la especificación deja de ser un documento que se archiva y se convierte en una herramienta que se ejecuta todos los días.

## Refinamiento
El **refinamiento** es el proceso de pasar de una especificación abstracta a una implementación concreta en pasos, cada uno demostrado correcto. La idea viene de Niklaus Wirth (*Program Development by Stepwise Refinement*, 1971) y fue formalizada por Ralph-Johan Back, Carroll Morgan y otros en el **cálculo de refinamiento**. Hay dos tipos:
- **Refinamiento de datos:** reemplazar estructuras abstractas por concretas. El conjunto «libres» se implementa como un arreglo de booleanos indexado por espacio, o como una lista enlazada. Se define una **relación de abstracción** (cómo se ve el estado abstracto desde el concreto) y se demuestra que cada operación concreta hace "lo mismo" que la abstracta a través de esa relación.
- **Refinamiento de operaciones:** reemplazar una especificación ("elegir cualquier espacio libre") por un algoritmo concreto ("el de menor número en la zona del tipo de vehículo"). El refinamiento puede **reducir el no determinismo** (elegir una entre varias opciones permitidas) y **debilitar la precondición** (aceptar más casos), pero nunca hacer algo que la especificación prohíbe.
Si cada paso está demostrado, el código final es correcto respecto de la especificación inicial **por construcción**.

## Casos reales
- **Línea 14 del metro de París (1998):** el software del sistema de control automático de trenes sin conductor (proyecto Météor) se desarrolló con el método B, con unas 86 000 líneas de especificación y decenas de miles de obligaciones de prueba demostradas; no se encontraron errores en el código generado durante las pruebas ni en los primeros años de operación. El método B se usó luego en sistemas ferroviarios de muchas ciudades.
- **CICS de IBM (1980s):** partes del monitor de transacciones CICS se reespecificaron en Z junto con la Universidad de Oxford; el proyecto recibió el Premio de la Reina a la innovación tecnológica en 1992, con reportes de menos defectos en las partes especificadas formalmente.
- **Tokeneer (2008):** un sistema de control de acceso biométrico desarrollado por Altran para la NSA con Z y SPARK Ada, publicado como ejemplo abierto, con una tasa de defectos muy baja.

## Cuándo vale la pena
La especificación formal completa es cara y exige formación. Se justifica en sistemas **críticos para la seguridad** (ferrocarriles, aviación, dispositivos médicos, centrales nucleares), en **protocolos** concurrentes y distribuidos, en **núcleos** de seguridad y en componentes donde un error cuesta muchísimo. Para el resto, hay un camino intermedio muy rentable: especificar **formalmente solo la parte más delicada** (el protocolo de asignación, el cálculo de tarifas con convenios), escribir **invariantes** y **contratos** aunque no se demuestren, y usar herramientas **automáticas** (Alloy, TLA+, pruebas basadas en propiedades) que dan mucha de la confianza a una fracción del costo. Es lo que Daniel Jackson llama **métodos formales ligeros**.

## Ejemplo resuelto: refinar la elección de espacio
1. **Especificación abstracta:** «Asignar» elige **cualquier** e? ∈ libres (no determinista).
2. **Primer refinamiento:** se agrega que el espacio debe ser compatible con el tipo de unidad: e? ∈ libres ∩ compatibles(tipo(u?)). La precondición incluye ahora que esa intersección no sea vacía. Se demuestra que sigue preservando los invariantes.
3. **Segundo refinamiento (datos):** «libres» se representa como un mapa de zonas a pilas de espacios libres; la relación de abstracción dice que «libres» es la unión de todas las pilas. Se demuestra que sacar el tope de la pila de la zona compatible corresponde a elegir un elemento de «libres ∩ compatibles».
4. **Implementación:** el código hace exactamente lo del segundo refinamiento. Las pruebas basadas en propiedades verifican, sobre miles de secuencias aleatorias de operaciones, que los invariantes de la especificación abstracta se cumplen en todo momento, aplicando la relación de abstracción.`,
  links: [['for.contract', 'las precondiciones y poscondiciones son contratos'], ['for.verif', 'Alloy y TLA+ analizan especificaciones automáticamente'], ['m2.sets', 'los modelos se escriben con conjuntos, relaciones y funciones']],
  read: 'Spivey, *The Z Notation: A Reference Manual* (2.ª ed., 1992, libre en línea); Abrial, *Modeling in Event-B* (2010); Wirth (1971); Jackson, *Software Abstractions* (2.ª ed., 2012).',
  terms: [
    ['Especificación formal', 'descripción matemática precisa de lo que debe hacer un sistema', ['No admite dos lecturas.', 'Se puede analizar con herramientas.', 'Describe el qué, no el cómo.']],
    ['Especificación basada en modelos', 'especificación que describe el estado con objetos matemáticos y las operaciones como relaciones entre estados', ['Z, VDM, B.', 'Conjuntos y funciones.', 'Estado antes y después.']],
    ['Esquema de Z', 'caja que agrupa declaraciones y predicados en una especificación Z', ['Estado y operaciones.', 'Apóstrofe para el después.', 'Oxford.']],
    ['Preservación del invariante', 'propiedad de que una operación lleva de un estado válido a otro estado válido', ['Se demuestra para cada operación.', 'Revela precondiciones faltantes.', 'Base del razonamiento.']],
    ['Refinamiento', 'paso de una especificación abstracta a una más concreta demostrando que se conserva la corrección', ['Wirth, 1971.', 'De datos y de operaciones.', 'Correcto por construcción.']],
    ['Relación de abstracción', 'correspondencia que indica qué estado abstracto representa cada estado concreto', ['Las pilas por zona representan el conjunto de libres.', 'Base del refinamiento de datos.', 'También llamada relación de acoplamiento.']],
    ['Método B', 'método formal de Abrial con especificación y refinamiento demostrado por herramientas', ['Línea 14 del metro de París.', 'Atelier B.', 'Event-B y Rodin.']],
    ['Métodos formales ligeros', 'uso parcial y automático de métodos formales en las partes más delicadas', ['Daniel Jackson.', 'Alloy, TLA+.', 'Gran parte del beneficio a menor costo.']]
  ],
  q: [
    ['¿Qué describe una especificación formal?', 'Qué debe hacer el sistema, de forma matemática y sin ambigüedad', ['Cómo está escrito el código línea por línea', 'El diseño visual', 'El presupuesto'], 'El qué, no el cómo.', 1],
    ['En la notación de Z, ¿qué indica ubicacion′?', 'El valor de ubicacion después de la operación', ['La derivada de ubicacion', 'Una entrada', 'Un error'], 'El apóstrofe marca el estado posterior.', 2],
    ['¿Qué se demuestra para saber que una operación preserva el invariante?', 'Que si el estado antes cumple el invariante y la precondición, el estado después también cumple el invariante', ['Que la operación es rápida', 'Que nunca se llama', 'Que el invariante es falso'], 'Preservación del invariante.', 3],
    ['¿Qué puede hacer un paso de refinamiento?', 'Reducir el no determinismo y debilitar la precondición, sin hacer nada que la especificación prohíba', ['Agregar comportamientos prohibidos', 'Fortalecer la precondición siempre', 'Cambiar la especificación sin justificar'], 'Así se conserva la corrección.', 4],
    ['¿Qué sistema famoso se desarrolló con el método B?', 'El control de trenes sin conductor de la línea 14 del metro de París', ['El sistema operativo Windows', 'El navegador Chrome', 'El algoritmo PageRank'], 'Proyecto Météor, 1998.', 2],
    ['¿Qué es la relación de abstracción en el refinamiento de datos?', 'La correspondencia entre estados concretos y los abstractos que representan', ['Una tabla de la base de datos', 'Un tipo de herencia', 'Un algoritmo de ordenamiento'], 'Las pilas por zona representan el conjunto de libres.', 3],
    ['¿Qué proponen los métodos formales ligeros?', 'Aplicar especificación y análisis automático solo a las partes más delicadas', ['No especificar nunca', 'Demostrar todo el sistema a mano', 'Reemplazar las pruebas por documentos'], 'Daniel Jackson.', 2],
    { tf: 'Escribir una especificación formal puede revelar errores de diseño antes de verificar nada.', v: true, e: 'Obliga a decidir qué pasa en cada caso.', l: 1 },
    { tf: 'El refinamiento permite que la implementación haga cosas que la especificación prohíbe si son más eficientes.', v: false, e: 'Nunca se permite violar la especificación.', l: 2 },
    { c: 'Escribe «invariante(estado)»: estado es {libres, ubicacion} con libres como lista de espacios y ubicacion como objeto {unidad: espacio}. Devuelve true si ningún espacio ocupado está en libres y ningún espacio aparece dos veces en ubicacion.', f: 'invariante', p: ['estado'], t: [[[{ libres: ['B1', 'B2'], ubicacion: { u1: 'B3', u2: 'B4' } }], true], [[{ libres: ['B1'], ubicacion: { u1: 'B1' } }], false], [[{ libres: [], ubicacion: { u1: 'B3', u2: 'B3' } }], false]], sol: '  const occ = Object.values(estado.ubicacion);\n  return new Set(occ).size === occ.length && occ.every(e => !estado.libres.includes(e));', l: 3 },
    { c: 'Escribe «asignar(estado, u, e)»: si u no tiene espacio y e está libre, devuelve el estado nuevo (sin modificar el original); si no se cumple la precondición, devuelve null.', f: 'asignar', p: ['estado', 'u', 'e'], t: [[[{ libres: ['B1', 'B2'], ubicacion: {} }, 'u1', 'B1'], { libres: ['B2'], ubicacion: { u1: 'B1' } }], [[{ libres: ['B2'], ubicacion: { u1: 'B1' } }, 'u1', 'B2'], null], [[{ libres: ['B2'], ubicacion: {} }, 'u1', 'B9'], null]], sol: '  if (u in estado.ubicacion || !estado.libres.includes(e)) return null;\n  return { libres: estado.libres.filter(x => x !== e), ubicacion: { ...estado.ubicacion, [u]: e } };', l: 3 },
    { c: 'Escribe «abstraer(pilas)»: pilas es un objeto {zona: [espacios libres]}; devuelve el conjunto abstracto de libres como lista ordenada (la relación de abstracción).', f: 'abstraer', p: ['pilas'], t: [[[{ A: ['A2', 'A1'], B: ['B1'] }], ['A1', 'A2', 'B1']], [[{}], []]], sol: '  return Object.values(pilas).flat().sort();', l: 2 }
  ],
  gen: function (g) {
    var me = [['Esquemas con conjuntos y predicados, de Oxford', 'Z'], ['Refinamiento demostrado con Atelier B en sistemas ferroviarios', 'Método B'], ['Lenguaje relacional con análisis automático acotado del MIT', 'Alloy'], ['Especificación de sistemas concurrentes de Lamport', 'TLA+'], ['Método del laboratorio de IBM en Viena', 'VDM']];
    me.forEach(function (m) { g.mcq(2, '¿Qué método formal es? ' + m[0], m[1], ['Z', 'Método B', 'Alloy', 'TLA+', 'VDM'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Métodos de especificación.'); });
    var rf = [['Reemplazar "cualquier espacio libre" por "el de menor número en la zona compatible"', 'Refinamiento de operaciones'], ['Representar el conjunto de libres como pilas por zona', 'Refinamiento de datos'], ['Hacer que la operación acepte también unidades sin tipo, que antes se rechazaban', 'Debilitar la precondición'], ['Permitir asignar un espacio ocupado porque es más rápido', 'No es un refinamiento válido']];
    rf.forEach(function (r) { g.mcq(3, '¿Qué tipo de paso es? ' + r[0], r[1], ['Refinamiento de operaciones', 'Refinamiento de datos', 'Debilitar la precondición', 'No es un refinamiento válido'].filter(function (x) { return x !== r[1]; }), 'El refinamiento nunca viola la especificación.'); });
    var pa = [['ubicacion′ = ubicacion ∪ {u? ↦ e?}', 'Poscondición'], ['e? ∈ libres', 'Precondición'], ['libres ∩ ocupados = ∅', 'Invariante'], ['u?: Unidad', 'Declaración de entrada']];
    pa.forEach(function (p) { g.mcq(2, 'En la especificación de Asignar, ¿qué es esto? ' + p[0], p[1], ['Poscondición', 'Precondición', 'Invariante', 'Declaración de entrada'].filter(function (x) { return x !== p[1]; }), 'Partes de una especificación basada en modelos.'); });
  },
  checks: [
    ['¿Qué ventajas tiene una especificación formal sobre una en lenguaje natural?', 'Es precisa, no admite dos lecturas, se puede analizar con herramientas y obliga a decidir cada caso.'],
    ['Escribe la precondición y la poscondición de una operación de un sistema que conozcas.', 'Por ejemplo, retirar dinero: pre saldo ≥ monto; post saldo′ = saldo − monto.'],
    ['Explica los dos tipos de refinamiento con un ejemplo.', 'De datos: cambiar un conjunto por un arreglo con una relación de abstracción; de operaciones: cambiar "cualquier libre" por un algoritmo concreto.'],
    ['¿Cuándo conviene la especificación formal completa y cuándo los métodos ligeros?', 'La completa en sistemas críticos; los ligeros en las partes delicadas de sistemas comunes, con herramientas automáticas.']
  ],
  cites: ['Spivey, J. M. (1992). *The Z Notation: A Reference Manual* (2.ª ed.). Prentice Hall.', 'Abrial, J.-R. (1996). *The B-Book: Assigning Programs to Meanings*. Cambridge University Press.', 'Wirth, N. (1971). Program Development by Stepwise Refinement. *Communications of the ACM*, 14(4).', 'Behm, P., Benoit, P., Faivre, A. y Meynadier, J.-M. (1999). Météor: A Successful Application of B in a Large Project. *FM’99*, LNCS 1708.', 'Jackson, D. (2012). *Software Abstractions: Logic, Language, and Analysis* (2.ª ed.). MIT Press.', 'Woodcock, J. et al. (2009). Formal Methods: Practice and Experience. *ACM Computing Surveys*, 41(4).'],
  project: { t: 'Especificar y refinar un componente',
    goal: 'Escribir la especificación formal de un componente y llevarla a código por refinamiento.',
    steps: ['Elige un componente pequeño con estado (una reserva, un inventario, una cola de turnos) y escribe su especificación al estilo de Z: estado, invariantes y operaciones con pre y poscondiciones.', 'Demuestra a mano que cada operación preserva los invariantes.', 'Haz un refinamiento de datos con una relación de abstracción explícita.', 'Implementa el componente y escribe pruebas basadas en propiedades que verifiquen los invariantes abstractos en secuencias aleatorias de operaciones.', 'Modela el componente en Alloy o TLA+ y compara lo que encuentra la herramienta con tus demostraciones.'],
    deliver: 'La especificación, las demostraciones, el código, las pruebas y el modelo.' },
  hito: ['Escribe la especificación formal de la asignación de espacios de PatioApp con estado, invariantes y operaciones.', 'Implementa la asignación de PatioApp como refinamiento con pilas por zona y verifica los invariantes abstractos con pruebas basadas en propiedades.']
});
SDC.after('for.spec', 'for.contract');

S('for', 'for.logic', { title: 'Lógica temporal, SAT y SMT',
  ask: '¿Qué concepto de lógica temporal o de resolución automática se aplica?',
  lesson: `
> **La idea en simple.** Las afirmaciones importantes sobre los sistemas que funcionan sin parar no hablan de un instante, sino del tiempo: "**nunca** se asignan dos unidades al mismo espacio", "toda solicitud de salida **eventualmente** se atiende", "**después** de cobrar, **siempre** se emite el comprobante". La lógica temporal permite escribirlas con precisión. Y los resolvedores SAT y SMT son las máquinas que, en la práctica, buscan si esas afirmaciones se pueden violar.

## Por qué hace falta una lógica del tiempo
La lógica de predicados describe un estado; un programa concurrente o un sistema reactivo (un servidor, un controlador, un protocolo) pasa por una **secuencia infinita** de estados. Amir Pnueli propuso en 1977 usar la **lógica temporal** para razonar sobre esas secuencias, y recibió el Premio Turing en 1996 por ello. La idea: además de los conectores lógicos, se agregan operadores que hablan del futuro de la ejecución.

## LTL: lógica temporal lineal
En la **LTL**, cada ejecución es una secuencia de estados, y los operadores principales son:
| Operador | Lectura | Significado |
| G p | siempre (globally) | p es verdadero en todos los estados futuros |
| F p | eventualmente (finally) | p será verdadero en algún estado futuro |
| X p | en el siguiente (next) | p es verdadero en el próximo estado |
| p U q | p hasta q (until) | q llegará a ser verdadero, y p vale hasta entonces |
Combinándolos se expresan propiedades típicas:
- **G ¬(ocupadoPorA ∧ ocupadoPorB)**: nunca dos unidades en el mismo espacio (exclusión mutua).
- **G (solicitaSalida → F salidaRegistrada)**: toda solicitud de salida se atiende tarde o temprano.
- **G F libre**: infinitas veces habrá algún espacio libre (no se queda ocupado para siempre).
- **F G estable**: a partir de algún momento, el sistema queda estable para siempre.
- **G (cobrado → X comprobanteEmitido)**: tras cobrar, en el paso siguiente se emite el comprobante.
- **¬salida U pagado**: no hay salida hasta que se pague (y el pago llega).

## Seguridad y vivacidad
Leslie Lamport distinguió en 1977 dos clases de propiedades, y Bowen Alpern y Fred Schneider demostraron en 1985 que toda propiedad es combinación de ambas:
- Una propiedad de **seguridad** dice que "nunca pasa nada malo" (G ¬malo). Si se viola, hay un **prefijo finito** que lo muestra: un contraejemplo concreto de pocos pasos.
- Una propiedad de **vivacidad** dice que "algo bueno termina pasando" (F bueno). Su violación solo se ve en una ejecución **infinita** (por ejemplo, un ciclo en el que el bien nunca llega), y suele depender de suposiciones de **equidad** (*fairness*): que un proceso que puede avanzar no sea postergado para siempre.
La distinción importa porque las técnicas para verificar cada una son distintas, y porque un sistema que no hace nada cumple todas las propiedades de seguridad: hay que pedir vivacidad para que haga algo útil.

## CTL: lógica de árboles de cómputo
Edmund Clarke y E. Allen Emerson propusieron en 1981 la **CTL**, que ve las ejecuciones posibles como un **árbol** de ramificaciones y agrega cuantificadores sobre caminos: **A** (en todos los caminos) y **E** (existe un camino). Por ejemplo, **AG EF reinicio** dice "desde cualquier estado alcanzable, siempre existe una forma de volver al reinicio", algo que la LTL no puede expresar. Clarke, Emerson y Joseph Sifakis recibieron el Premio Turing de 2007 por la **verificación de modelos** (*model checking*), que comprueba automáticamente fórmulas CTL o LTL sobre modelos finitos.

## SAT: el problema que se volvió una herramienta
El problema **SAT** pregunta si una fórmula booleana se puede hacer verdadera. Es NP-completo (Cook, 1971), pero los resolvedores modernos son extraordinariamente eficientes en la práctica:
- El algoritmo **DPLL** (Martin Davis, George Logemann, Donald Loveland y Hilary Putnam, 1962) asigna variables, **propaga** las consecuencias obligadas (si una cláusula tiene un solo literal sin asignar y los demás son falsos, ese literal debe ser verdadero) y **retrocede** al encontrar un conflicto.
- **CDCL** (aprendizaje de cláusulas guiado por conflictos) agrega que, en cada conflicto, se analiza su causa y se **aprende** una cláusula nueva que impide repetirlo, y se retrocede de forma no cronológica. Con heurísticas de elección de variables y reinicios, resuelve fórmulas industriales de millones de variables.
Las fórmulas se escriben en **forma normal conjuntiva** (una conjunción de cláusulas, cada una una disyunción de literales), y casi cualquier problema combinatorio finito se puede codificar así: planificar turnos, resolver sudokus, configurar productos, verificar circuitos.

## SMT: SAT con teorías
Los resolvedores **SMT** (*Satisfiability Modulo Theories*) extienden SAT con **teorías**: aritmética entera y real, vectores de bits (enteros de 32 y 64 bits con desbordamiento), arreglos, cadenas, tipos de datos. Pueden responder si existen valores que hagan verdadera una fórmula como «x + y = 10 ∧ x > 7 ∧ y > 2» (no: x ≥ 8 obliga a y ≤ 2). Los más usados son **Z3** (Leonardo de Moura y Nikolaj Bjørner, Microsoft Research, 2008) y **cvc5**. Son el motor de:
- La **verificación deductiva** (Dafny, Why3, SPARK): las condiciones de corrección del programa se envían a un resolvedor SMT.
- La **ejecución simbólica** (KLEE, SAGE de Microsoft, que encontró un tercio de los errores de los analizadores de archivos de Windows 7): se buscan entradas que lleven a cada camino del programa.
- La **verificación acotada de modelos** (CBMC): se despliega el programa un número fijo de pasos y se pregunta al resolvedor si alguna ejecución viola una aserción.
- El análisis de políticas de acceso en la nube (Zelkova de AWS) y la síntesis de programas.
~~~js
// Un resolvedor SAT mínimo (DPLL con propagación unitaria) sobre cláusulas de enteros (−x es "no x")
function dpll(clausulas, asign = {}) {
  let cambio = true;
  while (cambio) {                                              // propagación unitaria
    cambio = false;
    for (const c of clausulas) {
      if (c.some(l => asign[Math.abs(l)] === (l > 0))) continue;          // cláusula satisfecha
      const libres = c.filter(l => asign[Math.abs(l)] === undefined);
      if (libres.length === 0) return null;                               // conflicto
      if (libres.length === 1) { asign = { ...asign, [Math.abs(libres[0])]: libres[0] > 0 }; cambio = true; }
    }
  }
  const v = clausulas.flat().map(Math.abs).find(x => asign[x] === undefined);
  if (v === undefined) return asign;
  return dpll(clausulas, { ...asign, [v]: true }) || dpll(clausulas, { ...asign, [v]: false });
}
// 1: A en B-14, 2: B en B-14, 3: A en B-15. A ocupa algún espacio; B debe ir a B-14; no dos en B-14.
console.log(dpll([[1, 3], [2], [-1, -2]]));
~~~

## Del modelo al código
Las propiedades temporales no solo se verifican sobre modelos. En **verificación en tiempo de ejecución** (*runtime verification*), un monitor generado a partir de una fórmula LTL observa los eventos del sistema real y alerta en cuanto una propiedad de seguridad se viola, o cuando una de vivacidad lleva demasiado tiempo sin cumplirse.

## Ejemplo resuelto: propiedades temporales de la salida en PatioApp
El protocolo de salida tiene los estados: solicitada, cobrando, cobrada, comprobante emitido, liberada.
1. **Seguridad:** G (liberada → cobrada_antes), escrito como «¬liberada U cobrada»: nunca se libera el espacio antes de cobrar.
2. **Seguridad:** G ¬(dos salidas activas para la misma unidad).
3. **Vivacidad con equidad:** G (solicitada → F liberada), suponiendo que la pasarela de pago eventualmente responde (equidad débil). Sin esa suposición, la propiedad es falsa: si la pasarela nunca responde, la salida queda pendiente para siempre, y el verificador lo mostraría con un ciclo.
4. Esto lleva a una decisión de diseño: agregar un tiempo de espera que, si la pasarela no responde, pase al cobro en efectivo. Con ese cambio, la vivacidad se cumple **sin** suponer nada sobre la pasarela, que es lo que se quiere en producción.
5. La propiedad 2 se verifica además con un resolvedor SMT sobre el código de la consulta de base de datos que reserva la salida, buscando una combinación de entradas que permita dos reservas simultáneas: el resolvedor responde "insatisfacible".`,
  links: [['for.verif', 'la verificación de modelos comprueba fórmulas de lógica temporal'], ['teo.np', 'SAT es el primer problema NP-completo'], ['m2.prop', 'la lógica proposicional es la base de SAT']],
  read: 'Baier y Katoen, *Principles of Model Checking* (2008); Pnueli (1977); Biere y otros (eds.), *Handbook of Satisfiability* (2.ª ed., 2021); Kroening y Strichman, *Decision Procedures* (2.ª ed., 2016).',
  terms: [
    ['Lógica temporal lineal', 'lógica que razona sobre secuencias de estados con operadores como siempre, eventualmente, siguiente y hasta', ['LTL.', 'Pnueli, 1977.', 'G, F, X, U.']],
    ['Operador G', 'operador temporal que afirma que algo vale en todos los estados futuros', ['Siempre.', 'G ¬colisión.', 'Propiedades de seguridad.']],
    ['Operador F', 'operador temporal que afirma que algo valdrá en algún estado futuro', ['Eventualmente.', 'F atendida.', 'Propiedades de vivacidad.']],
    ['Propiedad de seguridad', 'propiedad que afirma que nunca ocurre nada malo; su violación tiene un contraejemplo finito', ['Exclusión mutua.', 'Lamport, 1977.', 'Un sistema inactivo las cumple.']],
    ['Propiedad de vivacidad', 'propiedad que afirma que algo bueno termina ocurriendo; su violación es una ejecución infinita', ['Toda solicitud se atiende.', 'Requiere equidad.', 'Se ve como un ciclo.']],
    ['CTL', 'lógica temporal de árboles de cómputo con cuantificadores sobre caminos A y E', ['Clarke y Emerson, 1981.', 'AG EF reinicio.', 'Premio Turing 2007.']],
    ['CDCL', 'técnica de resolución SAT que aprende cláusulas de los conflictos', ['Aprendizaje de cláusulas.', 'Retroceso no cronológico.', 'Millones de variables.']],
    ['Resolvedor SMT', 'resolvedor de satisfacibilidad que combina SAT con teorías como aritmética, vectores de bits y arreglos', ['Z3, cvc5.', 'Motor de Dafny y KLEE.', 'Satisfiability Modulo Theories.']]
  ],
  q: [
    ['¿Cómo se escribe en LTL "nunca hay dos unidades en el mismo espacio"?', 'G ¬(dos unidades en el mismo espacio)', ['F (dos unidades en el mismo espacio)', 'X ¬(…)', 'E (…)'], 'Siempre no.', 2],
    ['¿Qué expresa G (solicita → F atendida)?', 'Toda solicitud será atendida en algún momento', ['Ninguna solicitud se atiende', 'Las solicitudes se atienden de inmediato', 'Hay una sola solicitud'], 'Respuesta eventual.', 2],
    ['¿Qué tipo de propiedad tiene siempre un contraejemplo finito?', 'Una de seguridad', ['Una de vivacidad', 'Ninguna', 'Ambas'], 'Basta mostrar el prefijo donde pasa lo malo.', 3],
    ['¿Por qué un sistema que no hace nada cumple todas las propiedades de seguridad?', 'Porque nunca ocurre nada malo; por eso hacen falta propiedades de vivacidad', ['Porque es muy rápido', 'Porque no tiene estados', 'No las cumple'], 'Seguridad sin vivacidad es trivial.', 3],
    ['¿Qué agrega la CTL respecto de la LTL?', 'Cuantificadores sobre caminos (A y E) para razonar sobre las ramificaciones', ['Aritmética', 'Tipos de datos', 'Nada'], 'AG EF reinicio.', 4],
    ['¿Qué hace un resolvedor CDCL ante un conflicto?', 'Analiza su causa y aprende una cláusula que impide repetirlo', ['Se detiene', 'Reinicia sin aprender', 'Ignora el conflicto'], 'Aprendizaje guiado por conflictos.', 3],
    ['¿Es satisfacible x + y = 10 ∧ x > 7 ∧ y > 2 en los enteros?', 'No: x ≥ 8 obliga a y ≤ 2', ['Sí, con x = 8 e y = 2', 'Sí, con x = 5 e y = 5', 'Depende del lenguaje'], 'Un resolvedor SMT lo decide.', 3],
    { tf: 'Que SAT sea NP-completo significa que los resolvedores SAT no sirven en la práctica.', v: false, e: 'Resuelven fórmulas industriales enormes gracias a técnicas como CDCL.', l: 2 },
    { tf: 'La violación de una propiedad de vivacidad se manifiesta como una ejecución infinita en la que lo bueno nunca ocurre.', v: true, e: 'Por ejemplo, un ciclo de espera eterna.', l: 3 },
    { c: 'Escribe «satisface(clausulas, asign)»: clausulas es una lista de listas de enteros (−x es "no x") y asign un objeto {x: true/false}; devuelve true si toda cláusula tiene algún literal verdadero.', f: 'satisface', p: ['clausulas', 'asign'], t: [[[[[1, 3], [2], [-1, -2]], { 1: false, 2: true, 3: true }], true], [[[[1], [-1]], { 1: true }], false]], sol: '  return clausulas.every(c => c.some(l => asign[Math.abs(l)] === (l > 0)));', l: 2 },
    { c: 'Escribe «siempre(traza, p)» y «eventualmente(traza, p)» para una traza finita (lista de estados) y devuelve [siempre, eventualmente] con p = "estado.libres > 0".', f: 'gf', p: ['traza'], t: [[[[{ libres: 2 }, { libres: 1 }]], [true, true]], [[[{ libres: 0 }, { libres: 3 }]], [false, true]], [[[{ libres: 0 }]], [false, false]]], sol: '  const p = s => s.libres > 0;\n  return [traza.every(p), traza.some(p)];', l: 2 },
    { c: 'Escribe «hasta(traza, p, q)» para una traza finita: true si existe una posición donde q es verdadero y p es verdadero en todas las anteriores. Usa p = "no liberada" y q = "cobrada" sobre estados {liberada, cobrada}.', f: 'hasta', p: ['traza'], t: [[[[{ liberada: false, cobrada: false }, { liberada: false, cobrada: true }, { liberada: true, cobrada: true }]], true], [[[{ liberada: true, cobrada: false }, { liberada: true, cobrada: true }]], false], [[[{ liberada: false, cobrada: false }]], false]], sol: '  for (const s of traza) { if (s.cobrada) return true; if (s.liberada) return false; }\n  return false;', l: 3 }
  ],
  gen: function (g) {
    var lt = [['Nunca se liberan dos espacios a la vez', 'G ¬(…)'], ['Toda solicitud se atiende en algún momento', 'G (solicitud → F atendida)'], ['En el paso siguiente se emite el comprobante', 'X comprobante'], ['No hay salida hasta que se pague', '¬salida U pagado'], ['Infinitas veces habrá algún espacio libre', 'G F libre'], ['A partir de algún momento el sistema queda estable', 'F G estable']];
    lt.forEach(function (l) { g.mcq(3, '¿Qué fórmula LTL expresa esto? ' + l[0], l[1], ['G ¬(…)', 'G (solicitud → F atendida)', 'X comprobante', '¬salida U pagado', 'G F libre', 'F G estable'].filter(function (x) { return x !== l[1]; }).slice(0, 3), 'Operadores G, F, X y U.'); });
    var sv = [['Nunca dos unidades en el mismo espacio', 'Seguridad'], ['Toda salida solicitada termina registrándose', 'Vivacidad'], ['Nunca se cobra dos veces la misma estadía', 'Seguridad'], ['Todo mensaje enviado termina siendo entregado', 'Vivacidad'], ['El saldo nunca es negativo', 'Seguridad']];
    sv.forEach(function (s) { g.mcq(2, '¿Es una propiedad de seguridad o de vivacidad? ' + s[0], s[1], ['Seguridad', 'Vivacidad', 'Ninguna'].filter(function (x) { return x !== s[1]; }).concat(['Rendimiento']), 'Nada malo pasa contra algo bueno pasa.'); });
    g.times(6, function (R) { var a = R.int(5, 20), b = R.int(1, a - 1), c = R.int(1, a); var sat = (a - c - 1) >= 0 && (c + 1) > b ? 'Sí' : 'No'; var ok = false; for (var x = b + 1; x <= a; x++) { var y = a - x; if (y > c) { ok = true; break; } } g.mcq(4, 'En los enteros, ¿es satisfacible x + y = ' + a + ' ∧ x > ' + b + ' ∧ y > ' + c + '?', ok ? 'Sí' : 'No', [ok ? 'No' : 'Sí', 'Solo con reales', 'Es indecidible'], 'Se buscan x > ' + b + ' e y = ' + a + ' − x con y > ' + c + '.'); });
  },
  checks: [
    ['Escribe en LTL una propiedad de seguridad y una de vivacidad de un sistema que conozcas.', 'Por ejemplo: G ¬(saldo < 0) y G (pedido → F entregado).'],
    ['¿Por qué las propiedades de vivacidad suelen necesitar suposiciones de equidad?', 'Porque sin ellas un proceso o componente podría ser postergado para siempre y lo bueno nunca ocurriría aunque el diseño sea correcto.'],
    ['Explica en qué se diferencian DPLL y CDCL.', 'DPLL asigna, propaga y retrocede; CDCL además aprende cláusulas de cada conflicto y retrocede de forma no cronológica.'],
    ['¿Para qué se usan los resolvedores SMT en ingeniería de software?', 'Como motor de la verificación deductiva, la ejecución simbólica, la verificación acotada y el análisis de políticas.']
  ],
  cites: ['Pnueli, A. (1977). The Temporal Logic of Programs. *FOCS 1977*.', 'Clarke, E. y Emerson, E. A. (1981). Design and Synthesis of Synchronization Skeletons Using Branching-Time Temporal Logic. *Logic of Programs*, LNCS 131.', 'Alpern, B. y Schneider, F. (1985). Defining Liveness. *Information Processing Letters*, 21(4).', 'Davis, M., Logemann, G. y Loveland, D. (1962). A Machine Program for Theorem-Proving. *Communications of the ACM*, 5(7).', 'de Moura, L. y Bjørner, N. (2008). Z3: An Efficient SMT Solver. *TACAS 2008*.', 'Baier, C. y Katoen, J.-P. (2008). *Principles of Model Checking*. MIT Press.'],
  project: { t: 'Propiedades temporales y resolvedores',
    goal: 'Especificar propiedades temporales y usar resolvedores SAT y SMT en problemas reales.',
    steps: ['Elige un protocolo (un semáforo, una reserva, una salida de patio) y escribe tres propiedades de seguridad y dos de vivacidad en LTL.', 'Verifica las propiedades sobre trazas generadas por una simulación y busca contraejemplos.', 'Codifica un problema combinatorio (un horario o un sudoku) en forma normal conjuntiva y resuélvelo con tu propio DPLL y con un resolvedor real.', 'Usa Z3 (desde Python o JavaScript) para encontrar entradas que violen una aserción de una función pequeña.', 'Compara tiempos y escribe conclusiones.'],
    deliver: 'Las fórmulas, las trazas y contraejemplos, la codificación SAT, el uso de Z3 y las conclusiones.' },
  hito: ['Escribe en LTL las propiedades de seguridad y vivacidad del protocolo de salida de PatioApp y verifícalas sobre trazas de simulación.', 'Agrega a PatioApp el tiempo de espera de la pasarela que hace cumplir la vivacidad sin suponer nada sobre el proveedor.']
});
SDC.after('for.logic', 'for.spec');

S('for', 'for.proof', { title: 'Verificación deductiva y asistentes de prueba',
  ask: '¿Qué concepto de verificación deductiva o de asistentes de prueba se aplica?',
  lesson: `
> **La idea en simple.** Las pruebas muestran que un programa funciona en los casos que probaste. Una demostración muestra que funciona en **todos** los casos. Durante décadas, demostrar programas reales parecía un sueño académico; hoy existen compiladores, núcleos de sistemas operativos y bibliotecas criptográficas demostrados correctos con ayuda de la computadora, y lenguajes donde escribir el código y su demostración es parte del mismo trabajo.

## De Hoare a la verificación automática
En la unidad de contratos viste la lógica de Hoare y las precondiciones más débiles de Dijkstra. La **verificación deductiva** automatiza ese razonamiento:
1. El programador escribe el código con su **especificación** (precondiciones, poscondiciones) y las **anotaciones** que el verificador no puede adivinar: **invariantes de bucle** y **funciones de variante** (para la terminación).
2. Un **generador de condiciones de verificación** recorre el código aplicando las reglas de la lógica de Hoare y produce fórmulas lógicas que, si son todas válidas, garantizan la corrección.
3. Esas fórmulas se envían a un **resolvedor SMT**, que las demuestra automáticamente o devuelve un contraejemplo.
Cuando el resolvedor no logra demostrar algo, el programador agrega anotaciones (un invariante más fuerte, un lema auxiliar) hasta que la verificación pasa.

## Dafny
**Dafny**, creado por K. Rustan M. Leino en Microsoft Research hacia 2009 y hoy mantenido como código abierto con fuerte participación de Amazon, es un lenguaje de programación con verificación integrada: mientras escribes, el editor marca en rojo las afirmaciones que no logra demostrar. Se ve así:
~~~txt
method BuscarMaximo(a: array<int>) returns (m: int)
  requires a.Length > 0
  ensures forall i :: 0 <= i < a.Length ==> a[i] <= m
  ensures exists i :: 0 <= i < a.Length && a[i] == m
{
  m := a[0];
  var k := 1;
  while k < a.Length
    invariant 1 <= k <= a.Length
    invariant forall i :: 0 <= i < k ==> a[i] <= m
    invariant exists i :: 0 <= i < k && a[i] == m
    decreases a.Length - k
  {
    if a[k] > m { m := a[k]; }
    k := k + 1;
  }
}
~~~
Las cláusulas «requires» y «ensures» son la especificación; las «invariant» y «decreases» ayudan al verificador. Si se borra el invariante «exists», la verificación falla: sin él, no se puede probar que el máximo devuelto es un elemento del arreglo. Amazon Web Services usa Dafny para verificar componentes críticos, como el motor de autorización que evalúa las políticas de acceso (Cedar, 2023) y partes de su biblioteca criptográfica. Herramientas parecidas: **Why3**, **SPARK** (un subconjunto verificable de Ada usado en aviación y ferrocarriles), **Frama-C** para C, **VeriFast**, **Prusti** y **Verus** para Rust.

## Asistentes de prueba
Para demostraciones que los resolvedores automáticos no pueden hacer solos, se usan **asistentes de prueba** (o demostradores interactivos): el humano guía la demostración paso a paso y el programa verifica que cada paso sea lógicamente válido. Los principales:
- **Coq**, hoy llamado **Rocq** (Thierry Coquand y Gérard Huet, INRIA, 1989), basado en el cálculo de construcciones inductivas, una teoría de tipos dependientes.
- **Isabelle/HOL** (Lawrence Paulson y Tobias Nipkow), basado en lógica de orden superior.
- **Lean** (Leonardo de Moura, Microsoft Research, 2013; Lean 4 desde 2021), muy usado hoy en matemática: la comunidad construyó **mathlib**, una biblioteca con cientos de miles de teoremas formalizados, y en 2023 se completó la formalización de la conjetura polinomial de Freiman-Ruzsa pocas semanas después de su demostración en papel.
- **Agda** e **Idris**, lenguajes de programación con tipos dependientes.
La idea central es la **correspondencia de Curry-Howard** (Haskell Curry, 1934; William Howard, 1969): **las proposiciones son tipos y las demostraciones son programas**. Demostrar "A implica B" es escribir una función que, dado un valor de tipo A, devuelve uno de tipo B. Verificar una demostración es verificar que un programa tiene el tipo correcto, algo que un núcleo pequeño y confiable (el *kernel*) puede hacer con total rigor.

## Grandes logros
- **CompCert** (Xavier Leroy, INRIA, 2006): un compilador de C optimizador demostrado en Coq. Su demostración garantiza que el código de máquina generado se comporta exactamente como el programa fuente. Un estudio de 2011 (Xuejun Yang y otros, con la herramienta Csmith) encontró cientos de errores en GCC y LLVM generando programas aleatorios, y **ninguno** en las partes verificadas de CompCert. Se usa en la industria aeronáutica.
- **seL4** (Gerwin Klein y otros, NICTA, 2009): un micronúcleo de sistema operativo de unas 8700 líneas de C, demostrado correcto en Isabelle respecto de su especificación, con pruebas posteriores de que aísla correctamente los procesos y de que el binario corresponde al código. La demostración costó unos 20 años-persona. Se usa en drones militares (el programa HACMS de DARPA, en el que un equipo de atacantes profesionales no logró tomar el control de un helicóptero no tripulado protegido con seL4) y en dispositivos de alta seguridad.
- **Teorema de los cuatro colores** (Georges Gonthier, 2005) y **conjetura de Kepler** (Thomas Hales y el proyecto Flyspeck, 2014): demostraciones matemáticas verificadas formalmente.
- **Criptografía verificada:** el proyecto HACL* (INRIA y Microsoft) produjo código criptográfico demostrado correcto y libre de ciertos ataques de canal lateral, que hoy está en Firefox y en el núcleo de Linux; **Fiat Cryptography** (MIT) genera código de curvas elípticas verificado que usa Chrome.

## Verificar un poco todos los días
Entre no verificar nada y demostrar todo un sistema hay un abanico amplio. Muchos equipos combinan: tipos fuertes en todo el código, contratos y aserciones en las funciones públicas, pruebas basadas en propiedades en la lógica de negocio, análisis estático en cada cambio, y verificación deductiva solo en los pocos componentes donde un error es intolerable. Byron Cook, que lidera el razonamiento automático en Amazon Web Services, describió en 2018 cómo ese enfoque se volvió parte del trabajo cotidiano de equipos que antes nunca habían usado métodos formales.

## Costos y límites
- **Esfuerzo:** en seL4, el código de la demostración es más de 20 veces mayor que el código verificado. Para CompCert, varios años-persona. Las herramientas automáticas como Dafny reducen mucho el costo para código de tamaño moderado, pero aún exigen especialistas.
- **La especificación puede estar mal:** una demostración garantiza que el código cumple la especificación, no que la especificación diga lo que queremos. Por eso las especificaciones se revisan, se prueban y se validan con escenarios.
- **La base de confianza:** se confía en el núcleo del asistente, en el modelo del hardware y en las herramientas que conectan la demostración con lo que realmente se ejecuta. Los proyectos serios minimizan esa base y la documentan.
- **No todo se especifica:** el rendimiento, la usabilidad o los ataques físicos suelen quedar fuera.
Aun así, el costo baja año tras año, y los asistentes potenciados por modelos de lenguaje que proponen pasos de demostración son un área de investigación muy activa.

## Ejemplo resuelto: verificar el cálculo de tarifa de PatioApp
El cálculo de tarifa es pequeño, se usa millones de veces y un error cuesta dinero y confianza. El equipo decide verificarlo en Dafny.
1. **Especificación:** la tarifa es mayor o igual a 0; es 0 si la estadía dura 60 minutos o menos; es monótona (una estadía más larga nunca cuesta menos); con convenio nunca cuesta más que sin convenio; y el resultado está en céntimos enteros.
2. **Primer intento:** la verificación de la monotonía falla. El contraejemplo del resolvedor: una estadía de 1440 minutos sin recargo nocturno cuesta más que una de 1441 minutos en la que el recargo se descuenta por un error de redondeo al cambiar de día. Era un defecto real que las pruebas no habían encontrado.
3. **Corrección y verificación:** con la corrección, todas las propiedades se demuestran. El código verificado se compila a JavaScript con el compilador de Dafny y se usa en la API.
4. **Costo:** dos días de una persona para 80 líneas de código y 40 de especificación; el equipo considera que valió la pena para este componente y no lo extiende al resto del sistema.`,
  links: [['for.contract', 'la lógica de Hoare es la base de la verificación deductiva'], ['for.logic', 'los resolvedores SMT demuestran las condiciones de verificación'], ['m6.types', 'la correspondencia de Curry-Howard une tipos y demostraciones']],
  read: 'Leino, *Program Proofs* (MIT Press, 2023); Pierce y otros, *Software Foundations* (libre en línea, Coq); Klein y otros (2009); Leroy (2009).',
  terms: [
    ['Verificación deductiva', 'demostración de que un programa cumple su especificación generando condiciones lógicas y demostrándolas', ['Dafny, Why3, SPARK.', 'Usa resolvedores SMT.', 'Requiere invariantes.']],
    ['Condición de verificación', 'fórmula lógica cuya validez garantiza una parte de la corrección del programa', ['Generada por reglas de Hoare.', 'Se envía a un resolvedor.', 'Si falla, hay contraejemplo.']],
    ['Función de variante', 'expresión natural que disminuye en cada vuelta de un bucle y prueba su terminación', ['decreases en Dafny.', 'a.Length − k.', 'Corrección total.']],
    ['Asistente de prueba', 'programa que verifica demostraciones guiadas por una persona paso a paso', ['Coq, Isabelle, Lean.', 'Núcleo pequeño confiable.', 'Demostraciones interactivas.']],
    ['Correspondencia de Curry-Howard', 'equivalencia entre proposiciones y tipos, y entre demostraciones y programas', ['Curry, 1934; Howard, 1969.', 'A implica B es una función.', 'Base de Coq y Lean.']],
    ['CompCert', 'compilador de C optimizador demostrado correcto en Coq', ['Leroy, 2006.', 'Sin errores en las partes verificadas según Csmith.', 'Usado en aviación.']],
    ['seL4', 'micronúcleo de sistema operativo demostrado correcto en Isabelle', ['Klein y otros, 2009.', 'Unas 8700 líneas de C.', 'Programa HACMS de DARPA.']],
    ['Base de confianza', 'conjunto de componentes en los que se confía sin demostrarlos', ['El núcleo del asistente.', 'El modelo del hardware.', 'Se minimiza y documenta.']]
  ],
  q: [
    ['¿Qué diferencia una demostración de un conjunto de pruebas?', 'La demostración garantiza la corrección en todos los casos; las pruebas, solo en los probados', ['Ninguna', 'Las pruebas cubren más casos', 'La demostración es más rápida de ejecutar'], 'Dijkstra: las pruebas muestran presencia de errores, no ausencia.', 1],
    ['En Dafny, ¿qué indica la cláusula ensures?', 'La poscondición', ['La precondición', 'El invariante de bucle', 'La terminación'], 'requires es la precondición.', 2],
    ['¿Para qué sirve decreases en un bucle de Dafny?', 'Para demostrar que el bucle termina', ['Para hacerlo más rápido', 'Para ordenar el arreglo', 'Para declarar variables'], 'Función de variante.', 2],
    ['¿Qué dice la correspondencia de Curry-Howard?', 'Que las proposiciones son tipos y las demostraciones son programas', ['Que los programas no tienen tipos', 'Que toda proposición es falsa', 'Que los tipos son innecesarios'], 'Base de los asistentes como Coq y Lean.', 3],
    ['¿Qué encontró el estudio con Csmith sobre CompCert?', 'Ningún error en sus partes verificadas, mientras GCC y LLVM tenían cientos', ['Que CompCert tenía más errores que GCC', 'Que no compila C', 'Nada relevante'], 'Yang y otros, 2011.', 3],
    ['¿Qué garantiza una demostración formal y qué no?', 'Que el código cumple la especificación, pero no que la especificación sea la correcta', ['Que el programa no tiene ningún defecto de ningún tipo', 'Que el programa es rápido', 'Que el usuario quedará satisfecho'], 'La especificación también se valida.', 4],
    ['¿Cuántas veces mayor que el código verificado fue la demostración de seL4?', 'Más de 20 veces', ['Igual', 'La mitad', '100 000 veces'], 'Unos 20 años-persona.', 3],
    { tf: 'Cuando el resolvedor no logra demostrar una condición, el programador puede agregar invariantes o lemas auxiliares.', v: true, e: 'Es el flujo habitual de trabajo en Dafny.', l: 2 },
    { tf: 'La verificación formal elimina la necesidad de revisar la especificación.', v: false, e: 'La especificación puede estar mal; hay que validarla.', l: 2 },
    { c: 'Escribe «maximoConInvariante(a)»: calcula el máximo de un arreglo no vacío y, en cada vuelta, verifica con un throw que se cumplen los invariantes (todo elemento visto es ≤ m y m es uno de ellos); devuelve m.', f: 'maximoConInvariante', p: ['a'], t: [[[[3, 9, 2, 9, 4]], 9], [[[-5]], -5], [[[1, 2, 3]], 3]], sol: '  let m = a[0];\n  for (let k = 1; k < a.length; k++) {\n    if (a[k] > m) m = a[k];\n    const vistos = a.slice(0, k + 1);\n    if (!vistos.every(x => x <= m) || !vistos.includes(m)) throw new Error("invariante roto");\n  }\n  return m;', l: 2 },
    { c: 'Escribe «tarifaMonotona(tarifa, maxMin)»: tarifa es una lista donde tarifa[i] es el costo de i minutos; devuelve el primer i en que tarifa[i] < tarifa[i − 1] (violación de la monotonía), o −1. maxMin es el último índice a revisar.', f: 'tarifaMonotona', p: ['tarifa', 'maxMin'], t: [[[[0, 0, 20, 20, 40, 38, 40], 6], 5], [[[0, 20, 20, 40], 3], -1]], sol: '  for (let i = 1; i <= maxMin; i++) if (tarifa[i] < tarifa[i - 1]) return i;\n  return -1;', l: 2 },
    { c: 'Escribe «variante(n)»: simula el bucle while (k < n) k++ desde k = 0 y verifica que la variante n − k sea natural y disminuya en cada vuelta; devuelve el número de vueltas (lanza un Error si la variante no disminuye).', f: 'variante', p: ['n'], t: [[[5], 5], [[0], 0]], sol: '  let k = 0, vueltas = 0, prev = n - k;\n  while (k < n) { k++; vueltas++; const v = n - k; if (v < 0 || v >= prev) throw new Error("variante"); prev = v; }\n  return vueltas;', l: 2 }
  ],
  gen: function (g) {
    var dc = [['requires a.Length > 0', 'Precondición'], ['ensures forall i :: … a[i] <= m', 'Poscondición'], ['invariant 1 <= k <= a.Length', 'Invariante de bucle'], ['decreases a.Length - k', 'Función de variante']];
    dc.forEach(function (d) { g.mcq(2, 'En Dafny, ¿qué es esto? ' + d[0], d[1], ['Precondición', 'Poscondición', 'Invariante de bucle', 'Función de variante'].filter(function (x) { return x !== d[1]; }), 'Anotaciones de Dafny.'); });
    var lo = [['Compilador de C optimizador demostrado en Coq', 'CompCert'], ['Micronúcleo de sistema operativo demostrado en Isabelle', 'seL4'], ['Código criptográfico verificado usado en Firefox y Linux', 'HACL*'], ['Formalización del teorema de los cuatro colores', 'Gonthier en Coq'], ['Biblioteca de matemática formalizada con cientos de miles de teoremas', 'mathlib de Lean']];
    lo.forEach(function (l) { g.mcq(2, '¿Qué proyecto es? ' + l[0], l[1], ['CompCert', 'seL4', 'HACL*', 'Gonthier en Coq', 'mathlib de Lean'].filter(function (x) { return x !== l[1]; }).slice(0, 3), 'Grandes logros de la verificación formal.'); });
    var he = [['Lenguaje con verificación integrada que usa un resolvedor SMT', 'Dafny'], ['Asistente basado en el cálculo de construcciones inductivas', 'Coq (Rocq)'], ['Asistente basado en lógica de orden superior', 'Isabelle/HOL'], ['Subconjunto verificable de Ada', 'SPARK'], ['Plataforma de verificación para programas en C', 'Frama-C']];
    he.forEach(function (h) { g.mcq(3, '¿Qué herramienta es? ' + h[0], h[1], ['Dafny', 'Coq (Rocq)', 'Isabelle/HOL', 'SPARK', 'Frama-C'].filter(function (x) { return x !== h[1]; }).slice(0, 3), 'Herramientas de verificación.'); });
  },
  checks: [
    ['Describe el flujo de la verificación deductiva automática.', 'Código con especificación e invariantes; un generador produce condiciones de verificación; un resolvedor SMT las demuestra o da un contraejemplo.'],
    ['¿Qué es la correspondencia de Curry-Howard y por qué importa?', 'Proposiciones son tipos y demostraciones son programas; permite verificar demostraciones con un verificador de tipos pequeño y confiable.'],
    ['¿Qué demostraron CompCert y seL4?', 'Que un compilador optimizador y un núcleo de sistema operativo reales pueden demostrarse correctos respecto de su especificación.'],
    ['¿Cuáles son los límites y costos de la verificación formal?', 'Gran esfuerzo, especificaciones que pueden estar mal, una base de confianza y propiedades que quedan fuera, como el rendimiento.']
  ],
  cites: ['Leino, K. R. M. (2010). Dafny: An Automatic Program Verifier for Functional Correctness. *LPAR-16*, LNCS 6355.', 'Leroy, X. (2009). Formal Verification of a Realistic Compiler. *Communications of the ACM*, 52(7).', 'Klein, G. et al. (2009). seL4: Formal Verification of an OS Kernel. *SOSP 2009*.', 'Yang, X., Chen, Y., Eide, E. y Regehr, J. (2011). Finding and Understanding Bugs in C Compilers. *PLDI 2011*.', 'Howard, W. A. (1980). The Formulae-as-Types Notion of Construction. En *To H. B. Curry: Essays on Combinatory Logic*. Academic Press.', 'Zinzindohoué, J.-K. et al. (2017). HACL*: A Verified Modern Cryptographic Library. *ACM CCS 2017*.'],
  project: { t: 'Verificar un componente con Dafny',
    goal: 'Escribir y verificar formalmente un componente pequeño pero importante.',
    steps: ['Instala Dafny (con la extensión de Visual Studio Code) y verifica los ejemplos del tutorial oficial.', 'Elige un componente de menos de 100 líneas (una búsqueda, un cálculo de tarifas, una cola acotada) y escribe su especificación con requires y ensures.', 'Implementa el componente y agrega los invariantes y variantes hasta que la verificación pase.', 'Introduce a propósito un error y registra el contraejemplo que muestra el verificador.', 'Compila el código verificado a JavaScript o Python y úsalo desde un programa normal.'],
    deliver: 'El código Dafny verificado, el registro del contraejemplo y la integración.' },
  hito: ['Especifica en Dafny el cálculo de tarifa de PatioApp con sus propiedades de no negatividad, monotonía y convenio.', 'Verifica el cálculo de tarifa de PatioApp, compílalo a JavaScript y reemplaza la implementación de la API por la versión verificada.']
});
SDC.after('for.proof', 'for.verif');
})();
