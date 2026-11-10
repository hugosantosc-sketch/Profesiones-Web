/* Contenido del curso — m3
   Formato del mini-marcado (campo cont):
     '# '  subtítulo      '- '  lista        '1. ' lista numerada
     '> '  nota           '! '  advertencia  '$ ' fórmula
     '|'   tabla (primera fila = encabezado)
     '@'   asiento contable: primera línea título, luego cta|detalle|debe|haber
   En línea: **negrita**  ~código~
   Ejercicios: l = nivel (1 fácil, 2 medio, 3 difícil), t = mc | num | ab
*/
(window.CURSO = window.CURSO || []).push(
{
 id:'m3', nivel:'Intermedio', titulo:'IGV, regímenes tributarios y renta empresarial',
 resumen:'La tributación que atraviesa todo registro contable: IGV mensual, detracciones, retenciones, elección de régimen y pagos a cuenta de renta.',
 temas:[
 {
  id:'m3t1', titulo:'IGV: débito fiscal, crédito fiscal y liquidación mensual', min:17,
  cont:`El IGV es un impuesto al valor agregado con tasa total de **18%**, compuesta por 16% de IGV propiamente y 2% de Impuesto de Promoción Municipal. La empresa no lo paga: lo **recauda**. Por eso contablemente nunca es gasto ni ingreso, es pasivo o activo.

$ IGV por pagar del mes = Débito fiscal (ventas) − Crédito fiscal (compras)
$ Si el crédito es mayor, el exceso se arrastra a los meses siguientes, sin límite de tiempo

# Cómo se calcula sobre un precio
|Dato que tienes|Cálculo|Ejemplo|
|Base imponible|IGV = Base × 0.18|Base 1,000 → IGV 180 → Total 1,180|
|Precio con IGV|Base = Total ÷ 1.18|Total 1,180 → Base 1,000 → IGV 180|
|Precio con IGV|IGV = Total × 0.18 ÷ 1.18|1,180 × 0.152542 = 180|

! Error frecuentísimo: calcular el IGV como el 18% del precio con IGV. 1,180 × 18% = 212.40, que está mal. El 18% se aplica **sobre la base**, no sobre el total. El factor correcto para extraer el IGV de un precio final es 0.152542 (es decir, 18/118).

# Requisitos para usar el crédito fiscal
El artículo 18 de la Ley del IGV exige requisitos **sustanciales** y el artículo 19, **formales**. Si falla uno, no hay crédito:

**Sustanciales:**
- Que la adquisición sea permitida como gasto o costo para el Impuesto a la Renta.
- Que se destine a operaciones **gravadas** con el IGV.

**Formales:**
- Comprobante que discrimine el IGV y cumpla el reglamento.
- Emisor con RUC activo y habido.
- Anotación en el **Registro de Compras** dentro del plazo (hasta los 12 meses siguientes, según el artículo 2 de la Ley 29215).
- Si está sujeta a detracción, haber efectuado el depósito.
- Si el importe lo exige, haber usado medio de pago (bancarización).

> **Una empresa con operaciones gravadas y no gravadas** no puede usar todo su crédito fiscal: debe aplicar la **prorrata**. El crédito de compras destinadas exclusivamente a operaciones gravadas se usa al 100%; el de compras comunes se usa en la proporción que representan las ventas gravadas sobre las ventas totales de los últimos 12 meses.

$ Coeficiente de prorrata = Ventas gravadas + exportaciones (12 meses) ÷ Ventas totales (12 meses)

# Operaciones exoneradas, inafectas y exportaciones
|Categoría|Qué significa|Efecto en el crédito fiscal|
|Gravada|Dentro del ámbito y con tasa 18%|Da derecho a crédito|
|Exonerada|Dentro del ámbito pero liberada (Apéndice I y II: muchos alimentos sin procesar, servicios de salud)|No da derecho; el IGV de compras se va al costo|
|Inafecta|Fuera del ámbito (por ejemplo, transferencia de bienes por reorganización)|No da derecho|
|Exportación|Gravada con tasa 0% en destino|Da derecho, y además permite **saldo a favor del exportador** con devolución|

# La liquidación mensual, paso a paso
Una empresa comercial, periodo mayo 2026:

|Concepto|Base|IGV|
|Ventas gravadas (facturas y boletas)|260,000|46,800|
|Compras de mercadería|150,000|27,000|
|Servicios (luz, agua, alquiler, fletes)|32,000|5,760|
|Compra de una camioneta|85,000|15,300|
|Crédito fiscal arrastrado de abril|—|3,400|

$ Débito fiscal:                            46,800
$ Crédito fiscal del mes: 27,000 + 5,760 + 15,300 = 48,060
$ Crédito arrastrado:                        3,400
$ Crédito total:                            51,460
$ Resultado: 46,800 − 51,460 = (4,660) → crédito a arrastrar a junio

En este mes no se paga IGV y se arrastran S/ 4,660 por la compra del activo fijo. El asiento de la liquidación, cuando toca pagar, es simple:

@ Pago del IGV de un mes con resultado deudor por S/ 8,200
@ 40|40111 IGV - Cuenta propia|8,200.00|
@ 10|1041 Cuentas corrientes operativas||8,200.00

# Declaración y plazos
El IGV se declara mensualmente en el **PDT/Formulario Virtual 621** (declaración de IGV-Renta mensual), según el cronograma de vencimientos que SUNAT publica cada año en función del último dígito del RUC. Declarar fuera de plazo genera multa (numeral 1 del artículo 176 del Código Tributario) y los pagos fuera de plazo generan intereses moratorios diarios.`,
  claves:['IGV 18% (16% + 2% IPM); la empresa lo recauda, nunca es gasto ni ingreso.','Para extraer el IGV de un precio final se usa el factor 18/118 = 0.152542, no el 18% del total.','El crédito fiscal exige requisitos sustanciales (gasto deducible, destino gravado) y formales (comprobante, registro, detracción, bancarización).','Con operaciones gravadas y no gravadas se aplica prorrata del crédito fiscal.','El crédito fiscal no utilizado se arrastra sin límite de tiempo; el saldo a favor del exportador puede devolverse.'],
  ej:[
   {l:1,t:'num',p:'Una factura muestra un total de S/ 4,720 incluido IGV. ¿Cuánto es el IGV?',
    u:'S/',r:720,tol:1,
    s:'Base = 4,720 ÷ 1.18 = S/ 4,000.00\nIGV = 4,000 × 18% = **S/ 720.00**\n\nAtajo: IGV = 4,720 × 18/118 = 4,720 × 0.152542 = S/ 720.\n\nEl error típico sería 4,720 × 18% = S/ 849.60, que sobrestima el impuesto en S/ 129.60 y descuadra el asiento.'},
   {l:1,t:'mc',p:'Una clínica presta servicios de salud exonerados del IGV y compra insumos médicos con IGV. ¿Qué hace con ese IGV?',
    o:['Lo usa como crédito fiscal normalmente','Lo pierde como crédito y lo incorpora al costo o gasto','Pide su devolución a SUNAT','Lo registra como ingreso'],r:1,
    s:'No puede usarlo como crédito fiscal, porque las adquisiciones no se destinan a operaciones gravadas. El IGV pasa a formar parte del costo del insumo o del gasto, aumentando el valor del activo o del resultado. Ese es el efecto económico de una exoneración: el contribuyente no cobra IGV, pero tampoco recupera el que paga, por lo que el impuesto se le queda como costo. Si además tuviera operaciones gravadas (por ejemplo venta de medicamentos en una farmacia propia), tendría que aplicar la prorrata.'},
   {l:2,t:'num',p:'Mes de junio: ventas gravadas S/ 180,000 (base); compras gravadas S/ 95,000 (base); servicios S/ 22,000 (base); crédito arrastrado S/ 2,100. ¿Cuánto IGV paga?',
    u:'S/',r:9240,tol:1,
    s:'Débito fiscal = 180,000 × 18% = S/ 32,400\nCrédito fiscal del mes = (95,000 + 22,000) × 18% = 117,000 × 18% = S/ 21,060\nCrédito arrastrado = S/ 2,100\nCrédito total = 21,060 + 2,100 = S/ 23,160\n\n**IGV por pagar = 32,400 − 23,160 = S/ 9,240**\n\nSi tu resultado fue S/ 11,340, olvidaste aplicar el crédito arrastrado del mes anterior, que está en el saldo deudor de la cuenta 40111 y es tan aplicable como el crédito del mes. Si las retenciones o percepciones sufridas también existieran, se restarían después de este resultado.'},
   {l:2,t:'ab',p:'Una empresa vende alimentos sin procesar (exonerados) y también alimentos procesados (gravados). En el año móvil: ventas gravadas S/ 600,000; ventas exoneradas S/ 400,000. En el mes tiene crédito fiscal de compras comunes (alquiler, luz, administración) por S/ 9,000 y de compras destinadas solo a lo gravado por S/ 25,000. ¿Cuánto crédito fiscal puede usar?',
    s:'**Paso 1 — Crédito de uso exclusivo.** Las compras destinadas únicamente a operaciones gravadas dan derecho al 100%: **S/ 25,000**.\n\n**Paso 2 — Coeficiente de prorrata** para las compras comunes:\nCoeficiente = Ventas gravadas ÷ Ventas totales = 600,000 ÷ 1,000,000 = **0.60 (60%)**\n(La norma manda calcularlo con los últimos 12 meses, incluido el mes que se liquida, y expresarlo redondeado a dos decimales.)\n\n**Paso 3 — Crédito de compras comunes:**\n9,000 × 60% = **S/ 5,400**\nLos S/ 3,600 restantes no son crédito: se van al costo o gasto.\n\n**Crédito fiscal total utilizable = 25,000 + 5,400 = S/ 30,400**\n\n**Requisito operativo imprescindible:** para aplicar este método, el Registro de Compras debe estar **anotado en tres columnas separadas**: adquisiciones destinadas exclusivamente a operaciones gravadas, destinadas exclusivamente a no gravadas, y de uso común. Si la empresa no discrimina así, SUNAT puede exigir aplicar la prorrata sobre **todo** el crédito, incluido el de uso exclusivo. En este caso el daño sería: 34,000 × 60% = S/ 20,400, es decir S/ 10,000 menos de crédito. La forma de llevar el registro vale aquí S/ 10,000 reales.'},
   {l:3,t:'ab',p:'En una fiscalización de 2026, SUNAT observa a una empresa: (a) una factura de S/ 35,400 registrada en el Registro de Compras 14 meses después de su emisión; (b) un servicio de S/ 5,900 sujeto a detracción cuyo depósito se hizo dos meses después; (c) una factura de S/ 11,800 de un proveedor con condición de "no habido". Determina el efecto en el crédito fiscal de cada caso.',
    s:'**(a) Factura anotada 14 meses después — crédito perdido.** La Ley 29215 permite anotar el comprobante en el Registro de Compras hasta el periodo que corresponda a los **12 meses** siguientes a la emisión. Pasado ese plazo, el derecho al crédito fiscal se pierde de forma definitiva. Efecto: IGV de 35,400 ÷ 1.18 × 18% = **S/ 5,400 perdidos**. El gasto o costo sigue siendo deducible para Renta si cumple causalidad y fehaciencia; lo que se pierde es solo el crédito del IGV, que pasa a engrosar el costo.\n\n**(b) Detracción depositada con dos meses de atraso — crédito diferido, no perdido.** El crédito fiscal se puede ejercer a partir del periodo en que se acredita el depósito. Si la factura es de marzo y el depósito se hizo en mayo, el crédito de S/ 900 (5,900 × 18/118) corresponde a mayo, no a marzo. Si la empresa ya lo usó en marzo, SUNAT determina un **IGV omitido de marzo** de S/ 900, con intereses moratorios y multa por declarar cifras falsas (50% del tributo omitido, con gradualidad si se subsana), y reconoce el crédito en mayo. El perjuicio real es la multa y los intereses, no el impuesto, que se recupera.\n\n**(c) Proveedor "no habido" — depende de la fecha.** La condición de no habido afecta el crédito fiscal cuando el proveedor tenía esa condición **a la fecha de emisión** del comprobante. Si al emitirse la factura el proveedor estaba habido y cayó en no habido después, el crédito se mantiene. Si ya estaba no habido al emitirla, el crédito de S/ 1,800 se desconoce, y adicionalmente el gasto puede ser cuestionado por falta de fehaciencia, porque un proveedor no habido es por definición alguien a quien SUNAT no pudo ubicar.\n\n**Resumen del reparo:**\n\n| Caso | IGV observado | Resultado |\n|---|---|---|\n| (a) Registro tardío | 5,400 | Pérdida definitiva |\n| (b) Detracción tardía | 900 | Diferido + multa e intereses |\n| (c) Proveedor no habido | 1,800 | Pérdida si ya era no habido al emitir |\n| **Total en riesgo** | **8,100** | más multas e intereses |\n\n**Prevención, que es lo que importa:** validar el RUC del proveedor en el portal de SUNAT **antes** de registrar la factura (toma 20 segundos y evita el caso c), llevar un control de detracciones con alerta de vencimiento (evita el b), y conciliar mensualmente el Registro de Compras con el SIRE para detectar comprobantes no registrados antes de que se venza el plazo de 12 meses (evita el a).'}
  ]
 },
 {
  id:'m3t2', titulo:'Detracciones, retenciones y percepciones', min:15,
  cont:`Son los tres **sistemas administrativos del IGV**: mecanismos para asegurar la recaudación adelantando el ingreso al fisco. No son tributos nuevos; son formas de cobrar el mismo IGV antes, a través de un tercero. Entenderlos bien es lo que separa una contabilidad limpia de un dolor de cabeza mensual.

|Sistema|Quién lo aplica|Sobre qué|A dónde va el dinero|
|Detracción (SPOT)|El **cliente** descuenta del pago|Bienes y servicios listados en anexos|Cuenta del proveedor en el Banco de la Nación|
|Retención|El **cliente** designado agente de retención|Operaciones gravadas con IGV|A SUNAT, el proveedor recibe una constancia|
|Percepción|El **proveedor** designado agente de percepción|Venta de ciertos bienes e importaciones|A SUNAT, el cliente recibe una constancia|

# Detracción (SPOT)
El usuario del servicio o comprador deposita un porcentaje del importe total en la cuenta de detracciones del proveedor en el Banco de la Nación. El proveedor solo puede usar ese dinero para pagar sus propios tributos, o solicitar su libre disposición si acumula saldos y cumple requisitos.

|Operación|Tasa referencial|
|Servicios empresariales, asesoría, arrendamiento de bienes muebles|12%|
|Contratos de construcción|4%|
|Transporte de carga por vía terrestre|4%|
|Intermediación laboral y tercerización|12%|
|Mantenimiento y reparación de bienes muebles|12%|
|Azúcar, alcohol etílico, residuos, arena y piedra|10% / 15% según bien|
|Oro, minerales metálicos y no metálicos|10% / 15%|

> Las tasas y los bienes y servicios sujetos cambian por resolución de SUNAT, así que la tabla vigente se consulta siempre antes de operar. Lo que no cambia es la lógica: **monto mínimo S/ 700** para los servicios y bienes del Anexo 3, y la obligación de depositar antes de pagar al proveedor o dentro del plazo según el caso.

@ Servicio de asesoría recibido por S/ 5,900 con detracción del 12%
@ 63|6322 Asesoría|5,000.00|
@ 40|40111 IGV - Cuenta propia|900.00|
@ 42|4212 Emitidas - Facturas por pagar||5,900.00

@ Pago: detracción al Banco de la Nación S/ 708 y saldo al proveedor S/ 5,192
@ 42|4212 Emitidas - Facturas por pagar|5,900.00|
@ 10|1041 Cuentas corrientes operativas||5,192.00
@ 10|1042 Cuentas corrientes - Cuenta de detracción||708.00

Desde el lado del **proveedor**, el depósito recibido se registra en su cuenta 1042, que es efectivo restringido: aparece en el activo corriente pero no puede usarse libremente.

# Retención del IGV
Aplican los contribuyentes designados por SUNAT como **agentes de retención**. Retienen el **3%** del importe total de la operación al pagar a sus proveedores, y entregan una constancia. El proveedor aplica esa retención contra su IGV mensual.

@ Venta por S/ 23,600 a un agente de retención; cobro con retención del 3% (S/ 708)
@ 10|1041 Cuentas corrientes operativas|22,892.00|
@ 40|40113 IGV - Régimen de retenciones|708.00|
@ 12|1212 Facturas por cobrar||23,600.00

# Percepción del IGV
El proveedor designado **agente de percepción** cobra un adicional al cliente (por ejemplo 2% en la venta interna de ciertos bienes, 2% en combustibles, y tasas específicas en importaciones) y lo entrega a SUNAT. Para el cliente es un crédito contra su IGV, registrado en la cuenta 40114.

# Cómo se usan contra el IGV del mes
$ IGV a pagar = Débito fiscal − Crédito fiscal − Retenciones − Percepciones − Saldo de detracciones aplicado

Si las retenciones y percepciones superan el IGV del mes, el saldo se arrastra. Si se acumulan por tres periodos consecutivos, puede solicitarse su **devolución**.

! **El riesgo real de las detracciones** es doble. Para el **cliente**: si no deposita, no puede usar el crédito fiscal de esa factura hasta que lo haga. Para el **proveedor**: el dinero queda inmovilizado en el Banco de la Nación y solo sirve para pagar tributos; una empresa con mucho servicio detraído y pocos tributos por pagar acumula saldos que afectan su liquidez, y debe gestionar la libre disposición periódicamente. En empresas de servicios, esa gestión es parte del trabajo mensual del contador, no un trámite ocasional.`,
  claves:['Detracción: el cliente deposita un % en la cuenta del proveedor en el Banco de la Nación; condición para usar el crédito fiscal.','Retención: el agente de retención descuenta 3% del total y lo entrega a SUNAT; el proveedor lo aplica contra su IGV.','Percepción: el proveedor cobra un adicional al cliente, que lo usa como crédito contra su IGV.','La cuenta 1042 (detracciones) es efectivo restringido: está en el activo pero no es de libre disposición.','Retenciones y percepciones no aplicadas se arrastran y, tras tres periodos consecutivos, pueden devolverse.'],
  ej:[
   {l:1,t:'num',p:'Un servicio de consultoría por S/ 11,800 (incluido IGV) está sujeto a detracción del 12%. ¿Cuánto se deposita en el Banco de la Nación?',
    u:'S/',r:1416,tol:1,
    s:'La detracción se calcula sobre el **importe total de la operación**, incluido el IGV:\nDetracción = 11,800 × 12% = **S/ 1,416**\n\nAl proveedor se le paga 11,800 − 1,416 = S/ 10,384. El error común es aplicar el porcentaje sobre la base imponible (10,000 × 12% = 1,200), lo que deja el depósito incompleto y mantiene suspendido el derecho al crédito fiscal.'},
   {l:1,t:'mc',p:'¿Quién tiene la obligación de efectuar el depósito de la detracción?',
    o:['El proveedor del servicio','El usuario del servicio o adquirente del bien','SUNAT','El banco'],r:1,
    s:'El usuario o adquirente, es decir el cliente. Es él quien descuenta el importe del pago y lo deposita en la cuenta del proveedor en el Banco de la Nación. Solo en casos excepcionales (por ejemplo, cuando el proveedor recibe el pago total) la obligación recae en el proveedor. La consecuencia de no depositar la sufre el cliente: no puede usar el crédito fiscal de esa factura hasta acreditar el depósito.'},
   {l:2,t:'num',p:'En el mes: débito fiscal S/ 28,000; crédito fiscal S/ 19,500; retenciones del mes S/ 2,400; percepciones acumuladas S/ 1,300. ¿Cuánto paga de IGV?',
    u:'S/',r:4800,tol:1,
    s:'Débito fiscal: 28,000\n(−) Crédito fiscal: (19,500) → IGV determinado 8,500\n(−) Retenciones: (2,400)\n(−) Percepciones: (1,300)\n**IGV por pagar = S/ 4,800**\n\nSi las retenciones y percepciones hubieran sumado más de S/ 8,500, no habría pago y el exceso se arrastraría al mes siguiente en la cuenta 40113 o 40114, con la opción de pedir devolución tras tres periodos consecutivos de saldo no aplicado.'},
   {l:2,t:'ab',p:'Una empresa de servicios de ingeniería factura S/ 118,000 al mes (con IGV), todo sujeto a detracción del 12%. Sus tributos mensuales a pagar son: IGV S/ 4,000, pago a cuenta de renta S/ 1,000, EsSalud y ONP S/ 3,500. Analiza su situación de caja de detracciones.',
    s:'**Detracciones que recibe cada mes:** 118,000 × 12% = **S/ 14,160** inmovilizados en el Banco de la Nación.\n\n**Tributos que puede pagar con esa cuenta:** 4,000 + 1,000 + 3,500 = **S/ 8,500**.\n\n**Acumulación mensual = 14,160 − 8,500 = S/ 5,660** de saldo que crece mes a mes. En un año: alrededor de **S/ 67,920** de dinero propio que no puede usar para comprar insumos, pagar sueldos ni cubrir alquileres.\n\n**Efecto en la liquidez:** la empresa cobra efectivamente S/ 103,840 de los S/ 118,000 que factura (88%), y el 12% restante solo le sirve para tributos que no alcanzan a consumirlo. Para una empresa de servicios —donde el costo principal es la planilla, que no genera crédito fiscal— este desfase es estructural, no circunstancial.\n\n**Qué hacer, en orden:**\n\n1. **Solicitar la libre disposición de los fondos.** El procedimiento general permite pedirla hasta tres veces al año (enero, mayo y setiembre, en los plazos que fija la resolución correspondiente), por los montos que no se hayan agotado en el pago de tributos durante los cuatro meses anteriores. Hay además un procedimiento especial para determinados contribuyentes con mayor frecuencia. Perder esa ventana obliga a esperar al siguiente periodo: hay que tenerla en el calendario del contador.\n2. **Usar la cuenta de detracciones para todo tributo posible**, incluidos los pagos de regularización anual de Renta, el ITAN y las multas, en lugar de pagarlos desde la cuenta operativa.\n3. **Proyectar el flujo considerando el 12%** como no disponible. Un presupuesto de caja que cuente el 100% de la facturación como cobrable es un presupuesto equivocado desde el primer día.\n4. **Revisar si todos los servicios están correctamente sujetos** a la tasa aplicada. Una clasificación errónea del servicio puede estar generando detracciones mayores a las que corresponden, y eso se puede corregir hacia adelante.'},
   {l:3,t:'ab',p:'Una empresa recibe una factura de transporte de carga por S/ 8,260 (incluido IGV) con detracción del 4%. El 15 de marzo paga al proveedor el total de S/ 8,260 sin hacer la detracción, y recién el 20 de abril deposita los S/ 330.40. Usó el crédito fiscal en marzo. Determina todas las consecuencias.',
    s:'**Hechos:** base S/ 7,000, IGV S/ 1,260, total S/ 8,260. Detracción que correspondía: 8,260 × 4% = **S/ 330.40**, depositada con un mes de atraso y después de haber pagado el íntegro al proveedor.\n\n**Consecuencia 1 — Crédito fiscal mal utilizado.** El crédito de S/ 1,260 podía ejercerse recién en el periodo en que se acreditó el depósito, es decir en **abril**. Al usarlo en marzo, la empresa declaró un crédito que no le correspondía en ese periodo. SUNAT determinaría:\n- IGV omitido de marzo: **S/ 1,260**, más intereses moratorios desde el vencimiento de marzo hasta el pago.\n- Multa por declarar cifras o datos falsos (num. 1 art. 178 del Código Tributario): 50% del tributo omitido = **S/ 630**, susceptible de rebaja por gradualidad si se subsana voluntariamente antes de cualquier notificación (la rebaja puede ser muy significativa, de ahí la importancia de detectarlo uno mismo).\n- El crédito de S/ 1,260 se reconoce en abril, por lo que el impuesto no se pierde: se recupera un mes después.\n\n**Consecuencia 2 — Multa por no efectuar el depósito.** El incumplimiento del depósito de la detracción está sancionado con una multa equivalente al **50% del importe no depositado**: 330.40 × 50% = **S/ 165.20**, también con régimen de gradualidad que puede reducirla sustancialmente si se subsana antes de notificación.\n\n**Consecuencia 3 — Problema práctico con el proveedor.** Al haberle pagado el íntegro, la empresa tuvo que depositar los S/ 330.40 de su propio bolsillo (el dinero ya salió completo) o pedirle al proveedor que lo devuelva. Lo primero es un sobrecosto de caja; lo segundo, una negociación incómoda. Esta es la razón por la que el control de detracciones debe estar **antes** del pago, en el proceso de tesorería, y no después, en el cierre contable.\n\n**Resumen económico aproximado:**\n\n| Concepto | Importe |\n|---|---|\n| IGV de marzo a regularizar (se recupera en abril) | 1,260.00 |\n| Multa por cifras falsas (antes de gradualidad) | 630.00 |\n| Multa por no depositar (antes de gradualidad) | 165.20 |\n| Intereses moratorios | variable |\n| Sobrecosto de caja por doble salida | 330.40 |\n\n**El control que lo evita:** una validación en el flujo de pagos que marque toda factura sujeta a detracción y bloquee la orden de pago hasta que la constancia de depósito esté adjunta. En empresas con muchos proveedores de servicios, ese control simple ahorra más dinero que cualquier optimización tributaria.'}
  ]
 },
 {
  id:'m3t3', titulo:'Los cuatro regímenes tributarios y cómo elegir', min:18,
  cont:`La elección de régimen define cuántos tributos paga la empresa, qué libros lleva y qué comprobantes puede emitir. Es la primera decisión tributaria de cualquier negocio, y la que más veces se toma mal.

# Cuadro comparativo (valores 2026, UIT = S/ 5,500)
|Aspecto|NRUS|RER|RMT|Régimen General|
|Límite de ingresos|S/ 96,000 al año (S/ 8,000 al mes)|S/ 525,000 al año|1,700 UIT = S/ 9,350,000|Sin límite|
|Quién puede acogerse|Personas naturales y EIRL con negocio|Personas naturales y jurídicas, con exclusiones|Personas naturales y jurídicas|Todos|
|Impuesto a la Renta|Cuota fija mensual que incluye IGV|1.5% de ingresos netos mensuales, definitivo|10% hasta 15 UIT de renta neta y 29.5% por el exceso|29.5% de la renta neta|
|Pago a cuenta mensual|No aplica|1.5% definitivo|1% si los ingresos del año no superan 300 UIT; si superan, coeficiente con mínimo 1.5%|Coeficiente o 1.5%, el mayor|
|Declaración anual|No|No|Sí|Sí|
|IGV|Incluido en la cuota|18% aparte|18% aparte|18% aparte|
|Comprobantes|Solo boletas y tickets|Facturas, boletas y demás|Todos|Todos|
|Libros contables|Ninguno|Registro de Compras y de Ventas|Según ingresos (ver abajo)|Contabilidad completa|
|Trabajadores|Sin límite normativo específico|Hasta 10 por turno|Sin límite|Sin límite|

# Categorías del NRUS
|Categoría|Ingresos o compras mensuales|Cuota|
|1|Hasta S/ 5,000|S/ 20|
|2|Más de S/ 5,000 hasta S/ 8,000|S/ 50|
|Especial|Hasta S/ 60,000 al año, para venta de frutas, hortalizas y productos agrícolas en mercados de abastos o cultivo agrícola|S/ 0|

Otros límites del NRUS: un solo establecimiento, activos fijos hasta S/ 70,000 (sin contar predios y vehículos) y no realizar importaciones (salvo la excepción de zona de frontera).

# Libros según ingresos en el RMT
|Ingresos netos anuales|Libros obligatorios|
|Hasta 300 UIT (S/ 1,650,000)|Registro de Ventas, Registro de Compras y Libro Diario de Formato Simplificado|
|Más de 300 hasta 500 UIT|Los anteriores más Libro Mayor y Libro de Inventarios y Balances|
|Más de 500 hasta 1,700 UIT|Contabilidad completa|

# Actividades excluidas del RER
El RER no admite, entre otras: actividades de construcción, transporte de carga de más de 2 TM, organización de espectáculos públicos, casinos y tragamonedas, agencias de viaje, publicidad, comisión o consignación, actividades de médicos y odontólogos, veterinarias, jurídicas, contabilidad y auditoría, arquitectura e ingeniería, informática, asesoramiento empresarial. Es una lista larga: la consulta es obligatoria antes de acogerse.

# Cómo se decide, con números
Caso: una empresa de servicios de mantenimiento proyecta ingresos de S/ 480,000 al año con gastos deducibles de S/ 390,000.

|Concepto|RER|RMT|
|Ingresos|480,000|480,000|
|Gastos deducibles|no relevantes|(390,000)|
|Renta neta|—|90,000|
|Impuesto anual|480,000 × 1.5% = **7,200**|90,000 × 10% = **9,000**|

Aquí el RER sale más barato. Pero cambiemos el margen: si los gastos fueran S/ 440,000, la renta neta sería S/ 40,000 y el impuesto en RMT sería S/ 4,000, menos que los S/ 7,200 del RER.

$ Punto de indiferencia (cuando la renta neta no supera 15 UIT):
$ 1.5% × Ingresos = 10% × Renta neta  →  Renta neta = 15% de los ingresos

**Regla práctica:** si tu margen neto es **mayor al 15%** de los ingresos, el RER tiende a convenir (pagas sobre ingresos, no sobre utilidad). Si tu margen es **menor al 15%**, el RMT tiende a convenir. Y si tienes pérdidas, el RER te hace pagar de todas formas, mientras el RMT no: una empresa que pierde dinero en el RER paga impuesto sobre sus ingresos.

! El cálculo del impuesto no es el único criterio. El RER **no permite arrastrar pérdidas**, no exige declaración anual (menos costo administrativo) y sus pagos son definitivos. El RMT permite arrastrar pérdidas hasta por 4 años (sistema A) o sin plazo con límite del 50% de la renta neta (sistema B), lo que para un negocio en etapa de inversión puede valer mucho más que la diferencia de unos miles de soles en el primer año.

# Cambio de régimen
- Del NRUS, RER o RMT al **General**: en cualquier mes del año.
- Del General al RMT, RER o NRUS: solo con la declaración de **enero** de cada año.
- Si se superan los límites durante el año, el cambio es **obligatorio** desde el mes en que ocurre, y en el RMT se recalculan los pagos a cuenta.`,
  claves:['Cuatro regímenes: NRUS (cuota fija), RER (1.5% de ingresos definitivo), RMT (10% hasta 15 UIT y 29.5% el exceso) y General (29.5%).','En 2026 el límite del RMT es 1,700 UIT = S/ 9,350,000 y el del RER S/ 525,000.','Regla práctica: margen neto mayor al 15% favorece al RER; menor al 15%, al RMT.','El RER no permite arrastrar pérdidas y obliga a pagar aunque haya pérdida; el RMT sí permite arrastrarlas.','Hacia el Régimen General se puede cambiar en cualquier mes; para bajar de régimen, solo con la declaración de enero.'],
  ej:[
   {l:1,t:'mc',p:'Una bodega con ventas de S/ 7,000 mensuales y compras de S/ 5,500 está en el NRUS. ¿Qué cuota le corresponde?',
    o:['S/ 20, categoría 1','S/ 50, categoría 2','S/ 0, categoría especial','No puede estar en NRUS'],r:1,
    s:'Categoría 2, cuota de S/ 50. La categoría se determina por el **mayor** entre ingresos y compras del mes: aquí el mayor es S/ 7,000 de ventas, que está en el tramo de más de S/ 5,000 hasta S/ 8,000. Está dentro de los límites del NRUS (no supera S/ 8,000 mensuales ni S/ 96,000 anuales). Si en algún mes superara S/ 8,000, debería cambiar de régimen desde ese mes.'},
   {l:1,t:'mc',p:'Una empresa de servicios de contabilidad quiere acogerse al RER. ¿Puede?',
    o:['Sí, cualquier empresa de servicios puede','No: las actividades de contabilidad y auditoría están excluidas del RER','Solo si factura menos de S/ 100,000','Solo si es persona natural'],r:1,
    s:'No puede. Las actividades de contabilidad, teneduría de libros y auditoría están expresamente excluidas del RER, junto con asesoramiento empresarial, actividades jurídicas, arquitectura e ingeniería, informática, médicas y odontológicas, entre otras. Debe acogerse al RMT o al Régimen General. Es un error frecuente en estudios contables pequeños que se acogen al RER por el bajo costo administrativo y luego son reclasificados de oficio, con la deuda recalculada.'},
   {l:2,t:'num',p:'Una comercializadora en RMT tiene renta neta anual de S/ 150,000 en 2026 (UIT S/ 5,500). ¿Cuánto es su Impuesto a la Renta anual?',
    u:'S/',r:28162.50,tol:5,
    s:'La escala del RMT: 10% hasta 15 UIT de renta neta y 29.5% por el exceso.\n15 UIT = 15 × 5,500 = **S/ 82,500**\n\nPrimer tramo: 82,500 × 10% = S/ 8,250.00\nExceso: 150,000 − 82,500 = 67,500 × 29.5% = S/ 19,912.50\n**Impuesto total = S/ 28,162.50**\n\nLa tasa efectiva es 28,162.50 ÷ 150,000 = 18.8%, muy por debajo del 29.5% del Régimen General: ahí está el beneficio del RMT para una empresa mediana.\n\nContra ese impuesto anual se aplican los pagos a cuenta hechos mes a mes; la diferencia se paga o se arrastra como saldo a favor.'},
   {l:2,t:'ab',p:'Un emprendedor proyecta para su primer año: ingresos S/ 300,000 y gastos deducibles S/ 285,000 (está invirtiendo en equipos y publicidad). Compara RER y RMT y recomienda.',
    s:'**En el RER:** el impuesto es 1.5% de los ingresos netos mensuales, con carácter definitivo.\nImpuesto anual = 300,000 × 1.5% = **S/ 4,500**\n\n**En el RMT:** se paga sobre la renta neta.\nRenta neta = 300,000 − 285,000 = S/ 15,000\nComo S/ 15,000 está muy por debajo de 15 UIT (S/ 82,500), todo va al 10%:\nImpuesto anual = 15,000 × 10% = **S/ 1,500**\n\nPagos a cuenta en RMT: los ingresos no superan 300 UIT, así que el pago a cuenta es el 1% de los ingresos mensuales = 300,000 × 1% = S/ 3,000 al año, que supera el impuesto anual de S/ 1,500. Resultado: tendría un **saldo a favor de S/ 1,500** que puede aplicar contra pagos futuros o solicitar en devolución. Conviene además evaluar la suspensión o modificación de pagos a cuenta, que la norma permite cuando se acredita que el impuesto anual será menor.\n\n**Recomendación: RMT.** Tres razones, en orden de importancia:\n\n1. **Ahorro inmediato de S/ 3,000** (4,500 frente a 1,500), el doble del impuesto.\n2. **Margen bajo.** El margen neto es 15,000 ÷ 300,000 = 5%, muy por debajo del punto de indiferencia del 15%. Con márgenes así, pagar sobre ingresos (RER) es caro.\n3. **Arrastre de pérdidas.** Si el primer año cerrara en pérdida —probable en un negocio que está invirtiendo—, el RER lo haría pagar S/ 4,500 igual, mientras el RMT no cobraría impuesto y permitiría arrastrar la pérdida contra las utilidades de los años siguientes. En un negocio nuevo, ese derecho suele valer más que la diferencia de impuesto del primer año.\n\n**El costo del RMT:** llevar Registro de Ventas, Registro de Compras y Libro Diario Simplificado, y presentar declaración jurada anual. Es más trabajo administrativo que el RER, y hay que contarlo en la decisión, pero a este nivel de ingresos el honorario contable adicional es menor que el ahorro tributario.'},
   {l:3,t:'ab',p:'Una empresa en RER factura S/ 44,000 mensuales de forma estable. En setiembre de 2026 gana una licitación y factura S/ 180,000 ese mes, cerrando el año con S/ 620,000 de ingresos y gastos deducibles de S/ 500,000. ¿Qué debe hacer y cuánto impuesto termina pagando?',
    s:'**Paso 1 — Detectar la salida obligatoria del RER.** El límite es S/ 525,000 de ingresos netos anuales. Acumulando: enero a agosto = 8 × 44,000 = S/ 352,000; con setiembre = 352,000 + 180,000 = **S/ 532,000**, que supera el límite. La empresa queda **obligada a ingresar al Régimen General desde setiembre de 2026** (desde el periodo en que se supera el límite). También podría acogerse al RMT si cumple sus condiciones, ya que S/ 620,000 está muy por debajo de 1,700 UIT; en la práctica el RMT es la opción razonable y debe evaluarse con cuidado la forma de acogimiento según la normativa aplicable al cambio obligatorio.\n\n**Paso 2 — Tributación de enero a agosto (RER).** Los pagos del RER son **definitivos** por los periodos en que estuvo acogida:\n352,000 × 1.5% = **S/ 5,280** ya pagados y no recuperables.\n\n**Paso 3 — Tributación de setiembre a diciembre.** Desde setiembre determina renta sobre base real. Ingresos del periodo = 620,000 − 352,000 = S/ 268,000. Suponiendo que los gastos deducibles se distribuyen de forma proporcional al nivel de actividad, habría que determinar la renta neta de ese tramo con los ingresos y gastos efectivamente devengados en él, y aplicar la escala del RMT (10% hasta 15 UIT y 29.5% el exceso) o el 29.5% si entró al Régimen General.\n\nEjemplo con cifras del tramo: si en setiembre-diciembre los ingresos son S/ 268,000 y los gastos deducibles S/ 215,000, la renta neta del tramo es S/ 53,000. En RMT: 53,000 × 10% = **S/ 5,300** (no supera 15 UIT).\n\n**Paso 4 — Pagos a cuenta del tramo.** En RMT, con ingresos anuales que no superan 300 UIT (S/ 1,650,000), el pago a cuenta es el 1% de los ingresos mensuales: 268,000 × 1% = S/ 2,680, que se aplica contra el impuesto del tramo.\n\n**Carga total aproximada del año:** 5,280 (RER definitivo) + 5,300 (tramo RMT) = **S/ 10,580**.\n\n**Lo que este caso enseña, que es lo importante:**\n\n1. **Hay que monitorear el acumulado mes a mes**, no al cierre del año. Si la empresa se enterara en marzo del año siguiente, habría declarado ocho meses mal, con multas por cada declaración y por los libros no llevados.\n2. **La facturación de un contrato grande puede cambiar el régimen.** Antes de firmar la licitación, el contador debió proyectar el acumulado y planificar el cambio, incluso evaluando si convenía facturar por avance en dos periodos cuando el contrato lo permita (lo que debe responder a la realidad de la ejecución, no a una conveniencia tributaria).\n3. **Hay que implementar la contabilidad del nuevo régimen de inmediato:** libros adicionales, determinación de renta sobre base real, declaración anual, cuadro de activos fijos con depreciación, provisiones de beneficios sociales. Pasar de RER a RMT o General no es solo cambiar una casilla: es cambiar la forma de llevar la contabilidad.\n4. **Los pagos del RER no se recuperan**: no son pagos a cuenta, son definitivos por esos periodos.'}
  ]
 },
 {
  id:'m3t4', titulo:'Impuesto a la Renta de tercera categoría y pagos a cuenta', min:16,
  cont:`La renta de tercera categoría es la de las empresas. Se determina sobre la **renta neta** anual, y durante el año se adelanta mediante pagos a cuenta mensuales.

$ Renta bruta − Costo computable = Renta bruta neta
$ Renta bruta neta − Gastos deducibles = Renta neta
$ Renta neta ± Adiciones y deducciones tributarias = Renta neta imponible
$ Renta neta imponible × Tasa = Impuesto anual
$ Impuesto anual − Pagos a cuenta − Créditos = Saldo por pagar o a favor

# Tasas vigentes
|Régimen|Tasa|
|Régimen General|29.5% sobre la renta neta imponible|
|RMT|10% hasta 15 UIT (S/ 82,500 en 2026) y 29.5% por el exceso|
|RER|1.5% sobre ingresos netos mensuales, definitivo|
|Dividendos a personas naturales domiciliadas|5% de retención adicional|

# Pagos a cuenta: los dos métodos del Régimen General
Se paga mensualmente **el mayor** entre:

$ a) Coeficiente = Impuesto calculado del ejercicio anterior ÷ Ingresos netos del ejercicio anterior
$ b) 1.5% de los ingresos netos del mes

Para los meses de **enero y febrero** se usa el coeficiente del ejercicio **precedente al anterior** (porque el del año anterior todavía no está determinado). Si no hay impuesto en el ejercicio de referencia, se aplica el 1.5%.

Ejemplo: en 2025 una empresa tuvo impuesto calculado de S/ 84,000 e ingresos netos de S/ 2,400,000.
$ Coeficiente = 84,000 ÷ 2,400,000 = 0.0350
$ Si en marzo 2026 sus ingresos son S/ 210,000:
$ Por coeficiente: 210,000 × 0.0350 = 7,350
$ Por el 1.5%:     210,000 × 0.015  = 3,150
$ Paga el mayor:   S/ 7,350

En el **RMT**, el pago a cuenta es el **1%** de los ingresos netos mensuales mientras los ingresos del ejercicio no superen 300 UIT; si los superan, se aplica la regla del coeficiente con mínimo de 1.5%.

> **Suspensión y modificación de pagos a cuenta.** La norma permite suspenderlos o modificarlos a partir de determinados meses, presentando un estado de resultados a una fecha de corte y cumpliendo los requisitos del artículo 85 de la LIR. Es un recurso valioso para empresas cuya utilidad cayó frente al año anterior: evita adelantar un impuesto que no se deberá y que luego habría que pedir en devolución.

# Gastos deducibles: el principio de causalidad
El artículo 37 de la LIR permite deducir los gastos **necesarios para producir la renta y mantener su fuente**, siempre que no estén prohibidos. Sobre la causalidad se aplican además criterios de **razonabilidad**, **proporcionalidad**, **generalidad** (en gastos de personal) y **fehaciencia**.

Gastos con límite, que son los que más se reparan:
|Gasto|Límite|
|Gastos de representación|0.5% de los ingresos brutos, con tope de 40 UIT|
|Gastos recreativos del personal|0.5% de los ingresos netos, con tope de 40 UIT|
|Donaciones a entidades calificadas|10% de la renta neta imponible|
|Intereses|Límite basado en el EBITDA tributario (regla de subcapitalización)|
|Vehículos de categorías A2, A3, A4 y asimilados asignados a dirección y administración|Según número de vehículos e ingresos netos|
|Remuneración de accionistas y familiares|Valor de mercado; el exceso es dividendo|
|Viáticos al interior del país|Hasta el doble del límite para funcionarios públicos|

# Gastos prohibidos (artículo 44)
- Gastos personales y de sustento del contribuyente y sus familiares.
- El propio Impuesto a la Renta.
- Multas, recargos e intereses moratorios del sector público.
- Donaciones no calificadas y cualquier acto de liberalidad.
- Gastos sin comprobante de pago válido, o de proveedores no habidos a la fecha de emisión.
- El IGV que constituye crédito fiscal.
- Gastos en paraísos fiscales o jurisdicciones no cooperantes (con excepciones).

# Otros tributos que debes tener en el radar
|Tributo|Base|Tasa|
|ITAN|Activos netos al 31/12 del año anterior que excedan S/ 1,000,000|0.4% sobre el exceso|
|ITF|Operaciones en el sistema financiero|0.005%|
|EsSalud|Remuneración|9% a cargo del empleador|
|Renta de segunda por dividendos|Dividendo distribuido|5% de retención|

! El **ITAN** es un impuesto al patrimonio que funciona como pago a cuenta: lo pagado puede aplicarse contra el Impuesto a la Renta del ejercicio y, si no se agota, solicitarse en devolución. Una empresa con mucho activo y poca utilidad lo siente, y muchas veces se olvida de pedir su devolución, regalando dinero al fisco por desconocimiento.`,
  claves:['Régimen General: 29.5% de la renta neta imponible; RMT: 10% hasta 15 UIT y 29.5% el exceso.','Pago a cuenta del General: el mayor entre coeficiente y 1.5% de ingresos; enero y febrero usan el coeficiente del ejercicio precedente al anterior.','En RMT el pago a cuenta es 1% de ingresos mientras no se superen 300 UIT.','Causalidad más razonabilidad, proporcionalidad, generalidad y fehaciencia: cinco filtros, no uno.','El ITAN (0.4% sobre activos netos que exceden S/ 1,000,000) es aplicable contra la renta y, si no se agota, devolvible.'],
  ej:[
   {l:1,t:'num',p:'Una empresa en el Régimen General tiene renta neta imponible de S/ 420,000. ¿Cuánto es su Impuesto a la Renta anual?',
    u:'S/',r:123900,tol:1,
    s:'Impuesto = 420,000 × 29.5% = **S/ 123,900**.\n\nContra ese importe se aplican los pagos a cuenta del ejercicio, el ITAN pagado, las retenciones sufridas y otros créditos. Si los créditos superan el impuesto, queda saldo a favor, que puede aplicarse contra los pagos a cuenta del ejercicio siguiente o solicitarse en devolución.'},
   {l:1,t:'mc',p:'Una multa de SUNAT por presentar una declaración fuera de plazo, ¿es deducible para el Impuesto a la Renta?',
    o:['Sí, es un gasto necesario del negocio','No: el artículo 44 prohíbe deducir multas y sanciones del sector público','Sí, hasta el 0.5% de los ingresos','Solo si se paga en el mismo ejercicio'],r:1,
    s:'No es deducible. El artículo 44 de la LIR prohíbe expresamente deducir las multas, recargos, intereses moratorios y sanciones aplicadas por el sector público. Se registra contablemente como gasto (cuenta 659 o 64 según el caso) porque el hecho económico ocurrió, pero en la declaración anual se **adiciona** como diferencia permanente. Es decir, la empresa paga la multa y además paga impuesto sobre ella: el costo real de una multa de S/ 1,000 es S/ 1,295.'},
   {l:2,t:'num',p:'Una empresa con ingresos brutos anuales de S/ 3,200,000 gastó S/ 24,000 en gastos de representación. ¿Cuánto es deducible?',
    u:'S/',r:16000,tol:1,
    s:'El límite es el **0.5% de los ingresos brutos**, con tope de 40 UIT.\nLímite por porcentaje = 3,200,000 × 0.5% = **S/ 16,000**\nTope absoluto = 40 × 5,500 = S/ 220,000 (no es restrictivo aquí)\n\nDeducible: **S/ 16,000**. No deducible: 24,000 − 16,000 = **S/ 8,000**, que se adiciona en la declaración anual como diferencia permanente. Costo tributario del exceso: 8,000 × 29.5% = S/ 2,360.\n\nDetalle práctico: los gastos de representación son los destinados a presentar la imagen de la empresa o a agasajar a clientes. No se confunden con los gastos de **publicidad** dirigida a consumidores en general, que no tienen ese límite. Clasificar bien una cena con clientes (representación, limitada) frente a una campaña en redes (publicidad, sin límite) es parte del trabajo de cierre.'},
   {l:2,t:'num',p:'En 2025 una empresa tuvo impuesto calculado de S/ 96,000 e ingresos netos de S/ 3,000,000. En abril de 2026 factura S/ 250,000. ¿Cuánto paga de pago a cuenta de abril?',
    u:'S/',r:8000,tol:1,
    s:'Coeficiente = 96,000 ÷ 3,000,000 = **0.0320**\nPor coeficiente: 250,000 × 0.0320 = **S/ 8,000**\nPor el 1.5%: 250,000 × 0.015 = S/ 3,750\n\nSe paga el **mayor: S/ 8,000**.\n\nDos precisiones: el coeficiente se redondea a cuatro decimales; y para los pagos a cuenta de enero y febrero de 2026 se habría usado el coeficiente de 2024, no de 2025, porque el impuesto de 2025 se determina recién al presentar la declaración anual en marzo de 2026. Si la empresa prevé que su utilidad de 2026 será mucho menor, puede evaluar la modificación o suspensión de pagos a cuenta a partir de los meses que la norma permite, presentando el estado de resultados a la fecha de corte correspondiente.'},
   {l:3,t:'ab',p:'Determina el Impuesto a la Renta de 2026 de una empresa del Régimen General con: utilidad contable antes de impuestos S/ 850,000; multas de SUNAT S/ 12,000; gastos de representación S/ 40,000 (ingresos brutos S/ 4,000,000); depreciación contable de vehículos S/ 90,000 frente a un máximo tributario de S/ 72,000; provisión de cobranza dudosa S/ 30,000 sin el análisis documentado que exige la norma; ingresos por dividendos recibidos de otra empresa domiciliada S/ 25,000. Pagos a cuenta efectuados: S/ 180,000. ITAN pagado: S/ 14,000.',
    s:'**Conciliación tributaria**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad contable antes de impuestos | 850,000 |\n| **Adiciones** | |\n| Multas de SUNAT (art. 44, permanente) | +12,000 |\n| Exceso de gastos de representación | +20,000 |\n| Exceso de depreciación de vehículos (temporal) | +18,000 |\n| Provisión de cobranza dudosa sin sustento (temporal) | +30,000 |\n| **Deducciones** | |\n| Dividendos de empresa domiciliada (no gravados) | (25,000) |\n| **Renta neta imponible** | **905,000** |\n\nDetalle del límite de representación: 4,000,000 × 0.5% = S/ 20,000 deducibles; el exceso de los S/ 40,000 gastados es S/ 20,000.\n\nDetalle de la depreciación: contable S/ 90,000 frente a tope tributario de S/ 72,000 → adición de S/ 18,000. Es **temporal**: se deducirá en ejercicios futuros, cuando la depreciación contable del bien ya esté agotada pero el tope tributario siga disponible.\n\nLos dividendos recibidos de otra persona jurídica domiciliada **no están gravados** con renta de tercera categoría (ya tributaron en la empresa que los generó), por lo que se deducen.\n\n**Impuesto y liquidación**\n\n| Concepto | Importe |\n|---|---|\n| Renta neta imponible | 905,000 |\n| Impuesto a la Renta (29.5%) | 266,975 |\n| (−) Pagos a cuenta | (180,000) |\n| (−) ITAN aplicado | (14,000) |\n| **Saldo por regularizar** | **72,975** |\n\n**Impuesto diferido (NIC 12).** Las adiciones temporales suman S/ 48,000 (18,000 + 30,000) y generan un **activo tributario diferido** de 48,000 × 29.5% = **S/ 14,160**, porque son gastos ya reconocidos contablemente que se deducirán tributariamente en el futuro.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 14,160.00 | |\n| 88 | Impuesto a la Renta diferido | | 14,160.00 |\n\n**Tasa efectiva:** gasto corriente 266,975 menos diferido 14,160 = gasto neto S/ 252,815 sobre una utilidad contable de S/ 850,000 = **29.7%**. Queda por encima del 29.5% nominal por efecto de las diferencias **permanentes** (multas y exceso de representación, S/ 32,000), que nunca se recuperan: 32,000 × 29.5% = S/ 9,440 de impuesto que no vuelve. Las temporales, en cambio, no afectan la tasa efectiva, solo el momento del pago.\n\n**Acción concreta para el próximo ejercicio:** los S/ 30,000 de cobranza dudosa serían deducibles si se armara el expediente que exige la norma (análisis de la morosidad caso por caso, gestiones de cobro documentadas o más de 12 meses de mora, y discriminación de la provisión en el Libro de Inventarios y Balances). Es trabajo de documentación, no de contabilidad, y vale S/ 8,850 de impuesto.'}
  ]
 }
 ]
}
);
