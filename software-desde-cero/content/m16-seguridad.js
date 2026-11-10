(function () {
var M = SDC.M, S = SDC.S;
M('m16', { title: 'Seguridad de software', desc: 'La seguridad no se agrega al final: se diseña desde el principio. Aquí aprendes cómo se producen las fallas más comunes y cómo escribir código que las evite.',
  thread: 'PatioApp protege sus datos: las contraseñas se guardan con hash, las consultas van parametrizadas, cada rol solo ve lo suyo y el tráfico viaja cifrado.',
  books: '*Security Engineering* (Anderson), *The Web Application Hacker\'s Handbook* (Stuttard y Pinto), *Serious Cryptography* (Aumasson), OWASP Top 10, *Threat Modeling* (Shostack).',
  uni: 'Seguridad Informática (UTP), Software Security de SWEBOK v4, Computer Systems Security (MIT 6.858).' });

S('m16', 'm16.owasp', { title: 'Fallas comunes y defensa',
  ask: '¿Qué falla o principio de seguridad aparece?',
  lesson: `
> **La idea en simple.** Un edificio seguro no confía solo en la puerta: tiene portero, llaves por piso y cámaras. Si un control falla, otro responde. **Nunca confíes en lo que viene de afuera.**

## La tríada CIA
- **Confidencialidad:** solo quien debe, ve.
- **Integridad:** nadie altera sin permiso.
- **Disponibilidad:** funciona cuando se necesita.

## Inyección SQL y cómo evitarla
~~~js
// PELIGROSO: el dato se mezcla con la orden
function consultaMala(placa) {
  return "SELECT * FROM autos WHERE placa = '" + placa + "'";
}
console.log(consultaMala("' OR '1'='1"));   // ¡Devolvería todo!

// SEGURO: el dato viaja separado y nunca es código
function consultaBuena(placa) {
  return { sql: "SELECT * FROM autos WHERE placa = $1", params: [placa] };
}
console.log(consultaBuena("' OR '1'='1"));
~~~

## XSS: scripts en tu página
Un comentario contiene un script y se muestra a otros. Defensa: **escapa al mostrar** («textContent», plantillas seguras) y agrega una política CSP.

## Fallas frecuentes (según OWASP Top 10)
| Falla | Ejemplo | Defensa |
| Control de acceso roto | cambiar el id en la URL y ver datos ajenos | verificar propiedad en el servidor |
| Inyección | SQL, comandos | consultas parametrizadas |
| Fallas criptográficas | contraseñas en texto plano | hash fuerte y TLS |
| Mala configuración | panel admin expuesto | ajustes seguros por defecto |
| Componentes vulnerables | biblioteca sin actualizar | «npm audit», actualizar |
| Falta de registros | nadie nota el ataque | auditoría y alertas |

## Principios de diseño
- **Mínimo privilegio:** lo justo y nada más.
- **Defensa en profundidad:** varias capas.
- **Falla segura:** ante error, niega.
- **Toda validación se repite en el servidor:** el navegador lo controla el usuario.
- **Modelado de amenazas:** ¿qué podría salir mal? (STRIDE).

## Puntos que no debes omitir
- Secretos en variables de entorno, jamás en el repositorio.
- Actualiza las dependencias: gran parte de tu código no lo escribiste tú.
- Limita la tasa de intentos.
- Prueba solo en sistemas propios o con autorización escrita. Lo contrario es delito.

! Error común: esconder un botón de administrador y creer que eso protege. Si el servidor no valida, cualquiera puede llamar a la API.`,
  links: [['m10.model', 'la concatenación de SQL causa inyección'], ['m9.front', 'el XSS nace de insertar HTML sin escapar'], ['m7.cli', 'los secretos van en variables de entorno'], ['m15.cloud', 'mínimo privilegio con IAM'], ['m16.auth', 'el control de acceso se apoya en la autenticación']],
  read: 'OWASP Top 10; OWASP Cheat Sheet Series; Anderson, *Security Engineering* (capítulos gratis en línea).',
  terms: [
    ['Inyección SQL', 'ataque que mezcla datos del usuario con órdenes SQL', ["Una búsqueda con «' OR 1=1 --» devuelve toda la tabla.", 'Se evita con consultas parametrizadas.', 'Un formulario de inicio de sesión se salta la contraseña.']],
    ['XSS', 'inyección de scripts en páginas que ven otros usuarios', ['Un comentario ejecuta un script en cada visitante.', 'Se evita escapando la salida.', 'Se roba una sesión desde un perfil malicioso.']],
    ['CSRF', 'ataque que hace que el navegador de la víctima envíe una petición no deseada', ['Una web maliciosa envía un formulario a tu banco con tu sesión.', 'Se evita con tokens y cookies SameSite.', 'La víctima solo visitó otra página.']],
    ['Control de acceso roto', 'falla que permite acceder a datos o acciones sin permiso', ['Cambias /facturas/101 por /facturas/102 y ves la de otro.', 'Un usuario normal llama a una ruta de administrador.', 'El servidor no verifica la propiedad del recurso.']],
    ['Mínimo privilegio', 'dar solo los permisos estrictamente necesarios', ['El servicio de reportes solo puede leer.', 'Un contenedor no corre como root.', 'Un empleado accede solo a su área.']],
    ['Defensa en profundidad', 'usar varias capas de control de seguridad', ['WAF, validación y permisos en base de datos.', 'Si falla una, responde otra.', 'Cifrado además de un firewall.']],
    ['Modelado de amenazas', 'analizar en el diseño qué podría atacarse y cómo', ['En la pizarra se revisan flujos y fronteras de confianza.', 'Se usa STRIDE.', 'Se decide qué defender primero.']]
  ],
  q: [
    ['¿Cuál es la defensa principal contra la inyección SQL?', 'Consultas parametrizadas', ['Ocultar los errores', 'Filtrar comillas a mano', 'Usar HTTPS'], 'Los datos nunca se interpretan como código.', 2],
    ['La API devuelve /pedidos/500 a cualquiera con sesión iniciada. ¿Qué falla?', 'Control de acceso: falta verificar que el pedido sea suyo', ['XSS', 'DNS', 'Una consulta lenta'], 'También llamado IDOR.', 3],
    ['La validación de precio solo está en el navegador. ¿Qué puede pasar?', 'El usuario envía directo a la API el precio que quiera', ['Nada', 'El navegador lo impide', 'Se apaga el servidor'], 'El cliente no es de confianza.', 3],
    ['Un sistema falla al consultar permisos. ¿Qué es correcto?', 'Negar el acceso', ['Permitir por si acaso', 'Reintentar sin límite', 'Mostrar todo'], 'Es el principio de fallo seguro.', 4],
    ['¿Qué nivel de autorización necesitas para hacer pruebas de intrusión en un sitio ajeno?', 'Autorización escrita del dueño', ['Ninguna si eres curioso', 'Basta que sea por aprender', 'Basta no causar daño'], 'Sin permiso puede ser delito (en Perú, Ley 30096).', 4],
    { c: 'Escapa para mostrar: «escaparHtml(s)» convierte & < > " \' en entidades.', f: 'escaparHtml', p: ['s'], t: [[['<script>'], '&lt;script&gt;'], [["'"], '&#39;'], [['a&b'], 'a&amp;b']], sol: "  return s.replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[c]));", l: 3 },
    { c: 'Autoriza: «puedeVer(usuario, recurso)»: true si es admin o si recurso.dueño es igual a usuario.id.', f: 'puedeVer', p: ['usuario', 'recurso'], t: [[[{ id: 1, rol: 'admin' }, { dueño: 2 }], true], [[{ id: 1, rol: 'user' }, { dueño: 1 }], true], [[{ id: 1, rol: 'user' }, { dueño: 2 }], false]], sol: "  return usuario.rol === 'admin' || recurso.dueño === usuario.id;", l: 2 },
    { c: 'Valida la entrada con lista blanca: «ordenSegura(campo)» devuelve el campo si es "placa", "km" o "fecha"; si no, "placa".', f: 'ordenSegura', p: ['campo'], t: [[['km'], 'km'], [['km; DROP TABLE'], 'placa']], sol: "  return ['placa', 'km', 'fecha'].includes(campo) ? campo : 'placa';", h: 'Un nombre de columna no se puede parametrizar; usa una lista permitida.', l: 3 },
    { c: 'Limita intentos: «bloqueado(intentos, max)» recibe resultados de inicio de sesión (true/false) y devuelve true si en algún momento hubo max fallos seguidos.', f: 'bloqueado', p: ['intentos', 'max'], t: [[[[false, false, false], 3], true], [[[false, true, false], 2], false], [[[], 1], false]], sol: '  let f = 0;\n  for (const i of intentos) { f = i ? 0 : f + 1; if (f >= max) return true; }\n  return false;', l: 3 },
    { c: 'Detecta secretos: «tieneSecreto(lineas)» devuelve los índices de líneas con texto "password=", "api_key=" o "secret=" (sin importar mayúsculas), como un revisor automático.', f: 'tieneSecreto', p: ['lineas'], t: [[[['a=1', 'API_KEY=xx', 'password=1']], [1, 2]], [[[]], []]], sol: '  const r = [];\n  lineas.forEach((l, i) => { if (/(password|api_key|secret)=/i.test(l)) r.push(i); });\n  return r;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Un comprobante muestra el saldo equivocado porque alguien lo alteró.', 'Integridad'], ['Un ataque tumba el servidor y nadie puede entrar.', 'Disponibilidad'], ['Se filtran datos de clientes.', 'Confidencialidad'], ['Una factura se modificó sin autorización.', 'Integridad'], ['Un empleado lee sueldos que no le corresponden.', 'Confidencialidad'], ['El sitio cae durante horas por una inundación de peticiones.', 'Disponibilidad']];
    c.forEach(function (x) { g.mcq(1, '¿Qué propiedad de la tríada CIA se afecta?\n' + x[0], x[1], ['Integridad', 'Disponibilidad', 'Confidencialidad'].filter(function (y) { return y !== x[1]; }), 'Se afecta la ' + x[1] + '.'); });
  } });

S('m16', 'm16.auth', { title: 'Autenticación y autorización',
  ask: '¿Qué mecanismo se usa?',
  lesson: `
> **La idea en simple.** En un hotel, mostrar tu DNI en la recepción es **autenticación**: prueba quién eres. La tarjeta que abre solo tu habitación es **autorización**: qué puedes hacer.

## Contraseñas: nunca en texto plano
Se guarda un **hash lento con sal**. Bcrypt, scrypt o Argon2. Nunca MD5 ni SHA-256 solos: son rápidos, y eso ayuda al atacante.
~~~js
// Demostración conceptual: no usar en producción
function hashDemo(texto) {
  let h = 7;
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) % 1000003;
  return h;
}
const sal = "x9f";
const guardado = hashDemo(sal + "miClave123");
function verificar(intento) { return hashDemo(sal + intento) === guardado; }
console.log(verificar("miClave123"), verificar("otra"));
~~~
La **sal** hace que dos usuarios con la misma contraseña tengan hashes distintos, e inutiliza las tablas ya calculadas.

## Sesiones y tokens
- **Sesión:** el servidor guarda el estado y da una cookie con un ID.
- **JWT:** token firmado con datos; el servidor lo verifica sin consultar. Difícil de revocar: úsalo con duración corta.
- Cookies: «HttpOnly», «Secure» y «SameSite».

## Más factores
Algo que sabes, algo que tienes, algo que eres. **MFA** detiene la mayoría de los ataques por contraseñas robadas.

## OAuth 2 y OpenID Connect
"Iniciar sesión con Google": un tercero confirma tu identidad sin que veas la contraseña. OAuth autoriza; OIDC autentica.

## Autorización
- **RBAC:** permisos por rol (admin, revisor, chofer).
- **ABAC:** por atributos ("solo su sede y en horario").
~~~js
const permisos = { admin: ["leer", "editar", "borrar"], revisor: ["leer", "editar"], chofer: ["leer"] };
const puede = (rol, accion) => (permisos[rol] || []).includes(accion);
console.log(puede("chofer", "borrar"), puede("admin", "borrar"));
~~~

## Puntos que no debes omitir
- No inventes tu propio sistema de autenticación: usa bibliotecas probadas.
- Mensaje de error genérico: "credenciales incorrectas", sin decir qué falló.
- Limita los intentos.
- La contraseña larga vence a la compleja corta.

! Error común: guardar un JWT con datos sensibles creyendo que está cifrado. Está firmado, no cifrado: cualquiera lo puede leer.`,
  links: [['m9.http', 'tokens y cookies viajan en cabeceras'], ['m4.hash', 'el hash criptográfico es otro tipo de hash'], ['m16.crypto', 'las firmas y el cifrado sustentan todo esto'], ['m16.owasp', 'la autorización fallida es la falla número uno']],
  read: 'OWASP Authentication y Password Storage Cheat Sheets.',
  terms: [
    ['Autenticación', 'comprobar quién es alguien', ['Escribir usuario y contraseña.', 'Usar la huella digital.', 'Falla con error 401.']],
    ['Autorización', 'decidir qué puede hacer alguien', ['Un chofer no puede borrar usuarios.', 'Falla con error 403.', 'Se revisa el rol antes de cada acción.']],
    ['Sal', 'valor aleatorio que se combina con la contraseña antes del hash', ['Dos usuarios con "123456" tienen hashes distintos.', 'Inutiliza las tablas arcoíris.', 'Se guarda junto al hash.']],
    ['Bcrypt', 'función de hash lenta y ajustable para contraseñas', ['Se ajusta su factor de costo con los años.', 'Un atacante solo prueba pocas claves por segundo.', 'Incluye la sal en el resultado.']],
    ['JWT', 'token firmado que contiene datos del usuario', ['El servidor lo verifica sin consultar la base.', 'Tiene encabezado, contenido y firma.', 'Se decodifica fácilmente aunque no se pueda alterar.']],
    ['MFA', 'autenticación con más de un factor independiente', ['Contraseña y código en el celular.', 'Una llave física además de la clave.', 'Bloquea a quien solo robó la contraseña.']],
    ['RBAC', 'control de acceso basado en roles', ['Admin, revisor y chofer tienen permisos distintos.', 'Se asigna un rol y no permisos individuales.', 'Cambiar de puesto es cambiar de rol.']]
  ],
  q: [
    { o: 'Ordena el inicio de sesión seguro.', s: ['Recibir usuario y contraseña por HTTPS', 'Buscar el hash y la sal guardados', 'Calcular el hash del intento', 'Comparar', 'Crear la sesión'], e: 'Nunca se guarda ni se descifra la contraseña.', l: 3 },
    ['¿Cuál almacenamiento de contraseñas es correcto?', 'Hash con Argon2 o bcrypt y sal', ['Texto plano', 'MD5', 'Cifrado reversible con una clave en el código'], 'Es lento a propósito y no se puede revertir.', 2],
    ['¿Por qué las funciones lentas son mejores para contraseñas?', 'Porque limitan cuántas pruebas por segundo puede hacer un atacante', ['Porque el usuario lo agradece', 'Porque gastan menos energía', 'Porque son más cortas'], 'Una función rápida permite miles de millones por segundo.', 3],
    ['Un JWT contiene el sueldo del usuario. ¿Qué problema hay?', 'Cualquiera que lo tenga lo lee: está firmado, no cifrado', ['Ninguno', 'Lo impide la firma', 'Pesa mucho, nada más'], 'La firma evita cambios, no la lectura.', 4],
    ['"La contraseña es incorrecta" frente a "El usuario no existe". ¿Qué haces?', 'Usar un único mensaje genérico', ['Mostrar ambos', 'Mostrar la contraseña correcta', 'Sugerir usuarios'], 'Evita enumerar usuarios.', 4],
    { c: 'Implementa RBAC: «autorizar(permisos, rol, accion)».', f: 'autorizar', p: ['permisos', 'rol', 'accion'], t: [[[{ a: ['x'] }, 'a', 'x'], true], [[{ a: ['x'] }, 'a', 'y'], false], [[{}, 'z', 'x'], false]], sol: '  return (permisos[rol] || []).includes(accion);', l: 2 },
    { c: 'Evalúa una contraseña: «fuerte(c)» exige longitud de 12 o más y que no esté en ["123456789012","contraseña1234"].', f: 'fuerte', p: ['c'], t: [[['frase larga con espacios'], true], [['corta'], false], [['123456789012'], false]], sol: "  return c.length >= 12 && !['123456789012', 'contraseña1234'].includes(c);", l: 2 },
    { c: 'Decodifica un JWT simplificado: «contenido(t)» recibe "h.p.f" donde p es JSON codificado en base64. Usa atob y devuelve el objeto.', f: 'contenido', p: ['t'], t: [[['h.eyJhIjoxfQ.f'], { a: 1 }]], sol: "  return JSON.parse(atob(t.split('.')[1]));", l: 3 },
    { c: 'Verifica expiración: «tokenValido(t, ahora)» recibe {exp, firmaOk} y devuelve true si la firma es válida y aún no vence.', f: 'tokenValido', p: ['t', 'ahora'], t: [[[{ exp: 10, firmaOk: true }, 5], true], [[{ exp: 10, firmaOk: false }, 5], false], [[{ exp: 4, firmaOk: true }, 5], false]], sol: '  return t.firmaOk && t.exp > ahora;', l: 3 },
    { c: 'Implementa una comparación en tiempo constante: «igualesSeguro(a, b)» recorre siempre todo y no se detiene en la primera diferencia.', f: 'igualesSeguro', p: ['a', 'b'], t: [[['abc', 'abc'], true], [['abc', 'abd'], false], [['ab', 'abc'], false]], sol: '  if (a.length !== b.length) return false;\n  let d = 0;\n  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);\n  return d === 0;', h: 'Acumula las diferencias con OR y XOR para no filtrar información por el tiempo.', l: 4 }
  ],
  gen: function (g) {
    var c = [['Ingresar la contraseña.', 'Algo que sabes'], ['Usar el código de una app en tu celular.', 'Algo que tienes'], ['Usar la huella digital.', 'Algo que eres'], ['Responder una pregunta secreta.', 'Algo que sabes'], ['Insertar una llave USB de seguridad.', 'Algo que tienes'], ['Reconocimiento facial.', 'Algo que eres']];
    c.forEach(function (x) { g.mcq(1, '¿Qué tipo de factor es?\n' + x[0], x[1], ['Algo que sabes', 'Algo que tienes', 'Algo que eres'].filter(function (y) { return y !== x[1]; }), 'Es ' + x[1] + '.'); });
    g.times(10, function (R) { var l = R.int(4, 12), a = R.pick([10, 26, 62]); g.mcq(3, '¿Cuántas contraseñas posibles hay con longitud ' + l + ' y ' + a + ' símbolos? Elige la expresión correcta.', a + '^' + l, [l + '^' + a, a + ' × ' + l, a + ' + ' + l], 'Cada posición tiene ' + a + ' opciones: se multiplica ' + l + ' veces.'); });
  } });

S('m16', 'm16.crypto', { title: 'Criptografía práctica',
  ask: '¿Qué herramienta criptográfica se usa?',
  lesson: `
> **La idea en simple.** Una caja con candado de una sola llave compartida es cifrado **simétrico**. Un buzón, donde cualquiera puede depositar pero solo tú abres, es cifrado **asimétrico**.

## Herramientas
| Herramienta | Garantiza | Ejemplos |
| Hash | integridad (huella digital) | SHA-256 |
| Cifrado simétrico | confidencialidad; una clave | AES |
| Cifrado asimétrico | confidencialidad; dos claves | RSA, curvas elípticas |
| Firma digital | autenticidad e integridad | Ed25519 |
| HMAC | autenticidad con clave compartida | HMAC-SHA256 |

## Hash
Unidireccional y de longitud fija. Un mínimo cambio da un resultado totalmente distinto. **No es cifrado**: no se puede volver atrás.

## Simétrico y asimétrico
~~~js
// XOR: la idea de un cifrado simétrico (solo didáctico, no seguro)
function xorCifrar(texto, clave) {
  return [...texto].map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ clave.charCodeAt(i % clave.length))
  ).join("");
}
const c = xorCifrar("HOLA", "k");
console.log(JSON.stringify(c));
console.log(xorCifrar(c, "k"));   // La misma clave lo descifra
~~~
- **Simétrico:** rapidísimo, pero ¿cómo compartes la clave?
- **Asimétrico:** resuelve el reparto, pero es lento.
- **Híbrido:** lo que hace TLS: usa asimétrico para acordar una clave, y simétrico para los datos.

## Firma digital
Cifras con tu clave **privada** un hash del mensaje; cualquiera lo verifica con tu clave **pública**. Prueba quién lo envió y que no cambió. Es lo que usan tu clave SSH y los commits firmados.

## TLS y HTTPS
1. El servidor muestra un certificado firmado por una autoridad (CA).
2. Se acuerda una clave de sesión.
3. Todo viaja cifrado.
Protege contra quien escucha o modifica en la red.

## Puntos que no debes omitir
- **Nunca inventes tu propio cifrado.** Usa bibliotecas probadas.
- Protege los datos en tránsito (TLS) y en reposo (cifrado de disco o columnas).
- Administra claves: rotación y un gestor de secretos.
- Base64 es codificación, **no cifrado**.
- Aleatoriedad criptográfica: «crypto.getRandomValues».
- Las computadoras cuánticas impulsan la criptografía poscuántica.

! Error común: confundir codificar, cifrar y hacer hash. Codificar no protege, cifrar es reversible con clave, y hash no es reversible.`,
  links: [['m1.logic', 'XOR es la base de muchos cifrados'], ['m9.tcp', 'TLS se monta sobre TCP'], ['m16.auth', 'hash con sal para contraseñas; firmas para tokens'], ['m2.prob', 'la seguridad se mide en cuántos intentos harían falta']],
  read: 'Aumasson, *Serious Cryptography*; Ferguson, Schneier y Kohno, *Cryptography Engineering*.',
  terms: [
    ['Hash criptográfico', 'huella de tamaño fijo imposible de revertir en la práctica', ['Comprobar que una descarga no fue alterada.', 'Git identifica sus objetos.', 'Cambiar una letra lo cambia por completo.']],
    ['Cifrado simétrico', 'cifrado en que se usa la misma clave para cifrar y descifrar', ['AES protege un disco.', 'Muy rápido para muchos datos.', 'El problema es compartir la clave.']],
    ['Cifrado asimétrico', 'cifrado con una clave pública y una privada', ['Cualquiera te cifra con tu pública y solo tú lees.', 'RSA y curvas elípticas.', 'Se usa para acordar una clave en TLS.']],
    ['Firma digital', 'prueba criptográfica de quién envió un mensaje y que no cambió', ['Un commit firmado confirma al autor.', 'Se firma con la privada y se verifica con la pública.', 'Un JWT lleva una.']],
    ['HMAC', 'código de autenticación calculado con hash y una clave compartida', ['Un webhook incluye una firma con una clave secreta.', 'Se verifica que el mensaje venga de quien tiene la clave.', 'Una API valida la integridad de cada petición.']],
    ['Certificado', 'documento firmado que asocia una clave pública con un dominio', ['El candado del navegador lo verifica.', "Let's Encrypt los emite gratis.", 'Vence y hay que renovarlo.']],
    ['Base64', 'codificación que representa bytes como texto', ['Una imagen incrustada en un HTML.', 'No protege nada.', 'Cualquiera la decodifica sin clave.']]
  ],
  q: [
    ['¿Cómo funciona TLS, a grandes rasgos?', 'Usa asimétrico para acordar una clave y simétrico para los datos', ['Solo asimétrico', 'Solo Base64', 'Solo hash'], 'Combina la comodidad de una y la velocidad de la otra.', 3],
    ['¿Cuál protege de verdad una contraseña guardada?', 'Hash lento con sal', ['Base64', 'Un cifrado XOR', 'Texto plano bien oculto'], 'Base64 solo cambia la forma de escribirla.', 2],
    ['Firmas con tu clave ___ y verifican con tu clave ___.', 'Privada; pública', ['Pública; privada', 'Pública; pública', 'Privada; privada'], 'Solo tú puedes firmar y todos pueden comprobar.', 3],
    ['¿Por qué "cifrar con mi propio algoritmo" es mala idea?', 'Porque un cifrado solo es confiable tras años de análisis público', ['Porque es ilegal siempre', 'Porque es más lento', 'Porque ocupa más'], 'Principio de Kerckhoffs: el secreto está en la clave, no en el método.', 4],
    ['¿Qué protege HTTPS?', 'Los datos en tránsito entre navegador y servidor', ['Los datos en la base de datos', 'El servidor contra toda intrusión', 'La contraseña del usuario si es débil'], 'No sustituye a las demás defensas.', 4],
    { c: 'Implementa César: «cesar(s, k)» desplaza letras mayúsculas A-Z k posiciones.', f: 'cesar', p: ['s', 'k'], t: [[['ABC', 1], 'BCD'], [['XYZ', 2], 'ZAB'], [['', 5], '']], sol: "  return [...s].map(c => String.fromCharCode((c.charCodeAt(0) - 65 + k) % 26 + 65)).join('');", l: 2 },
    { c: 'Descifra César: «romperCesar(s, palabra)» prueba todas las k y devuelve la k con la que s descifrada contiene la palabra, o −1.', f: 'romperCesar', p: ['s', 'palabra'], t: [[['BCD', 'ABC'], 1], [['A', 'ZZZ'], -1]], sol: "  for (let k = 0; k < 26; k++) {\n    const t = [...s].map(c => String.fromCharCode((c.charCodeAt(0) - 65 - k + 26) % 26 + 65)).join('');\n    if (t.includes(palabra)) return k;\n  }\n  return -1;", h: 'Solo hay 26 claves: por eso César es inseguro.', l: 3 },
    { c: 'Cifra con XOR: «xor(l, k)» aplica k a cada número de la lista.', f: 'xor', p: ['l', 'k'], t: [[[[1, 2], 3], [2, 1]], [[[], 1], []]], sol: '  return l.map(x => x ^ k);', l: 2 },
    { c: 'Codifica Base64 a mano: «aBase64(s)» para texto ASCII, sin usar btoa.', f: 'aBase64', p: ['s'], t: [[['Hola'], 'SG9sYQ=='], [['a'], 'YQ=='], [[''], ''], [['abc'], 'YWJj']], sol: "  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n  let r = '';\n  for (let i = 0; i < s.length; i += 3) {\n    const n = (s.charCodeAt(i) << 16) | ((s.charCodeAt(i + 1) || 0) << 8) | (s.charCodeAt(i + 2) || 0);\n    r += t[n >> 18 & 63] + t[n >> 12 & 63];\n    r += i + 1 < s.length ? t[n >> 6 & 63] : '=';\n    r += i + 2 < s.length ? t[n & 63] : '=';\n  }\n  return r;", l: 4 }
  ],
  gen: function (g) {
    var c = [['Comprobar que un archivo descargado no fue alterado.', 'Hash'], ['Cifrar un disco completo.', 'Simétrico'], ['Enviar un secreto a alguien con quien nunca compartiste una clave.', 'Asimétrico'], ['Demostrar que tú escribiste este commit.', 'Firma digital'], ['Verificar con una clave compartida que un webhook es auténtico.', 'HMAC'], ['Mostrar una imagen dentro de un JSON.', 'Base64']];
    c.forEach(function (x) { g.mcq(2, '¿Qué herramienta usas?\n' + x[0], x[1], ['Hash', 'Simétrico', 'Asimétrico', 'Firma digital', 'HMAC', 'Base64'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Corresponde a ' + x[1] + '.'); });
    g.times(10, function (R) { var ch = R.pick('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')), k = R.int(1, 25), r = String.fromCharCode((ch.charCodeAt(0) - 65 + k) % 26 + 65); g.input(2, 'Con cifrado César de desplazamiento ' + k + ', ¿en qué letra se convierte ' + ch + '? (Alfabeto A-Z)', r, ch + ' + ' + k + ' con vuelta a la A.'); });
    g.times(8, function (R) { var a = R.int(1, 200), k = R.int(1, 200); g.input(3, '¿Cuánto vale ' + a + ' XOR ' + k + '?', a ^ k, 'Aplica XOR bit a bit.'); });
    g.times(6, function (R) { var b = R.pick([40, 56, 64, 128, 256]); g.mcq(3, '¿Cuántas claves posibles tiene un cifrado de ' + b + ' bits?', '2^' + b, [b + '^2', b + ' × 2', '2 × ' + b + ' + 1'], 'Cada bit duplica las claves.'); });
  } });
})();
