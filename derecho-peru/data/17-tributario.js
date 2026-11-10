(window.CURSO=window.CURSO||[]).push({
id:'tributario',orden:17,nivel:6,n:'Derecho Tributario',ciclo:'Ciclos VIII – IX',
desc:'La potestad tributaria y sus límites constitucionales, el tributo y sus clases, la obligación tributaria, la SUNAT y los procedimientos de fiscalización y contencioso, la prescripción y los principales impuestos del sistema peruano.',
normas:['Constitución, arts. 74 y 79','TUO del Código Tributario (D. S. 133-2013-EF)','TUO de la Ley del Impuesto a la Renta (D. S. 179-2004-EF)','TUO de la Ley del IGV e ISC (D. S. 055-99-EF)','TUO de la Ley de Tributación Municipal (D. S. 156-2004-EF)'],
biblio:[['Jorge Bravo Cucci','Fundamentos de Derecho Tributario'],['Francisco Ruiz de Castilla Ponce de León','Derecho Tributario: temas básicos (Colección Lo Esencial del Derecho, PUCP)'],['Carmen Robles Moreno y otros','Código Tributario: doctrina y comentarios'],['César García Novoa','El principio de seguridad jurídica en materia tributaria'],['Héctor Villegas','Curso de finanzas, derecho financiero y tributario']],
temas:[
{id:'tr-potestad',n:'Potestad tributaria y principios constitucionales',nv:1,
r:'Quién puede crear tributos en el Perú y con qué límites: reserva de ley, igualdad, respeto a los derechos fundamentales y no confiscatoriedad.',
normas:['Const. art. 74','Const. art. 79','CT Norma IV'],
b:[
['norma','Const. art. 74 (primer párrafo)','Los tributos se crean, modifican o derogan, o se establece una exoneración, exclusivamente por ley o decreto legislativo en caso de delegación de facultades, salvo los aranceles y tasas, los cuales se regulan mediante decreto supremo.','lit'],
['h','¿Quién tiene potestad tributaria?'],
['tabla',['Nivel de gobierno','Qué puede crear','Instrumento'],[
['Gobierno Central','Impuestos, contribuciones y tasas','Ley o decreto legislativo (aranceles y tasas: decreto supremo)'],
['Gobiernos regionales','Contribuciones y tasas, dentro de su jurisdicción y con los límites de ley','Ordenanza regional'],
['Gobiernos locales','Contribuciones y tasas (arbitrios, derechos, licencias), dentro de su jurisdicción','Ordenanza municipal']]],
['ojo','Los gobiernos locales <strong>no pueden crear impuestos</strong>. Los impuestos municipales (predial, alcabala, vehicular) los crea una ley nacional (Ley de Tributación Municipal); las municipalidades solo los administran y cobran.'],
['h','Principios constitucionales (art. 74)'],
['tabla',['Principio','Contenido'],[
['Reserva de ley','Los elementos esenciales del tributo (hecho generador, sujetos, base imponible, alícuota) deben estar en una norma con rango de ley; el reglamento solo puede desarrollar aspectos técnicos'],
['Igualdad','Trato igual a quienes tienen la misma capacidad contributiva; trato diferenciado solo si es razonable'],
['Respeto a los derechos fundamentales','El tributo no puede vulnerar derechos como la propiedad, la libertad de empresa o el debido proceso'],
['No confiscatoriedad','El tributo no puede absorber una parte sustancial de la propiedad o la renta; se analiza en cada caso, en sentido cuantitativo y cualitativo']]],
['p','Además, según el art. 74, las leyes de presupuesto y los decretos de urgencia no pueden contener normas sobre materia tributaria, y las leyes relativas a tributos de periodicidad anual rigen a partir del primero de enero del año siguiente a su promulgación. No surten efecto las normas tributarias dictadas en violación de lo que establece este artículo.'],
['juris','STC 0041-2004-AI/TC (arbitrios de Santiago de Surco)','El TC estableció que los arbitrios deben distribuirse según criterios vinculados a la prestación efectiva del servicio (por ejemplo, frecuencia de recolección de residuos o metros lineales de frontera para parques y jardines) y no simplemente según el valor del predio (autoavalúo), porque los arbitrios son tasas, no impuestos. Fijó además reglas sobre la ratificación provincial de las ordenanzas distritales.'],
['clave',['Solo ley o decreto legislativo crean impuestos; aranceles y tasas por decreto supremo.','Gobiernos regionales y locales: solo contribuciones y tasas.','Principios: reserva de ley, igualdad, derechos fundamentales, no confiscatoriedad.','Decretos de urgencia: nunca materia tributaria.']]
],
g:[['Potestad tributaria','Facultad del Estado para crear, modificar o suprimir tributos.'],['Reserva de ley','Exigencia de que los elementos esenciales del tributo estén en una norma con rango de ley.'],['No confiscatoriedad','Prohibición de que un tributo absorba una parte sustancial del patrimonio o la renta.'],['Capacidad contributiva','Aptitud económica de una persona para contribuir al sostenimiento del gasto público.']],
e:[
{d:1,t:'om',q:'¿Qué instrumento usa una municipalidad distrital para crear un arbitrio?',o:['Ley','Decreto supremo','Ordenanza municipal','Resolución de alcaldía'],a:2,x:'Las municipalidades crean contribuciones y tasas mediante ordenanza.'},
{d:1,t:'vf',q:'Una municipalidad puede crear un impuesto a la venta de celulares en su distrito.',a:false,x:'Falso. Los gobiernos locales solo pueden crear contribuciones y tasas.'},
{d:1,t:'om',q:'¿Qué principio prohíbe que un tributo absorba una parte sustancial de la renta del contribuyente?',o:['Igualdad','No confiscatoriedad','Reserva de ley','Publicidad'],a:1,x:'Es el principio de no confiscatoriedad.'},
{d:2,t:'caso',c:'Una ley crea un impuesto, pero deja que un decreto supremo determine la tasa (alícuota) sin fijar ningún límite.',q:'¿Qué principio se vulnera?',o:['No confiscatoriedad','Reserva de ley: la alícuota es un elemento esencial que debe fijar la ley (o al menos sus parámetros)','Igualdad','Ninguno'],a:1,x:'El TC ha admitido remisiones al reglamento solo si la ley fija parámetros; una remisión en blanco viola la reserva de ley.'},
{d:2,t:'caso',c:'Una municipalidad cobra arbitrios de limpieza calculados exclusivamente según el valor de cada casa: las más caras pagan mucho más, aunque reciben el mismo servicio.',q:'Según la STC 0041-2004-AI/TC, ¿es correcto?',o:['Sí, porque quien tiene más debe pagar más','No: los arbitrios son tasas y deben distribuirse según criterios vinculados al servicio, no solo al valor del predio','Sí, si lo aprueba el concejo','Solo si se publica en El Peruano'],a:1,x:'El valor del predio no refleja la intensidad del uso del servicio; usarlo como criterio exclusivo desnaturaliza la tasa.'},
{d:3,t:'abierta',q:'Explica qué significa la «reserva de ley relativa» en materia tributaria y hasta dónde puede llegar un reglamento.',m:'<p>El TC ha entendido que la reserva de ley tributaria es <strong>relativa</strong>: la ley debe contener los elementos esenciales del tributo (hecho generador, sujetos, base imponible y alícuota o, al menos, los parámetros para fijarla), pero puede remitir al reglamento aspectos técnicos o de detalle, siempre que la remisión sea razonable y esté delimitada.</p><p>El reglamento puede precisar procedimientos, formularios, plazos de pago, mecanismos de cálculo dentro de los límites de la ley. No puede crear el tributo, modificar sus elementos esenciales, crear exoneraciones ni ampliar los sujetos obligados (Norma VIII del Código Tributario). Si lo hace, la disposición reglamentaria es inválida y puede cuestionarse por acción popular o inaplicarse.</p>',k:['Define la reserva de ley relativa','Enumera los elementos esenciales','Indica qué puede y qué no puede hacer el reglamento','Menciona la Norma VIII o el control por acción popular']}
]},
{id:'tr-obligacion',n:'El tributo y la obligación tributaria',nv:1,
r:'Impuesto, contribución y tasa; nacimiento y exigibilidad de la obligación; acreedor, contribuyente y responsable; formas de extinción.',
normas:['CT Normas II y VIII','CT arts. 1 – 32'],
b:[
['h','Clases de tributo (Norma II)'],
['tabla',['Tributo','Definición','Ejemplo'],[
['Impuesto','Su cumplimiento no origina una contraprestación directa en favor del contribuyente por parte del Estado','Impuesto a la Renta, IGV, predial'],
['Contribución','Su hecho generador son los beneficios derivados de obras públicas o actividades estatales','Aporte a EsSalud, contribución al SENATI'],
['Tasa','Su hecho generador es la prestación efectiva por el Estado de un servicio público individualizado en el contribuyente','Arbitrios (limpieza, parques, serenazgo), derechos (trámites, uso de bienes públicos), licencias (autorizaciones)']]],
['p','Según la Norma II, no es tasa el pago que se recibe por un servicio de origen contractual.'],
['h','La obligación tributaria'],
['norma','CT art. 1','La obligación tributaria, que es de derecho público, es el vínculo entre el acreedor y el deudor tributario, establecido por ley, que tiene por objeto el cumplimiento de la prestación tributaria, siendo exigible coactivamente.'],
['p','Nace cuando se realiza el <strong>hecho generador</strong> previsto en la ley (art. 2) y es exigible, cuando la determina el deudor, desde el día siguiente al vencimiento del plazo fijado por ley o reglamento (art. 3).'],
['h','Sujetos'],
['tabla',['Sujeto','Quién es'],[
['Acreedor (art. 4)','El Gobierno Central, los gobiernos regionales y locales, y las entidades de derecho público a las que la ley asigne esa calidad'],
['Contribuyente (art. 8)','Quien realiza o respecto del cual se produce el hecho generador'],
['Responsable (art. 9)','Quien, sin ser contribuyente, debe cumplir la obligación atribuida a este'],
['Agentes de retención y percepción (art. 10)','Quienes por su actividad pueden retener o percibir el tributo y entregarlo al acreedor'],
['Responsables solidarios (art. 16)','Entre otros, los representantes legales que, por dolo, negligencia grave o abuso de facultades, dejan de pagar las deudas tributarias de la empresa']]],
['h','Extinción (art. 27)'],
['p','La obligación tributaria se extingue por: pago, compensación, condonación (solo por norma con rango de ley), consolidación, resolución de la Administración sobre deudas de cobranza dudosa o de recuperación onerosa, y otros medios que establezcan leyes especiales.'],
['ej','Agente de retención','Una empresa paga el sueldo de S/ 8,000 a un trabajador. La empresa no es la contribuyente del Impuesto a la Renta de quinta categoría (lo es el trabajador), pero la ley la obliga a retener el impuesto de la remuneración y pagarlo a la SUNAT. Si retiene y no paga, responde ella, y además puede cometer delito.'],
['clave',['Impuesto: sin contraprestación directa. Contribución: beneficio de obra o actividad estatal. Tasa: servicio público individualizado.','La obligación nace con el hecho generador (art. 2).','Contribuyente realiza el hecho; responsable paga por otro.','Representantes legales: solidarios si actúan con dolo, negligencia grave o abuso.']]
],
g:[['Impuesto','Tributo cuyo pago no origina una contraprestación directa del Estado.'],['Tasa','Tributo cuyo hecho generador es la prestación efectiva de un servicio público individualizado.'],['Arbitrio','Tasa por la prestación o mantenimiento de un servicio público, como limpieza o serenazgo.'],['Hecho generador','Supuesto previsto en la ley cuya realización origina la obligación tributaria.'],['Agente de retención','Sujeto obligado a retener el tributo de un pago y entregarlo al fisco.'],['Responsable solidario','Sujeto que responde junto con el contribuyente por la deuda tributaria.']],
e:[
{d:1,t:'om',q:'El pago por la licencia de funcionamiento de un local comercial es:',o:['Un impuesto','Una contribución','Una tasa','Un precio público contractual'],a:2,x:'Las licencias son una especie de tasa (Norma II).'},
{d:1,t:'vf',q:'La obligación tributaria nace cuando la SUNAT notifica una resolución de determinación.',a:false,x:'Falso. Nace cuando se realiza el hecho generador (art. 2).'},
{d:1,t:'om',q:'Quien realiza el hecho generador del tributo es el:',o:['Responsable','Contribuyente','Agente de percepción','Acreedor'],a:1,x:'Art. 8.'},
{d:2,t:'caso',c:'El gerente general de una empresa decide no pagar el IGV durante dos años para usar ese dinero en otras inversiones, sabiendo que la empresa debía pagarlo.',q:'¿Puede la SUNAT cobrarle personalmente al gerente?',o:['No, solo a la empresa','Sí, como responsable solidario por haber actuado con dolo (art. 16)','Solo si es accionista','Solo si la empresa quiebra'],a:1,x:'Los representantes legales responden solidariamente si dejan de pagar por dolo, negligencia grave o abuso de facultades.'},
{d:2,t:'caso',c:'Un contribuyente tiene un saldo a favor de S/ 5,000 de Impuesto a la Renta reconocido por SUNAT y debe S/ 3,000 de IGV del mismo período, ambos administrados por la SUNAT.',q:'¿Qué forma de extinción puede usar?',o:['Condonación','Compensación','Consolidación','Prescripción'],a:1,x:'Los créditos y deudas tributarias administrados por el mismo órgano pueden compensarse, según las reglas del art. 40.'},
{d:3,t:'abierta',q:'Explica por qué los arbitrios municipales son tasas y no impuestos, y qué consecuencias jurídicas tiene esa calificación.',m:'<p>Los arbitrios son tasas porque su hecho generador es la prestación o el mantenimiento de un servicio público (limpieza pública, parques y jardines, serenazgo) individualizado en el contribuyente (Norma II). En un impuesto, en cambio, no hay contraprestación directa.</p><p><strong>Consecuencias:</strong> 1) la municipalidad puede crearlos por ordenanza (art. 74 de la Constitución), mientras que no puede crear impuestos; 2) su monto debe guardar relación con el costo del servicio y distribuirse con criterios vinculados al uso o beneficio del servicio, no por la capacidad contributiva general (STC 0041-2004-AI/TC); 3) si el servicio no se presta efectivamente, el cobro carece de sustento; 4) la ordenanza distrital requiere ratificación provincial para su vigencia.</p>',k:['Califica correctamente como tasa','Explica la diferencia con el impuesto','Menciona el límite del costo del servicio y los criterios de distribución','Menciona la ratificación provincial o la competencia municipal']}
]},
{id:'tr-procedimientos',n:'Fiscalización, procedimiento contencioso y prescripción',nv:3,
r:'Facultades de la SUNAT, reclamación y apelación ante el Tribunal Fiscal, plazos de prescripción e infracciones tributarias.',
normas:['CT arts. 43 – 49','CT arts. 59 – 62-A','CT arts. 124 – 157','CT arts. 164 – 192'],
b:[
['h','Fiscalización'],
['p','La SUNAT tiene facultad de fiscalización (art. 62): puede exigir la exhibición de libros y documentos, requerir información a terceros, realizar inspecciones, solicitar la comparecencia de contribuyentes y adoptar medidas cautelares previas. El procedimiento de fiscalización definitiva debe realizarse, por regla, en el plazo de <strong>un año</strong> (art. 62-A). Concluye con la emisión de resoluciones de determinación, resoluciones de multa u órdenes de pago.'],
['h','Procedimiento contencioso tributario'],
['pasos',['<strong>Reclamación</strong> ante la propia Administración (SUNAT o municipalidad), dentro de <strong>20 días hábiles</strong> desde la notificación del acto (art. 137). Fuera de plazo, debe pagarse o afianzarse la deuda. La Administración debe resolver en 9 meses (art. 142).','<strong>Apelación</strong> ante el <strong>Tribunal Fiscal</strong>, dentro de <strong>15 días hábiles</strong> desde la notificación de la resolución de reclamación (art. 146). El Tribunal Fiscal resuelve en 12 meses (art. 150). Si la Administración no resuelve la reclamación en el plazo, el contribuyente puede apelar la resolución ficta denegatoria.','<strong>Demanda contencioso-administrativa</strong> ante el Poder Judicial contra la resolución del Tribunal Fiscal, dentro de <strong>tres meses</strong> (art. 157).']],
['p','La <strong>queja</strong> (art. 155) procede contra actuaciones o procedimientos que afecten directamente o infrinjan lo establecido en el Código, distintos a los que se impugnan en el contencioso. El Tribunal Fiscal puede dictar <strong>jurisprudencia de observancia obligatoria</strong> (art. 154).'],
['h','Prescripción (art. 43)'],
['tabla',['Supuesto','Plazo'],[
['Regla general (determinar, exigir el pago o aplicar sanciones)','4 años'],
['Si el contribuyente no presentó la declaración respectiva','6 años'],
['Si el agente de retención o percepción no pagó el tributo retenido o percibido','10 años']]],
['p','El plazo se computa, por regla, desde el 1 de enero del año siguiente a la fecha de vencimiento de la obligación (art. 44), y puede interrumpirse o suspenderse en los supuestos de los arts. 45 y 46. La prescripción solo puede declararse a pedido del deudor tributario (art. 47).'],
['h','Infracciones y sanciones'],
['p','Las infracciones tributarias (art. 164 y ss.) se clasifican según la obligación incumplida: inscribirse en registros, emitir comprobantes de pago, llevar libros, presentar declaraciones, permitir el control de la Administración y pagar tributos. Las sanciones pueden ser multa, comiso de bienes, internamiento temporal de vehículos y cierre temporal del establecimiento. Existen regímenes de gradualidad que reducen la multa si el infractor subsana voluntariamente.'],
['ej','No emitir boleta','Un inspector de SUNAT compra en una bodega de Huancayo y no le entregan boleta. Es infracción por no otorgar comprobante de pago (art. 174 inc. 1). La sanción puede ser una multa o el cierre temporal del establecimiento, según la tabla y el régimen de gradualidad aplicable.'],
['clave',['Fiscalización definitiva: 1 año.','Reclamación: 20 días hábiles. Apelación al Tribunal Fiscal: 15 días hábiles. Demanda judicial: 3 meses.','Prescripción: 4 / 6 / 10 años; solo a pedido del deudor.','Sanciones: multa, comiso, internamiento, cierre.']]
],
g:[['Resolución de determinación','Acto por el que la Administración establece la existencia y cuantía de la deuda tributaria.'],['Orden de pago','Acto que exige el pago de una deuda autodeclarada o evidente.'],['Reclamación','Primer recurso del procedimiento contencioso tributario, ante la propia Administración.'],['Tribunal Fiscal','Órgano que resuelve en última instancia administrativa las controversias tributarias.'],['Resolución ficta denegatoria','Ficción por la cual la falta de respuesta en plazo permite al contribuyente impugnar ante la siguiente instancia.'],['Régimen de gradualidad','Reglas que reducen las multas si el infractor subsana o paga voluntariamente.']],
e:[
{d:1,t:'om',q:'¿Cuál es el plazo para interponer un recurso de reclamación contra una resolución de determinación?',o:['10 días hábiles','15 días hábiles','20 días hábiles','30 días hábiles'],a:2,x:'Art. 137 del Código Tributario.'},
{d:1,t:'vf',q:'La SUNAT puede declarar de oficio la prescripción de una deuda tributaria.',a:false,x:'Falso. Solo puede declararse a pedido del deudor tributario (art. 47).'},
{d:1,t:'om',q:'¿Ante quién se apela una resolución que resuelve una reclamación de la SUNAT?',o:['El juez civil','El Tribunal Fiscal','El Congreso','El Tribunal Constitucional'],a:1,x:'Art. 143 y siguientes.'},
{d:2,t:'caso',c:'Un contribuyente nunca presentó la declaración anual del Impuesto a la Renta de 2018, que vencía en marzo de 2019. SUNAT lo fiscaliza en 2024.',q:'¿Prescribió la facultad de la SUNAT?',o:['Sí, a los 4 años','No: al no haber presentado la declaración, el plazo es de 6 años, contado desde el 1 de enero de 2020','Sí, porque pasaron 5 años','No, nunca prescribe'],a:1,x:'El plazo es de seis años desde el 1 de enero de 2020: vence el 1 de enero de 2026.'},
{d:2,t:'caso',c:'Una empresa presenta su reclamación contra una multa 35 días hábiles después de notificada.',q:'¿Qué consecuencia tiene?',o:['Se admite igual','Es extemporánea: para que se admita debe acreditar el pago o afianzar la deuda','Se convierte en apelación','Se archiva sin más'],a:1,x:'Fuera del plazo de 20 días hábiles, la reclamación requiere pago o garantía.'},
{d:3,t:'caso',c:'Una empresa retuvo el Impuesto a la Renta de quinta categoría a sus trabajadores en 2014, pero nunca lo pagó a la SUNAT. La SUNAT pretende cobrar en 2024.',q:'¿Puede hacerlo?',o:['No, prescribió a los 4 años','No, prescribió a los 6 años','Sí: el plazo es de 10 años para agentes de retención que no pagaron lo retenido','Sí, porque nunca prescribe'],a:2,x:'Art. 43: diez años cuando el agente de retención no pagó el tributo retenido; computado desde el 1 de enero siguiente al vencimiento, en 2024 aún no habría vencido.'},
{d:3,t:'orden',q:'Ordena el camino que sigue un contribuyente para cuestionar una resolución de determinación de la SUNAT.',o:['Notificación de la resolución de determinación','Recurso de reclamación ante la SUNAT','Resolución de intendencia que resuelve la reclamación','Recurso de apelación ante el Tribunal Fiscal','Resolución del Tribunal Fiscal','Demanda contencioso-administrativa ante el Poder Judicial'],x:'Es la ruta del procedimiento contencioso tributario y su revisión judicial.'}
]},
{id:'tr-impuestos',n:'Principales impuestos y regímenes',nv:2,
r:'Impuesto a la Renta y sus categorías, IGV, impuestos municipales, regímenes para mypes y la norma antielusiva.',
normas:['TUO LIR','TUO Ley del IGV','TUO Ley de Tributación Municipal','CT Norma XVI'],
b:[
['h','Impuesto a la Renta'],
['tabla',['Categoría','Fuente','Ejemplo'],[
['Primera','Arrendamiento y otras rentas de predios y bienes','Alquiler de un departamento'],
['Segunda','Otras rentas de capital','Intereses, regalías, dividendos, ganancia por venta de acciones'],
['Tercera','Rentas empresariales','Utilidades de una empresa o de una persona con negocio'],
['Cuarta','Trabajo independiente','Honorarios de un abogado con recibo por honorarios'],
['Quinta','Trabajo dependiente','Sueldo de un trabajador en planilla']]],
['h','Impuesto General a las Ventas'],
['p','Grava la venta de bienes muebles en el país, la prestación o utilización de servicios en el país, los contratos de construcción, la primera venta de inmuebles por constructores y la importación de bienes. La tasa total es de <strong>18 %</strong> (16 % de IGV más 2 % de Impuesto de Promoción Municipal), salvo regímenes especiales previstos por ley. Funciona con el sistema de <strong>débito y crédito fiscal</strong>: la empresa paga la diferencia entre el IGV de sus ventas y el de sus compras.'],
['ej','Débito menos crédito','Una ferretería vende en un mes S/ 100,000 más IGV (débito fiscal: S/ 18,000) y compra mercadería por S/ 60,000 más IGV (crédito fiscal: S/ 10,800). Paga a la SUNAT S/ 7,200.'],
['h','Impuestos municipales'],
['tabla',['Impuesto','Grava','Nota'],[
['Predial','El valor de los predios urbanos y rústicos','Anual; lo administra la municipalidad distrital'],
['Alcabala','Las transferencias de inmuebles, a cargo del comprador','Tasa del 3 %; las primeras 10 UIT del valor del inmueble están inafectas'],
['Vehicular','La propiedad de vehículos con antigüedad no mayor de tres años desde su primera inscripción','Lo administra la municipalidad provincial']]],
['h','Regímenes para empresas'],
['lista',['<strong>Nuevo RUS:</strong> pequeños negocios de personas naturales; pagan una cuota fija mensual; solo emiten boletas.','<strong>Régimen Especial (RER):</strong> pago mensual sobre ingresos netos, con límites de ingresos y actividades.','<strong>Régimen MYPE Tributario:</strong> para micro y pequeñas empresas con ingresos dentro de los límites legales; tasas progresivas del Impuesto a la Renta.','<strong>Régimen General:</strong> sin límites de ingresos.']],
['h','Norma XVI: la cláusula antielusiva'],
['p','La Norma XVI permite a la SUNAT, al determinar la obligación, considerar los actos, situaciones y relaciones económicas que efectivamente realicen los deudores (<strong>calificación económica</strong>). Si se detectan actos <strong>artificiosos o impropios</strong> realizados con el propósito principal de evitar el tributo, la SUNAT puede exigir la deuda que corresponda a los actos usuales o propios. Su aplicación requiere un procedimiento especial y garantías para el contribuyente.'],
['clave',['Renta: cinco categorías según la fuente.','IGV 18 %: débito menos crédito fiscal.','Alcabala: 3 % a cargo del comprador; primeras 10 UIT inafectas.','Norma XVI: calificación económica y lucha contra la elusión.']]
],
g:[['Crédito fiscal','IGV pagado en las adquisiciones que puede deducirse del IGV de las ventas.'],['Débito fiscal','IGV que se genera en las ventas.'],['Alcabala','Impuesto municipal a la transferencia de inmuebles.'],['Elusión tributaria','Uso de formas jurídicas artificiosas para evitar o reducir tributos sin infringir formalmente la ley.'],['Evasión tributaria','Incumplimiento ilícito de la obligación tributaria, por ejemplo, ocultando ingresos.']],
e:[
{d:1,t:'om',q:'El sueldo de un trabajador en planilla genera renta de:',o:['Primera categoría','Cuarta categoría','Quinta categoría','Tercera categoría'],a:2,x:'Rentas del trabajo dependiente: quinta categoría.'},
{d:1,t:'vf',q:'La tasa total del IGV en el régimen general es de 18 %, que incluye el Impuesto de Promoción Municipal.',a:true,x:'Verdadero: 16 % de IGV y 2 % de IPM.'},
{d:1,t:'om',q:'¿Quién paga el impuesto de alcabala en la compraventa de un inmueble?',o:['El vendedor','El comprador','Ambos por mitades','El notario'],a:1,x:'El sujeto pasivo es el comprador o adquirente.'},
{d:2,t:'caso',c:'Una empresa vende en un mes S/ 50,000 más IGV y compra insumos por S/ 30,000 más IGV, con facturas válidas.',q:'¿Cuánto IGV debe pagar a la SUNAT?',o:['S/ 9,000','S/ 5,400','S/ 3,600','S/ 14,400'],a:2,x:'Débito: S/ 9,000. Crédito: S/ 5,400. Diferencia: S/ 3,600.'},
{d:2,t:'caso',c:'Un abogado independiente emite recibos por honorarios por sus servicios a varias empresas.',q:'¿Qué categoría de renta genera?',o:['Tercera','Cuarta','Quinta','Segunda'],a:1,x:'El trabajo independiente genera renta de cuarta categoría.'},
{d:3,t:'abierta',q:'Distingue elusión, evasión y planificación tributaria lícita, con un ejemplo de cada una, y explica el rol de la Norma XVI.',m:'<p><strong>Planificación lícita (economía de opción):</strong> elegir entre alternativas legales la menos gravosa. Ejemplo: una empresa que se acoge al Régimen MYPE Tributario porque cumple los requisitos.</p><p><strong>Elusión:</strong> usar formas jurídicas artificiosas, que no responden a la realidad económica, con el propósito principal de evitar el tributo, sin violar formalmente la ley. Ejemplo: fraccionar artificialmente una empresa en varias pequeñas, sin sustancia económica, para seguir en un régimen preferencial.</p><p><strong>Evasión:</strong> incumplir ilícitamente la obligación. Ejemplo: no declarar ventas u ocultar ingresos; puede ser delito de defraudación tributaria.</p><p><strong>Norma XVI:</strong> permite a la SUNAT recalificar los actos artificiosos e impropios según su sustancia económica y exigir el tributo que habría correspondido a los actos usuales, con garantías procedimentales. No se aplica a la planificación lícita.</p>',k:['Define y ejemplifica la planificación lícita','Define y ejemplifica la elusión','Define y ejemplifica la evasión','Explica el rol de la Norma XVI']}
]}
]});
