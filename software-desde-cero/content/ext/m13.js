(function () {
var X = SDC.X, XM = SDC.XM;
XM('m13', {
  uni: 'CMU 17-313 y el programa de maestría en ingeniería de software de CMU (arquitecturas de software); MIT 6.1800 (antes 6.033) *Computer Systems Engineering* y 6.5840 (antes 6.824) *Distributed Systems*; CMU 15-440 *Distributed Systems*. En Perú: Arquitectura de Software y Sistemas Distribuidos (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'Arquitectura de PatioApp documentada y probada',
    goal: 'Tomar y documentar las decisiones de arquitectura de PatioApp y demostrar con pruebas que cumple sus atributos de calidad.',
    steps: ['Escribe los escenarios de calidad principales y un árbol de utilidad que los priorice.', 'Reestructura el sistema con arquitectura hexagonal en un monolito modular y documenta cada decisión con un ADR.', 'Ejecuta varias instancias sin estado detrás de un balanceador, con caché y una cola para las notificaciones.', 'Agrega patrones de resiliencia (timeouts, reintentos, cortacircuitos, idempotencia) y prueba la caída de un componente.', 'Automatiza funciones de aptitud que verifiquen en cada cambio los atributos de calidad críticos.'],
    deliver: 'Los diagramas C4, los ADR, los resultados de las pruebas de carga y de fallas, y las funciones de aptitud en la integración continua.' }
});

X('m13.styles', {
  deep: `
## Qué es arquitectura
Dewayne Perry y Alexander Wolf la definieron en 1992 como **elementos, forma y razón** (el porqué de las decisiones). Len Bass, Paul Clements y Rick Kazman, en *Software Architecture in Practice*, la describen como el conjunto de estructuras necesarias para razonar sobre el sistema: elementos de software, las relaciones entre ellos y las propiedades de ambos. Martin Fowler, citando a Ralph Johnson, dio una definición práctica en 2003 (*Who Needs an Architect?*): la arquitectura es **lo importante**, sea lo que sea; o dicho de otro modo, las decisiones que son difíciles de cambiar.
Mark Richards y Neal Ford formulan en *Fundamentals of Software Architecture* (2020) dos "leyes": **todo en arquitectura es un compromiso** (si crees haber encontrado algo sin desventajas, todavía no la has encontrado) y **el porqué importa más que el cómo**.

## Un catálogo con historia
David Garlan y Mary Shaw publicaron en 1993 *An Introduction to Software Architecture*, el primer catálogo de **estilos**:
| Estilo | Idea | Ejemplo |
| Tuberías y filtros | datos que pasan por transformaciones independientes | la terminal de Unix, pipelines de datos |
| Capas | cada capa usa solo la de abajo | el sistema operativo THE de Dijkstra (1968), los protocolos de red |
| Basado en eventos | los componentes publican y reaccionan a eventos | interfaces gráficas, sistemas reactivos |
| Repositorio central | componentes que leen y escriben un almacén común | compiladores, sistemas de pizarra |
| Microkernel (plugins) | un núcleo mínimo extensible | VS Code, navegadores con extensiones |

## La regla de dependencia
Alistair Cockburn propuso la **arquitectura hexagonal** (puertos y adaptadores) en 2005; Jeffrey Palermo, la **arquitectura cebolla** en 2008; y Robert C. Martin las sintetizó como **arquitectura limpia** (2012, y su libro de 2017). Todas comparten una regla: **las dependencias del código apuntan hacia adentro**, hacia el dominio. Las reglas de negocio no importan nada de la base de datos, del framework web ni de la interfaz; definen **puertos** (interfaces) que los **adaptadores** externos implementan.
~~~txt
            [ HTTP ]   [ Consola ]   [ Pruebas ]        ← adaptadores de entrada
                 \\          |           /
               ( Puerto: ServicioEntregas )
                 [   DOMINIO PatioApp   ]               ← sin dependencias externas
               ( Puertos: Repositorio, Notificador )
                 /          |           \\
         [ PostgreSQL ] [ En memoria ] [ Correo ]        ← adaptadores de salida
~~~
Así se puede cambiar de base de datos o probar todo el dominio sin servidor.

## Monolito, monolito modular y microservicios
James Lewis y Martin Fowler describieron los **microservicios** en 2014: servicios pequeños, desplegables por separado, organizados alrededor de capacidades de negocio, con datos propios y equipos dueños de punta a punta. A cambio traen la complejidad de un sistema distribuido: red, fallas parciales, consistencia eventual, monitoreo y despliegues coordinados. Fowler recomendó en 2015 empezar por un **monolito** (*MonolithFirst*): es difícil trazar buenas fronteras antes de entender el dominio.
Algunos casos públicos muestran el péndulo: Segment explicó en 2018 por qué volvió de más de cien microservicios a un monolito, y el equipo de monitoreo de video de Amazon Prime Video contó en 2023 que pasar un componente de funciones distribuidas a un solo proceso redujo su costo de infraestructura en más de 90%. El **monolito modular**, un solo despliegue con módulos de fronteras estrictas, es hoy un punto de partida muy defendido.

## Serverless
Con AWS Lambda (2014) se popularizaron las **funciones como servicio**: subes funciones y la plataforma las ejecuta y escala, cobrando por uso. Es ideal para cargas irregulares y tareas dirigidas por eventos; sus límites son el arranque en frío, la duración máxima y la dependencia del proveedor. Vercel usa este modelo para las funciones del lado del servidor.

## Documentar decisiones: ADR
Michael Nygard propuso en 2011 los **registros de decisiones de arquitectura**: un archivo corto por decisión, guardado en el repositorio.
~~~txt
# ADR 003: Usar un monolito modular en lugar de microservicios
Estado: aceptada (2026-11-12)
Contexto: equipo de 2 personas, dominio aún cambiante, presupuesto limitado.
Decisión: un solo despliegue con módulos (ingresos, revisiones, entregas, cobros)
que solo se comunican por interfaces públicas.
Consecuencias: despliegue simple y transacciones locales; habrá que vigilar
que no se crucen las fronteras (se verifica con una prueba de dependencias).
~~~
Dentro de un año, cuando alguien pregunte "¿por qué no usaron microservicios?", la respuesta estará ahí, con su contexto.`,
  checks: [
    ['¿Qué dicen las dos leyes de Richards y Ford sobre la arquitectura?', 'Que todo es un compromiso (toda decisión tiene desventajas) y que el porqué de una decisión importa más que el cómo.'],
    ['¿Qué es la regla de dependencia de la arquitectura limpia o hexagonal?', 'Que las dependencias del código apuntan hacia el dominio: las reglas de negocio no dependen de bases de datos, frameworks ni interfaces, sino de puertos que los adaptadores implementan.'],
    ['¿Por qué Fowler recomienda empezar con un monolito?', 'Porque al inicio no se conoce bien el dominio y es difícil trazar buenas fronteras entre servicios; dividir después, cuando las fronteras son claras, es más seguro y barato.'],
    ['¿Qué ventaja tiene un monolito modular frente a los microservicios en un equipo pequeño?', 'Despliegue y operación simples, transacciones locales y sin fallas de red entre módulos, manteniendo fronteras claras que permiten separar servicios más adelante si hace falta.'],
    ['¿Qué contiene un ADR y para qué sirve?', 'Título, estado, contexto, decisión y consecuencias. Sirve para recordar por qué se tomó una decisión y en qué condiciones conviene revisarla.']
  ],
  cites: ['Bass, L., Clements, P. y Kazman, R. (2021). *Software Architecture in Practice* (4.ª ed.). Addison-Wesley.', 'Richards, M. y Ford, N. (2020). *Fundamentals of Software Architecture*. O\'Reilly.', 'Garlan, D. y Shaw, M. (1993). An Introduction to Software Architecture. *Advances in Software Engineering and Knowledge Engineering*, vol. 1.', 'Cockburn, A. (2005). Hexagonal Architecture. alistair.cockburn.us.', 'Lewis, J. y Fowler, M. (2014). Microservices. martinfowler.com.', 'Nygard, M. (2011). Documenting Architecture Decisions. cognitect.com.'],
  project: { t: 'La misma aplicación en tres arquitecturas',
    goal: 'Comparar estilos de arquitectura con evidencia, midiendo cuánto cuesta un mismo cambio en cada uno.',
    steps: ['Implementa un sistema pequeño (registrar y entregar unidades) en tres versiones: capas clásicas, hexagonal y monolito modular con dos módulos.', 'En la versión hexagonal, ejecuta todas las pruebas del dominio con adaptadores en memoria, sin base de datos.', 'Aplica el mismo cambio en las tres (cambiar SQLite por PostgreSQL y agregar una interfaz de consola) y cuenta archivos y líneas modificadas.', 'Escribe una prueba automática que falle si el dominio importa algo de infraestructura.', 'Documenta en ADR la arquitectura que elegirías y por qué.'],
    deliver: 'Las tres versiones, la tabla comparativa del costo del cambio y los ADR.' },
  hito: ['Reestructura PatioApp con arquitectura hexagonal: un dominio sin dependencias externas, puertos para el repositorio y las notificaciones, y adaptadores para base de datos, HTTP y consola.', 'Escribe los tres primeros ADR de PatioApp (por ejemplo, monolito modular, base de datos elegida y arquitectura hexagonal).']
});

X('m13.quality', {
  deep: `
## Un modelo para hablar de calidad
La norma ISO/IEC 25010 define las características de calidad de un producto de software. Su revisión de 2023 contempla nueve: adecuación funcional, eficiencia de desempeño, compatibilidad, capacidad de interacción (antes "usabilidad"), fiabilidad, seguridad, mantenibilidad, flexibilidad (antes "portabilidad") y protección (*safety*, que se agregó en esa revisión). Sirve como lista de verificación para no olvidar ningún atributo al definir requisitos.

## Escenarios de calidad en seis partes
Bass, Clements y Kazman proponen que un atributo de calidad no se escriba como adjetivo ("debe ser rápido") sino como **escenario** medible con seis partes:
| Parte | Ejemplo de disponibilidad |
| Fuente | una falla de hardware |
| Estímulo | se cae el servidor de base de datos principal |
| Artefacto | la capa de datos |
| Entorno | operación normal, horario de atención |
| Respuesta | el sistema pasa a la réplica y sigue atendiendo |
| Medida | en menos de 30 segundos y sin perder registros confirmados |
Un escenario así se puede probar, priorizar y discutir con el negocio.

## Tácticas: cómo se logra cada atributo
Para cada atributo existen **tácticas** conocidas:
- **Disponibilidad:** detectar fallas (latidos o *heartbeats*, monitoreo), recuperarse (redundancia, conmutación por error, reintentos) y prevenir (retirar de servicio lo que está fallando).
- **Rendimiento:** controlar la demanda (límites de velocidad, colas) y administrar recursos (caché, concurrencia, réplicas).
- **Modificabilidad:** reducir el tamaño de los módulos, aumentar la cohesión, reducir el acoplamiento (encapsular, usar intermediarios, diferir decisiones a la configuración).
- **Seguridad:** detectar, resistir, reaccionar y recuperarse de ataques.

## Evaluar una arquitectura: ATAM
El Software Engineering Institute de Carnegie Mellon desarrolló el **ATAM** (Kazman, Klein y Clements, 2000), un método para evaluar una arquitectura antes de construirla. Se arma un **árbol de utilidad** que prioriza los escenarios de calidad según su importancia para el negocio y su dificultad técnica, y se analiza cómo la arquitectura responde a cada uno, identificando **puntos de sensibilidad** (decisiones que afectan un atributo), **compromisos** (decisiones que mejoran uno y empeoran otro) y **riesgos**.

## Disponibilidad con fórmulas
:::flow Disponibilidad = MTBF / (MTBF + MTTR)
El **MTBF** es el tiempo medio entre fallas y el **MTTR**, el tiempo medio de recuperación. Para mejorar la disponibilidad se puede fallar menos o **recuperarse más rápido**, y lo segundo suele ser más barato: con MTBF de 30 días, bajar el MTTR de 4 horas a 15 minutos lleva la disponibilidad de 99.45% a 99.97%.
~~~js
const mtbfHoras = 30 * 24;
for (const mttrHoras of [4, 1, 0.25]) console.log('MTTR', mttrHoras, 'h →', (100 * mtbfHoras / (mtbfHoras + mttrHoras)).toFixed(2) + '%');
~~~

## La cola larga de la latencia
Jeffrey Dean y Luiz André Barroso mostraron en *The Tail at Scale* (2013) que en sistemas que reparten una petición entre muchos servidores, el **percentil 99** domina la experiencia: si una página consulta 100 servicios y cada uno tarda más de un segundo en 1% de los casos, el 63% de las páginas será lenta. Por eso las metas de rendimiento se escriben con percentiles (p95, p99) y no con promedios, y existen técnicas como enviar peticiones duplicadas a otra réplica si la primera tarda.

## Funciones de aptitud
Neal Ford, Rebecca Parsons y Patrick Kua proponen en *Building Evolutionary Architectures* (2017) convertir los atributos de calidad en **funciones de aptitud**: pruebas automáticas que se ejecutan en cada cambio y fallan si la arquitectura se degrada. Ejemplos: "el p95 del listado bajo carga es menor a 300 ms", "ningún archivo del dominio importa el paquete de base de datos", "no hay dependencias con vulnerabilidades críticas". Así la arquitectura no se erosiona en silencio.`,
  checks: [
    ['Escribe un escenario de rendimiento con las seis partes.', 'Fuente: 200 revisores; estímulo: buscan unidades por placa al mismo tiempo; artefacto: la API de búsqueda; entorno: hora punta; respuesta: devuelve los resultados; medida: p95 menor a 300 ms.'],
    ['Con MTBF de 1000 horas y MTTR de 10 horas, ¿cuál es la disponibilidad?', '1000 / 1010 ≈ 99.01%.'],
    ['¿Qué es un compromiso (trade-off) en el método ATAM? Da un ejemplo.', 'Una decisión que mejora un atributo y empeora otro; por ejemplo, cifrar todos los datos mejora la seguridad pero aumenta la latencia.'],
    ['¿Por qué las metas de rendimiento se escriben con percentiles?', 'Porque el promedio oculta a los usuarios con peor experiencia; en sistemas con muchas llamadas internas, la cola (p99) determina cuántas respuestas totales son lentas.'],
    ['¿Qué es una función de aptitud y qué problema resuelve?', 'Una prueba automática que verifica un atributo arquitectónico en cada cambio; evita que la arquitectura se degrade sin que nadie lo note.']
  ],
  cites: ['Bass, L., Clements, P. y Kazman, R. (2021). *Software Architecture in Practice* (4.ª ed.). Addison-Wesley. Capítulos 3 a 13.', 'ISO/IEC 25010:2023. *Systems and software engineering — SQuaRE — Product quality model*.', 'Kazman, R., Klein, M. y Clements, P. (2000). *ATAM: Method for Architecture Evaluation*. Informe técnico CMU/SEI-2000-TR-004.', 'Dean, J. y Barroso, L. A. (2013). The Tail at Scale. *Communications of the ACM*, 56(2).', 'Ford, N., Parsons, R. y Kua, P. (2017). *Building Evolutionary Architectures*. O\'Reilly.'],
  project: { t: 'Árbol de utilidad y funciones de aptitud',
    goal: 'Hacer explícitos y verificables los atributos de calidad de un sistema.',
    steps: ['Escribe ocho escenarios de calidad en el formato de seis partes, cubriendo al menos cinco características de ISO 25010.', 'Organízalos en un árbol de utilidad con importancia y dificultad (alta, media, baja).', 'Para los tres más importantes, describe las tácticas que usarás y los compromisos que aceptas.', 'Automatiza tres funciones de aptitud en la integración continua.', 'Rompe a propósito una de las propiedades y comprueba que la función de aptitud falla.'],
    deliver: 'El árbol de utilidad, el análisis de tácticas y la integración continua con las funciones de aptitud.' },
  hito: ['Define seis escenarios de calidad de PatioApp (rendimiento, disponibilidad, seguridad, mantenibilidad, usabilidad y modificabilidad) en el formato de seis partes.', 'Automatiza dos funciones de aptitud: el p95 del listado bajo carga es menor a 300 ms y el dominio no importa nada de infraestructura.']
});

X('m13.scale', {
  deep: `
## El cubo de escalabilidad
Martin Abbott y Michael Fisher propusieron en *The Art of Scalability* (2009) el **cubo AKF**, con tres ejes para crecer:
| Eje | Cómo | Ejemplo |
| X: clonar | copias idénticas detrás de un balanceador | 5 instancias de la API |
| Y: dividir por función | separar por capacidad de negocio | un servicio de cobros y otro de revisiones |
| Z: dividir por datos | cada instancia atiende una parte de los datos | sedes de Lima en un grupo de servidores, provincias en otro |
El eje X es el más simple, pero exige que los servidores sean **sin estado**: la sesión, los archivos subidos y las cachés compartidas deben vivir fuera del proceso (en Redis, en la base de datos o en un almacenamiento de objetos).

## Por qué duplicar servidores no duplica la capacidad
La ley de Amdahl ya mostraba que la parte secuencial limita la mejora. Neil Gunther propuso la **ley universal de escalabilidad**, que agrega dos frenos: la **contención** (esperar recursos compartidos, como un cerrojo o la misma fila de la base de datos) y la **coherencia** (el costo de mantener a todos sincronizados, que crece con el cuadrado del número de nodos). Por eso, a partir de cierto punto, agregar servidores **empeora** el rendimiento. Medir es la única forma de saber dónde está ese punto.

## Cálculos en una servilleta
Jeff Dean popularizó las estimaciones rápidas antes de diseñar. Ejemplo para PatioApp a escala nacional:
~~~js
const usuarios = 20000, peticionesPorUsuarioDia = 60, factorPico = 4;
const promedio = usuarios * peticionesPorUsuarioDia / 86400;
const pico = promedio * factorPico;
const capacidadPorInstancia = 150;                       // medida con una prueba de carga
console.log('promedio', promedio.toFixed(1), 'pet/s · pico', pico.toFixed(0), 'pet/s');
console.log('instancias necesarias (al 70% de uso):', Math.ceil(pico / (capacidadPorInstancia * 0.7)));
const bytesPorFoto = 300e3, fotosPorDia = 4000;
console.log('almacenamiento de fotos por año:', (bytesPorFoto * fotosPorDia * 365 / 1e9).toFixed(0), 'GB');
~~~
Estas cuentas evitan dos errores opuestos: sobredimensionar (gastar en una arquitectura para millones cuando hay miles) y subdimensionar.

## Patrones de caché
| Patrón | Cómo funciona | Riesgo |
| Cache-aside (perezoso) | la aplicación busca en caché; si no está, lee la base y guarda | primer acceso lento; datos viejos hasta que vence |
| Read-through | la caché misma carga desde la base al fallar | depende de la librería de caché |
| Write-through | se escribe en caché y base a la vez | escrituras más lentas |
| Write-back | se escribe en caché y luego, en lote, en la base | se pueden perder datos si la caché cae |
Phil Karlton, ingeniero de Netscape, es citado con frecuencia por esta frase:
:::cita En las ciencias de la computación solo hay dos cosas difíciles: invalidar la caché y ponerle nombre a las cosas. | Atribuida a Phil Karlton, traducción propia.
Las estrategias de invalidación son tres: **expiración** (TTL), **invalidación explícita** al escribir y **versionado de claves** (cambiar la clave cuando cambian los datos, como hacen los archivos estáticos con un hash en el nombre).

## La estampida
Cuando una clave muy consultada expira, cientos de peticiones fallan a la vez en la caché y golpean juntas la base de datos (*cache stampede* o *thundering herd*). Soluciones: que solo una petición recalcule mientras las demás esperan, renovar la clave **antes** de que venza o agregar una variación aleatoria al TTL para que no expiren todas a la vez.

## Balanceo y salud
Un balanceador reparte las peticiones (por turnos, a la instancia con **menos conexiones** o por hash del cliente) y revisa la **salud** de cada instancia con un endpoint como «/salud»: si no responde, deja de enviarle tráfico. Para que un despliegue no corte peticiones en curso, las instancias deben **drenar** las conexiones al recibir la señal de terminar.

## La base de datos suele ser el cuello de botella
Antes de partir la base de datos: optimiza las consultas e índices, usa un **pool de conexiones** (abrir conexiones es caro y la base admite un número limitado), agrega **réplicas de lectura** para los reportes y una **cola** para el trabajo que no necesita hacerse en el momento (enviar correos, generar PDF). Particionar (sharding) es el último recurso, porque complica las consultas y las transacciones que cruzan particiones.`,
  checks: [
    ['¿Qué exige escalar en el eje X del cubo AKF?', 'Que los servidores sean sin estado: sesiones, archivos y cachés compartidas deben estar fuera del proceso, para que cualquier copia pueda atender cualquier petición.'],
    ['Según la ley universal de escalabilidad, ¿por qué agregar servidores puede empeorar el rendimiento?', 'Por la contención (esperas por recursos compartidos) y sobre todo por el costo de coherencia entre nodos, que crece más rápido que la capacidad agregada.'],
    ['Con 50 000 usuarios que hacen 40 peticiones al día y un factor de pico de 3, ¿cuántas peticiones por segundo hay en el pico?', '50 000 × 40 / 86 400 ≈ 23 promedio; × 3 ≈ 69 peticiones por segundo en el pico.'],
    ['¿Qué es una estampida de caché y cómo se evita?', 'Muchas peticiones que a la vez encuentran vencida una clave popular y recalculan contra la base de datos. Se evita dejando que una sola recalcule, renovando antes del vencimiento o variando el TTL al azar.'],
    ['¿Qué harías antes de particionar la base de datos?', 'Optimizar consultas e índices, usar un pool de conexiones, agregar caché, réplicas de lectura y colas para el trabajo diferible.']
  ],
  cites: ['Abbott, M. y Fisher, M. (2015). *The Art of Scalability* (2.ª ed.). Addison-Wesley.', 'Gunther, N. (2007). *Guerrilla Capacity Planning*. Springer.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O\'Reilly. Capítulo 1.', 'Xu, A. (2020). *System Design Interview: An Insider\'s Guide*. Independiente.'],
  project: { t: 'Prueba de carga y escalado horizontal',
    goal: 'Medir la capacidad real de una aplicación y escalarla con evidencia, no con suposiciones.',
    steps: ['Escribe una prueba de carga (con k6 o autocannon) que simule el uso en hora punta y registra p50, p95, p99 y errores.', 'Haz la aplicación sin estado y ejecútala con 1, 2 y 4 instancias detrás de un balanceador (nginx o el módulo cluster de Node).', 'Agrega una caché cache-aside con invalidación al escribir y mide la tasa de aciertos.', 'Provoca una estampida de caché y corrígela.', 'Grafica la capacidad según el número de instancias y explica por qué no crece de forma lineal.'],
    deliver: 'Los scripts de carga, los gráficos y un informe de capacidad con recomendaciones.' },
  hito: ['Haz PatioApp sin estado (sesiones y archivos fuera del proceso) y ejecútala con 3 instancias detrás de un balanceador con chequeo de salud.', 'Escribe el cálculo de capacidad de PatioApp, valídalo con una prueba de carga y agrega una caché con invalidación al escribir.']
});

X('m13.dist', {
  deep: `
## Una definición con humor
Leslie Lamport escribió en un correo de 1987:
:::cita Un sistema distribuido es aquel en el que la falla de una computadora que ni siquiera sabías que existía puede dejar inutilizable tu propia computadora. | Leslie Lamport (1987), traducción propia.
En un solo proceso, una función o responde o lanza un error. En un sistema distribuido existe un tercer resultado: **no sabes**. La petición pudo perderse, el servidor pudo procesarla y morir antes de responder, o la respuesta pudo perderse. Todo el diseño distribuido gira alrededor de esa incertidumbre.

## Las ocho falacias
Peter Deutsch y otros ingenieros de Sun Microsystems listaron en los años 90 las suposiciones falsas que hacen quienes empiezan: la red es confiable, la latencia es cero, el ancho de banda es infinito, la red es segura, la topología no cambia, hay un solo administrador, el costo de transporte es cero y la red es homogénea. Cada una ha causado caídas reales.

## Lo que es imposible
- **Los dos generales:** dos ejércitos deben atacar a la vez comunicándose por mensajeros que pueden ser capturados. Ningún número finito de mensajes garantiza el acuerdo. Lección: no existe una confirmación final segura sobre una red no confiable.
- **FLP (1985):** Fischer, Lynch y Paterson demostraron que en un sistema asíncrono donde aunque sea un proceso puede fallar, ningún algoritmo determinista garantiza llegar siempre a un consenso. Los algoritmos reales lo esquivan con tiempos límite y aleatoriedad.
- **Generales bizantinos (1982):** Lamport, Shostak y Pease analizaron el acuerdo cuando algunos participantes pueden mentir; se necesitan más de 3f participantes para tolerar f traidores. Es la base de los sistemas que toleran nodos maliciosos.

## Consenso en la práctica
Lamport publicó **Paxos** en 1998 (*The Part-Time Parliament*), famoso por correcto y por difícil de entender. Diego Ongaro y John Ousterhout diseñaron **Raft** en 2014 con la comprensibilidad como objetivo explícito: un líder elegido por mayoría replica un registro de operaciones a los seguidores, y una entrada se confirma cuando la tiene la mayoría. etcd (el corazón de Kubernetes) y Consul usan Raft. Con 5 nodos se toleran 2 caídas; con 3, solo 1.

## Garantías de entrega
| Garantía | Significa | Cómo se logra |
| Como máximo una vez | puede perderse, nunca se duplica | enviar sin reintentar |
| Al menos una vez | nunca se pierde, puede duplicarse | reintentar hasta recibir confirmación |
| Exactamente una vez (efectiva) | el efecto ocurre una sola vez | al menos una vez + consumidor **idempotente** |
"Exactamente una vez" en la red no existe; lo que existe es el **efecto** exactamente una vez, y se logra guardando qué mensajes ya se procesaron.
~~~js
const procesados = new Set(), saldo = { ABC123: 0 };
function alRecibir(msg) {                 // consumidor idempotente
  if (procesados.has(msg.id)) return 'duplicado ignorado';
  saldo[msg.placa] += msg.monto; procesados.add(msg.id);
  return 'aplicado';
}
const m = { id: 'pago-001', placa: 'ABC123', monto: 5000 };
console.log(alRecibir(m), alRecibir(m), saldo.ABC123);   // el reintento no cobra dos veces
~~~

## El patrón outbox
Problema: guardar un cambio en la base de datos **y** publicar un evento en la cola. Si haces lo primero y el proceso muere antes de lo segundo, el evento se pierde; al revés, publicas algo que nunca se guardó. Solución: en la **misma transacción** se guarda el cambio y una fila en una tabla "outbox"; un proceso aparte lee esa tabla y publica los eventos (al menos una vez), y los consumidores son idempotentes.

## Sagas
Hector Garcia-Molina y Kenneth Salem propusieron en 1987 las **sagas** para transacciones largas: una secuencia de pasos locales, cada uno con una **acción compensatoria** que lo deshace. Si el tercer paso falla, se ejecutan las compensaciones del segundo y del primero. Reemplazan a las transacciones distribuidas de dos fases, que bloquean recursos y fallan mal.

## Patrones de resiliencia
Michael Nygard catalogó en *Release It!* (2007; 2.ª ed., 2018) los patrones que evitan que una falla local se convierta en una caída total:
- **Tiempos límite** en toda llamada remota: sin ellos, un servicio lento retiene hilos y conexiones hasta agotar todo.
- **Cortacircuitos:** tras varias fallas seguidas, se dejan de hacer llamadas durante un tiempo y se responde de inmediato con un error o un valor por defecto; luego se prueba de nuevo.
- **Mamparos (*bulkheads*):** separar recursos (pools de conexiones distintos por dependencia) para que una dependencia lenta no agote los recursos de las demás.
- **Degradación elegante:** si falla la consulta de placas externa, seguir permitiendo el registro manual.
Martin Kleppmann dedica los capítulos 8 y 9 de *Designing Data-Intensive Applications* a estos problemas; son lectura obligatoria antes de construir cualquier sistema con más de un servidor.`,
  checks: [
    ['¿Cuál es el "tercer resultado" de una llamada remota y por qué complica el diseño?', 'No saber si la operación se hizo: la petición o la respuesta pudieron perderse. Obliga a usar tiempos límite, reintentos y operaciones idempotentes.'],
    ['¿Cuántos nodos necesita un clúster Raft para tolerar la caída de 2 nodos?', '5, porque se necesita una mayoría (3 de 5) funcionando.'],
    ['¿Cómo se consigue el efecto "exactamente una vez"?', 'Con entrega al menos una vez y consumidores idempotentes que recuerdan qué mensajes ya procesaron.'],
    ['¿Qué problema resuelve el patrón outbox?', 'Guardar un cambio y publicar su evento sin que uno pueda ocurrir sin el otro: ambos se escriben en la misma transacción local y otro proceso publica los eventos pendientes.'],
    ['¿Para qué sirve un cortacircuitos?', 'Para dejar de llamar temporalmente a una dependencia que está fallando, responder rápido con una alternativa y evitar que la falla se propague agotando recursos.']
  ],
  cites: ['Fischer, M., Lynch, N. y Paterson, M. (1985). Impossibility of Distributed Consensus with One Faulty Process. *Journal of the ACM*, 32(2).', 'Lamport, L., Shostak, R. y Pease, M. (1982). The Byzantine Generals Problem. *ACM Transactions on Programming Languages and Systems*, 4(3).', 'Ongaro, D. y Ousterhout, J. (2014). In Search of an Understandable Consensus Algorithm. *USENIX ATC 2014*.', 'Garcia-Molina, H. y Salem, K. (1987). Sagas. *ACM SIGMOD 1987*.', 'Nygard, M. (2018). *Release It!* (2.ª ed.). Pragmatic Bookshelf.', 'Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O\'Reilly. Capítulos 8 y 9.'],
  project: { t: 'Servicios que fallan con elegancia',
    goal: 'Construir dos servicios comunicados por red y hacer que el sistema siga funcionando cuando uno falla.',
    steps: ['Crea un servicio de entregas y uno de notificaciones comunicados por HTTP y por una cola (Redis, RabbitMQ o una tabla de base de datos).', 'Agrega tiempos límite, reintentos con espera exponencial y un cortacircuitos a la llamada entre ellos.', 'Implementa el patrón outbox y consumidores idempotentes; demuestra que un reintento no duplica efectos.', 'Implementa una saga de tres pasos (reservar unidad, cobrar, programar entrega) con compensaciones.', 'Inyecta fallas (matar un servicio, agregar latencia, perder mensajes) y documenta cómo responde el sistema.'],
    deliver: 'Los servicios, los scripts de inyección de fallas y un informe de cada experimento.' },
  hito: ['Separa las notificaciones de PatioApp en un servicio aparte comunicado por una cola, con patrón outbox y consumidores idempotentes.', 'Agrega tiempos límite, reintentos y un cortacircuitos a la llamada al servicio externo de placas, y una prueba que simule su caída.']
});
})();
