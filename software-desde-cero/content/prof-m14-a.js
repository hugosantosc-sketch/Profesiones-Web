(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m14', { prof: true });

D('m14.types', `Las fronteras importan también en la estrategia: ninguna técnica sola basta, y las particiones de esta unidad, las pruebas de integración y las exploratorias se complementan.

## El problema del oráculo
Para probar algo hay que saber qué resultado es el **correcto**. El mecanismo que decide si una salida es correcta se llama **oráculo de prueba**, y muchas veces es la parte más difícil. En un cálculo de tarifa, el oráculo puede ser un ejemplo calculado a mano por contabilidad; en un algoritmo de optimización de espacios, no hay forma sencilla de saber cuál es la mejor asignación posible. Estrategias cuando no hay un oráculo exacto:
- **Oráculos parciales:** verificar propiedades que siempre deben cumplirse (ninguna unidad asignada a dos espacios, ningún espacio con más unidades de las que caben).
- **Pruebas metamórficas:** verificar relaciones entre ejecuciones (si agrego un espacio libre, la asignación no debe empeorar).
- **Implementación de referencia:** comparar con una versión más simple y lenta, o con el sistema anterior.
- **Oráculos humanos**, caros pero a veces inevitables, como en la evaluación de la calidad de un texto o de una imagen.

## Ejemplo resuelto: estrategia de pruebas de PatioApp
| Nivel | Qué se prueba | Herramientas | Cuándo corre |
| Unitarias | cálculo de tarifas, reglas de la estadía, validaciones | framework de pruebas, sin base de datos | en cada guardado y en cada commit |
| Integración | repositorios contra una base real, cliente de la pasarela con un simulador | contenedores de prueba | en cada commit |
| Contrato | eventos y API entre la app móvil, la API y notificaciones | pruebas de contrato dirigidas por el consumidor | en cada commit de cada lado |
| De sistema (extremo a extremo) | ingreso, movimiento y salida completos en un entorno de prueba | automatización de navegador y de la app | antes de cada versión |
| Aceptación | escenarios Gherkin acordados con operaciones | BDD | en cada versión, revisados con el negocio |
| No funcionales | carga en hora punta, modo sin conexión, seguridad | herramientas de carga, análisis de seguridad | semanal y antes de versiones grandes |
| Exploratorias | sesiones de una hora con un objetivo | personas | cada sprint |
La proporción buscada sigue la pirámide: cientos de pruebas unitarias, decenas de integración y contrato, y pocas extremo a extremo para los recorridos críticos.`);

D('m14.unit', `## Ejemplo resuelto: TDD de la tarifa de PatioApp
Requisito: "La estadía cuesta 20 soles por día o fracción; las unidades con convenio tienen 25 % de descuento; la primera hora es gratis".
1. **Rojo:** prueba «una estadía de 30 minutos cuesta 0». Falla porque la función no existe.
2. **Verde:** se escribe «tarifa(minutos) { return 0; }». Pasa.
3. **Rojo:** «una estadía de 2 horas cuesta 20». Falla.
4. **Verde:** «return minutos <= 60 ? 0 : 20 * Math.ceil(minutos / 1440)». Pasa.
5. **Rojo:** «25 horas cuestan 40» (dos días por fracción). Pasa sin cambios: la prueba confirma un caso límite.
6. **Rojo:** «2 horas con convenio cuestan 15». Falla; se agrega el parámetro de convenio.
7. **Refactorizar:** se extraen las constantes «TARIFA_DIARIA», «MINUTOS_GRATIS» y «DESCUENTO_CONVENIO» y se nombra la función según el lenguaje del dominio, «calcularTarifaEstadia».
El resultado son 6 pruebas que documentan exactamente la regla de negocio. Cuando contabilidad pregunte "¿qué pasa con una estadía de exactamente 60 minutos?", la respuesta está en una prueba.`);

D('m14.techniques', `## Ejemplo resuelto: particiones y valores límite de la tarifa
Para «calcularTarifaEstadia(minutos, convenio)» con la regla "primera hora gratis, 20 soles por día o fracción, 25 % de descuento con convenio":
- **Particiones de minutos:** inválidos (negativos), primera hora (0 a 60), primer día (61 a 1440), más de un día (1441 en adelante).
- **Valores límite:** −1, 0, 60, 61, 1440, 1441 y un valor grande como 43 200 (30 días).
- **Particiones de convenio:** con y sin convenio.
- **Combinación:** para dos parámetros con 4 y 2 particiones, probar todas las combinaciones da 8 casos; con muchos parámetros se recurre a las pruebas por pares.
| minutos | convenio | esperado |
| −1 | no | error |
| 0 | no | 0 |
| 60 | no | 0 |
| 61 | no | 20 |
| 1440 | sí | 15 |
| 1441 | no | 40 |
Con 7 casos bien elegidos se cubren las fronteras donde se concentran los errores de "menor que" contra "menor o igual que" y los redondeos por fracción, que son precisamente los defectos que contabilidad habría encontrado en la primera factura mal calculada. Si además se aplican pruebas de mutación a la función, cualquier mutante que cambie un «<=» por un «<» en la comparación con 60 será detectado por los casos 60 y 61; si sobrevive, falta un caso límite.`);

D('m14.metrics', `## Calidad percibida por el usuario
Las métricas internas no dicen todo. La calidad también se mide desde fuera: tasa de sesiones sin errores en la app (que herramientas de monitoreo de errores calculan automáticamente), cantidad de reclamos de soporte por cada mil operaciones, tiempo que tarda un usuario en completar las tareas principales y encuestas breves de satisfacción. Cuando las métricas internas mejoran y las externas no, probablemente se está mejorando lo que no importa al usuario.

## Ejemplo resuelto: el tablero de calidad de PatioApp
El equipo elige pocas métricas, cada una con una pregunta y una acción asociada:
| Métrica | Pregunta | Acción si empeora |
| Defectos escapados por versión (y su origen) | ¿Llegan errores a los patios? | análisis de causa raíz del origen principal |
| Frecuencia de despliegue y tiempo de entrega (DORA) | ¿Entregamos con fluidez? | buscar el paso que más espera |
| Tasa de fallos de cambios y tiempo de restauración (DORA) | ¿Nuestros cambios son seguros? | más pruebas en la zona afectada, despliegues graduales |
| Pruebas inestables por semana | ¿Confiamos en nuestras pruebas? | poner en cuarentena y corregir antes de agregar nuevas |
| Complejidad y cambios frecuentes por archivo (puntos calientes) | ¿Dónde está el riesgo del código? | refactorizar primero esos archivos |
Explícitamente **no** se mide: líneas de código por persona, número de pruebas escritas, ni un porcentaje de cobertura como meta. La cobertura se mira solo para encontrar zonas críticas sin pruebas, nunca como objetivo, para no caer en la ley de Goodhart. Cada métrica se revisa en la retrospectiva mensual y se elimina si nadie la usó para tomar una decisión en tres meses: una métrica que no cambia ninguna decisión solo consume atención.`);

S('m14', 'm14.integ', { title: 'Pruebas de integración, dobles de servicios y contratos',
  ask: '¿Qué concepto de pruebas de integración o de contrato se aplica?',
  lesson: `
> **La idea en simple.** Cada pieza de un reloj puede estar perfecta y el reloj no funcionar, porque los engranajes no encajan. Las pruebas unitarias verifican las piezas; las de integración verifican que encajen: que el código hable correctamente con la base de datos, con la pasarela de pago, con la cola de mensajes y con los otros servicios. Ahí es donde aparecen muchos de los errores reales.

## Qué se integra y qué puede fallar
Una prueba de integración verifica la interacción entre dos o más componentes reales. Los defectos típicos que encuentra son los que las pruebas unitarias no pueden ver:
- **Desajustes de formato:** fechas en zonas horarias distintas, decimales con coma o punto, nombres de campos que no coinciden («placa» contra «plate»).
- **Supuestos falsos sobre la otra parte:** creer que la API devuelve una lista vacía cuando en realidad devuelve un error 404.
- **Configuración:** credenciales, URL, tiempos de espera, tamaños de conexión.
- **Comportamiento de la base de datos real:** restricciones, transacciones, bloqueos, diferencias entre un motor de prueba en memoria y el de producción (mayúsculas, ordenamiento, tipos de datos).
- **Serialización:** objetos que no se convierten a JSON o a mensajes como se esperaba.

## Estrategias de integración
Los libros clásicos describen cómo ir juntando los módulos:
- **Big bang:** integrar todo de una vez y probar. Cuando algo falla, es muy difícil saber dónde.
- **Descendente** (*top-down*): empezar por los módulos superiores, reemplazando los inferiores por **stubs** que se van sustituyendo por los reales.
- **Ascendente** (*bottom-up*): empezar por los módulos inferiores, usando **drivers** que los invocan, e ir subiendo.
- **Sándwich:** combinar ambas.
- **Continua:** integrar cada cambio en la rama principal varias veces al día y ejecutar las pruebas automáticamente. Es la práctica moderna, y hace que las otras estrategias se apliquen en pequeño a cada cambio.

## Pruebas con dependencias reales
Durante años se probaron los repositorios contra bases de datos en memoria (como H2 o SQLite) para que las pruebas fueran rápidas. El problema: se comportan distinto que la base de producción, y los errores aparecían recién en producción. Hoy es común usar **contenedores de prueba**: la biblioteca **Testcontainers** (creada por Richard North en 2015, con versiones para Java, JavaScript, Go, Python y otros) levanta en segundos un contenedor con la base de datos, la cola o el servicio real, ejecuta la prueba y lo destruye.
~~~js
// Esquema de una prueba de integración de un repositorio contra una base real (con Testcontainers)
// antes de todas:  contenedor = await new PostgreSqlContainer('postgres:16').start();
//                  repo = new RepositorioEstadias(contenedor.getConnectionUri());
//                  await aplicarMigraciones(repo);
// prueba:
async function guardaYRecuperaUnaEstadia(repo) {
  const e = { id: 'E-1', placa: 'ABC-123', ingreso: new Date('2026-11-13T08:00:00-05:00') };
  await repo.guardar(e);
  const leida = await repo.buscarPorPlaca('ABC-123');
  if (leida.id !== 'E-1') throw new Error('no se recuperó la estadía');
  if (leida.ingreso.getTime() !== e.ingreso.getTime()) throw new Error('la zona horaria cambió la hora');   // error clásico
}
// después de todas: await contenedor.stop();
~~~
Las buenas prácticas: cada prueba prepara sus propios datos y no depende del orden; se limpia el estado entre pruebas (o cada prueba trabaja dentro de una transacción que se revierte); y las migraciones del esquema se aplican igual que en producción, lo que de paso prueba las migraciones.

## Simular servicios externos
No siempre se puede usar el servicio real: la pasarela de pago cobra de verdad, el servicio de la SUNAT tiene límites, WhatsApp no tiene un entorno de prueba completo. Opciones:
- **Entornos sandbox del proveedor:** muchas pasarelas ofrecen tarjetas de prueba y un entorno sin dinero real. Son la mejor opción cuando existen.
- **Servidores simulados** (*mock servers*) como WireMock o MockServer: un servidor HTTP local que responde lo que se le programe, incluidos errores, demoras y respuestas malformadas. Permiten probar casos difíciles de provocar con el servicio real (que la pasarela tarde 30 segundos o devuelva un error 500).
- **Grabar y reproducir:** se graban respuestas reales una vez y se reproducen en las pruebas.
- **Virtualización de servicios:** simulaciones más completas con estado, usadas en empresas grandes.
El riesgo de toda simulación es que **se desactualice**: el simulador responde como respondía el servicio hace seis meses, las pruebas pasan, y producción falla. Para eso existen las pruebas de contrato.

## Pruebas de contrato
Cuando dos servicios se comunican, el **contrato** es lo que uno espera del otro: qué peticiones acepta, qué respuestas devuelve, qué campos tienen los eventos. Las **pruebas de contrato dirigidas por el consumidor** (*consumer-driven contract testing*), descritas por Ian Robinson en 2006 y popularizadas por la herramienta **Pact** (creada en 2013 en REA Group, Australia), funcionan así:
1. El **consumidor** (la app móvil) escribe pruebas contra un simulador del proveedor, declarando qué peticiones hará y qué respuestas necesita. De esas pruebas se genera un archivo de contrato.
2. El contrato se publica en un **intermediario** (*broker*).
3. El **proveedor** (la API) ejecuta en su propia integración continua una verificación que reproduce las peticiones del contrato contra su código real y comprueba que las respuestas cumplen lo esperado.
4. Antes de desplegar cualquiera de los dos, se consulta si la versión es compatible con las versiones desplegadas de la otra parte ("¿puedo desplegar?").
La ventaja es que el proveedor sabe exactamente qué partes de su API usa cada consumidor, y un cambio que rompa a alguien falla en **su** integración continua, antes de llegar a producción, sin necesidad de un entorno donde estén todos los servicios levantados. La alternativa es el contrato dirigido por el **proveedor**, con una especificación OpenAPI o AsyncAPI contra la que se validan ambos lados.

## Entornos de prueba compartidos
Muchas organizaciones mantienen un entorno de "integración" o "preproducción" con todos los servicios desplegados para probar juntos. Es útil, pero tiene costos conocidos: cuando un equipo despliega una versión rota, bloquea las pruebas de todos; los datos se ensucian con el uso; y nadie sabe bien qué versión de cada servicio hay. Por eso la tendencia es combinar pruebas de contrato (que no necesitan el entorno), **entornos efímeros** que se crean para cada *pull request* con solo los servicios necesarios y se destruyen al terminar, y pruebas en producción controladas, como verás en DevOps.

## Integración de eventos y mensajes
Para mensajería, las pruebas de integración verifican que:
- El productor publica el evento con el esquema esperado cuando ocurre la acción (y solo una vez, incluso si la transacción se reintenta).
- El consumidor procesa correctamente el evento, es idempotente ante duplicados y envía a la cola de mensajes muertos los que no puede procesar.
- La evolución de los esquemas es compatible (un consumidor viejo acepta un evento nuevo con un campo extra).
Como la comunicación es asíncrona, las pruebas deben **esperar** con un límite de tiempo y una condición ("hasta que el espacio aparezca libre, como máximo 5 segundos"), nunca con pausas fijas, que causan pruebas lentas o inestables.

Una regla práctica para decidir qué integraciones probar: toda frontera donde el sistema habla con algo que no controla (base de datos, servicio externo, cola, sistema de archivos) merece al menos una prueba con la dependencia real o con una simulación verificada contra ella.

## Ejemplo resuelto: integración de la pasarela de pago en PatioApp
1. **Adaptador** «PasarelaDePago» con una interfaz propia (puerto) y una implementación para el proveedor real.
2. **Pruebas unitarias** de la lógica de cobro con un doble de la interfaz.
3. **Pruebas de integración del adaptador** contra WireMock, programado con respuestas copiadas de la documentación del proveedor: pago aprobado, tarjeta rechazada, fondos insuficientes, error 500, respuesta tras 30 segundos (para verificar el tiempo de espera de 10 segundos) y respuesta con un campo faltante.
4. **Prueba contra el sandbox** del proveedor una vez al día, para detectar cambios en su API que el simulador no refleja.
5. **Contrato con Pact** entre la app móvil y la API de PatioApp para el flujo de salida; un cambio que renombró «montoTotal» a «total» en la API falló en la integración continua de la API antes de romper las tablets de los operadores.`,
  links: [['m14.unit', 'los dobles de prueba aíslan las pruebas unitarias'], ['m13.micro', 'los contratos permiten desplegar servicios de forma independiente'], ['m15.containers', 'los contenedores permiten levantar dependencias reales en las pruebas']],
  read: 'Fowler, *IntegrationTest* y *ContractTest* (martinfowler.com); Robinson, *Consumer-Driven Contracts* (2006); documentación de Pact y Testcontainers; Khorikov, *Unit Testing Principles, Practices, and Patterns* (2020), capítulos 8 a 10.',
  terms: [
    ['Prueba de integración', 'prueba que verifica la interacción entre dos o más componentes reales', ['Repositorio contra la base de datos.', 'Adaptador contra la pasarela.', 'Encuentra desajustes de formato.']],
    ['Integración big bang', 'estrategia que integra todos los módulos a la vez', ['Difícil localizar fallas.', 'Se opone a la integración continua.', 'Común en proyectos antiguos.']],
    ['Stub', 'componente sustituto que devuelve respuestas fijas en lugar de un módulo real', ['Usado en integración descendente.', 'Reemplaza a los módulos inferiores.', 'Más simple que un mock.']],
    ['Driver', 'componente que invoca a un módulo inferior para probarlo cuando aún no existe el superior', ['Usado en integración ascendente.', 'Simula a quien llama.', 'Se reemplaza por el real después.']],
    ['Contenedor de prueba', 'instancia real de una dependencia levantada en un contenedor solo para las pruebas', ['Testcontainers.', 'Base de datos idéntica a producción.', 'Se destruye al terminar.']],
    ['Servidor simulado', 'servidor local programado para responder como un servicio externo, incluidos errores y demoras', ['WireMock.', 'Simula la pasarela de pago.', 'Puede desactualizarse.']],
    ['Prueba de contrato', 'prueba que verifica que proveedor y consumidor cumplen lo que esperan uno del otro', ['Pact.', 'Dirigida por el consumidor.', 'No necesita todos los servicios levantados.']],
    ['Intermediario de contratos', 'servicio donde se publican los contratos y se consulta la compatibilidad entre versiones', ['Pact Broker.', 'Responde ¿puedo desplegar?', 'Guarda verificaciones.']]
  ],
  q: [
    ['¿Qué defecto encuentra una prueba de integración que una unitaria no puede encontrar?', 'Que la base de datos real guarda la fecha en otra zona horaria', ['Un error de lógica en un if', 'Un nombre de variable confuso', 'Una función demasiado larga'], 'Los desajustes aparecen al integrar componentes reales.', 2],
    ['¿Por qué probar contra una base en memoria distinta a la de producción es riesgoso?', 'Porque se comporta distinto y los errores aparecen recién en producción', ['Porque es más lenta', 'Porque no se puede automatizar', 'No es riesgoso'], 'Por eso se usan contenedores de prueba.', 3],
    ['En la integración descendente, ¿qué reemplaza a los módulos inferiores aún no listos?', 'Stubs', ['Drivers', 'Oráculos', 'Mocks de interfaz gráfica'], 'Los drivers se usan en la ascendente.', 2],
    ['¿Cuál es el principal riesgo de un servidor simulado?', 'Que se desactualice respecto del servicio real', ['Que sea demasiado rápido', 'Que cobre dinero', 'Que no responda errores'], 'Las pruebas de contrato lo mitigan.', 3],
    ['En las pruebas de contrato dirigidas por el consumidor, ¿quién define el contrato?', 'El consumidor, a partir de lo que realmente necesita', ['El proveedor siempre', 'Un comité', 'El usuario final'], 'Luego el proveedor lo verifica.', 3],
    ['¿Cómo debe esperar una prueba de un flujo asíncrono?', 'Con una condición y un límite de tiempo, no con una pausa fija', ['Con una pausa fija larga', 'Sin esperar', 'Reiniciando el servidor'], 'Las pausas fijas causan lentitud o inestabilidad.', 3],
    ['Un cambio en la API renombra un campo que usa la app móvil. ¿Dónde lo detecta una prueba de contrato?', 'En la integración continua del proveedor, antes de desplegar', ['En producción', 'Nunca', 'Solo en la app'], 'El proveedor verifica los contratos de sus consumidores.', 4],
    { tf: 'La integración continua aplica en pequeño la integración a cada cambio, varias veces al día.', v: true, e: 'Así los problemas aparecen en horas.', l: 2 },
    { tf: 'Si las pruebas unitarias pasan, la integración está garantizada.', v: false, e: 'Las piezas pueden estar bien y no encajar.', l: 1 },
    { c: 'Escribe «cumpleContrato(respuesta, campos)»: devuelve los campos requeridos que faltan en la respuesta (objeto), en el orden de la lista.', f: 'cumpleContrato', p: ['respuesta', 'campos'], t: [[[{ total: 20, placa: 'A' }, ['placa', 'montoTotal']], ['montoTotal']], [[{ a: 1 }, ['a']], []]], sol: '  return campos.filter(c => !(c in respuesta));', l: 2 },
    { c: 'Escribe «esperarHasta(estados, objetivo, maxIntentos)»: estados es la lista de valores observados en cada intento; devuelve el número de intento (desde 1) en que el valor es igual al objetivo, sin pasar de maxIntentos, o -1 si no se alcanzó.', f: 'esperarHasta', p: ['estados', 'objetivo', 'maxIntentos'], t: [[[['ocupado', 'ocupado', 'libre'], 'libre', 5], 3], [[['ocupado', 'ocupado', 'libre'], 'libre', 2], -1], [[[], 'libre', 3], -1]], sol: '  for (let i = 0; i < Math.min(estados.length, maxIntentos); i++) if (estados[i] === objetivo) return i + 1;\n  return -1;', l: 3 },
    { c: 'Escribe «normalizarFecha(texto)»: recibe una fecha ISO con zona (por ejemplo "2026-11-13T08:00:00-05:00") y devuelve la hora en UTC como texto ISO (toISOString).', f: 'normalizarFecha', p: ['texto'], t: [[['2026-11-13T08:00:00-05:00'], '2026-11-13T13:00:00.000Z'], [['2026-01-01T00:00:00Z'], '2026-01-01T00:00:00.000Z']], sol: '  return new Date(texto).toISOString();', l: 2 }
  ],
  gen: function (g) {
    var es = [['Se integran todos los módulos a la vez al final', 'Big bang'], ['Se empieza por los módulos superiores con stubs', 'Descendente'], ['Se empieza por los módulos inferiores con drivers', 'Ascendente'], ['Se combinan los enfoques descendente y ascendente', 'Sándwich'], ['Cada cambio se integra a la rama principal varias veces al día con pruebas automáticas', 'Continua']];
    es.forEach(function (e) { g.mcq(2, '¿Qué estrategia de integración es? ' + e[0], e[1], ['Big bang', 'Descendente', 'Ascendente', 'Sándwich', 'Continua'].filter(function (x) { return x !== e[1]; }).slice(0, 3), 'Estrategias de integración.'); });
    var dob = [['Probar el repositorio contra PostgreSQL real levantado para la prueba', 'Contenedor de prueba'], ['Probar qué pasa si la pasarela tarda 30 segundos', 'Servidor simulado'], ['Verificar que la API cumple lo que espera la app móvil', 'Prueba de contrato'], ['Probar con tarjetas de prueba en el entorno del proveedor', 'Sandbox del proveedor'], ['Reproducir respuestas reales capturadas una vez', 'Grabar y reproducir']];
    dob.forEach(function (d) { g.mcq(3, '¿Qué técnica conviene? ' + d[0], d[1], ['Contenedor de prueba', 'Servidor simulado', 'Prueba de contrato', 'Sandbox del proveedor', 'Grabar y reproducir'].filter(function (x) { return x !== d[1]; }).slice(0, 3), 'Cada técnica resuelve un problema distinto.'); });
    var nv = [['El cálculo de la tarifa con datos en memoria', 'Unitaria'], ['El repositorio guardando en la base de datos', 'Integración'], ['Que el evento SalidaRegistrada tenga el esquema que espera Notificaciones', 'Contrato'], ['El flujo completo de ingreso a salida en la app', 'Extremo a extremo']];
    nv.forEach(function (n) { g.mcq(1, '¿Qué tipo de prueba es? ' + n[0], n[1], ['Unitaria', 'Integración', 'Contrato', 'Extremo a extremo'].filter(function (x) { return x !== n[1]; }), 'Niveles de prueba.'); });
  },
  checks: [
    ['¿Qué tipos de defectos encuentran las pruebas de integración?', 'Desajustes de formato, supuestos falsos sobre la otra parte, configuración, comportamiento real de la base de datos y serialización.'],
    ['Compara integración big bang, descendente, ascendente y continua.', 'Big bang junta todo al final; descendente usa stubs desde arriba; ascendente usa drivers desde abajo; continua integra cada cambio con pruebas automáticas.'],
    ['¿Cómo funcionan las pruebas de contrato dirigidas por el consumidor?', 'El consumidor genera el contrato desde sus pruebas, se publica en un intermediario y el proveedor lo verifica en su integración continua; se consulta la compatibilidad antes de desplegar.'],
    ['¿Por qué se prefieren hoy los contenedores de prueba a las bases en memoria?', 'Porque usan el mismo motor que producción y evitan errores que solo aparecerían allí.']
  ],
  cites: ['Robinson, I. (2006). Consumer-Driven Contracts: A Service Evolution Pattern. martinfowler.com.', 'Fowler, M. (2018). IntegrationTest. martinfowler.com.', 'Khorikov, V. (2020). *Unit Testing Principles, Practices, and Patterns*. Manning.', 'Myers, G., Sandler, C. y Badgett, T. (2011). *The Art of Software Testing* (3.ª ed.). Wiley.', 'Pact Foundation. *Pact documentation*. docs.pact.io.'],
  project: { t: 'Suite de integración y contratos',
    goal: 'Probar las integraciones reales de un sistema pequeño.',
    steps: ['Escribe pruebas de integración de un repositorio contra la base real con contenedores de prueba.', 'Prueba un cliente HTTP contra un servidor simulado con al menos cinco respuestas (éxito, error, demora, campo faltante, formato inválido).', 'Escribe un contrato dirigido por el consumidor entre dos componentes y verifícalo del lado del proveedor.', 'Rompe el contrato a propósito en el proveedor y muestra que la verificación falla.', 'Integra todo en la integración continua y mide cuánto tarda.'],
    deliver: 'El código de las pruebas, la configuración de la integración continua y el registro de la ruptura detectada.' },
  hito: ['Agrega a PatioApp pruebas de integración de los repositorios con contenedores de prueba y del adaptador de pago contra un servidor simulado.', 'Establece un contrato de PatioApp entre la app móvil y la API para el flujo de salida y verifícalo en la integración continua de la API.']
});
SDC.after('m14.integ', 'm14.unit');

S('m14', 'm14.e2e', { title: 'Pruebas de sistema, aceptación y exploratorias',
  ask: '¿Qué concepto de pruebas de sistema, aceptación o exploratorias se aplica?',
  lesson: `
> **La idea en simple.** Un auto puede pasar todas las pruebas de fábrica de cada pieza y del motor montado, y aun así el cliente puede descubrir en la primera semana que el portavasos no sostiene un vaso de verdad. Las pruebas de sistema miran el producto completo, las de aceptación preguntan si sirve a quien lo va a usar, y las exploratorias buscan lo que nadie pensó en escribir como caso de prueba.

## Pruebas de sistema
Las **pruebas de sistema** verifican el sistema **completo e integrado** contra sus requisitos, en un entorno lo más parecido posible a producción. Incluyen tanto pruebas funcionales (los flujos de negocio completos) como no funcionales (rendimiento, seguridad, usabilidad, recuperación, instalación). Las realiza normalmente un equipo de pruebas o el propio equipo de desarrollo, y su base son los requisitos y casos de uso, no el código.

Cuando se automatizan recorriendo la interfaz de usuario de punta a punta se llaman **pruebas extremo a extremo** (E2E). Herramientas habituales: **Selenium** (2004, el pionero, hoy estándar W3C como WebDriver), **Cypress** (2017), **Playwright** (Microsoft, 2020) para la web, y **Appium** o **Espresso** y **XCUITest** para móviles.

## El costo de las pruebas extremo a extremo
Las pruebas E2E dan mucha confianza porque prueban lo que el usuario realmente hace, pero son:
- **Lentas:** cada una levanta la aplicación, navega y espera.
- **Frágiles:** un cambio de diseño en un botón rompe decenas de pruebas aunque la funcionalidad esté bien.
- **Inestables** (*flaky*): fallan a veces sin que nada haya cambiado, por demoras de red, animaciones o datos compartidos. Google reportó que alrededor del 16 % de sus pruebas mostraban algún grado de inestabilidad.
- **Difíciles de diagnosticar:** cuando fallan, el error puede estar en cualquier capa.
Por eso se mantienen **pocas**, cubriendo los recorridos críticos del negocio (en PatioApp: ingreso, salida con cobro y consulta de deuda), y se empujan las demás verificaciones a niveles inferiores de la pirámide.

## Escribir pruebas E2E mantenibles
- **Objetos de página** (*Page Object*, descritos por Martin Fowler y la comunidad de Selenium): cada pantalla se representa con una clase que expone acciones del dominio («registrarSalida(placa)») y oculta los selectores. Si cambia la pantalla, se corrige un solo lugar.
- **Selectores estables:** usar atributos pensados para pruebas («data-testid») o roles y etiquetas accesibles («el botón con nombre Confirmar salida»), no rutas de CSS que cambian con el diseño. Usar roles accesibles tiene un efecto secundario valioso: obliga a que la interfaz sea accesible.
- **Esperas por condición**, nunca pausas fijas: las herramientas modernas como Playwright esperan automáticamente a que un elemento esté visible y habilitado.
- **Datos independientes:** cada prueba crea sus propios datos (por API, no por la interfaz, para ganar velocidad) y no depende de otras.
- **Evidencia al fallar:** capturas de pantalla, videos y trazas de red para diagnosticar sin reproducir.
~~~js
// Objeto de página para la pantalla de salida (estilo Playwright)
class PantallaSalida {
  constructor(page) { this.page = page; }
  async registrarSalida(placa) {
    await this.page.getByLabel('Placa').fill(placa);
    await this.page.getByRole('button', { name: 'Buscar' }).click();
    await this.page.getByRole('button', { name: 'Confirmar salida' }).click();
  }
  async mensaje() { return this.page.getByRole('status').textContent(); }
}
// prueba: await new PantallaSalida(page).registrarSalida('ABC-123');
//         expect(await pantalla.mensaje()).toContain('Salida registrada');
~~~

## Pruebas de aceptación
Las **pruebas de aceptación** responden si el sistema es **aceptable** para quien lo va a usar o pagar. Tipos:
- **Aceptación del usuario** (UAT): usuarios reales verifican que el sistema les sirve para su trabajo.
- **Aceptación operacional:** el equipo de operaciones verifica respaldos, recuperación, monitoreo y procedimientos.
- **Aceptación contractual y regulatoria:** se verifica el cumplimiento del contrato o de las normas (por ejemplo, que los comprobantes cumplan el formato de la SUNAT).
- **Alfa:** usuarios internos o seleccionados prueban en el entorno del desarrollador.
- **Beta:** usuarios reales prueban en su propio entorno antes del lanzamiento general.

## BDD y especificación con ejemplos
Dan North propuso en 2006 el **desarrollo guiado por el comportamiento** (BDD) para que las pruebas de aceptación se escriban **junto con el negocio** y en su lenguaje, con el formato **Dado / Cuando / Entonces** (Gherkin) que ya viste en requisitos. Gojko Adzic lo llamó **especificación con ejemplos** (2011): los ejemplos concretos acordados entre negocio, desarrollo y pruebas son a la vez la especificación, las pruebas automatizadas y la documentación viva. Una práctica asociada es la reunión de los **tres amigos**: una persona de negocio, una de desarrollo y una de pruebas revisan cada historia antes de construirla y acuerdan sus ejemplos. Herramientas como **Cucumber** (2008) conectan cada paso del escenario con código que lo ejecuta.

Un error frecuente es escribir escenarios **imperativos** atados a la interfaz ("cuando hago clic en el campo placa, escribo ABC-123 y hago clic en Buscar") en lugar de **declarativos** sobre el comportamiento ("cuando el operador registra la salida de ABC-123"). Los declarativos son legibles para el negocio y no se rompen con cada cambio de diseño.

## Pruebas exploratorias
Cem Kaner acuñó en 1984 el término **pruebas exploratorias**, que James Bach y Michael Bolton desarrollaron después: aprender sobre el sistema, diseñar pruebas y ejecutarlas **al mismo tiempo**, guiados por lo que se va descubriendo. No son pruebas al azar: se organizan en **sesiones** con tiempo limitado (por ejemplo, 60 a 90 minutos) y un **objetivo** escrito (*charter*), como "explorar el registro de salida con conexión intermitente para descubrir pérdidas de datos". Al final se reporta qué se probó, qué se encontró y qué quedó pendiente (la gestión de pruebas basada en sesiones de Jonathan y James Bach, 2000).

Las pruebas exploratorias encuentran lo que las automatizadas no pueden, porque las automatizadas solo verifican lo que alguien pensó de antemano. Elisabeth Hendrickson, en *Explore It!* (2013), propone **heurísticas** para buscar problemas: probar los límites, interrumpir operaciones a la mitad, repetir acciones rápidamente, usar datos con caracteres especiales (tildes, eñes, emojis, textos muy largos), cambiar la configuración regional, quitar la conexión, usar dos dispositivos a la vez con la misma cuenta. Una distinción útil de Bolton y Bach: la automatización hace **verificaciones** (comprobar algo conocido); las **pruebas** en sentido pleno incluyen el juicio humano para descubrir lo desconocido.

## Otras pruebas a nivel de sistema
- **Pruebas de humo** (*smoke tests*): unas pocas verificaciones rápidas tras un despliegue para confirmar que lo básico funciona. El nombre viene de la electrónica: al encender un circuito nuevo, si no sale humo, se sigue probando.
- **Pruebas de regresión:** volver a ejecutar las pruebas existentes para confirmar que un cambio no rompió lo que funcionaba.
- **Pruebas de recuperación:** provocar fallas (apagar la base de datos, cortar la red) y verificar que el sistema se recupera como se espera.
- **Pruebas de instalación y migración:** verificar que el sistema se instala, se actualiza y migra sus datos correctamente.
- **Pruebas visuales:** comparar capturas de pantalla con una referencia aprobada para detectar cambios visuales no deseados.

## Ejemplo resuelto: aceptación de PatioApp en el patio piloto
1. **Tres amigos** por cada historia, con la supervisora del patio como persona de negocio.
2. **18 escenarios Gherkin declarativos** para ingreso, salida, deuda y modo sin conexión, automatizados con Cucumber contra la API (rápidos) y 4 recorridos E2E con Playwright y objetos de página (los críticos).
3. **Sesión exploratoria** con el objetivo "explorar la salida con conexión intermitente y dos operadores sobre la misma unidad": se descubre que si dos operadores escanean la misma placa a la vez desde tablets distintas sin conexión, se registran dos salidas. Nadie lo había escrito como caso; se convierte en un escenario y en una regla de resolución de conflictos.
4. **Aceptación del usuario:** cinco operadores usan el sistema en paralelo con el cuaderno durante una semana; se comparan los registros.
5. **Aceptación regulatoria:** se validan 50 comprobantes en el entorno de pruebas del proveedor de facturación electrónica.
6. **Prueba de humo** automática de 3 minutos tras cada despliegue: iniciar sesión, buscar una unidad de prueba y consultar su deuda.`,
  links: [['m11.stories', 'los criterios de aceptación en Gherkin se escriben con las historias'], ['m14.types', 'la pirámide indica cuántas pruebas de cada nivel conviene tener'], ['hci.usab', 'las pruebas de usabilidad evalúan el sistema con usuarios reales']],
  read: 'Adzic, *Specification by Example* (2011); Hendrickson, *Explore It!* (2013); Crispin y Gregory, *Agile Testing* (2009); documentación de Playwright.',
  terms: [
    ['Prueba de sistema', 'prueba del sistema completo e integrado contra sus requisitos en un entorno parecido a producción', ['Flujos de negocio completos.', 'Incluye pruebas no funcionales.', 'Se basa en requisitos, no en código.']],
    ['Prueba extremo a extremo', 'prueba automatizada que recorre la aplicación como un usuario, de punta a punta', ['Playwright, Cypress, Selenium.', 'Lenta y frágil.', 'Se reserva para recorridos críticos.']],
    ['Objeto de página', 'clase que representa una pantalla con acciones del dominio y oculta los selectores', ['registrarSalida(placa).', 'Un cambio de pantalla se corrige en un lugar.', 'Patrón de Selenium.']],
    ['Prueba de aceptación', 'prueba que determina si el sistema es aceptable para sus usuarios, operadores o clientes', ['UAT.', 'Alfa y beta.', 'Contractual y regulatoria.']],
    ['Tres amigos', 'reunión de negocio, desarrollo y pruebas para acordar los ejemplos de una historia', ['Antes de construir.', 'Práctica de BDD.', 'Evita malentendidos.']],
    ['Prueba exploratoria', 'aprendizaje, diseño y ejecución simultáneos de pruebas guiados por lo descubierto', ['Kaner, 1984.', 'Sesiones con objetivo.', 'Encuentra lo que nadie escribió.']],
    ['Prueba de humo', 'conjunto pequeño de verificaciones rápidas para confirmar que lo básico funciona', ['Tras cada despliegue.', 'Unos pocos minutos.', 'Si falla, no se sigue.']],
    ['Prueba de regresión', 'reejecución de pruebas existentes para confirmar que un cambio no rompió lo que funcionaba', ['Automatizada en la integración continua.', 'Crece con el sistema.', 'Protege lo construido.']]
  ],
  q: [
    ['¿Por qué se mantienen pocas pruebas extremo a extremo?', 'Porque son lentas, frágiles, inestables y difíciles de diagnosticar', ['Porque no encuentran errores', 'Porque son ilegales', 'Porque no se pueden automatizar'], 'Se cubren los recorridos críticos.', 2],
    ['¿Qué ventaja tienen los objetos de página?', 'Si cambia una pantalla, se corrige en un solo lugar', ['Hacen las pruebas más lentas', 'Eliminan la necesidad de selectores', 'Prueban la base de datos'], 'Ocultan los selectores detrás de acciones del dominio.', 2],
    ['¿Cuál es un escenario Gherkin declarativo?', 'Cuando el operador registra la salida de ABC-123', ['Cuando hago clic en el campo placa y escribo ABC-123', 'Cuando presiono el botón azul', 'Cuando espero 3 segundos'], 'Describe el comportamiento, no la interfaz.', 3],
    ['¿Qué diferencia una prueba alfa de una beta?', 'La alfa se hace con usuarios internos en el entorno del desarrollador; la beta, con usuarios reales en su entorno', ['La beta es más corta', 'No hay diferencia', 'La alfa es automática'], 'Tipos de pruebas de aceptación.', 2],
    ['¿Qué es un charter en pruebas exploratorias?', 'El objetivo escrito de una sesión con tiempo limitado', ['Un contrato legal', 'Un tipo de prueba unitaria', 'Un reporte de defectos'], 'Gestión basada en sesiones.', 3],
    ['Según Bolton y Bach, ¿qué diferencia hay entre verificar y probar?', 'Verificar comprueba algo conocido de antemano; probar incluye el juicio humano para descubrir lo desconocido', ['Son sinónimos', 'Probar es solo automático', 'Verificar es más caro'], 'La automatización hace verificaciones.', 4],
    ['¿Por qué conviene usar roles y etiquetas accesibles como selectores?', 'Son más estables que las rutas CSS y obligan a que la interfaz sea accesible', ['Porque son más cortos', 'Porque lo exige el navegador', 'No conviene'], 'Efecto secundario valioso.', 3],
    { tf: 'Las pruebas exploratorias son pruebas al azar sin organización.', v: false, e: 'Se organizan en sesiones con objetivo, tiempo y reporte.', l: 2 },
    { tf: 'Una prueba de humo verifica rápidamente que lo básico funciona tras un despliegue.', v: true, e: 'Si falla, no tiene sentido seguir probando.', l: 1 },
    { c: 'Escribe «esDeclarativo(paso)»: devuelve false si el paso menciona "clic", "escribo", "presiono" o "botón" (sin distinguir mayúsculas) y true en otro caso.', f: 'esDeclarativo', p: ['paso'], t: [[['Cuando hago clic en Buscar'], false], [['Cuando el operador registra la salida'], true], [['Y presiono Enter'], false]], sol: '  return !/clic|escribo|presiono|botón/i.test(paso);', l: 2 },
    { c: 'Escribe «inestables(historial)»: historial es un objeto {prueba: [resultados true/false]}; devuelve las pruebas que tienen al menos un éxito y al menos un fallo.', f: 'inestables', p: ['historial'], t: [[[{ a: [true, true], b: [true, false, true], c: [false, false] }], ['b']], [[{}], []]], sol: '  return Object.keys(historial).filter(k => historial[k].includes(true) && historial[k].includes(false));', l: 2 }
  ],
  gen: function (g) {
    var tp = [['Usuarios reales verifican que el sistema les sirve para su trabajo', 'Aceptación del usuario'], ['Operaciones verifica respaldos, recuperación y monitoreo', 'Aceptación operacional'], ['Se verifica que los comprobantes cumplan el formato de la SUNAT', 'Aceptación regulatoria'], ['Usuarios reales prueban en su propio entorno antes del lanzamiento', 'Beta'], ['Usuarios internos prueban en el entorno del desarrollador', 'Alfa']];
    tp.forEach(function (t) { g.mcq(2, '¿Qué tipo de prueba de aceptación es? ' + t[0], t[1], ['Aceptación del usuario', 'Aceptación operacional', 'Aceptación regulatoria', 'Beta', 'Alfa'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Tipos de aceptación.'); });
    var ot = [['Tras desplegar, iniciar sesión y consultar una unidad de prueba', 'Humo'], ['Volver a ejecutar todas las pruebas después de un cambio', 'Regresión'], ['Apagar la base de datos y verificar que el sistema se recupera', 'Recuperación'], ['Comparar capturas de pantalla con una referencia aprobada', 'Visual'], ['Explorar la salida sin conexión durante 60 minutos con un objetivo', 'Exploratoria']];
    ot.forEach(function (o) { g.mcq(2, '¿Qué tipo de prueba es? ' + o[0], o[1], ['Humo', 'Regresión', 'Recuperación', 'Visual', 'Exploratoria'].filter(function (x) { return x !== o[1]; }).slice(0, 3), 'Pruebas a nivel de sistema.'); });
    var heu = [['Escribir una placa con eñes, tildes y 200 caracteres', 'Datos especiales'], ['Cortar la red a mitad del registro', 'Interrumpir'], ['Usar la misma cuenta en dos tablets a la vez', 'Concurrencia'], ['Probar con 0, 60 y 61 minutos', 'Límites']];
    heu.forEach(function (h) { g.mcq(3, '¿Qué heurística exploratoria aplica? ' + h[0], h[1], ['Datos especiales', 'Interrumpir', 'Concurrencia', 'Límites'].filter(function (x) { return x !== h[1]; }), 'Heurísticas de Hendrickson.'); });
  },
  checks: [
    ['Compara pruebas de sistema y pruebas de aceptación.', 'Las de sistema verifican el sistema completo contra los requisitos; las de aceptación determinan si es aceptable para usuarios, operadores o clientes.'],
    ['¿Cómo se hacen mantenibles las pruebas extremo a extremo?', 'Con objetos de página, selectores estables y accesibles, esperas por condición, datos independientes y evidencia al fallar.'],
    ['¿Qué aportan las pruebas exploratorias que la automatización no?', 'Encuentran lo que nadie pensó de antemano, gracias al juicio humano y al aprendizaje durante la prueba.'],
    ['Escribe un escenario Gherkin declarativo y explica por qué es mejor que uno imperativo.', 'Describe el comportamiento en el lenguaje del negocio; no se rompe con cambios de interfaz y lo entiende el negocio.']
  ],
  cites: ['North, D. (2006). Introducing BDD. *Better Software*, marzo de 2006.', 'Adzic, G. (2011). *Specification by Example*. Manning.', 'Hendrickson, E. (2013). *Explore It!* Pragmatic Bookshelf.', 'Bach, J. (2000). Session-Based Test Management. *Software Testing and Quality Engineering*, 2(6).', 'Kaner, C., Falk, J. y Nguyen, H. Q. (1999). *Testing Computer Software* (2.ª ed.). Wiley.', 'Crispin, L. y Gregory, J. (2009). *Agile Testing*. Addison-Wesley.'],
  project: { t: 'Aceptación, extremo a extremo y exploración',
    goal: 'Aplicar las pruebas de nivel de sistema a una aplicación web.',
    steps: ['Escribe con un "tres amigos" simulado cinco escenarios Gherkin declarativos para una aplicación.', 'Automatiza tres recorridos críticos con Playwright usando objetos de página y selectores accesibles.', 'Ejecuta dos sesiones exploratorias de 60 minutos con objetivos escritos y reporta los hallazgos.', 'Convierte cada hallazgo importante en un escenario o una prueba automatizada.', 'Crea una prueba de humo de menos de 3 minutos para después de cada despliegue.'],
    deliver: 'Los escenarios, el código de las pruebas, los reportes de sesión y la prueba de humo.' },
  hito: ['Automatiza en PatioApp los recorridos críticos de ingreso y salida con objetos de página y una prueba de humo posterior al despliegue.', 'Realiza una sesión exploratoria de PatioApp sobre conexión intermitente y uso simultáneo, y convierte los hallazgos en escenarios.']
});
SDC.after('m14.e2e', 'm14.integ');
})();
