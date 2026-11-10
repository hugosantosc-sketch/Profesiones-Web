/* Contenido del curso — m2
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
 id:'m2', nivel:'Básico · Intermedio', titulo:'El ciclo contable completo',
 resumen:'De la factura al estado financiero: diario, mayor, balance de comprobación, ajustes, cierre y presentación.',
 temas:[
 {
  id:'m2t1', titulo:'El Libro Diario y la estructura del asiento', min:15,
  cont:`El Libro Diario es el registro cronológico de todas las operaciones. "Cronológico" es la palabra clave: se anota en orden de fecha, sin saltos y sin espacios en blanco, de modo que cualquiera pueda reconstruir la historia económica de la empresa leyendo de arriba hacia abajo.

# Qué debe contener cada asiento
Según la Resolución de Superintendencia 234-2006/SUNAT, cada asiento del Libro Diario debe tener:

1. Número correlativo del asiento o código único de la operación.
2. Fecha de la operación.
3. Glosa o descripción, suficiente para entender qué ocurrió.
4. Referencia de la operación: tipo y número del comprobante, o del documento sustentatorio.
5. Cuenta contable del PCGE con su denominación, y el movimiento al debe o al haber.
6. Totales que cuadren.

> Una glosa como "varios" o "ajuste" no cumple la norma y, más importante, hace inútil el libro. Compara: "Ajuste" no dice nada; "Provisión de vacaciones devengadas del personal administrativo, noviembre 2026" permite revisar el cálculo tres años después sin preguntar a nadie.

# Tipos de asiento
|Tipo|Cuándo|Ejemplo|
|Apertura|Al iniciar el ejercicio o la empresa|Traslado de saldos del ejercicio anterior|
|De operación|Durante el ejercicio|Compras, ventas, pagos, planilla|
|De ajuste|Al cierre de cada mes o del ejercicio|Depreciación, devengos, estimaciones|
|De cierre|Al final del ejercicio|Cancelación de cuentas de resultado|
|De destino|Junto al asiento por naturaleza|Clase 9 contra cuenta 79|

# El libro simplificado y el obligatorio
La norma permite un **Libro Diario de Formato Simplificado** a los contribuyentes que están obligados a menos libros (por ejemplo, el Régimen MYPE Tributario con ingresos hasta 300 UIT). Tiene menos columnas, pero la lógica es la misma. No es un atajo para registrar peor: es un formato más compacto.

# Un mes completo de una MYPE, asiento por asiento
Distribuidora Andina S.A.C., Régimen MYPE Tributario, comercializa artículos de ferretería. Mes de abril de 2026.

@ 02/04 — Aporte de capital en efectivo, depositado en el BCP
@ 10|1041 Cuentas corrientes operativas|40,000.00|
@ 50|5011 Acciones - Capital||40,000.00

@ 05/04 — Compra de mercadería al crédito 30 días, F/ E001-1240 por S/ 23,600
@ 60|6011 Mercaderías|20,000.00|
@ 40|40111 IGV - Cuenta propia|3,600.00|
@ 42|4212 Emitidas - Facturas por pagar||23,600.00

@ 05/04 — Ingreso de la mercadería al almacén
@ 20|2011 Mercaderías - Costo|20,000.00|
@ 61|6111 Variación de mercaderías||20,000.00

@ 12/04 — Venta al contado, B/ B001-88 y F/ F001-12, total S/ 35,400
@ 10|1041 Cuentas corrientes operativas|35,400.00|
@ 40|40111 IGV - Cuenta propia||5,400.00
@ 70|7011 Mercaderías||30,000.00

@ 12/04 — Costo de la mercadería vendida (costo del inventario: S/ 18,000)
@ 69|6911 Mercaderías - Costo|18,000.00|
@ 20|2011 Mercaderías - Costo||18,000.00

@ 20/04 — Alquiler del local, F/ E001-55 por S/ 3,540
@ 63|6352 Alquiler de edificaciones|3,000.00|
@ 40|40111 IGV - Cuenta propia|540.00|
@ 42|4212 Emitidas - Facturas por pagar||3,540.00

@ 20/04 — Destino del gasto de alquiler (60% ventas, 40% administración)
@ 94|Gastos de administración|1,200.00|
@ 95|Gastos de ventas|1,800.00|
@ 79|Cargas imputables a costos y gastos||3,000.00

@ 30/04 — Planilla de abril: sueldos S/ 8,000, ONP 13%, EsSalud 9%
@ 62|6211 Sueldos|8,000.00|
@ 62|6271 Régimen de prestaciones de salud (EsSalud)|720.00|
@ 40|4032 ONP||1,040.00
@ 40|4031 EsSalud||720.00
@ 41|4111 Sueldos y salarios por pagar||6,960.00

Al final del mes, el Libro Diario de esta empresa tiene el rastro completo: cualquier saldo del balance puede rastrearse hasta el comprobante que lo originó. Eso es lo que un auditor llama **pista de auditoría**, y es lo que se pierde cuando se registra "a ojo" en una hoja de cálculo.

! El Libro Diario y el Mayor se llevan **electrónicamente** cuando el contribuyente está obligado al PLE o afiliado a él, con plazos de envío según cronograma de SUNAT. Un libro enviado fuera de plazo genera multa (infracción del numeral 5 del artículo 175 del Código Tributario), y un libro no llevado o llevado con atraso puede acarrear el desconocimiento de operaciones en una fiscalización.`,
  claves:['El Diario es cronológico y completo: sin saltos, sin espacios, con glosa útil.','Cada asiento necesita fecha, correlativo, glosa, referencia del comprobante y cuenta del PCGE con denominación.','Existe un Diario Simplificado para contribuyentes con menos obligaciones, con la misma lógica.','Compras y gastos llevan asiento por naturaleza más asiento de destino (clase 9 contra cuenta 79).','Diario y Mayor electrónicos tienen plazos de envío; el atraso es infracción sancionable.'],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas glosas cumple con lo que exige la norma para un asiento del Libro Diario?',
    o:['"Ajustes del mes"','"Varios - caja"','"Depreciación de abril 2026 del equipo de transporte, placa B3K-742, método línea recta 20% anual"','"Asiento 45"'],r:2,
    s:'La tercera. Identifica el concepto, el periodo, el bien afectado y el criterio de cálculo, de modo que la operación pueda revisarse sin preguntar a quien la registró. Las otras tres son glosas vacías: no permiten reconstruir la operación y, en una revisión de SUNAT o de un auditor, obligan a buscar el sustento desde cero.'},
   {l:1,t:'num',p:'En el asiento de planilla del ejemplo, ¿cuánto es el importe neto que recibe el trabajador (cuenta 4111) si el sueldo bruto es S/ 8,000 y el único descuento es ONP 13%?',
    u:'S/',r:6960,tol:1,
    s:'Descuento ONP = 8,000 × 13% = S/ 1,040\nNeto a pagar = 8,000 − 1,040 = **S/ 6,960**\n\nEl EsSalud de S/ 720 (9% de 8,000) **no** se descuenta al trabajador: es un aporte del empleador, por eso aparece como gasto en la cuenta 6271 y como pasivo en la 4031. Confundir aporte con descuento es uno de los errores más frecuentes en planillas pequeñas: hace que el trabajador reciba menos de lo que le corresponde y genera un pasivo laboral.'},
   {l:2,t:'ab',p:'Registra el asiento completo (naturaleza y destino) de la factura de telefonía del mes: F/ E001-9010 por S/ 826 incluido IGV, al crédito, íntegramente del área administrativa.',
    s:'Base = 826 ÷ 1.18 = S/ 700.00 · IGV = S/ 126.00\n\nAsiento por naturaleza:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6361 | Teléfono | 700.00 | |\n| 40111 | IGV - Cuenta propia | 126.00 | |\n| 4212 | Emitidas - Facturas por pagar | | 826.00 |\n\nAsiento de destino:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 94 | Gastos de administración | 700.00 | |\n| 79 | Cargas imputables a costos y gastos | | 700.00 |\n\nDetalle práctico: al pagar, si el importe de la obligación fuera igual o mayor a S/ 2,000 habría que bancarizar. Aquí son S/ 826, así que el pago en efectivo no haría perder el gasto, pero la buena práctica es pagar todo por banco para tener el rastro.'},
   {l:2,t:'num',p:'Con los asientos del ejemplo de Distribuidora Andina (abril 2026), ¿cuál es el saldo final de la cuenta 20 Mercaderías?',
    u:'S/',r:2000,tol:1,
    s:'Movimientos de la cuenta 20:\n\n- Debe (ingreso al almacén, 05/04): S/ 20,000\n- Haber (costo de la mercadería vendida, 12/04): S/ 18,000\n\nSaldo deudor = 20,000 − 18,000 = **S/ 2,000**\n\nEs decir, al 30 de abril quedan S/ 2,000 de mercadería al costo en el almacén. Ese saldo debe coincidir con el inventario físico; si al contar se encuentran solo S/ 1,700, la diferencia de S/ 300 es un faltante que hay que investigar y, de confirmarse, registrar como gasto (cuenta 659 o 68 según su origen), con la advertencia de que los faltantes no sustentados suelen ser reparados por SUNAT.'},
   {l:3,t:'ab',p:'Distribuidora Andina quiere saber su utilidad de abril con los datos de los asientos del tema. Calcula el resultado del mes y explica por qué la caja no coincide con esa utilidad.',
    s:'**Estado de Resultados de abril 2026**\n\n| Concepto | Importe |\n|---|---|\n| Ventas (7011) | 30,000.00 |\n| Costo de ventas (6911) | (18,000.00) |\n| **Utilidad bruta** | **12,000.00** |\n| Gastos de administración (alquiler 1,200 + planilla 8,720) | (9,920.00) |\n| Gastos de ventas (alquiler) | (1,800.00) |\n| **Utilidad operativa** | **280.00** |\n\nNota: la planilla total cargada al gasto es S/ 8,720 (sueldos 8,000 + EsSalud 720). En este ejemplo se asignó íntegra a administración; si hubiera vendedores, parte iría a la cuenta 95.\n\n**Movimiento de caja de abril:**\n\n| Concepto | Importe |\n|---|---|\n| Aporte de capital | +40,000.00 |\n| Cobranza de ventas al contado | +35,400.00 |\n| Compra de mercadería (al crédito, no pagada) | 0.00 |\n| Alquiler (al crédito, no pagado) | 0.00 |\n| Planilla (por pagar al 30/04) | 0.00 |\n| **Saldo en bancos** | **75,400.00** |\n\n**Por qué no coinciden:**\n\n1. El **aporte de capital de S/ 40,000** entró a caja pero no es ingreso: es patrimonio.\n2. Las **ventas incluyen IGV cobrado** de S/ 5,400 que no es ingreso de la empresa: es un pasivo con SUNAT.\n3. La **mercadería comprada** costó S/ 20,000 pero solo S/ 18,000 se llevaron al costo; S/ 2,000 siguen en el almacén como activo. Y además no se pagó: la deuda de S/ 23,600 sigue viva.\n4. El **alquiler y la planilla ya son gasto** (devengados) aunque no se hayan pagado; al pagarlos, la caja caerá S/ 11,540 sin que haya más gasto.\n\nConclusión: la empresa tiene S/ 75,400 en el banco y una utilidad de solo S/ 280. De esos S/ 75,400, debe S/ 23,600 a proveedores, S/ 6,960 a trabajadores, S/ 1,760 de aportes, S/ 3,540 de alquiler y alrededor de S/ 1,800 de IGV (5,400 de débito menos 4,140 de crédito fiscal). Confundir caja con utilidad es exactamente lo que lleva a un dueño a retirar dinero que no es suyo.'}
  ]
 },
 {
  id:'m2t2', titulo:'El Libro Mayor y la determinación de saldos', min:12,
  cont:`El Diario cuenta la historia en orden de tiempo; el Mayor la reorganiza **por cuenta**. Es la misma información vista desde otro ángulo: en lugar de "qué pasó el 12 de abril", responde "cómo se movió la cuenta 1041 durante todo abril".

# De diario a mayor
Cada cuenta del Mayor (tradicionalmente dibujada como una "T") recibe los importes del Diario: debe a la izquierda, haber a la derecha. Al final del periodo se suman ambos lados y se obtiene el **saldo**:

$ Saldo deudor  = Σ Debe − Σ Haber   (cuando el debe es mayor)
$ Saldo acreedor = Σ Haber − Σ Debe   (cuando el haber es mayor)

Ejemplo con la cuenta 1041 de Distribuidora Andina:

|Fecha|Detalle|Debe|Haber|
|02/04|Aporte de capital|40,000.00||
|12/04|Cobranza de ventas|35,400.00||
|Totales||75,400.00|0.00|
|Saldo deudor||75,400.00||

Y la cuenta 40111 IGV, que es la que más conviene vigilar:

|Fecha|Detalle|Debe|Haber|
|05/04|IGV compra de mercadería|3,600.00||
|12/04|IGV de ventas||5,400.00|
|20/04|IGV alquiler|540.00||
|Totales||4,140.00|5,400.00|
|Saldo acreedor||—|1,260.00|

Ese saldo acreedor de S/ 1,260 es exactamente el IGV que la empresa debe pagar por abril. El Mayor no es un trámite: es la herramienta que te dice cuánto pagar sin volver a mirar cada factura.

# Para qué sirve el Mayor en el trabajo real
- **Conciliación bancaria**: se compara el Mayor de la cuenta 1041 con el extracto del banco; las diferencias son cheques no cobrados, abonos no registrados o errores.
- **Antigüedad de cuentas por cobrar**: el Mayor de la 1212 por cliente muestra quién debe y desde cuándo.
- **Control de IGV**: el saldo de la 40111 debe coincidir con la casilla de la declaración mensual.
- **Detección de errores**: una cuenta de activo con saldo acreedor (salvo las de valuación 19, 29, 39) es casi siempre un error de registro.

> **Mayor auxiliar y mayor general.** El mayor general lleva la cuenta a nivel de divisionaria; los **auxiliares** abren el detalle por tercero: por cliente en la 12, por proveedor en la 42, por trabajador en la 41, por banco en la 10. La suma de los auxiliares debe cuadrar con el mayor general. Cuando no cuadra, el problema casi nunca está en la suma: está en un registro hecho sin identificar al tercero.

# El orden del trabajo mensual
1. Registrar los comprobantes en el Diario (hoy, en gran medida, importando desde el SIRE).
2. Mayorizar, lo que el sistema hace automáticamente.
3. Revisar saldos con lógica: ¿alguna cuenta de activo quedó acreedora? ¿la 101 Caja tiene saldo negativo? (imposible en la realidad: el efectivo no puede ser negativo, así que es un error).
4. Conciliar bancos, cuentas por cobrar y por pagar, e inventarios.
5. Recién entonces, declarar.

! Un saldo de **caja negativo** es una señal de alarma típica en MYPES: suele significar que se registraron pagos que en realidad salieron del bolsillo del dueño, o que falta registrar ingresos. SUNAT lo usa como indicio de ventas omitidas, porque si la caja "se fue a negativo" el dinero salió de algún lugar que no está en los libros.`,
  claves:['El Mayor reagrupa el Diario por cuenta y entrega el saldo de cada una.','Saldo deudor = debe − haber; saldo acreedor = haber − debe.','El saldo de la cuenta 40111 al cierre del mes es el IGV a pagar o el crédito a arrastrar.','Los mayores auxiliares (por cliente, proveedor, trabajador, banco) deben cuadrar con el mayor general.','Caja con saldo negativo o activos con saldo acreedor son errores o indicios de operaciones no registradas.'],
  ej:[
   {l:1,t:'num',p:'La cuenta 1212 Facturas por cobrar tiene cargos por S/ 86,400 y abonos por S/ 51,900. ¿Cuál es su saldo?',
    u:'S/',r:34500,tol:1,
    s:'Saldo deudor = 86,400 − 51,900 = **S/ 34,500**.\n\nEs deudor porque se trata de un activo: los cargos (ventas al crédito) superan los abonos (cobranzas). Ese importe es lo que los clientes todavía deben. El siguiente paso en el trabajo real es abrir el auxiliar por cliente y armar el reporte de antigüedad: lo que tiene más de 90 días vencido es candidato a estimación de cobranza dudosa (cuenta 684 contra 191).'},
   {l:1,t:'mc',p:'La cuenta 101 Caja muestra un saldo acreedor de S/ 2,300. ¿Qué significa?',
    o:['Que la empresa tiene S/ 2,300 disponibles','Que hay un error: el efectivo no puede ser negativo','Que debe S/ 2,300 al banco','Que hay un sobregiro autorizado'],r:1,
    s:'Es un error. Físicamente no se puede tener menos de cero soles en una caja. Las causas típicas: pagos registrados que en realidad los hizo el dueño con dinero propio (debería ir contra cuenta 44 o 14), ingresos no registrados, o una transferencia entre caja y banco registrada solo en un lado. Hay que encontrar la causa, no "arreglar" el saldo. Un sobregiro bancario sí existe, pero se registra en la cuenta 4511 y corresponde a la cuenta corriente, no a la caja.'},
   {l:2,t:'num',p:'En mayo, la cuenta 40111 tiene: IGV de compras S/ 9,870; IGV de ventas S/ 7,420; crédito fiscal arrastrado del mes anterior S/ 1,150. ¿Cuánto paga de IGV en mayo?',
    u:'S/',r:0,tol:0.5,
    s:'Débito fiscal (ventas): S/ 7,420\nCrédito fiscal del mes: S/ 9,870\nCrédito arrastrado: S/ 1,150\nCrédito total: 9,870 + 1,150 = S/ 11,020\n\nResultado = 7,420 − 11,020 = −3,600 → **no paga nada: S/ 0**.\n\nArrastra un **crédito fiscal de S/ 3,600** al mes siguiente (en la cuenta 40111 queda saldo deudor por ese importe). Esto es normal en meses de compra fuerte de inventario o de adquisición de activos fijos. Lo que no es normal es arrastrar crédito mes tras mes durante un año: eso indica compras desproporcionadas frente a las ventas, y SUNAT lo revisa.'},
   {l:2,t:'ab',p:'El Mayor de bancos muestra S/ 48,200 al 31 de mayo; el extracto del banco dice S/ 52,750. Investigando encuentras: un cheque girado el 29/05 por S/ 6,300 que el proveedor no ha cobrado; un abono del banco por intereses de S/ 150 no registrado; y una comisión bancaria de S/ 100 no registrada. Explica la conciliación.',
    s:'**Conciliación bancaria al 31/05**\n\nPartimos del saldo del banco y lo llevamos al saldo contable:\n\n| Concepto | Importe |\n|---|---|\n| Saldo según extracto bancario | 52,750.00 |\n| (−) Cheque girado y no cobrado | (6,300.00) |\n| **Saldo bancario ajustado** | **46,450.00** |\n\n| Concepto | Importe |\n|---|---|\n| Saldo según libros | 48,200.00 |\n| (+) Intereses abonados no registrados | 150.00 |\n| (−) Comisión bancaria no registrada | (100.00) |\n| Error pendiente por identificar | (1,800.00) |\n| **Saldo contable ajustado** | **46,450.00** |\n\nCon los tres hallazgos, el saldo contable ajustado sería 48,200 + 150 − 100 = S/ 48,250, que todavía difiere en **S/ 1,800** del saldo bancario ajustado de S/ 46,450. Conclusión profesional: la conciliación **no está terminada**; falta una partida de S/ 1,800, típicamente un pago o cargo del banco no registrado (un pago de tributos, una cuota de préstamo, un cargo por ITF). Una conciliación que no llega a cero no se cierra: se sigue investigando.\n\n**Asientos que sí corresponden registrar:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 1041 | Cuentas corrientes operativas | 150.00 | |\n| 772 | Rendimientos ganados - Depósitos | | 150.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6392 | Gastos bancarios | 100.00 | |\n| 1041 | Cuentas corrientes operativas | | 100.00 |\n\nEl cheque no cobrado **no se ajusta**: contablemente el pago ya ocurrió cuando se giró y entregó el cheque; la diferencia es solo de tiempo.'},
   {l:3,t:'ab',p:'Al revisar el Mayor de una empresa encuentras: cuenta 39 Depreciación acumulada con saldo deudor de S/ 4,500; cuenta 4212 Facturas por pagar con saldo deudor de S/ 2,800; cuenta 1212 con saldo que no coincide con la suma de sus auxiliares por S/ 7,000. Diagnostica cada caso y di qué harías.',
    s:'**1. Cuenta 39 con saldo deudor (S/ 4,500).** Imposible: es una cuenta de valuación con saldo acreedor por naturaleza. Causas probables: (a) se registró la depreciación invertida (abonando a la 68 y cargando a la 39); (b) se dio de baja un activo cargando la 39 por un importe mayor al depreciado realmente; (c) se usó la 39 como contrapartida de un ajuste que correspondía a otra cuenta. **Qué hacer:** reconstruir el cuadro de depreciación por activo (costo, fecha de alta, tasa, depreciación acumulada) y compararlo con el Mayor. El cuadro de activos fijos es la fuente de verdad; el Mayor debe ajustarse a él.\n\n**2. Cuenta 4212 con saldo deudor (S/ 2,800).** Significa que se pagó más de lo que se debía, o que un pago se registró sin su factura. Causas típicas: anticipo a proveedor registrado en la 42 en lugar de la 422 o la 182 (anticipos otorgados); doble registro de un pago; nota de crédito recibida y registrada dos veces. **Qué hacer:** abrir el auxiliar por proveedor, identificar cuál tiene saldo deudor y revisar sus documentos. Si es un anticipo, reclasificarlo al activo, porque presentarlo como pasivo negativo distorsiona el balance.\n\n**3. Diferencia de S/ 7,000 entre el Mayor de la 1212 y sus auxiliares.** El mayor general y la suma de auxiliares deben ser idénticos. La causa casi siempre es un registro hecho sin asignar el tercero (quedó en el general pero en ningún auxiliar), o un asiento manual de ajuste cargado directo a la cuenta sin detalle. **Qué hacer:** listar los movimientos de la cuenta sin código de cliente asignado; serán S/ 7,000. Luego identificar a qué cliente pertenecen y corregir. Esta diferencia es grave porque hace inválido el reporte de cobranzas: el área de créditos estaría trabajando con información incompleta, y además la estimación de cobranza dudosa quedaría mal calculada.\n\n**Orden de atención:** primero el caso 3 (afecta la gestión diaria y la cobranza), luego el 1 (afecta la utilidad, porque la depreciación mal registrada distorsiona el resultado y el valor del activo) y por último el 2 (es un error de clasificación con efecto en presentación).'}
  ]
 },
 {
  id:'m2t3', titulo:'Balance de comprobación y hoja de trabajo', min:13,
  cont:`El balance de comprobación es la lista de todas las cuentas con sus sumas del debe y del haber y sus saldos. Su primera función es aritmética: comprobar que el total del debe iguala al total del haber. Su segunda función, la importante, es servir de base para armar los estados financieros.

# Estructura de cuatro pares de columnas
|Cuenta|Sumas Debe|Sumas Haber|Saldo Deudor|Saldo Acreedor|
|101 Caja|12,000|8,500|3,500|—|
|1212 Fact. por cobrar|40,000|25,000|15,000|—|
|20 Mercaderías|30,000|22,000|8,000|—|
|33 Inmuebles, maq. y equipo|60,000|—|60,000|—|
|39 Depreciación acumulada|—|9,000|—|9,000|
|4212 Facturas por pagar|18,000|34,000|—|16,000|
|50 Capital|—|40,000|—|40,000|
|59 Resultados acumulados|—|5,000|—|5,000|
|70 Ventas|—|85,000|—|85,000|
|69 Costo de ventas|52,000|—|52,000|—|
|62 Gastos de personal|14,500|—|14,500|—|
|63 Servicios de terceros|6,000|—|6,000|—|
|**Totales**|**232,500**|**228,500**|**159,000**|**155,000**|

Mira los totales: las sumas no cuadran (232,500 vs 228,500) y los saldos tampoco (159,000 vs 155,000), con la misma diferencia de S/ 4,000. **Eso es un error de registro**, y el balance de comprobación acaba de delatarlo antes de que llegue a los estados financieros.

# Cómo se busca un descuadre
Técnicas en orden de rapidez:
1. **Diferencia divisible entre 9** (por ejemplo 540, 180, 90): suele ser una **transposición** de dígitos, como anotar 1,800 en vez de 8,100.
2. **Diferencia divisible entre 2**: suele ser un importe registrado en el lado equivocado. Si la diferencia es S/ 4,000, busca un movimiento de S/ 2,000 que esté al revés.
3. Revisar los asientos del periodo con un solo movimiento (asientos "cojos").
4. Comparar el total del Diario con el total del Mayor por cuenta.

> **Qué NO comprueba el balance de comprobación.** Cuadra aunque los asientos estén conceptualmente mal. Si registras el alquiler en la cuenta 60 Compras en lugar de la 63, el balance cuadra perfecto y el estado financiero está mal. Cuadrar es necesario, no suficiente.

# La hoja de trabajo
Es el papel de trabajo (hoy una hoja de cálculo o un reporte del sistema) donde se parte del balance de comprobación, se añaden los ajustes y se obtienen las cifras finales:

|Columna|Contenido|
|1-2|Saldos según libros (balance de comprobación)|
|3-4|Ajustes del periodo (depreciación, devengos, estimaciones)|
|5-6|Saldos ajustados|
|7-8|Clasificación: Estado de Resultados|
|9-10|Clasificación: Estado de Situación Financiera|

La utilidad aparece como la diferencia entre las columnas del Estado de Resultados y se traslada al Estado de Situación Financiera para que cuadre. Esa es la razón por la que el balance "cierra": la utilidad es el eslabón entre los dos estados.

$ Utilidad = Σ Ingresos (clase 7) − Σ Gastos (clases 6 y 69)
$ Activo = Pasivo + Patrimonio inicial + Utilidad del ejercicio

! En los sistemas contables actuales el balance de comprobación casi nunca descuadra, porque el software no permite grabar asientos desbalanceados. El riesgo se desplazó: ahora el error típico no es aritmético sino de **clasificación** (cuenta equivocada) o de **periodo** (gasto registrado en el mes que no corresponde). Por eso la revisión mensual ya no consiste en sumar, sino en mirar cada saldo y preguntarse si tiene sentido.`,
  claves:['El balance de comprobación valida que debe = haber y sirve de base para los estados financieros.','Diferencia divisible entre 9 sugiere transposición de dígitos; divisible entre 2, un importe del lado equivocado.','Que cuadre no garantiza que esté bien: la clasificación errónea cuadra igual.','La hoja de trabajo va de saldos según libros a ajustes, saldos ajustados y clasificación en los dos estados.','Con software el riesgo ya no es aritmético sino de cuenta y de periodo.'],
  ej:[
   {l:1,t:'num',p:'Un balance de comprobación tiene saldos deudores por S/ 412,000 y acreedores por S/ 409,300. ¿De cuánto es el descuadre?',
    u:'S/',r:2700,tol:0,
    s:'Descuadre = 412,000 − 409,300 = **S/ 2,700**.\n\nPista de diagnóstico: 2,700 ÷ 9 = 300 exacto, lo que apunta a una **transposición de dígitos**. Busca importes como 3,000 registrado como 300, o 2,997 como 297, o 5,400 como 2,700 invertido. También 2,700 ÷ 2 = 1,350, así que la otra hipótesis es un movimiento de S/ 1,350 registrado en el lado equivocado. Se revisan ambas antes de buscar asiento por asiento.'},
   {l:1,t:'mc',p:'El balance de comprobación de una empresa cuadra perfectamente, pero el alquiler del local se registró en la cuenta 60 Compras. ¿Qué ocurre?',
    o:['Nada, si cuadra está correcto','El balance cuadra pero el Estado de Resultados queda mal clasificado y el inventario puede distorsionarse','El sistema lo corrige automáticamente','Solo afecta al IGV'],r:1,
    s:'El balance cuadra porque el importe está en el debe igual que si estuviera en la 63, pero la información queda mal. La cuenta 60 se destina luego a existencias vía cuenta 61, por lo que un alquiler registrado ahí puede terminar sumado al costo del inventario, inflando el activo y alterando el costo de ventas. Además el análisis de gastos por naturaleza queda falseado. Cuadrar es un control aritmético, no un control de calidad contable.'},
   {l:2,t:'num',p:'Con el balance del ejemplo (ventas 85,000; costo de ventas 52,000; gastos de personal 14,500; servicios de terceros 6,000), ¿cuál es la utilidad antes de impuestos?',
    u:'S/',r:12500,tol:1,
    s:'Ventas: 85,000\nCosto de ventas: (52,000) → utilidad bruta 33,000\nGastos de personal: (14,500)\nServicios de terceros: (6,000)\n**Utilidad antes de impuestos = 85,000 − 52,000 − 14,500 − 6,000 = S/ 12,500**\n\nMargen bruto = 33,000 ÷ 85,000 = 38.8%; margen neto antes de impuestos = 12,500 ÷ 85,000 = 14.7%. Antes de darla por buena, hay que verificar que ya estén registrados los ajustes del periodo: depreciación, vacaciones devengadas, estimación de cobranza dudosa y servicios consumidos no facturados. Sin esos ajustes, la utilidad siempre sale mejor de lo real.'},
   {l:2,t:'ab',p:'El balance de comprobación arroja una diferencia de S/ 540. Explica las dos hipótesis más probables y cómo verificarías cada una en diez minutos.',
    s:'**Hipótesis 1 — Transposición de dígitos.** 540 ÷ 9 = 60 exacto, señal clásica. Un número se registró con dígitos intercambiados: 1,980 por 1,440, 720 por 180, 2,340 por 1,800. **Verificación rápida:** filtrar en el Diario del periodo todos los importes cuyos dígitos sumen igual que el importe esperado, o más práctico, revisar los asientos cuyo importe termine en los mismos dos dígitos. En un sistema, exportar el Diario a Excel y buscar pares de números con los mismos dígitos en orden distinto.\n\n**Hipótesis 2 — Importe en el lado equivocado.** 540 ÷ 2 = 270. Un movimiento de S/ 270 que debía ir al debe se registró al haber (o viceversa) genera exactamente el doble de diferencia. **Verificación rápida:** buscar en el Diario del periodo todos los movimientos de S/ 270 y revisar si el lado es el correcto según la naturaleza de la cuenta.\n\n**Tercera posibilidad a descartar:** un asiento con un solo movimiento (si el sistema lo permitió, por ejemplo un asiento importado de otro módulo). Se detecta filtrando asientos cuya suma del debe no iguale la del haber a nivel de asiento, no de periodo.\n\n**Lo que no se debe hacer nunca:** crear una cuenta "diferencias por regularizar" y cargar ahí los S/ 540 para que cuadre. Es una práctica que aparece en libros reales y que un auditor marca de inmediato: oculta el error sin resolverlo, y si el importe crece con el tiempo acaba siendo imposible de depurar.'},
   {l:3,t:'ab',p:'Con el balance de comprobación del tema (que tiene un descuadre de S/ 4,000), asume que el error fue registrar una cobranza de S/ 2,000 cargando dos veces la cuenta 101 Caja en lugar de cargar caja y abonar la cuenta por cobrar. Corrige y presenta el balance cuadrado con la utilidad del ejercicio.',
    s:'**El error:** se registró "Debe 101 Caja 2,000 / Debe 101 Caja 2,000" en lugar de "Debe 101 Caja 2,000 / Haber 1212 Facturas por cobrar 2,000". Efecto: la caja quedó sobrevaluada en S/ 2,000, las cuentas por cobrar sobrevaluadas en S/ 2,000 y el debe total excedió al haber en S/ 4,000.\n\n**Asiento de corrección:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 1212 | Facturas por cobrar | | 2,000.00 |\n| 101 | Caja | | 2,000.00 |\n\n(Es un asiento solo de haber por S/ 4,000 en total porque corrige un asiento que solo tenía debe; en la práctica se hace una extorno completo del asiento erróneo y luego el asiento correcto, que es más limpio y deja mejor rastro.)\n\n**Balance de comprobación corregido:**\n\n| Cuenta | Saldo Deudor | Saldo Acreedor |\n|---|---|---|\n| 101 Caja | 1,500 | |\n| 1212 Facturas por cobrar | 13,000 | |\n| 20 Mercaderías | 8,000 | |\n| 33 Inmuebles, maquinaria y equipo | 60,000 | |\n| 39 Depreciación acumulada | | 9,000 |\n| 4212 Facturas por pagar | | 16,000 |\n| 50 Capital | | 40,000 |\n| 59 Resultados acumulados | | 5,000 |\n| 70 Ventas | | 85,000 |\n| 69 Costo de ventas | 52,000 | |\n| 62 Gastos de personal | 14,500 | |\n| 63 Servicios de terceros | 6,000 | |\n| **Totales** | **155,000** | **155,000** |\n\n**Resultado del ejercicio:** Ventas 85,000 − (52,000 + 14,500 + 6,000) = **utilidad de S/ 12,500**.\n\n**Comprobación por la ecuación contable:**\nActivo = 1,500 + 13,000 + 8,000 + 60,000 − 9,000 = S/ 73,500\nPasivo = S/ 16,000\nPatrimonio = 40,000 + 5,000 + 12,500 = S/ 57,500\n16,000 + 57,500 = **S/ 73,500** ✓\n\nLa ecuación cierra, y el eslabón que la hace cerrar es justamente la utilidad de S/ 12,500.'}
  ]
 },
 {
  id:'m2t4', titulo:'Ajustes contables: devengo, depreciación y estimaciones', min:17,
  cont:`Los ajustes son los asientos que hacen que los estados financieros digan la verdad. Sin ellos, los libros muestran solo lo que pasó por caja y por factura, y se omite todo lo que ocurrió económicamente sin documento.

# El principio detrás de todo: el devengo
Los efectos de las transacciones se reconocen **cuando ocurren**, no cuando se cobra o se paga. Un gasto de diciembre es gasto de diciembre aunque la factura llegue en enero y se pague en febrero.

> Esta es la diferencia de fondo entre contabilidad y "control de caja". Un cuaderno de caja es útil para la liquidez; no sirve para medir resultados ni para presentar estados financieros, y tampoco para determinar el Impuesto a la Renta de tercera categoría, que también se rige por el devengo (artículo 57 de la LIR, con la definición incorporada por el D.L. 1425).

# Los seis ajustes que aparecen siempre
## 1. Depreciación
Distribuye el costo de un activo fijo a lo largo de su vida útil. La NIC 16 manda usar la vida útil real; la norma tributaria fija porcentajes máximos aceptados:

|Bien|Tasa tributaria máxima|Observación|
|Edificios y construcciones|5% anual|Línea recta obligatoria, 20 años|
|Maquinaria y equipo|10% anual|Actividades diversas|
|Vehículos de transporte terrestre|20% anual|Excepto ferrocarriles|
|Equipos de procesamiento de datos|25% anual|Computadoras, servidores|
|Muebles y enseres|10% anual||
|Ganado de trabajo y reproducción|25% anual||

$ Depreciación lineal anual = (Costo − Valor residual) ÷ Vida útil
$ Depreciación mensual = Depreciación anual ÷ 12

@ 31/12/2026 — Depreciación anual de maquinaria: costo S/ 120,000, 10 años
@ 68|6814 Depreciación de maquinaria y equipo|12,000.00|
@ 39|39132 Maquinaria y equipo de explotación||12,000.00

## 2. Gastos devengados no facturados
El consumo de luz de diciembre cuya factura llega en enero ya es gasto de diciembre. Se provisiona:

@ 31/12 — Provisión de servicios públicos de diciembre pendientes de facturar
@ 63|6364 Energía eléctrica|1,800.00|
@ 46|4699 Otras cuentas por pagar diversas||1,800.00

## 3. Ingresos y gastos pagados o cobrados por adelantado
Un seguro anual pagado en julio por S/ 12,000 corresponde a seis meses de este año y seis del siguiente. Al cierre, S/ 6,000 son gasto y S/ 6,000 quedan como activo (cuenta 18 Servicios y otros contratados por anticipado).

## 4. Estimación de cuentas de cobranza dudosa
Cuando hay evidencia de que un cliente no pagará, se reconoce el deterioro sin dar de baja el derecho:

@ 31/12 — Estimación de cobranza dudosa, cliente con mora mayor a 12 meses
@ 68|6841 Estimación de cuentas de cobranza dudosa|9,000.00|
@ 19|1911 Facturas por cobrar - Terceros||9,000.00

! Para que esta estimación sea **deducible** tributariamente, el artículo 37 de la LIR y su reglamento exigen demostrar la dificultad financiera del deudor (análisis documentado, protesto, gestiones de cobro acreditadas o más de 12 meses de mora), que la provisión sea discriminada en el Libro de Inventarios y Balances y que figure al cierre del ejercicio. Una provisión "global" por un porcentaje de la cartera, sin análisis caso por caso, es reparable.

## 5. Desvalorización de existencias
La NIC 2 obliga a medir el inventario al menor valor entre costo y **valor neto realizable**. Si el inventario quedó obsoleto o su precio de venta cayó por debajo del costo, se reconoce la pérdida (cuenta 695 contra 29).

## 6. Provisión de beneficios sociales devengados
Vacaciones, gratificaciones y CTS ganadas pero no pagadas al cierre son pasivo y gasto del periodo. Es el ajuste que más se olvida en MYPES y el que más distorsiona la utilidad.

@ 31/12 — Provisión de vacaciones devengadas no gozadas
@ 62|6214 Vacaciones|14,000.00|
@ 41|4151 Vacaciones por pagar||14,000.00

# Un caso completo de cierre
Comercial Huáscar E.I.R.L. tiene al 31/12/2026, antes de ajustes, una utilidad de S/ 85,000. Pendientes:
- Depreciación del año no registrada: equipo de cómputo S/ 16,000 al 25% → S/ 4,000.
- Luz y agua de diciembre sin facturar: S/ 1,500.
- Seguro pagado en octubre por 12 meses: S/ 6,000, de los que corresponden al año 3 meses.
- Vacaciones devengadas: S/ 7,200.
- Un cliente en mora de 14 meses por S/ 5,000, con gestiones de cobro documentadas.

|Concepto|Importe|
|Utilidad antes de ajustes|85,000|
|Depreciación equipo de cómputo|(4,000)|
|Servicios públicos devengados|(1,500)|
|Seguro consumido (6,000 × 3/12)|(1,500)|
|Vacaciones devengadas|(7,200)|
|Estimación de cobranza dudosa|(5,000)|
|**Utilidad después de ajustes**|**65,800**|

La utilidad cayó S/ 19,200, un 23%. Si el dueño hubiera repartido utilidades sobre los S/ 85,000, habría repartido dinero que no existía.`,
  claves:['Devengo: el hecho se reconoce cuando ocurre, no cuando se cobra o se paga.','Las tasas tributarias de depreciación son máximos; la NIC 16 exige usar la vida útil real y conciliar la diferencia.','Gastos devengados no facturados y servicios pagados por anticipado son ajustes obligatorios de cierre.','La estimación de cobranza dudosa requiere análisis caso por caso y discriminación en el Libro de Inventarios y Balances para ser deducible.','Vacaciones, gratificaciones y CTS devengadas al cierre son pasivo y gasto del periodo, aunque se paguen después.'],
  ej:[
   {l:1,t:'num',p:'Una computadora cuesta S/ 4,800 y se deprecia al 25% anual. ¿Cuánto es la depreciación mensual?',
    u:'S/',r:100,tol:0.5,
    s:'Depreciación anual = 4,800 × 25% = S/ 1,200\nDepreciación mensual = 1,200 ÷ 12 = **S/ 100**\n\nEl asiento mensual sería: debe 68143 (o 6814 según la divisionaria del equipo) por S/ 100, haber 39133 Equipos diversos por S/ 100. Y se registra desde el mes en que el bien **empieza a ser usado**, no desde la compra: la norma tributaria exige que el bien esté afectado a la generación de renta.'},
   {l:1,t:'mc',p:'La factura de teléfono de diciembre llega el 8 de enero. ¿En qué periodo se reconoce el gasto?',
    o:['En enero, cuando llega la factura','En diciembre, porque el servicio se consumió en diciembre','Cuando se paga','Se puede elegir cualquiera de los dos'],r:1,
    s:'En diciembre, por devengo: el servicio se consumió en ese mes. Al cierre se provisiona contra la cuenta 46 Cuentas por pagar diversas, y en enero, cuando llega la factura, se extorna la provisión y se registra el comprobante con su IGV. Ojo con el IGV: el crédito fiscal solo puede usarse cuando se tiene el comprobante, así que el gasto es de diciembre pero el crédito fiscal es de enero. Son dos reglas distintas que conviven.'},
   {l:2,t:'num',p:'Una empresa paga el 1 de setiembre de 2026 una póliza de seguro de un año por S/ 18,000. ¿Qué importe queda como activo (cuenta 18) al 31/12/2026?',
    u:'S/',r:12000,tol:1,
    s:'La póliza cubre del 01/09/2026 al 31/08/2027: 12 meses.\nConsumido en 2026: setiembre a diciembre = 4 meses → 18,000 × 4/12 = S/ 6,000 de gasto.\nPendiente de consumo al 31/12/2026 = 18,000 − 6,000 = **S/ 12,000**, que permanece en la cuenta 18 Servicios y otros contratados por anticipado (activo).\n\nAsiento de ajuste al cierre:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6513 | Seguros | 6,000.00 | |\n| 18 | Servicios contratados por anticipado | | 6,000.00 |\n\nSi no se hiciera el ajuste y se hubiera cargado todo a gasto en setiembre, la utilidad de 2026 estaría subvaluada en S/ 12,000 y la de 2027 sobrevaluada en el mismo monto.'},
   {l:2,t:'ab',p:'Un camión costó S/ 180,000, se compró el 15/03/2026 y se estima una vida útil real de 8 años con valor residual de S/ 20,000. Calcula la depreciación contable de 2026 y compárala con el máximo tributario.',
    s:'**Depreciación contable (NIC 16):**\nBase depreciable = 180,000 − 20,000 = S/ 160,000\nDepreciación anual = 160,000 ÷ 8 = S/ 20,000\nDepreciación mensual = S/ 1,666.67\nMeses de uso en 2026 (desde marzo, mes en que empieza a usarse) = 10\n**Depreciación contable 2026 = 1,666.67 × 10 = S/ 16,666.67**\n\n**Máximo tributario:**\nLa tasa máxima para vehículos de transporte terrestre es 20% anual sobre el costo, sin deducir valor residual.\nDepreciación tributaria anual = 180,000 × 20% = S/ 36,000 → mensual S/ 3,000\nMáximo aceptado en 2026 por 10 meses = **S/ 30,000**\n\n**Comparación:** la empresa deprecia S/ 16,666.67 y el tope tributario es S/ 30,000. Como la depreciación contable es **menor** que el máximo, es íntegramente deducible: no hay adición. Pero aparece un efecto en el tiempo: la depreciación tributaria solo se acepta en la medida en que esté **contabilizada**, así que la empresa no puede deducir los S/ 30,000, solo los S/ 16,666.67 que registró. Deprecia más lento, y por eso deducirá durante más años. Esto genera una **diferencia temporal** que se gestiona con la NIC 12 (Módulo 6) y aparece en la conciliación tributaria (Módulo 7).\n\nSi fuera al revés (depreciación contable de 8 años acelerada, por ejemplo S/ 40,000 anuales frente a un tope de S/ 36,000), el exceso de S/ 4,000 sería una **adición** en la declaración anual, deducible en ejercicios posteriores.'},
   {l:3,t:'ab',p:'Una empresa presenta utilidad de S/ 240,000 antes de ajustes al 31/12/2026. Faltan: depreciación de edificio (costo S/ 900,000, en uso todo el año, tasa 5%); vacaciones devengadas S/ 32,000; gratificación de diciembre devengada y no pagada S/ 18,000 más su bonificación extraordinaria del 9%; alquiler de enero 2027 pagado en diciembre S/ 7,000; y un inventario con costo S/ 40,000 cuyo valor neto realizable es S/ 31,000. Determina la utilidad ajustada y haz los asientos.',
    s:'**Ajuste 1 — Depreciación del edificio:** 900,000 × 5% = **S/ 45,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6813 | Depreciación de edificaciones | 45,000.00 | |\n| 3912 | Edificaciones - Costo | | 45,000.00 |\n\n**Ajuste 2 — Vacaciones devengadas: S/ 32,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6214 | Vacaciones | 32,000.00 | |\n| 4151 | Vacaciones por pagar | | 32,000.00 |\n\n**Ajuste 3 — Gratificación devengada más bonificación extraordinaria:** la bonificación del 9% equivale al aporte de EsSalud que el empleador no paga sobre las gratificaciones y que se entrega al trabajador. 18,000 × 9% = S/ 1,620. Total **S/ 19,620**.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6213 | Gratificaciones | 18,000.00 | |\n| 6291 | Bonificación extraordinaria Ley 30334 | 1,620.00 | |\n| 4114 | Gratificaciones por pagar | | 19,620.00 |\n\n**Ajuste 4 — Alquiler de enero 2027 pagado en diciembre:** no es gasto de 2026. Si se cargó a gasto, hay que reclasificarlo al activo; el efecto sobre la utilidad es **+S/ 7,000**.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 18 | Servicios contratados por anticipado | 7,000.00 | |\n| 6352 | Alquiler de edificaciones | | 7,000.00 |\n\n**Ajuste 5 — Desvalorización de existencias (NIC 2):** 40,000 − 31,000 = **S/ 9,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6951 | Desvalorización de mercaderías | 9,000.00 | |\n| 2911 | Mercaderías - Desvalorización | | 9,000.00 |\n\n**Utilidad ajustada:**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad antes de ajustes | 240,000 |\n| Depreciación de edificio | (45,000) |\n| Vacaciones devengadas | (32,000) |\n| Gratificación y bonificación | (19,620) |\n| Alquiler de 2027 reclasificado | 7,000 |\n| Desvalorización de inventario | (9,000) |\n| **Utilidad ajustada** | **141,380** |\n\n**Lectura del caso:** la utilidad cayó 41%. Dos observaciones tributarias importantes: (1) la **desvalorización de existencias** no es deducible hasta que se acredite la destrucción ante notario con comunicación previa a SUNAT, así que los S/ 9,000 serán probablemente una adición en la declaración anual; (2) las **vacaciones** son deducibles en el ejercicio en que se devengan solo si se pagan dentro del plazo para presentar la declaración anual; si no, se deducen cuando se paguen. Ninguna de las dos cosas cambia el registro contable, que debe reflejar la realidad económica, pero ambas aparecen en la conciliación.'}
  ]
 },
 {
  id:'m2t5', titulo:'Cierre del ejercicio y asientos de cierre', min:13,
  cont:`El cierre convierte el flujo del año en una foto. Las cuentas de resultado (clases 6, 7 y 9) se cancelan porque pertenecen a un periodo que terminó; las cuentas de balance (clases 1 a 5) se mantienen y pasan al ejercicio siguiente.

# La secuencia completa del cierre
1. Verificar que todos los comprobantes del ejercicio estén registrados.
2. Conciliar bancos, cuentas por cobrar, cuentas por pagar y tributos.
3. Realizar el **inventario físico** y ajustar diferencias con los libros.
4. Registrar los ajustes de cierre (tema anterior).
5. Determinar el **costo de ventas** definitivo.
6. Cancelar la clase 9 contra la cuenta 79.
7. Cancelar ingresos y gastos para determinar el resultado.
8. Calcular la **participación de los trabajadores** y el **Impuesto a la Renta**.
9. Trasladar el resultado a la cuenta 59 Resultados acumulados.
10. Formular los estados financieros y legalizar los libros que corresponda.

# Los asientos, en orden
@ 31/12 — Cancelación de la clase 9 contra la cuenta 79
@ 79|Cargas imputables a cuentas de costos y gastos|260,000.00|
@ 94|Gastos de administración||95,000.00
@ 95|Gastos de ventas||80,000.00
@ 92|Costos de producción||85,000.00

@ 31/12 — Cancelación de ingresos y gastos para determinar el resultado
@ 70|Ventas|620,000.00|
@ 69|Costo de ventas||390,000.00
@ 60|Compras||0.00
@ 62|Gastos de personal||120,000.00
@ 63|Gastos de servicios de terceros||48,000.00
@ 68|Valuación y deterioro||22,000.00
@ 89|Determinación del resultado del ejercicio||40,000.00

@ 31/12 — Participación de los trabajadores en las utilidades (si corresponde)
@ 62|6291 Participación de los trabajadores|4,000.00|
@ 41|4131 Participaciones por pagar||4,000.00

@ 31/12 — Impuesto a la Renta del ejercicio
@ 88|8811 Impuesto a la Renta corriente|10,620.00|
@ 40|40171 Renta de tercera categoría||10,620.00

@ 31/12 — Traslado del resultado neto a resultados acumulados
@ 89|Determinación del resultado del ejercicio|25,380.00|
@ 59|5911 Utilidades acumuladas||25,380.00

> La cuenta **89 Determinación del resultado del ejercicio** funciona como una cuenta puente: recibe ingresos y gastos, y su saldo es la utilidad (acreedor) o la pérdida (deudor) antes de participaciones e impuesto. Luego se le descuentan la participación y el impuesto, y lo que queda se traslada a la 59.

# Participación de los trabajadores
El D.L. 892 obliga a las empresas generadoras de renta de tercera categoría **con más de 20 trabajadores** a repartir un porcentaje de la renta anual antes de impuestos:

|Actividad|Porcentaje|
|Empresas pesqueras, de telecomunicaciones e industriales|10%|
|Empresas mineras, de comercio al por mayor y menor y restaurantes|8%|
|Empresas que realizan otras actividades|5%|

$ Participación = (Renta neta antes de participaciones) × %
$ El 50% se distribuye en función de los días laborados y el 50% en proporción a las remuneraciones

! Las empresas con 20 trabajadores o menos **no reparten utilidades**. Es un error frecuente provisionar participaciones en una MYPE de 8 trabajadores: se reduce la utilidad sin obligación legal y el gasto es reparable.

# Reserva legal y destino de la utilidad
Una vez determinada la utilidad neta, la junta decide su destino. Antes de cualquier reparto corresponde la **reserva legal**: 10% de la utilidad distribuible, hasta que la reserva alcance el 20% del capital pagado (art. 229 LGS).

Ejemplo: utilidad neta S/ 25,380, capital S/ 100,000, reserva actual S/ 3,000.
- Tope de la reserva: 20% de 100,000 = S/ 20,000. Falta S/ 17,000.
- Detracción del ejercicio: 10% de 25,380 = **S/ 2,538**.

@ Acuerdo de junta — Constitución de reserva legal
@ 59|5911 Utilidades acumuladas|2,538.00|
@ 58|5821 Reserva legal||2,538.00

# Libros que se cierran y se legalizan
El **Libro de Inventarios y Balances** recoge el detalle de los saldos al cierre: la relación de cuentas por cobrar, el detalle del activo fijo, la composición del inventario, la discriminación de las provisiones. No es un formalismo: varias deducciones tributarias (cobranza dudosa, por ejemplo) exigen que el detalle esté ahí. Los libros físicos se legalizan ante notario antes de usarse; los electrónicos se generan y envían por el PLE o el SIRE según el cronograma.`,
  claves:['Las cuentas de resultado se cancelan al cierre; las de balance pasan al ejercicio siguiente.','La cuenta 89 es la cuenta puente donde se determina el resultado del ejercicio.','La participación de los trabajadores solo aplica a empresas con más de 20 trabajadores, con tasas de 5%, 8% o 10% según actividad.','La reserva legal es 10% de la utilidad distribuible hasta alcanzar el 20% del capital pagado.','El Libro de Inventarios y Balances sustenta deducciones como la cobranza dudosa: su detalle es condición, no trámite.'],
  ej:[
   {l:1,t:'mc',p:'Al cerrar el ejercicio, ¿qué pasa con la cuenta 70 Ventas?',
    o:['Mantiene su saldo para el año siguiente','Se cancela contra la cuenta 89 y queda en cero','Se traslada al activo','Se convierte en capital'],r:1,
    s:'Se cancela. Las cuentas de ingreso corresponden a un periodo cerrado y deben empezar el ejercicio siguiente en cero, para que las ventas del año nuevo sean comparables. Se debita la 70 y se abona la 89. Las cuentas de balance (activo, pasivo, patrimonio) sí conservan su saldo: la mercadería que quedó en el almacén el 31 de diciembre sigue ahí el 1 de enero.'},
   {l:1,t:'mc',p:'Una empresa comercial tiene 14 trabajadores y una renta neta de S/ 300,000. ¿Cuánto provisiona por participación de los trabajadores?',
    o:['S/ 24,000 (8%)','S/ 15,000 (5%)','S/ 30,000 (10%)','Nada: la obligación aplica a empresas con más de 20 trabajadores'],r:3,
    s:'Nada. El D.L. 892 obliga solo a las empresas con más de 20 trabajadores. Con 14 trabajadores no hay obligación legal de repartir utilidades. Si la empresa provisionara el 8% de todas formas, estaría reduciendo su utilidad contable sin obligación y el gasto sería reparado por SUNAT en una fiscalización, con el impuesto, la multa y los intereses correspondientes. Cosa distinta es un bono voluntario por desempeño, que sí es deducible si cumple el criterio de generalidad y se paga oportunamente.'},
   {l:2,t:'num',p:'Una empresa industrial con 35 trabajadores tiene renta neta antes de participaciones de S/ 800,000. ¿Cuánto es la participación de los trabajadores?',
    u:'S/',r:80000,tol:1,
    s:'Las empresas industriales reparten el **10%**.\nParticipación = 800,000 × 10% = **S/ 80,000**\n\nAsiento: debe 6291 Participación de los trabajadores S/ 80,000, haber 4131 Participaciones por pagar S/ 80,000.\n\nDe ese total, S/ 40,000 (50%) se reparte en proporción a los días efectivamente laborados por cada trabajador y S/ 40,000 (50%) en proporción a sus remuneraciones percibidas en el año. Hay además un tope individual: ningún trabajador puede recibir más de 18 remuneraciones mensuales por este concepto; el exceso se destina a un fondo de capacitación regional. Y un dato clave para el cierre: la participación es **gasto deducible** del ejercicio si se paga dentro del plazo de presentación de la declaración anual.'},
   {l:2,t:'num',p:'Utilidad neta del ejercicio: S/ 180,000. Capital pagado: S/ 400,000. Reserva legal acumulada: S/ 76,000. ¿Cuánto se detrae de la utilidad para reserva legal?',
    u:'S/',r:4000,tol:1,
    s:'Tope de la reserva = 20% × 400,000 = S/ 80,000\nReserva acumulada = S/ 76,000 → falta S/ 4,000 para el tope\nDetracción del 10% de la utilidad = 10% × 180,000 = S/ 18,000\n\nPero solo puede llevarse hasta el tope: **S/ 4,000**.\n\nUna vez completado el 20% del capital, cesa la obligación de detraer. Los S/ 176,000 restantes quedan a libre disposición de la junta: pueden distribuirse como dividendos (con retención de 5% de renta de segunda categoría a socios personas naturales domiciliadas), capitalizarse o quedar como resultados acumulados. Si más adelante la empresa aumenta su capital, el tope del 20% sube y vuelve a nacer la obligación.'},
   {l:3,t:'ab',p:'Una empresa industrial con 40 trabajadores tiene, al 31/12/2026, utilidad contable antes de participaciones e impuesto de S/ 1,000,000. En la conciliación hay adiciones no deducibles por S/ 60,000. Determina participación de trabajadores, Impuesto a la Renta (29.5%) y utilidad neta, con los asientos.',
    s:'**Paso 1 — Base para la participación de los trabajadores.** Se calcula sobre la renta neta tributaria **antes** de la participación, es decir, sobre el resultado contable más las adiciones y menos las deducciones:\nBase = 1,000,000 + 60,000 = S/ 1,060,000\nParticipación (industrial, 10%) = **S/ 106,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6291 | Participación de los trabajadores | 106,000.00 | |\n| 4131 | Participaciones por pagar | | 106,000.00 |\n\n**Paso 2 — Renta neta imponible.** La participación es deducible para el Impuesto a la Renta:\nRenta neta imponible = 1,060,000 − 106,000 = S/ 954,000\nImpuesto a la Renta = 954,000 × 29.5% = **S/ 281,430**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 8811 | Impuesto a la Renta corriente | 281,430.00 | |\n| 40171 | Renta de tercera categoría | | 281,430.00 |\n\n**Paso 3 — Utilidad neta contable.**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad antes de participaciones e impuesto | 1,000,000 |\n| Participación de los trabajadores | (106,000) |\n| Impuesto a la Renta corriente | (281,430) |\n| **Utilidad neta del ejercicio** | **612,570** |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 89 | Determinación del resultado del ejercicio | 612,570.00 | |\n| 5911 | Utilidades acumuladas | | 612,570.00 |\n\n**Paso 4 — Reserva legal:** 10% × 612,570 = S/ 61,257, sujeto al tope del 20% del capital pagado.\n\n**Observación técnica importante:** el impuesto se calculó sobre la base tributaria de S/ 954,000, mientras que la utilidad contable antes de impuesto es S/ 894,000 (1,000,000 − 106,000). La diferencia de S/ 60,000 son las adiciones. Si esas adiciones son **permanentes** (por ejemplo multas o gastos sin sustento), no generan activo ni pasivo diferido y la tasa efectiva del impuesto sube: 281,430 ÷ 894,000 = 31.5% en lugar de 29.5%. Si fueran **temporales** (por ejemplo una provisión aún no deducible), habría que reconocer un activo tributario diferido de 60,000 × 29.5% = S/ 17,700 según la NIC 12. Distinguir una de otra es justamente el trabajo del Módulo 6 y del Módulo 7.'}
  ]
 },
 {
  id:'m2t6', titulo:'Los estados financieros básicos', min:16,
  cont:`Los estados financieros son el producto final. La NIC 1 exige un juego completo de cinco elementos, y en el Perú la presentación sigue además el Manual para la Preparación de Información Financiera de la SMV.

|Estado|Qué muestra|Naturaleza|
|Estado de Situación Financiera|Activos, pasivos y patrimonio a una fecha|Foto|
|Estado de Resultados|Ingresos y gastos de un periodo|Película|
|Estado de Resultados Integrales|Resultado más otros resultados integrales|Película|
|Estado de Cambios en el Patrimonio Neto|Movimientos del patrimonio del periodo|Película|
|Estado de Flujos de Efectivo|Entradas y salidas de efectivo por actividad|Película|
|Notas|Políticas contables y desagregaciones|Explicación|

# Estado de Situación Financiera
Se presenta clasificado en corriente y no corriente. **Corriente** es lo que se realizará o liquidará dentro de los 12 meses siguientes o dentro del ciclo normal de operación.

|ACTIVO|S/|PASIVO Y PATRIMONIO|S/|
|**Activo corriente**||||
|Efectivo y equivalentes|48,000|**Pasivo corriente**||
|Cuentas por cobrar comerciales, neto|121,000|Cuentas por pagar comerciales|96,000|
|Existencias, neto|184,000|Tributos por pagar|31,000|
|Gastos pagados por anticipado|9,000|Remuneraciones por pagar|42,000|
|Total activo corriente|362,000|Obligaciones financieras corto plazo|60,000|
|**Activo no corriente**||Total pasivo corriente|229,000|
|Propiedades, planta y equipo, neto|540,000|**Pasivo no corriente**||
|Intangibles, neto|26,000|Obligaciones financieras largo plazo|180,000|
|Activo tributario diferido|14,000|Total pasivo|409,000|
|Total activo no corriente|580,000|**Patrimonio**||
|||Capital|400,000|
|||Reserva legal|38,000|
|||Resultados acumulados|95,000|
|||Total patrimonio|533,000|
|**TOTAL ACTIVO**|**942,000**|**TOTAL PASIVO Y PATRIMONIO**|**942,000**|

> Fíjate en la palabra "**neto**" en cuentas por cobrar, existencias y propiedades: significa que ya se restaron la estimación de cobranza dudosa, la desvalorización y la depreciación acumulada. Las cuentas 19, 29 y 39 no aparecen como líneas propias: están incorporadas.

# Estado de Resultados
Puede presentarse por **función** (el formato usual en el Perú) o por **naturaleza**:

|Concepto|S/|
|Ventas netas|1,480,000|
|Costo de ventas|(962,000)|
|**Utilidad bruta**|**518,000**|
|Gastos de ventas|(186,000)|
|Gastos de administración|(142,000)|
|Otros ingresos operativos|12,000|
|**Utilidad operativa**|**202,000**|
|Gastos financieros|(28,000)|
|Ingresos financieros|3,000|
|Diferencia de cambio, neta|(5,000)|
|**Utilidad antes de participaciones e impuesto**|**172,000**|
|Participación de los trabajadores|(8,600)|
|Impuesto a la Renta|(48,268)|
|**Utilidad neta del ejercicio**|**115,132**|

# Lo que el contador debe revisar antes de firmar
1. ¿El total del activo iguala pasivo más patrimonio?
2. ¿La utilidad del Estado de Resultados coincide con la del Estado de Cambios en el Patrimonio?
3. ¿El efectivo final del Estado de Flujos coincide con la línea de efectivo del Estado de Situación Financiera?
4. ¿Los saldos de tributos coinciden con las declaraciones presentadas?
5. ¿El inventario coincide con el conteo físico?
6. ¿Las notas revelan lo que la NIIF exige, incluidos los hechos posteriores al cierre?

! **Comparabilidad.** La NIC 1 exige presentar la información del ejercicio anterior en todas las cifras. Un estado financiero de una sola columna está incompleto, y además pierde su utilidad: el valor del análisis está en la variación.

# Obligación de presentar estados financieros en el Perú
- Todas las sociedades deben formular estados financieros anuales y someterlos a la junta (LGS, art. 221), dentro de los tres meses siguientes al cierre.
- Las empresas bajo supervisión de la **SMV** y las que superan determinados umbrales de ingresos o activos presentan información financiera auditada ante la SMV, según sus reglamentos.
- Para efectos tributarios, los estados financieros sustentan la declaración jurada anual del Impuesto a la Renta, y ciertos contribuyentes deben presentar el **balance de comprobación** como anexo de la declaración.`,
  claves:['Juego completo NIC 1: situación financiera, resultados, resultados integrales, cambios en el patrimonio, flujos de efectivo y notas.','Corriente es lo realizable o exigible dentro de 12 meses o del ciclo normal de operación.','Las cuentas de valuación (19, 29, 39) no se presentan solas: van netas del activo que corrigen.','Hay cuatro cruces obligatorios antes de firmar: ecuación contable, utilidad, efectivo final y saldos de tributos.','La NIC 1 exige cifras comparativas del ejercicio anterior.'],
  ej:[
   {l:1,t:'mc',p:'Un préstamo bancario a 5 años, del que S/ 60,000 vencen en los próximos 12 meses y S/ 180,000 después, ¿cómo se presenta?',
    o:['Todo en pasivo no corriente','Todo en pasivo corriente','S/ 60,000 en pasivo corriente y S/ 180,000 en pasivo no corriente','En el patrimonio, por ser financiamiento'],r:2,
    s:'Se separa: la porción que vence dentro de 12 meses va al pasivo corriente y el resto al no corriente. Es una de las reclasificaciones de cierre más olvidadas, y distorsiona todos los ratios de liquidez: si se deja todo en no corriente, el capital de trabajo aparece mejor de lo que es y un banco que analice el balance detectará la inconsistencia al revisar el cronograma de pagos.'},
   {l:1,t:'num',p:'Una empresa tiene activo total S/ 680,000 y patrimonio S/ 245,000. ¿Cuál es su pasivo total?',
    u:'S/',r:435000,tol:1,
    s:'Pasivo = Activo − Patrimonio = 680,000 − 245,000 = **S/ 435,000**.\n\nRatio de endeudamiento del activo = 435,000 ÷ 680,000 = 64%: casi dos tercios del activo está financiado por terceros. Y el endeudamiento patrimonial es 435,000 ÷ 245,000 = 1.78 veces. Para un banco, por encima de 2 veces suele empezar a ser una señal de alerta, aunque el estándar depende del sector: una empresa de servicios con pocos activos y una industrial intensiva en capital no se leen con la misma vara.'},
   {l:2,t:'num',p:'Con el Estado de Resultados del tema (ventas 1,480,000; costo de ventas 962,000; gastos de ventas 186,000; gastos de administración 142,000; otros ingresos operativos 12,000), calcula el margen operativo en porcentaje.',
    u:'%',r:13.65,tol:0.1,
    s:'Utilidad operativa = 1,480,000 − 962,000 − 186,000 − 142,000 + 12,000 = S/ 202,000\nMargen operativo = 202,000 ÷ 1,480,000 = **13.65%**\n\nMárgenes de referencia útiles del mismo estado: margen bruto = 518,000 ÷ 1,480,000 = 35.0%; margen neto = 115,132 ÷ 1,480,000 = 7.8%. La distancia entre el margen bruto (35%) y el operativo (13.65%) muestra que los gastos de ventas y administración consumen 22 puntos de margen: es ahí donde conviene mirar si se busca rentabilidad, no en el precio de compra.'},
   {l:2,t:'ab',p:'Ordena estas partidas en el Estado de Situación Financiera indicando corriente o no corriente: letras por cobrar a 18 meses; mercadería de rotación lenta (18 meses de stock); CTS por pagar en mayo; terreno destinado a la venta en 6 meses; préstamo a un accionista sin plazo definido.',
    s:'**1. Letras por cobrar a 18 meses → Activo no corriente.** El plazo excede los 12 meses. Si tiene un componente financiero significativo, debe medirse al valor presente, y el descuento se reconoce como ingreso financiero a lo largo del plazo.\n\n**2. Mercadería de rotación lenta con 18 meses de stock → Activo corriente.** Las existencias se clasifican como corrientes porque forman parte del **ciclo normal de operación**, aunque ese ciclo exceda los 12 meses. Lo que sí corresponde es evaluar su valor neto realizable (NIC 2) y revelar en notas la rotación, porque un stock de 18 meses es una señal de deterioro probable.\n\n**3. CTS por pagar en mayo → Pasivo corriente.** Vence dentro de los 12 meses (el depósito de CTS es en mayo y noviembre).\n\n**4. Terreno destinado a la venta en 6 meses → Activo corriente, como "activo no corriente mantenido para la venta"** (NIIF 5), si cumple los criterios: decisión de venta, disponibilidad inmediata y venta altamente probable en 12 meses. Deja de depreciarse y se mide al menor entre valor en libros y valor razonable menos costos de venta. Si no cumple esos criterios, sigue en propiedades, planta y equipo, no corriente.\n\n**5. Préstamo a un accionista sin plazo definido → Activo no corriente**, en cuentas por cobrar a partes relacionadas, salvo que exista exigibilidad inmediata documentada. Tres advertencias: debe revelarse como **transacción con parte relacionada** (NIC 24); debe pactarse un interés no menor al que exige la norma tributaria para operaciones con vinculadas, porque de lo contrario SUNAT puede imputar un interés presunto; y si en el fondo es un retiro de utilidades disfrazado, puede calificar como **dividendo presunto**, con una tasa de impuesto que castiga bastante más que el reparto formal.'},
   {l:3,t:'ab',p:'El gerente te dice: "No entiendo nada; tenemos utilidad de S/ 115,000 pero no hay plata para pagar los sueldos". Con el Estado de Situación Financiera del tema, explícale la situación con cifras y propón tres medidas concretas.',
    s:'**Diagnóstico con las cifras del balance:**\n\n| Indicador | Cálculo | Resultado |\n|---|---|---|\n| Liquidez corriente | 362,000 ÷ 229,000 | 1.58 |\n| Prueba ácida (sin existencias) | (362,000 − 184,000) ÷ 229,000 | 0.78 |\n| Liquidez absoluta (solo efectivo) | 48,000 ÷ 229,000 | 0.21 |\n| Capital de trabajo | 362,000 − 229,000 | 133,000 |\n\nLa empresa **es solvente pero no es líquida**. Tiene S/ 133,000 de capital de trabajo positivo, pero su dinero no está en el banco: está en existencias (S/ 184,000) y en cuentas por cobrar (S/ 121,000), que juntas son el 84% del activo corriente. Con S/ 48,000 de efectivo frente a S/ 229,000 de pasivo corriente, solo puede cubrir 21 céntimos de cada sol que debe en el corto plazo.\n\n**Dónde está la utilidad:** los S/ 115,132 de utilidad neta no son dinero. Están repartidos entre el inventario comprado y no vendido, las facturas emitidas y no cobradas, y los activos fijos adquiridos. La utilidad se mide por devengo; la caja se mide por cobros y pagos. Son dos cosas distintas y conviven perfectamente.\n\n**Tres medidas concretas, en orden de impacto:**\n\n1. **Acelerar la cobranza.** Con ventas de S/ 1,480,000 anuales, el periodo promedio de cobro es 121,000 ÷ 1,480,000 × 365 = **30 días**. Reducirlo a 20 días libera alrededor de S/ 40,000 de caja. Medidas: descuento por pago pronto (por ejemplo 2% a 10 días), llamadas de cobranza antes del vencimiento y no despachar a clientes con facturas vencidas.\n\n2. **Reducir el inventario.** Con costo de ventas de S/ 962,000, la rotación es 962,000 ÷ 184,000 = 5.2 veces al año, es decir **70 días de inventario**. Llevarlo a 50 días libera cerca de S/ 52,000. Medidas: identificar los artículos sin movimiento en 6 meses y liquidarlos aunque sea con margen bajo (el dinero inmovilizado cuesta más que el descuento), y dejar de comprar por volumen lo que rota despacio.\n\n3. **Reestructurar el pasivo corriente.** Hay S/ 60,000 de deuda financiera que vence en 12 meses frente a S/ 48,000 de caja. Negociar con el banco pasar parte a largo plazo alinea el plazo de la deuda con el de los activos que financia, y reduce la presión mensual.\n\n**Lo que NO se debe hacer:** repartir dividendos sobre esos S/ 115,132. La utilidad existe, pero el dinero no. Un reparto en estas condiciones obligaría a financiar el dividendo con deuda, que es la forma más rápida de convertir un problema de liquidez en un problema de solvencia.\n\n**Y una recomendación de gestión:** elaborar un **flujo de caja proyectado semanal** a 13 semanas. El Estado de Flujos de Efectivo explica lo que ya pasó; lo que evita quedarse sin dinero para la planilla es la proyección, que no es un estado financiero sino una herramienta de gestión (Módulo 5).'}
  ]
 }
 ]
}
);
