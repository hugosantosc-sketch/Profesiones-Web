(function () {
var D = SDC.D;
SDC.XM('m5', { prof: true });

D('m5.oop1', `## Invariantes de clase
Un objeto bien diseñado protege un **invariante**: una condición que debe cumplirse siempre que alguien lo observe desde afuera. En una «Estadia» de PatioApp, el invariante podría ser "la salida, si existe, es posterior a la entrada, y el monto es 0 mientras la unidad sigue en el patio". El constructor lo establece, y cada método público lo preserva: puede romperlo temporalmente dentro de su ejecución, pero debe restaurarlo antes de devolver el control. Bertrand Meyer llamó a esta disciplina **diseño por contrato**, y es la razón más profunda del encapsulamiento: si cualquier código pudiera escribir los campos, nadie podría garantizar el invariante.
~~~js
class Estadia {
  #entrada; #salida = null;
  constructor(entrada) { if (!(entrada instanceof Date)) throw new TypeError('entrada inválida'); this.#entrada = entrada; }
  cerrar(salida) {
    if (this.#salida) throw new Error('la estadía ya está cerrada');
    if (salida < this.#entrada) throw new RangeError('la salida no puede ser anterior a la entrada');
    this.#salida = salida;                      // el invariante se mantiene
  }
  get abierta() { return this.#salida === null; }
  dias() { const fin = this.#salida ?? new Date(); return Math.max(1, Math.ceil((fin - this.#entrada) / 86400000)); }
}
~~~
## Identidad, estado y comportamiento
Grady Booch resumió un objeto en tres rasgos: **estado** (los datos que guarda), **comportamiento** (lo que sabe hacer) e **identidad** (lo que lo distingue de otro con el mismo estado). Dos unidades con la misma placa y el mismo color pueden ser el mismo vehículo o dos registros duplicados: decidir qué define la identidad es una decisión de diseño, no un detalle técnico. En JavaScript, «===» entre objetos compara identidad (la misma referencia), no contenido; para comparar por contenido hay que escribir un método «equals» o usar objetos de valor inmutables.

## Getters, setters y la anemia
Un error frecuente es encapsular "por cumplir": campos privados con un getter y un setter para cada uno. Eso no protege nada, porque cualquiera puede poner cualquier valor. Martin Fowler llamó **modelo de dominio anémico** al diseño en el que los objetos solo tienen datos y toda la lógica vive en "servicios" externos: es programación procedimental disfrazada de objetos. La alternativa es exponer **operaciones con significado** («cerrar», «aplicarConvenio», «trasladarA») que validen y mantengan el invariante, y ofrecer lectura solo de lo que otros necesitan saber.

## Inmutabilidad
Un objeto que no cambia después de creado no necesita defender su invariante más que una vez, puede compartirse sin miedo entre partes del programa e hilos, y es fácil de razonar. Joshua Bloch, en *Effective Java*, recomienda "minimizar la mutabilidad": hacer inmutables los objetos de valor (montos, rangos de fechas, placas) y reservar la mutabilidad para las entidades cuyo estado de verdad evoluciona. En JavaScript, «Object.freeze» y los campos privados sin setters ayudan; los métodos que "modifican" devuelven un objeto nuevo.`);

D('m5.oop2', `## Mixins y rasgos
Entre la herencia simple y la composición hay una tercera vía: los **mixins**, piezas de comportamiento que se "mezclan" en varias clases sin formar una jerarquía. Nacieron en Flavors, un sistema de objetos de Lisp del MIT (1980), y hoy existen en Ruby (módulos), Scala y PHP (*traits*) y Rust (*traits*, más cercanos a interfaces con implementación por defecto). En JavaScript se escriben como funciones que reciben una clase y devuelven una subclase:
~~~js
const Auditable = Base => class extends Base {
  registrar(evento) { (this.historial ??= []).push({ evento, en: new Date().toISOString() }); }
};
const Tarifable = Base => class extends Base {
  monto(dias, tarifa = 20) { return dias * tarifa; }
};
class Unidad { constructor(placa) { this.placa = placa; } }
class UnidadPatio extends Auditable(Tarifable(Unidad)) {}
const u = new UnidadPatio('ABC-123');
u.registrar('ingreso'); console.log(u.monto(3), u.historial.length);   // 60 1
~~~
Los mixins resuelven la repetición, pero tienen riesgos: dos mixins pueden definir el mismo método y el último gana en silencio. Los *traits* de Nathanael Schärli y otros (2003) agregaron reglas explícitas para resolver esos conflictos.

## Herencia múltiple y el problema del diamante
C++ y Python permiten heredar de varias clases. El problema aparece cuando B y C heredan de A, y D hereda de B y de C: ¿D tiene una copia de A o dos? ¿Qué versión de un método de A, sobrescrito por B y por C, se ejecuta? C++ lo resuelve con herencia virtual; Python con un **orden de resolución de métodos** (MRO) calculado por el algoritmo de linealización C3 (de Kim Barrett y otros, 1996, adoptado por Python 2.3). Java y C# prohibieron la herencia múltiple de clases y la permitieron solo de interfaces, precisamente para evitarlo.

## Covarianza y contravarianza
Cuando una subclase sobrescribe un método, ¿qué tipos puede aceptar y devolver? La regla segura, que se deriva del principio de sustitución de Liskov, es: los **parámetros** pueden ser más generales (contravarianza) y el **resultado** puede ser más específico (covarianza). Si «Tarifa.calcular(Unidad)» devuelve «Monto», una subclase puede aceptar cualquier «Vehiculo» y devolver un «MontoConIGV», pero no exigir solo «Camion». TypeScript, Java y C# aplican estas reglas a los genéricos con distintos grados de rigor: TypeScript, por ejemplo, trata los parámetros de métodos de forma bivariante por pragmatismo, lo que deja pasar algunos errores.

## Cuándo la jerarquía sí paga
Las jerarquías poco profundas y estables funcionan bien: los widgets de una interfaz gráfica, los nodos de un árbol de sintaxis, los tipos de excepción. La señal de alarma es una jerarquía que crece en dos dimensiones a la vez (tipo de vehículo × tipo de cliente): eso produce una explosión de subclases que se resuelve separando las dimensiones con composición (el patrón Bridge).`);

D('m5.solid', `## Cohesión medida
La responsabilidad única tiene una versión cuantitativa: la métrica **LCOM** (*Lack of Cohesion of Methods*), propuesta por Shyam Chidamber y Chris Kemerer en 1994 dentro de su conjunto de métricas para diseño orientado a objetos. La idea: si los métodos de una clase se dividen en grupos que usan campos disjuntos, la clase en realidad son varias. Una clase «Patio» cuyos métodos de tarifas solo usan «tarifas» y cuyos métodos de espacios solo usan «espacios» tiene baja cohesión: pide separarse en «Tarifario» y «MapaDeEspacios». Las mismas métricas incluyen la profundidad del árbol de herencia (DIT), el número de hijos (NOC) y el acoplamiento entre objetos (CBO); estudios empíricos posteriores, como el de Victor Basili y otros (1996), encontraron que valores altos de CBO y LCOM predicen clases con más defectos.

## SOLID en un caso completo
Una función «facturar(estadia)» que calcula el monto, genera el XML del comprobante, lo envía a SUNAT y manda un correo viola varios principios a la vez. La refactorización, paso a paso:
1. **S:** separar «CalculadoraDeTarifas», «GeneradorDeComprobante», «EnvioSunat» y «Notificador».
2. **O:** las reglas de tarifa (convenio, camión, nocturna) se vuelven estrategias; una regla nueva es una clase nueva, no un «if» más.
3. **L:** toda regla respeta el contrato "devuelve un monto mayor o igual a cero"; una regla que lanza excepción para ciertos vehículos rompe la sustitución.
4. **I:** el notificador recibe una interfaz «enviar(destinatario, mensaje)», no el cliente completo de correo con cuarenta métodos.
5. **D:** el caso de uso «Facturar» depende de las abstracciones; el arranque de la aplicación decide qué implementaciones concretas usar (la unidad de inyección de dependencias lo desarrolla).
El resultado tiene más archivos, pero cada uno se prueba solo, y cambiar de proveedor de facturación electrónica toca una sola clase.

## Arquitectura limpia y hexagonal
Los mismos principios, aplicados a escala de sistema, dan lugar a la **arquitectura hexagonal** (puertos y adaptadores, de Alistair Cockburn, 2005) y a la **arquitectura limpia** de Robert Martin (2012): el dominio en el centro, sin depender de frameworks, bases de datos ni interfaces; alrededor, adaptadores que implementan los puertos que el dominio define. La regla de dependencia apunta siempre hacia adentro. Lo verás en profundidad en el curso de arquitectura de software.`);

D('m5.pat1', `## Builder y objetos con muchos parámetros
Cuando un objeto tiene muchos parámetros opcionales, los constructores con diez argumentos son ilegibles: «new Comprobante('B001', 23, 'boleta', null, null, true, 18, ...)». El patrón **Builder** construye paso a paso con métodos de nombre claro y valida todo al final:
~~~js
class ComprobanteBuilder {
  #d = { tipo: 'boleta', igv: 0.18, items: [] };
  serie(s) { this.#d.serie = s; return this; }
  numero(n) { this.#d.numero = n; return this; }
  factura(ruc) { this.#d.tipo = 'factura'; this.#d.ruc = ruc; return this; }
  item(desc, monto) { this.#d.items.push({ desc, monto }); return this; }
  build() {
    if (!this.#d.serie || !this.#d.numero) throw new Error('serie y número son obligatorios');
    if (this.#d.tipo === 'factura' && !/^\\d{11}$/.test(this.#d.ruc || '')) throw new Error('RUC inválido');
    const total = this.#d.items.reduce((s, i) => s + i.monto, 0);
    return Object.freeze({ ...this.#d, total });
  }
}
const c = new ComprobanteBuilder().serie('F001').numero(57).factura('20123456789').item('Estadía 3 días', 60).build();
console.log(c.tipo, c.total);                     // factura 60
~~~
En JavaScript, un objeto de opciones con nombres («new Comprobante({ serie, numero, tipo })») resuelve gran parte del problema; Builder sigue siendo útil cuando la construcción tiene pasos y validaciones entre campos.

## Singleton, con cuidado
**Singleton** garantiza una sola instancia global. Es el patrón más criticado del catálogo: oculta dependencias (cualquier función puede usarlo sin declararlo), dificulta las pruebas (el estado global persiste entre pruebas) y complica la concurrencia. Erich Gamma, uno de sus autores, dijo en una entrevista de 2009 que lo quitaría del libro. En JavaScript, un módulo ya es un singleton natural; lo recomendable es crear la instancia única en el arranque y **pasarla** a quien la necesite, en lugar de que cada uno la busque.

## Patrones en las bibliotecas que ya usas
Los patrones están por todas partes: los middlewares de Express son una cadena de responsabilidad; «fetch» con «AbortController» usa Command; los adaptadores de bases de datos de un ORM son Adapter; «Proxy» de JavaScript implementa literalmente el patrón Proxy en el lenguaje; React usa Composite para su árbol de componentes. Reconocerlos acelera la lectura de código ajeno, que es la mayor parte del trabajo.`);

D('m5.pat2', `## Observer, eventos y fugas de memoria
Observer tiene una trampa conocida: el sujeto guarda referencias a sus observadores, así que un observador que se olvida de desuscribirse **nunca se libera**, aunque el resto del programa ya no lo use. Es el problema del **oyente caducado** (*lapsed listener*), una causa clásica de fugas de memoria en aplicaciones de interfaz gráfica. La disciplina es que quien se suscribe devuelva una función para cancelar, y llamarla al destruir el componente:
~~~js
class Bus {
  #oyentes = new Map();
  on(evento, fn) {
    if (!this.#oyentes.has(evento)) this.#oyentes.set(evento, new Set());
    this.#oyentes.get(evento).add(fn);
    return () => this.#oyentes.get(evento).delete(fn);      // cancelar la suscripción
  }
  emit(evento, dato) { for (const fn of this.#oyentes.get(evento) ?? []) fn(dato); }
}
const bus = new Bus();
const cancelar = bus.on('unidad:salida', u => console.log('liberar espacio', u.espacio));
bus.emit('unidad:salida', { placa: 'ABC-123', espacio: 'A-07' });
cancelar();                                                 // al destruir el panel
bus.emit('unidad:salida', { placa: 'XYZ-987', espacio: 'B-02' });   // ya no imprime
~~~
Los frameworks lo automatizan: «useEffect» en React devuelve la función de limpieza, y los observables de RxJS se cancelan con «unsubscribe».

## De Observer a la programación reactiva
Si los eventos son un flujo en el tiempo, se pueden transformar como un arreglo: filtrar, mapear, combinar, agrupar por ventanas. Esa es la idea de las **Reactive Extensions** (Rx), creadas por Erik Meijer en Microsoft hacia 2009, que unen Observer con Iterator. En PatioApp, "alertar si en cinco minutos ingresan más de 20 unidades a la misma sede" es una línea en estilo reactivo y una pequeña máquina de estados a mano.

## Visitor y el problema de la expresión
**Visitor** permite agregar operaciones nuevas a una jerarquía de clases sin modificarlas: cada operación es un "visitante" con un método por tipo de nodo. Es habitual en compiladores (recorrer el árbol de sintaxis para verificar tipos, optimizar o generar código). Philip Wadler bautizó en 1998 el **problema de la expresión**: con objetos es fácil agregar tipos nuevos y difícil agregar operaciones; con funciones y coincidencia de patrones, lo contrario. Visitor invierte la facilidad en lenguajes orientados a objetos. Saber esto ayuda a elegir: si las operaciones cambian más que los tipos, conviene Visitor o un estilo funcional; si los tipos cambian más, polimorfismo clásico.`);
})();
