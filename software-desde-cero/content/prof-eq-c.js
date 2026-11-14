(function () {
var S = SDC.S;

S('eq', 'eq.client', { title: 'Trabajar con clientes: propuestas, alcance, contratos y cambios',
  ask: '¿Cómo manejarías esta situación con un cliente de software?',
  lesson: `
> **La idea en simple.** Mucho software se construye para un cliente: una empresa que encarga un sistema, un negocio que necesita una web, un área interna que pide una herramienta. La mayoría de los proyectos que terminan mal no fallan por el código, sino por expectativas desalineadas: el cliente esperaba una cosa, el equipo entendió otra, el alcance creció sin que nadie lo decidiera y nadie sabe cuánto falta. Esta unidad presenta cómo trabajar con clientes de forma profesional, desde la primera conversación hasta la factura.

## Descubrir antes de cotizar
El error más común es cotizar en la primera reunión. Antes de dar un precio, hace falta entender:
- **El problema de negocio**, no solo la solución que el cliente imagina ("queremos una app" casi nunca es el problema; "perdemos 20 % de las reservas porque no contestamos el teléfono" sí lo es).
- **Quiénes** usarán el sistema y quién decide y paga (no siempre son las mismas personas).
- **Restricciones:** fecha límite real y por qué, presupuesto aproximado, sistemas con los que hay que integrarse, obligaciones legales (facturación electrónica, datos personales).
- **Cómo se medirá el éxito**.
Para proyectos medianos o inciertos, una buena práctica es vender primero una **fase de descubrimiento** pagada y corta (una o dos semanas): entrevistas, revisión de procesos, prototipo y un plan. El cliente obtiene algo útil aunque no siga, y la cotización del proyecto se basa en información real.

## La propuesta y el alcance
Una **propuesta** clara contiene: el problema entendido (en palabras del cliente), la solución propuesta, el **alcance** detallado (qué se entrega), lo que **no** está incluido, los supuestos, el cronograma con hitos, el precio y la forma de pago, y qué se necesita del cliente (accesos, datos, una persona que responda en 48 horas). El documento formal del alcance suele llamarse **declaración de trabajo** (*statement of work*, SOW).
La sección "fuera del alcance" es la más importante y la más olvidada. Escribir "no incluye la aplicación móvil nativa, la integración con el sistema contable ni la migración de datos históricos anteriores a 2024" evita la mitad de los conflictos futuros. Los **supuestos** ("el cliente proveerá el certificado digital para la facturación electrónica antes del 15") explican qué pasa si algo no ocurre.

## Formas de cobrar
| Modalidad | Cómo funciona | Riesgo para quien desarrolla | Cuándo conviene |
|---|---|---|---|
| Precio fijo | un monto por un alcance cerrado | alto: si se subestimó, se pierde | alcance pequeño y bien definido |
| Tiempo y materiales | se cobra por hora o por día trabajado | bajo; el riesgo lo asume el cliente | alcance incierto o cambiante |
| Por etapas | precio fijo por fases, cada una se cotiza al terminar la anterior | moderado | proyectos medianos |
| Abono mensual (*retainer*) | un monto fijo mensual por una capacidad o un soporte | bajo | mantenimiento y mejoras continuas |
| Por valor | precio ligado al valor que genera | variable | cuando el valor es medible y grande |
Para quien empieza, el precio fijo es tentador pero peligroso: como viste en estimación, los proyectos suelen tomar más de lo estimado. Si se usa, conviene un alcance muy preciso, un margen para la incertidumbre y un procedimiento de cambios. Para calcular una tarifa por hora, hay que considerar que no todas las horas son facturables (ventas, administración, aprendizaje, vacaciones): si se quieren ingresos de 6000 soles al mes y se facturan unas 100 horas, la tarifa mínima es de 60 soles por hora antes de impuestos y gastos.

## El contrato
Un contrato protege a ambas partes. Para proyectos de software, los puntos que no deben faltar:
- **Entregables y criterios de aceptación:** cómo y en qué plazo el cliente revisa y acepta cada entrega (por ejemplo, 5 días hábiles; si no hay observaciones, se considera aceptada).
- **Precio, forma y plazos de pago**, con un adelanto (habitualmente entre 30 % y 50 % al inicio) y pagos ligados a hitos.
- **Propiedad intelectual:** quién es dueño del código. Lo habitual es que el cliente reciba los derechos sobre el código desarrollado para él al pagar, mientras el desarrollador conserva sus bibliotecas y herramientas previas. Debe quedar escrito.
- **Garantía:** por cuánto tiempo se corrigen sin costo los errores (por ejemplo, 60 días), y qué no cubre (cambios de alcance, mal uso, cambios de terceros).
- **Confidencialidad** y, si se tratan datos personales, las obligaciones de la **Ley 29733** como encargado del tratamiento.
- **Cambios:** el procedimiento para pedirlos y cómo se cotizan.
- **Terminación:** qué pasa si alguna parte quiere terminar antes.
- **Soporte y mantenimiento** después de la garantía: si está incluido o es un servicio aparte.
Para contratos importantes, conviene la revisión de un abogado.

## Gestionar los cambios
Los cambios son normales: el cliente aprende al ver el software. El problema es el **crecimiento descontrolado del alcance** (*scope creep*): pequeñas peticiones aceptadas una por una, sin decidir explícitamente, que suman semanas. La herramienta es un **procedimiento de cambios**:
1. El cliente pide el cambio por el canal acordado.
2. El equipo evalúa su impacto en tiempo, costo y riesgo.
3. Se presenta como opción: "Agregar el reporte para SUNAT toma 4 días y cuesta 2400 soles, y mueve la entrega del 15 al 21. ¿Lo incluimos ahora, lo dejamos para una segunda fase, o reemplazamos otra función de igual tamaño?"
4. El cliente decide por escrito.
5. Se actualiza el plan.
Así los cambios se convierten en decisiones de negocio del cliente, no en trabajo invisible del equipo.

## Comunicar con regularidad
La causa número uno de clientes insatisfechos es no saber qué pasa. Prácticas que la evitan: un **reporte semanal breve** (qué se hizo, qué sigue, riesgos y decisiones pendientes), **demostraciones** frecuentes del software funcionando (cada una o dos semanas) en lugar de una gran entrega al final, un único canal oficial para pedidos y decisiones, y avisar **pronto** de los problemas: una mala noticia el lunes con un plan es mucho mejor que una sorpresa el día de la entrega.

## Facturar en el Perú
Quien trabaja de forma independiente como persona natural suele emitir **recibos por honorarios electrónicos** desde el portal de SUNAT (rentas de cuarta categoría). En general, cuando el recibo supera cierto monto, la empresa que paga **retiene** un porcentaje como adelanto del impuesto a la renta (8 % en los últimos años, con montos que SUNAT actualiza), salvo que el trabajador haya obtenido la **suspensión de retenciones** por tener ingresos anuales bajo el límite. Una empresa de desarrollo (con RUC de persona jurídica) emite **facturas electrónicas** con IGV del 18 %. Las reglas tributarias cambian; antes de facturar conviene revisar la información vigente de SUNAT o consultar con un contador.

## Ejemplo resuelto: el proyecto que no terminaba
Una desarrolladora independiente aceptó hacer, por 9000 soles a precio fijo, "un sistema de reservas" para una cancha deportiva. Tres meses después, sigue agregando funciones y el cliente se niega a pagar el último 50 % "porque el sistema no está terminado".
1. **Causa:** la propuesta decía solo "sistema de reservas con pagos". No había lista de funciones, criterios de aceptación ni procedimiento de cambios. Cada pedido (torneos, membresías, reportes, recordatorios por WhatsApp) se aceptó de palabra.
2. **Resolución del conflicto:** se reúne con el cliente, lista lo entregado frente a lo que razonablemente implicaba "reservas con pagos", y propone cerrar la fase 1 con lo que funciona, cobrando el saldo, y cotizar torneos y membresías como fase 2.
3. **Para el siguiente proyecto:** fase de descubrimiento pagada de una semana; propuesta con alcance detallado, "fuera del alcance" y supuestos; contrato con criterios de aceptación (5 días hábiles), adelanto del 40 % y pagos por hitos, garantía de 60 días y procedimiento de cambios; reporte semanal y demostración cada dos semanas.
4. **Resultado:** el cliente de la cancha paga el saldo y contrata la fase 2 por etapas. El siguiente cliente, con el nuevo proceso, termina a tiempo y pide un abono mensual de mantenimiento.`,
  links: [['m11.req', 'requisitos y su obtención'], ['eq.conflict', 'negociación basada en intereses'], ['m12.est', 'estimación y su incertidumbre']],
  read: 'Weinberg, *The Secrets of Consulting* (1985); Block, *Flawless Consulting* (3.ª ed., 2011); información de SUNAT sobre recibos por honorarios electrónicos (sunat.gob.pe).',
  terms: [
    ['Fase de descubrimiento', 'etapa corta y pagada para entender el problema y planificar antes de cotizar el proyecto', ['Entrevistas.', 'Prototipo.', 'Cotización informada.']],
    ['Declaración de trabajo', 'documento que define el alcance, los entregables, los supuestos y las condiciones de un proyecto', ['SOW.', 'Fuera del alcance.', 'Supuestos.']],
    ['Precio fijo', 'modalidad en la que se cobra un monto cerrado por un alcance definido', ['Riesgo del desarrollador.', 'Alcance preciso.', 'Margen.']],
    ['Tiempo y materiales', 'modalidad en la que se cobra por el tiempo trabajado', ['Por hora.', 'Alcance incierto.', 'Riesgo del cliente.']],
    ['Criterios de aceptación', 'condiciones acordadas para que el cliente apruebe una entrega', ['5 días hábiles.', 'Contrato.', 'Evita discusiones.']],
    ['Crecimiento del alcance', 'aumento descontrolado de lo que se debe entregar sin decisión explícita', ['Scope creep.', 'Pedidos de palabra.', 'Procedimiento de cambios.']],
    ['Procedimiento de cambios', 'forma acordada de pedir, evaluar, decidir y registrar cambios al alcance', ['Impacto en tiempo y costo.', 'Decisión del cliente.', 'Por escrito.']],
    ['Recibo por honorarios electrónico', 'comprobante que emite en el Perú una persona natural por servicios independientes', ['Cuarta categoría.', 'Retención.', 'SUNAT.']]
  ],
  q: [
    ['¿Por qué no conviene cotizar en la primera reunión?', 'Porque aún no se entiende el problema, los usuarios ni las restricciones', ['Porque es de mala educación', 'Porque el cliente no tiene presupuesto', 'Porque es ilegal'], 'Descubrir antes de cotizar.', 1],
    ['¿Qué sección de la propuesta evita la mitad de los conflictos futuros?', 'Lo que está fuera del alcance', ['El logo de la empresa', 'La historia del desarrollador', 'Las tecnologías de moda'], 'Explicitar lo no incluido.', 2],
    ['¿Qué modalidad de cobro conviene con un alcance incierto?', 'Tiempo y materiales o por etapas', ['Precio fijo por todo', 'Gratis', 'Por valor siempre'], 'El riesgo se reparte o lo asume el cliente.', 2],
    ['Se quieren 6000 soles al mes facturando 100 horas. ¿Cuál es la tarifa mínima por hora antes de impuestos y gastos?', '60 soles', ['30 soles', '6000 soles', '100 soles'], '6000 / 100.', 2],
    ['El cliente pide un reporte nuevo a mitad del proyecto. ¿Qué se hace?', 'Evaluar su impacto y presentarlo como opción para que el cliente decida por escrito', ['Hacerlo gratis en silencio', 'Negarse siempre', 'Hacerlo y cobrarlo al final sin avisar'], 'Procedimiento de cambios.', 3],
    ['¿Qué debe decir el contrato sobre la propiedad intelectual?', 'Quién es dueño del código desarrollado y qué conserva el desarrollador', ['Nada, se sobreentiende', 'Que todo es del desarrollador siempre', 'Que el código es público'], 'Debe quedar escrito.', 3],
    ['¿Por qué las demostraciones frecuentes reducen el riesgo de un proyecto con cliente?', 'Porque las diferencias de expectativa aparecen pronto, cuando corregirlas es barato', ['Porque reemplazan las pruebas', 'Porque el cliente paga más', 'Porque evitan el contrato'], 'Comunicar con regularidad.', 4],
    { tf: 'Aceptar de palabra pequeños pedidos del cliente uno por uno no tiene consecuencias si cada uno es pequeño.', v: false, e: 'Suman semanas: es el crecimiento del alcance.', l: 1 },
    { tf: 'Un adelanto al inicio y pagos ligados a hitos reducen el riesgo de quien desarrolla.', v: true, e: 'Habitualmente entre 30 % y 50 % al inicio.', l: 1 },
    { c: 'Escribe «tarifaMinima(ingresoMensual, horasFacturables)»: tarifa por hora redondeada hacia arriba al entero.', f: 'tarifaMinima', p: ['ingresoMensual', 'horasFacturables'], t: [[[6000, 100], 60], [[5000, 90], 56], [[8000, 120], 67]], sol: '  return Math.ceil(ingresoMensual / horasFacturables);', l: 1 },
    { c: 'Escribe «impactoCambio(dias, tarifaDia, entrega, diasHabiles)»: devuelve { costo, nuevaEntrega } donde costo = dias × tarifaDia y nuevaEntrega es la entrega (número de día) más los días del cambio.', f: 'impactoCambio', p: ['dias', 'tarifaDia', 'entrega', 'diasHabiles'], t: [[[4, 600, 15, true], { costo: 2400, nuevaEntrega: 19 }], [[2, 500, 10, true], { costo: 1000, nuevaEntrega: 12 }]], sol: '  return { costo: dias * tarifaDia, nuevaEntrega: entrega + dias };', l: 1 },
    { c: 'Escribe «pagosPorHitos(total, porcentajes)»: devuelve la lista de montos de cada hito redondeados a 2 decimales; el último absorbe la diferencia de redondeo para que la suma sea exacta.', f: 'pagosPorHitos', p: ['total', 'porcentajes'], t: [[[9000, [40, 30, 30]], [3600, 2700, 2700]], [[1000, [33.33, 33.33, 33.34]], [333.3, 333.3, 333.4]]], sol: '  const m = porcentajes.map(p => Math.round(total * p) / 100);\n  const suma = m.slice(0, -1).reduce((s, x) => s + x, 0);\n  m[m.length - 1] = Math.round((total - suma) * 100) / 100;\n  return m;', l: 3 }
  ],
  gen: function (g) {
    var mo = [['Una landing page de 3 secciones con diseño ya aprobado', 'Precio fijo'], ['Un sistema nuevo cuyo alcance el cliente aún descubre', 'Tiempo y materiales'], ['Mejoras y soporte continuos cada mes', 'Abono mensual'], ['Un proyecto mediano en tres fases', 'Por etapas']];
    mo.forEach(function (m) { g.mcq(2, '¿Qué modalidad de cobro conviene? ' + m[0], m[1], ['Precio fijo', 'Tiempo y materiales', 'Abono mensual', 'Por etapas'].filter(function (x) { return x !== m[1]; }), 'Formas de cobrar.'); });
    var co = [['Cuánto tiempo tiene el cliente para revisar y aprobar cada entrega', 'Criterios de aceptación'], ['Quién es dueño del código al terminar', 'Propiedad intelectual'], ['Cuánto tiempo se corrigen errores sin costo', 'Garantía'], ['Cómo se piden y cotizan los cambios', 'Procedimiento de cambios'], ['Qué pasa con los datos personales de los clientes del cliente', 'Confidencialidad y protección de datos']];
    co.forEach(function (c) { g.mcq(2, '¿Qué cláusula del contrato cubre esto? ' + c[0], c[1], ['Criterios de aceptación', 'Propiedad intelectual', 'Garantía', 'Procedimiento de cambios', 'Confidencialidad y protección de datos'].filter(function (x) { return x !== c[1]; }).slice(0, 3), 'Contratos de software.'); });
    g.times(6, function (R) { var ing = R.pick([4000, 5000, 6000, 8000, 10000]), h = R.pick([80, 100, 120]); g.input(2, 'Quieres ingresos de ' + ing + ' soles al mes y facturas ' + h + ' horas. ¿Cuál es la tarifa mínima por hora (redondea hacia arriba)?', Math.ceil(ing / h), 'Ingreso entre horas facturables.'); });
  },
  checks: [
    ['¿Qué se debe entender antes de cotizar y por qué conviene una fase de descubrimiento?', 'El problema de negocio, usuarios, quién decide, restricciones y cómo se medirá el éxito; la fase pagada da información real para cotizar.'],
    ['¿Qué contiene una buena propuesta y cuáles son las formas de cobrar?', 'Problema, solución, alcance, fuera del alcance, supuestos, cronograma, precio y lo que se necesita del cliente; precio fijo, tiempo y materiales, por etapas, abono y por valor.'],
    ['Nombra cinco cláusulas esenciales de un contrato de software.', 'Entregables y aceptación, pagos, propiedad intelectual, garantía, confidencialidad y datos personales, cambios y terminación.'],
    ['¿Cómo se gestionan los cambios y la comunicación con el cliente?', 'Con un procedimiento que evalúa impacto y deja decidir al cliente por escrito; con reportes semanales, demostraciones frecuentes, un canal oficial y avisos tempranos.']
  ],
  cites: ['Weinberg, G. (1985). *The Secrets of Consulting*. Dorset House.', 'Block, P. (2011). *Flawless Consulting* (3.ª ed.). Pfeiffer.', 'Project Management Institute (2021). *A Guide to the Project Management Body of Knowledge (PMBOK Guide)* (7.ª ed.). PMI.', 'Congreso de la República del Perú (2011). Ley 29733, Ley de Protección de Datos Personales.', 'SUNAT. *Recibos por Honorarios Electrónicos*. sunat.gob.pe.'],
  project: { t: 'Del primer contacto al contrato',
    goal: 'Preparar todos los documentos para trabajar profesionalmente con un cliente.',
    steps: ['Elige un cliente real o ficticio y escribe una guía de preguntas de descubrimiento.', 'Redacta una propuesta con problema, solución, alcance, fuera del alcance, supuestos, cronograma y precio.', 'Elige y justifica la modalidad de cobro y calcula tu tarifa a partir de tus horas facturables.', 'Redacta un borrador de contrato con las cláusulas esenciales y un formulario de solicitud de cambio.', 'Diseña la plantilla del reporte semanal.'],
    deliver: 'La guía, la propuesta, el borrador de contrato, el formulario de cambios y la plantilla de reporte.' },
  hito: ['Escribe la propuesta de PatioApp para un patio cliente nuevo con alcance, fuera del alcance, supuestos y pagos por hitos.', 'Define el procedimiento de cambios y el reporte semanal que PatioApp usará con sus clientes.']
});
SDC.after('eq.client', 'eq.pm');
})();
