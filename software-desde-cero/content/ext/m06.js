(function () {
var X = SDC.X, XM = SDC.XM;
XM('m6', {
  uni: 'MIT 6.1020 (antes 6.031) *Software Construction*; CMU 17-214 *Principles of Software Construction* y 15-150 *Principles of Functional Programming*; Berkeley CS61A (programación funcional con SICP); Stanford CS242 *Programming Languages*. En Perú: Construcción de Software, Paradigmas de Programación e Ingeniería de Software (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp limpio y robusto',
    goal: 'Llevar el código de PatioApp a un nivel profesional: legible, refactorizado con seguridad, con errores bien manejados y un núcleo funcional fácil de probar.',
    steps: ['Configura linter y formateador y define una guía de estilo de una página para el proyecto.', 'Escribe pruebas de caracterización y refactoriza los tres módulos más enredados, con un commit por paso.', 'Implementa una política de errores: clases propias, validación en las fronteras, manejador central y registros con contexto.', 'Separa un núcleo funcional (reglas puras) de una capa de efectos (archivos, consola, servicios).', 'Pide a un compañero una revisión de código con una lista de verificación y responde cada comentario.'],
    deliver: 'El repositorio con historial de commits limpio, la guía de estilo, el archivo de deuda técnica y la revisión respondida.' }
});

X('m6.clean', {
  deep: `
## El código se escribe para personas
Abelson y Sussman lo dijeron en el prefacio de *SICP* (1985):
:::cita Los programas deben escribirse para que las personas los lean, y solo de forma secundaria para que las máquinas los ejecuten. | Abelson y Sussman, *Structure and Interpretation of Computer Programs* (1985), traducción propia.
Donald Knuth fue más lejos con la **programación literaria** (1984): propuso dejar de pensar que la tarea principal es instruir a la computadora y concentrarse en explicar a los seres humanos lo que queremos que la computadora haga. Robert C. Martin estima en *Clean Code* que el tiempo dedicado a leer código supera con creces al dedicado a escribirlo (más de diez a uno), así que hacer el código fácil de leer es hacerlo fácil de escribir.

## La complejidad es el enemigo
Steve McConnell llama a **gestionar la complejidad** el imperativo técnico principal del software (*Code Complete*, capítulo 5). Fred Brooks distinguió en *No Silver Bullet* (1986) dos tipos:
- **Esencial:** la del problema mismo (las reglas tributarias son complejas, y el software que las aplica también lo será).
- **Accidental:** la que agregamos nosotros (nombres confusos, duplicación, dependencias innecesarias).
El código limpio ataca la accidental. John Ousterhout, en *A Philosophy of Software Design*, define la complejidad como todo lo que hace difícil entender y modificar un sistema, y describe sus tres síntomas:
- **Amplificación del cambio:** una modificación simple exige tocar muchos lugares.
- **Carga cognitiva:** hay que tener demasiadas cosas en la cabeza para hacer un cambio.
- **Incógnitas desconocidas:** no es evidente qué hay que cambiar ni qué se puede romper. Es el peor de los tres.

## Nombres, con reglas concretas
Tim Ottinger escribió el capítulo de nombres de *Clean Code*. Sus reglas más útiles:
- Revela la intención: «diasDesdeIngreso» en vez de «d».
- Evita la desinformación: no llames «listaUnidades» a algo que es un Map.
- Haz distinciones con significado: «unidad1» y «unidad2» no dicen nada; «unidadOrigen» y «unidadDestino», sí.
- Usa nombres pronunciables y buscables: «MAX_DIAS_EN_PATIO» se encuentra con una búsqueda; el número 30 no.
- Clases con sustantivos («Revision»), funciones con verbos («registrarIngreso»), booleanos que respondan sí o no («estaRevisada»).
- Usa el vocabulario del negocio: si el patio dice "unidad" y "madrina", el código también.

## Comentarios: cuáles sí
| Útiles | Dañinos |
| el **porqué** de una decisión no obvia | repetir lo que el código ya dice |
| advertencias ("este cálculo lo exige SUNAT, no simplificar") | código comentado "por si acaso" |
| documentación de una API pública | comentarios desactualizados |
| un TODO con responsable y motivo | un diario de cambios (para eso está Git) |
Antes de escribir un comentario que explique **qué** hace un bloque, prueba extraer ese bloque en una función con un nombre que lo diga.

## Formato y disposición
Martin propone la metáfora del periódico: el titular arriba (las funciones de alto nivel), los detalles abajo, y cada función seguida de las que llama. Las líneas en blanco separan ideas, como los párrafos. Todo lo que es mecánico (sangría, comillas, punto y coma) debe resolverlo una herramienta como Prettier, y los errores probables, un linter como ESLint. Así las revisiones se concentran en lo que importa.

## La astucia sale cara
Brian Kernighan escribió en *The Elements of Programming Style* que depurar es dos veces más difícil que escribir el código, así que si lo escribes de la forma más ingeniosa posible, por definición no serás lo bastante listo para depurarlo. El código "elegante" de una línea que nadie entiende es deuda.
~~~js
// Ingenioso
const f = a => a.reduce((r, x) => (r[x.e] = (r[x.e] || 0) + (x.d > 30 ? x.d * 25 : x.d * 20), r), {});
// Claro
const TARIFA_NORMAL = 20, TARIFA_LARGA_ESTADIA = 25, DIAS_LARGA_ESTADIA = 30;
function cobroPorDias(dias) { return dias * (dias > DIAS_LARGA_ESTADIA ? TARIFA_LARGA_ESTADIA : TARIFA_NORMAL); }
function totalPorEstado(unidades) {
  const total = {};
  for (const u of unidades) total[u.e] = (total[u.e] || 0) + cobroPorDias(u.d);
  return total;
}
const datos = [{ e: 'lista', d: 10 }, { e: 'lista', d: 40 }, { e: 'pendiente', d: 5 }];
console.log(JSON.stringify(f(datos)) === JSON.stringify(totalPorEstado(datos)));
~~~

## Un equilibrio
Las reglas de *Clean Code* (funciones de pocas líneas, muchas clases pequeñas) han recibido críticas, entre ellas la de Ousterhout, porque llevadas al extremo fragmentan la lógica y obligan a saltar entre decenas de archivos. La pregunta que decide es siempre la misma: **¿esto es más fácil de entender y de cambiar para la próxima persona?**`,
  checks: [
    ['¿Qué diferencia hay entre complejidad esencial y accidental según Brooks?', 'La esencial viene del problema (no se puede eliminar); la accidental la agregamos con malas decisiones de diseño y de código, y sí se puede reducir.'],
    ['¿Cuáles son los tres síntomas de complejidad según Ousterhout y cuál es el peor?', 'Amplificación del cambio, carga cognitiva e incógnitas desconocidas. El peor es el último, porque no sabes qué debes cambiar ni qué puedes romper.'],
    ['¿Cuándo es útil un comentario?', 'Cuando explica el porqué de una decisión no evidente, advierte de consecuencias o documenta una API; no cuando repite lo que el código ya dice.'],
    ['¿Por qué conviene delegar el formato a herramientas como Prettier?', 'Porque elimina discusiones de estilo, mantiene la consistencia y deja que las revisiones se concentren en el diseño y la lógica.'],
    ['Reescribe mentalmente «if (u.d > 30)» para que sea autoexplicativo.', 'Con una constante con nombre y un nombre de campo claro: «if (unidad.diasEnPatio > DIAS_LARGA_ESTADIA)».']
  ],
  cites: ['Martin, R. C. (2008). *Clean Code*. Prentice Hall. Capítulos 1 a 5.', 'McConnell, S. (2004). *Code Complete* (2.ª ed.). Microsoft Press. Capítulo 5.', 'Brooks, F. P. (1986). No Silver Bullet: Essence and Accidents of Software Engineering. *Proceedings of IFIP*; reeditado en *IEEE Computer*, 20(4), 1987.', 'Ousterhout, J. (2018). *A Philosophy of Software Design*. Yaknyam Press. Capítulos 2 a 4.', 'Knuth, D. E. (1984). Literate Programming. *The Computer Journal*, 27(2).', 'Kernighan, B. y Plauger, P. J. (1978). *The Elements of Programming Style* (2.ª ed.). McGraw-Hill.'],
  project: { t: 'Limpieza de un archivo heredado',
    goal: 'Tomar un archivo difícil de leer y dejarlo claro sin cambiar lo que hace.',
    steps: ['Escribe (o toma de un proyecto antiguo) un archivo de unas 300 líneas con nombres crípticos, números mágicos y funciones largas.', 'Configura ESLint y Prettier y corrige lo automático.', 'Renombra variables y funciones con nombres que revelen intención.', 'Reemplaza números mágicos por constantes y extrae funciones hasta que cada una tenga un solo nivel de abstracción.', 'Pide a alguien que lea ambas versiones y mide cuánto tarda en explicar qué hace cada una.'],
    deliver: 'Las dos versiones del archivo, la configuración del linter y una tabla con los cambios aplicados y su motivo.' },
  hito: ['Configura ESLint y Prettier en PatioApp y corrige todas las advertencias.', 'Reemplaza los números mágicos por constantes con nombre y revisa los nombres de funciones y variables con las reglas de este tema.']
});

X('m6.refactor', {
  deep: `
## Definición precisa
Martin Fowler define la refactorización en *Refactoring* (1999; 2.ª ed. con ejemplos en JavaScript, 2018) como un cambio en la estructura interna del software para hacerlo más fácil de entender y más barato de modificar **sin cambiar su comportamiento observable**. La palabra tiene historia académica: William Opdyke la estudió en su tesis doctoral de 1992 en la Universidad de Illinois, dirigida por Ralph Johnson (uno de los cuatro autores de *Design Patterns*).

## Los dos sombreros
Kent Beck propuso una metáfora que Fowler adopta: mientras programas llevas uno de dos sombreros. Con el de **agregar funcionalidad**, escribes código y pruebas nuevas. Con el de **refactorizar**, no agregas nada: solo reorganizas, y las pruebas existentes deben seguir pasando. Puedes cambiar de sombrero cada pocos minutos, pero nunca llevar los dos a la vez. Por eso un commit de refactorización no debe incluir cambios de funcionalidad: si algo se rompe, sabrás cuál fue la causa.

## El catálogo
Fowler documenta cada refactorización con nombre, motivación y pasos mecánicos. Las que más usarás:
| Refactorización | Cuándo |
| Extraer función | un bloque necesita un comentario para entenderse |
| Renombrar variable o función | el nombre no dice lo que hace |
| Introducir objeto de parámetros | varios parámetros siempre viajan juntos |
| Reemplazar variable temporal por consulta | una variable guarda un cálculo que se puede pedir |
| Dividir en fases | una función mezcla "interpretar la entrada" con "calcular" |
| Mover función | una función usa más datos de otra clase que de la suya |
| Reemplazar condicional por polimorfismo | el mismo switch por tipo aparece en varios lugares |
| Encapsular variable | muchos lugares leen y escriben directamente un dato compartido |
Los entornos como VS Code automatizan las más comunes (renombrar, extraer, mover) de forma segura.

## Ejemplo: dividir en fases
~~~js
// Antes: interpreta texto y calcula a la vez
function cobro(linea) {
  const p = linea.split(';');
  const dias = Number(p[1]);
  let t = dias * 2000;
  if (p[2] === 'VIP') t = t * 0.8;
  return Math.round(t);
}
// Después: fase 1 interpreta, fase 2 calcula sobre datos limpios
function interpretar(linea) { const [placa, dias, tipo] = linea.split(';'); return { placa, dias: Number(dias), vip: tipo === 'VIP' }; }
function calcularCobro({ dias, vip }) { return Math.round(dias * 2000 * (vip ? 0.8 : 1)); }
const cobro2 = linea => calcularCobro(interpretar(linea));
console.log(cobro('ABC123;5;VIP'), cobro2('ABC123;5;VIP'));
~~~
La segunda versión permite probar el cálculo sin texto, y cambiar el formato de entrada sin tocar el cálculo.

## Los olores: origen del término
El capítulo de los **code smells** de *Refactoring* lo escribió Kent Beck junto a Fowler. Un olor no es un error: es una **señal** de que probablemente haya un problema de diseño. Además de los que viste, conviene reconocer: **cambio divergente** (una clase cambia por muchas razones distintas, lo opuesto a la cirugía de escopeta), **grupos de datos** (los mismos tres campos aparecen juntos en todas partes), **generalidad especulativa** (abstracciones para casos que nunca llegaron) y **cadenas de mensajes**.

## Deuda técnica
Ward Cunningham, creador de la primera wiki, introdujo la metáfora en un informe de la conferencia OOPSLA de 1992: entregar código no del todo pensado es como endeudarse; acelera hoy, pero cada día se pagan intereses (más tiempo por cada cambio) hasta que se refactoriza. Fowler propuso en 2009 un **cuadrante**:
| | Deliberada | Inadvertida |
| **Imprudente** | "no hay tiempo para diseñar" | "¿qué es una capa?" |
| **Prudente** | "lo lanzamos ya y lo arreglamos en el próximo sprint" | "ahora sabemos cómo debimos hacerlo" |
La deuda prudente y deliberada es una herramienta legítima de negocio, siempre que quede registrada y se pague.

## Refactorizar código sin pruebas
Michael Feathers define en *Working Effectively with Legacy Code* (2004) el código heredado como **código sin pruebas**. Para poder refactorizarlo, primero escribes **pruebas de caracterización**: no verifican lo que el código *debería* hacer, sino lo que *hace hoy*, aunque sea raro. Con esa red de seguridad, cada cambio que altere el comportamiento se detecta de inmediato. Lo profundizarás en el módulo de mantenimiento.

## Cuándo refactorizar
Fowler resume la regla de tres de Don Roberts: la primera vez simplemente lo haces; la segunda, haces una mueca por la duplicación pero la aceptas; la tercera, refactorizas. Y propone refactorizar **de forma continua**: antes de agregar una funcionalidad ("haz que el cambio sea fácil, luego haz el cambio fácil", como lo resume Kent Beck), al entender un código y al revisar el de otros. No se pide permiso para refactorizar, igual que no se pide permiso para escribir pruebas: es parte de programar bien.`,
  checks: [
    ['¿Qué significa "sin cambiar su comportamiento observable" en la definición de refactorizar?', 'Que para quien usa el código (personas, otros módulos, las pruebas) los resultados son idénticos; solo cambia la estructura interna.'],
    ['¿Por qué no se debe mezclar refactorización y nueva funcionalidad en un mismo commit?', 'Porque si algo se rompe no sabrás si fue la reorganización o la nueva función; separarlos permite revisar y revertir cada cosa por su cuenta.'],
    ['¿Qué es una prueba de caracterización y cuándo se usa?', 'Una prueba que fija el comportamiento actual del código, aunque sea extraño. Se usa antes de refactorizar código heredado sin pruebas.'],
    ['Clasifica en el cuadrante de Fowler: "sabemos que esto está mal diseñado, pero lo lanzamos para la feria y lo arreglamos la próxima semana".', 'Deuda prudente y deliberada: es consciente y tiene un plan de pago.'],
    ['¿Qué olor indica que una clase cambia por razones muy distintas y cuál es el olor opuesto?', 'Cambio divergente. Su opuesto es la cirugía de escopeta: un solo cambio obliga a tocar muchas clases.']
  ],
  cites: ['Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2.ª ed.). Addison-Wesley.', 'Opdyke, W. (1992). *Refactoring Object-Oriented Frameworks*. Tesis doctoral, University of Illinois at Urbana-Champaign.', 'Cunningham, W. (1992). The WyCash Portfolio Management System. *OOPSLA \'92 Experience Report*.', 'Feathers, M. (2004). *Working Effectively with Legacy Code*. Prentice Hall.', 'Fowler, M. (2009). TechnicalDebtQuadrant. martinfowler.com.'],
  project: { t: 'Kata de refactorización: la calculadora enredada',
    goal: 'Practicar el ciclo seguro de refactorización sobre un código difícil, con pruebas como red de seguridad.',
    steps: ['Escribe una función calcularLiquidacion de unas 120 líneas con if anidados por tipo de cliente, tipo de vehículo y días (o pídele a un compañero que la escriba).', 'Escribe pruebas de caracterización que cubran todos los caminos antes de tocar nada.', 'Aplica al menos seis refactorizaciones del catálogo, una por commit, ejecutando las pruebas en cada paso.', 'Cuando el código esté limpio, agrega una regla nueva y anota cuánto tardaste comparado con la versión original.', 'Escribe una lista de los olores que encontraste y la refactorización que aplicaste a cada uno.'],
    deliver: 'El historial de commits paso a paso, las pruebas y la lista de olores con sus remedios.' },
  hito: ['Escribe pruebas de caracterización del cálculo de cobros de PatioApp y refactorízalo en pasos pequeños, con un commit por refactorización.', 'Crea un archivo DEUDA.md que registre la deuda técnica conocida con su impacto, su tipo según el cuadrante de Fowler y el plan para pagarla.']
});

X('m6.errors', {
  deep: `
## Tres formas de comunicar un error
| Estrategia | Ejemplo | Ventaja | Riesgo |
| Códigos de error | C devuelve −1 y deja el detalle en «errno» | simple y explícita | es fácil ignorar el código |
| Excepciones | Java, JavaScript, Python | no se pueden ignorar en silencio; separan el camino feliz | el flujo se vuelve invisible |
| Errores como valores | Go devuelve «(valor, error)»; Rust usa «Result<T, E>» | el tipo obliga a tratar el error | código más verboso |
Rob Pike resumió la filosofía de Go en un artículo de 2015 con el título *Errors are values*: los errores son datos normales que se pueden guardar, combinar y programar. En JavaScript se puede imitar con un objeto resultado:
~~~js
function validarPlaca(t) {
  const p = String(t).trim().toUpperCase();
  return /^[A-Z0-9]{6}$/.test(p) ? { ok: true, valor: p } : { ok: false, error: 'La placa debe tener 6 letras o números' };
}
for (const t of [' abc123 ', 'AB-12']) {
  const r = validarPlaca(t);
  console.log(r.ok ? 'válida: ' + r.valor : 'error: ' + r.error);
}
~~~
Una regla práctica: usa valores de resultado para errores **esperados** (datos inválidos del usuario) y excepciones para situaciones **excepcionales** (un archivo de configuración que no existe, un error de programación).

## Errores con contexto
Desde ES2022, «Error» acepta una **causa**, que permite envolver un error de bajo nivel sin perder el original:
~~~js
class ErrorDeNegocio extends Error { constructor(msg, opciones) { super(msg, opciones); this.name = 'ErrorDeNegocio'; } }
function leerTarifa(json) {
  try { return JSON.parse(json).tarifa; }
  catch (e) { throw new ErrorDeNegocio('No se pudo leer la configuración de tarifas', { cause: e }); }
}
try { leerTarifa('{tarifa: 20'); } catch (e) { console.log(e.name + ': ' + e.message + ' | causa: ' + e.cause.message); }
~~~

## Fallar rápido o dejar que falle
James Shore defendió en *Fail Fast* (IEEE Software, 2004) que un sistema debe detenerse en cuanto detecta algo inválido, cerca de la causa, en lugar de seguir con datos corruptos. Joe Armstrong, creador de Erlang, llevó la idea a sistemas que no pueden detenerse: en su tesis de 2003 describe la filosofía **"déjalo caer"** (*let it crash*): cada proceso pequeño falla sin intentar arreglarse y un **supervisor** lo reinicia en un estado limpio. Así funcionan centrales telefónicas con disponibilidad altísima.

## Lecciones de fallas reales
- **Therac-25** (1985–1987): una máquina de radioterapia administró sobredosis masivas por una condición de carrera en el software, y la pantalla solo mostraba mensajes crípticos como "MALFUNCTION 54" que los operadores aprendieron a ignorar. Nancy Leveson y Clark Turner analizaron el caso en 1993; es lectura obligada sobre el costo humano de los errores mal comunicados.
- **Knight Capital** (2012): un despliegue incompleto reactivó código antiguo en un servidor, y la empresa perdió unos 440 millones de dólares en 45 minutos. El error no fue de lógica sino de operación y de código muerto que nadie había borrado.

## Depurar con método científico
Andreas Zeller, en *Why Programs Fail* (2009), describe la depuración como un experimento: observar, formular una hipótesis, predecir, experimentar y concluir. David Agans resume la práctica en *Debugging: The 9 Indispensable Rules* (2002):
1. Entiende el sistema.
2. Haz que falle.
3. Deja de pensar y mira (observa los datos reales).
4. Divide y vencerás.
5. Cambia una sola cosa a la vez.
6. Lleva un registro de lo que probaste.
7. Revisa lo obvio ("¿está enchufado?").
8. Busca una mirada fresca.
9. Si no lo arreglaste, no está arreglado.
«git bisect» aplica la regla 4 sobre el historial: es una búsqueda binaria entre un commit bueno y uno malo, que encuentra al culpable entre 1000 commits en unos 10 pasos.

## Reintentos responsables
Reintentar solo sirve para errores **transitorios** (red lenta, servicio saturado). Para no empeorar una sobrecarga, se espera cada vez más (**espera exponencial**) y se agrega un componente aleatorio (**jitter**) para que miles de clientes no reintenten a la vez. Marc Brooker, de AWS, mostró en 2015 con simulaciones que el jitter reduce mucho la carga sobre el servicio que se recupera.
~~~js
function esperaConJitter(intento, baseMs = 100, maxMs = 10000) {
  const tope = Math.min(maxMs, baseMs * 2 ** intento);
  return Math.floor(Math.random() * tope);    // "full jitter"
}
console.log([0, 1, 2, 3, 4, 5].map(i => esperaConJitter(i)));
~~~

## Registrar bien
Un buen registro (log) dice **cuándo**, **dónde**, **qué** y **con qué datos** ocurrió algo, en un formato que una máquina pueda buscar (JSON). Usa niveles (debug, info, warn, error) y nunca registres contraseñas, tokens ni datos personales sensibles; lo verás en observabilidad y en seguridad.`,
  checks: [
    ['¿Cuándo conviene devolver un resultado {ok, error} en lugar de lanzar una excepción?', 'Para errores esperados que forman parte del flujo normal, como datos inválidos del usuario; las excepciones quedan para situaciones realmente excepcionales o errores de programación.'],
    ['¿Para qué sirve la opción «cause» al crear un Error?', 'Para envolver un error de bajo nivel en uno con un mensaje de más alto nivel sin perder la información del error original.'],
    ['¿Qué lección deja el caso Therac-25 sobre los mensajes de error?', 'Que los mensajes crípticos se terminan ignorando; un error debe explicar qué pasó y qué hacer, sobre todo en sistemas críticos.'],
    ['Entre el commit 1 (funciona) y el 1024 (falla), ¿cuántos pasos necesita como máximo git bisect?', 'Unos 10, porque cada paso descarta la mitad (log₂ 1024 = 10).'],
    ['¿Por qué agregar jitter a los reintentos?', 'Para que muchos clientes no reintenten exactamente al mismo tiempo y vuelvan a saturar el servicio que se está recuperando.']
  ],
  cites: ['Zeller, A. (2009). *Why Programs Fail: A Guide to Systematic Debugging* (2.ª ed.). Morgan Kaufmann.', 'Agans, D. (2002). *Debugging: The 9 Indispensable Rules for Finding Even the Most Elusive Software and Hardware Problems*. AMACOM.', 'Shore, J. (2004). Fail Fast. *IEEE Software*, 21(5).', 'Armstrong, J. (2003). *Making reliable distributed systems in the presence of software errors*. Tesis doctoral, KTH Estocolmo.', 'Leveson, N. y Turner, C. (1993). An Investigation of the Therac-25 Accidents. *IEEE Computer*, 26(7).'],
  project: { t: 'Capa de errores y caza de un bug',
    goal: 'Diseñar una política de manejo de errores completa y practicar la depuración sistemática.',
    steps: ['Define clases de error propias para validación, recurso no encontrado, regla de negocio y servicio externo.', 'Valida todas las entradas en las fronteras y devuelve resultados {ok, error} para los errores esperados.', 'Implementa un manejador central que muestre al usuario un mensaje claro y registre en JSON los detalles técnicos.', 'Implementa reintentos con espera exponencial y jitter para un servicio simulado que falla 30% de las veces.', 'Pide a un compañero que introduzca un bug en algún commit de tu historial y encuéntralo con git bisect, documentando cada hipótesis.'],
    deliver: 'El módulo de errores, sus pruebas, un ejemplo de registro y la bitácora de depuración.' },
  hito: ['Agrega a PatioApp clases de error propias (validación, no encontrado, regla de negocio) y un manejador central que muestre mensajes útiles al operador y registre los detalles técnicos.', 'Agrega reintentos con espera exponencial y jitter al servicio externo de consulta de placas.']
});

X('m6.func', {
  deep: `
## Raíces matemáticas
La programación funcional viene del **cálculo lambda**, un sistema formal de Alonzo Church (1936) donde todo es una función. John McCarthy lo llevó a la práctica con **Lisp** (1958), el segundo lenguaje de alto nivel más antiguo aún en uso. En 1977, John Backus, creador de Fortran, dedicó su conferencia del Premio Turing a la pregunta *Can Programming Be Liberated from the von Neumann Style?*, criticando que los lenguajes imperativos piensen "palabra por palabra" en la memoria en lugar de en transformaciones completas.

## Por qué importa: modularidad
John Hughes escribió en 1989 *Why Functional Programming Matters*. Su argumento no es que evitar asignaciones sea bueno en sí, sino que las funciones de orden superior y la evaluación perezosa son **nuevas formas de pegar** piezas de un programa, y que más formas de pegar significan más modularidad. Un «map» separa el recorrido de la transformación; un «filter», el recorrido del criterio.

## Composición, pipe y aplicación parcial
~~~js
const pipe = (...fs) => x => fs.reduce((v, f) => f(v), x);
const filtrar = pred => lista => lista.filter(pred);       // currificada
const mapear = f => lista => lista.map(f);
const sumar = lista => lista.reduce((a, b) => a + b, 0);
const cobroTotalListas = pipe(
  filtrar(u => u.estado === 'lista'),
  mapear(u => u.dias * 2000),
  sumar
);
console.log(cobroTotalListas([{ estado: 'lista', dias: 3 }, { estado: 'pendiente', dias: 9 }, { estado: 'lista', dias: 1 }]));
~~~
El **currying** debe su nombre al lógico Haskell Curry (la idea aparece antes en Moses Schönfinkel): convertir f(a, b) en f(a)(b). Permite fijar algunos argumentos y obtener una función especializada, lista para componer.

## Inmutabilidad sin copiar todo
Copiar una estructura completa en cada cambio sería lento. Las **estructuras de datos persistentes** comparten las partes que no cambian: al modificar un elemento de un árbol solo se crean nuevos los nodos del camino hasta la raíz, y el resto se reutiliza. Chris Okasaki las estudió en *Purely Functional Data Structures* (1998). Lenguajes como Clojure y librerías como Immutable.js las usan; en JavaScript cotidiano, la propagación «{ ...obj, campo: nuevo }» es suficiente para la mayoría de los casos.
~~~js
const estado = { unidades: { ABC123: { km: 100 }, XYZ789: { km: 500 } }, version: 1 };
const nuevo = { ...estado, unidades: { ...estado.unidades, ABC123: { ...estado.unidades.ABC123, km: 150 } }, version: 2 };
console.log(estado.unidades.ABC123.km, nuevo.unidades.ABC123.km);
console.log(estado.unidades.XYZ789 === nuevo.unidades.XYZ789);   // se comparte lo que no cambió
~~~

## Evaluación perezosa
Una expresión perezosa solo se calcula cuando se necesita. Haskell es perezoso por defecto; en JavaScript, los generadores permiten trabajar con secuencias potencialmente infinitas tomando solo lo necesario:
~~~js
function* naturales() { let n = 1; while (true) yield n++; }
function* tomar(n, it) { for (const x of it) { if (n-- <= 0) return; yield x; } }
function* filtrarG(p, it) { for (const x of it) if (p(x)) yield x; }
console.log([...tomar(5, filtrarG(n => n % 7 === 0, naturales()))]);
~~~

## Ausencia y error como tipos
Los lenguajes funcionales evitan «null» con tipos como **Option/Maybe** (hay valor o no lo hay) y **Result/Either** (éxito o error). Como el tipo obliga a considerar ambos casos, el "error de mil millones de dólares" desaparece. Rust, Swift, Kotlin y Scala adoptaron estas ideas.

## Núcleo funcional, cáscara imperativa
Gary Bernhardt popularizó en 2012 (charla *Boundaries*) una arquitectura simple: un **núcleo funcional** con todas las decisiones, hecho de funciones puras y datos inmutables, rodeado de una **cáscara imperativa** delgada que lee entradas, llama al núcleo y ejecuta los efectos. El núcleo se prueba con miles de casos en milisegundos; la cáscara, con pocas pruebas de integración. React aplica la misma idea a las interfaces: la vista es una función del estado.

## De los lenguajes a los sistemas
Las ideas funcionales escalaron a sistemas distribuidos: el modelo **MapReduce** de Google (Dean y Ghemawat, 2004) procesa petabytes dividiendo el trabajo en un «map» paralelo y un «reduce» que combina, nombres tomados directamente de la programación funcional. Spark, las transformaciones de flujos de eventos y los *pipelines* de datos siguen el mismo patrón.`,
  checks: [
    ['Según Hughes, ¿por qué importa la programación funcional?', 'Porque las funciones de orden superior y la evaluación perezosa son nuevas formas de "pegar" piezas, y eso mejora la modularidad.'],
    ['Convierte «sumar(a, b)» en una versión currificada y explica para qué sirve.', 'const sumar = a => b => a + b. Permite crear funciones especializadas fijando argumentos, como const sumar10 = sumar(10), y componerlas.'],
    ['¿Cómo evita una estructura persistente copiar todo en cada cambio?', 'Compartiendo las partes que no cambian; solo se crean copias de los nodos del camino modificado.'],
    ['¿Qué ventaja tiene la arquitectura de núcleo funcional y cáscara imperativa?', 'Las decisiones quedan en funciones puras que se prueban rápido y sin preparar nada; los efectos se concentran en una capa delgada con pocas pruebas de integración.'],
    ['¿Qué relación hay entre MapReduce y la programación funcional?', 'MapReduce toma las operaciones map y reduce de la programación funcional; como map no tiene efectos, puede ejecutarse en paralelo en miles de máquinas.']
  ],
  cites: ['Church, A. (1936). An Unsolvable Problem of Elementary Number Theory. *American Journal of Mathematics*, 58(2).', 'Backus, J. (1978). Can Programming Be Liberated from the von Neumann Style? *Communications of the ACM*, 21(8).', 'Hughes, J. (1989). Why Functional Programming Matters. *The Computer Journal*, 32(2).', 'Okasaki, C. (1998). *Purely Functional Data Structures*. Cambridge University Press.', 'Dean, J. y Ghemawat, S. (2004). MapReduce: Simplified Data Processing on Large Clusters. *OSDI 2004*.'],
  project: { t: 'Pipeline funcional de datos del patio',
    goal: 'Construir el procesamiento de reportes como composición de funciones puras sobre datos inmutables.',
    steps: ['Implementa pipe, compose y versiones currificadas de map, filter, groupBy y sortBy.', 'Escribe un reporte mensual (ingresos por marca, promedio de días, cobro total) como una sola composición legible.', 'Garantiza la inmutabilidad: congela los datos de entrada con Object.freeze en las pruebas y comprueba que nada falla.', 'Implementa un tipo Resultado con map y flatMap y úsalo para validar un lote de registros acumulando todos los errores.', 'Procesa un archivo enorme de forma perezosa con generadores, sin cargarlo entero en memoria.'],
    deliver: 'La librería funcional mínima, el reporte, las pruebas con datos congelados y una medición de memoria del procesamiento perezoso.' },
  hito: ['Reescribe los reportes de PatioApp como un pipeline de funciones puras compuestas con pipe, sin mutar los datos de entrada.', 'Usa un tipo Resultado en las validaciones de registros en lugar de lanzar excepciones para los errores esperados.']
});
})();
