(function () {
var M = SDC.M, S = SDC.S;
M('m14', { title: 'Pruebas y calidad', desc: 'Las pruebas no son un trámite final: son lo que te permite cambiar el código sin miedo. Sin ellas, cada cambio es una apuesta.',
  thread: 'PatioApp recibe pruebas unitarias para las reglas de tarifa, pruebas de integración contra la base de datos y un flujo de punta a punta para registrar un ingreso.',
  books: '*Test-Driven Development: By Example* (Beck), *Unit Testing* (Khorikov), *The Art of Software Testing* (Myers), *Software Engineering at Google* (Winters, Manshreck y Wright), *Lessons Learned in Software Testing* (Kaner et al.).',
  uni: 'Pruebas de Software y Calidad de Software (UTP), Calidad y Mejora de Procesos de Software (UPC), Software Testing y Software Quality de SWEBOK v4.' });

S('m14', 'm14.types', { title: 'Tipos de prueba y pirámide',
  ask: '¿Qué tipo de prueba es?',
  lesson: `
> **La idea en simple.** Antes de vender un auto revisas cada pieza (unitaria), que el motor y la caja trabajen juntos (integración) y haces una vuelta real por la ciudad (de punta a punta). Muchas revisiones de piezas, porque son baratas; pocas vueltas, porque son caras.

## La pirámide
~~~txt
         /\\        De punta a punta (E2E): pocas, lentas y frágiles
        /  \\
       /----\\      Integración: algunas
      /      \\
     /--------\\    Unitarias: muchas, rápidas y estables
~~~

## Niveles
| Nivel | Qué verifica | Velocidad |
| Unitaria | una función o clase aislada | milisegundos |
| Integración | varias piezas reales juntas | segundos |
| Sistema o E2E | el producto completo | minutos |
| Aceptación | que cumpla lo que el cliente pidió | variable |

## Otros tipos
- **Regresión:** lo que funcionaba sigue funcionando.
- **Humo:** ¿arranca lo básico?
- **Carga y estrés:** ¿aguanta el tráfico y hasta dónde?
- **Seguridad:** ¿resiste ataques?
- **Usabilidad:** ¿la gente sabe usarlo?
- **Exploratoria:** una persona experta investiga libremente.

## Verificación y validación
- **Verificación:** ¿construimos bien el producto? (cumple su especificación)
- **Validación:** ¿construimos el producto correcto? (sirve al usuario)

## Vocabulario preciso
**Error humano** → **defecto** en el código → **falla** visible en ejecución.

## Puntos que no debes omitir
- Las pruebas muestran presencia de errores, no ausencia (Dijkstra).
- Probar todo es imposible. Se elige según el riesgo.
- Los errores se agrupan: pocos módulos concentran la mayoría (Pareto).
- Prueba temprano; se llama *shift left*.
- Una prueba inestable (*flaky*) destruye la confianza; hay que arreglarla o quitarla.

! Error común: la pirámide invertida. Muchas pruebas de interfaz, lentas y que fallan al azar, y casi ninguna unitaria.`,
  links: [['m2.prop', 'un contraejemplo refuta, pero mil ejemplos no demuestran'], ['m12.life', 'el modelo en V empareja cada fase con un nivel'], ['m11.req', 'la aceptación valida los requisitos'], ['m15.cicd', 'la pirámide corre automáticamente en cada cambio']],
  read: 'Myers, *The Art of Software Testing*; Winters et al., *Software Engineering at Google*, capítulo 11.',
  terms: [
    ['Prueba unitaria', 'prueba de una función o clase de forma aislada', ['Verificar «calcularTarifa» sin base de datos.', 'Corre en milisegundos.', 'Se escriben cientos en un proyecto.']],
    ['Prueba de integración', 'prueba de varias piezas reales trabajando juntas', ['La API guarda de verdad en una base de pruebas.', 'Revisa el contrato con un servicio.', 'Encuentra errores de configuración.']],
    ['Prueba E2E', 'prueba del flujo completo como lo haría un usuario', ['Playwright abre el navegador y hace una compra.', 'Es lenta y puede ser frágil.', 'Verifica desde la interfaz hasta la base de datos.']],
    ['Prueba de regresión', 'prueba que confirma que lo existente sigue funcionando tras un cambio', ['Una suite completa corre tras cada commit.', 'Se agrega una prueba por cada bug arreglado.', 'Un cambio en facturación no debe romper reportes.']],
    ['Prueba de carga', 'prueba del comportamiento bajo el tráfico esperado', ['Simular 1000 usuarios antes de una campaña.', 'Mide el tiempo de respuesta bajo presión.', 'Se usa k6 o JMeter.']],
    ['Prueba de humo', 'revisión rápida de que lo básico funciona', ['Tras desplegar se comprueba que abre el inicio de sesión.', 'Un conjunto de 5 pruebas críticas.', 'Si falla, ni se sigue probando.']],
    ['Prueba de aceptación', 'prueba que confirma que se cumple lo acordado con el cliente', ['Un usuario real da el visto bueno.', 'Se basa en los criterios de la historia.', 'Gherkin expresa "Dado, cuando, entonces".']]
  ],
  q: [
    { o: 'Ordena la pirámide desde la base, la más numerosa.', s: ['Unitarias', 'Integración', 'De punta a punta'], e: 'Mientras más arriba, más caras y lentas.', l: 1 },
    ['¿Qué diferencia verificación y validación?', 'Verificar: se construyó bien; validar: se construyó lo correcto', ['Son iguales', 'Validar solo lo hace la CPU', 'Verificar es cuestión de usuarios'], 'Puedes verificar perfectamente algo inútil.', 3],
    ['Un programador se equivoca, deja un mal if y un usuario ve un total erróneo. En orden, eso es:', 'Error, defecto y falla', ['Falla, error y defecto', 'Defecto, falla y error', 'Tres veces lo mismo'], 'Error humano, defecto en el código y falla visible.', 3],
    ['Tu suite E2E tarda 3 horas y falla al azar. ¿Qué haces?', 'Mover casos a pruebas de menor nivel y dejar pocos E2E críticos', ['Agregar más E2E', 'Ignorar los fallos', 'Correrla una vez al año'], 'Es la pirámide invertida.', 4],
    ['Una prueba falla 1 de cada 10 veces sin cambios. ¿Qué haces?', 'Investigar y arreglar la inestabilidad, o sacarla hasta corregirla', ['Reintentar hasta que pase', 'Acostumbrarse', 'Borrar todas las pruebas'], 'La gente deja de confiar en toda la suite.', 4],
    { c: 'Escribe un mini framework: «correrPruebas(casos)» recibe [{entrada, esperado}] y prueba una función interna «doble». Devuelve {pasan, fallan}.', f: 'correrPruebas', p: ['casos'], t: [[[[{ entrada: 2, esperado: 4 }, { entrada: 1, esperado: 9 }]], { pasan: 1, fallan: 1 }], [[[]], { pasan: 0, fallan: 0 }]], sol: '  const doble = x => x * 2;\n  const pasan = casos.filter(c => doble(c.entrada) === c.esperado).length;\n  return { pasan, fallan: casos.length - pasan };', l: 3 },
    { c: 'Revisa la pirámide: «piramideSana(u, i, e)» devuelve true si unitarias > integración > E2E.', f: 'piramideSana', p: ['u', 'i', 'e'], t: [[[100, 20, 5], true], [[5, 20, 100], false], [[10, 10, 1], false]], sol: '  return u > i && i > e;', l: 2 },
    { c: 'Detecta inestables: «inestables(hist)» recibe {prueba: [true, false...]} sin cambios de código y devuelve las que tienen ambos resultados, ordenadas.', f: 'inestables', p: ['hist'], t: [[[{ a: [true, false], b: [true, true], c: [false, false] }], ['a']], [[{}], []]], sol: '  return Object.keys(hist).filter(k => hist[k].includes(true) && hist[k].includes(false)).sort();', l: 3 },
    { c: 'Prioriza por riesgo: «ordenPruebas(l)» recibe [{n, prob, impacto}] y devuelve los nombres de mayor a menor riesgo.', f: 'ordenPruebas', p: ['l'], t: [[[[{ n: 'a', prob: 1, impacto: 1 }, { n: 'b', prob: 3, impacto: 3 }]], ['b', 'a']]], sol: '  return [...l].sort((a, b) => b.prob * b.impacto - a.prob * a.impacto).map(x => x.n);', l: 4 }
  ],
  gen: function (g) {
    var c = [['Comprobar que descuento(100, 10) devuelve 90.', 'Unitaria'], ['Confirmar que la API guarda de verdad un auto en PostgreSQL.', 'Integración'], ['Simular con un navegador que un usuario registra un auto.', 'E2E'], ['Simular 5000 usuarios durante 30 minutos.', 'Carga'], ['El cliente revisa que la historia cumple lo pactado.', 'Aceptación'], ['Tras desplegar, se verifica que abre la página principal.', 'Humo'], ['Se aumenta la carga hasta que el sistema falla.', 'Estrés'], ['Se corre la suite completa después de un cambio.', 'Regresión'], ['Un especialista prueba libremente buscando problemas.', 'Exploratoria']];
    var o = ['Unitaria', 'Integración', 'E2E', 'Carga', 'Aceptación', 'Humo', 'Estrés', 'Regresión', 'Exploratoria'];
    c.forEach(function (x) { g.mcq(2, '¿Qué tipo de prueba es?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Es de tipo ' + x[1] + '.'); });
  } });

S('m14', 'm14.unit', { title: 'Pruebas unitarias y TDD',
  ask: '¿Qué concepto de pruebas unitarias aplica?',
  lesson: `
> **La idea en simple.** Un trapecista practica con red. Las pruebas son esa red: te permiten intentar cambios arriesgados. En TDD, primero tejes la red y luego saltas.

## La forma de una prueba: AAA
~~~js
function descuento(total, porc) {
  if (porc < 0 || porc > 100) throw new Error("Porcentaje inválido");
  return total - total * porc / 100;
}
function prueba(nombre, f) {
  try { f(); console.log("OK    ", nombre); }
  catch (e) { console.log("FALLA ", nombre, "-", e.message); }
}
function igual(a, b) { if (a !== b) throw new Error(a + " no es " + b); }

prueba("aplica 10%", () => {
  const total = 100, porc = 10;          // Preparar
  const r = descuento(total, porc);      // Actuar
  igual(r, 90);                          // Comprobar
});
prueba("rechaza negativo", () => {
  let lanzo = false;
  try { descuento(100, -1); } catch { lanzo = true; }
  igual(lanzo, true);
});
~~~

## TDD
:::flow Rojo: prueba que falla | Verde: lo mínimo para pasar | Refactorizar | Repetir
No es sobre pruebas; es sobre **diseño**: al probar primero, escribes código fácil de usar.

## Buenas pruebas (FIRST)
Rápidas, Independientes, Repetibles, Autoverificables y a Tiempo. Cada prueba verifica una idea; el nombre describe el comportamiento.

## Dobles de prueba
| Doble | Qué hace |
| Dummy | se pasa, pero no se usa |
| Stub | devuelve respuestas fijas |
| Spy | registra cómo se le llamó |
| Mock | verifica que se le llamó como se esperaba |
| Fake | implementación simple real, como una base en memoria |

## Qué probar
El comportamiento público, no la implementación. Una buena prueba sobrevive a una refactorización. Abusar de mocks produce pruebas que pasan aunque el sistema esté roto.

## Puntos que no debes omitir
- Todo bug que arreglas merece una prueba que primero falle.
- Evita depender de la hora o de datos aleatorios: inyéctalos.
- Código difícil de probar suele ser señal de mal diseño.

! Error común: probar detalles internos. Cualquier cambio rompe decenas de pruebas y al final nadie quiere refactorizar.`,
  links: [['m5.solid', 'inyectar dependencias permite usar dobles'], ['m6.func', 'las funciones puras no necesitan dobles'], ['m6.refactor', 'la refactorización depende de estas pruebas'], ['m14.techniques', 'las técnicas dicen qué casos elegir']],
  read: 'Beck, *TDD: By Example*; Khorikov, *Unit Testing*; Meszaros, *xUnit Test Patterns*.',
  terms: [
    ['TDD', 'desarrollo guiado por pruebas: rojo, verde y refactorizar', ['Se escribe primero una prueba que falla.', 'Se implementa lo mínimo para pasarla.', 'Las pruebas guían el diseño.']],
    ['Patrón AAA', 'estructura de preparar, actuar y comprobar', ['Tres bloques visibles dentro de cada prueba.', 'Crear datos, llamar y verificar.', 'También se conoce como Dado, Cuando, Entonces.']],
    ['Stub', 'doble que devuelve respuestas predefinidas', ['Un servicio de tipo de cambio que siempre da 3.75.', 'Se evita una llamada real a la red.', 'Simula un error 500 a voluntad.']],
    ['Mock', 'doble que verifica que se realizaron ciertas llamadas', ['Comprobar que se envió un correo exactamente una vez.', 'La prueba falla si la interacción no ocurre.', 'Se usa para verificar comportamientos.']],
    ['Fake', 'implementación simplificada pero funcional', ['Un repositorio en memoria.', 'Un SQLite en lugar de PostgreSQL.', 'Se comporta de verdad, sin ser apto para producción.']],
    ['Spy', 'doble que registra cómo fue llamado', ['Se revisa cuántas veces se llamó y con qué argumentos.', 'La función real sigue ejecutándose.', 'La prueba mira el registro al final.']],
    ['Prueba independiente', 'prueba que no depende del orden ni de otras pruebas', ['Pasa sola y también en cualquier orden.', 'Crea sus propios datos.', 'Un test no deja estado para el siguiente.']]
  ],
  q: [
    { o: 'Ordena el ciclo de TDD.', s: ['Escribir una prueba que falla', 'Escribir el mínimo código para que pase', 'Refactorizar', 'Repetir'], e: 'Rojo, verde y refactorizar.', l: 1 },
    { o: 'Ordena una prueba unitaria.', s: ['Preparar los datos', 'Ejecutar la función', 'Comprobar el resultado'], e: 'Patrón AAA.', l: 1 },
    ['¿Cuál es el mejor nombre de prueba?', 'rechaza_placa_sin_guion', ['test1', 'prueba_funcion', 'funciona'], 'Describe el comportamiento esperado.', 2],
    ['Una función usa Date.now() y su prueba falla según el día. ¿Qué haces?', 'Inyectar la fecha como parámetro o reloj', ['Probar solo los lunes', 'Borrar la prueba', 'Dormir hasta la hora correcta'], 'Las pruebas deben ser repetibles.', 4],
    ['Una prueba verifica que se llamó a un método privado. Refactorizas y falla, sin cambiar el comportamiento. ¿Qué indica?', 'Que está acoplada a la implementación', ['Que la refactorización está mal', 'Que hay un bug', 'Que se debe prohibir refactorizar'], 'Prueba el comportamiento público.', 4],
    ['Te reportan un bug. ¿Qué haces primero?', 'Escribir una prueba que lo reproduzca y falle', ['Editar a ciegas', 'Cerrar el reporte', 'Reescribir el módulo'], 'Luego lo arreglas y queda protegido para siempre.', 3],
    { c: 'Implementa con TDD (ya te damos las pruebas): «validarPlaca(p)» acepta "ABC-123" con 3 letras mayúsculas, guion y 3 dígitos.', f: 'validarPlaca', p: ['p'], t: [[['ABC-123'], true], [['AB-123'], false], [['abc-123'], false], [['ABC-12'], false], [['ABC-1234'], false]], sol: '  return /^[A-Z]{3}-\\d{3}$/.test(p);', l: 2 },
    { c: 'Las pruebas definen esto: «calcularTarifa(dias)»: S/ 20 por día; desde el día 8, el total recibe 10% de descuento. Días menores a 1 lanzan error (no se prueba aquí).', f: 'calcularTarifa', p: ['dias'], t: [[[1], 20], [[7], 140], [[8], 144], [[10], 180]], sol: "  if (dias < 1) throw new Error('Días inválidos');\n  const b = dias * 20;\n  return dias >= 8 ? b * 0.9 : b;", l: 3 },
    { c: 'Usa un stub: «totalEnSoles(dolares)» debe calcular con un objeto interno cambio = {tasa: () => 3.75} para que sea reemplazable.', f: 'totalEnSoles', p: ['dolares'], t: [[[100], 375], [[0], 0]], sol: '  const cambio = { tasa: () => 3.75 };\n  return dolares * cambio.tasa();', l: 3 },
    { c: 'Crea un spy: «contarCorreos(usuarios)» crea un objeto correo cuyo enviar registra llamadas, se lo pasa a una función avisar que envía a los usuarios activos, y devuelve cuántas se registraron.', f: 'contarCorreos', p: ['usuarios'], t: [[[[{ activo: true }, { activo: false }]], 1], [[[]], 0]], sol: '  const llamadas = [];\n  const correo = { enviar: u => llamadas.push(u) };\n  const avisar = (us, c) => us.filter(u => u.activo).forEach(u => c.enviar(u));\n  avisar(usuarios, correo);\n  return llamadas.length;', l: 4 },
    { c: 'Implementa «igualProfundo(a, b)» para comparar arreglos y objetos de JSON.', f: 'igualProfundo', p: ['a', 'b'], t: [[[{ x: [1, 2] }, { x: [1, 2] }], true], [[{ x: 1 }, { x: 2 }], false], [[1, 1], true], [[{ x: 1 }, { x: 1, y: 2 }], false], [[[1], [1, 2]], false]], sol: "  if (a === b) return true;\n  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;\n  const k = Object.keys(a), j = Object.keys(b);\n  return k.length === j.length && k.every(c => igualProfundo(a[c], b[c]));", l: 4 }
  ],
  gen: function (g) {
    var c = [['Un servicio de clima de prueba siempre responde "soleado".', 'Stub'], ['Se verifica que se llamó a enviarSMS una vez con ese número.', 'Mock'], ['Se usa un repositorio basado en un arreglo.', 'Fake'], ['Se pasa un logger que nunca se usa, solo para cumplir la firma.', 'Dummy'], ['Se registran los argumentos sin cambiar el comportamiento.', 'Spy'], ['Un reloj de prueba siempre da 1 de enero.', 'Stub'], ['Una base de datos en memoria reemplaza a la real.', 'Fake']];
    c.forEach(function (x) { g.mcq(3, '¿Qué doble de prueba es?\n' + x[0], x[1], ['Stub', 'Mock', 'Fake', 'Dummy', 'Spy'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Es un ' + x[1] + '.'); });
  } });

S('m14', 'm14.techniques', { title: 'Técnicas de diseño de casos',
  ask: '¿Qué técnica de prueba aplica?',
  lesson: `
> **La idea en simple.** Para probar un ascensor con límite de 8 personas no pruebas con 1, 2, 3, 4... Pruebas con 8 (límite) y con 9 (uno más). La mayoría de los errores vive justo en los bordes.

## Caja negra: sin ver el código
- **Clases de equivalencia:** divide las entradas en grupos que se comportan igual y prueba uno de cada grupo.
- **Valores límite:** prueba justo en los bordes.
- **Tabla de decisiones:** cada combinación de condiciones.
- **Transición de estados:** cada cambio válido e inválido.

Ejemplo: descuento para edades de 18 a 65.
~~~txt
Clases:  < 18  |  18 a 65  |  > 65
Límites: 17, 18, 65, 66 (y quizá 19 y 64)
~~~

## Caja blanca: viendo el código
~~~js
function clase(km, revisado) {
  if (km > 100 && revisado) return "A";    // decisión 1
  return "B";
}
// Cobertura de líneas: clase(200, true) y clase(1, true) bastan
// Cobertura de ramas: se necesita una entrada verdadera y otra falsa
// Cobertura de condiciones: cada parte del && debe ser T y F
console.log(clase(200, true), clase(1, true), clase(200, false));
~~~
| Cobertura | Exige |
| Líneas | cada línea ejecutada |
| Ramas | cada camino de cada decisión |
| Caminos | cada ruta posible completa |
| Condiciones | cada subcondición en T y F |

**100% de cobertura no significa sin errores**: mide qué se ejecutó, no qué se comprobó.

## Técnicas avanzadas
- **Pruebas basadas en propiedades:** generas miles de entradas y verificas una regla: "ordenar dos veces es igual que una".
- **Pruebas de mutación:** cambias el código a propósito y compruebas que alguna prueba lo detecte.
- **Fuzzing:** entradas aleatorias para hacer fallar.
- **Pareado:** cubre todas las parejas de opciones sin probar todas las combinaciones.

## Puntos que no debes omitir
- Casos típicos para listas: vacía, un elemento, muchos, repetidos, ordenada y al revés.
- Casos típicos para texto: vacío, muy largo, acentos, espacios, símbolos.
- Casos típicos para fechas: bisiesto, cambio de año, zonas horarias.

! Error común: perseguir 100% de cobertura como objetivo. Lleva a pruebas sin verificaciones reales.`,
  links: [['m3.cond', 'cada decisión crea ramas que probar'], ['m2.sets', 'las clases de equivalencia vienen de las relaciones de equivalencia'], ['m6.clean', 'la complejidad ciclomática indica cuántos caminos probar'], ['m14.metrics', 'la cobertura es una métrica que hay que interpretar']],
  read: 'Myers, *The Art of Software Testing*; Aniche, *Effective Software Testing*.',
  terms: [
    ['Clases de equivalencia', 'grupos de entradas que el sistema trata igual', ['Se prueba 30 como representante de 18 a 65.', 'No hace falta probar cada edad.', 'Se incluye también una clase inválida.']],
    ['Valores límite', 'casos justo en y junto a los bordes de un rango', ['Se prueba 17, 18, 65 y 66.', 'Se detecta un «>» que debió ser «>=».', 'Se prueba una lista con 0 y 1 elementos.']],
    ['Tabla de decisiones', 'matriz de combinaciones de condiciones y su resultado', ['Tres reglas de descuento dan 8 casos.', 'Aparecen combinaciones olvidadas.', 'Cada columna se vuelve una prueba.']],
    ['Cobertura de ramas', 'porcentaje de caminos de decisiones ejecutados', ['Un if requiere una prueba verdadera y otra falsa.', 'Es más fuerte que la de líneas.', 'Un reporte marca la parte else como no probada.']],
    ['Prueba de mutación', 'cambiar el código a propósito para comprobar si las pruebas lo detectan', ['Se cambia «<» por «<=» y ninguna prueba falla.', 'Revela pruebas sin verificaciones reales.', 'Stryker lo hace de forma automática.']],
    ['Prueba basada en propiedades', 'verificar una regla general con muchas entradas generadas', ['Invertir dos veces una lista da la original.', 'Se generan datos aleatorios hasta encontrar un contraejemplo.', 'QuickCheck popularizó la técnica.']],
    ['Fuzzing', 'enviar entradas aleatorias o malformadas para provocar fallas', ['Se envían archivos corruptos a un lector de imágenes.', 'Encuentra fallas de seguridad.', 'Se busca que el programa se caiga.']]
  ],
  q: [
    ['Para "contraseña de 8 a 20 caracteres", ¿qué valores límite pruebas?', '7, 8, 20 y 21', ['1, 100', '10, 15', 'Solo 8'], 'Justo en cada borde y justo afuera.', 2],
    ['Un if (a && b) con cobertura de ramas requiere como mínimo:', '2 pruebas', ['1 prueba', '4 pruebas', '8 pruebas'], 'Una verdadera y otra falsa para la decisión.', 3],
    ['El equipo tiene 100% de cobertura, pero las pruebas no tienen ninguna verificación. ¿Qué pasa?', 'La cobertura es alta y no detecta nada', ['No hay bugs', 'El código es perfecto', 'Es imposible'], 'Por eso existen las pruebas de mutación.', 4],
    ['Cuatro condiciones booleanas independientes dan cuántas columnas en una tabla completa:', '16', ['4', '8', '32'], '2⁴.', 3],
    ['¿Qué propiedad probarías en una función de ordenar?', 'El resultado tiene los mismos elementos y cada uno es menor o igual al siguiente', ['Que tarde menos de 1 s', 'Que devuelva 5', 'Que no use variables'], 'Esa es la definición de ordenado.', 4],
    { c: 'Genera valores límite: «limites(min, max)» devuelve [min−1, min, max, max+1].', f: 'limites', p: ['min', 'max'], t: [[[18, 65], [17, 18, 65, 66]], [[0, 0], [-1, 0, 0, 1]]], sol: '  return [min - 1, min, max, max + 1];', l: 2 },
    { c: 'Clasifica: «claseEdad(e)» devuelve "menor" (e<18), "adulto" (18 a 65) o "mayor" (e>65).', f: 'claseEdad', p: ['e'], t: [[[17], 'menor'], [[18], 'adulto'], [[65], 'adulto'], [[66], 'mayor']], sol: "  return e < 18 ? 'menor' : e <= 65 ? 'adulto' : 'mayor';", l: 2 },
    { c: 'Calcula cobertura: «cobertura(ejecutadas, total)» en porcentaje entero. Si el total es 0, devuelve 100.', f: 'cobertura', p: ['ejecutadas', 'total'], t: [[[5, 10], 50], [[1, 3], 33], [[0, 0], 100]], sol: '  return total === 0 ? 100 : Math.round(ejecutadas / total * 100);', l: 2 },
    { c: 'Prueba una propiedad: «esOrdenCorrecto(ent, sal)» dice si sal es ent ordenada: misma cantidad y mismos elementos, y sin desorden.', f: 'esOrdenCorrecto', p: ['ent', 'sal'], t: [[[[2, 1], [1, 2]], true], [[[2, 1], [2, 1]], false], [[[2, 2], [2]], false], [[[3, 1], [1, 2]], false]], sol: '  if (ent.length !== sal.length) return false;\n  for (let i = 1; i < sal.length; i++) if (sal[i - 1] > sal[i]) return false;\n  const n = a => [...a].sort((x, y) => x - y).join();\n  return n(ent) === n(sal);', l: 4 },
    { c: 'Mutación: «mutanteMuere(pruebas)» recibe casos [{a,b,esperado}] para una función mayor(a,b)=a>b, y devuelve true si alguno detecta al mutante que usa a>=b.', f: 'mutanteMuere', p: ['pruebas'], t: [[[[{ a: 2, b: 2, esperado: false }]], true], [[[{ a: 3, b: 2, esperado: true }]], false], [[[]], false]], sol: '  return pruebas.some(p => (p.a >= p.b) !== p.esperado);', h: 'Solo un caso con a igual a b lo distingue.', l: 4 }
  ],
  gen: function (g) {
    g.times(14, function (R) { var a = R.int(1, 30), b = a + R.int(5, 50); g.input(2, 'Para un rango válido de ' + a + ' a ' + b + ', escribe los cuatro valores límite separados por comas, de menor a mayor.', [(a - 1) + ',' + a + ',' + b + ',' + (b + 1)], 'Justo afuera y justo en cada borde.'); });
    g.times(6, function (R) { var n = R.int(2, 6); g.input(2, '¿Cuántas combinaciones tiene una tabla de decisiones completa con ' + n + ' condiciones booleanas?', Math.pow(2, n), '2^' + n + '.'); });
    g.times(6, function (R) { var e = R.int(10, 95), t = 100; g.input(1, 'De ' + t + ' ramas, las pruebas ejecutan ' + e + '. ¿Cuál es la cobertura en %?', e, e + '/100.'); });
    g.times(6, function (R) { var n = R.int(1, 6); g.input(3, 'Una función tiene ' + n + ' if independientes y sin bucles. ¿Cuántos caminos completos hay?', Math.pow(2, n), '2^' + n + '.'); });
  } });

S('m14', 'm14.metrics', { title: 'Calidad de software y métricas',
  ask: '¿Qué concepto de calidad se menciona?',
  lesson: `
> **La idea en simple.** Medir sirve para decidir. Un velocímetro no conduce el auto, pero sin él no sabes si te estás pasando. El peligro es conducir mirando solo el velocímetro.

## Modelos de calidad
**ISO/IEC 25010** divide la calidad del producto en características como funcionalidad, rendimiento, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad y portabilidad. Sirve de lista común.

## Métricas de código
| Métrica | Significa | Cuidado |
| Complejidad ciclomática | caminos por función | no mide legibilidad |
| Cobertura | código ejecutado por pruebas | no mide calidad de la prueba |
| Densidad de defectos | defectos por mil líneas | las líneas son mala base |
| Duplicación | código repetido | no todo duplicado es malo |

## Métricas DORA
La investigación de *Accelerate* muestra que estas cuatro predicen el rendimiento:
| Métrica | Pregunta |
| Frecuencia de despliegue | ¿cada cuánto publicas? |
| Tiempo de entrega | ¿de commit a producción? |
| Tasa de fallos de cambio | ¿qué porcentaje causa problemas? |
| Tiempo de restauración | ¿cuánto tardas en recuperarte? |

**Velocidad y estabilidad no se oponen**: los mejores equipos tienen ambas.

## Calidad en el proceso
- **Análisis estático:** ESLint, SonarQube. Encuentra problemas sin ejecutar.
- **Revisión de código** e inspección.
- **Mejora continua:** PDCA, planificar, hacer, verificar y actuar.
- **CMMI:** niveles de madurez de procesos.
- ISO 9001 aplicada a software e ISO/IEC 12207 como procesos del ciclo de vida.

## Densidad de defectos
~~~js
const defectos = 12, lineas = 8000;
console.log((defectos / (lineas / 1000)).toFixed(1), "defectos por mil líneas");
~~~

## Puntos que no debes omitir
- **Ley de Goodhart:** cuando una medida se vuelve objetivo, deja de ser buena medida.
- Nunca midas la productividad por líneas de código: borrar código puede ser lo mejor del día.
- Costo de la calidad: prevenir es más barato que apagar incendios.

! Error común: comparar equipos con métricas. Se manipularán. Úsalas para mejorar, no para castigar.`,
  links: [['m6.clean', 'la complejidad ciclomática viene de ahí'], ['m12.agile', 'las métricas de flujo se usan en la mejora continua'], ['m15.cicd', 'DORA mide lo que hace la automatización'], ['m13.quality', 'los atributos de calidad se miden en producción']],
  read: 'Forsgren, Humble y Kim, *Accelerate*; norma ISO/IEC 25010.',
  terms: [
    ['Frecuencia de despliegue', 'métrica de cada cuánto se publica a producción', ['Un equipo élite lo hace varias veces al día.', 'Otro lo hace dos veces al año.', 'Es una métrica DORA.']],
    ['Tiempo de entrega', 'tiempo desde el commit hasta producción', ['Un arreglo llega a los usuarios en una hora.', 'Se reduce con automatización.', 'Una semana de espera por aprobaciones lo aumenta.']],
    ['Tasa de fallos de cambio', 'porcentaje de despliegues que causan incidentes', ['2 de cada 10 requieren reversión.', 'Se mejora con pruebas.', 'Mide la estabilidad junto al tiempo de restauración.']],
    ['Análisis estático', 'revisión automática del código sin ejecutarlo', ['ESLint avisa de una variable sin usar.', 'SonarQube marca una función demasiado compleja.', 'TypeScript detecta un tipo equivocado.']],
    ['Densidad de defectos', 'defectos por cada mil líneas de código', ['12 defectos en 8000 líneas dan 1.5.', 'Se compara un módulo con otro.', 'Señala dónde conviene revisar.']],
    ['Ley de Goodhart', 'una medida convertida en objetivo deja de ser buena medida', ['Exigen 90% de cobertura y aparecen pruebas sin verificaciones.', 'Se premian líneas de código y el código crece sin valor.', 'La velocidad sube inflando los puntos.']],
    ['ISO/IEC 25010', 'modelo internacional de características de calidad de software', ['Da nombres comunes a usabilidad o fiabilidad.', 'Se usa como lista para requisitos no funcionales.', 'Define la mantenibilidad con subcaracterísticas.']]
  ],
  q: [
    ['¿Qué dice la investigación DORA sobre velocidad y estabilidad?', 'Los equipos de alto rendimiento logran ambas a la vez', ['Hay que escoger una', 'Ir rápido siempre rompe más', 'No se pueden medir'], 'Lotes pequeños reducen el riesgo.', 3],
    ['¿Por qué las líneas de código son mala medida de productividad?', 'Porque premian escribir más; a menudo lo mejor es borrar', ['Porque son difíciles de contar', 'Porque cambian por lenguaje solamente', 'Porque requieren internet'], 'Más código significa más que mantener.', 3],
    ['Un equipo despliega cada 6 meses con grandes lotes y muchos fallos. ¿Qué lo mejora?', 'Lotes pequeños y despliegues más frecuentes', ['Esperar 12 meses', 'Más reuniones de aprobación', 'Quitar las pruebas'], 'Menos cambio por despliegue es menos riesgo.', 4],
    ['Un gerente pagará un bono por cobertura de 95%. ¿Qué es lo más probable?', 'Pruebas superficiales que suben el número', ['Mejor calidad automática', 'Menos trabajo', 'Ningún efecto'], 'Ley de Goodhart.', 4],
    { c: 'Calcula «densidad(defectos, lineas)» por cada mil líneas, redondeada a dos decimales.', f: 'densidad', p: ['defectos', 'lineas'], t: [[[12, 8000], 1.5], [[0, 100], 0], [[1, 3000], 0.33]], sol: '  return Math.round(defectos / (lineas / 1000) * 100) / 100;', l: 2 },
    { c: 'Calcula la tasa de fallos: «tasaFallos(desp)» recibe [{ok:true/false}] y devuelve el porcentaje entero. Lista vacía da 0.', f: 'tasaFallos', p: ['desp'], t: [[[[{ ok: true }, { ok: false }]], 50], [[[]], 0]], sol: '  if (!desp.length) return 0;\n  return Math.round(desp.filter(d => !d.ok).length / desp.length * 100);', l: 2 },
    { c: 'Calcula el tiempo de entrega mediano: «medianaEntrega(h)» con horas.', f: 'medianaEntrega', p: ['h'], t: [[[[1, 100, 2]], 2], [[[1, 3]], 2]], sol: '  const s = [...h].sort((a, b) => a - b), m = s.length >> 1;\n  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;', l: 3 },
    { c: 'Calcula la complejidad ciclomática de un texto: «complejidad(src)» cuenta apariciones como palabra de if, for, while, case, y los operadores && y ||, más 1.', f: 'complejidad', p: ['src'], t: [[['if(a){} for(;;){}'], 3], [['a && b || c'], 3], [[''], 1]], sol: '  return 1 + (src.match(/\\b(if|for|while|case)\\b|&&|\\|\\|/g) || []).length;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Publican a producción 3 veces por semana.', 'Frecuencia de despliegue'], ['Un commit tarda 2 días en llegar a producción.', 'Tiempo de entrega'], ['1 de cada 5 despliegues requiere arreglo urgente.', 'Tasa de fallos de cambio'], ['Tras una caída tardan 20 minutos en volver.', 'Tiempo de restauración']];
    c.forEach(function (x) { g.mcq(1, '¿Qué métrica DORA es?\n' + x[0], x[1], ['Frecuencia de despliegue', 'Tiempo de entrega', 'Tasa de fallos de cambio', 'Tiempo de restauración'].filter(function (y) { return y !== x[1]; }), 'Corresponde a ' + x[1] + '.'); });
    g.times(10, function (R) { var d = R.int(2, 30), l = R.pick([1000, 2000, 4000, 5000, 10000]); g.input(2, 'Hay ' + d + ' defectos en ' + l + ' líneas. ¿Cuál es la densidad por mil líneas? (redondea a dos decimales)', +(d / (l / 1000)).toFixed(2), d + ' / ' + l / 1000 + '.'); });
    g.times(6, function (R) { var t = R.pick([10, 20, 40, 50]), f = R.int(1, 5); g.input(2, 'Hubo ' + t + ' despliegues y ' + f + ' causaron incidentes. ¿Tasa de fallos en %?', f / t * 100, f + ' / ' + t + '.'); });
  } });
})();
