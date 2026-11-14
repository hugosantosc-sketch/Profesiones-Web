/* Contenido del curso — m5 · Código Tributario y procedimientos ante SUNAT
   Formato del mini-marcado (campo cont):
     '# '  subtítulo      '- '  lista        '1. ' lista numerada
     '> '  nota           '! '  advertencia  '$ ' fórmula
     '|'   tabla (primera fila = encabezado)
     '@'   asiento contable: primera línea título, luego cta|detalle|debe|haber
   En línea: **negrita**  ~código~
   Campos por subtema: cont, claves, preg, ej, proy, proyInt, fuentes
*/
(window.CURSO = window.CURSO || []).push(
{
 id:'m5', nivel:'Intermedio · Avanzado', titulo:'Código Tributario y procedimientos ante SUNAT',
 resumen:'Las reglas del juego: cómo nace y se extingue la deuda tributaria, cómo determina SUNAT, cómo fiscaliza, qué sanciona y cómo se defiende el contribuyente.',
 temas:[
 {
  id:'m5t1', titulo:'La obligación tributaria: nacimiento, sujetos, extinción y prescripción', min:26,
  cont:`Todo lo que has visto hasta ahora —IGV, renta, retenciones— son tributos concretos. El **Código Tributario** es la norma que regula lo común a todos ellos: cómo nace la deuda, quién la debe, cómo se paga, cómo se extingue y en cuánto tiempo prescribe. Es el derecho común de la materia tributaria, y conocerlo es lo que separa a un contador que registra de uno que puede defender a su cliente.

# El Título Preliminar: las reglas sobre las reglas
Las dieciséis normas del Título Preliminar gobiernan todo el sistema. Las que más se usan:

|Norma|Qué establece|
|**II**|Clasificación tripartita del tributo: **impuesto** (sin contraprestación directa), **contribución** (beneficio por obra o actividad estatal) y **tasa** (prestación efectiva de un servicio individualizado). La tasa se subdivide en arbitrio, derecho y licencia|
|**IV**|**Principio de legalidad y reserva de ley**: solo por ley se crea, modifica o suprime un tributo, se señala el hecho generador, la base, la tasa, el acreedor y el deudor|
|**VIII**|**Interpretación**: se admiten todos los métodos del Derecho, pero **no se puede crear tributos, exoneraciones ni sanciones por analogía**|
|**IX**|Aplicación supletoria de los principios del Derecho Tributario, del Derecho Administrativo y del Derecho común|
|**XVI**|**Norma antielusiva general**: faculta a exigir la deuda como si no hubieran existido actos artificiosos o impropios destinados únicamente a obtener una ventaja tributaria|

> La distinción entre impuesto, contribución y tasa no es académica. Define quién puede crearlos (los municipios pueden crear tasas y contribuciones, no impuestos), qué se exige para su validez y cómo se defiende el contribuyente. Un "arbitrio" cobrado por un servicio que no se presta efectivamente es impugnable precisamente porque la tasa exige prestación efectiva.

# La obligación tributaria
El artículo 1 la define como el **vínculo entre el acreedor y el deudor tributario, establecido por ley, que tiene por objeto el cumplimiento de la prestación tributaria, siendo exigible coactivamente**. Tres rasgos importan:

1. Es una obligación **de derecho público**: no nace de un acuerdo de voluntades sino de la ley.
2. Su objeto es una **prestación**, normalmente de dar dinero.
3. Es **exigible coactivamente**: el Estado puede cobrarla sin acudir a un juez, mediante la cobranza coactiva.

$ Nacimiento (art. 2): cuando se realiza el hecho previsto en la ley como generador de la obligación
$ Exigibilidad (art. 3): desde el día siguiente al vencimiento del plazo fijado

La diferencia entre **nacimiento** y **exigibilidad** explica algo que confunde: el IGV de una venta del 3 de marzo nace ese día, pero recién es exigible después del vencimiento de la declaración de marzo. Antes de eso no hay mora ni intereses.

# Los sujetos
|Sujeto|Quién es|
|**Acreedor tributario**|Gobierno Central, gobiernos regionales, gobiernos locales y las entidades de derecho público con personería jurídica propia cuando la ley les asigna esa calidad|
|**Deudor tributario**|La persona obligada al cumplimiento: contribuyente o responsable|
|**Contribuyente**|Quien realiza el hecho generador (art. 8)|
|**Responsable**|Quien, sin ser contribuyente, debe cumplir la obligación (art. 9)|

# La responsabilidad solidaria: el riesgo personal del gerente
Los artículos 16 a 20 establecen quiénes responden con su patrimonio por la deuda de otro. Los dos supuestos que todo contador debe conocer:

**Representantes legales y designados (art. 16).** Los representantes, administradores, gerentes y síndicos responden solidariamente cuando por **dolo, negligencia grave o abuso de facultades** se dejen de pagar las deudas tributarias. La ley presume dolo o negligencia grave, salvo prueba en contrario, en casos como no llevar libros, tener condición de no habido, emplear comprobantes falsos o no entregar al fisco el tributo **retenido o percibido**.

**Agentes de retención y percepción (art. 18).** Quien debió retener y no retuvo responde solidariamente; quien retuvo y no pagó es el **único responsable**.

! Ese último matiz es decisivo y poco conocido. Si una empresa retiene la quinta categoría de sus trabajadores y no la paga al fisco, deja de ser responsable solidaria para convertirse en responsable exclusiva: el dinero nunca fue suyo. Y usar ese dinero para cubrir otros gastos, además de generar deuda, puede tener consecuencias que exceden lo tributario.

# Domicilio fiscal y condición de no habido
El domicilio fiscal es el lugar fijado por el deudor dentro del territorio nacional para todo efecto tributario. Se presume subsistente mientras no se comunique su cambio.

|Condición|Cómo se llega|Consecuencias|
|**No hallado**|SUNAT no ubica al contribuyente en tres visitas, o el domicilio es inexistente|Paso previo al no habido|
|**No habido**|El no hallado no regulariza en el plazo que se le otorga|Sus comprobantes no dan derecho a crédito fiscal ni sustentan gasto; se puede disponer el ingreso como recaudación de la cuenta de detracciones; se presume dolo o negligencia grave para la responsabilidad solidaria|

La condición de no habido es, en la práctica, una muerte comercial: ningún cliente que entienda del tema comprará a un proveedor no habido, porque perdería el crédito fiscal y el gasto.

# Extinción de la obligación (art. 27)
|Medio|En qué consiste|
|**Pago**|El modo normal. Puede hacerse en efectivo, con medios electrónicos, notas de crédito negociables o documentos valorados|
|**Compensación**|Se cruza la deuda con un crédito del contribuyente (saldos a favor, pagos en exceso o indebidos). Puede ser automática, de oficio o a solicitud de parte|
|**Condonación**|Solo por norma expresa con rango de ley. Los gobiernos locales pueden condonar intereses y sanciones de los tributos que administran|
|**Consolidación**|Cuando el acreedor se convierte en deudor de la misma obligación, por ejemplo por una herencia|
|**Resolución de la Administración sobre deudas de cobranza dudosa o recuperación onerosa**|Deudas sin posibilidad razonable de cobro o cuyo costo de cobranza supera el monto|

# La imputación del pago: un detalle que cuesta dinero
$ Art. 31: los pagos se imputan PRIMERO al interés moratorio y LUEGO al tributo o multa

Esto significa que un pago parcial de una deuda antigua se consume primero en intereses, y el capital casi no baja. Y como los intereses siguen corriendo sobre el tributo impago, una deuda abandonada crece de forma persistente. La **Tasa de Interés Moratorio (TIM)** la fija SUNAT y se aplica por día.

# La prescripción: el plazo que salva o condena
La prescripción extingue la **acción** de la Administración para determinar la deuda, exigir su pago y aplicar sanciones. No extingue la deuda en sí: si el contribuyente paga una deuda prescrita, no puede pedir devolución.

|Plazo|Supuesto|
|**4 años**|Regla general, cuando se presentó la declaración|
|**6 años**|Cuando **no se presentó** la declaración jurada|
|**10 años**|Cuando el agente de retención o percepción **no pagó** el tributo retenido o percibido|
|**4 años**|Para solicitar o efectuar la compensación, o para pedir devolución|

**Cómputo (art. 44):** el plazo se cuenta desde el **1 de enero siguiente** a la fecha de vencimiento de la declaración anual o del periodo correspondiente, según el caso. Es decir, el IGV de marzo de 2026, cuya declaración vence en abril de 2026, empieza a prescribir el 1 de enero de 2027 y prescribiría, en el supuesto general, al término del cuarto año.

**Interrupción (art. 45):** el plazo vuelve a cero con actos como la notificación de una resolución de determinación, el reconocimiento expreso de la obligación, el pago parcial de la deuda o la solicitud de fraccionamiento.

**Suspensión (art. 46):** el plazo se detiene y luego continúa, durante la tramitación de un procedimiento contencioso, de una demanda contencioso-administrativa, o mientras el contribuyente tenga condición de no habido, entre otros supuestos.

> **La trampa del reconocimiento.** Un contribuyente con una deuda próxima a prescribir que solicita un fraccionamiento **interrumpe** la prescripción y reinicia el conteo desde cero. Lo mismo ocurre con un pago parcial hecho de buena fe. Antes de tocar una deuda antigua, lo primero que debe revisarse es si está por prescribir: la diferencia entre no hacer nada y hacer un gesto bienintencionado puede ser de años de deuda.

La prescripción **no opera de oficio**: debe ser invocada por el deudor. Puede oponerse en cualquier estado del procedimiento administrativo o judicial, y se solicita mediante el procedimiento correspondiente ante SUNAT.`,
  claves:['El Título Preliminar fija las reglas comunes: clasificación del tributo, reserva de ley, prohibición de analogía y norma antielusiva.','La obligación nace al realizarse el hecho generador y es exigible desde el día siguiente al vencimiento del plazo.','Los representantes responden solidariamente por dolo, negligencia grave o abuso de facultades; quien retiene y no paga es responsable único.','Los pagos se imputan primero a intereses y luego al tributo, por lo que una deuda abandonada casi no baja con pagos parciales.','La prescripción es de 4, 6 o 10 años según el caso, se cuenta desde el 1 de enero siguiente, no opera de oficio y se interrumpe con el reconocimiento o el fraccionamiento.'],
  preg:[
   {p:'¿Por qué importa distinguir entre el nacimiento de la obligación tributaria y su exigibilidad?',
    r:'Porque son momentos distintos con efectos distintos. La obligación **nace** cuando ocurre el hecho generador —la venta, el pago de la remuneración, la importación— y eso define a qué periodo pertenece el tributo y qué norma le es aplicable. Se vuelve **exigible** recién después del vencimiento del plazo para declarar y pagar, y desde ese momento corren los intereses moratorios y puede iniciarse la cobranza. Entre un momento y otro el contribuyente tiene la obligación pero no está en mora. Confundirlos lleva a calcular mal los intereses y a creer que una deuda es exigible antes de tiempo.'},
   {p:'La Norma VIII prohíbe crear tributos por analogía, pero la Norma XVI permite desconocer actos artificiosos. ¿No se contradicen?',
    r:'No, porque operan en planos distintos. La prohibición de analogía impide **extender** el hecho generador a situaciones que la ley no previó: si la ley grava la venta de bienes muebles, no se puede gravar por analogía una operación parecida que la ley no contempló. La norma antielusiva, en cambio, no extiende el hecho generador: desconoce la forma jurídica artificiosa adoptada por el contribuyente para encubrir un hecho que **sí está gravado**. La diferencia es sutil pero fundamental: una crea tributos donde no los hay, la otra impide que se disfracen los que sí existen. Por eso la Norma XVI tiene requisitos y procedimientos especiales para su aplicación.'},
   {p:'¿Qué diferencia hay entre no haber retenido y haber retenido sin pagar?',
    r:'En el primer caso, el agente responde **solidariamente**: el fisco puede cobrarle a él o al contribuyente, porque el dinero del tributo todavía estaba en manos del contribuyente cuando debió retenerse. En el segundo, el agente es el **único responsable**: retuvo dinero que no era suyo y no lo entregó, de modo que el contribuyente ya cumplió su parte y no puede ser perseguido. La diferencia práctica es enorme para la empresa: cuando retiene y no paga, no hay nadie con quien compartir la responsabilidad, el plazo de prescripción se extiende a diez años y se configura además una presunción de dolo o negligencia grave que puede alcanzar al representante legal en su patrimonio personal.'},
   {p:'Un contribuyente tiene una deuda de 2019 a punto de prescribir y quiere "ponerse al día" fraccionándola. ¿Qué le aconsejas?',
    r:'Que primero verifique el estado de la prescripción con su asesor, antes de hacer cualquier gesto. Solicitar un fraccionamiento **interrumpe** la prescripción y reinicia el conteo desde cero: una deuda que iba a extinguirse en meses se convierte en una deuda viva por varios años más. Lo mismo ocurre con un pago parcial o con un reconocimiento expreso. Si el plazo ya se cumplió, lo que corresponde es **invocar la prescripción**, no pagar. Y si la deuda no está prescrita ni cerca, entonces sí el fraccionamiento puede ser una buena herramienta. El orden de las decisiones es lo que cambia el resultado.'},
   {p:'¿Por qué la prescripción extingue la acción y no la deuda, y qué consecuencia práctica tiene?',
    r:'Porque la obligación sigue existiendo como obligación natural: lo que se extingue es la facultad de la Administración para determinarla, exigirla o sancionarla. La consecuencia práctica es que si el contribuyente paga voluntariamente una deuda prescrita, **ese pago es válido y no puede pedir su devolución**, porque estaba pagando algo que debía. Por eso la prescripción debe invocarse antes de pagar, no después. Y por eso tampoco opera de oficio: la Administración no está obligada a recordarle al contribuyente que su deuda prescribió.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un municipio quiere crear un impuesto a las antenas de telefonía instaladas en su distrito. ¿Puede?',
    o:['Sí, tiene autonomía municipal','No: los gobiernos locales pueden crear tasas y contribuciones, pero no impuestos','Sí, con acuerdo del concejo','Solo si lo aprueba el gobierno regional'],r:1,
    s:'No puede. Por el principio de reserva de ley de la Norma IV, los impuestos se crean solo por ley o decreto legislativo. Los gobiernos locales pueden crear, modificar y suprimir **contribuciones y tasas** (arbitrios, derechos y licencias) dentro de su jurisdicción y con los límites que señala la ley, pero no impuestos. Varias ordenanzas que crearon cargas con nombre de tasa pero naturaleza de impuesto han sido declaradas inconstitucionales precisamente por esto.'},
   {l:1,t:'num',p:'Una empresa debe S/ 10,000 de tributo y S/ 2,500 de intereses acumulados. Paga S/ 3,000. ¿Cuánto queda de tributo impago?',
    u:'S/',r:9500,tol:1,
    s:'El artículo 31 manda imputar el pago **primero a los intereses** y luego al tributo:\nIntereses cubiertos: S/ 2,500\nQueda del pago para el tributo: 3,000 − 2,500 = S/ 500\n**Tributo impago = 10,000 − 500 = S/ 9,500**\n\nEs decir, pagó S/ 3,000 y su deuda de tributo bajó solo S/ 500. Y sobre esos S/ 9,500 seguirán corriendo intereses. Esta mecánica explica por qué las deudas tributarias abandonadas parecen no bajar nunca con pagos parciales, y por qué conviene atacarlas con un fraccionamiento o un pago total antes que con abonos sueltos.'},
   {l:2,t:'mc',p:'Una empresa retuvo S/ 40,000 de quinta categoría a sus trabajadores y no los pagó al fisco. ¿Quién responde?',
    o:['Los trabajadores, porque es su impuesto','La empresa como responsable solidaria junto con los trabajadores','La empresa como única responsable','Nadie, hasta que SUNAT lo detecte'],r:2,
    s:'La empresa es la **única responsable**. El artículo 18 establece que quien retuvo y no pagó asume en exclusiva la obligación: los trabajadores ya sufrieron el descuento y cumplieron su parte. Además, el plazo de prescripción en este supuesto se extiende a **diez años**, se configura la presunción de dolo o negligencia grave que puede alcanzar patrimonialmente al representante legal, y el dinero retenido nunca fue de la empresa, lo que agrava la situación más allá de lo estrictamente tributario.'},
   {l:2,t:'ab',p:'El IGV de marzo de 2026 de una empresa (declaración vencida en abril de 2026) no fue declarado ni pagado. ¿Cuándo prescribe la acción de SUNAT y qué podría cambiarlo?',
    s:'**Plazo aplicable:** como **no se presentó la declaración**, el plazo es de **6 años**, no de 4.\n\n**Cómputo (art. 44):** el plazo se cuenta desde el **1 de enero siguiente** a la fecha en que venció el plazo para presentar la declaración. La declaración de marzo de 2026 venció en abril de 2026, así que el cómputo empieza el **1 de enero de 2027** y, en principio, el plazo se cumpliría al término del sexto año, es decir el **1 de enero de 2033**.\n\n**Qué interrumpiría el plazo (art. 45), reiniciándolo desde cero:**\n\n| Acto | Quién lo hace |\n|---|---|\n| Notificación de una resolución de determinación o de multa | SUNAT |\n| Notificación de una orden de pago | SUNAT |\n| Reconocimiento expreso de la obligación | El contribuyente |\n| Pago parcial de la deuda | El contribuyente |\n| Solicitud de fraccionamiento | El contribuyente |\n| Notificación de un requerimiento de fiscalización sobre ese periodo | SUNAT |\n\n**Qué lo suspendería (art. 46), deteniéndolo temporalmente:**\n- La tramitación de un procedimiento contencioso tributario.\n- La tramitación de una demanda contencioso-administrativa o de una acción de amparo.\n- El lapso en que el contribuyente tenga condición de **no habido**.\n- El plazo de una solicitud de devolución o compensación en trámite.\n\n**La advertencia práctica, que es el punto del ejercicio:** un contribuyente que en 2031 decide "regularizar" presentando la declaración omitida y pagando una parte, **interrumpe** la prescripción y reinicia un plazo completo. Si la deuda ya estaba cerca de extinguirse, ese gesto bienintencionado la revive por años. Antes de regularizar deuda antigua hay que revisar su estado de prescripción; y si ya prescribió, lo que corresponde es invocarla formalmente, no pagar.\n\n**Y el otro lado de la moneda:** si la empresa necesita un certificado de no adeudo, participar en una licitación o vender el negocio, una deuda viva aunque sea antigua bloqueará esos trámites. La decisión no es solo tributaria.'},
   {l:3,t:'ab',p:'El gerente general de una S.A.C. renunció en 2024. En 2026 SUNAT le notifica que responde solidariamente por deudas de IGV de 2022 y 2023 por S/ 380,000, alegando que la empresa está no habida y que no se llevaron libros. Analiza su situación y su defensa.',
    s:'**El fundamento de SUNAT:** el artículo 16 establece la responsabilidad solidaria de los representantes legales cuando por **dolo, negligencia grave o abuso de facultades** se dejen de pagar las deudas tributarias. Y la norma **presume** dolo o negligencia grave, salvo prueba en contrario, en supuestos como no llevar los libros exigidos y tener la condición de no habido. Al apoyarse en esas presunciones, SUNAT invierte la carga de la prueba: no tiene que demostrar la conducta, el gerente tiene que desvirtuarla.\n\n**Los cuatro ejes de defensa, en orden de solidez:**\n\n**1. Delimitación temporal del cargo.** La responsabilidad alcanza el periodo en que efectivamente ejerció el cargo y tuvo la posibilidad de decidir. Debe acreditar con la escritura pública, la inscripción en Registros Públicos, el acta de renuncia y su inscripción, la fecha exacta en que cesó. Las deudas generadas o cuyos hechos de incumplimiento ocurrieron después de su cese no le son imputables.\n\n**2. Desvirtuar la presunción.** Puede probar que durante su gestión sí se llevaron los libros y que la empresa no estaba no habida: contratos con el contador, constancias de presentación de declaraciones, libros electrónicos enviados con sus constancias, correspondencia. Si la condición de no habido se adquirió después de su renuncia, la presunción no puede proyectarse hacia atrás.\n\n**3. Ausencia de participación en la decisión.** La responsabilidad exige que el incumplimiento le sea atribuible. Si puede demostrar que advirtió por escrito al directorio o a la junta sobre el incumplimiento y que no tenía facultades para disponer de los fondos —por ejemplo, porque los pagos requerían firma conjunta del accionista—, debilita la imputación. Aquí vale oro cualquier correo o informe fechado donde haya advertido el problema.\n\n**4. Prescripción.** Debe verificar si la acción para determinar y exigir esas deudas ya prescribió, considerando que el plazo puede haberse interrumpido o suspendido. Y debe verificar también la **atribución de responsabilidad solidaria**, que tiene su propio procedimiento: SUNAT debe emitir una resolución de atribución debidamente motivada, que es impugnable.\n\n**La vía procedimental:** la resolución que atribuye responsabilidad solidaria se impugna mediante **reclamación** y luego **apelación** ante el Tribunal Fiscal, en los plazos del procedimiento contencioso. No es necesario pagar previamente si se reclama dentro del plazo.\n\n**La lección preventiva, que es lo que debe quedar:** ser gerente general de una empresa con problemas tributarios es un riesgo patrimonial personal, no solo profesional. Quien acepta el cargo debería (a) verificar el estado tributario de la empresa antes de aceptar, (b) dejar constancia escrita de toda advertencia que haga sobre incumplimientos, (c) inscribir su renuncia en Registros Públicos de inmediato, porque frente a terceros vale la inscripción, y (d) conservar copia de la documentación de su gestión. Un contador que asesora a gerentes debe explicarles esto el primer día, no cuando llega la notificación.'}
  ],
  proy:{
   t:'El diagnóstico de obligaciones de tu empresa',
   ctx:`Hasta ahora calculaste tributos. Ahora vas a mirarlos como **obligaciones jurídicas**: cuándo nacieron, quién responde, cuándo se vuelven exigibles y cuándo prescriben. Es el cambio de perspectiva que permite defender a un cliente en lugar de solo declarar por él.`,
   pasos:[
    'Toma todas las obligaciones tributarias de tu empresa identificadas en los Módulos 3 y 4 y arma una matriz con: tributo, hecho generador, fecha de nacimiento, fecha de exigibilidad, quién es el contribuyente y quién el responsable.',
    'Separa las obligaciones en las que tu empresa actúa como contribuyente de aquellas en las que es agente de retención, y señala en cada caso qué tipo de responsabilidad tiene.',
    'Simula una deuda vencida: toma el IGV de uno de los meses que registraste y supón que no se pagó. Calcula los intereses moratorios a seis meses con la TIM vigente y aplica la regla de imputación del artículo 31 a un pago parcial.',
    'Construye el calendario de prescripción de tu empresa: para cada obligación de los dos meses registrados, indica el plazo aplicable (4, 6 o 10 años) y la fecha en que empezaría a computarse.',
    'Identifica los actos que podrían interrumpir o suspender esos plazos.',
    'Evalúa el riesgo de responsabilidad solidaria del representante legal de tu empresa: ¿se configura alguno de los supuestos que presumen dolo o negligencia grave? Propón las medidas preventivas.',
    'Verifica la condición de domicilio fiscal: ¿tu empresa tiene un domicilio donde efectivamente se le pueda ubicar? Documenta el procedimiento para mantenerlo actualizado.'
   ],
   entrega:[
    'La matriz de obligaciones con nacimiento, exigibilidad y sujetos.',
    'El cálculo de intereses y la aplicación de la regla de imputación.',
    'El calendario de prescripción por obligación.',
    'La evaluación de riesgo del representante legal con medidas preventivas.'
   ],
   crit:[
    'La matriz distingue correctamente nacimiento de exigibilidad en cada tributo.',
    'El cálculo de imputación demuestra que el pago parcial casi no reduce el tributo.',
    'Las medidas preventivas para el representante legal son concretas y documentables.'
   ],
   pista:'Para el cálculo de intereses usa la TIM vigente que publica SUNAT y recuerda que se aplica por día. El resultado suele sorprender: una deuda abandonada dos años crece considerablemente, y el efecto se agrava con la regla de imputación.'
  },
  proyInt:{
   t:'Manual de contingencias tributarias de tu empresa',
   integra:'1.1 a 5.1',
   ctx:`Un contador que solo declara es prescindible; uno que anticipa contingencias es indispensable. Vas a convertir todo lo tributario que has construido en un sistema de alerta temprana para tu empresa.`,
   pasos:[
    'Recupera las matrices de riesgo tributario que armaste en los Módulos 3 y 4 y conviértelas en un solo registro de contingencias, con columnas: riesgo, origen (norma), probabilidad, impacto en soles, estado de prescripción y control preventivo.',
    'Agrega los riesgos jurídicos nuevos de este subtema: responsabilidad solidaria del representante, condición de no habido, deudas que se acercan a la prescripción, retenciones efectuadas y no pagadas.',
    'Para cada contingencia, determina el plazo de prescripción aplicable y la fecha estimada en que dejaría de ser exigible.',
    'Clasifica las contingencias en tres grupos: las que hay que corregir ya, las que hay que documentar mejor y las que solo hay que monitorear.',
    'Diseña el tablero de control tributario de tu empresa: cinco indicadores que el contador revisa cada mes (por ejemplo, condición de habido, retenciones pagadas frente a retenidas, saldo de la cuenta de detracciones, deudas en cobranza, obligaciones próximas a vencer).',
    'Redacta el protocolo de respuesta: qué hace la empresa cuando llega una esquela, una carta inductiva, un requerimiento o una orden de pago. Incluye plazos y responsables.'
   ],
   entrega:[
    'El registro único de contingencias con prescripción y controles.',
    'La clasificación en los tres grupos de acción.',
    'El tablero de control tributario mensual.',
    'El protocolo de respuesta ante notificaciones.'
   ],
   crit:[
    'Cada contingencia tiene su plazo de prescripción identificado, no solo su importe.',
    'El tablero tiene indicadores verificables mensualmente, no objetivos generales.',
    'El protocolo fija plazos concretos de respuesta, porque en materia tributaria los plazos son perentorios.'
   ],
   pista:'El indicador más barato y más olvidado del tablero es la condición de habido. Se consulta en segundos en el portal de SUNAT y su pérdida desencadena media docena de consecuencias graves.'
  },
  fuentes:[
   {a:'TUO del Código Tributario (D.S. 133-2013-EF)', o:'Título Preliminar y artículos 1 a 49', n:'obligación tributaria, sujetos, responsabilidad solidaria, extinción y prescripción'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'análisis artículo por artículo con jurisprudencia del Tribunal Fiscal'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'naturaleza de la obligación tributaria y la hipótesis de incidencia'},
   {a:'Francisco Ruiz de Castilla y Carmen Robles Moreno', o:'Código Tributario: doctrina y comentarios', n:'clasificación tripartita del tributo y principios del Título Preliminar'},
   {a:'Héctor B. Villegas', o:'Curso de finanzas, derecho financiero y tributario', n:'teoría general de la obligación tributaria y de los sujetos pasivos'}
  ]
 },
 {
  id:'m5t2', titulo:'Determinación sobre base cierta y base presunta', min:25,
  cont:`Determinar es establecer **si existe** una deuda tributaria, **quién** la debe y **cuánto** es. El artículo 59 del Código Tributario señala que la determinación puede hacerla el propio deudor —que es lo normal, mediante su declaración— o la Administración, de oficio.

$ Autodeterminación: el contribuyente declara y liquida (sujeta a fiscalización posterior)
$ Determinación de oficio: SUNAT establece la deuda, sobre base cierta o sobre base presunta

# Las dos bases
|Base|Definición (art. 63)|Fuente de información|
|**Cierta**|Se toman en cuenta los elementos existentes que permiten **conocer en forma directa** el hecho generador y su cuantía|Libros, comprobantes, contratos, extractos bancarios, información de terceros|
|**Presunta**|Se toman en cuenta hechos y circunstancias que, por **relación normal** con el hecho generador, permiten establecer su existencia y cuantía|Presunciones legales del propio Código|

La regla es clara: **la base cierta es la regla y la presunta la excepción**. SUNAT no puede elegir libremente: solo puede acudir a la base presunta cuando se configura alguno de los supuestos habilitantes del artículo 64, y debe motivar cuál es.

# Los supuestos habilitantes del artículo 64
Son las puertas de entrada a la determinación presunta. Las más frecuentes:

1. El deudor **no presentó** las declaraciones dentro del plazo requerido.
2. La declaración presentada o la documentación **ofrece dudas** sobre su veracidad o exactitud, o no incluye los requisitos exigidos.
3. El deudor **no exhibe** los libros, registros o documentos requeridos, o los presenta incompletos.
4. Se detecta el **ocultamiento** de activos, rentas, ingresos, bienes, pasivos o gastos falsos.
5. Se verifiquen **discrepancias** entre los comprobantes y los registros contables.
6. Se detecte **omisión o alteración** en el registro de ventas, compras o inventarios.
7. Los comprobantes **no se encuentran impresos** conforme a las normas, o no reúnen los requisitos.
8. El deudor tiene la condición de **no habido**.
9. Se verifique que el deudor **no se encuentra inscrito** en los registros de la Administración.

! Que se configure un supuesto del artículo 64 **habilita** la determinación presunta, pero no la impone automáticamente ni valida cualquier cálculo. La Administración debe motivar la causal, aplicar una de las presunciones **tipificadas en la ley** y respetar su procedimiento. Si usa un método que la ley no contempla, el Tribunal Fiscal ha dejado sin efecto determinaciones por esa sola razón.

# Las presunciones tipificadas (artículos 66 a 72)
La ley no permite presumir "a ojo": fija un catálogo cerrado de métodos.

|Presunción|Cómo funciona|
|**Omisiones en el Registro de Ventas** (art. 66)|Si en no menos de 4 meses de 12 se detectan omisiones mayores al 10% de las ventas de esos meses, se incrementan las ventas de **todos** los meses con el porcentaje de omisión detectado, que no puede ser menor al 10%|
|**Omisiones en el Registro de Compras** (art. 67)|Similar, presumiendo ventas a partir de compras no registradas, aplicando el margen de utilidad bruta|
|**Diferencia entre bienes registrados e inventarios** (art. 69)|Faltantes y sobrantes de inventario se convierten en ventas o compras omitidas|
|**Patrimonio no declarado** (art. 70)|La diferencia patrimonial no justificada se presume renta neta gravada|
|**Diferencias en cuentas bancarias** (art. 71)|Depósitos no sustentados se presumen ingresos omitidos|
|**Insumo-producto** (art. 72)|A partir del consumo de insumos se estima la producción y las ventas|
|**Control directo o punto fijo** (art. 68)|SUNAT controla las ventas durante determinados días y proyecta el resultado al mes y al periodo|

# Un ejemplo del punto fijo
SUNAT controla las ventas de una pollería durante 5 días no consecutivos del mes y registra:

|Día controlado|Ventas del día|
|Martes|1,800|
|Jueves|2,100|
|Sábado|4,500|
|Domingo|4,200|
|Lunes|1,400|

$ Promedio diario = (1,800 + 2,100 + 4,500 + 4,200 + 1,400) ÷ 5 = 2,800
$ Ventas presuntas del mes = 2,800 × 30 días = 84,000

Si el contribuyente declaró S/ 45,000 en ese mes, la diferencia de S/ 39,000 se presume venta omitida, con efectos en IGV y en renta. La norma establece reglas específicas sobre el número mínimo de días de control, la inclusión de días comerciales distintos y cómo se proyecta el resultado, precisamente para que el muestreo sea representativo.

> La defensa del contribuyente frente a un punto fijo suele apuntar a la **representatividad del muestreo**: si los días controlados coinciden con una fecha excepcional (un feriado largo, un evento en la zona), el promedio está sesgado. Es un argumento que exige evidencia, no afirmaciones.

# Los efectos de la determinación presunta (artículo 65-A)
Aquí está lo que convierte a la base presunta en algo devastador:

|Efecto|Consecuencia|
|Para el **IGV**|Las ventas presuntas incrementan el débito fiscal, pero **no otorgan derecho a crédito fiscal alguno** sobre ellas|
|Para la **renta**|Las ventas o ingresos presuntos se consideran renta neta, sin posibilidad de deducir costos o gastos adicionales|
|**Pérdidas arrastrables**|No se puede compensar la renta presunta con pérdidas de ejercicios anteriores|
|**Régimen tributario**|Si el contribuyente está en RER o NRUS y la presunción lo saca de los límites, se le aplica el régimen que corresponda|

$ Venta presunta de S/ 100,000 en una empresa del Régimen General:
$ IGV: 100,000 × 18% = 18,000 (sin crédito fiscal que oponer)
$ Renta: 100,000 × 29.5% = 29,500 (sin deducir costos)
$ Multas e intereses: adicionales
$ Carga efectiva: cercana al 50% del monto presunto, sin contar multas

Por eso la determinación presunta no es "una forma alternativa de calcular": es, en los hechos, una consecuencia gravosa de no haber llevado la contabilidad en orden.

# Cuándo NO procede la presunción
- Cuando la Administración **puede** determinar sobre base cierta: si tiene los elementos, debe usarlos.
- Cuando no se configura ninguna causal del artículo 64 o esta no está motivada.
- Cuando se aplica un método no previsto en la ley.
- Cuando se aplican **dos presunciones a la vez** sobre el mismo periodo y tributo: la ley ordena aplicar la que arroje el mayor monto, no sumarlas.

# La defensa del contribuyente: el orden correcto
1. **Cuestionar la causal**: ¿realmente se configuró un supuesto del artículo 64? ¿está motivado?
2. **Cuestionar la procedencia**: ¿había elementos para determinar sobre base cierta?
3. **Cuestionar el método**: ¿es una presunción tipificada? ¿se siguió su procedimiento?
4. **Cuestionar el cálculo**: ¿el muestreo es representativo? ¿los porcentajes están bien aplicados?
5. **Aportar la base cierta**: presentar la documentación que permita determinar directamente.

> El orden importa. Discutir el cálculo sin cuestionar antes la causal es aceptar implícitamente que la presunción procedía. Un buen escrito de reclamación ataca primero la habilitación y solo subsidiariamente el monto.`,
  claves:['La determinación puede hacerla el deudor (autodeterminación) o la Administración, sobre base cierta o presunta.','La base cierta es la regla; la presunta solo procede si se configura y se motiva una causal del artículo 64.','Las presunciones están tipificadas en la ley: omisiones en registros, inventarios, patrimonio, cuentas bancarias, insumo-producto y punto fijo.','La renta presunta no admite costos, gastos, crédito fiscal ni compensación de pérdidas: la carga efectiva se acerca al 50%.','La defensa ataca en orden: causal, procedencia, método, cálculo, y recién al final aporta la base cierta.'],
  preg:[
   {p:'¿Por qué la ley establece que la base cierta es la regla y la presunta la excepción?',
    r:'Porque la determinación debe reflejar la capacidad contributiva real, y la única forma de conocerla con precisión es a partir de los hechos efectivamente ocurridos. Una presunción es, por definición, una aproximación: parte de un indicio y deduce una conclusión que puede no corresponder a la realidad. Permitir que la Administración elija libremente la presunta abriría la puerta a determinaciones arbitrarias y a gravar riqueza inexistente. Por eso la ley exige que primero se agoten los elementos directos, y solo cuando el contribuyente ha impedido conocerlos —no llevando libros, ocultando información, no declarando— se habilita la vía presunta, que funciona así también como un desincentivo al incumplimiento.'},
   {p:'¿Qué diferencia hay entre que se configure una causal del artículo 64 y que la determinación presunta sea válida?',
    r:'La causal **habilita** la facultad, pero no la ejerce correctamente por sí sola. Para que la determinación sea válida, SUNAT debe además: motivar expresamente cuál causal se configuró y con qué hechos, aplicar una presunción **tipificada en la ley** y no un método propio, seguir el procedimiento específico de esa presunción (número de días de control, porcentajes mínimos, periodos comprendidos) y respetar los límites del artículo 65-A. Si falla cualquiera de esos pasos, la determinación es impugnable aunque la causal exista. Muchas resoluciones del Tribunal Fiscal han dejado sin efecto determinaciones presuntas por defectos de motivación o de procedimiento, no porque la causal fuera falsa.'},
   {p:'¿Por qué la determinación presunta no permite deducir costos ni usar crédito fiscal?',
    r:'Porque el contribuyente no puede acreditarlos: si pudiera documentar sus costos y su crédito fiscal con comprobantes válidos, la determinación se habría hecho sobre base cierta. La presunción establece el ingreso a partir de indicios, pero no hay documentación que respalde las adquisiciones vinculadas a esas ventas ocultas. Además, aceptar deducciones estimadas sobre ventas estimadas convertiría el mecanismo en una negociación de márgenes. El efecto es deliberadamente gravoso: busca que nunca resulte más conveniente ocultar que declarar.'},
   {p:'Si SUNAT aplica dos presunciones distintas al mismo periodo, ¿se suman?',
    r:'No. La ley establece que cuando se comprueban omisiones de naturaleza distinta y resultan aplicables varias presunciones, se aplica la que arroje el **mayor monto de base imponible o de tributo**, sin acumularlas. La razón es evitar que un mismo ingreso oculto sea gravado dos veces por dos vías distintas de estimación, lo que produciría una determinación irreal y confiscatoria. Si en una resolución se observan presunciones sumadas, ese es un argumento concreto de impugnación.'},
   {p:'En una fiscalización, SUNAT aplica el punto fijo en tres días de semana de un mes de enero. ¿Qué cuestionarías?',
    r:'La representatividad del muestreo y el cumplimiento del procedimiento. Primero, el número de días controlados y su distribución: la norma exige un mínimo y que se incluyan días comerciales representativos, porque un negocio puede tener ventas muy distintas entre días de semana y fines de semana. Tres días de semana en enero, un mes atípico para muchos giros, difícilmente representan el promedio. Segundo, cómo se proyectó el resultado: la ley fija reglas sobre la proyección al mes y al periodo. Y tercero, si existía información suficiente para determinar sobre base cierta, en cuyo caso el punto fijo no procedía. La defensa debe aportar evidencia de la estacionalidad: ventas históricas por día de la semana, registros de años anteriores, datos del sector.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas situaciones NO habilita la determinación sobre base presunta?',
    o:['El contribuyente no exhibe sus libros contables requeridos','El contribuyente tiene condición de no habido','El contribuyente declaró pérdida tributaria en el ejercicio','Se detectaron ventas no registradas en el Registro de Ventas'],r:2,
    s:'Declarar pérdida no es causal: una empresa puede legítimamente tener pérdidas, y eso por sí solo no autoriza a presumir nada. Las otras tres sí son supuestos del artículo 64: no exhibir libros requeridos, tener condición de no habido y detectar omisiones en el Registro de Ventas. Si SUNAT determinara sobre base presunta solo porque hay pérdidas, la determinación sería nula por falta de causal habilitante.'},
   {l:1,t:'num',p:'En un punto fijo de 5 días, las ventas fueron: 1,200; 1,500; 3,000; 2,800 y 1,500. ¿Cuál es la venta presunta del mes de 30 días?',
    u:'S/',r:60000,tol:100,
    s:'Promedio diario = (1,200 + 1,500 + 3,000 + 2,800 + 1,500) ÷ 5 = 10,000 ÷ 5 = **S/ 2,000**\nVenta presunta del mes = 2,000 × 30 = **S/ 60,000**\n\nSi el contribuyente declaró menos, la diferencia se presume venta omitida con efectos en IGV y renta. La defensa habitual apunta a la representatividad: si los días controlados fueron atípicos (quincena, feriado, campaña), el promedio está sesgado hacia arriba y hay que acreditarlo con la estacionalidad histórica del negocio.'},
   {l:2,t:'num',p:'SUNAT determina ventas presuntas por S/ 150,000 a una empresa del Régimen General. Calcula la carga tributaria aproximada entre IGV y renta, sin considerar multas.',
    u:'S/',r:71250,tol:500,
    s:'**IGV:** las ventas presuntas incrementan el débito fiscal y **no otorgan derecho a crédito fiscal** sobre ellas.\n150,000 × 18% = **S/ 27,000**\n\n**Impuesto a la Renta:** el ingreso presunto se considera renta neta, **sin deducción de costos ni gastos** y sin compensación de pérdidas.\n150,000 × 29.5% = **S/ 44,250**\n\n**Carga total = 27,000 + 44,250 = S/ 71,250**, equivalente al **47.5%** del monto presunto.\n\nY eso sin contar las multas por declarar cifras falsas (50% del tributo omitido, antes de gradualidad) ni los intereses moratorios desde el vencimiento de cada periodo. Con ambos, la carga puede superar el 70% del monto presunto. Es la demostración numérica de por qué la determinación presunta no es una alternativa de cálculo sino una consecuencia.'},
   {l:2,t:'ab',p:'En una fiscalización, SUNAT detecta en el Registro de Ventas de una empresa omisiones en 5 de los 12 meses del ejercicio, equivalentes al 14% de las ventas de esos meses. Explica cómo opera la presunción del artículo 66 y su efecto.',
    s:'**Verificación de los requisitos de la presunción:**\n\n| Requisito | En el caso |\n|---|---|\n| Omisiones en no menos de 4 meses de 12 | Se detectaron en 5 meses ✓ |\n| Omisión mayor al 10% de las ventas de esos meses | 14% ✓ |\n\nSe cumplen ambos, de modo que la presunción del artículo 66 es aplicable.\n\n**Cómo opera:** el porcentaje de omisión detectado se aplica para incrementar las ventas declaradas de **todos los meses** del ejercicio, no solo de aquellos en que se detectaron omisiones. El porcentaje a aplicar no puede ser menor al 10%; aquí es el 14% determinado.\n\n**Ejemplo numérico.** Si las ventas declaradas del ejercicio fueron S/ 2,000,000:\nIncremento presunto = 2,000,000 × 14% = **S/ 280,000**\n\n**Efectos:**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| IGV sobre ventas presuntas (sin crédito fiscal) | 280,000 × 18% | 50,400 |\n| Renta (ingreso presunto como renta neta) | 280,000 × 29.5% | 82,600 |\n| **Subtotal** | | **133,000** |\n| Multa por declarar cifras falsas (50% del tributo omitido, antes de gradualidad) | | ~66,500 |\n| Intereses moratorios desde cada vencimiento | | variable |\n\n**Lo que hay que notar, y es el aprendizaje del caso:** la omisión real detectada fue el 14% de las ventas de **cinco meses**. Pero la presunción proyecta ese porcentaje a **los doce meses**, de modo que el monto determinado es muy superior a lo efectivamente omitido. Ese efecto multiplicador es intencional: la presunción no busca reconstruir con exactitud, busca que ocultar sea más caro que declarar.\n\n**Líneas de defensa posibles:**\n1. Que las supuestas omisiones no sean tales: comprobantes anulados, notas de crédito no consideradas, operaciones registradas en otro periodo por error de corte.\n2. Que el porcentaje esté mal calculado, por ejemplo si se tomó la base imponible de unos meses y el total con IGV de otros.\n3. Que existan elementos para determinar sobre **base cierta**, lo que desplazaría la presunción.\n4. Que la causal no esté debidamente motivada en el resultado del requerimiento.'},
   {l:3,t:'ab',p:'Una empresa comercial recibe una resolución de determinación por S/ 420,000 basada en la presunción por diferencias en cuentas bancarias: SUNAT encontró depósitos en la cuenta de la empresa por S/ 350,000 que no corresponden a ventas declaradas. El gerente afirma que son préstamos de los socios y cobranzas de años anteriores. Diseña la estrategia de defensa.',
    s:'**Primero, entender el mecanismo.** La presunción del artículo 71 parte de un hecho objetivo —depósitos en cuentas del contribuyente— y presume que corresponden a ingresos omitidos, salvo que se acredite lo contrario. La carga de la prueba está del lado del contribuyente: no basta afirmar el origen, hay que probarlo documentalmente.\n\n**La estrategia, en cinco frentes y en este orden:**\n\n**1. Verificar la causal habilitante.** Antes que nada: ¿se configuró una causal del artículo 64 y está motivada en el resultado del requerimiento? Si SUNAT llegó a la presunción sin causal habilitante o sin motivarla, la determinación es impugnable por ese solo defecto, con independencia del origen de los depósitos.\n\n**2. Verificar si procedía base cierta.** Si la empresa entregó sus libros, comprobantes y extractos, SUNAT tenía elementos para determinar directamente y no debía presumir. Este argumento es fuerte cuando el contribuyente colaboró durante la fiscalización.\n\n**3. Acreditar el origen de cada depósito, uno por uno.** Esta es la parte sustantiva y la que gana o pierde el caso. Para cada concepto alegado:\n\n| Alegación | Documentación necesaria |\n|---|---|\n| Préstamos de socios | Contrato de mutuo con fecha cierta, acta de junta que lo aprueba, registro contable en la cuenta 44, acreditación de que el socio tenía capacidad económica para prestarlo (sus propias declaraciones de renta), y rastro bancario de la salida desde la cuenta del socio |\n| Cobranzas de ventas de años anteriores | Facturas de los ejercicios previos, mayor auxiliar de clientes que muestre la cuenta por cobrar viva al cierre anterior, y correspondencia de cobranza |\n| Transferencias entre cuentas propias | Extractos de ambas cuentas mostrando la salida y la entrada del mismo importe y fecha |\n| Devoluciones de proveedores | Notas de crédito y su registro |\n\n**El punto crítico de los préstamos de socios:** es la alegación más común y la más fácil de rechazar cuando está mal sustentada. Un contrato firmado sin fecha cierta, sin rastro bancario de origen y sin que el socio pueda explicar de dónde salió el dinero, no acredita nada; al contrario, puede abrir una segunda contingencia por **incremento patrimonial no justificado** del propio socio.\n\n**4. Atacar el cálculo.** Verificar que SUNAT no haya incluido depósitos que ya están explicados por las ventas declaradas (doble conteo), ni transferencias internas entre cuentas de la empresa, ni depósitos de periodos ajenos al fiscalizado.\n\n**5. Evaluar la proporcionalidad del resultado.** Si la determinación implica un margen o un nivel de ventas imposible para el tamaño del negocio —por ejemplo, ventas que excederían la capacidad del local o del inventario adquirido—, ese argumento de razonabilidad, sustentado con datos, ha sido acogido en jurisprudencia.\n\n**Vía procedimental y plazos:** la resolución de determinación se impugna mediante **reclamación** dentro del plazo de ley; si se presenta dentro de plazo, no es necesario pagar previamente. Si se resuelve en contra, procede **apelación** ante el Tribunal Fiscal. Perder el plazo obliga a pagar o afianzar la deuda para discutirla, lo que en un caso de S/ 420,000 puede ser inviable.\n\n**La lección preventiva:** toda entrada de dinero a la cuenta de la empresa que no sea una venta debe estar documentada **en el momento en que ocurre**: contrato de préstamo con fecha cierta, acta, registro contable correcto. Reconstruir el origen de depósitos tres años después es, en la práctica, casi imposible, y es exactamente la situación que esta presunción está diseñada para castigar.'}
  ],
  proy:{
   t:'Simulacro de determinación presunta en tu empresa',
   ctx:`La mejor forma de entender la base presunta es aplicártela a ti mismo. Vas a simular que SUNAT fiscaliza a tu empresa y determina sobre base presunta, y luego vas a construir la defensa.`,
   pasos:[
    'Revisa la contabilidad de tu empresa de los Módulos 1 a 4 e identifica qué causales del artículo 64 podrían configurarse si hoy llegara una fiscalización. Sé honesto: libros con atraso, diferencias de inventario, depósitos sin explicar.',
    'Elige una de las presunciones tipificadas y aplícala a tu empresa con sus propios números: puede ser el punto fijo sobre sus ventas diarias, la de diferencias de inventario o la de cuentas bancarias.',
    'Calcula la deuda determinada: IGV sin crédito fiscal, renta sin deducción de costos, multas e intereses estimados.',
    'Compara ese resultado con lo que tu empresa realmente debería pagar sobre base cierta, y calcula la diferencia.',
    'Construye la defensa en los cinco niveles del subtema: causal, procedencia, método, cálculo y aporte de base cierta.',
    'Identifica qué documentación le falta hoy a tu empresa para poder defenderse, y conviértela en una lista de acciones preventivas con responsable y plazo.'
   ],
   entrega:[
    'El análisis de causales aplicables a tu empresa.',
    'El cálculo de la determinación presunta con su carga total.',
    'La comparación con la base cierta y la diferencia cuantificada.',
    'El escrito de defensa en cinco niveles y la lista de acciones preventivas.'
   ],
   crit:[
    'La presunción aplicada es una de las tipificadas, con su procedimiento respetado.',
    'El cálculo refleja que no hay crédito fiscal ni deducción de costos.',
    'La defensa ataca primero la causal y solo subsidiariamente el monto.'
   ],
   pista:'Si al revisar honestamente tu empresa no encuentras ninguna causal aplicable, revisa de nuevo: casi todas las MYPES tienen al menos una diferencia de inventario o un libro con atraso. Encontrarla ahora vale mucho más que descubrirla en un requerimiento.'
  },
  proyInt:{
   t:'Expediente de defensa preventiva',
   integra:'1.1 a 5.2',
   ctx:`Un expediente de defensa no se arma cuando llega la notificación: se arma antes. Vas a preparar el de tu empresa, usando toda la documentación que has construido a lo largo del curso.`,
   pasos:[
    'Arma el expediente con cinco secciones: (1) documentación societaria y de representación, (2) libros y registros con sus constancias de envío, (3) sustento de las operaciones significativas, (4) conciliaciones y papeles de trabajo del cierre, (5) correspondencia y antecedentes con SUNAT.',
    'Para cada sección, haz un inventario de lo que tu empresa tiene y de lo que le falta, con fecha límite para completarlo.',
    'Documenta el origen de todo movimiento inusual de dinero de los periodos registrados: aportes, préstamos, transferencias entre cuentas, cobranzas antiguas.',
    'Verifica la trazabilidad completa en tres operaciones al azar: del comprobante al asiento, del asiento al mayor, del mayor al estado financiero y del estado financiero a la declaración. Documenta el recorrido.',
    'Elabora el "informe de situación tributaria" de tu empresa: una página que resuma periodos abiertos, estado de prescripción, contingencias identificadas y nivel de sustento de cada una.',
    'Redacta el procedimiento interno de atención de fiscalizaciones: quién recibe la notificación, quién coordina, cómo se entrega la información, cómo se documenta lo entregado y qué se hace con los plazos.'
   ],
   entrega:[
    'El expediente de defensa con sus cinco secciones y el inventario de faltantes.',
    'La documentación del origen de los movimientos inusuales.',
    'La prueba de trazabilidad de tres operaciones.',
    'El informe de situación tributaria y el procedimiento de atención.'
   ],
   crit:[
    'El inventario de faltantes tiene fecha límite y responsable para cada punto.',
    'La prueba de trazabilidad recorre los cuatro niveles sin interrupciones.',
    'El procedimiento de atención fija qué se entrega y cómo se deja constancia de lo entregado.'
   ],
   pista:'Entregar información en una fiscalización sin dejar constancia escrita de qué se entregó y cuándo es un error que luego no se puede corregir. Todo lo que se entrega se lista, se numera y se recibe con cargo.'
  },
  fuentes:[
   {a:'TUO del Código Tributario', o:'Artículos 59 a 72', n:'determinación sobre base cierta y presunta, causales habilitantes y presunciones tipificadas'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'análisis de las presunciones con jurisprudencia del Tribunal Fiscal'},
   {a:'Tribunal Fiscal', o:'Resoluciones sobre determinación presunta', n:'criterios sobre motivación de la causal, representatividad del muestreo y prohibición de acumular presunciones'},
   {a:'Francisco Ruiz de Castilla y Carmen Robles Moreno', o:'Código Tributario: doctrina y comentarios', n:'límites de la facultad de determinación y garantías del contribuyente'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'la determinación como acto declarativo y sus efectos'}
  ]
 },
 {
  id:'m5t3', titulo:'Facultades de SUNAT y el procedimiento de fiscalización', min:26,
  cont:`La Administración Tributaria tiene cuatro facultades: **recaudación**, **determinación**, **fiscalización** y **sancionadora**. La fiscalización es la más temida y la menos entendida: la mayoría de empresas la enfrenta improvisando, cuando el resultado depende casi por completo de lo que se hizo antes de que llegara la carta.

# La facultad de fiscalización es discrecional
El artículo 62 establece que la facultad se ejerce de forma **discrecional**: SUNAT decide a quién fiscalizar, por qué periodos y con qué alcance. Discrecional no significa arbitrario: debe respetar los derechos del contribuyente, motivar sus actos y seguir el procedimiento. Pero sí significa que nadie puede exigirle que explique por qué eligió a una empresa y no a otra.

# Las facultades concretas del artículo 62
|Facultad|Alcance|
|Exigir **libros, registros y documentos**|Incluye la información en soportes electrónicos y los sistemas que la generan|
|Requerir **comparecencia** del deudor o de terceros|Para proporcionar la información que se estime necesaria|
|**Inmovilizar** libros y documentos|Cuando se presuma evasión, por los plazos que fija la norma|
|**Incautar** libros, documentos y bienes|Requiere **autorización judicial** previa|
|Practicar **inspecciones** en locales y medios de transporte|En locales cerrados o domicilios particulares se requiere autorización judicial|
|Efectuar **tomas de inventario** y controlar su ejecución|Base de varias presunciones|
|Solicitar información a **terceros**|Bancos (con las reglas del secreto bancario), clientes, proveedores, notarios|
|Investigar **hechos que configuren infracciones**|Base de la facultad sancionadora|
|Requerir el **auxilio de la fuerza pública**|Para el ejercicio de sus facultades|

> La **reserva tributaria** (artículo 85) protege la información del contribuyente: la cuantía y fuente de las rentas, los gastos, la base imponible y cualquier dato relativo a ellos solo pueden usarse para los fines propios de la Administración, con las excepciones legales. Es el contrapeso de facultades tan amplias.

# Los tipos de fiscalización y sus plazos
|Tipo|Alcance|Plazo|
|**Definitiva**|Uno o varios elementos de la obligación tributaria, de forma completa|**1 año**, prorrogable por un año más en los supuestos del artículo 62-A|
|**Parcial**|Solo algunos elementos de la obligación, expresamente señalados|**6 meses**|
|**Parcial electrónica**|Se realiza desde las oficinas de SUNAT, a partir de la información en sus sistemas|**30 días hábiles** desde la notificación del inicio|

El plazo se computa desde que el contribuyente entrega la **totalidad** de la información y documentación solicitada en el primer requerimiento. Si la entrega es parcial, el plazo no empieza a correr, lo que en la práctica significa que entregar a cuentagotas perjudica al contribuyente.

**Prórroga de la definitiva (art. 62-A):** procede cuando existe complejidad, ocultamiento de ingresos o indicios de evasión, o cuando el contribuyente forma parte de un grupo empresarial o de un contrato de colaboración.

**Suspensión del plazo:** durante la tramitación de pericias, el lapso en que SUNAT solicita información a autoridades de otros países, el plazo de prórrogas otorgadas al contribuyente, y otros supuestos del mismo artículo.

! Vencido el plazo, SUNAT **no puede requerir información adicional** sobre el periodo y tributo fiscalizados, aunque sí puede emitir las resoluciones que correspondan. Controlar el plazo es parte de la defensa: una información requerida fuera de plazo puede cuestionarse.

# El procedimiento, paso a paso
|Etapa|Documento|Qué hacer|
|**Inicio**|Carta de presentación y primer requerimiento|Verificar identidad de los funcionarios, periodos y tributos comprendidos, y el alcance (definitiva o parcial)|
|**Desarrollo**|Requerimientos sucesivos|Responder por escrito, dentro del plazo, entregando exactamente lo pedido con cargo de recepción|
|**Resultados**|Resultado de cada requerimiento|Leerlo con cuidado: es donde SUNAT consigna sus observaciones y lo que considera no sustentado|
|**Cierre parcial**|Comunicación del artículo 75|SUNAT puede comunicar sus conclusiones y otorgar un plazo para presentar descargos|
|**Fin**|Resolución de Determinación y Resolución de Multa|Actos impugnables mediante reclamación|

$ Resolución de Determinación: establece la existencia y cuantía de la deuda
$ Resolución de Multa: aplica la sanción por las infracciones detectadas
$ Orden de Pago: exige el pago de una deuda que el propio contribuyente declaró (no requiere determinación previa)

La diferencia entre **Resolución de Determinación** y **Orden de Pago** es decisiva para la defensa: la primera se reclama sin pagar; la segunda, por regla general, exige el pago previo para reclamar, salvo que existan circunstancias que evidencien que la cobranza sería improcedente.

# Las acciones de control masivo: esquelas y cartas inductivas
No toda comunicación de SUNAT es una fiscalización. Las **esquelas** y **cartas inductivas** son acciones de control que invitan al contribuyente a revisar y, en su caso, corregir voluntariamente una inconsistencia detectada por cruce de información.

|Aspecto|Carta inductiva / esquela|Fiscalización|
|Naturaleza|Acción de control, invita a regularizar|Procedimiento formal reglado|
|Efecto en la prescripción|No la interrumpe por sí misma|El requerimiento sí la interrumpe|
|Resultado|Si se regulariza, suele cerrarse|Resolución de determinación y de multa|
|Beneficio de regularizar|Subsanación **voluntaria**, con la mayor rebaja de gradualidad|Subsanación inducida, con rebaja menor|

> Responder bien una carta inductiva es una de las intervenciones más rentables de un contador. Si la inconsistencia es real, regularizar en ese momento accede a la rebaja máxima de la multa; si no lo es, una respuesta bien sustentada cierra el tema antes de que escale. Ignorarla es lo peor: convierte una invitación en una fiscalización.

# Los derechos del contribuyente (artículo 92)
- Ser tratado con respeto y consideración.
- Exigir la **devolución** de lo pagado indebidamente o en exceso, con intereses.
- Sustituir o rectificar sus declaraciones.
- Interponer reclamación, apelación, queja y demás medios impugnatorios.
- Conocer el estado de los procedimientos en que sea parte.
- Solicitar **prórroga** de los plazos otorgados en la fiscalización, con sustento.
- Que se respete la **reserva tributaria**.
- Contar con asesoría particular cuando se requiera su comparecencia.
- Formular **consulta** a la Administración sobre el sentido y alcance de las normas.

# Cómo se atiende una fiscalización: el protocolo que funciona
1. **Verificar la notificación**: que esté dirigida a la empresa, al domicilio fiscal, con periodos y tributos claramente identificados, y que el funcionario esté acreditado.
2. **Designar un único interlocutor**. Nadie más responde preguntas ni entrega documentos. Las conversaciones informales con funcionarios son la principal fuente de problemas.
3. **Leer el requerimiento literalmente** y entregar exactamente lo pedido: ni menos (porque suspende el cómputo del plazo) ni más (porque amplía el campo de revisión).
4. **Dejar constancia de todo lo entregado**, con relación detallada, numerada y con cargo de recepción.
5. **Pedir prórroga por escrito** cuando el plazo sea insuficiente, con sustento, antes de que venza.
6. **Revisar cada resultado de requerimiento**: ahí se consigna lo que SUNAT da por no sustentado, y es el insumo de la futura reclamación.
7. **Preparar los descargos con documentación**, no con argumentos. Un descargo sin pruebas no cambia nada.
8. **Evaluar la conveniencia de subsanar** cuando la observación es correcta: la gradualidad premia la subsanación temprana.

! El error más caro en una fiscalización no es un reparo: es entregar documentación desordenada, contradictoria o que abre frentes nuevos. Un expediente bien armado puede reducir un reparo; uno improvisado puede multiplicarlo.`,
  claves:['La fiscalización es discrecional pero reglada: debe motivarse y respetar el procedimiento y los derechos del contribuyente.','Hay tres tipos: definitiva (1 año prorrogable), parcial (6 meses) y parcial electrónica (30 días hábiles).','El plazo corre desde que se entrega la totalidad de lo pedido en el primer requerimiento: entregar parcialmente perjudica al contribuyente.','La Resolución de Determinación se reclama sin pago previo; la Orden de Pago, por regla general, exige pagar antes.','Las cartas inductivas no son fiscalización: responderlas bien permite subsanar voluntariamente con la rebaja máxima.'],
  preg:[
   {p:'¿Qué significa que la facultad de fiscalización sea discrecional y cuáles son sus límites?',
    r:'Significa que SUNAT elige a quién fiscalizar, por qué periodos y con qué alcance, sin tener que justificar esa selección ante el contribuyente. Los límites son tres: debe respetar los **derechos del contribuyente** del artículo 92, debe **motivar** sus actos (especialmente las observaciones y la aplicación de presunciones) y debe seguir el **procedimiento** y los plazos legales. Además, ciertas facultades exigen autorización judicial, como la incautación o la inspección en domicilios particulares. Discrecionalidad es margen de decisión dentro de la ley, no ausencia de ley.'},
   {p:'¿Por qué conviene entregar toda la documentación pedida en el primer requerimiento y no por partes?',
    r:'Porque el plazo de la fiscalización —un año en la definitiva, seis meses en la parcial— empieza a computarse recién cuando el contribuyente entrega la **totalidad** de lo solicitado en el primer requerimiento. Si entrega parcialmente, el reloj no corre, y la fiscalización puede extenderse indefinidamente. Entregar completo activa el plazo y pone un límite temporal a la revisión, lo que juega a favor del contribuyente. Distinto es entregar **más** de lo pedido, que sí es un error: amplía el campo de revisión y puede abrir frentes que nadie había mirado.'},
   {p:'¿Cuál es la diferencia práctica entre recibir una Orden de Pago y una Resolución de Determinación?',
    r:'La Orden de Pago se emite sobre una deuda que el propio contribuyente **declaró** y no pagó, o por errores materiales de su declaración: no hay discusión sobre si debe, solo se le exige pagar. Por eso, como regla general, para reclamarla hay que pagar previamente la deuda, salvo que existan circunstancias que evidencien que la cobranza sería improcedente. La Resolución de Determinación, en cambio, es el resultado de una fiscalización donde SUNAT **establece** una deuda que el contribuyente no reconoció: ahí sí hay controversia, y puede reclamarse dentro del plazo sin pago previo. Confundirlas lleva a perder la oportunidad de defensa.'},
   {p:'Llega una carta inductiva por una inconsistencia entre el SIRE y la declaración de IGV. ¿Qué conviene hacer?',
    r:'Primero, verificar si la inconsistencia es real, cruzando el SIRE con el Registro de Compras y el Libro Diario. Si es real, conviene **subsanar voluntariamente**: rectificar la declaración y pagar el tributo omitido con sus intereses antes de cualquier notificación de requerimiento, lo que accede a la rebaja máxima de la multa por el régimen de gradualidad. Si no es real —por ejemplo, porque el comprobante corresponde a otra empresa o ya estaba registrado en otro periodo—, se responde por escrito, con el sustento documental, dentro del plazo. Lo que no se debe hacer es ignorarla: el silencio suele derivar en una fiscalización, donde la subsanación ya no será voluntaria y la rebaja será mucho menor.'},
   {p:'¿Por qué se dice que el resultado de una fiscalización se decide antes de que empiece?',
    r:'Porque lo que se discute es la documentación que existe, y esa no se puede crear después. Si los comprobantes están validados, los pagos bancarizados, las detracciones depositadas, las provisiones con expediente y los libros enviados en plazo, la fiscalización es un trámite de verificación. Si falta todo eso, ningún argumento lo reemplaza: no hay escrito que sustituya a un contrato que no se firmó o a una conformidad que nadie emitió. Por eso el trabajo preventivo —el expediente de cada operación significativa, armado cuando ocurre— vale más que cualquier estrategia de defensa posterior.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas facultades requiere autorización judicial previa?',
    o:['Requerir la exhibición de libros contables','Incautar libros, documentos y bienes','Solicitar comparecencia del contribuyente','Efectuar una toma de inventario'],r:1,
    s:'La incautación requiere autorización judicial previa, porque implica la desposesión de bienes y documentos del contribuyente. También la requiere la inspección en locales cerrados o domicilios particulares. En cambio, exigir la exhibición de libros, solicitar comparecencia y tomar inventarios son facultades que SUNAT ejerce directamente, dentro del procedimiento y con las garantías del caso. La diferencia está en el grado de afectación de derechos fundamentales.'},
   {l:1,t:'mc',p:'¿Cuánto dura una fiscalización parcial electrónica?',
    o:['Un año prorrogable','Seis meses','30 días hábiles desde la notificación de su inicio','No tiene plazo'],r:2,
    s:'30 días hábiles desde la notificación del inicio. Es el procedimiento más breve porque se realiza íntegramente desde las oficinas de SUNAT, usando la información que ya obra en sus sistemas: comprobantes electrónicos, libros electrónicos, declaraciones. El contribuyente responde también electrónicamente. La fiscalización parcial dura seis meses y la definitiva un año, prorrogable por otro año en los supuestos del artículo 62-A.'},
   {l:2,t:'ab',p:'Tu empresa recibe una carta de presentación y un primer requerimiento que pide: libros electrónicos de 2024, Registro de Ventas y Compras, estados financieros, contratos con los cinco principales proveedores y detalle de la cuenta 63. Diseña el plan de respuesta de los primeros cinco días.',
    s:'**Día 1 — Verificación y organización**\n\n1. Verificar la notificación: destinatario correcto, domicilio fiscal, periodos y tributos identificados, tipo de fiscalización (definitiva o parcial) y alcance. Si es parcial, qué elementos comprende exactamente.\n2. Identificar al funcionario a cargo y verificar su acreditación.\n3. Anotar el **plazo de respuesta** del requerimiento y marcarlo en el calendario con alerta tres días antes.\n4. Designar al interlocutor único y comunicarlo internamente: nadie más atiende, responde ni entrega nada.\n\n**Día 2 — Inventario de lo solicitado**\n\nArmar una tabla con cada ítem pedido y su estado:\n\n| Ítem requerido | ¿Existe? | ¿Completo? | Observaciones |\n|---|---|---|---|\n| Libros electrónicos 2024 | Verificar constancias de envío de cada periodo | | Si hay atrasos, identificarlos ahora |\n| Registro de Ventas y Compras | | | Conciliar con SIRE antes de entregar |\n| Estados financieros | | | Verificar que coincidan con la declaración anual |\n| Contratos con 5 proveedores | | | Los que falten, no se inventan |\n| Detalle de la cuenta 63 | | | Mayor analítico con documento de sustento |\n\n**Día 3 — Revisión interna previa**\n\nEste es el día más importante y el que casi nadie usa. Antes de entregar, revisar internamente qué va a ver el fiscalizador:\n- ¿El Registro de Compras cuadra con el SIRE y con la declaración?\n- ¿Los estados financieros coinciden con la declaración anual?\n- ¿Los gastos de la cuenta 63 tienen comprobante, bancarización y detracción cuando corresponde?\n- ¿Los contratos existen y están firmados?\n\nSi aparece una inconsistencia real, hay que **evaluar la subsanación** antes de que sea observada: la gradualidad premia subsanar antes de que SUNAT lo señale.\n\n**Día 4 — Preparación de la entrega**\n\n1. Preparar exactamente lo pedido: ni menos ni más. Si piden el detalle de la cuenta 63, se entrega esa cuenta, no todo el mayor.\n2. Armar la relación detallada de entrega: numeración, descripción, número de folios o archivos, formato.\n3. Preparar el escrito de respuesta que acompaña la entrega, indicando qué se entrega y, si algo no se puede entregar, por qué, con sustento.\n\n**Día 5 — Entrega formal**\n\n1. Entregar con **cargo de recepción** sellado, con la relación detallada adjunta.\n2. Conservar copia íntegra de todo lo entregado: dentro de un año habrá que recordar exactamente qué vio el fiscalizador.\n3. Registrar la fecha de entrega: desde la entrega **completa** empieza a computarse el plazo de la fiscalización.\n\n**Si el plazo es insuficiente:** solicitar **prórroga por escrito antes del vencimiento**, con sustento concreto (volumen de información, necesidad de recuperar documentación de archivo). Pedirla después del vencimiento no sirve.\n\n**Lo que no se debe hacer en ningún caso:**\n- Entregar documentación a cuentagotas: no empieza a correr el plazo.\n- Entregar más de lo pedido "para demostrar transparencia": amplía el campo de revisión.\n- Permitir conversaciones informales entre el fiscalizador y el personal.\n- Entregar sin cargo ni relación detallada.'},
   {l:2,t:'num',p:'Una fiscalización definitiva se inicia el 10 de marzo. El contribuyente entrega la totalidad de lo requerido el 25 de marzo. ¿Cuándo vence el plazo, sin prórrogas ni suspensiones?',
    u:'meses',r:12,tol:0,
    s:'El plazo de la fiscalización definitiva es de **un año (12 meses)** y se computa desde la fecha en que el contribuyente entrega la **totalidad** de la información y documentación solicitada en el primer requerimiento.\n\nComo la entrega completa fue el 25 de marzo, el plazo vence el **25 de marzo del año siguiente**, no el 10 de marzo.\n\nDos precisiones importantes: el plazo puede **prorrogarse por un año adicional** en los supuestos del artículo 62-A (complejidad, indicios de evasión, pertenencia a un grupo empresarial); y puede **suspenderse** durante pericias, solicitudes de información al exterior o prórrogas otorgadas al contribuyente. Vencido el plazo, SUNAT no puede requerir información adicional sobre ese periodo y tributo, aunque sí puede emitir las resoluciones correspondientes.'},
   {l:3,t:'ab',p:'Al cierre de una fiscalización, SUNAT comunica al contribuyente sus conclusiones: repara S/ 180,000 de gastos sin fehaciencia, S/ 40,000 por detracciones no depositadas y S/ 25,000 por diferencias de inventario. Le otorga plazo para descargos. Diseña la estrategia, sabiendo que dos de los tres reparos son correctos.',
    s:'**El marco:** esta comunicación corresponde al artículo 75, que faculta a SUNAT a comunicar sus conclusiones antes de emitir las resoluciones, otorgando un plazo para presentar observaciones. Es la última oportunidad de influir en el resultado **antes** de que exista un acto formal impugnable, y usarla bien puede evitar años de litigio.\n\n**Paso 1 — Clasificar los reparos con honestidad**\n\n| Reparo | Importe | ¿Es correcto? | Estrategia |\n|---|---|---|---|\n| Gastos sin fehaciencia | 180,000 | Supongamos que es discutible: hay sustento parcial | **Defender con documentación** |\n| Detracciones no depositadas | 40,000 | Correcto: no se depositaron | **Aceptar y subsanar** |\n| Diferencias de inventario | 25,000 | Correcto: hubo faltante real | **Aceptar y subsanar** |\n\nEsta clasificación es la decisión estratégica central. Defender lo indefendible desgasta credibilidad y hace que el fiscalizador mire con desconfianza los argumentos que sí son sólidos.\n\n**Paso 2 — Los reparos que se aceptan: subsanar de inmediato**\n\nPara las detracciones y el inventario, conviene:\n- Rectificar las declaraciones afectadas y pagar el tributo con sus intereses **dentro del plazo de descargos**.\n- Acogerse al **régimen de gradualidad**: la subsanación antes de la notificación de la resolución de multa accede a rebajas sustancialmente mayores que hacerlo después.\n- Dejar constancia en el escrito de descargos de que se subsanó, con los números de las declaraciones rectificatorias y las constancias de pago.\n\nEl ahorro de subsanar en este momento, solo en gradualidad de multas, suele ser de decenas de miles de soles.\n\n**Paso 3 — El reparo que se defiende: documentación, no retórica**\n\nPara los S/ 180,000 de gastos observados por fehaciencia, el descargo debe presentar, operación por operación:\n- Contrato o propuesta aceptada con alcance y entregables.\n- Entregables concretos: informes, correos, actas, fotografías, registros de ingreso.\n- Conformidad del área usuaria.\n- Comprobante válido, bancarización y detracción si correspondía.\n- Evidencia de que el proveedor tenía capacidad real de prestar el servicio.\n- Explicación de la **causalidad**: cómo ese gasto se vincula con la generación de renta.\n\nSi parte de los S/ 180,000 tiene sustento completo y parte no, conviene **separarlos** y defender solo lo defendible, subsanando el resto. Un descargo que acepta lo indefendible y documenta lo sólido es mucho más creíble que uno que lo niega todo.\n\n**Paso 4 — Verificar el procedimiento**\n\nIndependientemente del fondo, revisar: que los reparos estén **motivados** en los resultados de requerimiento, que no se haya requerido información fuera de plazo, que los periodos reparados no estén prescritos y que no se hayan aplicado presunciones sin causal habilitante.\n\n**Paso 5 — Proyectar el escenario**\n\n| Escenario | Deuda estimada |\n|---|---|\n| Si se defiende con éxito el reparo de fehaciencia | Tributo y multas solo por 65,000 |\n| Si no se defiende | Tributo y multas por 245,000 |\n| Diferencia en juego | ~180,000 de base, más IGV, renta, multas e intereses |\n\n**Y la decisión posterior:** si las resoluciones se emiten de todos modos, hay que evaluar si reclamar. Reclamar dentro del plazo suspende la exigibilidad de la deuda contenida en una resolución de determinación y no exige pago previo; pero mantiene vivos los intereses. Esa evaluación —costo financiero frente a probabilidad de éxito— es parte del consejo profesional, y se desarrolla en el subtema del procedimiento contencioso.'}
  ],
  proy:{
   t:'Simulacro de fiscalización a tu empresa',
   ctx:`Vas a someter a tu empresa a una fiscalización simulada, con requerimiento real y descargos. Es el ejercicio que más rápido revela los huecos de una contabilidad, y hacerlo tú mismo es infinitamente más barato que descubrirlos con un fiscalizador enfrente.`,
   pasos:[
    'Redacta un requerimiento de fiscalización dirigido a tu empresa, del tipo que SUNAT emitiría: periodos, tributos, alcance y lista de diez documentos o informaciones solicitadas.',
    'Responde el requerimiento con lo que tu empresa realmente tiene de los Módulos 1 a 4. Arma la relación detallada de entrega.',
    'Ponte del lado del fiscalizador: revisa lo entregado y redacta el resultado del requerimiento con al menos tres observaciones reales que encuentres en tu propia contabilidad.',
    'Vuelve al lado del contribuyente: clasifica las tres observaciones en las que aceptarías y las que defenderías.',
    'Redacta el escrito de descargos: documentación para lo que defiendes, constancia de subsanación para lo que aceptas.',
    'Calcula el resultado económico de la fiscalización en los dos escenarios: con y sin subsanación oportuna, cuantificando el efecto de la gradualidad.',
    'Elabora la lista de acciones correctivas para que esas observaciones no se repitan, con responsable y plazo.'
   ],
   entrega:[
    'El requerimiento simulado y la respuesta con relación detallada.',
    'El resultado del requerimiento con las tres observaciones.',
    'El escrito de descargos.',
    'El cálculo comparativo de los dos escenarios y la lista de acciones correctivas.'
   ],
   crit:[
    'Las tres observaciones son reales y verificables en tu propia contabilidad, no inventadas.',
    'El descargo defiende con documentación y acepta con subsanación, sin mezclar ambas estrategias.',
    'El cálculo comparativo demuestra numéricamente el valor de subsanar a tiempo.'
   ],
   pista:'Si al revisar tu propia contabilidad como fiscalizador no encuentras ninguna observación, no estás mirando con suficiente rigor. Empieza por los gastos de la cuenta 63 y por las diferencias de inventario: ahí casi siempre hay algo.'
  },
  proyInt:{
   t:'Manual de atención de fiscalizaciones',
   integra:'1.1 a 5.3',
   ctx:`Reúne todo lo construido en el curso para producir el documento que una empresa necesita tener **antes** de que llegue la primera carta: el manual que dice qué hacer, quién lo hace y con qué documentación.`,
   pasos:[
    'Capítulo 1 — Prevención: la lista de controles permanentes que mantienen a la empresa fiscalizable sin sobresaltos, tomada de los manuales contable y tributario que vienes construyendo.',
    'Capítulo 2 — El expediente permanente: qué documentación se conserva, dónde, por cuánto tiempo y quién la custodia, enlazado con el expediente de defensa del subtema anterior.',
    'Capítulo 3 — Protocolo de recepción: qué hacer en las primeras 48 horas tras recibir una notificación, con la distinción entre esquela, carta inductiva, requerimiento, orden de pago y resolución.',
    'Capítulo 4 — Entrega de información: reglas de oro (exactamente lo pedido, con cargo, con relación detallada, con copia íntegra) y el formato de la relación de entrega.',
    'Capítulo 5 — Descargos: cómo se construye un descargo, qué documentación lo sustenta y cuándo conviene subsanar en lugar de discutir.',
    'Capítulo 6 — Plazos: tabla con todos los plazos relevantes (fiscalización, descargos, reclamación, apelación) y las consecuencias de incumplirlos.',
    'Anexo — Modelos: escrito de respuesta a requerimiento, relación de entrega, solicitud de prórroga y escrito de descargos.',
    'Integra el manual con los manuales contable y tributario anteriores, en un solo documento con índice general.'
   ],
   entrega:[
    'El manual de atención de fiscalizaciones con sus seis capítulos y el anexo de modelos.',
    'El documento integrado contable, tributario y de fiscalización con índice general.'
   ],
   crit:[
    'El protocolo de las primeras 48 horas distingue correctamente los tipos de notificación y su tratamiento.',
    'Los modelos del anexo son utilizables tal como están, con solo completar datos.',
    'La tabla de plazos incluye la consecuencia de incumplir cada uno.'
   ],
   pista:'Este manual, junto con el expediente de defensa, es el entregable que convierte a un contador en asesor. La mayoría de empresas improvisa ante una fiscalización porque nadie les preparó estos documentos antes.'
  },
  fuentes:[
   {a:'TUO del Código Tributario', o:'Artículos 50 a 62-A, 75, 76, 78, 85 y 92', n:'facultades de la Administración, procedimiento y plazos de fiscalización, actos que la concluyen y derechos del contribuyente'},
   {a:'D.S. 085-2007-EF', o:'Reglamento del Procedimiento de Fiscalización de la SUNAT', n:'desarrollo del procedimiento: cartas, requerimientos, resultados y cierre'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'alcance de la discrecionalidad y límites de las facultades de fiscalización'},
   {a:'Jorge Danós Ordóñez', o:'Estudios sobre procedimiento administrativo y tributario', n:'garantías del administrado frente a la potestad fiscalizadora'},
   {a:'Tribunal Fiscal', o:'Resoluciones sobre procedimiento de fiscalización', n:'criterios sobre motivación, plazos y validez de los requerimientos'}
  ]
 },
 {
  id:'m5t4', titulo:'Infracciones, sanciones y régimen de gradualidad', min:27,
  cont:`El artículo 164 define la infracción tributaria como **toda acción u omisión que importe la violación de normas tributarias, siempre que se encuentre tipificada como tal** en el Código o en otras leyes o decretos legislativos. Dos palabras de esa definición mandan: **tipificada** —si no está en la lista, no es infracción— y **omisión** —no hacer también infringe.

# La determinación objetiva: la regla que más sorprende
$ Art. 165: la infracción se determina en forma OBJETIVA

Esto significa que **no se analiza la intención**. No importa si el contador se enfermó, si el sistema falló, si el error fue de buena fe o si nadie se dio cuenta. Si el hecho tipificado ocurrió, la infracción existe. La discusión sobre la culpa no cabe; lo que cabe es discutir si el hecho ocurrió o si la norma es aplicable.

> Esta objetividad es lo que explica que un contribuyente diligente pueda acumular multas. Y es también la razón por la que el sistema necesita contrapesos: la facultad discrecional de no sancionar, el régimen de gradualidad y las causales de improcedencia del artículo 170.

# Los contrapesos de la objetividad
|Norma|Qué permite|
|**Art. 166**|SUNAT tiene la **facultad discrecional de determinar y sancionar**, y puede aplicar gradualmente las sanciones o **no sancionar**. En su ejercicio, dicta resoluciones de superintendencia o normas internas con los criterios|
|**Art. 170**|**No procede aplicar intereses ni sanciones** cuando: (1) la norma aclaratoria reconoce que hubo **duda razonable** en su interpretación, o (2) la Administración tuvo **duplicidad de criterio** en la aplicación de la norma, por el periodo en que rigió el criterio anterior|
|**Art. 171**|Principios aplicables: **legalidad, tipicidad, non bis in idem, proporcionalidad, no concurrencia de infracciones y presunción de licitud**|
|**Concurrencia**|Cuando un mismo hecho configura más de una infracción, se aplica la sanción **más grave**, no la suma de ambas|

# Los tipos de sanción (art. 165)
|Sanción|Aplicación típica|
|**Multa**|La mayoría de las infracciones; se fija en UIT, en porcentaje de los ingresos netos (IN) o en porcentaje del tributo|
|**Comiso de bienes**|Transporte o posesión de bienes sin la documentación que corresponde|
|**Internamiento temporal de vehículos**|Transporte de bienes sin documentación|
|**Cierre temporal de establecimiento**|No emitir comprobantes de pago|
|**Suspensión de licencias y autorizaciones**|Entidades del Estado|

# El mapa de las infracciones: artículos 173 a 178
|Artículo|Materia|Infracciones más frecuentes|
|**173**|Inscripción en el RUC|No inscribirse; proporcionar información falsa en la inscripción|
|**174**|Emitir y exigir comprobantes|**No emitir o no otorgar comprobantes** (sanción de cierre); emitir documentos que no reúnen los requisitos; transportar bienes sin guía|
|**175**|Llevar libros y registros|**No llevar** los libros exigidos; llevarlos sin observar la forma establecida; **llevarlos con atraso** mayor al permitido; no conservar libros y documentación por el plazo de ley|
|**176**|Presentar declaraciones|**No presentar la declaración dentro del plazo**; presentarla en forma incompleta; presentar más de una rectificatoria del mismo periodo|
|**177**|Permitir el control de la Administración|**No exhibir los libros o documentos requeridos**; no comparecer; no proporcionar información; **no efectuar las retenciones o percepciones** establecidas|
|**178**|Cumplimiento de obligaciones tributarias|**Declarar cifras o datos falsos** que influyan en la determinación; **no pagar dentro del plazo los tributos retenidos o percibidos**; no entregar el monto retenido al deudor|

# Las tres Tablas: la misma infracción, distinta multa
El Código tiene tres tablas de sanciones, y la que aplica depende del régimen del infractor:

|Tabla|A quién se aplica|
|**I**|Personas y entidades generadoras de **renta de tercera categoría**, incluidas las del Régimen MYPE Tributario|
|**II**|Personas naturales que perciben rentas de **cuarta categoría**, las acogidas al **RER** y otras no incluidas en las Tablas I y III|
|**III**|Personas y entidades que se encuentran en el **NRUS**|

Las multas más usadas de la Tabla I, con la referencia de cálculo:

|Infracción|Base de la multa|
|No llevar los libros exigidos (175.1)|**0.6% de los IN**, con tope mínimo y máximo según las notas de la Tabla|
|Llevar los libros con atraso mayor al permitido (175.5)|**0.3% de los IN**, con topes|
|No presentar la declaración dentro del plazo (176.1)|**1 UIT** para declaraciones determinativas|
|No exhibir los libros o documentos requeridos (177.1)|**0.6% de los IN**|
|No efectuar las retenciones establecidas (177.13)|**50% del tributo no retenido**|
|**Declarar cifras o datos falsos** (178.1)|**50% del tributo omitido** o **100% del monto obtenido indebidamente** (crédito o saldo a favor aumentado), con un mínimo referido a la UIT|
|No pagar los tributos **retenidos o percibidos** (178.4)|**50% del tributo no pagado**|

$ IN = ingresos netos del ejercicio anterior, según la definición de las notas de las Tablas
$ Las multas se actualizan con la TIM desde la fecha en que se cometió la infracción

! Verifica siempre el importe en la Tabla vigente y sus notas: los topes mínimos y máximos, y la definición de IN, están ahí y se han modificado varias veces. Una multa mal calculada —por exceso o por defecto— genera otra contingencia.

# El régimen de gradualidad: donde se decide el dinero
La facultad discrecional del artículo 166 se materializa en el **Régimen de Gradualidad** (Resolución de Superintendencia 063-2007/SUNAT y sus modificatorias), que rebaja las multas según **cuándo** se subsana y **si** se paga.

Para la infracción de **declarar cifras o datos falsos** (178.1), que es la más frecuente y la más caras de todas, la escala es la siguiente:

|Momento de la subsanación|Rebaja|
|**Voluntaria**: se rectifica y se paga el tributo omitido **antes** de cualquier notificación de SUNAT sobre el periodo|**95%**|
|**Inducida**: se rectifica y se paga dentro del plazo otorgado en la fiscalización (comunicación del art. 75) y se paga la multa|**70%**|
|Después de notificada la resolución de multa, pero antes del vencimiento del plazo de la cobranza coactiva|**60%**|
|Habiendo reclamado, se paga antes de la resolución que resuelve la reclamación|**40%**|

$ Multa base (178.1) = 50% del tributo omitido
$ Con rebaja del 95% (subsanación voluntaria) = 2.5% del tributo omitido
$ Con rebaja del 40% = 30% del tributo omitido

> Ese es el argumento económico más poderoso que un contador puede ponerle a un cliente. La diferencia entre detectar y corregir un error antes de que SUNAT lo note, y discutirlo hasta la reclamación, es de **doce veces** en el importe de la multa. Sobre un tributo omitido de S/ 200,000, la multa pasa de S/ 5,000 a S/ 60,000.

Para las infracciones de los artículos 173 a 177 el régimen tiene anexos propios, con criterios como la subsanación voluntaria o inducida, el pago de la multa y, en el caso del cierre, la frecuencia de la infracción.

# El régimen de incentivos del artículo 179
El Código contiene además un régimen de incentivos para las infracciones de los numerales 1, 4 y 5 del artículo 178, con rebajas del 90%, 70% y 50% según el momento. En la práctica, para los tributos que administra SUNAT, el **Régimen de Gradualidad** sustituyó a este régimen para esas infracciones; el artículo 179 conserva relevancia para otras administraciones tributarias que no cuentan con régimen de gradualidad propio.

! Los regímenes **no se acumulan**. Y ambos exigen el **pago de la multa rebajada** para que la rebaja se mantenga: si el contribuyente se acoge y no paga, pierde la rebaja y la multa se recalcula al 100%.

# La rectificatoria: la herramienta más subestimada
Rectificar una declaración es el camino normal de la subsanación voluntaria. Dos reglas que hay que conocer:

- La rectificatoria que determina **mayor obligación** surte efecto con su presentación.
- La que determina **menor obligación** surte efecto si en sesenta días hábiles SUNAT no emite pronunciamiento, sin perjuicio de su facultad de fiscalizar.
- Presentar **más de una rectificatoria** del mismo periodo y tributo configura una infracción del artículo 176.

$ Secuencia correcta de la subsanación voluntaria:
$ 1) Rectificar la declaración  2) Pagar el tributo omitido con sus intereses  3) Pagar la multa rebajada

El orden importa: la rebaja del 95% exige que el tributo esté pagado, no solo declarado.

# Lo que la multa no reemplaza
$ Multa ≠ tributo. Pagar la multa no extingue la deuda tributaria, y pagar el tributo no extingue la multa.

Son obligaciones distintas, con códigos de tributo distintos y con intereses que corren por separado. Un error común es pagar el tributo omitido y creer que el asunto quedó cerrado: la multa sigue viva, acumulando intereses, hasta que se detecta años después con un importe mucho mayor.

# Una lista de verificación mensual que evita la mayoría de las multas
1. ¿Se presentaron **todas** las declaraciones del mes dentro del cronograma? (176.1)
2. ¿Los libros electrónicos se enviaron dentro del plazo de atraso permitido? (175.5)
3. ¿Se depositaron **todas** las detracciones y se pagaron las retenciones? (178.4)
4. ¿El Registro de Compras cuadra con el SIRE y con la declaración? (178.1)
5. ¿Se emitieron comprobantes por todas las operaciones? (174.1)
6. ¿Se efectuaron las retenciones de cuarta y quinta categoría que correspondían? (177.13)

Seis preguntas al mes previenen las seis infracciones que concentran la mayor parte de las multas de una MYPE.`,
  claves:['La infracción se determina de forma objetiva: no se analiza la intención, solo si el hecho tipificado ocurrió.','Los contrapesos son la facultad discrecional de no sancionar, el régimen de gradualidad y las causales del artículo 170 (duda razonable y duplicidad de criterio).','La multa depende de la Tabla aplicable según el régimen del infractor, y se calcula en UIT, en porcentaje de los ingresos netos o en porcentaje del tributo.','La subsanación voluntaria de la infracción 178.1 rebaja la multa en 95%; discutirla hasta la reclamación la deja en 40%: una diferencia de doce veces.','La multa y el tributo son obligaciones distintas: pagar una no extingue la otra, y ambas acumulan intereses por separado.'],
  preg:[
   {p:'¿Qué significa que la infracción tributaria se determine de forma objetiva y qué consecuencia práctica tiene?',
    r:'Significa que basta con que ocurra el hecho tipificado para que la infracción exista, sin necesidad de probar dolo, culpa o negligencia. No hay defensa posible basada en la buena fe, en una falla del sistema, en la enfermedad del contador o en que el error no causó perjuicio. La consecuencia práctica es que la discusión útil no es sobre la intención sino sobre otros tres planos: si el hecho realmente ocurrió, si la norma invocada es la aplicable, y si corresponde alguna rebaja o causal de improcedencia. El contador que intenta defender una multa explicando que no hubo mala fe está perdiendo el tiempo y el plazo de gradualidad.'},
   {p:'Si la determinación es objetiva, ¿cómo puede un contribuyente librarse de una sanción?',
    r:'Por cuatro vías. Primero, demostrando que el **hecho no ocurrió** o que la norma no es aplicable al caso. Segundo, invocando el **artículo 170**: no procede aplicar intereses ni sanciones si una norma aclaratoria reconoce que hubo duda razonable en la interpretación, o si la Administración tuvo duplicidad de criterio, por el periodo en que rigió el criterio anterior. Tercero, acogiéndose a la **facultad discrecional de no sancionar** del artículo 166, que SUNAT ha ejercido mediante resoluciones que disponen no sancionar determinadas infracciones en ciertos supuestos. Y cuarto, aunque no elimina la sanción, reduciéndola al mínimo con el **régimen de gradualidad**, que en el mejor escenario deja la multa en el 5% de su importe.'},
   {p:'¿Por qué la subsanación voluntaria es tan dramáticamente más barata que la inducida?',
    r:'Porque el régimen de gradualidad busca premiar el cumplimiento espontáneo, que no le cuesta nada a la Administración, y castigar el que solo ocurre cuando ya hubo detección, que consumió recursos de fiscalización. La rebaja pasa del 95% al 70% en el momento en que llega la primera notificación sobre el periodo, y de ahí en adelante sigue bajando. Sobre la infracción del numeral 1 del artículo 178, la diferencia entre subsanar antes de cualquier notificación y hacerlo tras una reclamación es de doce veces el importe. Por eso la revisión interna preventiva —encontrar el error antes que SUNAT— es la actividad de mayor retorno económico que puede hacer un contador.'},
   {p:'Un mismo hecho configura dos infracciones distintas. ¿Se aplican las dos multas?',
    r:'No. El principio de **no concurrencia de infracciones** del artículo 171 establece que cuando por un mismo hecho se incurra en más de una infracción, se aplica la sanción **más grave**. La razón es evitar la doble sanción por un solo hecho, que vulneraría el principio non bis in idem. Lo que sí ocurre, y conviene no confundir, es que hechos **distintos** generan sanciones distintas: no registrar una compra y además declarar cifras falsas por esa omisión son dos hechos, no uno, y pueden sancionarse por separado. La línea entre un hecho y dos no siempre es obvia, y es un argumento legítimo de impugnación.'},
   {p:'¿Por qué pagar el tributo omitido no cierra el asunto?',
    r:'Porque la multa es una obligación independiente del tributo, con su propio código, su propio importe y sus propios intereses. Pagar el tributo omitido corrige la deuda tributaria, pero la sanción por haber declarado cifras falsas sigue viva y acumulando intereses desde la fecha en que se cometió la infracción. El error típico es rectificar, pagar el tributo, sentirse al día y descubrir dos años después una multa que creció con intereses y que además perdió la rebaja del 95% porque nunca se pagó dentro del momento que exige la gradualidad. La secuencia correcta es siempre: rectificar, pagar el tributo con intereses y pagar la multa rebajada.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una empresa envió su Registro de Ventas electrónico con dos meses de atraso. ¿Qué infracción configuró?',
    o:['No llevar los libros exigidos (175.1)','Llevar los libros con atraso mayor al permitido (175.5)','No exhibir los libros requeridos (177.1)','Ninguna, porque finalmente lo envió'],r:1,
    s:'Configuró la infracción del numeral 5 del artículo 175: llevar los libros o registros con un atraso mayor al permitido por las normas vigentes. La multa es un porcentaje de los ingresos netos, con topes mínimo y máximo según las notas de la Tabla. No es el numeral 1 porque el libro sí existe y se llevó; no es el 177.1 porque no hubo un requerimiento de exhibición incumplido. Y el hecho de haberlo enviado finalmente no borra la infracción, porque la determinación es objetiva: el atraso ocurrió. Lo que sí hace el envío es permitir la subsanación y acceder a la rebaja por gradualidad.'},
   {l:1,t:'num',p:'Una empresa omitió declarar un tributo de S/ 60,000. Calcula la multa del artículo 178.1 con la rebaja del 95% por subsanación voluntaria.',
    u:'S/',r:1500,tol:10,
    s:'Multa base = 50% del tributo omitido = 60,000 × 50% = **S/ 30,000**\nRebaja por subsanación voluntaria (95%) = 30,000 × 95% = S/ 28,500\n**Multa a pagar = 30,000 − 28,500 = S/ 1,500**\n\nEs decir, el 2.5% del tributo omitido. Pero la rebaja exige que, antes de cualquier notificación de SUNAT sobre ese periodo, la empresa (1) rectifique la declaración, (2) pague el tributo omitido con sus intereses y (3) pague la multa rebajada. Si solo rectifica y no paga, pierde la rebaja. Y hay que recordar que la multa se actualiza con la TIM desde la fecha de la infracción, de modo que mientras más se demore, más crece la base antes de aplicar la rebaja.'},
   {l:2,t:'num',p:'Mismo caso anterior (tributo omitido S/ 60,000), pero la empresa discute el reparo y recién paga antes de la resolución de reclamación, con rebaja del 40%. ¿Cuánto paga de multa y cuánto perdió por no subsanar a tiempo?',
    u:'S/',r:18000,tol:50,
    s:'Multa base = 60,000 × 50% = **S/ 30,000**\nRebaja del 40% = 30,000 × 40% = S/ 12,000\n**Multa a pagar = 30,000 − 12,000 = S/ 18,000**\n\nComparación:\n\n| Escenario | Multa |\n|---|---|\n| Subsanación voluntaria (95%) | 1,500 |\n| Pago antes de la resolución de reclamación (40%) | 18,000 |\n| **Diferencia** | **16,500** |\n\nLa empresa pagó **doce veces más** por haber esperado. Y eso sin contar los intereses acumulados sobre el tributo y sobre la multa durante todo el procedimiento, ni el costo del asesoramiento legal de la reclamación. El cálculo que todo contador debe hacerle a su cliente antes de decidir si discute o subsana es exactamente este: cuánto cuesta discutir frente a cuánto cuesta corregir hoy, ponderado por la probabilidad real de ganar.'},
   {l:2,t:'ab',p:'Una MYPE del Régimen MYPE Tributario descubre en noviembre que durante todo el año no efectuó las retenciones de cuarta categoría a dos profesionales independientes a los que pagó S/ 8,000 mensuales cada uno. Identifica las infracciones y calcula el costo total de regularizar hoy.',
    s:'**Los hechos relevantes.** Dos recibos por honorarios de S/ 8,000 mensuales durante once meses cada uno. Como cada recibo supera el umbral que exige retención y el profesional no presentó la suspensión de retenciones, correspondía retener el 8% de renta de cuarta categoría.\n\n**Retención omitida:**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Honorarios por profesional | 8,000 × 11 meses | 88,000 |\n| Total de ambos | 88,000 × 2 | 176,000 |\n| Retención omitida (8%) | 176,000 × 8% | **14,080** |\n\n**Infracción 1 — No efectuar las retenciones establecidas (art. 177.13).**\nMulta = 50% del tributo no retenido = 14,080 × 50% = **S/ 7,040** (importe base, antes de gradualidad).\n\n**Infracción 2 — Declarar cifras o datos falsos (art. 178.1).**\nLas declaraciones mensuales del PDT de retenciones se presentaron sin estas retenciones, lo que influyó en la determinación. Multa = 50% del tributo omitido = 14,080 × 50% = **S/ 7,040** base.\n\n**Aquí aparece el principio de no concurrencia.** Si se considera que ambas infracciones derivan del mismo hecho —no haber retenido y por eso no haberlo declarado—, corresponde aplicar únicamente la **más grave**, no la suma. Es un argumento que debe plantearse expresamente, porque de lo contrario se liquidan ambas.\n\n**El problema adicional, y el más delicado.** La empresa no retuvo, de modo que nunca descontó el dinero a los profesionales. Hoy tiene dos caminos:\n\n| Opción | Qué implica |\n|---|---|\n| Asumir el tributo | Pagar los S/ 14,080 con sus intereses. El gasto **no es deducible** como tributo asumido de tercero, lo que añade un efecto en la renta anual |\n| Recuperarlo de los profesionales | Jurídicamente posible, comercialmente difícil, y si los profesionales ya regularizaron su renta anual pagando directamente, no corresponde |\n\n**Costo estimado de regularizar hoy, con subsanación voluntaria:**\n\n| Concepto | Importe aproximado |\n|---|---|\n| Retención omitida asumida | 14,080 |\n| Intereses moratorios (variable según antigüedad de cada periodo) | ~1,200 |\n| Multa 177.13 con rebaja por gradualidad | según el anexo aplicable |\n| Multa 178.1 con rebaja del 95% | 7,040 × 5% = 352 |\n| Efecto en renta anual por gasto no deducible | 14,080 × 29.5% = 4,154 |\n\n**Lo que hay que notar:** el costo de regularizar hoy ronda los S/ 20,000. Si SUNAT lo detecta en una fiscalización dentro de dos años, las multas pierden la rebaja del 95%, los intereses se duplican y el costo puede triplicarse. Y lo que originó todo fue no haber configurado una retención del 8% en el proceso de pagos.\n\n**La acción correctiva:** incorporar en el procedimiento de pagos una validación obligatoria antes de cada abono a un recibo por honorarios: monto del recibo, existencia de constancia de suspensión vigente, cálculo automático de la retención. Es un control de un minuto que evita este escenario completo.'},
   {l:3,t:'ab',p:'Una empresa recibe tres resoluciones de multa por S/ 96,000 en total: 175.5 por libros con atraso, 177.1 por no exhibir documentación en una fiscalización, y 178.1 por declarar cifras falsas. El gerente quiere reclamarlas todas. Analiza qué conviene y diseña la estrategia.',
    s:'**Primera regla: cada multa se analiza por separado.** Reclamar en bloque por principio es el error más común y el más caro, porque mantiene vivos los intereses de todo mientras se pierde la gradualidad de lo indefendible.\n\n**Análisis multa por multa:**\n\n**1. Multa 175.5 — Libros con atraso.**\nEs la más difícil de defender: el atraso es un hecho objetivo verificable en las constancias de envío. Las únicas defensas reales son (a) que el plazo de atraso aplicable fuera distinto al invocado por SUNAT, lo que hay que verificar contra el cronograma vigente en cada periodo, (b) que las constancias demuestren que el envío fue dentro de plazo, o (c) que el importe esté mal calculado, por ejemplo si se aplicó un porcentaje sobre ingresos netos equivocados o no se respetaron los topes de la Tabla. **Si ninguna aplica, conviene acogerse a la gradualidad y pagar.**\n\n**2. Multa 177.1 — No exhibir documentación.**\nEsta sí admite defensa en varios frentes:\n- ¿El requerimiento pedía con precisión el documento no exhibido, o era genérico? Un requerimiento ambiguo no puede sustentar la infracción.\n- ¿Se solicitó **prórroga por escrito** y SUNAT no la resolvió o la denegó sin motivación?\n- ¿El documento fue efectivamente entregado y consta en algún cargo de recepción? Aquí vale oro la relación detallada de entrega.\n- ¿El documento requerido existía y la empresa estaba obligada a tenerlo?\n**Si hay cargo de recepción del documento, la defensa es sólida.**\n\n**3. Multa 178.1 — Declarar cifras falsas.**\nEs la de mayor importe y la que más cuidado exige, porque su suerte está atada al reparo de fondo. Si el reparo sobre el tributo se defiende con éxito, la multa cae con él, porque desaparece el tributo omitido que le sirve de base. Si el reparo es correcto, **discutir la multa es la peor decisión económica posible**, porque la rebaja pasa del 60% al 40% o se pierde.\n\n**La estrategia resultante:**\n\n| Multa | Decisión | Fundamento |\n|---|---|---|\n| 175.5 | Acoger a gradualidad y pagar | Hecho objetivo indefendible; discutir solo encarece |\n| 177.1 | **Reclamar** | Defensa documental sólida si existe cargo de recepción |\n| 178.1 | Seguir la suerte del reparo de fondo | Si el reparo se defiende, cae con él; si no, pagar con la mayor rebaja disponible |\n\n**Verificaciones transversales, antes de decidir cualquier cosa:**\n1. **Prescripción**: ¿la acción para aplicar estas sanciones está vigente? El plazo tiene su propio cómputo.\n2. **No concurrencia**: ¿alguna de estas multas sanciona el mismo hecho que otra? Si el no exhibir y el declarar cifras falsas derivan del mismo hecho, procede aplicar solo la más grave.\n3. **Artículo 170**: ¿existe una norma aclaratoria o un cambio de criterio de SUNAT que respalde una duda razonable en la interpretación aplicada?\n4. **Cálculo**: verificar que cada multa use la Tabla correcta según el régimen, los ingresos netos correctos y los topes de las notas.\n5. **Notificación**: verificar que cada resolución fue notificada válidamente, en el domicilio fiscal y con constancia. Una notificación defectuosa es un vicio sustancial.\n\n**El punto que hay que explicarle al gerente:** reclamar no suspende los intereses, y la reclamación de un acto indefendible solo transforma una multa rebajada al 40% en una multa al 100% dos años después. La pregunta correcta no es "¿podemos reclamar?" sino "¿cuál de estas tres tenemos evidencia documental para ganar?". Si la respuesta es una sola, se reclama una sola.\n\n**Y la acción preventiva que debería salir de esto:** las tres multas tienen un origen común, que es la falta de controles de cumplimiento. Un cronograma de envío de libros con alerta, una relación detallada de entrega en cada fiscalización y una conciliación mensual entre registros y declaraciones habrían evitado las tres.'}
  ],
  proy:{
   t:'Mapa de infracciones y costo de incumplimiento de tu empresa',
   ctx:`Vas a cuantificar, en soles, lo que le cuesta a tu empresa cada incumplimiento posible. Un gerente que ve el número actúa; uno que escucha "podríamos tener una multa" no.`,
   pasos:[
    'Revisa los Módulos 1 a 4 y lista las obligaciones formales de tu empresa: inscripción, emisión de comprobantes, libros, declaraciones, retenciones y depósitos de detracción.',
    'Para cada obligación, identifica la infracción tipificada que se configuraría al incumplirla, con su artículo y numeral.',
    'Determina la Tabla aplicable a tu empresa según su régimen y calcula el importe de cada multa con los ingresos netos de tu empresa.',
    'Para cada multa, calcula tres escenarios: subsanación voluntaria, subsanación inducida y pago tras reclamación. Cuantifica la diferencia.',
    'Suma el costo total de un escenario de incumplimiento generalizado durante un ejercicio, y compáralo con el costo de los controles preventivos que evitarían todo eso.',
    'Diseña la lista de verificación mensual de seis puntos adaptada a tu empresa, con responsable y fecha de ejecución.',
    'Redacta el procedimiento de subsanación voluntaria: cómo se detecta un error, quién decide rectificar y en qué orden se paga.'
   ],
   entrega:[
    'El mapa de obligaciones, infracciones y multas con su base de cálculo.',
    'Los tres escenarios de gradualidad por infracción, con la diferencia cuantificada.',
    'La comparación entre el costo del incumplimiento y el costo de los controles.',
    'La lista de verificación mensual y el procedimiento de subsanación.'
   ],
   crit:[
    'Las multas usan la Tabla correcta según el régimen de tu empresa y respetan los topes de las notas.',
    'La comparación de escenarios demuestra numéricamente el valor de subsanar a tiempo.',
    'El procedimiento de subsanación respeta el orden: rectificar, pagar el tributo, pagar la multa rebajada.'
   ],
   pista:'La comparación final suele ser demoledora: los controles preventivos cuestan unas horas de trabajo al mes, y el escenario de incumplimiento puede equivaler a varios meses de utilidad. Ese número es el que convence a la gerencia de financiar el área contable.'
  },
  proyInt:{
   t:'Sistema de cumplimiento tributario integral',
   integra:'1.1 a 5.4',
   ctx:`Vas a convertir todo lo tributario del curso en un sistema de cumplimiento: no una lista de buenas intenciones, sino un conjunto de controles con responsable, frecuencia y evidencia.`,
   pasos:[
    'Construye la matriz maestra de cumplimiento con una fila por obligación tributaria de tu empresa y estas columnas: obligación, norma, plazo, responsable, control preventivo, evidencia del control, infracción si se incumple e importe de la multa.',
    'Clasifica los controles en tres niveles: preventivos (evitan el error), detectivos (lo encuentran a tiempo para subsanar voluntariamente) y correctivos (lo arreglan después).',
    'Para cada obligación, define el control detectivo que permitiría descubrir el error antes de cualquier notificación de SUNAT, que es lo que preserva la rebaja del 95%.',
    'Arma el calendario tributario anual de tu empresa: todas las fechas de vencimiento del ejercicio, con el responsable y el control asociado a cada una.',
    'Integra la matriz con el registro de contingencias del subtema 5.1 y el expediente de defensa del 5.2: cada contingencia debe tener un control asignado.',
    'Diseña el informe mensual de cumplimiento tributario: una página con los seis indicadores de la lista de verificación, el estado de cada uno y las excepciones del mes.',
    'Redacta la política de cumplimiento tributario de tu empresa: dos páginas con los principios, las responsabilidades y el procedimiento de escalamiento cuando se detecta un incumplimiento.'
   ],
   entrega:[
    'La matriz maestra de cumplimiento con sus ocho columnas.',
    'La clasificación de controles en tres niveles.',
    'El calendario tributario anual con responsables.',
    'El informe mensual de cumplimiento y la política de cumplimiento tributario.'
   ],
   crit:[
    'Cada obligación tiene al menos un control detectivo capaz de encontrar el error antes de una notificación.',
    'Cada control tiene evidencia verificable, no solo una descripción.',
    'La política define quién decide subsanar y en qué plazo, porque esa decisión no puede quedar en el aire.'
   ],
   pista:'El control detectivo más valioso de todos es la conciliación mensual entre el SIRE, el Registro de Compras y la declaración de IGV. Detecta la mayoría de los errores que luego se convierten en la infracción del 178.1, que es la más costosa.'
  },
  fuentes:[
   {a:'TUO del Código Tributario', o:'Artículos 164 a 180 y Tablas I, II y III', n:'definición de infracción, determinación objetiva, tipos de sanción, principios y tipificación de infracciones'},
   {a:'Resolución de Superintendencia 063-2007/SUNAT', o:'Régimen de Gradualidad de sanciones', n:'criterios y porcentajes de rebaja según el momento de la subsanación'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'análisis de las infracciones con jurisprudencia y criterios de concurrencia'},
   {a:'Francisco Ruiz de Castilla', o:'Derecho Tributario: temas básicos', n:'principios de la potestad sancionadora y límites de la determinación objetiva'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'efecto de los tributos asumidos de terceros en la deducibilidad del gasto'}
  ]
 },
 {
  id:'m5t5', titulo:'El procedimiento contencioso tributario: reclamación, apelación y queja', min:26,
  cont:`Cuando SUNAT emite un acto que el contribuyente considera equivocado, existe un camino reglado para discutirlo. El artículo 124 establece dos etapas:

$ 1) RECLAMACIÓN ante la propia Administración Tributaria
$ 2) APELACIÓN ante el Tribunal Fiscal

Agotada la vía administrativa, queda la **demanda contencioso-administrativa** ante el Poder Judicial. Son tres instancias con plazos, requisitos y reglas probatorias propias, y el error en cualquiera de ellos puede cerrar la puerta definitivamente.

# Qué actos se pueden reclamar (art. 135)
|Acto reclamable|Observación|
|**Resolución de Determinación**|El resultado típico de una fiscalización|
|**Resolución de Multa**|La sanción por infracciones|
|**Orden de Pago**|Con la regla especial de pago previo|
|Resolución que determina la **pérdida de un fraccionamiento**|Plazo especial de cinco días hábiles|
|Resoluciones de **comiso, internamiento temporal de vehículos y cierre**|Plazo de cinco días hábiles|
|Resoluciones que resuelven **solicitudes de devolución**|Incluye la denegatoria ficta|
|Los actos que tengan relación directa con la **determinación** de la deuda|Cláusula abierta que amplía lo reclamable|

# Los plazos: lo que no se recupera
|Acto|Plazo para reclamar|Consecuencia de dejarlo pasar|
|Resolución de Determinación y de Multa|**20 días hábiles** desde el día hábil siguiente a la notificación|Pasado el plazo, solo se admite la reclamación si se **paga la totalidad** de la deuda o se presenta **carta fianza**|
|Resoluciones de comiso, internamiento y cierre|**5 días hábiles**|La sanción queda firme|
|Resolución que declara la pérdida del fraccionamiento|**5 días hábiles**|La pérdida queda firme y la deuda se vuelve exigible|
|Orden de Pago|**20 días hábiles**, pero como regla general se exige el **pago previo**|Salvo que medien circunstancias que evidencien que la cobranza sería improcedente (art. 119)|

! Los veinte días hábiles son el plazo más importante del derecho tributario peruano. Dentro de ese plazo, la reclamación de una resolución de determinación o de multa **no exige pago previo** y suspende la exigibilidad de la deuda. Un día después, discutir la misma deuda exige pagarla o afianzarla por completo. Un plazo perdido por descuido convierte una defensa viable en un problema de caja imposible.

# Requisitos de la reclamación (art. 137)
1. **Escrito fundamentado**, con los fundamentos de hecho y, cuando sea posible, de derecho.
2. **Autorización de letrado** en los lugares donde la defensa es cautiva, con su firma, nombre y número de registro hábil.
3. **Hoja de información sumaria** en el formato que aprueba SUNAT.
4. Presentación dentro del plazo.

Si falta un requisito subsanable, la Administración otorga un plazo para subsanarlo; si no se subsana, la reclamación se declara **inadmisible**.

# La prueba: la regla del artículo 141 que decide los casos
$ Art. 125: los medios probatorios son los DOCUMENTOS, la PERICIA y la INSPECCIÓN
$ Plazo probatorio: 30 días hábiles (45 en precios de transferencia; 5 en comiso, internamiento y cierre)

Y aquí viene la regla que, en la práctica, decide la mayoría de las reclamaciones:

! **Artículo 141:** no se admite como medio probatorio el que, habiendo sido **requerido en la fiscalización**, no fue presentado o exhibido, **salvo** que el deudor pruebe que la omisión no se generó por su causa, o que pague el monto reclamado vinculado a las pruebas presentadas, o presente carta fianza.

> Esto significa que **la prueba se gana o se pierde en la fiscalización**, no en la reclamación. Un contribuyente que no exhibió un contrato cuando se lo pidieron no puede, salvo excepciones, presentarlo después. Por eso todo lo dicho sobre atender bien una fiscalización no es consejo de buenas prácticas: es el requisito para poder defenderse más tarde.

# Plazos para resolver y el efecto de los intereses
|Instancia|Plazo para resolver|
|Reclamación|**9 meses** desde su presentación, incluido el plazo probatorio|
|Reclamación en precios de transferencia|**12 meses**|
|Reclamación de comiso, internamiento y cierre|**20 días hábiles**|
|Reclamación de denegatoria ficta de devolución|**2 meses**|
|Apelación ante el Tribunal Fiscal|**12 meses** (18 meses en precios de transferencia)|

$ Art. 33: la TIM no se aplica durante el tiempo en que se exceden los plazos para resolver,
$ siempre que el retraso no sea atribuible al deudor

Esa suspensión de intereses es una de las razones legítimas para impugnar: si la Administración o el Tribunal exceden su plazo, el costo financiero de la espera deja de recaer en el contribuyente. Pero ojo: la suspensión opera por el **exceso** del plazo, no desde el inicio del procedimiento.

**Silencio administrativo:** vencido el plazo sin resolución, el contribuyente puede considerar denegada su reclamación e **interponer apelación**, sin esperar indefinidamente.

# La apelación ante el Tribunal Fiscal
|Aspecto|Regla|
|**Plazo**|**15 días hábiles** desde la notificación de la resolución que resuelve la reclamación (30 días hábiles en precios de transferencia; 5 días hábiles en comiso, internamiento y cierre)|
|**Dónde se presenta**|Ante la **propia Administración**, que verifica los requisitos y eleva el expediente al Tribunal Fiscal|
|**Hechos nuevos (art. 147)**|**No se puede discutir aspectos que no fueron alegados en la reclamación**, salvo que no se hubieran podido conocer antes|
|**Apelación de puro derecho (art. 151)**|Cuando la controversia es exclusivamente de interpretación de normas, se puede apelar **directamente** al Tribunal Fiscal, dentro de **20 días hábiles**, sin reclamar previamente|
|**Jurisprudencia de observancia obligatoria (art. 154)**|Las resoluciones del Tribunal que interpreten de modo expreso y con carácter general el sentido de las normas, publicadas en el diario oficial, son de **cumplimiento obligatorio** para todos los órganos de la Administración|

> El artículo 147 es una trampa frecuente. Un contribuyente que omitió un argumento en la reclamación y lo descubre después, ya no puede introducirlo en la apelación. **El escrito de reclamación debe contener TODOS los argumentos**, incluso los subsidiarios, incluso los que parezcan débiles. Nunca se guarda un argumento "para después".

# La queja: el remedio contra el procedimiento
$ Art. 155: la queja se presenta cuando existan actuaciones o procedimientos que
$ afecten directamente o infrinjan lo establecido en el Código Tributario

La queja **no** discute el fondo de una deuda: discute el **procedimiento**. Se usa, por ejemplo, cuando se inicia una cobranza coactiva sobre una deuda que no es exigible, cuando se trabó una medida cautelar irregular, cuando no se eleva una apelación o cuando no se respeta un plazo.

|Contra quién|Quién resuelve|Plazo para resolver|
|Actuaciones de la Administración Tributaria|**Tribunal Fiscal** (Oficina de Atención de Quejas)|**20 días hábiles**|
|Actuaciones del Tribunal Fiscal|Ministerio de Economía y Finanzas|20 días hábiles|

La queja es la herramienta más rápida del sistema y la más desaprovechada. Una cobranza coactiva iniciada sobre una deuda reclamada en plazo se detiene con una queja, no con una reclamación nueva.

# Las solicitudes no contenciosas (arts. 162 y 163)
No todo trámite es una controversia. Las solicitudes como la devolución de pagos indebidos, la prescripción, el cambio de régimen o la inscripción en un registro son **no contenciosas**: se resuelven en **45 días hábiles**.

Si la solicitud está **vinculada a la determinación** de la obligación tributaria, la resolución que la resuelve es **apelable ante el Tribunal Fiscal**. Si no lo está, se rige por la Ley del Procedimiento Administrativo General y se impugna según esa norma. Distinguir ambos casos evita presentar el recurso ante el órgano equivocado y perder el plazo.

# La vía judicial (art. 157)
Agotada la vía administrativa, procede la **demanda contencioso-administrativa** ante el Poder Judicial, dentro de **tres meses** desde la notificación de la resolución del Tribunal Fiscal.

! La demanda **no suspende la ejecución** de la resolución del Tribunal Fiscal, salvo que se obtenga una medida cautelar judicial. Es decir, la deuda confirmada por el Tribunal se puede cobrar mientras el juicio avanza.

# El análisis que hay que hacer antes de impugnar
No toda resolución debe reclamarse. La decisión responsable considera cinco variables:

1. **Probabilidad de éxito**: ¿hay evidencia documental y fue presentada en la fiscalización? Si no fue presentada, el artículo 141 probablemente la excluya.
2. **Costo financiero de la espera**: los intereses siguen corriendo durante el procedimiento, salvo el exceso de plazo del artículo 33. Una deuda discutida tres años puede crecer sustancialmente.
3. **Pérdida de gradualidad**: si se trata de multas, discutir baja la rebaja de 60% a 40% o la elimina. Hay que comparar la rebaja perdida con el monto en discusión.
4. **Efecto en la operación**: una deuda en discusión aparece en la situación tributaria de la empresa y puede afectar licitaciones, financiamiento y certificados.
5. **Costo del asesoramiento**: honorarios legales de tres instancias frente al monto discutido.

$ Regla práctica: impugnar cuando hay evidencia documental presentada en la fiscalización
$ y el monto en discusión supera con holgura el costo financiero y legal de la espera

> El peor resultado posible es reclamar sin evidencia, perder en las tres instancias y pagar al final el tributo, la multa al 100% y tres años de intereses. El segundo peor es pagar una deuda improcedente por no haber revisado el plazo de veinte días. Un contador competente distingue estos dos escenarios en la primera lectura de la resolución.`,
  claves:['El procedimiento tiene dos etapas administrativas: reclamación ante SUNAT y apelación ante el Tribunal Fiscal; luego queda la vía judicial.','Veinte días hábiles es el plazo clave: dentro de él se reclama sin pago previo; vencido, hay que pagar o afianzar toda la deuda.','El artículo 141 excluye como prueba lo que fue requerido en la fiscalización y no se presentó: la prueba se gana en la fiscalización, no en la reclamación.','El artículo 147 prohíbe alegar en apelación lo que no se alegó en la reclamación: el primer escrito debe contener todos los argumentos.','La queja ataca el procedimiento, no el fondo, y se resuelve en veinte días hábiles: es la herramienta más rápida y la más desaprovechada.'],
  preg:[
   {p:'¿Por qué los veinte días hábiles para reclamar son el plazo más importante del derecho tributario?',
    r:'Porque de ellos depende si la empresa puede discutir sin desembolsar. Dentro de los veinte días hábiles siguientes a la notificación, la reclamación de una resolución de determinación o de multa se admite **sin pago previo** y suspende la exigibilidad de la deuda. Vencido el plazo, la reclamación solo se admite si se paga la **totalidad** de la deuda o se presenta carta fianza por el monto, actualizado hasta por nueve meses. Para una deuda de varios cientos de miles de soles, eso convierte una defensa viable en una imposibilidad de caja. Por eso el primer acto al recibir cualquier resolución es anotar la fecha de notificación y contar el plazo, antes incluso de leer el fondo.'},
   {p:'¿Qué establece el artículo 141 y por qué cambia la forma de atender una fiscalización?',
    r:'Establece que no se admite como medio probatorio en la reclamación aquel documento que, **habiendo sido requerido durante la fiscalización, no fue presentado o exhibido**, salvo que el contribuyente pruebe que la omisión no se generó por su causa, o que pague el monto reclamado vinculado a esas pruebas, o presente carta fianza. El efecto práctico es que la prueba se gana o se pierde en la fiscalización: guardarse un documento para la reclamación, o no encontrarlo a tiempo, lo deja fuera del expediente de forma definitiva. Esto convierte la atención ordenada de los requerimientos —entregar todo lo pedido, con cargo, dentro de plazo— en el requisito previo de cualquier defensa posterior.'},
   {p:'¿Por qué el escrito de reclamación debe contener todos los argumentos, incluso los débiles?',
    r:'Por el artículo 147: en la apelación **no se puede discutir aspectos que no fueron alegados en la reclamación**, salvo que no se hubieran podido conocer antes. Un argumento omitido en la primera instancia queda fuera del debate para siempre. Por eso no existe la estrategia de "reservar" un argumento para la segunda instancia: es simplemente renunciar a él. El escrito de reclamación debe desarrollar el argumento principal y todos los subsidiarios, en orden de solidez, incluidos los de forma (notificación defectuosa, falta de motivación, prescripción) que suelen parecer secundarios y a veces son los que ganan el caso.'},
   {p:'¿Cuál es la diferencia entre una reclamación y una queja, y cuándo se usa cada una?',
    r:'La reclamación discute el **fondo**: si la deuda existe, si el monto es correcto, si la infracción se configuró. La queja discute el **procedimiento**: cuando la Administración actúa infringiendo lo establecido en el Código, por ejemplo iniciando una cobranza coactiva sobre una deuda no exigible, trabando una medida cautelar irregular, no elevando una apelación o incumpliendo un plazo. La queja la resuelve el Tribunal Fiscal en veinte días hábiles, lo que la convierte en la herramienta más rápida del sistema. El caso típico de uso: si llega una resolución de ejecución coactiva por una deuda que ya fue reclamada dentro del plazo, lo que corresponde no es reclamar otra vez sino presentar una queja para que se suspenda la cobranza.'},
   {p:'Una empresa tiene una resolución de multa de S/ 30,000 por una infracción que efectivamente cometió. ¿Conviene reclamar?',
    r:'No, y el cálculo lo demuestra. Si la infracción es real y no hay defensa documental, reclamar significa: perder la rebaja del régimen de gradualidad, que en esa etapa puede estar en 60% y bajar a 40% o desaparecer; mantener los intereses corriendo durante los nueve meses de la reclamación y los doce de la apelación; pagar honorarios legales de dos instancias; y arrastrar una deuda en discusión que afecta la situación tributaria de la empresa frente a bancos y licitaciones. El resultado probable es pagar al final una multa mayor que la de hoy, más intereses y honorarios. Impugnar tiene sentido cuando hay evidencia documental presentada en la fiscalización, cuando el acto tiene un vicio de forma o cuando la interpretación de la norma es genuinamente discutible; no como reacción automática a una notificación.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una resolución de determinación fue notificada el lunes 2. ¿Hasta cuándo se puede reclamar sin pago previo?',
    o:['20 días calendario desde el 2','20 días hábiles contados desde el día hábil siguiente a la notificación','9 meses','15 días hábiles'],r:1,
    s:'Veinte **días hábiles**, contados desde el día hábil siguiente a la notificación. Los días hábiles excluyen sábados, domingos y feriados, de modo que el plazo real en el calendario es cerca de un mes, pero nunca debe estimarse "a ojo": hay que contarlo. Vencido ese plazo, la reclamación solo se admite pagando la totalidad de la deuda o presentando carta fianza. Los nueve meses son el plazo que tiene SUNAT para **resolver**, no para reclamar, y los quince días hábiles corresponden a la apelación.'},
   {l:1,t:'mc',p:'SUNAT inició cobranza coactiva de una deuda que la empresa reclamó dentro del plazo. ¿Qué corresponde presentar?',
    o:['Una nueva reclamación','Una apelación ante el Tribunal Fiscal','Una queja ante el Tribunal Fiscal','Una demanda contencioso-administrativa'],r:2,
    s:'Una **queja** ante el Tribunal Fiscal. La deuda reclamada dentro del plazo no es exigible coactivamente, de modo que la cobranza infringe el procedimiento establecido en el Código. La queja es el remedio previsto para eso y se resuelve en veinte días hábiles, lo que permite detener embargos con rapidez. Una nueva reclamación sería improcedente porque el acto ya está reclamado; la apelación no procede porque todavía no hay resolución de la reclamación; y la vía judicial exige agotar la vía administrativa.'},
   {l:2,t:'ab',p:'Una empresa recibe una resolución de determinación por S/ 250,000. Tiene un contrato y las conformidades que sustentan el gasto reparado, pero NO los presentó durante la fiscalización porque estaban en el archivo de un local que se mudó. Analiza su situación probatoria.',
    s:'**El problema central es el artículo 141.** No se admite como medio probatorio el documento que, habiendo sido requerido en la fiscalización, no fue presentado. Si el requerimiento pidió ese contrato y la empresa no lo exhibió, la prueba está excluida, por más decisiva que sea.\n\n**Las tres puertas que deja abiertas el artículo 141:**\n\n| Excepción | Qué exige | Viabilidad en este caso |\n|---|---|---|\n| Probar que la omisión **no se generó por causa del deudor** | Acreditar una imposibilidad real, no una desorganización interna | **Difícil**: una mudanza de archivo es una causa imputable a la propia empresa |\n| **Pagar el monto reclamado** vinculado a las pruebas | Desembolsar los S/ 250,000 | Posible pero costoso; se recupera si gana |\n| Presentar **carta fianza** por el monto | Línea bancaria disponible y costo de la fianza | Suele ser la salida práctica |\n\n**Verificación previa indispensable, y es lo primero que hay que hacer:** leer **literalmente** el requerimiento. ¿Pidió ese contrato en concreto? ¿Pidió "la documentación que sustente los gastos de la cuenta 63" de forma genérica? Si el requerimiento fue genérico y no identificó el documento, hay un argumento sólido para sostener que no fue "requerido" en el sentido del artículo 141, y entonces la prueba sí es admisible. Esta lectura minuciosa del requerimiento ha salvado muchos casos.\n\n**Estrategia recomendada, en orden:**\n\n1. **Reclamar dentro de los 20 días hábiles**, sin falta. El plazo es lo único irrecuperable.\n2. En el escrito, plantear **primero** que el documento no fue específicamente requerido, con la cita literal del requerimiento y de su resultado.\n3. **Subsidiariamente**, argumentar que la omisión no fue por causa imputable, aportando toda evidencia de la mudanza: contrato de arrendamiento del local anterior, acta de traslado, comunicaciones internas fechadas, denuncia si hubo pérdida.\n4. **Subsidiariamente**, ofrecer carta fianza por el monto vinculado a las pruebas, para habilitar su admisión.\n5. Desarrollar **además** los argumentos de fondo que no dependen de esa prueba: causalidad del gasto, razonabilidad, otros elementos de fehaciencia que sí se presentaron (bancarización, detracción, registro contable, correos).\n6. Incluir los argumentos **de forma**: motivación de la resolución, validez de la notificación, prescripción si aplica.\n\n**Por qué todo junto y no por partes:** por el artículo 147, lo que no se alegue en la reclamación no podrá discutirse en la apelación. No hay segunda oportunidad para agregar un argumento.\n\n**La lección, que es el verdadero contenido del ejercicio:** la documentación que sustenta operaciones significativas no puede estar en un archivo que nadie controla. El expediente por operación —contrato, entregables, conformidad, comprobante, bancarización— debe armarse cuando la operación ocurre y conservarse de forma que se encuentre en horas, no en semanas. El artículo 141 convierte el desorden documental en una pérdida patrimonial directa.'},
   {l:2,t:'num',p:'Una resolución de multa fue notificada el 10 de marzo. La empresa reclama el 20 de abril (más de 20 días hábiles después). ¿Qué porcentaje de la deuda debe pagar o afianzar para que se admita su reclamación?',
    u:'%',r:100,tol:0,
    s:'El **100%** de la deuda. El artículo 137 establece que, vencido el plazo de veinte días hábiles, la reclamación solo se admite si se acredita el **pago de la totalidad** de la deuda tributaria actualizada hasta la fecha de pago, o si se presenta **carta fianza** bancaria o financiera por dicho monto, actualizado hasta por nueve meses posteriores a la fecha de interposición.\n\nNo existe pago parcial ni admisión condicionada: es todo o nada. Por eso perder el plazo de veinte días hábiles no es un defecto formal menor, es la diferencia entre poder discutir y no poder. Y es la razón por la que el primer acto al recibir cualquier resolución de SUNAT debe ser anotar la fecha de notificación en el calendario y contar los días hábiles, antes de analizar el fondo.'},
   {l:3,t:'ab',p:'Una empresa perdió su reclamación. El Tribunal Fiscal es la siguiente instancia y el monto en discusión es S/ 600,000 entre tributo y multas. Diseña el análisis completo de la decisión de apelar, con el cálculo del costo de la espera.',
    s:'**La decisión de apelar es económica, jurídica y operativa a la vez. Hay que resolver las tres.**\n\n**1. Análisis jurídico: ¿qué queda por discutir?**\n\nPor el artículo 147, en la apelación **solo** se pueden discutir los aspectos ya alegados en la reclamación. Así que el primer paso es releer el escrito de reclamación y la resolución que lo resolvió, y responder:\n\n| Pregunta | Por qué importa |\n|---|---|\n| ¿Todos los argumentos sólidos fueron alegados en la reclamación? | Lo que no está, no entra |\n| ¿La resolución que resolvió la reclamación respondió cada argumento? | Una resolución que omite responder un argumento tiene un vicio de motivación alegable |\n| ¿Existe jurisprudencia de observancia obligatoria del Tribunal Fiscal favorable? | El artículo 154 la hace vinculante para la Administración; es el argumento más fuerte que existe |\n| ¿Hay pruebas excluidas por el artículo 141 que podrían admitirse con carta fianza? | Puede cambiar el panorama probatorio |\n\n**2. Análisis económico: el costo de la espera**\n\nSupongamos una TIM del orden del 0.9% mensual sobre el tributo impago:\n\n| Concepto | Cálculo | Importe aproximado |\n|---|---|---|\n| Monto en discusión | | 600,000 |\n| Plazo del Tribunal Fiscal para resolver | 12 meses | |\n| Intereses durante la apelación | 600,000 × 0.9% × 12 | ~64,800 |\n| Honorarios legales de la apelación | estimado | 20,000 a 50,000 |\n| **Costo de apelar y perder** | | **~85,000 a 115,000 adicionales** |\n\n**El contrapeso del artículo 33:** si el Tribunal Fiscal excede los doce meses para resolver, la TIM **no se aplica** durante ese exceso, siempre que la demora no sea atribuible al deudor. En la práctica, los procedimientos ante el Tribunal suelen exceder el plazo, de modo que buena parte del tiempo de espera puede no generar intereses. Esto mejora significativamente la ecuación y es un factor que casi nadie calcula.\n\n**El contrapeso de la gradualidad:** sobre la parte de multas, discutir hasta la apelación hace perder las rebajas. Hay que separar el monto de tributo del monto de multas y evaluarlos por separado: puede convenir apelar el tributo y pagar las multas con la rebaja disponible, si son infracciones indefendibles.\n\n**3. Análisis operativo**\n\n| Factor | Efecto de tener una deuda en discusión |\n|---|---|\n| Licitaciones con el Estado | Puede requerirse no tener deuda exigible; una deuda reclamada en plazo no es exigible, lo que juega a favor |\n| Financiamiento bancario | Los bancos consultan la situación tributaria; una contingencia de S/ 600,000 afecta la evaluación |\n| Venta de la empresa o ingreso de un socio | Una contingencia en discusión se descuenta del precio, usualmente por más de su monto |\n| Gestión interna | La apelación consume tiempo de la gerencia y del área contable durante un año |\n\n**4. La decisión, estructurada en una matriz**\n\n| Escenario | Si se apela y gana | Si se apela y pierde | Si no se apela |\n|---|---|---|---|\n| Desembolso | Solo honorarios | 600,000 + intereses + honorarios | 600,000 con la rebaja de multas disponible hoy |\n| Plazo | ~12 a 24 meses | ~12 a 24 meses | Inmediato o fraccionado |\n| Riesgo | Bajo | Alto | Ninguno |\n\n**Regla de decisión:** apelar cuando concurran al menos dos de estas tres condiciones: (a) existe jurisprudencia de observancia obligatoria o un criterio reiterado del Tribunal favorable, (b) la resolución de la reclamación tiene un vicio de motivación verificable, o (c) la prueba documental fue presentada en la fiscalización y sostiene la posición. Si no concurre ninguna, apelar es financiar intereses y honorarios para llegar al mismo resultado con un importe mayor.\n\n**5. Y la alternativa que siempre hay que evaluar**\n\nSi se decide no apelar, la deuda puede **fraccionarse**, lo que convierte un desembolso imposible en cuotas manejables con un interés inferior a la TIM. Pero atención: solicitar el fraccionamiento implica reconocer la deuda e **interrumpir la prescripción**, de modo que es una decisión que cierra la puerta de la discusión. Debe tomarse después del análisis, no antes.\n\n**Lo que el contador debe entregar a la gerencia:** no una opinión, sino esta matriz con números. La decisión de apelar una deuda de S/ 600,000 es una decisión de negocio que corresponde a la gerencia, y el papel del contador es que la tome informada y dentro del plazo de quince días hábiles.'}
  ],
  proy:{
   t:'Escrito de reclamación de tu empresa',
   ctx:`Vas a redactar una reclamación real, sobre uno de los reparos que tú mismo detectaste en el simulacro de fiscalización. Es el documento que distingue a un contador que registra de uno que defiende.`,
   pasos:[
    'Toma el resultado de requerimiento del simulacro de fiscalización del subtema 5.3 y elige el reparo que decidiste defender.',
    'Construye la resolución de determinación simulada: monto reparado, tributo, periodo, fundamento de SUNAT.',
    'Verifica el plazo: cuenta los veinte días hábiles desde la fecha de notificación simulada y fija la fecha límite de presentación.',
    'Redacta el escrito de reclamación con esta estructura: datos del contribuyente, acto que se impugna, fundamentos de hecho, fundamentos de derecho, medios probatorios ofrecidos, petitorio y anexos.',
    'Desarrolla todos los argumentos, principales y subsidiarios, incluidos los de forma: motivación, notificación, prescripción, no concurrencia de infracciones.',
    'Revisa cada medio probatorio que ofreces contra el artículo 141: ¿fue requerido en la fiscalización? ¿fue presentado? Si no lo fue, indica cuál de las tres excepciones invocas.',
    'Arma la hoja de información sumaria y la relación de anexos numerada.',
    'Calcula el costo financiero de la reclamación: intereses durante nueve meses, gradualidad perdida y honorarios estimados, y concluye si la reclamación se justifica.'
   ],
   entrega:[
    'El escrito de reclamación completo con su estructura formal.',
    'La verificación de admisibilidad probatoria de cada anexo frente al artículo 141.',
    'La hoja de información sumaria y la relación de anexos.',
    'El análisis costo-beneficio de la reclamación.'
   ],
   crit:[
    'El escrito desarrolla todos los argumentos, porque el artículo 147 impide agregarlos después.',
    'Cada medio probatorio tiene verificada su admisibilidad frente al artículo 141.',
    'El análisis costo-beneficio concluye con una recomendación fundamentada, no con una intención.'
   ],
   pista:'Empieza el escrito por los argumentos de forma, no por los de fondo. Un vicio de notificación o de motivación puede resolver el caso sin entrar al fondo, y además obliga a la Administración a pronunciarse sobre él.'
  },
  proyInt:{
   t:'Manual de defensa tributaria integral',
   integra:'1.1 a 5.5',
   ctx:`Reúne todo lo construido para producir el manual de defensa de tu empresa: el documento que dice cómo se responde a cada acto de SUNAT, con qué plazo y con qué argumentos.`,
   pasos:[
    'Capítulo 1 — Mapa de actos de SUNAT: cada acto que puede recibir la empresa (esquela, carta inductiva, requerimiento, resultado de requerimiento, comunicación del art. 75, resolución de determinación, de multa, orden de pago, resolución de ejecución coactiva), con su naturaleza, su plazo de respuesta y la vía que corresponde.',
    'Capítulo 2 — Tabla maestra de plazos: todos los plazos del procedimiento, para el contribuyente y para la Administración, con la consecuencia de incumplir cada uno.',
    'Capítulo 3 — Árbol de decisión: diagrama que, a partir del acto recibido, conduce a la acción correcta (subsanar, descargar, reclamar, apelar, quejarse, pagar, fraccionar).',
    'Capítulo 4 — Banco de argumentos: los argumentos de forma y de fondo que la empresa puede invocar según el tipo de reparo, con la norma que los sustenta.',
    'Capítulo 5 — Reglas probatorias: cómo se conserva la documentación para que sea admisible, con la regla del artículo 141 explicada y el inventario del expediente permanente.',
    'Capítulo 6 — Modelos: reclamación, apelación, queja, solicitud de prescripción, descargo y solicitud de prórroga.',
    'Capítulo 7 — Análisis económico: la plantilla de costo-beneficio que se llena antes de decidir impugnar, con intereses, gradualidad perdida, honorarios y efecto operativo.',
    'Integra este manual con el de atención de fiscalizaciones y los manuales contable y tributario anteriores, en un documento único con índice general y control de versiones.'
   ],
   entrega:[
    'El manual de defensa tributaria con sus siete capítulos.',
    'El árbol de decisión en formato diagrama.',
    'Los modelos de escritos listos para usar.',
    'El documento maestro integrado con índice general y control de versiones.'
   ],
   crit:[
    'El árbol de decisión conduce a una acción concreta para cada acto posible, sin ramas abiertas.',
    'La tabla de plazos incluye los plazos de la Administración, porque de ellos depende la suspensión de intereses del artículo 33.',
    'La plantilla de costo-beneficio produce un número comparable, no una apreciación cualitativa.'
   ],
   pista:'El árbol de decisión es el entregable más útil de todo el manual. Un contador bajo presión, con un plazo de cinco días hábiles encima, no lee setenta páginas: mira el árbol y actúa.'
  },
  fuentes:[
   {a:'TUO del Código Tributario', o:'Artículos 124 a 163 y artículos 33 y 192', n:'procedimiento contencioso tributario, reclamación, apelación, queja, reglas probatorias y suspensión de intereses'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'desarrollo del procedimiento contencioso con jurisprudencia del Tribunal Fiscal'},
   {a:'Jorge Danós Ordóñez', o:'El proceso contencioso administrativo en materia tributaria', n:'relación entre la vía administrativa y la judicial y agotamiento de instancias'},
   {a:'Tribunal Fiscal', o:'Resoluciones de observancia obligatoria (art. 154)', n:'criterios vinculantes para todos los órganos de la Administración'},
   {a:'Ley 27444 — Ley del Procedimiento Administrativo General', o:'Aplicación supletoria', n:'debido procedimiento, motivación de los actos y régimen de notificaciones'}
  ]
 },
 {
  id:'m5t6', titulo:'Cobranza coactiva, fraccionamiento y devoluciones', min:25,
  cont:`La cobranza coactiva es la facultad del Estado de cobrar sus deudas **sin acudir a un juez**. Es la cara más dura del sistema tributario y la que puede paralizar una empresa en cuestión de días, embargando sus cuentas bancarias. Entenderla no es optativo.

# Qué deuda es exigible coactivamente (art. 115)
No toda deuda puede cobrarse coactivamente. Solo la que reúne la condición de **exigible**:

|Supuesto|Comentario|
|La establecida por **resolución de determinación o de multa no reclamada** en el plazo de ley|El plazo de 20 días hábiles es lo que separa una deuda discutible de una exigible|
|La establecida por resolución **reclamada fuera de plazo** sin cumplir el pago o la fianza|La reclamación inadmisible no suspende nada|
|La establecida por resolución **no apelada** en el plazo de ley, o apelada sin la fianza correspondiente|Igual lógica en segunda instancia|
|La establecida por resolución del **Tribunal Fiscal**|Agotada la vía administrativa|
|La contenida en una **orden de pago** notificada conforme a ley|Por eso la orden de pago es tan delicada|
|Las **costas y gastos** del procedimiento|Se suman a la deuda|

! Si la deuda no es exigible y SUNAT inicia cobranza, el remedio es la **queja** ante el Tribunal Fiscal, que se resuelve en veinte días hábiles. Es el uso más frecuente y más efectivo de la queja.

# El Ejecutor Coactivo y sus facultades (arts. 114 y 116)
El procedimiento lo conduce el **Ejecutor Coactivo**, con apoyo de **Auxiliares Coactivos**. Sus facultades incluyen verificar la exigibilidad de la deuda, ordenar medidas cautelares, disponer la tasación y el remate de los bienes embargados, declarar la nulidad de los actos del procedimiento que lo ameriten y suspender o concluir el procedimiento en los casos de ley.

# El procedimiento (art. 117)
$ 1) Notificación de la Resolución de Ejecución Coactiva (REC)
$ 2) Plazo de SIETE DÍAS HÁBILES para cancelar la deuda
$ 3) Vencido el plazo, el Ejecutor puede disponer MEDIDAS CAUTELARES
$ 4) Tasación y remate de los bienes embargados
$ 5) Imputación del producto del remate a la deuda, costas y gastos

Siete días hábiles. Ese es todo el margen entre la notificación de la REC y un embargo de cuentas. Por eso una REC no es un documento para archivar y revisar la próxima semana.

# Las medidas cautelares (art. 118)
|Forma de embargo|En qué consiste|Efecto práctico|
|**Intervención en recaudación**|Un interventor recauda directamente los ingresos del negocio|Se retira efectivo de la caja diaria|
|**Intervención en información**|Se recaba información sobre el movimiento económico|Preparatorio de otras medidas|
|**Intervención en administración de bienes**|El interventor administra los bienes del deudor|Pérdida de control de la operación|
|**Depósito, con o sin extracción**|Se afectan bienes muebles o inmuebles; con extracción, se retiran físicamente|Paraliza la producción si se extraen equipos|
|**Inscripción**|Se anota el embargo en Registros Públicos|Impide vender o hipotecar el bien|
|**Retención**|Se ordena a bancos o a terceros retener fondos o créditos del deudor|**El más usado y el más devastador**: congela las cuentas bancarias|

> El embargo en forma de **retención bancaria** es el que más empresas ha quebrado. Se comunica electrónicamente a todo el sistema financiero y las cuentas quedan congeladas de inmediato, incluidas las que se usan para pagar planilla y proveedores. Una empresa sin acceso a sus cuentas por dos semanas puede no recuperarse, aunque después gane la discusión.

**Medidas cautelares previas (arts. 56 a 58):** excepcionalmente, SUNAT puede trabar medidas cautelares **antes** de que la deuda sea exigible, cuando el comportamiento del deudor haga presumir que la cobranza podría resultar infructuosa, o existan razones que permitan presumir que la cobranza sería infructuosa. Tienen plazos de caducidad y son impugnables.

# Suspensión y conclusión del procedimiento (art. 119)
El Ejecutor **debe suspender** el procedimiento cuando:
- Lo disponga una resolución del **Tribunal Fiscal** (típicamente al resolver una queja).
- La deuda **ha quedado extinguida** o la obligación **ha prescrito**.
- Se ha presentado **oportunamente** reclamación o apelación contra la resolución que contiene la deuda.
- Existe una ley o norma con rango de ley que lo disponga expresamente.
- Tratándose de órdenes de pago, cuando medien **circunstancias que evidencien que la cobranza podría ser improcedente** y la reclamación se interponga dentro de veinte días hábiles.

Y debe **concluir** el procedimiento, levantando las medidas cautelares, cuando se hubiera presentado oportunamente reclamación o apelación, cuando la deuda haya sido extinguida, cuando se declare la prescripción, cuando la acción se siga contra persona distinta a la obligada, cuando exista resolución concediendo **aplazamiento o fraccionamiento**, o cuando las órdenes de pago o resoluciones que son materia de cobranza hayan sido declaradas nulas, revocadas o sustituidas.

$ Conclusión importante: obtener un fraccionamiento CONCLUYE la cobranza coactiva
$ y obliga a levantar las medidas cautelares

# La intervención excluyente de propiedad (art. 120)
Si se embarga un bien que pertenece a un **tercero**, ese tercero puede presentar una **intervención excluyente de propiedad** ante el Ejecutor, en cualquier momento antes del remate, acreditando su derecho con documento privado de fecha cierta, documento público u otro que a juicio de la Administración acredite fehacientemente la propiedad.

Es la herramienta que protege, por ejemplo, la maquinaria arrendada o en leasing que estaba en el local del deudor al momento del embargo.

# Fraccionamiento y aplazamiento (art. 36)
La deuda tributaria puede aplazarse o fraccionarse con carácter general o particular, en la forma que establezca el reglamento.

|Modalidad|Plazo máximo|
|**Aplazamiento**|Hasta **6 meses**|
|**Fraccionamiento**|Hasta **72 meses**|
|**Aplazamiento con fraccionamiento**|Hasta 6 meses de aplazamiento más 66 de fraccionamiento|

|Condición|Regla general|
|**Interés**|**80% de la TIM** vigente, aplicado sobre el saldo de la deuda acogida|
|**Cuota mínima**|Un porcentaje de la UIT, según el reglamento|
|**Garantías**|Exigibles cuando la deuda acogida supera determinados montos en UIT; se admiten carta fianza e hipoteca|
|**Pérdida**|Se pierde, entre otras causales, por no pagar **dos cuotas consecutivas**, o por no pagar la **última cuota** dentro del plazo|

**Deudas que normalmente no son materia de fraccionamiento:**
- Tributos **retenidos o percibidos**: nunca fueron dinero del contribuyente.
- Los **pagos a cuenta** del ejercicio en curso, mientras no se presente la declaración anual.
- Deuda cuyo remate ya fue convocado.
- Deuda de contribuyentes en proceso de liquidación o con determinadas condiciones.
- Tributos de periodicidad anual cuya regularización aún no venció.

! La exclusión de los tributos retenidos y percibidos es absoluta y sorprende a muchas empresas que esperaban fraccionar su deuda de retenciones de quinta categoría o de detracciones no depositadas. Ese dinero no se fracciona: se paga.

**El efecto más valioso del fraccionamiento:** concluye el procedimiento de cobranza coactiva y obliga a levantar las medidas cautelares, incluidos los embargos bancarios. Es, en muchos casos, la única forma rápida de desbloquear las cuentas de una empresa.

**El costo oculto:** solicitar un fraccionamiento implica **reconocer la deuda**, lo que **interrumpe la prescripción** y cierra la posibilidad de discutirla. Es una decisión que debe tomarse después de verificar el estado de prescripción y la viabilidad de la impugnación, nunca antes.

# Devoluciones (arts. 38 y 39)
Las devoluciones de pagos realizados **indebidamente o en exceso** se efectúan con los intereses que corresponden, calculados desde el día siguiente a la fecha del pago hasta la fecha en que se ponga a disposición el monto.

|Medio de devolución|Cuándo se usa|
|**Notas de Crédito Negociables**|El más común; pueden aplicarse al pago de deudas o transferirse|
|**Cheques no negociables**|Según el monto y el solicitante|
|**Abono en cuenta corriente o de ahorros**|Modalidad habitual para personas naturales y montos menores|

$ Plazo para resolver una solicitud de devolución: 45 días hábiles
$ Vencido el plazo sin pronunciamiento, opera la DENEGATORIA FICTA y se puede reclamar

**Las devoluciones más frecuentes en la práctica:**
|Concepto|Origen|
|**Saldo a favor del exportador**|IGV de las compras vinculadas a exportaciones|
|**Percepciones no aplicadas**|Percepciones del IGV acumuladas sin posibilidad de aplicación|
|**Retenciones no aplicadas**|Retenciones del IGV acumuladas|
|**Pagos indebidos o en exceso**|Errores de cálculo, pagos duplicados, tributos no debidos|
|**Saldo a favor de renta**|Pagos a cuenta superiores al impuesto anual determinado|
|**Drawback**|Restitución de derechos arancelarios, con régimen propio en materia aduanera|

! Toda solicitud de devolución es una **invitación a la verificación**. SUNAT revisa el sustento del crédito que se pide devolver, y esa revisión puede derivar en reparos sobre otros periodos. Antes de solicitar una devolución hay que estar seguro de que el expediente que la sustenta está completo: comprobantes válidos, bancarización, detracciones, registros al día.

# La compensación (art. 40)
|Tipo|Cómo opera|
|**Automática**|Solo en los casos expresamente establecidos por ley, por ejemplo el saldo a favor de renta contra los pagos a cuenta|
|**De oficio**|SUNAT la aplica cuando, en una verificación, detecta deuda y crédito del mismo contribuyente|
|**A solicitud de parte**|El contribuyente la pide, cumpliendo los requisitos del procedimiento|

La compensación es casi siempre preferible a la devolución: es más rápida, no exige esperar cuarenta y cinco días y no implica el mismo nivel de revisión.

# Qué hacer en las primeras 24 horas tras una REC
1. **Verificar la exigibilidad**: ¿la deuda fue reclamada en plazo? ¿está prescrita? ¿la resolución que la contiene fue notificada válidamente? Si hay un defecto, la vía es la **queja**, y es urgente.
2. **Verificar la notificación de la propia REC**: si es defectuosa, el plazo de siete días no empezó a correr.
3. **Determinar la composición de la deuda**: tributo, multas, intereses, costas. A veces una parte es indiscutible y otra no.
4. **Evaluar el fraccionamiento como medida de emergencia**: concluye la cobranza y levanta los embargos, pero reconoce la deuda.
5. **Si hay embargo bancario, actuar el mismo día**: identificar qué cuentas quedaron afectadas, comunicar a la gerencia el impacto en planilla y proveedores, y gestionar la vía más rápida de levantamiento.
6. **Documentar todo**: fechas, horas, comunicaciones. Si hay que presentar una queja, la cronología es la prueba.

> La diferencia entre una empresa que sobrevive a una cobranza coactiva y una que no suele estar en estas veinticuatro horas. No en el fondo del asunto, que puede tardar años en resolverse, sino en la rapidez de la reacción.`,
  claves:['Solo la deuda exigible según el artículo 115 puede cobrarse coactivamente; si no lo es, la vía rápida es la queja ante el Tribunal Fiscal.','La REC otorga siete días hábiles antes de las medidas cautelares; el embargo en forma de retención bancaria es el más usado y el más dañino.','El fraccionamiento concluye la cobranza coactiva y levanta los embargos, pero reconoce la deuda e interrumpe la prescripción.','Los tributos retenidos o percibidos no son materia de fraccionamiento: ese dinero se paga.','Toda solicitud de devolución abre una verificación, por lo que el expediente que la sustenta debe estar completo antes de presentarla.'],
  preg:[
   {p:'¿Por qué es tan importante determinar si una deuda es exigible coactivamente antes de cualquier otra cosa?',
    r:'Porque si no es exigible, todo el procedimiento es irregular y existe un remedio rápido y específico: la **queja** ante el Tribunal Fiscal, que se resuelve en veinte días hábiles y puede ordenar la suspensión de la cobranza y el levantamiento de los embargos. Las causas más frecuentes de inexigibilidad son que la resolución fue reclamada oportunamente, que la deuda está prescrita, que la notificación de la resolución original fue defectuosa o que la cobranza se dirige contra persona distinta a la obligada. Si en cambio la deuda sí es exigible, la discusión de fondo ya no sirve para detener el embargo, y el camino pasa por pagar, fraccionar o negociar. Determinar esto es lo primero porque define qué herramienta se usa, y usar la equivocada cuesta semanas que la empresa no tiene.'},
   {p:'¿Por qué el embargo en forma de retención bancaria es el más temido?',
    r:'Porque se comunica electrónicamente a todo el sistema financiero y congela las cuentas de inmediato, sin distinguir para qué se usan. Una empresa puede quedar sin acceso al dinero con que paga la planilla, a los proveedores y a sus propios tributos corrientes, lo que desencadena incumplimientos en cascada: trabajadores sin sueldo, proveedores que cortan el crédito, nuevos tributos impagos que generan nuevas deudas. Y el daño es casi inmediato, mientras cualquier remedio —queja, fraccionamiento— toma días. Por eso, ante una REC, los siete días hábiles de plazo deben usarse completos y desde el primer día, no esperando a ver qué pasa.'},
   {p:'¿Cuál es el beneficio y cuál el costo de solicitar un fraccionamiento ante una cobranza coactiva?',
    r:'El beneficio es inmediato y decisivo: la resolución que concede el aplazamiento o fraccionamiento es causal de **conclusión** del procedimiento de cobranza coactiva, lo que obliga a levantar las medidas cautelares, incluidos los embargos bancarios. Para una empresa con las cuentas congeladas, suele ser la única salida rápida. Además el interés es del 80% de la TIM, menor que el de la mora. El costo es que solicitar el fraccionamiento implica **reconocer la deuda**, lo que **interrumpe la prescripción** y cierra la vía de la discusión: después de fraccionar no se puede sostener que la deuda no existía. Por eso la secuencia correcta es verificar primero si la deuda es exigible, si está prescrita y si hay una defensa viable, y recién después decidir fraccionar.'},
   {p:'¿Por qué los tributos retenidos y percibidos no se pueden fraccionar?',
    r:'Porque ese dinero nunca fue del contribuyente. Cuando una empresa retiene la quinta categoría de un trabajador o percibe el IGV de un cliente, actúa como recaudador por cuenta del Estado: el importe salió del patrimonio de un tercero y la empresa solo lo custodia hasta entregarlo. Permitir fraccionarlo equivaldría a autorizar que la empresa use durante años dinero ajeno. La consecuencia práctica es dura y sorprende a muchas empresas en crisis de liquidez: la deuda por retenciones o percepciones no admite cuotas, hay que pagarla. Es también una razón más para no usar nunca ese dinero como capital de trabajo.'},
   {p:'¿Por qué conviene preferir la compensación a la devolución cuando ambas son posibles?',
    r:'Por tres razones. Es más rápida: no hay que esperar los cuarenta y cinco días hábiles del procedimiento de devolución ni la emisión de notas de crédito. Es menos expuesta: la solicitud de devolución abre una verificación del crédito que se pide devolver, y esa revisión puede extenderse a otros periodos y derivar en reparos. Y es financieramente más eficiente: el crédito se aplica de inmediato contra una deuda que de otro modo generaría intereses. La devolución tiene sentido cuando no hay deuda contra la cual compensar, o cuando la empresa necesita efectivamente el efectivo. Y cuando se solicite, debe hacerse con el expediente de sustento completo, porque la verificación llega.'}
  ],
  ej:[
   {l:1,t:'num',p:'¿Cuántos días hábiles otorga la Resolución de Ejecución Coactiva para pagar antes de que el Ejecutor pueda trabar medidas cautelares?',
    u:'días hábiles',r:7,tol:0,
    s:'**Siete días hábiles**, conforme al artículo 117. Vencido ese plazo sin que se cancele la deuda, el Ejecutor Coactivo puede disponer las medidas cautelares del artículo 118, entre ellas el embargo en forma de retención bancaria, que se comunica electrónicamente al sistema financiero. Siete días hábiles son cerca de una semana y media de calendario: es todo el margen que tiene una empresa para verificar la exigibilidad de la deuda, presentar una queja si corresponde, pagar o gestionar un fraccionamiento. Por eso una REC se atiende el mismo día en que llega.'},
   {l:1,t:'mc',p:'¿Cuál de estas deudas NO puede ser materia de fraccionamiento?',
    o:['IGV de un periodo vencido y declarado','Impuesto a la Renta anual determinado y no pagado','Retenciones de quinta categoría efectuadas y no pagadas','Multa por presentar la declaración fuera de plazo'],r:2,
    s:'Las **retenciones efectuadas y no pagadas** no son materia de fraccionamiento. El fundamento es que ese dinero nunca perteneció a la empresa: se descontó del patrimonio del trabajador para entregarlo al fisco. La misma exclusión alcanza a las percepciones. Las otras tres deudas —IGV vencido, renta anual determinada y multas— sí son fraccionables, cumpliendo los requisitos del reglamento. Esta exclusión sorprende a muchas empresas en crisis, que descubren que justamente la deuda que más les pesa es la única que no admite cuotas.'},
   {l:2,t:'ab',p:'Una empresa recibe el lunes una REC por S/ 180,000. El miércoles descubre que sus cuentas bancarias están embargadas y el viernes debe pagar la planilla de S/ 95,000. La deuda corresponde a una resolución de multa que la empresa nunca reclamó porque "se perdió el documento". Diseña el plan de acción hora por hora.',
    s:'**Nota previa sobre el embargo del miércoles:** si la REC se notificó el lunes, el plazo de siete días hábiles no había vencido el miércoles, de modo que un embargo trabado ese día es, en principio, irregular, salvo que se trate de una **medida cautelar previa** de los artículos 56 a 58, que tiene su propio régimen. **Esto es lo primero que hay que verificar, porque si el embargo es irregular, la queja es inmediata y muy probablemente exitosa.**\n\n**Lunes, primeras horas: verificación**\n\n| Verificar | Dónde | Si falla |\n|---|---|---|\n| ¿La REC fue notificada válidamente? | Constancia de notificación, domicilio fiscal | El plazo no corrió: queja |\n| ¿La resolución de multa original fue notificada válidamente? | Expediente, consultas en el portal | La deuda no es exigible: queja |\n| ¿La deuda está prescrita? | Fecha de la infracción y cómputo del art. 44 | No es exigible: queja y solicitud de prescripción |\n| ¿Existe reclamación presentada? | Registro de la empresa | Si hubo y fue oportuna: queja |\n| ¿La deuda corresponde a esta empresa? | Datos del RUC en la resolución | Si no: queja |\n\n**El dato clave del caso:** la empresa "nunca reclamó porque se perdió el documento". Eso no es una defensa, pero abre una pregunta esencial: **¿la resolución de multa fue efectivamente notificada conforme a ley?** Si la notificación fue defectuosa —en un domicilio que no era el fiscal, sin constancia, con acuse irregular—, el plazo de veinte días nunca empezó a correr y la deuda **no es exigible**. Esta verificación es la línea de defensa principal y hay que hacerla el lunes, no el jueves.\n\n**Lunes, segunda mitad del día: medidas paralelas**\n\n1. **Identificar el alcance del embargo**: contactar a cada banco y determinar qué cuentas están afectadas y por qué monto. El embargo de retención suele cubrir hasta el importe de la deuda más costas.\n2. **Proteger la planilla**: este es el problema más urgente, porque el viernes hay obligaciones laborales que no admiten demora. Opciones, en orden de viabilidad: pago con fondos de los socios documentado como préstamo con contrato de fecha cierta; cuentas en una entidad no alcanzada por el embargo, si existe alguna; adelanto de un cliente contra factura.\n3. **Comunicar a la gerencia** el escenario completo, con números, no con apreciaciones.\n\n**Martes: la vía rápida que corresponda**\n\n| Escenario | Acción |\n|---|---|\n| El embargo o la deuda son irregulares | **Queja ante el Tribunal Fiscal**, con la cronología documentada y copia de todo. Se resuelve en 20 días hábiles |\n| La deuda es exigible y no hay defensa | **Solicitud de fraccionamiento**, que es causal de **conclusión** del procedimiento y obliga a levantar las medidas cautelares |\n| Hay capacidad de pago parcial | Evaluar el pago del monto que levanta el embargo frente al fraccionamiento del resto |\n\n**El cálculo del fraccionamiento, para decidir con números:**\n\n| Concepto | Dato |\n|---|---|\n| Deuda | 180,000 |\n| Plazo máximo | hasta 72 meses |\n| Interés | 80% de la TIM sobre el saldo |\n| Cuota aproximada a 48 meses | del orden de 4,300 mensuales, según la TIM vigente |\n\n**Lo que hay que ponerle a la gerencia sobre la mesa:** el fraccionamiento resuelve hoy el problema de caja y desbloquea las cuentas, pero **reconoce la deuda e interrumpe la prescripción**, cerrando la discusión. Si la notificación original fue defectuosa, fraccionar significa renunciar a una defensa que podía eliminar los S/ 180,000 completos. La decisión debe tomarse después de la verificación del lunes, no antes.\n\n**Miércoles en adelante: seguimiento**\n\n1. Si se presentó queja, hacer seguimiento del expediente y comunicar al Ejecutor Coactivo su presentación.\n2. Si se fraccionó, verificar que la resolución se emita y que el Ejecutor **levante efectivamente** las medidas cautelares, lo que no siempre es automático y a veces requiere un escrito de insistencia.\n3. Documentar la cronología completa: en estos casos la prueba de las fechas y las horas es lo que sostiene cualquier reclamo posterior.\n\n**La lección preventiva, y es la más importante:** una resolución de multa que "se perdió" es un control interno roto. Toda notificación de SUNAT debe registrarse el día que llega, con fecha, tipo de acto y plazo de respuesta calculado, en un único registro que la gerencia revisa. La empresa no llegó a esta crisis por la multa: llegó por no haber leído un documento a tiempo.'},
   {l:2,t:'num',p:'Una empresa fracciona S/ 240,000 a 48 meses. Si la TIM anual equivale a 10.8%, el interés del fraccionamiento es el 80% de la TIM. ¿Cuál es la tasa anual del fraccionamiento?',
    u:'%',r:8.64,tol:0.05,
    s:'Tasa del fraccionamiento = 80% de la TIM\n= 10.8% × 80% = **8.64% anual**\n\nComparado con la TIM plena del 10.8% que aplica a la deuda en mora, el fraccionamiento ahorra 2.16 puntos porcentuales anuales. Sobre S/ 240,000 durante cuatro años, el ahorro en intereses es significativo, y a eso se suma el beneficio no financiero más importante: el fraccionamiento **concluye** el procedimiento de cobranza coactiva y obliga a levantar los embargos.\n\nPero el cálculo completo que hay que mostrarle al cliente incluye el costo no financiero: fraccionar reconoce la deuda e interrumpe la prescripción. Si la deuda era discutible o estaba cerca de prescribir, esos 2.16 puntos de ahorro pueden ser el peor negocio de la empresa.\n\nVerifica siempre la TIM vigente que publica SUNAT antes de hacer este cálculo con un cliente.'},
   {l:3,t:'ab',p:'Una empresa exportadora tiene S/ 420,000 de saldo a favor del exportador acumulado y necesita el efectivo. Al mismo tiempo tiene una deuda de IGV de periodos anteriores por S/ 160,000 en cobranza coactiva. Diseña la estrategia integral.',
    s:'**El caso reúne los tres temas del subtema: cobranza, compensación y devolución. El orden de las acciones determina el resultado.**\n\n**Paso 1 — Atender primero la cobranza coactiva, porque es lo urgente**\n\nAntes que nada, verificar la exigibilidad de los S/ 160,000: notificación válida, plazos de reclamación, prescripción. Si hay un defecto, **queja**. Si es exigible, hay que resolverla, porque un embargo bancario paralizaría la operación exportadora y, con ella, la generación del propio saldo a favor.\n\n**Paso 2 — Usar el saldo a favor contra la deuda: la compensación**\n\nAquí está la solución elegante del caso. El saldo a favor del exportador tiene un orden de aplicación legal: primero se aplica contra el **IGV por pagar**, luego contra el **Impuesto a la Renta**, y el remanente puede compensarse contra otras deudas tributarias o solicitarse en devolución.\n\n| Concepto | Importe |\n|---|---|\n| Saldo a favor del exportador | 420,000 |\n| Deuda de IGV en cobranza | (160,000) |\n| **Saldo disponible tras la compensación** | **260,000** |\n\nLa compensación extingue la deuda, y la extinción de la deuda es causal de **conclusión** del procedimiento de cobranza coactiva con levantamiento de las medidas cautelares. Es decir, el mismo acto resuelve el problema de la cobranza y aprovecha el crédito, sin desembolsar efectivo.\n\n**Atención al detalle procedimental:** la compensación contra deuda en cobranza coactiva debe gestionarse formalmente y comunicarse al Ejecutor Coactivo. No basta con solicitarla: hay que acreditar ante el Ejecutor que la deuda se extinguió para que concluya el procedimiento. Un escrito dirigido a él, con copia de la solicitud y su constancia, es indispensable.\n\n**Paso 3 — Solicitar la devolución del remanente, con el expediente completo**\n\nAntes de pedir los S/ 260,000, hay que estar seguro del sustento, porque **toda solicitud de devolución abre una verificación** y SUNAT revisará el crédito fiscal que originó el saldo. La lista de verificación previa:\n\n| Verificar | Por qué |\n|---|---|\n| Comprobantes de las compras que generaron el crédito: válidos, de proveedores habidos, correctamente emitidos | Un proveedor no habido elimina el crédito |\n| Bancarización de todos los pagos sobre el umbral | Sin bancarización no hay crédito ni gasto |\n| Detracciones depositadas oportunamente | El crédito se usa en el periodo del depósito |\n| Registro de Compras anotado dentro del plazo y conciliado con el SIRE | Diferencias generan observaciones inmediatas |\n| Documentación de exportación completa: DAM, conocimiento de embarque, facturas, cobranzas del exterior | Es la base del derecho al saldo |\n| Que el saldo solicitado no exceda el límite del 18% de las exportaciones embarcadas del periodo | Límite legal del SFMB |\n| Vinculación de las compras con la actividad exportadora | Causalidad del crédito |\n\n**Paso 4 — Cuantificar y planificar el flujo**\n\n| Acción | Plazo | Efecto en caja |\n|---|---|---|\n| Compensación contra la deuda en cobranza | semanas | No entra efectivo, pero se extingue una deuda de 160,000 y se levantan embargos |\n| Solicitud de devolución del remanente | 45 días hábiles para resolver | Entrada de hasta 260,000, en notas de crédito negociables o abono |\n| Si no hay pronunciamiento en 45 días hábiles | | Opera la denegatoria ficta y procede reclamar |\n\n**Paso 5 — Lo que NO hay que hacer, y es el error típico**\n\nSolicitar la devolución de los S/ 420,000 completos y dejar la deuda en cobranza. El resultado sería el peor de los mundos: la verificación de la devolución se cruzaría con una cobranza activa, SUNAT podría compensar de oficio en condiciones menos favorables, los embargos seguirían vivos durante meses y el crédito quedaría inmovilizado mientras la empresa pierde acceso a sus cuentas.\n\n**El principio general que hay que extraer:** cuando una empresa tiene crédito a favor y deuda a la vez, **la compensación va primero**. Es más rápida, extingue la deuda, concluye la cobranza y reduce la exposición a verificación. La devolución es para el remanente, y solo con el expediente de sustento completo.'}
  ],
  proy:{
   t:'Protocolo de emergencia y plan de deuda de tu empresa',
   ctx:`Vas a preparar a tu empresa para el peor escenario tributario: una cobranza coactiva con embargo de cuentas. Y vas a construir el plan de deuda que lo evita.`,
   pasos:[
    'Elabora el inventario de la deuda tributaria de tu empresa: concepto, periodo, importe, estado (al día, vencida, en cobranza), exigibilidad y fecha estimada de prescripción.',
    'Clasifica la deuda en fraccionable y no fraccionable, identificando expresamente los tributos retenidos o percibidos, que no admiten fraccionamiento.',
    'Simula un fraccionamiento de la deuda fraccionable: plazo, cuota, interés al 80% de la TIM y garantías si el monto las exige. Verifica que la cuota sea sostenible con el flujo de caja de tu empresa.',
    'Identifica los créditos tributarios a favor de tu empresa: saldo a favor de renta, percepciones o retenciones no aplicadas, saldo a favor del exportador si aplica, pagos en exceso.',
    'Diseña el plan de compensación: qué crédito se aplica contra qué deuda y en qué orden, con el fundamento legal de cada aplicación.',
    'Redacta el protocolo de emergencia ante una REC: las acciones de las primeras veinticuatro horas, con responsable y teléfono de contacto de cada uno.',
    'Elabora el plan de continuidad financiera: cómo pagaría tu empresa la planilla y los proveedores críticos si sus cuentas quedaran embargadas durante dos semanas.'
   ],
   entrega:[
    'El inventario de deuda con exigibilidad y prescripción.',
    'La clasificación entre fraccionable y no fraccionable.',
    'La simulación de fraccionamiento y el plan de compensación.',
    'El protocolo de emergencia ante REC y el plan de continuidad financiera.'
   ],
   crit:[
    'El inventario identifica correctamente qué deuda es exigible coactivamente y qué deuda no lo es.',
    'La simulación del fraccionamiento verifica la sostenibilidad de la cuota contra el flujo de caja real.',
    'El protocolo de emergencia fija acciones para las primeras veinticuatro horas, no para la primera semana.'
   ],
   pista:'El plan de continuidad financiera es el que nadie hace y el que salva empresas. Pregúntate simplemente: si mañana mis cuentas quedan congeladas, ¿con qué pago la planilla del viernes? Si no tienes respuesta, ahí está el trabajo.'
  },
  proyInt:{
   t:'Expediente tributario integral de tu empresa',
   integra:'1.1 a 5.6',
   ctx:`Es el entregable que cierra toda la parte tributaria del curso. Vas a consolidar en un solo expediente todo lo construido desde el primer módulo: el perfil tributario, el cumplimiento, las contingencias, la defensa y la gestión de deuda. Es, literalmente, el documento que un contador entrega a una gerencia o a un nuevo cliente para demostrar que la situación tributaria de la empresa está bajo control.`,
   pasos:[
    'Sección 1 — Perfil tributario: régimen, tributos afectos, obligaciones formales, cronograma anual y datos de referencia vigentes (UIT, IGV, tasas).',
    'Sección 2 — Determinación: la memoria de cálculo de cada tributo de los periodos trabajados, del Módulo 3 y 4, con su trazabilidad hasta los estados financieros del Módulo 2.',
    'Sección 3 — Cumplimiento: la matriz maestra de controles del subtema 5.4, el calendario con responsables y los informes mensuales de cumplimiento.',
    'Sección 4 — Contingencias: el registro único del subtema 5.1, con prescripción, cuantificación y control asignado a cada una.',
    'Sección 5 — Defensa: el expediente permanente del 5.2, el manual de atención de fiscalizaciones del 5.3 y el manual de defensa del 5.5, con sus modelos.',
    'Sección 6 — Deuda y créditos: el inventario de deuda, el plan de compensación y el protocolo de emergencia de este subtema.',
    'Sección 7 — Conclusión profesional: dos páginas de informe dirigido a la gerencia con la situación tributaria de la empresa, los tres riesgos principales cuantificados, las acciones recomendadas con plazo y responsable, y el costo estimado de no hacerlas.',
    'Arma el índice general, numera las secciones, fecha el expediente y establece el control de versiones y la fecha de próxima actualización.'
   ],
   entrega:[
    'El expediente tributario integral con sus siete secciones y su índice general.',
    'El informe de dos páginas a la gerencia, que es la pieza que se presenta primero.',
    'El registro de control de versiones con la fecha de próxima actualización.'
   ],
   crit:[
    'Cada sección se sostiene con los entregables reales que construiste en los módulos anteriores, no con descripciones.',
    'La trazabilidad de la Sección 2 llega sin interrupciones del comprobante a la declaración.',
    'El informe a la gerencia cuantifica en soles cada riesgo y cada recomendación: un informe sin números no mueve decisiones.'
   ],
   pista:'Escribe el informe de dos páginas al final, pero colócalo al inicio del expediente. Es lo único que la gerencia leerá completo, y es también la pieza con la que un contador demuestra su valor en una entrevista o ante un cliente nuevo.'
  },
  fuentes:[
   {a:'TUO del Código Tributario', o:'Artículos 36, 38 a 40, 56 a 58 y 114 a 123', n:'fraccionamiento, devoluciones, compensación, medidas cautelares previas y procedimiento de cobranza coactiva'},
   {a:'Resolución de Superintendencia 161-2015/SUNAT', o:'Reglamento de Aplazamiento y/o Fraccionamiento de la deuda tributaria', n:'requisitos, plazos, interés, garantías y causales de pérdida'},
   {a:'Rosendo Huamaní Cueva', o:'Código Tributario Comentado', n:'procedimiento de cobranza coactiva, medidas cautelares y causales de suspensión y conclusión'},
   {a:'Tribunal Fiscal', o:'Resoluciones en materia de quejas por cobranza coactiva', n:'criterios sobre exigibilidad de la deuda y levantamiento de medidas cautelares'},
   {a:'Walker Villanueva Gutiérrez', o:'Tratado del IGV', n:'saldo a favor del exportador: determinación, límites, compensación y devolución'}
  ]
 }
 ]
}
);
