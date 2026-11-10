(function () {
var M = SDC.M, S = SDC.S;
M('m5', { title: 'Diseño orientado a objetos', desc: 'Cuando el programa crece, el problema ya no es que funcione, sino que se pueda cambiar sin romper todo. Aquí aprendes a organizar el código para eso.',
  thread: 'PatioApp se organiza en clases como Vehiculo, Revision y Patio. Las reglas de cálculo de tarifa se vuelven intercambiables con Strategy y los avisos a usuarios con Observer.',
  books: '*Design Patterns* (Gamma, Helm, Johnson y Vlissides), *Head First Design Patterns* (Freeman y Robson), *Effective Java* (Bloch), *Clean Architecture* (Martin).',
  uni: 'Diseño y Patrones de Software (UPC), Programación Orientada a Objetos y Diseño de Patrones (UTP), Programación Orientada a Objetos I y II (UTEC), Software Construction (MIT).' });

S('m5', 'm5.oop1', { title: 'Clases, objetos y encapsulamiento',
  ask: '¿Qué concepto de POO se aplica?',
  lesson: `
> **La idea en simple.** Una clase es el plano de un auto; un objeto es un auto real hecho con ese plano. El conductor usa el timón y los pedales sin tocar el motor: esa separación entre **lo que se usa** y **cómo funciona** es encapsulamiento.

~~~js
class Vehiculo {
  #km = 0;                         // privado
  constructor(placa) { this.placa = placa; }
  recorrer(d) {
    if (d < 0) throw new Error("Distancia inválida");
    this.#km += d;
  }
  get km() { return this.#km; }
}
const v = new Vehiculo("ABC-123");
v.recorrer(150);
console.log(v.placa, v.km);
// v.#km = 0;  esto daría error: está protegido
~~~

## Las piezas
- **Atributos:** el estado (placa, km).
- **Métodos:** el comportamiento (recorrer).
- **Constructor:** deja al objeto en un estado válido.
- **Interfaz pública:** lo único que otros pueden usar.

## Por qué encapsular
El kilometraje nunca puede disminuir: esa es una **invariante**. Si km fuera público, cualquier parte del programa podría romperla. Con el método, la regla vive en un solo lugar.

## Pide, no preguntes
Mejor «cuenta.retirar(50)» que preguntar el saldo, calcular afuera y volver a asignarlo. Los datos y las reglas deben vivir juntos. Si otro objeto hace todo con los datos de este, tienes un "modelo anémico".

## Cohesión y acoplamiento
- **Alta cohesión:** todo lo de una clase trabaja por un mismo propósito.
- **Bajo acoplamiento:** las clases dependen poco unas de otras.
Es el objetivo central del diseño: cambiar una cosa debe tocar pocas partes.

## Puntos que no debes omitir
- Getters y setters para todo no es encapsular; es exponer con más pasos.
- Diseña objetos que no puedan estar en estado inválido.
- Prefiere objetos inmutables cuando puedas: son más seguros.

! Error común: la "clase Dios" de 3000 líneas que sabe de todo. Divídela por responsabilidades.`,
  links: [['m3.func', 'los métodos son funciones con acceso al estado'], ['m5.oop2', 'las clases se relacionan por herencia y composición'], ['m5.solid', 'SOLID es la versión refinada de cohesión y bajo acoplamiento'], ['m13.styles', 'el mismo principio se aplica a módulos y servicios']],
  read: 'Bloch, *Effective Java*, ítems sobre clases; Martin, *Clean Code*, capítulo 10.',
  terms: [
    ['Clase', 'plantilla que define el estado y el comportamiento de un tipo de objeto', ['«class Vehiculo» describe qué tendrá todo vehículo.', 'Se escribe una vez y se usa para crear muchos.', 'Se declara qué métodos existirán.']],
    ['Objeto', 'instancia concreta con su propio estado', ['«new Vehiculo("ABC")» crea uno.', 'Dos instancias tienen distinto kilometraje.', 'Ocupa su espacio en memoria durante la ejecución.']],
    ['Encapsulamiento', 'ocultar los detalles internos y exponer solo una interfaz controlada', ['El km es privado y solo cambia con «recorrer».', 'Una clase cambia su estructura interna sin afectar a quienes la usan.', 'El conductor no toca el motor para acelerar.']],
    ['Constructor', 'método especial que inicializa un objeto al crearlo', ['Rechaza una placa vacía al inicio.', 'Se ejecuta con «new».', 'Garantiza que el objeto nazca válido.']],
    ['Cohesión', 'grado en que los elementos de un módulo sirven a un mismo propósito', ['La clase Factura solo trata de facturación.', 'Una clase "Utilidades" con de todo lo tiene bajo.', 'Cada método usa la mayoría de los atributos de la clase.']],
    ['Acoplamiento', 'grado de dependencia entre módulos', ['Cambiar una clase te obliga a cambiar otras diez.', 'La clase Pedido conoce los detalles internos de la base de datos.', 'Una interfaz reduce la dependencia entre dos partes.']],
    ['Invariante de clase', 'condición que todo objeto cumple siempre entre llamadas', ['El saldo de una cuenta nunca es negativo.', 'El km solo puede aumentar.', 'Una fecha de salida nunca antecede a la de ingreso.']]
  ],
  q: [
    ['¿Cuál diseño protege mejor la regla "el km no disminuye"?', 'Un km privado con un método recorrer(d) que valida', ['Un km público con un comentario', 'Un setter setKm(valor) sin validación', 'Una variable global km'], 'La regla debe vivir en un solo lugar y no se puede saltar.', 3],
    ['La clase Usuario tiene guardarEnBD(), enviarCorreo() y generarPDF(). ¿Qué problema tiene?', 'Baja cohesión: mezcla responsabilidades', ['Bajo acoplamiento', 'Es demasiado pequeña', 'Necesita más getters'], 'Cada una cambiaría por razones distintas.', 3],
    ['«pedido.cliente.direccion.ciudad.nombre» rompe:', 'La Ley de Demeter: habla solo con tus vecinos', ['El principio DRY', 'La inmutabilidad', 'La recursión'], 'Encadenar acopla tu código a toda esa estructura.', 4],
    ['Un objeto Rango(min, max) se crea con min > max. ¿Dónde se debe impedir?', 'En el constructor, lanzando un error', ['En cada método que lo usa', 'En la interfaz gráfica únicamente', 'En un comentario'], 'Si no puede existir inválido, no hay que comprobarlo en todas partes.', 4],
    { c: 'Dentro de la función, define una clase Contador con incrementar() y valor(), con estado privado. «probarContador(n)» debe llamar incrementar n veces y devolver valor().', f: 'probarContador', p: ['n'], t: [[[3], 3], [[0], 0]], sol: '  class Contador {\n    #c = 0;\n    incrementar() { this.#c++; }\n    valor() { return this.#c; }\n  }\n  const c = new Contador();\n  for (let i = 0; i < n; i++) c.incrementar();\n  return c.valor();', l: 2 },
    { c: 'Define dentro una clase Cuenta con depositar y retirar; retirar lanza error si no alcanza. «operar(ops)» recibe ["d",100] o ["r",50], devuelve el saldo final o "error" si algún retiro falla.', f: 'operar', p: ['ops'], t: [[[[['d', 100], ['r', 30]]], 70], [[[['r', 1]]], 'error'], [[[]], 0]], sol: "  class Cuenta {\n    #s = 0;\n    depositar(v) { this.#s += v; }\n    retirar(v) { if (v > this.#s) throw new Error('fondos'); this.#s -= v; }\n    saldo() { return this.#s; }\n  }\n  const c = new Cuenta();\n  try {\n    for (const [o, v] of ops) o === 'd' ? c.depositar(v) : c.retirar(v);\n  } catch (e) { return 'error'; }\n  return c.saldo();", l: 3 },
    { c: 'Crea una clase Rango cuyo constructor lanza error si min > max, con método contiene(x). «enRango(min, max, x)» devuelve true/false o "invalido".', f: 'enRango', p: ['min', 'max', 'x'], t: [[[1, 5, 3], true], [[1, 5, 9], false], [[5, 1, 3], 'invalido']], sol: "  class Rango {\n    constructor(a, b) { if (a > b) throw new Error('rango'); this.a = a; this.b = b; }\n    contiene(v) { return v >= this.a && v <= this.b; }\n  }\n  try { return new Rango(min, max).contiene(x); } catch (e) { return 'invalido'; }", l: 3 },
    { c: 'Crea una clase Vehiculo con km privado; recorrer(d) lanza error si d < 0. «kmFinal(ds)» recibe distancias y devuelve el km; si alguna es negativa devuelve −1.', f: 'kmFinal', p: ['ds'], t: [[[[10, 20]], 30], [[[5, -1]], -1], [[[]], 0]], sol: "  class Vehiculo {\n    #km = 0;\n    recorrer(d) { if (d < 0) throw new Error('d'); this.#km += d; }\n    get km() { return this.#km; }\n  }\n  const v = new Vehiculo();\n  try { ds.forEach(d => v.recorrer(d)); } catch (e) { return -1; }\n  return v.km;", l: 4 }
  ],
  gen: function (g) {
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9); g.trace(2, 'class C {\n  constructor(x) { this.x = x; }\n  sumar(y) { this.x += y; return this; }\n}\nconsole.log(new C(' + a + ').sumar(' + b + ').x);', a + ' + ' + b + '.'); });
    g.times(10, function (R) { var a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9); g.trace(3, 'class C {\n  constructor(x) { this.x = x; }\n}\nconst a = new C(' + a + ');\nconst b = new C(' + b + ');\na.x = ' + c + ';\nconsole.log(a.x, b.x);', 'Cada objeto tiene su propio estado.'); });
    g.times(6, function (R) { var a = R.int(1, 9), c = R.int(10, 19); g.trace(3, 'class C {\n  constructor(x) { this.x = x; }\n}\nconst a = new C(' + a + ');\nconst b = a;\nb.x = ' + c + ';\nconsole.log(a.x);', 'b es otra referencia al mismo objeto.'); });
  } });

