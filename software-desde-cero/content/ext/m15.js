(function () {
var X = SDC.X, XM = SDC.XM;
XM('m15', {
  uni: 'CMU 17-313 *Foundations of Software Engineering* (DevOps y despliegue); Berkeley CS169 *Software Engineering* (integración y despliegue continuos); MIT *The Missing Semester* (automatización); el libro *Site Reliability Engineering* de Google como referencia profesional. En Perú: Gestión de Servicios de TI, Computación en la Nube y DevOps (UNMSM, UNI, PUCP, UPC, UTEC).',
  capstone: { t: 'PatioApp en producción, observable y automatizada',
    goal: 'Operar PatioApp como un servicio real: cada cambio se prueba y publica solo, la infraestructura es código y los problemas se detectan antes que los usuarios.',
    steps: ['Pipeline completo de CI/CD con artefacto único, entorno de prueba por pull request y despliegue progresivo.', 'Contenedores con imágenes pequeñas y seguras, y entorno local idéntico con Docker Compose.', 'Infraestructura descrita como código, con permisos mínimos y estimación de costos.', 'Registros estructurados, métricas, trazas, SLO con presupuesto de error y alertas por tasa de consumo.', 'Un simulacro de incidente con su postmortem sin culpables.'],
    deliver: 'El repositorio con el pipeline, los Dockerfiles, el código de infraestructura, el panel de observabilidad y el postmortem.' }
});

X('m15.cicd', {
  deep: `
## Integrar seguido para sufrir menos
Grady Booch usó la expresión "integración continua" en 1991, y la Programación Extrema la convirtió en práctica diaria. Martin Fowler la describió en un artículo de 2000 (actualizado en 2006) con prácticas concretas: un solo repositorio, construcción automatizada y autoverificable, cada persona integra a la línea principal al menos una vez al día, cada integración se construye en una máquina de integración, y si la construcción se rompe, **arreglarla es la prioridad del equipo**. La idea de fondo: el dolor de integrar crece con el tiempo que pasa sin hacerlo.

## La tubería de despliegue
Jez Humble y David Farley publicaron *Continuous Delivery* (2010), que convirtió estas ideas en un sistema. Sus principios más citados:
- **Si duele, hazlo más seguido** y más temprano: lo que se practica a diario deja de ser riesgoso.
- **Construye una sola vez** y despliega el mismo artefacto en todos los entornos; recompilar para producción introduce diferencias.
- **Todo en control de versiones:** código, pruebas, configuración, scripts de base de datos e infraestructura.
- **Despliega igual en todos los entornos**, con el mismo script.
- **Terminado significa publicado**, no "programado".
:::flow Commit | Construir y pruebas rápidas (minutos) | Pruebas de aceptación | Entorno de prueba | Producción
Cada etapa da más confianza y es más lenta; si una falla, el artefacto no avanza.

## Desplegar no es liberar
**Desplegar** es poner código nuevo en producción; **liberar** es que los usuarios lo vean. Separarlos (con feature flags o *dark launches*) permite desplegar varias veces al día sin riesgo y liberar cuando el negocio decida. Las estrategias para reducir el riesgo de un despliegue:
| Estrategia | Cómo | Volver atrás |
| Blue-green | dos entornos idénticos; se cambia el tráfico de uno al otro | regresar el tráfico al anterior: segundos |
| Canary | la versión nueva recibe un pequeño porcentaje del tráfico y se observa | sacar el canario |
| Rolling | se reemplazan las instancias de a poco | más lento; conviven dos versiones |
| Feature flag | el código está desplegado pero apagado | apagar el flag |
El nombre "canario" viene de los mineros que bajaban con canarios: si el pájaro enfermaba, había gas y salían antes de que les afectara.

## Configuración fuera del código
Adam Wiggins, de Heroku, publicó en 2011 *The Twelve-Factor App*, doce reglas para aplicaciones que se despliegan bien en la nube. La más citada: **la configuración vive en el entorno**, no en el código. Las URL de la base de datos, las claves y los parámetros que cambian entre entornos se leen de variables de entorno, así el mismo artefacto corre en prueba y en producción.

## Un pipeline mínimo con GitHub Actions
~~~txt
name: ci
on: [push, pull_request]
jobs:
  probar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci            # instala exactamente lo del package-lock
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build     # el artefacto que luego se despliega
~~~
Plataformas como Vercel agregan automáticamente un **entorno de vista previa** por cada pull request: cualquier persona del equipo puede probar el cambio antes de fusionarlo.

## La cadena de suministro
El pipeline es un objetivo de ataque: si alguien modifica una dependencia o el proceso de construcción, compromete a todos tus usuarios. Prácticas mínimas: fijar versiones con archivos de bloqueo, revisar las dependencias con herramientas de auditoría, usar permisos mínimos para los tokens del pipeline, firmar artefactos y generar un inventario de componentes (SBOM). Google propuso en 2021 el marco **SLSA** con niveles de garantía para la integridad de lo que se construye.

## Volver atrás o arreglar hacia adelante
Si un despliegue falla, hay dos caminos: **revertir** a la versión anterior (rápido y seguro si la base de datos es compatible) o **arreglar hacia adelante** con un cambio nuevo (válido si el pipeline es muy rápido). Por eso las migraciones de base de datos deben ser compatibles con la versión anterior del código (el patrón expandir y contraer que viste en bases de datos): así siempre se puede volver atrás.`,
  checks: [
    ['¿Por qué se recomienda construir el artefacto una sola vez?', 'Para que lo que se probó sea exactamente lo que llega a producción; recompilar por entorno puede introducir diferencias no probadas.'],
    ['¿Qué diferencia hay entre desplegar y liberar?', 'Desplegar es poner el código en producción; liberar es hacerlo visible a los usuarios. Separarlos con feature flags permite desplegar seguido y liberar cuando convenga.'],
    ['¿Qué ventaja tiene un despliegue canario frente a uno blue-green?', 'Expone la versión nueva solo a una fracción del tráfico y permite observar su comportamiento real antes de dársela a todos, limitando el impacto de un error.'],
    ['Según Twelve-Factor, ¿dónde va la URL de la base de datos y por qué?', 'En una variable de entorno, para que el mismo artefacto funcione en cualquier entorno y los secretos no queden en el código.'],
    ['¿Qué condición debe cumplir una migración de base de datos para poder revertir el código sin problemas?', 'Ser compatible con la versión anterior del código, por ejemplo agregando columnas en lugar de renombrarlas o borrarlas de golpe (expandir y contraer).']
  ],
  cites: ['Humble, J. y Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.', 'Fowler, M. (2006). Continuous Integration. martinfowler.com.', 'Wiggins, A. (2011). *The Twelve-Factor App*. 12factor.net.', 'Forsgren, N., Humble, J. y Kim, G. (2018). *Accelerate*. IT Revolution.', 'SLSA (2023). *Supply-chain Levels for Software Artifacts, v1.0*. slsa.dev.'],
  project: { t: 'Un pipeline completo de entrega continua',
    goal: 'Automatizar todo el camino del commit a producción y practicar volver atrás.',
    steps: ['Configura GitHub Actions con lint, pruebas con cobertura, construcción y análisis de dependencias.', 'Publica el artefacto y despliégalo automáticamente en un entorno de prueba por cada pull request.', 'Al fusionar en main, despliega a producción el mismo artefacto.', 'Agrega un feature flag para una funcionalidad nueva y libérala a un grupo de prueba.', 'Haz un simulacro: publica una versión defectuosa a propósito, detéctala y revierte cronometrando el tiempo.'],
    deliver: 'El archivo del pipeline, capturas de los entornos de vista previa y el informe del simulacro con el tiempo de recuperación.' },
  hito: ['Configura el pipeline de CI/CD de PatioApp con GitHub Actions: lint, pruebas y construcción en cada pull request, entorno de vista previa y despliegue automático a producción al fusionar.', 'Simula un despliegue defectuoso de PatioApp, reviértelo en menos de 5 minutos y documenta el procedimiento.']
});

X('m15.containers', {
  deep: `
## Una idea con 40 años
El aislamiento de procesos tiene una larga historia: «chroot» apareció en Unix en 1979, FreeBSD agregó *jails* en 2000, Solaris sus *zones* en 2004 y Linux los contenedores LXC en 2008, gracias a los **namespaces** y los **cgroups** que viste en sistemas operativos. Lo que cambió con **Docker**, presentado por Solomon Hykes en 2013, fue la experiencia: un formato de imagen portable, un archivo simple para describirla y un registro para compartirla. En 2015 nació la Open Container Initiative (OCI) para estandarizar los formatos, y hoy herramientas como Podman o containerd usan las mismas imágenes.

## Imágenes por capas
Cada instrucción de un Dockerfile crea una **capa** de solo lectura; un contenedor es una imagen más una capa delgada de escritura. Las capas se reutilizan entre imágenes y se guardan en caché al construir. Por eso el orden importa: lo que cambia poco (instalar dependencias) va antes de lo que cambia siempre (copiar tu código).

## Un Dockerfile profesional para Node
~~~txt
# Etapa 1: construir con todas las herramientas
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# Etapa 2: imagen final mínima
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node                                  # nunca como root
EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost:3000/salud || exit 1
CMD ["node", "dist/servidor.js"]
~~~
Buenas prácticas reunidas aquí: **construcción en varias etapas** (la imagen final no lleva compiladores ni dependencias de desarrollo), imagen base pequeña, versiones fijas, usuario sin privilegios, un archivo «.dockerignore» para no copiar «node_modules» ni «.env», un proceso por contenedor y chequeo de salud.

## Contenedores inmutables y efímeros
Un contenedor no se "arregla" entrando con una terminal: se reemplaza por uno construido desde una imagen nueva. Lo que debe sobrevivir (la base de datos, los archivos subidos) va en **volúmenes** o en servicios externos. Esta **infraestructura inmutable** elimina el "en este servidor sí funciona porque alguien cambió algo a mano hace dos años".

## Docker Compose para el entorno local
Compose describe varios servicios y sus conexiones en un archivo, y con un comando levanta la API, la base de datos y la caché exactamente como el resto del equipo. Cualquiera puede clonar el repositorio y tener el entorno funcionando en minutos.

## Kubernetes: de Borg al mundo
Google operó durante más de una década su sistema interno **Borg** para ejecutar millones de contenedores; Verma y sus coautores lo describieron en 2015. Kubernetes, liberado por Google en 2014 y donado a la Cloud Native Computing Foundation en 2015, lleva esas ideas al público. Su concepto central es **declarativo**: describes el estado deseado ("3 réplicas de la API, versión 1.4") y unos **bucles de reconciliación** trabajan continuamente para que la realidad coincida, reiniciando lo que falla y moviendo lo que se cae.
| Recurso | Para qué |
| Pod | uno o más contenedores que se despliegan juntos |
| Deployment | mantiene N réplicas y hace actualizaciones graduales |
| Service | una dirección estable para un grupo de pods |
| Ingress | expone servicios HTTP hacia afuera |
| ConfigMap y Secret | configuración y secretos inyectados |
| Sondas liveness y readiness | ¿está vivo? (si no, reiniciar) ¿está listo? (si no, no enviarle tráfico) |

## ¿Lo necesitas?
Kubernetes resuelve problemas de organizaciones con muchos servicios y equipos, a cambio de mucha complejidad operativa. Para una aplicación como PatioApp, una plataforma administrada (Vercel, Render, Railway, Cloud Run, Fly.io) o un solo servidor con Docker Compose suelen ser suficientes. Elegir la herramienta más simple que cumple los atributos de calidad es una decisión de arquitectura, y merece un ADR.`,
  checks: [
    ['¿Por qué conviene copiar package.json e instalar dependencias antes de copiar el resto del código en un Dockerfile?', 'Porque esa capa cambia poco y queda en caché; si copias todo primero, cualquier cambio en tu código invalida la caché y reinstala todas las dependencias.'],
    ['¿Qué ventajas da una construcción en varias etapas?', 'La imagen final es más pequeña y segura porque no incluye compiladores, herramientas ni dependencias de desarrollo.'],
    ['¿Qué significa que Kubernetes sea declarativo?', 'Que describes el estado deseado y el sistema trabaja continuamente para alcanzarlo y mantenerlo, en lugar de ejecutar una lista de pasos.'],
    ['¿Cuál es la diferencia entre una sonda liveness y una readiness?', 'Liveness indica si el contenedor está vivo (si falla, se reinicia); readiness indica si puede recibir tráfico (si falla, se le deja de enviar peticiones sin reiniciarlo).'],
    ['¿Por qué un contenedor no debería ejecutarse como root?', 'Porque si un atacante compromete la aplicación, tendría privilegios máximos dentro del contenedor y más posibilidades de escapar o dañar el sistema.']
  ],
  cites: ['Verma, A. et al. (2015). Large-scale cluster management at Google with Borg. *EuroSys 2015*.', 'Burns, B., Beda, J., Hightower, K. y Evenson, L. (2022). *Kubernetes: Up and Running* (3.ª ed.). O\'Reilly.', 'Kane, S. y Matthias, K. (2023). *Docker: Up & Running* (3.ª ed.). O\'Reilly.', 'Open Container Initiative. *OCI Image and Runtime Specifications*. opencontainers.org.'],
  project: { t: 'Contenerizar una aplicación de tres servicios',
    goal: 'Empaquetar una aplicación real en contenedores seguros y reproducibles.',
    steps: ['Escribe un Dockerfile multietapa para la API con usuario no root, imagen base pequeña y chequeo de salud.', 'Crea un docker-compose con la API, PostgreSQL (con volumen persistente) y Redis.', 'Mide el tamaño de la imagen antes y después de optimizar y el tiempo de reconstrucción tras un cambio en el código.', 'Escanea la imagen en busca de vulnerabilidades (con Trivy o Docker Scout) y corrige las críticas.', 'Opcional: despliega lo mismo en un clúster local (kind o minikube) con un Deployment de 3 réplicas y sondas.'],
    deliver: 'Los Dockerfiles, el docker-compose, las mediciones y el informe del escaneo.' },
  hito: ['Escribe el Dockerfile multietapa de PatioApp (usuario no root, imagen pequeña) y un docker-compose con la API, PostgreSQL y la caché.', 'Agrega chequeos de salud de vida y de disponibilidad, y haz que toda la configuración se lea de variables de entorno.']
});

X('m15.cloud', {
  deep: `
## Qué es la nube, según la definición oficial
El NIST publicó en 2011 la definición más citada (Peter Mell y Timothy Grance, SP 800-145). La computación en la nube tiene **cinco características esenciales**: autoservicio bajo demanda, acceso amplio por red, recursos compartidos entre clientes, **elasticidad rápida** (crecer y decrecer en minutos) y **servicio medido** (pagas lo que usas). Define tres modelos de servicio (IaaS, PaaS y SaaS) y cuatro de despliegue (pública, privada, comunitaria e híbrida). Amazon lanzó S3 y EC2 en 2006, y un grupo de Berkeley explicó en 2009 (*Above the Clouds*, Armbrust y otros) por qué ese modelo cambiaba la economía de la computación: convertir inversión en hardware en un gasto variable.

## Responsabilidad compartida
El proveedor es responsable de la seguridad **de** la nube (centros de datos, hardware, red física, hipervisor); tú, de la seguridad **en** la nube (tus datos, permisos, configuración, parches de lo que administras). Mientras más alto subes (de IaaS a SaaS), más asume el proveedor. Muchas filtraciones famosas no fueron fallas del proveedor sino almacenamiento configurado como público por error.

## Mascotas y ganado
Una metáfora popularizada a inicios de los 2010: los servidores tradicionales eran **mascotas**, con nombre propio y cuidados a mano; en la nube son **ganado**, idénticos, numerados y reemplazables. Si un servidor falla, no se repara: se reemplaza automáticamente. Eso solo es posible si se crean con código.

## Infraestructura como código
Herramientas como Terraform (HashiCorp, 2014), Pulumi o CloudFormation describen la infraestructura en archivos versionados:
~~~txt
resource "aws_s3_bucket" "fotos" {
  bucket = "patioapp-fotos-prod"
}
resource "aws_s3_bucket_public_access_block" "fotos" {
  bucket                  = aws_s3_bucket.fotos.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
}
~~~
El flujo es **planificar** (la herramienta compara lo declarado con lo que existe y muestra qué creará, cambiará o borrará) y **aplicar**. Ventajas: entornos idénticos y reproducibles, revisión de cambios por pull request, historial de quién cambió qué y recuperación ante desastres recreando todo. La práctica **GitOps** (propuesta por Weaveworks en 2017) lleva la idea al extremo: el repositorio es la única fuente de verdad y un agente sincroniza continuamente la infraestructura con él.

## Identidad y permisos
En la nube, la **gestión de identidades y accesos** (IAM) es la frontera de seguridad más importante. Reglas: cada servicio con su propia identidad, permisos mínimos para lo que necesita, credenciales temporales en lugar de claves permanentes, autenticación multifactor para las personas y nunca usar la cuenta raíz para el trabajo diario.

## Diseñar bien: el marco de buena arquitectura
AWS publicó en 2015 su *Well-Architected Framework*, hoy con seis pilares que sirven para cualquier proveedor: excelencia operativa, seguridad, fiabilidad, eficiencia de rendimiento, optimización de costos y sostenibilidad. Para la fiabilidad, la nube ofrece **regiones** (áreas geográficas) con varias **zonas de disponibilidad** (centros de datos independientes): desplegar en varias zonas protege contra la caída de un centro de datos.

## Costos: la arquitectura también es financiera
La disciplina **FinOps** reúne finanzas, ingeniería y negocio para gestionar el gasto en la nube. Palancas principales:
- Ajustar el tamaño de los recursos a la carga real.
- Apagar lo que no se usa (entornos de prueba fuera del horario laboral).
- Comprometer uso a largo plazo a cambio de descuentos y usar capacidad interrumpible para trabajos que lo toleren.
- Vigilar la **transferencia de datos de salida**, que suele ser el costo sorpresa.
- Preferir servicios administrados cuando el costo de operar uno propio (personas, guardias, parches) es mayor.
~~~js
const horasMes = 730, precioHora = 0.05;                 // instancia pequeña (valor de ejemplo)
const siempre = horasMes * precioHora;
const soloHorarioLaboral = 22 * 10 * precioHora;          // 22 días, 10 horas
console.log('entorno de prueba 24/7: $' + siempre.toFixed(2) + ' · solo en horario: $' + soloHorarioLaboral.toFixed(2));
~~~

## Dependencia del proveedor
Usar servicios propios de un proveedor acelera el desarrollo pero dificulta mudarse. No hay respuesta universal: se decide por componente, aislando lo específico del proveedor detrás de adaptadores (la arquitectura hexagonal ayuda) en las partes donde una migración futura es probable.`,
  checks: [
    ['¿Cuáles son las cinco características esenciales de la nube según el NIST?', 'Autoservicio bajo demanda, acceso amplio por red, recursos compartidos, elasticidad rápida y servicio medido.'],
    ['En el modelo de responsabilidad compartida, ¿de quién es la culpa si un bucket de almacenamiento queda público?', 'Del cliente: la configuración de permisos de sus recursos es su responsabilidad, no del proveedor.'],
    ['¿Qué ventaja tiene el paso de "planificar" en la infraestructura como código?', 'Muestra antes de ejecutar qué recursos se crearán, cambiarán o destruirán, lo que permite revisar el impacto y evitar sorpresas.'],
    ['¿Por qué se recomiendan credenciales temporales en lugar de claves permanentes?', 'Porque si se filtran, caducan pronto; una clave permanente filtrada puede usarse indefinidamente hasta que alguien la revoque.'],
    ['Nombra tres palancas para reducir el costo de la nube.', 'Ajustar el tamaño de los recursos, apagar entornos que no se usan y aprovechar compromisos de uso o capacidad interrumpible; también vigilar la transferencia de salida.']
  ],
  cites: ['Mell, P. y Grance, T. (2011). *The NIST Definition of Cloud Computing* (SP 800-145). NIST.', 'Armbrust, M. et al. (2009). *Above the Clouds: A Berkeley View of Cloud Computing*. UC Berkeley, EECS-2009-28.', 'Morris, K. (2020). *Infrastructure as Code* (2.ª ed.). O\'Reilly.', 'Amazon Web Services (2024). *AWS Well-Architected Framework*.', 'Storment, J. R. y Fuller, M. (2023). *Cloud FinOps* (2.ª ed.). O\'Reilly.'],
  project: { t: 'Infraestructura como código desde cero',
    goal: 'Crear, cambiar y destruir un entorno completo usando solo código versionado.',
    steps: ['Describe con Terraform (o Pulumi) un entorno de prueba: almacenamiento privado para archivos, base de datos administrada y un servicio para la API (si no quieres usar un proveedor de pago, usa el proveedor de Docker en local).', 'Ejecuta plan y apply, cambia un recurso por pull request y revisa el plan antes de aplicarlo.', 'Define identidades con permisos mínimos para la API y para el pipeline.', 'Estima el costo mensual del entorno y propone dos ahorros.', 'Destruye todo y recréalo desde cero midiendo el tiempo.'],
    deliver: 'El código de infraestructura, los planes revisados, la estimación de costos y el tiempo de recreación.' },
  hito: ['Describe la infraestructura de PatioApp como código y crea un entorno de prueba desde cero con un solo comando.', 'Escribe la estimación de costos mensuales de PatioApp en la nube y la política de permisos mínimos de cada componente.']
});

X('m15.obs', {
  deep: `
## De la teoría de control al software
El término **observabilidad** viene de la teoría de control: Rudolf Kálmán lo definió en 1960 como la capacidad de deducir el estado interno de un sistema a partir de sus salidas. Charity Majors y otros lo trajeron al software alrededor de 2016: un sistema es observable si puedes responder **preguntas nuevas** sobre su comportamiento sin desplegar código nuevo. El monitoreo tradicional responde preguntas conocidas ("¿está alta la CPU?"); la observabilidad permite investigar lo desconocido ("¿por qué solo los usuarios de Arequipa con Android ven lentitud desde ayer?").

## Las señales y su origen
- **Registros:** eventos con contexto. Estructurados en JSON, con un **identificador de correlación** que acompaña a una petición por todos los servicios.
- **Métricas:** números agregados en el tiempo (peticiones por segundo, percentiles de latencia). Baratas de guardar y buenas para alertas.
- **Trazas:** el recorrido de una petición a través de servicios, con la duración de cada tramo. Google describió su sistema interno **Dapper** en 2010 (Sigelman y otros); de ahí descienden Zipkin, Jaeger y el estándar abierto **OpenTelemetry** (2019), hoy la forma recomendada de instrumentar una aplicación.

## Métodos para elegir qué medir
- **Las cuatro señales de oro** (libro *Site Reliability Engineering* de Google, 2016): latencia, tráfico, errores y saturación.
- **RED** (Tom Wilkie), para servicios: tasa de peticiones (*Rate*), errores (*Errors*) y duración (*Duration*).
- **USE** (Brendan Gregg), para recursos: uso (*Utilization*), saturación (*Saturation*) y errores (*Errors*) de CPU, memoria, disco y red.

## SRE: operaciones hechas por ingenieros de software
Ben Treynor Sloss creó en Google el equipo de **ingeniería de fiabilidad del sitio** (SRE) en 2003 y lo describió como lo que ocurre cuando le pides a un ingeniero de software que diseñe un equipo de operaciones. Sus ideas centrales:
- **SLI:** un indicador medido desde el punto de vista del usuario (proporción de peticiones exitosas y rápidas).
- **SLO:** el objetivo para ese indicador (99.9% en 30 días).
- **Presupuesto de error:** 100% menos el SLO. Con 99.9% en 30 días hay 43.2 minutos de falla permitidos. Mientras quede presupuesto, el equipo puede desplegar y experimentar; si se agota, se prioriza la fiabilidad.
- **Trabajo penoso (*toil*):** trabajo manual, repetitivo y automatizable que crece con el servicio; los SRE intentan mantenerlo por debajo del 50% de su tiempo.
~~~js
const slo = 0.999, minutosMes = 30 * 24 * 60;
const presupuesto = (1 - slo) * minutosMes;
console.log('presupuesto de error:', presupuesto.toFixed(1), 'minutos al mes');
// Alerta por tasa de consumo: si en 1 hora se gasta el 2% del presupuesto mensual, se agotaría en ~2 días
const gastadoEnUnaHora = 0.02 * presupuesto;
console.log('tasa de consumo:', (gastadoEnUnaHora / (presupuesto / (30 * 24))).toFixed(1) + 'x el ritmo sostenible');
~~~
El libro de trabajo de SRE (*The Site Reliability Workbook*, 2018) recomienda **alertar por tasa de consumo del presupuesto**, no por cada pico: alertar solo cuando el ritmo de errores, si continúa, agotará el presupuesto pronto. Y alertar sobre **síntomas** que sufre el usuario, no sobre causas (una CPU al 90% sin usuarios afectados no debe despertar a nadie).

## Incidentes y postmortems
Durante un incidente, roles claros evitan el caos: un **comandante del incidente** coordina (el modelo viene de los bomberos), alguien se comunica con los afectados y otros investigan. La prioridad es **mitigar** (restaurar el servicio, por ejemplo revirtiendo), no encontrar la causa raíz en caliente.
Después se escribe un **postmortem sin culpables**: qué pasó, cronología, impacto, causas que contribuyeron y acciones con responsable y fecha. John Allspaw, entonces en Etsy, explicó en 2012 por qué sin culpables: si las personas temen castigos, ocultan información, y sin información no se puede mejorar el sistema. La pregunta no es "¿quién se equivocó?" sino "¿qué hizo posible que esa equivocación causara daño?".`,
  checks: [
    ['¿Qué diferencia hay entre monitoreo y observabilidad?', 'El monitoreo responde preguntas conocidas con paneles y alertas predefinidas; la observabilidad permite investigar preguntas nuevas sobre el comportamiento del sistema sin desplegar código nuevo.'],
    ['Con un SLO de 99.95% mensual, ¿cuántos minutos de presupuesto de error hay en 30 días?', '0.0005 × 43 200 = 21.6 minutos.'],
    ['¿Por qué se recomienda alertar por síntomas y no por causas?', 'Porque lo que importa es el impacto en el usuario; alertar por causas (CPU alta) genera ruido cuando no hay daño y fatiga a quien está de guardia.'],
    ['¿Qué mide el método RED y para qué tipo de componente sirve?', 'Tasa de peticiones, errores y duración; sirve para servicios que atienden peticiones.'],
    ['¿Por qué los postmortems deben ser sin culpables?', 'Porque si se castiga, la gente oculta información; sin información honesta no se pueden encontrar ni corregir las condiciones del sistema que permitieron el error.']
  ],
  cites: ['Beyer, B., Jones, C., Petoff, J. y Murphy, N. (eds.) (2016). *Site Reliability Engineering: How Google Runs Production Systems*. O\'Reilly.', 'Beyer, B. et al. (eds.) (2018). *The Site Reliability Workbook*. O\'Reilly.', 'Majors, C., Fong-Jones, L. y Miranda, G. (2022). *Observability Engineering*. O\'Reilly.', 'Sigelman, B. et al. (2010). *Dapper, a Large-Scale Distributed Systems Tracing Infrastructure*. Google Technical Report.', 'Allspaw, J. (2012). Blameless PostMortems and a Just Culture. *Code as Craft*, Etsy.'],
  project: { t: 'Observabilidad de un servicio de punta a punta',
    goal: 'Instrumentar un servicio para poder responder preguntas sobre su comportamiento y operar con objetivos de fiabilidad.',
    steps: ['Agrega registros estructurados en JSON con identificador de correlación y niveles.', 'Expón métricas RED y percentiles de latencia (con OpenTelemetry o prom-client) y arma un panel.', 'Agrega trazas que muestren el tiempo en la API, la base de datos y el servicio externo.', 'Define dos SLO con su presupuesto de error y una alerta por tasa de consumo.', 'Provoca un incidente (latencia en la base de datos), resuélvelo siguiendo roles y escribe el postmortem sin culpables.'],
    deliver: 'El servicio instrumentado, capturas del panel y de una traza, la definición de los SLO y el postmortem.' },
  hito: ['Agrega a PatioApp registros estructurados en JSON con identificador de correlación, métricas RED y un panel de operación.', 'Define un SLO de disponibilidad y de latencia con su presupuesto de error, crea una alerta por tasa de consumo y escribe un postmortem sin culpables de un incidente simulado.']
});
})();
