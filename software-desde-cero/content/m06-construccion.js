(function () {
var M = SDC.M, S = SDC.S;
M('m6', { title: 'Construcción de software', desc: 'El código se lee diez veces más de lo que se escribe. Aquí aprendes a escribirlo para la persona que lo mantendrá, que probablemente serás tú en seis meses.',
  thread: 'Las primeras funciones de PatioApp se limpian: se renombran, se parten, se eliminan duplicados y los errores se manejan con mensajes útiles en vez de fallar en silencio.',
  books: '*Clean Code* (Martin), *Refactoring* (Fowler), *Code Complete* (McConnell), *The Pragmatic Programmer* (Hunt y Thomas), *A Philosophy of Software Design* (Ousterhout).',
  uni: 'Software Construction (MIT 6.005 y 6.031), Desarrollo de Software (UTP), Software Construction de SWEBOK v4.' });

S('m6', 'm6.clean', { title: 'Código limpio',
  ask: '¿Qué principio de código limpio aplica?',
  lesson: `
> **La idea en simple.** Un buen código se lee como una receta clara, no como un acertijo. Si necesitas un comentario para explicar qué hace una línea, quizás necesitas un mejor nombre.

## Nombres
~~~js
// Antes: ¿qué es esto?
function c(l) {
  let t = 0;
  for (const x of l) if (x.r) t += x.p;
  return t;
}
// Después: se explica solo
function totalDeVehiculosRevisados(vehiculos) {
  return vehiculos
    .filter(v => v.revisado)
    .reduce((total, v) => total + v.precio, 0);
}
console.log(totalDeVehiculosRevisados([{ revisado: true, precio: 10 }, { revisado: false, precio: 5 }]));
~~~

## Reglas prácticas
- **Nombres:** revelan intención, se pueden pronunciar y buscar. Nada de «data2» ni «tmp».
- **Funciones:** cortas, un solo nivel de abstracción y pocos parámetros (si son más de 3, agrúpalos).
- **Números mágicos:** cambia «0.18» por «TASA_IGV».
- **Comentarios:** explican el *por qué*, no el *qué*. El comentario desactualizado es peor que ninguno.
- **Formato:** automático con Prettier o similar. No se discute en revisiones.
- **Regla del Boy Scout:** deja el código un poco mejor de lo que lo encontraste.

## Complejidad
La **complejidad ciclomática** cuenta caminos independientes: cada if y cada bucle suman 1. Más caminos, más pruebas y más riesgo. Por encima de 10, considera partir.

## Módulos profundos (Ousterhout)
Una interfaz simple que oculta mucha funcionalidad es mejor que muchas clases pequeñas que solo se pasan datos. Limpio no significa "todo en piezas diminutas".

## Puntos que no debes omitir
- Se escribe para humanos; la máquina entiende cualquier cosa.
- Consistencia con el equipo vale más que tu estilo favorito.
- Una función no debe devolver un valor y además causar un efecto sorpresa.

! Error común: optimizar la legibilidad para ti hoy. El lector real no tiene el contexto que tienes ahora.`,
  links: [['m3.func', 'las funciones son la unidad básica de claridad'], ['m6.refactor', 'refactorizar es cómo se llega al código limpio'], ['m7.team', 'la revisión de código lo mantiene así en equipo'], ['m14.metrics', 'la complejidad ciclomática es una métrica de calidad']],
  read: 'Martin, *Clean Code*, capítulos 1 a 5; Ousterhout, *A Philosophy of Software Design*.',
  terms: [
    ['Nombre revelador', 'identificador que explica por sí solo qué representa', ['«diasEnPatio» en vez de «d».', 'Quien lee no necesita ir a ver cómo se calculó.', 'Se puede buscar en todo el proyecto y encontrar lo correcto.']],
    ['Número mágico', 'valor literal sin explicación en medio del código', ['Aparece un 0.18 en medio de un cálculo.', 'Un «if (estado === 3)» que nadie entiende.', 'Cambiar una tarifa exige buscar el mismo valor en muchos archivos.']],
    ['Nivel de abstracción', 'grado de detalle en que opera un fragmento de código', ['Una función mezcla reglas de negocio con concatenar SQL.', 'Se separa «procesarPedido» de los detalles de bytes.', 'Cada función debería leerse como pasos del mismo nivel.']],
    ['Complejidad ciclomática', 'medida de la cantidad de caminos independientes en el código', ['Un método con 15 if es difícil de probar por completo.', 'SonarQube marca una función con 25 ramas.', 'Cuenta decisiones más uno.']],
    ['Regla del Boy Scout', 'dejar el código algo mejor de como lo encontraste', ['Mientras arreglas un bug, renombras una variable confusa.', 'Mejoras pequeñas y constantes evitan grandes reescrituras.', 'Eliminas una línea comentada al pasar por el archivo.']],
    ['Módulo profundo', 'módulo con interfaz simple que oculta mucha funcionalidad', ['«fs.readFile» esconde discos, cachés y permisos.', 'Pocos métodos públicos resuelven mucho.', 'Lo contrario de una clase que solo reenvía llamadas.']],
    ['Comentario útil', 'nota que explica el motivo de una decisión no evidente', ['"Se espera 300 ms por un límite del proveedor."', 'Se advierte de una consecuencia no evidente.', 'Se enlaza el ticket que explica la regla legal.']]
  ],
  q: [
    ['¿Cuál es el mejor nombre para una función que devuelve autos sin revisar?', 'vehiculosPendientesDeRevision', ['procesar', 'getData', 'lista2'], 'Revela qué entrega y es fácil de buscar.', 2],
    ['Una función recibe (a, b, c, d, e, f, g). ¿Qué conviene?', 'Agrupar los parámetros relacionados en un objeto', ['Usar variables globales', 'Quitar validaciones', 'Dividirla en dos líneas'], 'Muchos parámetros indican una abstracción faltante.', 3],
    ['Comentario: «// incrementa i». ¿Qué haces?', 'Borrarlo: no agrega información', ['Mantenerlo por si acaso', 'Traducirlo al inglés', 'Agregar otro debajo'], 'Solo repite el código.', 2],
    ['¿Cuál es la complejidad ciclomática de una función con 3 if independientes?', '4', ['3', '8', '1'], 'Decisiones + 1.', 4],
    ['Un compañero extrae todo en funciones de 2 líneas que se llaman en cadena y cuesta seguirlas. Según Ousterhout:', 'Son módulos superficiales: aportan poco y agregan complejidad', ['Es el diseño ideal', 'Hay que hacerlas de 1 línea', 'Se debe duplicar el código'], 'El objetivo es reducir la complejidad total, no contar líneas.', 4],
    { c: 'Reescribe con nombres claros: escribe «precioConIgv(precioBase)» usando una constante TASA_IGV = 0.18 y redondeando a 2 decimales.', f: 'precioConIgv', p: ['precioBase'], t: [[[100], 118], [[0], 0], [[19.99], 23.59]], sol: '  const TASA_IGV = 0.18;\n  return Math.round(precioBase * (1 + TASA_IGV) * 100) / 100;', l: 2 },
    { c: 'Aplica guardas: «descuento(c)» recibe {activo, años} y devuelve 0 si no está activo, 0.05 si tiene menos de 3 años y 0.1 en otro caso. Sin if anidados.', f: 'descuento', p: ['c'], t: [[[{ activo: false, años: 9 }], 0], [[{ activo: true, años: 1 }], 0.05], [[{ activo: true, años: 3 }], 0.1]], sol: '  if (!c.activo) return 0;\n  if (c.años < 3) return 0.05;\n  return 0.1;', l: 2 }
  ],
  gen: function (g) {
    var malos = [['d', 'diasEnPatio', 'días que pasó un vehículo en el patio'], ['x', 'precioTotal', 'precio total de una factura'], ['tmp', 'placaNormalizada', 'una placa ya normalizada'], ['flag', 'estaRevisado', 'si un auto pasó la revisión'], ['lst', 'choferesActivos', 'la lista de choferes activos'], ['n2', 'cantidadDeReintentos', 'cuántos reintentos se hicieron'], ['obj', 'solicitudDeRevision', 'una solicitud de revisión'], ['res', 'vehiculoEncontrado', 'el vehículo hallado en la búsqueda'], ['foo', 'calcularTarifaDiaria', 'una función que calcula la tarifa de un día'], ['doIt', 'enviarAvisoDeEntrega', 'una función que envía el aviso de entrega']];
    malos.forEach(function (m) { g.mcq(2, 'Tu variable o función guarda ' + m[2] + '. ¿Qué nombre eliges?', m[1], [m[0], m[0] + 'Dato', 'valor'], '«' + m[1] + '» revela la intención.'); });
    g.times(6, function (R) { var i = R.int(1, 10), l = R.int(0, 6); g.input(3, 'Una función tiene ' + i + ' if y ' + l + ' bucles. ¿Cuál es su complejidad ciclomática?', i + l + 1, 'Decisiones + 1.'); });
  } });

S('m6', 'm6.refactor', { title: 'Code smells y refactorización',
  ask: '¿Qué smell o refactorización corresponde?',
  lesson: `
> **La idea en simple.** Refactorizar es ordenar la cocina sin cambiar la receta: la comida sigue saliendo igual, pero mañana cocinarás más rápido. Si el comportamiento cambia, no es refactorización.

## El ciclo seguro
:::flow Pruebas en verde | Cambio pequeño | Pruebas | Commit | Repetir

## Smells: señales de que algo huele mal
| Smell | Síntoma | Remedio |
| Método largo | hay que hacer scroll para leerlo | extraer función |
| Código duplicado | la misma lógica en varios lugares | extraer y reutilizar |
| Clase grande | hace de todo | extraer clase |
| Lista larga de parámetros | muchos argumentos | objeto de parámetros |
| Envidia de datos | usa más los datos de otra clase que los suyos | mover método |
| Obsesión por primitivos | todo son strings y números | crear tipo propio |
| Cirugía de escopeta | un cambio toca diez archivos | juntar lo que cambia junto |

## Un ejemplo
~~~js
// Antes: mezcla cálculo y formato
function reporte(autos) {
  let t = 0;
  for (const a of autos) t += a.dias * 20;
  return "Total: S/ " + t.toFixed(2);
}
// Después: extraer función y separar responsabilidades
const TARIFA = 20;
const costo = a => a.dias * TARIFA;
const total = autos => autos.reduce((s, a) => s + costo(a), 0);
const formato = v => "Total: S/ " + v.toFixed(2);
console.log(formato(total([{ dias: 2 }, { dias: 3 }])));
~~~

## Deuda técnica
Atajos que aceleran hoy y se pagan con intereses después. A veces conviene endeudarse a propósito, pero hay que registrarlo y pagarlo.

## Puntos que no debes omitir
- Sin pruebas, refactorizar es adivinar.
- Pasos pequeños: si algo se rompe, sabes qué fue.
- La regla de tres: a la tercera repetición, abstrae.
- No mezcles refactorización y cambios de funcionalidad en el mismo commit.
- Código heredado sin pruebas: primero agrega pruebas de caracterización.

! Error común: la gran reescritura desde cero. Suele costar el doble, repetir errores y perder reglas escondidas en el código viejo.`,
  links: [['m6.clean', 'el código limpio es el destino'], ['m14.unit', 'las pruebas son la red de seguridad'], ['m7.git', 'commits pequeños permiten deshacer con facilidad'], ['m5.solid', 'SOLID indica la dirección de los cambios']],
  read: 'Fowler, *Refactoring*; Feathers, *Working Effectively with Legacy Code*.',
  terms: [
    ['Método largo', 'smell de una función con demasiadas líneas y tareas', ['Una función de 300 líneas con comentarios por secciones.', 'Hay que hacer scroll para leerla.', 'Sus comentarios separan pasos que deberían ser funciones.']],
    ['Código duplicado', 'smell de la misma lógica repetida en varios lugares', ['Se corrige un bug en un lugar y sigue en otros tres.', 'La validación de placa está copiada en cuatro archivos.', 'Dos clases hermanas tienen el mismo método.']],
    ['Envidia de datos', 'smell de un método más interesado en otra clase que en la suya', ['Factura hace pedido.getA(), pedido.getB() y pedido.getC() para calcular.', 'Una regla debería mudarse a la clase que tiene los datos.', 'El método casi no toca sus propios atributos.']],
    ['Obsesión por primitivos', 'smell de usar tipos básicos para conceptos de negocio', ['La placa es un string validado en cada función.', 'El dinero se pasa como un número suelto sin moneda.', 'Una fecha se guarda como texto.']],
    ['Cirugía de escopeta', 'smell en que un solo cambio obliga a tocar muchos lugares', ['Agregar un estado obliga a editar 12 archivos.', 'Un cambio de formato pasa por toda la aplicación.', 'Es señal de responsabilidades demasiado dispersas.']],
    ['Extraer función', 'refactorización que mueve un fragmento a una función con nombre', ['Un bloque con comentario "calcular total" se vuelve calcularTotal().', 'Un if complicado se vuelve «estaVencido()».', 'Se acorta un método largo.']],
    ['Deuda técnica', 'costo futuro de haber elegido una solución rápida en vez de una mejor', ['Se salta una prueba para cumplir una fecha.', 'Cada función nueva tarda más por el desorden acumulado.', 'Se registra en el backlog un arreglo temporal.']]
  ],
  q: [
    { o: 'Ordena una refactorización segura.', s: ['Tener pruebas que pasan', 'Hacer un cambio pequeño', 'Ejecutar las pruebas', 'Hacer commit', 'Repetir con el siguiente paso'], e: 'Cada paso deja el sistema funcionando.', l: 2 },
    ['¿Qué distingue a refactorizar de reescribir?', 'Refactorizar conserva el comportamiento externo en pasos pequeños', ['Refactorizar agrega funciones', 'Reescribir nunca cambia nada', 'Son sinónimos'], 'Si cambia el comportamiento, no es refactorización.', 2],
    ['Tienes un módulo heredado sin pruebas que debes cambiar. ¿Qué haces primero?', 'Escribir pruebas de caracterización que capturen lo que hace hoy', ['Reescribirlo', 'Editarlo directamente', 'Borrar lo que no entiendes'], 'Primero fijas el comportamiento actual; luego cambias.', 4],
    ['¿Qué regla práctica evita abstraer antes de tiempo?', 'La regla de tres', ['DRY a la primera', 'Copiar siempre', 'Refactorizar solo en viernes'], 'Con tres casos reales ya se ve bien la forma de la abstracción.', 3],
    ['La deuda técnica deliberada y prudente es:', 'Decidir conscientemente un atajo y planear pagarlo', ['Escribir mal por ignorancia', 'No hacer pruebas nunca', 'Reescribir todo'], 'Es el cuadrante "deliberado y prudente" de Fowler.', 4],
    { c: 'Refactoriza el duplicado: escribe «resumen(autos)» que devuelva {total, revisados, pendientes} de una lista con campo revisado, usando una función auxiliar «contar(f)».', f: 'resumen', p: ['autos'], t: [[[[{ revisado: true }, { revisado: false }]], { total: 2, revisados: 1, pendientes: 1 }], [[[]], { total: 0, revisados: 0, pendientes: 0 }]], sol: '  const contar = f => autos.filter(f).length;\n  return { total: autos.length, revisados: contar(a => a.revisado), pendientes: contar(a => !a.revisado) };', l: 3 },
    { c: 'Reemplaza un tipo primitivo: crea internamente una clase Dinero(centimos) con sumar. «sumarSoles(l)» recibe soles con decimales y devuelve el total exacto.', f: 'sumarSoles', p: ['l'], t: [[[[0.1, 0.2]], 0.3], [[[]], 0], [[[1.1, 2.2]], 3.3]], sol: '  class Dinero {\n    constructor(c) { this.c = c; }\n    sumar(o) { return new Dinero(this.c + o.c); }\n    soles() { return this.c / 100; }\n  }\n  return l.reduce((d, x) => d.sumar(new Dinero(Math.round(x * 100))), new Dinero(0)).soles();', l: 4 }
  ],
  gen: function (g) {
    var c = [['Una función envia correo, calcula el total y escribe en disco.', 'Extraer función'], ['Una condición if ocupa tres líneas de && y ||.', 'Extraer función'], ['Los mismos cuatro parámetros viajan juntos por diez funciones.', 'Introducir objeto de parámetros'], ['Un método usa casi solo los campos de otra clase.', 'Mover método'], ['Una clase de 2000 líneas contiene dos grupos de datos sin relación.', 'Extraer clase'], ['Un switch por tipo se repite en muchos lugares.', 'Reemplazar condicional por polimorfismo'], ['Un valor 0.18 aparece por todo el código.', 'Reemplazar número mágico por constante'], ['Una variable «x» se usa en un cálculo importante.', 'Renombrar variable']];
    var o = ['Extraer función', 'Introducir objeto de parámetros', 'Mover método', 'Extraer clase', 'Reemplazar condicional por polimorfismo', 'Reemplazar número mágico por constante', 'Renombrar variable'];
    c.forEach(function (x) { g.mcq(3, 'Elige la refactorización:\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Es la que ataca directamente este síntoma: ' + x[1] + '.'); });
  } });

S('m6', 'm6.errors', { title: 'Errores y depuración',
  ask: '¿Qué concepto sobre errores aplica?',
  lesson: `
> **La idea en simple.** Un error no es una vergüenza, es información. Lo peor no es que falle, sino que falle en silencio y que meses después los datos estén mal sin que nadie sepa cuándo empezó.

~~~js
function parsearKm(texto) {
  const n = Number(texto);
  if (Number.isNaN(n) || n < 0) {
    throw new Error("Kilometraje inválido: " + texto);
  }
  return n;
}
try {
  console.log(parsearKm("1500"));
  console.log(parsearKm("abc"));
} catch (e) {
  console.log("Se manejó:", e.message);
} finally {
  console.log("Esto siempre corre");
}
~~~

## Principios
- **Falla rápido:** detecta el problema cerca de su causa.
- **No silencies:** un «catch» vacío es una bomba de tiempo.
- **Atrapa donde puedas actuar:** si no puedes hacer nada útil, deja que suba.
- **Mensajes útiles:** qué pasó, con qué dato y qué hacer.

## Tipos de errores
| Tipo | Cuándo aparece | Ejemplo |
| Sintaxis | antes de ejecutar | falta un paréntesis |
| Ejecución | al correr | leer propiedad de null |
| Lógica | nunca avisa | usar > en vez de >= |
| Operacional | el mundo falla | se cayó la red |

## Cómo depurar con método
1. **Reproduce** el error de forma confiable.
2. **Reduce** al caso mínimo.
3. **Formula** una hipótesis y compruébala.
4. **Arregla** la causa, no el síntoma.
5. **Agrega una prueba** para que no regrese.

Herramientas: depurador con puntos de interrupción, registros, «git bisect» para hallar el commit culpable y *rubber duck*: explicárselo a un pato de goma.

## Programación defensiva y diseño por contrato
Valida las entradas en las fronteras del sistema. Una **aserción** documenta lo que nunca debería pasar.

## Puntos que no debes omitir
- Null es fuente de errores: comprueba o usa «?.» y «??».
- Reintentar solo tiene sentido en errores temporales, y con espera creciente.
- Los errores se registran con contexto, nunca con contraseñas.

! Error común: cambiar cosas al azar hasta que funcione. Si no sabes por qué se arregló, no se arregló.`,
  links: [['m1.data', 'overflow y redondeo son errores clásicos de representación'], ['m9.http', 'los códigos de estado comunican errores por la red'], ['m15.obs', 'en producción los registros son tu único testigo'], ['m7.git', 'git bisect localiza el cambio culpable']],
  read: 'McConnell, *Code Complete*, capítulos 8 y 23; Hunt y Thomas, *The Pragmatic Programmer*.',
  terms: [
    ['Excepción', 'señal que interrumpe el flujo normal cuando ocurre un error', ['«throw new Error("x")» detiene la función.', 'Sube por la pila hasta encontrar un catch.', 'Sin manejar, termina el proceso.']],
    ['Fallar rápido', 'detectar y reportar un problema lo antes posible', ['Rechazar datos inválidos en la entrada.', 'Arrancar la app y abortar si falta una variable de entorno.', 'El sistema no sigue con datos corruptos.']],
    ['Error de lógica', 'fallo donde el programa corre pero da un resultado incorrecto', ['Un total sale mal por usar > en vez de >=.', 'Sin mensajes de error, pero los reportes están equivocados.', 'Solo una prueba con valor esperado lo detecta.']],
    ['Aserción', 'comprobación de algo que siempre debería ser cierto', ['«assert(lista.length > 0)» antes de usar el primero.', 'Documenta una suposición interna.', 'Si falla, hay un bug en el código y no en los datos.']],
    ['Causa raíz', 'origen real de un problema, más allá de sus síntomas', ['Los 5 porqués llevan a una validación faltante.', 'Reiniciar el servidor oculta una fuga de memoria.', 'Una postmortem llega hasta el proceso que falló.']],
    ['Punto de interrupción', 'marca que detiene la ejecución para inspeccionar el estado', ['Se pausa en la línea 40 y se revisan variables.', 'Se avanza paso a paso en DevTools.', 'Se detiene solo si «km < 0» de forma condicional.']],
    ['Stack trace', 'lista de llamadas activas al momento de un error', ['Indica el archivo y la línea donde falló.', 'Se lee de arriba hacia abajo buscando tu código.', 'Muestra quién llamó a quién.']]
  ],
  q: [
    { o: 'Ordena el método de depuración.', s: ['Reproducir el error', 'Reducir al caso mínimo', 'Formular una hipótesis', 'Comprobar y arreglar la causa', 'Agregar una prueba de regresión'], e: 'Depurar es aplicar el método científico.', l: 2 },
    ['¿Qué hace mal este código?\ntry { guardar(); } catch (e) {}', 'Oculta el fallo: nadie sabrá que no se guardó', ['Nada, es lo más seguro', 'Es un error de sintaxis', 'Hace lento al programa'], 'Un catch vacío silencia información valiosa.', 3],
    ['Una petición falla con error de red. ¿Qué estrategia es correcta?', 'Reintentar pocas veces con espera creciente y luego reportar', ['Reintentar en bucle sin pausa', 'Ignorarla', 'Cerrar la aplicación'], 'El backoff evita agravar la sobrecarga.', 4],
    ['¿Qué falla al usar valor || 10 si valor puede ser 0?', '0 se trata como falso y se usa 10', ['Da error de sintaxis', 'Siempre da 0', 'Nada'], 'Para esto existe ??, que solo reacciona a null y undefined.', 4],
    { c: 'Escribe «leerEdad(t)»: convierte a número; si no es entero entre 0 y 120 lanza un Error. Debe devolver el número si es válido.', f: 'leerEdad', p: ['t'], t: [[['20'], 20], [['0'], 0], [['120'], 120]], sol: "  const n = Number(t);\n  if (!Number.isInteger(n) || n < 0 || n > 120) throw new Error('Edad inválida: ' + t);\n  return n;", l: 2 },
    { c: 'Escribe «parseSeguro(texto)» que intente JSON.parse y devuelva {ok:true, valor} o {ok:false, error:"json"}.', f: 'parseSeguro', p: ['texto'], t: [[['{"a":1}'], { ok: true, valor: { a: 1 } }], [['xx'], { ok: false, error: 'json' }]], sol: "  try { return { ok: true, valor: JSON.parse(texto) }; }\n  catch (e) { return { ok: false, error: 'json' }; }", l: 3 },
    { c: 'Escribe «dividirSeguro(a, b)» que lance Error si b es 0; devuelve a/b si no.', f: 'dividirSeguro', p: ['a', 'b'], t: [[[6, 2], 3], [[1, 4], 0.25]], sol: "  if (b === 0) throw new Error('División entre cero');\n  return a / b;", l: 2 },
    { c: 'Implementa «reintentar(fallos, max)»: simula una operación que falla «fallos» veces antes de funcionar. Con hasta «max» intentos, devuelve el intento en que funcionó, o −1.', f: 'reintentar', p: ['fallos', 'max'], t: [[[0, 3], 1], [[2, 3], 3], [[3, 3], -1]], sol: "  let n = 0;\n  const op = () => { if (n++ < fallos) throw new Error('x'); };\n  for (let i = 1; i <= max; i++) {\n    try { op(); return i; } catch (e) {}\n  }\n  return -1;", l: 4 },
    { c: 'Corrige este bug: «promedio(l)» debe devolver 0 con una lista vacía y el promedio exacto en otros casos.', f: 'promedio', p: ['l'], t: [[[[]], 0], [[[1, 2, 3]], 2], [[[5]], 5]], sol: '  if (l.length === 0) return 0;\n  return l.reduce((a, b) => a + b, 0) / l.length;', l: 2 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var a = R.int(1, 9); g.trace(2, 'try {\n  throw new Error("' + a + '");\n  console.log("no");\n} catch (e) {\n  console.log(e.message);\n}', 'Tras el throw se salta al catch.'); });
    g.times(6, function (R) { var a = R.int(1, 9), b = R.int(10, 19); g.trace(2, 'function f() {\n  try {\n    return ' + a + ';\n  } finally {\n    console.log(' + b + ');\n  }\n}\nconsole.log(f());', 'finally corre antes de que la función devuelva.'); });
    g.times(4, function (R) { var a = R.pick(['null', 'undefined']), b = R.int(1, 9); g.trace(3, 'const u = ' + a + ';\nconsole.log(u?.nombre ?? ' + b + ');', '?. evita el error y ?? da el valor alternativo.'); });
  } });

S('m6', 'm6.func', { title: 'Programación funcional',
  ask: '¿Qué concepto funcional aplica?',
  lesson: `
> **La idea en simple.** En vez de darle a la computadora órdenes de cómo cambiar datos paso a paso, describes transformaciones: esta lista, filtrada, transformada y sumada. Como una línea de producción donde cada estación recibe algo y entrega algo nuevo sin tocar el original.

~~~js
const autos = [
  { placa: "A", km: 10, revisado: true },
  { placa: "B", km: 50, revisado: false },
  { placa: "C", km: 30, revisado: true }
];
const kmRevisados = autos
  .filter(a => a.revisado)
  .map(a => a.km)
  .reduce((s, km) => s + km, 0);
console.log(kmRevisados);

// Función de orden superior: recibe o devuelve funciones
const multiplicarPor = k => x => x * k;
const doble = multiplicarPor(2);
console.log([1, 2, 3].map(doble));

// Composición
const comp = (f, g) => x => f(g(x));
console.log(comp(doble, x => x + 1)(5));
~~~

## Ideas clave
- **Funciones puras:** misma entrada, misma salida, sin efectos.
- **Inmutabilidad:** en vez de cambiar, crea una versión nueva.
- **Funciones de primera clase:** se guardan y se pasan como cualquier valor.
- **Composición:** programas grandes a partir de funciones pequeñas.
- **Currying:** una función de varios argumentos como una cadena de funciones de uno.

## Por qué importa en ingeniería
- Lo inmutable se comparte entre hilos sin miedo a condiciones de carrera.
- Una función pura se prueba sin preparar nada.
- React y Redux, MapReduce y las transformaciones de datos se apoyan en esto.

## Inmutabilidad en la práctica
~~~js
const original = [3, 1, 2];
const ordenada = [...original].sort((a, b) => a - b);
console.log(original, ordenada);
const auto = { placa: "A", km: 1 };
const actualizado = { ...auto, km: 2 };
console.log(auto.km, actualizado.km);
~~~

## Puntos que no debes omitir
- El mundo necesita efectos: la estrategia es empujarlos a los bordes del sistema.
- No todo debe ser funcional. En un bucle crítico, mutar puede ser lo correcto.
- Paradigmas: imperativo (cómo), declarativo (qué), orientado a objetos y funcional se combinan.

! Error común: encadenar 8 transformaciones ilegibles para parecer elegante. Claridad primero.`,
  links: [['m2.sets', 'son funciones en el sentido matemático'], ['m3.arr', 'map, filter y reduce los viste con listas'], ['m8.conc', 'la inmutabilidad elimina las condiciones de carrera'], ['m14.unit', 'el código puro es el más fácil de probar']],
  read: 'Abelson y Sussman, *SICP*, capítulo 1; Chiusano y Bjarnason, *Functional Programming in Scala*.',
  terms: [
    ['Orden superior', 'función que recibe o devuelve otras funciones', ['«map» recibe la transformación.', 'Un decorador devuelve una función envuelta.', '«setTimeout» recibe qué ejecutar después.']],
    ['Inmutabilidad', 'no modificar datos existentes y crear versiones nuevas', ['«{...a, km: 2}» en lugar de «a.km = 2».', 'React detecta cambios comparando referencias.', 'Git nunca cambia un commit: crea otro.']],
    ['Composición de funciones', 'combinar funciones de forma que la salida de una sea entrada de otra', ['«f(g(x))».', 'Un pipeline de transformaciones de datos.', 'Las tuberías de Linux unen pequeños programas.']],
    ['Currying', 'transformar una función de varios argumentos en una cadena de funciones de uno', ['«sumar(1)(2)».', 'Fijar un primer argumento y reutilizar el resto.', '«multiplicarPor(2)» da «doble».']],
    ['Declarativo', 'estilo que describe qué se quiere y no cómo obtenerlo', ['SQL pide filas sin decir cómo buscarlas.', '«filter» en lugar de un bucle con índices.', 'HTML describe la estructura, no el dibujo.']],
    ['Imperativo', 'estilo que describe paso a paso cómo cambiar el estado', ['Un for con índices y variables que se actualizan.', 'El lenguaje C es un ejemplo típico.', 'Ensamblador es su forma extrema.']],
    ['Transparencia referencial', 'posibilidad de sustituir una llamada por su resultado sin cambiar el programa', ['«suma(2,3)» se reemplaza por 5.', 'Permite memoizar sin riesgo.', 'No se cumple si la función lee el reloj.']]
  ],
  q: [
    ['¿Cuál es la versión inmutable de agregar x a la lista l?', '[...l, x]', ['l.push(x)', 'l[l.length] = x', 'l.unshift(x)'], 'Las otras modifican la lista original.', 2],
    ['¿Qué ventaja da la inmutabilidad en programas con varios hilos?', 'Los datos no cambian, así que no hay condiciones de carrera al leerlos', ['Usan menos memoria siempre', 'Corren más rápido siempre', 'No requieren pruebas'], 'Lo que no cambia se comparte sin bloqueos.', 3],
    ['¿Cuál expresa "suma de los cuadrados de los pares"?', 'l.filter(par).map(cuad).reduce(sumar, 0)', ['l.map(cuad).reduce(sumar, 0).filter(par)', 'l.reduce(par).filter(sumar)', 'l.map(par).map(cuad)'], 'Primero se filtra, luego se transforma y al final se combina.', 4],
    ['Dónde deben vivir los efectos según "núcleo funcional, cáscara imperativa":', 'En los bordes del sistema, con la lógica pura en el centro', ['Dentro de cada función', 'En variables globales', 'En ninguna parte'], 'Así se prueba el centro sin simular el mundo.', 4],
    { c: 'Implementa «miMap(l, f)» sin usar map; las pruebas llaman «miMapDoble(l)» que debe usar internamente tu miMap para duplicar.', f: 'miMapDoble', p: ['l'], t: [[[[1, 2]], [2, 4]], [[[]], []]], sol: '  const miMap = (a, f) => { const r = []; for (const x of a) r.push(f(x)); return r; };\n  return miMap(l, x => x * 2);', l: 3 },
    { c: 'Implementa «miReduceSuma(l)» usando un reduce propio escrito con un bucle.', f: 'miReduceSuma', p: ['l'], t: [[[[1, 2, 3]], 6], [[[]], 0]], sol: '  const red = (a, f, i) => { let v = i; for (const x of a) v = f(v, x); return v; };\n  return red(l, (s, x) => s + x, 0);', l: 3 },
    { c: 'Sin mutar la entrada, «actualizarKm(autos, placa, km)» devuelve una lista nueva con ese auto actualizado.', f: 'actualizarKm', p: ['autos', 'placa', 'km'], t: [[[[{ placa: 'A', km: 1 }, { placa: 'B', km: 2 }], 'A', 9], [{ placa: 'A', km: 9 }, { placa: 'B', km: 2 }]]], sol: '  return autos.map(a => a.placa === placa ? { ...a, km } : a);', l: 3 },
    { c: 'Implementa «tuberia(x, ops)» donde ops es una lista de nombres: "doble", "mas1", "cuad". Aplícalas en orden con reduce.', f: 'tuberia', p: ['x', 'ops'], t: [[[2, ['doble', 'mas1']], 5], [[3, ['cuad']], 9], [[1, []], 1]], sol: '  const f = { doble: v => v * 2, mas1: v => v + 1, cuad: v => v * v };\n  return ops.reduce((v, n) => f[n](v), x);', l: 4 },
    { c: 'Calcula en estilo funcional «topPlacas(autos, n)»: devuelve las placas de los n autos con más km, sin mutar la entrada.', f: 'topPlacas', p: ['autos', 'n'], t: [[[[{ p: 'A', km: 1 }, { p: 'B', km: 9 }, { p: 'C', km: 5 }], 2], ['B', 'C']], [[[], 3], []]], sol: '  return [...autos].sort((a, b) => b.km - a.km).slice(0, n).map(a => a.p);', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8], 5); g.trace(2, 'const l = [' + l + '];\nconsole.log(l.filter(x => x % 2 === 0).map(x => x * x).join(" "));', 'Primero filtra pares, luego eleva al cuadrado.'); });
    g.times(8, function (R) { var l = R.sample([1, 2, 3, 4, 5, 6, 7, 8], 4); g.trace(2, 'const l = [' + l + '];\nconsole.log(l.reduce((m, x) => Math.max(m, x), 0));', 'El acumulador conserva el máximo.'); });
    g.times(6, function (R) { var a = R.int(2, 5), b = R.int(1, 5); g.trace(3, 'const mult = a => b => a * b;\nconsole.log(mult(' + a + ')(' + b + '));', 'Currying: ' + a + ' × ' + b + '.'); });
    g.times(6, function (R) { var a = R.int(1, 5), b = R.int(2, 4); g.trace(3, 'const f = x => x + ' + a + ';\nconst g = x => x * ' + b + ';\nconst c = (f, g) => x => f(g(x));\nconsole.log(c(f, g)(2));', 'Primero g, luego f.'); });
  } });
})();
