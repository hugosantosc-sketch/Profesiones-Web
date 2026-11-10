/* Contenido del curso — m7
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
 id:'m7', nivel:'Avanzado · Corporativo', titulo:'Cierre tributario y gestión corporativa',
 resumen:'Conciliación anual, libros electrónicos, moneda extranjera, partes vinculadas, consolidación y control interno.',
 temas:[
 {
  id:'m7t1', titulo:'Conciliación tributaria y cierre anual', min:16,
  cont:`La conciliación tributaria es el puente entre la utilidad contable (NIIF) y la renta neta imponible (LIR). Es el trabajo técnico más visible del contador en el cierre y el que más dinero pone en juego.

$ Utilidad contable antes de impuestos
$   (+) Adiciones:   gastos no deducibles o deducibles en otro ejercicio; ingresos gravados no contabilizados
$   (−) Deducciones: ingresos no gravados o exonerados; gastos deducibles no contabilizados
$   = Renta neta
$   (−) Pérdidas tributarias arrastrables
$   = Renta neta imponible  ×  tasa  =  Impuesto anual

# Las adiciones que aparecen en casi todos los cierres
|Concepto|Base legal|Tipo|
|Multas, intereses moratorios y sanciones del sector público|Art. 44 inc. c|Permanente|
|Gastos sin comprobante de pago o de proveedor no habido|Art. 44 inc. j|Permanente|
|Gastos personales del titular o socios|Art. 44 inc. a|Permanente|
|Donaciones y actos de liberalidad no calificados|Art. 44 inc. d|Permanente|
|El propio Impuesto a la Renta|Art. 44 inc. b|Permanente|
|Exceso de gastos de representación (0.5% de ingresos brutos, tope 40 UIT)|Art. 37 inc. q|Permanente|
|Exceso de gastos recreativos (0.5% de ingresos netos, tope 40 UIT)|Art. 37 inc. ll|Permanente|
|Exceso de depreciación sobre las tasas máximas|Art. 22 Reglamento|Temporal|
|Provisión de cobranza dudosa sin requisitos|Art. 37 inc. i|Temporal|
|Desvalorización de existencias sin acreditar el desmedro|Art. 37 inc. f|Temporal|
|Vacaciones y gratificaciones no pagadas en el plazo de ley|Art. 37 inc. v|Temporal|
|Deterioro de activos (NIC 36)|—|Temporal|
|Exceso de intereses por la regla de subcapitalización (EBITDA tributario)|Art. 37 inc. a|Temporal o permanente según el caso|

# Las deducciones más frecuentes
- **Dividendos recibidos** de otras personas jurídicas domiciliadas: no gravados con tercera categoría.
- **Ingresos exonerados** (por ejemplo, intereses de determinados valores, según la norma vigente).
- **Vacaciones y gratificaciones de ejercicios anteriores pagadas en este ejercicio**, que se adicionaron antes.
- **Depreciación tributaria aceptada en exceso de la contable** en los años de reversión.
- **Reversión de provisiones** que se adicionaron en ejercicios previos y que ahora cumplen requisitos.

# El gasto deducible: los cinco filtros
Un gasto pasa si cumple **todos**:
1. **Causalidad**: necesario para producir renta o mantener la fuente (art. 37).
2. **Razonabilidad y proporcionalidad**: coherente con el volumen y la naturaleza del negocio.
3. **Generalidad** (para beneficios al personal): otorgado a todos los que están en situación similar.
4. **Fehaciencia**: evidencia de que la operación existió.
5. **Formalidad**: comprobante válido, registro oportuno, bancarización y detracción cuando corresponda.

! La **generalidad** se malinterpreta siempre. No significa dar lo mismo a todos: significa que el beneficio alcance a todos los que están en una situación equivalente. Un seguro médico para todos los gerentes cumple generalidad; el mismo seguro solo para el gerente que es hijo del accionista, no.

# Checklist de cierre anual
**Antes de calcular el impuesto:**
1. Todos los comprobantes del ejercicio registrados y conciliados con el SIRE.
2. Inventario físico realizado y ajustado; mermas y desmedros documentados.
3. Conciliaciones bancarias de todas las cuentas, en cero.
4. Cuentas por cobrar con análisis de antigüedad; provisión de cobranza dudosa con expediente por cliente, discriminada en el Libro de Inventarios y Balances.
5. Activo fijo con cuadro por bien: costo, fecha de alta, tasa, depreciación del año y acumulada; conciliado con el Mayor.
6. Provisiones laborales completas: vacaciones, gratificaciones, CTS, participación de trabajadores si corresponde.
7. Préstamos con cronograma conciliado; intereses devengados registrados; reclasificación de la porción corriente.
8. Operaciones en moneda extranjera revaluadas al tipo de cambio de cierre.
9. Saldos de tributos cuadrados con las declaraciones presentadas (IGV, renta, PLAME).
10. Operaciones con partes vinculadas identificadas y valoradas a valor de mercado.

**Al calcular el impuesto:**
11. Papel de trabajo de adiciones y deducciones con la base legal de cada partida.
12. Clasificación de cada diferencia como permanente o temporal.
13. Impuesto diferido calculado por el método del balance.
14. Pagos a cuenta, ITAN y retenciones aplicados como crédito.
15. Nota de conciliación de la tasa efectiva.

> **Lo que diferencia un cierre profesional de uno improvisado** no es la velocidad: es que cada cifra tenga un papel de trabajo detrás con su base legal. Cuando llega una fiscalización tres años después, la persona que hizo el cierre puede no estar en la empresa. El expediente es lo que queda.

# Plazos clave del cierre
|Obligación|Plazo|
|Formular estados financieros y someterlos a junta|Dentro de los 3 meses siguientes al cierre (LGS art. 221)|
|Declaración jurada anual del Impuesto a la Renta|Según cronograma de SUNAT, usualmente entre marzo y abril|
|ITAN|Declaración y pago en abril, según cronograma|
|Pago de participación de trabajadores|Dentro del plazo de la declaración anual, para ser deducible|
|Legalización de libros físicos|Antes de su uso|`,
  claves:['La conciliación parte de la utilidad contable y suma adiciones y resta deducciones para llegar a la renta neta imponible.','Las permanentes cambian la tasa efectiva; las temporales generan impuesto diferido.','Un gasto deducible debe pasar cinco filtros: causalidad, razonabilidad, generalidad, fehaciencia y formalidad.','La generalidad exige alcanzar a todos los que están en situación equivalente, no dar lo mismo a todos.','Cada partida de la conciliación necesita papel de trabajo con base legal: ese expediente es lo que sostiene el cierre en una fiscalización.'],
  ej:[
   {l:1,t:'mc',p:'El Impuesto a la Renta pagado por la empresa, ¿es deducible para determinar la renta neta?',
    o:['Sí, como gasto por tributos','No: el artículo 44 lo prohíbe expresamente','Sí, hasta el 50%','Solo los pagos a cuenta'],r:1,
    s:'No es deducible. El artículo 44 inciso b de la LIR lo prohíbe: sería circular deducir el impuesto para calcular el impuesto. Contablemente se registra como gasto (cuenta 88), por lo que en la conciliación se adiciona íntegro como diferencia permanente. Lo mismo ocurre con el ITAN en cuanto a su deducción como gasto cuando se opta por aplicarlo como crédito.'},
   {l:1,t:'mc',p:'Una empresa da un bono de productividad solo a los tres hijos del accionista, que trabajan en la empresa. ¿Es deducible?',
    o:['Sí, es gasto de personal','No: no cumple el criterio de generalidad y además hay vinculación','Sí, hasta el límite del 0.5%','Sí, si está en planilla'],r:1,
    s:'No cumple generalidad: el beneficio no alcanza a los demás trabajadores en situación equivalente. Además, al tratarse de familiares del accionista, la remuneración debe estar a valor de mercado, y el exceso se considera dividendo (no deducible y con su propia tributación). Si el bono se otorgara a todos los trabajadores con la misma función o categoría, con un criterio objetivo y documentado, sí sería deducible.'},
   {l:2,t:'num',p:'Utilidad contable S/ 740,000. Adiciones: multas 8,000; exceso de representación 22,000; depreciación en exceso 35,000. Deducciones: dividendos recibidos 60,000. Pérdida arrastrable aplicable: 50,000. Tasa 29.5%. ¿Cuál es el impuesto anual?',
    u:'S/',r:205025,tol:50,
    s:'Renta neta = 740,000 + 8,000 + 22,000 + 35,000 − 60,000 = S/ 745,000\nMenos pérdida arrastrable aplicada: (50,000)\n**Renta neta imponible = S/ 695,000**\nImpuesto = 695,000 × 29.5% = **S/ 205,025**\n\nEl orden importa: primero la utilidad contable, luego adiciones y deducciones para llegar a la renta neta, y solo entonces la compensación de pérdidas arrastrables.\n\nDel total de adiciones, S/ 30,000 son permanentes (multas y representación) y S/ 35,000 temporales (depreciación), por lo que corresponde reconocer un activo tributario diferido de 35,000 × 29.5% = S/ 10,325.'},
   {l:2,t:'ab',p:'Clasifica cada partida como adición permanente, adición temporal o deducción: (a) intereses moratorios a SUNAT S/ 3,200; (b) provisión de vacaciones S/ 45,000 que se pagarán en junio del año siguiente; (c) ingreso por dividendos de una subsidiaria peruana S/ 90,000; (d) donación a un albergue sin calificación como entidad perceptora S/ 10,000; (e) depreciación de un vehículo: contable S/ 48,000, tope tributario S/ 36,000.',
    s:'**(a) Intereses moratorios a SUNAT S/ 3,200 → adición PERMANENTE.** El artículo 44 inciso c prohíbe deducir intereses moratorios, multas y sanciones del sector público. Nunca serán deducibles, en ningún ejercicio. Costo real del atraso: 3,200 × 1.295 = S/ 4,144.\n\n**(b) Provisión de vacaciones S/ 45,000 pagaderas en junio del año siguiente → adición TEMPORAL.** Las rentas de quinta categoría son deducibles en el ejercicio de devengo solo si se pagan dentro del plazo de presentación de la declaración anual (usualmente marzo o abril). Si se pagarán en junio, no cumplen y se adicionan; se deducirán en el ejercicio del pago. Genera activo diferido de 45,000 × 29.5% = S/ 13,275.\n\n**(c) Dividendos de subsidiaria peruana S/ 90,000 → DEDUCCIÓN (permanente).** No están gravados con renta de tercera categoría, porque ya tributaron en la empresa que generó la utilidad. Se deducen en la conciliación y bajan la tasa efectiva.\n\n**(d) Donación sin calificación S/ 10,000 → adición PERMANENTE.** Solo son deducibles las donaciones a entidades calificadas como perceptoras de donaciones, con el límite del 10% de la renta neta imponible y con la documentación correspondiente. Sin la calificación, es un acto de liberalidad y nunca será deducible.\n\n**(e) Exceso de depreciación S/ 12,000 (48,000 − 36,000) → adición TEMPORAL.** El exceso sobre el tope tributario no se deduce este año, pero se deducirá en ejercicios posteriores, cuando la depreciación contable del bien se agote y aún quede tope tributario disponible. Genera activo diferido de 12,000 × 29.5% = S/ 3,540.\n\n**Resumen del efecto:**\n\n| Partida | Importe | Tipo |\n|---|---|---|\n| Intereses moratorios | +3,200 | Permanente |\n| Vacaciones no pagadas en plazo | +45,000 | Temporal |\n| Dividendos recibidos | (90,000) | Permanente |\n| Donación no calificada | +10,000 | Permanente |\n| Exceso de depreciación | +12,000 | Temporal |\n| **Efecto neto en renta neta** | **(19,800)** | |\n\nActivo tributario diferido total: (45,000 + 12,000) × 29.5% = **S/ 16,815**.\n\n**Acción concreta:** el caso (b) es el único de los cinco que puede cambiarse con una decisión de gerencia. Pagar las vacaciones antes del vencimiento de la declaración anual convierte S/ 45,000 de adición en gasto deducible de este ejercicio, lo que vale S/ 13,275 de impuesto. Si la caja lo permite, es una de las decisiones de cierre con mejor retorno.'},
   {l:3,t:'ab',p:'Eres el contador de una empresa que cierra 2026 con utilidad contable de S/ 1,250,000. Enumera el orden completo de tu trabajo de cierre, desde la revisión hasta la presentación, con los controles que harías en cada paso y qué papel de trabajo dejarías.',
    s:'**Fase 1 — Integridad del registro (diciembre a enero)**\n\n| Paso | Control | Papel de trabajo |\n|---|---|---|\n| Conciliar el SIRE con el Registro de Compras y de Ventas | Que no haya comprobantes de terceros sin registrar ni registrados sin existir | Reporte de diferencias con explicación de cada partida |\n| Revisar comprobantes de diciembre recibidos en enero | Que el gasto quede en el ejercicio del devengo | Listado de provisiones de cierre contra cuenta 46 |\n| Conciliar bancos (todas las cuentas, incluida la de detracciones) | Diferencia cero | Conciliación firmada por cuenta y mes |\n\n**Fase 2 — Valuación de activos y pasivos (enero)**\n\n| Paso | Control | Papel de trabajo |\n|---|---|---|\n| Inventario físico | Conteo contra kardex; investigar diferencias antes de ajustar | Acta de inventario, hoja de diferencias, informes técnicos de merma |\n| Valor neto realizable de existencias | Comparar costo con precio de venta menos gastos | Análisis de VNR por línea con rotación |\n| Antigüedad de cuentas por cobrar | Expediente por cliente con gestiones de cobro | Reporte de antigüedad y análisis de cobranza dudosa caso por caso |\n| Cuadro de activo fijo | Costo, alta, tasa, depreciación del año y acumulada; conciliado con el Mayor; evaluar indicios de deterioro | Cuadro por bien, con contable y tributario en columnas paralelas |\n| Revaluación de partidas en moneda extranjera | Tipo de cambio de cierre aplicado a todas las partidas monetarias | Detalle por cuenta y moneda con el tipo de cambio usado |\n| Provisiones laborales | Vacaciones por trabajador, gratificaciones, CTS, participación si hay más de 20 trabajadores | Planilla de provisiones conciliada con la PLAME |\n| Préstamos y arrendamientos | Cronogramas conciliados; intereses devengados; porción corriente reclasificada | Tabla de amortización por contrato |\n\n**Fase 3 — Determinación del impuesto (febrero)**\n\n| Paso | Control | Papel de trabajo |\n|---|---|---|\n| Papel de adiciones y deducciones | Cada partida con su base legal citada | Cédula de conciliación con referencia al artículo |\n| Clasificar permanentes y temporales | Que la suma de permanentes explique la desviación de la tasa efectiva | Cédula de tasa efectiva |\n| Impuesto diferido por el método del balance | Base contable y tributaria de cada partida | Cédula de bases y diferido, con movimiento del año |\n| Créditos contra el impuesto | Pagos a cuenta, ITAN, retenciones y saldos a favor, conciliados con las declaraciones | Resumen de créditos con constancias |\n| Participación de trabajadores | Verificar si hay más de 20 trabajadores y la tasa del sector | Cálculo con el padrón de trabajadores |\n\n**Fase 4 — Presentación y gobierno (febrero a abril)**\n\n| Paso | Control | Papel de trabajo |\n|---|---|---|\n| Estados financieros con comparativo | Cuatro cruces: ecuación contable, utilidad, efectivo final, saldos de tributos | Hoja de cruces firmada |\n| Notas a los estados financieros | Políticas, estimaciones, partes relacionadas, hechos posteriores, tasa efectiva | Borrador de notas con respaldo de cada cifra |\n| Junta de accionistas | Dentro de los 3 meses del cierre (LGS art. 221); acordar reserva legal y destino del resultado | Acta de junta |\n| Declaración jurada anual | Presentada en el plazo del cronograma; balance de comprobación anexo si corresponde | Constancia de presentación y pago |\n| Libros electrónicos | Diario, Mayor e Inventarios y Balances generados y enviados; detalle de provisiones discriminado | Constancias de envío |\n\n**Lo que haría distinto de lo habitual, y que es donde se gana o se pierde dinero:**\n\n1. **Empezar en noviembre, no en enero.** Un "pre-cierre" al 31 de octubre con la conciliación tributaria proyectada permite tomar decisiones que en enero ya no se pueden tomar: pagar vacaciones antes del plazo, documentar la cobranza dudosa, acreditar desmedros con la destrucción ante notario, evaluar la suspensión de pagos a cuenta.\n2. **Estimar el impuesto en noviembre** para que la gerencia sepa cuánta caja necesitará en marzo. Un impuesto de regularización de varios cientos de miles de soles que aparece como sorpresa en marzo es un problema de tesorería evitable.\n3. **Dejar una carpeta de cierre autoexplicativa**, con índice, donde cada cifra de la declaración se pueda rastrear hasta su papel de trabajo y su base legal. Es el único entregable que protege a la empresa y al contador cuando la fiscalización llega cuatro años después.'}
  ]
 },
 {
  id:'m7t2', titulo:'Libros electrónicos: PLE, SIRE y SLE', min:13,
  cont:`Los libros contables en el Perú dejaron de ser cuadernos legalizados. Hoy conviven tres sistemas, y saber qué se lleva en cada uno evita multas por libros no presentados.

# Los tres sistemas
|Sistema|Qué es|Qué libros|
|**SLE - Portal**|Se llevan desde el portal de SUNAT|Registro de Ventas y Registro de Compras, para contribuyentes de menor envergadura|
|**PLE** (Programa de Libros Electrónicos)|Aplicativo de escritorio: el contribuyente genera archivos TXT desde su sistema y los valida y envía|Diario, Diario simplificado, Mayor, Inventarios y Balances, Registro de Activos Fijos, Registro de Inventario Permanente, entre otros|
|**SIRE** (Sistema Integrado de Registros Electrónicos)|SUNAT **preconstruye** el registro con los comprobantes electrónicos que ya tiene|RVIE (Registro de Ventas e Ingresos Electrónico) y RCE (Registro de Compras Electrónico)|

# El cambio de fondo que trajo el SIRE
Antes, el contribuyente declaraba y SUNAT verificaba después. Con el SIRE, **SUNAT propone y el contribuyente concilia**:

1. SUNAT genera una propuesta del registro con los comprobantes electrónicos emitidos y recibidos.
2. El contribuyente la descarga, la compara con su contabilidad y puede **aceptarla, modificarla o complementarla** (agregando comprobantes que SUNAT no tiene, como los físicos que aún existen).
3. Se genera el registro definitivo, que queda almacenado en SUNAT.

> La consecuencia práctica es enorme: **las omisiones salen a la luz el mismo mes**. Si un proveedor emitió una factura y la empresa no la registró, aparece en la propuesta. Si la empresa registró una factura que el proveedor nunca emitió, no aparece y queda en evidencia. El trabajo del contador pasó de digitar a investigar diferencias, y eso exige entender el negocio, no solo el software.

# Plazos y multas
Los libros electrónicos se envían según el **cronograma** que SUNAT publica, que depende del último dígito del RUC y del periodo. Las infracciones más comunes:

|Infracción|Base|Consecuencia|
|No llevar los libros exigidos|Art. 175 num. 1|Multa calculada como porcentaje de los ingresos netos, con topes en UIT|
|Llevar los libros con atraso mayor al permitido|Art. 175 num. 5|Multa en función de los ingresos netos, con gradualidad por subsanación|
|No presentar los libros cuando SUNAT lo requiere|Art. 177 num. 1|Multa y, en una fiscalización, desconocimiento de operaciones|

! **Lo que no se puede arreglar a posteriori.** El crédito fiscal exige la anotación del comprobante en el Registro de Compras dentro del plazo (hasta los 12 meses siguientes a la emisión). Un registro reconstruido tres años después no recupera el crédito perdido, y un libro enviado con atraso de dos años sigue generando multa aunque el contenido sea correcto. La disciplina mensual es lo que protege, no la capacidad de reconstruir.

# Qué libros corresponden según régimen e ingresos
|Situación|Libros|
|NRUS|Ninguno|
|RER|Registro de Compras y Registro de Ventas|
|RMT hasta 300 UIT|Registro de Ventas, Registro de Compras y Libro Diario de Formato Simplificado|
|RMT de 300 a 500 UIT|Los anteriores más Libro Mayor e Inventarios y Balances|
|RMT de 500 a 1,700 UIT y Régimen General|Contabilidad completa: Diario, Mayor, Inventarios y Balances, Caja y Bancos, Registro de Compras, Registro de Ventas, y los auxiliares que correspondan|
|Ingresos mayores a 1,500 UIT|Además, Registro de Inventario Permanente Valorizado|
|Con activo fijo|Registro de Activos Fijos|

# Buenas prácticas que evitan el 90% de los problemas
1. **Conciliar el SIRE antes de declarar**, no después. La propuesta está disponible antes del vencimiento.
2. **Validar el RUC del proveedor** antes de registrar una factura: condición de habido y estado activo.
3. **Controlar las detracciones** con alerta de vencimiento antes de pagar, no en el cierre.
4. **Cerrar el mes contable antes del vencimiento de la declaración**, para que la declaración salga de la contabilidad y no al revés.
5. **Archivar las constancias de envío** de cada libro, por periodo. Es la única prueba de que se presentó a tiempo.`,
  claves:['Tres sistemas: SLE-Portal, PLE (Diario, Mayor, Inventarios y Balances, activos fijos, inventarios) y SIRE (RVIE y RCE).','El SIRE invierte la lógica: SUNAT preconstruye el registro y el contribuyente concilia, acepta, modifica o complementa.','Las omisiones y los comprobantes inexistentes quedan visibles el mismo mes.','El crédito fiscal exige anotar el comprobante dentro del plazo: un registro reconstruido después no lo recupera.','Los libros obligatorios dependen del régimen y del nivel de ingresos; el atraso en el envío es infracción sancionable.'],
  ej:[
   {l:1,t:'mc',p:'¿Qué registros se llevan a través del SIRE?',
    o:['El Libro Diario y el Mayor','El Registro de Ventas e Ingresos (RVIE) y el Registro de Compras (RCE)','El Libro de Inventarios y Balances','La planilla electrónica'],r:1,
    s:'El RVIE y el RCE. El Libro Diario, el Mayor, el Libro de Inventarios y Balances, el Registro de Activos Fijos y el Registro de Inventario Permanente se llevan por el PLE. La planilla no es un libro contable: se declara mediante el T-Registro y la PLAME.'},
   {l:1,t:'mc',p:'La propuesta del SIRE incluye una factura de un proveedor que la empresa no tiene registrada. ¿Qué debe hacer?',
    o:['Ignorarla, porque no la tiene en su sistema','Investigar: pedir el comprobante al proveedor, verificar si la operación existió y, si es correcta, registrarla','Rechazar la propuesta completa','Esperar a que el proveedor la anule'],r:1,
    s:'Investigar. Dos escenarios posibles y opuestos: (1) la operación existió y alguien no entregó el comprobante al área contable, en cuyo caso hay que registrarla y así se recupera el crédito fiscal y el gasto; (2) el proveedor emitió una factura que no corresponde a una operación real con la empresa, y entonces hay que exigir su anulación mediante nota de crédito y dejar constancia escrita del reclamo. Aceptar la propuesta sin revisar, en el segundo caso, significa usar un crédito fiscal de una operación inexistente, lo que es mucho más grave que no usarlo.'},
   {l:2,t:'mc',p:'Una empresa del Régimen General con ingresos de 2,000 UIT, ¿qué registro adicional debe llevar respecto de una con 400 UIT?',
    o:['Ninguno adicional','El Registro de Inventario Permanente Valorizado','El Libro de Actas','El Registro de Retenciones'],r:1,
    s:'El Registro de Inventario Permanente Valorizado, exigido cuando los ingresos brutos anuales superan 1,500 UIT. Entre 500 y 1,500 UIT la exigencia es el inventario permanente en unidades físicas, y por debajo de 500 UIT basta el inventario físico al cierre. La diferencia no es formal: el valorizado obliga a tener costo unitario por producto y movimiento, lo que exige un sistema que pocas empresas pequeñas tienen bien configurado.'},
   {l:2,t:'ab',p:'Al conciliar el SIRE de marzo encuentras: 3 facturas de compra que SUNAT tiene y la empresa no registró (S/ 23,600 en total); 1 factura de venta que la empresa registró y SUNAT no tiene (S/ 5,900); y 2 boletas de venta de la empresa que no aparecen en la propuesta (S/ 1,200). Explica qué harías con cada caso.',
    s:'**Caso 1 — Tres facturas de compra no registradas (S/ 23,600).**\n\nAcción: pedir los comprobantes (el XML, no el PDF), verificar que la operación corresponda a la empresa y que cumpla causalidad, y **registrarlas**. El crédito fiscal es de S/ 3,600 (23,600 × 18/118) y el costo o gasto de S/ 20,000.\n\nAntes de registrar, tres verificaciones: (a) que el proveedor estuviera habido a la fecha de emisión; (b) si la operación está sujeta a detracción, que el depósito se haya hecho, porque de lo contrario el crédito se ejerce desde el periodo del depósito; (c) que el pago, si fue igual o mayor a S/ 2,000, esté bancarizado.\n\nY una pregunta de control interno que vale más que el registro: **¿por qué no llegaron al área contable?** Probablemente alguien compró sin pasar por el proceso de compras. Si pasó con tres facturas en un mes, está pasando todos los meses.\n\n**Caso 2 — Factura de venta registrada que SUNAT no tiene (S/ 5,900).**\n\nEsto es más delicado, porque significa que el comprobante electrónico **no llegó a SUNAT** o fue rechazado. Si no tiene CDR (Constancia de Recepción), para efectos tributarios ese comprobante no existe, aunque el cliente tenga su PDF y haya pagado.\n\nAcción: revisar el estado del envío en el sistema de emisión; si fue rechazado, corregir el error que causó el rechazo y reemitir; si nunca se envió, enviarlo. La venta **sí debe declararse** en el IGV del periodo en que nació la obligación tributaria, independientemente del problema técnico. No declararla para "cuadrar" con la propuesta del SIRE sería una omisión de ingresos.\n\n**Caso 3 — Dos boletas que no aparecen (S/ 1,200).**\n\nMismo diagnóstico que el caso 2: hay un problema de envío o de generación. Las boletas electrónicas también se remiten a SUNAT, con sus propios plazos y, en ciertos casos, mediante resúmenes diarios. Un resumen diario no enviado deja las boletas de ese día fuera del sistema.\n\nAcción: revisar los resúmenes diarios del periodo, identificar los no enviados y remitirlos. Y declarar los ingresos igual, porque la venta existió.\n\n**El registro definitivo del mes** debe incluir, entonces: las tres compras agregadas a la propuesta, y las ventas que la empresa tiene y SUNAT no, complementando la propuesta. El SIRE permite exactamente eso: la propuesta es un punto de partida, no una verdad que haya que aceptar.\n\n**Lo que este caso revela:** tres problemas distintos de proceso (compras fuera del circuito, envío de comprobantes sin monitoreo, resúmenes diarios sin control). La conciliación del SIRE no es un trámite tributario: es el mejor diagnóstico mensual de control interno que una empresa peruana tiene disponible, y es gratis.'},
   {l:3,t:'ab',p:'Una empresa descubre en diciembre de 2026 que no ha enviado los libros electrónicos (Diario y Mayor) de los periodos de enero a octubre de 2026, y que tampoco registró en el Registro de Compras 14 facturas de 2025 por un total de S/ 177,000. Evalúa la situación y plantea el plan de regularización.',
    s:'**Diagnóstico de las dos contingencias, que son de naturaleza distinta.**\n\n**A. Libros electrónicos no enviados (enero a octubre de 2026).**\n\nEs la infracción del numeral 5 del artículo 175 del Código Tributario: llevar los libros con atraso mayor al permitido. La multa se calcula como un porcentaje de los ingresos netos del ejercicio anterior, con topes expresados en UIT, y aplica por cada libro y periodo según el criterio de SUNAT, con un régimen de **gradualidad** que la reduce de forma significativa cuando la subsanación es **voluntaria**, es decir, antes de cualquier notificación.\n\nLo relevante es la palabra voluntaria: el momento de regularizar es ahora, antes de que llegue un requerimiento. La diferencia entre subsanar voluntariamente y hacerlo después de notificado suele ser de varios miles de soles.\n\n**B. Facturas de 2025 no registradas (S/ 177,000).**\n\nAquí el daño es parcialmente irreversible. El crédito fiscal exige la anotación del comprobante en el Registro de Compras hasta el periodo correspondiente a los **12 meses** siguientes a su emisión.\n\n| Situación de la factura | Crédito fiscal |\n|---|---|\n| Emitida hace menos de 12 meses | **Recuperable** si se anota ahora |\n| Emitida hace más de 12 meses | **Perdido definitivamente** |\n\nSi las 14 facturas son de 2025 y hoy es diciembre de 2026, la mayoría probablemente excede los 12 meses. IGV en juego: 177,000 × 18/118 = **S/ 27,000**. Si todo está fuera de plazo, es pérdida definitiva.\n\n**El costo o gasto** de S/ 150,000, en cambio, sigue siendo deducible para el Impuesto a la Renta si cumple causalidad y fehaciencia, pero corresponde al ejercicio 2025, no a 2026. Deducirlo en 2026 sería un gasto de otro ejercicio, que es reparable. La vía correcta es evaluar la **rectificación de la declaración anual de 2025**, dentro del plazo de prescripción, lo que generaría un saldo a favor o una menor deuda de ese año. Beneficio potencial: 150,000 × 29.5% = **S/ 44,250**.\n\n**Plan de regularización, en orden estricto de prioridad**\n\n| Prioridad | Acción | Plazo | Por qué primero |\n|---|---|---|---|\n| 1 | Generar y enviar los libros de enero a octubre de 2026, y noviembre en su plazo | Inmediato, antes de fin de año | La gradualidad por subsanación voluntaria se pierde con cualquier notificación |\n| 2 | Clasificar las 14 facturas por fecha de emisión y determinar cuáles están dentro de los 12 meses | Esta semana | Define cuánto crédito fiscal es rescatable |\n| 3 | Anotar en el Registro de Compras las que estén en plazo y usar su crédito | Antes del vencimiento del periodo | Es dinero recuperable con fecha límite |\n| 4 | Evaluar con el asesor tributario la rectificación de la declaración anual de 2025 | Enero | Recupera hasta S/ 44,250 de Renta |\n| 5 | Verificar bancarización y detracciones de esas 14 operaciones | Enero | Sin medio de pago, el gasto tampoco es deducible y el paso 4 pierde sentido |\n| 6 | Calcular y pagar las multas con la gradualidad aplicable | Junto con la subsanación | El pago dentro del régimen de gradualidad maximiza la rebaja |\n\n**Lo que hay que informar a la gerencia, sin adornos:**\n\n1. Hay alrededor de **S/ 27,000 de IGV probablemente perdido** de forma definitiva, y es una pérdida que se produjo por falta de proceso, no por una contingencia del negocio.\n2. Hay **S/ 44,250 de Renta recuperables** mediante rectificación, si el sustento documental está completo.\n3. Las **multas por libros** son inevitables, pero su monto depende de actuar ahora. Esperar solo las encarece.\n4. La causa raíz es que **no existe un cierre mensual**. La solución no es un plan de regularización: es un calendario con responsable y fecha para cada obligación, con revisión mensual de que los envíos tengan su constancia. Sin eso, en diciembre de 2027 estaremos exactamente en el mismo punto.'}
  ]
 },
 {
  id:'m7t3', titulo:'Moneda extranjera y diferencia de cambio (NIC 21)', min:13,
  cont:`Casi toda empresa peruana que importa, exporta o toma deuda en dólares convive con la diferencia de cambio. La NIC 21 y el artículo 61 de la LIR dicen cómo medirla, y no coinciden del todo.

# Las dos clases de partidas
|Partida|Qué es|Cómo se mide al cierre|
|**Monetaria**|Derecho u obligación de recibir o entregar una cantidad fija de dinero|Se **revalúa** al tipo de cambio de cierre|
|**No monetaria**|Activos y pasivos que no son dinero: inventarios, activo fijo, anticipos por bienes|**No se revalúa**: queda al tipo de cambio de la fecha de la transacción|

Ejemplos de monetarias: efectivo en dólares, cuentas por cobrar y por pagar en dólares, préstamos en dólares, tributos por pagar en dólares.
Ejemplos de no monetarias: mercadería importada, maquinaria adquirida en el exterior, anticipos entregados por bienes.

! Este es el error más común: **revaluar el inventario importado** al tipo de cambio de cierre. La mercadería se quedó en soles al tipo de cambio del día en que se registró la compra, y ahí se queda hasta que se venda. Lo que se revalúa es la **deuda con el proveedor del exterior**, no la mercadería.

# Tipos de cambio que se usan en el Perú
|Operación|Tipo de cambio|
|Compra de bienes o servicios (cuentas por pagar)|Tipo de cambio **venta** publicado por la SBS a la fecha de la operación|
|Venta de bienes o servicios (cuentas por cobrar)|Tipo de cambio **compra** publicado por la SBS|
|Cierre de partidas monetarias, para efectos tributarios|El que fija el reglamento de la LIR (compra para activos, venta para pasivos)|
|IGV|Tipo de cambio venta publicado en la fecha de nacimiento de la obligación tributaria|

# El registro, paso a paso
Importación de mercadería por US$ 20,000 al crédito. Tipo de cambio a la fecha de la compra: 3.72 (venta).

@ 10/11 — Compra de mercadería importada, US$ 20,000 × 3.72
@ 60|6011 Mercaderías|74,400.00|
@ 42|4212 Facturas por pagar - Moneda extranjera||74,400.00

Al 31 de diciembre la deuda sigue impaga y el tipo de cambio de cierre es 3.78.

$ Deuda en soles al cierre: 20,000 × 3.78 = 75,600
$ Deuda registrada: 74,400
$ Diferencia de cambio: 1,200 → PÉRDIDA (la deuda en dólares se encareció)

@ 31/12 — Diferencia de cambio por actualización de la deuda
@ 67|6761 Pérdida por diferencia de cambio|1,200.00|
@ 42|4212 Facturas por pagar - Moneda extranjera||1,200.00

La mercadería sigue registrada en S/ 74,400: **no se toca**.

Cuando se paga, en febrero, con tipo de cambio 3.75:

$ Pago real: 20,000 × 3.75 = 75,000
$ Deuda registrada: 75,600
$ Diferencia: 600 → GANANCIA

@ Pago de la deuda
@ 42|4212 Facturas por pagar - Moneda extranjera|75,600.00|
@ 10|1041 Cuentas corrientes operativas||75,000.00
@ 77|7761 Ganancia por diferencia de cambio||600.00

# Regla de bolsillo del signo
|Si el tipo de cambio…|En un ACTIVO en dólares|En un PASIVO en dólares|
|Sube|Ganancia|Pérdida|
|Baja|Pérdida|Ganancia|

# Tratamiento tributario
Las diferencias de cambio **son computables** para el Impuesto a la Renta: las ganancias son renta gravada y las pérdidas son deducibles, cuando provienen de operaciones vinculadas con la actividad gravada. Hay una regla particular importante: las diferencias de cambio originadas por pasivos relacionados con la adquisición de **activos fijos o existencias** se rigen por reglas específicas del artículo 61, que en determinados supuestos afectan el costo del activo en lugar del resultado. Es uno de los puntos donde conviene revisar la norma vigente caso por caso, porque el tratamiento ha variado con el tiempo.

> **Cobertura.** Una empresa con deuda en dólares e ingresos en soles tiene un riesgo cambiario estructural. No es un problema contable: es de gestión. Las alternativas son facturar en dólares (trasladar el riesgo al cliente), contratar un **forward** con el banco (fijar el tipo de cambio futuro) o calzar la moneda de los activos con la de los pasivos. Un contador que solo registra la diferencia de cambio sin advertir el riesgo está informando el pasado y nada más.`,
  claves:['Las partidas monetarias se revalúan al cierre; las no monetarias (inventarios, activo fijo) se quedan al tipo de cambio de la transacción.','Error frecuente: revaluar el inventario importado. Se revalúa la deuda, no la mercadería.','Se usa tipo de cambio venta para pasivos y compra para activos, según la norma aplicable.','Si el tipo de cambio sube: ganancia en activos en dólares y pérdida en pasivos en dólares.','Las diferencias de cambio son computables para renta, con reglas particulares del artículo 61 cuando se vinculan a la compra de activos fijos o existencias.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa tiene mercadería importada registrada a un tipo de cambio de 3.70. Al cierre el tipo de cambio es 3.80. ¿Debe ajustar el valor del inventario?',
    o:['Sí, al nuevo tipo de cambio','No: el inventario es una partida no monetaria y permanece al tipo de cambio de la transacción','Sí, solo el 50% de la diferencia','Depende de si se vendió'],r:1,
    s:'No se ajusta. El inventario es una partida no monetaria: su costo quedó fijado en soles al momento de la compra. Lo que sí se revalúa es la cuenta por pagar al proveedor del exterior, si sigue pendiente. Ajustar el inventario sería inventar un costo que nunca se pagó, y además inflaría el costo de ventas futuro.'},
   {l:1,t:'num',p:'Cuenta por cobrar de US$ 15,000 registrada a 3.68. Al cierre el tipo de cambio es 3.75. ¿Cuál es la diferencia de cambio y de qué signo?',
    u:'S/',r:1050,tol:5,
    s:'Valor registrado: 15,000 × 3.68 = S/ 55,200\nValor al cierre: 15,000 × 3.75 = S/ 56,250\nDiferencia = **S/ 1,050 de GANANCIA**\n\nEs ganancia porque se trata de un **activo** en dólares y el tipo de cambio subió: el derecho de cobro vale más soles. Asiento: debe 1212 (moneda extranjera) S/ 1,050, haber 7761 Ganancia por diferencia de cambio S/ 1,050. Esa ganancia es renta gravada aunque no se haya cobrado nada.'},
   {l:2,t:'num',p:'Préstamo bancario de US$ 80,000 registrado a 3.70. Al cierre el tipo de cambio es 3.82. ¿Cuál es el efecto en el resultado?',
    u:'S/',r:9600,tol:10,
    s:'Deuda registrada: 80,000 × 3.70 = S/ 296,000\nDeuda al cierre: 80,000 × 3.82 = S/ 305,600\nDiferencia = **S/ 9,600 de PÉRDIDA**\n\nEs un **pasivo** en dólares y el tipo de cambio subió: se necesitan más soles para pagar la misma deuda. Asiento: debe 6761 Pérdida por diferencia de cambio S/ 9,600, haber 4511 (moneda extranjera) S/ 9,600.\n\nNota de gestión: una variación de solo 12 céntimos en el tipo de cambio costó S/ 9,600. Si la empresa factura en soles, ese riesgo no está cubierto por nada. Un forward sobre la deuda habría fijado el costo de antemano.'},
   {l:2,t:'ab',p:'Una empresa tiene al 31/12: efectivo US$ 12,000; cuentas por cobrar US$ 40,000; mercadería importada registrada en S/ 180,000; cuentas por pagar al exterior US$ 55,000; préstamo en dólares US$ 30,000. Tipo de cambio de registro promedio 3.70; de cierre 3.79. Calcula el efecto neto en el resultado.',
    s:'**Paso 1 — Identificar qué se revalúa.**\n\n| Partida | Clase | ¿Se revalúa? |\n|---|---|---|\n| Efectivo US$ 12,000 | Monetaria (activo) | Sí |\n| Cuentas por cobrar US$ 40,000 | Monetaria (activo) | Sí |\n| Mercadería importada S/ 180,000 | **No monetaria** | **No** |\n| Cuentas por pagar US$ 55,000 | Monetaria (pasivo) | Sí |\n| Préstamo US$ 30,000 | Monetaria (pasivo) | Sí |\n\n**Paso 2 — Posición neta en dólares.**\nActivos monetarios: 12,000 + 40,000 = US$ 52,000\nPasivos monetarios: 55,000 + 30,000 = US$ 85,000\n**Posición neta pasiva: US$ 33,000**\n\nLa empresa debe más dólares de los que tiene, así que un alza del tipo de cambio la perjudica.\n\n**Paso 3 — Cálculo del efecto.**\nVariación del tipo de cambio = 3.79 − 3.70 = S/ 0.09\n**Efecto neto = 33,000 × 0.09 = S/ 2,970 de PÉRDIDA**\n\nComprobación partida por partida:\n\n| Partida | US$ | Efecto por 0.09 | Signo |\n|---|---|---|---|\n| Efectivo | 12,000 | 1,080 | Ganancia |\n| Cuentas por cobrar | 40,000 | 3,600 | Ganancia |\n| Cuentas por pagar | 55,000 | (4,950) | Pérdida |\n| Préstamo | 30,000 | (2,700) | Pérdida |\n| **Neto** | | **(2,970)** | **Pérdida** |\n\n**Lo que esto le dice a la gerencia:** la empresa tiene una **exposición neta pasiva de US$ 33,000**. Cada centavo de alza del tipo de cambio le cuesta S/ 330. Si el tipo de cambio subiera a 4.00 (una variación plausible en un año), la pérdida sería 33,000 × 0.30 = **S/ 9,900**.\n\nTres formas de cerrar esa brecha: (1) mantener más efectivo en dólares, hasta igualar activos y pasivos monetarios en esa moneda; (2) facturar en dólares a los clientes, lo que aumenta las cuentas por cobrar en dólares; (3) contratar un forward por los US$ 33,000 de exposición neta. La tercera cuesta una prima y fija el resultado; las dos primeras son gratis pero dependen de la realidad comercial.'},
   {l:3,t:'ab',p:'Una importadora compra mercadería por US$ 100,000 el 15/10 (tipo de cambio 3.68), financiada con un préstamo en dólares a 18 meses. Al 31/12 el tipo de cambio es 3.81 y la mercadería está vendida al 60%. Analiza el tratamiento contable completo y las implicancias tributarias.',
    s:'**Paso 1 — Registro inicial (15/10).**\nMercadería: 100,000 × 3.68 = **S/ 368,000** (más derechos, fletes y gastos de internamiento, que aquí omitimos)\nPréstamo: **S/ 368,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6011 | Mercaderías - Costo | 368,000.00 | |\n| 4511 | Préstamos de instituciones financieras - M.E. | | 368,000.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 2011 | Mercaderías - Costo | 368,000.00 | |\n| 6111 | Variación de mercaderías | | 368,000.00 |\n\n**Paso 2 — Al 31/12, la mercadería NO se revalúa.**\nVendido 60% → costo de ventas 368,000 × 60% = S/ 220,800\nInventario final 40% → **S/ 147,200**, al tipo de cambio original de 3.68. Aunque el dólar haya subido, el inventario se queda ahí: es partida no monetaria.\n\n**Paso 3 — El préstamo SÍ se revalúa.**\nSaldo al cierre: 100,000 × 3.81 = S/ 381,000\nSaldo registrado: S/ 368,000\n**Diferencia de cambio: S/ 13,000 de pérdida**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6761 | Pérdida por diferencia de cambio | 13,000.00 | |\n| 4511 | Préstamos - M.E. | | 13,000.00 |\n\n**Paso 4 — La reclasificación que nadie recuerda.** El préstamo es a 18 meses, así que al 31/12 una parte vence dentro de los próximos 12 meses y otra después. Hay que separar la porción corriente de la no corriente en el Estado de Situación Financiera, con el cronograma del banco como respaldo. Omitirlo distorsiona todos los ratios de liquidez.\n\n**Paso 5 — Implicancias tributarias, que es donde está la complejidad.**\n\n1. **La diferencia de cambio es computable** para el Impuesto a la Renta cuando proviene de operaciones vinculadas con la actividad gravada (art. 61 LIR). Las pérdidas son deducibles y las ganancias gravadas, por el solo devengo al cierre, sin necesidad de que la deuda se haya pagado.\n2. **Pero hay una regla particular** para las diferencias de cambio originadas por pasivos destinados a la adquisición de **existencias o activos fijos**: el artículo 61 establece un tratamiento específico que, en determinados supuestos, afecta el costo del bien en lugar del resultado del ejercicio. Dado que aquí el préstamo financió precisamente la compra de mercadería, este es exactamente el caso que hay que analizar con la norma y la jurisprudencia vigentes antes de cerrar.\n3. **Consecuencia práctica:** si parte de la diferencia debiera afectar el costo de las existencias en lugar del resultado, aparecería una diferencia entre el tratamiento contable (NIC 21: resultado del periodo, sin excepción para existencias) y el tributario, que se gestiona como diferencia temporal en la conciliación y en la NIC 12.\n\n**Paso 6 — Lo que el contador debe dejar documentado:**\n\n| Documento | Contenido |\n|---|---|\n| Cuadro de posición en moneda extranjera | Activos y pasivos monetarios por moneda, con el tipo de cambio aplicado |\n| Detalle de la diferencia de cambio | Por partida, con tipo de cambio de origen y de cierre |\n| Cronograma del préstamo | Con la separación corriente y no corriente |\n| Análisis del art. 61 | Con la conclusión adoptada y su fundamento, por si hay fiscalización |\n| Kardex de la importación | Costo unitario en soles, para que el costo de ventas sea verificable |\n\n**Y la advertencia de gestión:** la empresa financió en dólares la compra de mercadería que venderá en soles. Entre octubre y diciembre, una variación de 13 céntimos le costó S/ 13,000, que es el 3.5% del valor de la importación. Si el margen comercial de esa mercadería era del 20%, acaba de perder casi la sexta parte de su utilidad por el tipo de cambio. La decisión de financiamiento, en este caso, pesó más que la de compra.'}
  ]
 },
 {
  id:'m7t4', titulo:'Partes vinculadas y precios de transferencia', min:14,
  cont:`Cuando dos empresas relacionadas transan entre sí, el precio puede fijarse con libertad, y eso abre la puerta a trasladar utilidades. Las reglas de precios de transferencia obligan a que esas operaciones se pacten como si fueran entre partes independientes: el **principio de plena competencia** (arm's length).

# Cuándo hay vinculación
El reglamento de la LIR define los supuestos. Los más frecuentes:
- Participación directa o indirecta en más del 30% del capital de otra empresa.
- Un socio o grupo de socios que participa en más del 30% de dos o más empresas.
- Dirección o control común: mismos directores, gerentes o representantes con poder de decisión.
- Contratos de colaboración empresarial con participación mayor al 30%.
- Dependencia económica: cuando más del 80% de las ventas de una empresa se dirige a otra (con condiciones).
- Vinculación por parentesco hasta el segundo grado en determinados supuestos.

> La vinculación **no es ilegal ni sospechosa**: casi todos los grupos empresariales operan así. Lo que la norma exige es que los precios sean de mercado y que se pueda demostrar.

# Los métodos de valoración
|Método|Cuándo se usa|
|Precio comparable no controlado|Hay transacciones idénticas o similares con terceros|
|Precio de reventa|Distribuidores que revenden sin transformar|
|Costo incrementado|Fabricantes o prestadores de servicios|
|Partición de utilidades|Operaciones muy integradas, sin comparables|
|Residual de partición de utilidades|Cuando hay intangibles valiosos de ambas partes|
|Margen neto transaccional|El más usado en la práctica: compara márgenes con empresas comparables|

Se aplica el método **más apropiado** a la naturaleza de la operación, no el que dé el resultado más conveniente.

# Obligaciones formales en el Perú
|Declaración|Quién la presenta (referencias en UIT)|Contenido|
|**Reporte Local**|Contribuyentes con ingresos devengados superiores a 2,300 UIT que realicen operaciones con vinculadas o desde paraísos fiscales, con umbrales por monto de transacciones|Análisis funcional, selección de método, comparables y conclusión por cada transacción|
|**Reporte Maestro**|Integrantes de grupos con ingresos consolidados superiores a 20,000 UIT|Estructura del grupo, intangibles, financiamiento, políticas de precios|
|**Reporte País por País**|Grupos multinacionales que superan el umbral establecido|Ingresos, utilidades e impuestos por jurisdicción|

Con UIT de S/ 5,500 en 2026: 2,300 UIT = **S/ 12,650,000** y 20,000 UIT = **S/ 110,000,000**. Los umbrales específicos por tipo de reporte y por monto de transacciones los fija la resolución de SUNAT vigente, que hay que consultar cada año.

# El test de beneficio en servicios
Para deducir el gasto por un **servicio** recibido de una vinculada, la LIR exige acreditar el **test de beneficio**: que el servicio proporcione valor económico o comercial a quien lo recibe, mejorando su posición. Y para servicios de bajo valor añadido, el margen permitido está limitado (la norma fija un tope sobre los costos y gastos incurridos por el prestador).

! Un "management fee" cobrado por la casa matriz sin evidencia de qué servicio prestó es el reparo más clásico en empresas de grupos internacionales. Hay que documentar: qué se hizo, quién lo hizo, cuántas horas, qué entregables hubo y cómo se determinó el precio. Sin eso, el gasto se desconoce íntegro.

# NIC 24: lo que se revela en los estados financieros
Independientemente de lo tributario, la NIC 24 exige revelar en notas:
- La relación con la matriz y, si es distinta, con la controladora última.
- El importe de las transacciones con partes relacionadas, sus saldos pendientes y sus condiciones.
- Las estimaciones de incobrabilidad sobre esos saldos.
- La **remuneración del personal clave de la gerencia**, por categoría.

# Caso típico de MYPE grande
El accionista alquila su local a la empresa. Es una operación con parte vinculada, y aunque la empresa no llegue a los umbrales de los reportes, el valor **debe ser de mercado**:
- Si el alquiler está por encima del mercado, SUNAT repara el exceso: no es deducible y puede calificar como dividendo.
- Si está por debajo, puede aplicarse un ajuste que incremente la renta del accionista (renta de primera categoría), con la regla de renta presunta del 6% del autovalúo como piso en determinados casos.
- El soporte mínimo: contrato escrito, dos o tres cotizaciones de alquileres comparables en la zona, y el pago bancarizado.`,
  claves:['Vinculación por participación mayor al 30%, control común, dependencia económica o parentesco en los supuestos del reglamento.','El principio es el de plena competencia: precios como entre partes independientes.','Seis métodos; el margen neto transaccional es el más usado en la práctica.','Reporte Local, Reporte Maestro y Reporte País por País, con umbrales en UIT que SUNAT fija cada año.','Los servicios entre vinculadas exigen el test de beneficio y, en servicios de bajo valor añadido, tienen margen limitado.'],
  ej:[
   {l:1,t:'mc',p:'Dos empresas tienen al mismo accionista con el 45% del capital en cada una. ¿Son partes vinculadas?',
    o:['No, porque son sociedades distintas','Sí: un socio participa en más del 30% del capital de ambas','Solo si comparten gerente','Solo si operan en el mismo rubro'],r:1,
    s:'Sí. Uno de los supuestos del reglamento de la LIR es que una persona participe directa o indirectamente en más del 30% del capital de dos o más empresas. Con el 45% en cada una, la vinculación es clara. Las operaciones entre ellas deben estar a valor de mercado, documentarse, y revelarse en notas conforme a la NIC 24, aunque no se alcancen los umbrales de las declaraciones informativas.'},
   {l:1,t:'mc',p:'La casa matriz del exterior cobra a su filial peruana S/ 400,000 anuales por "servicios de gestión", sin detalle de qué servicios fueron. ¿Qué riesgo hay?',
    o:['Ninguno, es una operación normal del grupo','Desconocimiento total del gasto por no acreditar el test de beneficio','Solo una multa formal','Se deduce al 50%'],r:1,
    s:'El riesgo es el desconocimiento íntegro del gasto. La LIR exige acreditar el test de beneficio: demostrar que el servicio proporcionó valor económico o comercial real a la filial. Sin documentación del servicio efectivamente prestado (entregables, horas, personal involucrado, metodología de determinación del precio), SUNAT repara los S/ 400,000: impuesto de S/ 118,000, más multa e intereses, y además el IGV de no domiciliados pagado podría quedar sin crédito.'},
   {l:2,t:'ab',p:'El accionista mayoritario de una empresa le alquila un local. El mercado en la zona está entre S/ 4,000 y S/ 5,000 mensuales, y se pactó S/ 9,000. ¿Qué consecuencias tiene?',
    s:'**Diagnóstico:** el alquiler está S/ 4,000 a S/ 5,000 por encima del rango de mercado. La operación es con parte vinculada y no cumple el principio de plena competencia.\n\n**Consecuencias para la empresa:**\n\n| Concepto | Importe anual |\n|---|---|\n| Alquiler pagado | 108,000 |\n| Valor de mercado (tomando S/ 5,000, el techo del rango) | 60,000 |\n| **Exceso reparable** | **48,000** |\n| Impuesto a la Renta sobre el exceso (29.5%) | 14,160 |\n| IGV reparado, si el accionista emitió factura con IGV (48,000 × 18%) | 8,640 |\n| Multa por declarar cifras falsas (50% del tributo omitido, antes de gradualidad) | ~11,400 |\n\nAdemás, el exceso puede calificar como **distribución indirecta de utilidades (dividendo presunto)**, que tiene una tasa propia bastante más alta que la del reparto formal de dividendos, y que se aplica sobre el monto distribuido indirectamente. Ese es el riesgo más caro del caso.\n\n**Consecuencias para el accionista:** percibe renta de primera categoría por el total cobrado y tributa sobre ella; el reparo a la empresa no le devuelve nada. Es decir, el grupo paga dos veces por la misma operación mal estructurada.\n\n**Cómo se corrige:**\n\n1. **Ajustar el contrato al rango de mercado** desde ya, con adenda escrita y fecha.\n2. **Documentar el valor de mercado**: tres cotizaciones de locales comparables en la misma zona, con metraje y características similares, o una tasación. Ese expediente es la defensa.\n3. **Bancarizar el pago**, siempre, sin excepción.\n4. **Revelar la operación** en notas a los estados financieros conforme a la NIC 24.\n5. Si el accionista quiere retirar más dinero de la empresa, hacerlo por la vía correcta: **dividendos**, con la retención del 5% a personas naturales domiciliadas. Resulta más barato y no tiene contingencia. Un reparo por dividendo presunto puede costar varias veces lo que habría costado el reparto formal.'},
   {l:2,t:'num',p:'Una empresa tuvo ingresos devengados de S/ 15,000,000 en 2026 (UIT S/ 5,500). ¿Supera el umbral de referencia de 2,300 UIT asociado al Reporte Local?',
    u:'UIT',r:2727,tol:5,
    s:'Ingresos en UIT = 15,000,000 ÷ 5,500 = **2,727 UIT**\n\nComo 2,727 UIT supera las 2,300 UIT de referencia, la empresa queda dentro del universo de contribuyentes alcanzados por la obligación del Reporte Local, siempre que además realice operaciones con partes vinculadas o desde o hacia paraísos fiscales y supere los umbrales por monto de transacciones que fija la resolución de SUNAT vigente.\n\nLo que debe hacer: identificar todas las operaciones con vinculadas del ejercicio, realizar el análisis funcional de cada una, seleccionar el método más apropiado, buscar comparables y documentar la conclusión. Es un trabajo que normalmente toma meses y requiere bases de datos de comparables, por lo que no se puede dejar para la semana del vencimiento.'},
   {l:3,t:'ab',p:'Un grupo peruano tiene tres empresas: A (fabricante, utilidad 1,500,000), B (distribuidora, utilidad 120,000) y C (servicios, utilidad 80,000). A le vende a B con un margen del 45% y B revende con margen del 8%. Las distribuidoras independientes del sector operan con márgenes del 18% al 25%. Analiza el riesgo y cuantifica.',
    s:'**Diagnóstico.** El margen de B (8%) está muy por debajo del rango de comparables independientes (18% a 25%). Eso indica que A le está vendiendo a B a un precio demasiado alto, trasladando utilidad de B hacia A. Dicho de otro modo: los precios de transferencia dentro del grupo están concentrando la utilidad en el fabricante.\n\n**¿Por qué haría eso un grupo?** Las razones habituales: A tiene pérdidas arrastrables que quiere consumir, A está en un régimen o jurisdicción con menor carga, o simplemente nadie fijó una política y los precios se heredaron. Cualquiera sea la razón, el riesgo es el mismo.\n\n**Cuantificación del ajuste.** Si las ventas de B fueron, supongamos, S/ 6,000,000:\n\n| Escenario | Margen | Utilidad de B |\n|---|---|---|\n| Actual | 8% | 480,000 (de los cuales 120,000 netos tras gastos) |\n| Con margen de mercado mínimo | 18% | 1,080,000 |\n| **Ajuste potencial** | **10 puntos** | **600,000** |\n\nSUNAT podría ajustar la renta de B hacia arriba en **S/ 600,000**, con un Impuesto a la Renta adicional de 600,000 × 29.5% = **S/ 177,000**, más multa (50% del tributo omitido, antes de gradualidad) e intereses.\n\n**El problema del ajuste unilateral.** Lo que hace particularmente caro este tipo de reparo: SUNAT ajusta la renta de B hacia arriba, pero **no necesariamente reduce la de A** de forma automática. El grupo termina tributando dos veces sobre la misma utilidad, salvo que se gestione el ajuste correlativo cuando la norma lo permita. Es la razón por la que estos casos se previenen y no se corrigen.\n\n**Plan de acción:**\n\n| Paso | Acción |\n|---|---|\n| 1 | **Estudio de precios de transferencia** por un especialista, con búsqueda de comparables en base de datos y aplicación del método del margen neto transaccional, que es el apropiado para un distribuidor |\n| 2 | **Definir una política de precios intragrupo** escrita, aprobada por el directorio, que fije el margen objetivo de B dentro del rango de comparables |\n| 3 | **Ajustar los precios hacia adelante** desde el ejercicio siguiente, con contratos actualizados |\n| 4 | **Evaluar la exposición de los ejercicios no prescritos** y, con asesoría legal, decidir si conviene rectificar o preparar la defensa documentada |\n| 5 | **Verificar la empresa C (servicios)**: si presta servicios a A y B, cada cobro necesita acreditar el test de beneficio, con entregables y horas documentadas |\n| 6 | **Revelar las transacciones** entre las tres empresas en las notas de cada juego de estados financieros (NIC 24) |\n\n**Y una observación que suele pasarse por alto:** si el grupo tiene control común, bien podría estar obligado a presentar **estados financieros consolidados** conforme a la NIIF 10. En el consolidado, todas estas operaciones intragrupo se eliminan y la utilidad total del grupo (S/ 1,700,000) queda a la vista, al margen de cómo se reparta entre las tres empresas. El consolidado no resuelve el problema tributario, pero es el estado que muestra la realidad económica del grupo, y es lo primero que mira un banco o un comprador potencial.'}
  ]
 },
 {
  id:'m7t5', titulo:'Consolidación, combinaciones de negocios y control interno', min:16,
  cont:`Cuando una empresa controla a otras, los estados financieros individuales dejan de contar la historia completa. La NIIF 10 obliga a presentar **estados financieros consolidados**, y la NIIF 3 regula cómo se registra la adquisición de un negocio.

# Qué es control (NIIF 10)
Hay control cuando se cumplen **los tres elementos** a la vez:
1. **Poder** sobre la participada (normalmente, mayoría de derechos de voto, pero también acuerdos contractuales).
2. **Exposición** a rendimientos variables por esa participación.
3. **Capacidad de usar el poder** para influir en esos rendimientos.

Más del 50% de los votos suele implicar control, pero no siempre: puede haber control con menos (participación dispersa, acuerdos de accionistas) y no haberlo con más (derechos protectores de minoritarios, decisiones que requieren unanimidad).

|Relación|Norma|Tratamiento|
|Control (subsidiaria)|NIIF 10|Consolidación línea por línea|
|Control conjunto (negocio conjunto)|NIIF 11|Método de la participación o consolidación de activos y pasivos según el tipo|
|Influencia significativa (asociada, usualmente 20% a 50%)|NIC 28|Método de la participación|
|Inversión sin influencia|NIIF 9|Valor razonable|

# El proceso de consolidación, en cuatro pasos
1. **Sumar** línea por línea los estados financieros de la matriz y las subsidiarias.
2. **Eliminar** la inversión de la matriz contra el patrimonio de la subsidiaria.
3. **Eliminar** todas las operaciones intragrupo: ventas, compras, cuentas por cobrar y pagar, préstamos, dividendos, y las utilidades no realizadas en inventarios o activos vendidos dentro del grupo.
4. **Presentar** la **participación no controladora** (antes llamada interés minoritario) por separado, dentro del patrimonio.

$ Participación no controladora = % de terceros × Patrimonio de la subsidiaria

# Ejemplo de eliminación
La matriz vende mercadería a su subsidiaria por S/ 500,000, con un costo de S/ 380,000. Al cierre, la subsidiaria todavía tiene el 40% de esa mercadería en su almacén.

$ Ventas a eliminar: 500,000   ·   Costo de ventas a eliminar: 380,000
$ Utilidad no realizada en inventario: (500,000 − 380,000) × 40% = 48,000
$ El inventario consolidado se reduce en 48,000 y la utilidad consolidada también

Sin esa eliminación, el grupo estaría reconociendo una utilidad por venderse mercadería a sí mismo. Es la eliminación que más se olvida y la que más distorsiona.

# Combinaciones de negocios (NIIF 3): el método de adquisición
1. Identificar al **adquirente**.
2. Determinar la **fecha de adquisición**.
3. Reconocer y medir los activos adquiridos y pasivos asumidos a **valor razonable**.
4. Reconocer la **plusvalía** (goodwill) o la ganancia por compra en condiciones ventajosas.

$ Plusvalía = Contraprestación pagada + Participación no controladora − Valor razonable de los activos netos identificables
$ Si el resultado es negativo → ganancia en el resultado del periodo (compra ventajosa), tras revisar la medición

La plusvalía **no se amortiza** bajo NIIF plenas: se somete a prueba de deterioro al menos anualmente (NIC 36). Bajo NIIF para las PYMES sí se amortiza.

! Tributariamente, la plusvalía mercantil no tiene el mismo tratamiento que el contable, y el **costo computable** de las acciones adquiridas sigue las reglas de la LIR. Una adquisición de empresas mal estructurada puede generar un costo tributario enorme en la venta futura. La estructuración de una compra se decide con abogados tributaristas antes de firmar, no después.

# Control interno: el marco COSO en la práctica
El control interno no es una lista de papeles: es el sistema que hace que los errores y fraudes sean improbables o se detecten rápido. Los cinco componentes:

|Componente|Pregunta que responde|
|Entorno de control|¿La gerencia da el ejemplo? ¿Hay código de conducta y consecuencias?|
|Evaluación de riesgos|¿Sabemos qué puede salir mal y qué impacto tendría?|
|Actividades de control|¿Existen controles que mitiguen esos riesgos?|
|Información y comunicación|¿La información llega a quien decide, a tiempo?|
|Supervisión|¿Alguien verifica que los controles funcionen?|

**Los cinco controles que más valen en una empresa peruana mediana:**
1. **Segregación de funciones**: quien autoriza no ejecuta, quien ejecuta no registra, quien registra no custodia. Si una sola persona cobra, deposita y registra, el fraude es cuestión de tiempo.
2. **Conciliaciones mensuales obligatorias** de bancos, cuentas por cobrar, cuentas por pagar e inventarios, firmadas por quien las hace y por quien las revisa.
3. **Autorización de desembolsos por niveles**, con límites de monto y doble firma por encima de cierto umbral.
4. **Conteos cíclicos de inventario**, no solo el anual.
5. **Conciliación mensual del SIRE** con la contabilidad, que detecta de golpe compras fuera del circuito y comprobantes no enviados.

> **Auditoría externa.** Las entidades supervisadas por la SMV y las que superan los umbrales de la normativa aplicable presentan estados financieros auditados. Para las demás, auditarse es voluntario, y suele valer la pena cuando se busca financiamiento, cuando hay socios que no participan en la gestión, o antes de una venta. El dictamen puede ser **sin salvedades** (limpio), **con salvedades**, **adverso** o con **abstención de opinión**; la diferencia entre el primero y el segundo puede decidir una línea de crédito.`,
  claves:['Control (NIIF 10) requiere poder, exposición a rendimientos variables y capacidad de influir en ellos.','Consolidar es sumar, eliminar la inversión contra el patrimonio, eliminar operaciones y utilidades intragrupo, y presentar la participación no controladora.','La utilidad no realizada en inventarios vendidos dentro del grupo se elimina en proporción a lo no vendido a terceros.','Plusvalía = contraprestación más participación no controladora menos activos netos identificables a valor razonable; no se amortiza bajo NIIF plenas.','La segregación de funciones y las conciliaciones mensuales firmadas son los controles de mayor rendimiento por costo.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa posee el 35% de otra y tiene influencia significativa, pero no control. ¿Cómo registra esa inversión?',
    o:['Consolidación línea por línea','Método de la participación (NIC 28)','Al costo histórico sin ajustes','No la registra'],r:1,
    s:'Método de la participación: la inversión se registra inicialmente al costo y luego se ajusta por la porción que le corresponde del resultado y de otros resultados integrales de la asociada; los dividendos recibidos reducen el valor de la inversión. No se consolida porque no hay control. La consolidación línea por línea está reservada a las subsidiarias (NIIF 10).'},
   {l:1,t:'num',p:'Una matriz paga S/ 900,000 por el 100% de una empresa cuyos activos netos identificables a valor razonable son S/ 740,000. ¿Cuánta plusvalía se reconoce?',
    u:'S/',r:160000,tol:1,
    s:'Plusvalía = 900,000 − 740,000 = **S/ 160,000**\n\nRepresenta lo que la matriz pagó por encima del valor razonable de los activos netos identificables: sinergias esperadas, cartera de clientes no separable, capital humano, reputación. Bajo NIIF plenas no se amortiza: se somete a prueba de deterioro al menos una vez al año, y si el negocio adquirido no rinde lo esperado, se castiga contra resultados. Esa pérdida por deterioro de plusvalía, además, no es deducible tributariamente.'},
   {l:2,t:'num',p:'La matriz vende a su subsidiaria mercadería por S/ 300,000 con costo de S/ 210,000. Al cierre la subsidiaria conserva el 30% en inventario. ¿Cuánta utilidad no realizada se elimina?',
    u:'S/',r:27000,tol:1,
    s:'Utilidad de la venta intragrupo = 300,000 − 210,000 = S/ 90,000\nProporción no vendida a terceros = 30%\n**Utilidad no realizada a eliminar = 90,000 × 30% = S/ 27,000**\n\nEn el consolidado se elimina la venta de S/ 300,000, el costo de ventas de S/ 210,000, y además se reduce el inventario en S/ 27,000 con cargo al resultado. El 70% de la mercadería ya se vendió a terceros, así que esa parte de la utilidad sí está realizada desde la perspectiva del grupo y se mantiene.'},
   {l:2,t:'ab',p:'La matriz tiene el 80% de una subsidiaria cuyo patrimonio al cierre es S/ 1,200,000 y cuya utilidad del ejercicio fue S/ 300,000. ¿Cómo se presenta la participación no controladora y la utilidad en el consolidado?',
    s:'**Participación no controladora en el patrimonio:**\n20% × 1,200,000 = **S/ 240,000**\n\nSe presenta dentro del patrimonio consolidado, en una línea separada de la participación de la controladora. No es un pasivo: representa la parte del patrimonio del grupo que pertenece a accionistas distintos de la matriz.\n\n**Distribución del resultado del ejercicio:**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad de la subsidiaria | 300,000 |\n| Atribuible a la controladora (80%) | 240,000 |\n| Atribuible a la participación no controladora (20%) | 60,000 |\n\nEn el Estado de Resultados consolidado se presenta la utilidad **total** (incluida la de la subsidiaria completa, no solo el 80%), y al pie se desglosa su atribución:\n\n| Concepto | Importe |\n|---|---|\n| Utilidad neta del ejercicio | X |\n| Atribuible a los propietarios de la controladora | X − 60,000 |\n| Atribuible a la participación no controladora | 60,000 |\n\n**El punto conceptual que esto enseña:** la consolidación suma el **100%** de los activos, pasivos, ingresos y gastos de la subsidiaria, porque la matriz controla la totalidad de esos recursos, aunque solo le pertenezca el 80% económicamente. La porción que no le pertenece no se resta de las líneas: se identifica por separado en el patrimonio y en la atribución del resultado. Confundir esto y consolidar solo el 80% de cada línea es un error frecuente de quien consolida por primera vez.\n\n**Y un detalle operativo:** si la subsidiaria pagó dividendos a la matriz durante el ejercicio, esos dividendos se eliminan íntegramente en el consolidado (son un movimiento interno) y la parte pagada a los minoritarios se presenta como una reducción de la participación no controladora.'},
   {l:3,t:'ab',p:'Diseña el control interno mínimo para una empresa de 25 trabajadores con tres locales, ventas de S/ 6,000,000 anuales, que maneja efectivo en caja, inventario en los tres locales y 40 proveedores. El dueño sospecha que "se le está yendo dinero" pero no sabe por dónde.',
    s:'**Primero, el diagnóstico de dónde se va el dinero en una empresa así.** Tres locales con efectivo e inventario y 25 trabajadores es exactamente el tamaño en que el dueño ya no puede controlar todo personalmente y aún no tiene sistemas. Las fugas típicas, por frecuencia:\n\n| Fuga | Cómo ocurre | Cómo se detecta |\n|---|---|---|\n| Ventas no registradas | Se cobra sin emitir comprobante y el efectivo no entra | Diferencia entre inventario físico y kardex |\n| Faltantes de inventario | Mercadería que sale sin documento | Conteos cíclicos |\n| Compras infladas o a proveedores relacionados | Precios por encima del mercado, comisiones | Comparación de precios entre proveedores |\n| Pagos duplicados o a proveedores inexistentes | Facturas pagadas dos veces, o sin bien recibido | Conciliación de cuentas por pagar |\n| Planilla inflada | Trabajadores que no existen o no asisten | Cruce de planilla con control de asistencia |\n\n**Diseño del control interno, por proceso:**\n\n**1. Ingresos y efectivo (la prioridad)**\n- **Arqueo de caja diario** por local, hecho por una persona distinta del cajero, con acta firmada. No negociable.\n- **Depósito diario íntegro** de la recaudación, sin usar el efectivo para pagos. Los pagos salen de caja chica con fondo fijo y rendición.\n- **Numeración correlativa controlada** de comprobantes por local, con cuadre diario entre lo vendido en el sistema, lo facturado y lo depositado.\n- **Cuadre de tres vías**: sistema de ventas, comprobantes electrónicos emitidos y depósito bancario. Las tres cifras deben coincidir cada día.\n\n**2. Inventarios**\n- **Conteos cíclicos semanales** por familia de productos: cada semana se cuenta una parte, de modo que todo el inventario se cuente cada mes o dos.\n- **Toda salida con documento**: guía de remisión o nota de transferencia entre locales, con firma de quien entrega y quien recibe.\n- **Responsable de almacén identificado** por local, con el inventario a su cargo.\n- **Investigación obligatoria** de cualquier diferencia mayor a un umbral definido (por ejemplo S/ 500), con informe escrito.\n\n**3. Compras y pagos**\n- **Segregación de funciones**: quien solicita la compra no la autoriza, quien la autoriza no recibe la mercadería, quien recibe no paga, quien paga no registra. Con 25 trabajadores esto es posible.\n- **Tres cotizaciones** para compras por encima de un monto definido.\n- **Orden de compra obligatoria** antes de cualquier compromiso.\n- **Pago solo con el trío completo**: orden de compra, nota de ingreso al almacén y factura validada en SUNAT.\n- **Doble firma** para desembolsos por encima de un umbral, y todos los pagos bancarizados.\n\n**4. Planilla**\n- **Control de asistencia** obligatorio, cruzado mensualmente con la planilla.\n- **Alta en T-Registro** antes del inicio de labores, verificada por el contador.\n- **Revisión por el dueño** de la lista de trabajadores pagados cada mes. Toma diez minutos y cierra la fuga de planillas fantasma.\n\n**5. Controles de supervisión (los que detectan todo lo demás)**\n- **Conciliación mensual del SIRE** con la contabilidad: delata compras fuera del circuito y comprobantes no enviados.\n- **Conciliación bancaria mensual** de todas las cuentas, firmada por quien la hace y por quien la revisa.\n- **Tablero mensual de cinco indicadores** para el dueño: margen bruto por local, días de inventario, diferencias de inventario del mes, periodo de cobro y flujo de caja. Un margen bruto que cae en un local y no en los otros dos es la señal más clara de ventas no registradas.\n\n**Qué haría en las primeras dos semanas, en este orden:**\n\n| Semana | Acción | Qué revela |\n|---|---|---|\n| 1 | Inventario físico completo en los tres locales, simultáneo y sorpresivo | La magnitud del faltante y en qué local está |\n| 1 | Arqueo de caja sorpresivo en los tres locales | Si hay diferencias de efectivo |\n| 2 | Análisis de margen bruto por local de los últimos 12 meses | Qué local se desvía del patrón |\n| 2 | Listado de proveedores con sus precios comparados entre locales | Sobreprecios y proveedores sospechosos |\n| 2 | Cruce de planilla con control de asistencia | Planilla inflada |\n\n**Lo que hay que decirle al dueño:** el control interno cuesta tiempo de gestión y algo de incomodidad, pero en una empresa de S/ 6,000,000 de ventas, una fuga del 2% son S/ 120,000 al año. Ningún ahorro de costos ni negociación con proveedores rinde tanto como cerrar esa fuga. Y la segregación de funciones no es desconfianza hacia nadie en particular: es el reconocimiento de que ningún sistema debe depender de la honestidad de una sola persona.'}
  ]
 }
 ]
}
);