S('m5', 'm5.oop2', { title: 'Herencia, polimorfismo y composición',
  ask: '¿Qué mecanismo se describe?',
  lesson: `
> **La idea en simple.** Un enchufe acepta cualquier aparato: una licuadora, una lámpara, un cargador. No le importa cuál, solo que tenga la forma correcta. Eso es **polimorfismo**: tratar cosas distintas de la misma manera porque comparten una interfaz.

~~~js
class Tarifa {
  calcular(dias) { throw new Error("Implementar"); }
}
class Normal extends Tarifa {
  calcular(dias) { return dias * 20; }
}
class VIP extends Tarifa {
  calcular(dias) { return dias * 15; }
}
// Este código no cambia aunque agregues tarifas
function cobrar(t, dias) { return t.calcular(dias); }
console.log(cobrar(new Normal(), 3), cobrar(new VIP(), 3));
~~~

## Herencia: es un
Un Camion **es un** Vehiculo. Reutiliza y extiende, pero crea un acoplamiento fuerte: un cambio en el padre afecta a todos los hijos.

## Composición: tiene un
Un Vehiculo **tiene un** Motor. Se arma con piezas que puedes cambiar. La regla clásica: **prefiere composición a herencia**.
~~~js
const conMotorElectrico = { arrancar: () => "silencio" };
const conMotorDiesel = { arrancar: () => "ruido" };
class Auto {
  constructor(motor) { this.motor = motor; }
  encender() { return this.motor.arrancar(); }
}
console.log(new Auto(conMotorElectrico).encender());
console.log(new Auto(conMotorDiesel).encender());
~~~

## Interfaces y clases abstractas
Una **interfaz** es un contrato sin implementación. Una **clase abstracta** deja parte hecha y parte por hacer. JavaScript las usa de manera informal (*duck typing*); Java y TypeScript las declaran.

## Puntos que no debes omitir
- **Sobrescritura:** un hijo redefine un método del padre. **Sobrecarga:** mismo nombre con distintos parámetros.
- El problema del cuadrado y el rectángulo: "es un" en matemática no siempre lo es en código.
- La herencia profunda (más de 2 o 3 niveles) es señal de mal diseño.

! Error común: heredar solo para reutilizar código. Si no es un verdadero "es un", usa composición.`,
  links: [['m5.oop1', 'la herencia se construye sobre las clases'], ['m3.cond', 'el polimorfismo reemplaza largos if/switch de tipos'], ['m5.solid', 'el principio de Liskov dice cuándo es válido heredar'], ['m5.pat2', 'Strategy es polimorfismo y composición aplicados']],
  read: 'Gamma et al., *Design Patterns*, introducción; Bloch, ítem "Favorece la composición".',
  terms: [
    ['Herencia', 'mecanismo por el que una clase adquiere las características de otra', ['«class Camion extends Vehiculo».', 'Una subclase reutiliza los métodos del padre.', 'Cambiar el padre puede romper todos los hijos.']],
    ['Polimorfismo', 'capacidad de tratar objetos distintos con una misma interfaz', ['«forma.area()» funciona para círculos y cuadrados.', 'Se elimina un switch por tipo.', 'Un mismo llamado ejecuta código distinto según el objeto.']],
    ['Composición', 'construir objetos a partir de otros objetos que contienen', ['Un Auto tiene un Motor intercambiable.', 'Se inyecta un servicio en vez de heredar de él.', 'Se cambia el comportamiento en ejecución.']],
    ['Interfaz', 'contrato que indica qué métodos debe ofrecer un tipo, sin implementarlos', ['«Pagable» exige un método pagar().', 'Dos clases sin relación pueden cumplirla.', 'Permite programar sin saber la clase concreta.']],
    ['Clase abstracta', 'clase incompleta que no se instancia directamente y deja métodos a sus hijos', ['Vehiculo implementa «encender» y deja «calcularConsumo» sin hacer.', 'Mezcla código compartido y métodos por definir.', 'Intentar «new» sobre ella da error en Java.']],
    ['Sobrescritura', 'redefinir en la subclase un método heredado', ['VIP cambia «calcular» de Tarifa.', 'Se llama a «super.metodo()» para ampliar.', 'El método se elige según el objeto real.']],
    ['Duck typing', 'si tiene los métodos necesarios, sirve, sin importar su clase', ['Una función acepta todo lo que tenga .calcular().', 'En JavaScript no hay declaración de interfaces.', '"Si camina como pato y hace cuac, es un pato."']]
  ],
  q: [
    ['¿Cuál relación es verdaderamente "es un"?', 'Camión es un Vehículo', ['Auto es un Motor', 'Pila es una Lista cuando solo se necesita push y pop', 'Pedido es un Cliente'], 'Las otras son "tiene un" o exponen operaciones que no corresponden.', 3],
    ['Hay un switch por tipo de vehículo repetido en 10 lugares. ¿Qué haces?', 'Mover cada caso a una clase con un método polimórfico', ['Copiar el switch a un undécimo lugar', 'Convertirlo en if', 'Agregar comentarios'], 'Cada tipo nuevo se agrega en un solo lugar.', 3],
    ['Cuadrado extiende Rectangulo. setAncho(5) cambia también el alto. ¿Qué se rompe?', 'El contrato que los clientes de Rectangulo esperan', ['La memoria', 'La compilación', 'Nada'], 'Es el ejemplo clásico de violar el principio de Liskov.', 4],
    ['Necesitas que un objeto cambie de comportamiento en ejecución. ¿Qué usas?', 'Composición con un objeto intercambiable', ['Herencia múltiple', 'Variables globales', 'Copiar la clase'], 'La herencia se fija al compilar; la composición se puede cambiar.', 4],
    { c: 'Crea clases Circulo y Cuadrado con método area(). «areaTotal(figs)» recibe [{t:"c",r:1},{t:"q",l:2}] y suma las áreas, con áreas de círculo usando 3 como π.', f: 'areaTotal', p: ['figs'], t: [[[[{ t: 'c', r: 1 }, { t: 'q', l: 2 }]], 7], [[[]], 0]], sol: "  class Circulo { constructor(r) { this.r = r; } area() { return 3 * this.r * this.r; } }\n  class Cuadrado { constructor(l) { this.l = l; } area() { return this.l * this.l; } }\n  return figs.map(f => f.t === 'c' ? new Circulo(f.r) : new Cuadrado(f.l)).reduce((s, f) => s + f.area(), 0);", l: 3 },
    { c: 'Crea Animal con hablar(); Perro y Gato lo sobrescriben. «coro(l)» recibe ["perro","gato"] y devuelve ["guau","miau"].', f: 'coro', p: ['l'], t: [[[['perro', 'gato']], ['guau', 'miau']], [[[]], []]], sol: "  class Animal { hablar() { return ''; } }\n  class Perro extends Animal { hablar() { return 'guau'; } }\n  class Gato extends Animal { hablar() { return 'miau'; } }\n  return l.map(x => (x === 'perro' ? new Perro() : new Gato()).hablar());", l: 2 },
    { c: 'Implementa con composición: Auto recibe un objeto motor con potencia. «potenciaTotal(ps)» crea un auto por cada potencia y devuelve la suma usando auto.potencia().', f: 'potenciaTotal', p: ['ps'], t: [[[[100, 50]], 150], [[[]], 0]], sol: '  class Motor { constructor(p) { this.p = p; } }\n  class Auto { constructor(m) { this.m = m; } potencia() { return this.m.p; } }\n  return ps.reduce((s, p) => s + new Auto(new Motor(p)).potencia(), 0);', l: 3 },
    { c: 'Usa herencia con super: Empleado tiene sueldo(); Gerente suma un bono de 500 al sueldo del padre. «planilla(l)» recibe [{t:"e",s:1000},{t:"g",s:2000}] y devuelve el total.', f: 'planilla', p: ['l'], t: [[[[{ t: 'e', s: 1000 }, { t: 'g', s: 2000 }]], 3500], [[[]], 0]], sol: "  class Empleado { constructor(s) { this.s = s; } sueldo() { return this.s; } }\n  class Gerente extends Empleado { sueldo() { return super.sueldo() + 500; } }\n  return l.reduce((a, e) => a + (e.t === 'g' ? new Gerente(e.s) : new Empleado(e.s)).sueldo(), 0);", l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var a = R.int(1, 5); g.trace(2, 'class A { v() { return ' + a + '; } }\nclass B extends A { v() { return super.v() * 2; } }\nconsole.log(new B().v());', 'super llama al método del padre: ' + a + ' × 2.'); });
    g.times(8, function (R) { var a = R.int(1, 5), b = R.int(6, 9); g.trace(2, 'class A { v() { return ' + a + '; } }\nclass B extends A { v() { return ' + b + '; } }\nconst x = [new A(), new B()];\nconsole.log(x.map(o => o.v()).join(" "));', 'Cada objeto ejecuta su propio método.'); });
    g.times(6, function (R) { var a = R.int(1, 5), b = R.int(6, 9); g.trace(3, 'class A {\n  v() { return this.w() + 1; }\n  w() { return ' + a + '; }\n}\nclass B extends A {\n  w() { return ' + b + '; }\n}\nconsole.log(new B().v());', 'Aunque v está en A, this es un B, así que usa su w: ' + b + ' + 1.'); });
  } });

