(function () {
var X = SDC.X, XM = SDC.XM;
XM('m16', {
  uni: 'MIT 6.5660 (antes 6.858) *Computer Systems Security*; Stanford CS155 *Computer and Network Security*; Berkeley CS161 *Computer Security*; certificaciones y guías de OWASP como referencia profesional. En Perú: Seguridad Informática y Seguridad de la Información (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Auditoría y endurecimiento de seguridad de PatioApp',
    goal: 'Revisar PatioApp como lo haría un equipo de seguridad y corregir lo encontrado con evidencia.',
    steps: ['Haz el modelo de amenazas STRIDE del sistema y prioriza las amenazas por riesgo.', 'Revisa el sistema contra el OWASP Top 10 y corrige inyección, XSS, control de acceso y configuración.', 'Implementa autenticación robusta, roles con autorización en el servidor y pruebas contra IDOR.', 'Protege los datos sensibles en tránsito y en reposo, y gestiona los secretos fuera del código.', 'Agrega a la integración continua análisis de dependencias, de secretos y análisis estático de seguridad.'],
    deliver: 'El modelo de amenazas, el informe de hallazgos con su corrección, las pruebas de seguridad y la configuración de la integración continua.' }
});

X('m16.owasp', {
  deep: `
## Principios que tienen 50 años
Jerome Saltzer y Michael Schroeder publicaron en 1975 *The Protection of Information in Computer Systems*, con ocho principios de diseño que siguen siendo la base de la seguridad:
| Principio | En la práctica |
| Economía del mecanismo | lo simple se puede revisar; lo complejo esconde errores |
| Valores por defecto seguros | negar salvo permiso explícito |
| Mediación completa | verificar los permisos en **cada** acceso, no solo al entrar |
| Diseño abierto | la seguridad no depende de mantener secreto el diseño |
| Separación de privilegios | exigir dos condiciones para lo crítico (dos personas, dos factores) |
| Mínimo privilegio | cada componente con solo los permisos que necesita |
| Mínimo mecanismo común | compartir lo menos posible entre usuarios |
| Aceptabilidad psicológica | si la seguridad es incómoda, la gente la evita |
El diseño abierto retoma el **principio de Kerckhoffs** (1883): un sistema criptográfico debe ser seguro aunque el enemigo conozca todo excepto la clave.

## El OWASP Top 10
La fundación OWASP, creada en 2001, publica una lista de las categorías de riesgo más críticas en aplicaciones web, basada en datos de miles de aplicaciones. La edición 2021, vigente durante varios años (revisa owasp.org por versiones posteriores), es:
1. **Control de acceso roto:** usuarios que acceden a datos o acciones ajenos.
2. **Fallas criptográficas:** datos sensibles sin cifrar o con algoritmos débiles.
3. **Inyección:** SQL, comandos del sistema y también XSS.
4. **Diseño inseguro:** fallas que ninguna implementación perfecta corrige, porque están en el diseño.
5. **Configuración de seguridad incorrecta:** valores por defecto, mensajes de error detallados, servicios innecesarios.
6. **Componentes vulnerables y desactualizados.**
7. **Fallas de identificación y autenticación.**
8. **Fallas de integridad de software y datos:** actualizaciones sin firmar, deserialización insegura, pipelines comprometidos.
9. **Fallas de registro y monitoreo:** no detectar un ataque a tiempo.
10. **Falsificación de peticiones del lado del servidor (SSRF):** el servidor es engañado para pedir URL internas.

## Casos reales que explican la lista
- **Equifax (2017):** no aplicar a tiempo un parche de Apache Struts permitió robar datos de unos 147 millones de personas. Categoría 6.
- **Capital One (2019):** un ataque SSRF sobre un firewall mal configurado obtuvo credenciales de la nube y datos de más de 100 millones de clientes. Categorías 5 y 10.
- **Log4Shell (diciembre de 2021):** una vulnerabilidad en la biblioteca de registros Log4j, presente en millones de sistemas, permitía ejecutar código con solo hacer que el servidor registrara un texto. Mostró lo frágil que es la cadena de dependencias.

## Escapar según el contexto
Para XSS no existe un "escape universal": depende de dónde se inserta el dato (contenido HTML, atributo, URL, JavaScript, CSS). Lo más seguro es usar las APIs que no interpretan HTML:
~~~js
function escaparHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const observacion = '<img src=x onerror="robarCookies()">rayón';
console.log(escaparHTML(observacion));
// En el navegador: elemento.textContent = observacion  (nunca innerHTML con datos del usuario)
~~~
Como segunda capa, una **Política de Seguridad de Contenido** (CSP) le dice al navegador de qué orígenes puede cargar scripts, de modo que aunque se inyecte uno, no se ejecute.

## Modelado de amenazas
Loren Kohnfelder y Praerit Garg, en Microsoft, propusieron en 1999 la clasificación **STRIDE**: suplantación (*Spoofing*), manipulación (*Tampering*), repudio (*Repudiation*), divulgación de información (*Information disclosure*), denegación de servicio (*Denial of service*) y elevación de privilegios (*Elevation of privilege*). Adam Shostack, en *Threat Modeling* (2014), resume el proceso en cuatro preguntas que cualquier equipo puede hacerse en una pizarra:
1. ¿En qué estamos trabajando? (un diagrama del flujo de datos con sus fronteras de confianza)
2. ¿Qué puede salir mal? (aplicar STRIDE a cada elemento)
3. ¿Qué vamos a hacer al respecto? (mitigar, eliminar, transferir o aceptar)
4. ¿Hicimos un buen trabajo?

## Seguridad en todo el ciclo
La seguridad no se agrega al final: se diseña (modelado de amenazas), se programa (guías seguras, revisiones), se prueba (análisis estático, análisis de dependencias, pruebas dinámicas, pruebas de penetración) y se opera (registros, monitoreo, respuesta a incidentes, parches). Es lo que se conoce como ciclo de desarrollo seguro y, cuando se integra en la tubería de entrega, **DevSecOps**.`,
  checks: [
    ['Explica el principio de mediación completa con un ejemplo.', 'Verificar los permisos en cada acceso a un recurso, no solo al iniciar sesión; por ejemplo, comprobar en cada petición GET /unidades/:placa que el usuario tiene derecho a ver esa unidad.'],
    ['¿Qué categoría del OWASP Top 10 explica el caso Equifax y qué práctica la previene?', 'Componentes vulnerables y desactualizados; se previene inventariando dependencias, monitoreando avisos de seguridad y aplicando parches con rapidez.'],
    ['¿Por qué usar textContent en lugar de innerHTML para mostrar datos del usuario?', 'Porque textContent trata el dato como texto y no interpreta etiquetas ni scripts; innerHTML ejecutaría código inyectado (XSS).'],
    ['Aplica STRIDE: un revisor puede negar que aprobó una unidad. ¿Qué amenaza es y cómo la mitigas?', 'Repudio; se mitiga con registros de auditoría a prueba de manipulación que guarden quién, qué y cuándo, idealmente firmados.'],
    ['¿Qué dice el principio de Kerckhoffs?', 'Que un sistema criptográfico debe seguir siendo seguro aunque el atacante conozca todo su funcionamiento, excepto la clave.']
  ],
  cites: ['Saltzer, J. y Schroeder, M. (1975). The Protection of Information in Computer Systems. *Proceedings of the IEEE*, 63(9).', 'OWASP Foundation (2021). *OWASP Top 10:2021*. owasp.org/Top10.', 'Shostack, A. (2014). *Threat Modeling: Designing for Security*. Wiley.', 'Anderson, R. (2020). *Security Engineering* (3.ª ed.). Wiley.', 'Kerckhoffs, A. (1883). La cryptographie militaire. *Journal des sciences militaires*, 9.'],
  project: { t: 'Auditoría de una aplicación vulnerable a propósito',
    goal: 'Aprender a atacar para aprender a defender, en un entorno legal y controlado.',
    steps: ['Instala localmente OWASP Juice Shop, una aplicación creada para practicar seguridad de forma legal.', 'Encuentra y documenta al menos cinco vulnerabilidades de categorías distintas del Top 10.', 'Para cada una, explica la causa en el código y cómo se corrige.', 'Haz el modelo de amenazas STRIDE de una aplicación propia con su diagrama de flujo de datos.', 'Agrega a tu aplicación pruebas automáticas que intenten inyección SQL, XSS y acceso a recursos ajenos.'],
    deliver: 'El informe de hallazgos con su corrección, el modelo de amenazas y las pruebas de seguridad.' },
  hito: ['Haz el modelo de amenazas STRIDE de PatioApp con su diagrama de flujo de datos y las mitigaciones elegidas.', 'Agrega pruebas contra inyección, XSS y control de acceso roto, y encabezados de seguridad (CSP, HSTS, X-Content-Type-Options).']
});

X('m16.auth', {
  deep: `
## Guardar contraseñas: una historia de errores
Robert Morris y Ken Thompson describieron en 1979 (*Password Security: A Case History*) cómo Unix dejó de guardar contraseñas en claro, empezó a guardarlas transformadas por una función de un solo sentido y agregó una **sal** aleatoria por usuario para que dos contraseñas iguales no produzcan el mismo resultado ni sirvan las tablas precalculadas. Cuarenta años después, todavía hay filtraciones de contraseñas en texto plano o con MD5 sin sal.
Hoy se usan funciones **deliberadamente lentas** y costosas en memoria, para que probar miles de millones de contraseñas sea impracticable:
| Función | Origen |
| bcrypt | Niels Provos y David Mazières, 1999 |
| scrypt | Colin Percival, 2009 (además exige mucha memoria) |
| Argon2 | ganó la Password Hashing Competition en 2015; la variante Argon2id es la recomendada por OWASP |
Nunca uses para contraseñas un hash rápido como SHA-256: con una tarjeta gráfica se calculan miles de millones por segundo.

## Qué contraseñas pedir
La guía NIST SP 800-63B cambió en 2017 décadas de malas prácticas: priorizar la **longitud** y permitir frases largas, comparar las contraseñas nuevas contra listas de contraseñas filtradas, **no** exigir reglas de composición arbitrarias ("una mayúscula y un símbolo") ni cambios periódicos sin motivo, que solo producen contraseñas predecibles como «Patio2026!».

## Sesiones y tokens
| Enfoque | Cómo funciona | A favor | En contra |
| Sesión en el servidor | el servidor guarda la sesión y envía un identificador aleatorio en una cookie | se revoca al instante | requiere almacenamiento compartido entre servidores |
| Token firmado (JWT, RFC 7519) | el token contiene los datos y una firma | no necesita consultar almacenamiento | difícil de revocar antes de su vencimiento |
Errores clásicos con JWT: aceptar el algoritmo «none», no verificar la firma, guardar el token en «localStorage» (accesible para cualquier script inyectado) y emitir tokens de larga duración. Para aplicaciones web, una cookie con **HttpOnly** (JavaScript no la lee), **Secure** (solo HTTPS) y **SameSite** (no se envía desde otros sitios, lo que mitiga CSRF) suele ser la opción más segura.

## Delegar la identidad: OAuth 2.0 y OpenID Connect
**OAuth 2.0** (RFC 6749, 2012) permite que una aplicación acceda a recursos en nombre de un usuario **sin conocer su contraseña** ("permitir que PatioApp lea tu calendario de Google"). Es un protocolo de **autorización**. **OpenID Connect** (2014) agrega una capa de **autenticación** encima: "iniciar sesión con Google". Para aplicaciones web y móviles, el flujo recomendado es el de código de autorización con **PKCE** (RFC 7636), que impide que un código interceptado sea usado por otra aplicación.

## Más allá de la contraseña
- **MFA:** algo que sabes, algo que tienes, algo que eres. Los códigos por SMS son mejores que nada, pero vulnerables al cambio fraudulento de SIM.
- **TOTP** (RFC 6238): códigos de 6 dígitos que cambian cada 30 segundos, calculados con un secreto compartido y la hora.
- **Llaves de acceso (passkeys) y WebAuthn** (estándar W3C, 2019): criptografía de clave pública ligada al dominio. Son resistentes al phishing, porque la llave no funciona en un sitio falso.

## Autorización: decidir qué puede hacer cada quien
- **RBAC** (control de acceso por roles), formalizado por David Ferraiolo y Richard Kuhn en 1992: permisos asignados a roles (revisor, supervisor, administrador) y roles asignados a personas.
- **ABAC** (por atributos): reglas que combinan atributos ("un supervisor puede aprobar unidades de su sede en su turno").
- **ReBAC** (por relaciones): permisos que se derivan de relaciones, como en el sistema Zanzibar que Google describió en 2019 para Drive y YouTube.
El error más frecuente en APIs es la **referencia directa insegura a objetos** (IDOR): el usuario cambia «/unidades/123» por «/unidades/124» y ve datos ajenos, porque el servidor solo verificó que había iniciado sesión. La autorización debe comprobarse **en el servidor, para cada objeto**.
~~~js
const unidades = { 123: { sede: 'Lima' }, 124: { sede: 'Arequipa' } };
function puedeVer(usuario, id) {
  const u = unidades[id];
  if (!u) return false;
  if (usuario.rol === 'administrador') return true;
  return u.sede === usuario.sede;          // verificar el objeto, no solo la sesión
}
const ana = { rol: 'revisor', sede: 'Lima' };
console.log(puedeVer(ana, 123), puedeVer(ana, 124));
~~~

## Defensas complementarias
Limita los intentos de inicio de sesión por cuenta y por IP, responde con el mismo mensaje cuando el usuario no existe y cuando la contraseña es incorrecta (para no revelar qué cuentas existen), compara secretos en tiempo constante y registra los eventos de autenticación para detectar ataques.`,
  checks: [
    ['¿Para qué sirve la sal en el almacenamiento de contraseñas?', 'Para que contraseñas iguales produzcan resultados distintos y no sirvan las tablas precalculadas; obliga a atacar cada contraseña por separado.'],
    ['¿Por qué no usar SHA-256 para guardar contraseñas?', 'Porque es muy rápido: un atacante con GPU puede probar miles de millones por segundo. Se necesitan funciones lentas y costosas en memoria como Argon2id o bcrypt.'],
    ['¿Qué diferencia hay entre OAuth 2.0 y OpenID Connect?', 'OAuth 2.0 es de autorización (dar acceso a recursos en nombre del usuario); OpenID Connect agrega autenticación (saber quién es el usuario) sobre OAuth 2.0.'],
    ['¿Qué es un IDOR y cómo se previene?', 'Acceder a objetos ajenos cambiando un identificador en la petición. Se previene verificando en el servidor, para cada objeto, que el usuario tiene permiso sobre él.'],
    ['¿Por qué las passkeys resisten el phishing?', 'Porque la credencial está ligada criptográficamente al dominio legítimo: en un sitio falso no funciona, y no hay un secreto que la persona pueda escribir y entregar.']
  ],
  cites: ['Morris, R. y Thompson, K. (1979). Password Security: A Case History. *Communications of the ACM*, 22(11).', 'Grassi, P. et al. (2017). *NIST SP 800-63B: Digital Identity Guidelines — Authentication and Lifecycle Management*. NIST.', 'Hardt, D. (ed.) (2012). *RFC 6749: The OAuth 2.0 Authorization Framework*. IETF.', 'Ferraiolo, D. y Kuhn, R. (1992). Role-Based Access Controls. *15th National Computer Security Conference*.', 'OWASP. *Password Storage Cheat Sheet* y *Authentication Cheat Sheet*. cheatsheetseries.owasp.org.'],
  project: { t: 'Un sistema de autenticación hecho bien',
    goal: 'Implementar registro, inicio de sesión y autorización siguiendo las recomendaciones actuales.',
    steps: ['Registro con contraseñas hasheadas con Argon2id o bcrypt y verificación contra una lista de contraseñas filtradas.', 'Sesión en cookie HttpOnly, Secure y SameSite, con expiración y cierre de sesión que la invalide en el servidor.', 'Límite de intentos y mensajes que no revelen si la cuenta existe.', 'Segundo factor con TOTP compatible con aplicaciones como Google Authenticator.', 'Roles con autorización por objeto en el servidor y pruebas automáticas que intenten IDOR y escalada de privilegios.'],
    deliver: 'El código, las pruebas de seguridad y un documento con las decisiones tomadas y su fundamento.' },
  hito: ['Agrega a PatioApp inicio de sesión con contraseñas hasheadas (Argon2id o bcrypt), sesión en cookie HttpOnly, Secure y SameSite, y límite de intentos.', 'Implementa los roles revisor, supervisor y administrador con autorización por objeto en el servidor y pruebas contra IDOR.']
});

X('m16.crypto', {
  deep: `
## De la guerra a tu navegador
Claude Shannon fundó la criptografía moderna con *Communication Theory of Secrecy Systems* (1949), donde demostró que el **cuaderno de un solo uso** (una clave aleatoria tan larga como el mensaje, usada una sola vez) es perfectamente seguro, y que cualquier cifrado con claves más cortas solo puede ser seguro computacionalmente. En 1976, Whitfield Diffie y Martin Hellman publicaron *New Directions in Cryptography*: dos personas pueden acordar un secreto por un canal público. Al año siguiente, Rivest, Shamir y Adleman presentaron **RSA**. Diffie y Hellman recibieron el Premio Turing en 2015; Rivest, Shamir y Adleman, en 2002.

## Cifrado simétrico bien usado
El estándar actual es **AES** (el algoritmo Rijndael de Joan Daemen y Vincent Rijmen, adoptado por el NIST en 2001). Pero el algoritmo no basta: importa el **modo de operación**. El modo ECB cifra cada bloque por separado, así que bloques iguales producen resultados iguales; la famosa imagen del pingüino de Linux cifrada en ECB sigue siendo reconocible. Hoy se usa **cifrado autenticado**, como AES-GCM o ChaCha20-Poly1305, que además detecta si alguien modificó el mensaje. Regla de oro de GCM: **nunca repetir un nonce con la misma clave**.

## Hashes: lo que se rompió y lo que no
MD5 quedó roto en 2004, cuando Xiaoyun Wang y sus colegas mostraron cómo encontrar colisiones. En 2017, Google y el CWI de Ámsterdam publicaron **SHAttered**, la primera colisión práctica de SHA-1: dos PDF distintos con el mismo hash. Hoy se usan SHA-256, SHA-3 o BLAKE2/3. Para verificar integridad **con un secreto** se usa **HMAC** (Bellare, Canetti y Krawczyk, 1996), que combina el hash con una clave: sirve para firmar enlaces, cookies o webhooks.
~~~js
async function sha256(texto) {
  if (!globalThis.crypto || !crypto.subtle) return 'Web Crypto no disponible en este entorno';
  const datos = new TextEncoder().encode(texto);
  const h = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('');
}
sha256('ABC123').then(h => console.log('ABC123 →', h));
sha256('ABC124').then(h => console.log('ABC124 →', h));   // un carácter cambia todo (efecto avalancha)
~~~

## Clave pública: cifrar, acordar y firmar
- **Acuerdo de claves** (Diffie-Hellman, hoy sobre curvas elípticas, ECDHE): cliente y servidor generan un secreto compartido sin enviarlo nunca.
- **Firma digital** (RSA, ECDSA, Ed25519): se firma con la clave privada y cualquiera verifica con la pública. Garantiza autenticidad, integridad y **no repudio**.
- Las curvas elípticas, propuestas de forma independiente por Neal Koblitz y Victor Miller en 1985, ofrecen la misma seguridad que RSA con claves mucho más cortas.

## Certificados y la cadena de confianza
Un certificado X.509 asocia una clave pública con un nombre de dominio, firmado por una **autoridad de certificación**. Tu navegador confía en unas pocas autoridades raíz y verifica la cadena. **Let's Encrypt**, que empezó a operar en 2015-2016, emite certificados gratuitos y automáticos y fue decisivo para que hoy casi toda la web use HTTPS.

## Qué pasa en TLS 1.3
TLS 1.3 (RFC 8446, 2018) simplificó el protocolo: el saludo se completa en **un viaje de ida y vuelta**, solo admite algoritmos modernos y todo acuerdo de claves tiene **secreto hacia adelante** (*forward secrecy*): aunque mañana roben la clave privada del servidor, no podrán descifrar las conversaciones grabadas hoy.

## Reglas para un ingeniero que no es criptógrafo
- **No inventes tu propia criptografía.** Usa bibliotecas reconocidas con valores seguros por defecto (Web Crypto, libsodium).
- Base64 y la codificación no son cifrado: cualquiera los revierte.
- Los números aleatorios para seguridad salen de «crypto.getRandomValues», nunca de «Math.random».
- La parte difícil es la **gestión de claves**: dónde se guardan, quién accede, cómo se rotan. Usa gestores de secretos o servicios KMS.
- Prepárate para el futuro: Peter Shor mostró en 1994 que una computadora cuántica suficientemente grande rompería RSA y las curvas elípticas. En agosto de 2024 el NIST publicó los primeros estándares **poscuánticos** (FIPS 203, 204 y 205), que se están incorporando a TLS y a los sistemas operativos.
Niels Ferguson, Bruce Schneier y Tadayoshi Kohno (*Cryptography Engineering*) y Jean-Philippe Aumasson (*Serious Cryptography*) son las lecturas recomendadas para profundizar sin perderse en las matemáticas.`,
  checks: [
    ['¿Por qué el modo ECB es inseguro aunque use AES?', 'Porque cifra cada bloque de forma independiente: bloques iguales producen cifrados iguales y se filtran patrones del contenido.'],
    ['¿Qué aporta HMAC frente a un hash simple?', 'Usa una clave secreta: solo quien la conoce puede generar o verificar el código, así se detecta cualquier modificación hecha por alguien sin la clave.'],
    ['¿Qué es el secreto hacia adelante en TLS?', 'Que las claves de cada sesión se derivan de un acuerdo efímero; aunque luego se robe la clave privada del servidor, no se pueden descifrar sesiones grabadas en el pasado.'],
    ['¿Por qué Base64 no protege una contraseña?', 'Porque es solo una codificación reversible sin clave: cualquiera puede decodificarla.'],
    ['¿Qué amenaza motivó los estándares poscuánticos de 2024?', 'El algoritmo de Shor: una computadora cuántica grande podría romper RSA y la criptografía de curvas elípticas que hoy protegen el intercambio de claves y las firmas.']
  ],
  cites: ['Shannon, C. E. (1949). Communication Theory of Secrecy Systems. *Bell System Technical Journal*, 28(4).', 'Diffie, W. y Hellman, M. (1976). New Directions in Cryptography. *IEEE Transactions on Information Theory*, 22(6).', 'Rivest, R., Shamir, A. y Adleman, L. (1978). A Method for Obtaining Digital Signatures and Public-Key Cryptosystems. *Communications of the ACM*, 21(2).', 'Rescorla, E. (2018). *RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3*. IETF.', 'Ferguson, N., Schneier, B. y Kohno, T. (2010). *Cryptography Engineering*. Wiley.', 'Aumasson, J.-P. (2024). *Serious Cryptography* (2.ª ed.). No Starch Press.'],
  project: { t: 'Laboratorio criptográfico con Web Crypto',
    goal: 'Usar correctamente las primitivas criptográficas del navegador y de Node en casos prácticos.',
    steps: ['Calcula hashes SHA-256 de archivos y verifica la integridad de una descarga.', 'Genera enlaces firmados con HMAC que expiren a los 15 minutos y verifica que alterar un carácter los invalida.', 'Cifra y descifra datos con AES-GCM usando una clave generada con Web Crypto y un nonce único por mensaje.', 'Firma y verifica un documento con ECDSA o Ed25519.', 'Inspecciona el certificado TLS de tres sitios (cadena, vigencia, algoritmo) y explica cómo tu navegador decide confiar.'],
    deliver: 'El código de cada experimento y un informe con lo observado.' },
  hito: ['Genera en PatioApp enlaces de descarga de reportes firmados con HMAC y con vencimiento.', 'Cifra en reposo los datos sensibles (como el DNI de los clientes) con AES-GCM y guarda la clave fuera del código, en variables de entorno o un gestor de secretos.']
});
})();
