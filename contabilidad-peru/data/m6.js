/* Contenido del curso — m6 · Contabilidad laboral y planilla
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
 id:'m6', nivel:'Intermedio · Avanzado', titulo:'Contabilidad laboral y planilla',
 resumen:'La remuneración y su naturaleza jurídica, aportes y descuentos, la retención de quinta categoría, beneficios sociales, regímenes MYPE, el registro contable de la planilla y las declaraciones laborales del mes.',
 temas:[
 {
  id:'m6t1', titulo:'La remuneración: naturaleza, conceptos remunerativos y no remunerativos', min:26,
  cont:`Casi todos los errores de una planilla nacen del mismo punto: haber calificado mal un concepto. Si un pago es remunerativo, entra en la base de EsSalud, de la ONP o la AFP, de la CTS, de las gratificaciones, de las vacaciones y de la quinta categoría. Si no lo es, no entra en ninguna. Un solo concepto mal clasificado se multiplica por seis bases de cálculo, en cada mes, por cada trabajador.

# La definición legal
$ Art. 6 de la LPCL (D.S. 003-97-TR): constituye remuneración para todo efecto legal
$ el íntegro de lo que el trabajador recibe por sus servicios, en dinero o en especie,
$ cualquiera sea la forma o denominación que tenga, siempre que sea de su LIBRE DISPOSICIÓN

De esa definición salen los **tres elementos** que hay que verificar en cada concepto:

|Elemento|Pregunta que resuelve|
|**Contraprestación**|¿Se paga por los servicios prestados, o por otra causa?|
|**Libre disposición**|¿El trabajador puede usar ese dinero como quiera, o está destinado a un fin específico?|
|**Ingreso al patrimonio**|¿Incrementa el patrimonio del trabajador, o solo reembolsa un gasto que hizo por la empresa?|

> La frase **"cualquiera sea la forma o denominación que tenga"** es la clave de todo el sistema. El nombre del concepto no define su naturaleza. Llamar "bono de productividad no remunerativo" a un pago fijo que se entrega todos los meses no lo convierte en no remunerativo: es remuneración con otro nombre. Es la primacía de la realidad aplicada a la estructura salarial.

# Los conceptos NO remunerativos (art. 19 del D.S. 001-97-TR y art. 7 de la LPCL)
La lista es **taxativa**: solo lo que la ley señala está excluido.

|Concepto|Condición para que no sea remunerativo|
|**Gratificaciones extraordinarias**|Otorgadas a título de **liberalidad**, ocasionales. Si se repiten dos años consecutivos, se consolidan y se vuelven remunerativas|
|**Utilidades** (D. Leg. 892)|Participación legal o convencional en las utilidades|
|**Condiciones de trabajo**|Entregas para que el trabajador **cumpla su labor**: uniformes, herramientas, equipos de protección, celular de trabajo, viáticos sustentados|
|**Canasta de Navidad** o similares|Entregas en especie por fechas especiales|
|**Movilidad supeditada a la asistencia**|Debe cubrir **razonablemente** el traslado y estar condicionada a que el trabajador asista. Un monto fijo que se paga aunque falte es remuneración|
|**Asignación por educación**|Por el **monto razonable** y debidamente sustentada: del trabajador o de sus hijos|
|**Asignaciones por nacimiento, fallecimiento y matrimonio**|Y otras de semejante naturaleza, por hechos extraordinarios|
|**Bonificación por cierre de pliego**|En negociación colectiva|
|**Refrigerio** que no constituye alimentación principal|El refrigerio que **sustituye** una comida principal sí es remuneración|
|**Bienes de la propia empresa**|Otorgados para el consumo directo del trabajador y su familia|
|**Alimentación como condición de trabajo**|Por ejemplo en campamentos mineros, donde es indispensable para la labor|

! La **alimentación principal** —desayuno, almuerzo o refrigerio que lo sustituya, y cena— **SÍ es remuneración**, sea en dinero o en especie, salvo que califique como condición de trabajo. Es el concepto que más se clasifica mal, porque la intuición dice lo contrario.

# El cuadro que todo contador debe tener pegado al monitor
|Concepto|EsSalud 9%|ONP / AFP|CTS|Gratificaciones|Vacaciones|5ta categoría|
|Remuneración básica|Sí|Sí|Sí|Sí|Sí|Sí|
|Asignación familiar|Sí|Sí|Sí|Sí|Sí|Sí|
|Horas extras|Sí|Sí|Sí (si son regulares)|Sí (si son regulares)|Sí|Sí|
|Comisiones|Sí|Sí|Sí (promedio)|Sí (promedio)|Sí|Sí|
|Alimentación principal|Sí|Sí|Sí|Sí|Sí|Sí|
|**Gratificaciones de ley**|**No**|**No**|No|—|No|**Sí**|
|**CTS**|**No**|**No**|—|No|No|**No**|
|**Utilidades**|**No**|**No**|No|No|No|**Sí**|
|**Condiciones de trabajo**|No|No|No|No|No|No|
|**Movilidad supeditada**|No|No|No|No|No|No|
|**Gratificación extraordinaria**|No|No|No|No|No|**Sí**|

$ Regla que resume el cuadro: casi todo lo remunerativo es afecto a todo;
$ pero gratificaciones, CTS y utilidades están INAFECTAS a aportes y SÍ gravadas con quinta

La excepción de las gratificaciones y la CTS proviene de la **Ley 30334**, que estableció de forma permanente su inafectación a aportes previsionales y de salud. Esa inafectación es la razón de ser de la **bonificación extraordinaria del 9%**: el 9% de EsSalud que el empleador deja de pagar sobre la gratificación se entrega al trabajador (6.75% si la empresa está en una EPS).

# Los datos de referencia vigentes
|Dato|Valor 2026|
|**Remuneración Mínima Vital (RMV)**|**S/ 1,230** desde el 1 de octubre de 2026 (D.S. 015-2026-TR)|
|**Asignación familiar**|**S/ 123** (10% de la RMV), Ley 25129|
|**UIT**|**S/ 5,500**|
|**7 UIT** (deducción de quinta)|**S/ 38,500**|
|Jornada máxima|8 horas diarias o 48 semanales|
|Sobretasa por trabajo nocturno|35% de la RMV, para labores entre 22:00 y 06:00|

**La asignación familiar** merece precisión, porque se calcula mal con frecuencia:
- Corresponde a los trabajadores sujetos al régimen laboral de la actividad privada cuya remuneración no se regule por negociación colectiva.
- Requiere tener **uno o más hijos menores de 18 años**, o mayores que cursen estudios superiores, hasta los 24 años.
- Es un **monto único de S/ 123**, independientemente del número de hijos: no se paga por hijo.
- Es **plenamente remunerativa**: entra en todas las bases.
- Se paga mientras subsista el derecho; el trabajador debe acreditarlo.

# La estructura de la boleta de pago
|Bloque|Qué contiene|Quién lo asume|
|**Ingresos**|Básico, asignación familiar, horas extras, comisiones, bonificaciones, alimentación|—|
|**Descuentos**|ONP o AFP, retención de quinta categoría, descuentos judiciales, adelantos y préstamos autorizados|**El trabajador**|
|**Aportes del empleador**|EsSalud 9%, SCTR si corresponde, Senati o Sencico según la actividad, seguro de vida ley|**La empresa**|
|**Neto a pagar**|Ingresos menos descuentos|—|

! La distinción entre **descuento** y **aporte del empleador** es la que más confunde a los trabajadores y la que un contador debe saber explicar. El EsSalud del 9% **nunca** se descuenta del sueldo: es un costo adicional de la empresa. La ONP del 13% y el aporte a la AFP **sí** se descuentan: salen del sueldo del trabajador.

# La Remuneración Integral Anual (art. 8 de la LPCL)
El empleador y el trabajador que percibe una remuneración mensual **no menor a 2 UIT** pueden pactar una remuneración integral anual que comprenda todos los beneficios legales y convencionales, salvo la participación en las utilidades.

$ 2 UIT en 2026 = S/ 11,000 mensuales como piso para pactar una RIA

La RIA simplifica la gestión, pero debe computarse de forma que ningún beneficio quede por debajo del mínimo legal, y se paga en las fechas convenidas. No elimina la obligación de registrar cada concepto en la planilla electrónica.

# El costo real de un trabajador
Un gerente que escucha "el sueldo es S/ 2,500" cree que el trabajador cuesta S/ 30,000 al año. No es así. Con sueldo básico de S/ 2,500 más asignación familiar, en régimen general:

|Concepto|Cálculo|Importe anual|
|12 remuneraciones|2,623 × 12|31,476|
|2 gratificaciones|2,623 × 2|5,246|
|Bonificación extraordinaria 9%|5,246 × 9%|472|
|CTS (2 depósitos)|aproximadamente|3,060|
|EsSalud 9%|31,476 × 9%|2,833|
|**Costo anual aproximado**||**43,087**|

$ Factor = 43,087 ÷ 31,476 = 1.37 veces la remuneración anualizada

Y ese factor sube con el seguro de vida ley, el SCTR en actividades de riesgo, los aportes a Senati o Sencico y las utilidades. En empresas con esos conceptos, el factor se acerca a **1.50**. Ese número es el que debe usar la gerencia para presupuestar una contratación, y es información que el contador aporta y nadie más tiene.`,
  claves:['Remuneración es todo lo que el trabajador recibe por sus servicios y es de su libre disposición; el nombre del concepto no define su naturaleza.','La lista de conceptos no remunerativos es taxativa: solo lo que la ley excluye está excluido.','La alimentación principal sí es remuneración; el refrigerio que no sustituye una comida, no.','Gratificaciones, CTS y utilidades están inafectas a aportes previsionales y de salud, pero sí están gravadas con quinta categoría.','El costo real de un trabajador es de 1.37 a 1.50 veces su remuneración anualizada, no una vez.'],
  preg:[
   {p:'¿Por qué el nombre que se le da a un concepto en la boleta no determina si es remunerativo?',
    r:'Porque el artículo 6 de la LPCL define la remuneración como todo lo que el trabajador recibe por sus servicios y es de su libre disposición, **cualquiera sea la forma o denominación que tenga**. Es la primacía de la realidad aplicada a la estructura salarial: lo que define la naturaleza de un pago es su causa y su destino, no su etiqueta. Un "bono no remunerativo" que se paga todos los meses por un monto fijo y del que el trabajador dispone libremente es remuneración, y SUNAFIL o SUNAT lo recalificarán con efectos retroactivos en las seis bases de cálculo. La consecuencia práctica es que el contador no debe aceptar una denominación creativa como solución a un problema de costos.'},
   {p:'¿Qué diferencia a una condición de trabajo de un concepto remunerativo?',
    r:'La **libre disposición** y la **finalidad**. Una condición de trabajo se entrega para que el trabajador **pueda cumplir su labor**: el uniforme, las herramientas, los equipos de protección, el celular de trabajo, los viáticos sustentados de un viaje. El trabajador no se enriquece con ella, y si dejara el puesto, la entrega perdería sentido. La remuneración, en cambio, ingresa a su patrimonio y puede usarla para lo que quiera. La prueba práctica es preguntarse: si el trabajador no tuviera que hacer esta labor, ¿seguiría recibiendo esto? Si la respuesta es no, es condición de trabajo. Y la prueba documental es que esté sustentada: viáticos con comprobantes, uniformes con cargo de entrega.'},
   {p:'¿Por qué existe la bonificación extraordinaria del 9% sobre las gratificaciones?',
    r:'Porque la Ley 30334 inafectó de forma permanente las gratificaciones de los aportes previsionales y de salud. Al dejar de pagar el 9% de EsSalud sobre la gratificación, el empleador obtiene un ahorro, y la ley dispuso que ese ahorro se entregue al trabajador como una **bonificación extraordinaria** equivalente al 9% de la gratificación. Si la empresa tiene convenio con una EPS, el porcentaje es del 6.75%, porque el ahorro es menor. La bonificación es inafecta a aportes pero sí está gravada con quinta categoría. Omitirla es uno de los errores más frecuentes en julio y diciembre, y configura un incumplimiento de pago de beneficios.'},
   {p:'La movilidad que una empresa paga a sus trabajadores, ¿es remunerativa?',
    r:'Depende de dos condiciones. No es remunerativa cuando está **supeditada a la asistencia** al centro de trabajo y cubre **razonablemente** el traslado: si el trabajador falta, no la recibe, y el monto guarda relación con el costo real del transporte. Sí es remunerativa cuando se paga como un monto fijo mensual que el trabajador recibe aunque no asista, o cuando excede largamente lo que cuesta el traslado, porque entonces es libre disposición disfrazada de reembolso. La forma de documentarla correctamente es vincularla al control de asistencia y fijar un monto diario, no mensual.'},
   {p:'¿Por qué es importante que la gerencia conozca el factor de costo laboral y no solo el sueldo?',
    r:'Porque las decisiones de contratación, de precio y de presupuesto se toman con ese número, y usar el sueldo básico subestima el costo en más del 37%. Una empresa que cotiza un servicio calculando el costo de su personal como doce sueldos pierde dinero en cada contrato. El factor también explica por qué julio y diciembre destruyen la caja de las empresas que no provisionan: el costo estaba ahí todo el año, solo que no se había registrado. Entregar a la gerencia el costo real anualizado de cada puesto, con el detalle de sus componentes, es una de las contribuciones más valiosas y menos frecuentes del área contable.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estos conceptos SÍ es remunerativo?',
    o:['El uniforme de trabajo entregado al personal de ventas','El almuerzo que la empresa paga en efectivo a sus trabajadores','La canasta de Navidad','Los viáticos sustentados de un viaje de trabajo'],r:1,
    s:'El **almuerzo pagado en efectivo** es remunerativo: constituye alimentación principal y es de libre disposición del trabajador. Entra en la base de EsSalud, de los aportes previsionales, de la CTS, de las gratificaciones, de las vacaciones y de la quinta categoría. El uniforme y los viáticos sustentados son condiciones de trabajo, porque se entregan para que el trabajador cumpla su labor y no incrementan su patrimonio. La canasta de Navidad está expresamente excluida por el artículo 19 del D.S. 001-97-TR. Este es el error de clasificación más común en las planillas peruanas.'},
   {l:1,t:'num',p:'Un trabajador tiene sueldo básico de S/ 1,800 y tres hijos menores de edad. ¿Cuánto le corresponde de asignación familiar al mes?',
    u:'S/',r:123,tol:0,
    s:'**S/ 123**, que es el 10% de la RMV de S/ 1,230 vigente desde octubre de 2026.\n\nEl error típico es multiplicar por el número de hijos. La Ley 25129 establece un **monto único** por trabajador, no por hijo: tenga uno o cinco hijos, el trabajador recibe S/ 123. El requisito es tener al menos un hijo menor de 18 años, o mayor que curse estudios superiores hasta los 24 años, y el trabajador debe acreditarlo. La asignación es plenamente remunerativa, de modo que entra en las seis bases de cálculo y en el costo del empleador.'},
   {l:2,t:'num',p:'Calcula el costo anual total de un trabajador con sueldo básico de S/ 3,200 más asignación familiar, en régimen general, considerando 12 remuneraciones, 2 gratificaciones, la bonificación extraordinaria del 9%, la CTS y el EsSalud.',
    u:'S/',r:54586,tol:120,
    s:'**Remuneración mensual computable** = 3,200 + 123 = **S/ 3,323**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| 12 remuneraciones | 3,323 × 12 | 39,876 |\n| 2 gratificaciones | 3,323 × 2 | 6,646 |\n| Bonificación extraordinaria 9% | 6,646 × 9% | 598.14 |\n| CTS: base = 3,323 + (3,323 ÷ 6) = 3,876.83; anual = 3,876.83 ÷ 12 × 12 | | 3,876.83 |\n| EsSalud 9% sobre remuneraciones | 39,876 × 9% | 3,588.84 |\n| **Costo anual** | | **54,585.81** |\n\nAproximadamente **S/ 54,500**.\n\n**Factor de costo** = 54,586 ÷ 39,876 = **1.37 veces** la remuneración anualizada.\n\nY ese factor todavía no incluye el seguro de vida ley, el SCTR si la actividad es de riesgo, Senati o Sencico según el giro, ni las utilidades si la empresa tiene más de 20 trabajadores. Con esos conceptos, el factor llega cerca de 1.50. Este es el número que la gerencia necesita para presupuestar y para cotizar servicios, y casi ninguna empresa pequeña lo tiene calculado.'},
   {l:2,t:'ab',p:'Una empresa paga a sus 15 vendedores un "bono de movilidad no remunerativo" de S/ 400 mensuales fijos, que reciben completo incluso los meses en que tienen faltas. Analiza el riesgo y cuantifícalo para un año.',
    s:'**La calificación correcta: es remuneración.** La movilidad solo es no remunerativa cuando está **supeditada a la asistencia** al centro de trabajo y cubre razonablemente el traslado. Aquí falla la condición esencial: se paga completo aunque el trabajador falte, de modo que no está supeditada a la asistencia. Es un monto fijo de libre disposición, es decir, remuneración con otro nombre.\n\n**Las bases afectadas y el pasivo oculto, por trabajador y por año:**\n\n| Base | Cálculo | Importe anual |\n|---|---|---|\n| Movilidad recalificada | 400 × 12 | 4,800 |\n| EsSalud 9% omitido | 4,800 × 9% | 432 |\n| Aportes previsionales omitidos (descuento no efectuado, ~13%) | 4,800 × 13% | 624 |\n| Gratificaciones omitidas (2 × 400) | | 800 |\n| Bonificación extraordinaria 9% sobre esas gratificaciones | | 72 |\n| CTS omitida (incluye 1/6 de gratificación en la base) | aproximadamente | 466 |\n| Vacaciones: ya están dentro de los 12 meses | | — |\n| **Beneficios y aportes omitidos por trabajador** | | **~2,394** |\n\n**Por los 15 vendedores:** 2,394 × 15 = **S/ 35,910 por año**.\n\n**Y el problema es acumulativo.** Si la práctica lleva cuatro años, el pasivo laboral supera los S/ 140,000, más intereses legales laborales sobre los beneficios y los intereses moratorios tributarios sobre el EsSalud y los aportes.\n\n**Las dos contingencias, que se suman:**\n\n| Frente | Riesgo |\n|---|---|\n| **SUNAFIL** | Infracción por no pagar beneficios e incumplir el registro correcto en planilla. La multa se calcula en UIT según el tamaño de la empresa y el número de trabajadores afectados: con 15 afectados, el monto es significativo |\n| **SUNAT** | Omisión de aportes a EsSalud y de retenciones previsionales, con la infracción del numeral 1 del artículo 178 por declarar cifras falsas en la PLAME, más intereses |\n\n**La corrección, en orden:**\n\n1. **Decidir la estructura futura.** Dos caminos válidos: (a) convertir el concepto en movilidad genuinamente supeditada a la asistencia, con monto diario vinculado al control de asistencia y proporcional a los días efectivamente trabajados; o (b) reconocerlo como remuneración, incorporarlo al básico y asumir el costo correcto.\n2. **Cuantificar el pasivo de los periodos no prescritos**, laboral y tributario, con sus plazos distintos.\n3. **Regularizar lo tributario con subsanación voluntaria**, que rebaja la multa del 178.1 al 5% de su importe, antes de cualquier notificación.\n4. **Evaluar la regularización laboral** con asesoría legal, porque el pago de beneficios omitidos tiene implicancias en la relación con los trabajadores y en el plazo de prescripción laboral, que es distinto al tributario.\n5. **Documentar la nueva estructura** en el reglamento interno y en los contratos.\n\n**La lección:** una estructura salarial diseñada para reducir costos mediante denominaciones no produce ahorro, produce un pasivo diferido que crece con intereses. El ahorro real se consigue con decisiones de productividad, no de etiquetas.'},
   {l:3,t:'ab',p:'Diseña la estructura salarial de un puesto de supervisor de almacén con un presupuesto total de S/ 4,500 mensuales de costo para la empresa, en régimen general, optimizando legalmente los conceptos. Justifica cada decisión.',
    s:'**Primero, entender el problema al revés.** El presupuesto es de **costo para la empresa**, no de sueldo. Hay que partir del costo e ir hacia atrás, porque cada sol de remuneración arrastra 0.37 soles de carga adicional.\n\n**Paso 1 — Determinar la remuneración que cabe en el presupuesto**\n\n$ Remuneración mensual × 1.37 = 4,500\n$ Remuneración mensual = 4,500 ÷ 1.37 = 3,285\n\nPero el factor 1.37 es anual y contiene gratificaciones y CTS. Para trabajar con un costo mensual uniforme hay que provisionar:\n\n| Concepto | Cálculo mensual | Importe |\n|---|---|---|\n| Remuneración | base | 3,285 |\n| EsSalud 9% | 3,285 × 9% | 295.65 |\n| Provisión de gratificaciones (2/12 de la remuneración) | 3,285 × 2 ÷ 12 | 547.50 |\n| Provisión de bonificación extraordinaria 9% | 547.50 × 9% | 49.28 |\n| Provisión de CTS (1/12 de la base con 1/6 de gratificación) | (3,285 + 547.50) ÷ 12 | 319.38 |\n| **Costo mensual total** | | **4,496.81** |\n\nEl presupuesto de S/ 4,500 alcanza para una remuneración de **S/ 3,285** mensuales. Nótese que las vacaciones no se suman como costo adicional: son remuneración que ya está dentro de los doce meses, aunque sí se provisionan por el devengo.\n\n**Paso 2 — Estructurar la remuneración**\n\n| Concepto | Importe | Justificación |\n|---|---|---|\n| Básico | 3,162 | El núcleo remunerativo |\n| Asignación familiar | 123 | Si acredita hijos; es obligatoria, no opcional |\n| **Total remuneración** | **3,285** | Base de las seis bases de cálculo |\n\n**Paso 3 — Lo que se puede agregar SIN costo adicional de cargas, y por qué**\n\nAquí está la optimización legítima, y conviene ser muy claro sobre sus límites:\n\n| Concepto adicional | ¿Aumenta las cargas? | Condición indispensable |\n|---|---|---|\n| **Movilidad supeditada a la asistencia** | No | Monto **diario** vinculado al control de asistencia, proporcional a días trabajados, razonable frente al costo real del transporte |\n| **Uniforme y equipos de protección** | No | Condición de trabajo, con cargo de entrega firmado |\n| **Celular y plan de datos de trabajo** | No | A nombre de la empresa, para uso laboral |\n| **Capacitación vinculada al puesto** | No | Es gasto de la empresa, no renta del trabajador, si se vincula a la labor |\n| **Asignación por educación** | No | Por monto razonable y **sustentada** con documentos del centro de estudios |\n| **EPS en lugar de EsSalud** | Reduce el aporte | El crédito del 25% del aporte, con los requisitos de ley |\n\n**Paso 4 — Lo que NO se debe hacer, y es el núcleo del ejercicio**\n\n| Práctica | Por qué falla |\n|---|---|\n| Llamar "bono no remunerativo" a un pago fijo mensual | Se recalifica por el art. 6 de la LPCL; genera pasivo en seis bases |\n| Movilidad fija mensual que se paga aunque falte | No está supeditada a la asistencia: es remuneración |\n| Pagar una parte "por fuera" sin boleta | Omisión de planilla, la infracción laboral más grave, y delito tributario potencial |\n| Registrar al supervisor como trabajador de cuarta categoría con recibo por honorarios | Primacía de la realidad: hay subordinación, horario y órdenes. Se recalifica a quinta con todos los beneficios retroactivos |\n| Partir la remuneración entre dos empresas vinculadas | Riesgo de recalificación y de responsabilidad solidaria |\n\n**Paso 5 — Documentación que respalda la estructura**\n\n1. **Contrato de trabajo** con la descripción del puesto, la remuneración y los conceptos no remunerativos expresamente identificados con su causa.\n2. **Política de movilidad** escrita: monto diario, condición de asistencia, forma de control.\n3. **Cargo de entrega** de uniformes y equipos, firmado.\n4. **Sustento de la asignación por educación**, si se otorga.\n5. **Boleta de pago** que refleje cada concepto en su naturaleza correcta, con el código que corresponde en la planilla electrónica.\n\n**La conclusión profesional que hay que entregarle a la gerencia:** el margen de optimización legítima de una estructura salarial existe, pero es modesto y se concentra en conceptos que tienen una causa real distinta de la contraprestación: movilidad efectiva, condiciones de trabajo, educación sustentada, EPS. Todo lo demás es diferir un costo, no eliminarlo. Y un pasivo laboral diferido se paga con intereses, multas y, con frecuencia, en un juicio laboral donde la carga de la prueba recae sobre el empleador.'}
  ],
  proy:{
   t:'Estructura salarial y costo laboral de tu empresa',
   ctx:`Tu empresa ya tiene operaciones, tributos y contingencias. Ahora le vas a poner personas. Y vas a calcular lo que realmente cuestan, que es el dato que ninguna empresa pequeña tiene.`,
   pasos:[
    'Define la plantilla de tu empresa: entre tres y seis puestos, con su descripción, su jornada y su remuneración básica propuesta. Al menos uno debe tener asignación familiar y al menos uno debe estar cerca de la RMV.',
    'Para cada puesto, clasifica todos los conceptos que recibirá usando los tres elementos de la definición legal: contraprestación, libre disposición e ingreso al patrimonio.',
    'Arma el cuadro de afectación de cada concepto a las seis bases: EsSalud, aportes previsionales, CTS, gratificaciones, vacaciones y quinta categoría.',
    'Calcula el costo anual total de cada puesto y el factor de costo sobre la remuneración anualizada.',
    'Calcula el costo laboral total anual de tu empresa y exprésalo como porcentaje de las ventas que registraste en el Módulo 2.',
    'Identifica al menos dos conceptos no remunerativos que tu empresa podría otorgar legítimamente, con la condición que cada uno debe cumplir y la documentación que lo sustenta.',
    'Redacta el modelo de boleta de pago de uno de los puestos, con sus tres bloques: ingresos, descuentos y aportes del empleador.'
   ],
   entrega:[
    'La plantilla con la descripción y remuneración de cada puesto.',
    'El cuadro de afectación de conceptos a las seis bases.',
    'El costo anual por puesto con su factor, y el costo laboral total como porcentaje de ventas.',
    'La boleta de pago modelo y la documentación de respaldo de los conceptos no remunerativos.'
   ],
   crit:[
    'La asignación familiar se calcula como monto único de S/ 123, no por hijo.',
    'Las gratificaciones y la CTS figuran como inafectas a aportes y afectas a quinta categoría.',
    'El factor de costo se calcula sobre la remuneración anualizada y queda entre 1.35 y 1.55.'
   ],
   pista:'El costo laboral como porcentaje de las ventas es el indicador que más dice sobre la viabilidad de una empresa pequeña. Si supera el 35% en una comercializadora, hay un problema de estructura que la contabilidad debe señalar.'
  },
  proyInt:{
   t:'Perfil completo de tu empresa: tributario y laboral',
   integra:'1.1 a 6.1',
   ctx:`Hasta ahora tu empresa tenía operaciones y tributos. Con trabajadores cambia todo: aparecen nuevas obligaciones formales, nuevos tributos, nuevas contingencias y un nuevo bloque de costos. Vas a actualizar el perfil completo.`,
   pasos:[
    'Actualiza el perfil tributario del Módulo 3 incorporando las obligaciones que surgen al tener trabajadores: EsSalud, aportes previsionales, retención de quinta categoría, T-Registro y PLAME.',
    'Incorpora el costo laboral a los estados financieros del Módulo 2: reconstruye el estado de resultados agregando los gastos de personal por función (costo de ventas, gastos de venta, gastos de administración) y verifica que el resultado siga cuadrando.',
    'Recalcula el Impuesto a la Renta anual de tu empresa considerando los gastos de personal, verificando el requisito de causalidad y el de pago de las remuneraciones antes del vencimiento de la declaración anual para su deducibilidad.',
    'Actualiza el registro de contingencias del Módulo 5 agregando las contingencias laborales: conceptos mal clasificados, trabajadores no registrados, beneficios no provisionados.',
    'Actualiza la matriz de cumplimiento del subtema 5.4 con las nuevas obligaciones formales laborales, sus plazos y sus responsables.',
    'Elabora el cuadro comparativo del costo de tu empresa antes y después de incorporar trabajadores, en soles y como porcentaje de ventas, y señala el efecto en el margen.'
   ],
   entrega:[
    'El perfil tributario y laboral actualizado.',
    'El estado de resultados reconstruido con los gastos de personal por función.',
    'El cálculo actualizado del Impuesto a la Renta anual.',
    'El registro de contingencias y la matriz de cumplimiento actualizados, y el cuadro comparativo de costos.'
   ],
   crit:[
    'El estado de resultados sigue cuadrando después de incorporar los gastos de personal.',
    'La deducibilidad de las remuneraciones verifica el requisito de pago antes del vencimiento de la declaración anual.',
    'Las contingencias laborales están cuantificadas en soles, no descritas.'
   ],
   pista:'El requisito del inciso v) del artículo 37 de la Ley del Impuesto a la Renta es el que más gastos de personal desconoce: las rentas de segunda, cuarta y quinta categoría son deducibles solo si se pagaron dentro del plazo para presentar la declaración anual. Una gratificación provisionada y no pagada no es deducible en ese ejercicio.'
  },
  fuentes:[
   {a:'D.S. 003-97-TR — Ley de Productividad y Competitividad Laboral (LPCL)', o:'Artículos 6, 7 y 8', n:'definición de remuneración, conceptos no remunerativos y remuneración integral anual'},
   {a:'D.S. 001-97-TR — TUO de la Ley de CTS', o:'Artículos 19 y 20', n:'lista taxativa de conceptos no remunerativos'},
   {a:'Ley 25129 y D.S. 035-90-TR', o:'Asignación familiar', n:'requisitos, monto único y naturaleza remunerativa'},
   {a:'Ley 30334', o:'Inafectación permanente de gratificaciones y CTS', n:'inafectación a aportes y bonificación extraordinaria del 9%'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'naturaleza de la remuneración, conceptos no remunerativos y criterios de recalificación'},
   {a:'Víctor Ferrer Quea', o:'Estados financieros y contabilidad laboral', n:'tratamiento contable de la remuneración y de los aportes del empleador'}
  ]
 },
 {
  id:'m6t2', titulo:'Aportes del empleador, descuentos y la retención de quinta categoría', min:28,
  cont:`Sobre la remuneración se construyen dos pisos distintos: lo que el **empleador paga además** del sueldo, y lo que se **descuenta** del sueldo del trabajador. Confundirlos es el error que más conflictos genera, y calcular mal la retención de quinta es el que más ajustes produce en diciembre.

# Los aportes del empleador: costo, nunca descuento
|Aporte|Tasa|Base|Quién lo paga|
|**EsSalud**|**9%**|Remuneración afecta, con base mínima de **una RMV** (S/ 1,230)|El empleador|
|**EsSalud agrario**|4%|Para trabajadores del régimen agrario|El empleador|
|**SCTR**|Según la póliza y el nivel de riesgo|Remuneración asegurable|El empleador|
|**Senati**|**0.75%**|Total de remuneraciones. Solo empresas de la **categoría D** de la CIIU (actividad industrial manufacturera) con **más de 20 trabajadores**|El empleador|
|**Sencico**|**0.2%**|Sobre el total de los **ingresos por construcción**, no sobre la planilla|El empleador|
|**Seguro de Vida Ley**|Prima según la póliza|Remuneración asegurable|El empleador|

! La **base mínima del EsSalud** es una RMV. Un trabajador a tiempo parcial que gana S/ 700 genera un aporte de EsSalud calculado sobre S/ 1,230, no sobre S/ 700. Es uno de los ajustes que SUNAT detecta de forma automática al cruzar la PLAME.

**El Seguro de Vida Ley** merece atención: la Ley 29549 modificó el régimen y la obligación nace **desde el inicio de la relación laboral**, no después de cuatro años como establecía la norma original. Es un seguro de bajo costo cuya omisión genera, en caso de fallecimiento del trabajador, la obligación del empleador de pagar directamente el beneficio, que puede ser de varias remuneraciones.

**El SCTR** (Seguro Complementario de Trabajo de Riesgo) es obligatorio para trabajadores que realizan las actividades de riesgo del Anexo 5 del D.S. 009-97-SA: construcción, minería, industria pesada, transporte, entre otras. Comprende dos coberturas, **salud** y **pensiones**, que pueden contratarse en entidades distintas. Su omisión es una infracción muy grave.

# Los descuentos del trabajador
|Descuento|Tasa|Observación|
|**ONP (SNP)**|**13%**|Sobre la remuneración asegurable. Tasa única y fija|
|**AFP**|**10% al fondo** + comisión + prima de seguro|La comisión puede ser sobre el flujo o mixta, y varía por AFP; la prima se calcula sobre la remuneración asegurable con un **tope** que fija la SBS trimestralmente|
|**Retención de quinta categoría**|Según la escala progresiva|Solo si la proyección anual supera 7 UIT|
|**Descuentos judiciales**|Según la resolución|Alimentos, embargos. Son de cumplimiento obligatorio|
|**Adelantos y préstamos**|Según el acuerdo|Requieren **autorización escrita** del trabajador|

$ Aporte total a una AFP ≈ 10% (fondo) + comisión + prima ≈ 13% aproximado
$ Consulta las tasas vigentes de comisión y prima en el portal de la SBS: cambian por trimestre

> La **Ley 32123**, de modernización del sistema previsional, introdujo la afiliación obligatoria desde los 18 años, una pensión mínima y cambios en las reglas de retiro de fondos, con implementación gradual. Para la planilla de trabajadores dependientes, la mecánica del descuento no cambió: el 10% al fondo más comisión y prima. El contador debe verificar en el portal de la SBS las tasas del trimestre antes de cerrar la planilla, porque la prima y la comisión se actualizan.

**Elección del sistema:** el trabajador que ingresa por primera vez al mercado laboral tiene un plazo para elegir entre el SNP y el SPP. Si no elige, se afilia por defecto a una AFP. El empleador debe informarle de las características de ambos sistemas, y la omisión de esa información es una infracción.

# La retención de quinta categoría: el procedimiento completo
El artículo 40 del Reglamento de la Ley del Impuesto a la Renta establece un método de **proyección anual con retención mensual**. La lógica es estimar el impuesto de todo el año y cobrarlo en cuotas.

$ PASO 1: proyectar la remuneración anual
$ PASO 2: restar 7 UIT (S/ 38,500 en 2026)
$ PASO 3: aplicar la escala progresiva acumulativa
$ PASO 4: dividir por el divisor del mes

**Paso 1 — La proyección.** Se suma:
- La remuneración del mes, multiplicada por los meses que faltan para terminar el año (incluido el mes que se liquida).
- Las remuneraciones ya percibidas en los meses anteriores del año.
- Las gratificaciones de julio y diciembre que corresponderá percibir.
- Las gratificaciones extraordinarias, participaciones y otros ingresos de quinta **ya percibidos** en el ejercicio.

**Paso 2 — La deducción de 7 UIT.** Es fija y no requiere sustento alguno.

**Paso 3 — La escala progresiva acumulativa 2026 (UIT = S/ 5,500):**
|Tramo de renta neta|Equivalente en soles|Tasa|
|Hasta 5 UIT|Hasta 27,500|**8%**|
|Más de 5 hasta 20 UIT|27,500 a 110,000|**14%**|
|Más de 20 hasta 35 UIT|110,000 a 192,500|**17%**|
|Más de 35 hasta 45 UIT|192,500 a 247,500|**20%**|
|Más de 45 UIT|Más de 247,500|**30%**|

! La escala es **acumulativa**: cada tramo se grava con su propia tasa. Quien tiene renta neta de S/ 50,000 no paga 14% de todo, paga 8% de los primeros 27,500 y 14% de los 22,500 restantes.

**Paso 4 — Los divisores por mes:**
|Mes de la retención|Divisor|
|Enero, febrero y marzo|**12**|
|Abril|**9**|
|Mayo, junio y julio|**8**|
|Agosto|**5**|
|Septiembre, octubre y noviembre|**4**|
|Diciembre|Se **regulariza**: impuesto anual menos lo retenido|

La lógica de los divisores es que en cada mes se recalcula el impuesto anual y se descuenta lo ya retenido, repartiendo el saldo entre los meses que quedan. En diciembre no hay divisor: se ajusta la diferencia.

# Un cálculo completo, paso a paso
Trabajador con remuneración de **S/ 6,000** más asignación familiar de **S/ 123**. Retención de enero:

$ PASO 1 — Proyección:
$ Remuneración mensual = 6,000 + 123 = 6,123
$ 12 remuneraciones = 6,123 × 12 = 73,476
$ 2 gratificaciones = 6,123 × 2 = 12,246
$ Remuneración anual proyectada = 85,722

$ PASO 2 — Deducción:
$ 85,722 − 38,500 (7 UIT) = 47,222 de renta neta

$ PASO 3 — Escala acumulativa:
$ Primeros 27,500 × 8% = 2,200.00
$ Exceso: (47,222 − 27,500) = 19,722 × 14% = 2,761.08
$ Impuesto anual proyectado = 4,961.08

$ PASO 4 — Retención de enero:
$ 4,961.08 ÷ 12 = 413.42

Ese importe se descuenta en enero, febrero y marzo. En abril se recalcula con el divisor 9, y así sucesivamente, de modo que cualquier cambio de remuneración durante el año se absorbe automáticamente.

# Las tres UIT adicionales: una precisión que casi nadie explica bien
El trabajador puede deducir **hasta 3 UIT adicionales** por gastos de arrendamiento, servicios profesionales de cuarta categoría de ciertas actividades, aportes a EsSalud de trabajadores del hogar y consumos en restaurantes y hoteles, con los requisitos de la norma.

! Esas 3 UIT adicionales **no** se consideran en la retención mensual del empleador. El trabajador las aplica en su **declaración jurada anual**, y el resultado suele ser una devolución. El empleador retiene solo con las 7 UIT. Explicarle esto al trabajador evita el reclamo más frecuente del área de planilla.

# Casos especiales que hay que saber resolver
|Situación|Regla|
|**Trabajador con dos empleadores**|Retiene el que paga la **mayor remuneración**. El trabajador presenta una declaración jurada a cada empleador informando sus remuneraciones; el empleador que no retiene conserva la declaración|
|**Trabajador que ingresa en el año**|La proyección considera solo los meses que efectivamente trabajará, más lo percibido de un empleador anterior si presenta su certificado de retenciones|
|**Trabajador que cesa**|Se liquida el impuesto del periodo trabajado y se entrega el **certificado de retenciones**|
|**Gratificación extraordinaria**|Se suma a la proyección en el mes en que se percibe, y el impuesto adicional se retiene íntegramente en ese mes|
|**Utilidades**|Mismo tratamiento que la gratificación extraordinaria|
|**Remuneración variable**|Se proyecta con el promedio de lo percibido en el ejercicio|

**El certificado de retenciones** debe entregarse al trabajador antes del vencimiento del plazo para presentar su declaración anual, o dentro de los cinco días hábiles siguientes al cese si lo solicita. Es el documento que le permite sustentar sus retenciones y pedir su devolución.

# Lo que SUNAT cruza automáticamente
$ PLAME ↔ Contabilidad ↔ Declaración anual de renta ↔ Declaraciones de los trabajadores

Los cuatro deben coincidir. Las inconsistencias más detectadas:
- Gasto de personal en la contabilidad mayor que el total declarado en la PLAME.
- EsSalud calculado sobre una base menor a la RMV.
- Retenciones de quinta declaradas y no pagadas: es la infracción del numeral 4 del artículo 178, con plazo de prescripción de diez años y responsabilidad exclusiva del empleador.
- Trabajadores en la contabilidad que no figuran en el T-Registro.

> Un control de cinco minutos al mes evita todo eso: comparar el total de la cuenta 62 del mes con el total de la PLAME, y el total de los descuentos con el pasivo registrado en las cuentas 40 y 41. Si no coinciden, hay un error antes de declarar, no después.`,
  claves:['Los aportes del empleador (EsSalud 9%, SCTR, Senati, Sencico, vida ley) son costo de la empresa y nunca se descuentan del sueldo.','La base mínima de EsSalud es una RMV, aun si el trabajador gana menos.','ONP 13% es tasa fija; en AFP es 10% al fondo más comisión y prima, que varían por AFP y trimestre según la SBS.','La retención de quinta proyecta la renta anual, deduce 7 UIT, aplica la escala acumulativa y divide por el divisor del mes.','Las 3 UIT adicionales las aplica el trabajador en su declaración anual, no el empleador en la retención mensual.'],
  preg:[
   {p:'¿Por qué el EsSalud nunca puede descontarse del sueldo del trabajador?',
    r:'Porque la ley lo configura como un **aporte a cargo del empleador**: es una obligación propia de la empresa, no una retención. El trabajador aporta al sistema de pensiones, y la empresa aporta a la seguridad social en salud. Descontar el 9% de EsSalud del sueldo es un descuento no autorizado, que configura una infracción laboral grave y genera la obligación de devolver lo descontado con intereses. La confusión es frecuente porque ambos conceptos aparecen en la boleta, pero en bloques distintos: uno en descuentos y otro en aportes del empleador. Un contador debe saber explicar esa diferencia a los trabajadores, porque es la pregunta más común que recibe el área de planilla.'},
   {p:'¿Por qué la escala de quinta categoría es acumulativa y qué error produce ignorarlo?',
    r:'Es acumulativa porque cada tramo de renta se grava con su propia tasa, de modo que la tasa superior se aplica solo al exceso, no al total. Un trabajador con renta neta de S/ 50,000 no paga 14% de S/ 50,000, paga 8% de los primeros S/ 27,500 y 14% de los S/ 22,500 restantes. Ignorarlo produce un cálculo que puede sobreestimar la retención en miles de soles al año, lo que genera reclamos del trabajador y, al regularizarse en diciembre, un ajuste abrupto. También produce el error de aconsejar mal a un trabajador que recibirá un aumento, haciéndole creer que "pasará a otra categoría" y perderá dinero, lo que con una escala acumulativa no puede ocurrir.'},
   {p:'¿Para qué sirven los divisores por mes y qué pasa si la remuneración cambia a mitad de año?',
    r:'Los divisores reparten el impuesto anual proyectado entre los meses que faltan, descontando lo ya retenido. Por eso en enero se divide entre 12 y en septiembre entre 4: quedan menos meses para cobrar el mismo impuesto. El mecanismo es **autocorrectivo**: si la remuneración aumenta en julio, en ese mes se recalcula la proyección completa con la nueva remuneración, se resta lo ya retenido y el saldo se divide entre los meses restantes, de modo que el ajuste se distribuye en lugar de concentrarse. En diciembre no hay divisor porque corresponde la regularización final: impuesto anual real menos todo lo retenido durante el año.'},
   {p:'Un trabajador reclama que su compañero gana lo mismo y le retienen menos. ¿Cómo lo explicas?',
    r:'Las causas posibles son varias y conviene revisarlas en orden. Primero, si uno percibe asignación familiar y el otro no, la base anual difiere en S/ 1,722 al año más el efecto en gratificaciones. Segundo, si uno ingresó a mitad de año, su proyección comprende menos meses y puede no superar las 7 UIT. Tercero, si uno presentó un certificado de retenciones de un empleador anterior, su proyección incluye esos ingresos y la retención es mayor. Cuarto, si uno recibió una gratificación extraordinaria o utilidades, el impuesto adicional se retuvo íntegramente en ese mes. Y quinto, si uno tiene dos empleadores, la declaración jurada que presentó cambia el cálculo. La explicación debe hacerse con el cálculo escrito en la mano, no verbalmente: es el único modo de cerrar el reclamo.'},
   {p:'¿Por qué no pagar las retenciones de quinta categoría ya efectuadas es la peor situación tributaria posible para una empresa?',
    r:'Por la acumulación de agravantes. Configura la infracción del numeral 4 del artículo 178, con multa del 50% del tributo no pagado. El plazo de prescripción se extiende a **diez años**, el más largo del sistema. La empresa deja de ser responsable solidaria para ser **responsable exclusiva**, porque el trabajador ya sufrió el descuento y cumplió su parte. Se configura la presunción de dolo o negligencia grave del artículo 16, que puede alcanzar patrimonialmente al representante legal. Y el dinero nunca fue de la empresa: salió del sueldo del trabajador. Es, además, deuda que **no admite fraccionamiento**. Usar ese dinero como capital de trabajo es la decisión que más empresas pequeñas ha llevado al cierre.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un trabajador a tiempo parcial gana S/ 800 mensuales. ¿Sobre qué base se calcula el aporte a EsSalud?',
    u:'S/',r:1230,tol:0,
    s:'Sobre **S/ 1,230**, que es la RMV vigente desde octubre de 2026. La base de cálculo del EsSalud tiene un **mínimo de una Remuneración Mínima Vital**, de modo que aunque el trabajador perciba S/ 800, el aporte se calcula sobre S/ 1,230.\n\nAporte = 1,230 × 9% = **S/ 110.70**\n\nSi se calculara sobre los S/ 800 reales, el aporte sería de S/ 72 y habría una omisión de S/ 38.70 mensuales por trabajador. Es un ajuste que SUNAT detecta de forma automática al validar la PLAME, y que en empresas con varios trabajadores a tiempo parcial se acumula rápidamente. Nótese que esta base mínima aplica al EsSalud, no al cálculo de los beneficios sociales del trabajador, que se calculan sobre su remuneración real.'},
   {l:1,t:'num',p:'Un trabajador gana S/ 3,000 más asignación familiar. Calcula su retención mensual de quinta categoría en el mes de enero.',
    u:'S/',r:34.81,tol:1,
    s:'**Paso 1 — Proyección anual:**\nRemuneración mensual = 3,000 + 123 = 3,123\n12 remuneraciones = 3,123 × 12 = 37,476\n2 gratificaciones = 3,123 × 2 = 6,246\nRemuneración anual proyectada = **43,722**\n\n**Paso 2 — Deducción de 7 UIT:**\n43,722 − 38,500 = **5,222 de renta neta**\n\n**Paso 3 — Escala:** la renta neta no supera las 5 UIT (S/ 27,500), de modo que todo se grava al 8%:\n5,222 × 8% = **417.76 de impuesto anual**\n\n**Paso 4 — Divisor de enero (12):**\n417.76 ÷ 12 = **S/ 34.81**\n\nNótese lo cerca que está este trabajador del umbral: si ganara S/ 2,750, su proyección anual sería de S/ 38,500 exactos y **no tendría retención alguna**. La deducción de 7 UIT deja fuera del impuesto a la mayoría de los trabajadores peruanos, y ese es un dato que conviene conocer para no retener donde no corresponde.'},
   {l:2,t:'num',p:'Un trabajador gana S/ 9,500 mensuales sin asignación familiar. Calcula su retención de quinta del mes de septiembre, sabiendo que de enero a agosto le retuvieron S/ 8,200 en total.',
    u:'S/',r:845,tol:10,
    s:'**Paso 1 — Proyección anual:**\n12 remuneraciones = 9,500 × 12 = 114,000\n2 gratificaciones = 9,500 × 2 = 19,000\nRemuneración anual proyectada = **133,000**\n\n**Paso 2 — Deducción de 7 UIT:**\n133,000 − 38,500 = **94,500 de renta neta**\n\n**Paso 3 — Escala acumulativa:**\n\n| Tramo | Base | Tasa | Impuesto |\n|---|---|---|---|\n| Hasta 5 UIT | 27,500 | 8% | 2,200.00 |\n| De 5 a 20 UIT | 94,500 − 27,500 = 67,000 | 14% | 9,380.00 |\n| **Impuesto anual** | | | **11,580.00** |\n\n**Paso 4 — Retención de septiembre (divisor 4):**\nImpuesto anual menos lo ya retenido = 11,580 − 8,200 = 3,380\n3,380 ÷ 4 = **S/ 845.00**\n\n**Cómo funciona el mecanismo, y por qué el resultado no es S/ 965.** Si las retenciones hubieran sido perfectamente uniformes, cada mes habría sido de 11,580 ÷ 12 = S/ 965, y al cabo de ocho meses el acumulado sería de S/ 7,720. Aquí el acumulado es S/ 8,200, es decir **por encima** de lo proporcional, de modo que queda menos por recaudar y la cuota de los meses finales baja a S/ 845.\n\nEse es el sentido del procedimiento del artículo 40: cada mes recalcula el impuesto anual, deduce lo ya retenido y reparte el saldo entre los meses que quedan. Cualquier desvío —un aumento de sueldo, una retención de más o de menos— se absorbe automáticamente en lugar de acumularse.\n\n**Y los S/ 845 de septiembre se repiten en octubre y noviembre** (3 × 845 = 2,535), de modo que al llegar a diciembre el acumulado será 8,200 + 2,535 = 10,735 y la regularización final será de 11,580 − 10,735 = S/ 845. Verifica siempre el acumulado antes de cerrar el mes: una retención insuficiente durante el año produce un ajuste abrupto en diciembre y un reclamo garantizado del trabajador.'},
   {l:2,t:'ab',p:'Una empresa industrial con 28 trabajadores tiene una planilla mensual de S/ 62,000. Calcula todos los aportes del empleador del mes y arma el asiento contable del devengo de esos aportes.',
    s:'**Identificación de los aportes aplicables:**\n\n| Aporte | ¿Aplica? | Fundamento |\n|---|---|---|\n| EsSalud 9% | Sí | Todos los trabajadores dependientes |\n| **Senati 0.75%** | **Sí** | Empresa **industrial** (categoría D de la CIIU) con **más de 20 trabajadores**: cumple ambas condiciones |\n| Sencico 0.2% | No | Solo para actividades de construcción, y sobre ingresos por obras, no sobre planilla |\n| SCTR | Probablemente sí | Industria pesada suele estar en el Anexo 5 del D.S. 009-97-SA; depende de la actividad concreta |\n| Seguro de Vida Ley | Sí | Desde el inicio de la relación laboral (Ley 29549) |\n\n**Cálculo:**\n\n| Aporte | Cálculo | Importe |\n|---|---|---|\n| EsSalud | 62,000 × 9% | 5,580.00 |\n| Senati | 62,000 × 0.75% | 465.00 |\n| Seguro de Vida Ley (estimado 0.7%) | 62,000 × 0.7% | 434.00 |\n| SCTR (según póliza, estimado 1.2%) | 62,000 × 1.2% | 744.00 |\n| **Total aportes del empleador** | | **7,223.00** |\n\n**Verificación de la base mínima:** antes de aplicar el 9%, hay que revisar si algún trabajador percibe menos de la RMV de S/ 1,230; en ese caso su base de EsSalud se eleva a S/ 1,230 y el aporte total sube.\n\n**Asiento del devengo de los aportes del empleador:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 627 | Seguridad y previsión social y otras contribuciones | 7,223.00 | |\n| 6271 | Régimen de prestaciones de salud — EsSalud | 5,580.00 | |\n| 6273 | Seguro complementario de trabajo de riesgo | 744.00 | |\n| 6274 | Seguro de vida | 434.00 | |\n| 6279 | Otras contribuciones — Senati | 465.00 | |\n| 403 | Instituciones públicas | | 6,045.00 |\n| 4031 | EsSalud | | 5,580.00 |\n| 4039 | Otras instituciones — Senati | | 465.00 |\n| 469 | Otras cuentas por pagar diversas — aseguradoras (vida ley y SCTR) | | 1,178.00 |\n\n**Verificación obligatoria antes de cerrar el asiento:**\n\n| Columna | Suma |\n|---|---|\n| Debe (627 y sus divisionarias) | 7,223.00 |\n| Haber (403 + 469) | 6,045.00 + 1,178.00 = 7,223.00 |\n\nCuadra. Hazlo siempre: sumar ambas columnas antes de pasar al mayor es el control de diez segundos que evita un error que después hay que rastrear por tres libros.\n\n**Nota sobre la clasificación por función:** la cuenta 627 es de naturaleza; al cierre del mes, el gasto se traslada por función (costo de producción, gastos de venta, gastos de administración) mediante las cuentas 9 o la transferencia a la cuenta 71 y a los elementos de costo, según el sistema que use la empresa.\n\n**El dato para la gerencia:** los aportes del empleador equivalen al **11.65%** de la planilla (7,223 ÷ 62,000). Ese porcentaje, sumado a las provisiones de gratificaciones y CTS, es lo que convierte una planilla de S/ 62,000 en un costo de cerca de S/ 85,000 mensuales.'},
   {l:3,t:'ab',p:'Un trabajador gana S/ 12,000 mensuales. En agosto recibe utilidades por S/ 25,000 y una gratificación extraordinaria de S/ 10,000. Calcula su retención de agosto y explica por qué el método trata estos ingresos de forma distinta a la remuneración regular.',
    s:'**El principio que gobierna el caso:** la remuneración regular se **proyecta** a todo el año; los ingresos extraordinarios —gratificaciones extraordinarias, utilidades, participaciones— **no se proyectan**, porque no se repetirán. Se suman a la renta del ejercicio en el mes en que se perciben, y el impuesto adicional que generan se retiene **íntegramente en ese mes**.\n\n**Paso 1 — Impuesto de la remuneración regular proyectada**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| 12 remuneraciones | 12,000 × 12 | 144,000 |\n| 2 gratificaciones de ley | 12,000 × 2 | 24,000 |\n| Remuneración anual proyectada | | **168,000** |\n| Menos 7 UIT | | (38,500) |\n| Renta neta proyectada | | **129,500** |\n\nEscala acumulativa:\n\n| Tramo | Base | Tasa | Impuesto |\n|---|---|---|---|\n| Hasta 5 UIT | 27,500 | 8% | 2,200.00 |\n| De 5 a 20 UIT | 82,500 | 14% | 11,550.00 |\n| De 20 a 35 UIT | 129,500 − 110,000 = 19,500 | 17% | 3,315.00 |\n| **Impuesto de la remuneración regular** | | | **17,065.00** |\n\n**Paso 2 — Impuesto con los ingresos extraordinarios incluidos**\n\n| Concepto | Importe |\n|---|---|\n| Renta neta proyectada | 129,500 |\n| Más utilidades | 25,000 |\n| Más gratificación extraordinaria | 10,000 |\n| **Renta neta total** | **164,500** |\n\nEscala acumulativa:\n\n| Tramo | Base | Tasa | Impuesto |\n|---|---|---|---|\n| Hasta 5 UIT | 27,500 | 8% | 2,200.00 |\n| De 5 a 20 UIT | 82,500 | 14% | 11,550.00 |\n| De 20 a 35 UIT | 164,500 − 110,000 = 54,500 | 17% | 9,265.00 |\n| **Impuesto total del ejercicio** | | | **23,015.00** |\n\n**Paso 3 — El impuesto adicional de los extraordinarios**\n\n$ 23,015.00 − 17,065.00 = 5,950.00\n\nEse importe se retiene **íntegramente en agosto**, además de la cuota mensual que corresponde a la remuneración regular.\n\n**Paso 4 — La retención total de agosto**\n\nSupongamos que de enero a julio se retuvieron S/ 9,955 por la remuneración regular (siete cuotas de 1,422.08 aproximadamente, resultado de 17,065 ÷ 12):\n\n| Componente | Cálculo | Importe |\n|---|---|---|\n| Cuota regular de agosto (divisor 5) | (17,065 − 9,955) ÷ 5 | 1,422.00 |\n| Impuesto adicional por los extraordinarios | retención íntegra | 5,950.00 |\n| **Retención total de agosto** | | **7,372.00** |\n\n**Por qué el método distingue ambos tipos de ingreso, y es el aprendizaje central:**\n\nSi las utilidades y la gratificación extraordinaria se **proyectaran** como si fueran a repetirse cada mes, la renta anual estimada sería absurdamente alta y la retención resultante excesiva: se le retendría al trabajador impuesto sobre ingresos que no va a percibir. El trabajador recuperaría ese exceso recién en su declaración anual, varios meses después, financiando al fisco sin causa.\n\nA la inversa, si el impuesto adicional se **repartiera** entre los meses restantes en lugar de retenerse íntegro, el trabajador podría cesar antes de fin de año y quedar con impuesto impago, y el empleador habría incumplido su obligación de retener.\n\n**El efecto práctico que hay que anticipar:** en agosto este trabajador verá una retención de S/ 7,372 frente a los S/ 1,422 habituales. Es la causa del reclamo más común del área de planilla cuando se pagan utilidades. La forma de evitarlo es **avisar antes**: entregar, junto con la boleta de utilidades, el cálculo escrito que muestra la retención adicional y su razón. Un trabajador informado no reclama; uno sorprendido sí.\n\n**Y el control que el contador debe hacer:** verificar que el impuesto adicional se haya retenido completo. Dejarlo a medias significa que en diciembre la regularización será abrupta, y si el trabajador cesa antes, la empresa deberá asumir la retención no efectuada, que además no es gasto deducible.'}
  ],
  proy:{
   t:'Planilla completa de un mes de tu empresa',
   ctx:`Vas a liquidar una planilla real, de principio a fin: ingresos, descuentos, aportes y retención de quinta por cada trabajador. Es el ejercicio que distingue a quien entendió el mecanismo de quien solo lo leyó.`,
   pasos:[
    'Toma la plantilla que definiste en el subtema 6.1 y asigna a cada trabajador su sistema pensionario: al menos uno en ONP y al menos uno en una AFP.',
    'Consulta en el portal de la SBS las tasas vigentes de comisión y prima de la AFP que elijas, y el tope de la remuneración asegurable.',
    'Para cada trabajador, calcula la retención de quinta categoría del mes de enero siguiendo los cuatro pasos del artículo 40 del Reglamento. Identifica a los que no superan las 7 UIT y por lo tanto no tienen retención.',
    'Calcula los aportes del empleador aplicables a tu empresa: EsSalud con verificación de la base mínima, SCTR si el giro lo exige, Senati o Sencico si corresponde, y seguro de vida ley.',
    'Arma la planilla del mes en una sola tabla: por trabajador, los ingresos, cada descuento, el neto a pagar y, en columnas separadas, los aportes del empleador.',
    'Totaliza y verifica tres sumas: total de ingresos, total de descuentos y total de aportes del empleador. Calcula el costo total de la planilla del mes.',
    'Elabora las boletas de pago de dos trabajadores: uno con retención de quinta y uno sin ella.',
    'Calcula los aportes del empleador como porcentaje de la planilla y compáralo con el 11.65% del ejemplo del subtema.'
   ],
   entrega:[
    'La planilla del mes completa, por trabajador y totalizada.',
    'El cálculo detallado de la retención de quinta de cada trabajador, con sus cuatro pasos.',
    'Dos boletas de pago con sus tres bloques.',
    'El cuadro de aportes del empleador con su porcentaje sobre la planilla.'
   ],
   crit:[
    'La base de EsSalud respeta el mínimo de una RMV en los trabajadores que ganan menos.',
    'La escala de quinta se aplica de forma acumulativa, tramo por tramo, no con una tasa única.',
    'Los descuentos y los aportes del empleador están en bloques separados, sin mezclarse.'
   ],
   pista:'Antes de calcular la retención de quinta, haz una prueba rápida: multiplica la remuneración mensual por 14. Si el resultado no llega a S/ 38,500, no hay retención y te ahorras todo el cálculo. Ese umbral equivale a una remuneración de S/ 2,750 mensuales.'
  },
  proyInt:{
   t:'Integración de la planilla con la contabilidad y los tributos',
   integra:'1.1 a 6.2',
   ctx:`La planilla no es un documento aislado: alimenta la contabilidad, la declaración mensual y la anual. Vas a construir el puente completo y a verificar que los cuatro extremos coincidan, que es exactamente lo que SUNAT cruza.`,
   pasos:[
    'Toma la planilla del mes que liquidaste y traduce cada bloque a su cuenta contable: ingresos a la 62, aportes del empleador a la 627, descuentos del trabajador a las cuentas 40 y 41, y el neto a pagar a la 41.',
    'Registra el asiento completo del devengo de la planilla en el Libro Diario de tu empresa del Módulo 2, respetando la separación de los tres momentos: devengo, pago al trabajador y pago de tributos y aportes.',
    'Actualiza el Libro Mayor y verifica que los saldos de las cuentas 40 y 41 reflejen exactamente lo que se deberá pagar en el mes siguiente.',
    'Construye la conciliación de cuatro puntas: total de la cuenta 62 del mes contra total de la PLAME, total de descuentos previsionales contra el pasivo de la cuenta 403, total de retenciones de quinta contra el pasivo de la 4017, y total de remuneraciones contra el gasto de personal que irá a la declaración anual.',
    'Recalcula el estado de resultados del Módulo 2 incorporando el gasto de personal por función, y verifica que la utilidad siga cuadrando.',
    'Verifica el requisito de deducibilidad del inciso v) del artículo 37 de la Ley del Impuesto a la Renta: identifica qué conceptos de personal estarían en riesgo de no ser deducibles si no se pagan antes del vencimiento de la declaración anual.',
    'Actualiza la matriz de cumplimiento del subtema 5.4 con las obligaciones laborales mensuales, sus plazos y los controles que las verifican.'
   ],
   entrega:[
    'El asiento de planilla registrado en el Diario, con los tres momentos separados.',
    'La conciliación de cuatro puntas con sus diferencias explicadas o en cero.',
    'El estado de resultados actualizado con el gasto de personal por función.',
    'El análisis de deducibilidad y la matriz de cumplimiento actualizada.'
   ],
   crit:[
    'Los tres momentos (devengo, pago al trabajador, pago de tributos) están en asientos separados.',
    'La conciliación de cuatro puntas cierra en cero o explica cada diferencia con su causa.',
    'El análisis de deducibilidad identifica expresamente los conceptos sujetos al requisito de pago previo.'
   ],
   pista:'La conciliación de cuatro puntas es el control que SUNAT replica automáticamente. Hacerla tú cada mes significa que nunca te llegará una carta inductiva por inconsistencias de planilla, que es una de las más frecuentes.'
  },
  fuentes:[
   {a:'Ley 26790 y D.S. 009-97-SA', o:'Ley de Modernización de la Seguridad Social en Salud y su reglamento', n:'aporte a EsSalud, base mínima, EPS y el Anexo 5 de actividades de riesgo para el SCTR'},
   {a:'D.S. 122-94-EF — Reglamento de la Ley del Impuesto a la Renta', o:'Artículos 40 al 45', n:'procedimiento de retención de quinta categoría, divisores mensuales y certificado de retenciones'},
   {a:'TUO del Sistema Privado de Pensiones (D.S. 054-97-EF) y Ley 32123', o:'Aportes al SPP y modernización del sistema previsional', n:'estructura del aporte: fondo, comisión y prima; afiliación obligatoria y pensión mínima'},
   {a:'Ley 29549 y D. Leg. 688', o:'Ley de Consolidación de Beneficios Sociales — Seguro de Vida Ley', n:'obligación del seguro desde el inicio de la relación laboral'},
   {a:'Jorge Picón Gonzales', o:'Deducciones del Impuesto a la Renta Empresarial', n:'requisito del inciso v) del art. 37: pago previo de las rentas de quinta para su deducibilidad'},
   {a:'Superintendencia de Banca, Seguros y AFP (SBS)', o:'Tasas de comisión, prima y tope de remuneración asegurable', n:'valores vigentes por trimestre, de consulta obligatoria antes de cerrar la planilla'}
  ]
 },
 {
  id:'m6t3', titulo:'Gratificaciones, CTS, vacaciones y utilidades', min:28,
  cont:`Los beneficios sociales son la parte de la remuneración que no se paga mes a mes, sino en fechas determinadas o al cese. Y ahí está su peligro: el costo se **devenga** todos los meses, pero se **paga** dos veces al año. La empresa que no provisiona descubre en julio que debe una remuneración completa por cada trabajador y no tiene con qué pagarla.

# Gratificaciones legales (Ley 27735 y D.S. 005-2002-TR)
|Aspecto|Regla|
|**Oportunidad**|Dos al año: **Fiestas Patrias** (julio) y **Navidad** (diciembre)|
|**Monto**|**Una remuneración** por cada semestre completo|
|**Semestres**|Enero a junio para la de julio; julio a diciembre para la de diciembre|
|**Proporcionalidad**|**Un sexto** de la remuneración por cada **mes calendario completo** laborado en el semestre|
|**Plazo de pago**|Primeros **15 días** de julio y de diciembre. Es un plazo **indisponible**: no se puede pactar otra fecha|
|**Requisito**|Estar **laborando** en el mes del pago, o en situación equivalente: vacaciones, licencia con goce, descanso médico, descanso por accidente de trabajo|
|**Remuneración computable**|La **vigente al 30 de junio** o al **30 de noviembre**, según corresponda|

$ Gratificación = (Remuneración computable ÷ 6) × meses calendario completos del semestre
$ Bonificación extraordinaria = Gratificación × 9%  (o × 6.75% si la empresa está en una EPS)

**Remuneraciones variables.** Las comisiones, el destajo y las horas extras se incorporan si fueron percibidas en **al menos tres meses** del semestre, y se computan por el **promedio** de lo percibido en el semestre.

**Un cálculo completo.** Trabajador con remuneración de S/ 2,500 más asignación familiar, que laboró los seis meses del semestre:

|Concepto|Cálculo|Importe|
|Remuneración computable|2,500 + 123|2,623.00|
|Gratificación (semestre completo)|2,623 ÷ 6 × 6|2,623.00|
|Bonificación extraordinaria 9%|2,623 × 9%|236.07|
|**Total a pagar**||**2,859.07**|
|Descuentos previsionales|inafecta|0.00|
|Retención de quinta|según proyección|variable|

! La gratificación y su bonificación están **inafectas a EsSalud y a los aportes previsionales** (Ley 30334), pero **sí están gravadas con quinta categoría**. Descontar ONP o AFP de una gratificación es un descuento indebido que debe devolverse.

**Gratificación trunca.** Al cese, corresponde la parte proporcional por los meses calendario completos del semestre en curso. Se paga junto con la liquidación de beneficios sociales.

# Compensación por Tiempo de Servicios (D.S. 001-97-TR)
La CTS es un beneficio de **previsión de las contingencias que origina el cese**: no es un ahorro voluntario ni una gratificación, es un fondo que se deposita para que el trabajador tenga respaldo cuando termine la relación laboral.

|Aspecto|Regla|
|**Oportunidad de depósito**|Primeros **15 días** de **mayo** y de **noviembre**|
|**Periodos**|Noviembre a abril (se deposita en mayo); mayo a octubre (se deposita en noviembre)|
|**Requisito**|Haber laborado como mínimo **un mes** en el periodo|
|**Dónde**|En la entidad financiera que **elija el trabajador**, en una cuenta CTS a su nombre|
|**Remuneración computable**|La vigente al **30 de abril** o al **31 de octubre**, **más un sexto de la última gratificación** percibida|
|**Intangibilidad**|Solo puede disponer libremente del excedente de **cuatro remuneraciones brutas**; el resto queda intangible hasta el cese, salvo que una ley especial autorice el retiro|

$ CTS = (Remuneración computable ÷ 12) × meses completos + (Remuneración computable ÷ 360) × días

**El sexto de gratificación en la base** es el detalle que más se omite. La base de la CTS no es solo el sueldo: incluye un sexto de la última gratificación percibida, porque la gratificación también es parte de lo que el trabajador deja de recibir al cesar.

**Cálculo completo.** Mismo trabajador, periodo de seis meses completos:

|Concepto|Cálculo|Importe|
|Remuneración al 30 de abril|2,500 + 123|2,623.00|
|Más un sexto de la última gratificación|2,623 ÷ 6|437.17|
|**Remuneración computable**||**3,060.17**|
|CTS del semestre|3,060.17 ÷ 12 × 6|**1,530.09**|

> El Congreso ha autorizado en varias ocasiones, mediante leyes temporales, el **retiro libre** de la CTS. Esas autorizaciones tienen plazo de vigencia y no modifican la regla general de intangibilidad. Antes de informar a un trabajador sobre su disponibilidad, verifica si hay una ley de retiro vigente y hasta cuándo.

**Inafectación.** Como la gratificación, la CTS está **inafecta** a los aportes previsionales y de salud, y además **no está gravada con quinta categoría**: es el único beneficio con esa doble exclusión, porque es una indemnización de previsión, no una renta del trabajo.

# Vacaciones (D. Leg. 713)
|Aspecto|Regla|
|**Duración**|**30 días calendario** de descanso remunerado por cada año completo de servicios|
|**Requisito de récord**|Para jornada de **6 días** semanales: **260 días** efectivos de labor. Para jornada de **5 días**: **210 días**|
|**Remuneración vacacional**|Equivalente a la que el trabajador percibiría si estuviera laborando|
|**Oportunidad del goce**|Debe otorgarse dentro del **año siguiente** a aquel en que se adquirió el derecho|
|**Fraccionamiento**|Como mínimo **15 días ininterrumpidos**; el resto puede fraccionarse en periodos no menores a 7 días, y una parte en periodos menores por acuerdo|
|**Reducción**|Hasta **15 días**, por acuerdo escrito, con compensación de 15 días de remuneración|
|**Afectación**|La remuneración vacacional **sí está afecta** a todos los aportes y descuentos, porque es remuneración ordinaria|

! **La triple remuneración vacacional.** Si el trabajador no goza su descanso dentro del año siguiente, corresponde pagarle: (1) la remuneración por el trabajo realizado, (2) la remuneración vacacional que le correspondía y (3) una **indemnización equivalente a una remuneración** por no haber descansado. Esa indemnización **no está sujeta a aportes** y **no corresponde** a los gerentes y representantes que deciden por sí mismos cuándo tomar sus vacaciones.

$ Triple remuneración = remuneración del mes trabajado + remuneración vacacional + indemnización
$ Es decir, treinta días no gozados cuestan tres remuneraciones en lugar de una

**Vacaciones truncas.** Al cese, corresponde la parte proporcional: un dozavo por mes completo y un trescientosesentavo por día. Se paga en la liquidación.

> El indicador de alerta es el **saldo de la cuenta 4151**. Si crece mes a mes y nunca baja, significa que los trabajadores acumulan vacaciones sin gozarlas, y cada año que pasa convierte una remuneración provisionada en tres por pagar. Un contador que revisa ese saldo trimestralmente y avisa a la gerencia evita un pasivo que puede equivaler a varios meses de utilidad.

# Participación en las utilidades (D. Leg. 892)
|Aspecto|Regla|
|**Quiénes la pagan**|Empresas que generan **renta de tercera categoría** y tienen **más de 20 trabajadores**|
|**Porcentaje**|**10%** pesqueras, de telecomunicaciones e industriales; **8%** mineras, de comercio al por mayor y menor y restaurantes; **5%** las demás actividades|
|**Base**|La **renta anual antes del impuesto**, es decir, la renta neta imponible|
|**Distribución**|**50%** en función de los **días efectivamente laborados** por cada trabajador; **50%** en proporción a las **remuneraciones** de cada uno|
|**Tope individual**|**18 remuneraciones mensuales** vigentes al cierre del ejercicio|
|**Plazo**|Dentro de los **30 días naturales** siguientes al vencimiento del plazo para presentar la declaración anual del Impuesto a la Renta|
|**Afectación**|**Inafecta** a aportes previsionales y de salud; **gravada** con quinta categoría|

$ Participación = Renta neta imponible × porcentaje del sector
$ Mitad se reparte por días laborados, mitad en proporción a las remuneraciones

El **remanente** que excede el tope de 18 remuneraciones se destina a la capacitación y promoción del empleo, mediante el fondo que establece la norma.

# Por qué hay que provisionar: el cálculo que lo demuestra
Una empresa con 10 trabajadores y una planilla mensual de S/ 26,230 (promedio S/ 2,623 cada uno):

|Escenario|Enero a junio|Julio|
|**Sin provisionar**|Gasto de 26,230 al mes|Gasto de **54,821**: planilla + gratificaciones + bonificación|
|**Provisionando**|Gasto de 31,119 al mes (planilla + provisiones)|Gasto de 31,119, sin sobresalto|

$ Provisión mensual por trabajador:
$ Gratificaciones: remuneración × 2 ÷ 12 = 2,623 × 2 ÷ 12 = 437.17
$ Bonificación extraordinaria: 437.17 × 9% = 39.35
$ CTS: (remuneración + 1/6 gratificación) ÷ 12 = 3,060.17 ÷ 12 = 255.01
$ Vacaciones: se devengan dentro de los doce meses, pero se provisionan por el derecho ganado
$ Total provisión mensual ≈ 731.53 por trabajador

Sin provisión, el estado de resultados de junio muestra una utilidad que no existe, y el de julio una pérdida que no es real. Los dos están equivocados, y las decisiones que se tomen con ellos también. Provisionar no es un formalismo contable: es la única forma de que los estados financieros mensuales digan la verdad.

# El calendario anual de obligaciones de beneficios
|Mes|Obligación|
|**Enero a abril**|Provisión mensual de todos los beneficios|
|**Primeros 15 días de mayo**|**Depósito de CTS** del periodo noviembre-abril|
|**Primeros 15 días de julio**|**Pago de gratificación** de Fiestas Patrias con su bonificación|
|**Dentro de 30 días del vencimiento de la DJ anual**|**Pago de utilidades**, si corresponde|
|**Primeros 15 días de noviembre**|**Depósito de CTS** del periodo mayo-octubre|
|**Primeros 15 días de diciembre**|**Pago de gratificación** de Navidad con su bonificación|
|**Todo el año**|Programación de **vacaciones** para evitar la acumulación|

Cinco fechas al año. Incumplir cualquiera de ellas es una infracción laboral, y en el caso de la CTS y las gratificaciones, una infracción que SUNAFIL sanciona con montos que crecen con el número de trabajadores afectados.`,
  claves:['Gratificaciones: una remuneración por semestre completo, un sexto por mes, más la bonificación extraordinaria del 9% (6.75% con EPS).','CTS: depósitos en los primeros 15 días de mayo y noviembre; la base incluye un sexto de la última gratificación.','Gratificaciones y CTS están inafectas a aportes; la CTS además no está gravada con quinta categoría.','No gozar las vacaciones dentro del año siguiente genera triple remuneración: la del trabajo, la vacacional y una indemnización.','Los beneficios se devengan mes a mes y se pagan dos veces al año: sin provisión, los estados financieros mensuales son falsos en los dos sentidos.'],
  preg:[
   {p:'¿Por qué la base de cálculo de la CTS incluye un sexto de la última gratificación?',
    r:'Porque la CTS es una previsión de lo que el trabajador deja de percibir al cesar, y la gratificación es parte de ese ingreso. Si la base fuera solo el sueldo, la CTS subestimaría el respaldo que el trabajador necesita, porque al cesar pierde también las dos gratificaciones anuales. El sexto representa la proporción mensual de una gratificación: una gratificación equivale a seis meses de devengo, de modo que un sexto es su equivalente mensual. Omitir ese componente es el error más frecuente en el cálculo de la CTS, y produce un depósito insuficiente que SUNAFIL sanciona y que el trabajador puede reclamar con intereses legales.'},
   {p:'¿Por qué la CTS no está gravada con quinta categoría y la gratificación sí?',
    r:'Porque su naturaleza jurídica es distinta. La gratificación es una **renta del trabajo**: un ingreso adicional que el trabajador percibe por su relación laboral, de libre disposición, y por eso está gravada con quinta categoría, aunque la Ley 30334 la inafectó de los aportes previsionales y de salud. La CTS, en cambio, es un **beneficio de previsión** destinado a cubrir las contingencias del cese: no es una contraprestación por el trabajo del periodo sino un fondo de respaldo, y por eso está excluida tanto de los aportes como del impuesto. Es el único concepto laboral con esa doble exclusión, y conviene recordarlo porque es una pregunta frecuente en evaluaciones y en la práctica.'},
   {p:'¿Qué significa exactamente la triple remuneración vacacional y a quién no le corresponde?',
    r:'Significa que si el trabajador no goza su descanso dentro del año siguiente a aquel en que adquirió el derecho, el empleador debe pagarle tres conceptos: la remuneración por el trabajo que efectivamente realizó en esos días, la remuneración vacacional que le correspondía, y una **indemnización equivalente a una remuneración** por haberlo privado del descanso. La indemnización no está sujeta a aportes, porque tiene naturaleza indemnizatoria. **No corresponde** a los gerentes y representantes de la empresa que deciden por sí mismos cuándo tomar sus vacaciones, porque la privación del descanso sería atribuible a ellos mismos. Para todos los demás trabajadores sí corresponde, y el pasivo se acumula silenciosamente en la cuenta 4151.'},
   {p:'¿Por qué provisionar los beneficios no es un formalismo sino una necesidad de gestión?',
    r:'Porque sin provisión los estados financieros mensuales son falsos en los dos sentidos. De enero a junio muestran una utilidad inflada, porque el costo de las gratificaciones y la CTS se está devengando pero no se registra. En julio y diciembre muestran una pérdida artificial, porque un costo de seis meses se carga a un solo mes. Con estados financieros así, cualquier decisión que se tome —fijar precios, aprobar una inversión, repartir dividendos, evaluar a un vendedor— se toma con información equivocada. Y hay un segundo efecto, el de caja: una empresa que no provisiona tampoco reserva el dinero, y llega a julio sin con qué pagar. El devengo es un principio contable, pero su utilidad aquí es de administración pura.'},
   {p:'Una empresa tiene 22 trabajadores y es una comercializadora. ¿Debe pagar utilidades y por cuánto?',
    r:'Sí debe, porque genera renta de tercera categoría y tiene **más de 20 trabajadores**, que es el umbral del D. Leg. 892. El porcentaje aplicable al comercio al por mayor y menor es del **8%** de la renta neta imponible antes del impuesto. La distribución se hace en dos mitades: el 50% en proporción a los días efectivamente laborados por cada trabajador y el 50% en proporción a sus remuneraciones percibidas en el ejercicio. Cada trabajador tiene un tope individual de 18 remuneraciones mensuales, y el remanente que exceda ese tope se destina al fondo de capacitación que establece la norma. El plazo de pago es de 30 días naturales contados desde el vencimiento del plazo para presentar la declaración anual del Impuesto a la Renta.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un trabajador con remuneración de S/ 1,800 más asignación familiar laboró cuatro meses completos del semestre. Calcula su gratificación, sin la bonificación.',
    u:'S/',r:1282,tol:5,
    s:'Remuneración computable = 1,800 + 123 = **S/ 1,923**\n\nGratificación = (1,923 ÷ 6) × 4 meses completos = 320.50 × 4 = **S/ 1,282.00**\n\nY la bonificación extraordinaria sería: 1,282 × 9% = S/ 115.38, de modo que el total a pagar es S/ 1,397.38.\n\nDos precisiones que se olvidan: se cuentan **meses calendario completos**, de modo que un trabajador que ingresó el 10 de marzo no computa marzo; y la remuneración computable es la **vigente al 30 de junio**, no el promedio del semestre, salvo en los conceptos variables, que sí se promedian cuando se percibieron al menos tres meses.'},
   {l:1,t:'num',p:'Mismo trabajador (S/ 1,800 + asignación familiar). Calcula su CTS de un semestre completo, considerando que su última gratificación fue de S/ 1,923.',
    u:'S/',r:1121.75,tol:5,
    s:'**Remuneración computable:**\nRemuneración al cierre del periodo = 1,800 + 123 = 1,923.00\nMás un sexto de la última gratificación = 1,923 ÷ 6 = 320.50\n**Total computable = S/ 2,243.50**\n\n**CTS del semestre:**\n2,243.50 ÷ 12 × 6 meses = **S/ 1,121.75**\n\nEl error típico es calcular 1,923 ÷ 12 × 6 = S/ 961.50, omitiendo el sexto de gratificación. La diferencia de S/ 160.25 por semestre, multiplicada por los trabajadores y los años, construye un pasivo considerable que SUNAFIL detecta con facilidad porque el cálculo es verificable con la sola lectura de la boleta.'},
   {l:2,t:'num',p:'Un trabajador con remuneración de S/ 3,500 no gozó sus 30 días de vacaciones dentro del año siguiente. ¿Cuánto debe pagarle la empresa en total por ese periodo vacacional?',
    u:'S/',r:10500,tol:50,
    s:'La **triple remuneración vacacional** comprende tres conceptos:\n\n| Concepto | Importe | Naturaleza |\n|---|---|---|\n| Remuneración por el trabajo efectivamente realizado en esos días | 3,500 | Remuneración ordinaria, afecta a todo |\n| Remuneración vacacional que le correspondía | 3,500 | Remuneración, afecta a todo |\n| Indemnización por no haber gozado el descanso | 3,500 | **Indemnizatoria: inafecta a aportes** |\n| **Total** | **S/ 10,500** | |\n\nTreinta días de descanso no otorgados costaron **tres remuneraciones** en lugar de una. Y el efecto es por trabajador y por periodo vacacional acumulado: una empresa con cinco trabajadores en esa situación tiene un pasivo de S/ 52,500 que probablemente no está registrado.\n\n**La excepción:** la indemnización no corresponde a los gerentes y representantes de la empresa que deciden por sí mismos cuándo tomar sus vacaciones. Para ellos el pago es doble, no triple.\n\n**El control preventivo:** revisar trimestralmente el saldo de la cuenta 4151 y el cuadro de vacaciones pendientes por trabajador, y programar el goce antes de que venza el año siguiente. Es un control de media hora que evita un pasivo de decenas de miles de soles.'},
   {l:2,t:'ab',p:'Una empresa industrial con 25 trabajadores tuvo una renta neta imponible de S/ 820,000. Calcula la participación en las utilidades y explica cómo se distribuye entre dos trabajadores: uno que laboró 240 días con remuneración anual de S/ 42,000 y otro que laboró 180 días con remuneración anual de S/ 24,000. Supón que el total de días laborados por todos los trabajadores fue 5,800 y el total de remuneraciones S/ 720,000.',
    s:'**Paso 1 — Verificar la obligación**\n\n| Requisito | En el caso |\n|---|---|\n| Genera renta de tercera categoría | Sí |\n| Más de 20 trabajadores | 25 trabajadores: sí |\n| Porcentaje del sector | **Industrial: 10%** |\n\n**Paso 2 — Determinar el monto a distribuir**\n\n$ Participación = 820,000 × 10% = S/ 82,000\n\n**Paso 3 — Dividir en las dos mitades**\n\n| Mitad | Criterio | Importe |\n|---|---|---|\n| 50% | Días efectivamente laborados | 41,000 |\n| 50% | Proporción de remuneraciones | 41,000 |\n\n**Paso 4 — Calcular los factores de distribución**\n\n$ Factor por día = 41,000 ÷ 5,800 días = 7.0690 por día\n$ Factor por remuneración = 41,000 ÷ 720,000 = 0.056944 por sol de remuneración\n\n**Paso 5 — Distribuir a cada trabajador**\n\n**Trabajador A** (240 días, S/ 42,000 de remuneración anual):\n\n| Componente | Cálculo | Importe |\n|---|---|---|\n| Por días | 240 × 7.0690 | 1,696.56 |\n| Por remuneración | 42,000 × 0.056944 | 2,391.65 |\n| **Total trabajador A** | | **4,088.21** |\n\n**Trabajador B** (180 días, S/ 24,000 de remuneración anual):\n\n| Componente | Cálculo | Importe |\n|---|---|---|\n| Por días | 180 × 7.0690 | 1,272.42 |\n| Por remuneración | 24,000 × 0.056944 | 1,366.66 |\n| **Total trabajador B** | | **2,639.08** |\n\n**Paso 6 — Verificar el tope individual**\n\nEl tope es de **18 remuneraciones mensuales** vigentes al cierre:\n\n| Trabajador | Remuneración mensual aprox. | Tope (18 remuneraciones) | ¿Excede? |\n|---|---|---|---|\n| A | 42,000 ÷ 14 = 3,000 | 54,000 | No |\n| B | 24,000 ÷ 14 = 1,714 | 30,857 | No |\n\nNinguno excede el tope, de modo que reciben el importe completo. Si alguno lo excediera, el exceso se destina al fondo de capacitación y promoción del empleo que establece la norma.\n\n**Paso 7 — Tratamiento tributario y contable**\n\n| Aspecto | Tratamiento |\n|---|---|\n| Aportes previsionales y EsSalud | **Inafecta** |\n| Quinta categoría | **Gravada**: el impuesto adicional se retiene íntegramente en el mes de pago |\n| Deducibilidad para la empresa | Deducible en el ejercicio al que corresponde, sujeta al requisito de pago del inciso v) del art. 37 |\n| Plazo de pago | Dentro de **30 días naturales** del vencimiento del plazo de la declaración anual |\n\n**Asiento del devengo al cierre del ejercicio:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 622 | Otras remuneraciones — participación de los trabajadores | 82,000.00 | |\n| 413 | Participaciones de los trabajadores por pagar | | 82,000.00 |\n\n**El punto que hay que anticipar:** la participación en las utilidades genera una retención de quinta categoría adicional que se cobra íntegra en el mes de pago. Un trabajador que recibe S/ 4,088 de utilidades puede ver una retención inesperada en su boleta de ese mes. Entregar el cálculo escrito junto con la liquidación de utilidades evita el reclamo.'},
   {l:3,t:'ab',p:'Una empresa con 12 trabajadores nunca ha provisionado beneficios sociales en sus cuatro años de operación. La planilla mensual es S/ 31,476 (12 trabajadores a S/ 2,623). Cuantifica el efecto en sus estados financieros y diseña el plan de corrección.',
    s:'**Paso 1 — Cuantificar el devengo mensual no registrado**\n\nPor trabajador, con remuneración computable de S/ 2,623:\n\n| Beneficio | Cálculo mensual | Importe |\n|---|---|---|\n| Gratificaciones | 2,623 × 2 ÷ 12 | 437.17 |\n| Bonificación extraordinaria 9% | 437.17 × 9% | 39.35 |\n| CTS | (2,623 + 437.17) ÷ 12 | 255.01 |\n| **Provisión mensual por trabajador** | | **731.53** |\n\nPor los 12 trabajadores: 731.53 × 12 = **S/ 8,778.36 mensuales** de gasto no registrado oportunamente.\n\n**Paso 2 — El efecto en los estados financieros mensuales**\n\n| Mes | Gasto registrado sin provisión | Gasto real devengado | Distorsión |\n|---|---|---|---|\n| Enero a junio | 31,476 | 40,254 | Utilidad **sobreestimada** en 8,778 cada mes |\n| Julio | 31,476 + 34,374 (grat. + bonif.) = 65,850 | 40,254 | Pérdida **artificial** de 25,596 |\n| Agosto a octubre | 31,476 | 40,254 | Utilidad sobreestimada |\n| Mayo y noviembre | + 18,361 de CTS cada uno | 40,254 | Picos adicionales |\n\n**La consecuencia real:** durante seis meses del año la empresa cree ganar S/ 8,778 más de lo que gana, y en dos meses cree perder. Si sobre esos estados se fijaron precios, se evaluaron líneas de producto, se repartieron dividendos o se tomó un préstamo, todas esas decisiones se tomaron con información errónea.\n\n**Paso 3 — El pasivo acumulado y la pregunta clave**\n\nAquí hay que distinguir dos situaciones muy distintas:\n\n| Situación | Diagnóstico |\n|---|---|\n| La empresa **pagó** las gratificaciones y **depositó** la CTS en sus fechas, pero no provisionó mensualmente | Problema de **registro y presentación**, no de incumplimiento laboral. El pasivo real al cierre es solo el devengo del periodo en curso |\n| La empresa **no pagó** gratificaciones ni depositó CTS | Problema **grave**: pasivo laboral real, infracción SUNAFIL y deuda frente a los trabajadores con intereses legales |\n\n**Esta es la primera verificación del plan**, y determina todo lo demás. Supongamos el primer caso, que es el más común.\n\n**Paso 4 — El pasivo al cierre del ejercicio que sí debe estar registrado**\n\nAl 31 de diciembre, suponiendo que la gratificación de diciembre ya se pagó:\n\n| Concepto | Devengo pendiente | Importe |\n|---|---|---|\n| Gratificaciones (julio-diciembre ya pagada) | 0 meses | 0 |\n| CTS del periodo noviembre-diciembre (se deposita en mayo) | 2 meses × 255.01 × 12 trab. | 6,120.24 |\n| Vacaciones ganadas y no gozadas | según el cuadro por trabajador | a determinar |\n| **Pasivo mínimo a registrar** | | **6,120 + vacaciones** |\n\n**Paso 5 — El plan de corrección, en seis acciones**\n\n1. **Verificar el cumplimiento real** de los pagos y depósitos de los cuatro años: constancias de depósito de CTS, boletas de gratificación, planillas. Si falta alguno, el problema cambia de naturaleza y entra asesoría legal laboral.\n2. **Levantar el cuadro de vacaciones** por trabajador: días ganados, días gozados, días pendientes y fecha límite de goce. Identificar los casos en riesgo de triple remuneración, que es el pasivo más caro y más invisible.\n3. **Registrar el pasivo correcto al cierre**: CTS devengada no depositada y vacaciones ganadas no gozadas, con el ajuste contra resultados del ejercicio, siguiendo el tratamiento de la NIC 19 para beneficios a corto plazo.\n4. **Implementar la provisión mensual** desde el periodo siguiente, con el asiento mensual estandarizado y su papel de trabajo.\n5. **Reconstruir los estados financieros mensuales** del último ejercicio con las provisiones, para que la gerencia vea la diferencia y entienda qué decisiones tomó con información distorsionada.\n6. **Programar el goce de vacaciones** de los trabajadores con días pendientes, antes de que venza el año siguiente.\n\n**Paso 6 — El asiento mensual de provisión que queda instalado**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 621 | Remuneraciones (6214 gratificaciones, incluida la bonificación del 9%) | 5,718.24 | |\n| 629 | Beneficios sociales de los trabajadores (6291 CTS) | 3,060.12 | |\n| 411 | Remuneraciones por pagar (4114 gratificaciones) | | 5,718.24 |\n| 415 | Beneficios sociales por pagar (4151 CTS) | | 3,060.12 |\n\n**La conclusión para el informe a la gerencia:** la empresa no tiene un problema de caja nuevo, tiene un problema de información. El costo siempre estuvo ahí; lo que faltaba era registrarlo cuando se generaba. Instalar la provisión mensual no aumenta el costo en un sol, pero convierte los estados financieros mensuales en una herramienta utilizable. Y el cuadro de vacaciones puede revelar, además, un pasivo real que nadie había cuantificado.'}
  ],
  proy:{
   t:'Calendario de beneficios y provisiones de tu empresa',
   ctx:`Vas a construir el sistema que hace que julio y diciembre no sean una sorpresa: el cálculo de cada beneficio, su provisión mensual y el calendario que avisa antes de cada vencimiento.`,
   pasos:[
    'Para cada trabajador de tu plantilla, calcula la gratificación de un semestre completo con su bonificación extraordinaria, y la CTS de un semestre, con el sexto de gratificación incluido en la base.',
    'Calcula la provisión mensual de cada beneficio por trabajador y el total de la provisión mensual de tu empresa.',
    'Arma el cuadro de vacaciones: por trabajador, días ganados, días gozados, días pendientes y la fecha límite de goce para evitar la triple remuneración.',
    'Determina si tu empresa está obligada a pagar utilidades y, si lo está, calcula la participación con la renta imponible del Módulo 3 y distribúyela entre tus trabajadores con los dos criterios de ley.',
    'Construye el calendario anual de beneficios con las cinco fechas obligatorias, el responsable de cada una y el control que verifica su cumplimiento.',
    'Simula dos escenarios del estado de resultados de un año: con provisión mensual y sin ella. Muestra mes a mes la distorsión de la utilidad.',
    'Elabora la proyección de caja de los meses de mayo, julio, noviembre y diciembre, para verificar que tu empresa tendría el dinero disponible en cada fecha.'
   ],
   entrega:[
    'El cálculo de gratificación, CTS y utilidades por trabajador.',
    'El cuadro de vacaciones con fechas límite de goce.',
    'El calendario anual de beneficios con responsables y controles.',
    'La comparación de los dos escenarios del estado de resultados y la proyección de caja de los meses críticos.'
   ],
   crit:[
    'La base de la CTS incluye el sexto de la última gratificación.',
    'La gratificación lleva su bonificación extraordinaria del 9% y figura como inafecta a aportes.',
    'La comparación de escenarios muestra numéricamente la distorsión de la utilidad mensual.'
   ],
   pista:'La proyección de caja de los meses críticos es la parte que la gerencia agradecerá más. Saber en enero que en julio se necesitarán S/ 35,000 adicionales permite reservarlos; descubrirlo el 10 de julio obliga a pedir un préstamo caro.'
  },
  proyInt:{
   t:'Cierre contable con beneficios sociales completos',
   integra:'1.1 a 6.3',
   ctx:`Vas a rehacer el cierre del Módulo 2 con todo lo laboral incorporado. Es la primera vez que tus estados financieros reflejarán la realidad completa de una empresa con trabajadores.`,
   pasos:[
    'Registra en el Libro Diario de tu empresa la provisión mensual de beneficios sociales de los meses que trabajaste en el Módulo 2, con el asiento desagregado por tipo de beneficio.',
    'Registra el pago de una gratificación y el depósito de una CTS, verificando que el pasivo provisionado se extinga correctamente contra la cuenta 415.',
    'Actualiza el Libro Mayor y verifica el saldo de las cuentas 415, 441 y 4151 al cierre: cada una debe corresponder exactamente a una obligación identificable.',
    'Rehaz la hoja de trabajo y el balance de comprobación del Módulo 2 con los nuevos saldos.',
    'Elabora el estado de situación financiera con el pasivo laboral correctamente clasificado entre corriente y no corriente, aplicando el criterio de la NIC 1 y el tratamiento de beneficios a corto plazo de la NIC 19.',
    'Elabora el estado de resultados por naturaleza y por función, con el gasto de personal completo: remuneraciones, aportes del empleador y beneficios sociales.',
    'Recalcula el Impuesto a la Renta anual verificando la deducibilidad de cada concepto laboral, con especial atención al requisito de pago previo del inciso v) del artículo 37.',
    'Redacta la nota a los estados financieros sobre beneficios a los trabajadores, con la composición del pasivo y las políticas aplicadas.'
   ],
   entrega:[
    'Los asientos de provisión, pago de gratificación y depósito de CTS registrados.',
    'El balance de comprobación y la hoja de trabajo actualizados.',
    'El estado de situación financiera y el estado de resultados con el gasto de personal completo.',
    'El recálculo del Impuesto a la Renta y la nota sobre beneficios a los trabajadores.'
   ],
   crit:[
    'El saldo de cada cuenta de pasivo laboral corresponde a una obligación identificable y verificable.',
    'El pasivo laboral está correctamente clasificado entre corriente y no corriente.',
    'El recálculo del impuesto identifica los conceptos en riesgo por el requisito de pago previo.'
   ],
   pista:'Al elaborar la nota sobre beneficios a los trabajadores, incluye el cuadro de vacaciones pendientes. Es información que la NIC 19 exige considerar y que, además, pone el pasivo de triple remuneración frente a los ojos de quien debe decidir sobre él.'
  },
  fuentes:[
   {a:'Ley 27735 y D.S. 005-2002-TR', o:'Ley que regula el otorgamiento de las gratificaciones', n:'oportunidad, monto, proporcionalidad, requisitos y remuneración computable'},
   {a:'D.S. 001-97-TR y D.S. 004-97-TR', o:'TUO de la Ley de CTS y su reglamento', n:'periodos, base de cálculo con el sexto de gratificación, depósito e intangibilidad'},
   {a:'D. Leg. 713 y D.S. 012-92-TR', o:'Descansos remunerados de los trabajadores de la actividad privada', n:'vacaciones: duración, récord, goce, fraccionamiento, reducción y triple remuneración'},
   {a:'D. Leg. 892 y D.S. 009-98-TR', o:'Participación de los trabajadores en las utilidades', n:'umbral de trabajadores, porcentajes por sector, criterios de distribución y tope individual'},
   {a:'NIC 19', o:'Beneficios a los empleados', n:'reconocimiento y medición de beneficios a corto plazo y de ausencias remuneradas acumulables'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'naturaleza y régimen de los beneficios sociales y criterios jurisprudenciales'}
  ]
 },
 {
  id:'m6t4', titulo:'Regímenes laborales MYPE y el REMYPE', min:25,
  cont:`El Perú tiene un régimen laboral general y uno **especial para la micro y pequeña empresa**, creado para que una empresa pequeña pueda formalizarse sin cargar de golpe con el costo completo. Entenderlo es indispensable, porque la mayoría de los clientes de un contador en el Perú son MYPE, y porque acogerse mal al régimen es una de las contingencias laborales más cara que existen.

# Las categorías por nivel de ventas
|Categoría|Ventas anuales|Equivalente 2026 (UIT S/ 5,500)|
|**Microempresa**|Hasta **150 UIT**|Hasta **S/ 825,000**|
|**Pequeña empresa**|Más de 150 hasta **1,700 UIT**|Hasta **S/ 9,350,000**|
|**Mediana empresa**|Más de 1,700 hasta **2,300 UIT**|Hasta **S/ 12,650,000**|

! La **mediana empresa** existe como categoría para efectos de promoción y acceso a programas del Estado, pero **no tiene régimen laboral especial**: sus trabajadores están en el régimen general. Es una confusión frecuente.

> El criterio es el **nivel de ventas anuales**, no el número de trabajadores. Esto cambió con la Ley 30056: antes se consideraba también el número de trabajadores, y todavía hay material desactualizado que lo repite. Hoy una microempresa puede tener veinte trabajadores si sus ventas no superan las 150 UIT.

# El REMYPE: sin registro no hay régimen especial
El **Registro Nacional de la Micro y Pequeña Empresa** es el que habilita el régimen laboral especial. La empresa que cumple los límites de ventas pero **no está inscrita** o tiene su inscripción no vigente está en el **régimen general**, con todos sus beneficios.

$ Límites de ventas cumplidos + inscripción VIGENTE en el REMYPE = régimen laboral especial
$ Límites cumplidos SIN inscripción vigente = régimen general completo

Esta es la primera verificación que debe hacer un contador al recibir un cliente MYPE: consultar la vigencia de su inscripción. Una empresa que lleva tres años pagando beneficios reducidos sin registro vigente acumuló tres años de pasivo laboral.

# El cuadro comparativo completo
|Derecho o beneficio|Microempresa|Pequeña empresa|Régimen general|
|**RMV**|Sí: S/ 1,230|Sí: S/ 1,230|Sí: S/ 1,230|
|**Jornada máxima**|8 h / 48 h|8 h / 48 h|8 h / 48 h|
|**Horas extras con sobretasas**|Sí|Sí|Sí|
|**Descanso semanal y feriados**|Sí|Sí|Sí|
|**Vacaciones**|**15 días**|**15 días**|**30 días**|
|**Gratificaciones**|**No tiene**|**Media remuneración** cada una (2 al año)|**Una remuneración** cada una (2 al año)|
|**CTS**|**No tiene**|**15 días** de remuneración por año, tope de 90 días|Aproximadamente **una remuneración** al año|
|**Indemnización por despido arbitrario**|**10 remuneraciones diarias** por año, tope 90|**20 remuneraciones diarias** por año, tope 120|**1.5 remuneraciones mensuales** por año, tope 12|
|**Seguro de salud**|**SIS** semicontributivo (costo compartido con el Estado); puede optar por EsSalud|**EsSalud 9%**|**EsSalud 9%**|
|**Pensiones**|**Opcional** para el trabajador y el conductor|**Obligatorio**: SNP o SPP|**Obligatorio**: SNP o SPP|
|**Utilidades**|**No**|Sí, si tiene más de 20 trabajadores|Sí, si tiene más de 20 trabajadores|
|**Asignación familiar**|Sí|Sí|Sí|
|**Seguridad y salud en el trabajo**|Sí|Sí|Sí|
|**Licencias de maternidad y paternidad**|Sí|Sí|Sí|
|**Seguro de Vida Ley**|Sí|Sí|Sí|

$ Lo que NUNCA cambia en ningún régimen:
$ RMV · jornada y horario · horas extras y sus sobretasas · descanso semanal y feriados
$ seguridad y salud en el trabajo · no discriminación · protección a la maternidad
$ libertad sindical · obligaciones de planilla electrónica

# La diferencia de costo, en números
Trabajador con remuneración de S/ 1,500 más asignación familiar (S/ 1,623 computable):

|Concepto|Microempresa|Pequeña empresa|Régimen general|
|12 remuneraciones|19,476|19,476|19,476|
|Gratificaciones|0|1,623|3,246|
|Bonificación extraordinaria 9%|0|146|292|
|CTS|0|~845|~1,894|
|EsSalud 9%|SIS (menor costo)|1,753|1,753|
|**Costo anual aproximado**|**~19,900**|**~23,843**|**~26,661**|
|**Factor sobre remuneración**|**~1.02**|**~1.22**|**~1.37**|

La microempresa cuesta cerca de un 25% menos que el régimen general por trabajador. Esa diferencia es la razón de ser del régimen, y también la razón por la que algunas empresas intentan acogerse sin cumplir los requisitos.

# Las exclusiones y la MYPE ficticia
No pueden acceder al régimen especial, conforme a la norma reglamentaria:
- Las empresas que, **conformando un grupo económico**, en conjunto superen los límites de ventas.
- Las que tengan **vinculación económica** con otras empresas o grupos que superen los límites.
- Las que **falseen información** para acogerse.
- Las que se dediquen al rubro de **bares, discotecas, casinos y juegos de azar**.

! **La MYPE ficticia.** Dividir una empresa en tres para que cada una quede bajo las 150 UIT es la estrategia que más sanciones ha generado. Expone a tres frentes simultáneos: (1) la **primacía de la realidad**, que mira la unidad económica y no la forma societaria; (2) la **norma antielusiva general** del Código Tributario; y (3) la **responsabilidad solidaria** entre las empresas del grupo frente a los trabajadores. El resultado típico es la recalificación de todos los trabajadores al régimen general con beneficios retroactivos, más las multas de SUNAFIL y de SUNAT.

> Los indicios que una inspección busca son concretos y fáciles de encontrar: mismos socios y mismo domicilio, trabajadores que reciben órdenes del mismo jefe, un solo local compartido, una sola marca frente al cliente, contabilidad y planilla gestionadas por la misma persona, y trabajadores que no saben con cuál de las empresas tienen contrato. Si tres de esos indicios están presentes, la defensa es muy difícil.

# El tránsito entre regímenes
Cuando una empresa supera el límite de ventas de su categoría, la norma prevé un periodo de transición para que la carga no aumente de golpe.

$ Regla general: si supera el límite durante DOS años consecutivos,
$ pasa a la categoría siguiente a partir del año siguiente

Y existe además una regla de permanencia que otorga un plazo adicional en el régimen anterior, con el fin de facilitar el crecimiento. El contador debe verificar las ventas anuales de su cliente cada ejercicio y avisar con anticipación: pasar del régimen de microempresa al general significa que el costo laboral por trabajador sube un 34%, y eso debe estar presupuestado antes de que ocurra.

**Lo que no se puede hacer:** los trabajadores ya contratados bajo el **régimen general no pueden ser trasladados** al régimen especial reduciéndoles beneficios. El régimen especial aplica a los trabajadores contratados bajo su vigencia. Reducir derechos adquiridos vulnera el principio de **irrenunciabilidad de derechos** del artículo 26 de la Constitución, y un acuerdo donde el trabajador acepta la reducción es nulo.

# Lo laboral y lo tributario son independientes
Esta es la confusión más extendida, y conviene fijarla con una tabla:

|Aspecto|Régimen que lo rige|
|Beneficios laborales del trabajador|**Régimen laboral**: general, pequeña empresa o microempresa, según el REMYPE|
|Impuesto a la Renta y tasas|**Régimen tributario**: NRUS, RER, RMT o General, según la LIR|

$ Una empresa puede estar en el Régimen MYPE Tributario y en el régimen laboral GENERAL
$ Y puede estar en el Régimen General tributario y en el régimen laboral de PEQUEÑA EMPRESA

Son dos clasificaciones distintas, con normas distintas, registros distintos y límites distintos. Acogerse al Régimen MYPE Tributario no otorga el régimen laboral especial, y la inscripción en el REMYPE no cambia el régimen tributario. Un contador que confunde esto le da a su cliente un consejo equivocado en los dos frentes.

# La verificación que hay que hacer en cada cliente MYPE
1. ¿Está **inscrita y vigente** en el REMYPE? Consultarlo, no asumirlo.
2. ¿Sus **ventas anuales** de los dos últimos ejercicios están dentro del límite de la categoría declarada?
3. ¿Tiene **vinculación económica** con otras empresas que, sumadas, excedan el límite?
4. ¿Los trabajadores fueron contratados **bajo la vigencia** del régimen especial, o venían del régimen general?
5. ¿Se están pagando **todos** los beneficios que sí corresponden a su categoría? Es frecuente que una pequeña empresa deje de pagar la media gratificación creyendo que no le toca ninguna.
6. ¿Los trabajadores están correctamente **registrados en el T-Registro** con el régimen laboral que les corresponde?

Las seis preguntas toman veinte minutos y evitan el pasivo laboral más común del país.`,
  claves:['Las categorías se definen por ventas anuales: microempresa hasta 150 UIT (S/ 825,000) y pequeña empresa hasta 1,700 UIT (S/ 9,350,000).','Sin inscripción vigente en el REMYPE no hay régimen laboral especial: la empresa está en el régimen general completo.','Microempresa: 15 días de vacaciones, sin gratificaciones ni CTS. Pequeña empresa: 15 días, media gratificación y CTS de 15 días por año.','RMV, jornada, horas extras, descansos, feriados y seguridad y salud en el trabajo son iguales en todos los regímenes.','El régimen laboral y el régimen tributario son independientes: estar en el RMT no otorga el régimen laboral de MYPE.'],
  preg:[
   {p:'¿Por qué la inscripción en el REMYPE es la primera cosa que hay que verificar en un cliente MYPE?',
    r:'Porque el régimen laboral especial **no se aplica por cumplir los límites de ventas**: se aplica por estar inscrito y con registro vigente. Una empresa que factura S/ 400,000 al año y paga beneficios de microempresa sin tener inscripción vigente está incumpliendo el régimen general, y acumula pasivo por la diferencia: las gratificaciones completas, la CTS completa y los 30 días de vacaciones que debió pagar. Ese pasivo crece cada mes y es perfectamente verificable por SUNAFIL con una sola consulta al registro. La verificación toma un minuto y es la de mayor retorno que existe al recibir un cliente nuevo.'},
   {p:'¿Qué derechos son idénticos en los tres regímenes laborales y por qué?',
    r:'La Remuneración Mínima Vital, la jornada máxima de 8 horas diarias o 48 semanales, el pago de horas extras con sus sobretasas, el descanso semanal y los feriados, la seguridad y salud en el trabajo, la protección contra la discriminación, la protección a la maternidad y la paternidad, la libertad sindical y las obligaciones de planilla electrónica. Son iguales porque tocan **derechos fundamentales** y la integridad del trabajador, no beneficios económicos de origen legal. El régimen especial reduce el costo de los beneficios patrimoniales —gratificaciones, CTS, días de vacaciones, indemnización—, no la protección básica de la persona. Confundirlo lleva al error de creer que en una microempresa se puede trabajar más horas o pagar menos de la RMV, lo que es una infracción grave.'},
   {p:'¿Por qué dividir una empresa en varias para quedar bajo el límite de ventas es una estrategia tan riesgosa?',
    r:'Porque expone a tres frentes al mismo tiempo y cada uno basta para desarmarla. La **primacía de la realidad** permite mirar la unidad económica detrás de las formas societarias: si hay un solo negocio operando con tres razones sociales, SUNAFIL puede recalificar a todos los trabajadores al régimen general. La **norma antielusiva general** del Código Tributario permite a SUNAT desconocer los actos artificiosos cuyo único propósito es la ventaja tributaria. Y la **responsabilidad solidaria** entre empresas del grupo permite cobrar a cualquiera de ellas. Los indicios que se buscan son fáciles de encontrar: mismos socios, mismo domicilio, mismo jefe, una sola marca frente al cliente, trabajadores que no saben con cuál empresa tienen contrato. El ahorro de unos miles de soles al año se convierte en un pasivo retroactivo de todos los años no prescritos, más multas.'},
   {p:'Una empresa en el Régimen MYPE Tributario pregunta si por eso sus trabajadores tienen 15 días de vacaciones. ¿Qué le respondes?',
    r:'Que no, porque son dos clasificaciones distintas e independientes. El **Régimen MYPE Tributario** es una categoría de la Ley del Impuesto a la Renta y determina cómo se calcula y paga ese impuesto. El **régimen laboral especial de la MYPE** proviene de la Ley de Impulso al Desarrollo Productivo y depende de la inscripción vigente en el REMYPE. Una empresa puede estar en el RMT y tener a sus trabajadores en el régimen laboral general, y puede estar en el Régimen General tributario y tener a sus trabajadores en el régimen de pequeña empresa. La pregunta correcta para definir los beneficios laborales no es "en qué régimen tributario estoy" sino "estoy inscrito y vigente en el REMYPE y en qué categoría". Esta confusión es la causa de muchos pasivos laborales en empresas que creían estar cumpliendo.'},
   {p:'¿Se puede trasladar a un trabajador del régimen general al régimen de microempresa si la empresa se inscribe en el REMYPE?',
    r:'No. Los derechos laborales ya adquiridos son **irrenunciables** por mandato del artículo 26 de la Constitución, de modo que un trabajador contratado bajo el régimen general conserva sus 30 días de vacaciones, sus gratificaciones completas y su CTS, aunque la empresa se inscriba después en el REMYPE. El régimen especial aplica a los trabajadores contratados bajo su vigencia. Y un acuerdo firmado donde el trabajador acepta la reducción es **nulo**: la irrenunciabilidad significa precisamente que el consentimiento del trabajador no valida la pérdida del derecho. En la práctica, una empresa que se inscribe en el REMYPE tendrá dos grupos de trabajadores con regímenes distintos, y la planilla debe reflejarlo correctamente en el T-Registro.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una empresa comercial facturó S/ 700,000 el año pasado y tiene 18 trabajadores. ¿A qué categoría puede acogerse?',
    o:['Pequeña empresa, porque tiene más de 10 trabajadores','Microempresa, porque sus ventas no superan las 150 UIT','Régimen general, porque tiene más de 15 trabajadores','Mediana empresa'],r:1,
    s:'**Microempresa**, porque el único criterio es el nivel de **ventas anuales**: hasta 150 UIT, que en 2026 equivale a S/ 825,000. Los S/ 700,000 están dentro del límite.\n\nEl número de trabajadores **ya no es criterio** desde la Ley 30056: antes la microempresa estaba limitada a 10 trabajadores, y todavía circula material desactualizado que lo repite. Hoy una microempresa puede tener 18 trabajadores si sus ventas respetan el límite.\n\nY la condición indispensable: debe estar **inscrita y vigente en el REMYPE**. Cumplir el límite de ventas no basta; sin registro vigente los trabajadores están en el régimen general.'},
   {l:1,t:'num',p:'Un trabajador de una pequeña empresa inscrita en el REMYPE gana S/ 1,600 más asignación familiar. ¿Cuánto le corresponde de gratificación de julio por un semestre completo, sin la bonificación?',
    u:'S/',r:861.5,tol:5,
    s:'Remuneración computable = 1,600 + 123 = **S/ 1,723**\n\nEn la **pequeña empresa** la gratificación es de **media remuneración** por semestre:\n1,723 ÷ 2 = **S/ 861.50**\n\nY la bonificación extraordinaria del 9% se calcula sobre ese monto: 861.50 × 9% = S/ 77.54, de modo que el total a pagar es S/ 939.04.\n\nDos errores frecuentes en este punto: creer que la pequeña empresa no paga gratificación alguna (la microempresa no paga; la pequeña paga media), y omitir la bonificación extraordinaria del 9%, que también corresponde en este régimen porque la inafectación de la Ley 30334 aplica igual.'},
   {l:2,t:'num',p:'Compara el costo anual de un trabajador con remuneración de S/ 2,000 más asignación familiar en el régimen general frente al de pequeña empresa, y calcula la diferencia en soles.',
    u:'S/',r:4109,tol:120,
    s:'Remuneración computable = 2,000 + 123 = **S/ 2,123**\n\n| Concepto | Régimen general | Pequeña empresa |\n|---|---|---|\n| 12 remuneraciones | 25,476 | 25,476 |\n| Gratificaciones | 2,123 × 2 = 4,246 | 1,061.50 × 2 = 2,123 |\n| Bonificación extraordinaria 9% | 382.14 | 191.07 |\n| CTS | base (2,123 + 353.83) = 2,476.83 → 2,476.83 | 15 días por año: 2,123 ÷ 30 × 15 = 1,061.50 |\n| EsSalud 9% | 25,476 × 9% = 2,292.84 | 2,292.84 |\n| **Costo anual** | **34,873.81** | **31,144.41** |\n\n**Diferencia = 34,873.81 − 31,144.41 = S/ 3,729.40 por trabajador y por año.**\n\n| Indicador | Régimen general | Pequeña empresa |\n|---|---|---|\n| Factor sobre remuneración anualizada | 1.37 | 1.22 |\n\nCon diez trabajadores, el ahorro anual del régimen de pequeña empresa supera los S/ 37,000. Esa magnitud explica por qué el registro en el REMYPE importa tanto, y también por qué hay empresas que intentan acogerse sin cumplir los requisitos. Nótese además que el ahorro proviene íntegramente de beneficios patrimoniales: la RMV, la jornada y las sobretasas son idénticas.'},
   {l:2,t:'ab',p:'Un cliente nuevo te dice que es microempresa y paga beneficios de ese régimen desde 2022. Al revisar, descubres que su inscripción en el REMYPE nunca se realizó y que factura S/ 600,000 al año con 8 trabajadores. Cuantifica el problema y diseña el plan.',
    s:'**El diagnóstico:** cumple el límite de ventas de microempresa (S/ 600,000 está por debajo de las 150 UIT = S/ 825,000), pero **sin inscripción vigente en el REMYPE no hay régimen especial**. Sus ocho trabajadores están, legalmente, en el **régimen general**, y lo han estado desde 2022.\n\n**Paso 1 — Cuantificar la diferencia por trabajador y por año**\n\nSupongamos una remuneración promedio de S/ 1,400 más asignación familiar en la mitad de los casos; usemos S/ 1,460 de promedio computable:\n\n| Beneficio | Pagado (microempresa) | Debido (régimen general) | Diferencia anual |\n|---|---|---|---|\n| Gratificaciones | 0 | 1,460 × 2 = 2,920 | 2,920 |\n| Bonificación extraordinaria 9% | 0 | 262.80 | 262.80 |\n| CTS | 0 | base (1,460 + 243.33) = 1,703.33 | 1,703.33 |\n| Vacaciones: 15 días pagados frente a 30 debidos | 730 | 1,460 | 730 |\n| EsSalud 9% frente a SIS | SIS (aporte menor) | 1,460 × 12 × 9% = 1,576.80 | ~1,300 estimado |\n| **Diferencia por trabajador y por año** | | | **~6,916** |\n\n**Por 8 trabajadores y 4 años (2022 a 2025):**\n\n$ 6,916 × 8 trabajadores × 4 años = S/ 221,312 de pasivo laboral aproximado\n\nMás los **intereses legales laborales** sobre los beneficios no pagados, y los **intereses moratorios tributarios** sobre el EsSalud y las retenciones previsionales omitidas.\n\n**Paso 2 — Los frentes de contingencia**\n\n| Frente | Riesgo | Plazo de prescripción |\n|---|---|---|\n| **Trabajadores** | Demanda laboral por beneficios no pagados, con intereses legales | Plazo laboral propio, distinto del tributario |\n| **SUNAFIL** | Infracciones por no pagar gratificaciones, no depositar CTS y no otorgar vacaciones completas. Las multas se calculan en UIT y escalan con el número de afectados: con 8 trabajadores afectados en varias infracciones, el monto es considerable |\n| **SUNAT** | Omisión de aportes a EsSalud, con la infracción del numeral 1 del artículo 178 por declarar cifras falsas en la PLAME | 4 o 6 años según se declaró o no |\n| **Pensiones** | Si tampoco se descontaron aportes previsionales obligatorios, hay omisión de retenciones | Hasta 10 años si se retuvo y no se pagó |\n\n**Paso 3 — El plan, en siete acciones ordenadas**\n\n1. **Inscribir la empresa en el REMYPE de inmediato.** No corrige el pasado, pero detiene el crecimiento del pasivo desde la fecha de inscripción. Cada mes de demora son otros S/ 4,600 de diferencia acumulada.\n2. **Determinar con precisión el pasivo**, trabajador por trabajador y año por año, con las remuneraciones reales y no con promedios. El cálculo con promedios sirve para dimensionar; el cálculo definitivo necesita el detalle.\n3. **Identificar qué periodos están prescritos** en cada frente, que tienen plazos distintos: el laboral, el tributario de EsSalud y el de las retenciones previsionales.\n4. **Regularizar el frente tributario con subsanación voluntaria**: rectificar las PLAME de los periodos no prescritos y pagar el EsSalud omitido con intereses, antes de cualquier notificación. Esto rebaja la multa del 178.1 al 5% de su importe. Es la acción de mayor retorno inmediato.\n5. **Diseñar la estrategia laboral con asesoría legal especializada.** Aquí no hay solución puramente contable: hay que decidir entre regularizar proactivamente con los trabajadores, provisionar el pasivo y esperar, o negociar. Cada opción tiene consecuencias distintas y la decisión es de la gerencia, informada por el contador y por el abogado.\n6. **Registrar el pasivo en los estados financieros**. Es una obligación presente derivada de un hecho pasado con salida probable de recursos: califica como pasivo bajo la NIC 37 si el importe es estimable, y debe reconocerse, no solo revelarse. Omitirlo hace que los estados financieros de la empresa estén materialmente equivocados.\n7. **Informar por escrito a la gerencia**, con el cuadro del pasivo, los frentes de riesgo y las opciones. Este informe protege al cliente y protege al contador.\n\n**La conversación que hay que tener con el cliente, y es la parte difícil:** su empresa no ahorró S/ 221,000 en cuatro años. Los diferió, y ahora valen más. Un contador que descubre esto y no lo informa por escrito se convierte en parte del problema; uno que lo informa con números y opciones se convierte en indispensable. Y la primera acción —inscribir el REMYPE hoy— es gratuita y detiene la hemorragia.'},
   {l:3,t:'ab',p:'Un empresario te consulta: tiene una empresa que factura S/ 3,000,000 al año con 40 trabajadores, y quiere dividirla en cuatro sociedades de S/ 750,000 cada una para que todas sean microempresas. Analiza la propuesta completa.',
    s:'**La respuesta profesional es que no funciona, y hay que explicar por qué con precisión, no solo advertir.**\n\n**Paso 1 — Lo que el empresario cree que ahorra**\n\n| Escenario | Costo laboral anual estimado (40 trabajadores, promedio S/ 1,623 computable) |\n|---|---|\n| Régimen general actual | 40 × ~26,661 = **1,066,440** |\n| Si fueran microempresas | 40 × ~19,900 = **796,000** |\n| **Ahorro aparente** | **~270,000 por año** |\n\nEs una cifra que llama la atención de cualquier gerencia, y por eso hay que desarmar la propuesta con rigor.\n\n**Paso 2 — Por qué la estructura se desarma: la exclusión expresa**\n\nLa norma reglamentaria excluye del régimen especial a las empresas que, **conformando un grupo económico**, en conjunto superen los límites de ventas, y a las que tengan **vinculación económica** con otras que los superen. Cuatro sociedades con los mismos socios son un grupo económico cuyas ventas conjuntas son S/ 3,000,000, muy por encima de las 150 UIT. La exclusión no requiere que SUNAFIL "demuestre un fraude": basta con constatar el grupo.\n\n**Paso 3 — Los tres frentes que se activan**\n\n| Frente | Herramienta | Consecuencia |\n|---|---|---|\n| **SUNAFIL** | **Primacía de la realidad**: se mira la unidad económica, no la forma societaria | Recalificación de los 40 trabajadores al régimen general con beneficios **retroactivos** de todos los periodos no prescritos, más multas por cada infracción y por cada trabajador afectado |\n| **SUNAT** | **Norma XVI** (antielusiva general) y las reglas de **vinculación económica** | Desconocimiento de la estructura, recálculo del Impuesto a la Renta en el régimen que corresponda, pérdida de los beneficios del RMT, más multas e intereses |\n| **Trabajadores** | **Responsabilidad solidaria** del grupo y demanda laboral | Cualquiera de las cuatro empresas responde por el total; los procesos laborales tienen presunciones favorables al trabajador |\n\n**Paso 4 — Los indicios que una inspección encontrará en una tarde**\n\n| Indicio | Por qué es decisivo |\n|---|---|\n| Mismos socios y mismo representante legal | Prueba documental en Registros Públicos, inmediata |\n| Mismo domicilio fiscal o mismo local | Verificable en la visita inspectiva |\n| Trabajadores que reciben órdenes del mismo jefe | Se establece con entrevistas a los trabajadores |\n| Una sola marca, un solo local, un solo teléfono frente al cliente | Verificable con una visita o en internet |\n| Contabilidad y planilla gestionadas por la misma persona | Documental |\n| Trabajadores que no saben con cuál empresa tienen contrato | La prueba más devastadora en una inspección |\n| Facturación cruzada entre las cuatro sociedades sin servicio real | Se detecta en el cruce de comprobantes electrónicos |\n\nCon tres de estos indicios la defensa es muy difícil. Con cinco, es inviable.\n\n**Paso 5 — El costo del escenario adverso**\n\n| Concepto | Estimación |\n|---|---|\n| Beneficios retroactivos de 40 trabajadores por los años no prescritos | 270,000 por año × años no prescritos |\n| Intereses legales laborales | sobre ese monto |\n| Multas SUNAFIL, con 40 trabajadores afectados en varias infracciones | montos relevantes según las tablas, con tope anual de 200 UIT por sujeto inspeccionado |\n| Recálculo tributario, multas e intereses de SUNAT | variable |\n| Costos legales de procesos laborales y del contencioso tributario | relevantes |\n\nEl ahorro de S/ 270,000 anuales se convierte, en el escenario adverso, en un pasivo de varios millones. Y el escenario adverso no requiere mala suerte: requiere una sola inspección o un solo trabajador que demande.\n\n**Paso 6 — Lo que sí se puede hacer, porque un asesor no solo dice no**\n\n| Alternativa legítima | Qué permite |\n|---|---|\n| Verificar si la empresa califica como **pequeña empresa** | Con S/ 3,000,000 de ventas está muy por debajo de las 1,700 UIT (S/ 9,350,000): **califica como pequeña empresa**. Si está inscrita y vigente en el REMYPE, los trabajadores contratados bajo su vigencia tienen media gratificación y CTS de 15 días |\n| Revisar la **estructura salarial** | Identificar conceptos no remunerativos con causa real: movilidad supeditada a la asistencia, condiciones de trabajo, asignación por educación sustentada |\n| Evaluar una **EPS** | El crédito sobre el aporte a EsSalud, con los requisitos de ley |\n| Revisar la **productividad y el dimensionamiento** | El verdadero margen suele estar aquí: 40 trabajadores para S/ 3,000,000 de ventas son S/ 75,000 de venta por trabajador, un indicador que conviene comparar con el del sector |\n| Verificar que **todos los beneficios se paguen correctamente** | Un pago incorrecto ya existente es un pasivo; corregirlo no ahorra, pero evita que crezca |\n\n**Paso 7 — El dato que cambia la conversación**\n\nEsto es lo más importante del caso y suele pasar desapercibido: **la empresa ya califica como pequeña empresa sin dividir nada**. Con S/ 3,000,000 de ventas está holgadamente dentro del límite de 1,700 UIT. Si no está inscrita en el REMYPE, inscribirse le da legalmente parte del ahorro que buscaba con una estructura ilegal:\n\n| Escenario | Costo anual (40 trabajadores) |\n|---|---|\n| Régimen general | ~1,066,440 |\n| **Pequeña empresa (legal, con REMYPE vigente)** | **~953,720** |\n| Microempresa mediante división (ilegal) | ~796,000 más el pasivo contingente |\n\nEl régimen de pequeña empresa, al que accede legalmente, le ahorra más de S/ 110,000 al año sin ninguna contingencia. La diferencia frente a la estructura ilegal es de unos S/ 157,000 anuales, a cambio de un riesgo de varios millones.\n\n**La conclusión que hay que entregarle por escrito:** la propuesta de dividir la empresa cambia un ahorro de S/ 157,000 anuales por una contingencia de varios millones y por la responsabilidad personal del representante legal. Existe una vía legal que captura buena parte del beneficio. Y conviene dejar constancia escrita del consejo, porque si el cliente decide avanzar de todos modos, el contador debe poder acreditar que advirtió.'}
  ],
  proy:{
   t:'Determinación del régimen laboral de tu empresa',
   ctx:`Vas a determinar con rigor en qué régimen laboral está tu empresa, qué beneficios debe pagar y cuánto le cuesta cada escenario. Es la decisión que define la mitad de su costo de personal.`,
   pasos:[
    'Toma las ventas anuales de tu empresa de los Módulos 2 y 3 y determina su categoría por nivel de ventas: microempresa, pequeña, mediana o fuera de los límites.',
    'Verifica las condiciones adicionales: existencia de grupo económico o vinculación económica, y que el giro no esté entre los excluidos.',
    'Determina el régimen laboral que corresponde a tu empresa y documenta el requisito de inscripción vigente en el REMYPE.',
    'Para cada trabajador de tu plantilla, elabora el cuadro de beneficios que le corresponden en ese régimen, con el detalle de vacaciones, gratificaciones, CTS, seguro de salud y pensiones.',
    'Calcula el costo laboral anual de tu empresa en los tres escenarios: microempresa, pequeña empresa y régimen general. Expresa cada uno en soles, como factor sobre la remuneración y como porcentaje de las ventas.',
    'Proyecta el punto de tránsito: ¿a qué nivel de ventas tu empresa pasaría a la categoría siguiente, y cuánto subiría su costo laboral en ese momento?',
    'Elabora el cuadro comparativo del régimen laboral y el régimen tributario de tu empresa, dejando explícito que son independientes.',
    'Redacta la lista de verificación de seis puntos del subtema aplicada a tu empresa, con la respuesta documentada de cada uno.'
   ],
   entrega:[
    'La determinación del régimen con el sustento de cada condición verificada.',
    'El cuadro de beneficios por trabajador según el régimen aplicable.',
    'El costo laboral en los tres escenarios, en soles, factor y porcentaje de ventas.',
    'La proyección del punto de tránsito y la lista de verificación documentada.'
   ],
   crit:[
    'La categoría se determina por ventas anuales, no por número de trabajadores.',
    'La determinación deja explícito que sin inscripción vigente en el REMYPE aplica el régimen general.',
    'El cuadro comparativo distingue claramente el régimen laboral del régimen tributario.'
   ],
   pista:'La proyección del punto de tránsito es el dato más útil para la gerencia. Saber que al llegar a S/ 9,350,000 de ventas el costo laboral por trabajador sube un 12% permite planificar; descubrirlo cuando ya ocurrió obliga a improvisar.'
  },
  proyInt:{
   t:'Manual laboral de tu empresa',
   integra:'1.1 a 6.4',
   ctx:`Vas a producir el manual laboral que acompaña a los manuales contable, tributario y de fiscalización que ya construiste. Es el documento que define cómo tu empresa contrata, paga y registra a sus trabajadores.`,
   pasos:[
    'Capítulo 1 — Régimen aplicable: la determinación del subtema anterior, con el sustento de cada condición y la constancia de inscripción en el REMYPE si corresponde.',
    'Capítulo 2 — Estructura salarial: la política de remuneraciones del subtema 6.1, con la clasificación de cada concepto y la documentación que lo sustenta.',
    'Capítulo 3 — Aportes y descuentos: el cuadro completo de aportes del empleador y descuentos del trabajador, con sus bases y el procedimiento de retención de quinta del subtema 6.2.',
    'Capítulo 4 — Beneficios sociales: el calendario anual de cinco fechas del subtema 6.3, con el procedimiento de cálculo de cada beneficio y el cuadro de provisiones mensuales.',
    'Capítulo 5 — Registro contable: las cuentas que se usan para cada concepto, con el asiento modelo de la planilla y de las provisiones.',
    'Capítulo 6 — Contingencias laborales: el registro de riesgos laborales de tu empresa, cuantificado, integrado al registro único de contingencias del subtema 5.1.',
    'Anexo — Modelos: boleta de pago, cuadro de vacaciones, hoja de cálculo de gratificación y de CTS, y liquidación de beneficios sociales.',
    'Integra el manual laboral con los manuales contable, tributario, de fiscalización y de defensa, en el documento maestro único con índice general y control de versiones.'
   ],
   entrega:[
    'El manual laboral con sus seis capítulos y el anexo de modelos.',
    'El registro de contingencias laborales cuantificado e integrado.',
    'El documento maestro actualizado con el nuevo capítulo laboral.'
   ],
   crit:[
    'El capítulo 1 documenta la vigencia del REMYPE, no solo el cumplimiento del límite de ventas.',
    'Cada contingencia laboral está cuantificada en soles y tiene un control asignado.',
    'Los modelos del anexo son utilizables tal como están, con solo completar datos.'
   ],
   pista:'El modelo más útil del anexo es el cuadro de vacaciones por trabajador con fecha límite de goce. Es el único documento que previene el pasivo de triple remuneración, y casi ninguna empresa pequeña lo tiene.'
  },
  fuentes:[
   {a:'D.S. 013-2013-PRODUCE', o:'TUO de la Ley de Impulso al Desarrollo Productivo y al Crecimiento Empresarial', n:'categorías por ventas, régimen laboral especial de la micro y pequeña empresa y tránsito entre regímenes'},
   {a:'D. Leg. 1086 y Ley 30056', o:'Ley de Promoción de la Competitividad, Formalización y Desarrollo de la MYPE', n:'permanencia del régimen especial y eliminación del criterio de número de trabajadores'},
   {a:'D.S. 008-2008-TR', o:'Reglamento de la Ley MYPE', n:'REMYPE, exclusiones por grupo económico y vinculación, y acreditación del régimen'},
   {a:'Constitución Política del Perú', o:'Artículo 26', n:'irrenunciabilidad de los derechos laborales reconocidos por la Constitución y la ley'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'regímenes laborales especiales, primacía de la realidad y grupo de empresas'},
   {a:'Mario Apaza Meza', o:'Contabilidad y tributación de la MYPE', n:'relación entre el régimen laboral y el régimen tributario y costos comparados'}
  ]
 },
 {
  id:'m6t5', titulo:'Contabilización de la planilla y las provisiones de beneficios', min:26,
  cont:`La planilla es, probablemente, el asiento más complejo que registra una empresa pequeña: intervienen una cuenta de gasto por cada concepto, varias cuentas de pasivo con acreedores distintos y tres momentos que no deben mezclarse. Hacerlo bien es lo que permite que el estado de resultados diga la verdad y que el pasivo laboral sea verificable sol por sol.

# Las cuentas del PCGE 2019 que intervienen
**Gastos — Elemento 6:**
|Cuenta|Concepto|
|**621**|Remuneraciones: **6211** sueldos y salarios, **6212** comisiones, **6213** remuneraciones en especie, **6214** gratificaciones, **6215** vacaciones|
|**622**|Otras remuneraciones (incluye la participación de los trabajadores en las utilidades)|
|**623**|Indemnizaciones al personal|
|**624**|Capacitación|
|**625**|Atención al personal|
|**627**|Seguridad, previsión social y otras contribuciones: **6271** EsSalud, **6273** SCTR, **6274** seguro de vida, **6275** EPS, **6277** Senati|
|**628**|Retribuciones al directorio|
|**629**|Beneficios sociales de los trabajadores: **6291** compensación por tiempo de servicios|

**Pasivos — Elemento 4:**
|Cuenta|Concepto|
|**4017**|Impuesto a la Renta: **40173** renta de quinta categoría|
|**403**|Instituciones públicas: **4031** EsSalud, **4032** ONP, **4033** Senati|
|**407**|Administradoras de fondos de pensiones (AFP)|
|**408**|Empresas prestadoras de servicios de salud (EPS)|
|**411**|Remuneraciones por pagar: **4111** sueldos y salarios, **4114** gratificaciones, **4115** vacaciones|
|**413**|Participaciones de los trabajadores por pagar|
|**415**|Beneficios sociales de los trabajadores por pagar: **4151** CTS|
|**419**|Otras remuneraciones y participaciones por pagar|

! Fíjate en la lógica: el **gasto** se reconoce por su naturaleza en el elemento 6, y el **pasivo** se reconoce por su **acreedor** en el elemento 4. El trabajador es acreedor en la 411; EsSalud y la ONP en la 403; la AFP en la 407; la SUNAT por la retención de quinta en la 4017. Esa separación por acreedor es lo que hace que el pasivo sea verificable.

# Los tres momentos, que nunca se mezclan
$ MOMENTO 1 — Devengo de la planilla: nace el gasto y nacen los pasivos
$ MOMENTO 2 — Pago al trabajador: se extingue el pasivo con el trabajador
$ MOMENTO 3 — Pago de tributos y aportes: se extinguen los pasivos con terceros

Registrarlos juntos en un solo asiento es el error que destruye la trazabilidad: deja de saberse cuánto se debe al trabajador y cuánto a cada institución, y la conciliación del mes se vuelve imposible.

# Momento 1 — El asiento de devengo de la planilla
Planilla del mes: remuneraciones S/ 31,476; ONP S/ 2,145; AFP S/ 1,950; retención de quinta S/ 420; EsSalud S/ 2,832.84.

@Devengo de remuneraciones del mes
621|Remuneraciones (6211 sueldos y salarios)|31,476.00|
403|Instituciones públicas (4032 ONP)||2,145.00
407|Administradoras de fondos de pensiones||1,950.00
4017|Impuesto a la renta (40173 quinta categoría)||420.00
411|Remuneraciones por pagar (4111)||26,961.00

@Devengo de los aportes del empleador
627|Seguridad y previsión social (6271 EsSalud)|2,832.84|
403|Instituciones públicas (4031 EsSalud)||2,832.84

$ Verificación: 31,476.00 = 2,145.00 + 1,950.00 + 420.00 + 26,961.00 ✓

Observa lo esencial: los **descuentos del trabajador no generan gasto**, solo trasladan parte del pasivo del trabajador hacia las instituciones. El gasto es S/ 31,476 y el neto a pagar S/ 26,961; la diferencia son pasivos con terceros. El EsSalud, en cambio, **sí es gasto adicional**, porque es un costo de la empresa.

# Momento 2 — El pago al trabajador
@Pago de remuneraciones
411|Remuneraciones por pagar (4111)|26,961.00|
104|Cuentas corrientes en instituciones financieras||26,961.00

# Momento 3 — El pago de tributos y aportes
@Pago de aportes y retenciones del mes siguiente
403|Instituciones públicas (4031 EsSalud y 4032 ONP)|4,977.84|
407|Administradoras de fondos de pensiones|1,950.00|
4017|Impuesto a la renta (40173 quinta categoría)|420.00|
104|Cuentas corrientes en instituciones financieras||7,347.84

Después de este asiento, las cuentas 403, 407 y 4017 deben quedar en **cero** respecto de ese mes. Si queda saldo, hay algo impago, y conviene averiguarlo de inmediato: si lo que quedó impago es una retención, la contingencia es de las graves.

# El asiento mensual de provisiones
Aquí está la pieza que distingue una contabilidad profesional de una que solo registra pagos. Por cada mes, con remuneración computable total de S/ 31,476 (12 trabajadores a S/ 2,623):

|Provisión|Cálculo|Importe|
|Gratificaciones|31,476 × 2 ÷ 12|5,246.00|
|Bonificación extraordinaria 9%|5,246 × 9%|472.14|
|CTS|(31,476 + 5,246) ÷ 12|3,060.17|
|Vacaciones|31,476 ÷ 12|2,623.00|
|**Total de la provisión mensual**||**11,401.31**|

@Provisión mensual de beneficios sociales
621|Remuneraciones (6214 gratificaciones)|5,718.14|
621|Remuneraciones (6215 vacaciones)|2,623.00|
629|Beneficios sociales (6291 CTS)|3,060.17|
411|Remuneraciones por pagar (4114 gratificaciones)||5,718.14
411|Remuneraciones por pagar (4115 vacaciones)||2,623.00
415|Beneficios sociales por pagar (4151 CTS)||3,060.17

$ Verificación: 5,718.14 + 2,623.00 + 3,060.17 = 11,401.31 en ambas columnas ✓

> La provisión de **vacaciones** merece una aclaración, porque confunde. Las vacaciones no son un costo adicional a los doce sueldos: cuando el trabajador descansa, se le paga su remuneración igual que si trabajara. Lo que se provisiona es el **derecho ganado y no gozado**: si al cierre el trabajador tiene días pendientes, existe una obligación presente que debe figurar en el pasivo. Al gozar las vacaciones, el pago se aplica contra la cuenta 4115 y no genera gasto nuevo.

# Cuando se paga la gratificación
@Pago de gratificación de julio
411|Remuneraciones por pagar (4114 gratificaciones)|31,476.00|
4017|Impuesto a la renta (40173 quinta categoría)||1,850.00
104|Cuentas corrientes en instituciones financieras||29,626.00

! Nótese que el pago de la gratificación **no genera gasto**: el gasto ya se reconoció mes a mes en la provisión. Si al pagar la gratificación aparece un gasto, es la señal inequívoca de que no se estaba provisionando. Y si la provisión acumulada no alcanza para cubrir el pago, el ajuste por la diferencia revela que la provisión estaba mal calculada.

# El pago de la CTS
@Depósito de CTS de mayo
415|Beneficios sociales por pagar (4151 CTS)|18,361.00|
104|Cuentas corrientes en instituciones financieras||18,361.00

Observa que el depósito de la CTS tampoco genera gasto, ni retención de quinta: la CTS es el único concepto laboral inafecto tanto a aportes como al impuesto.

# Las cuatro conciliaciones del cierre laboral del mes
$ 1) Cuenta 62 del mes  ↔  Total de la PLAME del mes
$ 2) Saldo de la 403 y 407  ↔  Importe a pagar en el cronograma del mes siguiente
$ 3) Saldo de la 4017-40173  ↔  Retenciones de quinta declaradas en la PLAME
$ 4) Saldo de la 411  ↔  Neto por pagar a los trabajadores

Y una quinta, trimestral, que previene el pasivo más caro:

$ 5) Saldo de la 4115 y el cuadro de vacaciones pendientes por trabajador

Si la 4115 crece mes a mes y nunca baja, los trabajadores acumulan días sin gozar y cada año que pasa convierte una remuneración provisionada en tres por pagar.

# Lo que el saldo de cada cuenta debe significar al cierre
|Cuenta|Saldo correcto al cierre del mes|
|**411 (4111)**|Lo que se pagará a los trabajadores en los primeros días del mes siguiente|
|**411 (4114)**|La provisión acumulada de gratificaciones del semestre en curso|
|**411 (4115)**|El valor de los días de vacaciones ganados y no gozados|
|**415 (4151)**|La CTS devengada y no depositada del periodo en curso|
|**403, 407, 4017**|Los aportes y retenciones del mes que se pagarán en el cronograma del mes siguiente|
|**413**|La participación en utilidades devengada y no pagada|

$ Regla de oro: todo saldo de pasivo laboral debe poder explicarse con un papel de trabajo
$ que lo descomponga por trabajador. Si no se puede, el saldo está mal.

# La clasificación por función
Las cuentas del elemento 6 registran el gasto por **naturaleza**. Al cierre, ese gasto debe clasificarse por **función** para el estado de resultados: costo de producción o de ventas, gastos de venta, gastos de administración. El PCGE prevé hacerlo mediante las cuentas del elemento 9 (centros de costo) con su contrapartida en la cuenta 79, o mediante la transferencia directa a los elementos de costo.

|Trabajador|Naturaleza|Función|
|Operario de producción|621 Remuneraciones|Costo de producción|
|Vendedor|621 Remuneraciones|Gastos de venta|
|Contador|621 Remuneraciones|Gastos de administración|

La clasificación por función no es un adorno: el estado de resultados por función es el que permite saber si el margen bruto es sano, y asignar un operario a gastos de administración distorsiona el costo del producto y, con él, la decisión de precio.`,
  claves:['El gasto se reconoce por naturaleza en el elemento 6; el pasivo se reconoce por acreedor en el elemento 4.','Los tres momentos (devengo, pago al trabajador, pago de tributos y aportes) se registran en asientos separados.','Los descuentos del trabajador no generan gasto: solo trasladan el pasivo del trabajador a las instituciones.','El pago de una gratificación o un depósito de CTS no genera gasto si se provisionó mes a mes.','Todo saldo de pasivo laboral debe explicarse con un papel de trabajo que lo descomponga por trabajador.'],
  preg:[
   {p:'¿Por qué los descuentos del trabajador no generan gasto para la empresa?',
    r:'Porque ese dinero ya está dentro del gasto de remuneraciones. Cuando la empresa reconoce S/ 31,476 de gasto en la cuenta 621, ese importe es el total bruto que le corresponde al trabajador. Los descuentos —ONP, AFP, retención de quinta— no agregan costo: simplemente dividen ese pasivo bruto entre varios acreedores. Una parte se le debe al trabajador (cuenta 411) y otra a las instituciones (cuentas 403, 407, 4017). El aporte a EsSalud, en cambio, **sí** genera gasto adicional en la cuenta 627, porque es una obligación propia de la empresa que no sale del sueldo. Entender esta diferencia es lo que permite leer correctamente el costo de personal en el estado de resultados.'},
   {p:'¿Qué revela el hecho de que el pago de una gratificación genere gasto en el mes de julio?',
    r:'Revela que la empresa **no estaba provisionando**. Si las provisiones mensuales se hicieron correctamente, el gasto de las gratificaciones se reconoció un sexto por mes durante el semestre, y en julio la cuenta 4114 tiene acumulado exactamente lo que hay que pagar: el asiento del pago solo extingue ese pasivo contra la caja, sin tocar ninguna cuenta de gasto. Si en julio aparece un cargo a la cuenta 621, es porque el gasto nunca se reconoció antes, y entonces los estados de resultados de enero a junio mostraban una utilidad que no existía. Es uno de los diagnósticos más rápidos que puede hacer un contador al revisar una contabilidad ajena: mirar si hay gasto de personal anormalmente alto en julio y diciembre.'},
   {p:'¿Por qué se provisionan las vacaciones si el trabajador cobra lo mismo cuando descansa que cuando trabaja?',
    r:'Porque lo que se provisiona no es un costo adicional sino el **derecho ganado y no gozado**. Al cierre de un periodo, si un trabajador ha ganado quince días de vacaciones que todavía no ha tomado, existe una obligación presente de la empresa: tendrá que pagarle esos días sin recibir trabajo a cambio, o pagarlos en la liquidación si cesa. La NIC 19 clasifica esto como una ausencia remunerada acumulable y exige reconocerla. Cuando el trabajador finalmente goza las vacaciones, el pago se aplica contra la cuenta 4115 y no genera gasto nuevo, porque el gasto ya estaba reconocido. Y el saldo de esa cuenta es, además, el indicador que advierte el riesgo de triple remuneración.'},
   {p:'¿Por qué el pasivo laboral se registra por acreedor y no en una sola cuenta?',
    r:'Porque cada acreedor tiene un vencimiento distinto, un procedimiento de pago distinto y una consecuencia distinta si no se paga. Al trabajador se le paga en los primeros días del mes siguiente; a EsSalud y la ONP, según el cronograma de obligaciones mensuales; a la AFP, dentro de los primeros cinco días hábiles por AFPnet; la retención de quinta, con la declaración mensual. Si todo estuviera en una sola cuenta, nadie sabría cuánto se debe a quién ni cuándo vence. Y la separación tiene además un efecto de control: el saldo de cada cuenta debe coincidir con lo que se declarará en la PLAME o en AFPnet, de modo que la propia estructura de cuentas es la que hace posible la conciliación mensual.'},
   {p:'¿Por qué importa clasificar el gasto de personal por función y no solo por naturaleza?',
    r:'Porque de esa clasificación depende el margen bruto y, con él, las decisiones de precio. La remuneración de un operario de producción es costo del producto; la de un vendedor es gasto de venta; la de un contador es gasto de administración. Si el operario se registra como gasto de administración, el costo del producto queda subestimado y el margen bruto parece mejor de lo que es, lo que puede llevar a vender por debajo del costo real sin notarlo. La clasificación por naturaleza del elemento 6 sirve para el control y para la planilla; la clasificación por función es la que el estado de resultados necesita para ser útil. El PCGE permite hacer el puente con las cuentas del elemento 9 y la cuenta 79.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Al registrar el devengo de la planilla, el descuento de ONP del trabajador se registra:',
    o:['Como gasto en la cuenta 627','Como pasivo en la cuenta 4032, sin generar gasto','Como gasto en la cuenta 621 y pasivo en la 4032','No se registra hasta que se paga'],r:1,
    s:'Como **pasivo en la cuenta 4032 (ONP), sin generar gasto adicional**. El gasto completo ya se reconoció en la cuenta 621 por el importe bruto de las remuneraciones; el descuento solo divide ese pasivo entre el trabajador (cuenta 411) y la ONP (cuenta 4032).\n\nLa cuenta 627 se usa para los aportes **del empleador** —EsSalud, SCTR, seguro de vida, Senati—, que sí son gasto adicional. Y el registro no espera al pago: el devengo ocurre cuando nace la obligación, es decir con la planilla del mes.'},
   {l:1,t:'num',p:'La planilla de un mes es: remuneraciones S/ 24,000; descuentos de AFP S/ 3,120; retención de quinta S/ 650. ¿Cuál es el importe que se acredita a la cuenta 411 (remuneraciones por pagar)?',
    u:'S/',r:20230,tol:0,
    s:'$ Neto a pagar = Remuneraciones brutas − Descuentos del trabajador\n$ 24,000 − 3,120 − 650 = **S/ 20,230**\n\nEl asiento completo del devengo:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 621 | Remuneraciones (6211) | 24,000.00 | |\n| 407 | Administradoras de fondos de pensiones | | 3,120.00 |\n| 4017 | Impuesto a la renta (40173 quinta) | | 650.00 |\n| 411 | Remuneraciones por pagar (4111) | | 20,230.00 |\n\nVerificación: 24,000 = 3,120 + 650 + 20,230 ✓\n\nY por separado, el aporte del empleador a EsSalud: 24,000 × 9% = S/ 2,160, con cargo a 6271 y abono a 4031.'},
   {l:2,t:'ab',p:'Registra el asiento mensual de provisión de beneficios sociales de una empresa del régimen general con remuneración computable total de S/ 45,000 mensuales. Detalla el cálculo de cada provisión.',
    s:'**Cálculo de cada provisión:**\n\n| Provisión | Cálculo | Importe |\n|---|---|---|\n| Gratificaciones | 45,000 × 2 ÷ 12 | 7,500.00 |\n| Bonificación extraordinaria 9% | 7,500 × 9% | 675.00 |\n| CTS | (45,000 + 7,500) ÷ 12 | 4,375.00 |\n| Vacaciones (derecho ganado del mes) | 45,000 ÷ 12 | 3,750.00 |\n| **Total** | | **16,300.00** |\n\nNota sobre la CTS: la base incluye un sexto de la gratificación, y como la gratificación equivale a una remuneración, un sexto de ella es 45,000 ÷ 6 = 7,500. De ahí que la base sea 52,500 y la provisión mensual 52,500 ÷ 12 = 4,375.\n\n**Asiento:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 621 | Remuneraciones (6214 gratificaciones, incluida la bonificación) | 8,175.00 | |\n| 621 | Remuneraciones (6215 vacaciones) | 3,750.00 | |\n| 629 | Beneficios sociales de los trabajadores (6291 CTS) | 4,375.00 | |\n| 411 | Remuneraciones por pagar (4114 gratificaciones) | | 8,175.00 |\n| 411 | Remuneraciones por pagar (4115 vacaciones) | | 3,750.00 |\n| 415 | Beneficios sociales por pagar (4151 CTS) | | 4,375.00 |\n\n**Verificación:** debe 8,175 + 3,750 + 4,375 = 16,300 = haber ✓\n\n**El efecto en el estado de resultados:** el costo de personal mensual de esta empresa no es S/ 45,000 sino S/ 45,000 + 4,050 de EsSalud + 16,300 de provisiones = **S/ 65,350**. Es un 45% más de lo que muestra la planilla. Una empresa que presupuesta con los S/ 45,000 subestima su costo en más de S/ 240,000 al año.\n\n**El papel de trabajo que debe acompañar al asiento:** una tabla por trabajador con su remuneración computable, los meses acumulados del semestre, la provisión de cada beneficio y el acumulado. Sin ese papel de trabajo, el saldo del pasivo no es verificable, y al pagar la gratificación no se sabrá si la provisión alcanzó.'},
   {l:2,t:'ab',p:'Una empresa pagó la gratificación de julio por S/ 48,000 y el asiento que registró fue: debe 621 Remuneraciones S/ 48,000, haber 104 Caja y bancos S/ 48,000. Analiza qué está mal y cuál es el asiento correcto.',
    s:'**Los tres errores del asiento, en orden de gravedad:**\n\n**Error 1 — No se reconoció el pasivo provisionado.** Si la empresa provisionó mes a mes, existe un saldo acumulado en la cuenta 4114 (gratificaciones por pagar) que debió extinguirse con este pago. Cargar directamente a la cuenta 621 duplica el gasto: se reconoció un sexto cada mes y ahora se reconoce el total otra vez. El resultado del ejercicio quedaría subestimado en S/ 48,000 y el pasivo de la 4114 quedaría inflado indefinidamente.\n\n**Error 2 — No se registró la retención de quinta categoría.** La gratificación está **gravada con quinta categoría**, de modo que parte del importe no va al trabajador sino a la SUNAT. El asiento registra una salida de caja por el total bruto, lo que significa que o no se retuvo (incumplimiento de la obligación de retener) o se retuvo y no se registró el pasivo (el dinero está en la empresa sin registro, y se pagará sin respaldo contable).\n\n**Error 3 — No se registró la bonificación extraordinaria del 9%.** Si los S/ 48,000 son la gratificación, falta la bonificación de S/ 4,320 que corresponde por la Ley 30334. Si los S/ 48,000 ya la incluyen, el detalle no permite verificarlo, y eso es también un defecto.\n\n**El asiento correcto, suponiendo gratificación de S/ 48,000, bonificación de S/ 4,320 y retención de quinta de S/ 2,800:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 411 | Remuneraciones por pagar (4114 gratificaciones) | 52,320.00 | |\n| 4017 | Impuesto a la renta (40173 quinta categoría) | | 2,800.00 |\n| 411 | Remuneraciones por pagar (4111) — neto a pagar | | 49,520.00 |\n\nY luego, al pagar efectivamente al trabajador:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 411 | Remuneraciones por pagar (4111) | 49,520.00 | |\n| 104 | Cuentas corrientes | | 49,520.00 |\n\n**Verificación de que la provisión fue correcta:** antes de registrar, hay que comparar el saldo acumulado de la 4114 con los S/ 52,320 a pagar.\n\n| Situación | Significado | Acción |\n|---|---|---|\n| Saldo 4114 = 52,320 | La provisión fue exacta | El asiento solo extingue el pasivo |\n| Saldo 4114 < 52,320 | La provisión fue insuficiente | Ajustar la diferencia contra gasto del periodo y revisar el cálculo |\n| Saldo 4114 > 52,320 | Se provisionó de más | Reversar el exceso y revisar el cálculo |\n| Saldo 4114 = 0 | **No se provisionó nada** | Reconocer el gasto completo y, sobre todo, **instalar la provisión mensual desde ahora** |\n\n**El diagnóstico que este asiento permite hacer:** un cargo directo a la cuenta 621 en julio o en diciembre es la huella inconfundible de una contabilidad que no provisiona. Es lo primero que conviene mirar al revisar una contabilidad ajena, porque implica que todos los estados de resultados mensuales del año están equivocados.'},
   {l:3,t:'ab',p:'Diseña el papel de trabajo completo del cierre laboral de un mes, que permita conciliar la contabilidad con la PLAME y validar cada saldo de pasivo laboral por trabajador. Una empresa con 6 trabajadores, remuneraciones S/ 18,000.',
    s:'**El papel de trabajo tiene cuatro hojas. Esta es la estructura que resiste una fiscalización.**\n\n**HOJA 1 — Liquidación de la planilla del mes, por trabajador**\n\n| Trabajador | Básico | Asig. fam. | Total ingresos | ONP/AFP | 5ta cat. | Otros desc. | Neto | EsSalud 9% |\n|---|---|---|---|---|---|---|---|---|\n| A | 4,000 | 123 | 4,123 | 536 | 118 | — | 3,469 | 371.07 |\n| B | 3,500 | — | 3,500 | 455 | 42 | — | 3,003 | 315.00 |\n| C | 3,000 | 123 | 3,123 | 406 | 35 | — | 2,682 | 281.07 |\n| D | 2,500 | — | 2,500 | 325 | — | — | 2,175 | 225.00 |\n| E | 2,500 | 123 | 2,623 | 341 | — | 200 | 2,082 | 236.07 |\n| F | 2,000 | 131 | 2,131 | 277 | — | — | 1,854 | 191.79 |\n| **Totales** | **17,500** | **500** | **18,000** | **2,340** | **195** | **200** | **15,265** | **1,620.00** |\n\nNota: el trabajador F percibe S/ 2,000 más asignación; verificar que ningún trabajador esté por debajo de la RMV de S/ 1,230 y que la base de EsSalud respete ese mínimo.\n\n**HOJA 2 — Conciliación contabilidad contra PLAME**\n\n| Concepto | Contabilidad | PLAME | Diferencia | Explicación |\n|---|---|---|---|---|\n| Total de remuneraciones (cuenta 621) | 18,000.00 | 18,000.00 | 0 | — |\n| Aporte EsSalud (6271 / 4031) | 1,620.00 | 1,620.00 | 0 | — |\n| Aporte ONP (4032) | 2,340.00 | 2,340.00 | 0 | — |\n| Retención de quinta (40173) | 195.00 | 195.00 | 0 | — |\n| Número de trabajadores declarados | 6 | 6 | 0 | Cruzar con el T-Registro |\n\n**Toda diferencia debe explicarse o corregirse antes de declarar.** Las causas habituales: un trabajador dado de alta y no incluido, una base de EsSalud por debajo de la RMV, un concepto no remunerativo declarado como remunerativo o al revés.\n\n**HOJA 3 — Validación de los saldos de pasivo laboral al cierre**\n\n| Cuenta | Saldo contable | Composición verificada | ¿Cuadra? |\n|---|---|---|---|\n| 4111 Sueldos por pagar | 15,265.00 | Suma de los netos de la Hoja 1 | Sí |\n| 4032 ONP por pagar | 2,340.00 | Suma de descuentos ONP del mes | Sí |\n| 407 AFP por pagar | 0.00 | Ningún trabajador en AFP este mes | Sí |\n| 40173 Quinta categoría | 195.00 | Suma de retenciones del mes | Sí |\n| 4031 EsSalud por pagar | 1,620.00 | 9% de la base, con mínimo RMV verificado | Sí |\n| 4114 Gratificaciones | según acumulado | Provisión × meses del semestre, por trabajador | Verificar |\n| 4115 Vacaciones | según acumulado | Días ganados no gozados × valor diario, por trabajador | Verificar |\n| 4151 CTS | según acumulado | Provisión × meses del periodo, por trabajador | Verificar |\n\n**HOJA 4 — Control de vacaciones por trabajador (revisión trimestral)**\n\n| Trabajador | Fecha de ingreso | Días ganados | Días gozados | Pendientes | Fecha límite de goce | Riesgo |\n|---|---|---|---|---|---|---|\n| A | 01/03/2023 | 90 | 60 | 30 | 28/02/2027 | **Alto: periodo 2023 vence pronto** |\n| B | 15/07/2024 | 60 | 30 | 30 | 14/07/2027 | Medio |\n| C | 01/01/2025 | 30 | 0 | 30 | 31/12/2027 | Medio |\n| ... | | | | | | |\n\n**Cuantificación del riesgo de triple remuneración:** por cada periodo vacacional que venza sin gozarse, el costo pasa de una a tres remuneraciones. Para el trabajador A, con remuneración de S/ 4,123, serían S/ 12,369 en lugar de S/ 4,123.\n\n**Las cinco verificaciones finales del cierre laboral, que se firman:**\n\n1. ¿La suma de la cuenta 621 del mes coincide con el total de la PLAME? \n2. ¿Todos los trabajadores de la planilla están en el T-Registro con el régimen correcto?\n3. ¿La base de EsSalud de cada trabajador respeta el mínimo de una RMV?\n4. ¿Las retenciones y aportes del mes anterior se pagaron íntegramente, dejando las cuentas 403, 407 y 4017 en cero?\n5. ¿Se registró la provisión mensual de los cuatro beneficios?\n\n**Por qué este papel de trabajo vale lo que cuesta hacerlo:** replica exactamente los cruces que hacen SUNAT y SUNAFIL. Una empresa que lo elabora cada mes no recibe cartas inductivas por inconsistencias de planilla, puede responder un requerimiento en horas en lugar de semanas, y tiene el pasivo laboral cuantificado y verificable. Toma alrededor de una hora al mes y es, en relación esfuerzo-riesgo evitado, probablemente el mejor control de toda la contabilidad.'}
  ],
  proy:{
   t:'Registro contable completo de la planilla de tu empresa',
   ctx:`Vas a llevar la planilla que liquidaste en el subtema 6.2 hasta el Libro Diario, el Mayor y los estados financieros, con sus provisiones y su papel de trabajo. Es el puente entre lo laboral y lo contable.`,
   pasos:[
    'Registra en el Libro Diario de tu empresa el devengo de la planilla del mes, con el asiento desagregado por cuenta y divisionaria del PCGE 2019.',
    'Registra por separado el asiento de los aportes del empleador.',
    'Registra el pago a los trabajadores y, en un asiento distinto, el pago de tributos y aportes del mes siguiente.',
    'Calcula y registra el asiento mensual de provisión de los cuatro beneficios: gratificaciones con su bonificación, CTS y vacaciones.',
    'Simula el pago de una gratificación y verifica que el asiento extinga el pasivo provisionado sin generar gasto nuevo. Si no cuadra, ajusta el cálculo de la provisión y explica la diferencia.',
    'Actualiza el Libro Mayor y verifica que el saldo de cada cuenta de pasivo laboral corresponda exactamente a una obligación identificable.',
    'Clasifica el gasto de personal por función: costo de producción o ventas, gastos de venta y gastos de administración, según el puesto de cada trabajador.',
    'Elabora el papel de trabajo de cuatro hojas del cierre laboral del mes y firma las cinco verificaciones finales.'
   ],
   entrega:[
    'Los asientos de devengo, aportes, pagos y provisiones registrados en el Diario.',
    'El Libro Mayor actualizado con la validación de cada saldo de pasivo laboral.',
    'La clasificación del gasto de personal por función.',
    'El papel de trabajo de cuatro hojas del cierre laboral.'
   ],
   crit:[
    'Los tres momentos están en asientos separados, no consolidados en uno.',
    'El pago de la gratificación extingue el pasivo provisionado sin cargar gasto.',
    'Cada saldo de pasivo laboral está descompuesto por trabajador en el papel de trabajo.'
   ],
   pista:'Si al simular el pago de la gratificación el pasivo provisionado no alcanza, lo más probable es que hayas omitido la bonificación extraordinaria del 9% en la provisión. Es el componente que más se olvida.'
  },
  proyInt:{
   t:'Estados financieros completos con el ciclo laboral integrado',
   integra:'1.1 a 6.5',
   ctx:`Es el cierre contable más completo que habrás hecho: operaciones, tributos, planilla, provisiones y beneficios, todo en un solo juego de estados financieros que debe cuadrar y poder sustentarse ante una fiscalización.`,
   pasos:[
    'Consolida en el Libro Diario de tu empresa todos los asientos de los Módulos 1 a 6: operaciones, IGV, renta, planilla, aportes y provisiones de beneficios.',
    'Elabora el Libro Mayor completo y el balance de comprobación, verificando que los débitos igualen los créditos.',
    'Elabora la hoja de trabajo con las columnas de balance de comprobación, ajustes, saldos ajustados, estado de resultados y estado de situación financiera.',
    'Prepara los cuatro estados financieros: situación financiera, resultados (por naturaleza y por función), cambios en el patrimonio neto y flujos de efectivo.',
    'En el estado de flujos de efectivo, verifica el tratamiento de los pagos de planilla, aportes y beneficios como flujos de actividades de operación.',
    'Recalcula el Impuesto a la Renta anual con la determinación completa: adiciones, deducciones y la verificación del requisito de pago previo del inciso v) del artículo 37 para las rentas de quinta.',
    'Elabora las notas a los estados financieros correspondientes a beneficios a los trabajadores y a tributos, con la composición de cada pasivo.',
    'Prepara el informe de revisión analítica: compara el gasto de personal con las ventas, con el total de gastos y con el periodo anterior, y explica las variaciones.',
    'Actualiza el expediente tributario integral del subtema 5.6 con la sección laboral completa.'
   ],
   entrega:[
    'El balance de comprobación y la hoja de trabajo del ejercicio completo.',
    'Los cuatro estados financieros con sus notas de beneficios a los trabajadores y tributos.',
    'El recálculo del Impuesto a la Renta con la verificación del pago previo.',
    'El informe de revisión analítica y el expediente integral actualizado.'
   ],
   crit:[
    'El balance de comprobación cuadra y la hoja de trabajo traslada correctamente a los dos estados.',
    'El pasivo laboral del estado de situación financiera está descompuesto en las notas y es verificable por trabajador.',
    'El informe analítico explica cada variación relevante del gasto de personal, no solo la reporta.'
   ],
   pista:'En el informe analítico, el indicador más revelador es el gasto de personal dividido entre las ventas. Compáralo entre meses: si sube sin que suban las ventas, hay un problema de productividad o de dimensionamiento que la contabilidad debe señalar antes que nadie.'
  },
  fuentes:[
   {a:'Plan Contable General Empresarial (PCGE) 2019', o:'Elementos 4 y 6', n:'cuentas 40, 41, 62 y sus divisionarias para remuneraciones, aportes y beneficios sociales'},
   {a:'NIC 19', o:'Beneficios a los empleados', n:'reconocimiento de beneficios a corto plazo y de ausencias remuneradas acumulables'},
   {a:'NIC 1', o:'Presentación de estados financieros', n:'clasificación del pasivo entre corriente y no corriente y presentación de gastos por naturaleza y por función'},
   {a:'Víctor Ferrer Quea', o:'Estados financieros: análisis e interpretación por sectores económicos', n:'registro de la planilla, provisiones de beneficios y presentación del pasivo laboral'},
   {a:'Mario Apaza Meza', o:'PCGE y NIIF aplicadas a sectores económicos', n:'dinámica de las cuentas 41 y 62 y clasificación del gasto por función'}
  ]
 },
 {
  id:'m6t6', titulo:'T-Registro, PLAME, AFPnet y el cierre laboral del mes', min:25,
  cont:`La **Planilla Electrónica** es el sistema con el que el Estado conoce todo lo que ocurre en la relación laboral. Tiene dos componentes que se complementan y que no deben confundirse:

$ PLANILLA ELECTRÓNICA = T-REGISTRO (quiénes son) + PLAME (cuánto se les pagó)

|Componente|Qué es|Cuándo se usa|
|**T-Registro**|Registro de **información** del empleador, los trabajadores y otros sujetos|Cuando alguien **entra, sale o cambia** de condición|
|**PLAME**|**Declaración mensual** de lo pagado, retenido y aportado|**Todos los meses**, según el cronograma|

# El T-Registro: a quién se registra
No solo trabajadores. El T-Registro comprende seis tipos de sujetos:

|Sujeto|Quién es|
|**Trabajador**|Persona con vínculo laboral, de cualquier régimen|
|**Pensionista**|A cargo del empleador|
|**Prestador de servicios de cuarta categoría**|Quien emite recibo por honorarios y al que se le aplica retención o se declara el pago|
|**Personal en formación**|Modalidades formativas laborales: prácticas preprofesionales y profesionales, capacitación laboral juvenil|
|**Personal de terceros**|Trabajadores de otra empresa destacados a la nuestra, cuyo SCTR asumimos|
|**Derechohabientes**|Cónyuge o concubino, hijos menores, hijos mayores incapacitados y la madre gestante de hijo extramatrimonial|

! Los **derechohabientes** se registran para que accedan a las prestaciones de EsSalud. No registrarlos no genera multa directa, pero deja al trabajador sin cobertura familiar, y cuando la familia necesita atención y descubre que no está inscrita, el conflicto laboral está servido. Es una de las omisiones más comunes y más fáciles de corregir.

# Los plazos del T-Registro: los más cortos de todo el sistema
|Acto|Plazo|
|**Alta del trabajador**|El **día de inicio de labores**, dentro de ese mismo día|
|**Baja del trabajador**|Dentro del **primer día hábil siguiente** al término de la relación|
|**Modificación o actualización de datos**|Dentro de los **primeros 5 días hábiles del mes siguiente** al que ocurrió el hecho, con plazos especiales para ciertos datos|
|**Alta de derechohabientes**|Dentro de los plazos que fija la norma, desde que se produce el hecho que genera el derecho|

$ El alta del trabajador es el único trámite laboral que NO admite demora de un día:
$ debe estar registrado ANTES o EL MISMO DÍA en que empieza a trabajar

> Un trabajador que labora sin estar en el T-Registro configura la infracción laboral que SUNAFIL considera **muy grave**: no registrar a un trabajador en la planilla. Si además ocurre un accidente de trabajo mientras está no registrado, las consecuencias se multiplican, porque el trabajador no tiene cobertura de EsSalud ni de SCTR y la empresa responde directamente. Es, con diferencia, el riesgo laboral más alto que puede asumir una empresa.

# La PLAME: la declaración mensual
Se presenta mediante el **PDT 601** o **Declara Fácil 601**, según corresponda, y comprende:

|Bloque|Qué se declara|
|**Remuneraciones**|Por trabajador, con cada concepto en su código correspondiente|
|**Retención de quinta categoría**|Lo retenido a cada trabajador|
|**Aportes a EsSalud**|Con verificación de la base mínima de una RMV|
|**Aportes a la ONP**|Descuentos del Sistema Nacional de Pensiones|
|**SCTR salud**|Cuando se contrata con EsSalud|
|**EsSalud Vida**|Si se contrató|
|**Rentas de cuarta categoría**|Pagos a prestadores de servicios y sus retenciones|
|**Contribución a Essalud por personal de terceros**|Cuando corresponde|

$ Plazo: según el CRONOGRAMA DE OBLIGACIONES MENSUALES de SUNAT,
$ que depende del último dígito del RUC

! Los aportes a las **AFP no se declaran en la PLAME**: se declaran y pagan por **AFPnet**, una plataforma distinta, con un plazo distinto. Confundirlo es la causa más común de mora en aportes previsionales privados.

# AFPnet: la plataforma de las AFP
|Aspecto|Regla|
|**Qué se declara**|El aporte obligatorio de cada afiliado: 10% al fondo, comisión y prima de seguro|
|**Plazo**|Dentro de los primeros **5 días hábiles** del mes siguiente|
|**Consecuencia de la mora**|Intereses moratorios del SPP y, si no se paga, la AFP puede iniciar cobranza. Además, si se retuvo y no se pagó, la empresa es responsable exclusiva|
|**Declaración sin pago**|Posible, pero genera la obligación exigible y los intereses|

> Los cinco días hábiles de AFPnet casi nunca coinciden con el vencimiento de la PLAME. Una empresa que paga todo "cuando vence la PLAME" está en mora con las AFP casi todos los meses. Es un error silencioso, porque la mora no genera una notificación inmediata, pero se acumula.

# Otras obligaciones de registro que suelen olvidarse
|Obligación|Norma|Detalle|
|**Boletas de pago**|D.S. 001-98-TR|Se entregan al trabajador; pueden ser físicas o electrónicas. Deben conservarse, junto con las constancias de pago, por **cinco años** después de efectuado el pago|
|**Registro de control de asistencia**|D.S. 004-2006-TR|Obligatorio. Se exceptúa al personal de **dirección**, a los **no sujetos a fiscalización inmediata** y a los que prestan servicios **intermitentes de espera**. Debe permitir verificar el ingreso, la salida y el refrigerio|
|**Registros de seguridad y salud en el trabajo**|Ley 29783|Registro de accidentes, de incidentes peligrosos, de enfermedades ocupacionales, de exámenes médicos, de capacitaciones y de equipos de seguridad entregados|
|**Reglamento interno de trabajo**|D.S. 039-91-TR|Obligatorio para empleadores con **más de 100 trabajadores**. Se presenta al MTPE|
|**Contratos sujetos a modalidad**|D.S. 003-97-TR|Deben constar **por escrito** y registrarse según las reglas aplicables|

! El **registro de control de asistencia** es la prueba de la jornada. En un proceso por horas extras no pagadas, si el empleador no exhibe el registro, la jornada que afirme el trabajador se tiene por cierta. Es decir, no llevarlo no protege a la empresa: la deja sin defensa.

# El cierre laboral del mes: la lista de verificación
|Nº|Verificación|Por qué|
|1|Todos los **ingresos y ceses** del mes están registrados en el T-Registro, dentro de plazo|Infracción muy grave si falta un trabajador|
|2|La **planilla del mes** está liquidada y cada concepto está clasificado en su naturaleza correcta|Evita el pasivo por recalificación|
|3|La **base de EsSalud** de cada trabajador respeta el mínimo de una RMV|Cruce automático de SUNAT|
|4|Las **retenciones de quinta** están calculadas con el divisor del mes y el acumulado verificado|Evita el ajuste abrupto de diciembre|
|5|La **PLAME** cuadra con la cuenta 62 y con los pasivos de las cuentas 403 y 4017|Es el cruce que replica SUNAT|
|6|**AFPnet** declarado y pagado dentro de los 5 días hábiles|Evita la mora silenciosa|
|7|Los aportes y retenciones del mes anterior están **pagados**, con las cuentas 403, 407 y 4017 en cero|Una retención impaga es la peor contingencia|
|8|La **provisión mensual** de los cuatro beneficios está registrada|Sin ella, el resultado del mes es falso|
|9|Las **boletas de pago** están emitidas y entregadas|Obligación formal con sanción|
|10|El **registro de control de asistencia** está completo y conservado|Es la prueba de la jornada|

Diez verificaciones. Una hora al mes. Previenen prácticamente todas las infracciones laborales y tributarias de planilla que se sancionan en el Perú.

# El calendario laboral del mes
$ Días 1 a 5 hábiles: declarar y pagar AFPnet del mes anterior
$ Según cronograma SUNAT: presentar la PLAME y pagar EsSalud, ONP y retención de quinta
$ Dentro de los 5 primeros días hábiles: actualizaciones del T-Registro del mes anterior
$ El mismo día del ingreso: alta de cualquier trabajador nuevo (no espera al cierre)
$ Antes del cierre contable: provisión mensual de beneficios y papel de trabajo

# Lo que cruzan SUNAT y SUNAFIL
|Quién|Qué cruza|Qué detecta|
|**SUNAT**|PLAME contra la contabilidad|Gasto de personal mayor que lo declarado|
|**SUNAT**|PLAME contra la declaración anual de renta|Gasto de personal inconsistente|
|**SUNAT**|T-Registro contra PLAME|Trabajadores registrados y no declarados, o al revés|
|**SUNAT**|Retenciones declaradas contra pagadas|La infracción del numeral 4 del artículo 178|
|**SUNAT**|Base de EsSalud contra la RMV|Aportes calculados por debajo del mínimo|
|**SUNAFIL**|T-Registro contra la realidad del centro de trabajo|Trabajadores no registrados: infracción muy grave|
|**SUNAFIL**|Boletas contra el registro de asistencia|Horas extras no pagadas|
|**SUNAFIL**|Depósitos de CTS y pagos de gratificación|Beneficios no pagados|

$ Conclusión práctica: todo lo que el contador puede verificar en una hora,
$ el Estado lo verifica automáticamente. La única diferencia es el momento
$ y el costo de descubrirlo.`,
  claves:['Planilla Electrónica = T-Registro (quiénes son) + PLAME (cuánto se les pagó).','El alta del trabajador en el T-Registro debe hacerse el mismo día en que inicia labores: es el único plazo que no admite demora.','Los aportes a las AFP no van en la PLAME: se declaran por AFPnet dentro de los primeros 5 días hábiles.','El registro de control de asistencia es la prueba de la jornada: no llevarlo deja a la empresa sin defensa ante un reclamo de horas extras.','Diez verificaciones al mes previenen prácticamente todas las infracciones de planilla que se sancionan.'],
  preg:[
   {p:'¿Por qué el alta en el T-Registro no admite ni un día de demora?',
    r:'Porque un trabajador que labora sin estar registrado está, para todos los efectos, fuera de la planilla, y eso configura la infracción que SUNAFIL considera **muy grave**. La razón de fondo es la protección: sin registro, el trabajador no tiene cobertura de EsSalud ni de SCTR, de modo que si sufre un accidente ese mismo día, no tiene seguro y la empresa responde directamente por la atención, por la incapacidad y, en el peor caso, por la invalidez o el fallecimiento. El plazo es el día de inicio de labores precisamente porque el riesgo empieza ese día. En la práctica, esto significa que el alta se tramita antes de que el trabajador cruce la puerta, no al cierre de la semana.'},
   {p:'¿Cuál es la diferencia entre el T-Registro y la PLAME, y por qué se confunden?',
    r:'El T-Registro contiene **información**: quién es el empleador, quiénes son sus trabajadores, pensionistas, prestadores de cuarta, personal en formación, personal de terceros y derechohabientes, con sus datos y su situación. Se actualiza cuando alguien **entra, sale o cambia** de condición. La PLAME es la **declaración mensual** de lo que se pagó, retuvo y aportó en el mes. Se confunden porque ambos forman la Planilla Electrónica y se gestionan desde el entorno de SUNAT, pero sus plazos y su contenido son distintos: el T-Registro tiene plazos por evento, la PLAME tiene un plazo mensual según cronograma. Y la PLAME solo puede declarar a quien ya está en el T-Registro, de modo que un alta omitida bloquea la declaración correcta del mes.'},
   {p:'¿Por qué una empresa puede estar en mora con las AFP casi todos los meses sin darse cuenta?',
    r:'Porque los aportes a las AFP **no se declaran en la PLAME**: van por **AFPnet**, con un plazo de cinco días hábiles del mes siguiente, que normalmente vence **antes** que el de la PLAME según el cronograma de SUNAT. Una empresa que paga todas sus obligaciones laborales "cuando vence la PLAME" paga las AFP con retraso cada mes. Y la mora es silenciosa: no llega una notificación inmediata, solo se acumulan intereses del SPP que aparecen más tarde. El agravante es que si se retuvo el aporte del trabajador y no se pagó, la empresa es **responsable exclusiva**, con las consecuencias más severas del sistema. El control es simple: separar en el calendario el vencimiento de AFPnet del vencimiento de la PLAME.'},
   {p:'¿Por qué no llevar el registro de control de asistencia perjudica a la empresa en lugar de protegerla?',
    r:'Porque en materia laboral el empleador tiene la carga de probar el cumplimiento de sus obligaciones, y el registro de asistencia es precisamente la prueba de la jornada. Si un trabajador reclama horas extras no pagadas y la empresa no puede exhibir el registro, la jornada que el trabajador afirme se tiene por cierta y la empresa pierde el reclamo. Algunos empleadores creen que no llevar registro impide que se prueben las horas extras; el efecto es exactamente el contrario. El registro se exceptúa solo para el personal de dirección, los no sujetos a fiscalización inmediata y los que prestan servicios intermitentes de espera, y esas excepciones también deben poder sustentarse.'},
   {p:'¿Qué significa que "todo lo que el contador puede verificar en una hora, el Estado lo verifica automáticamente"?',
    r:'Significa que los cruces de información ya no requieren una inspección presencial. SUNAT compara automáticamente la PLAME con la contabilidad, con el T-Registro, con la declaración anual de renta y con las retenciones pagadas; SUNAFIL compara el T-Registro con la realidad del centro de trabajo, las boletas con el registro de asistencia y los depósitos de CTS con las planillas. Son exactamente los mismos cruces que la lista de verificación mensual propone. La diferencia no está en qué se revisa sino en **cuándo** y a **qué costo**: si el contador encuentra la inconsistencia, la corrige con una rectificatoria y una multa rebajada al 5%; si la encuentra SUNAT, llega con una resolución, la multa completa y los intereses de los años transcurridos.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un trabajador inicia labores el lunes 10. ¿Cuándo debe registrarse su alta en el T-Registro?',
    o:['Dentro de los 5 primeros días hábiles del mes siguiente','El mismo lunes 10, día de inicio de labores','Antes de presentar la PLAME del mes','Dentro del primer día hábil siguiente'],r:1,
    s:'El **mismo lunes 10**, día de inicio de labores. Es el único plazo laboral que no admite ni un día de demora, y la razón es la protección del trabajador: sin registro no tiene cobertura de EsSalud ni de SCTR, de modo que un accidente ese mismo día dejaría a la empresa respondiendo directamente por la atención y sus consecuencias.\n\nLos cinco días hábiles del mes siguiente corresponden a las **modificaciones** de datos, y el primer día hábil siguiente corresponde a la **baja**. Un trabajador laborando sin alta configura la infracción que SUNAFIL califica como muy grave.'},
   {l:1,t:'mc',p:'¿Dónde se declaran y pagan los aportes de los trabajadores afiliados a una AFP?',
    o:['En la PLAME, junto con EsSalud y ONP','En AFPnet, dentro de los primeros 5 días hábiles del mes siguiente','Directamente en la agencia de la AFP','En el T-Registro'],r:1,
    s:'En **AFPnet**, dentro de los primeros **5 días hábiles** del mes siguiente. Es una plataforma distinta de la PLAME y con un plazo distinto, que normalmente vence antes.\n\nEste es el origen de la mora más frecuente y más silenciosa en obligaciones laborales: la empresa paga todo "cuando vence la PLAME" y está con retraso en las AFP mes a mes, acumulando intereses del SPP sin recibir ninguna notificación. El control es tan simple como anotar los dos vencimientos por separado en el calendario del mes.'},
   {l:2,t:'ab',p:'Una empresa contrató a 3 trabajadores el 2 de marzo y los registró en el T-Registro el 8 de abril, al preparar la PLAME. Analiza las consecuencias.',
    s:'**La infracción configurada.** El alta debe registrarse el día de inicio de labores. Los tres trabajadores laboraron desde el 2 de marzo y recién fueron registrados el 8 de abril: **37 días sin registro**. Esto configura la infracción de no registrar a trabajadores en la planilla, que el reglamento de la Ley General de Inspección del Trabajo califica como **muy grave**.\n\n**Las consecuencias, por frente:**\n\n| Frente | Consecuencia |\n|---|---|\n| **SUNAFIL** | Infracción muy grave, con multa calculada en UIT según el tamaño de la empresa y el número de trabajadores afectados. Con 3 afectados, el monto escala respecto de un solo caso |\n| **Cobertura de salud** | Durante 37 días los trabajadores no tuvieron cobertura de EsSalud. Si alguno requirió atención médica, la empresa responde por el costo |\n| **SCTR** | Si la actividad es de riesgo, tampoco tuvieron SCTR. Un accidente en ese periodo deja a la empresa respondiendo directamente por la atención, la incapacidad temporal y la eventual invalidez |\n| **Aportes** | Los aportes de marzo deben declararse y pagarse igual, con los intereses correspondientes si hay mora |\n| **Derechohabientes** | Las familias de los tres trabajadores tampoco tuvieron cobertura durante ese periodo |\n\n**El riesgo que no se ve y es el mayor:** si durante esos 37 días uno de los tres trabajadores hubiera sufrido un accidente de trabajo con consecuencias graves, el costo para la empresa no sería una multa: sería la atención médica completa, la indemnización y, potencialmente, una responsabilidad que excede largamente el ámbito laboral. La multa es el menor de los problemas de un trabajador no registrado.\n\n**Lo que correspondía hacer, y lo que corresponde hacer ahora:**\n\n| Momento | Acción |\n|---|---|\n| El 2 de marzo | Registrar el alta de los tres antes de que iniciaran labores |\n| Al detectar la omisión | Registrar de inmediato, sin esperar la PLAME |\n| Al preparar la PLAME de marzo | Declarar a los tres por el mes completo de marzo y pagar los aportes con sus intereses |\n| Para el futuro | Instalar el control que lo previene |\n\n**El control preventivo, que es el aprendizaje:** el alta en el T-Registro debe ser un paso **obligatorio del proceso de contratación**, no una tarea del área contable al cierre del mes. La secuencia correcta es: se firma el contrato, se registra el alta en el T-Registro, se entrega el equipo de protección si corresponde, y recién entonces el trabajador ingresa al puesto. Formalizar esa secuencia en el procedimiento de contratación, con una casilla de verificación que debe firmarse, cuesta nada y elimina la infracción laboral más grave que existe.\n\n**Y la observación de fondo:** el error aquí no fue del contador, fue del proceso. Si el área contable se enteró de las tres contrataciones el 8 de abril, el problema es de comunicación interna. La solución es que nadie pueda ingresar a trabajar sin que el responsable de planilla lo sepa el mismo día.'},
   {l:2,t:'ab',p:'Diseña el calendario laboral mensual completo de una empresa con RUC terminado en 5, con trabajadores en ONP y en AFP, y señala el responsable y el control de cada tarea.',
    s:'**Calendario laboral mensual, en orden cronológico**\n\n| Momento | Tarea | Responsable | Control que la verifica |\n|---|---|---|---|\n| **Cualquier día, el mismo día del hecho** | Alta en el T-Registro de todo trabajador que ingresa | Encargado de planilla | Casilla firmada en el expediente de contratación, antes del ingreso al puesto |\n| **Primer día hábil siguiente al cese** | Baja en el T-Registro | Encargado de planilla | Lista de ceses del mes con fecha de registro |\n| **Días 1 a 3 del mes** | Liquidación de la planilla del mes anterior y emisión de boletas | Encargado de planilla | Papel de trabajo de cuatro hojas del cierre laboral |\n| **Días 1 a 5 hábiles** | **Declaración y pago de AFPnet** del mes anterior | Encargado de planilla | Constancia de pago archivada; saldo de la cuenta 407 en cero |\n| **Primeros 5 días hábiles** | Actualizaciones y modificaciones del T-Registro del mes anterior | Encargado de planilla | Lista de cambios con fecha de registro |\n| **Antes del vencimiento** | Conciliación PLAME contra contabilidad (cuenta 62, cuentas 403 y 4017) | Contador | Hoja 2 del papel de trabajo, con diferencias en cero o explicadas |\n| **Según cronograma SUNAT** (RUC terminado en 5) | **Presentación de la PLAME** y pago de EsSalud, ONP y retención de quinta | Contador | Constancia de presentación y de pago; saldos de 4031, 4032 y 40173 en cero |\n| **Antes del cierre contable del mes** | Registro de la provisión mensual de los cuatro beneficios | Contador | Asiento registrado con su papel de trabajo por trabajador |\n| **Antes del cierre contable** | Verificación de la base mínima de EsSalud de cada trabajador | Contador | Hoja 1 del papel de trabajo, columna de verificación RMV |\n| **Cierre del mes** | Firma de las diez verificaciones del cierre laboral | Contador | Lista firmada y archivada |\n| **Permanente** | Registro de control de asistencia completo | Jefe de área | Revisión semanal de registros incompletos |\n| **Trimestral** | Revisión del cuadro de vacaciones y programación del goce | Contador y gerencia | Hoja 4 del papel de trabajo; alerta de periodos próximos a vencer |\n\n**Nota sobre el cronograma de SUNAT:** el vencimiento de la PLAME depende del **último dígito del RUC** y de la tabla que SUNAT publica cada año. Para un RUC terminado en 5, el vencimiento se ubica en la parte intermedia del cronograma. **Hay que consultar la tabla del ejercicio**: cambia cada año y no debe estimarse de memoria.\n\n**El punto crítico del calendario, que hay que subrayar:** los **cinco días hábiles de AFPnet** vencen antes que la PLAME. Son dos vencimientos distintos, en dos plataformas distintas, y tratarlos como uno es la causa de la mora previsional más frecuente.\n\n**Las tres alertas que deben estar configuradas:**\n\n| Alerta | Cuándo | A quién |\n|---|---|---|\n| Vencimiento de AFPnet | 2 días antes | Encargado de planilla y contador |\n| Vencimiento de la PLAME | 3 días antes | Contador |\n| Periodo vacacional próximo a vencer | 90 días antes del límite de goce | Contador y gerencia |\n\n**Y la verificación de cierre de mes que resume todo:** después de pagar, los saldos de las cuentas **403, 407 y 4017** correspondientes al mes declarado deben quedar en **cero**. Si queda saldo, algo no se pagó, y si lo que no se pagó es una retención, la contingencia es de las graves. Esa única revisión, de treinta segundos, es el mejor control del cierre laboral.'},
   {l:3,t:'ab',p:'Te contratan para revisar el cumplimiento laboral de una empresa con 22 trabajadores que nunca ha sido inspeccionada. Diseña el programa de revisión completo, con los papeles de trabajo y el informe final.',
    s:'**El encargo es una auditoría de cumplimiento laboral. Esta es la estructura que un profesional debe seguir.**\n\n**FASE 1 — Planificación y relevamiento (2 días)**\n\n| Documento a solicitar | Para qué |\n|---|---|\n| Ficha RUC y constancia de inscripción en el REMYPE | Determinar el régimen laboral aplicable |\n| Estados financieros y declaraciones de renta de los últimos ejercicios | Verificar el nivel de ventas frente a los límites de la categoría |\n| Estructura societaria y de empresas vinculadas | Detectar grupo económico que excluya del régimen especial |\n| T-Registro completo | Contrastar con la realidad del centro de trabajo |\n| PLAME de los últimos 24 meses | Base del análisis de aportes y retenciones |\n| Contratos de trabajo de los 22 trabajadores | Verificar modalidad, escrituración y registro |\n| Boletas de pago de una muestra de meses | Verificar conceptos y su clasificación |\n| Constancias de depósito de CTS | Verificar cumplimiento y monto |\n| Registro de control de asistencia | Verificar jornada y horas extras |\n| Documentación de seguridad y salud en el trabajo | Verificar el sistema de gestión |\n\n**FASE 2 — Pruebas de cumplimiento (5 días)**\n\n**Prueba 1 — Régimen laboral aplicable**\n\n| Verificación | Resultado posible |\n|---|---|\n| ¿Inscripción en el REMYPE vigente? | Si no: todos los trabajadores están en régimen general |\n| ¿Ventas dentro del límite de la categoría declarada en los dos últimos ejercicios? | Si no: corresponde el tránsito de régimen |\n| ¿Grupo económico o vinculación que excluya? | Si sí: régimen general y contingencia por recalificación |\n| ¿Trabajadores que vienen del régimen general? | Conservan sus derechos: no pueden ser reducidos |\n\n**Prueba 2 — Integridad del T-Registro (prueba de dos direcciones)**\n\n| Dirección | Procedimiento |\n|---|---|\n| Del registro a la realidad | Tomar la lista del T-Registro y verificar que cada persona exista y trabaje |\n| **De la realidad al registro** | **Recorrer el centro de trabajo, contar las personas que laboran y verificar que cada una esté registrada** |\n\nLa segunda dirección es la que detecta trabajadores no registrados, que es la infracción muy grave. Es también la que hace SUNAFIL en una visita inspectiva, y la que casi nadie se hace a sí mismo.\n\n**Prueba 3 — Clasificación de conceptos remunerativos**\n\nTomar todos los conceptos que aparecen en las boletas y clasificarlos con los tres elementos de la definición legal. Para cada concepto declarado no remunerativo, verificar que cumpla su condición y que esté sustentado. Cuantificar el efecto en las seis bases de cualquier concepto mal clasificado.\n\n**Prueba 4 — Recálculo independiente de beneficios**\n\nPara una muestra de 5 trabajadores, recalcular desde cero: gratificaciones con bonificación, CTS con el sexto de gratificación en la base, vacaciones y retención de quinta. Comparar con lo pagado y cuantificar las diferencias; extrapolar al universo si la muestra revela un error sistemático.\n\n**Prueba 5 — Jornada y horas extras**\n\nCruzar el registro de asistencia con las boletas: si hay horas trabajadas por encima de la jornada que no aparecen pagadas con sobretasa, hay un pasivo. Si no hay registro de asistencia, hay dos problemas: la infracción por no llevarlo y la ausencia de defensa frente a cualquier reclamo.\n\n**Prueba 6 — Aportes y retenciones**\n\nConciliar, mes a mes de los últimos 24: PLAME contra contabilidad, retenciones declaradas contra pagadas, base de EsSalud contra la RMV, y AFPnet contra los descuentos de las boletas. **La verificación crítica: ¿hay retenciones efectuadas y no pagadas?** Es la contingencia más grave y la de prescripción más larga.\n\n**Prueba 7 — Vacaciones acumuladas**\n\nConstruir el cuadro por trabajador y cuantificar el riesgo de triple remuneración por cada periodo vencido o próximo a vencer. Con 22 trabajadores, este suele ser el pasivo más grande y el menos conocido.\n\n**Prueba 8 — Seguridad y salud en el trabajo**\n\nCon 22 trabajadores corresponde verificar la existencia de supervisor o comité según el umbral de la Ley 29783, la identificación de peligros y evaluación de riesgos, los exámenes médicos ocupacionales, las capacitaciones, la entrega de equipos de protección con cargo firmado y los registros obligatorios. Verificar también el SCTR si la actividad es de riesgo.\n\n**Prueba 9 — Obligaciones formales**\n\nBoletas emitidas y conservadas, contratos sujetos a modalidad por escrito, reglamento interno si corresponde por número de trabajadores, y conservación de la documentación por el plazo de ley.\n\n**FASE 3 — Cuantificación (2 días)**\n\nMatriz de hallazgos, que es el corazón del informe:\n\n| Nº | Hallazgo | Norma infringida | Trabajadores afectados | Periodos | Pasivo laboral estimado | Multa potencial | Prioridad |\n|---|---|---|---|---|---|---|---|\n| 1 | | | | | | | |\n\nY la clasificación en tres grupos de acción:\n\n| Grupo | Criterio | Ejemplos típicos |\n|---|---|---|\n| **Corregir de inmediato** | Riesgo alto y corrección posible ya | Trabajador no registrado, retención impaga, REMYPE vencido, falta de SCTR |\n| **Regularizar con plan** | Pasivo cuantificado que requiere decisión de la gerencia | Beneficios mal calculados, conceptos mal clasificados, vacaciones acumuladas |\n| **Documentar y monitorear** | Cumplimiento sustantivo con defecto formal | Registros de SST incompletos, documentación dispersa |\n\n**FASE 4 — Informe (1 día)**\n\nEstructura del informe final:\n\n1. **Resumen ejecutivo de una página**: el pasivo total estimado, las tres contingencias más graves y las tres acciones urgentes. Es lo único que la gerencia leerá completo.\n2. **Alcance y limitaciones**: qué se revisó, con qué muestra, qué no se revisó y por qué.\n3. **Determinación del régimen laboral aplicable**, con su sustento.\n4. **Matriz de hallazgos** cuantificada.\n5. **Plan de acción**: por hallazgo, la acción concreta, el responsable, el plazo y el costo estimado de corregir frente al costo de no corregir.\n6. **Controles recomendados**: la lista de verificación mensual de diez puntos, el papel de trabajo de cuatro hojas y el calendario laboral, adaptados a la empresa.\n7. **Anexos**: los papeles de trabajo de cada prueba.\n\n**El criterio profesional que debe gobernar el informe:** no sirve un informe que enumera incumplimientos sin cuantificarlos, porque la gerencia no puede decidir con eso. Y no sirve uno que minimiza los hallazgos para no incomodar, porque entonces el contador asume un riesgo que no es suyo. Lo que sirve es un informe que diga, por cada hallazgo: esto cuesta tanto corregirlo hoy y tanto no corregirlo, y aquí está el control que evita que vuelva a pasar. Eso es consultoría, y es el trabajo mejor pagado de la profesión.'}
  ],
  proy:{
   t:'Sistema de cumplimiento laboral de tu empresa',
   ctx:`Vas a instalar en tu empresa el sistema que hace que el cumplimiento laboral sea automático en lugar de depender de la memoria de alguien.`,
   pasos:[
    'Elabora el T-Registro simulado de tu empresa con los seis tipos de sujetos: trabajadores, prestadores de cuarta categoría, personal en formación si lo hay, y los derechohabientes de cada trabajador.',
    'Prepara la PLAME simulada del mes que liquidaste, con cada concepto de cada trabajador y la verificación de la base mínima de EsSalud.',
    'Determina el vencimiento de la PLAME de tu empresa según el último dígito de su RUC y el cronograma del ejercicio, y el vencimiento de AFPnet, dejando claro que son dos fechas distintas.',
    'Elabora el calendario laboral mensual de tu empresa con cada tarea, su momento, su responsable, su control y su alerta anticipada.',
    'Elabora la lista de verificación del cierre laboral de diez puntos, adaptada a tu empresa, en formato de hoja firmable.',
    'Diseña el procedimiento de contratación con la casilla obligatoria de alta en el T-Registro antes del ingreso al puesto, y el procedimiento de cese con la baja en el primer día hábil siguiente.',
    'Elabora el inventario de documentación laboral obligatoria de tu empresa: qué documento, dónde se archiva, quién lo custodia y por cuánto tiempo se conserva.',
    'Realiza la prueba de integridad del T-Registro en las dos direcciones sobre tu plantilla simulada, y documenta el resultado.'
   ],
   entrega:[
    'El T-Registro con los seis tipos de sujetos y la PLAME simulada del mes.',
    'El calendario laboral mensual con responsables, controles y alertas.',
    'La lista de verificación del cierre laboral en formato firmable.',
    'Los procedimientos de contratación y cese, y el inventario de documentación laboral.'
   ],
   crit:[
    'El calendario distingue el vencimiento de AFPnet del vencimiento de la PLAME.',
    'El procedimiento de contratación impide el ingreso al puesto sin alta previa en el T-Registro.',
    'El inventario de documentación señala el plazo de conservación de cada documento.'
   ],
   pista:'La prueba de integridad del T-Registro en la dirección "de la realidad al registro" es la que hace SUNAFIL en una visita y la que casi ninguna empresa se hace a sí misma. Consiste en recorrer el local, contar a las personas que trabajan y verificar que cada una esté registrada.'
  },
  proyInt:{
   t:'Auditoría de cumplimiento laboral de tu empresa',
   integra:'1.1 a 6.6',
   ctx:`Cierras el módulo laboral auditando tu propia empresa con el programa completo de nueve pruebas. Es el entregable que demuestra dominio de todo el ciclo laboral y, en la práctica profesional, uno de los servicios mejor pagados.`,
   pasos:[
    'Aplica a tu empresa el programa de revisión de nueve pruebas del ejercicio avanzado: régimen aplicable, integridad del T-Registro en dos direcciones, clasificación de conceptos, recálculo independiente de beneficios, jornada y horas extras, aportes y retenciones, vacaciones acumuladas, seguridad y salud en el trabajo, y obligaciones formales.',
    'Documenta cada prueba con su papel de trabajo: qué verificaste, con qué documento, qué encontraste y cómo lo cuantificaste.',
    'Elabora la matriz de hallazgos con las ocho columnas: hallazgo, norma infringida, trabajadores afectados, periodos, pasivo laboral estimado, multa potencial, acción y prioridad.',
    'Clasifica los hallazgos en los tres grupos de acción: corregir de inmediato, regularizar con plan y documentar y monitorear.',
    'Cuantifica el pasivo laboral total de tu empresa y regístralo en los estados financieros según corresponda, aplicando el criterio de la NIC 37 para pasivos y pasivos contingentes.',
    'Integra los hallazgos laborales al registro único de contingencias del subtema 5.1 y a la matriz de cumplimiento del 5.4.',
    'Redacta el informe final con sus siete secciones, empezando por el resumen ejecutivo de una página.',
    'Actualiza el expediente tributario integral del subtema 5.6 para convertirlo en expediente tributario y laboral integral, con la sección laboral completa.'
   ],
   entrega:[
    'Los papeles de trabajo de las nueve pruebas.',
    'La matriz de hallazgos cuantificada y clasificada en los tres grupos.',
    'El registro del pasivo laboral en los estados financieros con su fundamento normativo.',
    'El informe final de siete secciones y el expediente integral actualizado.'
   ],
   crit:[
    'La prueba de integridad del T-Registro se hizo en las dos direcciones, no solo del registro a la realidad.',
    'Cada hallazgo tiene cuantificado el pasivo y la multa potencial, no solo descrito el incumplimiento.',
    'El resumen ejecutivo de una página permite a la gerencia decidir sin leer el resto del informe.'
   ],
   pista:'El resumen ejecutivo se escribe al final y se coloca al principio. Debe contener exactamente tres cosas: el pasivo total estimado, las tres contingencias más graves y las tres acciones urgentes con su costo. Si ocupa más de una página, está mal escrito.'
  },
  fuentes:[
   {a:'D.S. 018-2007-TR', o:'Normas sobre la Planilla Electrónica', n:'estructura de la Planilla Electrónica, T-Registro y PLAME, sujetos a registrar y plazos'},
   {a:'R.S. 183-2011/SUNAT y modificatorias', o:'Normas sobre el T-Registro y la PLAME', n:'tablas de conceptos, forma de presentación y cronogramas'},
   {a:'D.S. 001-98-TR', o:'Normas sobre planillas y boletas de pago', n:'contenido de la boleta, entrega al trabajador y plazo de conservación de cinco años'},
   {a:'D.S. 004-2006-TR', o:'Registro de control de asistencia', n:'obligatoriedad, excepciones y valor probatorio de la jornada'},
   {a:'Ley 28806 y D.S. 019-2006-TR', o:'Ley General de Inspección del Trabajo y su reglamento', n:'tipificación de infracciones laborales, calificación de gravedad y tablas de multas'},
   {a:'TUO del SPP (D.S. 054-97-EF) y normas de la SBS', o:'Declaración y pago de aportes por AFPnet', n:'plazo de cinco días hábiles, intereses moratorios del SPP y responsabilidad del empleador'}
  ]
 }
 ]
}
);
