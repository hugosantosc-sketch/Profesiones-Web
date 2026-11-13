(function () {
var X = SDC.X, XM = SDC.XM;
XM('m5', {
  uni: 'CMU 17-214 *Principles of Software Construction: Objects, Design, and Concurrency*; MIT 6.1020 (antes 6.031) *Software Construction*; Stanford CS108 *Object-Oriented Systems Design*; Berkeley CS61B (programación orientada a objetos en Java). En Perú: Programación Orientada a Objetos y Diseño de Software (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp orientado a objetos',
    goal: 'Rediseñar PatioApp con objetos bien encapsulados, principios SOLID y los patrones que el problema realmente pida.',
    steps: ['Dibuja un diagrama de clases con Unidad, Patio, Tarifa, Revision y Notificador antes de escribir código.', 'Implementa las clases con campos privados e invariantes que no se puedan romper desde afuera.', 'Usa polimorfismo para las tarifas (Strategy) y el patrón State para el ciclo de vida de una unidad.', 'Aplica inversión de dependencias para las notificaciones y el almacenamiento, de modo que puedas probar todo con dobles falsos.', 'Escribe un documento corto justificando cada patrón usado y uno que decidiste no usar.'],
    deliver: 'El código, el diagrama de clases, las pruebas y el documento de decisiones de diseño.' }
});

X('m5.oop1', {
  deep: `
## De dónde vienen los objetos
La programación orientada a objetos nació en Noruega con **Simula 67**, de Ole-Johan Dahl y Kristen Nygaard, creado para programar simulaciones: cada barco o cliente de la simulación era un objeto con su propio estado. Dahl y Nygaard recibieron el Premio Turing en 2001. En los años 70, Alan Kay y su equipo en Xerox PARC crearon **Smalltalk** y popularizaron el término. Para Kay la idea central no eran las clases sino los **mensajes**: en un correo de 2003 escribió que para él la orientación a objetos significaba solo mensajes, retención y protección locales del estado, y enlace tardío de todas las cosas.

## Ocultar información
David Parnas publicó en 1972 *On the Criteria To Be Used in Decomposing Systems into Modules*, uno de los artículos más influyentes de la disciplina. Su propuesta: dividir un sistema según las **decisiones de diseño que probablemente cambien** y ocultar cada una dentro de un módulo. Si mañana cambia cómo se guarda el kilometraje, solo debe cambiar la clase Vehiculo. El encapsulamiento es la herramienta del lenguaje para aplicar esa idea.

## Encapsulamiento real en JavaScript
Las clases de JavaScript son una sintaxis sobre los **prototipos** del lenguaje. Desde ES2022 existen campos privados con «#», que de verdad no se pueden leer desde afuera:
~~~js
class Unidad {
  #km; #estado = 'ingresada';
  constructor(placa, km) {
    if (!/^[A-Z0-9]{6}$/.test(placa)) throw new Error('Placa inválida');
    if (km < 0) throw new Error('Kilometraje negativo');
    this.placa = placa; this.#km = km;
  }
  get km() { return this.#km; }                 // lectura sí, escritura no
  recorrer(d) { if (d < 0) throw new Error('No se puede retroceder'); this.#km += d; }
  revisar() { this.#estado = 'revisada'; }
  entregar() {
    if (this.#estado !== 'revisada') throw new Error('Primero debe revisarse');
    this.#estado = 'entregada';
  }
  get estado() { return this.#estado; }
}
const u = new Unidad('ABC123', 1000);
u.recorrer(50); u.revisar(); u.entregar();
console.log(u.km, u.estado, u['#km']);   // 1050 entregada undefined
~~~
El constructor garantiza que **no existe** una unidad inválida, y cada método mantiene las invariantes. Bertrand Meyer formalizó esta idea en *Object-Oriented Software Construction* (1988; 2.ª ed., 1997) como **diseño por contrato**: precondiciones que el llamador debe cumplir, postcondiciones que el método garantiza e invariantes de clase que siempre se mantienen.

## Pide, no preguntes, y la ley de Deméter
Andy Hunt y Dave Thomas resumieron el principio *Tell, Don't Ask*: dile al objeto qué hacer en lugar de preguntarle por sus datos y decidir afuera. Relacionada está la **ley de Deméter**, formulada por Karl Lieberherr e Ian Holland en 1989 en la Universidad Northeastern: un método solo debería hablar con sus "amigos inmediatos" (sus campos, sus parámetros, los objetos que crea). Una línea como «patio.zona('A').fila(3).espacio(7).unidad.chofer.telefono» encadena tanto conocimiento interno que cualquier cambio en una clase rompe el código que la recorre.

## Cohesión y acoplamiento, con historia
Wayne Stevens, Glenford Myers y Larry Constantine introdujeron estos conceptos en *Structured Design* (1974), antes de la popularidad de los objetos. Distinguieron niveles: la cohesión más débil es la **coincidental** (cosas juntas por casualidad, como una clase «Utilidades») y la más fuerte, la **funcional** (todo contribuye a una sola tarea). El acoplamiento más dañino es el de **contenido** (un módulo modifica las entrañas de otro) y el más sano, el de **datos** (se pasan solo los datos necesarios).

## Entidades y objetos de valor
Eric Evans, en *Domain-Driven Design* (2003), distingue:
- **Entidades:** tienen identidad que perdura aunque cambien sus datos (una unidad con su número de chasis).
- **Objetos de valor:** se definen solo por sus datos y conviene que sean inmutables (un monto de dinero, un rango de fechas, una placa). Dos montos de S/ 50 son intercambiables.
Modelar el dinero como objeto de valor, en lugar de un número suelto, evita mezclar soles con dólares o céntimos con soles:
~~~js
class Dinero {
  constructor(centimos, moneda = 'PEN') { this.centimos = centimos; this.moneda = moneda; Object.freeze(this); }
  sumar(otro) { if (otro.moneda !== this.moneda) throw new Error('Monedas distintas'); return new Dinero(this.centimos + otro.centimos, this.moneda); }
  toString() { return this.moneda + ' ' + (this.centimos / 100).toFixed(2); }
}
console.log(String(new Dinero(1250).sumar(new Dinero(750))));
~~~`,
  checks: [
    ['¿Qué propuso Parnas como criterio para dividir un sistema en módulos?', 'Dividirlo según las decisiones de diseño que probablemente cambien, ocultando cada decisión dentro de un módulo para que su cambio no afecte al resto.'],
    ['¿Qué significa que el constructor deje al objeto "en un estado válido"?', 'Que valida los datos de entrada y se niega a crear el objeto si no cumplen las reglas; así nunca existe un objeto que viole sus invariantes.'],
    ['¿Qué principio viola «pedido.cliente().direccion().ciudad().nombre()» y por qué es un problema?', 'La ley de Deméter: el código conoce la estructura interna de varios objetos encadenados, y cualquier cambio en uno de ellos lo rompe.'],
    ['¿Por qué conviene que Dinero sea un objeto de valor inmutable?', 'Porque se define solo por monto y moneda; si fuera mutable, un cambio en un lugar alteraría otros montos compartidos. Además, encapsula reglas como no sumar monedas distintas.'],
    ['¿Por qué "getters y setters para todo" no es encapsulamiento?', 'Porque expone todo el estado para que cualquiera lo lea y lo cambie desde afuera; las reglas quedan dispersas fuera de la clase.']
  ],
  cites: ['Dahl, O.-J. y Nygaard, K. (1966). SIMULA: an ALGOL-based simulation language. *Communications of the ACM*, 9(9).', 'Parnas, D. L. (1972). On the Criteria To Be Used in Decomposing Systems into Modules. *Communications of the ACM*, 15(12).', 'Meyer, B. (1997). *Object-Oriented Software Construction* (2.ª ed.). Prentice Hall.', 'Stevens, W., Myers, G. y Constantine, L. (1974). Structured Design. *IBM Systems Journal*, 13(2).', 'Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.'],
  project: { t: 'Objetos que no se pueden romper',
    goal: 'Diseñar clases cuyas reglas de negocio sean imposibles de violar desde afuera.',
    steps: ['Diseña la clase Unidad con campos privados, constructor que valide y métodos para recorrer, revisar y entregar.', 'Diseña Dinero como objeto de valor inmutable con sumar, restar, multiplicar y formatear.', 'Diseña Patio, que contiene unidades y ofrece ingresar(unidad) y entregar(placa) sin exponer su colección interna.', 'Escribe pruebas que intenten romper cada invariante y comprueben que se lanza un error.', 'Revisa tu código buscando cadenas de llamadas que violen la ley de Deméter y corrígelas.'],
    deliver: 'Las tres clases, sus pruebas y una lista de las invariantes que protegen.' },
  hito: ['Convierte las unidades de PatioApp en una clase Unidad con campos privados y un constructor que valide; el kilometraje nunca baja y no se entrega sin revisión.', 'Crea la clase Patio que gestiona su colección interna aplicando "pide, no preguntes", y representa los cobros con un objeto de valor Dinero.']
});

X('m5.oop2', {
  deep: `
## Las dos reglas de oro del libro de los patrones
Gamma, Helm, Johnson y Vlissides, la "pandilla de los cuatro", escribieron en la introducción de *Design Patterns* (1994) dos principios que resumen décadas de experiencia:
:::cita Programa para una interfaz, no para una implementación. | Gamma, Helm, Johnson y Vlissides, *Design Patterns* (1994), traducción propia.
:::cita Prefiere la composición de objetos a la herencia de clases. | Gamma, Helm, Johnson y Vlissides, *Design Patterns* (1994), traducción propia.
La razón: la herencia expone al hijo los detalles del padre (lo llaman "reutilización de caja blanca"), mientras que la composición solo usa la interfaz pública de los componentes ("reutilización de caja negra").

## El problema de la clase base frágil
Cuando una subclase depende de cómo el padre implementa sus métodos, un cambio "inocente" en el padre la rompe. Bloch muestra un ejemplo clásico en *Effective Java* (ítem 18): una subclase de un conjunto que cuenta elementos sobrescribe «add» y «addAll»; como «addAll» del padre llama internamente a «add», cada elemento se cuenta dos veces. La subclase dependía de un detalle que nadie había prometido.

## Los tipos de polimorfismo
Luca Cardelli y Peter Wegner los clasificaron en 1985 (*On Understanding Types, Data Abstraction, and Polymorphism*):
| Tipo | Idea | Ejemplo |
| De subtipos (inclusión) | un objeto hijo se usa donde se espera el padre | «cobrar(tarifa)» acepta Normal o VIP |
| Paramétrico (genéricos) | el código funciona igual para cualquier tipo | «Array<T>», «Map<K, V>» |
| Sobrecarga (ad hoc) | mismo nombre, distintas versiones según los tipos | «+» suma números y concatena textos |
| Coerción | el lenguaje convierte el tipo automáticamente | «"5" * 2» |
En JavaScript domina el polimorfismo por **duck typing**: si un objeto tiene el método que se necesita, sirve, sin importar su clase.

## Cómo funciona por dentro: despacho dinámico
Cuando escribes «t.calcular(dias)», el lenguaje decide **en tiempo de ejecución** qué versión de «calcular» llamar según el objeto real. En JavaScript lo hace recorriendo la **cadena de prototipos**: busca el método en el objeto, luego en su prototipo, luego en el prototipo de este, hasta llegar a «Object.prototype».
~~~js
class Vehiculo { espacio() { return 1; } describir() { return this.constructor.name + ' ocupa ' + this.espacio(); } }
class Camion extends Vehiculo { espacio() { return 3; } }
const c = new Camion();
console.log(c.describir());
console.log(Object.getPrototypeOf(c) === Camion.prototype, Object.getPrototypeOf(Camion.prototype) === Vehiculo.prototype);
~~~

## El principio de sustitución
Barbara Liskov lo presentó en su conferencia *Data Abstraction and Hierarchy* (1987) y lo formalizó con Jeannette Wing en 1994: si S es subtipo de T, cualquier propiedad demostrable de los objetos de T debe valer para los de S. En la práctica: la subclase no puede **exigir más** (precondiciones más fuertes), ni **prometer menos** (postcondiciones más débiles), ni romper las invariantes del padre. El famoso caso: un Cuadrado que hereda de Rectangulo rompe a quien hace «r.setAncho(5); r.setAlto(2)» y espera un área de 10.

## Composición en la práctica
~~~js
// En vez de AutoConGPS, AutoConGPSYSeguro, CamionConGPS...: componer capacidades
const conGPS = base => ({ ...base, ubicar: () => base.placa + ' en -12.04, -77.03' });
const conSeguro = (base, poliza) => ({ ...base, poliza, asegurado: () => true });
const unidad = conSeguro(conGPS({ placa: 'ABC123' }), 'POL-77');
console.log(unidad.ubicar(), unidad.poliza);
~~~
Con herencia, cada combinación de capacidades sería una clase nueva y su número crecería de forma exponencial. Con composición, las capacidades se mezclan libremente.

## Clases abstractas e interfaces en JavaScript
JavaScript no tiene la palabra «interface», pero el contrato se puede hacer explícito:
- Con TypeScript: «interface Tarifa { calcular(dias: number): number }».
- En JavaScript puro, una clase base que impide instanciarse directamente con «new.target» y métodos que lanzan "no implementado".
Lo importante no es la sintaxis, sino que el contrato esté **documentado y probado**: una misma batería de pruebas debería pasar con todas las implementaciones.

## ¿Cuándo sí heredar?
Cuando la relación "es un" es verdadera **en comportamiento** (no solo en el lenguaje cotidiano), cuando el padre está diseñado para ser extendido (Bloch: "diseña y documenta para la herencia, o prohíbela") y cuando la jerarquía es poco profunda. En los demás casos, compón.`,
  checks: [
    ['¿Por qué la herencia se llama "reutilización de caja blanca"?', 'Porque la subclase ve y depende de los detalles internos del padre; cualquier cambio en esos detalles puede romperla.'],
    ['Explica con el ejemplo del cuadrado por qué viola el principio de Liskov.', 'Un código que usa rectángulos espera poder cambiar ancho y alto por separado; un cuadrado cambia ambos a la vez, así que el área resulta distinta de la esperada. Sustituir el padre por el hijo cambia el comportamiento.'],
    ['¿Qué tipo de polimorfismo usa «Array<T>» en TypeScript?', 'Polimorfismo paramétrico (genéricos): el mismo código funciona para cualquier tipo T.'],
    ['Tienes 4 capacidades opcionales para un vehículo. ¿Cuántas clases harían falta con herencia para cubrir todas las combinaciones y cómo lo resuelve la composición?', 'Hasta 2^4 = 16 clases. Con composición bastan 4 componentes que se combinan al crear el objeto.'],
    ['¿Qué hace el lenguaje cuando llamas a un método sobrescrito?', 'Despacho dinámico: en tiempo de ejecución busca el método según el objeto real (en JavaScript, recorriendo la cadena de prototipos) y ejecuta la versión más específica.']
  ],
  cites: ['Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley. Capítulo 1.', 'Liskov, B. y Wing, J. (1994). A Behavioral Notion of Subtyping. *ACM Transactions on Programming Languages and Systems*, 16(6).', 'Cardelli, L. y Wegner, P. (1985). On Understanding Types, Data Abstraction, and Polymorphism. *ACM Computing Surveys*, 17(4).', 'Bloch, J. (2018). *Effective Java* (3.ª ed.). Addison-Wesley. Ítems 18 y 19.'],
  project: { t: 'Herencia contra composición',
    goal: 'Resolver el mismo problema con ambos enfoques y comprobar en la práctica cuál resiste mejor el cambio.',
    steps: ['Modela auto, camioneta, camión y moto con una jerarquía de herencia: cada uno calcula su tarifa y el espacio que ocupa.', 'Agrega capacidades opcionales (GPS, seguro, blindaje) y cuenta cuántas clases necesitarías.', 'Rehaz el diseño con composición: un Vehiculo que recibe una tarifa y una lista de capacidades.', 'Escribe una sola batería de pruebas que pase con ambos diseños.', 'Agrega un tipo nuevo (bus) en ambos y anota cuántos archivos tocaste.'],
    deliver: 'Los dos diseños, las pruebas compartidas y una comparación escrita del esfuerzo de cambio.' },
  hito: ['Agrega a PatioApp tipos de vehículo (auto, camioneta, camión, moto) que calculen su cobro y su espacio de forma polimórfica, sin cadenas de if por tipo.', 'Modela capacidades opcionales (GPS, seguro) por composición en lugar de crear subclases.']
});

X('m5.solid', {
  deep: `
## Origen de los cinco principios
Robert C. Martin reunió estos principios en su artículo *Design Principles and Design Patterns* (2000) y en *Agile Software Development: Principles, Patterns, and Practices* (2002). El acrónimo SOLID lo propuso Michael Feathers alrededor de 2004. No todos son de Martin: el abierto/cerrado viene de Bertrand Meyer (1988) y el de sustitución, de Barbara Liskov (1987).

## S: responsabilidad única, bien entendida
La versión popular, "una clase debe hacer una sola cosa", lleva a clases diminutas. Martin la reformuló en *Clean Architecture* (2017): **un módulo debe responder a un solo actor**, es decir, a un solo grupo de personas que pueden pedir cambios. Si la clase Unidad calcula el cobro (lo define Finanzas) y además arma el reporte de inspección (lo define Operaciones), un cambio pedido por un área puede romper lo de la otra. Esa es la señal para separar.

## O: abierto a extensión, cerrado a modificación
Meyer lo planteó en *Object-Oriented Software Construction*: un módulo debe poder extenderse sin editar su código ya probado. En la práctica se logra con polimorfismo o con datos: agregar una tarifa nueva debería ser agregar una clase o una entrada en una tabla, no editar un «switch» en cinco lugares.

## L: sustitución, con reglas concretas
Una subclase respeta el contrato del padre si:
- No pide más: sus **precondiciones** no son más fuertes (si el padre acepta cualquier número de días, el hijo no puede exigir días > 0).
- No promete menos: sus **postcondiciones** no son más débiles (si el padre garantiza un cobro ≥ 0, el hijo no puede devolver negativos).
- No rompe las **invariantes** del padre ni lanza excepciones que el padre no anunciaba.

## I: interfaces a la medida del cliente
Martin cuenta que el principio surgió asesorando a Xerox: una sola clase «Job» servía a la impresión, al engrapado y al fax, y cualquier cambio obligaba a recompilar todo. Dividirla en interfaces pequeñas, una por cliente, resolvió el problema. En JavaScript, donde no se declaran interfaces, el principio se traduce en no obligar a un componente a recibir un objeto enorme cuando solo usa dos métodos.

## D: inversión de dependencias
Su enunciado tiene dos partes: los módulos de alto nivel (reglas de negocio) no deben depender de los de bajo nivel (base de datos, correo); ambos deben depender de **abstracciones**. Y las abstracciones no deben depender de los detalles. Martin Fowler acuñó en 2004 el término **inyección de dependencias** para la técnica de pasarle a un objeto lo que necesita en lugar de que lo cree él mismo:
~~~js
class ServicioEntregas {
  constructor(repositorio, notificador) { this.repo = repositorio; this.notif = notificador; }
  entregar(placa) {
    const u = this.repo.buscar(placa);
    if (!u || u.estado !== 'revisada') return false;
    this.repo.guardar({ ...u, estado: 'entregada' });
    this.notif.enviar('Unidad ' + placa + ' entregada');
    return true;
  }
}
// En pruebas se inyectan dobles en memoria; en producción, la base de datos y el correo reales
const datos = new Map([['ABC123', { placa: 'ABC123', estado: 'revisada' }]]);
const repoMemoria = { buscar: p => datos.get(p), guardar: u => datos.set(u.placa, u) };
const enviados = [], notifFalso = { enviar: m => enviados.push(m) };
const s = new ServicioEntregas(repoMemoria, notifFalso);
console.log(s.entregar('ABC123'), datos.get('ABC123').estado, enviados);
~~~
La regla de negocio no sabe si los datos vienen de PostgreSQL o de un Map: por eso se puede probar en milisegundos.

## Los principios hermanos
- **DRY** (*Don't Repeat Yourself*), de Hunt y Thomas en *The Pragmatic Programmer* (1999): "cada pieza de conocimiento debe tener una representación única, inequívoca y autorizada dentro de un sistema". Se refiere a **conocimiento**, no a líneas parecidas: dos fragmentos idénticos que representan reglas distintas no deben unirse.
- **YAGNI** (*You Aren't Gonna Need It*), de la Programación Extrema de Kent Beck y Ron Jeffries: no construyas hoy lo que imaginas necesitar mañana.
- **KISS** (*Keep It Simple*), atribuido al ingeniero aeronáutico Kelly Johnson.

## Críticas que también debes conocer
John Ousterhout advierte en *A Philosophy of Software Design* (2018) que dividir demasiado produce **módulos superficiales**: muchas clases pequeñas cuya interfaz es casi tan compleja como su implementación. Propone **módulos profundos**: interfaz simple que esconde mucha funcionalidad. Dan North propuso en 2022 las propiedades CUPID como alternativa más orientada a la experiencia de quien lee el código. La lección: SOLID ayuda a detectar problemas, pero la meta es que el sistema sea fácil de entender y de cambiar, no cumplir siglas.`,
  checks: [
    ['Según la reformulación de Martin, ¿cuándo una clase viola la responsabilidad única?', 'Cuando responde a más de un actor, es decir, cuando grupos distintos de personas pueden pedirle cambios por razones diferentes.'],
    ['Una subclase de Tarifa exige que los días sean mayores que 0, aunque el padre acepta 0. ¿Qué principio viola?', 'El de sustitución de Liskov: fortalece una precondición, así que el código que usaba al padre con 0 días falla con el hijo.'],
    ['¿Por qué la inversión de dependencias facilita las pruebas?', 'Porque la lógica depende de abstracciones que se inyectan; en las pruebas se pasan dobles en memoria en lugar de bases de datos o servicios reales.'],
    ['Dos funciones tienen el mismo código pero una calcula la tarifa de estacionamiento y otra la multa por retraso. ¿Debes unirlas por DRY?', 'No necesariamente: DRY se refiere a conocimiento, no a texto. Si son reglas distintas que pueden cambiar por separado, unirlas acopla cosas que no deberían estarlo.'],
    ['¿Qué es un "módulo profundo" según Ousterhout?', 'Uno con una interfaz simple que esconde una implementación con mucha funcionalidad; reduce la complejidad que perciben quienes lo usan.']
  ],
  cites: ['Martin, R. C. (2002). *Agile Software Development: Principles, Patterns, and Practices*. Prentice Hall.', 'Martin, R. C. (2017). *Clean Architecture*. Prentice Hall. Parte III.', 'Meyer, B. (1988). *Object-Oriented Software Construction*. Prentice Hall.', 'Fowler, M. (2004). Inversion of Control Containers and the Dependency Injection pattern. martinfowler.com.', 'Ousterhout, J. (2018). *A Philosophy of Software Design*. Yaknyam Press.', 'Hunt, A. y Thomas, D. (1999). *The Pragmatic Programmer*. Addison-Wesley.'],
  project: { t: 'Refactorización SOLID de un módulo enredado',
    goal: 'Tomar un módulo que viola los cinco principios y mejorarlo paso a paso sin cambiar su comportamiento.',
    steps: ['Escribe (o toma) una clase GestorPatio de unas 200 líneas que valide, calcule cobros, guarde en archivo, envíe correos y arme reportes.', 'Antes de tocarla, escribe pruebas que fijen su comportamiento actual.', 'Separa responsabilidades por actor (finanzas, operaciones, sistemas) y anota el porqué de cada división.', 'Introduce abstracciones para el almacenamiento y las notificaciones e inyéctalas.', 'Agrega un tipo de tarifa nuevo sin modificar el código existente y verifica que las pruebas siguen pasando.'],
    deliver: 'El historial de commits con cada paso de la refactorización y un resumen de qué principio aplicaste en cada uno.' },
  hito: ['Agrega notificaciones a PatioApp con inversión de dependencias: un Notificador abstracto con implementaciones de consola, correo simulado y una para pruebas.', 'Revisa cada clase de PatioApp y anota a qué actor responde; separa las que respondan a más de uno.']
});

X('m5.pat1', {
  deep: `
## La idea viene de la arquitectura de edificios
El arquitecto Christopher Alexander publicó en 1977 *A Pattern Language*, un catálogo de soluciones para diseñar ciudades y casas. En su libro definió así un patrón:
:::cita Cada patrón describe un problema que ocurre una y otra vez en nuestro entorno y luego describe el núcleo de la solución a ese problema, de tal modo que puedes usar esa solución un millón de veces sin hacerlo nunca dos veces de la misma forma. | Christopher Alexander, *A Pattern Language* (1977), traducción propia.
En 1994, Gamma, Helm, Johnson y Vlissides trasladaron la idea al software en *Design Patterns*, con 23 patrones: 5 creacionales, 7 estructurales y 11 de comportamiento. Cada patrón se describe con un **nombre**, el **problema**, la **solución** y sus **consecuencias** (lo que se gana y lo que se paga).

## Creacionales: el resto del catálogo
- **Abstract Factory:** crea familias de objetos relacionados sin nombrar sus clases concretas (todos los componentes de un tema claro o de un tema oscuro).
- **Prototype:** crea objetos copiando uno existente. JavaScript lo lleva en su ADN: todo objeto se crea a partir de un prototipo.
- **Singleton:** garantiza una sola instancia. Sus críticas son serias: es estado global escondido, acopla a todos los que lo usan y dificulta las pruebas. Hoy se prefiere crear una sola instancia al iniciar la aplicación e **inyectarla** donde se necesite.

## Estructurales: el resto del catálogo
- **Bridge:** separa una abstracción de su implementación para que varíen por separado (un reporte que puede salir en PDF o en Excel).
- **Flyweight:** comparte el estado común entre muchísimos objetos para ahorrar memoria (los datos de un modelo de vehículo compartidos por miles de unidades).
- **Composite:** trata igual a un elemento y a un grupo. Es la forma orientada a objetos de la recursión estructural que viste antes:
~~~js
class Espacio { constructor(n, libre) { this.n = n; this.libre = libre; } libres() { return this.libre ? 1 : 0; } }
class Grupo { constructor(n, hijos) { this.n = n; this.hijos = hijos; } libres() { return this.hijos.reduce((s, h) => s + h.libres(), 0); } }
const sede = new Grupo('Sede', [new Grupo('Zona A', [new Espacio('A1', true), new Espacio('A2', false)]), new Espacio('B1', true)]);
console.log(sede.libres());   // quien llama no distingue hojas de grupos
~~~

## Adapter, Facade, Decorator y Proxy: parecidos pero distintos
| Patrón | Interfaz que ofrece | Para qué |
| Adapter | una distinta a la del objeto envuelto | hacer compatible algo ajeno (una API externa) con tu código |
| Facade | una nueva y más simple | ocultar un subsistema complejo tras pocas operaciones |
| Decorator | la misma | agregar comportamiento (registro, caché, reintentos) |
| Proxy | la misma | controlar el acceso (permisos, carga diferida, caché remota) |
En JavaScript, los decoradores suelen ser funciones de orden superior, y el lenguaje incluye un «Proxy» nativo:
~~~js
// Adapter: un servicio externo devuelve datos con otro formato
const servicioExterno = { consultar: p => ({ PLACA_VEH: p, ANIO_FAB: 2019, MARCA_DESC: 'TOYOTA' }) };
const adaptador = { buscar: p => { const r = servicioExterno.consultar(p); return { placa: r.PLACA_VEH, anio: r.ANIO_FAB, marca: r.MARCA_DESC }; } };
console.log(adaptador.buscar('ABC123'));
// Proxy nativo: registrar cada lectura
const unidad = new Proxy({ placa: 'ABC123', km: 900 }, { get(o, k) { console.log('leyendo', String(k)); return o[k]; } });
unidad.km;
~~~
El Adapter es clave en sistemas reales: encierra cada servicio externo detrás de una interfaz propia, así un cambio del proveedor afecta un solo archivo.

## Patrones y lenguajes
Peter Norvig mostró en 1996 (*Design Patterns in Dynamic Languages*) que 16 de los 23 patrones se vuelven invisibles o mucho más simples en lenguajes con funciones de primera clase y tipado dinámico. Un Strategy es una función; un Command, una función guardada en una lista; un Decorator, una función que envuelve otra. Los patrones siguen siendo útiles como **vocabulario**: decir "aquí hay un adaptador" comunica una decisión de diseño completa en una palabra.

## Cómo usarlos bien
- Parte del **problema**: "necesito cambiar el algoritmo sin tocar al cliente" lleva a Strategy, no al revés.
- Mira las **consecuencias**: cada patrón agrega indirección; si el problema no existe, solo agregas complejidad.
- Elisabeth Freeman y Eric Freeman, en *Head First Design Patterns* (2004; 2.ª ed., 2020), recomiendan empezar por el código simple y **refactorizar hacia** un patrón cuando aparezca el dolor que resuelve. Joshua Kerievsky desarrolló esa idea en *Refactoring to Patterns* (2004).`,
  checks: [
    ['¿Cuáles son las cuatro partes con que el libro de la pandilla de los cuatro describe cada patrón?', 'Nombre, problema, solución y consecuencias.'],
    ['¿Qué diferencia hay entre Adapter y Decorator?', 'Adapter cambia la interfaz para que algo ajeno sea compatible; Decorator mantiene la misma interfaz y le agrega comportamiento.'],
    ['¿Por qué se critica el Singleton y qué se usa en su lugar?', 'Porque es estado global escondido que acopla a todos sus usuarios y complica las pruebas. Se prefiere crear una instancia al iniciar y pasarla por inyección de dependencias.'],
    ['¿Qué patrón aplicarías para integrar el servicio de pagos de un banco cuyo formato de datos no controlas?', 'Adapter: una clase propia con la interfaz que tu sistema espera, que traduce hacia y desde el formato del banco; si el banco cambia, solo cambia el adaptador.'],
    ['¿Qué observó Norvig sobre los patrones en lenguajes dinámicos?', 'Que 16 de los 23 patrones se simplifican o desaparecen gracias a funciones de primera clase y tipado dinámico; por ejemplo, Strategy se reduce a pasar una función.']
  ],
  cites: ['Alexander, C., Ishikawa, S. y Silverstein, M. (1977). *A Pattern Language*. Oxford University Press.', 'Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design Patterns*. Addison-Wesley. Capítulos 3 y 4.', 'Norvig, P. (1996). Design Patterns in Dynamic Languages. Presentación, Harlequin.', 'Freeman, E. y Robson, E. (2020). *Head First Design Patterns* (2.ª ed.). O\'Reilly.', 'Kerievsky, J. (2004). *Refactoring to Patterns*. Addison-Wesley.'],
  project: { t: 'Kit de patrones creacionales y estructurales',
    goal: 'Aplicar cada patrón a un problema concreto del patio y justificar su uso.',
    steps: ['Factory: crea tarifas según el tipo de cliente leyendo una configuración.', 'Builder: arma un reporte con filtros, columnas y orden opcionales con una interfaz encadenable.', 'Adapter: envuelve un servicio externo simulado de consulta vehicular con otro formato de datos.', 'Decorator: agrega caché y registro de tiempos al adaptador sin modificarlo.', 'Composite: modela sedes, zonas y espacios y calcula capacidad libre de forma uniforme.'],
    deliver: 'El código de los cinco patrones, sus pruebas y una ficha por patrón con problema, solución y consecuencias.' },
  hito: ['Agrega a PatioApp una Factory de tarifas y un Builder de reportes con filtros opcionales.', 'Integra un servicio externo simulado de consulta de placas detrás de un Adapter y agrégale una caché con un Decorator.']
});

X('m5.pat2', {
  deep: `
## Observer y el nacimiento de MVC
Trygve Reenskaug propuso en 1979, en Xerox PARC, el patrón **Modelo-Vista-Controlador**: el modelo guarda los datos y avisa cuando cambian, y las vistas se actualizan solas. Ese aviso es un Observer. Hay dos variantes:
- **Empujar (push):** el sujeto envía los datos del cambio en el aviso.
- **Tirar (pull):** el sujeto solo avisa "cambié" y cada observador consulta lo que necesita.
Su primo a gran escala es **publicar-suscribir**: un intermediario (un bus de eventos o un broker de mensajes) separa a quien publica de quien escucha, incluso en máquinas distintas. Es la base de la arquitectura orientada a eventos que verás más adelante.

## Command: acciones como objetos
Convertir una acción en un objeto permite guardarla, ponerla en cola, registrarla y **deshacerla**. Con dos pilas (como viste en estructuras de datos) se obtiene deshacer y rehacer:
~~~js
class Historial {
  constructor() { this.hechos = []; this.deshechos = []; }
  ejecutar(cmd) { cmd.hacer(); this.hechos.push(cmd); this.deshechos = []; }
  deshacer() { const c = this.hechos.pop(); if (c) { c.deshacer(); this.deshechos.push(c); } }
  rehacer() { const c = this.deshechos.pop(); if (c) { c.hacer(); this.hechos.push(c); } }
}
const patio = new Set();
const ingresar = placa => ({ hacer: () => patio.add(placa), deshacer: () => patio.delete(placa) });
const h = new Historial();
h.ejecutar(ingresar('ABC123')); h.ejecutar(ingresar('XYZ789'));
h.deshacer(); console.log([...patio]);
h.rehacer(); console.log([...patio]);
~~~
Las bases de datos aplican la misma idea en su registro de transacciones, y los sistemas con *event sourcing* guardan la secuencia de comandos y eventos en lugar del estado final.

## State: cuando el comportamiento depende del estado
Si cada método empieza con «if (estado === 'ingresada') ... else if (estado === 'revisada') ...», el patrón State propone una clase por estado, cada una con su versión de los métodos y la decisión de a qué estado pasar. Agregar un estado nuevo es agregar una clase. Es la implementación orientada a objetos de una **máquina de estados**, que estudiarás formalmente en el módulo de métodos formales.

## Template Method frente a Strategy
Ambos permiten variar parte de un algoritmo. **Template Method** lo hace con herencia: el padre define el esqueleto («preparar → revisar → informar») y las subclases rellenan los pasos. **Strategy** lo hace con composición: el algoritmo recibe el paso variable como objeto o función. Siguiendo el consejo de preferir composición, Strategy suele ser más flexible, porque se puede cambiar en tiempo de ejecución y combinar.

## El resto del catálogo de comportamiento
| Patrón | Problema que resuelve |
| Chain of Responsibility | una petición pasa por una cadena de manejadores hasta que uno la atiende (middleware de un servidor web) |
| Iterator | recorrer una colección sin conocer su estructura (en JavaScript, el protocolo de iteración y los generadores) |
| Mediator | muchos objetos se comunican a través de un intermediario en vez de conocerse todos entre sí |
| Memento | guardar y restaurar el estado de un objeto sin exponer sus detalles (instantáneas para deshacer) |
| Visitor | agregar operaciones a una estructura de objetos sin modificar sus clases (recorrer el árbol de sintaxis de un compilador) |
| Interpreter | representar y evaluar una gramática pequeña (reglas de filtros escritas por el usuario) |

## Middleware: Chain of Responsibility en acción
~~~js
const cadena = [
  (req, sig) => { if (!req.usuario) return 'Debes iniciar sesión'; return sig(); },
  (req, sig) => { if (req.rol !== 'supervisor') return 'Sin permiso'; return sig(); },
  () => 'Unidad entregada'
];
function atender(req, i = 0) { return cadena[i](req, () => atender(req, i + 1)); }
console.log(atender({ usuario: 'ana', rol: 'revisor' }));
console.log(atender({ usuario: 'beto', rol: 'supervisor' }));
~~~

## Antipatrones: lo que se repite y sale mal
William Brown y sus coautores catalogaron en *AntiPatterns* (1998) soluciones que parecen buenas y producen problemas: el **objeto Dios**, el **código espagueti**, el **martillo de oro**, la **lava seca** (código muerto que nadie se atreve a borrar) y el **barco ancla** (código conservado "por si acaso"). Brian Foote y Joseph Yoder describieron en 1997 la **gran bola de barro**, la arquitectura más común en la práctica: un sistema sin estructura reconocible, que creció a parches. Conocer estos nombres ayuda a reconocerlos a tiempo en una revisión de código.`,
  checks: [
    ['¿Qué ventaja tiene representar una acción como objeto Command?', 'Se puede guardar, encolar, registrar, repetir y deshacer, porque la acción y su inversa viven en un objeto que se maneja como dato.'],
    ['¿En qué se diferencian Strategy y Template Method?', 'Ambos varían una parte de un algoritmo; Template Method usa herencia (las subclases rellenan pasos) y Strategy usa composición (se pasa el comportamiento como objeto o función).'],
    ['¿Qué patrón describe el middleware de un servidor web y por qué?', 'Chain of Responsibility: cada manejador decide si atiende la petición o la pasa al siguiente de la cadena.'],
    ['¿Qué riesgo tiene Observer si los observadores no se dan de baja?', 'Fugas de memoria y avisos a objetos que ya no deberían existir, porque el sujeto mantiene referencias a ellos.'],
    ['Un sistema crece a parches hasta no tener estructura reconocible. ¿Qué nombre recibe según Foote y Yoder?', 'Gran bola de barro (Big Ball of Mud).']
  ],
  cites: ['Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design Patterns*. Addison-Wesley. Capítulo 5.', 'Reenskaug, T. (1979). *Models-Views-Controllers*. Nota técnica, Xerox PARC.', 'Brown, W. et al. (1998). *AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis*. Wiley.', 'Foote, B. y Yoder, J. (1997). Big Ball of Mud. *Pattern Languages of Program Design 4*.', 'Freeman, E. y Robson, E. (2020). *Head First Design Patterns* (2.ª ed.). O\'Reilly.'],
  project: { t: 'Flujo de una unidad con patrones de comportamiento',
    goal: 'Modelar el ciclo de vida de una unidad y sus efectos con State, Observer, Command y Strategy.',
    steps: ['Implementa los estados ingresada, en revisión, lista, entregada y anulada con el patrón State; cada estado decide qué transiciones permite.', 'Emite eventos de dominio con Observer al cambiar de estado (bitácora, notificación y estadísticas como suscriptores).', 'Convierte las acciones del operador en comandos con deshacer y rehacer.', 'Cambia la regla de cobro en tiempo de ejecución con Strategy.', 'Escribe pruebas que intenten transiciones prohibidas.'],
    deliver: 'El código, un diagrama de estados y las pruebas de transiciones válidas e inválidas.' },
  hito: ['Implementa en PatioApp el ciclo de vida de una unidad con el patrón State (ingresada → en revisión → lista → entregada, más anulada).', 'Publica eventos de dominio con Observer (al entregar: notificar y registrar en bitácora) y convierte las acciones del operador en comandos con deshacer.']
});
})();
