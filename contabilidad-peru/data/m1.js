/* Contenido del curso — m1
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
 id:'m1', nivel:'Básico', titulo:'Fundamentos de la contabilidad',
 resumen:'El lenguaje con el que una empresa se describe a sí misma: qué registra, con qué reglas y con qué plan de cuentas en el Perú.',
 temas:[
 {
  id:'m1t1', titulo:'¿Qué es la contabilidad y para qué sirve?', min:14,
  cont:`La contabilidad es el sistema que **identifica, mide, registra y comunica** los hechos económicos de una empresa. No es llenar formularios para SUNAT: eso es una consecuencia. Su razón de ser es responder tres preguntas que nadie puede contestar de memoria cuando el negocio crece: **¿qué tengo?, ¿qué debo?, y ¿cuánto gané o perdí en un periodo?**

Piensa en una bodega en Villa El Salvador. El dueño "sabe" cómo va su negocio porque ve la caja. Pero la caja miente: ahí está el dinero de un adelanto de un cliente (que no es suyo), no está la mercadería del almacén (que sí es suya), y no aparece la deuda con el distribuidor que vence en 30 días. La contabilidad ordena todo eso en un sistema donde cada hecho económico deja un rastro verificable.

# Las cuatro etapas del proceso contable
1. **Identificar** el hecho económico: solo entra lo que es medible en dinero y afecta el patrimonio. Que un cliente te felicite no se registra; que te pague S/ 500, sí.
2. **Medir** el hecho: asignarle un importe según una base de medición (costo histórico, valor razonable, valor neto realizable).
3. **Registrar** en libros con partida doble, cuenta por cuenta, con la documentación que lo sustenta.
4. **Comunicar** mediante estados financieros, que son el producto final del trabajo contable.

# ¿Quién usa la información y para qué?
|Usuario|Qué pregunta responde|
|Dueño o socios|¿El negocio es rentable? ¿Puedo retirar utilidades?|
|Gerencia|¿Qué línea de producto deja margen? ¿Alcanza la caja del próximo mes?|
|Bancos y financieras|¿Tiene capacidad de pago? (miran ratios de liquidez y endeudamiento)|
|SUNAT|¿Declaró y pagó bien sus tributos? (contrasta libros contra declaraciones)|
|Trabajadores|¿Hay utilidades que repartir? ¿La empresa es estable?|
|Proveedores|¿Le vendo al crédito y a qué plazo?|

> La misma información sirve a todos, pero **la contabilidad financiera y la tributaria no son idénticas**. La primera sigue las NIIF y busca mostrar la realidad económica; la segunda sigue la Ley del Impuesto a la Renta y busca determinar el tributo. Cuando difieren, no se eligen: se registra según NIIF y las diferencias se controlan aparte, en la declaración anual. Ese puente es el tema del Módulo 7.

# Las ramas que vas a encontrar en el trabajo
- **Contabilidad financiera**: produce los estados financieros para usuarios externos. Reglas: NIIF o NIIF para PYMES.
- **Contabilidad de costos**: calcula cuánto cuesta producir cada unidad. Imprescindible en industria y construcción.
- **Contabilidad de gestión**: presupuestos, análisis de desviaciones, información para decidir.
- **Contabilidad tributaria**: determina la base imponible de IGV, Renta y demás tributos.
- **Auditoría**: verifica que lo informado sea razonable; no produce información, la examina.

# El marco normativo peruano, en orden de jerarquía
|Nivel|Norma|Qué regula|
|Legal|Ley General de Sociedades (Ley 26887)|Obligación de llevar contabilidad y formular estados financieros|
|Legal|Código Tributario y Ley del Impuesto a la Renta|Libros obligatorios, plazos, determinación de tributos|
|Técnico|NIIF / NIIF para las PYMES, oficializadas por el CNC|Cómo reconocer, medir y presentar cada partida|
|Operativo|PCGE 2019 (R. CNC 002-2019-EF/30)|Qué código de cuenta usar para cada concepto|

El **Consejo Normativo de Contabilidad (CNC)** es el que oficializa las NIIF en el Perú. Una NIIF emitida en Londres no se aplica aquí hasta que el CNC la oficializa mediante resolución.

! No confundas "llevar contabilidad" con "ser contador". El dueño de una MYPE puede registrar sus operaciones, pero los estados financieros y las declaraciones determinativas deben llevar la firma de un **contador público colegiado** cuando la norma lo exige. Es responsabilidad profesional, no un trámite.`,
  claves:['La contabilidad responde qué tengo, qué debo y cuánto gané; la caja sola no lo dice.','Proceso: identificar, medir, registrar, comunicar.','En el Perú la jerarquía va de la ley a las NIIF oficializadas por el CNC y baja al PCGE 2019 como plan de cuentas.','Contabilidad financiera (NIIF) y tributaria (LIR) conviven: se registra por NIIF y las diferencias se conciliar en la declaración anual.'],
  ej:[
   {l:1,t:'mc',p:'Un cliente promete por WhatsApp que el próximo mes comprará S/ 20,000. ¿Se registra contablemente hoy?',
    o:['Sí, porque ya existe el compromiso del cliente','No, porque todavía no hay un hecho económico medible que afecte el patrimonio','Sí, pero solo en el Libro Mayor','No, salvo que el cliente sea una empresa grande'],r:1,
    s:'No se registra. Una intención no es un hecho económico: no hay transferencia de bienes, ni servicio prestado, ni derecho de cobro exigible. El ingreso se reconocerá cuando se transfiera el control del bien (NIIF 15). Sí puede registrarse en información de gestión (proyección de ventas), que no forma parte de los libros contables.'},
   {l:1,t:'mc',p:'¿Cuál de estos organismos oficializa las NIIF para su aplicación en el Perú?',
    o:['La SUNAT','El Consejo Normativo de Contabilidad (CNC)','La Superintendencia de Banca y Seguros','El Colegio de Contadores Públicos de Lima'],r:1,
    s:'El CNC, mediante resoluciones (por ejemplo la R. CNC 002-2019-EF/30 que aprobó el PCGE 2019). La SUNAT administra tributos, no emite normativa contable; la SBS regula al sistema financiero y puede dictar planes de cuentas sectoriales.'},
   {l:2,t:'ab',p:'La dueña de una cafetería te dice: "Mi negocio va bien, en la caja tengo S/ 12,000 más que el mes pasado". Explica con tres situaciones concretas por qué ese aumento de caja no demuestra que haya ganado S/ 12,000.',
    s:'Tres casos típicos:\n\n1. **Cobró adelantos de clientes** (por ejemplo S/ 5,000 por un servicio de catering de noviembre). Ese dinero entró a caja pero no es ingreso todavía: es un pasivo (cuenta 122 Anticipos de clientes). Se reconocerá como ingreso cuando preste el servicio.\n2. **Dejó de pagar a sus proveedores**. Si postergó S/ 6,000 de facturas, la caja se ve mejor pero la deuda creció. El gasto ya se devengó al recibir los insumos, haya pagado o no.\n3. **Recibió un préstamo o aportó dinero propio**. Un desembolso del banco aumenta caja y aumenta deuda; no genera ninguna ganancia.\n\nY al revés: pudo haber ganado dinero que no está en caja, como las ventas al crédito a una empresa (cuenta 121 Facturas por cobrar) o el inventario comprado y no vendido. Por eso la utilidad se mide en el Estado de Resultados por **devengo**, no por los movimientos de efectivo, y el movimiento de caja se analiza por separado en el Estado de Flujos de Efectivo.'},
   {l:2,t:'mc',p:'Una empresa aplica NIIF y deprecia un vehículo en 8 años porque ese es su tiempo real de uso. La norma tributaria acepta como máximo 20% anual (5 años). ¿Qué debe hacer?',
    o:['Depreciar en 5 años en los libros para no tener problemas con SUNAT','Depreciar en 8 años en los libros y controlar la diferencia en la declaración anual de Renta','Llevar dos juegos de libros contables','Pedir autorización a SUNAT para usar 8 años'],r:1,
    s:'Se registra en libros la depreciación según NIIF (vida útil real, 8 años) porque los estados financieros deben mostrar la realidad económica. La diferencia frente al límite tributario se controla por fuera, como diferencia temporal, en la conciliación de la renta neta y en la NIC 12. Nunca se llevan dos juegos de libros: hay un solo registro contable y un papel de trabajo tributario.'},
   {l:3,t:'ab',p:'Una constructora firma en diciembre un contrato por S/ 2,000,000 para una obra que se ejecutará durante todo el año siguiente. Al 31 de diciembre no ha empezado la obra, pero recibió S/ 400,000 de adelanto y gastó S/ 35,000 en estudios y licencias. ¿Qué reconoce en los estados financieros de ese año y qué no? Justifica cada decisión.',
    s:'**No reconoce ingreso alguno por los S/ 2,000,000.** Bajo NIIF 15, el ingreso se reconoce a medida que se satisface la obligación de desempeño (avance de obra). Con 0% de avance no hay ingreso devengado, aunque el contrato esté firmado y sea legalmente exigible.\n\n**Los S/ 400,000 son un pasivo**, no un ingreso: pasivo por contrato / anticipos de clientes (cuenta 122). Es dinero recibido por un trabajo aún no ejecutado; si el contrato se cayera, habría que devolverlo.\n\n**Los S/ 35,000 de estudios y licencias**: hay que analizar su naturaleza. Si son costos directamente atribuibles al contrato, que se espera recuperar con él, se activan como costo de cumplimiento del contrato (activo) y se llevarán al costo a medida que avance la obra, para no castigar un año con gastos cuyo ingreso aparecerá en el siguiente. Si son gastos generales de estructura, no atribuibles, van al resultado del periodo.\n\n**Efecto en los estados financieros del año 1**: en el Estado de Situación Financiera aumenta el efectivo en S/ 400,000, aparece un pasivo por contrato de S/ 400,000 y un activo de S/ 35,000 (si califica); en el Estado de Resultados, ingreso cero. Además, el contrato por S/ 1,600,000 pendiente de ejecutar se revela en notas, porque es información relevante para el usuario aunque no se registre.'}
  ]
 },
 {
  id:'m1t2', titulo:'Los cinco elementos: activo, pasivo, patrimonio, ingreso y gasto', min:16,
  cont:`Todo hecho económico, por complicado que parezca, se descompone en cinco elementos. Si dominas estos cinco, puedes razonar cualquier asiento sin memorizar nada.

# Activo
Un recurso **controlado** por la empresa, surgido de hechos pasados, del que espera obtener beneficios económicos futuros. Tres condiciones: control (no necesariamente propiedad legal), origen en un hecho ya ocurrido, y potencial de generar beneficios.

- Efectivo y equivalentes (caja, cuentas corrientes)
- Cuentas por cobrar comerciales (derecho a cobrar a clientes)
- Mercaderías, materias primas, productos terminados
- Inmuebles, maquinaria y equipo; intangibles como un software o una marca

> **El control vale más que el título.** Un local alquilado por 10 años bajo NIIF 16 se registra como activo por derecho de uso aunque el inmueble no sea tuyo: controlas su uso durante ese plazo. En cambio, una mercadería recibida en consignación no es tu activo aunque esté físicamente en tu almacén: el control sigue siendo del consignante.

# Pasivo
Una **obligación presente** de transferir recursos, surgida de hechos pasados. "Presente" es clave: la obligación ya existe hoy, aunque se pague después.

- Cuentas por pagar comerciales (facturas de proveedores)
- Tributos por pagar (IGV, Renta, EsSalud)
- Remuneraciones y participaciones por pagar
- Obligaciones financieras (préstamos, leasing)
- Provisiones (una obligación cuyo monto o fecha es incierto, pero probable)

# Patrimonio
Es la **diferencia** entre activo y pasivo: lo que quedaría para los dueños si se liquidara todo. No es una bolsa de dinero; es un residuo. Sus componentes típicos en el Perú:

|Componente|Cuenta PCGE|Origen|
|Capital|50|Aportes de los socios, inscritos en Registros Públicos|
|Capital adicional|52|Primas de emisión, aportes no capitalizados|
|Reserva legal|582|10% de la utilidad, obligatoria hasta llegar al 20% del capital|
|Resultados acumulados|59|Utilidades o pérdidas de ejercicios anteriores|
|Resultado del ejercicio|—|La utilidad o pérdida del año en curso|

! La **reserva legal** del artículo 229 de la Ley General de Sociedades no es opcional: se detrae un mínimo del 10% de la utilidad distribuible de cada ejercicio hasta que la reserva alcance la quinta parte (20%) del capital. Se registra en el patrimonio, no es un gasto, y no reduce la utilidad del Estado de Resultados.

# Ingreso
Incremento de activos o reducción de pasivos que aumenta el patrimonio, **sin que sea un aporte de los socios**. Esa última frase es la que separa una venta de un aporte de capital: ambos aumentan el activo, pero solo la venta es ingreso.

- Ventas de mercaderías y productos (cuenta 70)
- Prestación de servicios (cuenta 704)
- Ingresos financieros, alquileres, descuentos obtenidos (cuentas 75, 77)

# Gasto
Reducción de activos o aumento de pasivos que disminuye el patrimonio, **sin que sea un reparto a los socios**. La distribución de dividendos reduce el patrimonio pero no es gasto, es reparto.

En el PCGE conviven dos formas de clasificar los gastos, y confundirlas es un error frecuente:
- **Por naturaleza** (cuentas 60 a 68): qué se consumió. Compras, cargas de personal, servicios de terceros, tributos, depreciación.
- **Por función** (cuentas 90 a 99, de costos): dónde se consumió. Costo de ventas, gastos de administración, gastos de ventas.

$ ACTIVO  =  PASIVO  +  PATRIMONIO
$ PATRIMONIO  =  Aportes  +  Utilidades acumuladas  +  (Ingresos − Gastos del periodo)

# Un ejemplo que junta los cinco
Una distribuidora de repuestos aporta S/ 50,000 de capital, compra mercadería por S/ 30,000 al crédito y la vende en S/ 45,000 al contado.

|Elemento|Importe|Explicación|
|Activo|S/ 65,000|Efectivo S/ 95,000 (50,000 aporte + 45,000 venta) menos mercadería vendida S/ 30,000 que salió del inventario|
|Pasivo|S/ 30,000|La factura del proveedor, aún impaga|
|Patrimonio|S/ 65,000|Capital 50,000 + utilidad 15,000|
|Ingreso|S/ 45,000|La venta|
|Gasto (costo de ventas)|S/ 30,000|La mercadería entregada al cliente|

Comprueba: activo 95,000 (solo efectivo, porque el inventario ya se vendió) = pasivo 30,000 + patrimonio 65,000. Cuadra. El inventario desapareció del activo y reapareció como costo en el resultado.`,
  claves:['Activo = recurso controlado con beneficios futuros; el control importa más que la propiedad legal.','Pasivo = obligación presente por hechos pasados, aunque se pague después.','Patrimonio es un residuo (A − P), no una caja de dinero.','Ingreso y gasto excluyen las operaciones con los socios: aportes y dividendos no son ingreso ni gasto.','El PCGE clasifica gastos por naturaleza (60-68) y por función (90-99); son dos vistas del mismo gasto.'],
  ej:[
   {l:1,t:'mc',p:'Un socio aporta S/ 40,000 en efectivo a la empresa. ¿Cómo se clasifica ese importe?',
    o:['Ingreso del periodo, porque entró dinero','Patrimonio (capital), porque es una operación con los socios','Pasivo, porque hay que devolverlo','Activo únicamente, sin contrapartida'],r:1,
    s:'Es patrimonio: aumenta el activo (efectivo) y aumenta el capital. La definición de ingreso excluye expresamente los aportes de los propietarios. Tampoco es pasivo: el socio no tiene derecho a exigir la devolución del capital, solo a su parte en una eventual liquidación o a dividendos cuando se acuerden.'},
   {l:1,t:'mc',p:'Una empresa recibe mercadería en consignación de un proveedor. ¿Debe registrarla como activo?',
    o:['Sí, porque está físicamente en su almacén','No, porque no controla el bien ni asume sus riesgos: el control sigue siendo del consignante','Sí, al 50% de su valor','Solo si la vende en el mismo mes'],r:1,
    s:'No es activo del consignatario. No tiene control: no decide libremente el precio ni asume el riesgo de obsolescencia o desvalorización, y puede devolver la mercadería. Se controla en cuentas de orden o en un registro extracontable, y el consignante la mantiene en su inventario (cuenta 208 Productos en consignación, o 2081 según el caso).'},
   {l:2,t:'num',p:'Una empresa tiene: efectivo S/ 18,500; cuentas por cobrar S/ 32,000; mercaderías S/ 47,000; maquinaria neta S/ 120,000; facturas por pagar S/ 56,000; préstamo bancario S/ 80,000; tributos por pagar S/ 9,500. Calcula el patrimonio.',
    u:'S/',r:72000,tol:1,
    s:'Activo total = 18,500 + 32,000 + 47,000 + 120,000 = **S/ 217,500**.\nPasivo total = 56,000 + 80,000 + 9,500 = **S/ 145,500**.\nPatrimonio = 217,500 − 145,500 = **S/ 72,000**.\n\nNota práctica: ese patrimonio de S/ 72,000 frente a un pasivo de S/ 145,500 da un ratio de endeudamiento patrimonial de 2.02 veces, es decir, los acreedores financian el doble que los dueños. Un banco lo leería como una estructura apalancada.'},
   {l:2,t:'mc',p:'La junta de accionistas acuerda distribuir dividendos por S/ 60,000. ¿Cómo afecta esto al Estado de Resultados del ejercicio?',
    o:['Es un gasto financiero, reduce la utilidad','Es un gasto administrativo, reduce la utilidad','No afecta el Estado de Resultados: reduce el patrimonio y genera un pasivo con los accionistas','Reduce los ingresos del periodo'],r:2,
    s:'No pasa por resultados. La definición de gasto excluye las distribuciones a los propietarios. El asiento reduce resultados acumulados (cuenta 591) y reconoce un pasivo con los accionistas (cuenta 441 Accionistas - dividendos por pagar). Además, al pagarlos a personas naturales domiciliadas se debe retener el Impuesto a la Renta de segunda categoría con la tasa vigente, lo que genera otro pasivo tributario.'},
   {l:3,t:'ab',p:'Clasifica cada hecho en los cinco elementos (indica qué aumenta y qué disminuye) y señala cuál NO genera ingreso ni gasto: (a) se cobra S/ 10,000 de una factura emitida el mes pasado; (b) se paga por adelantado S/ 12,000 de alquiler de un año; (c) se recibe la factura de luz del mes, S/ 1,400, por pagar; (d) se capitalizan utilidades por S/ 25,000; (e) se descubre que una mercadería con costo S/ 8,000 quedó obsoleta y no se podrá vender.',
    s:'**(a) Cobranza de factura:** aumenta activo (efectivo S/ 10,000) y disminuye activo (cuentas por cobrar S/ 10,000). **No hay ingreso**: el ingreso se reconoció cuando se hizo la venta. Solo cambia la composición del activo.\n\n**(b) Alquiler pagado por adelantado:** disminuye activo (efectivo 12,000) y aumenta activo (servicios contratados por anticipado, cuenta 18). **No hay gasto todavía.** El gasto se reconocerá a razón de S/ 1,000 por mes, a medida que se consume el servicio (devengo).\n\n**(c) Factura de luz por pagar:** aumenta pasivo (cuentas por pagar 1,400 más el IGV correspondiente) y **se reconoce gasto** (cuenta 6364 Energía eléctrica). El gasto nace con el consumo, no con el pago.\n\n**(d) Capitalización de utilidades:** disminuye patrimonio en resultados acumulados (25,000) y aumenta patrimonio en capital (25,000). **No hay ingreso ni gasto**, el patrimonio total no cambia; es un movimiento interno que sí requiere acuerdo de junta e inscripción registral.\n\n**(e) Mercadería obsoleta:** disminuye activo (inventario, vía estimación por desvalorización, cuenta 295) y **se reconoce gasto** (cuenta 6951 o 68 según presentación). Es una pérdida de valor: la NIC 2 obliga a medir el inventario al menor entre costo y valor neto realizable. Nota tributaria: para que la pérdida sea deducible se exige acreditarla con la destrucción ante notario y comunicación previa a SUNAT; si no, será una diferencia permanente.\n\n**Las que no generan ingreso ni gasto son (a) y (d).**'}
  ]
 },
 {
  id:'m1t3', titulo:'La ecuación contable y la partida doble', min:18,
  cont:`La partida doble no es una convención arbitraria: es la consecuencia lógica de la ecuación contable. Si **A = P + Pt** debe cumplirse siempre, entonces ningún hecho puede alterar un solo lado de la igualdad. Todo movimiento tiene al menos dos efectos que mantienen el equilibrio.

$ ACTIVO = PASIVO + PATRIMONIO
$ (ampliada)   Activo + Gastos  =  Pasivo + Patrimonio + Ingresos

La versión ampliada explica por qué gastos y activos se comportan igual en el debe, y por qué ingresos, pasivos y patrimonio se comportan igual en el haber.

# Debe y haber: las dos únicas direcciones
"Debe" (izquierda) y "haber" (derecha) no significan bueno ni malo, ni entrada ni salida de dinero. Son posiciones. Lo que define el efecto es la naturaleza de la cuenta:

|Elemento|Aumenta en|Disminuye en|Saldo normal|
|Activo|Debe|Haber|Deudor|
|Pasivo|Haber|Debe|Acreedor|
|Patrimonio|Haber|Debe|Acreedor|
|Ingreso|Haber|Debe|Acreedor|
|Gasto / Costo|Debe|Haber|Deudor|

> Regla de bolsillo: **ADG al debe** (Activo, Deudas que bajan, Gastos) y **PPI al haber** (Pasivo, Patrimonio, Ingresos). Si memorizas solo que el activo aumenta al debe y que la suma debe cuadrar, puedes deducir el resto.

# Los cuatro tipos de permutación
Cualquier asiento es una combinación de estos cuatro movimientos:
1. **Activo aumenta / Activo disminuye**: compras mercadería pagando al contado. El activo total no cambia, cambia su forma.
2. **Activo aumenta / Pasivo aumenta**: compras al crédito o recibes un préstamo. Crece el balance por los dos lados.
3. **Activo disminuye / Pasivo disminuye**: pagas una factura. El balance se encoge por los dos lados.
4. **Resultados**: un ingreso o un gasto, que termina afectando el patrimonio vía utilidad.

# Cómo se lee un asiento en el Perú
En el PCGE los asientos de compras y gastos usan una estructura de **doble asiento** característica: primero el gasto por naturaleza (clase 6) contra el pasivo (clase 4), y luego el destino del gasto por función (clase 9) contra la cuenta 79.

@ 05/03/2026 — Compra de mercadería al crédito, factura E001-245 por S/ 11,800 (base S/ 10,000 + IGV)
@ 60|6011 Mercaderías|10,000.00|
@ 40|40111 IGV - Cuenta propia|1,800.00|
@ 42|4212 Emitidas - Facturas por pagar||11,800.00

@ (asiento de destino, al ingresar la mercadería al almacén)
@ 20|2011 Mercaderías - Costo|10,000.00|
@ 61|6111 Variación de mercaderías||10,000.00

El primer asiento reconoce la obligación con el proveedor y el IGV que podrás usar como crédito fiscal. El segundo traslada la compra al inventario, porque la mercadería todavía no es gasto: será costo de ventas cuando se venda. La cuenta 61 "Variación de existencias" es el puente entre la clase 6 (compra) y la clase 2 (almacén), y es el detalle que más confunde a quien viene de otro país.

@ 18/03/2026 — Venta al crédito de esa mercadería por S/ 17,700 (base S/ 15,000 + IGV)
@ 12|1212 Facturas por cobrar|17,700.00|
@ 40|40111 IGV - Cuenta propia||2,700.00
@ 70|7011 Mercaderías||15,000.00

@ (costo de ventas de la mercadería entregada)
@ 69|6911 Mercaderías - Costo|10,000.00|
@ 20|2011 Mercaderías - Costo||10,000.00

Fíjate que el IGV aparece en los dos asientos en la misma cuenta 40111 pero en lados opuestos: al comprar va al debe (crédito fiscal, un derecho) y al vender va al haber (débito fiscal, una deuda). Al final del mes el saldo de esa cuenta te dice si pagas IGV o si arrastras crédito.

! Error clásico de principiante: registrar la compra de mercadería directamente en la cuenta 20 sin pasar por la 60. Funciona aritméticamente, pero rompe la estructura del PCGE, deja el Registro de Compras sin correlato contable y hace imposible analizar la variación de existencias. En una fiscalización, esa desprolijidad llama la atención.

# Comprobar el equilibrio
En todo asiento: **suma del debe = suma del haber**. Si no cuadra, hay un error, y no se "fuerza" con una cuenta puente. Los descuadres frecuentes son:
- Olvidar el IGV en una de las dos partes.
- Registrar el importe total en la cuenta de gasto en vez de la base imponible.
- Invertir debe y haber en una cobranza (confundir cobrar con vender).`,
  claves:['La partida doble se deduce de A = P + Pt: nada puede mover un solo lado.','Activo y gasto aumentan al debe; pasivo, patrimonio e ingreso aumentan al haber.','En el PCGE las compras y gastos usan doble asiento: naturaleza (clase 6) y luego destino (clase 9 o clase 2 vía cuenta 61).','La cuenta 40111 recibe el IGV de compras al debe y el de ventas al haber; su saldo mensual define si pagas o arrastras crédito.','Debe y haber siempre cuadran; un descuadre es un error, nunca se ajusta con una cuenta puente.'],
  ej:[
   {l:1,t:'mc',p:'Se paga en efectivo una factura pendiente a un proveedor por S/ 5,000. ¿Qué tipo de permutación es?',
    o:['Activo aumenta / Activo disminuye','Activo disminuye / Pasivo disminuye','Gasto aumenta / Activo disminuye','Pasivo aumenta / Patrimonio disminuye'],r:1,
    s:'Activo disminuye (efectivo, al haber) y pasivo disminuye (cuentas por pagar, al debe). El balance total se reduce en S/ 5,000 por ambos lados. No hay gasto: el gasto ya se reconoció al recibir el bien o servicio; esto es solo la extinción de la obligación.'},
   {l:1,t:'mc',p:'¿En qué lado aumenta una cuenta de ingreso y cuál es su saldo normal?',
    o:['Aumenta en el debe; saldo deudor','Aumenta en el haber; saldo acreedor','Aumenta en el haber; saldo deudor','Depende de si la venta fue al contado o al crédito'],r:1,
    s:'Los ingresos aumentan en el haber y tienen saldo acreedor, igual que pasivos y patrimonio, porque incrementan el patrimonio. En la ecuación ampliada (Activo + Gastos = Pasivo + Patrimonio + Ingresos), los ingresos están del lado derecho. La forma de cobro no altera la naturaleza de la cuenta de ingreso: solo cambia la contrapartida (caja o cuentas por cobrar).'},
   {l:2,t:'num',p:'Una ferretería compra mercadería por S/ 24,780 incluido IGV (18%). ¿Qué importe va a la cuenta 6011 Mercaderías?',
    u:'S/',r:21000,tol:1,
    s:'El importe de la cuenta 60 es la **base imponible**, sin IGV.\n\nBase = 24,780 ÷ 1.18 = **S/ 21,000.00**\nIGV = 21,000 × 18% = S/ 3,780.00\nComprobación: 21,000 + 3,780 = 24,780 ✓\n\nAsiento: debe 6011 por 21,000 y debe 40111 por 3,780, haber 4212 por 24,780. El error típico es llevar los 24,780 a la cuenta 60: eso infla el costo del inventario, reduce indebidamente la utilidad y hace perder el control del crédito fiscal.'},
   {l:2,t:'ab',p:'Registra el asiento (con cuentas del PCGE e importes) de la venta al contado de servicios de consultoría por S/ 5,900 incluido IGV, depositados en la cuenta corriente del BCP.',
    s:'Base imponible = 5,900 ÷ 1.18 = S/ 5,000.00 · IGV = S/ 900.00\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 1041 | Cuentas corrientes operativas - BCP | 5,900.00 | |\n| 40111 | IGV - Cuenta propia | | 900.00 |\n| 7041 | Prestación de servicios - Terceros | | 5,000.00 |\n\nY el asiento de destino del ingreso no aplica aquí (los ingresos no se redistribuyen por función). Si la consultoría estuviera sujeta a **detracción** (algunos servicios lo están, con tasa del 12% sobre el total), el cliente depositaría el 12% en la cuenta de detracciones del Banco de la Nación y solo el resto en el BCP; entonces el debe se partiría entre la cuenta 1041 y la 1042 (cuentas de detracción), por el mismo total de S/ 5,900.'},
   {l:3,t:'ab',p:'Un comerciante registró así la compra de mercadería al crédito por S/ 9,440 incluido IGV: "Debe 20 Mercaderías 9,440 / Haber 42 Cuentas por pagar 9,440". Identifica los tres errores y escribe el registro correcto completo.',
    s:'**Error 1 — Importe:** llevó el total con IGV al inventario. La base es 9,440 ÷ 1.18 = S/ 8,000 y el IGV es S/ 1,440. Al no separarlo, perdió S/ 1,440 de crédito fiscal (pagará más IGV) y sobrevaluó su inventario en ese monto.\n\n**Error 2 — Omisión de la clase 6:** en el PCGE la compra se reconoce primero por naturaleza en la cuenta 6011, no directamente en la 20. Sin ese registro, el Registro de Compras no tiene correlato en el Libro Diario y no se puede analizar la variación de existencias.\n\n**Error 3 — Falta el asiento de destino:** el ingreso al almacén se hace contra la cuenta 61 Variación de existencias, que cierra el circuito compra → almacén.\n\n**Registro correcto:**\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6011 | Mercaderías - Costo | 8,000.00 | |\n| 40111 | IGV - Cuenta propia | 1,440.00 | |\n| 4212 | Emitidas - Facturas por pagar | | 9,440.00 |\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 2011 | Mercaderías - Costo | 8,000.00 | |\n| 6111 | Variación de mercaderías | | 8,000.00 |\n\nEfecto del error si no se corrige: inventario sobrevaluado en S/ 1,440, crédito fiscal no utilizado por S/ 1,440, y cuando venda esa mercadería su costo de ventas será mayor, por lo que declarará menos utilidad de la real. Es una inconsistencia que SUNAT detecta cruzando el Registro de Compras electrónico con la declaración de IGV.'}
  ]
 },
 {
  id:'m1t4', titulo:'El Plan Contable General Empresarial (PCGE 2019)', min:15,
  cont:`El PCGE es el catálogo de cuentas de uso obligatorio en el Perú para las empresas del sector privado que no tienen un plan sectorial propio (los bancos usan el de la SBS, las aseguradoras el suyo). La versión vigente fue aprobada por **Resolución CNC 002-2019-EF/30** y rige desde el ejercicio 2020.

# Cómo se estructura un código
El PCGE usa una codificación decimal que se abre en niveles. Cada dígito añade precisión:

|Nivel|Dígitos|Nombre|Ejemplo|
|1|1|Elemento|6 - Gastos por naturaleza|
|2|2|Cuenta|60 - Compras|
|3|3|Subcuenta|601 - Mercaderías|
|4|4|Divisionaria|6011 - Mercaderías manufacturadas|
|5|5 o más|Subdivisionaria (libre)|60111 - Mercadería línea ferretería|

A partir del quinto dígito la empresa define lo que necesite. Esa libertad es la que permite que una empresa con tres locales controle ventas por local sin salir del plan oficial.

# Los nueve elementos
|Elemento|Qué agrupa|Lógica|
|1|Activo disponible y exigible|Efectivo, cuentas por cobrar, servicios pagados por anticipado|
|2|Activo realizable|Existencias: mercaderías, materias primas, productos en proceso|
|3|Activo inmovilizado|Inversiones, propiedades, planta y equipo, intangibles|
|4|Pasivo|Tributos, remuneraciones, proveedores, obligaciones financieras|
|5|Patrimonio neto|Capital, reservas, resultados|
|6|Gastos por naturaleza|Compras, personal, servicios, tributos, depreciación|
|7|Ingresos|Ventas, servicios, ingresos financieros|
|8|Saldos intermediarios de gestión|Producción del ejercicio, valor agregado, resultados|
|9|Contabilidad analítica de explotación|Gastos por función: costo de producción, administración, ventas|
|0|Cuentas de orden|Bienes en préstamo, garantías, contingencias|

Los elementos 8 y 9 son los que suelen desconcertar. El 9 reclasifica los gastos de la clase 6 según **dónde** se consumieron (¿fue gasto de administración o de ventas?), usando la cuenta 79 "Cargas imputables a cuentas de costos y gastos" como contrapartida. El 8 calcula resultados intermedios y en la práctica muchas empresas lo usan de forma reducida.

# Las cuentas que vas a usar todos los días
|Cuenta|Nombre|Uso típico|
|101 / 104|Caja / Cuentas corrientes|Efectivo y bancos|
|1041 / 1042|Operativas / De detracción|Separar la cuenta del Banco de la Nación|
|121 / 1212|Facturas por cobrar emitidas|Ventas al crédito|
|141|Préstamos al personal|Adelantos a trabajadores|
|20 / 201|Mercaderías|Comercio|
|33 / 334|Propiedades, planta y equipo / Equipo de transporte|Activo fijo|
|39 / 391|Depreciación acumulada|Siempre con saldo acreedor|
|40111|IGV - Cuenta propia|Crédito y débito fiscal|
|4017|Impuesto a la Renta|Pagos a cuenta y regularización|
|403|Instituciones públicas|EsSalud, ONP, SENATI|
|41|Remuneraciones por pagar|Planilla|
|4212|Facturas por pagar|Proveedores|
|45|Obligaciones financieras|Préstamos y leasing|
|50 / 59|Capital / Resultados acumulados|Patrimonio|
|60 / 61|Compras / Variación de existencias|Circuito de compras|
|62|Gastos de personal|Sueldos, gratificaciones, EsSalud|
|63|Gastos de servicios prestados por terceros|Luz, agua, teléfono, alquileres, honorarios|
|64|Gastos por tributos|Predial, arbitrios, ITAN|
|68|Valuación y deterioro|Depreciación, amortización, provisiones|
|69|Costo de ventas|Contrapartida al dar de baja el inventario|
|70|Ventas|Ingresos por mercaderías y servicios|
|79|Cargas imputables a costos y gastos|Puente hacia la clase 9|
|94 / 95|Gastos de administración / de ventas|Destino por función|

> **Truco de lectura:** si un código empieza en 1, 2 o 3 es activo; en 4 es pasivo; en 5 patrimonio; en 6 gasto; en 7 ingreso. Con eso ya sabes de qué lado va sin consultar el manual. Y recuerda la excepción: la cuenta **39 Depreciación acumulada** está en el elemento 3 (activo) pero es una cuenta de valuación con saldo **acreedor**, porque resta del activo. Lo mismo ocurre con la 19 (estimación de cobranza dudosa) y la 29 (desvalorización de existencias).

# Dinámica y uso obligatorio
El PCGE incluye, para cada cuenta, su **dinámica**: qué se debita, qué se acredita y con qué cuentas se relaciona. Ante una duda real, esa es la fuente que hay que abrir, no la intuición. Y la obligación no es decorativa: el artículo 65 de la Ley del Impuesto a la Renta y las resoluciones de SUNAT sobre libros electrónicos exigen que el Libro Diario y el Mayor identifiquen la cuenta del plan contable utilizada, con su denominación. Un plan de cuentas inventado hace el libro electrónico inválido.

! No confundas el PCGE con los **estados financieros**. El PCGE es cómo registras; la presentación de los estados financieros sigue las NIIF y el Manual para la Preparación de Información Financiera de la SMV. Varias cuentas del PCGE se agrupan en una sola línea del Estado de Situación Financiera.`,
  claves:['PCGE 2019 (R. CNC 002-2019-EF/30), obligatorio desde 2020 para empresas sin plan sectorial propio.','Codificación por niveles: elemento, cuenta, subcuenta, divisionaria; del quinto dígito en adelante es libre.','1-2-3 activo, 4 pasivo, 5 patrimonio, 6 gasto, 7 ingreso, 8 saldos de gestión, 9 costos por función, 0 cuentas de orden.','Las cuentas 19, 29 y 39 están en el activo pero tienen saldo acreedor: son cuentas de valuación que restan.','La cuenta 79 es el puente entre el gasto por naturaleza (clase 6) y el gasto por función (clase 9).'],
  ej:[
   {l:1,t:'mc',p:'La cuenta 39 Depreciación acumulada pertenece al elemento 3 (activo inmovilizado). ¿Cuál es su saldo normal?',
    o:['Deudor, porque está en el activo','Acreedor, porque es una cuenta de valuación que resta del activo','No tiene saldo, es de cierre','Depende del método de depreciación'],r:1,
    s:'Acreedor. Es una cuenta de valuación (o "regularizadora"): acumula la depreciación para presentarla restando del costo del activo, de modo que el Estado de Situación Financiera muestre el valor neto. Lo mismo pasa con la 19 (estimación de cuentas de cobranza dudosa) y la 29 (desvalorización de existencias). Si tu cuenta 39 tiene saldo deudor, hay un error de registro.'},
   {l:1,t:'mc',p:'¿Qué cuenta del PCGE usarías para registrar el gasto de energía eléctrica del mes?',
    o:['64 Gastos por tributos','63 Gastos de servicios prestados por terceros','60 Compras','68 Valuación y deterioro'],r:1,
    s:'La cuenta 63, específicamente 6364 Energía eléctrica. La cuenta 64 es para tributos (predial, arbitrios, ITAN), la 60 para compras de bienes que ingresan al almacén, y la 68 para depreciaciones, amortizaciones y provisiones. Luego el gasto se reclasifica por función a la 94 (administración) o 95 (ventas) según el área que lo consumió, usando la cuenta 79 como contrapartida.'},
   {l:2,t:'ab',p:'Una empresa comercial con tres tiendas quiere saber las ventas de cada tienda sin salir del PCGE. ¿Cómo lo estructurarías? Escribe los códigos.',
    s:'Se usa la libertad del PCGE a partir del quinto dígito. La cuenta oficial llega hasta la divisionaria:\n\n- 70 Ventas → 701 Mercaderías → 7011 Mercaderías manufacturadas\n\nY desde ahí la empresa define:\n\n- **70111** Ventas tienda Lima Centro\n- **70112** Ventas tienda Arequipa\n- **70113** Ventas tienda Trujillo\n\nY se replica la misma lógica en las cuentas relacionadas para que el análisis sea completo: 69111/69112/69113 para el costo de ventas por tienda, y 95111/95112/95113 para los gastos de ventas por tienda. Así se obtiene el margen por local directamente del sistema, sin hojas de cálculo paralelas.\n\n**Importante:** el libro electrónico exige reportar la cuenta con el nivel de detalle que la empresa usa en su plan, pero la estructura de los primeros cuatro dígitos debe coincidir con el PCGE oficial. Lo que se agrega abajo es libre; lo que está arriba no se modifica.'},
   {l:2,t:'num',p:'De estas cuentas, ¿cuántas tienen saldo normal ACREEDOR? 101, 19, 1212, 29, 39, 4212, 50, 6011, 7011, 95',
    r:6,tol:0,
    s:'Son **6**: la 19 (estimación de cobranza dudosa), la 29 (desvalorización de existencias), la 39 (depreciación acumulada), la 4212 (facturas por pagar), la 50 (capital) y la 7011 (ventas).\n\nDeudoras: 101 Caja (activo), 1212 Facturas por cobrar (activo), 6011 Mercaderías (gasto por naturaleza) y 95 Gastos de ventas (gasto por función).\n\nLa trampa del ejercicio está en las cuentas 19, 29 y 39: están codificadas dentro de elementos de activo pero su saldo es acreedor porque son cuentas de valuación.'},
   {l:3,t:'ab',p:'Explica, con un asiento de ejemplo, para qué sirve la cuenta 79 y qué pasaría si una empresa decidiera no usar la clase 9.',
    s:'La cuenta **79 Cargas imputables a cuentas de costos y gastos** es la contrapartida que permite reclasificar el gasto por naturaleza (clase 6) en gasto por función (clase 9) sin duplicar el gasto en el resultado.\n\nEjemplo: el alquiler del mes es S/ 4,000; S/ 2,500 corresponden a la oficina administrativa y S/ 1,500 al local de ventas.\n\nPrimer asiento, por naturaleza:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 6352 | Alquiler de edificaciones | 4,000.00 | |\n| 40111 | IGV - Cuenta propia | 720.00 | |\n| 4212 | Facturas por pagar | | 4,720.00 |\n\nSegundo asiento, de destino por función:\n\n| Cuenta | Detalle | Debe | Haber |\n|---|---|---|---|\n| 94 | Gastos de administración | 2,500.00 | |\n| 95 | Gastos de ventas | 1,500.00 | |\n| 79 | Cargas imputables a costos y gastos | | 4,000.00 |\n\nLa 79 cancela el efecto de la clase 9 en el resultado: al cierre, la suma de la clase 9 se compensa con la 79, de modo que el gasto se reconoce **una sola vez** (por la clase 6) pero queda clasificado por función para armar el Estado de Resultados.\n\n**Si no se usa la clase 9:** el registro cuadra y los tributos se calculan igual, pero el Estado de Resultados por función (costo de ventas, gastos de administración, gastos de ventas) tendría que armarse manualmente fuera del sistema. Para una bodega es manejable; para una empresa con áreas y centros de costo es insostenible, y además complica cualquier auditoría, porque no hay rastro contable de cómo se asignó cada gasto. En empresas obligadas a contabilidad completa, la práctica profesional y los requerimientos de libros electrónicos esperan ver ese destino registrado.'}
  ]
 },
 {
  id:'m1t5', titulo:'Comprobantes de pago y sustento de las operaciones', min:14,
  cont:`En el Perú, un registro contable sin comprobante válido es un registro en riesgo: puede costar el crédito fiscal del IGV y la deducción del gasto en el Impuesto a la Renta. El Reglamento de Comprobantes de Pago (R.S. 007-99/SUNAT) y la normativa de emisión electrónica definen qué documento corresponde a cada operación.

# Qué documento usar
|Comprobante|Cuándo se emite|Da crédito fiscal|Sustenta costo o gasto|
|Factura|A quien tiene RUC y requiere sustentar costo, gasto o crédito fiscal|Sí|Sí|
|Boleta de venta|A consumidores finales (sin RUC o que no necesitan sustento)|No|Solo con límites y en ciertos casos|
|Recibo por honorarios|Lo emite una persona natural por servicios de cuarta categoría|No|Sí|
|Nota de crédito|Anulaciones, descuentos, devoluciones, bonificaciones|Ajusta|Ajusta|
|Nota de débito|Recuperación de costos, intereses moratorios|Ajusta|Ajusta|
|Guía de remisión|Traslado de bienes (no acredita la venta)|No|No, es documento de traslado|
|Liquidación de compra|Compras a personas naturales sin RUC de productos primarios|Sí, con requisitos|Sí|

# Facturación electrónica: hoy es la regla, no la excepción
Prácticamente todos los contribuyentes emiten comprobantes electrónicos a través del SEE (Sistema de Emisión Electrónica), ya sea desde SUNAT Operaciones en Línea, desde su propio sistema con un PSE (Proveedor de Servicios Electrónicos), o con el aplicativo gratuito. Lo que cambia respecto del papel:

- El comprobante existe cuando el **CPE** se genera y se remite a SUNAT dentro del plazo; el archivo XML es el documento, el PDF es solo su representación impresa.
- SUNAT valida y devuelve una **CDR** (Constancia de Recepción). Un comprobante rechazado no existe para efectos tributarios.
- La anulación no se hace rompiendo papeles: se usa una **comunicación de baja** (para facturas del mismo día o según plazo) o una **nota de crédito**.
- El receptor puede verificar la validez del comprobante en el portal de SUNAT antes de registrarlo. Hacerlo es parte del control interno, sobre todo con proveedores nuevos.

# Los requisitos que invalidan un gasto
Para que un gasto sea deducible en Renta y el IGV sea crédito fiscal, no basta tener el papel. Hay tres capas:

1. **Formal**: el comprobante debe cumplir los requisitos del reglamento (datos del emisor y receptor, descripción, importes, IGV discriminado) y el emisor debe tener la condición de habido y no estar de baja.
2. **Sustancial**: el gasto debe cumplir el **principio de causalidad** (art. 37 de la LIR): ser necesario para producir la renta o mantener la fuente. Una cena familiar con factura a nombre de la empresa no es deducible, por más que el comprobante sea perfecto.
3. **Probatoria (fehaciencia)**: debe existir evidencia de que la operación realmente ocurrió: contratos, órdenes de compra, conformidad de servicio, guías de remisión, correos, informes. SUNAT desconoce gastos "no fehacientes" incluso con factura válida y pagada.

! **Bancarización.** Toda obligación desde S/ 2,000 o US$ 500 debe pagarse usando medios de pago del sistema financiero (transferencia, depósito, cheque "no negociable", tarjeta). Si se paga en efectivo por encima de ese límite, se pierde el derecho a deducir el gasto o costo y a usar el crédito fiscal, **aunque la factura sea impecable**. Es uno de los errores más caros y más frecuentes en MYPES.

# El flujo documentario de una compra típica
1. **Orden de compra** al proveedor (control interno, no es comprobante).
2. **Guía de remisión** con la que llega la mercadería; se verifica contra lo pedido.
3. **Nota de ingreso al almacén**, que respalda el asiento a la cuenta 20.
4. **Factura electrónica** del proveedor; se valida en SUNAT y se registra en el Registro de Compras.
5. **Pago bancarizado**, con su constancia; si la operación está sujeta a **detracción**, el depósito en el Banco de la Nación es requisito para usar el crédito fiscal del periodo.

> **El Registro de Compras y el Registro de Ventas** son los libros donde se anota comprobante por comprobante. Hoy se llevan electrónicamente mediante el **SIRE** (Sistema Integrado de Registros Electrónicos), que propone al contribuyente un registro preliminar armado con la información que SUNAT ya tiene de los comprobantes electrónicos. Eso cambia el trabajo del contador: ya no se digita, se **concilia y se ajusta**, y cualquier diferencia entre lo que SUNAT ve y lo que la empresa declara salta de inmediato.`,
  claves:['Factura para operaciones B2B con crédito fiscal; boleta para consumidor final, sin crédito fiscal.','El comprobante electrónico es el XML con su CDR; el PDF es solo representación impresa.','Un gasto deducible exige tres capas: requisito formal, causalidad y fehaciencia.','Bancarización: desde S/ 2,000 o US$ 500 el pago debe ir por el sistema financiero o se pierde gasto y crédito fiscal.','El SIRE preconstruye los registros de compras y ventas: el trabajo pasa de digitar a conciliar.'],
  ej:[
   {l:1,t:'mc',p:'Una empresa compra útiles de oficina por S/ 350 y le entregan una boleta de venta. ¿Puede usar el IGV como crédito fiscal?',
    o:['Sí, el IGV siempre es crédito fiscal','No: la boleta de venta no otorga derecho al crédito fiscal','Sí, si la registra en el Registro de Compras','Sí, si el importe es menor a S/ 700'],r:1,
    s:'No. La boleta de venta está diseñada para consumidores finales y no permite ejercer el crédito fiscal del IGV. Para ello se requiere factura (o ticket que cumpla los requisitos de factura). Para la deducción del gasto en Renta, las boletas tienen además un límite global anual (6% de los montos sustentados con comprobantes que sí dan derecho a deducir, con un tope en UIT), por lo que la buena práctica es pedir siempre factura con el RUC de la empresa.'},
   {l:1,t:'mc',p:'¿Qué documento se emite para anular parcialmente una factura por una devolución de mercadería?',
    o:['Nota de débito','Nota de crédito','Guía de remisión','Una nueva factura en negativo'],r:1,
    s:'Nota de crédito electrónica, que ajusta el importe y el IGV de la factura original a la que debe hacer referencia. La nota de débito se usa en el sentido contrario (recuperar costos, cobrar intereses moratorios). No existen facturas en negativo en el sistema peruano.'},
   {l:2,t:'ab',p:'Una MYPE paga en efectivo S/ 6,500 a un proveedor por una compra de mercadería con factura electrónica válida. El contador registra la compra y usa el crédito fiscal. ¿Qué problema hay y cuál es el efecto en números?',
    s:'El problema es la **falta de bancarización**. La Ley 28194 obliga a usar medios de pago para obligaciones desde S/ 2,000 o US$ 500. Al pagar S/ 6,500 en efectivo:\n\n- **Se pierde el crédito fiscal del IGV.** Base = 6,500 ÷ 1.18 = S/ 5,508.47; IGV = S/ 991.53 que no podrá usarse.\n- **Se pierde la deducción del costo o gasto** de S/ 5,508.47 para el Impuesto a la Renta. Con tasa de 29.5%, el costo tributario adicional es aproximadamente S/ 1,625.\n- Efecto total aproximado: **S/ 2,616** de perjuicio, por una operación de S/ 6,500. Casi el 40%.\n\nY no se arregla pagando después por banco: el medio de pago debe usarse al momento de cumplir la obligación. Tampoco se salva fraccionando el pago en montos menores a S/ 2,000, porque la norma mira la **obligación**, no cada desembolso.\n\nContablemente el asiento de la compra se mantiene (el hecho económico ocurrió), pero el IGV no va a la cuenta 40111 como crédito: se incorpora al costo o al gasto, y en la conciliación anual se registra como diferencia permanente no deducible.'},
   {l:2,t:'mc',p:'Un servicio de transporte de carga está sujeto a detracción. La empresa recibe la factura, la registra y usa el crédito fiscal, pero no hizo el depósito en el Banco de la Nación. ¿Qué ocurre?',
    o:['Nada, la detracción es solo una formalidad del proveedor','Pierde el crédito fiscal del periodo y solo podrá usarlo a partir del periodo en que acredite el depósito','La factura se anula automáticamente','Debe emitir una nota de crédito'],r:1,
    s:'El crédito fiscal se puede ejercer recién a partir del periodo en que se acredita el depósito de la detracción. Es un diferimiento, no una pérdida definitiva, pero afecta la liquidez del mes y, si la omisión se descubre en una fiscalización, genera reparo, multa e intereses por el IGV declarado en exceso como crédito. El depósito es responsabilidad del usuario del servicio (el adquirente), no del proveedor.'},
   {l:3,t:'ab',p:'SUNAT fiscaliza a una consultora y desconoce S/ 180,000 de gastos por "servicios de asesoría" a un proveedor, pese a que existen facturas electrónicas válidas, están bancarizados y se registraron correctamente. ¿Con qué argumento puede hacerlo y qué debió tener la empresa?',
    s:'El argumento es la falta de **fehaciencia** (y, posiblemente, de causalidad). Que el comprobante sea formalmente válido y el pago esté bancarizado acredita la forma, no la realidad del servicio. SUNAT puede sostener que no hay prueba de que el servicio se haya prestado efectivamente, lo que convierte el gasto en no deducible y además desconoce el crédito fiscal del IGV.\n\n**Qué debió tener la empresa, como expediente por cada servicio:**\n\n1. **Contrato o propuesta aceptada** con alcance, plazos, entregables y honorarios.\n2. **Evidencia del entregable**: informes, presentaciones, memorandos, modelos financieros, correos de avance con fecha.\n3. **Acta de conformidad o aceptación** del servicio firmada por el área usuaria.\n4. **Rastro de la relación**: correos, actas de reunión, registros de ingreso de los consultores, agenda.\n5. **Perfil del proveedor**: que tenga la capacidad real de prestar ese servicio (personal, experiencia, domicilio verificable). Un proveedor sin empleados que factura S/ 180,000 de asesoría especializada es una alerta inmediata.\n6. **Vinculación con la generación de renta**: explicar cómo ese servicio contribuyó al negocio (causalidad), con razonabilidad y proporcionalidad frente al tamaño de la empresa.\n\n**Efecto económico del reparo:** si se desconocen los S/ 180,000, el Impuesto a la Renta adicional es aproximadamente 180,000 × 29.5% = **S/ 53,100**, más el IGV reparado de alrededor de S/ 32,400, más multas por declarar cifras falsas (típicamente 50% del tributo omitido, con posibilidad de gradualidad si se subsana) e intereses moratorios. Puede duplicarse el impacto frente al monto original.\n\nLa lección práctica: la carpeta de sustento se arma **cuando ocurre la operación**, no cuando llega la carta de fiscalización tres años después.'}
  ]
 }
 ]
}
);
