(function () {
var S = SDC.S;

S('m15', 'm15.k8s', { title: 'Orquestación con Kubernetes',
  ask: '¿Qué concepto de Kubernetes u orquestación se aplica?',
  lesson: `
> **La idea en simple.** Tener un contenedor es como tener un camión con su carga lista. Pero una empresa de transporte con cientos de camiones necesita un sistema que decida qué camión va por qué ruta, reemplace al que se avería, mande más camiones cuando hay más pedidos y lleve la cuenta de dónde está cada uno. Kubernetes es ese sistema para los contenedores: tú le dices **cómo quieres que esté** todo, y él trabaja sin descanso para que así sea.

## Por qué hace falta un orquestador
Con unos pocos contenedores en un servidor, basta con Docker Compose. Con decenas de servicios y cientos de contenedores repartidos en muchos servidores aparecen preguntas que nadie quiere resolver a mano:
- ¿En qué servidor se ejecuta cada contenedor, según la CPU y la memoria disponibles?
- ¿Qué pasa cuando un contenedor o un servidor completo falla?
- ¿Cómo se encuentran los servicios entre sí si sus direcciones cambian?
- ¿Cómo se despliega una versión nueva sin cortar el servicio, y cómo se vuelve atrás?
- ¿Cómo se agregan réplicas cuando sube la carga?
Un **orquestador** responde todas ellas automáticamente.

## De Borg a Kubernetes
Google ejecutaba desde mediados de los 2000 casi todo su software en contenedores administrados por un sistema interno llamado **Borg**, descrito públicamente en 2015 por Abhishek Verma y sus colegas. En 2014, Joe Beda, Brendan Burns y Craig McLuckie, ingenieros de Google, lanzaron **Kubernetes** (del griego "timonel", abreviado **K8s** porque hay ocho letras entre la K y la s), una reescritura de código abierto con las lecciones de Borg y de su sucesor Omega. En 2015 se donó a la recién creada **Cloud Native Computing Foundation** (CNCF), y en pocos años se volvió el estándar: todos los grandes proveedores de nube ofrecen Kubernetes gestionado (EKS, GKE, AKS).

## El modelo declarativo
La idea más importante de Kubernetes no es técnica, sino de diseño: el **modelo declarativo con reconciliación**. No se le dan órdenes ("arranca tres contenedores"); se le declara un **estado deseado** ("debe haber tres réplicas de la API versión 2.4") en archivos YAML que se guardan en Git. Unos componentes llamados **controladores** ejecutan sin parar un **bucle de reconciliación**: observan el estado real, lo comparan con el deseado y actúan para acercarlos. Si una réplica muere, el controlador ve que hay dos en vez de tres y crea otra. Esta idea viene de la teoría de control y hace al sistema **autorreparable**.
~~~js
// El bucle de reconciliación, en miniatura
function reconciliar(deseado, real) {
  const acciones = [];
  for (const [app, n] of Object.entries(deseado)) {
    const actual = real[app] || 0;
    if (actual < n) acciones.push('crear ' + (n - actual) + ' réplica(s) de ' + app);
    if (actual > n) acciones.push('eliminar ' + (actual - n) + ' réplica(s) de ' + app);
  }
  for (const app of Object.keys(real)) if (!(app in deseado)) acciones.push('eliminar todo ' + app);
  return acciones.length ? acciones : ['nada que hacer'];
}
console.log(reconciliar({ api: 3, notificaciones: 2 }, { api: 2, notificaciones: 2, viejo: 1 }));
~~~

## Arquitectura de un clúster
- **Plano de control:** el **servidor de API** (todo pasa por él), **etcd** (la base de datos clave-valor con consenso Raft que guarda todo el estado del clúster, que viste en Sistemas Distribuidos), el **planificador** (*scheduler*, decide en qué nodo va cada pod) y el **administrador de controladores**.
- **Nodos de trabajo:** cada uno con el **kubelet** (agente que hace que los contenedores asignados a ese nodo estén corriendo), un entorno de ejecución de contenedores (containerd) y **kube-proxy** (reglas de red).

## Los objetos principales
| Objeto | Para qué sirve |
| Pod | la unidad mínima: uno o más contenedores que comparten red y almacenamiento y se planifican juntos |
| Deployment | mantiene N réplicas de un pod y gestiona las actualizaciones progresivas y los retrocesos |
| Service | nombre y dirección estables para un grupo de pods que cambian; balancea entre ellos |
| Ingress / Gateway | expone servicios HTTP al exterior con reglas por dominio y ruta |
| ConfigMap y Secret | configuración y datos sensibles separados de la imagen |
| StatefulSet | pods con identidad y almacenamiento estables (bases de datos, colas) |
| DaemonSet | un pod en cada nodo (agentes de registros o monitoreo) |
| Job y CronJob | tareas que terminan, una vez o programadas (la facturación nocturna) |
| Namespace | separa recursos de equipos o entornos dentro del clúster |
| PersistentVolume | almacenamiento que sobrevive a los pods |
Los pods son **efímeros**: pueden morir y ser recreados en otro nodo con otra dirección IP en cualquier momento. Por eso nadie se conecta directamente a un pod, sino a un Service, y por eso las aplicaciones deben ser, en lo posible, **sin estado**.

## Salud, recursos y escalado
- **Sondas** (*probes*): la de **vida** (*liveness*) indica si el contenedor está bloqueado y hay que reiniciarlo; la de **preparación** (*readiness*) indica si está listo para recibir tráfico (por ejemplo, después de cargar la caché); la de **arranque** (*startup*) da tiempo a aplicaciones lentas para iniciar. Confundirlas es un error clásico: una sonda de vida que verifica la base de datos reinicia todos los pods cuando la base tiene un problema, y empeora todo.
- **Solicitudes y límites de recursos:** la **solicitud** (*request*) de CPU y memoria es lo que el planificador reserva; el **límite** es el máximo. Un contenedor que supera su límite de memoria es terminado (*OOMKilled*).
- **Escalado automático horizontal** (HPA): ajusta el número de réplicas según métricas como el uso de CPU o las peticiones por segundo. El **escalador del clúster** agrega o quita nodos cuando faltan o sobran recursos.
- **Presupuestos de interrupción** (*PodDisruptionBudget*): garantizan un mínimo de réplicas disponibles durante el mantenimiento de los nodos.

## Desplegar en Kubernetes
Un Deployment hace por defecto una **actualización progresiva** (*rolling update*): crea pods nuevos de a poco y elimina los viejos a medida que los nuevos pasan la sonda de preparación, de modo que el servicio nunca se corta; si los nuevos fallan, el despliegue se detiene y se puede revertir con un comando. Despliegues canario y azul-verde más elaborados se logran con herramientas como Argo Rollouts o con una malla de servicios.

La práctica de **GitOps**, nombrada por Alexis Richardson de Weaveworks en 2017, lleva el modelo declarativo hasta el final: el estado deseado de todos los entornos vive en un repositorio Git, y un agente dentro del clúster (Argo CD o Flux) reconcilia continuamente el clúster con lo que dice Git. Desplegar es hacer un *pull request*; revertir es revertir un commit; y Git guarda el registro de auditoría de quién cambió qué.

## ¿Lo necesitas?
Kubernetes es poderoso y complejo: tiene cientos de conceptos, y operar un clúster propio exige conocimientos de redes, seguridad, almacenamiento y actualizaciones. Para muchos equipos pequeños, opciones más simples son mejores: plataformas como servicio (Heroku, Render, Railway, Fly.io), contenedores sin servidor (Google Cloud Run, AWS App Runner, Azure Container Apps) o incluso un par de máquinas virtuales con Docker Compose. Una heurística razonable: considerar Kubernetes cuando haya muchos servicios, varios equipos y alguien que pueda dedicarse a la plataforma; y aun así, preferir un servicio gestionado a un clúster propio.

## Ejemplo resuelto: PatioApp en Kubernetes
Cuando PatioApp pasa a cuatro equipos y siete servicios, la empresa adopta un clúster gestionado:
1. **API:** Deployment con 3 réplicas mínimas, HPA hasta 12 por CPU al 60 %, sonda de preparación en «/listo» (verifica que cargó la caché de tarifas) y de vida en «/vivo» (solo verifica que el proceso responde, **no** la base de datos).
2. **Notificaciones:** Deployment con 2 réplicas que consumen de la cola; escalan según la longitud de la cola.
3. **Facturación nocturna:** CronJob a las 23:30 hora de Lima, con un arrendamiento para garantizar una sola ejecución.
4. **Configuración:** ConfigMaps por entorno; secretos desde el gestor de secretos del proveedor de nube, no en Git.
5. **Entrega:** GitOps con Argo CD; el pipeline actualiza la etiqueta de la imagen en el repositorio de configuración y Argo CD despliega con actualización progresiva.
6. **Namespaces** por equipo con cuotas de recursos, y un PodDisruptionBudget que mantiene al menos 2 réplicas de la API durante el mantenimiento de nodos.`,
  links: [['m15.containers', 'Kubernetes orquesta los contenedores que viste en la unidad anterior'], ['sd.consensus', 'etcd guarda el estado del clúster con el algoritmo Raft'], ['m13.micro', 'los microservicios suelen desplegarse en un orquestador']],
  read: 'Burns, Beda, Hightower y Evenson, *Kubernetes: Up and Running* (3.ª ed., 2022); Verma y otros, *Large-scale cluster management at Google with Borg* (2015); Burns y otros, *Borg, Omega, and Kubernetes* (2016); documentación oficial en kubernetes.io.',
  terms: [
    ['Orquestador', 'sistema que despliega, ubica, reinicia, escala y conecta contenedores en un conjunto de servidores', ['Kubernetes.', 'Responde qué contenedor va en qué servidor.', 'Reemplaza lo que falla.']],
    ['Estado deseado', 'descripción declarativa de cómo debe estar el sistema, que el orquestador hace cumplir', ['Tres réplicas de la API 2.4.', 'Se guarda en YAML y en Git.', 'No es una lista de órdenes.']],
    ['Bucle de reconciliación', 'ciclo de un controlador que compara el estado real con el deseado y actúa para acercarlos', ['Crea una réplica si falta.', 'Hace al sistema autorreparable.', 'Viene de la teoría de control.']],
    ['Pod', 'unidad mínima de Kubernetes: uno o más contenedores que comparten red y almacenamiento', ['Es efímero.', 'Cambia de IP al recrearse.', 'Se planifica en un nodo.']],
    ['Service', 'nombre y dirección estables que balancean el tráfico entre un grupo de pods', ['Los clientes se conectan a él.', 'Oculta que los pods cambian.', 'Tipo ClusterIP o LoadBalancer.']],
    ['Sonda de preparación', 'verificación que indica si un contenedor está listo para recibir tráfico', ['readiness.', 'Tras cargar la caché.', 'Distinta de la de vida.']],
    ['Escalado automático horizontal', 'ajuste automático del número de réplicas según métricas', ['HPA.', 'Por CPU o peticiones.', 'Entre un mínimo y un máximo.']],
    ['GitOps', 'práctica en que Git guarda el estado deseado y un agente reconcilia el clúster con él', ['Argo CD, Flux.', 'Desplegar es un pull request.', 'Richardson, 2017.']]
  ],
  q: [
    ['¿Cuál es la idea de diseño central de Kubernetes?', 'Declarar un estado deseado que controladores reconcilian continuamente con el real', ['Dar órdenes paso a paso a cada servidor', 'Reemplazar a Docker', 'Eliminar la red'], 'Modelo declarativo con reconciliación.', 2],
    ['¿Dónde guarda Kubernetes todo el estado del clúster?', 'En etcd', ['En cada pod', 'En el kubelet', 'En un archivo de texto en cada nodo'], 'Base clave-valor con consenso Raft.', 2],
    ['¿Por qué los clientes no se conectan directamente a un pod?', 'Porque los pods son efímeros y cambian de dirección; se usa un Service estable', ['Porque los pods no tienen red', 'Porque es más lento', 'Porque está prohibido'], 'El Service oculta los cambios.', 2],
    ['¿Qué objeto usarías para la facturación que corre todas las noches?', 'CronJob', ['Deployment', 'DaemonSet', 'Service'], 'Tareas programadas que terminan.', 2],
    ['Una sonda de vida verifica la base de datos. Si la base falla, ¿qué pasa?', 'Kubernetes reinicia todos los pods y empeora el problema', ['Nada', 'La base se repara sola', 'Los pods se vuelven más rápidos'], 'La sonda de vida solo debe verificar el propio proceso.', 4],
    ['¿Qué ocurre si un contenedor supera su límite de memoria?', 'Es terminado (OOMKilled)', ['Se le da más memoria automáticamente', 'Sigue funcionando sin cambios', 'Se convierte en otro pod'], 'El límite es el máximo.', 3],
    ['¿Qué ventaja da GitOps para revertir un despliegue?', 'Revertir es revertir un commit, y Git guarda la auditoría', ['No hace falta revertir nunca', 'Se borra el clúster', 'Se usa un comando secreto'], 'El agente reconcilia con Git.', 3],
    { tf: 'Todo equipo pequeño que usa contenedores debería operar su propio clúster de Kubernetes.', v: false, e: 'Para muchos equipos son mejores las plataformas gestionadas o los contenedores sin servidor.', l: 2 },
    { tf: 'Una actualización progresiva reemplaza los pods de a poco para no cortar el servicio.', v: true, e: 'Los nuevos deben pasar la sonda de preparación.', l: 1 },
    { c: 'Escribe «reconciliar(deseado, real)»: ambos son objetos {app: réplicas}; devuelve un objeto {app: diferencia} con deseado − real para cada app que aparezca en alguno, omitiendo las que tengan diferencia 0.', f: 'reconciliar', p: ['deseado', 'real'], t: [[[{ api: 3, n: 2 }, { api: 2, n: 2, viejo: 1 }], { api: 1, viejo: -1 }], [[{}, {}], {}]], sol: '  const out = {};\n  for (const k of new Set([...Object.keys(deseado), ...Object.keys(real)])) { const d = (deseado[k] || 0) - (real[k] || 0); if (d) out[k] = d; }\n  return out;', l: 3 },
    { c: 'Escribe «replicasHPA(actuales, usoActual, usoObjetivo, min, max)»: fórmula del HPA: ceil(actuales × usoActual / usoObjetivo), limitada entre min y max.', f: 'replicasHPA', p: ['actuales', 'usoActual', 'usoObjetivo', 'min', 'max'], t: [[[3, 90, 60, 3, 12], 5], [[3, 20, 60, 3, 12], 3], [[10, 100, 50, 3, 12], 12]], sol: '  return Math.min(max, Math.max(min, Math.ceil(actuales * usoActual / usoObjetivo)));', l: 2 },
    { c: 'Escribe «cabe(nodo, pod)»: nodo es {cpuLibre, memLibre} y pod {cpu, mem}; devuelve true si el pod cabe por sus solicitudes.', f: 'cabe', p: ['nodo', 'pod'], t: [[[{ cpuLibre: 2, memLibre: 4096 }, { cpu: 0.5, mem: 512 }], true], [[{ cpuLibre: 0.2, memLibre: 4096 }, { cpu: 0.5, mem: 512 }], false]], sol: '  return pod.cpu <= nodo.cpuLibre && pod.mem <= nodo.memLibre;', l: 1 }
  ],
  gen: function (g) {
    var ob = [['Mantener 3 réplicas de la API y actualizarlas sin cortar el servicio', 'Deployment'], ['Dar un nombre estable a un grupo de pods', 'Service'], ['Ejecutar un agente de registros en cada nodo', 'DaemonSet'], ['Ejecutar una base de datos con identidad y disco estables', 'StatefulSet'], ['Guardar la configuración no sensible', 'ConfigMap'], ['Ejecutar una migración una sola vez', 'Job'], ['Exponer rutas HTTP al exterior por dominio', 'Ingress']];
    ob.forEach(function (o) { g.mcq(2, '¿Qué objeto de Kubernetes usarías? ' + o[0], o[1], ['Deployment', 'Service', 'DaemonSet', 'StatefulSet', 'ConfigMap', 'Job', 'Ingress'].filter(function (x) { return x !== o[1]; }).slice(0, 3), 'Objetos principales de Kubernetes.'); });
    var sd = [['El contenedor se bloqueó y hay que reiniciarlo', 'Vida'], ['El contenedor todavía carga la caché y no debe recibir tráfico', 'Preparación'], ['Una aplicación Java tarda 2 minutos en iniciar', 'Arranque']];
    sd.forEach(function (s) { g.mcq(3, '¿Qué sonda corresponde? ' + s[0], s[1], ['Vida', 'Preparación', 'Arranque', 'Ninguna'].filter(function (x) { return x !== s[1]; }), 'liveness, readiness y startup.'); });
    g.times(8, function (R) { var a = R.int(2, 8), u = R.int(20, 100), o = R.pick([50, 60, 70]), mx = R.int(8, 20); g.input(3, 'Hay ' + a + ' réplicas con uso de CPU del ' + u + ' % y el objetivo es ' + o + ' %. Con mínimo 2 y máximo ' + mx + ', ¿cuántas réplicas pondrá el HPA?', Math.min(mx, Math.max(2, Math.ceil(a * u / o))), 'ceil(actuales × uso / objetivo), entre el mínimo y el máximo.'); });
  },
  checks: [
    ['¿Qué problemas resuelve un orquestador?', 'Ubicación de contenedores, reemplazo ante fallas, descubrimiento de servicios, despliegues sin corte y escalado.'],
    ['Explica el modelo declarativo con reconciliación.', 'Se declara el estado deseado y los controladores comparan continuamente el real con él y actúan para acercarlos, lo que hace al sistema autorreparable.'],
    ['Diferencia las sondas de vida y de preparación.', 'La de vida decide si reiniciar el contenedor; la de preparación, si puede recibir tráfico. La de vida no debe depender de servicios externos.'],
    ['¿Cuándo no conviene usar Kubernetes?', 'Cuando hay pocos servicios, un equipo pequeño y nadie para operar la plataforma; conviene una plataforma gestionada o contenedores sin servidor.']
  ],
  cites: ['Verma, A. et al. (2015). Large-scale cluster management at Google with Borg. *EuroSys 2015*.', 'Burns, B., Grant, B., Oppenheimer, D., Brewer, E. y Wilkes, J. (2016). Borg, Omega, and Kubernetes. *ACM Queue*, 14(1).', 'Burns, B., Beda, J., Hightower, K. y Evenson, L. (2022). *Kubernetes: Up and Running* (3.ª ed.). O’Reilly.', 'The Kubernetes Authors. *Kubernetes Documentation*. kubernetes.io/docs.', 'OpenGitOps (2021). *GitOps Principles v1.0.0*. opengitops.dev.'],
  project: { t: 'Desplegar una aplicación en Kubernetes',
    goal: 'Llevar una aplicación de varios servicios a un clúster local con buenas prácticas.',
    steps: ['Crea un clúster local con kind o minikube.', 'Escribe los Deployment, Service, ConfigMap y Secret de una aplicación con API y base de datos.', 'Configura sondas de vida y preparación, solicitudes y límites de recursos, y un HPA.', 'Haz una actualización progresiva, provoca una versión que falle la sonda y revierte.', 'Configura Argo CD para desplegar desde un repositorio Git.'],
    deliver: 'Los manifiestos en un repositorio, el registro de la actualización fallida y su retroceso, y la configuración de GitOps.' },
  hito: ['Escribe los manifiestos de Kubernetes de la API de PatioApp con sondas correctamente separadas, recursos y escalado automático.', 'Configura GitOps para PatioApp y convierte la facturación nocturna en un CronJob con arrendamiento.']
});
SDC.after('m15.k8s', 'm15.containers');

S('m15', 'm15.incident', { title: 'Gestión de incidentes, guardias y postmortems',
  ask: '¿Qué concepto de gestión de incidentes se aplica?',
  lesson: `
> **La idea en simple.** Los incendios van a ocurrir: lo que distingue a una buena brigada de bomberos no es que nunca haya fuego, sino que sabe exactamente qué hacer cuando suena la alarma, quién manda, cómo se comunican, y que después de cada incendio analiza qué pasó para prevenir el siguiente. En el software es igual: los incidentes son inevitables, y la gestión de incidentes es la disciplina de responder bien y aprender de ellos.

## Qué es un incidente
Un **incidente** es una interrupción o degradación no planificada de un servicio, o un riesgo inminente de que ocurra: la API no responde, los cobros fallan, los datos de una sede no se sincronizan, se detecta un acceso no autorizado. ITIL, el marco de buenas prácticas de gestión de servicios de TI (originado en el gobierno británico a fines de los ochenta, versión 4 de 2019), distingue la **gestión de incidentes** (restaurar el servicio lo antes posible) de la **gestión de problemas** (encontrar y eliminar las causas de fondo para que no se repitan). La distinción es importante: durante un incidente la prioridad es **restaurar**, no entender; entender viene después.

## Severidades
Clasificar la severidad decide quién se despierta, con qué urgencia y a quién se avisa. Un esquema típico:
| Severidad | Ejemplo en PatioApp | Respuesta |
| SEV1 crítica | ninguna sede puede registrar salidas; fuga de datos | todos los necesarios de inmediato, comunicación a gerencia y clientes |
| SEV2 alta | una sede no puede operar, o los cobros fallan intermitentemente | guardia de inmediato, comunicación interna |
| SEV3 media | los reportes de gerencia no se generan | en horario laboral |
| SEV4 baja | un error visual en una pantalla secundaria | backlog |
Ante la duda, se declara una severidad **mayor**: bajarla después cuesta poco; haber subestimado un incidente grave cuesta mucho.

## Guardias
Alguien debe estar disponible para responder fuera de horario: la **guardia** (*on-call*). Prácticas para que sea sostenible:
- **Rotación** entre varias personas (al menos 6 a 8 para que cada una esté de guardia pocas semanas al año), con una persona primaria y una secundaria.
- **Carga acotada:** el libro de SRE de Google recomienda no más de unos 2 incidentes por turno de 12 horas; si hay más, el problema es el sistema, no la persona.
- **Alertas de calidad:** solo síntomas urgentes y accionables, cada una con su manual de respuesta.
- **Compensación** y descanso después de una noche de incidentes.
- **"Quien lo construye, lo opera":** que los desarrolladores participen en las guardias de sus servicios crea un incentivo poderoso para construir software operable.

## Roles durante un incidente
El **Sistema de Comando de Incidentes** (ICS) fue creado por los bomberos de California en los años setenta, después de grandes incendios forestales en los que distintas brigadas no lograban coordinarse. Empresas como Google, PagerDuty y Atlassian lo adaptaron al software:
- **Comandante del incidente:** coordina, decide, delega y mantiene la visión general. **No** se pone a depurar: si el comandante está mirando registros, nadie está coordinando.
- **Líder de operaciones** (o equipo técnico): investiga y aplica las mitigaciones.
- **Responsable de comunicaciones:** informa a los interesados internos y externos en intervalos regulares.
- **Escriba:** registra la cronología: qué se observó, qué se decidió y qué se hizo, con la hora.
En incidentes pequeños una persona puede cumplir varios roles; lo importante es que esté claro quién tiene cada uno. Se trabaja en un **canal dedicado** al incidente, y el comandante puede transferir el mando explícitamente si el incidente se alarga.

## Mitigar primero
La prioridad es **detener el daño**, aunque todavía no se entienda la causa. Las mitigaciones más útiles son genéricas y rápidas:
- **Revertir** el último despliegue o cambio de configuración (muchísimos incidentes los causa un cambio reciente).
- **Desactivar** una funcionalidad con su bandera.
- **Desviar el tráfico** a otra zona o región.
- **Agregar capacidad** si es una sobrecarga.
- **Descartar carga** o bloquear un cliente que genera tráfico abusivo.
- **Reiniciar** un componente bloqueado (sabiendo que solo compra tiempo).
Una pregunta guía: "¿qué cambió?". El primer paso de casi todo diagnóstico es revisar los despliegues, cambios de configuración y cambios de tráfico de las últimas horas.

## Comunicación
Durante un incidente, el silencio es interpretado como desorden. Buenas prácticas:
- **Página de estado** pública o interna, actualizada al detectar, al mitigar y al resolver.
- **Actualizaciones a intervalos fijos** (por ejemplo, cada 30 minutos) aunque no haya novedades: "seguimos investigando; próxima actualización a las 10:30".
- Mensajes con **impacto, acciones y próxima actualización**, sin jerga ni especulación sobre la causa.
- En incidentes de seguridad con datos personales, las **obligaciones legales**: en el Perú, la normativa de protección de datos personales exige gestionar los incidentes de seguridad y, según su gravedad, comunicarlos a la autoridad y a los afectados en los plazos que establece el reglamento.

## Métricas de incidentes
- **MTTD** (tiempo medio de detección): desde que empieza el problema hasta que se detecta. Si los usuarios se enteran antes que el equipo, falta monitoreo.
- **MTTA** (tiempo medio de reconocimiento): desde la alerta hasta que alguien la toma.
- **MTTR** (tiempo medio de restauración): desde el inicio hasta que el servicio se restaura.
- **MTBF** (tiempo medio entre fallas).
La disponibilidad se relaciona con ellos: disponibilidad = MTBF / (MTBF + MTTR). Reducir el MTTR suele ser más barato y efectivo que aumentar el MTBF: es difícil evitar todas las fallas, pero es posible detectarlas y revertirlas en minutos.
~~~js
// Disponibilidad a partir del tiempo medio entre fallas y de restauración
const disponibilidad = (mtbfHoras, mttrHoras) => mtbfHoras / (mtbfHoras + mttrHoras);
for (const mttr of [6, 1, 0.25]) {
  console.log('falla cada 30 días, restauración en ' + mttr + ' h → ' + (100 * disponibilidad(720, mttr)).toFixed(3) + '%');
}
~~~

## Postmortems sin culpas
Después de cada incidente importante se escribe un **postmortem** (o revisión posterior al incidente). Su propósito es **aprender**, no castigar. John Allspaw, en Etsy, popularizó desde 2012 el enfoque **sin culpas** (*blameless*): asumir que las personas actuaron de buena fe con la información que tenían en ese momento, y preguntar **cómo** el sistema permitió que el error ocurriera y tuviera ese impacto, no **quién** se equivocó. Si las personas temen ser castigadas, ocultan información, y la organización deja de aprender. Sidney Dekker, especialista en seguridad aeronáutica, lo explica en *The Field Guide to Understanding "Human Error"*: el "error humano" no es la causa de un accidente, sino el síntoma de problemas más profundos del sistema.

Un postmortem típico contiene:
- **Resumen** e **impacto** (usuarios afectados, duración, dinero, datos).
- **Cronología** detallada con horas.
- **Factores contribuyentes:** técnicos, de proceso y organizacionales. Se habla de factores en plural, porque los incidentes complejos rara vez tienen una sola "causa raíz".
- **Qué funcionó bien** y **qué tuvimos suerte** (lo que podría haber sido peor).
- **Acciones** concretas, con responsable y fecha, registradas en el backlog y con seguimiento. Un postmortem sin acciones cumplidas es solo un documento.
Richard Cook, médico e investigador, resumió en *How Complex Systems Fail* (1998) varias ideas que todo ingeniero de operaciones debería conocer: los sistemas complejos funcionan siempre en modo parcialmente degradado; las fallas catastróficas requieren varias fallas combinadas; y la mirada retrospectiva distorsiona: después de un accidente, el camino al desastre parece obvio, pero no lo era para quienes estaban dentro.

## Ejemplo resuelto: el incidente del lunes en PatioApp
1. **08:05** las alertas por presupuesto de error de las salidas se disparan; la persona de guardia lo reconoce a las 08:07 y declara **SEV2** (tres sedes con fallas intermitentes en los cobros).
2. **08:10** se abre el canal del incidente; la guardia asume como comandante, llama a un desarrollador de facturación como líder técnico y a la supervisora de turno como responsable de comunicaciones, que publica en la página de estado.
3. **08:15** pregunta guía: ¿qué cambió? Hubo un despliegue a las 07:50 que actualizó la biblioteca de la pasarela de pago.
4. **08:18** mitigación: se revierte el despliegue; a las 08:25 los cobros se normalizan. MTTD 15 minutos, MTTR 35 minutos.
5. **Postmortem sin culpas** al día siguiente. Factores: la nueva versión de la biblioteca cambió el tiempo de espera por defecto de 30 a 5 segundos; las pruebas de integración usaban un simulador que respondía en milisegundos; el canario estaba configurado al 10 % solo por 5 minutos, insuficiente para ver fallas intermitentes; los cobros en efectivo siguieron funcionando gracias a la degradación funcional (lo que funcionó bien).
6. **Acciones:** fijar explícitamente los tiempos de espera en la configuración; agregar al simulador respuestas lentas de 8 a 12 segundos; canario de 30 minutos con comparación automática de la tasa de error de los cobros; revisar las notas de versión de las dependencias críticas antes de actualizarlas.`,
  links: [['m15.obs', 'las alertas y los SLO detectan los incidentes'], ['eco.exp', 'el análisis de causa raíz se estudia en Fundamentos de ingeniería'], ['m15.culture', 'los postmortems sin culpas son parte de la cultura generativa']],
  read: 'Beyer y otros, *Site Reliability Engineering* (2016), capítulos 12 a 15; Allspaw, *Blameless PostMortems and a Just Culture* (2012); Cook, *How Complex Systems Fail* (1998); Dekker, *The Field Guide to Understanding "Human Error"* (3.ª ed., 2014).',
  terms: [
    ['Incidente', 'interrupción o degradación no planificada de un servicio, o riesgo inminente de ella', ['Los cobros fallan.', 'Una sede no sincroniza.', 'Se gestiona para restaurar.']],
    ['Gestión de problemas', 'práctica de encontrar y eliminar las causas de fondo de los incidentes', ['ITIL.', 'Ocurre después del incidente.', 'Evita que se repita.']],
    ['Severidad del incidente', 'clasificación del impacto que decide la urgencia y quién responde', ['SEV1 a SEV4.', 'Ante la duda, la mayor.', 'Define la comunicación.']],
    ['Comandante del incidente', 'rol que coordina, decide y delega sin ponerse a depurar', ['Viene del ICS de los bomberos.', 'Mantiene la visión general.', 'Puede transferir el mando.']],
    ['Mitigación', 'acción que detiene el daño aunque no se conozca aún la causa', ['Revertir el despliegue.', 'Desactivar una bandera.', 'Desviar tráfico.']],
    ['MTTR', 'tiempo medio desde el inicio de una falla hasta la restauración del servicio', ['Se reduce con reversiones rápidas.', 'Disponibilidad = MTBF / (MTBF + MTTR).', 'Métrica clave de operación.']],
    ['Postmortem sin culpas', 'análisis posterior a un incidente centrado en cómo el sistema permitió el error, no en quién lo cometió', ['Allspaw, Etsy.', 'Factores contribuyentes.', 'Acciones con responsable.']],
    ['Guardia', 'turno en que una persona debe responder a incidentes fuera de horario', ['On-call.', 'Rotación de 6 a 8 personas.', 'No más de unos 2 incidentes por turno.']]
  ],
  q: [
    ['Durante un incidente, ¿cuál es la prioridad?', 'Restaurar el servicio, aunque todavía no se entienda la causa', ['Encontrar al culpable', 'Escribir el postmortem', 'Reescribir el módulo'], 'Entender viene después.', 1],
    ['¿Qué pregunta conviene hacer primero al diagnosticar un incidente?', '¿Qué cambió recientemente?', ['¿Quién está de vacaciones?', '¿Qué lenguaje usamos?', '¿Cuánto cuesta el servidor?'], 'Muchos incidentes los causa un cambio reciente.', 2],
    ['¿Por qué el comandante del incidente no debe ponerse a depurar?', 'Porque entonces nadie coordina ni mantiene la visión general', ['Porque no sabe programar', 'Porque está prohibido', 'Porque es más lento'], 'Rol tomado del ICS.', 3],
    ['Si no se está seguro de la severidad, ¿qué conviene declarar?', 'La mayor de las posibles', ['La menor', 'Ninguna', 'La que diga el cliente'], 'Bajarla después cuesta poco.', 2],
    ['Un sistema falla una vez cada 720 horas y tarda 6 horas en restaurarse. ¿Cuál es su disponibilidad aproximada?', '99,17 %', ['99,99 %', '90 %', '99,9 %'], '720 / 726.', 3],
    ['¿Por qué los postmortems son sin culpas?', 'Porque si las personas temen castigos ocultan información y la organización deja de aprender', ['Porque nadie comete errores', 'Por cortesía', 'Porque lo exige la ley'], 'Allspaw y Dekker.', 3],
    ['Según Richard Cook, ¿qué suele requerir una falla catastrófica en un sistema complejo?', 'Varias fallas combinadas', ['Una única causa raíz', 'Un solo error humano', 'Un ataque externo'], 'How Complex Systems Fail, 1998.', 4],
    { tf: 'Reducir el tiempo de restauración suele ser más efectivo que intentar evitar todas las fallas.', v: true, e: 'Detectar y revertir en minutos es más alcanzable.', l: 2 },
    { tf: 'Si no hay novedades durante un incidente, es mejor no comunicar nada hasta resolverlo.', v: false, e: 'Se actualiza a intervalos fijos aunque no haya novedades.', l: 2 },
    { o: 'Ordena las fases de la respuesta a un incidente.', s: ['Detectar y reconocer la alerta', 'Declarar la severidad y asignar roles', 'Mitigar para detener el daño', 'Resolver y verificar el servicio', 'Escribir el postmortem y dar seguimiento a las acciones'], e: 'Restaurar primero, aprender después.', l: 2 },
    { c: 'Escribe «disponibilidad(mtbf, mttr)»: porcentaje redondeado a 2 decimales.', f: 'disponibilidad', p: ['mtbf', 'mttr'], t: [[[720, 6], 99.17], [[720, 0.25], 99.97], [[100, 0], 100]], sol: '  return Math.round(10000 * mtbf / (mtbf + mttr)) / 100;', l: 2 },
    { c: 'Escribe «mttr(incidentes)»: cada incidente es {inicio, restaurado} en minutos; devuelve el promedio de restaurado − inicio, redondeado al entero (0 si no hay incidentes).', f: 'mttr', p: ['incidentes'], t: [[[[{ inicio: 0, restaurado: 35 }, { inicio: 100, restaurado: 125 }]], 30], [[[]], 0]], sol: '  if (!incidentes.length) return 0;\n  return Math.round(incidentes.reduce((a, i) => a + i.restaurado - i.inicio, 0) / incidentes.length);', l: 2 },
    { c: 'Escribe «severidad(sedesAfectadas, totalSedes, fugaDatos)»: "SEV1" si hay fuga de datos o están afectadas todas las sedes; "SEV2" si hay al menos una sede afectada; "SEV3" en otro caso.', f: 'severidad', p: ['sedesAfectadas', 'totalSedes', 'fugaDatos'], t: [[[0, 6, true], 'SEV1'], [[6, 6, false], 'SEV1'], [[2, 6, false], 'SEV2'], [[0, 6, false], 'SEV3']], sol: '  if (fugaDatos || sedesAfectadas === totalSedes) return "SEV1";\n  if (sedesAfectadas > 0) return "SEV2";\n  return "SEV3";', l: 2 }
  ],
  gen: function (g) {
    var ro = [['Coordina, decide y delega', 'Comandante del incidente'], ['Investiga y aplica las mitigaciones', 'Líder de operaciones'], ['Actualiza la página de estado cada 30 minutos', 'Responsable de comunicaciones'], ['Registra la cronología con horas', 'Escriba']];
    ro.forEach(function (r) { g.mcq(2, '¿Qué rol del incidente hace esto? ' + r[0], r[1], ['Comandante del incidente', 'Líder de operaciones', 'Responsable de comunicaciones', 'Escriba'].filter(function (x) { return x !== r[1]; }), 'Roles adaptados del ICS.'); });
    var mi = [['El incidente empezó justo después de un despliegue', 'Revertir el despliegue'], ['Una funcionalidad nueva genera errores y tiene bandera', 'Desactivar la bandera'], ['Una zona de la nube tiene problemas de red', 'Desviar el tráfico a otra zona'], ['La carga se triplicó por una campaña', 'Agregar capacidad'], ['Un cliente envía miles de peticiones abusivas', 'Bloquear al cliente o limitar su tasa']];
    mi.forEach(function (m) { g.mcq(3, '¿Qué mitigación conviene? ' + m[0], m[1], ['Revertir el despliegue', 'Desactivar la bandera', 'Desviar el tráfico a otra zona', 'Agregar capacidad', 'Bloquear al cliente o limitar su tasa'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Mitigar primero, entender después.'); });
    g.times(6, function (R) { var b = R.pick([168, 360, 720, 1440]), r = R.pick([0.25, 0.5, 1, 2, 6]); g.input(3, 'Un servicio falla en promedio cada ' + b + ' horas y tarda ' + r + ' horas en restaurarse. ¿Cuál es su disponibilidad en porcentaje? (2 decimales)', (100 * b / (b + r)).toFixed(2), 'MTBF / (MTBF + MTTR).'); });
  },
  checks: [
    ['Diferencia gestión de incidentes y gestión de problemas.', 'La de incidentes restaura el servicio lo antes posible; la de problemas busca y elimina las causas de fondo para que no se repita.'],
    ['Describe los roles de un incidente y por qué existen.', 'Comandante, líder de operaciones, comunicaciones y escriba; separan coordinar, arreglar, informar y registrar para no perder el control.'],
    ['¿Qué mitigaciones genéricas intentarías primero y por qué?', 'Revertir el último cambio, desactivar banderas, desviar tráfico o agregar capacidad, porque detienen el daño sin necesidad de entender la causa.'],
    ['¿Qué es un postmortem sin culpas y qué debe contener?', 'Un análisis centrado en cómo el sistema permitió el incidente; contiene resumen, impacto, cronología, factores contribuyentes, lo que funcionó y acciones con responsable.']
  ],
  cites: ['Beyer, B., Jones, C., Petoff, J. y Murphy, N. (2016). *Site Reliability Engineering*. O’Reilly.', 'Allspaw, J. (2012). Blameless PostMortems and a Just Culture. *Code as Craft* (Etsy).', 'Cook, R. (1998). *How Complex Systems Fail*. Cognitive Technologies Laboratory, University of Chicago.', 'Dekker, S. (2014). *The Field Guide to Understanding “Human Error”* (3.ª ed.). CRC Press.', 'AXELOS (2019). *ITIL Foundation: ITIL 4 Edition*. TSO.'],
  project: { t: 'Simulacro de incidente',
    goal: 'Practicar la respuesta a un incidente y aprender de él.',
    steps: ['Define las severidades, los roles y la plantilla de comunicación para un sistema propio.', 'Escribe dos manuales de respuesta para alertas importantes.', 'Organiza un simulacro (un "día de juego"): alguien provoca una falla sin avisar y el equipo responde con los roles.', 'Mide MTTD y MTTR del simulacro.', 'Escribe el postmortem sin culpas con al menos tres acciones y dales seguimiento.'],
    deliver: 'Las definiciones, los manuales, la cronología del simulacro, las métricas y el postmortem.' },
  hito: ['Define las severidades, los roles y los manuales de respuesta de PatioApp, con la página de estado para las sedes.', 'Haz un simulacro de incidente en PatioApp (falla de la pasarela de pago) y escribe su postmortem sin culpas con acciones.']
});
SDC.after('m15.incident', 'm15.obs');
})();
