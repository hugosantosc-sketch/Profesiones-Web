/* Contenido del curso — m5
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
 id:'m5', nivel:'Avanzado', titulo:'Costos y contabilidad de gestión',
 resumen:'Valuar inventarios, calcular el costo de producción, medir el punto de equilibrio y presupuestar: la contabilidad que sirve para decidir.',
 temas:[
 {
  id:'m5t1', titulo:'Valuación de inventarios: NIC 2, PEPS y promedio', min:16,
  cont:`La NIC 2 Inventarios gobierna una de las partidas más grandes del balance de cualquier empresa comercial o industrial, y la que más afecta la utilidad: cada sol mal valuado en el inventario es un sol de utilidad mal medida.

# La regla central
$ Inventario = el MENOR entre Costo y Valor Neto Realizable (VNR)
$ VNR = Precio de venta estimado − Costos de terminación − Costos necesarios para la venta

# Qué entra al costo y qué no
|Sí forma parte del costo|No forma parte (es gasto del periodo)|
|Precio de compra|IGV que es crédito fiscal|
|Aranceles e impuestos no recuperables|Descuentos comerciales obtenidos (reducen el costo)|
|Fletes, seguros y estiba hasta el almacén|Costos de almacenamiento posterior|
|Costos de transformación (mano de obra y costos indirectos)|Gastos de administración y de ventas|
|Costos de preparación del producto para la venta|Mermas anormales y desperdicios extraordinarios|

> Caso práctico peruano: una importadora compra mercadería por US$ 10,000, paga flete marítimo US$ 800, seguro US$ 120, derechos arancelarios S/ 2,400, gastos de agencia de aduanas S/ 1,500 y almacenaje en el puerto por demora propia S/ 900. Todo entra al costo **excepto** el almacenaje por demora, que es una ineficiencia, no un costo necesario para poner el bien en condiciones de venta. El IGV de importación tampoco entra: es crédito fiscal.

# Métodos de valuación permitidos
La NIC 2 permite **PEPS** (primeras entradas, primeras salidas) y **promedio ponderado**. El método **UEPS** (últimas entradas, primeras salidas) está **prohibido**. La norma tributaria peruana (artículo 62 de la LIR) admite PEPS, promedio, identificación específica, inventario al detalle o por menor, y existencias básicas; el método elegido debe aplicarse de forma uniforme y su cambio requiere autorización.

# PEPS frente a promedio ponderado: el mismo caso, dos resultados
Movimientos de un producto en el mes:

|Fecha|Operación|Unidades|Costo unitario|
|01/06|Inventario inicial|100|20.00|
|08/06|Compra|150|24.00|
|15/06|Venta|180|—|
|22/06|Compra|120|26.00|
|28/06|Venta|130|—|

**Método PEPS**
$ Venta del 15/06 (180 u): 100 × 20 + 80 × 24 = 2,000 + 1,920 = 3,920
$ Quedan: 70 u a 24 y luego entran 120 a 26
$ Venta del 28/06 (130 u): 70 × 24 + 60 × 26 = 1,680 + 1,560 = 3,240
$ Costo de ventas total = 7,160   ·   Inventario final = 60 × 26 = 1,560

**Método promedio ponderado móvil**
$ Antes del 15/06: (100×20 + 150×24) ÷ 250 = 5,600 ÷ 250 = 22.40
$ Venta del 15/06: 180 × 22.40 = 4,032 → quedan 70 u a 22.40 = 1,568
$ Antes del 28/06: (1,568 + 120×26) ÷ 190 = 4,688 ÷ 190 = 24.6737
$ Venta del 28/06: 130 × 24.6737 = 3,207.58
$ Costo de ventas total = 7,239.58   ·   Inventario final = 60 × 24.6737 = 1,480.42

|Resultado|PEPS|Promedio|
|Costo de ventas|7,160.00|7,239.58|
|Inventario final|1,560.00|1,480.42|
|Utilidad (si las ventas fueron 12,000)|4,840.00|4,760.42|

Con precios en alza, **PEPS da menor costo de ventas, mayor utilidad y mayor inventario**; el promedio suaviza el efecto. Ninguno es "mejor": lo que importa es aplicarlo de forma consistente, porque cambiar de método para mejorar un resultado es una modificación de política contable que debe revelarse y justificarse.

# El Registro de Inventario Permanente
La norma tributaria exige llevar registros de inventario según el nivel de ingresos:

|Ingresos brutos anuales|Obligación|
|Más de 1,500 UIT|Registro de Inventario Permanente Valorizado (en unidades y valorizado)|
|De 500 a 1,500 UIT|Registro de Inventario Permanente en Unidades Físicas|
|Hasta 500 UIT|Inventario físico al cierre del ejercicio|

! **Las diferencias de inventario son uno de los reparos más caros.** Si el conteo físico arroja menos unidades que el registro, SUNAT puede presumir **ventas omitidas** y determinar IGV y Renta sobre esa base presunta, además de desconocer el gasto por el faltante. Para que una merma o desmedro sea deducible hay que acreditarla: la **merma** con un informe técnico emitido por profesional independiente competente y colegiado, con la metodología y las pruebas empleadas; el **desmedro** con la destrucción ante notario (o juez de paz a falta de notario), previa comunicación a SUNAT con la antelación que la norma exige.

# Asientos de la desvalorización
@ 31/12 — Inventario con costo S/ 85,000 y valor neto realizable S/ 71,000
@ 69|6951 Desvalorización de mercaderías|14,000.00|
@ 29|2911 Mercaderías - Desvalorización||14,000.00

Si en un periodo posterior el VNR se recupera, la NIC 2 permite **revertir** la desvalorización hasta el costo original, nunca por encima.`,
  claves:['NIC 2: el inventario se mide al menor entre costo y valor neto realizable.','Al costo entran compra, aranceles no recuperables, fletes, seguros y costos de transformación; no entran el IGV crédito fiscal, el almacenaje posterior ni las mermas anormales.','PEPS y promedio ponderado están permitidos; UEPS está prohibido por la NIC 2.','Con precios al alza, PEPS muestra mayor utilidad e inventario que el promedio ponderado.','Las mermas se acreditan con informe técnico de profesional independiente y los desmedros con destrucción ante notario y comunicación previa a SUNAT.'],
  ej:[
   {l:1,t:'mc',p:'Según la NIC 2, ¿cuál de estos métodos de valuación está prohibido?',
    o:['PEPS (primeras entradas, primeras salidas)','Promedio ponderado','UEPS (últimas entradas, primeras salidas)','Identificación específica'],r:2,
    s:'El UEPS está prohibido por la NIC 2. La razón es que, en contextos inflacionarios, deja en el balance inventarios valuados a costos muy antiguos, alejados de la realidad económica. La NIC 2 permite PEPS, promedio ponderado y, para partidas no intercambiables, la identificación específica. La norma tributaria peruana admite además el inventario al detalle o por menor y las existencias básicas.'},
   {l:1,t:'num',p:'Una mercadería tiene costo de S/ 50,000. Su precio de venta estimado es S/ 55,000 y los costos para venderla son S/ 8,000. ¿A qué valor se presenta en el balance?',
    u:'S/',r:47000,tol:1,
    s:'Valor Neto Realizable = 55,000 − 8,000 = S/ 47,000\nCosto = S/ 50,000\n\nSe presenta al **menor: S/ 47,000**, reconociendo una desvalorización de S/ 3,000 (debe 6951, haber 2911).\n\nNota tributaria: esa desvalorización **no es deducible** mientras no se concrete el desmedro con destrucción ante notario y comunicación previa a SUNAT, o se venda efectivamente el bien por debajo del costo. Por eso aparece como adición temporal en la conciliación anual y genera un activo tributario diferido de 3,000 × 29.5% = S/ 885.'},
   {l:2,t:'num',p:'Inventario inicial: 200 u a S/ 15. Compra: 300 u a S/ 18. Venta: 350 u. Con promedio ponderado, ¿cuál es el costo de ventas?',
    u:'S/',r:5880,tol:5,
    s:'Costo promedio = (200 × 15 + 300 × 18) ÷ 500 = (3,000 + 5,400) ÷ 500 = 8,400 ÷ 500 = **S/ 16.80** por unidad\n\nCosto de ventas = 350 × 16.80 = **S/ 5,880**\nInventario final = 150 × 16.80 = S/ 2,520\nComprobación: 5,880 + 2,520 = 8,400 ✓\n\nCon PEPS el resultado sería distinto: 200 × 15 + 150 × 18 = 3,000 + 2,700 = S/ 5,700 de costo de ventas y S/ 2,700 de inventario final. La diferencia de S/ 180 en el costo se traslada íntegra a la utilidad.'},
   {l:2,t:'ab',p:'Una importadora trae mercadería: valor FOB US$ 20,000; flete US$ 1,500; seguro US$ 200; tipo de cambio S/ 3.75; derechos arancelarios S/ 6,000; IGV de importación S/ 15,500; gastos de agencia de aduanas S/ 2,200; almacenaje por demora propia en el puerto S/ 1,100; flete del puerto al almacén S/ 900. Determina el costo del inventario.',
    s:'**Conversión del valor CIF:**\nFOB 20,000 + flete 1,500 + seguro 200 = US$ 21,700\nCIF en soles = 21,700 × 3.75 = **S/ 81,375**\n\n**Costo del inventario:**\n\n| Concepto | Importe | ¿Al costo? |\n|---|---|---|\n| Valor CIF | 81,375.00 | Sí |\n| Derechos arancelarios | 6,000.00 | Sí: impuesto no recuperable |\n| Gastos de agencia de aduanas | 2,200.00 | Sí: necesario para disponer del bien |\n| Flete del puerto al almacén | 900.00 | Sí: costo hasta la ubicación actual |\n| **Costo total del inventario** | **90,475.00** | |\n| IGV de importación | 15,500.00 | **No**: es crédito fiscal |\n| Almacenaje por demora propia | 1,100.00 | **No**: ineficiencia, gasto del periodo |\n\n**Costo unitario**, si la importación fue de 1,000 unidades: 90,475 ÷ 1,000 = **S/ 90.475** por unidad.\n\n**Asientos:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6011 | Mercaderías - Costo | 90,475.00 | |\n| 40111 | IGV - Cuenta propia (importación) | 15,500.00 | |\n| 6391 | Gastos de almacenaje (demora) | 1,100.00 | |\n| 4212 / 1041 | Proveedores y pagos efectuados | | 107,075.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 2011 | Mercaderías - Costo | 90,475.00 | |\n| 6111 | Variación de mercaderías | | 90,475.00 |\n\n**Por qué importa la distinción:** si los S/ 1,100 de almacenaje se hubieran activado, el inventario quedaría sobrevaluado y la utilidad del periodo también (el gasto se diferiría hasta la venta). Y si se hubiera activado el IGV de S/ 15,500, el error sería grave: el inventario estaría sobrevaluado en 17% y se habría perdido el crédito fiscal. Ambos errores se encuentran con frecuencia en importadoras pequeñas que registran la DUA por su importe total.'},
   {l:3,t:'ab',p:'Al 31/12/2026 el Registro de Inventario Permanente Valorizado de una ferretería muestra 4,200 unidades de un producto a S/ 38 cada una (S/ 159,600). El conteo físico arroja 3,850 unidades. El gerente dice "pon la diferencia como merma y listo". Explica por qué no es tan simple y qué debe hacerse.',
    s:'**La diferencia:** 4,200 − 3,850 = **350 unidades** · 350 × 38 = **S/ 13,300** de faltante.\n\n**Por qué no se puede registrar como merma sin más:**\n\n1. **Merma y desmedro no son lo mismo, y un faltante no es ninguno de los dos.** La *merma* es la pérdida física en volumen, peso o cantidad por causas inherentes a la naturaleza del bien o al proceso (evaporación, secado, mermas de corte). El *desmedro* es la pérdida de calidad que hace al bien inutilizable. Un **faltante de inventario** en una ferretería no es ni una cosa ni la otra: lo más probable es robo, error de registro, mercadería despachada sin facturar o venta no registrada.\n\n2. **Para deducir una merma se exige un informe técnico** emitido por un profesional independiente, competente y colegiado, que detalle la metodología y las pruebas realizadas. Un porcentaje afirmado sin sustento es reparable.\n\n3. **Para deducir un desmedro** se exige la destrucción de los bienes ante notario (o juez de paz a falta de notario), previa comunicación a SUNAT con la antelación que fija la norma. Si los bienes no existen físicamente, no hay nada que destruir y no cabe el desmedro.\n\n4. **El riesgo mayor es la presunción de ventas omitidas.** El Código Tributario faculta a SUNAT a determinar la obligación sobre base presunta cuando existen diferencias de inventario. Para 350 unidades faltantes, la determinación se haría al **valor de venta**, no al costo. Si el precio de venta es S/ 55:\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Ventas presuntas | 350 × 55 | 19,250 |\n| IGV omitido | 19,250 × 18/118 (o sobre base, según el método) | ~2,936 |\n| Renta: base de la presunción | 19,250 | |\n| Impuesto a la Renta | 19,250 × 29.5% | ~5,679 |\n| Costo no deducible (faltante sin sustento) | 13,300 × 29.5% | ~3,924 |\n| Multas (50% del tributo omitido, antes de gradualidad) | | ~4,300 |\n| **Exposición aproximada** | | **~16,800** |\n\n**Qué debe hacerse, en este orden:**\n\n1. **Investigar antes de registrar.** Revisar las guías de remisión sin factura asociada, las notas de salida de almacén, los despachos de los últimos meses, los accesos al almacén y las ventas registradas frente a las salidas. En la mayoría de los casos, una parte de la diferencia es un error de registro que se puede corregir documentadamente, y eso reduce el faltante real.\n2. **Registrar lo que corresponda según la causa.** Si es un error de registro, se corrige el kardex con el documento que lo acredita. Si se confirma un robo, se denuncia policialmente: la pérdida por delito es deducible cuando se prueba judicialmente el hecho o se acredita que es inútil ejercitar la acción judicial, con la denuncia como punto de partida.\n3. **Ajustar el inventario al conteo físico**, cualquiera sea la conclusión: el balance debe mostrar lo que existe.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6591 | Pérdidas por faltantes de inventario | 13,300.00 | |\n| 2011 | Mercaderías - Costo | | 13,300.00 |\n\n4. **Adicionar el gasto en la declaración anual** si no se logró sustentar, reconociéndolo como diferencia permanente, y dejar constancia del análisis en los papeles de trabajo del cierre. Es mejor adicionar S/ 13,300 voluntariamente que exponerse a una determinación sobre base presunta.\n5. **Implementar el control que faltaba:** conteos cíclicos mensuales por familia de productos en lugar de un único inventario anual. Un faltante detectado en un mes se investiga; uno detectado doce meses después ya no tiene rastro documental, y ese es precisamente el problema de este caso.'}
  ]
 },
 {
  id:'m5t2', titulo:'Elementos del costo y hoja de costos de producción', min:16,
  cont:`En una empresa industrial el costo no se compra: se construye. La contabilidad de costos acumula los tres elementos que transforman materia prima en producto terminado.

# Los tres elementos del costo
|Elemento|Qué incluye|Cuenta PCGE|
|Materia prima directa|Insumos que se identifican físicamente en el producto|24 / 6021|
|Mano de obra directa|Remuneraciones del personal que transforma el producto|62 → clase 9|
|Costos indirectos de fabricación (CIF)|Todo lo demás de la planta: supervisión, energía, depreciación de maquinaria, mantenimiento, materiales auxiliares|60, 62, 63, 68 → clase 9|

$ Costo de producción = Materia prima directa + Mano de obra directa + CIF
$ Costo primo = Materia prima directa + Mano de obra directa
$ Costo de conversión = Mano de obra directa + CIF

# Directo frente a indirecto, fijo frente a variable
Son dos clasificaciones distintas y hay que tener ambas en la cabeza:

|—|Variable (cambia con el volumen)|Fijo (no cambia con el volumen)|
|Directo|Materia prima, mano de obra a destajo|Alquiler de una máquina dedicada a un producto|
|Indirecto|Energía de la planta, materiales auxiliares|Depreciación de la planta, sueldo del supervisor|

# El flujo de las existencias en producción
$ Materia prima: Inicial + Compras − Final = Materia prima consumida
$ Productos en proceso: Inicial + Costo de producción del periodo − Final = Costo de productos terminados
$ Productos terminados: Inicial + Terminados − Final = COSTO DE VENTAS

Las tres fórmulas son la misma idea aplicada a tres almacenes sucesivos, y se encadenan: lo que sale de uno entra al siguiente.

# Hoja de costos de producción
Fábrica de muebles, mes de setiembre de 2026:

|Concepto|Importe|
|Inventario inicial de materia prima|18,000|
|(+) Compras de materia prima|96,000|
|(−) Inventario final de materia prima|(22,000)|
|**Materia prima consumida**|**92,000**|
|Mano de obra directa|64,000|
|**Costo primo**|**156,000**|
|CIF: mano de obra indirecta|18,000|
|CIF: energía y agua de planta|9,500|
|CIF: depreciación de maquinaria|7,200|
|CIF: materiales auxiliares|4,300|
|CIF: mantenimiento|3,000|
|**Total CIF**|**42,000**|
|**Costo de producción del periodo**|**198,000**|
|(+) Inventario inicial de productos en proceso|12,000|
|(−) Inventario final de productos en proceso|(15,000)|
|**Costo de productos terminados**|**195,000**|
|(+) Inventario inicial de productos terminados|25,000|
|(−) Inventario final de productos terminados|(30,000)|
|**COSTO DE VENTAS**|**190,000**|

Si en el mes se terminaron 650 muebles, el costo unitario de producción es 195,000 ÷ 650 = **S/ 300** por mueble.

# Asignación de los CIF
Los costos indirectos no se pueden rastrear directamente al producto, así que se distribuyen con una **tasa predeterminada**:

$ Tasa CIF = CIF presupuestados del periodo ÷ Base de asignación presupuestada
$ Bases usuales: horas-máquina, horas de mano de obra directa, unidades producidas, costo de materia prima

Ejemplo: CIF presupuestados S/ 504,000 al año y 12,000 horas-máquina presupuestadas → tasa de **S/ 42 por hora-máquina**. Un lote que consume 180 horas-máquina recibe 180 × 42 = S/ 7,560 de CIF.

Al cierre se compara lo aplicado con lo realmente incurrido:
- **CIF subaplicados** (lo real fue mayor): se ajusta aumentando el costo de ventas.
- **CIF sobreaplicados** (lo real fue menor): se ajusta reduciéndolo.

! **La capacidad ociosa no se activa.** La NIC 2 es explícita: la distribución de los costos indirectos fijos se basa en la **capacidad normal** de producción. Si la planta produjo muy por debajo de su capacidad normal, los costos fijos no absorbidos se reconocen como **gasto del periodo**, no se cargan al inventario. Una fábrica que trabajó al 40% de su capacidad no puede inflar el costo unitario de sus productos para "esconder" los fijos en el almacén: eso sobrevalúa el inventario y diferiría una pérdida que ya ocurrió.

# Registro en las clases 8 y 9
@ Consumo de materia prima del mes
@ 61|6121 Variación de materias primas|92,000.00|
@ 24|2411 Materias primas - Costo||92,000.00

@ Acumulación del costo de producción (destino de los gastos de planta)
@ 92|Costos de producción|198,000.00|
@ 79|Cargas imputables a costos y gastos||198,000.00

@ Ingreso de productos terminados al almacén
@ 21|2111 Productos terminados|195,000.00|
@ 71|7111 Variación de productos terminados||195,000.00`,
  claves:['Tres elementos: materia prima directa, mano de obra directa y costos indirectos de fabricación.','Costo primo = MP + MOD; costo de conversión = MOD + CIF.','El flujo encadena tres almacenes: materia prima, productos en proceso y productos terminados.','Los CIF se asignan con una tasa predeterminada sobre una base (horas-máquina, horas de MOD, unidades).','La NIC 2 obliga a distribuir los CIF fijos según la capacidad normal: la capacidad ociosa es gasto del periodo, no costo del inventario.'],
  ej:[
   {l:1,t:'num',p:'Materia prima inicial S/ 14,000; compras S/ 68,000; materia prima final S/ 11,000. ¿Cuánto es la materia prima consumida?',
    u:'S/',r:71000,tol:1,
    s:'Materia prima consumida = Inicial + Compras − Final\n= 14,000 + 68,000 − 11,000 = **S/ 71,000**\n\nEsa es la cifra que entra al costo de producción, no las compras. Es un error frecuente usar las compras del mes como consumo: solo coinciden cuando el inventario inicial y el final son iguales, lo que casi nunca ocurre.'},
   {l:1,t:'mc',p:'El sueldo del supervisor de planta, ¿qué tipo de costo es?',
    o:['Mano de obra directa','Costo indirecto de fabricación','Gasto de administración','Gasto de ventas'],r:1,
    s:'Es un costo indirecto de fabricación: pertenece a la planta (por eso es costo y no gasto), pero no se puede identificar con un producto específico (por eso es indirecto). La mano de obra directa es la del operario que transforma físicamente el producto. Si el supervisor fuera de la oficina administrativa, sería gasto de administración y no entraría al costo del inventario.'},
   {l:2,t:'num',p:'CIF presupuestados S/ 360,000; horas-máquina presupuestadas 9,000. Un lote consume 240 horas-máquina. ¿Cuánto CIF se le asigna?',
    u:'S/',r:9600,tol:1,
    s:'Tasa CIF = 360,000 ÷ 9,000 = **S/ 40 por hora-máquina**\nCIF asignado al lote = 240 × 40 = **S/ 9,600**\n\nAl cierre del periodo se compara el CIF aplicado con el CIF real: si el real fue S/ 375,000 y se aplicaron S/ 360,000, hay S/ 15,000 **subaplicados** que se ajustan incrementando el costo de ventas (o se distribuyen entre inventarios y costo de ventas si el importe es significativo).'},
   {l:2,t:'ab',p:'Elabora la hoja de costos de producción y el costo unitario con estos datos: MP inicial 9,000; compras MP 54,000; MP final 7,500; mano de obra directa 38,000; CIF 26,500; productos en proceso inicial 6,000 y final 8,200; productos terminados en el mes 1,200 unidades.',
    s:'**Hoja de costos de producción**\n\n| Concepto | Importe |\n|---|---|\n| Inventario inicial de materia prima | 9,000.00 |\n| (+) Compras de materia prima | 54,000.00 |\n| (−) Inventario final de materia prima | (7,500.00) |\n| **Materia prima consumida** | **55,500.00** |\n| (+) Mano de obra directa | 38,000.00 |\n| **Costo primo** | **93,500.00** |\n| (+) Costos indirectos de fabricación | 26,500.00 |\n| **Costo de producción del periodo** | **120,000.00** |\n| (+) Productos en proceso inicial | 6,000.00 |\n| (−) Productos en proceso final | (8,200.00) |\n| **Costo de productos terminados** | **117,800.00** |\n\n**Costo unitario = 117,800 ÷ 1,200 = S/ 98.17 por unidad**\n\n**Composición del costo unitario**, que es lo que sirve para decidir:\n\n| Elemento | Importe | % |\n|---|---|---|\n| Materia prima | 46.25 | 47.1% |\n| Mano de obra directa | 31.67 | 32.3% |\n| CIF | 22.08 | 22.5% |\n| Ajuste por productos en proceso | (1.83) | (1.9%) |\n| **Total** | **98.17** | **100%** |\n\n**Para qué sirve esto:** si el precio de venta es S/ 130, el margen bruto unitario es S/ 31.83 (24.5%). Si un cliente pide un descuento al 15% (precio S/ 110.50), el margen baja a S/ 12.33 (11.2%), y hay que decidir sabiendo que los CIF fijos ya están pagados. Esa decisión se analiza mejor con el margen de contribución, que es el tema de punto de equilibrio.'},
   {l:3,t:'ab',p:'Una fábrica tiene capacidad normal de 10,000 unidades al mes, con CIF fijos de S/ 180,000 y CIF variables de S/ 12 por unidad. En noviembre produjo solo 6,000 unidades por falta de pedidos. La materia prima fue S/ 25 por unidad y la mano de obra directa S/ 15 por unidad. Determina el costo unitario correcto según la NIC 2 y el efecto en el resultado.',
    s:'**Lo que haría un cálculo ingenuo (y equivocado):**\nCIF totales reales = 180,000 + (6,000 × 12) = 180,000 + 72,000 = S/ 252,000\nCIF por unidad = 252,000 ÷ 6,000 = S/ 42\nCosto unitario = 25 + 15 + 42 = **S/ 82** por unidad\n\nEsto infla el costo del inventario con la ineficiencia del mes. Si esas unidades no se venden, los costos de la capacidad ociosa quedan escondidos en el almacén y la pérdida se diferiría al periodo siguiente.\n\n**El cálculo correcto según la NIC 2** (párrafo 13): los costos indirectos **fijos** se distribuyen sobre la base de la **capacidad normal**, no de la producción real.\n\nTasa de CIF fijos = 180,000 ÷ 10,000 (capacidad normal) = **S/ 18 por unidad**\nCIF variables = **S/ 12 por unidad** (siguen la producción real)\n\n| Elemento | Por unidad |\n|---|---|\n| Materia prima directa | 25.00 |\n| Mano de obra directa | 15.00 |\n| CIF fijos (a capacidad normal) | 18.00 |\n| CIF variables | 12.00 |\n| **Costo unitario del inventario** | **70.00** |\n\n**CIF fijos no absorbidos:**\nAbsorbidos = 6,000 × 18 = S/ 108,000\nReales = S/ 180,000\n**No absorbidos = S/ 72,000 → gasto del periodo**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 21 | Productos terminados (6,000 × 70) | 420,000.00 | |\n| 6591 | Gasto por capacidad ociosa no absorbida | 72,000.00 | |\n| 71 / 79 | Variación de productos terminados y cargas imputables | | 492,000.00 |\n\n**Efecto en el resultado, si en el mes se vendieron 4,000 unidades a S/ 110:**\n\n| Concepto | Método correcto (NIC 2) | Método incorrecto |\n|---|---|---|\n| Ventas (4,000 × 110) | 440,000 | 440,000 |\n| Costo de ventas | (280,000) | (328,000) |\n| Gasto por capacidad ociosa | (72,000) | 0 |\n| **Resultado** | **88,000** | **112,000** |\n| Inventario final (2,000 u) | 140,000 | 164,000 |\n\nEl método incorrecto muestra S/ 24,000 más de utilidad y S/ 24,000 más de inventario. Esa utilidad no existe: es la capacidad ociosa de noviembre guardada en el almacén, que aparecerá como pérdida cuando se vendan esas unidades, o como desvalorización si el valor neto realizable queda por debajo del costo inflado.\n\n**La lectura de gestión:** el gasto de S/ 72,000 por capacidad ociosa es información valiosísima para la gerencia, precisamente porque está visible en el resultado. Dice que la planta tiene una estructura dimensionada para 10,000 unidades y está operando a 6,000, y que cada mes así cuesta S/ 72,000. Esconderlo en el inventario no solo distorsiona los estados financieros: elimina la señal que debía provocar la decisión.'}
  ]
 },
 {
  id:'m5t3', titulo:'Punto de equilibrio y margen de contribución', min:15,
  cont:`Esta es la herramienta que convierte la contabilidad en decisión. Para usarla hay que dejar de clasificar los costos por naturaleza o por función y clasificarlos por **comportamiento**: fijos o variables.

# Margen de contribución
$ Margen de contribución unitario (MCu) = Precio de venta − Costo variable unitario
$ Razón de contribución = MCu ÷ Precio de venta
$ Margen de contribución total = Ventas − Costos variables totales

El margen de contribución es lo que cada unidad vendida aporta para cubrir los costos fijos. Hasta que no se cubran todos, hay pérdida; desde ahí, cada unidad adicional es utilidad casi pura.

# Punto de equilibrio
$ Punto de equilibrio en unidades = Costos fijos ÷ MCu
$ Punto de equilibrio en soles = Costos fijos ÷ Razón de contribución
$ Unidades para una utilidad objetivo = (Costos fijos + Utilidad deseada) ÷ MCu

Ejemplo: una panadería vende tortas a S/ 45. El costo variable (insumos, empaque, comisión) es S/ 27. Los costos fijos mensuales (alquiler, sueldos, servicios) son S/ 14,400.

$ MCu = 45 − 27 = 18
$ Razón de contribución = 18 ÷ 45 = 40%
$ Punto de equilibrio = 14,400 ÷ 18 = 800 tortas al mes
$ En soles = 14,400 ÷ 0.40 = S/ 36,000 de ventas

Con 800 tortas no gana ni pierde. Con 1,000 tortas: (1,000 × 18) − 14,400 = **S/ 3,600** de utilidad. Fíjate en el apalancamiento: 25% más de ventas produjo utilidad desde cero, porque los fijos ya estaban cubiertos.

# Margen de seguridad y apalancamiento operativo
$ Margen de seguridad = (Ventas actuales − Ventas de equilibrio) ÷ Ventas actuales
$ Grado de apalancamiento operativo = Margen de contribución total ÷ Utilidad operativa

Con ventas de 1,000 tortas (S/ 45,000):
$ Margen de seguridad = (45,000 − 36,000) ÷ 45,000 = 20%
$ Apalancamiento = 18,000 ÷ 3,600 = 5 veces

Un apalancamiento de 5 significa que **cada 1% de variación en las ventas mueve la utilidad 5%**. Es una medida de riesgo: una empresa con muchos costos fijos gana mucho cuando crece y se desploma cuando cae.

# Punto de equilibrio con varios productos
Se calcula con la **mezcla de ventas** y un margen de contribución ponderado:

|Producto|Precio|Costo variable|MCu|Mezcla|MC ponderado|
|Pan|1.00|0.55|0.45|70%|0.315|
|Pastelería|4.50|2.60|1.90|25%|0.475|
|Tortas|45.00|27.00|18.00|5%|0.900|
|**Total**|||| |**1.690**|

$ Si los fijos son S/ 14,400: 14,400 ÷ 1.69 = 8,521 unidades totales
$ De las cuales 70% pan (5,965), 25% pastelería (2,130) y 5% tortas (426)

! El punto de equilibrio **depende de la mezcla**. Si cambia la proporción de productos, cambia el punto de equilibrio aunque no cambie ningún precio ni ningún costo. Por eso un negocio que empieza a vender más del producto de menor margen puede aumentar sus ventas y empeorar su resultado.

# Las decisiones que esta herramienta resuelve
|Decisión|Criterio|
|¿Acepto un pedido especial a precio bajo?|Si el precio supera el costo variable unitario y hay capacidad ociosa, aporta margen|
|¿Elimino una línea de producto?|Solo si su margen de contribución es negativo; si es positivo, está ayudando a pagar los fijos|
|¿Tercerizo o produzco?|Comparar el costo variable propio más los fijos evitables contra el precio del tercero|
|¿Subo el precio o el volumen?|Un 1% de precio suele valer más que un 1% de volumen, porque el precio no trae costo variable|

> **Supuestos que hay que tener presentes.** El modelo asume que el precio es constante, que los costos se separan limpiamente en fijos y variables, que la mezcla no cambia y que se opera dentro del rango relevante de capacidad. Ninguno es exactamente cierto: por eso el punto de equilibrio es una brújula, no un GPS. Pero una brújula es mucho mejor que nada, y es lo que más falta en las decisiones de precio de una MYPE.`,
  claves:['Margen de contribución unitario = precio − costo variable unitario; es lo que cada unidad aporta para cubrir los fijos.','Punto de equilibrio en unidades = costos fijos ÷ MCu; en soles = costos fijos ÷ razón de contribución.','El apalancamiento operativo (MC total ÷ utilidad operativa) mide cuánto amplifica la utilidad un cambio en las ventas.','Con varios productos el punto de equilibrio depende de la mezcla de ventas.','Una línea con margen de contribución positivo no se elimina: está ayudando a pagar los costos fijos.'],
  ej:[
   {l:1,t:'num',p:'Precio de venta S/ 80, costo variable unitario S/ 50, costos fijos mensuales S/ 18,000. ¿Cuál es el punto de equilibrio en unidades?',
    u:'unidades',r:600,tol:1,
    s:'MCu = 80 − 50 = S/ 30\nPunto de equilibrio = 18,000 ÷ 30 = **600 unidades**\n\nComprobación: 600 × 80 = S/ 48,000 de ventas; costos variables 600 × 50 = S/ 30,000; margen de contribución S/ 18,000, que iguala exactamente los costos fijos. Resultado cero. En soles, el punto de equilibrio es 18,000 ÷ 0.375 = S/ 48,000, porque la razón de contribución es 30 ÷ 80 = 37.5%.'},
   {l:1,t:'mc',p:'Una empresa tiene un producto con margen de contribución positivo pero que, después de asignarle costos fijos, muestra pérdida. ¿Debe eliminarlo?',
    o:['Sí, porque da pérdida','No necesariamente: si su margen de contribución es positivo, contribuye a cubrir los fijos que seguirán existiendo','Sí, si la pérdida se repite dos meses','Solo si el margen es menor al 20%'],r:1,
    s:'No. Si se elimina el producto, su margen de contribución desaparece pero los costos fijos asignados no: se redistribuyen entre los productos restantes, que empeorarán su resultado. La utilidad total caería exactamente en el monto del margen de contribución eliminado. Solo conviene eliminarlo si su margen de contribución es negativo (cada venta pierde dinero), si existen costos fijos **evitables** específicos de esa línea que superen su margen, o si libera capacidad para un producto más rentable.'},
   {l:2,t:'num',p:'Costos fijos S/ 36,000; precio S/ 120; costo variable S/ 78. ¿Cuántas unidades hay que vender para ganar S/ 12,600?',
    u:'unidades',r:1157,tol:2,
    s:'MCu = 120 − 78 = S/ 42\nUnidades = (Costos fijos + Utilidad deseada) ÷ MCu\n= (36,000 + 12,600) ÷ 42 = 48,600 ÷ 42 = **1,157.14 → 1,158 unidades**\n\n(Siempre se redondea hacia arriba: con 1,157 unidades la utilidad sería S/ 12,594, apenas por debajo de la meta.)\n\nEl punto de equilibrio puro es 36,000 ÷ 42 = 857 unidades. Las 300 unidades adicionales generan los S/ 12,600 de utilidad deseada (300 × 42 = 12,600), porque a partir del equilibrio todo el margen de contribución es utilidad.'},
   {l:2,t:'ab',p:'Una fábrica de muebles tiene capacidad para 500 sillas al mes y está produciendo 380. Precio normal S/ 180, costo variable S/ 95, costos fijos S/ 25,000. Un cliente ofrece comprar 100 sillas a S/ 120 cada una, para exportar. ¿Conviene aceptar?',
    s:'**Situación actual:**\nMargen de contribución = 380 × (180 − 95) = 380 × 85 = S/ 32,300\nUtilidad operativa = 32,300 − 25,000 = **S/ 7,300**\n\n**Análisis del pedido especial:**\nHay capacidad ociosa: 500 − 380 = 120 sillas, suficiente para las 100 del pedido. Los costos fijos **no cambian** porque la planta ya está instalada y pagada.\n\nMCu del pedido = 120 − 95 = **S/ 25 por silla**\nMargen de contribución adicional = 100 × 25 = **S/ 2,500**\n\n**Resultado con el pedido:**\n\n| Concepto | Sin pedido | Con pedido |\n|---|---|---|\n| Ventas | 68,400 | 80,400 |\n| Costos variables | (36,100) | (45,600) |\n| Margen de contribución | 32,300 | 34,800 |\n| Costos fijos | (25,000) | (25,000) |\n| **Utilidad operativa** | **7,300** | **9,800** |\n\n**Conviene aceptar: la utilidad sube S/ 2,500 (34%).**\n\nEl precio de S/ 120 está muy por debajo del costo total unitario (95 + 25,000/380 = S/ 160.8), y un análisis basado en el costo total diría que se pierde S/ 40 por silla. Ese razonamiento es incorrecto cuando hay capacidad ociosa: los costos fijos existen con o sin el pedido, así que la pregunta correcta es si el precio cubre el costo **variable** y deja algo.\n\n**Pero antes de aceptar, cuatro verificaciones que cambian la respuesta:**\n\n1. **¿Canibaliza las ventas normales?** Si este cliente podía comprar a S/ 180 y ahora compra a S/ 120, la empresa pierde S/ 60 por silla. El argumento solo se sostiene en un mercado separado: por eso que sea **para exportar** es relevante.\n2. **¿Afecta el precio del mercado actual?** Si los clientes habituales se enteran del precio de S/ 120, la presión para igualarlo puede costar mucho más que los S/ 2,500 ganados.\n3. **¿Hay costos adicionales del pedido?** Empaque especial de exportación, certificaciones, flete, comisión del agente. Si suman más de S/ 25 por silla, el pedido pasa a destruir valor. Para exportación, además, conviene verificar el tratamiento del IGV: la exportación está gravada con tasa cero y genera saldo a favor del exportador, lo que mejora el flujo.\n4. **¿Compromete capacidad que podría usarse mejor?** Si existe una posibilidad razonable de vender esas 100 sillas a precio normal en el mismo mes, el costo de oportunidad es 100 × 85 = S/ 8,500 y el pedido se vuelve una mala decisión.\n\n**Regla general:** con capacidad ociosa y en un mercado separado, cualquier precio por encima del costo variable mejora el resultado. Sin capacidad ociosa, el precio debe superar el costo variable **más** el margen de contribución que se sacrifica.'},
   {l:3,t:'ab',p:'Una cafetería analiza tres productos: café (precio 8, costo variable 2.40, 60% de las unidades), sándwich (precio 15, costo variable 7.50, 30%) y postre (precio 12, costo variable 4.80, 10%). Costos fijos S/ 22,000 al mes. Calcula el punto de equilibrio, y luego evalúa qué pasa si la mezcla cambia a 80% café, 15% sándwich y 5% postre.',
    s:'**Escenario 1 — Mezcla actual**\n\n| Producto | Precio | CV | MCu | Razón | Mezcla | MC ponderado |\n|---|---|---|---|---|---|---|\n| Café | 8.00 | 2.40 | 5.60 | 70.0% | 60% | 3.360 |\n| Sándwich | 15.00 | 7.50 | 7.50 | 50.0% | 30% | 2.250 |\n| Postre | 12.00 | 4.80 | 7.20 | 60.0% | 10% | 0.720 |\n| **Total** | | | | | **100%** | **6.330** |\n\nPunto de equilibrio en unidades totales = 22,000 ÷ 6.33 = **3,476 unidades al mes**\nDesglose: café 2,086; sándwich 1,043; postre 348.\n\nPrecio promedio ponderado = (8 × 0.6) + (15 × 0.3) + (12 × 0.1) = 4.80 + 4.50 + 1.20 = S/ 10.50\nPunto de equilibrio en soles = 3,476 × 10.50 = **S/ 36,498** al mes (unos S/ 1,217 diarios con 30 días de atención).\n\n**Escenario 2 — La mezcla se desplaza al café**\n\n| Producto | MCu | Mezcla nueva | MC ponderado |\n|---|---|---|---|\n| Café | 5.60 | 80% | 4.480 |\n| Sándwich | 7.50 | 15% | 1.125 |\n| Postre | 7.20 | 5% | 0.360 |\n| **Total** | | **100%** | **5.965** |\n\nPunto de equilibrio = 22,000 ÷ 5.965 = **3,689 unidades**, es decir **213 unidades más** que antes.\n\nPrecio promedio nuevo = (8 × 0.8) + (15 × 0.15) + (12 × 0.05) = 6.40 + 2.25 + 0.60 = S/ 9.25\nPunto de equilibrio en soles = 3,689 × 9.25 = **S/ 34,123**\n\n**La paradoja que hay que saber explicar:** el punto de equilibrio en **soles bajó** (de 36,498 a 34,123) porque el café tiene la razón de contribución más alta (70%). Pero el punto de equilibrio en **unidades subió** (de 3,476 a 3,689) porque el café tiene el margen de contribución **unitario** más bajo (S/ 5.60 frente a S/ 7.50 del sándwich). Hay que vender más tazas para juntar los mismos soles de margen.\n\n**Consecuencia operativa, que es lo que le importa al dueño:** 213 unidades más al mes son unas 7 transacciones diarias adicionales. Eso significa más tiempo de atención, más lavado de tazas, más desgaste de la máquina y la misma utilidad. La cafetería estaría trabajando más para ganar lo mismo.\n\n**Qué recomendaría:**\n\n1. **Empujar el sándwich**, que tiene el MCu más alto (S/ 7.50): combos café + sándwich con precio atractivo que mantenga el margen conjunto, ubicación visible, sugerencia en el momento del pedido.\n2. **Revisar el precio del café.** Subirlo de S/ 8 a S/ 8.50 eleva el MCu a S/ 6.10 y reduce el punto de equilibrio a 22,000 ÷ 6.37 = 3,454 unidades, recuperando toda la pérdida de la mezcla. Un 6% de precio compensa un cambio de mezcla de 20 puntos: ahí se ve por qué el precio es la palanca más poderosa.\n3. **Vigilar la mezcla mensualmente**, no solo las ventas totales. Un reporte de ventas que solo muestra el total en soles oculta exactamente este problema.\n4. **Revisar los costos fijos.** Con S/ 22,000 mensuales, el negocio necesita facturar unos S/ 1,200 diarios solo para empatar. Cada S/ 1,000 de fijos que se recorte baja el punto de equilibrio en unas 158 unidades al mes.'}
  ]
 },
 {
  id:'m5t4', titulo:'Presupuestos y flujo de caja proyectado', min:15,
  cont:`El presupuesto es contabilidad mirando hacia adelante. Y el flujo de caja proyectado es la herramienta que evita la situación más común en las MYPES peruanas: una empresa rentable que se queda sin dinero.

# El presupuesto maestro
Se construye en cadena: cada presupuesto alimenta al siguiente.

1. **Presupuesto de ventas**: el punto de partida, en unidades y en soles. Todo lo demás depende de él.
2. **Presupuesto de producción** (o de compras, si es comercial): Unidades a producir = Ventas presupuestadas + Inventario final deseado − Inventario inicial.
3. **Presupuesto de materia prima y compras**.
4. **Presupuesto de mano de obra directa**.
5. **Presupuesto de costos indirectos**.
6. **Presupuesto de gastos de operación** (ventas y administración).
7. **Presupuesto de efectivo** (flujo de caja).
8. **Estados financieros proyectados**.

# Presupuesto de compras, con un ejemplo
Una comercializadora proyecta vender 1,200 unidades en noviembre y 1,500 en diciembre. Su política es mantener un inventario final equivalente al 30% de las ventas del mes siguiente. Inventario al 31 de octubre: 360 unidades.

$ Compras de noviembre = Ventas 1,200 + Inventario final deseado (30% × 1,500 = 450) − Inventario inicial 360
$ Compras de noviembre = 1,290 unidades

# El flujo de caja proyectado
A diferencia del Estado de Resultados, el flujo de caja se arma por **cobros y pagos efectivos**, con sus plazos reales.

|Concepto|Noviembre|Diciembre|Enero|
|**Saldo inicial de caja**|18,000|11,240|7,090|
|Cobranza de ventas al contado (40%)|28,800|36,000|21,600|
|Cobranza de ventas al crédito 30 días (60%)|39,600|43,200|54,000|
|**Total ingresos**|68,400|79,200|75,600|
|Pago a proveedores|(45,000)|(52,000)|(38,000)|
|Planilla y aportes|(18,000)|(18,000)|(18,000)|
|Gratificaciones|—|(15,000)|—|
|CTS|(5,500)|—|—|
|Alquiler y servicios|(4,200)|(4,200)|(4,200)|
|IGV y pagos a cuenta|(2,460)|(3,150)|(2,900)|
|Cuota de préstamo|(5,000)|(5,000)|(5,000)|
|**Total egresos**|(80,160)|(97,350)|(68,100)|
|**Flujo del mes**|(11,760)|(18,150)|7,500|
|**Saldo final de caja**|6,240|(6,910)|600|

Este flujo dice algo que el Estado de Resultados no puede decir: **en diciembre la empresa se queda sin dinero**, por el efecto combinado de las gratificaciones y el pico de compras de la campaña. Y lo dice con dos meses de anticipación, que es el tiempo que hace falta para hacer algo al respecto.

# Qué se hace con esa información
|Medida|Efecto en el ejemplo|
|Negociar con el banco una línea de capital de trabajo antes de necesitarla|Costo financiero conocido, en lugar de un sobregiro caro|
|Ofrecer descuento por pronto pago a clientes del 60% al crédito|Adelanta cobranza; el descuento cuesta menos que el sobregiro|
|Negociar con proveedores pago a 45 días para la campaña|Mueve S/ 52,000 de diciembre a enero|
|Usar el saldo de la cuenta de detracciones para pagar los tributos|Libera caja operativa|
|Programar las vacaciones del personal en el mes de menor actividad|Evita la indemnización y ordena el gasto|

! Pedir un préstamo **cuando ya falta el dinero** es la peor negociación posible: el banco lo sabe y el costo sube. El flujo proyectado permite pedirlo con dos meses de anticipación, comparando dos o tres entidades.

# Control presupuestal: el análisis de variaciones
El presupuesto sin seguimiento es un deseo. Cada mes se compara presupuesto frente a real y se analiza la diferencia:

$ Variación total = Real − Presupuestado
$ Variación de precio = (Precio real − Precio presupuestado) × Cantidad real
$ Variación de cantidad = (Cantidad real − Cantidad presupuestada) × Precio presupuestado

Ejemplo: se presupuestó comprar 1,000 kg de insumo a S/ 12 (S/ 12,000) y se compraron 1,100 kg a S/ 11.50 (S/ 12,650).
$ Variación total = 12,650 − 12,000 = 650 desfavorable
$ Variación de precio = (11.50 − 12.00) × 1,100 = (550) favorable
$ Variación de cantidad = (1,100 − 1,000) × 12.00 = 1,200 desfavorable

La lectura: se compró más barato (bien, hubo buena negociación) pero se consumió más cantidad de la prevista (mal, hay que investigar si fue merma, desperdicio o un error en el estándar). Un solo número —los S/ 650 de exceso— habría escondido las dos historias.

> **Presupuesto flexible.** Comparar el gasto real de un mes en que se produjo 20% más contra un presupuesto hecho para el volumen original no tiene sentido: los costos variables debían subir. El presupuesto flexible se recalcula al nivel de actividad real, de modo que la variación que queda sea atribuible a eficiencia y no al volumen.`,
  claves:['El presupuesto maestro empieza en ventas y encadena producción o compras, costos, gastos, efectivo y estados proyectados.','Compras = ventas presupuestadas + inventario final deseado − inventario inicial.','El flujo de caja proyectado se arma por cobros y pagos reales, y anticipa los déficits con meses de margen.','Diciembre y los meses de gratificaciones y CTS son los puntos críticos de caja de una empresa peruana.','Las variaciones se descomponen en precio y cantidad: el número total esconde las causas.'],
  ej:[
   {l:1,t:'num',p:'Ventas presupuestadas de marzo: 800 unidades. Inventario final deseado: 240. Inventario inicial: 180. ¿Cuántas unidades hay que comprar?',
    u:'unidades',r:860,tol:1,
    s:'Compras = Ventas + Inventario final deseado − Inventario inicial\n= 800 + 240 − 180 = **860 unidades**\n\nLa lógica: necesito cubrir las ventas y además dejar el almacén en el nivel deseado, descontando lo que ya tengo. Es la misma ecuación del flujo de existencias, resuelta para las compras en lugar del consumo.'},
   {l:1,t:'mc',p:'¿Por qué una empresa con utilidad puede quedarse sin efectivo?',
    o:['Porque la utilidad se calcula mal','Porque la utilidad se mide por devengo y el efectivo por cobros y pagos, con plazos distintos','Porque siempre hay fraude','Porque el IGV se lleva toda la utilidad'],r:1,
    s:'Porque son dos mediciones distintas del mismo negocio. La utilidad reconoce la venta cuando se entrega el bien, aunque el cobro sea a 60 días; el efectivo entra recién con el cobro. Mientras tanto la empresa paga proveedores, planilla y tributos. Una empresa que crece rápido consume caja justamente porque financia el crecimiento de su inventario y de sus cuentas por cobrar: es rentable y está ahogada. De ahí la frase de que el crecimiento también se financia.'},
   {l:2,t:'num',p:'Ventas de S/ 90,000 en el mes, de las cuales 35% se cobra al contado y 65% a 30 días. El mes anterior las ventas fueron S/ 80,000 con la misma política. ¿Cuánto se cobra este mes?',
    u:'S/',r:83500,tol:10,
    s:'Cobranza del mes = contado del mes + crédito del mes anterior\n= (90,000 × 35%) + (80,000 × 65%)\n= 31,500 + 52,000 = **S/ 83,500**\n\nFíjate en el efecto: las ventas fueron S/ 90,000 pero la caja recibió S/ 83,500. La diferencia de S/ 6,500 es el crecimiento de las cuentas por cobrar, que es dinero de la empresa financiando a sus clientes. Si las ventas siguen creciendo cada mes, esa brecha se repite y crece: por eso una empresa en expansión necesita capital de trabajo aunque sea rentable.'},
   {l:2,t:'ab',p:'Elabora el flujo de caja de los próximos tres meses: saldo inicial S/ 15,000; ventas de 60,000, 75,000 y 70,000 (50% al contado, 50% a 30 días; las ventas del mes anterior fueron 55,000); compras de 32,000, 40,000 y 36,000 pagaderas a 30 días (compras del mes anterior 30,000); planilla 14,000 mensual más gratificación de 12,000 en el tercer mes; gastos fijos 6,000 mensuales; tributos 3,500 mensuales.',
    s:'**Flujo de caja proyectado**\n\n| Concepto | Mes 1 | Mes 2 | Mes 3 |\n|---|---|---|---|\n| **Saldo inicial** | 15,000 | 22,000 | 31,000 |\n| Cobranza al contado (50%) | 30,000 | 37,500 | 35,000 |\n| Cobranza del crédito del mes anterior | 27,500 | 30,000 | 37,500 |\n| **Total ingresos** | 57,500 | 67,500 | 72,500 |\n| Pago de compras del mes anterior | (30,000) | (32,000) | (40,000) |\n| Planilla | (14,000) | (14,000) | (14,000) |\n| Gratificación | — | — | (12,000) |\n| Gastos fijos | (6,000) | (6,000) | (6,000) |\n| Tributos | (3,500) | (3,500) | (3,500) |\n| **Total egresos** | (53,500) | (55,500) | (75,500) |\n| **Flujo neto del mes** | 4,000 | 12,000 | (3,000) |\n| **Saldo final** | 19,000 | 31,000 | 28,000 |\n\n**Lectura del flujo:**\n\n1. **La empresa no tiene problema de liquidez en estos tres meses:** el saldo nunca baja de S/ 19,000 y cierra con S/ 28,000.\n2. **El mes 3 es negativo** (−S/ 3,000) por la gratificación de S/ 12,000, aunque el colchón acumulado lo absorbe sin problema. Si el saldo inicial hubiera sido S/ 5,000 en lugar de S/ 15,000, el mes 3 cerraría con S/ 18,000 y seguiría bien; pero si además las ventas cayeran 20%, el resultado sería distinto. Eso es lo que hay que simular.\n3. **El desfase de cobro y pago es favorable aquí**: se cobra el 50% al contado y se paga todo a 30 días. Esa combinación es la que mantiene el flujo positivo. Si los proveedores exigieran pago al contado, el mes 1 pasaría de +4,000 a −6,000 (porque habría que pagar 32,000 en lugar de 30,000, y además adelantar el pago), y el mes 2 también se complicaría.\n\n**Tres cosas que debería hacer la gerencia con esta información:**\n\n- **Reservar los S/ 12,000 de la gratificación** desde el mes 1, idealmente en una cuenta separada. El dinero existe hoy; el riesgo es gastarlo.\n- **Simular dos escenarios**: ventas 20% por debajo de lo previsto, y un cliente grande que se atrasa 30 días. Un flujo con un solo escenario es un flujo optimista.\n- **Usar el excedente del mes 2** (S/ 31,000) con criterio: negociar un descuento por pago adelantado a proveedores suele rendir más que dejarlo en la cuenta corriente, siempre que no comprometa el colchón del mes 3.'},
   {l:3,t:'ab',p:'Una empresa presupuestó para el mes: producir 5,000 unidades, consumir 2 kg de insumo por unidad a S/ 8 el kg, y 0.5 horas de mano de obra por unidad a S/ 14 la hora. Lo real fue: 5,400 unidades producidas, 11,340 kg consumidos a S/ 7.60 el kg, y 2,970 horas a S/ 14.50. Analiza las variaciones y di qué pasó en la planta.',
    s:'**Presupuesto original y presupuesto flexible**\n\n| Concepto | Presupuesto original (5,000 u) | Presupuesto flexible (5,400 u) | Real |\n|---|---|---|---|\n| Insumo (kg) | 10,000 | 10,800 | 11,340 |\n| Costo de insumo | 80,000 | 86,400 | 86,184 |\n| Horas de MOD | 2,500 | 2,700 | 2,970 |\n| Costo de MOD | 35,000 | 37,800 | 43,065 |\n| **Costo total** | **115,000** | **124,200** | **129,249** |\n\nEl presupuesto flexible es la referencia correcta: comparar contra el original mezclaría el efecto del mayor volumen con el de la eficiencia.\n\n**Variaciones del insumo (materia prima)**\n\nVariación de **precio** = (Precio real − Precio estándar) × Cantidad real\n= (7.60 − 8.00) × 11,340 = **S/ 4,536 favorable**\n\nVariación de **cantidad (eficiencia)** = (Cantidad real − Cantidad estándar para la producción real) × Precio estándar\n= (11,340 − 10,800) × 8.00 = **S/ 4,320 desfavorable**\n\nVariación neta del insumo = 4,536 F − 4,320 D = **S/ 216 favorable**\n\n**Variaciones de la mano de obra directa**\n\nVariación de **tarifa** = (14.50 − 14.00) × 2,970 = **S/ 1,485 desfavorable**\n\nVariación de **eficiencia** = (2,970 − 2,700) × 14.00 = **S/ 3,780 desfavorable**\n\nVariación neta de MOD = **S/ 5,265 desfavorable**\n\n**Resumen**\n\n| Variación | Importe | Sentido |\n|---|---|---|\n| Precio del insumo | 4,536 | Favorable |\n| Cantidad de insumo | 4,320 | Desfavorable |\n| Tarifa de mano de obra | 1,485 | Desfavorable |\n| Eficiencia de mano de obra | 3,780 | Desfavorable |\n| **Variación total frente al flexible** | **5,049** | **Desfavorable** |\n\n**Qué pasó en la planta, que es la pregunta de verdad:**\n\nLa historia más coherente con estos números es que **se compró un insumo más barato y de menor calidad**. Encaja con los tres efectos a la vez:\n\n1. El precio bajó S/ 0.40 por kg (de 8.00 a 7.60): ahorro aparente de S/ 4,536.\n2. Se consumieron 540 kg más de lo que correspondía a 5,400 unidades (10,800 estándar frente a 11,340 reales): un **5% de desperdicio adicional**, que cuesta S/ 4,320. Un insumo de menor calidad genera más merma y más reprocesos.\n3. Se usaron 270 horas más de las necesarias (2,700 estándar frente a 2,970 reales): **10% de ineficiencia** en mano de obra, S/ 3,780. Trabajar con un material que falla obliga a reprocesar, y el reproceso consume horas.\n4. La tarifa pagada fue mayor (14.50 frente a 14.00), posiblemente por horas extras para recuperar el tiempo perdido: S/ 1,485.\n\n**Conclusión para la gerencia:** el ahorro de S/ 4,536 en la compra terminó costando **S/ 9,585** entre desperdicio, horas extra e ineficiencia. Resultado neto: **S/ 5,049 de pérdida**. La decisión de compra se evaluó con el precio del kilo y no con el costo total de uso.\n\n**Qué hacer:** (1) volver al insumo de especificación original y verificar si la variación de calidad se repite; (2) incorporar al procedimiento de compras una validación técnica de la ficha del material, no solo del precio; (3) medir el rendimiento del insumo (kg consumidos por unidad producida) como indicador mensual, porque es el que delató el problema; (4) revisar el estándar de 2 kg por unidad: si con el material correcto el consumo real fuera 2.1 kg, el estándar está mal calibrado y toda la variación de cantidad sería un error de medición, no de planta.'}
  ]
 }
 ]
}
);
