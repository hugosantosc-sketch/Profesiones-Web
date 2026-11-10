(function () {
var M = SDC.M, S = SDC.S;
M('m15', { title: 'DevOps y operaciones', desc: 'Un programa no vale nada hasta que corre en producción y alguien lo usa. Aquí aprendes a llevarlo allá de forma segura, repetible y observable.',
  thread: 'Cada cambio de PatioApp corre pruebas y se publica solo. Vive en un contenedor, la infraestructura está en código y una alerta te avisa antes de que llame el cliente.',
  books: '*The DevOps Handbook* (Kim et al.), *Continuous Delivery* (Humble y Farley), *Site Reliability Engineering* (Google), *The Phoenix Project* (Kim, Behr y Spafford), *Docker Deep Dive* (Poulton).',
  uni: 'Servicios Cloud y Herramientas de Desarrollo Profesional (UTP), Cloud Computing (UTEC), Software Engineering Operations de SWEBOK v4.' });

S('m15', 'm15.cicd', { title: 'Integración y entrega continua',
  ask: '¿Qué práctica de CI/CD corresponde?',
  lesson: `
> **La idea en simple.** En vez de armar el auto a mano una vez al año y rezar, tienes una línea de ensamblaje: cada pieza pasa por revisión automática. Si algo falla, la línea se detiene antes de llegar al cliente.

## El pipeline
:::flow Commit | Compilar | Pruebas unitarias | Análisis | Integración | Staging | Producción

- **Integración continua (CI):** cada cambio se integra y se prueba de forma automática, varias veces al día.
- **Entrega continua:** todo cambio queda listo para publicar con un botón.
- **Despliegue continuo:** se publica solo si pasa todo.

~~~txt
# Ejemplo con GitHub Actions
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
~~~

## Estrategias de despliegue
| Estrategia | Cómo | Ventaja |
| Blue-green | dos ambientes; se cambia de golpe | reversión instantánea |
| Canary | primero a 5% de usuarios | limita el daño |
| Rolling | se reemplaza de a poco | sin caída |
| Feature flags | se despliega oculto | separa desplegar de lanzar |

**Desplegar** es poner código en producción. **Lanzar** es que los usuarios lo vean.

## Principios
- Un build roto se arregla de inmediato: es prioridad del equipo.
- El mismo artefacto pasa por todos los ambientes.
- Automatiza lo repetitivo: lo manual se equivoca.
- Pipeline rápido: menos de 10 minutos para la primera señal.

## Gestión de configuración
Separa el código de la configuración (variables de entorno). Bloquea las versiones de dependencias («package-lock.json»). "En mi máquina funciona" desaparece.

## Puntos que no debes omitir
- Las migraciones de base de datos deben ser compatibles con la versión anterior.
- Ten una reversión probada.
- Vercel hace mucho de esto solo: cada push genera un despliegue, y cada rama, una vista previa.

! Error común: desplegar viernes en la tarde porque el proceso da miedo. Si da miedo, hazlo más pequeño y frecuente.`,
  links: [['m7.team', 'cada pull request dispara el pipeline'], ['m14.types', 'la pirámide de pruebas corre aquí'], ['m14.metrics', 'las métricas DORA miden este proceso'], ['m4.graphs', 'las etapas forman un grafo de dependencias'], ['m15.containers', 'el artefacto suele ser una imagen de contenedor']],
  read: 'Humble y Farley, *Continuous Delivery*; Kim et al., *The DevOps Handbook*.',
  terms: [
    ['Integración continua', 'integrar y probar cada cambio automáticamente con frecuencia', ['Cada push corre las pruebas.', 'Un conflicto se detecta el mismo día.', 'GitHub Actions marca en rojo un PR.']],
    ['Entrega continua', 'mantener el software siempre listo para publicarse', ['Cualquier commit de main puede salir con un clic.', 'Una persona decide cuándo se publica.', 'Todo lo previo a producción está automatizado.']],
    ['Despliegue continuo', 'publicar automáticamente todo cambio que pasa el pipeline', ['Un commit aprobado llega a producción sin intervención.', 'Se publica decenas de veces por día.', 'Exige mucha confianza en las pruebas.']],
    ['Blue-green', 'tener dos ambientes idénticos y cambiar el tráfico entre ellos', ['Si la versión nueva falla, se vuelve en segundos.', 'Se prueba en el ambiente inactivo.', 'Cuesta mantener dos ambientes.']],
    ['Canary', 'publicar primero a un porcentaje pequeño de usuarios', ['5% ve la versión nueva y se miran las métricas.', 'Se revierte si sube la tasa de error.', 'Se amplía gradualmente.']],
    ['Rolling update', 'reemplazar instancias de manera gradual', ['Se actualizan 2 de 10 servidores a la vez.', 'Kubernetes lo hace por defecto.', 'Conviven dos versiones por un rato.']],
    ['Artefacto', 'resultado empaquetado e inmutable de una compilación', ['La misma imagen Docker pasa de staging a producción.', 'Un .jar versionado.', 'No se recompila en cada ambiente.']]
  ],
  q: [
    { o: 'Ordena un pipeline típico.', s: ['Commit', 'Compilar', 'Pruebas unitarias', 'Pruebas de integración', 'Staging', 'Producción'], e: 'Lo rápido primero, para fallar pronto.', l: 2 },
    ['¿Qué distingue a entrega y despliegue continuo?', 'En entrega, una persona decide publicar; en despliegue, sale solo', ['Son iguales', 'En entrega no hay pruebas', 'En despliegue no hay servidores'], 'Ambos automatizan todo lo previo.', 3],
    ['El pipeline está en rojo en main. ¿Qué haces?', 'Se arregla o revierte de inmediato antes de seguir', ['Se sigue trabajando', 'Se apagan las pruebas', 'Se espera al viernes'], 'Un main roto bloquea a todos.', 3],
    ['Una función riesgosa debe llegar a producción ya, pero se lanzará en marzo. ¿Qué usas?', 'Una feature flag', ['Una rama de 3 meses', 'Un correo', 'Comentar el código'], 'Separa desplegar de lanzar.', 4],
    ['¿Por qué se usa el mismo artefacto en todos los ambientes?', 'Lo que se probó es exactamente lo que llega a producción', ['Porque es más bonito', 'Porque Git lo exige', 'Para gastar más disco'], 'Recompilar puede introducir diferencias.', 4],
    { c: 'Simula un pipeline: «pipeline(pasos)» recibe [{n, ok}] y devuelve el primer nombre que falla o "desplegado".', f: 'pipeline', p: ['pasos'], t: [[[[{ n: 'a', ok: true }, { n: 'b', ok: false }, { n: 'c', ok: false }]], 'b'], [[[{ n: 'a', ok: true }]], 'desplegado']], sol: "  const f = pasos.find(p => !p.ok);\n  return f ? f.n : 'desplegado';", l: 2 },
    { c: 'Implementa una decisión canaria: «revertir(baseErr, canaryErr, tol)» dice si la tasa de error del canario supera la base por más de tol.', f: 'revertir', p: ['baseErr', 'canaryErr', 'tol'], t: [[[1, 5, 2], true], [[1, 2, 2], false]], sol: '  return canaryErr - baseErr > tol;', l: 2 },
    { c: 'Reparte canario: «enCanario(idUsuario, porc)» es determinista: true si idUsuario % 100 < porc.', f: 'enCanario', p: ['idUsuario', 'porc'], t: [[[4, 5], true], [[5, 5], false], [[105, 10], true]], sol: '  return idUsuario % 100 < porc;', l: 3 },
    { c: 'Evalúa flags: «activa(flag, usuario)» con flag {on, porc, lista}. Si on es false, false. Si el usuario está en lista, true. Si no, usuario.id % 100 < porc.', f: 'activa', p: ['flag', 'usuario'], t: [[[{ on: false, porc: 100, lista: [] }, { id: 1 }], false], [[{ on: true, porc: 0, lista: [7] }, { id: 7 }], true], [[{ on: true, porc: 50, lista: [] }, { id: 60 }], false]], sol: '  if (!flag.on) return false;\n  if (flag.lista.includes(usuario.id)) return true;\n  return usuario.id % 100 < flag.porc;', l: 3 },
    { c: 'Ordena los trabajos: «ordenJobs(j)» recibe {job: [dependencias]} y devuelve un orden válido con desempate alfabético.', f: 'ordenJobs', p: ['j'], t: [[[{ deploy: ['test'], test: ['build'], build: [] }], ['build', 'test', 'deploy']], [[{ a: [], b: [] }], ['a', 'b']]], sol: '  const hecho = new Set(), r = [], ks = Object.keys(j).sort();\n  while (r.length < ks.length) {\n    const n = ks.find(k => !hecho.has(k) && j[k].every(d => hecho.has(d)));\n    if (!n) return null;\n    hecho.add(n);\n    r.push(n);\n  }\n  return r;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Quieres revertir en segundos cambiando el tráfico a la versión anterior.', 'Blue-green'], ['Quieres probar la versión nueva con 2% de usuarios.', 'Canary'], ['Quieres actualizar 50 servidores sin caída, en tandas.', 'Rolling'], ['Quieres activar una función para un solo cliente.', 'Feature flag'], ['Solo un cliente importante probará el nuevo módulo.', 'Feature flag'], ['Dispones de dos ambientes completos.', 'Blue-green'], ['Quieres comparar métricas de error en un grupo pequeño.', 'Canary']];
    c.forEach(function (x) { g.mcq(2, '¿Qué estrategia usas?\n' + x[0], x[1], ['Blue-green', 'Canary', 'Rolling', 'Feature flag'].filter(function (y) { return y !== x[1]; }), 'Encaja ' + x[1] + '.'); });
    g.times(6, function (R) { var t = R.pick([5, 10, 15]), d = R.pick([5, 10, 20]); g.input(2, 'El pipeline tarda ' + t + ' min y el equipo hace ' + d + ' commits al día. ¿Cuántos minutos de máquina usa al día?', t * d, t + ' × ' + d + '.'); });
  } });

S('m15', 'm15.containers', { title: 'Contenedores',
  ask: '¿Qué concepto de contenedores se describe?',
  lesson: `
> **La idea en simple.** Antes de los contenedores de barco, cada carga era distinta y difícil de mover. Un contenedor estándar se mueve igual en un barco, tren o camión. Docker hace lo mismo con tu aplicación: empaqueta todo lo que necesita para que corra igual en cualquier sitio.

## Máquina virtual y contenedor
| | Máquina virtual | Contenedor |
| Incluye | sistema operativo completo | solo la app y sus dependencias |
| Peso | GB | MB |
| Arranque | minutos | segundos |
| Aislamiento | muy fuerte | comparte el kernel |

## Imagen y contenedor
Una **imagen** es la receta congelada. Un **contenedor** es un plato servido a partir de esa receta; puedes servir muchos.
~~~txt
FROM node:22-alpine           # imagen base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev         # capa con dependencias
COPY . .                      # capa con tu código
USER node                     # no ejecutar como root
EXPOSE 3000
CMD ["node", "server.js"]
~~~
~~~txt
docker build -t patioapp:1.0 .
docker run -p 3000:3000 patioapp:1.0
docker ps
docker logs <id>
~~~

## Capas y caché
Cada línea crea una capa reutilizable. Por eso se copia primero «package.json»: si solo cambia el código, no se reinstalan las dependencias.

## Docker Compose
Levanta varios servicios a la vez (app y base de datos) para desarrollar.

## Kubernetes
Orquesta contenedores en muchos servidores. Tú declaras "quiero 5 réplicas" y él lo mantiene: reemplaza caídas y reparte.
- **Pod:** unidad mínima.
- **Deployment:** cuántas réplicas y qué versión.
- **Service:** nombre estable que reparte tráfico.

## Puntos que no debes omitir
- Los contenedores son efímeros: los datos van en **volúmenes**.
- Imágenes pequeñas: menos riesgo y menos tiempo.
- No metas claves en la imagen.
- Kubernetes es complejo: no lo uses si no lo necesitas.

! Error común: usar la etiqueta «latest» en producción. No sabes qué versión corre ni cómo volver atrás.`,
  links: [['m8.os', 'un contenedor es un proceso aislado'], ['m7.cli', 'se maneja desde la terminal'], ['m15.cloud', 'la nube ejecuta estos contenedores'], ['m13.scale', 'orquestar facilita escalar en horizontal']],
  read: 'Poulton, *Docker Deep Dive*; Burns et al., *Kubernetes: Up and Running*.',
  terms: [
    ['Imagen', 'plantilla inmutable con todo lo necesario para ejecutar una aplicación', ['«node:22-alpine» es una de ellas.', 'Se construye a partir de un Dockerfile.', 'Se publica en un registro.']],
    ['Contenedor', 'instancia en ejecución de una imagen', ['Arrancas tres de la misma imagen.', 'Comparte el kernel del anfitrión.', 'Cuando se borra, se pierde lo que tenía dentro.']],
    ['Dockerfile', 'archivo de instrucciones para construir una imagen', ['Contiene FROM, COPY y CMD.', 'Vive en el repositorio junto al código.', 'Su orden afecta la caché.']],
    ['Volumen', 'almacenamiento persistente fuera del contenedor', ['Los datos de PostgreSQL sobreviven al reinicio.', 'Se monta una carpeta dentro.', 'Sin él, los archivos desaparecen con el contenedor.']],
    ['Docker Compose', 'herramienta para definir y levantar varios contenedores', ['«docker compose up» inicia la app y la base de datos.', 'Se describe en un archivo YAML.', 'Es ideal para desarrollo local.']],
    ['Kubernetes', 'orquestador que ejecuta contenedores en muchas máquinas', ['Declaras 5 réplicas y las mantiene.', 'Reemplaza un pod caído.', 'Se abrevia como K8s.']],
    ['Pod', 'unidad mínima de ejecución en Kubernetes', ['Agrupa uno o más contenedores.', 'Comparte red entre sus contenedores.', 'Se crea y destruye con frecuencia.']]
  ],
  q: [
    { o: 'Ordena para aprovechar mejor la caché del Dockerfile.', s: ['FROM imagen base', 'COPY package.json', 'RUN npm ci', 'COPY del código', 'CMD de arranque'], e: 'Lo que cambia menos va primero.', l: 3 },
    ['¿Qué diferencia una imagen de un contenedor?', 'La imagen es la plantilla y el contenedor, su instancia en ejecución', ['Son lo mismo', 'El contenedor se ejecuta en la imagen', 'La imagen es solo una foto'], 'Como una clase y un objeto.', 2],
    ['Reinicias un contenedor de base de datos y perdiste todo. ¿Qué faltó?', 'Un volumen', ['Más RAM', 'Un Dockerfile más largo', 'Un balanceador'], 'El sistema de archivos del contenedor es efímero.', 3],
    ['¿Por qué un contenedor arranca mucho más rápido que una máquina virtual?', 'Porque no arranca un sistema operativo completo; usa el del anfitrión', ['Porque no ejecuta programas', 'Porque es de mejor calidad', 'Porque corre en la nube'], 'Solo es un proceso aislado.', 3],
    ['¿Por qué no ejecutar un contenedor como root?', 'Porque si lo vulneran, el atacante tiene más poder', ['Porque es más lento', 'Porque Docker no lo permite', 'Porque ocupa más'], 'Principio de mínimo privilegio.', 4],
    ['Una imagen pesa 2 GB y solo necesita Node. ¿Qué haces?', 'Usar una base mínima y una construcción en varias etapas', ['Dejarla así', 'Agregar más capas', 'Comprimir el código a mano'], 'Menos tamaño, menos superficie de ataque.', 4],
    { c: 'Simula la caché de capas: «capasReusadas(ant, nue)» recibe dos listas de instrucciones y cuenta cuántas iniciales coinciden: tras el primer cambio se reconstruye todo.', f: 'capasReusadas', p: ['ant', 'nue'], t: [[[['a', 'b', 'c'], ['a', 'x', 'c']], 1], [[['a'], ['a']], 1], [[[], ['a']], 0]], sol: '  let i = 0;\n  while (i < ant.length && i < nue.length && ant[i] === nue[i]) i++;\n  return i;', l: 3 },
    { c: 'Simula un Deployment: «acciones(deseadas, actuales)» devuelve {crear, borrar} para alcanzar las réplicas deseadas.', f: 'acciones', p: ['deseadas', 'actuales'], t: [[[5, 3], { crear: 2, borrar: 0 }], [[1, 3], { crear: 0, borrar: 2 }], [[2, 2], { crear: 0, borrar: 0 }]], sol: '  return { crear: Math.max(0, deseadas - actuales), borrar: Math.max(0, actuales - deseadas) };', l: 2 },
    { c: 'Revisa una imagen: «problemas(d)» recibe líneas de un Dockerfile y devuelve lista con "latest" si algún FROM usa :latest o no tiene etiqueta, y "root" si no hay línea USER.', f: 'problemas', p: ['d'], t: [[[['FROM node:latest']], ['latest', 'root']], [[['FROM node:22', 'USER node']], []], [[['FROM node', 'USER a']], ['latest']]], sol: "  const r = [], f = d.filter(l => l.startsWith('FROM '));\n  if (f.some(l => !l.includes(':') || l.includes(':latest'))) r.push('latest');\n  if (!d.some(l => l.startsWith('USER '))) r.push('root');\n  return r;", l: 4 }
  ],
  gen: function (g) {
    var c = [['Iniciar un contenedor desde una imagen.', 'docker run'], ['Construir una imagen.', 'docker build'], ['Ver los contenedores activos.', 'docker ps'], ['Ver el registro de un contenedor.', 'docker logs'], ['Subir una imagen a un registro.', 'docker push'], ['Bajar una imagen.', 'docker pull'], ['Ejecutar un comando dentro de un contenedor.', 'docker exec'], ['Detener un contenedor.', 'docker stop']];
    var o = c.map(function (x) { return x[1]; });
    c.forEach(function (x) { g.mcq(1, '¿Qué comando usas?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Es ' + x[1] + '.'); });
    g.times(6, function (R) { var d = R.int(2, 10), a = R.int(1, 8); g.input(2, 'Deseas ' + d + ' réplicas y hay ' + a + ' activas. ¿Cuántas debe crear o borrar Kubernetes en valor absoluto?', Math.abs(d - a), '|' + d + ' − ' + a + '|.'); });
  } });

S('m15', 'm15.cloud', { title: 'Nube e infraestructura como código',
  ask: '¿Qué modelo o servicio de nube es este?',
  lesson: `
> **La idea en simple.** Antes, tener electricidad era tener tu propio generador. Hoy la pagas por uso. La nube hace lo mismo con los servidores: no compras máquinas; las alquilas por minutos.

## Modelos de servicio
Se entiende como la pizza: hecha en casa, para hornear, a domicilio o en restaurante.
| Modelo | Tú administras | Ejemplos |
| Local | todo | tu servidor propio |
| IaaS | SO, app y datos | AWS EC2, Google Compute Engine |
| PaaS | app y datos | Vercel, Render, Railway, Heroku |
| SaaS | solo tus datos | Gmail, Google Sheets |
| FaaS | funciones | AWS Lambda, Vercel Functions |

## Bloques básicos
- **Cómputo:** máquinas virtuales, contenedores, funciones.
- **Almacenamiento:** de objetos (S3), de bloques y de archivos.
- **Bases de datos administradas.**
- **Red:** VPC, balanceadores, CDN, DNS.
- **Identidad:** IAM; quién puede hacer qué.

## Regiones y zonas
Una **región** es un área geográfica; una **zona** es un centro de datos separado dentro de ella. Desplegar en varias zonas protege contra un incendio. Elegir una región cerca reduce la latencia.

## Infraestructura como código
En vez de hacer clics, describes los recursos en archivos versionados.
~~~txt
resource "aws_instance" "web" {
  ami           = "ami-123"
  instance_type = "t3.small"
}
~~~
Terraform compara lo declarado con lo existente, y aplica la diferencia. Beneficio: reproducible, revisable e idempotente. **Declarativo:** dices qué quieres, no cómo llegar.

## Costos
~~~js
const horasMes = 730, porHora = 0.05;
console.log("Prendido todo el mes: $", (horasMes * porHora).toFixed(2));
console.log("Solo horario laboral: $", (160 * porHora).toFixed(2));
~~~
Apaga lo que no usas, y configura alertas de presupuesto.

## Puntos que no debes omitir
- **Responsabilidad compartida:** el proveedor protege la nube; tú proteges lo que pones en ella.
- **Bloqueo con el proveedor:** ten claro qué tanto dependes de él.
- Escalado automático según la carga.
- Mínimo privilegio en todo permiso.

! Error común: dejar claves en un repositorio público. Hay bots buscándolas todo el día, y la factura llega en horas.`,
  links: [['m15.containers', 'la nube ejecuta contenedores'], ['m13.styles', 'serverless es un modelo de la nube'], ['m13.quality', 'las zonas dan disponibilidad'], ['m16.owasp', 'los permisos mal puestos son una falla típica']],
  read: 'Morris, *Infrastructure as Code*; Wittig, *Amazon Web Services in Action*.',
  terms: [
    ['IaaS', 'alquiler de infraestructura básica en que administras el sistema operativo', ['Rentas una máquina virtual e instalas todo.', 'AWS EC2.', 'Tú aplicas los parches del sistema.']],
    ['PaaS', 'plataforma donde solo subes tu aplicación', ['Haces push y Vercel la publica.', 'No administras servidores.', 'Se elige por productividad.']],
    ['SaaS', 'software completo usado como servicio', ['Gmail.', 'Google Sheets.', 'Solo pagas y lo usas desde el navegador.']],
    ['FaaS', 'ejecución de funciones individuales bajo demanda', ['AWS Lambda.', 'Solo se paga durante la ejecución.', 'Una función se activa con un evento.']],
    ['Región', 'área geográfica con centros de datos de un proveedor', ['São Paulo es la más cercana a Lima de muchos proveedores.', 'Elegirla afecta la latencia.', 'Las leyes pueden restringir dónde guardas datos.']],
    ['Infraestructura como código', 'definir la infraestructura en archivos versionados', ['Terraform crea todo un ambiente.', 'Se revisa en un pull request.', 'Se reproduce el ambiente con un comando.']],
    ['IAM', 'sistema de identidades y permisos de la nube', ['Un servicio solo puede leer un bucket específico.', 'Se dan roles en lugar de claves.', 'Aplica el mínimo privilegio.']]
  ],
  q: [
    ['¿Qué modelo es Vercel principalmente?', 'PaaS', ['IaaS', 'SaaS de oficina', 'Servidor propio'], 'Subes el código y la plataforma se encarga del resto.', 2],
    ['Quieres proteger tu sistema contra la caída de un centro de datos. ¿Qué haces?', 'Desplegar en varias zonas de disponibilidad', ['Comprar un disco más grande', 'Usar una sola máquina más grande', 'Hacer un respaldo una vez al año'], 'Las zonas están físicamente separadas.', 3],
    ['¿Quién es responsable de que un bucket esté abierto al público por error?', 'Tú, por responsabilidad compartida', ['El proveedor', 'Nadie', 'El navegador'], 'El proveedor da la herramienta; la configuración es tuya.', 4],
    ['¿Qué significa que Terraform sea declarativo e idempotente?', 'Describes el estado final, y aplicar dos veces no duplica', ['Debes dar cada paso', 'Se ejecuta solo una vez', 'Borra todo cada vez'], 'Calcula la diferencia con lo existente.', 4],
    { c: 'Calcula «costoMes(horas, tarifa, instancias)» con dos decimales.', f: 'costoMes', p: ['horas', 'tarifa', 'instancias'], t: [[[730, 0.05, 2], 73], [[160, 0.1, 1], 16]], sol: '  return Math.round(horas * tarifa * instancias * 100) / 100;', l: 2 },
    { c: 'Calcula un plan como Terraform: «plan(actual, deseado)» recibe objetos {recurso: config} y devuelve {crear, cambiar, borrar} con listas ordenadas.', f: 'plan', p: ['actual', 'deseado'], t: [[[{ a: 1, b: 2 }, { b: 3, c: 4 }], { crear: ['c'], cambiar: ['b'], borrar: ['a'] }], [[{}, {}], { crear: [], cambiar: [], borrar: [] }]], sol: '  const k = o => Object.keys(o).sort();\n  return {\n    crear: k(deseado).filter(x => !(x in actual)),\n    cambiar: k(deseado).filter(x => x in actual && actual[x] !== deseado[x]),\n    borrar: k(actual).filter(x => !(x in deseado))\n  };', l: 4 },
    { c: 'Calcula el escalado: «instancias(carga, porInstancia, min, max)» devuelve cuántas se necesitan, entre min y max.', f: 'instancias', p: ['carga', 'porInstancia', 'min', 'max'], t: [[[1000, 300, 1, 10], 4], [[1, 300, 2, 10], 2], [[99999, 300, 1, 5], 5]], sol: '  return Math.min(max, Math.max(min, Math.ceil(carga / porInstancia)));', l: 3 },
    { c: 'Valida permisos: «permite(politica, accion, recurso)». Politica es lista de {accion, recurso} donde "*" significa cualquiera. Todo lo demás se niega.', f: 'permite', p: ['politica', 'accion', 'recurso'], t: [[[[{ accion: 'leer', recurso: '*' }], 'leer', 'x'], true], [[[{ accion: 'leer', recurso: 'a' }], 'borrar', 'a'], false], [[[], 'leer', 'a'], false]], sol: "  return politica.some(p => (p.accion === '*' || p.accion === accion) && (p.recurso === '*' || p.recurso === recurso));", l: 4 }
  ],
  gen: function (g) {
    var c = [['Gmail para el correo de la empresa.', 'SaaS'], ['Una máquina virtual en la que instalas Linux y PostgreSQL.', 'IaaS'], ['Subes un repositorio y la plataforma lo publica.', 'PaaS'], ['Una función que corre cada vez que se sube un archivo.', 'FaaS'], ['Google Docs.', 'SaaS'], ['Render ejecuta tu API sin que manejes servidores.', 'PaaS'], ['AWS EC2.', 'IaaS'], ['AWS Lambda.', 'FaaS']];
    c.forEach(function (x) { g.mcq(1, '¿Qué modelo es?\n' + x[0], x[1], ['SaaS', 'IaaS', 'PaaS', 'FaaS'].filter(function (y) { return y !== x[1]; }), 'Es ' + x[1] + '.'); });
    g.times(8, function (R) { var h = R.pick([160, 300, 730]), t = R.pick([0.02, 0.05, 0.1, 0.5]); g.input(2, 'Una instancia cuesta $' + t + ' por hora y corre ' + h + ' horas. ¿Cuánto cuesta en dólares? (hasta 2 decimales)', +(h * t).toFixed(2), h + ' × ' + t + '.'); });
    g.times(6, function (R) { var c2 = R.pick([1000, 2500, 4000]), p = R.pick([300, 500, 800]); g.input(3, 'Una instancia atiende ' + p + ' peticiones/s y llegan ' + c2 + '. ¿Cuántas instancias necesitas? (redondea hacia arriba)', Math.ceil(c2 / p), c2 + ' / ' + p + '.'); });
  } });

S('m15', 'm15.obs', { title: 'Observabilidad y SRE',
  ask: '¿Qué concepto de observabilidad o confiabilidad es?',
  lesson: `
> **La idea en simple.** Un médico no abre al paciente para saber si tiene fiebre: mira signos vitales. La observabilidad son los signos vitales de tu sistema en producción.

## Los tres pilares
| Pilar | Responde | Ejemplo |
| Registros (logs) | ¿qué pasó exactamente? | "falló pago 42: timeout" |
| Métricas | ¿qué tanto, y cómo va? | 120 peticiones/s, p99 de 800 ms |
| Trazas | ¿por dónde pasó y dónde tardó? | API → pagos → BD |

## Registros estructurados
~~~js
function log(nivel, msg, datos) {
  console.log(JSON.stringify({ nivel, msg, ...datos }));
}
log("info", "Vehículo registrado", { placa: "ABC-123", ms: 42 });
log("error", "Pago falló", { idPeticion: "r-9", motivo: "timeout" });
~~~
JSON se puede buscar y filtrar. Nunca registres contraseñas ni datos personales innecesarios.

## Los cuatro indicadores de oro
Latencia, tráfico, errores y saturación. Si solo vas a medir cuatro cosas, que sean estas.

## SLI, SLO y SLA
- **SLI:** lo que mides. "Porcentaje de peticiones bajo 500 ms."
- **SLO:** tu objetivo interno. "99.9% al mes."
- **SLA:** un contrato, con penalidad.
- **Presupuesto de error:** con 99.9%, tienes 0.1% para fallar. Si se agota, se detienen las funciones nuevas para ganar estabilidad.

## Incidentes
1. Detectar (una alerta). 2. Comunicar. 3. **Mitigar primero** (revertir). 4. Investigar. 5. Postmortem sin culpas.

Alerta solo sobre lo que afecta a usuarios y requiere acción. El exceso crea fatiga y hace que se ignore lo importante.

## Herramientas
Prometheus y Grafana para métricas, OpenTelemetry para trazas, y Sentry para errores.

## Puntos que no debes omitir
- Usa percentiles y no promedios.
- **Monitorear** responde lo conocido; **observar** permite preguntar lo no previsto.
- Respaldos: regla 3-2-1, y prueba su restauración.

! Error común: alertar por CPU alta. Importa si los usuarios sufren: alerta por síntomas y no por causas.`,
  links: [['m2.prob', 'los percentiles son estadística'], ['m6.errors', 'los registros dan el contexto para depurar'], ['m13.quality', 'los SLO miden la disponibilidad real'], ['m13.dist', 'las trazas son indispensables entre servicios']],
  read: 'Beyer et al., *Site Reliability Engineering* (gratis en línea); Majors et al., *Observability Engineering*.',
  terms: [
    ['Registro', 'evento detallado con marca de tiempo de algo que pasó', ['Una línea JSON con "pago falló".', 'Se busca qué pasó a las 3 a. m.', 'Tiene niveles como info y error.']],
    ['Métrica', 'valor numérico agregado a lo largo del tiempo', ['Peticiones por segundo en un gráfico.', 'La memoria usada.', 'Se usa para definir alertas.']],
    ['Traza', 'recorrido completo de una petición entre componentes', ['Se ve que 900 de los 1000 ms se gastan en la base de datos.', 'Cada servicio agrega un tramo.', 'Une todo con un ID común.']],
    ['SLI', 'indicador medido del nivel de servicio', ['Porcentaje de peticiones exitosas.', 'Latencia p95 medida.', 'Es el número real.']],
    ['SLO', 'objetivo interno para un indicador', ['99.9% de disponibilidad mensual.', 'Se decide con el negocio.', 'De él se calcula el presupuesto de error.']],
    ['SLA', 'acuerdo contractual con consecuencias por incumplimiento', ['Devuelven 10% si baja de 99.5%.', 'Se firma con el cliente.', 'Suele ser menos estricto que el objetivo interno.']],
    ['Presupuesto de error', 'cantidad de fallo tolerable según el objetivo', ['Con 99.9%, 43 minutos al mes.', 'Si se agota, se priorizan las mejoras de estabilidad.', 'Permite tomar riesgos cuando sobra.']]
  ],
  q: [
    { o: 'Ordena la respuesta a un incidente.', s: ['Detectar', 'Comunicar', 'Mitigar el daño', 'Encontrar la causa raíz', 'Postmortem sin culpas'], e: 'Primero se restablece el servicio; luego se investiga.', l: 2 },
    ['El sitio falla tras un despliegue. ¿Qué haces primero?', 'Revertir para restablecer el servicio', ['Buscar la causa durante horas', 'Culpar a alguien', 'Agregar funciones'], 'Primero mitigar.', 3],
    ['¿Cuántos minutos de caída al mes permite 99.9% en un mes de 30 días?', '43.2', ['432', '4.32', '8.76'], '43 200 min × 0.001.', 3],
    ['Hay 200 alertas diarias y nadie les hace caso. ¿Qué haces?', 'Dejar solo las accionables, basadas en síntomas para el usuario', ['Agregar más', 'Silenciar todas', 'Apagar el monitoreo'], 'Es la fatiga de alertas.', 4],
    ['El promedio es 100 ms, pero los usuarios se quejan. ¿Qué miras?', 'Los percentiles p95 y p99', ['El mínimo', 'El promedio de nuevo', 'El color del gráfico'], 'Lo lento se oculta en el promedio.', 3],
    { c: 'Calcula un percentil: «percentil(l, p)» ordena y devuelve el valor en la posición techo(p/100 × n) − 1.', f: 'percentil', p: ['l', 'p'], t: [[[[1, 2, 3, 4, 100], 80], 4], [[[5], 99], 5], [[[10, 20, 30, 40], 50], 20]], sol: '  const s = [...l].sort((a, b) => a - b);\n  return s[Math.ceil(p / 100 * s.length) - 1];', l: 3 },
    { c: 'Calcula un SLI: «exitosas(codigos)» devuelve el porcentaje de códigos menores a 500, redondeado a 2 decimales.', f: 'exitosas', p: ['codigos'], t: [[[[200, 404, 500, 503]], 50], [[[200]], 100]], sol: '  return Math.round(codigos.filter(c => c < 500).length / codigos.length * 10000) / 100;', l: 2 },
    { c: 'Calcula el presupuesto: «presupuestoMin(slo, dias)» en minutos, con dos decimales.', f: 'presupuestoMin', p: ['slo', 'dias'], t: [[[99.9, 30], 43.2], [[99, 1], 14.4]], sol: '  return Math.round(dias * 24 * 60 * (100 - slo) / 100 * 100) / 100;', l: 3 },
    { c: 'Filtra registros: «erroresPor(logs)» recibe objetos {nivel, servicio} y devuelve {servicio: cuenta} solo de nivel "error".', f: 'erroresPor', p: ['logs'], t: [[[[{ nivel: 'error', servicio: 'a' }, { nivel: 'info', servicio: 'a' }, { nivel: 'error', servicio: 'a' }]], { a: 2 }], [[[]], {}]], sol: "  const r = {};\n  for (const l of logs) if (l.nivel === 'error') r[l.servicio] = (r[l.servicio] || 0) + 1;\n  return r;", l: 3 },
    { c: 'Decide alerta: «tasaQuema(erroresPorc, slo)» devuelve cuántas veces más rápido que lo permitido se gasta el presupuesto, redondeado a 1 decimal.', f: 'tasaQuema', p: ['erroresPorc', 'slo'], t: [[[1, 99.9], 10], [[0.1, 99.9], 1]], sol: '  return Math.round(erroresPorc / (100 - slo) * 10) / 10;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Se quiere saber qué dijo la pasarela cuando falló el pago 42.', 'Registros'], ['Se quiere ver si las peticiones por minuto bajaron.', 'Métricas'], ['Se quiere saber qué servicio hace lenta una petición.', 'Trazas'], ['Se configura una alerta si la tasa de error supera 1%.', 'Métricas'], ['Se busca el mensaje exacto de una excepción.', 'Registros'], ['Se sigue un ID de petición de la API a la base de datos.', 'Trazas']];
    c.forEach(function (x) { g.mcq(1, '¿Qué pilar usas?\n' + x[0], x[1], ['Registros', 'Métricas', 'Trazas'].filter(function (y) { return y !== x[1]; }), 'Se usa ' + x[1] + '.'); });
    g.times(10, function (R) { var s = R.pick([99, 99.5, 99.9, 99.95, 99.99]), d = R.pick([7, 30]); g.input(2, '¿Cuántos minutos de caída permite un SLO de ' + s + '% en ' + d + ' días? (2 decimales)', +(d * 1440 * (100 - s) / 100).toFixed(2), d + ' × 1440 × ' + ((100 - s) / 100).toFixed(4) + '.'); });
  } });
})();
