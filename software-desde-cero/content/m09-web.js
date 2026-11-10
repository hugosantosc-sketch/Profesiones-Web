(function () {
var M = SDC.M, S = SDC.S;
M('m9', { title: 'Redes y desarrollo web', desc: 'Qué pasa exactamente cuando escribes una dirección y presionas Enter, y cómo se construyen las aplicaciones que viven en internet.',
  thread: 'PatioApp se vuelve web: una API REST entrega los vehículos en JSON, una interfaz los muestra y se actualiza sin recargar la página.',
  books: '*Computer Networking: A Top-Down Approach* (Kurose y Ross), *HTTP: The Definitive Guide* (Gourley y Totty), *You Don\'t Know JS* (Simpson), *Refactoring UI* (Wathan y Schoger).',
  uni: 'Redes y Comunicaciones de Datos y Aplicaciones Web (UPC), Taller de Programación Web y Desarrollo Full Stack (UTP), IHC (UTEC).' });

S('m9', 'm9.tcp', { title: 'Cómo funciona internet',
  ask: '¿Qué protocolo o concepto de red interviene?',
  lesson: `
> **La idea en simple.** Internet es un correo postal gigante. Tu mensaje se parte en paquetes, cada uno con dirección de destino, y pasa por muchas oficinas (enrutadores). Pueden llegar desordenados, y al final se arman de nuevo.

## Las capas
| Capa | Función | Ejemplos |
| Aplicación | el mensaje con significado | HTTP, DNS, SMTP |
| Transporte | conversación entre programas | TCP, UDP |
| Red | llegar a la máquina correcta | IP |
| Enlace | el salto físico siguiente | Ethernet, WiFi |
Cada capa envuelve a la anterior como sobres dentro de sobres, y solo le importa su trabajo.

## Qué pasa al visitar una web
:::flow DNS: nombre a IP | Conexión TCP | Cifrado TLS | Petición HTTP | Respuesta HTML | Navegador dibuja

## TCP y UDP
- **TCP:** confiable y ordenado, reenvía lo perdido. Inicia con el saludo de 3 pasos: SYN, SYN-ACK, ACK. Lo usan la web y el correo.
- **UDP:** rápido, sin garantías. Lo usan videollamadas y juegos. Si un paquete se pierde, no vale la pena esperarlo.

## IP y puertos
La IP identifica la máquina; el **puerto** identifica el programa dentro de ella. Como un edificio y un departamento. Puertos típicos: 80 HTTP, 443 HTTPS, 22 SSH, 5432 PostgreSQL.

## DNS
Es la guía telefónica de internet: traduce nombres en IP, con caché en muchos niveles. Por eso un cambio de DNS tarda en propagarse.

## Puntos que no debes omitir
- **Latencia:** cuánto tarda un mensaje. **Ancho de banda:** cuánto cabe. No son lo mismo.
- Una CDN pone copias cerca del usuario porque la luz tiene un límite.
- NAT y las IP privadas (192.168.x.x) permiten compartir una sola IP pública.
- IPv4 tiene 2³² direcciones, y se agotaron; por eso existe IPv6.

! Error común: creer que más ancho de banda arregla todo. Si la latencia es de 200 ms, una página con 50 idas y vueltas tardará 10 segundos.`,
  links: [['m9.http', 'HTTP se apoya sobre esta red'], ['m1.cpu', 'la red es el nivel más lento de la jerarquía'], ['m13.dist', 'la red puede fallar: es la primera verdad de los sistemas distribuidos'], ['m16.crypto', 'TLS protege lo que viaja']],
  read: 'Kurose y Ross, *Computer Networking*, capítulos 1 a 4.',
  terms: [
    ['IP', 'protocolo que lleva paquetes a una máquina según su dirección', ['«200.48.225.130» identifica un servidor.', 'Los enrutadores miran este dato para reenviar.', 'No garantiza orden ni entrega.']],
    ['TCP', 'protocolo de transporte confiable y ordenado', ['Una descarga llega completa.', 'Reenvía los paquetes perdidos.', 'Inicia con un saludo de tres pasos.']],
    ['UDP', 'protocolo de transporte simple, rápido y sin garantías', ['Una videollamada tolera perder algún dato.', 'Un juego en línea prefiere rapidez.', 'Las consultas DNS suelen ir por él.']],
    ['DNS', 'sistema que traduce nombres de dominio a direcciones IP', ['«claude.ai» se convierte en una IP.', 'Un sitio cambió de servidor y aún no se ve.', 'Tu computadora guarda en caché el resultado.']],
    ['Puerto', 'número que identifica un servicio dentro de una máquina', ['HTTPS escucha en 443.', 'Un servidor local corre en 3000.', 'Dos apps no pueden escuchar en el mismo a la vez.']],
    ['Latencia', 'tiempo que tarda un dato en ir de un punto a otro', ['Un ping de 180 ms a otro continente.', 'Un servidor en Lima responde antes que uno en Virginia.', 'Una CDN busca reducir esta medida.']],
    ['Ancho de banda', 'cantidad de datos que se pueden transmitir por unidad de tiempo', ['Un plan de 100 Mbps.', 'Ver video en 4K requiere bastante.', 'Es el ancho de la tubería.']]
  ],
  q: [
    { o: 'Ordena lo que ocurre al visitar una web por primera vez.', s: ['Resolver el nombre con DNS', 'Abrir conexión TCP', 'Negociar cifrado TLS', 'Enviar la petición HTTP', 'Recibir la respuesta y dibujar'], e: 'Es la pregunta de entrevista más clásica.', l: 3 },
    { o: 'Ordena las capas de abajo hacia arriba.', s: ['Enlace', 'Red', 'Transporte', 'Aplicación'], e: 'Cada capa se apoya en la inferior.', l: 2 },
    ['¿Por qué las videollamadas prefieren UDP?', 'Porque un dato tardío ya no sirve, así que no se espera reenviarlo', ['Porque es más seguro', 'Porque TCP no transmite video', 'Porque evita usar IP'], 'Es preferible un pequeño corte que un retraso creciente.', 3],
    ['Una página necesita 40 peticiones secuenciales y la latencia es de 100 ms. ¿Tiempo mínimo?', '4 segundos', ['100 ms', '40 ms', '400 segundos'], '40 × 100 ms, sin importar el ancho de banda.', 4],
    ['¿Cuántas direcciones permite IPv4?', 'Unos 4300 millones', ['Unos 65 000', 'Un billón', 'Infinitas'], '2³² ≈ 4 294 967 296.', 3],
    { c: 'Valida IPv4: «ipValida(s)» debe tener 4 partes de 0 a 255, solo dígitos y sin ceros a la izquierda.', f: 'ipValida', p: ['s'], t: [[['192.168.0.1'], true], [['256.1.1.1'], false], [['1.2.3'], false], [['01.2.3.4'], false]], sol: "  const p = s.split('.');\n  return p.length === 4 && p.every(x => /^\\d+$/.test(x) && String(Number(x)) === x && Number(x) <= 255);", l: 3 },
    { c: 'Escribe «partirEnPaquetes(msg, tam)» que divida un texto en trozos de tam caracteres.', f: 'partirEnPaquetes', p: ['msg', 'tam'], t: [[['abcde', 2], ['ab', 'cd', 'e']], [['', 3], []]], sol: '  const r = [];\n  for (let i = 0; i < msg.length; i += tam) r.push(msg.slice(i, i + tam));\n  return r;', l: 2 },
    { c: 'Reordena paquetes: «reensamblar(p)» recibe [{seq, datos}] desordenados y devuelve el texto completo.', f: 'reensamblar', p: ['p'], t: [[[[{ seq: 2, datos: 'b' }, { seq: 1, datos: 'a' }]], 'ab'], [[[]], '']], sol: "  return [...p].sort((a, b) => a.seq - b.seq).map(x => x.datos).join('');", l: 3 },
    { c: 'Convierte IP a entero: «ipANumero(s)» calcula el valor de 32 bits de una dirección.', f: 'ipANumero', p: ['s'], t: [[['0.0.0.1'], 1], [['0.0.1.0'], 256], [['1.0.0.0'], 16777216]], sol: "  return s.split('.').reduce((v, x) => v * 256 + Number(x), 0);", l: 4 }
  ],
  gen: function (g) {
    var ptos = [['HTTP', 80], ['HTTPS', 443], ['SSH', 22], ['PostgreSQL', 5432], ['MySQL', 3306], ['DNS', 53], ['SMTP', 25], ['Redis', 6379]];
    ptos.forEach(function (p) { g.input(1, '¿En qué puerto escucha por defecto ' + p[0] + '?', p[1], p[0] + ' usa el puerto ' + p[1] + '.'); });
    g.times(8, function (R) { var n = R.int(5, 60), l = R.pick([20, 50, 100, 200]); g.input(2, 'Una página hace ' + n + ' peticiones secuenciales con ' + l + ' ms de latencia cada una. ¿Cuántos ms tarda como mínimo?', n * l, n + ' × ' + l + '.'); });
    g.times(8, function (R) { var mb = R.pick([10, 20, 50, 100]), s = R.pick([100, 500, 1000]); g.input(3, '¿Cuántos segundos tarda en bajar un archivo de ' + s + ' MB con una conexión de ' + mb + ' Mbps? (1 byte = 8 bits)', s * 8 / mb, s + ' × 8 / ' + mb + '.'); });
  } });

S('m9', 'm9.http', { title: 'HTTP y APIs REST',
  ask: '¿Qué concepto de HTTP o REST se aplica?',
  lesson: `
> **La idea en simple.** HTTP es como pedir en un restaurante: haces un pedido con un formato acordado y recibes una respuesta con un código ("listo", "se acabó", "te equivocaste de mesa"). El mozo no recuerda tu pedido anterior: HTTP **no tiene estado**.

## Anatomía
~~~txt
POST /vehiculos HTTP/1.1            ← método y ruta
Host: api.patioapp.pe               ← cabeceras
Content-Type: application/json
Authorization: Bearer abc123

{"placa": "ABC-123"}                ← cuerpo

HTTP/1.1 201 Created                ← código de estado
Location: /vehiculos/42
~~~

## Métodos
| Método | Uso | Idempotente | Seguro |
| GET | leer | sí | sí |
| POST | crear | no | no |
| PUT | reemplazar | sí | no |
| PATCH | modificar en parte | no necesariamente | no |
| DELETE | borrar | sí | no |

**Idempotente:** repetirlo deja el mismo estado. Clave cuando hay reintentos.

## Códigos de estado
- **2xx éxito:** 200 OK, 201 Creado, 204 Sin contenido.
- **3xx redirección:** 301 Movido, 304 No modificado.
- **4xx culpa del cliente:** 400 Mal pedido, 401 Sin autenticar, 403 Prohibido, 404 No existe, 409 Conflicto, 429 Demasiadas peticiones.
- **5xx culpa del servidor:** 500 Error interno, 502 Puerta de enlace, 503 No disponible.

## Diseño REST
Los **recursos** son sustantivos en plural; el método es el verbo.
~~~txt
GET    /vehiculos?estado=pendiente&pagina=2
POST   /vehiculos
GET    /vehiculos/42
PATCH  /vehiculos/42
DELETE /vehiculos/42
GET    /vehiculos/42/revisiones
~~~

## Puntos que no debes omitir
- Pagina las listas: jamás devuelvas un millón de filas.
- Versiona la API («/v1/»); otros dependen de ella.
- Las cookies, la sesión y los tokens simulan estado encima de un protocolo sin estado.
- CORS es la regla del navegador que limita llamadas a otro dominio.
- GraphQL y gRPC son alternativas con distintas ventajas.

! Error común: devolver 200 con un cuerpo «{"error": "no existe"}». Los clientes y las métricas dependen del código real.`,
  links: [['m9.tcp', 'HTTP viaja sobre TCP'], ['m3.arr', 'JSON es el formato de los datos'], ['m9.async', 'el navegador lo llama de forma asíncrona'], ['m13.styles', 'la API es el contrato entre capas o servicios'], ['m16.auth', 'la autenticación viaja en cabeceras']],
  read: 'Gourley y Totty, *HTTP: The Definitive Guide*; Fielding, tesis sobre REST.',
  terms: [
    ['GET', 'método para leer un recurso sin modificarlo', ['Pedir la lista de vehículos.', 'Se puede guardar en caché.', 'Sus parámetros van en la URL.']],
    ['POST', 'método que crea un recurso o desencadena una acción', ['Registrar un vehículo nuevo.', 'Enviar un formulario de compra.', 'Repetirlo puede crear duplicados.']],
    ['Idempotencia', 'propiedad de que repetir la operación deje el mismo estado', ['Un DELETE repetido no borra más.', 'Reintentar un PUT es seguro.', 'Una clave de idempotencia evita cobrar dos veces.']],
    ['Código 404', 'respuesta de que el recurso solicitado no existe', ['Se pide /vehiculos/999 y no está.', 'Un enlace roto.', 'La culpa es de la ruta pedida.']],
    ['Código 401', 'respuesta de que hace falta autenticarse', ['Falta el token.', 'La sesión ha expirado.', 'Se redirige al inicio de sesión.']],
    ['Código 403', 'respuesta de que estás identificado pero no tienes permiso', ['Un chofer intenta borrar usuarios.', 'Sabe quién eres, pero no te deja pasar.', 'Volver a iniciar sesión no lo resuelve.']],
    ['Código 500', 'respuesta de error interno del servidor', ['Una excepción sin manejar en el backend.', 'La base de datos falló durante la petición.', 'Se debe revisar en los registros del servidor.']]
  ],
  q: [
    ['¿Qué ruta es más REST para obtener las revisiones del vehículo 42?', 'GET /vehiculos/42/revisiones', ['GET /obtenerRevisiones?v=42', 'POST /revisiones/get/42', 'GET /vehiculo-revisiones-42'], 'Sustantivos y jerarquía; el verbo es el método.', 3],
    ['Una pasarela de pago tarda y el cliente reintenta un POST /pagos. ¿Cómo evitas el doble cobro?', 'Con una clave de idempotencia en la petición', ['Cambiando a GET', 'Prohibiendo los reintentos', 'Devolviendo siempre 500'], 'El servidor reconoce la clave y no procesa dos veces.', 4],
    ['El usuario envía una placa con formato inválido. ¿Qué código devuelves?', '400', ['200', '500', '301'], 'El error es del cliente.', 2],
    ['¿Por qué se dice que HTTP no tiene estado?', 'Cada petición se entiende sola; el servidor no recuerda las anteriores por protocolo', ['Porque no guarda archivos', 'Porque no usa TCP', 'Porque solo admite GET'], 'Facilita escalar: cualquier servidor puede atender.', 3],
    ['Te llegan muchos 503 tras un despliegue. ¿Qué es lo más probable?', 'El servicio no está disponible o está sobrecargado', ['Los usuarios escribieron mal la URL', 'La caché está al día', 'Falta el token'], '5xx apunta al servidor.', 3],
    { c: 'Escribe «familia(c)» que devuelva "éxito", "redirección", "cliente" o "servidor" según el código.', f: 'familia', p: ['c'], t: [[[201], 'éxito'], [[301], 'redirección'], [[404], 'cliente'], [[503], 'servidor']], sol: "  return ['éxito', 'redirección', 'cliente', 'servidor'][Math.floor(c / 100) - 2];", l: 2 },
    { c: 'Escribe «leerQuery(url)» que devuelva un objeto con los parámetros de la URL. Sin URLSearchParams.', f: 'leerQuery', p: ['url'], t: [[['/v?a=1&b=2'], { a: '1', b: '2' }], [['/v'], {}]], sol: "  const q = url.split('?')[1];\n  if (!q) return {};\n  const r = {};\n  for (const p of q.split('&')) { const [k, v] = p.split('='); r[k] = v; }\n  return r;", l: 3 },
    { c: 'Escribe un mini enrutador: «enrutar(metodo, ruta)» para GET /vehiculos → "listar", POST /vehiculos → "crear", GET /vehiculos/:id → "ver:id"; otro caso → "404".', f: 'enrutar', p: ['metodo', 'ruta'], t: [[['GET', '/vehiculos'], 'listar'], [['POST', '/vehiculos'], 'crear'], [['GET', '/vehiculos/42'], 'ver:42'], [['DELETE', '/x'], '404']], sol: "  if (ruta === '/vehiculos') {\n    if (metodo === 'GET') return 'listar';\n    if (metodo === 'POST') return 'crear';\n  }\n  const m = ruta.match(/^\\/vehiculos\\/(\\w+)$/);\n  if (m && metodo === 'GET') return 'ver:' + m[1];\n  return '404';", l: 3 },
    { c: 'Escribe «paginar(l, pagina, tam)» con páginas desde 1, que devuelva {items, total, paginas}.', f: 'paginar', p: ['l', 'pagina', 'tam'], t: [[[[1, 2, 3], 2, 2], { items: [3], total: 3, paginas: 2 }], [[[], 1, 5], { items: [], total: 0, paginas: 0 }]], sol: '  const i = (pagina - 1) * tam;\n  return { items: l.slice(i, i + tam), total: l.length, paginas: Math.ceil(l.length / tam) };', l: 3 },
    { c: 'Limita las peticiones: «limitador(ts, max, ventana)» recibe tiempos en segundos de peticiones en orden y devuelve cuántas se aceptan si solo se permiten max en cada ventana móvil de esa duración.', f: 'limitador', p: ['ts', 'max', 'ventana'], t: [[[[0, 1, 2, 3], 2, 10], 2], [[[0, 11, 22], 1, 10], 3], [[[], 5, 5], 0]], sol: '  const ac = [];\n  let ok = 0;\n  for (const t of ts) {\n    while (ac.length && t - ac[0] >= ventana) ac.shift();\n    if (ac.length < max) { ac.push(t); ok++; }\n  }\n  return ok;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Se creó un vehículo nuevo.', 201], ['Se devolvió la lista correctamente.', 200], ['Se borró y no hay nada que devolver.', 204], ['El recurso se mudó a otra URL de forma permanente.', 301], ['El JSON enviado está mal formado.', 400], ['Falta el token de acceso.', 401], ['El usuario no tiene permiso.', 403], ['El vehículo no existe.', 404], ['La placa ya está registrada.', 409], ['Se envían demasiadas peticiones en un minuto.', 429], ['Se lanzó una excepción sin manejar.', 500], ['El servidor está en mantenimiento.', 503]];
    c.forEach(function (x, i) { g.input(i < 8 ? 1 : 2, '¿Qué código de estado HTTP corresponde?\n' + x[0], x[1], 'El código apropiado es ' + x[1] + '.'); });
    [['Consultar un vehículo.', 'GET'], ['Registrar un vehículo nuevo.', 'POST'], ['Reemplazar por completo una ficha.', 'PUT'], ['Cambiar solo el estado.', 'PATCH'], ['Eliminar un vehículo.', 'DELETE']].forEach(function (x) { g.mcq(1, '¿Qué método HTTP usas?\n' + x[0], x[1], ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Se usa ' + x[1] + '.'); });
  } });

S('m9', 'm9.front', { title: 'Frontend: HTML, CSS, DOM y usabilidad',
  ask: '¿Qué concepto de frontend aplica?',
  lesson: `
> **La idea en simple.** Una página es una casa: el **HTML** es la estructura (paredes y puertas), el **CSS** es la decoración y el **JavaScript** es la electricidad que hace que las cosas funcionen.

## HTML semántico
Usa etiquetas que digan qué son: «nav», «main», «button». Esto ayuda a lectores de pantalla, buscadores y a tu yo del futuro. Un «div» con clic no sirve con teclado; un «button» sí.

## CSS
- **Modelo de caja:** contenido, padding, borde y margen.
- **Especificidad:** id gana a clase y clase gana a etiqueta.
- **Flexbox** para filas y columnas; **Grid** para cuadrículas.
- **Diseño adaptable:** «@media» para distintos anchos, y siempre móvil primero.

## El DOM
El navegador convierte el HTML en un árbol de objetos que JavaScript puede cambiar.
~~~txt
const lista = document.querySelector("#autos");
const item = document.createElement("li");
item.textContent = "ABC-123";
lista.appendChild(item);
boton.addEventListener("click", () => { ... });
~~~

## Componentes y estado
React, Vue y Svelte organizan la interfaz en componentes reutilizables, y la interfaz se vuelve una función del estado: **UI = f(estado)**. Cambias el dato y la pantalla se actualiza sola.
~~~js
// La idea en miniatura
function vista(estado) {
  return "Autos: " + estado.autos.length + (estado.autos.length ? "" : " (vacío)");
}
console.log(vista({ autos: [] }));
console.log(vista({ autos: ["A", "B"] }));
~~~

## Interacción humano-computadora
- **Visibilidad del estado:** muestra qué está pasando.
- **Prevención de errores** y mensajes que explican cómo seguir.
- **Accesibilidad:** contraste, teclado, texto alternativo. En Perú y el mundo, más gente de la que crees la necesita.
- **Rendimiento percibido:** responder en menos de 100 ms se siente instantáneo.

## Puntos que no debes omitir
- Nunca insertes texto de usuario con «innerHTML»: abre la puerta a XSS. Usa «textContent».
- Toda validación en el navegador se repite en el servidor.
- Prueba con móvil y conexión lenta, no solo en tu PC.

! Error común: construir la interfaz sin pensar en estados vacíos, de carga y de error. Son la mitad de la experiencia real.`,
  links: [['m4.trees', 'el DOM es un árbol'], ['m5.pat2', 'los eventos son el patrón Observer'], ['m16.owasp', 'innerHTML con datos de usuario crea XSS'], ['m9.async', 'la interfaz no debe congelarse esperando datos'], ['m11.req', 'la usabilidad es un requisito no funcional']],
  read: 'Krug, *Don\'t Make Me Think*; Norman, *The Design of Everyday Things*; MDN Web Docs.',
  terms: [
    ['HTML semántico', 'uso de etiquetas que describen el significado del contenido', ['Usar «nav» en vez de «div» para el menú.', 'Un lector de pantalla entiende la estructura.', 'Un «button» responde al teclado sin código extra.']],
    ['Modelo de caja', 'forma en que CSS calcula tamaño con contenido, relleno, borde y margen', ['Un elemento de 100 px mide más al sumarle padding.', '«box-sizing: border-box» cambia el cálculo.', 'Dos márgenes verticales se colapsan.']],
    ['Especificidad', 'regla de CSS que decide qué estilo gana', ['Un id se impone a una clase.', 'Un estilo no aplica porque otro es más concreto.', 'Se abusa de !important al no entenderla.']],
    ['DOM', 'representación en árbol de la página que JavaScript puede manipular', ['«document.querySelector» busca nodos.', 'Se agrega una fila a una tabla sin recargar.', 'Las DevTools muestran su estado actual.']],
    ['Diseño adaptable', 'diseño que se ajusta a distintos tamaños de pantalla', ['Tres columnas en PC y una en celular.', 'Se usan media queries.', 'Se diseña primero para móvil.']],
    ['Componente', 'pieza reutilizable que combina estructura, estilo y comportamiento', ['Un botón usado en 30 pantallas.', 'Una tarjeta de vehículo en React.', 'Recibe datos por props.']],
    ['Accesibilidad', 'hacer que todo se pueda usar sin importar las capacidades de cada persona', ['Se puede navegar solo con teclado.', 'Una imagen tiene texto alternativo.', 'El contraste permite leer con baja visión.']]
  ],
  q: [
    ['¿Cuál selector gana?', '#auto', ['.auto', 'div', 'div p'], 'Un id tiene mayor especificidad.', 2],
    ['Un elemento tiene width 100px, padding 10px y border 1px con box-sizing normal. ¿Cuánto mide de ancho?', '122px', ['100px', '111px', '120px'], '100 + 20 + 2.', 3],
    ['Un usuario escribe un comentario. ¿Cómo lo muestras seguro?', 'el.textContent = comentario', ['el.innerHTML = comentario', 'document.write(comentario)', 'eval(comentario)'], 'textContent no interpreta etiquetas.', 4],
    ['¿Qué significa UI = f(estado)?', 'La interfaz se deriva de los datos; no se manipula a mano en muchos lugares', ['La interfaz es una función matemática lenta', 'La interfaz nunca cambia', 'El estado depende de la interfaz'], 'Es la idea central de React.', 4],
    ['¿Qué estado de pantalla se olvida más a menudo?', 'Vacío, cargando y error', ['Solo el exitoso', 'El de colores', 'El del logo'], 'El camino feliz es solo uno de los estados.', 3],
    { c: 'Escapa HTML: «escapar(s)» convierte & < > " en sus entidades para evitar XSS.', f: 'escapar', p: ['s'], t: [[['<b>'], '&lt;b&gt;'], [['a&b'], 'a&amp;b'], [['"x"'], '&quot;x&quot;']], sol: "  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');", h: 'Reemplaza primero el & para no escapar dos veces.', l: 3 },
    { c: 'Calcula especificidad simple: «peso(sel)» devuelve [ids, clases, etiquetas] de un selector sin espacios complicados, ej. "div.a#b" → [1,1,1].', f: 'peso', p: ['sel'], t: [[['div.a#b'], [1, 1, 1]], [['p'], [0, 0, 1]], [['.a.b'], [0, 2, 0]], [['#x'], [1, 0, 0]]], sol: "  const n = r => (sel.match(r) || []).length;\n  return [n(/#[\\w-]+/g), n(/\\.[\\w-]+/g), n(/(^|\\s)[a-zA-Z][\\w-]*/g)];", l: 4 },
    { c: 'Renderiza a texto: «filas(autos)» devuelve el HTML de una lista con <li>placa</li> escapando la placa y, si está vacía, "<p>Sin vehículos</p>".', f: 'filas', p: ['autos'], t: [[[[{ placa: 'A' }]], '<ul><li>A</li></ul>'], [[[]], '<p>Sin vehículos</p>'], [[[{ placa: '<x>' }]], '<ul><li>&lt;x&gt;</li></ul>']], sol: "  if (!autos.length) return '<p>Sin vehículos</p>';\n  const e = s => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n  return '<ul>' + autos.map(a => '<li>' + e(a.placa) + '</li>').join('') + '</ul>';", l: 3 }
  ],
  gen: function (g) {
    g.times(14, function (R) { var w = R.pick([100, 200, 300]), p = R.pick([5, 10, 20]), b = R.pick([1, 2, 4]); g.input(2, 'Con box-sizing normal, width ' + w + 'px, padding ' + p + 'px y border ' + b + 'px, ¿cuál es el ancho total en px?', w + 2 * p + 2 * b, w + ' + 2×' + p + ' + 2×' + b + '.'); });
    g.times(8, function (R) { var w = R.pick([100, 200, 300]), p = R.pick([5, 10, 20]); g.input(3, 'Con box-sizing border-box, width ' + w + 'px y padding ' + p + 'px, ¿cuánto mide el total en px?', w, 'En border-box, width ya incluye el padding.'); });
  } });

S('m9', 'm9.async', { title: 'JavaScript asíncrono',
  ask: '¿Qué concepto de asincronía se ve?',
  lesson: `
> **La idea en simple.** Un mozo no espera de pie en la cocina hasta que tu plato esté listo. Toma el pedido, atiende otras mesas y vuelve cuando lo llaman. JavaScript trabaja igual: un solo hilo que nunca se queda esperando.

## El bucle de eventos
:::flow Pila de llamadas | Tarea asíncrona en segundo plano | Cola de tareas | Bucle de eventos | De vuelta a la pila
~~~js
console.log("1");
setTimeout(() => console.log("3: temporizador"), 0);
Promise.resolve().then(() => console.log("2: promesa"));
console.log("Fin del código síncrono");
~~~
Primero termina todo lo síncrono, luego las promesas (microtareas) y al final los temporizadores.

## Promesas y async/await
Una **promesa** representa un resultado futuro: pendiente, cumplida o rechazada.
~~~js
function traerAuto(placa) {
  return new Promise((ok, mal) => {
    setTimeout(() => placa ? ok({ placa, km: 100 }) : mal(new Error("Sin placa")), 10);
  });
}
async function main() {
  try {
    const a = await traerAuto("ABC");
    console.log(a.km);
    await traerAuto("");
  } catch (e) {
    console.log("Error:", e.message);
  }
}
main();
~~~

## Paralelo o en serie
«await» dentro de un bucle va uno por uno. «Promise.all» lanza todos a la vez.
~~~txt
for (const p of placas) await traer(p);          // lento: uno por uno
await Promise.all(placas.map(traer));            // rápido: en paralelo
~~~
Promise.all falla si falla uno; Promise.allSettled espera a todos.

## Puntos que no debes omitir
- Un cálculo pesado bloquea el único hilo y congela la pantalla. Usa Web Workers (lo que hacen los ejercicios de esta app).
- Maneja siempre el rechazo: una promesa sin «catch» se pierde.
- Muestra estados de carga, y gestiona respuestas que llegan fuera de orden.
- «await» solo pausa esa función, no todo el programa.

! Error común: olvidar el «await». Tendrás una promesa en la mano en lugar del valor, y «if (promesa)» siempre será verdadero.`,
  links: [['m9.http', 'cada llamada a la API es asíncrona'], ['m8.conc', 'un solo hilo evita muchas carreras, pero no todas'], ['m5.pat2', 'las suscripciones a eventos son Observer'], ['m4.stack', 'la cola de tareas es una cola FIFO']],
  read: 'Simpson, *You Don\'t Know JS: Async & Performance*; Haverbeke, capítulo 11.',
  terms: [
    ['Bucle de eventos', 'mecanismo que pasa tareas de la cola a la pila cuando esta queda vacía', ['Un setTimeout de 0 ms se ejecuta después del código actual.', 'Node atiende miles de conexiones con un hilo.', 'Si la pila nunca se vacía, nada de la cola corre.']],
    ['Promesa', 'objeto que representa un resultado futuro', ['«fetch» devuelve una.', 'Puede estar pendiente, cumplida o rechazada.', 'Se encadena con then y catch.']],
    ['Await', 'palabra que pausa una función asíncrona hasta que se cumpla una promesa', ['«const r = await fetch(url)».', 'Solo se usa dentro de async (o en módulos).', 'Solo se detiene esa función y lo demás sigue.']],
    ['Callback', 'función que se pasa para ejecutarse más tarde', ['«setTimeout(f, 100)».', 'Se anidan varios y aparece el "infierno de callbacks".', '«addEventListener» recibe una.']],
    ['Promise.all', 'combinador que espera varias promesas en paralelo', ['Se piden 10 vehículos a la vez.', 'Si una falla, rechaza todo.', 'El tiempo total es el de la más lenta.']],
    ['Microtarea', 'tarea de alta prioridad que corre al terminar el código actual', ['Un «.then» corre antes que un setTimeout de 0.', 'La cola se vacía antes de pintar la pantalla.', 'Se crean también con «queueMicrotask».']],
    ['Web Worker', 'hilo en segundo plano del navegador sin acceso al DOM', ['Un cálculo pesado no congela la interfaz.', 'Se comunica con postMessage.', 'Procesas una imagen grande sin bloquear los clics.']]
  ],
  q: [
    { o: 'Ordena en qué secuencia se imprime: un console.log síncrono, un then de promesa y un setTimeout de 0.', s: ['El console.log síncrono', 'El then de la promesa', 'El setTimeout'], e: 'Síncrono, microtareas y luego tareas.', l: 3 },
    ['Con 5 peticiones de 1 s cada una, «for + await» tarda...', '5 s, frente a 1 s con Promise.all', ['1 s frente a 5 s con Promise.all', 'Lo mismo', '0 s'], 'En serie se suman; en paralelo domina la más lenta.', 3],
    ['Un usuario busca "a" y luego "ab"; la respuesta de "a" llega al final y pisa la correcta. ¿Qué es?', 'Una condición de carrera; se debe cancelar o ignorar la respuesta vieja', ['Un error de CSS', 'Un 404', 'Un problema de DNS'], 'Aunque haya un solo hilo, el orden de llegada puede variar.', 4],
    ['Qué devuelve siempre una función async:', 'Una promesa', ['undefined', 'El valor crudo', 'Un callback'], 'Aunque hagas return 5, devuelve una promesa de 5.', 4],
    ['Un bucle de 5 segundos corre en el hilo principal. ¿Qué pasa?', 'La página queda congelada esos 5 segundos', ['Corre en segundo plano', 'El navegador lo divide', 'No pasa nada'], 'Un solo hilo significa que nada más puede ejecutarse.', 3],
    { c: 'Las pruebas aquí solo son síncronas, así que simula el orden: «ordenEventoLoop(l)» recibe una lista de tareas {t:"sync"|"micro"|"macro", id} y devuelve los ids en el orden en que se ejecutarían.', f: 'ordenEventoLoop', p: ['l'], t: [[[[{ t: 'macro', id: 1 }, { t: 'sync', id: 2 }, { t: 'micro', id: 3 }]], [2, 3, 1]], [[[]], []]], sol: "  const de = t => l.filter(x => x.t === t).map(x => x.id);\n  return [...de('sync'), ...de('micro'), ...de('macro')];", l: 3 },
    { c: 'Calcula tiempos: «tiempoSerie(l)» y luego, en la misma función, devuelve [suma en serie, tiempo en paralelo] de una lista de duraciones.', f: 'tiempoSerie', p: ['l'], t: [[[[1, 2, 3]], [6, 3]], [[[]], [0, 0]]], sol: '  return [l.reduce((a, b) => a + b, 0), l.length ? Math.max(...l) : 0];', l: 3 },
    { c: 'Simula un límite de concurrencia: «tiempoConLimite(l, k)» recibe duraciones y cuántas tareas pueden correr a la vez; las tareas empiezan en orden, cada una en cuanto se libera un espacio. Devuelve el tiempo total.', f: 'tiempoConLimite', p: ['l', 'k'], t: [[[[3, 2, 1], 2], 3], [[[1, 1, 1, 1], 2], 2], [[[5, 1], 1], 6], [[[], 3], 0]], sol: '  const c = Array(k).fill(0);\n  for (const d of l) {\n    const i = c.indexOf(Math.min(...c));\n    c[i] += d;\n  }\n  return Math.max(...c);', l: 4 }
  ],
  gen: function (g) {
    g.times(6, function (R) { var a = R.int(1, 5), b = R.int(6, 9); g.trace(2, 'console.log(' + a + ');\nconsole.log(' + b + ');', 'El código síncrono corre en orden.'); });
    g.times(14, function (R) { var n = R.int(2, 8), d = R.pick([100, 200, 500]); var serie = R.pick([true, false]); g.input(2, 'Tienes ' + n + ' peticiones de ' + d + ' ms. ¿Cuántos ms tardan ' + (serie ? 'en serie, con await en un bucle' : 'en paralelo, con Promise.all') + '?', serie ? n * d : d, serie ? 'Se suman.' : 'Todas corren a la vez.'); });
  } });
})();
