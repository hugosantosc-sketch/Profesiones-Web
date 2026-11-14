/* Contenido del curso — m1 · Fundamentos de la contabilidad
   Formato del mini-marcado (campo cont):
     '# '  subtítulo      '- '  lista        '1. ' lista numerada
     '> '  nota           '! '  advertencia  '$ ' fórmula
     '|'   tabla (primera fila = encabezado)
     '@'   asiento contable: primera línea título, luego cta|detalle|debe|haber
   En línea: **negrita**  ~código~
   Campos por subtema: cont, claves, preg (comprensión), ej (ejercicios),
   proy (proyecto del subtema), proyInt (proyecto integrador acumulativo), fuentes
   Ejercicios: l = nivel (1 fácil, 2 medio, 3 difícil), t = mc | num | ab
*/
(window.CURSO = window.CURSO || []).push(
{
 id:'m1', nivel:'Básico', titulo:'Fundamentos de la contabilidad',
 resumen:'Qué mide la contabilidad y con qué reglas: objeto, postulados, elementos, partida doble, plan de cuentas y documentación.',
 temas:[
 {
  id:'m1t1', titulo:'¿Qué es la contabilidad y para qué sirve?', min:20,
  cont:`La contabilidad es el sistema que **identifica, mide, registra y comunica** los hechos económicos de una empresa. La definición clásica es la de la American Accounting Association en su informe de 1966: contabilidad es "el proceso de identificar, medir y comunicar información económica que permita formular juicios y tomar decisiones informadas a quienes utilizan esa información". Fíjate en el final de la frase: la contabilidad no existe para llenar libros, existe para que alguien **decida mejor**.

No es un invento reciente ni peruano. En 1494, el fraile franciscano **Luca Pacioli** publicó en Venecia la ~Summa de Arithmetica, Geometria, Proportioni et Proportionalita~, cuyo tratado XI, ~De Computis et Scripturis~, describe por primera vez de forma impresa el método de la partida doble que usaban los mercaderes venecianos. Pacioli no lo inventó: lo documentó. Lo notable es que el método que vas a aprender en este curso es, en su núcleo lógico, el mismo de hace más de cinco siglos, y ha sobrevivido a la contabilidad de papel, la mecanizada y la digital porque su lógica es una identidad matemática, no una convención.

# El objeto de estudio
La contabilidad estudia el **patrimonio en movimiento**: qué recursos controla una entidad, de quién son esos recursos y cómo cambian por efecto de su actividad. De ahí salen las tres preguntas que ningún dueño puede contestar de memoria cuando el negocio crece:

1. **¿Qué tengo?** (activos)
2. **¿Qué debo?** (pasivos, y por diferencia, el patrimonio)
3. **¿Cuánto gané o perdí en un periodo?** (resultado)

Piensa en una bodega en Villa El Salvador. El dueño "sabe" cómo va su negocio porque ve la caja. Pero la caja miente: ahí está el dinero de un adelanto de un cliente, que no es suyo; no está la mercadería del almacén, que sí es suya; y no aparece la deuda con el distribuidor que vence en 30 días. La contabilidad ordena todo eso en un sistema donde cada hecho deja un rastro verificable.

# Las cuatro etapas del proceso contable
1. **Identificar** el hecho económico: solo entra lo que es medible en dinero y afecta el patrimonio. Que un cliente te felicite no se registra; que te pague S/ 500, sí.
2. **Medir**: asignarle un importe según una base de medición (costo histórico, valor razonable, valor neto realizable, valor presente).
3. **Registrar** en libros con partida doble, cuenta por cuenta, con la documentación que lo sustenta.
4. **Comunicar** mediante estados financieros, que son el producto final del trabajo contable.

> **Contabilidad no es teneduría de libros.** La teneduría es la etapa 3: anotar. La contabilidad incluye decidir **qué** se registra, **cómo** se mide y **qué significa** el resultado. Hoy el software hace casi toda la teneduría; lo que no hace, y por lo que se paga a un contador, es el juicio profesional de las etapas 1, 2 y 4. Hendriksen, en su ~Accounting Theory~, insiste en este punto: la teoría contable existe precisamente para justificar por qué se mide de una manera y no de otra.

# ¿Quién usa la información y para qué?
|Usuario|Qué pregunta responde|
|Dueño o socios|¿El negocio es rentable? ¿Puedo retirar utilidades?|
|Gerencia|¿Qué línea de producto deja margen? ¿Alcanza la caja del próximo mes?|
|Bancos y financieras|¿Tiene capacidad de pago? (miran ratios de liquidez y endeudamiento)|
|SUNAT|¿Declaró y pagó bien sus tributos? (contrasta libros contra declaraciones)|
|Trabajadores y sindicatos|¿Hay utilidades que repartir? ¿La empresa es estable?|
|Proveedores|¿Le vendo al crédito y a qué plazo?|
|Inversionistas potenciales|¿Cuánto vale esta empresa?|
|Estado y entidades reguladoras|Estadísticas, supervisión sectorial (SMV, SBS)|

El Marco Conceptual del IASB resuelve una tensión que surge de esa lista: como no se puede satisfacer a todos a la vez, declara que los estados financieros con propósito general se preparan pensando en los **usuarios externos que no pueden exigir información a la medida**, principalmente inversores y acreedores actuales y potenciales. La gerencia, que sí puede pedir cualquier reporte interno, no es el usuario destinatario.

# Las ramas de la profesión
- **Contabilidad financiera**: produce los estados financieros para usuarios externos. Reglas: NIIF o NIIF para las PYMES.
- **Contabilidad de costos**: calcula cuánto cuesta producir cada unidad. Imprescindible en industria, construcción y agroindustria.
- **Contabilidad de gestión**: presupuestos, análisis de desviaciones, información para decidir. Horngren la define por su destinatario: información **para adentro**, sin sujeción a normas externas, y cuyo único criterio de calidad es la utilidad para la decisión.
- **Contabilidad tributaria**: determina la base imponible de IGV, Renta y demás tributos.
- **Auditoría**: verifica que lo informado sea razonable; no produce información, la examina.
- **Contabilidad gubernamental**: la del sector público, con su propio plan de cuentas y su propio sistema (SIAF).
- **Peritaje y contabilidad forense**: contabilidad al servicio de un proceso judicial o de una investigación de fraude.

# El marco normativo peruano, en orden de jerarquía
|Nivel|Norma|Qué regula|
|Legal|Ley General de Sociedades (Ley 26887)|Obligación de llevar contabilidad y formular estados financieros|
|Legal|Código Tributario y Ley del Impuesto a la Renta|Libros obligatorios, plazos, determinación de tributos|
|Técnico|NIIF / NIIF para las PYMES, oficializadas por el CNC|Cómo reconocer, medir y presentar cada partida|
|Operativo|PCGE 2019 (R. CNC 002-2019-EF/30)|Qué código de cuenta usar para cada concepto|

El **Consejo Normativo de Contabilidad (CNC)** es el que oficializa las NIIF en el Perú. Una NIIF emitida en Londres no se aplica aquí hasta que el CNC la oficializa mediante resolución.

# Contabilidad financiera y contabilidad tributaria: dos lógicas que conviven
La primera sigue las NIIF y busca mostrar la realidad económica; la segunda sigue la Ley del Impuesto a la Renta y busca determinar el tributo. Cuando difieren, **no se elige**: se registra según NIIF y las diferencias se controlan aparte, en la conciliación de la declaración anual. Ese puente es el tema del módulo de cierre tributario.

! No confundas "llevar contabilidad" con "ser contador". El dueño de una MYPE puede registrar sus operaciones, pero los estados financieros y las declaraciones determinativas deben llevar la firma de un **contador público colegiado** cuando la norma lo exige. Es responsabilidad profesional, con consecuencias civiles y penales, no un trámite.`,
  claves:['La contabilidad identifica, mide, registra y comunica hechos económicos para que alguien decida mejor (AAA, 1966).','Pacioli documentó la partida doble en 1494; el método sigue siendo el mismo porque es una identidad matemática.','Su objeto es el patrimonio en movimiento: qué tengo, qué debo y cuánto gané.','Los estados financieros con propósito general se dirigen a usuarios externos que no pueden pedir información a la medida.','En el Perú la jerarquía va de la ley a las NIIF oficializadas por el CNC y baja al PCGE 2019 como plan de cuentas.'],
  preg:[
   {p:'¿Por qué la definición de la AAA termina en "tomar decisiones informadas" y no en "registrar operaciones"? ¿Qué cambia esa diferencia en el trabajo diario de un contador?',
    r:'Porque sitúa la utilidad de la información, no el registro, como el fin del sistema. En la práctica eso cambia tres cosas: (1) obliga a preguntarse quién va a leer el dato antes de decidir cómo registrarlo; (2) justifica el concepto de materialidad, porque perseguir céntimos que no cambian ninguna decisión es trabajo desperdiciado; y (3) explica por qué un contador que solo digita es reemplazable por software, mientras que el que interpreta y advierte no lo es.'},
   {p:'Un dueño te dice: "La contabilidad es un gasto que me obliga a hacer SUNAT". Arma una respuesta que no apele a la obligación legal.',
    r:'Que sin ella no puede saber si gana dinero. Puede ver su caja crecer y estar perdiendo (porque cobró adelantos, no pagó proveedores o tomó un préstamo), o verla caer y estar ganando (porque compró inventario o vendió al crédito). Tampoco puede saber qué producto le deja margen, si puede retirar utilidades sin descapitalizarse, ni acceder a crédito bancario, porque ningún banco presta contra una libreta. La obligación tributaria es una consecuencia del sistema, no su razón de ser.'},
   {p:'El Marco Conceptual dice que los estados financieros con propósito general se dirigen a inversores y acreedores, no a la gerencia. ¿Por qué se excluye a la gerencia si es quien más usa la información?',
    r:'Porque la gerencia tiene acceso directo a toda la información interna que quiera y puede pedir cualquier reporte a medida: no necesita que unos estados estandarizados la protejan. Los usuarios externos, en cambio, dependen de lo que la empresa decida publicar y no pueden exigir un formato propio. La norma protege al que está en desventaja informativa. Esa es también la razón de que exista la auditoría externa.'},
   {p:'¿Qué diferencia hay entre contabilidad financiera y contabilidad de gestión en cuanto a quién fija las reglas?',
    r:'La contabilidad financiera está normada por terceros (NIIF, CNC, SMV) porque su producto sale de la empresa y debe ser comparable y verificable. La contabilidad de gestión no tiene normas externas: la empresa diseña los reportes como le resulten útiles. El criterio de calidad de la primera es la representación fiel; el de la segunda, la utilidad para la decisión. Por eso un informe de gestión puede incluir proyecciones, costos de oportunidad y datos no monetarios, que jamás entrarían en un estado financiero.'},
   {p:'Si una NIIF nueva se emite en Londres en marzo, ¿desde cuándo se aplica en el Perú?',
    r:'Desde que el Consejo Normativo de Contabilidad la oficializa mediante resolución, y en la fecha que esa resolución indique. Antes de eso no es obligatoria aquí, aunque el IASB ya la haya puesto en vigencia internacionalmente. Esto importa en la práctica: una empresa peruana que reporta a una matriz extranjera puede tener que llevar dos juegos de ajustes durante el periodo en que la norma rige afuera y todavía no acá.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un cliente promete por WhatsApp que el próximo mes comprará S/ 20,000. ¿Se registra contablemente hoy?',
    o:['Sí, porque ya existe el compromiso del cliente','No, porque todavía no hay un hecho económico medible que afecte el patrimonio','Sí, pero solo en el Libro Mayor','No, salvo que el cliente sea una empresa grande'],r:1,
    s:'No se registra. Una intención no es un hecho económico: no hay transferencia de bienes, ni servicio prestado, ni derecho de cobro exigible. El ingreso se reconocerá cuando se transfiera el control del bien (NIIF 15). Sí puede registrarse en información de gestión (proyección de ventas), que no forma parte de los libros contables.'},
   {l:1,t:'mc',p:'¿Cuál de estos organismos oficializa las NIIF para su aplicación en el Perú?',
    o:['La SUNAT','El Consejo Normativo de Contabilidad (CNC)','La Superintendencia de Banca y Seguros','El Colegio de Contadores Públicos de Lima'],r:1,
    s:'El CNC, mediante resoluciones (por ejemplo la R. CNC 002-2019-EF/30 que aprobó el PCGE 2019). La SUNAT administra tributos, no emite normativa contable; la SBS regula al sistema financiero y puede dictar planes de cuentas sectoriales; el Colegio agremia y fiscaliza el ejercicio profesional, pero no emite normas contables.'},
   {l:2,t:'ab',p:'La dueña de una cafetería te dice: "Mi negocio va bien, en la caja tengo S/ 12,000 más que el mes pasado". Explica con tres situaciones concretas por qué ese aumento de caja no demuestra que haya ganado S/ 12,000.',
    s:'Tres casos típicos:\n\n1. **Cobró adelantos de clientes** (por ejemplo S/ 5,000 por un catering de noviembre). Ese dinero entró a caja pero no es ingreso todavía: es un pasivo (cuenta 122 Anticipos de clientes). Se reconocerá como ingreso cuando preste el servicio.\n2. **Dejó de pagar a sus proveedores**. Si postergó S/ 6,000 de facturas, la caja se ve mejor pero la deuda creció. El gasto ya se devengó al recibir los insumos, haya pagado o no.\n3. **Recibió un préstamo o aportó dinero propio**. Un desembolso del banco aumenta caja y aumenta deuda; no genera ninguna ganancia.\n\nY al revés: pudo haber ganado dinero que no está en caja, como las ventas al crédito (cuenta 121 Facturas por cobrar) o el inventario comprado y no vendido. Por eso la utilidad se mide en el Estado de Resultados por **devengo**, y el movimiento de caja se analiza por separado en el Estado de Flujos de Efectivo.'},
   {l:2,t:'mc',p:'Una empresa aplica NIIF y deprecia un vehículo en 8 años porque ese es su tiempo real de uso. La norma tributaria acepta como máximo 20% anual (5 años). ¿Qué debe hacer?',
    o:['Depreciar en 5 años en los libros para no tener problemas con SUNAT','Depreciar en 8 años en los libros y controlar la diferencia en la declaración anual de Renta','Llevar dos juegos de libros contables','Pedir autorización a SUNAT para usar 8 años'],r:1,
    s:'Se registra en libros la depreciación según NIIF (vida útil real, 8 años) porque los estados financieros deben mostrar la realidad económica. La diferencia frente al límite tributario se controla por fuera, como diferencia temporal, en la conciliación de la renta neta y en la NIC 12. Nunca se llevan dos juegos de libros: hay un solo registro contable y un papel de trabajo tributario.'},
   {l:3,t:'ab',p:'Una constructora firma en diciembre un contrato por S/ 2,000,000 para una obra que se ejecutará durante todo el año siguiente. Al 31 de diciembre no ha empezado la obra, pero recibió S/ 400,000 de adelanto y gastó S/ 35,000 en estudios y licencias. ¿Qué reconoce en los estados financieros de ese año y qué no? Justifica cada decisión.',
    s:'**No reconoce ingreso alguno por los S/ 2,000,000.** Bajo NIIF 15, el ingreso se reconoce a medida que se satisface la obligación de desempeño (avance de obra). Con 0% de avance no hay ingreso devengado, aunque el contrato esté firmado y sea legalmente exigible.\n\n**Los S/ 400,000 son un pasivo**, no un ingreso: pasivo por contrato o anticipo de clientes (cuenta 122). Es dinero recibido por un trabajo aún no ejecutado; si el contrato se cayera, habría que devolverlo.\n\n**Los S/ 35,000 de estudios y licencias**: hay que analizar su naturaleza. Si son costos directamente atribuibles al contrato, que se espera recuperar con él, se activan como costo de cumplimiento del contrato y se llevarán al costo a medida que avance la obra, para no castigar un año con gastos cuyo ingreso aparecerá en el siguiente. Si son gastos generales de estructura, van al resultado del periodo.\n\n**Efecto en los estados financieros del año 1**: en el Estado de Situación Financiera aumenta el efectivo en S/ 400,000, aparece un pasivo por contrato de S/ 400,000 y un activo de S/ 35,000 si califica; en el Estado de Resultados, ingreso cero. Además, el contrato por S/ 1,600,000 pendiente de ejecutar se revela en notas, porque es información relevante aunque no se registre.'}
  ],
  proy:{
   t:'Tu empresa: la que vas a llevar durante todo el curso',
   ctx:`Todos los proyectos de este curso trabajan sobre **una sola empresa que tú inventas ahora** y que irás construyendo módulo a módulo: primero su contabilidad básica, luego sus tributos, su planilla, sus costos, sus estados financieros y su cierre anual. Al terminar el curso tendrás el expediente contable completo de una empresa, que es exactamente lo que se te va a pedir en una entrevista de trabajo.

Elige un negocio **pequeño, real y que conozcas**: una ferretería, una cevichería, un taller de mecánica, una distribuidora de abarrotes, una empresa de transporte de carga, un estudio de diseño. Evita negocios exóticos o enormes: necesitas poder estimar precios y costos con realismo.`,
   pasos:[
    'Define la empresa en una ficha: razón social, tipo societario (E.I.R.L., S.A.C.), actividad, dónde opera, desde cuándo, cuántos trabajadores tiene y quiénes son sus dueños.',
    'Escribe en tres líneas **cómo gana dinero**: qué vende, a qué precio aproximado y a quién.',
    'Lista sus cinco recursos más importantes (local, vehículo, inventario, equipos, dinero) con un valor estimado para cada uno.',
    'Lista sus tres obligaciones más probables (proveedores, un préstamo, sueldos por pagar) con un importe estimado.',
    'Arma la tabla de usuarios de la información de **tu** empresa: para cada usuario del cuadro del subtema que aplique a tu caso, escribe la pregunta concreta que ese usuario le haría a tu contabilidad.',
    'Cierra con un párrafo: ¿qué decisión importante tiene que tomar el dueño en los próximos seis meses y qué información contable necesitaría para tomarla bien?'
   ],
   entrega:[
    'Una ficha de empresa de una página (puede ser en papel, Word o una hoja de cálculo).',
    'La tabla de usuarios con al menos cuatro usuarios y su pregunta.',
    'El párrafo de la decisión pendiente.'
   ],
   crit:[
    'Los importes son verosímiles para el tamaño de negocio que elegiste: un taller de mecánica de barrio no tiene S/ 2,000,000 en inventario.',
    'Cada usuario tiene una pregunta concreta y respondible, no un enunciado general del tipo "quiere saber cómo va la empresa".',
    'La decisión pendiente es una decisión real (comprar una camioneta, abrir un segundo local, contratar a dos personas), no un deseo.'
   ],
   pista:'Guarda este documento donde no lo pierdas y ponle fecha. Vas a volver a él en cada módulo, y al final del curso compararás la empresa que imaginaste hoy con la que habrás modelado contablemente.'
  },
  fuentes:[
   {a:'American Accounting Association', o:'A Statement of Basic Accounting Theory (1966)', n:'de ahí viene la definición de contabilidad como proceso de identificar, medir y comunicar'},
   {a:'Luca Pacioli', o:'Summa de Arithmetica, Geometria, Proportioni et Proportionalita (Venecia, 1494)', n:'el tratado De Computis et Scripturis, primera descripción impresa de la partida doble'},
   {a:'Eldon S. Hendriksen', o:'Accounting Theory', n:'por qué la contabilidad necesita una teoría que justifique sus criterios de medición'},
   {a:'Charles T. Horngren, Srikant Datar y Madhav Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'la distinción entre información para usuarios externos e información para decidir'},
   {a:'IASB', o:'Marco Conceptual para la Información Financiera (2018)', n:'objetivo de la información financiera y usuarios principales'},
   {a:'Erly Zeballos Zeballos', o:'Contabilidad General', n:'tratamiento del objeto de estudio y el proceso contable en el contexto peruano'}
  ]
 },
 {
  id:'m1t2', titulo:'Postulados, principios y características de la información', min:18,
  cont:`Antes de registrar el primer asiento hay que aceptar un conjunto de supuestos sobre el mundo. Son los **postulados contables**: no se demuestran, se asumen, y todo lo demás depende de ellos. Paton y Littleton, en ~An Introduction to Corporate Accounting Standards~ (1940), fueron los primeros en organizarlos como un cuerpo coherente y no como una lista de prácticas heredadas.

# Los postulados básicos
|Postulado|Qué asume|Qué pasa si no se cumple|
|**Entidad**|La empresa es distinta de sus dueños y de otras empresas|El dueño mezcla su gasto familiar con el del negocio y ningún resultado es confiable|
|**Negocio en marcha**|La empresa seguirá operando en el futuro previsible|Si va a liquidarse, los activos se miden a valor de liquidación, no a costo|
|**Unidad monetaria**|Todo se expresa en una moneda y se asume razonablemente estable|Con hiperinflación los importes de años distintos dejan de ser comparables (NIC 29)|
|**Periodo contable**|La vida continua del negocio se corta en periodos para informar|Sin cortes no habría utilidad del ejercicio ni impuesto anual|
|**Devengo**|Los hechos se reconocen cuando ocurren, no cuando se cobra o paga|La contabilidad se reduce a un cuaderno de caja|

> El postulado de **entidad** es el que más se viola en las MYPES peruanas, y no por mala fe: el dueño paga el colegio de su hijo desde la cuenta del negocio porque "es su plata". Contablemente eso no es un gasto de la empresa sino un retiro del propietario, y tributariamente es un gasto no deducible del artículo 44 de la Ley del Impuesto a la Renta. Dos consecuencias de un solo hábito.

# El devengo, que es el postulado con más consecuencias
Un gasto de diciembre es gasto de diciembre aunque la factura llegue en enero y se pague en febrero. Una venta es ingreso cuando se entrega el bien, aunque el cobro sea a 90 días.

$ Resultado del periodo = Ingresos devengados − Gastos devengados
$ No es:                  Cobros − Pagos

En el Perú el devengo no es solo un criterio contable: el artículo 57 de la Ley del Impuesto a la Renta, con la definición que incorporó el Decreto Legislativo 1425, lo adopta expresamente para la renta de tercera categoría. Es decir, la ley tributaria peruana se alineó con el criterio contable, lo que redujo (sin eliminar) las diferencias entre ambos mundos.

# Características cualitativas de la información (Marco Conceptual del IASB)
Los postulados dicen **desde dónde** se mira; las características cualitativas dicen **cuándo la información sirve**.

|Fundamentales|Qué exigen|
|**Relevancia**|Que la información pueda cambiar una decisión. Incluye el valor predictivo, el confirmatorio y la **materialidad**|
|**Representación fiel**|Completa, neutral y libre de error. No significa exacta: una estimación bien hecha y bien revelada es fiel|

|De mejora|Qué aportan|
|**Comparabilidad**|Entre periodos y entre entidades. De ahí la exigencia de cifras comparativas|
|**Verificabilidad**|Que observadores independientes lleguen al mismo resultado|
|**Oportunidad**|Información a tiempo; un estado financiero de hace dos años no sirve para decidir hoy|
|**Comprensibilidad**|Clara para un usuario con conocimiento razonable de negocios, no para cualquiera|

! **Materialidad** es el concepto más útil y peor entendido de la lista. Una partida es material si omitirla o presentarla mal influiría en la decisión de un usuario. No hay un porcentaje legal. Para una empresa con ingresos de S/ 50 millones, un error de S/ 3,000 es irrelevante; para una con ingresos de S/ 400,000, no lo es. Por eso no tiene sentido perseguir céntimos en una empresa grande ni redondear miles en una pequeña. Y ojo: que algo no sea material para ajustar el estado financiero no significa que no haya que investigar su causa.

# La restricción del costo y el juicio profesional
El Marco Conceptual reconoce una restricción general: el **costo** de producir la información no debe superar el beneficio de tenerla. Esta restricción es la que justifica que una MYPE no aplique el mismo nivel de desagregación que una empresa supervisada por la SMV, y es también la razón de existir de las NIIF para las PYMES.

# Prudencia, sí; conservadurismo sesgado, no
La prudencia se entiende hoy como **cautela al juzgar en condiciones de incertidumbre**, de modo que no se sobrevaloren activos e ingresos ni se infravaloren pasivos y gastos. Lo que la norma moderna rechaza es el viejo conservadurismo entendido como "ante la duda, registra lo peor", porque un sesgo sistemático hacia abajo también es un sesgo, y la neutralidad exige no tenerlos. La diferencia es sutil y cae en examen: prudencia es cautela ante la incertidumbre, no pesimismo deliberado.

# NIC 8: políticas, estimaciones y errores
|Situación|Tratamiento|
|Cambio de **política contable** (de costo a revaluación, de PEPS a promedio)|Retroactivo: se reexpresan los periodos anteriores|
|Cambio de **estimación** (vida útil, tasa de incobrabilidad)|Prospectivo: afecta el periodo actual y los futuros|
|Corrección de **error** de periodos anteriores|Retroactivo, con reexpresión y revelación|

La distinción decide cuánto trabajo cuesta un cambio: modificar la vida útil de una máquina de 10 a 8 años no obliga a tocar nada del pasado; cambiar el método de valuación de inventarios sí.

# Cómo se resuelve un caso sin norma específica
Cuando ninguna NIIF trata la operación, la jerarquía de la NIC 8 manda aplicar, en este orden:

1. Una NIIF que trate una situación similar y relacionada.
2. Las definiciones y criterios de reconocimiento y medición del Marco Conceptual.
3. Pronunciamientos recientes de otros emisores con marco conceptual similar y las prácticas aceptadas del sector.

Esa jerarquía es la respuesta profesional cuando un gerente pregunta "¿y esto cómo lo registro, si la norma no dice nada?".`,
  claves:['Cinco postulados: entidad, negocio en marcha, unidad monetaria, periodo contable y devengo.','El postulado de entidad separa el patrimonio del negocio del de sus dueños; violarlo genera gastos no deducibles.','Características fundamentales: relevancia (con materialidad) y representación fiel; de mejora: comparabilidad, verificabilidad, oportunidad y comprensibilidad.','Prudencia es cautela ante la incertidumbre, no pesimismo sistemático: un sesgo hacia abajo también rompe la neutralidad.','NIC 8: política cambia retroactivamente, estimación prospectivamente, error se reexpresa.'],
  preg:[
   {p:'¿Por qué el postulado de negocio en marcha cambia la forma de medir los activos? Da un ejemplo.',
    r:'Porque si la empresa va a seguir operando, sus activos valen por lo que van a producir usándolos, y por eso se miden al costo y se deprecian a lo largo de su vida útil. Si en cambio va a liquidarse, lo relevante es cuánto se obtendría vendiéndolos ahora, de modo que se miden a valor de liquidación, normalmente mucho menor. Ejemplo: una maquinaria especializada con valor en libros de S/ 300,000 puede valer S/ 60,000 en un remate, porque casi nadie la necesita. El mismo bien, dos cifras, según el postulado que aplique.'},
   {p:'El dueño de una empresa compra una camioneta y la usa el 70% para el negocio y el 30% para su familia. ¿Qué dicen el postulado de entidad y la norma tributaria?',
    r:'El postulado de entidad obliga a separar: solo la parte afectada a la generación de renta pertenece a la empresa. Contablemente, lo correcto es reconocer el activo y la depreciación en la proporción de uso empresarial y tratar el resto como un retiro o una cuenta por cobrar al accionista. Tributariamente, el gasto personal no es deducible (art. 44 de la LIR) y los vehículos asignados a dirección y administración tienen además límites propios de deducción. Si todo se carga a la empresa, el reparo es seguro y puede calificarse como distribución indirecta de utilidades.'},
   {p:'Una empresa cambia la vida útil de sus equipos de cómputo de 4 a 3 años y, en el mismo ejercicio, cambia de PEPS a promedio ponderado para valuar inventarios. ¿Los dos cambios se tratan igual?',
    r:'No. La vida útil es una **estimación**: se trata prospectivamente, repartiendo el valor en libros restante en los años que quedan, sin tocar los ejercicios anteriores. El método de valuación de inventarios es una **política contable**: su cambio es retroactivo, hay que reexpresar las cifras comparativas y ajustar el saldo inicial de resultados acumulados, y además debe justificarse que el nuevo método da información más fiable o relevante, porque no se puede cambiar de política por conveniencia.'},
   {p:'¿Por qué el Marco Conceptual dice que la representación fiel no exige exactitud?',
    r:'Porque gran parte de la contabilidad son estimaciones: vidas útiles, cobranza dudosa, provisiones, valor razonable. Si se exigiera exactitud, habría que eliminar esas partidas y la información quedaría incompleta, que es peor. Lo que la norma exige es que la estimación esté bien hecha, sea neutral, use la mejor información disponible y se revele como estimación, indicando los supuestos clave. Una cifra aproximada y transparente es fiel; una cifra exacta pero parcial no lo es.'},
   {p:'Un auditor te dice que una diferencia de S/ 4,500 "no es material" en una empresa con ingresos de S/ 80 millones. ¿Puedes dejarla sin investigar?',
    r:'La materialidad decide si hay que **ajustar el estado financiero**, no si hay que **investigar la causa**. S/ 4,500 sobre S/ 80 millones no cambia ninguna decisión, así que el estado financiero puede emitirse sin ese ajuste. Pero la diferencia puede ser el síntoma de un proceso defectuoso o de un fraude pequeño que crecerá: el control interno sí exige encontrar su origen. Confundir ambas cosas es el error que permite que una fuga pequeña se vuelva grande.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una empresa decide cambiar la vida útil estimada de su maquinaria de 10 a 7 años. ¿Cómo se trata?',
    o:['Retroactivamente, reexpresando ejercicios anteriores','Prospectivamente: afecta el periodo actual y los futuros','Como un error contable','Requiere autorización del CNC'],r:1,
    s:'Es un cambio de **estimación** y se trata de forma prospectiva (NIC 8): la depreciación de los años anteriores no se toca y el valor en libros restante se distribuye en los años de vida útil que quedan. Se revela en notas el efecto. Si en cambio se cambiara el modelo del costo por el de revaluación, eso sí sería un cambio de política contable, con tratamiento retroactivo.'},
   {l:1,t:'mc',p:'¿Cuál de estas situaciones viola el postulado de entidad?',
    o:['Registrar la depreciación de un equipo','Pagar el recibo de luz de la casa del gerente con la cuenta de la empresa y registrarlo como gasto de servicios','Provisionar vacaciones al cierre','Reconocer un ingreso por devengo antes de cobrarlo'],r:1,
    s:'Pagar un gasto personal desde la empresa y registrarlo como gasto propio mezcla dos patrimonios que la contabilidad exige separar. El tratamiento correcto es registrarlo como cuenta por cobrar al accionista o como retiro, nunca como gasto. Tributariamente es un gasto no deducible y, si es recurrente, puede calificar como dividendo presunto, que tiene una tasa más alta que el reparto formal de utilidades.'},
   {l:2,t:'num',p:'Una empresa paga el 1 de octubre una póliza de seguro anual por S/ 24,000. Al 31 de diciembre, ¿cuánto gasto se devengó?',
    u:'S/',r:6000,tol:1,
    s:'La póliza cubre 12 meses desde octubre. Consumidos al 31 de diciembre: octubre, noviembre y diciembre = 3 meses.\nGasto devengado = 24,000 × 3/12 = **S/ 6,000**\n\nLos S/ 18,000 restantes quedan como activo en la cuenta 18 Servicios y otros contratados por anticipado, y se irán reconociendo como gasto en los nueve meses siguientes. Si se hubiera llevado todo a gasto en octubre, la utilidad de este año estaría subvaluada en S/ 18,000 y la del siguiente sobrevaluada en el mismo importe: exactamente lo que el postulado del devengo impide.'},
   {l:2,t:'ab',p:'Clasifica cada hecho como cambio de política, cambio de estimación o corrección de error: (a) se descubre que en el ejercicio anterior se omitió registrar una factura de gasto de S/ 40,000; (b) la empresa pasa de estimar la cobranza dudosa en 2% de la cartera a hacerlo caso por caso; (c) se adopta el modelo de revaluación para los terrenos; (d) se corrige la vida útil de un edificio de 20 a 30 años por un informe técnico.',
    s:'**(a) Omisión de una factura del ejercicio anterior → corrección de ERROR.** Tratamiento retroactivo: se reexpresan las cifras comparativas y se ajusta el saldo inicial de resultados acumulados contra el pasivo. No se registra como gasto del año corriente, porque eso distorsionaría dos ejercicios a la vez. Tributariamente hay que evaluar si corresponde rectificar la declaración anual del ejercicio afectado.\n\n**(b) Pasar de un porcentaje global al análisis caso por caso → cambio de ESTIMACIÓN**, y además una mejora: el método de estimación cambia, no la política de reconocer deterioro. Se aplica prospectivamente. Dato tributario relevante: el análisis caso por caso es justamente lo que exige la Ley del Impuesto a la Renta para que la provisión sea deducible, así que el cambio tiene un beneficio fiscal.\n\n**(c) Adoptar el modelo de revaluación → cambio de POLÍTICA contable.** La NIC 8 lo trataría retroactivamente, pero la propia NIC 16 establece que la primera adopción del modelo de revaluación se contabiliza como una revaluación, es decir, prospectivamente. Es la excepción que conviene recordar.\n\n**(d) Corregir la vida útil del edificio con un informe técnico → cambio de ESTIMACIÓN.** Prospectivo: el valor en libros restante se distribuye entre los años de vida útil que quedan, lo que reduce la depreciación anual desde este ejercicio. El informe técnico es la evidencia que lo sustenta; sin él, el cambio parece una maniobra para mejorar el resultado.'},
   {l:3,t:'ab',p:'Una empresa en problemas financieros pierde su principal contrato, que representaba el 80% de sus ingresos, y los bancos le han retirado las líneas de crédito. La gerencia prepara los estados financieros con los criterios de siempre. ¿Qué postulado está en juego y qué debería hacer el contador?',
    s:'**El postulado en juego es el de negocio en marcha**, y los indicios son graves: pérdida del 80% de los ingresos y retiro de líneas de crédito son exactamente los síntomas que la NIC 1 y las normas de auditoría enumeran como señales de duda sustancial sobre la capacidad de continuar operando.\n\n**Qué debe hacer el contador, en orden:**\n\n1. **Evaluar formalmente la hipótesis**, mirando al menos los doce meses siguientes a la fecha del estado de situación financiera: proyección de flujo de caja, vencimientos de deuda, compromisos laborales, posibilidad de reemplazar el contrato perdido, disposición de los socios a aportar capital.\n2. **Documentar la evaluación** con supuestos explícitos. Esta es la parte que suele faltar y la primera que pide un auditor.\n3. **Decidir entre tres escenarios:**\n   - *Negocio en marcha sin dudas significativas*: se prepara todo con criterios normales.\n   - *Negocio en marcha con incertidumbre material*: se mantienen los criterios normales, pero se **revela** expresamente la incertidumbre y los hechos que la originan. Esta revelación no es opcional.\n   - *La gerencia tiene la intención o no tiene alternativa realista distinta de liquidar*: los estados financieros **no** se preparan sobre la base de negocio en marcha. Los activos se miden a su valor de realización, los pasivos se reclasifican como corrientes, se reconocen las provisiones por cese de personal y por contratos onerosos, y se revela la base de preparación utilizada.\n\n**Qué cambia en números si se abandona la hipótesis:** el activo fijo deja de depreciarse según vida útil y pasa a medirse por lo que se obtendría al venderlo; los intangibles y la plusvalía normalmente se castigan por completo; los activos tributarios diferidos se dan de baja, porque ya no habrá utilidades futuras contra las cuales usarlos; y los contratos de arrendamiento y de suministro con penalidad se provisionan.\n\n**El conflicto profesional, que es lo importante del caso:** la gerencia tiene incentivos para no revelar la incertidumbre, porque hacerlo puede acelerar el retiro de proveedores y clientes. El contador no puede ceder: omitir esa revelación hace que los estados financieros dejen de representar fielmente la situación, expone al contador a responsabilidad profesional y, si un tercero toma una decisión de crédito sobre esa base, a responsabilidad civil. Lo correcto es documentar la evaluación por escrito, revelar lo que corresponda y, si la gerencia se niega, dejar constancia formal de la discrepancia.'}
  ],
  proy:{
   t:'Los postulados aplicados a tu empresa',
   ctx:`Vuelve a la empresa que definiste en el subtema anterior. Los postulados no son adorno teórico: cada uno te obliga a tomar una decisión concreta sobre cómo vas a llevar su contabilidad. Este proyecto te hace tomarlas por escrito, antes de registrar nada.`,
   pasos:[
    'Postulado de entidad: lista tres gastos que, en un negocio como el tuyo, el dueño mezclaría con los de la empresa. Para cada uno escribe cómo debería registrarse correctamente.',
    'Negocio en marcha: escribe dos hechos que, si ocurrieran, te harían dudar de que tu empresa pueda seguir operando el próximo año.',
    'Periodo contable: define el ejercicio contable de tu empresa y los cortes de información que va a necesitar la gerencia (mensual, trimestral) y por qué.',
    'Devengo: inventa tres operaciones de tu empresa en las que la fecha del hecho económico y la fecha del dinero no coincidan, y señala en qué mes va cada una.',
    'Materialidad: fija un umbral de materialidad para tu empresa en soles y justifícalo con una regla (por ejemplo, un porcentaje de los ingresos o del patrimonio). Explica qué harías con una diferencia por debajo y otra por encima de ese umbral.',
    'Redacta la **política contable** de tu empresa en una página: qué marco aplicarás (NIIF para las PYMES o NIIF plenas) y por qué, método de valuación de inventarios, criterio de depreciación y umbral para activar en lugar de gastar una compra pequeña.'
   ],
   entrega:[
    'Documento de postulados aplicados, con los cinco puntos resueltos.',
    'La política contable de una página, fechada y firmada como si fuera a presentarse al dueño.'
   ],
   crit:[
    'El umbral de materialidad está justificado con una regla, no elegido al azar.',
    'Las tres operaciones de devengo distinguen con claridad la fecha del hecho y la fecha del dinero.',
    'La política contable toma decisiones concretas, no describe alternativas: dice qué método se usará, no cuáles existen.'
   ],
   pista:'El umbral para activar en lugar de gastar una compra pequeña no está fijado por la NIC 16 con un monto: es una política de la empresa basada en materialidad. Muchas empresas peruanas usan un cuarto de UIT como referencia práctica, pero lo importante es que el criterio esté escrito y se aplique siempre igual.'
  },
  proyInt:{
   t:'Manual contable inicial de tu empresa',
   integra:'1.1 y 1.2',
   ctx:`Un manual contable es el documento que explica cómo lleva la contabilidad una empresa concreta. Es lo primero que pide un auditor y lo primero que falta en una MYPE. Vas a armar la primera versión del tuyo juntando lo que hiciste en los dos subtemas: la empresa, sus usuarios y sus políticas.`,
   pasos:[
    'Portada e índice: nombre de la empresa, fecha de la versión, responsable.',
    'Sección 1 — La empresa: ficha, actividad, estructura y recursos (viene del proyecto 1.1).',
    'Sección 2 — Usuarios de la información y qué reporte necesita cada uno, con su frecuencia.',
    'Sección 3 — Marco normativo aplicable: qué normas sigue la empresa y por qué (NIIF para las PYMES o plenas, PCGE 2019, régimen tributario que presumes).',
    'Sección 4 — Postulados y políticas contables (viene del proyecto 1.2).',
    'Sección 5 — Calendario contable: qué se hace cada día, cada mes y cada cierre de año. Déjalo en borrador; lo completarás en el módulo del ciclo contable.',
    'Escribe al final una lista de "preguntas abiertas": todo lo que todavía no sabes resolver. Vas a tacharlas a medida que avance el curso.'
   ],
   entrega:[
    'Manual contable v1, de cuatro a seis páginas, con las cinco secciones y la lista de preguntas abiertas.'
   ],
   crit:[
    'Un tercero que no conozca el negocio podría entender, leyendo solo el manual, qué hace la empresa y cómo se lleva su contabilidad.',
    'No hay frases copiadas de la teoría sin adaptar: todo está escrito en términos de tu empresa.',
    'La lista de preguntas abiertas es honesta y específica (por ejemplo "no sé cómo registrar el IGV de las compras"), no genérica.'
   ],
   pista:'Guarda el manual en un archivo editable. En cada módulo vas a agregarle una sección: tributaria, laboral, de costos, de cierre. Al terminar el curso, ese documento es tu mejor carta de presentación en una entrevista.'
  },
  fuentes:[
   {a:'William A. Paton y A. C. Littleton', o:'An Introduction to Corporate Accounting Standards (1940)', n:'la primera formulación sistemática de los postulados como cuerpo coherente'},
   {a:'IASB', o:'Marco Conceptual para la Información Financiera (2018)', n:'características cualitativas, materialidad, prudencia y la restricción del costo'},
   {a:'IASB', o:'NIC 8 Políticas contables, cambios en las estimaciones contables y errores', n:'la distinción entre política, estimación y error, y la jerarquía para casos sin norma'},
   {a:'Richard G. Schroeder, Myrtle W. Clark y Jack M. Cathey', o:'Financial Accounting Theory and Analysis', n:'evolución del concepto de prudencia y el debate sobre la neutralidad'},
   {a:'Ahmed Riahi-Belkaoui', o:'Accounting Theory', n:'discusión de los postulados y su papel en la construcción de la teoría contable'},
   {a:'Alejandro Ferrer Quea', o:'Estados Financieros: análisis e interpretación por sectores económicos', n:'aplicación de los principios al contexto normativo peruano'}
  ]
 },
 {
  id:'m1t3', titulo:'Los cinco elementos: activo, pasivo, patrimonio, ingreso y gasto', min:20,
  cont:`Todo hecho económico, por complicado que parezca, se descompone en cinco elementos. Si dominas estos cinco, puedes razonar cualquier asiento sin memorizar nada. Las definiciones que siguen son las del Marco Conceptual del IASB revisado en 2018, que cambió respecto de la versión anterior en un punto que conviene notar.

# Activo
**Un recurso económico presente controlado por la entidad como resultado de sucesos pasados**, siendo un recurso económico un derecho con potencial de producir beneficios económicos.

El cambio de 2018 está en el matiz: antes se exigía que fuera "probable" que los beneficios fluyeran; ahora basta con que exista el **potencial**, y la probabilidad se considera al medir, no al definir. En la práctica esto permitió reconocer derechos cuyo desenlace es incierto pero cuyo potencial existe.

Tres condiciones que sí se mantienen:
- **Control**: la capacidad de dirigir el uso del recurso y obtener sus beneficios.
- **Suceso pasado**: el hecho que lo originó ya ocurrió.
- **Potencial de beneficios**: directo (efectivo) o indirecto (reducir costos, garantizar suministro).

> **El control vale más que el título legal.** Un local alquilado por 10 años bajo NIIF 16 se registra como activo por derecho de uso aunque el inmueble no sea tuyo: controlas su uso durante ese plazo. En cambio, una mercadería recibida en consignación no es tu activo aunque esté físicamente en tu almacén: el control sigue siendo del consignante. Kieso, Weygandt y Warfield insisten en este punto en su ~Intermediate Accounting~, porque es el que más errores produce al clasificar.

Ejemplos en el PCGE: efectivo (10), cuentas por cobrar comerciales (12), existencias (20 a 24), propiedades, planta y equipo (33), intangibles (34).

# Pasivo
**Una obligación presente de la entidad de transferir un recurso económico como resultado de sucesos pasados.**

Tres condiciones: que exista una obligación, que sea de transferir un recurso económico, y que sea una obligación **presente** surgida de hechos ya ocurridos. "Presente" es la palabra clave: la obligación ya existe hoy, aunque se pague después, y no se puede evitar en la práctica.

Hay dos clases de obligaciones que mucha gente no reconoce como pasivo:
- **Obligaciones implícitas**: no nacen de un contrato sino de una práctica establecida que crea una expectativa válida en terceros. Si tu empresa ha pagado una gratificación extraordinaria los últimos cinco diciembres y lo anunció, hay obligación implícita.
- **Provisiones**: obligaciones de cuantía o fecha inciertas pero existentes y probables (NIC 37).

Ejemplos en el PCGE: tributos por pagar (40), remuneraciones por pagar (41), cuentas por pagar comerciales (42), obligaciones financieras (45), provisiones (48).

# Patrimonio
**La participación residual en los activos de la entidad una vez deducidos todos sus pasivos.** No es una bolsa de dinero; es una resta. Por eso nunca se mide directamente: se obtiene.

|Componente|Cuenta PCGE|Origen|
|Capital|50|Aportes de los socios, inscritos en Registros Públicos|
|Capital adicional|52|Primas de emisión, aportes no capitalizados|
|Excedente de revaluación|57|Mayor valor por revaluar activos fijos|
|Reserva legal|582|10% de la utilidad, obligatoria hasta llegar al 20% del capital|
|Resultados acumulados|59|Utilidades o pérdidas de ejercicios anteriores|
|Resultado del ejercicio|—|La utilidad o pérdida del año en curso|

! La **reserva legal** del artículo 229 de la Ley General de Sociedades no es opcional: se detrae un mínimo del 10% de la utilidad distribuible de cada ejercicio hasta que la reserva alcance la quinta parte del capital pagado. Se registra dentro del patrimonio, no es un gasto y no reduce la utilidad del Estado de Resultados.

# Ingreso
**Incrementos en los activos o disminuciones en los pasivos que dan lugar a aumentos del patrimonio, distintos de los relacionados con aportaciones de los tenedores de derechos sobre el patrimonio.**

Esa última frase es la que separa una venta de un aporte de capital: ambos aumentan el activo, pero solo la venta es ingreso. Y distingue dos categorías que el PCGE trata por separado: los ingresos de actividades ordinarias (cuenta 70) y otros ingresos (74, 75, 77).

# Gasto
**Disminuciones en los activos o incrementos en los pasivos que dan lugar a disminuciones del patrimonio, distintos de los relacionados con distribuciones a los tenedores de derechos sobre el patrimonio.**

La distribución de dividendos reduce el patrimonio pero no es gasto: es reparto. En el PCGE conviven dos formas de clasificar los gastos, y confundirlas es un error frecuente:
- **Por naturaleza** (cuentas 60 a 68): qué se consumió. Compras, cargas de personal, servicios de terceros, tributos, depreciación.
- **Por función** (cuentas 90 a 99): dónde se consumió. Costo de producción, gastos de administración, gastos de ventas.

# Reconocimiento y medición: dos decisiones distintas
Que algo encaje en la definición de activo no significa que se registre. El Marco Conceptual exige que, además, el reconocimiento proporcione **información útil**: relevante y que represente fielmente. Por eso un activo de existencia muy incierta o de medición extremadamente subjetiva puede quedar fuera del balance y revelarse en notas.

$ ACTIVO  =  PASIVO  +  PATRIMONIO
$ PATRIMONIO  =  Aportes  +  Resultados acumulados  +  (Ingresos − Gastos del periodo)

# Un ejemplo que junta los cinco
Una distribuidora de repuestos aporta S/ 50,000 de capital, compra mercadería por S/ 30,000 al crédito y la vende en S/ 45,000 al contado (ignoramos el IGV para ver la lógica).

|Elemento|Importe|Explicación|
|Activo|S/ 95,000|Efectivo: 50,000 de aporte + 45,000 de la venta. El inventario ya salió|
|Pasivo|S/ 30,000|La factura del proveedor, aún impaga|
|Patrimonio|S/ 65,000|Capital 50,000 + utilidad 15,000|
|Ingreso|S/ 45,000|La venta|
|Gasto (costo de ventas)|S/ 30,000|La mercadería entregada al cliente|

Comprueba: 95,000 = 30,000 + 65,000. Cuadra. El inventario desapareció del activo y reapareció como costo en el resultado: esa migración es el corazón de la contabilidad comercial.`,
  claves:['Activo: recurso económico presente controlado por hechos pasados, con potencial de generar beneficios; el control pesa más que la propiedad legal.','Pasivo: obligación presente de transferir un recurso, incluidas las obligaciones implícitas.','Patrimonio es un residuo (A − P): no se mide, se obtiene.','Ingreso y gasto excluyen las operaciones con los socios: aportes y dividendos no pasan por resultados.','El PCGE clasifica gastos por naturaleza (60-68) y por función (90-99): son dos vistas del mismo gasto.'],
  preg:[
   {p:'El Marco Conceptual cambió en 2018 la definición de activo: ya no exige que sea "probable" obtener beneficios, sino que exista "potencial". ¿Qué consecuencia práctica tiene ese cambio?',
    r:'Separó dos preguntas que antes iban juntas: si algo es un activo (definición) y si debe registrarse y por cuánto (reconocimiento y medición). Con la definición antigua, un derecho con baja probabilidad de generar beneficios simplemente no era activo. Con la nueva, sí lo es, y la baja probabilidad se refleja en su medición o lleva a no reconocerlo porque la información no sería útil. El efecto práctico es que el análisis es más ordenado y permite reconocer derechos contingentes valiosos que antes quedaban invisibles.'},
   {p:'¿Por qué una mercadería en consignación está en tu almacén y no es tu activo, mientras que un local alquilado a 10 años no es tuyo y sí genera un activo?',
    r:'Porque el criterio es el control, no la posesión física ni la propiedad legal. En la consignación no controlas el bien: no fijas libremente su precio, no asumes el riesgo de que no se venda o se desvalorice, y puedes devolverlo. En el arrendamiento de 10 años sí controlas el uso del local durante ese plazo: decides cómo usarlo e impides que otros lo usen, y por eso la NIIF 16 reconoce un activo por derecho de uso con su pasivo correspondiente.'},
   {p:'Una empresa ha pagado por cinco años seguidos un bono de fin de año que no está en ningún contrato, y en noviembre lo anunció al personal. ¿Hay pasivo al 31 de diciembre?',
    r:'Sí, una obligación implícita. No nace de un contrato ni de la ley, sino de una práctica establecida y de un anuncio que creó una expectativa válida en los trabajadores, de modo que la empresa no tiene una alternativa realista a pagarlo. Se reconoce como provisión (NIC 37) con cargo a gasto de personal. Dato tributario: su deducción exige cumplir los requisitos de las rentas de quinta categoría, entre ellos el pago dentro del plazo de la declaración anual y el criterio de generalidad.'},
   {p:'Si el patrimonio es un residuo, ¿por qué el PCGE le dedica todo un elemento con varias cuentas?',
    r:'Porque aunque su importe total sea una resta, su composición es información relevante: no es lo mismo un patrimonio de S/ 500,000 formado por capital aportado que uno formado por utilidades acumuladas no distribuidas o por un excedente de revaluación. Cada componente tiene reglas distintas de disponibilidad: el capital solo se reduce con acuerdo de junta e inscripción registral, la reserva legal tiene un destino restringido por ley, y el excedente de revaluación no es distribuible como dividendo mientras no se realice. El total es un residuo; su detalle es gobierno societario.'},
   {p:'Explica por qué la compra de mercadería no es un gasto en el momento de comprarla.',
    r:'Porque no hay disminución del patrimonio: se cambia un activo (efectivo) o se asume un pasivo (cuenta por pagar) a cambio de otro activo (inventario) del mismo valor. El patrimonio no se mueve. El gasto aparece recién cuando la mercadería se entrega al cliente, momento en el que el activo sale definitivamente y se reconoce el costo de ventas contra el ingreso de esa misma venta. Es la aplicación directa del principio de correlación entre ingresos y gastos.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un socio aporta S/ 40,000 en efectivo a la empresa. ¿Cómo se clasifica ese importe?',
    o:['Ingreso del periodo, porque entró dinero','Patrimonio (capital), porque es una operación con los socios','Pasivo, porque hay que devolverlo','Activo únicamente, sin contrapartida'],r:1,
    s:'Es patrimonio: aumenta el activo (efectivo) y aumenta el capital. La definición de ingreso excluye expresamente las aportaciones de los tenedores de derechos sobre el patrimonio. Tampoco es pasivo: el socio no puede exigir la devolución del capital, solo tiene derecho a su parte en una eventual liquidación o a dividendos cuando la junta los acuerde.'},
   {l:1,t:'mc',p:'Una empresa recibe mercadería en consignación de un proveedor. ¿Debe registrarla como activo?',
    o:['Sí, porque está físicamente en su almacén','No, porque no controla el bien ni asume sus riesgos: el control sigue siendo del consignante','Sí, al 50% de su valor','Solo si la vende en el mismo mes'],r:1,
    s:'No es activo del consignatario. No tiene control: no decide libremente el precio ni asume el riesgo de obsolescencia, y puede devolver la mercadería. Se controla en cuentas de orden o en un registro extracontable, y el consignante la mantiene en su inventario. Reconocerla como activo propio inflaría a la vez el activo y el pasivo, y distorsionaría todos los ratios de rotación.'},
   {l:2,t:'num',p:'Una empresa tiene: efectivo S/ 18,500; cuentas por cobrar S/ 32,000; mercaderías S/ 47,000; maquinaria neta S/ 120,000; facturas por pagar S/ 56,000; préstamo bancario S/ 80,000; tributos por pagar S/ 9,500. Calcula el patrimonio.',
    u:'S/',r:72000,tol:1,
    s:'Activo total = 18,500 + 32,000 + 47,000 + 120,000 = **S/ 217,500**\nPasivo total = 56,000 + 80,000 + 9,500 = **S/ 145,500**\nPatrimonio = 217,500 − 145,500 = **S/ 72,000**\n\nLectura adicional: ese patrimonio frente a un pasivo de S/ 145,500 da un endeudamiento patrimonial de 2.02 veces, es decir, los acreedores financian el doble que los dueños. Un banco lo leería como una estructura apalancada y pediría garantías.'},
   {l:2,t:'mc',p:'La junta de accionistas acuerda distribuir dividendos por S/ 60,000. ¿Cómo afecta esto al Estado de Resultados del ejercicio?',
    o:['Es un gasto financiero, reduce la utilidad','Es un gasto administrativo, reduce la utilidad','No afecta el Estado de Resultados: reduce el patrimonio y genera un pasivo con los accionistas','Reduce los ingresos del periodo'],r:2,
    s:'No pasa por resultados. La definición de gasto excluye las distribuciones a los propietarios. El asiento reduce resultados acumulados (cuenta 591) y reconoce un pasivo con los accionistas (cuenta 441). Además, al pagarlos a personas naturales domiciliadas corresponde retener el Impuesto a la Renta de segunda categoría, lo que genera otro pasivo tributario.'},
   {l:3,t:'ab',p:'Clasifica cada hecho en los cinco elementos (indica qué aumenta y qué disminuye) y señala cuál NO genera ingreso ni gasto: (a) se cobra S/ 10,000 de una factura del mes pasado; (b) se paga por adelantado S/ 12,000 de alquiler de un año; (c) se recibe la factura de luz del mes, S/ 1,400, por pagar; (d) se capitalizan utilidades por S/ 25,000; (e) una mercadería con costo S/ 8,000 queda obsoleta.',
    s:'**(a) Cobranza de factura:** aumenta activo (efectivo 10,000) y disminuye activo (cuentas por cobrar 10,000). **No hay ingreso**: se reconoció cuando se hizo la venta. Solo cambia la composición del activo.\n\n**(b) Alquiler pagado por adelantado:** disminuye activo (efectivo 12,000) y aumenta activo (servicios contratados por anticipado, cuenta 18). **No hay gasto todavía**: se reconocerá a razón de S/ 1,000 por mes, por devengo.\n\n**(c) Factura de luz por pagar:** aumenta pasivo (cuentas por pagar, por el total con IGV) y **se reconoce gasto** por la base (cuenta 6364 Energía eléctrica). El gasto nace con el consumo, no con el pago.\n\n**(d) Capitalización de utilidades:** disminuye patrimonio en resultados acumulados (25,000) y aumenta patrimonio en capital (25,000). **No hay ingreso ni gasto**: el patrimonio total no cambia. Es un movimiento interno que requiere acuerdo de junta e inscripción registral.\n\n**(e) Mercadería obsoleta:** disminuye activo (vía estimación por desvalorización, cuenta 295) y **se reconoce gasto** (cuenta 695). La NIC 2 obliga a medir el inventario al menor entre costo y valor neto realizable. Nota tributaria: para que la pérdida sea deducible se exige acreditar el desmedro con destrucción ante notario y comunicación previa a SUNAT; si no, es una adición.\n\n**Las que no generan ingreso ni gasto son (a) y (d).**'}
  ],
  proy:{
   t:'El inventario de elementos de tu empresa',
   ctx:`Vas a convertir la descripción narrativa de tu empresa en una lista clasificada de elementos. Este ejercicio es el paso previo al balance de apertura que armarás en el siguiente subtema, y es el momento en que se descubren los errores de concepto: la mayoría de las personas clasifica mal al menos tres partidas en su primer intento.`,
   pasos:[
    'Lista al menos ocho recursos que controla tu empresa y clasifícalos como activo, indicando para cada uno: nombre, importe estimado, la cuenta del PCGE que le correspondería (aproximada, la afinarás en el subtema 1.5) y una línea justificando por qué cumple la definición de activo.',
    'Incluye a propósito **un recurso que NO sea activo** de tu empresa (mercadería en consignación, un local alquilado por tres meses, la experiencia de tu equipo) y explica por qué no lo es.',
    'Lista al menos cinco obligaciones y clasifícalas como pasivo, señalando cuáles son contractuales y si existe alguna implícita.',
    'Calcula el patrimonio por diferencia y descompón ese total en capital aportado y resultados acumulados estimados.',
    'Lista las tres fuentes de ingreso de tu empresa y los seis gastos más importantes, clasificando cada gasto por naturaleza (qué elemento del PCGE: 60, 62, 63, 64, 68) y por función (administración, ventas, producción).',
    'Escribe un párrafo final: ¿qué partida te costó más clasificar y por qué?'
   ],
   entrega:[
    'Hoja de cálculo con cuatro bloques: activos, pasivos, ingresos y gastos, con importes y justificación.',
    'El cálculo del patrimonio por diferencia.',
    'El párrafo sobre la partida más difícil.'
   ],
   crit:[
    'Cada activo tiene una justificación que menciona el control, no solo la posesión.',
    'Los gastos están clasificados dos veces: por naturaleza y por función, y las dos clasificaciones son coherentes.',
    'El patrimonio calculado es positivo y verosímil; si te sale negativo, revisa los importes antes de darlo por bueno.'
   ],
   pista:'Si no sabes si algo es activo, hazte dos preguntas: ¿puedo impedir que otros lo usen? y ¿me va a traer beneficios futuros? Si la respuesta a la primera es no, casi nunca es activo.'
  },
  proyInt:{
   t:'Balance de apertura de tu empresa',
   integra:'1.1 a 1.3',
   ctx:`Con la empresa definida (1.1), sus políticas escritas (1.2) y sus elementos clasificados (1.3), ya puedes armar el documento con el que arranca toda contabilidad: el **balance de apertura**, la foto del patrimonio el día que empieza el ejercicio.`,
   pasos:[
    'Ordena los activos en corrientes y no corrientes, y los pasivos igual, con el criterio de los 12 meses.',
    'Arma el Estado de Situación Financiera de apertura, con el total del activo igual al total de pasivo más patrimonio. Si no cuadra, el error está en tus importes, no en la ecuación.',
    'Añade una columna "política aplicada" que remita a la política contable que escribiste en 1.2 para cada partida que requiera un criterio (inventarios, activo fijo, provisiones).',
    'Escribe tres notas al balance de apertura: una sobre la base de preparación, una sobre el criterio de medición de los activos fijos y una sobre cualquier partida cuya clasificación sea discutible.',
    'Calcula tres indicadores: capital de trabajo, endeudamiento patrimonial y proporción del activo que está en inventario.',
    'Redacta medio párrafo interpretando esos tres números: ¿tu empresa nace sana o nace apretada?'
   ],
   entrega:[
    'Estado de Situación Financiera de apertura en una hoja, cuadrado.',
    'Las tres notas explicativas.',
    'Los tres indicadores con su interpretación.'
   ],
   crit:[
    'El balance cuadra exactamente; no hay una cuenta "diferencias" para forzarlo.',
    'La clasificación corriente y no corriente es coherente con el criterio de 12 meses.',
    'La interpretación de los indicadores habla del negocio, no repite la fórmula.'
   ],
   pista:'Este balance de apertura es el punto de partida del Libro Diario que vas a llevar en el Módulo 2. Haz los importes redondos y manejables: trabajarás con ellos durante varios módulos.'
  },
  fuentes:[
   {a:'IASB', o:'Marco Conceptual para la Información Financiera (2018)', n:'definiciones vigentes de los cinco elementos y los criterios de reconocimiento'},
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'el control como criterio de reconocimiento del activo y los casos límite de clasificación'},
   {a:'Consejo Normativo de Contabilidad', o:'Plan Contable General Empresarial 2019 (R. CNC 002-2019-EF/30)', n:'la estructura de cuentas por elemento y su dinámica'},
   {a:'Ley 26887', o:'Ley General de Sociedades, artículo 229', n:'la obligación de constituir reserva legal con el 10% de la utilidad distribuible'},
   {a:'Mario Apaza Meza', o:'Estados financieros: formulación, análisis e interpretación conforme a las NIIF', n:'clasificación y presentación de los elementos en el contexto peruano'}
  ]
 },
 {
  id:'m1t4', titulo:'La ecuación contable y la partida doble', min:20,
  cont:`La partida doble no es una convención arbitraria: es la consecuencia lógica de la ecuación contable. Si **A = P + Pt** debe cumplirse siempre, entonces ningún hecho puede alterar un solo lado de la igualdad. Todo movimiento tiene al menos dos efectos que mantienen el equilibrio.

Yuji Ijiri, en ~Theory of Accounting Measurement~, formuló la idea con más precisión: la partida doble no registra dos veces lo mismo, sino **las dos caras de un mismo hecho**, el incremento de un recurso y su causa. Por eso el método sobrevive: no es una técnica de control aritmético, es una forma de representar causalidad.

$ ACTIVO = PASIVO + PATRIMONIO
$ (ampliada)   Activo + Gastos  =  Pasivo + Patrimonio + Ingresos

La versión ampliada explica por qué gastos y activos se comportan igual en el debe, y por qué ingresos, pasivos y patrimonio se comportan igual en el haber: están del mismo lado de la igualdad.

# Debe y haber: las dos únicas direcciones
"Debe" (izquierda) y "haber" (derecha) no significan bueno ni malo, ni entrada ni salida de dinero. Son **posiciones**. Lo que define el efecto es la naturaleza de la cuenta:

|Elemento|Aumenta en|Disminuye en|Saldo normal|
|Activo|Debe|Haber|Deudor|
|Pasivo|Haber|Debe|Acreedor|
|Patrimonio|Haber|Debe|Acreedor|
|Ingreso|Haber|Debe|Acreedor|
|Gasto / Costo|Debe|Haber|Deudor|

> Regla de bolsillo: **activo y gasto al debe**; **pasivo, patrimonio e ingreso al haber**. Si memorizas solo que el activo aumenta al debe y que la suma debe cuadrar, puedes deducir todo lo demás. Los nombres "debe" y "haber" son herencia de los libros de cuentas corrientes medievales, donde se anotaba lo que el cliente *debía* y lo que *había* entregado: hoy son solo etiquetas de posición.

# Los cuatro tipos de permutación
Cualquier asiento es una combinación de estos cuatro movimientos:
1. **Activo aumenta / Activo disminuye**: compras mercadería pagando al contado. El activo total no cambia, cambia su forma.
2. **Activo aumenta / Pasivo aumenta**: compras al crédito o recibes un préstamo. El balance crece por los dos lados.
3. **Activo disminuye / Pasivo disminuye**: pagas una factura. El balance se encoge por los dos lados.
4. **Movimientos que tocan resultados**: un ingreso o un gasto, que termina afectando el patrimonio vía utilidad.

# Cómo se lee un asiento en el Perú
En el PCGE los asientos de compras y gastos usan una estructura de **doble asiento** característica: primero el gasto por naturaleza (clase 6) contra el pasivo (clase 4), y luego el destino, sea al almacén (clase 2 vía cuenta 61) o a la función (clase 9 contra la cuenta 79).

@ 05/03/2026 — Compra de mercadería al crédito, factura E001-245 por S/ 11,800
@ 60|6011 Mercaderías|10,000.00|
@ 40|40111 IGV - Cuenta propia|1,800.00|
@ 42|4212 Emitidas - Facturas por pagar||11,800.00

@ Ingreso de la mercadería al almacén
@ 20|2011 Mercaderías - Costo|10,000.00|
@ 61|6111 Variación de mercaderías||10,000.00

El primer asiento reconoce la obligación con el proveedor y el IGV que podrás usar como crédito fiscal. El segundo traslada la compra al inventario, porque la mercadería todavía no es gasto: será costo de ventas cuando se venda. La cuenta 61 "Variación de existencias" es el puente entre la clase 6 (compra) y la clase 2 (almacén), y es el detalle que más confunde a quien aprendió contabilidad con otro plan de cuentas.

@ 18/03/2026 — Venta al crédito de esa mercadería por S/ 17,700
@ 12|1212 Facturas por cobrar|17,700.00|
@ 40|40111 IGV - Cuenta propia||2,700.00
@ 70|7011 Mercaderías||15,000.00

@ Costo de la mercadería entregada
@ 69|6911 Mercaderías - Costo|10,000.00|
@ 20|2011 Mercaderías - Costo||10,000.00

Fíjate en que el IGV aparece en los dos asientos en la misma cuenta 40111 pero en lados opuestos: al comprar va al debe (crédito fiscal, un derecho) y al vender va al haber (débito fiscal, una deuda). Al final del mes el saldo de esa cuenta te dice si pagas IGV o si arrastras crédito.

! Error clásico de principiante: registrar la compra de mercadería directamente en la cuenta 20 sin pasar por la 60. Funciona aritméticamente, pero rompe la estructura del PCGE, deja el Registro de Compras sin correlato contable y hace imposible analizar la variación de existencias. En una fiscalización, esa desprolijidad llama la atención.

# La comprobación del equilibrio
En todo asiento: **suma del debe = suma del haber**. Si no cuadra, hay un error, y no se "fuerza" con una cuenta puente. Los descuadres frecuentes son:
- Olvidar el IGV en una de las dos partes.
- Registrar el importe total en la cuenta de gasto en vez de la base imponible.
- Invertir debe y haber en una cobranza, confundiendo cobrar con vender.

# Lo que la partida doble no garantiza
Que un asiento cuadre no significa que esté bien. Puedes registrar el alquiler en la cuenta 60 en lugar de la 63 y el balance cuadra perfecto, con el estado financiero mal. La partida doble controla la aritmética, no el criterio. Esa distinción, que hoy parece obvia, es la razón de que exista la auditoría.`,
  claves:['La partida doble se deduce de A = P + Pt: nada puede mover un solo lado de la igualdad.','Ijiri: la partida doble registra las dos caras de un hecho (el recurso y su causa), no dos veces lo mismo.','Activo y gasto aumentan al debe; pasivo, patrimonio e ingreso aumentan al haber.','En el PCGE las compras y gastos usan doble asiento: naturaleza (clase 6) y luego destino (clase 2 vía 61, o clase 9 vía 79).','Que un asiento cuadre no garantiza que esté bien clasificado: la partida doble controla la aritmética, no el criterio.'],
  preg:[
   {p:'Explica, sin usar las palabras "debe" ni "haber", por qué toda operación necesita al menos dos anotaciones.',
    r:'Porque la igualdad entre lo que la empresa tiene y lo que debe más lo que es de los dueños tiene que seguir siendo cierta después de cada hecho. Si solo se anotara que entró dinero, la igualdad se rompería: hay que anotar también de dónde salió ese dinero (de una venta, de un préstamo, del cobro de una deuda o de un aporte). Toda operación tiene origen y destino, y la contabilidad anota los dos.'},
   {p:'Una cuenta de activo aparece con saldo acreedor. ¿Siempre es un error?',
    r:'Casi siempre, pero no siempre. Hay cuentas ubicadas dentro de elementos de activo que son de valuación y tienen saldo acreedor por naturaleza: la 19 (estimación de cobranza dudosa), la 29 (desvalorización de existencias) y la 39 (depreciación acumulada). Restan del activo que corrigen. Fuera de esos casos, un activo acreedor es un error de registro o un indicio de otra cosa: una cuenta por cobrar acreedora suele ser un anticipo de cliente mal clasificado, y una caja acreedora es imposible físicamente y sugiere operaciones no registradas.'},
   {p:'¿Por qué el PCGE obliga a pasar las compras por la cuenta 60 y no directamente a la 20?',
    r:'Porque separa dos hechos distintos: la adquisición (qué se compró y a quién se le debe) y la incorporación al almacén (qué entró al inventario). Esa separación permite que el Registro de Compras tenga un correlato exacto en la contabilidad, hace visible la variación de existencias mediante la cuenta 61 y permite distinguir las compras que no llegan al almacén (suministros consumidos de inmediato) de las que sí. Si se registra directo en la 20, se pierde la trazabilidad y se complica cualquier cruce con las declaraciones.'},
   {p:'En la cuenta 40111 se registran tanto el IGV de compras como el de ventas. ¿No sería más claro usar dos cuentas distintas?',
    r:'La empresa puede abrir divisionarias distintas para el control interno, y muchas lo hacen. Pero contablemente tiene sentido que converjan: el IGV no es un gasto ni un ingreso, es una posición neta frente al Estado que se liquida mes a mes. Al compartir cuenta, el saldo al cierre del mes responde directamente la pregunta que importa: si es acreedor, hay que pagar; si es deudor, hay crédito que arrastrar. Con dos cuentas separadas habría que restarlas manualmente cada mes.'},
   {p:'Si el balance de comprobación cuadra, ¿puedo asumir que la contabilidad está correcta?',
    r:'No. Cuadra igual si se usó la cuenta equivocada, si se registró en el mes equivocado, si se omitió una operación completa (los dos lados) o si se registró dos veces la misma operación. La partida doble detecta errores aritméticos y asientos incompletos, no errores de criterio ni omisiones simétricas. Por eso el cierre serio incluye conciliaciones, inventario físico y revisión de saldos con lógica, y por eso existe la auditoría externa.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Se paga en efectivo una factura pendiente a un proveedor por S/ 5,000. ¿Qué tipo de permutación es?',
    o:['Activo aumenta / Activo disminuye','Activo disminuye / Pasivo disminuye','Gasto aumenta / Activo disminuye','Pasivo aumenta / Patrimonio disminuye'],r:1,
    s:'Activo disminuye (efectivo, al haber) y pasivo disminuye (cuentas por pagar, al debe). El balance total se reduce en S/ 5,000 por ambos lados. No hay gasto: ya se reconoció al recibir el bien o servicio; esto es solo la extinción de la obligación.'},
   {l:1,t:'mc',p:'¿En qué lado aumenta una cuenta de ingreso y cuál es su saldo normal?',
    o:['Aumenta en el debe; saldo deudor','Aumenta en el haber; saldo acreedor','Aumenta en el haber; saldo deudor','Depende de si la venta fue al contado o al crédito'],r:1,
    s:'Aumenta en el haber y su saldo normal es acreedor, igual que pasivos y patrimonio, porque incrementa el patrimonio. En la ecuación ampliada (Activo + Gastos = Pasivo + Patrimonio + Ingresos) los ingresos están del lado derecho. La forma de cobro no altera la naturaleza de la cuenta de ingreso: solo cambia la contrapartida, que será caja o cuentas por cobrar.'},
   {l:2,t:'num',p:'Una ferretería compra mercadería por S/ 24,780 incluido IGV (18%). ¿Qué importe va a la cuenta 6011 Mercaderías?',
    u:'S/',r:21000,tol:1,
    s:'La cuenta 60 recibe la **base imponible**, sin IGV.\nBase = 24,780 ÷ 1.18 = **S/ 21,000.00**\nIGV = 21,000 × 18% = S/ 3,780.00\nComprobación: 21,000 + 3,780 = 24,780 ✓\n\nAsiento: debe 6011 por 21,000 y debe 40111 por 3,780, haber 4212 por 24,780. El error típico es llevar los 24,780 a la cuenta 60: eso infla el costo del inventario, reduce indebidamente la utilidad futura y hace perder el control del crédito fiscal.'},
   {l:2,t:'ab',p:'Registra el asiento completo de la venta al contado de servicios de consultoría por S/ 5,900 incluido IGV, depositados en la cuenta corriente del BCP.',
    s:'Base imponible = 5,900 ÷ 1.18 = S/ 5,000.00 · IGV = S/ 900.00\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 1041 | Cuentas corrientes operativas - BCP | 5,900.00 | |\n| 40111 | IGV - Cuenta propia | | 900.00 |\n| 7041 | Prestación de servicios - Terceros | | 5,000.00 |\n\nNo hay asiento de destino, porque los ingresos no se reclasifican por función: eso solo ocurre con los gastos.\n\nDetalle peruano importante: si el servicio estuviera sujeto a **detracción** (varios servicios empresariales lo están), el cliente depositaría el porcentaje correspondiente en la cuenta del Banco de la Nación y el resto en el BCP. En ese caso el debe se parte entre la cuenta 1041 y la 1042 (cuentas de detracción), por el mismo total de S/ 5,900.'},
   {l:3,t:'ab',p:'Un comerciante registró así la compra de mercadería al crédito por S/ 9,440 incluido IGV: "Debe 20 Mercaderías 9,440 / Haber 42 Cuentas por pagar 9,440". Identifica los tres errores y escribe el registro correcto completo.',
    s:'**Error 1 — Importe:** llevó el total con IGV al inventario. La base es 9,440 ÷ 1.18 = S/ 8,000 y el IGV es S/ 1,440. Al no separarlo, perdió S/ 1,440 de crédito fiscal y sobrevaluó su inventario en ese monto.\n\n**Error 2 — Omisión de la clase 6:** en el PCGE la compra se reconoce primero por naturaleza en la cuenta 6011. Sin ese registro, el Registro de Compras no tiene correlato en el Libro Diario y no se puede analizar la variación de existencias.\n\n**Error 3 — Falta el asiento de destino:** el ingreso al almacén se hace contra la cuenta 61, que cierra el circuito compra → almacén.\n\n**Registro correcto:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6011 | Mercaderías - Costo | 8,000.00 | |\n| 40111 | IGV - Cuenta propia | 1,440.00 | |\n| 4212 | Emitidas - Facturas por pagar | | 9,440.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 2011 | Mercaderías - Costo | 8,000.00 | |\n| 6111 | Variación de mercaderías | | 8,000.00 |\n\n**Efecto si no se corrige:** inventario sobrevaluado en S/ 1,440, crédito fiscal no utilizado por S/ 1,440, y cuando venda esa mercadería su costo de ventas será mayor, por lo que declarará menos utilidad de la real. Es una inconsistencia que SUNAT detecta cruzando el Registro de Compras electrónico con la declaración de IGV.'}
  ],
  proy:{
   t:'Las primeras 15 operaciones de tu empresa',
   ctx:`Hasta ahora describiste tu empresa; ahora la vas a hacer funcionar. Vas a inventar un mes de operaciones realistas y registrarlas con partida doble, a mano o en una hoja de cálculo. A mano al menos las primeras cinco: la lógica se fija escribiéndola.`,
   pasos:[
    'Parte del balance de apertura que armaste en el proyecto integrador anterior.',
    'Inventa 15 operaciones de un mes típico de tu empresa, con fecha, descripción y documento de sustento. Incluye obligatoriamente: una compra al crédito, una compra al contado, una venta al crédito, una venta al contado, un pago a proveedor, una cobranza a cliente, un gasto de servicios (luz, agua o alquiler), un pago de sueldos y un retiro o aporte del dueño.',
    'Registra cada operación con partida doble, usando cuentas del PCGE al nivel de divisionaria, con su IGV cuando corresponda y con el asiento de destino cuando se trate de compras o gastos.',
    'Para cada asiento, escribe en una columna aparte qué tipo de permutación es (de los cuatro tipos del subtema).',
    'Suma todos los debes y todos los haberes del mes y comprueba que coinciden.',
    'Identifica, entre tus 15 operaciones, las que afectaron el resultado y las que solo movieron el balance, y cuenta cuántas hay de cada tipo.'
   ],
   entrega:[
    'Hoja con las 15 operaciones registradas, con columnas: fecha, glosa, documento, cuenta, denominación, debe, haber y tipo de permutación.',
    'La suma de control debe = haber.',
    'El conteo de operaciones que afectaron resultados frente a las que solo movieron el balance.'
   ],
   crit:[
    'Todas las compras y gastos tienen separada la base imponible del IGV.',
    'Las compras de mercadería tienen sus dos asientos (naturaleza y destino al almacén).',
    'El retiro del dueño NO está registrado como gasto.',
    'Los totales de debe y haber coinciden exactamente.'
   ],
   pista:'Escribe glosas útiles desde el primer asiento: "Compra de 200 unidades de perno hexagonal, F/ E001-45, proveedor Aceros del Sur" y no "compra". En el Módulo 2 vas a mayorizar estos asientos y vas a agradecerte la precisión.'
  },
  proyInt:{
   t:'De las operaciones al patrimonio: el efecto de un mes',
   integra:'1.1 a 1.4',
   ctx:`Ya tienes el punto de partida (balance de apertura) y un mes de movimiento (15 asientos). Toca medir el efecto: cómo cambió el patrimonio de tu empresa y por qué. Este proyecto conecta la ecuación contable con el resultado del periodo, que es el salto conceptual más importante del módulo.`,
   pasos:[
    'Toma el patrimonio inicial de tu balance de apertura.',
    'Clasifica tus 15 operaciones en tres grupos: las que aumentaron el patrimonio (ingresos), las que lo disminuyeron (gastos) y las que no lo tocaron.',
    'Calcula el resultado del mes como ingresos menos gastos.',
    'Calcula el patrimonio final de dos formas independientes: (a) patrimonio inicial más resultado del mes, más aportes, menos retiros; y (b) sumando todos los activos finales y restando todos los pasivos finales. Los dos resultados deben coincidir.',
    'Si no coinciden, encuentra la diferencia y explica por escrito cuál fue el error: esa búsqueda es el ejercicio más valioso del proyecto.',
    'Escribe una conclusión de media página para el dueño: ¿el mes fue bueno? ¿Cuánto de lo ganado está en caja y cuánto en otras partidas? ¿Qué le recomendarías?'
   ],
   entrega:[
    'El cuadro de las 15 operaciones clasificadas en los tres grupos.',
    'El doble cálculo del patrimonio final, con ambos métodos llegando a la misma cifra.',
    'La conclusión de media página dirigida al dueño.'
   ],
   crit:[
    'Los dos métodos de cálculo del patrimonio final dan exactamente el mismo número.',
    'Ni el aporte ni el retiro del dueño están tratados como ingreso o gasto.',
    'La conclusión distingue utilidad de caja: si tu empresa ganó dinero pero no lo tiene, eso debe estar dicho.'
   ],
   pista:'La coincidencia de los dos métodos no es una casualidad: es la ecuación contable comprobándose a sí misma. Si te cuadra a la primera, estás entendiendo. Si no, el error suele estar en el IGV o en el retiro del dueño.'
  },
  fuentes:[
   {a:'Luca Pacioli', o:'Summa de Arithmetica (1494), tratado De Computis et Scripturis', n:'la descripción original del método de partida doble veneciano'},
   {a:'Yuji Ijiri', o:'Theory of Accounting Measurement', n:'la partida doble como representación de causalidad, no como doble registro'},
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'el ciclo de registro y la mecánica de débitos y créditos'},
   {a:'Consejo Normativo de Contabilidad', o:'Plan Contable General Empresarial 2019', n:'dinámica de las cuentas 60, 61, 69 y 79 y la estructura del doble asiento'},
   {a:'Erly Zeballos Zeballos', o:'Contabilidad General', n:'ejemplos del circuito compra, almacén y costo de ventas con cuentas peruanas'}
  ]
 },
 {
  id:'m1t5', titulo:'El Plan Contable General Empresarial (PCGE 2019)', min:19,
  cont:`Un plan de cuentas es un lenguaje común. Sin él, dos contadores registrarían el mismo hecho con nombres distintos y nadie podría comparar, consolidar ni fiscalizar. El PCGE es ese lenguaje en el Perú: fue aprobado por **Resolución CNC 002-2019-EF/30** y rige desde el ejercicio 2020 para las empresas del sector privado que no tienen un plan sectorial propio. Los bancos y financieras usan el plan de la SBS, las aseguradoras el suyo, y el sector público el Plan Contable Gubernamental.

# Cómo se estructura un código
La codificación es decimal y se abre en niveles. Cada dígito añade precisión:

|Nivel|Dígitos|Nombre|Ejemplo|
|1|1|Elemento|6 - Gastos por naturaleza|
|2|2|Cuenta|60 - Compras|
|3|3|Subcuenta|601 - Mercaderías|
|4|4|Divisionaria|6011 - Mercaderías manufacturadas|
|5|5 o más|Subdivisionaria (libre)|60111 - Línea ferretería|

A partir del quinto dígito la empresa define lo que necesite, y esa libertad es la que convierte un plan oficial en un sistema de información útil: permite abrir las ventas por local, el costo por línea de producto o los gastos por centro de costo sin salirse de la norma.

! Lo que **no** se puede hacer es alterar los primeros cuatro dígitos. Si una empresa inventa una cuenta "61 Gastos de marketing", su Libro Diario electrónico queda inválido, porque la normativa de libros electrónicos exige identificar la cuenta del plan contable con su denominación oficial.

# Los nueve elementos y el cero
|Elemento|Qué agrupa|Lógica|
|1|Activo disponible y exigible|Efectivo, cuentas por cobrar, servicios pagados por anticipado|
|2|Activo realizable|Existencias: mercaderías, materias primas, productos en proceso|
|3|Activo inmovilizado|Inversiones, propiedades planta y equipo, intangibles, activo diferido|
|4|Pasivo|Tributos, remuneraciones, proveedores, obligaciones financieras, provisiones|
|5|Patrimonio neto|Capital, capital adicional, reservas, resultados|
|6|Gastos por naturaleza|Compras, personal, servicios, tributos, depreciación|
|7|Ingresos|Ventas, servicios, ingresos financieros, otros ingresos|
|8|Saldos intermediarios de gestión|Producción del ejercicio, valor agregado, determinación del resultado|
|9|Contabilidad analítica de explotación|Gastos por función: costo de producción, administración, ventas|
|0|Cuentas de orden|Bienes en préstamo, garantías recibidas y otorgadas, contingencias|

Los elementos 8 y 9 son los que más desconciertan. El **9** reclasifica los gastos de la clase 6 según **dónde** se consumieron, usando la cuenta 79 como contrapartida; el **8** calcula resultados intermedios y en la práctica muchas empresas lo usan de forma reducida. El elemento **0** registra lo que no es activo ni pasivo pero importa: una garantía otorgada, mercadería recibida en consignación, bienes entregados en custodia.

# Las cuentas que vas a usar todos los días
|Cuenta|Nombre|Uso típico|
|101 / 104|Caja / Cuentas corrientes|Efectivo y bancos|
|1041 / 1042|Operativas / De detracción|Separar la cuenta del Banco de la Nación|
|121 / 1212|Facturas por cobrar emitidas|Ventas al crédito|
|141|Préstamos al personal|Adelantos a trabajadores|
|18|Servicios contratados por anticipado|Seguros y alquileres pagados por adelantado|
|20 / 201|Mercaderías|Comercio|
|21 / 24|Productos terminados / Materias primas|Industria|
|33 / 334|Propiedades planta y equipo / Equipo de transporte|Activo fijo|
|39 / 391|Depreciación acumulada|Siempre con saldo acreedor|
|40111|IGV - Cuenta propia|Crédito y débito fiscal|
|4017|Impuesto a la Renta|Pagos a cuenta y regularización|
|403|Instituciones públicas|EsSalud, ONP, SENATI|
|41|Remuneraciones y participaciones por pagar|Planilla|
|4212|Facturas por pagar|Proveedores|
|45|Obligaciones financieras|Préstamos, leasing y arrendamientos|
|50 / 58 / 59|Capital / Reservas / Resultados acumulados|Patrimonio|
|60 / 61|Compras / Variación de existencias|Circuito de compras|
|62|Gastos de personal|Sueldos, gratificaciones, EsSalud|
|63|Servicios prestados por terceros|Luz, agua, teléfono, alquileres, honorarios|
|64|Gastos por tributos|Predial, arbitrios, ITAN|
|68|Valuación y deterioro|Depreciación, amortización, estimaciones|
|69|Costo de ventas|Contrapartida al dar de baja el inventario|
|70|Ventas|Ingresos por mercaderías, productos y servicios|
|79|Cargas imputables a costos y gastos|Puente hacia la clase 9|
|92 / 94 / 95|Costos de producción / Administración / Ventas|Destino por función|

> **Truco de lectura.** Si un código empieza en 1, 2 o 3 es activo; en 4 es pasivo; en 5 patrimonio; en 6 gasto; en 7 ingreso. Con eso ya sabes de qué lado va sin consultar el manual. Y recuerda la excepción: las cuentas **19**, **29** y **39** están dentro de elementos de activo pero tienen saldo **acreedor**, porque son cuentas de valuación que restan del activo que corrigen.

# La dinámica: la parte que casi nadie lee
El PCGE no es solo una lista de códigos. Para cada cuenta incluye su **dinámica**: qué se debita, qué se acredita, con qué cuentas se relaciona y qué comentarios de aplicación tiene. Ante una duda real —cómo registrar una permuta, un anticipo, una nota de crédito por bonificación— esa es la fuente que hay que abrir, no la intuición ni el foro de internet.

# Del plan de cuentas a los estados financieros
No confundas una cosa con la otra. El PCGE dice **cómo registras**; la presentación de los estados financieros sigue las NIIF y, para las empresas supervisadas, el Manual para la Preparación de Información Financiera de la SMV. Varias cuentas del plan se agrupan en una sola línea del Estado de Situación Financiera:

$ Línea "Efectivo y equivalentes de efectivo" = cuentas 101 + 104 + 105 + 107
$ Línea "Cuentas por cobrar comerciales, neto" = cuenta 12 − cuenta 191
$ Línea "Propiedades, planta y equipo, neto" = cuenta 33 − cuenta 39 − cuenta 36

# Cómo se diseña un plan de cuentas a la medida
1. Partir del PCGE hasta la divisionaria, sin tocar nada.
2. Identificar las preguntas de gestión que el dueño hace y no puede responder: ¿cuánto vendo por local?, ¿qué línea deja margen?, ¿cuánto gasto por vehículo?
3. Abrir subdivisionarias **solo** para responder esas preguntas. Un plan con 400 cuentas que nadie analiza es peor que uno con 80 bien usadas.
4. Replicar la misma apertura en las cuentas relacionadas: si abres ventas por local (70111, 70112), abre también el costo de ventas (69111, 69112) y los gastos de venta (95111, 95112). Sin esa simetría no se puede calcular margen por local.
5. Escribir el plan en un documento, con la descripción de qué va en cada cuenta. Ese documento es parte del manual contable.`,
  claves:['El PCGE 2019 (R. CNC 002-2019-EF/30) rige desde 2020 para empresas sin plan sectorial propio.','Los primeros cuatro dígitos son oficiales e intocables; del quinto en adelante la empresa abre lo que necesite.','1-2-3 activo, 4 pasivo, 5 patrimonio, 6 gasto, 7 ingreso, 8 saldos de gestión, 9 costos por función, 0 cuentas de orden.','Las cuentas 19, 29 y 39 están en elementos de activo pero tienen saldo acreedor: son de valuación.','La dinámica del PCGE es la fuente para resolver dudas de registro, y el plan de cuentas no es lo mismo que la presentación de los estados financieros.'],
  preg:[
   {p:'¿Por qué el PCGE deja libre la codificación a partir del quinto dígito en lugar de definirlo todo?',
    r:'Porque los primeros cuatro dígitos sirven para que la información sea comparable y fiscalizable entre empresas, mientras que del quinto en adelante las necesidades son particulares de cada negocio: una cadena con tres locales necesita abrir ventas por local, una fábrica por línea de producto, un estudio contable por tipo de servicio. Si la norma lo definiera todo, o sería inútilmente rígida o tendría que prever miles de casos. La frontera está donde termina lo comparable y empieza lo propio.'},
   {p:'Una empresa registra sus compras directamente en la cuenta 20 y nunca usa la 60. ¿Qué pierde?',
    r:'Pierde cuatro cosas: la trazabilidad entre el Registro de Compras y el Libro Diario, porque las compras no aparecen como tales en la contabilidad; el análisis de la variación de existencias, que es lo que explica cuánto del inventario se compró y cuánto se consumió; la posibilidad de distinguir compras que no van al almacén, como suministros de consumo inmediato; y la conformidad con la estructura que esperan los libros electrónicos. Aritméticamente cuadra, pero el sistema de información queda mutilado.'},
   {p:'¿Para qué sirve la cuenta 79 y qué pasaría si una empresa no usara la clase 9?',
    r:'La 79 es la contrapartida que permite reclasificar el gasto de la clase 6 (por naturaleza) en la clase 9 (por función) sin duplicarlo en el resultado: al cierre, la suma de la clase 9 se compensa con la 79. Sin la clase 9, el registro cuadra y los tributos se calculan igual, pero el Estado de Resultados por función (costo de ventas, gastos de administración, gastos de ventas) habría que armarlo a mano fuera del sistema, sin rastro contable de cómo se asignó cada gasto. Para una bodega es manejable; para una empresa con áreas y centros de costo, insostenible.'},
   {p:'¿Qué registrarías en una cuenta del elemento 0 y por qué no va en el activo o el pasivo?',
    r:'Bienes y compromisos que importan pero no cumplen la definición de activo o pasivo de la empresa: mercadería recibida en consignación, bienes entregados en garantía, cartas fianza, contratos firmados aún no ejecutados, bienes totalmente depreciados que siguen en uso. No van al balance porque la empresa no controla el recurso o no tiene una obligación presente, pero dejarlos sin registro sería perder el control de cosas valiosas o de riesgos reales. Las cuentas de orden se registran por partida doble entre sí, de modo que no alteran ni el activo ni el pasivo.'},
   {p:'Si la cuenta 39 está dentro del elemento 3, que es activo, ¿por qué su saldo es acreedor?',
    r:'Porque es una cuenta de valuación: no representa un recurso, representa la parte del costo del activo que ya se consumió. Se la ubica junto al activo que corrige para que el balance pueda mostrar el costo y la depreciación acumulada por separado, y presentar el valor neto. Si se restara directamente del costo en la cuenta 33, se perdería la información del costo original, que es necesaria para calcular la depreciación futura, para el control de activos y para la conciliación tributaria.'}
  ],
  ej:[
   {l:1,t:'mc',p:'La cuenta 39 Depreciación acumulada pertenece al elemento 3 (activo inmovilizado). ¿Cuál es su saldo normal?',
    o:['Deudor, porque está en el activo','Acreedor, porque es una cuenta de valuación que resta del activo','No tiene saldo, es de cierre','Depende del método de depreciación'],r:1,
    s:'Acreedor. Es una cuenta de valuación o regularizadora: acumula la depreciación para presentarla restando del costo del activo, de modo que el Estado de Situación Financiera muestre el valor neto. Lo mismo ocurre con la 19 (estimación de cuentas de cobranza dudosa) y la 29 (desvalorización de existencias). Si tu cuenta 39 tiene saldo deudor, hay un error de registro.'},
   {l:1,t:'mc',p:'¿Qué cuenta del PCGE usarías para registrar el gasto de energía eléctrica del mes?',
    o:['64 Gastos por tributos','63 Gastos de servicios prestados por terceros','60 Compras','68 Valuación y deterioro'],r:1,
    s:'La cuenta 63, específicamente 6364 Energía eléctrica. La 64 es para tributos (predial, arbitrios, ITAN), la 60 para compras de bienes que ingresan al almacén y la 68 para depreciaciones, amortizaciones y estimaciones. Luego el gasto se reclasifica por función a la 94 o 95 según el área que lo consumió, usando la 79 como contrapartida.'},
   {l:2,t:'num',p:'De estas cuentas, ¿cuántas tienen saldo normal ACREEDOR? 101, 19, 1212, 29, 39, 4212, 50, 6011, 7011, 95',
    r:6,tol:0,
    s:'Son **6**: la 19 (estimación de cobranza dudosa), la 29 (desvalorización de existencias), la 39 (depreciación acumulada), la 4212 (facturas por pagar), la 50 (capital) y la 7011 (ventas).\n\nDeudoras: 101 Caja (activo), 1212 Facturas por cobrar (activo), 6011 Mercaderías (gasto por naturaleza) y 95 Gastos de ventas (gasto por función).\n\nLa trampa está en las cuentas 19, 29 y 39: están codificadas dentro de elementos de activo pero su saldo es acreedor porque son de valuación.'},
   {l:2,t:'ab',p:'Una empresa comercial con tres tiendas quiere saber el margen de cada tienda sin salir del PCGE. Diseña la apertura de cuentas con sus códigos.',
    s:'Se usa la libertad del plan a partir del quinto dígito, y la clave es replicar la misma apertura en las tres cuentas que forman el margen.\n\n**Ventas** (la cuenta oficial llega a 7011 Mercaderías manufacturadas):\n- 70111 Ventas tienda Lima Centro\n- 70112 Ventas tienda Arequipa\n- 70113 Ventas tienda Trujillo\n\n**Costo de ventas** (cuenta oficial 6911):\n- 69111 Costo de ventas Lima Centro\n- 69112 Costo de ventas Arequipa\n- 69113 Costo de ventas Trujillo\n\n**Gastos de ventas** (cuenta 95):\n- 95111 Gastos de venta Lima Centro\n- 95112 Gastos de venta Arequipa\n- 95113 Gastos de venta Trujillo\n\nY conviene abrir también el inventario, para el control físico: 20111, 20112, 20113.\n\nCon esa estructura, el margen por tienda sale del sistema sin hojas de cálculo paralelas:\n\n| Concepto | Lima Centro | Arequipa | Trujillo |\n|---|---|---|---|\n| Ventas | 70111 | 70112 | 70113 |\n| (−) Costo de ventas | 69111 | 69112 | 69113 |\n| = Margen bruto | | | |\n| (−) Gastos de venta | 95111 | 95112 | 95113 |\n| = Margen por tienda | | | |\n\n**Lo que no se debe hacer:** abrir solo las ventas por tienda. Es el error más común, y deja a la gerencia creyendo que la tienda que más vende es la que más gana, cuando puede ser la que tiene el alquiler más caro y el margen más bajo.'},
   {l:3,t:'ab',p:'Explica con un asiento completo el circuito de la cuenta 79 para un alquiler de S/ 4,720 (incluido IGV) del que el 60% corresponde a la oficina administrativa y el 40% al local de ventas, y di qué pasa con esas cuentas al cierre del ejercicio.',
    s:'Base imponible = 4,720 ÷ 1.18 = S/ 4,000 · IGV = S/ 720\n\n**Asiento 1 — por naturaleza:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6352 | Alquiler de edificaciones | 4,000.00 | |\n| 40111 | IGV - Cuenta propia | 720.00 | |\n| 4212 | Emitidas - Facturas por pagar | | 4,720.00 |\n\n**Asiento 2 — de destino por función:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 94 | Gastos de administración (60%) | 2,400.00 | |\n| 95 | Gastos de ventas (40%) | 1,600.00 | |\n| 79 | Cargas imputables a costos y gastos | | 4,000.00 |\n\n**Por qué el gasto no se duplica:** la cuenta 79 es acreedora y neutraliza el efecto de la clase 9. El gasto se reconoce una sola vez, por la clase 6; la clase 9 solo lo clasifica.\n\n**Al cierre del ejercicio**, las cuentas de las clases 6, 7, 8 y 9 se cancelan, porque pertenecen a un periodo que terminó:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 79 | Cargas imputables a costos y gastos | 4,000.00 | |\n| 94 | Gastos de administración | | 2,400.00 |\n| 95 | Gastos de ventas | | 1,600.00 |\n\nY la cuenta 63 se cancela contra la 89 Determinación del resultado del ejercicio, junto con el resto de gastos e ingresos. Las cuentas de balance (1 a 5) no se cancelan: pasan al ejercicio siguiente.\n\n**Comprobación de que todo cuadra:** el gasto que llegó al resultado es S/ 4,000 (por la clase 6), la clase 9 quedó en cero y la 79 también. El IGV de S/ 720 no es gasto: está en la cuenta 40111 esperando compensarse con el IGV de las ventas.'}
  ],
  proy:{
   t:'El plan de cuentas de tu empresa',
   ctx:`Hasta ahora clasificaste los elementos de tu empresa en lenguaje común. Ahora les vas a poner código. El entregable de este proyecto es un documento que, en una empresa real, se entrega al programador que configura el sistema contable, y que nadie en una MYPE suele tener escrito.`,
   pasos:[
    'Escribe las tres preguntas de gestión que el dueño de tu empresa necesita responder cada mes y que hoy no puede (por local, por línea, por vehículo, por cliente, por obra).',
    'Lista las cuentas del PCGE hasta nivel de divisionaria que tu empresa va a usar de verdad. Apunta a entre 40 y 80 cuentas: si pasas de 100 en una empresa pequeña, estás copiando el plan completo en lugar de diseñarlo.',
    'Abre subdivisionarias solo donde respondan una de tus tres preguntas, y hazlo de forma simétrica: si abres la venta, abre también su costo y su gasto asociado.',
    'Para cada cuenta que abras, escribe una línea de descripción: qué entra ahí y qué no. Esa columna es la que evita que dos personas registren distinto el mismo hecho.',
    'Marca en una columna aparte las cuentas de valuación (19, 29, 39, 36) y anota su saldo normal, para que nadie las registre al revés.',
    'Traduce tu balance de apertura del proyecto integrador de 1.3 a tu nuevo plan de cuentas: cada partida con su código.'
   ],
   entrega:[
    'Hoja de cálculo con el plan de cuentas: código, denominación, nivel, naturaleza (deudora o acreedora) y descripción de uso.',
    'La lista de las tres preguntas de gestión y, al lado de cada una, las cuentas que la responden.',
    'El balance de apertura recodificado.'
   ],
   crit:[
    'Los primeros cuatro dígitos de cada cuenta coinciden exactamente con el PCGE oficial.',
    'Cada subdivisionaria que abriste responde una pregunta de gestión concreta, no está abierta por si acaso.',
    'Las aperturas son simétricas entre ventas, costo de ventas y gastos de venta.',
    'Las cuentas de valuación están identificadas con su saldo acreedor.'
   ],
   pista:'Si no sabes dónde va algo, abre el PCGE en la dinámica de la cuenta candidata y lee qué se debita y qué se acredita. Es el reflejo profesional que conviene adquirir desde ahora: la respuesta está en la norma, no en la intuición.'
  },
  proyInt:{
   t:'Tu primer mes, registrado con tu propio plan de cuentas',
   integra:'1.1 a 1.5',
   ctx:`Vas a rehacer el trabajo del módulo con el plan de cuentas que acabas de diseñar. Rehacer no es perder tiempo: es exactamente lo que ocurre en una empresa real cuando se migra de sistema o se reordena la contabilidad, y es la mejor forma de descubrir si tu plan funciona o si lo diseñaste para que se vea bonito.`,
   pasos:[
    'Vuelve a registrar las 15 operaciones del proyecto de 1.4, ahora con los códigos de tu propio plan de cuentas, al nivel de subdivisionaria que diseñaste.',
    'Arma el mayor de cinco cuentas clave de tu empresa: caja o bancos, cuentas por cobrar, inventario o su equivalente, cuentas por pagar y la cuenta de IGV. Para cada una: saldo inicial, movimientos del mes y saldo final.',
    'Responde con tus propios números las tres preguntas de gestión que escribiste en el proyecto anterior. Si tu plan de cuentas no te permite responderlas, corrígelo ahora y di qué cambiaste.',
    'Verifica tres cosas: que la suma de debes iguale la de haberes, que el saldo de caja no sea negativo y que ninguna cuenta de activo tenga saldo acreedor salvo las de valuación.',
    'Escribe media página para el dueño explicando qué información nueva puede ver ahora que antes no veía.'
   ],
   entrega:[
    'Los 15 asientos recodificados.',
    'El mayor de las cinco cuentas clave.',
    'Las tres preguntas de gestión respondidas con cifras.',
    'La media página para el dueño.'
   ],
   crit:[
    'Las tres preguntas de gestión quedan respondidas con cifras que salen del registro, no estimadas aparte.',
    'Ninguna cuenta de activo quedó con saldo acreedor, salvo las de valuación.',
    'Si tuviste que corregir el plan de cuentas, el cambio está documentado y justificado.'
   ],
   pista:'Guarda las dos versiones, la del plan genérico y la del plan propio. La comparación entre ambas es el mejor argumento que vas a tener cuando le propongas a un empleador reordenar su plan de cuentas.'
  },
  fuentes:[
   {a:'Consejo Normativo de Contabilidad', o:'Plan Contable General Empresarial 2019 (R. CNC 002-2019-EF/30)', n:'la norma misma: estructura, catálogo de cuentas y dinámica de cada una'},
   {a:'Martha Abanto Bromley', o:'Plan Contable General Empresarial: aplicación práctica', n:'casos resueltos de aplicación de la dinámica a operaciones frecuentes'},
   {a:'Demetrio Giraldo Jara', o:'Plan Contable General Empresarial y contabilidad básica', n:'desarrollo de la codificación por niveles y ejemplos de apertura'},
   {a:'Alejandro Ferrer Quea', o:'Estados Financieros: análisis e interpretación por sectores económicos', n:'cómo se agrupan las cuentas del plan en las líneas de los estados financieros'},
   {a:'Ley del Impuesto a la Renta, artículo 65 y R.S. 234-2006/SUNAT', o:'Obligación de llevar libros y registros', n:'la exigencia de identificar la cuenta contable con su denominación en los libros'}
  ]
 },
 {
  id:'m1t6', titulo:'Comprobantes de pago y sustento de las operaciones', min:19,
  cont:`En el Perú, un registro contable sin comprobante válido es un registro en riesgo: puede costar el crédito fiscal del IGV y la deducción del gasto en el Impuesto a la Renta. El **Reglamento de Comprobantes de Pago** (R.S. 007-99/SUNAT) y la normativa de emisión electrónica definen qué documento corresponde a cada operación.

# Qué documento usar
|Comprobante|Cuándo se emite|Da crédito fiscal|Sustenta costo o gasto|
|Factura|A quien tiene RUC y requiere sustentar costo, gasto o crédito fiscal|Sí|Sí|
|Boleta de venta|A consumidores finales|No|Solo con límites|
|Recibo por honorarios|Lo emite una persona natural por servicios de cuarta categoría|No|Sí|
|Nota de crédito|Anulaciones, descuentos, devoluciones, bonificaciones|Ajusta|Ajusta|
|Nota de débito|Recuperación de costos, intereses moratorios|Ajusta|Ajusta|
|Guía de remisión|Traslado de bienes|No|No: es documento de traslado|
|Liquidación de compra|Compras a personas naturales sin RUC de productos primarios|Sí, con requisitos|Sí|
|Ticket o cinta de máquina registradora|Ventas masivas al consumidor final|Solo si cumple requisitos de factura|Según el caso|

# La facturación electrónica es hoy la regla
Prácticamente todos los contribuyentes emiten comprobantes electrónicos a través del Sistema de Emisión Electrónica. Lo que cambia frente al papel:

- El comprobante existe cuando el **XML** se genera y se remite a SUNAT dentro del plazo. El PDF es solo su representación impresa: no tiene valor por sí mismo.
- SUNAT valida y devuelve una **CDR** (Constancia de Recepción). Un comprobante rechazado no existe para efectos tributarios, aunque el cliente lo haya recibido y pagado.
- La anulación no se hace rompiendo papeles: se usa una **comunicación de baja** o una **nota de crédito**, según el caso y el plazo.
- El receptor puede verificar la validez del comprobante en el portal de SUNAT antes de registrarlo. Hacerlo es parte del control interno, sobre todo con proveedores nuevos.
- El traslado de bienes se sustenta con la **guía de remisión electrónica (GRE)**, que tiene su propia estructura y plazos, y que no reemplaza a la factura.

# Las tres capas que hacen deducible un gasto
No basta tener el papel. Un gasto sobrevive a una fiscalización solo si pasa las tres:

1. **Formal**: el comprobante cumple los requisitos del reglamento (datos del emisor y del adquirente, descripción, importes, IGV discriminado), el emisor tiene RUC activo y está habido, y el documento se anotó en el registro dentro del plazo.
2. **Sustancial**: el gasto cumple el **principio de causalidad** del artículo 37 de la Ley del Impuesto a la Renta, es decir, es necesario para producir renta o mantener su fuente, con razonabilidad y proporcionalidad.
3. **Probatoria (fehaciencia)**: existe evidencia de que la operación realmente ocurrió. Contratos, órdenes de compra, conformidad de servicio, guías de remisión, correos, informes, fotografías, registros de ingreso. El Tribunal Fiscal ha confirmado en reiterada jurisprudencia que el comprobante por sí solo no acredita la realidad de la operación.

! **Bancarización.** Toda obligación desde S/ 2,000 o US$ 500 debe pagarse con medios de pago del sistema financiero: transferencia, depósito en cuenta, cheque no negociable, tarjeta. Si se paga en efectivo por encima de ese límite, se pierde el derecho a deducir el gasto o costo y a usar el crédito fiscal, **aunque la factura sea impecable**. Y no se arregla fraccionando el pago: la norma mira la obligación, no cada desembolso.

# El flujo documentario de una compra bien hecha
1. **Orden de compra** al proveedor: control interno, no es comprobante.
2. **Guía de remisión** con la que llega la mercadería; se verifica contra lo pedido.
3. **Nota de ingreso al almacén**, que respalda el asiento a la cuenta 20.
4. **Factura electrónica** del proveedor; se valida en SUNAT y se registra en el Registro de Compras.
5. **Depósito de la detracción**, si la operación está sujeta: es requisito para usar el crédito fiscal del periodo.
6. **Pago bancarizado**, con su constancia.

Cada documento responde una pregunta distinta: qué pedí, qué llegó, qué entró al almacén, cuánto debo, y cómo pagué. Si falta uno, hay un eslabón que nadie puede reconstruir después.

# El SIRE cambió el trabajo del contador
El **Sistema Integrado de Registros Electrónicos** preconstruye el Registro de Compras y el de Ventas con los comprobantes electrónicos que SUNAT ya tiene. El contribuyente descarga la propuesta, la compara con su contabilidad y la acepta, modifica o complementa.

> La consecuencia es profunda: **las omisiones salen a la luz el mismo mes**. Si un proveedor emitió una factura y la empresa no la registró, aparece en la propuesta; si la empresa registró una factura que el proveedor nunca emitió, no aparece y queda en evidencia. El trabajo del contador pasó de digitar a investigar diferencias, y eso exige entender el negocio, no solo el software.

# El archivo: lo que queda cuando ya nadie recuerda
La facultad de SUNAT para fiscalizar prescribe en plazos que se cuentan en años, y una fiscalización llega cuando quien hizo el registro ya no trabaja en la empresa. Por eso el expediente de cada operación significativa se arma **cuando ocurre**, no cuando llega la carta: contrato, comprobante, sustento de la operación, medio de pago y, si corresponde, constancia de detracción, todo junto y localizable.`,
  claves:['Factura para operaciones que requieren crédito fiscal; boleta para consumidor final, sin crédito fiscal.','El comprobante electrónico es el XML con su CDR; el PDF es solo la representación impresa.','Un gasto deducible debe pasar tres capas: formal, causalidad y fehaciencia.','Bancarización: desde S/ 2,000 o US$ 500 el pago va por el sistema financiero o se pierden gasto y crédito fiscal.','El SIRE preconstruye los registros: el trabajo pasó de digitar a conciliar, y las omisiones se ven el mismo mes.'],
  preg:[
   {p:'Un proveedor te entrega un PDF de factura impecable, pero al consultar en SUNAT el comprobante no aparece. ¿Qué tienes?',
    r:'No tienes nada, tributariamente. En el sistema de emisión electrónica el comprobante válido es el XML aceptado por SUNAT, acreditado por su CDR. Un PDF es solo una representación impresa y puede generarse sin que el comprobante se haya remitido o habiendo sido rechazado. Sin comprobante válido no hay crédito fiscal ni sustento del gasto. Lo que corresponde es exigir al proveedor que lo emita correctamente antes de pagar, y no registrar nada mientras tanto.'},
   {p:'¿Por qué la ley exige fehaciencia si ya exige comprobante? ¿No es desconfiar dos veces?',
    r:'Porque el comprobante prueba que alguien emitió un documento, no que la operación haya ocurrido. Existen facturas emitidas por operaciones inexistentes, que es precisamente el mecanismo de las empresas de fachada. Si bastara el comprobante, cualquiera podría comprar gastos. La fehaciencia obliga a que exista rastro real: entregables, conformidades, ingresos al almacén, correos. En la práctica, cuanto más intangible es lo adquirido (asesorías, servicios de gestión, marketing), más exigente es la revisión, porque es donde más fácil resulta simular.'},
   {p:'Una MYPE paga S/ 3,000 en efectivo a un proveedor con factura válida. ¿Qué pierde exactamente y puede arreglarlo después pagando por banco?',
    r:'Pierde el crédito fiscal del IGV de esa operación y la deducción del costo o gasto para el Impuesto a la Renta: sobre S/ 3,000 incluido IGV, son unos S/ 458 de IGV y unos S/ 750 de impuesto adicional por el gasto no deducible. No se arregla después: la norma exige que el medio de pago se use al momento de cumplir la obligación, así que un pago posterior por banco no revive el derecho. Tampoco sirve fraccionar en pagos menores a S/ 2,000, porque el límite se mide sobre la obligación, no sobre cada desembolso.'},
   {p:'¿Qué cambia en el trabajo mensual del contador por la existencia del SIRE?',
    r:'Antes, el contador digitaba los comprobantes y SUNAT verificaba después, a veces años más tarde. Ahora SUNAT propone el registro con lo que ya tiene y el contador concilia: identifica comprobantes que la empresa no registró, comprobantes que registró y SUNAT no tiene, y diferencias de importes. El valor del trabajo se desplazó de la digitación a la investigación de diferencias, que exige conocer el negocio: saber si una compra que apareció corresponde a la empresa, si un comprobante propio no se envió, o si alguien está comprando fuera del circuito autorizado.'},
   {p:'¿Por qué la guía de remisión no sustenta el gasto si acredita que la mercadería llegó?',
    r:'Porque acredita el traslado físico, no la operación comercial ni su importe. Una guía no dice a qué precio se vendió, si hubo descuentos, ni qué IGV corresponde; incluso puede amparar traslados que no son ventas, como el envío entre almacenes de la misma empresa o la salida de bienes para reparación. El sustento del gasto y del crédito fiscal lo da la factura; la guía es una pieza del expediente que refuerza la fehaciencia, y su ausencia en una compra de bienes es justamente una de las cosas que un fiscalizador nota.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una empresa compra útiles de oficina por S/ 350 y le entregan una boleta de venta. ¿Puede usar el IGV como crédito fiscal?',
    o:['Sí, el IGV siempre es crédito fiscal','No: la boleta de venta no otorga derecho al crédito fiscal','Sí, si la registra en el Registro de Compras','Sí, si el importe es menor a S/ 700'],r:1,
    s:'No. La boleta está diseñada para consumidores finales y no permite ejercer el crédito fiscal del IGV. Para ello se requiere factura, o un ticket que cumpla los requisitos de factura. Para la deducción del gasto en Renta, las boletas tienen además un límite global anual, por lo que la buena práctica es pedir siempre factura con el RUC de la empresa.'},
   {l:1,t:'mc',p:'¿Qué documento se emite para anular parcialmente una factura por una devolución de mercadería?',
    o:['Nota de débito','Nota de crédito','Guía de remisión','Una nueva factura en negativo'],r:1,
    s:'Nota de crédito electrónica, que ajusta el importe y el IGV de la factura original a la que debe hacer referencia. La nota de débito se usa en el sentido contrario: recuperar costos, cobrar intereses moratorios o aumentar el valor de la operación. No existen facturas en negativo en el sistema peruano.'},
   {l:2,t:'num',p:'Una MYPE paga en efectivo S/ 6,500 a un proveedor por mercadería, con factura electrónica válida. ¿Cuánto IGV pierde como crédito fiscal?',
    u:'S/',r:991.53,tol:2,
    s:'Base = 6,500 ÷ 1.18 = S/ 5,508.47\nIGV = 5,508.47 × 18% = **S/ 991.53**\n\nAl no bancarizar una obligación de S/ 6,500, que supera el límite de S/ 2,000, se pierde ese crédito fiscal y además la deducción del costo de S/ 5,508.47, que con tasa del 29.5% significa otros S/ 1,625 de impuesto. El perjuicio total ronda los **S/ 2,616** sobre una compra de S/ 6,500: casi el 40%. Contablemente la compra se registra igual, porque el hecho económico ocurrió, pero el IGV se incorpora al costo y en la declaración anual el gasto se adiciona como diferencia permanente.'},
   {l:2,t:'ab',p:'Al conciliar el SIRE encuentras tres facturas de compra que SUNAT tiene y tu empresa no registró, por S/ 23,600 en total. Explica qué harías, en orden, y qué pregunta de control interno abre el hallazgo.',
    s:'**Qué hacer, en orden:**\n\n1. **Obtener los comprobantes** (el XML, no el PDF) y verificar que correspondan efectivamente a la empresa: que el RUC del adquirente sea el nuestro y que la operación exista. Una factura emitida a nuestro RUC por una operación que no ocurrió es un problema distinto y más grave.\n2. **Validar al proveedor** en el portal de SUNAT: RUC activo y condición de habido **a la fecha de emisión**, no a la fecha de hoy.\n3. **Verificar la bancarización**: si alguna obligación superó S/ 2,000 y se pagó en efectivo, el gasto y el crédito fiscal se perdieron aunque registremos ahora.\n4. **Verificar la detracción**, si alguna operación está sujeta: el crédito fiscal solo se puede ejercer desde el periodo en que se acredite el depósito.\n5. **Registrarlas** en el Registro de Compras y en el Libro Diario, dentro del plazo de 12 meses desde la emisión. El crédito fiscal recuperable es 23,600 × 18/118 = **S/ 3,600**, y el costo o gasto S/ 20,000.\n\n**La pregunta de control interno, que es lo importante:** ¿por qué esas facturas no llegaron a contabilidad? Las causas habituales son que alguien compró sin pasar por el proceso de compras, que el proveedor envía los comprobantes a un correo personal, o que hay compras pagadas directamente por el dueño. Si pasó con tres facturas en un mes, está pasando todos los meses, y la mitad de las veces el problema no es documental sino de autorización: hay gente comprando sin que nadie lo apruebe.\n\n**La medida concreta:** definir un único correo de recepción de comprobantes, exigir orden de compra previa por encima de un monto, y conciliar el SIRE **antes** de cada declaración, no al cierre del año.'},
   {l:3,t:'ab',p:'SUNAT fiscaliza a una consultora y desconoce S/ 180,000 de gastos por "servicios de asesoría", pese a que existen facturas electrónicas válidas, están bancarizados y se registraron correctamente. ¿Con qué argumento puede hacerlo y qué debió tener la empresa?',
    s:'**El argumento es la falta de fehaciencia**, y eventualmente de causalidad. Que el comprobante sea válido y el pago esté bancarizado acredita la forma, no la realidad del servicio. SUNAT puede sostener que no hay prueba de que el servicio se haya prestado, lo que convierte el gasto en no deducible y desconoce también el crédito fiscal del IGV.\n\n**El expediente que debió existir, por cada servicio:**\n\n1. **Contrato o propuesta aceptada**, con alcance, plazos, entregables y honorarios.\n2. **Evidencia del entregable**: informes, presentaciones, modelos, correos de avance con fecha.\n3. **Acta de conformidad** firmada por el área usuaria.\n4. **Rastro de la relación**: correos, actas de reunión, registros de ingreso de los consultores.\n5. **Perfil del proveedor**: que tenga capacidad real de prestar ese servicio (personal, experiencia, domicilio verificable). Un proveedor sin trabajadores que factura S/ 180,000 de asesoría especializada es una alerta inmediata.\n6. **Vinculación con la generación de renta**: cómo contribuyó ese servicio al negocio, con razonabilidad frente al tamaño de la empresa.\n\n**Efecto económico del reparo:**\n\n| Concepto | Importe aproximado |\n|---|---|\n| Impuesto a la Renta (180,000 × 29.5%) | 53,100 |\n| IGV reparado | 32,400 |\n| Multa por declarar cifras falsas (50% del tributo omitido, antes de gradualidad) | 42,750 |\n| Intereses moratorios | variable |\n| **Total en riesgo** | **más de 128,000** |\n\n**La lección práctica:** la carpeta de sustento se arma cuando ocurre la operación, no cuando llega la carta de fiscalización tres años después. En ese momento los consultores ya no trabajan ahí, los correos se borraron y nadie recuerda qué entregaron. Y hay un matiz profesional incómodo: si el contador advirtió por escrito que faltaba el sustento y la gerencia decidió deducir igual, esa constancia escrita es lo que separa su responsabilidad de la de la empresa.'}
  ],
  proy:{
   t:'El expediente documental de tu empresa',
   ctx:`Vas a construir el sistema documental de tu empresa: qué documento acompaña a cada operación, quién lo emite, quién lo revisa y dónde se archiva. Es el entregable que distingue una contabilidad que sobrevive a una fiscalización de una que no.`,
   pasos:[
    'Toma tres operaciones representativas de tu empresa: una compra de bienes, un servicio recibido y una venta.',
    'Para cada una, lista la cadena completa de documentos que debería existir, desde la orden de compra hasta la constancia de pago, indicando quién emite cada documento y quién lo verifica.',
    'Diseña una lista de verificación de una página para el ingreso de facturas de proveedor: validación del RUC en SUNAT, condición de habido, comprobación del XML y su CDR, verificación de si la operación está sujeta a detracción, y confirmación del medio de pago.',
    'Define la política de archivo: qué se guarda, en qué formato (digital o físico), dónde, con qué nombre y por cuánto tiempo.',
    'Simula un caso: inventa una compra de tu empresa por S/ 8,000 pagada en efectivo y calcula en soles cuánto perdería por no bancarizar.',
    'Escribe las tres reglas documentales que tu empresa no puede romper nunca, en lenguaje que entienda alguien que no es contador.'
   ],
   entrega:[
    'Las tres cadenas documentales, con responsables.',
    'La lista de verificación de facturas de una página.',
    'La política de archivo.',
    'El cálculo del caso de no bancarización y las tres reglas de oro.'
   ],
   crit:[
    'Cada documento de la cadena tiene un responsable con nombre de puesto, no "la empresa".',
    'La lista de verificación es aplicable por alguien sin formación contable.',
    'El cálculo de la no bancarización incluye el IGV perdido y el efecto en el Impuesto a la Renta.'
   ],
   pista:'Las tres reglas de oro suelen ser estas: ninguna factura se paga sin su orden de compra y su conformidad; nada por encima de S/ 2,000 se paga en efectivo; y ningún comprobante se registra sin validarlo en SUNAT. Escríbelas con tus palabras y pégala donde se reciben las facturas.'
  },
  proyInt:{
   t:'Cierre del módulo: el expediente completo del primer mes',
   integra:'1.1 a 1.6',
   ctx:`Este proyecto cierra el módulo y es el primer entregable "de verdad" del curso: el expediente contable completo del primer mes de tu empresa, listo para que lo revise un tercero. Un auditor, un banco o un empleador deberían poder entenderlo sin que tú estés al lado explicando.`,
   pasos:[
    'Arma una carpeta, física o digital, con estas secciones numeradas: (1) manual contable y políticas, (2) plan de cuentas, (3) balance de apertura, (4) libro diario del mes, (5) mayores de las cuentas clave, (6) expediente documental de tres operaciones, (7) resultado del mes y patrimonio final.',
    'Escribe un índice de una página que diga qué hay en cada sección y en qué página empieza.',
    'Añade una hoja de control de calidad en la que tú mismo verifiques: debe igual a haber, caja no negativa, activos sin saldo acreedor salvo los de valuación, todas las compras con su base y su IGV separados, retiros del dueño fuera de los gastos, y comprobantes de las tres operaciones completos.',
    'Escribe un informe de una página dirigido al dueño: cómo nació la empresa, qué pasó en el mes, cuánto ganó, cuánto tiene en caja, qué debe y qué tres decisiones debería tomar el mes siguiente.',
    'Tacha de la lista de preguntas abiertas de tu manual (proyecto integrador de 1.2) todas las que ya puedes responder, y deja las que no: esas son tu agenda para el Módulo 2.'
   ],
   entrega:[
    'La carpeta completa con sus siete secciones y el índice.',
    'La hoja de control de calidad firmada por ti.',
    'El informe de una página para el dueño.',
    'La lista de preguntas abiertas actualizada.'
   ],
   crit:[
    'Un tercero puede recorrer el expediente sin explicaciones verbales y llegar a las mismas cifras.',
    'Todos los puntos de la hoja de control están verificados, no solo listados.',
    'El informe al dueño distingue utilidad de caja y propone decisiones concretas, no observaciones genéricas.',
    'La lista de preguntas abiertas se redujo respecto de la versión de 1.2.'
   ],
   pista:'Este expediente es el entregable que puedes mostrar en una entrevista de trabajo. Guárdalo en PDF con el índice al inicio: vale más que cualquier certificado, porque demuestra que sabes hacer el trabajo completo y no solo responder preguntas sueltas.'
  },
  fuentes:[
   {a:'SUNAT', o:'Reglamento de Comprobantes de Pago (R.S. 007-99/SUNAT)', n:'qué comprobante corresponde a cada operación y sus requisitos'},
   {a:'Congreso de la República', o:'Ley 28194, de bancarización y del ITF', n:'la obligación de usar medios de pago y el efecto de no hacerlo'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'causalidad, fehaciencia y los reparos más frecuentes en fiscalización'},
   {a:'Walker Villanueva Gutiérrez', o:'Tratado del IGV: regímenes general y especiales', n:'requisitos sustanciales y formales del crédito fiscal'},
   {a:'Tribunal Fiscal', o:'Jurisprudencia sobre fehaciencia de operaciones', n:'el criterio reiterado de que el comprobante no acredita por sí solo la realidad de la operación'},
   {a:'SUNAT', o:'Normativa del Sistema de Emisión Electrónica y del SIRE', n:'XML, CDR, comunicaciones de baja y la propuesta de registros'}
  ]
 }
 ]
}
);