S('m5', 'm5.solid', { title: 'Principios SOLID',
  ask: '¿Qué principio SOLID se viola o se aplica?',
  lesson: `
> **La idea en simple.** SOLID son cinco reglas para que un cambio pequeño siga siendo pequeño. Piensa en un taller bien organizado: cada herramienta hace una cosa, puedes agregar otras sin romper las que tienes y cualquier enchufe estándar sirve.

## Los cinco
| Letra | Principio | En una frase |
| S | Responsabilidad única | una clase, una razón para cambiar |
| O | Abierto/cerrado | agrega sin modificar lo que ya funciona |
| L | Sustitución de Liskov | un hijo debe poder reemplazar a su padre sin sorpresas |
| I | Segregación de interfaces | interfaces pequeñas, no una gigante |
| D | Inversión de dependencias | depende de abstracciones, no de detalles |

## Inversión de dependencias en código
~~~js
// Mal: la lógica queda atada a un proveedor concreto
// class Avisos { enviar(m){ new GmailApi().send(m) } }

// Bien: recibe cualquier objeto que sepa enviar
class Avisos {
  constructor(canal) { this.canal = canal; }
  notificar(m) { return this.canal.enviar(m); }
}
const correo = { enviar: m => "correo: " + m };
const prueba = { enviar: m => "falso: " + m };
console.log(new Avisos(correo).notificar("Listo"));
console.log(new Avisos(prueba).notificar("Listo"));   // fácil de probar
~~~

## Abierto/cerrado en la práctica
Si por cada tipo nuevo editas un «switch», no está cerrado a modificaciones. Si agregas una clase nueva con el mismo contrato, sí lo está.

## Principios cercanos
- **DRY:** no repitas conocimiento.
- **KISS:** lo simple gana.
- **YAGNI:** no construyas lo que aún no necesitas.

## Puntos que no debes omitir
- Son guías, no leyes. Aplicarlos a ciegas crea abstracciones inútiles.
- "Una razón para cambiar" significa un actor de negocio, no "un solo método".
- La **inyección de dependencias** es la técnica que permite aplicar D y hace fácil probar.

! Error común: crear una interfaz por cada clase "por si acaso". Abstrae cuando exista un segundo caso real o una necesidad de prueba.`,
  links: [['m5.oop2', 'L y O se apoyan en herencia y polimorfismo'], ['m13.styles', 'la arquitectura limpia es D aplicado a todo el sistema'], ['m14.unit', 'la inversión de dependencias permite probar con dobles'], ['m6.refactor', 'estos principios guían hacia dónde refactorizar']],
  read: 'Martin, *Clean Architecture*, parte III; Martin, *Agile Software Development*.',
  terms: [
    ['Responsabilidad única', 'una clase debe tener un solo motivo para cambiar', ['La clase Reporte calcula datos, pero también formatea en PDF, y cambia por dos áreas distintas.', 'Se separa el envío de correos de la lógica de negocio.', 'Contabilidad y RR. HH. tocan la misma clase y se rompen mutuamente.']],
    ['Abierto/cerrado', 'el software debe poder extenderse sin modificar el código existente', ['Agregar Yape no debería tocar la clase de pagos existente.', 'Un plugin añade funciones sin cambiar el núcleo.', 'Cada método de pago nuevo obliga a editar el mismo switch.']],
    ['Sustitución de Liskov', 'un subtipo debe poder usarse en lugar de su tipo base sin romper el programa', ['Pato de juguete extiende Pato, pero lanza error al comer.', 'Una subclase de Lista no admite agregar y lanza excepción.', 'Un método del hijo pide requisitos más estrictos que el padre.']],
    ['Segregación de interfaces', 'los clientes no deben depender de métodos que no usan', ['Una impresora simple se ve obligada a implementar enviarFax().', 'Una interfaz de 30 métodos se divide en tres pequeñas.', 'Una clase lanza «no soportado» en la mitad de sus métodos.']],
    ['Inversión de dependencias', 'los módulos de alto nivel dependen de abstracciones y no de detalles', ['El servicio de pedidos recibe un repositorio, no un cliente MySQL.', 'Cambias de proveedor de correo sin tocar la lógica.', 'En las pruebas se reemplaza la base de datos por una falsa.']],
    ['DRY', 'cada conocimiento debe tener una única representación en el sistema', ['El IGV 0.18 está copiado en 40 lugares.', 'Una regla cambia y se olvidó actualizarla en una copia.', 'Se extrae una función compartida para una validación repetida.']],
    ['YAGNI', 'no implementes algo hasta que realmente se necesite', ['Alguien construye un soporte multimoneda que nadie pidió.', 'Se añade una capa genérica "por si algún día".', 'Se elimina un sistema de plugins sin ningún plugin.']]
  ],
  q: [
    ['¿Qué letra de SOLID facilita más probar con una base de datos falsa?', 'D', ['S', 'L', 'I'], 'Si dependes de una abstracción, puedes inyectar un doble.', 3],
    ['Dos fragmentos idénticos por casualidad, pero que representan reglas distintas. ¿Se deben unir?', 'No: DRY trata de conocimiento, no de texto igual', ['Sí, siempre', 'Sí, con herencia', 'Sí, con una variable global'], 'Unirlos los acopla y cambiarán por razones diferentes.', 4],
    ['Una función exige ahora que el monto sea múltiplo de 10 en la subclase, y el padre aceptaba cualquiera. ¿Qué se viola?', 'Liskov: fortalece las precondiciones', ['Abierto/cerrado', 'DRY', 'KISS'], 'Un hijo no puede pedir más ni ofrecer menos que su padre.', 4],
    { c: 'Aplica abierto/cerrado: crea un objeto de estrategias {normal, vip, empleado} con funciones. «cobro(tipo, dias)»: normal 20×d, vip 15×d, empleado 0. Debe resolverse sin if ni switch.', f: 'cobro', p: ['tipo', 'dias'], t: [[['normal', 2], 40], [['vip', 2], 30], [['empleado', 9], 0]], sol: '  const t = { normal: d => 20 * d, vip: d => 15 * d, empleado: () => 0 };\n  return t[tipo](dias);', l: 3 },
    { c: 'Aplica inversión de dependencias: «notificarTodos(usuarios)» debe crear internamente un canal falso con enviar(u) que devuelve "ok:" + u, y un servicio que lo reciba por constructor. Devuelve las respuestas.', f: 'notificarTodos', p: ['usuarios'], t: [[[['a', 'b']], ['ok:a', 'ok:b']], [[[]], []]], sol: "  class Servicio { constructor(c) { this.c = c; } avisar(us) { return us.map(u => this.c.enviar(u)); } }\n  return new Servicio({ enviar: u => 'ok:' + u }).avisar(usuarios);", l: 3 }
  ],
  gen: function (g) {
    var casos = [
      ['La clase Vehiculo calcula impuestos y además se guarda sola en la base de datos.', 'Responsabilidad única'],
      ['Agregar un tipo de vehículo requiere modificar seis métodos con if.', 'Abierto/cerrado'],
      ['La clase Moto hereda de Vehiculo y lanza error en abrirPuertas().', 'Sustitución de Liskov'],
      ['La interfaz Revisable obliga a toda clase a tener 25 métodos que casi nadie usa.', 'Segregación de interfaces'],
      ['RevisionService crea por dentro un PostgresConexion con la contraseña escrita.', 'Inversión de dependencias'],
      ['Una clase Pedido arma su HTML y además sus reglas de descuento.', 'Responsabilidad única'],
      ['Cada nuevo método de pago obliga a editar la misma función procesarPago.', 'Abierto/cerrado'],
      ['Una subclase de lista ordena en silencio al agregar, y quienes esperaban orden de llegada fallan.', 'Sustitución de Liskov'],
      ['Un cliente que solo lee reportes depende de una interfaz con métodos de escritura.', 'Segregación de interfaces'],
      ['El módulo de negocio importa directamente la biblioteca del proveedor de SMS.', 'Inversión de dependencias']
    ];
    var ops = ['Responsabilidad única', 'Abierto/cerrado', 'Sustitución de Liskov', 'Segregación de interfaces', 'Inversión de dependencias'];
    casos.forEach(function (c, i) { g.mcq(i < 5 ? 3 : 4, '¿Qué principio SOLID se viola?\n' + c[0], c[1], g.R.sample(ops.filter(function (o) { return o !== c[1]; }), 3), 'Es una violación de ' + c[1] + '.'); });
  } });

