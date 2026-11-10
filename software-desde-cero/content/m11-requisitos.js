(function () {
var M = SDC.M, S = SDC.S;
M('m11', { title: 'Requisitos y modelado', desc: 'El error más caro no es un bug, es construir perfectamente lo que nadie necesitaba. Aquí aprendes a descubrir qué hay que construir y a dejarlo claro.',
  thread: 'Se entrevista a quienes trabajan en el patio. De ahí salen historias de usuario para registrar ingresos, y un diagrama que todos entienden antes de escribir código.',
  books: '*Software Engineering* (Sommerville), *Software Engineering: A Practitioner\'s Approach* (Pressman), *User Stories Applied* (Cohn), *Software Requirements* (Wiegers), *UML Distilled* (Fowler).',
  uni: 'Especificación y Análisis de Requerimientos (UPC), Análisis y Diseño de Sistemas de Información (UTP), Ingeniería de Software I (UTEC), Software Requirements de SWEBOK v4.' });

S('m11', 'm11.req', { title: 'Ingeniería de requisitos',
  ask: '¿Qué tipo de requisito o técnica es este?',
  lesson: `
> **La idea en simple.** Un cliente pide "un carro". Quizá solo necesitaba llegar al trabajo, y una bicicleta basta. Los requisitos separan lo que la gente pide de lo que realmente necesita.

## Tipos de requisitos
- **Funcional:** qué hace el sistema. "Registrar el ingreso de un vehículo."
- **No funcional:** qué tan bien lo hace. "Responder en menos de 2 s con 500 usuarios."
- **Restricción:** límites impuestos. "Debe correr en Vercel", "cumplir la Ley 29733".

## El proceso
:::flow Descubrir | Analizar | Especificar | Validar | Gestionar cambios

## Técnicas para descubrir
Entrevistas, observar el trabajo real, talleres, encuestas, prototipos y revisar sistemas actuales. Observar es poderoso: la gente describe lo que cree que hace, y no siempre lo que hace.

## Interesados (stakeholders)
No solo quien paga: usuarios, soporte, legal, operaciones. Olvidar a uno es un requisito perdido.

## Un buen requisito es...
Claro, verificable, necesario, viable y sin ambigüedad.
| Malo | Bueno |
| "El sistema debe ser rápido" | "El 95% de las búsquedas responde en menos de 500 ms" |
| "Fácil de usar" | "Un revisor nuevo registra un vehículo en menos de 2 min sin ayuda" |

## Priorizar
- **MoSCoW:** debe, debería, podría, no ahora.
- **Kano:** básicos, de rendimiento y encantadores.
- **Valor y costo:** primero lo de mucho valor y poco esfuerzo.

## Puntos que no debes omitir
- Corregir un error de requisitos en producción puede costar decenas de veces más que hacerlo al inicio.
- Los requisitos cambian: lo profesional es gestionar el cambio, no negarlo.
- Un **prototipo** barato evita meses de construir lo equivocado.
- Pregunta "¿por qué?" hasta llegar al problema de fondo.

! Error común: anotar soluciones como si fueran requisitos. "Usar un Excel" es una solución; "consultar el historial por placa" es la necesidad.`,
  links: [['m11.stories', 'en proyectos ágiles se escriben como historias'], ['m13.quality', 'los requisitos no funcionales deciden la arquitectura'], ['m14.types', 'las pruebas de aceptación verifican los requisitos'], ['m12.est', 'lo que no está claro no se puede estimar']],
  read: 'Sommerville, *Software Engineering*, capítulo de requisitos; Wiegers, *Software Requirements*.',
  terms: [
    ['Requisito funcional', 'lo que el sistema debe hacer', ['El revisor registra una observación.', 'Se genera un reporte diario.', 'El sistema envía un aviso al aprobar una revisión.']],
    ['Requisito no funcional', 'cualidad con la que el sistema debe operar', ['Debe estar disponible 99.9% del tiempo.', 'Responder en menos de 1 s.', 'Soportar 10 000 usuarios a la vez.']],
    ['Restricción', 'límite impuesto a las opciones de solución', ['Debe usar PostgreSQL por política de la empresa.', 'Presupuesto máximo de S/ 20 000.', 'Debe funcionar en navegadores de hace dos años.']],
    ['Interesado', 'persona o grupo afectado o con influencia sobre el sistema', ['El área legal revisa los datos personales.', 'Soporte recibe los reclamos.', 'El dueño financia y el revisor lo usa.']],
    ['Elicitación', 'descubrir requisitos con los interesados', ['Observar un día de trabajo en el patio.', 'Hacer entrevistas y talleres.', 'Mostrar un prototipo para sacar dudas.']],
    ['MoSCoW', 'técnica que clasifica en debe, debería, podría y no ahora', ['El inicio de sesión es "debe" y el modo oscuro "podría".', 'Se negocia el alcance de la primera versión.', 'Se dejan explícitamente fuera algunas ideas.']],
    ['Trazabilidad', 'poder seguir cada requisito hasta su diseño, código y pruebas', ['Una auditoría pregunta qué prueba cubre esta regla.', 'Un commit enlaza el ticket.', 'Un cambio muestra todo lo que afectará.']]
  ],
  q: [
    { o: 'Ordena el proceso de requisitos.', s: ['Descubrir necesidades', 'Analizar y priorizar', 'Especificar', 'Validar con usuarios', 'Gestionar cambios'], e: 'Es un ciclo que se repite.', l: 2 },
    ['"El sistema debe ser seguro." ¿Qué le falta?', 'Ser verificable: qué amenaza, qué medida y cómo se comprueba', ['Nada, está perfecto', 'Más adjetivos', 'Código'], 'Si no se puede probar, no es un buen requisito.', 3],
    ['"Debemos usar un Excel para los ingresos." ¿Qué es esto en realidad?', 'Una solución; hay que descubrir la necesidad detrás', ['Un requisito no funcional', 'Una métrica', 'Una historia de usuario bien escrita'], 'Pregunta por qué lo piden.', 4],
    ['Un requisito ambiguo se descubre recién en producción. Según la literatura clásica, ¿qué ocurre con el costo?', 'Es muchísimo mayor que corregirlo al principio', ['Es igual', 'Es menor', 'Es cero'], 'El costo crece mientras más tarde se detecta.', 3],
    ['¿Cuál es el mejor requisito de rendimiento?', 'El 95% de las búsquedas por placa responde en menos de 500 ms con 200 usuarios', ['Debe ser muy rápido', 'Lo más rápido posible', 'Responder enseguida'], 'Es medible y tiene condiciones.', 4],
    { c: 'Prioriza con valor y costo: «priorizar(l)» recibe [{id, valor, costo}] y devuelve ids ordenados por valor/costo de mayor a menor.', f: 'priorizar', p: ['l'], t: [[[[{ id: 'a', valor: 2, costo: 2 }, { id: 'b', valor: 9, costo: 3 }]], ['b', 'a']], [[[]], []]], sol: '  return [...l].sort((x, y) => y.valor / y.costo - x.valor / x.costo).map(x => x.id);', l: 3 },
    { c: 'Elige el alcance: «alcance(l, cap)» recorre [{id, tipo, puntos}] donde tipo es "debe" o "podria"; incluye primero todos los "debe" y luego, en orden, los "podria" que aún quepan. Devuelve los ids.', f: 'alcance', p: ['l', 'cap'], t: [[[[{ id: 'p', tipo: 'podria', puntos: 2 }, { id: 'd', tipo: 'debe', puntos: 3 }], 5], ['d', 'p']], [[[{ id: 'p', tipo: 'podria', puntos: 9 }, { id: 'd', tipo: 'debe', puntos: 3 }], 5], ['d']]], sol: "  const r = [];\n  for (const t of ['debe', 'podria']) for (const x of l) {\n    if (x.tipo !== t) continue;\n    if (t === 'debe' || cap >= x.puntos) { r.push(x.id); cap -= x.puntos; }\n  }\n  return r;", l: 4 }
  ],
  gen: function (g) {
    var c = [['El sistema registra la hora de salida de cada vehículo.', 'Funcional'], ['El panel carga en menos de 2 s en 4G.', 'No funcional'], ['Debe desplegarse en la nube de la empresa.', 'Restricción'], ['El usuario exporta el reporte a Excel.', 'Funcional'], ['El sistema sigue disponible 99.5% del mes.', 'No funcional'], ['Debe cumplir la Ley de Protección de Datos Personales.', 'Restricción'], ['Se puede buscar un vehículo por placa.', 'Funcional'], ['Un usuario nuevo aprende a registrar en 10 minutos.', 'No funcional'], ['El proyecto debe terminar antes de marzo.', 'Restricción'], ['El sistema envía un aviso cuando vence el SOAT.', 'Funcional'], ['Las contraseñas se almacenan con un hash fuerte.', 'No funcional'], ['Solo se puede usar software libre.', 'Restricción']];
    c.forEach(function (x, i) { g.mcq(i < 6 ? 1 : 2, '¿Qué tipo de requisito es?\n' + x[0], x[1], ['Funcional', 'No funcional', 'Restricción'].filter(function (y) { return y !== x[1]; }), 'Se clasifica como ' + x[1] + '.'); });
  } });

S('m11', 'm11.stories', { title: 'Historias de usuario y criterios',
  ask: '¿Qué concepto de historias aplica?',
  lesson: `
> **La idea en simple.** Una historia de usuario no es un documento: es una promesa de conversación. Se escribe en una tarjeta para recordar qué quiere alguien y por qué.

## Formato
~~~txt
Como revisor de patio,
quiero registrar observaciones con foto,
para que el taller sepa exactamente qué reparar.
~~~
Quién, qué y para qué. Si no hay "para qué", quizá no haga falta.

## INVEST: una buena historia es...
Independiente, Negociable, Valiosa, Estimable, Pequeña (*Small*) y Comprobable (*Testable*).

## Criterios de aceptación
Dejan claro cuándo está terminada. El formato Dado-Cuando-Entonces se puede convertir en una prueba.
~~~txt
Dado que el vehículo no está revisado
Cuando el supervisor intenta entregarlo
Entonces el sistema lo impide y muestra el motivo
~~~

## Partir historias
Una historia enorme se llama **épica**. Se corta en rebanadas verticales: cada una atraviesa la interfaz, la lógica y los datos, y entrega valor. No partas por capas ("hacer la base de datos") porque eso no entrega nada usable.

## Casos de uso
Más formales: actor, flujo principal, flujos alternativos y excepciones. Útiles cuando el proceso es complejo.

## Mapa de historias
Se ordenan en horizontal los pasos del usuario y en vertical la prioridad. Un corte horizontal define tu MVP.

## Puntos que no debes omitir
- **MVP:** lo mínimo para aprender si la idea funciona. No es un producto malo.
- Definición de terminado: lo que cumple todo trabajo (probado, revisado, desplegado).
- Criterios de aceptación: lo específico de esta historia.
- Las historias no reemplazan hablar con la gente.

! Error común: "Como desarrollador, quiero crear una tabla". No menciona a un usuario ni un valor. Es una tarea técnica disfrazada.`,
  links: [['m11.req', 'es una forma ágil de expresar requisitos'], ['m12.agile', 'el backlog de Scrum se compone de historias'], ['m14.types', 'los criterios de aceptación se automatizan como pruebas'], ['m12.est', 'las historias se estiman en puntos']],
  read: 'Cohn, *User Stories Applied*; Patton, *User Story Mapping*.',
  terms: [
    ['Historia de usuario', 'descripción breve de una necesidad desde la mirada del usuario', ['"Como supervisor, quiero ver pendientes, para repartir el trabajo."', 'Cabe en una tarjeta.', 'Invita a conversar con quien la pidió.']],
    ['Criterio de aceptación', 'condición concreta para considerar terminada una historia', ['"Dado... cuando... entonces..."', 'La búsqueda devuelve resultados con 3 letras.', 'De él sale directamente una prueba.']],
    ['Épica', 'historia grande que se debe dividir', ['"Gestionar toda la facturación."', 'No cabe en un sprint.', 'Agrupa muchas historias relacionadas.']],
    ['Rebanada vertical', 'porción que atraviesa todas las capas y entrega valor', ['Una búsqueda simple con su pantalla, API y consulta.', 'Se muestra algo que funciona de punta a punta.', 'Se evita una historia de "solo backend".']],
    ['INVEST', 'siglas de las cualidades de una buena historia', ['Una historia demasiado grande no cumple la S.', 'Si no se puede probar, falla la T.', 'Se usa como lista al revisar el backlog.']],
    ['MVP', 'versión mínima que permite aprender si una idea funciona', ['Un formulario y una hoja de cálculo antes de construir la app completa.', 'Lanzas pocas funciones para medir el interés.', 'Dropbox empezó con un video de demostración.']],
    ['Definición de terminado', 'lista común de lo que debe cumplir todo trabajo para darse por acabado', ['Código revisado, probado y desplegado.', 'Evita el "ya está, solo falta probarlo".', 'Aplica a todas las historias.']]
  ],
  q: [
    ['¿Cuál historia está mejor escrita?', 'Como cliente, quiero ver el estado de mi vehículo, para no tener que llamar', ['Crear una tabla de estados', 'El sistema debe tener un botón', 'Como programador, quiero usar React'], 'Tiene actor, necesidad y valor.', 2],
    ['¿Cómo partes "Administrar vehículos" de la mejor forma?', 'Registrar, buscar por placa y luego editar: cada una usable', ['Primero la base, luego la API y luego la pantalla', 'Una sola historia gigante', 'Por programador'], 'Rebanadas verticales entregan valor en cada paso.', 4],
    ['"La búsqueda debe funcionar bien" como criterio. ¿Qué problema tiene?', 'No se puede comprobar', ['Es demasiado específico', 'Es muy largo', 'Debe ir en inglés'], 'Hay que decir qué datos, qué resultado y qué tiempo.', 3],
    { o: 'Ordena un criterio de aceptación.', s: ['Dado un vehículo sin revisar', 'Cuando el supervisor intenta entregarlo', 'Entonces se impide y se muestra el motivo'], e: 'Contexto, acción y resultado.', l: 2 },
    ['¿Qué diferencia a los criterios de aceptación de la definición de terminado?', 'Los criterios son de cada historia; la definición aplica a todas', ['Son lo mismo', 'La definición solo la ve el cliente', 'Los criterios los escribe la base de datos'], 'Se complementan.', 4],
    { c: 'Valida el formato: «tieneFormato(h)» debe ser true si el texto incluye "como ", "quiero " y "para " en ese orden, sin importar mayúsculas.', f: 'tieneFormato', p: ['h'], t: [[['Como cliente, quiero pagar, para ahorrar'], true], [['Quiero pagar'], false], [['para algo como quiero '], false]], sol: "  const t = h.toLowerCase(), a = t.indexOf('como '), b = t.indexOf('quiero '), c = t.indexOf('para ');\n  return a >= 0 && a < b && b < c;", l: 3 },
    { c: 'Reparte en sprints: «sprintsNecesarios(puntos, velocidad)» recibe los puntos de cada historia, en orden, y dice cuántos sprints se necesitan sin partir historias.', f: 'sprintsNecesarios', p: ['puntos', 'velocidad'], t: [[[[5, 5, 5], 10], 2], [[[3, 8, 2], 10], 2], [[[], 10], 0], [[[8, 8], 10], 2]], sol: '  let s = 0, q = 0;\n  for (const p of puntos) {\n    if (q < p) { s++; q = velocidad; }\n    q -= p;\n  }\n  return s;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Como desarrollador, quiero una tabla de usuarios.', 'Faltan usuario real y valor'], ['Como cliente, quiero todo el sistema de pagos.', 'Es demasiado grande'], ['Como revisor, quiero que sea bonito, para estar contento.', 'No se puede comprobar'], ['Como supervisor, quiero exportar el reporte diario a Excel, para enviarlo a gerencia.', 'Está bien escrita'], ['Como usuario, quiero un botón azul.', 'Describe una solución y no una necesidad'], ['Como cliente, quiero recibir un aviso cuando mi auto esté listo, para ir a recogerlo.', 'Está bien escrita']];
    var o = ['Faltan usuario real y valor', 'Es demasiado grande', 'No se puede comprobar', 'Está bien escrita', 'Describe una solución y no una necesidad'];
    c.forEach(function (x) { g.mcq(3, 'Evalúa esta historia:\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Diagnóstico: ' + x[1] + '.'); });
  } });

S('m11', 'm11.uml', { title: 'UML y modelado de dominio',
  ask: '¿Qué diagrama o relación usarías?',
  lesson: `
> **La idea en simple.** Un plano no es la casa, pero evita levantar una pared en el lugar equivocado. Un diagrama sirve para pensar y conversar. Se dibuja lo necesario y nada más.

## Los diagramas que más se usan
| Diagrama | Responde a | Ejemplo |
| Casos de uso | ¿quién hace qué? | revisor registra una revisión |
| Clases | ¿qué estructura tiene? | Vehiculo tiene Revisiones |
| Secuencia | ¿en qué orden se llaman? | navegador, API, base de datos |
| Estados | ¿cómo cambia un objeto? | Pendiente, Revisado, Entregado |
| Actividad | ¿cuál es el flujo? | proceso de ingreso |
| Componentes y despliegue | ¿dónde corre cada cosa? | API en la nube |

## Relaciones en el diagrama de clases
~~~txt
Asociación    Chofer ———— Vehiculo          se conocen
Agregación    Patio ◇——— Vehiculo          tiene, pero viven por separado
Composición   Pedido ◆——— LineaDePedido    tiene, y mueren juntos
Herencia      Camion ——▷ Vehiculo          es un
Dependencia   Reporte - - -> Vehiculo       lo usa un momento
~~~
Multiplicidades: «1», «0..1», «*», «1..*».

## Diagrama de secuencia
~~~txt
Navegador -> API: POST /revisiones
API -> BD: INSERT
BD --> API: id = 42
API --> Navegador: 201 Created
~~~

## Modelado del dominio
Busca los sustantivos del negocio (candidatos a clases) y los verbos (métodos). El **lenguaje ubicuo** de *Domain-Driven Design* dice que el código y el negocio deben usar las mismas palabras. Si en el patio dicen "unidad", el código no debería decir "item".

## Modelo C4
Para arquitectura: Contexto, Contenedores, Componentes y Código. Cuatro niveles de zoom, como Google Maps.

## Puntos que no debes omitir
- Un diagrama en pizarra sirve aunque no siga cada regla.
- Un diagrama desactualizado engaña: mantén pocos y úsalos.
- Mermaid o PlantUML permiten versionarlos en Git.

! Error común: documentar todo el sistema en UML antes de empezar. Un modelo se valida con código temprano.`,
  links: [['m5.oop2', 'las flechas son herencia y composición'], ['m10.norm', 'el diagrama ER modela lo mismo'], ['m13.styles', 'C4 documenta la arquitectura'], ['m5.pat2', 'un diagrama de estados guía el patrón State']],
  read: 'Fowler, *UML Distilled*; Evans, *Domain-Driven Design*; Brown, *The C4 model*.',
  terms: [
    ['Diagrama de clases', 'diagrama de la estructura estática con clases y relaciones', ['Muestra que un Vehiculo tiene Revisiones.', 'Incluye atributos y métodos.', 'Se dibuja para discutir el dominio.']],
    ['Diagrama de secuencia', 'diagrama de los mensajes entre participantes en el tiempo', ['Explica el flujo de inicio de sesión.', 'Tiene líneas de vida verticales.', 'Muestra qué servicio llama a cuál.']],
    ['Diagrama de estados', 'diagrama de los estados de un objeto y sus transiciones', ['Un pedido va de pendiente a enviado.', 'Se ven las transiciones prohibidas.', 'Se implementa con el patrón State.']],
    ['Caso de uso', 'interacción de un actor con el sistema para lograr un objetivo', ['El cliente consulta su factura.', 'Tiene flujo principal y flujos alternativos.', 'Muestra actores como monigotes.']],
    ['Composición UML', 'relación fuerte en la que la parte no existe sin el todo', ['Las líneas de un pedido desaparecen con él.', 'Se dibuja con un rombo relleno.', 'Las habitaciones de una casa.']],
    ['Agregación', 'relación débil en la que la parte puede existir sin el todo', ['Un patio tiene autos, pero un auto existe sin él.', 'Se dibuja con un rombo vacío.', 'Un equipo y sus jugadores.']],
    ['Lenguaje ubicuo', 'vocabulario común entre el negocio y el código', ['La clase se llama Revision porque así dice todo el patio.', 'Se evita traducir conceptos entre reuniones y código.', 'El glosario del proyecto refleja los nombres de las clases.']]
  ],
  q: [
    ['¿Qué diagrama eliges para explicar el flujo de pago entre 4 servicios?', 'Secuencia', ['Clases', 'Estados', 'Casos de uso'], 'Muestra orden de los mensajes.', 2],
    ['Factura y LineaDeFactura: ¿qué relación son?', 'Composición', ['Herencia', 'Agregación', 'Sin relación'], 'La línea no tiene sentido sin su factura.', 3],
    ['«1..*» junto a Revision en la relación con Vehiculo significa:', 'Un vehículo tiene al menos una revisión', ['Máximo una revisión', 'Ninguna revisión', 'Exactamente dos'], 'Uno o más.', 2],
    ['Del texto "El revisor aprueba la revisión de un vehículo", ¿qué candidatos salen?', 'Clases Revisor, Revision y Vehiculo; método aprobar', ['Clase Aprobar y método vehiculo', 'Solo una clase Sistema', 'Clase Texto'], 'Sustantivos a clases; verbos a métodos.', 3],
    ['¿Cuál es el uso más valioso de un diagrama según los enfoques ágiles?', 'Pensar y comunicar con poco esfuerzo', ['Generar todo el código', 'Reemplazar al código', 'Cumplir un trámite'], 'Se dibuja lo que aporta.', 4],
    { c: 'Valida un diagrama de estados: «secuenciaValida(trans, pasos)» recibe {estado: [siguientes]} y una lista de estados. Devuelve si cada paso es una transición permitida.', f: 'secuenciaValida', p: ['trans', 'pasos'], t: [[[{ a: ['b'], b: ['c'], c: [] }, ['a', 'b', 'c']], true], [[{ a: ['b'], b: [] }, ['b', 'a']], false], [[{}, []], true]], sol: '  for (let i = 1; i < pasos.length; i++) if (!(trans[pasos[i - 1]] || []).includes(pasos[i])) return false;\n  return true;', l: 3 },
    { c: 'Extrae candidatos: «sustantivos(texto, glosario)» devuelve las palabras del glosario presentes en el texto, en orden del glosario, ignorando mayúsculas.', f: 'sustantivos', p: ['texto', 'glosario'], t: [[['El Revisor aprueba', ['revisor', 'taller']], ['revisor']], [['', ['x']], []]], sol: '  const t = texto.toLowerCase();\n  return glosario.filter(g => t.includes(g.toLowerCase()));', l: 2 },
    { c: 'Encuentra estados sin salida: «finales(trans)» devuelve los estados sin transiciones, ordenados.', f: 'finales', p: ['trans'], t: [[[{ a: ['b'], b: [] }], ['b']], [[{}], []]], sol: '  return Object.keys(trans).filter(e => trans[e].length === 0).sort();', l: 3 },
    { c: 'Encuentra estados inalcanzables: «inalcanzables(trans, ini)» devuelve los que no se alcanzan desde ini, ordenados.', f: 'inalcanzables', p: ['trans', 'ini'], t: [[[{ a: ['b'], b: [], c: ['a'] }, 'a'], ['c']], [[{ a: [] }, 'a'], []]], sol: '  const v = new Set(), p = [ini];\n  while (p.length) { const n = p.pop(); if (!v.has(n)) { v.add(n); p.push(...trans[n]); } }\n  return Object.keys(trans).filter(e => !v.has(e)).sort();', l: 4 }
  ],
  gen: function (g) {
    var d = [['Mostrar qué módulos dependen de cuáles.', 'Componentes'], ['Mostrar en qué servidores corre cada parte.', 'Despliegue'], ['Representar el flujo de negocio con decisiones.', 'Actividad'], ['Explicar qué puede hacer cada rol.', 'Casos de uso'], ['Documentar las transiciones de un pedido.', 'Estados'], ['Modelar entidades del dominio y sus relaciones.', 'Clases']];
    var o = ['Componentes', 'Despliegue', 'Actividad', 'Casos de uso', 'Estados', 'Clases', 'Secuencia'];
    d.forEach(function (x) { g.mcq(2, '¿Qué diagrama eliges?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Se usa ' + x[1] + '.'); });
    var r = [['Un auto y sus cuatro ruedas de repuesto, que pueden pasar a otro auto.', 'Agregación'], ['Un documento y sus páginas.', 'Composición'], ['Camión y Vehículo.', 'Herencia'], ['Un Reporte que recibe un Vehiculo solo como parámetro.', 'Dependencia'], ['Un Chofer que conduce un Vehículo.', 'Asociación'], ['Una universidad y sus facultades, que dejan de existir sin ella.', 'Composición'], ['Un equipo y sus empleados, que siguen siendo empleados sin el equipo.', 'Agregación']];
    r.forEach(function (x) { g.mcq(3, '¿Qué relación UML es?\n' + x[0], x[1], ['Agregación', 'Composición', 'Herencia', 'Dependencia', 'Asociación'].filter(function (y) { return y !== x[1]; }).slice(0, 3), 'Es ' + x[1] + '.'); });
  } });
})();
