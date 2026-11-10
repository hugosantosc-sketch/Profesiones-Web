/* Contenido del curso — m6
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
 id:'m6', nivel:'Avanzado', titulo:'NIIF aplicadas y análisis financiero',
 resumen:'Las normas que deciden cómo se mide cada partida en una empresa mediana o grande, y cómo se lee el resultado.',
 temas:[
 {
  id:'m6t1', titulo:'Marco conceptual, NIIF plenas y NIIF para las PYMES', min:14,
  cont:`Las NIIF no son un reglamento de registro: son un marco de **criterios**. Cuando una situación no está resuelta por una norma específica, el Marco Conceptual es la fuente que decide.

# Objetivo de la información financiera
Proporcionar información útil a inversores, prestamistas y otros acreedores **para tomar decisiones** sobre proveer recursos a la entidad. No es informar a SUNAT, ni calcular tributos: eso es un uso derivado.

# Características cualitativas
|Fundamentales|Qué exigen|
|Relevancia|Que la información pueda cambiar una decisión; incluye la **materialidad**|
|Representación fiel|Completa, neutral y libre de error|

|De mejora|Qué aportan|
|Comparabilidad|Entre periodos y entre entidades|
|Verificabilidad|Que observadores independientes lleguen al mismo resultado|
|Oportunidad|Información a tiempo; la tardía pierde utilidad|
|Comprensibilidad|Clara para un usuario con conocimiento razonable de negocios|

> **Materialidad** es el concepto más útil en la práctica y el peor entendido. Una partida es material si omitirla o presentarla mal influiría en la decisión de un usuario. No hay un porcentaje legal: depende del tamaño y del contexto. Para una empresa con ingresos de S/ 50 millones, un error de S/ 3,000 es irrelevante; para una con ingresos de S/ 400,000, no lo es. Por eso no tiene sentido perseguir céntimos en una empresa grande ni redondear miles en una pequeña.

# Bases de medición
|Base|Cuándo se usa|
|Costo histórico|Inventarios, propiedades, planta y equipo (modelo del costo)|
|Valor razonable|Instrumentos financieros, propiedades de inversión (si se elige el modelo), activos biológicos|
|Valor presente|Pasivos de largo plazo, pasivos por arrendamiento, provisiones|
|Valor neto realizable|Inventarios cuando cae por debajo del costo|
|Costo corriente|Casos específicos|

# NIIF plenas frente a NIIF para las PYMES
En el Perú ambos marcos están oficializados por el CNC. La elección no es libre para todos:

|Aspecto|NIIF plenas|NIIF para las PYMES|
|A quién aplica|Entidades con obligación pública de rendir cuentas (supervisadas por SMV, SBS, con valores inscritos)|Entidades sin obligación pública de rendir cuentas|
|Extensión|Más de 40 normas|Un solo cuerpo normativo por secciones|
|Instrumentos financieros|NIIF 9, con modelo de pérdida esperada|Modelo simplificado|
|Arrendamientos|NIIF 16: todo arrendamiento al balance del arrendatario|Clasificación operativo / financiero|
|Activos intangibles por desarrollo|Se capitalizan si cumplen criterios|Se reconocen como gasto|
|Revaluación de activos fijos|Permitida (modelo de revaluación)|Permitida con condiciones en la versión vigente|
|Información a revelar|Extensa|Reducida|

! Una empresa que **no** tiene obligación pública de rendir cuentas puede aplicar NIIF para las PYMES, y eso le ahorra un trabajo considerable. Pero la decisión tiene consecuencias: si más adelante quiere emitir bonos, cotizar en bolsa o ser adquirida por un grupo que reporta bajo NIIF plenas, tendrá que convertir sus estados financieros retroactivamente. Conviene decidirlo mirando el plan de los próximos cinco años, no solo el costo del próximo cierre.

# Políticas contables, estimaciones y errores (NIC 8)
|Situación|Tratamiento|
|Cambio de **política contable** (por ejemplo, de costo a revaluación)|Retroactivo: se reexpresan los periodos anteriores|
|Cambio de **estimación** (vida útil, tasa de cobranza dudosa)|Prospectivo: solo afecta el periodo actual y los futuros|
|Corrección de **error** de periodos anteriores|Retroactivo: se reexpresa y se revela|

La distinción importa: cambiar la vida útil de una máquina de 10 a 8 años es una **estimación** y solo afecta el futuro; cambiar el método de valuación de inventarios es una **política** y obliga a reexpresar.

# Jerarquía para resolver un caso sin norma específica
1. Una NIIF que trate una situación similar y relacionada.
2. Las definiciones y criterios de reconocimiento y medición del Marco Conceptual.
3. Pronunciamientos recientes de otros emisores de normas con marco conceptual similar y prácticas aceptadas del sector.

Esa jerarquía es la respuesta profesional cuando un gerente pregunta "¿y esto cómo lo registro, si no dice nada la norma?".`,
  claves:['El objetivo de la información financiera es servir a decisiones de inversores y acreedores, no determinar tributos.','Características fundamentales: relevancia (con materialidad) y representación fiel.','En el Perú el CNC oficializa tanto las NIIF plenas como las NIIF para las PYMES; estas últimas aplican a entidades sin obligación pública de rendir cuentas.','Cambio de política: retroactivo. Cambio de estimación: prospectivo. Error: retroactivo con reexpresión.','Sin norma específica se aplica, en orden, una NIIF análoga, el Marco Conceptual y las prácticas del sector.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa decide cambiar la vida útil estimada de su maquinaria de 10 a 7 años. ¿Cómo se trata?',
    o:['Retroactivamente, reexpresando ejercicios anteriores','Prospectivamente: afecta el periodo actual y los futuros','Como un error contable','Requiere autorización del CNC'],r:1,
    s:'Es un cambio de **estimación** contable y se trata de forma prospectiva (NIC 8): la depreciación de los años anteriores no se toca y el valor en libros restante se distribuye en los años de vida útil que quedan. Se revela en notas el efecto. Si en cambio se cambiara el modelo del costo por el de revaluación, eso sí sería un cambio de política contable, con tratamiento retroactivo.'},
   {l:1,t:'mc',p:'¿Qué entidad puede aplicar NIIF para las PYMES en el Perú?',
    o:['Cualquier empresa, a su elección','Una entidad sin obligación pública de rendir cuentas','Solo las microempresas','Solo las empresas con menos de 20 trabajadores'],r:1,
    s:'Las entidades que no tienen obligación pública de rendir cuentas, es decir, las que no están supervisadas por la SMV o la SBS ni tienen valores inscritos en un mercado público. Una empresa grande no supervisada puede aplicar NIIF para las PYMES; una pequeña con valores inscritos, no. El criterio es la rendición pública de cuentas, no el tamaño.'},
   {l:2,t:'ab',p:'Una empresa descubre en 2026 que en 2024 omitió registrar una provisión de vacaciones por S/ 90,000. ¿Cómo lo corrige y qué revela?',
    s:'Es un **error de periodos anteriores** (NIC 8), no un cambio de estimación. El tratamiento es **retroactivo**:\n\n1. **Reexpresar las cifras comparativas** de 2024 y 2025 que se presenten junto a 2026: aumentar el gasto de personal y el pasivo de 2024 en S/ 90,000, y ajustar el impuesto que corresponda.\n2. **Ajustar el saldo inicial de resultados acumulados** del ejercicio más antiguo presentado, por el efecto neto del error.\n3. **No registrar el gasto en 2026**: hacerlo distorsionaría el resultado del año corriente con un costo que pertenece a 2024.\n\nAsiento de corrección en 2026:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 5922 | Resultados acumulados - Ajuste por error de ejercicios anteriores | 90,000.00 | |\n| 4151 | Vacaciones por pagar | | 90,000.00 |\n\n**Qué se revela en notas:** la naturaleza del error, el importe de la corrección para cada periodo anterior presentado, el importe al inicio del periodo más antiguo, y la circunstancia de que es impracticable determinarlo si fuera el caso.\n\n**Efecto tributario:** la deducción del gasto de vacaciones de 2024 no se gana con el registro de 2026. Para deducirlo habría que evaluar la rectificación de la declaración anual de 2024, dentro del plazo de prescripción, y considerando la regla de que las vacaciones son deducibles en el ejercicio de devengo solo si se pagaron dentro del plazo de la declaración anual. Si no se cumplió, la deducción corresponde al ejercicio en que se paguen. Es un caso típico donde el tratamiento contable (retroactivo) y el tributario (según pago) se separan.'},
   {l:2,t:'mc',p:'Una empresa con ingresos de S/ 80 millones encuentra una diferencia de S/ 4,500 en una conciliación. El auditor dice que no es material. ¿Qué significa?',
    o:['Que puede ignorarse porque no influiría en la decisión de ningún usuario de los estados financieros','Que es ilegal registrarla','Que la empresa debe ajustarla obligatoriamente','Que el auditor no quiere revisarla'],r:0,
    s:'Que su omisión o presentación errónea no influiría en las decisiones de los usuarios: S/ 4,500 sobre S/ 80 millones es 0.006%. Eso no significa que la diferencia sea aceptable como práctica de control interno: puede ser síntoma de un proceso defectuoso que mañana produzca una diferencia grande. La materialidad decide si se **ajusta el estado financiero**, no si se investiga la causa.'},
   {l:3,t:'ab',p:'Una empresa peruana no supervisada aplica NIIF para las PYMES. En 2027 planea emitir bonos en el mercado de valores. ¿Qué implicancias tiene y qué debe hacer desde ahora?',
    s:'**Implicancia central:** al inscribir valores en el mercado público pasa a tener **obligación pública de rendir cuentas**, por lo que deberá aplicar **NIIF plenas** y presentar información financiera auditada ante la SMV conforme a sus reglamentos.\n\n**Qué exige la transición (NIIF 1, Adopción por primera vez):**\n\n1. **Fecha de transición:** el inicio del primer periodo comparativo que se presentará. Si los primeros estados bajo NIIF plenas son de 2027 con comparativo 2026, la fecha de transición es el 1 de enero de 2026. En otras palabras, el ejercicio que la empresa está cerrando ahora ya forma parte del comparativo.\n2. **Estado de situación financiera de apertura** a esa fecha, reconociendo todos los activos y pasivos que las NIIF plenas exigen, dando de baja los que no califican, reclasificando y midiendo según NIIF plenas, con el efecto acumulado contra resultados acumulados.\n\n**Diferencias que más la van a golpear:**\n\n| Tema | NIIF para las PYMES | NIIF plenas | Efecto |\n|---|---|---|---|\n| Arrendamientos | Clasificación operativo / financiero | NIIF 16: activo por derecho de uso y pasivo por arrendamiento | Aparecen activos y pasivos que antes estaban fuera del balance; sube el endeudamiento y cambia el EBITDA |\n| Instrumentos financieros | Modelo simplificado | NIIF 9: pérdida crediticia esperada | Mayor estimación de deterioro de cuentas por cobrar, reconocida antes |\n| Costos de desarrollo | Gasto | Se capitalizan si cumplen criterios | Posible activo intangible nuevo |\n| Ingresos | Sección 23 | NIIF 15, cinco pasos y obligaciones de desempeño | Posible cambio en el momento de reconocimiento |\n| Revelaciones | Reducidas | Extensas: segmentos, instrumentos financieros, partes relacionadas, juicios y estimaciones | Trabajo de notas mucho mayor |\n\n**Plan de acción, en orden de urgencia:**\n\n1. **Inventariar los contratos de arrendamiento** ahora: plazos, pagos, opciones de renovación y tasas incrementales de préstamo. Es el ajuste más grande y el que necesita más datos históricos.\n2. **Levantar el historial de cobranza** por tipo de cliente, para construir la matriz de provisiones de pérdida esperada de NIIF 9. Sin dos o tres años de historia, la estimación no es defendible ante un auditor.\n3. **Revisar los contratos de ingresos** con la lógica de NIIF 15: identificar obligaciones de desempeño separadas, precios variables y plazos de transferencia del control.\n4. **Cuantificar el impacto en los covenants** financieros antes de emitir. Si el prospecto o los contratos de deuda existentes miden endeudamiento o EBITDA, la adopción de NIIF 16 puede alterar esos ratios sin que el negocio haya cambiado en nada. Esto se negocia antes, no después.\n5. **Preparar la doble contabilidad de gestión durante 2026**: llevar los ajustes NIIF plenas en papeles de trabajo paralelos, de modo que al cerrar 2027 el comparativo esté listo y auditado, y no haya que reconstruirlo contra el reloj.\n6. **Elegir y contratar auditor externo** con experiencia en el mercado de valores, idealmente desde el cierre de 2026, para que audite el comparativo.'}
  ]
 },
 {
  id:'m6t2', titulo:'NIC 16: propiedades, planta y equipo, y deterioro', min:16,
  cont:`El activo fijo es, en muchas empresas peruanas, la partida más grande del balance y la que genera más diferencias entre lo contable y lo tributario.

# Reconocimiento y costo inicial
Un elemento de propiedades, planta y equipo se reconoce cuando es probable que genere beneficios futuros y su costo puede medirse con fiabilidad. El costo inicial incluye:

- Precio de compra, más aranceles e impuestos no recuperables, menos descuentos.
- Costos directamente atribuibles para ponerlo en el lugar y las condiciones de uso: transporte, instalación, montaje, honorarios de ingeniería, pruebas.
- Estimación inicial de los costos de **desmantelamiento y rehabilitación del lugar**, cuando existe la obligación.

No forman parte del costo: la capacitación del personal, las pérdidas iniciales de operación, los costos de reubicación posterior y los gastos administrativos generales.

# Depreciación: tres decisiones independientes
|Decisión|Qué significa|
|Vida útil|Periodo durante el cual se espera usar el activo, no su vida física|
|Valor residual|Importe que se espera obtener al final, neto de costos de disposición|
|Método|Línea recta, unidades de producción o decreciente; debe reflejar el patrón de consumo|

$ Depreciación = (Costo − Valor residual) ÷ Vida útil
$ Por unidades de producción = (Costo − Valor residual) × (Unidades del periodo ÷ Unidades totales estimadas)

La depreciación empieza cuando el activo está **disponible para su uso**, no cuando se compra ni cuando se usa por primera vez, y no se detiene porque el activo esté inactivo (salvo en el método de unidades de producción).

! **El choque con la norma tributaria.** La LIR fija tasas máximas (5% edificios, 10% maquinaria, 20% vehículos, 25% equipos de cómputo) y exige que la depreciación esté **contabilizada** para ser deducible. Consecuencias prácticas: si la vida útil real es más corta que la tributaria, el exceso se adiciona y se recupera en años posteriores; si es más larga, la empresa deduce menos de lo que podría, y no puede "recuperar" el tope no usado de años anteriores. La vida útil contable se decide por la realidad económica, pero conocer el efecto tributario forma parte de la decisión.

# Componentización
Si un activo tiene partes significativas con vidas útiles distintas, cada parte se deprecia por separado. Un edificio con ascensores (15 años), techo (20 años) y estructura (50 años) no se deprecia como una sola cosa. En el Perú esto se aplica poco y es una de las observaciones más frecuentes de los auditores en empresas que adoptan NIIF plenas.

# Mejoras frente a mantenimiento
|Desembolso|Tratamiento|
|Aumenta la capacidad, la eficiencia o la vida útil|**Se capitaliza**: aumenta el costo del activo|
|Mantiene el activo en condiciones normales de uso|**Es gasto** del periodo|
|Reemplazo de un componente significativo|Se capitaliza el nuevo y se da de baja el valor en libros del reemplazado|

@ Reparación mayor que extiende la vida útil de una máquina en 3 años, S/ 48,000 más IGV
@ 33|3331 Maquinaria y equipo de explotación|48,000.00|
@ 40|40111 IGV - Cuenta propia|8,640.00|
@ 42|4212 Facturas por pagar||56,640.00

# Modelo del costo y modelo de revaluación
|Modelo|Medición posterior|Efecto de la revaluación|
|Costo|Costo − depreciación acumulada − deterioro|No aplica|
|Revaluación|Valor razonable a la fecha de revaluación − depreciación posterior|El excedente va a **otros resultados integrales** y a la cuenta 57 Excedente de revaluación, no al resultado|

La revaluación voluntaria **no tiene efecto tributario**: el mayor valor no es depreciable para efectos del Impuesto a la Renta y el excedente no es renta gravada. Sirve para mostrar un patrimonio más representativo (útil ante bancos), no para reducir impuestos.

# Deterioro del valor (NIC 36)
$ Valor recuperable = el MAYOR entre valor razonable menos costos de disposición y valor en uso
$ Si Valor en libros > Valor recuperable → se reconoce pérdida por deterioro

Indicios de deterioro: caída del valor de mercado, obsolescencia o daño físico, cambios adversos en el entorno legal o económico, rendimiento inferior al esperado, planes de discontinuar una línea.

@ Deterioro de maquinaria: valor en libros S/ 140,000, valor recuperable S/ 95,000
@ 68|6851 Desvalorización de inmuebles, maquinaria y equipo|45,000.00|
@ 36|3613 Maquinaria y equipo||45,000.00

La pérdida por deterioro **no es deducible** mientras no se concrete la venta o la baja del activo: es una diferencia temporal que genera activo tributario diferido.

# Baja del activo
$ Resultado de la baja = Importe recibido − Valor en libros
Se registra en resultados (cuenta 75 si es ganancia, 65 si es pérdida), nunca como ingreso de ventas.

@ Venta de vehículo: costo S/ 90,000, depreciación acumulada S/ 72,000, precio de venta S/ 25,000 más IGV
@ 16|1659 Otras cuentas por cobrar diversas|29,500.00|
@ 39|3913 Equipo de transporte|72,000.00|
@ 40|40111 IGV - Cuenta propia||4,500.00
@ 33|3341 Vehículos motorizados||90,000.00
@ 75|7564 Enajenación de activo inmovilizado||7,000.00`,
  claves:['El costo inicial incluye todo lo necesario para poner el activo en condiciones de uso, más la obligación de desmantelamiento si existe.','La depreciación comienza cuando el activo está disponible para su uso y no se detiene por inactividad.','Mejora que aumenta capacidad o vida útil se capitaliza; mantenimiento es gasto.','La revaluación va a otros resultados integrales y a la cuenta 57; no tiene efecto tributario.','Deterioro: si el valor en libros supera el mayor entre valor razonable neto y valor en uso, se reconoce la pérdida, que no es deducible hasta la baja o venta.'],
  ej:[
   {l:1,t:'num',p:'Máquina: precio S/ 120,000; flete S/ 4,000; instalación S/ 6,500; capacitación del operario S/ 3,000; IGV S/ 23,490 (crédito fiscal). ¿Cuál es el costo del activo?',
    u:'S/',r:130500,tol:1,
    s:'Costo = 120,000 + 4,000 + 6,500 = **S/ 130,500**\n\nLa **capacitación** (S/ 3,000) no se capitaliza: es gasto del periodo, porque el beneficio se incorpora a las personas y no al activo. El **IGV** es crédito fiscal, no costo. Si se hubieran activado ambos, el costo quedaría en S/ 156,990 (20% sobrevaluado) y la depreciación de todos los años siguientes estaría mal.'},
   {l:1,t:'mc',p:'Una empresa revalúa su terreno y reconoce un excedente de S/ 300,000. ¿Dónde se presenta?',
    o:['Como ingreso en el Estado de Resultados','En otros resultados integrales y en el patrimonio (cuenta 57 Excedente de revaluación)','Como ingreso diferido en el pasivo','Como reserva legal'],r:1,
    s:'En otros resultados integrales, acumulándose en el patrimonio en la cuenta 57 Excedente de revaluación. No pasa por el resultado del ejercicio (salvo reversiones de deterioros previamente reconocidos en resultados), por lo que no aumenta la utilidad distribuible ni la base del Impuesto a la Renta. También conviene recordar que los terrenos no se depreciaban antes ni se depreciarán después de la revaluación.'},
   {l:2,t:'num',p:'Equipo con costo S/ 240,000, valor residual S/ 20,000 y vida útil de 8 años, disponible para uso desde el 1 de abril. ¿Cuánto se deprecia el primer año?',
    u:'S/',r:20625,tol:5,
    s:'Base depreciable = 240,000 − 20,000 = S/ 220,000\nDepreciación anual = 220,000 ÷ 8 = S/ 27,500 → mensual S/ 2,291.67\nMeses desde el 1 de abril = 9\n**Depreciación del primer año = 2,291.67 × 9 = S/ 20,625**\n\nSi la tasa tributaria máxima fuera 10% (maquinaria), el tope sería 240,000 × 10% × 9/12 = S/ 18,000, por lo que habría una adición temporal de S/ 2,625 en la declaración anual.'},
   {l:2,t:'ab',p:'Clasifica como capitalizable o gasto: (a) cambio de llantas de un camión S/ 4,800; (b) instalación de un sistema de refrigeración en un almacén que antes no lo tenía, S/ 85,000; (c) pintado anual de la fachada S/ 6,000; (d) reemplazo del motor de una máquina, que extiende su vida 5 años, S/ 60,000, siendo el valor en libros del motor antiguo S/ 8,000.',
    s:'**(a) Cambio de llantas — gasto.** Mantiene el camión en condiciones normales de operación; no aumenta su capacidad ni su vida útil. Cuenta 634 Mantenimiento y reparaciones.\n\n**(b) Sistema de refrigeración nuevo — se capitaliza.** Añade una funcionalidad que el almacén no tenía y permite almacenar productos que antes no podía: aumenta la capacidad de generar beneficios. Se registra como un componente con su propia vida útil (por ejemplo 10 años), separada de la del edificio.\n\n**(c) Pintado anual — gasto.** Es mantenimiento recurrente. Si fuera parte de una remodelación integral que extiende la vida del inmueble, el análisis cambiaría, pero un pintado anual por su propia periodicidad es conservación.\n\n**(d) Reemplazo del motor — se capitaliza el nuevo y se da de baja el antiguo.** Es el caso de reemplazo de un componente significativo:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 3331 | Maquinaria y equipo (motor nuevo) | 60,000.00 | |\n| 40111 | IGV - Cuenta propia | 10,800.00 | |\n| 4212 | Facturas por pagar | | 70,800.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6591 | Costo neto de enajenación / baja de activos | 8,000.00 | |\n| 3331 | Maquinaria y equipo (motor antiguo, valor en libros) | | 8,000.00 |\n\n**Por qué importa la distinción:** capitalizar un gasto mejora la utilidad del año y aumenta el activo, pero infla el resultado y, si SUNAT lo detecta, repara la depreciación de los años siguientes. Y al revés, llevar a gasto una mejora capitalizable reduce la utilidad del año y genera una adición tributaria por el exceso de gasto deducido. Ninguna de las dos es una decisión libre: depende de si el desembolso aumenta la capacidad o solo la mantiene.'},
   {l:3,t:'ab',p:'Una planta tiene valor en libros de S/ 1,800,000. Por la caída del mercado, la empresa estima: valor razonable menos costos de venta S/ 1,250,000; y flujos futuros descontados (valor en uso) de S/ 1,420,000. Determina el deterioro, haz los asientos y explica el efecto tributario y en la depreciación futura.',
    s:'**Paso 1 — Valor recuperable.** Es el **mayor** entre las dos medidas:\nValor razonable menos costos de venta: S/ 1,250,000\nValor en uso: S/ 1,420,000\n**Valor recuperable = S/ 1,420,000**\n\nLa lógica: si la empresa puede obtener más usando el activo que vendiéndolo, el activo vale lo que produce en uso.\n\n**Paso 2 — Deterioro.**\nValor en libros 1,800,000 − valor recuperable 1,420,000 = **pérdida por deterioro de S/ 380,000**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6851 | Desvalorización de inmuebles, maquinaria y equipo | 380,000.00 | |\n| 3613 | Desvalorización acumulada - Maquinaria y equipo | | 380,000.00 |\n\n**Paso 3 — Efecto en la depreciación futura.** La nueva base depreciable es S/ 1,420,000, distribuida en la vida útil restante. Si quedaban 10 años, la depreciación anual pasa de 180,000 a **142,000**. El deterioro adelanta el gasto: se reconocen S/ 380,000 hoy en lugar de repartirlos.\n\n**Paso 4 — Efecto tributario.** La pérdida por deterioro **no es deducible** en el ejercicio: la LIR no admite la deducción de desvalorizaciones no realizadas. Se adiciona en la declaración anual como diferencia **temporal**:\n\nActivo tributario diferido = 380,000 × 29.5% = **S/ 112,100**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 112,100.00 | |\n| 88 | Impuesto a la Renta diferido | | 112,100.00 |\n\nEs temporal y no permanente porque la pérdida se materializará tributariamente: cuando el activo se venda o se dé de baja, el menor valor en libros producirá una pérdida (o menor ganancia) deducible. Además, la depreciación tributaria se seguirá calculando sobre el **costo original** (dentro de los topes), no sobre el valor deteriorado, lo que irá revirtiendo la diferencia año por año.\n\n**Paso 5 — Reversión futura.** Si en un ejercicio posterior el valor recuperable se recupera, la NIC 36 obliga a **revertir** el deterioro, pero solo hasta el valor en libros que el activo habría tenido si nunca se hubiera deteriorado (es decir, hasta S/ 1,800,000 menos la depreciación que habría acumulado). La reversión va a resultados, y nunca puede llevar el activo por encima de ese límite.\n\n**Lo que hay que revelar en notas:** los hechos que llevaron al deterioro, el importe reconocido, la unidad generadora de efectivo si se evaluó a ese nivel, y los supuestos clave del valor en uso (tasa de descuento, horizonte de proyección, tasa de crecimiento). Esa nota es la que un auditor revisa con más detalle, porque el valor en uso se construye con proyecciones de la propia gerencia.'}
  ]
 },
 {
  id:'m6t3', titulo:'NIIF 15: reconocimiento de ingresos', min:15,
  cont:`La NIIF 15 reemplazó el criterio de "transferencia de riesgos y beneficios" por un modelo de **cinco pasos** centrado en el **control** y en las obligaciones de desempeño. Es la norma que más cambió la contabilidad de empresas de servicios, constructoras, software y telecomunicaciones.

# Los cinco pasos
1. **Identificar el contrato** con el cliente (acuerdo con derechos exigibles, aprobado por las partes, con sustancia comercial y cobro probable).
2. **Identificar las obligaciones de desempeño**: cada bien o servicio **distinto** que se promete.
3. **Determinar el precio de la transacción**, incluyendo contraprestación variable, componentes financieros significativos y pagos al cliente.
4. **Asignar el precio** a cada obligación de desempeño, en función de sus precios de venta independientes.
5. **Reconocer el ingreso** cuando (o a medida que) se satisface cada obligación de desempeño.

$ Ingreso = Precio asignado a la obligación × Grado de satisfacción de esa obligación

# Obligaciones de desempeño distintas
Un bien o servicio es distinto si el cliente puede beneficiarse de él por separado y si la promesa es separable de las demás del contrato.

> Ejemplo peruano: una empresa vende una máquina industrial por S/ 118,000 con instalación y tres años de mantenimiento incluidos. Si la instalación y el mantenimiento pueden contratarse por separado, hay **tres** obligaciones de desempeño, no una. El ingreso se reparte: la máquina al entregarla, la instalación al terminarla, y el mantenimiento a lo largo de 36 meses. Registrar los S/ 118,000 como ingreso del mes de la venta adelanta un ingreso que todavía no se ganó y sobrevalúa la utilidad del periodo.

# Cumplimiento en un momento o a lo largo del tiempo
|Se reconoce a lo largo del tiempo si…|Ejemplos|
|El cliente recibe y consume los beneficios simultáneamente|Vigilancia, limpieza, suscripciones, alquileres|
|El desempeño crea o mejora un activo que el cliente controla|Construcción en terreno del cliente|
|El desempeño no crea un activo con uso alternativo y hay derecho exigible de pago por lo ejecutado|Servicios a medida, consultoría específica|

En los demás casos, se reconoce **en un momento determinado**: cuando el cliente obtiene el control (puede dirigir su uso y obtener sus beneficios).

Métodos de medición del avance:
- **De producto**: unidades entregadas, hitos alcanzados, avance certificado.
- **De recursos**: costos incurridos sobre costos totales estimados (el clásico "grado de avance" de las constructoras).

$ Avance por costos = Costos incurridos a la fecha ÷ Costos totales estimados
$ Ingreso del periodo = Precio total × Avance − Ingresos reconocidos anteriormente

# Contraprestación variable
Descuentos por volumen, penalidades, bonos por cumplimiento, devoluciones esperadas. Se estima por el **valor esperado** o el **importe más probable**, y solo se incluye en el precio de la transacción en la medida en que sea **altamente probable** que no haya una reversión significativa del ingreso.

# Los activos y pasivos del contrato
|Partida|Qué es|Cuenta PCGE|
|Cuenta por cobrar|Derecho incondicional de cobro (ya se facturó o el plazo venció)|12|
|Activo del contrato|Ingreso reconocido que aún no se puede facturar (obra avanzada sin valorizar)|12 o 16 según la presentación|
|Pasivo del contrato|Cobro anticipado por obligaciones aún no satisfechas|122 Anticipos de clientes|

! El error más frecuente en el Perú es **confundir la facturación con el ingreso**. En una obra, la valorización mensual es un documento comercial; el ingreso es el avance real. Y al revés: un anticipo del 30% facturado al inicio no es ingreso, es pasivo. SUNAT, por su parte, exige el comprobante para el IGV según reglas propias de nacimiento de la obligación tributaria, que no siguen a la NIIF 15: una cosa es cuándo nace el IGV y otra cuándo se reconoce el ingreso contable.

# Ejemplo de asignación de precio
Paquete vendido en S/ 118,000 (base S/ 100,000 + IGV). Precios de venta independientes: máquina S/ 85,000, instalación S/ 10,000, mantenimiento 3 años S/ 25,000. Total independiente: S/ 120,000.

|Obligación|Precio independiente|Proporción|Precio asignado|
|Máquina|85,000|70.83%|70,833|
|Instalación|10,000|8.33%|8,333|
|Mantenimiento|25,000|20.84%|20,834|
|**Total**|**120,000**|**100%**|**100,000**|

El mantenimiento de S/ 20,834 se reconoce a razón de S/ 578.72 mensuales durante 36 meses. El resto se reconoce al entregar la máquina y al completar la instalación.`,
  claves:['Cinco pasos: contrato, obligaciones de desempeño, precio, asignación y reconocimiento.','El criterio es la transferencia del control, no el de riesgos y beneficios.','Un contrato puede tener varias obligaciones de desempeño con reconocimiento en momentos distintos.','Facturar no es reconocer ingreso: existen activos del contrato (avance no facturado) y pasivos del contrato (anticipos).','El momento del IGV sigue reglas tributarias propias y no coincide necesariamente con el reconocimiento contable del ingreso.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa cobra un anticipo de S/ 50,000 por un servicio que prestará el próximo trimestre. ¿Cómo lo registra?',
    o:['Como ingreso del mes del cobro','Como pasivo del contrato (anticipo de clientes), hasta satisfacer la obligación','Como patrimonio','Como cuenta por cobrar'],r:1,
    s:'Como pasivo del contrato, en la cuenta 122 Anticipos de clientes. El dinero entró, pero la obligación de desempeño no se ha satisfecho: si el contrato se cayera habría que devolverlo. El ingreso se reconocerá a medida que se preste el servicio. Nota tributaria: para el IGV, la obligación puede nacer con la percepción del anticipo, por lo que se emite comprobante y se paga IGV antes de reconocer el ingreso contable. Es una diferencia de tiempos normal, no un error.'},
   {l:1,t:'mc',p:'¿Cuál es el criterio central de la NIIF 15 para reconocer un ingreso?',
    o:['La emisión de la factura','La transferencia del control del bien o servicio al cliente','El cobro del precio','La firma del contrato'],r:1,
    s:'La transferencia del control: que el cliente pueda dirigir el uso del bien o servicio y obtener sustancialmente todos sus beneficios. La NIIF 15 desplazó el criterio anterior de transferencia de riesgos y beneficios. Ni la factura, ni el cobro, ni la firma del contrato determinan el ingreso por sí solos.'},
   {l:2,t:'num',p:'Obra por S/ 2,400,000. Costos totales estimados S/ 1,800,000. Costos incurridos al cierre S/ 630,000. ¿Cuánto ingreso se reconoce?',
    u:'S/',r:840000,tol:1000,
    s:'Avance = 630,000 ÷ 1,800,000 = **35%**\nIngreso del periodo = 2,400,000 × 35% = **S/ 840,000**\n\nY el costo reconocido es S/ 630,000, por lo que la utilidad del periodo es S/ 210,000 (margen del 25%, consistente con el margen total esperado de 600,000 ÷ 2,400,000).\n\nSi la empresa hubiera facturado valorizaciones por S/ 700,000, la diferencia de S/ 140,000 entre el ingreso reconocido y lo facturado es un **activo del contrato** (obra ejecutada pendiente de valorizar). Si hubiera facturado S/ 950,000, los S/ 110,000 en exceso serían **pasivo del contrato**.'},
   {l:2,t:'ab',p:'Una empresa de software vende una licencia perpetua por S/ 60,000 que incluye implementación (precio independiente S/ 15,000) y soporte por 2 años (precio independiente S/ 20,000). El precio independiente de la licencia sola es S/ 55,000. Asigna el precio y señala cuándo se reconoce cada parte.',
    s:'**Paso 1 — Obligaciones de desempeño.** Son tres: licencia, implementación y soporte. Cada una puede contratarse por separado y el cliente se beneficia de cada una de forma independiente (asumiendo que la licencia es funcional sin la implementación de esta empresa; si no lo fuera, licencia e implementación serían una sola obligación).\n\n**Paso 2 — Suma de precios independientes:** 55,000 + 15,000 + 20,000 = S/ 90,000\n\n**Paso 3 — Asignación proporcional del precio del contrato (S/ 60,000):**\n\n| Obligación | Precio independiente | Proporción | Precio asignado |\n|---|---|---|---|\n| Licencia | 55,000 | 61.11% | 36,667 |\n| Implementación | 15,000 | 16.67% | 10,000 |\n| Soporte 2 años | 20,000 | 22.22% | 13,333 |\n| **Total** | **90,000** | **100%** | **60,000** |\n\nEl descuento global de S/ 30,000 se reparte proporcionalmente entre las tres obligaciones, salvo que exista evidencia de que el descuento corresponde solo a una de ellas.\n\n**Paso 4 — Momento del reconocimiento:**\n\n| Obligación | Importe | Cuándo |\n|---|---|---|\n| Licencia perpetua | 36,667 | **En un momento**: cuando el cliente obtiene el derecho de uso (acceso y clave entregados). Es un derecho de uso, no de acceso |\n| Implementación | 10,000 | **A lo largo del tiempo**, según el avance (horas incurridas o hitos) |\n| Soporte | 13,333 | **A lo largo de 24 meses**: S/ 555.54 mensuales, porque el cliente consume el beneficio de forma simultánea |\n\n**Efecto en el primer mes**, si se entregó la licencia y se completó el 40% de la implementación:\n36,667 + (10,000 × 40%) + 555.54 = **S/ 41,222.54** de ingreso, no los S/ 60,000 facturados.\n\nLos S/ 18,777.46 restantes son **pasivo del contrato** y se irán reconociendo en los meses siguientes. Si se hubieran reconocido los S/ 60,000 completos, la utilidad del primer mes estaría sobrevaluada y la de los 23 meses siguientes subvaluada, con costos de soporte sin ingreso que los acompañe.'},
   {l:3,t:'ab',p:'Una constructora firma un contrato por S/ 5,000,000 con un bono de S/ 400,000 si termina antes del plazo. Costos estimados S/ 3,800,000. Al cierre del año 1: costos incurridos S/ 1,520,000, y la gerencia estima en 60% la probabilidad de ganar el bono. En el año 2 los costos totales estimados suben a S/ 4,100,000 y la probabilidad del bono cae a 20%. Determina el ingreso de cada año.',
    s:'**Año 1**\n\n*Precio de la transacción:* el bono es contraprestación variable y solo se incluye si es **altamente probable** que no haya una reversión significativa del ingreso. Una probabilidad del 60% no alcanza ese umbral (la práctica lo ubica claramente por encima, cerca del 75-80%). Por tanto, el precio de la transacción es **S/ 5,000,000**, sin el bono.\n\n*Avance:* 1,520,000 ÷ 3,800,000 = **40%**\n*Ingreso del año 1:* 5,000,000 × 40% = **S/ 2,000,000**\n*Costo del año 1:* S/ 1,520,000\n*Utilidad del año 1:* **S/ 480,000** (margen 24%)\n\n**Año 2**\n\nDos cambios de estimación, ambos prospectivos:\n\n*El bono:* la probabilidad cae a 20%, así que sigue fuera del precio. Precio de la transacción: S/ 5,000,000.\n\n*Los costos totales estimados suben a S/ 4,100,000*, lo que reduce el margen total esperado de S/ 1,200,000 a S/ 900,000 (de 24% a 18%). Este cambio se refleja en el periodo en que ocurre y afecta el avance acumulado.\n\nSuponiendo costos incurridos acumulados al cierre del año 2 de S/ 3,280,000:\n*Avance acumulado:* 3,280,000 ÷ 4,100,000 = **80%**\n*Ingreso acumulado:* 5,000,000 × 80% = S/ 4,000,000\n*Ingreso del año 2:* 4,000,000 − 2,000,000 = **S/ 2,000,000**\n*Costo del año 2:* 3,280,000 − 1,520,000 = S/ 1,760,000\n*Utilidad del año 2:* **S/ 240,000** (margen 12%)\n\n**Lectura del caso:** aunque el ingreso de los dos años es idéntico, la utilidad del año 2 es la mitad. El alza de costos estimados no se reparte hacia atrás: el año 1 ya cerró con 24% de margen y el ajuste completo lo absorbe el año 2. Esto se llama "catch-up" del cambio de estimación y es exactamente lo que la NIIF 15 exige, porque el avance se recalcula sobre los costos totales actualizados.\n\n**Dos advertencias prácticas:**\n\n1. **Si los costos totales estimados superaran el precio del contrato**, el contrato pasa a ser oneroso y la pérdida completa se reconoce de inmediato, no a medida que se incurre. Aquí no ocurre (4,100,000 < 5,000,000), pero es el riesgo que hay que vigilar con cada actualización del presupuesto de obra.\n2. **Si en el año 3 el bono se vuelve altamente probable** (por ejemplo, la obra ya está adelantada y faltan dos semanas), se incorpora al precio de la transacción y se reconoce el ingreso acumulado correspondiente: 400,000 × avance acumulado, con el efecto completo en ese periodo.\n\n**Presentación:** si las valorizaciones facturadas acumuladas al cierre del año 1 fueron S/ 1,700,000 frente a un ingreso reconocido de S/ 2,000,000, hay un **activo del contrato de S/ 300,000** (obra ejecutada no valorizada), que se revela separadamente de las cuentas por cobrar porque su cobro está condicionado a la valorización y no al simple paso del tiempo.'}
  ]
 },
 {
  id:'m6t4', titulo:'NIIF 16: arrendamientos', min:14,
  cont:`La NIIF 16 eliminó la distinción entre arrendamiento operativo y financiero **para el arrendatario**. Hoy, salvo dos excepciones, todo arrendamiento se reconoce en el balance: un **activo por derecho de uso** y un **pasivo por arrendamiento**.

# Por qué cambió
Antes, una empresa que alquilaba 50 locales por 10 años no mostraba ninguna deuda: solo un gasto mensual. Su balance parecía poco endeudado y sus ratios, mejores que los de una competidora que compró sus locales con préstamo. La NIIF 16 corrigió esa asimetría.

# Las dos excepciones
|Excepción|Condición|Tratamiento|
|Corto plazo|Plazo de 12 meses o menos, sin opción de compra|Gasto lineal, sin activo ni pasivo|
|Bajo valor|El activo subyacente es de bajo valor (laptops, muebles, equipos menores)|Gasto lineal|

# Medición inicial
$ Pasivo por arrendamiento = Valor presente de los pagos futuros, descontados a la tasa incremental de préstamo del arrendatario (o la tasa implícita, si es determinable)
$ Activo por derecho de uso = Pasivo + pagos anticipados + costos directos iniciales + costos de desmantelamiento − incentivos recibidos

# Medición posterior
|Partida|Cómo evoluciona|
|Pasivo|Aumenta por el interés devengado y disminuye por los pagos (como un préstamo)|
|Activo|Se deprecia, normalmente en línea recta por el menor entre el plazo del arrendamiento y la vida útil|

El efecto en el Estado de Resultados es que el **gasto por alquiler desaparece** y se reemplaza por **depreciación** (operativa) e **intereses** (financieros). Eso mejora el EBITDA y empeora los ratios de endeudamiento, aunque el negocio no haya cambiado.

# Ejemplo completo
Local arrendado por 5 años, pago anual de S/ 60,000 al final de cada año, tasa incremental de préstamo 10%.

$ Factor de valor presente de anualidad (5 años, 10%) = 3.7908
$ Pasivo inicial = 60,000 × 3.7908 = S/ 227,448
$ Activo por derecho de uso = S/ 227,448
$ Depreciación anual = 227,448 ÷ 5 = S/ 45,489.60

@ Reconocimiento inicial del arrendamiento
@ 32|3221 Activo por derecho de uso - Edificaciones|227,448.00|
@ 45|4551 Pasivo por arrendamiento - Terceros||227,448.00

**Tabla de amortización del pasivo:**

|Año|Saldo inicial|Interés 10%|Pago|Saldo final|
|1|227,448|22,745|(60,000)|190,193|
|2|190,193|19,019|(60,000)|149,212|
|3|149,212|14,921|(60,000)|104,133|
|4|104,133|10,413|(60,000)|54,546|
|5|54,546|5,454|(60,000)|0|
|**Total**||**72,552**|**(300,000)**||

@ Año 1: devengo del interés y del pago
@ 67|6731 Intereses - Pasivo por arrendamiento|22,745.00|
@ 45|4551 Pasivo por arrendamiento|37,255.00|
@ 10|1041 Cuentas corrientes operativas||60,000.00

@ Año 1: depreciación del derecho de uso
@ 68|6816 Depreciación - Activo por derecho de uso|45,489.60|
@ 39|3925 Depreciación acumulada - Derecho de uso||45,489.60

|Comparación del gasto anual|NIIF 16|Criterio anterior (operativo)|
|Año 1|68,234.60|60,000|
|Año 3|60,410.60|60,000|
|Año 5|50,943.60|60,000|
|Total 5 años|300,000|300,000|

El gasto total es el mismo; lo que cambia es su **distribución**: la NIIF 16 carga más al principio (porque el interés es mayor cuando el saldo es alto). Para una empresa que arrienda muchos locales nuevos a la vez, eso significa resultados más bajos en los primeros años.

! **El tratamiento tributario sigue su propio camino.** Para efectos del Impuesto a la Renta, un arrendamiento operativo mantiene la deducción del **alquiler devengado según el contrato**, no de la depreciación más intereses de la NIIF 16. Eso genera diferencias temporales que deben controlarse y presentar en la NIC 12. Un **leasing financiero** (arrendamiento financiero regulado por el D.L. 299) sí tiene reglas propias, con depreciación acelerada posible en función del plazo del contrato cuando se cumplen los requisitos. Hay que distinguir con claridad el arrendamiento contable de la figura financiera y tributaria del leasing.

# Para el arrendador
La NIIF 16 mantuvo la clasificación: el arrendador sigue distinguiendo entre arrendamiento **financiero** (da de baja el activo y reconoce una cuenta por cobrar) y **operativo** (mantiene el activo, lo deprecia y reconoce el ingreso de alquiler linealmente).`,
  claves:['Para el arrendatario, todo arrendamiento genera activo por derecho de uso y pasivo por arrendamiento.','Dos excepciones: plazo de 12 meses o menos y activos de bajo valor.','El pasivo es el valor presente de los pagos a la tasa incremental de préstamo; el activo se deprecia en línea recta.','El gasto por alquiler se reemplaza por depreciación e intereses: mejora el EBITDA y empeora el endeudamiento.','Tributariamente se deduce el alquiler devengado según contrato, lo que genera diferencias temporales frente a la NIIF 16.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa arrienda una fotocopiadora por 8 meses. ¿Debe reconocer un activo por derecho de uso?',
    o:['Sí, siempre','No: aplica la excepción de arrendamientos de corto plazo (12 meses o menos)','Sí, pero solo el 50%','Solo si hay opción de compra'],r:1,
    s:'No. Con un plazo de 8 meses y sin opción de compra, aplica la excepción de corto plazo: se reconoce el gasto de forma lineal durante el plazo del arrendamiento, sin activo ni pasivo. La otra excepción es la de activos de bajo valor. Ambas son opcionales y, si se aplican, deben revelarse y usarse de forma consistente por clase de activo subyacente.'},
   {l:1,t:'mc',p:'Bajo NIIF 16, ¿qué pasa con el EBITDA de una empresa que arrienda muchos locales?',
    o:['Baja, porque aumenta el gasto','Sube, porque el alquiler se reemplaza por depreciación e intereses, que están fuera del EBITDA','No cambia','Depende del plazo'],r:1,
    s:'Sube. El EBITDA excluye depreciación, amortización e intereses; al desaparecer el gasto por alquiler y aparecer en su lugar depreciación e intereses, el EBITDA mejora sin que el negocio haya cambiado. Este efecto es importante cuando hay covenants bancarios o valuaciones basadas en múltiplos de EBITDA: conviene revisar cómo están definidos esos indicadores en los contratos, porque muchos se firmaron antes de la NIIF 16.'},
   {l:2,t:'num',p:'Arrendamiento de 4 años con pago anual de S/ 25,000 al final de cada año y tasa del 8%. El factor de valor presente de anualidad (4 años, 8%) es 3.3121. ¿Cuál es el pasivo inicial?',
    u:'S/',r:82802.50,tol:50,
    s:'Pasivo inicial = 25,000 × 3.3121 = **S/ 82,802.50**\n\nEl activo por derecho de uso se reconoce por el mismo importe (si no hay pagos anticipados, costos directos iniciales ni incentivos), y se deprecia en 82,802.50 ÷ 4 = S/ 20,700.63 al año.\n\nTotal de pagos: 4 × 25,000 = S/ 100,000. La diferencia de S/ 17,197.50 frente al pasivo inicial es el **interés total** que se reconocerá a lo largo de los cuatro años, mayor en el primero y menor en el último.'},
   {l:2,t:'ab',p:'Una cadena de tiendas arrienda 12 locales por 10 años, con pagos anuales de S/ 48,000 cada uno. Tasa incremental 9%. El factor de anualidad (10 años, 9%) es 6.4177. Explica el efecto en el balance y en los ratios frente al tratamiento anterior.',
    s:'**Cálculo del reconocimiento inicial:**\nPago anual total = 12 locales × 48,000 = S/ 576,000\nPasivo por arrendamiento = 576,000 × 6.4177 = **S/ 3,696,595**\nActivo por derecho de uso = **S/ 3,696,595**\nDepreciación anual = 3,696,595 ÷ 10 = **S/ 369,660**\nInterés del año 1 = 3,696,595 × 9% = **S/ 332,694**\n\n**Efecto en el balance.** Supongamos que antes de la NIIF 16 la empresa tenía activo total S/ 6,000,000, pasivo S/ 2,400,000 y patrimonio S/ 3,600,000.\n\n| Indicador | Antes | Con NIIF 16 |\n|---|---|---|\n| Activo total | 6,000,000 | 9,696,595 |\n| Pasivo total | 2,400,000 | 6,096,595 |\n| Patrimonio | 3,600,000 | 3,600,000 |\n| Endeudamiento del activo | 40.0% | 62.9% |\n| Endeudamiento patrimonial | 0.67 veces | 1.69 veces |\n| ROA (con utilidad de 500,000) | 8.3% | 5.2% |\n\n**Efecto en el Estado de Resultados del año 1:**\n\n| Concepto | Antes | Con NIIF 16 |\n|---|---|---|\n| Gasto por alquiler | (576,000) | 0 |\n| Depreciación | 0 | (369,660) |\n| Intereses | 0 | (332,694) |\n| **Gasto total** | **(576,000)** | **(702,354)** |\n| EBITDA | X | X + 576,000 |\n| Utilidad operativa | X | X + 206,340 |\n| Utilidad neta antes de impuestos | X | X − 126,354 |\n\n**Lo que hay que explicar al directorio y al banco:**\n\n1. **La empresa no se endeudó más.** El pasivo de S/ 3.7 millones ya existía económicamente: eran los pagos comprometidos de los próximos 10 años. La NIIF 16 solo los hizo visibles. Antes figuraban en una nota de compromisos, y muchos analistas los capitalizaban por su cuenta con reglas aproximadas.\n2. **Los covenants pueden romperse sin que nada haya cambiado.** Si un contrato de préstamo exige endeudamiento patrimonial menor a 1.5 veces, la adopción lo lleva a 1.69 y activa un incumplimiento técnico. Esto se negocia **antes** de la adopción, acordando con el banco que el ratio se mida con criterios pre-NIIF 16 o ajustando el límite.\n3. **El resultado del año 1 cae S/ 126,354** respecto del criterio anterior, y mejorará hacia el final del plazo. Es un efecto de distribución, no de valor: en 10 años el gasto total es idéntico (S/ 5,760,000).\n4. **El EBITDA sube S/ 576,000**, lo que mejora artificialmente cualquier múltiplo de valuación. Si la empresa está en venta o negociando una línea de crédito, conviene presentar ambos criterios para que la comparación con años anteriores sea honesta.\n\n**Lo que hay que tener listo para el auditor:** el inventario completo de contratos con plazos y opciones de renovación (una renovación razonablemente cierta se incluye en el plazo), la justificación de la tasa incremental de préstamo utilizada, y la política adoptada para las dos excepciones.'},
   {l:3,t:'ab',p:'Compara el tratamiento contable (NIIF 16) y tributario de un arrendamiento operativo de oficina por 5 años, S/ 60,000 anuales, tasa 10%, y determina el impuesto diferido del primer año.',
    s:'**Tratamiento contable (NIIF 16),** con los datos del tema:\nPasivo y activo iniciales: S/ 227,448\nAño 1: depreciación S/ 45,489.60 + interés S/ 22,745 = **gasto contable de S/ 68,234.60**\n\n**Tratamiento tributario.** Para el Impuesto a la Renta, el gasto deducible de un arrendamiento operativo es el **alquiler devengado según el contrato**: **S/ 60,000** en el año 1. La depreciación del activo por derecho de uso y el interés imputado no son conceptos que la LIR reconozca en un arrendamiento operativo.\n\n**Diferencia del año 1:**\n68,234.60 − 60,000 = **S/ 8,234.60 de gasto contable no deducible este año**\n\nEs una diferencia **temporal**: a lo largo de los 5 años, el gasto total contable (S/ 300,000) iguala exactamente el gasto tributario (S/ 300,000). Solo cambia el momento.\n\n**Análisis por las bases (el método correcto de la NIC 12):**\n\n| Partida | Base contable | Base tributaria | Diferencia |\n|---|---|---|---|\n| Activo por derecho de uso (neto) | 181,958.40 | 0 | 181,958.40 imponible |\n| Pasivo por arrendamiento | 190,193.00 | 0 | 190,193.00 deducible |\n| **Diferencia neta deducible** | | | **8,234.60** |\n\nAl tener el activo y el pasivo el mismo origen, la NIC 12 permite evaluarlos conjuntamente. La diferencia neta deducible de S/ 8,234.60 genera:\n\n**Activo tributario diferido = 8,234.60 × 29.5% = S/ 2,429.21**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 2,429.21 | |\n| 88 | Impuesto a la Renta diferido | | 2,429.21 |\n\n**Evolución en los cinco años:**\n\n| Año | Gasto contable | Gasto tributario | Diferencia del año | Diferencia acumulada |\n|---|---|---|---|---|\n| 1 | 68,234.60 | 60,000 | 8,234.60 | 8,234.60 |\n| 2 | 64,508.60 | 60,000 | 4,508.60 | 12,743.20 |\n| 3 | 60,410.60 | 60,000 | 410.60 | 13,153.80 |\n| 4 | 55,902.60 | 60,000 | (4,097.40) | 9,056.40 |\n| 5 | 50,943.60 | 60,000 | (9,056.40) | 0 |\n| **Total** | **300,000** | **300,000** | **0** | |\n\nEl activo diferido crece hasta el año 3 y se revierte íntegramente al año 5. En ningún momento hay un beneficio o un perjuicio tributario definitivo: la tasa efectiva del impuesto no cambia por este concepto, que es precisamente la señal de que la diferencia es temporal y no permanente.\n\n**Lo que esto implica en la práctica:** hay que mantener un papel de trabajo por cada contrato de arrendamiento, con las dos columnas (contable y tributaria) para los cinco años. Sin ese control, al tercer o cuarto año nadie recuerda por qué existe el activo diferido y aparece la tentación de "limpiarlo", que es un error que luego cuesta reconstruir.'}
  ]
 },
 {
  id:'m6t5', titulo:'NIC 12: impuesto a las ganancias y diferido', min:15,
  cont:`La NIC 12 resuelve un problema concreto: el gasto por impuesto que aparece en el Estado de Resultados no debe ser el que se paga a SUNAT, sino el que **corresponde a la utilidad contable** del periodo. La diferencia entre ambos es el impuesto diferido.

# Diferencias permanentes y temporales
|Tipo|Qué es|Efecto|
|**Permanente**|Nunca se revierte: el gasto no será deducible jamás, o el ingreso nunca será gravado|Cambia la **tasa efectiva** del impuesto. No genera diferido|
|**Temporal**|Se revierte en periodos futuros: es un tema de **momento**|Genera activo o pasivo tributario diferido. No cambia la tasa efectiva|

Ejemplos peruanos típicos:
|Concepto|Tipo|
|Multas e intereses moratorios de SUNAT|Permanente|
|Exceso de gastos de representación|Permanente|
|Gastos sin comprobante de pago|Permanente|
|Dividendos recibidos de empresa domiciliada|Permanente (deducción)|
|Estimación de cobranza dudosa sin requisitos|Temporal|
|Desvalorización de existencias no acreditada|Temporal|
|Exceso de depreciación sobre el tope tributario|Temporal|
|Vacaciones devengadas no pagadas en el plazo|Temporal|
|Deterioro de activos (NIC 36)|Temporal|

# El método del balance
La NIC 12 no compara ingresos y gastos: compara **bases**.

$ Diferencia temporal = Base contable − Base tributaria
$ Si en un ACTIVO la base contable es mayor → diferencia IMPONIBLE → pasivo diferido
$ Si en un ACTIVO la base contable es menor → diferencia DEDUCIBLE → activo diferido
$ En un PASIVO, la lógica se invierte

|Partida|Base contable|Base tributaria|Diferencia|Resultado|
|Cuentas por cobrar netas (provisión no aceptada S/ 30,000)|270,000|300,000|30,000 deducible|Activo diferido|
|Maquinaria (depreciación contable mayor en S/ 18,000)|282,000|300,000|18,000 deducible|Activo diferido|
|Vacaciones por pagar no deducidas S/ 32,000|32,000|0|32,000 deducible|Activo diferido|

$ Activo o pasivo diferido = Diferencia temporal × Tasa esperada al momento de la reversión

# Reconocimiento del activo diferido
Un **activo** tributario diferido solo se reconoce si es **probable** que existan utilidades fiscales futuras contra las cuales usarlo. Esto es decisivo en empresas con pérdidas recurrentes: la pérdida tributaria arrastrable genera un activo diferido, pero si la empresa no tiene un plan de negocio creíble que muestre utilidades futuras, el activo **no se reconoce**. Un auditor exige la proyección que lo sustente.

# Arrastre de pérdidas tributarias en el Perú
|Sistema|Mecánica|Cuándo conviene|
|A|Se compensa la pérdida contra la renta neta de los **4 ejercicios** inmediatos posteriores|Cuando se espera recuperar rápido|
|B|Sin plazo, pero solo hasta el **50% de la renta neta** de cada ejercicio|Cuando la recuperación será lenta|

La elección se hace al presentar la declaración del ejercicio en que se genera la pérdida y no puede cambiarse mientras exista saldo por compensar.

# La conciliación que cierra el círculo
$ Gasto por impuesto del Estado de Resultados = Impuesto corriente + Variación del impuesto diferido
$ Tasa efectiva = Gasto por impuesto ÷ Utilidad contable antes de impuesto

Si la tasa efectiva se aleja mucho del 29.5%, la causa está en las diferencias permanentes, y eso es exactamente lo que hay que explicar en notas.

! El impuesto diferido **no es una cuenta por cobrar ni por pagar a SUNAT**. No se declara, no se paga y no se cobra: es un ajuste de medición contable. Presentarlo como "crédito tributario" en una negociación con un banco es un error de lectura que desnuda a quien lo comete.`,
  claves:['Diferencia permanente: cambia la tasa efectiva y no genera diferido. Temporal: genera diferido y no cambia la tasa efectiva.','El método del balance compara base contable y base tributaria de cada partida.','El activo tributario diferido se reconoce solo si es probable tener utilidades fiscales futuras que lo absorban.','Perú ofrece dos sistemas de arrastre de pérdidas: A (4 años) y B (sin plazo, límite del 50% de la renta neta).','El impuesto diferido es un ajuste contable, no un crédito ni una deuda frente a SUNAT.'],
  ej:[
   {l:1,t:'mc',p:'Una multa de SUNAT por S/ 5,000 no deducible, ¿genera impuesto diferido?',
    o:['Sí, un activo diferido de S/ 1,475','Sí, un pasivo diferido de S/ 1,475','No: es una diferencia permanente, nunca será deducible','Depende de si se paga en el ejercicio'],r:2,
    s:'No genera diferido. Es una diferencia **permanente**: la multa nunca será deducible, en ningún ejercicio. Su efecto es elevar la tasa efectiva del impuesto (la empresa paga 29.5% sobre una base que incluye un gasto que contablemente ya restó la utilidad). El diferido existe solo cuando la diferencia se revierte en el futuro.'},
   {l:1,t:'num',p:'Una provisión de cobranza dudosa de S/ 40,000 no cumple los requisitos para ser deducible este año. ¿Cuánto activo tributario diferido se reconoce con tasa del 29.5%?',
    u:'S/',r:11800,tol:1,
    s:'Activo diferido = 40,000 × 29.5% = **S/ 11,800**\n\nSe reconoce porque la diferencia es temporal: cuando se cumplan los requisitos (o cuando la deuda se castigue definitivamente), el gasto será deducible y el activo diferido se revertirá. El asiento es debe 37 Activo diferido y haber 88 Impuesto a la Renta diferido, lo que reduce el gasto por impuesto del Estado de Resultados y acerca la tasa efectiva al 29.5%.'},
   {l:2,t:'num',p:'Utilidad contable antes de impuesto S/ 600,000. Adiciones permanentes S/ 40,000. Adiciones temporales S/ 70,000. Tasa 29.5%. ¿Cuál es la tasa efectiva del impuesto?',
    u:'%',r:31.47,tol:0.2,
    s:'Renta neta imponible = 600,000 + 40,000 + 70,000 = S/ 710,000\nImpuesto corriente = 710,000 × 29.5% = S/ 209,450\nActivo diferido por las temporales = 70,000 × 29.5% = S/ 20,650\nGasto por impuesto = 209,450 − 20,650 = **S/ 188,800**\n\nTasa efectiva = 188,800 ÷ 600,000 = **31.47%**\n\nComprobación del origen: el exceso sobre 29.5% se explica solo por las diferencias permanentes: 40,000 × 29.5% = S/ 11,800; y 11,800 ÷ 600,000 = 1.97 puntos. 29.5% + 1.97% = 31.47% ✓. Las temporales no mueven la tasa efectiva, solo el momento del pago.'},
   {l:2,t:'ab',p:'Una empresa tuvo pérdida tributaria de S/ 400,000 en 2026 y proyecta utilidades de S/ 120,000 anuales a partir de 2027. ¿Qué sistema de arrastre elige y qué activo diferido reconoce?',
    s:'**Sistema A (4 años, sin límite de porcentaje):**\n\n| Año | Renta neta | Pérdida aplicada | Saldo |\n|---|---|---|---|\n| 2027 | 120,000 | 120,000 | 280,000 |\n| 2028 | 120,000 | 120,000 | 160,000 |\n| 2029 | 120,000 | 120,000 | 40,000 |\n| 2030 | 120,000 | 40,000 | 0 |\n\nSe recupera toda la pérdida dentro del plazo de 4 ejercicios y en 2030 se paga impuesto sobre S/ 80,000. **Recuperación total: S/ 400,000.**\n\n**Sistema B (sin plazo, hasta 50% de la renta neta):**\n\n| Año | Renta neta | Máximo aplicable (50%) | Saldo |\n|---|---|---|---|\n| 2027 | 120,000 | 60,000 | 340,000 |\n| 2028 | 120,000 | 60,000 | 280,000 |\n| ... | ... | 60,000 por año | ... |\n\nTardaría unos 7 ejercicios en agotarse y en cada uno se pagaría impuesto sobre S/ 60,000.\n\n**Recomendación: sistema A.** Con las proyecciones dadas, recupera la pérdida completa en 4 años y sin pagar impuesto en los tres primeros, lo que libera caja cuando la empresa más la necesita.\n\n**El riesgo del sistema A**, que hay que decir con claridad: si las utilidades proyectadas no se materializan (digamos que llegan a S/ 60,000 anuales), al cabo de 4 años solo se habrían compensado S/ 240,000 y los **S/ 160,000 restantes se pierden definitivamente**. El sistema B nunca pierde la pérdida, solo la recupera más lento. La elección es, en el fondo, una apuesta sobre la confiabilidad de la proyección.\n\n**Activo tributario diferido:** 400,000 × 29.5% = **S/ 118,000**, pero solo se reconoce en la medida en que sea **probable** disponer de utilidades fiscales futuras. Con una proyección sustentada de S/ 120,000 anuales durante 4 años (S/ 480,000 de renta neta disponible), el reconocimiento íntegro está justificado. Si la proyección fuera débil o la empresa llevara tres años de pérdidas, habría que reconocer solo la parte respaldada y revelar el resto.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 118,000.00 | |\n| 88 | Impuesto a la Renta diferido | | 118,000.00 |\n\n**Lo que el auditor va a pedir:** el plan de negocio aprobado por la gerencia, el histórico de cumplimiento de proyecciones anteriores y el análisis de sensibilidad. Un activo diferido de S/ 118,000 sostenido solo con optimismo es una de las correcciones más comunes en una auditoría.'},
   {l:3,t:'ab',p:'Prepara la nota de conciliación de la tasa efectiva: utilidad contable antes de impuesto S/ 2,000,000; multas S/ 25,000; exceso de representación S/ 60,000; gastos sin sustento S/ 35,000; dividendos recibidos de empresa domiciliada S/ 150,000; exceso de depreciación S/ 90,000; provisión de cobranza dudosa sin requisitos S/ 70,000.',
    s:'**Determinación del impuesto corriente**\n\n| Concepto | Importe | Tipo |\n|---|---|---|\n| Utilidad contable antes de impuesto | 2,000,000 | |\n| (+) Multas e intereses de SUNAT | 25,000 | Permanente |\n| (+) Exceso de gastos de representación | 60,000 | Permanente |\n| (+) Gastos sin comprobante de pago | 35,000 | Permanente |\n| (−) Dividendos de empresa domiciliada | (150,000) | Permanente |\n| (+) Exceso de depreciación sobre el tope | 90,000 | Temporal |\n| (+) Provisión de cobranza dudosa sin requisitos | 70,000 | Temporal |\n| **Renta neta imponible** | **2,130,000** | |\n| **Impuesto corriente (29.5%)** | **628,350** | |\n\n**Impuesto diferido**\nDiferencias temporales netas: 90,000 + 70,000 = S/ 160,000 deducibles en el futuro\nActivo tributario diferido = 160,000 × 29.5% = **S/ 47,200**\n\n**Gasto por impuesto del Estado de Resultados**\n628,350 − 47,200 = **S/ 581,150**\n\n**Nota de conciliación de la tasa efectiva** (así se presenta en los estados financieros):\n\n| Concepto | Importe | Tasa |\n|---|---|---|\n| Utilidad antes de impuesto | 2,000,000 | |\n| Impuesto a la tasa nominal (29.5%) | 590,000 | 29.50% |\n| Efecto de multas no deducibles | 7,375 | 0.37% |\n| Efecto del exceso de representación | 17,700 | 0.89% |\n| Efecto de gastos sin sustento | 10,325 | 0.52% |\n| Efecto de dividendos no gravados | (44,250) | (2.21%) |\n| **Gasto por impuesto reconocido** | **581,150** | **29.06%** |\n\n**Comprobación:** 590,000 + 7,375 + 17,700 + 10,325 − 44,250 = S/ 581,150 ✓\n\n**Cómo se lee esta nota:**\n\n1. La tasa efectiva (29.06%) está **por debajo** de la nominal (29.50%) gracias a los dividendos no gravados, que compensan con holgura el efecto de las tres partidas no deducibles.\n2. Las diferencias **temporales** (S/ 160,000) no aparecen en la conciliación de la tasa, y eso es correcto: afectan el momento del pago, no la carga total. Lo que sí hacen es separar el impuesto corriente (S/ 628,350, que es lo que se paga) del gasto contable (S/ 581,150, que es lo que se presenta).\n3. **S/ 47,200 de caja adelantada.** La empresa paga hoy un impuesto que recuperará cuando la depreciación y la provisión se vuelvan deducibles. Es un costo financiero real que casi nadie calcula: al 10% anual, adelantar S/ 47,200 por dos años cuesta cerca de S/ 9,900.\n4. **Las permanentes son dinero perdido:** 120,000 × 29.5% = S/ 35,400 que no vuelve nunca. De ese total, los S/ 35,000 de gastos sin comprobante y los S/ 25,000 de multas son evitables con control interno; el exceso de representación es una decisión de gasto que al menos debería tomarse sabiendo que su costo real es 29.5% mayor.\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 8811 | Impuesto a la Renta corriente | 628,350.00 | |\n| 40171 | Renta de tercera categoría | | 628,350.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 37 | Activo diferido - Impuesto a la Renta diferido | 47,200.00 | |\n| 8812 | Impuesto a la Renta diferido | | 47,200.00 |'}
  ]
 },
 {
  id:'m6t6', titulo:'Estado de flujos de efectivo y análisis financiero', min:17,
  cont:`El Estado de Flujos de Efectivo (NIC 7) explica por qué cambió la caja. Es el estado que el gerente entiende de inmediato y el que más rápido revela si una empresa es sana.

# Las tres actividades
|Actividad|Qué incluye|Qué significa un flujo negativo|
|**Operación**|Cobros a clientes, pagos a proveedores y trabajadores, tributos, intereses pagados|Alarma: el negocio consume caja en lugar de generarla|
|**Inversión**|Compra y venta de activo fijo, intangibles, inversiones financieras|Normal en empresas en crecimiento: está invirtiendo|
|**Financiamiento**|Préstamos recibidos y amortizados, aportes de capital, dividendos pagados|Normal: está pagando deuda o repartiendo utilidades|

> El patrón saludable de una empresa madura: **operación positiva**, inversión negativa (reinvierte) y financiamiento negativo (paga deuda y dividendos). El patrón peligroso: operación negativa financiada con préstamos. Eso se puede sostener un año; tres años así terminan en insolvencia.

# Método directo y método indirecto
El **directo** muestra los cobros y pagos reales por concepto. El **indirecto** parte de la utilidad y la ajusta. La NIC 7 prefiere el directo, pero el indirecto es el más usado porque se arma desde los estados financieros sin necesidad del detalle de tesorería.

$ Flujo de operación (indirecto) = Utilidad neta
$   + Depreciación, amortización y deterioros (gastos que no son salida de caja)
$   ± Resultado de venta de activos (se elimina: va a inversión)
$   − Aumentos de cuentas por cobrar e inventarios   + Disminuciones
$   + Aumentos de cuentas por pagar y provisiones    − Disminuciones

# Ejemplo con el método indirecto
Utilidad neta S/ 180,000; depreciación S/ 95,000; las cuentas por cobrar subieron S/ 60,000; los inventarios bajaron S/ 25,000; las cuentas por pagar subieron S/ 18,000; se compró maquinaria por S/ 150,000; se amortizó préstamo por S/ 70,000; se pagaron dividendos por S/ 40,000.

|Concepto|Importe|
|Utilidad neta|180,000|
|(+) Depreciación|95,000|
|(−) Aumento de cuentas por cobrar|(60,000)|
|(+) Disminución de inventarios|25,000|
|(+) Aumento de cuentas por pagar|18,000|
|**Flujo de operación**|**258,000**|
|(−) Compra de maquinaria|(150,000)|
|**Flujo de inversión**|**(150,000)**|
|(−) Amortización de préstamo|(70,000)|
|(−) Dividendos pagados|(40,000)|
|**Flujo de financiamiento**|**(110,000)**|
|**Variación neta de efectivo**|**(2,000)**|

Lectura: el negocio genera S/ 258,000 de caja operativa, suficiente para financiar su inversión y pagar deuda y dividendos, con una caída mínima de caja. Es un perfil sano. Si la utilidad hubiera sido la misma pero el flujo de operación negativo, el diagnóstico sería el opuesto, y la utilidad habría que mirarla con desconfianza.

# Los ratios que importan, con sus rangos de referencia
**Liquidez**
$ Liquidez corriente = Activo corriente ÷ Pasivo corriente        (referencia: 1.2 a 2.0)
$ Prueba ácida = (Activo corriente − Existencias) ÷ Pasivo corriente   (referencia: cercana a 1)
$ Capital de trabajo = Activo corriente − Pasivo corriente

**Gestión**
$ Rotación de inventarios = Costo de ventas ÷ Inventario promedio
$ Días de inventario = 360 ÷ Rotación
$ Periodo de cobro = (Cuentas por cobrar ÷ Ventas) × 360
$ Periodo de pago = (Cuentas por pagar ÷ Compras) × 360
$ Ciclo de conversión de efectivo = Días de inventario + Días de cobro − Días de pago

**Solvencia**
$ Endeudamiento del activo = Pasivo total ÷ Activo total
$ Endeudamiento patrimonial = Pasivo total ÷ Patrimonio      (bancos suelen alertar sobre 2)
$ Cobertura de intereses = Utilidad operativa ÷ Gastos financieros   (mínimo deseable: 3)

**Rentabilidad**
$ Margen bruto = Utilidad bruta ÷ Ventas
$ Margen neto = Utilidad neta ÷ Ventas
$ ROA = Utilidad neta ÷ Activo total
$ ROE = Utilidad neta ÷ Patrimonio

# El ciclo de conversión de efectivo, el número más útil
Es el tiempo que pasa entre pagar al proveedor y cobrar al cliente. Mientras más corto, menos capital de trabajo necesita el negocio.

|Empresa|Días de inventario|Días de cobro|Días de pago|Ciclo|
|Supermercado|25|2|60|(33) días|
|Distribuidora industrial|70|45|30|85 días|

El supermercado cobra antes de pagar: **su ciclo es negativo** y sus proveedores financian su operación. La distribuidora necesita financiar 85 días de operación con capital propio o deuda. Dos negocios rentables con necesidades de caja opuestas.

$ Necesidad de capital de trabajo ≈ (Ciclo en días ÷ 360) × Costo de ventas anual

! Un ratio aislado no dice nada. Siempre se compara con tres referencias: el **mismo ratio en periodos anteriores** (tendencia), el **sector** (benchmark) y los **objetivos** de la empresa. Y se interpreta en conjunto: una liquidez de 3.0 parece excelente, pero si viene de inventario acumulado sin rotación es un síntoma de problema, no de fortaleza.`,
  claves:['Tres actividades: operación, inversión y financiamiento; el patrón sano es operación positiva con inversión y financiamiento negativos.','El método indirecto parte de la utilidad y suma gastos que no son salida de caja, ajustando los cambios en el capital de trabajo.','Ciclo de conversión de efectivo = días de inventario + días de cobro − días de pago.','Un ciclo negativo significa que los proveedores financian la operación.','Ningún ratio se interpreta solo: se compara con la tendencia, con el sector y con los objetivos, y se lee en conjunto.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa compra una máquina por S/ 200,000. ¿En qué actividad del flujo de efectivo se presenta?',
    o:['Operación','Inversión','Financiamiento','No se presenta porque no afecta la utilidad'],r:1,
    s:'En actividades de inversión: es la adquisición de un activo de largo plazo. La depreciación de esa máquina, en cambio, sí aparece en el flujo de operación del método indirecto, sumándose a la utilidad porque es un gasto que no implicó salida de caja. Si la máquina se hubiera comprado con un préstamo específico, el desembolso del préstamo iría en financiamiento.'},
   {l:1,t:'num',p:'Activo corriente S/ 420,000; pasivo corriente S/ 280,000; existencias S/ 190,000. ¿Cuál es la prueba ácida?',
    r:0.82,tol:0.02,
    s:'Prueba ácida = (420,000 − 190,000) ÷ 280,000 = 230,000 ÷ 280,000 = **0.82**\n\nLa liquidez corriente es 420,000 ÷ 280,000 = 1.50, que parece cómoda. Pero al quitar las existencias, la empresa solo cubre 82 céntimos de cada sol que debe en el corto plazo. La diferencia entre ambos ratios mide cuánto de la liquidez depende de vender inventario, y por eso la prueba ácida es la que mira un banco cuando evalúa capacidad de pago inmediata.'},
   {l:2,t:'num',p:'Días de inventario 55; periodo de cobro 38; periodo de pago 42. ¿Cuál es el ciclo de conversión de efectivo?',
    u:'días',r:51,tol:1,
    s:'Ciclo = 55 + 38 − 42 = **51 días**\n\nLa empresa financia 51 días de operación. Con un costo de ventas anual de S/ 3,600,000, la necesidad de capital de trabajo es aproximadamente (51 ÷ 360) × 3,600,000 = **S/ 510,000**.\n\nTres palancas para reducirlo: bajar inventario (cada 10 días menos liberan unos S/ 100,000), acelerar la cobranza y negociar más plazo con proveedores. La tercera es gratis para la empresa, pero traslada el costo al proveedor y no siempre es sostenible como política.'},
   {l:2,t:'ab',p:'Una empresa muestra utilidad neta de S/ 300,000 y flujo de operación de −S/ 120,000. Depreciación S/ 80,000. ¿Qué está pasando y cómo lo investigarías?',
    s:'**El dato en sí:** la utilidad es positiva pero el negocio consume caja. Partiendo del método indirecto:\n\n300,000 (utilidad) + 80,000 (depreciación) = S/ 380,000 de punto de partida.\nPara llegar a −120,000, los cambios en el capital de trabajo tienen que restar **S/ 500,000**.\n\n**Las tres causas posibles, y cómo verificarlas:**\n\n1. **Las cuentas por cobrar se dispararon.** Verificación: comparar el periodo de cobro de este año con el anterior. Si pasó de 40 a 90 días, la empresa está vendiendo a crédito sin cobrar. Causas típicas: se flexibilizó la política de crédito para aumentar ventas, o hay facturas en disputa. Pregunta clave: ¿cuánto de la cartera tiene más de 90 días de vencido?\n2. **El inventario creció sin control.** Verificación: días de inventario frente al año anterior y análisis de rotación por línea de producto. Si se compró por volumen para obtener descuento, el descuento se pagó con caja inmovilizada.\n3. **Se pagó a proveedores mucho más rápido.** Verificación: periodo de pago. Puede deberse a que los proveedores recortaron el crédito por retrasos anteriores, lo que es una señal de alerta sobre la reputación comercial.\n\n**Una cuarta causa que hay que descartar siempre: que la utilidad no sea real.** Ingresos reconocidos antes de tiempo, gastos no provisionados (vacaciones, gratificaciones, cobranza dudosa) o costos de ventas subvaluados producen exactamente este cuadro: utilidad contable sin caja. La prueba es revisar si los ajustes de cierre del tema 2.4 se hicieron completos.\n\n**Cómo lo investigaría, en orden:**\n\n| Paso | Qué pide | Qué revela |\n|---|---|---|\n| 1 | Balance comparativo de dos años, línea por línea | Dónde está la variación de S/ 500,000 |\n| 2 | Reporte de antigüedad de cuentas por cobrar | Si la cartera está vencida o solo creció |\n| 3 | Rotación de inventario por línea | Si hay stock muerto |\n| 4 | Estado de cuenta de los cinco proveedores principales | Si cambiaron las condiciones de crédito |\n| 5 | Conciliación de los ajustes de cierre | Si la utilidad está completa |\n\n**La conclusión que no se puede evitar:** si la causa es el crecimiento del capital de trabajo por mayores ventas, la empresa necesita **financiamiento**, y el flujo negativo es el costo de crecer. Si la causa es cartera vencida o inventario sin rotación, la empresa necesita **gestión**, y conseguir un préstamo solo postergaría el problema haciéndolo más grande.'},
   {l:3,t:'ab',p:'Analiza esta empresa y emite un diagnóstico con tres recomendaciones. Ventas 4,800,000; costo de ventas 3,360,000; utilidad operativa 384,000; gastos financieros 168,000; utilidad neta 152,000. Activo corriente 1,560,000 (de los cuales inventarios 900,000 y cuentas por cobrar 580,000); activo total 2,900,000; pasivo corriente 1,340,000; pasivo total 2,180,000; patrimonio 720,000.',
    s:'**Cálculo de los indicadores**\n\n| Ratio | Cálculo | Resultado | Lectura |\n|---|---|---|---|\n| Liquidez corriente | 1,560,000 ÷ 1,340,000 | 1.16 | Ajustada |\n| Prueba ácida | (1,560,000 − 900,000) ÷ 1,340,000 | 0.49 | **Crítica** |\n| Capital de trabajo | 1,560,000 − 1,340,000 | 220,000 | Escaso para el nivel de ventas |\n| Días de inventario | (900,000 ÷ 3,360,000) × 360 | 96 días | **Muy alto** |\n| Periodo de cobro | (580,000 ÷ 4,800,000) × 360 | 44 días | Aceptable |\n| Endeudamiento del activo | 2,180,000 ÷ 2,900,000 | 75.2% | **Alto** |\n| Endeudamiento patrimonial | 2,180,000 ÷ 720,000 | 3.03 veces | **Muy alto** |\n| Cobertura de intereses | 384,000 ÷ 168,000 | 2.29 | **Por debajo del mínimo deseable (3)** |\n| Margen bruto | 1,440,000 ÷ 4,800,000 | 30.0% | Razonable |\n| Margen operativo | 384,000 ÷ 4,800,000 | 8.0% | Bajo |\n| Margen neto | 152,000 ÷ 4,800,000 | 3.2% | Bajo |\n| ROA | 152,000 ÷ 2,900,000 | 5.2% | Bajo |\n| ROE | 152,000 ÷ 720,000 | 21.1% | Alto, pero por apalancamiento |\n\n**Diagnóstico.** La empresa vende bien y tiene un margen bruto correcto (30%), pero está **sobreendeudada y con el inventario ahogándole la caja**. Tres hechos encadenados cuentan la historia:\n\n1. **96 días de inventario** inmovilizan S/ 900,000, que es el 58% de su activo corriente y S/ 180,000 más que todo su patrimonio.\n2. Para financiar ese inventario tomó **deuda**: el pasivo es 3 veces el patrimonio, y el costo financiero de S/ 168,000 se come el 44% de la utilidad operativa.\n3. El **ROE del 21% es engañoso.** No viene de eficiencia operativa (el ROA es 5.2%) sino del apalancamiento: hay poco patrimonio sobre el que dividir. Es la clase de ROE que se desploma en cuanto las ventas caen, porque los intereses son fijos y el margen no.\n\nLa cobertura de intereses de 2.29 es el indicador más preocupante: una caída de 15% en la utilidad operativa la llevaría cerca de 1.9, y ahí los bancos empiezan a exigir garantías adicionales o a no renovar líneas.\n\n**Tres recomendaciones, en orden de impacto**\n\n**1. Reducir el inventario de 96 a 60 días.** Liberaría (36 ÷ 360) × 3,360,000 = **S/ 336,000** de caja. Cómo: clasificación ABC del inventario, liquidación de los artículos sin movimiento en los últimos seis meses incluso con descuento (el descuento cuesta menos que el interés que se paga por financiarlos), y cambio de la política de compras de volumen a reposición más frecuente. Con esos S/ 336,000 se amortiza deuda y la cobertura de intereses sube a cerca de 2.9.\n\n**2. Capitalizar utilidades o pedir un aporte de capital.** Con un patrimonio de S/ 720,000 frente a S/ 2,180,000 de pasivo, la estructura no soporta más deuda. Un aporte de S/ 500,000 llevaría el endeudamiento patrimonial de 3.03 a 1.79 y abriría acceso a crédito más barato. Mientras tanto, **no repartir dividendos**: cada sol repartido empeora el ratio que está limitando el financiamiento.\n\n**3. Atacar el margen operativo.** Con 30% de margen bruto y 8% de margen operativo, los gastos de operación consumen 22 puntos. Hay que analizarlos por naturaleza y por función para identificar los tres mayores y definir metas concretas. Cada punto de margen operativo recuperado son S/ 48,000 anuales, que mejoran la cobertura de intereses y la caja al mismo tiempo.\n\n**Lo que no haría:** tomar más deuda de corto plazo para "mejorar la liquidez". Subiría la liquidez corriente en el papel y empeoraría todo lo demás. El problema de esta empresa no es que le falte dinero: es que tiene S/ 900,000 guardados en el almacén.'}
  ]
 }
 ]
}
);