S('m5', 'm5.pat1', { title: 'Patrones creacionales y estructurales',
  ask: '¿Qué patrón resuelve este problema?',
  lesson: `
> **La idea en simple.** Un patrón es una receta probada para un problema que se repite. No es código para copiar: es un nombre y una idea que el equipo comparte. Decir "usemos un adaptador" ahorra media hora de explicación.

## Creacionales: cómo se crean objetos
- **Factory Method:** un método decide qué clase concreta crear.
- **Builder:** construye objetos complejos paso a paso.
- **Singleton:** una sola instancia global. Úsalo con cuidado: dificulta las pruebas.
~~~js
function crearTarifa(tipo) {               // Factory
  const tipos = { normal: { dia: 20 }, vip: { dia: 15 } };
  if (!tipos[tipo]) throw new Error("Tarifa desconocida");
  return tipos[tipo];
}
console.log(crearTarifa("vip").dia);

class Consulta {                           // Builder
  partes = [];
  desde(t) { this.partes.push("FROM " + t); return this; }
  donde(c) { this.partes.push("WHERE " + c); return this; }
  crear() { return "SELECT * " + this.partes.join(" "); }
}
console.log(new Consulta().desde("autos").donde("km > 0").crear());
~~~

## Estructurales: cómo se combinan
- **Adapter:** convierte una interfaz en otra (un adaptador de enchufe).
- **Facade:** una entrada simple a un subsistema complejo.
- **Decorator:** añade comportamiento envolviendo un objeto.
- **Proxy:** un sustituto que controla el acceso (caché, permisos).
- **Composite:** trata igual a un elemento y a un grupo (archivo y carpeta).
~~~js
// Decorator: añade registro sin tocar la función original
function conRegistro(f) {
  return (...a) => { console.log("llamada", a); return f(...a); };
}
const suma = conRegistro((a, b) => a + b);
console.log(suma(2, 3));
~~~

## Puntos que no debes omitir
- Primero aparece el problema, luego el patrón. Forzar patrones es un antipatrón.
- Adapter cambia la interfaz; Decorator la mantiene y añade; Proxy la mantiene y controla.
- Los lenguajes modernos vuelven innecesarios algunos patrones (una función sustituye a muchos Strategy).

! Error común: usar Singleton como variable global con traje. Prefiere inyectar la dependencia.`,
  links: [['m5.solid', 'los patrones aplican SOLID en situaciones concretas'], ['m5.pat2', 'los de comportamiento completan el catálogo'], ['m13.styles', 'el adaptador es la pieza central de la arquitectura hexagonal']],
  read: 'Gamma et al., *Design Patterns*; Freeman y Robson, *Head First Design Patterns*.',
  terms: [
    ['Factory Method', 'delegar en un método la decisión de qué clase concreta crear', ['«crearTarifa("vip")» devuelve el objeto correcto.', 'Se evita tener «new» regados en todo el código.', 'Un parser decide qué objeto crear según la extensión del archivo.']],
    ['Builder', 'construir paso a paso un objeto complejo', ['Evita un constructor con doce parámetros.', 'Encadenas «.desde().donde().ordenar()» para armar una consulta.', 'Una petición HTTP se arma con headers y cuerpo opcionales.']],
    ['Singleton', 'garantizar que exista una sola instancia accesible globalmente', ['Hay una única conexión compartida con el registro de logs.', 'Dos pruebas se contaminan porque comparten el mismo estado global.', 'Un constructor privado con un método getInstance.']],
    ['Adapter', 'convertir la interfaz de una clase en la que el cliente espera', ['Una pasarela de pago usa pay() y tu sistema espera cobrar().', 'Un cable de USB-C a HDMI.', 'Envuelves una biblioteca XML antigua para que entregue JSON.']],
    ['Facade', 'ofrecer una entrada simple a un subsistema complejo', ['«reservar()» llama por dentro a inventario, pagos y correo.', 'El botón de encender del auto oculta muchas operaciones.', 'Un cliente no necesita conocer doce clases internas.']],
    ['Decorator', 'añadir comportamiento envolviendo un objeto sin cambiar su interfaz', ['Se agrega registro a una función sin editarla.', 'Se le pone compresión a un flujo de datos.', 'Un café con leche y canela se va envolviendo.']],
    ['Proxy', 'objeto sustituto que controla el acceso a otro', ['Carga una imagen solo cuando se ve.', 'Una caché responde antes de ir al servidor.', 'Revisa permisos antes de llamar al objeto real.']]
  ],
  q: [
    ['Tu código usa enviar(msg) y el proveedor nuevo ofrece sendMessage(to, body). ¿Qué patrón aplicas?', 'Adapter', ['Singleton', 'Builder', 'Observer'], 'Adapta una interfaz a otra sin tocar a ninguna de las dos.', 3],
    ['Quieres sumar caché a un servicio sin tocarlo ni cambiar su interfaz. ¿Qué es lo más adecuado?', 'Proxy o Decorator', ['Factory', 'Builder', 'Singleton'], 'Envuelven al objeto y conservan la misma interfaz.', 3],
    ['¿Cuál es la principal desventaja de Singleton?', 'Introduce estado global que dificulta las pruebas', ['Consume demasiada memoria', 'Solo funciona en Java', 'Es lento'], 'Oculta dependencias y acopla el código.', 4],
    ['Facade contra Adapter:', 'Facade simplifica; Adapter hace compatible', ['Son lo mismo', 'Adapter simplifica; Facade traduce', 'Ambos crean objetos'], 'La intención es diferente aunque la estructura sea parecida.', 4],
    { c: 'Implementa un Decorator: «contarLlamadas(veces)» crea internamente una función con contador usando un envoltorio, la llama "veces" veces y devuelve el conteo.', f: 'contarLlamadas', p: ['veces'], t: [[[3], 3], [[0], 0]], sol: '  let c = 0;\n  const envolver = f => (...a) => { c++; return f(...a); };\n  const g = envolver(x => x);\n  for (let i = 0; i < veces; i++) g(i);\n  return c;', l: 3 },
    { c: 'Implementa un Proxy de caché: «cuantasEjecuciones(args)» envuelve una función cuadrado para que no recalcule argumentos repetidos, la llama con cada elemento y devuelve cuántas veces se ejecutó de verdad.', f: 'cuantasEjecuciones', p: ['args'], t: [[[[2, 2, 3]], 2], [[[]], 0], [[[1, 1, 1]], 1]], sol: '  let n = 0;\n  const c = new Map();\n  const real = x => { n++; return x * x; };\n  const prox = x => { if (!c.has(x)) c.set(x, real(x)); return c.get(x); };\n  args.forEach(prox);\n  return n;', l: 4 },
    { c: 'Implementa Composite: «tamano(nodo)» recibe {size} para un archivo o {hijos:[...]} para una carpeta y devuelve el tamaño total.', f: 'tamano', p: ['nodo'], t: [[[{ size: 5 }], 5], [[{ hijos: [{ size: 1 }, { hijos: [{ size: 2 }] }] }], 3], [[{ hijos: [] }], 0]], sol: '  return nodo.hijos ? nodo.hijos.reduce((s, h) => s + tamano(h), 0) : nodo.size;', l: 4 }
  ],
  gen: function (g) {
    var c = [
      ['Una biblioteca de terceros entrega fechas en un formato que tu código no entiende y no puedes editarla.', 'Adapter'], ['Para pagar hay que llamar a seis servicios en orden y quieres ocultarlo.', 'Facade'], ['Un objeto Reporte tiene 15 opciones y la mayoría son opcionales.', 'Builder'], ['Según el país se debe crear un calculador de impuestos distinto.', 'Factory Method'], ['Quieres imágenes que carguen solo al hacerse visibles.', 'Proxy'], ['Quieres sumar cifrado y luego compresión a un flujo, en cualquier combinación.', 'Decorator'], ['Solo debe existir un objeto que represente la configuración en todo el proceso.', 'Singleton']
    ];
    var n = ['Adapter', 'Facade', 'Builder', 'Factory Method', 'Proxy', 'Decorator', 'Singleton'];
    c.forEach(function (x) { g.mcq(3, 'Elige el patrón para este caso:\n' + x[0], x[1], g.R.sample(n.filter(function (o) { return o !== x[1]; }), 3), 'Encaja con la intención de ' + x[1] + '.'); });
  } });

