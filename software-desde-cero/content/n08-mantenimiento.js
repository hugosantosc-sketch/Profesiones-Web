(function () {
var M = SDC.M, S = SDC.S;
M('man', { title: 'Mantenimiento, evolución y gestión de configuración',
  desc: 'La mayor parte de la vida y del costo de un sistema ocurre después de su primera versión. Este módulo enseña a entender, cambiar y modernizar software existente, y a controlar versiones, dependencias y entregas.',
  thread: 'PatioApp entra en su etapa más larga: se clasifica y prioriza su mantenimiento, se moderniza un componente heredado sin detener el servicio, se controlan sus versiones y dependencias, y se publican entregas con changelog y política de obsolescencia.',
  books: '*Working Effectively with Legacy Code* (Feathers), *Software Engineering at Google* (Winters, Manshreck y Wright), *Object-Oriented Reengineering Patterns* (Demeyer, Ducasse y Nierstrasz), *Your Code as a Crime Scene* (Tornhill), *Continuous Delivery* (Humble y Farley).',
  uni: 'Áreas *Software Maintenance* y *Software Configuration Management* de SWEBOK v4; ISO/IEC/IEEE 14764 y 828; CMU 17-313; Stanford CS 295 (calidad y evolución); TU Delft *Software Engineering Methods*. En Perú: Mantenimiento de Software, Gestión de la Configuración y Calidad de Software (UNMSM, UNI, PUCP, UPC).',
  capstone: { t: 'PatioApp, cinco años después',
    goal: 'Mantener vivo un sistema en producción: cambiarlo con seguridad, modernizarlo y entregarlo de forma controlada.',
    steps: ['Clasifica las solicitudes de cambio de un trimestre según ISO/IEC/IEEE 14764 y analiza los puntos calientes del código.', 'Moderniza un componente heredado con pruebas de caracterización y el patrón de higuera estranguladora.', 'Define la línea base, la política de versiones semánticas y la gestión de dependencias con archivo de bloqueo y SBOM.', 'Publica una versión con changelog, notas de entrega, política de obsolescencia y plan de reversión.', 'Escribe el informe de evolución: qué leyes de Lehman observaste y cómo las contrarrestaste.'],
    deliver: 'El análisis de mantenimiento, la modernización con sus pruebas, la configuración de versiones y dependencias, y la entrega documentada.' } });

S('man', 'man.evol', { title: 'Mantenimiento y evolución del software',
  ask: '¿Qué concepto de mantenimiento o evolución se aplica?',
  lesson: `
> **La idea en simple.** Terminar la primera versión de un sistema es como inaugurar un edificio: lo difícil empieza después. Habrá que reparar, adaptarlo a nuevas normas, ampliarlo y reforzarlo, durante años, con personas que no lo construyeron. Diseñar pensando en ese futuro es una de las marcas del ingeniero.

## Cuánto pesa el mantenimiento
Robert Glass recopiló en *Facts and Fallacies of Software Engineering* (2002) los datos de muchos estudios: el mantenimiento consume entre el 40% y el 80% del costo total de un sistema, alrededor del 60% en promedio, y cerca del 60% de ese mantenimiento son **mejoras**, no correcciones. Bennet Lientz y E. Burton Swanson ya lo habían encontrado en 1980 al encuestar a 487 organizaciones. La conclusión cambia la perspectiva: mantener no es "arreglar lo que salió mal", sino seguir construyendo valor sobre algo existente.

## Tipos de mantenimiento
Swanson propuso en 1976 tres categorías, y la norma **ISO/IEC/IEEE 14764** agregó una cuarta:
| Tipo | Propósito | Ejemplo en PatioApp |
| Correctivo | corregir defectos encontrados | el cobro se calculaba mal en años bisiestos |
| Adaptativo | adaptarse a cambios del entorno | la SUNAT cambia el formato de comprobantes electrónicos |
| Perfectivo | mejorar funciones, rendimiento o mantenibilidad | agregar un reporte por cliente, acelerar la búsqueda |
| Preventivo | evitar problemas futuros antes de que ocurran | actualizar una librería que dejará de recibir parches |
La norma también trata el mantenimiento **de emergencia**: un cambio correctivo no programado para mantener el sistema funcionando, que luego debe regularizarse.

## Las leyes de Lehman
Meir "Manny" Lehman estudió desde los años 70 la evolución del sistema operativo OS/360 de IBM y otros sistemas, y formuló ocho leyes para los sistemas que operan en el mundo real (que llamó **tipo E**). Las más importantes:
- **Cambio continuo:** un sistema en uso debe adaptarse continuamente o se vuelve progresivamente menos satisfactorio.
- **Complejidad creciente:** a medida que evoluciona, su complejidad aumenta, salvo que se trabaje activamente para reducirla.
- **Crecimiento continuo:** su funcionalidad debe crecer para mantener satisfechos a los usuarios.
- **Calidad decreciente:** su calidad parecerá disminuir salvo que se mantenga y adapte rigurosamente a los cambios del entorno.
- **Conservación de la familiaridad:** el contenido de cada versión tiende a ser parecido, porque el equipo y los usuarios deben poder asimilar los cambios.
Las leyes explican por qué la deuda técnica no es un accidente: es la tendencia natural, y solo se contrarresta con trabajo deliberado (refactorización, pruebas, actualización de dependencias).

## El envejecimiento del software
David Parnas publicó en 1994 *Software Aging*, donde distinguió dos causas:
- **Falta de movimiento:** el sistema no se actualiza mientras el mundo cambia (nuevos sistemas operativos, nuevas expectativas de los usuarios).
- **Cirugía ignorante:** los cambios los hacen personas que no entienden el diseño original, y cada cambio degrada la estructura un poco más.
Sus remedios: diseñar para el cambio (ocultar las decisiones que probablemente cambien, como él mismo propuso en 1972), documentar las decisiones, hacer revisiones de diseño y aceptar que a veces hay que rejuvenecer o reemplazar partes.

## Comprender antes de cambiar
Xin Xia y sus coautores midieron en 2018 a 78 desarrolladores profesionales y encontraron que dedicaban alrededor del 58% de su tiempo a **comprender programas**. Técnicas para hacerlo bien:
- Leer primero las pruebas y los ADR, que dicen qué se esperaba y por qué.
- Ejecutar el sistema y seguir un caso real con el depurador.
- Usar el historial de Git: «git log -p» y «git blame» muestran quién cambió qué y con qué mensaje.
- Hacer un **análisis de impacto**: ¿qué otros módulos, datos o clientes dependen de lo que voy a cambiar?

## Puntos calientes
Adam Tornhill propuso en *Your Code as a Crime Scene* (2015) analizar el historial de cambios como un investigador analiza la escena de un crimen. Un **punto caliente** es un archivo que cambia mucho *y* es complejo: allí se concentran los defectos y el costo de mantenimiento. Un archivo complejo que nadie toca no es urgente; uno que se cambia cada semana, sí.
~~~js
// Prioriza refactorizaciones: cambios en el último año × complejidad ciclomática
const archivos = [['cobros.js', 48, 35], ['reportes.js', 6, 60], ['ingresos.js', 30, 12], ['util.js', 52, 3]];
archivos.map(([n, cambios, cc]) => ({ n, puntaje: cambios * cc }))
  .sort((a, b) => b.puntaje - a.puntaje)
  .forEach(a => console.log(a.n.padEnd(12), a.puntaje));
~~~
El **factor autobús** (cuántas personas tendrían que ausentarse para que nadie entienda un módulo) se puede estimar con el mismo historial: si un solo autor escribió el 90% de un punto caliente, hay un riesgo de conocimiento.

## El proceso de mantenimiento
La norma ISO/IEC/IEEE 14764 describe un proceso con pasos que conviene seguir incluso en equipos pequeños:
1. **Recibir y registrar** la solicitud de modificación o el reporte de problema.
2. **Analizar**: reproducir, clasificar, estimar el impacto y el costo.
3. **Aprobar y priorizar** junto con el resto del trabajo.
4. **Implementar** con pruebas, incluida la regresión de lo que ya funcionaba.
5. **Revisar y aceptar** con quien pidió el cambio.
6. **Migrar o retirar** cuando el cambio implica mover datos o apagar partes del sistema.
Registrar cada solicitud con su tipo permite, al final del trimestre, ver en qué se fue el esfuerzo y decidir con datos.

## Ejemplo resuelto: planificar el mantenimiento de un trimestre
PatioApp recibe en un trimestre 40 solicitudes: 12 defectos, 5 cambios regulatorios, 18 mejoras y 5 actualizaciones de librerías. Clasificadas: 30% correctivo, 12.5% adaptativo, 45% perfectivo y 12.5% preventivo, una distribución parecida a la que reportan Lientz y Swanson. El análisis de puntos calientes muestra que 9 de los 12 defectos tocaron «cobros.js», que también es el archivo más cambiado y más complejo. Plan: reservar un 20% de la capacidad para reducir la complejidad de ese módulo con refactorizaciones protegidas por pruebas (ley de complejidad creciente), atender los cambios regulatorios con fecha fija primero y emparejar a otra persona con la autora principal de cobros para subir el factor autobús.`,
  links: [['m6.refactor', 'la refactorización es la herramienta principal contra la complejidad creciente'], ['m14.metrics', 'la complejidad ciclomática alimenta el análisis de puntos calientes'], ['m7.git', 'el historial de Git es la fuente para entender y analizar la evolución']],
  read: 'Glass, *Facts and Fallacies*, capítulo de mantenimiento; Lehman (1980); Parnas (1994); Tornhill, *Your Code as a Crime Scene*.',
  terms: [
    ['Mantenimiento correctivo', 'modificación que corrige defectos descubiertos en el software', ['Arreglas un cálculo de tarifa erróneo.', 'Corriges una caída al subir fotos grandes.', 'Suele ser menos de la mitad del mantenimiento total.']],
    ['Mantenimiento adaptativo', 'modificación que mantiene el software usable ante cambios del entorno', ['Adaptas la facturación a un nuevo formato de la SUNAT.', 'Migras a una versión nueva del sistema operativo.', 'Cambias de proveedor de pagos porque el anterior cierra.']],
    ['Mantenimiento perfectivo', 'modificación que mejora funciones, rendimiento o mantenibilidad a pedido de los usuarios', ['Agregas un reporte nuevo.', 'Aceleras una búsqueda lenta.', 'Es la categoría más grande en la mayoría de los estudios.']],
    ['Mantenimiento preventivo', 'modificación que evita problemas futuros antes de que se manifiesten', ['Actualizas una librería antes de que deje de recibir parches.', 'Refactorizas un módulo frágil.', 'Agregas pruebas a código que no las tenía.']],
    ['Leyes de Lehman', 'leyes empíricas sobre la evolución de los sistemas en uso, como el cambio continuo y la complejidad creciente', ['Un sistema que no se adapta pierde utilidad.', 'La complejidad crece salvo que se trabaje para reducirla.', 'Lehman las formuló estudiando OS/360.']],
    ['Envejecimiento del software', 'deterioro de un sistema por no adaptarse al entorno o por cambios hechos sin entender su diseño', ['Parnas lo describió en 1994.', 'La cirugía ignorante degrada la estructura con cada cambio.', 'Se combate diseñando para el cambio y documentando decisiones.']],
    ['Punto caliente', 'archivo que combina mucha frecuencia de cambio con alta complejidad', ['cobros.js cambia cada semana y tiene complejidad 35.', 'Allí se concentran los defectos.', 'Tornhill propone priorizar su refactorización.']],
    ['Análisis de impacto', 'identificación de todo lo que puede verse afectado por un cambio antes de hacerlo', ['Buscas qué módulos usan la función que vas a cambiar.', 'Revisas qué clientes consumen el endpoint.', 'Decides qué pruebas de regresión ejecutar.']]
  ],
  q: [
    ['La SUNAT cambia el formato de los comprobantes electrónicos y debes adaptar PatioApp. ¿Qué tipo de mantenimiento es?', 'Adaptativo', ['Correctivo', 'Perfectivo', 'Preventivo'], 'Responde a un cambio del entorno.', 2],
    ['Según los datos que recopila Glass, ¿qué parte del mantenimiento suelen ser mejoras?', 'Cerca del 60%', ['Menos del 10%', 'Cerca del 25%', 'El 100%'], 'Mantener es, sobre todo, seguir agregando valor.', 3],
    ['¿Qué dice la ley de complejidad creciente de Lehman?', 'La complejidad aumenta con la evolución salvo que se trabaje activamente para reducirla', ['La complejidad siempre disminuye', 'La complejidad es constante', 'Solo los sistemas mal hechos se vuelven complejos'], 'Por eso hay que reservar tiempo para refactorizar.', 3],
    ['¿Qué llamó Parnas "cirugía ignorante"?', 'Cambios hechos por personas que no entienden el diseño original', ['Cirugías en hospitales con software', 'Eliminar código sin pruebas', 'Cambiar de lenguaje'], 'Cada cambio así degrada un poco la estructura.', 3],
    ['Un archivo muy complejo que nadie modifica desde hace tres años, ¿es un punto caliente?', 'No, porque no cambia con frecuencia', ['Sí, por su complejidad', 'Sí, por su antigüedad', 'Depende del lenguaje'], 'El punto caliente combina frecuencia de cambio y complejidad.', 3],
    { tf: 'Actualizar una librería antes de que deje de recibir parches de seguridad es mantenimiento preventivo.', v: true, e: 'Evita un problema futuro.', l: 2 },
    { tf: 'Si el código se escribe bien la primera vez, no necesitará mantenimiento.', v: false, e: 'La ley de cambio continuo dice que todo sistema en uso debe adaptarse a su entorno.', l: 1 },
    { o: 'Ordena los pasos para hacer un cambio seguro en código que no conoces.', s: ['Leer pruebas, ADR y documentación', 'Ejecutar el sistema y seguir un caso real', 'Hacer el análisis de impacto', 'Escribir pruebas que fijen el comportamiento actual', 'Hacer el cambio y ejecutar la regresión'], e: 'Comprender antes de cambiar.', l: 3 },
    { c: 'Escribe «tipoMantenimiento(cambio)»: si cambio.corrige es true devuelve "correctivo"; si cambio.entorno, "adaptativo"; si cambio.nuevaFuncion, "perfectivo"; en otro caso "preventivo".', f: 'tipoMantenimiento', p: ['cambio'], t: [[[{ corrige: true }], 'correctivo'], [[{ entorno: true }], 'adaptativo'], [[{ nuevaFuncion: true }], 'perfectivo'], [[{}], 'preventivo']], sol: '  if (cambio.corrige) return "correctivo";\n  if (cambio.entorno) return "adaptativo";\n  if (cambio.nuevaFuncion) return "perfectivo";\n  return "preventivo";', l: 1 },
    { c: 'Escribe «puntoCaliente(archivos)» donde cada archivo es [nombre, cambios, complejidad]. Devuelve el nombre con mayor cambios × complejidad.', f: 'puntoCaliente', p: ['archivos'], t: [[[[['a.js', 48, 35], ['b.js', 6, 60], ['c.js', 52, 3]]], 'a.js'], [[[['x', 1, 100], ['y', 20, 6]]], 'y'], [[[['solo', 1, 1]]], 'solo']], sol: '  let mejor = archivos[0];\n  for (const a of archivos) if (a[1] * a[2] > mejor[1] * mejor[2]) mejor = a;\n  return mejor[0];', l: 2 }
  ],
  gen: function (g) {
    var casos = [['Corregir un error que duplica cobros', 'Correctivo'], ['Adaptar la app a la nueva versión de Android', 'Adaptativo'], ['Agregar exportación a Excel pedida por los usuarios', 'Perfectivo'], ['Agregar pruebas a un módulo sin cobertura para evitar fallas futuras', 'Preventivo'], ['Cambiar la integración porque el banco cambió su API', 'Adaptativo'], ['Acelerar la pantalla de búsqueda', 'Perfectivo'], ['Arreglar la caída al ingresar placas con guion', 'Correctivo'], ['Actualizar el framework antes de su fin de soporte', 'Preventivo'], ['Ajustar los impuestos a una nueva ley', 'Adaptativo'], ['Reducir la complejidad de una función frágil', 'Preventivo']];
    casos.forEach(function (c) { g.mcq(2, '¿Qué tipo de mantenimiento es este cambio? ' + c[0], c[1], ['Correctivo', 'Adaptativo', 'Perfectivo', 'Preventivo'].filter(function (x) { return x !== c[1]; }), 'Clasificación de ISO/IEC/IEEE 14764.'); });
    g.times(8, function (R) { var a = [R.int(1, 50), R.int(2, 40)], b = [R.int(1, 50), R.int(2, 40)]; while (a[0] * a[1] === b[0] * b[1]) b[0]++; var gana = a[0] * a[1] > b[0] * b[1] ? 'A' : 'B'; g.mcq(3, 'El archivo A tuvo ' + a[0] + ' cambios y complejidad ' + a[1] + '; el archivo B, ' + b[0] + ' cambios y complejidad ' + b[1] + '. ¿Cuál es el punto caliente más prioritario?', gana, [gana === 'A' ? 'B' : 'A', 'Ninguno', 'Ambos por igual'], 'Puntajes: A = ' + a[0] * a[1] + ', B = ' + b[0] * b[1] + '.'); });
    g.times(4, function (R) { var t = R.int(20, 60), c = R.int(3, Math.floor(t / 2)); g.input(2, 'De ' + t + ' solicitudes de mantenimiento, ' + c + ' son correcciones de defectos. ¿Qué porcentaje es correctivo? Redondea a 1 decimal.', (100 * c / t).toFixed(1), c + '/' + t + ' × 100.'); });
  },
  checks: [
    ['¿Por qué se dice que el mantenimiento es mayormente evolución y no corrección?', 'Porque los estudios muestran que cerca del 60% del mantenimiento son mejoras y adaptaciones, no corrección de defectos.'],
    ['Da un ejemplo de cada tipo de mantenimiento en PatioApp.', 'Correctivo: arreglar un cálculo; adaptativo: nuevo formato de la SUNAT; perfectivo: nuevo reporte; preventivo: actualizar una librería antes de su fin de soporte.'],
    ['¿Qué implica la ley de complejidad creciente para la planificación?', 'Que hay que reservar capacidad de forma explícita para refactorizar y reducir complejidad, porque no ocurre sola.'],
    ['¿Qué dos causas de envejecimiento distinguió Parnas?', 'La falta de movimiento (no adaptarse al entorno) y la cirugía ignorante (cambios sin entender el diseño).'],
    ['¿Cómo identificas los puntos calientes de un repositorio?', 'Cruzando la frecuencia de cambio de cada archivo en el historial de Git con su complejidad, y priorizando los que tienen ambos valores altos.']
  ],
  cites: ['ISO/IEC/IEEE 14764:2022. *Software Engineering: Software Life Cycle Processes: Maintenance*.', 'Lehman, M. (1980). Programs, Life Cycles, and Laws of Software Evolution. *Proceedings of the IEEE*, 68(9).', 'Parnas, D. (1994). Software Aging. *Proceedings of ICSE 16*.', 'Lientz, B. y Swanson, E. B. (1980). *Software Maintenance Management*. Addison-Wesley.', 'Glass, R. (2002). *Facts and Fallacies of Software Engineering*. Addison-Wesley.', 'Xia, X. et al. (2018). Measuring Program Comprehension: A Large-Scale Field Study with Professionals. *IEEE Transactions on Software Engineering*, 44(10).', 'Tornhill, A. (2015). *Your Code as a Crime Scene*. Pragmatic Bookshelf.'],
  project: { t: 'Análisis de evolución de un repositorio real',
    goal: 'Estudiar la evolución de un proyecto de código abierto con datos de su historial.',
    steps: ['Elige un proyecto de código abierto con varios años de historia y clónalo.', 'Escribe un script que extraiga del historial la frecuencia de cambio por archivo y cruza el resultado con la complejidad.', 'Identifica los cinco puntos calientes y el autor principal de cada uno (factor autobús).', 'Clasifica una muestra de 50 commits o issues por tipo de mantenimiento.', 'Busca evidencia de al menos dos leyes de Lehman (por ejemplo, crecimiento del tamaño y de la complejidad).'],
    deliver: 'El script, los gráficos y un informe con las conclusiones y recomendaciones.' },
  hito: ['Clasifica las solicitudes de cambio pendientes de PatioApp por tipo de mantenimiento y prioriza con un análisis de puntos calientes del historial.', 'Reserva capacidad para reducir la complejidad del principal punto caliente de PatioApp y mide el antes y el después.']
});

S('man', 'man.legacy', { title: 'Código heredado y modernización',
  ask: '¿Qué técnica para código heredado se aplica?',
  lesson: `
> **La idea en simple.** Tarde o temprano te tocará cambiar un sistema que nadie entiende del todo, sin pruebas y del que depende el negocio. La tentación es reescribirlo desde cero; casi siempre es un error. Hay técnicas para ponerlo bajo control y reemplazarlo pieza por pieza, sin apagar nada.

## ¿Qué es código heredado?
Michael Feathers dio en *Working Effectively with Legacy Code* (2004) una definición provocadora: **código heredado es código sin pruebas**. No importa si es viejo o nuevo, ni en qué lenguaje está: sin pruebas, no puedes saber si un cambio rompió algo, y cada cambio es una apuesta. Por eso la primera tarea con código heredado es ponerlo bajo prueba.

## El dilema y el algoritmo de cambio
El dilema de Feathers: para cambiar el código con seguridad necesitamos pruebas; para poner pruebas, a menudo necesitamos cambiar el código (por ejemplo, para romper una dependencia con la base de datos). Su **algoritmo de cambio** para salir del círculo:
1. Identificar los **puntos de cambio**.
2. Encontrar los **puntos de prueba**, donde se puede observar el efecto.
3. **Romper dependencias** con cambios mínimos y muy cuidadosos.
4. Escribir **pruebas**.
5. Hacer el cambio y **refactorizar**.

## Costuras y pruebas de caracterización
Una **costura** (*seam*) es un lugar donde puedes cambiar el comportamiento del programa sin editar ese lugar: por ejemplo, un parámetro por el que se inyecta una dependencia, o un método que una subclase de prueba puede sobrescribir. Encontrar o crear costuras permite reemplazar la base de datos o el reloj por dobles de prueba.

Una **prueba de caracterización** no verifica lo que el código *debería* hacer, sino lo que *hace hoy*. Se escribe una prueba con un valor cualquiera, se ejecuta, se ve el resultado real y se fija ese valor como esperado. Así se documenta el comportamiento actual, incluidos sus defectos, y cualquier cambio involuntario se detecta.
~~~js
// Función heredada que nadie se atreve a tocar
function tarifaLegada(horas, tipo) { let t = horas * 5; if (tipo == 'camion') t = t * 2; if (horas > 24) t = t - 10; return t; }
// Pruebas de caracterización: fijamos lo que hace HOY, sin juzgarlo
const casos = [[1, 'auto'], [24, 'auto'], [25, 'auto'], [25, 'camion'], [0, 'moto']];
casos.forEach(([h, t]) => console.log('tarifaLegada(' + h + ", '" + t + "') ===", tarifaLegada(h, t)));
// Observa el caso de 25 h en camión: 240. ¿Es correcto descontar 10 después de duplicar? Se registra y se consulta al negocio.
~~~

## Técnicas para agregar código nuevo
Cuando necesitas agregar funcionalidad a un método enorme sin pruebas, Feathers propone:
- **Método brote** (*sprout method*): escribir la lógica nueva en un método nuevo, con pruebas, y llamarlo desde el código viejo con una sola línea.
- **Clase brote:** lo mismo, cuando la clase vieja es imposible de instanciar en una prueba.
- **Método envoltorio** (*wrap method*): renombrar el método viejo y crear uno nuevo con el nombre original que llama al viejo y agrega el comportamiento nuevo antes o después.
Así el código nuevo nace probado, aunque el viejo todavía no lo esté.

## No reescribas todo de golpe
Joel Spolsky escribió en 2000 *Things You Should Never Do* sobre la decisión de Netscape de reescribir su navegador desde cero: pasaron unos tres años sin publicar una versión principal nueva mientras la competencia avanzaba. El código viejo, por feo que parezca, contiene años de correcciones de casos raros que nadie documentó. Una reescritura total congela las mejoras, duplica el esfuerzo y suele redescubrir los mismos defectos.

## La higuera estranguladora
Martin Fowler describió en 2004 el patrón **Strangler Fig** inspirado en unas higueras de Australia que crecen alrededor de un árbol hasta reemplazarlo. Para un sistema:
1. Se coloca una **fachada** (un enrutador o proxy) delante del sistema viejo.
2. Se construye una funcionalidad en el sistema nuevo y la fachada le envía ese tráfico.
3. Se repite funcionalidad por funcionalidad, hasta que el sistema viejo no recibe tráfico y se apaga.
Cada paso entrega valor y se puede revertir. Técnicas complementarias:
- **Rama por abstracción** (Paul Hammant, 2007): introducir una interfaz delante del componente que se reemplaza, tener ambas implementaciones conviviendo y cambiar de una a otra con una bandera.
- **Ejecución en paralelo:** enviar las mismas peticiones a ambos sistemas y comparar los resultados antes de confiar en el nuevo.
- **Capa anticorrupción** (Eric Evans, *Domain-Driven Design*, 2003): una traducción entre el modelo del sistema viejo y el nuevo, para que los conceptos confusos del viejo no contaminen el nuevo.

## Reingeniería
Elliot Chikofsky y James Cross definieron en 1990 la terminología clásica:
| Término | Significado |
| Ingeniería directa | de los requisitos y el diseño al código |
| Ingeniería inversa | del código a representaciones más abstractas (diagramas, modelos) para entenderlo |
| Reestructuración | transformar la representación sin cambiar el comportamiento (refactorizar) |
| Reingeniería | examinar y alterar un sistema para reconstituirlo en una nueva forma |
Serge Demeyer, Stéphane Ducasse y Oscar Nierstrasz catalogaron en *Object-Oriented Reengineering Patterns* (2002) patrones como "lee todo el código en una hora", "entrevista durante una demostración" y "escribe pruebas para entender". Millones de transacciones bancarias diarias siguen procesándose en COBOL: la modernización es un trabajo permanente y muy demandado.

## Ejemplo resuelto: modernizar el módulo de tarifas
Situación: la función de tarifas de PatioApp tiene 600 líneas, cero pruebas y causa la mitad de los defectos. Plan:
1. Escribir 40 pruebas de caracterización con casos reales de producción.
2. Crear una costura: la función recibe el reloj como parámetro en lugar de usar la fecha del sistema.
3. Introducir la interfaz «CalculadoraTarifa» (rama por abstracción) con la implementación vieja detrás.
4. Escribir la implementación nueva con TDD y ejecutarla en paralelo durante dos semanas, registrando diferencias.
5. Cada diferencia se analiza con el negocio: ¿defecto viejo o defecto nuevo?
6. Cambiar la bandera a la implementación nueva, vigilar y, tras un mes estable, borrar la vieja.`,
  links: [['m6.refactor', 'la refactorización segura es la base de la modernización'], ['m14.unit', 'las pruebas de caracterización usan las mismas herramientas que las pruebas unitarias'], ['m13.dist', 'la higuera estranguladora se usa para pasar de monolito a servicios']],
  read: 'Feathers, *Working Effectively with Legacy Code*, partes I y II; Fowler, *StranglerFigApplication* (2004); Demeyer, Ducasse y Nierstrasz.',
  terms: [
    ['Código heredado', 'según Feathers, código sin pruebas, independientemente de su antigüedad', ['Un módulo escrito el mes pasado sin pruebas ya es heredado.', 'Cada cambio en él es una apuesta.', 'La primera tarea es ponerlo bajo prueba.']],
    ['Costura', 'lugar donde se puede alterar el comportamiento de un programa sin editar ese lugar', ['Un parámetro por el que se inyecta el reloj.', 'Un método que una subclase de prueba sobrescribe.', 'Permite reemplazar la base de datos por un doble.']],
    ['Prueba de caracterización', 'prueba que fija el comportamiento actual del código, sea correcto o no', ['Ejecutas la función, anotas el resultado y lo usas como esperado.', 'Detecta cambios involuntarios al refactorizar.', 'Puede revelar defectos que hay que consultar.']],
    ['Método brote', 'técnica que escribe la lógica nueva en un método nuevo y probado llamado desde el código viejo', ['Agregas el cálculo de descuentos en un método aparte.', 'El código viejo solo gana una línea.', 'El código nuevo nace con pruebas.']],
    ['Higuera estranguladora', 'patrón que reemplaza un sistema gradualmente, enrutando funcionalidad por funcionalidad al sistema nuevo', ['Un proxy envía /reportes al sistema nuevo y el resto al viejo.', 'Cada paso se puede revertir.', 'Fowler lo describió en 2004.']],
    ['Rama por abstracción', 'técnica que introduce una interfaz para que la implementación vieja y la nueva convivan mientras se reemplaza', ['CalculadoraTarifa tiene dos implementaciones.', 'Una bandera decide cuál usar.', 'Permite reemplazar sin ramas largas de Git.']],
    ['Capa anticorrupción', 'capa de traducción que evita que el modelo de un sistema viejo contamine el modelo del nuevo', ['Traduces los códigos crípticos del sistema viejo a conceptos claros.', 'Eric Evans la propuso en Domain-Driven Design.', 'Aísla al sistema nuevo de los cambios del viejo.']],
    ['Ingeniería inversa', 'análisis de un sistema para obtener representaciones más abstractas que ayuden a entenderlo', ['Generas un diagrama de clases desde el código.', 'Reconstruyes el modelo de datos desde la base.', 'Chikofsky y Cross la definieron en 1990.']]
  ],
  q: [
    ['Según Feathers, ¿qué hace que un código sea heredado?', 'Que no tiene pruebas', ['Que tiene más de diez años', 'Que está en COBOL', 'Que lo escribió otra persona'], 'Sin pruebas no se puede cambiar con seguridad.', 2],
    ['¿Qué verifica una prueba de caracterización?', 'Lo que el código hace hoy, sea correcto o no', ['Lo que el código debería hacer según los requisitos', 'Solo el rendimiento', 'Que no haya errores de sintaxis'], 'Fija el comportamiento actual para detectar cambios.', 3],
    ['Debes agregar una regla nueva a un método de 800 líneas sin pruebas. ¿Qué técnica conviene?', 'Escribir la regla en un método brote probado y llamarlo desde el método viejo', ['Reescribir el método completo', 'Agregar la regla en medio sin pruebas', 'Copiar el método y modificar la copia'], 'El código nuevo nace probado con un cambio mínimo al viejo.', 3],
    ['¿Qué riesgo ilustra el caso de Netscape según Spolsky?', 'Reescribir desde cero congela las mejoras durante años y pierde conocimiento acumulado', ['Que el código abierto no funciona', 'Que JavaScript es lento', 'Que no hay que hacer pruebas'], 'El código viejo contiene años de correcciones no documentadas.', 3],
    ['En una ejecución en paralelo, ¿qué se hace?', 'Enviar las mismas peticiones a ambos sistemas y comparar resultados', ['Ejecutar las pruebas en varios hilos', 'Desplegar en dos regiones', 'Apagar el sistema viejo de inmediato'], 'Da confianza antes de cambiar el tráfico al nuevo.', 3],
    { tf: 'La higuera estranguladora permite apagar el sistema viejo de forma gradual, funcionalidad por funcionalidad.', v: true, e: 'Una fachada va desviando el tráfico al sistema nuevo.', l: 2 },
    { tf: 'La reestructuración, según Chikofsky y Cross, cambia el comportamiento externo del sistema.', v: false, e: 'Transforma la representación conservando el comportamiento, como la refactorización.', l: 3 },
    { o: 'Ordena el algoritmo de cambio de Feathers.', s: ['Identificar los puntos de cambio', 'Encontrar los puntos de prueba', 'Romper dependencias', 'Escribir pruebas', 'Hacer el cambio y refactorizar'], e: 'Primero se pone el código bajo prueba.', l: 3 },
    { c: 'Escribe «enrutar(ruta, migradas)»: devuelve "nuevo" si la ruta empieza con alguno de los prefijos de la lista migradas, o "legado" en otro caso (fachada de la higuera estranguladora).', f: 'enrutar', p: ['ruta', 'migradas'], t: [[['/reportes/mes', ['/reportes', '/clientes']], 'nuevo'], [['/cobros/1', ['/reportes']], 'legado'], [['/clientes', ['/clientes']], 'nuevo'], [['/x', []], 'legado']], sol: '  return migradas.some(p => ruta.startsWith(p)) ? "nuevo" : "legado";', l: 2 },
    { c: 'Escribe «porcentajeMigrado(rutas, migradas)»: qué porcentaje de las rutas ya empieza con algún prefijo migrado, redondeado a 1 decimal.', f: 'porcentajeMigrado', p: ['rutas', 'migradas'], t: [[[['/a', '/b', '/c', '/d'], ['/a']], 25], [[['/a/x', '/a/y', '/b'], ['/a']], 66.7], [[['/x'], []], 0]], sol: '  const n = rutas.filter(r => migradas.some(p => r.startsWith(p))).length;\n  return Math.round(1000 * n / rutas.length) / 10;', l: 2 }
  ],
  gen: function (g) {
    var tecnicas = [['Agregar la lógica nueva en una función aparte, probada, llamada desde el código viejo', 'Método brote'], ['Poner un proxy que envía algunas rutas al sistema nuevo y el resto al viejo', 'Higuera estranguladora'], ['Crear una interfaz con la implementación vieja y la nueva detrás de una bandera', 'Rama por abstracción'], ['Traducir los conceptos del sistema viejo para no contaminar el modelo nuevo', 'Capa anticorrupción'], ['Ejecutar la función y fijar su resultado actual como esperado', 'Prueba de caracterización'], ['Pasar el reloj como parámetro para poder controlarlo en las pruebas', 'Costura'], ['Generar diagramas a partir del código para entenderlo', 'Ingeniería inversa'], ['Enviar las mismas peticiones a ambos sistemas y comparar respuestas', 'Ejecución en paralelo']];
    var nombres = tecnicas.map(function (t) { return t[1]; });
    tecnicas.forEach(function (t) { g.mcq(3, '¿Qué técnica describe esto? ' + t[0], t[1], g.R.sample(nombres.filter(function (n) { return n !== t[1]; }), 3), 'Técnicas de Feathers, Fowler, Hammant y Evans.'); });
    g.times(6, function (R) { var h = R.int(1, 40), camion = R.pick([true, false]), t = h * 5; if (camion) t *= 2; if (h > 24) t -= 10; g.input(3, 'Con la función heredada «tarifaLegada» de la lección (5 por hora, el doble para camión y −10 si pasa de 24 h), ¿qué valor fija la prueba de caracterización para ' + h + ' h de ' + (camion ? 'camión' : 'auto') + '?', t, 'Se calcula lo que el código hace hoy: ' + t + '.', 'function tarifaLegada(horas, tipo) { let t = horas * 5; if (tipo == "camion") t = t * 2; if (horas > 24) t = t - 10; return t; }'); });
    g.times(4, function (R) { var total = R.int(10, 30), mig = R.int(1, total - 1); g.input(2, 'De ' + total + ' rutas del sistema viejo ya se migraron ' + mig + '. ¿Qué porcentaje del tráfico por rutas pasa ya por el sistema nuevo, si todas reciben el mismo tráfico? Redondea a 1 decimal.', (100 * mig / total).toFixed(1), mig + '/' + total + ' × 100.'); });
  },
  checks: [
    ['¿Por qué Feathers define el código heredado como código sin pruebas?', 'Porque lo que hace difícil cambiar un código no es su edad sino no poder saber si un cambio rompió algo.'],
    ['¿Cómo se escribe una prueba de caracterización?', 'Se llama al código con una entrada, se observa el resultado real y se fija ese resultado como valor esperado, aunque parezca incorrecto.'],
    ['¿Por qué suele ser mala idea reescribir un sistema desde cero?', 'Porque congela las mejoras por mucho tiempo, pierde años de correcciones no documentadas y suele repetir los mismos defectos.'],
    ['Describe los pasos de la higuera estranguladora.', 'Poner una fachada delante del sistema viejo, construir una funcionalidad en el nuevo, desviar ese tráfico y repetir hasta apagar el viejo.'],
    ['¿Para qué sirve una capa anticorrupción?', 'Para traducir entre el modelo del sistema viejo y el nuevo, evitando que los conceptos confusos del viejo contaminen el diseño nuevo.']
  ],
  cites: ['Feathers, M. (2004). *Working Effectively with Legacy Code*. Prentice Hall.', 'Fowler, M. (2004). StranglerFigApplication. martinfowler.com.', 'Chikofsky, E. y Cross, J. (1990). Reverse Engineering and Design Recovery: A Taxonomy. *IEEE Software*, 7(1).', 'Demeyer, S., Ducasse, S. y Nierstrasz, O. (2002). *Object-Oriented Reengineering Patterns*. Morgan Kaufmann.', 'Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.', 'Spolsky, J. (2000). Things You Should Never Do, Part I. *Joel on Software*.'],
  project: { t: 'Rescate de un código heredado',
    goal: 'Tomar un código sin pruebas y modernizarlo sin romperlo.',
    steps: ['Consigue un código heredado (un proyecto antiguo tuyo, uno de código abierto o la kata Gilded Rose de Emily Bache).', 'Escribe pruebas de caracterización hasta cubrir sus caminos principales.', 'Crea las costuras necesarias y agrega una funcionalidad nueva con un método brote.', 'Reemplaza un componente con rama por abstracción y compara ambas implementaciones en paralelo.', 'Refactoriza hasta reducir la complejidad a la mitad, manteniendo todas las pruebas en verde.'],
    deliver: 'El repositorio con el historial de commits pequeños, las pruebas y un informe con las métricas antes y después.' },
  hito: ['Pon bajo pruebas de caracterización el módulo más frágil de PatioApp y crea las costuras necesarias para probarlo.', 'Reemplaza ese módulo con rama por abstracción o higuera estranguladora, comparando en paralelo la versión vieja y la nueva antes de retirar la vieja.']
});

S('man', 'man.scm', { title: 'Gestión de la configuración, versiones y dependencias',
  ask: '¿Qué concepto de gestión de la configuración se aplica?',
  lesson: `
> **La idea en simple.** Cuando un cliente reporta un error, la primera pregunta es: ¿qué versión exacta tiene, con qué librerías y qué configuración? Si no puedes responder y reconstruir esa versión, no puedes reproducir el problema. La gestión de la configuración es la disciplina que hace posible esa respuesta.

## Qué es la gestión de la configuración
La norma **IEEE 828** y SWEBOK definen la gestión de la configuración del software (SCM) como la disciplina de identificar la configuración de un sistema en distintos momentos, controlar sistemáticamente sus cambios y mantener su integridad y trazabilidad durante todo el ciclo de vida. Nació en la industria aeroespacial y de defensa en los años 50 y 60, cuando se descubrió que era imposible mantener un misil si no se sabía exactamente con qué piezas se había construido. Sus actividades:
| Actividad | Pregunta que responde | Ejemplo |
| Identificación | ¿qué elementos controlamos y cómo se llaman? | código, configuración, esquemas, documentos, con versión |
| Control de cambios | ¿quién aprueba un cambio y cómo? | pull request con revisión; comité para cambios grandes |
| Registro de estado | ¿qué versión tiene cada cliente y qué cambió? | historial, etiquetas de Git, registro de despliegues |
| Auditoría | ¿lo construido coincide con lo especificado? | auditoría funcional y física antes de entregar |
| Gestión de entregas | ¿cómo se construye y distribuye una versión? | pipeline que produce el artefacto |

## Elementos de configuración y líneas base
Un **elemento de configuración** es cualquier cosa cuya versión importa: código fuente, archivos de configuración, esquemas de base de datos, scripts de infraestructura, documentación y hasta las versiones del compilador. Una **línea base** es un conjunto de elementos, con sus versiones, revisado y aprobado, que sirve de referencia para cambios futuros. En la práctica moderna, una etiqueta de Git (por ejemplo «v2.3.0») sobre un commit cuyo contenido incluye el código, la configuración y la infraestructura como código funciona como línea base.

## Versionado semántico
Tom Preston-Werner, cofundador de GitHub, publicó la especificación **SemVer**. Una versión tiene la forma MAYOR.MENOR.PARCHE:
- **MAYOR** sube cuando haces cambios incompatibles en la API pública.
- **MENOR** sube cuando agregas funcionalidad compatible con lo anterior.
- **PARCHE** sube cuando corriges errores de forma compatible.
Al subir un número, los de la derecha vuelven a cero (2.3.7 → 3.0.0). Las versiones 0.x.y son de desarrollo inicial: cualquier cosa puede cambiar. También existen sufijos de prelanzamiento como «1.0.0-beta.2».
~~~js
const comparar = (a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1; return 0; };
const versiones = ['1.10.0', '1.2.3', '2.0.0', '1.2.10', '0.9.9'];
console.log(versiones.sort(comparar));   // ¡1.10.0 es mayor que 1.2.10! No se comparan como texto.
~~~

## Rangos de dependencias y archivos de bloqueo
En npm, un rango «^1.4.0» acepta cualquier versión 1.x.y que sea mayor o igual que 1.4.0, confiando en que el autor respeta SemVer; «~1.4.0» solo acepta parches (1.4.x). Para 0.x el acento circunflejo es más estricto: «^0.2.3» acepta 0.2.x pero no 0.3.0. El problema: dos instalaciones en días distintos pueden obtener versiones diferentes. Por eso existen los **archivos de bloqueo** («package-lock.json», «poetry.lock», «Cargo.lock»), que registran la versión exacta de cada dependencia, incluidas las **transitivas** (las dependencias de tus dependencias). El archivo de bloqueo se guarda en el repositorio.

## Los riesgos de la cadena de dependencias
- En marzo de 2016, el autor de «left-pad», un paquete de once líneas, lo retiró de npm; miles de proyectos, incluidos algunos muy grandes, dejaron de compilar. npm cambió después sus reglas para retirar paquetes.
- En diciembre de 2021 se reveló **Log4Shell**, una vulnerabilidad crítica en la librería Log4j de Java, usada directa o indirectamente por una enorme cantidad de sistemas. Muchas organizaciones tardaron semanas solo en averiguar si la usaban.
Respuestas de la industria:
- **SBOM** (*Software Bill of Materials*): la lista de todos los componentes de un software con sus versiones, en formatos como SPDX o CycloneDX. La orden ejecutiva 14028 de Estados Unidos (2021) la exigió a proveedores del gobierno.
- **Actualización automatizada** con herramientas como Dependabot o Renovate, que abren pull requests con cada versión nueva.
- **Auditoría** con «npm audit» u OSV para encontrar vulnerabilidades conocidas.

## Compilaciones reproducibles
Una compilación es **reproducible** si, partiendo del mismo código fuente, entorno e instrucciones, cualquiera obtiene un resultado idéntico bit a bit. Proyectos como Debian lo persiguen desde mediados de la década de 2010 (reproducible-builds.org), porque permite verificar que un binario distribuido corresponde realmente al código publicado y no fue alterado. Requiere fijar versiones de herramientas, evitar fechas y rutas incrustadas y ordenar los archivos de forma determinista. Los contenedores y los archivos de bloqueo son pasos en esa dirección.

## Monorepo o múltiples repositorios
Rachel Potvin y Josh Levenberg describieron en 2016 el monorepo de Google, con miles de millones de líneas y decenas de miles de ingenieros. Ventajas: un solo historial, cambios atómicos que tocan varios proyectos, versiones únicas de las dependencias. Costos: herramientas especiales de compilación y de control de acceso. Muchas organizaciones usan múltiples repositorios con versionado semántico entre ellos; ambas opciones son válidas si se gestionan con disciplina.

## Ejemplo resuelto: reproducir un error de un cliente
Un patio reporta un error en la versión que tiene instalada. Gracias a la gestión de la configuración: el registro de despliegues indica que tiene la «v2.3.1»; la etiqueta de Git apunta al commit exacto; el archivo de bloqueo reconstruye las mismas dependencias; la imagen del contenedor fija el sistema operativo y Node; la configuración del cliente está versionada. En diez minutos el equipo reproduce el error en local, lo corrige en la rama de mantenimiento, publica la «v2.3.2» (un parche) y documenta el cambio. Sin esas piezas, la misma tarea podría tomar días de adivinanzas.`,
  links: [['m7.git', 'Git es la herramienta base de la gestión de la configuración'], ['m15.containers', 'los contenedores fijan el entorno y ayudan a reproducir compilaciones'], ['m16.owasp', 'los componentes vulnerables y desactualizados son un riesgo de seguridad']],
  read: 'SWEBOK v4, área Software Configuration Management; semver.org; Potvin y Levenberg (2016); reproducible-builds.org.',
  terms: [
    ['Elemento de configuración', 'cualquier artefacto cuya versión se controla porque afecta al sistema', ['El código fuente y los esquemas de base de datos.', 'Los archivos de configuración y la infraestructura como código.', 'La versión del compilador.']],
    ['Línea base', 'conjunto aprobado de elementos de configuración con sus versiones, usado como referencia', ['La etiqueta v2.3.0 marca la línea base de la entrega.', 'Los cambios posteriores se controlan contra ella.', 'Permite reconstruir exactamente una versión.']],
    ['Versionado semántico', 'convención MAYOR.MENOR.PARCHE que indica el tipo de cambio de cada versión', ['Un cambio incompatible sube de 2.3.7 a 3.0.0.', 'Una función nueva compatible sube a 2.4.0.', 'Una corrección sube a 2.3.8.']],
    ['Dependencia transitiva', 'dependencia que no declaras directamente pero que usa una de tus dependencias', ['Usas un framework que depende de una librería de fechas.', 'Log4Shell afectó a muchos que no sabían que usaban Log4j.', 'El archivo de bloqueo las registra.']],
    ['Archivo de bloqueo', 'archivo que registra la versión exacta de cada dependencia instalada, incluidas las transitivas', ['package-lock.json en npm.', 'Se guarda en el repositorio.', 'Hace que dos instalaciones obtengan lo mismo.']],
    ['SBOM', 'lista formal de todos los componentes de un software con sus versiones', ['Respondes en minutos si usas una librería vulnerable.', 'Se genera en formatos SPDX o CycloneDX.', 'La orden ejecutiva 14028 la exigió en 2021.']],
    ['Compilación reproducible', 'compilación que produce un resultado idéntico bit a bit a partir del mismo código y entorno', ['Verificas que el binario corresponde al código publicado.', 'Debian lo persigue en sus paquetes.', 'Requiere eliminar fechas y rutas incrustadas.']],
    ['Control de cambios', 'proceso para proponer, evaluar, aprobar e implementar cambios en elementos de configuración', ['Un pull request con revisión obligatoria.', 'Un comité aprueba cambios a la línea base.', 'Deja trazabilidad de quién aprobó qué.']]
  ],
  q: [
    ['Agregas una función nueva compatible a una librería en la versión 3.4.2. ¿Cuál es la siguiente versión?', '3.5.0', ['3.4.3', '4.0.0', '3.5.2'], 'Sube MENOR y PARCHE vuelve a cero.', 2],
    ['Eliminas un parámetro obligatorio de una función pública en la versión 1.9.4. ¿Cuál es la siguiente versión?', '2.0.0', ['1.10.0', '1.9.5', '1.10.4'], 'Es un cambio incompatible: sube MAYOR.', 2],
    ['¿Qué versiones acepta el rango «^1.4.0» en npm?', 'Cualquier 1.x.y mayor o igual que 1.4.0', ['Solo 1.4.0', 'Solo 1.4.x', 'Cualquier versión mayor que 1.4.0, incluida 2.0.0'], 'El acento circunflejo permite cambios menores y parches.', 3],
    ['¿Para qué sirve un archivo de bloqueo?', 'Para que todas las instalaciones obtengan exactamente las mismas versiones de dependencias', ['Para impedir que otros editen el código', 'Para cifrar las dependencias', 'Para bloquear las ramas de Git'], 'Registra versiones exactas, incluidas las transitivas.', 2],
    ['¿Qué lección dejó el incidente de left-pad en 2016?', 'Que una dependencia diminuta y lejana puede romper miles de proyectos', ['Que npm es inseguro y no debe usarse', 'Que hay que escribir todo desde cero', 'Que JavaScript no sirve para servidores'], 'La cadena de dependencias es parte de tu sistema.', 3],
    ['¿Qué actividad de la gestión de la configuración responde "qué versión tiene cada cliente"?', 'Registro de estado', ['Identificación', 'Auditoría', 'Control de cambios'], 'Mantiene la información sobre el estado de cada configuración.', 3],
    { tf: 'Al comparar versiones, "1.10.0" es mayor que "1.2.10".', v: true, e: 'Se compara número por número: 10 > 2 en la parte MENOR.', l: 2 },
    { tf: 'El archivo de bloqueo debe excluirse del repositorio porque se genera automáticamente.', v: false, e: 'Se versiona justamente para que todos instalen lo mismo.', l: 2 },
    { c: 'Escribe «compararSemver(a, b)» que devuelva −1, 0 o 1 según a sea menor, igual o mayor que b (formato MAYOR.MENOR.PARCHE).', f: 'compararSemver', p: ['a', 'b'], t: [[['1.10.0', '1.2.10'], 1], [['2.0.0', '2.0.0'], 0], [['0.9.9', '1.0.0'], -1], [['1.2.3', '1.2.4'], -1]], sol: '  const x = a.split(".").map(Number), y = b.split(".").map(Number);\n  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1;\n  return 0;', l: 2 },
    { c: 'Escribe «siguienteVersion(version, tipo)» donde tipo es "major", "minor" o "patch".', f: 'siguienteVersion', p: ['version', 'tipo'], t: [[['2.3.7', 'major'], '3.0.0'], [['2.3.7', 'minor'], '2.4.0'], [['2.3.7', 'patch'], '2.3.8'], [['0.9.0', 'minor'], '0.10.0']], sol: '  let [M, m, p] = version.split(".").map(Number);\n  if (tipo === "major") { M++; m = 0; p = 0; } else if (tipo === "minor") { m++; p = 0; } else p++;\n  return M + "." + m + "." + p;', l: 2 },
    { c: 'Escribe «satisfaceCaret(version, rango)» para rangos «^X.Y.Z» de npm: si X > 0, misma MAYOR y versión ≥ rango; si X = 0 e Y > 0, mismas MAYOR y MENOR y versión ≥ rango; si X = Y = 0, versión exacta.', f: 'satisfaceCaret', p: ['version', 'rango'], t: [[['1.4.2', '^1.2.0'], true], [['2.0.0', '^1.2.0'], false], [['1.1.9', '^1.2.0'], false], [['0.2.5', '^0.2.3'], true], [['0.3.0', '^0.2.3'], false], [['0.0.4', '^0.0.3'], false]], sol: '  const v = version.split(".").map(Number), r = rango.slice(1).split(".").map(Number);\n  const ge = () => { for (let i = 0; i < 3; i++) if (v[i] !== r[i]) return v[i] > r[i]; return true; };\n  if (r[0] > 0) return v[0] === r[0] && ge();\n  if (r[1] > 0) return v[0] === 0 && v[1] === r[1] && ge();\n  return v[0] === 0 && v[1] === 0 && v[2] === r[2];', h: 'Primero compara la parte que debe ser igual y luego verifica que la versión no sea menor que la del rango.', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var M = R.int(0, 5), m = R.int(0, 12), p = R.int(0, 20), tipo = R.pick(['incompatible', 'compatible con funcionalidad nueva', 'de corrección']), nv = tipo === 'incompatible' ? (M + 1) + '.0.0' : tipo === 'compatible con funcionalidad nueva' ? M + '.' + (m + 1) + '.0' : M + '.' + m + '.' + (p + 1); g.input(2, 'Una librería está en la versión ' + M + '.' + m + '.' + p + ' y haces un cambio ' + tipo + '. ¿Cuál es la siguiente versión según SemVer?', nv, 'Incompatible sube MAYOR; funcionalidad compatible sube MENOR; corrección sube PARCHE.'); });
    g.times(6, function (R) { var a = [R.int(1, 3), R.int(0, 15), R.int(0, 15)], b = [a[0], R.int(0, 15), R.int(0, 15)]; while (a.join() === b.join()) b[2]++; var c = a[1] !== b[1] ? (a[1] > b[1] ? a : b) : (a[2] > b[2] ? a : b); g.mcq(2, '¿Cuál versión es mayor: ' + a.join('.') + ' o ' + b.join('.') + '?', c.join('.'), [(c === a ? b : a).join('.'), 'Son iguales', 'No se pueden comparar'], 'Se compara número por número, no como texto.'); });
    var acts = [['Decidir que los esquemas de la base de datos se versionan igual que el código', 'Identificación'], ['Exigir revisión y aprobación para cada pull request', 'Control de cambios'], ['Registrar qué versión está desplegada en cada patio', 'Registro de estado'], ['Verificar antes de entregar que la versión cumple lo especificado y contiene lo que dice', 'Auditoría'], ['Construir y distribuir el artefacto de la versión 2.4.0', 'Gestión de entregas']];
    acts.forEach(function (a) { g.mcq(3, '¿Qué actividad de la gestión de la configuración es esta? ' + a[0], a[1], g.R.sample(['Identificación', 'Control de cambios', 'Registro de estado', 'Auditoría', 'Gestión de entregas'].filter(function (x) { return x !== a[1]; }), 3), 'Actividades según IEEE 828 y SWEBOK.'); });
  },
  checks: [
    ['¿Qué es una línea base y para qué sirve?', 'Un conjunto aprobado de elementos de configuración con sus versiones; sirve para reconstruir una versión y controlar los cambios desde ella.'],
    ['Explica cuándo se sube cada número de SemVer.', 'MAYOR con cambios incompatibles, MENOR con funcionalidad nueva compatible y PARCHE con correcciones compatibles.'],
    ['¿Por qué se versiona el archivo de bloqueo?', 'Para que todas las instalaciones, incluidas las de integración continua, usen exactamente las mismas versiones de todas las dependencias.'],
    ['¿Qué problema resuelve un SBOM? Relaciónalo con Log4Shell.', 'Permite saber en minutos qué componentes y versiones contiene un software; con Log4Shell muchas organizaciones tardaron semanas en saber si usaban Log4j.'],
    ['¿Qué hace falta para que una compilación sea reproducible?', 'Fijar versiones de dependencias y herramientas, eliminar fechas y rutas incrustadas y ordenar los archivos de forma determinista.']
  ],
  cites: ['IEEE Std 828-2012. *IEEE Standard for Configuration Management in Systems and Software Engineering*.', 'Preston-Werner, T. *Semantic Versioning 2.0.0*. semver.org.', 'Potvin, R. y Levenberg, J. (2016). Why Google Stores Billions of Lines of Code in a Single Repository. *Communications of the ACM*, 59(7).', 'Lamb, C. y Zacchiroli, S. (2022). Reproducible Builds: Increasing the Integrity of Software Supply Chains. *IEEE Software*, 39(2).', 'Executive Order 14028 (2021). *Improving the Nation’s Cybersecurity*. Estados Unidos.', 'IEEE Computer Society (2024). *SWEBOK v4.0*. Capítulo Software Configuration Management.'],
  project: { t: 'Plan de gestión de la configuración',
    goal: 'Poner bajo control la configuración completa de un proyecto.',
    steps: ['Lista los elementos de configuración del proyecto (código, configuración, esquemas, infraestructura, documentación) y cómo se versiona cada uno.', 'Define la política de ramas, de control de cambios y de etiquetas de versión con SemVer.', 'Configura el archivo de bloqueo, la actualización automatizada de dependencias y la auditoría de vulnerabilidades en la integración continua.', 'Genera un SBOM en formato CycloneDX o SPDX en cada compilación.', 'Comprueba que puedes reconstruir una versión antigua desde cero y documenta los pasos.'],
    deliver: 'El plan escrito, la configuración del pipeline, un SBOM de ejemplo y la prueba de reconstrucción.' },
  hito: ['Define la línea base de PatioApp con etiquetas SemVer y versiona junto al código su configuración, sus esquemas y su infraestructura.', 'Configura en PatioApp el archivo de bloqueo, la actualización automatizada de dependencias, la auditoría de vulnerabilidades y la generación del SBOM en cada compilación.']
});

S('man', 'man.release', { title: 'Gestión de entregas, compatibilidad y obsolescencia',
  ask: '¿Qué concepto de gestión de entregas se aplica?',
  lesson: `
> **La idea en simple.** Publicar una versión no es solo subir código: es decidir qué entra, avisar qué cambió, cuidar a quienes dependen de ti y tener un plan si algo sale mal. Cuantos más usuarios tiene un sistema, más importante es cambiarlo sin romperles nada.

## Qué es una entrega
Una **entrega** (*release*) es una versión identificada del software que se pone a disposición de sus usuarios. La gestión de entregas decide su **contenido**, su **calendario**, cómo se **construye y verifica**, cómo se **comunica** y cómo se **revierte**. Jez Humble y David Farley sostienen en *Continuous Delivery* (2010) que entregar debería ser un evento aburrido: si cada cambio está siempre listo para producción gracias a la automatización, publicar deja de ser un riesgo y pasa a ser una decisión de negocio.

## Calendarios de entrega
- **Por alcance:** se publica cuando están listas ciertas funciones. Es fácil de entender, pero las fechas se corren.
- **Tren de entregas:** se publica en fechas fijas y lo que no esté listo espera al siguiente tren. Firefox pasó en 2011 a un ciclo rápido de seis semanas, y luego a cuatro; Chrome sigue un modelo similar. La fecha nunca se mueve; lo que se ajusta es el alcance.
- **Continuo:** cada cambio aprobado llega a producción, a veces muchas veces por día.
- **Con soporte extendido (LTS):** algunas versiones reciben correcciones por más tiempo. Ubuntu da cinco años de soporte estándar a sus versiones LTS, y Node.js mantiene una versión LTS por unos 30 meses. Así los usuarios conservadores pueden actualizar con menos frecuencia.

## Separar desplegar de liberar
**Desplegar** es poner el código en producción; **liberar** es hacer visible la funcionalidad a los usuarios. Las **banderas de funcionalidad** (*feature flags*), descritas por Pete Hodgson en el sitio de Martin Fowler, permiten desplegar código desactivado y encenderlo después para un porcentaje de usuarios, un patio piloto o todos. Hodgson distingue banderas de entrega (temporales), de experimentación, operativas (interruptores de emergencia) y de permisos. Advertencia: cada bandera es una rama en el código; si no se retiran, se acumulan como deuda técnica.

## Compatibilidad y la ley de Hyrum
Hyrum Wright, ingeniero de Google, formuló una observación que lleva su nombre y que aparece en *Software Engineering at Google* (Titus Winters, Tom Manshreck y Hyrum Wright, 2020): con una cantidad suficiente de usuarios de una API, no importa lo que prometas en el contrato; todos los comportamientos observables de tu sistema serán usados por alguien. Si una función devolvía los resultados ordenados "por casualidad", alguien depende de ese orden. Consecuencias:
- Todo cambio observable es potencialmente incompatible, aunque la documentación no lo prometiera.
- Conviene que la API exponga lo mínimo y que lo no garantizado sea visiblemente aleatorio (Go, por ejemplo, aleatoriza el orden de iteración de sus mapas).
- Las pruebas de contrato y el monitoreo del uso real indican quién se vería afectado.

## Obsolescencia ordenada
Retirar algo de una API pública exige un proceso:
1. **Anunciar** la obsolescencia (*deprecation*) con fecha de retiro y alternativa.
2. **Marcarla** en el código y en las respuestas (advertencias en la consola, la cabecera HTTP «Deprecation» o «Sunset» definida en la RFC 8594).
3. **Medir** quién la sigue usando y contactarlos.
4. **Retirarla** en una versión MAYOR, tal como pide SemVer.
Google describe en el mismo libro que un retiro planificado sale más barato que mantener para siempre sistemas que nadie quiere tocar.

## Changelog y notas de entrega
Olivier Lacan propuso **Keep a Changelog**: un archivo «CHANGELOG.md» escrito *para personas*, con la versión más reciente arriba, la fecha y los cambios agrupados en **Añadido**, **Cambiado**, **Obsoleto**, **Eliminado**, **Corregido** y **Seguridad**, más una sección "Sin publicar" para lo que viene. La convención **Conventional Commits** (por ejemplo, «feat: exportar reportes» o «fix: redondeo de tarifa») permite que herramientas generen el changelog y decidan el tipo de versión: un «feat» sube MENOR, un «fix» sube PARCHE y un «!» o la nota «BREAKING CHANGE» sube MAYOR.
~~~js
function tipoDeVersion(commits) {
  if (commits.some(c => /^\w+(\(.+\))?!:/.test(c) || c.includes('BREAKING CHANGE'))) return 'major';
  if (commits.some(c => c.startsWith('feat'))) return 'minor';
  if (commits.some(c => c.startsWith('fix'))) return 'patch';
  return 'none';
}
console.log(tipoDeVersion(['fix: redondeo de tarifa', 'docs: guía de instalación']));   // patch
console.log(tipoDeVersion(['feat: reporte por cliente', 'fix: zona horaria']));          // minor
console.log(tipoDeVersion(['feat!: la API de cobros exige moneda']));                    // major
~~~
Las **notas de entrega** son otra cosa: un resumen para los usuarios finales con lo que cambia para ellos, en su lenguaje, con capturas si ayuda.

## Plan de reversión y lista de verificación
Toda entrega necesita responder antes de publicar: ¿cómo la revierto? Opciones: volver a la versión anterior del artefacto, apagar la bandera o, si hubo migraciones de datos, aplicar el patrón **expandir y contraer** (agregar la columna nueva, escribir en ambas, migrar, y recién en una entrega posterior eliminar la vieja) para que la versión anterior siga funcionando. Una lista de verificación de entrega típica incluye: pruebas en verde, changelog actualizado, migraciones reversibles, monitoreo y alertas listos, plan de comunicación y responsable de guardia.

## Ejemplo resuelto: publicar la versión 3.0 de la API de PatioApp
La API de cobros necesita exigir el campo «moneda». Plan: en la 2.8 se agrega «moneda» como opcional y se marca como obsoleto el comportamiento sin moneda (cabecera «Deprecation» y aviso en el changelog con fecha de retiro a seis meses). Se mide: 14 integraciones aún no lo envían; se contacta a cada una. En la 2.9 se registran advertencias en cada llamada sin moneda. La 3.0 hace el campo obligatorio, con changelog en "Eliminado" y notas de entrega con la guía de migración. La 2.x se mantiene con parches de seguridad por seis meses más.`,
  links: [['m15.cicd', 'la entrega continua automatiza la construcción y el despliegue de cada versión'], ['m9.http', 'las cabeceras HTTP comunican obsolescencia y versiones de la API'], ['man.scm', 'el versionado semántico comunica el tipo de cambio de cada entrega']],
  read: 'Humble y Farley, *Continuous Delivery*; Winters, Manshreck y Wright, *Software Engineering at Google*, capítulos sobre obsolescencia y dependencias; keepachangelog.com; conventionalcommits.org.',
  terms: [
    ['Tren de entregas', 'modelo que publica versiones en fechas fijas; lo que no está listo espera al siguiente tren', ['Firefox publica cada pocas semanas.', 'La fecha no se mueve; se ajusta el alcance.', 'Da previsibilidad a usuarios y equipos.']],
    ['Versión LTS', 'versión que recibe correcciones y parches de seguridad durante un periodo extendido', ['Ubuntu LTS tiene cinco años de soporte estándar.', 'Node.js mantiene versiones LTS.', 'Sirve a usuarios que actualizan con poca frecuencia.']],
    ['Bandera de funcionalidad', 'mecanismo que activa o desactiva una funcionalidad en tiempo de ejecución sin desplegar de nuevo', ['Despliegas el reporte nuevo apagado y lo enciendes para un patio piloto.', 'Separa desplegar de liberar.', 'Hay que retirarla cuando ya no se necesita.']],
    ['Ley de Hyrum', 'observación de que, con suficientes usuarios, todo comportamiento observable de una API termina siendo usado por alguien', ['Alguien depende del orden "casual" de los resultados.', 'Cambiar un mensaje de error rompe un cliente que lo analizaba.', 'Aparece en Software Engineering at Google.']],
    ['Obsolescencia', 'anuncio de que una funcionalidad será retirada, con fecha y alternativa', ['Marcas un endpoint con la cabecera Sunset.', 'Avisas en el changelog seis meses antes.', 'El retiro ocurre en una versión mayor.']],
    ['Changelog', 'registro de cambios notables de cada versión, escrito para personas', ['Secciones Añadido, Cambiado, Obsoleto, Eliminado, Corregido y Seguridad.', 'La versión más reciente va arriba.', 'Keep a Changelog propone su formato.']],
    ['Conventional Commits', 'convención de mensajes de commit con un tipo (feat, fix, etc.) que permite automatizar versiones y changelogs', ['feat: exportar reportes sube la versión menor.', 'fix: redondeo de tarifa sube el parche.', 'feat! indica un cambio incompatible.']],
    ['Expandir y contraer', 'patrón para cambiar esquemas de datos en pasos compatibles que permiten revertir', ['Agregas la columna nueva y escribes en ambas.', 'Migras los datos y luego retiras la vieja.', 'La versión anterior sigue funcionando durante la transición.']]
  ],
  q: [
    ['¿Qué diferencia hay entre desplegar y liberar?', 'Desplegar pone el código en producción; liberar lo hace visible a los usuarios', ['Son sinónimos', 'Liberar es borrar la versión anterior', 'Desplegar es escribir el changelog'], 'Las banderas de funcionalidad los separan.', 2],
    ['Un cliente se queja porque cambiaste el texto de un mensaje de error y su integración lo analizaba. ¿Qué ley lo explica?', 'La ley de Hyrum', ['La ley de Conway', 'La ley de Brooks', 'La ley de Parkinson'], 'Todo comportamiento observable termina siendo usado por alguien.', 3],
    ['Con Conventional Commits, ¿qué tipo de versión corresponde a los commits «feat: nuevo reporte» y «fix: zona horaria»?', 'Menor', ['Parche', 'Mayor', 'Ninguna'], 'Un feat sube MENOR; prevalece sobre el fix.', 2],
    ['En un tren de entregas, ¿qué pasa si una funcionalidad no está lista en la fecha?', 'Espera al siguiente tren', ['Se retrasa la entrega', 'Se publica igual', 'Se cancela el proyecto'], 'La fecha es fija; el alcance se ajusta.', 2],
    ['¿En qué tipo de versión SemVer debe retirarse una funcionalidad pública?', 'Mayor', ['Menor', 'Parche', 'Cualquiera'], 'Retirar es un cambio incompatible.', 2],
    ['¿Por qué se usa el patrón expandir y contraer en migraciones de datos?', 'Para que cada paso sea compatible con la versión anterior y se pueda revertir', ['Para comprimir la base de datos', 'Para acelerar las consultas', 'Para evitar escribir migraciones'], 'La versión anterior sigue funcionando durante la transición.', 4],
    { tf: 'Un changelog debería ser la lista completa de mensajes de commit, generada sin revisión.', v: false, e: 'Keep a Changelog insiste en que se escribe para personas, con los cambios notables agrupados.', l: 2 },
    { tf: 'Las banderas de funcionalidad que ya cumplieron su propósito deberían retirarse del código.', v: true, e: 'Si se acumulan, se vuelven deuda técnica.', l: 1 },
    { o: 'Ordena los pasos para retirar un endpoint público.', s: ['Anunciar la obsolescencia con fecha y alternativa', 'Marcarlo con advertencias y la cabecera Sunset', 'Medir quién lo sigue usando y contactarlos', 'Retirarlo en una versión mayor'], e: 'La obsolescencia ordenada da tiempo a los usuarios.', l: 3 },
    { c: 'Escribe «tipoDeVersion(commits)» con Conventional Commits: "major" si algún commit tiene «!» antes de los dos puntos o contiene "BREAKING CHANGE"; si no, "minor" si alguno empieza con "feat"; si no, "patch" si alguno empieza con "fix"; si no, "none".', f: 'tipoDeVersion', p: ['commits'], t: [[[['fix: a', 'docs: b']], 'patch'], [[['feat: a', 'fix: b']], 'minor'], [[['feat!: a']], 'major'], [[['refactor(api)!: x']], 'major'], [[['chore: x']], 'none'], [[['fix: a\n\nBREAKING CHANGE: b']], 'major']], sol: '  if (commits.some(c => /^\\w+(\\(.+\\))?!:/.test(c) || c.includes("BREAKING CHANGE"))) return "major";\n  if (commits.some(c => c.startsWith("feat"))) return "minor";\n  if (commits.some(c => c.startsWith("fix"))) return "patch";\n  return "none";', l: 3 },
    { c: 'Escribe «contarCambios(commits)» que devuelva [cantidad de feat, cantidad de fix] (commits que empiezan con "feat" y con "fix").', f: 'contarCambios', p: ['commits'], t: [[[['feat: a', 'fix: b', 'fix: c', 'docs: d']], [1, 2]], [[[]], [0, 0]], [[['feat(ui): x', 'feat!: y']], [2, 0]]], sol: '  return [commits.filter(c => c.startsWith("feat")).length, commits.filter(c => c.startsWith("fix")).length];', l: 1 }
  ],
  gen: function (g) {
    var secs = [['Se agregó la exportación a Excel', 'Añadido'], ['El reporte mensual ahora incluye impuestos', 'Cambiado'], ['El endpoint /v1/cobros se retirará en junio', 'Obsoleto'], ['Se quitó el soporte para Internet Explorer', 'Eliminado'], ['Se arregló el redondeo de tarifas', 'Corregido'], ['Se actualizó una librería con una vulnerabilidad crítica', 'Seguridad'], ['Nueva pantalla de búsqueda por placa', 'Añadido'], ['Se eliminó el parámetro obsoleto "formato"', 'Eliminado']];
    secs.forEach(function (s) { g.mcq(2, '¿En qué sección de Keep a Changelog va este cambio? ' + s[0], s[1], g.R.sample(['Añadido', 'Cambiado', 'Obsoleto', 'Eliminado', 'Corregido', 'Seguridad'].filter(function (x) { return x !== s[1]; }), 3), 'Formato de Olivier Lacan.'); });
    var commits = [['fix: zona horaria de los reportes', 'Parche'], ['feat: reporte por cliente', 'Menor'], ['feat!: la API exige moneda', 'Mayor'], ['docs: guía de instalación', 'Ninguna'], ['fix(cobros): redondeo', 'Parche'], ['feat(ui): modo oscuro', 'Menor'], ['refactor!: cambia el formato de las fechas en la API', 'Mayor'], ['chore: actualiza dependencias de desarrollo', 'Ninguna']];
    commits.forEach(function (c) { g.mcq(2, 'Con Conventional Commits y SemVer, ¿qué versión dispara el commit «' + c[0] + '»?', c[1], ['Mayor', 'Menor', 'Parche', 'Ninguna'].filter(function (x) { return x !== c[1]; }), 'feat → menor, fix → parche, ! o BREAKING CHANGE → mayor.'); });
    var modelos = [['Se publica cada cuatro semanas sin excepción; lo que no está listo espera', 'Tren de entregas'], ['Cada cambio aprobado llega a producción en minutos', 'Entrega continua'], ['La versión recibe parches de seguridad durante cinco años', 'Soporte extendido (LTS)'], ['Se publica cuando están terminadas las cinco funciones acordadas', 'Por alcance']];
    modelos.forEach(function (m) { g.mcq(2, '¿Qué modelo de entregas describe esto? ' + m[0], m[1], ['Tren de entregas', 'Entrega continua', 'Soporte extendido (LTS)', 'Por alcance'].filter(function (x) { return x !== m[1]; }), 'Cada modelo equilibra previsibilidad, alcance y frecuencia.'); });
  },
  checks: [
    ['¿Qué ventaja tiene separar desplegar de liberar?', 'Permite poner el código en producción apagado y encenderlo después, gradualmente o para un piloto, reduciendo el riesgo y desacoplando decisiones técnicas y de negocio.'],
    ['Explica la ley de Hyrum con un ejemplo y una forma de mitigarla.', 'Si una API devuelve resultados ordenados por casualidad, alguien dependerá de ese orden; se mitiga exponiendo lo mínimo y haciendo visiblemente aleatorio lo no garantizado.'],
    ['¿Qué pasos sigue una obsolescencia ordenada?', 'Anunciar con fecha y alternativa, marcar con advertencias y cabeceras, medir y contactar a quienes la usan, y retirar en una versión mayor.'],
    ['¿Qué diferencia hay entre un changelog y unas notas de entrega?', 'El changelog registra los cambios notables por versión para desarrolladores y usuarios técnicos; las notas de entrega explican a los usuarios finales qué cambia para ellos.'],
    ['¿Cómo harías reversible una entrega que cambia el esquema de datos?', 'Con expandir y contraer: agregar la estructura nueva, escribir en ambas, migrar y eliminar la vieja en una entrega posterior.']
  ],
  cites: ['Humble, J. y Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.', 'Winters, T., Manshreck, T. y Wright, H. (2020). *Software Engineering at Google*. O’Reilly.', 'Lacan, O. *Keep a Changelog*. keepachangelog.com.', 'Conventional Commits 1.0.0. conventionalcommits.org.', 'Hodgson, P. (2017). Feature Toggles (aka Feature Flags). martinfowler.com.', 'Wilde, E. (2019). RFC 8594: The Sunset HTTP Header Field. IETF.'],
  project: { t: 'Proceso de entregas de una librería',
    goal: 'Publicar una librería con versiones, changelog, obsolescencia y reversión bien gestionados.',
    steps: ['Crea una pequeña librería útil (por ejemplo, validación de placas peruanas) y publícala en un registro de paquetes o en GitHub.', 'Adopta Conventional Commits y automatiza el cálculo de la versión y la generación del changelog.', 'Publica al menos tres versiones: un parche, una menor y una mayor.', 'Marca como obsoleta una función en una versión menor y retírala en la siguiente mayor con guía de migración.', 'Escribe la lista de verificación de entrega y la política de soporte de versiones.'],
    deliver: 'El repositorio con sus etiquetas, el CHANGELOG.md, las notas de entrega y la política de soporte.' },
  hito: ['Adopta Conventional Commits en PatioApp y automatiza el cálculo de versiones y la generación del CHANGELOG.md con el formato de Keep a Changelog.', 'Publica una versión mayor de la API de PatioApp con obsolescencia ordenada, banderas de funcionalidad, migración de datos con expandir y contraer y plan de reversión.']
});
})();
