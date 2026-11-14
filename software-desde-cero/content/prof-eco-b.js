(function () {
var S = SDC.S;

S('eco', 'eco.biz', { title: 'Modelos de negocio y métricas de producto de software',
  ask: '¿Qué dicen estas métricas sobre la salud del producto y del negocio?',
  lesson: `
> **La idea en simple.** Un software excelente que nadie paga desaparece. Entender cómo gana dinero un producto de software, qué cuesta conseguir y retener a cada cliente, y qué métricas anticipan si el negocio funciona, permite al ingeniero tomar mejores decisiones técnicas: qué construir primero, cuánto invertir en rendimiento, cuándo una función vale su costo. También es indispensable si algún día quieres lanzar tu propio producto.

## Cómo se gana dinero con software
- **Licencia perpetua:** se paga una vez por una versión (el modelo clásico de Microsoft Office en caja). Ingresos grandes y desiguales, ligados a lanzar versiones nuevas.
- **Software como servicio (SaaS):** suscripción mensual o anual por usar el software alojado por el proveedor. Ingresos **recurrentes** y predecibles; el proveedor carga con la infraestructura y la operación. Es el modelo dominante hoy (Salesforce, que lo popularizó desde 1999, Slack, la mayoría de las aplicaciones empresariales).
- **Uso** (*pay as you go*): se paga por lo consumido, como la nube (por hora de servidor o por gigabyte) o las API (por llamada o por millón de tokens).
- **Freemium:** una versión gratuita con límites y una de pago con más capacidad o funciones. Funciona si la versión gratuita atrae a muchos y una fracción (a menudo entre el 2 % y el 5 %) se convierte en cliente de pago.
- **Mercados y comisiones:** la plataforma cobra un porcentaje de cada transacción (tiendas de aplicaciones, plataformas de pago, delivery).
- **Publicidad:** el usuario no paga; pagan los anunciantes por su atención. Implica incentivos de diseño (tiempo en pantalla, datos personales) que conviene reconocer.
- **Código abierto con negocio:** el software es libre y se cobra por la versión administrada en la nube, el soporte o funciones empresariales (Red Hat, GitLab, MongoDB).
- **Desarrollo a medida y consultoría:** se cobra por proyecto o por hora. Es como empiezan muchas empresas de software en el Perú: ingresos inmediatos pero que no escalan sin contratar más personas.

## Las métricas de un SaaS
| Métrica | Qué es | Ejemplo |
|---|---|---|
| MRR | ingreso recurrente mensual | 120 clientes × 250 soles = 30 000 soles |
| Churn | porcentaje de clientes (o ingresos) que se pierde por mes | 3 clientes de 120 = 2,5 % |
| ARPA | ingreso promedio por cuenta | 250 soles |
| CAC | costo de adquirir un cliente: ventas y marketing ÷ clientes nuevos | 12 000 ÷ 10 = 1200 soles |
| LTV | valor del cliente en su vida: margen mensual ÷ churn | (250 × 80 %) ÷ 2,5 % = 8000 soles |
| LTV/CAC | cuánto rinde lo invertido en conseguir clientes | 8000 ÷ 1200 ≈ 6,7 |
| Recuperación del CAC | meses de margen para recuperar el CAC | 1200 ÷ 200 = 6 meses |
Reglas prácticas difundidas por inversores de SaaS (David Skok, entre otros): un LTV/CAC mayor que 3 y una recuperación del CAC en menos de 12 meses indican un modelo sano. El **churn** es la métrica más traicionera: un 5 % mensual parece pequeño, pero significa perder casi la mitad de los clientes en un año (0,95¹² ≈ 0,54). Por eso reducir el abandono suele valer más que conseguir clientes nuevos.
~~~js
function metricasSaas({ clientes, precio, margen, perdidos, gastoAdquisicion, nuevos }) {
  const mrr = clientes * precio;
  const churn = perdidos / clientes;
  const ltv = (precio * margen) / churn;
  const cac = gastoAdquisicion / nuevos;
  return { mrr, churn, ltv: Math.round(ltv), cac, ltvCac: +(ltv / cac).toFixed(1), mesesRecuperacion: +(cac / (precio * margen)).toFixed(1) };
}
console.log(metricasSaas({ clientes: 120, precio: 250, margen: 0.8, perdidos: 3, gastoAdquisicion: 12000, nuevos: 10 }));
// { mrr: 30000, churn: 0.025, ltv: 8000, cac: 1200, ltvCac: 6.7, mesesRecuperacion: 6 }
~~~

## Métricas de producto
Además del dinero, un producto se mide por cómo lo **usan**:
- **Activación:** porcentaje de usuarios nuevos que llegan al "momento de valor" (en PatioApp, registrar la primera salida con comprobante). Si no se activan, no se quedan.
- **Retención por cohortes:** de los clientes que empezaron en enero, ¿cuántos siguen activos a los 1, 3 y 6 meses? Las **cohortes** (grupos que empezaron en el mismo periodo) muestran si el producto mejora: si las cohortes recientes retienen más que las antiguas, los cambios funcionan.
- **Usuarios activos** diarios o mensuales y su cociente (DAU/MAU), que indica qué tan habitual es el uso.
- **Adopción de funciones:** qué porcentaje usa cada función. Muchas funciones construidas casi no se usan; un estudio citado con frecuencia del Standish Group (2002) estimó que el 45 % de las funciones de los sistemas que analizó nunca se usaba.
El marco **AARRR** de Dave McClure (2007), apodado "métricas pirata" (adquisición, activación, retención, recomendación, ingresos), ordena estas métricas como un embudo.

## Ajuste producto-mercado
Marc Andreessen definió en 2007 el **ajuste producto-mercado** (*product-market fit*) como "estar en un buen mercado con un producto que puede satisfacerlo". Antes de lograrlo, casi todo el esfuerzo debe ir a aprender qué necesita el mercado (lo que Eric Ries llamó en *The Lean Startup*, 2011, el ciclo construir-medir-aprender con un **producto mínimo viable**). Después, a escalar. Un error clásico es escalar (contratar ventas, optimizar la infraestructura para millones de usuarios) antes de tener el ajuste. Para el ingeniero, esto significa que en una etapa temprana el código debe ser fácil de **cambiar**, no optimizado para una escala que quizás nunca llegue.

## Precios
Fijar precios es una decisión de producto, no solo financiera. Tres enfoques: por **costo** (costo más un margen, simple pero ignora el valor), por **competencia** (lo que cobran otros) y por **valor** (una fracción del valor que el cliente obtiene: si PatioApp ahorra 3000 soles al mes a un patio, cobrar 300 es razonable). Los planes por niveles suelen diferenciarse por una **métrica de valor** que crece con el beneficio del cliente: número de sedes, espacios o comprobantes emitidos, no por funciones arbitrarias.

## Ejemplo resuelto: ¿más ventas o menos abandono?
PatioApp tiene 120 patios clientes a 250 soles al mes, un margen del 80 %, un churn mensual del 4 % y un CAC de 1500 soles. La gerencia debe elegir entre contratar un vendedor (6000 soles al mes, unos 5 clientes nuevos al mes) o dedicar un ingeniero tres meses a resolver las causas del abandono, que según las entrevistas de salida son la caída del servicio en los cortes de internet y la falta de reportes para SUNAT.
1. **Situación actual:** LTV = 200 ÷ 0,04 = 5000 soles; LTV/CAC = 3,3: aceptable, pero el abandono se lleva 4,8 clientes al mes.
2. **Opción ventas:** 5 clientes nuevos al mes casi solo compensan las 4,8 bajas; el crecimiento neto es casi nulo.
3. **Opción retención:** si el churn baja al 2 %, el LTV sube a 10 000 soles, la base deja de perder unos 2,4 clientes al mes y cada cliente nuevo vale el doble.
4. **Decisión:** primero retención (modo sin conexión y reportes), después ventas. Seis meses más tarde, con churn del 2,2 % medido en cohortes, se contrata al vendedor, y ahora cada cliente que consigue rinde el doble.`,
  links: [['eco.money', 'valor del dinero en el tiempo y costo total de propiedad'], ['hci.research', 'investigar por qué los clientes se van'], ['m12.product', 'gestión de producto y priorización']],
  read: 'Ries, *The Lean Startup* (2011); Croll y Yoskovitz, *Lean Analytics* (2013); Skok, "SaaS Metrics 2.0" (forentrepreneurs.com).',
  terms: [
    ['SaaS', 'modelo en el que se paga una suscripción por usar software alojado y operado por el proveedor', ['Ingreso recurrente.', 'Salesforce.', 'Nube.']],
    ['MRR', 'ingreso recurrente mensual de un negocio de suscripciones', ['Clientes × precio.', 'Predecible.', 'Crecimiento.']],
    ['Churn', 'proporción de clientes o ingresos que se pierde en un periodo', ['5 % mensual ≈ 46 % anual.', 'Entrevistas de salida.', 'Cohortes.']],
    ['CAC', 'costo de adquirir un cliente nuevo', ['Ventas y marketing ÷ nuevos.', 'Recuperación en meses.', 'Frente al LTV.']],
    ['LTV', 'valor que aporta un cliente durante toda su relación con el producto', ['Margen ÷ churn.', 'LTV/CAC > 3.', 'Retención.']],
    ['Cohorte', 'grupo de usuarios que empezó en el mismo periodo, usado para analizar la retención', ['Clientes de enero.', 'Retención a 3 meses.', 'Comparar mejoras.']],
    ['Ajuste producto-mercado', 'situación en la que un producto satisface bien a un buen mercado', ['Andreessen, 2007.', 'Antes de escalar.', 'Retención alta.']],
    ['Producto mínimo viable', 'versión más simple de un producto que permite aprender de clientes reales', ['Ries, 2011.', 'Construir-medir-aprender.', 'No es un producto malo.']]
  ],
  q: [
    ['¿Qué caracteriza a un modelo SaaS?', 'Suscripción recurrente por usar software alojado por el proveedor', ['Pago único por una versión', 'Ingresos solo por publicidad', 'Venta de hardware'], 'Ingresos recurrentes.', 1],
    ['Un churn mensual del 5 %, ¿qué proporción de clientes conserva aproximadamente tras un año?', 'Alrededor del 54 %', ['El 95 %', 'El 40 %', 'El 60 % exacto'], '0,95 elevado a 12.', 3],
    ['¿Cómo se calcula el LTV en su forma simple?', 'Margen mensual por cliente dividido entre el churn mensual', ['Precio por 12', 'CAC por churn', 'MRR por clientes'], 'Vida media del cliente = 1/churn.', 2],
    ['¿Qué indica un LTV/CAC de 1?', 'Que se gasta en conseguir un cliente lo mismo que deja: el modelo no es sano', ['Que el negocio es excelente', 'Que no hay clientes', 'Que el churn es cero'], 'Se busca más de 3.', 3],
    ['¿Qué muestran las cohortes?', 'Si los grupos de clientes recientes retienen mejor que los antiguos', ['El número total de usuarios', 'El precio óptimo', 'El costo de la nube'], 'Análisis de retención.', 2],
    ['¿Por qué no conviene optimizar para millones de usuarios antes del ajuste producto-mercado?', 'Porque en esa etapa importa poder cambiar rápido el producto para aprender', ['Porque es imposible', 'Porque la nube es gratis', 'Porque los usuarios no existen'], 'Escalar antes de tiempo.', 3],
    ['Con churn alto, ¿por qué reducir el abandono puede valer más que vender más?', 'Porque las bajas anulan las altas y cada cliente retenido aumenta el LTV de todos', ['Porque vender es ilegal', 'Porque el CAC es cero', 'Porque el MRR no importa'], 'Balde con agujeros.', 4],
    { tf: 'En un modelo freemium, se espera que la mayoría de los usuarios gratuitos se conviertan en clientes de pago.', v: false, e: 'Suele convertirse una fracción pequeña, a menudo entre 2 % y 5 %.', l: 2 },
    { tf: 'Fijar precios por valor significa cobrar una fracción del beneficio que obtiene el cliente.', v: true, e: 'Frente al precio por costo o por competencia.', l: 2 },
    { c: 'Escribe «ltv(precio, margen, churn)»: precio × margen ÷ churn, redondeado al entero.', f: 'ltv', p: ['precio', 'margen', 'churn'], t: [[[250, 0.8, 0.025], 8000], [[250, 0.8, 0.04], 5000], [[100, 0.5, 0.1], 500]], sol: '  return Math.round(precio * margen / churn);', l: 1 },
    { c: 'Escribe «retenidosTras(meses, churn)»: porcentaje de clientes que quedan tras n meses con churn mensual constante, redondeado a entero.', f: 'retenidosTras', p: ['meses', 'churn'], t: [[[12, 0.05], 54], [[12, 0.02], 78], [[1, 0.1], 90]], sol: '  return Math.round(Math.pow(1 - churn, meses) * 100);', l: 2 },
    { c: 'Escribe «retencionCohorte(inicio, activosPorMes)»: devuelve el porcentaje de retención de cada mes respecto al tamaño inicial, redondeado a entero.', f: 'retencionCohorte', p: ['inicio', 'activosPorMes'], t: [[[40, [36, 30, 28]], [90, 75, 70]], [[10, []], []]], sol: '  return activosPorMes.map(a => Math.round(a / inicio * 100));', l: 1 }
  ],
  gen: function (g) {
    var mo = [['Pagas una vez por la versión 2024 del programa', 'Licencia perpetua'], ['Pagas 250 soles al mes por usar el sistema en la nube', 'SaaS'], ['Pagas por cada millón de tokens procesados', 'Uso'], ['Usas gratis con límites y pagas por más capacidad', 'Freemium'], ['La plataforma cobra un porcentaje de cada venta', 'Comisión'], ['El código es libre y se cobra la versión administrada', 'Código abierto con negocio']];
    mo.forEach(function (m) { g.mcq(1, '¿Qué modelo de negocio es? ' + m[0], m[1], ['Licencia perpetua', 'SaaS', 'Uso', 'Freemium', 'Comisión', 'Código abierto con negocio'].filter(function (x) { return x !== m[1]; }).slice(0, 3), 'Modelos de negocio del software.'); });
    g.times(6, function (R) { var c = R.int(50, 300), p = R.pick([150, 200, 250, 300]); g.input(1, 'Hay ' + c + ' clientes que pagan ' + p + ' soles al mes. ¿Cuál es el MRR en soles?', c * p, 'Clientes por precio.'); });
    g.times(6, function (R) { var gasto = R.pick([6000, 9000, 12000, 15000]), n = R.pick([5, 6, 10, 12]); g.input(2, 'Se gastaron ' + gasto + ' soles en ventas y marketing y llegaron ' + n + ' clientes nuevos. ¿Cuál es el CAC en soles?', gasto / n, 'Gasto de adquisición entre clientes nuevos.'); });
  },
  checks: [
    ['Describe cuatro modelos de negocio de software y una ventaja de cada uno.', 'Licencia perpetua (ingreso inmediato), SaaS (recurrente y predecible), uso (paga según consumo), freemium (atrae a muchos), además de comisiones, publicidad, código abierto y consultoría.'],
    ['Define MRR, churn, CAC y LTV y da las reglas prácticas de un SaaS sano.', 'Ingreso mensual recurrente, pérdida de clientes, costo de adquirir uno y su valor total; LTV/CAC mayor que 3 y recuperación del CAC en menos de 12 meses.'],
    ['¿Qué miden la activación y la retención por cohortes?', 'Si los usuarios llegan al momento de valor y si los grupos recientes se quedan más que los antiguos.'],
    ['¿Qué es el ajuste producto-mercado y qué implica para el código en una etapa temprana?', 'Un producto que satisface bien a un buen mercado; antes de lograrlo, el código debe ser fácil de cambiar, no optimizado para una escala hipotética.']
  ],
  cites: ['Ries, E. (2011). *The Lean Startup*. Crown Business.', 'Croll, A. y Yoskovitz, B. (2013). *Lean Analytics*. O\'Reilly.', 'Andreessen, M. (2007). The only thing that matters. pmarchive.com.', 'McClure, D. (2007). Startup Metrics for Pirates: AARRR! 500 Hats.', 'Skok, D. (2013). SaaS Metrics 2.0: A Guide to Measuring and Improving What Matters. forentrepreneurs.com.', 'Cusumano, M. (2004). *The Business of Software*. Free Press.'],
  project: { t: 'El modelo de negocio de un producto',
    goal: 'Modelar el negocio de un producto de software y decidir prioridades con sus métricas.',
    steps: ['Elige un producto (real o propio) y describe su modelo de negocio y su métrica de valor para los precios.', 'Construye una hoja o un script con MRR, churn, CAC, LTV y recuperación del CAC a partir de supuestos razonables.', 'Haz un análisis de sensibilidad: ¿qué pasa si el churn sube o baja dos puntos?', 'Diseña el análisis de retención por cohortes con datos simulados de 12 meses.', 'Recomienda si conviene invertir primero en adquisición o en retención, con números.'],
    deliver: 'El modelo, el análisis de cohortes y la recomendación escrita.' },
  hito: ['Calcula las métricas SaaS de PatioApp con supuestos explícitos y un análisis de sensibilidad del churn.', 'Define la métrica de valor de los planes de PatioApp (sedes, espacios o comprobantes) y justifica los precios.']
});
SDC.after('eco.biz', 'eco.money');

S('eco', 'eco.finops', { title: 'Costos de la nube y FinOps',
  ask: '¿Cómo se controla y reduce el costo de esta infraestructura en la nube?',
  lesson: `
> **La idea en simple.** En la nube, cada decisión técnica es también una decisión de gasto: el tamaño de un servidor, una consulta que lee de más, un registro que nadie mira, una base de datos que se olvidó encendida. El costo no llega como una compra aprobada, sino como una factura mensual que puede crecer sin que nadie lo note. **FinOps** es la práctica de que ingeniería, finanzas y negocio compartan la responsabilidad del gasto en la nube, para gastar con intención y obtener el mayor valor por cada sol.

## Cómo cobra la nube
Los proveedores (AWS, Google Cloud, Azure y otros) cobran por **consumo**, con muchas dimensiones:
- **Cómputo:** por segundo u hora de máquina virtual o contenedor, según CPU y memoria; por invocación y milisegundo en funciones sin servidor.
- **Almacenamiento:** por gigabyte al mes, con precios muy distintos según la clase (acceso frecuente, infrecuente, archivo).
- **Bases de datos administradas:** por instancia encendida, almacenamiento, respaldos y, en algunas, por operación.
- **Transferencia de datos:** la **salida** hacia internet (*egress*) se cobra, y suele ser cara; la entrada casi siempre es gratis; el tráfico entre zonas o regiones también cuesta.
- **Servicios gestionados:** colas, registros, monitoreo, balanceadores, direcciones IP públicas, cada uno con su tarifa.
La consecuencia es que la factura depende de la **arquitectura**. Un sistema que copia datos entre regiones, guarda cada registro de depuración durante un año o mantiene servidores grandes encendidos de noche puede costar varias veces más que uno equivalente bien diseñado.

## El ciclo de FinOps
La FinOps Foundation (parte de la Linux Foundation desde 2020) describe tres fases que se repiten:
1. **Informar:** saber en qué se gasta y quién. Requiere **etiquetar** todos los recursos (equipo, proyecto, entorno) y paneles que muestren el costo por servicio y por equipo. Sin visibilidad no hay responsabilidad: si la factura es "de la empresa", no es de nadie.
2. **Optimizar:** reducir el costo sin perder lo que importa (ver técnicas abajo).
3. **Operar:** incorporar el costo a las decisiones diarias: presupuestos por equipo, alertas de anomalías, revisión del costo en el diseño de cada función, metas de **costo unitario**.
El **costo unitario** es la métrica más útil: no "gastamos 9000 soles al mes", sino "cuesta 0,12 soles atender una estadía" o "1,8 soles por cliente activo al mes". Si el negocio crece al doble y la factura también, todo va bien; si la factura crece más rápido que el negocio, hay un problema.

## Técnicas de optimización
- **Apagar lo que no se usa:** entornos de desarrollo y prueba encendidos de noche y los fines de semana (128 de las 168 horas semanales están fuera del horario laboral), volúmenes de disco huérfanos, instantáneas viejas, direcciones IP sin usar, balanceadores sin tráfico.
- **Ajustar el tamaño** (*rightsizing*): muchas máquinas usan menos del 20 % de su CPU. Las métricas de uso real indican el tamaño adecuado.
- **Escalar con la demanda:** escalado automático para tener muchas instancias en las horas punta y pocas de madrugada; funciones sin servidor para cargas esporádicas.
- **Compromisos de uso:** las **instancias reservadas** y los **planes de ahorro** dan descuentos de entre 30 % y 70 % a cambio de comprometerse a un consumo durante uno o tres años. Convienen para la carga base estable, no para lo variable.
- **Capacidad interrumpible** (*spot*, *preemptible*): máquinas sobrantes del proveedor con descuentos de hasta 90 %, que pueden ser retiradas con poco aviso. Ideales para trabajos por lotes que pueden reintentarse.
- **Ciclo de vida del almacenamiento:** mover automáticamente los archivos viejos (comprobantes de hace más de un año, que la ley obliga a conservar pero casi nunca se leen) a clases de archivo mucho más baratas.
- **Reducir la transferencia:** una CDN delante del contenido, compresión, no mover datos entre regiones sin necesidad.
- **Registros y métricas con criterio:** niveles de registro adecuados, retención corta para lo de depuración y muestreo de trazas; la observabilidad puede llegar a costar tanto como la aplicación.
- **Arquitectura:** a veces la mayor optimización es de diseño: una caché que evita miles de consultas, un índice que reduce el tamaño de la base de datos necesaria, un trabajo nocturno que reemplaza un servicio siempre encendido.

## Nube, servidores propios o un proveedor simple
La nube no siempre es lo más barato. Para cargas **estables y grandes**, los servidores propios o alquilados pueden costar menos: en 2023, la empresa 37signals (creadora de Basecamp) anunció que dejaba AWS y estimó un ahorro de unos 7 millones de dólares en cinco años. Para cargas **variables, pequeñas o inciertas**, la nube gana por su elasticidad y por no requerir personal de infraestructura. Entre ambos extremos, proveedores simples de precio fijo (Hetzner, DigitalOcean, plataformas como Render o Railway) suelen ser los más convenientes para proyectos pequeños. La decisión se toma con el **costo total de propiedad**, incluyendo el tiempo de las personas, no solo la factura.

## Errores que generan facturas sorpresa
- Un bucle que invoca una función sin servidor a sí misma, o un reintento infinito.
- Claves de acceso filtradas en un repositorio público, usadas por terceros para minar criptomonedas en tu cuenta en cuestión de minutos.
- Un registro de depuración activado en producción que escribe gigabytes por hora.
- Datos públicos muy descargados sin CDN, que generan una enorme transferencia de salida.
Defensas: **alertas de presupuesto** desde el primer día (al 50 %, 80 % y 100 % del esperado), detección de anomalías, cuotas y límites por servicio, y claves de acceso con mínimo privilegio que nunca se guardan en el código.

## Ejemplo resuelto: la factura de PatioApp se duplicó
La factura mensual en la nube pasó de 4200 a 8900 soles en tres meses, mientras los clientes crecieron un 15 %.
1. **Informar:** se etiquetan los recursos y el panel muestra que el aumento se concentra en tres partidas: registros (2100 soles), transferencia de salida (1400) y un entorno de pruebas (900).
2. **Registros:** el nivel de depuración quedó activo en producción tras un incidente; se vuelve a «info», se reduce la retención de 90 a 14 días y se muestrean las trazas. Ahorro: 1700 soles al mes.
3. **Transferencia:** los PDF de comprobantes se descargaban directamente desde el almacenamiento, sin CDN y sin compresión; se agrega CDN con caché. Ahorro: 1100 soles.
4. **Entorno de pruebas:** se apaga automáticamente de 20:00 a 7:00 y los fines de semana. Ahorro: unos 600 soles.
5. **Base estable:** las dos instancias de la API que nunca bajan se cubren con un plan de ahorro de un año, con 35 % de descuento.
6. **Operar:** costo unitario como métrica (de 0,21 a 0,10 soles por estadía), alertas de presupuesto y una revisión mensual de costos con el equipo. La factura queda en 4600 soles con más clientes que antes.`,
  links: [['eco.money', 'costo total de propiedad y costo de oportunidad'], ['m15.cloud', 'modelos de servicio en la nube'], ['m9.deploy', 'CDN, caché y funciones sin servidor']],
  read: 'Storment y Fuller, *Cloud FinOps* (2.ª ed., 2023); FinOps Foundation, "FinOps Framework" (finops.org); calculadoras de precios de AWS, Google Cloud y Azure.',
  terms: [
    ['FinOps', 'práctica que comparte entre ingeniería, finanzas y negocio la responsabilidad del gasto en la nube', ['Informar, optimizar, operar.', 'FinOps Foundation.', 'Costo unitario.']],
    ['Costo unitario', 'costo de la infraestructura por unidad de negocio, como por cliente o por transacción', ['Soles por estadía.', 'Frente al crecimiento.', 'Métrica clave.']],
    ['Etiquetado', 'asignación de etiquetas a los recursos para atribuir el costo a equipos y proyectos', ['Tags.', 'Visibilidad.', 'Responsabilidad.']],
    ['Ajuste de tamaño', 'elegir el tamaño de los recursos según su uso real', ['Rightsizing.', 'CPU al 15 %.', 'Ahorro directo.']],
    ['Instancia reservada', 'compromiso de uso por uno o tres años a cambio de un descuento', ['Planes de ahorro.', 'Carga base.', '30 % a 70 %.']],
    ['Capacidad interrumpible', 'máquinas sobrantes con gran descuento que el proveedor puede retirar con poco aviso', ['Spot.', 'Trabajos por lotes.', 'Hasta 90 %.']],
    ['Transferencia de salida', 'datos que salen de la nube hacia internet, normalmente cobrados', ['Egress.', 'CDN.', 'Entre regiones.']],
    ['Alerta de presupuesto', 'aviso automático cuando el gasto se acerca o supera un umbral', ['50, 80, 100 %.', 'Anomalías.', 'Desde el primer día.']]
  ],
  q: [
    ['¿Qué suele cobrarse en la nube: la entrada o la salida de datos hacia internet?', 'La salida', ['La entrada', 'Ninguna', 'Ambas por igual siempre'], 'Egress.', 2],
    ['¿Por qué etiquetar los recursos?', 'Para atribuir el costo a equipos y proyectos y que alguien sea responsable', ['Para que funcionen más rápido', 'Porque es obligatorio por ley', 'Para cifrarlos'], 'Fase de informar.', 1],
    ['La factura creció 40 % y los clientes 40 %. ¿Es un problema?', 'No necesariamente: el costo unitario se mantuvo', ['Sí, siempre', 'Sí, porque la factura nunca debe crecer', 'No se puede saber nada'], 'Costo unitario.', 3],
    ['¿Para qué carga convienen las instancias reservadas?', 'Para la carga base estable que se usará todo el periodo', ['Para picos impredecibles', 'Para pruebas de un día', 'Para cualquier cosa'], 'Compromiso a cambio de descuento.', 2],
    ['¿Para qué carga conviene la capacidad interrumpible (spot)?', 'Para trabajos por lotes que pueden reintentarse', ['Para la base de datos principal', 'Para la API de cobros', 'Para el balanceador'], 'Puede ser retirada.', 3],
    ['¿Cuántas horas semanales puede estar apagado un entorno usado solo de lunes a viernes de 8 a 18?', '118', ['40', '50', '168'], '168 − 50.', 3],
    ['¿Por qué la nube no siempre es más barata que servidores propios?', 'Porque para cargas grandes y estables el pago por consumo puede superar el costo de servidores propios', ['Porque la nube es siempre más cara', 'Porque los servidores propios no necesitan personal', 'Porque la nube no escala'], 'Depende del perfil de carga.', 4],
    { tf: 'Una clave de acceso de la nube filtrada en un repositorio público puede generar una factura enorme en minutos.', v: true, e: 'Se usa para minar criptomonedas.', l: 1 },
    { tf: 'Guardar todos los registros de depuración durante un año no tiene costo relevante.', v: false, e: 'La observabilidad puede costar tanto como la aplicación.', l: 2 },
    { c: 'Escribe «costoUnitario(factura, unidades)»: costo por unidad redondeado a 2 decimales.', f: 'costoUnitario', p: ['factura', 'unidades'], t: [[[4200, 20000], 0.21], [[4600, 46000], 0.1], [[100, 3], 33.33]], sol: '  return Math.round(factura / unidades * 100) / 100;', l: 1 },
    { c: 'Escribe «ahorroApagado(costoHora, horasUso)»: ahorro semanal de apagar un recurso fuera de sus horas de uso (168 − horasUso) × costoHora, redondeado a 2 decimales.', f: 'ahorroApagado', p: ['costoHora', 'horasUso'], t: [[[2, 50], 236], [[1.5, 168], 0], [[0.75, 60], 81]], sol: '  return Math.round((168 - horasUso) * costoHora * 100) / 100;', l: 2 },
    { c: 'Escribe «alertas(gasto, presupuesto)»: devuelve la lista de umbrales (50, 80, 100) ya alcanzados por el gasto respecto al presupuesto.', f: 'alertas', p: ['gasto', 'presupuesto'], t: [[[4000, 5000], [50, 80]], [[1000, 5000], []], [[5200, 5000], [50, 80, 100]]], sol: '  return [50, 80, 100].filter(u => gasto >= presupuesto * u / 100);', l: 1 }
  ],
  gen: function (g) {
    var te = [['Un entorno de pruebas queda encendido de noche', 'Apagar fuera de horario'], ['Un servidor usa el 12 % de su CPU todo el mes', 'Ajustar el tamaño'], ['Dos instancias siempre activas durante años', 'Plan de ahorro o instancia reservada'], ['Un trabajo nocturno que puede reintentarse', 'Capacidad interrumpible (spot)'], ['Comprobantes de hace dos años casi nunca leídos', 'Ciclo de vida a clase de archivo'], ['PDF muy descargados directamente del almacenamiento', 'CDN y caché']];
    var op = ['Apagar fuera de horario', 'Ajustar el tamaño', 'Plan de ahorro o instancia reservada', 'Capacidad interrumpible (spot)', 'Ciclo de vida a clase de archivo', 'CDN y caché'];
    te.forEach(function (t) { g.mcq(2, '¿Qué técnica de optimización conviene? ' + t[0], t[1], op.filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Optimización de costos en la nube.'); });
    g.times(6, function (R) { var f = R.pick([3000, 4500, 6000, 9000]), u = R.pick([10000, 15000, 30000, 60000]); g.input(2, 'La factura es de ' + f + ' soles y se atendieron ' + u + ' estadías. ¿Cuál es el costo unitario en soles por estadía, con 2 decimales?', Math.round(f / u * 100) / 100, 'Factura entre unidades.'); });
    g.times(4, function (R) { var h = R.pick([40, 50, 60, 70]); g.input(2, 'Un entorno se usa ' + h + ' horas a la semana. ¿Cuántas horas semanales podría estar apagado?', 168 - h, 'Una semana tiene 168 horas.'); });
  },
  checks: [
    ['¿Cómo cobra la nube y por qué la factura depende de la arquitectura?', 'Por consumo de cómputo, almacenamiento, bases, transferencia de salida y servicios; decisiones como copiar entre regiones o guardar registros de más multiplican el costo.'],
    ['Describe las fases de FinOps y el costo unitario.', 'Informar con etiquetas y paneles, optimizar y operar con presupuestos y alertas; el costo unitario relaciona el gasto con una unidad de negocio.'],
    ['Nombra cinco técnicas de optimización y cuándo usar reservas y spot.', 'Apagar lo que no se usa, ajustar tamaño, escalar con la demanda, ciclo de vida del almacenamiento y CDN; reservas para carga base estable y spot para lotes reintentables.'],
    ['¿Qué errores generan facturas sorpresa y cómo se previenen?', 'Bucles de funciones, claves filtradas, registros de depuración y descargas sin CDN; con alertas de presupuesto, anomalías, cuotas y claves con mínimo privilegio.']
  ],
  cites: ['Storment, J. R. y Fuller, M. (2023). *Cloud FinOps* (2.ª ed.). O\'Reilly.', 'FinOps Foundation (2024). *FinOps Framework*. finops.org.', 'Armbrust, M. y otros (2010). A View of Cloud Computing. *Communications of the ACM*, 53(4).', 'Hansson, D. H. (2023). We stand to save $7m over five years from our cloud exit. world.hey.com.', 'Wang, A. y Casado, M. (2021). The Cost of Cloud, a Trillion Dollar Paradox. Andreessen Horowitz.'],
  project: { t: 'Auditoría de costos en la nube',
    goal: 'Analizar y optimizar el costo de una infraestructura real o simulada.',
    steps: ['Describe la infraestructura de una aplicación (puede ser la tuya en Vercel o un diseño en una calculadora de precios) y estima su factura mensual por partida.', 'Define una métrica de costo unitario y calcúlala.', 'Identifica al menos cinco oportunidades de optimización con su ahorro estimado.', 'Diseña el etiquetado, los presupuestos y las alertas que pondrías.', 'Compara el costo con una alternativa (otro proveedor o servidores propios) usando el costo total de propiedad.'],
    deliver: 'La estimación, el plan de optimización con ahorros y la comparación.' },
  hito: ['Etiqueta los recursos de PatioApp, define el costo unitario por estadía y configura alertas de presupuesto.', 'Aplica a PatioApp el ciclo de vida de almacenamiento a los comprobantes antiguos y el apagado nocturno del entorno de pruebas.']
});
SDC.after('eco.finops', 'eco.biz');


SDC.D('eco.biz', `## Emprender software en el Perú
Quien lanza un producto propio en el Perú debe resolver temas que no son de código, pero que afectan al diseño: la **formalización** (persona natural con negocio o empresa, por ejemplo una SAC o una EIRL, con su RUC ante SUNAT), la **facturación electrónica** obligatoria (el sistema debe emitir comprobantes válidos o integrarse con un proveedor autorizado), los **medios de pago** locales (tarjetas, transferencias, billeteras como Yape y Plin, cada una con sus comisiones y formas de conciliación) y la **protección de datos personales** (registro de bancos de datos ante la autoridad cuando corresponde). Un producto pensado para pequeños negocios peruanos debe además funcionar en teléfonos de gama media, con conexiones inestables y precios en soles. Existen programas de apoyo a emprendimientos tecnológicos, como los concursos de Startup Perú de ProInnóvate, y comunidades de emprendedores en las principales universidades.`);

SDC.D('eco.finops', `## Diseñar pensando en el costo
El momento más barato para reducir el costo es el diseño. Algunas preguntas que conviene hacerse en cada revisión técnica: ¿cuántas veces se ejecutará esto por día y cuánto cuesta cada ejecución?, ¿qué datos se guardan, por cuánto tiempo y en qué clase de almacenamiento?, ¿los datos cruzan regiones o salen a internet?, ¿se puede servir desde caché?, ¿qué pasa con el costo si el uso crece diez veces? Un cálculo rápido en la calculadora del proveedor, hecho antes de construir, evita sorpresas. Algunos equipos incluyen una sección de "costo estimado" en cada documento de diseño, igual que la de seguridad o la de rendimiento.

## Responsabilidad compartida
FinOps no busca que finanzas vigile a los ingenieros ni que se gaste lo mínimo, sino que cada equipo vea el costo de lo que construye y lo trate como un requisito más, junto con el rendimiento y la disponibilidad. A veces la decisión correcta es gastar **más**: una base de datos más grande que evita una caída en la quincena vale mucho más que su costo. Lo que importa es que el gasto sea una decisión consciente, ligada al valor que produce.`);
})();
