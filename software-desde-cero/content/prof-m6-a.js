(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m6', { prof: true });

D('m6.clean', `## Estándares de codificación del equipo
Las reglas de estilo valen más cuando el equipo las acuerda y una herramienta las aplica, en lugar de discutirlas en cada revisión. Un estándar útil cubre:
- **Formato:** lo decide un formateador automático (Prettier, Black, gofmt) y no se discute más. Go mostró el valor de esta idea: «gofmt» impuso desde 2009 un único formato para todo el código Go del mundo.
- **Nombres:** convenciones del lenguaje (camelCase en JavaScript, snake_case en Python) y del dominio (el lenguaje ubicuo).
- **Reglas de linter** acordadas, con la justificación de las menos obvias.
- **Prácticas prohibidas** con su motivo (nada de «var», ninguna consulta SQL armada concatenando textos, ningún dato personal en los registros).
Guías públicas que sirven de punto de partida: la de Google para varios lenguajes, PEP 8 para Python y la de Airbnb para JavaScript.

## Ejemplo resuelto: limpiar una función de PatioApp
Antes:
~~~js
function calc(u, d, f) {
  let r = 0;
  if (d > 0) { if (f == 1) { r = d * 20 * 0.75; } else { r = d * 20; } }
  if (u.t == 'C') r = r * 1.5;   // camiones
  return r;
}
~~~
Después:
~~~js
const TARIFA_DIARIA = 20, DESCUENTO_CONVENIO = 0.25, RECARGO_CAMION = 1.5;
function tarifaEstadia(unidad, dias, tieneConvenio) {
  if (dias <= 0) return 0;
  const base = dias * TARIFA_DIARIA * (unidad.tipo === 'camion' ? RECARGO_CAMION : 1);
  return tieneConvenio ? base * (1 - DESCUENTO_CONVENIO) : base;
}
~~~
Cambios: nombres que revelan intención, constantes con nombre en lugar de números mágicos, un tipo de vehículo legible en lugar de un código de una letra, cláusula de guarda para el caso trivial, comparación estricta y un parámetro booleano con nombre claro (aunque, mejor aún, se podría pasar el convenio como objeto con su porcentaje, para no tener el 0,25 fijo en el código). El comentario "camiones" desaparece porque el código ya lo dice.`);

D('m6.refactor', `## Refactorización a gran escala
Algunas refactorizaciones afectan a cientos de archivos o a varios equipos: renombrar un concepto del dominio, cambiar una biblioteca por otra, partir un módulo grande. Técnicas para hacerlas sin detener el desarrollo:
- **Cambio en paralelo** (*parallel change* o *expand and contract*): primero se **expande** (se agrega la forma nueva conviviendo con la vieja), luego se **migran** los usos poco a poco, y al final se **contrae** (se elimina la vieja). Cada paso es pequeño, seguro y desplegable.
- **Abstracción por rama:** se introduce una interfaz delante del componente a reemplazar, se implementa la versión nueva detrás y se cambia con una bandera.
- **Herramientas de transformación automática** (*codemods*): programas que modifican el código de forma sistemática usando el árbol de sintaxis, como jscodeshift en JavaScript. Facebook y Google los usan para cambios en millones de líneas.
- **Refactorizaciones del IDE:** renombrar, extraer función o mover clase con la herramienta del editor, que entiende el código, es mucho más seguro que buscar y reemplazar texto.

## Ejemplo resuelto: de "vehículo" a "unidad"
En PatioApp el código usaba "vehículo", pero el negocio habla de "unidad". Se aplica cambio en paralelo:
1. **Expandir:** la API acepta tanto «vehiculoId» como «unidadId» y responde ambos; en el código nuevo se usa «Unidad».
2. **Migrar:** un codemod renombra las clases y variables internas; la app móvil pasa a usar «unidadId» en su siguiente versión.
3. **Contraer:** cuando las métricas muestran que ninguna versión de la app usa ya «vehiculoId» (tres meses después), se elimina.
Cada paso se despliega por separado; en ningún momento hubo que coordinar un cambio simultáneo entre la API y la app.`);

D('m6.errors', `## Errores en sistemas asíncronos y distribuidos
En código asíncrono, los errores se pierden con facilidad:
- Una promesa rechazada que nadie espera ni captura produce, en el mejor caso, una advertencia en la consola; en Node.js reciente, termina el proceso. Siempre se espera («await») o se encadena un manejador.
- Dentro de un manejador de eventos o un temporizador, una excepción no llega al «try» que rodeaba el código que lo programó.
- Las operaciones en paralelo («Promise.all») fallan en cuanto falla una; si se necesitan todos los resultados, buenos y malos, se usa «Promise.allSettled».
- En llamadas a otros servicios, hay que distinguir errores **transitorios** (red, sobrecarga: se reintentan con espera exponencial) de **permanentes** (datos inválidos: no tiene sentido reintentar), y poner siempre un **tiempo de espera**: sin él, una llamada colgada retiene recursos para siempre.

## Ejemplo resuelto: errores en el registro de salida de PatioApp
| Situación | Tipo | Manejo |
| La placa no existe | error esperado del dominio | resultado con un mensaje claro para el operador, sin excepción |
| La estadía tiene deuda | regla de negocio | resultado "bloqueado" con el monto adeudado |
| La pasarela no responde en 10 s | transitorio externo | reintento con espera exponencial; luego, cobro en efectivo como alternativa |
| La base de datos rechaza por clave duplicada | posible doble envío | se trata como idempotente: se devuelve la salida ya registrada |
| Un valor nulo inesperado en el código | defecto del programa | excepción, registro con contexto y alerta; se corrige el código |
La regla general: los errores **esperados** son parte del flujo y se modelan como resultados; las **excepciones** quedan para lo verdaderamente excepcional y para los defectos.`);

D('m6.func', `## Programación funcional en el día a día de JavaScript
No hace falta un lenguaje funcional para aprovechar estas ideas. En JavaScript moderno:
- Los métodos «map», «filter», «reduce», «flatMap», «some» y «every» reemplazan muchos bucles con mutación.
- La sintaxis de propagación («...») y «structuredClone» permiten crear copias en lugar de modificar.
- «Object.freeze» impide modificar un objeto (de forma superficial).
- Las funciones de orden superior permiten extraer patrones repetidos (reintentar, medir tiempo, registrar) sin duplicar código.
- Bibliotecas como Immer permiten escribir código que "parece" mutar pero produce copias inmutables, y es la base del manejo de estado en Redux Toolkit.

## Ejemplo resuelto: el reporte de ocupación de PatioApp
Versión imperativa con mutación:
~~~js
function reporte(estadias) {
  const r = {};
  for (let i = 0; i < estadias.length; i++) {
    if (estadias[i].salida === null) {
      if (!r[estadias[i].zona]) r[estadias[i].zona] = 0;
      r[estadias[i].zona]++;
    }
  }
  return r;
}
~~~
Versión funcional:
~~~js
const abiertas = e => e.salida === null;
const contarPor = clave => (acc, x) => ({ ...acc, [x[clave]]: (acc[x[clave]] || 0) + 1 });
const reporte = estadias => estadias.filter(abiertas).reduce(contarPor('zona'), {});
~~~
La segunda separa la condición («abiertas») de la agregación («contarPor»), ambas reutilizables y probables por separado, y no modifica nada. En grandes volúmenes, la copia del objeto en cada paso puede ser costosa; ahí se acepta mutar un acumulador **local** que nadie más ve, sin perder la pureza de la función hacia fuera.

## Funciones puras y pruebas
Una ventaja muy concreta de la programación funcional es que las funciones **puras** (que dependen solo de sus argumentos y no tienen efectos secundarios) son las más fáciles de probar: no hace falta preparar una base de datos, ni simular la hora, ni limpiar estado después; basta con llamarlas y comparar el resultado. Por eso una estrategia habitual es empujar la lógica de negocio hacia funciones puras (calcular la tarifa, decidir si una salida está permitida) y dejar los efectos (leer la base, enviar el mensaje, escribir el registro) en una capa delgada alrededor. Es la idea de **núcleo funcional, cáscara imperativa** de Gary Bernhardt, y también facilita las pruebas basadas en propiedades.`);

S('m6', 'm6.design', { title: 'Diseño de módulos e interfaces',
  ask: '¿Qué principio de diseño de módulos o de interfaces se aplica?',
  lesson: `
> **La idea en simple.** Para manejar un auto no necesitas saber cómo funciona la inyección electrónica: usas el volante, los pedales y la palanca. Esa es una buena **interfaz**: simple por fuera, aunque por dentro haya mucha complejidad. Y el fabricante puede cambiar el motor sin que tengas que aprender a manejar de nuevo. Diseñar módulos es lo mismo: decidir qué esconder detrás de cada interfaz para que el sistema se pueda entender y cambiar por partes.

## El problema de la descomposición
Todo sistema grande se divide en módulos (funciones, clases, paquetes, servicios). La pregunta no es si dividir, sino **cómo**. Dos sistemas con la misma funcionalidad pueden tener divisiones muy distintas, y una de ellas puede hacer que cada cambio toque diez archivos mientras la otra lo resuelve en uno. Como el software pasa la mayor parte de su vida cambiando, la calidad de la división se mide sobre todo por **qué tan fácil es cambiarlo**.

## Ocultación de información
David Parnas publicó en 1972 *On the Criteria To Be Used in Decomposing Systems into Modules*, uno de los artículos más influyentes de la ingeniería de software. Comparó dos formas de dividir un programa sencillo (un índice de palabras clave en contexto, KWIC):
- La **convencional**, siguiendo los pasos del procesamiento (leer, desplazar, ordenar, imprimir): cada módulo es una etapa del flujo.
- La que propuso, según la **ocultación de información**: cada módulo **esconde una decisión de diseño que probablemente cambie** (cómo se guardan las líneas en memoria, cómo se ordena, el formato de entrada).
Con la primera división, cambiar el formato de almacenamiento obligaba a modificar casi todos los módulos, porque todos conocían ese formato. Con la segunda, el cambio quedaba dentro de un solo módulo. Su criterio:
:::cita Se propone que uno comience con una lista de decisiones de diseño difíciles o que probablemente cambien. Cada módulo se diseña entonces para ocultar esa decisión de los demás. | David Parnas, 1972
Esta idea es la raíz del **encapsulamiento** de la orientación a objetos, de las interfaces de los paquetes, de los contratos de las API y de los límites de los microservicios.

## Cohesión y acoplamiento
Larry Constantine y Edward Yourdon formalizaron en *Structured Design* (1979) dos medidas de la calidad de un módulo:
- **Cohesión:** qué tan relacionadas están las cosas **dentro** de un módulo. Alta cohesión significa que todo lo que contiene sirve a un propósito único. Clasificaron niveles de peor a mejor: casual (cosas puestas juntas sin razón, como un archivo «utils» con todo), lógica, temporal, procedimental, comunicacional, secuencial y **funcional** (todo contribuye a una sola tarea bien definida).
- **Acoplamiento:** qué tanto depende un módulo de **otros**. Bajo acoplamiento significa que se puede entender, probar y cambiar un módulo sin conocer los detalles de los demás. De peor a mejor: de contenido (un módulo modifica el interior de otro), común (comparten variables globales), externo, de control (uno le pasa banderas a otro para decirle qué hacer), de estampado (se pasa una estructura completa cuando se usa una parte) y **de datos** (solo se pasan los datos necesarios).
La meta clásica es **alta cohesión y bajo acoplamiento**. Una forma práctica de detectar problemas: si para entender o cambiar algo hay que abrir muchos archivos, el acoplamiento es alto; si un archivo cambia por razones muy distintas, la cohesión es baja (es la misma intuición que el principio de responsabilidad única de SOLID).

## Módulos profundos
John Ousterhout, en *A Philosophy of Software Design* (2018), agrega un criterio que ya viste: los mejores módulos son **profundos**: una **interfaz pequeña y simple** que esconde una **implementación grande y poderosa**. El ejemplo clásico es la entrada y salida de archivos de Unix: cinco llamadas básicas (abrir, leer, escribir, posicionarse, cerrar) esconden sistemas de archivos, cachés, discos y redes. Los módulos **superficiales** tienen una interfaz casi tan compleja como lo que hacen, y solo agregan costo. Ousterhout advierte contra la "clasitis": dividir en muchas clases pequeñas que solo pasan llamadas de una a otra no reduce la complejidad, la reparte.

## Diseñar interfaces
Principios para que una interfaz (de una función, una clase, una biblioteca o un servicio) sea buena:
- **Fácil de usar bien y difícil de usar mal** (Scott Meyers): el uso correcto debe ser el más natural, y los errores deben ser imposibles o detectarse pronto.
- **Pensar desde quien la usa:** escribir primero el código que la llamaría (o las pruebas, como en TDD) antes de implementarla.
- **Mínima y completa:** todo lo necesario y nada más. Cada función pública es una promesa que habrá que mantener; Joshua Bloch, que diseñó buena parte de las colecciones de Java, lo resume: "en caso de duda, déjalo fuera", porque siempre se puede agregar después, pero nunca quitar.
- **Nombres consistentes** y el mismo orden de parámetros en funciones parecidas.
- **Comportamiento predecible** y sin sorpresas (el principio de la menor sorpresa).
- **Diferenciar lo que se pide de lo que se recibe:** ser estricto con lo que se devuelve y claro con lo que se acepta.
- **Documentar el contrato:** qué espera, qué garantiza, qué errores puede producir.
- **Defaults sensatos**, para que el caso común no exija configuración.

## Dependencias y sus reglas
- **Principio de dependencias acíclicas:** el grafo de dependencias entre módulos no debe tener ciclos. Si A depende de B y B de A, no se pueden entender, probar ni desplegar por separado; se rompen extrayendo lo común o invirtiendo una dependencia.
- **Inversión de dependencias:** los módulos de alto nivel (las reglas del negocio) no deben depender de los de bajo nivel (la base de datos, el framework web); ambos dependen de abstracciones. Es la base de la arquitectura hexagonal y la limpia.
- **Ley de Deméter** (Ian Holland y Karl Lieberherr, Northeastern University, 1987), o "habla solo con tus amigos inmediatos": un método solo debería llamar a métodos de su propio objeto, de sus parámetros, de los objetos que crea y de sus atributos directos. Código como «estadia.getUnidad().getDueño().getTelefono().getNumero()» acopla al que llama con toda la cadena de estructuras; mejor «estadia.telefonoDelDueño()».
~~~js
// Detectar ciclos en el grafo de dependencias entre módulos
function tieneCiclo(grafo) {
  const estado = {};                                          // undefined: no visitado; 1: en proceso; 2: terminado
  const dfs = m => {
    if (estado[m] === 1) return true;
    if (estado[m] === 2) return false;
    estado[m] = 1;
    for (const d of grafo[m] || []) if (dfs(d)) return true;
    estado[m] = 2;
    return false;
  };
  return Object.keys(grafo).some(dfs);
}
console.log(tieneCiclo({ patios: ['tarifas'], tarifas: ['comun'], facturacion: ['tarifas', 'comun'], comun: [] }));
console.log(tieneCiclo({ patios: ['tarifas'], tarifas: ['patios'] }));
~~~

## Versionar las interfaces públicas
Cuando otros dependen de una interfaz (una biblioteca, una API), cambiarla puede romperlos. El **versionado semántico** (SemVer, propuesto por Tom Preston-Werner en 2010) codifica la compatibilidad en el número de versión MAYOR.MENOR.PARCHE:
- **PARCHE** (1.4.2 → 1.4.3): correcciones compatibles.
- **MENOR** (1.4.3 → 1.5.0): funcionalidad nueva compatible hacia atrás.
- **MAYOR** (1.5.0 → 2.0.0): cambios incompatibles.
Agregar un parámetro opcional o un campo nuevo en una respuesta suele ser compatible; quitar o renombrar algo, cambiar un tipo o volver obligatorio un parámetro, no. La **ley de Hyrum** (Hyrum Wright, Google) advierte: con suficientes usuarios, **todo** comportamiento observable de una interfaz será usado por alguien, incluso lo que no está documentado (el orden de una lista, el texto de un mensaje de error), así que hasta los cambios "compatibles" pueden romper a alguien.

## Ejemplo resuelto: el módulo de tarifas de PatioApp
1. **Decisión que probablemente cambie:** cómo se calculan las tarifas (por día, por hora, con convenios, con recargos por tipo, con promociones). La esconde un solo módulo.
2. **Interfaz profunda:** una función pública, «cotizar(estadia, fecha)», que devuelve el monto y el detalle de cada concepto. Por dentro, reglas configurables, convenios, redondeos y la tabla de feriados.
3. **Acoplamiento de datos:** recibe solo lo necesario (tipo de unidad, ingreso, salida, convenio), no la entidad completa de la base de datos.
4. **Sin ciclos:** «tarifas» no depende de «patios» ni de «facturacion»; ellos dependen de «tarifas».
5. **Ley de Deméter:** la facturación pide «cotizar(...)» en lugar de recorrer las tablas internas de tarifas.
6. **Prueba de la división:** cuando gerencia pidió tarifas por hora para estadías cortas, el cambio se hizo en un solo módulo, con sus pruebas, y ningún otro archivo cambió.`,
  links: [['m5.solid', 'los principios SOLID refinan cohesión, acoplamiento e inversión de dependencias'], ['m13.styles', 'la arquitectura aplica las mismas ideas a escala de sistema'], ['m6.clean', 'los módulos profundos de Ousterhout se presentaron en código limpio']],
  read: 'Parnas (1972); Ousterhout, *A Philosophy of Software Design* (2.ª ed., 2021), capítulos 4 a 9; Bloch, *How to Design a Good API and Why it Matters* (2006); semver.org.',
  terms: [
    ['Ocultación de información', 'principio de diseñar cada módulo para esconder una decisión de diseño que probablemente cambie', ['Parnas, 1972.', 'Raíz del encapsulamiento.', 'El cambio queda en un módulo.']],
    ['Cohesión', 'grado en que los elementos de un módulo sirven a un único propósito', ['Funcional es la mejor.', 'Un archivo utils tiene cohesión casual.', 'Constantine y Yourdon.']],
    ['Acoplamiento', 'grado de dependencia de un módulo respecto de otros', ['De datos es el mejor.', 'Las variables globales dan acoplamiento común.', 'Se busca que sea bajo.']],
    ['Módulo profundo', 'módulo con una interfaz simple que esconde una implementación poderosa', ['La E/S de archivos de Unix.', 'Ousterhout.', 'Lo contrario de superficial.']],
    ['Ley de Deméter', 'regla de que un método solo hable con sus colaboradores inmediatos', ['Evita cadenas a.getB().getC().', 'Holland y Lieberherr, 1987.', 'Reduce el acoplamiento.']],
    ['Dependencias acíclicas', 'principio de que el grafo de dependencias entre módulos no tenga ciclos', ['A depende de B y B de A es un ciclo.', 'Se rompe extrayendo lo común.', 'Permite probar por separado.']],
    ['Versionado semántico', 'esquema MAYOR.MENOR.PARCHE que indica la compatibilidad de los cambios', ['Preston-Werner, 2010.', 'MAYOR: incompatible.', 'MENOR: nueva funcionalidad compatible.']],
    ['Ley de Hyrum', 'con suficientes usuarios, todo comportamiento observable de una interfaz será usado por alguien', ['Hyrum Wright, Google.', 'Incluso lo no documentado.', 'Hace riesgosos los cambios "compatibles".']]
  ],
  q: [
    ['Según Parnas, ¿qué debe esconder cada módulo?', 'Una decisión de diseño difícil o que probablemente cambie', ['Una etapa del procesamiento', 'Todas las variables', 'El nombre del autor'], 'Ocultación de información, 1972.', 2],
    ['Un archivo utils.js contiene funciones de fechas, de impresión y de cálculo de tarifas. ¿Qué tipo de cohesión tiene?', 'Casual', ['Funcional', 'Secuencial', 'Comunicacional'], 'Cosas juntas sin una razón común.', 2],
    ['Dos módulos se comunican modificando una variable global compartida. ¿Qué acoplamiento es?', 'Común', ['De datos', 'De estampado', 'De control'], 'Uno de los peores.', 3],
    ['¿Qué es un módulo profundo?', 'Uno con interfaz simple que esconde una implementación poderosa', ['Uno con muchos archivos', 'Uno con muchos parámetros', 'Uno muy anidado'], 'Ousterhout.', 2],
    ['¿Qué viola «estadia.getUnidad().getDueño().getTelefono()»?', 'La ley de Deméter', ['El versionado semántico', 'La cohesión funcional', 'Nada'], 'Habla con desconocidos de la cadena.', 3],
    ['Una biblioteca en la versión 2.3.1 agrega una función nueva compatible. ¿Qué versión debería publicar?', '2.4.0', ['3.0.0', '2.3.2', '2.3.1'], 'MENOR para funcionalidad compatible.', 2],
    ['Un equipo cambia el orden en que su API devuelve una lista, sin cambiar la documentación, y rompe a un cliente. ¿Qué ley lo explica?', 'La ley de Hyrum', ['La ley de Conway', 'La ley de Brooks', 'La ley de Moore'], 'Todo comportamiento observable será usado.', 4],
    { tf: 'Dividir el código en muchas clases pequeñas que solo pasan llamadas entre sí siempre reduce la complejidad.', v: false, e: 'Ousterhout lo llama clasitis: reparte la complejidad sin reducirla.', l: 2 },
    { tf: 'Según Bloch, ante la duda sobre incluir algo en una API pública, conviene dejarlo fuera.', v: true, e: 'Siempre se puede agregar, pero nunca quitar.', l: 2 },
    { c: 'Escribe «tieneCiclo(grafo)»: grafo es {modulo: [dependencias]}; devuelve true si hay algún ciclo.', f: 'tieneCiclo', p: ['grafo'], t: [[[{ a: ['b'], b: ['c'], c: [] }], false], [[{ a: ['b'], b: ['a'] }], true], [[{ a: ['a'] }], true], [[{}], false]], sol: '  const e = {};\n  const dfs = m => { if (e[m] === 1) return true; if (e[m] === 2) return false; e[m] = 1; for (const d of grafo[m] || []) if (dfs(d)) return true; e[m] = 2; return false; };\n  return Object.keys(grafo).some(dfs);', l: 3 },
    { c: 'Escribe «siguienteVersion(version, tipo)»: version "M.m.p" y tipo "mayor", "menor" o "parche"; devuelve la nueva versión según SemVer.', f: 'siguienteVersion', p: ['version', 'tipo'], t: [[['2.3.1', 'menor'], '2.4.0'], [['2.3.1', 'mayor'], '3.0.0'], [['2.3.1', 'parche'], '2.3.2']], sol: '  let [M, m, p] = version.split(".").map(Number);\n  if (tipo === "mayor") return (M + 1) + ".0.0";\n  if (tipo === "menor") return M + "." + (m + 1) + ".0";\n  return M + "." + m + "." + (p + 1);', l: 2 },
    { c: 'Escribe «acoplamientoEferente(grafo, modulo)»: cuántos módulos distintos usa directamente el módulo.', f: 'acoplamientoEferente', p: ['grafo', 'modulo'], t: [[[{ a: ['b', 'c', 'b'] }, 'a'], 2], [[{ a: [] }, 'a'], 0], [[{}, 'x'], 0]], sol: '  return new Set(grafo[modulo] || []).size;', l: 1 }
  ],
  gen: function (g) {
    var co = [['Todas las funciones del módulo calculan la tarifa de una estadía', 'Funcional'], ['Un archivo con funciones de fechas, PDF y correos', 'Casual'], ['Funciones agrupadas porque se ejecutan al iniciar el programa', 'Temporal'], ['Funciones agrupadas porque todas son "de entrada"', 'Lógica'], ['Cada función usa la salida de la anterior en una cadena', 'Secuencial']];
    co.forEach(function (c) { g.mcq(3, '¿Qué tipo de cohesión tiene este módulo? ' + c[0], c[1], ['Funcional', 'Casual', 'Temporal', 'Lógica', 'Secuencial'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Niveles de Constantine y Yourdon.'); });
    var ac = [['Un módulo cambia directamente las variables internas de otro', 'De contenido'], ['Los módulos comparten una variable global', 'Común'], ['Se le pasa un booleano "modo" que decide qué hace la otra función', 'De control'], ['Se pasa el objeto estadía completo cuando solo se usa la fecha', 'De estampado'], ['Se pasan solo los valores necesarios como parámetros', 'De datos']];
    ac.forEach(function (a) { g.mcq(3, '¿Qué tipo de acoplamiento es? ' + a[0], a[1], ['De contenido', 'Común', 'De control', 'De estampado', 'De datos'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Niveles de acoplamiento.'); });
    var sv = [['Se corrige un error sin cambiar la interfaz', 'PARCHE'], ['Se agrega una función nueva compatible', 'MENOR'], ['Se elimina una función pública', 'MAYOR'], ['Se vuelve obligatorio un parámetro que era opcional', 'MAYOR'], ['Se agrega un campo opcional a la respuesta', 'MENOR']];
    sv.forEach(function (s) { g.mcq(2, 'Según SemVer, ¿qué número se incrementa? ' + s[0], s[1], ['MAYOR', 'MENOR', 'PARCHE', 'Ninguno'].filter(function (x) { return x !== s[1]; }), 'MAYOR.MENOR.PARCHE.'); });
  },
  checks: [
    ['Explica el criterio de Parnas con un ejemplo propio.', 'Cada módulo esconde una decisión que probablemente cambie; por ejemplo, el formato de almacenamiento de las tarifas queda dentro de un módulo y cambiarlo no afecta a los demás.'],
    ['¿Qué significa alta cohesión y bajo acoplamiento?', 'Que cada módulo tiene un propósito único y depende poco y solo por datos de los demás, para entender, probar y cambiar por partes.'],
    ['Da tres principios de diseño de interfaces.', 'Fácil de usar bien y difícil de usar mal; mínima y completa; nombres consistentes y contrato documentado.'],
    ['¿Qué riesgo describe la ley de Hyrum y cómo afecta al versionado?', 'Que los usuarios dependen de cualquier comportamiento observable; por eso incluso cambios "compatibles" según SemVer pueden romper a alguien.']
  ],
  cites: ['Parnas, D. L. (1972). On the Criteria To Be Used in Decomposing Systems into Modules. *Communications of the ACM*, 15(12).', 'Yourdon, E. y Constantine, L. (1979). *Structured Design*. Prentice Hall.', 'Ousterhout, J. (2021). *A Philosophy of Software Design* (2.ª ed.). Yaknyam Press.', 'Lieberherr, K. y Holland, I. (1989). Assuring Good Style for Object-Oriented Programs. *IEEE Software*, 6(5).', 'Bloch, J. (2006). How to Design a Good API and Why it Matters. *OOPSLA Companion 2006*.', 'Preston-Werner, T. *Semantic Versioning 2.0.0*. semver.org.'],
  project: { t: 'Rediseño de módulos de un programa',
    goal: 'Mejorar la división en módulos de un programa existente y medir el efecto.',
    steps: ['Toma un programa propio o de código abierto de unos miles de líneas y dibuja su grafo de dependencias entre módulos.', 'Identifica ciclos, módulos con cohesión baja y cadenas que violan la ley de Deméter.', 'Lista las decisiones de diseño que probablemente cambien y verifica si cada una está escondida en un solo módulo.', 'Refactoriza para eliminar ciclos y esconder al menos dos decisiones.', 'Simula un cambio de requisito y cuenta cuántos archivos cambian antes y después del rediseño.'],
    deliver: 'Los grafos antes y después, la lista de decisiones, el código refactorizado y la comparación.' },
  hito: ['Diseña el módulo de tarifas de PatioApp como un módulo profundo con la interfaz «cotizar» y sin dependencias hacia patios ni facturación.', 'Agrega a PatioApp una verificación automática de ciclos en las dependencias entre módulos en la integración continua.']
});
SDC.after('m6.design', 'm6.clean');
})();
