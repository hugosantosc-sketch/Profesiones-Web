(function () {
var M = SDC.M, S = SDC.S;
M('plat', { title: 'Plataformas: móvil, embebidos y computación paralela',
  desc: 'El software corre en muchos lugares además de un servidor y un navegador: teléfonos con batería y conexión intermitente, microcontroladores que deben responder a tiempo, y procesadores con muchos núcleos y GPU. Cada plataforma impone sus propias reglas de ingeniería.',
  thread: 'PatioApp sale del escritorio: una app móvil que funciona sin conexión en el patio, un sensor embebido que detecta la entrada de vehículos y un procesamiento paralelo de los reportes e imágenes que acelera las tareas pesadas.',
  books: '*Introduction to Embedded Systems: A Cyber-Physical Systems Approach* (Lee y Seshia), *Programming Massively Parallel Processors* (Kirk, Hwu y El Hajj), *The Art of Multiprocessor Programming* (Herlihy y Shavit), *Human Interface Guidelines* (Apple), *Material Design* (Google).',
  uni: 'Áreas de computación paralela y distribuida, sistemas embebidos y desarrollo para plataformas específicas de ACM/IEEE CS2023; Stanford CS193p (iOS) y CS149 (paralelismo); CMU 15-418; Berkeley EECS 149 (embebidos) y CS 267; MIT 6.172 (*Performance Engineering*). En Perú: Desarrollo de Aplicaciones Móviles, Sistemas Embebidos, Internet de las Cosas y Computación Paralela (UNI, PUCP, UTEC, UPC, UNMSM).',
  capstone: { t: 'PatioApp en todas las plataformas',
    goal: 'Llevar PatioApp al teléfono, al sensor y al procesamiento paralelo respetando las restricciones de cada plataforma.',
    steps: ['Construye la app móvil de inspección de vehículos con almacenamiento local, cola de sincronización y resolución de conflictos.', 'Diseña el sensor de entrada del patio: lectura del ADC, interrupciones, presupuesto de energía y planificación de tareas con verificación de Liu y Layland.', 'Paraleliza la generación de reportes o el procesamiento de fotos y mide aceleración y eficiencia con 1, 2, 4 y 8 hilos.', 'Prueba la app en varios tamaños de pantalla y en modo avión, y el sensor con fallas simuladas.', 'Documenta las decisiones de plataforma en ADR.'],
    deliver: 'El código de la app, el diseño y simulación del sensor, el informe de rendimiento paralelo y los ADR.' } });

S('plat', 'plat.mobile', { title: 'Desarrollo de aplicaciones móviles',
  ask: '¿Qué concepto de desarrollo móvil se aplica?',
  lesson: `
> **La idea en simple.** Un teléfono no es una computadora pequeña: tiene batería limitada, conexión que va y viene, pantallas de todos los tamaños, un sistema operativo que puede cerrar tu app cuando quiera y una tienda que revisa cada versión. Diseñar para el móvil es diseñar para esas restricciones.

## Las plataformas y cómo programarlas
Dos sistemas operativos dominan: **Android**, de Google, mayoritario en América Latina incluido el Perú, y **iOS**, de Apple, muy fuerte en Estados Unidos y en segmentos de mayor poder adquisitivo. Las opciones para construir una app:
| Enfoque | Tecnologías | Ventajas | Costos |
| Nativo | Swift y SwiftUI en iOS; Kotlin y Jetpack Compose en Android | máximo rendimiento y acceso a todo el sistema | dos bases de código |
| Multiplataforma | Flutter (Google), React Native (Meta), Kotlin Multiplatform | una base de código compartida | capa extra; funciones nuevas tardan en llegar |
| Web progresiva (PWA) | HTML, CSS y JavaScript con *service workers* | sin tienda, se actualiza al instante | acceso limitado al hardware, sobre todo en iOS |
El término PWA lo propusieron Alex Russell y Frances Berriman en 2015. La elección depende del equipo, del presupuesto y de cuánto necesites del hardware; no hay una respuesta universal.

## El ciclo de vida de una app
El sistema operativo gestiona la memoria de forma agresiva: si el usuario cambia de app, la tuya puede pasar a segundo plano y luego ser **terminada** sin aviso. En Android, una actividad pasa por estados como «onCreate», «onStart», «onResume», «onPause», «onStop» y «onDestroy»; en iOS, las escenas pasan por activo, inactivo, en segundo plano y suspendido. Consecuencias:
- Guarda el estado importante (un formulario a medio llenar) cuando la app pasa a segundo plano.
- Restaura ese estado al volver, como si nada hubiera pasado.
- No hagas trabajo pesado en segundo plano sin usar las API del sistema para eso, o el sistema lo cortará.

## Restricciones que cambian el diseño
- **Batería:** la radio celular, el GPS y la pantalla son los grandes consumidores. Agrupar peticiones de red, evitar sondeos frecuentes y usar notificaciones *push* en lugar de preguntar cada minuto.
- **Red:** latencia alta, pérdidas y cambios entre wifi y datos móviles. Toda petición necesita tiempo de espera, reintentos con espera exponencial y una interfaz que diga qué pasa.
- **Fluidez:** con pantallas de 60 Hz hay unos 16.7 ms para dibujar cada cuadro (1000 / 60). El trabajo pesado nunca va en el hilo principal de la interfaz.
- **Pantallas y densidades:** se diseña en unidades independientes de la densidad. En Android, px = dp × (dpi / 160); en iOS se usan puntos. Las guías piden objetivos táctiles de al menos 44 × 44 puntos (Apple) o 48 × 48 dp (Material Design).
- **Permisos:** cámara, ubicación y notificaciones se piden en el momento en que se necesitan, explicando por qué.

## Primero sin conexión
En un patio de vehículos la señal puede ser mala. El enfoque **offline-first** hace que la app funcione siempre con datos locales y sincronice cuando puede:
1. Cada acción se guarda en una base local (SQLite, Room, Core Data) y en una **cola de sincronización**.
2. Cuando hay conexión, la cola se envía en orden con claves de idempotencia, para que un reintento no duplique registros.
3. Los **conflictos** (dos personas editaron la misma unidad sin conexión) se resuelven con una política: el último que escribe gana (según la marca de tiempo), fusionar campos, o pedir al usuario que decida.
Marc Shapiro y sus coautores formalizaron en 2011 los **CRDT** (tipos de datos replicados sin conflictos), estructuras que se fusionan siempre de forma consistente; Martin Kleppmann y el laboratorio Ink & Switch propusieron en 2019 el **software local-first**, que lleva esta idea al centro del diseño.
~~~js
// Cola de sincronización con "el último que escribe gana"
const local = [{ id: 'U1', estado: 'inspeccionado', ts: 1700000300 }, { id: 'U2', estado: 'liberado', ts: 1700000100 }];
const servidor = { U1: { estado: 'en patio', ts: 1700000200 }, U2: { estado: 'en patio', ts: 1700000400 } };
for (const c of local) {
  const s = servidor[c.id];
  const gana = !s || c.ts > s.ts ? 'local' : 'servidor';
  if (gana === 'local') servidor[c.id] = { estado: c.estado, ts: c.ts };
  console.log(c.id, 'conflicto resuelto a favor de', gana, '→', servidor[c.id].estado);
}
~~~

## Distribución y versiones antiguas
Una app móvil no se actualiza al instante como una web: pasa por la revisión de la tienda y cada usuario actualiza cuando quiere. Por eso:
- La API del servidor debe seguir sirviendo a versiones viejas de la app durante meses (la ley de Hyrum y el versionado de API importan aún más).
- Se usan **lanzamientos escalonados** (primero al 1% de los usuarios, luego más) y banderas de funcionalidad remotas.
- Se reserva un mecanismo de **actualización obligatoria** para fallas graves de seguridad.

## Calidad y seguridad
La **fragmentación** (miles de modelos de Android con distintas versiones y pantallas) exige probar en emuladores y en granjas de dispositivos reales. La fundación OWASP publica el estándar **MASVS** para la seguridad de apps móviles: no guardar secretos en la app (se pueden extraer), cifrar los datos locales sensibles, validar certificados en las conexiones y no confiar nunca en el cliente: toda regla de negocio importante se valida también en el servidor.

## Ejemplo resuelto: la app de inspección de PatioApp
Requisitos: el inspector fotografía la unidad, marca daños y registra el estado, muchas veces sin señal. Decisiones: Flutter para compartir código entre Android (la mayoría de los equipos del cliente) y iOS; base local con cola de sincronización; las fotos se comprimen en el teléfono y se suben en segundo plano solo con wifi o con batería mayor al 20%; conflictos de estado resueltos por el último que escribe gana, salvo el estado "liberado", que siempre prevalece y genera una alerta; objetivos táctiles de 48 dp porque los inspectores usan guantes; el formulario a medio llenar se guarda al pasar a segundo plano.`,
  links: [['hci.usab', 'las guías de usabilidad orientan el diseño de interfaces móviles'], ['man.release', 'las versiones antiguas de la app exigen compatibilidad y obsolescencia ordenada'], ['m13.dist', 'la sincronización sin conexión es un problema de sistemas distribuidos']],
  read: 'Apple, *Human Interface Guidelines*; Google, *Material Design 3*; Kleppmann y otros (2019); OWASP MASVS; apuntes de Stanford CS193p.',
  terms: [
    ['App nativa', 'aplicación escrita con las herramientas propias de cada sistema operativo', ['Swift y SwiftUI en iOS.', 'Kotlin y Jetpack Compose en Android.', 'Ofrece acceso completo al hardware.']],
    ['Framework multiplataforma', 'herramienta que permite escribir una app una vez y ejecutarla en varios sistemas operativos', ['Flutter compila a código nativo de ambos sistemas.', 'React Native usa JavaScript.', 'Reduce el código duplicado.']],
    ['Aplicación web progresiva', 'aplicación web que se instala y funciona sin conexión gracias a service workers', ['Se actualiza sin pasar por la tienda.', 'Russell y Berriman acuñaron el término en 2015.', 'Tiene acceso limitado al hardware.']],
    ['Ciclo de vida de la app', 'secuencia de estados por los que el sistema hace pasar a una aplicación, que puede incluir su terminación', ['Android llama a onPause al salir de primer plano.', 'La app puede ser terminada en segundo plano.', 'Hay que guardar y restaurar el estado.']],
    ['Offline-first', 'enfoque en que la app trabaja con datos locales y sincroniza con el servidor cuando hay conexión', ['El inspector registra daños sin señal.', 'Una cola envía los cambios al recuperar la red.', 'Exige una política de conflictos.']],
    ['El último que escribe gana', 'política de conflictos que conserva el cambio con la marca de tiempo más reciente', ['Dos ediciones sin conexión: gana la más reciente.', 'Es simple pero puede perder datos.', 'Depende de relojes razonablemente sincronizados.']],
    ['CRDT', 'tipo de dato replicado que se fusiona siempre sin conflictos y de forma consistente', ['Un contador que cada réplica incrementa por separado.', 'Shapiro y otros lo formalizaron en 2011.', 'Se usa en editores colaborativos.']],
    ['Lanzamiento escalonado', 'publicación gradual de una versión a porcentajes crecientes de usuarios', ['Primero el 1%, luego el 10% y luego todos.', 'Permite detener una versión con errores.', 'Las tiendas de apps lo ofrecen.']]
  ],
  q: [
    ['¿Por qué una app móvil debe guardar el formulario a medio llenar al pasar a segundo plano?', 'Porque el sistema puede terminarla sin aviso para liberar memoria', ['Porque la batería se agota', 'Porque la tienda lo exige', 'Porque el servidor lo borra'], 'El ciclo de vida incluye la terminación del proceso.', 2],
    ['Con una pantalla de 60 Hz, ¿cuánto tiempo hay aproximadamente para dibujar cada cuadro?', '16.7 ms', ['60 ms', '1 ms', '100 ms'], '1000 / 60.', 2],
    ['En Android, ¿cuántos píxeles mide un botón de 48 dp en una pantalla de 480 dpi?', '144', ['48', '96', '480'], '48 × 480/160 = 144.', 2],
    ['¿Qué enfoque permite publicar cambios sin pasar por la revisión de la tienda?', 'Una aplicación web progresiva', ['Una app nativa', 'Flutter', 'Kotlin Multiplatform'], 'Se sirve desde la web como cualquier sitio.', 2],
    ['¿Por qué el servidor debe seguir soportando versiones antiguas de la API?', 'Porque muchos usuarios no actualizan la app de inmediato', ['Porque es más barato', 'Porque las tiendas lo prohíben', 'Porque las API no cambian'], 'Las versiones viejas conviven por meses.', 3],
    ['¿Qué se debe usar para que un reintento de la cola de sincronización no duplique registros?', 'Claves de idempotencia', ['Más hilos', 'Un CRDT de texto', 'Notificaciones push'], 'El servidor reconoce la misma operación repetida.', 3],
    { tf: 'Guardar una clave secreta de una API dentro del código de la app móvil es seguro porque se compila.', v: false, e: 'Los binarios se pueden analizar y extraer; los secretos deben quedarse en el servidor.', l: 2 },
    { tf: 'Las guías de Material Design recomiendan objetivos táctiles de al menos 48 × 48 dp.', v: true, e: 'Apple recomienda 44 × 44 puntos.', l: 1 },
    { c: 'Escribe «pxDesdeDp(dp, dpi)» con la conversión de Android px = dp × dpi / 160.', f: 'pxDesdeDp', p: ['dp', 'dpi'], t: [[[16, 160], 16], [[16, 480], 48], [[48, 320], 96]], sol: '  return dp * dpi / 160;', l: 1 },
    { c: 'Escribe «resolverLWW(local, remoto)»: cada uno es {valor, ts}; devuelve el valor con mayor ts y, si empatan, el remoto.', f: 'resolverLWW', p: ['local', 'remoto'], t: [[[{ valor: 'a', ts: 5 }, { valor: 'b', ts: 3 }], 'a'], [[{ valor: 'a', ts: 1 }, { valor: 'b', ts: 9 }], 'b'], [[{ valor: 'a', ts: 4 }, { valor: 'b', ts: 4 }], 'b']], sol: '  return local.ts > remoto.ts ? local.valor : remoto.valor;', l: 2 },
    { c: 'Escribe «sincronizar(servidor, cola)»: servidor es un objeto {id: {estado, ts}} y cola una lista de cambios {id, estado, ts}; aplica cada cambio solo si es más reciente que lo del servidor (o si el id no existe) y devuelve cuántos cambios se aplicaron.', f: 'sincronizar', p: ['servidor', 'cola'], t: [[[{ U1: { estado: 'a', ts: 2 } }, [{ id: 'U1', estado: 'b', ts: 3 }, { id: 'U2', estado: 'c', ts: 1 }]], 2], [[{ U1: { estado: 'a', ts: 9 } }, [{ id: 'U1', estado: 'b', ts: 3 }]], 0], [[{}, []], 0]], sol: '  let n = 0;\n  for (const c of cola) { const s = servidor[c.id]; if (!s || c.ts > s.ts) { servidor[c.id] = { estado: c.estado, ts: c.ts }; n++; } }\n  return n;', l: 3 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var dp = R.pick([16, 24, 32, 44, 48, 56, 64]), dpi = R.pick([120, 160, 240, 320, 480, 640]); g.input(2, '¿Cuántos píxeles mide un elemento de ' + dp + ' dp en una pantalla de ' + dpi + ' dpi?', dp * dpi / 160, dp + ' × ' + dpi + '/160.'); });
    g.times(5, function (R) { var hz = R.pick([30, 60, 90, 120, 144]); g.input(2, '¿Cuántos milisegundos hay para dibujar cada cuadro a ' + hz + ' Hz? Redondea a 1 decimal.', (1000 / hz).toFixed(1), '1000 / ' + hz + '.'); });
    var enf = [['Necesitas acceso intensivo a la cámara, Bluetooth y sensores con el mejor rendimiento posible', 'Nativo'], ['Un equipo pequeño debe lanzar en Android e iOS con una sola base de código', 'Multiplataforma'], ['Quieres que los cambios lleguen al instante sin revisión de la tienda y basta con funciones web', 'Aplicación web progresiva']];
    enf.forEach(function (e) { g.mcq(3, '¿Qué enfoque conviene? ' + e[0], e[1], ['Nativo', 'Multiplataforma', 'Aplicación web progresiva', 'Aplicación de escritorio'].filter(function (x) { return x !== e[1]; }), 'Cada enfoque intercambia rendimiento, alcance y costo.'); });
    g.times(6, function (R) { var t1 = R.int(100, 900), t2 = R.int(100, 900); while (t1 === t2) t2++; g.mcq(2, 'Sin conexión, el teléfono cambió el estado con marca de tiempo ' + t1 + ' y el servidor tiene uno con marca ' + t2 + '. Con "el último que escribe gana", ¿qué valor queda?', t1 > t2 ? 'El del teléfono' : 'El del servidor', [t1 > t2 ? 'El del servidor' : 'El del teléfono', 'Ambos', 'Ninguno'], 'Gana la marca de tiempo mayor.'); });
  },
  checks: [
    ['Nombra tres restricciones del móvil que no existen en un servidor y cómo afectan el diseño.', 'Batería (agrupar red, evitar sondeos), conexión intermitente (offline-first, reintentos) y terminación por el sistema (guardar y restaurar estado).'],
    ['¿Qué ventajas y costos tiene Flutter frente a escribir dos apps nativas?', 'Una sola base de código y menos esfuerzo; a cambio, una capa extra y un acceso más tardío a funciones nuevas del sistema.'],
    ['Describe cómo funciona una cola de sincronización offline-first.', 'Cada acción se guarda localmente y en una cola; al haber conexión se envía en orden con claves de idempotencia y los conflictos se resuelven con una política definida.'],
    ['¿Por qué las apps móviles complican la evolución de la API del servidor?', 'Porque las versiones antiguas siguen en uso durante meses y el servidor debe seguir atendiéndolas.'],
    ['¿Qué recomienda OWASP MASVS sobre los secretos y las reglas de negocio?', 'No guardar secretos en la app y validar siempre en el servidor, porque el cliente puede ser manipulado.']
  ],
  cites: ['Apple. *Human Interface Guidelines*. developer.apple.com.', 'Google. *Material Design 3*. m3.material.io.', 'Shapiro, M., Preguiça, N., Baquero, C. y Zawirski, M. (2011). Conflict-Free Replicated Data Types. *SSS 2011*.', 'Kleppmann, M., Wiggins, A., van Hardenberg, P. y McGranaghan, M. (2019). Local-First Software: You Own Your Data, in Spite of the Cloud. *Onward! 2019*.', 'OWASP. *Mobile Application Security Verification Standard (MASVS)*.', 'Russell, A. (2015). Progressive Web Apps: Escaping Tabs Without Losing Our Soul. infrequently.org.'],
  project: { t: 'App móvil que funciona sin conexión',
    goal: 'Construir una app móvil real que sobreviva a la mala señal, al cierre del sistema y a pantallas variadas.',
    steps: ['Elige un enfoque (nativo, multiplataforma o PWA) y justifícalo en un ADR.', 'Implementa una pantalla de registro con base local y cola de sincronización hacia una API sencilla.', 'Define y prueba la política de conflictos con dos dispositivos editando sin conexión.', 'Guarda y restaura el estado al pasar a segundo plano y verifica que sobrevive a la terminación del proceso.', 'Prueba en al menos tres tamaños de pantalla, con objetivos táctiles de 48 dp y en modo avión.'],
    deliver: 'El repositorio, el ADR, un video corto de las pruebas sin conexión y la lista de verificación de calidad.' },
  hito: ['Construye la app móvil de inspección de PatioApp con base local y cola de sincronización que funcione en modo avión.', 'Implementa la política de conflictos de PatioApp móvil, guarda el estado ante la terminación del proceso y prueba en tres tamaños de pantalla.']
});

S('plat', 'plat.embedded', { title: 'Sistemas embebidos y de tiempo real',
  ask: '¿Qué concepto de sistemas embebidos o de tiempo real se aplica?',
  lesson: `
> **La idea en simple.** Hay computadoras dentro de autos, marcapasos, lavadoras, semáforos y sensores de un patio. No tienen pantalla ni teclado, funcionan con muy poca memoria y energía, y muchas deben responder siempre a tiempo: en un freno, una respuesta correcta pero tardía es una respuesta incorrecta.

## Sistemas embebidos y ciberfísicos
Un **sistema embebido** es una computadora dedicada a una función dentro de un sistema mayor. Edward Lee y Sanjit Seshia, de Berkeley, prefieren hablar de **sistemas ciberfísicos** en *Introduction to Embedded Systems* (2011; 2.ª ed., 2017): la integración de cómputo con procesos físicos, en la que el software mide el mundo con **sensores**, decide y actúa sobre él con **actuadores**, en un ciclo continuo. El tiempo físico es parte de la corrección del programa, algo que los lenguajes de programación comunes no expresan.

## El hardware típico
Un **microcontrolador** reúne en un chip un procesador, memoria RAM de unos pocos kilobytes, memoria flash para el programa y periféricos: temporizadores, puertos de comunicación (UART, I²C, SPI) y conversores. Ejemplos conocidos: la familia ARM Cortex-M, el ESP32 con wifi y los AVR de las placas Arduino.
- **Conversor analógico-digital (ADC):** convierte un voltaje en un número. Un ADC de n bits distingue 2ⁿ niveles; con 10 bits y referencia de 3.3 V, cada paso vale 3.3 / 1023 ≈ 3.2 mV.
- **PWM** (modulación por ancho de pulso): enciende y apaga una salida muy rápido para simular un nivel intermedio, por ejemplo para regular la velocidad de un motor.
- **Interrupciones:** el hardware avisa al procesador cuando ocurre un evento (llegó un pulso del sensor), en lugar de que el programa pregunte constantemente (**sondeo**). Las rutinas de interrupción deben ser muy cortas.
- **Temporizador perro guardián** (*watchdog*): si el programa no lo "alimenta" periódicamente, reinicia el sistema. Es la última defensa ante un bloqueo.

## Tiempo real
Un sistema es de **tiempo real** cuando su corrección depende también de cuándo entrega el resultado:
- **Duro:** perder un plazo es una falla grave (control de frenos, marcapasos).
- **Firme:** un resultado tardío no sirve, pero perder alguno ocasionalmente se tolera (un cuadro de video).
- **Blando:** un retraso degrada la calidad, sin ser una falla (una interfaz).
Para garantizar plazos se necesita conocer el **tiempo de ejecución en el peor caso** (WCET) de cada tarea, no el promedio.

## Planificación de tareas periódicas
Chung Laung Liu y James Layland publicaron en 1973 el resultado fundamental. Con tareas periódicas independientes, cada una con tiempo de cómputo Cᵢ y periodo Tᵢ (y plazo igual al periodo), la **utilización** es U = Σ Cᵢ / Tᵢ.
- **Planificación por tasa monotónica (RMS):** prioridad fija, más alta cuanto más corto el periodo. Todas las tareas cumplen sus plazos si U ≤ n(2^(1/n) − 1). Para n = 1 el límite es 1; para n = 2, unos 0.828; cuando n crece, tiende a ln 2 ≈ 0.693. Es una condición suficiente: si se supera, puede funcionar igual, pero hay que analizarlo con más detalle.
- **Primero el plazo más próximo (EDF):** prioridad dinámica; todas cumplen si U ≤ 1.
~~~js
// ¿Cumplen las tareas del sensor del patio con RMS?  [C en ms, T en ms]
const tareas = [[2, 10], [5, 40], [10, 100]];      // leer sensor, filtrar, enviar por radio
const U = tareas.reduce((s, [c, t]) => s + c / t, 0), n = tareas.length, limite = n * (2 ** (1 / n) - 1);
console.log('U =', U.toFixed(3), '· límite RMS =', limite.toFixed(3), '→', U <= limite ? 'garantizado' : 'requiere análisis exacto');
~~~

## La inversión de prioridades en Marte
En julio de 1997, la sonda Mars Pathfinder empezó a reiniciarse sola en la superficie de Marte. La causa, explicada por Glenn Reeves, del Jet Propulsion Laboratory: una tarea de baja prioridad tenía un recurso compartido (un mutex del bus de datos), una de alta prioridad esperaba ese recurso, y una tarea de prioridad media, que no necesitaba el recurso, le quitaba el procesador a la de baja prioridad. La tarea de alta prioridad quedaba bloqueada indirectamente por la media: **inversión de prioridades**. El perro guardián detectaba el bloqueo y reiniciaba. La solución fue activar a distancia la **herencia de prioridades** (formalizada por Lui Sha, Ragunathan Rajkumar y John Lehoczky en 1990): la tarea que tiene el recurso hereda temporalmente la prioridad más alta de quienes lo esperan.

## Seguridad funcional
Cuando un error puede herir a personas, el software se desarrolla con normas de **seguridad funcional**: IEC 61508 en general, ISO 26262 en automóviles y DO-178C en aviónica. Exigen análisis de riesgos, trazabilidad de requisitos a pruebas, cobertura estructural y, en los niveles más críticos, revisión independiente. En la industria automotriz se usan reglas de codificación como **MISRA C**, que prohíben construcciones peligrosas del lenguaje. Dos lecciones históricas: el cohete **Ariane 5** se destruyó en su primer vuelo en 1996 porque un número de punto flotante de 64 bits se convirtió a un entero de 16 bits que se desbordó, en código reutilizado del Ariane 4; y la máquina de radioterapia **Therac-25** causó sobredosis graves en los años 80 por una condición de carrera, como analizaron Nancy Leveson y Clark Turner en 1993.

## Energía e Internet de las cosas
Muchos dispositivos funcionan años con una batería porque pasan casi todo el tiempo **dormidos**, consumiendo microamperios, y despiertan unos milisegundos para medir y transmitir. La duración se estima con el consumo promedio:
:::flow I promedio = I activo · fracción activa + I dormido · (1 − fracción activa) | horas = capacidad (mAh) / I promedio (mA)
Para comunicarse, los dispositivos de **IoT** usan protocolos livianos como **MQTT**, creado en 1999 por Andy Stanford-Clark y Arlen Nipper para monitorear oleoductos por enlaces satelitales. Las actualizaciones de firmware a distancia (OTA) deben ser firmadas, verificadas y reversibles, porque un dispositivo que queda inservible en el campo es carísimo de recuperar.

## Ejemplo resuelto: el sensor de entrada del patio
Un sensor magnético detecta vehículos en la puerta. Diseño: el sensor genera una **interrupción** al detectar un cambio, en lugar de sondearlo; tres tareas periódicas (leer cada 10 ms durante 2 ms, filtrar cada 40 ms durante 5 ms, enviar por radio cada 100 ms durante 10 ms) dan U = 0.2 + 0.125 + 0.1 = 0.425, por debajo del límite RMS de 0.780 para tres tareas: los plazos están garantizados. Energía: activo a 20 mA el 1% del tiempo y dormido a 0.01 mA el resto da un promedio de unos 0.21 mA; con una batería de 2000 mAh dura unas 9500 horas, más de un año. Un perro guardián de 2 segundos reinicia el sistema si se bloquea, y cada reinicio se reporta por MQTT para investigarlo.`,
  links: [['arq.io', 'las interrupciones, la E/S y los buses son la base del hardware embebido'], ['m8.conc', 'la exclusión mutua y la inversión de prioridades son problemas de concurrencia'], ['for.verif', 'los sistemas críticos usan verificación formal y normas de seguridad funcional']],
  read: 'Lee y Seshia, *Introduction to Embedded Systems*, capítulos 1, 10 y 12; Liu y Layland (1973); Reeves, *What Really Happened on Mars?* (1997); Leveson y Turner (1993).',
  terms: [
    ['Sistema ciberfísico', 'integración de cómputo con procesos físicos mediante sensores y actuadores en un ciclo continuo', ['Un control de frenos ABS.', 'Un sensor que abre la barrera del patio.', 'Lee y Seshia usan este término.']],
    ['Microcontrolador', 'chip que integra procesador, memoria y periféricos para controlar un dispositivo', ['Un ESP32 con wifi en un sensor.', 'Tiene kilobytes de RAM, no gigabytes.', 'Arduino usa microcontroladores AVR.']],
    ['Interrupción', 'señal del hardware que suspende el programa para atender un evento con una rutina breve', ['El sensor avisa cuando pasa un vehículo.', 'Evita gastar energía sondeando.', 'La rutina de atención debe ser muy corta.']],
    ['Tiempo real duro', 'sistema en el que perder un plazo constituye una falla grave', ['El control de un marcapasos.', 'El despliegue de una bolsa de aire.', 'Exige conocer el peor tiempo de ejecución.']],
    ['Planificación por tasa monotónica', 'política de prioridades fijas en la que las tareas con periodo más corto tienen mayor prioridad', ['La lectura cada 10 ms tiene más prioridad que el envío cada 100 ms.', 'Liu y Layland dieron su límite de utilización en 1973.', 'El límite tiende a ln 2 con muchas tareas.']],
    ['Inversión de prioridades', 'situación en que una tarea de alta prioridad queda bloqueada por una de menor prioridad que retiene un recurso', ['Causó los reinicios de Mars Pathfinder en 1997.', 'Una tarea media impide que la baja libere el mutex.', 'Se resuelve con herencia de prioridades.']],
    ['Perro guardián', 'temporizador que reinicia el sistema si el programa deja de reportarse periódicamente', ['Recupera el sensor si se bloquea.', 'Detectó los bloqueos de Pathfinder.', 'Es una defensa de último recurso.']],
    ['Conversor analógico-digital', 'periférico que transforma un voltaje en un número con una resolución de n bits', ['Con 10 bits distingue 1024 niveles.', 'Lee un sensor de temperatura.', 'Su resolución es Vref / (2ⁿ − 1).']]
  ],
  q: [
    ['¿Qué distingue a un sistema de tiempo real?', 'Que su corrección depende también de cuándo entrega el resultado', ['Que es muy rápido', 'Que usa Internet', 'Que no tiene errores'], 'Una respuesta correcta pero tardía puede ser una falla.', 2],
    ['Tareas con [C, T] = [1, 4] y [1, 5]. ¿Cuál es la utilización?', '0.45', ['0.20', '0.90', '2'], '1/4 + 1/5 = 0.25 + 0.2.', 2],
    ['¿Cuál es el límite de utilización de RMS para dos tareas, según Liu y Layland?', 'Aproximadamente 0.828', ['1', '0.5', '0.693'], '2(√2 − 1) ≈ 0.828.', 3],
    ['¿Qué causó los reinicios de Mars Pathfinder en 1997?', 'Una inversión de prioridades en el acceso a un recurso compartido', ['Un virus', 'Falta de batería', 'Un error de unidades métricas'], 'Se corrigió activando la herencia de prioridades.', 3],
    ['¿Por qué se prefieren las interrupciones al sondeo en un sensor a batería?', 'Porque el procesador puede dormir hasta que ocurra el evento', ['Porque son más fáciles de programar', 'Porque el sondeo no funciona', 'Porque las interrupciones no consumen nada'], 'Dormir ahorra energía.', 2],
    ['¿Cuántos niveles distingue un ADC de 12 bits?', '4096', ['12', '1024', '256'], '2¹² = 4096.', 1],
    ['¿Qué falló en el primer vuelo del Ariane 5 en 1996?', 'La conversión de un número de 64 bits en punto flotante a un entero de 16 bits que se desbordó', ['Un error de unidades', 'Un virus informático', 'Una falla de batería'], 'Era código reutilizado del Ariane 4.', 3],
    { tf: 'Si la utilización supera el límite de Liu y Layland, las tareas necesariamente pierden plazos con RMS.', v: false, e: 'Es una condición suficiente, no necesaria; hay que hacer un análisis exacto.', l: 4 },
    { tf: 'Con EDF y tareas periódicas independientes con plazo igual al periodo, todas cumplen si la utilización es como máximo 1.', v: true, e: 'Es el resultado de Liu y Layland para prioridades dinámicas.', l: 3 },
    { c: 'Escribe «cumpleRMS(tareas)»: tareas es una lista de [C, T]; devuelve true si U ≤ n(2^(1/n) − 1).', f: 'cumpleRMS', p: ['tareas'], t: [[[[[1, 4], [1, 5]]], true], [[[[2, 4], [2, 5]]], false], [[[[1, 2]]], true], [[[[2, 10], [5, 40], [10, 100]]], true]], sol: '  const n = tareas.length, u = tareas.reduce((s, [c, t]) => s + c / t, 0);\n  return u <= n * (Math.pow(2, 1 / n) - 1);', l: 2 },
    { c: 'Escribe «valorADC(voltaje, vref, bits)» que devuelva Math.round(voltaje / vref × (2^bits − 1)).', f: 'valorADC', p: ['voltaje', 'vref', 'bits'], t: [[[1.65, 3.3, 10], 512], [[3.3, 3.3, 8], 255], [[0, 5, 12], 0]], sol: '  return Math.round(voltaje / vref * (Math.pow(2, bits) - 1));', l: 1 },
    { c: 'Escribe «horasBateria(mAh, activoMa, dormidoMa, fraccionActiva)» con la duración en horas usando el consumo promedio, redondeada a 1 decimal.', f: 'horasBateria', p: ['mAh', 'activoMa', 'dormidoMa', 'fraccionActiva'], t: [[[1000, 20, 0.01, 0.01], 4764.2], [[2000, 100, 1, 0.5], 39.6], [[500, 10, 10, 0.3], 50]], sol: '  const i = activoMa * fraccionActiva + dormidoMa * (1 - fraccionActiva);\n  return Math.round(mAh / i * 10) / 10;', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var t = [[R.int(1, 3), R.pick([5, 10, 20])], [R.int(1, 8), R.pick([25, 40, 50])], [R.int(2, 20), R.pick([80, 100, 200])]], u = t.reduce(function (s, x) { return s + x[0] / x[1]; }, 0); g.input(3, 'Tres tareas tienen [C, T] = ' + t.map(function (x) { return '[' + x.join(', ') + ']'; }).join(', ') + ' ms. ¿Cuál es la utilización? Redondea a 3 decimales.', u.toFixed(3), 'U = Σ C/T.'); g.mcq(4, 'Con esa utilización (' + u.toFixed(3) + '), ¿garantiza el límite de Liu y Layland (≈ 0.780 para 3 tareas) los plazos con RMS?', u <= 0.7798 ? 'Sí' : 'No lo garantiza; hace falta un análisis exacto', [u <= 0.7798 ? 'No lo garantiza; hace falta un análisis exacto' : 'Sí', 'Solo con EDF', 'Nunca se puede saber'], 'El límite es suficiente, no necesario.'); });
    g.times(5, function (R) { var b = R.pick([8, 10, 12, 16]); g.input(1, '¿Cuántos niveles distingue un ADC de ' + b + ' bits?', Math.pow(2, b), '2^' + b + '.'); });
    g.times(5, function (R) { var cap = R.pick([500, 1000, 2000, 3000]), act = R.pick([10, 20, 50]), f = R.pick([0.01, 0.05, 0.1]), dor = 0.01, i = act * f + dor * (1 - f); g.input(3, 'Una batería de ' + cap + ' mAh alimenta un sensor que consume ' + act + ' mA activo el ' + Math.round(f * 100) + '% del tiempo y 0.01 mA dormido. ¿Cuántas horas dura? Redondea a 0 decimales.', Math.round(cap / i), 'Promedio ' + i.toFixed(4) + ' mA.'); });
    var tipos = [['El control de la bolsa de aire de un auto', 'Duro'], ['La decodificación de video en una videollamada', 'Firme'], ['La actualización de la pantalla de un termostato', 'Blando'], ['El control de vuelo de un avión', 'Duro']];
    tipos.forEach(function (t) { g.mcq(2, '¿Qué tipo de tiempo real es? ' + t[0], t[1], ['Duro', 'Firme', 'Blando', 'No es de tiempo real'].filter(function (x) { return x !== t[1]; }), 'Duro: falla grave; firme: resultado tardío inútil; blando: degradación.'); });
  },
  checks: [
    ['¿Qué diferencia hay entre tiempo real duro, firme y blando?', 'Duro: perder un plazo es una falla grave; firme: el resultado tardío no sirve pero se toleran pérdidas ocasionales; blando: el retraso solo degrada la calidad.'],
    ['Calcula la utilización de [1, 4], [2, 10] y [3, 30] e indica si RMS garantiza los plazos.', 'U = 0.25 + 0.2 + 0.1 = 0.55, menor que 0.780: los plazos están garantizados.'],
    ['Explica la inversión de prioridades de Mars Pathfinder y su solución.', 'Una tarea de baja prioridad tenía un mutex que esperaba una de alta, y una de prioridad media le quitaba el procesador a la baja; se resolvió con herencia de prioridades.'],
    ['¿Por qué los dispositivos a batería pasan la mayor parte del tiempo dormidos?', 'Porque el consumo dormido es miles de veces menor; el consumo promedio y la duración dependen sobre todo de la fracción de tiempo activo.'],
    ['¿Qué enseña el caso del Ariane 5 sobre la reutilización de código?', 'Que un código correcto en un contexto puede fallar en otro con supuestos distintos; hay que revisar los supuestos al reutilizar.']
  ],
  cites: ['Lee, E. y Seshia, S. (2017). *Introduction to Embedded Systems: A Cyber-Physical Systems Approach* (2.ª ed.). MIT Press.', 'Liu, C. L. y Layland, J. (1973). Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment. *Journal of the ACM*, 20(1).', 'Sha, L., Rajkumar, R. y Lehoczky, J. (1990). Priority Inheritance Protocols. *IEEE Transactions on Computers*, 39(9).', 'Reeves, G. (1997). What Really Happened on Mars? Jet Propulsion Laboratory.', 'Leveson, N. y Turner, C. (1993). An Investigation of the Therac-25 Accidents. *IEEE Computer*, 26(7).', 'Lions, J.-L. et al. (1996). *Ariane 5 Flight 501 Failure: Report by the Inquiry Board*. ESA.'],
  project: { t: 'Dispositivo embebido simulado',
    goal: 'Diseñar y simular un dispositivo embebido con tiempo real, energía y robustez.',
    steps: ['Elige un dispositivo (por ejemplo, un medidor de temperatura que reporta por MQTT) y define sus tareas periódicas con C y T.', 'Verifica la planificación con el límite de Liu y Layland y simula RMS y EDF en un cronograma.', 'Implementa la lectura del sensor por interrupción y el filtrado en un simulador (Wokwi) o en una placa real.', 'Calcula la duración de la batería y optimízala reduciendo la fracción activa.', 'Agrega un perro guardián y simula una falla para comprobar la recuperación.'],
    deliver: 'El diseño, el código, el cronograma de planificación, el cálculo de energía y la evidencia de la recuperación.' },
  hito: ['Diseña el sensor de entrada de PatioApp con lectura por interrupción y verifica sus tareas periódicas con el límite de Liu y Layland.', 'Calcula el presupuesto de energía del sensor de PatioApp y agrega perro guardián y reporte de reinicios por MQTT.']
});

