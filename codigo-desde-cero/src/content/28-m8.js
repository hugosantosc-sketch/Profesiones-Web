/* ===== MÓDULO 8 — Programación orientada a objetos y diseño ===== */
CDC.registrar({
  id: 'm8',
  nivel: 'Avanzado',
  titulo: 'Objetos y diseño de software',
  resumen: 'De los arreglos paralelos a las clases, los cuatro pilares de la POO, los principios SOLID y los patrones que resuelven problemas recurrentes.',
  intro: '<p>En el módulo 4 llegaste a siete arreglos paralelos y sentiste el problema: añadir un dato obliga a tocar ' +
    'siete sitios, y ordenar uno sin los demás corrompe todo. La programación orientada a objetos nace exactamente de ' +
    'ese dolor.</p><p>Este módulo no es un catálogo de sintaxis: es sobre <strong>cómo organizar un programa para que ' +
    'siga siendo modificable dentro de dos años</strong>, que es el problema real del software.</p>',
  temas: [

    {
      id: 'm8-1',
      titulo: 'De los datos sueltos a los objetos',
      resumen: 'Registros, clases e instancias; por qué juntar datos y comportamiento cambia todo.',
      objetivos: [
        'Agrupar datos relacionados en un registro o clase',
        'Distinguir clase de objeto y entender el constructor',
        'Reconocer cuándo un conjunto de funciones pide ser una clase'
      ],
      lectura: `
<h2>El problema de los arreglos paralelos</h2>
${cod('pseudo', `// Siete arreglos que "se refieren a lo mismo" solo por convención
Dimension nombre[100]
Dimension dni[100]
Dimension cargo[100]
Dimension tarifa[100]
Dimension activo[100]
Dimension horas[100, 6]
Dimension neto[100]
// El trabajador 7 es nombre[7], dni[7], cargo[7]...`)}

<p>Los problemas son concretos:</p>
<ul>
  <li>Añadir un campo obliga a tocar la declaración, la lectura, la escritura y todos los recorridos.</li>
  <li>Ordenar por sueldo exige reordenar <strong>los siete</strong> arreglos a la vez, y un error no da ningún aviso:
  deja datos mezclados que parecen válidos.</li>
  <li>Pasar un trabajador a una función exige pasar siete parámetros.</li>
  <li>Nada impide que alguien use <code>nombre[7]</code> con <code>dni[8]</code>.</li>
</ul>

<h2>El primer paso: el registro</h2>
<p>Un <strong>registro</strong> (<em>struct</em>, <em>record</em>) agrupa datos relacionados bajo un nombre:</p>

${cod('pseudo', `Registro Trabajador
	nombre : Cadena
	dni : Cadena
	cargo : Cadena
	tarifaHora : Real
	activo : Logico
FinRegistro

Dimension empleados[100] : Trabajador     // un solo arreglo
empleados[7].nombre <- "Rosa Quispe"`)}

<p>Con esto ya se resuelve la mitad del problema: un solo arreglo, un solo parámetro, imposible desalinear los campos.
Ordenar mueve registros completos. C, Go y Pascal se quedan aquí, y es suficiente para muchísimo software.</p>

<h2>El segundo paso: juntar datos y comportamiento</h2>
<p>Una <strong>clase</strong> es un registro que además contiene las <strong>operaciones</strong> que tienen sentido
sobre esos datos. La idea central de la POO es que los datos y el código que los manipula deben vivir juntos.</p>

${cod('python', `class Trabajador:
    def __init__(self, nombre, dni, tarifa_hora):   # constructor
        self.nombre = nombre
        self.dni = dni
        self.tarifa_hora = tarifa_hora
        self.horas = [0] * 6
        self.activo = True

    def total_horas(self):
        return sum(self.horas)

    def pago_bruto(self):
        total = self.total_horas()
        normales = min(total, 48)
        extras = max(0, total - 48)
        return normales * self.tarifa_hora + extras * self.tarifa_hora * 1.25

    def __str__(self):
        return f"{self.nombre} ({self.dni})"`)}

${cod('js', `class Trabajador {
  constructor(nombre, dni, tarifaHora) {
    this.nombre = nombre;
    this.dni = dni;
    this.tarifaHora = tarifaHora;
    this.horas = new Array(6).fill(0);
    this.activo = true;
  }

  totalHoras() {
    return this.horas.reduce((a, b) => a + b, 0);
  }

  pagoBruto() {
    const total = this.totalHoras();
    const normales = Math.min(total, 48);
    const extras = Math.max(0, total - 48);
    return normales * this.tarifaHora + extras * this.tarifaHora * 1.25;
  }
}`)}

<h2>Clase y objeto</h2>
${tabla(['Concepto', 'Qué es', 'Analogía'], [
  ['<b>Clase</b>', 'la plantilla: qué datos y qué operaciones tiene este tipo de cosa', 'el plano de una casa'],
  ['<b>Objeto / instancia</b>', 'una cosa concreta creada a partir de la clase', 'una casa construida'],
  ['<b>Atributo</b>', 'un dato que cada objeto tiene por separado', 'el color de <i>esta</i> casa'],
  ['<b>Método</b>', 'una operación que se puede hacer sobre el objeto', 'abrir la puerta'],
  ['<b>Constructor</b>', 'el método que prepara un objeto nuevo', 'construir la casa según el plano'],
  ['<b><code>self</code> / <code>this</code></b>', 'referencia al objeto sobre el que se está operando', '«esta casa»']
])}

${cod('python', `rosa = Trabajador("Rosa Quispe", "45678912", 12.5)   # un objeto
luis = Trabajador("Luis Mendoza", "41234567", 15.0)  # otro objeto

rosa.horas = [8, 8, 8, 8, 8, 4]
print(rosa.pago_bruto())      # 550.0
print(luis.pago_bruto())      # 0.0 — cada objeto tiene SUS datos`)}

<p>El detalle que a veces confunde: <code>self</code> (o <code>this</code>) no es magia. Cuando escribes
<code>rosa.pago_bruto()</code>, el lenguaje llama a la función de la clase pasándole <code>rosa</code> como primer
parámetro. Es exactamente el <code>pagoBruto(trabajador)</code> que habrías escrito con registros, con otra sintaxis.
En Python eso es literal: <code>Trabajador.pago_bruto(rosa)</code> funciona igual.</p>

<h2>Cuándo conviene una clase</h2>
${tabla(['Señal', 'Qué indica'], [
  ['Varias funciones reciben siempre los mismos parámetros', 'esos parámetros son un objeto'],
  ['Un grupo de datos siempre viaja junto', 'es un registro o una clase'],
  ['Hay reglas sobre qué combinaciones de valores son válidas', 'una clase puede garantizarlas'],
  ['El mismo concepto aparece en varias partes del código', 'merece un tipo propio'],
  ['Se repite la misma validación sobre los mismos campos', 'debe estar dentro del tipo']
])}

<p>Y cuándo <strong>no</strong>: para un script de 50 líneas, para una función matemática pura, para un dato que es solo
un número. Crear clases para todo es tan dañino como no crear ninguna: la POO es una herramienta para manejar
complejidad, y donde no hay complejidad solo añade ceremonia.</p>

${nota('La idea esencial, en una frase',
  '<p>Un objeto es <strong>un trozo de estado con las únicas operaciones que pueden cambiarlo</strong>. ' +
  'Esa restricción es lo valioso: si algo sale mal con el sueldo de Rosa, el culpable está en la clase ' +
  '<code>Trabajador</code> y no en cualquiera de las 5000 líneas del programa.</p>', 'key')}

<h2>Identidad, igualdad y estado</h2>
<p>Tres conceptos que conviene no mezclar:</p>
<ul>
  <li><strong>Identidad:</strong> este objeto concreto, distinto de cualquier otro aunque tenga los mismos datos. Son
  dos billetes distintos de 10 soles.</li>
  <li><strong>Igualdad:</strong> dos objetos con el mismo contenido. Hay que definir qué significa «mismo contenido»:
  ¿dos trabajadores son iguales si tienen el mismo DNI, o si todos sus campos coinciden?</li>
  <li><strong>Estado:</strong> los valores actuales de sus atributos, que cambian con el tiempo.</li>
</ul>
<p>Por eso los lenguajes distinguen <code>==</code> (contenido) de <code>is</code> o <code>===</code> (identidad), y por
eso al definir una clase hay que decidir explícitamente qué hace que dos instancias sean «la misma».</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Identifica las clases',
          enunciado: 'Para un sistema de biblioteca, identifica al menos 5 clases con sus atributos y 3 métodos cada una. Justifica por qué cada una merece ser una clase y no un simple dato.',
          pista: 'Busca los sustantivos del dominio que tengan datos propios y reglas asociadas.',
          solucion: `${tabla(['Clase', 'Atributos', 'Métodos', 'Por qué es una clase'], [
  ['<b>Libro</b>', 'isbn, título, autor, año, ejemplares', 'hayDisponible(), prestar(), devolver()', 'tiene reglas: no se puede prestar sin ejemplares'],
  ['<b>Socio</b>', 'código, nombre, estado, préstamosActivos', 'puedePrestar(), tieneMora(), suspender()', 'las reglas de elegibilidad viven con sus datos'],
  ['<b>Préstamo</b>', 'libro, socio, fechaInicio, fechaDevolución', 'estáVencido(), diasDeAtraso(), calcularMulta()', 'relaciona dos entidades y tiene lógica temporal propia'],
  ['<b>Multa</b>', 'préstamo, monto, pagada', 'pagar(), estáPendiente()', 'tiene estado que evoluciona'],
  ['<b>Catálogo</b>', 'colección de libros', 'buscarPorTítulo(), buscarPorAutor(), agregar()', 'encapsula la estructura de búsqueda; puede cambiar de arreglo a índice sin que nadie se entere']
])}
<p><b>La justificación general:</b> cada una tiene <b>datos propios</b> y <b>reglas sobre esos datos</b>. «Título» por sí solo es una cadena y no merece clase; «Libro» sí, porque hay cosas que son verdaderas sobre un libro (no puedes prestar el ejemplar 4 de 3) y alguien tiene que garantizarlas.</p>
<p><b>Préstamo es la más interesante</b> y la que más se olvida: representa una <b>relación</b> entre libro y socio, y además tiene datos propios (las fechas) y lógica propia (la multa). Un diseño que ponga «fechaDevolución» como atributo del libro se rompe en cuanto haya dos ejemplares.</p>` },
        { n: 2, titulo: 'De arreglos paralelos a objetos',
          enunciado: 'Reescribe el sistema de planilla del módulo 4 usando una clase <code>Trabajador</code>. Muestra el código de la clase y el programa principal, y enumera qué problemas concretos desaparecen.',
          pista: 'Los datos del trabajador y las operaciones sobre él van juntos.',
          solucion: `${cod('python', `class Trabajador:
    JORNADA_SEMANAL = 48
    RECARGO_EXTRA = 1.25
    TASA_AFP = 0.10

    def __init__(self, nombre, dni, tarifa_hora):
        if tarifa_hora <= 0:
            raise ValueError("La tarifa debe ser positiva")
        self.nombre = nombre
        self.dni = dni
        self.tarifa_hora = tarifa_hora
        self.horas = [0.0] * 6

    def registrar_horas(self, dia, cantidad):
        if not 0 <= dia < 6:
            raise ValueError("Día fuera de rango")
        if cantidad < 0 or cantidad > 24:
            raise ValueError("Horas no plausibles")
        self.horas[dia] = cantidad

    def total_horas(self):
        return sum(self.horas)

    def pago_bruto(self):
        total = self.total_horas()
        normales = min(total, self.JORNADA_SEMANAL)
        extras = max(0, total - self.JORNADA_SEMANAL)
        return normales * self.tarifa_hora + extras * self.tarifa_hora * self.RECARGO_EXTRA

    def descuentos(self):
        return self.pago_bruto() * self.TASA_AFP

    def pago_neto(self):
        return self.pago_bruto() - self.descuentos()


# programa principal
planilla = [
    Trabajador("Rosa Quispe", "45678912", 12.5),
    Trabajador("Luis Mendoza", "41234567", 15.0),
]
planilla[0].horas = [8, 8, 8, 8, 8, 4]
planilla[1].horas = [9, 9, 9, 9, 9, 9]

for t in planilla:
    print(f"{t.nombre}: {t.total_horas()}h  neto S/{t.pago_neto():.2f}")

total = sum(t.pago_neto() for t in planilla)
mejor = max(planilla, key=lambda t: t.pago_neto())
print(f"Total: S/{total:.2f} · Mayor: {mejor.nombre}")`)}
<p><b>Qué desaparece, concretamente:</b></p>
<ul>
<li><b>La desalineación es imposible.</b> Ordenar la planilla por sueldo (<code>planilla.sort(key=...)</code>) mueve trabajadores completos. Ya no hay siete arreglos que mantener sincronizados.</li>
<li><b>Añadir un campo es una línea</b> en el constructor, no siete declaraciones y todos los recorridos.</li>
<li><b>Las validaciones están donde deben.</b> Es imposible crear un trabajador con tarifa negativa, porque el constructor lo rechaza. Antes, cualquier parte del programa podía escribir <code>tarifa[7] = -5</code>.</li>
<li><b>Las constantes de negocio viven con el concepto.</b> Cambiar el recargo de horas extra es una línea en un lugar evidente.</li>
<li><b>El código principal se lee como el problema:</b> <code>t.pago_neto()</code> en lugar de una fórmula de cinco términos repetida en tres sitios.</li>
<li><b><code>max(planilla, key=...)</code></b> sustituye el patrón «extremo» escrito a mano, porque ahora los trabajadores son elementos comparables de una lista normal.</li>
</ul>` },
        { n: 3, titulo: 'Clase o función',
          enunciado: 'Para cada caso di si harías una clase, un registro simple o solo funciones: (a) calcular el IGV de un monto; (b) representar una fecha; (c) un script que renombra archivos; (d) un carrito de compras; (e) convertir grados Celsius a Fahrenheit; (f) una conexión a base de datos.',
          pista: '¿Hay estado que mantener? ¿Hay reglas sobre combinaciones válidas?',
          solucion: `<p><b>(a) Función.</b> No hay estado: entra un número, sale otro. Una clase <code>CalculadoraIGV</code> sería ceremonia pura. (Si las tasas varían por producto o por país, entonces sí aparece estado y una clase se justifica.)</p>
<p><b>(b) Clase, sin duda.</b> Una fecha tiene reglas fuertes: el 31 de febrero no existe, los años bisiestos, la aritmética de «sumar 45 días». Encapsularlas evita que cada programador reimplemente mal lo mismo. De hecho todos los lenguajes serios traen una clase de fecha, y usar cadenas o enteros para fechas es una fuente clásica de bugs.</p>
<p><b>(c) Solo funciones.</b> Un script de 40 líneas no gana nada con clases. El exceso de estructura en código pequeño tiene su propio nombre en la industria: <i>over-engineering</i>.</p>
<p><b>(d) Clase.</b> Hay estado (los ítems), reglas (no superar el stock, aplicar descuentos por cantidad) y operaciones (agregar, quitar, total). Es el caso de libro.</p>
<p><b>(e) Función.</b> Una conversión pura, sin estado.</p>
<p><b>(f) Clase.</b> Hay estado (la conexión abierta), un ciclo de vida (abrir, usar, cerrar) y recursos que hay que liberar. Que liberar recursos sea responsabilidad del objeto es precisamente lo que permite usar <code>with</code> o <code>try-with-resources</code>.</p>
<p><b>La regla práctica:</b> si tienes que pasar los mismos tres parámetros a cinco funciones distintas, esos parámetros son un objeto. Si tus funciones no comparten datos, déjalas como funciones.</p>` },
        { n: 4, titulo: 'Implementa y usa',
          enunciado: 'Implementa en JavaScript (consola del laboratorio) una clase <code>CuentaBancaria</code> con saldo, depositar, retirar e historial de movimientos. Debe impedir retiros que dejen el saldo negativo y registrar cada operación. Pruébala con varias operaciones, incluida una inválida.',
          pista: 'El constructor inicializa el estado; cada método valida antes de modificar.',
          solucion: `${cod('js', `class CuentaBancaria {
  constructor(titular, saldoInicial = 0) {
    if (saldoInicial < 0) throw new Error("El saldo inicial no puede ser negativo");
    this.titular = titular;
    this.saldoCentimos = Math.round(saldoInicial * 100);   // enteros: módulo 1
    this.movimientos = [];
    this._registrar("apertura", this.saldoCentimos);
  }

  get saldo() { return this.saldoCentimos / 100; }

  _registrar(tipo, montoCentimos) {
    this.movimientos.push({
      tipo,
      monto: montoCentimos / 100,
      saldoResultante: this.saldoCentimos / 100,
      fecha: new Date().toISOString()
    });
  }

  depositar(monto) {
    const c = Math.round(monto * 100);
    if (c <= 0) throw new Error("El depósito debe ser positivo");
    this.saldoCentimos += c;
    this._registrar("depósito", c);
    return this.saldo;
  }

  retirar(monto) {
    const c = Math.round(monto * 100);
    if (c <= 0) throw new Error("El retiro debe ser positivo");
    if (c > this.saldoCentimos) {
      throw new Error(\`Saldo insuficiente: tienes S/\${this.saldo.toFixed(2)} y pides S/\${monto.toFixed(2)}\`);
    }
    this.saldoCentimos -= c;
    this._registrar("retiro", c);
    return this.saldo;
  }

  extracto() {
    return this.movimientos.map(m =>
      \`\${m.tipo.padEnd(10)} S/\${m.monto.toFixed(2).padStart(10)}  → saldo S/\${m.saldoResultante.toFixed(2)}\`
    ).join("\\n");
  }
}

const c = new CuentaBancaria("Rosa Quispe", 500);
c.depositar(250.50);
c.retirar(100);
try { c.retirar(1000); } catch (e) { console.log("✖", e.message); }
console.log(c.extracto());
console.log("Saldo final: S/" + c.saldo.toFixed(2));`)}
<p>Cuatro decisiones de diseño que vale la pena notar:</p>
<ul>
<li><b>El saldo se guarda en céntimos enteros.</b> Es la lección del módulo 1 aplicada: con reales, mil operaciones descuadran los céntimos. El <i>getter</i> <code>saldo</code> hace la conversión solo al mostrar.</li>
<li><b>El estado solo cambia dentro de los métodos</b>, y cada uno valida antes. Esa es la esencia de la POO: no hay forma de dejar la cuenta en un estado imposible <i>usando la clase</i>.</li>
<li><b>El historial se registra automáticamente.</b> Nadie puede mover dinero sin dejar rastro, porque el registro está dentro de la operación y no es responsabilidad de quien llama.</li>
<li><b>El mensaje de error dice los dos montos.</b> «Saldo insuficiente» a secas obliga al usuario a ir a consultar; con los números, la respuesta está ahí.</li>
</ul>
<p><b>La debilidad que queda:</b> <code>saldoCentimos</code> y <code>movimientos</code> siguen siendo accesibles desde fuera, así que nada impide <code>c.saldoCentimos = 999999999</code>. Resolver eso es el tema siguiente.</p>` },
        { n: 5, titulo: 'Identidad e igualdad',
          enunciado: 'Diseña una clase <code>Producto</code> y decide: ¿cuándo dos productos son «el mismo»? Considera los casos de un catálogo, un carrito de compras y un inventario físico con números de serie. Explica qué consecuencias tiene cada decisión.',
          pista: 'La respuesta depende del contexto, y esa es la lección.',
          solucion: `<p><b>No hay una respuesta única, y por eso el ejercicio importa:</b></p>
<p><b>1. En un catálogo</b> (tipos de producto): dos productos son el mismo si tienen el <b>mismo código</b>. El nombre, el precio o la descripción pueden cambiar sin que deje de ser el mismo producto. <b>Consecuencia:</b> la igualdad y el hash se definen solo sobre el código, lo que permite usarlo como clave de diccionario y detectar duplicados al cargar datos.</p>
<p><b>2. En un carrito de compras:</b> dos líneas del carrito son la misma si coinciden el producto <b>y todas las opciones</b> (talla, color, personalización). Dos camisetas del mismo modelo en tallas distintas son líneas distintas; dos en la misma talla deben fusionarse aumentando la cantidad. <b>Consecuencia:</b> la igualdad incluye las opciones, y es lo que permite que el carrito sume cantidades en lugar de acumular líneas repetidas.</p>
<p><b>3. En un inventario físico con número de serie:</b> cada unidad es <b>única</b>. Dos laptops del mismo modelo son objetos distintos porque tienen garantías, dueños e historiales distintos. <b>Consecuencia:</b> la igualdad se basa en el número de serie, y el sistema debe poder rastrear cada unidad individualmente, lo que cambia por completo el modelo de datos (ya no basta con una cantidad; hace falta una entidad por unidad).</p>
<p><b>La distinción con nombre propio:</b> en diseño orientado al dominio se llaman <b>entidades</b> a los objetos que tienen identidad propia que persiste aunque cambien sus datos (un cliente, una unidad con número de serie) y <b>objetos de valor</b> a los que se definen por su contenido (un importe, una fecha, una dirección). Los objetos de valor se pueden copiar libremente y conviene hacerlos inmutables; las entidades necesitan un identificador estable y hay que tener cuidado al duplicarlas.</p>
<p><b>Y una consecuencia técnica que muerde:</b> en Java y Python, si redefines la igualdad <b>tienes que redefinir el hash de forma coherente</b>: dos objetos iguales deben tener el mismo hash. Si no, el objeto se «pierde» dentro de un diccionario o un conjunto —lo guardas y luego <code>in</code> dice que no está—, y es uno de los bugs más desconcertantes que existen. Es la misma razón por la que las claves deben ser inmutables (módulo 6).</p>` }
      ],
      quiz: [
        { p: 'La diferencia entre una clase y un objeto es que…',
          ops: ['son sinónimos', 'la clase es la plantilla y el objeto una instancia concreta con sus propios datos',
            'el objeto es más grande', 'la clase se ejecuta y el objeto no'],
          ok: 1, exp: 'La clase es el plano; cada objeto es una construcción concreta con sus propios valores de atributos.' },
        { p: 'El problema principal de los arreglos paralelos es que…',
          ops: ['ocupan mucha memoria', 'ordenar uno sin los demás desalinea los datos sin dar ningún error',
            'no se pueden recorrer', 'solo admiten números'],
          ok: 1, exp: 'El resultado es «basura coherente»: el programa sigue funcionando y entrega datos mezclados. Un registro o una clase lo hace imposible.' },
        { p: 'Para una función que convierte Celsius a Fahrenheit, lo adecuado es…',
          ops: ['una clase con un método', 'una función: no hay estado que mantener',
            'una clase con atributos estáticos', 'un objeto por cada conversión'],
          ok: 1, exp: 'La POO sirve para manejar complejidad y estado. Donde no hay ninguno de los dos, solo añade ceremonia.' }
      ]
    },

    {
      id: 'm8-2',
      titulo: 'Encapsulamiento y abstracción',
      resumen: 'Ocultar el cómo para proteger el qué: visibilidad, invariantes de clase y el valor de una buena interfaz.',
      objetivos: [
        'Usar visibilidad para proteger el estado interno de un objeto',
        'Definir y mantener invariantes de clase',
        'Diseñar una interfaz pública mínima y estable'
      ],
      lectura: `
<p><strong>Encapsular</strong> es ocultar los detalles internos y exponer solo lo necesario para usar el objeto. No es
secretismo: es poder <strong>cambiar</strong> el interior sin romper a quien usa la clase.</p>

<h2>El problema que resuelve</h2>
${cod('python', `# SIN encapsular: cualquiera puede dejar el objeto en un estado imposible
cuenta.saldo = -50000          # el banco acaba de inventar dinero
cuenta.movimientos = []        # y de borrar la auditoría

# CON encapsular: solo se puede cambiar el saldo por las vías previstas
cuenta.retirar(100)            # valida, registra y actualiza`)}

<h2>Niveles de visibilidad</h2>
${tabla(['Nivel', 'Quién accede', 'Java / C#', 'Python', 'JavaScript'], [
  ['<b>Público</b>', 'todos', '<code>public</code>', 'sin prefijo', 'sin prefijo'],
  ['<b>Protegido</b>', 'la clase y sus subclases', '<code>protected</code>', '<code>_nombre</code> (convención)', 'convención'],
  ['<b>Privado</b>', 'solo la propia clase', '<code>private</code>', '<code>__nombre</code>', '<code>#nombre</code>']
], 'Python no impide el acceso: _x es una convención («no toques esto») y __x solo cambia el nombre internamente. La disciplina la pone el equipo.')}

<p>Python adopta deliberadamente la postura «somos todos adultos responsables»: marca la intención pero no la fuerza.
Java la fuerza. Ninguna de las dos filosofías es obviamente mejor; lo importante es que <strong>la interfaz pública sea
una decisión consciente</strong>, porque es lo que te comprometes a mantener.</p>

<h2>Invariantes de clase</h2>
<p>Un <strong>invariante</strong> es una afirmación que debe ser cierta sobre un objeto <em>siempre</em>, desde que se
crea hasta que se destruye. Es el concepto más valioso de esta lección.</p>

${cod('python', `class CuentaBancaria:
    """Invariantes:
       - saldo_centimos >= 0 siempre
       - la suma de los movimientos es igual al saldo actual
       - movimientos nunca se borra: es auditoría
    """
    def __init__(self, titular, saldo_inicial=0):
        if saldo_inicial < 0:
            raise ValueError("Saldo inicial negativo")
        self.__saldo_centimos = round(saldo_inicial * 100)
        self.__movimientos = []
        self.titular = titular

    @property
    def saldo(self):                       # lectura sí, escritura no
        return self.__saldo_centimos / 100

    @property
    def movimientos(self):
        return tuple(self.__movimientos)   # copia inmutable: nadie la altera

    def retirar(self, monto):
        c = round(monto * 100)
        if c <= 0:
            raise ValueError("El retiro debe ser positivo")
        if c > self.__saldo_centimos:      # aquí se PROTEGE el invariante
            raise SaldoInsuficiente(...)
        self.__saldo_centimos -= c
        self.__movimientos.append(("retiro", c))`)}

<p>El valor concreto: <strong>si el saldo es negativo, el bug está dentro de esta clase</strong>. No hay que revisar las
5000 líneas del resto del programa. Encapsular reduce el área de búsqueda de los errores, y eso es lo que de verdad
compra.</p>

<h2>Getters y setters: la parte mal entendida</h2>
<p>Muchos cursos enseñan a poner un <code>get</code> y un <code>set</code> para cada atributo. Eso <strong>no es
encapsular</strong>: es escribir el doble de código para dejar todo igual de expuesto.</p>

${cod('java', `// Esto NO encapsula nada: el saldo sigue siendo modificable a voluntad
public double getSaldo() { return saldo; }
public void setSaldo(double s) { this.saldo = s; }`)}

<p>El encapsulamiento de verdad consiste en exponer <strong>operaciones del dominio</strong>, no acceso a campos.
No <code>setSaldo()</code> sino <code>depositar()</code> y <code>retirar()</code>. No <code>setEstado()</code> sino
<code>confirmar()</code>, <code>cancelar()</code> y <code>despachar()</code>, que además pueden comprobar qué
transiciones son válidas.</p>

<p>Los <em>getters</em> de solo lectura sí son útiles, y las propiedades (como <code>@property</code> en Python o
<code>get</code> en JavaScript) permiten exponer un valor calculado sin comprometerse a cómo se guarda internamente.</p>

<h2>Abstracción: la otra cara</h2>
<p>Si encapsular es ocultar el <em>cómo</em>, <strong>abstraer</strong> es definir el <em>qué</em>: la interfaz que
quien usa la clase necesita conocer.</p>

<p>Cuando usas una lista de Python no sabes —ni necesitas saber— que internamente es un arreglo dinámico que duplica su
capacidad. Esa ignorancia es una ventaja: los desarrolladores de Python pueden cambiar la implementación en la próxima
versión y tu código sigue funcionando. <strong>Esa es la libertad que compra la abstracción.</strong></p>

<p>Una buena interfaz pública tiene cuatro propiedades:</p>
<ul>
  <li><strong>Mínima:</strong> solo lo que hace falta. Cada método público es una promesa que tendrás que mantener.</li>
  <li><strong>Completa:</strong> todo lo que se necesita de verdad, sin obligar a trucos.</li>
  <li><strong>Difícil de usar mal:</strong> si un método solo tiene sentido después de otro, mejor que el tipo lo impida
  a que lo diga un comentario.</li>
  <li><strong>Expresada en el lenguaje del dominio:</strong> <code>prestarLibro()</code>, no
  <code>updateRecord(3, true)</code>.</li>
</ul>

${nota('La prueba del cambio',
  '<p>Pregúntate: <strong>si mañana cambio cómo guardo los datos internamente, ¿tengo que tocar el código que usa esta ' +
  'clase?</strong> Si la respuesta es sí, la abstracción tiene una fuga. Esa pregunta es la mejor guía que existe para ' +
  'decidir qué hacer público.</p>', 'key')}

<h2>Acoplamiento y cohesión</h2>
<p>Dos palabras que describen la calidad de un diseño:</p>
<ul>
  <li><strong>Cohesión alta (buena):</strong> todo lo que está dentro de una clase pertenece junto y colabora en una sola
  responsabilidad.</li>
  <li><strong>Acoplamiento bajo (bueno):</strong> las clases dependen lo menos posible unas de otras, y solo a través de
  interfaces estables.</li>
</ul>
<p>El objetivo de todo lo que verás en este módulo —encapsulamiento, polimorfismo, SOLID, patrones— se puede resumir en
esas dos palabras: <strong>alta cohesión, bajo acoplamiento</strong>. Un sistema así se puede entender por partes,
probar por partes y cambiar por partes.</p>
      `,
      ejercicios: [
        { n: 1, titulo: 'Encuentra la fuga de abstracción',
          enunciado: 'Esta clase pretende encapsular una lista de tareas pero no lo consigue. Encuentra el problema y arréglalo.<br><pre>class ListaTareas:\n    def __init__(self):\n        self.tareas = []\n    def obtener_tareas(self):\n        return self.tareas</pre>',
          pista: '¿Qué puede hacer quien recibe lo que devuelve obtener_tareas()?',
          solucion: `<p><b>Dos fugas:</b></p>
<ol>
<li><code>self.tareas</code> es público: cualquiera puede hacer <code>lista.tareas = None</code> o <code>lista.tareas.clear()</code>.</li>
<li><code>obtener_tareas()</code> devuelve <b>la lista interna misma</b>, no una copia. Quien la recibe puede modificarla: <code>lista.obtener_tareas().append(basura)</code> salta todas las validaciones que la clase pudiera tener.</li>
</ol>
<p><b>Arreglado:</b></p>
${cod('python', `class ListaTareas:
    def __init__(self):
        self.__tareas = []

    def agregar(self, texto, prioridad=1):
        if not texto.strip():
            raise ValueError("La tarea no puede estar vacía")
        if not 1 <= prioridad <= 5:
            raise ValueError("Prioridad fuera de rango")
        self.__tareas.append({"texto": texto.strip(), "prioridad": prioridad, "hecha": False})

    def completar(self, indice):
        self.__tareas[indice]["hecha"] = True

    @property
    def tareas(self):
        return tuple(self.__tareas)      # copia inmutable

    def pendientes(self):
        return tuple(t for t in self.__tareas if not t["hecha"])

    def __len__(self):
        return len(self.__tareas)`)}
<p><b>La lección general, y es importante:</b> <b>devolver una colección interna es devolver el control sobre ella</b>. Es una fuga silenciosa que pasa desapercibida porque el código «funciona» hasta que alguien, en otra parte del sistema, modifica la lista que recibió y nadie entiende por qué cambió el estado del objeto.</p>
<p>Las tres soluciones habituales: devolver una <b>copia</b> (segura, cuesta memoria), devolver una <b>vista inmutable</b> (<code>tuple</code> en Python, <code>Collections.unmodifiableList</code> en Java), o devolver un <b>iterador</b>. La peor opción es devolver la referencia y poner un comentario que diga «no modificar».</p>` },
        { n: 2, titulo: 'Escribe los invariantes',
          enunciado: 'Escribe los invariantes de clase para: (a) un carrito de compras; (b) una fracción matemática; (c) un rango de fechas; (d) un vehículo en una app de taxis. Luego di qué método podría romperlos y cómo lo evitarías.',
          pista: 'Un invariante es algo que debe ser cierto desde la creación hasta la destrucción del objeto.',
          solucion: `<p><b>(a) Carrito de compras:</b></p>
<ul>
<li>La cantidad de cada línea es un entero ≥ 1 (una línea con cantidad 0 debe eliminarse, no quedarse).</li>
<li>No hay dos líneas con el mismo producto y las mismas opciones.</li>
<li>El total es siempre igual a la suma de (precio × cantidad) de las líneas, más impuestos, menos descuentos.</li>
</ul>
<p><b>Lo rompe:</b> un método <code>setCantidad(0)</code>. <b>Solución:</b> que poner cantidad 0 elimine la línea, o que el método se llame <code>quitar()</code> y <code>cambiarCantidad()</code> rechace valores menores que 1.</p>

<p><b>(b) Fracción:</b></p>
<ul>
<li>El denominador nunca es 0.</li>
<li>Está siempre simplificada (si se decide así).</li>
<li>El signo vive en el numerador, no en el denominador.</li>
</ul>
<p><b>Lo rompe:</b> un <code>setDenominador(0)</code>. <b>Solución:</b> hacer la fracción <b>inmutable</b>: validar y simplificar en el constructor, y que las operaciones devuelvan fracciones nuevas. Un objeto inmutable no puede violar su invariante después de creado, y por eso la inmutabilidad es la forma más fuerte de encapsulamiento.</p>

<p><b>(c) Rango de fechas:</b></p>
<ul>
<li><code>inicio &lt;= fin</code> siempre.</li>
<li>Ambas fechas son válidas y están en la misma zona horaria.</li>
</ul>
<p><b>Lo rompe:</b> <code>setFin(fechaAnterior)</code>. <b>Solución:</b> inmutable, o un método <code>extenderHasta(fecha)</code> que valide. Nótese que con setters independientes <b>es imposible</b> mantener el invariante: para mover un rango entero habría que pasar por un estado inválido. Eso es una señal clara de que los setters sueltos son el diseño equivocado.</p>

<p><b>(d) Vehículo en una app de taxis:</b></p>
<ul>
<li>Si el estado es «ocupado», hay exactamente un viaje activo asignado.</li>
<li>Si el estado es «libre», no hay ningún viaje activo.</li>
<li>Los pasajeros asignados no superan la capacidad.</li>
</ul>
<p><b>Lo rompe:</b> <code>setEstado("libre")</code> con un viaje en curso. <b>Solución:</b> no exponer el estado como campo, sino operaciones del dominio: <code>aceptarViaje(v)</code> y <code>finalizarViaje()</code>, que cambian estado y viaje <b>a la vez</b> y de forma coherente. Este es exactamente el ejemplo de por qué <code>setEstado()</code> es casi siempre un error de diseño: deja que el estado y los datos relacionados se desincronicen.</p>` },
        { n: 3, titulo: 'Rediseña la interfaz',
          enunciado: 'Esta clase tiene una interfaz pobre. Rediséñala exponiendo operaciones del dominio en lugar de setters, y explica cada cambio.<br><pre>class Pedido:\n    setEstado(e)\n    getEstado()\n    setFechaEnvio(f)\n    setNumeroSeguimiento(n)\n    setMontoPagado(m)</pre>',
          pista: '¿Qué le pasa de verdad a un pedido a lo largo de su vida?',
          solucion: `<p><b>El problema:</b> esta interfaz obliga a quien la usa a conocer todas las reglas. Para despachar un pedido hay que llamar a tres setters en el orden correcto y recordar poner el estado adecuado. Si alguien olvida uno, el pedido queda inconsistente y la clase ni se entera.</p>
${cod('python', `class Pedido:
    """Estados: creado → pagado → despachado → entregado
                 (cancelable solo antes de despachar)"""

    def pagar(self, monto, medio):
        if self.__estado != "creado":
            raise EstadoInvalido(f"No se puede pagar un pedido {self.__estado}")
        if monto < self.total():
            raise PagoInsuficiente(f"Faltan S/{self.total() - monto:.2f}")
        self.__monto_pagado = monto
        self.__medio_pago = medio
        self.__estado = "pagado"
        self.__registrar_evento("pagado")

    def despachar(self, numero_seguimiento, transportista):
        if self.__estado != "pagado":
            raise EstadoInvalido("Solo se despachan pedidos pagados")
        self.__numero_seguimiento = numero_seguimiento
        self.__transportista = transportista
        self.__fecha_envio = date.today()
        self.__estado = "despachado"
        self.__registrar_evento("despachado")

    def cancelar(self, motivo):
        if self.__estado in ("despachado", "entregado"):
            raise EstadoInvalido("No se puede cancelar un pedido ya despachado")
        self.__estado = "cancelado"
        self.__motivo_cancelacion = motivo

    @property
    def estado(self): return self.__estado        # lectura sí, escritura no`)}
<p><b>Qué se gana con cada cambio:</b></p>
<ul>
<li><b>Las transiciones válidas se verifican en un solo lugar.</b> Es imposible despachar un pedido sin pagar, y quien lo intente recibe un error claro en lugar de dejar el sistema en un estado absurdo.</li>
<li><b>Los datos relacionados se asignan juntos.</b> Despachar fija el número de seguimiento, el transportista, la fecha <b>y</b> el estado en una sola operación atómica. Con setters sueltos, cada uno es una oportunidad de olvidarse.</li>
<li><b>El código que usa la clase se lee como el negocio:</b> <code>pedido.despachar("ABC123", "Olva")</code> frente a cuatro llamadas que hay que recordar.</li>
<li><b>El registro de eventos es automático,</b> y nadie puede cambiar un pedido sin dejar rastro.</li>
<li><b>El estado es de solo lectura.</b> Se puede consultar pero no fijar directamente.</li>
</ul>
<p>Lo que acabas de construir tiene nombre: una <b>máquina de estados</b>. Modelar explícitamente los estados y las transiciones válidas de una entidad es una de las técnicas que más bugs previene, y la mayoría de los sistemas de pedidos, reservas y trámites deberían tener una y no la tienen.</p>` },
        { n: 4, titulo: 'La prueba del cambio',
          enunciado: 'Una clase <code>Catalogo</code> guarda productos en una lista y los busca linealmente. Mañana quieres cambiar a un diccionario por código para que la búsqueda sea O(1). (a) ¿Qué métodos públicos permitirían ese cambio sin tocar nada más? (b) ¿Cuáles lo impedirían? (c) Escribe la versión «a prueba de cambios».',
          pista: 'Todo lo que revele la estructura interna bloquea el cambio.',
          solucion: `<p><b>(a) Métodos que permiten el cambio:</b> <code>buscarPorCodigo(c)</code>, <code>agregar(p)</code>, <code>eliminar(c)</code>, <code>contar()</code>, <code>todos()</code> (devolviendo un iterador o una copia). Ninguno revela <i>cómo</i> se guardan los productos.</p>
<p><b>(b) Métodos que lo impedirían:</b></p>
<ul>
<li><code>obtenerLista()</code> devolviendo la lista interna: todo el código que hace <code>catalogo.obtenerLista()[3]</code> se rompe al pasar a diccionario.</li>
<li><code>productoEnPosicion(i)</code>: expone que hay posiciones, lo que es cierto en una lista y no en un diccionario.</li>
<li><code>insertarEn(i, p)</code>: igual.</li>
<li>Un atributo público <code>productos</code>: la peor de todas, porque permite cualquier cosa.</li>
</ul>
<p><b>(c) Versión a prueba de cambios:</b></p>
${cod('python', `class Catalogo:
    def __init__(self):
        self.__productos = []            # ← detalle interno, puede cambiar

    def agregar(self, producto):
        if self.buscar(producto.codigo) is not None:
            raise CodigoDuplicado(producto.codigo)
        self.__productos.append(producto)

    def buscar(self, codigo):
        for p in self.__productos:       # hoy O(n)
            if p.codigo == codigo:
                return p
        return None

    def eliminar(self, codigo):
        p = self.buscar(codigo)
        if p is None:
            raise ProductoNoEncontrado(codigo)
        self.__productos.remove(p)

    def __len__(self):
        return len(self.__productos)

    def __iter__(self):
        return iter(self.__productos)    # permite "for p in catalogo"`)}
<p><b>El cambio de mañana</b> toca <b>una sola línea del constructor y el cuerpo de tres métodos</b>:</p>
${cod('python', `    def __init__(self):
        self.__productos = {}            # ahora diccionario código -> producto

    def buscar(self, codigo):
        return self.__productos.get(codigo)     # ahora O(1)

    def agregar(self, producto):
        if producto.codigo in self.__productos:
            raise CodigoDuplicado(producto.codigo)
        self.__productos[producto.codigo] = producto`)}
<p><b>Ni una línea del resto del programa cambia.</b> Eso es lo que compra la abstracción, y es medible: la diferencia entre un cambio de 10 líneas y uno de 400.</p>
<p><b>Nota sobre <code>__iter__</code>:</b> implementarlo permite <code>for p in catalogo</code> y <code>len(catalogo)</code> sin exponer la estructura. En Python esto se llama cumplir un <i>protocolo</i>, y es una forma elegantísima de ofrecer una interfaz familiar sin comprometerse con una implementación.</p>` },
        { n: 5, titulo: 'Cohesión y acoplamiento',
          enunciado: 'Esta clase tiene baja cohesión y alto acoplamiento. Identifica ambos problemas y propón una división. <br><pre>class GestorSistema:\n    conectarBD()\n    guardarCliente(c)\n    enviarCorreo(destino, texto)\n    calcularIGV(monto)\n    generarPDF(datos)\n    validarDNI(dni)\n    registrarLog(mensaje)\n    exportarExcel(tabla)</pre>',
          pista: 'Cuenta cuántas responsabilidades distintas hay ahí dentro.',
          solucion: `<p><b>Baja cohesión:</b> esta clase hace <b>ocho cosas sin relación entre sí</b>: base de datos, correo, cálculos fiscales, generación de documentos, validación, registro y exportación. No hay ningún concepto que las una; es un cajón de sastre. El nombre lo delata: «Gestor» y «Sistema» son palabras vacías, y casi siempre señalan una clase que no se supo diseñar. Otros nombres sospechosos: <code>Utils</code>, <code>Helper</code>, <code>Manager</code>, <code>Common</code>.</p>
<p><b>Alto acoplamiento:</b> cualquier clase que necesite <i>una</i> de estas funciones depende de <b>todas</b>. Para probar el cálculo del IGV hay que instanciar una clase que abre conexiones a base de datos y envía correos. Un cambio en el formato del PDF obliga a recompilar y volver a probar todo lo que use validación de DNI.</p>
<p><b>División propuesta:</b></p>
${tabla(['Clase / módulo', 'Responsabilidad', 'Dependencias'], [
  ['<code>RepositorioClientes</code>', 'guardar y recuperar clientes', 'la base de datos'],
  ['<code>ServicioCorreo</code>', 'enviar mensajes', 'el servidor SMTP'],
  ['<code>CalculadoraImpuestos</code>', 'IGV y otros tributos', '<b>ninguna</b> (funciones puras)'],
  ['<code>GeneradorPDF</code>', 'componer documentos', 'una biblioteca de PDF'],
  ['<code>ValidadorDNI</code>', 'validar documentos de identidad', '<b>ninguna</b>'],
  ['<code>Logger</code>', 'registrar eventos', 'el destino del log'],
  ['<code>ExportadorExcel</code>', 'exportar tablas', 'una biblioteca de hojas de cálculo']
], 'Siete piezas, cada una con un nombre que dice qué hace y una sola razón para cambiar.')}
<p><b>Lo que se gana, concretamente:</b></p>
<ul>
<li><b>Probar es trivial</b> para <code>CalculadoraImpuestos</code> y <code>ValidadorDNI</code>: no dependen de nada, así que sus pruebas corren en milisegundos y sin preparar entorno.</li>
<li><b>Reemplazar una pieza es local.</b> Cambiar de proveedor de correo toca una clase.</li>
<li><b>Varias personas pueden trabajar en paralelo</b> sin pisarse.</li>
<li><b>Se puede reutilizar lo útil</b> sin arrastrar lo demás: el validador de DNI sirve en otro proyecto tal cual.</li>
</ul>
<p><b>La regla que resume el ejercicio:</b> una clase debe tener <b>una sola razón para cambiar</b>. Si el formato del PDF, el proveedor de correo y la tasa del IGV pueden cambiar por motivos distintos y en momentos distintos, son responsabilidades distintas. Esa regla tiene nombre —principio de responsabilidad única— y es el primer principio SOLID que verás más adelante.</p>` }
      ],
      quiz: [
        { p: 'Encapsular sirve principalmente para…',
          ops: ['que nadie vea tu código', 'poder cambiar la implementación interna sin romper a quien usa la clase',
            'hacer el programa más rápido', 'ahorrar memoria'],
          ok: 1, exp: 'Oculta el «cómo» y expone el «qué». Además reduce drásticamente el área donde buscar un error de estado.' },
        { p: 'Poner un getter y un setter público para cada atributo…',
          ops: ['es la forma correcta de encapsular', 'no encapsula nada: deja todo igual de expuesto con el doble de código',
            'es obligatorio en Java', 'mejora el rendimiento'],
          ok: 1, exp: 'Encapsular de verdad es exponer operaciones del dominio (depositar, retirar), no acceso directo a los campos.' },
        { p: 'Devolver la lista interna de un objeto desde un método público…',
          ops: ['es seguro', 'es una fuga: quien la recibe puede modificarla saltándose todas las validaciones',
            'solo importa en Java', 'mejora el rendimiento y es lo recomendado'],
          ok: 1, exp: 'Hay que devolver una copia, una vista inmutable o un iterador. Devolver la referencia es ceder el control del estado interno.' }
      ]
    },

    {
      id: 'm8-3',
      titulo: 'Herencia y polimorfismo',
      resumen: 'Reutilizar comportamiento, sustituir implementaciones y el principio que hace que todo funcione.',
      objetivos: [
        'Usar herencia para modelar relaciones «es un»',
        'Aplicar polimorfismo para escribir código que funcione con tipos futuros',
        'Reconocer cuándo la herencia es el modelo equivocado'
      ],
      lectura: `
<h2>Herencia: «es un»</h2>
<p>Una clase puede <strong>heredar</strong> de otra: recibe sus atributos y métodos, y puede añadir o cambiar lo que
necesite. Modela la relación <em>«es un»</em>: un gerente <em>es un</em> empleado.</p>

${cod('python', `class Empleado:
    def __init__(self, nombre, sueldo_base):
        self.nombre = nombre
        self.sueldo_base = sueldo_base

    def sueldo_mensual(self):
        return self.sueldo_base

    def describir(self):
        return f"{self.nombre}: S/{self.sueldo_mensual():.2f}"


class Vendedor(Empleado):
    def __init__(self, nombre, sueldo_base, comision_pct):
        super().__init__(nombre, sueldo_base)      # el constructor del padre
        self.comision_pct = comision_pct
        self.ventas = 0

    def sueldo_mensual(self):                       # SOBRESCRIBE al padre
        return self.sueldo_base + self.ventas * self.comision_pct


class Gerente(Empleado):
    def __init__(self, nombre, sueldo_base, bono):
        super().__init__(nombre, sueldo_base)
        self.bono = bono

    def sueldo_mensual(self):
        return self.sueldo_base + self.bono`)}

<h2>Polimorfismo: el mismo mensaje, respuestas distintas</h2>
<p>Esta es la parte verdaderamente poderosa. Puedes tratar a todos como <code>Empleado</code> y cada uno
responderá según lo que es:</p>

${cod('python', `planilla = [
    Empleado("Ana", 2000),
    Vendedor("Luis", 1200, 0.05),
    Gerente("Rosa", 4000, 1500),
]
planilla[1].ventas = 30000

for e in planilla:
    print(e.describir())      # cada uno calcula su sueldo a su manera

total = sum(e.sueldo_mensual() for e in planilla)`)}

<p>Fíjate en lo que <strong>no</strong> hay: ningún <code>if tipo == "vendedor"</code>. El bucle no sabe ni le importa
qué tipo es cada objeto. Y lo decisivo: si mañana añades una clase <code>Practicante</code>, <strong>este bucle no
cambia</strong>. Esa es la razón de ser del polimorfismo.</p>

${cod('pseudo', `// SIN polimorfismo: hay que tocar este código cada vez que aparece un tipo nuevo
Para cada empleado Hacer
	Si empleado.tipo = "vendedor" Entonces
		sueldo <- base + ventas * comision
	Sino Si empleado.tipo = "gerente" Entonces
		sueldo <- base + bono
	Sino Si empleado.tipo = "practicante" Entonces     // ← y aquí otro más
		...
	FinSi
FinPara`)}

${nota('La señal de que falta polimorfismo',
  '<p>Un <code>Si/Segun</code> sobre el «tipo» de un objeto, repetido en varios lugares del programa, casi siempre ' +
  'significa que esos casos deberían ser clases distintas con un método común. Es una de las refactorizaciones más ' +
  'rentables que existen: <em>reemplazar condicional por polimorfismo</em>.</p>', 'key')}

<h2>El principio de sustitución de Liskov</h2>
<p>Formulado por Barbara Liskov en 1987, es la regla que hace que el polimorfismo funcione:</p>

<blockquote><p>Si <code>B</code> hereda de <code>A</code>, debe poder usarse <strong>cualquier</strong> objeto
<code>B</code> donde el programa espere un <code>A</code>, <strong>sin que nada se rompa</strong>.</p></blockquote>

<p>Suena obvio y se viola constantemente. El ejemplo canónico:</p>

${cod('python', `class Rectangulo:
    def set_ancho(self, a): self.ancho = a
    def set_alto(self, h): self.alto = h
    def area(self): return self.ancho * self.alto

class Cuadrado(Rectangulo):          # "un cuadrado ES UN rectángulo", ¿no?
    def set_ancho(self, a):
        self.ancho = a
        self.alto = a                # debe mantener los lados iguales
    def set_alto(self, h):
        self.ancho = h
        self.alto = h

# Código que funciona con rectángulos:
def probar(r):
    r.set_ancho(5)
    r.set_alto(4)
    assert r.area() == 20            # ¡falla si r es un Cuadrado! área = 16`)}

<p>Matemáticamente un cuadrado es un rectángulo. Pero un <code>Cuadrado</code> <strong>no</strong> es sustituible por un
<code>Rectangulo</code> <em>mutable</em>, porque rompe una expectativa: que ancho y alto sean independientes. La
herencia debe respetar el <strong>comportamiento</strong> esperado, no solo la taxonomía del mundo real.</p>

<p>La solución aquí no es herencia: son dos tipos separados, o un único tipo inmutable donde el problema desaparece
porque no hay <em>setters</em>.</p>

<h2>Clases abstractas e interfaces</h2>
<p>A veces la clase padre no tiene sentido por sí sola: ¿cuánto cobra «un empleado genérico»? Una <strong>clase
abstracta</strong> define la interfaz común y obliga a las hijas a implementar ciertos métodos.</p>

${cod('python', `from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self): ...

    @abstractmethod
    def perimetro(self): ...

    def describir(self):                       # método concreto compartido
        return f"{type(self).__name__}: área {self.area():.2f}"

class Circulo(Figura):
    def __init__(self, radio): self.radio = radio
    def area(self): return 3.14159 * self.radio ** 2
    def perimetro(self): return 2 * 3.14159 * self.radio

# Figura() → TypeError: no se puede instanciar una clase abstracta`)}

<p>Una <strong>interfaz</strong> es el caso extremo: solo firmas, sin ninguna implementación. Define un
<em>contrato</em>: «quien implemente esto debe saber hacer estas operaciones». Java y C# las tienen explícitas; Python
usa clases abstractas o simplemente <em>duck typing</em> («si camina como pato y hace cuac, es un pato»): si un objeto
tiene el método que necesitas, sirve, sin declarar nada.</p>

<h2>Los peligros de la herencia</h2>
${tabla(['Problema', 'Qué ocurre'], [
  ['<b>Acoplamiento fuerte</b>', 'la hija depende de los detalles internos del padre; cambiar el padre rompe las hijas'],
  ['<b>Jerarquías profundas</b>', 'con 5 niveles, entender un método obliga a leer cinco clases'],
  ['<b>El problema del diamante</b>', 'con herencia múltiple, si B y C heredan de A y D de ambas, ¿qué versión usa D?'],
  ['<b>Herencia por reutilizar código</b>', 'heredar solo para aprovechar un método, sin que haya relación «es un»'],
  ['<b>Clases base frágiles</b>', 'un cambio inocente en el padre rompe hijas que nunca viste']
], 'Por eso la recomendación profesional desde hace décadas es «composición sobre herencia», que es el tema siguiente.')}
      `,
      ejercicios: [
        { n: 1, titulo: '¿Es un o tiene un?',
          enunciado: 'Decide si cada relación es herencia («es un») o composición («tiene un»): (a) Perro y Animal; (b) Auto y Motor; (c) Cuadrado y Rectángulo; (d) Gerente y Empleado; (e) Pila y Arreglo; (f) CuentaDeAhorro y CuentaBancaria.',
          pista: 'Prueba a decir «un X es un Y» y «un X tiene un Y» y mira cuál suena cierta.',
          solucion: `<p><b>(a) Herencia.</b> «Un perro es un animal» ✔ y todo lo que se puede hacer con un animal se puede hacer con un perro.</p>
<p><b>(b) Composición.</b> «Un auto tiene un motor» ✔, no «un auto es un motor». Además permite cambiar de motor sin cambiar de clase de auto.</p>
<p><b>(c) ¡Cuidado!</b> Matemáticamente «un cuadrado es un rectángulo», pero con objetos <b>mutables</b> viola Liskov, como viste en la lección. Si son inmutables, la herencia es segura. <b>La respuesta correcta depende del diseño, no de la geometría</b>, y ese es el valor de la pregunta.</p>
<p><b>(d) Herencia.</b> «Un gerente es un empleado» ✔, y sustituir uno por otro donde se espera un empleado funciona.</p>
<p><b>(e) Composición</b>, y esta es la más instructiva. «Una pila tiene un arreglo» ✔. Si <code>Pila</code> <i>heredara</i> de <code>Arreglo</code>, heredaría <code>insertarEn(5, x)</code> y <code>obtener(3)</code>, que <b>destruyen la razón de ser de una pila</b>: el acceso restringido. Es el ejemplo clásico de herencia usada para reutilizar código, con un resultado nefasto. (Java cometió este error real con <code>java.util.Stack</code>, que hereda de <code>Vector</code> y por tanto permite acceder a cualquier posición. Está documentado como un error histórico que no se puede corregir sin romper la compatibilidad.)</p>
<p><b>(f) Herencia.</b> «Una cuenta de ahorro es una cuenta bancaria» ✔, con reglas adicionales (intereses, límite de retiros).</p>` },
        { n: 2, titulo: 'Reemplaza el condicional por polimorfismo',
          enunciado: 'Reescribe este código usando clases y polimorfismo, y explica qué pasa al añadir un cuarto método de pago en cada versión.<br><pre>def calcular_comision(pago):\n    if pago.tipo == "efectivo":\n        return 0\n    elif pago.tipo == "tarjeta":\n        return pago.monto * 0.035\n    elif pago.tipo == "transferencia":\n        return 3.50\n    else:\n        raise ValueError("tipo desconocido")</pre>',
          pista: 'Cada rama del condicional es una clase.',
          solucion: `${cod('python', `from abc import ABC, abstractmethod

class MedioDePago(ABC):
    @abstractmethod
    def comision(self, monto): ...

    @abstractmethod
    def nombre(self): ...

class Efectivo(MedioDePago):
    def comision(self, monto): return 0
    def nombre(self): return "Efectivo"

class Tarjeta(MedioDePago):
    TASA = 0.035
    def comision(self, monto): return monto * self.TASA
    def nombre(self): return "Tarjeta"

class Transferencia(MedioDePago):
    CARGO_FIJO = 3.50
    def comision(self, monto): return self.CARGO_FIJO
    def nombre(self): return "Transferencia"

# uso: ni un solo if
def total_a_cobrar(monto, medio):
    return monto + medio.comision(monto)`)}
<p><b>Al añadir un cuarto medio (por ejemplo, billetera digital con 1,8%):</b></p>
<ul>
<li><b>Versión con condicional:</b> hay que modificar <code>calcular_comision</code>. Y aquí está lo grave: ese <code>if</code> sobre el tipo <b>rara vez está solo</b>. Lo habitual es que haya condicionales paralelos en «mostrar ícono», «validar datos», «generar comprobante», «calcular tiempo de acreditación»… Añadir un medio obliga a encontrarlos todos, y <b>el que se olvide no dará error de compilación</b>: simplemente caerá en el <code>else</code> o hará algo incorrecto.</li>
<li><b>Versión polimórfica:</b> se añade una clase nueva y listo. El código existente <b>no se toca</b>. Y si la clase abstracta declara cinco métodos, el lenguaje te <b>obliga</b> a implementarlos todos: es imposible olvidarse de uno.</li>
</ul>
<p>Eso último es lo más valioso: la clase abstracta convierte un olvido silencioso en un error que el compilador o el intérprete detecta. <b>Pasar de errores de lógica a errores de compilación es una de las mejores inversiones del diseño.</b></p>
<p>Esta transformación se llama <i>reemplazar condicional por polimorfismo</i> y está en el catálogo de refactorizaciones de Martin Fowler. Y el principio subyacente —poder extender sin modificar— es el segundo principio SOLID.</p>` },
        { n: 3, titulo: 'Diseña una jerarquía',
          enunciado: 'Diseña una jerarquía de clases para figuras geométricas con área, perímetro y nombre. Incluye al menos círculo, rectángulo y triángulo. Luego escribe una función que, dada una lista de figuras, devuelva la de mayor área, y explica por qué no necesita saber qué figuras existen.',
          pista: 'Una clase abstracta Figura y una clase por figura concreta.',
          solucion: `${cod('python', `from abc import ABC, abstractmethod
from math import pi, sqrt

class Figura(ABC):
    @abstractmethod
    def area(self): ...
    @abstractmethod
    def perimetro(self): ...

    def nombre(self):
        return type(self).__name__

    def __str__(self):
        return f"{self.nombre()}: área {self.area():.2f}, perímetro {self.perimetro():.2f}"

class Circulo(Figura):
    def __init__(self, radio):
        if radio <= 0: raise ValueError("El radio debe ser positivo")
        self.radio = radio
    def area(self): return pi * self.radio ** 2
    def perimetro(self): return 2 * pi * self.radio

class Rectangulo(Figura):
    def __init__(self, ancho, alto):
        if ancho <= 0 or alto <= 0: raise ValueError("Lados positivos")
        self.ancho, self.alto = ancho, alto
    def area(self): return self.ancho * self.alto
    def perimetro(self): return 2 * (self.ancho + self.alto)

class Triangulo(Figura):
    def __init__(self, a, b, c):
        if a + b <= c or a + c <= b or b + c <= a:
            raise ValueError("No forman un triángulo")   # módulo 2
        self.a, self.b, self.c = a, b, c
    def perimetro(self): return self.a + self.b + self.c
    def area(self):
        s = self.perimetro() / 2                          # fórmula de Herón
        return sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

# La función que no sabe nada de figuras concretas:
def mayor_area(figuras):
    if not figuras:
        return None
    return max(figuras, key=lambda f: f.area())`)}
<p><b>Por qué <code>mayor_area</code> no necesita saber qué figuras existen:</b> solo usa <code>f.area()</code>, que es parte del contrato de <code>Figura</code>. Cualquier clase que cumpla ese contrato funciona, incluidas las que todavía no existen. Si mañana alguien añade <code>Hexagono</code> o <code>Elipse</code> en otro archivo, <code>mayor_area</code> funciona con ellas <b>sin recompilarse ni modificarse</b>.</p>
<p><b>Tres detalles de diseño:</b></p>
<ul>
<li><b>Las validaciones están en los constructores</b>, así que es imposible tener un triángulo imposible o un círculo de radio negativo. El invariante se garantiza desde el nacimiento del objeto.</li>
<li><b><code>nombre()</code> y <code>__str__</code> son concretos en la clase abstracta</b>: comportamiento compartido que no hace falta repetir en cada hija. Una clase abstracta puede tener métodos concretos; una interfaz pura, no.</li>
<li><b>El triángulo calcula el área con Herón</b> a partir de los tres lados, sin necesitar la altura. Es un buen recordatorio de que cada subclase decide <i>cómo</i> cumple el contrato, y las implementaciones pueden ser radicalmente distintas.</li>
</ul>` },
        { n: 4, titulo: 'Viola y arregla Liskov',
          enunciado: 'Da dos ejemplos de violación del principio de sustitución de Liskov distintos del cuadrado-rectángulo, y propón cómo arreglar cada uno.',
          pista: 'Busca subclases que no puedan hacer algo que el padre promete, o que impongan condiciones más estrictas.',
          solucion: `<p><b>Ejemplo 1 — el pingüino que no vuela:</b></p>
${cod('python', `class Ave:
    def volar(self): ...

class Pinguino(Ave):
    def volar(self):
        raise NotImplementedError("Los pingüinos no vuelan")   # ✖ rompe Liskov`)}
<p>Cualquier código que haga <code>for ave in aves: ave.volar()</code> se rompe con un pingüino. La subclase <b>no es sustituible</b>.</p>
<p><b>Arreglo:</b> la jerarquía está mal construida porque mezcla «ser un ave» con «saber volar». Se separan las capacidades:</p>
${cod('python', `class Ave:                      # lo común a todas
    def comer(self): ...
    def poner_huevos(self): ...

class AveVoladora(Ave):
    def volar(self): ...

class Aguila(AveVoladora): ...
class Pinguino(Ave): ...        # simplemente no tiene volar()`)}
<p><b>Ejemplo 2 — la colección de solo lectura:</b></p>
${cod('python', `class Lista:
    def agregar(self, x): ...

class ListaInmutable(Lista):
    def agregar(self, x):
        raise TypeError("Es inmutable")    # ✖ rompe Liskov`)}
<p>Una función que recibe una <code>Lista</code> y le agrega elementos falla con la inmutable.</p>
<p><b>Arreglo:</b> invertir la jerarquía. Lo inmutable es lo <b>general</b> (ofrece menos garantías) y lo mutable es lo <b>específico</b> (añade capacidades):</p>
${cod('python', `class ListaDeSoloLectura:       # base: solo leer
    def obtener(self, i): ...
    def __len__(self): ...

class ListaMutable(ListaDeSoloLectura):   # añade, no quita
    def agregar(self, x): ...`)}
<p>Ahora una <code>ListaMutable</code> se puede usar donde se espere una de solo lectura, pero no al revés, que es lo correcto.</p>
<p><b>La regla general detrás de los dos ejemplos:</b> una subclase puede <b>añadir</b> capacidades, nunca <b>quitarlas</b>. Puede aceptar entradas más amplias y devolver resultados más específicos, pero no al revés. Si te encuentras escribiendo un método que lanza «no soportado», la jerarquía está mal: estás modelando una <b>resta</b> con una herramienta que solo sabe <b>sumar</b>.</p>` },
        { n: 5, titulo: 'Jerarquía profunda contra plana',
          enunciado: 'Un sistema tiene esta jerarquía: <code>Vehiculo → VehiculoMotorizado → Auto → AutoElectrico → AutoElectricoDeportivo</code>. Enumera los problemas concretos y propón una alternativa.',
          pista: 'Piensa en depurar un método, en añadir un auto híbrido y en qué pasa si cambia la clase base.',
          solucion: `<p><b>Los problemas, concretos:</b></p>
<ol>
<li><b>Depurar exige leer cinco clases.</b> Para entender qué hace <code>autoDeportivo.acelerar()</code> hay que buscar en qué nivel está definido, si alguno lo sobrescribe y si llama a <code>super()</code>. Un método de tres líneas puede tener un comportamiento repartido en cinco archivos.</li>
<li><b>La clase base frágil.</b> Un cambio en <code>Vehiculo</code> afecta a los cinco niveles, y los efectos en las hojas son difíciles de prever. En un sistema grande, nadie se atreve a tocar la raíz.</li>
<li><b>Las categorías se cruzan.</b> ¿Dónde va un <b>híbrido</b>? ¿Y un <b>deportivo de gasolina</b>? ¿Y una <b>camioneta eléctrica deportiva</b>? La herencia simple obliga a elegir <b>un solo eje</b> de clasificación, y la realidad tiene varios: tipo de motor, carrocería, uso, tracción. Esto lleva a una explosión combinatoria de clases (<code>AutoElectricoDeportivoTraccion4x4...</code>) o a duplicar código.</li>
<li><b>Herencia múltiple no salva:</b> traería el problema del diamante y aún más confusión.</li>
</ol>
<p><b>Alternativa — composición por capacidades:</b></p>
${cod('python', `class Vehiculo:
    def __init__(self, marca, modelo, motor, carroceria):
        self.marca = marca
        self.modelo = modelo
        self.motor = motor               # ← un objeto Motor
        self.carroceria = carroceria     # ← un objeto Carroceria

    def autonomia(self):
        return self.motor.autonomia()

    def acelerar(self):
        return self.motor.entregar_potencia()

class MotorElectrico:
    def autonomia(self): return self.bateria_kwh * self.eficiencia
    def entregar_potencia(self): ...

class MotorCombustion:
    def autonomia(self): return self.tanque_litros * self.rendimiento
    def entregar_potencia(self): ...

class MotorHibrido:                      # combina los dos, sin tocar nada más
    def __init__(self, electrico, combustion): ...

# Crear cualquier combinación sin crear clases nuevas:
tesla  = Vehiculo("Tesla", "Model 3", MotorElectrico(75), Sedan())
prius  = Vehiculo("Toyota", "Prius", MotorHibrido(...), Sedan())
deport = Vehiculo("Porsche", "Taycan", MotorElectrico(93), Deportivo())`)}
<p><b>Lo que se gana:</b> las combinaciones son <b>datos</b>, no clases. Añadir un motor de hidrógeno es una clase nueva que funciona con todas las carrocerías existentes; añadir una carrocería funciona con todos los motores. Con herencia, cada combinación nueva multiplicaba el número de clases.</p>
<p><b>La regla práctica:</b> si tu jerarquía pasa de <b>dos o tres niveles</b>, o si te encuentras queriendo heredar de dos sitios a la vez, casi siempre lo que tienes son <b>capacidades combinables</b> y no una taxonomía. Y eso es composición, el tema siguiente.</p>` }
      ],
      quiz: [
        { p: 'El polimorfismo permite que…',
          ops: ['una clase tenga varios constructores', 'el mismo código funcione con tipos que todavía no existen, porque cada objeto responde a su manera',
            'se herede de varias clases', 'los atributos sean privados'],
          ok: 1, exp: 'Un bucle que llama a <code>e.sueldo()</code> funciona con cualquier subclase futura, sin modificarse. Esa es su razón de ser.' },
        { p: 'El principio de sustitución de Liskov dice que…',
          ops: ['toda clase debe tener un padre', 'cualquier objeto de la subclase debe poder usarse donde se espera el padre sin romper nada',
            'no se debe usar herencia', 'las subclases deben tener más métodos'],
          ok: 1, exp: 'Si una subclase lanza «no soportado» o cambia las expectativas del padre, la jerarquía está mal construida.' },
        { p: 'Un <code>Segun</code> sobre el «tipo» de objeto repetido en varios lugares del programa indica…',
          ops: ['buen diseño', 'que esos casos deberían ser clases distintas con un método común',
            'que falta un bucle', 'que hay que usar un diccionario'],
          ok: 1, exp: 'Es la refactorización «reemplazar condicional por polimorfismo». Evita tener que encontrar todos los condicionales paralelos al añadir un tipo nuevo.' }
      ]
    },

    {
      id: 'm8-4',
      titulo: 'Composición, SOLID y acoplamiento',
      resumen: 'Por qué componer gana a heredar, los cinco principios SOLID y cómo se traducen en decisiones concretas.',
      objetivos: [
        'Elegir composición en lugar de herencia cuando corresponde',
        'Explicar y aplicar los cinco principios SOLID',
        'Reconocer el olor a diseño rígido antes de que sea caro'
      ],
      lectura: `
<h2>Composición sobre herencia</h2>
<p>La recomendación más repetida del diseño orientado a objetos, y viene del libro de los patrones de diseño (1994):
<strong>«favorece la composición de objetos sobre la herencia de clases»</strong>.</p>

${tabla(['', 'Herencia', 'Composición'], [
  ['Relación', '«es un»', '«tiene un» / «usa un»'],
  ['Se decide', 'al escribir el código', 'en tiempo de ejecución'],
  ['Acoplamiento', 'fuerte: la hija depende del interior del padre', 'débil: solo depende de una interfaz'],
  ['Cambiar de comportamiento', 'imposible sin cambiar de clase', 'basta cambiar el componente'],
  ['Combinaciones', 'explosión de clases', 'se combinan libremente'],
  ['Probar', 'hay que instanciar toda la jerarquía', 'se sustituye el componente por uno falso']
])}

${cod('python', `# HERENCIA: un pato de madera que "es un" pato no debería volar
class Pato:
    def volar(self): print("volando")
    def graznar(self): print("cuac")

class PatoDeMadera(Pato):
    def volar(self): raise Exception("no vuela")     # viola Liskov

# COMPOSICIÓN: el comportamiento es un objeto que se inyecta
class Pato:
    def __init__(self, vuelo, sonido):
        self.vuelo = vuelo
        self.sonido = sonido
    def volar(self): return self.vuelo.volar()
    def graznar(self): return self.sonido.emitir()

pato_real   = Pato(VuelaConAlas(), Graznido())
pato_madera = Pato(NoVuela(), Silencio())
pato_rc     = Pato(VuelaConMotor(), Graznido())
pato_real.vuelo = NoVuela()       # ¡se puede cambiar en ejecución!`)}

<p>La composición resuelve de un golpe la explosión combinatoria, la violación de Liskov y el acoplamiento. Su costo es
más clases pequeñas y un poco más de código para conectar las piezas.</p>

<h2>Los cinco principios SOLID</h2>
<p>Formulados por Robert C. Martin, son las cinco reglas más citadas del diseño orientado a objetos. No son leyes:
son <em>heurísticas</em> para evitar diseños que se vuelven imposibles de cambiar.</p>

<h3>S — Responsabilidad única</h3>
<blockquote><p>Una clase debe tener <strong>una sola razón para cambiar</strong>.</p></blockquote>
<p>Si una clase <code>Factura</code> calcula totales, se guarda en la base de datos y se imprime en PDF, tiene tres
razones para cambiar: una regla fiscal nueva, un cambio de motor de base de datos, un rediseño del documento. Tres
responsabilidades, tres clases.</p>

<h3>O — Abierto/cerrado</h3>
<blockquote><p>Abierto a la extensión, cerrado a la modificación.</p></blockquote>
<p>Debería poder añadirse un medio de pago nuevo <strong>sin tocar</strong> el código existente. Es exactamente lo que
consigue el polimorfismo del tema anterior: una clase nueva en lugar de otro <code>elif</code>.</p>

<h3>L — Sustitución de Liskov</h3>
<p>Ya lo viste: una subclase debe poder sustituir al padre sin romper nada.</p>

<h3>I — Segregación de interfaces</h3>
<blockquote><p>Mejor muchas interfaces pequeñas y específicas que una grande y general.</p></blockquote>
${cod('python', `# MAL: obliga a implementar lo que no se usa
class Trabajador(ABC):
    def trabajar(self): ...
    def comer(self): ...
    def cobrarSueldo(self): ...

class Robot(Trabajador):
    def comer(self): raise NotImplementedError      # ✖
    def cobrarSueldo(self): raise NotImplementedError  # ✖

# BIEN: interfaces separadas, cada clase implementa lo que le corresponde
class Trabajable(ABC):   def trabajar(self): ...
class Alimentable(ABC):  def comer(self): ...
class Asalariable(ABC):  def cobrarSueldo(self): ...

class Humano(Trabajable, Alimentable, Asalariable): ...
class Robot(Trabajable): ...`)}

<h3>D — Inversión de dependencias</h3>
<blockquote><p>Depende de abstracciones, no de implementaciones concretas.</p></blockquote>
${cod('python', `# MAL: la lógica de negocio depende de MySQL
class ServicioPedidos:
    def __init__(self):
        self.bd = ConexionMySQL("localhost", ...)    # ← atado para siempre

# BIEN: depende de una interfaz; quien la crea decide cuál usar
class ServicioPedidos:
    def __init__(self, repositorio):                  # ← se inyecta
        self.repo = repositorio

# en producción
servicio = ServicioPedidos(RepositorioMySQL(...))
# en pruebas
servicio = ServicioPedidos(RepositorioEnMemoria())    # ← pruebas rápidas y sin BD`)}

<p>Ese último punto tiene una consecuencia enorme y práctica: <strong>el código que depende de abstracciones se puede
probar</strong>. Si <code>ServicioPedidos</code> crea su propia conexión a MySQL, probarlo exige una base de datos
real. Si la recibe, se le puede pasar una falsa y las pruebas corren en milisegundos.</p>

${nota('El valor real de SOLID',
  '<p>No son reglas para obedecer ciegamente: aplicados en exceso producen diseños con treinta interfaces para un ' +
  'programa de doscientas líneas, que es un problema tan real como el contrario. Son <strong>herramientas para cuando ' +
  'duele</strong>: cuando un cambio pequeño obliga a tocar diez archivos, o cuando no puedes probar algo sin levantar ' +
  'medio sistema, uno de estos principios te está diciendo qué va mal.</p>', 'key')}

<h2>Síntomas de un diseño que se está pudriendo</h2>
${tabla(['Síntoma', 'Qué indica', 'Principio que lo señala'], [
  ['Un cambio pequeño obliga a tocar muchos archivos', 'acoplamiento alto', 'S, D'],
  ['Hay que modificar código existente para añadir un caso', 'falta polimorfismo', 'O'],
  ['No se puede probar sin base de datos o red', 'dependencias concretas', 'D'],
  ['Clases llamadas <code>Utils</code>, <code>Manager</code>, <code>Helper</code>', 'sin responsabilidad clara', 'S'],
  ['Métodos que lanzan «no soportado»', 'jerarquía incorrecta', 'L, I'],
  ['Hay que copiar y pegar para una variante', 'falta abstracción', 'O'],
  ['Nadie se atreve a tocar cierta clase', 'clase base frágil', 'S, D']
], 'Estos síntomas se llaman «olores de código» (code smells) y son la señal para refactorizar.')}
      `,
      ejercicios: [
        { n: 1, titulo: 'Aplica responsabilidad única',
          enunciado: 'Esta clase viola el principio de responsabilidad única. Identifica cuántas responsabilidades tiene y divídela.<br><pre>class Factura:\n    calcularSubtotal()\n    calcularIGV()\n    calcularTotal()\n    guardarEnBD()\n    enviarPorCorreo()\n    generarPDF()\n    validarRUC()\n    aplicarDescuentos()</pre>',
          pista: 'Pregúntate qué motivos distintos podrían obligar a cambiar esta clase.',
          solucion: `<p><b>Cuatro razones distintas para cambiar</b>, y por tanto cuatro responsabilidades:</p>
<ol>
<li><b>Reglas de negocio</b> (subtotal, IGV, total, descuentos): cambian si cambia la ley tributaria o la política comercial.</li>
<li><b>Persistencia</b> (guardar en BD): cambia si se migra de motor de base de datos.</li>
<li><b>Comunicación</b> (enviar por correo): cambia si se cambia de proveedor o se añade WhatsApp.</li>
<li><b>Presentación</b> (generar PDF): cambia si se rediseña el documento.</li>
</ol>
<p>(<code>validarRUC</code> es una quinta: pertenece al dominio de identificación fiscal y se reutiliza en otros sitios.)</p>
<p><b>División:</b></p>
${cod('python', `class Factura:                      # solo el dominio y sus reglas
    def subtotal(self): ...
    def igv(self): ...
    def descuentos(self): ...
    def total(self): ...

class RepositorioFacturas:          # persistencia
    def guardar(self, factura): ...
    def buscar_por_numero(self, n): ...

class NotificadorFacturas:          # comunicación
    def enviar(self, factura, destinatario): ...

class GeneradorPDFFactura:          # presentación
    def generar(self, factura) -> bytes: ...

class ValidadorRUC:                 # reutilizable
    @staticmethod
    def es_valido(ruc): ...`)}
<p><b>Lo que se gana, y es medible:</b></p>
<ul>
<li><b><code>Factura</code> se puede probar sin base de datos ni servidor de correo.</b> Sus pruebas corren en milisegundos y verifican las reglas fiscales, que es lo que de verdad importa.</li>
<li><b>Cambiar el diseño del PDF no puede romper el cálculo del IGV.</b> Antes, ambos vivían en el mismo archivo y cualquiera que lo tocara arriesgaba lo otro.</li>
<li><b>Dos personas pueden trabajar a la vez</b> sin conflictos.</li>
<li><b>El generador de PDF sirve para boletas y notas de crédito</b> con poco esfuerzo.</li>
</ul>
<p><b>La prueba práctica del principio:</b> describe la clase en una frase. Si necesitas «y», hay más de una responsabilidad.</p>` },
        { n: 2, titulo: 'Herencia a composición',
          enunciado: 'Un sistema tiene <code>Notificacion</code> con subclases <code>NotificacionEmail</code>, <code>NotificacionSMS</code>, <code>NotificacionPush</code>. Ahora se pide poder enviar una misma notificación por varios canales a la vez y con distintos formatos. Explica por qué la herencia no sirve y rediseña con composición.',
          pista: 'Canales × formatos = explosión de clases.',
          solucion: `<p><b>Por qué la herencia no sirve:</b> con 3 canales y 3 formatos (texto plano, HTML, enriquecido) harían falta 9 clases (<code>NotificacionEmailHTML</code>, <code>NotificacionSMSTexto</code>…). Y «enviar por varios canales a la vez» no se puede expresar en absoluto: un objeto pertenece a <b>una</b> clase. Es la explosión combinatoria del tema anterior.</p>
<p><b>Rediseño con composición:</b></p>
${cod('python', `from abc import ABC, abstractmethod

class Canal(ABC):
    @abstractmethod
    def enviar(self, destinatario, contenido): ...

class CanalEmail(Canal):
    def enviar(self, destinatario, contenido): ...

class CanalSMS(Canal):
    def enviar(self, destinatario, contenido):
        if len(contenido) > 160:
            contenido = contenido[:157] + "..."     # restricción del canal
        ...

class CanalPush(Canal): ...

class Formateador(ABC):
    @abstractmethod
    def formatear(self, mensaje): ...

class FormatoTexto(Formateador): ...
class FormatoHTML(Formateador): ...

class Notificacion:
    def __init__(self, mensaje, formateador):
        self.mensaje = mensaje
        self.formateador = formateador
        self.canales = []

    def agregar_canal(self, canal):
        self.canales.append(canal)
        return self                      # permite encadenar

    def enviar(self, destinatarios):
        contenido = self.formateador.formatear(self.mensaje)
        resultados = []
        for canal in self.canales:
            try:
                canal.enviar(destinatarios, contenido)
                resultados.append((canal, "ok"))
            except Exception as e:
                resultados.append((canal, f"falló: {e}"))   # uno falla, los demás siguen
        return resultados

# uso
(Notificacion("Su pedido fue despachado", FormatoHTML())
    .agregar_canal(CanalEmail())
    .agregar_canal(CanalPush())
    .enviar(cliente))`)}
<p><b>Lo que la composición hizo posible:</b></p>
<ul>
<li><b>Varios canales a la vez:</b> es una lista, no una clase.</li>
<li><b>Canales y formatos son independientes:</b> 3 + 3 = 6 clases en lugar de 3 × 3 = 9, y añadir un canal nuevo no multiplica nada.</li>
<li><b>Se configura en ejecución:</b> los canales pueden venir de la configuración del usuario («avísame por correo y push, pero no por SMS»), algo imposible con herencia.</li>
<li><b>Manejo de fallos por canal:</b> que el SMS falle no impide que el correo salga. Con herencia, cada subclase tendría que reimplementar esa lógica.</li>
<li><b>Es trivial de probar:</b> se le pasa un <code>CanalFalso</code> que solo registra lo que recibió.</li>
</ul>` },
        { n: 3, titulo: 'Inversión de dependencias y pruebas',
          enunciado: 'Esta clase no se puede probar sin una base de datos real ni sin enviar correos de verdad. Rediséñala aplicando inversión de dependencias y escribe cómo quedaría una prueba.<br><pre>class ServicioRegistro:\n    def registrar(self, datos):\n        bd = ConexionMySQL("prod.servidor.com")\n        bd.insertar("usuarios", datos)\n        smtp = ClienteSMTP("smtp.gmail.com")\n        smtp.enviar(datos.email, "Bienvenido")</pre>',
          pista: 'Las dependencias deben entrar por el constructor, como interfaces.',
          solucion: `${cod('python', `from abc import ABC, abstractmethod

class RepositorioUsuarios(ABC):
    @abstractmethod
    def guardar(self, usuario): ...
    @abstractmethod
    def existe_email(self, email): ...

class ServicioCorreo(ABC):
    @abstractmethod
    def enviar(self, destino, asunto, cuerpo): ...

class ServicioRegistro:
    def __init__(self, repositorio: RepositorioUsuarios, correo: ServicioCorreo):
        self.repo = repositorio          # ← inyectadas, no creadas
        self.correo = correo

    def registrar(self, datos):
        if self.repo.existe_email(datos.email):
            raise EmailYaRegistrado(datos.email)
        usuario = self.repo.guardar(datos)
        self.correo.enviar(datos.email, "Bienvenido", f"Hola {datos.nombre}")
        return usuario

# ---- implementaciones reales ----
class RepositorioMySQL(RepositorioUsuarios): ...
class ServicioCorreoSMTP(ServicioCorreo): ...

# ---- dobles para pruebas ----
class RepositorioEnMemoria(RepositorioUsuarios):
    def __init__(self): self.usuarios = []
    def existe_email(self, email):
        return any(u.email == email for u in self.usuarios)
    def guardar(self, usuario):
        self.usuarios.append(usuario)
        return usuario

class CorreoEspia(ServicioCorreo):
    def __init__(self): self.enviados = []
    def enviar(self, destino, asunto, cuerpo):
        self.enviados.append((destino, asunto, cuerpo))`)}
<p><b>La prueba:</b></p>
${cod('python', `def test_registro_envia_bienvenida():
    repo = RepositorioEnMemoria()
    correo = CorreoEspia()
    servicio = ServicioRegistro(repo, correo)

    servicio.registrar(Datos(nombre="Rosa", email="rosa@ejemplo.com"))

    assert len(repo.usuarios) == 1
    assert len(correo.enviados) == 1
    assert correo.enviados[0][0] == "rosa@ejemplo.com"

def test_rechaza_email_duplicado():
    repo = RepositorioEnMemoria()
    correo = CorreoEspia()
    repo.guardar(Datos(nombre="Ana", email="rosa@ejemplo.com"))
    servicio = ServicioRegistro(repo, correo)

    with pytest.raises(EmailYaRegistrado):
        servicio.registrar(Datos(nombre="Rosa", email="rosa@ejemplo.com"))
    assert correo.enviados == []          # no se envió nada: importante`)}
<p><b>Lo que cambió, y por qué importa tanto:</b></p>
<ul>
<li><b>Las pruebas corren en milisegundos</b> y sin red, sin base de datos y sin configuración. Eso significa que se pueden ejecutar en cada guardado, y unas pruebas que tardan 3 segundos se ejecutan; unas que tardan 4 minutos, no.</li>
<li><b>No se envían correos reales</b> a nadie durante las pruebas. Más de un equipo ha aprendido esto por las malas.</li>
<li><b>Se pueden verificar los efectos:</b> el espía permite comprobar que <i>no</i> se envió correo cuando el registro falló, que es justo el tipo de regresión que se cuela sin darse cuenta.</li>
<li><b>Cambiar de MySQL a PostgreSQL</b> es escribir una clase nueva; <code>ServicioRegistro</code> no se entera.</li>
</ul>
<p><b>La idea de fondo:</b> una clase que <i>crea</i> sus dependencias decide por ti; una que las <i>recibe</i> te deja decidir a ti. Esa inversión es lo que da nombre al principio, y es la base de los contenedores de inyección de dependencias que usan Spring, .NET y Angular.</p>` },
        { n: 4, titulo: 'Detecta los olores',
          enunciado: 'Para cada síntoma, di qué principio SOLID se está violando y qué harías: (a) para añadir un tipo de descuento hay que modificar tres clases; (b) una interfaz tiene 15 métodos y ninguna clase los usa todos; (c) la clase <code>Reporte</code> tiene 2000 líneas; (d) no se puede probar el cálculo de envío sin conectarse a la API del transportista.',
          pista: 'Cada uno corresponde a una letra de SOLID.',
          solucion: `<p><b>(a) Viola abierto/cerrado (O).</b> Añadir un caso no debería exigir modificar código existente. <b>Solución:</b> una interfaz <code>Descuento</code> con un método <code>aplicar(monto)</code> y una clase por tipo de descuento. Añadir uno nuevo pasa a ser crear una clase y registrarla.</p>
<p><b>(b) Viola segregación de interfaces (I).</b> Las clases se ven obligadas a implementar métodos vacíos o que lanzan excepciones, lo que además invita a violar Liskov. <b>Solución:</b> dividir en interfaces pequeñas y cohesivas (<code>Legible</code>, <code>Escribible</code>, <code>Buscable</code>) que las clases implementan a la carta.</p>
<p><b>(c) Viola responsabilidad única (S).</b> Dos mil líneas es imposible que sean una sola responsabilidad. <b>Solución:</b> separar obtención de datos, cálculo, formato y exportación. La mejor forma de empezar: listar sus métodos públicos y agruparlos por lo que manipulan; los grupos suelen ser las clases que faltan.</p>
<p><b>(d) Viola inversión de dependencias (D).</b> La lógica depende de un servicio externo concreto. <b>Solución:</b> una interfaz <code>CalculadoraEnvio</code>, con una implementación real que llama a la API y otra falsa con tarifas fijas para las pruebas.</p>
<p><b>Y una advertencia honesta:</b> los cuatro casos son reales, pero no todos justifican una refactorización <i>ahora</i>. Si el código funciona, nadie lo toca y nadie va a añadirle descuentos nuevos, reescribirlo es gastar tiempo sin beneficio. <b>Los principios se cobran cuando hay cambio</b>; en código estable, el mejor diseño es el que ya está escrito y probado. La pregunta no es «¿viola SOLID?» sino «<b>¿me está costando dinero que lo viole?</b>».</p>` },
        { n: 5, titulo: 'Diseña un sistema completo',
          enunciado: 'Diseña las clases de un sistema de reservas de canchas deportivas aplicando SOLID: debe manejar canchas de distintos tipos con tarifas distintas, reservas por hora, cancelaciones con política de reembolso variable, y notificaciones. Entrega el diagrama de clases en texto y justifica tres decisiones.',
          pista: 'Busca lo que varía (tarifas, políticas, canales) y aíslalo detrás de interfaces.',
          solucion: `${cod('python', `# ---------- DOMINIO ----------
class Cancha:
    def __init__(self, id, nombre, tipo, calculadora_tarifa):
        self.id, self.nombre, self.tipo = id, nombre, tipo
        self.tarifa = calculadora_tarifa          # ← estrategia inyectada

    def precio(self, franja, horas):
        return self.tarifa.calcular(franja, horas)

class Reserva:
    def __init__(self, cancha, cliente, inicio, horas):
        if horas <= 0: raise ValueError("Horas inválidas")
        self.cancha, self.cliente = cancha, cliente
        self.inicio, self.horas = inicio, horas
        self.__estado = "confirmada"
        self.monto = cancha.precio(FranjaHoraria.de(inicio), horas)

    def cancelar(self, politica, ahora):
        if self.__estado != "confirmada":
            raise EstadoInvalido(f"No se puede cancelar una reserva {self.__estado}")
        reembolso = politica.reembolso(self, ahora)
        self.__estado = "cancelada"
        return reembolso

    def se_solapa_con(self, otra):
        return (self.cancha.id == otra.cancha.id
                and self.inicio < otra.fin() and otra.inicio < self.fin())

# ---------- ESTRATEGIAS (lo que varía) ----------
class CalculadoraTarifa(ABC):
    @abstractmethod
    def calcular(self, franja, horas): ...

class TarifaPlana(CalculadoraTarifa): ...
class TarifaPorFranja(CalculadoraTarifa): ...      # noche más cara
class TarifaConDescuentoSocio(CalculadoraTarifa): ...

class PoliticaCancelacion(ABC):
    @abstractmethod
    def reembolso(self, reserva, ahora): ...

class ReembolsoTotal(PoliticaCancelacion): ...
class ReembolsoEscalonado(PoliticaCancelacion): ...   # 100% >48h, 50% >24h, 0%
class SinReembolso(PoliticaCancelacion): ...

# ---------- INFRAESTRUCTURA (abstracciones) ----------
class RepositorioReservas(ABC):
    @abstractmethod
    def guardar(self, reserva): ...
    @abstractmethod
    def reservas_de_cancha(self, cancha_id, fecha): ...

class Notificador(ABC):
    @abstractmethod
    def notificar(self, cliente, mensaje): ...

# ---------- APLICACIÓN ----------
class ServicioReservas:
    def __init__(self, repo: RepositorioReservas, notificador: Notificador):
        self.repo, self.notificador = repo, notificador

    def reservar(self, cancha, cliente, inicio, horas):
        nueva = Reserva(cancha, cliente, inicio, horas)
        existentes = self.repo.reservas_de_cancha(cancha.id, inicio.date())
        if any(nueva.se_solapa_con(r) for r in existentes):
            raise CanchaOcupada(cancha.nombre, inicio)
        self.repo.guardar(nueva)
        self.notificador.notificar(cliente, f"Reserva confirmada: {cancha.nombre}")
        return nueva`)}
<p><b>Tres decisiones justificadas:</b></p>
<p><b>1. La tarifa es un objeto inyectado, no un <code>if</code> sobre el tipo de cancha.</b> Las tarifas cambian constantemente por razones comerciales (promociones, horarios, socios) y son completamente independientes de qué es una cancha. Con el patrón estrategia, una promoción nueva es una clase nueva y <b>ninguna línea existente se modifica</b> (principio O). Además la misma calculadora puede compartirse entre canchas.</p>
<p><b>2. La política de cancelación es una estrategia separada y no un método de <code>Reserva</code>.</b> Las políticas varían por tipo de cliente, por temporada y por decisión del negocio, y pueden cambiar <b>después</b> de creada la reserva. Tenerla dentro de <code>Reserva</code> obligaría a modificar la clase del dominio cada vez que marketing invente algo. Nótese que se pasa como parámetro a <code>cancelar()</code>: así queda explícito en el punto de llamada <i>qué</i> política se aplicó, lo que es valioso para auditoría.</p>
<p><b>3. <code>ServicioReservas</code> recibe repositorio y notificador como interfaces</b> (principio D). Esto permite probar toda la lógica de solapamiento —que es la parte difícil y donde viven los bugs— con un repositorio en memoria, sin base de datos. La comprobación de solapamiento <code>inicio &lt; otra.fin() Y otra.inicio &lt; fin()</code> es la clase de condición que hay que escribir <b>una sola vez</b>, en un método con nombre, y probar a conciencia: a mano se equivoca casi todo el mundo (módulo 4).</p>
<p><b>Lo que deliberadamente NO se hizo:</b> no hay una jerarquía <code>CanchaFutbol</code>, <code>CanchaTenis</code>, <code>CanchaVoley</code>. El tipo es un <b>dato</b>, porque lo único que cambia entre ellas es la tarifa y el aforo, no el comportamiento. Crear subclases que solo difieren en un valor es uno de los abusos de herencia más frecuentes, y produce jerarquías que luego estorban.</p>` }
      ],
      quiz: [
        { p: '«Favorece la composición sobre la herencia» se recomienda porque la composición…',
          ops: ['es más rápida', 'permite combinar comportamientos libremente y cambiarlos en ejecución, con menos acoplamiento',
            'usa menos memoria', 'es más fácil de escribir'],
          ok: 1, exp: 'Evita la explosión combinatoria de clases, las violaciones de Liskov y el acoplamiento fuerte con la clase base.' },
        { p: 'El principio de responsabilidad única dice que una clase debe tener…',
          ops: ['un solo método', 'una sola razón para cambiar', 'un solo atributo', 'un solo constructor'],
          ok: 1, exp: 'Si el formato del PDF y la tasa del IGV pueden cambiar por motivos distintos, son responsabilidades distintas y deben vivir en clases distintas.' },
        { p: 'Inyectar las dependencias por el constructor en lugar de crearlas dentro permite sobre todo…',
          ops: ['ahorrar memoria', 'probar la clase sustituyendo las dependencias reales por dobles',
            'escribir menos código', 'usar herencia múltiple'],
          ok: 1, exp: 'Una clase que crea su conexión a MySQL necesita MySQL para probarse. Una que la recibe se prueba en milisegundos con un repositorio en memoria.' }
      ]
    },

    {
      id: 'm8-5',
      titulo: 'Patrones de diseño esenciales',
      resumen: 'Soluciones con nombre a problemas que se repiten: estrategia, fábrica, observador, decorador y singleton.',
      objetivos: [
        'Reconocer el problema que resuelve cada patrón',
        'Aplicar estrategia, fábrica, observador y decorador',
        'Evitar el uso de patrones donde no hacen falta'
      ],
      lectura: `
<p>Un <strong>patrón de diseño</strong> es una solución probada a un problema que aparece una y otra vez. El catálogo
clásico es el de la «Banda de los Cuatro» (1994) con 23 patrones; en la práctica, unos pocos cubren la mayoría de los
casos. Lo valioso no es memorizarlos: es <strong>reconocer el problema</strong> y tener un vocabulario común para
hablar de la solución.</p>

<h2>Estrategia</h2>
<p><strong>Problema:</strong> hay varias formas de hacer algo y quieres poder elegir o cambiar cuál se usa.</p>
<p><strong>Solución:</strong> encapsular cada forma en una clase con una interfaz común e inyectarla.</p>

${cod('python', `class EstrategiaEnvio(ABC):
    @abstractmethod
    def costo(self, peso, distancia): ...

class EnvioEstandar(EstrategiaEnvio):
    def costo(self, peso, distancia): return 5 + peso * 0.5

class EnvioExpress(EstrategiaEnvio):
    def costo(self, peso, distancia): return 15 + peso * 1.2

class RecojoEnTienda(EstrategiaEnvio):
    def costo(self, peso, distancia): return 0

pedido.estrategia_envio = EnvioExpress()      # se elige en ejecución`)}
<p>Ya lo usaste sin saberlo: las tarifas y las políticas de cancelación del tema anterior son estrategias. Es,
probablemente, el patrón más útil de todos.</p>

<h2>Fábrica</h2>
<p><strong>Problema:</strong> crear objetos de distintas clases según una condición, sin llenar el código de
condicionales y sin que quien los usa dependa de las clases concretas.</p>

${cod('python', `class FabricaDeReportes:
    _tipos = {}

    @classmethod
    def registrar(cls, nombre, clase):
        cls._tipos[nombre] = clase

    @classmethod
    def crear(cls, nombre, *args):
        if nombre not in cls._tipos:
            raise ValueError(f"Tipo de reporte desconocido: {nombre}")
        return cls._tipos[nombre](*args)

FabricaDeReportes.registrar("pdf", ReportePDF)
FabricaDeReportes.registrar("excel", ReporteExcel)

reporte = FabricaDeReportes.crear(config["formato"], datos)`)}
<p>Nota el detalle del <strong>registro</strong>: añadir un formato nuevo no modifica la fábrica, solo la configura. Eso
convierte un condicional cerrado en un sistema extensible.</p>

<h2>Observador</h2>
<p><strong>Problema:</strong> varios objetos tienen que enterarse cuando algo cambia, y no quieres que el que cambia
los conozca.</p>

${cod('python', `class Sujeto:
    def __init__(self):
        self.__observadores = []

    def suscribir(self, obs):
        self.__observadores.append(obs)

    def _notificar(self, evento):
        for obs in self.__observadores:
            obs.actualizar(evento)

class Pedido(Sujeto):
    def despachar(self):
        self.__estado = "despachado"
        self._notificar({"tipo": "despachado", "pedido": self})

pedido.suscribir(NotificadorCliente())
pedido.suscribir(ActualizadorInventario())
pedido.suscribir(RegistroAuditoria())`)}
<p>Es el patrón detrás de los <em>event listeners</em> del navegador, de los sistemas de eventos, de la programación
reactiva y de la arquitectura de casi toda interfaz gráfica. Su virtud es que <code>Pedido</code> no sabe nada de quién
lo escucha: añadir un observador nuevo no toca <code>Pedido</code>.</p>

<p>Su riesgo: si los observadores se suscriben y nadie los desuscribe, se acumulan y producen <strong>fugas de
memoria</strong>. Es la causa número uno de fugas en aplicaciones de interfaz gráfica.</p>

<h2>Decorador</h2>
<p><strong>Problema:</strong> añadir responsabilidades a un objeto sin modificar su clase y sin crear una subclase por
cada combinación.</p>

${cod('python', `class Cafe(ABC):
    @abstractmethod
    def costo(self): ...
    @abstractmethod
    def descripcion(self): ...

class CafeSimple(Cafe):
    def costo(self): return 5.0
    def descripcion(self): return "café"

class Decorador(Cafe):
    def __init__(self, envuelto): self.envuelto = envuelto

class ConLeche(Decorador):
    def costo(self): return self.envuelto.costo() + 1.5
    def descripcion(self): return self.envuelto.descripcion() + " con leche"

class ConCanela(Decorador):
    def costo(self): return self.envuelto.costo() + 0.5
    def descripcion(self): return self.envuelto.descripcion() + " con canela"

pedido = ConCanela(ConLeche(CafeSimple()))
print(pedido.descripcion(), pedido.costo())   # café con leche con canela 7.0`)}
<p>Con 10 añadidos hay 2¹⁰ = 1024 combinaciones posibles y solo 10 clases. Con herencia harían falta 1024 clases. Es la
estructura de los <em>middlewares</em> de un servidor web, de los flujos de entrada/salida de Java y de los
decoradores de Python.</p>

<h2>Singleton: el patrón que conviene conocer para evitarlo</h2>
<p><strong>Problema declarado:</strong> garantizar que exista una sola instancia de una clase (una configuración, un
registro de eventos).</p>

<p><strong>Por qué está mal visto:</strong></p>
<ul>
  <li>Es una <strong>variable global disfrazada</strong>, con todos sus problemas: estado compartido invisible,
  dependencias ocultas.</li>
  <li><strong>Hace el código difícil de probar:</strong> no se puede sustituir por un doble, y el estado se filtra de
  una prueba a otra.</li>
  <li>Genera problemas en entornos con varios hilos.</li>
  <li>Oculta las dependencias: una clase que usa el singleton no declara que depende de él.</li>
</ul>

<p><strong>La alternativa</strong> casi siempre es la inyección de dependencias: crear una sola instancia en el punto de
entrada del programa y pasarla a quien la necesite. Se consigue lo mismo (una instancia) sin acoplamiento global y con
las dependencias visibles.</p>

<h2>El peligro de los patrones</h2>
${nota('No empieces por el patrón',
  '<p>El error más común tras aprender patrones es aplicarlos donde no hacen falta: una fábrica abstracta para crear ' +
  'dos objetos, estrategias para algo que nunca va a variar, observadores para un solo oyente. Eso se llama ' +
  '<em>sobreingeniería</em> y produce código que parece sofisticado y es más difícil de leer que el obvio.</p>' +
  '<p>La secuencia correcta es: <strong>escribe la solución simple → cuando el cambio duela, reconoce el patrón que lo ' +
  'alivia → aplícalo</strong>. Los patrones son el destino de una refactorización, no el punto de partida de un diseño.</p>', 'key')}

<h2>Tabla de reconocimiento</h2>
${tabla(['Si necesitas…', 'Patrón', 'Ejemplo cotidiano'], [
  ['elegir entre varios algoritmos', '<b>Estrategia</b>', 'medios de pago, tarifas, ordenamientos'],
  ['crear objetos según una condición', '<b>Fábrica</b>', 'parsers por extensión de archivo'],
  ['avisar a varios cuando algo cambia', '<b>Observador</b>', 'eventos de interfaz, notificaciones'],
  ['añadir funciones sin tocar la clase', '<b>Decorador</b>', 'middlewares, compresión, cifrado'],
  ['una interfaz distinta sobre algo existente', '<b>Adaptador</b>', 'envolver una biblioteca ajena'],
  ['tratar objetos y grupos igual', '<b>Compuesto</b>', 'archivos y carpetas, menús anidados'],
  ['construir un objeto complejo paso a paso', '<b>Constructor</b>', 'consultas SQL, configuraciones'],
  ['controlar el acceso a un objeto costoso', '<b>Proxy</b>', 'caché, carga diferida, permisos']
])}
      `,
      ejercicios: [
        { n: 1, titulo: 'Reconoce el patrón',
          enunciado: 'Di qué patrón aplicarías: (a) un editor que debe exportar a PDF, HTML o Markdown; (b) un juego donde varios elementos reaccionan cuando el jugador sube de nivel; (c) añadir cifrado y compresión a un flujo de datos en cualquier combinación; (d) crear el analizador adecuado según la extensión del archivo; (e) integrar una biblioteca ajena cuya interfaz no encaja con la tuya.',
          pista: 'Busca la palabra clave del problema: «varios algoritmos», «avisar», «añadir», «crear según», «interfaz distinta».',
          solucion: `<p><b>(a) Estrategia.</b> Varias formas de hacer lo mismo (exportar), intercambiables. Cada formato es una clase con un método <code>exportar(documento)</code>.</p>
<p><b>(b) Observador.</b> El jugador notifica «subí de nivel» y los interesados (interfaz, logros, enemigos, música) reaccionan sin que el jugador los conozca. Añadir un sistema de logros nuevo no toca la clase <code>Jugador</code>.</p>
<p><b>(c) Decorador.</b> <code>Cifrado(Comprimido(Archivo()))</code> o <code>Comprimido(Cifrado(Archivo()))</code>, en cualquier orden y combinación, con dos clases en lugar de cuatro. Así están construidos los flujos de Java.</p>
<p><b>(d) Fábrica.</b> <code>FabricaAnalizadores.crear("csv")</code> devuelve el analizador adecuado, y quien lo usa no conoce las clases concretas.</p>
<p><b>(e) Adaptador.</b> Una clase que implementa <i>tu</i> interfaz y por dentro traduce las llamadas a la biblioteca ajena. Su gran virtud: si mañana cambias de biblioteca, solo reescribes el adaptador. Es la forma estándar de evitar que una dependencia externa se infiltre por todo tu código.</p>` },
        { n: 2, titulo: 'Implementa estrategia',
          enunciado: 'Implementa en JavaScript (consola del laboratorio) un sistema de cálculo de descuentos con tres estrategias: sin descuento, porcentaje fijo, y descuento escalonado por monto. Muestra cómo se cambia la estrategia en ejecución.',
          pista: 'Una interfaz común y un objeto que la usa sin saber cuál es.',
          solucion: `${cod('js', `// Las estrategias: en JS basta con que tengan el mismo método
class SinDescuento {
  calcular(monto) { return 0; }
  nombre() { return "Sin descuento"; }
}

class DescuentoPorcentaje {
  constructor(pct) { this.pct = pct; }
  calcular(monto) { return monto * this.pct; }
  nombre() { return \`Descuento \${(this.pct * 100).toFixed(0)}%\`; }
}

class DescuentoEscalonado {
  constructor(tramos) { this.tramos = tramos; }   // [[500, 0.05], [1000, 0.10]]
  calcular(monto) {
    let pct = 0;
    for (const [minimo, p] of this.tramos) {
      if (monto >= minimo) pct = p;               // el tramo más alto que aplique
    }
    return monto * pct;
  }
  nombre() { return "Descuento escalonado"; }
}

class Carrito {
  constructor(estrategia = new SinDescuento()) {
    this.items = [];
    this.estrategia = estrategia;
  }
  agregar(nombre, precio, cant = 1) {
    this.items.push({ nombre, precio, cant });
    return this;
  }
  subtotal() { return this.items.reduce((s, i) => s + i.precio * i.cant, 0); }
  descuento() { return this.estrategia.calcular(this.subtotal()); }
  total() { return this.subtotal() - this.descuento(); }
  resumen() {
    return \`\${this.estrategia.nombre().padEnd(24)} subtotal \${this.subtotal().toFixed(2)}  -\${this.descuento().toFixed(2)}  = \${this.total().toFixed(2)}\`;
  }
}

const c = new Carrito();
c.agregar("Teclado", 180, 2).agregar("Monitor", 890);

for (const e of [new SinDescuento(),
                 new DescuentoPorcentaje(0.10),
                 new DescuentoEscalonado([[500, 0.05], [1000, 0.12]])]) {
  c.estrategia = e;                       // ← se cambia en ejecución
  console.log(c.resumen());
}`)}
<p><b>Lo que demuestra el bucle final:</b> el mismo carrito, con los mismos productos, produce tres resultados distintos solo cambiando un objeto. La clase <code>Carrito</code> <b>no tiene un solo <code>if</code> sobre tipos de descuento</b> y no necesita cambiar nunca para admitir uno nuevo.</p>
<p><b>Nota sobre JavaScript y Python:</b> no hace falta declarar una interfaz. Basta con que los objetos tengan el método <code>calcular</code>: eso es <i>duck typing</i>. La estrategia puede ser incluso una función suelta (<code>monto =&gt; monto * 0.1</code>), que es la versión más ligera del patrón y la más idiomática en lenguajes con funciones de primera clase. En Java o C# haría falta la interfaz explícita.</p>` },
        { n: 3, titulo: 'Implementa observador',
          enunciado: 'Implementa un sistema de inventario donde, al bajar el stock de un producto por debajo del mínimo, se notifique automáticamente a: un registro de eventos, un generador de órdenes de compra y una alerta de pantalla. El producto no debe conocer a ninguno de ellos.',
          pista: 'Lista de suscriptores y un método privado que los recorre.',
          solucion: `${cod('python', `class Observable:
    def __init__(self):
        self.__observadores = []

    def suscribir(self, obs):
        self.__observadores.append(obs)
        return obs                       # para poder desuscribir después

    def desuscribir(self, obs):
        self.__observadores.remove(obs)

    def _emitir(self, evento):
        for obs in list(self.__observadores):    # copia: puede cambiar durante el bucle
            try:
                obs(evento)
            except Exception as e:
                # un observador que falla no debe tumbar a los demás
                logging.exception("Observador falló: %s", e)


class Producto(Observable):
    def __init__(self, codigo, nombre, stock, stock_minimo):
        super().__init__()
        self.codigo, self.nombre = codigo, nombre
        self.__stock, self.stock_minimo = stock, stock_minimo

    @property
    def stock(self): return self.__stock

    def vender(self, cantidad):
        if cantidad > self.__stock:
            raise StockInsuficiente(self.codigo, cantidad, self.__stock)
        anterior = self.__stock
        self.__stock -= cantidad
        if anterior >= self.stock_minimo > self.__stock:     # cruzó el umbral
            self._emitir({"tipo": "stock_bajo", "producto": self,
                          "stock": self.__stock, "minimo": self.stock_minimo})


# --- observadores: funciones sueltas, no hace falta una clase ---
def registrar_evento(ev):
    print(f"[LOG] {ev['producto'].codigo} bajó a {ev['stock']}")

def generar_orden_compra(ev):
    faltante = ev["minimo"] * 2 - ev["stock"]
    print(f"[COMPRAS] Orden de {faltante} unidades de {ev['producto'].nombre}")

def alertar_pantalla(ev):
    print(f"[ALERTA] ¡{ev['producto'].nombre} con solo {ev['stock']} unidades!")


p = Producto("ABC-001", "Teclado mecánico", stock=12, stock_minimo=5)
p.suscribir(registrar_evento)
p.suscribir(generar_orden_compra)
p.suscribir(alertar_pantalla)

p.vender(5)    # queda 7: no pasa nada
p.vender(3)    # queda 4: cruza el umbral y se disparan los tres observadores`)}
<p><b>Las cuatro decisiones que hacen robusto este diseño:</b></p>
<ul>
<li><b><code>Producto</code> no conoce a nadie.</b> Añadir un cuarto observador (enviar un SMS al dueño) no toca ni una línea de <code>Producto</code>. Eso es el principio abierto/cerrado en acción.</li>
<li><b>Solo se emite al <i>cruzar</i> el umbral</b> (<code>anterior &gt;= minimo &gt; actual</code>), no en cada venta por debajo. Sin esa condición, cada venta posterior volvería a generar órdenes de compra. Es un error muy frecuente en sistemas de alertas.</li>
<li><b>Un observador que falla no tumba a los demás.</b> Si el servidor de correo está caído, la orden de compra se genera igual. Sin ese <code>try</code>, el primer observador que lance una excepción impide que se ejecuten los siguientes.</li>
<li><b>Se recorre una copia de la lista</b>, por si un observador se desuscribe a sí mismo durante la notificación: modificar una lista mientras se recorre es un bug clásico y difícil de reproducir.</li>
</ul>
<p><b>Y la advertencia:</b> hay que proveer <code>desuscribir</code> y usarlo. En una interfaz gráfica, cada pantalla que se suscribe y no se desuscribe al cerrarse deja una referencia viva que impide liberar memoria. Es la causa número uno de fugas de memoria en aplicaciones de escritorio y móviles.</p>` },
        { n: 4, titulo: 'El problema del singleton',
          enunciado: 'Un equipo usa un singleton <code>Configuracion.obtener()</code> en 40 clases distintas. Enumera cuatro problemas concretos que esto va a causar y escribe la alternativa.',
          pista: 'Piensa en pruebas, en dependencias ocultas y en qué pasa si hacen falta dos configuraciones.',
          solucion: `<p><b>Los cuatro problemas, concretos:</b></p>
<ol>
<li><b>No se puede probar nada aisladamente.</b> Cada prueba que ejecute una de esas 40 clases carga la configuración real. Para probar con valores distintos hay que modificar el singleton globalmente, lo que <b>filtra estado entre pruebas</b>: una prueba que cambia la tasa de IGV hace fallar a otra que corre después, y el fallo depende del orden de ejecución. Es la clase de bug que consume días.</li>
<li><b>Las dependencias son invisibles.</b> El constructor de <code>CalculadoraImpuestos</code> no declara que necesita configuración; lo descubres cuando falla en ejecución. Nadie puede saber qué necesita una clase sin leer todo su cuerpo.</li>
<li><b>No se pueden tener dos configuraciones a la vez.</b> El día que haya que soportar dos países con reglas distintas, o procesar datos de producción y de pruebas en el mismo proceso, el diseño se rompe por completo y hay que tocar 40 clases.</li>
<li><b>Problemas de concurrencia y de orden de inicialización.</b> ¿Qué pasa si dos hilos piden la instancia a la vez? ¿Y si una clase usa la configuración antes de que se haya cargado? Los singletons perezosos tienen una historia larga de bugs sutiles, y en Java el «doble chequeo» mal escrito fue un error documentado durante años.</li>
</ol>
<p><b>La alternativa — crear una vez e inyectar:</b></p>
${cod('python', `# Composición en el punto de entrada: una sola instancia, pero explícita
def main():
    config = Configuracion.desde_archivo("config.yml")
    repo = RepositorioMySQL(config.bd)
    impuestos = CalculadoraImpuestos(config.tasas)
    servicio = ServicioFacturacion(repo, impuestos, config.moneda)
    app = App(servicio)
    app.ejecutar()

# Cada clase declara lo que necesita:
class CalculadoraImpuestos:
    def __init__(self, tasas):          # no "la configuración entera": solo lo suyo
        self.tasas = tasas`)}
<p><b>Lo que se gana:</b> hay <b>una sola instancia</b> (el objetivo original del singleton), pero ahora las dependencias son explícitas, las pruebas pasan sus propios valores, y tener dos configuraciones es crear dos objetos.</p>
<p><b>El detalle fino:</b> <code>CalculadoraImpuestos</code> recibe solo <code>config.tasas</code>, no la configuración completa. Pasar el objeto entero de configuración a todas partes es un singleton con otro nombre: sigue ocultando qué necesita cada clase. <b>Pasa lo mínimo que la clase necesita</b>, y su firma se convierte en documentación.</p>
<p><b>Para ser justos con el singleton:</b> tiene usos legítimos, sobre todo cuando representa un recurso que de verdad es único e inmutable (una tabla de constantes físicas) o en lenguajes donde la alternativa es más incómoda. Pero en la inmensa mayoría de los casos en que se usa, es una variable global con corbata.</p>` },
        { n: 5, titulo: 'Sobreingeniería',
          enunciado: 'Un programa de 200 líneas que lee un CSV y calcula promedios fue «mejorado» con: una fábrica abstracta de lectores, tres interfaces, un singleton de configuración, un observador para el progreso y un decorador para el log. Critica el resultado y di qué dejarías. Luego explica cuándo cada uno de esos patrones <b>sí</b> estaría justificado.',
          pista: 'La complejidad accidental es tan dañina como la falta de diseño.',
          solucion: `<p><b>La crítica:</b> un programa de 200 líneas con cinco patrones probablemente tiene ahora 800 líneas, ocho archivos y es mucho más difícil de entender que el original. Cada patrón añade <b>indirección</b>: para seguir qué pasa al leer una fila hay que saltar entre una fábrica, una interfaz, un decorador y un observador. Eso se llama <b>complejidad accidental</b>: dificultad que no viene del problema sino de la solución.</p>
<p>El peor efecto es que un programador nuevo tarda horas en entender algo que en su forma directa se leía de corrido en diez minutos.</p>
<p><b>Qué dejaría:</b> prácticamente nada. Un script de 200 líneas que lee un CSV y promedia debería ser:</p>
${cod('python', `def leer_csv(ruta):
    with open(ruta, encoding="utf-8") as f:
        return list(csv.DictReader(f))

def promedio_por(filas, campo_grupo, campo_valor):
    acumulado = defaultdict(list)
    for fila in filas:
        acumulado[fila[campo_grupo]].append(float(fila[campo_valor]))
    return {k: sum(v) / len(v) for k, v in acumulado.items()}

if __name__ == "__main__":
    filas = leer_csv(sys.argv[1])
    for grupo, prom in promedio_por(filas, "vendedor", "monto").items():
        print(f"{grupo}: {prom:.2f}")`)}
<p>Funciones pequeñas con nombres claros, sin estado global, fáciles de probar. <b>Eso ya es buen diseño</b>: la ausencia de patrones no significa ausencia de criterio.</p>
<p><b>Cuándo cada patrón sí estaría justificado:</b></p>
${tabla(['Patrón', 'Se justifica cuando…'], [
  ['<b>Fábrica de lectores</b>', 'hay que soportar CSV, JSON, XML y Excel, y el formato se decide en ejecución'],
  ['<b>Interfaces</b>', 'hay más de una implementación real, o hace falta sustituirlas en pruebas'],
  ['<b>Singleton de configuración</b>', 'casi nunca: usa inyección'],
  ['<b>Observador de progreso</b>', 'el proceso tarda minutos y varias partes (barra de progreso, log, métricas) deben reaccionar'],
  ['<b>Decorador de log</b>', 'hay que poder activar y desactivar el registro sin tocar la lógica, o combinarlo con caché y reintentos']
])}
<p><b>La regla práctica — «la regla de tres»:</b> no abstraigas hasta tener <b>tres</b> casos reales. Con uno, escribe lo directo. Con dos, aguanta la tentación y quizá duplica. Con tres ya ves el eje de variación de verdad, y la abstracción que diseñes será la correcta en lugar de la que imaginaste. Las abstracciones prematuras casi siempre abstraen por el eje equivocado, y deshacerlas cuesta más que no haberlas hecho.</p>
<p>Y la frase que conviene recordar, de Kent Beck: <b>«haz que funcione, haz que esté bien, hazlo rápido»</b>, en ese orden.</p>` }
      ],
      quiz: [
        { p: 'El patrón estrategia sirve para…',
          ops: ['crear una sola instancia', 'encapsular varias formas de hacer algo e intercambiarlas, incluso en ejecución',
            'avisar a varios objetos de un cambio', 'añadir responsabilidades a un objeto'],
          ok: 1, exp: 'Cada algoritmo es una clase con la misma interfaz. Añadir uno nuevo no modifica el código que lo usa.' },
        { p: 'El singleton está mal visto principalmente porque…',
          ops: ['es lento', 'es una variable global disfrazada que oculta dependencias y dificulta las pruebas',
            'usa mucha memoria', 'no funciona en Python'],
          ok: 1, exp: 'El estado se filtra entre pruebas, las dependencias no aparecen en las firmas y tener dos instancias se vuelve imposible. La alternativa es inyectar.' },
        { p: 'La forma correcta de usar los patrones de diseño es…',
          ops: ['aplicarlos desde el primer día a todo', 'escribir la solución simple y aplicar el patrón cuando el cambio empiece a doler',
            'usar al menos tres por proyecto', 'memorizar los 23 del catálogo'],
          ok: 1, exp: 'Son el destino de una refactorización, no el punto de partida. Aplicados sin necesidad producen complejidad accidental.' }
      ]
    }
  ]
});
