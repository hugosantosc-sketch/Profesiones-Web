/* Contenido del curso — m8 · Costos y contabilidad de gestión
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
 id:'m8', nivel:'Avanzado', titulo:'Costos y contabilidad de gestión',
 resumen:'Conceptos y clasificaciones del costo, valuación de inventarios bajo la NIC 2, los elementos del costo y su flujo, costeo por órdenes y por procesos, costeo estándar y ABC, decisiones de corto plazo y el presupuesto maestro.',
 temas:[
 {
  id:'m8t1', titulo:'El costo: conceptos, clasificaciones y usos de la información', min:26,
  cont:`Hasta ahora la contabilidad ha servido para **informar hacia afuera**: estados financieros, declaraciones, planilla. La contabilidad de costos sirve para **decidir hacia adentro**: cuánto cuesta un producto, qué precio poner, qué línea conservar, si conviene fabricar o comprar. Es la rama de la profesión que más valor agrega y la que menos se enseña bien.

# Costo, gasto y pérdida: tres cosas distintas
$ COSTO: sacrificio de recursos que se CAPITALIZA, porque genera un beneficio futuro
$ GASTO: sacrificio de recursos que se CONSUME en el periodo
$ PÉRDIDA: sacrificio de recursos SIN contraprestación ni beneficio

|Concepto|Dónde va|Ejemplo|
|**Costo**|Al **activo** (inventario), y recién al resultado cuando se vende|La materia prima consumida en el producto, la mano de obra de planta, la energía de la fábrica|
|**Gasto**|Directo al **resultado** del periodo|El sueldo del contador, la publicidad, el alquiler de la oficina administrativa|
|**Pérdida**|Al resultado, sin contrapartida|Un incendio no asegurado, una merma anormal, un robo|

> La distinción no es semántica: decide **cuándo** afecta al resultado. Un sueldo de S/ 5,000 pagado a un operario de planta se incorpora al inventario y no afecta la utilidad hasta que el producto se venda. El mismo importe pagado al contador reduce la utilidad del mes en que se devenga. Clasificar mal un concepto distorsiona el resultado y el valor del inventario a la vez.

# Las clasificaciones del costo
Horngren, Datar y Rajan lo plantean con una idea que conviene fijar desde el inicio: **no existe "el costo" de algo**; existe el costo calculado para un propósito. Las clasificaciones son las herramientas para construir el costo que cada propósito necesita.

**1. Por su relación con el objeto de costo**
|Tipo|Definición|
|**Directo**|Puede identificarse y rastrearse al objeto de costo de forma económicamente viable|
|**Indirecto**|Se relaciona con el objeto de costo pero debe **asignarse** mediante una base, porque no es rastreable|

$ Objeto de costo = aquello cuyo costo se quiere medir:
$ un producto, un lote, un servicio, un cliente, una sucursal, un proceso

! La clasificación **depende del objeto de costo elegido**. El sueldo del supervisor de planta es **indirecto** respecto de cada producto, pero **directo** respecto de la planta como objeto de costo. Antes de clasificar un costo hay que definir qué se está costeando.

**2. Por su comportamiento ante el volumen**
|Tipo|Comportamiento|Ejemplo|
|**Variable**|Varía **en total** en proporción al volumen; es **constante por unidad**|Materia prima, comisiones por venta, destajo|
|**Fijo**|Constante **en total** dentro del rango relevante; **decrece por unidad** al aumentar el volumen|Alquiler de planta, depreciación lineal, sueldo del supervisor|
|**Mixto o semivariable**|Tiene un componente fijo y uno variable|Energía eléctrica con cargo fijo y cargo por consumo; telefonía|
|**Escalonado o semifijo**|Fijo por tramos, salta al pasar cada tramo|Un supervisor por cada 20 operarios: al contratar el operario 21 el costo salta|

$ Función de costo: Costo total = Costo fijo + (Costo variable unitario × Volumen)
$ CT = CF + CVu × Q

**El rango relevante** es el intervalo de volumen dentro del cual la función de costo se mantiene válida. Fuera de ese rango, los "fijos" cambian: duplicar la producción puede exigir otra planta, y entonces el alquiler ya no es el mismo fijo.

**3. Por su capacidad de inventariarse**
|Tipo|Tratamiento|
|**Costo del producto** (inventariable)|Se capitaliza en el inventario y va al resultado como costo de ventas cuando se vende|
|**Costo del periodo** (no inventariable)|Va al resultado en el periodo en que se devenga|

En una empresa industrial, los costos del producto son los tres elementos de producción; los gastos de venta, de administración y financieros son del periodo. En una comercializadora, el costo del producto es el costo de adquisición.

**4. Por el momento de su determinación**
|Tipo|Cuándo se conoce|
|**Histórico o real**|Después de ocurrido|
|**Predeterminado**|Antes de ocurrido. Se subdivide en **estimado** (lo que probablemente costará) y **estándar** (lo que **debería** costar en condiciones de eficiencia)|

**5. Por su función**
|Función|Contenido|
|**Producción**|Los tres elementos del costo de fabricación|
|**Distribución o venta**|Promoción, comercialización, entrega|
|**Administración**|Dirección y apoyo de la organización|
|**Financiamiento**|Costo de obtener y usar recursos financieros|

# Los conceptos para decidir: la clasificación que más se ignora
Esta es la parte que convierte la contabilidad de costos en una herramienta de gestión.

|Concepto|Definición|Por qué importa|
|**Costo relevante**|El que **cambia** según la alternativa que se elija|Solo los relevantes entran en la decisión|
|**Costo irrelevante**|El que es igual en todas las alternativas|Incluirlo distorsiona la decisión|
|**Costo hundido** (sunk cost)|Ya se incurrió y **no se puede revertir**|**Siempre es irrelevante** para decisiones futuras|
|**Costo de oportunidad**|El beneficio que se **sacrifica** al elegir una alternativa en lugar de otra|No aparece en la contabilidad, pero es un costo real|
|**Costo evitable**|Desaparece si se elimina la actividad|Es el relevante en decisiones de eliminar una línea|
|**Costo inevitable**|Subsiste aunque se elimine la actividad|Eliminar la línea no lo elimina|
|**Costo diferencial**|La diferencia de costo entre dos alternativas|El número que decide|
|**Costo controlable**|La gestión de un responsable puede influir en él|Base de la evaluación de desempeño|

! **El costo hundido es el error de razonamiento más caro de la gestión.** Una empresa que invirtió S/ 300,000 en una máquina que no funciona bien no debe considerar esos S/ 300,000 al decidir si la reemplaza: ese dinero ya se gastó y no se recupera por ninguna de las dos vías. La decisión correcta compara los **costos futuros** de seguir con la máquina frente a los de reemplazarla. "Ya invertimos mucho para abandonar ahora" es, en términos de costos, un razonamiento equivocado.

> El **costo de oportunidad** es el espejo del anterior: no está en ningún libro contable y sí debe entrar en la decisión. Si un local propio se usa para un nuevo negocio, el costo de ese local no es cero: es el alquiler que se deja de cobrar. Un proyecto evaluado sin costo de oportunidad parece rentable cuando no lo es.

# La trampa del costo unitario
$ Costo unitario = Costo total ÷ Unidades producidas

Es la cifra más usada y la más mal usada de la contabilidad de costos, porque **contiene costos fijos** y por eso **cambia con el volumen**:

|Producción|Costos fijos|Costo variable unitario|Costo fijo unitario|**Costo unitario total**|
|5,000 u|60,000|8.00|12.00|**20.00**|
|10,000 u|60,000|8.00|6.00|**14.00**|
|15,000 u|60,000|8.00|4.00|**12.00**|

! Usar el costo unitario de un nivel de producción para decidir sobre otro nivel es un error sistemático. Si una empresa calculó S/ 20 de costo unitario produciendo 5,000 unidades y le piden 1,000 adicionales, el costo de esas mil no es S/ 20,000: es S/ 8,000, porque los fijos ya están pagados. Decisiones de este tipo se pierden o se ganan por entender esta tabla.

# Los tres usos de la información de costos
|Uso|Qué exige|Qué costo sirve|
|**Valuación de inventarios y determinación de resultados**|Cumplir la NIC 2 y la norma tributaria|Costo **completo** de producción (absorbente)|
|**Planeación y control**|Comparar lo real con lo esperado y asignar responsabilidades|Costo **estándar** y análisis de variaciones|
|**Toma de decisiones**|Comparar alternativas|Costos **relevantes**, margen de contribución, costo de oportunidad|

$ Conclusión fundamental: el mismo producto tiene costos DISTINTOS
$ según para qué se calcule, y las tres cifras son correctas

Un contador que solo sabe calcular el costo absorbente para valuar inventarios puede cumplir la NIC 2 y, al mismo tiempo, darle a la gerencia información que la lleve a rechazar un pedido rentable. Los tres usos son distintos y necesitan construcciones distintas.

# El marco normativo peruano
|Norma|Qué exige|
|**NIC 2**|Medición de inventarios: componentes del costo, fórmulas permitidas y valor neto realizable|
|**Art. 62 de la LIR**|Métodos de valuación admitidos tributariamente|
|**Art. 35 del Reglamento de la LIR**|Qué sistema de control de inventarios debe llevar la empresa, según su nivel de ingresos|
|**PCGE 2019**|Cuentas de las clases 2, 6, 7 y 9 para el registro del costo|
|**Libros**|Registro de Costos y Registro de Inventario Permanente Valorizado, según el umbral de ingresos|

Lo que sigue en este módulo recorre ese camino: primero cómo se mide el inventario, luego cómo se construye el costo de producción, después los sistemas para calcularlo, y finalmente cómo se usa para decidir y presupuestar.`,
  claves:['Costo se capitaliza en el inventario, gasto se consume en el periodo y pérdida no tiene contraprestación: la clasificación decide cuándo afecta al resultado.','Directo o indirecto depende del objeto de costo elegido; variable o fijo depende del rango relevante.','El costo hundido siempre es irrelevante para una decisión futura; el costo de oportunidad siempre es relevante aunque no esté en los libros.','El costo unitario contiene costos fijos y por eso cambia con el volumen: usarlo para decidir sobre otro nivel de producción es un error sistemático.','No existe "el costo" de un producto: existe el costo calculado para valuar inventarios, para controlar o para decidir, y las tres cifras son distintas y correctas.'],
  preg:[
   {p:'¿Por qué la distinción entre costo y gasto no es semántica sino de fondo?',
    r:'Porque decide **cuándo** el sacrificio de recursos afecta al resultado. Un costo se capitaliza en el inventario: permanece en el activo y recién se convierte en costo de ventas cuando el producto se vende. Un gasto va directo al resultado del periodo en que se devenga. El mismo importe de S/ 5,000 reduce la utilidad de este mes si es el sueldo del contador, y puede no afectarla en absoluto si es el sueldo de un operario cuyo producto sigue en el almacén. Clasificar mal un concepto distorsiona dos cosas a la vez: el resultado del periodo y el valor del inventario en el estado de situación financiera. Y como el inventario suele ser la partida más grande de una empresa industrial, el error se amplifica.'},
   {p:'¿Por qué un mismo costo puede ser directo o indirecto según el caso?',
    r:'Porque la clasificación se define **respecto de un objeto de costo**, y el objeto se elige según el propósito. El sueldo del supervisor de planta es **indirecto** si el objeto de costo es cada producto, porque no se puede rastrear cuánto de su tiempo corresponde a cada unidad y hay que asignarlo con una base. Pero es **directo** si el objeto de costo es la planta, porque allí sí se identifica íntegramente. La lección práctica es que la primera pregunta de cualquier análisis de costos no es "¿este costo es directo?" sino "¿qué estoy costeando?". Sin definir el objeto de costo, la clasificación no tiene sentido.'},
   {p:'¿Por qué el costo hundido es siempre irrelevante y qué error produce ignorarlo?',
    r:'Porque ya se incurrió y ninguna decisión futura puede revertirlo: es igual en todas las alternativas, y por definición un costo que no cambia entre alternativas no puede influir en la elección. El error que produce ignorar esto es el llamado sesgo de los costos hundidos: seguir invirtiendo en un proyecto malo porque "ya se invirtió mucho para abandonarlo ahora". Una empresa que gastó S/ 300,000 en una máquina defectuosa debe decidir comparando solo los **costos futuros** de cada camino: operar y mantener la máquina actual frente a comprar y operar otra. Los S/ 300,000 ya se perdieron en ambos escenarios. Reconocerlo duele, pero seguir financiando el error cuesta más.'},
   {p:'Una empresa usa un local propio para una nueva línea de negocio. ¿Cuál es el costo del local?',
    r:'El **costo de oportunidad**: el alquiler que la empresa deja de cobrar por no arrendar ese local a un tercero, o el beneficio de la mejor alternativa de uso. Contablemente el local no genera un gasto de alquiler, de modo que el costo no aparece en ningún registro; pero económicamente es un costo real, porque usarlo para esta línea implica renunciar a un ingreso. Un proyecto evaluado sin considerarlo parece más rentable de lo que es, y puede llevar a dedicar un activo valioso a una actividad que rinde menos que su mejor uso alternativo. Es el ejemplo clásico de por qué la contabilidad financiera no basta para decidir.'},
   {p:'¿Por qué se dice que no existe "el costo" de un producto?',
    r:'Porque el costo correcto depende del propósito. Para **valuar inventarios** y cumplir la NIC 2 se necesita el costo absorbente completo, con los costos indirectos fijos distribuidos según la capacidad normal. Para **controlar** la operación se necesita el costo estándar y sus variaciones, que dicen qué debería haber costado y por qué no fue así. Para **decidir** sobre un pedido adicional, eliminar una línea o fabricar en lugar de comprar, se necesitan solo los costos **relevantes**, que suelen ser los variables más los fijos evitables, y además el costo de oportunidad. Las tres cifras son distintas y las tres son correctas para su uso. Un contador que entrega la cifra de valuación de inventarios para una decisión de precios está dando información técnicamente correcta y prácticamente equivocada.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estos conceptos es costo del producto en una empresa industrial?',
    o:['El sueldo del contador general','La energía eléctrica consumida por las máquinas de planta','La publicidad del producto','El alquiler de la oficina administrativa'],r:1,
    s:'La **energía eléctrica de las máquinas de planta** es costo del producto: forma parte de los costos indirectos de fabricación, se capitaliza en el inventario y afecta al resultado solo cuando el producto se vende.\n\nLas otras tres son **costos del periodo**: el sueldo del contador es gasto de administración, la publicidad es gasto de venta y el alquiler de la oficina administrativa es gasto de administración. Todas van directo al resultado del periodo en que se devengan, sin pasar por el inventario.\n\nLa prueba práctica para distinguirlos: ¿el recurso se consumió **para transformar el producto**? Si sí, es costo; si se consumió para vender, administrar o financiar, es gasto.'},
   {l:1,t:'mc',p:'Una empresa compró hace dos años una máquina por S/ 300,000 que nunca funcionó bien. Hoy evalúa reemplazarla. ¿Qué dato es irrelevante para la decisión?',
    o:['El costo de la máquina nueva','Los S/ 300,000 pagados por la máquina actual','El costo de mantenimiento futuro de la máquina actual','El valor de venta actual de la máquina antigua'],r:1,
    s:'Los **S/ 300,000 pagados** son un **costo hundido**: ya se incurrieron y ninguna de las dos alternativas los modifica. Son irrelevantes para la decisión.\n\nLos otros tres sí son relevantes porque **cambian** según la alternativa: el costo de la máquina nueva se incurre solo si se compra; el mantenimiento futuro de la máquina actual se incurre solo si se conserva; y el valor de venta de la antigua es un ingreso que se obtiene solo si se reemplaza.\n\nEl razonamiento "ya invertimos S/ 300,000, no podemos abandonar ahora" es precisamente el sesgo que esta clasificación existe para evitar. Ese dinero se perdió en los dos escenarios; lo único que se decide hoy es qué cuesta menos de aquí en adelante.'},
   {l:2,t:'num',p:'Una empresa tiene costos fijos de S/ 60,000 y costo variable unitario de S/ 8. Calcula el costo unitario total si produce 15,000 unidades.',
    u:'S/',r:12,tol:0.05,
    s:'$ Costo total = CF + (CVu × Q) = 60,000 + (8 × 15,000) = 60,000 + 120,000 = 180,000\n$ Costo unitario = 180,000 ÷ 15,000 = **S/ 12.00**\n\nY la comparación que importa:\n\n| Producción | Costo fijo unitario | Costo variable unitario | **Costo unitario total** |\n|---|---|---|---|\n| 5,000 | 12.00 | 8.00 | **20.00** |\n| 10,000 | 6.00 | 8.00 | **14.00** |\n| 15,000 | 4.00 | 8.00 | **12.00** |\n\nEl costo variable unitario es **constante**; el fijo unitario **decrece**. Por eso el costo unitario total solo tiene sentido referido a un nivel de producción determinado, y usar el de un nivel para decidir sobre otro produce errores sistemáticos. La única cifra estable para decisiones marginales es el **costo variable unitario de S/ 8**.'},
   {l:2,t:'ab',p:'Clasifica los siguientes conceptos de una fábrica de muebles en: directo o indirecto respecto del producto, variable o fijo, y costo del producto o del periodo. Madera, pegamento, sueldo del carpintero a destajo, sueldo del supervisor de planta, depreciación de las sierras, alquiler de la fábrica, energía de las máquinas, comisión de los vendedores, sueldo del contador, flete de entrega al cliente, seguro de la planta, barniz.',
    s:'**Matriz de clasificación:**\n\n| Concepto | Directo / Indirecto | Variable / Fijo | Producto / Periodo | Elemento del costo |\n|---|---|---|---|---|\n| **Madera** | Directo | Variable | Producto | Materia prima directa |\n| **Pegamento** | Indirecto | Variable | Producto | CIF (material indirecto) |\n| **Carpintero a destajo** | Directo | Variable | Producto | Mano de obra directa |\n| **Supervisor de planta** | Indirecto | Fijo | Producto | CIF |\n| **Depreciación de las sierras** | Indirecto | Fijo | Producto | CIF |\n| **Alquiler de la fábrica** | Indirecto | Fijo | Producto | CIF |\n| **Energía de las máquinas** | Indirecto | Mixto | Producto | CIF |\n| **Comisión de vendedores** | Indirecto al producto | Variable | **Periodo** | Gasto de venta |\n| **Sueldo del contador** | Indirecto | Fijo | **Periodo** | Gasto de administración |\n| **Flete de entrega al cliente** | Indirecto | Variable | **Periodo** | Gasto de venta |\n| **Seguro de la planta** | Indirecto | Fijo | Producto | CIF |\n| **Barniz** | Directo o indirecto, según su materialidad | Variable | Producto | MPD o CIF |\n\n**Las cuatro observaciones que hacen la diferencia:**\n\n**1. El pegamento y el barniz: el criterio de materialidad.** Ambos se incorporan físicamente al producto, de modo que técnicamente podrían ser materia prima directa. Pero rastrear cuántos mililitros de pegamento lleva cada silla no es **económicamente viable**: el costo de medirlo supera el beneficio de la precisión. Por eso se tratan como material indirecto y entran a los CIF. El barniz, si su consumo es significativo y medible por producto, puede justificar el tratamiento como directo. La regla es la viabilidad económica del rastreo, no la presencia física.\n\n**2. La energía es mixta.** El recibo tiene un cargo fijo por potencia contratada y un cargo variable por consumo. Para presupuestar correctamente hay que separar ambos componentes, por ejemplo con el método de punto alto-punto bajo o con una regresión sobre los recibos históricos. Tratarla como enteramente variable o enteramente fija distorsiona cualquier proyección.\n\n**3. La comisión y el flete de entrega son variables pero del periodo.** Es la combinación que más confunde: varían con el volumen de ventas, pero **no se capitalizan en el inventario** porque se incurren después de terminado el producto. La NIC 2 excluye expresamente los costos de venta del costo del inventario. Variable no es sinónimo de inventariable.\n\n**4. El carpintero a destajo es mano de obra directa variable; si fuera asalariado, seguiría siendo directa pero sería fija.** La forma de retribución cambia el comportamiento ante el volumen, no la condición de directo. Esto importa mucho para el punto de equilibrio: una planta con personal a destajo tiene menos riesgo operativo que una con personal asalariado, porque su estructura de costos es más variable.\n\n**El cuadro resumen por elemento del costo:**\n\n| Elemento | Conceptos | ¿Inventariable? |\n|---|---|---|\n| Materia prima directa | Madera, barniz si es material | Sí |\n| Mano de obra directa | Carpintero | Sí |\n| CIF | Pegamento, supervisor, depreciación de sierras, alquiler de fábrica, energía, seguro de planta | Sí |\n| Gastos del periodo | Comisiones, contador, flete de entrega | No |'},
   {l:3,t:'ab',p:'Una fábrica tiene capacidad de 10,000 unidades y produce 8,000, con costos fijos de S/ 80,000 y costo variable unitario de S/ 18. Vende a S/ 35. Un cliente nuevo ofrece comprar 1,500 unidades a S/ 22 cada una, en una sola entrega y con su propia marca. El jefe de producción dice que no conviene porque el costo unitario es S/ 28. Analiza la decisión.',
    s:'**Primero, de dónde sale el S/ 28 del jefe de producción, y por qué no sirve para esta decisión.**\n\n$ Costo unitario actual = 18 + (80,000 ÷ 8,000) = 18 + 10 = S/ 28\n\nEl cálculo es aritméticamente correcto y conceptualmente inaplicable. Contiene S/ 10 de costo fijo unitario, y **los costos fijos no cambian** si se produce 1,500 unidades más: los S/ 80,000 se pagan igual. Incluirlos en el análisis es cargarle al pedido un costo que existiría de todos modos.\n\n**El análisis correcto: solo costos relevantes**\n\n| Concepto | ¿Relevante? | Por qué |\n|---|---|---|\n| Costo variable unitario de S/ 18 | **Sí** | Se incurre solo si se produce el pedido |\n| Costos fijos de S/ 80,000 | **No** | Se incurren igual, con o sin el pedido |\n| Precio de venta regular de S/ 35 | **No**, si no hay restricción de capacidad | El pedido no desplaza ventas regulares |\n\n**Cálculo del efecto incremental:**\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Ingreso incremental | 1,500 × 22 | 33,000 |\n| Costo variable incremental | 1,500 × 18 | (27,000) |\n| Costos fijos incrementales | ninguno | 0 |\n| **Utilidad incremental** | | **6,000** |\n\n**Verificación por estados de resultados comparados:**\n\n| Concepto | Sin el pedido | Con el pedido |\n|---|---|---|\n| Ventas | 8,000 × 35 = 280,000 | 280,000 + 33,000 = 313,000 |\n| Costo variable | 8,000 × 18 = (144,000) | 9,500 × 18 = (171,000) |\n| Margen de contribución | 136,000 | 142,000 |\n| Costos fijos | (80,000) | (80,000) |\n| **Utilidad operativa** | **56,000** | **62,000** |\n\nLa diferencia es exactamente **S/ 6,000**. El pedido conviene.\n\n**Pero la respuesta profesional no termina en el número. Hay seis condiciones que deben verificarse antes de aceptar:**\n\n| Nº | Condición | Por qué importa |\n|---|---|---|\n| 1 | **Capacidad disponible real** | 8,000 + 1,500 = 9,500, dentro de la capacidad de 10,000. ✓ Si el pedido excediera la capacidad, habría que **desplazar ventas regulares**, y el margen sacrificado de S/ 17 por unidad sería un **costo de oportunidad** que haría el pedido inconveniente |\n| 2 | **No erosión del precio regular** | El pedido es con **marca propia del cliente** y en una sola entrega: eso reduce el riesgo de que los clientes regulares descubran el precio menor y lo exijan. Es la condición más importante y la razón por la que el dato de la marca está en el enunciado |\n| 3 | **No hay costos fijos incrementales** | Verificar que no se requiera un turno adicional, un molde nuevo, un supervisor más o una ampliación. Cualquiera de ellos entra al cálculo como costo relevante |\n| 4 | **Costos variables específicos del pedido** | Empaque distinto, etiquetado con la marca del cliente, flete especial. Si suman más de S/ 4 por unidad, el pedido deja de convenir |\n| 5 | **Riesgo de crédito y condiciones de cobro** | Un cliente nuevo con 1,500 unidades es exposición concentrada. Si el cobro se demora seis meses, el costo financiero reduce el margen |\n| 6 | **Legalidad del precio diferenciado** | Vender a distintos precios a distintos clientes es válido, pero conviene que exista una razón comercial objetiva documentada (volumen, marca propia, entrega única), tanto por razones comerciales como para sustentar el **valor de mercado** ante SUNAT |\n\n**La observación sobre el valor de mercado, que es específicamente peruana:** el artículo 32 de la Ley del Impuesto a la Renta exige que las operaciones se realicen a valor de mercado. Vender a S/ 22 cuando el precio regular es S/ 35 puede ser observado si no hay sustento. La defensa es documental y sencilla de armar: el volumen del pedido, la entrega única, la marca propia del cliente y la ausencia de servicio postventa justifican el diferencial. Esa documentación debe existir **al momento de la operación**, no cuando llegue el requerimiento.\n\n**El escenario que cambiaría la respuesta.** Supongamos que la capacidad fuera de 9,000 unidades en lugar de 10,000. Entonces aceptar 1,500 obligaría a dejar de producir 500 de las regulares:\n\n| Concepto | Importe |\n|---|---|\n| Utilidad incremental del pedido | 6,000 |\n| Margen de contribución sacrificado: 500 × (35 − 18) | (8,500) |\n| **Efecto neto** | **(2,500)** |\n\nCon restricción de capacidad el pedido **destruye** valor. Por eso la primera pregunta de todo pedido especial es la capacidad disponible, no el precio.\n\n**La conclusión para la gerencia, en una línea:** el pedido aporta S/ 6,000 de utilidad incremental y conviene aceptarlo, siempre que se confirme que no hay costos fijos adicionales, que los costos variables específicos no superan S/ 4 por unidad y que la marca propia del cliente evita la erosión del precio regular. El costo unitario de S/ 28 no es el criterio aplicable, porque contiene costos fijos que se pagan de todos modos.'}
  ],
  proy:{
   t:'Estructura de costos de tu empresa',
   ctx:`Tu empresa ya tiene operaciones, tributos y personal. Ahora vas a mirarla desde los costos, que es la perspectiva con la que se toman las decisiones de precio, de producto y de capacidad.`,
   pasos:[
    'Define el objeto de costo principal de tu empresa: un producto, una línea, un servicio o un cliente. Justifica la elección según lo que la gerencia necesita decidir.',
    'Toma todos los conceptos de gasto y costo que registraste en los Módulos 2, 3 y 6 y clasifícalos en la matriz de tres dimensiones: directo o indirecto, variable o fijo, y del producto o del periodo.',
    'Para los conceptos mixtos, separa el componente fijo del variable usando los datos de al menos tres meses, con el método de punto alto-punto bajo.',
    'Construye la función de costo de tu empresa: CT = CF + CVu × Q, con sus parámetros reales, y señala el rango relevante dentro del cual es válida.',
    'Calcula el costo unitario a tres niveles de actividad distintos y muestra cómo cambia, identificando la parte estable (el costo variable unitario).',
    'Identifica en tu empresa al menos un costo hundido y un costo de oportunidad, y explica qué decisión afectaría cada uno.',
    'Elabora el cuadro de los tres usos de la información de costos aplicado a tu empresa: qué cifra usarías para valuar inventarios, qué cifra para controlar y qué cifra para decidir.'
   ],
   entrega:[
    'La definición del objeto de costo con su justificación.',
    'La matriz de clasificación de tres dimensiones de todos los conceptos.',
    'La separación de los costos mixtos y la función de costo con su rango relevante.',
    'El cuadro de costo unitario a tres niveles y el cuadro de los tres usos de la información.'
   ],
   crit:[
    'La clasificación de directo o indirecto se hace respecto del objeto de costo definido, no en abstracto.',
    'Los costos mixtos están separados con un método explícito y datos reales, no estimados a ojo.',
    'El cuadro de los tres usos entrega tres cifras distintas, con la explicación de para qué sirve cada una.'
   ],
   pista:'Para separar un costo mixto con el método de punto alto-punto bajo: CVu = (Costo del mes de mayor actividad − Costo del mes de menor actividad) ÷ (Actividad mayor − Actividad menor). Luego el CF se obtiene despejando en cualquiera de los dos puntos.'
  },
  proyInt:{
   t:'Diagnóstico de rentabilidad de tu empresa',
   integra:'1.1 a 8.1',
   ctx:`Vas a convertir los estados financieros que construiste en un diagnóstico de rentabilidad, que es lo que la gerencia realmente necesita y lo que un estado de resultados por naturaleza no entrega.`,
   pasos:[
    'Reconstruye el estado de resultados de tu empresa del Módulo 6 separando los costos variables de los fijos, en lugar de por naturaleza o por función.',
    'Calcula el margen de contribución total y la razón de contribución de tu empresa.',
    'Si tu empresa tiene más de una línea de producto o servicio, calcula el margen de contribución de cada una y ordénalas de mayor a menor.',
    'Identifica qué costos fijos son evitables por línea y cuáles son inevitables de la empresa en conjunto.',
    'Incorpora el costo laboral completo del Módulo 6 a la estructura de costos, distinguiendo el personal de producción (costo del producto) del de venta y administración (costo del periodo).',
    'Verifica el efecto de los tributos del Módulo 3 en la estructura: identifica qué tributos son costo (los no recuperables) y cuáles no (el IGV crédito fiscal).',
    'Elabora el informe de una página a la gerencia con la estructura de costos de la empresa, el margen de contribución y los tres hallazgos más relevantes.'
   ],
   entrega:[
    'El estado de resultados reconstruido en formato de contribución.',
    'El margen de contribución total y por línea, ordenado.',
    'La clasificación de los costos fijos en evitables e inevitables por línea.',
    'El informe de una página con los tres hallazgos.'
   ],
   crit:[
    'La separación de variables y fijos es consistente con la clasificación del proyecto anterior.',
    'El IGV crédito fiscal no figura como costo en ninguna parte del análisis.',
    'El informe identifica hallazgos accionables, no solo describe la estructura.'
   ],
   pista:'El hallazgo más frecuente en una empresa pequeña es que su línea de mayor venta no es la de mayor margen de contribución. Si eso ocurre en tu empresa, ya tienes el primer hallazgo del informe y una recomendación concreta.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'objeto de costo, clasificaciones, costos relevantes, rango relevante y los usos de la información de costos'},
   {a:'Don R. Hansen y Maryanne M. Mowen', o:'Cost Management: Accounting and Control', n:'comportamiento de los costos, separación de costos mixtos y costeo para la toma de decisiones'},
   {a:'David Noel Ramírez Padilla', o:'Contabilidad administrativa', n:'clasificaciones del costo, costos para decidir y el papel de la información de costos en la gestión'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'aplicación de las clasificaciones del costo a la realidad empresarial peruana'},
   {a:'Juan García Colín', o:'Contabilidad de costos', n:'conceptos fundamentales, terminología y clasificación de los costos'},
   {a:'NIC 2', o:'Inventarios', n:'componentes del costo del inventario y costos excluidos de su medición'}
  ]
 },
 {
  id:'m8t2', titulo:'Valuación de inventarios: NIC 2, métodos, mermas y desmedros', min:28,
  cont:`El inventario es, en la mayoría de las empresas comerciales e industriales, la partida más grande del activo y la que determina el costo de ventas. Medirlo mal distorsiona el estado de situación financiera, el resultado del ejercicio y el Impuesto a la Renta, los tres a la vez.

# La regla de medición de la NIC 2
$ Los inventarios se miden al MENOR entre:
$ el COSTO y el VALOR NETO REALIZABLE

$ Valor Neto Realizable (VNR) = Precio estimado de venta − Costos estimados de terminación
$                                − Costos estimados necesarios para la venta

Es una aplicación del principio de prudencia: un inventario no puede figurar en el activo por más de lo que la empresa espera obtener de él.

# Qué entra al costo del inventario
|Componente|Contenido|
|**Costos de adquisición**|Precio de compra, **aranceles de importación** y otros impuestos **no recuperables**, transporte, manipulación y otros costos directamente atribuibles. Se **deducen** los descuentos comerciales, las rebajas y las partidas similares|
|**Costos de transformación**|Mano de obra directa y la distribución sistemática de los costos indirectos de producción, fijos y variables|
|**Otros costos**|Solo en la medida en que sean necesarios para dar a los inventarios su condición y ubicación actuales|

**Qué NO entra al costo (la NIC 2 los excluye expresamente):**
|Excluido|Por qué|
|**Cantidades anormales de desperdicio** de materiales, mano de obra u otros costos de producción|No agregan valor: son pérdidas del periodo|
|**Costos de almacenamiento**, salvo los necesarios en el proceso productivo antes de una etapa posterior|El almacenaje del producto terminado es gasto|
|**Gastos de administración** que no contribuyan a dar al inventario su condición y ubicación actuales|No son de producción|
|**Costos de venta**|Se incurren después de terminado el producto|

! El **IGV que constituye crédito fiscal no es costo**. Es un activo por recuperar frente al fisco, no parte del valor del inventario. Capitalizarlo infla el inventario y el costo de ventas, y es uno de los errores más frecuentes en empresas pequeñas. En cambio, el IGV que **no** otorga derecho a crédito fiscal —por ejemplo el de una empresa del NRUS o el de una adquisición destinada a operaciones no gravadas— **sí** es costo, porque no se recupera.

**Los intereses:** por regla general no forman parte del costo del inventario. Solo se capitalizan cuando el inventario califica como un **activo apto** bajo la NIC 23, es decir cuando requiere un periodo sustancial para estar listo para la venta, como un licor que debe añejarse o una obra inmobiliaria en construcción.

# Las fórmulas de costo permitidas
|Fórmula|Cuándo se usa|
|**Identificación específica**|Obligatoria para inventarios **no intercambiables** y para bienes producidos y segregados para proyectos específicos|
|**Primeras Entradas Primeras Salidas (PEPS / FIFO)**|Supone que las unidades que se venden primero son las que se compraron primero|
|**Costo promedio ponderado**|Recalcula un costo medio tras cada entrada|

! **El método UEPS (LIFO) está prohibido por la NIC 2**, y tampoco se admite tributariamente en el Perú. Si encuentras una empresa que lo usa, su inventario y su costo de ventas están mal medidos, y la corrección tiene efecto en los estados financieros y en el Impuesto a la Renta.

$ La fórmula elegida debe aplicarse de forma CONSISTENTE a inventarios de naturaleza
$ y uso similares. Cambiarla es un cambio de política contable (NIC 8), no una decisión libre

**El efecto de la fórmula en los resultados.** Con precios **al alza**:
|Fórmula|Costo de ventas|Inventario final|Utilidad|
|**PEPS**|Menor (salen los costos antiguos, más bajos)|**Mayor** (queda lo más reciente y caro)|**Mayor**|
|**Promedio ponderado**|Intermedio|Intermedio|Intermedio|

> La diferencia no es trivial en contextos inflacionarios o con materias primas volátiles. PEPS muestra una utilidad mayor y un inventario más cercano al valor de reposición; el promedio suaviza el efecto de las variaciones de precio. Ninguna es "mejor": son políticas contables distintas con efectos distintos, y la elección debe revelarse en las notas.

**Técnicas de medición admitidas por conveniencia:** la NIC 2 permite el **costo estándar** y el **método de los minoristas** (retail), siempre que el resultado se aproxime al costo. El costo estándar debe revisarse con regularidad para que siga aproximándose.

# El valor neto realizable y su reversión
Cuando el VNR es menor que el costo, se reconoce una **desvalorización** que reduce el inventario y afecta al resultado del periodo.

@Reconocimiento de la desvalorización de existencias
695|Gastos por desvalorización de existencias|4,000.00|
29|Desvalorización de existencias|
|(estimación por deterioro)||4,000.00

$ Si en un periodo posterior el VNR se recupera, la desvalorización se REVIERTE,
$ hasta el límite del costo original. Nunca por encima del costo

! El tratamiento **tributario** difiere: la desvalorización por estimación **no es deducible** en el ejercicio en que se registra, porque es una provisión no permitida por la Ley del Impuesto a la Renta. Genera una **diferencia temporal** que se revierte cuando la pérdida se realiza efectivamente, por venta o por destrucción acreditada. Esta es una de las adiciones más frecuentes en la determinación anual.

# El marco tributario peruano
**Los métodos permitidos (art. 62 de la LIR):**
- Primeras entradas, primeras salidas (PEPS)
- Promedio diario, mensual o anual (ponderado o móvil)
- Identificación específica
- Inventario al detalle o por menor
- Existencias básicas

$ El método elegido debe aplicarse de forma uniforme y su cambio requiere
$ autorización de SUNAT, surtiendo efecto a partir del ejercicio siguiente

**El sistema de control que debe llevarse (art. 35 del Reglamento de la LIR):**
|Ingresos brutos anuales del ejercicio anterior|Obligación|
|**Más de 1,500 UIT**|**Contabilidad de costos** completa: Registro de Costos, Registro de Inventario Permanente en Unidades Físicas y Registro de Inventario Permanente Valorizado|
|**Entre 500 y 1,500 UIT**|**Registro de Inventario Permanente en Unidades Físicas**|
|**Menos de 500 UIT**|**Inventario físico** de sus existencias al final del ejercicio, con su valorización|

$ Con UIT de S/ 5,500 en 2026:
$ 1,500 UIT = S/ 8,250,000     500 UIT = S/ 2,750,000

! Determinar mal el umbral es un error con doble consecuencia: no llevar un libro obligatorio es una infracción del artículo 175 del Código Tributario, y además **habilita la determinación sobre base presunta** del artículo 64, con los efectos devastadores que viste en el Módulo 5.

# Mermas y desmedros: la diferencia que decide la deducibilidad
$ MERMA: pérdida FÍSICA, en volumen, peso o cantidad, por causas inherentes
$ a la naturaleza del bien o al proceso productivo

$ DESMEDRO: pérdida de orden CUALITATIVO e IRRECUPERABLE, que hace
$ al bien inutilizable para los fines a los que estaba destinado

|Aspecto|**Merma**|**Desmedro**|
|Naturaleza de la pérdida|**Cuantitativa**: hay menos|**Cualitativa**: hay lo mismo pero ya no sirve|
|Ejemplos|Evaporación de combustible, aserrín en la madera, sangría en el pesaje, retazos de tela, merma de horneado|Medicamentos vencidos, alimentos deteriorados, ropa de temporada pasada dañada, productos descontinuados|
|Qué exige acreditar|**Informe técnico** emitido por un profesional **independiente, competente y colegiado**, o por un organismo técnico competente, que contenga la **metodología** empleada y las **pruebas** realizadas|**Destrucción** de los bienes ante **notario público** o, en su defecto, juez de paz, con **comunicación previa a SUNAT**|
|Plazo de la comunicación|No aplica|**No menos de 2 días hábiles** antes de la fecha de destrucción|

**El procedimiento alternativo para desmedros de menor cuantía.** Cuando el **costo total de los bienes** a destruir en el ejercicio **no supera las 10 UIT**, no se requiere la intervención del notario: basta un **informe** que contenga la cantidad y el costo de los bienes, el lugar, la fecha y las horas de inicio y término de la destrucción, el método empleado, el motivo y el sustento técnico de su inutilidad, firmado por los responsables con sus datos de identidad.

**Los productos alimenticios perecibles** cuentan además con un procedimiento específico mediante el **Reporte de Desmedros de los Productos Alimenticios Perecibles**, regulado por resolución de superintendencia.

! Verifica el texto vigente del inciso c) del artículo 21 del Reglamento de la LIR y las resoluciones de SUNAT aplicables antes de ejecutar una destrucción: los plazos, los umbrales y los procedimientos alternativos han sido modificados en varias ocasiones. Una destrucción hecha sin cumplir el procedimiento deja el costo **no deducible**, y el bien ya no existe para probar nada.

**Mermas normales y anormales:**
|Tipo|Tratamiento contable|Tratamiento tributario|
|**Normal** (inherente al proceso, dentro del estándar técnico)|**Costo del producto**: se absorbe en las unidades buenas|Deducible, con informe técnico que sustente el porcentaje|
|**Anormal** (excede el estándar, por accidente o ineficiencia)|**Gasto o pérdida del periodo**, no se capitaliza (NIC 2)|Deducible si se acredita; el exceso no sustentado se repara|

$ Merma normal en el costo: aumenta el costo unitario de las unidades buenas
$ Merma anormal: va directo al resultado del periodo

# El Kardex: el instrumento que lo sostiene todo
El registro de inventario permanente valorizado, o Kardex, es donde se materializa la fórmula de costo elegida. Debe mostrar, por cada movimiento: la fecha, el documento, las entradas en unidades y valor, las salidas en unidades y valor, y el saldo en unidades, costo unitario y valor total.

$ Reglas de oro del Kardex:
$ 1) Toda entrada y toda salida tienen un documento que las respalda
$ 2) El saldo valorizado debe coincidir con el mayor de la cuenta de existencias
$ 3) El inventario físico debe coincidir con el Kardex; las diferencias se investigan, no se ajustan a ciegas
$ 4) Un ajuste sin explicación documentada es una contingencia, no una corrección

> La **diferencia de inventario** es, además, una de las causales que habilitan la determinación presunta del artículo 64 del Código Tributario, y la base de la presunción del artículo 69. Un Kardex que no cuadra con el físico no es solo un problema de control: es una puerta abierta a una determinación sobre base presunta.`,
  claves:['La NIC 2 mide el inventario al menor entre el costo y el valor neto realizable.','El IGV crédito fiscal no es costo del inventario; el IGV no recuperable sí lo es.','PEPS, promedio ponderado e identificación específica están permitidos; UEPS está prohibido por la NIC 2 y no se admite tributariamente.','La desvalorización contable no es deducible hasta que la pérdida se realice: genera una diferencia temporal.','Merma es pérdida cuantitativa y se acredita con informe técnico de profesional independiente y colegiado; desmedro es pérdida cualitativa y se acredita con destrucción ante notario, previa comunicación a SUNAT.'],
  preg:[
   {p:'¿Por qué el IGV crédito fiscal no forma parte del costo del inventario?',
    r:'Porque no es un sacrificio económico definitivo: es un **activo por recuperar**. La empresa paga ese IGV al proveedor y lo recupera aplicándolo contra el IGV que cobra en sus ventas, de modo que no representa un costo del bien sino un derecho frente al fisco. La NIC 2 es explícita: al costo de adquisición entran los impuestos **no recuperables**. Capitalizarlo tiene dos efectos simultáneos: infla el inventario en el activo e infla el costo de ventas cuando se vende, reduciendo la utilidad. En cambio, el IGV que la empresa **no puede** recuperar —por estar en el NRUS, por destinar la compra a operaciones no gravadas o por no cumplir los requisitos formales del crédito fiscal— sí es costo, porque ahí el desembolso es definitivo.'},
   {p:'¿Por qué la NIC 2 prohíbe el método UEPS?',
    r:'Porque produce una medición del inventario que se aleja progresivamente de la realidad económica. El UEPS supone que lo que se vende es lo último que entró, de modo que en el balance queda acumulado lo más antiguo: con el paso de los años, el inventario figura a costos históricos que pueden ser muy inferiores a los actuales, distorsionando el activo. Además permite manipular el resultado mediante compras de fin de ejercicio: una compra grande en diciembre, a precios altos, se trasladaría inmediatamente al costo de ventas y reduciría la utilidad del ejercicio. PEPS y promedio ponderado no permiten ese manejo con la misma facilidad. La prohibición es también tributaria en el Perú, de modo que el método no es una opción en ningún caso.'},
   {p:'¿Cuál es la diferencia entre merma y desmedro, y por qué importa tanto?',
    r:'La **merma** es una pérdida **cuantitativa**: hay físicamente menos bien del que había, por causas inherentes a su naturaleza o al proceso productivo, como la evaporación del combustible, el aserrín al cortar madera o la merma de horneado. El **desmedro** es una pérdida **cualitativa**: el bien sigue existiendo en la misma cantidad, pero ya no sirve para su destino, como un medicamento vencido o un alimento deteriorado. Importa porque los requisitos de acreditación son completamente distintos: la merma exige un **informe técnico** de profesional independiente, competente y colegiado, con la metodología y las pruebas realizadas; el desmedro exige la **destrucción** de los bienes ante notario público, con comunicación previa a SUNAT. Confundirlas lleva a cumplir el requisito equivocado, y el costo queda no deducible.'},
   {p:'¿Por qué la desvalorización de existencias no es deducible en el ejercicio en que se registra?',
    r:'Porque es una **estimación**, y la Ley del Impuesto a la Renta no admite la deducción de provisiones salvo las que ella expresamente permite. Contablemente, la NIC 2 obliga a reducir el inventario a su valor neto realizable cuando este es menor al costo, porque mantenerlo al costo sobrevaluaría el activo. Tributariamente, la pérdida recién se acepta cuando se **realiza**: cuando el bien se vende por debajo del costo o cuando se destruye con el procedimiento acreditado. La consecuencia es una **diferencia temporal**: la desvalorización se adiciona en el ejercicio del registro y se deduce en el ejercicio en que la pérdida se concreta. Es una de las adiciones más frecuentes de la determinación anual, y hay que llevarle control por años para no perder la deducción futura.'},
   {p:'¿Por qué un Kardex que no cuadra con el inventario físico es más grave que un simple problema de control?',
    r:'Porque la **diferencia de inventario** es una de las causales del artículo 64 del Código Tributario que habilitan la determinación sobre **base presunta**, y es además la base de la presunción del artículo 69, que convierte faltantes y sobrantes en ventas o compras omitidas. Los efectos de esa presunción son devastadores: el ingreso presunto se grava con IGV sin derecho a crédito fiscal y con renta sin deducción de costos, de modo que la carga efectiva se acerca al 50% del monto presumido, más multas e intereses. Por eso las diferencias de inventario deben investigarse y documentarse con su causa —rotura, merma, error de registro, salida sin documento— y no ajustarse a ciegas para que el papel cuadre. Un ajuste sin explicación documentada no resuelve el problema: lo registra.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estos conceptos SÍ forma parte del costo del inventario según la NIC 2?',
    o:['El IGV que constituye crédito fiscal','El flete pagado para traer la mercadería del proveedor','El almacenaje del producto terminado a la espera de venderse','La comisión del vendedor que colocó el producto'],r:1,
    s:'El **flete de compra** sí es costo: es un costo directamente atribuible a la adquisición, necesario para dar al inventario su ubicación actual.\n\nLos otros tres están excluidos. El **IGV crédito fiscal** es un impuesto recuperable, es decir un activo frente al fisco, no un costo. El **almacenaje del producto terminado** está expresamente excluido por la NIC 2, que solo admite los costos de almacenamiento **necesarios en el proceso productivo** antes de una etapa posterior de producción. Y la **comisión del vendedor** es un costo de venta, que se incurre después de que el producto está terminado y por eso nunca se capitaliza.'},
   {l:1,t:'num',p:'Un lote de inventario tiene costo de S/ 50,000. Se estima venderlo en S/ 58,000, con costos necesarios para la venta de S/ 12,000. ¿Cuál es el importe de la desvalorización a reconocer?',
    u:'S/',r:4000,tol:10,
    s:'$ VNR = Precio estimado de venta − Costos estimados necesarios para la venta\n$ VNR = 58,000 − 12,000 = **46,000**\n\nLa NIC 2 manda medir al **menor** entre costo (50,000) y VNR (46,000), de modo que el inventario debe quedar en **S/ 46,000**.\n\n$ Desvalorización = 50,000 − 46,000 = **S/ 4,000**\n\n**Asiento:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 695 | Gastos por desvalorización de existencias | 4,000.00 | |\n| 29 | Desvalorización de existencias | | 4,000.00 |\n\n**Y el efecto tributario:** esos S/ 4,000 **no son deducibles** en este ejercicio, porque son una estimación. Se **adicionan** en la determinación anual del Impuesto a la Renta y generan una **diferencia temporal** que se deducirá en el ejercicio en que la pérdida se realice, por la venta efectiva o por la destrucción acreditada. Hay que llevar control de esa diferencia por años para no perder la deducción.'},
   {l:2,t:'num',p:'Movimientos del mes: inventario inicial 100 unidades a S/ 20; compra de 200 a S/ 23; venta de 150; compra de 100 a S/ 26; venta de 120. Calcula el valor del inventario final con el método de promedio ponderado móvil.',
    u:'S/',r:3068,tol:5,
    s:'**Kardex con promedio ponderado móvil** (se recalcula el costo unitario después de cada entrada):\n\n| Movimiento | Unidades | Costo unit. | Valor | Saldo unid. | Saldo valor | **Nuevo PU** |\n|---|---|---|---|---|---|---|\n| Inv. inicial | 100 | 20.00 | 2,000 | 100 | 2,000.00 | 20.00 |\n| Compra | +200 | 23.00 | 4,600 | 300 | 6,600.00 | **22.00** |\n| Venta | −150 | 22.00 | (3,300) | 150 | 3,300.00 | 22.00 |\n| Compra | +100 | 26.00 | 2,600 | 250 | 5,900.00 | **23.60** |\n| Venta | −120 | 23.60 | (2,832) | 130 | 3,068.00 | 23.60 |\n\n**Inventario final = 130 unidades × S/ 23.60 = S/ 3,068.00**\n\n**Verificación de la identidad fundamental del Kardex:**\n$ Inventario inicial + Compras = Costo de ventas + Inventario final\n$ 2,000 + 7,200 = 6,132 + 3,068\n$ 9,200 = 9,200 ✓\n\nEsa verificación debe hacerse siempre al cerrar un Kardex: si no cuadra, hay un error de cálculo en alguna línea. Y el saldo valorizado de S/ 3,068 debe coincidir exactamente con el saldo del mayor de la cuenta de existencias.'},
   {l:2,t:'ab',p:'Con los mismos movimientos del ejercicio anterior, calcula el inventario final y el costo de ventas con PEPS, compara con el promedio ponderado y explica el efecto en los estados financieros.',
    s:'**Kardex con PEPS** (salen primero las unidades que entraron primero, manteniendo las capas de costo separadas):\n\n| Movimiento | Detalle de la salida | Costo de la salida | Capas en el saldo |\n|---|---|---|---|\n| Inv. inicial | | | 100 @ 20 |\n| Compra 200 @ 23 | | | 100 @ 20 + 200 @ 23 |\n| **Venta 150** | 100 @ 20 = 2,000<br>50 @ 23 = 1,150 | **3,150** | 150 @ 23 |\n| Compra 100 @ 26 | | | 150 @ 23 + 100 @ 26 |\n| **Venta 120** | 120 @ 23 = 2,760 | **2,760** | 30 @ 23 + 100 @ 26 |\n\n**Inventario final PEPS** = (30 × 23) + (100 × 26) = 690 + 2,600 = **S/ 3,290**\n**Costo de ventas PEPS** = 3,150 + 2,760 = **S/ 5,910**\n\nVerificación: 5,910 + 3,290 = 9,200 ✓\n\n**Comparación de los dos métodos:**\n\n| Concepto | **PEPS** | **Promedio ponderado** | Diferencia |\n|---|---|---|---|\n| Costo de ventas | 5,910 | 6,132 | **−222** |\n| Inventario final | 3,290 | 3,068 | **+222** |\n| Total | 9,200 | 9,200 | 0 |\n\n**Efecto en los estados financieros, suponiendo ventas de S/ 12,000:**\n\n| Concepto | PEPS | Promedio |\n|---|---|---|\n| Ventas | 12,000 | 12,000 |\n| Costo de ventas | (5,910) | (6,132) |\n| **Utilidad bruta** | **6,090** | **5,868** |\n| Inventario en el activo | 3,290 | 3,068 |\n| Impuesto a la Renta (29.5%) sobre la diferencia | mayor en 65.49 | menor |\n\n**La explicación del fenómeno:** los precios de compra subieron de S/ 20 a S/ 23 y luego a S/ 26. PEPS envía al costo de ventas las **capas más antiguas y baratas**, de modo que el costo de ventas es menor, la utilidad mayor y en el inventario final quedan las capas **más recientes y caras**. El promedio ponderado mezcla todas las capas y suaviza el efecto.\n\n**Las tres implicancias prácticas:**\n\n**1. En contextos de precios al alza, PEPS muestra más utilidad y paga más impuesto.** La diferencia de S/ 222 en este ejemplo pequeño se vuelve material en una empresa con rotación alta y materias primas volátiles.\n\n**2. El inventario de PEPS está más cerca del valor de reposición**, lo que hace el estado de situación financiera más informativo. Es una de las razones por las que la NIC 2 lo admite y rechaza el UEPS.\n\n**3. La elección es una política contable, no una decisión anual.** Debe aplicarse de forma **consistente** a inventarios de naturaleza y uso similares, revelarse en las notas, y su cambio constituye un cambio de política contable bajo la NIC 8. Tributariamente, además, el cambio de método **requiere autorización de SUNAT** y surte efecto desde el ejercicio siguiente. No se puede elegir cada año el método que convenga al resultado: eso es precisamente lo que las normas impiden.'},
   {l:3,t:'ab',p:'Una distribuidora de productos farmacéuticos tiene al cierre: medicamentos vencidos por S/ 85,000 de costo, una diferencia de inventario físico contra Kardex de 400 unidades faltantes valorizadas en S/ 18,000, y una merma de proceso de reenvasado del 2% que nunca ha documentado. Diseña el tratamiento completo de las tres situaciones.',
    s:'**Las tres situaciones son de naturaleza distinta y exigen tratamientos distintos. Confundirlas es el error que deja el costo no deducible.**\n\n**SITUACIÓN 1 — Medicamentos vencidos: S/ 85,000. Es un DESMEDRO.**\n\nLa pérdida es **cualitativa**: los medicamentos existen físicamente en la misma cantidad, pero ya no sirven para su destino. Y en el caso de productos farmacéuticos no hay alternativa: no pueden venderse ni donarse para consumo.\n\n| Requisito | Detalle |\n|---|---|\n| **Destrucción** | Ante **notario público** o, en su defecto, juez de paz |\n| **Comunicación previa a SUNAT** | **No menos de 2 días hábiles** antes de la fecha de destrucción |\n| Procedimiento alternativo | Solo si el costo total no supera **10 UIT** (S/ 55,000 en 2026). Aquí son S/ 85,000, de modo que **la intervención notarial es obligatoria** |\n| Acta | Con la relación detallada de los bienes, su costo, el método de destrucción, lugar, fecha y horas de inicio y término |\n| Normativa sectorial | Los residuos farmacéuticos tienen reglas propias de disposición final: hay que cumplirlas además de las tributarias |\n\n$ 85,000 > 10 UIT (55,000) → notario obligatorio, sin excepción\n\n**Secuencia y asientos:**\n\nAl cierre, mientras no se destruya, corresponde la desvalorización contable:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 695 | Gastos por desvalorización de existencias | 85,000.00 | |\n| 29 | Desvalorización de existencias | | 85,000.00 |\n\nY esos S/ 85,000 se **adicionan** en la determinación del Impuesto a la Renta: no son deducibles hasta la destrucción acreditada.\n\nUna vez destruidos con el procedimiento cumplido:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 29 | Desvalorización de existencias | 85,000.00 | |\n| 20 | Mercaderías | | 85,000.00 |\n\nY en el ejercicio de la destrucción se **deduce** la diferencia temporal.\n\n**El error que hay que evitar:** destruir primero y documentar después. Sin la comunicación previa a SUNAT en el plazo y sin el notario, el costo de S/ 85,000 queda **no deducible de forma definitiva**, y los bienes ya no existen para rehacer el procedimiento. Es una pérdida de S/ 85,000 de deducción, equivalente a S/ 25,075 de impuesto, por un trámite de dos días.\n\n**SITUACIÓN 2 — Diferencia de inventario de 400 unidades, S/ 18,000. Es la más grave.**\n\nUn faltante no documentado **no es** merma ni desmedro: es un faltante, y su tratamiento depende de su causa. Lo primero no es contabilizarlo, es **investigarlo**.\n\n| Causa posible | Cómo se acredita | Tratamiento |\n|---|---|---|\n| Error de registro en el Kardex | Reconstrucción documental de los movimientos | Corrección del registro, sin pérdida real |\n| Salida sin documento (venta no facturada) | Cruce con guías, pedidos y cobranzas | **Grave**: venta omitida, con IGV y renta |\n| Robo o hurto | **Denuncia policial** y, cuando corresponda, resolución fiscal de archivo o sentencia | Deducible como pérdida extraordinaria, con el sustento del inciso d) del art. 37 de la LIR |\n| Rotura o deterioro no registrado | Acta interna con fotografías y responsables | Merma o desmedro, según su naturaleza |\n| Merma de proceso no registrada | Informe técnico | Ver situación 3 |\n\n! **El riesgo tributario es el mayor de los tres casos.** La diferencia de inventario es una causal del artículo 64 del Código Tributario que **habilita la determinación sobre base presunta**, y es la base de la presunción del artículo 69, que convierte los faltantes en **ventas omitidas**.\n\n**Cuantificación del escenario presuntivo**, si SUNAT presume que las 400 unidades fueron vendidas sin declarar. Suponiendo un precio de venta de S/ 60 por unidad:\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Venta presunta | 400 × 60 | 24,000 |\n| IGV, sin derecho a crédito fiscal | 24,000 × 18% | 4,320 |\n| Renta, como renta neta sin deducción de costos | 24,000 × 29.5% | 7,080 |\n| Multa del 178.1 (50% del tributo omitido), antes de gradualidad | | ~5,700 |\n| **Exposición aproximada** | | **~17,100** |\n\nEs decir, un faltante de S/ 18,000 de costo puede generar una exposición tributaria de magnitud similar, además de perder la deducción del costo.\n\n**Acción obligatoria:** investigar y documentar la causa de cada unidad faltante **ahora**, mientras los documentos y las personas están disponibles. Dentro de dos años será imposible.\n\n**SITUACIÓN 3 — Merma de reenvasado del 2%, nunca documentada. Es una MERMA.**\n\nLa pérdida es **cuantitativa** y proviene del **proceso productivo**: al reenvasar hay producto que se adhiere a los envases, se derrama o queda por debajo del peso mínimo. Es inherente al proceso.\n\n| Requisito del inciso c) del art. 21 del Reglamento | Detalle |\n|---|---|\n| **Informe técnico** | Emitido por **profesional independiente, competente y colegiado**, o por organismo técnico competente |\n| Contenido | La **metodología** empleada y las **pruebas** realizadas |\n| Qué debe establecer | El **porcentaje de merma normal** del proceso, sustentado técnicamente |\n\n**Por qué hay que encargarlo ya, aunque la merma venga de años:** sin informe técnico, SUNAT puede **desconocer íntegramente** la merma y tratarla como faltante no sustentado, con el mismo riesgo presuntivo de la situación 2. Y el informe no es retroactivo por sí solo: debe encargarse a un profesional que analice el proceso, haga mediciones y determine el porcentaje técnico. Cuanto antes exista, antes cubre los ejercicios no prescritos con un sustento técnico del proceso.\n\n**El tratamiento contable de la merma, según sea normal o anormal:**\n\n| Tipo | Criterio | Contabilidad | Efecto |\n|---|---|---|---|\n| **Normal** (dentro del 2% técnico) | Inherente al proceso | **Costo del producto**: se absorbe en las unidades buenas | Aumenta el costo unitario |\n| **Anormal** (excede el 2%) | Accidente o ineficiencia | **Gasto del periodo** (NIC 2) | No se capitaliza |\n\n**Ejemplo del efecto en el costo unitario.** Si se reenvasan 10,000 litros y la merma normal es del 2%:\n\n$ Unidades buenas = 10,000 × 98% = 9,800 litros\n$ Si el costo total del lote es S/ 49,000:\n$ Costo unitario = 49,000 ÷ 9,800 = S/ 5.00 por litro buena\n$ (y no 49,000 ÷ 10,000 = S/ 4.90, que ignoraría la merma)\n\n**PLAN DE ACCIÓN CONSOLIDADO, en orden de urgencia:**\n\n| Prioridad | Acción | Plazo | Por qué ese orden |\n|---|---|---|---|\n| **1** | **Investigar y documentar** la causa de las 400 unidades faltantes | Inmediato | Es el mayor riesgo y la evidencia se deteriora cada día |\n| **2** | **Encargar el informe técnico de mermas** a un profesional colegiado | 30 días | Cubre el proceso y elimina el riesgo de que la merma se trate como faltante |\n| **3** | Programar la **destrucción de los vencidos** con comunicación a SUNAT y notario | Antes del cierre, si se quiere la deducción en el ejercicio | El procedimiento tiene plazos y no admite improvisación |\n| **4** | Registrar la **desvalorización** de los vencidos y controlar la diferencia temporal | Al cierre | Obligación de la NIC 2 y control del diferido |\n| **5** | Implementar el **control de inventarios**: toma física periódica, conciliación con Kardex, acta de cada diferencia con su causa | 60 días | Evita que el problema se repita |\n| **6** | Verificar el **sistema de inventarios obligatorio** según el art. 35 del Reglamento, por el nivel de ingresos | 15 días | No llevar un libro obligatorio es infracción y causal de presunción |\n\n**La conclusión para el informe a la gerencia:** de los tres problemas, el que parece menor —una diferencia de S/ 18,000— es el más peligroso, porque habilita una determinación presuntiva cuyo efecto excede largamente su importe. El de mayor valor —S/ 85,000 de vencidos— es el más fácil de resolver bien, y perder su deducción por no haber comunicado la destrucción con dos días de anticipación sería el error más caro y más evitable del ejercicio.'}
  ],
  proy:{
   t:'Kardex y valuación de inventarios de tu empresa',
   ctx:`Vas a construir el registro de inventario permanente valorizado de tu empresa y a verificar que cuadre con la contabilidad, que es exactamente lo que una fiscalización revisa primero.`,
   pasos:[
    'Determina el sistema de control de inventarios que le corresponde a tu empresa según el artículo 35 del Reglamento de la LIR, con sus ingresos brutos del ejercicio anterior y el umbral en UIT.',
    'Define la fórmula de costo que usará tu empresa, justifica la elección y redacta la política contable correspondiente para las notas a los estados financieros.',
    'Construye el Kardex valorizado de al menos dos productos de tu empresa, con todos los movimientos de los meses que registraste en el Módulo 2, aplicando la fórmula elegida.',
    'Verifica la identidad fundamental: inventario inicial más compras igual a costo de ventas más inventario final, y que el saldo valorizado coincida con el mayor de la cuenta de existencias.',
    'Rehaz el Kardex de uno de los productos con la otra fórmula permitida y compara el efecto en el costo de ventas, el inventario final, la utilidad y el Impuesto a la Renta.',
    'Realiza la prueba del valor neto realizable sobre tu inventario final: estima el precio de venta y los costos necesarios para vender, y determina si corresponde una desvalorización.',
    'Si tu empresa tiene o podría tener mermas o desmedros, clasifícalos correctamente y documenta los requisitos de acreditación de cada uno, con el procedimiento paso a paso.',
    'Elabora el procedimiento de toma de inventario físico de tu empresa: frecuencia, responsables, formato de conteo, tratamiento de diferencias y acta de cada diferencia con su causa.'
   ],
   entrega:[
    'La determinación del sistema de inventarios obligatorio con su sustento en UIT.',
    'Los dos Kardex valorizados con la verificación de la identidad fundamental.',
    'La comparación de las dos fórmulas con su efecto en la utilidad y el impuesto.',
    'La prueba de VNR, la clasificación de mermas y desmedros y el procedimiento de toma de inventario físico.'
   ],
   crit:[
    'El Kardex cuadra con el mayor de la cuenta de existencias, sol por sol.',
    'El IGV crédito fiscal no figura en ninguna parte del costo del inventario.',
    'El procedimiento de toma física establece que toda diferencia se documenta con su causa, no se ajusta a ciegas.'
   ],
   pista:'Antes de dar por cerrado un Kardex, haz siempre la prueba: inventario inicial + compras debe ser igual a costo de ventas + inventario final. Si no cuadra, hay un error de cálculo en alguna línea, y encontrarlo ahora cuesta minutos; encontrarlo en una fiscalización cuesta mucho más.'
  },
  proyInt:{
   t:'Reconstrucción del costo de ventas y ajuste de los estados financieros',
   integra:'1.1 a 8.2',
   ctx:`Vas a rehacer el costo de ventas de tu empresa con una valuación correcta y a propagar el efecto hasta el Impuesto a la Renta, que es el recorrido completo que ninguna empresa pequeña hace bien.`,
   pasos:[
    'Recalcula el costo de ventas de tu empresa de los meses del Módulo 2 usando el Kardex valorizado que construiste, y compáralo con el que habías registrado.',
    'Registra en el Libro Diario los asientos de ajuste que correspondan por la diferencia, y explica su origen.',
    'Verifica que ningún concepto excluido por la NIC 2 esté capitalizado en el inventario: IGV crédito fiscal, almacenaje de producto terminado, gastos de administración, costos de venta y mermas anormales.',
    'Aplica la prueba de valor neto realizable al inventario final y registra la desvalorización si corresponde.',
    'Actualiza el Libro Mayor, el balance de comprobación y los estados financieros del Módulo 6 con los nuevos saldos de existencias y costo de ventas.',
    'Recalcula el Impuesto a la Renta anual incorporando: la adición por la desvalorización no deducible, y la adición por cualquier merma o desmedro sin acreditación suficiente.',
    'Construye el cuadro de control de diferencias temporales: por cada adición, el ejercicio en que se revertirá y el documento que habilitará la deducción.',
    'Elabora la nota a los estados financieros sobre inventarios: política contable, fórmula de costo aplicada, composición por tipo de existencia y desvalorización reconocida.',
    'Actualiza el registro de contingencias del subtema 5.1 con los riesgos de inventario: diferencias no documentadas, mermas sin informe técnico y desmedros sin destrucción acreditada.'
   ],
   entrega:[
    'El costo de ventas recalculado con sus asientos de ajuste.',
    'La verificación de conceptos excluidos y la prueba de VNR.',
    'Los estados financieros actualizados y el recálculo del Impuesto a la Renta.',
    'El cuadro de control de diferencias temporales, la nota de inventarios y el registro de contingencias actualizado.'
   ],
   crit:[
    'La verificación de conceptos excluidos cubre los cinco de la NIC 2, uno por uno.',
    'El cuadro de diferencias temporales identifica el documento concreto que habilitará cada deducción futura.',
    'Las contingencias de inventario están cuantificadas considerando el riesgo de determinación presunta, no solo el costo no deducible.'
   ],
   pista:'El cuadro de control de diferencias temporales es el documento que más deducciones salva. Una desvalorización adicionada en 2026 y nunca deducida porque nadie recordó que existía es dinero perdido, y es sorprendentemente común.'
  },
  fuentes:[
   {a:'NIC 2', o:'Inventarios', n:'medición al menor entre costo y VNR, componentes y exclusiones del costo, fórmulas permitidas, prohibición del UEPS y reversión de la desvalorización'},
   {a:'TUO de la Ley del Impuesto a la Renta', o:'Artículos 37 inciso f) y 62', n:'deducción de mermas y desmedros y métodos de valuación de existencias admitidos'},
   {a:'D.S. 122-94-EF — Reglamento de la LIR', o:'Artículos 21 inciso c) y 35', n:'requisitos de acreditación de mermas y desmedros y sistema de control de inventarios según el nivel de ingresos'},
   {a:'Víctor Ferrer Quea', o:'Estados financieros: análisis e interpretación por sectores económicos', n:'valuación de existencias, Kardex y presentación del inventario en los estados financieros'},
   {a:'Mario Apaza Meza', o:'PCGE y NIIF aplicadas a sectores económicos', n:'dinámica de las cuentas de existencias y tratamiento de la desvalorización'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'mermas normales y anormales y su efecto en el costo unitario'}
  ]
 },
 {
  id:'m8t3', titulo:'Los elementos del costo, el flujo de producción y el estado de costo de producción', min:27,
  cont:`Una empresa comercial compra y vende: su costo es el precio de adquisición. Una empresa industrial **transforma**, y por eso su costo se construye. Este subtema es el núcleo técnico de la contabilidad de costos.

# Los tres elementos del costo de producción
|Elemento|Definición|Ejemplo en una panadería|
|**Materia Prima Directa (MPD)**|Materiales que se identifican con el producto y cuyo rastreo es económicamente viable|Harina, azúcar, levadura|
|**Mano de Obra Directa (MOD)**|Remuneración del personal que transforma directamente la materia prima|Panaderos y maestros de producción|
|**Costos Indirectos de Fabricación (CIF)**|Todos los demás costos de producción: materiales indirectos, mano de obra indirecta y otros costos de planta|Sal, levadura en pequeñas dosis, supervisor, energía de los hornos, depreciación, alquiler de la planta|

$ COSTO PRIMO = Materia Prima Directa + Mano de Obra Directa
$ COSTO DE CONVERSIÓN = Mano de Obra Directa + CIF
$ COSTO DE PRODUCCIÓN = MPD + MOD + CIF

> El **costo primo** es lo directamente identificable con el producto. El **costo de conversión** es lo que cuesta **transformar** la materia prima en producto. Nótese que la MOD está en los dos: es a la vez directa al producto y parte del proceso de transformación. No es un error de los conceptos, son dos miradas distintas del mismo costo.

# Lo que compone los CIF
|Categoría|Contenido|
|**Materiales indirectos**|Materiales que se incorporan al producto pero cuyo rastreo individual no es viable: pegamento, hilo, sal, lubricantes|
|**Mano de obra indirecta**|Personal de planta que no transforma directamente: supervisores, almaceneros de planta, personal de mantenimiento, control de calidad|
|**Otros costos indirectos**|Alquiler y seguro de planta, depreciación de maquinaria, energía y agua de producción, mantenimiento, útiles de planta|

! La **mano de obra ociosa** y el **tiempo extra** merecen cuidado. El tiempo ocioso normal e inevitable forma parte de los CIF; el ocioso por ineficiencia o por un paro extraordinario es **pérdida del periodo**. Las horas extras de producción se tratan como CIF en su componente de sobretasa, salvo que el pedido específico las haya causado, en cuyo caso pueden cargarse directamente a ese pedido.

# El flujo del costo: tres almacenes encadenados
$ ALMACÉN DE MATERIAS PRIMAS → PRODUCTOS EN PROCESO → PRODUCTOS TERMINADOS → COSTO DE VENTAS

|Etapa|Qué ocurre|Cuenta del PCGE|
|Se compran materias primas|Entran al almacén|**24** Materias primas|
|Se consumen en producción|Salen del almacén al proceso|**23** Productos en proceso|
|Se agrega MOD y CIF|El proceso acumula los tres elementos|**23** Productos en proceso|
|Se termina la producción|Pasa al almacén de terminados|**21** Productos terminados|
|Se vende|Sale del almacén al resultado|**69** Costo de ventas|

**La lógica del método peruano por naturaleza y destino.** El PCGE 2019 registra los costos **por naturaleza** en el elemento 6 y luego los traslada **por destino** a las cuentas de costos del elemento 9, con contrapartida en la cuenta **79 Cargas imputables a cuenta de costos y gastos**.

@Compra de materias primas por S/ 50,000 más IGV
602|Compras de materias primas|50,000.00|
401|Gobierno central — IGV|9,000.00|
421|Facturas por pagar||59,000.00

@Ingreso de las materias primas al almacén
24|Materias primas|50,000.00|
612|Variación de existencias — materias primas||50,000.00

@Consumo de materias primas en producción
612|Variación de existencias — materias primas|45,000.00|
24|Materias primas||45,000.00

@Destino del consumo al centro de costos de producción
91|Costos de producción|45,000.00|
79|Cargas imputables a cuenta de costos y gastos||45,000.00

@Producción terminada del periodo por S/ 120,000
21|Productos terminados|120,000.00|
711|Variación de productos terminados||120,000.00

@Venta: reconocimiento del costo de ventas
692|Costo de ventas — productos terminados|95,000.00|
21|Productos terminados||95,000.00

$ Verificación: el saldo de la cuenta 21 debe coincidir con el Kardex
$ de productos terminados, y el de la 23 con el inventario de productos en proceso

# El estado de costo de producción y ventas
Es el documento que reconstruye el costo desde la materia prima hasta el costo de ventas. Conviene memorizar su estructura, porque es el esqueleto de todo el módulo.

$ Inventario inicial de materias primas
$ (+) Compras netas de materias primas
$ (−) Inventario final de materias primas
$ = MATERIA PRIMA CONSUMIDA
$
$ (+) Mano de obra directa
$ (+) Costos indirectos de fabricación
$ = COSTO DE PRODUCCIÓN DEL PERIODO
$
$ (+) Inventario inicial de productos en proceso
$ (−) Inventario final de productos en proceso
$ = COSTO DE PRODUCCIÓN TERMINADA
$
$ (+) Inventario inicial de productos terminados
$ (−) Inventario final de productos terminados
$ = COSTO DE VENTAS

**Un ejemplo completo:**
|Concepto|Importe|
|Inventario inicial de materias primas|15,000|
|(+) Compras de materias primas|80,000|
|(−) Inventario final de materias primas|(12,000)|
|**= Materia prima consumida**|**83,000**|
|(+) Mano de obra directa|45,000|
|(+) Costos indirectos de fabricación|38,000|
|**= Costo de producción del periodo**|**166,000**|
|(+) Inventario inicial de productos en proceso|10,000|
|(−) Inventario final de productos en proceso|(14,000)|
|**= Costo de producción terminada**|**162,000**|
|(+) Inventario inicial de productos terminados|20,000|
|(−) Inventario final de productos terminados|(18,000)|
|**= Costo de ventas**|**164,000**|

> La lógica de cada bloque es siempre la misma: **lo que había, más lo que entró, menos lo que quedó, es lo que salió**. Si entiendes esa frase, no necesitas memorizar el estado: lo reconstruyes.

# La asignación de los CIF: el problema central
Los CIF no se pueden rastrear al producto, de modo que hay que **asignarlos** con una base. Y como muchos se conocen al final del periodo (el recibo de energía, el mantenimiento), esperar a conocerlos impediría costear la producción durante el mes. La solución es la **tasa predeterminada**.

$ Tasa predeterminada de CIF = CIF presupuestados del periodo ÷ Base presupuestada
$ CIF aplicados = Tasa predeterminada × Base real utilizada

**Las bases de asignación habituales:**
|Base|Cuándo conviene|
|**Horas de mano de obra directa**|Cuando el proceso es intensivo en trabajo manual|
|**Costo de la mano de obra directa**|Similar, y más simple de obtener del sistema de planilla|
|**Horas-máquina**|Cuando el proceso es intensivo en maquinaria: es la base más común en la industria|
|**Unidades producidas**|Solo cuando los productos son homogéneos y consumen recursos similares|
|**Costo de la materia prima**|Poco recomendable, salvo que haya correlación demostrada|

! La base debe guardar una **relación causal** con el consumo de los CIF. Asignar los CIF de una planta automatizada en función de las horas de mano de obra directa produce costos unitarios absurdos: los productos más manuales absorben los costos de las máquinas que no usan. Es, además, la razón histórica por la que nació el costeo ABC.

# La sobreaplicación y la subaplicación de CIF
Como la tasa es predeterminada, al final del periodo los CIF aplicados casi nunca coinciden con los reales.

$ CIF reales > CIF aplicados → SUBAPLICACIÓN (se aplicó de menos)
$ CIF reales < CIF aplicados → SOBREAPLICACIÓN (se aplicó de más)

|Magnitud de la variación|Tratamiento|
|**Poco significativa**|Se ajusta íntegramente contra el **costo de ventas** del periodo|
|**Significativa**|Se **prorratea** entre productos en proceso, productos terminados y costo de ventas, en función de los CIF aplicados a cada uno|

> La variación también es información de gestión: una subaplicación persistente indica que el presupuesto de CIF está subestimado o que la base real es menor a la prevista. Investigar su causa es más útil que ajustarla y seguir.

# La regla de la capacidad normal de la NIC 2
Aquí está el punto donde la NIC 2 impone un límite al costeo y donde más empresas se equivocan.

$ NIC 2: la distribución de los COSTOS INDIRECTOS FIJOS se basa en la
$ CAPACIDAD NORMAL de producción, no en la producción real
$ El importe no distribuido por baja producción es GASTO DEL PERIODO

**El ejemplo que lo demuestra.** CIF fijos de S/ 200,000, capacidad normal de 10,000 unidades, producción real de 7,000 unidades:

|Criterio|Cálculo|CIF fijo unitario|Al inventario|Al gasto|
|**Incorrecto**: repartir todo entre lo producido|200,000 ÷ 7,000|28.57|200,000|0|
|**Correcto (NIC 2)**: usar la capacidad normal|200,000 ÷ 10,000|**20.00**|**140,000**|**60,000**|

$ 7,000 unidades × 20 = 140,000 al costo del inventario
$ 3,000 unidades de capacidad ociosa × 20 = 60,000 al GASTO del periodo

! La diferencia es decisiva: el criterio incorrecto capitaliza S/ 60,000 de **capacidad ociosa** en el inventario, inflando el activo y diferiendo una pérdida que ya ocurrió. El criterio de la NIC 2 reconoce que no producir no abarata el producto: encarece a la empresa, y ese encarecimiento es un gasto del periodo, no un valor del inventario.

$ En sentido inverso: si la producción real EXCEDE la capacidad normal,
$ el CIF fijo unitario se calcula con la producción REAL, para no sobrevaluar el inventario

**El efecto en el resultado.** Con el criterio correcto, un mes de baja producción muestra un gasto por capacidad ociosa que la gerencia puede ver y gestionar. Con el criterio incorrecto, ese problema queda escondido en el inventario y aparece más tarde, repartido en el costo de ventas de varios meses, cuando ya nadie puede relacionarlo con su causa.`,
  claves:['Los tres elementos son materia prima directa, mano de obra directa y costos indirectos de fabricación; costo primo es MPD más MOD y costo de conversión es MOD más CIF.','El flujo encadena tres almacenes: materias primas, productos en proceso y productos terminados, antes de llegar al costo de ventas.','La lógica de cada bloque del estado de costo de producción es siempre la misma: lo que había, más lo que entró, menos lo que quedó, es lo que salió.','Los CIF se asignan con una tasa predeterminada sobre una base que debe guardar relación causal con su consumo.','La NIC 2 obliga a distribuir los CIF fijos según la capacidad normal: la capacidad ociosa es gasto del periodo, no valor del inventario.'],
  preg:[
   {p:'¿Por qué la mano de obra directa aparece tanto en el costo primo como en el de conversión?',
    r:'Porque son dos clasificaciones que responden a preguntas distintas. El **costo primo** agrupa lo que es **directamente identificable** con el producto: la materia prima directa y la mano de obra directa. El **costo de conversión** agrupa lo que cuesta **transformar** esa materia prima en producto terminado: la mano de obra directa y los costos indirectos. La mano de obra directa cumple ambas condiciones a la vez, porque es rastreable al producto y es parte del proceso de transformación. No hay redundancia ni error: son dos miradas del mismo conjunto de costos, útiles para análisis distintos. El costo de conversión, por ejemplo, es el indicador clave en industrias donde la materia prima la provee el cliente, como la maquila.'},
   {p:'¿Por qué se usa una tasa predeterminada de CIF en lugar de los costos reales?',
    r:'Por dos razones prácticas. La primera es de **oportunidad**: muchos CIF se conocen recién al cierre del mes o después —el recibo de energía, el mantenimiento, los seguros devengados—, y esperar a conocerlos impediría costear la producción y valorizar el inventario durante el periodo. La segunda es de **estabilidad**: los CIF reales de un mes pueden fluctuar por razones ajenas al producto, como un mantenimiento mayor concentrado en marzo o un mes con menos días laborables. Si se usaran los reales mensuales, el mismo producto tendría costos muy distintos según el mes en que se fabricó, lo que haría imposible comparar y fijar precios. La tasa predeterminada normaliza ese efecto, y la diferencia con los reales se gestiona al cierre como sobre o subaplicación.'},
   {p:'¿Qué significa que la base de asignación de CIF deba tener relación causal, y qué pasa si no la tiene?',
    r:'Significa que la base elegida debe ser un buen indicador de **qué provoca** el consumo de los costos indirectos. Si los CIF son principalmente depreciación, energía y mantenimiento de maquinaria, la base lógica son las **horas-máquina**, porque los productos que más usan las máquinas son los que más consumen esos recursos. Si la base no tiene relación causal, el resultado es un subsidio cruzado entre productos: en una planta automatizada que asigna CIF por horas de mano de obra directa, los productos más manuales absorben los costos de las máquinas que apenas usan, mientras los productos más automatizados aparecen artificialmente baratos. Con esa información, la empresa puede fijar precios bajos en los productos que más le cuestan y altos en los que menos, perdiendo dinero sin entender por qué. Es, históricamente, el problema que dio origen al costeo basado en actividades.'},
   {p:'¿Por qué la NIC 2 obliga a usar la capacidad normal y no la producción real para distribuir los CIF fijos?',
    r:'Porque de lo contrario el inventario absorbería el costo de la **ineficiencia** o de la baja actividad, y eso no es valor. Si una planta con capacidad normal de 10,000 unidades produce solo 7,000, los costos fijos de S/ 200,000 se pagan completos: repartirlos entre 7,000 unidades daría un costo unitario de S/ 28.57 en lugar de S/ 20, y capitalizaría S/ 60,000 de **capacidad ociosa** en el activo. Eso infla el inventario y difiere una pérdida que ya ocurrió. La NIC 2 manda aplicar S/ 20 por unidad —el costo con capacidad normal— y llevar los S/ 60,000 restantes al **gasto del periodo**. El razonamiento de fondo es que no producir no abarata el producto: encarece a la empresa, y ese encarecimiento debe verse en el resultado del mes en que ocurrió, donde la gerencia pueda gestionarlo.'},
   {p:'¿Qué información de gestión entrega una subaplicación persistente de CIF?',
    r:'Que algo del presupuesto o de la operación está desalineado, y conviene averiguar qué. Las causas típicas son tres. Primera, que los **CIF presupuestados** estén subestimados: los costos reales de energía, mantenimiento o supervisión son mayores que los previstos. Segunda, que la **base real** sea menor a la presupuestada: se trabajaron menos horas-máquina de las previstas, de modo que se aplicaron menos CIF aunque los reales no hayan subido; esto es, en el fondo, capacidad ociosa. Tercera, que haya **ineficiencias** en el consumo de los recursos indirectos. Ajustar la variación contra el costo de ventas y seguir adelante hace desaparecer el síntoma sin resolver nada. La variación de CIF es uno de los indicadores de alerta más tempranos que tiene una planta.'}
  ],
  ej:[
   {l:1,t:'num',p:'Inventario inicial de materias primas S/ 15,000; compras del periodo S/ 80,000; inventario final S/ 12,000. Calcula la materia prima consumida.',
    u:'S/',r:83000,tol:0,
    s:'$ Materia prima consumida = Inventario inicial + Compras − Inventario final\n$ = 15,000 + 80,000 − 12,000 = **S/ 83,000**\n\nEs la aplicación de la lógica que recorre todo el estado de costo de producción: **lo que había, más lo que entró, menos lo que quedó, es lo que salió**.\n\nEsa misma estructura se repite en los tres bloques siguientes: para los productos en proceso, para los productos terminados y, en una comercializadora, directamente para el costo de ventas. Si entiendes la frase, no necesitas memorizar las fórmulas.'},
   {l:1,t:'mc',p:'¿Qué conceptos integran el costo de conversión?',
    o:['Materia prima directa más mano de obra directa','Mano de obra directa más costos indirectos de fabricación','Solo los costos indirectos de fabricación','Materia prima directa más costos indirectos'],r:1,
    s:'El **costo de conversión** es **mano de obra directa más CIF**: es lo que cuesta **transformar** la materia prima en producto terminado.\n\nLa primera opción es el **costo primo** (MPD + MOD), que agrupa lo directamente identificable con el producto.\n\nLa mano de obra directa pertenece a ambos conceptos, y eso no es un error: son dos miradas distintas del mismo conjunto de costos. El costo de conversión es especialmente útil en la **maquila**, donde el cliente provee la materia prima y lo único que la empresa aporta —y debe costear y cobrar— es precisamente la conversión.'},
   {l:2,t:'num',p:'Con la materia prima consumida de S/ 83,000, mano de obra directa S/ 45,000, CIF S/ 38,000, inventario inicial de productos en proceso S/ 10,000, final S/ 14,000, inventario inicial de productos terminados S/ 20,000 y final S/ 18,000. Calcula el costo de ventas.',
    u:'S/',r:164000,tol:0,
    s:'**Estado de costo de producción y ventas:**\n\n| Concepto | Importe |\n|---|---|\n| Materia prima consumida | 83,000 |\n| (+) Mano de obra directa | 45,000 |\n| (+) Costos indirectos de fabricación | 38,000 |\n| **= Costo de producción del periodo** | **166,000** |\n| (+) Inventario inicial de productos en proceso | 10,000 |\n| (−) Inventario final de productos en proceso | (14,000) |\n| **= Costo de producción terminada** | **162,000** |\n| (+) Inventario inicial de productos terminados | 20,000 |\n| (−) Inventario final de productos terminados | (18,000) |\n| **= Costo de ventas** | **164,000** |\n\nLas dos lecturas que conviene hacer de este cuadro:\n\n**El inventario de productos en proceso creció** de 10,000 a 14,000: la empresa dejó S/ 4,000 más de costo dentro del proceso, de modo que terminó menos de lo que produjo. **El inventario de productos terminados bajó** de 20,000 a 18,000: vendió más de lo que terminó, consumiendo stock.\n\nEsa es la información que el estado entrega y que el solo dato del costo de ventas esconde: la empresa está vendiendo de su inventario y acumulando producto en proceso, una combinación que conviene vigilar.'},
   {l:2,t:'ab',p:'Una planta presupuestó CIF de S/ 480,000 y 24,000 horas-máquina para el año. En el periodo trabajó 23,000 horas-máquina y sus CIF reales fueron S/ 472,000. Calcula la tasa, los CIF aplicados, la variación y propón su tratamiento con el asiento.',
    s:'**Paso 1 — Tasa predeterminada**\n\n$ Tasa = CIF presupuestados ÷ Base presupuestada\n$ Tasa = 480,000 ÷ 24,000 horas-máquina = **S/ 20.00 por hora-máquina**\n\n**Paso 2 — CIF aplicados a la producción**\n\n$ CIF aplicados = Tasa × Base REAL\n$ CIF aplicados = 20.00 × 23,000 = **S/ 460,000**\n\n**Paso 3 — La variación**\n\n| Concepto | Importe |\n|---|---|\n| CIF reales incurridos | 472,000 |\n| CIF aplicados a la producción | (460,000) |\n| **Variación: SUBAPLICACIÓN** | **12,000** |\n\nSe aplicó **de menos**: la producción absorbió S/ 460,000 de CIF, pero la planta gastó S/ 472,000. Hay S/ 12,000 de costo real que no llegó al inventario.\n\n**Paso 4 — Descomponer la variación, que es lo que la vuelve útil**\n\n| Componente | Cálculo | Importe | Qué significa |\n|---|---|---|---|\n| Variación de **gasto** | CIF reales − (Tasa × horas reales presupuestadas al nivel real) | — | Se gastó más de lo previsto para el nivel de actividad |\n| Variación de **capacidad** | (24,000 − 23,000) × 20 | 20,000 de capacidad no utilizada | Se trabajaron 1,000 horas-máquina menos que las presupuestadas |\n\nLa lectura conjunta: la planta trabajó 1,000 horas-máquina menos de lo previsto (**capacidad ociosa**) y además gastó algo por encima de lo presupuestado. Ese diagnóstico es mucho más útil que el número único de S/ 12,000.\n\n**Paso 5 — Tratamiento de la variación**\n\n| Si la variación es... | Tratamiento |\n|---|---|\n| **Poco significativa** (como aquí: 12,000 sobre 472,000, un 2.5%) | Ajuste íntegro contra el **costo de ventas** del periodo |\n| **Significativa** | **Prorrateo** entre productos en proceso, productos terminados y costo de ventas, en proporción a los CIF aplicados a cada uno |\n\nCon un 2.5% de desvío, el ajuste directo al costo de ventas es razonable y es la práctica habitual.\n\n**Asiento del ajuste:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 692 | Costo de ventas — productos terminados | 12,000.00 | |\n| 91 | Costos de producción — CIF subaplicados | | 12,000.00 |\n\n(La cuenta de contrapartida depende de la estructura de centros de costo que use la empresa; lo esencial es que la subaplicación se traslade al resultado del periodo y no quede como saldo en el centro de costos.)\n\n**La observación de gestión, que es el aporte real del análisis:** una subaplicación de S/ 12,000 en un periodo puede ser normal. Si se repite mes tras mes, hay que revisar dos cosas: si el **presupuesto de CIF** está subestimado, y si las **horas-máquina presupuestadas** son realistas. Mil horas-máquina menos de las previstas, en una planta, es un dato que la gerencia debería conocer, porque equivale a capacidad pagada y no usada. Ajustar la variación contra el costo de ventas y seguir adelante hace desaparecer el síntoma sin tocar la causa.'},
   {l:3,t:'ab',p:'Una planta tiene capacidad normal de 10,000 unidades mensuales. Sus CIF fijos son S/ 200,000 y los variables S/ 6 por unidad. En un mes produce solo 7,000 unidades por caída de pedidos. La materia prima es S/ 22 por unidad y la mano de obra directa S/ 9 por unidad. Determina el costo unitario correcto y el efecto en los estados financieros, comparando con el tratamiento incorrecto.',
    s:'**El punto del ejercicio es la regla de la capacidad normal de la NIC 2, que es donde más empresas industriales se equivocan.**\n\n**TRATAMIENTO INCORRECTO: repartir todos los CIF fijos entre lo producido**\n\n| Elemento | Cálculo | Costo unitario |\n|---|---|---|\n| Materia prima directa | dato | 22.00 |\n| Mano de obra directa | dato | 9.00 |\n| CIF variables | dato | 6.00 |\n| CIF fijos | 200,000 ÷ 7,000 | **28.57** |\n| **Costo unitario** | | **65.57** |\n\n| Efecto | Importe |\n|---|---|\n| Valor del inventario producido | 7,000 × 65.57 = 459,000 |\n| Gasto del periodo por capacidad ociosa | **0** |\n\n**TRATAMIENTO CORRECTO (NIC 2): CIF fijos según la CAPACIDAD NORMAL**\n\n| Elemento | Cálculo | Costo unitario |\n|---|---|---|\n| Materia prima directa | dato | 22.00 |\n| Mano de obra directa | dato | 9.00 |\n| CIF variables | dato | 6.00 |\n| CIF fijos | 200,000 ÷ **10,000** (capacidad normal) | **20.00** |\n| **Costo unitario** | | **57.00** |\n\n$ CIF fijos aplicados al inventario = 7,000 × 20 = 140,000\n$ CIF fijos NO absorbidos = 3,000 unidades ociosas × 20 = 60,000 → GASTO DEL PERIODO\n\n| Efecto | Importe |\n|---|---|\n| Valor del inventario producido | 7,000 × 57.00 = **399,000** |\n| **Gasto del periodo por capacidad ociosa** | **60,000** |\n| Suma | 459,000 ✓ (igual al total de costos incurridos) |\n\n**COMPARACIÓN DE LOS DOS TRATAMIENTOS**\n\n| Concepto | Incorrecto | Correcto (NIC 2) | Diferencia |\n|---|---|---|---|\n| Costo unitario | 65.57 | **57.00** | −8.57 |\n| Inventario (si nada se vende) | 459,000 | **399,000** | −60,000 |\n| Gasto del periodo | 0 | **60,000** | +60,000 |\n| Utilidad del mes | mayor en 60,000 | menor en 60,000 | |\n\n**Por qué el tratamiento correcto es el correcto, en una frase:** no producir no abarata el producto, encarece a la empresa. Los S/ 60,000 de capacidad pagada y no usada son una pérdida que ya ocurrió este mes, y capitalizarla en el inventario la esconde y la difiere.\n\n**Las cuatro consecuencias prácticas, que son lo importante del caso:**\n\n**1. El costo unitario queda contaminado por el volumen.** Con el criterio incorrecto, el mismo producto cuesta S/ 65.57 en un mes flojo y S/ 57.00 en un mes normal. Si la empresa fija precios con un margen sobre el costo, subiría precios justo cuando la demanda cae, que es exactamente lo contrario de lo que corresponde. El criterio de la NIC 2 entrega un costo unitario **estable** de S/ 57.00, independiente del volumen del mes.\n\n**2. El problema se vuelve visible y gestionable.** Los S/ 60,000 aparecen como una línea de gasto identificable —capacidad ociosa— en el resultado del mes en que se produjo. La gerencia puede verla, cuantificarla y decidir: buscar más pedidos, maquilar para terceros, reducir turnos. Con el criterio incorrecto, ese importe se diluye en el inventario y reaparece meses después dentro del costo de ventas, cuando ya nadie puede relacionarlo con su causa.\n\n**3. El inventario del activo no está sobrevaluado.** Con el criterio incorrecto el inventario figura S/ 60,000 por encima de lo que la NIC 2 permite, lo que afecta los ratios, el patrimonio y cualquier evaluación de crédito o valorización de la empresa.\n\n**4. El efecto tributario y la diferencia temporal.** Si el inventario se valoriza con el criterio incorrecto, la utilidad del ejercicio es mayor y el Impuesto a la Renta también. Al corregirlo, el gasto por capacidad ociosa se reconoce en el periodo, y hay que verificar su deducibilidad: es un costo efectivamente incurrido y vinculado a la actividad, de modo que cumple el principio de causalidad, pero debe estar sustentado y documentado como tal. Conviene dejar el papel de trabajo del cálculo de la capacidad normal y de la ociosa en el expediente del cierre.\n\n**La regla inversa que hay que conocer:** si la producción real **excede** la capacidad normal, el CIF fijo unitario se calcula con la **producción real**, no con la capacidad normal. La razón es simétrica: usar la capacidad normal daría un CIF fijo unitario más alto que el real y **sobrevaluaría** el inventario, que es justamente lo que la norma quiere evitar.\n\n$ Producción < capacidad normal → usar capacidad normal, el exceso es gasto\n$ Producción > capacidad normal → usar producción real\n\n**Y la definición que hay que documentar:** la **capacidad normal** es la producción que se espera conseguir en promedio a lo largo de varios periodos, considerando las pérdidas de capacidad por mantenimiento previsto. No es la capacidad teórica máxima ni la producción de un mes bueno. Esa definición debe estar documentada en un papel de trabajo, con su sustento técnico, porque es la base de toda la valuación del inventario y será lo primero que se pida en una revisión.'}
  ],
  proy:{
   t:'Estado de costo de producción de tu empresa',
   ctx:`Si tu empresa transforma algo, vas a construir su costo de producción desde cero. Si es comercial o de servicios, vas a diseñar la estructura que usaría si incorporara una línea de producción o de servicios costeables.`,
   pasos:[
    'Define el proceso productivo de tu empresa o de una línea de producción que podría incorporar: etapas, insumos y transformaciones.',
    'Identifica y clasifica los tres elementos del costo: materia prima directa, mano de obra directa y CIF, distinguiendo dentro de los CIF los materiales indirectos, la mano de obra indirecta y los otros costos indirectos.',
    'Usa el costo laboral del Módulo 6 para determinar la mano de obra directa con su costo completo, no solo el sueldo básico: el factor de 1.37 a 1.50 debe estar aplicado.',
    'Determina la capacidad normal de tu planta o proceso, con su definición y sustento documentado en un papel de trabajo.',
    'Separa los CIF en fijos y variables, y calcula la tasa predeterminada de CIF eligiendo una base con relación causal justificada.',
    'Construye el estado de costo de producción y ventas de un periodo, con sus cuatro bloques y sus resultados intermedios.',
    'Registra en el Libro Diario el flujo completo del costo: compra de materias primas, consumo, destino al centro de costos, producción terminada y costo de ventas.',
    'Aplica la regla de la capacidad normal: calcula el costo unitario correcto y, si la producción fue menor a la capacidad normal, determina el gasto del periodo por capacidad ociosa.',
    'Calcula la sobre o subaplicación de CIF del periodo, descompónla en gasto y capacidad, y propón su tratamiento.'
   ],
   entrega:[
    'La clasificación de los tres elementos del costo con el detalle de los CIF.',
    'La determinación documentada de la capacidad normal y la tasa predeterminada con su base justificada.',
    'El estado de costo de producción y ventas completo y los asientos del flujo del costo.',
    'El cálculo del costo unitario con la regla de capacidad normal y el análisis de la variación de CIF.'
   ],
   crit:[
    'La mano de obra directa usa el costo laboral completo del Módulo 6, no el sueldo básico.',
    'La base de asignación de CIF tiene una justificación de relación causal, no se elige por comodidad.',
    'Si la producción fue menor a la capacidad normal, el exceso de CIF fijos figura como gasto del periodo y no en el inventario.'
   ],
   pista:'La capacidad normal es el dato más discutido de todo el costeo y el que menos empresas documentan. Defínela como la producción promedio esperada a lo largo de varios periodos, descontando el mantenimiento previsto, y deja el cálculo escrito: es lo primero que se pide en una revisión y lo primero que nadie encuentra.'
  },
  proyInt:{
   t:'Integración del costo de producción a los estados financieros',
   integra:'1.1 a 8.3',
   ctx:`Vas a conectar el costo de producción con todo lo construido: el inventario del subtema anterior, la planilla del Módulo 6, los tributos del Módulo 3 y los estados financieros del Módulo 2.`,
   pasos:[
    'Integra el Kardex de materias primas y de productos terminados del subtema 8.2 con el flujo del costo de producción, verificando que los saldos coincidan con las cuentas 24 y 21.',
    'Verifica que la mano de obra directa del estado de costo de producción coincida con la parte de la planilla del Módulo 6 asignada a producción, incluidos aportes y provisiones de beneficios.',
    'Verifica que los CIF no incluyan ningún concepto excluido por la NIC 2: almacenaje de producto terminado, gastos de administración, costos de venta ni mermas anormales.',
    'Actualiza el Libro Mayor y el balance de comprobación con el flujo completo del costo.',
    'Elabora el estado de resultados por función con el costo de ventas correcto, separando el gasto por capacidad ociosa como línea propia.',
    'Elabora el estado de situación financiera con el inventario desagregado en materias primas, productos en proceso y productos terminados.',
    'Recalcula el Impuesto a la Renta verificando: la deducibilidad del gasto por capacidad ociosa, el tratamiento de la subaplicación de CIF y la adición por desvalorización del subtema anterior.',
    'Elabora la nota a los estados financieros sobre costos de producción: política de capacidad normal, base de asignación de CIF y composición del inventario.',
    'Elabora el informe de una página a la gerencia con el costo unitario del producto, su descomposición en los tres elementos y el costo de la capacidad ociosa del periodo.'
   ],
   entrega:[
    'La conciliación del Kardex con las cuentas de existencias y de la MOD con la planilla.',
    'La verificación de conceptos excluidos de los CIF.',
    'Los estados financieros con el inventario desagregado y la capacidad ociosa como línea propia.',
    'El recálculo del impuesto, la nota de costos y el informe de una página.'
   ],
   crit:[
    'La mano de obra directa del estado de costo coincide con la planilla, incluidos aportes y provisiones.',
    'El gasto por capacidad ociosa figura como línea separada en el estado de resultados, no mezclado en el costo de ventas.',
    'El informe a la gerencia descompone el costo unitario en los tres elementos, con su porcentaje sobre el total.'
   ],
   pista:'La descomposición del costo unitario en porcentajes es el dato que más orienta la gestión. Si la materia prima es el 60% del costo, el esfuerzo de mejora está en compras y en mermas; si los CIF son el 50%, está en la productividad y en el uso de la capacidad.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'elementos del costo, asignación de costos indirectos, tasas predeterminadas y tratamiento de la variación'},
   {a:'NIC 2', o:'Inventarios', n:'costos de transformación, distribución de los costos indirectos fijos según la capacidad normal y exclusión de desperdicios anormales'},
   {a:'Ralph S. Polimeni, Frank J. Fabozzi y Arthur H. Adelberg', o:'Contabilidad de costos: conceptos y aplicaciones para la toma de decisiones gerenciales', n:'flujo del costo, estado de costo de producción y asignación de CIF'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'aplicación del flujo del costo con el Plan Contable General Empresarial peruano'},
   {a:'Plan Contable General Empresarial (PCGE) 2019', o:'Elementos 2, 6, 7 y 9', n:'cuentas de existencias, variación de existencias, variación de la producción almacenada y centros de costo'},
   {a:'Pedro Álvarez Illanes', o:'Contabilidad de costos y presupuestos', n:'registro del costo por naturaleza y destino en el sistema contable peruano'}
  ]
 },
 {
  id:'m8t4', titulo:'Costeo por órdenes y costeo por procesos con unidades equivalentes', min:28,
  cont:`Ya sabes **qué** se acumula en el costo. Ahora toca **cómo** se acumula, y eso depende de la naturaleza de la producción. Hay dos sistemas básicos, y elegir el equivocado produce costos que no sirven para nada.

# Los dos sistemas y cuándo se usa cada uno
|Criterio|**Costeo por ÓRDENES**|**Costeo por PROCESOS**|
|Naturaleza de la producción|**Heterogénea**: cada lote es distinto|**Homogénea y continua**: todas las unidades son iguales|
|Se produce|Contra **pedido** o en lotes identificables|Para **stock**, en flujo continuo|
|El costo se acumula por|**Orden de trabajo**|**Departamento o proceso**|
|Costo unitario|Costo de la orden ÷ unidades de la orden|Costo del departamento ÷ unidades equivalentes|
|Documento central|**Hoja de costos por orden**|**Informe de producción y costos**|
|Inventario en proceso|Las órdenes no terminadas al cierre|Las unidades en proceso de cada departamento|
|Ejemplos en el Perú|Imprenta, metalmecánica, confección a pedido, mueblería, construcción, astilleros, publicidad, estudios contables y jurídicos|Cemento, azúcar, harina de pescado, bebidas, papel, químicos, textil continuo, lácteos|

$ La pregunta que decide el sistema: ¿puedo identificar físicamente
$ un lote y rastrear sus costos, o las unidades se mezclan en un flujo continuo?

# Costeo por órdenes: la mecánica
Cada orden de trabajo recibe un número y acumula sus propios costos en una **hoja de costos por orden**.

|Elemento|Cómo se carga a la orden|Documento fuente|
|**Materia prima directa**|Lo efectivamente consumido por la orden|**Requisición de materiales**, con el número de orden|
|**Mano de obra directa**|Las horas trabajadas en la orden por su tarifa|**Boleta de tiempo** del operario, con el número de orden|
|**CIF**|Tasa predeterminada × base consumida por la orden|Registro de horas-máquina u horas de MOD de la orden|

**La hoja de costos por orden:**
|Orden N° 101 — Cliente: ... — Producto: 300 sillas|Importe|
|Materia prima directa (requisiciones 45, 48, 52)|12,000.00|
|Mano de obra directa (180 horas × S/ 25)|4,500.00|
|CIF aplicados (180 horas × S/ 18)|3,240.00|
|**Costo total de la orden**|**19,740.00**|
|Unidades producidas|300|
|**Costo unitario**|**65.80**|

$ Al cierre del periodo:
$ Órdenes no terminadas = INVENTARIO DE PRODUCTOS EN PROCESO
$ Órdenes terminadas y no vendidas = INVENTARIO DE PRODUCTOS TERMINADOS
$ Órdenes terminadas y vendidas = COSTO DE VENTAS

> La virtud del costeo por órdenes es que el inventario de productos en proceso **no se estima**: es la suma de las hojas de costos de las órdenes abiertas. Esa verificabilidad es lo que lo hace tan sólido ante una fiscalización, y por eso conviene conservar las hojas de costos como papel de trabajo del inventario.

**El control que no puede faltar:** cada requisición de materiales y cada boleta de tiempo debe llevar el **número de orden**. Sin eso, el sistema no funciona: los costos se acumulan en un pozo común y hay que repartirlos a estimación, perdiendo toda la ventaja del sistema.

# Costeo por procesos: el problema de las unidades en proceso
En un flujo continuo no hay lotes identificables. Al cierre del mes, el departamento tiene unidades terminadas y unidades **a medio hacer**, y hay que repartir el costo entre ambas. La herramienta para hacerlo son las **unidades equivalentes**.

$ UNIDAD EQUIVALENTE: la cantidad de producto terminado que representa
$ el esfuerzo invertido en las unidades en proceso

$ Ejemplo: 1,000 unidades con 40% de avance equivalen a 400 unidades terminadas
$ en términos de costo de conversión

! Las unidades equivalentes se calculan **por separado para cada elemento del costo**, porque los elementos no se agregan al mismo ritmo. Los **materiales** suelen incorporarse al inicio del proceso, de modo que las unidades en proceso tienen el 100% de sus materiales. La **conversión** (MOD y CIF) se agrega de forma progresiva, de modo que su avance es el porcentaje real de terminación.

# El informe de producción y costos: cuatro pasos
$ PASO 1 — Flujo de unidades FÍSICAS: ¿cuántas unidades entraron y salieron?
$ PASO 2 — Unidades EQUIVALENTES, por elemento del costo
$ PASO 3 — Costo UNITARIO equivalente, por elemento
$ PASO 4 — ASIGNACIÓN del costo: a las terminadas y al inventario final

**Un informe completo, método de promedio ponderado.** Departamento de mezclado:

**Datos:**
|Concepto|Unidades|Materiales|Conversión|
|Productos en proceso iniciales|2,000|100% avance|60% avance|
|Costos de los PP iniciales||8,000|5,000|
|Unidades iniciadas en el periodo|18,000|||
|Costos agregados en el periodo||76,000|63,000|
|Terminadas y transferidas|16,000|||
|Productos en proceso finales|4,000|100% avance|25% avance|

**Paso 1 — Flujo de unidades físicas:**
$ Unidades a justificar = PP inicial + iniciadas = 2,000 + 18,000 = 20,000
$ Unidades justificadas = terminadas + PP final = 16,000 + 4,000 = 20,000 ✓

**Paso 2 — Unidades equivalentes (promedio ponderado):**
|Concepto|Materiales|Conversión|
|Terminadas y transferidas|16,000|16,000|
|PP final (4,000 × % avance)|4,000 × 100% = 4,000|4,000 × 25% = 1,000|
|**Unidades equivalentes**|**20,000**|**17,000**|

**Paso 3 — Costo unitario equivalente:**
$ Materiales: (8,000 + 76,000) ÷ 20,000 = 84,000 ÷ 20,000 = S/ 4.20
$ Conversión: (5,000 + 63,000) ÷ 17,000 = 68,000 ÷ 17,000 = S/ 4.00
$ COSTO UNITARIO TOTAL = 4.20 + 4.00 = S/ 8.20

**Paso 4 — Asignación del costo:**
|Destino|Cálculo|Importe|
|Terminadas y transferidas|16,000 × 8.20|131,200|
|PP final — materiales|4,000 × 4.20|16,800|
|PP final — conversión|1,000 × 4.00|4,000|
|**Total asignado**||**152,000**|

$ Verificación: costos a distribuir = 8,000 + 5,000 + 76,000 + 63,000 = 152,000 ✓

! La **verificación del paso 4 es obligatoria**: el total asignado debe igualar el total de costos a distribuir. Si no cuadra, hay un error en las unidades equivalentes o en los costos unitarios, y el inventario de productos en proceso estará mal valorizado.

# Promedio ponderado frente a PEPS en costeo por procesos
|Aspecto|**Promedio ponderado**|**PEPS**|
|Trata los PP iniciales|Los **mezcla** con la producción del periodo|Los mantiene **separados**: primero los termina|
|Unidades equivalentes|Terminadas + (PP final × avance)|(PP inicial × **% faltante**) + iniciadas y terminadas + (PP final × avance)|
|Costo unitario|(Costo de PP inicial + costos del periodo) ÷ UE|**Solo** costos del periodo ÷ UE|
|Ventaja|Más simple|Mide mejor la **eficiencia del periodo**, porque no contamina con costos del mes anterior|

> Para **valuar inventarios**, el promedio ponderado es suficiente y más simple. Para **controlar la eficiencia**, PEPS es superior: el costo unitario del periodo refleja solo lo que ocurrió este mes, lo que permite comparar meses entre sí. Es el mismo criterio que recorre todo el módulo: el método se elige según el propósito.

# El costo transferido entre departamentos
Cuando la producción pasa por varios departamentos, el costo acumulado viaja con las unidades.

$ El departamento 2 recibe las unidades con su "COSTO DEL DEPARTAMENTO ANTERIOR",
$ que para él funciona como un material agregado al 100% al inicio del proceso

|Departamento 2 — costo unitario|Importe|
|Costo del departamento anterior|8.20|
|Materiales agregados en el departamento 2|3.50|
|Conversión del departamento 2|5.30|
|**Costo unitario acumulado al salir del departamento 2**|**17.00**|

! Error frecuente: calcular unidades equivalentes del costo del departamento anterior con el porcentaje de avance del departamento 2. **No corresponde**: ese costo ya está completo al 100% en todas las unidades recibidas, porque viene terminado del departamento previo.

# Las mermas en el costeo por procesos
|Tipo de merma|Tratamiento|Efecto|
|**Normal** (inherente al proceso, dentro del estándar)|Se **absorbe** en las unidades buenas: no se incluye en las unidades equivalentes|**Aumenta** el costo unitario de lo bueno|
|**Anormal** (excede el estándar)|Se **separa**: se calculan sus unidades equivalentes y su costo va al **gasto del periodo**|No contamina el costo del producto|

$ Merma normal: 10,000 unidades iniciadas, 500 de merma normal, 9,500 buenas
$ El costo total se divide entre 9,500, no entre 10,000
$ Merma anormal: se valoriza al costo unitario y se lleva al resultado del periodo

Este tratamiento conecta con lo visto en el subtema 8.2: la merma normal es costo del producto y la anormal es pérdida del periodo, tanto para la NIC 2 como para la norma tributaria, que exige el informe técnico para sustentar el porcentaje normal.

# Los sistemas híbridos
La realidad rara vez es pura. El **costeo por operaciones** combina ambos: los materiales se rastrean por orden, como en el costeo por órdenes, y la conversión se asigna por proceso, con una tasa por operación. Es el sistema típico de la confección y del calzado, donde cada modelo lleva materiales distintos pero pasa por las mismas operaciones de corte, costura y acabado.

$ Regla práctica: si los MATERIALES difieren entre productos pero las OPERACIONES
$ son las mismas, el costeo por operaciones es más preciso que cualquiera de los dos puros`,
  claves:['El costeo por órdenes se usa en producción heterogénea e identificable por lotes; el costeo por procesos en producción homogénea y continua.','En el costeo por órdenes el inventario de productos en proceso no se estima: es la suma de las hojas de costos de las órdenes abiertas.','Las unidades equivalentes traducen el avance de las unidades en proceso a unidades terminadas, y se calculan por separado para cada elemento del costo.','El total asignado en el paso 4 del informe de producción debe igualar el total de costos a distribuir: la verificación es obligatoria.','El costo del departamento anterior está siempre al 100% de avance en las unidades recibidas, porque viene terminado del proceso previo.'],
  preg:[
   {p:'¿Qué pregunta decide si una empresa necesita costeo por órdenes o por procesos?',
    r:'Si puede identificar físicamente un lote y rastrear sus costos, o si las unidades se mezclan en un flujo continuo. Una imprenta que produce 500 catálogos para un cliente y luego 2,000 volantes para otro tiene lotes claramente distinguibles, con materiales y tiempos distintos: necesita **costeo por órdenes**. Una planta de harina de pescado procesa materia prima en un flujo continuo donde ninguna tonelada se distingue de otra: necesita **costeo por procesos**. El criterio no es el tamaño de la empresa ni la industria en abstracto, sino la **homogeneidad** de la producción y la posibilidad de rastreo. Y cuando la respuesta es mixta —materiales distintos pero operaciones iguales—, el sistema adecuado es el híbrido por operaciones.'},
   {p:'¿Por qué las unidades equivalentes se calculan por separado para cada elemento del costo?',
    r:'Porque los elementos no se agregan al producto al mismo ritmo. Los **materiales** suelen incorporarse íntegramente al inicio del proceso: una unidad que apenas empezó ya tiene toda su materia prima, de modo que su avance en materiales es del 100%. La **conversión** —mano de obra y CIF— se agrega de forma progresiva a medida que la unidad avanza, de modo que su avance es el porcentaje real de terminación. Si se usara un solo porcentaje para todo, se subvaluarían los materiales de las unidades en proceso y se sobrevaluaría su conversión. En procesos donde los materiales se agregan en varias etapas, puede ser necesario calcular unidades equivalentes para cada material por separado.'},
   {p:'¿Cuál es la ventaja del costeo por órdenes para efectos de una fiscalización?',
    r:'Que el inventario de productos en proceso es **verificable y no estimado**. Al cierre del periodo, ese inventario es simplemente la suma de las hojas de costos de las órdenes que están abiertas, y cada hoja se sustenta en requisiciones de materiales y boletas de tiempo numeradas con el número de orden. Un inspector puede tomar una orden, pedir sus requisiciones y sus boletas, y reconstruir el costo documento por documento. En el costeo por procesos, en cambio, el inventario en proceso depende de una estimación de porcentajes de avance, que es más difícil de sustentar. Por eso, en una empresa con costeo por órdenes, conservar las hojas de costos como papel de trabajo del inventario es una de las defensas documentales más sólidas que existen.'},
   {p:'¿Por qué el método PEPS es superior al promedio ponderado para controlar la eficiencia?',
    r:'Porque su costo unitario refleja **solo los costos del periodo**, sin mezclarlos con los del inventario inicial. El promedio ponderado suma los costos de las unidades que venían del mes anterior a los costos del mes actual y divide todo entre las unidades equivalentes, de modo que el costo unitario resultante es una mezcla de dos periodos: si el mes pasado la planta fue ineficiente, esa ineficiencia contamina el costo unitario de este mes y hace imposible saber cómo se desempeñó la planta realmente. PEPS mantiene las capas separadas: primero termina lo que venía en proceso y luego costea lo iniciado en el periodo, de modo que el costo unitario del periodo es limpio y comparable con el de otros meses. Para valuar inventarios el promedio es suficiente; para gestionar, PEPS informa mejor.'},
   {p:'¿Por qué el costo del departamento anterior se considera siempre al 100% de avance?',
    r:'Porque esas unidades **ya salieron terminadas** del departamento previo: todo el costo que ese departamento les agregó está completo e incorporado en ellas. Para el departamento que las recibe, ese costo funciona exactamente como un material que se agrega íntegramente al inicio de su proceso. El error de aplicarle el porcentaje de avance del departamento actual subvalúa el inventario en proceso: si el departamento 2 tiene 4,000 unidades al 25% de avance, su conversión equivale a 1,000 unidades, pero el costo del departamento anterior corresponde a las 4,000 completas, porque las 4,000 ya recibieron todo el procesamiento del departamento 1. Es uno de los errores más frecuentes en el costeo por procesos multidepartamental.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una imprenta produce catálogos, volantes y libros, cada trabajo a pedido de un cliente distinto y con especificaciones propias. ¿Qué sistema de costeo le corresponde?',
    o:['Costeo por procesos','Costeo por órdenes de trabajo','Costeo estándar únicamente','No necesita sistema de costeo'],r:1,
    s:'**Costeo por órdenes de trabajo.** La producción es heterogénea: cada trabajo tiene especificaciones, materiales, tiempos y tirajes distintos, y además es identificable físicamente como un lote.\n\nCada pedido recibe un número de orden y acumula sus propios costos en una hoja de costos: la materia prima directa por requisiciones con el número de orden, la mano de obra directa por boletas de tiempo del operario, y los CIF por la tasa predeterminada aplicada a la base consumida por la orden.\n\nEl costeo por procesos sería inaplicable, porque no existe un costo unitario común: un catálogo a color y un volante en blanco y negro no pueden promediarse. Y el control indispensable es que **cada requisición y cada boleta de tiempo lleven el número de orden**: sin eso el sistema no funciona.'},
   {l:1,t:'num',p:'Un departamento terminó y transfirió 16,000 unidades y quedó con 4,000 unidades en proceso al 25% de avance en conversión. Calcula las unidades equivalentes de conversión por el método de promedio ponderado.',
    u:'unidades',r:17000,tol:0,
    s:'$ UE de conversión = Terminadas y transferidas + (PP final × % de avance)\n$ UE = 16,000 + (4,000 × 25%) = 16,000 + 1,000 = **17,000 unidades equivalentes**\n\nY si los materiales se agregan íntegramente al inicio del proceso, las unidades equivalentes de **materiales** son distintas:\n\n$ UE de materiales = 16,000 + (4,000 × 100%) = **20,000 unidades equivalentes**\n\nEsa diferencia —20,000 para materiales y 17,000 para conversión— es la razón por la que las unidades equivalentes se calculan **por separado para cada elemento del costo**. Usar un solo número para ambos subvalúa los materiales del inventario en proceso y sobrevalúa su conversión.'},
   {l:2,t:'num',p:'Con los datos del departamento: PP iniciales con costos de S/ 8,000 en materiales y S/ 5,000 en conversión; costos del periodo S/ 76,000 en materiales y S/ 63,000 en conversión; UE de materiales 20,000 y UE de conversión 17,000. Calcula el costo unitario equivalente total.',
    u:'S/',r:8.2,tol:0.05,
    s:'**Costo unitario por elemento (método de promedio ponderado: se suman los costos del inventario inicial a los del periodo):**\n\n| Elemento | Costos a distribuir | UE | Costo unitario |\n|---|---|---|---|\n| Materiales | 8,000 + 76,000 = 84,000 | 20,000 | **4.20** |\n| Conversión | 5,000 + 63,000 = 68,000 | 17,000 | **4.00** |\n| **Total** | **152,000** | | **8.20** |\n\n**Asignación del costo (paso 4) y su verificación obligatoria:**\n\n| Destino | Cálculo | Importe |\n|---|---|---|\n| Terminadas y transferidas | 16,000 × 8.20 | 131,200 |\n| PP final — materiales | 4,000 × 4.20 | 16,800 |\n| PP final — conversión | 1,000 × 4.00 | 4,000 |\n| **Total asignado** | | **152,000** |\n\n$ Costos a distribuir = 152,000 = Total asignado ✓\n\nEsa verificación no es opcional. Si el total asignado no coincide con el total de costos a distribuir, hay un error en las unidades equivalentes o en los costos unitarios, y el inventario de productos en proceso quedará mal valorizado en el estado de situación financiera.'},
   {l:2,t:'ab',p:'Una metalmecánica trabajó tres órdenes en el mes. Tarifa de MOD S/ 25 por hora y tasa de CIF S/ 18 por hora de MOD. Orden 101: MPD S/ 12,000 y 180 horas, 300 unidades, terminada y en almacén. Orden 102: MPD S/ 8,000 y 120 horas, 200 unidades, terminada y vendida. Orden 103: MPD S/ 5,000 y 60 horas, en proceso. Los CIF reales del mes fueron S/ 7,000. Elabora las hojas de costos y determina los saldos de cierre.',
    s:'**Hojas de costos por orden:**\n\n| Concepto | **Orden 101** | **Orden 102** | **Orden 103** |\n|---|---|---|---|\n| Materia prima directa | 12,000.00 | 8,000.00 | 5,000.00 |\n| Mano de obra directa (horas × 25) | 180 × 25 = 4,500.00 | 120 × 25 = 3,000.00 | 60 × 25 = 1,500.00 |\n| CIF aplicados (horas × 18) | 180 × 18 = 3,240.00 | 120 × 18 = 2,160.00 | 60 × 18 = 1,080.00 |\n| **Costo total de la orden** | **19,740.00** | **13,160.00** | **7,580.00** |\n| Unidades producidas | 300 | 200 | en proceso |\n| **Costo unitario** | **65.80** | **65.80** | — |\n| Estado al cierre | Terminada en almacén | Terminada y vendida | En proceso |\n\n**Saldos de cierre que se desprenden directamente de las hojas:**\n\n| Partida | Composición | Importe |\n|---|---|---|\n| **Inventario de productos en proceso** | Orden 103 (no terminada) | **7,580.00** |\n| **Inventario de productos terminados** | Orden 101 (terminada, no vendida) | **19,740.00** |\n| **Costo de ventas** | Orden 102 (terminada y vendida) | **13,160.00** |\n| Total de costos del periodo | | 40,480.00 |\n\n**Esta es la gran ventaja del sistema:** los tres saldos no se estiman, se **leen** de las hojas de costos. Y cada cifra se sustenta en requisiciones de materiales y boletas de tiempo con el número de orden, de modo que son reconstruibles documento por documento.\n\n**Análisis de la variación de CIF:**\n\n| Concepto | Importe |\n|---|---|\n| CIF reales del mes | 7,000.00 |\n| CIF aplicados (3,240 + 2,160 + 1,080) | (6,480.00) |\n| **SUBAPLICACIÓN** | **520.00** |\n\nSe aplicó de menos: hay S/ 520 de CIF reales que no llegaron al costo de las órdenes.\n\n$ Variación = 520 ÷ 7,000 = 7.4% de los CIF reales\n\nEs una desviación moderada. Dado que las órdenes del mes están repartidas entre proceso, almacén y ventas, el tratamiento técnicamente más preciso sería el **prorrateo** en función de los CIF aplicados a cada destino:\n\n| Destino | CIF aplicados | Proporción | Prorrateo de los 520 |\n|---|---|---|---|\n| Productos en proceso (orden 103) | 1,080 | 16.67% | 86.67 |\n| Productos terminados (orden 101) | 3,240 | 50.00% | 260.00 |\n| Costo de ventas (orden 102) | 2,160 | 33.33% | 173.33 |\n| **Total** | **6,480** | **100%** | **520.00** |\n\nSi la empresa considera la variación poco significativa, puede ajustarla íntegramente contra el costo de ventas, que es la práctica habitual y la que la mayoría de empresas adopta.\n\n**Asiento del ajuste, en la versión simplificada:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 692 | Costo de ventas — productos terminados | 520.00 | |\n| 91 | Costos de producción — CIF subaplicados | | 520.00 |\n\n**Dos observaciones de gestión:**\n\n**1. Las órdenes 101 y 102 tienen el mismo costo unitario de S/ 65.80.** No es casualidad del enunciado: ambas consumieron materia prima y horas en la misma proporción (S/ 66.67 de MPD por hora en la 101 y S/ 66.67 en la 102). En la práctica los costos unitarios por orden difieren bastante, y comparar el costo unitario real de cada orden con el presupuestado al cotizar es la forma de saber si la empresa está cotizando bien.\n\n**2. La tasa de CIF de S/ 18 por hora de MOD merece revisión.** En una metalmecánica, los CIF suelen estar dominados por la depreciación y el mantenimiento de la maquinaria, no por el trabajo manual. Si una orden usa mucha máquina y poca mano de obra, esta base la subcostea. Convendría evaluar las **horas-máquina** como base, que es lo que la relación causal sugiere.'},
   {l:3,t:'ab',p:'Elabora el informe de producción y costos completo de dos departamentos en secuencia. Departamento 1 (Mezclado): PP inicial 2,000 u (100% materiales, 60% conversión) con costos de S/ 8,000 y S/ 5,000; inicia 18,000 u; costos del periodo S/ 76,000 materiales y S/ 63,000 conversión; termina y transfiere 16,000 u; PP final 4,000 u al 25% de conversión. Departamento 2 (Envasado): recibe las 16,000 u; no tiene PP inicial; agrega materiales por S/ 52,500 (al inicio) y conversión por S/ 70,490; termina 14,000 u; PP final 2,000 u al 40% de conversión. Usa promedio ponderado.',
    s:'**DEPARTAMENTO 1 — MEZCLADO**\n\n**Paso 1 — Flujo de unidades físicas**\n\n| Unidades a justificar | | Unidades justificadas | |\n|---|---|---|---|\n| PP inicial | 2,000 | Terminadas y transferidas | 16,000 |\n| Iniciadas | 18,000 | PP final | 4,000 |\n| **Total** | **20,000** | **Total** | **20,000** ✓ |\n\n**Paso 2 — Unidades equivalentes**\n\n| Concepto | Materiales | Conversión |\n|---|---|---|\n| Terminadas y transferidas | 16,000 | 16,000 |\n| PP final (4,000 u) | 4,000 × 100% = 4,000 | 4,000 × 25% = 1,000 |\n| **Unidades equivalentes** | **20,000** | **17,000** |\n\n**Paso 3 — Costo unitario equivalente**\n\n| Elemento | PP inicial | Del periodo | Total | UE | Costo unitario |\n|---|---|---|---|---|---|\n| Materiales | 8,000 | 76,000 | 84,000 | 20,000 | **4.20** |\n| Conversión | 5,000 | 63,000 | 68,000 | 17,000 | **4.00** |\n| **Total** | **13,000** | **139,000** | **152,000** | | **8.20** |\n\n**Paso 4 — Asignación**\n\n| Destino | Cálculo | Importe |\n|---|---|---|\n| Terminadas y transferidas al Dpto. 2 | 16,000 × 8.20 | **131,200** |\n| PP final — materiales | 4,000 × 4.20 | 16,800 |\n| PP final — conversión | 1,000 × 4.00 | 4,000 |\n| PP final total | | **20,800** |\n| **Total asignado** | | **152,000** ✓ |\n\n**DEPARTAMENTO 2 — ENVASADO**\n\n**Paso 1 — Flujo de unidades físicas**\n\n| Unidades a justificar | | Unidades justificadas | |\n|---|---|---|---|\n| PP inicial | 0 | Terminadas | 14,000 |\n| Recibidas del Dpto. 1 | 16,000 | PP final | 2,000 |\n| **Total** | **16,000** | **Total** | **16,000** ✓ |\n\n**Paso 2 — Unidades equivalentes. Aquí está el punto crítico del ejercicio.**\n\n| Concepto | **Costo Dpto. anterior** | Materiales Dpto. 2 | Conversión Dpto. 2 |\n|---|---|---|---|\n| Terminadas | 14,000 | 14,000 | 14,000 |\n| PP final (2,000 u) | 2,000 × **100%** | 2,000 × **100%** | 2,000 × **40%** = 800 |\n| **Unidades equivalentes** | **16,000** | **16,000** | **14,800** |\n\n! El **costo del departamento anterior** va al **100%** en las 2,000 unidades en proceso, porque esas unidades **ya salieron terminadas** del Mezclado: todo el costo del Dpto. 1 está completo en ellas. Aplicarles el 40% de avance del Dpto. 2 es el error más frecuente del costeo por procesos multidepartamental, y subvalúa el inventario en proceso. Los materiales del Dpto. 2 también van al 100% porque se agregan al inicio de ese proceso.\n\n**Paso 3 — Costo unitario equivalente**\n\n| Elemento | Costos a distribuir | UE | Costo unitario |\n|---|---|---|---|\n| Costo del Dpto. anterior | 131,200 | 16,000 | **8.20** |\n| Materiales Dpto. 2 | 52,500 | 16,000 | **3.28125** |\n| Conversión Dpto. 2 | 70,490 | 14,800 | **4.7628** |\n| **Costo unitario acumulado** | **254,190** | | **≈ 16.244** |\n\n**Paso 4 — Asignación**\n\n| Destino | Cálculo | Importe |\n|---|---|---|\n| Terminadas (a productos terminados) | 14,000 × 16.244 | ≈ 227,417 |\n| PP final — costo Dpto. anterior | 2,000 × 8.20 | 16,400 |\n| PP final — materiales Dpto. 2 | 2,000 × 3.28125 | 6,563 |\n| PP final — conversión Dpto. 2 | 800 × 4.7628 | 3,810 |\n| PP final total | | **26,773** |\n| **Total asignado** | | **≈ 254,190** ✓ |\n\n**RESUMEN PARA LOS ESTADOS FINANCIEROS**\n\n| Partida del inventario | Importe |\n|---|---|\n| Productos en proceso — Dpto. 1 (Mezclado) | 20,800 |\n| Productos en proceso — Dpto. 2 (Envasado) | 26,773 |\n| **Total productos en proceso (cuenta 23)** | **47,573** |\n| **Productos terminados del periodo (cuenta 21)** | **227,417** |\n\n**Asientos del flujo entre departamentos:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 23 | Productos en proceso — Envasado | 131,200.00 | |\n| 23 | Productos en proceso — Mezclado | | 131,200.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 21 | Productos terminados | 227,417.00 | |\n| 711 | Variación de productos terminados | | 227,417.00 |\n\n**Las cuatro lecciones del caso:**\n\n**1. El costo viaja con las unidades.** El Dpto. 2 no recibe unidades gratis: recibe S/ 131,200 de costo acumulado, que para él es un insumo al 100% de avance.\n\n**2. La verificación del paso 4 es la que detecta los errores.** En ambos departamentos el total asignado iguala el total a distribuir. Si en el Dpto. 2 se hubiera aplicado el 40% al costo del departamento anterior, las UE habrían sido 14,800 en lugar de 16,000, el costo unitario habría subido artificialmente a 8.865 y el total asignado no habría cuadrado.\n\n**3. El redondeo importa.** Los costos unitarios con muchos decimales, como S/ 4.7628, producen diferencias de centavos al asignar. La práctica correcta es trabajar con la mayor precisión posible en los unitarios y ajustar la diferencia de redondeo en la partida de mayor importe, dejando constancia en el papel de trabajo.\n\n**4. El informe entrega mucho más que el costo unitario.** De este ejercicio se desprende que el Dpto. 1 dejó 4,000 unidades en proceso de 20,000 disponibles (20%), mientras el Dpto. 2 dejó 2,000 de 16,000 (12.5%). Un inventario en proceso creciente en el Mezclado puede indicar un cuello de botella en el Envasado, y eso es información de gestión que ningún otro informe entrega.'}
  ],
  proy:{
   t:'Sistema de costeo de tu empresa',
   ctx:`Vas a elegir y construir el sistema de costeo que corresponde a la realidad de tu empresa, y a producir el documento central de ese sistema con datos propios.`,
   pasos:[
    'Analiza el proceso productivo de tu empresa que definiste en el subtema 8.3 y determina qué sistema le corresponde: por órdenes, por procesos o híbrido por operaciones. Justifica la elección con la pregunta de homogeneidad y rastreo.',
    'Si corresponde costeo por órdenes: diseña el formato de la hoja de costos por orden, el de la requisición de materiales y el de la boleta de tiempo, los tres con el campo del número de orden.',
    'Si corresponde costeo por procesos: define los departamentos o procesos, el punto en que se agrega cada material y el criterio para estimar el porcentaje de avance de la conversión.',
    'Procesa un periodo completo con el sistema elegido: al menos tres órdenes si es por órdenes, o un informe de producción y costos de al menos un departamento si es por procesos.',
    'Verifica el resultado: si es por órdenes, que los tres saldos de cierre se lean de las hojas; si es por procesos, que el total asignado iguale el total de costos a distribuir.',
    'Determina los saldos de cierre de productos en proceso y productos terminados, y el costo de ventas del periodo.',
    'Calcula la sobre o subaplicación de CIF y propón su tratamiento, con el prorrateo si la variación es significativa.',
    'Identifica si tu proceso tiene mermas y clasifícalas en normales y anormales, aplicando el tratamiento correspondiente al costo unitario.',
    'Elabora el procedimiento documentado del sistema: quién emite cada documento, cuándo, quién lo aprueba y dónde se archiva.'
   ],
   entrega:[
    'La determinación del sistema con su justificación.',
    'Los formatos del sistema elegido y el periodo procesado completo.',
    'Los saldos de cierre con su verificación y el análisis de la variación de CIF.',
    'El tratamiento de las mermas y el procedimiento documentado del sistema.'
   ],
   crit:[
    'La elección del sistema se justifica con la naturaleza de la producción, no con la industria en abstracto.',
    'Si es por procesos, el total asignado iguala exactamente el total de costos a distribuir.',
    'Si hay más de un departamento, el costo del departamento anterior figura al 100% de avance en las unidades en proceso.'
   ],
   pista:'Si tu empresa tiene materiales distintos por producto pero las mismas operaciones de producción, no fuerces ninguno de los dos sistemas puros: el costeo por operaciones es el que corresponde, y es el sistema real de la mayoría de las empresas de confección, calzado y alimentos del Perú.'
  },
  proyInt:{
   t:'Costo unitario verificable y defendible de tu producto',
   integra:'1.1 a 8.4',
   ctx:`Vas a producir un costo unitario que resista tres pruebas distintas: la de la NIC 2 para valuar el inventario, la de una fiscalización para sustentarlo documentalmente, y la de la gerencia para decidir precios.`,
   pasos:[
    'Consolida el costo unitario de tu producto principal usando el sistema de costeo elegido, con la descomposición en los tres elementos y su porcentaje sobre el total.',
    'Verifica el cumplimiento de la NIC 2: que los CIF fijos se hayan distribuido según la capacidad normal, que no se hayan capitalizado conceptos excluidos y que las mermas anormales estén en el resultado.',
    'Construye la trazabilidad documental del costo unitario: del comprobante de compra a la requisición, de la requisición a la hoja de costos o al informe de producción, de ahí al Kardex y al mayor de la cuenta de existencias.',
    'Verifica la coherencia con los otros módulos: que la MPD cuadre con el Kardex del subtema 8.2, que la MOD cuadre con la planilla del Módulo 6 y que los CIF no incluyan gastos del periodo.',
    'Actualiza los estados financieros del Módulo 6 con el inventario desagregado en materias primas, productos en proceso y productos terminados, y con el costo de ventas del sistema de costeo.',
    'Elabora el papel de trabajo del inventario al cierre: por cada partida, su composición, su respaldo documental y su valorización.',
    'Elabora el expediente de sustento del costo unitario, pensado para una fiscalización: la ficha de costo, la capacidad normal documentada, la base de asignación de CIF justificada y las hojas de costos o informes de producción del periodo.',
    'Elabora el informe a la gerencia con tres cifras del mismo producto: el costo para valuar inventarios, el costo variable unitario para decidir y el costo total con gastos del periodo para fijar precios.',
    'Actualiza el registro de contingencias con los riesgos de costeo: capacidad normal no documentada, base de asignación sin relación causal, mermas sin informe técnico e inventario en proceso sin respaldo.'
   ],
   entrega:[
    'El costo unitario con su descomposición y la verificación de cumplimiento de la NIC 2.',
    'La trazabilidad documental completa en cinco niveles.',
    'El papel de trabajo del inventario y el expediente de sustento del costo unitario.',
    'El informe de las tres cifras y el registro de contingencias actualizado.'
   ],
   crit:[
    'La trazabilidad recorre los cinco niveles sin interrupciones, con documentos reales identificados.',
    'El informe entrega tres cifras distintas del mismo producto, con la explicación de para qué sirve cada una.',
    'El expediente de sustento incluye la capacidad normal documentada, que es lo primero que se pide y lo que menos empresas tienen.'
   ],
   pista:'El informe de las tres cifras es el que más impacto tiene en una gerencia, porque desarma la idea de que el producto "cuesta" un número único. Preséntalo como una tabla de tres columnas con el uso de cada cifra en el encabezado, y la conversación sobre precios cambia por completo.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'costeo por órdenes, costeo por procesos, unidades equivalentes con promedio ponderado y PEPS, y costeo híbrido por operaciones'},
   {a:'Ralph S. Polimeni, Frank J. Fabozzi y Arthur H. Adelberg', o:'Contabilidad de costos: conceptos y aplicaciones para la toma de decisiones gerenciales', n:'hoja de costos por orden, informe de producción y costos y tratamiento de mermas en el costeo por procesos'},
   {a:'Don R. Hansen y Maryanne M. Mowen', o:'Cost Management: Accounting and Control', n:'acumulación del costo por departamento, costo transferido y cuellos de botella'},
   {a:'Juan García Colín', o:'Contabilidad de costos', n:'desarrollo paso a paso del costeo por órdenes y por procesos con casos resueltos'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'aplicación de los sistemas de costeo a sectores de la economía peruana'},
   {a:'NIC 2', o:'Inventarios', n:'tratamiento de los desperdicios anormales y medición del inventario de productos en proceso'}
  ]
 },
 {
  id:'m8t5', titulo:'Costeo estándar, análisis de variaciones y costeo ABC', min:28,
  cont:`Hasta aquí calculaste lo que el producto **costó**. El costeo estándar responde a una pregunta distinta y más útil: **cuánto debió costar**, y por qué no fue así. Y el costeo ABC responde a otra: si los costos indirectos están bien repartidos entre los productos.

# El costo estándar: qué es y qué no es
$ ESTÁNDAR: lo que un producto DEBERÍA costar en condiciones
$ de eficiencia normal alcanzable

|Tipo de estándar|Qué supone|Utilidad|
|**Ideal o teórico**|Eficiencia perfecta, sin desperdicio ni tiempo ocioso|Inalcanzable; desmotiva y genera variaciones siempre desfavorables|
|**Normal o alcanzable**|Condiciones de eficiencia razonables, con desperdicio y tiempos normales|**El que se usa**: exigente pero alcanzable|
|**Básico**|Fijo en el tiempo, como índice de comparación|Solo para análisis de tendencias|

! El estándar **no es un pronóstico** ni un promedio histórico. Si se construye promediando los costos reales de los últimos meses, se institucionaliza la ineficiencia existente: el estándar dirá que es normal desperdiciar lo que se desperdicia hoy. El estándar se construye con **estudios técnicos**: ingeniería de métodos, pruebas de rendimiento, estudios de tiempos y cotizaciones de mercado.

# Los dos componentes de todo estándar
$ Todo estándar tiene un componente de PRECIO y uno de CANTIDAD

|Elemento|Estándar de precio|Estándar de cantidad|
|Materia prima|Precio por kilo, metro o litro|Kilos, metros o litros por unidad de producto|
|Mano de obra|Tarifa por hora|Horas por unidad de producto|
|CIF|Tasa por hora de la base|Horas de la base por unidad de producto|

**La ficha de costo estándar unitario:**
|Elemento|Cantidad estándar|Precio estándar|Costo estándar|
|Materia prima|3 kg|8.00|24.00|
|Mano de obra directa|2 horas|12.00|24.00|
|CIF variable|2 horas|5.00|10.00|
|CIF fijo|2 horas|7.00|14.00|
|**Costo estándar unitario**|||**72.00**|

# El análisis de variaciones: la herramienta de control
$ VARIACIÓN = Costo real − Costo estándar de la producción real
$ Desfavorable (D) si el real es MAYOR; favorable (F) si es MENOR

La clave del análisis es que cada variación total se **descompone** en una de precio y una de cantidad, porque cada una tiene un responsable distinto.

**Variaciones de materia prima:**
$ Variación de PRECIO = (Precio real − Precio estándar) × Cantidad real
$ Variación de CANTIDAD o USO = (Cantidad real − Cantidad estándar de la producción real) × Precio estándar

**Variaciones de mano de obra directa:**
$ Variación de TARIFA = (Tarifa real − Tarifa estándar) × Horas reales
$ Variación de EFICIENCIA = (Horas reales − Horas estándar de la producción real) × Tarifa estándar

**Un caso completo.** Producción real de 1,000 unidades, con la ficha estándar anterior:

|Dato real|Valor|
|Material comprado y usado|3,200 kg a S/ 8.50 = 27,200|
|Mano de obra directa|1,900 horas a S/ 12.60 = 23,940|

**Materia prima:**
$ Cantidad estándar de la producción real = 1,000 u × 3 kg = 3,000 kg
$ Variación de precio = (8.50 − 8.00) × 3,200 = 1,600 DESFAVORABLE
$ Variación de cantidad = (3,200 − 3,000) × 8.00 = 1,600 DESFAVORABLE
$ Variación total = 3,200 D
$ Verificación: 27,200 real − 24,000 estándar (1,000 × 24) = 3,200 D ✓

**Mano de obra directa:**
$ Horas estándar de la producción real = 1,000 u × 2 h = 2,000 horas
$ Variación de tarifa = (12.60 − 12.00) × 1,900 = 1,140 DESFAVORABLE
$ Variación de eficiencia = (1,900 − 2,000) × 12.00 = 1,200 FAVORABLE
$ Variación total = 60 F
$ Verificación: 23,940 real − 24,000 estándar = 60 F ✓

> Observa la mano de obra: la variación **total** es favorable por S/ 60, un número insignificante que parece decir "todo bien". Pero esconde dos hechos relevantes: se pagó una tarifa más alta de la prevista (1,140 D) y se trabajó con mayor eficiencia que la estándar (1,200 F). Probablemente se usó personal más experimentado y más caro, que produjo más rápido. **El número total esconde las causas; la descomposición las revela.** Eso es todo el valor del análisis de variaciones.

# Quién responde por cada variación
|Variación|Responsable habitual|Causas típicas|
|**Precio de materiales**|**Compras**|Proveedor más caro, compra de urgencia, pérdida de descuento por volumen, tipo de cambio|
|**Cantidad de materiales**|**Producción**|Desperdicio, reproceso, material de mala calidad, personal sin capacitación, máquina descalibrada|
|**Tarifa de mano de obra**|**Recursos Humanos** o **Producción**|Uso de personal de mayor categoría, horas extras, cambio de escala salarial|
|**Eficiencia de mano de obra**|**Producción**|Paradas de máquina, falta de material, personal nuevo, mejora de métodos|

! **Las variaciones están conectadas y por eso no se evalúan por separado.** Una variación **favorable** de precio de materiales puede ser la causa de una **desfavorable** de cantidad: compras consiguió un material más barato y de peor calidad, y producción tuvo que desperdiciar más. Evaluar a compras por su variación favorable y castigar a producción por la desfavorable premia exactamente la decisión que dañó a la empresa. Las variaciones se leen **en conjunto**.

# Las variaciones de CIF
Son las más complejas porque mezclan comportamiento fijo y variable.

|Variación|Fórmula|Qué mide|
|**Gasto de CIF variable**|CIF variable real − (Tasa variable estándar × Horas reales)|Si se gastó más o menos por hora trabajada|
|**Eficiencia de CIF variable**|(Horas reales − Horas estándar) × Tasa variable estándar|El efecto de la eficiencia laboral sobre los CIF variables|
|**Gasto de CIF fijo**|CIF fijo real − CIF fijo presupuestado|Si se gastó más o menos de lo presupuestado|
|**Volumen o capacidad**|(Horas presupuestadas − Horas estándar de la producción real) × Tasa fija estándar|El efecto de producir más o menos de lo previsto: es la **capacidad ociosa**|

$ La variación de VOLUMEN no es una ineficiencia de costo: es el reflejo
$ de haber usado más o menos capacidad de la prevista.
$ Es la misma idea de la capacidad normal de la NIC 2, vista como variación

# El registro contable del costo estándar
El inventario se registra **al costo estándar**, y las variaciones se acumulan en cuentas propias que se liquidan al cierre.

@Consumo de materia prima al estándar, con la variación
91|Costos de producción — MP al estándar|24,000.00|
|Variación de precio de materiales|1,600.00|
|Variación de cantidad de materiales|1,600.00|
612|Variación de existencias — materias primas||27,200.00

$ Al cierre, las variaciones se liquidan:
$ si son poco significativas, contra el costo de ventas
$ si son significativas, prorrateadas entre proceso, terminados y costo de ventas

! Para efectos de la NIC 2, el costo estándar es una **técnica de medición admitida** siempre que se **aproxime al costo real**. Si las variaciones son grandes y persistentes, el estándar está desactualizado y el inventario está mal medido: hay que revisar el estándar, no seguir ajustando variaciones. Tributariamente, el inventario debe quedar valorizado a costo real, de modo que las variaciones deben liquidarse correctamente al cierre.

# El costeo basado en actividades (ABC)
El costeo tradicional asigna todos los CIF con **una sola base**. Cooper y Kaplan mostraron que eso produce distorsiones graves cuando los CIF son altos y los productos son diversos: los productos de **alto volumen y baja complejidad** terminan subsidiando a los de **bajo volumen y alta complejidad**.

$ La causa del problema: muchos CIF no son causados por el VOLUMEN
$ sino por la COMPLEJIDAD: preparar máquinas, mover materiales,
$ inspeccionar, programar, diseñar. Un lote de 50 unidades
$ consume casi los mismos recursos de preparación que uno de 5,000

**Los cinco pasos del ABC:**
1. **Identificar las actividades** significativas del proceso.
2. **Agrupar los costos** en pozos de costo por actividad.
3. **Identificar el generador de costo** (cost driver) de cada actividad: la variable que causa su consumo.
4. **Calcular la tasa** por actividad: costo del pozo ÷ volumen del generador.
5. **Asignar** a cada producto según su consumo real de cada generador.

**La jerarquía de actividades, que es el aporte conceptual central:**
|Nivel|Qué lo causa|Generador típico|Ejemplo|
|**Unitario**|Cada unidad producida|Horas-máquina, unidades|Energía de la máquina, material|
|**De lote**|Cada lote, independiente de su tamaño|Número de lotes o de preparaciones|Preparación de máquinas, movimientos de material, inspección por lote|
|**De producto**|La existencia del producto en el catálogo|Número de productos o de modificaciones|Diseño, ingeniería del producto, mantenimiento de especificaciones|
|**De instalación**|Sostener la planta en operación|No tiene generador razonable: se asigna arbitrariamente o se deja como costo del periodo|Alquiler de la planta, seguridad, gerencia de planta|

> La jerarquía explica el fenómeno: los costos de **nivel de lote y de producto** no varían con el volumen, de modo que repartirlos entre unidades producidas carga injustamente a los productos de alto volumen. El ABC los asigna según el número de lotes y de productos, que es lo que efectivamente los causa.

**Cuándo conviene implementar ABC:**
|Conviene si...|No conviene si...|
|Los CIF son una proporción **alta** del costo total|Los CIF son una proporción pequeña|
|Hay **alta diversidad** de productos, volúmenes y complejidad|Los productos son homogéneos y de volumen similar|
|La competencia exige precisión en precios|Los precios son fijados por el mercado y no hay margen de decisión|
|Se sospecha que algunos productos pierden dinero sin saber cuáles|El negocio es simple y el costeo tradicional es suficiente|

! El ABC es una herramienta de **gestión**, no necesariamente de valuación de inventarios. Su implementación completa es costosa, y en muchas empresas conviene aplicarlo como un **estudio puntual** —para decidir sobre una línea, revisar precios o evaluar la rentabilidad por cliente— sin convertirlo en el sistema contable permanente.

# Costos conjuntos y subproductos
Hay procesos que producen **varios productos simultáneamente** a partir de un mismo insumo, y hasta un punto determinado el costo es común e indivisible.

$ PUNTO DE SEPARACIÓN: el momento en que los productos conjuntos
$ se vuelven identificables por separado
$ COSTO CONJUNTO: el costo incurrido ANTES del punto de separación
$ COSTO IDENTIFICABLE: el costo incurrido DESPUÉS, por cada producto

Es la realidad de sectores centrales de la economía peruana: la **pesca** (harina, aceite, conservas), la **agroindustria** (aceite, torta, cáscara), la **minería polimetálica** (cobre, plata, zinc de un mismo concentrado) y los **lácteos**.

**Los métodos de asignación del costo conjunto:**
|Método|Cómo asigna|Cuándo conviene|
|**Unidades físicas**|En proporción al peso o volumen de cada producto|Cuando los productos tienen valores similares por unidad de medida|
|**Valor de venta en el punto de separación**|En proporción al valor de mercado en ese punto|Cuando existe mercado para los productos en el punto de separación|
|**Valor neto realizable (VNR)**|Valor final de venta menos los costos de procesamiento posteriores|Cuando no hay mercado en el punto de separación|
|**Margen bruto constante**|De modo que todos los productos muestren el mismo porcentaje de margen bruto|Cuando se busca uniformidad en la rentabilidad reportada|

! **La regla de decisión que hay que fijar:** el costo conjunto es **irrelevante** para decidir si conviene procesar un producto más allá del punto de separación. Ese costo ya se incurrió para obtener todos los productos y se incurriría igual con cualquier decisión posterior: es un **costo hundido** respecto de esa decisión. Lo relevante es comparar el **ingreso adicional** del procesamiento posterior con su **costo adicional**.

$ Procesar más allá del punto de separación conviene si:
$ Ingreso incremental del procesamiento adicional > Costo incremental del procesamiento adicional
$ El costo conjunto asignado NO entra en esa comparación

Esa es, probablemente, la aplicación más valiosa de todo el módulo en la industria peruana: muchas decisiones de "no vale la pena procesar este subproducto" se toman cargándole un costo conjunto asignado que no debería estar en el análisis.`,
  claves:['El estándar es lo que el producto debería costar en eficiencia normal alcanzable, construido con estudios técnicos y no con promedios históricos.','Toda variación se descompone en precio y cantidad, porque cada componente tiene un responsable distinto: el número total esconde las causas.','Las variaciones se leen en conjunto: una favorable de precio puede ser la causa de una desfavorable de cantidad.','El ABC corrige la distorsión del costeo tradicional asignando los costos de nivel de lote y de producto según lo que realmente los causa, no según el volumen.','El costo conjunto es irrelevante para decidir si procesar un producto más allá del punto de separación: solo importan los ingresos y costos incrementales.'],
  preg:[
   {p:'¿Por qué un estándar construido con promedios históricos es un mal estándar?',
    r:'Porque institucionaliza la ineficiencia que ya existe. Si durante los últimos seis meses la planta desperdició el 12% de la materia prima, un estándar basado en ese promedio dirá que desperdiciar el 12% es normal, y a partir de entonces ninguna variación señalará el problema: el desperdicio quedará escondido dentro del estándar. El estándar debe construirse con **estudios técnicos** —ingeniería de métodos, pruebas de rendimiento del material, estudios de tiempos, cotizaciones de mercado— que establezcan lo que **debería** costar el producto en condiciones de eficiencia razonable. Esa es la diferencia entre un sistema de control y un sistema que solo registra. El estándar tampoco debe ser ideal o teórico, porque un estándar inalcanzable genera variaciones siempre desfavorables, pierde credibilidad y deja de usarse.'},
   {p:'¿Por qué es un error evaluar a compras y a producción cada uno por su propia variación?',
    r:'Porque las variaciones están causalmente conectadas, y evaluarlas por separado puede premiar la decisión que dañó a la empresa. El caso típico: compras consigue un material más barato y obtiene una variación de precio **favorable**; pero ese material es de peor calidad, se desperdicia más y produce una variación de cantidad **desfavorable** mayor que el ahorro. Si se evalúa a compras solo por su variación de precio, se lo premia por una decisión que costó dinero, y si se castiga a producción por la variación de cantidad, se lo sanciona por un problema que no causó. La lectura correcta es **conjunta**: se suman ambas variaciones y se investiga la causa raíz. Lo mismo ocurre en mano de obra: una tarifa desfavorable con eficiencia favorable suele significar que se usó personal más caro y más rápido, lo que puede haber sido una buena decisión.'},
   {p:'¿Cuál es el problema del costeo tradicional que el ABC resuelve?',
    r:'Que asigna todos los costos indirectos con **una sola base** relacionada con el volumen —horas de mano de obra, horas-máquina o unidades—, cuando muchos de esos costos no son causados por el volumen sino por la **complejidad**. Preparar una máquina para un lote cuesta prácticamente lo mismo si el lote es de 50 o de 5,000 unidades; mover materiales, inspeccionar y programar también responden al número de lotes, no al número de unidades. Con una base de volumen, los productos de alto volumen absorben la mayor parte de esos costos y los de bajo volumen y alta complejidad aparecen artificialmente baratos. El resultado es un subsidio cruzado que la empresa no ve: fija precios bajos en los productos complejos que le cuestan mucho y altos en los simples que le cuestan poco, y pierde dinero sin entender por qué.'},
   {p:'¿Qué aporta la jerarquía de actividades del ABC?',
    r:'Explica **por qué** el costeo tradicional distorsiona, al clasificar los costos según el nivel en que se generan. Los costos de **nivel unitario** sí varían con el volumen y el costeo tradicional los asigna bien. Los de **nivel de lote** —preparaciones, movimientos, inspecciones— se causan una vez por lote, sin importar su tamaño. Los de **nivel de producto** —diseño, ingeniería, mantenimiento de especificaciones— se causan por la existencia del producto en el catálogo, sin importar cuánto se produzca. Y los de **nivel de instalación** —alquiler de la planta, seguridad, gerencia— sostienen la operación completa y no tienen un generador razonable. La jerarquía muestra que solo el primer nivel debería asignarse por volumen, y que los niveles de lote y de producto exigen generadores propios. También sugiere que los de instalación quizá no deberían asignarse a productos en absoluto para efectos de decisión.'},
   {p:'¿Por qué el costo conjunto no debe considerarse al decidir si procesar un subproducto?',
    r:'Porque es un **costo hundido** respecto de esa decisión. El costo conjunto se incurrió para obtener **todos** los productos simultáneamente, antes del punto de separación, y se incurriría exactamente igual se procese o no el subproducto después. Al ser idéntico en ambas alternativas, no puede influir en la elección. La comparación correcta es entre el **ingreso incremental** que genera el procesamiento adicional y su **costo incremental**: si el ingreso adicional supera el costo adicional, conviene procesar. Esto tiene una consecuencia muy concreta en la industria peruana: muchos subproductos de la pesca, la agroindustria y la minería se descartan como "no rentables" porque se les asignó una porción del costo conjunto que los vuelve deficitarios en el papel, cuando en realidad su procesamiento agregaría margen.'}
  ],
  ej:[
   {l:1,t:'num',p:'El estándar de materia prima es 3 kg a S/ 8.00 por kg. Se compraron y usaron 3,200 kg a S/ 8.50. Calcula la variación de precio de materiales.',
    u:'S/',r:1600,tol:5,
    s:'$ Variación de precio = (Precio real − Precio estándar) × Cantidad real\n$ = (8.50 − 8.00) × 3,200 = 0.50 × 3,200 = **S/ 1,600 DESFAVORABLE**\n\nEs desfavorable porque el precio real fue **mayor** que el estándar: la empresa pagó S/ 0.50 más por cada uno de los 3,200 kilos que efectivamente compró.\n\nNótese que la variación de precio se calcula sobre la **cantidad real**, no sobre la estándar. La razón es que el sobreprecio se pagó por todos los kilos adquiridos, independientemente de cuántos debieron usarse. El efecto de haber usado más kilos de los necesarios se mide por separado, en la **variación de cantidad**.\n\n**Responsable habitual:** el área de **compras**. Las causas típicas son un proveedor más caro, una compra de urgencia, la pérdida de un descuento por volumen o una variación del tipo de cambio en materiales importados.'},
   {l:1,t:'mc',p:'¿Quién es el responsable habitual de una variación desfavorable de cantidad de materiales?',
    o:['El área de compras','El área de producción','El área de finanzas','El área de ventas'],r:1,
    s:'El área de **producción**. La variación de cantidad mide si se usaron más o menos materiales de los que el estándar establece para la producción obtenida, y eso depende de cómo se ejecutó el proceso: desperdicio, reprocesos, personal sin capacitación, máquinas descalibradas o métodos de trabajo deficientes.\n\nCompras responde por la variación de **precio**, no de cantidad.\n\n**Pero la atribución no es automática, y ese es el matiz importante.** Si compras adquirió un material de menor calidad para obtener una variación de precio favorable, el desperdicio adicional en producción es consecuencia de esa decisión, no de la ejecución del proceso. Por eso las variaciones se leen **en conjunto** y se investiga la causa raíz antes de atribuir responsabilidades: evaluar cada área solo por su propia variación puede premiar la decisión que dañó a la empresa.'},
   {l:2,t:'num',p:'El estándar de mano de obra es 2 horas a S/ 12.00 por hora. Se produjeron 1,000 unidades usando 1,900 horas a S/ 12.60. Calcula el importe absoluto de la variación de eficiencia de mano de obra.',
    u:'S/',r:1200,tol:5,
    s:'$ Horas estándar de la producción real = 1,000 unidades × 2 horas = 2,000 horas\n$ Variación de eficiencia = (Horas reales − Horas estándar) × Tarifa estándar\n$ = (1,900 − 2,000) × 12.00 = −1,200 → **S/ 1,200 FAVORABLE**\n\nEs favorable porque se trabajaron **100 horas menos** de las que el estándar prevé para producir 1,000 unidades.\n\n**El análisis completo de la mano de obra, que es lo que hace útil el ejercicio:**\n\n| Variación | Cálculo | Importe |\n|---|---|---|\n| Tarifa | (12.60 − 12.00) × 1,900 | 1,140 **D** |\n| Eficiencia | (1,900 − 2,000) × 12.00 | 1,200 **F** |\n| **Variación total** | | **60 F** |\n\nVerificación: costo real 1,900 × 12.60 = 23,940; costo estándar 1,000 × 24 = 24,000 → **60 favorable** ✓\n\n**La lectura:** la variación total de S/ 60 favorable parece decir que no pasó nada relevante. Pero esconde dos hechos: se pagó una tarifa S/ 0.60 por hora más alta de la prevista, y se produjo con un 5% más de eficiencia que el estándar. La explicación más probable es que se usó **personal más experimentado y más caro**, que trabajó más rápido. Esa puede haber sido una buena decisión, y el análisis permite verla; el número total la hacía invisible.'},
   {l:2,t:'ab',p:'Con la ficha estándar (MP 3 kg a S/ 8; MOD 2 h a S/ 12; CIF variable 2 h a S/ 5; CIF fijo 2 h a S/ 7) y producción real de 1,000 unidades: se usaron 3,200 kg a S/ 8.50 y 1,900 horas a S/ 12.60; los CIF variables reales fueron S/ 10,200 y los fijos S/ 14,800, con CIF fijos presupuestados de S/ 14,000 para 2,000 horas. Elabora el análisis completo de variaciones y su interpretación.',
    s:'**Costo estándar de la producción real (1,000 unidades):**\n\n| Elemento | Cálculo | Importe |\n|---|---|---|\n| Materia prima | 1,000 × 3 kg × 8.00 | 24,000 |\n| Mano de obra directa | 1,000 × 2 h × 12.00 | 24,000 |\n| CIF variable | 1,000 × 2 h × 5.00 | 10,000 |\n| CIF fijo | 1,000 × 2 h × 7.00 | 14,000 |\n| **Costo estándar total** | | **72,000** |\n\n**Costo real:**\n\n| Elemento | Cálculo | Importe |\n|---|---|---|\n| Materia prima | 3,200 × 8.50 | 27,200 |\n| Mano de obra directa | 1,900 × 12.60 | 23,940 |\n| CIF variable | dato | 10,200 |\n| CIF fijo | dato | 14,800 |\n| **Costo real total** | | **76,140** |\n\n$ Variación total = 76,140 − 72,000 = 4,140 DESFAVORABLE\n\n**ANÁLISIS POR ELEMENTO**\n\n**1. Materia prima**\n\n| Variación | Fórmula | Cálculo | Importe |\n|---|---|---|---|\n| Precio | (Pr − Pe) × Cr | (8.50 − 8.00) × 3,200 | 1,600 D |\n| Cantidad | (Cr − Ce) × Pe | (3,200 − 3,000) × 8.00 | 1,600 D |\n| **Total MP** | | 27,200 − 24,000 | **3,200 D** ✓ |\n\n**2. Mano de obra directa**\n\n| Variación | Fórmula | Cálculo | Importe |\n|---|---|---|---|\n| Tarifa | (Tr − Te) × Hr | (12.60 − 12.00) × 1,900 | 1,140 D |\n| Eficiencia | (Hr − He) × Te | (1,900 − 2,000) × 12.00 | 1,200 F |\n| **Total MOD** | | 23,940 − 24,000 | **60 F** ✓ |\n\n**3. CIF variable**\n\n| Variación | Fórmula | Cálculo | Importe |\n|---|---|---|---|\n| Gasto | CIF var. real − (Tasa var. × Hr) | 10,200 − (5.00 × 1,900) = 10,200 − 9,500 | 700 D |\n| Eficiencia | (Hr − He) × Tasa var. | (1,900 − 2,000) × 5.00 | 500 F |\n| **Total CIF variable** | | 10,200 − 10,000 | **200 D** ✓ |\n\n**4. CIF fijo**\n\n| Variación | Fórmula | Cálculo | Importe |\n|---|---|---|---|\n| Gasto (presupuesto) | CIF fijo real − CIF fijo presupuestado | 14,800 − 14,000 | 800 D |\n| Volumen (capacidad) | (Horas presup. − He) × Tasa fija | (2,000 − 2,000) × 7.00 | 0 |\n| **Total CIF fijo** | | 14,800 − 14,000 | **800 D** ✓ |\n\n**RESUMEN**\n\n| Elemento | Precio / Gasto | Cantidad / Eficiencia | Volumen | Total |\n|---|---|---|---|---|\n| Materia prima | 1,600 D | 1,600 D | — | **3,200 D** |\n| Mano de obra | 1,140 D | 1,200 F | — | **60 F** |\n| CIF variable | 700 D | 500 F | — | **200 D** |\n| CIF fijo | 800 D | — | 0 | **800 D** |\n| **TOTAL** | **4,240 D** | **1,100 F** | **0** | **4,140 D** |\n\n**INTERPRETACIÓN, que es el verdadero entregable**\n\n**Hallazgo 1 — El problema está en la materia prima: S/ 3,200 D, el 77% de la variación total.** Y tiene dos componentes del mismo signo, lo que es revelador:\n\n| Componente | Importe | Lectura |\n|---|---|---|\n| Precio | 1,600 D | Se pagó S/ 0.50 más por kilo |\n| Cantidad | 1,600 D | Se usaron 200 kg más de los necesarios |\n\nQue **ambas** sean desfavorables descarta la explicación habitual del material barato de mala calidad: aquí se pagó **más** por el material **y además** se desperdició más. Las hipótesis a investigar son otras: una compra de urgencia a un proveedor caro de material que además no cumplía especificaciones, un problema de calibración de máquina que elevó el desperdicio, o personal nuevo sin capacitación. Esta es la línea de investigación prioritaria.\n\n**Hallazgo 2 — La mano de obra está bien gestionada.** La tarifa desfavorable de S/ 1,140 se compensó con eficiencia favorable de S/ 1,200: se usó personal más caro que trabajó más rápido. El resultado neto es positivo y la decisión parece acertada. Conviene verificar si fue deliberada o casual, para poder repetirla.\n\n**Hallazgo 3 — La eficiencia laboral arrastró a los CIF variables.** Las 100 horas menos trabajadas generaron S/ 500 de variación favorable en los CIF variables, porque se consumió menos de los recursos que dependen de las horas. Es un efecto secundario positivo de la eficiencia: los CIF variables siguen a la base.\n\n**Hallazgo 4 — Hay un sobregasto en los CIF.** El gasto de CIF variable (700 D) y el de CIF fijo (800 D) suman S/ 1,500 de sobregasto respecto de lo presupuestado. Hay que revisar las partidas concretas: energía, mantenimiento, suministros. Puede haber un mantenimiento no previsto o un aumento de tarifas.\n\n**Hallazgo 5 — No hay capacidad ociosa.** La variación de volumen es **cero** porque las horas estándar de la producción real (2,000) coincidieron exactamente con las horas presupuestadas (2,000). La planta trabajó al nivel previsto. Si hubiera producido menos, aparecería aquí la capacidad ociosa, que es la misma idea de la regla de capacidad normal de la NIC 2 vista como variación.\n\n**Las dos acciones que se desprenden:**\n\n1. **Investigar la compra de materia prima del periodo**: quién la hizo, a qué proveedor, por qué a ese precio, y si el material cumplía especificaciones. Es donde está el 77% del problema.\n2. **Revisar el detalle del sobregasto de CIF** por partida, para distinguir un hecho puntual de una tendencia.\n\n**Y una observación sobre el estándar mismo:** una variación total de S/ 4,140 sobre un costo estándar de S/ 72,000 es un desvío del 5.75%. Para la NIC 2, el costo estándar es una técnica de medición admitida siempre que **se aproxime al costo real**; un desvío de esta magnitud en un periodo es tolerable, pero si se repite mes tras mes significa que el estándar está desactualizado y el inventario está mal medido. En ese caso la solución no es seguir ajustando variaciones: es **revisar el estándar**.'},
   {l:3,t:'ab',p:'Una empresa fabrica dos productos y tiene CIF de S/ 400,000. El producto A: 10,000 unidades, 20,000 horas de MOD, 12,000 horas-máquina, 20 preparaciones de máquina, 200 movimientos de material. El producto B: 2,000 unidades, 4,000 horas de MOD, 3,000 horas-máquina, 80 preparaciones, 300 movimientos. Los CIF se componen de: preparación de máquinas S/ 150,000, manejo de materiales S/ 100,000 y costos relacionados con horas-máquina S/ 150,000. Compara el costeo tradicional por horas de MOD con el ABC.',
    s:'**COSTEO TRADICIONAL: una sola base de horas de mano de obra directa**\n\n$ Tasa única = 400,000 ÷ (20,000 + 4,000) horas MOD = 400,000 ÷ 24,000 = S/ 16.6667 por hora MOD\n\n| Producto | Horas MOD | CIF asignados | Unidades | **CIF unitario** |\n|---|---|---|---|---|\n| A | 20,000 | 333,333 | 10,000 | **33.33** |\n| B | 4,000 | 66,667 | 2,000 | **33.33** |\n| **Total** | 24,000 | 400,000 | | |\n\nEl costeo tradicional concluye que **ambos productos tienen idéntico CIF unitario de S/ 33.33**. Y como consumen horas de mano de obra en proporción a su volumen, esa conclusión es automática: con una base de volumen, el CIF unitario no puede diferir.\n\n**COSTEO ABC: una tasa por actividad, con su propio generador**\n\n**Paso 1 — Tasas por actividad**\n\n| Actividad | Costo del pozo | Generador | Volumen total | **Tasa** |\n|---|---|---|---|---|\n| Preparación de máquinas | 150,000 | Número de preparaciones | 20 + 80 = 100 | **1,500 por preparación** |\n| Manejo de materiales | 100,000 | Número de movimientos | 200 + 300 = 500 | **200 por movimiento** |\n| Relacionados con máquinas | 150,000 | Horas-máquina | 12,000 + 3,000 = 15,000 | **10 por hora-máquina** |\n\n**Paso 2 — Asignación a cada producto según su consumo real**\n\n| Actividad | Producto A | Producto B |\n|---|---|---|\n| Preparación de máquinas | 20 × 1,500 = **30,000** | 80 × 1,500 = **120,000** |\n| Manejo de materiales | 200 × 200 = **40,000** | 300 × 200 = **60,000** |\n| Relacionados con máquinas | 12,000 × 10 = **120,000** | 3,000 × 10 = **30,000** |\n| **CIF asignados** | **190,000** | **210,000** |\n| Unidades | 10,000 | 2,000 |\n| **CIF unitario** | **19.00** | **105.00** |\n\nVerificación: 190,000 + 210,000 = 400,000 ✓\n\n**LA COMPARACIÓN, que es el resultado del ejercicio**\n\n| Producto | CIF unitario **tradicional** | CIF unitario **ABC** | Diferencia | Efecto |\n|---|---|---|---|---|\n| **A** (alto volumen) | 33.33 | **19.00** | −14.33 | Estaba **sobrecosteado** en un 75% |\n| **B** (bajo volumen) | 33.33 | **105.00** | +71.67 | Estaba **subcosteado** en un 215% |\n\n$ El producto A subsidiaba al producto B por S/ 143,333\n$ (10,000 unidades × 14.33 de sobrecosteo)\n\n**POR QUÉ OCURRE: la jerarquía de actividades lo explica**\n\n| Dato | Producto A | Producto B | Observación |\n|---|---|---|---|\n| Unidades | 10,000 (83%) | 2,000 (17%) | A domina el volumen |\n| Preparaciones | 20 (20%) | **80 (80%)** | **B consume 4 veces más preparaciones con la quinta parte del volumen** |\n| Unidades por lote | 10,000 ÷ 20 = **500** | 2,000 ÷ 80 = **25** | B se produce en lotes diminutos |\n| Movimientos | 200 (40%) | 300 (60%) | B consume más movimientos |\n| Horas-máquina | 12,000 (80%) | 3,000 (20%) | Proporcional al volumen |\n\n**El hallazgo central:** el producto B se fabrica en lotes de **25 unidades** frente a los **500** del producto A. La preparación de máquinas cuesta casi lo mismo por lote, sin importar su tamaño: es un costo de **nivel de lote**. Repartir esos S/ 150,000 con una base de volumen hace que A absorba el 83% de un costo que B causa en un 80%.\n\n**LAS CONSECUENCIAS DE GESTIÓN**\n\nSupongamos que el costo directo (MP + MOD) es de S/ 50 en A y S/ 60 en B, y que la empresa fija precios con un 30% de margen sobre el costo total:\n\n| Concepto | **Producto A** | | **Producto B** | |\n|---|---|---|---|---|\n| | Tradicional | ABC | Tradicional | ABC |\n| Costo directo | 50.00 | 50.00 | 60.00 | 60.00 |\n| CIF | 33.33 | 19.00 | 33.33 | 105.00 |\n| **Costo total** | **83.33** | **69.00** | **93.33** | **165.00** |\n| Precio con 30% de margen | 108.33 | 89.70 | 121.33 | 214.50 |\n\n**Qué ha estado ocurriendo en la realidad.** Si la empresa vende B a S/ 121.33 creyendo que gana un 30%, y su costo real es S/ 165.00, **pierde S/ 43.67 en cada unidad de B**: S/ 87,340 al año. Y como vende A a S/ 108.33 cuando podría venderlo a S/ 89.70, es probable que esté perdiendo participación en su producto de mayor volumen frente a competidores más eficientes, o que simplemente esté dejando margen sobre la mesa en el mercado equivocado.\n\n$ Pérdida anual estimada en B: 2,000 × 43.67 = S/ 87,340\n$ Y posible pérdida de competitividad en A, su producto principal\n\n**LAS CUATRO ACCIONES QUE SE DESPRENDEN**\n\n| Nº | Acción | Fundamento |\n|---|---|---|\n| 1 | **Revisar el precio de B** o decidir si se mantiene en el catálogo | Está vendiéndose por debajo de su costo real |\n| 2 | **Aumentar el tamaño de lote de B** | Es la acción de mayor impacto y la que no requiere subir precios: pasar de lotes de 25 a lotes de 100 reduciría las preparaciones de 80 a 20 y bajaría el costo de preparación de B de S/ 120,000 a S/ 30,000, es decir de S/ 60 a S/ 15 por unidad |\n| 3 | **Evaluar reducir el precio de A** para ganar volumen | Su costo real permite competir con precios menores |\n| 4 | **Analizar la rentabilidad por cliente**, no solo por producto | Si un cliente exige entregas pequeñas y frecuentes, está causando los costos de nivel de lote, y el ABC permite verlo |\n\n**La acción 2 merece énfasis**, porque es la que más valor crea y la que el costeo tradicional hacía invisible: el problema de B no es su precio, es su **tamaño de lote**. El ABC no solo corrigió el costo: identificó la palanca de mejora.\n\n**LAS DOS ADVERTENCIAS PROFESIONALES**\n\n**1. El ABC es una herramienta de gestión, no necesariamente el sistema contable.** Implementar ABC de forma permanente exige medir los generadores de cada actividad en cada periodo, lo que tiene un costo administrativo real. En muchas empresas conviene aplicarlo como un **estudio puntual** —una vez al año, o antes de una decisión de precios o de catálogo— y mantener el costeo tradicional para la valuación mensual del inventario.\n\n**2. Para valuar inventarios bajo la NIC 2, lo que importa es que la asignación de los CIF sea razonable y sistemática.** El ABC lo es, y de hecho es más razonable que una base de volumen cuando no hay relación causal. Pero el cambio de método de asignación debe aplicarse de forma consistente y revelarse, porque modifica el valor del inventario y, con él, el resultado del ejercicio y el Impuesto a la Renta.'}
  ],
  proy:{
   t:'Costo estándar y análisis de variaciones de tu empresa',
   ctx:`Vas a construir el estándar de tu producto y a medir contra él, que es el paso que convierte la contabilidad de costos en un sistema de control.`,
   pasos:[
    'Construye la ficha de costo estándar unitario de tu producto principal, con el componente de precio y de cantidad de cada elemento: materia prima, mano de obra directa, CIF variable y CIF fijo.',
    'Documenta el sustento técnico de cada estándar de cantidad: cómo determinaste los kilos por unidad y las horas por unidad. Deja explícito que no se construyó con promedios históricos.',
    'Usa el costo laboral completo del Módulo 6 para la tarifa estándar de mano de obra, y la capacidad normal del subtema 8.3 para la tasa de CIF fijo.',
    'Toma los datos reales de un periodo de tu empresa y calcula las ocho variaciones: precio y cantidad de materiales, tarifa y eficiencia de mano de obra, gasto y eficiencia de CIF variable, y gasto y volumen de CIF fijo.',
    'Verifica cada variación total contra la diferencia entre el costo real y el costo estándar de la producción real.',
    'Elabora el cuadro resumen de variaciones y redacta la interpretación: qué ocurrió, qué hipótesis explican cada variación y qué variaciones están conectadas entre sí.',
    'Asigna un responsable a cada variación y señala expresamente los casos en que la atribución automática sería injusta.',
    'Registra los asientos del costo estándar y de las variaciones, y propón su liquidación al cierre.',
    'Evalúa si el estándar se aproxima al costo real como exige la NIC 2: calcula el desvío porcentual y determina si corresponde revisar el estándar.'
   ],
   entrega:[
    'La ficha de costo estándar con el sustento técnico de cada componente.',
    'El cálculo de las ocho variaciones con su verificación.',
    'El cuadro resumen con la interpretación y la asignación de responsables.',
    'Los asientos del costo estándar y la evaluación del desvío frente a la NIC 2.'
   ],
   crit:[
    'El estándar de cantidad tiene sustento técnico documentado, no es un promedio histórico.',
    'Cada variación total se verifica contra la diferencia entre costo real y costo estándar de la producción real.',
    'La interpretación identifica las conexiones entre variaciones, no las evalúa de forma aislada.'
   ],
   pista:'Para verificar que no te equivocaste en ninguna variación, suma todas las variaciones de un elemento: el resultado debe ser exactamente igual al costo real menos el costo estándar de ese elemento. Si no coincide, hay un error en una de las dos fórmulas.'
  },
  proyInt:{
   t:'Estudio de rentabilidad por producto con ABC',
   integra:'1.1 a 8.5',
   ctx:`Vas a hacer el estudio que revela qué productos de tu empresa ganan dinero y cuáles lo pierden, usando toda la información de costos, tributaria y laboral que has construido.`,
   pasos:[
    'Identifica las actividades significativas del proceso de tu empresa y agrupa los CIF en pozos de costo por actividad.',
    'Para cada actividad, identifica su generador de costo y clasifícala en la jerarquía: nivel unitario, de lote, de producto o de instalación.',
    'Mide el consumo de cada generador por producto o línea: unidades, lotes, preparaciones, movimientos, horas-máquina, según corresponda.',
    'Calcula la tasa por actividad y asigna los CIF a cada producto con el método ABC.',
    'Compara el resultado con la asignación por una base única de volumen y cuantifica el subsidio cruzado entre productos.',
    'Construye el costo total por producto sumando el costo directo, los CIF por ABC, el costo laboral completo del Módulo 6 asignado correctamente, y los gastos del periodo asignables.',
    'Compara el costo total por producto con su precio de venta real y determina el margen de cada uno. Identifica si alguno se vende por debajo de su costo.',
    'Para los productos con margen negativo o bajo, identifica la palanca de mejora: tamaño de lote, precio, rediseño del proceso o eliminación del catálogo.',
    'Verifica el efecto tributario de cambiar la asignación de CIF: cómo afecta el valor del inventario, el costo de ventas, el resultado del ejercicio y el Impuesto a la Renta.',
    'Elabora el informe de dos páginas a la gerencia: el ranking de rentabilidad por producto, el subsidio cruzado cuantificado, las tres acciones prioritarias y su efecto estimado.'
   ],
   entrega:[
    'El mapa de actividades con sus generadores y su clasificación en la jerarquía.',
    'La asignación ABC comparada con la base única, con el subsidio cruzado cuantificado.',
    'El margen real por producto y la palanca de mejora de cada uno.',
    'El análisis del efecto tributario y el informe de dos páginas a la gerencia.'
   ],
   crit:[
    'Cada actividad tiene un generador con relación causal y está clasificada en el nivel correcto de la jerarquía.',
    'El subsidio cruzado está cuantificado en soles, no solo señalado.',
    'Las palancas de mejora son operativas y no se limitan a subir precios.'
   ],
   pista:'La palanca de mejora más potente y la que casi nadie identifica es el tamaño de lote. Si un producto se fabrica en lotes pequeños, los costos de preparación por unidad son enormes, y duplicar el tamaño del lote los reduce a la mitad sin tocar el precio ni el proceso.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'costeo estándar, análisis de variaciones de dos, tres y cuatro factores, y costeo basado en actividades'},
   {a:'Robin Cooper y Robert S. Kaplan', o:'The Design of Cost Management Systems', n:'origen del costeo ABC, jerarquía de actividades y distorsión del costeo por bases de volumen'},
   {a:'Robert S. Kaplan y Robin Cooper', o:'Cost and Effect: Using Integrated Cost Systems to Drive Profitability and Performance', n:'implementación del ABC y su uso en decisiones de precios y de catálogo'},
   {a:'Don R. Hansen y Maryanne M. Mowen', o:'Cost Management: Accounting and Control', n:'costeo estándar, responsabilidad por las variaciones y asignación de costos conjuntos'},
   {a:'David Noel Ramírez Padilla', o:'Contabilidad administrativa', n:'análisis de variaciones con enfoque de gestión y costeo de productos conjuntos'},
   {a:'NIC 2', o:'Inventarios', n:'el costo estándar como técnica de medición admitida siempre que se aproxime al costo real'}
  ]
 },
 {
  id:'m8t6', titulo:'Costeo variable, punto de equilibrio y decisiones de corto plazo', min:28,
  cont:`Este subtema es, probablemente, el de mayor retorno práctico de todo el curso. No sirve para valuar inventarios ni para declarar impuestos: sirve para **decidir**, y las decisiones que se toman con esta información valen mucho más que las horas que cuesta aprenderla.

# Costeo absorbente y costeo variable
La diferencia es una sola, y lo cambia todo: el tratamiento de los **CIF fijos**.

|Aspecto|**Costeo absorbente**|**Costeo variable**|
|CIF fijos|**Costo del producto**: se capitalizan en el inventario|**Costo del periodo**: van al resultado completos|
|Inventario incluye|MPD + MOD + CIF variables + **CIF fijos**|MPD + MOD + CIF variables|
|¿Admitido por la NIC 2?|**Sí, es el obligatorio**|**No**|
|¿Admitido tributariamente?|**Sí**|**No**|
|Para qué sirve|Valuar inventarios y determinar resultados|**Decidir** y controlar|

$ El costeo variable es una herramienta INTERNA de gestión.
$ Los estados financieros y la declaración de renta se preparan
$ con costeo ABSORBENTE, sin excepción

# El efecto en la utilidad: el fenómeno que hay que entender
$ Si PRODUCCIÓN > VENTAS: el absorbente muestra MÁS utilidad,
$ porque difiere CIF fijos en el inventario que crece
$ Si PRODUCCIÓN < VENTAS: el variable muestra MÁS utilidad,
$ porque el absorbente libera CIF fijos del inventario que se consume
$ Si PRODUCCIÓN = VENTAS: las dos utilidades COINCIDEN

$ Conciliación = CIF fijo unitario × (Unidades producidas − Unidades vendidas)

! Esa diferencia es la razón de fondo por la que el costeo variable es superior para decidir: en el costeo absorbente, **la utilidad se puede aumentar produciendo más, aunque no se venda nada más**. Una gerencia evaluada por la utilidad del absorbente tiene un incentivo perverso a sobreproducir, llenando el almacén de inventario que inmoviliza caja. En el costeo variable eso es imposible: la utilidad depende solo de las ventas.

# El estado de resultados de contribución
$ VENTAS
$ (−) Costos y gastos VARIABLES (de producción, de venta y de administración)
$ = MARGEN DE CONTRIBUCIÓN
$ (−) Costos y gastos FIJOS
$ = UTILIDAD OPERATIVA

|Concepto|Fórmula|Significado|
|**Margen de contribución unitario (MCu)**|Precio − Costo variable unitario|Lo que cada unidad **aporta** para cubrir los fijos|
|**Razón de contribución (RC)**|MCu ÷ Precio|La proporción de cada sol de venta que queda para cubrir fijos|
|**Margen de contribución total**|Ventas − Costos variables totales|El aporte total de la operación|

> El **margen de contribución** es el concepto más útil de la contabilidad de gestión. No es utilidad: es lo que queda de cada venta después de pagar lo que esa venta hizo gastar. Mientras el margen de contribución de un producto sea **positivo**, ese producto está ayudando a pagar los costos fijos de la empresa, aunque su estado de resultados individual muestre pérdida.

# El punto de equilibrio
$ PUNTO DE EQUILIBRIO: el nivel de actividad en que la utilidad operativa es CERO,
$ es decir donde el margen de contribución iguala exactamente a los costos fijos

$ PE en UNIDADES = Costos fijos ÷ Margen de contribución unitario
$ PE en SOLES = Costos fijos ÷ Razón de contribución

**Un caso completo.** Precio S/ 50, costo variable unitario S/ 30, costos fijos S/ 240,000:
$ MCu = 50 − 30 = S/ 20
$ RC = 20 ÷ 50 = 0.40 (40%)
$ PE en unidades = 240,000 ÷ 20 = 12,000 unidades
$ PE en soles = 240,000 ÷ 0.40 = S/ 600,000

Verificación:
|Concepto|Importe|
|Ventas (12,000 × 50)|600,000|
|Costos variables (12,000 × 30)|(360,000)|
|Margen de contribución|240,000|
|Costos fijos|(240,000)|
|**Utilidad operativa**|**0** ✓|

**Las variantes que se usan en la práctica:**
$ Unidades para una UTILIDAD META = (Costos fijos + Utilidad meta) ÷ MCu
$ Unidades para una utilidad DESPUÉS de impuestos:
$ primero se convierte a antes de impuestos: UAI = Utilidad deseada ÷ (1 − tasa)
$ luego se aplica la fórmula anterior

$ Ejemplo con utilidad después de impuestos de S/ 56,400 y tasa del 29.5%:
$ UAI = 56,400 ÷ (1 − 0.295) = 56,400 ÷ 0.705 = 80,000
$ Unidades = (240,000 + 80,000) ÷ 20 = 16,000 unidades

# Margen de seguridad y apalancamiento operativo
$ MARGEN DE SEGURIDAD = (Ventas reales − Ventas en el punto de equilibrio) ÷ Ventas reales
$ Mide cuánto pueden caer las ventas antes de entrar en pérdida

$ GRADO DE APALANCAMIENTO OPERATIVO (GAO) = Margen de contribución ÷ Utilidad operativa
$ Mide cuánto AMPLIFICA la utilidad un cambio en las ventas

$ % de cambio en la utilidad = GAO × % de cambio en las ventas

**Con ventas de 18,000 unidades:**
|Indicador|Cálculo|Resultado|
|Ventas|18,000 × 50|900,000|
|Margen de contribución|18,000 × 20|360,000|
|Utilidad operativa|360,000 − 240,000|120,000|
|**Margen de seguridad**|(900,000 − 600,000) ÷ 900,000|**33.3%**|
|**GAO**|360,000 ÷ 120,000|**3.0**|

$ Interpretación del GAO de 3.0: un aumento del 10% en ventas
$ produce un aumento del 30% en la utilidad operativa.
$ Y una CAÍDA del 10% en ventas produce una caída del 30% en la utilidad

! El apalancamiento operativo es un **arma de doble filo** y depende de la estructura de costos. Una empresa con muchos costos fijos y pocos variables tiene un GAO alto: gana mucho cuando las ventas suben y pierde mucho cuando bajan. Una empresa con estructura más variable —personal a destajo, tercerización, alquiler en lugar de compra— tiene un GAO bajo: gana menos en los buenos tiempos y sufre menos en los malos. Elegir la estructura de costos es, en el fondo, elegir el nivel de riesgo operativo del negocio.

# El punto de equilibrio con varios productos
Con más de un producto, el punto de equilibrio depende de la **mezcla de ventas**, porque cada producto aporta un margen distinto.

$ MCu PONDERADO = Σ (MCu de cada producto × su participación en la mezcla)
$ PE total en unidades = Costos fijos ÷ MCu ponderado
$ Luego se reparte entre los productos según la mezcla

|Producto|MCu|Participación en la mezcla|Aporte ponderado|
|A|20|60%|12.00|
|B|35|30%|10.50|
|C|12|10%|1.20|
|**MCu ponderado**|||**23.70**|

$ PE = 240,000 ÷ 23.70 = 10,127 unidades totales
$ De las cuales: A = 6,076 u, B = 3,038 u, C = 1,013 u

! El punto de equilibrio con varios productos es **válido solo para esa mezcla**. Si la mezcla cambia hacia productos de menor margen, el punto de equilibrio sube aunque nada más haya cambiado. Es una de las causas más frecuentes de que una empresa venda más y gane menos.

# Los supuestos del análisis: saber dónde deja de servir
|Supuesto|Qué significa|Cuándo se rompe|
|**Linealidad**|El precio y el costo variable unitario son constantes|Descuentos por volumen, horas extras, precios escalonados de insumos|
|**Rango relevante**|Los costos fijos no cambian|Al necesitar otra planta, otro turno o otro supervisor|
|**Mezcla constante**|La proporción entre productos se mantiene|Cambios de demanda o de estrategia comercial|
|**Inventarios constantes**|Lo producido se vende|Producción para stock o venta de inventarios acumulados|

$ El análisis costo-volumen-utilidad es una aproximación poderosa
$ dentro de un rango. Fuera de ese rango, no sirve

# Las cinco decisiones de corto plazo
En todas rige la misma regla: **solo costos relevantes, más el costo de oportunidad**.

**1. Aceptar o rechazar un pedido especial.** Relevante: el costo variable y cualquier costo fijo incremental. Irrelevante: los costos fijos existentes. Verificar siempre la capacidad disponible y el riesgo de erosión del precio regular.

**2. Fabricar o comprar (make or buy).**
$ Relevante al fabricar: costo variable de fabricación + costos fijos EVITABLES + costo de oportunidad de la capacidad usada
$ Relevante al comprar: precio de compra + costos de adquisición
$ Irrelevante: los costos fijos que subsisten aunque se deje de fabricar

**3. Eliminar o mantener una línea de producto.**
$ Relevante: el margen de contribución que se PIERDE y los costos fijos EVITABLES que se ahorran
$ Irrelevante: los costos fijos asignados que subsisten

! Este es el error más costoso de la gestión por costos. Una línea con margen de contribución positivo que muestra "pérdida" en el estado de resultados **no debe eliminarse** si esa pérdida proviene de costos fijos asignados que no desaparecerán. Al eliminarla, la empresa pierde el margen de contribución y mantiene los fijos: termina **peor**, no mejor.

**4. Vender ahora o procesar más.** Relevante: el ingreso incremental y el costo incremental del procesamiento adicional. Irrelevante: el costo conjunto o el costo ya incurrido hasta ese punto.

**5. Uso óptimo de un recurso escaso.** Cuando hay una restricción —horas-máquina, horas de un especialista, metros cuadrados, materia prima limitada— la prioridad **no** se da al producto de mayor margen de contribución unitario, sino al de mayor **margen de contribución por unidad del recurso escaso**.

$ Criterio de priorización = Margen de contribución unitario ÷ Consumo del recurso escaso

|Producto|MCu|Horas-máquina por unidad|**MC por hora-máquina**|Prioridad|
|X|20.00|2|**10.00**|2|
|Y|36.00|4|**9.00**|3|
|Z|15.00|1|**15.00**|**1**|

> Observa el resultado, que es contraintuitivo y por eso vale la pena fijarlo: el producto **Y** tiene el **mayor** margen unitario (S/ 36) y es el **último** en prioridad, porque consume cuatro horas de la máquina por cada unidad. El producto **Z**, con el margen unitario más bajo (S/ 15), es el **primero**, porque genera S/ 15 por cada hora del recurso escaso. Cuando hay una restricción, lo que se maximiza no es el margen por unidad de producto: es el margen por unidad de **recurso restringido**.

$ Y si hay más de una restricción simultánea, el problema se resuelve
$ con programación lineal, no con una regla simple`,
  claves:['La única diferencia entre costeo absorbente y variable es el tratamiento de los CIF fijos; el absorbente es el obligatorio para la NIC 2 y para tributar, el variable es herramienta interna.','En el costeo absorbente la utilidad puede aumentarse produciendo más sin vender más; en el variable la utilidad depende solo de las ventas.','El punto de equilibrio es costos fijos sobre margen de contribución unitario, y con varios productos depende de la mezcla de ventas.','Una línea con margen de contribución positivo no se elimina aunque muestre pérdida: al eliminarla se pierde el margen y los fijos asignados subsisten.','Con un recurso escaso, la prioridad se da al mayor margen de contribución por unidad del recurso restringido, no al mayor margen por unidad de producto.'],
  preg:[
   {p:'¿Por qué el costeo variable no puede usarse para valuar inventarios aunque sea mejor para decidir?',
    r:'Porque la NIC 2 exige que los costos de transformación incluyan la distribución sistemática de los costos indirectos de producción **fijos y variables**, y la norma tributaria peruana sigue el mismo criterio. El fundamento es que los costos fijos de producción se incurren para fabricar el producto y por tanto forman parte de su costo: un inventario valuado sin ellos estaría subvaluado. El costeo variable, en cambio, los trata como gasto del periodo. La consecuencia práctica es que una empresa debe llevar los dos: el **absorbente** para sus estados financieros y su declaración de renta, y el **variable** como herramienta interna para decidir. No son sistemas alternativos entre los que haya que elegir: son dos lecturas del mismo conjunto de costos, para propósitos distintos.'},
   {p:'¿Por qué el costeo absorbente crea un incentivo perverso a sobreproducir?',
    r:'Porque capitaliza los costos indirectos fijos en el inventario. Si una empresa produce más de lo que vende, parte de esos costos fijos se queda en el inventario del activo en lugar de ir al resultado, de modo que la utilidad del periodo **aumenta** aunque las ventas no hayan cambiado. Una gerencia evaluada por la utilidad del costeo absorbente puede mejorar su indicador simplemente llenando el almacén, lo que inmoviliza caja, genera riesgo de obsolescencia y no agrega ningún valor. Con costeo variable eso es imposible: todos los costos fijos van al resultado del periodo, de modo que la utilidad depende exclusivamente de lo que se vendió. Por eso los informes internos de gestión se preparan en formato de contribución, aunque los estados financieros oficiales usen el absorbente.'},
   {p:'Una línea de producto muestra pérdida en el estado de resultados. ¿Hay que eliminarla?',
    r:'No necesariamente, y eliminarla sin analizar es uno de los errores más costosos de la gestión. Lo que hay que calcular es su **margen de contribución** —ventas menos costos variables— y, por separado, qué costos fijos **desaparecerían** efectivamente si la línea se elimina. Si el margen de contribución es positivo y supera los costos fijos evitables, la línea está **aportando** a cubrir los costos fijos generales de la empresa, y eliminarla empeoraría el resultado total: se perdería el margen y los costos fijos asignados subsistirían, repartidos ahora entre menos líneas. La "pérdida" que muestra el estado de resultados proviene de una asignación de costos fijos que no desaparece con la línea. La decisión correcta requiere distinguir lo evitable de lo inevitable, y esa distinción no aparece en ningún estado financiero.'},
   {p:'¿Por qué con un recurso escaso se prioriza el producto de menor margen unitario?',
    r:'Porque lo que la empresa debe maximizar no es el margen por unidad de **producto** sino el margen por unidad del **recurso restringido**, que es lo verdaderamente limitado. Si la máquina solo tiene 1,000 horas disponibles, la pregunta no es cuánto gana la empresa por cada unidad vendida, sino cuánto gana por cada hora de máquina empleada. Un producto con margen unitario de S/ 36 que consume 4 horas genera S/ 9 por hora; uno con margen de S/ 15 que consume 1 hora genera S/ 15 por hora. Con las mismas 1,000 horas, el segundo produce S/ 15,000 de margen y el primero solo S/ 9,000. El resultado es contraintuitivo y por eso es tan frecuente que las empresas prioricen mal: miran la rentabilidad del producto en lugar de la productividad del recurso que las limita.'},
   {p:'¿Qué significa un grado de apalancamiento operativo de 3.0 y qué decisión se desprende?',
    r:'Significa que cada 1% de variación en las ventas produce un 3% de variación en la utilidad operativa, en la misma dirección. Un aumento del 10% en ventas eleva la utilidad un 30%; una caída del 10% la reduce un 30%. El GAO depende de la estructura de costos: cuanto mayor es la proporción de costos fijos, mayor es el apalancamiento. La decisión que se desprende es de **gestión del riesgo**: una empresa con demanda estable y creciente puede beneficiarse de un GAO alto, invirtiendo en capacidad propia y automatización; una empresa con demanda volátil o en un mercado incierto debería buscar un GAO bajo, con estructura más variable: personal a destajo, tercerización de procesos, alquiler en lugar de compra de activos. Elegir la estructura de costos es elegir cuánto riesgo operativo asume el negocio.'}
  ],
  ej:[
   {l:1,t:'num',p:'Precio de venta S/ 50, costo variable unitario S/ 30, costos fijos S/ 240,000. Calcula el punto de equilibrio en unidades.',
    u:'unidades',r:12000,tol:0,
    s:'$ Margen de contribución unitario = 50 − 30 = S/ 20\n$ Punto de equilibrio en unidades = Costos fijos ÷ MCu = 240,000 ÷ 20 = **12,000 unidades**\n\n**Verificación:**\n\n| Concepto | Importe |\n|---|---|\n| Ventas (12,000 × 50) | 600,000 |\n| Costos variables (12,000 × 30) | (360,000) |\n| Margen de contribución | 240,000 |\n| Costos fijos | (240,000) |\n| **Utilidad operativa** | **0** ✓ |\n\nY el punto de equilibrio **en soles** se obtiene con la razón de contribución:\n\n$ RC = 20 ÷ 50 = 0.40\n$ PE en soles = 240,000 ÷ 0.40 = **S/ 600,000**\n\nLa versión en soles es la más útil para una empresa con muchos productos o para una de servicios, donde no hay una "unidad" clara que contar.'},
   {l:1,t:'mc',p:'Una línea de producto tiene margen de contribución positivo de S/ 50,000 pero muestra pérdida de S/ 20,000 por los costos fijos asignados, de los cuales solo S/ 15,000 son evitables. ¿Qué corresponde hacer?',
    o:['Eliminarla, porque muestra pérdida','Mantenerla, porque eliminarla empeoraría el resultado total en S/ 35,000','Eliminarla solo si no hay otra alternativa','Reducir su precio para aumentar el volumen'],r:1,
    s:'**Mantenerla.** El análisis de costos relevantes:\n\n| Concepto | Efecto de eliminar la línea |\n|---|---|\n| Margen de contribución que se **pierde** | (50,000) |\n| Costos fijos **evitables** que se ahorran | 15,000 |\n| **Efecto neto en el resultado de la empresa** | **(35,000)** |\n\nEliminar la línea empeoraría el resultado total en **S/ 35,000**: la empresa perdería los S/ 50,000 de margen de contribución y solo se ahorraría S/ 15,000 de costos fijos. Los otros S/ 55,000 de fijos asignados **subsistirían**, repartidos ahora entre las líneas restantes, que empezarían a mostrar pérdidas que antes no tenían.\n\nLa "pérdida" de S/ 20,000 que muestra el estado de resultados de la línea es un artefacto de la **asignación** de costos fijos, no una pérdida real. Es el error de gestión más costoso de este módulo, y la razón por la que un contador debe saber distinguir lo evitable de lo inevitable: esa distinción no aparece en ningún estado financiero.'},
   {l:2,t:'num',p:'Con precio S/ 50, costo variable S/ 30 y costos fijos S/ 240,000, ¿cuántas unidades hay que vender para obtener una utilidad DESPUÉS de impuestos de S/ 56,400, con una tasa de Impuesto a la Renta del 29.5%?',
    u:'unidades',r:16000,tol:0,
    s:'**Paso 1 — Convertir la utilidad deseada a antes de impuestos**\n\n$ Utilidad antes de impuestos = Utilidad deseada ÷ (1 − tasa)\n$ UAI = 56,400 ÷ (1 − 0.295) = 56,400 ÷ 0.705 = **S/ 80,000**\n\n**Paso 2 — Aplicar la fórmula del punto de equilibrio con utilidad meta**\n\n$ Unidades = (Costos fijos + Utilidad antes de impuestos) ÷ MCu\n$ = (240,000 + 80,000) ÷ 20 = 320,000 ÷ 20 = **16,000 unidades**\n\n**Verificación completa:**\n\n| Concepto | Importe |\n|---|---|\n| Ventas (16,000 × 50) | 800,000 |\n| Costos variables (16,000 × 30) | (480,000) |\n| Margen de contribución | 320,000 |\n| Costos fijos | (240,000) |\n| **Utilidad antes de impuestos** | **80,000** |\n| Impuesto a la Renta (29.5%) | (23,600) |\n| **Utilidad después de impuestos** | **56,400** ✓ |\n\nEl error habitual es dividir directamente (240,000 + 56,400) entre 20, lo que daría 14,820 unidades: con ese volumen la utilidad después de impuestos sería de solo S/ 39,762. La conversión del paso 1 es indispensable, y es la que se olvida.'},
   {l:2,t:'ab',p:'Una empresa fabrica un componente con costo unitario de S/ 50: materia prima S/ 20, mano de obra directa S/ 12, CIF variables S/ 10 y CIF fijos asignados S/ 8. Un proveedor ofrece suministrarlo a S/ 46 por unidad. El consumo anual es de 20,000 unidades. De los CIF fijos, S/ 3 por unidad corresponden a la depreciación de una máquina dedicada que podría venderse, y el resto son costos generales de planta. Analiza la decisión.',
    s:'**El análisis naive, que lleva a la decisión equivocada:**\n\n$ Costo de fabricar = S/ 50 > Precio de compra = S/ 46 → "comprar ahorra S/ 4 por unidad"\n\nEse razonamiento compara el costo **total** de fabricar con el precio de comprar, e incluye costos fijos que no desaparecen si se deja de fabricar. Es incorrecto.\n\n**El análisis correcto: solo costos relevantes**\n\n**Paso 1 — Separar los costos fijos entre evitables e inevitables**\n\n| Concepto | Importe unitario | ¿Desaparece si se compra? |\n|---|---|---|\n| Materia prima | 20.00 | **Sí** |\n| Mano de obra directa | 12.00 | **Sí** |\n| CIF variables | 10.00 | **Sí** |\n| CIF fijos — depreciación de máquina dedicada | 3.00 | **Sí**, si la máquina se vende o se da otro uso |\n| CIF fijos — generales de planta | 5.00 | **No**: el alquiler, la supervisión y los seguros subsisten |\n| **Costo unitario total** | **50.00** | |\n| **Costo RELEVANTE de fabricar** | **45.00** | |\n\n**Paso 2 — La comparación correcta**\n\n| Alternativa | Costo relevante unitario | Costo anual (20,000 u) |\n|---|---|---|\n| **Fabricar** | 45.00 | 900,000 |\n| **Comprar** | 46.00 | 920,000 |\n| **Diferencia a favor de fabricar** | **1.00** | **20,000** |\n\n**Conviene seguir fabricando**, con un ahorro de S/ 20,000 al año. La conclusión es la **opuesta** a la del análisis naive.\n\n**Por qué:** los S/ 5 de costos generales de planta se pagan igual se fabrique o se compre. Al dejar de fabricar, esos S/ 100,000 anuales (20,000 × 5) tendrían que ser absorbidos por los demás productos, de modo que el "ahorro" de comprar es ilusorio.\n\n**Paso 3 — El costo de oportunidad, que puede invertir el resultado**\n\nAquí está el factor que casi nunca se considera. Si se deja de fabricar, se libera **capacidad**: la máquina dedicada, el espacio y las horas de producción. ¿Qué podría hacerse con ellos?\n\n| Escenario de uso alternativo | Efecto en la decisión |\n|---|---|\n| La capacidad liberada no tiene uso alternativo | **Fabricar** sigue conviniendo: ahorro de 20,000 |\n| La máquina puede **venderse** por S/ 60,000 | Es un ingreso único, no anual. Se evalúa aparte, con el valor presente del ahorro anual de fabricar |\n| La capacidad permite producir otro producto con margen de contribución de **S/ 15,000** anuales | Costo de oportunidad de fabricar = 15,000. Ahorro neto de fabricar = 20,000 − 15,000 = 5,000. **Todavía conviene fabricar**, pero el margen se estrecha |\n| La capacidad permite un producto con margen de **S/ 35,000** anuales | Costo de oportunidad 35,000 > ahorro 20,000. **Conviene comprar** y usar la capacidad en el otro producto |\n\n$ Regla: conviene comprar si el precio de compra es menor al costo relevante de fabricar\n$ MÁS el costo de oportunidad de la capacidad liberada\n\n**Paso 4 — Los factores no cuantitativos, que en esta decisión pesan mucho**\n\n| Factor | Riesgo de comprar |\n|---|---|\n| **Dependencia de un solo proveedor** | Si sube el precio o incumple, la empresa ya desmanteló su capacidad y no puede volver atrás con facilidad |\n| **Control de calidad** | Pasa a depender de un tercero. ¿Hay especificaciones y penalidades contractuales? |\n| **Continuidad de suministro** | Plazos de entrega, stock de seguridad necesario, riesgo logístico |\n| **Protección de know-how** | Si el componente es diferenciador, entregar su fabricación puede crear un futuro competidor |\n| **Efecto en el personal** | Dejar de fabricar implica decisiones de personal, con el costo de los ceses del Módulo 7 |\n| **Estabilidad del precio ofrecido** | Un precio promocional de entrada puede subir una vez que la empresa perdió su capacidad |\n\n**La recomendación para la gerencia:**\n\nCon los datos disponibles, **fabricar conviene** por S/ 20,000 anuales, y el análisis naive que recomendaba comprar estaba equivocado por incluir S/ 100,000 anuales de costos fijos que no desaparecen.\n\nAntes de decidir en firme hay que resolver tres preguntas:\n1. ¿Existe un **uso alternativo** de la capacidad liberada, y cuánto margen generaría? Si supera los S/ 20,000, la decisión cambia.\n2. ¿El precio de S/ 46 está **garantizado** por contrato y por cuánto tiempo?\n3. ¿La diferencia de S/ 20,000 anuales **compensa el riesgo** de depender de un proveedor único?\n\nUn ahorro de S/ 20,000 sobre un costo de S/ 900,000 es un margen del 2.2%: suficiente para no comprar, pero demasiado estrecho para justificar desmantelar capacidad propia si el proveedor pudiera subir su precio.'},
   {l:3,t:'ab',p:'Una empresa tiene una restricción de 2,400 horas-máquina mensuales y tres productos. X: precio S/ 60, costo variable S/ 40, 2 horas-máquina, demanda máxima 600 u. Y: precio S/ 120, costo variable S/ 84, 4 horas-máquina, demanda máxima 300 u. Z: precio S/ 45, costo variable S/ 30, 1 hora-máquina, demanda máxima 800 u. Los costos fijos son S/ 24,000. Determina la mezcla óptima de producción y el resultado.',
    s:'**Paso 1 — Calcular el margen de contribución unitario y por hora-máquina**\n\n| Producto | Precio | Costo variable | **MCu** | Horas-máq. por u | **MC por hora-máquina** | Prioridad |\n|---|---|---|---|---|---|---|\n| X | 60 | 40 | **20** | 2 | 20 ÷ 2 = **10.00** | **2** |\n| Y | 120 | 84 | **36** | 4 | 36 ÷ 4 = **9.00** | **3** |\n| Z | 45 | 30 | **15** | 1 | 15 ÷ 1 = **15.00** | **1** |\n\n**El resultado contraintuitivo, que es el punto del ejercicio:** el producto **Y** tiene el **mayor** margen de contribución unitario (S/ 36) y queda en **último** lugar. El producto **Z**, con el margen unitario **más bajo** (S/ 15), es el **primero**. La razón es que Z genera S/ 15 por cada hora del recurso escaso, mientras Y solo genera S/ 9.\n\n$ Con un recurso restringido, lo que se maximiza NO es el margen por unidad de producto,\n$ sino el margen por unidad del RECURSO ESCASO\n\n**Paso 2 — Asignar las 2,400 horas-máquina por orden de prioridad, respetando la demanda máxima**\n\n| Orden | Producto | Unidades | Horas consumidas | Horas acumuladas | Horas restantes |\n|---|---|---|---|---|---|\n| 1 | **Z** | 800 (toda su demanda) | 800 × 1 = 800 | 800 | 1,600 |\n| 2 | **X** | 600 (toda su demanda) | 600 × 2 = 1,200 | 2,000 | **400** |\n| 3 | **Y** | 400 ÷ 4 = **100** (limitado por las horas) | 100 × 4 = 400 | 2,400 | **0** |\n\n**La mezcla óptima:** Z = 800 unidades, X = 600 unidades, Y = **100** unidades (de las 300 que el mercado demanda).\n\n**Paso 3 — El resultado de la mezcla óptima**\n\n| Producto | Unidades | MCu | Margen de contribución |\n|---|---|---|---|\n| Z | 800 | 15 | 12,000 |\n| X | 600 | 20 | 12,000 |\n| Y | 100 | 36 | 3,600 |\n| **Margen de contribución total** | | | **27,600** |\n| Costos fijos | | | (24,000) |\n| **Utilidad operativa** | | | **3,600** |\n\n**Paso 4 — La comparación que demuestra el valor del criterio**\n\nSupongamos que la empresa hubiera priorizado por **margen unitario**, que es el error habitual: primero Y (el de S/ 36), luego X, luego Z.\n\n| Orden | Producto | Unidades | Horas | Acumulado |\n|---|---|---|---|---|\n| 1 | Y | 300 (toda su demanda) | 1,200 | 1,200 |\n| 2 | X | 600 (toda su demanda) | 1,200 | 2,400 |\n| 3 | Z | **0** (no quedan horas) | 0 | 2,400 |\n\n| Producto | Unidades | MCu | Margen de contribución |\n|---|---|---|---|\n| Y | 300 | 36 | 10,800 |\n| X | 600 | 20 | 12,000 |\n| Z | 0 | 15 | 0 |\n| **Margen de contribución total** | | | **22,800** |\n| Costos fijos | | | (24,000) |\n| **Utilidad operativa** | | | **(1,200)** |\n\n**LA COMPARACIÓN**\n\n| Criterio de priorización | Margen de contribución | Utilidad operativa |\n|---|---|---|\n| **Por MC por hora-máquina (correcto)** | **27,600** | **+3,600** |\n| Por MC unitario (incorrecto) | 22,800 | **−1,200** |\n| **Diferencia** | **4,800** | **4,800** |\n\nCon **exactamente los mismos recursos, los mismos precios y los mismos costos**, el criterio correcto produce utilidad y el incorrecto produce pérdida. La diferencia de S/ 4,800 mensuales son S/ 57,600 al año, y no requirió invertir un sol: solo decidir qué producir primero.\n\n**Paso 5 — Las acciones que se desprenden del análisis**\n\n| Nº | Acción | Fundamento |\n|---|---|---|\n| 1 | **Ampliar la capacidad de la máquina** | Cada hora adicional vale S/ 9 (el MC por hora del producto marginal, Y). Si una hora extra de máquina cuesta menos de S/ 9, conviene: tercerizar, un turno adicional, un mantenimiento que recupere horas perdidas |\n| 2 | **Revisar el precio de Y** | Y se vende menos de lo que el mercado demanda porque consume demasiado recurso escaso. Si su precio subiera a S/ 132, su MC por hora pasaría a S/ 12 y cambiaría de prioridad |\n| 3 | **Reducir el consumo de recurso de Y** | Un cambio de método que baje Y de 4 a 3 horas elevaría su MC por hora a S/ 12. La ingeniería de proceso vale más aquí que la negociación de precios |\n| 4 | **Identificar la verdadera restricción** | Si la máquina deja de ser el cuello de botella, aparecerá otro: personal, espacio, materia prima. El análisis debe repetirse con la nueva restricción |\n\n**El valor de una hora adicional del recurso escaso, que es el dato más útil para la gerencia:**\n\n$ Cada hora-máquina adicional permitiría producir 1/4 de unidad de Y\n$ Valor = 36 ÷ 4 = S/ 9.00 por hora\n\nEse número es el **precio sombra** de la restricción: la empresa debería estar dispuesta a pagar hasta S/ 9 por una hora-máquina adicional —en tercerización, en horas extras de operador, en mantenimiento preventivo que evite paradas— y no más. Es el tipo de dato que convierte un análisis de costos en una decisión de inversión.\n\n**La advertencia final:** este análisis supone **una sola restricción**. Si hubiera dos o más simultáneas —horas-máquina y además materia prima limitada, o una restricción de mano de obra especializada—, el criterio del margen por unidad de recurso ya no garantiza el óptimo y el problema se resuelve con **programación lineal**. Reconocer cuándo el problema excede la regla simple es parte del criterio profesional.'}
  ],
  proy:{
   t:'Punto de equilibrio y decisiones de tu empresa',
   ctx:`Vas a convertir la estructura de costos de tu empresa en las herramientas de decisión que la gerencia usa todos los días, y a resolver con ellas cinco decisiones reales.`,
   pasos:[
    'Reconstruye el estado de resultados de tu empresa en formato de contribución: ventas, costos y gastos variables, margen de contribución, costos y gastos fijos, utilidad operativa.',
    'Calcula el margen de contribución unitario y la razón de contribución de cada producto o línea de tu empresa.',
    'Calcula el punto de equilibrio de tu empresa en unidades y en soles. Si tiene varios productos, usa el margen de contribución ponderado según su mezcla real de ventas.',
    'Calcula el margen de seguridad y el grado de apalancamiento operativo, e interpreta qué nivel de riesgo operativo tiene tu empresa.',
    'Calcula las unidades necesarias para alcanzar una utilidad meta después de impuestos que tú definas, con la tasa del Impuesto a la Renta de tu régimen del Módulo 3.',
    'Resuelve una decisión de pedido especial: define un pedido concreto con precio menor al regular y determina si conviene, verificando capacidad y riesgo de erosión del precio.',
    'Resuelve una decisión de fabricar o comprar de un insumo o proceso de tu empresa, separando los costos fijos evitables de los inevitables e incluyendo el costo de oportunidad.',
    'Resuelve una decisión de eliminar o mantener la línea menos rentable de tu empresa, con el margen de contribución y los costos fijos evitables.',
    'Identifica el recurso escaso real de tu empresa y determina la mezcla óptima de producción priorizando por margen de contribución por unidad de ese recurso. Calcula el precio sombra de la restricción.',
    'Simula el efecto de la mezcla: recalcula el punto de equilibrio si la mezcla de ventas se desplazara un 20% hacia el producto de menor margen.'
   ],
   entrega:[
    'El estado de resultados en formato de contribución y los márgenes por línea.',
    'El punto de equilibrio con mezcla, el margen de seguridad y el GAO con su interpretación.',
    'Las cuatro decisiones resueltas con el análisis de costos relevantes.',
    'La mezcla óptima con el precio sombra del recurso escaso y la simulación de cambio de mezcla.'
   ],
   crit:[
    'Las decisiones usan solo costos relevantes y consideran el costo de oportunidad donde corresponde.',
    'La decisión de eliminar la línea distingue expresamente los costos fijos evitables de los inevitables.',
    'La priorización con recurso escaso se hace por margen por unidad del recurso, no por margen unitario.'
   ],
   pista:'Para identificar el recurso escaso real de tu empresa, pregúntate qué te impide vender más mañana si apareciera la demanda. Si la respuesta es "nada, podría producir más", la restricción es el mercado y el análisis cambia: ahí la palanca es comercial, no productiva.'
  },
  proyInt:{
   t:'Tablero de decisiones de tu empresa',
   integra:'1.1 a 8.6',
   ctx:`Vas a construir el documento que una gerencia usa para decidir: un tablero que reúne la información de costos, tributaria y laboral en los indicadores que importan.`,
   pasos:[
    'Construye el estado de resultados de contribución de tu empresa usando los datos reales de todos los módulos: ventas del Módulo 2, tributos del 3, costo laboral del 6 y costos de producción del 8.',
    'Verifica que el resultado del formato de contribución reconcilie con el resultado del costeo absorbente de tus estados financieros oficiales, calculando la diferencia como CIF fijo unitario por las unidades producidas menos las vendidas.',
    'Construye el tablero de la empresa con diez indicadores: margen de contribución total, razón de contribución, punto de equilibrio en soles, margen de seguridad, GAO, costo laboral sobre ventas, costo de materia prima sobre ventas, rotación de inventarios, margen por línea y utilización del recurso escaso.',
    'Calcula cada indicador con los datos reales de tu empresa y establece el valor objetivo de cada uno.',
    'Elabora el análisis de sensibilidad: qué pasa con la utilidad si las ventas caen 10%, si el costo de la materia prima sube 15% o si el costo laboral sube por un aumento de la RMV.',
    'Verifica el efecto tributario de cada escenario: cómo cambia el Impuesto a la Renta, y si la empresa podría pasar de un régimen a otro por el cambio de nivel de ingresos.',
    'Identifica las tres decisiones pendientes más importantes de tu empresa y resuelve cada una con el análisis de costos relevantes.',
    'Elabora el informe ejecutivo de dos páginas a la gerencia: la estructura de costos, los diez indicadores con su valor y su objetivo, los tres escenarios de sensibilidad y las tres decisiones recomendadas con su efecto cuantificado.'
   ],
   entrega:[
    'El estado de resultados de contribución con su reconciliación al costeo absorbente.',
    'El tablero de diez indicadores con sus valores y objetivos.',
    'El análisis de sensibilidad de tres escenarios con su efecto tributario.',
    'El informe ejecutivo de dos páginas con las tres decisiones recomendadas.'
   ],
   crit:[
    'La reconciliación entre el formato de contribución y el absorbente cierra exactamente con la fórmula de la diferencia.',
    'Cada indicador del tablero tiene un valor objetivo, no solo un valor actual.',
    'Las decisiones recomendadas tienen su efecto cuantificado en soles, no solo su fundamento.'
   ],
   pista:'La reconciliación entre los dos costeos es la verificación que demuestra que entendiste el concepto. La diferencia debe ser exactamente el CIF fijo unitario multiplicado por el cambio en el inventario en unidades. Si no cuadra, hay un error en la clasificación de algún costo como fijo o variable.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'análisis costo-volumen-utilidad, costeo variable frente a absorbente, decisiones de corto plazo y uso de recursos escasos'},
   {a:'David Noel Ramírez Padilla', o:'Contabilidad administrativa', n:'punto de equilibrio con varios productos, margen de seguridad, apalancamiento operativo y modelo de toma de decisiones'},
   {a:'Don R. Hansen y Maryanne M. Mowen', o:'Cost Management: Accounting and Control', n:'costos relevantes, decisiones de fabricar o comprar y de eliminar líneas de producto'},
   {a:'Eliyahu M. Goldratt', o:'La meta', n:'teoría de restricciones: priorización por el recurso cuello de botella y concepto de precio sombra'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'aplicación del análisis costo-volumen-utilidad a empresas peruanas'},
   {a:'NIC 2', o:'Inventarios', n:'obligatoriedad del costeo absorbente para la medición de inventarios'}
  ]
 },
 {
  id:'m8t7', titulo:'Presupuesto maestro, flujo de caja proyectado y control presupuestal', min:28,
  cont:`El presupuesto es la contabilidad mirando hacia adelante. Y en una empresa peruana tiene una particularidad que ningún libro extranjero recoge: el calendario de obligaciones tributarias y laborales concentra salidas de caja en meses determinados, y una empresa que no lo anticipa llega a julio sin con qué pagar las gratificaciones.

# El presupuesto maestro: la secuencia
$ PRESUPUESTO DE VENTAS
$   ↓
$ PRESUPUESTO DE PRODUCCIÓN (o de compras, si es comercial)
$   ↓
$ Presupuesto de MATERIAS PRIMAS y COMPRAS
$ Presupuesto de MANO DE OBRA DIRECTA
$ Presupuesto de CIF
$   ↓
$ Presupuesto de COSTO DE VENTAS
$ Presupuesto de GASTOS OPERATIVOS
$   ↓
$ PRESUPUESTO DE EFECTIVO
$   ↓
$ ESTADOS FINANCIEROS PROYECTADOS

! Toda la cadena depende del **presupuesto de ventas**. Si las ventas están mal proyectadas, todo lo demás está mal, por perfecta que sea la aritmética. Por eso el presupuesto de ventas es el que más tiempo merece y el que menos se trabaja: la mayoría de las empresas lo hace sumando un porcentaje al año anterior.

# El presupuesto de ventas
|Método|Cómo funciona|Cuándo conviene|
|**Tendencia histórica**|Proyecta la serie de ventas con su tendencia y su estacionalidad|Negocios maduros y estables|
|**Fuerza de ventas**|Cada vendedor proyecta su cartera y se consolida|Cuando hay relación directa con clientes identificables|
|**Análisis de mercado**|Parte del tamaño del mercado y la participación objetivo|Productos nuevos o mercados en cambio|
|**Cartera de pedidos**|Parte de los contratos y pedidos en firme|Producción contra pedido|

$ Lo indispensable: el presupuesto de ventas debe tener ESTACIONALIDAD mensual,
$ no un doceavo del total anual. Casi ningún negocio vende lo mismo cada mes

# El presupuesto de producción
$ PRODUCCIÓN = Ventas presupuestadas + Inventario final deseado − Inventario inicial

**Ejemplo.** Ventas de enero 1,000 unidades, febrero 1,200, marzo 1,500. Política de inventario final: 20% de las ventas del mes siguiente. Inventario inicial de enero: 200 unidades.

|Concepto|Enero|Febrero|
|Ventas presupuestadas|1,000|1,200|
|(+) Inventario final deseado (20% del mes siguiente)|240|300|
|(−) Inventario inicial|(200)|(240)|
|**= Producción requerida**|**1,040**|**1,260**|

> La política de inventario final es una decisión de gestión con consecuencias de caja: un 20% da respaldo ante variaciones de demanda, pero inmoviliza capital de trabajo. Bajarla a 10% libera caja y aumenta el riesgo de quiebre de stock. Es una de las palancas más directas que tiene una empresa para mejorar su flujo.

# El presupuesto de compras de materias primas
$ CONSUMO = Producción × Cantidad estándar por unidad
$ COMPRAS = Consumo + Inventario final deseado de MP − Inventario inicial de MP

**Ejemplo.** Estándar de 3 kg por unidad a S/ 8 por kg. Política de inventario final de MP: 25% del consumo del mes siguiente. Inventario inicial de enero: 800 kg.

|Concepto|Enero|
|Consumo (1,040 u × 3 kg)|3,120 kg|
|(+) Inventario final deseado (25% del consumo de febrero: 1,260 × 3 × 25%)|945 kg|
|(−) Inventario inicial|(800) kg|
|**= Compras en kilos**|**3,265 kg**|
|**Compras en soles** (3,265 × 8)|**26,120**|

# El presupuesto de mano de obra directa y de CIF
$ MOD = Producción × Horas estándar por unidad × Tarifa por hora
$ La tarifa debe ser el COSTO LABORAL COMPLETO, con el factor de 1.37 a 1.50
$ visto en el Módulo 6: aportes, gratificaciones, CTS y vacaciones

$ CIF = CIF fijos presupuestados + (Tasa variable × Base presupuestada)

! Presupuestar la mano de obra con el sueldo básico es el error que hace que todos los presupuestos de empresas pequeñas resulten optimistas. Si la tarifa real es 1.37 veces la presupuestada, el presupuesto de MOD está subestimado en un 27% desde el primer día.

# El presupuesto de efectivo: donde el presupuesto se vuelve útil
Es distinto del estado de resultados proyectado, y la diferencia es crítica: el estado de resultados registra el **devengo**, el presupuesto de efectivo registra los **cobros y pagos reales**.

$ Saldo inicial de efectivo
$ (+) COBROS del periodo
$ (−) PAGOS del periodo
$ = Saldo antes de financiamiento
$ (±) Financiamiento (préstamos, amortizaciones, aportes)
$ = SALDO FINAL DE EFECTIVO

**Los cobros, según la política de crédito.** Con 40% al contado y 60% a 30 días, y precios con IGV incluido:

|Mes|Ventas con IGV|Cobro del mes (40%)|Cobro del mes anterior (60%)|**Total cobrado**|
|Diciembre|53,100||||
|Enero|59,000|23,600|31,860|**55,460**|
|Febrero|70,800|28,320|35,400|**63,720**|
|Marzo|88,500|35,400|42,480|**77,880**|

! El cobro incluye el **IGV**, porque el cliente paga el precio con impuesto. Ese IGV no es ingreso de la empresa: es dinero que se entregará al fisco al mes siguiente. Un presupuesto de efectivo que proyecta cobros sin IGV subestima la entrada, y uno que no proyecta el pago del IGV sobreestima el saldo. Los dos errores juntos pueden parecer compensarse y no lo hacen, porque los plazos difieren.

# El calendario de caja peruano: los meses críticos
Esta es la parte que ningún texto extranjero contiene y que decide la supervivencia de muchas empresas.

|Mes|Salidas adicionales de caja|
|**Marzo o abril**|**Regularización del Impuesto a la Renta anual** del ejercicio anterior|
|**Primeros 15 días de mayo**|**Depósito de CTS** del periodo noviembre-abril|
|**Dentro de 30 días del vencimiento de la DJ anual**|**Pago de utilidades** a los trabajadores, si corresponde|
|**Primeros 15 días de julio**|**Gratificación de Fiestas Patrias** con su bonificación del 9%|
|**Primeros 15 días de noviembre**|**Depósito de CTS** del periodo mayo-octubre|
|**Primeros 15 días de diciembre**|**Gratificación de Navidad** con su bonificación del 9%|
|**Todos los meses**|IGV, pagos a cuenta de renta, EsSalud, ONP o AFP, retenciones de quinta|

$ Cuatro picos de caja al año, perfectamente predecibles:
$ mayo (CTS), julio (gratificación), noviembre (CTS), diciembre (gratificación)
$ más la regularización anual del Impuesto a la Renta

> Son fechas **conocidas con un año de anticipación**. Una empresa que las proyecta reserva el dinero; una que no, descubre el 10 de julio que necesita una remuneración completa por trabajador y recurre a un préstamo de urgencia, al factoring caro o —lo peor— a usar el IGV y las retenciones de sus trabajadores como capital de trabajo, con las consecuencias que viste en el Módulo 5.

**El cuadro que todo contador debería entregarle a su gerencia en enero:**
|Mes|Obligación extraordinaria|Importe estimado|¿Reservado?|
|Abril|Regularización IR||
|Mayo|CTS primer semestre||
|Julio|Gratificación y bonificación||
|Noviembre|CTS segundo semestre||
|Diciembre|Gratificación y bonificación||

# Presupuesto estático y presupuesto flexible
$ PRESUPUESTO ESTÁTICO: se formula para UN nivel de actividad y no se modifica
$ PRESUPUESTO FLEXIBLE: se recalcula al nivel de actividad REALMENTE alcanzado

! Comparar los resultados reales contra un presupuesto **estático** mezcla dos efectos distintos: el de haber vendido más o menos de lo previsto, y el de haber gastado mejor o peor. El presupuesto **flexible** los separa, y eso es lo que permite evaluar el desempeño con justicia.

**Las dos variaciones del control presupuestal:**
$ VARIACIÓN DEL VOLUMEN DE VENTAS = Presupuesto flexible − Presupuesto estático
$ (mide el efecto de haber vendido un volumen distinto al previsto)
$ VARIACIÓN DEL PRESUPUESTO FLEXIBLE = Resultado real − Presupuesto flexible
$ (mide la eficiencia en precios y consumos, al nivel real de actividad)

**Un ejemplo.** Presupuesto para 1,000 unidades; se vendieron 1,200:

|Concepto|Presupuesto estático (1,000 u)|Presupuesto flexible (1,200 u)|Real (1,200 u)|
|Ventas (50 por u)|50,000|60,000|61,200|
|Costos variables (30 por u)|(30,000)|(36,000)|(37,800)|
|Margen de contribución|20,000|24,000|23,400|
|Costos fijos|(15,000)|(15,000)|(15,600)|
|**Utilidad operativa**|**5,000**|**9,000**|**7,800**|

|Análisis|Cálculo|Resultado|
|**Variación del volumen de ventas**|9,000 − 5,000|**4,000 F**|
|**Variación del presupuesto flexible**|7,800 − 9,000|**1,200 D**|
|**Variación total frente al estático**|7,800 − 5,000|**2,800 F**|

> La lectura correcta: la empresa superó su presupuesto estático en S/ 2,800, lo que parece un buen resultado. Pero la descomposición muestra que **vendió más de lo previsto** (lo que aportó S/ 4,000) y, al mismo tiempo, **gastó peor de lo que debía al nivel que alcanzó** (lo que costó S/ 1,200). El área comercial lo hizo bien; la operación tuvo un problema de eficiencia que el número global escondía. Sin el presupuesto flexible, esa conclusión es invisible.

# Los estados financieros proyectados
Con todos los presupuestos se construyen:
|Estado proyectado|Se arma con|
|**Estado de resultados**|Presupuestos de ventas, costo de ventas y gastos operativos|
|**Estado de situación financiera**|Saldos iniciales más los movimientos presupuestados de cada partida|
|**Estado de flujos de efectivo**|El presupuesto de efectivo, reclasificado por actividades|

$ Verificación obligatoria: el estado de situación financiera proyectado DEBE CUADRAR.
$ Si no cuadra, hay una inconsistencia entre presupuestos, y encontrarla
$ es más valioso que el presupuesto mismo

# El ciclo de control presupuestal
1. **Formular** el presupuesto con participación de las áreas, no desde el escritorio del contador.
2. **Aprobar** formalmente, con la gerencia comprometida con las cifras.
3. **Ejecutar** y registrar los resultados reales con la misma estructura del presupuesto.
4. **Comparar** con el presupuesto **flexible**, no con el estático.
5. **Analizar** las variaciones y sus causas, distinguiendo volumen de eficiencia.
6. **Corregir** y **reproyectar**: un presupuesto que no se actualiza a mitad de año deja de servir como herramienta de gestión.

$ Un presupuesto que nadie revisa después de aprobarlo no es un presupuesto:
$ es un documento. El valor está en el ciclo, no en la formulación`,
  claves:['Toda la cadena del presupuesto maestro depende del presupuesto de ventas, que debe tener estacionalidad mensual y no un doceavo del total anual.','Producción es ventas más inventario final deseado menos inventario inicial; la misma lógica aplica a las compras de materia prima.','La mano de obra se presupuesta con el costo laboral completo, con el factor de 1.37 a 1.50, no con el sueldo básico.','El presupuesto de efectivo proyecta cobros y pagos reales con IGV incluido, y debe anticipar los cuatro picos de caja: mayo, julio, noviembre y diciembre, más la regularización anual del Impuesto a la Renta.','El control se hace contra el presupuesto flexible, que separa el efecto del volumen de ventas del efecto de la eficiencia.'],
  preg:[
   {p:'¿Por qué el presupuesto de ventas es el que más tiempo merece?',
    r:'Porque toda la cadena del presupuesto maestro se construye a partir de él: la producción depende de las ventas, las compras de la producción, la mano de obra y los CIF de la producción, el costo de ventas de todo lo anterior, y el flujo de caja de los cobros de esas ventas y de los pagos que generan. Un error en las ventas se propaga a todos los presupuestos siguientes, por perfecta que sea la aritmética de cada uno. Y la paradoja es que suele ser el presupuesto al que menos tiempo se dedica: la práctica habitual es sumar un porcentaje al año anterior, que es exactamente lo que no debe hacerse. Un presupuesto de ventas serio parte de la cartera de clientes, de la estacionalidad histórica real mes a mes, del tamaño del mercado y de los contratos en firme.'},
   {p:'¿Por qué el presupuesto de efectivo es distinto del estado de resultados proyectado?',
    r:'Porque miden cosas distintas en momentos distintos. El estado de resultados registra el **devengo**: una venta a crédito de enero es ingreso de enero, aunque se cobre en marzo. El presupuesto de efectivo registra el **movimiento real de dinero**: esa venta aparece en marzo, cuando se cobra. Además, el flujo de caja incluye partidas que no son resultado —la compra de un activo fijo, la amortización de un préstamo, el pago del IGV— y excluye partidas de resultado que no mueven caja, como la depreciación. La consecuencia práctica es que una empresa puede ser **rentable y quedarse sin efectivo**, lo que es la causa de cierre más frecuente de las empresas pequeñas. El estado de resultados dice si el negocio gana; el flujo de caja dice si sobrevive.'},
   {p:'¿Por qué hay que proyectar los cobros con IGV incluido?',
    r:'Porque es lo que el cliente efectivamente paga. Cuando una empresa factura S/ 50,000 más IGV, cobra S/ 59,000, y ese es el dinero que entra a su cuenta. Proyectar cobros de S/ 50,000 subestima la entrada en S/ 9,000. Pero el error se vuelve grave si además se omite la contrapartida: ese IGV no es de la empresa, es dinero que deberá entregarse al fisco al mes siguiente, de modo que el presupuesto de efectivo debe incluir también el **pago del IGV** en su mes de vencimiento. Los dos errores juntos parecen compensarse y no lo hacen, porque los **plazos difieren**: el IGV se cobra al contado o en 30 días, según la política de crédito, y se paga en el cronograma del mes siguiente. Ese desfase es precisamente lo que un flujo de caja debe mostrar.'},
   {p:'¿Cuáles son los cuatro picos de caja de una empresa peruana y por qué importan tanto?',
    r:'**Mayo** y **noviembre** por el depósito de la CTS, y **julio** y **diciembre** por las gratificaciones con su bonificación extraordinaria del 9%. A ellos se suma la **regularización del Impuesto a la Renta anual** en marzo o abril y, en empresas con más de 20 trabajadores, el pago de **utilidades** dentro de los 30 días del vencimiento de la declaración anual. Importan porque son salidas de caja grandes, concentradas y **perfectamente predecibles con un año de anticipación**: una empresa con doce trabajadores necesita en julio casi una planilla adicional completa. Quien las proyecta reserva el dinero mes a mes con las provisiones del Módulo 6; quien no, descubre el 10 de julio que no tiene con qué pagar y recurre a un préstamo de urgencia o, en el peor caso, usa el IGV y las retenciones de sus trabajadores como capital de trabajo, lo que convierte un problema de caja en una contingencia tributaria grave.'},
   {p:'¿Por qué el control presupuestal debe hacerse contra el presupuesto flexible y no contra el estático?',
    r:'Porque comparar contra el estático mezcla dos efectos que tienen causas y responsables distintos. Si una empresa presupuestó 1,000 unidades y vendió 1,200, sus costos variables reales serán necesariamente mayores que los presupuestados, y eso no es ineficiencia: es consecuencia de haber vendido más. El presupuesto **flexible** recalcula el presupuesto al nivel de actividad realmente alcanzado, y permite separar la **variación del volumen de ventas** —el efecto de vender más o menos— de la **variación del presupuesto flexible** —el efecto de haber gastado mejor o peor al nivel que se alcanzó. Sin esa separación, una empresa puede superar su presupuesto estático gracias a mayores ventas mientras esconde un problema real de eficiencia operativa, que es exactamente lo que suele ocurrir.'}
  ],
  ej:[
   {l:1,t:'num',p:'Ventas presupuestadas de enero 1,000 unidades y de febrero 1,200. La política es mantener como inventario final el 20% de las ventas del mes siguiente. El inventario inicial de enero es 200 unidades. Calcula la producción requerida de enero.',
    u:'unidades',r:1040,tol:0,
    s:'$ Producción = Ventas + Inventario final deseado − Inventario inicial\n\n| Concepto | Cálculo | Unidades |\n|---|---|---|\n| Ventas presupuestadas de enero | | 1,000 |\n| (+) Inventario final deseado | 20% × 1,200 (ventas de febrero) | 240 |\n| (−) Inventario inicial | | (200) |\n| **= Producción requerida** | | **1,040** |\n\nLa lógica es la misma del estado de costo de producción, leída al revés: lo que hay que **producir** es lo que se va a vender, más lo que se quiere **dejar** al final, menos lo que ya se **tiene** al inicio.\n\nY una observación de gestión: la política del 20% es una decisión con efecto directo en la caja. Bajarla al 10% reduciría la producción de enero a 920 unidades, liberando capital de trabajo, a cambio de un mayor riesgo de quiebre de stock. Es una de las palancas más rápidas para mejorar el flujo de efectivo.'},
   {l:1,t:'num',p:'La producción de enero es 1,040 unidades y la de febrero 1,260. El estándar es 3 kg de materia prima por unidad. La política es mantener como inventario final el 25% del consumo del mes siguiente y el inventario inicial de enero es 800 kg. Calcula las compras de enero en kilos.',
    u:'kg',r:3265,tol:0,
    s:'**Paso 1 — Consumo de cada mes**\n$ Consumo de enero = 1,040 × 3 = 3,120 kg\n$ Consumo de febrero = 1,260 × 3 = 3,780 kg\n\n**Paso 2 — Compras de enero**\n\n| Concepto | Cálculo | Kilos |\n|---|---|---|\n| Consumo de enero | 1,040 × 3 | 3,120 |\n| (+) Inventario final deseado | 25% × 3,780 | 945 |\n| (−) Inventario inicial | | (800) |\n| **= Compras de enero** | | **3,265 kg** |\n\nY en soles, con un precio estándar de S/ 8 por kg:\n$ Compras en soles = 3,265 × 8 = **S/ 26,120**\n\nA esto hay que agregar el IGV para el presupuesto de efectivo: el pago al proveedor será de 26,120 × 1.18 = S/ 30,821.60, de los cuales S/ 4,701.60 son IGV que la empresa recuperará como crédito fiscal. Esa distinción entre el importe del costo y el importe del pago es la que separa el presupuesto de compras del presupuesto de efectivo.'},
   {l:2,t:'num',p:'Las ventas con IGV de diciembre fueron S/ 53,100 y las de enero S/ 59,000. La política de cobranza es 40% al contado y 60% a 30 días. Calcula el total cobrado en enero.',
    u:'S/',r:55460,tol:10,
    s:'| Origen del cobro | Cálculo | Importe |\n|---|---|---|\n| Cobro al contado de las ventas de enero | 40% × 59,000 | 23,600 |\n| Cobro a 30 días de las ventas de diciembre | 60% × 53,100 | 31,860 |\n| **Total cobrado en enero** | | **55,460** |\n\n**Las tres precisiones que hacen correcto este cálculo:**\n\n**1. Los importes incluyen IGV**, porque es lo que el cliente efectivamente paga. De los S/ 55,460 cobrados, aproximadamente S/ 8,459 corresponden a IGV que la empresa deberá entregar al fisco.\n\n**2. El cobro de enero mezcla dos meses de ventas.** Es lo que hace que el flujo de caja difiera del estado de resultados: las ventas de enero son S/ 59,000 pero el cobro de enero es S/ 55,460, y la diferencia está en las cuentas por cobrar.\n\n**3. En el presupuesto de efectivo hay que registrar por separado el pago del IGV** del periodo anterior, en su fecha de vencimiento según el cronograma. Proyectar los cobros con IGV y olvidar el pago del IGV sobreestima el saldo final de caja, que es el error más común de los flujos proyectados.\n\n**Y la verificación de consistencia:** al cierre de enero, el saldo de cuentas por cobrar debe ser el 60% de las ventas de enero con IGV, es decir S/ 35,400. Ese importe debe coincidir con el saldo proyectado de la cuenta 12 en el estado de situación financiera presupuestado.'},
   {l:2,t:'ab',p:'Elabora el presupuesto de efectivo de una empresa con 12 trabajadores para el segundo trimestre, sabiendo que la planilla mensual es S/ 31,476, el IGV a pagar promedia S/ 6,000 mensuales, los pagos a cuenta de renta S/ 3,500, el EsSalud y aportes S/ 7,350, los cobros son S/ 70,000 mensuales, los pagos a proveedores S/ 38,000 y los gastos operativos S/ 9,000. El saldo inicial de abril es S/ 15,000. Considera los picos de caja peruanos.',
    s:'**Paso 1 — Identificar las salidas extraordinarias del trimestre**\n\n| Mes | Obligación extraordinaria | Cálculo | Importe |\n|---|---|---|---|\n| **Abril** | **Regularización del Impuesto a la Renta anual** | supongamos un saldo por regularizar | 18,000 |\n| **Mayo** | **Depósito de CTS** del periodo noviembre-abril | 12 trabajadores × ~1,530 | 18,361 |\n| Junio | Ninguna extraordinaria | | 0 |\n\n**Paso 2 — El presupuesto de efectivo**\n\n| Concepto | **Abril** | **Mayo** | **Junio** |\n|---|---|---|---|\n| **Saldo inicial de efectivo** | **15,000** | **1,674** | **(21,511)** |\n| **COBROS** | | | |\n| Cobranza de clientes | 70,000 | 70,000 | 70,000 |\n| **Total cobros** | **70,000** | **70,000** | **70,000** |\n| **PAGOS** | | | |\n| Proveedores | (38,000) | (38,000) | (38,000) |\n| Planilla (neto a trabajadores) | (26,961) | (26,961) | (26,961) |\n| EsSalud, ONP/AFP y retenciones | (7,350) | (7,350) | (7,350) |\n| IGV | (6,000) | (6,000) | (6,000) |\n| Pago a cuenta de renta | (3,500) | (3,500) | (3,500) |\n| Gastos operativos | (9,000) | (9,000) | (9,000) |\n| **Regularización IR anual** | **(18,000)** | — | — |\n| **Depósito de CTS** | — | **(18,361)** | — |\n| **Total pagos** | **(108,811)** | **(109,172)** | **(90,811)** |\n| **Flujo neto del mes** | **(38,811)** | **(39,172)** | **(20,811)** |\n| **Saldo antes de financiamiento** | **(23,811)** | **(37,498)** | **(42,322)** |\n\n**Nota sobre la planilla:** se registra el **neto a trabajadores** (S/ 26,961) y por separado los aportes y retenciones (S/ 7,350), porque se pagan en fechas distintas: el neto en los primeros días del mes y los tributos y aportes en el cronograma y en AFPnet.\n\n**Paso 3 — El diagnóstico, que es lo que importa**\n\n! **La empresa entra en déficit de caja en abril y no se recupera.** Con cobros de S/ 70,000 mensuales y pagos ordinarios de S/ 90,811, el flujo operativo ordinario ya es **negativo en S/ 20,811 cada mes**, antes de cualquier obligación extraordinaria.\n\n$ Flujo operativo ordinario mensual = 70,000 − 90,811 = (20,811)\n\nEste es el hallazgo central y no es un problema de calendario: es un problema **estructural**. Las obligaciones extraordinarias de abril y mayo lo agravan, pero no lo causan.\n\n**Paso 4 — Las causas a investigar, en orden**\n\n| Hipótesis | Cómo verificarla | Palanca |\n|---|---|---|\n| **El margen es insuficiente** | Calcular el margen de contribución del subtema 8.6: si el MC no cubre los fijos, el negocio no es viable al volumen actual | Precio, mezcla de productos, costos |\n| **El ciclo de conversión de efectivo es negativo** | Comparar el plazo de cobro a clientes con el plazo de pago a proveedores | Renegociar plazos en ambos extremos |\n| **El nivel de ventas está por debajo del punto de equilibrio** | Calcular el PE y compararlo con las ventas reales | Volumen |\n| **Hay inventario inmovilizado** | Revisar la rotación: cada día de inventario es caja atrapada | Política de inventario final |\n\n**Paso 5 — Las acciones, separando lo urgente de lo estructural**\n\n**Urgente, para cubrir el trimestre:**\n\n| Acción | Efecto estimado |\n|---|---|\n| **Fraccionar la regularización del IR** ante SUNAT | Convierte S/ 18,000 en cuotas con interés del 80% de la TIM. Libera caja en abril |\n| Negociar **ampliación de plazo** con los principales proveedores | Cada 15 días de plazo adicional sobre S/ 38,000 libera ~19,000 de caja una vez |\n| **Acelerar la cobranza**: descuento por pronto pago, factoring de facturas de clientes sólidos | Depende de la cartera |\n| Evaluar una **línea de capital de trabajo** | Cubre el déficit, pero añade costo financiero a un flujo ya negativo |\n\n! **Lo que NO se debe hacer, y es la tentación exacta de este escenario:** usar el IGV recaudado y las retenciones de los trabajadores como capital de trabajo. Son S/ 13,350 mensuales que están disponibles en la cuenta y no son de la empresa. Hacerlo configura la infracción del numeral 4 del artículo 178 del Código Tributario, con responsabilidad **exclusiva** de la empresa, prescripción de **diez años**, presunción de dolo que alcanza al representante legal, y deuda que **no admite fraccionamiento**. Es la decisión que más empresas pequeñas ha llevado al cierre, y aparece siempre en este punto exacto del flujo de caja.\n\n**Estructural, sin lo cual nada se resuelve:**\n\n| Acción | Fundamento |\n|---|---|\n| Calcular el **punto de equilibrio** y compararlo con las ventas actuales | Si las ventas están por debajo, el problema no es de caja sino de volumen o de margen |\n| Revisar la **estructura de costos fijos**: S/ 9,000 de gastos operativos más la planilla | El apalancamiento operativo puede ser demasiado alto para el nivel de ventas |\n| Instalar la **provisión mensual de beneficios** del Módulo 6 | No reduce el costo, pero convierte los picos de mayo, julio, noviembre y diciembre en reservas mensuales previsibles |\n| Proyectar el **flujo a doce meses**, no a un trimestre | Julio y diciembre traerán las gratificaciones; noviembre, la otra CTS |\n\n**Paso 6 — El cuadro que hay que entregarle a la gerencia en enero de cada año**\n\n| Mes | Obligación extraordinaria | Importe estimado | Reserva mensual necesaria |\n|---|---|---|---|\n| Abril | Regularización IR | 18,000 | 1,500 desde enero del año anterior |\n| Mayo | CTS | 18,361 | 3,060 desde noviembre |\n| Julio | Gratificación y bonificación | 34,374 | 5,729 desde enero |\n| Noviembre | CTS | 18,361 | 3,060 desde mayo |\n| Diciembre | Gratificación y bonificación | 34,374 | 5,729 desde julio |\n| **Total anual extraordinario** | | **123,470** | |\n\n**La conclusión profesional:** S/ 123,470 al año en obligaciones extraordinarias, todas conocidas con doce meses de anticipación. Una empresa que las reserva mes a mes las paga sin sobresaltos; una que no las proyecta las enfrenta como crisis cuatro veces al año. La diferencia no está en el dinero disponible: está en haber hecho este cuadro.'},
   {l:3,t:'ab',p:'Una empresa presupuestó 1,000 unidades a S/ 50, con costo variable de S/ 30 y costos fijos de S/ 15,000. Vendió 1,200 unidades, con ingresos reales de S/ 61,200, costos variables de S/ 37,800 y costos fijos de S/ 15,600. Elabora el análisis de variaciones con presupuesto flexible e interpreta el desempeño de cada área.',
    s:'**Paso 1 — Construir las tres columnas**\n\nEl presupuesto **flexible** se construye aplicando los **precios y costos unitarios presupuestados** al **volumen real**:\n\n| Concepto | **Presupuesto estático** (1,000 u) | **Presupuesto flexible** (1,200 u) | **Real** (1,200 u) |\n|---|---|---|---|\n| Ventas | 1,000 × 50 = 50,000 | 1,200 × 50 = **60,000** | 61,200 |\n| Costos variables | 1,000 × 30 = (30,000) | 1,200 × 30 = **(36,000)** | (37,800) |\n| **Margen de contribución** | **20,000** | **24,000** | **23,400** |\n| Costos fijos | (15,000) | **(15,000)** | (15,600) |\n| **Utilidad operativa** | **5,000** | **9,000** | **7,800** |\n\nNótese que en el presupuesto flexible los **costos fijos no cambian**: eso es lo que los hace fijos dentro del rango relevante.\n\n**Paso 2 — Las dos variaciones**\n\n| Variación | Fórmula | Cálculo | Resultado |\n|---|---|---|---|\n| **Del volumen de ventas** | Flexible − Estático | 9,000 − 5,000 | **4,000 FAVORABLE** |\n| **Del presupuesto flexible** | Real − Flexible | 7,800 − 9,000 | **1,200 DESFAVORABLE** |\n| **Total frente al estático** | Real − Estático | 7,800 − 5,000 | **2,800 FAVORABLE** |\n\n**Paso 3 — Descomponer la variación del presupuesto flexible, línea por línea**\n\n| Línea | Real | Flexible | Variación | Causa |\n|---|---|---|---|---|\n| Ventas | 61,200 | 60,000 | **1,200 F** | **Precio**: se vendió a 51 en lugar de 50 |\n| Costos variables | 37,800 | 36,000 | **1,800 D** | **Costo variable unitario**: 31.50 en lugar de 30 |\n| Costos fijos | 15,600 | 15,000 | **600 D** | **Sobregasto** en costos fijos |\n| **Total** | | | **1,200 D** ✓ |\n\n**Verificación de los precios y costos unitarios reales:**\n$ Precio real = 61,200 ÷ 1,200 = S/ 51.00 (presupuestado: 50.00)\n$ Costo variable unitario real = 37,800 ÷ 1,200 = S/ 31.50 (presupuestado: 30.00)\n\n**Paso 4 — LA INTERPRETACIÓN POR ÁREA, que es el entregable**\n\n**Área comercial: desempeño EXCELENTE**\n\n| Logro | Importe |\n|---|---|\n| Vendió 200 unidades más de las presupuestadas (+20% de volumen) | 4,000 F |\n| Y además logró un precio S/ 1 superior al presupuestado | 1,200 F |\n| **Aporte total del área comercial** | **5,200 F** |\n\nVender **más volumen y a mayor precio** simultáneamente es un resultado notable: lo habitual es conseguir volumen sacrificando precio. Merece reconocimiento explícito.\n\n**Área de operaciones: desempeño DEFICIENTE**\n\n| Problema | Importe |\n|---|---|\n| El costo variable unitario subió de 30 a 31.50 (+5%) | 1,800 D |\n| Los costos fijos excedieron el presupuesto en 4% | 600 D |\n| **Costo total del problema operativo** | **2,400 D** |\n\n**Paso 5 — Por qué el número global engaña, y es la lección del ejercicio**\n\n$ Variación total frente al presupuesto estático = 2,800 FAVORABLE\n\nSi la gerencia solo mira ese número, concluye que el trimestre fue bueno y que no hay nada que corregir. La descomposición revela lo contrario:\n\n| Lo que realmente ocurrió | Importe |\n|---|---|\n| El área comercial aportó | +5,200 |\n| La operación destruyó | −2,400 |\n| **Resultado neto** | **+2,800** |\n\nEl excelente desempeño comercial **financió** un problema operativo de S/ 2,400 que quedó invisible. Y es un problema que escala: si las ventas se mantienen en 1,200 unidades, el sobrecosto variable de S/ 1.50 por unidad cuesta S/ 1,800 cada periodo, S/ 21,600 al año.\n\n**Paso 6 — Las acciones**\n\n| Prioridad | Acción | Fundamento |\n|---|---|---|\n| 1 | **Investigar el aumento del costo variable unitario** de S/ 30 a S/ 31.50 | Es el 75% del problema. Aplicar el análisis de variaciones del subtema 8.5: ¿es precio de la materia prima o cantidad consumida? ¿tarifa de mano de obra o eficiencia? |\n| 2 | **Revisar el sobregasto de costos fijos** por partida | Distinguir un hecho puntual de una tendencia |\n| 3 | **Reconocer y analizar el logro comercial** | Entender cómo se consiguió más volumen a mejor precio, para poder repetirlo |\n| 4 | **Reproyectar el presupuesto** del resto del año con el nuevo nivel de ventas y el nuevo costo unitario | Un presupuesto que no se actualiza deja de servir |\n\n**Paso 7 — La advertencia sobre el rango relevante**\n\nLos costos fijos se mantuvieron en el presupuesto flexible porque 1,200 unidades están **dentro del rango relevante**. Si el volumen hubiera llegado a 2,000 unidades, probablemente habrían requerido un turno adicional, otro supervisor o más espacio, y los "fijos" habrían cambiado. En ese caso el presupuesto flexible debe construirse con la estructura de costos fijos correspondiente al nuevo rango, no con la original. Ignorarlo produce variaciones desfavorables de costos fijos que en realidad son el costo legítimo de haber crecido.\n\n**La conclusión para el informe:** la empresa superó su presupuesto en S/ 2,800, pero ese número esconde un aporte comercial de S/ 5,200 y un deterioro operativo de S/ 2,400. Sin presupuesto flexible, se habría felicitado a toda la organización y el problema operativo habría seguido creciendo sin que nadie lo viera.'}
  ],
  proy:{
   t:'Presupuesto maestro de tu empresa',
   ctx:`Es el entregable que cierra el módulo: el presupuesto completo de tu empresa para un año, con su flujo de caja y su sistema de control. Es también el documento que más valora una gerencia y el que más empresas pequeñas no tienen.`,
   pasos:[
    'Elabora el presupuesto de ventas de tu empresa para doce meses, con estacionalidad mensual real y no un doceavo del total. Documenta el método usado y sus supuestos.',
    'Elabora el presupuesto de producción o de compras, con una política explícita de inventario final y su justificación.',
    'Elabora el presupuesto de materias primas y compras, con la conversión de kilos a soles y la separación del IGV.',
    'Elabora el presupuesto de mano de obra directa usando el costo laboral completo del Módulo 6, con el factor aplicado, y el presupuesto de CIF separado en fijos y variables.',
    'Elabora el presupuesto de gastos operativos de venta y administración.',
    'Elabora el presupuesto de efectivo mensual de doce meses, con la política de cobranza y de pago, el IGV en cobros y pagos, y los cuatro picos de caja peruanos más la regularización anual del Impuesto a la Renta y las utilidades si corresponden.',
    'Identifica los meses de déficit de caja proyectado y propón las medidas concretas para cubrirlos, con su costo.',
    'Elabora los tres estados financieros proyectados y verifica que el estado de situación financiera cuadre.',
    'Elabora el cuadro de obligaciones extraordinarias del año con la reserva mensual necesaria para cada una.',
    'Diseña el sistema de control presupuestal: formato de comparación con presupuesto flexible, frecuencia de revisión, responsables y el procedimiento de reproyección.'
   ],
   entrega:[
    'Los seis presupuestos operativos con sus supuestos documentados.',
    'El presupuesto de efectivo de doce meses con los picos de caja identificados y las medidas para los déficits.',
    'Los tres estados financieros proyectados, con el balance cuadrado.',
    'El cuadro de obligaciones extraordinarias con reservas mensuales y el sistema de control presupuestal.'
   ],
   crit:[
    'El presupuesto de ventas tiene estacionalidad mensual y método documentado, no un doceavo del total anual.',
    'El presupuesto de mano de obra usa el costo laboral completo, con el factor explícito.',
    'El presupuesto de efectivo incluye los cuatro picos de caja y el IGV tanto en cobros como en pagos.'
   ],
   pista:'La verificación de que el estado de situación financiera proyectado cuadre es la prueba de que todos los presupuestos son consistentes entre sí. Si no cuadra, hay una inconsistencia —típicamente en el IGV, en las cuentas por cobrar o en el inventario—, y encontrarla es más valioso que el presupuesto mismo.'
  },
  proyInt:{
   t:'Plan de gestión integral de tu empresa: entrega final del módulo',
   integra:'1.1 a 8.7',
   ctx:`Cierras el módulo de costos reuniendo todo el curso en el documento que un contador entrega cuando se le pide no solo registrar sino dirigir: el plan de gestión de la empresa.`,
   pasos:[
    'Sección 1 — Diagnóstico: la estructura de costos de tu empresa, el punto de equilibrio, el margen de seguridad, el GAO y el margen por línea del subtema 8.6.',
    'Sección 2 — Costos: el sistema de costeo elegido, el costo unitario del producto con su descomposición, el estándar con sus variaciones y el estudio ABC de rentabilidad por producto.',
    'Sección 3 — Inventarios: la política de valuación, el Kardex, la prueba de VNR y el tratamiento de mermas y desmedros del subtema 8.2.',
    'Sección 4 — Presupuesto: el presupuesto maestro completo de doce meses con el flujo de caja y los estados proyectados.',
    'Sección 5 — Obligaciones: el calendario unificado tributario, laboral y de beneficios de los Módulos 3 a 7, con el cuadro de obligaciones extraordinarias y sus reservas.',
    'Sección 6 — Control: el tablero de indicadores, el sistema de control presupuestal con presupuesto flexible y el ciclo de reproyección.',
    'Sección 7 — Riesgos: el registro único de contingencias consolidado de todos los módulos, con los riesgos de costeo agregados: capacidad normal no documentada, mermas sin informe técnico, inventario sin respaldo y estándares desactualizados.',
    'Sección 8 — Decisiones: las decisiones pendientes de tu empresa resueltas con el análisis de costos relevantes, cada una con su efecto cuantificado.',
    'Sección 9 — Informe ejecutivo de tres páginas: la situación de la empresa, los cinco indicadores que la definen, los tres riesgos mayores, las tres decisiones recomendadas y el calendario de los próximos doce meses.',
    'Arma el índice general, numera y fecha las secciones, integra con el expediente tributario y laboral de los Módulos 5 a 7, y establece el control de versiones.'
   ],
   entrega:[
    'El plan de gestión integral con sus nueve secciones y su índice general.',
    'El informe ejecutivo de tres páginas al inicio del documento.',
    'El registro único de contingencias consolidado con los riesgos de costeo.',
    'El documento maestro integrado con el expediente tributario y laboral, con control de versiones.'
   ],
   crit:[
    'Cada sección se apoya en los entregables reales construidos en el curso, no en descripciones.',
    'Las decisiones de la sección 8 usan costos relevantes y tienen efecto cuantificado en soles.',
    'El informe ejecutivo permite a una gerencia entender la situación y decidir sin leer ninguna otra sección.'
   ],
   pista:'Este documento, junto con el expediente tributario y laboral, es lo que distingue a un contador de un asistente contable. El primero registra el pasado; el segundo lo explica y proyecta el futuro con números. Tenlo listo antes de tu primera entrevista: pocas cosas demuestran competencia con más claridad.'
  },
  fuentes:[
   {a:'Charles T. Horngren, Srikant M. Datar y Madhav V. Rajan', o:'Cost Accounting: A Managerial Emphasis', n:'presupuesto maestro, presupuesto flexible, variación del volumen de ventas y control presupuestal'},
   {a:'Glenn A. Welsch, Ronald W. Hilton y Paul N. Gordon', o:'Presupuestos: planificación y control', n:'secuencia del presupuesto maestro, presupuesto de efectivo y ciclo de control presupuestal'},
   {a:'David Noel Ramírez Padilla', o:'Contabilidad administrativa', n:'presupuesto de efectivo, estados financieros proyectados y análisis de variaciones presupuestales'},
   {a:'Pedro Álvarez Illanes', o:'Contabilidad de costos y presupuestos', n:'elaboración del presupuesto en el contexto de la empresa peruana'},
   {a:'Víctor Ferrer Quea', o:'Estados financieros: análisis e interpretación por sectores económicos', n:'proyección de estados financieros y análisis del flujo de efectivo'},
   {a:'Isidro Chambergo Guillermo', o:'Costos para gerenciar organizaciones por sectores de actividad económica', n:'presupuestos aplicados por sector y control de gestión'}
  ]
 }
 ]
}
);
