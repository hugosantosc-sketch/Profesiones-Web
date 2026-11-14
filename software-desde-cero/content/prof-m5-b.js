(function () {
var S = SDC.S;

S('m5', 'm5.grasp', { title: 'Asignar responsabilidades: GRASP y tarjetas CRC',
  ask: '¿A qué clase le corresponde esta responsabilidad según GRASP?',
  lesson: `
> **La idea en simple.** Saber qué son las clases, la herencia y los principios SOLID no responde la pregunta que aparece cada día al diseñar: "¿quién debería hacer esto?". ¿Quién calcula el monto de una estadía? ¿Quién crea el comprobante? ¿Quién decide qué espacio asignar? Asignar bien las responsabilidades es el corazón del diseño orientado a objetos, y existen guías concretas para hacerlo.

## Responsabilidades: saber y hacer
Rebecca Wirfs-Brock y Brian Wilkerson propusieron en 1989 el **diseño guiado por responsabilidades**: pensar los objetos no como estructuras de datos, sino como **actores con obligaciones**. Una responsabilidad puede ser de dos tipos:
- **Saber:** conocer sus datos, conocer objetos relacionados, saber cosas que puede calcular (una estadía sabe su fecha de entrada y puede saber cuántos días lleva).
- **Hacer:** realizar una acción, crear otros objetos, coordinar a otros (un patio asigna espacios; un caso de uso coordina el cobro).
Un objeto colabora con otros para cumplir sus responsabilidades. El diseño consiste en repartir las responsabilidades de manera que cada objeto sea cohesivo y dependa de pocos.

## Tarjetas CRC
En 1989, Kent Beck y Ward Cunningham presentaron una técnica de bajo costo para diseñar en equipo: las **tarjetas CRC** (Clase, Responsabilidades, Colaboradores). En una ficha de cartulina se escribe el nombre de una clase, a la izquierda sus responsabilidades y a la derecha las clases con las que colabora. El equipo "juega" un escenario (registrar el ingreso de una unidad) moviendo las tarjetas y diciendo en voz alta quién hace qué. Si una tarjeta se llena, la clase tiene demasiadas responsabilidades; si una clase no aparece en ningún escenario, sobra.

| Clase: Estadia | Colaboradores |
|---|---|
| Sabe su entrada y su salida | Unidad |
| Sabe si sigue abierta | Espacio |
| Calcula los días transcurridos | Tarifario |
| Se cierra al registrar la salida | |

Lo valioso de las tarjetas es que son baratas: se rompen y se reescriben sin costo, y el tamaño físico pone límite a cuánto puede hacer una clase.

## Los patrones GRASP
Craig Larman reunió en 1997, en *Applying UML and Patterns*, nueve principios para asignar responsabilidades, a los que llamó **GRASP** (*General Responsibility Assignment Software Patterns*). No son recetas como los patrones del catálogo GoF, sino criterios para decidir:
1. **Experto en información:** asignar la responsabilidad a la clase que tiene la información necesaria para cumplirla. ¿Quién calcula los días de una estadía? La «Estadia», porque conoce la entrada y la salida. Es el principio más usado y produce la regla "pide, no preguntes".
2. **Creador:** la clase B debe crear objetos de A si B contiene o agrega a A, registra A, usa A de cerca o tiene los datos para inicializar A. ¿Quién crea la «Estadia»? El «Patio», que las contiene, o el caso de uso «RegistrarIngreso», que tiene los datos.
3. **Bajo acoplamiento:** entre varias asignaciones posibles, preferir la que crea menos dependencias.
4. **Alta cohesión:** preferir la asignación que mantiene cada clase enfocada en un propósito.
5. **Controlador:** asignar la responsabilidad de recibir los eventos del sistema (lo que llega desde la interfaz o una API) a un objeto que representa el caso de uso («RegistrarIngreso») o el sistema completo, nunca a la interfaz gráfica. Así el dominio no depende de la pantalla.
6. **Polimorfismo:** cuando el comportamiento varía según el tipo, asignarlo a los tipos mediante operaciones polimórficas, en vez de preguntar el tipo con condicionales.
7. **Fabricación pura:** si asignar una responsabilidad a una clase del dominio viola la cohesión o el acoplamiento, crear una clase artificial que no representa nada del dominio, como un «RepositorioDeEstadias» o un «ServicioDeNotificaciones». La persistencia es el ejemplo típico: una «Estadia» que sabe guardarse en PostgreSQL está acoplada a la base de datos.
8. **Indirección:** introducir un intermediario para desacoplar dos elementos (un adaptador entre PatioApp y la API de SUNAT).
9. **Variaciones protegidas:** identificar los puntos de variación o inestabilidad previsibles y protegerlos con una interfaz estable. Es la idea más general: Larman la considera el principio raíz del que derivan muchos patrones, y coincide con el "ocultamiento de información" de David Parnas (1972).

## Ejemplo resuelto: registrar la salida de una unidad
El escenario: el operador escanea la placa en la puerta, el sistema calcula el monto, emite el comprobante y libera el espacio.
1. **Evento del sistema:** la interfaz llama a «RegistrarSalida.ejecutar(placa)». Por **Controlador**, un objeto de caso de uso recibe el evento.
2. **Encontrar la estadía:** «RepositorioDeEstadias.abiertaPorPlaca(placa)». Por **Fabricación pura**, la búsqueda en la base vive en un repositorio, no en la «Estadia».
3. **Cerrar:** «estadia.cerrar(ahora)». Por **Experto**, la estadía conoce su estado y valida su invariante.
4. **Calcular el monto:** la «Estadia» sabe sus días, pero la tarifa depende del tipo de unidad y del convenio. Por **Experto**, el «Tarifario» conoce las reglas; por **Polimorfismo**, cada regla (convenio, camión) es una estrategia. Así, «tarifario.monto(estadia)».
5. **Emitir comprobante:** por **Creador**, quien tiene los datos (el caso de uso, con estadía, cliente y monto) crea el «Comprobante»; el envío a SUNAT va detrás de una interfaz «EmisorElectronico», por **Indirección** y **Variaciones protegidas** (el proveedor puede cambiar).
6. **Liberar el espacio:** «estadia.espacio.liberar()», o mejor, el «Patio» escucha el evento de salida (Observer), para que el caso de uso no tenga que conocer los detalles del mapa de espacios.
~~~js
class RegistrarSalida {                                    // Controlador
  constructor({ estadias, tarifario, emisor, reloj }) { Object.assign(this, { estadias, tarifario, emisor, reloj }); }
  async ejecutar(placa) {
    const estadia = await this.estadias.abiertaPorPlaca(placa);       // Fabricación pura
    if (!estadia) throw new Error('No hay estadía abierta para ' + placa);
    estadia.cerrar(this.reloj.ahora());                               // Experto
    const monto = this.tarifario.monto(estadia);                       // Experto + Polimorfismo
    const comprobante = await this.emisor.emitir({ estadia, monto });  // Indirección
    await this.estadias.guardar(estadia);
    return { monto, comprobante };
  }
}
~~~
Observa que el controlador **coordina**, pero no calcula ni decide reglas: si empieza a tener «if» sobre tipos de vehículo, está robando responsabilidades al dominio.`,
  links: [['m5.oop1', 'pide, no preguntes nace del experto en información'], ['m5.solid', 'cohesión, acoplamiento y variaciones protegidas'], ['m5.pat2', 'Strategy y Observer aparecen al aplicar GRASP']],
  read: 'Larman, *Applying UML and Patterns* (3.ª ed.), capítulos 17, 18 y 25; Wirfs-Brock y McKean, *Object Design: Roles, Responsibilities, and Collaborations* (2002).',
  terms: [
    ['Responsabilidad', 'obligación de un objeto de saber algo o de hacer algo', ['Saber: sus datos.', 'Hacer: crear o coordinar.', 'Base del diseño.']],
    ['Tarjeta CRC', 'ficha con la clase, sus responsabilidades y sus colaboradores, usada para diseñar jugando escenarios', ['Beck y Cunningham, 1989.', 'Barata y física.', 'Tarjeta llena: demasiado.']],
    ['GRASP', 'conjunto de nueve principios de Larman para asignar responsabilidades a clases', ['Larman, 1997.', 'Criterios, no recetas.', 'Experto, Creador, Controlador…']],
    ['Experto en información', 'asignar una responsabilidad a la clase que tiene la información para cumplirla', ['La estadía calcula sus días.', 'El más usado.', 'Pide, no preguntes.']],
    ['Creador', 'principio que asigna la creación de A a la clase que lo contiene, registra, usa de cerca o tiene sus datos', ['El patio crea estadías.', 'Reduce acoplamiento.', 'Alternativa: fábrica.']],
    ['Controlador', 'objeto que recibe los eventos del sistema y coordina el caso de uso, separado de la interfaz', ['RegistrarSalida.', 'Coordina, no calcula.', 'Dominio sin pantalla.']],
    ['Fabricación pura', 'clase artificial creada para mantener alta cohesión y bajo acoplamiento', ['Repositorio.', 'Servicio de notificaciones.', 'No es del dominio.']],
    ['Variaciones protegidas', 'proteger los puntos de cambio previsibles detrás de interfaces estables', ['Proveedor de facturación.', 'Ocultamiento de información.', 'Principio raíz.']]
  ],
  q: [
    ['¿Qué clase debería calcular los días de una estadía, según el experto en información?', 'La Estadia, que conoce la entrada y la salida', ['La interfaz gráfica', 'La base de datos', 'El controlador'], 'Quien tiene la información.', 2],
    ['¿Qué objeto debe recibir el evento "registrar salida" que llega desde la interfaz?', 'Un controlador de caso de uso', ['El botón de la pantalla', 'La clase Unidad', 'El repositorio'], 'Principio Controlador.', 2],
    ['¿Por qué una Estadia no debería saber guardarse en PostgreSQL?', 'Porque la acopla a la base de datos; se usa una fabricación pura como un repositorio', ['Porque es imposible', 'Porque es más lento', 'Porque JavaScript no lo permite'], 'Cohesión y acoplamiento.', 3],
    ['¿Qué indica una tarjeta CRC que ya no tiene espacio?', 'Que la clase tiene demasiadas responsabilidades', ['Que está bien diseñada', 'Que faltan colaboradores', 'Que hay que usar letra más chica'], 'El tamaño físico es un límite útil.', 1],
    ['El controlador empieza a tener condicionales según el tipo de vehículo. ¿Qué principio se está ignorando?', 'Polimorfismo (y experto): las reglas pertenecen a los tipos o estrategias', ['Creador', 'Fabricación pura', 'Ninguno'], 'El controlador coordina, no decide reglas.', 3],
    ['¿Qué principio GRASP justifica poner el envío a SUNAT detrás de una interfaz?', 'Variaciones protegidas (e indirección)', ['Creador', 'Experto', 'Alta cohesión solamente'], 'El proveedor puede cambiar.', 3],
    ['¿Qué tienen en común variaciones protegidas y el ocultamiento de información de Parnas?', 'Ambos aíslan detrás de una interfaz estable las decisiones que probablemente cambiarán', ['Ambos son patrones creacionales', 'Ambos prohíben la herencia', 'Nada'], 'Larman lo considera el principio raíz.', 4],
    { tf: 'Los principios GRASP son recetas de código con estructura fija, como los patrones GoF.', v: false, e: 'Son criterios para decidir a quién asignar responsabilidades.', l: 2 },
    { tf: 'Según el principio Creador, la clase que contiene o agrega objetos de A es candidata a crearlos.', v: true, e: 'Así no se agregan dependencias nuevas.', l: 1 },
    { c: 'Escribe «diasEstadia(entradaMs, salidaMs)»: días cobrables (mínimo 1, redondeando hacia arriba), con fechas en milisegundos.', f: 'diasEstadia', p: ['entradaMs', 'salidaMs'], t: [[[0, 86400000], 1], [[0, 86400001], 2], [[0, 1000], 1], [[0, 3 * 86400000], 3]], sol: '  return Math.max(1, Math.ceil((salidaMs - entradaMs) / 86400000));', l: 1 },
    { c: 'Escribe «montoTarifario(dias, tipo, convenio)»: 20 soles por día; camión 45 por día; convenio aplica −25 %. Redondea a 2 decimales.', f: 'montoTarifario', p: ['dias', 'tipo', 'convenio'], t: [[[3, 'auto', false], 60], [[2, 'camion', false], 90], [[4, 'auto', true], 60], [[1, 'camion', true], 33.75]], sol: '  const base = (tipo === \'camion\' ? 45 : 20) * dias;\n  return Math.round(base * (convenio ? 0.75 : 1) * 100) / 100;', l: 2 },
    { c: 'Escribe «tarjetaLlena(responsabilidades, max)»: devuelve true si una tarjeta CRC tiene más responsabilidades que el máximo.', f: 'tarjetaLlena', p: ['responsabilidades', 'max'], t: [[[['a', 'b', 'c'], 5], false], [[['a', 'b', 'c', 'd', 'e', 'f'], 5], true]], sol: '  return responsabilidades.length > max;', l: 1 }
  ],
  gen: function (g) {
    var ca = [['¿Quién calcula los días de una estadía?', 'Experto en información'], ['¿Quién crea las estadías de un patio?', 'Creador'], ['¿Quién recibe el evento que llega de la pantalla?', 'Controlador'], ['¿Dónde va la consulta SQL de estadías abiertas?', 'Fabricación pura'], ['¿Cómo evitar preguntar el tipo de vehículo con if?', 'Polimorfismo'], ['¿Cómo aislar el cambio de proveedor de facturación?', 'Variaciones protegidas'], ['¿Qué introducir entre PatioApp y una API externa?', 'Indirección']];
    var todos = ['Experto en información', 'Creador', 'Controlador', 'Fabricación pura', 'Polimorfismo', 'Variaciones protegidas', 'Indirección'];
    ca.forEach(function (c) { g.mcq(2, 'Principio GRASP: ' + c[0], c[1], todos.filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Asignación de responsabilidades.'); });
    var ti = [['Conocer la fecha de entrada', 'Saber'], ['Calcular los días transcurridos', 'Saber'], ['Crear un comprobante', 'Hacer'], ['Coordinar el cobro', 'Hacer'], ['Conocer el espacio asignado', 'Saber'], ['Enviar una notificación', 'Hacer']];
    ti.forEach(function (t) { g.mcq(1, '¿Es una responsabilidad de saber o de hacer? ' + t[0], t[1], [t[1] === 'Saber' ? 'Hacer' : 'Saber', 'Ninguna', 'Ambas'], 'Saber: información; hacer: acciones.'); });
    g.times(5, function (R) { var d = R.int(1, 10); g.input(2, 'Con el Tarifario de PatioApp (20 soles por día), ¿cuánto cuesta una estadía de ' + d + ' días sin convenio?', d * 20, 'Días por tarifa.'); });
  },
  checks: [
    ['¿Qué es una responsabilidad y de qué tipos puede ser?', 'Una obligación de un objeto: saber (datos, cálculos) o hacer (acciones, crear, coordinar).'],
    ['Explica el experto en información y el creador con un ejemplo.', 'La estadía calcula sus días porque tiene las fechas; el patio crea estadías porque las contiene.'],
    ['¿Qué hace un controlador y qué no debe hacer?', 'Recibe los eventos del sistema y coordina el caso de uso; no contiene reglas de negocio ni depende de la interfaz.'],
    ['¿Cuándo crear una fabricación pura?', 'Cuando asignar una responsabilidad a una clase del dominio dañaría su cohesión o la acoplaría, como la persistencia.']
  ],
  cites: ['Larman, C. (2004). *Applying UML and Patterns* (3.ª ed.). Prentice Hall.', 'Beck, K. y Cunningham, W. (1989). A Laboratory for Teaching Object-Oriented Thinking. *OOPSLA 89*.', 'Wirfs-Brock, R. y Wilkerson, B. (1989). Object-Oriented Design: A Responsibility-Driven Approach. *OOPSLA 89*.', 'Wirfs-Brock, R. y McKean, A. (2002). *Object Design: Roles, Responsibilities, and Collaborations*. Addison-Wesley.', 'Parnas, D. L. (1972). On the Criteria To Be Used in Decomposing Systems into Modules. *Communications of the ACM*, 15(12).'],
  project: { t: 'Sesión CRC y diseño por responsabilidades',
    goal: 'Diseñar un módulo asignando responsabilidades con tarjetas CRC y principios GRASP.',
    steps: ['Elige tres escenarios de un dominio (por ejemplo, reservas de una cancha: reservar, cancelar, pagar).', 'Escribe tarjetas CRC para las clases candidatas y juega cada escenario en voz alta (o con otra persona).', 'Anota cada decisión con el principio GRASP que la justifica.', 'Implementa el escenario principal y escribe pruebas unitarias para cada clase.', 'Revisa el código: busca condicionales por tipo, controladores con reglas y clases del dominio con persistencia.'],
    deliver: 'Fotos o texto de las tarjetas, la tabla de decisiones, el código y las pruebas.' },
  hito: ['Haz una sesión CRC de los casos de uso RegistrarIngreso y RegistrarSalida de PatioApp y documenta cada asignación con su principio GRASP.', 'Refactoriza el controlador de salida de PatioApp para que coordine sin contener reglas de tarifa.']
});
SDC.after('m5.grasp', 'm5.oop1');

S('m5', 'm5.proto', { title: 'Modelos de objetos: clases, prototipos y más allá',
  ask: '¿Cómo funciona este modelo de objetos por dentro?',
  lesson: `
> **La idea en simple.** "Orientado a objetos" no significa lo mismo en todos los lenguajes. En Java, todo objeto nace de una clase. En JavaScript, los objetos heredan directamente de otros objetos, y las clases son una capa encima. En Go no hay herencia en absoluto. Entender cómo funciona por dentro el modelo de objetos de tu lenguaje evita sorpresas y te deja leer cualquier código.

## Dos tradiciones
La programación orientada a objetos nació con **Simula** (Ole-Johan Dahl y Kristen Nygaard, 1967), que introdujo clases, objetos y herencia para simular sistemas. **Smalltalk** (Alan Kay, Dan Ingalls y Adele Goldberg, en Xerox PARC, década de 1970) llevó la idea al extremo: todo es un objeto, incluso los números y las clases, y los objetos se comunican enviándose **mensajes**. Alan Kay, que acuñó el término, dijo después que la idea central no eran las clases sino los mensajes: objetos como pequeñas computadoras independientes que se comunican.
En 1987, David Ungar y Randall Smith presentaron **Self**, un lenguaje sin clases: los objetos se crean **clonando** otros objetos y heredan de un objeto **prototipo**. Esa idea, a través de Brendan Eich, llegó a JavaScript en 1995.

## Clases: el modelo de Java, C# y C++
En el modelo clásico, una **clase** es una plantilla que define campos y métodos, y cada objeto es una **instancia** de una clase fija. La herencia es entre clases. Por dentro, cada objeto guarda sus campos y un puntero a una **tabla de métodos virtuales** (vtable) de su clase; llamar a un método polimórfico es buscar en esa tabla (lo viste en el despacho dinámico). La estructura de un objeto se fija al compilar: no se pueden agregar campos a una instancia en tiempo de ejecución.

## Prototipos: el modelo de JavaScript
En JavaScript, cada objeto tiene un enlace interno a otro objeto, su **prototipo** (accesible con «Object.getPrototypeOf»). Al leer una propiedad, el motor la busca en el objeto; si no la encuentra, en su prototipo; si no, en el prototipo del prototipo, y así hasta llegar a «null». Esa es la **cadena de prototipos**.
~~~js
const tarifaBase = {
  porDia: 20,
  monto(dias) { return dias * this.porDia; }
};
const tarifaCamion = Object.create(tarifaBase);     // su prototipo es tarifaBase
tarifaCamion.porDia = 45;                            // propiedad propia que "tapa" la del prototipo
console.log(tarifaBase.monto(2), tarifaCamion.monto(2));          // 40 90
console.log(Object.getPrototypeOf(tarifaCamion) === tarifaBase);  // true
console.log(Object.hasOwn(tarifaCamion, 'monto'));                 // false: lo hereda
tarifaBase.monto = function (dias) { return dias * this.porDia * 1.18; };   // cambiar el prototipo…
console.log(tarifaCamion.monto(2));                                // …afecta a todos: 106.2
~~~
Lo importante: «this» no es el objeto donde se definió el método, sino el objeto sobre el que se **llamó**. Por eso «tarifaCamion.monto» usa su propio «porDia».

## «class» en JavaScript es azúcar sintáctica
La palabra «class», agregada en ECMAScript 2015, no cambió el modelo: crea una función constructora y pone los métodos en su objeto «prototype». Una instancia creada con «new» tiene como prototipo ese objeto, y «extends» encadena los prototipos.
~~~js
class Unidad { constructor(placa) { this.placa = placa; } describir() { return 'Unidad ' + this.placa; } }
class Camion extends Unidad { describir() { return super.describir() + ' (camión)'; } }
const c = new Camion('XYZ-987');
console.log(typeof Unidad);                                               // 'function'
console.log(Object.getPrototypeOf(c) === Camion.prototype);               // true
console.log(Object.getPrototypeOf(Camion.prototype) === Unidad.prototype); // true
~~~
La cadena es: «c» → «Camion.prototype» → «Unidad.prototype» → «Object.prototype» → «null». Los métodos se comparten (uno por clase, no uno por objeto), y los campos declarados en el constructor son propios de cada instancia. Las clases sí agregaron cosas reales: campos privados con «#» (verdaderamente inaccesibles desde afuera), bloques estáticos y que el constructor no se pueda llamar sin «new».

## «this»: la fuente de errores más común
Como «this» depende de cómo se llama la función, se pierde al pasar un método como callback:
~~~js
const t = { porDia: 20, monto(d) { return d * this.porDia; } };
const f = t.monto;
// f(3) falla o da NaN: al llamarla sola, this no es t
console.log([1, 2, 3].map(t.monto.bind(t)));        // [20, 40, 60]: bind fija this
console.log([1, 2, 3].map(d => t.monto(d)));        // lo mismo con una función flecha
~~~
Las funciones flecha no tienen «this» propio: usan el del contexto donde se escribieron, lo que las hace ideales para callbacks dentro de métodos.

## Otros modelos
- **Go** no tiene clases ni herencia: tiene estructuras, métodos asociados a tipos y **interfaces implícitas** (un tipo cumple una interfaz si tiene sus métodos, sin declararlo). La reutilización es por composición e incrustación (*embedding*).
- **Rust** separa los datos (structs y enums) del comportamiento (*traits*), sin herencia de implementación.
- **Python** tiene clases, pero todo es dinámico: los objetos son diccionarios de atributos, las clases son objetos, y se pueden modificar en tiempo de ejecución. Su herencia múltiple usa el orden C3.
- **CLOS**, el sistema de objetos de Common Lisp, tiene **despacho múltiple**: el método se elige según el tipo de **todos** los argumentos, no solo del primero. Julia lo adoptó como su modelo central.
- **Erlang** y el **modelo de actores** (Carl Hewitt, 1973) toman la idea de Kay de los mensajes literalmente: procesos aislados que solo se comunican con mensajes.

## Ejemplo resuelto: entender un error de «this» en PatioApp
Un desarrollador escribió un panel que se refresca cada 30 segundos:
1. Código: «setInterval(this.refrescar, 30000)» dentro de la clase «PanelSede». Al ejecutarse, «this.datos» es «undefined» y la consola muestra "Cannot read properties of undefined".
2. Diagnóstico: «setInterval» llama a la función sin objeto, así que dentro de «refrescar» el «this» no es el panel.
3. Solución: «setInterval(() => this.refrescar(), 30000)», o definir «refrescar» como campo con función flecha: «refrescar = () => { … }».
4. Lección: cuando una función viaja (callback, evento, temporizador), «this» no viaja con ella. Las clases de JavaScript parecen las de Java, pero el modelo de debajo es el de Self.`,
  links: [['m5.oop2', 'herencia y despacho dinámico'], ['m5.oop1', 'encapsulamiento y campos privados'], ['m8.comp', 'cómo un motor de JavaScript optimiza el acceso a propiedades']],
  read: 'Ungar y Smith, *Self: The Power of Simplicity* (1987); Simpson, *You Don\'t Know JS Yet: Objects & Classes*; MDN, "Inheritance and the prototype chain".',
  terms: [
    ['Prototipo', 'objeto del que otro objeto hereda propiedades a través de un enlace interno', ['Object.create.', 'Self, 1987.', 'JavaScript.']],
    ['Cadena de prototipos', 'secuencia de prototipos en la que se busca una propiedad hasta encontrarla o llegar a null', ['c → Camion.prototype → …', 'Búsqueda de propiedades.', 'Termina en null.']],
    ['Azúcar sintáctica', 'sintaxis más cómoda que no agrega capacidades nuevas al modelo de fondo', ['class en JavaScript.', 'Funciones y prototipos debajo.', 'Mismo modelo.']],
    ['this', 'referencia al objeto sobre el que se llamó una función, que en JavaScript depende de la forma de llamada', ['Se pierde en callbacks.', 'bind lo fija.', 'Las flechas lo heredan.']],
    ['Envío de mensajes', 'visión de los objetos como entidades que se comunican enviándose mensajes', ['Smalltalk.', 'Alan Kay.', 'Actores.']],
    ['Interfaz implícita', 'interfaz que un tipo cumple con solo tener sus métodos, sin declararlo', ['Go.', 'Tipado estructural.', 'Sin herencia.']],
    ['Despacho múltiple', 'elección del método según el tipo de todos los argumentos', ['CLOS.', 'Julia.', 'Distinto de Java.']],
    ['Modelo de actores', 'modelo de computación con entidades aisladas que solo se comunican por mensajes', ['Hewitt, 1973.', 'Erlang.', 'Sin memoria compartida.']]
  ],
  q: [
    ['En JavaScript, ¿de qué hereda un objeto creado con Object.create(p)?', 'Del objeto p, que pasa a ser su prototipo', ['De la clase Object únicamente', 'De nada', 'De una copia de p'], 'Herencia directa entre objetos.', 2],
    ['¿Qué es realmente «class» en JavaScript?', 'Azúcar sintáctica sobre funciones constructoras y prototipos', ['Un modelo nuevo igual al de Java', 'Un tipo de dato primitivo', 'Una macro del compilador'], 'typeof de una clase es "function".', 2],
    ['¿Por qué «setInterval(this.refrescar, 1000)» pierde el «this»?', 'Porque la función se llama sin objeto, y this depende de la forma de llamada', ['Porque setInterval es asíncrono', 'Porque refrescar es privado', 'Porque las clases no admiten temporizadores'], 'Se resuelve con flecha o bind.', 3],
    ['Si se modifica un método en un prototipo, ¿qué pasa con los objetos que heredan de él?', 'Todos ven el cambio, salvo los que tienen una propiedad propia con ese nombre', ['Ninguno cambia', 'Solo los creados después', 'Se produce un error'], 'La búsqueda es dinámica.', 3],
    ['¿Qué lenguaje introdujo los objetos sin clases basados en prototipos?', 'Self', ['Simula', 'C++', 'Java'], 'Ungar y Smith, 1987.', 2],
    ['¿Cómo reutiliza código Go sin herencia?', 'Con composición, incrustación de estructuras e interfaces implícitas', ['Con herencia múltiple', 'Con prototipos', 'No reutiliza código'], 'Un tipo cumple una interfaz si tiene sus métodos.', 3],
    ['¿Qué distingue al despacho múltiple de CLOS y Julia?', 'Elige el método según el tipo de todos los argumentos, no solo del receptor', ['No tiene métodos', 'Solo funciona con números', 'Es lo mismo que la sobrecarga en Java'], 'La sobrecarga se resuelve al compilar.', 4],
    { tf: 'En JavaScript, los métodos definidos en una clase se copian en cada instancia.', v: false, e: 'Viven en el prototipo y se comparten.', l: 2 },
    { tf: 'Las funciones flecha usan el this del contexto donde se escribieron.', v: true, e: 'No tienen this propio.', l: 2 },
    { c: 'Escribe «profundidadCadena(obj)»: cuántos prototipos hay en la cadena de obj hasta null (sin contar obj). Por ejemplo, un objeto literal {} tiene 1.', f: 'profundidadCadena', p: ['obj'], t: [[[{}], 1], [[[]], 2]], sol: '  let n = 0, p = Object.getPrototypeOf(obj);\n  while (p !== null) { n++; p = Object.getPrototypeOf(p); }\n  return n;', l: 3 },
    { c: 'Escribe «propiedadesPropias(obj)»: lista ordenada de las claves propias (no heredadas) de obj.', f: 'propiedadesPropias', p: ['obj'], t: [[[{ b: 1, a: 2 }], ['a', 'b']], [[{}], []]], sol: '  return Object.keys(obj).sort();', l: 1 },
    { c: 'Escribe «montoConPrototipo(porDia, dias)»: crea un objeto base con monto(d) que usa this.porDia, un objeto hijo con Object.create que define porDia, y devuelve hijo.monto(dias).', f: 'montoConPrototipo', p: ['porDia', 'dias'], t: [[[45, 2], 90], [[20, 3], 60]], sol: '  const base = { porDia: 0, monto(d) { return d * this.porDia; } };\n  const hijo = Object.create(base);\n  hijo.porDia = porDia;\n  return hijo.monto(dias);', l: 2 }
  ],
  gen: function (g) {
    var le = [['Java', 'Clases'], ['JavaScript', 'Prototipos'], ['Self', 'Prototipos'], ['Go', 'Estructuras e interfaces implícitas'], ['Common Lisp (CLOS)', 'Despacho múltiple'], ['Erlang', 'Actores y mensajes'], ['C#', 'Clases'], ['Rust', 'Structs y traits']];
    var op = ['Clases', 'Prototipos', 'Estructuras e interfaces implícitas', 'Despacho múltiple', 'Actores y mensajes', 'Structs y traits'];
    le.forEach(function (l) { g.mcq(2, '¿Qué modelo de objetos caracteriza a ' + l[0] + '?', l[1], op.filter(function (x) { return x !== l[1]; }).slice(0, 3), 'Modelos de objetos.'); });
    var th = [['obj.metodo()', 'obj'], ['const f = obj.metodo; f()', 'undefined (modo estricto)'], ['obj.metodo.bind(otro)()', 'otro'], ['Una flecha definida dentro de un método de obj', 'obj']];
    th.forEach(function (t) { g.mcq(3, '¿Qué vale this en: ' + t[0] + '?', t[1], ['obj', 'otro', 'undefined (modo estricto)', 'El objeto global siempre'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'this depende de la forma de llamada.'); });
    g.times(5, function (R) { var p = R.pick([20, 45, 15]), d = R.int(1, 8); g.input(2, 'Un objeto hijo creado con Object.create(base) define porDia = ' + p + '. base.monto(d) devuelve d * this.porDia. ¿Cuánto da hijo.monto(' + d + ')?', p * d, 'this es el hijo.'); });
  },
  checks: [
    ['Explica cómo busca JavaScript una propiedad en un objeto.', 'En el objeto, luego en su prototipo y así por la cadena hasta encontrarla o llegar a null.'],
    ['¿Qué hace realmente «class» en JavaScript y qué agregó de nuevo?', 'Crea una función constructora con métodos en su prototype; agregó campos privados, bloques estáticos y la obligación de usar new.'],
    ['¿Por qué se pierde «this» al pasar un método como callback y cómo se resuelve?', 'Porque se llama sin objeto; se resuelve con bind o con una función flecha.'],
    ['Compara el modelo de clases, el de prototipos y el de Go.', 'Clases: plantillas fijas; prototipos: herencia entre objetos; Go: estructuras con métodos, interfaces implícitas y composición.']
  ],
  cites: ['Dahl, O.-J. y Nygaard, K. (1966). SIMULA: an ALGOL-based simulation language. *Communications of the ACM*, 9(9).', 'Ungar, D. y Smith, R. (1987). Self: The Power of Simplicity. *OOPSLA 87*.', 'Kay, A. (1993). The Early History of Smalltalk. *HOPL-II*, ACM.', 'Hewitt, C., Bishop, P. y Steiger, R. (1973). A Universal Modular ACTOR Formalism for Artificial Intelligence. *IJCAI*.', 'ECMA International (2024). *ECMAScript 2024 Language Specification* (ECMA-262).'],
  project: { t: 'Un modelo de objetos a mano',
    goal: 'Entender los modelos de objetos implementándolos y comparándolos.',
    steps: ['Escribe una jerarquía de tres niveles con «class» y otra equivalente solo con Object.create.', 'Verifica con Object.getPrototypeOf que ambas cadenas son iguales y dibújalas.', 'Implementa un mini sistema de clases con un diccionario de métodos y una búsqueda manual en "padres".', 'Reproduce tres errores típicos de this y corrígelos de dos formas cada uno.', 'Escribe la misma pequeña jerarquía en otro lenguaje (Python, Go o Java) y compara.'],
    deliver: 'El código, los diagramas de cadenas y una comparación escrita de los modelos.' },
  hito: ['Dibuja la cadena de prototipos de las clases Unidad, Camion y Estadia de PatioApp.', 'Revisa los callbacks de temporizadores y eventos de PatioApp y corrige los que pierden this.']
});
SDC.after('m5.proto', 'm5.oop2');


SDC.D('m5.grasp', `## Errores frecuentes al asignar responsabilidades
- **La clase Dios:** una clase «Sistema» o «Gestor» que lo sabe y lo hace todo. Nace cuando cada responsabilidad nueva se agrega "donde ya está todo". Se reconoce porque casi todos los cambios la tocan, y porque sus pruebas necesitan preparar medio sistema. Se desarma aplicando experto en información: cada dato y su lógica se van a la clase que los posee.
- **Controladores gordos:** el caso de uso calcula tarifas, valida placas y arma el XML. Es una clase Dios a escala de caso de uso. La regla práctica: si un controlador tiene más de una decena de líneas de lógica que no sea coordinar, algo se le está escapando al dominio.
- **Envidia de datos** (*feature envy*, nombrada por Martin Fowler en *Refactoring*): un método que usa más los datos de otra clase que los de la suya. Es la señal inversa del experto en información, y la solución es mover el método.
- **Responsabilidades repartidas de más:** el exceso contrario, con docenas de clases diminutas que solo se pasan datos entre sí. La cohesión no es "una clase por método", sino "una clase por concepto".

## Del modelo de dominio al diseño
Larman propone un camino: primero un **modelo de dominio** con los conceptos del negocio y sus relaciones (unidad, estadía, espacio, sede, tarifa, cliente, comprobante), sin pensar en software; luego los **eventos del sistema** de cada caso de uso (lo que el actor le pide al sistema: «registrarIngreso», «registrarSalida», «consultarOcupacion»); y finalmente, para cada evento, un **diagrama de interacción** (de secuencia o de comunicación) que muestra qué objetos colaboran y en qué orden, aplicando GRASP en cada mensaje. Las clases de diseño se inspiran en los conceptos del dominio, lo que Larman llama un **salto representacional bajo**: quien conoce el negocio reconoce el código, y un cambio en una regla del negocio se ubica rápido en el programa.

## Conexión con el diseño guiado por el dominio
Eric Evans, en *Domain-Driven Design* (2003), llevó estas ideas más lejos con el **lenguaje ubicuo** (los mismos términos en conversaciones, documentos y código), los **agregados** (grupos de objetos con un único punto de entrada que protege sus invariantes, como un «Patio» con sus «Espacios») y los **contextos delimitados** (en facturación, "cliente" significa algo distinto que en operaciones). GRASP es el nivel de clases; DDD agrega el nivel de módulos y equipos. Ambos coinciden en que el diseño empieza por entender el dominio, no por la base de datos.`);

SDC.D('m5.proto', `## Cómo acelera un motor la búsqueda de propiedades
Si cada acceso a una propiedad recorriera la cadena de prototipos buscando por nombre en un diccionario, JavaScript sería muy lento. Los motores modernos usan dos técnicas que vienen, justamente, de la investigación sobre Self:
- **Clases ocultas** (llamadas *maps* en Self, *hidden classes* o *shapes* en V8 y SpiderMonkey): el motor asigna a cada objeto una "forma" que describe qué propiedades tiene y en qué posición de memoria está cada una. Los objetos creados del mismo modo comparten forma, y leer una propiedad se convierte en leer una posición fija, como en un struct de C.
- **Cachés en línea** (*inline caches*, de Urs Hölzle, Craig Chambers y David Ungar, 1991): en cada punto del código donde se lee una propiedad, el motor recuerda la forma que vio la última vez y dónde estaba la propiedad; si la próxima vez llega un objeto con la misma forma, salta la búsqueda.
La consecuencia práctica: conviene crear los objetos siempre con las mismas propiedades y en el mismo orden (inicializarlas todas en el constructor), y evitar agregar o borrar propiedades después con «delete». Un punto del código que ve muchas formas distintas se vuelve **megamórfico** y pierde la optimización.

## Prototipos más allá de la herencia
El modelo de prototipos permite cosas que en Java requieren patrones: agregar métodos a todos los arreglos (modificando «Array.prototype», algo que **no** debe hacerse en código de producción porque choca con otras bibliotecas y con versiones futuras del lenguaje, como pasó con «Array.prototype.flatten», que debió llamarse «flat» en 2018 porque una biblioteca antigua, MooTools, ya lo definía distinto), crear objetos "plantilla" que se clonan (el patrón Prototype del catálogo GoF es nativo aquí) y delegar en objetos configurables en tiempo de ejecución. Kyle Simpson propone incluso un estilo llamado OLOO (*objects linked to other objects*) que prescinde de clases y usa solo «Object.create», para no fingir un modelo que el lenguaje no tiene.

## ¿Qué modelo elegir?
No se elige el modelo: viene con el lenguaje. Lo que se elige es **cuánto** usar de él. La tendencia de las últimas dos décadas, visible en Go, Rust, Swift y el JavaScript moderno, es usar poca herencia de implementación, mucha composición e interfaces, y objetos de valor inmutables. Conocer el modelo de fondo sirve para depurar, para optimizar y para no pelear contra el lenguaje.`);
})();
