(function () {
var S = SDC.S;

S('plat', 'plat.iot', { title: 'Internet de las cosas: dispositivos, protocolos y seguridad',
  ask: '¿Cómo diseñarías la comunicación y la seguridad de estos dispositivos conectados?',
  lesson: `
> **La idea en simple.** El Internet de las cosas (IoT) conecta objetos físicos a la red para que informen y actúen: sensores que detectan si un espacio del patio está ocupado, lectores que registran placas, medidores de energía, cerraduras, rastreadores de vehículos. Construir estos sistemas combina lo que ya viste de embebidos, redes, bases de datos y seguridad, con restricciones nuevas: miles de dispositivos baratos, con poca energía y poca memoria, en lugares difíciles de alcanzar, durante años.

## La arquitectura típica
Un sistema IoT suele tener tres o cuatro capas:
1. **Dispositivos:** sensores y actuadores con un microcontrolador (un ESP32, un nRF52, un STM32), muchas veces alimentados por batería.
2. **Pasarela** (*gateway*), opcional: un equipo con más capacidad que reúne los datos de dispositivos cercanos que usan protocolos de corto alcance (Bluetooth, Zigbee, LoRa) y los reenvía a internet. También puede filtrar, agregar y decidir localmente.
3. **Plataforma en la nube:** recibe los mensajes, administra los dispositivos (registro, configuración, actualizaciones), guarda los datos y dispara reglas y alertas.
4. **Aplicaciones:** paneles, aplicaciones móviles e integraciones con otros sistemas (como PatioApp).
Procesar cerca del dispositivo (en la pasarela o en el propio dispositivo) se llama **computación en el borde** (*edge computing*): reduce la latencia, el tráfico y la dependencia de la conexión. Un sensor de ocupación no necesita enviar 100 lecturas por segundo; basta con avisar cuando el espacio **cambia** de libre a ocupado.

## Conectividad: alcance, energía y ancho de banda
| Tecnología | Alcance | Consumo | Ancho de banda | Uso típico |
|---|---|---|---|---|
| Wi-Fi | decenas de metros | alto | alto | cámaras, equipos con energía de red |
| Bluetooth de baja energía (BLE) | 10–50 m | muy bajo | bajo | sensores cercanos, wearables, balizas |
| Zigbee y Thread | decenas de metros, en malla | bajo | bajo | domótica |
| LoRaWAN | 2–15 km | muy bajo | muy bajo (pocos bytes) | sensores dispersos en áreas grandes |
| NB-IoT y LTE-M | cobertura celular | bajo | bajo a medio | medidores, rastreo de vehículos |
| 4G / 5G | cobertura celular | alto | alto | video, rastreo con muchos datos |
No hay una mejor: se elige según el alcance, si hay energía disponible, cuántos datos se envían y el costo por dispositivo. Un patio de varias hectáreas con sensores a batería en cada espacio es un caso típico para **LoRaWAN** o **BLE con pasarelas**; un rastreador en un camión que recorre el país, para **LTE-M** o **NB-IoT**. **Matter** (2022), impulsado por Apple, Google, Amazon y otros, busca que los dispositivos domésticos de distintas marcas funcionen juntos sobre Wi-Fi y Thread.

## MQTT: publicar y suscribirse
El protocolo más usado para mensajes IoT es **MQTT**, creado en 1999 por Andy Stanford-Clark (IBM) y Arlen Nipper para monitorear oleoductos por enlaces satelitales caros y poco fiables, y hoy estándar de OASIS. Su modelo es de **publicación y suscripción** a través de un intermediario (*broker*, como Mosquitto, EMQX o los servicios de AWS IoT y Azure IoT Hub):
- Los dispositivos **publican** mensajes en **temas** jerárquicos: «patio/callao/zonaA/espacio07/ocupacion».
- Los interesados se **suscriben** a temas, con comodines: «+» reemplaza un nivel («patio/callao/+/+/ocupacion»: la ocupación de todos los espacios de Callao) y «#» todos los niveles siguientes («patio/callao/#»: todo lo de Callao).
- Tres niveles de **calidad de servicio** (QoS): 0 (como mucho una vez, sin confirmación), 1 (al menos una vez, puede duplicarse) y 2 (exactamente una vez, más costoso).
- Mensajes **retenidos**: el intermediario guarda el último valor de un tema y lo entrega a quien se suscriba después (el estado actual del espacio).
- **Último deseo** (*last will*): un mensaje que el intermediario publica si el dispositivo se desconecta sin avisar ("sensor 07 fuera de línea").
El encabezado mínimo de MQTT es de 2 bytes, ideal para dispositivos y redes limitados.
~~~js
// ¿Un tema coincide con un filtro de suscripción MQTT?
function coincide(filtro, tema) {
  const f = filtro.split('/'), t = tema.split('/');
  for (let i = 0; i < f.length; i++) {
    if (f[i] === '#') return true;                       // todo lo que sigue
    if (i >= t.length) return false;
    if (f[i] !== '+' && f[i] !== t[i]) return false;     // + acepta cualquier valor en ese nivel
  }
  return f.length === t.length;
}
console.log(coincide('patio/callao/+/+/ocupacion', 'patio/callao/zonaA/espacio07/ocupacion'));   // true
console.log(coincide('patio/callao/#', 'patio/callao/zonaB/espacio12/bateria'));                  // true
console.log(coincide('patio/ate/+/+/ocupacion', 'patio/callao/zonaA/espacio07/ocupacion'));       // false
~~~
Otras opciones: **CoAP** (similar a HTTP pero sobre UDP, para dispositivos muy limitados), **HTTP** (simple y universal cuando la energía no es problema) y **WebSockets** para llevar los datos en tiempo real hasta un panel web.

## Datos de sensores
Los datos IoT son **series de tiempo**: muchas lecturas pequeñas con marca de tiempo. Por eso se guardan en bases optimizadas para ellas (TimescaleDB, InfluxDB) o en tablas particionadas por fecha. Problemas habituales y cómo tratarlos:
- **Lecturas ruidosas o falsas:** un camión que pasa por encima de un espacio activa el sensor dos segundos. Se usa **histéresis** o un tiempo mínimo (el espacio cuenta como ocupado tras 30 segundos de lectura continua).
- **Datos que llegan tarde o desordenados** por cortes de red: cada mensaje lleva la hora del dispositivo, y el sistema ordena por ella, no por la hora de llegada.
- **Relojes desajustados:** los dispositivos sincronizan su hora (por NTP o con la pasarela) y se vigila la deriva.
- **Dispositivos silenciosos:** un sensor que no envía nada puede estar bien (no hubo cambios) o muerto. Se envía un **latido** periódico (*heartbeat*) con el nivel de batería, y una alerta si falta.
Las plataformas mantienen además un **gemelo** o **sombra** de cada dispositivo (*device shadow*): un documento con su estado **reportado** (lo último que dijo) y el **deseado** (lo que se le pidió, como una nueva configuración), que se sincronizan cuando el dispositivo se conecta.

## Seguridad: el eslabón más débil
Los dispositivos IoT son blancos frecuentes porque son muchos, baratos, rara vez actualizados y conectados a redes donde pueden servir de puerta de entrada. En octubre de 2016, la red de bots **Mirai**, formada por cientos de miles de cámaras y grabadoras infectadas usando **contraseñas por defecto** de fábrica, lanzó un ataque de denegación de servicio contra el proveedor de DNS Dyn que dejó inaccesibles durante horas a sitios como Twitter, Netflix y GitHub en buena parte de Estados Unidos y Europa. Las prácticas mínimas, recogidas por OWASP (*IoT Top 10*) y por normas como ETSI EN 303 645:
- **Sin contraseñas por defecto** compartidas: cada dispositivo con credenciales únicas o un certificado propio.
- **Identidad por dispositivo** con certificados (TLS mutuo) y **provisionamiento** seguro al fabricarlo o instalarlo.
- **Cifrado** de las comunicaciones (MQTT sobre TLS).
- **Actualizaciones firmadas** por el aire durante toda la vida del producto, con un período de soporte declarado.
- **Mínima superficie:** sin servicios innecesarios abiertos (telnet, paneles web de depuración).
- **Segmentación de red:** los dispositivos en una red separada de las computadoras de la oficina, con acceso solo a lo que necesitan.
- **Permisos por tema:** cada sensor solo puede publicar en sus propios temas, para que uno comprometido no pueda falsear los demás.

## Ejemplo resuelto: ocupación en tiempo real del patio de Lurín
El patio de Lurín tiene 600 espacios en 4 hectáreas, y los operadores pierden tiempo buscando espacios libres.
1. **Dispositivos:** un sensor magnético de bajo consumo en cada espacio, a batería (meta: 5 años), que detecta la masa metálica de un vehículo.
2. **Conectividad:** LoRaWAN con dos pasarelas en postes, cubriendo todo el patio; cada sensor solo transmite cuando el espacio cambia de estado y un latido cada 6 horas con su batería.
3. **Mensajes:** las pasarelas publican en MQTT con temas «patio/lurin/<zona>/<espacio>/ocupacion» (mensajes retenidos con el estado actual) y «…/bateria».
4. **Procesamiento:** un servicio suscrito a «patio/lurin/+/+/ocupacion» aplica un tiempo mínimo de 30 segundos para descartar vehículos de paso, actualiza el mapa de espacios en PatioApp y avisa si un espacio está ocupado sin estadía registrada (posible ingreso no registrado).
5. **Seguridad:** credenciales únicas por sensor, permisos por tema, cifrado y la red de las pasarelas separada de la oficina.
6. **Operación:** un panel de salud con sensores sin latido y baterías bajas. Resultado: el operador ve los espacios libres en el teléfono al momento del ingreso, y aparecen 14 unidades que ocupaban espacios sin estadía registrada en el primer mes.`,
  links: [['plat.embedded', 'microcontroladores, tiempo real y actualizaciones'], ['red.app', 'protocolos de aplicación'], ['m16.threat', 'modelado de amenazas']],
  read: 'Hillar, *MQTT Essentials* (2017); OASIS, *MQTT Version 5.0* (2019); OWASP, *IoT Top 10* (2018); ETSI EN 303 645, *Cyber Security for Consumer Internet of Things*.',
  terms: [
    ['Internet de las cosas', 'conexión de objetos físicos a la red para que informen y actúen', ['Sensores.', 'Actuadores.', 'IoT.']],
    ['Pasarela', 'equipo que reúne datos de dispositivos cercanos y los reenvía a internet', ['Gateway.', 'LoRa.', 'Borde.']],
    ['Computación en el borde', 'procesamiento cerca de los dispositivos en lugar de en la nube', ['Edge.', 'Menos latencia.', 'Menos tráfico.']],
    ['LoRaWAN', 'tecnología de comunicación de largo alcance y muy bajo consumo para pocos datos', ['Kilómetros.', 'Batería.', 'Patios y campos.']],
    ['MQTT', 'protocolo liviano de publicación y suscripción a través de un intermediario', ['Stanford-Clark, 1999.', 'Temas.', 'QoS.']],
    ['Tema MQTT', 'cadena jerárquica que identifica el canal en el que se publican mensajes', ['patio/callao/+.', '+ y #.', 'Suscripciones.']],
    ['Latido', 'mensaje periódico que indica que un dispositivo sigue vivo', ['Heartbeat.', 'Batería.', 'Alerta si falta.']],
    ['Sombra del dispositivo', 'documento con el estado reportado y deseado de un dispositivo en la plataforma', ['Device shadow.', 'Gemelo.', 'Sincronización.']]
  ],
  q: [
    ['¿Qué hace una pasarela en un sistema IoT?', 'Reúne datos de dispositivos cercanos y los reenvía a internet, a veces procesándolos', ['Fabrica sensores', 'Reemplaza la nube siempre', 'Carga las baterías'], 'Gateway.', 1],
    ['¿Qué tecnología conviene para sensores a batería repartidos en varias hectáreas?', 'LoRaWAN o BLE con pasarelas', ['Wi-Fi en cada sensor', '5G en cada sensor', 'Cable Ethernet'], 'Alcance y bajo consumo.', 2],
    ['¿Qué coincide con el filtro MQTT «patio/callao/+/+/ocupacion»?', 'patio/callao/zonaA/espacio07/ocupacion', ['patio/ate/zonaA/espacio07/ocupacion', 'patio/callao/zonaA/ocupacion', 'patio/callao/zonaA/espacio07/bateria'], '+ reemplaza un nivel exacto.', 3],
    ['¿Para qué sirve un mensaje retenido en MQTT?', 'Para que quien se suscriba después reciba el último valor del tema', ['Para borrar mensajes', 'Para cifrar', 'Para reintentar la conexión'], 'Estado actual.', 2],
    ['¿Qué permitió el ataque de Mirai en 2016?', 'Infectar cientos de miles de dispositivos con contraseñas por defecto', ['Un error en MQTT', 'Un fallo de LoRa', 'Un virus de computadoras de escritorio'], 'Sin contraseñas por defecto.', 2],
    ['¿Cómo se evita contar como ocupado un espacio por un camión que solo pasa?', 'Con histéresis o un tiempo mínimo de lectura continua', ['Enviando más lecturas', 'Apagando el sensor', 'No se puede'], 'Datos ruidosos.', 3],
    ['¿Por qué cada sensor debe poder publicar solo en sus propios temas?', 'Para que uno comprometido no pueda falsear los datos de los demás', ['Para ahorrar batería', 'Porque MQTT lo exige siempre', 'Para que sea más rápido'], 'Permisos por tema.', 4],
    { tf: 'En MQTT, el nivel de calidad de servicio 1 garantiza que el mensaje llega exactamente una vez.', v: false, e: 'QoS 1 es al menos una vez (puede duplicarse); QoS 2 es exactamente una vez.', l: 2 },
    { tf: 'Un sensor que no envía datos puede estar funcionando bien o estar muerto, por eso se usa un latido periódico.', v: true, e: 'Heartbeat con batería.', l: 1 },
    { c: 'Escribe «coincideTema(filtro, tema)»: devuelve true si el tema MQTT coincide con el filtro, con los comodines + (un nivel) y # (todos los niveles siguientes).', f: 'coincideTema', p: ['filtro', 'tema'], t: [[['patio/callao/+/+/ocupacion', 'patio/callao/zonaA/espacio07/ocupacion'], true], [['patio/callao/#', 'patio/callao/zonaB/espacio12/bateria'], true], [['patio/ate/+/+/ocupacion', 'patio/callao/zonaA/espacio07/ocupacion'], false], [['patio/+/zonaA', 'patio/lurin/zonaA/espacio01'], false]], sol: '  const f = filtro.split(\'/\'), t = tema.split(\'/\');\n  for (let i = 0; i < f.length; i++) {\n    if (f[i] === \'#\') return true;\n    if (i >= t.length) return false;\n    if (f[i] !== \'+\' && f[i] !== t[i]) return false;\n  }\n  return f.length === t.length;', l: 3 },
    { c: 'Escribe «sinLatido(ultimos, ahora, maxHoras)»: recibe { sensor: horaUltimoLatido } y devuelve la lista ordenada de sensores sin latido hace más de maxHoras.', f: 'sinLatido', p: ['ultimos', 'ahora', 'maxHoras'], t: [[[{ s01: 10, s02: 2, s03: 9 }, 12, 6], ['s02']], [[{ a: 0 }, 5, 6], []]], sol: '  return Object.keys(ultimos).filter(s => ahora - ultimos[s] > maxHoras).sort();', l: 1 },
    { c: 'Escribe «ocupadoEstable(lecturas, minSeg)»: lecturas es una lista ordenada de [segundo, ocupado(0/1)]; devuelve true si la última racha continua de 1 dura al menos minSeg hasta la última lectura.', f: 'ocupadoEstable', p: ['lecturas', 'minSeg'], t: [[[[[0, 0], [10, 1], [20, 1], [45, 1]], 30], true], [[[[0, 1], [5, 0], [10, 1], [15, 1]], 30], false], [[[[0, 0]], 30], false]], sol: '  let i = lecturas.length - 1;\n  if (i < 0 || lecturas[i][1] !== 1) return false;\n  while (i > 0 && lecturas[i - 1][1] === 1) i--;\n  return lecturas[lecturas.length - 1][0] - lecturas[i][0] >= minSeg;', l: 3 }
  ],
  gen: function (g) {
    var co = [['Sensores a batería en un campo de 5 km', 'LoRaWAN'], ['Cámara de video con energía de red en la oficina', 'Wi-Fi'], ['Rastreador en un camión que recorre el país', 'NB-IoT o LTE-M'], ['Sensor junto a un teléfono a pocos metros', 'Bluetooth de baja energía'], ['Bombillas y enchufes inteligentes en una casa, en malla', 'Zigbee o Thread']];
    co.forEach(function (c) { g.mcq(2, '¿Qué conectividad conviene? ' + c[0], c[1], ['LoRaWAN', 'Wi-Fi', 'NB-IoT o LTE-M', 'Bluetooth de baja energía', 'Zigbee o Thread'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Alcance, energía y ancho de banda.'); });
    var mq = [['patio/callao/+/+/ocupacion', 'patio/callao/zonaA/e07/ocupacion', 'Sí'], ['patio/callao/#', 'patio/callao/zonaB/e12/bateria', 'Sí'], ['patio/+/zonaA/+/ocupacion', 'patio/ate/zonaB/e01/ocupacion', 'No'], ['patio/lurin/+', 'patio/lurin/zonaA/e01', 'No'], ['#', 'cualquier/tema/aqui', 'Sí']];
    mq.forEach(function (m) { g.mcq(3, '¿El filtro "' + m[0] + '" recibe mensajes del tema "' + m[1] + '"?', m[2], [m[2] === 'Sí' ? 'No' : 'Sí', 'Solo con QoS 2', 'Solo si es retenido'], '+ es un nivel, # son todos los siguientes.'); });
    var qo = [['Puede perderse, sin confirmación', 'QoS 0'], ['Llega al menos una vez y puede duplicarse', 'QoS 1'], ['Llega exactamente una vez', 'QoS 2']];
    qo.forEach(function (q) { g.mcq(2, '¿Qué calidad de servicio MQTT es? ' + q[0], q[1], ['QoS 0', 'QoS 1', 'QoS 2', 'QoS 3'].filter(function (x) { return x !== q[1]; }), 'Niveles de QoS.'); });
  },
  checks: [
    ['Describe la arquitectura típica de un sistema IoT y qué es la computación en el borde.', 'Dispositivos, pasarela, plataforma en la nube y aplicaciones; procesar cerca del dispositivo para reducir latencia, tráfico y dependencia de la red.'],
    ['¿Cómo se elige la conectividad?', 'Según alcance, disponibilidad de energía, cantidad de datos y costo: Wi-Fi, BLE, Zigbee/Thread, LoRaWAN, NB-IoT/LTE-M o celular.'],
    ['Explica MQTT: temas, comodines, QoS, retenidos y último deseo.', 'Publicación y suscripción por temas jerárquicos con + y #; QoS 0, 1 y 2; el retenido guarda el último valor y el último deseo avisa una desconexión inesperada.'],
    ['¿Qué prácticas de seguridad son indispensables en IoT y qué enseñó Mirai?', 'Credenciales únicas, identidad con certificados, cifrado, actualizaciones firmadas, mínima superficie, segmentación y permisos por tema; Mirai mostró el peligro de las contraseñas por defecto.']
  ],
  cites: ['OASIS (2019). *MQTT Version 5.0*. docs.oasis-open.org.', 'Antonakakis, M. y otros (2017). Understanding the Mirai Botnet. *USENIX Security Symposium 2017*.', 'OWASP Foundation (2018). *OWASP Internet of Things Top 10*. owasp.org.', 'ETSI (2020). *EN 303 645: Cyber Security for Consumer Internet of Things: Baseline Requirements*.', 'Shi, W., Cao, J., Zhang, Q., Li, Y. y Xu, L. (2016). Edge Computing: Vision and Challenges. *IEEE Internet of Things Journal*, 3(5).'],
  project: { t: 'Un sistema de sensores',
    goal: 'Diseñar y simular un sistema IoT completo con mensajes, procesamiento y seguridad.',
    steps: ['Elige un caso (ocupación de espacios, temperatura de un almacén, consumo eléctrico) y justifica la conectividad.', 'Diseña la jerarquía de temas MQTT, los mensajes retenidos y el último deseo.', 'Simula 50 dispositivos que publican en un intermediario local (por ejemplo, Mosquitto) con ruido y cortes.', 'Escribe el servicio que se suscribe, filtra el ruido, detecta dispositivos sin latido y guarda una serie de tiempo.', 'Escribe el modelo de seguridad: identidad por dispositivo, permisos por tema, cifrado y actualizaciones.'],
    deliver: 'El diseño, el simulador, el servicio y el documento de seguridad.' },
  hito: ['Diseña la jerarquía de temas MQTT y los permisos por sensor para la ocupación en tiempo real de los patios de PatioApp.', 'Implementa en PatioApp la alerta de espacios ocupados sin estadía registrada y el panel de salud de sensores.']
});
SDC.after('plat.iot', 'plat.embedded');
})();