S('m5', 'm5.pat2', { title: 'Patrones de comportamiento',
  ask: '¿Qué patrón de comportamiento se usa?',
  lesson: `
> **La idea en simple.** Estos patrones organizan cómo se **comunican** los objetos. Observer es la suscripción a un canal de YouTube: el canal no sabe quién eres, solo avisa y los suscritos reaccionan.

## Strategy
Encapsula algoritmos intercambiables.
~~~js
const estrategias = {
  porFecha: (a, b) => a.fecha - b.fecha,
  porKm: (a, b) => a.km - b.km
};
const autos = [{ fecha: 2, km: 9 }, { fecha: 1, km: 20 }];
console.log([...autos].sort(estrategias.porKm));
~~~

## Observer
Un objeto avisa a sus suscriptores cuando cambia.
~~~js
class Eventos {
  subs = [];
  suscribir(f) { this.subs.push(f); }
  emitir(d) { this.subs.forEach(f => f(d)); }
}
const e = new Eventos();
e.suscribir(d => console.log("Correo:", d));
e.suscribir(d => console.log("Panel:", d));
e.emitir("Auto revisado");
~~~

## Otros que debes conocer
- **State:** el objeto cambia de comportamiento según su estado (Pendiente, Revisado, Entregado). Elimina condicionales repetidos.
- **Command:** convierte una acción en un objeto. Permite deshacer, colas y registro.
- **Template Method:** define el esqueleto y deja pasos a las subclases.
- **Iterator:** recorre sin exponer la estructura.
- **Chain of Responsibility:** una cadena de manejadores (los middleware de Express).

## Puntos que no debes omitir
- Strategy y State se parecen en la forma: Strategy lo elige el cliente; en State los estados cambian entre sí.
- Observer es la base de las interfaces reactivas y de la arquitectura orientada a eventos.
- Cuidado con Observer: suscriptores que no se retiran causan fugas de memoria.

## Antipatrones
Código espagueti, objeto Dios, copiar y pegar, optimización prematura, martillo de oro (usar siempre la misma herramienta).

! Error común: ver Observer en todo. Muchos eventos encadenados hacen muy difícil seguir qué ocurre.`,
  links: [['m5.oop2', 'Strategy es polimorfismo puro'], ['m9.async', 'los eventos del navegador son Observer'], ['m13.dist', 'la arquitectura de eventos lleva Observer a todo un sistema'], ['m4.stack', 'Command y una pila dan deshacer']],
  read: 'Gamma et al., capítulo 5; Freeman y Robson.',
  terms: [
    ['Strategy', 'encapsular algoritmos intercambiables tras una misma interfaz', ['Elegir entre calcular tarifa normal o VIP en ejecución.', 'Pasar una función de comparación a sort.', 'Cambiar el algoritmo de compresión sin tocar al cliente.']],
    ['Observer', 'avisar automáticamente a los suscriptores cuando algo cambia', ['Varias pantallas reaccionan cuando se aprueba una revisión.', '«addEventListener» en el navegador.', 'Un canal notifica sin conocer a sus seguidores.']],
    ['State', 'cambiar el comportamiento de un objeto según su estado interno', ['Un pedido "enviado" no se puede editar y uno "borrador" sí.', 'Se elimina un switch por estado repetido.', 'Un semáforo cambia de reglas según su color actual.']],
    ['Command', 'representar una acción como un objeto', ['Permite deshacer y rehacer.', 'Una lista de tareas pendientes en cola.', 'Un botón ejecuta un objeto sin saber qué hace.']],
    ['Template Method', 'definir el esqueleto de un algoritmo y delegar pasos en subclases', ['Todo reporte lee, formatea y guarda; solo cambia el formato.', 'Un framework llama tus métodos en un orden fijo.', 'Una clase base define los pasos y las hijas los rellenan.']],
    ['Iterator', 'recorrer una colección sin exponer su estructura interna', ['«for...of» funciona igual en listas y en Set.', 'Un generador entrega valores uno a uno.', 'Se recorre un árbol con un «next()».']],
    ['Chain of Responsibility', 'pasar una petición por una cadena de manejadores', ['Los middleware revisan autenticación, luego registro y luego la ruta.', 'Soporte de nivel 1 escala a nivel 2.', 'Cada filtro decide atender o pasar al siguiente.']]
  ],
  q: [
    ['Los filtros de Express (next()) son un ejemplo de:', 'Chain of Responsibility', ['Singleton', 'Builder', 'Adapter'], 'Cada middleware atiende o pasa la petición.', 3],
    ['Un pedido tiene estado y 12 métodos con switch por estado. ¿Qué patrón ayuda?', 'State', ['Singleton', 'Facade', 'Factory'], 'Cada estado se vuelve una clase con su comportamiento.', 3],
    ['¿Qué patrón eliges para deshacer múltiples acciones?', 'Command con una pila', ['Observer', 'Singleton', 'Proxy'], 'Cada comando sabe ejecutarse y revertirse.', 4],
    ['¿Cuál riesgo es típico de Observer?', 'Fugas de memoria por suscriptores nunca retirados', ['No admite múltiples suscriptores', 'Requiere clases abstractas', 'Bloquea la red'], 'El emisor conserva referencias a los suscritos.', 4],
    { c: 'Implementa un emisor: «emitir(n)» crea un Observer con 2 suscriptores que suman 1 a un contador cada uno, emite n veces y devuelve el contador.', f: 'emitir', p: ['n'], t: [[[3], 6], [[0], 0]], sol: '  let c = 0;\n  const s = [() => c++, () => c++];\n  for (let i = 0; i < n; i++) s.forEach(f => f());\n  return c;', l: 3 },
    { c: 'Implementa State: «transicion(estado, accion)» con reglas pendiente+aprobar=revisado, revisado+entregar=entregado; una transición inválida devuelve "invalida". Usa un objeto, no if.', f: 'transicion', p: ['estado', 'accion'], t: [[['pendiente', 'aprobar'], 'revisado'], [['revisado', 'entregar'], 'entregado'], [['pendiente', 'entregar'], 'invalida'], [['entregado', 'aprobar'], 'invalida']], sol: "  const t = { pendiente: { aprobar: 'revisado' }, revisado: { entregar: 'entregado' }, entregado: {} };\n  return t[estado][accion] || 'invalida';", l: 3 },
    { c: 'Implementa Command: «deshacer(ops)» recibe ["sumar",5], ["restar",2] o ["deshacer"] y devuelve el valor final desde 0; deshacer revierte la última operación vigente.', f: 'deshacer', p: ['ops'], t: [[[[['sumar', 5], ['restar', 2]]], 3], [[[['sumar', 5], ['deshacer']]], 0], [[[['sumar', 1], ['sumar', 2], ['deshacer'], ['deshacer']]], 0], [[[['deshacer']]], 0]], sol: "  let v = 0;\n  const p = [];\n  for (const [o, x] of ops) {\n    if (o === 'deshacer') { if (p.length) v -= p.pop(); }\n    else { const d = o === 'sumar' ? x : -x; v += d; p.push(d); }\n  }\n  return v;", l: 4 },
    { c: 'Implementa Chain of Responsibility: «procesar(cadena, x)» recibe la lista de nombres de filtros: "doble" multiplica por 2, "corta" detiene la cadena, "mas1" suma 1. Devuelve el valor final.', f: 'procesar', p: ['cadena', 'x'], t: [[[['doble', 'mas1'], 2], 5], [[['corta', 'doble'], 2], 2], [[[], 7], 7]], sol: "  const f = { doble: v => v * 2, mas1: v => v + 1 };\n  for (const n of cadena) {\n    if (n === 'corta') break;\n    x = f[n](x);\n  }\n  return x;", l: 4 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var a = R.int(1, 5), b = R.int(2, 4); g.trace(3, 'const est = {\n  a: x => x + ' + a + ',\n  b: x => x * ' + b + '\n};\nconst f = est["' + R.pick(['a', 'b']) + '"];\nconsole.log(f(10));', 'Se elige la función en ejecución: es Strategy.'); });
    g.times(4, function (R) { var n = R.int(2, 4); g.trace(3, 'const s = [];\nfor (let i = 0; i < ' + n + '; i++) s.push(x => x + i);\nconsole.log(s.map(f => f(1)).join(" "));', 'Cada suscriptor recuerda su i.'); });
  } });
})();
