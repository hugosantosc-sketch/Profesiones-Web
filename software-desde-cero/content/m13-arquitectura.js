(function () {
var M = SDC.M, S = SDC.S;
M('m13', { title: 'Arquitectura de software', desc: 'Las decisiones que después son caras de cambiar. Se aprende a razonar con compromisos: no existe la mejor arquitectura, solo la más adecuada para este problema.',
  thread: 'PatioApp pasa de un solo archivo a capas con dominio protegido. Se decide si conviene monolito o servicios, y cómo seguir funcionando cuando el taller externo no responde.',
  books: '*Software Architecture in Practice* (Bass, Clements y Kazman), *Clean Architecture* (Martin), *Fundamentals of Software Architecture* (Richards y Ford), *Designing Data-Intensive Applications* (Kleppmann), *Building Microservices* (Newman).',
  uni: 'Fundamentos de Arquitectura de Software y Arquitecturas de Software Emergentes (UPC), Software Architecture de SWEBOK v4, Distributed Systems (MIT 6.824).' });

S('m13', 'm13.styles', { title: 'Estilos de arquitectura',
  ask: '¿Qué estilo o principio de arquitectura describe esto?',
  lesson: `
> **La idea en simple.** En una casa, la cocina no está en el baño y las tuberías no pasan por el centro de la sala. La arquitectura decide dónde va cada cosa para que luego puedas remodelar sin tumbar la casa.

## Capas
:::flow Presentación | Aplicación | Dominio | Infraestructura
Cada capa solo llama a la de abajo. Simple y común, pero la lógica puede terminar dependiendo de la base de datos.

## Hexagonal y arquitectura limpia
El **dominio está en el centro** y no sabe nada de bases de datos, ni de la web. El exterior se conecta mediante **puertos** (interfaces) y **adaptadores**.
~~~js
// Dominio puro: regla de negocio sin saber dónde se guarda
function entregar(vehiculo) {
  if (!vehiculo.revisado) throw new Error("No revisado");
  return { ...vehiculo, estado: "entregado" };
}
// Caso de uso que depende de un puerto
function casoEntregar(placa, repo) {
  const v = repo.buscar(placa);
  const e = entregar(v);
  repo.guardar(e);
  return e.estado;
}
// Adaptador en memoria, útil para pruebas
const datos = { A: { placa: "A", revisado: true } };
const repoMemoria = { buscar: p => datos[p], guardar: v => { datos[v.placa] = v; } };
console.log(casoEntregar("A", repoMemoria));
~~~
Regla de dependencia: **las dependencias apuntan hacia adentro**.

## Monolito y microservicios
| | Monolito | Microservicios |
| Despliegue | todo junto | cada uno aparte |
| Complejidad | en el código | en la red y la operación |
| Datos | una base | una base por servicio |
| Ideal para | empezar, equipos pequeños | muchos equipos que necesitan independencia |

El **monolito modular** es un excelente punto medio. Fowler recomienda "monolito primero".

## Otros estilos
- **MVC:** separa modelo, vista y controlador.
- **Orientado a eventos:** componentes reaccionan a eventos.
- **Serverless:** funciones que el proveedor escala.
- **CQRS:** separar el modelo de lectura del de escritura.

## Puntos que no debes omitir
- Toda decisión es un compromiso. Regístrala en un **ADR** (registro de decisión de arquitectura): contexto, decisión y consecuencias.
- Evita el **monolito distribuido**: servicios que deben desplegarse juntos.
- *Domain-Driven Design*: los servicios siguen los **contextos delimitados** del negocio.

! Error común: empezar con microservicios porque lo hace Netflix. Tú no tienes los problemas de Netflix, ni sus equipos.`,
  links: [['m5.solid', 'la inversión de dependencias es la base de hexagonal'], ['m5.pat1', 'los adaptadores son el patrón Adapter'], ['m12.risk', 'la ley de Conway une equipos y arquitectura'], ['m13.quality', 'el estilo se elige según los atributos de calidad']],
  read: 'Martin, *Clean Architecture*; Richards y Ford, *Fundamentals of Software Architecture*; Newman, *Building Microservices*.',
  terms: [
    ['Arquitectura en capas', 'organización en niveles donde cada uno usa solo al inferior', ['Controlador llama a servicio y servicio a repositorio.', 'La interfaz nunca toca SQL.', 'Es lo más común en sistemas empresariales.']],
    ['Hexagonal', 'arquitectura con el dominio al centro y puertos y adaptadores afuera', ['Se cambia PostgreSQL por memoria sin tocar las reglas.', 'La API y las pruebas son dos adaptadores distintos.', 'El dominio no importa ninguna biblioteca web.']],
    ['Monolito', 'aplicación desplegada como una sola unidad', ['Un solo proceso con todos los módulos.', 'Una llamada entre módulos es una simple función.', 'Un cambio pequeño obliga a desplegar todo.']],
    ['Microservicios', 'sistema de servicios pequeños, independientes y desplegables por separado', ['Pagos y catálogo tienen su propio equipo y base de datos.', 'Se comunican por red.', 'Hace falta observabilidad y automatización fuertes.']],
    ['MVC', 'patrón que separa modelo, vista y controlador', ['La plantilla no contiene reglas de negocio.', 'Rails y Django siguen esta idea.', 'El controlador recibe la petición y elige la vista.']],
    ['Serverless', 'modelo en que el proveedor ejecuta funciones y gestiona servidores', ['Funciones en Vercel que corren por petición.', 'Se paga solo por uso.', 'Puede tener arranque en frío.']],
    ['ADR', 'documento breve que registra una decisión de arquitectura y su porqué', ['Se anota por qué se eligió PostgreSQL.', 'Un nuevo integrante entiende el contexto.', 'Vive en el repositorio junto al código.']]
  ],
  q: [
    ['Un equipo de 4 inicia un producto incierto. ¿Qué arquitectura eliges?', 'Monolito modular', ['20 microservicios', 'Malla de servicios global', 'Un servicio por tabla'], 'Da velocidad; si crece, se pueden extraer servicios.', 3],
    ['Dos servicios siempre deben desplegarse juntos y comparten base de datos. ¿Qué tienes?', 'Un monolito distribuido', ['Microservicios perfectos', 'Serverless', 'Hexagonal'], 'Lo peor de ambos mundos.', 4],
    ['¿Hacia dónde apuntan las dependencias en la arquitectura limpia?', 'Hacia el dominio, adentro', ['Hacia la base de datos', 'Hacia la interfaz', 'En todas direcciones'], 'Las reglas de negocio no conocen los detalles.', 3],
    ['En hexagonal, ¿qué es la base de datos?', 'Un detalle conectado mediante un adaptador', ['El centro del sistema', 'Parte del dominio', 'La interfaz de usuario'], 'Por eso se puede reemplazar en las pruebas.', 3],
    ['¿Qué ventaja real tienen los microservicios?', 'Equipos que despliegan y escalan de forma independiente', ['Menor complejidad total', 'Menos red', 'Depuración más sencilla'], 'Se paga con complejidad operativa.', 4],
    { c: 'Implementa un caso de uso con un puerto: «registrar(placa)» debe crear internamente un repositorio en memoria y un dominio que rechace placas vacías con Error. Devuelve la cantidad guardada.', f: 'registrar', p: ['placa'], t: [[['A'], 1], [['BB'], 1]], sol: "  const repo = { datos: [], guardar(v) { this.datos.push(v); return this.datos.length; } };\n  const crear = p => { if (!p) throw new Error('Placa vacía'); return { placa: p }; };\n  return repo.guardar(crear(placa));", l: 3 },
    { c: 'Revisa las capas: «violaciones(deps, orden)» recibe [[desde, hasta]] y las capas de arriba a abajo. Una dependencia es inválida si va a la misma capa superior. Devuelve cuántas van hacia arriba.', f: 'violaciones', p: ['deps', 'orden'], t: [[[[['ui', 'app'], ['bd', 'ui']], ['ui', 'app', 'bd']], 1], [[[], ['a']], 0]], sol: '  return deps.filter(([a, b]) => orden.indexOf(b) < orden.indexOf(a)).length;', l: 4 },
    { c: 'Detecta dependencias circulares entre módulos: «circular(g)» con {modulo: [dependencias]}.', f: 'circular', p: ['g'], t: [[[{ a: ['b'], b: ['a'] }], true], [[{ a: ['b'], b: [] }], false]], sol: '  const e = {};\n  const v = n => {\n    if (e[n] === 1) return true;\n    if (e[n] === 2) return false;\n    e[n] = 1;\n    const r = (g[n] || []).some(v);\n    e[n] = 2;\n    return r;\n  };\n  return Object.keys(g).some(v);', l: 4 }
  ],
  gen: function (g) {
    var c = [['Startup de 3 personas validando una idea.', 'Monolito'], ['200 ingenieros con equipos independientes y despliegues diarios.', 'Microservicios'], ['Una API con tráfico muy irregular, y se quiere pagar solo por uso.', 'Serverless'], ['Sistema de negocio largo donde las reglas deben sobrevivir a cambios de tecnología.', 'Hexagonal'], ['Aplicación web clásica de servidor con plantillas.', 'MVC'], ['Varios sistemas deben reaccionar cuando se aprueba una revisión.', 'Orientada a eventos'], ['Sistema interno simple con pantallas, reglas y base de datos.', 'En capas']];
    var o = ['Monolito', 'Microservicios', 'Serverless', 'Hexagonal', 'MVC', 'Orientada a eventos', 'En capas'];
    c.forEach(function (x) { g.mcq(3, '¿Qué estilo encaja mejor?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Encaja mejor ' + x[1] + '.'); });
  } });

S('m13', 'm13.quality', { title: 'Atributos de calidad y compromisos',
  ask: '¿Qué atributo de calidad está en juego?',
  lesson: `
> **La idea en simple.** Un auto de carreras es veloz, pero no lleva compras; una camioneta lleva compras, pero no gana carreras. No puedes maximizar todo. La arquitectura trata de elegir qué sacrificar.

## Los atributos
| Atributo | Pregunta | Técnica típica |
| Rendimiento | ¿qué tan rápido? | caché, índices |
| Escalabilidad | ¿y con 100 veces más? | añadir máquinas |
| Disponibilidad | ¿funciona cuando lo necesito? | redundancia |
| Seguridad | ¿resiste ataques? | defensa en profundidad |
| Mantenibilidad | ¿es fácil de cambiar? | módulos claros |
| Facilidad de prueba | ¿se puede verificar? | inyección de dependencias |
| Observabilidad | ¿sé qué está pasando? | registros, métricas y trazas |
| Usabilidad | ¿es fácil de usar? | pruebas con usuarios |

## Disponibilidad: los nueves
~~~js
function caidaPorAno(porc) {
  const horas = 365 * 24 * (1 - porc / 100);
  return horas.toFixed(2) + " horas al año";
}
[99, 99.9, 99.99, 99.999].forEach(p => console.log(p + "%:", caidaPorAno(p)));
~~~
Cada nueve adicional cuesta mucho más. ¿Tu sistema de verdad lo necesita?

## Escenarios de calidad
No digas "debe ser rápido". Escribe: **fuente, estímulo, entorno, respuesta y medida.**
"Si 1000 usuarios buscan en hora punta, el 95% obtiene respuesta en menos de 800 ms."

## Compromisos típicos
- Rendimiento o legibilidad.
- Consistencia o disponibilidad.
- Seguridad o usabilidad.
- Desarrollo veloz o flexibilidad a futuro.

## Modos de falla
Los componentes fallarán; hay que diseñar para eso: redundancia, degradación gradual ("no hay recomendaciones, pero puedes comprar"), reintentos, timeouts y cortacircuitos.

## Puntos que no debes omitir
- MTBF es el tiempo medio entre fallos; MTTR, el tiempo medio de reparación. Reducir el MTTR suele ser más barato.
- La optimización prematura es la raíz de muchos males (Knuth): **mide antes**.
- Se documentan los motivos de los compromisos elegidos.

! Error común: pedir "100% disponible". Es imposible, y acercarse cuesta una fortuna.`,
  links: [['m11.req', 'los atributos son los requisitos no funcionales'], ['m2.prob', 'la disponibilidad se calcula con probabilidad'], ['m13.styles', 'cada estilo favorece a unos atributos y perjudica a otros'], ['m15.obs', 'los SLO miden estos atributos en producción']],
  read: 'Bass, Clements y Kazman, *Software Architecture in Practice*.',
  terms: [
    ['Escalabilidad', 'capacidad de soportar más carga agregando recursos', ['Se suman servidores en campaña navideña.', 'Pasar de 1000 a 100 000 usuarios sin reescribir.', 'El rendimiento se mantiene con el crecimiento.']],
    ['Disponibilidad', 'porcentaje de tiempo en que el sistema funciona', ['99.9% equivale a unas 8.76 horas de caída al año.', 'Se mejora con réplicas.', 'Se pacta en un SLA.']],
    ['Mantenibilidad', 'facilidad para modificar el sistema', ['Un cambio pequeño tarda horas y no semanas.', 'Módulos claros y buenas pruebas.', 'Un nuevo integrante entiende rápido el código.']],
    ['Rendimiento', 'qué tan rápido responde o cuánto procesa el sistema', ['La pantalla carga en 200 ms.', 'Se procesan 5000 peticiones por segundo.', 'Se mejora con caché e índices.']],
    ['Observabilidad', 'capacidad de entender el estado interno a partir de sus señales', ['Se responde "¿por qué falló a las 3 a. m.?" sin desplegar.', 'Se combinan registros, métricas y trazas.', 'Se sigue una petición entre servicios.']],
    ['MTTR', 'tiempo medio para recuperarse de un fallo', ['Un equipo restablece el servicio en 10 minutos.', 'Un botón de reversión baja este número.', 'Es una métrica DORA.']],
    ['Degradación gradual', 'seguir funcionando con capacidades reducidas ante un fallo', ['Si cae el servicio de fotos, se muestra la ficha sin foto.', 'Se ofrece una caché vieja.', 'Las recomendaciones desaparecen y la compra sigue.']]
  ],
  q: [
    ['¿Cuántas horas de caída al año permite 99.9%?', '8.76', ['87.6', '0.87', '52'], '8760 × 0.001.', 3],
    ['¿Qué mejora más la disponibilidad para un equipo pequeño?', 'Detectar y revertir rápido (bajar MTTR)', ['Prometer 100%', 'Probar menos', 'Desplegar una vez al año'], 'Disponibilidad ≈ MTBF / (MTBF + MTTR).', 4],
    ['"El sistema debe ser escalable." ¿Cómo se convierte en escenario?', 'Con 10 000 usuarios simultáneos, el 95% responde en menos de 1 s', ['Debe escalar mucho', 'Muy bien', 'Lo máximo posible'], 'Incluye estímulo y medida.', 3],
    ['Knuth y la optimización prematura: ¿qué hacer antes de optimizar?', 'Medir para encontrar el cuello de botella real', ['Optimizar cada línea', 'Reescribir en C', 'Agregar cachés por todas partes'], 'Se suele optimizar lo que no importa.', 3],
    ['¿Cuál combinación suele ser un compromiso real?', 'Más seguridad suele reducir la comodidad de uso', ['Más pruebas siempre reduce la calidad', 'Más índices acelera las escrituras', 'Más caché reduce la memoria'], 'Hay que equilibrar con el riesgo.', 4],
    { c: 'Calcula «horasCaida(p)» al año, redondeado a dos decimales.', f: 'horasCaida', p: ['p'], t: [[[99.9], 8.76], [[100], 0], [[99], 87.6]], sol: '  return Math.round(365 * 24 * (100 - p) / 100 * 100) / 100;', l: 2 },
    { c: 'Calcula la disponibilidad en serie: «serie(l)» con porcentajes, redondeada a tres decimales.', f: 'serie', p: ['l'], t: [[[[99, 99]], 98.01], [[[100]], 100]], sol: '  return Math.round(l.reduce((a, x) => a * x / 100, 1) * 100 * 1000) / 1000;', l: 3 },
    { c: 'Calcula la disponibilidad en paralelo: «paralelo(l)».', f: 'paralelo', p: ['l'], t: [[[[90, 90]], 99], [[[50, 50, 50]], 87.5]], sol: '  return Math.round((1 - l.reduce((a, x) => a * (1 - x / 100), 1)) * 100 * 1000) / 1000;', l: 3 },
    { c: 'Calcula «disponibilidadReal(mtbf, mttr)» en porcentaje redondeado a dos decimales.', f: 'disponibilidadReal', p: ['mtbf', 'mttr'], t: [[[99, 1], 99], [[10, 0], 100]], sol: '  return Math.round(mtbf / (mtbf + mttr) * 10000) / 100;', l: 4 }
  ],
  gen: function (g) {
    var a = [['Un cambio de la regla de IGV tarda dos semanas por tocar 30 archivos.', 'Mantenibilidad'], ['La aplicación falla bajo 5000 usuarios conectados.', 'Escalabilidad'], ['La pantalla principal tarda 8 segundos.', 'Rendimiento'], ['Nadie sabe por qué se cayó anoche.', 'Observabilidad'], ['El servicio cae cada semana durante 2 horas.', 'Disponibilidad'], ['Un usuario accede a datos que no son suyos.', 'Seguridad'], ['No se puede probar la lógica sin una base de datos real.', 'Facilidad de prueba'], ['Los usuarios no encuentran el botón de guardar.', 'Usabilidad']];
    var o = ['Mantenibilidad', 'Escalabilidad', 'Rendimiento', 'Observabilidad', 'Disponibilidad', 'Seguridad', 'Facilidad de prueba', 'Usabilidad'];
    a.forEach(function (x) { g.mcq(2, '¿Qué atributo de calidad falla?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Falla ' + x[1] + '.'); });
    g.times(6, function (R) { var p = R.pick([99, 99.5, 99.9, 99.95, 99.99]); g.input(3, '¿Cuántas horas de caída al año permite ' + p + '%? (redondea a dos decimales)', +(365 * 24 * (100 - p) / 100).toFixed(2), '8760 × ' + ((100 - p) / 100).toFixed(4) + '.'); });
  } });

S('m13', 'm13.scale', { title: 'Escalabilidad y caché',
  ask: '¿Qué técnica de escalabilidad corresponde?',
  lesson: `
> **La idea en simple.** Un restaurante lleno puede comprar una cocina más grande (escalar en vertical) o abrir más locales (escalar en horizontal). También puede tener platos ya listos en el mostrador (caché) y recibir a la gente en la puerta para repartirla (balanceador).

## Vertical y horizontal
- **Vertical:** una máquina más grande. Fácil, pero con techo y sin redundancia.
- **Horizontal:** más máquinas. Sin techo real, pero requiere servidores **sin estado**: la sesión va en Redis o en un token.

## Arquitectura típica
:::flow CDN | Balanceador | Servidores sin estado | Caché | Base primaria y réplicas

## Caché
~~~js
const cache = new Map();
let consultas = 0;
function buscarEnBd(p) { consultas++; return { placa: p }; }
function buscar(p) {
  if (!cache.has(p)) cache.set(p, buscarEnBd(p));   // cache-aside
  return cache.get(p);
}
buscar("A"); buscar("A"); buscar("A"); buscar("B");
console.log("Consultas a la base:", consultas);
~~~
- **Cache-aside:** la aplicación mira la caché, y si falta, va a la base.
- **Write-through:** se escribe en ambas a la vez.
- **Invalidación:** el problema difícil. Se usa TTL o se borra al cambiar.
- **Tasa de aciertos:** con 95%, solo 1 de cada 20 peticiones llega a la base.

## Balanceo de carga
Por turnos, menos conexiones, o por hash. Hace comprobaciones de salud y saca a los servidores caídos.

## Base de datos
- **Réplicas de lectura:** para muchas lecturas.
- **Particiones:** cuando ya no caben en una máquina.
- **Índices:** el primer paso siempre.

## Estimación rápida
Saber hacer cuentas en servilleta es una habilidad muy valorada.
~~~txt
1 millón de usuarios al mes × 10 peticiones al día ÷ 30 días...
Un día tiene 86 400 s: 1 millón de peticiones al día ≈ 12 por segundo
~~~

## Puntos que no debes omitir
- Encuentra primero el cuello de botella: casi siempre es la base de datos.
- Una **estampida de caché** ocurre cuando vence una clave popular y todos van a la base a la vez.
- Hacer asíncrono lo lento con colas.
- Prueba de carga antes de un evento, no durante.

! Error común: agregar servidores cuando el problema es una consulta sin índice.`,
  links: [['m1.cpu', 'la jerarquía de memoria y la caché son la misma idea'], ['m4.hash', 'una caché es una tabla hash'], ['m10.index', 'optimiza consultas antes de agregar máquinas'], ['m13.dist', 'escalar lleva a los problemas distribuidos']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulo 1; Xu, *System Design Interview*.',
  terms: [
    ['Escalado vertical', 'aumentar la capacidad de una sola máquina', ['Pasar de 8 a 64 GB de RAM.', 'No requiere cambiar el código.', 'Tiene un techo físico y de costo.']],
    ['Escalado horizontal', 'agregar más máquinas para repartir la carga', ['Pasar de 2 a 20 servidores.', 'Requiere servidores sin estado.', 'Un balanceador reparte las peticiones.']],
    ['Balanceador de carga', 'componente que reparte peticiones entre servidores', ['Se envía a quien tenga menos conexiones.', 'Se deja de enviar a un servidor caído.', 'Termina TLS en un punto central.']],
    ['CDN', 'red que sirve contenido desde servidores cercanos al usuario', ['Un usuario en Lima baja imágenes desde una copia local.', 'Reduce la carga del origen.', 'Sirve archivos estáticos con mucha rapidez.']],
    ['TTL', 'tiempo de vida antes de que un dato en caché caduque', ['Una consulta se guarda 60 s.', 'Un DNS se renueva cada hora.', 'Limita cuánto puede estar desactualizado.']],
    ['Tasa de aciertos', 'porcentaje de peticiones que la caché responde', ['Con 90%, solo 1 de 10 va a la base.', 'Se mide para decidir si vale la pena.', 'Cae después de vaciar la caché.']],
    ['Sin estado', 'servidor que no guarda datos de sesión entre peticiones', ['Cualquier servidor atiende a cualquier usuario.', 'La sesión está en Redis.', 'Se pueden agregar y quitar máquinas libremente.']]
  ],
  q: [
    ['La sesión se guarda en memoria del servidor y hay 3 detrás de un balanceador. ¿Qué pasa?', 'El usuario pierde su sesión cuando le toca otro servidor', ['Funciona perfecto', 'La sesión se copia sola', 'El balanceador se apaga'], 'Hay que externalizar la sesión o usar tokens.', 3],
    ['La app va lenta por una consulta sin índice. ¿Qué haces primero?', 'Agregar el índice tras revisar con EXPLAIN', ['Comprar 10 servidores', 'Reescribir en otro lenguaje', 'Agregar microservicios'], 'Siempre lo más barato primero.', 3],
    ['¿Por qué la invalidación de caché es difícil?', 'Hay que saber cuándo un dato copiado dejó de ser correcto', ['Las cachés no se pueden borrar', 'Requiere GPU', 'Por el DNS'], 'Es uno de los "dos problemas difíciles" de la informática.', 4],
    ['Vence una clave muy popular y 5000 peticiones van a la base. ¿Qué es?', 'Una estampida de caché', ['Un interbloqueo', 'Un N+1', 'Una inyección'], 'Se evita con bloqueo por clave o TTL con variación.', 4],
    { c: 'Simula: «consultasBd(accesos)» recibe claves y devuelve cuántas veces se va a la base con una caché sin vencimiento.', f: 'consultasBd', p: ['accesos'], t: [[[['a', 'a', 'b']], 2], [[[]], 0]], sol: '  return new Set(accesos).size;', l: 2 },
    { c: 'Calcula «tasaAciertos(aciertos, fallos)» en porcentaje entero redondeado.', f: 'tasaAciertos', p: ['aciertos', 'fallos'], t: [[[9, 1], 90], [[1, 2], 33]], sol: '  return Math.round(aciertos / (aciertos + fallos) * 100);', l: 2 },
    { c: 'Implementa balanceo por turnos: «turnosServidores(n, peticiones)» devuelve la lista del servidor (desde 0) que atiende cada petición.', f: 'turnosServidores', p: ['n', 'peticiones'], t: [[[2, 3], [0, 1, 0]], [[3, 0], []]], sol: '  return Array.from({ length: peticiones }, (_, i) => i % n);', l: 2 },
    { c: 'Implementa caché con TTL: «aciertosTtl(accesos, ttl)» recibe [{k, t}] en orden de tiempo. Una lectura acierta si la clave se cargó hace menos de ttl. Al fallar se recarga. Devuelve los aciertos.', f: 'aciertosTtl', p: ['accesos', 'ttl'], t: [[[[{ k: 'a', t: 0 }, { k: 'a', t: 5 }, { k: 'a', t: 20 }], 10], 1], [[[], 5], 0]], sol: '  const c = {};\n  let n = 0;\n  for (const { k, t } of accesos) {\n    if (k in c && t - c[k] < ttl) n++;\n    else c[k] = t;\n  }\n  return n;', l: 3 },
    { c: 'Implementa una LRU: «lruAciertos(accesos, cap)» devuelve cuántos accesos acertaron.', f: 'lruAciertos', p: ['accesos', 'cap'], t: [[[['a', 'b', 'a', 'c', 'b'], 2], 1], [[['a', 'a'], 1], 1]], sol: '  const m = new Map();\n  let n = 0;\n  for (const k of accesos) {\n    if (m.has(k)) { n++; m.delete(k); }\n    else if (m.size === cap) m.delete(m.keys().next().value);\n    m.set(k, 1);\n  }\n  return n;', h: 'Un Map conserva el orden de inserción: la primera clave es la menos reciente.', l: 4 }
  ],
  gen: function (g) {
    g.times(12, function (R) { var m = R.pick([1, 2, 5, 10, 50]), d = R.pick([1, 2, 5]); g.input(3, 'Un sistema recibe ' + m + ' millones de peticiones ' + (d === 1 ? 'por día' : 'cada ' + d + ' días') + '. ¿Cuántas por segundo en promedio? (redondea al entero más cercano)', Math.round(m * 1e6 / (d * 86400)), m + ' millones / (' + d + ' × 86 400).'); });
    g.times(8, function (R) { var h = R.pick([80, 90, 95, 99]), t = R.pick([1000, 5000, 10000]); g.input(2, 'Con ' + h + '% de aciertos y ' + t + ' peticiones por segundo, ¿cuántas llegan a la base?', t * (100 - h) / 100, t + ' × ' + (100 - h) / 100 + '.'); });
    g.times(6, function (R) { var f = R.pick([100, 200, 500]), i = R.pick([1000, 5000]); g.input(3, 'Cada servidor aguanta ' + f + ' peticiones/s y esperas ' + i + '. ¿Cuántos necesitas como mínimo? (redondea hacia arriba)', Math.ceil(i / f), i + ' / ' + f + '.'); });
  } });

S('m13', 'm13.dist', { title: 'Sistemas distribuidos',
  ask: '¿Qué concepto de sistemas distribuidos aplica?',
  lesson: `
> **La idea en simple.** Coordinar un viaje por WhatsApp entre diez amigos: los mensajes se retrasan, alguien se queda sin batería, y uno no sabe si el otro leyó o si la señal cayó. Eso es un sistema distribuido: **no se puede saber la diferencia entre lento y caído**.

## Las falacias
Quien programa asume, sin querer: la red es confiable, la latencia es cero, el ancho de banda es infinito... Todas son falsas.

## Teorema CAP
Durante una partición de red, se debe elegir:
- **CP:** consistente, pero puede rechazar peticiones (bancos).
- **AP:** disponible, pero puede dar datos viejos (redes sociales).

## Patrones de resiliencia
~~~js
// Cortacircuitos simplificado
function crearCircuito(maxFallos) {
  let fallos = 0;
  return f => {
    if (fallos >= maxFallos) return "abierto: respuesta alternativa";
    try { const r = f(); fallos = 0; return r; }
    catch (e) { fallos++; return "falló (" + fallos + ")"; }
  };
}
const llamar = crearCircuito(2);
const roto = () => { throw new Error("x"); };
console.log(llamar(roto));
console.log(llamar(roto));
console.log(llamar(roto));   // ya ni lo intenta
~~~
- **Timeout:** nunca esperes para siempre.
- **Reintento con espera exponencial y variación aleatoria.**
- **Cortacircuitos:** deja de llamar a lo que falla.
- **Idempotencia:** reintentar sin duplicar.
- **Mamparos:** separa recursos para que una falla no contagie.

## Mensajería y eventos
Una **cola** o un log de eventos (RabbitMQ, Kafka) desacopla: el emisor no espera y el receptor procesa a su ritmo.
- Entrega **al menos una vez**: puede duplicar, así que procesa de forma idempotente.
- **Exactamente una vez** es muy difícil en la práctica.

## Consistencia y consenso
- **Saga:** una transacción larga como pasos con compensación.
- **Outbox:** guardar el evento en la misma transacción que el dato.
- **Consenso (Raft, Paxos):** que varios nodos acuerden un valor. Requiere mayoría: 2 de 3, 3 de 5.
- Los relojes de distintas máquinas no coinciden.

## Puntos que no debes omitir
- Un sistema distribuido solo si no hay otra alternativa.
- Un fallo se propaga en cascada si no hay timeouts.
- Se usa un ID de correlación para seguir una petición entre servicios.

! Error común: asumir que la red funciona porque en local funciona. Prueba con fallos reales: es lo que hace la ingeniería del caos.`,
  links: [['m4.stack', 'las colas son colas FIFO a gran escala'], ['m8.conc', 'carreras e interbloqueos, pero sin memoria compartida'], ['m9.http', 'la idempotencia hace seguros los reintentos'], ['m9.tcp', 'la red es la fuente del problema'], ['m15.obs', 'las trazas siguen una petición entre servicios']],
  read: 'Kleppmann, *Designing Data-Intensive Applications*, capítulos 8 y 9; Nygard, *Release It!*',
  terms: [
    ['Partición de red', 'pérdida de comunicación entre partes de un sistema', ['Dos centros de datos no se ven entre sí.', 'Cada lado cree que el otro cayó.', 'Obliga a elegir según CAP.']],
    ['Teorema CAP', 'ante una partición se debe elegir entre consistencia y disponibilidad', ['Un banco prefiere rechazar antes que mostrar un saldo erróneo.', 'Una red social muestra datos algo viejos.', 'No se pueden tener las tres propiedades a la vez.']],
    ['Cortacircuitos', 'patrón que deja de llamar a un servicio que está fallando', ['Tras 5 fallos seguidos, se responde al instante con una alternativa.', 'Evita saturar a un servicio caído.', 'Tras un tiempo vuelve a probar.']],
    ['Timeout', 'límite de tiempo para esperar una respuesta', ['Tras 3 s se abandona la llamada.', 'Evita hilos colgados para siempre.', 'Sin él, un servicio lento derriba a los demás.']],
    ['Saga', 'transacción larga repartida en pasos con compensaciones', ['Si falla el envío, se reembolsa el pago.', 'No hay transacción ACID entre servicios.', 'Cada paso publica un evento.']],
    ['Consenso', 'acuerdo sobre un valor entre varios nodos, aun con fallas', ['Raft elige un líder.', 'Se requiere mayoría de 3 de 5 nodos.', 'etcd y ZooKeeper lo usan.']],
    ['Cola de mensajes', 'intermediario que guarda mensajes hasta que se procesen', ['Generar el PDF no bloquea la respuesta al usuario.', 'Se absorben picos de tráfico.', 'RabbitMQ entrega a los consumidores.']]
  ],
  q: [
    ['Un servicio no responde. ¿Qué puedes saber con certeza?', 'Nada: puede estar caído, lento o la red falló', ['Que está caído', 'Que no recibió la petición', 'Que procesó la petición'], 'Por eso los reintentos deben ser idempotentes.', 3],
    ['Con 5 nodos y consenso por mayoría, ¿cuántos pueden caer?', '2', ['1', '3', '4'], 'Se requieren 3 vivos.', 3],
    ['Una cola entrega "al menos una vez". ¿Qué debe hacer el consumidor?', 'Procesar de forma idempotente', ['Suponer que no se repite', 'Rechazar todo', 'Borrar la cola'], 'Puede llegar duplicado.', 4],
    ['Mil clientes reintentan al mismo tiempo tras una caída. ¿Qué evita sobrecargar?', 'Espera exponencial con variación aleatoria', ['Reintentar sin parar', 'Más reintentos', 'Quitar el timeout'], 'La variación evita que todos vuelvan a la vez.', 4],
    { c: 'Calcula el backoff: «esperas(base, n)» devuelve n tiempos: base, 2×base, 4×base...', f: 'esperas', p: ['base', 'n'], t: [[[100, 3], [100, 200, 400]], [[1, 0], []]], sol: '  return Array.from({ length: n }, (_, i) => base * 2 ** i);', l: 2 },
    { c: 'Calcula el quórum: «quorum(n)» devuelve la mayoría necesaria.', f: 'quorum', p: ['n'], t: [[[3], 2], [[4], 3], [[5], 3], [[1], 1]], sol: '  return Math.floor(n / 2) + 1;', l: 2 },
    { c: 'Consumidor idempotente: «procesar(eventos)» recibe [{id, monto}] y suma cada id una sola vez.', f: 'procesar', p: ['eventos'], t: [[[[{ id: 1, monto: 5 }, { id: 1, monto: 5 }, { id: 2, monto: 1 }]], 6], [[[]], 0]], sol: '  const v = new Set();\n  let s = 0;\n  for (const e of eventos) if (!v.has(e.id)) { v.add(e.id); s += e.monto; }\n  return s;', l: 3 },
    { c: 'Implementa un cortacircuitos: «circuito(res, max)» recibe resultados (true éxito, false fallo). Tras max fallos seguidos, deja de llamar y cuenta como omitidas. Devuelve [llamadas, omitidas].', f: 'circuito', p: ['res', 'max'], t: [[[[false, false, true], 2], [2, 1]], [[[true, false, true], 2], [3, 0]]], sol: '  let f = 0, l = 0, o = 0;\n  for (const r of res) {\n    if (f >= max) { o++; continue; }\n    l++;\n    f = r ? 0 : f + 1;\n  }\n  return [l, o];', l: 4 },
    { c: 'Implementa una saga: «saga(pasos)» recibe nombres con éxito [{n, ok}]. Ejecuta en orden; si uno falla, devuelve los nombres a compensar en orden inverso (sin incluir al fallido). Si todo va bien, [].', f: 'saga', p: ['pasos'], t: [[[[{ n: 'a', ok: true }, { n: 'b', ok: true }, { n: 'c', ok: false }]], ['b', 'a']], [[[{ n: 'a', ok: true }]], []]], sol: '  const h = [];\n  for (const p of pasos) {\n    if (!p.ok) return h.reverse();\n    h.push(p.n);\n  }\n  return [];', l: 4 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var n = R.pick([3, 5, 7, 9, 4, 6, 11]); g.input(2, 'En un clúster de ' + n + ' nodos, ¿cuántos forman mayoría?', Math.floor(n / 2) + 1, 'Más de la mitad.'); });
    g.times(6, function (R) { var n = R.pick([3, 5, 7, 9, 11]); g.input(3, 'En un clúster de ' + n + ' nodos, ¿cuántos fallos tolera sin perder mayoría?', Math.floor((n - 1) / 2), '(' + n + ' − 1) / 2.'); });
    g.times(5, function (R) { var b = R.pick([100, 200, 500]), k = R.int(2, 6); g.input(2, 'Con espera exponencial y base de ' + b + ' ms, ¿cuánto se espera en el intento ' + k + '? (El primero espera la base.)', b * Math.pow(2, k - 1), b + ' × 2^' + (k - 1) + '.'); });
  } });
})();
