(function () {
var S = SDC.S;

S('m9', 'm9.back', { title: 'Desarrollo backend: servidores y API',
  ask: '¿Cómo organizarías este servidor o esta API?',
  lesson: `
> **La idea en simple.** Detrás de cada pantalla web hay un servidor que recibe peticiones, valida los datos, aplica las reglas del negocio, consulta la base de datos y responde. Escribir un servidor que "funcione" es fácil; escribir uno que sea seguro, que responda bien a los errores, que se pueda probar y que siga siendo entendible con cien rutas requiere una organización clara. Esta unidad presenta esa organización con Node.

## Un servidor desde cero
Node incluye un módulo HTTP con el que se puede escribir un servidor en pocas líneas:
~~~js
import http from 'node:http';
const servidor = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/salud') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'No encontrado' }));
});
servidor.listen(3000, () => console.log('Escuchando en http://localhost:3000'));
~~~
Funciona, pero con muchas rutas se vuelve una cadena interminable de «if». Por eso se usan frameworks que resuelven el **enrutamiento**, el análisis del cuerpo de la petición y los **middlewares**: Express (2010, el más difundido), Fastify (más rápido y con validación integrada), Hono (liviano, corre también en entornos *edge*), y en otros lenguajes Django y FastAPI (Python), Spring Boot (Java), ASP.NET Core (C#) o Laravel (PHP). Los conceptos son los mismos en todos.

## Rutas y middlewares
En Express, una **ruta** asocia un método y un patrón de URL con una función manejadora, y un **middleware** es una función que se ejecuta en la cadena antes (o después) del manejador: registra la petición, verifica la autenticación, analiza el JSON, limita la tasa. Es el patrón cadena de responsabilidad: cada eslabón hace su parte y llama a «next()» o responde.
~~~js
import express from 'express';
const app = express();
app.use(express.json({ limit: '100kb' }));                 // middleware: analiza JSON con límite de tamaño
app.use((req, res, next) => {                              // middleware: registro con duración
  const t0 = Date.now();
  res.on('finish', () => console.log(req.method, req.url, res.statusCode, Date.now() - t0 + ' ms'));
  next();
});
app.get('/api/estadias/:id', async (req, res, next) => {
  try {
    const estadia = await estadias.porId(Number(req.params.id));
    if (!estadia) return res.status(404).json({ error: 'Estadía no encontrada' });
    res.json(estadia);
  } catch (e) { next(e); }                                  // delega al manejador de errores
});
app.use((err, req, res, next) => {                         // manejador de errores: siempre al final
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Error interno' });
});
app.listen(process.env.PORT || 3000);
~~~
Observa el manejador de errores al final: un error inesperado se registra completo en el servidor, pero al cliente solo se le dice "Error interno". Devolver la pila de llamadas o el mensaje de la base de datos al cliente filtra información útil para un atacante.

## Validar todo lo que entra
La regla de oro del backend: **nunca confiar en lo que llega del cliente**. El formulario del navegador puede validar, pero cualquiera puede enviar una petición directamente con «curl» o modificarla. Toda entrada se valida en el servidor: tipos, formatos, rangos, longitudes y campos permitidos. Las bibliotecas de **esquemas** (Zod, Joi, Ajv con JSON Schema) lo hacen declarativo:
~~~js
import { z } from 'zod';
const IngresoSchema = z.object({
  placa: z.string().regex(/^[A-Z0-9]{3}-\\d{3}$/),
  sedeId: z.number().int().positive(),
  convenio: z.boolean().default(false)
}).strict();                                               // rechaza campos no declarados
app.post('/api/ingresos', async (req, res, next) => {
  const r = IngresoSchema.safeParse(req.body);
  if (!r.success) return res.status(422).json({ error: 'Datos inválidos', detalles: r.error.issues });
  try { res.status(201).json(await registrarIngreso.ejecutar(r.data)); } catch (e) { next(e); }
});
~~~
El «.strict()» evita la **asignación masiva** (*mass assignment*): que alguien agregue «"monto": 0» o «"rol": "admin"» al cuerpo y el servidor lo copie sin pensar a la base de datos.

## Capas: que las rutas no hagan todo
El error más común en un backend que crece es poner la lógica del negocio dentro de las rutas: validación, cálculos, SQL y formato de respuesta, todo junto. Una organización probada separa:
| Capa | Responsabilidad | Ejemplo en PatioApp |
|---|---|---|
| Rutas o controladores | traducir HTTP: leer parámetros, validar, elegir el código de estado | POST /api/salidas |
| Casos de uso o servicios | aplicar las reglas del negocio, coordinar | RegistrarSalida |
| Dominio | entidades y reglas puras | Estadia, Tarifario |
| Acceso a datos | consultas a la base, APIs externas | RepositorioEstadias, EmisorSunat |
Las dependencias apuntan hacia adentro: el dominio no sabe que existe HTTP ni PostgreSQL. Así, la misma lógica sirve para la API, un script por lotes o una cola de mensajes, y se prueba sin levantar un servidor. Es la aplicación directa de lo que viste en diseño orientado a objetos (GRASP, inyección de dependencias) y en arquitectura (arquitectura hexagonal).

## Configuración y secretos
Un mismo código corre en tu máquina, en pruebas y en producción con distinta configuración: base de datos, claves de API, nivel de registro. La práctica estándar, recogida en la metodología **Twelve-Factor App** (Adam Wiggins, Heroku, 2011), es leer la configuración de **variables de entorno**, nunca escribirla en el código. En desarrollo se usa un archivo «.env» que **no se versiona** (va en el «.gitignore») y un «.env.example» que sí, con los nombres de las variables y valores ficticios. Al arrancar, el servidor valida que estén todas y falla de inmediato si falta alguna, en lugar de fallar a las tres de la tarde en la primera petición que la necesita.

## Registros útiles
«console.log('error')» no ayuda a nadie a las dos de la mañana. Un buen registro es **estructurado** (JSON con campos: nivel, mensaje, identificador de petición, usuario, duración), tiene **niveles** (debug, info, warn, error) y **nunca** incluye contraseñas, tokens ni datos personales innecesarios (la Ley 29733 de protección de datos personales también se aplica a los registros). Bibliotecas como Pino generan registros JSON con muy poco costo. Un **identificador de petición** que viaja en una cabecera y aparece en todos los registros permite reconstruir qué pasó con una petición concreta a través de varios servicios.

## Ejemplo resuelto: la API de salidas de PatioApp
1. **Ruta:** «POST /api/salidas» con cuerpo «{ placa }». La ruta valida con un esquema y responde 422 si la placa no tiene formato válido.
2. **Caso de uso:** «RegistrarSalida» busca la estadía abierta, la cierra, calcula el monto con el tarifario y pide el comprobante; si no hay estadía abierta, lanza un error de dominio «EstadiaNoEncontrada».
3. **Traducción de errores:** el manejador convierte «EstadiaNoEncontrada» en **404**, «ComprobanteRechazado» en **502** (fallo de un servicio externo) y cualquier otro en **500**.
4. **Idempotencia:** el cliente envía una cabecera «Idempotency-Key»; si la red falla y el operador reintenta, el servidor devuelve la misma respuesta en vez de cobrar dos veces.
5. **Registro:** cada petición deja una línea JSON con identificador, placa enmascarada (solo sus tres primeros caracteres), código y duración.
6. **Pruebas:** el caso de uso se prueba con dobles en memoria; la ruta, con Supertest, que hace peticiones HTTP reales a la aplicación sin abrir un puerto.`,
  links: [['m9.http', 'métodos, códigos de estado y diseño REST'], ['m5.di', 'inyección de dependencias en los casos de uso'], ['m16.web', 'vulnerabilidades web y cómo evitarlas']],
  read: 'Documentación de Express ("Guide" y "Error handling"); Wiggins, *The Twelve-Factor App* (12factor.net); OWASP, *API Security Top 10* (2023).',
  terms: [
    ['Backend', 'parte de una aplicación que corre en el servidor: reglas, datos e integración', ['Node, Python, Java.', 'API.', 'Base de datos.']],
    ['Middleware', 'función en la cadena de procesamiento de una petición que actúa antes o después del manejador', ['express.json.', 'Autenticación.', 'Registro.']],
    ['Enrutamiento', 'asociación de un método y un patrón de URL con la función que la atiende', ['GET /api/estadias/:id.', 'Parámetros de ruta.', 'Framework.']],
    ['Validación de esquema', 'verificación declarativa de la forma y los valores de los datos que llegan', ['Zod.', 'JSON Schema.', '422.']],
    ['Asignación masiva', 'vulnerabilidad en la que el servidor copia campos no previstos enviados por el cliente', ['rol: admin.', 'strict().', 'OWASP API.']],
    ['Variable de entorno', 'valor de configuración que el proceso recibe del sistema y no está escrito en el código', ['DATABASE_URL.', '.env.', 'Twelve-Factor.']],
    ['Registro estructurado', 'registro de eventos en un formato con campos, como JSON, fácil de buscar y analizar', ['Pino.', 'Niveles.', 'Identificador de petición.']],
    ['Clave de idempotencia', 'identificador que envía el cliente para que un reintento no repita el efecto de una operación', ['Idempotency-Key.', 'Pagos.', 'Reintentos seguros.']]
  ],
  q: [
    ['¿Por qué hay que validar en el servidor aunque el formulario ya valide?', 'Porque cualquiera puede enviar peticiones directamente sin pasar por el formulario', ['Porque el navegador es lento', 'No hace falta', 'Porque lo exige Express'], 'Nunca confiar en el cliente.', 1],
    ['¿Qué hace un middleware en Express?', 'Procesa la petición en la cadena y llama a next() o responde', ['Guarda la base de datos', 'Compila el código', 'Dibuja la página'], 'Cadena de responsabilidad.', 2],
    ['Llega una placa con formato inválido. ¿Qué código conviene devolver?', '422 (o 400) con el detalle del error de validación', ['200', '500', '301'], 'Error del cliente.', 2],
    ['¿Qué riesgo evita rechazar campos no declarados en el cuerpo?', 'La asignación masiva de campos como rol o monto', ['Las inyecciones SQL siempre', 'Los errores de red', 'Los ataques de fuerza bruta'], 'strict() en el esquema.', 3],
    ['¿Qué no debe incluir la respuesta de un error 500 al cliente?', 'La pila de llamadas o los mensajes internos de la base de datos', ['Un código de estado', 'Un mensaje genérico', 'Un identificador de petición'], 'Filtra información a atacantes.', 2],
    ['¿Dónde debería vivir la regla de cálculo de tarifas?', 'En el dominio o en un caso de uso, no en la ruta HTTP', ['En el middleware de registro', 'En el archivo .env', 'En la consulta SQL de la ruta'], 'Capas.', 3],
    ['¿Para qué sirve una clave de idempotencia en POST /api/salidas?', 'Para que un reintento por fallo de red no cobre dos veces', ['Para cifrar la petición', 'Para autenticar al usuario', 'Para acelerar la base de datos'], 'Mismo efecto con reintentos.', 4],
    { tf: 'El archivo .env con los secretos reales debe versionarse en Git para que todo el equipo lo tenga.', v: false, e: 'Se versiona un .env.example sin secretos.', l: 1 },
    { tf: 'Un identificador de petición en todos los registros permite seguir una petición a través de varios servicios.', v: true, e: 'Es la base del rastreo.', l: 2 },
    { c: 'Escribe «validarIngreso(body)»: devuelve una lista de errores (textos) si placa no cumple ABC-123, si sedeId no es entero positivo, o si hay campos distintos de placa, sedeId y convenio. Si todo está bien, lista vacía. Orden: placa, sedeId, campos extra.', f: 'validarIngreso', p: ['body'], t: [[[{ placa: 'ABC-123', sedeId: 2 }], []], [[{ placa: 'abc', sedeId: 2 }], ['placa']], [[{ placa: 'ABC-123', sedeId: 0, rol: 'admin' }], ['sedeId', 'campos']], [[{ placa: 'ABC-123', sedeId: 1, convenio: true }], []]], sol: '  const e = [];\n  if (typeof body.placa !== \'string\' || !/^[A-Z0-9]{3}-\\d{3}$/.test(body.placa)) e.push(\'placa\');\n  if (!Number.isInteger(body.sedeId) || body.sedeId <= 0) e.push(\'sedeId\');\n  if (Object.keys(body).some(k => ![\'placa\', \'sedeId\', \'convenio\'].includes(k))) e.push(\'campos\');\n  return e;', l: 3 },
    { c: 'Escribe «codigoPorError(nombre)»: EstadiaNoEncontrada → 404, DatosInvalidos → 422, ComprobanteRechazado → 502, NoAutorizado → 401, cualquier otro → 500.', f: 'codigoPorError', p: ['nombre'], t: [[['EstadiaNoEncontrada'], 404], [['DatosInvalidos'], 422], [['ComprobanteRechazado'], 502], [['NoAutorizado'], 401], [['TypeError'], 500]], sol: '  return { EstadiaNoEncontrada: 404, DatosInvalidos: 422, ComprobanteRechazado: 502, NoAutorizado: 401 }[nombre] || 500;', l: 1 },
    { c: 'Escribe «enmascararPlaca(p)»: deja los tres primeros caracteres y reemplaza los demás por asteriscos, salvo el guion (ABC-123 → ABC-***).', f: 'enmascararPlaca', p: ['p'], t: [[['ABC-123'], 'ABC-***'], [['XY9-876'], 'XY9-***']], sol: '  return p.slice(0, 3) + p.slice(3).replace(/[^-]/g, \'*\');', l: 2 }
  ],
  gen: function (g) {
    var ca = [['La placa enviada no tiene formato válido', '422'], ['La estadía pedida no existe', '404'], ['Se creó un ingreso nuevo', '201'], ['El servicio de SUNAT respondió con error', '502'], ['Falta el token de autenticación', '401'], ['El usuario está autenticado pero no tiene permiso', '403'], ['Superó el límite de peticiones por minuto', '429'], ['Error inesperado del servidor', '500']];
    ca.forEach(function (c) { g.mcq(2, '¿Qué código de estado corresponde? ' + c[0], c[1], ['200', '201', '401', '403', '404', '422', '429', '500', '502'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Códigos de estado en una API.'); });
    var cp = [['Leer parámetros y elegir el código HTTP', 'Ruta o controlador'], ['Aplicar las reglas del cobro y coordinar', 'Caso de uso'], ['Calcular los días de una estadía', 'Dominio'], ['Ejecutar la consulta SQL', 'Acceso a datos']];
    cp.forEach(function (c) { g.mcq(2, '¿En qué capa va? ' + c[0], c[1], ['Ruta o controlador', 'Caso de uso', 'Dominio', 'Acceso a datos'].filter(function (x) { return x !== c[1]; }), 'Organización en capas.'); });
    g.times(4, function (R) { var r = R.int(50, 400), ms = R.int(5, 60); g.input(3, 'Un servidor de un solo hilo tarda ' + ms + ' ms de CPU por petición. ¿Cuántas peticiones por segundo puede atender como máximo? Redondea hacia abajo.', Math.floor(1000 / ms), '1000 ms divididos entre el tiempo por petición.'); });
  },
  checks: [
    ['¿Qué son las rutas y los middlewares, y para qué sirve el manejador de errores al final?', 'Las rutas asocian método y URL con un manejador; los middlewares procesan la petición en cadena; el manejador final registra el error y responde sin filtrar detalles.'],
    ['¿Por qué y cómo se valida la entrada en el servidor?', 'Porque el cliente puede enviar cualquier cosa; con esquemas que verifican tipos, formatos, rangos y rechazan campos no declarados.'],
    ['Describe una organización en capas para un backend.', 'Rutas que traducen HTTP, casos de uso con las reglas, dominio puro y acceso a datos, con dependencias hacia adentro.'],
    ['¿Cómo se manejan la configuración, los secretos y los registros?', 'Con variables de entorno validadas al arrancar, .env fuera de Git y registros estructurados sin datos sensibles.']
  ],
  cites: ['Wiggins, A. (2011). *The Twelve-Factor App*. 12factor.net.', 'OWASP Foundation (2023). *OWASP API Security Top 10 2023*. owasp.org.', 'Fielding, R. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Tesis doctoral, UC Irvine.', 'Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.', 'Congreso de la República del Perú (2011). Ley 29733, Ley de Protección de Datos Personales.'],
  project: { t: 'Una API profesional',
    goal: 'Construir una API REST organizada en capas, validada, con manejo de errores y pruebas.',
    steps: ['Diseña los recursos y rutas de una API pequeña (por ejemplo, reservas de una cancha) con sus códigos de estado.', 'Implementa las rutas con Express o Fastify, validación con esquemas y un manejador de errores central.', 'Separa casos de uso, dominio y acceso a datos, inyectando las dependencias.', 'Agrega configuración por variables de entorno validada al arrancar y registros estructurados con identificador de petición.', 'Escribe pruebas de los casos de uso con dobles y de las rutas con Supertest.'],
    deliver: 'El repositorio con la API, las pruebas y un documento con las rutas.' },
  hito: ['Reorganiza la API de PatioApp en rutas, casos de uso, dominio y acceso a datos, con validación de esquemas en todas las entradas.', 'Agrega a PatioApp registros estructurados con identificador de petición y placa enmascarada, y la clave de idempotencia en las salidas.']
});
SDC.after('m9.back', 'm9.http');

S('m9', 'm9.browser', { title: 'La plataforma del navegador: almacenamiento, seguridad y aplicaciones instalables',
  ask: '¿Qué capacidad o regla del navegador se aplica aquí?',
  lesson: `
> **La idea en simple.** El navegador no es solo una ventana para ver páginas: es una plataforma completa, con almacenamiento local, trabajo en segundo plano, notificaciones, cámara, ubicación y modo sin conexión, todo dentro de un modelo de seguridad que impide que una página robe datos de otra. Conocer esa plataforma permite construir aplicaciones web que se sienten como aplicaciones nativas, y evitar los errores de seguridad más comunes.

## La política del mismo origen
El pilar de la seguridad del navegador es la **política del mismo origen** (*same-origin policy*), introducida por Netscape en 1995. Un **origen** es la combinación de **esquema, dominio y puerto**: «https://patioapp.pe» y «https://api.patioapp.pe» son orígenes distintos, igual que «http://» y «https://» del mismo dominio. La regla: el código de un origen **no puede leer** los datos de otro origen. Sin ella, cualquier página que visitaras podría leer tu correo abierto en otra pestaña. Lo que sí puede hacer una página es **enviar** peticiones a otros orígenes (enviar un formulario, cargar una imagen o un script), pero no leer las respuestas, y esa diferencia es la que aprovechan ataques como el CSRF.

## CORS: permisos explícitos entre orígenes
Una aplicación moderna suele tener el frontend en un origen y la API en otro. Para que el frontend pueda leer las respuestas de la API, el servidor de la API debe **autorizarlo** con **CORS** (*Cross-Origin Resource Sharing*), mediante cabeceras:
~~~txt
Petición desde https://app.patioapp.pe:
  Origin: https://app.patioapp.pe
Respuesta de https://api.patioapp.pe:
  Access-Control-Allow-Origin: https://app.patioapp.pe
  Access-Control-Allow-Credentials: true
~~~
Para peticiones que no son "simples" (métodos como PUT o DELETE, cabeceras propias como «Authorization», cuerpo JSON), el navegador primero envía una **petición de verificación** («OPTIONS», *preflight*) preguntando si el método y las cabeceras están permitidos. El error "blocked by CORS policy" que todo desarrollador ve alguna vez **no es un error del frontend**: es el servidor que no autorizó ese origen. La solución se configura en el servidor, y nunca con «Access-Control-Allow-Origin: *» en una API con datos privados.

## Dónde guardar datos en el navegador
| Mecanismo | Capacidad | Persistencia | Uso típico |
|---|---|---|---|
| Cookies | unos 4 KB cada una | según su fecha de expiración | sesión, se envían en cada petición |
| localStorage | unos 5 MB por origen | hasta que se borre | preferencias, borradores |
| sessionStorage | unos 5 MB | mientras la pestaña esté abierta | estado temporal de un flujo |
| IndexedDB | cientos de MB o más | hasta que se borre o el navegador libere espacio | datos estructurados, modo sin conexión |
| Cache Storage | según el disco disponible | igual que IndexedDB | respuestas HTTP para modo sin conexión |
Reglas prácticas:
- **localStorage es síncrono** (bloquea el hilo principal) y solo guarda texto: para datos pequeños, envuelto en «try/catch» porque puede fallar (modo privado, cuota llena) y con «JSON.stringify».
- **Nunca guardes tokens de sesión en localStorage**: cualquier script de la página puede leerlo, así que un solo XSS los roba. Para sesiones se usan **cookies** con las banderas «HttpOnly» (JavaScript no puede leerlas), «Secure» (solo por HTTPS) y «SameSite=Lax» o «Strict» (no se envían en peticiones iniciadas desde otros sitios, lo que frena el CSRF).
- **IndexedDB** es una base de datos de objetos con índices y transacciones, asíncrona. Su API es incómoda; bibliotecas pequeñas como «idb» o Dexie la simplifican.
- El navegador puede **borrar** el almacenamiento si falta espacio; «navigator.storage.persist()» pide que no lo haga.
~~~js
// Guardar un borrador de ingreso sin conexión, con manejo de errores
function guardarBorrador(clave, datos) {
  try { localStorage.setItem(clave, JSON.stringify({ datos, en: Date.now() })); return true; }
  catch { return false; }                                   // cuota llena o almacenamiento bloqueado
}
function leerBorrador(clave, maxHoras = 12) {
  try {
    const b = JSON.parse(localStorage.getItem(clave));
    return b && Date.now() - b.en < maxHoras * 3600000 ? b.datos : null;
  } catch { return null; }
}
~~~

## Service workers y aplicaciones instalables
Un **service worker** es un script que el navegador ejecuta en segundo plano, separado de la página, y que actúa como un **proxy** entre la aplicación y la red: intercepta cada petición y decide si responderla desde la caché, desde la red o combinando ambas. Con él, una aplicación web puede funcionar **sin conexión**, cargar al instante y recibir **notificaciones push**. Solo funciona en HTTPS (o en localhost), justamente por su poder.
Estrategias de caché comunes:
- **Primero la caché** para archivos que no cambian (con hash en el nombre): instantáneo.
- **Primero la red, con respaldo en caché** para datos que deben estar actualizados, pero que se muestran aunque no haya conexión.
- **Obsoleto mientras se revalida** (*stale-while-revalidate*): mostrar lo de la caché ya y actualizar en segundo plano para la próxima vez.
Una **PWA** (*Progressive Web App*, término de Alex Russell y Frances Berriman, 2015) combina un service worker, un **manifiesto** (un JSON con nombre, íconos, colores y modo de pantalla) y HTTPS: el navegador ofrece **instalarla** en la pantalla de inicio del teléfono o en el escritorio, sin pasar por una tienda de aplicaciones. Para negocios pequeños y aplicaciones internas, una PWA evita desarrollar y publicar dos aplicaciones nativas.

## Otras capacidades de la plataforma
- **Fetch** y **AbortController** para peticiones cancelables; **WebSocket** y **Server-Sent Events** para datos en tiempo real (el panel de ocupación que se actualiza solo).
- **Geolocalización**, **cámara y micrófono** («getUserMedia»), **notificaciones**, **portapapeles**: todas piden **permiso** explícito al usuario y requieren HTTPS.
- **Web Workers** para cálculos sin congelar la interfaz.
- **Intl** para formatear fechas, números y monedas según el idioma («new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })» produce «S/ 60.00»).
- La **Content Security Policy** (CSP), una cabecera que le dice al navegador de qué orígenes puede cargar scripts, estilos e imágenes: aunque un atacante logre inyectar una etiqueta de script, el navegador se niega a ejecutarla. Es la defensa en profundidad más efectiva contra el XSS.

## Ejemplo resuelto: la garita sin conexión
La garita de la sede de Lurín pierde internet varias veces al día, y los operadores anotaban los ingresos en papel.
1. **Diagnóstico:** el ingreso solo funcionaba con conexión; al fallar, el formulario mostraba un error y se perdían los datos digitados.
2. **Aplicación instalable:** se agrega un manifiesto y un service worker que guarda en caché la aplicación (HTML, JavaScript, estilos) con estrategia "primero la caché". La pantalla de ingreso abre aunque no haya red.
3. **Cola local:** los ingresos sin conexión se guardan en **IndexedDB** con un identificador único generado en el dispositivo («crypto.randomUUID()») y se muestran con el estado "pendiente de sincronizar".
4. **Sincronización:** al volver la conexión (evento «online»), la aplicación envía la cola a la API con el identificador como **clave de idempotencia**, para que un envío repetido no duplique ingresos. Los conflictos (la misma placa registrada en otra garita) se marcan para revisión del supervisor.
5. **Seguridad:** la sesión sigue en una cookie HttpOnly; en IndexedDB solo se guardan los ingresos pendientes, que se borran al sincronizar.
6. **Resultado:** cero ingresos perdidos por cortes, y el cuaderno de la garita se jubiló.`,
  links: [['m9.front', 'HTML, CSS, el DOM y el rendimiento de carga'], ['m9.async', 'promesas, workers y el bucle de eventos'], ['m16.web', 'XSS, CSRF y las defensas del lado del servidor']],
  read: 'MDN Web Docs: "Same-origin policy", "CORS", "Using the Web Storage API", "Service Worker API"; web.dev, "Learn PWA".',
  terms: [
    ['Origen', 'combinación de esquema, dominio y puerto que identifica a una aplicación web en el navegador', ['https://patioapp.pe.', 'Subdominio distinto, otro origen.', 'Puerto incluido.']],
    ['Política del mismo origen', 'regla del navegador que impide que el código de un origen lea datos de otro', ['Netscape, 1995.', 'Protege pestañas.', 'Se puede enviar, no leer.']],
    ['CORS', 'mecanismo con cabeceras por el que un servidor autoriza a otros orígenes a leer sus respuestas', ['Access-Control-Allow-Origin.', 'Preflight OPTIONS.', 'Se configura en el servidor.']],
    ['Cookie HttpOnly', 'cookie que el JavaScript de la página no puede leer, usada para sesiones', ['Frena el robo por XSS.', 'Secure.', 'SameSite.']],
    ['IndexedDB', 'base de datos de objetos asíncrona del navegador, con índices y transacciones', ['Modo sin conexión.', 'Dexie.', 'Cientos de MB.']],
    ['Service worker', 'script en segundo plano que intercepta las peticiones de una aplicación web', ['Proxy.', 'Caché.', 'Solo HTTPS.']],
    ['PWA', 'aplicación web instalable que funciona sin conexión gracias a un service worker y un manifiesto', ['Russell y Berriman, 2015.', 'Sin tienda.', 'Pantalla de inicio.']],
    ['Content Security Policy', 'cabecera que restringe de qué orígenes puede cargar y ejecutar recursos una página', ['CSP.', 'Contra XSS.', 'Defensa en profundidad.']]
  ],
  q: [
    ['¿Son https://patioapp.pe y https://api.patioapp.pe el mismo origen?', 'No: el dominio es distinto', ['Sí, comparten el dominio principal', 'Solo si usan el mismo puerto', 'Depende del navegador'], 'Esquema, dominio y puerto deben coincidir.', 2],
    ['Aparece "blocked by CORS policy". ¿Dónde se corrige?', 'En el servidor de la API, autorizando ese origen', ['En el CSS', 'Desactivando JavaScript', 'En el HTML del frontend'], 'CORS es un permiso del servidor.', 2],
    ['¿Por qué no guardar el token de sesión en localStorage?', 'Porque cualquier script de la página puede leerlo, y un XSS lo robaría', ['Porque es muy lento', 'Porque solo admite números', 'Porque se borra al cerrar la pestaña'], 'Se usa una cookie HttpOnly.', 3],
    ['¿Qué hace un service worker?', 'Intercepta las peticiones de la aplicación y puede responderlas desde una caché', ['Compila JavaScript', 'Reemplaza al servidor', 'Dibuja la interfaz'], 'Proxy en segundo plano.', 2],
    ['¿Qué almacenamiento conviene para cientos de ingresos pendientes sin conexión?', 'IndexedDB', ['Una cookie', 'sessionStorage', 'Una variable global'], 'Asíncrona, estructurada y con capacidad.', 3],
    ['¿Qué estrategia muestra al instante lo guardado y actualiza en segundo plano?', 'Obsoleto mientras se revalida (stale-while-revalidate)', ['Solo red', 'Primero la red', 'Sin caché'], 'Rapidez con actualización.', 3],
    ['¿Cómo ayuda la Content Security Policy aunque un atacante logre inyectar un script?', 'El navegador se niega a ejecutar scripts de orígenes no permitidos o en línea', ['Cifra la página', 'Bloquea a los usuarios', 'Borra el script del servidor'], 'Defensa en profundidad contra XSS.', 4],
    { tf: 'La política del mismo origen impide que una página envíe cualquier petición a otro origen.', v: false, e: 'Puede enviarla; lo que no puede es leer la respuesta sin permiso.', l: 3 },
    { tf: 'Los service workers solo funcionan en HTTPS o en localhost.', v: true, e: 'Por su poder de interceptar peticiones.', l: 1 },
    { c: 'Escribe «mismoOrigen(a, b)»: recibe dos URL como texto y devuelve true si tienen el mismo esquema, dominio y puerto. Hazlo sin new URL; los puertos por defecto son 80 (http) y 443 (https).', f: 'mismoOrigen', p: ['a', 'b'], t: [[['https://patioapp.pe/a', 'https://patioapp.pe/b?x=1'], true], [['https://patioapp.pe', 'https://api.patioapp.pe'], false], [['http://patioapp.pe', 'https://patioapp.pe'], false], [['https://patioapp.pe:8443/', 'https://patioapp.pe/'], false], [['https://patioapp.pe:443/x', 'https://patioapp.pe/'], true]], sol: '  const f = u => { const m = /^([a-z]+):\\/\\/([^\\/:?#]+)(?::(\\d+))?/i.exec(u); const e = m[1].toLowerCase(); return e + \'://\' + m[2].toLowerCase() + \':\' + (m[3] || { http: \'80\', https: \'443\' }[e]); };\n  return f(a) === f(b);', l: 2 },
    { c: 'Escribe «permitirOrigen(origen, lista)»: devuelve el valor para Access-Control-Allow-Origin: el propio origen si está en la lista, o null si no.', f: 'permitirOrigen', p: ['origen', 'lista'], t: [[['https://app.patioapp.pe', ['https://app.patioapp.pe', 'http://localhost:5173']], 'https://app.patioapp.pe'], [['https://malo.com', ['https://app.patioapp.pe']], null]], sol: '  return lista.includes(origen) ? origen : null;', l: 1 },
    { c: 'Escribe «pendientes(cola)»: recibe ingresos { id, estado } y devuelve los id con estado "pendiente", sin duplicados y en el orden original.', f: 'pendientes', p: ['cola'], t: [[[[{ id: 'a', estado: 'pendiente' }, { id: 'b', estado: 'enviado' }, { id: 'a', estado: 'pendiente' }, { id: 'c', estado: 'pendiente' }]], ['a', 'c']], [[[]], []]], sol: '  const vistos = new Set(), r = [];\n  for (const i of cola) if (i.estado === \'pendiente\' && !vistos.has(i.id)) { vistos.add(i.id); r.push(i.id); }\n  return r;', l: 2 }
  ],
  gen: function (g) {
    var al = [['Preferencia de tema oscuro', 'localStorage'], ['Sesión del usuario', 'Cookie HttpOnly'], ['Cientos de ingresos pendientes sin conexión', 'IndexedDB'], ['Paso actual de un formulario en una pestaña', 'sessionStorage'], ['Archivos de la aplicación para abrir sin red', 'Cache Storage']];
    al.forEach(function (a) { g.mcq(2, '¿Dónde conviene guardar esto en el navegador? ' + a[0], a[1], ['localStorage', 'Cookie HttpOnly', 'IndexedDB', 'sessionStorage', 'Cache Storage'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Almacenamiento del navegador.'); });
    var or = [['https://patioapp.pe/a', 'https://patioapp.pe/b', 'Sí'], ['https://patioapp.pe', 'http://patioapp.pe', 'No'], ['https://patioapp.pe', 'https://www.patioapp.pe', 'No'], ['https://patioapp.pe', 'https://patioapp.pe:443', 'Sí'], ['http://localhost:3000', 'http://localhost:5173', 'No']];
    or.forEach(function (o) { g.mcq(3, '¿Son el mismo origen ' + o[0] + ' y ' + o[1] + '?', o[2], [o[2] === 'Sí' ? 'No' : 'Sí', 'Solo con CORS', 'Depende de la ruta'], 'Esquema, dominio y puerto (443 es el puerto por defecto de HTTPS).'); });
    var es = [['Archivos con hash en el nombre que nunca cambian', 'Primero la caché'], ['Precios que deben estar al día pero mostrarse sin red', 'Primero la red, con respaldo en caché'], ['Una lista que puede mostrarse algo vieja y actualizarse después', 'Obsoleto mientras se revalida']];
    es.forEach(function (e) { g.mcq(3, '¿Qué estrategia de service worker conviene? ' + e[0], e[1], ['Primero la caché', 'Primero la red, con respaldo en caché', 'Obsoleto mientras se revalida', 'Sin caché'].filter(function (x) { return x !== e[1]; }), 'Estrategias de caché.'); });
  },
  checks: [
    ['Explica la política del mismo origen y para qué sirve CORS.', 'El código de un origen no puede leer datos de otro; CORS permite que un servidor autorice explícitamente a ciertos orígenes a leer sus respuestas.'],
    ['Compara cookies, localStorage e IndexedDB y di dónde va la sesión.', 'Cookies pequeñas que viajan en cada petición; localStorage pequeño y síncrono; IndexedDB grande y asíncrona; la sesión en una cookie HttpOnly, Secure y SameSite.'],
    ['¿Qué es un service worker y qué permite una PWA?', 'Un proxy en segundo plano que gestiona la caché; una PWA es instalable, funciona sin conexión y puede recibir notificaciones.'],
    ['¿Qué es la Content Security Policy?', 'Una cabecera que limita de dónde se cargan y ejecutan recursos, defensa en profundidad contra XSS.']
  ],
  cites: ['Barth, A. (2011). RFC 6454: The Web Origin Concept. IETF.', 'WHATWG. *Fetch Standard* (CORS protocol). fetch.spec.whatwg.org.', 'W3C (2022). *Service Workers*. w3.org/TR/service-workers.', 'W3C (2023). *Content Security Policy Level 3*. w3.org/TR/CSP3.', 'Russell, A. (2015). Progressive Web Apps: Escaping Tabs Without Losing Our Soul. infrequently.org.'],
  project: { t: 'Una aplicación web que funciona sin conexión',
    goal: 'Construir una PWA con almacenamiento local, sincronización y una configuración de seguridad correcta.',
    steps: ['Crea una aplicación pequeña con un formulario y una lista, con manifiesto y service worker.', 'Implementa la caché de la aplicación y una estrategia de datos con respaldo sin conexión.', 'Guarda en IndexedDB los registros creados sin conexión y sincronízalos al volver la red con claves de idempotencia.', 'Configura en la API CORS solo para tu origen, la sesión en cookie HttpOnly, Secure y SameSite, y una Content Security Policy.', 'Prueba con la red desactivada en las herramientas de desarrollo y audita con Lighthouse.'],
    deliver: 'El repositorio, la aplicación publicada y el informe de Lighthouse.' },
  hito: ['Convierte la pantalla de ingresos de PatioApp en una PWA que guarda ingresos sin conexión en IndexedDB y los sincroniza.', 'Configura en la API de PatioApp CORS por lista de orígenes, cookies de sesión seguras y una Content Security Policy.']
});
SDC.after('m9.browser', 'm9.front');


SDC.D('m9.back', `## Autenticación y autorización en la API
Casi toda API necesita saber **quién** hace la petición (autenticación) y **qué** puede hacer (autorización). Hay dos formas principales de llevar la identidad entre peticiones:
- **Sesiones en el servidor:** al iniciar sesión, el servidor crea una sesión (en memoria, Redis o la base) y envía al navegador una cookie con su identificador aleatorio. Revocar es trivial: se borra la sesión. Es la opción más simple y segura para aplicaciones web con su propio frontend.
- **Tokens firmados** (JWT): el servidor entrega un token que contiene los datos del usuario firmados; cualquier servidor con la clave puede verificarlo sin consultar una base. Útil entre servicios o para clientes móviles, pero revocar antes de que expire es difícil, así que se usan tokens de vida corta con un token de renovación.
La autorización se verifica **en cada ruta, en el servidor**, idealmente con una función central («puede(usuario, 'cobrar', estadia)»), no escondiendo botones en el frontend. La vulnerabilidad más frecuente en APIs, según OWASP, es justamente la **autorización rota a nivel de objeto**: cambiar «/api/estadias/101» por «/api/estadias/102» y ver la estadía de otro cliente porque la ruta solo verificaba que hubiera sesión. Los detalles (contraseñas con hash, OAuth, MFA) los verás en seguridad de software.

## Trabajo en segundo plano
No todo debe hacerse mientras el usuario espera. Enviar un correo, generar un PDF, sincronizar con SUNAT o procesar un archivo grande se encolan como **tareas** y las procesa un **trabajador** aparte: la API responde 202 (*Accepted*) con un identificador para consultar el estado. Las colas (BullMQ sobre Redis, RabbitMQ, SQS) reintentan las tareas que fallan, con espera creciente, y separan los picos de carga de la experiencia del usuario. Si el trabajador se cae, las tareas esperan en la cola en lugar de perderse.`);

SDC.D('m9.browser', `## La cadena de navegación segura
Cuando un usuario abre la aplicación, varias cabeceras de seguridad trabajan juntas. **HSTS** («Strict-Transport-Security») obliga al navegador a usar siempre HTTPS con ese dominio, incluso si el usuario escribe «http://». **X-Content-Type-Options: nosniff** impide que el navegador "adivine" que un archivo de texto es un script. **frame-ancestors** en la CSP (o el antiguo «X-Frame-Options») impide que otra página incruste la tuya en un marco invisible para engañar al usuario con clics (*clickjacking*). **Referrer-Policy** controla qué parte de la URL se envía a otros sitios al seguir un enlace, para no filtrar identificadores en la dirección. Herramientas como el observatorio de seguridad de Mozilla analizan un sitio y dicen qué cabeceras faltan. En Express, el middleware Helmet las configura con valores razonables en una línea.

## Permisos con respeto
Las capacidades sensibles (ubicación, cámara, notificaciones) deben pedirse **en contexto**, cuando el usuario entiende para qué: pedir permiso de notificaciones apenas se abre la página produce rechazos automáticos, y un rechazo es difícil de revertir porque el navegador no vuelve a preguntar. Lo correcto es explicar primero en la interfaz ("¿Quieres que te avisemos cuando tu unidad esté lista?") y solo después llamar a la API del navegador.`);
})();
