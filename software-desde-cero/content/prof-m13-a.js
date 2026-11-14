(function () {
var S = SDC.S, D = SDC.D;
SDC.XM('m13', { prof: true });

D('m13.styles', `## Más estilos del catálogo
- **Tuberías y filtros:** los datos pasan por una cadena de transformaciones independientes, cada una con una entrada y una salida. Es el estilo de los comandos de Unix encadenados con «|», de los compiladores y de los procesos de datos (ETL). Es fácil agregar, quitar o reordenar filtros, pero no sirve para sistemas muy interactivos.
- **Microkernel o de complementos:** un núcleo mínimo y estable al que se agregan funcionalidades como complementos (*plug-ins*). Así funcionan los editores como Visual Studio Code, los navegadores con extensiones y muchos productos que cada cliente personaliza.
- **Espacio compartido o pizarra:** varios componentes leen y escriben en un repositorio común de datos; el control lo dirige el estado de los datos. Se usó en sistemas de reconocimiento de voz como Hearsay-II en los años setenta.
- **Cliente-servidor y par a par:** en el primero, los clientes piden y un servidor responde; en el segundo, todos los nodos cumplen ambos papeles, como en BitTorrent.
- **Orientado a servicios (SOA):** antecesor de los microservicios en los años 2000, con servicios grandes integrados mediante un bus empresarial (ESB) que concentraba la lógica de integración. Muchos de sus problemas (un bus central, frágil y lleno de lógica) motivaron la regla de los microservicios: "extremos inteligentes, tuberías tontas".

## Ejemplo resuelto: el estilo de PatioApp
PatioApp empieza como un **monolito modular** con arquitectura hexagonal: un solo despliegue, pero con módulos de dominio separados (patios, tarifas, facturación, notificaciones) que solo se comunican por interfaces explícitas, y con la lógica de negocio aislada de la base de datos y de la web mediante puertos y adaptadores. La aplicación móvil de los operadores sigue un estilo cliente-servidor con sincronización para funcionar sin conexión. Se descartan los microservicios por ahora: el equipo es de seis personas y el costo operativo de muchos servicios no se justifica. La decisión queda registrada en un ADR con la condición que la revisaría: "si el sistema pasa a tener más de tres equipos o si la facturación necesita escalar de forma independiente".`);

D('m13.quality', `## Tácticas con más detalle
Bass, Clements y Kazman llaman **tácticas** a las decisiones de diseño concretas que favorecen un atributo de calidad. Algunas de las más usadas:
- **Disponibilidad.** Detectar fallas: latidos (*heartbeat*), pings, monitores y sumas de verificación. Recuperarse: redundancia **activa** (varias réplicas procesan todo y cualquiera puede responder), **pasiva** (una réplica principal y otras en espera que reciben los cambios) o **en frío** (el respaldo se enciende solo al fallar el principal); reintentos, degradación funcional (seguir con menos funciones) y reversión de transacciones. Prevenir: sacar de servicio un componente antes de que falle, transacciones atómicas.
- **Rendimiento.** Controlar la demanda: limitar la tasa de peticiones, priorizar, reducir el trabajo por petición. Gestionar recursos: concurrencia, réplicas, cachés, colas, aumento de recursos.
- **Modificabilidad.** Aumentar la cohesión y reducir el acoplamiento: encapsular, usar intermediarios, restringir dependencias, diferir el enlace (configuración en tiempo de ejecución en lugar de valores fijos en el código).
- **Seguridad.** Detectar ataques, resistirlos (autenticar, autorizar, cifrar, limitar la exposición), reaccionar (revocar accesos, bloquear) y recuperarse (auditoría, restauración).
- **Capacidad de prueba.** Controlar y observar el estado (interfaces de prueba, registros), limitar la complejidad y separar las dependencias externas mediante interfaces.

Las tácticas se combinan en **patrones** más grandes: el patrón de réplica activa con votación (tres réplicas calculan y gana la mayoría) se usa en aviónica; el de líder y seguidores, en bases de datos; el de disyuntor con degradación funcional, en servicios web. Conocer las tácticas permite entender qué atributo favorece cada patrón y a costa de cuál.

## Ejemplo resuelto: de escenario a táctica en PatioApp
| Escenario de calidad | Tácticas elegidas |
| El operador registra ingresos aunque el patio pierda conexión 4 horas | base de datos local en el dispositivo, cola de sincronización, resolución de conflictos por reglas |
| Salida confirmada con p95 menor a 2 s en hora punta | índices por placa, caché de tarifas, cálculo de tarifa sin llamadas externas |
| Agregar un tipo de vehículo sin desplegar código | tarifas y tipos como datos configurables (enlace diferido) |
| Si cae la pasarela de pago, el patio sigue operando | disyuntor y degradación funcional: cobro en efectivo y comprobante pendiente |
Cada fila se convierte en un ADR y, cuando es posible, en una **función de aptitud** automatizada que verifica en la integración continua que la táctica sigue presente.`);

D('m13.scale', `## Ejemplo resuelto: PatioApp diez veces más grande
La empresa pasa de 6 a 60 patios. Cálculo en una servilleta y decisiones:
1. **Carga:** 60 patios × 300 movimientos al día = 18 000 movimientos diarios; en hora punta (el 30 % del día en 2 horas) son unos 0,75 movimientos por segundo. Las consultas de dueños, en cambio, son 10 veces más. Conclusión: el problema no son las escrituras, sino las **lecturas**.
2. **Lecturas:** réplicas de lectura de la base de datos para las consultas de dueños y reportes, y una caché del estado de cada unidad con invalidación al cambiar.
3. **Fotos:** 18 000 movimientos × 4 fotos × 500 KB = 36 GB por día; se mueven a almacenamiento de objetos con una red de distribución de contenido, fuera de la base de datos.
4. **Reportes:** los reportes pesados de gerencia se calculan de noche en una base analítica separada, para que no compitan con la operación.
5. **Aplicación:** servidores sin estado detrás de un balanceador, con escalado automático por uso de CPU.
Con esto, la base de datos principal sigue siendo una sola instancia (con su réplica en otra zona) y no hace falta particionarla todavía; el particionamiento por empresa queda como paso siguiente si se superan los 500 patios. Todas estas decisiones se validan antes con una prueba de carga que simula la hora punta de los 60 patios.`);

D('m13.dist', `## Este tema y el curso de Sistemas Distribuidos
Esta unidad presenta los problemas y patrones de los sistemas distribuidos desde el punto de vista del **arquitecto**: qué preguntas hacerse y qué patrones elegir. El curso de Sistemas Distribuidos del ciclo 8 los estudia desde los **fundamentos**: por qué los relojes no se pueden sincronizar exactamente, cómo funcionan paso a paso Paxos y Raft, por qué hacen falta 3f + 1 nodos para tolerar fallas bizantinas o cómo verificar un modelo de consistencia. Conviene volver a esta unidad después de ese curso: los mismos patrones se entienden de otra forma cuando se sabe qué garantiza cada uno y qué no.

## Preguntas que todo arquitecto debe hacerse
Antes de distribuir un sistema, conviene responder por escrito:
1. ¿Qué pasa si este servicio no responde? ¿Y si responde lento? ¿Y si responde dos veces?
2. ¿Qué datos deben ser consistentes de inmediato y cuáles pueden tardar?
3. ¿Qué operaciones deben ser idempotentes y cómo se identifican las repeticiones?
4. ¿Cómo sabremos, en producción, que algo anda mal y dónde?
5. ¿Realmente necesitamos distribuir? Un solo servidor bien dimensionado con una réplica resuelve más casos de los que se cree.`);

S('m13', 'm13.views', { title: 'Documentar la arquitectura: vistas, C4, arc42 y decisiones',
  ask: '¿Qué concepto de documentación de arquitectura se aplica?',
  lesson: `
> **La idea en simple.** Un edificio no se describe con un solo plano: hay planos de estructura, de instalaciones eléctricas, de agua y de fachada, cada uno para un público distinto. Con el software pasa lo mismo: el programador nuevo, el administrador de servidores, el auditor de seguridad y la gerente necesitan ver el sistema desde ángulos distintos. Documentar la arquitectura es elegir esas vistas y mantenerlas útiles.

## Por qué documentar
La arquitectura vive en la cabeza de unas pocas personas. Cuando se van, o cuando el equipo crece, ese conocimiento se pierde. La documentación sirve para:
- **Comunicar** el diseño a quienes llegan y a otros equipos.
- **Razonar** sobre el sistema: detectar riesgos, cuellos de botella y dependencias.
- **Recordar por qué** se tomaron las decisiones, para no repetir discusiones ni deshacer algo sin entender sus motivos.
- **Cumplir** con auditorías y contratos en dominios regulados.
El Manifiesto Ágil prefiere "software funcionando sobre documentación extensiva", lo que no significa "sin documentación": significa documentación **suficiente y útil**. Simon Brown lo resume así: un equipo ágil necesita algo de diseño inicial y algo de documentación, solo que no un documento de 200 páginas que nadie lee.

## Vistas y puntos de vista
La norma **ISO/IEC/IEEE 42010** (2011, revisada en 2022) fija el vocabulario: un sistema tiene **interesados** con **preocupaciones** (rendimiento, seguridad, costo, facilidad de despliegue); una **descripción de arquitectura** está formada por **vistas**, cada una de las cuales atiende ciertas preocupaciones; y un **punto de vista** es la convención (qué elementos, qué notación) para construir un tipo de vista.

## El modelo 4+1 de Kruchten
Philippe Kruchten, de Rational, publicó en 1995 *The 4+1 View Model of Architecture*, que se volvió un clásico:
| Vista | Muestra | Interesados principales |
| Lógica | la funcionalidad: clases, módulos, sus relaciones | analistas, desarrolladores |
| De procesos | concurrencia, distribución en el tiempo, comunicación entre procesos | integradores, responsables de rendimiento |
| De desarrollo | organización del código en módulos, paquetes y capas | programadores, gestores de configuración |
| Física | correspondencia del software con el hardware y la red | administradores, operaciones |
| +1 Escenarios | casos de uso que recorren todas las vistas | todos; sirven para validar y explicar |
El "+1" es la clave: los escenarios unen las vistas y muestran que la arquitectura sirve para lo que se necesita.

## Vistas y más allá
Paul Clements y sus colegas del SEI publicaron en 2002 (2.ª ed., 2010) *Documenting Software Architectures: Views and Beyond*, que organiza las vistas en tres tipos:
- **Vistas de módulos:** cómo se divide el código en unidades de implementación (descomposición, usos, capas, generalización, modelo de datos).
- **Vistas de componentes y conectores:** qué elementos existen en ejecución y cómo interactúan (servicios, colas, bases de datos, llamadas).
- **Vistas de asignación:** cómo se relaciona el software con su entorno (despliegue en servidores, asignación de módulos a equipos, instalación).
Su consejo práctico: elegir las vistas según los interesados y sus preocupaciones, documentar las **relaciones** entre vistas, y agregar la información "más allá de las vistas": el contexto, las decisiones y su justificación.

## El modelo C4
Simon Brown propuso el **modelo C4** (hacia 2011) como una forma sencilla de dibujar la arquitectura con cuatro niveles de zoom, como un mapa:
1. **Contexto:** el sistema como una caja, sus usuarios y los sistemas externos con los que se relaciona. Lo entiende cualquiera, incluida la gerencia.
2. **Contenedores:** las aplicaciones y almacenes de datos que forman el sistema (la app móvil, la API, la base de datos, la cola de mensajes). "Contenedor" aquí no significa Docker, sino algo que se ejecuta o guarda datos por separado.
3. **Componentes:** los grandes bloques dentro de un contenedor (el módulo de tarifas, el de facturación).
4. **Código:** clases y diagramas detallados, que casi siempre conviene generar desde el código o no dibujar.
Además se pueden agregar diagramas de **despliegue** y **dinámicos** (secuencias de interacción). Las reglas de Brown: cada diagrama tiene título, leyenda y elementos con nombre, tipo, tecnología y una frase de responsabilidad; cada flecha dice qué comunica y cómo. El éxito de C4 se debe a que es **independiente de la notación** y fácil de aprender en una tarde.
~~~txt
Contexto de PatioApp
 [Operador de patio] --registra ingresos y salidas--> [PatioApp]
 [Dueño de unidad] --consulta estado y deuda--> [PatioApp]
 [PatioApp] --cobra con--> [Pasarela de pago]
 [PatioApp] --emite comprobantes con--> [Proveedor de facturación electrónica] --> [SUNAT]
 [PatioApp] --envía notificaciones con--> [WhatsApp Business]
~~~

## arc42
**arc42**, creado por Gernot Starke y Peter Hruschka en 2005, es una **plantilla** gratuita y muy usada en Europa para organizar la documentación en 12 secciones: introducción y objetivos, restricciones, contexto y alcance, estrategia de solución, vista de bloques, vista de ejecución, vista de despliegue, conceptos transversales, decisiones de arquitectura, requisitos de calidad, riesgos y deuda técnica, y glosario. Se combina bien con C4 (los diagramas de C4 llenan las vistas de arc42) y con los ADR (que llenan la sección de decisiones). Su ventaja es que nadie tiene que inventar la estructura del documento.

## Registros de decisiones de arquitectura
Michael Nygard propuso en 2011 los **ADR** (*Architecture Decision Records*): un archivo corto por decisión, guardado junto al código, con un formato fijo:
- **Título** y número.
- **Estado:** propuesta, aceptada, reemplazada (por el ADR tal).
- **Contexto:** las fuerzas en juego (requisitos, restricciones, opciones).
- **Decisión:** lo que se decidió, en voz activa ("usaremos…").
- **Consecuencias:** lo bueno, lo malo y lo que se vuelve más fácil o difícil.
Los ADR no se editan después: si una decisión cambia, se escribe un ADR nuevo que **reemplaza** al anterior, de modo que queda la historia completa de por qué el sistema es como es. Variantes como **MADR** agregan las opciones consideradas y sus pros y contras.

## Qué documentar y qué no
Un error frecuente es documentar lo que el código ya muestra con claridad (la lista de clases, los parámetros de cada función) y omitir lo que el código **no puede** decir: por qué se eligió una tecnología, qué alternativas se descartaron, qué supuestos sostienen el diseño, cómo fluye una petición entre servicios y qué riesgos se aceptaron. Una regla útil es documentar lo que sería difícil de deducir leyendo el código durante una hora. Otra es escribir pensando en el lector concreto: la persona que llegará al equipo dentro de un año, sin nadie a quien preguntar.

## Documentación como código
La documentación que vive lejos del código envejece. La práctica de **documentación como código** propone:
- Escribirla en texto plano (Markdown, AsciiDoc) en el mismo repositorio.
- Dibujar diagramas con herramientas basadas en texto (Structurizr DSL para C4, PlantUML, Mermaid), que se versionan y revisan como el código.
- Revisar los cambios de documentación en los mismos *pull requests* que los cambios de código.
- Generar el sitio de documentación automáticamente en la integración continua.
- Verificar automáticamente lo que se pueda: que los diagramas compilan, que los enlaces funcionan, que las dependencias reales entre módulos coinciden con las documentadas (con herramientas como ArchUnit).

## Ejemplo resuelto: el paquete de arquitectura de PatioApp
1. **Plantilla arc42** en la carpeta «docs» del repositorio, con solo las secciones que el equipo usa de verdad.
2. **Diagramas C4** en Structurizr DSL: contexto (para gerencia y nuevos integrantes), contenedores (app móvil, API, base de datos, cola de sincronización, servicio de notificaciones) y componentes de la API.
3. **Diagrama dinámico** del registro de salida con cobro y comprobante, que funciona como el escenario "+1" que recorre las vistas.
4. **Doce ADR** hasta ahora, entre ellos: ADR-001 monolito modular, ADR-004 modo sin conexión con sincronización, ADR-007 proveedor de facturación electrónica, ADR-011 almacenamiento de fotos en objetos.
5. Una prueba con ArchUnit en la integración continua falla si el módulo de patios importa directamente algo del módulo de facturación sin pasar por su interfaz pública.`,
  links: [['m11.uml', 'UML y C4 son notaciones para las vistas'], ['m13.styles', 'los ADR documentan la elección del estilo'], ['eq.write', 'la documentación técnica es una forma de comunicación']],
  read: 'Clements y otros, *Documenting Software Architectures: Views and Beyond* (2.ª ed., 2010); Kruchten (1995); Brown, *Software Architecture for Developers*; arc42.org; Nygard (2011).',
  terms: [
    ['Vista de arquitectura', 'representación del sistema desde un ángulo que atiende ciertas preocupaciones de ciertos interesados', ['Vista física para operaciones.', 'Vista lógica para desarrolladores.', 'ISO/IEC/IEEE 42010.']],
    ['Modelo 4+1', 'conjunto de vistas lógica, de procesos, de desarrollo y física, unidas por escenarios', ['Kruchten, 1995.', 'El +1 son los escenarios.', 'Clásico de Rational.']],
    ['Modelo C4', 'forma de dibujar la arquitectura en cuatro niveles de zoom: contexto, contenedores, componentes y código', ['Simon Brown.', 'Independiente de la notación.', 'El contexto lo entiende la gerencia.']],
    ['Contenedor (C4)', 'aplicación o almacén de datos que se ejecuta o guarda información por separado', ['La app móvil.', 'La base de datos.', 'No significa contenedor de Docker.']],
    ['arc42', 'plantilla de documentación de arquitectura en 12 secciones', ['Starke y Hruschka, 2005.', 'Se combina con C4 y ADR.', 'Evita inventar la estructura.']],
    ['ADR', 'registro breve de una decisión de arquitectura con contexto, decisión y consecuencias', ['Nygard, 2011.', 'No se edita: se reemplaza.', 'Vive junto al código.']],
    ['Vista de componentes y conectores', 'vista de los elementos en ejecución y cómo interactúan', ['Servicios y colas.', 'Views and Beyond.', 'Se distingue de la de módulos.']],
    ['Documentación como código', 'práctica de escribir y versionar la documentación en el repositorio y revisarla como el código', ['Markdown y Structurizr DSL.', 'Se revisa en pull requests.', 'Se genera en la integración continua.']]
  ],
  q: [
    ['¿Qué une las cuatro vistas en el modelo 4+1?', 'Los escenarios o casos de uso', ['La base de datos', 'El código fuente', 'El diagrama de Gantt'], 'El +1.', 2],
    ['¿Qué nivel de C4 mostrarías a la gerencia para explicar con qué sistemas externos se conecta PatioApp?', 'Contexto', ['Contenedores', 'Componentes', 'Código'], 'El sistema como una caja con usuarios y sistemas externos.', 2],
    ['En C4, ¿qué es un contenedor?', 'Una aplicación o almacén de datos que se ejecuta o guarda información por separado', ['Un contenedor de Docker', 'Una clase', 'Un servidor físico'], 'Por ejemplo, la API o la base de datos.', 2],
    ['Una decisión registrada en un ADR cambia. ¿Qué se hace?', 'Se escribe un ADR nuevo que reemplaza al anterior, que queda marcado como reemplazado', ['Se edita el ADR original', 'Se borra el ADR original', 'No se documenta'], 'Así queda la historia completa.', 3],
    ['¿Qué vista mostraría en qué servidores y zonas se ejecuta cada parte?', 'La vista física o de despliegue', ['La vista lógica', 'La vista de desarrollo', 'El diagrama de contexto'], 'Vista de asignación en Views and Beyond.', 2],
    ['¿Cuál es la ventaja principal de dibujar diagramas con herramientas basadas en texto?', 'Que se versionan y revisan junto con el código', ['Que son más coloridos', 'Que no necesitan computadora', 'Que se generan sin escribir nada'], 'Documentación como código.', 3],
    ['Según ISO/IEC/IEEE 42010, ¿qué atiende cada vista?', 'Las preocupaciones de ciertos interesados', ['Todas las preocupaciones a la vez', 'Solo el rendimiento', 'Solo el código'], 'Interesados, preocupaciones y vistas.', 3],
    { tf: 'El Manifiesto Ágil prohíbe documentar la arquitectura.', v: false, e: 'Prefiere software funcionando sobre documentación extensiva, no la elimina.', l: 1 },
    { tf: 'arc42 se puede combinar con diagramas C4 y con ADR.', v: true, e: 'C4 llena las vistas y los ADR la sección de decisiones.', l: 2 },
    { o: 'Ordena los niveles de C4 del más general al más detallado.', s: ['Contexto', 'Contenedores', 'Componentes', 'Código'], e: 'Cuatro niveles de zoom.', l: 1 },
    { c: 'Escribe «adrVigentes(adrs)»: cada ADR es {id, estado}; devuelve los id de los que tienen estado "aceptada".', f: 'adrVigentes', p: ['adrs'], t: [[[[{ id: 1, estado: 'aceptada' }, { id: 2, estado: 'reemplazada' }, { id: 3, estado: 'aceptada' }]], [1, 3]], [[[]], []]], sol: '  return adrs.filter(a => a.estado === "aceptada").map(a => a.id);', l: 1 },
    { c: 'Escribe «violaciones(deps, permitidas)»: deps es una lista de [origen, destino] entre módulos; permitidas, un objeto {origen: [destinos permitidos]}. Devuelve las dependencias no permitidas como textos "origen->destino".', f: 'violaciones', p: ['deps', 'permitidas'], t: [[[[['patios', 'tarifas'], ['patios', 'facturacion'], ['facturacion', 'tarifas']], { patios: ['tarifas'], facturacion: ['tarifas'] }], ['patios->facturacion']], [[[['a', 'b']], {}], ['a->b']]], sol: '  return deps.filter(([o, d]) => !(permitidas[o] || []).includes(d)).map(([o, d]) => o + "->" + d);', l: 3 }
  ],
  gen: function (g) {
    var v41 = [['Clases y módulos de la funcionalidad', 'Lógica'], ['Hilos, procesos y comunicación entre ellos', 'De procesos'], ['Organización del código en paquetes y capas', 'De desarrollo'], ['Servidores, redes y dónde se ejecuta cada parte', 'Física'], ['Casos de uso que recorren todas las vistas', 'Escenarios']];
    v41.forEach(function (v) { g.mcq(2, 'En el modelo 4+1, ¿qué vista muestra esto? ' + v[0], v[1], ['Lógica', 'De procesos', 'De desarrollo', 'Física', 'Escenarios'].filter(function (x) { return x !== v[1]; }).slice(0, 3), 'Modelo 4+1 de Kruchten.'); });
    var c4 = [['PatioApp, los operadores, los dueños, la SUNAT y la pasarela de pago', 'Contexto'], ['La app móvil, la API, la base de datos y la cola de sincronización', 'Contenedores'], ['Los módulos de tarifas, facturación y patios dentro de la API', 'Componentes'], ['Las clases Tarifa, Estadia y CalculadoraDeTarifa', 'Código']];
    c4.forEach(function (c) { g.mcq(2, '¿Qué nivel de C4 muestra esto? ' + c[0], c[1], ['Contexto', 'Contenedores', 'Componentes', 'Código'].filter(function (x) { return x !== c[1]; }), 'Cuatro niveles de zoom.'); });
    var adr = [['Las fuerzas en juego: requisitos, restricciones y opciones', 'Contexto'], ['Usaremos un monolito modular', 'Decisión'], ['Desplegar es simple, pero escalar por separado no es posible', 'Consecuencias'], ['Reemplazada por el ADR-015', 'Estado']];
    adr.forEach(function (a) { g.mcq(1, '¿En qué sección de un ADR va esto? ' + a[0], a[1], ['Contexto', 'Decisión', 'Consecuencias', 'Estado'].filter(function (x) { return x !== a[1]; }), 'Formato de Nygard.'); });
  },
  checks: [
    ['¿Por qué una arquitectura necesita varias vistas?', 'Porque distintos interesados tienen distintas preocupaciones, y ningún diagrama único las atiende todas.'],
    ['Describe los cuatro niveles del modelo C4.', 'Contexto (sistema, usuarios y sistemas externos), contenedores (aplicaciones y almacenes), componentes (bloques internos) y código.'],
    ['¿Qué contiene un ADR y por qué no se edita?', 'Título, estado, contexto, decisión y consecuencias; no se edita para conservar la historia: un cambio se registra en un ADR nuevo que reemplaza al anterior.'],
    ['¿Qué ventajas tiene tratar la documentación como código?', 'Se versiona y revisa con el código, no envejece tan rápido, se genera automáticamente y parte de ella puede verificarse en la integración continua.']
  ],
  cites: ['Kruchten, P. (1995). The 4+1 View Model of Architecture. *IEEE Software*, 12(6).', 'Clements, P. et al. (2010). *Documenting Software Architectures: Views and Beyond* (2.ª ed.). Addison-Wesley.', 'ISO/IEC/IEEE 42010:2022. *Software, systems and enterprise — Architecture description*.', 'Brown, S. (2018). *Software Architecture for Developers, Volume 2: Visualise, document and explore your software architecture*. Leanpub.', 'Nygard, M. (2011). Documenting Architecture Decisions. cognitect.com.', 'Starke, G. y Hruschka, P. arc42: Template for documentation of software and system architecture. arc42.org.'],
  project: { t: 'Documentación de arquitectura mínima y útil',
    goal: 'Documentar la arquitectura de un sistema real con C4, arc42 y ADR.',
    steps: ['Elige un sistema que conozcas (uno tuyo o de código abierto) y su lista de interesados con sus preocupaciones.', 'Dibuja sus diagramas C4 de contexto y de contenedores con una herramienta basada en texto.', 'Escribe al menos tres ADR sobre decisiones importantes, con opciones consideradas.', 'Organiza todo en las secciones de arc42 que realmente necesitas.', 'Agrega una verificación automática de una regla de dependencias entre módulos.'],
    deliver: 'El repositorio con la documentación, los diagramas, los ADR y la verificación automatizada.' },
  hito: ['Crea los diagramas C4 de contexto y contenedores de PatioApp en texto dentro del repositorio.', 'Escribe los ADR de las decisiones principales de PatioApp (monolito modular, modo sin conexión, facturación electrónica) y una prueba de reglas de dependencia.']
});
SDC.after('m13.views', 'm13.quality');

S('m13', 'm13.ddd', { title: 'Diseño guiado por el dominio: contextos y agregados',
  ask: '¿Qué concepto del diseño guiado por el dominio se aplica?',
  lesson: `
> **La idea en simple.** En una empresa de patios, la palabra "unidad" significa una cosa para el operador de puerta (un vehículo con placa, color y daños), otra para contabilidad (algo que genera cobros) y otra para el área de seguros (un bien asegurado con una póliza). Si el software intenta tener un único modelo de "unidad" que sirva para todos, termina siendo un monstruo con cien campos que nadie entiende. El diseño guiado por el dominio propone aceptar esas diferencias y diseñar el software alrededor del lenguaje y los límites reales del negocio.

## Origen y propósito
Eric Evans publicó en 2003 *Domain-Driven Design: Tackling Complexity in the Heart of Software*, conocido como "el libro azul". Su tesis: en muchos sistemas la complejidad principal no es técnica, sino la del **dominio** (las reglas del negocio), y la forma de dominarla es que desarrolladores y expertos del negocio construyan juntos un **modelo** compartido que se refleje directamente en el código. Vaughn Vernon lo hizo más práctico con *Implementing Domain-Driven Design* (2013, el "libro rojo") y *Domain-Driven Design Distilled* (2016).

El DDD tiene dos partes: el **diseño estratégico** (cómo dividir un sistema grande y cómo se relacionan las partes) y el **diseño táctico** (cómo modelar el interior de cada parte). Evans y la comunidad coinciden en que lo estratégico es lo más valioso, y es lo que más se omite.

## Lenguaje ubicuo
El **lenguaje ubicuo** es el vocabulario que comparten los expertos del negocio y los desarrolladores, y que aparece **tal cual** en el código, las pruebas, las conversaciones y la documentación. Si en el patio dicen "estadía", "ingreso" y "liberar espacio", las clases y funciones se llaman «Estadia», «registrarIngreso» y «liberarEspacio», no «Registro», «insertRow» y «updateSlot». Cuando aparece una palabra nueva o ambigua, se discute y se acuerda. Un cambio en el lenguaje es un cambio en el modelo, y por lo tanto en el código.

## Dominio, subdominios y contextos delimitados
- El **dominio** es el área de actividad de la organización: la gestión de patios vehiculares.
- Los **subdominios** son partes de ese dominio con su propia lógica. Se clasifican en: **central** (*core*), lo que diferencia a la empresa y donde conviene invertir lo mejor del equipo (para PatioApp, la optimización de espacios y la operación sin conexión); **de soporte**, necesario y específico pero no diferenciador (la gestión de convenios con aseguradoras); y **genérico**, lo que cualquiera necesita y conviene comprar o usar hecho (autenticación, facturación electrónica a través de un proveedor, envío de mensajes).
- Un **contexto delimitado** (*bounded context*) es un límite explícito dentro del cual un modelo y su lenguaje son consistentes. Dentro del contexto de Operación, "unidad" tiene placa, ubicación y daños; dentro del de Facturación, "unidad" es una referencia con una estadía cobrable. Son **dos modelos distintos**, y eso está bien.
La idea clave de Evans es que intentar un modelo único y unificado para toda una empresa grande es una ilusión costosa; en su lugar, se aceptan varios modelos con límites claros y relaciones explícitas.

## Mapas de contexto
Un **mapa de contexto** muestra los contextos delimitados y cómo se relacionan. Evans y la comunidad catalogaron patrones de relación:
| Patrón | Significa |
| Asociación (*partnership*) | dos equipos coordinan sus cambios y triunfan o fracasan juntos |
| Núcleo compartido | comparten un pequeño modelo común que ninguno cambia sin el otro |
| Cliente-proveedor | el contexto de abajo (cliente) depende del de arriba (proveedor), que considera sus necesidades al planificar |
| Conformista | el de abajo adopta tal cual el modelo del de arriba, sin poder influirlo |
| Capa anticorrupción | el de abajo traduce el modelo del de arriba a su propio modelo para no contaminarse |
| Servicio de host abierto y lenguaje publicado | el de arriba ofrece una API bien definida y documentada para muchos consumidores |
| Caminos separados | no se integran; cada uno resuelve su necesidad por su cuenta |
La **capa anticorrupción** es especialmente útil al integrarse con sistemas heredados o externos: el formato de la SUNAT o el del sistema antiguo de la empresa no deben filtrarse al modelo propio; un adaptador traduce en el borde.

## Diseño táctico: los bloques de construcción
Dentro de un contexto, el DDD propone patrones para modelar el dominio:
- **Entidad:** objeto con **identidad** que persiste en el tiempo aunque cambien sus atributos (una estadía con su número; una unidad con su placa).
- **Objeto de valor:** objeto definido solo por sus atributos, sin identidad e **inmutable** (un monto de 120 soles, un rango de fechas, una ubicación B-14). Dos montos de 120 soles son intercambiables.
- **Agregado:** grupo de entidades y objetos de valor que se tratan como una unidad para los cambios, con una **raíz** que es la única puerta de entrada. Las reglas (invariantes) del agregado se cumplen siempre al terminar cada transacción.
- **Repositorio:** abstracción que guarda y recupera agregados completos, ocultando la base de datos.
- **Servicio de dominio:** operación del dominio que no pertenece naturalmente a una entidad (calcular la tarifa con reglas de convenio que involucran varias cosas).
- **Evento de dominio:** algo que ocurrió y que interesa al negocio, nombrado en pasado («UnidadIngresada», «SalidaRegistrada»).
- **Fábrica:** encapsula la creación de agregados complejos.

## Reglas de diseño de agregados
Vernon resumió reglas prácticas para diseñar agregados (*Effective Aggregate Design*, 2011):
1. **Proteger invariantes verdaderas dentro del límite:** el agregado debe ser exactamente lo que tiene que ser consistente de inmediato. "Una estadía no puede cerrarse con deuda pendiente" es una invariante de la Estadía.
2. **Diseñar agregados pequeños:** los agregados grandes generan conflictos de concurrencia y cargas lentas.
3. **Referenciar otros agregados solo por su identidad**, no por objetos completos.
4. **Usar consistencia eventual entre agregados:** si al cerrar una estadía hay que liberar el espacio (otro agregado), se publica un evento y el espacio se libera en otra transacción.
~~~js
// Agregado Estadia con su raíz: las reglas se cumplen desde dentro
class Estadia {
  constructor(id, placa, espacioId, ingreso) { Object.assign(this, { id, placa, espacioId, ingreso, salida: null, pagos: [], eventos: [] }); }
  registrarPago(monto) { if (this.salida) throw new Error('la estadía ya está cerrada'); this.pagos.push(monto); }
  deuda(tarifaDiaria, hoy) {
    const dias = Math.max(1, Math.ceil((hoy - this.ingreso) / 86400000));
    return dias * tarifaDiaria - this.pagos.reduce((a, b) => a + b, 0);
  }
  cerrar(tarifaDiaria, hoy) {
    if (this.deuda(tarifaDiaria, hoy) > 0) throw new Error('no se puede cerrar con deuda');
    this.salida = hoy;
    this.eventos.push({ tipo: 'SalidaRegistrada', estadia: this.id, espacio: this.espacioId });   // otro agregado libera el espacio
  }
}
const e = new Estadia('E-91', 'ABC-123', 'B-14', new Date('2026-11-10'));
e.registrarPago(60);
try { e.cerrar(20, new Date('2026-11-13')); } catch (err) { console.log(err.message); }
e.registrarPago(0);
console.log('deuda:', e.deuda(20, new Date('2026-11-13')));
~~~

## Cuándo usar DDD
El DDD es caro: exige acceso a expertos, tiempo de modelado y disciplina. Evans mismo recomienda aplicarlo donde el dominio es **complejo** y **central** para el negocio. Para un CRUD simple o un subdominio genérico, un diseño sencillo basta. Un error común es adoptar solo el vocabulario táctico (llenar el código de "repositorios" y "agregados") sin hacer el trabajo estratégico de entender el negocio y sus límites; el resultado es complejidad sin beneficio.

## DDD y microservicios
Los contextos delimitados se convirtieron en la principal guía para **dividir microservicios**: Sam Newman y otros recomiendan que un servicio no sea más grande que un contexto delimitado. Cortar por entidades ("servicio de unidades", "servicio de clientes") produce servicios que se llaman entre sí para todo; cortar por contextos produce servicios con alta cohesión y pocas dependencias.

## Ejemplo resuelto: el mapa de contextos de PatioApp
1. **Contextos:** Operación de patio (central), Tarifas y convenios (de soporte), Facturación (genérico, mediante un proveedor), Notificaciones (genérico) e Identidad (genérico).
2. **Relaciones:** Operación es **proveedor** de Facturación (publica «SalidaRegistrada»); Facturación se integra con el proveedor de facturación electrónica mediante una **capa anticorrupción**; Notificaciones es **conformista** con la API de WhatsApp Business; Tarifas ofrece un **servicio de host abierto** que consultan Operación y Facturación.
3. **Agregados en Operación:** Estadía (raíz, con pagos y daños) y Espacio (con su estado). La salida cierra la Estadía y publica un evento; el Espacio se libera al recibirlo (consistencia eventual entre agregados).
4. **Glosario** del lenguaje ubicuo en el repositorio, revisado con los supervisores cada trimestre.`,
  links: [['m13.styles', 'la arquitectura hexagonal aísla el modelo de dominio'], ['m5.oop1', 'entidades y objetos de valor son decisiones de diseño orientado a objetos'], ['sd.tx', 'la consistencia eventual entre agregados usa eventos y sagas']],
  read: 'Evans, *Domain-Driven Design* (2003), partes II y IV; Vernon, *Domain-Driven Design Distilled* (2016); Khononov, *Learning Domain-Driven Design* (2021).',
  terms: [
    ['Lenguaje ubicuo', 'vocabulario compartido por expertos y desarrolladores que aparece tal cual en el código', ['Estadia, registrarIngreso.', 'Se discute y acuerda.', 'Cambiar el lenguaje es cambiar el modelo.']],
    ['Contexto delimitado', 'límite explícito dentro del cual un modelo y su lenguaje son consistentes', ['Operación de patio.', 'Facturación.', '"Unidad" significa algo distinto en cada uno.']],
    ['Subdominio central', 'parte del dominio que diferencia a la empresa y merece la mayor inversión', ['La optimización de espacios.', 'Se construye a medida.', 'Se opone al genérico.']],
    ['Mapa de contexto', 'diagrama de los contextos delimitados y los patrones de relación entre ellos', ['Cliente-proveedor.', 'Capa anticorrupción.', 'Conformista.']],
    ['Capa anticorrupción', 'traductor que protege el modelo propio del modelo de un sistema externo o heredado', ['Frente al proveedor de facturación.', 'Frente al sistema antiguo.', 'Se ubica en el borde.']],
    ['Agregado', 'grupo de objetos que se modifica como una unidad a través de su raíz y que mantiene sus invariantes', ['Estadía con pagos y daños.', 'Debe ser pequeño.', 'Se referencia por identidad.']],
    ['Objeto de valor', 'objeto inmutable definido solo por sus atributos, sin identidad propia', ['Un monto de 120 soles.', 'Una ubicación B-14.', 'Dos iguales son intercambiables.']],
    ['Evento de dominio', 'hecho del negocio que ocurrió, nombrado en pasado', ['SalidaRegistrada.', 'UnidadIngresada.', 'Comunica agregados y contextos.']]
  ],
  q: [
    ['¿Cuál es la tesis central del DDD?', 'Que la complejidad principal suele estar en el dominio y se domina con un modelo compartido con los expertos y reflejado en el código', ['Que la base de datos es lo más importante', 'Que no hace falta hablar con el negocio', 'Que todo debe ser microservicios'], 'Evans, 2003.', 2],
    ['"Unidad" significa cosas distintas para operaciones y contabilidad. ¿Qué propone el DDD?', 'Modelarla distinto en contextos delimitados separados', ['Un único modelo con todos los campos', 'Prohibir la palabra', 'Usar dos bases de datos sin modelo'], 'Cada contexto tiene su modelo consistente.', 3],
    ['¿Qué patrón protege el modelo propio al integrarse con el formato de un sistema externo?', 'La capa anticorrupción', ['El conformista', 'El núcleo compartido', 'Los caminos separados'], 'Traduce en el borde.', 2],
    ['¿Qué distingue a una entidad de un objeto de valor?', 'La entidad tiene identidad que persiste; el objeto de valor se define solo por sus atributos y es inmutable', ['La entidad es más pequeña', 'El objeto de valor se guarda en la base de datos', 'No hay diferencia'], 'Estadía contra monto.', 2],
    ['Según Vernon, ¿cómo deben referenciarse los agregados entre sí?', 'Solo por su identidad', ['Con objetos completos', 'Con herencia', 'Con variables globales'], 'Evita agregados enormes.', 3],
    ['Al cerrar una estadía hay que liberar el espacio, que es otro agregado. ¿Qué recomienda el DDD?', 'Publicar un evento y liberar el espacio en otra transacción (consistencia eventual)', ['Modificar ambos en un agregado gigante', 'No liberar nunca el espacio', 'Usar un bloqueo global'], 'Regla 4 de Vernon.', 4],
    ['¿Qué tipo de subdominio es la autenticación para PatioApp?', 'Genérico', ['Central', 'De soporte', 'Ninguno'], 'Conviene usar una solución existente.', 2],
    { tf: 'El diseño estratégico del DDD (contextos y mapas) suele ser más valioso que los patrones tácticos.', v: true, e: 'Es lo que Evans y la comunidad consideran más importante y más omitido.', l: 3 },
    { tf: 'Conviene aplicar DDD completo a cualquier sistema, incluso a un CRUD simple.', v: false, e: 'Es caro; conviene en dominios complejos y centrales.', l: 2 },
    { c: 'Escribe «montoIgual(a, b)»: los montos son objetos de valor {valor, moneda}; devuelve true si son iguales en valor y moneda.', f: 'montoIgual', p: ['a', 'b'], t: [[[{ valor: 120, moneda: 'PEN' }, { valor: 120, moneda: 'PEN' }], true], [[{ valor: 120, moneda: 'PEN' }, { valor: 120, moneda: 'USD' }], false]], sol: '  return a.valor === b.valor && a.moneda === b.moneda;', l: 1 },
    { c: 'Escribe «puedeCerrar(estadia)»: estadia es {cobrado, pagos}; devuelve true si la suma de pagos es mayor o igual que lo cobrado (la invariante del agregado).', f: 'puedeCerrar', p: ['estadia'], t: [[[{ cobrado: 60, pagos: [20, 40] }], true], [[{ cobrado: 60, pagos: [20] }], false], [[{ cobrado: 0, pagos: [] }], true]], sol: '  return estadia.pagos.reduce((a, b) => a + b, 0) >= estadia.cobrado;', l: 2 },
    { c: 'Escribe «traducir(sunat)»: capa anticorrupción que convierte {ruc_emisor, mto_total, cod_moneda} en {emisor, total, moneda}.', f: 'traducir', p: ['sunat'], t: [[[{ ruc_emisor: '20123', mto_total: 118, cod_moneda: 'PEN' }], { emisor: '20123', total: 118, moneda: 'PEN' }]], sol: '  return { emisor: sunat.ruc_emisor, total: sunat.mto_total, moneda: sunat.cod_moneda };', l: 2 }
  ],
  gen: function (g) {
    var bl = [['Una estadía con número que persiste mientras cambian sus pagos', 'Entidad'], ['Un monto de 120 soles', 'Objeto de valor'], ['La estadía con sus pagos y daños, modificada solo a través de ella', 'Agregado'], ['Guarda y recupera estadías completas ocultando la base de datos', 'Repositorio'], ['SalidaRegistrada', 'Evento de dominio'], ['Calcula la tarifa combinando convenio, tipo de vehículo y días', 'Servicio de dominio'], ['Un rango de fechas de ingreso y salida', 'Objeto de valor']];
    bl.forEach(function (b) { g.mcq(2, '¿Qué bloque de construcción del DDD es esto? ' + b[0], b[1], ['Entidad', 'Objeto de valor', 'Agregado', 'Repositorio', 'Evento de dominio', 'Servicio de dominio'].filter(function (x) { return x !== b[1]; }).slice(0, 3), 'Diseño táctico.'); });
    var rel = [['Facturación traduce el formato del proveedor a su propio modelo', 'Capa anticorrupción'], ['Notificaciones adopta tal cual el modelo de la API de WhatsApp', 'Conformista'], ['Tarifas ofrece una API documentada para muchos consumidores', 'Servicio de host abierto'], ['Dos equipos coordinan sus cambios y triunfan o fracasan juntos', 'Asociación'], ['El contexto proveedor considera las necesidades del cliente al planificar', 'Cliente-proveedor']];
    rel.forEach(function (r) { g.mcq(3, '¿Qué patrón del mapa de contexto es? ' + r[0], r[1], ['Capa anticorrupción', 'Conformista', 'Servicio de host abierto', 'Asociación', 'Cliente-proveedor'].filter(function (x) { return x !== r[1]; }).slice(0, 3), 'Patrones de relación entre contextos.'); });
    var sub = [['La optimización de espacios que diferencia a la empresa', 'Central'], ['La gestión de convenios con aseguradoras', 'De soporte'], ['El inicio de sesión', 'Genérico'], ['El envío de correos', 'Genérico']];
    sub.forEach(function (s) { g.mcq(2, '¿Qué tipo de subdominio es para PatioApp? ' + s[0], s[1], ['Central', 'De soporte', 'Genérico', 'Técnico'].filter(function (x) { return x !== s[1]; }), 'Central, de soporte y genérico.'); });
  },
  checks: [
    ['¿Qué es el lenguaje ubicuo y cómo se nota en el código?', 'El vocabulario compartido con los expertos; las clases y funciones usan exactamente esos términos.'],
    ['Explica qué es un contexto delimitado con un ejemplo.', 'Un límite donde un modelo es consistente; "unidad" en Operación tiene placa y daños, en Facturación es una referencia cobrable.'],
    ['Enuncia las reglas de Vernon para diseñar agregados.', 'Proteger invariantes verdaderas dentro del límite, agregados pequeños, referencias por identidad y consistencia eventual entre agregados.'],
    ['¿Cuándo no conviene aplicar DDD?', 'En dominios simples o genéricos, como un CRUD o la autenticación, donde su costo supera el beneficio.']
  ],
  cites: ['Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.', 'Vernon, V. (2013). *Implementing Domain-Driven Design*. Addison-Wesley.', 'Vernon, V. (2011). Effective Aggregate Design. dddcommunity.org.', 'Khononov, V. (2021). *Learning Domain-Driven Design*. O’Reilly.', 'Newman, S. (2021). *Building Microservices* (2.ª ed.). O’Reilly.'],
  project: { t: 'Modelo de dominio estratégico y táctico',
    goal: 'Aplicar DDD a un dominio real.',
    steps: ['Elige un dominio con reglas de negocio (una clínica, un colegio, una ferretería) y entrevista a alguien que lo conozca.', 'Construye el glosario del lenguaje ubicuo y detecta palabras con significados distintos.', 'Identifica subdominios (central, de soporte, genérico) y contextos delimitados, y dibuja el mapa de contexto.', 'Diseña dos agregados del contexto central con sus invariantes y eventos.', 'Implementa uno de ellos con pruebas que verifiquen sus invariantes.'],
    deliver: 'El glosario, el mapa de contexto, el diseño de agregados y el código con pruebas.' },
  hito: ['Dibuja el mapa de contextos de PatioApp con sus patrones de relación y publica el glosario del lenguaje ubicuo.', 'Implementa el agregado Estadía de PatioApp con sus invariantes y el evento SalidaRegistrada, con pruebas.']
});
SDC.after('m13.ddd', 'm13.views');
})();
