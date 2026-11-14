(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m16', { prof: true });

D('m16.owasp', `## Control de acceso roto: el primero de la lista
En el OWASP Top 10 de 2021, la categoría que más subió fue el **control de acceso roto**, que pasó al primer lugar: se encontró en el 94 % de las aplicaciones analizadas. El caso típico es la **referencia directa insegura a objetos** (IDOR): la URL «/api/estadias/1532» devuelve la estadía 1532, y basta con cambiar el número a 1533 para ver la de otro cliente, porque el servidor verifica que el usuario inició sesión pero no que la estadía le pertenece. Reglas:
- **Denegar por defecto:** todo está prohibido salvo lo que se permite explícitamente.
- **Verificar la autorización en el servidor en cada petición**, sobre el objeto concreto ("¿esta estadía pertenece a un patio de este operador?"), nunca confiar en que el cliente oculte un botón.
- **Centralizar** la lógica de autorización en un solo lugar reutilizado, no repetida en cada controlador.
- **Probarla:** pruebas automáticas que intenten acceder a recursos de otro usuario y esperen un error 403 o 404.

## Ejemplo resuelto: revisión rápida de seguridad de PatioApp
| Riesgo del Top 10 | Dónde podría aparecer | Defensa aplicada |
| Control de acceso roto | un operador de una sede consulta estadías de otra | filtro por sede en el repositorio, verificado en cada consulta, con pruebas |
| Fallas criptográficas | fotos de unidades servidas por HTTP | HTTPS obligatorio con HSTS; fotos en almacenamiento privado con URL firmadas que vencen |
| Inyección | búsqueda por placa | consultas parametrizadas en todo el acceso a datos |
| Diseño inseguro | se puede registrar la salida sin cobrar si se corta la red | regla de negocio: salida sin cobro solo con autorización del supervisor, registrada |
| Componentes vulnerables | bibliotecas de npm desactualizadas | escaneo de dependencias en el pipeline y actualizaciones semanales automáticas |
| Fallas de registro y monitoreo | nadie nota intentos masivos de inicio de sesión | alertas por tasa de fallos de autenticación |`);

D('m16.auth', `## Errores frecuentes con tokens JWT
Los **JSON Web Tokens** (RFC 7519, 2015) son muy usados y muy mal usados. Errores clásicos:
- **Aceptar el algoritmo "none"** o dejar que el token elija el algoritmo: en 2015, Tim McLean mostró que varias bibliotecas aceptaban tokens sin firma o confundían claves simétricas y asimétricas. La aplicación debe fijar el algoritmo esperado.
- **Guardar datos sensibles en el token:** el contenido de un JWT está codificado en Base64, **no cifrado**; cualquiera puede leerlo.
- **Tokens que no vencen** o con vencimientos de meses: si se roban, sirven para siempre. Lo habitual es un token de acceso corto (minutos) y un token de renovación más largo, que se puede revocar.
- **No poder revocar:** un JWT válido sigue siéndolo hasta que vence, aunque el usuario cierre sesión o sea dado de baja. Para revocar hacen falta listas de revocación o tokens cortos.
- **Guardarlo en localStorage**, donde cualquier script inyectado (XSS) puede leerlo; muchas guías recomiendan cookies con los atributos HttpOnly, Secure y SameSite.

## Ejemplo resuelto: identidad y permisos en PatioApp
- **Operadores y supervisores:** inicio de sesión con contraseña (verificada contra listas de contraseñas filtradas) y **llaves de acceso** (*passkeys*) en las tablets; segundo factor obligatorio para supervisores.
- **Dueños de unidades:** enlace mágico por WhatsApp o correo, de un solo uso y válido 15 minutos; no necesitan contraseña.
- **Autorización:** roles (operador, supervisor, administrador) combinados con atributos (la sede del usuario): un control de acceso basado en atributos simple, escrito como política en un solo módulo.
- **Sesiones:** token de acceso de 15 minutos y renovación de 8 horas (un turno), en cookie HttpOnly; cerrar sesión revoca la renovación.
- **Auditoría:** todo cambio de tarifas y toda salida sin cobro registra quién, cuándo y desde qué dispositivo.`);

D('m16.crypto', `## Gestión de claves
Un sistema de cifrado es tan seguro como sus claves. Kerckhoffs ya lo decía en 1883: el secreto debe estar en la clave, no en el algoritmo. Prácticas:
- **Nunca escribir claves en el código** ni subirlas al repositorio. Herramientas como gitleaks o el escaneo de secretos de GitHub detectan las que se filtran; GitHub reportó millones de secretos expuestos en repositorios públicos cada año.
- Guardarlas en un **gestor de secretos** (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) o en un **módulo de seguridad de hardware** (HSM) para las más críticas, como las que firman comprobantes.
- **Cifrado por sobres** (*envelope encryption*): los datos se cifran con una clave de datos, y esa clave se cifra con una clave maestra que nunca sale del servicio de gestión de claves (KMS). Así se puede rotar la clave maestra sin volver a cifrar todos los datos.
- **Rotar** las claves periódicamente y siempre que alguien con acceso deja la organización o se sospecha una filtración.
- **Separar** claves por entorno y por propósito.

## Criptografía poscuántica
Una computadora cuántica suficientemente grande podría romper RSA y la criptografía de curvas elípticas con el algoritmo de Peter Shor (1994). No existe todavía, pero un atacante puede **guardar hoy** tráfico cifrado para descifrarlo en el futuro ("almacenar ahora, descifrar después"). Por eso el NIST publicó en agosto de 2024 sus primeros estándares de criptografía **poscuántica**: FIPS 203 (ML-KEM, basado en Kyber, para acordar claves), FIPS 204 (ML-DSA, basado en Dilithium) y FIPS 205 (SLH-DSA, basado en SPHINCS+) para firmas. Navegadores y servicios como Chrome, Cloudflare y Signal ya usan esquemas **híbridos** que combinan un algoritmo clásico y uno poscuántico. Para un ingeniero de aplicaciones, la lección práctica es la **agilidad criptográfica**: diseñar los sistemas para poder cambiar de algoritmo sin rehacerlos.`);

S('m16', 'm16.threat', { title: 'Modelado de amenazas',
  ask: '¿Qué concepto de modelado de amenazas se aplica?',
  lesson: `
> **La idea en simple.** Antes de instalar alarmas en una casa, conviene pensar como un ladrón: ¿por dónde podría entrar? ¿Qué hay de valor? ¿Qué puerta es más débil? Modelar amenazas es eso aplicado al software: sentarse con el diagrama del sistema y preguntarse sistemáticamente qué podría salir mal desde el punto de vista de un atacante, **antes** de construir, cuando corregir el diseño es barato.

## Las cuatro preguntas
Adam Shostack, que lideró el modelado de amenazas en Microsoft y escribió *Threat Modeling: Designing for Security* (2014), resume todo el método en cuatro preguntas:
1. **¿En qué estamos trabajando?** Modelar el sistema: componentes, datos, flujos y límites de confianza.
2. **¿Qué puede salir mal?** Identificar amenazas, de forma sistemática.
3. **¿Qué vamos a hacer al respecto?** Decidir respuestas: mitigar, eliminar, transferir o aceptar.
4. **¿Hicimos un buen trabajo?** Revisar el modelo y validar que las mitigaciones se implementaron.
El *Threat Modeling Manifesto* (2020), escrito por Shostack y otros expertos, agrega que el modelado es una actividad **continua** que debe hacerse temprano y repetirse cuando el sistema cambia, y que lo valioso es la conversación y el razonamiento, no el documento.

## Paso 1: diagramas de flujo de datos
La herramienta clásica es el **diagrama de flujo de datos** (DFD) con cuatro elementos:
- **Entidades externas** (rectángulos): usuarios y sistemas fuera de nuestro control (el operador, la pasarela de pago).
- **Procesos** (círculos): el código que transforma datos (la API, el servicio de notificaciones).
- **Almacenes de datos** (líneas paralelas): bases de datos, archivos, colas.
- **Flujos de datos** (flechas): qué datos viajan entre elementos.
Y un elemento clave: los **límites de confianza** (líneas punteadas), donde cambia el nivel de confianza: entre internet y la API, entre la API y la base de datos, entre la tablet del operador y el servidor. **Las amenazas se concentran en los cruces de límites de confianza**, porque ahí los datos pasan de un lugar que no controlamos a uno que sí.

## Paso 2: STRIDE
Loren Kohnfelder y Praerit Garg, en Microsoft, propusieron en 1999 la nemotecnia **STRIDE** para recorrer cada elemento del diagrama preguntándose por seis tipos de amenazas, cada una opuesta a una propiedad de seguridad:
| Amenaza | Viola | Ejemplo en PatioApp | Mitigación típica |
| **S**uplantación (*Spoofing*) | autenticación | alguien se hace pasar por un operador | autenticación fuerte, segundo factor |
| **T**amper (manipulación) | integridad | se modifica el monto de una estadía en tránsito | TLS, firmas, validación en el servidor |
| **R**epudio | no repudio | un supervisor niega haber autorizado una salida sin cobro | registros de auditoría firmados y con hora |
| Divulgación de **I**nformación | confidencialidad | se filtran teléfonos de dueños | cifrado, control de acceso, minimizar datos |
| Denegación de servicio (**D**oS) | disponibilidad | se inunda la API de peticiones en hora punta | límites de tasa, escalado, CDN |
| Elevación de privilegios (**E**levation) | autorización | un operador obtiene permisos de administrador | verificación de autorización en el servidor, mínimo privilegio |
Una técnica útil es **STRIDE por elemento**: a las entidades externas les aplican sobre todo S y R; a los procesos, las seis; a los almacenes, T, I, D (y R si son registros); a los flujos, T, I y D.

## Otras técnicas
- **Árboles de ataque** (Bruce Schneier, 1999): la meta del atacante en la raíz ("salir con una unidad sin pagar") y las formas de lograrla como ramas, con nodos "Y" (hacen falta todas) y "O" (basta una). Se pueden anotar con costo, dificultad o probabilidad para encontrar el camino más barato del atacante.
- **LINDDUN** (KU Leuven, 2010): equivalente de STRIDE para amenazas a la **privacidad**: vinculación (*Linkability*), identificación, no repudio (no deseado por el usuario), detección, divulgación de datos, desconocimiento (*Unawareness*) e incumplimiento (*Non-compliance*).
- **PASTA** (*Process for Attack Simulation and Threat Analysis*, 2015): metodología en siete etapas centrada en el riesgo para el negocio.
- **Juegos de cartas:** *Elevation of Privilege* (Shostack, Microsoft, 2010) convierte STRIDE en un juego de cartas para que los equipos de desarrollo practiquen sin ser expertos.
- **MITRE ATT&CK**: base de conocimiento pública de tácticas y técnicas reales de los atacantes, útil para pensar cómo actúan.

## Paso 3: priorizar y responder
No todas las amenazas merecen el mismo esfuerzo. Se estima el **riesgo** (probabilidad por impacto) con algún método: escalas simples de alto, medio y bajo; **DREAD** (daño, reproducibilidad, explotabilidad, usuarios afectados, descubribilidad), que Microsoft usó y luego abandonó por ser demasiado subjetivo; o el **CVSS** para vulnerabilidades concretas. Las respuestas posibles son las mismas que para cualquier riesgo:
- **Mitigar:** agregar controles que reduzcan la probabilidad o el impacto.
- **Eliminar:** quitar la funcionalidad o los datos que crean la amenaza (no guardar el número de documento si no hace falta elimina el riesgo de filtrarlo).
- **Transferir:** que otro asuma el riesgo (usar una pasarela de pago certificada en lugar de procesar tarjetas propias; contratar un seguro).
- **Aceptar:** documentar que el riesgo es bajo o la mitigación demasiado cara, con la firma de quien tiene autoridad para aceptarlo.
Cada amenaza mitigada se convierte en **requisitos de seguridad** y en **pruebas**: si el modelo dice "un operador no puede ver estadías de otra sede", debe haber una prueba automatizada que lo intente y falle.
~~~js
// Árbol de ataque: costo mínimo para el atacante (nodos "O" toman el mínimo; nodos "Y", la suma)
function costo(n) {
  if (n.costo !== undefined) return n.costo;
  const hijos = n.hijos.map(costo);
  return n.tipo === 'Y' ? hijos.reduce((a, b) => a + b, 0) : Math.min(...hijos);
}
const salirSinPagar = { tipo: 'O', hijos: [
  { nombre: 'sobornar al operador', costo: 300 },
  { tipo: 'Y', hijos: [ { nombre: 'robar credenciales de supervisor', costo: 150 }, { nombre: 'autorizar salida sin cobro', costo: 10 } ] },
  { nombre: 'manipular el monto en la petición', costo: 5000 }      // costoso: el servidor recalcula la tarifa
] };
console.log('costo mínimo para el atacante:', costo(salirSinPagar));
~~~
El ejemplo muestra que el camino más barato es robar las credenciales de un supervisor; por eso el segundo factor para supervisores es la mitigación con más valor.

## Cuándo y cómo hacerlo
- **Temprano:** en el diseño de un sistema nuevo o de una funcionalidad que cruza límites de confianza (pagos, datos personales, integraciones, permisos).
- **De forma incremental:** en equipos ágiles, una sesión corta (30 a 60 minutos) para cada funcionalidad relevante, en lugar de un gran documento único.
- **Con el equipo:** desarrolladores, arquitecto, alguien de seguridad y alguien que conozca el negocio. Los atacantes explotan reglas de negocio, no solo fallas técnicas.
- **Versionado:** el diagrama y la lista de amenazas viven en el repositorio y se actualizan con los cambios de arquitectura.

## Ejemplo resuelto: modelado de amenazas del portal de dueños
1. **Diagrama:** dueño (entidad externa) → internet → CDN → API → base de datos y almacenamiento de fotos; límites de confianza entre internet y la API, y entre la API y los almacenes.
2. **STRIDE sobre el flujo dueño-API:**
   - S: alguien recibe el enlace mágico de otro dueño reenviado. Mitigación: un solo uso, 15 minutos, ligado al número de teléfono verificado.
   - I: un dueño cambia el identificador de la URL y ve la unidad de otro (IDOR). Mitigación: verificar la pertenencia en cada consulta, con prueba automatizada.
   - D: un bot consulta miles de placas para saber qué unidades hay en el patio. Mitigación: límite de tasa por dueño y por IP, y respuestas idénticas para placas inexistentes o ajenas.
   - I: las fotos de daños se sirven con URL predecibles. Mitigación: almacenamiento privado y URL firmadas que vencen en 5 minutos.
3. **Eliminación:** se decide no mostrar en el portal el nombre del operador que registró el ingreso; no aporta valor al dueño y expone datos de empleados.
4. **Aceptación documentada:** el riesgo de que un dueño reenvíe a otra persona una captura de pantalla de su unidad se acepta.
5. Cada mitigación genera una historia en el backlog con criterios de aceptación de seguridad.`,
  links: [['m16.owasp', 'el modelado de amenazas anticipa las fallas comunes de la lista OWASP'], ['m12.risk', 'las respuestas a las amenazas son las de la gestión de riesgos'], ['m13.views', 'los diagramas de arquitectura son la base del modelo']],
  read: 'Shostack, *Threat Modeling: Designing for Security* (2014); *Threat Modeling Manifesto* (2020); Schneier, *Attack Trees* (1999); OWASP, *Threat Modeling Cheat Sheet*.',
  terms: [
    ['Modelado de amenazas', 'análisis sistemático de lo que puede salir mal en un sistema desde el punto de vista de un atacante', ['Cuatro preguntas de Shostack.', 'Se hace temprano.', 'Produce requisitos y pruebas.']],
    ['Límite de confianza', 'frontera donde cambia el nivel de confianza entre partes del sistema', ['Entre internet y la API.', 'Línea punteada en el DFD.', 'Allí se concentran las amenazas.']],
    ['STRIDE', 'nemotecnia de seis tipos de amenaza: suplantación, manipulación, repudio, divulgación, denegación y elevación', ['Kohnfelder y Garg, 1999.', 'Microsoft.', 'Cada una viola una propiedad.']],
    ['Repudio', 'posibilidad de que alguien niegue haber realizado una acción', ['Un supervisor niega una autorización.', 'Se mitiga con auditoría.', 'Viola el no repudio.']],
    ['Árbol de ataque', 'diagrama con la meta del atacante en la raíz y las formas de lograrla como ramas', ['Schneier, 1999.', 'Nodos Y y O.', 'Encuentra el camino más barato.']],
    ['LINDDUN', 'método de modelado de amenazas a la privacidad', ['KU Leuven.', 'Vinculación, identificación, detección…', 'Complementa a STRIDE.']],
    ['Elevación de privilegios', 'amenaza en que un atacante obtiene permisos que no le corresponden', ['Un operador se vuelve administrador.', 'Viola la autorización.', 'Se mitiga con mínimo privilegio.']],
    ['Transferir un riesgo', 'respuesta en que otro asume el riesgo', ['Usar una pasarela de pago certificada.', 'Contratar un seguro.', 'No elimina la responsabilidad.']]
  ],
  q: [
    ['¿Cuáles son las cuatro preguntas del modelado de amenazas de Shostack?', '¿En qué trabajamos?, ¿qué puede salir mal?, ¿qué haremos al respecto?, ¿hicimos un buen trabajo?', ['¿Quién?, ¿cuándo?, ¿dónde?, ¿cuánto?', 'Planificar, hacer, verificar, actuar', 'Ninguna de las anteriores'], 'Resume todo el método.', 2],
    ['¿Dónde se concentran las amenazas en un diagrama de flujo de datos?', 'En los cruces de los límites de confianza', ['En los almacenes de datos únicamente', 'En el centro del diagrama', 'En ningún lugar en especial'], 'Ahí los datos pasan de lo no controlado a lo controlado.', 2],
    ['Un supervisor niega haber autorizado una salida sin cobro. ¿Qué amenaza de STRIDE es?', 'Repudio', ['Suplantación', 'Manipulación', 'Denegación de servicio'], 'Se mitiga con registros de auditoría.', 2],
    ['Un usuario cambia el número de la URL y ve la estadía de otro cliente. ¿Qué amenaza es?', 'Divulgación de información', ['Repudio', 'Denegación de servicio', 'Suplantación'], 'Es el IDOR del control de acceso roto.', 3],
    ['En un árbol de ataque, ¿cómo se calcula el costo de un nodo "O"?', 'El mínimo de sus hijos, porque basta una opción', ['La suma de sus hijos', 'El máximo', 'El promedio'], 'En un nodo "Y" se suman.', 3],
    ['No guardar el número de documento del dueño si no hace falta, ¿qué respuesta al riesgo es?', 'Eliminar', ['Mitigar', 'Transferir', 'Aceptar'], 'Quitar los datos elimina la amenaza.', 3],
    ['¿Por qué Microsoft abandonó DREAD?', 'Porque sus puntajes resultaban demasiado subjetivos', ['Porque era muy caro', 'Porque era ilegal', 'Porque no tenía letras suficientes'], 'Personas distintas daban puntajes muy distintos.', 4],
    { tf: 'El modelado de amenazas es una actividad que se hace una sola vez al final del proyecto.', v: false, e: 'Es continuo, temprano y se repite cuando el sistema cambia.', l: 1 },
    { tf: 'Cada amenaza mitigada debería convertirse en un requisito de seguridad y en una prueba.', v: true, e: 'Así se verifica que la mitigación existe.', l: 2 },
    { c: 'Escribe «costoAtaque(nodo)»: cada nodo es {costo} (hoja) o {tipo: "Y"|"O", hijos}; devuelve el costo mínimo para el atacante.', f: 'costoAtaque', p: ['nodo'], t: [[[{ tipo: 'O', hijos: [{ costo: 300 }, { tipo: 'Y', hijos: [{ costo: 150 }, { costo: 10 }] }] }], 160], [[{ costo: 7 }], 7], [[{ tipo: 'Y', hijos: [{ costo: 1 }, { costo: 2 }] }], 3]], sol: '  if (nodo.costo !== undefined) return nodo.costo;\n  const c = nodo.hijos.map(costoAtaque);\n  return nodo.tipo === "Y" ? c.reduce((a, b) => a + b, 0) : Math.min(...c);', l: 3 },
    { c: 'Escribe «strideDe(elemento)»: devuelve las letras de STRIDE que aplican por elemento: "entidad" → "SR", "proceso" → "STRIDE", "almacen" → "TID", "flujo" → "TID".', f: 'strideDe', p: ['elemento'], t: [[['entidad'], 'SR'], [['proceso'], 'STRIDE'], [['almacen'], 'TID'], [['flujo'], 'TID']], sol: '  return { entidad: "SR", proceso: "STRIDE", almacen: "TID", flujo: "TID" }[elemento];', l: 1 },
    { c: 'Escribe «cruces(flujos, zona)»: flujos es una lista de [origen, destino]; zona, un objeto {elemento: zonaDeConfianza}. Devuelve cuántos flujos cruzan un límite de confianza (origen y destino en zonas distintas).', f: 'cruces', p: ['flujos', 'zona'], t: [[[[['dueño', 'api'], ['api', 'bd'], ['api', 'cache']], { 'dueño': 'internet', api: 'dmz', bd: 'interna', cache: 'dmz' }], 2], [[[], {}], 0]], sol: '  return flujos.filter(([o, d]) => zona[o] !== zona[d]).length;', l: 2 }
  ],
  gen: function (g) {
    var st = [['Alguien inicia sesión con las credenciales robadas de un operador', 'Suplantación'], ['Se modifica el monto de la estadía en la petición', 'Manipulación'], ['Un usuario niega haber registrado una salida', 'Repudio'], ['Se filtran los teléfonos de los dueños', 'Divulgación de información'], ['Un bot inunda la API en hora punta', 'Denegación de servicio'], ['Un operador obtiene permisos de administrador', 'Elevación de privilegios'], ['Se altera un registro de auditoría guardado', 'Manipulación'], ['Un correo falso aparenta venir del sistema de comprobantes', 'Suplantación']];
    st.forEach(function (s) { g.mcq(2, '¿Qué amenaza de STRIDE es? ' + s[0], s[1], ['Suplantación', 'Manipulación', 'Repudio', 'Divulgación de información', 'Denegación de servicio', 'Elevación de privilegios'].filter(function (x) { return x !== s[1]; }).slice(0, 3), 'STRIDE: cada amenaza viola una propiedad.'); });
    var pr = [['Suplantación', 'Autenticación'], ['Manipulación', 'Integridad'], ['Repudio', 'No repudio'], ['Divulgación de información', 'Confidencialidad'], ['Denegación de servicio', 'Disponibilidad'], ['Elevación de privilegios', 'Autorización']];
    pr.forEach(function (p) { g.mcq(1, '¿Qué propiedad de seguridad viola la amenaza "' + p[0] + '"?', p[1], ['Autenticación', 'Integridad', 'No repudio', 'Confidencialidad', 'Disponibilidad', 'Autorización'].filter(function (x) { return x !== p[1]; }).slice(0, 3), 'Cada letra de STRIDE es opuesta a una propiedad.'); });
    var re = [['Agregar segundo factor a los supervisores', 'Mitigar'], ['No guardar el número de documento', 'Eliminar'], ['Usar una pasarela de pago certificada en lugar de guardar tarjetas', 'Transferir'], ['Documentar que el riesgo de capturas de pantalla es bajo y firmarlo', 'Aceptar']];
    re.forEach(function (r) { g.mcq(2, '¿Qué respuesta a la amenaza es? ' + r[0], r[1], ['Mitigar', 'Eliminar', 'Transferir', 'Aceptar'].filter(function (x) { return x !== r[1]; }), 'Cuatro respuestas al riesgo.'); });
  },
  checks: [
    ['Enuncia las cuatro preguntas del modelado de amenazas.', '¿En qué estamos trabajando?, ¿qué puede salir mal?, ¿qué vamos a hacer al respecto? y ¿hicimos un buen trabajo?'],
    ['Aplica STRIDE a un flujo de datos de un sistema que conozcas.', 'Para el flujo usuario-API: suplantación, manipulación en tránsito, divulgación y denegación, con una mitigación para cada una.'],
    ['¿Qué es un límite de confianza y por qué importa?', 'Una frontera donde cambia el nivel de confianza; las amenazas se concentran donde los datos la cruzan.'],
    ['¿Cuándo y cómo conviene modelar amenazas en un equipo ágil?', 'En sesiones cortas para cada funcionalidad que cruza límites de confianza, con el equipo, versionando el modelo en el repositorio.']
  ],
  cites: ['Shostack, A. (2014). *Threat Modeling: Designing for Security*. Wiley.', 'Kohnfelder, L. y Garg, P. (1999). *The threats to our products*. Microsoft Interface.', 'Schneier, B. (1999). Attack Trees. *Dr. Dobb’s Journal*, 24(12).', 'Deng, M. et al. (2011). A privacy threat analysis framework: supporting the elicitation and fulfillment of privacy requirements. *Requirements Engineering*, 16(1).', 'Braiterman, Z., Shostack, A. et al. (2020). *Threat Modeling Manifesto*. threatmodelingmanifesto.org.'],
  project: { t: 'Modelo de amenazas completo',
    goal: 'Modelar las amenazas de un sistema real y convertirlas en requisitos y pruebas.',
    steps: ['Dibuja el diagrama de flujo de datos de un sistema con sus límites de confianza.', 'Aplica STRIDE por elemento y lista al menos 12 amenazas.', 'Construye un árbol de ataque para la meta más grave y calcula el camino más barato.', 'Prioriza las amenazas y decide una respuesta para cada una.', 'Convierte las tres principales en historias con criterios de seguridad y pruebas automatizadas.'],
    deliver: 'El diagrama, la lista de amenazas priorizada, el árbol de ataque y las pruebas.' },
  hito: ['Modela las amenazas del portal de dueños de PatioApp con un DFD, STRIDE y un árbol de ataque.', 'Implementa en PatioApp las pruebas automatizadas de las tres amenazas principales (IDOR, límite de tasa y URL firmadas).']
});
SDC.after('m16.threat', 'm16.owasp');

S('m16', 'm16.web', { title: 'Seguridad web a fondo',
  ask: '¿Qué ataque o defensa web se aplica?',
  lesson: `
> **La idea en simple.** Un navegador es una máquina que ejecuta código de desconocidos todo el día: cada página que abres trae sus scripts. Para que una página maliciosa no pueda leer tu correo abierto en otra pestaña ni hacer transferencias en tu banco, los navegadores imponen reglas estrictas, y las aplicaciones web deben usarlas bien. Esta unidad recorre los ataques web más importantes después de la inyección y el XSS que ya viste, y las defensas que los detienen.

## La política del mismo origen
La regla fundamental de la seguridad web es la **política del mismo origen** (*same-origin policy*), introducida por Netscape en 1995: un script de una página solo puede leer datos de páginas del **mismo origen**, definido por la combinación de **esquema, host y puerto**. «https://patioapp.pe» y «https://api.patioapp.pe» son orígenes distintos; también lo son «http://» y «https://» del mismo dominio. Sin esta regla, cualquier página que visitaras podría leer tu correo abierto en otra pestaña. Ojo: la política impide **leer** respuestas de otros orígenes, pero no impide **enviar** ciertas peticiones a ellos, y de esa diferencia nacen varios ataques.

## CORS
A veces una aplicación necesita legítimamente leer datos de otro origen (el frontend en «patioapp.pe» llama a la API en «api.patioapp.pe»). El mecanismo estándar para permitirlo es **CORS** (*Cross-Origin Resource Sharing*): el servidor responde con cabeceras como «Access-Control-Allow-Origin» indicando qué orígenes pueden leer sus respuestas. Para peticiones no simples (con métodos como PUT o DELETE, o con cabeceras propias), el navegador primero envía una petición de **verificación previa** (*preflight*) con el método OPTIONS.
Errores frecuentes:
- Responder «Access-Control-Allow-Origin: *» en una API que usa cookies o datos privados (los navegadores no permiten combinar el comodín con credenciales, y algunos desarrolladores "lo arreglan" reflejando cualquier origen que llegue, lo que es igual de inseguro).
- **Reflejar** el origen de la petición sin compararlo con una lista permitida.
- Permitir el origen «null», que pueden enviar documentos locales o en marcos aislados.
CORS **no** es una defensa del servidor: es una relajación controlada de la política del mismo origen que aplica el navegador.

## CSRF
La **falsificación de peticiones entre sitios** (CSRF) aprovecha que el navegador adjunta automáticamente las cookies a cada petición a un sitio. Si un usuario tiene una sesión abierta en PatioApp y visita una página maliciosa, esa página puede incluir un formulario oculto que se envía solo a «https://patioapp.pe/tarifas/actualizar» con el monto que el atacante quiera; el navegador adjunta la cookie de sesión, y el servidor cree que el usuario lo pidió. El atacante no puede leer la respuesta, pero no le hace falta: la acción ya ocurrió.
Defensas:
- **Cookies SameSite:** el atributo «SameSite=Lax» (valor por defecto en Chrome desde 2020) evita que la cookie se envíe en peticiones POST iniciadas desde otros sitios; «Strict» la evita en toda navegación entre sitios.
- **Tokens anti-CSRF:** un valor aleatorio ligado a la sesión que el servidor incluye en sus formularios y exige en cada petición que cambia datos; la página atacante no puede conocerlo.
- **Verificar las cabeceras Origin o Referer** en las peticiones que cambian estado.
- **No usar GET para acciones que cambian datos.**
- Las APIs que se autentican con un token en una cabecera («Authorization: Bearer …») en lugar de cookies no son vulnerables a CSRF clásico, porque el navegador no adjunta esa cabecera automáticamente.

## Política de seguridad de contenido
La **política de seguridad de contenido** (CSP) es una cabecera con la que el servidor le dice al navegador de qué fuentes puede cargar scripts, estilos, imágenes y marcos. Es la **segunda línea de defensa** contra el XSS: aunque un atacante logre inyectar un script, el navegador se niega a ejecutarlo si no cumple la política.
~~~txt
Content-Security-Policy: default-src 'self';
  script-src 'self' 'nonce-r4nd0m123';
  img-src 'self' https://fotos.patioapp.pe;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self'
~~~
Las políticas modernas usan **nonces** (un valor aleatorio distinto en cada respuesta que deben llevar los scripts permitidos) o hashes, en lugar de listas de dominios, porque un estudio de Google (Weichselbaum y otros, 2016) encontró que la gran mayoría de las políticas basadas en listas de dominios podían evadirse. Se recomienda desplegar primero en modo **solo reporte** para ver qué se rompería.

## Clickjacking
En el **clickjacking** (Robert Hansen y Jeremiah Grossman, 2008), el atacante carga la página legítima dentro de un marco invisible sobre su propia página, de modo que el usuario cree hacer clic en un botón inocente ("ver video") y en realidad hace clic en "confirmar salida sin cobro". Defensa: impedir que la página se cargue en marcos ajenos con «frame-ancestors» en la CSP o con la cabecera más antigua «X-Frame-Options: DENY».

## SSRF
La **falsificación de peticiones del lado del servidor** (SSRF) ocurre cuando la aplicación hace peticiones a una URL que controla el usuario: por ejemplo, una función para "importar la foto de la unidad desde una URL". El atacante pasa una URL interna, como la de la base de datos o, la más peligrosa en la nube, la del **servicio de metadatos de la instancia** («http://169.254.169.254/»), que puede devolver credenciales temporales de la nube. Así ocurrió la filtración de **Capital One en 2019**: una falla de SSRF en un firewall de aplicaciones mal configurado permitió obtener credenciales y leer datos de unos 100 millones de clientes. SSRF entró como categoría propia en el OWASP Top 10 de 2021.
Defensas: listas permitidas de dominios de destino (no listas prohibidas, que se evaden con redirecciones, codificaciones raras o DNS que cambia), bloquear direcciones internas y privadas después de resolver el DNS, desactivar las redirecciones automáticas, usar la versión 2 del servicio de metadatos de AWS (IMDSv2), que exige un token, y ejecutar estas funciones en una red sin acceso a lo interno.

## Otras vulnerabilidades importantes
- **Deserialización insegura:** convertir datos no confiables en objetos con mecanismos que pueden ejecutar código (la serialización nativa de Java o el módulo pickle de Python). La filtración de **Equifax en 2017** (147 millones de personas) empezó con una vulnerabilidad de este tipo en Apache Struts, que tenía parche disponible desde dos meses antes.
- **Subida de archivos:** validar tipo y tamaño en el servidor, guardar fuera de la raíz web con nombres generados, y nunca ejecutar lo subido.
- **Redirecciones abiertas:** «/login?volver=https://sitio-falso.com» facilita el phishing; solo se permiten destinos internos.
- **Entidades externas XML** (XXE): analizadores XML que resuelven entidades externas pueden leer archivos del servidor; se desactiva esa función.
- **Asignación masiva:** aceptar todos los campos del JSON recibido y copiarlos al objeto permite que el usuario envíe «rol: "admin"»; se usa una lista explícita de campos permitidos.

## Cabeceras de seguridad y cookies
Un conjunto básico de cabeceras para toda aplicación web:
| Cabecera | Efecto |
| Strict-Transport-Security | obliga al navegador a usar siempre HTTPS (HSTS) |
| Content-Security-Policy | restringe fuentes de scripts y marcos |
| X-Content-Type-Options: nosniff | impide que el navegador adivine tipos de contenido |
| Referrer-Policy | limita la información de la página de origen que se envía |
| Permissions-Policy | desactiva funciones del navegador que no se usan (cámara, ubicación) |
Y las cookies de sesión con **HttpOnly** (los scripts no pueden leerla), **Secure** (solo por HTTPS), **SameSite** (contra CSRF) y, de ser posible, el prefijo «__Host-», que obliga a que sea segura y ligada al dominio exacto.
~~~js
// Revisar una cookie de sesión: ¿tiene los atributos esperados?
function revisarCookie(setCookie) {
  const attrs = setCookie.split(';').map(s => s.trim().toLowerCase());
  const falta = [];
  if (!attrs.includes('httponly')) falta.push('HttpOnly');
  if (!attrs.includes('secure')) falta.push('Secure');
  if (!attrs.some(a => a.startsWith('samesite='))) falta.push('SameSite');
  return falta.length ? 'faltan: ' + falta.join(', ') : 'correcta';
}
console.log(revisarCookie('sesion=abc123; Path=/; HttpOnly'));
console.log(revisarCookie('__Host-sesion=abc123; Path=/; Secure; HttpOnly; SameSite=Lax'));
~~~

## Ejemplo resuelto: endurecer el frontend de PatioApp
1. **Sesión** en cookie «__Host-sesion» con HttpOnly, Secure y SameSite=Lax; las acciones de cambio de tarifas exigen además un token anti-CSRF.
2. **CORS** de la API: solo «https://patioapp.pe» y «https://app.patioapp.pe», comparados contra una lista exacta; nada de reflejar orígenes.
3. **CSP** con nonces, «frame-ancestors 'none'» contra clickjacking, desplegada primero en modo solo reporte durante dos semanas; los reportes revelaron un script de analítica que se cargaba de un dominio olvidado.
4. **Importación de fotos por URL:** se elimina. Las fotos solo se suben desde el dispositivo, lo que elimina la SSRF en lugar de mitigarla.
5. **Asignación masiva:** los controladores usan esquemas de validación con los campos permitidos; una prueba envía «sede» y «rol» extra y verifica que se ignoran.
6. Una prueba automática verifica las cabeceras de seguridad en cada despliegue.`,
  links: [['m16.owasp', 'la inyección y el XSS se estudiaron en la primera unidad'], ['m9.http', 'las cabeceras y las cookies son parte de HTTP'], ['m16.auth', 'las sesiones y los tokens se protegen con estos mecanismos']],
  read: 'Zalewski, *The Tangled Web* (2011); Hoffman, *Web Application Security* (2.ª ed., 2024); OWASP Cheat Sheet Series (CSRF, CSP, SSRF); MDN Web Docs sobre CORS y CSP.',
  terms: [
    ['Política del mismo origen', 'regla del navegador que impide a un script leer datos de otro origen (esquema, host y puerto)', ['Netscape, 1995.', 'api.patioapp.pe es otro origen.', 'Impide leer, no enviar.']],
    ['CORS', 'mecanismo con el que un servidor permite que ciertos orígenes lean sus respuestas', ['Access-Control-Allow-Origin.', 'Verificación previa con OPTIONS.', 'No es una defensa del servidor.']],
    ['CSRF', 'ataque que hace que el navegador de la víctima envíe una petición con sus cookies a un sitio donde tiene sesión', ['Formulario oculto.', 'Se evita con SameSite y tokens.', 'El atacante no lee la respuesta.']],
    ['Política de seguridad de contenido', 'cabecera que limita de dónde puede cargar scripts y recursos una página', ['CSP.', 'Nonces por respuesta.', 'Segunda línea contra XSS.']],
    ['Clickjacking', 'ataque que superpone una página legítima invisible para robar clics', ['Hansen y Grossman, 2008.', 'frame-ancestors none.', 'X-Frame-Options.']],
    ['SSRF', 'ataque que hace que el servidor envíe peticiones a destinos elegidos por el atacante', ['Servicio de metadatos de la nube.', 'Capital One, 2019.', 'Se evita con listas permitidas.']],
    ['Deserialización insegura', 'convertir datos no confiables en objetos con mecanismos que pueden ejecutar código', ['Equifax, 2017.', 'pickle de Python.', 'Se prefieren formatos de solo datos.']],
    ['Asignación masiva', 'vulnerabilidad de copiar todos los campos recibidos a un objeto, incluidos los que el usuario no debería cambiar', ['rol: "admin".', 'Se usa una lista de campos permitidos.', 'Mass assignment.']]
  ],
  q: [
    ['¿Qué define un origen en la política del mismo origen?', 'El esquema, el host y el puerto', ['Solo el dominio', 'La dirección IP', 'La ruta de la URL'], 'http y https son orígenes distintos.', 2],
    ['¿Por qué funciona un ataque CSRF?', 'Porque el navegador adjunta automáticamente las cookies a las peticiones al sitio', ['Porque el atacante roba la contraseña', 'Porque el servidor no usa HTTPS', 'Porque la página está mal diseñada'], 'El atacante ni siquiera lee la respuesta.', 2],
    ['¿Qué atributo de cookie mitiga el CSRF?', 'SameSite', ['HttpOnly', 'Path', 'Max-Age'], 'Evita enviarla en peticiones iniciadas desde otros sitios.', 2],
    ['¿Por qué las CSP modernas usan nonces en vez de listas de dominios?', 'Porque la mayoría de las políticas por dominios podían evadirse', ['Porque son más cortas', 'Porque lo exige HTTP/1.1', 'Porque los dominios no existen'], 'Weichselbaum y otros, Google, 2016.', 4],
    ['Una función importa fotos desde una URL que da el usuario. ¿Qué vulnerabilidad puede tener?', 'SSRF', ['CSRF', 'Clickjacking', 'XSS almacenado'], 'Puede alcanzar servicios internos o de metadatos.', 3],
    ['¿Por qué las listas prohibidas de destinos no bastan contra SSRF?', 'Porque se evaden con redirecciones, codificaciones y DNS que cambia', ['Porque son demasiado cortas', 'Porque son ilegales', 'Sí bastan'], 'Se usan listas permitidas.', 3],
    ['¿Qué cabecera impide que la página se cargue dentro de un marco ajeno?', 'frame-ancestors en la CSP o X-Frame-Options', ['Access-Control-Allow-Origin', 'Referrer-Policy', 'Cache-Control'], 'Defensa contra clickjacking.', 2],
    { tf: 'CORS es una defensa que protege al servidor de peticiones de otros orígenes.', v: false, e: 'Es una relajación controlada de la política del mismo origen que aplica el navegador.', l: 3 },
    { tf: 'Una API autenticada con un token en la cabecera Authorization no es vulnerable al CSRF clásico.', v: true, e: 'El navegador no adjunta esa cabecera automáticamente.', l: 3 },
    { c: 'Escribe «mismoOrigen(a, b)»: recibe dos URL y devuelve true si tienen el mismo esquema, host y puerto (usa new URL(...).origin).', f: 'mismoOrigen', p: ['a', 'b'], t: [[['https://patioapp.pe/x', 'https://patioapp.pe/y?z=1'], true], [['https://patioapp.pe', 'https://api.patioapp.pe'], false], [['http://patioapp.pe', 'https://patioapp.pe'], false]], sol: '  return new URL(a).origin === new URL(b).origin;', l: 2 },
    { c: 'Escribe «origenPermitido(origen, lista)»: true solo si el origen está exactamente en la lista (nunca reflejar).', f: 'origenPermitido', p: ['origen', 'lista'], t: [[['https://patioapp.pe', ['https://patioapp.pe']], true], [['https://patioapp.pe.malo.com', ['https://patioapp.pe']], false], [['null', ['https://patioapp.pe']], false]], sol: '  return lista.includes(origen);', l: 1 },
    { c: 'Escribe «filtrarCampos(datos, permitidos)»: devuelve un objeto nuevo solo con los campos permitidos (contra la asignación masiva).', f: 'filtrarCampos', p: ['datos', 'permitidos'], t: [[[{ placa: 'A1', rol: 'admin', color: 'rojo' }, ['placa', 'color']], { placa: 'A1', color: 'rojo' }], [[{}, ['x']], {}]], sol: '  const o = {};\n  for (const k of permitidos) if (k in datos) o[k] = datos[k];\n  return o;', l: 2 }
  ],
  gen: function (g) {
    var at = [['Un formulario oculto en otro sitio envía una petición con la cookie de sesión del usuario', 'CSRF'], ['La página legítima se carga invisible sobre un botón de "ver video"', 'Clickjacking'], ['El servidor descarga una URL interna de metadatos que dio el usuario', 'SSRF'], ['Se envía un objeto serializado que ejecuta código al convertirse', 'Deserialización insegura'], ['El usuario agrega rol: "admin" al JSON de su perfil', 'Asignación masiva'], ['El enlace de inicio de sesión redirige a cualquier sitio externo', 'Redirección abierta'], ['Un analizador XML lee archivos del servidor', 'XXE']];
    at.forEach(function (a) { g.mcq(2, '¿Qué ataque es? ' + a[0], a[1], ['CSRF', 'Clickjacking', 'SSRF', 'Deserialización insegura', 'Asignación masiva', 'Redirección abierta', 'XXE'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Vulnerabilidades web.'); });
    var ca = [['Obligar a usar siempre HTTPS', 'Strict-Transport-Security'], ['Restringir de dónde se cargan scripts', 'Content-Security-Policy'], ['Impedir que el navegador adivine el tipo de contenido', 'X-Content-Type-Options'], ['Permitir que otro origen lea las respuestas', 'Access-Control-Allow-Origin'], ['Desactivar la cámara y la ubicación', 'Permissions-Policy']];
    ca.forEach(function (c) { g.mcq(2, '¿Qué cabecera HTTP sirve para esto? ' + c[0], c[1], ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Content-Type-Options', 'Access-Control-Allow-Origin', 'Permissions-Policy'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Cabeceras de seguridad.'); });
    var co = [['Impide que los scripts lean la cookie', 'HttpOnly'], ['Envía la cookie solo por HTTPS', 'Secure'], ['Evita enviar la cookie en peticiones iniciadas desde otros sitios', 'SameSite']];
    co.forEach(function (c) { g.mcq(1, '¿Qué atributo de cookie hace esto? ' + c[0], c[1], ['HttpOnly', 'Secure', 'SameSite', 'Domain'].filter(function (x) { return x !== c[1]; }), 'Atributos de las cookies de sesión.'); });
  },
  checks: [
    ['Explica la política del mismo origen y por qué existe.', 'Un script solo puede leer datos de su mismo esquema, host y puerto; sin ella, cualquier página podría leer datos de otras pestañas.'],
    ['¿Cómo funciona un ataque CSRF y cuáles son sus defensas?', 'Otra página hace que el navegador envíe una petición con las cookies del usuario; se defiende con SameSite, tokens anti-CSRF y verificación de Origin.'],
    ['¿Qué es SSRF y por qué es grave en la nube?', 'El servidor hace peticiones a destinos del atacante; en la nube puede obtener credenciales del servicio de metadatos, como en Capital One.'],
    ['Lista las cabeceras y atributos de cookie que pondrías en toda aplicación web.', 'HSTS, CSP con nonces, nosniff, Referrer-Policy, Permissions-Policy; cookies HttpOnly, Secure, SameSite y prefijo __Host-.']
  ],
  cites: ['Zalewski, M. (2011). *The Tangled Web: A Guide to Securing Modern Web Applications*. No Starch Press.', 'Weichselbaum, L. et al. (2016). CSP Is Dead, Long Live CSP! *ACM CCS 2016*.', 'Barth, A., Jackson, C. y Mitchell, J. (2008). Robust Defenses for Cross-Site Request Forgery. *ACM CCS 2008*.', 'OWASP Foundation (2021). *OWASP Top 10:2021*. owasp.org/Top10.', 'W3C (2023). *Content Security Policy Level 3*. Working Draft.'],
  project: { t: 'Laboratorio de ataques y defensas web',
    goal: 'Reproducir ataques web en un entorno controlado y aplicar sus defensas.',
    steps: ['Monta una aplicación vulnerable de práctica (como OWASP Juice Shop o DVWA) en tu computadora.', 'Reproduce un CSRF, un clickjacking y una asignación masiva, documentando cada paso.', 'Construye una aplicación propia pequeña con las defensas: SameSite, token anti-CSRF, CSP con nonces y frame-ancestors.', 'Escribe pruebas automáticas que verifiquen las cabeceras y que los ataques fallen.', 'Despliega la CSP en modo solo reporte y analiza los reportes recibidos.'],
    deliver: 'El informe de los ataques reproducidos (solo en tu entorno), el código con las defensas y las pruebas.' },
  hito: ['Configura en PatioApp cookies seguras, CORS con lista exacta, CSP con nonces y las cabeceras de seguridad, con una prueba automática que las verifique.', 'Elimina la importación de fotos por URL de PatioApp y agrega protección contra asignación masiva en todos los controladores.']
});
SDC.after('m16.web', 'm16.threat');
})();