S('plat', 'plat.parallel', { title: 'Computación paralela y GPU',
  ask: '¿Qué concepto de computación paralela se aplica?',
  lesson: `
> **La idea en simple.** Durante décadas, los programas se aceleraban solos porque cada nuevo procesador era más rápido. Eso terminó: hoy los procesadores tienen más núcleos, no más velocidad. Para aprovecharlos hay que dividir el trabajo en partes que se hagan a la vez, y no todo se puede dividir.

## El fin del almuerzo gratis
Robert Dennard describió en 1974 que, al achicar los transistores, su consumo por área se mantenía; así, la frecuencia de los procesadores subió durante décadas. Hacia 2005 ese escalamiento se detuvo por el calor: no se podía subir más la frecuencia sin que el chip se recalentara. Herb Sutter escribió ese año *The Free Lunch Is Over*: la industria pasó a poner varios núcleos en cada chip, y el software tiene que ser paralelo para ir más rápido.

## Concurrencia no es paralelismo
Rob Pike, uno de los creadores de Go, lo resumió en una charla de 2012: la **concurrencia** trata de *estructurar* un programa como tareas independientes que pueden progresar intercaladas (atender muchas conexiones); el **paralelismo** trata de *ejecutar* cosas al mismo tiempo en varios núcleos para terminar antes. Un programa concurrente puede correr en un solo núcleo; el paralelismo necesita varios.

## Taxonomía de Flynn
Michael Flynn clasificó en 1966 las arquitecturas según sus flujos de instrucciones y de datos:
| Clase | Significado | Ejemplo |
| SISD | una instrucción, un dato | procesador clásico de un núcleo |
| SIMD | una instrucción sobre muchos datos | instrucciones vectoriales AVX, GPU |
| MISD | muchas instrucciones, un dato | raro; algunos sistemas redundantes |
| MIMD | muchas instrucciones, muchos datos | procesadores multinúcleo, clústeres |

## Cuánto se puede acelerar
- **Aceleración:** S = T₁ / Tₚ (tiempo con un procesador entre tiempo con p). **Eficiencia:** E = S / p.
- **Ley de Amdahl** (Gene Amdahl, 1967): si una fracción s del programa es secuencial, la aceleración máxima con p procesadores es 1 / (s + (1 − s)/p), y nunca supera 1/s. Con 10% secuencial, ni con infinitos núcleos se pasa de 10 veces.
- **Ley de Gustafson** (John Gustafson, 1988): en la práctica, con más procesadores se resuelven problemas **más grandes** en el mismo tiempo. Si s es la fracción secuencial medida en el sistema paralelo, la aceleración escalada es S = p − s(p − 1). Amdahl mira un problema de tamaño fijo; Gustafson, un tiempo fijo.

## Trabajo y profundidad
El modelo **trabajo-profundidad**, usado en el lenguaje Cilk y en el capítulo de algoritmos multihilo de Cormen y otros (*Introduction to Algorithms*), describe un algoritmo paralelo con dos números:
- **Trabajo** T₁: el total de operaciones (el tiempo con un procesador).
- **Profundidad** (o *span*) T∞: la cadena más larga de pasos que dependen unos de otros (el tiempo con infinitos procesadores).
- **Paralelismo** = T₁ / T∞: cuántos procesadores se pueden aprovechar como máximo.
El **teorema de Brent** acota el tiempo con p procesadores: Tₚ ≤ T₁/p + T∞. Ejemplo: sumar n números en árbol tiene trabajo n − 1 y profundidad ⌈log₂ n⌉; con un millón de números, la profundidad es solo 20.

## Patrones paralelos
- **Map:** aplicar la misma función a cada elemento por separado; es perfectamente paralelo.
- **Reduce:** combinar todos los elementos con una operación asociativa (suma, máximo) en forma de árbol.
- **Scan** (suma prefija): cada posición recibe la combinación de todas las anteriores; parece secuencial, pero Guy Blelloch mostró en 1990 cómo hacerlo con trabajo O(n) y profundidad O(log n).
- **Tubería:** etapas que procesan elementos distintos a la vez, como en una línea de producción.
- **Paralelismo de datos frente a paralelismo de tareas:** dividir los datos entre trabajadores que hacen lo mismo, o repartir tareas distintas.
~~~js
// Reducción en árbol: cuántas rondas hacen falta si en cada ronda se suman pares en paralelo
function sumaArbol(v) {
  let rondas = 0;
  while (v.length > 1) {
    const sig = [];
    for (let i = 0; i < v.length; i += 2) sig.push(v[i] + (v[i + 1] ?? 0));   // estas sumas son independientes
    v = sig; rondas++;
  }
  return { total: v[0], rondas };
}
console.log(sumaArbol(Array.from({ length: 1000 }, (_, i) => i + 1)));   // 500500 en 10 rondas, no 999 pasos
~~~

## GPU: miles de hilos sencillos
Una **GPU** tiene miles de núcleos simples organizados para ejecutar la misma instrucción sobre muchos datos (NVIDIA llama a su modelo SIMT: una instrucción, múltiples hilos). NVIDIA lanzó **CUDA** en 2007 para programarlas en general, no solo para gráficos. David Kirk y Wen-mei Hwu explican en *Programming Massively Parallel Processors* las reglas para que una GPU rinda:
- Mucho paralelismo de datos: miles de elementos independientes.
- Acceso a memoria **coalescente**: hilos vecinos leen posiciones vecinas.
- Pocas bifurcaciones distintas dentro de un mismo grupo de hilos (*warp*).
- Minimizar las copias entre la memoria de la CPU y la de la GPU, que suelen ser el cuello de botella.
Por eso las GPU dominan el entrenamiento de redes neuronales: casi todo es multiplicación de matrices.

## Los peligros del paralelismo
- **Condiciones de carrera** y la necesidad de sincronizar, que ya viste en concurrencia.
- **Falso compartir:** dos núcleos escriben variables distintas que caen en la misma línea de caché, y la caché las invalida mutuamente sin que el código lo muestre.
- **Desbalance de carga:** si un trabajador recibe más trabajo, todos esperan al más lento; el **robo de trabajo** (los ociosos toman tareas de los ocupados) lo mitiga.
- **Sobrecosto de coordinación:** crear hilos y comunicarse cuesta; con tareas demasiado pequeñas, la versión paralela es más lenta.
Maurice Herlihy y Nir Shavit estudian en *The Art of Multiprocessor Programming* las estructuras de datos sin bloqueo, que usan instrucciones atómicas como comparar e intercambiar. En sistemas distribuidos, el estándar **MPI** (1994) define el paso de mensajes entre procesos de un clúster. En el navegador, los **Web Workers** dan paralelismo a JavaScript: esta misma plataforma ejecuta tu código en uno.

## Ejemplo resuelto: paralelizar el reporte mensual
El reporte de PatioApp tarda 100 s: 10 s leen la configuración y escriben el resultado (secuencial) y 90 s calculan las estadísticas de cada patio, independientes entre sí. Con 8 núcleos, Amdahl predice 1 / (0.1 + 0.9/8) ≈ 4.7 veces: unos 21 s. Al medir se obtienen 26 s: aceleración 3.8 y eficiencia 0.48. Causas encontradas: los patios tienen tamaños muy distintos (desbalance) y todos los hilos actualizaban un contador compartido (contención). Soluciones: repartir los patios dinámicamente con una cola de trabajo y que cada hilo acumule localmente y combine al final (reducción). Resultado: 22 s, muy cerca del límite teórico.`,
  links: [['m8.conc', 'hilos, bloqueos y condiciones de carrera son la base de la programación paralela'], ['arq.mem', 'la jerarquía de memoria y las líneas de caché explican el falso compartir'], ['ia.nn', 'las GPU aceleran el entrenamiento de redes neuronales']],
  read: 'Kirk, Hwu y El Hajj, capítulos 1 a 5; Herlihy y Shavit, capítulos 1 y 2; Cormen y otros, capítulo de algoritmos multihilo; apuntes de Stanford CS149 y CMU 15-418.',
  terms: [
    ['Paralelismo', 'ejecución simultánea de cálculos en varios procesadores para terminar antes', ['Calcular las estadísticas de 8 patios en 8 núcleos.', 'Entrenar una red en una GPU.', 'Pike lo distingue de la concurrencia.']],
    ['SIMD', 'clase de Flynn en que una misma instrucción opera sobre muchos datos a la vez', ['Las instrucciones vectoriales AVX.', 'Las GPU siguen una variante llamada SIMT.', 'Sumar dos vectores de 8 elementos en una instrucción.']],
    ['Ley de Gustafson', 'observación de que, con más procesadores, se resuelven problemas más grandes en el mismo tiempo, con aceleración escalada p − s(p − 1)', ['Con 10% secuencial y 10 núcleos se escala 9.1 veces.', 'Gustafson la publicó en 1988.', 'Complementa a la ley de Amdahl.']],
    ['Profundidad', 'longitud de la cadena más larga de operaciones dependientes de un algoritmo paralelo', ['Sumar n números en árbol tiene profundidad log₂ n.', 'Es el tiempo con infinitos procesadores.', 'También se llama span.']],
    ['Eficiencia paralela', 'aceleración dividida entre la cantidad de procesadores', ['Acelerar 3.8 veces con 8 núcleos da 0.48.', 'Una eficiencia de 1 es el ideal.', 'Baja con el desbalance y la coordinación.']],
    ['Reducción', 'patrón que combina todos los elementos con una operación asociativa en forma de árbol', ['Sumar un millón de números en 20 rondas.', 'Calcular el máximo en paralelo.', 'Cada hilo acumula localmente y luego se combinan.']],
    ['Falso compartir', 'pérdida de rendimiento cuando núcleos distintos escriben variables distintas de la misma línea de caché', ['Dos contadores contiguos en un arreglo, uno por hilo.', 'No es visible en el código.', 'Se evita separando los datos en líneas distintas.']],
    ['Desbalance de carga', 'situación en que unos trabajadores reciben mucho más trabajo que otros y el total espera al más lento', ['Un patio enorme y siete pequeños.', 'Se mitiga con colas dinámicas o robo de trabajo.', 'Reduce la eficiencia.']]
  ],
  q: [
    ['¿Por qué dejaron de subir las frecuencias de los procesadores hacia 2005?', 'Por el calor: el escalamiento de Dennard se detuvo', ['Porque nadie las necesitaba', 'Por una ley', 'Porque los transistores dejaron de achicarse'], 'La industria pasó a varios núcleos por chip.', 2],
    ['Un programa tiene 20% secuencial. ¿Cuál es la aceleración máxima con infinitos procesadores según Amdahl?', '5', ['20', '80', 'Infinita'], '1/0.2 = 5.', 2],
    ['Con fracción secuencial 0.1 y 10 procesadores, ¿cuál es la aceleración escalada de Gustafson?', '9.1', ['5.3', '10', '1.1'], '10 − 0.1·9 = 9.1.', 3],
    ['Un programa tarda 120 s en un núcleo y 40 s en 4 núcleos. ¿Cuál es su eficiencia?', '0.75', ['3', '0.33', '1'], 'S = 3; E = 3/4.', 2],
    ['¿Cuál es la profundidad de sumar 1024 números con una reducción en árbol?', '10', ['1023', '512', '32'], 'log₂ 1024 = 10.', 3],
    ['¿Qué clase de Flynn corresponde a un procesador multinúcleo?', 'MIMD', ['SISD', 'SIMD', 'MISD'], 'Cada núcleo ejecuta sus propias instrucciones sobre sus propios datos.', 2],
    ['¿Qué distingue a la concurrencia del paralelismo según Rob Pike?', 'La concurrencia estructura tareas independientes; el paralelismo las ejecuta a la vez', ['Son sinónimos', 'La concurrencia necesita varios núcleos', 'El paralelismo solo existe en GPU'], 'Un programa concurrente puede correr en un solo núcleo.', 3],
    { tf: 'Paralelizar siempre acelera un programa, sin importar el tamaño de las tareas.', v: false, e: 'Con tareas muy pequeñas, el costo de crear hilos y coordinarse supera la ganancia.', l: 2 },
    { tf: 'En una GPU conviene que hilos vecinos accedan a posiciones de memoria vecinas.', v: true, e: 'El acceso coalescente aprovecha mejor el ancho de banda.', l: 3 },
    { c: 'Escribe «gustafson(s, p)» con la aceleración escalada p − s(p − 1), redondeada a 2 decimales.', f: 'gustafson', p: ['s', 'p'], t: [[[0.1, 10], 9.1], [[0, 8], 8], [[0.5, 4], 2.5]], sol: '  return Math.round((p - s * (p - 1)) * 100) / 100;', l: 2 },
    { c: 'Escribe «eficiencia(tSerial, tParalelo, p)» con la eficiencia paralela redondeada a 2 decimales.', f: 'eficiencia', p: ['tSerial', 'tParalelo', 'p'], t: [[[100, 30, 4], 0.83], [[60, 15, 4], 1], [[80, 40, 4], 0.5]], sol: '  return Math.round(tSerial / tParalelo / p * 100) / 100;', l: 1 },
    { c: 'Escribe «rondasReduccion(n)»: cuántas rondas necesita una reducción en árbol de n elementos si en cada ronda se combinan pares (los impares pasan solos).', f: 'rondasReduccion', p: ['n'], t: [[[8], 3], [[1], 0], [[5], 3], [[1000], 10]], sol: '  let r = 0;\n  while (n > 1) { n = Math.ceil(n / 2); r++; }\n  return r;', l: 2 },
    { c: 'Escribe «sumaPrefija(v)» que devuelva la suma prefija inclusiva (cada posición suma todas las anteriores y la propia).', f: 'sumaPrefija', p: ['v'], t: [[[[1, 2, 3, 4]], [1, 3, 6, 10]], [[[]], []], [[[5, -5, 5]], [5, 0, 5]]], sol: '  let s = 0;\n  return v.map(x => (s += x));', l: 1 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var s = R.pick([0.05, 0.1, 0.2, 0.25, 0.5]), p = R.pick([2, 4, 8, 16, 32]); g.input(3, 'Con fracción secuencial ' + s + ' y ' + p + ' procesadores, ¿cuál es la aceleración según Amdahl? Redondea a 2 decimales.', (1 / (s + (1 - s) / p)).toFixed(2), '1 / (' + s + ' + ' + (1 - s) + '/' + p + ').'); g.input(3, 'Con los mismos valores, ¿cuál es la aceleración escalada de Gustafson? Redondea a 2 decimales.', (p - s * (p - 1)).toFixed(2), p + ' − ' + s + '·' + (p - 1) + '.'); });
    g.times(6, function (R) { var t1 = R.int(40, 200), p = R.pick([2, 4, 8]), tp = Math.round(t1 / (p * R.pick([0.5, 0.6, 0.75, 0.8, 0.9]))); g.input(2, 'Un programa tarda ' + t1 + ' s con un núcleo y ' + tp + ' s con ' + p + '. ¿Cuál es su eficiencia? Redondea a 2 decimales.', (t1 / tp / p).toFixed(2), 'E = (T₁/Tₚ)/p.'); });
    g.times(5, function (R) { var k = R.int(3, 20), n = Math.pow(2, k); g.input(2, '¿Cuál es la profundidad de una reducción en árbol de ' + n + ' elementos?', k, 'log₂ ' + n + ' = ' + k + '.'); });
    var fl = [['Un procesador antiguo de un solo núcleo', 'SISD'], ['Una instrucción AVX que suma 8 pares de números', 'SIMD'], ['Un clúster de servidores que ejecutan programas distintos', 'MIMD'], ['Un procesador de 16 núcleos ejecutando hilos distintos', 'MIMD']];
    fl.forEach(function (f) { g.mcq(2, '¿Qué clase de Flynn es esta? ' + f[0], f[1], ['SISD', 'SIMD', 'MISD', 'MIMD'].filter(function (x) { return x !== f[1]; }), 'Flynn (1966).'); });
  },
  checks: [
    ['¿Qué significó el "fin del almuerzo gratis" para los programadores?', 'Que los programas ya no se aceleran solos con cada procesador nuevo; para aprovechar los núcleos adicionales hay que escribir software paralelo.'],
    ['¿En qué se diferencian las leyes de Amdahl y Gustafson?', 'Amdahl fija el tamaño del problema y muestra el límite que impone la parte secuencial; Gustafson fija el tiempo y muestra que se pueden resolver problemas más grandes.'],
    ['Define trabajo, profundidad y paralelismo, con el ejemplo de la suma en árbol.', 'Trabajo: total de operaciones (n − 1); profundidad: cadena dependiente más larga (log₂ n); paralelismo: trabajo entre profundidad.'],
    ['¿Qué hace que un problema sea adecuado para una GPU?', 'Mucho paralelismo de datos, accesos a memoria coalescentes, pocas bifurcaciones divergentes y pocas copias entre CPU y GPU.'],
    ['Nombra tres causas de baja eficiencia paralela y una solución para cada una.', 'Desbalance (colas dinámicas o robo de trabajo), contención en datos compartidos (acumular localmente y reducir) y falso compartir (separar los datos en líneas de caché distintas).']
  ],
  cites: ['Kirk, D., Hwu, W. y El Hajj, I. (2022). *Programming Massively Parallel Processors* (4.ª ed.). Morgan Kaufmann.', 'Herlihy, M. y Shavit, N. (2012). *The Art of Multiprocessor Programming* (ed. revisada). Morgan Kaufmann.', 'Flynn, M. (1966). Very High-Speed Computing Systems. *Proceedings of the IEEE*, 54(12).', 'Amdahl, G. (1967). Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities. *AFIPS Conference Proceedings*, 30.', 'Gustafson, J. (1988). Reevaluating Amdahl’s Law. *Communications of the ACM*, 31(5).', 'Sutter, H. (2005). The Free Lunch Is Over: A Fundamental Turn Toward Concurrency in Software. *Dr. Dobb’s Journal*, 30(3).', 'Blelloch, G. (1990). Prefix Sums and Their Applications. Carnegie Mellon University, CMU-CS-90-190.'],
  project: { t: 'Aceleración medida de un cálculo pesado',
    goal: 'Paralelizar un cálculo real y explicar con datos cuánto se aceleró y por qué no más.',
    steps: ['Elige un cálculo pesado y divisible (procesar miles de imágenes, simular Monte Carlo, contar palabras en muchos archivos).', 'Mide la versión secuencial y estima su fracción secuencial.', 'Paraleliza con hilos, procesos o Web Workers usando map y reduce, y mide con 1, 2, 4 y 8 trabajadores.', 'Grafica la aceleración y la eficiencia frente a lo que predicen Amdahl y Gustafson.', 'Identifica las causas de la diferencia (desbalance, contención, falso compartir, copias) y corrige al menos una.'],
    deliver: 'El código, los gráficos de aceleración y eficiencia y un informe con el diagnóstico.' },
  hito: ['Paraleliza la generación del reporte mensual de PatioApp con un patrón map-reduce y mide la aceleración con 1, 2, 4 y 8 trabajadores.', 'Compara las mediciones del reporte de PatioApp con las leyes de Amdahl y Gustafson, corrige el desbalance o la contención y documenta el resultado en un ADR.']
});
})();
