/* Contenido del curso — ref
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
 id:'ref', nivel:'Referencia', titulo:'Ficha de datos y glosario',
 resumen:'Las cifras vigentes que se usan en todos los cálculos del curso y el vocabulario técnico, para consultar mientras resuelves los ejercicios.',
 temas:[
 {
  id:'ref1', titulo:'Ficha de datos vigentes 2026', min:6,
  cont:`Cifras que se usan en todos los ejercicios del curso. Las tasas y los montos cambian por norma, así que antes de aplicarlas a un caso real conviene verificar la versión vigente en el portal de SUNAT o en El Peruano.

# Valores de referencia
|Concepto|Valor 2026|Norma|
|UIT (Unidad Impositiva Tributaria)|S/ 5,500|D.S. 302-2025-EF|
|IGV (16% IGV + 2% IPM)|18%|Ley del IGV|
|Factor para extraer IGV de un precio final|0.152542 (18/118)|—|
|Remuneración Mínima Vital|S/ 1,230 desde el 1 de octubre de 2026|D.S. 015-2026-TR|
|Asignación familiar (10% de la RMV)|S/ 123|Ley 25129|
|Deducción de 7 UIT en renta de quinta|S/ 38,500|Art. 46 LIR|
|Primer tramo del RMT (15 UIT de renta neta)|S/ 82,500|Art. 63-A LIR|
|Límite de bancarización|S/ 2,000 o US$ 500|Ley 28194|
|ITF|0.005%|Ley 28194|
|ITAN|0.4% sobre activos netos que excedan S/ 1,000,000|Ley 28424|

# Tasas del Impuesto a la Renta
|Régimen o concepto|Tasa|
|Régimen General (tercera categoría)|29.5% de la renta neta imponible|
|RMT hasta 15 UIT de renta neta|10%|
|RMT por el exceso de 15 UIT|29.5%|
|RER|1.5% de ingresos netos mensuales, definitivo|
|Dividendos a personas naturales domiciliadas|5% de retención|
|Renta de quinta: hasta 5 UIT|8%|
|Renta de quinta: más de 5 hasta 20 UIT|14%|
|Renta de quinta: más de 20 hasta 35 UIT|17%|
|Renta de quinta: más de 35 hasta 45 UIT|20%|
|Renta de quinta: más de 45 UIT|30%|

# Límites de los regímenes tributarios
|Régimen|Límite de ingresos|
|NRUS categoría 1|Hasta S/ 5,000 mensuales → cuota S/ 20|
|NRUS categoría 2|Más de S/ 5,000 hasta S/ 8,000 mensuales → cuota S/ 50|
|NRUS (anual)|S/ 96,000|
|RER|S/ 525,000 anuales|
|RMT|1,700 UIT = S/ 9,350,000|
|Régimen General|Sin límite|

# Categorías MYPE (ventas anuales)
|Categoría|Límite|Equivalente 2026|
|Microempresa|Hasta 150 UIT|S/ 825,000|
|Pequeña empresa|Hasta 1,700 UIT|S/ 9,350,000|
|Mediana empresa|Hasta 2,300 UIT|S/ 12,650,000|

# Aportes y descuentos laborales
|Concepto|Tasa|A cargo de|
|EsSalud|9%|Empleador|
|ONP|13%|Trabajador|
|AFP (fondo, comisión y prima)|alrededor de 13%|Trabajador|
|SENATI (industrias manufactureras con más de 20 trabajadores)|0.75%|Empleador|
|Bonificación extraordinaria sobre gratificaciones (EsSalud)|9%|Empleador, se entrega al trabajador|
|Bonificación extraordinaria (afiliados a EPS)|6.75%|Empleador|

# Beneficios sociales por régimen laboral
|Beneficio|Microempresa|Pequeña empresa|Régimen general|
|Vacaciones|15 días|15 días|30 días|
|Gratificaciones|No|Media remuneración × 2|Una remuneración × 2|
|CTS|No|15 remuneraciones diarias al año (tope 90)|Un sueldo más 1/6 de gratificación al año|
|Asignación familiar|No|No|S/ 123|

# Tasas máximas de depreciación tributaria
|Bien|Tasa anual|
|Edificios y construcciones|5% (línea recta)|
|Maquinaria y equipo|10%|
|Vehículos de transporte terrestre|20%|
|Equipos de procesamiento de datos|25%|
|Muebles y enseres|10%|
|Otros bienes del activo fijo|10%|

# Límites de gastos deducibles
|Gasto|Límite|
|Gastos de representación|0.5% de los ingresos brutos, tope 40 UIT (S/ 220,000)|
|Gastos recreativos del personal|0.5% de los ingresos netos, tope 40 UIT|
|Donaciones a entidades calificadas|10% de la renta neta imponible|
|Boletas de venta de sujetos del NRUS|6% de lo anotado en el Registro de Compras que da derecho a deducir, con tope de 200 UIT|

# Participación de los trabajadores (más de 20 trabajadores)
|Actividad|Porcentaje|
|Pesqueras, telecomunicaciones e industriales|10%|
|Mineras, comercio al por mayor y menor, restaurantes|8%|
|Otras actividades|5%|

# Plazos que conviene tener en el calendario
|Obligación|Plazo|
|Declaración mensual de IGV-Renta (Form. 621)|Según cronograma de SUNAT por último dígito del RUC|
|PLAME y pago de aportes|Según cronograma mensual|
|AFPnet|Primeros 5 días hábiles del mes siguiente|
|Depósito de CTS|Primeros 15 días de mayo y de noviembre|
|Pago de gratificaciones|Primeros 15 días de julio y de diciembre|
|Liquidación de beneficios sociales|Dentro de 48 horas del cese|
|Estados financieros a junta|Dentro de 3 meses del cierre (LGS art. 221)|
|Declaración jurada anual de Renta|Según cronograma, usualmente marzo a abril|

! Estas cifras corresponden a 2026. La UIT se fija por decreto supremo cada año y la RMV por decreto supremo del sector Trabajo; las tasas de detracción y los padrones de agentes de retención y percepción cambian por resolución de SUNAT. Antes de aplicar cualquiera de estos valores a un caso real, verifica la norma vigente.`,
  claves:['UIT 2026: S/ 5,500. IGV: 18%. RMV desde octubre de 2026: S/ 1,230.','Factor para extraer IGV de un precio final: 18/118 = 0.152542.','Límites: NRUS S/ 96,000; RER S/ 525,000; RMT 1,700 UIT = S/ 9,350,000.','EsSalud 9% lo paga el empleador; ONP 13% y AFP (cerca de 13%) los paga el trabajador.','Verifica siempre la norma vigente: UIT, RMV, tasas de detracción y padrones cambian cada año.'],
  ej:[]
 },
 {
  id:'ref2', titulo:'Glosario de términos', min:8,
  cont:`# A
**Activo diferido (tributario)**: impuesto que se recuperará en ejercicios futuros por diferencias temporales deducibles. Cuenta 37.
**Adición**: gasto no deducible o deducible en otro ejercicio que se suma a la utilidad contable en la conciliación tributaria.
**Arrastre de pérdidas**: compensación de pérdidas tributarias contra rentas futuras. Sistema A (4 años) o B (sin plazo, hasta 50% de la renta neta).
**Asiento de destino**: segundo asiento que reclasifica un gasto de naturaleza (clase 6) a función (clase 9) usando la cuenta 79.

# B
**Bancarización**: obligación de usar medios de pago del sistema financiero para obligaciones desde S/ 2,000 o US$ 500. Su incumplimiento hace perder el gasto y el crédito fiscal.
**Base imponible**: importe sobre el que se aplica un tributo. En el IGV, el valor de venta sin el impuesto.

# C
**CDR (Constancia de Recepción)**: respuesta de SUNAT que confirma la recepción válida de un comprobante electrónico. Sin ella, el comprobante no existe tributariamente.
**Costo computable**: costo que se resta del ingreso para determinar la renta bruta, según las reglas de la LIR.
**Crédito fiscal**: IGV de las compras que se descuenta del IGV de las ventas.
**CTS**: Compensación por Tiempo de Servicios. Fondo de previsión que se deposita en mayo y noviembre.
**Causalidad**: principio del art. 37 de la LIR según el cual solo son deducibles los gastos necesarios para producir renta o mantener su fuente.

# D
**Débito fiscal**: IGV que se cobra en las ventas.
**Desmedro**: pérdida de calidad que hace inutilizable un bien. Deducible con destrucción ante notario y comunicación previa a SUNAT.
**Detracción (SPOT)**: porcentaje del pago que el cliente deposita en la cuenta del proveedor en el Banco de la Nación.
**Devengo**: criterio por el cual los hechos se reconocen cuando ocurren, no cuando se cobran o pagan.
**Diferencia permanente**: la que nunca se revierte; afecta la tasa efectiva del impuesto.
**Diferencia temporal**: la que se revierte en ejercicios futuros; genera impuesto diferido.
**Dividendo presunto**: distribución indirecta de utilidades que SUNAT grava con una tasa específica.

# E
**EBITDA**: utilidad antes de intereses, impuestos, depreciación y amortización.
**Ecuación contable**: Activo = Pasivo + Patrimonio.
**Existencias**: inventarios. Mercaderías, materias primas, productos en proceso y terminados.

# F
**Fehaciencia**: capacidad de probar que una operación realmente ocurrió, más allá del comprobante.
**Flujo de caja**: entradas y salidas de efectivo de un periodo, clasificadas en operación, inversión y financiamiento.

# G
**Generalidad**: criterio según el cual los beneficios al personal deben alcanzar a todos los trabajadores en situación equivalente.
**Gratificación**: beneficio legal de una remuneración por semestre, en julio y diciembre.

# I
**IGV**: Impuesto General a las Ventas, 18% (16% más 2% de IPM).
**ITAN**: Impuesto Temporal a los Activos Netos, 0.4% sobre el exceso de S/ 1,000,000 de activos netos.
**ITF**: Impuesto a las Transacciones Financieras, 0.005%.

# M
**Margen de contribución**: precio de venta menos costo variable. Es lo que cada unidad aporta para cubrir los costos fijos.
**Materialidad**: umbral a partir del cual una omisión o error influiría en la decisión de un usuario de los estados financieros.
**Merma**: pérdida física en volumen, peso o cantidad por causas inherentes al bien o al proceso. Deducible con informe técnico.

# N
**NIC / NIIF**: Normas Internacionales de Contabilidad y Normas Internacionales de Información Financiera, oficializadas en el Perú por el CNC.
**NRUS**: Nuevo Régimen Único Simplificado, de cuota fija mensual.

# P
**Partida doble**: todo registro tiene al menos dos efectos que mantienen el equilibrio de la ecuación contable.
**Participación no controladora**: parte del patrimonio de una subsidiaria que pertenece a accionistas distintos de la matriz.
**PCGE**: Plan Contable General Empresarial 2019, catálogo de cuentas obligatorio.
**Percepción**: cobro adicional que un agente designado hace al cliente y entrega a SUNAT.
**PLAME**: Planilla Mensual de Pagos, declaración de remuneraciones y aportes.
**PLE**: Programa de Libros Electrónicos, para Diario, Mayor, Inventarios y Balances y otros registros.
**Plusvalía (goodwill)**: exceso del precio pagado en una adquisición sobre el valor razonable de los activos netos identificables.
**Prorrata del crédito fiscal**: método para determinar qué parte del IGV de compras comunes es utilizable cuando hay operaciones gravadas y no gravadas.
**Punto de equilibrio**: nivel de ventas en que el margen de contribución iguala a los costos fijos.

# R
**REMYPE**: Registro de la Micro y Pequeña Empresa, condición para acceder al régimen laboral especial.
**RER**: Régimen Especial de Renta, 1.5% de ingresos netos mensuales con carácter definitivo.
**Retención del IGV**: 3% que un agente designado descuenta al pagar a su proveedor y entrega a SUNAT.
**RMT**: Régimen MYPE Tributario, con escala de 10% y 29.5%.
**RVIE / RCE**: Registro de Ventas e Ingresos Electrónico y Registro de Compras Electrónico, llevados por el SIRE.

# S
**Saldo a favor del exportador**: crédito fiscal de las compras vinculadas a exportaciones, susceptible de devolución.
**SIRE**: Sistema Integrado de Registros Electrónicos, donde SUNAT preconstruye los registros de ventas y compras.
**SPOT**: Sistema de Pago de Obligaciones Tributarias, el nombre formal de las detracciones.

# T
**Tasa efectiva del impuesto**: gasto por impuesto dividido entre la utilidad contable antes de impuesto. Se aparta del 29.5% por efecto de las diferencias permanentes.
**T-Registro**: registro de trabajadores, pensionistas y prestadores de servicios ante SUNAT.

# V
**Valor Neto Realizable (VNR)**: precio de venta estimado menos los costos de terminación y de venta. Las existencias se miden al menor entre costo y VNR.
**Variación de existencias**: cuenta 61, puente entre la compra (clase 6) y el almacén (clase 2).
**Vinculación**: relación entre empresas o personas que obliga a pactar precios de mercado y a revelar las operaciones.`,
  claves:['El glosario reúne los términos que aparecen en los ejercicios: consúltalo mientras resuelves.','Distinguir merma de desmedro y diferencia permanente de temporal es lo que más se confunde en los exámenes y en el trabajo.','La cuenta 61 Variación de existencias y la cuenta 79 son las dos piezas del PCGE que más cuesta entender al inicio.'],
  ej:[]
 }
 ]
}
);
