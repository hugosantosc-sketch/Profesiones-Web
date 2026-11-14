/* Contenido del curso — m4 · Rentas de personas naturales y no domiciliados
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
 id:'m4', nivel:'Intermedio · Avanzado', titulo:'Rentas de personas naturales y no domiciliados',
 resumen:'Las otras cuatro categorías del Impuesto a la Renta: alquileres, capital, honorarios, rentas de trabajo y las retenciones a sujetos del exterior.',
 temas:[
 {
  id:'m4t1', titulo:'Renta de primera categoría: arrendamientos', min:22,
  cont:`El Impuesto a la Renta peruano no es un impuesto único: es un sistema **cedular** para las personas naturales, donde cada tipo de renta tributa con reglas y tasas propias. Humberto Medrano explica que esta estructura, heredada de la tradición latinoamericana, busca gravar de forma distinta las rentas según su origen: las del capital tributan a tasas bajas y planas, las del trabajo a tasas progresivas.

|Categoría|Qué grava|Naturaleza|
|**Primera**|Arrendamiento y subarrendamiento de bienes|Capital|
|**Segunda**|Dividendos, intereses, regalías, ganancias de capital|Capital|
|**Tercera**|Rentas empresariales|Capital + trabajo|
|**Cuarta**|Trabajo independiente|Trabajo|
|**Quinta**|Trabajo dependiente|Trabajo|

Las categorías primera y segunda se consolidan como **rentas de capital**; la cuarta y la quinta, como **rentas de trabajo**, y se suman entre sí en la declaración anual. La tercera va por separado.

# Qué grava la primera categoría
El artículo 23 de la Ley del Impuesto a la Renta comprende:

1. El **arrendamiento o subarrendamiento** de predios, incluidos sus accesorios, y el importe de los tributos que asuma el arrendatario y que correspondan al arrendador.
2. El arrendamiento de **bienes muebles** e inmuebles distintos de predios.
3. El **valor de las mejoras** incorporadas por el arrendatario que no esté obligado a reembolsar, en el ejercicio en que se devuelve el bien.
4. La **cesión gratuita o a precio no determinado** de predios, que genera una renta ficta.

# La tasa efectiva del 5%
$ Renta bruta − 20% de deducción = Renta neta
$ Renta neta × 6.25% = Impuesto
$ Equivale a: Renta bruta × 5% = Impuesto

La deducción del 20% es **fija y sin sustento**: no se prueban gastos, no se descuentan reparaciones ni el impuesto predial. Por eso el cálculo se simplifica al 5% del alquiler bruto, que es como se enseña en la práctica.

Ejemplo: alquiler mensual de S/ 2,000.
$ Renta bruta: 2,000
$ Deducción 20%: (400)
$ Renta neta: 1,600
$ Impuesto: 1,600 × 6.25% = 100  →  equivalente a 2,000 × 5% = 100

# Las rentas presunta y ficta: el piso que nadie puede bajar
La ley desconfía de los alquileres declarados por debajo del mercado entre familiares o conocidos, así que fija mínimos.

|Situación|Renta mínima|
|Arrendamiento de **predios**|6% del valor del autovalúo del predio (valor declarado para el impuesto predial), al año|
|Arrendamiento de **bienes muebles**|8% del valor de adquisición, producción o construcción, actualizado|
|**Cesión gratuita** de predios o a precio no determinado|Renta ficta del 6% del autovalúo anual|

! La **cesión gratuita** sorprende a mucha gente: prestar un departamento a un familiar sin cobrar nada genera impuesto, calculado sobre el 6% del autovalúo. La norma admite prueba en contrario en los casos que establece, y no aplica cuando el cedente es parte de ciertas relaciones que la propia ley exceptúa, por lo que conviene revisar la situación concreta. Pero la regla general es que ceder gratis no libera del impuesto, porque de lo contrario bastaría con declarar que no se cobra.

La presunción no opera cuando el predio está destinado a los usos que la ley exceptúa, como ser habitado por el propio propietario o estar desocupado, situación esta última que debe acreditarse.

# Pago mensual y declaración anual
El impuesto de primera categoría se paga **mensualmente**, con carácter de pago a cuenta, mediante el **Formulario Virtual 1683**, dentro del cronograma de vencimientos según el último dígito del RUC o del DNI. El arrendador entrega al arrendatario el comprobante de pago del impuesto, que para el inquilino es el sustento del gasto cuando corresponde.

Al cierre del ejercicio, las rentas de primera y segunda categoría se consolidan como **rentas de capital** en la declaración anual, donde se determina el impuesto definitivo y se aplican los pagos mensuales como crédito.

$ Renta neta de capital = Rentas de primera + Rentas de segunda (netas)
$ Impuesto anual = Renta neta de capital × 6.25%
$ Saldo = Impuesto anual − Pagos mensuales efectuados

# Cuando el arrendador es una empresa
Si quien alquila es una persona jurídica, el ingreso **no es renta de primera categoría**: es renta de tercera, porque las personas jurídicas solo generan rentas empresariales. El alquiler se factura con IGV y se registra en la cuenta 75 Otros ingresos de gestión. Esta distinción es la primera que hay que hacer: la categoría depende de **quién** percibe la renta, no del tipo de bien.

|Arrendador|Categoría|IGV|Comprobante|
|Persona natural sin negocio|Primera|No afecto|Formulario 1683 (el recibo del pago del impuesto)|
|Persona natural con negocio, si el bien está en su activo|Tercera|Sí|Factura o boleta|
|Persona jurídica|Tercera|Sí|Factura|

# El lado del inquilino: cuándo es gasto deducible
Para una empresa que alquila un local a una persona natural, el gasto es deducible si cumple causalidad y si cuenta con el sustento: el **contrato** y el comprobante de pago del impuesto de primera categoría que entrega el arrendador. Sin ese sustento, el gasto queda expuesto. Y si el arrendador es una parte vinculada —por ejemplo, el accionista—, el alquiler debe estar a valor de mercado, como vimos en el módulo anterior.

@ Registro mensual del alquiler pagado a una persona natural, S/ 2,000
@ 63|6352 Alquiler de edificaciones|2,000.00|
@ 46|4699 Otras cuentas por pagar diversas||2,000.00

@ Pago del alquiler
@ 46|4699 Otras cuentas por pagar diversas|2,000.00|
@ 10|1041 Cuentas corrientes operativas||2,000.00

Fíjate en que no hay IGV ni cuenta 42: la operación con una persona natural que genera renta de primera categoría está inafecta al IGV y no se sustenta con factura.

# El subarrendamiento
Si el inquilino subarrienda, su renta de primera categoría es la **diferencia** entre lo que cobra y lo que paga:

$ Renta bruta del subarrendador = Alquiler cobrado al subarrendatario − Alquiler pagado al propietario

Ejemplo: alquila en S/ 2,000 y subarrienda en S/ 3,000. Su renta bruta es S/ 1,000, su renta neta S/ 800 y su impuesto S/ 50 al mes.`,
  claves:['El Impuesto a la Renta de personas naturales es cedular: cada categoría tiene reglas y tasas propias.','Primera categoría: deducción fija del 20% y tasa de 6.25% sobre la renta neta, equivalente al 5% del alquiler bruto.','Existen mínimos: 6% del autovalúo para predios y 8% del valor de adquisición para muebles.','La cesión gratuita de predios genera renta ficta del 6% del autovalúo: prestar sin cobrar no libera del impuesto.','Si el arrendador es persona jurídica, el ingreso es de tercera categoría, se factura y lleva IGV.'],
  preg:[
   {p:'¿Por qué la deducción del 20% en primera categoría es fija y no se prueban gastos reales?',
    r:'Por simplificación administrativa. Las rentas de capital de personas naturales son numerosas y de importes pequeños, y verificar los gastos reales de cada arrendador —reparaciones, predial, arbitrios, mantenimiento— sería desproporcionadamente costoso para la administración y para el contribuyente. La ley presume que ese 20% representa razonablemente los gastos asociados, y a cambio nadie puede deducir más ni tiene que sustentar nada. Es un intercambio de precisión por simplicidad, típico de los sistemas cedulares.'},
   {p:'Un propietario presta su departamento a su sobrino sin cobrarle. ¿Tiene que pagar impuesto?',
    r:'En principio sí, por la renta ficta del 6% del autovalúo que establece la ley para la cesión gratuita o a precio no determinado de predios. La lógica es evitar que baste declarar "no cobro nada" para escapar del impuesto, lo que vaciaría la categoría. La norma contempla supuestos de excepción y admite prueba en contrario en los casos que señala, de modo que la situación concreta debe revisarse: no es lo mismo una cesión a un tercero que la ocupación por el propio propietario o un predio acreditadamente desocupado. Lo que no funciona es simplemente no declarar.'},
   {p:'Una empresa alquila un local. ¿Cambia algo si el propietario es una persona natural o una S.A.C.?',
    r:'Cambia casi todo en el papeleo. Con persona natural: la renta es de primera categoría, la operación está inafecta al IGV, no hay factura y el sustento del gasto es el contrato más el comprobante del pago del impuesto que hace el arrendador. Con una S.A.C.: la renta es de tercera categoría, la operación está gravada con IGV, hay factura y la empresa inquilina obtiene crédito fiscal por ese IGV. Para el inquilino, alquilar a una persona jurídica le da un 18% de crédito fiscal que con una persona natural no existe, lo que es un factor económico real al comparar dos locales.'},
   {p:'¿Por qué existe la renta mínima presunta del 6% del autovalúo si ya se declara el alquiler real?',
    r:'Para poner un piso cuando el alquiler declarado es irrealmente bajo. Entre familiares o conocidos es fácil pactar un alquiler simbólico que reduzca el impuesto, y verificar el valor de mercado de cada predio del país sería inviable. El autovalúo, que ya existe para el impuesto predial, funciona como referencia objetiva y disponible. Si el alquiler real supera ese mínimo, se tributa sobre el real; si es menor, se tributa sobre el mínimo. Es una presunción que protege la recaudación sin obligar a tasar cada inmueble.'},
   {p:'En un subarriendo, ¿por qué la renta bruta es la diferencia y no el total cobrado?',
    r:'Porque el subarrendador no es dueño del bien: su ganancia económica real es el margen entre lo que cobra y lo que paga al propietario. Gravarlo sobre el total implicaría gravar dos veces el mismo alquiler, una en cabeza del propietario y otra en la del subarrendador, sobre un ingreso que este último ni siquiera retiene. Sobre esa diferencia se aplican luego la deducción del 20% y la tasa, igual que en cualquier renta de primera categoría.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una persona natural alquila un departamento en S/ 2,400 mensuales. ¿Cuánto paga de impuesto de primera categoría al mes?',
    u:'S/',r:120,tol:1,
    s:'Renta bruta: S/ 2,400\nDeducción 20%: (S/ 480)\nRenta neta: S/ 1,920\nImpuesto = 1,920 × 6.25% = **S/ 120**\n\nAtajo: 2,400 × 5% = S/ 120. El pago se hace mensualmente con el Formulario Virtual 1683, según el cronograma por último dígito del documento de identidad o RUC, y tiene carácter de pago a cuenta del impuesto anual de rentas de capital.'},
   {l:1,t:'mc',p:'Una S.A.C. alquila una oficina de su propiedad a otra empresa. ¿Qué categoría de renta genera?',
    o:['Primera categoría, porque es un arrendamiento','Tercera categoría, porque las personas jurídicas solo generan rentas empresariales','Segunda categoría','Está inafecta'],r:1,
    s:'Tercera categoría. Las personas jurídicas solo generan rentas empresariales, cualquiera sea la fuente. La operación se factura con IGV, el ingreso se registra en la cuenta 75 Otros ingresos de gestión (o en la 70 si el arrendamiento es su giro) y forma parte de la renta neta anual sujeta al 29.5% o a la escala del RMT. La categoría depende de quién percibe la renta, no del tipo de bien.'},
   {l:2,t:'num',p:'Un propietario alquila un predio en S/ 900 mensuales. El autovalúo del predio es S/ 240,000. ¿Cuánto es su renta anual para efectos del impuesto?',
    u:'S/',r:14400,tol:10,
    s:'Alquiler anual declarado = 900 × 12 = S/ 10,800\nRenta mínima presunta = 6% del autovalúo = 240,000 × 6% = **S/ 14,400**\n\nComo la renta mínima presunta (S/ 14,400) supera al alquiler real (S/ 10,800), la base es **S/ 14,400**.\n\nImpuesto anual = 14,400 × 5% = S/ 720, frente a los S/ 540 que habría pagado sobre el alquiler real. La diferencia de S/ 180 se regulariza en la declaración anual de rentas de capital, porque los pagos mensuales se hicieron sobre el alquiler efectivamente percibido.'},
   {l:2,t:'ab',p:'Una persona alquila un local en S/ 1,500 mensuales y lo subarrienda en S/ 2,600. Calcula el impuesto de cada uno de los dos contribuyentes involucrados y explica por qué no se duplica el impuesto.',
    s:'**El propietario** percibe S/ 1,500 mensuales.\nRenta bruta anual: 1,500 × 12 = S/ 18,000\nImpuesto = 18,000 × 5% = **S/ 900 al año** (S/ 75 mensuales)\n\n**El subarrendador** percibe S/ 2,600 y paga S/ 1,500.\nRenta bruta = 2,600 − 1,500 = S/ 1,100 mensuales = S/ 13,200 al año\nDeducción 20% = (S/ 2,640) → renta neta S/ 10,560\nImpuesto = 10,560 × 6.25% = **S/ 660 al año** (S/ 55 mensuales)\n\n**Por qué no se duplica:** cada uno tributa sobre el beneficio económico que efectivamente obtiene. El propietario gana S/ 1,500; el subarrendador gana el margen de S/ 1,100, no los S/ 2,600 que cobra, porque S/ 1,500 los entrega al propietario. Si se gravara al subarrendador sobre el total, el mismo alquiler de S/ 1,500 pagaría impuesto dos veces, en manos de dos personas distintas.\n\n**Comprobación del total recaudado:** 900 + 660 = S/ 1,560 al año, sobre un flujo total de S/ 31,200 que paga el ocupante final. La carga efectiva es 5% del valor económico generado en cada eslabón, que es exactamente la lógica del impuesto cedular.\n\n**Un detalle práctico:** el subarrendador debe tener el consentimiento del propietario según el contrato, y para sustentar su deducción debe conservar los comprobantes de pago del impuesto del propietario. Sin ellos, SUNAT podría exigirle tributar sobre el total cobrado.'},
   {l:3,t:'ab',p:'Un contribuyente tiene tres predios: uno que habita (autovalúo S/ 300,000), uno alquilado en S/ 1,800 mensuales (autovalúo S/ 400,000) y uno cedido gratuitamente a su hermano (autovalúo S/ 250,000). Determina sus rentas de primera categoría del año y explica cada caso.',
    s:'**Predio 1 — Casa habitada por el propio propietario.**\nNo genera renta de primera categoría: no hay arrendamiento ni cesión a terceros. La presunción no opera sobre el predio que ocupa el propio contribuyente.\n**Renta: S/ 0**\n\n**Predio 2 — Alquilado en S/ 1,800 mensuales.**\nAlquiler anual = 1,800 × 12 = S/ 21,600\nRenta mínima presunta = 400,000 × 6% = S/ 24,000\nComo la presunta es mayor, la base anual es **S/ 24,000**.\nPagos mensuales efectuados: 1,800 × 5% = S/ 90 al mes = S/ 1,080 al año.\nImpuesto anual sobre la base presunta: 24,000 × 5% = S/ 1,200.\n**Diferencia a regularizar en la declaración anual: S/ 120.**\n\n**Predio 3 — Cedido gratuitamente al hermano.**\nGenera **renta ficta** del 6% del autovalúo: 250,000 × 6% = **S/ 15,000 anuales**.\nImpuesto = 15,000 × 5% = **S/ 750**.\nLa renta ficta no se paga mensualmente, porque no hay percepción: se declara y paga en la **declaración jurada anual**.\n\n**Resumen anual**\n\n| Predio | Renta computable | Impuesto |\n|---|---|---|\n| Habitado por el propietario | 0 | 0 |\n| Alquilado (mayor entre real y presunta) | 24,000 | 1,200 |\n| Cedido gratuitamente (renta ficta) | 15,000 | 750 |\n| **Total rentas de primera categoría** | **39,000** | **1,950** |\n| (−) Pagos mensuales efectuados | | (1,080) |\n| **Saldo por regularizar** | | **870** |\n\n**Las dos lecciones del caso:**\n\n1. **Ceder gratis no es gratis.** El predio prestado al hermano genera S/ 750 de impuesto anual sin que entre un sol a la casa. Mucha gente lo descubre recién cuando recibe una esquela de SUNAT, que cruza la información del impuesto predial con las declaraciones.\n2. **El autovalúo manda cuando el alquiler es bajo.** En el predio alquilado, el contribuyente pagó durante el año sobre lo que cobró, pero debe regularizar sobre la presunta. Conviene revisar el autovalúo antes de fijar un alquiler: si el autovalúo es alto respecto del mercado, el impuesto efectivo supera el 5% del alquiler real.'}
  ],
  proy:{
   t:'Los alquileres de tu empresa, por los dos lados',
   ctx:`Casi toda empresa alquila algo: un local, un almacén, un vehículo, un equipo. Vas a analizar los arrendamientos de tu empresa desde los dos lados del contrato, porque un contador necesita entender también la posición del arrendador para aconsejar bien.`,
   pasos:[
    'Identifica los arrendamientos que tiene tu empresa. Si no tiene ninguno, inventa uno realista: el local donde opera, alquilado a una persona natural.',
    'Para cada uno, determina: quién es el arrendador (persona natural o jurídica), qué categoría de renta genera, si hay IGV, qué comprobante corresponde y qué necesita tu empresa para sustentar el gasto.',
    'Calcula el impuesto de primera categoría que paga el arrendador persona natural, mensual y anual.',
    'Averigua o estima el autovalúo del predio y verifica si la renta mínima presunta del 6% supera el alquiler pactado. Si lo supera, calcula la diferencia que el arrendador tendría que regularizar.',
    'Registra los asientos del arrendamiento en tu empresa: devengo, pago y destino por función.',
    'Redacta una cláusula para el contrato de arrendamiento de tu empresa que asegure el sustento tributario: entrega del comprobante de pago del impuesto, plazo y consecuencia de no entregarlo.'
   ],
   entrega:[
    'El análisis de cada arrendamiento por los dos lados.',
    'El cálculo del impuesto del arrendador y la comparación con la renta presunta.',
    'Los asientos contables del arrendamiento.',
    'La cláusula contractual redactada.'
   ],
   crit:[
    'La categoría de renta está determinada por quién percibe, no por el tipo de bien.',
    'El asiento del alquiler a persona natural no incluye IGV ni usa la cuenta 42.',
    'La cláusula del contrato tiene una consecuencia concreta si el arrendador no entrega el comprobante.'
   ],
   pista:'La cláusula que mejor funciona condiciona el pago del siguiente mes a la entrega del comprobante del impuesto del mes anterior. Es la única forma práctica de que el arrendador cumpla sin que haya que perseguirlo.'
  },
  proyInt:{
   t:'Las rentas que tu empresa paga a terceros',
   integra:'1.1 a 4.1',
   ctx:`Tu empresa no solo genera renta de tercera categoría: también es la fuente de rentas de otras categorías para quienes le prestan servicios o le alquilan bienes. Este proyecto mapea esas relaciones, que es la base de las obligaciones de retención que verás en los subtemas siguientes.`,
   pasos:[
    'Lista a todos los terceros a quienes tu empresa paga: proveedores de bienes, prestadores de servicios, arrendadores, trabajadores, socios.',
    'Para cada uno, determina qué categoría de renta percibe por ese pago y qué obligación tiene tu empresa: emitir comprobante propio, exigir comprobante ajeno, retener, o ninguna.',
    'Cruza esta lista con tu Libro Diario de los Módulos 1 y 2: ¿están todos los pagos correctamente registrados según la naturaleza del perceptor?',
    'Identifica los pagos que podrían estar mal clasificados: un servicio pagado a una persona natural registrado como si fuera una compra con factura, o un alquiler registrado con IGV cuando no correspondía.',
    'Corrige los asientos que encuentres mal, con su extorno o reclasificación según corresponda (técnica del subtema 2.1).',
    'Arma el cuadro resumen de obligaciones de tu empresa frente a terceros, que ampliarás en los subtemas siguientes con las retenciones de cuarta y quinta.'
   ],
   entrega:[
    'El mapa de terceros con la categoría de renta de cada uno.',
    'El cruce con el Libro Diario y los errores encontrados.',
    'Los asientos de corrección.',
    'El cuadro de obligaciones frente a terceros.'
   ],
   crit:[
    'Cada tercero tiene identificada su categoría de renta con fundamento, no por intuición.',
    'Los errores de clasificación encontrados están corregidos con la técnica correcta.',
    'El cuadro de obligaciones distingue entre exigir comprobante y retener.'
   ],
   pista:'El error más frecuente en MYPES es pagar a una persona natural por un servicio y registrarlo sin comprobante o con un comprobante que no corresponde. Revisa especialmente los pagos a personas, no a empresas.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 22, 23 y 84', n:'categorías de renta, supuestos de primera categoría, rentas presunta y ficta, y pago mensual'},
   {a:'Humberto Medrano Cornejo', o:'Derecho Tributario: Impuesto a la Renta, aspectos significativos', n:'estructura cedular del impuesto peruano y su fundamento'},
   {a:'Juan Roque García Mullín', o:'Manual del Impuesto a la Renta', n:'tratamiento de las rentas de capital y las presunciones en los sistemas cedulares'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'sustento del gasto por alquileres pagados a personas naturales'},
   {a:'SUNAT', o:'Formulario Virtual 1683 y cronogramas de vencimiento', n:'mecánica del pago mensual del impuesto de primera categoría'}
  ]
 },
 {
  id:'m4t2', titulo:'Renta de segunda categoría: dividendos, intereses y ganancias de capital', min:24,
  cont:`La segunda categoría grava las rentas del **capital mobiliario**: lo que produce el dinero y los derechos, no el trabajo ni los inmuebles arrendados. El artículo 24 de la ley enumera los supuestos, y los más importantes en la práctica son cuatro: dividendos, intereses, regalías y ganancias de capital.

# Los supuestos principales
|Supuesto|Ejemplo|
|**Dividendos** y cualquier forma de distribución de utilidades|La S.A.C. reparte utilidades a sus socios personas naturales|
|**Intereses** por colocación de capitales|Un préstamo de una persona natural a una empresa|
|**Regalías**|Pago por el uso de una marca, patente o derecho de autor|
|**Ganancias de capital**|Venta de un inmueble que no es casa habitación; venta de acciones|
|Rentas vitalicias y cesión definitiva de derechos|Venta de una patente|

# La regla general: 6.25% sobre renta neta, 5% efectivo
$ Renta bruta − 20% de deducción = Renta neta
$ Renta neta × 6.25% = Impuesto
$ Equivale a: Renta bruta × 5%

Igual que en primera categoría, la deducción del 20% es fija y sin sustento. Pero hay dos excepciones importantes que conviene fijar desde ahora:

|Supuesto|Tratamiento|
|**Dividendos**|Tasa de **5% sobre el monto distribuido**, sin deducción del 20%. Es un impuesto de realización inmediata, con retención en la fuente|
|**Enajenación de valores mobiliarios**|No se aplica la deducción del 20% sobre el precio: se deduce el **costo computable** y luego la tasa sobre la ganancia|

# Dividendos: la segunda capa del impuesto
Cuando una empresa reparte utilidades a una persona natural domiciliada, retiene el **5%** del monto distribuido y lo paga al fisco. Esa retención es definitiva: el socio no declara nada más por ese concepto.

$ Utilidad de la empresa 100 → Impuesto a la Renta de tercera 29.5% → quedan 70.5
$ Dividendo distribuido 70.5 → retención de 5% = 3.53
$ Carga total sobre la utilidad original: 29.5 + 3.53 = 33.03%

Esa es la **carga combinada** que soporta una utilidad empresarial que llega al bolsillo del socio. Entenderla es clave para asesorar: retirar dinero como dividendo cuesta 33% en total; retirarlo como sueldo cuesta la escala progresiva de quinta categoría más los aportes, pero el sueldo es gasto deducible para la empresa. El cálculo comparativo es una de las consultas más frecuentes de un dueño de MYPE.

! Los dividendos distribuidos a **personas jurídicas domiciliadas no están gravados**, porque la utilidad ya tributó en la empresa que la generó y volverá a tributar cuando llegue finalmente a una persona natural. Gravar cada paso intermedio produciría una cascada. Por eso, en un grupo empresarial, las utilidades pueden subir de la subsidiaria a la matriz sin costo tributario adicional.

# El dividendo presunto
La ley no se conforma con el reparto formal. El artículo 24-A considera dividendo, entre otros supuestos, a **todo crédito hasta el límite de las utilidades y reservas de libre disposición** que las empresas otorguen a sus socios, así como a los gastos cuya documentación no acredite su destino o que constituyan **disposición indirecta de renta no susceptible de posterior control tributario**.

Esa última figura tiene una tasa propia y elevada, y alcanza casos muy comunes en MYPES: gastos personales del socio pagados por la empresa, préstamos al accionista que nunca se devuelven, retiros sin sustento. Es, con diferencia, la contingencia tributaria más cara que puede acumular una empresa familiar.

# Ganancia de capital por venta de inmuebles
$ Ganancia de capital = Valor de venta − Costo computable actualizado
$ Impuesto = Ganancia × 5% (equivalente de aplicar 6.25% sobre el 80%)

El **costo computable** se actualiza con el índice de corrección monetaria que publica el Ministerio de Economía y Finanzas, lo que evita gravar la inflación.

**La exoneración de casa habitación:** no está gravada la ganancia por la venta del inmueble que constituya **casa habitación** del enajenante, entendida como el inmueble que permanece en su propiedad por lo menos **dos años** y que no está destinado al comercio, industria u otra actividad similar. Si la persona tiene varios inmuebles, la regla se aplica según los criterios que fija el reglamento.

Tampoco están gravadas con la regla general las ventas de inmuebles adquiridos antes del 1 de enero de 2004, por la regla de vigencia de la norma que incorporó este supuesto.

# Ganancia de capital por venta de acciones
Aquí el cálculo es anual, no por operación:

$ Renta bruta = Σ (Valor de venta − Costo computable) de las enajenaciones del año
$ Renta neta = Renta bruta − 20% de deducción
$ Impuesto = Renta neta × 6.25%

Las ganancias por acciones negociadas en la Bolsa de Valores de Lima tienen reglas particulares, incluidas exoneraciones aplicables a determinados valores con presencia bursátil cuando se cumplen los requisitos de la norma vigente, y en muchos casos la retención la efectúa la institución de compensación y liquidación de valores. Es un terreno donde cada año cambian detalles, así que la norma vigente se consulta antes de calcular.

# Cómo se paga
|Supuesto|Mecanismo|
|Dividendos|Retención del 5% por la empresa que distribuye, con carácter definitivo|
|Intereses pagados por una empresa a una persona natural|Retención del 5% por la empresa pagadora|
|Venta de inmuebles|Pago directo del enajenante con el **Formulario Virtual 1665**, antes de la fecha límite del mes siguiente|
|Venta de valores|Determinación anual en la declaración jurada, con retenciones según el caso|

@ Acuerdo de distribución de dividendos por S/ 100,000 a socios personas naturales
@ 59|5911 Utilidades acumuladas|100,000.00|
@ 44|4412 Accionistas - Dividendos por pagar||95,000.00
@ 40|40185 Impuesto a los dividendos||5,000.00

@ Pago del dividendo y de la retención
@ 44|4412 Accionistas - Dividendos por pagar|95,000.00|
@ 40|40185 Impuesto a los dividendos|5,000.00|
@ 10|1041 Cuentas corrientes operativas||100,000.00

# El notario como agente de control
En la venta de inmuebles, el notario **no eleva a escritura pública** la transferencia si no se le acredita el pago del impuesto o que la operación está exceptuada. Es un control eficaz: convierte al notario en filtro y hace que la evasión en este supuesto sea mucho menor que en otros.`,
  claves:['La segunda categoría grava las rentas del capital mobiliario, con tasa efectiva del 5% en la regla general.','Los dividendos tributan 5% sobre el monto distribuido, sin deducción del 20%, con retención definitiva.','La carga combinada sobre una utilidad empresarial que llega al socio es cercana al 33%.','Los dividendos entre personas jurídicas domiciliadas no están gravados, para evitar la cascada.','La venta de la casa habitación, con dos años de propiedad y sin uso comercial, no está gravada.'],
  preg:[
   {p:'¿Por qué los dividendos no tienen la deducción del 20% que sí tienen los demás supuestos de segunda categoría?',
    r:'Porque esa deducción presume gastos asociados a la obtención de la renta, y percibir un dividendo no genera gastos: el esfuerzo y los costos ya los asumió la empresa, que además ya dedujo sus propios gastos al determinar la utilidad. Gravar solo el 80% del dividendo sería conceder una segunda deducción sobre una renta que ya viene neta. Por eso el dividendo tiene tasa propia del 5% aplicada directamente sobre el monto distribuido.'},
   {p:'Un socio quiere sacar S/ 100,000 de su empresa. ¿Le conviene como dividendo o como sueldo?',
    r:'Depende de dos efectos opuestos. Como **dividendo**: la empresa ya pagó 29.5% sobre la utilidad y el socio sufre 5% adicional, con carga combinada cercana al 33%, pero el dividendo no es gasto deducible. Como **sueldo**: es gasto deducible para la empresa, lo que ahorra 29.5% de impuesto empresarial, pero el socio tributa con la escala progresiva de quinta categoría (que puede llegar al 30% en tramos altos) y se generan aportes a EsSalud del 9% a cargo de la empresa y descuentos pensionarios al socio. Además, la remuneración debe estar a **valor de mercado**: el exceso no es deducible y se trata como dividendo. En general, un sueldo razonable y a valor de mercado suele ser más eficiente que el dividendo puro, pero el cálculo hay que hacerlo con las cifras concretas.'},
   {p:'¿Qué es el dividendo presunto y por qué es la contingencia más cara de una empresa familiar?',
    r:'Es la figura por la cual la ley considera dividendo ciertos actos que no son un reparto formal: créditos a los socios hasta el límite de las utilidades y reservas de libre disposición, y los gastos cuya documentación no acredita su destino o que constituyen disposición indirecta de renta no susceptible de posterior control tributario. Es caro porque, además de que el gasto no es deducible —con lo que la empresa paga 29.5% sobre él—, se aplica la tasa específica del dividendo presunto sobre el monto, que es considerablemente más alta que el 5% del reparto formal. En una empresa familiar donde el dueño paga gastos personales con la cuenta de la empresa, la suma de varios años puede superar el patrimonio.'},
   {p:'¿Por qué el notario tiene un papel en la venta de inmuebles de personas naturales?',
    r:'Porque la ley lo convierte en agente de control: no puede elevar a escritura pública la transferencia si no se le acredita el pago del impuesto de segunda categoría o que la operación está exceptuada, por ejemplo por tratarse de casa habitación. Es un diseño administrativo muy eficaz: en lugar de fiscalizar a millones de personas, se interpone un filtro en el único punto por donde toda transferencia inmobiliaria debe pasar. Por eso el cumplimiento en este supuesto es alto comparado con otras rentas de capital.'},
   {p:'Si una persona vende su único departamento, donde vivió cinco años, ¿paga impuesto?',
    r:'No, por la exoneración de casa habitación: el inmueble permaneció en su propiedad más de dos años y no estuvo destinado al comercio, industria ni actividad similar. La condición se acredita ante el notario al momento de la transferencia. Si en cambio tuviera varios inmuebles, habría que aplicar los criterios del reglamento para determinar cuál califica como casa habitación, y la venta de los demás sí estaría gravada sobre la ganancia de capital. Tampoco aplicaría si el inmueble hubiera estado alquilado como local comercial o formara parte de una actividad empresarial.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una S.A.C. distribuye S/ 80,000 de dividendos a un socio persona natural domiciliada. ¿Cuánto retiene?',
    u:'S/',r:4000,tol:1,
    s:'Retención = 80,000 × 5% = **S/ 4,000**\n\nEl socio recibe S/ 76,000 netos y no declara nada más: la retención es definitiva. La empresa debe declarar y pagar esa retención en el periodo correspondiente. Fíjate en que no hay deducción del 20%: en dividendos la tasa del 5% se aplica directamente sobre el monto distribuido.'},
   {l:1,t:'mc',p:'Una S.A.C. distribuye utilidades a otra S.A.C. accionista, ambas domiciliadas. ¿Hay retención?',
    o:['Sí, 5% como a cualquier accionista','No: los dividendos entre personas jurídicas domiciliadas no están gravados','Sí, 29.5%','Solo si supera 7 UIT'],r:1,
    s:'No hay retención. Los dividendos percibidos por personas jurídicas domiciliadas no están gravados, porque la utilidad ya tributó en la empresa que la generó y tributará nuevamente cuando llegue a una persona natural. Gravar cada eslabón intermedio produciría una cascada que castigaría a los grupos empresariales por su estructura. El impuesto del 5% se aplica cuando el dividendo llega finalmente a una persona natural o a un no domiciliado.'},
   {l:2,t:'num',p:'Una persona vende un terreno en S/ 300,000. Lo compró en 2015 por S/ 180,000 y el costo computable actualizado es S/ 210,000. ¿Cuánto paga de impuesto?',
    u:'S/',r:4500,tol:50,
    s:'Ganancia de capital = Valor de venta − Costo computable actualizado\n= 300,000 − 210,000 = **S/ 90,000**\n\nImpuesto = 90,000 × 5% = **S/ 4,500**\n(Equivale a aplicar 6.25% sobre el 80% de la ganancia: 90,000 × 80% × 6.25% = 4,500.)\n\nSe paga con el Formulario Virtual 1665 antes de la fecha límite del mes siguiente a la percepción, y el notario exigirá la constancia para elevar a escritura pública. Un terreno nunca califica como casa habitación, así que la exoneración no aplica. La actualización del costo con el índice de corrección monetaria evitó gravar S/ 30,000 que eran solo inflación.'},
   {l:2,t:'ab',p:'El dueño de una S.A.C. retira S/ 5,000 mensuales de la caja de la empresa "a cuenta de utilidades", sin acuerdo de junta ni asiento de dividendos, durante todo el año. Analiza el tratamiento y el riesgo.',
    s:'**Lo que la empresa cree que hace:** adelantar utilidades a su único socio, S/ 60,000 al año.\n\n**Lo que ocurre si no hay respaldo formal:**\n\n1. **Contablemente**, si no hay acuerdo de junta que distribuya utilidades, esos retiros no son dividendos: son cuentas por cobrar al accionista (cuenta 14) o, si nunca se devolverán, una reducción del patrimonio sin formalidad.\n\n2. **Tributariamente**, el artículo 24-A considera dividendo a todo crédito otorgado al socio hasta el límite de las utilidades y reservas de libre disposición. Es decir, SUNAT puede tratar esos S/ 60,000 como dividendos, con las consecuencias que siguen.\n\n3. **Si además los retiros no tienen sustento alguno** y se usaron para gastos personales, pueden calificar como **disposición indirecta de renta no susceptible de posterior control tributario**, con una tasa específica mucho más alta que el 5% del dividendo formal, y el gasto correspondiente es no deducible.\n\n**Cuantificación aproximada del riesgo, en el peor escenario:**\n\n| Concepto | Importe |\n|---|---|\n| Retiros del año | 60,000 |\n| Impuesto a la Renta por gasto no deducible (29.5%) | 17,700 |\n| Impuesto por distribución indirecta (tasa específica, muy superior al 5%) | varias decenas de miles |\n| Multas por tributo omitido e intereses | adicional |\n\nY como el hábito se repite todos los años, en una fiscalización de los ejercicios no prescritos la contingencia se multiplica.\n\n**Cómo se ordena, desde hoy:**\n\n1. **Formalizar el reparto**: acta de junta que acuerde la distribución, con la reserva legal detraída previamente, asiento de dividendos y retención del 5%.\n2. **Si los retiros exceden las utilidades disponibles**, documentarlos como **préstamo al accionista** con contrato, cronograma, interés no menor al que exige la norma para vinculadas, y devolución efectiva. Un préstamo que nunca se devuelve termina siendo dividendo de todos modos.\n3. **Separar de raíz los gastos personales**: la tarjeta de la empresa no paga el colegio de los hijos. Es el postulado de entidad del Módulo 1, con consecuencias tributarias concretas.\n4. **Asignar un sueldo de mercado al socio que trabaja en la empresa**: es deducible, es formal y cubre la necesidad de liquidez mensual sin recurrir a retiros.\n\n**La conversación con el dueño** suele ser esta: "Sacar dinero de tu empresa no está prohibido; sacarlo sin papeles cuesta tres o cuatro veces más que sacarlo bien".'},
   {l:3,t:'ab',p:'Una persona natural tuvo en 2026: dividendos de una S.A.C. peruana por S/ 60,000; intereses de un préstamo que hizo a una empresa por S/ 20,000; venta de un departamento alquilado (valor de venta S/ 450,000, costo computable actualizado S/ 320,000); y venta de su casa habitación, donde vivió seis años, con ganancia de S/ 80,000. Determina su situación tributaria completa.',
    s:'**1. Dividendos: S/ 60,000**\nTasa del 5% sobre el monto distribuido, sin deducción del 20%.\nImpuesto = 60,000 × 5% = **S/ 3,000**, retenido por la empresa con carácter **definitivo**. No se declara nada adicional por este concepto.\n\n**2. Intereses: S/ 20,000**\nRenta de segunda categoría por colocación de capitales. Regla general:\nRenta bruta 20,000 − 20% = renta neta S/ 16,000\nImpuesto = 16,000 × 6.25% = **S/ 1,000** (equivalente al 5% del bruto).\nLa empresa pagadora actúa como agente de retención.\n\n**3. Venta del departamento alquilado**\nNo califica como casa habitación: estuvo destinado a generar rentas de primera categoría.\nGanancia = 450,000 − 320,000 = **S/ 130,000**\nImpuesto = 130,000 × 5% = **S/ 6,500**\nSe paga con el Formulario Virtual 1665 antes de la fecha límite del mes siguiente a la percepción, y el notario exige la constancia para la escritura pública.\n\n**4. Venta de la casa habitación**\n**No gravada.** Permaneció en su propiedad más de dos años y no estuvo destinada al comercio, industria ni actividad similar. La ganancia de S/ 80,000 no paga impuesto. La condición se acredita ante el notario.\n\n**Resumen del año**\n\n| Concepto | Base | Impuesto | Forma de pago |\n|---|---|---|---|\n| Dividendos | 60,000 | 3,000 | Retención definitiva |\n| Intereses | 16,000 neto | 1,000 | Retención |\n| Venta de departamento | 130,000 | 6,500 | Pago directo, Form. 1665 |\n| Venta de casa habitación | 80,000 | 0 | No gravada |\n| **Total pagado** | | **10,500** | |\n\n**Observaciones que un asesor debe hacer:**\n\n1. **Los dividendos no se suman** a las demás rentas de capital en la declaración anual: su retención es definitiva y con tasa propia. Es un error frecuente incluirlos en la renta neta de capital.\n2. **La diferencia entre los dos inmuebles vale S/ 4,000 de impuesto** (el departamento alquilado tributa, la casa habitación no), y depende exclusivamente del uso que se le dio. Quien planea vender dos inmuebles debería conocer esta regla antes, no después.\n3. **El costo computable actualizado es decisivo**: si no se hubiera actualizado el costo con el índice de corrección monetaria, la ganancia habría sido mayor y el impuesto también. Conservar la escritura de compra y los comprobantes de las mejoras es lo que permite sustentarlo.\n4. **Todo esto es independiente de sus rentas de trabajo**: si además tuviera honorarios o sueldo, esos se consolidan por separado como rentas de trabajo, con su propia escala progresiva.'}
  ],
  proy:{
   t:'La distribución de utilidades de tu empresa',
   ctx:`Tu empresa cerró su ejercicio en el Módulo 2 y determinó una utilidad. En aquel momento propusiste un destino; ahora vas a ejecutarlo correctamente, con las formalidades societarias y tributarias que casi ninguna MYPE cumple.`,
   pasos:[
    'Retoma la utilidad neta y la reserva legal que calculaste en el proyecto de 2.5 y determina la utilidad distribuible.',
    'Redacta el acta de junta general que acuerda la distribución: fecha, socios presentes, utilidad del ejercicio, reserva legal detraída, monto a distribuir y forma de pago.',
    'Calcula la retención del 5% y determina el neto que recibe cada socio.',
    'Registra los asientos: acuerdo de distribución, retención y pago.',
    'Calcula la carga tributaria combinada de la utilidad: el Impuesto a la Renta de tercera que ya pagó la empresa más el 5% del dividendo, expresada como porcentaje de la utilidad antes de impuestos.',
    'Compara esa carga con la alternativa de pagar un sueldo al socio por el mismo importe neto, considerando: deducibilidad del sueldo para la empresa, impuesto de quinta categoría del socio, EsSalud y aporte pensionario. Presenta ambos escenarios en un cuadro.',
    'Revisa si en el Libro Diario de tu empresa existe algún retiro del dueño registrado como gasto y corrígelo.'
   ],
   entrega:[
    'El acta de junta redactada.',
    'Los asientos de distribución, retención y pago.',
    'El cálculo de la carga combinada.',
    'El cuadro comparativo dividendo frente a sueldo.',
    'La corrección de los retiros mal registrados, si los hubiera.'
   ],
   crit:[
    'El acta respeta el orden: primero reserva legal, luego distribución.',
    'La retención del 5% se calcula sobre el monto distribuido, sin deducción del 20%.',
    'El cuadro comparativo incluye el efecto de la deducibilidad del sueldo para la empresa, no solo el impuesto del socio.'
   ],
   pista:'Al comparar dividendo y sueldo, recuerda que el sueldo del socio debe estar a valor de mercado: si lo inflas para aprovechar la deducibilidad, el exceso se convierte en dividendo y pierdes las dos ventajas a la vez.'
  },
  proyInt:{
   t:'Auditoría de los retiros del dueño',
   integra:'1.1 a 4.2',
   ctx:`Esta es la revisión que todo contador debería hacer en su primera semana con un cliente nuevo, y la que casi nadie hace: verificar cómo sale el dinero de la empresa hacia su dueño. Vas a aplicarla a tu empresa usando todo lo construido desde el Módulo 1.`,
   pasos:[
    'Revisa el Libro Diario completo de tu empresa e identifica todas las salidas de dinero que benefician al dueño o a su familia: retiros, gastos personales, préstamos, pagos de servicios del hogar, uso de vehículos.',
    'Clasifica cada una: retiro de utilidades formalmente acordado, préstamo documentado, remuneración, gasto de la empresa legítimo, o gasto personal sin sustento.',
    'Para las que no tienen respaldo, determina el tratamiento tributario correcto y cuantifica el riesgo: gasto no deducible, dividendo presunto, disposición indirecta de renta.',
    'Verifica el postulado de entidad del subtema 1.2: ¿se está respetando la separación entre el patrimonio de la empresa y el del dueño? Documenta las violaciones.',
    'Diseña el procedimiento de retiros de tu empresa: cómo debe sacar dinero el dueño de forma legítima, con qué documento, qué aprobación y qué periodicidad.',
    'Redacta una carta de observaciones dirigida al dueño, del tipo que un contador entrega para dejar constancia escrita: qué encontraste, cuánto cuesta y qué propones. Esa carta es también la protección profesional del contador.'
   ],
   entrega:[
    'El inventario de salidas hacia el dueño, clasificado.',
    'La cuantificación del riesgo de las partidas sin respaldo.',
    'El procedimiento de retiros propuesto.',
    'La carta de observaciones al dueño.'
   ],
   crit:[
    'Cada salida está clasificada con fundamento normativo, no por intuición.',
    'El riesgo está cuantificado en soles, incluyendo el efecto del gasto no deducible y el del dividendo presunto.',
    'El procedimiento propuesto es realista: si prohíbe todo retiro, nadie lo cumplirá.'
   ],
   pista:'La carta de observaciones es un documento serio: déjala fechada y entregada con cargo. Si años después hay una fiscalización, esa carta demuestra que el contador advirtió y que la decisión de no corregir fue de la gerencia.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 24, 24-A, 24-B, 36, 52-A y 73-A', n:'supuestos de segunda categoría, dividendo presunto, deducción del 20% y tasas aplicables'},
   {a:'Humberto Medrano Cornejo', o:'Derecho Tributario: Impuesto a la Renta, aspectos significativos', n:'tratamiento de las rentas de capital y la doble imposición económica de los dividendos'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'disposición indirecta de renta y gastos personales de los socios'},
   {a:'Reglamento de la Ley del Impuesto a la Renta', o:'Normas sobre casa habitación y costo computable', n:'requisitos de la exoneración por casa habitación y actualización del costo'},
   {a:'SUNAT', o:'Formulario Virtual 1665 y obligaciones del notario', n:'pago del impuesto por enajenación de inmuebles y control notarial'}
  ]
 },
 {
  id:'m4t3', titulo:'Renta de cuarta categoría: honorarios y retenciones', min:23,
  cont:`La cuarta categoría grava el **trabajo independiente**: el ejercicio individual de una profesión, arte, ciencia u oficio, sin relación de dependencia. Es la categoría de los profesionales que emiten recibo por honorarios, y la que más conflictos genera con el derecho laboral, porque la frontera entre un servicio independiente y un trabajo subordinado disfrazado es delgada y costosa.

# Qué comprende el artículo 33
|Supuesto|Ejemplo|
|**a)** Ejercicio individual de cualquier profesión, arte, ciencia u oficio|Un contador, un diseñador, un gasfitero, un abogado|
|**b)** Desempeño de funciones de director de empresas, síndico, mandatario, gestor de negocios, albacea y actividades similares|El director de una S.A.C. que cobra dietas|

La distinción entre los dos incisos importa, porque el inciso b) **no tiene derecho a la deducción del 20%** y porque los límites para suspender retenciones son distintos.

# La determinación
$ Renta bruta (honorarios percibidos)
$ (−) Deducción del 20%, solo para el inciso a), con tope de 24 UIT
$ = Renta neta de cuarta categoría
$ Luego se suma a la renta de quinta y se aplican las deducciones y la escala (subtema siguiente)

A diferencia de la primera y la segunda categoría, aquí la tasa **no es plana**: la cuarta se consolida con la quinta como **rentas de trabajo** y tributa con la escala progresiva. Por eso el subtema siguiente es inseparable de este.

Con UIT de S/ 5,500 en 2026, el tope de la deducción del 20% es 24 × 5,500 = **S/ 132,000**: a partir de S/ 660,000 de honorarios anuales, la deducción deja de crecer.

# El criterio de imputación: percibido, no devengado
Las rentas de cuarta categoría se imputan **al ejercicio en que se perciben**, no cuando se devengan. Un servicio prestado en diciembre de 2026 y cobrado en enero de 2027 es renta de 2027. Es la diferencia más importante frente a la tercera categoría, que se rige por el devengo, y explica por qué un profesional independiente puede gestionar su carga tributaria decidiendo cuándo cobra.

> "Percibido" significa que la renta esté a disposición del beneficiario, aunque no la haya retirado físicamente. Si el cliente depositó el honorario el 30 de diciembre y el profesional lo retira en enero, la renta es de diciembre: estuvo a su disposición.

# Retención del 8%
Cuando el pagador es una persona que lleva contabilidad (una empresa, básicamente) y el recibo por honorarios **supera S/ 1,500**, debe retener el **8%** del monto y pagarlo a SUNAT. El profesional aplica esa retención contra su impuesto anual.

$ Recibo por S/ 3,000 → retención 8% = S/ 240 → el profesional recibe S/ 2,760

Si el recibo es de S/ 1,500 o menos, no hay retención, salvo que el perceptor no haya solicitado suspensión y corresponda según la norma. El límite se aplica por **recibo**, no por el acumulado del mes con ese cliente.

# Suspensión de retenciones y de pagos a cuenta
Un profesional cuyos ingresos anuales proyectados no superarán cierto límite puede solicitar la **suspensión de retenciones y de pagos a cuenta**, presentando el Formulario Virtual 1609 desde el mes de enero de cada ejercicio. Los límites se fijan en función de la UIT y SUNAT publica cada año los importes exactos:

|Supuesto|Referencia en UIT|Equivalente aproximado 2026 (UIT S/ 5,500)|
|Perceptores de rentas del inciso a), solas o con quinta|8.75 UIT anuales|Alrededor de S/ 48,125 al año|
|Perceptores que además son directores, mandatarios y similares (inciso b)|7 UIT anuales|Alrededor de S/ 38,500 al año|

! Los importes exactos los fija SUNAT cada año mediante resolución, y es lo primero que un profesional independiente debe revisar en enero. Sin la suspensión, le retendrán el 8% de cada recibo durante todo el año y recién recuperará el exceso al presentar su declaración anual, meses después: un préstamo sin interés al Estado que para muchos profesionales equivale a varios miles de soles inmovilizados.

# Pagos a cuenta mensuales
Si no hay suspensión y las retenciones no cubren el impuesto, el profesional debe efectuar un **pago a cuenta mensual** equivalente al 8% de sus ingresos del mes, descontando las retenciones que le hayan efectuado:

$ Pago a cuenta = (Ingresos del mes × 8%) − Retenciones del mes

# La frontera con la quinta categoría: el riesgo laboral
El mismo trabajo puede ser cuarta o quinta categoría según exista o no **subordinación**. Los tres elementos del contrato de trabajo son prestación personal, remuneración y subordinación; el tercero es el que decide.

|Indicio de subordinación|Qué muestra|
|Horario fijo impuesto|El prestador no organiza su tiempo|
|Lugar de trabajo impuesto, con medios del cliente|No asume el riesgo ni la inversión|
|Supervisión y órdenes directas|No hay autonomía técnica|
|Exclusividad de hecho|El ingreso depende de un solo cliente|
|Pago fijo mensual sin relación con entregables|Se paga el tiempo, no el resultado|

Por el principio de **primacía de la realidad**, si los hechos muestran subordinación, la relación es laboral aunque se haya firmado un contrato de locación de servicios y se emitan recibos por honorarios. Las consecuencias son dobles: tributarias (retenciones de quinta no efectuadas, con responsabilidad solidaria del empleador) y laborales (beneficios sociales de todo el periodo, aportes y multas de SUNAFIL), tema que se desarrolla en el módulo laboral.

# El lado de la empresa que paga honorarios
@ Honorarios profesionales por S/ 3,000 con retención del 8%
@ 63|6322 Asesoría|3,000.00|
@ 40|4017 Impuesto a la Renta - Cuarta categoría||240.00
@ 42|4232 Honorarios por pagar||2,760.00

@ Pago del honorario neto
@ 42|4232 Honorarios por pagar|2,760.00|
@ 10|1041 Cuentas corrientes operativas||2,760.00

Para que el gasto sea deducible, la empresa necesita el recibo por honorarios electrónico, acreditar la prestación efectiva del servicio (fehaciencia) y, si el importe lo exige, bancarizar el pago. Y hay una regla específica importante: los honorarios de cuarta categoría son deducibles en el ejercicio en que se **pagan**, si no se pagaron dentro del plazo de la declaración anual, siguiendo la misma lógica que las rentas de quinta.`,
  claves:['La cuarta categoría grava el trabajo independiente y se consolida con la quinta como rentas de trabajo.','Deducción del 20% con tope de 24 UIT, solo para el inciso a); los directores y mandatarios del inciso b) no la tienen.','Se imputa por lo percibido, no por lo devengado: estar a disposición basta para considerarla percibida.','Retención del 8% cuando el pagador lleva contabilidad y el recibo supera S/ 1,500.','La suspensión de retenciones se solicita desde enero con el Formulario 1609, según los límites en UIT que SUNAT publica cada año.'],
  preg:[
   {p:'¿Por qué la cuarta categoría se imputa por lo percibido y la tercera por lo devengado?',
    r:'Porque responden a realidades distintas. Una empresa tiene organización administrativa, lleva libros y puede medir con precisión cuándo se devenga cada ingreso y cada gasto, de modo que el devengo refleja mejor su resultado económico. Un profesional independiente no tiene esa estructura y su capacidad de pago depende de cuándo cobra efectivamente: gravarlo por lo devengado lo obligaría a pagar impuesto por honorarios que quizá nunca cobre. El criterio de lo percibido es más simple y más justo para el contribuyente individual, y es el estándar en las rentas de trabajo en casi toda la región.'},
   {p:'Un director de empresa cobra dietas por S/ 40,000 al año. ¿Puede deducir el 20%?',
    r:'No. La deducción del 20% está reservada al inciso a) del artículo 33, es decir al ejercicio individual de una profesión, arte, ciencia u oficio. Las funciones de director, síndico, mandatario, gestor de negocios o albacea están en el inciso b) y no gozan de esa deducción, porque se entiende que no exigen una estructura ni gastos asociados comparables. Sus dietas pasan directamente a formar parte de la renta neta de trabajo, donde sí se aplican luego las 7 UIT y, cuando corresponde, las 3 UIT adicionales.'},
   {p:'Un profesional cobrará S/ 40,000 en el año. ¿Le conviene solicitar la suspensión de retenciones?',
    r:'Sí, si su proyección se ubica por debajo del límite que fija SUNAT para el ejercicio, que ronda las 8.75 UIT anuales. Con S/ 40,000 de ingresos, su renta neta tras la deducción del 20% sería S/ 32,000, por debajo de las 7 UIT (S/ 38,500) que se deducen de las rentas de trabajo: no tendrá impuesto por pagar. Sin la suspensión le retendrían 8% de cada recibo, unos S/ 3,200 al año, que recuperaría recién en la declaración anual. La suspensión evita inmovilizar ese dinero. Lo que sí debe hacer es monitorear sus ingresos: si durante el año supera el límite, debe comunicarlo y reanudar.'},
   {p:'¿Qué diferencia práctica hay entre un contrato de locación de servicios y un contrato de trabajo, si en ambos alguien trabaja y cobra?',
    r:'La subordinación. En la locación, el prestador organiza su propio trabajo, decide cómo y cuándo hacerlo, asume el riesgo del resultado y suele usar sus propios medios; su ingreso es cuarta categoría y emite recibo por honorarios. En el contrato de trabajo, el empleador dirige, fiscaliza y sanciona; el ingreso es quinta categoría, hay planilla, aportes y beneficios sociales. La forma del contrato no decide: si los hechos muestran subordinación, la relación es laboral por primacía de la realidad, con consecuencias tributarias y laborales retroactivas.'},
   {p:'¿Por qué el límite de S/ 1,500 para retener se aplica por recibo y no por el acumulado mensual con un mismo cliente?',
    r:'Porque la norma vincula la obligación de retener a la operación individual documentada en cada comprobante, lo que hace el control simple y automático para el agente de retención: ve el importe del recibo y decide. El efecto práctico es que alguien podría emitir varios recibos pequeños al mismo cliente y evitar la retención, pero eso no reduce su impuesto: su obligación anual se determina igual sobre el total percibido, y si no hubo retenciones deberá hacer pagos a cuenta o pagar al regularizar. La retención es un mecanismo de recaudación anticipada, no una tasa distinta.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un profesional emite un recibo por honorarios de S/ 4,500 a una empresa. ¿Cuánto recibe neto?',
    u:'S/',r:4140,tol:1,
    s:'Como el recibo supera S/ 1,500 y el pagador lleva contabilidad, corresponde retención del 8%:\nRetención = 4,500 × 8% = S/ 360\n**Neto a recibir = 4,500 − 360 = S/ 4,140**\n\nLa empresa declara y paga esa retención en el periodo correspondiente, y el profesional la aplica como crédito contra su impuesto anual de rentas de trabajo. Si el profesional tuviera suspensión de retenciones vigente, recibiría los S/ 4,500 completos.'},
   {l:1,t:'mc',p:'¿Cuándo se considera percibida una renta de cuarta categoría?',
    o:['Cuando se presta el servicio','Cuando se emite el recibo','Cuando está a disposición del beneficiario, aunque no la haya retirado','Al cierre del ejercicio'],r:2,
    s:'Cuando está a disposición del beneficiario. Si el cliente depositó el honorario en la cuenta del profesional el 30 de diciembre, la renta es de ese ejercicio aunque el dinero se retire en enero: estuvo disponible. Ni la prestación del servicio ni la emisión del recibo determinan la imputación en esta categoría; eso es propio del devengo, que rige para la tercera categoría.'},
   {l:2,t:'num',p:'Un profesional percibió S/ 90,000 de honorarios en el año (inciso a). ¿Cuál es su renta neta de cuarta categoría?',
    u:'S/',r:72000,tol:10,
    s:'Deducción del 20% = 90,000 × 20% = S/ 18,000 (muy por debajo del tope de 24 UIT = S/ 132,000)\n**Renta neta de cuarta categoría = 90,000 − 18,000 = S/ 72,000**\n\nEsa renta neta se suma luego a sus rentas de quinta categoría, si las tuviera, y del total se deducen las 7 UIT (S/ 38,500) y, si cumple los requisitos, hasta 3 UIT adicionales por gastos. Sobre el resultado se aplica la escala progresiva. El cálculo completo es el tema del subtema siguiente.'},
   {l:2,t:'ab',p:'Una consultora independiente proyecta ingresos de S/ 120,000 para el año. Analiza si debe pedir suspensión de retenciones y calcula el efecto financiero de no hacerlo.',
    s:'**Paso 1 — ¿Califica para la suspensión?**\nEl límite referencial es de 8.75 UIT anuales, alrededor de **S/ 48,125** con UIT de S/ 5,500 (el importe exacto lo fija SUNAT cada año). Con ingresos proyectados de S/ 120,000, **no califica**: debe soportar retenciones y, en su caso, efectuar pagos a cuenta.\n\n**Paso 2 — Retenciones del año**\nSi todos sus clientes son empresas y todos sus recibos superan S/ 1,500:\nRetenciones = 120,000 × 8% = **S/ 9,600**\n\n**Paso 3 — ¿Cuánto será su impuesto real?**\nRenta bruta: 120,000\nDeducción 20%: (24,000) → renta neta de cuarta: S/ 96,000\nDeducción de 7 UIT: (38,500) → renta neta de trabajo: S/ 57,500\n\nEscala progresiva (UIT S/ 5,500):\nHasta 5 UIT (S/ 27,500) al 8% = S/ 2,200\nDe 5 a 20 UIT: los S/ 30,000 restantes al 14% = S/ 4,200\n**Impuesto anual aproximado = S/ 6,400**\n\n**Paso 4 — El resultado**\nRetenciones: S/ 9,600\nImpuesto real: S/ 6,400\n**Saldo a favor: S/ 3,200**, que recuperará al presentar la declaración anual, entre marzo y abril del año siguiente.\n\n**El efecto financiero:** adelantó en promedio unos S/ 3,200 durante medio año. A una tasa de referencia del 10% anual, el costo financiero es de unos S/ 160. No es dramático, pero tampoco es cero, y la situación se repite todos los años.\n\n**Qué sí puede hacer:**\n\n1. **Si tiene gastos deducibles de las 3 UIT adicionales** (alquiler de su oficina, servicios de otros profesionales, restaurantes y hoteles), documentarlos con comprobante electrónico y medio de pago: reducen su impuesto anual y aumentan el saldo a favor.\n2. **Solicitar la devolución o aplicar el saldo** contra los pagos a cuenta del ejercicio siguiente, en lugar de dejarlo sin usar.\n3. **Revisar la proyección a mitad de año**: si sus ingresos caen por debajo del límite, puede solicitar la suspensión desde ese momento hacia adelante.\n\n**Lo que no debe hacer:** fraccionar recibos para quedar bajo los S/ 1,500 y evitar la retención. No reduce el impuesto, que se determina sobre el total anual, y si el fraccionamiento es artificial puede ser cuestionado.'},
   {l:3,t:'ab',p:'Una empresa paga a tres personas S/ 3,500 mensuales cada una por recibo por honorarios. Trabajan 48 horas semanales en el local, con horario fijo, usando equipos de la empresa y bajo supervisión del gerente. Analiza la situación tributaria y laboral, y cuantifica.',
    s:'**Diagnóstico: es una relación laboral encubierta.** Están los tres elementos del contrato de trabajo: prestación personal, remuneración y **subordinación** (horario fijo, supervisión directa, trabajo en el local con medios de la empresa, jornada completa). Por primacía de la realidad, la calificación no depende del contrato firmado ni del comprobante emitido, sino de los hechos.\n\n**Consecuencias tributarias**\n\n1. Los ingresos son **renta de quinta categoría**, no de cuarta. La empresa debió retener según la escala progresiva sobre la proyección anual, y no el 8% de cuarta.\n2. Como agente de retención, la empresa es **responsable solidaria** por las retenciones no efectuadas, con multa por no retener e intereses.\n3. El gasto puede ser cuestionado por no cumplir los requisitos de las rentas de quinta, que exigen su registro en planilla.\n\n**Consecuencias laborales, por los tres trabajadores y un año**\n\n| Concepto | Por trabajador | Tres trabajadores |\n|---|---|---|\n| Gratificaciones (2 × 3,500) | 7,000 | 21,000 |\n| Bonificación extraordinaria 9% | 630 | 1,890 |\n| CTS (aproximadamente una remuneración computable) | 4,083 | 12,249 |\n| Vacaciones no gozadas (remuneración más indemnización) | 7,000 | 21,000 |\n| EsSalud 9% sobre 12 meses | 3,780 | 11,340 |\n| Aportes pensionarios no retenidos | 5,460 | 16,380 |\n| **Subtotal de un año** | **27,953** | **83,859** |\n\nMás intereses laborales, más multas de SUNAFIL por no registrar trabajadores en el T-Registro (infracción muy grave, graduada en UIT según el número de afectados), más las multas por no llevar registro de control de asistencia ni registros de seguridad y salud.\n\n**En materia laboral el plazo de prescripción es de cuatro años** desde el cese, así que si la situación lleva tres años, la exposición se acerca a **S/ 250,000** más intereses y multas.\n\n**Cómo se ordena, en orden de urgencia:**\n\n1. **Registrar a los tres en el T-Registro y en planilla desde ya**, con el régimen laboral que corresponda a la empresa.\n2. **Evaluar con un abogado laboralista** la regularización del periodo anterior: a veces conviene un acuerdo con reconocimiento de beneficios, que reduce el riesgo de demanda.\n3. **Rediseñar los casos que sí pueden ser cuarta categoría**: un verdadero servicio independiente no tiene horario impuesto, no se presta en exclusividad en el local del cliente con sus equipos, se factura por entregable y el prestador asume el riesgo del resultado.\n4. **No repetir el esquema con nuevos ingresos**: cada mes que pasa agranda la contingencia.\n\n**La conclusión para el dueño:** el ahorro aparente de no tener planilla es un pasivo diferido que crece con intereses, y que se hace exigible en el peor momento, cuando un trabajador se va molesto y reclama.'}
  ],
  proy:{
   t:'Los servicios de cuarta categoría de tu empresa',
   ctx:`Casi toda empresa contrata servicios de personas naturales: un contador externo, un abogado, un técnico, un diseñador. Vas a ordenar esa relación en tu empresa, que es donde más fácilmente aparecen contingencias laborales y tributarias a la vez.`,
   pasos:[
    'Identifica los servicios de personas naturales que contrata tu empresa. Si no tiene ninguno, inventa tres realistas para su giro.',
    'Para cada uno, aplica la prueba de subordinación con los cinco indicios del subtema y concluye si corresponde cuarta o quinta categoría. Justifica cada conclusión.',
    'Para los que sí son cuarta categoría, determina si corresponde retención del 8% y calcula el neto a pagar.',
    'Registra los asientos de devengo, retención y pago de uno de ellos.',
    'Verifica el sustento del gasto: recibo por honorarios electrónico, evidencia de la prestación efectiva y bancarización si corresponde.',
    'Redacta un contrato de locación de servicios de una página para uno de esos prestadores, cuidando que su contenido refuerce la autonomía: entregables, plazos, ausencia de horario impuesto, medios propios.',
    'Elabora la lista de verificación mensual de pagos a personas naturales, que tu empresa aplicará antes de cada pago.'
   ],
   entrega:[
    'El análisis de subordinación de cada servicio con su conclusión.',
    'El cálculo de retenciones y los asientos de uno de los casos.',
    'El contrato de locación de servicios redactado.',
    'La lista de verificación mensual.'
   ],
   crit:[
    'La prueba de subordinación analiza los cinco indicios, no solo la existencia del contrato.',
    'El contrato redactado refuerza la autonomía en su contenido, no solo en su título.',
    'La lista de verificación incluye la validación del recibo electrónico y la bancarización.'
   ],
   pista:'Un contrato titulado "locación de servicios" que fija horario de 8 a 6 y exige exclusividad es prueba en contra, no a favor. El contenido pesa más que el título, y un fiscalizador lo lee completo.'
  },
  proyInt:{
   t:'El mapa completo de pagos a personas naturales',
   integra:'1.1 a 4.3',
   ctx:`Tu empresa paga a personas naturales por tres vías distintas: alquileres (primera), dividendos e intereses (segunda) y honorarios (cuarta). Cada una tiene su comprobante, su retención y su riesgo. Este proyecto los une en un solo sistema de control.`,
   pasos:[
    'Consolida en un cuadro todos los pagos de tu empresa a personas naturales, de los tres subtemas: arrendadores, socios, prestadores de servicios.',
    'Para cada uno: categoría de renta, comprobante que corresponde, retención aplicable, momento de la retención, formulario y fecha de pago de la retención.',
    'Calcula el total de retenciones que tu empresa debe declarar y pagar en un mes típico, y registra el asiento consolidado.',
    'Verifica en tu Libro Diario de los módulos anteriores si alguna de estas retenciones se omitió, y cuantifica la contingencia por responsabilidad solidaria.',
    'Agrega al manual tributario del Módulo 3 un capítulo nuevo: obligaciones como agente de retención, con el procedimiento para cada categoría.',
    'Diseña el calendario de retenciones: qué se retiene, cuándo se declara y en qué formulario, integrado con el calendario tributario que ya tenías.'
   ],
   entrega:[
    'El cuadro consolidado de pagos a personas naturales con sus retenciones.',
    'El asiento consolidado de retenciones del mes.',
    'La cuantificación de contingencias por retenciones omitidas.',
    'El capítulo de agente de retención agregado al manual.'
   ],
   crit:[
    'Cada categoría tiene identificada su retención correcta: 5% dividendos, 8% cuarta, ninguna en primera.',
    'El calendario integra las retenciones con las demás obligaciones del mes.',
    'La contingencia por responsabilidad solidaria está cuantificada, no solo mencionada.'
   ],
   pista:'Una empresa puede ser agente de retención de varias categorías a la vez y declararlas en el mismo formulario mensual. Lo que no puede es olvidarse de alguna: la responsabilidad por no retener es solidaria, y el fisco cobra a quien tiene con qué pagar.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 33, 45, 57 inciso d), 71 y 74', n:'supuestos de cuarta categoría, deducción del 20%, criterio de lo percibido y retenciones'},
   {a:'SUNAT', o:'Formulario Virtual 1609 y resoluciones anuales de suspensión de retenciones', n:'límites en UIT y procedimiento para suspender retenciones y pagos a cuenta'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'elementos del contrato de trabajo y principio de primacía de la realidad'},
   {a:'Humberto Medrano Cornejo', o:'Derecho Tributario: Impuesto a la Renta, aspectos significativos', n:'criterio de lo percibido en las rentas de trabajo'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'deducibilidad de los honorarios y condición de pago dentro del plazo'}
  ]
 },
 {
  id:'m4t4', titulo:'Rentas de trabajo: determinación anual y retención de quinta', min:26,
  cont:`La cuarta y la quinta categoría no se calculan por separado: se **consolidan** como rentas de trabajo y tributan juntas con una escala progresiva. Esta es la única parte del Impuesto a la Renta peruano donde quien gana más paga proporcionalmente más, y el diseño es deliberado: las rentas de capital tributan a tasas planas y bajas para no ahuyentar la inversión, mientras que las del trabajo soportan progresividad.

# Qué grava la quinta categoría
El artículo 34 comprende el trabajo en relación de dependencia: sueldos, salarios, asignaciones, gratificaciones, bonificaciones, aguinaldos, comisiones, compensaciones en dinero o en especie, gastos de representación y, en general, toda retribución por servicios personales.

Hay un supuesto particular que conviene conocer, llamado en la práctica **cuarta-quinta**: los ingresos obtenidos por el trabajo prestado de forma independiente pero con contratos de prestación de servicios normados por la legislación civil, cuando el servicio se presta **en el lugar y horario designado por el usuario**, y este proporciona los elementos de trabajo y asume los gastos. Esos ingresos son de quinta categoría aunque no exista relación laboral, y se sustentan con recibo por honorarios pero no tienen la deducción del 20%.

# Ingresos que NO son renta de quinta categoría
|Concepto|Por qué|
|CTS|Beneficio social con naturaleza previsional, inafecto|
|Indemnización por despido arbitrario|Indemnizatorio, no retributivo|
|Indemnización por vacaciones no gozadas|Indemnizatorio|
|Subsidios de EsSalud (maternidad, incapacidad)|No los paga el empleador como contraprestación|
|Condiciones de trabajo (uniformes, movilidad para el servicio)|No son de libre disposición|
|Gastos de viaje y viáticos sustentados y razonables|Reembolso de gastos, no retribución|

> Confundir un concepto indemnizatorio con uno remunerativo es un error que cuesta dinero en los dos sentidos: si se retiene impuesto sobre la CTS, se perjudica al trabajador; si no se retiene sobre un bono que sí es remunerativo, la empresa responde solidariamente.

# La determinación anual de las rentas de trabajo
$ Renta bruta de cuarta − 20% (tope 24 UIT) = Renta neta de cuarta
$ + Renta bruta de quinta
$ = Renta de trabajo
$ − 7 UIT
$ − Hasta 3 UIT adicionales por gastos sustentados
$ = Renta neta de trabajo
$ + Renta de fuente extranjera (si la hubiera)
$ × Escala progresiva = Impuesto anual

Con UIT de S/ 5,500 en 2026, las 7 UIT equivalen a **S/ 38,500**: nadie con rentas de trabajo por debajo de ese importe paga impuesto.

# La escala progresiva
|Tramo de renta neta de trabajo|Tasa|Equivalente 2026|
|Hasta 5 UIT|8%|Hasta S/ 27,500|
|Más de 5 hasta 20 UIT|14%|De S/ 27,500 a S/ 110,000|
|Más de 20 hasta 35 UIT|17%|De S/ 110,000 a S/ 192,500|
|Más de 35 hasta 45 UIT|20%|De S/ 192,500 a S/ 247,500|
|Más de 45 UIT|30%|Más de S/ 247,500|

Es una escala **acumulativa por tramos**: quien tiene renta neta de S/ 120,000 no paga 17% de todo, sino 8% del primer tramo, 14% del segundo y 17% solo del exceso sobre 20 UIT.

# Las 3 UIT adicionales: la deducción que casi nadie usa bien
Además de las 7 UIT, los perceptores de rentas de trabajo pueden deducir hasta **3 UIT adicionales** (S/ 16,500 en 2026) por determinados gastos, en los porcentajes que fija la ley:

|Gasto|Porcentaje deducible|
|Arrendamiento y subarrendamiento de inmuebles no destinados a negocio|30% del alquiler pagado|
|Servicios de médicos y odontólogos|30% de los honorarios|
|Servicios de otros profesionales de cuarta categoría señalados por la norma|30% de los honorarios|
|Servicios de hoteles, restaurantes y afines|15% del consumo|
|Aportaciones a EsSalud por trabajadores del hogar|100%|

! Los requisitos son estrictos y es donde falla casi todo el mundo: el gasto debe estar sustentado con **comprobante de pago electrónico** emitido a nombre del contribuyente, y el pago debe hacerse con **medio de pago del sistema financiero** —transferencia, depósito, tarjeta— **sin importar el monto**. Pagar en efectivo la consulta médica, aunque sean S/ 150, elimina la deducción. La lista de profesiones comprendidas y los porcentajes han variado entre ejercicios, así que conviene revisar la norma del año.

# La retención mensual de quinta categoría
El empleador no espera al cierre del año: retiene mensualmente según el procedimiento del artículo 40 del reglamento, que consiste en **proyectar la remuneración anual**, calcular el impuesto sobre esa proyección y dividirlo entre un número de meses que varía según el mes de cálculo.

|Mes|Divisor|
|Enero, febrero y marzo|12|
|Abril|9|
|Mayo, junio y julio|8|
|Agosto|5|
|Setiembre, octubre y noviembre|4|
|Diciembre|Regularización: impuesto anual menos retenciones de enero a noviembre|

La proyección incluye las gratificaciones ordinarias de julio y diciembre. Cuando el trabajador percibe un ingreso extraordinario —una participación de utilidades, un bono— se practica un cálculo adicional sobre ese importe en el mes en que se percibe.

$ Paso 1: Remuneración mensual × meses que faltan + remuneraciones ya percibidas + gratificaciones = Remuneración anual proyectada
$ Paso 2: Proyección − 7 UIT = Renta neta proyectada
$ Paso 3: Aplicar la escala progresiva = Impuesto anual proyectado
$ Paso 4: Impuesto anual ÷ divisor del mes = Retención del mes
$ Paso 5: Restar las retenciones ya efectuadas cuando corresponde

# Un cálculo completo
Trabajador con sueldo de S/ 6,000 mensuales, sin otros ingresos, en enero de 2026:

$ Proyección anual: 6,000 × 12 + 6,000 × 2 (gratificaciones) = 84,000
$ Menos 7 UIT: 84,000 − 38,500 = 45,500 de renta neta
$ Escala: 27,500 × 8% = 2,200
$        18,000 × 14% = 2,520
$ Impuesto anual proyectado = 4,720
$ Retención de enero = 4,720 ÷ 12 = 393.33

El trabajador verá en su boleta un descuento de S/ 393.33 por renta de quinta, además de su aporte pensionario.

# Saldo a favor del trabajador
Si las retenciones del año superaron el impuesto real —porque el trabajador dejó de laborar, porque tenía gastos de las 3 UIT que no se consideraron en la proyección, o porque hubo un error— el trabajador puede solicitar la devolución. Si solo tiene rentas de quinta, lo hace mediante el procedimiento específico ante su empleador o directamente ante SUNAT; si tiene rentas de cuarta y quinta, presenta **declaración jurada anual** y ahí determina el saldo.

> Cada año, miles de trabajadores dejan de recuperar dinero porque nadie les dijo que podían. Un contador que explica a la planilla cómo usar las 3 UIT adicionales y cómo pedir la devolución genera un beneficio directo y medible para los trabajadores, y es una de las cosas que más se agradecen en una empresa.

@ Registro de la planilla con retención de quinta categoría
@ 62|6211 Sueldos|6,000.00|
@ 40|40173 Renta de quinta categoría||393.33
@ 40|4032 ONP||780.00
@ 41|4111 Sueldos y salarios por pagar||4,826.67`,
  claves:['La cuarta y la quinta se consolidan como rentas de trabajo y tributan con escala progresiva de 8% a 30%.','Se deducen 7 UIT (S/ 38,500 en 2026) y hasta 3 UIT adicionales por gastos sustentados.','Las 3 UIT adicionales exigen comprobante electrónico y pago con medio del sistema financiero, sin importar el monto.','CTS, indemnizaciones y subsidios no son renta de quinta categoría.','La retención mensual proyecta la remuneración anual y divide el impuesto entre un divisor que cambia según el mes.'],
  preg:[
   {p:'¿Por qué las rentas de trabajo tributan con escala progresiva y las de capital con tasa plana?',
    r:'Es una decisión de política fiscal. La progresividad busca capacidad contributiva: quien gana más por su trabajo puede aportar proporcionalmente más. Las rentas de capital, en cambio, se gravan a tasas planas y bajas porque el capital es móvil: si tributara igual que el trabajo, podría desplazarse a otras jurisdicciones, mientras que el trabajador no se muda con la misma facilidad. Es una elección discutida en la doctrina, porque implica que un profesional que gana S/ 300,000 por su trabajo tributa hasta 30%, mientras que quien gana lo mismo por dividendos tributa 5%, pero es el diseño que adopta el sistema peruano y la mayoría de los sistemas duales.'},
   {p:'Un trabajador paga en efectivo S/ 2,000 al año a su dentista, con recibo por honorarios electrónico. ¿Puede deducirlo en las 3 UIT adicionales?',
    r:'No. Aunque el comprobante sea electrónico y esté a su nombre, la norma exige que el pago se realice con medio de pago del sistema financiero, **sin importar el monto**. Es una regla más estricta que la bancarización general de la Ley 28194, que recién aplica desde S/ 2,000. Pagando en efectivo pierde el 30% de S/ 2,000, es decir S/ 600 de deducción, que a su tasa marginal podría significar entre S/ 48 y S/ 180 de impuesto. La solución es simple: pagar con tarjeta, Yape o transferencia, y conservar la constancia.'},
   {p:'¿Por qué el divisor de la retención de quinta cambia a lo largo del año?',
    r:'Porque el método busca que, al llegar diciembre, el total retenido coincida con el impuesto anual. En enero quedan doce meses por delante, así que el impuesto proyectado se divide entre doce. En abril ya pasaron tres meses y, considerando la mecánica del reglamento, el saldo del impuesto se reparte entre los meses restantes con los divisores establecidos. Si se usara siempre doce, en diciembre faltaría retener la parte de los meses ya transcurridos cuando hay cambios de remuneración. El sistema está diseñado para que la retención se ajuste a medida que la información del año se vuelve más cierta.'},
   {p:'La CTS no es renta de quinta categoría. ¿Significa que el trabajador no paga nada por ella?',
    r:'Correcto: la CTS está inafecta al Impuesto a la Renta, y además no está sujeta a aportes a EsSalud ni al sistema pensionario. La razón es su naturaleza: no es una contraprestación por el trabajo prestado, sino un beneficio social de carácter previsional, destinado a cubrir las contingencias del cese. Lo mismo ocurre con la indemnización por despido arbitrario y con la indemnización por vacaciones no gozadas. Lo que sí tributa son las gratificaciones, las vacaciones gozadas y las participaciones en utilidades, porque sí son retributivas.'},
   {p:'Un trabajador tiene sueldo y además emite recibos por honorarios. ¿Cómo se determina su impuesto?',
    r:'Se consolidan. Su renta neta de cuarta (honorarios menos la deducción del 20%, con tope de 24 UIT) se suma a su renta bruta de quinta, y del total se deducen las 7 UIT y, si corresponde, hasta 3 UIT adicionales. Sobre ese resultado se aplica la escala progresiva. Las retenciones que le hicieron en ambas categorías —8% en cuarta, la retención mensual en quinta— se aplican como crédito. Debe presentar declaración jurada anual, porque las retenciones de quinta se calcularon ignorando sus honorarios y casi siempre resultan insuficientes: es un caso donde el trabajador suele terminar pagando un saldo, y conviene advertírselo en enero y no en marzo.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un trabajador gana S/ 4,000 mensuales en el régimen general (14 remuneraciones al año). ¿Cuál es su impuesto anual de quinta categoría en 2026?',
    u:'S/',r:1400,tol:10,
    s:'Remuneración anual proyectada = 14 × 4,000 = S/ 56,000 (12 sueldos más 2 gratificaciones)\nDeducción de 7 UIT = 7 × 5,500 = S/ 38,500\nRenta neta = 56,000 − 38,500 = S/ 17,500\n\nEl primer tramo de la escala llega hasta 5 UIT = S/ 27,500 y tributa 8%. Como S/ 17,500 cae íntegro en ese tramo:\n**Impuesto anual = 17,500 × 8% = S/ 1,400**\n\nRetención mensual aproximada = 1,400 ÷ 12 = S/ 116.67. Si además tuviera gastos deducibles de las 3 UIT adicionales, su impuesto bajaría y generaría saldo a favor.'},
   {l:1,t:'mc',p:'¿Cuál de estos conceptos NO está afecto a renta de quinta categoría?',
    o:['La gratificación de julio','La CTS depositada en mayo','Las vacaciones gozadas','La participación en las utilidades'],r:1,
    s:'La CTS está inafecta al Impuesto a la Renta y tampoco está sujeta a aportes ni descuentos pensionarios, por su naturaleza previsional: es un seguro para la contingencia del cese, no una contraprestación por el trabajo. Las gratificaciones, las vacaciones gozadas y la participación en utilidades sí son rentas de quinta categoría y entran en la proyección anual para calcular la retención.'},
   {l:2,t:'num',p:'Un trabajador con sueldo de S/ 9,000 mensuales (14 remuneraciones). ¿Cuál es su impuesto anual de 2026?',
    u:'S/',r:12530,tol:50,
    s:'Proyección anual = 14 × 9,000 = S/ 126,000\nMenos 7 UIT (S/ 38,500) = renta neta S/ 87,500\n\nEscala acumulativa:\nPrimer tramo, hasta 5 UIT (S/ 27,500) al 8% = S/ 2,200\nSegundo tramo, de 5 a 20 UIT: 87,500 − 27,500 = S/ 60,000 al 14% = S/ 8,400\n(No llega a 20 UIT = S/ 110,000, así que no hay tercer tramo.)\n\n**Impuesto anual = 2,200 + 8,400 = S/ 10,600**\n\nTasa efectiva sobre su remuneración total: 10,600 ÷ 126,000 = 8.4%, muy por debajo del 14% marginal. Esa diferencia entre tasa marginal y tasa efectiva es la que confunde a la mayoría de trabajadores cuando ve su boleta.'},
   {l:2,t:'ab',p:'Un trabajador con sueldo de S/ 7,000 paga al año: alquiler de su departamento S/ 18,000 (con contrato y pagos por transferencia), consultas médicas S/ 3,000 (pagadas con tarjeta, recibo electrónico) y restaurantes S/ 8,000 (pagados con tarjeta, boletas electrónicas). Calcula el efecto de las 3 UIT adicionales.',
    s:'**Paso 1 — Deducción adicional por cada concepto**\n\n| Gasto | Importe | % deducible | Deducción |\n|---|---|---|---|\n| Arrendamiento de vivienda | 18,000 | 30% | 5,400 |\n| Servicios médicos y odontológicos | 3,000 | 30% | 900 |\n| Hoteles y restaurantes | 8,000 | 15% | 1,200 |\n| **Total deducción adicional** | | | **7,500** |\n\nEl tope es 3 UIT = S/ 16,500, así que los S/ 7,500 son deducibles íntegramente.\n\n**Paso 2 — Impuesto sin la deducción adicional**\nProyección anual: 14 × 7,000 = S/ 98,000\nMenos 7 UIT: 98,000 − 38,500 = S/ 59,500 de renta neta\nEscala: 27,500 × 8% = 2,200; (59,500 − 27,500) = 32,000 × 14% = 4,480\n**Impuesto = S/ 6,680**\n\n**Paso 3 — Impuesto con la deducción adicional**\nRenta neta: 59,500 − 7,500 = S/ 52,000\nEscala: 27,500 × 8% = 2,200; (52,000 − 27,500) = 24,500 × 14% = 3,430\n**Impuesto = S/ 5,630**\n\n**Ahorro: S/ 1,050 al año**, que se recupera como saldo a favor en la declaración anual, porque su empleador retuvo sin considerar estos gastos.\n\n**Las tres condiciones que lo hicieron posible, y que casi nadie cumple completas:**\n\n1. **Comprobante electrónico a su nombre** en los tres casos. Una boleta sin su documento de identidad no sirve.\n2. **Pago con medio del sistema financiero**, sin importar el monto. Si hubiera pagado el alquiler en efectivo, perdería S/ 5,400 de deducción.\n3. **Que el arrendador haya declarado el alquiler**: el contribuyente debe informar los datos del arrendador, lo que cruza la deducción con el impuesto de primera categoría de la otra parte. Esta es justamente la razón de ser de la deducción: formalizar el mercado de alquileres incentivando al inquilino a exigir el comprobante.\n\n**El consejo práctico para la planilla:** pagar todo con tarjeta o transferencia y guardar los comprobantes electrónicos durante el año. Es dinero que se recupera en marzo.'},
   {l:3,t:'ab',p:'Una persona tuvo en 2026: sueldo de S/ 8,000 mensuales (14 remuneraciones) en una empresa que le retuvo correctamente, y además honorarios por S/ 60,000 por asesorías independientes, con retenciones del 8%. Gastos deducibles de las 3 UIT: S/ 10,000. Determina su situación anual completa.',
    s:'**Paso 1 — Renta neta de cuarta categoría**\nHonorarios: S/ 60,000\nDeducción del 20% (tope 24 UIT = S/ 132,000, no restrictivo): (S/ 12,000)\n**Renta neta de cuarta = S/ 48,000**\nRetenciones sufridas: 60,000 × 8% = **S/ 4,800**\n\n**Paso 2 — Renta bruta de quinta categoría**\n14 × 8,000 = **S/ 112,000**\n\n**Paso 3 — Renta de trabajo y deducciones**\nRenta de trabajo = 48,000 + 112,000 = S/ 160,000\n(−) 7 UIT: (S/ 38,500)\n(−) Deducción adicional: (S/ 10,000)\n**Renta neta de trabajo = S/ 111,500**\n\n**Paso 4 — Impuesto anual con la escala acumulativa**\n\n| Tramo | Base | Tasa | Impuesto |\n|---|---|---|---|\n| Hasta 5 UIT (27,500) | 27,500 | 8% | 2,200 |\n| De 5 a 20 UIT (27,500 a 110,000) | 82,500 | 14% | 11,550 |\n| De 20 a 35 UIT (exceso sobre 110,000) | 1,500 | 17% | 255 |\n| **Impuesto anual** | | | **14,005** |\n\n**Paso 5 — Créditos y saldo**\n\n| Concepto | Importe |\n|---|---|\n| Impuesto anual | 14,005 |\n| (−) Retenciones de cuarta categoría | (4,800) |\n| (−) Retenciones de quinta categoría (ver abajo) | (?) |\n| **Saldo** | |\n\nSu empleador retuvo proyectando **solo** el sueldo: 112,000 − 38,500 = S/ 73,500 de renta neta.\nEscala: 27,500 × 8% = 2,200; (73,500 − 27,500) = 46,000 × 14% = 6,440 → retención anual de quinta = **S/ 8,640**.\n\nCréditos totales = 4,800 + 8,640 = **S/ 13,440**\n**Saldo por pagar = 14,005 − 13,440 = S/ 565**\n\n**Las tres conclusiones que un asesor debe comunicarle:**\n\n1. **Debe presentar declaración jurada anual.** Tiene rentas de cuarta y quinta, así que no basta con las retenciones.\n2. **Va a tener que pagar un saldo**, aunque le retuvieron en las dos categorías. La razón es estructural: el empleador proyecta solo el sueldo e ignora los honorarios, y al sumarse ambos el contribuyente sube de tramo. Es la sorpresa más común de marzo, y conviene advertirla en enero para que reserve el dinero.\n3. **Sin la deducción adicional de S/ 10,000, el saldo sería mayor:** esos S/ 10,000 al 14% marginal le ahorraron S/ 1,400. Vale la pena insistir en pagar todo con medios del sistema financiero y exigir comprobantes electrónicos.\n\n**Y una recomendación de planificación legítima:** si sus honorarios son recurrentes, puede evaluar con su empleador que la retención de quinta considere también esa información, o simplemente reservar mensualmente el saldo estimado. Lo que no debe hacer es descubrirlo el 31 de marzo.'}
  ],
  proy:{
   t:'La planilla de tu empresa y sus retenciones de quinta',
   ctx:`Tu empresa tiene trabajadores desde el Módulo 1. Ahora vas a calcular correctamente su retención de quinta categoría, que es una de las obligaciones mensuales que más errores acumula en las MYPES, y a explicarles cómo recuperar dinero con las 3 UIT adicionales.`,
   pasos:[
    'Define la planilla de tu empresa: al menos tres trabajadores con remuneraciones distintas, de modo que al menos uno supere el umbral de las 7 UIT y al menos uno no lo alcance.',
    'Para cada trabajador, proyecta su remuneración anual incluyendo gratificaciones y calcula su impuesto anual con la escala progresiva.',
    'Calcula la retención de enero aplicando el divisor correspondiente, y arma el cuadro de retenciones proyectadas de los doce meses.',
    'Registra el asiento de planilla del mes con la retención de quinta incluida, usando las cuentas de tu plan.',
    'Identifica cuál de tus trabajadores no debe sufrir retención y explica por qué.',
    'Redacta una comunicación de una página para los trabajadores de tu empresa explicando las 3 UIT adicionales: qué gastos sirven, qué condiciones hay que cumplir y cómo recuperan el dinero. Escríbela en lenguaje sencillo, sin tecnicismos.',
    'Simula qué pasaría si uno de tus trabajadores además emitiera recibos por honorarios por S/ 30,000 al año: ¿tendría saldo a favor o por pagar?'
   ],
   entrega:[
    'La planilla con el cálculo del impuesto anual de cada trabajador.',
    'El cuadro de retenciones mensuales proyectadas.',
    'El asiento de planilla con retención.',
    'La comunicación a los trabajadores sobre las 3 UIT.',
    'La simulación del trabajador con rentas de cuarta y quinta.'
   ],
   crit:[
    'La escala se aplicó de forma acumulativa por tramos, no con una tasa única.',
    'La proyección anual incluye las dos gratificaciones.',
    'La comunicación a los trabajadores es entendible por alguien sin formación contable y menciona la condición del medio de pago.'
   ],
   pista:'El error más frecuente al calcular quinta categoría es aplicar la tasa del tramo a toda la renta neta. Si tu cálculo da una tasa efectiva igual a la marginal, revísalo: solo coinciden cuando la renta cae íntegra en el primer tramo.'
  },
  proyInt:{
   t:'El costo tributario total de tu planilla',
   integra:'1.1 a 4.4',
   ctx:`Reúne la planilla con todo lo tributario que has construido. Un dueño quiere saber una sola cosa: cuánto le cuesta realmente cada trabajador y cuánto de eso es impuesto. Vas a responderlo con precisión.`,
   pasos:[
    'Para cada trabajador de tu planilla, construye el cuadro completo: remuneración bruta, aportes del empleador (EsSalud), descuentos del trabajador (pensión y quinta categoría), neto que recibe y costo total para la empresa.',
    'Agrega la provisión mensual de beneficios sociales que ya calculaste en el proyecto de 2.4: gratificaciones, CTS y vacaciones.',
    'Calcula el factor de costo laboral: costo total anual dividido entre la remuneración básica anual. Interprétalo.',
    'Separa en el costo total qué parte va al trabajador, qué parte al Estado y qué parte a las entidades previsionales.',
    'Compara ese costo con el de contratar al mismo perfil como prestador de servicios de cuarta categoría, señalando el ahorro aparente y el riesgo real, con la cuantificación del subtema 4.3.',
    'Calcula cuánto retiene tu empresa al mes en total por todas las categorías: quinta de la planilla, cuarta de los honorarios, segunda de los dividendos si los hubo, y arma el asiento consolidado.',
    'Agrega al manual tributario el capítulo de planilla: cálculo de la retención, plazos y comunicación anual a los trabajadores.'
   ],
   entrega:[
    'El cuadro de costo laboral por trabajador y el factor de costo.',
    'La descomposición del costo entre trabajador, Estado y entidades previsionales.',
    'La comparación con la contratación por honorarios, con el riesgo cuantificado.',
    'El asiento consolidado de retenciones del mes y el capítulo del manual.'
   ],
   crit:[
    'El costo total incluye las provisiones de beneficios sociales, no solo el sueldo y EsSalud.',
    'La comparación con honorarios menciona la contingencia por primacía de la realidad con cifras.',
    'El factor de costo laboral está interpretado, no solo calculado.'
   ],
   pista:'En el régimen general, el factor de costo laboral suele ubicarse alrededor de 1.5 veces el sueldo básico anualizado. Si el tuyo sale mucho más bajo, probablemente olvidaste alguna provisión.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 34, 46, 53 y 75', n:'rentas de quinta categoría, deducción de 7 UIT y 3 UIT adicionales, escala progresiva y retención'},
   {a:'Reglamento de la Ley del Impuesto a la Renta', o:'Artículo 40', n:'procedimiento de cálculo de la retención mensual y los divisores por mes'},
   {a:'Humberto Medrano Cornejo', o:'Derecho Tributario: Impuesto a la Renta, aspectos significativos', n:'progresividad de las rentas de trabajo frente a la tasa plana del capital'},
   {a:'SUNAT', o:'Resoluciones sobre deducción adicional de 3 UIT', n:'gastos comprendidos, porcentajes y requisitos de comprobante y medio de pago'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'naturaleza inafecta de la CTS y de los conceptos indemnizatorios'}
  ]
 },
 {
  id:'m4t5', titulo:'Rentas de no domiciliados y convenios de doble imposición', min:25,
  cont:`Cuando una empresa peruana paga a alguien del exterior, aparece una obligación que muchas MYPES ignoran hasta que les llega el reparo: **retener el Impuesto a la Renta de no domiciliados**. Y cuando existe un convenio para evitar la doble imposición, las reglas cambian. Este subtema cubre los dos escenarios.

# El criterio de domicilio
$ Domiciliado → tributa por su RENTA MUNDIAL (fuente peruana y extranjera)
$ No domiciliado → tributa solo por su RENTA DE FUENTE PERUANA

El artículo 7 fija quiénes son domiciliados:
- Las **personas naturales peruanas** con domicilio en el país, que lo pierden si permanecen **más de 183 días calendario** en el extranjero durante un periodo cualquiera de doce meses y acreditan residencia en otro país.
- Los **extranjeros** que permanezcan más de 183 días en el Perú en un periodo cualquiera de doce meses adquieren la condición de domiciliados **a partir del 1 de enero del ejercicio siguiente**.
- Las **personas jurídicas constituidas en el país**.
- Las sucursales y establecimientos permanentes de empresas del exterior, **respecto de su renta de fuente peruana**.

> El cambio de condición nunca es inmediato ni retroactivo: opera desde el 1 de enero siguiente a que se cumpla el plazo. Esto importa en la práctica para extranjeros que vienen a trabajar al Perú: durante su primer periodo tributan como no domiciliados, con la tasa del 30% sobre sus rentas de trabajo de fuente peruana, sin deducción de 7 UIT, lo que suele sorprenderlos.

# Qué es renta de fuente peruana
El artículo 9 enumera los criterios de conexión. Los más relevantes:

|Tipo de renta|Es fuente peruana cuando…|
|Predios|El inmueble está situado en el país|
|Capitales, intereses|El capital está colocado o es utilizado económicamente en el país, o el pagador es domiciliado|
|Regalías|Los bienes o derechos se utilizan económicamente en el país, o el pagador es domiciliado|
|Dividendos|La empresa que los distribuye es domiciliada|
|Actividades civiles o comerciales|Se llevan a cabo en territorio nacional|
|Rentas de trabajo|El trabajo se realiza en el territorio nacional|
|**Servicios digitales**|Se utilizan económicamente, usan o consumen en el país|
|**Asistencia técnica**|Se utiliza económicamente en el país|

! Los dos últimos son la fuente de los reparos más frecuentes hoy, porque alcanzan a servicios que se prestan íntegramente desde el exterior. Una suscripción a software en la nube, una licencia de plataforma o un servicio de soporte especializado prestado desde otro país pueden generar renta de fuente peruana si se utilizan económicamente aquí, con obligación de retener.

# Las tasas de retención
|Tipo de renta|Tasa (persona jurídica no domiciliada)|
|Dividendos|5%|
|Intereses de préstamos del exterior, cumpliendo los requisitos de la norma|4.99%|
|Intereses cuando hay vinculación o no se cumplen los requisitos|30%|
|Regalías|30%|
|**Asistencia técnica** utilizada económicamente en el país|15%|
|Servicios digitales|30%|
|Ganancias de capital por enajenación de valores dentro del país|5%|
|Otras rentas, incluidas las de actividades no contempladas expresamente|30%|
|Rentas de trabajo de personas naturales no domiciliadas|30%|
|Espectáculos públicos|15%|

La tasa de **asistencia técnica** del 15% exige que el servicio califique como tal según la definición del reglamento y, cuando el importe supera determinado umbral en UIT, que se cuente con un **informe de una firma de auditores** que certifique la prestación efectiva del servicio. Sin ese informe, la tasa aplicable es la general.

# Renta neta presunta: el artículo 48
Para ciertas actividades que se realizan parte en el país y parte en el exterior, la ley presume la renta neta de fuente peruana en un porcentaje de los ingresos brutos:

|Actividad|Renta neta presunta|
|Transporte entre el Perú y el extranjero|1% (aéreo) o 2% (marítimo) de los ingresos brutos|
|Seguros|7% de las primas|
|Cesión de naves y aeronaves|80% y 60% de los ingresos brutos, respectivamente|
|Servicios de telecomunicaciones entre el país y el extranjero|5% de los ingresos brutos|
|Noticias internacionales, películas y similares|10% a 20% según el caso|

La tasa se aplica sobre esa renta neta presunta, no sobre el ingreso bruto.

# La obligación de retener
El artículo 76 obliga a quien **pague o acredite** rentas de fuente peruana a un no domiciliado a retener y abonar al fisco el impuesto. La retención se efectúa en el momento del pago o acreditación, lo que ocurra primero.

$ Retención = Renta de fuente peruana × tasa aplicable

Si la empresa peruana **asume** el impuesto en lugar de retenerlo —lo que ocurre cuando se pacta un precio neto con el proveedor del exterior— debe hacer el cálculo "al revés" para determinar la base, y el impuesto asumido no es deducible, salvo en los supuestos que la norma permite.

@ Pago de asistencia técnica a un proveedor del exterior por US$ 10,000 (TC 3.80), tasa 15%
@ 63|6322 Asesoría|38,000.00|
@ 40|4018 Impuesto a la Renta - No domiciliados||5,700.00
@ 46|4699 Otras cuentas por pagar diversas||32,300.00

# El IGV por utilización de servicios
Hay un segundo impuesto que suele olvidarse. Cuando una empresa peruana utiliza en el país un servicio prestado por un no domiciliado, debe pagar el **IGV por utilización de servicios**: es ella misma la contribuyente, no el proveedor. Paga el 18% y, cumplidos los requisitos, lo usa como **crédito fiscal** a partir del periodo en que efectúa el pago del impuesto.

$ IGV por utilización de servicios = Retribución × 18%, pagado por la empresa usuaria
$ Se usa como crédito fiscal desde el periodo en que se paga

# Los convenios para evitar la doble imposición (CDI)
Un mismo ingreso puede ser gravado en el país de la fuente y en el de residencia del perceptor. Los CDI reparten la potestad tributaria entre los dos Estados, siguiendo en general el **Modelo de Convenio de la OCDE**.

El Perú tiene convenios bilaterales en vigor con **Chile, Canadá, Brasil, México, Corea del Sur, Suiza, Portugal y Japón**, y además aplica la **Decisión 578 de la Comunidad Andina** con Bolivia, Colombia y Ecuador. La lista cambia conforme se negocian y entran en vigor nuevos convenios, así que debe verificarse al momento de aplicarla.

|Mecanismo del CDI|Qué hace|
|Reparto de potestad|Define qué Estado grava cada tipo de renta|
|Tasas máximas|Limita la retención en la fuente para dividendos, intereses y regalías|
|Establecimiento permanente|Define cuándo una presencia en el otro Estado permite gravar beneficios empresariales|
|Métodos para eliminar la doble imposición|Crédito o exención en el país de residencia|
|No discriminación y procedimiento amistoso|Garantías para el contribuyente|

> La **Decisión 578 de la CAN** sigue un modelo distinto: aplica el principio de **fuente exclusiva**, de modo que la renta se grava solo en el país donde se genera y queda exonerada en el otro. Es más simple que los convenios tipo OCDE y conviene conocerlo, porque las operaciones con Colombia, Ecuador y Bolivia son frecuentes.

! Para aplicar la tasa reducida de un CDI, el beneficiario debe acreditar su residencia en el otro Estado con un **certificado de residencia** vigente, emitido por su autoridad tributaria, al momento de la retención. Sin ese certificado, corresponde aplicar la tasa de la ley interna. Es un requisito formal que cuesta caro olvidar: la diferencia entre retener 15% y 30% sobre un pago grande puede ser decenas de miles de soles, y una vez retenido de menos, la responsabilidad es de la empresa peruana.`,
  claves:['Los domiciliados tributan por renta mundial; los no domiciliados solo por renta de fuente peruana.','Un extranjero adquiere domicilio tras 183 días en el país, pero recién desde el 1 de enero siguiente.','Tasas clave: dividendos 5%, asistencia técnica 15%, servicios digitales y regalías 30%, intereses 4.99% si se cumplen los requisitos.','Quien paga o acredita la renta debe retener; además, el usuario paga el IGV por utilización de servicios y lo usa como crédito.','Para aplicar la tasa reducida de un CDI se exige certificado de residencia vigente al momento de la retención.'],
  preg:[
   {p:'¿Por qué un extranjero que lleva ocho meses trabajando en el Perú sigue tributando como no domiciliado?',
    r:'Porque el cambio de condición no opera al cumplirse los 183 días, sino a partir del **1 de enero del ejercicio siguiente** a aquel en que se cumple el plazo. La norma busca estabilidad: si la condición cambiara a mitad de año, habría que aplicar dos regímenes distintos dentro del mismo ejercicio, con reglas, tasas y deducciones diferentes. Mientras siga siendo no domiciliado, sus rentas de trabajo de fuente peruana se gravan con el 30% sin deducción de 7 UIT, lo que hace que su carga efectiva sea mucho mayor que la de un domiciliado con el mismo sueldo.'},
   {p:'Una empresa peruana contrata una suscripción a un software en la nube de un proveedor estadounidense. ¿Hay obligación de retener?',
    r:'Hay que analizarlo con cuidado, porque la respuesta depende de la calificación del servicio. Si se trata de un **servicio digital** utilizado económicamente en el país, genera renta de fuente peruana y corresponde retener con la tasa general del 30%. Si en cambio califica como **regalía** por el uso de un software, la tasa también es 30% pero el fundamento es otro. Y si hubiera un CDI aplicable con certificado de residencia, podría haber una tasa límite menor o incluso una atribución exclusiva al otro Estado. Además, en paralelo surge el IGV por utilización de servicios, que paga la propia empresa peruana. Es uno de los puntos donde más empresas incumplen sin saberlo.'},
   {p:'¿Qué diferencia hay entre retener el impuesto y asumirlo?',
    r:'Retener significa descontar el impuesto del pago al proveedor del exterior: el proveedor recibe menos y el impuesto sale de su bolsillo. Asumirlo significa que la empresa peruana paga al proveedor el monto pactado íntegro y, además, entrega el impuesto al fisco de su propio bolsillo, lo que ocurre cuando se pacta un precio "neto" o "libre de impuestos". Asumir encarece la operación y, como regla general, el impuesto asumido no es deducible para la empresa peruana, salvo en los supuestos que la norma admite. Por eso la cláusula de impuestos de un contrato internacional no es un detalle legal: define quién soporta un costo que puede llegar al 30%.'},
   {p:'¿Para qué sirve el certificado de residencia y qué pasa si llega después de hacer el pago?',
    r:'Sirve para acreditar que el beneficiario es residente del otro Estado contratante y, por tanto, que puede invocar el convenio y su tasa reducida. Debe estar vigente al momento de la retención. Si la empresa peruana retiene con la tasa del CDI sin tener el certificado y después no lo obtiene, queda expuesta a que SUNAT exija la diferencia con la tasa de la ley interna, con intereses y multa, y esa diferencia ya no se le puede descontar al proveedor. La práctica correcta es condicionar el pago a la entrega previa del certificado, igual que se condiciona a la factura.'},
   {p:'¿En qué se diferencia la Decisión 578 de la CAN de un convenio tipo OCDE?',
    r:'En el criterio de atribución. Los convenios tipo OCDE reparten la potestad: el Estado de la fuente puede gravar con tasas limitadas y el de residencia también grava, eliminando la doble imposición mediante crédito o exención. La Decisión 578 aplica el principio de **fuente exclusiva**: la renta se grava únicamente en el país donde se genera y queda exonerada en el otro, sin necesidad de créditos. Es más simple de aplicar y, para operaciones entre países andinos, puede significar que una renta no soporte retención alguna en el Perú si la fuente se ubica en el otro país miembro.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una empresa peruana paga S/ 50,000 por asistencia técnica a una empresa del exterior, con el informe de auditores que exige la norma. ¿Cuánto retiene?',
    u:'S/',r:7500,tol:1,
    s:'Retención = 50,000 × 15% = **S/ 7,500**\n\nLa tasa del 15% aplica a la asistencia técnica utilizada económicamente en el país, siempre que el servicio califique como tal según la definición del reglamento y, cuando el importe supera el umbral establecido, se cuente con el informe de una firma de auditores que certifique la prestación efectiva. Sin ese informe, la tasa sería la general del 30%, es decir S/ 15,000: el informe vale S/ 7,500 en este caso.\n\nAdemás corresponde pagar el IGV por utilización de servicios: 50,000 × 18% = S/ 9,000, que la empresa usuaria paga y luego usa como crédito fiscal.'},
   {l:1,t:'mc',p:'Un ciudadano peruano vive y trabaja en España desde hace tres años, acreditando residencia allá. ¿Cómo tributa en el Perú?',
    o:['Por su renta mundial, porque es peruano','Solo por sus rentas de fuente peruana, porque perdió la condición de domiciliado','No tributa en absoluto','Por el 50% de sus rentas'],r:1,
    s:'Solo por sus rentas de fuente peruana. Perdió la condición de domiciliado al permanecer más de 183 días en el extranjero en un periodo de doce meses y acreditar residencia en otro país. Si conserva un departamento alquilado en Lima, esa renta de primera categoría es de fuente peruana y tributa aquí con la tasa de no domiciliados; su sueldo en España no es de fuente peruana y no tributa en el Perú. La nacionalidad no determina la condición de domiciliado: lo hace la permanencia.'},
   {l:2,t:'num',p:'Una naviera extranjera obtiene ingresos brutos por S/ 2,000,000 por transporte marítimo entre el Perú y el extranjero. ¿Cuánto es el impuesto a retener?',
    u:'S/',r:12000,tol:100,
    s:'El artículo 48 presume que la renta neta de fuente peruana del transporte marítimo entre el país y el extranjero es el **2% de los ingresos brutos**:\nRenta neta presunta = 2,000,000 × 2% = S/ 40,000\n\nSobre esa renta neta se aplica la tasa de no domiciliados del 30%:\n**Impuesto = 40,000 × 30% = S/ 12,000**\n\nEl error típico es aplicar el 30% sobre los ingresos brutos (S/ 600,000), que es cincuenta veces más. La presunción existe porque la actividad se realiza parte en el país y parte fuera, y sería imposible determinar con precisión qué porción de la renta corresponde a territorio peruano.'},
   {l:2,t:'ab',p:'Una empresa peruana va a pagar US$ 40,000 (TC 3.80) por regalías de uso de marca a una empresa chilena. Analiza el tratamiento con y sin certificado de residencia.',
    s:'**Base de la operación:** 40,000 × 3.80 = **S/ 152,000**\n\n**Escenario A — Sin certificado de residencia**\nSe aplica la tasa de la ley interna para regalías pagadas a no domiciliados: **30%**\nRetención = 152,000 × 30% = **S/ 45,600**\n\n**Escenario B — Con certificado de residencia vigente, invocando el CDI Perú-Chile**\nEl convenio establece una **tasa máxima en la fuente** para regalías, menor que la de la ley interna. Aplicando el límite del convenio (15% en el caso de las regalías bajo ese CDI):\nRetención = 152,000 × 15% = **S/ 22,800**\n\n**Diferencia: S/ 22,800**, es decir, el certificado de residencia vale casi veintitrés mil soles en una sola operación.\n\n**Requisitos para que el escenario B funcione:**\n\n1. **Certificado de residencia vigente** emitido por el Servicio de Impuestos Internos de Chile, en poder de la empresa peruana **al momento de la retención**, no después.\n2. Que el beneficiario sea el **beneficiario efectivo** de la regalía, no un intermediario interpuesto para acceder al convenio.\n3. Que la operación esté correctamente calificada como regalía según el convenio.\n\n**Además, en ambos escenarios:**\n- Corresponde el **IGV por utilización de servicios** si el supuesto encaja, que paga la propia empresa peruana y luego usa como crédito fiscal.\n- La operación es con una **empresa del exterior**: si además fueran partes vinculadas, se aplican las reglas de precios de transferencia y el valor debe estar a valor de mercado.\n\n**El procedimiento correcto:** condicionar el pago a la entrega previa del certificado, igual que se condiciona a la factura. Si el proveedor no lo entrega, se retiene el 30% y se le explica por qué; recuperarlo después es, en la práctica, muy difícil.'},
   {l:3,t:'ab',p:'Una empresa peruana paga durante 2026: US$ 15,000 de licencias de software a una empresa de Estados Unidos; US$ 8,000 de consultoría a un especialista mexicano que trabajó dos semanas en Lima; y US$ 25,000 de intereses por un préstamo de un banco español no vinculado. Tipo de cambio 3.80. Analiza las obligaciones de retención.',
    s:'**Operación 1 — Licencias de software, Estados Unidos: S/ 57,000**\n\nEstados Unidos **no tiene CDI vigente con el Perú**, así que se aplica íntegramente la ley interna.\nLa calificación es clave: si el pago constituye **regalía** por el uso del software, la tasa es 30%; si califica como **servicio digital** utilizado económicamente en el país, también 30%. En ambos casos:\n**Retención = 57,000 × 30% = S/ 17,100**\n\nAdemás, **IGV por utilización de servicios** = 57,000 × 18% = S/ 10,260, que paga la empresa peruana y usa como crédito fiscal desde el periodo del pago.\n\n**Operación 2 — Consultoría de un especialista mexicano que trabajó en Lima: S/ 30,400**\n\nEl trabajo se realizó **en territorio nacional**, por lo que es renta de fuente peruana de forma incuestionable. Se trata de una persona natural no domiciliada que presta servicios independientes.\nTasa de la ley interna para rentas de no domiciliados en este supuesto: **30%**.\nRetención = 30,400 × 30% = **S/ 9,120**\n\nPero existe **CDI Perú-México**: habría que analizar el artículo de servicios personales independientes o de beneficios empresariales según corresponda, y verificar si la permanencia de dos semanas y la ausencia de base fija en el Perú permiten que la renta tribute solo en México. **Con certificado de residencia mexicano**, la retención podría no proceder o reducirse según lo que establezca el convenio. Sin certificado, se retiene el 30%.\n\n**Operación 3 — Intereses a un banco español no vinculado: S/ 95,000**\n\nEspaña **no tiene CDI en vigor con el Perú** (el convenio suscrito no llegó a entrar en vigencia), así que se aplica la ley interna.\nLa tasa de **4.99%** aplica a los intereses por créditos externos siempre que se cumplan los requisitos de la norma, entre ellos que el crédito se destine a los fines previstos, que ingrese al país o se destine a operaciones del exterior admitidas, que no exista vinculación entre las partes y que la tasa de interés no exceda el límite establecido.\nSi se cumplen: retención = 95,000 × 4.99% = **S/ 4,740.50**\nSi no se cumplen, o si hubiera vinculación: 95,000 × 30% = S/ 28,500.\n\n**Resumen de obligaciones**\n\n| Operación | Base | Tasa | Retención | IGV servicios |\n|---|---|---|---|---|\n| Licencias EE.UU. | 57,000 | 30% | 17,100 | 10,260 |\n| Consultoría México (sin CDI acreditado) | 30,400 | 30% | 9,120 | 5,472 |\n| Intereses España (requisitos cumplidos) | 95,000 | 4.99% | 4,740.50 | — |\n| **Total a retener** | | | **30,960.50** | |\n\n**Las cuatro acciones concretas que debe tomar la empresa:**\n\n1. **Solicitar el certificado de residencia mexicano** antes de pagar la consultoría: puede ahorrar S/ 9,120.\n2. **Documentar el cumplimiento de los requisitos** del 4.99% en el préstamo: la diferencia con el 30% es de S/ 23,760.\n3. **Calificar correctamente el pago de software**: regalía o servicio digital tienen la misma tasa aquí, pero la calificación afecta la documentación y el tratamiento del IGV.\n4. **No olvidar el IGV por utilización de servicios**: es un impuesto que la propia empresa debe pagar y declarar, y que muchas MYPES descubren recién en una fiscalización, cuando ya corresponde pagarlo con intereses y sin posibilidad de usar el crédito de periodos prescritos.'}
  ],
  proy:{
   t:'Las operaciones con el exterior de tu empresa',
   ctx:`Hoy casi ninguna empresa está aislada del exterior: paga software, licencias, publicidad en plataformas, comisiones a marketplaces o asesorías. Vas a mapear esas operaciones en tu empresa y determinar las obligaciones que generan.`,
   pasos:[
    'Identifica al menos tres pagos al exterior que tu empresa haría de forma realista: software o plataformas, un servicio profesional, una comisión o una licencia.',
    'Para cada uno, determina si genera renta de fuente peruana y con qué criterio de conexión del artículo 9.',
    'Determina la tasa de retención aplicable según la ley interna, y verifica si el país del proveedor tiene CDI vigente con el Perú.',
    'Calcula la retención en los dos escenarios: con y sin certificado de residencia, y cuantifica la diferencia.',
    'Determina el IGV por utilización de servicios que corresponda y explica cuándo podría usarse como crédito fiscal.',
    'Registra los asientos de una de las operaciones: devengo, retención, IGV por utilización y pago.',
    'Redacta la cláusula de impuestos que tu empresa debería incluir en sus contratos con proveedores del exterior: quién asume la retención, obligación de entregar certificado de residencia y consecuencia de no hacerlo.'
   ],
   entrega:[
    'El mapa de operaciones con el exterior y su criterio de fuente.',
    'El cálculo de retenciones en ambos escenarios con la diferencia cuantificada.',
    'El cálculo del IGV por utilización de servicios.',
    'Los asientos de una operación completa y la cláusula contractual.'
   ],
   crit:[
    'Cada operación tiene identificado el criterio de conexión del artículo 9, no solo la tasa.',
    'El IGV por utilización de servicios está calculado e identificado como obligación propia de la empresa, no del proveedor.',
    'La cláusula contractual condiciona el pago a la entrega del certificado de residencia.'
   ],
   pista:'La operación con el exterior que más empresas peruanas omiten es la publicidad en plataformas digitales. Revisa si tu empresa pagaría por ese concepto y analiza su tratamiento: es un caso real y frecuente.'
  },
  proyInt:{
   t:'Expediente tributario integral de tu empresa',
   integra:'1.1 a 4.5',
   ctx:`Este proyecto cierra el Módulo 4 y consolida toda la dimensión tributaria de tu empresa: lo que paga como contribuyente y lo que retiene como agente, en las cinco categorías de renta y en el IGV.`,
   pasos:[
    'Arma la matriz completa de tu empresa: filas con cada tipo de operación (venta, compra local, compra al exterior, alquiler, honorarios, planilla, dividendos) y columnas con tributo, base, tasa, quién lo paga, cuándo y en qué formulario.',
    'Separa claramente dos roles: tu empresa como **contribuyente** (IGV, renta de tercera, ITAN) y como **agente de retención** (quinta, cuarta, segunda, no domiciliados).',
    'Calcula el total de obligaciones tributarias de un mes típico de tu empresa, sumando ambos roles, y compáralo con su utilidad mensual.',
    'Construye el calendario mensual definitivo con todas las fechas según el último dígito del RUC que asignaste.',
    'Actualiza la matriz de riesgos tributarios de los módulos anteriores con los riesgos nuevos de este módulo: retención a no domiciliados omitida, IGV por utilización no pagado, certificado de residencia faltante, cuarta categoría que debió ser quinta.',
    'Escribe el informe final de dos páginas para el dueño: carga tributaria total de la empresa, los tres riesgos principales con su costo potencial y las tres acciones prioritarias.',
    'Integra todo en el manual contable-tributario que vienes construyendo desde 1.2, con índice actualizado.'
   ],
   entrega:[
    'La matriz tributaria completa con los dos roles separados.',
    'El cálculo de la carga mensual total y el calendario definitivo.',
    'La matriz de riesgos actualizada con los riesgos de operaciones con el exterior.',
    'El informe final de dos páginas.',
    'El manual integrado con índice actualizado.'
   ],
   crit:[
    'La matriz distingue con claridad cuándo la empresa paga tributo propio y cuándo retiene tributo ajeno.',
    'Todos los riesgos nuevos están cuantificados en soles.',
    'El informe prioriza: dice cuáles son las tres acciones que hay que hacer primero y por qué.'
   ],
   pista:'La distinción entre contribuyente y agente de retención no es académica: el dinero que se retiene nunca fue de la empresa. Gastarlo antes de pagarlo al fisco, algo frecuente cuando hay apuros de caja, convierte un problema de liquidez en una apropiación con consecuencias penales.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 6, 7, 9, 48, 54, 56 y 76', n:'criterio de domicilio, rentas de fuente peruana, presunciones, tasas y obligación de retener'},
   {a:'OCDE', o:'Modelo de Convenio Tributario sobre la Renta y el Patrimonio', n:'estructura de los convenios, establecimiento permanente y métodos para eliminar la doble imposición'},
   {a:'Comunidad Andina', o:'Decisión 578, Régimen para evitar la doble tributación', n:'principio de fuente exclusiva aplicable entre Perú, Bolivia, Colombia y Ecuador'},
   {a:'Humberto Medrano Cornejo', o:'Derecho Tributario: Impuesto a la Renta, aspectos significativos', n:'criterios de vinculación y tratamiento de los no domiciliados'},
   {a:'TUO de la Ley del IGV', o:'Utilización de servicios prestados por no domiciliados', n:'quién es el contribuyente y cuándo puede usarse el crédito fiscal'}
  ]
 }
 ]
}
);
