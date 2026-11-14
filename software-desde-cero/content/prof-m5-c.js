(function () {
var S = SDC.S;

S('m5', 'm5.di', { title: 'Inyección de dependencias e inversión de control',
  ask: '¿Cómo se aplica aquí la inyección de dependencias?',
  lesson: `
> **La idea en simple.** Si una clase crea por sí misma todo lo que necesita (la conexión a la base de datos, el cliente de correo, el reloj), queda soldada a esas piezas concretas: no puedes probarla sin una base real ni cambiar de proveedor sin editarla. La inyección de dependencias propone lo contrario: la clase **declara** lo que necesita y alguien de afuera se lo **entrega**. Es una idea simple que cambia por completo cómo se arma una aplicación.

## El problema: dependencias escondidas
Mira este caso de uso:
~~~js
class RegistrarIngreso {
  async ejecutar(placa) {
    const db = new PostgresCliente('postgres://produccion…');       // crea su propia conexión
    const ahora = new Date();                                       // lee el reloj real
    await db.insertar('estadias', { placa, entrada: ahora });
    await new ClienteCorreo('smtp.empresa.pe').enviar('ops@…', 'Ingresó ' + placa);
  }
}
~~~
Tiene tres dependencias que nadie ve desde afuera: la base de datos, el reloj y el correo. Para probarlo hace falta una base de datos real, un servidor de correo y paciencia para que la hora sea la que se quiere probar. Para usar otra base (o un archivo en pruebas, o SQLite en una sede sin red) hay que modificar la clase. Y la firma («ejecutar(placa)») miente: parece que solo necesita una placa.

## La solución: recibir en vez de crear
~~~js
class RegistrarIngreso {
  constructor({ estadias, reloj, notificador }) {                   // las dependencias se declaran
    this.estadias = estadias; this.reloj = reloj; this.notificador = notificador;
  }
  async ejecutar(placa) {
    const estadia = { placa, entrada: this.reloj.ahora() };
    await this.estadias.guardar(estadia);
    await this.notificador.enviar('Ingresó ' + placa);
    return estadia;
  }
}
~~~
Ahora la clase depende de **lo que hacen** sus colaboradores (guardar, decir la hora, enviar), no de **quiénes son**. En producción recibe un repositorio de PostgreSQL, el reloj del sistema y un notificador por correo; en pruebas, objetos falsos en memoria:
~~~js
const guardadas = [];
const caso = new RegistrarIngreso({
  estadias: { guardar: async e => { guardadas.push(e); } },
  reloj: { ahora: () => new Date('2026-11-13T08:00:00-05:00') },
  notificador: { enviar: async () => {} }
});
caso.ejecutar('ABC-123').then(e => console.log(guardadas.length, e.entrada.toISOString()));  // 1 2026-11-13T13:00:00.000Z
~~~
Eso es **inyección de dependencias** (DI): pasar a un objeto los objetos que necesita, en lugar de que los cree o los busque. El nombre lo popularizó Martin Fowler en el artículo *Inversion of Control Containers and the Dependency Injection pattern* (2004).

## Tres formas de inyectar
- **Por constructor:** las dependencias se pasan al crear el objeto, como arriba. Es la forma preferida: el objeto nunca existe a medio configurar, y la lista de parámetros muestra con honestidad cuántas cosas necesita (si son ocho, la clase hace demasiado).
- **Por método o propiedad** (*setter injection*): se asignan después de crear el objeto. Útil para dependencias opcionales, pero permite objetos incompletos.
- **Por parámetro de la operación:** se pasa la dependencia en cada llamada («calcular(estadia, reloj)»). Útil cuando varía por llamada.
En JavaScript y en estilo funcional, inyectar es muchas veces simplemente pasar funciones como argumentos, o usar clausuras: «const crearRegistrar = ({ estadias, reloj }) => async placa => …».

## Inversión de control
La DI es un caso de una idea más general: la **inversión de control** (IoC). En un programa tradicional, tu código llama a las bibliotecas. Con inversión de control, es el framework el que llama a tu código: tú escribes el manejador de una ruta, y Express decide cuándo invocarlo; tú escribes un componente, y React decide cuándo dibujarlo. Se la conoce como el **principio de Hollywood**: "no nos llames, nosotros te llamaremos". Ralph Johnson y Brian Foote ya la describían en 1988 como la característica que distingue un **framework** de una **biblioteca**. La DI invierte el control de un aspecto concreto: quién crea las dependencias.

## Relación con la inversión de dependencias (la D de SOLID)
No son lo mismo, aunque se complementan:
- La **inversión de dependencias** (DIP) es un principio de diseño: los módulos de alto nivel (casos de uso) no deben depender de los de bajo nivel (PostgreSQL, SMTP); ambos deben depender de abstracciones, y las abstracciones las define el alto nivel.
- La **inyección de dependencias** es una técnica para cumplirlo: como el caso de uso no crea la implementación concreta, alguien debe entregársela.
Se puede inyectar sin invertir (inyectar directamente un «PostgresCliente» concreto) y eso ya mejora las pruebas, pero el beneficio completo llega cuando lo inyectado es una interfaz definida por el dominio.

## La raíz de composición
Si nadie crea sus dependencias, ¿quién las crea? Un único lugar al **arrancar** la aplicación, que Mark Seemann llamó la **raíz de composición** (*composition root*): el «main», el «index.js» o la función de arranque del servidor. Ahí, y solo ahí, se leen la configuración y las variables de entorno, se crean las implementaciones concretas y se conectan entre sí:
~~~js
// index.js: la raíz de composición de PatioApp
const config = { db: process.env.DATABASE_URL, smtp: process.env.SMTP_HOST };
const db = crearPool(config.db);
const estadias = new RepositorioEstadiasPg(db);
const reloj = { ahora: () => new Date() };
const notificador = config.smtp ? new NotificadorCorreo(config.smtp) : { enviar: async m => console.log(m) };
const registrarIngreso = new RegistrarIngreso({ estadias, reloj, notificador });
app.post('/ingresos', async (req, res) => res.json(await registrarIngreso.ejecutar(req.body.placa)));
~~~
El resto del código no sabe nada de variables de entorno ni de qué base se usa. Cambiar de proveedor de correo, o usar un notificador de consola en desarrollo, es cambiar una línea aquí.

## Contenedores de inyección
En aplicaciones grandes, la raíz de composición puede tener cientos de líneas. Los **contenedores de IoC** automatizan el armado: se registran las clases y sus dependencias, y el contenedor construye el grafo completo. Ejemplos: Spring en Java (desde 2003, de Rod Johnson), el contenedor integrado de ASP.NET Core, Angular (que tiene DI en el corazón del framework), NestJS e InversifyJS en TypeScript, Dagger en Android. Ofrecen además **ciclos de vida**: una sola instancia para toda la aplicación (*singleton*), una por petición HTTP (*scoped*) o una nueva cada vez (*transient*).
Los contenedores no son obligatorios. Muchos equipos prefieren la **DI pura** (*pure DI*), armando todo a mano en la raíz de composición: es más explícito, los errores aparecen al compilar o al arrancar y no hay magia que depurar. Un contenedor vale la pena cuando el grafo es grande y los ciclos de vida importan.

## El antipatrón Service Locator
Una alternativa tentadora es un registro global al que cada clase le pide lo que necesita: «Servicios.obtener('estadias')». Se llama **Service Locator**, y Seemann y otros lo consideran un antipatrón: las dependencias vuelven a esconderse (la firma no las muestra), las pruebas deben configurar el registro global, y un servicio faltante solo se descubre al ejecutar esa línea. Con inyección por constructor, si falta algo, falla al arrancar.

## Ejemplo resuelto: hacer comprobable el cálculo de tarifas nocturnas
PatioApp cobra un recargo de 5 soles si la salida es entre las 22:00 y las 6:00. La primera versión usaba «new Date()» dentro de «calcularMonto», y la prueba "cobra recargo nocturno" solo pasaba si se ejecutaba de noche.
1. **Identificar la dependencia oculta:** el reloj del sistema.
2. **Declararla:** «calcularMonto(estadia, { reloj })», o inyectar el reloj al construir la «CalculadoraDeTarifas».
3. **Probar con un reloj fijo:** «{ ahora: () => new Date('2026-11-13T23:30:00-05:00') }» verifica el recargo; otro a las 14:00 verifica que no se cobre. Las pruebas son deterministas y corren en milisegundos.
4. **Conectar en la raíz:** en producción se inyecta el reloj real; en un entorno de demostración, uno que avanza más rápido para mostrar los cobros.
5. **Resultado:** el mismo cambio permitió probar el caso borde de las 22:00 exactas, donde estaba el error real (se usaba «>» en lugar de «>=»), que llevaba meses cobrando mal a las salidas en ese minuto.


## Cuánto inyectar
No todo merece inyectarse. Las funciones puras y los objetos de valor («Monto», «Placa», un «Math.round») se usan directamente: no tienen efectos ni varían por entorno. Lo que sí conviene inyectar son las dependencias **volátiles**: las que tocan el mundo exterior (bases de datos, red, archivos, correo), las no deterministas (reloj, números aleatorios, identificadores únicos) y las que pueden cambiar de proveedor. Inyectar de más produce constructores largos y abstracciones que nadie necesita; inyectar de menos, código que solo se prueba en producción. La regla de Seemann es útil: inyecta lo que quieras poder reemplazar en una prueba o en otro entorno, y nada más.`,
  links: [['m5.solid', 'la inversión de dependencias que la DI hace posible'], ['m5.pat1', 'Singleton y fábricas frente a la raíz de composición'], ['m5.grasp', 'indirección y variaciones protegidas']],
  read: 'Fowler, *Inversion of Control Containers and the Dependency Injection pattern* (2004); Seemann y van Deursen, *Dependency Injection: Principles, Practices, and Patterns* (2019).',
  terms: [
    ['Inyección de dependencias', 'técnica en la que un objeto recibe desde afuera los objetos que necesita en lugar de crearlos o buscarlos', ['Por constructor.', 'Fowler, 2004.', 'Facilita las pruebas.']],
    ['Inversión de control', 'principio por el que un framework llama al código de la aplicación en lugar de que la aplicación llame a la biblioteca', ['Principio de Hollywood.', 'Express, React.', 'Framework frente a biblioteca.']],
    ['Raíz de composición', 'único lugar al arrancar la aplicación donde se crean y conectan las implementaciones concretas', ['index.js.', 'Seemann.', 'Lee la configuración.']],
    ['Contenedor de IoC', 'herramienta que registra componentes y construye automáticamente el grafo de dependencias', ['Spring.', 'ASP.NET Core.', 'Angular.']],
    ['Ciclo de vida', 'regla que define cuándo se crea y se reutiliza una instancia inyectada', ['Singleton.', 'Por petición.', 'Transitorio.']],
    ['Service Locator', 'antipatrón en el que las clases piden sus dependencias a un registro global', ['Dependencias escondidas.', 'Fallos en ejecución.', 'Difícil de probar.']],
    ['Doble de prueba', 'objeto que reemplaza a una dependencia real en una prueba', ['Reloj fijo.', 'Repositorio en memoria.', 'Gracias a la DI.']],
    ['DI pura', 'inyección de dependencias armada a mano en la raíz de composición, sin contenedor', ['Explícita.', 'Falla al arrancar.', 'Sin magia.']]
  ],
  q: [
    ['¿Qué problema tiene una clase que hace «new PostgresCliente(...)» dentro de sus métodos?', 'Queda acoplada a esa implementación y no se puede probar sin la base real', ['Ninguno', 'Es más lenta', 'No compila'], 'Dependencia escondida.', 1],
    ['¿Cuál es la forma preferida de inyectar dependencias obligatorias?', 'Por constructor', ['Por variable global', 'Con un Service Locator', 'Leyendo variables de entorno en cada método'], 'El objeto nunca queda a medio configurar.', 2],
    ['¿Dónde se deben crear las implementaciones concretas?', 'En la raíz de composición, al arrancar la aplicación', ['En cada clase que las usa', 'En las pruebas solamente', 'En la base de datos'], 'Un solo lugar.', 2],
    ['¿Qué diferencia hay entre inversión de dependencias e inyección de dependencias?', 'La primera es un principio de diseño; la segunda, una técnica para cumplirlo', ['Son sinónimos', 'La inyección es un framework', 'La inversión solo existe en Java'], 'Se complementan.', 3],
    ['¿Por qué el Service Locator se considera un antipatrón?', 'Porque esconde las dependencias y los faltantes solo se descubren al ejecutar', ['Porque es lento', 'Porque usa clases', 'Porque requiere TypeScript'], 'La firma no muestra lo que necesita.', 3],
    ['¿Cómo se prueba de forma determinista una regla que depende de la hora actual?', 'Inyectando un reloj que devuelve una hora fija', ['Ejecutando la prueba a esa hora', 'Desactivando la prueba', 'Cambiando la hora del servidor'], 'El reloj es una dependencia.', 2],
    ['Una clase recibe ocho dependencias en su constructor. ¿Qué sugiere?', 'Que probablemente tiene demasiadas responsabilidades', ['Que está muy bien diseñada', 'Que hay que usar un Service Locator', 'Que falta un contenedor'], 'La inyección por constructor hace visible el problema.', 4],
    { tf: 'Usar inyección de dependencias exige un contenedor de IoC.', v: false, e: 'La DI pura se arma a mano en la raíz de composición.', l: 2 },
    { tf: 'El principio de Hollywood describe la inversión de control: el framework llama a tu código.', v: true, e: '"No nos llames, nosotros te llamaremos".', l: 1 },
    { c: 'Escribe «recargoNocturno(hora)»: devuelve 5 si la hora (0–23) está entre las 22 y las 5 inclusive, y 0 si no.', f: 'recargoNocturno', p: ['hora'], t: [[[22], 5], [[23], 5], [[3], 5], [[5], 5], [[6], 0], [[14], 0], [[21], 0]], sol: '  return hora >= 22 || hora < 6 ? 5 : 0;', l: 1 },
    { c: 'Escribe «registrarCon(placa, horaFija)»: crea un reloj falso { ahora: () => horaFija }, registra { placa, hora } usando ese reloj en un arreglo en memoria y devuelve el arreglo.', f: 'registrarCon', p: ['placa', 'horaFija'], t: [[['ABC-123', 8], [{ placa: 'ABC-123', hora: 8 }]], [['XYZ-9', 23], [{ placa: 'XYZ-9', hora: 23 }]]], sol: '  const reloj = { ahora: () => horaFija };\n  const repo = [];\n  const registrar = (deps, p) => deps.repo.push({ placa: p, hora: deps.reloj.ahora() });\n  registrar({ reloj, repo }, placa);\n  return repo;', l: 3 },
    { c: 'Escribe «montoConReloj(dias, hora)»: 20 soles por día más el recargo nocturno (5 si la hora está entre 22 y 5).', f: 'montoConReloj', p: ['dias', 'hora'], t: [[[3, 14], 60], [[2, 23], 45], [[1, 6], 20], [[1, 5], 25]], sol: '  return dias * 20 + (hora >= 22 || hora < 6 ? 5 : 0);', l: 2 }
  ],
  gen: function (g) {
    var ca = [['La clase hace new PostgresCliente() en un método', 'Dependencia escondida'], ['La clase recibe el repositorio en su constructor', 'Inyección por constructor'], ['Cada clase llama a Servicios.obtener("correo")', 'Service Locator'], ['index.js crea todas las implementaciones y las conecta', 'Raíz de composición'], ['Express llama a tu manejador cuando llega una petición', 'Inversión de control'], ['Spring construye el grafo de objetos automáticamente', 'Contenedor de IoC']];
    var op = ['Dependencia escondida', 'Inyección por constructor', 'Service Locator', 'Raíz de composición', 'Inversión de control', 'Contenedor de IoC'];
    ca.forEach(function (c) { g.mcq(2, '¿Qué concepto describe? ' + c[0], c[1], op.filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Inyección de dependencias.'); });
    var vi = [['Una conexión compartida por toda la aplicación', 'Singleton'], ['Un objeto que debe ser distinto en cada petición HTTP', 'Por petición (scoped)'], ['Un objeto barato y sin estado que se crea cada vez', 'Transitorio (transient)']];
    vi.forEach(function (v) { g.mcq(3, '¿Qué ciclo de vida corresponde? ' + v[0], v[1], ['Singleton', 'Por petición (scoped)', 'Transitorio (transient)', 'Global mutable'].filter(function (x) { return x !== v[1]; }), 'Ciclos de vida en contenedores.'); });
    g.times(6, function (R) { var d = R.int(1, 6), h = R.int(0, 23); var m = d * 20 + (h >= 22 || h < 6 ? 5 : 0); g.input(2, 'Con un reloj inyectado que marca las ' + h + ':00, ¿cuánto cobra PatioApp por ' + d + ' días (20 por día, recargo de 5 si la salida es entre las 22:00 y las 5:59)?', m, 'Días por 20 más el recargo nocturno si corresponde.'); });
  },
  checks: [
    ['¿Qué es la inyección de dependencias y qué problema resuelve?', 'Pasar a un objeto lo que necesita en vez de que lo cree; elimina dependencias escondidas y permite probar y cambiar implementaciones.'],
    ['¿Qué es la raíz de composición?', 'El único lugar al arrancar donde se crean las implementaciones concretas y se conectan.'],
    ['Diferencia inversión de control, inversión de dependencias e inyección de dependencias.', 'IoC: el framework llama a tu código; DIP: depender de abstracciones; DI: técnica de entregar las dependencias desde afuera.'],
    ['¿Cuándo vale la pena un contenedor de IoC y por qué evitar el Service Locator?', 'Cuando el grafo es grande y los ciclos de vida importan; el Service Locator esconde dependencias y falla tarde.']
  ],
  cites: ['Fowler, M. (2004). Inversion of Control Containers and the Dependency Injection pattern. martinfowler.com.', 'Seemann, M. y van Deursen, S. (2019). *Dependency Injection: Principles, Practices, and Patterns*. Manning.', 'Johnson, R. y Foote, B. (1988). Designing Reusable Classes. *Journal of Object-Oriented Programming*, 1(2).', 'Martin, R. C. (1996). The Dependency Inversion Principle. *C++ Report*, 8(6).', 'Johnson, R. (2002). *Expert One-on-One J2EE Design and Development*. Wrox.'],
  project: { t: 'Desenredar dependencias',
    goal: 'Refactorizar un módulo con dependencias escondidas hacia inyección de dependencias con pruebas.',
    steps: ['Toma o escribe un módulo que use directamente una base de datos, el reloj y una API externa.', 'Lista sus dependencias escondidas y define una interfaz mínima para cada una.', 'Cambia el módulo para recibirlas por constructor y crea una raíz de composición.', 'Escribe pruebas con dobles (reloj fijo, repositorio en memoria, API falsa) que corran sin red.', 'Compara el tiempo y la fiabilidad de las pruebas antes y después.'],
    deliver: 'El código antes y después, las pruebas y la comparación.' },
  hito: ['Crea la raíz de composición de PatioApp e inyecta el repositorio, el reloj y el notificador en los casos de uso.', 'Escribe en PatioApp las pruebas del recargo nocturno con un reloj inyectado, incluido el borde de las 22:00.']
});
SDC.after('m5.di', 'm5.solid');
})();
