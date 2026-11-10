(function () {
var M = SDC.M, S = SDC.S;
M('m17', { title: 'La profesión y el proyecto final', desc: 'Lo que convierte conocimientos sueltos en una carrera: ética, leyes, trabajar con inteligencia artificial, construir un proyecto completo y conseguir trabajo.',
  thread: 'PatioApp queda como proyecto final: requisitos, arquitectura, pruebas, despliegue y una presentación. Es la pieza principal de tu portafolio.',
  books: '*The Pragmatic Programmer* (Hunt y Thomas), *Software Engineering at Google* (Winters et al.), *Código de ética ACM/IEEE-CS*, *Staff Engineer* (Larson), *Soft Skills* (Sonmez).',
  uni: 'Ética Profesional, Curso Integrador y Formación para la Empleabilidad (UTP), Taller de Proyecto I y II y Taller de Desempeño Profesional (UPC), Professional Practice de SWEBOK v4.' });

S('m17', 'm17.ethics', { title: 'Ética, leyes y responsabilidad',
  ask: '¿Qué principio ético o legal aplica?',
  lesson: `
> **La idea en simple.** Un ingeniero civil firma planos y responde si el puente cae. El software decide créditos, diagnósticos y sentencias. Tu código tiene consecuencias sobre personas que nunca conocerás.

## Casos que debes conocer
- **Therac-25 (años 80):** errores de concurrencia en una máquina de radioterapia causaron sobredosis mortales.
- **Volkswagen (2015):** software que engañaba las pruebas de emisiones. Hubo ingenieros condenados.
- **Boeing 737 MAX:** un sistema automático, con información insuficiente a los pilotos, contribuyó a dos accidentes.

## Código de ética ACM/IEEE
Actuar en interés del público, de clientes y empleadores, ofrecer productos con altos estándares, mantener juicio profesional independiente y seguir aprendiendo.

## Datos personales en Perú
La **Ley 29733** de Protección de Datos Personales exige consentimiento, finalidad definida y seguridad. La **Ley 30096** sanciona delitos informáticos, como el acceso no autorizado. En Europa rige el GDPR, que también alcanza a quienes atienden a residentes de allí.

Principios prácticos:
- **Minimización:** recoge solo lo necesario.
- **Finalidad:** úsalo solo para lo que dijiste.
- **Seguridad y derecho de acceso:** la persona puede pedir ver, corregir o eliminar.

## Propiedad intelectual y licencias
| Licencia | Permite | Obligación |
| MIT, Apache | casi todo | conservar el aviso |
| GPL | usar y modificar | lo distribuido debe seguir siendo GPL |
| Propietaria | lo que diga el contrato | según contrato |
Sin licencia, **no** tienes derecho a usar un código solo porque esté en GitHub.

## Sesgo y accesibilidad
Un modelo entrenado con datos sesgados puede discriminar. Una app sin accesibilidad excluye. Pregúntate: ¿quién queda fuera?

## Puntos que no debes omitir
- Puedes y debes decir que no, o escalar, ante algo dañino o ilegal.
- Los patrones oscuros engañan a los usuarios para beneficiar al negocio.
- Lo legal es el piso; la ética suele pedir más.
- Esta lección orienta, no reemplaza asesoría legal.

! Error común: "yo solo seguí la orden". Varios casos reales demuestran que no te protege.`,
  links: [['m16.owasp', 'proteger los datos es una obligación legal y ética'], ['m8.conc', 'Therac-25 fue un error de concurrencia'], ['m12.risk', 'los riesgos también incluyen daño a las personas'], ['m17.ai', 'la IA agrega nuevas preguntas éticas']],
  read: 'Código de ética ACM/IEEE-CS; Leveson, *Safeware*; texto de la Ley 29733 y la Ley 30096.',
  terms: [
    ['Minimización de datos', 'recoger solo los datos estrictamente necesarios', ['Un formulario no pide estado civil para vender repuestos.', 'Se borran datos que ya no se necesitan.', 'Una app de linterna no pide los contactos.']],
    ['Consentimiento', 'autorización libre e informada para tratar datos', ['La casilla no viene marcada de antemano.', 'Se explica para qué se usarán.', 'La persona puede retirarlo.']],
    ['Patrón oscuro', 'diseño que engaña al usuario para que haga algo que no quería', ['Cancelar es casi imposible.', 'Un cargo se agrega oculto en el último paso.', 'Una cuenta regresiva falsa presiona a comprar.']],
    ['Licencia permisiva', 'licencia de código que permite casi todo conservando el aviso', ['MIT permite usarlo en un producto cerrado.', 'Apache añade concesión de patentes.', 'Solo se exige mantener el texto de copyright.']],
    ['Copyleft', 'licencia que exige distribuir las obras derivadas con la misma licencia', ['Distribuir un derivado de GPL obliga a liberar el código.', 'Linux usa GPL.', 'Se revisa antes de incluirlo en un producto cerrado.']],
    ['Sesgo algorítmico', 'resultados sistemáticamente injustos para ciertos grupos', ['Un sistema de contratación penaliza a mujeres por datos históricos.', 'Un reconocimiento facial falla más con piel oscura.', 'Un crédito se niega por el distrito de residencia.']],
    ['Denuncia responsable', 'reportar por vías adecuadas algo dañino o ilegal', ['Avisar a cumplimiento sobre un software engañoso.', 'Dejar constancia de una objeción técnica.', 'Reportar una vulnerabilidad al fabricante antes de publicarla.']]
  ],
  q: [
    ['Tu jefe te pide esconder un cargo adicional en la compra. ¿Qué haces?', 'Explicar el riesgo, proponer una opción transparente y escalar si insiste', ['Hacerlo sin preguntar', 'Publicarlo en redes de inmediato', 'Renunciar sin avisar'], 'El código de ética pide actuar en interés del público.', 3],
    ['Encuentras código útil en GitHub sin licencia. ¿Qué es correcto?', 'No tienes permiso de usarlo salvo autorización del autor', ['Es de dominio público', 'Puedes usarlo si das crédito', 'Puedes venderlo'], 'Sin licencia, los derechos siguen reservados.', 3],
    ['¿Qué ley regula en Perú los datos personales?', 'Ley 29733', ['Ley 12345', 'GDPR', 'Ley de Moore'], 'Ley de Protección de Datos Personales.', 2],
    ['Encuentras una vulnerabilidad en un sitio ajeno mientras navegas. ¿Qué haces?', 'Reportarla de manera privada y responsable, sin explotarla', ['Extraer datos para probarla', 'Publicarla de inmediato', 'Pedir dinero a cambio de callar'], 'Lo último podría ser delito.', 4],
    ['¿Qué lección técnica deja el Therac-25?', 'Depender solo del software para seguridad crítica, sin controles físicos ni revisiones, puede matar', ['El hardware es innecesario', 'Basta una prueba manual', 'Solo se debe programar en ensamblador'], 'Se habían quitado controles físicos de versiones previas.', 4],
    { c: 'Aplica minimización: «minimizar(dato, permitidos)» devuelve un objeto solo con los campos permitidos.', f: 'minimizar', p: ['dato', 'permitidos'], t: [[[{ a: 1, b: 2 }, ['a']], { a: 1 }], [[{ a: 1 }, []], {}]], sol: '  const r = {};\n  for (const k of permitidos) if (k in dato) r[k] = dato[k];\n  return r;', l: 2 },
    { c: 'Anonimiza: «enmascararDni(d)» deja solo los últimos 3 dígitos y reemplaza el resto con *.', f: 'enmascararDni', p: ['d'], t: [[['12345678'], '*****678'], [['123'], '123']], sol: "  return '*'.repeat(Math.max(0, d.length - 3)) + d.slice(-3);", l: 3 },
    { c: 'Revisa licencias: «licenciasRiesgo(deps, permitidas)» devuelve los nombres de dependencias cuya licencia no está permitida.', f: 'licenciasRiesgo', p: ['deps', 'permitidas'], t: [[[[{ n: 'a', lic: 'MIT' }, { n: 'b', lic: 'GPL' }], ['MIT']], ['b']], [[[], []], []]], sol: '  return deps.filter(d => !permitidas.includes(d.lic)).map(d => d.n);', l: 2 },
    { c: 'Mide la paridad: «brechaAprobacion(g1, g2)» recibe listas de true/false por grupo, y devuelve la diferencia absoluta de tasas en puntos porcentuales, redondeada.', f: 'brechaAprobacion', p: ['g1', 'g2'], t: [[[[true, true], [true, false]], 50], [[[true], [true]], 0]], sol: '  const t = l => l.filter(Boolean).length / l.length;\n  return Math.round(Math.abs(t(g1) - t(g2)) * 100);', l: 4 }
  ],
  gen: function (g) {
    var c = [['Un formulario de compra exige el número de hijos sin motivo.', 'Viola la minimización'], ['Una casilla de publicidad viene marcada por defecto.', 'Viola el consentimiento'], ['Cancelar una suscripción requiere llamar en horario limitado, y comprarla un clic.', 'Es un patrón oscuro'], ['Datos entregados para una entrega se venden a terceros sin avisar.', 'Viola la finalidad'], ['Un modelo rechaza más a un grupo por datos históricos.', 'Es sesgo algorítmico'], ['Se pide la ubicación solo para el mapa y se explica.', 'Es una práctica correcta']];
    var o = ['Viola la minimización', 'Viola el consentimiento', 'Es un patrón oscuro', 'Viola la finalidad', 'Es sesgo algorítmico', 'Es una práctica correcta'];
    c.forEach(function (x) { g.mcq(2, 'Evalúa:\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Diagnóstico: ' + x[1] + '.'); });
  } });

S('m17', 'm17.ai', { title: 'Programar con inteligencia artificial',
  ask: '¿Qué concepto de IA aplicada aparece?',
  lesson: `
> **La idea en simple.** Un asistente de IA es como un practicante brillante, muy rápido y a veces demasiado seguro. Hace mucho trabajo, pero tú firmas el resultado. Si no entiendes lo que entrega, no puedes responder por ello.

## Lo básico de aprendizaje automático
En vez de escribir las reglas, das ejemplos y el modelo las aprende.
| Tipo | Idea | Ejemplo |
| Supervisado | ejemplos con respuesta | predecir fallas de vehículos |
| No supervisado | buscar grupos | segmentar clientes |
| Por refuerzo | premio y castigo | jugar, robótica |

## Modelos de lenguaje
Un LLM predice qué texto viene a continuación con base en enormes cantidades de datos. No "sabe" como una base de datos; por eso puede inventar con mucha seguridad: **alucinaciones**. Conceptos: **token**, **ventana de contexto** y **temperatura**.

## Cómo pedirle bien
1. Da contexto: lenguaje, restricciones y objetivo.
2. Da un ejemplo de entrada y salida.
3. Pide pasos pequeños y revisables.
4. Pide que te explique y pregunte lo dudoso.

## Tu trabajo ahora
~~~js
// Ejemplo de código sugerido con un error sutil. ¿Lo ves?
function promedio(l) {
  let s = 0;
  for (let i = 0; i <= l.length; i++) s += l[i];
  return s / l.length;
}
console.log(promedio([1, 2, 3]));   // ¿Por qué da NaN?
~~~
- **Lee todo**: revisa como revisarías a un colega.
- **Prueba**: las pruebas validan lo que nadie miró.
- **Cuida los datos**: no pegues secretos ni información de clientes en servicios no autorizados.
- **Verifica las dependencias**: la IA puede inventar paquetes que un atacante luego registra.
- **Revisa las licencias** y la seguridad de lo generado.

## Sistemas con IA dentro
Se conecta por API, se le da contexto recuperado de tus documentos (**RAG**) y puede usar herramientas (**agentes**). Requiere **evaluaciones** como pruebas: su salida varía. Cuidado con la **inyección de prompts**: un texto externo puede intentar darle órdenes.

## Puntos que no debes omitir
- Lo más valioso hoy: entender el problema, diseñar, verificar y comunicar.
- Si estás aprendiendo, intenta antes de pedir la solución: el esfuerzo es lo que crea memoria.
- Mantén una persona responsable de decisiones de alto impacto.

! Error común: copiar sin leer. La IA acelera; si vas en la dirección equivocada, llegas más rápido al error.`,
  links: [['m14.unit', 'las pruebas protegen del código generado'], ['m16.owasp', 'la inyección de prompts es una nueva forma de inyección'], ['m17.ethics', 'sesgo y responsabilidad'], ['m2.prob', 'el aprendizaje automático se basa en estadística']],
  read: 'Géron, *Hands-On Machine Learning*; Russell y Norvig, *Artificial Intelligence: A Modern Approach*.',
  terms: [
    ['Aprendizaje supervisado', 'entrenar con ejemplos que incluyen la respuesta correcta', ['Fotos etiquetadas como daño o sin daño.', 'Predecir el precio con datos de ventas pasadas.', 'Clasificar correos como spam.']],
    ['Alucinación', 'respuesta falsa generada con apariencia de certeza', ['La IA cita un libro que no existe.', 'Inventa una función de biblioteca.', 'Da una ley equivocada con total seguridad.']],
    ['Ventana de contexto', 'cantidad de texto que un modelo puede considerar a la vez', ['Un proyecto enorme no cabe en una sola petición.', 'Se resumen los mensajes antiguos.', 'Se mide en tokens.']],
    ['RAG', 'dar al modelo información recuperada de tus fuentes antes de responder', ['Un chatbot consulta el manual de la empresa.', 'Se buscan fragmentos relevantes y se añaden a la pregunta.', 'Reduce respuestas inventadas sobre datos propios.']],
    ['Agente', 'sistema de IA que usa herramientas en varios pasos hacia un objetivo', ['Lee archivos, ejecuta pruebas y corrige.', 'Decide qué herramienta usar a continuación.', 'Requiere límites y revisión.']],
    ['Inyección de prompts', 'texto malicioso que intenta dar órdenes al modelo', ['Una web oculta "ignora tus instrucciones".', 'Un correo intenta que el asistente filtre datos.', 'El contenido externo se trata como dato, no como orden.']],
    ['Evaluación', 'conjunto de casos para medir la calidad de un sistema de IA', ['200 preguntas con respuestas esperadas.', 'Se compara un modelo antes de cambiarlo.', 'Equivale a las pruebas automatizadas.']]
  ],
  q: [
    ['La IA te sugiere instalar un paquete que nunca escuchaste. ¿Qué haces?', 'Verificar que existe, quién lo mantiene y su reputación', ['Instalarlo sin mirar', 'Instalarlo con sudo', 'Publicarlo'], 'Se ha visto registrar paquetes con nombres inventados por modelos.', 3],
    ['¿Qué puedes pegar en una IA pública sin autorización?', 'Código y datos sin secretos ni información confidencial o de clientes', ['La clave de la base de datos', 'Datos de clientes reales', 'Contraseñas para que las revise'], 'Revisa la política de tu empresa.', 3],
    ['Un modelo te da una cita de un libro. ¿Qué haces?', 'Verificarla en la fuente', ['Darla por cierta', 'Cambiarla un poco', 'Citar a la IA como autor'], 'Puede ser una alucinación.', 2],
    ['Estás aprendiendo recursión. ¿Cuál es la mejor manera de usar IA?', 'Intentar primero y luego pedir pistas o revisión', ['Pedir siempre la solución', 'Nunca usarla', 'Copiar sin leer'], 'El esfuerzo de recordar es lo que consolida.', 3],
    ['¿Qué hace única a la prueba de un sistema con LLM?', 'La salida varía, así que se evalúa con conjuntos de casos y criterios', ['No se puede probar', 'Basta un solo caso', 'Igualdad exacta siempre'], 'Por eso existen las evaluaciones.', 4],
    { c: 'Corrige el código generado: «promedioCorregido(l)». Devuelve 0 con una lista vacía; la versión original se pasaba del final.', f: 'promedioCorregido', p: ['l'], t: [[[[1, 2, 3]], 2], [[[]], 0]], sol: '  if (!l.length) return 0;\n  let s = 0;\n  for (let i = 0; i < l.length; i++) s += l[i];\n  return s / l.length;', l: 2 },
    { c: 'Calcula la precisión de un clasificador: «exactitud(pred, real)» en porcentaje entero.', f: 'exactitud', p: ['pred', 'real'], t: [[[[1, 0, 1], [1, 1, 1]], 67], [[[1], [1]], 100]], sol: '  return Math.round(pred.filter((p, i) => p === real[i]).length / pred.length * 100);', l: 2 },
    { c: 'Implementa búsqueda simple para RAG: «mejorFragmento(frags, q)» devuelve el fragmento con más palabras en común con q (empate: el primero). Sin distinguir mayúsculas.', f: 'mejorFragmento', p: ['frags', 'q'], t: [[[['el auto rojo', 'la moto azul'], 'moto azul'], 'la moto azul'], [[['a', 'b'], 'zzz'], 'a']], sol: "  const w = new Set(q.toLowerCase().split(/\\s+/));\n  const p = f => f.toLowerCase().split(/\\s+/).filter(x => w.has(x)).length;\n  return frags.reduce((m, f) => p(f) > p(m) ? f : m);", l: 3 },
    { c: 'Implementa una evaluación: «evaluar(casos)» recibe [{salida, debeContener}] y devuelve el porcentaje que cumple, sin distinguir mayúsculas.', f: 'evaluar', p: ['casos'], t: [[[[{ salida: 'Hola Ana', debeContener: 'ana' }, { salida: 'x', debeContener: 'y' }]], 50], [[[]], 0]], sol: '  if (!casos.length) return 0;\n  return Math.round(casos.filter(c => c.salida.toLowerCase().includes(c.debeContener.toLowerCase())).length / casos.length * 100);', l: 3 },
    { c: 'Implementa la regresión lineal más simple: «pendiente(xs, ys)» por mínimos cuadrados. Redondea a dos decimales.', f: 'pendiente', p: ['xs', 'ys'], t: [[[[1, 2, 3], [2, 4, 6]], 2], [[[0, 1], [1, 1]], 0]], sol: '  const m = l => l.reduce((a, b) => a + b, 0) / l.length;\n  const x = m(xs), y = m(ys);\n  let n = 0, d = 0;\n  xs.forEach((v, i) => { n += (v - x) * (ys[i] - y); d += (v - x) ** 2; });\n  return Math.round(n / d * 100) / 100;', l: 4 }
  ],
  gen: function (g) {
    var c = [['Predecir el precio de un auto con ventas previas.', 'Supervisado'], ['Agrupar clientes sin categorías previas.', 'No supervisado'], ['Un robot aprende a caminar con recompensas.', 'Por refuerzo'], ['Detectar fotos con abolladuras usando fotos etiquetadas.', 'Supervisado'], ['Encontrar patrones inusuales de compras sin etiquetas.', 'No supervisado'], ['Un programa aprende a jugar ajedrez jugando contra sí mismo.', 'Por refuerzo']];
    c.forEach(function (x) { g.mcq(1, '¿Qué tipo de aprendizaje es?\n' + x[0], x[1], ['Supervisado', 'No supervisado', 'Por refuerzo'].filter(function (y) { return y !== x[1]; }), 'Es ' + x[1] + '.'); });
    g.times(8, function (R) { var t = R.pick([20, 50, 100, 200]), ok = R.int(10, t); g.input(2, 'Un modelo acierta ' + ok + ' de ' + t + ' casos de evaluación. ¿Cuál es su exactitud en %?', ok / t * 100, ok + ' / ' + t + '.'); });
  } });

S('m17', 'm17.capstone', { title: 'Proyecto final: PatioApp',
  ask: '¿Qué entregable o actividad del proyecto es esta?',
  lesson: `
> **La idea en simple.** Aprender a nadar requiere entrar al agua. Aquí unes todo lo que estudiaste en un producto real: un sistema para gestionar vehículos en un patio, desde la idea hasta producción.

## El proyecto
**PatioApp** registra ingresos, revisiones y salidas de vehículos, asigna choferes y muestra reportes.

## Etapas e hitos
| # | Entregable | Módulos que usas |
| 1 | Visión, entrevistas e historias con criterios | Requisitos |
| 2 | Modelo de datos y diagrama C4 | Bases de datos, Arquitectura |
| 3 | Repositorio, CI y primer despliegue vacío | Herramientas, DevOps |
| 4 | API REST: vehículos y revisiones con pruebas | Web, Pruebas, Construcción |
| 5 | Interfaz adaptable y accesible | Frontend |
| 6 | Autenticación, roles y auditoría | Seguridad |
| 7 | Reportes y optimización con índices | Bases de datos, Algoritmos |
| 8 | Registros, métricas y alerta | Observabilidad |
| 9 | Postmortem simulado, retrospectiva y demo | Procesos, Profesión |

## Pila sugerida
Lo que ya conoces de este curso: JavaScript o TypeScript, Node, PostgreSQL y Vercel, o un servicio similar. Elige con un ADR y justifica.

## Empieza mínimo
~~~js
// El núcleo del dominio, sin dependencias: empieza por aquí
function registrarIngreso(patio, placa, dia) {
  if (patio.some(v => v.placa === placa && !v.salida)) throw new Error("Ya está en el patio");
  return [...patio, { placa, ingreso: dia, salida: null }];
}
function registrarSalida(patio, placa, dia, tarifa = 20) {
  const v = patio.find(x => x.placa === placa && !x.salida);
  if (!v) throw new Error("No está en el patio");
  const dias = dia - v.ingreso + 1;
  return { patio: patio.map(x => x === v ? { ...x, salida: dia } : x), cobro: dias * tarifa };
}
let p = registrarIngreso([], "ABC-123", 10);
const r = registrarSalida(p, "ABC-123", 12);
console.log(r.cobro, r.patio);
~~~

## Criterios para evaluarte
- Despliegue público funcionando.
- Pruebas automáticas corriendo en CI.
- README: qué hace, cómo correrlo, decisiones.
- Sin secretos en el repositorio.
- Una función difícil explicada con claridad.

## Puntos que no debes omitir
- Primero una rebanada vertical completa, luego lo demás.
- Mide con usuarios reales si puedes: alguien del rubro vale oro.
- Documenta lo que decidiste no hacer.

! Error común: pasar meses puliendo sin publicar nada. Sube la primera versión en la primera semana.`,
  links: [['m11.stories', 'el proyecto se organiza en historias'], ['m13.styles', 'la arquitectura separa dominio e infraestructura'], ['m14.unit', 'el dominio se prueba sin base de datos'], ['m15.cicd', 'cada cambio se despliega solo'], ['m17.career', 'este proyecto es tu carta de presentación']],
  read: 'Hunt y Thomas, *The Pragmatic Programmer*; Newport, *So Good They Can\'t Ignore You*.',
  terms: [
    ['Rebanada vertical inicial', 'primera función que recorre toda la pila hasta producción', ['Registrar un vehículo desde la pantalla hasta la base y desplegarlo.', 'Se demuestra que todas las piezas se conectan.', 'Se detectan problemas de despliegue el primer día.']],
    ['README', 'documento de entrada de un repositorio', ['Explica qué hace y cómo ejecutarlo.', 'Es lo primero que lee quien evalúa.', 'Incluye capturas y enlace al sitio.']],
    ['Modelo de datos', 'definición de entidades, atributos y relaciones', ['Vehiculo, Revision y Chofer con sus claves.', 'Se dibuja antes de crear las tablas.', 'Se revisa contra las historias de usuario.']],
    ['Registro de decisiones', 'documentos cortos con las decisiones y su motivo', ['Por qué PostgreSQL y no MongoDB.', 'Un ADR en la carpeta docs.', 'Permite defender la decisión en una entrevista.']],
    ['Prueba de usuario', 'observar a alguien real usando el producto', ['Un revisor no encuentra cómo registrar y descubres un problema.', 'Se pide pensar en voz alta.', 'Cinco personas encuentran la mayor parte de los problemas.']],
    ['Demo', 'presentación breve del producto funcionando', ['En cinco minutos se muestra un flujo real.', 'Se empieza por el problema que resuelve.', 'Se explica una decisión técnica difícil.']],
    ['Plan de reversión', 'procedimiento para volver a una versión estable', ['Vercel permite volver a un despliegue anterior.', 'Se ensaya antes del lanzamiento.', 'Una migración tiene su camino de regreso.']]
  ],
  q: [
    { o: 'Ordena el trabajo del proyecto.', s: ['Entender el problema con usuarios', 'Escribir historias y modelo de datos', 'Crear repositorio y despliegue inicial', 'Construir rebanadas verticales con pruebas', 'Agregar seguridad y observabilidad', 'Presentar y aprender'], e: 'Producción desde muy temprano.', l: 2 },
    ['¿Cuándo haces el primer despliegue?', 'En los primeros días, aunque sea mínimo', ['Al terminar todo', 'Nunca, solo local', 'Después de un año'], 'Reduce el riesgo de integración.', 3],
    ['Quieres agregar IA, chat, pagos y mapas antes de tener el registro básico. ¿Qué haces?', 'Terminar primero el flujo principal y dejar el resto en el backlog', ['Agregar todo', 'Abandonar', 'Cambiar de proyecto'], 'Es el exceso de alcance típico.', 3],
    ['¿Dónde pones la regla "no se admite un vehículo que ya está en el patio"?', 'En el dominio, con prueba, además de una restricción en la base', ['Solo en el navegador', 'Solo en un comentario', 'En el README'], 'Defensa en profundidad.', 4],
    ['¿Qué impresiona más a quien revisa tu proyecto?', 'Que funcione en público, con pruebas y decisiones explicadas', ['Muchas tecnologías sin razón', 'Más líneas de código', 'Un diseño sin función'], 'Demuestra criterio.', 4],
    { c: 'Implementa «ingreso(patio, placa, dia)». Lanza Error si la placa sigue en el patio. Devuelve la lista nueva.', f: 'ingreso', p: ['patio', 'placa', 'dia'], t: [[[[], 'A', 1], [{ placa: 'A', ingreso: 1, salida: null }]], [[[{ placa: 'A', ingreso: 1, salida: 2 }], 'A', 3], [{ placa: 'A', ingreso: 1, salida: 2 }, { placa: 'A', ingreso: 3, salida: null }]]], sol: "  if (patio.some(v => v.placa === placa && v.salida === null)) throw new Error('Ya está');\n  return [...patio, { placa, ingreso: dia, salida: null }];", l: 3 },
    { c: 'Implementa «cobro(ingreso, salida, tarifa)»: días × tarifa contando ambos extremos.', f: 'cobro', p: ['ingreso', 'salida', 'tarifa'], t: [[[10, 12, 20], 60], [[1, 1, 5], 5]], sol: '  return (salida - ingreso + 1) * tarifa;', l: 2 },
    { c: 'Implementa «pendientes(vehiculos)»: placas ordenadas de vehículos sin salida y sin revisión.', f: 'pendientes', p: ['vehiculos'], t: [[[[{ placa: 'B', salida: null, revisado: false }, { placa: 'A', salida: null, revisado: false }, { placa: 'C', salida: 2, revisado: false }]], ['A', 'B']], [[[]], []]], sol: '  return vehiculos.filter(v => v.salida === null && !v.revisado).map(v => v.placa).sort();', l: 2 },
    { c: 'Implementa «ocupacion(eventos)» con [{dia, tipo:"in"|"out"}]: devuelve el máximo de vehículos simultáneos, procesando por día y con las salidas antes que los ingresos.', f: 'ocupacion', p: ['eventos'], t: [[[[{ dia: 1, tipo: 'in' }, { dia: 2, tipo: 'in' }, { dia: 2, tipo: 'out' }]], 1], [[[{ dia: 1, tipo: 'in' }, { dia: 2, tipo: 'in' }]], 2], [[[]], 0]], sol: "  let c = 0, m = 0;\n  const e = [...eventos].sort((a, b) => a.dia - b.dia || (a.tipo === 'out' ? -1 : 1));\n  for (const x of e) { c += x.tipo === 'in' ? 1 : -1; m = Math.max(m, c); }\n  return m;", l: 4 },
    { c: 'Implementa un reporte «ingresosPorChofer(viajes)» que reciba [{chofer, monto}] y devuelva [{chofer, total}] ordenado de mayor a menor total.', f: 'ingresosPorChofer', p: ['viajes'], t: [[[[{ chofer: 'A', monto: 1 }, { chofer: 'B', monto: 5 }, { chofer: 'A', monto: 1 }]], [{ chofer: 'B', total: 5 }, { chofer: 'A', total: 2 }]], [[[]], []]], sol: '  const t = {};\n  for (const v of viajes) t[v.chofer] = (t[v.chofer] || 0) + v.monto;\n  return Object.keys(t).map(c => ({ chofer: c, total: t[c] })).sort((a, b) => b.total - a.total);', l: 4 }
  ],
  gen: function (g) {
    var m = [['Diseñar las tablas de vehículos y revisiones.', 'Bases de datos'], ['Decidir monolito o servicios.', 'Arquitectura'], ['Hacer que cada push corra las pruebas.', 'DevOps'], ['Escribir las historias con criterios.', 'Requisitos'], ['Guardar las contraseñas con hash.', 'Seguridad'], ['Verificar la regla de tarifa.', 'Pruebas'], ['Hacer que funcione en celular.', 'Desarrollo web'], ['Ordenar el trabajo en sprints.', 'Procesos']];
    var o = ['Bases de datos', 'Arquitectura', 'DevOps', 'Requisitos', 'Seguridad', 'Pruebas', 'Desarrollo web', 'Procesos'];
    m.forEach(function (x) { g.mcq(1, '¿Qué módulo del curso aplicas?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Corresponde a ' + x[1] + '.'); });
    g.times(10, function (R) { var a = R.int(1, 25), d = R.int(0, 9), t = R.pick([15, 20, 25]); g.input(2, 'Un vehículo entra el día ' + a + ' y sale el día ' + (a + d) + ' con tarifa de S/ ' + t + ' por día, contando ambos días. ¿Cuánto paga?', (d + 1) * t, (d + 1) + ' días × ' + t + '.'); });
  } });

S('m17', 'm17.career', { title: 'Carrera, entrevistas y aprendizaje continuo',
  ask: '¿Qué concepto de carrera aplica?',
  lesson: `
> **La idea en simple.** Esta carrera es una maratón en la que la ruta cambia. Las tecnologías pasan, pero los fundamentos que acabas de estudiar te permiten aprender la siguiente en semanas.

## Roles comunes
| Rol | Se enfoca en |
| Frontend | interfaz y experiencia |
| Backend | APIs, datos y lógica |
| Full stack | ambos lados |
| DevOps o SRE | entrega y confiabilidad |
| QA | calidad y automatización |
| Datos o ML | análisis y modelos |
| Seguridad | proteger sistemas |
| Móvil | Android, iOS y multiplataforma |

## Niveles
Junior aprende a resolver tareas con guía. Semi-senior resuelve solo. Senior decide y multiplica a otros. Más allá hay dos caminos: técnico (staff) o gestión.

## Entrevistas técnicas
1. Código: estructuras de datos y algoritmos.
2. Diseño de sistemas (nivel medio en adelante).
3. Conductual: método **STAR**: Situación, Tarea, Acción y Resultado.

Al resolver: aclara dudas, piensa en voz alta, parte con lo simple, prueba casos límite y analiza la complejidad.

## Tu portafolio
- 2 o 3 proyectos reales y desplegados, mejor que 20 tutoriales.
- GitHub con README claros y commits limpios.
- Contribuir a código abierto.
- Escribe lo que aprendes.
- El inglés técnico abre muchísimas puertas.

## Cómo aprender para siempre
Lo que dice la evidencia sobre aprendizaje:
- **Recuperación activa:** intentar recordar, no releer.
- **Repaso espaciado:** para eso existe la sección de repaso de esta app.
- **Práctica intercalada:** mezcla temas; cuesta más y se recuerda mejor.
- **Enseña a otro:** técnica Feynman.
- **Proyectos propios:** aplicar es lo que une.

## Habilidades humanas
Comunicar por escrito, pedir ayuda bien (qué intenté, qué esperaba, qué pasó), recibir críticas de código sin tomarlo personal y negociar alcance.

## Puntos que no debes omitir
- El **síndrome del impostor** es común, incluso en gente experimentada.
- Cuida tu descanso: el agotamiento baja la calidad del trabajo.
- Elige empresas donde puedas aprender de otras personas.
- Las redes de contactos abren más puertas que los formularios.

! Error común: el "infierno de los tutoriales". Si solo sigues pasos, sientes que aprendes, pero no puedes construir solo. Cierra el video y construye.`,
  links: [['m17.capstone', 'tu proyecto es tu prueba principal'], ['m4.bigo', 'las entrevistas suelen preguntar complejidad'], ['m13.scale', 'el diseño de sistemas se basa en esto'], ['m7.git', 'tu perfil de GitHub es tu currículum técnico']],
  read: 'McDowell, *Cracking the Coding Interview*; Oakley, *A Mind for Numbers*; Xu, *System Design Interview*.',
  terms: [
    ['Recuperación activa', 'intentar recordar sin mirar para reforzar la memoria', ['Cierras el libro y escribes lo que recuerdas.', 'Resuelves ejercicios en vez de releer.', 'Usas tarjetas de preguntas.']],
    ['Repaso espaciado', 'repasar a intervalos cada vez mayores', ['Revisas hoy, en 3 días y en una semana.', 'Anki programa las tarjetas.', 'Se repasa justo cuando se empieza a olvidar.']],
    ['Práctica intercalada', 'mezclar temas al practicar', ['Hacer SQL, algoritmos y redes en una sola sesión.', 'Cuesta más, pero se distinguen mejor los problemas.', 'Evita practicar solo una cosa por bloque.']],
    ['Técnica Feynman', 'explicar un tema en palabras simples para detectar lagunas', ['Le explicas la recursión a un amigo.', 'Donde te trabas, vuelves al material.', 'Si no lo puedes simplificar, no lo entiendes.']],
    ['Método STAR', 'estructura para responder preguntas de experiencia', ['Situación, tarea, acción y resultado.', 'Se cuenta un conflicto con hechos.', 'Se termina con un resultado medible.']],
    ['Infierno de tutoriales', 'seguir cursos sin lograr construir nada solo', ['Terminas 10 cursos y no puedes hacer algo desde cero.', 'Copias mientras el instructor escribe.', 'Se sale de ahí con un proyecto propio.']],
    ['Síndrome del impostor', 'sentir que no mereces tus logros a pesar de la evidencia', ['Crees que te descubrirán en cualquier momento.', 'Atribuyes tu éxito a la suerte.', 'Aparece incluso en gente muy experimentada.']]
  ],
  q: [
    { o: 'Ordena cómo abordar un problema en una entrevista.', s: ['Aclarar requisitos y ejemplos', 'Plantear una solución simple', 'Mejorarla y explicar la complejidad', 'Escribir el código', 'Probar con casos límite'], e: 'Lo que evalúan es cómo piensas.', l: 2 },
    ['¿Qué estudia mejor?', 'Hacer ejercicios y explicar sin mirar', ['Releer y subrayar', 'Ver videos a doble velocidad', 'Copiar apuntes'], 'La recuperación activa supera a la relectura.', 2],
    ['Haces una pregunta a un colega. ¿Cuál es la mejor forma?', 'Qué intenté, qué esperaba, qué pasó y el error exacto', ['"No funciona"', '"¿Me lo puedes hacer?"', 'Una captura borrosa sin contexto'], 'Respeta su tiempo y agiliza la ayuda.', 3],
    ['¿Qué pesa más para un primer trabajo?', 'Pocos proyectos reales y bien explicados', ['20 certificados sin proyectos', 'Tener el teclado más caro', 'Saber todas las tecnologías'], 'Demuestra que sabes terminar.', 3],
    ['En una entrevista no sabes la respuesta. ¿Qué haces?', 'Decirlo, razonar en voz alta y pedir una pista', ['Inventar', 'Quedarte callado', 'Abandonar la entrevista'], 'Se evalúa cómo piensas ante lo desconocido.', 4],
    { c: 'Programa repasos: «proximoRepaso(aciertos)» devuelve días hasta el próximo repaso: [1, 3, 7, 16, 35] según aciertos seguidos; con más de 4, 35.', f: 'proximoRepaso', p: ['aciertos'], t: [[[0], 1], [[2], 7], [[9], 35]], sol: '  return [1, 3, 7, 16, 35][Math.min(aciertos, 4)];', l: 2 },
    { c: 'Pregunta clásica: «dosSumaIndices(l, t)» devuelve los índices [i, j] con i < j de los números que suman t.', f: 'dosSumaIndices', p: ['l', 't'], t: [[[[2, 7, 11], 9], [0, 1]], [[[3, 2, 4], 6], [1, 2]]], sol: '  const m = new Map();\n  for (let j = 0; j < l.length; j++) {\n    if (m.has(t - l[j])) return [m.get(t - l[j]), j];\n    m.set(l[j], j);\n  }\n  return null;', l: 3 },
    { c: 'Pregunta clásica: «validarParentesis(s)» con solo ( y ).', f: 'validarParentesis', p: ['s'], t: [[['(())'], true], [[')('], false], [['('], false]], sol: "  let c = 0;\n  for (const x of s) {\n    c += x === '(' ? 1 : -1;\n    if (c < 0) return false;\n  }\n  return c === 0;", l: 3 },
    { c: 'Pregunta clásica: «subcadenaSinRepetir(s)»: longitud de la subcadena más larga sin caracteres repetidos, en O(n).', f: 'subcadenaSinRepetir', p: ['s'], t: [[['abcabcbb'], 3], [['bbbb'], 1], [[''], 0], [['pwwkew'], 3]], sol: '  const u = new Map();\n  let i = 0, m = 0;\n  for (let j = 0; j < s.length; j++) {\n    if (u.has(s[j]) && u.get(s[j]) >= i) i = u.get(s[j]) + 1;\n    u.set(s[j], j);\n    m = Math.max(m, j - i + 1);\n  }\n  return m;', h: 'Ventana deslizante con un Map de última posición.', l: 4 },
    { c: 'Pregunta clásica: «intervalos(l)» une intervalos [a, b] solapados y los devuelve ordenados.', f: 'intervalos', p: ['l'], t: [[[[[1, 3], [2, 6], [8, 10]]], [[1, 6], [8, 10]]], [[[]], []], [[[[1, 4], [4, 5]]], [[1, 5]]]], sol: '  const s = [...l].sort((a, b) => a[0] - b[0]), r = [];\n  for (const [a, b] of s) {\n    const u = r[r.length - 1];\n    if (u && a <= u[1]) u[1] = Math.max(u[1], b);\n    else r.push([a, b]);\n  }\n  return r;', l: 4 }
  ],
  gen: function (g) {
    var r = [['Diseña interfaces y cuida la experiencia.', 'Frontend'], ['Diseña APIs y modela datos.', 'Backend'], ['Automatiza despliegues y mantiene la confiabilidad.', 'DevOps o SRE'], ['Diseña estrategias de prueba y las automatiza.', 'QA'], ['Entrena modelos y analiza datos.', 'Datos o ML'], ['Busca vulnerabilidades y las previene.', 'Seguridad'], ['Construye apps para Android e iOS.', 'Móvil']];
    var o = r.map(function (x) { return x[1]; });
    r.forEach(function (x) { g.mcq(1, '¿Qué rol hace esto principalmente?\n' + x[0], x[1], g.R.sample(o.filter(function (y) { return y !== x[1]; }), 3), 'Corresponde a ' + x[1] + '.'); });
    g.times(6, function (R) { var e = R.int(0, 4), d = [1, 3, 7, 16, 35][e]; g.input(2, 'Con intervalos 1, 3, 7, 16 y 35 días, ¿en cuántos días repasas tras ' + e + ' aciertos seguidos?', d, 'Corresponde a ' + d + ' días.'); });
  } });
})();
