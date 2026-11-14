/* Contenido del curso — m3 · IGV, regímenes tributarios y renta empresarial
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
 id:'m3', nivel:'Intermedio', titulo:'IGV, regímenes tributarios y renta empresarial',
 resumen:'La tributación que atraviesa todo registro contable: estructura del IGV, sistemas administrativos, elección de régimen y determinación de la renta de tercera categoría.',
 temas:[
 {
  id:'m3t1', titulo:'IGV: estructura, nacimiento de la obligación y crédito fiscal', min:26,
  cont:`El Impuesto General a las Ventas es un impuesto **plurifásico no acumulativo** que grava el valor agregado en cada etapa de la cadena. "Plurifásico" porque se aplica en todas las fases de producción y comercialización; "no acumulativo" porque cada agente descuenta el impuesto que ya pagó al comprar. Walker Villanueva, en su ~Tratado del IGV~, explica que el Perú adoptó el método de **sustracción sobre base financiera, impuesto contra impuesto**: no se calcula el valor agregado económico de cada empresa, sino que se resta el impuesto de las compras del impuesto de las ventas del mismo periodo.

$ IGV por pagar del mes = Débito fiscal (ventas) − Crédito fiscal (compras)

La consecuencia práctica de esa elección es enorme: la empresa **no paga el IGV, lo recauda**. Contablemente nunca es gasto ni ingreso, siempre es pasivo o activo. Quien lo soporta es el consumidor final, que no tiene a quién trasladarlo.

$ Tasa total 18% = 16% de IGV + 2% de Impuesto de Promoción Municipal

# Las cinco operaciones gravadas
El artículo 1 de la Ley del IGV grava exactamente cinco hechos:

|Operación|Precisión|
|**Venta de bienes muebles en el país**|Todo acto que transfiera propiedad a título oneroso, incluidos permutas, daciones en pago y retiros de bienes|
|**Prestación o utilización de servicios en el país**|Prestación: el prestador está domiciliado. Utilización: el prestador es no domiciliado pero el servicio se consume aquí|
|**Contratos de construcción**|Ejecutados en el territorio nacional, cualquiera sea su denominación|
|**Primera venta de inmuebles** por el constructor|Solo la primera; la segunda venta ya no está gravada. La base excluye el valor del terreno|
|**Importación de bienes**|Cualquiera sea el sujeto que la realice, incluso una persona natural sin RUC|

! El **retiro de bienes** es la figura que más sorprende: cuando la empresa saca mercadería para consumo propio, la regala, la entrega como premio o la destina a sus socios, se considera venta y genera IGV, aunque no haya cobrado nada. El impuesto se calcula sobre el valor de mercado y **no es gasto deducible** para el Impuesto a la Renta. Existen excepciones, como las entregas con fines promocionales dentro de ciertos límites y las muestras médicas, pero la regla general es que lo que sale sin factura igual paga IGV.

# Cuándo nace la obligación: el artículo 4
No basta saber que una operación está gravada; hay que saber **en qué mes**. El artículo 4 de la Ley del IGV fija el nacimiento:

|Operación|Nace en la fecha que ocurra primero|
|Venta de bienes|La emisión del comprobante (o la fecha en que debió emitirse) o la entrega del bien|
|Prestación de servicios|La emisión del comprobante (o la fecha en que debió emitirse) o la percepción de la retribución|
|Contratos de construcción|La percepción del ingreso (total o parcial) o la emisión del comprobante|
|Primera venta de inmuebles|La percepción del ingreso, por el monto percibido|
|Importación|La numeración de la declaración aduanera|
|Utilización de servicios de no domiciliados|La anotación del comprobante en el Registro de Compras o el pago de la retribución|

> Esta regla explica por qué un **anticipo cobrado** genera IGV aunque todavía no se haya entregado nada: se percibió la retribución, nació la obligación, y hay que emitir comprobante y declarar el impuesto. Contablemente ese anticipo es un pasivo, no un ingreso (NIIF 15), y esa divergencia entre el momento contable y el tributario es normal, no un error.

# Base imponible
$ Base imponible = Valor de venta = Precio total − IGV
$ IGV = Base × 18%
$ Para extraer el IGV de un precio final: IGV = Total × 18/118 = Total × 0.152542

|Dato que tienes|Cálculo|Ejemplo|
|Base imponible|IGV = Base × 0.18|Base 1,000 → IGV 180 → Total 1,180|
|Precio con IGV|Base = Total ÷ 1.18|Total 1,180 → Base 1,000|
|Precio con IGV|IGV = Total × 0.152542|1,180 × 0.152542 = 180|

! Error frecuentísimo: calcular el IGV como el 18% del precio final. 1,180 × 18% = 212.40, que está mal. El 18% se aplica sobre la base, no sobre el total.

La base incluye los **cargos accesorios**: fletes, seguros, gastos de financiamiento y comisiones cobrados al comprador en la misma operación. Excluye los descuentos otorgados que consten en el comprobante y sean usuales en el mercado.

# El crédito fiscal: requisitos sustanciales y formales
El artículo 18 fija los requisitos **sustanciales**, que son de fondo y no se subsanan:
1. Que la adquisición sea permitida como **gasto o costo** para el Impuesto a la Renta.
2. Que se destine a **operaciones gravadas** con el IGV.

El artículo 19, complementado por la Ley 29215, fija los **formales**:
1. Comprobante que discrimine el IGV y cumpla el reglamento.
2. Emisor con RUC activo y habido a la fecha de emisión.
3. **Anotación en el Registro de Compras** dentro del plazo: hasta los doce meses siguientes a la emisión.
4. Si la operación está sujeta a detracción, haber efectuado el depósito.
5. Si la obligación supera el límite, haber usado medio de pago (bancarización).

> La distinción entre sustancial y formal no es académica: un defecto formal subsanable (por ejemplo, que el comprobante no consigne un dato) puede salvarse si se acredita la operación y el pago por medios que la norma admite, mientras que un defecto sustancial —una compra destinada a operaciones no gravadas— no tiene salvación posible.

# La prorrata del crédito fiscal
Una empresa con operaciones gravadas y no gravadas no puede usar todo su crédito. El método tiene tres cestas, y el Registro de Compras **debe llevarse en tres columnas separadas**:

|Cesta|Destino de la adquisición|Crédito utilizable|
|1|Exclusivamente a operaciones gravadas y exportaciones|100%|
|2|Exclusivamente a operaciones no gravadas|0%|
|3|De uso común|Según el coeficiente|

$ Coeficiente = (Ventas gravadas + exportaciones de los últimos 12 meses) ÷ (Ventas totales de los últimos 12 meses)

! Si la empresa **no discrimina** sus compras en las tres columnas, SUNAT puede exigir aplicar la prorrata sobre **todo** el crédito, incluido el de uso exclusivo en operaciones gravadas. La forma de llevar el registro vale dinero real.

# El reintegro del crédito fiscal
Hay casos en que el crédito ya usado debe devolverse:
- **Venta de activo fijo antes de los dos años** de haberlo puesto en funcionamiento y a un precio menor al de adquisición: se reintegra la diferencia proporcional.
- **Desaparición, destrucción o pérdida de bienes** cuya adquisición generó crédito fiscal, salvo caso fortuito, fuerza mayor, delito acreditado o mermas y desmedros debidamente acreditados.
- **Nulidad, anulación o rescisión** de contratos.

El reintegro se resta del crédito fiscal del mes en que ocurre el hecho.

# Ajustes: notas de crédito y de débito
|Documento|Efecto en el emisor|Efecto en el receptor|
|Nota de crédito|Reduce el débito fiscal|Reduce el crédito fiscal|
|Nota de débito|Aumenta el débito fiscal|Aumenta el crédito fiscal|

Ambas deben anotarse en el periodo en que se emiten y hacer referencia al comprobante que modifican.

# La liquidación mensual, paso a paso
Empresa comercial, periodo mayo 2026:

|Concepto|Base|IGV|
|Ventas gravadas|260,000|46,800|
|Compras de mercadería|150,000|27,000|
|Servicios (luz, agua, alquiler, fletes)|32,000|5,760|
|Compra de una camioneta|85,000|15,300|
|Crédito fiscal arrastrado de abril|—|3,400|

$ Débito fiscal:              46,800
$ Crédito del mes:            27,000 + 5,760 + 15,300 = 48,060
$ Crédito arrastrado:          3,400  →  crédito total 51,460
$ Resultado: 46,800 − 51,460 = (4,660) → crédito a arrastrar a junio

En este mes no se paga IGV y se arrastran S/ 4,660 por la compra del activo fijo. El crédito no utilizado **se arrastra sin límite de tiempo**, hasta agotarlo; no se pierde por el paso de los meses, a diferencia del plazo de doce meses para anotar el comprobante.

@ Pago del IGV de un mes con resultado deudor por S/ 8,200
@ 40|40111 IGV - Cuenta propia|8,200.00|
@ 10|1041 Cuentas corrientes operativas||8,200.00

# Declaración y plazos
El IGV se declara mensualmente junto con el pago a cuenta del Impuesto a la Renta en el **Formulario Virtual 621**, según el cronograma de vencimientos que SUNAT publica cada año en función del último dígito del RUC. Declarar fuera de plazo es infracción del numeral 1 del artículo 176 del Código Tributario; pagar fuera de plazo genera intereses moratorios diarios.`,
  claves:['El IGV es plurifásico no acumulativo, con método de impuesto contra impuesto: la empresa lo recauda, no lo paga.','Cinco operaciones gravadas, incluido el retiro de bienes, que paga IGV aunque no haya cobro y no es gasto deducible.','El artículo 4 fija el nacimiento de la obligación: en servicios, lo que ocurra primero entre comprobante y percepción.','Crédito fiscal: requisitos sustanciales (gasto deducible y destino gravado) y formales (comprobante, registro, detracción, bancarización).','Con operaciones gravadas y no gravadas hay prorrata y el Registro de Compras debe llevarse en tres columnas separadas.'],
  preg:[
   {p:'¿Por qué se dice que el IGV lo soporta el consumidor final y no la empresa, si es la empresa la que paga a SUNAT?',
    r:'Porque cada empresa de la cadena traslada el impuesto al siguiente comprador y descuenta el que le trasladaron. Su desembolso neto es solo el impuesto sobre el valor que ella agregó, y ese importe lo recuperó al cobrarle al cliente. El consumidor final es el único que no puede trasladarlo ni descontarlo, porque no vende nada después, así que soporta el 18% completo acumulado en la cadena. La empresa actúa como recaudador: por eso el IGV nunca es gasto ni ingreso en sus libros, salvo cuando pierde el derecho al crédito.'},
   {p:'Una empresa regala mercadería a sus clientes en una campaña. ¿Hay IGV si no cobró nada?',
    r:'Sí, por la figura del retiro de bienes: la ley lo considera venta y lo grava sobre el valor de mercado, aunque no haya contraprestación. La lógica es evitar que el consumo final escape del impuesto simplemente porque no hubo precio. Hay excepciones acotadas, como las entregas promocionales dentro de los límites que fija el reglamento y las muestras médicas, por lo que vale la pena revisarlas antes de una campaña. Y un detalle que duele: ese IGV asumido por la empresa no es gasto deducible para el Impuesto a la Renta.'},
   {p:'Un cliente paga un anticipo del 40% en diciembre por un servicio que se prestará en marzo. ¿Qué pasa con el IGV y con el ingreso contable?',
    r:'Se separan. Para el IGV, la percepción de la retribución hace nacer la obligación en diciembre: hay que emitir comprobante y declarar el impuesto de ese mes. Para la contabilidad, bajo NIIF 15 no hay ingreso porque la obligación de desempeño no se ha satisfecho: el cobro es un pasivo por contrato. Así que en diciembre el balance muestra efectivo, un pasivo con el cliente y un pasivo con SUNAT por el IGV, y el Estado de Resultados no muestra nada. Es una divergencia normal entre la regla tributaria y la contable.'},
   {p:'¿Qué diferencia práctica hay entre un requisito sustancial y uno formal del crédito fiscal?',
    r:'El sustancial define si existe el derecho: si la compra no es deducible para Renta o no se destina a operaciones gravadas, no hay crédito y nada lo arregla. El formal define cómo se ejerce ese derecho: comprobante, anotación, detracción, medio de pago. La norma ha ido admitiendo que ciertos defectos formales se subsanen si se acredita la realidad de la operación y su pago, precisamente porque el derecho ya existía. La distinción importa al defender un reparo: ante un defecto formal se argumenta subsanación; ante uno sustancial, no hay argumento.'},
   {p:'Una empresa compra una camioneta y en ese mes su crédito fiscal supera al débito. ¿Pierde el exceso?',
    r:'No. El crédito no utilizado se arrastra a los meses siguientes sin límite de tiempo, hasta agotarlo contra futuros débitos. Lo que sí tiene plazo es la **anotación** del comprobante en el Registro de Compras, que debe hacerse dentro de los doce meses siguientes a su emisión; pasado ese plazo se pierde el derecho. Son dos cosas distintas que se confunden a menudo: el plazo para anotar es corto, el arrastre del saldo es indefinido. Lo que sí conviene vigilar es un arrastre que crece mes tras mes durante un año, porque es señal de compras desproporcionadas frente a las ventas y SUNAT lo revisa.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una factura muestra un total de S/ 4,720 incluido IGV. ¿Cuánto es el IGV?',
    u:'S/',r:720,tol:1,
    s:'Base = 4,720 ÷ 1.18 = S/ 4,000.00\nIGV = 4,000 × 18% = **S/ 720.00**\n\nAtajo: 4,720 × 18/118 = 4,720 × 0.152542 = S/ 720.\n\nEl error típico sería 4,720 × 18% = S/ 849.60, que sobrestima el impuesto en S/ 129.60 y descuadra el asiento.'},
   {l:1,t:'mc',p:'Una clínica presta servicios de salud exonerados y compra insumos médicos con IGV. ¿Qué hace con ese IGV?',
    o:['Lo usa como crédito fiscal normalmente','Lo pierde como crédito y lo incorpora al costo o gasto','Pide su devolución a SUNAT','Lo registra como ingreso'],r:1,
    s:'No puede usarlo como crédito fiscal porque las adquisiciones no se destinan a operaciones gravadas: falla un requisito sustancial. El IGV pasa a formar parte del costo del insumo o del gasto. Ese es el efecto económico de una exoneración: el contribuyente no cobra IGV, pero tampoco recupera el que paga, por lo que el impuesto se le queda como costo. Si además tuviera operaciones gravadas, como la venta de medicamentos en farmacia propia, tendría que aplicar prorrata.'},
   {l:2,t:'num',p:'Junio: ventas gravadas S/ 180,000 (base); compras gravadas S/ 95,000 (base); servicios S/ 22,000 (base); crédito arrastrado S/ 2,100. ¿Cuánto IGV paga?',
    u:'S/',r:9240,tol:1,
    s:'Débito fiscal = 180,000 × 18% = S/ 32,400\nCrédito del mes = (95,000 + 22,000) × 18% = S/ 21,060\nCrédito arrastrado = S/ 2,100 → crédito total S/ 23,160\n\n**IGV por pagar = 32,400 − 23,160 = S/ 9,240**\n\nSi tu resultado fue S/ 11,340, olvidaste aplicar el crédito arrastrado, que está en el saldo deudor de la cuenta 40111 y es tan aplicable como el crédito del mes.'},
   {l:2,t:'ab',p:'Una empresa vende alimentos sin procesar (exonerados) y procesados (gravados). Año móvil: ventas gravadas S/ 600,000 y exoneradas S/ 400,000. En el mes tiene crédito de compras comunes por S/ 9,000 y de compras destinadas solo a lo gravado por S/ 25,000. ¿Cuánto crédito puede usar?',
    s:'**Paso 1 — Crédito de uso exclusivo en operaciones gravadas:** se usa al 100% → **S/ 25,000**.\n\n**Paso 2 — Coeficiente de prorrata** para las compras de uso común:\nCoeficiente = 600,000 ÷ 1,000,000 = **0.60 (60%)**\nLa norma manda calcularlo con los últimos doce meses, incluido el mes que se liquida, y expresarlo con dos decimales.\n\n**Paso 3 — Crédito de compras comunes:**\n9,000 × 60% = **S/ 5,400**\nLos S/ 3,600 restantes no son crédito: se van al costo o al gasto.\n\n**Crédito fiscal total utilizable = 25,000 + 5,400 = S/ 30,400**\n\n**El requisito operativo que decide el resultado:** el Registro de Compras debe estar anotado en tres columnas separadas (exclusivas gravadas, exclusivas no gravadas, uso común). Si la empresa no discrimina, SUNAT puede exigir prorratear **todo** el crédito: 34,000 × 60% = S/ 20,400, es decir S/ 10,000 menos. La forma de llevar el registro vale aquí S/ 10,000 reales, y no se puede corregir hacia atrás con facilidad.'},
   {l:3,t:'ab',p:'En una fiscalización, SUNAT observa: (a) una factura de S/ 35,400 anotada en el Registro de Compras 14 meses después de su emisión; (b) un servicio de S/ 5,900 con detracción depositada dos meses tarde, con crédito usado en el mes de la factura; (c) una factura de S/ 11,800 de un proveedor no habido. Determina el efecto en cada caso.',
    s:'**(a) Anotación 14 meses después — crédito perdido definitivamente.** La Ley 29215 permite anotar el comprobante hasta el periodo correspondiente a los doce meses siguientes a su emisión. Pasado ese plazo, el derecho al crédito se pierde sin posibilidad de recuperarlo.\nIGV perdido = 35,400 × 18/118 = **S/ 5,400**.\nEl gasto o costo sigue siendo deducible para Renta si cumple causalidad y fehaciencia; el IGV perdido se incorpora al costo.\n\n**(b) Detracción tardía — crédito diferido, no perdido.** El crédito se ejerce desde el periodo en que se acredita el depósito. Si la factura es de marzo y el depósito se hizo en mayo, el crédito de S/ 900 corresponde a mayo. Al haberlo usado en marzo, SUNAT determina:\n- IGV omitido de marzo: S/ 900, con intereses moratorios.\n- Multa por declarar cifras falsas (numeral 1 del art. 178 del Código Tributario): 50% del tributo omitido = S/ 450, con gradualidad si se subsana antes de notificación.\n- Multa por no depositar oportunamente la detracción: 50% del importe no depositado.\nEl impuesto en sí se recupera en mayo; el daño real son las multas y los intereses.\n\n**(c) Proveedor no habido — depende de la fecha.** La condición afecta el crédito cuando el proveedor tenía esa condición **a la fecha de emisión** del comprobante. Si ya era no habido al emitirla, se desconoce el crédito de S/ 1,800 y el gasto queda además expuesto por falta de fehaciencia, porque un proveedor no habido es, por definición, alguien a quien SUNAT no pudo ubicar. Si cayó en no habido después de emitir, el crédito se mantiene.\n\n**Resumen del reparo**\n\n| Caso | IGV en riesgo | Resultado |\n|---|---|---|\n| (a) Registro tardío | 5,400 | Pérdida definitiva |\n| (b) Detracción tardía | 900 | Diferido, más multas e intereses |\n| (c) Proveedor no habido | 1,800 | Pérdida si ya era no habido al emitir |\n| **Total** | **8,100** | más multas e intereses |\n\n**Los tres controles que lo evitan, y cuestan minutos:** validar el RUC y la condición del proveedor antes de registrar; controlar las detracciones con alerta de vencimiento antes de pagar; y conciliar el Registro de Compras con el SIRE todos los meses, que es lo que detecta comprobantes no registrados mucho antes de que se venza el plazo de doce meses.'}
  ],
  proy:{
   t:'La liquidación mensual de IGV de tu empresa',
   ctx:`Tu empresa ya tiene dos meses de operaciones registradas y sus estados financieros. Ahora vas a construir su dimensión tributaria, empezando por el impuesto que toca todas las operaciones: el IGV. Trabajarás sobre las mismas operaciones que ya registraste, de modo que puedas verificar que la contabilidad y la declaración dicen lo mismo.`,
   pasos:[
    'Arma el Registro de Ventas de los dos meses de tu empresa: fecha, tipo y número de comprobante, cliente con RUC, base imponible, IGV y total.',
    'Arma el Registro de Compras de los mismos meses, con tres columnas de destino: adquisiciones gravadas de uso exclusivo, no gravadas y de uso común. Si tu empresa solo tiene operaciones gravadas, deja las otras dos en cero y explica por qué.',
    'Determina el IGV de cada mes: débito, crédito, saldo a pagar o a arrastrar.',
    'Verifica por dos vías: el resultado de los registros debe coincidir exactamente con el saldo de tu cuenta 40111 en el Mayor.',
    'Analiza el nacimiento de la obligación en tres operaciones concretas de tu empresa, señalando qué hecho ocurrió primero y en qué mes nació el IGV.',
    'Identifica si en tu empresa existe alguna operación de retiro de bienes (consumo propio, regalos, muestras) y calcula el IGV que generaría.',
    'Registra el asiento de pago del IGV del segundo mes.'
   ],
   entrega:[
    'Registro de Ventas y Registro de Compras de los dos meses, con las tres columnas de destino.',
    'La determinación mensual del IGV y su verificación contra el Mayor.',
    'El análisis del nacimiento de la obligación en tres operaciones.',
    'El cálculo del retiro de bienes, si aplica, y el asiento de pago.'
   ],
   crit:[
    'El IGV determinado por los registros coincide al céntimo con el saldo de la cuenta 40111.',
    'Las tres columnas de destino del Registro de Compras están justificadas, no copiadas.',
    'El análisis del nacimiento identifica el hecho concreto y la fecha, no repite la regla general.'
   ],
   pista:'Si los dos cálculos no coinciden, las causas más frecuentes son: una factura registrada en el Diario y no en el Registro de Compras, una nota de crédito aplicada en un solo lado, o el IGV de una compra de activo fijo registrado al costo del bien en lugar de la cuenta 40111.'
  },
  proyInt:{
   t:'La contabilidad y la declaración, diciendo lo mismo',
   integra:'1.1 a 3.1',
   ctx:`El cruce entre lo que dice la contabilidad y lo que dice la declaración tributaria es lo primero que revisa SUNAT y lo que más reparos genera. Vas a construir ese puente para tu empresa, usando todo lo que registraste en los Módulos 1 y 2.`,
   pasos:[
    'Construye un cuadro de conciliación mensual entre tus ventas contables (cuenta 70 del Mayor) y la base imponible declarada en tu Registro de Ventas. Explica cualquier diferencia: anticipos cobrados sin ingreso devengado, ingresos no gravados, notas de crédito.',
    'Haz lo mismo entre tus compras y gastos contables y la base del Registro de Compras.',
    'Revisa tus asientos de los Módulos 1 y 2 y verifica que en todos los gastos y compras se haya separado la base del IGV. Corrige los que no.',
    'Documenta, para cada compra significativa, el cumplimiento de los cinco requisitos formales del crédito fiscal, usando la lista de verificación que diseñaste en el proyecto de 1.6.',
    'Agrega a tu manual contable (el de 1.2) una sección tributaria: régimen al que está acogida la empresa, obligaciones mensuales con sus fechas, y los controles antes de declarar.',
    'Escribe media página explicando las dos diferencias legítimas más importantes entre tu contabilidad y tu declaración, y por qué no son errores.'
   ],
   entrega:[
    'Los dos cuadros de conciliación (ventas y compras) con sus diferencias explicadas.',
    'La lista de verificación aplicada a las compras significativas.',
    'La sección tributaria agregada al manual contable.',
    'La media página sobre las diferencias legítimas.'
   ],
   crit:[
    'Toda diferencia entre contabilidad y declaración tiene una explicación concreta, no un "redondeo".',
    'La sección tributaria del manual indica fechas y responsables, no solo obligaciones.',
    'Las diferencias legítimas están bien argumentadas: un anticipo cobrado es la más común.'
   ],
   pista:'Conservar este cuadro de conciliación mes a mes es el mejor seguro contra una carta inductiva: cuando SUNAT cruce tus declaraciones con tu declaración anual, tú ya sabrás de dónde viene cada diferencia.'
  },
  fuentes:[
   {a:'Walker Villanueva Gutiérrez', o:'Tratado del IGV: regímenes general y especiales', n:'estructura del impuesto, método de sustracción y análisis del crédito fiscal'},
   {a:'TUO de la Ley del IGV e ISC (D.S. 055-99-EF)', o:'Artículos 1, 3, 4, 13, 18, 19 y 23', n:'operaciones gravadas, nacimiento de la obligación, base imponible, crédito fiscal y prorrata'},
   {a:'Ley 29215', o:'Requisitos formales del crédito fiscal y plazo de anotación', n:'el plazo de doce meses para anotar el comprobante en el Registro de Compras'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'la hipótesis de incidencia y el nacimiento de la obligación tributaria'},
   {a:'Francisco Ruiz de Castilla', o:'Derecho Tributario: temas básicos', n:'clasificación de los impuestos al consumo y la traslación del IGV'}
  ]
 },
 {
  id:'m3t2', titulo:'Detracciones, retenciones y percepciones', min:24,
  cont:`Son los tres **sistemas administrativos del IGV**: mecanismos para asegurar la recaudación adelantando el ingreso al fisco a través de un tercero. No son tributos nuevos. Es el mismo IGV cobrado antes y por otra vía, y entenderlos bien es lo que separa una contabilidad limpia de un dolor de cabeza mensual.

|Sistema|Quién actúa|Sobre qué|A dónde va el dinero|
|**Detracción (SPOT)**|El **cliente** descuenta del pago|Bienes y servicios de los anexos|Cuenta del **proveedor** en el Banco de la Nación|
|**Retención**|El **cliente** designado agente|Operaciones gravadas con IGV|A SUNAT; el proveedor recibe constancia|
|**Percepción**|El **proveedor** designado agente|Venta de ciertos bienes e importaciones|A SUNAT; el cliente recibe constancia|

La diferencia que conviene fijar: en la detracción el dinero sigue siendo del proveedor, solo que **restringido**; en la retención y la percepción el dinero ya salió del patrimonio de quien lo soporta y se convierte en un **crédito** contra su propio impuesto.

# Detracción (SPOT)
Creado por el Decreto Legislativo 940. El usuario del servicio o comprador deposita un porcentaje del importe total en la cuenta de detracciones del proveedor en el Banco de la Nación. El proveedor solo puede usar ese dinero para pagar sus propios tributos, multas y costas, o solicitar su **libre disposición** si acumula saldos y cumple requisitos.

|Operación|Tasa referencial|
|Servicios empresariales, asesoría, arrendamiento de bienes muebles|12%|
|Intermediación laboral y tercerización|12%|
|Mantenimiento y reparación de bienes muebles|12%|
|Contratos de construcción|4%|
|Transporte de carga por vía terrestre|4%|
|Azúcar, alcohol etílico, residuos, arena y piedra|10% a 15% según bien|
|Oro y minerales metálicos y no metálicos|10% a 15%|

> Las tasas y la lista de bienes y servicios sujetos cambian por resolución de SUNAT, así que la tabla vigente se consulta **antes de operar**, no después. Lo que no cambia es la lógica: hay un **monto mínimo** por operación para los bienes y servicios del Anexo 3 (S/ 700), y la obligación de depositar antes de pagar al proveedor o dentro del plazo según el caso.

@ Servicio de asesoría recibido por S/ 5,900 con detracción del 12%
@ 63|6322 Asesoría|5,000.00|
@ 40|40111 IGV - Cuenta propia|900.00|
@ 42|4212 Emitidas - Facturas por pagar||5,900.00

@ Pago: detracción al Banco de la Nación S/ 708 y saldo al proveedor S/ 5,192
@ 42|4212 Emitidas - Facturas por pagar|5,900.00|
@ 10|1041 Cuentas corrientes operativas||5,192.00
@ 10|1042 Cuentas corrientes - Cuenta de detracción||708.00

Desde el lado del **proveedor**, el depósito recibido se registra en su cuenta 1042, que es **efectivo restringido**: aparece en el activo corriente pero no puede usarse libremente, y así debe revelarse.

# El ingreso como recaudación: la sanción que más duele
Si el titular de la cuenta de detracciones incurre en ciertas causales, SUNAT puede disponer que los fondos de su cuenta **ingresen como recaudación**, es decir, que el Estado se los quede para aplicarlos a deudas tributarias del titular, presentes o futuras. Las causales típicas son:

- Inconsistencias entre las ventas o ingresos declarados y los que figuran en la cuenta.
- Tener la condición de **no habido**.
- No comparecer ante SUNAT o hacerlo fuera de plazo.
- Haber incurrido en determinadas infracciones del Código Tributario.

! Para una empresa de servicios que acumula saldos grandes en su cuenta de detracciones, un ingreso como recaudación puede significar perder la disponibilidad de decenas de miles de soles de golpe. Mantener la condición de habido, declarar consistentemente y responder los requerimientos a tiempo no es burocracia: es protección de caja.

# Retención del IGV
Aplican los contribuyentes designados por SUNAT como **agentes de retención**. Retienen el **3%** del importe total de la operación al momento del pago, y entregan una constancia. El proveedor aplica esa retención contra su IGV mensual.

@ Venta por S/ 23,600 a un agente de retención; cobro con retención del 3% (S/ 708)
@ 10|1041 Cuentas corrientes operativas|22,892.00|
@ 40|40113 IGV - Régimen de retenciones|708.00|
@ 12|1212 Facturas por cobrar||23,600.00

La retención no aplica, entre otros casos, cuando la operación está sujeta a detracción, cuando se emite boleta de venta, o cuando el importe de la operación no supera el límite establecido.

# Percepción del IGV
Regulada por la Ley 29173. El proveedor designado **agente de percepción** cobra un adicional al cliente y lo entrega a SUNAT:

|Tipo de operación|Tasa referencial|
|Venta interna de bienes del apéndice|2%|
|Venta de combustibles líquidos|1%|
|Importación de bienes|3.5%, 5% o 10% según el caso|

Para el cliente es un crédito contra su IGV, registrado en la cuenta 40114.

# Cómo se aplican contra el IGV del mes
$ IGV a pagar = Débito fiscal − Crédito fiscal − Retenciones − Percepciones

Si las retenciones y percepciones superan el IGV del mes, el saldo se arrastra. Cuando se mantienen **no aplicadas por tres periodos consecutivos**, puede solicitarse su devolución.

# El efecto en la caja, que es lo que nadie anticipa
Una empresa de servicios cuyos clientes son todos agentes de retención, y cuyos servicios están sujetos a detracción del 12%, cobra efectivamente mucho menos de lo que factura:

|Concepto|Importe|
|Factura emitida|118,000|
|(−) Detracción al Banco de la Nación (12%)|(14,160)|
|(−) Retención del 3%|(3,540)|
|**Ingreso efectivo a la cuenta operativa**|**100,300**|

El 15% de la facturación queda fuera de su caja operativa: una parte restringida en el Banco de la Nación y otra convertida en crédito contra impuestos futuros. Si el presupuesto de caja cuenta el 100% de la facturación, está equivocado desde el primer día.

# Los dos riesgos opuestos de la detracción
- Para el **cliente**: si no deposita, no puede usar el crédito fiscal de esa factura hasta acreditar el depósito, y se expone a multa del 50% del importe no depositado.
- Para el **proveedor**: el dinero queda inmovilizado y solo sirve para pagar tributos. Una empresa de servicios con mucha detracción y pocos tributos por pagar acumula saldos que afectan su liquidez, y debe gestionar la libre disposición periódicamente, dentro de las ventanas que fija el procedimiento.

> En empresas de servicios, la gestión de la cuenta de detracciones es parte del trabajo mensual del contador, no un trámite ocasional. Perder la ventana para solicitar la libre disposición obliga a esperar al siguiente periodo, con el dinero inmovilizado mientras tanto.`,
  claves:['Son sistemas administrativos del IGV, no tributos nuevos: adelantan la recaudación a través de un tercero.','En la detracción el dinero sigue siendo del proveedor pero restringido; en retención y percepción se convierte en crédito.','El cliente deposita la detracción; sin depósito no puede usar el crédito fiscal de esa factura.','El ingreso como recaudación permite a SUNAT quedarse con los fondos de la cuenta de detracciones ante inconsistencias o condición de no habido.','Retenciones y percepciones no aplicadas por tres periodos consecutivos pueden solicitarse en devolución.'],
  preg:[
   {p:'¿Por qué la detracción no es un tributo, si el dinero sale del pago al proveedor?',
    r:'Porque el dinero no ingresa al Tesoro: va a una cuenta a nombre del proveedor en el Banco de la Nación y sigue siendo suyo. Lo único que cambia es que su uso está restringido al pago de sus propias obligaciones tributarias, y que puede pedir la liberación de los saldos no utilizados. Es un mecanismo de aseguramiento, no una obligación de pago nueva. En retención y percepción, en cambio, el dinero sí ingresa al fisco de inmediato, aunque como pago a cuenta del impuesto del contribuyente.'},
   {p:'¿Qué gana el Estado con las detracciones si el dinero sigue siendo del contribuyente?',
    r:'Gana dos cosas. Primero, información: cada depósito deja rastro de una operación, lo que permite cruzar lo que una empresa declara con lo que efectivamente le depositaron sus clientes; esa es justamente una de las causales del ingreso como recaudación. Segundo, asegura el cobro: cuando llega el vencimiento, el dinero para pagar los tributos ya está apartado y no se gastó en otra cosa. El sistema nació para sectores con alta informalidad y evasión, donde el riesgo de que el proveedor cobrara y desapareciera era real.'},
   {p:'Una empresa recibe una factura sujeta a detracción, no deposita y usa el crédito fiscal. ¿Qué le ocurre?',
    r:'El crédito fiscal solo podía ejercerse desde el periodo en que acreditara el depósito, así que declaró un crédito que no le correspondía en ese mes. SUNAT determina el IGV omitido de ese periodo con intereses, aplica la multa por declarar cifras falsas (50% del tributo omitido, con gradualidad si subsana antes de notificación) y además la multa por no efectuar el depósito, equivalente al 50% del importe no depositado. El impuesto en sí se recupera en el periodo en que finalmente deposite: lo que se pierde son multas e intereses.'},
   {p:'¿Por qué una empresa de servicios puede quedarse sin liquidez aunque facture bien y cobre puntualmente?',
    r:'Porque entre detracciones y retenciones puede dejar de recibir el 15% de su facturación en caja libre. La detracción queda restringida en el Banco de la Nación y solo sirve para pagar tributos; la retención se convierte en crédito contra su IGV futuro. Si su estructura de costos es principalmente planilla —que no genera crédito fiscal— sus tributos por pagar son bajos y no alcanzan a consumir el saldo de detracciones, que se acumula. El problema es estructural, no circunstancial, y se gestiona proyectando la caja neta de estos sistemas y solicitando la libre disposición en cada ventana.'},
   {p:'¿Qué es el "ingreso como recaudación" y por qué debería preocupar a un contador?',
    r:'Es la facultad de SUNAT de disponer que los fondos de la cuenta de detracciones del contribuyente pasen a ser recaudación del Estado, para aplicarlos a sus deudas tributarias presentes o futuras. Se activa por causales como inconsistencias entre lo declarado y lo depositado, tener condición de no habido, no comparecer ante un requerimiento o haber incurrido en ciertas infracciones. Debería preocupar porque convierte un problema formal —no actualizar un domicilio fiscal, no responder una esquela— en la pérdida inmediata de disponibilidad de un saldo que puede ser muy grande.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un servicio de consultoría por S/ 11,800 (incluido IGV) está sujeto a detracción del 12%. ¿Cuánto se deposita en el Banco de la Nación?',
    u:'S/',r:1416,tol:1,
    s:'La detracción se calcula sobre el **importe total de la operación**, incluido el IGV:\nDetracción = 11,800 × 12% = **S/ 1,416**\n\nAl proveedor se le paga 11,800 − 1,416 = S/ 10,384. El error común es aplicar el porcentaje sobre la base imponible (10,000 × 12% = 1,200), lo que deja el depósito incompleto y mantiene suspendido el derecho al crédito fiscal, con el agravante de que una detracción parcial no cumple el requisito.'},
   {l:1,t:'mc',p:'¿Quién tiene la obligación de efectuar el depósito de la detracción?',
    o:['El proveedor del servicio','El usuario del servicio o adquirente del bien','SUNAT','El banco'],r:1,
    s:'El usuario o adquirente, es decir el cliente: él descuenta el importe del pago y lo deposita en la cuenta del proveedor en el Banco de la Nación. Solo en casos excepcionales, como cuando el proveedor recibe el pago total, la obligación recae en él. La consecuencia de no depositar la sufre el cliente: no puede usar el crédito fiscal de esa factura hasta acreditar el depósito, además de la multa.'},
   {l:2,t:'num',p:'En el mes: débito fiscal S/ 28,000; crédito fiscal S/ 19,500; retenciones del mes S/ 2,400; percepciones acumuladas S/ 1,300. ¿Cuánto paga de IGV?',
    u:'S/',r:4800,tol:1,
    s:'Débito fiscal 28,000 − crédito fiscal 19,500 = IGV determinado S/ 8,500\n(−) Retenciones 2,400\n(−) Percepciones 1,300\n**IGV por pagar = S/ 4,800**\n\nSi retenciones y percepciones hubieran superado los S/ 8,500, no habría pago y el exceso se arrastraría en las cuentas 40113 y 40114, con la opción de pedir devolución tras tres periodos consecutivos sin aplicar.'},
   {l:2,t:'ab',p:'Una empresa de ingeniería factura S/ 118,000 al mes con detracción del 12%. Sus tributos mensuales son: IGV S/ 4,000, pago a cuenta de renta S/ 1,000, EsSalud y ONP S/ 3,500. Analiza su cuenta de detracciones y propón medidas.',
    s:'**Detracciones que recibe cada mes:** 118,000 × 12% = **S/ 14,160** inmovilizados.\n\n**Tributos que puede pagar con esa cuenta:** 4,000 + 1,000 + 3,500 = **S/ 8,500**.\n\n**Acumulación mensual = S/ 5,660**, que crece mes a mes. En un año, alrededor de **S/ 67,920** de dinero propio sin disponibilidad para comprar insumos, pagar sueldos ni cubrir alquileres.\n\n**Por qué ocurre:** en una empresa de servicios el costo principal es la planilla, que no genera crédito fiscal. Por eso su IGV por pagar es alto en proporción, pero aun así insuficiente para consumir el 12% de toda su facturación.\n\n**Qué hacer, en orden:**\n\n1. **Solicitar la libre disposición de los fondos** en cada ventana del procedimiento general, por los montos no agotados en el pago de tributos durante los periodos anteriores. Tener esas fechas en el calendario del contador es la medida de mayor impacto.\n2. **Pagar desde la cuenta de detracciones todo tributo posible**: IGV, pagos a cuenta, regularización anual de Renta, ITAN, EsSalud, ONP, multas y costas, en lugar de pagarlos desde la cuenta operativa.\n3. **Proyectar el flujo de caja con el 12% descontado.** Un presupuesto que cuenta el 100% de la facturación como cobrable está equivocado desde el primer día.\n4. **Verificar la correcta clasificación de los servicios**: si alguno está siendo detraído a una tasa que no le corresponde, se está inmovilizando más dinero del debido, y eso se corrige hacia adelante.\n5. **Proteger la condición de habido y la consistencia de las declaraciones**, para evitar un ingreso como recaudación que convierta el saldo acumulado en pérdida de disponibilidad total.'},
   {l:3,t:'ab',p:'Una empresa recibe factura de transporte de carga por S/ 8,260 (incluido IGV) con detracción del 4%. El 15 de marzo paga el total al proveedor sin detraer, y recién el 20 de abril deposita los S/ 330.40. Usó el crédito fiscal en marzo. Determina todas las consecuencias.',
    s:'**Hechos:** base S/ 7,000, IGV S/ 1,260, total S/ 8,260. Detracción que correspondía: 8,260 × 4% = **S/ 330.40**, depositada un mes tarde y después de pagar el íntegro al proveedor.\n\n**Consecuencia 1 — Crédito fiscal mal utilizado.** Podía ejercerse recién en abril, el periodo del depósito. Al usarlo en marzo:\n- IGV omitido de marzo: **S/ 1,260**, con intereses moratorios desde el vencimiento.\n- Multa por declarar cifras falsas: 50% del tributo omitido = **S/ 630**, con gradualidad si se subsana voluntariamente antes de cualquier notificación.\n- El crédito se reconoce en abril: el impuesto no se pierde, se difiere un mes.\n\n**Consecuencia 2 — Multa por no depositar oportunamente:** 50% del importe no depositado = 330.40 × 50% = **S/ 165.20**, también con gradualidad.\n\n**Consecuencia 3 — Problema de caja con el proveedor.** Al haberle pagado el íntegro, la empresa tuvo que depositar los S/ 330.40 de su propio bolsillo o pedirle la devolución. Lo primero es sobrecosto; lo segundo, una negociación incómoda que muchas veces no prospera.\n\n**Resumen económico aproximado**\n\n| Concepto | Importe |\n|---|---|\n| IGV de marzo a regularizar (se recupera en abril) | 1,260.00 |\n| Multa por cifras falsas (antes de gradualidad) | 630.00 |\n| Multa por no depositar (antes de gradualidad) | 165.20 |\n| Intereses moratorios | variable |\n| Sobrecosto por doble salida de caja | 330.40 |\n\n**El control que lo evita:** una validación en el flujo de pagos que marque toda factura sujeta a detracción y bloquee la orden de pago hasta que la constancia de depósito esté adjunta. En empresas con muchos proveedores de servicios, ese control simple ahorra más dinero que cualquier planificación tributaria.'}
  ],
  proy:{
   t:'Los sistemas administrativos aplicados a tu empresa',
   ctx:`Casi ninguna empresa peruana escapa a los tres sistemas. Vas a determinar cuáles alcanzan a la tuya, calcular su efecto en la caja y diseñar el control que evita los errores caros.`,
   pasos:[
    'Revisa las operaciones de tu empresa y clasifica cada una: sujeta a detracción (con su tasa), sujeta a retención si tu cliente fuera agente, sujeta a percepción si tu proveedor lo fuera, o ninguna. Justifica cada clasificación.',
    'Registra con asientos completos una operación de cada tipo que aplique a tu empresa, mostrando el desdoblamiento del pago entre la cuenta operativa y la de detracciones.',
    'Construye el cuadro de caja neta: cuánto factura tu empresa al mes, cuánto le detraen, cuánto le retienen y cuánto ingresa realmente a su cuenta operativa.',
    'Proyecta a doce meses el saldo de la cuenta de detracciones: cuánto entra por detracciones y cuánto sale por pago de tributos. Si acumula, calcula cuánto dinero quedaría inmovilizado al año.',
    'Diseña el control de detracciones: en qué momento del proceso de pago se verifica, quién lo hace, qué documento se exige antes de liberar el pago.',
    'Agrega a tu manual contable la lista de causales de ingreso como recaudación y las acciones preventivas para cada una.'
   ],
   entrega:[
    'La clasificación de operaciones con su justificación.',
    'Los asientos de cada tipo de operación.',
    'El cuadro de caja neta y la proyección a doce meses de la cuenta de detracciones.',
    'El procedimiento de control de detracciones y la sección preventiva del manual.'
   ],
   crit:[
    'Los asientos muestran correctamente el desdoblamiento entre cuenta operativa y cuenta de detracciones.',
    'El cuadro de caja neta parte de la facturación real de tu empresa, no de un ejemplo.',
    'El control de detracciones ocurre ANTES del pago, no en el cierre contable.'
   ],
   pista:'Para saber si un servicio de tu empresa está sujeto a detracción, no basta el nombre comercial: hay que ubicarlo en la definición del anexo correspondiente. Un servicio mal clasificado detrae de más o de menos, y ambos casos generan problemas.'
  },
  proyInt:{
   t:'El presupuesto de caja tributaria de tu empresa',
   integra:'1.1 a 3.2',
   ctx:`Ya sabes cuánto gana tu empresa (Módulo 2) y cuánto IGV genera (3.1). Ahora vas a construir lo que realmente mantiene viva a una empresa: la proyección de su caja considerando todos los efectos tributarios, que es donde las MYPES peruanas se quiebran sin darse cuenta.`,
   pasos:[
    'Toma el flujo de caja de tu empresa de los dos meses registrados y proyéctalo a seis meses hacia adelante, con supuestos explícitos de crecimiento.',
    'Incorpora, mes a mes, todas las salidas tributarias: IGV a pagar, pago a cuenta de renta, aportes de la planilla, y las fechas exactas según el cronograma por último dígito del RUC.',
    'Incorpora las entradas restringidas: cuánto de lo que cobras va a la cuenta de detracciones y cuánto se convierte en retención.',
    'Separa la proyección en dos columnas: caja operativa disponible y caja restringida en el Banco de la Nación.',
    'Identifica el mes más crítico y calcula cuánto faltaría. Propón tres medidas concretas con su efecto en soles.',
    'Cruza este trabajo con los estados financieros del proyecto de 2.6: explica por qué la utilidad proyectada y la caja proyectada no coinciden, con cifras.'
   ],
   entrega:[
    'Proyección de caja a seis meses con las dos columnas (disponible y restringida).',
    'El calendario tributario con fechas reales según el último dígito del RUC de tu empresa.',
    'El análisis del mes crítico con tres medidas cuantificadas.',
    'La explicación de la brecha entre utilidad y caja.'
   ],
   crit:[
    'Las fechas de pago corresponden al cronograma real, no a un día genérico del mes.',
    'La caja restringida está separada de la disponible en toda la proyección.',
    'Las tres medidas están cuantificadas en soles y en días de efecto, no enunciadas.'
   ],
   pista:'El mes más crítico de casi toda empresa peruana es diciembre o enero: coinciden gratificaciones, CTS de noviembre ya pagada, compras de campaña y el IGV de un mes de ventas altas. Si tu proyección no muestra tensión ahí, revisa los supuestos.'
  },
  fuentes:[
   {a:'Decreto Legislativo 940 y normas modificatorias', o:'Sistema de Pago de Obligaciones Tributarias (SPOT)', n:'funcionamiento de la detracción, cuenta en el Banco de la Nación e ingreso como recaudación'},
   {a:'Ley 29173', o:'Régimen de Percepciones del IGV', n:'operaciones comprendidas, tasas y aplicación del crédito por percepciones'},
   {a:'SUNAT', o:'Resolución de Superintendencia 037-2002/SUNAT y modificatorias', n:'régimen de retenciones del IGV, tasa y obligaciones del agente'},
   {a:'Walker Villanueva Gutiérrez', o:'Tratado del IGV: regímenes general y especiales', n:'naturaleza jurídica de los sistemas administrativos y su efecto sobre el crédito fiscal'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'distinción entre obligación tributaria y deberes de colaboración administrativa'}
  ]
 },
 {
  id:'m3t3', titulo:'Los cuatro regímenes tributarios y cómo elegir', min:25,
  cont:`La elección de régimen define cuántos tributos paga la empresa, qué libros lleva, qué comprobantes puede emitir y hasta si puede arrastrar pérdidas. Es la primera decisión tributaria de cualquier negocio y la que más veces se toma mal, casi siempre por copiar lo que hizo el vecino.

# Cuadro comparativo (valores 2026, UIT = S/ 5,500)
|Aspecto|NRUS|RER|RMT|Régimen General|
|Límite de ingresos|S/ 96,000 al año (S/ 8,000 mensual)|S/ 525,000 al año|1,700 UIT = S/ 9,350,000|Sin límite|
|Quiénes pueden acogerse|Personas naturales y EIRL con negocio|Personas naturales y jurídicas, con exclusiones|Personas naturales y jurídicas|Todos|
|Impuesto a la Renta|Cuota fija mensual que incluye IGV|1.5% de ingresos netos mensuales, **definitivo**|10% hasta 15 UIT de renta neta y 29.5% por el exceso|29.5% de la renta neta|
|Pago a cuenta mensual|No aplica|1.5% definitivo|1% si los ingresos no superan 300 UIT; si superan, coeficiente con mínimo 1.5%|Coeficiente o 1.5%, el mayor|
|Declaración jurada anual|No|No|Sí|Sí|
|IGV|Incluido en la cuota|18% aparte|18% aparte|18% aparte|
|Comprobantes|Solo boletas y tickets|Facturas, boletas y demás|Todos|Todos|
|Libros contables|Ninguno|Registro de Compras y de Ventas|Según ingresos|Contabilidad completa|
|Arrastre de pérdidas|No|**No**|Sí|Sí|
|Trabajadores|Sin límite específico|Hasta 10 por turno|Sin límite|Sin límite|

# Categorías del NRUS
|Categoría|Ingresos o compras mensuales|Cuota|
|1|Hasta S/ 5,000|S/ 20|
|2|Más de S/ 5,000 hasta S/ 8,000|S/ 50|
|Especial|Hasta S/ 60,000 anuales, venta de frutas, hortalizas y productos agrícolas en mercados de abastos, o cultivo agrícola|S/ 0|

La categoría se determina por **el mayor** entre ingresos y compras del mes. Otros límites del NRUS: un solo establecimiento, activos fijos hasta S/ 70,000 sin contar predios y vehículos, y no realizar importaciones, salvo la excepción de zona de frontera.

# Actividades excluidas del RER
El RER no admite, entre otras: actividades de construcción, transporte de carga de más de 2 TM, organización de espectáculos públicos, casinos y tragamonedas, agencias de viaje, publicidad, comisión o consignación, actividades de médicos y odontólogos, veterinarias, jurídicas, contabilidad y auditoría, arquitectura e ingeniería, informática, y asesoramiento empresarial. Es una lista larga y específica: la consulta es obligatoria antes de acogerse, porque el acogimiento indebido se corrige de oficio con la deuda recalculada.

# Libros según ingresos en el RMT
|Ingresos netos anuales|Libros obligatorios|
|Hasta 300 UIT (S/ 1,650,000)|Registro de Ventas, Registro de Compras y Libro Diario de Formato Simplificado|
|Más de 300 hasta 500 UIT|Los anteriores más Libro Mayor y Libro de Inventarios y Balances|
|Más de 500 hasta 1,700 UIT|Contabilidad completa|

# Cómo se decide, con números
Caso: empresa de servicios de mantenimiento, ingresos proyectados S/ 480,000 al año, gastos deducibles S/ 390,000.

|Concepto|RER|RMT|
|Ingresos|480,000|480,000|
|Gastos deducibles|no relevantes|(390,000)|
|Renta neta|—|90,000|
|Impuesto anual|480,000 × 1.5% = **7,200**|90,000 × 10% = **9,000**|

Aquí el RER sale más barato. Pero cambiemos el margen: con gastos de S/ 440,000 la renta neta sería S/ 40,000 y el impuesto en RMT S/ 4,000, menos que los S/ 7,200 del RER.

$ Punto de indiferencia (mientras la renta neta no supere 15 UIT):
$ 1.5% × Ingresos = 10% × Renta neta  →  Renta neta = 15% de los ingresos

**Regla práctica:** si el margen neto es **mayor al 15%** de los ingresos, el RER tiende a convenir, porque se paga sobre ingresos y no sobre utilidad. Si el margen es **menor al 15%**, conviene el RMT. Y si hay pérdidas, el RER obliga a pagar igual: una empresa que pierde dinero en el RER paga impuesto sobre sus ingresos.

! El cálculo del impuesto no es el único criterio. El RER **no permite arrastrar pérdidas**, no exige declaración anual (menos costo administrativo) y sus pagos son definitivos. El RMT permite arrastrar pérdidas por el sistema A (cuatro años) o B (sin plazo, con límite del 50% de la renta neta), lo que para un negocio en etapa de inversión puede valer mucho más que la diferencia de unos miles de soles en el primer año.

# Acogimiento y cambio de régimen
|Movimiento|Cuándo|
|Acogimiento inicial|Con la declaración del periodo de inicio de actividades, dentro del plazo de vencimiento|
|Del NRUS, RER o RMT al **General**|En cualquier mes del año|
|Del General al RMT, RER o NRUS|Solo con la declaración de **enero** de cada año|
|Superación de límites durante el año|Cambio **obligatorio** desde el mes en que ocurre, con recálculo de pagos a cuenta en el RMT|

# Dos errores que cuestan caro
1. **Quedarse en un régimen tras superar el límite.** El cambio es obligatorio desde el mes en que se supera, no desde el año siguiente. Si se descubre un año después, hay declaraciones mal presentadas, libros no llevados y multas acumuladas por cada periodo.
2. **Dividir la empresa en varias para no superar los límites.** Si no hay razón de negocio real, SUNAT puede aplicar la norma antielusiva general (Norma XVI del Código Tributario) y recalcular los tributos como si fuera una sola empresa, con el régimen que corresponda a los ingresos consolidados.`,
  claves:['Cuatro regímenes: NRUS (cuota fija), RER (1.5% de ingresos, definitivo), RMT (10% hasta 15 UIT y 29.5% el exceso) y General (29.5%).','En 2026 el límite del RMT es 1,700 UIT = S/ 9,350,000 y el del RER S/ 525,000.','Regla práctica: margen neto mayor al 15% favorece al RER; menor al 15%, al RMT.','El RER no permite arrastrar pérdidas y obliga a pagar aunque haya pérdida; el RMT sí las arrastra.','Al Régimen General se puede pasar en cualquier mes; para bajar de régimen, solo con la declaración de enero.'],
  preg:[
   {p:'¿Por qué el RER puede ser malo para un negocio que recién empieza, aunque su tasa parezca baja?',
    r:'Porque el 1.5% se aplica sobre los ingresos, no sobre la utilidad, y tiene carácter definitivo. Un negocio nuevo suele tener márgenes bajos o pérdidas mientras invierte en equipos, publicidad y clientes: en el RER pagaría impuesto igual, sobre una utilidad que no existe. Además el RER no permite arrastrar esas pérdidas contra las utilidades de los años siguientes, así que el sacrificio del primer año no se recupera nunca. El RMT, con 10% sobre la renta neta y arrastre de pérdidas, suele ser mejor en esa etapa aunque implique más trabajo administrativo.'},
   {p:'Explica el punto de indiferencia del 15% con tus palabras y di cuándo deja de ser válido.',
    r:'Es el margen neto en el que da lo mismo pagar 1.5% sobre los ingresos o 10% sobre la utilidad: si la utilidad es el 15% de los ingresos, 10% de ese 15% equivale al 1.5% de los ingresos. Por encima de ese margen conviene el RER, porque la utilidad grande tributaría más en el RMT; por debajo conviene el RMT. Deja de ser válido cuando la renta neta supera las 15 UIT, porque entonces el exceso tributa al 29.5% y el RMT se encarece; y también cuando hay pérdidas arrastrables en juego, donde el valor del arrastre puede superar cualquier diferencia de tasa.'},
   {p:'Una empresa en RER supera el límite de ingresos en agosto. ¿Qué debe hacer y qué pasa con lo pagado antes?',
    r:'Debe ingresar al régimen que corresponda desde el periodo en que supera el límite, agosto, no desde enero siguiente. Los pagos del RER por los meses en que estuvo acogida son definitivos y no se recuperan: no son pagos a cuenta. Desde agosto determina renta sobre base real, con las obligaciones del nuevo régimen: más libros, declaración jurada anual, cuadro de activos fijos y provisiones. El riesgo mayor es no notarlo a tiempo: cada mes declarado en el régimen equivocado es una declaración que habrá que rectificar, con multas por cada una.'},
   {p:'¿Qué información necesitas de un emprendedor antes de recomendarle un régimen?',
    r:'Seis datos: la actividad exacta (para verificar exclusiones del RER y del NRUS), los ingresos proyectados del año, los gastos deducibles proyectados y por tanto el margen, si espera pérdidas en los primeros años, si sus clientes necesitan factura con crédito fiscal, y cuántos trabajadores tendrá. El margen decide entre RER y RMT; las exclusiones pueden eliminar opciones de entrada; la necesidad de factura descarta el NRUS, porque un cliente empresa no comprará a quien solo emite boleta; y la expectativa de pérdidas inclina la balanza hacia el RMT por el arrastre.'},
   {p:'¿Por qué dividir una empresa en tres para quedar bajo los límites es una mala idea incluso si cada una factura menos del tope?',
    r:'Porque si no hay una razón de negocio real detrás de la división, SUNAT puede aplicar la norma antielusiva general y determinar los tributos como si se tratara de una sola empresa, con el régimen correspondiente a los ingresos consolidados, más multas e intereses. Y en paralelo aparece el frente laboral: si las tres comparten dirección, local y trabajadores, SUNAFIL puede considerarlas un solo empleador y liquidar los beneficios del régimen que corresponda a la empresa consolidada. Una estructura societaria solo se sostiene si tiene sustancia: actividades distintas, administración separada, contratos a valor de mercado y documentación que lo respalde.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una bodega con ventas de S/ 7,000 mensuales y compras de S/ 5,500 está en el NRUS. ¿Qué cuota le corresponde?',
    o:['S/ 20, categoría 1','S/ 50, categoría 2','S/ 0, categoría especial','No puede estar en NRUS'],r:1,
    s:'Categoría 2, cuota de S/ 50. La categoría se determina por el **mayor** entre ingresos y compras del mes: aquí el mayor es S/ 7,000 de ventas, que cae en el tramo de más de S/ 5,000 hasta S/ 8,000. Está dentro de los límites del NRUS. Si en algún mes superara S/ 8,000, debería cambiar de régimen desde ese mes.'},
   {l:1,t:'mc',p:'Una empresa de servicios de contabilidad quiere acogerse al RER. ¿Puede?',
    o:['Sí, cualquier empresa de servicios puede','No: las actividades de contabilidad y auditoría están excluidas del RER','Solo si factura menos de S/ 100,000','Solo si es persona natural'],r:1,
    s:'No puede. Las actividades de contabilidad, teneduría de libros y auditoría están expresamente excluidas del RER, junto con asesoramiento empresarial, actividades jurídicas, arquitectura e ingeniería, informática, médicas y odontológicas, entre otras. Debe acogerse al RMT o al Régimen General. Es un error frecuente en estudios contables pequeños que se acogen al RER por el bajo costo administrativo y luego son reclasificados de oficio, con la deuda recalculada desde el inicio.'},
   {l:2,t:'num',p:'Una comercializadora en RMT tiene renta neta anual de S/ 150,000 en 2026 (UIT S/ 5,500). ¿Cuánto es su Impuesto a la Renta anual?',
    u:'S/',r:28162.50,tol:5,
    s:'Escala del RMT: 10% hasta 15 UIT de renta neta y 29.5% por el exceso.\n15 UIT = 15 × 5,500 = **S/ 82,500**\n\nPrimer tramo: 82,500 × 10% = S/ 8,250.00\nExceso: 150,000 − 82,500 = 67,500 × 29.5% = S/ 19,912.50\n**Impuesto total = S/ 28,162.50**\n\nTasa efectiva = 28,162.50 ÷ 150,000 = 18.8%, muy por debajo del 29.5% del Régimen General: ahí está el beneficio del RMT para una empresa mediana.'},
   {l:2,t:'ab',p:'Un emprendedor proyecta para su primer año: ingresos S/ 300,000 y gastos deducibles S/ 285,000, porque está invirtiendo en equipos y publicidad. Compara RER y RMT y recomienda.',
    s:'**En el RER:** impuesto definitivo de 1.5% sobre ingresos.\n300,000 × 1.5% = **S/ 4,500 al año**\n\n**En el RMT:** se paga sobre la renta neta.\nRenta neta = 300,000 − 285,000 = S/ 15,000\nComo está muy por debajo de 15 UIT (S/ 82,500), todo tributa al 10%:\n15,000 × 10% = **S/ 1,500 al año**\n\nPagos a cuenta en RMT: con ingresos bajo 300 UIT, el pago a cuenta es 1% de los ingresos = S/ 3,000 al año, que supera el impuesto anual de S/ 1,500. Resultaría un **saldo a favor de S/ 1,500**, aplicable contra pagos futuros o solicitable en devolución. Conviene además evaluar la suspensión o modificación de pagos a cuenta que la norma permite cuando se acredita que el impuesto anual será menor.\n\n**Recomendación: RMT**, por tres razones en orden de importancia:\n\n1. **Ahorro inmediato de S/ 3,000**, el doble del impuesto.\n2. **Margen bajo:** 15,000 ÷ 300,000 = 5%, muy por debajo del punto de indiferencia del 15%. Con márgenes así, pagar sobre ingresos es caro.\n3. **Arrastre de pérdidas.** Si el primer año cerrara en pérdida, probable en un negocio que invierte, el RER lo haría pagar S/ 4,500 igual, mientras el RMT no cobraría impuesto y permitiría arrastrar la pérdida contra utilidades futuras. En un negocio nuevo, ese derecho suele valer más que la diferencia de impuesto del primer año.\n\n**El costo del RMT:** llevar Registro de Ventas, Registro de Compras y Libro Diario Simplificado, y presentar declaración jurada anual. Es más trabajo administrativo, y hay que contarlo en la decisión; a este nivel de ingresos, el honorario contable adicional es menor que el ahorro tributario.'},
   {l:3,t:'ab',p:'Una empresa en RER factura S/ 44,000 mensuales de forma estable. En setiembre de 2026 gana una licitación y factura S/ 180,000 ese mes, cerrando el año con S/ 620,000 de ingresos y gastos deducibles de S/ 500,000. ¿Qué debe hacer y cuánto termina pagando?',
    s:'**Paso 1 — Detectar la salida obligatoria del RER.** El límite es S/ 525,000 de ingresos netos anuales.\nEnero a agosto: 8 × 44,000 = S/ 352,000\nCon setiembre: 352,000 + 180,000 = **S/ 532,000**, que supera el límite.\nLa empresa queda obligada a dejar el RER **desde setiembre de 2026**, el periodo en que lo supera. Con S/ 620,000 de ingresos anuales está muy por debajo de 1,700 UIT, así que el RMT es la opción razonable, evaluando con cuidado la forma de acogimiento que corresponde a un cambio obligatorio.\n\n**Paso 2 — Lo pagado de enero a agosto es definitivo.**\n352,000 × 1.5% = **S/ 5,280** ya pagados y no recuperables: en el RER no son pagos a cuenta.\n\n**Paso 3 — Tributación de setiembre a diciembre sobre base real.**\nIngresos del tramo: 620,000 − 352,000 = S/ 268,000\nSuponiendo gastos deducibles del tramo de S/ 215,000, la renta neta sería S/ 53,000.\nEn RMT: 53,000 × 10% = **S/ 5,300** (no supera 15 UIT).\n\n**Paso 4 — Pagos a cuenta del tramo.** Con ingresos anuales bajo 300 UIT, el pago a cuenta es 1% de los ingresos mensuales: 268,000 × 1% = S/ 2,680, aplicables contra el impuesto del tramo.\n\n**Carga total aproximada del año:** 5,280 + 5,300 = **S/ 10,580**.\n\n**Las cuatro lecciones del caso:**\n\n1. **Hay que monitorear el acumulado mes a mes**, no al cierre del año. Enterarse en marzo siguiente significa ocho meses de declaraciones mal presentadas, con multa por cada una y libros no llevados.\n2. **Un contrato grande puede cambiar el régimen.** Antes de firmar la licitación, el contador debió proyectar el acumulado y planificar el cambio.\n3. **Cambiar de régimen no es cambiar una casilla:** hay que implementar libros adicionales, determinación sobre base real, declaración anual, cuadro de activos fijos con depreciación y provisiones de beneficios sociales.\n4. **Los pagos del RER no se recuperan.** Son definitivos por los periodos en que estuvo acogida, aunque después tribute sobre utilidad real.'}
  ],
  proy:{
   t:'La decisión de régimen de tu empresa, con números',
   ctx:`Hasta ahora asumiste un régimen para tu empresa. Ha llegado el momento de verificar si fue la mejor decisión, con la información real que has construido en los módulos anteriores.`,
   pasos:[
    'Verifica primero las exclusiones: ¿la actividad de tu empresa está excluida del NRUS o del RER? Cita la actividad concreta y concluye qué regímenes son posibles.',
    'Proyecta a doce meses los ingresos y los gastos deducibles de tu empresa, partiendo de los dos meses registrados y explicando tus supuestos.',
    'Calcula el impuesto anual en cada régimen posible: NRUS (si aplica), RER, RMT y General. Presenta el cuadro comparativo completo.',
    'Calcula el margen neto proyectado y compáralo con el punto de indiferencia del 15%. Verifica si el resultado coincide con el cuadro comparativo.',
    'Agrega los factores no tributarios: costo administrativo de cada régimen, necesidad de emitir factura, expectativa de pérdidas y límites de crecimiento a tres años.',
    'Redacta la recomendación en una página, dirigida al dueño, con la decisión, su fundamento numérico y el punto de facturación anual en el que habría que revisarla.',
    'Diseña una alerta: a partir de qué ingreso acumulado mensual debe encenderse la señal de cambio obligatorio de régimen.'
   ],
   entrega:[
    'El análisis de exclusiones con su conclusión.',
    'El cuadro comparativo de los cuatro regímenes con el impuesto anual en cada uno.',
    'La recomendación de una página con fundamento numérico.',
    'La alerta de cambio de régimen con su umbral en soles.'
   ],
   crit:[
    'Las exclusiones se verificaron contra la actividad real, no se asumieron.',
    'El cuadro comparativo incluye el efecto del arrastre de pérdidas, no solo la tasa.',
    'La recomendación dice cuándo habría que revisar la decisión, no solo cuál tomar hoy.'
   ],
   pista:'Si tu empresa factura a otras empresas, el NRUS queda descartado aunque los números lo favorezcan: tus clientes necesitan factura para su crédito fiscal y dejarán de comprarte.'
  },
  proyInt:{
   t:'El perfil tributario completo de tu empresa',
   integra:'1.1 a 3.3',
   ctx:`Este proyecto consolida la dimensión tributaria de tu empresa y la conecta con todo lo contable que ya construiste. Es el documento que un contador entrega cuando toma un nuevo cliente y quiere dejar claro, desde el primer día, qué obligaciones tiene y qué riesgos corre.`,
   pasos:[
    'Arma la ficha tributaria de tu empresa: RUC ficticio con su último dígito, régimen recomendado y acogimiento, tributos afectos, periodicidad y fechas de cada obligación.',
    'Construye el calendario tributario anual completo: declaraciones mensuales, anual, ITAN si corresponde, y los depósitos de CTS y pagos de gratificaciones que afectan la caja.',
    'Determina el IGV y el pago a cuenta de renta de los dos meses registrados, con la base tomada de tu propia contabilidad, y registra los asientos correspondientes.',
    'Elabora la matriz de riesgos tributarios de tu empresa: para cada riesgo (crédito fiscal mal usado, detracción no depositada, gasto sin sustento, superación de límite de régimen), señala probabilidad, impacto en soles y control preventivo.',
    'Integra todo en la sección tributaria del manual contable que vienes construyendo desde 1.2.',
    'Escribe una página final para el dueño: cuánto le cuesta a su empresa ser formal al año, sumando impuestos, aportes y costo administrativo, y qué obtiene a cambio.'
   ],
   entrega:[
    'Ficha tributaria y calendario anual con fechas reales.',
    'Determinación de IGV y pago a cuenta de los dos meses, con asientos.',
    'Matriz de riesgos tributarios cuantificada.',
    'La sección tributaria completa del manual contable.',
    'La página de costo de la formalidad.'
   ],
   crit:[
    'El calendario usa el cronograma real según el último dígito del RUC que asignaste.',
    'La matriz de riesgos cuantifica el impacto en soles, no lo califica como alto o bajo.',
    'La página de costo de la formalidad suma todos los conceptos, incluido el honorario contable.'
   ],
   pista:'La pregunta "cuánto me cuesta ser formal" es la que todo dueño de MYPE hace tarde o temprano. Responderla con números, incluyendo lo que gana a cambio (acceso a crédito, posibilidad de vender a empresas, no exponerse a multas), es una de las conversaciones más útiles que un contador puede tener con su cliente.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta y su reglamento', o:'Régimen General y Régimen MYPE Tributario', n:'tasas, pagos a cuenta, arrastre de pérdidas y obligaciones por régimen'},
   {a:'Decreto Legislativo 937', o:'Nuevo Régimen Único Simplificado', n:'categorías, límites y exclusiones del NRUS'},
   {a:'Decreto Legislativo 1269', o:'Régimen MYPE Tributario del Impuesto a la Renta', n:'escala de 10% y 29.5%, límite de 1,700 UIT y obligaciones formales'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'efecto de la elección de régimen sobre la deducibilidad y la planificación'},
   {a:'Código Tributario, Norma XVI', o:'Norma antielusiva general', n:'recalificación de estructuras sin propósito económico, como la división artificial de empresas'}
  ]
 },
 {
  id:'m3t4', titulo:'Impuesto a la Renta de tercera categoría y pagos a cuenta', min:27,
  cont:`La renta de tercera categoría es la de las empresas. Antes de calcularla conviene entender **qué entiende la ley por renta**, porque de ahí salen muchas respuestas que de otro modo parecen arbitrarias.

# Las tres teorías de la renta
La doctrina tributaria, sistematizada en el Perú por autores como Jorge Bravo Cucci siguiendo a García Mullín, distingue tres concepciones:

|Teoría|Qué considera renta|Ejemplo de lo que incluye|
|**Renta producto**|Solo lo que proviene de una fuente durable y explotada|El alquiler de un inmueble, la utilidad de una venta habitual|
|**Flujo de riqueza**|Todo ingreso que fluya de terceros, incluso no habitual|Una indemnización, una ganancia de capital ocasional, una condonación de deuda|
|**Consumo más incremento patrimonial**|Todo enriquecimiento, incluso sin tercero|Un incremento patrimonial no justificado, el autoconsumo|

La Ley del Impuesto a la Renta peruana adopta un criterio **mixto**: parte de la renta producto, pero incorpora elementos del flujo de riqueza y del incremento patrimonial. Para la tercera categoría, el artículo 3 es explícito: constituye renta gravada **cualquier ganancia o ingreso derivado de operaciones con terceros**, lo que la acerca mucho al flujo de riqueza. Por eso una empresa tributa por una indemnización que supera el costo del bien repuesto, o por una deuda que un proveedor le condona, aunque nada de eso venga de su actividad habitual.

# La secuencia de determinación
$ Ingresos brutos − Devoluciones, bonificaciones y descuentos = INGRESO NETO
$ Ingreso neto − Costo computable = RENTA BRUTA
$ Renta bruta − Gastos deducibles = RENTA NETA
$ Renta neta ± Adiciones y deducciones tributarias = RENTA NETA IMPONIBLE
$ Renta neta imponible − Pérdidas arrastrables = BASE DEL IMPUESTO
$ Base × tasa − créditos = SALDO POR PAGAR O A FAVOR

El **costo computable** no es lo mismo que el gasto: es el costo de adquisición, producción o construcción del bien que se vende, y se resta para llegar a la renta bruta. Un error en el costo computable de un activo vendido es uno de los reparos más caros, porque mueve directamente la base del impuesto.

# Tasas vigentes
|Régimen o concepto|Tasa|
|Régimen General|29.5% sobre la renta neta imponible|
|RMT hasta 15 UIT de renta neta (S/ 82,500 en 2026)|10%|
|RMT por el exceso de 15 UIT|29.5%|
|RER|1.5% de ingresos netos mensuales, definitivo|
|Dividendos a personas naturales domiciliadas|5% de retención adicional|

# El gasto deducible: los cinco filtros
El artículo 37 permite deducir los gastos **necesarios para producir la renta y mantener su fuente**, siempre que no estén prohibidos. Sobre esa causalidad se aplican cuatro criterios adicionales que la jurisprudencia del Tribunal Fiscal ha consolidado:

1. **Causalidad**: relación entre el gasto y la generación de renta o el mantenimiento de la fuente.
2. **Razonabilidad**: proporción lógica entre el gasto y el volumen de operaciones.
3. **Proporcionalidad**: el gasto guarda relación cuantitativa con el nivel de actividad.
4. **Generalidad**, para gastos a favor del personal: el beneficio alcanza a todos los trabajadores en situación equivalente.
5. **Fehaciencia**: existe evidencia de que la operación realmente ocurrió.

> La **generalidad** se malinterpreta siempre. No significa dar lo mismo a todos: significa que el beneficio alcance a todos los que están en una situación equivalente. Un seguro médico para todos los gerentes cumple generalidad; el mismo seguro solo para el gerente que es hijo del accionista, no.

# Gastos con límite, que son los que más se reparan
|Gasto|Límite|
|Gastos de representación|0.5% de los ingresos brutos, tope 40 UIT|
|Gastos recreativos del personal|0.5% de los ingresos netos, tope 40 UIT|
|Donaciones a entidades calificadas|10% de la renta neta imponible|
|Intereses|Límite basado en el EBITDA tributario (regla de subcapitalización)|
|Vehículos de categorías A2, A3, A4 y asimilados, asignados a dirección y administración|Según número de vehículos e ingresos netos|
|Remuneración de accionistas, titulares y sus familiares|Valor de mercado; el exceso es dividendo|
|Viáticos al interior del país|Hasta el doble del límite para funcionarios públicos|
|Gastos de movilidad de trabajadores sin comprobante|Límite diario por trabajador, con planilla de movilidad|
|Boletas de venta de sujetos del NRUS|6% de lo anotado en el Registro de Compras que da derecho a deducir, con tope en UIT|

# Gastos prohibidos (artículo 44)
- Gastos personales y de sustento del contribuyente y sus familiares.
- El propio Impuesto a la Renta.
- Multas, recargos e intereses moratorios del sector público.
- Donaciones no calificadas y cualquier acto de liberalidad.
- Gastos sin comprobante de pago válido, o de proveedores no habidos a la fecha de emisión.
- El IGV que constituye crédito fiscal.
- Gastos en paraísos fiscales o jurisdicciones no cooperantes, con excepciones.
- La amortización de llaves, marcas y similares, salvo lo que la norma permite.

# Pagos a cuenta: los dos métodos
Durante el año se adelanta el impuesto. En el Régimen General se paga mensualmente **el mayor** entre:

$ a) Coeficiente = Impuesto calculado del ejercicio anterior ÷ Ingresos netos del ejercicio anterior
$ b) 1.5% de los ingresos netos del mes

Para **enero y febrero** se usa el coeficiente del ejercicio **precedente al anterior**, porque el del año pasado aún no está determinado cuando vencen esos pagos. Si no hubo impuesto en el ejercicio de referencia, se aplica el 1.5%.

Ejemplo: en 2025 una empresa tuvo impuesto calculado de S/ 84,000 e ingresos netos de S/ 2,400,000.
$ Coeficiente = 84,000 ÷ 2,400,000 = 0.0350
$ Marzo 2026, ingresos S/ 210,000:
$ Por coeficiente: 210,000 × 0.0350 = 7,350
$ Por el 1.5%:     210,000 × 0.015  = 3,150
$ Paga el mayor:   S/ 7,350

En el **RMT**, el pago a cuenta es el **1%** de los ingresos netos mensuales mientras los ingresos del ejercicio no superen 300 UIT; si los superan, se aplica la regla del coeficiente con mínimo de 1.5%.

# Suspensión y modificación de pagos a cuenta
El artículo 85 permite suspenderlos o modificarlos a partir de determinados meses, presentando un estado de resultados a una fecha de corte y cumpliendo los requisitos del reglamento. Es un recurso valioso para empresas cuya utilidad cayó frente al año anterior: evita adelantar un impuesto que no se deberá y que luego habría que pedir en devolución, con el costo financiero que implica.

! Adelantar impuesto no es neutro. Si una empresa paga S/ 60,000 de más durante el año y los recupera recién en la devolución de setiembre del año siguiente, ha financiado al Estado por más de doce meses sin interés. Evaluar la suspensión a tiempo es una decisión de tesorería, no un trámite.

# Créditos contra el impuesto anual
|Crédito|Comentario|
|Pagos a cuenta del ejercicio|Los doce pagos mensuales|
|ITAN efectivamente pagado|Si no se agota, es devolvible|
|Retenciones sufridas|Por rentas de tercera que hayan sido objeto de retención|
|Saldo a favor del ejercicio anterior|Arrastrado o solicitado en devolución|

# El ITAN
Impuesto Temporal a los Activos Netos: **0.4% sobre el valor de los activos netos al 31 de diciembre del año anterior que exceda de S/ 1,000,000**. Funciona como un pago a cuenta: lo pagado se aplica contra el Impuesto a la Renta del ejercicio y, si no se agota, puede solicitarse en devolución.

> Una empresa con mucho activo y poca utilidad lo siente, y muchas veces se olvida de pedir la devolución del saldo no aplicado, regalando dinero al fisco por desconocimiento. Es uno de los puntos donde un contador atento recupera más dinero del que cuesta su honorario.

@ Provisión del Impuesto a la Renta del ejercicio
@ 88|8811 Impuesto a la Renta corriente|123,900.00|
@ 40|40171 Renta de tercera categoría||123,900.00

@ Aplicación de los pagos a cuenta contra el impuesto anual
@ 40|40171 Renta de tercera categoría|96,000.00|
@ 40|40175 Pagos a cuenta del Impuesto a la Renta||96,000.00`,
  claves:['La LIR adopta un criterio mixto de renta; para la tercera categoría grava cualquier ganancia derivada de operaciones con terceros.','La secuencia va de ingreso neto a renta bruta (restando costo computable), a renta neta, a renta neta imponible y a la base del impuesto.','Cinco filtros del gasto: causalidad, razonabilidad, proporcionalidad, generalidad y fehaciencia.','Pago a cuenta del Régimen General: el mayor entre coeficiente y 1.5%; enero y febrero usan el coeficiente del ejercicio precedente al anterior.','El ITAN (0.4% sobre activos netos que exceden S/ 1,000,000) se aplica contra la renta y, si no se agota, es devolvible.'],
  preg:[
   {p:'¿Por qué una empresa tributa por una deuda que su proveedor le condona, si no recibió dinero?',
    r:'Porque para la tercera categoría la ley grava cualquier ganancia o ingreso derivado de operaciones con terceros, siguiendo la teoría del flujo de riqueza. La condonación es un enriquecimiento proveniente de un tercero: el pasivo desaparece y el patrimonio aumenta en ese importe, exactamente igual que si hubiera recibido el dinero y luego pagado la deuda. Contablemente se reconoce un ingreso (cuenta 75) y tributariamente es renta gravada. La misma lógica se aplica a una indemnización que excede el costo del bien repuesto.'},
   {p:'¿Cuál es la diferencia entre costo computable y gasto deducible, y por qué importa?',
    r:'El costo computable es lo que se resta del ingreso para llegar a la renta bruta: el costo del bien que se vendió o del activo que se enajenó. El gasto deducible se resta después, de la renta bruta, para llegar a la renta neta. Importa porque tienen reglas distintas de acreditación y de oportunidad: el costo computable de un inmueble o de acciones sigue reglas específicas de la ley, y su determinación errónea mueve la base del impuesto directamente. Además, ciertos desembolsos pueden ser costo o gasto según cómo se traten, con efectos muy distintos en el tiempo.'},
   {p:'Una empresa paga a su gerente, que es hijo del accionista, un sueldo tres veces mayor al de mercado. ¿Qué ocurre?',
    r:'El exceso sobre el valor de mercado no es deducible como gasto de personal, y además se considera dividendo para el perceptor, con la tributación que corresponde a los dividendos. La norma fija reglas específicas para determinar ese valor de mercado comparándolo con lo que gana el trabajador mejor remunerado que cumpla funciones similares, con topes. La lógica es impedir que se disfrace un reparto de utilidades como gasto deducible: repartir utilidades no reduce la base del impuesto, pagar sueldos sí, de modo que sin esta regla bastaría con subir el sueldo del socio para vaciar la base imponible.'},
   {p:'¿Por qué los pagos a cuenta de enero y febrero usan el coeficiente de hace dos ejercicios?',
    r:'Porque cuando vencen esos pagos, el impuesto del ejercicio anterior todavía no está determinado: la declaración anual se presenta entre marzo y abril. Usar el coeficiente del ejercicio precedente al anterior es la única referencia disponible. A partir de marzo, con la declaración anual presentada, se usa el coeficiente del ejercicio anterior. Esto genera un efecto práctico: si la empresa creció mucho en el ejercicio anterior, los pagos de enero y febrero quedarán cortos, y si cayó, quedarán largos; en el segundo caso conviene evaluar la modificación o suspensión.'},
   {p:'Una empresa va a tener un año mucho peor que el anterior. ¿Qué puede hacer con sus pagos a cuenta y qué cuesta no hacerlo?',
    r:'Puede solicitar la suspensión o la modificación de los pagos a cuenta a partir de los meses que la norma permite, presentando un estado de resultados a la fecha de corte y cumpliendo los requisitos del reglamento, incluidos los ratios y la información que exige. Si no lo hace, seguirá pagando sobre la base de un año bueno que no se repetirá, acumulará un saldo a favor grande y recién lo recuperará al presentar la declaración anual, aplicándolo contra los pagos del ejercicio siguiente o pidiendo devolución, que toma meses. En términos financieros, está dando un préstamo sin interés al Estado justo en el año en que más necesita su caja.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una empresa en el Régimen General tiene renta neta imponible de S/ 420,000. ¿Cuánto es su Impuesto a la Renta anual?',
    u:'S/',r:123900,tol:1,
    s:'Impuesto = 420,000 × 29.5% = **S/ 123,900**\n\nContra ese importe se aplican los pagos a cuenta del ejercicio, el ITAN pagado, las retenciones sufridas y el saldo a favor del ejercicio anterior. Si los créditos superan el impuesto, queda saldo a favor, que puede aplicarse contra los pagos a cuenta del ejercicio siguiente o solicitarse en devolución.'},
   {l:1,t:'mc',p:'Una multa de SUNAT por presentar una declaración fuera de plazo, ¿es deducible?',
    o:['Sí, es un gasto necesario del negocio','No: el artículo 44 prohíbe deducir multas y sanciones del sector público','Sí, hasta el 0.5% de los ingresos','Solo si se paga en el mismo ejercicio'],r:1,
    s:'No es deducible. El artículo 44 inciso c prohíbe deducir multas, recargos, intereses moratorios y sanciones aplicadas por el sector público. Se registra contablemente como gasto porque el hecho económico ocurrió, pero en la declaración anual se adiciona como diferencia permanente. Es decir, la empresa paga la multa y además paga impuesto sobre ella: el costo real de una multa de S/ 1,000 es S/ 1,295.'},
   {l:2,t:'num',p:'Una empresa con ingresos brutos anuales de S/ 3,200,000 gastó S/ 24,000 en gastos de representación. ¿Cuánto es deducible?',
    u:'S/',r:16000,tol:1,
    s:'Límite: 0.5% de los ingresos brutos, con tope de 40 UIT.\nLímite por porcentaje = 3,200,000 × 0.5% = **S/ 16,000**\nTope absoluto = 40 × 5,500 = S/ 220,000, que no resulta restrictivo aquí.\n\nDeducible: **S/ 16,000**. No deducible: S/ 8,000, que se adiciona como diferencia permanente. Costo tributario del exceso: 8,000 × 29.5% = S/ 2,360.\n\nDetalle práctico: los gastos de representación son los destinados a presentar la imagen de la empresa o agasajar clientes. No se confunden con la **publicidad** dirigida a consumidores en general, que no tiene ese límite. Clasificar bien una cena con clientes frente a una campaña en redes es parte del trabajo de cierre.'},
   {l:2,t:'num',p:'En 2025 una empresa tuvo impuesto calculado de S/ 96,000 e ingresos netos de S/ 3,000,000. En abril de 2026 factura S/ 250,000. ¿Cuánto paga de pago a cuenta?',
    u:'S/',r:8000,tol:1,
    s:'Coeficiente = 96,000 ÷ 3,000,000 = **0.0320** (se redondea a cuatro decimales)\nPor coeficiente: 250,000 × 0.0320 = **S/ 8,000**\nPor el 1.5%: 250,000 × 0.015 = S/ 3,750\n\nSe paga el **mayor: S/ 8,000**.\n\nDos precisiones: para enero y febrero de 2026 se habría usado el coeficiente de 2024, porque el impuesto de 2025 se determina recién al presentar la declaración anual; y si la empresa prevé una utilidad mucho menor en 2026, puede evaluar la modificación o suspensión de pagos a cuenta a partir de los meses que la norma permite.'},
   {l:3,t:'ab',p:'Determina el Impuesto a la Renta de 2026 de una empresa del Régimen General: utilidad contable antes de impuestos S/ 850,000; multas de SUNAT S/ 12,000; gastos de representación S/ 40,000 (ingresos brutos S/ 4,000,000); depreciación contable de vehículos S/ 90,000 frente a un máximo tributario de S/ 72,000; provisión de cobranza dudosa S/ 30,000 sin el análisis documentado; dividendos recibidos de otra empresa domiciliada S/ 25,000. Pagos a cuenta S/ 180,000; ITAN pagado S/ 14,000.',
    s:'**Conciliación tributaria**\n\n| Concepto | Importe | Tipo |\n|---|---|---|\n| Utilidad contable antes de impuestos | 850,000 | |\n| (+) Multas de SUNAT | 12,000 | Permanente |\n| (+) Exceso de gastos de representación | 20,000 | Permanente |\n| (+) Exceso de depreciación de vehículos | 18,000 | Temporal |\n| (+) Provisión de cobranza dudosa sin requisitos | 30,000 | Temporal |\n| (−) Dividendos de empresa domiciliada | (25,000) | Permanente |\n| **Renta neta imponible** | **905,000** | |\n\nLímite de representación: 4,000,000 × 0.5% = S/ 20,000 deducibles; el exceso de los S/ 40,000 gastados es S/ 20,000.\nLos dividendos recibidos de otra persona jurídica domiciliada no están gravados con tercera categoría, porque ya tributaron en la empresa que los generó.\n\n**Impuesto y liquidación**\n\n| Concepto | Importe |\n|---|---|\n| Renta neta imponible | 905,000 |\n| Impuesto a la Renta (29.5%) | 266,975 |\n| (−) Pagos a cuenta | (180,000) |\n| (−) ITAN aplicado | (14,000) |\n| **Saldo por regularizar** | **72,975** |\n\n**Impuesto diferido (NIC 12).** Las adiciones temporales suman S/ 48,000 y generan un **activo tributario diferido** de 48,000 × 29.5% = **S/ 14,160**, porque son gastos ya reconocidos contablemente que se deducirán en el futuro.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 14,160.00 | |\n| 8812 | Impuesto a la Renta diferido | | 14,160.00 |\n\n**Tasa efectiva:** gasto corriente 266,975 menos diferido 14,160 = gasto neto S/ 252,815 sobre utilidad contable de S/ 850,000 = **29.7%**, por encima del 29.5% nominal por efecto de las diferencias permanentes netas (12,000 + 20,000 − 25,000 = S/ 7,000).\n\n**Acción concreta para el ejercicio siguiente:** los S/ 30,000 de cobranza dudosa serían deducibles si se armara el expediente que exige la norma (análisis de morosidad caso por caso, gestiones de cobro documentadas o mora mayor a doce meses, y discriminación en el Libro de Inventarios y Balances). Es trabajo de documentación, no de contabilidad, y vale S/ 8,850 de impuesto.'}
  ],
  proy:{
   t:'La determinación anual de tu empresa',
   ctx:`Vas a calcular el Impuesto a la Renta anual de tu empresa, partiendo de los estados financieros que formulaste en 2.6 y de la lista de diferencias que vienes acumulando desde 2.4. Es el cálculo que todo contador hace una vez al año y del que depende el cheque más grande que la empresa firma.`,
   pasos:[
    'Proyecta el resultado anual de tu empresa a partir de los dos meses registrados, explicando los supuestos.',
    'Arma el papel de trabajo de adiciones y deducciones: una línea por partida, con el importe, la base legal citada (artículo e inciso) y la clasificación como permanente o temporal.',
    'Incluye al menos cuatro adiciones realistas para tu tipo de negocio: revisa los límites de representación, recreativos, movilidad y vehículos, y los gastos prohibidos del artículo 44.',
    'Calcula la renta neta imponible y el impuesto con la tasa del régimen que recomendaste en 3.3.',
    'Determina los pagos a cuenta que tu empresa debió hacer cada mes, con el método que corresponda, y aplícalos como crédito.',
    'Evalúa si tu empresa estaría afecta al ITAN: calcula sus activos netos y compáralos con el S/ 1,000,000.',
    'Registra los asientos de provisión del impuesto, aplicación de créditos y, si corresponde, del impuesto diferido.',
    'Calcula la tasa efectiva y explica en qué se aparta del 29.5% o del 10%.'
   ],
   entrega:[
    'El papel de trabajo de adiciones y deducciones con base legal por partida.',
    'La determinación del impuesto con los créditos aplicados.',
    'El cálculo del ITAN o la justificación de que no aplica.',
    'Los asientos y el cálculo de la tasa efectiva con su explicación.'
   ],
   crit:[
    'Cada adición cita el artículo e inciso que la sustenta.',
    'Las diferencias están clasificadas correctamente en permanentes y temporales.',
    'La tasa efectiva está explicada por las diferencias permanentes, no por las temporales.'
   ],
   pista:'La prueba de que entendiste la diferencia entre permanente y temporal es esta: la suma de los efectos de las permanentes debe explicar exactamente la distancia entre la tasa nominal y la efectiva. Si no cuadra, alguna está mal clasificada.'
  },
  proyInt:{
   t:'Planificación tributaria anual de tu empresa',
   integra:'1.1 a 3.4',
   ctx:`Planificar no es evadir: es tomar a tiempo decisiones legítimas que reducen el impuesto o mejoran la caja. Vas a construir el plan tributario anual de tu empresa usando todo lo que has aprendido, desde las políticas contables del Módulo 1 hasta la determinación de este subtema.`,
   pasos:[
    'Identifica las tres adiciones más grandes de tu empresa y evalúa, para cada una, si pueden eliminarse legítimamente: documentar mejor, pagar dentro de plazo, redistribuir un beneficio para que cumpla generalidad, acreditar un desmedro.',
    'Cuantifica el ahorro de cada medida en soles y el esfuerzo que exige, y ordénalas por rendimiento.',
    'Evalúa el efecto financiero de los pagos a cuenta: calcula cuánto adelantaría tu empresa en el año y si convendría solicitar la suspensión o modificación, con el ahorro financiero estimado.',
    'Revisa la decisión de régimen de 3.3 con los números ya calculados: ¿la recomendación se mantiene?',
    'Arma el cronograma de decisiones del año: qué hay que hacer en cada mes para que las deducciones se sostengan (documentar cobranza dudosa, acreditar desmedros, pagar beneficios antes del plazo, revisar límites de representación).',
    'Redacta el informe de planificación tributaria de dos páginas para el dueño, con el ahorro total estimado y la advertencia de lo que NO es planificación sino riesgo.'
   ],
   entrega:[
    'El análisis de las tres adiciones principales con su ahorro cuantificado.',
    'La evaluación del efecto financiero de los pagos a cuenta.',
    'El cronograma anual de decisiones.',
    'El informe de planificación de dos páginas.'
   ],
   crit:[
    'Todas las medidas propuestas son legítimas y se apoyan en una norma concreta.',
    'El ahorro está cuantificado en soles, no descrito como significativo.',
    'El informe distingue claramente planificación de elusión, con un ejemplo de cada una.'
   ],
   pista:'La planificación más rentable de una MYPE peruana casi nunca es sofisticada: es documentar bien lo que ya hace. Gastos sin comprobante, provisiones sin expediente y pagos no bancarizados suelen costar más que cualquier estructura compleja.'
  },
  fuentes:[
   {a:'TUO de la Ley del Impuesto a la Renta (D.S. 179-2004-EF)', o:'Artículos 1, 3, 20, 37, 44, 57 y 85', n:'concepto de renta, determinación, gastos deducibles y prohibidos, devengo y pagos a cuenta'},
   {a:'Juan Roque García Mullín', o:'Manual del Impuesto a la Renta', n:'las tres teorías de la renta y su recepción en las legislaciones latinoamericanas'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'análisis de la hipótesis de incidencia y del criterio mixto adoptado por la ley peruana'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'causalidad, los límites de cada gasto y los reparos más frecuentes'},
   {a:'Ley 28424', o:'Impuesto Temporal a los Activos Netos (ITAN)', n:'base de cálculo, tasa y aplicación como crédito contra el Impuesto a la Renta'}
  ]
 },
 {
  id:'m3t5', titulo:'Operaciones exoneradas, inafectas y exportaciones', min:22,
  cont:`No todas las operaciones pagan IGV, y las razones por las que no lo pagan son jurídicamente distintas. Confundirlas lleva a errores caros, porque cada categoría tiene un efecto diferente sobre el crédito fiscal.

# Inafectación frente a exoneración
|Categoría|Qué significa|Efecto en el crédito fiscal|
|**Inafecta**|La operación está **fuera del ámbito** del impuesto: el hecho nunca encajó en la hipótesis de incidencia|No da derecho a crédito fiscal|
|**Exonerada**|La operación **sí está dentro** del ámbito, pero una norma la libera temporalmente del pago|No da derecho a crédito fiscal|
|**Gravada con tasa 0% (exportación)**|Está dentro del ámbito y gravada, con tasa cero en destino|**Sí da derecho**, y además genera saldo a favor devolvible|

Ruiz de Castilla y Bravo Cucci insisten en esta distinción: la inafectación es un problema de **ámbito** (el hecho no está alcanzado), mientras que la exoneración es un **beneficio** sobre un hecho que sí está alcanzado. De ahí se deriva una consecuencia práctica inmediata: las exoneraciones son **temporales** por mandato constitucional y de las normas sobre beneficios tributarios, y deben renovarse; las inafectaciones no caducan porque no son beneficios.

# Operaciones inafectas típicas (artículo 2 de la Ley del IGV)
- El arrendamiento de bienes muebles e inmuebles por personas naturales que constituya renta de primera o segunda categoría.
- La transferencia de bienes usados por personas naturales que no realizan actividad empresarial.
- La transferencia de bienes en caso de **reorganización de empresas**.
- La importación de bienes donados a entidades religiosas o con fines culturales, con requisitos.
- Los servicios de crédito prestados por entidades del sistema financiero, en los términos de la norma.
- Las regalías por contratos de licencia conforme a la ley de la materia, según el caso.

# Operaciones exoneradas
Están en los **apéndices I y II** de la Ley del IGV:
- **Apéndice I**: venta en el país o importación de determinados bienes, principalmente productos agrícolas en estado natural (papa, arroz con cáscara, leche cruda, pescado fresco, entre otros) y la primera venta de inmuebles destinados a vivienda hasta cierto valor en UIT.
- **Apéndice II**: determinados servicios, como el transporte público de pasajeros dentro del país (con exclusiones), los servicios de espectáculos culturales calificados, y los servicios de crédito en los casos señalados.

# La renuncia a la exoneración
El Apéndice I permite **renunciar a la exoneración** mediante el procedimiento que fija SUNAT. ¿Por qué alguien renunciaría a no pagar un impuesto? Porque la exoneración tiene un costo escondido: al no estar gravadas las ventas, el IGV de las compras no es crédito fiscal y se convierte en costo.

Ejemplo: una empresa que compra insumos gravados por S/ 100,000 (IGV S/ 18,000) para producir bienes exonerados pierde esos S/ 18,000 como crédito. Si renuncia a la exoneración, cobra IGV a sus clientes —que si son empresas lo usarán como crédito— y recupera los S/ 18,000. La renuncia conviene cuando los clientes son empresas con derecho a crédito; no conviene cuando se vende a consumidores finales, porque el precio final subiría 18%.

> La renuncia es **definitiva** y alcanza a todas las operaciones del contribuyente comprendidas en el apéndice: no se puede renunciar para unos clientes y mantener la exoneración para otros. Es una decisión estratégica, no una optimización mensual.

# Exportación: tasa cero y saldo a favor
El artículo 33 de la Ley del IGV establece que la exportación de bienes y servicios **no está afecta** al IGV, lo que en la práctica funciona como una tasa cero: el exportador no cobra IGV, pero sí conserva el derecho al crédito fiscal de sus compras. Ese crédito, que no tiene débito contra el cual aplicarse, se convierte en **Saldo a Favor del Exportador**.

$ Saldo a Favor del Exportador = Crédito fiscal de las adquisiciones destinadas a la exportación
$ Límite del Saldo a Favor Materia de Beneficio (SFMB) = 18% de las exportaciones embarcadas del periodo
$ Orden de aplicación: 1) contra el IGV por pagar  2) contra el pago a cuenta y la regularización del IR
$   3) contra otras deudas tributarias  4) devolución

La lógica del régimen es que los impuestos no se exportan: el bien debe llegar al mercado de destino sin carga tributaria del país de origen, para competir en igualdad de condiciones. Por eso, a diferencia de la exoneración, aquí sí se devuelve el impuesto pagado en la cadena.

# Exportación de servicios
Es el punto donde más errores se cometen. Para que un servicio califique como exportación debe cumplir, entre otros, que el prestador esté domiciliado en el país, que el usuario sea no domiciliado, que el uso o aprovechamiento del servicio tenga lugar **en el extranjero**, y que esté comprendido en el Apéndice V de la ley cuando corresponda, además del registro que la norma exija.

! El requisito que más reparos produce es el del **uso en el extranjero**. Un servicio de asesoría prestado a una empresa extranjera, pero cuyo resultado se usa para una operación en el Perú, no es exportación y está gravado. Documentar dónde se aprovecha el servicio —con el contrato, los entregables y la evidencia de la operación del cliente— es lo que sostiene la calificación ante una fiscalización.

# Efecto en la prorrata
Las exportaciones **se suman a las ventas gravadas** en el numerador del coeficiente de prorrata, precisamente porque dan derecho a crédito. Las operaciones exoneradas e inafectas van solo en el denominador. Por eso un exportador que además vende exonerado en el mercado local debe ser especialmente cuidadoso con las tres columnas del Registro de Compras.

$ Coeficiente = (Ventas gravadas + exportaciones) ÷ (Ventas gravadas + exportaciones + no gravadas)

# Registro contable del saldo a favor
@ Reconocimiento del saldo a favor del exportador compensado contra el pago a cuenta de renta
@ 40|40171 Renta de tercera categoría|12,000.00|
@ 40|40114 IGV - Saldo a favor del exportador||12,000.00

@ Devolución del saldo a favor solicitada y abonada en cuenta
@ 10|1041 Cuentas corrientes operativas|25,000.00|
@ 40|40114 IGV - Saldo a favor del exportador||25,000.00

# Un cuadro para no confundirse nunca más
|Si la operación es…|¿Se cobra IGV?|¿Hay crédito fiscal de las compras?|¿Entra al numerador de la prorrata?|
|Gravada|Sí, 18%|Sí|Sí|
|Exportación|No|Sí, con derecho a devolución|Sí|
|Exonerada|No|No: va al costo|No|
|Inafecta|No|No: va al costo|No|`,
  claves:['Inafectación es estar fuera del ámbito; exoneración es estar dentro pero liberado temporalmente. Ninguna da crédito fiscal.','La exportación no está afecta pero conserva el crédito fiscal y genera saldo a favor devolvible: los impuestos no se exportan.','Se puede renunciar a la exoneración del Apéndice I; conviene cuando los clientes son empresas con derecho a crédito.','El saldo a favor materia de beneficio tiene como límite el 18% de las exportaciones embarcadas del periodo.','Las exportaciones van al numerador de la prorrata; las exoneradas e inafectas, solo al denominador.'],
  preg:[
   {p:'Si ni la exoneración ni la inafectación dan derecho a crédito fiscal, ¿por qué importa distinguirlas?',
    r:'Por tres razones prácticas. Primera, las exoneraciones son temporales y deben renovarse por ley, mientras que las inafectaciones no caducan: una empresa cuyo negocio depende de una exoneración tiene un riesgo regulatorio que debe prever. Segunda, a la exoneración del Apéndice I se puede renunciar, a la inafectación no, porque no hay beneficio al que renunciar. Tercera, su tratamiento en formularios, registros y en la determinación de la prorrata sigue reglas distintas. La distinción es jurídica en su origen y muy concreta en sus efectos.'},
   {p:'¿Por qué el Estado devuelve el IGV a un exportador pero no a quien vende exonerado?',
    r:'Por el principio de imposición en el país de destino: los bienes y servicios deben llegar al mercado extranjero sin carga tributaria del país de origen, para que compitan en igualdad de condiciones con los productos locales de ese mercado, que allá pagarán su propio impuesto al consumo. Si el Perú no devolviera el IGV de la cadena, el exportador peruano llevaría ese costo incorporado al precio y competiría en desventaja. La exoneración, en cambio, no busca eso: busca abaratar un consumo interno, y el legislador acepta que el IGV de las compras quede como costo.'},
   {p:'Una empresa que vende productos exonerados evalúa renunciar a la exoneración. ¿Qué necesitas saber para aconsejarla?',
    r:'Quiénes son sus clientes y cuánto IGV paga en sus compras. Si vende a empresas con derecho a crédito fiscal, la renuncia les es indiferente a ellas (recuperan el IGV) y a ella le devuelve el crédito de sus compras: conviene. Si vende a consumidores finales o a sujetos sin derecho a crédito, el precio final subiría 18% o tendría que absorberlo reduciendo su margen: no conviene. También hay que considerar que la renuncia es definitiva y alcanza a todas sus operaciones del apéndice, así que una empresa con los dos tipos de clientes debe calcular el efecto neto antes de decidir.'},
   {p:'Un consultor peruano presta un servicio a una empresa chilena que lo usa para gestionar su sucursal en Lima. ¿Es exportación de servicios?',
    r:'No, porque el uso o aprovechamiento del servicio ocurre en el Perú, aunque el cliente sea no domiciliado y pague desde el extranjero. El requisito central no es dónde está el cliente ni de dónde viene el dinero, sino dónde se aprovecha el servicio. Al no calificar como exportación, la operación está gravada con IGV al 18%. Este es el reparo más frecuente en empresas de servicios que facturan al exterior, y la defensa se construye con documentación: contrato que precise el lugar de aprovechamiento, entregables, y evidencia de la operación del cliente en el extranjero.'},
   {p:'¿Por qué las exportaciones suman en el numerador de la prorrata y las exoneradas no?',
    r:'Porque el numerador recoge las operaciones que **dan derecho a crédito fiscal**, y la exportación lo da aunque no se cobre impuesto. Si las exportaciones fueran solo al denominador, un exportador puro tendría coeficiente cero y perdería todo su crédito, lo que contradiría el régimen de devolución. Las exoneradas e inafectas, en cambio, no generan derecho a crédito, así que entran solo al denominador y reducen proporcionalmente el crédito utilizable de las compras comunes. La fórmula es coherente con la lógica del impuesto: se recupera el IGV de lo que alimenta operaciones con derecho a crédito.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas operaciones da derecho a usar el crédito fiscal de las compras relacionadas?',
    o:['Venta de papa en estado natural (exonerada)','Exportación de confecciones','Arrendamiento de un inmueble por una persona natural (inafecto)','Venta de leche cruda (exonerada)'],r:1,
    s:'La exportación. Aunque no se cobra IGV al cliente del exterior, la operación conserva el derecho al crédito fiscal de las adquisiciones y genera Saldo a Favor del Exportador, que puede compensarse o devolverse. Las operaciones exoneradas e inafectas no dan ese derecho: el IGV de sus compras se convierte en costo o gasto.'},
   {l:1,t:'mc',p:'¿Qué diferencia jurídica hay entre una operación inafecta y una exonerada?',
    o:['Ninguna, son sinónimos','La inafecta está fuera del ámbito del impuesto; la exonerada está dentro pero liberada temporalmente','La inafecta paga la mitad del impuesto','La exonerada no requiere comprobante'],r:1,
    s:'La inafectación significa que el hecho nunca encajó en la hipótesis de incidencia del impuesto: está fuera de su ámbito. La exoneración significa que el hecho sí está alcanzado, pero una norma lo libera del pago, normalmente por un plazo determinado que debe renovarse. De ahí se derivan efectos distintos: a la exoneración del Apéndice I se puede renunciar, y las exoneraciones caducan; las inafectaciones no.'},
   {l:2,t:'num',p:'Un exportador tiene en el mes exportaciones embarcadas por S/ 500,000 y crédito fiscal acumulado de S/ 110,000. ¿Cuál es el límite del saldo a favor materia de beneficio?',
    u:'S/',r:90000,tol:1,
    s:'Límite = 18% de las exportaciones embarcadas del periodo = 500,000 × 18% = **S/ 90,000**\n\nAunque su crédito fiscal acumulado sea S/ 110,000, el saldo a favor materia de beneficio del periodo está limitado a S/ 90,000. Los S/ 20,000 restantes no se pierden: se arrastran a los periodos siguientes y podrán formar parte del beneficio cuando haya más exportaciones embarcadas. Por eso el control del límite mes a mes es parte del trabajo de un contador de empresa exportadora.'},
   {l:2,t:'ab',p:'Una empresa agroindustrial vende papa en estado natural (exonerada) a supermercados, que son contribuyentes del Régimen General. Compra insumos y servicios gravados por S/ 400,000 al año (IGV S/ 72,000). Evalúa si le conviene renunciar a la exoneración.',
    s:'**Situación actual (con exoneración):**\nNo cobra IGV en sus ventas. El IGV de sus compras, **S/ 72,000 al año, se convierte en costo** porque no hay crédito fiscal. Ese costo reduce su margen o se traslada al precio.\n\n**Con renuncia a la exoneración:**\nCobra IGV 18% a los supermercados. Como son contribuyentes del Régimen General con operaciones gravadas, ese IGV es **crédito fiscal para ellos**: no les significa mayor costo, solo un desembolso que recuperan.\nLa empresa, a cambio, recupera los **S/ 72,000** de crédito fiscal de sus compras, que dejan de ser costo.\n\n**Efecto anual estimado:** +S/ 72,000 de margen, menos el mayor costo administrativo de llevar el control del crédito.\n\n**Conviene renunciar**, y la razón de fondo es que **todos sus clientes tienen derecho a crédito fiscal**. El IGV que cobre no encarece su producto para ellos.\n\n**Las tres advertencias antes de decidir:**\n\n1. **La renuncia es definitiva** y alcanza a todas las operaciones comprendidas en el apéndice. Si la empresa planea vender también en mercados o ferias a consumidores finales, ahí sí tendría que cobrar un 18% que encarece el producto o reduce su margen. Hay que proyectar la mezcla de clientes a varios años, no solo la actual.\n2. **El procedimiento tiene requisitos formales** y surte efecto desde el periodo que la norma establece: no es automático ni retroactivo.\n3. **Hay que verificar la situación de los clientes**: si una parte relevante de las ventas fuera a sujetos del NRUS o a entidades sin derecho a crédito, el cálculo cambia y habría que ponderar.\n\n**Cómo presentarlo al dueño:** no como un tema tributario sino de margen. "Hoy estás regalando S/ 72,000 al año porque el impuesto de tus compras se queda contigo. Si cobras IGV a los supermercados, ellos lo recuperan y tú también".'},
   {l:3,t:'ab',p:'Una empresa de software peruana factura S/ 900,000 al año: S/ 500,000 a clientes del exterior que usan el software en sus países, S/ 300,000 a empresas peruanas y S/ 100,000 de licencias a una entidad educativa exonerada. Sus compras comunes tienen IGV de S/ 54,000 y las destinadas solo a clientes nacionales S/ 18,000. Determina el crédito utilizable y el saldo a favor.',
    s:'**Paso 1 — Clasificar cada operación**\n\n| Operación | Importe | Categoría | ¿Da derecho a crédito? |\n|---|---|---|---|\n| Servicios a clientes del exterior, aprovechados allá | 500,000 | Exportación de servicios | Sí |\n| Servicios a empresas peruanas | 300,000 | Gravada 18% | Sí |\n| Licencias a entidad educativa exonerada | 100,000 | Exonerada | No |\n\nUna precisión importante: que el cliente sea una entidad exonerada **no exonera la operación**; lo que importa es si la operación está en los apéndices. Aquí se asume que lo está; si no lo estuviera, sería gravada y el análisis cambiaría por completo. Este es exactamente el tipo de verificación que hay que hacer antes de calcular.\n\n**Paso 2 — Coeficiente de prorrata**\nNumerador (operaciones con derecho a crédito) = 500,000 + 300,000 = S/ 800,000\nDenominador (total) = S/ 900,000\n**Coeficiente = 800,000 ÷ 900,000 = 0.8889 → 88.89%**\n\n**Paso 3 — Crédito utilizable**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Compras de uso exclusivo en operaciones con derecho a crédito | 100% de 18,000 | 18,000 |\n| Compras de uso común | 54,000 × 88.89% | 48,000 |\n| **Crédito fiscal utilizable** | | **66,000** |\n\nLos S/ 6,000 restantes de las compras comunes (54,000 − 48,000) se van al costo o gasto.\n\n**Paso 4 — Saldo a favor del exportador**\nEl crédito atribuible a las exportaciones puede convertirse en saldo a favor, con el límite del 18% de las exportaciones del periodo:\nLímite = 500,000 × 18% = **S/ 90,000** anuales, que no resulta restrictivo aquí porque el crédito total es menor.\n\nEl débito fiscal de las operaciones gravadas nacionales es 300,000 × 18% = S/ 54,000. Como el crédito utilizable (S/ 66,000) lo supera, quedan S/ 12,000 de saldo a favor susceptibles de compensación contra el pago a cuenta del Impuesto a la Renta, otras deudas tributarias, o devolución.\n\n**Lo que esta empresa debe cuidar, en orden de riesgo:**\n\n1. **Documentar el aprovechamiento en el exterior** de cada servicio exportado: contrato que lo precise, evidencia de que el cliente opera fuera del Perú y de dónde se usa el software. Si SUNAT recalifica esas operaciones como gravadas, el impuesto omitido sería 500,000 × 18% = S/ 90,000, más multas e intereses.\n2. **Llevar el Registro de Compras en tres columnas.** Sin esa discriminación, puede perder el crédito de uso exclusivo y quedarse con 34,000 × 88.89% en lugar de los S/ 66,000 calculados.\n3. **Verificar la exoneración de las licencias:** si no estuvieran realmente exoneradas, estaría omitiendo IGV por S/ 18,000 al año.'}
  ],
  proy:{
   t:'El mapa de operaciones de tu empresa frente al IGV',
   ctx:`Casi todas las empresas tienen alguna operación que no es simplemente "venta gravada": una exportación, una venta exonerada, un retiro de bienes, una operación inafecta. Vas a mapear las de tu empresa y a calcular su efecto real en el crédito fiscal.`,
   pasos:[
    'Lista todas las operaciones de ingreso de tu empresa y clasifica cada una como gravada, exportación, exonerada o inafecta, citando la base legal de las tres últimas.',
    'Si tu empresa no tiene ninguna operación no gravada, invéntale una línea de negocio realista que sí la tenga (por ejemplo, venta de un producto del Apéndice I o un servicio a un cliente del exterior) y trabaja con ella.',
    'Calcula el coeficiente de prorrata de tu empresa y determina el crédito fiscal utilizable del periodo, separando las tres cestas de compras.',
    'Si incluiste una exportación, calcula el saldo a favor y su límite del 18%, y define el orden de aplicación que seguirías.',
    'Evalúa si a tu empresa le convendría renunciar a alguna exoneración, con el cálculo del efecto en margen.',
    'Diseña el formato del Registro de Compras de tu empresa con las tres columnas de destino, e instruye en media página a quien registra: cómo decidir en qué columna va cada compra.'
   ],
   entrega:[
    'El mapa de operaciones con su clasificación y base legal.',
    'El cálculo del coeficiente y del crédito utilizable por cestas.',
    'El cálculo del saldo a favor del exportador, si aplica.',
    'El formato de Registro de Compras con la instrucción de uso.'
   ],
   crit:[
    'Cada operación no gravada cita el apéndice o el artículo que la sustenta.',
    'Las tres cestas de compras están correctamente asignadas, con criterio explicado.',
    'La instrucción de media página es aplicable por alguien sin formación tributaria.'
   ],
   pista:'La pregunta que resuelve casi todas las dudas de clasificación de una compra es: ¿esta compra alimenta una venta que cobra IGV? Si sí, cesta 1. Si alimenta solo ventas sin IGV, cesta 2. Si alimenta ambas, cesta 3.'
  },
  proyInt:{
   t:'Manual tributario completo de tu empresa',
   integra:'1.1 a 3.5',
   ctx:`Este proyecto cierra el Módulo 3 y produce el documento que acompaña al manual contable: el manual tributario. Reúne el IGV, los sistemas administrativos, el régimen, la renta y el tratamiento de las operaciones especiales de tu empresa.`,
   pasos:[
    'Arma el manual con seis capítulos: (1) identificación y régimen, (2) IGV: operaciones, nacimiento de la obligación y crédito fiscal, (3) sistemas administrativos aplicables, (4) Impuesto a la Renta: determinación y pagos a cuenta, (5) operaciones especiales (exoneradas, inafectas, exportaciones, retiros), (6) calendario y controles.',
    'En cada capítulo, incluye el procedimiento concreto que debe seguir tu empresa, no la explicación teórica: qué se verifica, quién lo hace y con qué documento.',
    'Agrega un anexo con los asientos tipo de tu empresa: compra con IGV, compra con detracción, venta gravada, venta exonerada o exportación, pago de IGV, pago a cuenta de renta y provisión del impuesto anual.',
    'Agrega un segundo anexo con la matriz de riesgos tributarios actualizada, incorporando los riesgos nuevos de este subtema (exportación recalificada, exoneración mal aplicada, prorrata mal calculada).',
    'Integra el manual tributario con el manual contable de los módulos anteriores en un solo documento con índice unificado.',
    'Haz una autoevaluación final: recorre las preguntas abiertas que arrastras desde 1.2 y tacha las que ya puedes responder.'
   ],
   entrega:[
    'El manual tributario con sus seis capítulos.',
    'Los dos anexos: asientos tipo y matriz de riesgos.',
    'El documento integrado contable-tributario con índice unificado.',
    'La lista de preguntas abiertas actualizada.'
   ],
   crit:[
    'Los capítulos describen procedimientos ejecutables, no teoría copiada.',
    'Los asientos tipo usan las cuentas del plan propio de tu empresa, no códigos genéricos.',
    'La matriz de riesgos cuantifica el impacto de cada riesgo nuevo.'
   ],
   pista:'Un manual tributario real se mide por una prueba simple: si el contador se enferma una semana, ¿alguien más podría cumplir las obligaciones del mes leyéndolo? Si la respuesta es no, todavía le falta detalle operativo.'
  },
  fuentes:[
   {a:'TUO de la Ley del IGV e ISC', o:'Artículos 2, 5, 33 y Apéndices I, II y V', n:'inafectaciones, exoneraciones, exportación de bienes y servicios'},
   {a:'Walker Villanueva Gutiérrez', o:'Tratado del IGV: regímenes general y especiales', n:'distinción entre inafectación y exoneración, y análisis del régimen de exportación'},
   {a:'Francisco Ruiz de Castilla', o:'Derecho Tributario: temas básicos', n:'ámbito de aplicación, hipótesis de incidencia y beneficios tributarios'},
   {a:'D.S. 126-94-EF', o:'Reglamento de Notas de Crédito Negociables', n:'procedimiento del saldo a favor materia de beneficio y su devolución'},
   {a:'Jorge Bravo Cucci', o:'Fundamentos de Derecho Tributario', n:'naturaleza jurídica de la exoneración y su carácter temporal'}
  ]
 }
 ]
}
);
