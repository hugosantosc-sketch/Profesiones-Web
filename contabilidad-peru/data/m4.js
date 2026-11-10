/* Contenido del curso — m4
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
 id:'m4', nivel:'Intermedio', titulo:'Contabilidad laboral y planilla',
 resumen:'Remuneraciones, aportes, beneficios sociales, regímenes MYPE y el registro contable de la planilla con sus provisiones.',
 temas:[
 {
  id:'m4t1', titulo:'La remuneración: conceptos, aportes y descuentos', min:16,
  cont:`La planilla es, en la mayoría de empresas peruanas, el gasto más grande y el que genera más contingencias. Un error en un concepto remunerativo se repite 12 veces al año y arrastra CTS, gratificaciones y vacaciones mal calculadas.

# Qué es remuneración
Según el artículo 6 de la Ley de Productividad y Competitividad Laboral, es **todo lo que el trabajador recibe por sus servicios, en dinero o en especie, de su libre disposición**. La consecuencia práctica: si un concepto es remunerativo, es base para aportes y beneficios; si no lo es, no.

|Conceptos remunerativos|Conceptos NO remunerativos (art. 19 y 20 Ley CTS)|
|Sueldo o salario básico|Gratificaciones extraordinarias|
|Asignación familiar|Participación en utilidades|
|Horas extras|Movilidad supeditada a asistencia y razonable|
|Comisiones y destajo|Refrigerio que no es alimentación principal|
|Bonificaciones regulares|Condiciones de trabajo (uniformes, herramientas)|
|Gratificaciones de ley|Canasta de Navidad o similar|
|Alimentación principal|Bonificación por cierre de pliego|
|Vacaciones|Asignación por educación, cumpleasños, matrimonio, fallecimiento|

> La diferencia cuesta dinero real. Una "bonificación por puntualidad" pagada todos los meses es **remunerativa** aunque la empresa la llame bonificación: es regular y de libre disposición. Al no incluirla en la base, se subcalculan CTS, gratificaciones, vacaciones y aportes, y en una inspección de SUNAFIL o una demanda laboral eso se liquida con intereses por todo el periodo no prescrito.

# La remuneración mínima vital
Desde el **1 de octubre de 2026** la RMV es de **S/ 1,230** mensuales para el régimen de la actividad privada a jornada completa (D.S. 015-2026-TR), como primer tramo de un incremento que llegará a S/ 1,300 con un segundo decreto previsto para 2027.

Conceptos que dependen de la RMV:
|Concepto|Cálculo|Importe con RMV S/ 1,230|
|Asignación familiar|10% de la RMV|S/ 123|
|Base mínima de aporte a EsSalud|RMV|S/ 1,230|
|Remuneración mínima para jornada parcial|Proporcional a las horas|variable|

La **asignación familiar** se paga a todo trabajador con uno o más hijos menores de 18 años (o hasta 24 si cursan estudios superiores), por un monto fijo, sin importar cuántos hijos tenga. Es remunerativa.

# Aportes del empleador y descuentos del trabajador
Esta es la distinción que más errores causa. El **aporte** lo paga la empresa además del sueldo (es gasto); el **descuento** se retiene del sueldo del trabajador (no es gasto adicional, es parte del sueldo que la empresa entrega a un tercero).

|Concepto|Quién lo paga|Tasa|Cuenta PCGE|
|EsSalud|Empleador|9% de la remuneración|6271 (gasto) / 4031 (pasivo)|
|SCTR salud y pensión|Empleador|Según actividad de riesgo y aseguradora|6273 / 4039 o 46|
|SENATI|Empleador (industrias manufactureras con más de 20 trabajadores)|0.75% del total de remuneraciones|6413 / 4039|
|ONP (Sistema Nacional de Pensiones)|Trabajador|13% de la remuneración|4032 (pasivo)|
|AFP (Sistema Privado)|Trabajador|10% al fondo + comisión + prima de seguro (en conjunto, alrededor de 13%)|4071 (pasivo)|
|Impuesto a la Renta de quinta categoría|Trabajador|Escala progresiva sobre la renta anual proyectada|4017 (pasivo)|

! El **EsSalud nunca se descuenta al trabajador**. Es uno de los errores más frecuentes en planillas hechas a mano: se resta el 9% del sueldo del trabajador, con lo que el trabajador recibe menos de lo que le corresponde y la empresa igual debe pagar el aporte. Genera deuda laboral y, si el trabajador reclama, intereses y multa de SUNAFIL.

# Renta de quinta categoría
Se calcula proyectando la remuneración anual, deduciendo 7 UIT y aplicando la escala progresiva acumulativa:

|Tramo de renta neta anual|Tasa|
|Hasta 5 UIT|8%|
|Más de 5 hasta 20 UIT|14%|
|Más de 20 hasta 35 UIT|17%|
|Más de 35 hasta 45 UIT|20%|
|Más de 45 UIT|30%|

Con UIT de S/ 5,500 en 2026, la deducción de 7 UIT es **S/ 38,500**. Un trabajador con sueldo de S/ 3,000 mensuales recibe al año 12 sueldos más 2 gratificaciones = 14 × 3,000 = S/ 42,000. Renta neta = 42,000 − 38,500 = S/ 3,500, y su impuesto anual es 3,500 × 8% = S/ 280, que se retiene en doceavos de alrededor de S/ 23 al mes.

$ Renta neta de quinta = Remuneración anual proyectada − 7 UIT
$ Retención mensual ≈ Impuesto anual proyectado ÷ 12 (con ajustes en los meses de gratificación)

# El cálculo de una boleta completa
Trabajador del régimen general: sueldo S/ 3,500, un hijo menor, afiliado a AFP (asumimos 13% total), 8 horas extras al 25% en el mes.

$ Valor hora = 3,500 ÷ 240 = 14.583
$ Hora extra 25% = 14.583 × 1.25 = 18.229 → 8 horas = 145.83

|Concepto|Importe|
|Sueldo básico|3,500.00|
|Asignación familiar|123.00|
|Horas extras (8 al 25%)|145.83|
|**Total remuneración bruta**|**3,768.83**|
|(−) AFP aproximadamente 13%|(489.95)|
|(−) Renta de quinta categoría|(aprox. 60.00)|
|**Neto a pagar**|**3,218.88**|
|Aporte EsSalud 9% (costo de la empresa)|339.20|
|**Costo total para la empresa**|**4,108.03**|

El costo real de un trabajador con sueldo de S/ 3,500 no es S/ 3,500: con EsSalud, gratificaciones, CTS y vacaciones, en el régimen general ronda **1.5 veces** el sueldo básico anualizado. Ese factor es el que hay que usar al presupuestar una contratación.`,
  claves:['Remuneración es todo lo de libre disposición por los servicios; el nombre del concepto no define su naturaleza.','RMV vigente desde octubre de 2026: S/ 1,230; asignación familiar S/ 123 (10% de la RMV).','EsSalud 9% es aporte del empleador, nunca descuento; ONP 13% y AFP (alrededor de 13%) son descuentos del trabajador.','La renta de quinta se calcula proyectando la remuneración anual, deduciendo 7 UIT (S/ 38,500 en 2026) y aplicando la escala progresiva.','El costo real de un trabajador del régimen general es cercano a 1.5 veces su sueldo básico anualizado.'],
  ej:[
   {l:1,t:'num',p:'Un trabajador gana S/ 2,800 y tiene dos hijos menores de edad. ¿Cuánto recibe de asignación familiar en 2026?',
    u:'S/',r:123,tol:1,
    s:'**S/ 123**, el 10% de la RMV de S/ 1,230.\n\nEl monto es **fijo e independiente del número de hijos**: se paga lo mismo con uno o con cinco hijos. Es un error frecuente multiplicarlo por la cantidad de hijos. Y es un concepto **remunerativo**, así que entra en la base de CTS, gratificaciones, vacaciones y aportes.'},
   {l:1,t:'mc',p:'Una empresa descuenta el 9% de EsSalud del sueldo de sus trabajadores. ¿Es correcto?',
    o:['Sí, es un aporte compartido','No: el 9% de EsSalud es aporte exclusivo del empleador y no se descuenta al trabajador','Sí, si el trabajador lo autoriza por escrito','Solo en el régimen MYPE'],r:1,
    s:'Es incorrecto y genera deuda laboral. El aporte a EsSalud (9%) corre íntegramente por cuenta del empleador: se registra como gasto en la cuenta 6271 y como pasivo en la 4031. Lo que sí se descuenta al trabajador es su aporte pensionario (ONP 13% o AFP alrededor de 13%) y la retención de renta de quinta categoría. Si se descontó indebidamente, hay que devolver lo retenido con intereses, y SUNAFIL puede sancionar por reducción ilegal de la remuneración.'},
   {l:2,t:'num',p:'Sueldo S/ 4,200, asignación familiar S/ 123, afiliado a ONP (13%). ¿Cuál es el neto a pagar antes de la retención de quinta categoría?',
    u:'S/',r:3761.01,tol:2,
    s:'Remuneración bruta = 4,200 + 123 = S/ 4,323.00\nDescuento ONP = 4,323 × 13% = S/ 561.99\n**Neto antes de quinta = 4,323 − 561.99 = S/ 3,761.01**\n\nEl aporte a EsSalud de 4,323 × 9% = S/ 389.07 no se descuenta: es costo adicional de la empresa. Costo total mensual para el empleador = 4,323 + 389.07 = S/ 4,712.07, sin contar la provisión de gratificaciones, CTS y vacaciones.'},
   {l:2,t:'num',p:'Un trabajador gana S/ 4,000 mensuales en el régimen general (14 remuneraciones al año). ¿Cuánto es su Impuesto a la Renta de quinta categoría anual en 2026?',
    u:'S/',r:1400,tol:10,
    s:'Remuneración anual proyectada = 14 × 4,000 = S/ 56,000\n(12 sueldos más 2 gratificaciones completas)\nDeducción de 7 UIT = 7 × 5,500 = S/ 38,500\nRenta neta = 56,000 − 38,500 = S/ 17,500\n\nEscala progresiva acumulativa: el primer tramo llega hasta 5 UIT = S/ 27,500 y tributa 8%. Como S/ 17,500 cae íntegro en ese tramo:\n**Impuesto anual = 17,500 × 8% = S/ 1,400**\n\nRetención mensual aproximada = 1,400 ÷ 12 = S/ 116.67. En los meses de gratificación la retención se recalcula, porque la proyección se ajusta con lo efectivamente percibido. Si la tasa aplicada hubiera sido 14%, el error estaría en haber confundido el límite del primer tramo (5 UIT de renta neta) con la deducción de 7 UIT.'},
   {l:3,t:'ab',p:'Una empresa paga mensualmente a su jefe de ventas: sueldo S/ 5,000, "bonificación por cumplimiento de meta" S/ 1,200 (la recibe todos los meses desde hace dos años), movilidad para visitar clientes S/ 300 con rendición de gastos, y canasta de Navidad en diciembre valorizada en S/ 400. Determina qué conceptos son remunerativos y el impacto de clasificarlos mal.',
    s:'**Clasificación correcta:**\n\n| Concepto | Naturaleza | Fundamento |\n|---|---|---|\n| Sueldo S/ 5,000 | Remunerativo | Contraprestación directa |\n| Bonificación por meta S/ 1,200 | **Remunerativo** | Es regular (24 meses consecutivos) y de libre disposición. El nombre no la excluye |\n| Movilidad S/ 300 con rendición | No remunerativo | Es condición de trabajo: se otorga para el cabal desempeño y está sujeta a rendición |\n| Canasta de Navidad S/ 400 | No remunerativo | Está expresamente excluida por el art. 19 de la Ley de CTS |\n\n**Base remunerativa mensual correcta = 5,000 + 1,200 = S/ 6,200**, no S/ 5,000.\n\n**Impacto de excluir indebidamente la bonificación de S/ 1,200:**\n\n| Concepto | Con base 5,000 | Con base 6,200 | Diferencia anual |\n|---|---|---|---|\n| Gratificaciones (2 al año) | 10,000 | 12,400 | 2,400 |\n| Bonificación extraordinaria 9% | 900 | 1,116 | 216 |\n| CTS (1 sueldo + 1/6 grati al año) | 5,833 | 7,233 | 1,400 |\n| Vacaciones (1 sueldo) | 5,000 | 6,200 | 1,200 |\n| EsSalud 9% sobre la diferencia | — | — | 1,603 |\n| **Deuda laboral aproximada por año** | | | **~6,819** |\n\nPor dos años: alrededor de **S/ 13,600**, más los aportes pensionarios no retenidos ni pagados, más intereses laborales, más la multa de SUNAFIL (que se calcula en UIT según el número de trabajadores afectados y la gravedad), más el riesgo de que la bonificación se declare remunerativa en un proceso judicial con efecto para todo el periodo no prescrito (4 años en materia laboral).\n\n**Cómo se corrige hacia adelante:** incorporar la bonificación a la base remunerativa en la planilla, recalcular los beneficios, y si se desea mantener un incentivo variable no remunerativo, estructurarlo como **gratificación extraordinaria** verdaderamente ocasional y a título de liberalidad, no como pago mensual con nombre de bono. La regularidad es el criterio que define la naturaleza: un concepto pagado todos los meses es sueldo, se llame como se llame.'}
  ]
 },
 {
  id:'m4t2', titulo:'Gratificaciones, CTS y vacaciones', min:17,
  cont:`Los tres beneficios sociales principales del régimen general. Lo que los hace difíciles no es la fórmula, es la **base de cálculo** y la **proporcionalidad** cuando el trabajador no laboró el periodo completo.

# Gratificaciones legales
Dos al año, por Fiestas Patrias y por Navidad, cada una equivalente a **una remuneración mensual** si el trabajador laboró el semestre completo.

|Periodo computable|Mes de pago|Plazo|
|Enero a junio|Julio|Primeros 15 días de julio|
|Julio a diciembre|Diciembre|Primeros 15 días de diciembre|

$ Gratificación = (Remuneración computable ÷ 6) × meses completos laborados en el semestre
$ Bonificación extraordinaria (Ley 30334) = 9% de la gratificación (6.75% si está en EPS)

La **bonificación extraordinaria** existe porque las gratificaciones están inafectas a aportes: el 9% que el empleador habría pagado a EsSalud se entrega al trabajador. No es remunerativa ni está sujeta a aportes, pero sí a renta de quinta.

Requisito: estar laborando en el mes de pago, o haber cesado dentro del semestre (en ese caso se paga gratificación **truncal** por los meses completos).

# Compensación por Tiempo de Servicios (CTS)
Es un fondo de previsión por el cese. Se deposita en una entidad financiera elegida por el trabajador, en dos oportunidades:

|Periodo computable|Mes de depósito|
|Noviembre a abril|Primeros 15 días de mayo|
|Mayo a octubre|Primeros 15 días de noviembre|

$ Remuneración computable = Sueldo + Asignación familiar + 1/6 de la última gratificación + promedio de conceptos variables regulares
$ CTS = (Remuneración computable ÷ 12) × meses completos + (Remuneración computable ÷ 360) × días

Requisito para acceder: haber laborado **al menos un mes completo**. Los conceptos variables (horas extras, comisiones) entran al promedio solo si se percibieron en **tres o más** meses del semestre.

# Vacaciones
30 días calendario de descanso remunerado por cada año completo de servicios, siempre que se cumpla el récord vacacional (el número mínimo de días efectivos de labor según la jornada).

|Situación|Qué corresponde|
|Vacaciones gozadas|Remuneración del mes en que se toman|
|Vacaciones truncas (cese antes del año)|Proporcional por dozavos y treintavos|
|Vacaciones no gozadas dentro del año siguiente|Triple remuneración: la del mes de trabajo, la del descanso no gozado y una indemnización equivalente|

! La **indemnización vacacional** (el tercer sueldo de la "triple") no es deducible como gasto si se ve como indemnización, y además no está sujeta a aportes, pero el costo es real: una empresa que acumula vacaciones no gozadas se expone a pagar tres veces lo mismo. En el cierre contable hay que mirar el saldo de la cuenta 4151: si crece año a año, hay un problema de gestión, no de contabilidad. Nota: los gerentes y representantes que deciden no hacer uso del descanso están excluidos de la indemnización.

# Un caso completo: liquidación de beneficios sociales
Trabajadora del régimen general, ingresó el 1 de marzo de 2025 y cesa el 15 de agosto de 2026. Sueldo S/ 3,600, asignación familiar S/ 123. Última gratificación (julio 2026): S/ 3,723. Vacaciones del primer año: gozadas. No tiene vacaciones pendientes del segundo año.

**Remuneración computable** = 3,600 + 123 + (3,723 ÷ 6) = 3,600 + 123 + 620.50 = **S/ 4,343.50**

**1. CTS truncal (mayo a agosto 15, 2026)**
$ Meses completos: mayo, junio, julio = 3
$ Días: 15 (del 1 al 15 de agosto)
$ CTS = (4,343.50 ÷ 12) × 3 + (4,343.50 ÷ 360) × 15
$ CTS = 1,085.88 + 181.00 = S/ 1,266.88

**2. Gratificación truncal (julio a agosto 15, 2026)**
$ Meses completos del semestre: julio = 1
$ Grati = (3,723 ÷ 6) × 1 = 620.50
$ Bonificación extraordinaria 9% = 55.85
$ Total = S/ 676.35

**3. Vacaciones truncas (1 marzo 2026 al 15 agosto 2026)**
$ Meses completos: marzo a julio = 5 · Días: 15
$ Vacaciones = (3,723 ÷ 12) × 5 + (3,723 ÷ 360) × 15
$ Vacaciones = 1,551.25 + 155.13 = S/ 1,706.38

|Concepto|Importe|
|CTS truncal|1,266.88|
|Gratificación truncal + bonificación|676.35|
|Vacaciones truncas|1,706.38|
|Remuneración de agosto (15 días)|1,861.50|
|**Total bruto de liquidación**|**5,511.11**|
|(−) Aporte pensionario sobre conceptos afectos|variable|
|(−) Renta de quinta|variable|

> Las **vacaciones truncas** y la **remuneración del mes** están sujetas a aportes y descuentos; la **CTS** y las **gratificaciones** están inafectas a aportes (aunque las gratificaciones sí están sujetas a renta de quinta). Equivocar esto cambia el neto que recibe el trabajador y el importe a pagar a EsSalud y la AFP.

# Contabilización de la provisión
Lo correcto es provisionar mes a mes, no esperar al pago:

@ 30/04 — Provisión mensual de beneficios sociales (sueldo base S/ 3,600)
@ 62|6213 Gratificaciones|600.00|
@ 62|6214 Vacaciones|300.00|
@ 62|6291 Compensación por tiempo de servicios|350.00|
@ 41|4114 Gratificaciones por pagar||600.00
@ 41|4151 Vacaciones por pagar||300.00
@ 41|4152 Compensación por tiempo de servicios||350.00

Sin esta provisión, el resultado mensual aparece mejor de lo real en julio y diciembre se desploma, y la empresa se encuentra sin caja para pagar las gratificaciones.`,
  claves:['Gratificaciones: una remuneración por semestre completo, más 9% de bonificación extraordinaria (6.75% con EPS).','CTS: depósitos en mayo y noviembre; base = sueldo + asignación familiar + 1/6 de la última gratificación.','Vacaciones: 30 días por año; no gozarlas dentro del año siguiente genera triple remuneración.','CTS y gratificaciones están inafectas a aportes; vacaciones y remuneración ordinaria sí están afectas.','Los beneficios se provisionan mes a mes: sin provisión, julio y diciembre destruyen el resultado y la caja.'],
  ej:[
   {l:1,t:'num',p:'Un trabajador con sueldo de S/ 2,400 laboró el semestre completo. ¿Cuánto recibe de gratificación más bonificación extraordinaria?',
    u:'S/',r:2616,tol:2,
    s:'Gratificación = S/ 2,400 (una remuneración por semestre completo)\nBonificación extraordinaria = 2,400 × 9% = S/ 216\n**Total = S/ 2,616**\n\nSobre este importe no se aplica aporte a EsSalud ni descuento pensionario (las gratificaciones están inafectas por la Ley 30334), pero sí corresponde la retención de renta de quinta categoría si el trabajador supera el tramo exonerado. Si estuviera afiliado a una EPS en lugar de EsSalud, la bonificación sería 6.75% = S/ 162.'},
   {l:1,t:'mc',p:'¿En qué meses se deposita la CTS?',
    o:['Enero y julio','Mayo y noviembre','Julio y diciembre','Marzo y setiembre'],r:1,
    s:'Mayo (por el periodo noviembre-abril) y noviembre (por el periodo mayo-octubre), dentro de los primeros 15 días de cada uno. No se confunda con las gratificaciones, que se pagan en julio y diciembre. El depósito se hace en la entidad financiera que el trabajador elija; si no comunica su elección, el empleador puede depositarla en la institución donde el trabajador percibe su remuneración.'},
   {l:2,t:'num',p:'Trabajador con sueldo S/ 3,000, asignación familiar S/ 123 y última gratificación de S/ 3,123. Laboró los 6 meses del periodo completo. ¿Cuánto es su CTS?',
    u:'S/',r:1821.75,tol:3,
    s:'**Remuneración computable:**\nSueldo: 3,000.00\nAsignación familiar: 123.00\nUn sexto de la última gratificación: 3,123 ÷ 6 = 520.50\n**Total computable = S/ 3,643.50**\n\n**CTS por el semestre completo:**\nCTS = (3,643.50 ÷ 12) × 6 = **S/ 1,821.75**\n\nAtajo: por un semestre completo, la CTS es la mitad de la remuneración computable. Por un año completo equivale a una remuneración computable, es decir, a un sueldo más un sexto de gratificación.'},
   {l:2,t:'num',p:'Trabajadora con sueldo S/ 2,700 cesa el 20 de setiembre. Ingresó el 1 de febrero del mismo año y no gozó vacaciones. ¿Cuánto le corresponde de vacaciones truncas?',
    u:'S/',r:1725,tol:10,
    s:'Periodo computable: 1 de febrero al 20 de setiembre.\nMeses completos: febrero a agosto = **7 meses**\nDías adicionales: del 1 al 20 de setiembre = **20 días**\n\nVacaciones truncas = (2,700 ÷ 12) × 7 + (2,700 ÷ 360) × 20\n= 225 × 7 + 7.50 × 20\n= 1,575.00 + 150.00 = **S/ 1,725.00**\n\nDetalle importante: las vacaciones truncas **sí están afectas** a aporte a EsSalud y a descuento pensionario, a diferencia de la CTS y las gratificaciones. Y si la trabajadora tuviera asignación familiar, entraría en la base de cálculo.'},
   {l:3,t:'ab',p:'Liquida los beneficios sociales de un trabajador del régimen general que ingresó el 10 de abril de 2024 y cesa el 31 de octubre de 2026. Sueldo S/ 4,500, asignación familiar S/ 123, comisiones de los últimos 6 meses: 800, 0, 950, 1,100, 0, 870. Tiene pendientes las vacaciones del periodo 2025-2026 (no gozadas) y las truncas del último periodo.',
    s:'**Paso 1 — Promedio de comisiones.** Entran al cálculo porque se percibieron en 4 de los 6 meses (el requisito es 3 o más).\nPromedio = (800 + 0 + 950 + 1,100 + 0 + 870) ÷ 6 = 3,720 ÷ 6 = **S/ 620**\n\n**Paso 2 — Remuneración computable para CTS.** Asumiendo última gratificación (julio 2026) de 4,500 + 123 + 620 = S/ 5,243:\nSueldo 4,500 + asignación familiar 123 + comisiones promedio 620 + un sexto de gratificación (5,243 ÷ 6 = 873.83)\n**Computable CTS = S/ 6,116.83**\n\n**Paso 3 — CTS truncal (mayo a octubre de 2026, 6 meses completos):**\nCTS = (6,116.83 ÷ 12) × 6 = **S/ 3,058.42**\n\n**Paso 4 — Gratificación truncal (julio a octubre de 2026, 4 meses completos):**\nBase = 4,500 + 123 + 620 = S/ 5,243\nGrati = (5,243 ÷ 6) × 4 = 3,495.33\nBonificación extraordinaria 9% = 314.58\n**Total gratificación = S/ 3,809.91**\n\n**Paso 5 — Vacaciones.** Hay dos conceptos:\n\n*(a) Vacaciones no gozadas del periodo 10/04/2025 al 09/04/2026 (año completo).* Al no haberse gozado dentro del año siguiente, corresponde la llamada triple remuneración:\n- Remuneración por el trabajo realizado en ese periodo: ya pagada mes a mes.\n- Remuneración vacacional: S/ 5,243\n- Indemnización vacacional equivalente: S/ 5,243\n**Subtotal: S/ 10,486** (la indemnización no está sujeta a aportes ni descuentos pensionarios).\n\n*(b) Vacaciones truncas del 10/04/2026 al 31/10/2026:* 6 meses completos y 21 días.\nTruncas = (5,243 ÷ 12) × 6 + (5,243 ÷ 360) × 21 = 2,621.50 + 305.84 = **S/ 2,927.34**\n\n**Paso 6 — Liquidación total:**\n\n| Concepto | Importe | Afecto a aportes |\n|---|---|---|\n| CTS truncal | 3,058.42 | No |\n| Gratificación truncal + bonificación | 3,809.91 | No (sí a quinta) |\n| Vacaciones no gozadas (remuneración) | 5,243.00 | Sí |\n| Indemnización vacacional | 5,243.00 | No |\n| Vacaciones truncas | 2,927.34 | Sí |\n| Remuneración de octubre | 5,243.00 | Sí |\n| **Total bruto** | **25,524.67** | |\n\n**Costo adicional para la empresa:** EsSalud 9% sobre los conceptos afectos (5,243 + 2,927.34 + 5,243 = 13,413.34) = **S/ 1,207.20**.\n\n**La lección de gestión:** los S/ 5,243 de indemnización vacacional son dinero perdido, puro costo por no haber programado el descanso. Con un control simple de vacaciones —un cuadro con la fecha de ingreso de cada trabajador y la fecha límite para gozar el descanso— se habría evitado. En empresas con 30 o 40 trabajadores, esta omisión suele costar varias decenas de miles de soles al año, y además deja el pasivo de la cuenta 4151 creciendo hasta que alguien lo nota.\n\n**Plazo de pago:** la liquidación debe abonarse dentro de las 48 horas de producido el cese. El retraso genera intereses laborales y es una infracción sancionable por SUNAFIL.'}
  ]
 },
 {
  id:'m4t3', titulo:'Regímenes laborales MYPE y el REMYPE', min:14,
  cont:`La Ley MYPE (cuyo texto único ordenado fue aprobado por el D.S. 013-2013-PRODUCE) creó regímenes laborales con menores costos para micro y pequeñas empresas. El acceso **no es automático**: depende de la inscripción en el **REMYPE**.

# Categorías y límites
|Categoría|Ventas anuales|Equivalente 2026 (UIT S/ 5,500)|
|Microempresa|Hasta 150 UIT|Hasta S/ 825,000|
|Pequeña empresa|Más de 150 hasta 1,700 UIT|Hasta S/ 9,350,000|
|Mediana empresa|Más de 1,700 hasta 2,300 UIT|Hasta S/ 12,650,000|

La mediana empresa existe para efectos de promoción, pero **no tiene régimen laboral especial**: sus trabajadores están en el régimen general.

# Comparación de beneficios
|Beneficio|Microempresa|Pequeña empresa|Régimen general|
|Vacaciones|15 días|15 días|30 días|
|Gratificaciones|No corresponden|Media remuneración en julio y diciembre|Una remuneración cada una|
|CTS|No corresponde|15 remuneraciones diarias por año, tope 90|Un sueldo más 1/6 de grati al año|
|Asignación familiar|No corresponde|No corresponde|10% de la RMV|
|Seguro de salud|SIS semicontributivo (aporte compartido con el Estado) o EsSalud según el caso|EsSalud 9%|EsSalud 9%|
|Pensiones|Opcional para el trabajador|Obligatorio (ONP o AFP)|Obligatorio|
|Indemnización por despido arbitrario|10 remuneraciones diarias por año, tope 90|20 remuneraciones diarias por año, tope 120|1.5 remuneraciones por año, tope 12|
|Jornada, descansos, RMV|Igual que el régimen general|Igual|Igual|

> Lo que **no** cambia en ningún régimen: la RMV, la jornada máxima de 8 horas diarias o 48 semanales, el descanso semanal, el pago de horas extras, el descanso en feriados, la protección a la maternidad y la seguridad y salud en el trabajo. El régimen MYPE reduce beneficios económicos, no derechos fundamentales.

# El ahorro, en números
Trabajador con sueldo de S/ 1,500:

|Concepto anual|Microempresa|Pequeña empresa|Régimen general|
|12 sueldos|18,000|18,000|18,000|
|Gratificaciones|0|1,500|3,000|
|Bonificación extraordinaria 9%|0|135|270|
|CTS|0|750|1,750|
|Asignación familiar (con hijos)|0|0|1,476|
|EsSalud 9%|0 (SIS, con aporte reducido)|1,620|1,953|
|**Costo anual aproximado**|**18,000 + SIS**|**22,005**|**26,449**|

La diferencia entre microempresa y régimen general es cercana al **40%** del costo laboral. Es un incentivo enorme, y por eso la fiscalización de SUNAFIL y SUNAT a la condición de MYPE es intensa.

! **Dos condiciones que la gente olvida.** Primero: el régimen laboral especial aplica solo desde la inscripción en el REMYPE y mientras la empresa mantenga los requisitos; si supera el límite de ventas por dos años consecutivos, pasa al régimen que corresponda, con reglas de transición. Segundo: los trabajadores que ya estaban contratados bajo el régimen general **no pueden ser trasladados** al régimen MYPE reduciendo sus beneficios; el régimen especial se aplica a las nuevas contrataciones. Intentar lo contrario es una reducción ilegal de remuneración.

# La trampa de constituir varias empresas
Una práctica común es dividir el negocio en tres sociedades para que cada una quede por debajo del límite de 150 UIT. Es riesgoso por dos vías:
- **Laboral**: SUNAFIL aplica el principio de **primacía de la realidad** y la doctrina del grupo de empresas. Si hay unidad de dirección, confusión de personal y un solo centro de decisión, se considera un único empleador y se liquidan los beneficios del régimen general para todos los trabajadores.
- **Tributario**: SUNAT puede aplicar la norma antielusiva general (Norma XVI del Código Tributario) y recalcular los tributos como si fuera una sola empresa, con el régimen que corresponda a los ingresos consolidados.

# Registro contable
No hay cuentas especiales. Lo que cambia es el **importe** de las provisiones:

@ Provisión mensual de beneficios, pequeña empresa, sueldo S/ 1,500
@ 62|6213 Gratificaciones (media remuneración por semestre)|125.00|
@ 62|6214 Vacaciones (15 días al año)|62.50|
@ 62|6291 CTS (15 remuneraciones diarias al año)|62.50|
@ 41|4114 Gratificaciones por pagar||125.00
@ 41|4151 Vacaciones por pagar||62.50
@ 41|4152 Compensación por tiempo de servicios||62.50`,
  claves:['Microempresa hasta 150 UIT (S/ 825,000) y pequeña empresa hasta 1,700 UIT (S/ 9,350,000) de ventas anuales en 2026.','El régimen laboral especial requiere inscripción vigente en el REMYPE.','Microempresa: 15 días de vacaciones, sin gratificaciones ni CTS; pequeña empresa: 15 días, media gratificación y CTS de 15 días por año.','RMV, jornada, horas extras, descansos y seguridad en el trabajo son iguales en todos los regímenes.','No se puede pasar a trabajadores del régimen general al MYPE reduciendo beneficios; y dividir la empresa para quedar bajo el límite expone a primacía de la realidad y a la norma antielusiva.'],
  ej:[
   {l:1,t:'mc',p:'Una microempresa inscrita en el REMYPE, ¿cuántos días de vacaciones debe otorgar al año?',
    o:['30 días','15 días','7 días','No corresponde vacaciones'],r:1,
    s:'15 días calendario por año completo de servicios, igual que en la pequeña empresa. El régimen general otorga 30. Lo que la microempresa no debe pagar son gratificaciones ni CTS, pero las vacaciones de 15 días son un derecho irrenunciable, y pueden reducirse a 7 días por acuerdo escrito con compensación económica por el resto, igual que en el régimen general con sus propias reglas.'},
   {l:1,t:'mc',p:'Una empresa con ventas anuales de S/ 3,000,000 en 2026 quiere acogerse al régimen laboral de microempresa. ¿Puede?',
    o:['Sí, si tiene menos de 10 trabajadores','No: S/ 3,000,000 supera las 150 UIT (S/ 825,000); le correspondería pequeña empresa','Sí, si se inscribe en el REMYPE','Solo si es una EIRL'],r:1,
    s:'No puede ser microempresa: el límite es 150 UIT = S/ 825,000 en 2026. Con S/ 3,000,000 de ventas califica como **pequeña empresa** (hasta 1,700 UIT), con media gratificación, CTS de 15 remuneraciones diarias por año, vacaciones de 15 días y EsSalud. El criterio vigente para la categorización es el nivel de ventas anuales; el número de trabajadores dejó de ser determinante.'},
   {l:2,t:'num',p:'Trabajador de pequeña empresa con sueldo S/ 1,800 que laboró el año completo. ¿Cuánto es su CTS anual?',
    u:'S/',r:900,tol:5,
    s:'En la pequeña empresa la CTS equivale a **15 remuneraciones diarias por año**, con tope de 90 remuneraciones diarias.\n\nRemuneración diaria = 1,800 ÷ 30 = S/ 60\nCTS anual = 60 × 15 = **S/ 900**\n\nEquivale a media remuneración mensual al año, frente a un sueldo más un sexto de gratificación (alrededor de S/ 2,100) en el régimen general. El tope de 90 remuneraciones diarias significa que, tras 6 años de servicios, la CTS acumulada deja de crecer por este concepto en los términos del régimen especial.'},
   {l:2,t:'ab',p:'Calcula y compara el costo laboral anual de un trabajador con sueldo S/ 1,600 y un hijo menor, en microempresa, pequeña empresa y régimen general.',
    s:'**Microempresa**\n\n| Concepto | Importe |\n|---|---|\n| 12 sueldos | 19,200 |\n| Gratificaciones | 0 |\n| CTS | 0 |\n| Asignación familiar | 0 |\n| Vacaciones (15 días, ya incluidas en el sueldo del mes de descanso) | 0 adicional |\n| Seguro de salud (SIS semicontributivo, aporte del empleador reducido y compartido con el Estado) | aprox. 180 |\n| **Costo anual aproximado** | **19,380** |\n\n**Pequeña empresa**\n\n| Concepto | Importe |\n|---|---|\n| 12 sueldos | 19,200 |\n| Gratificaciones (media remuneración × 2) | 1,600 |\n| Bonificación extraordinaria 9% | 144 |\n| CTS (15 remuneraciones diarias) | 800 |\n| Asignación familiar | 0 |\n| EsSalud 9% sobre sueldos | 1,728 |\n| **Costo anual aproximado** | **23,472** |\n\n**Régimen general**\n\n| Concepto | Importe |\n|---|---|\n| 12 sueldos | 19,200 |\n| Asignación familiar (12 × 123) | 1,476 |\n| Gratificaciones (2 remuneraciones de 1,723) | 3,446 |\n| Bonificación extraordinaria 9% | 310 |\n| CTS (1 computable ≈ 1,723 + 287 de un sexto) | 2,010 |\n| EsSalud 9% sobre sueldos y asignación | 1,861 |\n| **Costo anual aproximado** | **28,303** |\n\n**Comparación:**\n\n| Régimen | Costo anual | Diferencia vs. general |\n|---|---|---|\n| Microempresa | 19,380 | −31.5% |\n| Pequeña empresa | 23,472 | −17.1% |\n| Régimen general | 28,303 | — |\n\n**Lo que hay que decirle al dueño:** la diferencia entre microempresa y régimen general con **10 trabajadores** es de alrededor de S/ 89,000 al año. Es un ahorro legítimo si la empresa realmente califica y está inscrita en el REMYPE. Pero si la empresa supera el límite de ventas y mantiene el régimen especial, la contingencia es exactamente ese monto por cada año no prescrito, más intereses y multas. Y a diferencia de una contingencia tributaria, esta se reclama trabajador por trabajador, incluso años después del cese.'},
   {l:3,t:'ab',p:'Un empresario tiene tres S.A.C. (A, B y C) con ventas de S/ 700,000 cada una, todas acogidas al régimen de microempresa. Comparten local, el mismo gerente, un solo contador y los trabajadores rotan entre las tres según la carga. ¿Qué riesgos tiene y cuál es la exposición?',
    s:'**Riesgo laboral: primacía de la realidad y grupo de empresas.**\n\nSUNAFIL, y eventualmente un juez laboral, no se detienen en la forma societaria. Los indicios aquí son concluyentes: un solo centro de dirección (el mismo gerente), confusión de plantillas (los trabajadores rotan), unidad de local, y administración común. Con eso se configura un **único empleador** o un grupo de empresas con responsabilidad solidaria.\n\nConsecuencia: las ventas consolidadas son 3 × 700,000 = **S/ 2,100,000**, que supera las 150 UIT (S/ 825,000) y también podría ubicar al conjunto como pequeña empresa (hasta S/ 9,350,000). Los trabajadores tendrían derecho, cuando menos, a los beneficios de la pequeña empresa, y según cómo se resuelva el caso, a los del régimen general.\n\n**Exposición laboral estimada**, asumiendo 15 trabajadores con sueldo promedio de S/ 1,600 y 3 años no prescritos, con la diferencia de costo entre microempresa y pequeña empresa de alrededor de S/ 4,100 por trabajador al año:\n15 × 4,100 × 3 = **S/ 184,500**, más intereses laborales, más la multa de SUNAFIL (que se gradúa en UIT según el número de trabajadores afectados y la gravedad de la infracción). Si el caso se resolviera aplicando el régimen general, la diferencia por trabajador sube a cerca de S/ 8,900 anuales y la exposición supera los S/ 400,000.\n\n**Riesgo tributario: norma antielusiva general (Norma XVI).**\n\nSi la división societaria no tiene propósito económico distinto del ahorro tributario y laboral, SUNAT puede recalificar la operación y determinar los tributos como si se tratara de una sola empresa. Efectos: recálculo del régimen tributario aplicable (con ingresos consolidados de S/ 2,100,000, el NRUS y el RER quedan descartados), determinación de Impuesto a la Renta y IGV con las reglas del régimen que corresponda, multas e intereses. Además, las tres empresas son **partes vinculadas**, así que las operaciones entre ellas deben estar a valor de mercado y documentadas.\n\n**Riesgo adicional: responsabilidad solidaria.** En un grupo económico, los trabajadores pueden demandar a las tres empresas conjuntamente, y el patrimonio de las tres responde. La separación societaria no protege lo que pretendía proteger.\n\n**Qué haría un asesor serio:**\n\n1. **Evaluar si la estructura tiene razón de negocio real** (líneas de negocio distintas, mercados distintos, socios distintos, riesgos separados). Si la tiene, documentarla: actas, contratos entre empresas a valor de mercado, planillas separadas, locales o áreas delimitadas, cada empresa con su propia administración.\n2. **Si no la tiene**, ordenar la estructura: fusionar o concentrar la operación en una sola empresa, acoger a los trabajadores al régimen que corresponde y regularizar hacia adelante. Es caro, pero es una fracción del costo de una fiscalización con cuatro años de contingencia acumulada.\n3. **No rotar trabajadores entre empresas.** Es el indicio más fácil de probar y el más difícil de explicar: basta un registro de asistencia, un correo o la declaración de un trabajador.'}
  ]
 },
 {
  id:'m4t4', titulo:'Contabilización de la planilla y la PLAME', min:14,
  cont:`El registro de la planilla tiene tres momentos: el **devengo** (la planilla del mes), el **pago** al trabajador y el **pago de los tributos y aportes** al mes siguiente. Confundirlos es lo que deja las cuentas 41 y 40 con saldos que nadie entiende.

# El asiento de devengo
Planilla de octubre 2026, empresa del régimen general con 4 trabajadores:

|Concepto|Importe|
|Sueldos|18,000.00|
|Asignación familiar|369.00|
|Horas extras|820.00|
|Total remuneración bruta|19,189.00|
|Descuento ONP 13% (2 trabajadores, base 9,500)|(1,235.00)|
|Descuento AFP 13% (2 trabajadores, base 9,689)|(1,259.57)|
|Retención de renta de quinta|(420.00)|
|Neto a pagar|16,274.43|
|Aporte EsSalud 9%|1,727.01|

@ 31/10/2026 — Planilla de remuneraciones de octubre
@ 62|6211 Sueldos|18,369.00|
@ 62|6212 Horas extras|820.00|
@ 62|6271 Régimen de prestaciones de salud|1,727.01|
@ 40|4031 EsSalud||1,727.01
@ 40|4032 ONP||1,235.00
@ 40|40173 Renta de quinta categoría||420.00
@ 41|4071 AFP - Fondo, comisión y prima||1,259.57
@ 41|4111 Sueldos y salarios por pagar||16,274.43

@ 31/10 — Provisión mensual de beneficios sociales
@ 62|6213 Gratificaciones|3,198.17|
@ 62|6214 Vacaciones|1,599.08|
@ 62|6291 Compensación por tiempo de servicios|1,865.53|
@ 41|4114 Gratificaciones por pagar||3,198.17
@ 41|4151 Vacaciones por pagar||1,599.08
@ 41|4152 Compensación por tiempo de servicios||1,865.53

@ 31/10 — Destino de los gastos de personal por función
@ 94|Gastos de administración|11,427.30|
@ 95|Gastos de ventas|15,151.49|
@ 79|Cargas imputables a costos y gastos||26,578.79

@ 05/11 — Pago de la planilla por transferencia
@ 41|4111 Sueldos y salarios por pagar|16,274.43|
@ 10|1041 Cuentas corrientes operativas||16,274.43

@ 14/11 — Pago de tributos y aportes de octubre (PLAME y AFPnet)
@ 40|4031 EsSalud|1,727.01|
@ 40|4032 ONP|1,235.00|
@ 40|40173 Renta de quinta categoría|420.00|
@ 41|4071 AFP|1,259.57|
@ 10|1041 Cuentas corrientes operativas||4,641.58

# PLAME y PDT Plame
La **Planilla Mensual de Pagos (PLAME)** se presenta junto con el **T-Registro**, que es el registro de los trabajadores:

|Registro|Qué contiene|Cuándo|
|T-Registro|Datos del empleador, trabajadores, pensionistas, prestadores de servicios|Alta hasta el día del inicio de la prestación; baja dentro del plazo legal|
|PLAME|Remuneraciones, aportes, retenciones y jornadas del mes|Mensual, según el cronograma de SUNAT|
|AFPnet|Declaración y pago de aportes al Sistema Privado de Pensiones|Mensual, dentro de los 5 primeros días hábiles|

! El **alta en el T-Registro debe hacerse antes o el mismo día** del inicio de labores, no después. Trabajar sin estar registrado es una infracción grave de SUNAFIL, y si ocurre un accidente de trabajo el problema deja de ser una multa: la empresa responde directamente por las prestaciones que EsSalud no cubrirá.

# Los libros y registros laborales obligatorios
- **T-Registro** y **PLAME** (electrónicos, a través de SUNAT).
- **Boletas de pago**, entregadas al trabajador (pueden ser electrónicas con su consentimiento).
- **Registro de control de asistencia**, obligatorio salvo para personal de dirección y los no sujetos a fiscalización inmediata.
- **Registros de seguridad y salud en el trabajo** (Ley 29783): accidentes, capacitaciones, exámenes médicos, inducción.

# Cómo detectar errores en la planilla antes de que los detecte SUNAFIL
1. ¿La suma de las boletas cuadra con el asiento de la cuenta 62?
2. ¿El pasivo de la cuenta 41 al cierre del mes equivale al neto que falta pagar más las provisiones?
3. ¿Los importes declarados en la PLAME coinciden con los de la contabilidad? (SUNAT cruza esto automáticamente.)
4. ¿La base de EsSalud declarada es al menos la RMV por cada trabajador a jornada completa?
5. ¿Los conceptos "no remunerativos" realmente lo son, o hay bonos regulares escondidos?
6. ¿El saldo de la cuenta 4151 Vacaciones por pagar crece sin parar? Señal de descansos no otorgados.`,
  claves:['Tres momentos separados: devengo de la planilla, pago al trabajador y pago de tributos y aportes.','El EsSalud se registra como gasto (6271) y pasivo (4031); los descuentos del trabajador solo generan pasivo.','T-Registro antes o el mismo día del inicio de labores; PLAME mensual; AFPnet en los primeros 5 días hábiles.','SUNAT cruza automáticamente la PLAME con la contabilidad y con la declaración de renta: deben coincidir.','Un saldo creciente en la cuenta 4151 indica vacaciones no gozadas, con riesgo de triple remuneración.'],
  ej:[
   {l:1,t:'mc',p:'¿Cuándo debe darse de alta a un trabajador en el T-Registro?',
    o:['Dentro de los 30 días de ingreso','Antes o el mismo día del inicio de la prestación de servicios','Al cierre del mes','Cuando se presenta la PLAME'],r:1,
    s:'Antes o el mismo día en que el trabajador empieza a laborar. No hay un plazo de gracia posterior. Es la infracción laboral más fácil de detectar en una inspección: basta que SUNAFIL encuentre a una persona trabajando y no la ubique en el T-Registro. Y si ocurre un accidente antes del alta, la empresa asume directamente el costo de las prestaciones de salud y las indemnizaciones.'},
   {l:1,t:'num',p:'Planilla con remuneración bruta de S/ 24,000, descuentos pensionarios S/ 3,120 y retención de quinta S/ 650. ¿Cuánto es el neto a pagar a los trabajadores?',
    u:'S/',r:20230,tol:1,
    s:'Neto = 24,000 − 3,120 − 650 = **S/ 20,230**\n\nY el aporte a EsSalud de 24,000 × 9% = S/ 2,160 es costo adicional del empleador: no se descuenta del neto. El gasto total de planilla del mes es 24,000 + 2,160 = S/ 26,160, mientras que la salida de caja se divide en S/ 20,230 al trabajador (en los primeros días del mes siguiente) y S/ 5,930 de tributos y aportes (en la fecha de vencimiento de la PLAME).'},
   {l:2,t:'ab',p:'Explica qué saldos deberían quedar en las cuentas 40 y 41 al 31 de octubre, después del asiento de devengo de planilla del tema, y cuándo se extinguen.',
    s:'**Saldos al 31 de octubre (todos acreedores, es decir pasivos):**\n\n| Cuenta | Concepto | Saldo | Se paga |\n|---|---|---|---|\n| 4031 | EsSalud | 1,727.01 | Con la PLAME de octubre, en noviembre |\n| 4032 | ONP | 1,235.00 | Con la PLAME de octubre, en noviembre |\n| 40173 | Renta de quinta retenida | 420.00 | Con la PLAME de octubre, en noviembre |\n| 4071 | AFP | 1,259.57 | Por AFPnet, primeros 5 días hábiles de noviembre |\n| 4111 | Sueldos por pagar | 16,274.43 | Al trabajador, primeros días de noviembre |\n| 4114 | Gratificaciones por pagar | 3,198.17 | En diciembre (acumula el semestre) |\n| 4151 | Vacaciones por pagar | 1,599.08 | Cuando cada trabajador goce su descanso |\n| 4152 | CTS por pagar | 1,865.53 | En el depósito de noviembre |\n\n**La distinción clave** está entre los pasivos de **vencimiento inmediato** (4111, 4031, 4032, 40173, 4071), que se extinguen el mes siguiente, y los pasivos **acumulativos** (4114, 4151, 4152), que crecen mes a mes y se liquidan en fechas concretas del calendario laboral.\n\n**Qué revisar en cada cierre:**\n\n1. La **4114 Gratificaciones** debe crecer un sexto de la remuneración computable por mes y quedar en cero después del pago de julio y de diciembre. Si en agosto tiene saldo del semestre anterior, algo quedó sin pagar.\n2. La **4152 CTS** debe quedar en cero después de los depósitos de mayo y noviembre. Un saldo persistente significa depósitos no efectuados, que generan intereses a favor del trabajador.\n3. La **4151 Vacaciones** es la única que puede mantener saldo legítimamente, porque los descansos se toman en distintos momentos. Pero si crece año tras año sin bajar, hay vacaciones no gozadas acumulándose y el riesgo de triple remuneración.\n4. La **4111** debe quedar en cero tras el pago. Un saldo indica trabajadores no pagados o un pago registrado contra otra cuenta.'},
   {l:2,t:'mc',p:'SUNAT detecta que la empresa declaró en su PDT de Renta anual gastos de personal por S/ 480,000, mientras que la suma de las PLAME del año es S/ 390,000. ¿Qué significa?',
    o:['Es normal, son declaraciones distintas','Hay una inconsistencia: S/ 90,000 de gasto de personal sin respaldo en planilla, con riesgo de reparo','La PLAME siempre es menor','Se corrige automáticamente'],r:1,
    s:'Es una inconsistencia que SUNAT detecta de forma automática y que suele desencadenar una carta inductiva. Las explicaciones legítimas existen: provisiones de gratificaciones y CTS devengadas y no pagadas al cierre, vacaciones provisionadas, o servicios de cuarta categoría registrados como gasto de personal por error de clasificación. Pero hay que poder sustentarlas con la conciliación. Si los S/ 90,000 corresponden a pagos a personas no registradas en planilla, el gasto es no deducible (falta el comprobante y el registro), y además hay infracción laboral por trabajadores no declarados, con la contingencia de beneficios sociales por todo el periodo.'},
   {l:3,t:'ab',p:'Una empresa paga a tres personas S/ 3,000 mensuales cada una por recibo por honorarios (cuarta categoría), pero trabajan 48 horas semanales en el local, con horario fijo, usando equipos de la empresa y bajo supervisión directa del gerente. Analiza la situación y cuantifica el riesgo de un año.',
    s:'**Diagnóstico: es una relación laboral encubierta.** Los tres elementos esenciales del contrato de trabajo están presentes: prestación personal, remuneración y **subordinación** (horario fijo, supervisión directa, trabajo en el local con medios de la empresa, jornada completa). Por el principio de **primacía de la realidad**, la calificación no depende del documento que se firmó ni del comprobante que se emite, sino de los hechos.\n\n**Contingencia laboral de un año, por los tres trabajadores:**\n\n| Concepto | Por trabajador | Tres trabajadores |\n|---|---|---|\n| Gratificaciones (2 × 3,000) | 6,000 | 18,000 |\n| Bonificación extraordinaria 9% | 540 | 1,620 |\n| CTS (1 computable ≈ 3,500) | 3,500 | 10,500 |\n| Vacaciones no gozadas (remuneración + indemnización) | 6,000 | 18,000 |\n| EsSalud 9% sobre 12 meses | 3,240 | 9,720 |\n| Aportes pensionarios no retenidos (responsabilidad por la omisión) | 4,680 | 14,040 |\n| **Subtotal de un año** | **23,960** | **71,880** |\n\nMás intereses laborales, más la multa de SUNAFIL por no registrar trabajadores en el T-Registro (infracción muy grave, graduada en UIT según el número de trabajadores afectados), más las multas por no llevar registro de control de asistencia ni registros de seguridad y salud.\n\n**En materia laboral el plazo de prescripción es de 4 años** desde el cese, por lo que si la situación lleva tres años, la exposición se acerca a **S/ 215,000** más intereses y multas.\n\n**Contingencia tributaria:**\n- Las retenciones de **cuarta categoría** (8% cuando corresponde) debieron practicarse; si no se hicieron, hay omisión de retenciones con multa e intereses.\n- Al recalificarse como **quinta categoría**, debieron retenerse las sumas de la escala progresiva, y la empresa es responsable solidaria por las retenciones no efectuadas.\n- El gasto puede ser cuestionado por falta de cumplimiento de los requisitos aplicables a las rentas de quinta (el pago debe estar registrado en planilla).\n\n**Cómo se corrige, en orden:**\n\n1. **Registrar a los tres en el T-Registro y en planilla desde ya**, con el régimen laboral que corresponda a la empresa.\n2. **Evaluar con un abogado laboralista** la regularización del periodo anterior: en algunos casos conviene un acuerdo con los trabajadores con reconocimiento de beneficios, que reduce el riesgo de demanda; en otros, una regularización ante SUNAFIL dentro de un procedimiento de subsanación.\n3. **Rediseñar los casos que sí pueden ser cuarta categoría**: un verdadero servicio independiente no tiene horario impuesto, no se presta en exclusividad en el local del cliente con sus equipos, se factura por entregable y el prestador asume el riesgo del resultado. Si el trabajo que se necesita no tiene esas características, la contratación correcta es laboral, y el "ahorro" del recibo por honorarios es solo un pasivo diferido que crece con intereses.'}
  ]
 }
 ]
}
);
