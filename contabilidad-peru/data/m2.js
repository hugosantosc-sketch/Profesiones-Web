/* Contenido del curso — m2 · El ciclo contable completo
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
 id:'m2', nivel:'Básico · Intermedio', titulo:'El ciclo contable completo',
 resumen:'De la factura al estado financiero: diario, mayor, balance de comprobación, ajustes, cierre y presentación, con los plazos y formalidades que exige la norma peruana.',
 temas:[
 {
  id:'m2t1', titulo:'El Libro Diario y la estructura del asiento', min:22,
  cont:`El ciclo contable es la secuencia que convierte hechos económicos en estados financieros. Kieso, Weygandt y Warfield lo describen como un proceso de nueve pasos que se repite cada periodo: analizar la transacción, registrarla en el diario, mayorizar, preparar un balance de comprobación, hacer los ajustes, preparar el balance ajustado, formular los estados financieros, cerrar las cuentas de resultado y preparar un balance de comprobación posterior al cierre. Los seis subtemas de este módulo recorren exactamente ese circuito.

El **Libro Diario** es el primer eslabón: el registro cronológico de todas las operaciones. "Cronológico" es la palabra clave. Se anota en orden de fecha, sin saltos, sin espacios en blanco y sin tachaduras, de modo que cualquiera pueda reconstruir la historia económica de la empresa leyendo de arriba hacia abajo.

# Por qué el orden importa jurídicamente
Un libro contable no es solo una herramienta de gestión: es un **medio probatorio**. El Código de Comercio y la Ley General de Sociedades reconocen fuerza probatoria a los libros llevados conforme a ley, y el Código Tributario los convierte en el sustento de la determinación de los tributos. Un libro con espacios en blanco, con hojas sueltas o con asientos fuera de orden pierde esa fuerza, porque cualquiera podría haber intercalado una operación después.

# Qué debe contener cada asiento
La Resolución de Superintendencia 234-2006/SUNAT fija la información mínima de cada libro. Para el Libro Diario, cada asiento debe tener:

1. **Número correlativo** del asiento o código único de la operación.
2. **Fecha** de la operación.
3. **Glosa** o descripción, suficiente para entender qué ocurrió.
4. **Referencia** de la operación: tipo y número del comprobante o documento sustentatorio.
5. **Cuenta contable** del PCGE con su denominación, y el movimiento al debe o al haber.
6. **Totales** que cuadren.

> Una glosa como "varios" o "ajuste" no cumple la norma y, más importante, hace inútil el libro. Compara: "Ajuste" no dice nada; "Provisión de vacaciones devengadas del personal administrativo, noviembre 2026, según planilla de provisiones" permite revisar el cálculo tres años después sin preguntar a nadie. La glosa es para el lector futuro, que muchas veces no eres tú.

# Tipos de asiento
|Tipo|Cuándo|Ejemplo|
|**De apertura**|Al iniciar el ejercicio o la empresa|Traslado de los saldos del balance de cierre anterior|
|**De operación**|Durante el ejercicio|Compras, ventas, pagos, cobranzas, planilla|
|**De destino**|Junto al asiento por naturaleza|Clase 9 contra la cuenta 79; clase 2 contra la 61|
|**De ajuste**|Al cierre de cada mes o del ejercicio|Depreciación, devengos, estimaciones|
|**De cierre**|Al final del ejercicio|Cancelación de las cuentas de resultado|
|**De corrección**|Cuando se detecta un error|Extorno o contraasiento, con su propia glosa|

# Cómo se corrige un error: extorno y contraasiento
En contabilidad **no se borra**. Un asiento equivocado se corrige con otro asiento que deje rastro de ambos.

- **Extorno**: se repite el asiento original invertido, anulándolo por completo, y luego se registra el asiento correcto. Es lo más limpio cuando el error es de cuenta o de importe.
- **Contraasiento parcial**: se registra solo la diferencia. Es más corto, pero deja un rastro más difícil de seguir, así que conviene reservarlo para ajustes pequeños y documentados.
- **Reclasificación**: cuando el importe es correcto pero la cuenta no, se debita la correcta y se acredita la equivocada, con una glosa que explique por qué.

@ 14/05 — Extorno del asiento 118, registrado por error en la cuenta 6311 en lugar de la 6352
@ 42|4212 Emitidas - Facturas por pagar|3,540.00|
@ 63|6311 Transporte|3,000.00|
@ 40|40111 IGV - Cuenta propia|540.00|

@ 14/05 — Registro correcto del alquiler de mayo, F/ E001-55
@ 63|6352 Alquiler de edificaciones|3,000.00|
@ 40|40111 IGV - Cuenta propia|540.00|
@ 42|4212 Emitidas - Facturas por pagar||3,540.00

! Fíjate en que el extorno invierte los tres renglones, no solo el equivocado. Un extorno a medias deja descuadrada la cuenta del proveedor y el IGV, que es el error que más tiempo cuesta encontrar tres meses después.

# El Libro Diario de Formato Simplificado
La norma permite un formato simplificado a los contribuyentes obligados a llevar menos libros, típicamente los del Régimen MYPE Tributario con ingresos hasta 300 UIT. Tiene menos columnas, pero la lógica y la obligación de cuadrar son las mismas. No es un permiso para registrar peor: es un formato más compacto.

# Plazos, legalización y atraso
|Aspecto|Regla|
|Legalización (libros físicos)|Ante notario o juez de paz letrado, **antes** de usarlos|
|Libros electrónicos|Se generan y envían según el cronograma que SUNAT publica, por último dígito del RUC|
|Plazo máximo de atraso del Diario|Contado desde el primer día hábil del mes siguiente a aquel en que se realizaron las operaciones, según el Anexo 2 de la R.S. 234-2006/SUNAT|
|Infracción por atraso|Numeral 5 del artículo 175 del Código Tributario, con multa calculada sobre los ingresos netos y régimen de gradualidad|

# Un mes completo de una MYPE, asiento por asiento
Distribuidora Andina S.A.C., Régimen MYPE Tributario, comercializa artículos de ferretería. Abril de 2026.

@ 02/04 — Aporte de capital en efectivo, depositado en el BCP, según escritura pública
@ 10|1041 Cuentas corrientes operativas|40,000.00|
@ 50|5011 Acciones - Capital||40,000.00

@ 05/04 — Compra de mercadería al crédito 30 días, F/ E001-1240
@ 60|6011 Mercaderías|20,000.00|
@ 40|40111 IGV - Cuenta propia|3,600.00|
@ 42|4212 Emitidas - Facturas por pagar||23,600.00

@ 05/04 — Ingreso de la mercadería al almacén, nota de ingreso 041
@ 20|2011 Mercaderías - Costo|20,000.00|
@ 61|6111 Variación de mercaderías||20,000.00

@ 12/04 — Venta al contado, B/ B001-88 a F001-12, depósito en cuenta
@ 10|1041 Cuentas corrientes operativas|35,400.00|
@ 40|40111 IGV - Cuenta propia||5,400.00
@ 70|7011 Mercaderías||30,000.00

@ 12/04 — Costo de la mercadería vendida, kardex PEPS
@ 69|6911 Mercaderías - Costo|18,000.00|
@ 20|2011 Mercaderías - Costo||18,000.00

@ 20/04 — Alquiler del local, F/ E001-55
@ 63|6352 Alquiler de edificaciones|3,000.00|
@ 40|40111 IGV - Cuenta propia|540.00|
@ 42|4212 Emitidas - Facturas por pagar||3,540.00

@ 20/04 — Destino del gasto de alquiler: 40% administración, 60% ventas
@ 94|Gastos de administración|1,200.00|
@ 95|Gastos de ventas|1,800.00|
@ 79|Cargas imputables a costos y gastos||3,000.00

@ 30/04 — Planilla de abril: sueldos S/ 8,000, ONP 13%, EsSalud 9%
@ 62|6211 Sueldos|8,000.00|
@ 62|6271 Régimen de prestaciones de salud|720.00|
@ 40|4032 ONP||1,040.00
@ 40|4031 EsSalud||720.00
@ 41|4111 Sueldos y salarios por pagar||6,960.00

Al final del mes, el Libro Diario de esta empresa tiene el rastro completo: cualquier saldo del balance puede rastrearse hasta el comprobante que lo originó. Eso es lo que un auditor llama **pista de auditoría**, y es lo que se pierde cuando se registra "a ojo" en una hoja de cálculo sin referencia documental.

# El orden del trabajo diario
1. Recibir y validar el comprobante (RUC activo, habido, XML con CDR).
2. Clasificar la operación: qué elementos mueve y qué cuentas del plan corresponden.
3. Registrar el asiento por naturaleza y su asiento de destino.
4. Archivar el comprobante con la referencia del asiento, de modo que se pueda ir del libro al papel y del papel al libro.`,
  claves:['El ciclo contable son nueve pasos que se repiten cada periodo; el Diario es el primero.','El Diario es cronológico y tiene fuerza probatoria: sin orden ni integridad, la pierde.','Cada asiento necesita correlativo, fecha, glosa, referencia del comprobante y cuenta del PCGE con denominación.','Los errores no se borran: se extornan o se reclasifican, siempre con un asiento que deje rastro.','Los libros tienen plazo máximo de atraso y el incumplimiento es infracción del artículo 175 del Código Tributario.'],
  preg:[
   {p:'¿Por qué la norma prohíbe dejar espacios en blanco entre asientos del Libro Diario?',
    r:'Porque un espacio en blanco permite intercalar después una operación con fecha anterior, lo que destruiría la garantía de que el registro es cronológico y completo. Esa garantía es la base de su fuerza probatoria: si cualquiera pudiera agregar asientos al pasado, el libro no probaría nada. Por la misma razón se exige foliación correlativa y, en los libros electrónicos, el envío dentro de plazo con constancia, que cumple la misma función que la foliación en el papel.'},
   {p:'¿Qué diferencia hay entre extornar un asiento y hacer una reclasificación?',
    r:'El extorno anula por completo el asiento original invirtiendo todos sus renglones, y luego se registra el asiento correcto; se usa cuando el error afecta importes o varias cuentas. La reclasificación mantiene el importe y solo traslada el saldo de una cuenta a otra, debitando la correcta y acreditando la equivocada; se usa cuando el registro fue por el importe correcto pero en la cuenta equivocada. En ambos casos queda rastro de los dos momentos, que es lo que la contabilidad exige: nunca se corrige borrando.'},
   {p:'Una empresa registra la compra de mercadería solo con el asiento de la clase 6, sin el asiento de destino al almacén. ¿Qué queda mal al final del mes?',
    r:'El inventario queda subvaluado, porque la mercadería comprada nunca ingresó contablemente al almacén, y el resultado queda distorsionado, porque toda la compra quedó como gasto de la clase 6 sin que se reconozca que una parte sigue en el almacén. En la práctica, el balance mostrará menos activo del real y menos utilidad de la real. Además el inventario físico no cuadrará con los libros, que es exactamente el tipo de diferencia que SUNAT usa para presumir ventas omitidas.'},
   {p:'¿Para qué sirve la columna de "referencia" del asiento si la glosa ya describe la operación?',
    r:'La glosa explica qué pasó; la referencia permite encontrar el documento. Sin ella hay que buscar entre cientos de comprobantes el que corresponde a un asiento. La referencia es lo que hace navegable la pista de auditoría en los dos sentidos: del libro al comprobante, para verificar un registro, y del comprobante al libro, para comprobar que una factura efectivamente se registró y una sola vez. En una fiscalización, la velocidad con la que se encuentra un documento es la diferencia entre una revisión fluida y una que se alarga semanas.'},
   {p:'El sistema contable genera los asientos automáticamente desde el módulo de facturación. ¿Qué sigue siendo trabajo del contador?',
    r:'Decidir las reglas de contabilización que el sistema aplica (qué cuenta usa cada tipo de operación, cómo se asignan los destinos por función), revisar las operaciones que no encajan en ninguna regla, validar que los comprobantes que entraron sean reales y deducibles, y conciliar lo registrado con fuentes externas: el SIRE, los extractos bancarios, el inventario físico y las planillas. La automatización eliminó la digitación, no el criterio: el sistema no sabe si una factura corresponde a un gasto personal del dueño.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas glosas cumple con lo que exige la norma para un asiento del Libro Diario?',
    o:['"Ajustes del mes"','"Varios - caja"','"Depreciación de abril 2026 del equipo de transporte, placa B3K-742, método línea recta 20% anual"','"Asiento 45"'],r:2,
    s:'La tercera. Identifica el concepto, el periodo, el bien afectado y el criterio de cálculo, de modo que la operación pueda revisarse sin preguntar a quien la registró. Las otras tres son glosas vacías: no permiten reconstruir la operación y, en una revisión, obligan a buscar el sustento desde cero.'},
   {l:1,t:'num',p:'En el asiento de planilla del ejemplo, ¿cuánto es el importe neto que recibe el trabajador (cuenta 4111) si el sueldo bruto es S/ 8,000 y el único descuento es ONP 13%?',
    u:'S/',r:6960,tol:1,
    s:'Descuento ONP = 8,000 × 13% = S/ 1,040\nNeto a pagar = 8,000 − 1,040 = **S/ 6,960**\n\nEl EsSalud de S/ 720 (9% de 8,000) **no** se descuenta al trabajador: es aporte del empleador, por eso aparece como gasto en la cuenta 6271 y como pasivo en la 4031. Confundir aporte con descuento hace que el trabajador reciba menos de lo que le corresponde y genera un pasivo laboral con intereses.'},
   {l:2,t:'ab',p:'Un asistente registró el 10/06 una compra de suministros por S/ 1,180 (incluido IGV) cargando la cuenta 6011 Mercaderías en lugar de la 6032 Suministros. Corrige el error de las dos formas posibles y explica cuál prefieres.',
    s:'Base = 1,180 ÷ 1.18 = S/ 1,000 · IGV = S/ 180\n\n**Opción A — Extorno y nuevo registro** (dos asientos):\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 4212 | Emitidas - Facturas por pagar | 1,180.00 | |\n| 6011 | Mercaderías | | 1,000.00 |\n| 40111 | IGV - Cuenta propia | | 180.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6032 | Suministros | 1,000.00 | |\n| 40111 | IGV - Cuenta propia | 180.00 | |\n| 4212 | Emitidas - Facturas por pagar | | 1,180.00 |\n\n**Opción B — Reclasificación** (un solo asiento):\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6032 | Suministros | 1,000.00 | |\n| 6011 | Mercaderías | | 1,000.00 |\n\n**Cuál prefiero: la B**, con una condición. El importe y el proveedor eran correctos; lo único equivocado fue la cuenta de gasto, así que mover solo esa cuenta es más limpio y no toca el pasivo ni el IGV, que estaban bien. La condición es que la glosa explique el error: "Reclasificación del asiento 212: compra de suministros registrada por error en mercaderías".\n\nEl extorno se justifica cuando el error afecta importes, al proveedor o al IGV, o cuando el asiento original ya se incluyó en una declaración y conviene que la corrección sea visible como tal.\n\n**Detalle que mucha gente olvida:** si la compra había ingresado al almacén con su asiento de destino, hay que corregir también ese asiento, porque los suministros no van a la cuenta 20 de mercaderías.'},
   {l:2,t:'num',p:'Con los asientos del ejemplo de Distribuidora Andina (abril 2026), ¿cuál es el saldo final de la cuenta 20 Mercaderías?',
    u:'S/',r:2000,tol:1,
    s:'Movimientos de la cuenta 20:\n\n- Debe (ingreso al almacén, 05/04): S/ 20,000\n- Haber (costo de la mercadería vendida, 12/04): S/ 18,000\n\nSaldo deudor = 20,000 − 18,000 = **S/ 2,000**\n\nAl 30 de abril quedan S/ 2,000 de mercadería al costo en el almacén. Ese saldo debe coincidir con el inventario físico; si al contar se encuentran solo S/ 1,700, la diferencia de S/ 300 es un faltante que hay que investigar antes de registrar, porque los faltantes no sustentados suelen terminar en reparo y, si son grandes, en determinación sobre base presunta.'},
   {l:3,t:'ab',p:'Distribuidora Andina quiere saber su utilidad de abril con los asientos del tema. Calcula el resultado del mes y explica por qué la caja no coincide con esa utilidad.',
    s:'**Estado de Resultados de abril 2026**\n\n| Concepto | Importe |\n|---|---|\n| Ventas (7011) | 30,000.00 |\n| Costo de ventas (6911) | (18,000.00) |\n| **Utilidad bruta** | **12,000.00** |\n| Gastos de administración (alquiler 1,200 + planilla 8,720) | (9,920.00) |\n| Gastos de ventas (alquiler) | (1,800.00) |\n| **Utilidad operativa** | **280.00** |\n\nLa planilla cargada al gasto es S/ 8,720 (sueldos 8,000 + EsSalud 720); en este ejemplo se asignó íntegra a administración.\n\n**Movimiento de caja de abril**\n\n| Concepto | Importe |\n|---|---|\n| Aporte de capital | +40,000.00 |\n| Cobranza de ventas al contado | +35,400.00 |\n| Compra de mercadería (al crédito, no pagada) | 0.00 |\n| Alquiler (al crédito, no pagado) | 0.00 |\n| Planilla (por pagar al 30/04) | 0.00 |\n| **Saldo en bancos** | **75,400.00** |\n\n**Por qué no coinciden, en cuatro razones:**\n\n1. El **aporte de capital de S/ 40,000** entró a caja pero no es ingreso: es patrimonio, operación con los socios.\n2. Las ventas incluyen **IGV cobrado de S/ 5,400** que no es ingreso de la empresa: es un pasivo con el Estado.\n3. La mercadería costó S/ 20,000 pero solo S/ 18,000 se llevaron al costo; **S/ 2,000 siguen en el almacén** como activo. Y además no se pagó: la deuda de S/ 23,600 sigue viva.\n4. El alquiler y la planilla **ya son gasto por devengo** aunque no se hayan pagado; al pagarlos, la caja caerá S/ 11,540 sin que haya más gasto.\n\n**Conclusión para el dueño:** tiene S/ 75,400 en el banco y una utilidad de S/ 280. De esos S/ 75,400 debe S/ 23,600 a proveedores, S/ 6,960 a trabajadores, S/ 1,760 de aportes, S/ 3,540 de alquiler y alrededor de S/ 1,260 de IGV (5,400 de débito menos 4,140 de crédito). Si retira dinero creyendo que ganó, está retirando el capital que aportó y la plata de terceros.'}
  ],
  proy:{
   t:'El Libro Diario formal del segundo mes',
   ctx:`En el Módulo 1 registraste 15 operaciones para entender la lógica. Ahora vas a llevar el Libro Diario **como exige la norma**, con sus seis requisitos, para un segundo mes de tu empresa. La diferencia entre un registro que entiende solo quien lo hizo y uno que sobrevive a una fiscalización está justamente en esos requisitos.`,
   pasos:[
    'Inventa 20 operaciones del segundo mes de tu empresa, partiendo de los saldos con que cerró el primer mes (los del proyecto integrador de 1.4 y 1.5).',
    'Incluye obligatoriamente: una compra con detracción, una venta con nota de crédito posterior, un pago parcial a un proveedor, un gasto pagado por adelantado, una compra de un activo fijo y un error que luego vas a corregir.',
    'Registra cada asiento con las seis columnas que exige la R.S. 234-2006: correlativo, fecha, glosa, referencia del documento, cuenta del PCGE con denominación, y debe o haber.',
    'Corrige el error que introdujiste, decidiendo entre extorno y reclasificación, y justifica por escrito tu elección en la glosa.',
    'Numera tus asientos de forma correlativa y sin saltos, y verifica que no haya ninguna fecha fuera de orden.',
    'Al final del mes, suma todos los debes y todos los haberes y comprueba que coinciden.'
   ],
   entrega:[
    'Libro Diario del segundo mes con las seis columnas normativas y mínimo 20 operaciones.',
    'El par de asientos de corrección, con su glosa justificada.',
    'La suma de control del mes.'
   ],
   crit:[
    'Ninguna glosa es genérica: todas permiten reconstruir la operación sin ver el comprobante.',
    'Todos los asientos tienen referencia documental concreta (tipo y número de comprobante).',
    'La corrección del error deja rastro de ambos momentos; nada fue borrado ni sobreescrito.',
    'La numeración es correlativa y las fechas están en orden.'
   ],
   pista:'Para la operación con detracción, recuerda el circuito que viste en 1.6: el pasivo se cancela contra dos cuentas de efectivo distintas, la operativa (1041) y la de detracciones (1042).'
  },
  proyInt:{
   t:'Tu Libro Diario, ahora con valor probatorio',
   integra:'1.1 a 2.1',
   ctx:`Vuelve sobre el primer mes que registraste en el Módulo 1. Aquel registro servía para aprender; este tiene que servir ante un tercero. Vas a rehacerlo con los requisitos formales y a conectarlo con el expediente documental que armaste en 1.6, para que cada asiento tenga su papel y cada papel su asiento.`,
   pasos:[
    'Rehaz el Libro Diario del primer mes con las seis columnas normativas y con las cuentas de tu propio plan de cuentas (el de 1.5).',
    'Empieza con el asiento de apertura que traslada tu balance de apertura (proyecto integrador de 1.3) a las cuentas.',
    'Para cada asiento, anota en la columna de referencia el documento del expediente documental que lo sustenta. Marca los asientos que no tengan documento: esos son tu problema.',
    'Arma una tabla de doble entrada: en las filas los documentos de tu expediente, en las columnas los asientos; verifica que cada documento tenga asiento y cada asiento tenga documento.',
    'Revisa que todas las políticas que escribiste en 1.2 se hayan aplicado de verdad: criterio de activación, método de valuación de inventarios, umbral de materialidad.',
    'Escribe media página sobre las diferencias entre tu primer registro y este: qué aprendiste al rehacerlo.'
   ],
   entrega:[
    'Libro Diario del primer mes en formato normativo, con asiento de apertura.',
    'La tabla de cruce documento-asiento, con los faltantes señalados.',
    'La media página de conclusiones.'
   ],
   crit:[
    'El asiento de apertura cuadra exactamente con el balance de apertura del Módulo 1.',
    'Todo asiento tiene referencia documental, o está marcado como pendiente de sustento.',
    'Las políticas contables de 1.2 se aplicaron de forma consistente, y las desviaciones están explicadas.'
   ],
   pista:'La tabla de cruce es la herramienta más simple y más potente del control interno contable: en diez minutos muestra las facturas que nadie registró y los asientos que nadie puede sustentar.'
  },
  fuentes:[
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'la definición del ciclo contable en nueve pasos y la función del diario como registro cronológico'},
   {a:'SUNAT', o:'Resolución de Superintendencia 234-2006/SUNAT', n:'información mínima de cada libro, formatos y plazos máximos de atraso'},
   {a:'Martha Abanto Bromley', o:'Plan Contable General Empresarial: aplicación práctica', n:'casos de registro, asientos de destino y correcciones'},
   {a:'Erly Zeballos Zeballos', o:'Contabilidad General', n:'estructura del asiento y tipos de asiento en el contexto peruano'},
   {a:'Código Tributario, artículo 175', o:'Infracciones relacionadas con libros y registros', n:'consecuencias del atraso y de la omisión en el llevado de libros'}
  ]
 },
 {
  id:'m2t2', titulo:'El Libro Mayor, los auxiliares y la conciliación', min:21,
  cont:`El Diario cuenta la historia en orden de tiempo; el Mayor la reorganiza **por cuenta**. Es la misma información vista desde otro ángulo: en lugar de "qué pasó el 12 de abril", responde "cómo se movió la cuenta 1041 durante todo abril". Sin esa segunda vista no hay saldos, y sin saldos no hay estados financieros.

# De diario a mayor
Cada cuenta del Mayor, tradicionalmente dibujada como una "T", recibe los importes del Diario: debe a la izquierda, haber a la derecha. Al final del periodo se suman ambos lados y se obtiene el **saldo**:

$ Saldo deudor  = Σ Debe − Σ Haber   (cuando el debe es mayor)
$ Saldo acreedor = Σ Haber − Σ Debe   (cuando el haber es mayor)
$ Cuenta saldada = cuando ambos lados son iguales

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
|Saldo acreedor|||1,260.00|

Ese saldo acreedor de S/ 1,260 es exactamente el IGV que la empresa debe pagar por abril. El Mayor no es un trámite: es la herramienta que te dice cuánto pagar sin volver a mirar cada factura.

# Mayor general y mayores auxiliares
El mayor general lleva la cuenta al nivel de divisionaria. Los **auxiliares** abren el detalle por tercero:

|Cuenta|Auxiliar por|Para qué|
|12 Cuentas por cobrar|Cliente|Saber quién debe y desde cuándo|
|42 Cuentas por pagar|Proveedor|Programar pagos y negociar plazos|
|41 Remuneraciones|Trabajador|Controlar lo adeudado a cada persona|
|10 Efectivo|Banco y cuenta|Conciliar con cada extracto|
|33 Activo fijo|Bien individual|Calcular la depreciación de cada activo|
|20 Existencias|Producto (kardex)|Controlar stock y costo unitario|

$ Σ saldos de los auxiliares = Saldo del mayor general

Cuando esa igualdad no se cumple, el problema casi nunca es la suma: es un registro hecho sin identificar al tercero, que entró al mayor general pero a ningún auxiliar. Es uno de los primeros controles que revisa un auditor, porque una cuenta por cobrar que no se puede abrir por cliente es una cuenta por cobrar que nadie está cobrando.

# La conciliación bancaria
Es el control más importante del mes y el que más fraudes ha descubierto en la historia de la contabilidad. Compara el saldo del Mayor de la cuenta corriente con el saldo del extracto bancario, y explica cada diferencia.

**Partidas que explican las diferencias:**
|Partida|Está en|Falta en|Tratamiento|
|Cheques girados no cobrados|Libros|Banco|No se ajusta: es diferencia de tiempo|
|Depósitos en tránsito|Libros|Banco|No se ajusta|
|Cargos bancarios (comisiones, portes, ITF)|Banco|Libros|**Sí se ajusta**: hay que registrarlos|
|Abonos por intereses|Banco|Libros|**Sí se ajusta**|
|Cobranzas que el banco hizo por la empresa|Banco|Libros|**Sí se ajusta**|
|Errores de cualquiera de los dos|Uno u otro|—|Se corrige donde esté el error|

$ Saldo según extracto − cheques no cobrados + depósitos en tránsito = SALDO AJUSTADO
$ Saldo según libros + abonos no registrados − cargos no registrados = SALDO AJUSTADO
$ Los dos saldos ajustados deben ser idénticos

! Una conciliación que no llega a cero **no está terminada**. La tentación de cerrar la diferencia con un asiento a "gastos diversos" es el atajo que permite que un desvío de dinero pase inadvertido durante años. Si la diferencia es pequeña y no se encuentra, lo correcto es documentar la búsqueda realizada y dejar la partida identificada como pendiente, no disfrazarla.

# Para qué sirve el Mayor en el trabajo real
- **Determinar los tributos del mes**: el saldo de la 40111 es el IGV a pagar o el crédito a arrastrar; el de la 4017, los pagos a cuenta aplicados.
- **Analizar la antigüedad de la cartera**: el auxiliar de la 12 por cliente y por fecha muestra qué está por vencer y qué ya venció.
- **Detectar errores por lógica**: una cuenta de activo con saldo acreedor, una caja negativa, un proveedor con saldo deudor.
- **Preparar el balance de comprobación**, que no es más que la lista de todos los saldos del Mayor.

# Revisión de saldos por lógica: el checklist del cierre mensual
|Pregunta|Si la respuesta es sí|
|¿Alguna cuenta de activo tiene saldo acreedor?|Error, salvo 19, 29, 36 y 39|
|¿La caja tiene saldo negativo?|Imposible físicamente: hay operaciones no registradas o pagos del dueño|
|¿Algún proveedor tiene saldo deudor?|Anticipo mal clasificado o pago duplicado|
|¿Algún cliente tiene saldo acreedor?|Anticipo recibido mal clasificado|
|¿El saldo de la 41 coincide con la planilla por pagar?|Si no, falta un pago o sobra una provisión|
|¿La suma de los auxiliares iguala al mayor general?|Si no, hay registros sin tercero asignado|

> **Un saldo de caja negativo es la señal de alarma clásica en las MYPES.** Suele significar que se registraron pagos que en realidad salieron del bolsillo del dueño, o que falta registrar ingresos. SUNAT lo usa como indicio de ventas omitidas, con un razonamiento difícil de rebatir: si la caja "se fue a negativo", el dinero salió de algún lugar que no está en los libros.`,
  claves:['El Mayor reagrupa el Diario por cuenta y entrega el saldo de cada una.','La suma de los mayores auxiliares debe igualar el saldo del mayor general; si no, hay registros sin tercero.','La conciliación bancaria ajusta solo lo que falta en libros: cargos, abonos y errores propios; los cheques no cobrados y los depósitos en tránsito no se ajustan.','Una conciliación que no llega a cero no está terminada y nunca se cierra con un asiento de ajuste genérico.','El cierre mensual incluye una revisión de saldos por lógica: activos acreedores, caja negativa y terceros con saldo invertido.'],
  preg:[
   {p:'¿Por qué un cheque girado y no cobrado no se ajusta en los libros, si el dinero todavía está en el banco?',
    r:'Porque contablemente el pago ya ocurrió: al girar y entregar el cheque, la empresa extinguió su obligación con el proveedor y se desprendió del derecho sobre ese dinero. Que el beneficiario no lo haya cobrado todavía es un asunto suyo y de tiempo, no un hecho económico nuevo. Por eso figura como partida conciliatoria que se resta del saldo del banco, no como ajuste en libros. Caso distinto es un cheque girado hace mucho y nunca cobrado, que puede haberse extraviado o caducado: ahí sí corresponde investigar y eventualmente extornar.'},
   {p:'La suma de los auxiliares de clientes da S/ 182,000 y el mayor general de la cuenta 12 da S/ 189,000. ¿Qué buscas primero?',
    r:'Los movimientos registrados en la cuenta 12 sin código de cliente asignado: serán S/ 7,000. Suelen venir de asientos manuales de ajuste cargados directo a la cuenta, de una provisión registrada globalmente o de una cobranza aplicada sin identificar a quién. Se filtran los movimientos del periodo sin tercero y aparecen de inmediato. Lo que no hay que hacer es ajustar el auxiliar para que cuadre: eso oculta el problema y deja la cobranza trabajando con información incompleta.'},
   {p:'Explica por qué el saldo de la cuenta 40111 al cierre del mes es a la vez información contable y tributaria.',
    r:'Contablemente es un pasivo con el Estado (si es acreedor) o un activo por crédito a aplicar (si es deudor), y como tal se presenta en el balance. Tributariamente es la determinación del IGV del periodo, que debe coincidir con la casilla correspondiente de la declaración mensual. Esa doble naturaleza es lo que hace que el saldo sea un punto de control: si el Mayor dice una cosa y la declaración otra, una de las dos está mal, y la inconsistencia es visible de inmediato en un cruce de información.'},
   {p:'¿Por qué se dice que la conciliación bancaria ha descubierto más fraudes que cualquier otro control contable?',
    r:'Porque el efectivo es lo que se roba, y el banco es un testigo independiente: la empresa no controla lo que dice el extracto. Un desvío de dinero necesita, tarde o temprano, que el saldo contable y el bancario dejen de coincidir, y la conciliación obliga a explicar cada diferencia. Por eso el control se debilita cuando la misma persona que maneja el efectivo prepara la conciliación: la separación de funciones es lo que le da valor. Un contador que recibe conciliaciones siempre perfectas y preparadas por el cajero debería revisarlas él mismo al menos una vez.'},
   {p:'Si el software mayoriza automáticamente y nunca se equivoca en la suma, ¿para qué revisar el Mayor?',
    r:'Porque el software suma bien lo que le dieron, pero no juzga si lo que le dieron tiene sentido. La revisión busca errores que no son aritméticos: cuentas con saldo de signo imposible, terceros con saldo invertido, saldos que llevan meses sin moverse, cuentas puente que debieron quedar en cero, importes atípicos. Es análisis, no cálculo, y es exactamente la parte del trabajo que no se automatiza.'}
  ],
  ej:[
   {l:1,t:'num',p:'La cuenta 1212 Facturas por cobrar tiene cargos por S/ 86,400 y abonos por S/ 51,900. ¿Cuál es su saldo?',
    u:'S/',r:34500,tol:1,
    s:'Saldo deudor = 86,400 − 51,900 = **S/ 34,500**\n\nEs deudor porque se trata de un activo: los cargos (ventas al crédito) superan a los abonos (cobranzas). Ese importe es lo que los clientes todavía deben. El siguiente paso en el trabajo real es abrir el auxiliar por cliente y armar el reporte de antigüedad: lo que tiene más de 90 días vencido es candidato a estimación de cobranza dudosa.'},
   {l:1,t:'mc',p:'La cuenta 101 Caja muestra un saldo acreedor de S/ 2,300. ¿Qué significa?',
    o:['Que la empresa tiene S/ 2,300 disponibles','Que hay un error: el efectivo no puede ser negativo','Que debe S/ 2,300 al banco','Que hay un sobregiro autorizado'],r:1,
    s:'Es un error. Físicamente no se puede tener menos de cero soles en una caja. Las causas típicas: pagos registrados que en realidad hizo el dueño con dinero propio (deberían ir contra la cuenta 44 o 14), ingresos no registrados, o una transferencia entre caja y banco registrada solo en un lado. Hay que encontrar la causa, no "arreglar" el saldo. Un sobregiro bancario sí existe, pero se registra en la cuenta 4511 y corresponde a la cuenta corriente, no a la caja.'},
   {l:2,t:'num',p:'En mayo la cuenta 40111 tiene: IGV de compras S/ 9,870; IGV de ventas S/ 7,420; crédito fiscal arrastrado del mes anterior S/ 1,150. ¿Cuánto paga de IGV en mayo?',
    u:'S/',r:0,tol:0.5,
    s:'Débito fiscal (ventas): S/ 7,420\nCrédito fiscal del mes: S/ 9,870\nCrédito arrastrado: S/ 1,150 → crédito total S/ 11,020\n\nResultado = 7,420 − 11,020 = −3,600 → **no paga nada: S/ 0**\n\nArrastra un crédito fiscal de **S/ 3,600** al mes siguiente, que queda como saldo deudor en la cuenta 40111. Esto es normal en meses de compra fuerte de inventario o de adquisición de activos fijos. Lo que no es normal es arrastrar crédito mes tras mes durante un año: eso indica compras desproporcionadas frente a las ventas, y SUNAT lo revisa.'},
   {l:2,t:'ab',p:'El Mayor de bancos muestra S/ 48,200 al 31 de mayo; el extracto dice S/ 52,750. Encuentras: un cheque girado el 29/05 por S/ 6,300 no cobrado; un abono por intereses de S/ 150 no registrado; una comisión bancaria de S/ 100 no registrada. Prepara la conciliación.',
    s:'**Conciliación bancaria al 31/05**\n\n| Desde el banco | Importe |\n|---|---|\n| Saldo según extracto bancario | 52,750.00 |\n| (−) Cheque girado y no cobrado | (6,300.00) |\n| **Saldo bancario ajustado** | **46,450.00** |\n\n| Desde los libros | Importe |\n|---|---|\n| Saldo según libros | 48,200.00 |\n| (+) Intereses abonados no registrados | 150.00 |\n| (−) Comisión bancaria no registrada | (100.00) |\n| **Saldo contable ajustado** | **48,250.00** |\n\n**La conciliación NO cuadra:** quedan S/ 1,800 de diferencia (48,250 − 46,450). Eso significa que falta una partida por identificar, típicamente un cargo del banco no registrado: un pago de tributos, una cuota de préstamo, un cargo por ITF o un cheque que el banco pagó y la empresa no registró.\n\n**Qué hacer:** revisar el extracto línea por línea contra el Mayor hasta encontrar los S/ 1,800. Una conciliación que no llega a cero no se cierra.\n\n**Asientos que sí corresponden registrar ya:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 1041 | Cuentas corrientes operativas | 150.00 | |\n| 7721 | Rendimientos ganados - Depósitos | | 150.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6392 | Gastos bancarios | 100.00 | |\n| 1041 | Cuentas corrientes operativas | | 100.00 |\n\nEl cheque no cobrado no genera asiento: el pago ya se registró cuando se giró.'},
   {l:3,t:'ab',p:'Al revisar el Mayor encuentras: cuenta 39 con saldo deudor de S/ 4,500; cuenta 4212 con saldo deudor de S/ 2,800; y la cuenta 1212 difiere de la suma de sus auxiliares en S/ 7,000. Diagnostica cada caso, ordénalos por gravedad y di qué harías.',
    s:'**1. Cuenta 39 Depreciación acumulada con saldo deudor (S/ 4,500).** Imposible: es una cuenta de valuación con saldo acreedor por naturaleza. Causas probables: (a) se registró la depreciación invertida; (b) se dio de baja un activo cargando la 39 por un importe mayor al realmente depreciado; (c) se usó la 39 como contrapartida de un ajuste que correspondía a otra cuenta. **Qué hacer:** reconstruir el cuadro de depreciación por activo (costo, fecha de alta, tasa, depreciación del año y acumulada) y compararlo con el Mayor. El cuadro de activos fijos es la fuente de verdad; el Mayor debe ajustarse a él, nunca al revés.\n\n**2. Cuenta 4212 Facturas por pagar con saldo deudor (S/ 2,800).** Significa que se pagó más de lo que se debía o que un pago se registró sin su factura. Causas típicas: anticipo a proveedor registrado en la 42 en lugar de la 422 o la 182, doble registro de un pago, o una nota de crédito contabilizada dos veces. **Qué hacer:** abrir el auxiliar por proveedor, identificar cuál tiene saldo deudor y revisar sus documentos. Si es un anticipo, reclasificarlo al activo: presentarlo como pasivo negativo distorsiona el balance y puede ocultar un pago duplicado que nadie reclamó.\n\n**3. Diferencia de S/ 7,000 entre el mayor general de la 1212 y sus auxiliares.** La causa casi siempre es un registro hecho sin asignar el tercero. **Qué hacer:** listar los movimientos de la cuenta sin código de cliente; sumarán S/ 7,000. Luego identificar a qué cliente pertenecen y corregir.\n\n**Orden de gravedad, que es la parte de criterio del ejercicio:**\n\n| Prioridad | Caso | Por qué |\n|---|---|---|\n| 1 | Diferencia en auxiliares de clientes | Afecta la gestión diaria: la cobranza está trabajando con información incompleta y puede haber dinero cobrado sin aplicar o facturas vencidas que nadie reclama. Además distorsiona la estimación de cobranza dudosa |\n| 2 | Cuenta 39 deudora | Afecta la utilidad y el valor del activo en el balance, y arrastra error a la conciliación tributaria de la depreciación |\n| 3 | Cuenta 4212 deudora | Es un error de clasificación con efecto en presentación; el importe existe y está identificado |\n\n**Un principio general que conviene fijar:** se prioriza por el riesgo de que el error oculte una pérdida de dinero, no por el tamaño del importe. Una diferencia de S/ 7,000 en cuentas por cobrar puede significar que alguien cobró y no depositó; una cuenta 39 mal registrada, en cambio, es casi siempre un error técnico sin dinero de por medio.'}
  ],
  proy:{
   t:'Mayorización y conciliación del segundo mes',
   ctx:`Tienes el Libro Diario del segundo mes. Ahora vas a construir el Mayor, abrir los auxiliares que tu empresa necesita y hacer la primera conciliación bancaria real del curso, que es el control que todo contador hace todos los meses de su vida profesional.`,
   pasos:[
    'Mayoriza las 20 operaciones del segundo mes: una hoja por cuenta, con saldo inicial, movimientos y saldo final.',
    'Abre los auxiliares de al menos tres cuentas: clientes, proveedores y, según tu negocio, existencias o activo fijo. Comprueba que la suma de cada auxiliar iguale el saldo de su mayor general.',
    'Inventa el extracto bancario del mes de tu empresa. Hazlo realista: incluye dos cheques girados y no cobrados, una comisión bancaria, el ITF, un abono de intereses y un cargo que la empresa no había registrado.',
    'Prepara la conciliación bancaria por los dos lados hasta que ambos saldos ajustados coincidan exactamente.',
    'Registra los asientos de ajuste que surgen de la conciliación.',
    'Pasa el checklist de revisión por lógica del subtema a todas tus cuentas y escribe los hallazgos.'
   ],
   entrega:[
    'El Mayor completo del segundo mes.',
    'Los tres auxiliares con su cuadre contra el mayor general.',
    'El extracto bancario inventado y la conciliación cuadrada.',
    'Los asientos de ajuste y el resultado del checklist de revisión.'
   ],
   crit:[
    'Los dos saldos ajustados de la conciliación coinciden exactamente, sin partidas sin explicar.',
    'Los cheques no cobrados no generaron asiento; la comisión, el ITF y los intereses sí.',
    'Cada auxiliar cuadra con su mayor general al céntimo.',
    'El checklist se aplicó a todas las cuentas, no solo a las que parecían sospechosas.'
   ],
   pista:'Al inventar el extracto bancario, incluye a propósito un cargo que no habías registrado. Encontrarlo en la conciliación es el momento en que se entiende para qué sirve este control.'
  },
  proyInt:{
   t:'Dos meses de tu empresa, cuadrados y conciliados',
   integra:'1.1 a 2.2',
   ctx:`Ya tienes dos meses de operaciones. Este proyecto los consolida y te obliga a mirar la evolución, que es lo primero que pregunta cualquier dueño: ¿vamos mejor o peor que el mes pasado y por qué?`,
   pasos:[
    'Arma el Mayor acumulado de los dos meses, partiendo del asiento de apertura: saldo inicial, movimientos de cada mes y saldo acumulado.',
    'Verifica la continuidad: el saldo final de cada cuenta del mes 1 debe ser el saldo inicial del mes 2, sin excepciones.',
    'Construye un cuadro comparativo de los dos meses con cinco indicadores: ventas, costo de ventas, margen bruto, gastos operativos y saldo final de caja.',
    'Calcula para el mes 2 el IGV a pagar a partir del saldo de tu cuenta 40111 y verifica que coincide con lo que arroja tu Registro de Ventas menos tu Registro de Compras.',
    'Actualiza tu manual contable (el de 1.2) con una sección nueva: el calendario mensual de cierre, con los ocho controles que ya conoces y quién los hace.',
    'Escribe un informe de una página al dueño explicando la evolución entre los dos meses y una recomendación concreta.'
   ],
   entrega:[
    'Mayor acumulado de los dos meses con continuidad verificada.',
    'Cuadro comparativo con los cinco indicadores.',
    'Cálculo del IGV verificado por dos vías.',
    'La sección de calendario de cierre agregada al manual.',
    'El informe de una página.'
   ],
   crit:[
    'No hay ninguna cuenta cuyo saldo final del mes 1 difiera del inicial del mes 2.',
    'El IGV calculado por el Mayor coincide con el calculado por los registros de ventas y compras.',
    'El calendario de cierre asigna responsable y fecha a cada control, no solo los enumera.',
    'El informe explica las causas de la variación, no solo la describe.'
   ],
   pista:'Si el IGV calculado por las dos vías no coincide, la causa más frecuente es una factura registrada en el Diario pero no en el Registro de Compras, o una venta con nota de crédito aplicada solo en uno de los dos.'
  },
  fuentes:[
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'la mayorización, los saldos de cuenta y la función del mayor en el ciclo'},
   {a:'Alvin A. Arens, Randal J. Elder y Mark S. Beasley', o:'Auditing and Assurance Services', n:'la conciliación bancaria como control clave sobre el efectivo y la separación de funciones'},
   {a:'Alejandro Ferrer Quea', o:'Estados Financieros: análisis e interpretación por sectores económicos', n:'análisis de saldos y su traslado a las líneas del estado de situación financiera'},
   {a:'Erly Zeballos Zeballos', o:'Contabilidad General', n:'mayores auxiliares y su cuadre con el mayor general'},
   {a:'SUNAT', o:'Resolución de Superintendencia 234-2006/SUNAT', n:'información mínima del Libro Mayor y de los registros auxiliares'}
  ]
 },
 {
  id:'m2t3', titulo:'Balance de comprobación y hoja de trabajo', min:20,
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

Mira los totales: las sumas no cuadran (232,500 frente a 228,500) y los saldos tampoco, con la misma diferencia de S/ 4,000. **Eso es un error de registro**, y el balance de comprobación acaba de delatarlo antes de que llegue a los estados financieros.

# Las dos igualdades que deben cumplirse
$ Σ Sumas del debe = Σ Sumas del haber
$ Σ Saldos deudores = Σ Saldos acreedores
$ Y además: Σ Sumas del debe debe igualar el total del Libro Diario del periodo

La tercera igualdad es la que casi nadie verifica y la que detecta el error más escurridizo: un asiento que se mayorizó dos veces o que no se mayorizó.

# Cómo se busca un descuadre
Técnicas en orden de rapidez:
1. **Diferencia divisible entre 9** (540, 180, 90): sugiere una **transposición** de dígitos, como anotar 1,800 en vez de 8,100. El resultado de restar un número y su transpuesto siempre es múltiplo de 9.
2. **Diferencia divisible entre 2**: sugiere un importe registrado en el lado equivocado. Si la diferencia es S/ 4,000, busca un movimiento de S/ 2,000 invertido.
3. **La diferencia exacta coincide con un importe conocido**: un asiento quedó incompleto o se omitió un renglón.
4. **Revisar los asientos con un solo movimiento**, si el sistema los permitió.
5. **Comparar el total del Diario con el total del Mayor** por cuenta.

> **Qué NO comprueba el balance de comprobación.** Cuadra aunque los asientos estén conceptualmente mal. Si registras el alquiler en la cuenta 60 en lugar de la 63, el balance cuadra perfecto y el estado financiero está mal. Tampoco detecta una operación completamente omitida, ni una registrada dos veces entera, ni una con la cuenta equivocada del mismo signo, ni una en el periodo equivocado. Cuadrar es necesario, no suficiente.

# Los cinco errores que el balance no detecta
|Error|Por qué no lo detecta|Cómo se detecta|
|Omisión total de una operación|Faltan los dos lados, sigue cuadrando|Conciliación con SIRE, bancos, inventario|
|Registro duplicado completo|Sobran los dos lados|Revisión de documentos repetidos, control de correlativos|
|Cuenta equivocada del mismo signo|El total no cambia|Revisión analítica de saldos y comparación con el mes anterior|
|Importe equivocado en ambos lados|Cuadra con el importe errado|Cruce con el comprobante|
|Operación en el periodo equivocado|Cuadra en el periodo donde se puso|Corte de operaciones al cierre (cut-off)|

# La hoja de trabajo
Es el papel de trabajo donde se parte del balance de comprobación, se añaden los ajustes y se obtienen las cifras finales. Kieso la describe como un instrumento **opcional pero muy útil**: no es un libro oficial ni tiene valor legal, sino una herramienta de orden que permite ver el efecto de los ajustes antes de registrarlos.

|Columnas|Contenido|
|1-2|Saldos según libros (balance de comprobación)|
|3-4|Ajustes del periodo (depreciación, devengos, estimaciones)|
|5-6|Saldos ajustados|
|7-8|Clasificación: Estado de Resultados|
|9-10|Clasificación: Estado de Situación Financiera|

La utilidad aparece como la diferencia entre las columnas del Estado de Resultados y se traslada a las del Estado de Situación Financiera para que cuadre. Esa es la razón por la que el balance "cierra": la utilidad es el eslabón entre los dos estados.

$ Utilidad = Σ Ingresos (clase 7) − Σ Gastos (clases 6 y 69)
$ Activo = Pasivo + Patrimonio inicial + Utilidad del ejercicio − Retiros

# El balance de comprobación como anexo tributario
En el Perú, determinados contribuyentes deben presentar el **balance de comprobación** como anexo de la declaración jurada anual del Impuesto a la Renta, según el nivel de ingresos que fija cada año la resolución de SUNAT que aprueba el formulario. Ese anexo se cruza automáticamente con las declaraciones mensuales: si el total de ventas del balance no coincide con la suma de las declaraciones de IGV del año, la inconsistencia salta sin que nadie la busque.

! En los sistemas contables actuales el balance casi nunca descuadra, porque el software no permite grabar asientos desbalanceados. El riesgo se desplazó: hoy el error típico no es aritmético sino de **clasificación** (cuenta equivocada) o de **periodo** (gasto registrado en el mes que no corresponde). Por eso la revisión mensual ya no consiste en sumar, sino en mirar cada saldo y preguntarse si tiene sentido, y en comparar cada cuenta con el mes anterior buscando variaciones que nadie pueda explicar.`,
  claves:['El balance de comprobación valida que debe = haber y es la base de los estados financieros.','Deben cumplirse tres igualdades, incluida la del total del Diario con el total mayorizado.','Diferencia divisible entre 9 sugiere transposición de dígitos; divisible entre 2, un importe del lado equivocado.','Hay cinco errores que cuadran igual: omisión total, duplicación completa, cuenta equivocada del mismo signo, importe errado en ambos lados y error de periodo.','La hoja de trabajo no es un libro oficial: es la herramienta para ver el efecto de los ajustes antes de registrarlos.'],
  preg:[
   {p:'¿Por qué la diferencia producida por una transposición de dígitos siempre es múltiplo de 9?',
    r:'Porque al intercambiar dos dígitos de posiciones distintas, la diferencia entre el número correcto y el escrito equivale a la diferencia entre esos dígitos multiplicada por la diferencia entre los valores posicionales, y esos valores posicionales (10, 100, 1000...) difieren siempre en múltiplos de 9: 100 − 10 = 90, 1000 − 100 = 900. Por eso, si tu descuadre es 540, puedes dividirlo entre 9 y obtener 60, lo que te dice que buscas dos dígitos que difieren en 6 intercambiados entre la posición de las decenas y las centenas. Es una pista concreta, no magia.'},
   {p:'Si el software impide grabar asientos descuadrados, ¿el balance de comprobación perdió utilidad?',
    r:'Perdió su función aritmética, pero ganó otra: hoy sirve como vista panorámica para la revisión analítica. Se compara cada saldo con el del mes o el año anterior y se buscan variaciones que nadie pueda explicar, saldos de signo imposible, cuentas puente que debieron quedar en cero y cuentas que no se movieron cuando debieron moverse. Esa revisión detecta los errores de clasificación y de periodo, que son los que hoy realmente ocurren, y es además el punto de partida de la auditoría.'},
   {p:'Una empresa omitió registrar por completo una factura de compra de S/ 11,800. ¿Cuadra su balance de comprobación? ¿Cómo se detecta esa omisión?',
    r:'Cuadra perfectamente, porque faltan los dos lados del asiento: no hay descuadre que delate nada. Se detecta por fuentes externas: la conciliación del SIRE la muestra de inmediato, porque SUNAT tiene el comprobante que el proveedor emitió; también la detectaría la conciliación de la cuenta del proveedor con su estado de cuenta, o el inventario físico si se trata de mercadería que está en el almacén sin haber ingresado contablemente. Es el mejor ejemplo de por qué la contabilidad necesita controles que vengan de afuera.'},
   {p:'¿Qué significa el "corte de operaciones" o cut-off al cierre y por qué importa?',
    r:'Es la verificación de que cada operación quedó registrada en el periodo que le corresponde: que las últimas compras recibidas en diciembre estén en diciembre aunque la factura llegue en enero, y que las ventas facturadas en enero no estén en diciembre. Importa porque un error de corte no descuadra nada pero traslada utilidad de un ejercicio a otro, lo que afecta el impuesto de los dos años, la participación de los trabajadores y la comparabilidad. En auditoría es una de las pruebas estándar: se revisan los documentos de los últimos días del ejercicio y los primeros del siguiente.'},
   {p:'La hoja de trabajo no es un libro oficial ni se legaliza. ¿Por qué entonces se sigue usando?',
    r:'Porque permite simular: ver cómo quedarían los estados financieros con los ajustes antes de registrarlos en los libros, que es algo que no se puede deshacer fácilmente. Sirve para discutir con la gerencia el efecto de una provisión, para cuadrar la utilidad antes de calcular participaciones e impuestos, y para que el auditor siga el camino desde el saldo en libros hasta la cifra presentada. En la práctica moderna la hoja de trabajo vive en una hoja de cálculo y es el papel de trabajo principal del cierre.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un balance de comprobación tiene saldos deudores por S/ 412,000 y acreedores por S/ 409,300. ¿De cuánto es el descuadre?',
    u:'S/',r:2700,tol:0,
    s:'Descuadre = 412,000 − 409,300 = **S/ 2,700**\n\nPista de diagnóstico: 2,700 ÷ 9 = 300 exacto, lo que apunta a una **transposición de dígitos**. Busca importes como 3,000 registrado como 300, o 5,400 invertido a 2,700. También 2,700 ÷ 2 = 1,350, así que la segunda hipótesis es un movimiento de S/ 1,350 registrado en el lado equivocado. Se revisan ambas antes de ir asiento por asiento.'},
   {l:1,t:'mc',p:'El balance de comprobación cuadra, pero el alquiler se registró en la cuenta 60 Compras. ¿Qué ocurre?',
    o:['Nada, si cuadra está correcto','El balance cuadra pero el Estado de Resultados queda mal clasificado y el inventario puede distorsionarse','El sistema lo corrige automáticamente','Solo afecta al IGV'],r:1,
    s:'El balance cuadra porque el importe está en el debe igual que si estuviera en la 63, pero la información queda mal. La cuenta 60 se destina luego a existencias vía la cuenta 61, así que un alquiler registrado ahí puede terminar sumado al costo del inventario, inflando el activo y alterando el costo de ventas. Además el análisis de gastos por naturaleza queda falseado. Cuadrar es un control aritmético, no un control de calidad contable.'},
   {l:2,t:'num',p:'Con el balance del ejemplo (ventas 85,000; costo de ventas 52,000; gastos de personal 14,500; servicios de terceros 6,000), ¿cuál es la utilidad antes de impuestos?',
    u:'S/',r:12500,tol:1,
    s:'Ventas 85,000 − costo de ventas 52,000 = utilidad bruta S/ 33,000\nMenos gastos de personal 14,500 y servicios de terceros 6,000\n**Utilidad antes de impuestos = S/ 12,500**\n\nMargen bruto 38.8%, margen antes de impuestos 14.7%. Antes de darla por buena hay que verificar que estén registrados los ajustes del periodo: depreciación, vacaciones devengadas, estimación de cobranza dudosa y servicios consumidos no facturados. Sin esos ajustes, la utilidad siempre sale mejor de lo real, que es el tema del siguiente subtema.'},
   {l:2,t:'ab',p:'El balance arroja una diferencia de S/ 540. Explica las dos hipótesis más probables y cómo verificarías cada una en diez minutos.',
    s:'**Hipótesis 1 — Transposición de dígitos.** 540 ÷ 9 = 60 exacto, señal clásica. Un número se registró con dígitos intercambiados: 1,980 por 1,440, 720 por 180, 2,340 por 1,800. **Verificación rápida:** exportar el Diario del periodo a una hoja de cálculo y buscar pares de importes con los mismos dígitos en distinto orden; o filtrar los asientos cuyo importe termine en los mismos dos dígitos que el descuadre.\n\n**Hipótesis 2 — Importe en el lado equivocado.** 540 ÷ 2 = 270. Un movimiento de S/ 270 que debía ir al debe se registró al haber (o al revés) genera exactamente el doble de diferencia. **Verificación rápida:** buscar en el Diario todos los movimientos de S/ 270 y revisar si el lado es el correcto según la naturaleza de la cuenta.\n\n**Tercera posibilidad a descartar:** un asiento con un solo movimiento, si el sistema lo permitió (por ejemplo, un asiento importado de otro módulo). Se detecta filtrando asientos cuya suma de debe no iguale la de haber a nivel de asiento, no de periodo.\n\n**Lo que no se debe hacer nunca:** crear una cuenta "diferencias por regularizar" y cargar ahí los S/ 540 para que cuadre. Un auditor lo marca de inmediato, y si el importe crece con el tiempo acaba siendo imposible de depurar. Además, si la diferencia viene de un desvío de efectivo, ese asiento lo convierte en permanente.'},
   {l:3,t:'ab',p:'Con el balance de comprobación del tema (descuadre de S/ 4,000), asume que el error fue registrar una cobranza de S/ 2,000 cargando dos veces la cuenta 101 Caja en lugar de cargar caja y abonar la cuenta por cobrar. Corrige y presenta el balance cuadrado con la utilidad del ejercicio.',
    s:'**El error:** se registró "Debe 101 Caja 2,000 / Debe 101 Caja 2,000" en lugar de "Debe 101 Caja 2,000 / Haber 1212 Facturas por cobrar 2,000". Efecto: caja sobrevaluada en S/ 2,000, cuentas por cobrar sobrevaluadas en S/ 2,000 y el debe total excedió al haber en S/ 4,000.\n\n**Corrección (lo más limpio es extornar el asiento completo y rehacerlo):**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 101 | Caja (extorno del doble cargo) | | 4,000.00 |\n| 101 | Caja (registro correcto) | 2,000.00 | |\n| 1212 | Facturas por cobrar | | 2,000.00 |\n\nEfecto neto: caja −2,000 y cuentas por cobrar −2,000.\n\n**Balance de comprobación corregido**\n\n| Cuenta | Saldo Deudor | Saldo Acreedor |\n|---|---|---|\n| 101 Caja | 1,500 | |\n| 1212 Facturas por cobrar | 13,000 | |\n| 20 Mercaderías | 8,000 | |\n| 33 Inmuebles, maquinaria y equipo | 60,000 | |\n| 39 Depreciación acumulada | | 9,000 |\n| 4212 Facturas por pagar | | 16,000 |\n| 50 Capital | | 40,000 |\n| 59 Resultados acumulados | | 5,000 |\n| 70 Ventas | | 85,000 |\n| 69 Costo de ventas | 52,000 | |\n| 62 Gastos de personal | 14,500 | |\n| 63 Servicios de terceros | 6,000 | |\n| **Totales** | **155,000** | **155,000** |\n\n**Resultado del ejercicio:** 85,000 − (52,000 + 14,500 + 6,000) = **utilidad de S/ 12,500**\n\n**Comprobación por la ecuación contable:**\nActivo = 1,500 + 13,000 + 8,000 + 60,000 − 9,000 = S/ 73,500\nPasivo = S/ 16,000\nPatrimonio = 40,000 + 5,000 + 12,500 = S/ 57,500\n16,000 + 57,500 = **S/ 73,500** ✓\n\nLa ecuación cierra, y el eslabón que la hace cerrar es justamente la utilidad de S/ 12,500. Ese es el mecanismo que la hoja de trabajo hace visible en sus dos últimos pares de columnas.'}
  ],
  proy:{
   t:'Balance de comprobación y hoja de trabajo de tu empresa',
   ctx:`Con dos meses de operaciones mayorizadas, ya puedes producir el documento que resume toda la contabilidad en una página. Y vas a construir la hoja de trabajo, que es el papel donde los contadores realmente trabajan en el cierre.`,
   pasos:[
    'Elabora el balance de comprobación de tu empresa al cierre del segundo mes, con los cuatro pares de columnas: sumas del debe, sumas del haber, saldo deudor y saldo acreedor.',
    'Verifica las tres igualdades: sumas entre sí, saldos entre sí, y el total de las sumas contra el total de tu Libro Diario acumulado.',
    'Introduce a propósito un error en una copia del balance (una transposición de dígitos) y entrégasela a otra persona, o déjala reposar un día, para luego encontrarlo con las técnicas del subtema. Documenta cuánto tardaste.',
    'Monta la hoja de trabajo de diez columnas en una hoja de cálculo, con los saldos de tu balance en el primer par. Deja las columnas de ajustes vacías por ahora: las llenarás en el subtema 2.4.',
    'Clasifica cada cuenta en las columnas de Estado de Resultados o de Estado de Situación Financiera, y comprueba que la utilidad aparece como diferencia en las dos.',
    'Haz la revisión analítica: compara cada saldo del mes 2 con el del mes 1 y escribe una explicación de toda variación mayor al 20%.'
   ],
   entrega:[
    'Balance de comprobación con las tres igualdades verificadas.',
    'El registro del ejercicio de búsqueda del error, con el tiempo que tomó y la técnica que funcionó.',
    'La hoja de trabajo de diez columnas montada y con la utilidad cuadrando por los dos lados.',
    'La revisión analítica con las explicaciones de las variaciones.'
   ],
   crit:[
    'Las tres igualdades se cumplen exactamente.',
    'La utilidad calculada por el par de columnas de resultados coincide con la del par de situación financiera.',
    'Cada variación mayor al 20% tiene una explicación concreta, no "aumentó la actividad".'
   ],
   pista:'Monta la hoja de trabajo con fórmulas, no con números escritos a mano. Vas a usarla en los tres subtemas siguientes y cada ajuste que agregues debe recalcular sola.'
  },
  proyInt:{
   t:'El primer paquete de información para el banco',
   integra:'1.1 a 2.3',
   ctx:`Imagina que tu empresa necesita una línea de capital de trabajo y el banco pide información contable. Vas a armar el paquete con lo que tienes, y a descubrir qué falta todavía. Este proyecto obliga a mirar tu trabajo con ojos de un tercero exigente que no te conoce.`,
   pasos:[
    'Arma un paquete con: balance de comprobación al cierre del segundo mes, estado de situación financiera preliminar, estado de resultados preliminar de los dos meses, y el detalle de las cuentas por cobrar y por pagar por tercero.',
    'Agrega la conciliación bancaria del último mes y el extracto que la sustenta.',
    'Redacta una nota de una página que explique: a qué se dedica la empresa, cómo se financia hoy, para qué necesita la línea y cómo piensa pagarla.',
    'Calcula los cuatro indicadores que el banco va a mirar: liquidez corriente, prueba ácida, endeudamiento patrimonial y margen neto. Interprétalos en dos líneas cada uno.',
    'Haz una lista honesta de las debilidades de tu información: qué le falta a tu contabilidad para que un analista de riesgos la encuentre confiable (por ejemplo, que aún no están registrados los ajustes de depreciación y provisiones).',
    'Revisa el expediente completo con los ojos del banco y marca todo lo que generaría una pregunta incómoda.'
   ],
   entrega:[
    'El paquete completo de información financiera.',
    'La nota de una página de solicitud.',
    'Los cuatro indicadores con su interpretación.',
    'La lista de debilidades de la información.'
   ],
   crit:[
    'Los estados preliminares son coherentes entre sí y con el balance de comprobación.',
    'La interpretación de los indicadores reconoce lo malo, no solo lo bueno.',
    'La lista de debilidades menciona al menos los ajustes pendientes del subtema siguiente.'
   ],
   pista:'Un analista de riesgos mira primero tres cosas: si la empresa genera caja, si tiene concentración en pocos clientes y si las cuentas por cobrar están envejeciendo. Prepara esas tres respuestas antes de que te las pregunten.'
  },
  fuentes:[
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'el balance de comprobación, los errores que no detecta y la hoja de trabajo de diez columnas'},
   {a:'William A. Paton y A. C. Littleton', o:'An Introduction to Corporate Accounting Standards', n:'la relación entre el registro, el resultado y la presentación'},
   {a:'Alvin A. Arens, Randal J. Elder y Mark S. Beasley', o:'Auditing and Assurance Services', n:'revisión analítica, pruebas de corte de operaciones y su papel en el cierre'},
   {a:'Mario Apaza Meza', o:'Estados financieros: formulación, análisis e interpretación conforme a las NIIF', n:'del balance de comprobación a la formulación de los estados financieros'},
   {a:'SUNAT', o:'Resoluciones anuales que aprueban la declaración jurada anual del Impuesto a la Renta', n:'la obligación de presentar el balance de comprobación como anexo según el nivel de ingresos'}
  ]
 },
 {
  id:'m2t4', titulo:'Ajustes contables: devengo, depreciación y estimaciones', min:24,
  cont:`Los ajustes son los asientos que hacen que los estados financieros digan la verdad. Sin ellos, los libros muestran solo lo que pasó por caja y por factura, y se omite todo lo que ocurrió económicamente sin que llegara un documento. Kieso los llama **adjusting entries** y señala una característica que conviene memorizar: **todo asiento de ajuste afecta al menos una cuenta de resultado y al menos una cuenta de balance**, y ninguno toca el efectivo.

# El principio detrás de todo: el devengo
Los efectos de las transacciones se reconocen **cuando ocurren**, no cuando se cobra o se paga. De ahí se derivan dos ideas operativas:

- **Correlación de ingresos y gastos**: los gastos se reconocen en el mismo periodo que los ingresos que ayudaron a generar. El costo de la mercadería se reconoce cuando se vende, no cuando se compra.
- **Periodificación**: los costos que benefician a varios periodos se distribuyen entre ellos. Un seguro anual no es gasto del mes en que se pagó.

$ Resultado = Ingresos devengados − Gastos devengados
$ No es:     Cobros − Pagos

En el Perú el devengo tampoco es solo contable: el artículo 57 de la Ley del Impuesto a la Renta, con la definición incorporada por el Decreto Legislativo 1425, lo adopta para la renta de tercera categoría. El criterio general es que el ingreso se devenga cuando se han producido los hechos sustanciales para generarlo y el derecho no está sujeto a condición suspensiva, con independencia de la oportunidad de cobro.

# Las dos familias de ajustes
|Familia|Qué corrige|Tipos|
|**Diferimientos**|Dinero que ya se movió, pero el hecho económico aún no ocurrió del todo|Gastos pagados por anticipado; ingresos cobrados por anticipado|
|**Acumulaciones (devengos)**|El hecho económico ya ocurrió, pero el dinero no se ha movido|Gastos devengados no pagados; ingresos devengados no cobrados|

A esas dos se suman las **estimaciones**: depreciación, amortización, deterioro y provisiones, que no dependen de que haya dinero de por medio sino de una medición.

# 1. Depreciación
Distribuye el costo de un activo fijo a lo largo de su vida útil. No es una provisión para reponer el activo ni una estimación de su valor de mercado: es la **asignación sistemática del costo** al periodo que recibe su beneficio.

|Método|Fórmula|Cuándo refleja mejor el consumo|
|Línea recta|(Costo − Valor residual) ÷ Vida útil|Beneficio uniforme en el tiempo: edificios, mobiliario|
|Unidades de producción|(Costo − Residual) × (Unidades del periodo ÷ Unidades totales)|Desgaste por uso: maquinaria, vehículos de carga|
|Decreciente (saldo decreciente)|Tasa fija sobre el valor en libros|Activos que rinden más al inicio: equipos tecnológicos|

La NIC 16 exige que el método refleje el patrón esperado de consumo de los beneficios. La norma tributaria peruana, en cambio, fija **porcentajes máximos** y exige línea recta para edificios:

|Bien|Tasa tributaria máxima|
|Edificios y construcciones|5% anual, línea recta|
|Maquinaria y equipo usados en la actividad|10% anual|
|Vehículos de transporte terrestre (excepto ferrocarriles)|20% anual|
|Equipos de procesamiento de datos|25% anual|
|Muebles y enseres|10% anual|
|Ganado de trabajo y reproducción, redes de pesca|25% anual|
|Otros bienes del activo fijo|10% anual|

$ Depreciación lineal anual = (Costo − Valor residual) ÷ Vida útil
$ Depreciación mensual = Depreciación anual ÷ 12

@ 31/12/2026 — Depreciación anual de maquinaria: costo S/ 120,000, vida útil 10 años
@ 68|6814 Depreciación de maquinaria y equipo|12,000.00|
@ 39|39132 Maquinaria y equipo de explotación||12,000.00

Dos reglas que se olvidan: la depreciación **empieza cuando el activo está disponible para su uso**, no cuando se compra; y **no se detiene** porque el activo esté inactivo, salvo en el método de unidades de producción. Además, tributariamente la depreciación solo es deducible si está **contabilizada** dentro del ejercicio, lo que convierte un olvido de registro en una deducción perdida.

# 2. Gastos devengados no facturados
El consumo de luz de diciembre cuya factura llega en enero ya es gasto de diciembre:

@ 31/12 — Provisión de servicios públicos de diciembre pendientes de facturar
@ 63|6364 Energía eléctrica|1,800.00|
@ 46|4699 Otras cuentas por pagar diversas||1,800.00

! Ojo con el IGV en este ajuste: el **gasto** es de diciembre por devengo, pero el **crédito fiscal** solo puede ejercerse cuando se tiene el comprobante, es decir en enero. Son dos reglas distintas que conviven, y por eso la provisión se registra por el importe sin IGV, contra una cuenta por pagar diversa y no contra la 42, que se usa cuando ya existe el comprobante.

# 3. Gastos e ingresos pagados o cobrados por adelantado
Un seguro anual pagado en julio por S/ 12,000 corresponde a seis meses de este año y seis del siguiente. Al cierre, S/ 6,000 son gasto y S/ 6,000 quedan como activo en la cuenta 18 Servicios y otros contratados por anticipado. En el lado de los ingresos, un alquiler cobrado por adelantado es un pasivo (cuenta 122) hasta que transcurra el periodo arrendado.

# 4. Estimación de cuentas de cobranza dudosa
Cuando hay evidencia de que un cliente no pagará, se reconoce el deterioro **sin dar de baja el derecho**: la deuda sigue existiendo y se sigue gestionando la cobranza.

@ 31/12 — Estimación de cobranza dudosa, cliente con mora mayor a 12 meses
@ 68|6841 Estimación de cuentas de cobranza dudosa|9,000.00|
@ 19|1911 Facturas por cobrar - Terceros||9,000.00

Para que esta estimación sea **deducible** tributariamente, el artículo 37 inciso i de la LIR y su reglamento exigen tres cosas: que se demuestre la dificultad financiera del deudor (análisis documentado, protesto, gestiones de cobro acreditadas o mora mayor a doce meses), que la provisión esté **discriminada** en el Libro de Inventarios y Balances, y que figure al cierre del ejercicio. Una provisión global por un porcentaje de la cartera, sin análisis caso por caso, es reparable.

# 5. Desvalorización de existencias
La NIC 2 obliga a medir el inventario al menor valor entre costo y **valor neto realizable**. Si el inventario quedó obsoleto o su precio de venta cayó por debajo del costo, se reconoce la pérdida (cuenta 695 contra la 29). Tributariamente no es deducible hasta acreditar el desmedro con destrucción ante notario y comunicación previa a SUNAT.

# 6. Provisión de beneficios sociales devengados
Vacaciones, gratificaciones y CTS ganadas pero no pagadas al cierre son pasivo y gasto del periodo. Es el ajuste que más se olvida en las MYPES y el que más distorsiona la utilidad.

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

La utilidad cayó S/ 19,200, un 23%. Si el dueño hubiera repartido utilidades sobre los S/ 85,000, habría repartido dinero que no existía, y además habría pagado impuesto sobre una base inflada.

> **Ajustes mensuales o solo anuales.** La norma exige que los estados financieros anuales estén ajustados, pero una empresa que solo ajusta en diciembre navega once meses con información falsa: ve utilidades que no existen y toma decisiones sobre ellas. La buena práctica es ajustar **todos los meses** al menos la depreciación, las provisiones laborales y los devengos de servicios. Cuesta una hora al mes y evita la sorpresa de diciembre.`,
  claves:['Todo asiento de ajuste afecta una cuenta de resultado y una de balance, y ninguno toca el efectivo.','Dos familias: diferimientos (el dinero se movió antes) y acumulaciones (el hecho ocurrió antes), más las estimaciones.','La depreciación empieza cuando el activo está disponible para usarse y debe estar contabilizada para ser deducible.','El gasto devengado no facturado se provisiona sin IGV: el crédito fiscal se ejerce recién con el comprobante.','La cobranza dudosa exige análisis caso por caso y discriminación en el Libro de Inventarios y Balances para ser deducible.'],
  preg:[
   {p:'¿Por qué se dice que la depreciación no es una reserva de dinero para reponer el activo?',
    r:'Porque el asiento de depreciación no mueve efectivo: carga un gasto y acredita una cuenta de valuación. No se aparta dinero en ningún lado. Si la empresa quiere tener fondos para reponer la máquina, tiene que hacer algo adicional, como ahorrar o invertir deliberadamente. La depreciación solo reconoce que una parte del costo ya invertido se consumió. La confusión viene de que, al reducir la utilidad, la depreciación reduce la base de reparto de dividendos, lo que indirectamente conserva recursos en la empresa, pero eso es un efecto, no su propósito.'},
   {p:'Una empresa olvidó registrar la depreciación del ejercicio. ¿Puede deducirla el año siguiente junto con la de ese año?',
    r:'No. La norma tributaria peruana exige que la depreciación esté contabilizada en el ejercicio correspondiente para ser deducible en él, y no permite acumular en un año la que correspondía a otro. La depreciación no registrada se pierde como deducción de ese ejercicio. Contablemente, además, la omisión es un error de periodos anteriores que la NIC 8 obliga a corregir retroactivamente, reexpresando las cifras comparativas, no cargándola al resultado del año corriente.'},
   {p:'¿Por qué la provisión de un servicio devengado no facturado se registra contra la cuenta 46 y no contra la 42?',
    r:'Porque la cuenta 42 recoge obligaciones respaldadas por comprobantes de pago recibidos, y aquí todavía no hay comprobante: hay una obligación cierta por un servicio consumido, pero sin documento. La cuenta 46 Cuentas por pagar diversas es la adecuada para esa obligación estimada. Cuando llega la factura en el periodo siguiente, se extorna la provisión y se registra el comprobante en la 42 con su IGV, que recién entonces es crédito fiscal. Mantener la distinción permite saber en todo momento cuánto del pasivo está documentado y cuánto es estimación.'},
   {p:'Si la estimación de cobranza dudosa no da de baja el derecho de cobro, ¿para qué sirve?',
    r:'Para que el balance muestre el importe que razonablemente se espera recuperar, no el nominal. El derecho sigue vivo: la empresa puede y debe seguir cobrando, y si el cliente paga, se extorna la estimación. Lo que cambia es la medición. Dar de baja el derecho sería el castigo o write-off, que se hace cuando la incobrabilidad es definitiva y que sí requiere cumplir condiciones adicionales. La diferencia también importa legalmente: una deuda dada de baja contablemente sigue siendo exigible judicialmente mientras no prescriba.'},
   {p:'¿Qué consecuencias tiene para la gestión ajustar solo en diciembre y no cada mes?',
    r:'Durante once meses la gerencia ve una utilidad inflada, porque faltan depreciación, provisiones laborales y devengos de servicios, y toma decisiones sobre ella: fija precios, aprueba gastos, retira dinero. En diciembre aparece una caída brusca del resultado que nadie entiende y que suele atribuirse a "un mal mes". Además, el trabajo se acumula en el peor momento del año y la probabilidad de error crece. Ajustar mensualmente cuesta poco porque los cálculos son los mismos divididos entre doce, y mantiene la información útil todo el año.'}
  ],
  ej:[
   {l:1,t:'num',p:'Una computadora cuesta S/ 4,800 y se deprecia al 25% anual. ¿Cuánto es la depreciación mensual?',
    u:'S/',r:100,tol:0.5,
    s:'Depreciación anual = 4,800 × 25% = S/ 1,200\nDepreciación mensual = 1,200 ÷ 12 = **S/ 100**\n\nAsiento mensual: debe 6814 (o la divisionaria que corresponda al tipo de bien) por S/ 100, haber 39133 Equipos diversos por S/ 100. Se registra desde el mes en que el bien **empieza a estar disponible para su uso**, no desde la fecha de la factura: la norma tributaria exige además que esté afectado a la generación de renta.'},
   {l:1,t:'mc',p:'La factura de teléfono de diciembre llega el 8 de enero. ¿En qué periodo se reconoce el gasto?',
    o:['En enero, cuando llega la factura','En diciembre, porque el servicio se consumió en diciembre','Cuando se paga','Se puede elegir cualquiera de los dos'],r:1,
    s:'En diciembre, por devengo: el servicio se consumió en ese mes. Al cierre se provisiona contra la cuenta 46, por el importe sin IGV. En enero, cuando llega la factura, se extorna la provisión y se registra el comprobante con su IGV. El gasto es de diciembre pero el crédito fiscal es de enero: dos reglas distintas que conviven sin contradecirse.'},
   {l:2,t:'num',p:'Una empresa paga el 1 de setiembre de 2026 una póliza de seguro de un año por S/ 18,000. ¿Qué importe queda como activo (cuenta 18) al 31/12/2026?',
    u:'S/',r:12000,tol:1,
    s:'La póliza cubre del 01/09/2026 al 31/08/2027.\nConsumido en 2026: setiembre a diciembre = 4 meses → 18,000 × 4/12 = S/ 6,000 de gasto.\nPendiente al 31/12/2026 = 18,000 − 6,000 = **S/ 12,000** en la cuenta 18.\n\nAsiento de ajuste:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6513 | Seguros | 6,000.00 | |\n| 18 | Servicios contratados por anticipado | | 6,000.00 |\n\nSi se hubiera cargado todo a gasto en setiembre, la utilidad de 2026 estaría subvaluada en S/ 12,000 y la de 2027 sobrevaluada en el mismo monto.'},
   {l:2,t:'ab',p:'Un camión costó S/ 180,000, está disponible para uso desde el 15/03/2026, con vida útil real de 8 años y valor residual de S/ 20,000. Calcula la depreciación contable de 2026 y compárala con el máximo tributario.',
    s:'**Depreciación contable (NIC 16):**\nBase depreciable = 180,000 − 20,000 = S/ 160,000\nDepreciación anual = 160,000 ÷ 8 = S/ 20,000 → mensual S/ 1,666.67\nMeses de uso en 2026, desde marzo = 10\n**Depreciación contable 2026 = S/ 16,666.67**\n\n**Máximo tributario:**\nTasa máxima para vehículos de transporte terrestre: 20% anual sobre el costo, sin deducir valor residual.\n180,000 × 20% = S/ 36,000 anuales → S/ 3,000 mensuales\nMáximo por 10 meses = **S/ 30,000**\n\n**Comparación:** la empresa deprecia S/ 16,666.67 y el tope es S/ 30,000. Como la contable es **menor** que el máximo, es íntegramente deducible y no hay adición. Pero aparece un efecto temporal: la depreciación tributaria solo se acepta en la medida en que esté contabilizada, así que la empresa deduce S/ 16,666.67 y no los S/ 30,000 que podría. Deprecia más lento y deducirá durante más años, lo que genera una **diferencia temporal** que se gestiona con la NIC 12.\n\n**Si fuera al revés** (contable S/ 40,000 frente a un tope de S/ 36,000), el exceso de S/ 4,000 sería una **adición** en la declaración anual, deducible en ejercicios posteriores cuando la depreciación contable se agote y aún quede tope tributario disponible.'},
   {l:3,t:'ab',p:'Una empresa presenta utilidad de S/ 240,000 antes de ajustes al 31/12/2026. Faltan: depreciación de edificio (costo S/ 900,000, en uso todo el año, tasa 5%); vacaciones devengadas S/ 32,000; gratificación de diciembre devengada y no pagada S/ 18,000 más su bonificación extraordinaria del 9%; alquiler de enero 2027 pagado en diciembre S/ 7,000; e inventario con costo S/ 40,000 cuyo valor neto realizable es S/ 31,000. Determina la utilidad ajustada con los asientos.',
    s:'**Ajuste 1 — Depreciación del edificio:** 900,000 × 5% = **S/ 45,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6813 | Depreciación de edificaciones | 45,000.00 | |\n| 3912 | Depreciación acumulada - Edificaciones | | 45,000.00 |\n\n**Ajuste 2 — Vacaciones devengadas: S/ 32,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6214 | Vacaciones | 32,000.00 | |\n| 4151 | Vacaciones por pagar | | 32,000.00 |\n\n**Ajuste 3 — Gratificación más bonificación extraordinaria.** La bonificación del 9% equivale al aporte de EsSalud que el empleador no paga sobre las gratificaciones y que se entrega al trabajador: 18,000 × 9% = S/ 1,620. Total **S/ 19,620**.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6213 | Gratificaciones | 18,000.00 | |\n| 6291 | Bonificación extraordinaria Ley 30334 | 1,620.00 | |\n| 4114 | Gratificaciones por pagar | | 19,620.00 |\n\n**Ajuste 4 — Alquiler de enero 2027 pagado en diciembre:** no es gasto de 2026. Si se cargó a gasto, se reclasifica al activo; el efecto sobre la utilidad es **+S/ 7,000**.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 18 | Servicios contratados por anticipado | 7,000.00 | |\n| 6352 | Alquiler de edificaciones | | 7,000.00 |\n\n**Ajuste 5 — Desvalorización de existencias (NIC 2):** 40,000 − 31,000 = **S/ 9,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6951 | Desvalorización de mercaderías | 9,000.00 | |\n| 2911 | Mercaderías - Desvalorización | | 9,000.00 |\n\n**Utilidad ajustada**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad antes de ajustes | 240,000 |\n| Depreciación de edificio | (45,000) |\n| Vacaciones devengadas | (32,000) |\n| Gratificación y bonificación | (19,620) |\n| Alquiler de 2027 reclasificado | 7,000 |\n| Desvalorización de inventario | (9,000) |\n| **Utilidad ajustada** | **141,380** |\n\n**Lectura del caso:** la utilidad cayó 41%. Dos observaciones tributarias que hay que anticipar: la **desvalorización** no es deducible hasta acreditar el desmedro, así que los S/ 9,000 serán probablemente una adición temporal; y las **vacaciones** son deducibles en el ejercicio del devengo solo si se pagan dentro del plazo de presentación de la declaración anual, y si no, se deducen cuando se paguen. Ninguna de las dos cosas cambia el registro contable, que debe reflejar la realidad económica, pero ambas aparecen en la conciliación y generan impuesto diferido.'}
  ],
  proy:{
   t:'Los ajustes del cierre de tu empresa',
   ctx:`Tu contabilidad tiene dos meses de operaciones y una hoja de trabajo montada en el subtema anterior con las columnas de ajustes vacías. Ha llegado el momento de llenarlas. Este es el trabajo que separa una contabilidad de registro de una contabilidad que informa.`,
   pasos:[
    'Arma el cuadro de activos fijos de tu empresa: por cada bien, costo, fecha en que quedó disponible para su uso, vida útil estimada, valor residual, método, depreciación del periodo y acumulada. Agrega una columna con la tasa tributaria máxima y marca si hay exceso.',
    'Calcula y registra la depreciación de los dos meses transcurridos.',
    'Identifica al menos dos gastos devengados y no facturados de tu empresa (servicios, intereses, honorarios) y provisiónalos, cuidando de no incluir IGV.',
    'Identifica al menos un gasto pagado por anticipado y periodifícalo.',
    'Provisiona los beneficios sociales devengados de tus trabajadores por los dos meses: vacaciones, gratificaciones y CTS, usando los criterios del Módulo de laboral que verás más adelante y, por ahora, un doceavo mensual de cada uno.',
    'Si tu empresa tiene inventarios, compara el costo de tus tres productos principales con su valor neto realizable y registra la desvalorización si corresponde.',
    'Traslada todos los ajustes a las columnas 3 y 4 de tu hoja de trabajo y obtén los saldos ajustados.'
   ],
   entrega:[
    'El cuadro de activos fijos completo, con la comparación contable frente a tributaria.',
    'Los asientos de ajuste, cada uno con su glosa y su cálculo de respaldo.',
    'La hoja de trabajo con las columnas de ajustes y saldos ajustados llenas.',
    'Un cuadro de una página: utilidad antes de ajustes, cada ajuste y utilidad ajustada.'
   ],
   crit:[
    'Cada ajuste afecta una cuenta de resultado y una de balance, y ninguno toca el efectivo.',
    'La provisión de servicios devengados no incluye IGV.',
    'El cuadro de activos fijos permite recalcular la depreciación sin consultar otra fuente.',
    'La utilidad ajustada está explicada ajuste por ajuste, no solo presentada.'
   ],
   pista:'Si tu utilidad no baja tras los ajustes, revisa: lo normal es que baje. Una empresa con trabajadores y activos fijos que ajusta por primera vez suele perder entre el 15% y el 40% de la utilidad aparente.'
  },
  proyInt:{
   t:'La utilidad real frente a la utilidad aparente',
   integra:'1.1 a 2.4',
   ctx:`Este proyecto junta todo el curso hasta aquí y produce el documento más incómodo y más útil que un contador le entrega a un dueño: la diferencia entre lo que creía que ganaba y lo que realmente ganó, explicada línea por línea.`,
   pasos:[
    'Toma la utilidad que arrojaba tu contabilidad antes de ajustes al cierre del segundo mes.',
    'Construye un cuadro de conciliación que parta de esa cifra y llegue a la utilidad ajustada, con una línea por ajuste y una columna que indique si el ajuste nació del devengo, de una periodificación o de una estimación.',
    'Para cada ajuste, señala qué documento o cálculo lo sustenta y dónde está archivado, enlazándolo con el expediente documental de 1.6.',
    'Calcula el efecto de los ajustes sobre tres cosas: la utilidad, el patrimonio y los indicadores que preparaste para el banco en el proyecto integrador de 2.3. Rehaz esos cuatro indicadores con las cifras ajustadas.',
    'Revisa si alguno de tus ajustes tendría tratamiento tributario distinto del contable y anótalo en una lista llamada "diferencias para la conciliación anual". Esa lista es la semilla del módulo de cierre tributario.',
    'Escribe el informe para el dueño: por qué la utilidad bajó, por qué eso es una buena noticia y qué decisión suya cambia con la nueva cifra.'
   ],
   entrega:[
    'Cuadro de conciliación de utilidad aparente a utilidad ajustada.',
    'Los cuatro indicadores recalculados, comparados con los del proyecto de 2.3.',
    'La lista de diferencias para la conciliación anual.',
    'El informe al dueño.'
   ],
   crit:[
    'Cada ajuste del cuadro tiene sustento identificado y localizable.',
    'Los indicadores recalculados muestran el efecto real: si empeoraron, se dice.',
    'El informe explica por qué una utilidad menor y correcta es mejor que una mayor y falsa, con un argumento concreto, no retórico.'
   ],
   pista:'La frase que mejor funciona con un dueño es esta: "La utilidad que veías antes incluía dinero que ya le pertenece a tus trabajadores y al desgaste de tus máquinas. Repartirla era repartir deuda".'
  },
  fuentes:[
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'los asientos de ajuste, su clasificación en diferimientos y acumulaciones, y la regla de que nunca tocan el efectivo'},
   {a:'IASB', o:'NIC 16 Propiedades, planta y equipo', n:'métodos de depreciación, inicio del cómputo y patrón de consumo de beneficios'},
   {a:'IASB', o:'NIC 2 Inventarios', n:'medición al menor entre costo y valor neto realizable'},
   {a:'Ley del Impuesto a la Renta, artículos 37 y 57, y D.L. 1425', o:'Deducciones y criterio de devengo', n:'requisitos de la provisión de cobranza dudosa y la definición legal de devengo'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'condiciones para que las provisiones y estimaciones sean deducibles'},
   {a:'Martha Abanto Bromley', o:'Plan Contable General Empresarial: aplicación práctica', n:'cuentas y dinámica de las estimaciones y provisiones del cierre'}
  ]
 },
 {
  id:'m2t5', titulo:'Cierre del ejercicio y asientos de cierre', min:21,
  cont:`El cierre convierte el flujo del año en una foto. Las cuentas de resultado (clases 6, 7, 8 y 9) se cancelan porque pertenecen a un periodo que terminó; las cuentas de balance (clases 1 a 5) se mantienen y pasan al ejercicio siguiente. Esa distinción es la que da sentido a la expresión "cuentas temporales" y "cuentas permanentes".

# Por qué se cierran las cuentas de resultado
Si las ventas de 2026 no se cancelaran, en 2027 la cuenta 70 arrastraría el saldo del año anterior y sería imposible saber cuánto se vendió en cada ejercicio. El cierre pone en cero el marcador para que el periodo siguiente sea medible y comparable. El saldo que queda es la utilidad, que se traslada al patrimonio, donde sí es permanente.

# La secuencia completa del cierre
1. Verificar que todos los comprobantes del ejercicio estén registrados y conciliados con el SIRE.
2. Conciliar bancos, cuentas por cobrar, cuentas por pagar y tributos.
3. Realizar el **inventario físico** y ajustar diferencias, con su sustento.
4. Registrar los ajustes de cierre (el subtema anterior).
5. Determinar el **costo de ventas** definitivo.
6. Cancelar la clase 9 contra la cuenta 79.
7. Cancelar ingresos y gastos para determinar el resultado.
8. Calcular la **participación de los trabajadores** y el **Impuesto a la Renta**.
9. Trasladar el resultado neto a la cuenta 59 Resultados acumulados.
10. Formular los estados financieros y preparar el Libro de Inventarios y Balances.
11. Someter los estados financieros a la junta y acordar el destino del resultado.
12. Registrar el asiento de apertura del ejercicio siguiente.

# Los asientos, en orden
@ 31/12 — Cancelación de la clase 9 contra la cuenta 79
@ 79|Cargas imputables a cuentas de costos y gastos|260,000.00|
@ 92|Costos de producción||85,000.00
@ 94|Gastos de administración||95,000.00
@ 95|Gastos de ventas||80,000.00

@ 31/12 — Cancelación de ingresos y gastos para determinar el resultado
@ 70|Ventas|620,000.00|
@ 69|Costo de ventas||390,000.00
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

> La cuenta **89 Determinación del resultado del ejercicio** funciona como cuenta puente: recibe ingresos y gastos, y su saldo es la utilidad (acreedor) o la pérdida (deudor) antes de participaciones e impuesto. Luego se le descuentan ambos y lo que queda se traslada a la 59. Si al final del cierre la cuenta 89 no queda en cero, algo quedó sin cancelar.

# Participación de los trabajadores
El Decreto Legislativo 892 obliga a las empresas generadoras de renta de tercera categoría **con más de 20 trabajadores** a repartir un porcentaje de la renta anual antes de impuestos:

|Actividad|Porcentaje|
|Empresas pesqueras, de telecomunicaciones e industriales|10%|
|Empresas mineras, de comercio al por mayor y menor y restaurantes|8%|
|Empresas que realizan otras actividades|5%|

$ Participación = Renta neta antes de participaciones × porcentaje
$ 50% se distribuye por días efectivamente laborados
$ 50% se distribuye en proporción a las remuneraciones percibidas

Hay un tope individual: ningún trabajador puede recibir más de 18 remuneraciones mensuales por este concepto, y el exceso se destina a un fondo de capacitación regional. La participación es **gasto deducible** del ejercicio si se paga dentro del plazo de presentación de la declaración anual.

! Las empresas con 20 trabajadores o menos **no reparten utilidades**. Provisionar participaciones en una MYPE de ocho trabajadores reduce la utilidad sin obligación legal y el gasto es reparable. El número de trabajadores se determina según las reglas del propio decreto, considerando el promedio del ejercicio.

# Reserva legal y destino del resultado
Determinada la utilidad neta, la junta decide su destino. Antes de cualquier reparto corresponde la **reserva legal**: 10% de la utilidad distribuible, hasta que la reserva alcance la quinta parte del capital pagado (artículo 229 de la Ley General de Sociedades).

Ejemplo: utilidad neta S/ 25,380, capital S/ 100,000, reserva actual S/ 3,000.
- Tope de la reserva: 20% de 100,000 = S/ 20,000. Falta S/ 17,000.
- Detracción del ejercicio: 10% de 25,380 = **S/ 2,538**.

@ Acuerdo de junta — Constitución de reserva legal
@ 59|5911 Utilidades acumuladas|2,538.00|
@ 58|5821 Reserva legal||2,538.00

Las opciones de destino del saldo son tres: **distribuir** como dividendos (con retención de renta de segunda categoría a los socios personas naturales domiciliadas), **capitalizar** (aumento de capital con inscripción registral) o **mantener** como resultados acumulados.

# El Libro de Inventarios y Balances
Recoge el detalle de los saldos al cierre: relación de cuentas por cobrar por cliente, detalle del activo fijo, composición del inventario, discriminación de las provisiones. No es un formalismo: varias deducciones tributarias, como la cobranza dudosa, exigen que el detalle esté ahí. Un balance presentado sin ese detalle deja sin sustento deducciones que sí se tomaron.

# El asiento de apertura del ejercicio siguiente
El 1 de enero se reabren las cuentas de balance con el mismo saldo con que cerraron:

@ 01/01/2027 — Apertura del ejercicio
@ 10|Efectivo y equivalentes de efectivo|48,000.00|
@ 12|Cuentas por cobrar comerciales|121,000.00|
@ 20|Mercaderías|184,000.00|
@ 33|Inmuebles, maquinaria y equipo|540,000.00|
@ 39|Depreciación acumulada||120,000.00
@ 42|Cuentas por pagar comerciales||96,000.00
@ 50|Capital||400,000.00
@ 58|Reservas||38,000.00
@ 59|Resultados acumulados||239,000.00

Las cuentas de resultado empiezan el año en cero: esa es la prueba de que el cierre se hizo bien.`,
  claves:['Las cuentas de resultado son temporales y se cancelan; las de balance son permanentes y pasan al ejercicio siguiente.','La cuenta 89 es la cuenta puente del cierre y debe quedar en cero cuando el proceso termina.','La participación de los trabajadores solo aplica a empresas con más de 20 trabajadores, con tasas de 5%, 8% o 10% según actividad.','La reserva legal es el 10% de la utilidad distribuible hasta alcanzar el 20% del capital pagado.','El Libro de Inventarios y Balances sustenta deducciones como la cobranza dudosa: su detalle es condición, no trámite.'],
  preg:[
   {p:'¿Qué pasaría si una empresa no cancelara sus cuentas de resultado al cierre?',
    r:'Las ventas, compras y gastos del año nuevo se sumarían a los del año anterior y sería imposible medir el desempeño de cada ejercicio: el Estado de Resultados del segundo año mostraría dos años juntos. Además, la utilidad del primer ejercicio nunca se trasladaría al patrimonio, de modo que el balance dejaría de cuadrar o mostraría un patrimonio desactualizado. El cierre no es un ritual: es lo que hace que cada periodo sea una unidad de medida.'},
   {p:'Una empresa de servicios con 25 trabajadores obtuvo renta neta de S/ 500,000. ¿Cuánto reparte y sobre qué base se calcula?',
    r:'Reparte el 5%, que es la tasa de las empresas que realizan "otras actividades", distintas de las pesqueras, de telecomunicaciones, industriales, mineras, de comercio y restaurantes. La base es la renta neta **antes** de la participación, es decir el resultado contable más las adiciones y menos las deducciones tributarias, pero sin descontar todavía la participación misma: 500,000 × 5% = S/ 25,000. Luego, la mitad se reparte por días laborados y la otra mitad en proporción a las remuneraciones de cada trabajador.'},
   {p:'¿Por qué la participación de los trabajadores se calcula antes del Impuesto a la Renta y no después?',
    r:'Porque la participación es un gasto deducible para determinar la renta imponible: si se calculara después del impuesto, se estaría gravando una porción que por ley pertenece a los trabajadores. El orden es: renta neta antes de participaciones, se calcula y deduce la participación, y sobre el resultado se aplica la tasa del impuesto. Invertir el orden infla la base imponible y hace pagar impuesto de más.'},
   {p:'La reserva legal reduce los resultados acumulados pero no la utilidad del ejercicio. ¿Por qué?',
    r:'Porque no es un gasto: no hay consumo de recursos ni obligación con un tercero. Es una restricción a la disponibilidad del patrimonio que la ley impone para proteger a los acreedores, reteniendo dentro de la empresa una parte de las utilidades que de otro modo podrían repartirse. Por eso el asiento ocurre íntegramente dentro del patrimonio: debita resultados acumulados y acredita reservas, sin pasar por el Estado de Resultados. El patrimonio total no cambia; cambia su composición y su disponibilidad.'},
   {p:'¿Qué revisarías para saber si un cierre se hizo correctamente, mirando solo el balance de comprobación posterior al cierre?',
    r:'Que ninguna cuenta de las clases 6, 7, 8 y 9 tenga saldo: todas deben estar en cero. Que la cuenta 89 esté en cero. Que el total del activo iguale al de pasivo más patrimonio. Que la utilidad trasladada a la cuenta 59 coincida con la del Estado de Resultados. Y que los saldos de las cuentas de balance sean exactamente los del asiento de apertura del ejercicio siguiente. Si alguna cuenta de resultado quedó con saldo, el cierre está incompleto y la utilidad del nuevo ejercicio nacerá contaminada.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Al cerrar el ejercicio, ¿qué pasa con la cuenta 70 Ventas?',
    o:['Mantiene su saldo para el año siguiente','Se cancela contra la cuenta 89 y queda en cero','Se traslada al activo','Se convierte en capital'],r:1,
    s:'Se cancela. Las cuentas de ingreso corresponden a un periodo cerrado y deben empezar el ejercicio siguiente en cero, para que las ventas del año nuevo sean medibles y comparables. Se debita la 70 y se abona la 89. Las cuentas de balance sí conservan su saldo: la mercadería que quedó en el almacén el 31 de diciembre sigue ahí el 1 de enero.'},
   {l:1,t:'mc',p:'Una empresa comercial tiene 14 trabajadores y renta neta de S/ 300,000. ¿Cuánto provisiona por participación de los trabajadores?',
    o:['S/ 24,000 (8%)','S/ 15,000 (5%)','S/ 30,000 (10%)','Nada: la obligación aplica a empresas con más de 20 trabajadores'],r:3,
    s:'Nada. El D.L. 892 obliga solo a las empresas con más de 20 trabajadores. Si la empresa provisionara el 8% de todas formas, reduciría su utilidad sin obligación legal y el gasto sería reparado en una fiscalización, con impuesto, multa e intereses. Distinto es un bono voluntario por desempeño, que sí es deducible si cumple generalidad y se paga oportunamente.'},
   {l:2,t:'num',p:'Una empresa industrial con 35 trabajadores tiene renta neta antes de participaciones de S/ 800,000. ¿Cuánto es la participación de los trabajadores?',
    u:'S/',r:80000,tol:1,
    s:'Las empresas industriales reparten el **10%**.\nParticipación = 800,000 × 10% = **S/ 80,000**\n\nAsiento: debe 6291 Participación de los trabajadores S/ 80,000, haber 4131 Participaciones por pagar S/ 80,000.\n\nDe ese total, S/ 40,000 se reparten en proporción a los días efectivamente laborados y S/ 40,000 en proporción a las remuneraciones percibidas en el año. El tope individual es de 18 remuneraciones mensuales por trabajador, y el exceso va a un fondo de capacitación regional.'},
   {l:2,t:'num',p:'Utilidad neta del ejercicio S/ 180,000. Capital pagado S/ 400,000. Reserva legal acumulada S/ 76,000. ¿Cuánto se detrae para reserva legal?',
    u:'S/',r:4000,tol:1,
    s:'Tope de la reserva = 20% × 400,000 = S/ 80,000\nReserva acumulada = S/ 76,000 → falta **S/ 4,000** para el tope\nDetracción del 10% de la utilidad = S/ 18,000, pero solo puede llevarse hasta el tope\n\n**Detracción del ejercicio: S/ 4,000**\n\nCompletado el 20% del capital, cesa la obligación. Los S/ 176,000 restantes quedan a disposición de la junta: distribuir como dividendos (con retención del 5% a socios personas naturales domiciliadas), capitalizar o mantener como resultados acumulados. Si más adelante la empresa aumenta su capital, el tope sube y la obligación renace.'},
   {l:3,t:'ab',p:'Una empresa industrial con 40 trabajadores tiene al 31/12/2026 utilidad contable antes de participaciones e impuesto de S/ 1,000,000, y en la conciliación hay adiciones no deducibles por S/ 60,000. Determina participación, Impuesto a la Renta (29.5%) y utilidad neta, con los asientos y la reserva legal (capital pagado S/ 2,000,000, reserva actual S/ 100,000).',
    s:'**Paso 1 — Base para la participación.** Se calcula sobre la renta neta tributaria antes de la participación:\nBase = 1,000,000 + 60,000 = S/ 1,060,000\nParticipación (industrial, 10%) = **S/ 106,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6291 | Participación de los trabajadores | 106,000.00 | |\n| 4131 | Participaciones por pagar | | 106,000.00 |\n\n**Paso 2 — Renta neta imponible.** La participación es deducible:\n1,060,000 − 106,000 = S/ 954,000\nImpuesto a la Renta = 954,000 × 29.5% = **S/ 281,430**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 8811 | Impuesto a la Renta corriente | 281,430.00 | |\n| 40171 | Renta de tercera categoría | | 281,430.00 |\n\n**Paso 3 — Utilidad neta contable**\n\n| Concepto | Importe |\n|---|---|\n| Utilidad antes de participaciones e impuesto | 1,000,000 |\n| Participación de los trabajadores | (106,000) |\n| Impuesto a la Renta corriente | (281,430) |\n| **Utilidad neta del ejercicio** | **612,570** |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 89 | Determinación del resultado del ejercicio | 612,570.00 | |\n| 5911 | Utilidades acumuladas | | 612,570.00 |\n\n**Paso 4 — Reserva legal.** Tope = 20% × 2,000,000 = S/ 400,000; reserva actual S/ 100,000, así que hay espacio de sobra.\nDetracción = 10% × 612,570 = **S/ 61,257**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 5911 | Utilidades acumuladas | 61,257.00 | |\n| 5821 | Reserva legal | | 61,257.00 |\n\nQueda disponible para la junta: 612,570 − 61,257 = **S/ 551,313**.\n\n**Observación técnica que suele caer en examen:** el impuesto se calculó sobre S/ 954,000, mientras que la utilidad contable antes de impuesto es S/ 894,000 (1,000,000 − 106,000). La diferencia son las adiciones. Si esas adiciones son **permanentes** (multas, gastos sin sustento), la tasa efectiva sube a 281,430 ÷ 894,000 = 31.5%. Si fueran **temporales** (una provisión aún no deducible), habría que reconocer un activo tributario diferido de 60,000 × 29.5% = S/ 17,700 según la NIC 12. Distinguir una de otra es el trabajo del módulo de cierre tributario.'}
  ],
  proy:{
   t:'El cierre completo de tu empresa',
   ctx:`Vas a cerrar el ejercicio de tu empresa. Para que el ejercicio tenga sentido, asume que los dos meses que registraste representan el año completo de operaciones, o proyéctalos a doce meses multiplicando por seis las operaciones recurrentes. Lo importante es recorrer el proceso completo, de la verificación al asiento de apertura del año siguiente.`,
   pasos:[
    'Recorre los pasos 1 a 4 de la secuencia de cierre y deja constancia escrita de cada verificación: comprobantes completos, conciliaciones cuadradas, inventario físico contado y ajustes registrados.',
    'Cancela la clase 9 contra la cuenta 79 y comprueba que ambas quedan en cero.',
    'Cancela ingresos y gastos contra la cuenta 89 y determina el resultado antes de participaciones e impuesto.',
    'Decide si tu empresa está obligada a repartir utilidades (cuenta sus trabajadores) y, si lo está, calcula la participación con la tasa de su actividad. Si no lo está, escribe por qué no corresponde.',
    'Calcula el Impuesto a la Renta con la tasa del régimen tributario que asumiste para tu empresa en el Módulo 1, y registra el asiento.',
    'Traslada el resultado neto a la cuenta 59 y calcula la reserva legal con el capital de tu empresa.',
    'Prepara el detalle del Libro de Inventarios y Balances: cuentas por cobrar por cliente, activo fijo bien por bien, composición del inventario y discriminación de provisiones.',
    'Redacta el asiento de apertura del ejercicio siguiente y verifica que las cuentas de resultado quedan en cero.'
   ],
   entrega:[
    'Acta de verificación de los pasos previos al cierre.',
    'Todos los asientos de cierre en orden, con la cuenta 89 cuadrando a cero.',
    'El cálculo de participación (o la justificación de que no corresponde) y del impuesto.',
    'El detalle del Libro de Inventarios y Balances.',
    'El asiento de apertura del ejercicio siguiente.'
   ],
   crit:[
    'Las cuentas 79, 89 y toda la clase 9 quedan en cero después del cierre.',
    'El resultado trasladado a la cuenta 59 coincide con el del Estado de Resultados.',
    'La reserva legal respeta el tope del 20% del capital pagado.',
    'El asiento de apertura reproduce exactamente los saldos de balance del cierre.'
   ],
   pista:'El error más común del primer cierre es olvidar cancelar la clase 9 antes de cancelar la clase 6, lo que deja la cuenta 79 con saldo. Sigue el orden de la secuencia y comprueba después de cada paso.'
  },
  proyInt:{
   t:'El expediente de cierre anual de tu empresa',
   integra:'1.1 a 2.5',
   ctx:`Este es el entregable más completo del curso hasta ahora: la carpeta de cierre que un contador entrega al titular de la empresa y que un auditor usaría como punto de partida. Reúne todo lo que has construido desde el primer subtema.`,
   pasos:[
    'Arma la carpeta con diez secciones: (1) manual contable y políticas, (2) plan de cuentas, (3) balance de apertura, (4) libros diarios de los periodos, (5) mayores y auxiliares, (6) conciliaciones bancarias, (7) hoja de trabajo con ajustes, (8) asientos de cierre, (9) detalle del Libro de Inventarios y Balances, (10) asiento de apertura del ejercicio siguiente.',
    'Prepara un índice con el contenido de cada sección y una hoja de control de calidad con los cruces obligatorios: debe igual a haber, cuentas de resultado en cero, cuenta 89 en cero, utilidad del Estado de Resultados igual a la trasladada al patrimonio, auxiliares cuadrados con sus mayores y conciliaciones en cero.',
    'Agrega la lista de "diferencias para la conciliación anual" que empezaste en 2.4, ahora ampliada con lo que surgió en el cierre.',
    'Redacta un memorándum de cierre de dos páginas dirigido al titular: resultado del ejercicio, patrimonio final, situación de liquidez, los tres riesgos que detectaste y la propuesta de destino del resultado.',
    'Haz una revisión final con los ojos de un auditor externo: recorre tu propia carpeta buscando lo que preguntarías si no la hubieras hecho tú, y escribe esas preguntas al final.'
   ],
   entrega:[
    'La carpeta de cierre con sus diez secciones e índice.',
    'La hoja de control de calidad con los seis cruces verificados.',
    'La lista de diferencias para la conciliación anual.',
    'El memorándum de cierre de dos páginas.',
    'La lista de preguntas de autorrevisión.'
   ],
   crit:[
    'Los seis cruces de la hoja de control están verificados con cifras, no marcados a ciegas.',
    'El memorándum propone un destino concreto del resultado, respetando la reserva legal.',
    'Las preguntas de autorrevisión son incómodas de verdad: si todas son fáciles, no revisaste bien.'
   ],
   pista:'Guarda esta carpeta en PDF con el índice al inicio. Es el documento que demuestra, mejor que cualquier certificado, que sabes llevar una contabilidad de principio a fin.'
  },
  fuentes:[
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'cuentas temporales y permanentes, asientos de cierre y balance posterior al cierre'},
   {a:'Decreto Legislativo 892', o:'Participación de los trabajadores en las utilidades', n:'porcentajes por actividad, forma de distribución y tope individual'},
   {a:'Ley 26887, Ley General de Sociedades, artículos 221 y 229', o:'Formulación de estados financieros y reserva legal', n:'plazo para someter los estados a la junta y la detracción obligatoria de la reserva'},
   {a:'Martha Abanto Bromley', o:'Plan Contable General Empresarial: aplicación práctica', n:'dinámica de las cuentas 79, 88 y 89 en el proceso de cierre'},
   {a:'SUNAT', o:'Resolución de Superintendencia 234-2006/SUNAT', n:'contenido exigido del Libro de Inventarios y Balances'}
  ]
 },
 {
  id:'m2t6', titulo:'Los estados financieros básicos', min:23,
  cont:`Los estados financieros son el producto final del ciclo. Todo lo anterior —el diario, el mayor, los ajustes, el cierre— existe para llegar aquí. La NIC 1 exige un **juego completo** de cinco elementos más las notas, y en el Perú la presentación sigue además el Manual para la Preparación de Información Financiera de la SMV para las entidades bajo su supervisión.

|Estado|Qué muestra|Naturaleza|
|Estado de Situación Financiera|Activos, pasivos y patrimonio a una fecha|Foto|
|Estado de Resultados|Ingresos y gastos de un periodo|Película|
|Estado de Resultados Integrales|El resultado más los otros resultados integrales|Película|
|Estado de Cambios en el Patrimonio Neto|Movimientos del patrimonio del periodo|Película|
|Estado de Flujos de Efectivo|Entradas y salidas de efectivo por actividad|Película|
|Notas|Políticas contables, desagregaciones y revelaciones|Explicación|

Una foto y cuatro películas: esa es la forma más simple de recordar la diferencia. El balance dice dónde estás; los demás, cómo llegaste.

# Estado de Situación Financiera
Se presenta clasificado en corriente y no corriente. **Corriente** es lo que se realizará o liquidará dentro de los doce meses siguientes **o dentro del ciclo normal de operación**, lo que sea mayor. Esa segunda parte explica por qué un inventario con rotación de 18 meses sigue siendo corriente en una empresa cuyo ciclo operativo es largo.

|ACTIVO|S/|PASIVO Y PATRIMONIO|S/|
|**Activo corriente**||**Pasivo corriente**||
|Efectivo y equivalentes|48,000|Cuentas por pagar comerciales|96,000|
|Cuentas por cobrar comerciales, neto|121,000|Tributos por pagar|31,000|
|Existencias, neto|184,000|Remuneraciones por pagar|42,000|
|Gastos pagados por anticipado|9,000|Obligaciones financieras corto plazo|60,000|
|Total activo corriente|362,000|Total pasivo corriente|229,000|
|**Activo no corriente**||**Pasivo no corriente**||
|Propiedades, planta y equipo, neto|540,000|Obligaciones financieras largo plazo|180,000|
|Intangibles, neto|26,000|Total pasivo|409,000|
|Activo tributario diferido|14,000|**Patrimonio**||
|Total activo no corriente|580,000|Capital|400,000|
|||Reserva legal|38,000|
|||Resultados acumulados|95,000|
|||Total patrimonio|533,000|
|**TOTAL ACTIVO**|**942,000**|**TOTAL PASIVO Y PATRIMONIO**|**942,000**|

> Fíjate en la palabra **"neto"** en cuentas por cobrar, existencias y propiedades: significa que ya se restaron la estimación de cobranza dudosa (19), la desvalorización (29) y la depreciación acumulada (39). Esas cuentas no aparecen como líneas propias; están incorporadas, y su detalle va en notas. Es el paso del plan de cuentas a la presentación: el PCGE tiene muchas más cuentas que líneas tiene el balance.

# Estado de Resultados
Puede presentarse **por función** (el formato usual en el Perú) o **por naturaleza**. La NIC 1 permite ambos, pero exige que, si se usa el de función, se revele en notas la información por naturaleza, porque hay datos que solo esa vista entrega, como el gasto total de personal o la depreciación del periodo.

|Concepto|Por función|Por naturaleza|
|Ventas|1,480,000|1,480,000|
|Costo de ventas|(962,000)|—|
|Variación de existencias|—|(38,000)|
|Compras de mercadería|—|(900,000)|
|Gastos de personal|—|(210,000)|
|Servicios prestados por terceros|—|(74,000)|
|Depreciación y amortización|—|(44,000)|
|Gastos de ventas|(186,000)|—|
|Gastos de administración|(142,000)|—|
|**Utilidad operativa**|**202,000**|**202,000**|

Las dos columnas llegan al mismo resultado: son dos formas de ordenar los mismos gastos, y por eso el PCGE registra ambas (clase 6 por naturaleza, clase 9 por función).

Después de la utilidad operativa vienen los resultados financieros, las participaciones y el impuesto:

|Concepto|S/|
|Utilidad operativa|202,000|
|Gastos financieros|(28,000)|
|Ingresos financieros|3,000|
|Diferencia de cambio, neta|(5,000)|
|**Utilidad antes de participaciones e impuesto**|**172,000**|
|Participación de los trabajadores|(8,600)|
|Impuesto a la Renta|(48,268)|
|**Utilidad neta del ejercicio**|**115,132**|

# Estado de Cambios en el Patrimonio Neto
Muestra el movimiento de cada componente del patrimonio: saldo inicial, aportes, resultado del ejercicio, distribuciones, transferencias a reservas y saldo final.

|Componente|Inicial|Resultado|Reserva|Dividendos|Final|
|Capital|400,000|—|—|—|400,000|
|Reserva legal|26,488|—|11,512|—|38,000|
|Resultados acumulados|91,380|115,132|(11,512)|(100,000)|95,000|
|**Total**|**517,868**|**115,132**|**0**|**(100,000)**|**533,000**|

Fíjate en que la columna de reserva suma cero: es un movimiento interno del patrimonio. Este estado es el que permite ver, de un vistazo, cuánto se repartió y cuánto se retuvo.

# Estado de Flujos de Efectivo
Explica por qué cambió la caja, separando tres actividades: **operación**, **inversión** y **financiamiento**. Se desarrolla en profundidad en el módulo de NIIF, pero conviene fijar desde ahora el patrón sano: operación positiva, inversión negativa (la empresa reinvierte) y financiamiento negativo (paga deuda y dividendos). El patrón peligroso es el inverso: operación negativa sostenida con préstamos.

# Las notas: la mitad invisible
Las notas no son un anexo decorativo. La NIC 1 exige que incluyan la base de preparación, las políticas contables significativas, los **juicios y estimaciones** con mayor efecto, la desagregación de las líneas del balance y del resultado, las partes relacionadas, los hechos posteriores y las contingencias. En empresas medianas, las notas ocupan más páginas que los estados mismos, y son donde un analista encuentra lo que los números esconden.

# Los seis cruces obligatorios antes de firmar
1. ¿El total del activo iguala pasivo más patrimonio?
2. ¿La utilidad del Estado de Resultados coincide con la del Estado de Cambios en el Patrimonio?
3. ¿El efectivo final del Estado de Flujos coincide con la línea de efectivo del Estado de Situación Financiera?
4. ¿Los saldos de tributos coinciden con las declaraciones presentadas?
5. ¿El inventario coincide con el conteo físico?
6. ¿Las notas revelan lo que la NIIF exige, incluidos los hechos posteriores al cierre?

! **Comparabilidad.** La NIC 1 exige presentar la información del ejercicio anterior en todas las cifras. Un estado financiero de una sola columna está incompleto y además es inútil: el valor del análisis está en la variación. Si se reclasificó alguna partida, hay que reexpresar también el comparativo y revelarlo.

# Quién está obligado a qué en el Perú
- **Todas las sociedades** deben formular estados financieros anuales y someterlos a la junta dentro de los tres meses siguientes al cierre (artículo 221 de la Ley General de Sociedades).
- Las entidades supervisadas por la **SMV** y las que superan los umbrales que fija la normativa presentan información financiera **auditada** ante la SMV.
- Para efectos tributarios, los estados financieros sustentan la declaración jurada anual, y determinados contribuyentes presentan el balance de comprobación como anexo.
- El **contador público colegiado** firma los estados financieros junto con el titular o el gerente, y esa firma compromete su responsabilidad profesional.`,
  claves:['El juego completo de la NIC 1 son cinco estados más las notas: una foto y cuatro películas.','Corriente es lo realizable dentro de 12 meses o del ciclo normal de operación, lo que sea mayor.','Las cuentas de valuación (19, 29, 39) no se presentan solas: van netas del activo que corrigen.','El Estado de Resultados por función exige revelar en notas la información por naturaleza.','Seis cruces antes de firmar, y cifras comparativas del ejercicio anterior en todas las partidas.'],
  preg:[
   {p:'¿Por qué la NIC 1 permite presentar el resultado por función pero exige revelar la información por naturaleza en notas?',
    r:'Porque cada vista responde preguntas distintas. La de función dice dónde se consumieron los recursos (producir, vender, administrar), que es lo que interesa para evaluar la gestión. La de naturaleza dice qué se consumió (personal, servicios, depreciación), que es lo que permite comparar entre empresas, proyectar y analizar la estructura de costos. Como la asignación por función implica juicio de la gerencia —repartir un alquiler entre áreas, por ejemplo—, la vista por naturaleza funciona además como contrapeso: es más objetiva y menos manipulable.'},
   {p:'Una empresa presenta su balance con una sola columna, la del año actual. ¿Qué incumple y por qué importa?',
    r:'Incumple la exigencia de información comparativa de la NIC 1, que forma parte de la característica cualitativa de comparabilidad. Importa porque un estado financiero aislado casi no informa: saber que el inventario es S/ 184,000 no dice nada; saber que el año pasado era S/ 120,000 y las ventas no crecieron, sí. Toda la lectura financiera es de variaciones y tendencias. Además, sin comparativo es imposible detectar cambios de criterio contable entre periodos.'},
   {p:'¿Por qué el efectivo final del Estado de Flujos debe coincidir con la línea de efectivo del balance, y qué significa si no coincide?',
    r:'Porque ambos miden lo mismo al mismo momento: el saldo de efectivo y equivalentes al cierre. El flujo de efectivo explica el camino desde el saldo inicial hasta el final, y el balance muestra ese final. Si no coinciden, el estado de flujos está mal construido, casi siempre porque se omitió una partida, se clasificó un movimiento en la actividad equivocada, o porque la definición de equivalentes de efectivo usada en un estado no es la misma que en el otro. Es el primer cruce que revisa cualquier auditor.'},
   {p:'En el Estado de Cambios en el Patrimonio, la columna de reserva legal suma cero. ¿Qué dice eso de la naturaleza de la reserva?',
    r:'Que es una reclasificación interna del patrimonio, no un ingreso ni un egreso. El dinero no entra ni sale de la empresa: solo deja de estar disponible para reparto y pasa a una cuenta restringida por ley. Por eso el total del patrimonio no cambia por efecto de la reserva, y por eso el asiento no toca el Estado de Resultados. El Estado de Cambios en el Patrimonio es justamente el estado que hace visible esa distinción entre lo que entra, lo que sale y lo que solo se mueve de sitio.'},
   {p:'¿Qué buscarías primero en las notas de una empresa que no conoces, antes de mirar sus cifras?',
    r:'La base de preparación (qué marco aplica: NIIF plenas o para PYMES), las políticas contables significativas sobre inventarios, activo fijo e ingresos, los juicios y estimaciones críticos, las transacciones con partes relacionadas, las contingencias y los hechos posteriores al cierre. Esas notas dicen cómo se construyeron los números y qué puede romperlos. Una empresa con utilidad sólida y una contingencia tributaria revelada en notas por un importe mayor a su patrimonio es un caso distinto del que sugieren sus cifras.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un préstamo bancario a 5 años, del que S/ 60,000 vencen en los próximos 12 meses y S/ 180,000 después, ¿cómo se presenta?',
    o:['Todo en pasivo no corriente','Todo en pasivo corriente','S/ 60,000 en pasivo corriente y S/ 180,000 en pasivo no corriente','En el patrimonio, por ser financiamiento'],r:2,
    s:'Se separa: la porción que vence dentro de doce meses va al pasivo corriente y el resto al no corriente. Es una de las reclasificaciones de cierre más olvidadas y distorsiona todos los ratios de liquidez: si se deja todo en no corriente, el capital de trabajo aparece mejor de lo que es, y el banco que analice el balance detectará la inconsistencia al revisar el cronograma de pagos.'},
   {l:1,t:'num',p:'Una empresa tiene activo total S/ 680,000 y patrimonio S/ 245,000. ¿Cuál es su pasivo total?',
    u:'S/',r:435000,tol:1,
    s:'Pasivo = Activo − Patrimonio = 680,000 − 245,000 = **S/ 435,000**\n\nEndeudamiento del activo = 435,000 ÷ 680,000 = 64%: casi dos tercios del activo está financiado por terceros. Endeudamiento patrimonial = 435,000 ÷ 245,000 = 1.78 veces. Por encima de 2 veces los bancos suelen encender alertas, aunque el estándar depende del sector: una empresa de servicios con pocos activos y una industrial intensiva en capital no se leen con la misma vara.'},
   {l:2,t:'num',p:'Con el Estado de Resultados del tema (ventas 1,480,000 y utilidad operativa 202,000), calcula el margen operativo en porcentaje.',
    u:'%',r:13.65,tol:0.1,
    s:'Margen operativo = 202,000 ÷ 1,480,000 = **13.65%**\n\nOtros márgenes del mismo estado: bruto = 518,000 ÷ 1,480,000 = 35.0%; neto = 115,132 ÷ 1,480,000 = 7.8%. La distancia entre el margen bruto (35%) y el operativo (13.65%) muestra que los gastos de ventas y administración consumen 22 puntos de margen: ahí conviene mirar si se busca rentabilidad, no en el precio de compra.'},
   {l:2,t:'ab',p:'Ordena estas partidas indicando corriente o no corriente: letras por cobrar a 18 meses; mercadería de rotación lenta (18 meses de stock); CTS por pagar en mayo; terreno destinado a la venta en 6 meses; préstamo a un accionista sin plazo definido.',
    s:'**1. Letras por cobrar a 18 meses → activo NO corriente.** El plazo excede los doce meses y no forma parte del ciclo de operación como partida a cobrar. Si tiene componente financiero significativo, debe medirse a valor presente, reconociendo el descuento como ingreso financiero a lo largo del plazo.\n\n**2. Mercadería con 18 meses de stock → activo CORRIENTE.** Las existencias se clasifican como corrientes porque forman parte del ciclo normal de operación, aunque ese ciclo exceda los doce meses. Lo que sí corresponde es evaluar su valor neto realizable (NIC 2) y revelar la rotación, porque 18 meses de stock anticipa deterioro.\n\n**3. CTS por pagar en mayo → pasivo CORRIENTE.** Vence dentro de los doce meses.\n\n**4. Terreno destinado a la venta en 6 meses → activo CORRIENTE**, presentado como activo no corriente mantenido para la venta (NIIF 5) si cumple los criterios: decisión de venta, disponibilidad inmediata y venta altamente probable dentro de un año. Deja de depreciarse y se mide al menor entre valor en libros y valor razonable menos costos de venta. Si no cumple los criterios, sigue en propiedades, planta y equipo, no corriente.\n\n**5. Préstamo a un accionista sin plazo definido → activo NO corriente**, en cuentas por cobrar a partes relacionadas, salvo exigibilidad inmediata documentada. Tres advertencias: debe revelarse como transacción con parte relacionada (NIC 24); debe pactarse interés no menor al que exige la norma tributaria para vinculadas, o SUNAT puede imputar interés presunto; y si en el fondo es un retiro de utilidades disfrazado, puede calificar como dividendo presunto, con una tasa que castiga mucho más que el reparto formal.'},
   {l:3,t:'ab',p:'El gerente te dice: "No entiendo nada; tenemos utilidad de S/ 115,000 pero no hay plata para pagar los sueldos". Con el balance del tema, explícale con cifras y propón tres medidas.',
    s:'**Diagnóstico con las cifras del balance**\n\n| Indicador | Cálculo | Resultado |\n|---|---|---|\n| Liquidez corriente | 362,000 ÷ 229,000 | 1.58 |\n| Prueba ácida | (362,000 − 184,000) ÷ 229,000 | 0.78 |\n| Liquidez absoluta | 48,000 ÷ 229,000 | 0.21 |\n| Capital de trabajo | 362,000 − 229,000 | 133,000 |\n\nLa empresa **es solvente pero no es líquida**. Tiene S/ 133,000 de capital de trabajo positivo, pero su dinero no está en el banco: está en existencias (S/ 184,000) y cuentas por cobrar (S/ 121,000), que juntas son el 84% del activo corriente. Con S/ 48,000 de efectivo frente a S/ 229,000 de pasivo corriente, cubre 21 céntimos de cada sol que debe en el corto plazo.\n\n**Dónde está la utilidad:** los S/ 115,132 no son dinero. Están repartidos entre inventario comprado y no vendido, facturas emitidas y no cobradas, y activos fijos adquiridos. La utilidad se mide por devengo; la caja, por cobros y pagos. Son dos cosas distintas y conviven perfectamente.\n\n**Tres medidas, en orden de impacto**\n\n**1. Acelerar la cobranza.** Con ventas de S/ 1,480,000, el periodo promedio de cobro es 121,000 ÷ 1,480,000 × 365 = **30 días**. Bajarlo a 20 libera unos S/ 40,000. Cómo: descuento por pronto pago (2% a 10 días), llamadas antes del vencimiento y no despachar a clientes con facturas vencidas.\n\n**2. Reducir el inventario.** Con costo de ventas de S/ 962,000, la rotación es 5.2 veces al año, es decir **70 días de inventario**. Llevarlo a 50 libera unos S/ 52,000. Cómo: identificar artículos sin movimiento en seis meses y liquidarlos aunque sea con margen bajo, porque el dinero inmovilizado cuesta más que el descuento.\n\n**3. Reestructurar el pasivo corriente.** Hay S/ 60,000 de deuda financiera que vence en doce meses frente a S/ 48,000 de caja. Negociar con el banco pasar parte a largo plazo alinea el plazo de la deuda con el de los activos que financia.\n\n**Lo que NO debe hacerse:** repartir dividendos sobre esos S/ 115,132. La utilidad existe, el dinero no. Un reparto obligaría a financiar el dividendo con deuda, que es la forma más rápida de convertir un problema de liquidez en uno de solvencia.\n\n**Y una recomendación de gestión:** elaborar un flujo de caja proyectado semanal a 13 semanas. El Estado de Flujos de Efectivo explica lo que ya pasó; lo que evita quedarse sin dinero para la planilla es la proyección, que no es un estado financiero sino una herramienta de gestión.'}
  ],
  proy:{
   t:'Los estados financieros de tu empresa',
   ctx:`Es el momento de producir lo que todo el módulo venía preparando. Vas a formular los estados financieros de tu empresa a partir de tu hoja de trabajo ajustada y de tus asientos de cierre, con el formato y las revelaciones que exige la NIC 1.`,
   pasos:[
    'Formula el Estado de Situación Financiera clasificado en corriente y no corriente, presentando netas las partidas que corresponda (cuentas por cobrar, existencias, activo fijo).',
    'Formula el Estado de Resultados por función, y prepara además el cuadro por naturaleza que irá en notas. Verifica que ambos lleguen a la misma utilidad operativa.',
    'Formula el Estado de Cambios en el Patrimonio Neto con las columnas de capital, reserva legal y resultados acumulados, incluyendo la reserva que calculaste en el cierre.',
    'Redacta seis notas: base de preparación, políticas contables significativas, detalle de cuentas por cobrar, detalle de activo fijo con su depreciación, detalle de obligaciones financieras con su cronograma, y hechos posteriores al cierre (inventa uno verosímil).',
    'Aplica los seis cruces obligatorios y deja constancia de cada uno con su cifra.',
    'Agrega la columna comparativa: usa el cierre del primer mes como periodo anterior para poder comparar.'
   ],
   entrega:[
    'Los tres estados financieros con columna comparativa.',
    'El cuadro de resultados por naturaleza.',
    'Las seis notas redactadas.',
    'La hoja de los seis cruces verificados con cifras.'
   ],
   crit:[
    'Las partidas netas no muestran por separado las cuentas de valuación en el cuerpo del estado; su detalle está en notas.',
    'La utilidad es la misma en el Estado de Resultados y en el Estado de Cambios en el Patrimonio.',
    'La clasificación corriente y no corriente respeta el criterio de doce meses o ciclo operativo.',
    'Los seis cruces están verificados con números, no marcados.'
   ],
   pista:'Redacta las notas en prosa, como las de una empresa real, no como una lista de rubros. Una nota bien escrita explica el criterio aplicado y da la cifra; una mal escrita solo repite el número que ya está en el estado.'
  },
  proyInt:{
   t:'Memoria contable del ejercicio: el cierre del Módulo 2',
   integra:'1.1 a 2.6',
   ctx:`Este proyecto cierra el ciclo contable completo y produce el documento que una empresa presenta a su junta de socios: la memoria del ejercicio. Integra absolutamente todo lo construido desde el subtema 1.1.`,
   pasos:[
    'Arma el documento con esta estructura: carátula, índice, carta de presentación del gerente, descripción de la empresa, estados financieros completos con comparativo, notas, y anexos (plan de cuentas, hoja de trabajo, conciliaciones).',
    'Escribe el análisis de la gestión: evolución de ventas, margen y gastos, situación de liquidez, estructura de financiamiento y las tres decisiones más importantes del ejercicio.',
    'Calcula ocho indicadores (liquidez corriente, prueba ácida, periodo de cobro, días de inventario, endeudamiento patrimonial, margen bruto, margen neto y rentabilidad del patrimonio) y preséntalos en un cuadro con su interpretación.',
    'Propón formalmente a la junta el destino del resultado, respetando la reserva legal, con la cifra exacta de cada destino.',
    'Agrega un apartado de riesgos: los tres riesgos contables, tributarios o laborales que detectaste a lo largo del curso en tu empresa, con su posible impacto en soles.',
    'Cierra con un apartado de mejoras: qué cambiarías en el sistema contable de la empresa para el ejercicio siguiente, enlazando con la lista de preguntas abiertas que vienes arrastrando desde 1.2.'
   ],
   entrega:[
    'La memoria contable completa, de entre diez y quince páginas con sus anexos.',
    'El cuadro de los ocho indicadores con interpretación.',
    'La propuesta de destino del resultado.',
    'Los apartados de riesgos y de mejoras.'
   ],
   crit:[
    'La memoria se sostiene sola: un socio que no conoce la empresa entiende qué pasó en el ejercicio leyéndola.',
    'Los ocho indicadores están interpretados en términos del negocio, no definidos.',
    'La propuesta de destino del resultado cuadra exactamente con la utilidad disponible.',
    'Los riesgos están cuantificados en soles, aunque sea de forma aproximada.'
   ],
   pista:'Esta memoria y el expediente de cierre de 2.5 son, juntos, el portafolio completo del ciclo contable. A partir del Módulo 3 vas a construir sobre esta misma empresa su dimensión tributaria, laboral y de costos: guarda todo ordenado y fechado.'
  },
  fuentes:[
   {a:'IASB', o:'NIC 1 Presentación de estados financieros', n:'juego completo, clasificación corriente y no corriente, comparabilidad y revelaciones mínimas'},
   {a:'Donald E. Kieso, Jerry J. Weygandt y Terry D. Warfield', o:'Intermediate Accounting', n:'estructura de cada estado y los cruces entre ellos'},
   {a:'Alejandro Ferrer Quea', o:'Estados Financieros: análisis e interpretación por sectores económicos', n:'formulación y lectura de los estados en el contexto peruano'},
   {a:'Mario Apaza Meza', o:'Estados financieros: formulación, análisis e interpretación conforme a las NIIF', n:'notas, desagregaciones y presentación según el marco peruano'},
   {a:'SMV', o:'Manual para la Preparación de Información Financiera', n:'formatos y requisitos de presentación para entidades supervisadas'},
   {a:'Ley 26887, Ley General de Sociedades, artículo 221', o:'Formulación de estados financieros', n:'obligación de formularlos y someterlos a junta dentro de los tres meses'}
  ]
 }
 ]
}
);
