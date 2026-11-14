/* Contenido del curso — m7 · Derecho laboral aplicado
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
 id:'m7', nivel:'Avanzado', titulo:'Derecho laboral aplicado',
 resumen:'El contrato de trabajo y su desnaturalización, jornada y descansos, suspensión y extinción del vínculo, seguridad y salud en el trabajo, la inspección de SUNAFIL y los regímenes especiales, la intermediación y la tercerización.',
 temas:[
 {
  id:'m7t1', titulo:'El contrato de trabajo: elementos, modalidades y primacía de la realidad', min:27,
  cont:`Un contador que lleva planillas sin entender el contrato de trabajo está calculando sobre una base que puede desmoronarse. La mayoría de los juicios laborales no discuten cuánto se pagó: discuten **qué vínculo existía**. Y de esa calificación depende todo lo demás.

# Los tres elementos esenciales
$ CONTRATO DE TRABAJO = prestación personal + remuneración + SUBORDINACIÓN

|Elemento|Qué significa|
|**Prestación personal**|El trabajador presta el servicio **él mismo**: no puede delegarlo ni hacerse reemplazar libremente|
|**Remuneración**|Recibe una contraprestación por sus servicios|
|**Subordinación**|El empleador puede **dirigir, fiscalizar y sancionar**. Es el elemento determinante|

Los dos primeros existen también en un contrato de locación de servicios: un abogado externo presta servicios personalmente y cobra por ellos. Lo que convierte la relación en laboral es la **subordinación**, y por eso es el elemento que se discute en todo proceso.

# La presunción de laboralidad
$ Art. 4 de la LPCL: en toda prestación personal de servicios remunerados y subordinados
$ se presume la existencia de un contrato de trabajo A PLAZO INDETERMINADO

La presunción invierte la carga de la prueba. Si se acredita que hubo prestación personal remunerada y subordinada, el vínculo laboral se presume, y es el **empleador** quien debe probar que no lo era. En la práctica, eso significa que el empleador llega al proceso con una desventaja estructural, y que su única defensa real es la documentación que construyó mientras la relación existía.

# La primacía de la realidad
$ Principio: ante la discordancia entre lo que ocurre en los HECHOS
$ y lo que surge de los DOCUMENTOS, prevalecen los HECHOS

Es el principio más importante del derecho laboral peruano para la práctica contable. Un recibo por honorarios, un contrato de locación de servicios o una factura de una empresa no convierten en no laboral una relación que en los hechos es subordinada. El juez y el inspector miran cómo se trabajaba, no cómo se documentaba.

**Los indicios de subordinación que se buscan:**
|Indicio|Cómo se prueba|
|**Horario fijo** de ingreso y salida|Registro de asistencia, marcación, correos, mensajes de grupo|
|**Lugar de trabajo** asignado por la empresa|Escritorio, fotografías, testigos|
|**Órdenes y directivas** sobre cómo hacer el trabajo|Correos, chats, manuales, actas de reunión|
|**Sujeción al reglamento interno** y al régimen disciplinario|Memorandos, llamadas de atención|
|**Uso de bienes de la empresa**|Equipos, uniforme, correo corporativo, tarjeta de acceso|
|**Exclusividad** o dedicación principal|Única fuente de ingresos, sin otros clientes|
|**Integración en la organización**|Figura en el organigrama, en el directorio interno, en la intranet|
|**Permanencia y continuidad**|Años de servicio ininterrumpido, horario estable|

! Si cinco de estos ocho indicios están presentes, la relación es laboral, por más que exista un contrato de locación de servicios firmado. El contrato será declarado **simulado** y la empresa pagará todos los beneficios de los años no prescritos, más los aportes, las multas y los intereses.

> El caso más común en el Perú: el "consultor" que emite recibo por honorarios todos los meses por el mismo importe, va todos los días a la oficina, tiene correo corporativo, asiste a las reuniones del área y lleva cinco años así. Jurídicamente es un trabajador de quinta categoría, y la contingencia acumulada supera largamente el ahorro obtenido.

# El contrato a plazo indeterminado es la regla
Puede celebrarse **verbalmente o por escrito**. No requiere formalidad, no requiere registro y no requiere causa: es el contrato por defecto. Toda otra modalidad es una excepción que debe justificarse.

# Los contratos sujetos a modalidad
Son excepciones y por eso tienen requisitos estrictos. Se agrupan en tres categorías:

|Categoría|Modalidad|Plazo máximo|
|**Naturaleza temporal**|Por inicio o incremento de actividad|**3 años**|
||Por necesidades del mercado|**5 años**|
||Por reconversión empresarial|**2 años**|
|**Naturaleza accidental**|Ocasional|**6 meses** al año|
||De suplencia|Lo que dure la suplencia|
||De emergencia|Lo que dure la emergencia|
|**Para obra o servicio**|Para obra determinada o servicio específico|La duración necesaria, con el límite de razonabilidad que ha fijado la jurisprudencia|
||Intermitente|Sin plazo fijo; se activa según las necesidades|
||De temporada|Por la temporada correspondiente|

$ Plazo máximo acumulado de contratación modal con un mismo trabajador: 5 AÑOS

**Los dos requisitos indispensables:**
1. **Por escrito**, siempre. Un contrato modal verbal es, por definición, a plazo indeterminado.
2. **Con causa objetiva expresa**: el contrato debe decir **por qué** se usa esa modalidad, con hechos concretos y verificables.

! La **causa objetiva genérica es el defecto más frecuente y el más fatal**. Escribir "por necesidades del mercado" sin explicar qué incremento de demanda ocurrió, cuándo, por qué es transitorio y qué lo sustenta, equivale a no poner causa. En un proceso, un contrato con causa genérica se declara desnaturalizado casi sin discusión.

# La desnaturalización (art. 77 de la LPCL)
El contrato modal se convierte en **contrato a plazo indeterminado** cuando:

|Causal|Supuesto|
|**a)**|El trabajador **continúa laborando** después de la fecha de vencimiento del contrato o de sus prórrogas|
|**b)**|Se excede el **plazo máximo** de la modalidad|
|**c)**|En la **suplencia**, el titular se reincorpora y el suplente continúa laborando|
|**d)**|El trabajador demuestra la existencia de **simulación o fraude** a las normas laborales|

> La causal **a)** es la que más desnaturaliza contratos en el Perú, y por una razón banal: nadie renovó el contrato a tiempo. Un trabajador cuyo contrato venció el 31 de marzo y que siguió trabajando el 1 de abril sin contrato nuevo firmado pasó, ese día, a plazo indeterminado. El control es un calendario de vencimientos con alerta de quince días. Cuesta nada y evita una contingencia completa.

**El efecto de la desnaturalización:** el trabajador queda con contrato a plazo indeterminado, lo que significa que solo puede ser despedido por causa justa, y si se le despide por "vencimiento de contrato" el despido es **arbitrario**, con derecho a indemnización o, en ciertos supuestos, a reposición.

# El periodo de prueba
|Tipo de trabajador|Periodo de prueba|
|Trabajador común|**3 meses**|
|Trabajador de **confianza**|Hasta **6 meses**, por acuerdo **escrito**|
|Personal de **dirección**|Hasta **12 meses**, por acuerdo **escrito**|

$ Durante el periodo de prueba el trabajador no tiene protección contra el despido arbitrario
$ La ampliación más allá de 3 meses debe constar POR ESCRITO, antes o al inicio del vínculo

# Dirección, confianza y trabajador común (art. 43 de la LPCL)
|Categoría|Definición|Consecuencias|
|**Personal de dirección**|Ejerce la representación general del empleador, comparte funciones de administración y control, o de cuya actividad depende el resultado de la actividad empresarial|Exceptuado de la jornada máxima; periodo de prueba de hasta 12 meses; no le corresponde la indemnización por vacaciones no gozadas|
|**Trabajador de confianza**|Labora en contacto directo con el empleador o con el personal de dirección, con acceso a información reservada o que colabora en decisiones empresariales|Periodo de prueba de hasta 6 meses; reglas especiales en materia de reposición|
|**Trabajador común**|Todos los demás|Régimen completo de protección|

! La calificación **no depende del nombre del puesto** sino de las funciones reales, y debe estar **consignada por escrito** y comunicada al trabajador. Llamar "gerente" a quien no tiene facultades de representación ni decide nada no lo convierte en personal de dirección, y pretender excluirlo de la jornada máxima sobre esa base genera un pasivo por horas extras.

# El contrato a tiempo parcial
$ Jornada menor a 4 horas diarias en promedio semanal = contrato a tiempo parcial

|Derecho|¿Le corresponde?|
|RMV proporcional a las horas|Sí|
|EsSalud y aportes previsionales|Sí|
|Gratificaciones|Sí|
|Descanso semanal y feriados|Sí|
|**Vacaciones**|**No** (requiere jornada mínima de 4 horas)|
|**CTS**|**No**|
|**Indemnización por despido arbitrario**|**No**|

El contrato a tiempo parcial debe celebrarse **por escrito** y registrarse conforme a las reglas aplicables. Y el cálculo del promedio importa: si la jornada semanal dividida entre los días laborados alcanza o supera las cuatro horas, el trabajador tiene todos los derechos, y una planilla que lo trató como parcial acumuló pasivo.

# Las modalidades formativas laborales (Ley 28518)
No generan vínculo laboral, pero tienen reglas estrictas:

|Modalidad|Para quién|
|Prácticas **preprofesionales**|Estudiantes que aún cursan estudios|
|Prácticas **profesionales**|Egresados, dentro de los 12 meses siguientes al egreso|
|**Capacitación laboral juvenil**|Jóvenes sin estudios concluidos o que no los iniciaron|
|**Pasantía**|Estudiantes de los últimos grados de educación|
|**Actualización para la reinserción laboral**|Desempleados de 45 a 65 años|

|Obligación|Detalle|
|**Convenio por escrito**|Con el plan de aprendizaje y el objetivo formativo|
|**Subvención económica**|No menor a la RMV cuando la jornada es completa, proporcional si es menor|
|**Media subvención adicional**|Cada seis meses de duración continua, equivalente a la gratificación|
|**Seguro**|EsSalud o un seguro privado de salud|
|**Límite**|Hasta el **20%** del total de personal de la empresa|
|**Registro**|En el T-Registro como personal en formación|

! La modalidad formativa que se usa para cubrir un puesto permanente, sin plan de aprendizaje real, sin tutor y sin relación con los estudios del practicante, se **desnaturaliza** y se convierte en un contrato de trabajo a plazo indeterminado, con todos los beneficios retroactivos.

# El teletrabajo
La Ley 31572 y su reglamento regulan el teletrabajo, con reglas sobre la compensación de equipos y servicios, el derecho a la **desconexión digital**, la reversibilidad de la modalidad y la evaluación de riesgos en el domicilio. En 2026 el reglamento fue modificado por el **D.S. 009-2026-TR**, que precisó los deberes de confidencialidad, la evaluación de riesgos y los límites al monitoreo de las actividades personales del teletrabajador.

$ Regla práctica: el teletrabajo cambia el LUGAR de la prestación, no el régimen
$ El teletrabajador tiene exactamente los mismos derechos que el trabajador presencial

# La lista de verificación de contratos
1. ¿Cada trabajador tiene **contrato escrito** si su modalidad lo exige?
2. ¿Los contratos modales tienen **causa objetiva concreta y verificable**, no genérica?
3. ¿Existe un **calendario de vencimientos** con alerta anticipada?
4. ¿Algún trabajador **sigue laborando** con contrato vencido?
5. ¿Se respeta el **plazo máximo** de cinco años de contratación modal?
6. ¿Las calificaciones de **dirección y confianza** están por escrito y corresponden a las funciones reales?
7. ¿Los **practicantes** tienen convenio, plan de aprendizaje, tutor y están dentro del 20%?
8. ¿Hay personas emitiendo **recibo por honorarios** que en los hechos son trabajadores?

La pregunta 8 es la que más pasivo revela, y la que el contador está en mejor posición de detectar, porque tiene los recibos por honorarios delante todos los meses.`,
  claves:['El contrato de trabajo tiene tres elementos: prestación personal, remuneración y subordinación; la subordinación es la determinante.','La presunción de laboralidad invierte la carga de la prueba: el empleador debe probar que el vínculo no era laboral.','Por la primacía de la realidad, los hechos prevalecen sobre los documentos: un recibo por honorarios no evita la recalificación.','El contrato modal exige forma escrita y causa objetiva concreta; sin ellas, o si el trabajador continúa tras el vencimiento, se desnaturaliza a plazo indeterminado.','El plazo máximo acumulado de contratación modal con un mismo trabajador es de cinco años.'],
  preg:[
   {p:'¿Por qué la subordinación es el elemento determinante del contrato de trabajo?',
    r:'Porque es el único de los tres que no está presente en una relación civil. Un profesional independiente también presta servicios personalmente y también recibe una contraprestación: un abogado externo, un diseñador, un consultor. Lo que distingue al trabajador es que el empleador puede **dirigir** cómo hace el trabajo, **fiscalizar** su cumplimiento y **sancionar** su incumplimiento. Esa facultad de dirección es la que justifica todo el régimen protector: el trabajador no decide sus condiciones, las recibe, y por eso la ley le reconoce derechos irrenunciables. En la práctica, toda la discusión de un proceso laboral gira sobre si había subordinación, y se resuelve con indicios: horario, órdenes, lugar asignado, uso de bienes de la empresa, integración en la organización.'},
   {p:'¿Qué significa la primacía de la realidad y por qué un contrato firmado no protege al empleador?',
    r:'Significa que cuando lo que ocurre en los hechos difiere de lo que dicen los documentos, prevalecen los hechos. El fundamento es que los derechos laborales son irrenunciables: si bastara un documento para excluir a alguien del régimen laboral, la protección sería ilusoria, porque quien necesita el trabajo firma lo que se le pida. Por eso un contrato de locación de servicios o un recibo por honorarios no impiden la recalificación: son prueba de la **forma**, y el juez examina el **fondo**. La consecuencia práctica para una empresa es que su defensa no está en el papel que firmó sino en la realidad que puede acreditar: que el prestador tenía otros clientes, organizaba su trabajo, no tenía horario, usaba sus propios medios y era retribuido por resultado.'},
   {p:'¿Por qué una causa objetiva genérica en un contrato modal es tan peligrosa?',
    r:'Porque el contrato modal es una **excepción** al principio de que los contratos son a plazo indeterminado, y toda excepción debe justificarse. La causa objetiva es precisamente esa justificación: debe explicar qué circunstancia concreta y transitoria hace necesaria una contratación temporal. Escribir "por necesidades del mercado" sin describir qué incremento de demanda ocurrió, cuándo empezó, por qué es pasajero y con qué datos se sustenta equivale a no haber puesto causa alguna. En un proceso, el juez declara la **simulación** y el contrato se convierte en indeterminado desde su inicio, de modo que el cese por "vencimiento de contrato" pasa a ser un despido arbitrario. La causa objetiva debe escribirse como si fuera a leerla un juez, porque probablemente la lea.'},
   {p:'Un trabajador con contrato modal venció el 31 de marzo y siguió trabajando el 1 de abril. ¿Qué ocurrió?',
    r:'Su contrato se **desnaturalizó** y pasó a ser a plazo indeterminado, por la causal a) del artículo 77 de la LPCL: continuar laborando después de la fecha de vencimiento. No importa que la intención fuera renovarlo, ni que se firme un contrato nuevo con fecha anterior, porque eso sería un documento falso que agrava el problema. Y el efecto es definitivo: desde ese momento el trabajador solo puede ser despedido por causa justa, y cesarlo por vencimiento de contrato sería un despido arbitrario con derecho a indemnización. Es la desnaturalización más frecuente del país y la más fácil de evitar: un calendario de vencimientos con alerta de quince días, revisado cada mes, la elimina por completo.'},
   {p:'¿Qué riesgo corre una empresa que tiene "consultores" con recibo por honorarios que trabajan como empleados?',
    r:'El riesgo es la recalificación a quinta categoría con efectos retroactivos en todos los frentes a la vez. En lo **laboral**: gratificaciones, CTS, vacaciones con posible triple remuneración, e indemnización por despido si el vínculo terminó; más las multas de SUNAFIL por no registrar al trabajador en planilla, que es infracción muy grave. En lo **tributario**: aportes a EsSalud omitidos, retenciones de quinta no efectuadas, la infracción del numeral 1 del artículo 178 por declarar cifras falsas, y el riesgo de que el gasto no sea deducible si no cumple los requisitos. En lo **previsional**: aportes no retenidos. Y en lo **personal**: la presunción de dolo o negligencia grave que puede alcanzar al representante legal. El ahorro mensual es modesto; la contingencia acumulada de cuatro años con varias personas puede superar el patrimonio de una empresa pequeña.'}
  ],
  ej:[
   {l:1,t:'mc',p:'¿Cuál de estas situaciones NO es un indicio de subordinación?',
    o:['El prestador tiene horario fijo de ingreso y salida','El prestador recibe instrucciones diarias sobre cómo hacer el trabajo','El prestador emite recibo por honorarios cada mes','El prestador usa el correo corporativo y el uniforme de la empresa'],r:2,
    s:'Emitir recibo por honorarios **no es un indicio de subordinación**: es precisamente lo contrario, un documento que la empresa usa para intentar demostrar que no hay vínculo laboral. Y es irrelevante, porque por la primacía de la realidad los hechos prevalecen sobre los documentos.\n\nLas otras tres sí son indicios fuertes: el horario fijo, las instrucciones sobre el modo de ejecutar el trabajo y el uso de bienes e identidad de la empresa. Un prestador genuinamente independiente organiza su tiempo, decide cómo ejecutar el servicio y usa sus propios medios. La paradoja de este ejercicio es importante: el documento que la empresa cree que la protege es el único elemento de la lista que no prueba nada a su favor.'},
   {l:1,t:'mc',p:'Un contrato por necesidades del mercado puede durar como máximo:',
    o:['3 años','5 años','2 años','6 meses'],r:1,
    s:'**5 años**, que es también el plazo máximo acumulado de contratación modal con un mismo trabajador. Los otros plazos de las opciones corresponden a modalidades distintas: 3 años para el contrato por inicio o incremento de actividad, 2 años para el de reconversión empresarial y 6 meses al año para el ocasional.\n\nY una precisión importante: el plazo máximo de la modalidad es un límite, no un derecho a usarlo. La causa objetiva debe subsistir durante todo el contrato; si el incremento de demanda que justificó la contratación se volvió permanente, el contrato ya no corresponde a esa modalidad aunque el plazo no se haya agotado.'},
   {l:2,t:'ab',p:'Redacta la causa objetiva de un contrato por necesidades del mercado para una empresa comercializadora que necesita dos vendedores adicionales por una campaña escolar, y explica qué documentación debe conservar.',
    s:'**Primero, el contraste. Una causa objetiva mal redactada:**\n\n"El presente contrato se celebra bajo la modalidad por necesidades del mercado, conforme al artículo 58 de la LPCL, debido a un incremento coyuntural de la demanda."\n\nEsto no dice nada verificable: no identifica qué demanda, ni cuánto aumentó, ni por qué es transitoria. En un proceso se declara simulación.\n\n**Una causa objetiva bien redactada:**\n\n"El empleador se dedica a la comercialización al por menor de útiles escolares y de oficina. Sus ventas presentan una concentración estacional verificable: en los meses de enero, febrero y marzo de los tres últimos ejercicios, las ventas representaron el 38%, el 41% y el 39% del total anual respectivamente, frente a un promedio mensual del 8.3% en el resto del año, conforme al detalle del Anexo 1 del presente contrato.\n\nPara la campaña escolar del ejercicio 2027, el empleador proyecta un incremento de ventas del 35% respecto de la campaña anterior, sustentado en la apertura del nuevo local de [dirección] en noviembre de 2026 y en los contratos de suministro suscritos con [dos instituciones educativas], que obran en el Anexo 2.\n\nEse incremento de la demanda es de **naturaleza transitoria y coyuntural**, limitado al periodo de campaña escolar, y excede la capacidad de atención del personal estable del área comercial, compuesto por cuatro vendedores. Por tal razón se requiere la contratación temporal de dos vendedores adicionales, por el plazo del 2 de enero al 31 de marzo de 2027, para las funciones de atención en el local y gestión de pedidos institucionales descritas en el Anexo 3."\n\n**Por qué esta versión resiste:**\n\n| Elemento presente | Función en el proceso |\n|---|---|\n| Datos históricos de ventas por mes, con porcentajes | Prueba objetivamente la estacionalidad |\n| Proyección cuantificada del incremento | Prueba la necesidad concreta, no genérica |\n| Hechos que sustentan la proyección (local nuevo, contratos) | Hace verificable la proyección |\n| Afirmación expresa del carácter **transitorio** | Es el requisito legal de la modalidad |\n| Comparación con la capacidad del personal estable | Explica por qué no basta el personal existente |\n| Plazo definido y funciones descritas | Delimita el contrato |\n| Anexos documentales | Convierte afirmaciones en prueba |\n\n**La documentación que debe conservarse, y debe armarse al momento de contratar, no después:**\n\n1. **Reporte de ventas mensuales de los tres últimos ejercicios**, emitido del sistema contable, que sustente los porcentajes citados.\n2. **Los contratos de suministro** mencionados, con fecha anterior al contrato de trabajo.\n3. **El organigrama y la planilla del área comercial**, que acrediten los cuatro vendedores estables.\n4. **La proyección de ventas de la campaña**, aprobada por la gerencia y fechada.\n5. **Las funciones del puesto** por escrito.\n6. **El contrato firmado por ambas partes antes del inicio de labores**, con sus anexos.\n7. **La liquidación al término del plazo**, con el cese registrado en el T-Registro al día siguiente.\n\n**Los dos errores que anularían todo este trabajo:**\n\n| Error | Consecuencia |\n|---|---|\n| Que los vendedores sigan laborando el 1 de abril | Desnaturalización por el inciso a) del art. 77: contrato a plazo indeterminado |\n| Renovar la misma modalidad campaña tras campaña durante años | La necesidad deja de ser transitoria; corresponde el contrato **intermitente** o **de temporada**, que son las modalidades diseñadas para eso |\n\n**Y la observación profesional:** el segundo error es más común que el primero y más difícil de ver. Una empresa que contrata vendedores "por necesidades del mercado" cada enero durante cinco años no tiene una necesidad transitoria: tiene una actividad estacional permanente. La modalidad correcta es el contrato **de temporada**, que precisamente reconoce el derecho de preferencia del trabajador a ser contratado en la temporada siguiente. Usar la modalidad equivocada durante años construye un pasivo que el cambio a la correcta ya no borra.'},
   {l:2,t:'ab',p:'Una empresa tiene a tres personas con recibo por honorarios: un contador que va dos veces por semana a revisar la contabilidad y tiene otros cinco clientes; un "coordinador de operaciones" que va de lunes a viernes de 8 a 18 horas, tiene correo corporativo y reporta al gerente; y una diseñadora que entrega trabajos por encargo desde su casa, cobra por proyecto y factura también a otras empresas. Califica cada relación.',
    s:'**El análisis se hace caso por caso, con los indicios, nunca por el documento.**\n\n| Indicio | Contador | Coordinador | Diseñadora |\n|---|---|---|---|\n| Horario fijo impuesto | No (dos días, los que acuerda) | **Sí (L-V, 8 a 18)** | No |\n| Órdenes sobre el modo de ejecutar | No (ejerce criterio profesional) | **Sí (reporta al gerente)** | No (entrega resultado) |\n| Lugar asignado por la empresa | Parcial | **Sí** | No (su casa) |\n| Uso de bienes e identidad de la empresa | No | **Sí (correo corporativo)** | No |\n| Exclusividad / dedicación principal | No (cinco clientes más) | **Sí** | No (otros clientes) |\n| Integración en la organización | No | **Sí (cargo, reporta, en el organigrama)** | No |\n| Retribución | Por servicio | **Monto fijo mensual** | Por proyecto |\n| Medios propios | Sí | No | Sí |\n\n**Calificación:**\n\n| Prestador | Calificación | Fundamento |\n|---|---|---|\n| **Contador** | **Locación de servicios genuina** (cuarta categoría) | Pluralidad de clientes, autonomía técnica, sin horario impuesto, medios propios, retribución por servicio. La asistencia dos días por semana no crea subordinación: responde a la naturaleza del servicio |\n| **Coordinador de operaciones** | **Relación laboral encubierta**: es trabajador de **quinta categoría** | Ocho de ocho indicios presentes. El nombre del cargo, el horario completo, la línea de reporte, el correo corporativo y el monto fijo mensual configuran subordinación plena. El recibo por honorarios es simulación |\n| **Diseñadora** | **Locación de servicios genuina** (cuarta categoría) | Trabaja desde su domicilio, cobra por proyecto, tiene otros clientes, usa sus propios medios y entrega un resultado sin sujeción a horario ni a dirección sobre el modo |\n\n**Cuantificación del caso del coordinador.** Supongamos un honorario de S/ 5,000 mensuales durante tres años:\n\n| Concepto omitido | Cálculo | Importe |\n|---|---|---|\n| Gratificaciones (2 al año × 3 años) | 5,000 × 6 | 30,000 |\n| Bonificación extraordinaria 9% | 30,000 × 9% | 2,700 |\n| CTS (3 años, base con 1/6 de gratificación) | ~5,833 × 3 | 17,500 |\n| Vacaciones no gozadas: riesgo de triple remuneración por periodos vencidos | hasta 5,000 × 2 × 2 periodos | 20,000 |\n| EsSalud 9% (36 meses) | 180,000 × 9% | 16,200 |\n| Aportes previsionales no retenidos | 180,000 × 13% | 23,400 |\n| **Pasivo aproximado** | | **~109,800** |\n\nMás: la **retención de quinta** que debió efectuarse, las **multas de SUNAFIL** por no registrar al trabajador en planilla (infracción muy grave), las **multas de SUNAT** por declarar cifras falsas, los **intereses** de ambos frentes y, si la relación terminó, la **indemnización por despido arbitrario**.\n\n**El plan de acción, en cinco pasos:**\n\n1. **Incorporar al coordinador a la planilla de inmediato**, con alta en el T-Registro el mismo día. Esto detiene el crecimiento del pasivo y, lo más importante, le da cobertura de EsSalud y de SCTR desde hoy.\n2. **Cuantificar el pasivo** de los periodos no prescritos, con asesoría legal laboral para la estrategia de regularización.\n3. **Regularizar el frente tributario con subsanación voluntaria**, antes de cualquier notificación, para acceder a la rebaja del 95% en la multa del 178.1.\n4. **Documentar la independencia del contador y de la diseñadora**, porque un inspector que encuentre un caso encubierto revisará los demás: contratos de locación con entregables definidos, evidencia de otros clientes, ausencia de horario, uso de medios propios, retribución por resultado.\n5. **Registrar a ambos como prestadores de cuarta categoría en el T-Registro**, que es obligatorio aunque no sean trabajadores, y aplicar la retención del 8% cuando corresponda.\n\n**La lección central:** el riesgo no está en tener prestadores de servicios independientes, que es perfectamente legítimo y frecuente. Está en usar esa figura para un puesto que en los hechos es laboral. Y el contador es quien está en mejor posición para detectarlo, porque tiene los recibos por honorarios delante todos los meses: un recibo del mismo importe, del mismo emisor, todos los meses, durante años, es una señal que merece una pregunta.'},
   {l:3,t:'ab',p:'Diseña el sistema de gestión de contratos de una empresa con 30 trabajadores: 18 a plazo indeterminado, 8 con contratos modales, 2 practicantes y 2 prestadores de cuarta categoría. Incluye los controles que previenen cada causal de desnaturalización.',
    s:'**El sistema tiene cuatro componentes: el inventario, el calendario, los controles y el expediente.**\n\n**COMPONENTE 1 — Inventario maestro de vínculos**\n\nUna sola tabla con todos los vínculos de la empresa:\n\n| Nº | Nombre | Tipo de vínculo | Modalidad | Causa objetiva | Inicio | Vencimiento | Prórrogas usadas | Plazo modal acumulado | T-Registro | Alerta |\n|---|---|---|---|---|---|---|---|---|---|---|\n| 1 | | Indeterminado | — | — | | — | — | — | OK | — |\n| 19 | | Modal | Necesidades del mercado | Anexo 2 | 01/02/2026 | 31/01/2027 | 1 de 4 | 2 años 0 meses | OK | 15/01/2027 |\n| 27 | | Formativa | Prácticas profesionales | Plan de aprendizaje | | | | | Personal en formación | |\n| 29 | | Cuarta categoría | Locación | Contrato con entregables | | | | | Prestador 4ta | |\n\n**COMPONENTE 2 — Calendario de vencimientos con alertas escalonadas**\n\n| Alerta | Cuándo | A quién | Qué debe decidirse |\n|---|---|---|---|\n| Primera | **45 días** antes del vencimiento | Jefe del área y gerencia | ¿Subsiste la causa objetiva? ¿Se renueva, se convierte a indeterminado o cesa? |\n| Segunda | **15 días** antes | Encargado de planilla | Preparar el documento que corresponda: prórroga firmada o liquidación |\n| Tercera | **5 días** antes | Contador y gerencia | Verificar que el documento esté **firmado por ambas partes** |\n| Crítica | El día del vencimiento | Contador | Si no hay documento firmado, el trabajador **no debe laborar al día siguiente** |\n\n**La alerta crítica es la que evita la desnaturalización más frecuente del país.** Si el 31 de enero no hay prórroga firmada, el 1 de febrero el trabajador no puede ingresar, o queda a plazo indeterminado.\n\n**COMPONENTE 3 — Los controles, uno por causal de desnaturalización**\n\n| Causal del art. 77 | Riesgo | Control que lo previene | Frecuencia |\n|---|---|---|---|\n| **a) Continuar laborando tras el vencimiento** | Alto, por descuido administrativo | Calendario con las cuatro alertas y la regla de no ingreso sin documento firmado | Mensual |\n| **b) Exceder el plazo máximo de la modalidad** | Alto, acumulativo e invisible | Columna de **plazo modal acumulado** en el inventario, que suma todos los contratos del mismo trabajador y alerta al llegar a 4 años | Trimestral |\n| **c) Suplencia con titular reincorporado** | Medio | Registro de la fecha de reincorporación del titular, con cese automático del suplente ese día | Por evento |\n| **d) Simulación o fraude** | **Alto y el más costoso** | Revisión anual de la **subsistencia de cada causa objetiva** y auditoría de la coherencia entre el contrato y la realidad del puesto | Anual |\n\n**Controles adicionales, por tipo de vínculo:**\n\n| Vínculo | Control específico |\n|---|---|\n| **Practicantes (2)** | Verificar: convenio escrito con plan de aprendizaje, tutor designado, subvención no menor a la RMV, media subvención cada 6 meses, seguro vigente, registro como personal en formación, y que 2 de 30 esté dentro del **límite del 20%** (6 personas). Revisar que el practicante no esté cubriendo un puesto permanente |\n| **Prestadores de cuarta (2)** | Verificar trimestralmente los indicios de subordinación con la lista de ocho puntos. Documentar: contrato con entregables, evidencia de otros clientes, ausencia de horario impuesto, uso de medios propios, retribución por resultado. Registro en el T-Registro como prestadores y retención del 8% cuando corresponda |\n| **Dirección y confianza** | Verificar que la calificación esté **por escrito**, comunicada al trabajador, y que corresponda a las funciones reales. Si se los excluye de la jornada máxima, el sustento debe ser sólido |\n| **Tiempo parcial**, si hubiera | Verificar que la jornada promedio sea realmente **menor a 4 horas**: si llega a 4, corresponden vacaciones, CTS e indemnización |\n\n**COMPONENTE 4 — Expediente individual por trabajador**\n\n| Documento | Por qué está |\n|---|---|\n| Contrato original y todas sus prórrogas, firmados | Prueba del vínculo y de su modalidad |\n| Anexos de la causa objetiva, con su sustento documental | Lo que resiste en un proceso |\n| Descripción del puesto y funciones | Sustento de la calificación |\n| Calificación de dirección o confianza, si aplica | Requisito de forma |\n| Constancia de alta en el T-Registro | Prueba del cumplimiento del plazo |\n| Boletas de pago firmadas o con constancia de entrega | Prueba del pago |\n| Constancias de depósito de CTS | Prueba del beneficio |\n| Cuadro de vacaciones con días gozados | Previene la triple remuneración |\n| Memorandos, llamadas de atención, felicitaciones | Historial disciplinario, indispensable si hay que despedir por causa justa |\n| Cargo de entrega de EPP y constancias de capacitación en SST | Exigencia de la Ley 29783 |\n| Convenio y plan de aprendizaje, si es practicante | Evita la desnaturalización de la modalidad formativa |\n\n**El informe trimestral que cierra el sistema**\n\nUna página con cinco indicadores:\n\n| Indicador | Valor objetivo |\n|---|---|\n| Contratos vencidos sin documento de renovación firmado | **0** |\n| Trabajadores con plazo modal acumulado mayor a 4 años | Identificados y con decisión tomada |\n| Causas objetivas que ya no subsisten | Identificadas, con conversión a indeterminado propuesta |\n| Prestadores de cuarta con 4 o más indicios de subordinación | **0** |\n| Practicantes como porcentaje del personal | Menor al 20% |\n\n**Por qué este sistema vale lo que cuesta:** la desnaturalización no se produce por decisiones estratégicas equivocadas, se produce por descuidos administrativos. Nadie decide desnaturalizar un contrato: simplemente nadie lo renovó a tiempo. Un inventario, un calendario con alertas y una revisión trimestral —en total unas tres horas al mes— eliminan la causal más frecuente por completo. Y la revisión anual de la subsistencia de las causas objetivas es la que previene la causal más cara, que es la simulación.'}
  ],
  proy:{
   t:'Inventario y auditoría de contratos de tu empresa',
   ctx:`Tu empresa ya tiene trabajadores y planilla. Ahora vas a formalizar el vínculo de cada uno y a auditar que la forma corresponda a la realidad, que es donde se originan los juicios laborales.`,
   pasos:[
    'Para cada puesto de la plantilla que definiste en el Módulo 6, determina el tipo de vínculo que corresponde: plazo indeterminado, modalidad temporal, accidental, para obra o servicio, tiempo parcial, modalidad formativa o locación de servicios.',
    'Para los puestos que requieran contrato modal, redacta la causa objetiva completa, con datos concretos y verificables, siguiendo el modelo del ejercicio del subtema. Incluye los anexos de sustento.',
    'Redacta el contrato de trabajo completo de dos puestos: uno a plazo indeterminado y uno modal, con todas sus cláusulas.',
    'Identifica si algún puesto debería calificarse como de dirección o de confianza, y redacta la calificación por escrito con el sustento de las funciones.',
    'Elabora el inventario maestro de vínculos con sus once columnas, incluida la del plazo modal acumulado.',
    'Construye el calendario de vencimientos con las cuatro alertas escalonadas y sus responsables.',
    'Aplica a cada prestador de cuarta categoría de tu empresa la lista de ocho indicios de subordinación y documenta el resultado de cada uno.',
    'Elabora el índice del expediente individual por trabajador y arma el expediente completo de uno de ellos.'
   ],
   entrega:[
    'El inventario maestro de vínculos con las once columnas.',
    'Los dos contratos redactados y la causa objetiva con sus anexos.',
    'El calendario de vencimientos con alertas y responsables.',
    'El análisis de indicios de los prestadores de cuarta y el expediente individual completo de un trabajador.'
   ],
   crit:[
    'La causa objetiva contiene datos cuantificados y verificables, no fórmulas genéricas.',
    'El inventario incluye la columna de plazo modal acumulado, que es la que previene la causal b).',
    'El análisis de indicios evalúa los ocho puntos, no solo el documento firmado.'
   ],
   pista:'Al redactar la causa objetiva, escríbela pensando que la leerá un juez dentro de tres años sin conocer tu empresa. Si no puede entender, solo leyéndola, por qué la necesidad era transitoria, la causa está mal redactada.'
  },
  proyInt:{
   t:'Expediente laboral completo de tu empresa',
   integra:'1.1 a 7.1',
   ctx:`Vas a unir lo contable, lo tributario y lo laboral en un expediente de personal que resista una inspección. Es el documento que un contador entrega cuando una empresa quiere saber si está en orden.`,
   pasos:[
    'Integra el inventario de vínculos con la plantilla y el cuadro de costos del Módulo 6, de modo que cada trabajador tenga en un solo lugar su vínculo, su remuneración, sus beneficios y su costo total.',
    'Verifica la coherencia entre tres fuentes: el inventario de contratos, el T-Registro simulado del subtema 6.6 y la planilla del mes. Cada trabajador debe figurar en las tres con el mismo régimen y la misma modalidad.',
    'Cuantifica el pasivo contingente de cada vínculo en riesgo: contratos con causa objetiva débil, prestadores de cuarta con indicios de subordinación, practicantes en puestos permanentes.',
    'Integra ese pasivo contingente al registro único de contingencias del subtema 5.1 y evalúa su tratamiento contable bajo la NIC 37: pasivo reconocido o pasivo contingente revelado.',
    'Actualiza la matriz de cumplimiento del subtema 5.4 con los controles de gestión de contratos y sus frecuencias.',
    'Elabora el informe de situación laboral de tu empresa: una página con el número de vínculos por tipo, los riesgos identificados, el pasivo contingente cuantificado y las tres acciones prioritarias.',
    'Actualiza el expediente tributario y laboral integral del subtema 6.6 con la sección de contratos.'
   ],
   entrega:[
    'El inventario integrado de vínculos, remuneraciones y costos.',
    'La verificación de coherencia entre contratos, T-Registro y planilla.',
    'El pasivo contingente cuantificado con su tratamiento contable fundamentado.',
    'El informe de situación laboral de una página y el expediente integral actualizado.'
   ],
   crit:[
    'Los tres documentos (contratos, T-Registro, planilla) son coherentes para cada trabajador, sin excepciones.',
    'El tratamiento contable del pasivo contingente está fundamentado en los criterios de la NIC 37.',
    'El informe de una página permite decidir sin leer los anexos.'
   ],
   pista:'La verificación de coherencia entre las tres fuentes es exactamente lo que hace un inspector de SUNAFIL en los primeros veinte minutos de una visita. Hacerla tú primero significa que no encontrará nada.'
  },
  fuentes:[
   {a:'D.S. 003-97-TR — Ley de Productividad y Competitividad Laboral', o:'Artículos 4, 10, 43, 53 a 83', n:'presunción de laboralidad, periodo de prueba, dirección y confianza, contratos sujetos a modalidad y desnaturalización'},
   {a:'Ley 28518 y D.S. 007-2005-TR', o:'Ley sobre modalidades formativas laborales', n:'tipos de modalidad, subvención, límites porcentuales y desnaturalización'},
   {a:'Ley 31572 y D.S. 002-2023-TR (mod. por D.S. 009-2026-TR)', o:'Ley del Teletrabajo y su reglamento', n:'compensación de equipos, desconexión digital, reversibilidad, evaluación de riesgos y límites al monitoreo'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'elementos del contrato, primacía de la realidad, indicios de subordinación y contratación modal'},
   {a:'Mario Pasco Cosmópolis', o:'Fundamentos de derecho procesal del trabajo', n:'carga de la prueba, presunciones laborales y acreditación de la subordinación'},
   {a:'Corte Suprema de Justicia — Salas de Derecho Constitucional y Social', o:'Casaciones laborales sobre desnaturalización y primacía de la realidad', n:'criterios jurisprudenciales sobre causa objetiva y simulación'}
  ]
 },
 {
  id:'m7t2', titulo:'Jornada, horario, horas extras, descansos y licencias', min:27,
  cont:`La jornada es el tema laboral que más pasivos oculta, porque se acumula en silencio: una hora extra no pagada por día, por treinta trabajadores, durante tres años, son miles de horas que algún día se reclaman. Y la prueba, en este terreno, juega contra el empleador.

# La jornada máxima
$ Art. 25 de la Constitución: la jornada ordinaria de trabajo es de OCHO HORAS DIARIAS
$ o CUARENTA Y OCHO HORAS SEMANALES, como máximo

Son dos límites **alternativos**, no acumulativos: se puede trabajar menos de ocho horas algunos días y más otros, siempre que el total semanal no exceda las cuarenta y ocho. Pero no se puede exceder las ocho horas diarias de forma ordinaria si eso lleva a superar las cuarenta y ocho semanales.

**Jornadas atípicas o acumulativas.** Se admiten en actividades que lo justifiquen —minería, pesca, operaciones continuas— siempre que el **promedio de horas en el ciclo** no supere el máximo legal. El Tribunal Constitucional ha exigido que estas jornadas superen un test de razonabilidad y proporcionalidad, especialmente en actividades riesgosas.

**Los exceptuados de la jornada máxima:**
|Categoría|Razón|
|**Personal de dirección**|Decide su propia organización del tiempo|
|**No sujetos a fiscalización inmediata**|Trabajan sin supervisión directa y sin control de horario|
|Los que prestan **servicios intermitentes de espera, vigilancia o custodia**|Su labor alterna periodos de actividad e inactividad|

! La excepción debe corresponder a la **realidad de las funciones**, no al nombre del puesto. Un trabajador llamado "supervisor" que marca tarjeta, recibe instrucciones diarias y está presente en un horario fijo no es "no sujeto a fiscalización inmediata": está fiscalizado. Excluirlo de la jornada máxima sobre esa base construye un pasivo por horas extras.

# El horario y el refrigerio
|Aspecto|Regla|
|**Fijación del horario**|Es facultad del empleador|
|**Modificación del horario**|El empleador puede modificarlo **hasta en una hora**. Si la modificación excede ese margen y el trabajador se opone, puede impugnarla ante la Autoridad Administrativa de Trabajo|
|**Refrigerio**|No menor a **45 minutos**. **No forma parte de la jornada**, salvo pacto o convenio que disponga lo contrario|

$ Jornada de 8 horas + 45 minutos de refrigerio = 8 horas 45 minutos de permanencia
$ El refrigerio no se paga ni se computa como trabajo, salvo pacto

# Las horas extras
$ Sobretasa de las DOS PRIMERAS horas: 25% sobre el valor de la hora ordinaria
$ Sobretasa de las HORAS SIGUIENTES: 35% sobre el valor de la hora ordinaria

**El cálculo del valor hora:**
$ Valor hora = Remuneración mensual ÷ 30 días ÷ horas de la jornada diaria
$ Ejemplo con S/ 2,400 y jornada de 8 horas: 2,400 ÷ 30 ÷ 8 = S/ 10.00 por hora

|Concepto|Cálculo|Importe|
|Hora ordinaria|2,400 ÷ 30 ÷ 8|10.00|
|Primeras 2 horas extras|10.00 × 1.25|12.50 cada una|
|Horas extras siguientes|10.00 × 1.35|13.50 cada una|

**Reglas esenciales del sobretiempo:**
|Regla|Detalle|
|**Voluntariedad**|El trabajo en sobretiempo es **voluntario** en su otorgamiento y en su prestación. Nadie puede ser obligado, salvo en casos justificados por hecho fortuito o fuerza mayor que pongan en peligro a las personas o a los bienes|
|**Imposición**|Imponer el sobretiempo es una infracción. El trabajador puede denunciarlo ante la inspección|
|**Presunción**|El trabajo en sobretiempo realizado con **conocimiento del empleador** se presume autorizado, aunque no haya autorización escrita|
|**Compensación**|Puede compensarse con **descanso sustitutorio**, por acuerdo entre las partes y dentro del mes siguiente|
|**Registro**|Debe constar en el registro de control de asistencia|

! La **presunción de autorización** es lo que desarma la defensa habitual. Un empleador que dice "yo nunca autoricé esas horas extras" pierde si el trabajador demuestra que la empresa sabía: correos enviados a las 21 horas, marcaciones de salida tardías, mensajes del jefe pidiendo quedarse. La única forma de controlar el sobretiempo es controlarlo de verdad, no negarlo después.

# El trabajo nocturno
$ Horario nocturno: entre las 22:00 y las 06:00 horas
$ El trabajador nocturno percibe una remuneración no menor a la RMV
$ más una SOBRETASA DEL 35% de la RMV

$ Sobretasa nocturna 2026 = 1,230 × 35% = S/ 430.50
$ Remuneración mínima del trabajador nocturno = 1,230 + 430.50 = S/ 1,660.50

La sobretasa se calcula sobre la **RMV**, no sobre la remuneración del trabajador. Y corresponde a quien trabaja habitualmente en horario nocturno; si la rotación es por turnos, se aplica proporcionalmente a los días trabajados en ese horario.

# El descanso semanal obligatorio
|Aspecto|Regla|
|**Duración**|Mínimo **24 horas consecutivas**|
|**Día**|Preferentemente el **domingo**|
|**Trabajo en el día de descanso**|Si no se otorga descanso sustitutorio, se paga con una **sobretasa del 100%**|

$ Trabajo en día de descanso semanal sin sustituto = remuneración del día × 2
$ (el día trabajado + la sobretasa del 100%)

# Los feriados nacionales
|Fecha|Feriado|
|1 de enero|Año Nuevo|
|Jueves Santo|móvil|
|Viernes Santo|móvil|
|1 de mayo|Día del Trabajo|
|29 de junio|San Pedro y San Pablo|
|28 de julio|Fiestas Patrias|
|29 de julio|Fiestas Patrias|
|6 de agosto|Batalla de Junín|
|30 de agosto|Santa Rosa de Lima|
|8 de octubre|Combate de Angamos|
|1 de noviembre|Todos los Santos|
|8 de diciembre|Inmaculada Concepción|
|9 de diciembre|Batalla de Ayacucho|
|25 de diciembre|Navidad|

> Los feriados del **6 de agosto** y del **9 de diciembre** fueron incorporados como feriados nacionales permanentes por la Ley 31643. Conviene verificar cada año el calendario oficial, porque el Ejecutivo también declara **días no laborables** que **no son feriados**: esos se compensan con horas o días de trabajo y su tratamiento es distinto.

**El trabajo en feriado:**
$ Trabajo en feriado sin descanso sustitutorio = PAGO TRIPLE
$ (1) la remuneración del feriado, que se paga igual aunque no se trabaje
$ (2) la remuneración por el trabajo efectivamente realizado
$ (3) la sobretasa del 100%

Ese es el error de cálculo más común del país: pagar doble en lugar de triple. El feriado ya está pagado dentro del sueldo mensual, de modo que trabajarlo agrega dos remuneraciones diarias más, no una.

# Las licencias
|Licencia|Duración|Norma|
|**Maternidad**|**98 días**: 49 de descanso prenatal y 49 de posnatal. Se extiende **30 días** más en caso de parto múltiple o nacimiento de hijo con discapacidad|Ley 26644 y modificatorias|
|**Lactancia**|**1 hora diaria** hasta que el hijo cumpla **1 año**. Es inafectable y no compensable|Ley 27240|
|**Paternidad**|**10 días calendario** consecutivos. **20 días** en caso de nacimiento prematuro, parto múltiple, complicaciones graves de la madre o hijo con discapacidad. **30 días** en caso de enfermedad grave o fallecimiento de la madre|Ley 29409, mod. Ley 30807|
|**Adopción**|30 días naturales|Ley 27409|
|**Familiar directo con enfermedad grave o accidente**|**7 días** con goce de haber, prorrogables hasta **30 días adicionales** a cuenta del descanso vacacional|Ley 30012|
|**Donación de órganos**|El tiempo necesario|Ley 28189|

**El subsidio de EsSalud por incapacidad temporal:**
$ Los primeros 20 días de incapacidad en el año los paga el EMPLEADOR
$ Desde el día 21, EsSalud otorga el SUBSIDIO, que el empleador puede adelantar y reembolsar

La licencia por maternidad también es subsidiada por EsSalud, con los requisitos de aportación. El empleador adelanta el pago y solicita el reembolso, de modo que el flujo de caja se adelanta pero el costo no es suyo.

# La prueba de la jornada: por qué el registro es la defensa
$ D.S. 004-2006-TR: el registro de control de asistencia es OBLIGATORIO
$ Se exceptúa al personal de dirección, a los no sujetos a fiscalización inmediata
$ y a los que prestan servicios intermitentes de espera

! En un proceso por horas extras, si el empleador **no exhibe el registro**, la jornada que afirme el trabajador **se tiene por cierta**. Es decir: no llevar el registro no impide que se prueben las horas extras, las hace indiscutibles. El registro es el instrumento de defensa del empleador, no una carga burocrática.

**Qué debe contener el registro:**
- Nombre y documento de identidad de cada trabajador.
- Hora de **ingreso** y de **salida**.
- Hora de inicio y fin del **refrigerio**, si no coincide con el horario general.
- Las horas de **sobretiempo**, cuando se produzcan.

El registro puede ser físico o digital, y debe estar a disposición de la inspección en el centro de trabajo.

# El control del sobretiempo que sí funciona
1. **Autorización previa por escrito** de cada hora extra, firmada por el jefe del área, antes de que ocurra.
2. **Registro de la marcación** real de ingreso y salida, sin excepciones.
3. **Conciliación mensual** entre el registro de asistencia y la planilla: toda hora por encima de la jornada debe aparecer pagada con sobretasa o compensada con descanso.
4. **Política escrita** de sobretiempo, comunicada y acusada por los trabajadores.
5. **Alerta de exceso**: reporte mensual de trabajadores con más de X horas extras, para corregir el dimensionamiento del área.

$ El indicador de gestión: si un área genera horas extras todos los meses,
$ no tiene un problema de sobretiempo, tiene un problema de dotación de personal`,
  claves:['La jornada máxima es de 8 horas diarias o 48 semanales; las excepciones deben corresponder a las funciones reales, no al nombre del puesto.','Las horas extras se pagan con sobretasa del 25% las dos primeras y 35% las siguientes, sobre el valor de la hora ordinaria.','El sobretiempo realizado con conocimiento del empleador se presume autorizado, aunque no haya autorización escrita.','Trabajar un feriado sin descanso sustitutorio se paga triple: el feriado, el trabajo y la sobretasa del 100%.','Sin registro de control de asistencia, la jornada que afirme el trabajador se tiene por cierta: el registro es la defensa del empleador.'],
  preg:[
   {p:'¿Por qué el refrigerio no forma parte de la jornada y qué consecuencia práctica tiene?',
    r:'Porque durante el refrigerio el trabajador no está a disposición del empleador: dispone de ese tiempo para sí. La norma exige un mínimo de 45 minutos y establece que no se computa dentro de la jornada, salvo pacto o convenio colectivo que disponga lo contrario. La consecuencia práctica es que la **permanencia** en el centro de trabajo es mayor que la jornada: ocho horas de trabajo más cuarenta y cinco minutos de refrigerio son ocho horas y cuarenta y cinco minutos de presencia. Un error frecuente es calcular las horas extras tomando la permanencia total sin descontar el refrigerio, lo que infla el sobretiempo; y el error inverso, descontar un refrigerio que en realidad el trabajador no toma porque atiende público, lo que lo oculta. Lo que resuelve ambos es que el registro de asistencia consigne el inicio y el fin del refrigerio.'},
   {p:'¿Qué significa que el sobretiempo realizado con conocimiento del empleador se presume autorizado?',
    r:'Significa que la defensa de "yo no autoricé esas horas" no funciona si la empresa sabía que se trabajaban. La presunción protege al trabajador frente a una práctica común: exigir de hecho que se quede, sin autorizarlo formalmente, para no pagar el sobretiempo. Los elementos que acreditan el conocimiento son cotidianos y fáciles de obtener: correos enviados desde el trabajo a las 21 horas, marcaciones de salida tardías en el propio registro de la empresa, mensajes del jefe pidiendo terminar algo ese día, metas imposibles de cumplir en ocho horas. La única forma real de controlar el sobretiempo es gestionarlo: autorización previa escrita, registro fiel y conciliación mensual con la planilla. Negarlo después no es una estrategia, es una pérdida anunciada.'},
   {p:'¿Por qué trabajar un feriado se paga triple y no doble?',
    r:'Porque el feriado ya está pagado. La remuneración mensual del trabajador comprende los feriados: si el 1 de mayo no trabaja, cobra igual. Por eso, cuando trabaja ese día, se le agregan dos conceptos a lo que ya iba a recibir: la remuneración por el trabajo efectivamente realizado y la sobretasa del 100% sobre ese trabajo. El resultado es tres remuneraciones diarias por ese día: la del feriado que ya estaba en el sueldo, la del trabajo y la sobretasa. El error de pagar solo doble es extendidísimo y produce un pasivo por cada feriado trabajado. Y se evita por completo otorgando **descanso sustitutorio**, que es gratuito: si el trabajador descansa otro día, no corresponde ninguna sobretasa.'},
   {p:'¿Por qué no llevar el registro de control de asistencia perjudica al empleador?',
    r:'Porque en materia laboral el empleador tiene la carga de probar el cumplimiento de sus obligaciones, y el registro es el único medio objetivo de probar la jornada. Si un trabajador reclama que trabajaba dos horas extras diarias durante tres años y la empresa no exhibe registro, la jornada que el trabajador afirme se tiene por cierta, y la empresa paga sobre esa base. Algunos empleadores creen que no llevar registro impide probar el sobretiempo; el efecto es exactamente inverso, porque la ausencia del registro es a la vez una infracción y una renuncia a la prueba. Por eso el registro debe ser fiel: un registro manipulado, donde todos marcan salida a las 18 horas aunque se queden hasta las 21, es peor que no tenerlo, porque pierde credibilidad y puede configurar un fraude.'},
   {p:'¿Qué revela una empresa que genera horas extras todos los meses en la misma área?',
    r:'Revela un problema de **dotación de personal**, no de sobretiempo. El sobretiempo es, por naturaleza, excepcional: responde a un pico de demanda, una urgencia, un cierre. Si un área necesita diez horas extras por trabajador cada mes de forma sostenida, su carga de trabajo excede estructuralmente a su personal, y lo que corresponde es contratar, redistribuir funciones o mejorar procesos. Y además el sobretiempo permanente es la opción más cara: la hora extra cuesta 25% o 35% más que la ordinaria, agota al personal y eleva el riesgo de accidentes y de errores. El contador que reporta el indicador de horas extras por área cada mes le entrega a la gerencia una herramienta de gestión, no solo un dato de planilla.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un trabajador gana S/ 2,700 mensuales con jornada de 8 horas. ¿Cuál es el valor de su hora ordinaria?',
    u:'S/',r:11.25,tol:0.05,
    s:'$ Valor hora = Remuneración mensual ÷ 30 días ÷ horas de la jornada diaria\n$ 2,700 ÷ 30 ÷ 8 = **S/ 11.25**\n\nY a partir de ese valor:\n\n| Concepto | Cálculo | Importe |\n|---|---|---|\n| Primeras 2 horas extras | 11.25 × 1.25 | 14.06 cada una |\n| Horas extras siguientes | 11.25 × 1.35 | 15.19 cada una |\n\nEl divisor de 30 días es el que corresponde a la remuneración mensual, independientemente de los días del mes calendario. Y nótese que el valor hora debe calcularse sobre la **remuneración computable** completa, incluida la asignación familiar y los conceptos remunerativos regulares, no solo sobre el básico.'},
   {l:1,t:'num',p:'Un trabajador con remuneración diaria de S/ 90 trabaja un feriado y no recibe descanso sustitutorio. ¿Cuánto debe percibir en total por ese día?',
    u:'S/',r:270,tol:1,
    s:'El pago es **triple**:\n\n| Concepto | Importe |\n|---|---|\n| Remuneración del feriado (ya comprendida en el sueldo) | 90 |\n| Remuneración por el trabajo efectivamente realizado | 90 |\n| Sobretasa del 100% sobre ese trabajo | 90 |\n| **Total** | **S/ 270** |\n\nEl error habitual es pagar S/ 180, razonando que se trabajó un día y corresponde el doble. Pero el feriado se paga **aunque no se trabaje**, porque está dentro de la remuneración mensual; trabajarlo agrega dos remuneraciones diarias, no una.\n\n**Y la alternativa gratuita:** si se otorga **descanso sustitutorio** en otro día, no corresponde sobretasa alguna. Programar el descanso sustitutorio cuesta nada y evita por completo este pago.'},
   {l:2,t:'num',p:'Un trabajador gana S/ 3,000 mensuales con jornada de 8 horas. En un mes trabajó 14 horas extras: 8 fueron en bloques de 2 horas diarias (4 días) y 6 fueron en un solo día de 6 horas adicionales. Calcula el total a pagar por sobretiempo.',
    u:'S/',r:223.75,tol:3,
    s:'**Valor hora ordinaria** = 3,000 ÷ 30 ÷ 8 = **S/ 12.50**\n\nLa clave del ejercicio: la sobretasa se aplica **por día**, no por el total del mes. Las dos primeras horas de **cada día** van al 25% y las siguientes de ese día al 35%.\n\n**Los 4 días con 2 horas extras cada uno:**\nTodas son "primeras dos horas" de su día, al 25%:\n8 horas × 12.50 × 1.25 = **S/ 125.00**\n\n**El día con 6 horas extras:**\n\n| Tramo | Horas | Sobretasa | Cálculo | Importe |\n|---|---|---|---|---|\n| Primeras 2 horas | 2 | 25% | 2 × 12.50 × 1.25 | 31.25 |\n| Horas 3 a 6 | 4 | 35% | 4 × 12.50 × 1.35 | 67.50 |\n| **Subtotal del día** | 6 | | | **98.75** |\n\n**Total del mes** = 125.00 + 98.75 = **S/ 223.75**\n\nNota: si por error se aplicara el 25% a las dos primeras horas del mes y el 35% a las doce restantes, el resultado sería S/ 233.75, es decir S/ 10 más. El error parece pequeño en un mes, pero aplicado a treinta trabajadores durante tres años genera una diferencia relevante, y en la dirección contraria —aplicando 25% a todo— genera una deuda con el trabajador.\n\n**El control que lo previene:** el registro de asistencia debe permitir calcular el sobretiempo **día por día**, no entregar un total mensual. Una planilla que recibe "14 horas extras" sin el detalle diario no puede calcular correctamente.'},
   {l:2,t:'ab',p:'Una empresa con 12 trabajadores no lleva registro de control de asistencia. Un ex trabajador demanda alegando que durante 2 años trabajó de 8 a 20 horas de lunes a sábado, con remuneración de S/ 2,400. Analiza la situación probatoria y cuantifica el riesgo.',
    s:'**El problema probatorio, que es el centro del caso.** La ausencia del registro de control de asistencia tiene dos efectos simultáneos y ambos perjudican a la empresa:\n\n| Efecto | Consecuencia |\n|---|---|\n| **Infracción** | No llevar el registro es una infracción sancionable por SUNAFIL |\n| **Carga de la prueba** | La empresa no puede probar la jornada real. La jornada que afirme el trabajador **se tiene por cierta** |\n\n**Cuantificación del reclamo según lo alegado por el trabajador:**\n\nJornada alegada: 8:00 a 20:00 horas, lunes a sábado = 12 horas de permanencia diaria.\nDescontando 45 minutos de refrigerio: **11.25 horas de trabajo efectivo** por día.\nJornada ordinaria: 8 horas.\n**Sobretiempo alegado: 3.25 horas diarias**, seis días por semana.\n\n| Concepto | Cálculo | Resultado |\n|---|---|---|\n| Valor hora ordinaria | 2,400 ÷ 30 ÷ 8 | 10.00 |\n| Primeras 2 horas diarias (25%) | 2 × 10.00 × 1.25 | 25.00 por día |\n| Horas 3 a 3.25 (35%) | 1.25 × 10.00 × 1.35 | 16.88 por día |\n| **Sobretiempo por día** | | **41.88** |\n| Días por semana | 6 | |\n| Semanas en 2 años | ~104 | |\n| **Sobretiempo total** | 41.88 × 6 × 104 | **~26,133** |\n\n**Y el efecto en cascada, que es lo que multiplica el reclamo:** las horas extras regulares integran la remuneración computable de los beneficios sociales. Si se declaran regulares, afectan:\n\n| Beneficio afectado | Efecto aproximado |\n|---|---|\n| Gratificaciones (4 en 2 años) | recálculo con la remuneración incrementada |\n| CTS (4 depósitos) | recálculo con base mayor |\n| Vacaciones | recálculo |\n| Aportes a EsSalud omitidos | 9% sobre el sobretiempo |\n| Aportes previsionales omitidos | ~13% sobre el sobretiempo |\n| **Intereses legales laborales** | sobre todo el principal, por 2 años |\n\n**El riesgo total estimado supera los S/ 40,000 por un solo trabajador.** Y hay once más en la misma situación, que podrían demandar con el mismo argumento y la misma ausencia de prueba.\n\n**Las defensas disponibles, en orden de viabilidad real:**\n\n| Defensa | Viabilidad | Qué requiere |\n|---|---|---|\n| **Prueba indirecta de la jornada real** | Media | Testigos, cámaras de seguridad con horarios, registros de apertura y cierre del local, bitácoras de vigilancia, correos del trabajador que muestren su horario habitual, registros de acceso al sistema informático |\n| **Acreditar que el local cerraba antes de las 20 horas** | Buena si existe | Horario de atención publicado, licencia municipal de funcionamiento con horario, contratos de servicios, declaraciones de vecinos o del administrador del centro comercial |\n| **Acreditar incongruencias en el relato** | Media | Vacaciones gozadas, descansos médicos, periodos de suspensión en los que el trabajador no pudo haber trabajado esas horas |\n| **Cuestionar el carácter regular del sobretiempo** | Limitada | Para evitar su incorporación a la base de los beneficios |\n| Negar la jornada sin prueba | **Nula** | No funciona: la carga es del empleador |\n\n**Lo que la empresa debe hacer hoy, respecto de los once trabajadores restantes:**\n\n1. **Implementar el registro de control de asistencia de inmediato**, físico o digital. No corrige el pasado, pero cierra el futuro.\n2. **Conciliar el registro con la planilla cada mes**: toda hora sobre la jornada debe aparecer pagada con sobretasa o compensada con descanso sustitutorio dentro del mes siguiente.\n3. **Establecer la política de sobretiempo por escrito**, con autorización previa del jefe de área, y hacerla firmar por los trabajadores.\n4. **Verificar la jornada real** de los once trabajadores y, si hay sobretiempo no pagado, cuantificarlo y decidir con asesoría legal cómo regularizarlo. El pasivo existe hoy, esté o no reclamado.\n5. **Reunir ahora la prueba indirecta** sobre los periodos pasados, mientras los testigos siguen en la empresa y los registros electrónicos existen. En dos años, esa prueba habrá desaparecido.\n\n**La lección, que es la razón de ser del registro:** el registro de asistencia parece una carga administrativa y es, en realidad, el único escudo del empleador en el terreno donde está más expuesto. Su costo es el de un reloj marcador o una aplicación; su ausencia costó, en este caso, un reclamo indiscutible de más de S/ 40,000 por trabajador.'},
   {l:3,t:'ab',p:'Diseña el sistema de control de jornada y sobretiempo de una empresa con tres turnos rotativos, 45 trabajadores, operación de lunes a domingo y personal nocturno. Incluye el cálculo de todos los conceptos aplicables.',
    s:'**El caso reúne todas las complejidades de la jornada: turnos, trabajo nocturno, descanso semanal en días distintos y feriados en operación continua.**\n\n**COMPONENTE 1 — Diseño de la jornada**\n\n| Turno | Horario | Horas | Particularidad |\n|---|---|---|---|\n| Mañana | 06:00 a 14:00 | 8 | Ordinario |\n| Tarde | 14:00 a 22:00 | 8 | Ordinario |\n| **Noche** | **22:00 a 06:00** | 8 | **Horario nocturno completo: sobretasa del 35% de la RMV** |\n\n**Verificación del límite semanal:** con rotación de seis días de trabajo y uno de descanso, la jornada semanal es de 48 horas, que es exactamente el máximo. No hay margen para horas ordinarias adicionales: toda hora por encima es sobretiempo.\n\n**COMPONENTE 2 — Cálculo de la sobretasa nocturna**\n\n$ Sobretasa nocturna = 35% de la RMV = 1,230 × 35% = S/ 430.50 mensuales\n$ Remuneración mínima del trabajador nocturno = 1,230 + 430.50 = S/ 1,660.50\n\n| Situación | Tratamiento |\n|---|---|\n| Trabajador **permanentemente** en turno noche | Sobretasa completa de S/ 430.50 mensuales |\n| Trabajador en **rotación** entre turnos | Sobretasa **proporcional** a los días efectivamente laborados en horario nocturno: (430.50 ÷ 30) × días nocturnos |\n\nEjemplo de rotación: un trabajador con 10 días en turno noche en el mes percibe (430.50 ÷ 30) × 10 = **S/ 143.50** de sobretasa nocturna.\n\n**COMPONENTE 3 — El descanso semanal con operación de lunes a domingo**\n\n| Regla | Aplicación |\n|---|---|\n| Cada trabajador requiere **24 horas consecutivas** de descanso | Se programa en el rol, en día distinto para cada grupo |\n| El descanso **no tiene que ser domingo** | La norma dice "preferentemente", y la operación continua lo justifica |\n| Si un trabajador labora en **su** día de descanso | Sobretasa del **100%**, salvo que se otorgue descanso sustitutorio |\n\n**El control crítico:** el rol de turnos debe asignar a cada trabajador su día de descanso de forma identificable, porque la sobretasa del 100% depende de que la labor haya ocurrido en **su** día de descanso, no en domingo. Un rol mal documentado hace imposible determinar quién tiene derecho a qué.\n\n**COMPONENTE 4 — Los feriados en operación continua**\n\n| Escenario | Pago |\n|---|---|\n| Feriado no trabajado | Remuneración del día, ya comprendida en el sueldo |\n| Feriado trabajado **con** descanso sustitutorio | Solo la remuneración del día. **Sin sobretasa** |\n| Feriado trabajado **sin** descanso sustitutorio | **Triple**: el feriado + el trabajo + la sobretasa del 100% |\n\nCon 14 feriados al año y operación de lunes a domingo, la diferencia entre programar descansos sustitutorios y no hacerlo es significativa:\n\n$ 45 trabajadores × 14 feriados × 2 remuneraciones diarias adicionales\n$ Con remuneración diaria de S/ 60: 45 × 14 × 120 = S/ 75,600 al año de sobrecosto evitable\n\n**Programar el descanso sustitutorio es, literalmente, la decisión de gestión mejor pagada del área de personal.**\n\n**COMPONENTE 5 — El registro de control de asistencia**\n\n| Requisito | Cómo se cumple en tres turnos |\n|---|---|\n| Marcación de ingreso y salida | Reloj biométrico o digital, con el turno identificado |\n| Refrigerio | Registro de inicio y fin, porque con 45 minutos la permanencia es de 8:45 |\n| Sobretiempo | Marcación efectiva más la autorización previa escrita |\n| Identificación del turno | Campo obligatorio: determina la sobretasa nocturna |\n| Identificación del día de descanso | Del rol, cruzado con la marcación |\n\n**COMPONENTE 6 — La conciliación mensual, en seis verificaciones**\n\n| Nº | Verificación | Qué detecta |\n|---|---|---|\n| 1 | Horas marcadas menos refrigerio contra 8 horas diarias | Sobretiempo no declarado |\n| 2 | Sobretiempo del registro contra sobretiempo pagado en la planilla | Horas extras impagas |\n| 3 | Días en turno noche del rol contra sobretasa nocturna pagada | Sobretasa omitida o mal proporcionada |\n| 4 | Marcaciones en el día de descanso del rol contra sobretasa del 100% o descanso sustitutorio | Descanso semanal no compensado |\n| 5 | Marcaciones en feriado contra pago triple o descanso sustitutorio | El error de pagar doble en lugar de triple |\n| 6 | Sobretiempo acumulado por trabajador y por área | Problema de dotación de personal |\n\n**COMPONENTE 7 — La política de sobretiempo**\n\n1. Toda hora extra requiere **autorización previa escrita** del jefe de área, con el motivo.\n2. El sobretiempo es **voluntario**: el trabajador puede negarse, salvo en los supuestos de hecho fortuito o fuerza mayor que pongan en peligro a personas o bienes.\n3. Se privilegia la **compensación con descanso sustitutorio**, dentro del mes siguiente, por acuerdo.\n4. **Límite de alerta**: si un trabajador supera 20 horas extras en un mes, se escala a gerencia para revisar la dotación del área.\n5. La política se **comunica por escrito** y los trabajadores acusan recibo.\n\n**COMPONENTE 8 — El tablero mensual para la gerencia**\n\n| Indicador | Por qué importa |\n|---|---|\n| Horas extras totales y por área | Detecta problemas de dotación |\n| Costo del sobretiempo frente al costo de contratar | La comparación que decide si conviene contratar |\n| Feriados trabajados con y sin descanso sustitutorio | Mide el sobrecosto evitable |\n| Trabajadores sin descanso semanal en la semana | **Alerta roja**: incumplimiento de un derecho irrenunciable |\n| Sobretasa nocturna pagada contra días nocturnos del rol | Control de exactitud |\n\n**La conclusión profesional:** en una operación de tres turnos y siete días, el costo laboral no se controla negociando sueldos sino **diseñando bien el rol**. Un rol que programa descansos sustitutorios para los feriados, distribuye los días de descanso sin generar trabajo en día de descanso y dimensiona correctamente cada turno puede costar un 15% menos que uno improvisado, sin reducir ningún derecho. Ese diseño es trabajo del área de personal con el contador, y es donde su aporte vale más.'}
  ],
  proy:{
   t:'Sistema de control de jornada de tu empresa',
   ctx:`Vas a construir el control que protege a tu empresa en el terreno donde está más expuesta, porque es donde la prueba juega en su contra.`,
   pasos:[
    'Define la jornada y el horario de cada puesto de tu plantilla, verificando que ninguno exceda las 8 horas diarias ni las 48 semanales, y señalando el refrigerio.',
    'Identifica si algún puesto califica como exceptuado de la jornada máxima y sustenta la calificación con las funciones reales, no con el nombre del cargo.',
    'Diseña el formato del registro de control de asistencia de tu empresa, con los campos obligatorios y la identificación del turno y del día de descanso si aplica.',
    'Simula un mes de marcaciones de tres trabajadores, incluyendo al menos un día con horas extras, un trabajo en día de descanso y un feriado trabajado.',
    'Calcula el pago de sobretiempo día por día, aplicando correctamente el 25% a las dos primeras horas de cada día y el 35% a las siguientes.',
    'Calcula el pago del trabajo en día de descanso y del feriado trabajado, en los dos escenarios: con y sin descanso sustitutorio. Cuantifica la diferencia.',
    'Si tu empresa tiene o podría tener trabajo nocturno, calcula la sobretasa del 35% de la RMV, completa y proporcional.',
    'Redacta la política de sobretiempo de tu empresa con sus cinco reglas y el formato de autorización previa.',
    'Elabora la conciliación mensual de seis verificaciones entre el registro de asistencia y la planilla.'
   ],
   entrega:[
    'La definición de jornada por puesto con el sustento de las excepciones.',
    'El formato del registro de asistencia y el mes simulado de marcaciones.',
    'El cálculo del sobretiempo día por día, del día de descanso y del feriado en los dos escenarios.',
    'La política de sobretiempo con su formato de autorización y la conciliación de seis verificaciones.'
   ],
   crit:[
    'La sobretasa se aplica por día, no sobre el total mensual de horas extras.',
    'El feriado trabajado sin sustituto se paga triple, no doble.',
    'La conciliación cruza el registro de asistencia con la planilla y detecta diferencias.'
   ],
   pista:'Al calcular el escenario con y sin descanso sustitutorio, extrapola la diferencia a los 14 feriados del año y a toda tu plantilla. El número resultante es el argumento que convence a cualquier gerencia de programar los descansos sustitutorios.'
  },
  proyInt:{
   t:'Auditoría de jornada y recálculo de la planilla',
   integra:'1.1 a 7.2',
   ctx:`Vas a auditar la jornada de tu empresa y a corregir la planilla y los estados financieros con los conceptos que aparezcan. Es el tipo de hallazgo que más modifica un pasivo laboral.`,
   pasos:[
    'Cruza el registro de asistencia simulado con la planilla del Módulo 6 y determina si hay sobretiempo, trabajo en día de descanso o feriados trabajados no pagados.',
    'Recalcula la planilla del mes incorporando todos los conceptos de jornada que correspondan: horas extras con sus sobretasas, sobretasa nocturna, sobretasa del día de descanso y pago triple de feriados.',
    'Determina si las horas extras son regulares y, si lo son, recalcula las bases de las gratificaciones, la CTS y las vacaciones incorporándolas al promedio.',
    'Registra en el Libro Diario los asientos de ajuste correspondientes, con el gasto y el pasivo de cada concepto.',
    'Recalcula los aportes a EsSalud y los descuentos previsionales sobre la remuneración incrementada, y determina el efecto en la retención de quinta.',
    'Actualiza los estados financieros del Módulo 6 con los nuevos importes y verifica que sigan cuadrando.',
    'Cuantifica el pasivo contingente por jornada: si los conceptos detectados en un mes se repitieran en los periodos no prescritos, ¿cuál sería la exposición total?',
    'Integra ese pasivo al registro único de contingencias y actualiza la matriz de cumplimiento con los controles de jornada.',
    'Elabora el informe a la gerencia con el costo del sobretiempo frente al costo de contratar personal adicional.'
   ],
   entrega:[
    'La planilla recalculada con todos los conceptos de jornada.',
    'Los asientos de ajuste y los estados financieros actualizados.',
    'El pasivo contingente por jornada cuantificado e integrado al registro de contingencias.',
    'El informe comparativo del costo del sobretiempo frente a contratar.'
   ],
   crit:[
    'Las horas extras regulares se incorporan a la base de los beneficios sociales, no solo se pagan.',
    'El recálculo propaga el efecto a EsSalud, aportes previsionales y retención de quinta.',
    'El informe comparativo concluye con una recomendación cuantificada, no con una observación.'
   ],
   pista:'El efecto más subestimado del sobretiempo regular es que incrementa la base de todos los beneficios sociales. Una hora extra no solo cuesta un 25% más: arrastra gratificaciones, CTS y vacaciones calculadas sobre un promedio mayor.'
  },
  fuentes:[
   {a:'D.S. 007-2002-TR y D.S. 008-2002-TR', o:'TUO de la Ley de Jornada de Trabajo, Horario y Trabajo en Sobretiempo y su reglamento', n:'jornada máxima, exceptuados, modificación del horario, sobretasas del sobretiempo y trabajo nocturno'},
   {a:'D. Leg. 713 y D.S. 012-92-TR', o:'Descansos remunerados', n:'descanso semanal obligatorio, feriados nacionales y sobretasas por trabajo en descanso y feriado'},
   {a:'D.S. 004-2006-TR', o:'Registro de control de asistencia', n:'obligatoriedad, contenido, excepciones y valor probatorio de la jornada'},
   {a:'Ley 31643', o:'Feriados nacionales', n:'incorporación del 6 de agosto y el 9 de diciembre como feriados permanentes'},
   {a:'Ley 26644, Ley 29409 (mod. Ley 30807), Ley 30012 y Ley 27240', o:'Licencias de maternidad, paternidad, por familiar grave y por lactancia', n:'duración, supuestos de ampliación y condiciones de goce'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'jornada, sobretiempo, descansos y carga de la prueba en materia de jornada'}
  ]
 },
 {
  id:'m7t3', titulo:'Suspensión y extinción del contrato: despido, indemnización y liquidación', min:28,
  cont:`La terminación de la relación laboral es el momento de mayor riesgo jurídico de todo el vínculo, y también el que más se improvisa. Un despido mal hecho convierte una decisión legítima en una indemnización o en una reposición; una liquidación mal calculada convierte un cese ordenado en un juicio.

# La suspensión del contrato
$ Suspensión PERFECTA: cesan la obligación de prestar el servicio Y la de pagar la remuneración
$ Suspensión IMPERFECTA: el empleador paga la remuneración sin contraprestación efectiva

|Causal (art. 12 de la LPCL)|Tipo|
|Invalidez temporal|Perfecta|
|Enfermedad y accidente comprobados|Imperfecta los primeros 20 días (paga el empleador), luego subsidio de EsSalud|
|Maternidad durante el descanso pre y posnatal|Subsidio de EsSalud|
|**Descanso vacacional**|**Imperfecta**|
|Licencia para desempeñar cargo cívico o servicio militar|Perfecta|
|Permiso sindical|Según el convenio|
|Sanción disciplinaria (suspensión sin goce)|Perfecta|
|Ejercicio del derecho de huelga|Perfecta|
|Detención del trabajador, salvo condena privativa de libertad|Perfecta|
|Inhabilitación administrativa o judicial **no superior a 3 meses**|Perfecta|
|Permiso o licencia concedidos por el empleador|Según se acuerde|
|**Caso fortuito y fuerza mayor**|Perfecta, hasta **90 días**, con comunicación a la AAT|

! La suspensión por **caso fortuito o fuerza mayor** (art. 15) exige que el empleador **primero** otorgue vacaciones vencidas y anticipadas y adopte otras medidas que eviten agravar la situación. Solo si ello resulta insuficiente puede suspender, por hasta 90 días, comunicándolo a la Autoridad Administrativa de Trabajo, que puede verificar la causal.

# Las causas de extinción (art. 16 de la LPCL)
|Causa|Observación|
|**Fallecimiento** del trabajador o del empleador persona natural|Extinción automática|
|**Renuncia** o retiro voluntario|Preaviso de **30 días**, que el empleador puede exonerar|
|**Terminación de la obra o servicio**, cumplimiento de la condición resolutoria o **vencimiento del plazo**|Solo en contratos modales válidos|
|**Mutuo disenso**|Debe constar por escrito|
|**Invalidez absoluta permanente**|Declarada por EsSalud|
|**Jubilación**|Obligatoria a los **70 años**, salvo pacto en contrario|
|**Despido** por causa justa|Con el procedimiento del art. 31|
|**Cese colectivo** por causas objetivas|Con el procedimiento del art. 46 y siguientes|

> La **renuncia** requiere preaviso de treinta días, y el empleador puede exonerarlo expresa o tácitamente: si no responde dentro de tres días, se entiende aceptada la exoneración. El trabajador que renuncia **no tiene derecho a indemnización**, lo que explica por qué algunos empleadores presionan para obtener una renuncia. Esa presión, si se acredita, convierte la renuncia en un despido encubierto.

# El despido por causa justa
Las causas se dividen en dos grupos, con procedimientos distintos:

|Grupo|Causas|
|**Relacionadas con la CAPACIDAD** (art. 23)|Detrimento de la facultad física o mental, o ineptitud sobrevenida; **rendimiento deficiente** en relación con la capacidad del trabajador y el rendimiento promedio en labores similares; negativa injustificada a someterse a examen médico o a cumplir medidas profilácticas|
|**Relacionadas con la CONDUCTA** (art. 24)|Comisión de **falta grave**; condena penal por delito doloso; inhabilitación del trabajador|

# Las faltas graves (art. 25)
|Falta grave|Detalle relevante|
|**Incumplimiento de obligaciones de trabajo** que supone el quebrantamiento de la buena fe laboral|Incluye la reiterada resistencia a las órdenes, la reiterada paralización intempestiva de labores y la inobservancia del reglamento interno o del de seguridad y salud|
|**Apropiación** consumada o frustrada de bienes del empleador|También la retención o utilización indebida|
|**Uso o entrega a terceros de información reservada**|O la sustracción o utilización no autorizada de documentos|
|**Concurrencia reiterada en estado de embriaguez** o bajo influencia de drogas|Si es especialmente grave por la naturaleza de la labor, basta una sola vez|
|**Actos de violencia, grave indisciplina, injuria y faltamiento de palabra** verbal o escrita|Contra el empleador, sus representantes, el personal jerárquico u otros trabajadores|
|**Daño intencional** a edificios, instalaciones, maquinarias y demás bienes|—|
|**Abandono de trabajo** por más de **3 días consecutivos**|O ausencias injustificadas por más de **5 días** en un periodo de **30 días calendario**, o más de **15 días** en un periodo de **180 días calendario**|
|**Hostigamiento sexual**|Cometido por el empleador, sus representantes o quien ejerza autoridad|

# El procedimiento de despido (art. 31): lo que no se puede improvisar
$ PASO 1 — CARTA DE PREAVISO (imputación de cargos)
$ PASO 2 — PLAZO PARA DESCARGOS: no menos de 6 DÍAS NATURALES
$ (o 30 días naturales si la causa es de capacidad, para que demuestre su capacidad o corrija)
$ PASO 3 — EVALUACIÓN de los descargos
$ PASO 4 — CARTA DE DESPIDO, con la causa y la fecha de cese

|Requisito de la carta de preaviso|Por qué|
|Describir los **hechos** imputados con precisión: qué, cuándo, dónde, cómo|Una imputación genérica impide defenderse y anula el despido|
|Señalar la **falta grave** o la causa invocada, con su norma|Define el marco de la defensa|
|Otorgar el **plazo** para descargos|Es el derecho de defensa|
|Estar **firmada y notificada** con constancia|La notificación defectuosa anula el procedimiento|

! **No se puede ampliar la causa después.** La carta de despido solo puede sustentarse en los hechos y la causa imputados en el preaviso. Si durante la investigación aparece otra falta, hay que imputarla en un nuevo preaviso, no agregarla en la carta de despido.

**La exoneración del preaviso:** el empleador puede exonerar del plazo de descargos cuando la falta grave sea **flagrante** y resulte **irrazonable** la permanencia del trabajador, o cuando esa permanencia pueda agravar la situación. La exoneración debe sustentarse; usarla por comodidad es un vicio del procedimiento.

> **El historial disciplinario es la prueba del despido.** Una falta por "reiterada resistencia a las órdenes" exige acreditar la reiteración, y eso solo se prueba con memorandos previos, llamadas de atención documentadas y sanciones anteriores notificadas. Una empresa que nunca documentó una amonestación no puede despedir por reiteración, aunque la conducta exista. El expediente individual que se construye durante años es lo que hace posible un despido válido.

# El despido nulo (art. 29)
|Causal|Consecuencia|
|Afiliación a un sindicato o participación en actividades sindicales|**Reposición** y pago de remuneraciones devengadas|
|Ser candidato a representante de los trabajadores o actuar como tal|Idem|
|Presentar una queja o participar en un proceso contra el empleador|Idem|
|**Discriminación** por sexo, raza, religión, opinión, idioma o discapacidad|Idem|
|**Embarazo**, nacimiento y sus consecuencias, o la **lactancia**, si el despido se produce en cualquier momento del periodo de gestación o dentro de los **90 días posteriores** al parto|Idem|
|Ser **portador de VIH/SIDA**|Idem|
|**Diagnóstico de cáncer**|Incorporado por el **D.S. 008-2026-TR**|

$ Despido nulo → REPOSICIÓN en el puesto + remuneraciones devengadas
$ Despido arbitrario → INDEMNIZACIÓN

La diferencia es decisiva: el despido nulo no se "compra" con dinero, obliga a reponer al trabajador. Y la presunción opera a favor del trabajador en los supuestos de embarazo y lactancia, de modo que el empleador debe acreditar una causa justa real para cesar a una trabajadora en ese periodo.

# El despido arbitrario y su indemnización
$ Despido arbitrario = sin expresión de causa, o sin poder demostrar la causa en juicio

|Tipo de contrato|Indemnización|
|**Plazo indeterminado**|**1.5 remuneraciones mensuales** por cada año completo de servicios, con fracciones por **dozavos y treintavos**. **Tope: 12 remuneraciones**|
|**Plazo fijo (modal)**|**1.5 remuneraciones** por cada **mes dejado de laborar** hasta el vencimiento del contrato. **Tope: 12 remuneraciones**|

$ Ejemplo: trabajador con 6 años y 4 meses, remuneración de S/ 3,000
$ 6 años × 1.5 = 9 remuneraciones
$ 4 meses × (1.5 ÷ 12) = 0.5 remuneraciones
$ Total = 9.5 remuneraciones × 3,000 = S/ 28,500

$ Plazo de caducidad para impugnar el despido: 30 DÍAS NATURALES desde que se produjo

# El despido indirecto: los actos de hostilidad (art. 30)
|Acto de hostilidad|Detalle|
|Falta de pago de la remuneración en la oportunidad correspondiente|Salvo razones de fuerza mayor o caso fortuito|
|**Reducción inmotivada** de la remuneración o de la categoría|La reducción consentida y motivada es válida|
|**Traslado** del trabajador a lugar distinto con el propósito de perjudicarlo|El traslado razonable y de buena fe no es hostilidad|
|Inobservancia de medidas de **seguridad y salud en el trabajo**|—|
|Actos de **violencia** o faltamiento de palabra grave|—|
|Actos contra la **moral** y todos los que afecten la dignidad del trabajador|—|
|**Hostigamiento sexual**|Con su procedimiento especial|
|Actos de **discriminación**|Por las causales prohibidas|

$ El trabajador debe EMPLAZAR al empleador por escrito, otorgando no menos de 6 DÍAS
$ para que enmiende su conducta. Luego puede optar por:
$ (a) la cesación del acto de hostilidad, o
$ (b) la TERMINACIÓN del contrato, con derecho a la indemnización por despido arbitrario

# El cese colectivo por causas objetivas (art. 46)
|Causa|Requisito|
|**Caso fortuito o fuerza mayor**|Procedimiento ante la AAT con inspección|
|**Motivos económicos, tecnológicos, estructurales o análogos**|Debe comprender **no menos del 10%** del total de trabajadores, con pericia de parte, negociación con los representantes y aprobación de la AAT|
|**Disolución y liquidación** de la empresa, y **quiebra**|—|
|**Reestructuración patrimonial**|Conforme a la ley de la materia|

El cese colectivo es un procedimiento formal, con intervención de la autoridad, no una decisión unilateral. Su incumplimiento convierte los ceses en despidos arbitrarios individuales.

# La liquidación de beneficios sociales
$ Plazo: la liquidación debe entregarse y los beneficios pendientes pagarse
$ dentro de las 48 HORAS de producido el cese

|Concepto|Cálculo|
|**Remuneración pendiente**|Días laborados del mes|
|**Gratificación trunca**|Un sexto por mes calendario completo del semestre en curso, más la bonificación extraordinaria del 9%|
|**Vacaciones truncas**|Un dozavo por mes completo y un trescientosesentavo por día, sobre la remuneración vigente|
|**CTS trunca**|Desde el último depósito hasta el cese, con la base que incluye un sexto de la última gratificación|
|**Utilidades**|Si corresponde, se pagan en la oportunidad legal|
|**Indemnización**|Solo si el cese fue despido arbitrario, despido indirecto o cese de contrato modal anticipado|
|**Vacaciones no gozadas vencidas**|Con la indemnización adicional, si corresponde|

**Documentos que deben entregarse al cese:**
1. **Liquidación de beneficios sociales**, detallada por concepto.
2. **Certificado de trabajo**, con el tiempo de servicios y la labor desempeñada.
3. **Constancia de cese**, para que el trabajador pueda disponer de su CTS.
4. **Certificado de retenciones** de quinta categoría del ejercicio.
5. **Baja en el T-Registro**, dentro del primer día hábil siguiente.

! Retener la **constancia de cese** para presionar al trabajador es una práctica frecuente e indebida: sin ella no puede retirar su CTS, que es su propio dinero. Configura un acto de hostilidad y una infracción.

# El protocolo de un cese bien hecho
1. **Determinar la causa real** y verificar que encaje en una causal legal, antes de cualquier comunicación.
2. **Revisar el expediente del trabajador**: ¿hay historial disciplinario documentado que sustente la reiteración, si la causa lo exige?
3. **Verificar las causales de nulidad**: ¿está embarazada, en periodo de lactancia, es dirigente sindical, tiene un proceso contra la empresa, tiene un diagnóstico protegido?
4. **Redactar la carta de preaviso** con hechos precisos y la causa invocada.
5. **Notificar con constancia** y otorgar el plazo de descargos.
6. **Evaluar los descargos por escrito**, con una conclusión motivada.
7. **Emitir la carta de despido** solo sobre los hechos imputados, con la fecha de cese.
8. **Liquidar dentro de 48 horas** y entregar los cinco documentos.
9. **Registrar la baja** en el T-Registro al día siguiente hábil.
10. **Archivar el expediente completo** del procedimiento: es la prueba si el trabajador impugna dentro de los 30 días.

$ El paso 3 es el que evita el desastre: un despido con causa justa perfecta
$ es NULO si el trabajador está en un supuesto protegido`,
  claves:['La suspensión puede ser perfecta (sin prestación ni pago) o imperfecta (con pago sin prestación efectiva).','El despido por causa justa exige carta de preaviso con hechos precisos, plazo de descargos de no menos de 6 días y carta de despido que no puede ampliar la causa.','El despido nulo obliga a reponer al trabajador; el arbitrario solo genera indemnización de 1.5 remuneraciones por año, con tope de 12.','Los actos de hostilidad permiten al trabajador emplazar y optar por el cese del acto o por la terminación con indemnización.','La liquidación de beneficios debe entregarse y pagarse dentro de las 48 horas del cese, con los cinco documentos obligatorios.'],
  preg:[
   {p:'¿Por qué la carta de despido no puede invocar hechos distintos a los del preaviso?',
    r:'Porque el preaviso existe para que el trabajador pueda **defenderse**, y solo puede defenderse de lo que se le imputó. Si la carta de despido agrega hechos nuevos, el trabajador nunca tuvo oportunidad de responderlos, y eso vulnera el derecho de defensa que el procedimiento está diseñado para garantizar. La consecuencia es que el despido se declara improcedente por vicio del procedimiento, con independencia de que los hechos nuevos fueran reales y graves. Si durante la investigación aparece otra falta, el camino correcto es imputarla en un **nuevo preaviso**, con su propio plazo de descargos. Es más lento, pero es lo único que resiste.'},
   {p:'¿Cuál es la diferencia práctica entre un despido nulo y un despido arbitrario?',
    r:'El despido **arbitrario** es el que se produce sin expresión de causa o sin poder demostrarla: la ley lo sanciona con una **indemnización** de 1.5 remuneraciones por año de servicios, con tope de 12. Es, en términos crudos, un despido que se puede pagar. El despido **nulo** es el que se funda en una causa prohibida —afiliación sindical, embarazo o lactancia, discriminación, represalia por un proceso contra la empresa, VIH, diagnóstico de cáncer—: su sanción es la **reposición** en el puesto más el pago de las remuneraciones devengadas durante todo el periodo de separación. No se puede "comprar". Por eso la verificación de causales de nulidad debe hacerse **antes** de iniciar cualquier procedimiento: un despido con causa justa impecable sigue siendo nulo si el trabajador está en un supuesto protegido.'},
   {p:'¿Por qué el historial disciplinario documentado es indispensable para despedir?',
    r:'Porque varias faltas graves exigen **reiteración**, y la reiteración solo se prueba con documentos: memorandos, llamadas de atención y sanciones anteriores, todos notificados con constancia. Una empresa que durante tres años toleró la impuntualidad sin documentar nada no puede despedir por "reiterada resistencia a las órdenes", aunque la conducta sea real y conocida por todos: no tiene con qué probarla, y además la tolerancia prolongada debilita la gravedad de la falta. El expediente individual que se construye año a año es lo que convierte una decisión legítima en un despido válido. Es un ejemplo más del principio que gobierna todo el derecho laboral práctico: la prueba se construye mientras la relación existe, no cuando termina.'},
   {p:'Un trabajador lleva tres meses sin que le paguen la remuneración. ¿Cuáles son sus opciones?',
    r:'La falta de pago de la remuneración en la oportunidad correspondiente es un **acto de hostilidad** del artículo 30, salvo razones de fuerza mayor o caso fortuito. El trabajador debe **emplazar por escrito** al empleador, otorgándole un plazo de no menos de seis días naturales para que enmiende su conducta. Vencido ese plazo sin corrección, puede optar por dos caminos: (a) demandar el **cese del acto de hostilidad**, manteniendo el vínculo, o (b) dar por **terminado el contrato**, con derecho a la **indemnización por despido arbitrario**, que es la figura del despido indirecto. La elección es del trabajador. Para el empleador, la lección es que dejar de pagar remuneraciones no solo genera la deuda: habilita la terminación del vínculo con indemnización, como si hubiera despedido.'},
   {p:'¿Por qué la liquidación debe pagarse en 48 horas y qué pasa si no se cumple?',
    r:'Porque el trabajador que cesa pierde su fuente de ingresos de inmediato, y los beneficios sociales son precisamente la previsión para ese momento. El plazo de 48 horas desde el cese busca que no quede sin recursos mientras espera. Su incumplimiento tiene tres consecuencias: genera **intereses legales laborales** sobre los montos impagos, configura una **infracción** sancionable por SUNAFIL, y si además se retiene la **constancia de cese** —que es lo que permite al trabajador disponer de su CTS— se agrega un acto que puede calificarse de hostilidad. En la práctica, demorar la liquidación es la forma más rápida de convertir un cese pacífico en una demanda, porque es el momento en que el trabajador, sin ingresos, consulta a un abogado.'}
  ],
  ej:[
   {l:1,t:'num',p:'Un trabajador con 5 años y 8 meses de servicios y remuneración de S/ 2,800 es despedido arbitrariamente. Calcula su indemnización.',
    u:'S/',r:23800,tol:100,
    s:'$ Indemnización = 1.5 remuneraciones por año completo + dozavos por meses + treintavos por días\n\n| Periodo | Cálculo | Remuneraciones |\n|---|---|---|\n| 5 años completos | 5 × 1.5 | 7.50 |\n| 8 meses | 8 × (1.5 ÷ 12) = 8 × 0.125 | 1.00 |\n| **Total** | | **8.50** |\n\n**Indemnización = 8.50 × 2,800 = S/ 23,800**\n\nVerificación del tope: el máximo es de **12 remuneraciones**, es decir S/ 33,600. Las 8.50 remuneraciones están por debajo, de modo que corresponde el importe completo.\n\nNota importante: la indemnización por despido arbitrario es **adicional** a la liquidación de beneficios sociales. El trabajador recibe además su CTS trunca, su gratificación trunca, sus vacaciones truncas y la remuneración de los días laborados. Y la indemnización, por su naturaleza indemnizatoria, está inafecta a aportes previsionales y de salud.'},
   {l:1,t:'mc',p:'Una trabajadora embarazada comete una falta grave debidamente acreditada. ¿Puede ser despedida?',
    o:['No, el embarazo impide todo despido','Sí, pero el empleador debe acreditar la causa justa real, porque el despido en ese periodo se presume nulo','Sí, sin ninguna consideración especial','Solo con autorización del Ministerio de Trabajo'],r:1,
    s:'**Sí puede, pero con una carga probatoria agravada.** El artículo 29 establece la nulidad del despido por embarazo, nacimiento y sus consecuencias o la lactancia, si se produce en cualquier momento del periodo de gestación o dentro de los **90 días posteriores al parto**. En ese periodo opera una **presunción**: se presume que el despido tuvo por motivo el embarazo, salvo que el empleador acredite la existencia de **causa justa real**.\n\nEn la práctica, eso significa que el procedimiento debe ser impecable: hechos precisos en el preaviso, prueba sólida de la falta, descargos evaluados por escrito, y un expediente que demuestre que la decisión se habría tomado igual con cualquier trabajador. Si la prueba es débil, el despido se declara nulo y corresponde **reposición** más remuneraciones devengadas, no indemnización.\n\nLa recomendación profesional en estos casos es siempre la misma: asesoría legal antes de iniciar el procedimiento, no después.'},
   {l:2,t:'ab',p:'Redacta la carta de preaviso de despido de un trabajador que ha tenido tres ausencias injustificadas en el último mes y dos llamadas de atención previas por el mismo motivo. Identifica los riesgos del caso.',
    s:'**Primero, el análisis de viabilidad, que debe hacerse antes de escribir una sola línea.**\n\n| Verificación | Resultado en el caso |\n|---|---|\n| ¿Las ausencias configuran la falta grave del art. 25? | **No por el número**: la falta exige más de 5 días de ausencias injustificadas en 30 días calendario, o más de 15 en 180 días. Tres ausencias **no alcanzan** ese umbral |\n| ¿Hay otra causal aplicable? | Sí: **incumplimiento de obligaciones de trabajo que supone el quebrantamiento de la buena fe laboral**, en su forma de **reiterada resistencia a las órdenes**, acreditada con las dos llamadas de atención previas |\n| ¿Existe historial documentado? | Sí: dos llamadas de atención previas por el mismo motivo. **Es la base de la reiteración** |\n| ¿Hay causal de nulidad? | **Verificar antes de todo**: embarazo o lactancia, cargo sindical, proceso contra la empresa, diagnóstico protegido |\n| ¿Las llamadas de atención fueron notificadas con constancia? | **Decisivo**: sin constancia de recepción, no prueban nada |\n\n**La conclusión del análisis:** el caso es viable por **reiteración**, no por el número de ausencias. Y esa distinción cambia la redacción completa de la carta. Un preaviso que invoque la causal de ausencias injustificadas con solo tres faltas sería desestimado sin más.\n\n**La carta de preaviso:**\n\n---\n\n[Ciudad], [fecha]\n\nSeñor [nombre completo]\n[Cargo]\nPresente.\n\n**Asunto: Imputación de cargos por falta grave y otorgamiento de plazo para descargos**\n\nDe nuestra consideración:\n\nPor medio de la presente le comunicamos que la empresa ha tomado conocimiento de hechos que, a su criterio, configurarían la falta grave prevista en el **inciso a) del artículo 25 del D.S. 003-97-TR**, consistente en el incumplimiento de las obligaciones de trabajo que supone el quebrantamiento de la buena fe laboral, en su modalidad de **reiterada resistencia a las órdenes relacionadas con las labores**.\n\nLos hechos que se le imputan son los siguientes:\n\n**1.** El día [fecha], usted no se presentó a laborar durante su turno de [horario], sin haber comunicado previamente su inasistencia ni haber presentado posteriormente justificación alguna, conforme consta en el registro de control de asistencia de esa fecha y en el reporte de su jefatura inmediata.\n\n**2.** El día [fecha], usted no se presentó a laborar durante su turno de [horario], en las mismas circunstancias descritas, conforme consta en el registro de control de asistencia y en el reporte respectivo.\n\n**3.** El día [fecha], usted no se presentó a laborar durante su turno de [horario], en las mismas circunstancias, conforme consta en el registro de control de asistencia y en el reporte respectivo.\n\nEstos hechos revisten especial gravedad por cuanto se producen **de manera reiterada y luego de que la empresa le hiciera dos observaciones formales previas** por la misma conducta, a saber:\n\n- Llamada de atención de fecha [fecha], recibida por usted el [fecha], mediante la cual se le observó la inasistencia injustificada del [fecha] y se le requirió el cumplimiento de su obligación de asistencia.\n- Llamada de atención de fecha [fecha], recibida por usted el [fecha], mediante la cual se le observó la inasistencia injustificada del [fecha], se le reiteró dicho requerimiento y se le advirtió que la persistencia en esa conducta daría lugar a la aplicación de las medidas disciplinarias correspondientes.\n\nLas inasistencias reiteradas afectan directamente la continuidad de las operaciones del área de [área], al impedir la cobertura del turno asignado y obligar a la reasignación de labores a otros trabajadores.\n\nEn aplicación del **artículo 31 del D.S. 003-97-TR**, se le otorga el plazo de **seis (6) días naturales**, contados a partir del día siguiente de la recepción de la presente, para que formule por escrito los descargos que estime pertinentes y presente las pruebas que considere convenientes.\n\nSus descargos serán evaluados antes de adoptar cualquier decisión. Durante este plazo usted continuará prestando sus servicios con normalidad.\n\nAtentamente,\n\n[Nombre y firma del representante del empleador]\n\n*Recibí conforme: [firma del trabajador], fecha y hora*\n\n---\n\n**Los siete riesgos del caso y cómo se controlan:**\n\n| Nº | Riesgo | Control |\n|---|---|---|\n| 1 | Que las llamadas de atención **no tengan constancia de recepción** | Sin ellas se cae la reiteración, que es el eje de la imputación. Verificar antes de notificar el preaviso |\n| 2 | Que el trabajador justifique las ausencias en sus descargos (descanso médico, emergencia familiar, licencia) | Evaluar los descargos de buena fe y por escrito. Si la justificación es válida, **no despedir** |\n| 3 | Que exista una **causal de nulidad** no detectada | Verificarla antes de notificar: embarazo, lactancia, cargo sindical, proceso contra la empresa, diagnóstico protegido |\n| 4 | Que la empresa haya **tolerado** ausencias de otros trabajadores sin sancionarlas | Configura trato discriminatorio y debilita la gravedad. Revisar la consistencia del régimen disciplinario |\n| 5 | Que el **registro de asistencia** no exista o sea inconsistente | Es la prueba de las ausencias. Sin registro, la imputación no se sostiene |\n| 6 | Invocar la causal de **ausencias injustificadas** por número | Es el error técnico del caso: tres ausencias no alcanzan el umbral legal. La causal correcta es la reiterada resistencia |\n| 7 | **Ampliar la causa** en la carta de despido | Prohibido. Solo se puede despedir por los hechos imputados en este preaviso |\n\n**Y la recomendación de fondo, que suele ser la más valiosa:** con tres ausencias y dos llamadas de atención, el caso es defendible pero no robusto. Una **suspensión disciplinaria** documentada, como paso intermedio antes del despido, fortalecería enormemente un procedimiento futuro: acreditaría la progresividad de la sanción y la tolerancia agotada. Despedir con el expediente justo al límite es ganar un juicio por poco; despedir con el expediente completo es no tener juicio.'},
   {l:2,t:'num',p:'Calcula la liquidación completa de un trabajador que cesa el 15 de septiembre. Ingresó el 1 de marzo de 2023, remuneración de S/ 2,400 más asignación familiar, último depósito de CTS en mayo, última gratificación S/ 2,523. Fue despedido arbitrariamente.',
    u:'S/',r:18052,tol:200,
    s:'**Remuneración computable** = 2,400 + 123 = **S/ 2,523**\n**Tiempo de servicios** al 15/09: del 01/03/2023 al 15/09 = **3 años, 6 meses y 15 días**\n\n**1. Remuneración de los días laborados de septiembre**\n2,523 ÷ 30 × 15 días = **S/ 1,261.50**\n\n**2. Gratificación trunca** (semestre julio-diciembre: julio y agosto completos = 2 meses)\n2,523 ÷ 6 × 2 = 841.00\nBonificación extraordinaria 9% = 841 × 9% = 75.69\n**Subtotal = S/ 916.69**\n\n**3. Vacaciones truncas** (desde el último periodo cumplido el 28/02; marzo a agosto = 6 meses completos + 15 días)\nPor meses: 2,523 ÷ 12 × 6 = 1,261.50\nPor días: 2,523 ÷ 360 × 15 = 105.13\n**Subtotal = S/ 1,366.63**\n\n**4. CTS trunca** (desde el 1 de mayo hasta el 15 de septiembre = 4 meses y 15 días)\nBase computable = 2,523 + (2,523 ÷ 6) = 2,523 + 420.50 = **2,943.50**\nPor meses: 2,943.50 ÷ 12 × 4 = 981.17\nPor días: 2,943.50 ÷ 360 × 15 = 122.65\n**Subtotal = S/ 1,103.82**\n\n**5. Indemnización por despido arbitrario**\n3 años completos × 1.5 = 4.50 remuneraciones\n6 meses × 0.125 = 0.75 remuneraciones\n15 días × (1.5 ÷ 360) = 0.0625 remuneraciones\nTotal = 5.3125 remuneraciones\n5.3125 × 2,523 = **S/ 13,403.44**\nVerificación del tope de 12 remuneraciones (S/ 30,276): está por debajo ✓\n\n**RESUMEN DE LA LIQUIDACIÓN**\n\n| Concepto | Importe | Afectación |\n|---|---|---|\n| Remuneración de septiembre (15 días) | 1,261.50 | Afecta a aportes y a quinta |\n| Gratificación trunca con bonificación | 916.69 | Inafecta a aportes, gravada con quinta |\n| Vacaciones truncas | 1,366.63 | Afecta a aportes y a quinta |\n| CTS trunca | 1,103.82 | Inafecta a aportes y a quinta |\n| **Subtotal de beneficios** | **4,648.64** | |\n| Indemnización por despido arbitrario | 13,403.44 | **Inafecta a aportes**; no constituye renta gravada |\n| **TOTAL DE LA LIQUIDACIÓN** | **18,052.08** | |\n\nMenos los descuentos que correspondan sobre los conceptos afectos (aportes previsionales y retención de quinta sobre la remuneración, las vacaciones truncas y la gratificación trunca).\n\n**Las obligaciones que acompañan al pago:**\n\n| Obligación | Plazo |\n|---|---|\n| Entregar la liquidación detallada y pagar | **48 horas** del cese |\n| Entregar certificado de trabajo | Al cese |\n| Entregar **constancia de cese** (para retirar la CTS) | Al cese. Retenerla es un acto indebido |\n| Entregar certificado de retenciones de quinta | Al cese o cuando lo solicite |\n| **Baja en el T-Registro** | Primer día hábil siguiente |\n\n**El plazo que corre a partir de aquí:** el trabajador tiene **30 días naturales** para impugnar el despido. Durante ese periodo, el expediente completo del procedimiento debe estar archivado y disponible: carta de preaviso con constancia de recepción, descargos, evaluación escrita, carta de despido, liquidación firmada y los cinco documentos entregados.'},
   {l:3,t:'ab',p:'Una empresa necesita reducir su personal de 80 a 60 trabajadores por una caída sostenida de ventas del 40%. Analiza las vías disponibles, sus requisitos, costos y riesgos, y recomienda una estrategia.',
    s:'**El encargo tiene tres vías posibles, con costos y riesgos muy distintos. Hay que evaluarlas las tres.**\n\n**VÍA 1 — Cese colectivo por motivos económicos (art. 46 inciso b de la LPCL)**\n\n| Requisito | Situación en el caso |\n|---|---|\n| Comprender **no menos del 10%** del total de trabajadores | 20 de 80 = **25%**: cumple holgadamente |\n| **Pericia de parte** que acredite la causa económica | Debe elaborarla un profesional, con los estados financieros y el análisis de la caída de ventas |\n| **Negociación previa** con el sindicato o los representantes de los trabajadores | Obligatoria, con propuestas de medidas alternativas |\n| **Procedimiento ante la AAT**, con inspección y aprobación | Plazos propios; la autoridad puede verificar la causal |\n| Medidas previas | Debe acreditarse que se intentaron alternativas: vacaciones, reducción de jornada, suspensión |\n\n| Aspecto | Valoración |\n|---|---|\n| **Costo** | El más bajo: no corresponde indemnización por despido arbitrario, solo la liquidación de beneficios |\n| **Plazo** | El más largo: el procedimiento administrativo toma meses |\n| **Riesgo** | Si la AAT no aprueba o la causal no se acredita, los ceses se convierten en **despidos arbitrarios individuales**, con indemnización para los 20 |\n| **Requisito crítico** | La **pericia** debe ser sólida. Una caída de ventas del 40% sostenida es una base razonable, pero debe documentarse con estados financieros auditados o al menos consistentes, y con el análisis de por qué la reducción de personal es necesaria y proporcional |\n\n**VÍA 2 — Mutuo disenso con incentivos (renuncias negociadas)**\n\n| Aspecto | Valoración |\n|---|---|\n| **Mecanismo** | Acuerdo escrito de terminación, con un incentivo económico |\n| **Costo** | Negociable. Suele ubicarse entre el 50% y el 100% de la indemnización que correspondería |\n| **Plazo** | El más rápido: semanas |\n| **Riesgo** | **Medio-alto si se ejerce presión.** Un mutuo disenso obtenido bajo coacción puede impugnarse como despido encubierto. La voluntariedad debe ser real y demostrable |\n| **Requisitos de validez** | Acuerdo **por escrito**, con el monto del incentivo, sin presión acreditable, idealmente con asesoría independiente del trabajador y un plazo de reflexión |\n| **Ventaja adicional** | El incentivo por cese voluntario tiene un tratamiento tributario específico que conviene verificar al estructurarlo |\n\n**VÍA 3 — Despidos arbitrarios con pago de indemnización**\n\n| Aspecto | Valoración |\n|---|---|\n| **Mecanismo** | Cese sin expresión de causa, pagando la indemnización legal |\n| **Costo** | 1.5 remuneraciones por año, tope 12, por cada trabajador. Con antigüedad promedio de 5 años y remuneración promedio de S/ 2,500: 7.5 × 2,500 × 20 = **S/ 375,000** |\n| **Plazo** | Inmediato |\n| **Riesgo** | **El más alto**: el trabajador puede alegar nulidad si está en un supuesto protegido, y entonces corresponde **reposición**, no indemnización. Con 20 ceses, la probabilidad de que alguno esté protegido es alta |\n| **Cuándo se justifica** | Solo cuando la urgencia es extrema y las otras vías no son viables |\n\n**COMPARACIÓN**\n\n| Vía | Costo estimado | Plazo | Riesgo principal |\n|---|---|---|---|\n| Cese colectivo | Solo liquidaciones (~S/ 120,000) | 3 a 6 meses | Que la AAT no apruebe → 20 despidos arbitrarios |\n| Mutuo disenso | Liquidaciones + incentivos (~S/ 250,000 a 310,000) | 1 a 2 meses | Impugnación por coacción |\n| Despidos arbitrarios | Liquidaciones + indemnizaciones (~S/ 495,000) | Inmediato | Nulidad y reposición de los protegidos |\n\n**LA ESTRATEGIA RECOMENDADA: secuencia combinada**\n\n**Fase 0 — Antes de cualquier cese: agotar las alternativas, que además es un requisito legal**\n\n| Medida | Efecto |\n|---|---|\n| Otorgar **vacaciones vencidas y pendientes** | Reduce costo inmediato y elimina el pasivo de triple remuneración |\n| Evaluar la **reducción consensuada de jornada y remuneración** | Con acuerdo escrito y motivado. Puede evitar ceses |\n| Revisar **sobretiempo** y eliminarlo | Reducción inmediata de costo sin ceses |\n| Evaluar la **suspensión perfecta** si hay causa que lo justifique | Medida temporal mientras se decide |\n| No renovar **contratos modales** que venzan | La vía de menor costo y menor riesgo: el vencimiento del plazo es causa legal de extinción |\n\n**Esta fase 0 puede resolver una parte importante de las 20 reducciones sin un solo despido**, y es además requisito para que el cese colectivo sea aprobado.\n\n**Fase 1 — Identificar y excluir a los trabajadores protegidos**\n\nAntes de nada: embarazadas y trabajadoras en los 90 días posteriores al parto, dirigentes y candidatos sindicales, trabajadores con procesos contra la empresa, portadores de VIH, trabajadores con **diagnóstico de cáncer** (D.S. 008-2026-TR), trabajadores con discapacidad. Cesar a cualquiera de ellos sin causa justa real genera **reposición**.\n\n**Fase 2 — Ofrecer mutuo disenso con incentivo, de forma genuinamente voluntaria**\n\n- Comunicación transparente de la situación de la empresa.\n- Oferta con incentivo definido, igual para todos en la misma situación.\n- **Plazo de reflexión** y recomendación expresa de que consulten asesoría.\n- Sin ninguna forma de presión: la voluntariedad es el requisito de validez.\n- Documentación impecable de cada acuerdo.\n\nEs habitual que una parte del personal acepte, sobre todo quienes tienen otros planes.\n\n**Fase 3 — Cese colectivo por el remanente**\n\nSi tras la fase 0 y la fase 2 aún falta reducir personal, iniciar el procedimiento de cese colectivo con la pericia bien elaborada. Los criterios de selección deben ser **objetivos y documentados** —áreas afectadas, funciones prescindibles, antigüedad, polivalencia— y nunca basados en características personales, porque eso configuraría discriminación.\n\n**Fase 4 — Ejecución y cierre**\n\n- Liquidaciones dentro de **48 horas** de cada cese.\n- Los **cinco documentos** a cada trabajador, incluida la constancia de cese.\n- **Bajas en el T-Registro** al día hábil siguiente.\n- Expediente completo archivado de cada caso, por el plazo de impugnación y más allá.\n\n**El punto que debe quedar claro en el informe a la gerencia:** la vía más barata (cese colectivo) es la más lenta y exige una pericia sólida; la más rápida (despido arbitrario) es la más cara y la más riesgosa. La secuencia combinada, empezando por agotar las alternativas y por no renovar contratos modales, suele reducir el número de ceses necesarios en un tercio antes de llegar a cualquier despido. Y en todos los escenarios, la verificación de trabajadores protegidos es el paso que no se puede omitir: un solo caso de reposición puede costar más que todo el ahorro del programa.'}
  ],
  proy:{
   t:'Protocolo de cese y liquidación de tu empresa',
   ctx:`Vas a preparar el procedimiento que tu empresa necesita para terminar una relación laboral sin convertirla en un juicio, y a liquidar un cese completo.`,
   pasos:[
    'Elabora el protocolo de cese de diez pasos adaptado a tu empresa, con el responsable de cada paso y el documento que lo acredita.',
    'Redacta el modelo de carta de preaviso de despido, con los campos a completar y la nota de los requisitos que no pueden faltar.',
    'Redacta el modelo de carta de despido, con la advertencia expresa de que no puede ampliar la causa imputada en el preaviso.',
    'Elabora la lista de verificación de causales de nulidad, que debe revisarse antes de iniciar cualquier procedimiento.',
    'Diseña el formato de llamada de atención y de suspensión disciplinaria, con constancia de recepción, para construir el historial que sustenta un despido futuro.',
    'Liquida completamente el cese de uno de los trabajadores de tu plantilla a una fecha que elijas: remuneración de los días, gratificación trunca con bonificación, vacaciones truncas, CTS trunca e indemnización si corresponde.',
    'Registra en el Libro Diario los asientos de la liquidación, distinguiendo los conceptos afectos de los inafectos.',
    'Elabora el juego completo de los cinco documentos que deben entregarse al cese.',
    'Calcula el costo de un despido arbitrario de cada puesto de tu plantilla y preséntalo a la gerencia como cuadro de exposición.'
   ],
   entrega:[
    'El protocolo de cese de diez pasos con responsables y documentos.',
    'Los modelos de carta de preaviso, carta de despido, llamada de atención y suspensión disciplinaria.',
    'La liquidación completa de un cese, con sus asientos contables.',
    'Los cinco documentos del cese y el cuadro de exposición por despido arbitrario.'
   ],
   crit:[
    'La lista de verificación de nulidad se ubica antes de la redacción del preaviso en el protocolo, no después.',
    'La liquidación distingue correctamente los conceptos afectos a aportes y a quinta de los inafectos.',
    'El cuadro de exposición cuantifica el costo por puesto, con el tope de 12 remuneraciones verificado.'
   ],
   pista:'El cuadro de exposición por despido arbitrario es información que la gerencia casi nunca tiene y siempre agradece: saber que cesar a un trabajador con diez años de antigüedad cuesta doce remuneraciones cambia por completo la forma de tomar esa decisión.'
  },
  proyInt:{
   t:'Manual de relaciones laborales de tu empresa',
   integra:'1.1 a 7.3',
   ctx:`Vas a consolidar todo lo laboral del curso en el manual que una empresa necesita para gestionar su personal desde la contratación hasta el cese, con sus modelos y sus controles.`,
   pasos:[
    'Capítulo 1 — Contratación: el inventario de vínculos y el sistema de gestión de contratos del subtema 7.1, con sus modelos y su calendario de vencimientos.',
    'Capítulo 2 — Remuneración y beneficios: la estructura salarial, el cuadro de afectación y el calendario de beneficios de los subtemas 6.1 a 6.3.',
    'Capítulo 3 — Jornada: la definición por puesto, el registro de asistencia, la política de sobretiempo y la conciliación mensual del subtema 7.2.',
    'Capítulo 4 — Régimen disciplinario: los formatos de llamada de atención y suspensión, con el procedimiento y los criterios de progresividad de la sanción.',
    'Capítulo 5 — Suspensión y cese: el protocolo de diez pasos, los modelos de cartas, la lista de nulidad y el procedimiento de liquidación del presente subtema.',
    'Capítulo 6 — Declaraciones y registros: el calendario laboral mensual y la lista de verificación del cierre del subtema 6.6.',
    'Capítulo 7 — Contingencias laborales: el registro cuantificado de todos los riesgos laborales identificados a lo largo de los módulos 6 y 7, integrado al registro único de contingencias del 5.1.',
    'Anexo de modelos: contratos, boleta, cuadro de vacaciones, autorización de sobretiempo, llamada de atención, suspensión, preaviso, carta de despido, liquidación y los cinco documentos del cese.',
    'Integra el manual de relaciones laborales con los manuales contable, tributario, de fiscalización y de defensa en el documento maestro único, con índice general y control de versiones.'
   ],
   entrega:[
    'El manual de relaciones laborales con sus siete capítulos.',
    'El anexo completo de modelos, utilizables tal como están.',
    'El registro de contingencias laborales cuantificado e integrado.',
    'El documento maestro actualizado con índice general y control de versiones.'
   ],
   crit:[
    'Cada capítulo se apoya en los entregables reales construidos en los módulos anteriores, no en descripciones.',
    'El anexo de modelos cubre el ciclo completo, de la contratación al cese, sin huecos.',
    'Cada contingencia laboral tiene importe, control asignado y responsable.'
   ],
   pista:'El manual de relaciones laborales, junto con el expediente tributario integral, es el entregable con el que un contador se presenta como asesor y no como digitador. Son los dos documentos que conviene tener listos antes de la primera entrevista de trabajo o de la primera reunión con un cliente.'
  },
  fuentes:[
   {a:'D.S. 003-97-TR — Ley de Productividad y Competitividad Laboral', o:'Artículos 11 a 16, 21 a 36 y 46 a 52', n:'suspensión, extinción, causas justas de despido, faltas graves, procedimiento, despido nulo, actos de hostilidad y cese colectivo'},
   {a:'D.S. 008-2026-TR', o:'Modificación del reglamento de la Ley de Fomento del Empleo', n:'incorporación de la nulidad del despido por diagnóstico de cáncer'},
   {a:'D.S. 001-96-TR', o:'Reglamento de la Ley de Fomento del Empleo', n:'desarrollo del procedimiento de despido, plazos y formalidades de las comunicaciones'},
   {a:'Jorge Toyama Miyagusuku', o:'El derecho individual del trabajo en el Perú', n:'régimen del despido, causas justas, procedimiento y consecuencias de la nulidad'},
   {a:'Elmer Arce Ortiz', o:'Derecho individual del trabajo en el Perú: desafíos y deficiencias', n:'estabilidad laboral, despido arbitrario y análisis crítico del régimen de protección'},
   {a:'Tribunal Constitucional y Corte Suprema', o:'Jurisprudencia sobre despido nulo, incausado y fraudulento', n:'supuestos de reposición y criterios sobre la carga de la prueba en el despido'}
  ]
 },
 {
  id:'m7t4', titulo:'Seguridad y salud en el trabajo: la Ley 29783', min:27,
  cont:`La seguridad y salud en el trabajo es el único ámbito laboral donde el incumplimiento puede terminar en un proceso penal contra el representante de la empresa. Y es también el que más se descuida en las empresas pequeñas, porque sus obligaciones no generan una multa visible hasta que ocurre un accidente.

# El deber de prevención
$ Art. 1 de la Ley 29783: el EMPLEADOR garantiza, en el centro de trabajo,
$ el establecimiento de los medios y condiciones que protejan la vida,
$ la salud y el bienestar de los trabajadores

El deber de prevención es del **empleador**, no del trabajador, y es **indelegable**: contratar a un consultor en seguridad no transfiere la responsabilidad. El empleador asume además las **implicancias económicas, legales y de cualquier otra índole** de un accidente o enfermedad ocupacional.

# Los nueve principios de la ley
|Principio|Qué significa en la práctica|
|**Prevención**|Las medidas se adoptan **antes** del daño, no después|
|**Responsabilidad**|El empleador asume las consecuencias económicas y legales del accidente|
|**Cooperación**|Empleador, trabajadores y sus representantes colaboran|
|**Información y capacitación**|Los trabajadores deben conocer los riesgos de su puesto|
|**Gestión integral**|La seguridad se integra a la gestión general de la empresa|
|**Atención integral de la salud**|Los trabajadores accidentados tienen derecho a prestaciones hasta su recuperación y rehabilitación|
|**Consulta y participación**|Los trabajadores participan en las decisiones sobre seguridad|
|**Primacía de la realidad**|Prevalecen los hechos sobre las declaraciones y los documentos|
|**Protección**|Las condiciones de trabajo deben ser compatibles con la dignidad del trabajador|

> El principio de **primacía de la realidad** aplicado a la seguridad significa que un documento no sustituye una medida. Un IPERC perfecto archivado en una carpeta mientras los operarios trabajan sin arnés en altura no protege a nadie, y en una inspección no sirve de defensa: agrava el caso, porque demuestra que el riesgo era conocido.

# El Sistema de Gestión de Seguridad y Salud en el Trabajo
$ POLÍTICA → ORGANIZACIÓN → PLANIFICACIÓN Y APLICACIÓN → EVALUACIÓN → MEJORA CONTINUA

|Etapa|Qué comprende|
|**Política**|Documento firmado por el más alto cargo, con los compromisos de la empresa en materia de SST|
|**Organización**|Comité o supervisor de SST, responsables designados, recursos asignados|
|**Planificación y aplicación**|El **IPERC**, los objetivos, el programa anual de SST y el reglamento interno|
|**Evaluación**|Supervisión, investigación de accidentes, auditorías y revisión por la dirección|
|**Mejora continua**|Acciones correctivas y preventivas documentadas|

# El IPERC: el documento central
$ IPERC = Identificación de Peligros, Evaluación de Riesgos y determinación de Controles

|Paso|Qué se hace|
|1|Identificar todos los **peligros** de cada puesto y cada tarea|
|2|Evaluar el **riesgo** de cada peligro: probabilidad × severidad|
|3|Determinar los **controles**, siguiendo la jerarquía|
|4|Verificar el **riesgo residual** tras los controles|
|5|**Actualizar** el IPERC cuando cambian las condiciones, los procesos o tras un accidente|

**La jerarquía de controles, que casi nadie respeta en el orden correcto:**
|Orden|Control|Ejemplo|
|**1**|**Eliminación**|Suprimir la tarea peligrosa o automatizarla|
|**2**|**Sustitución**|Reemplazar un químico tóxico por otro menos dañino|
|**3**|**Controles de ingeniería**|Guardas en la máquina, ventilación, aislamiento acústico|
|**4**|**Controles administrativos**|Procedimientos, señalización, rotación, capacitación|
|**5**|**Equipos de protección personal (EPP)**|Casco, guantes, arnés, respirador|

! El **EPP es el último recurso**, no el primero. Entregar guantes a un operario que trabaja con una máquina sin guarda es trasladarle el riesgo en lugar de controlarlo. En una inspección o en un proceso, una empresa que solo puede acreditar entrega de EPP, sin haber evaluado controles superiores, tiene su deber de prevención incumplido.

# Comité o supervisor: el umbral de los 20 trabajadores
|Número de trabajadores|Órgano|
|**20 o más**|**Comité de Seguridad y Salud en el Trabajo**, **paritario**: igual número de representantes del empleador y de los trabajadores, estos últimos **elegidos** por ellos|
|**Menos de 20**|**Supervisor de Seguridad y Salud en el Trabajo**, elegido por los trabajadores|

| Obligación asociada | Umbral |
|**Reglamento Interno de SST**|**20 o más** trabajadores|
|Programa anual de SST|Todas las empresas|
|Libro de actas del comité|Donde exista comité|

El comité se reúne con la periodicidad que fija la norma, lleva actas y tiene funciones concretas: aprobar el programa anual, participar en la investigación de accidentes, hacer inspecciones y vigilar el cumplimiento.

# Capacitación y exámenes médicos
|Obligación|Regla|
|**Capacitaciones en SST**|**No menos de cuatro al año**, dentro de la jornada de trabajo y sin costo para el trabajador|
|Capacitación **al ingreso**|Inducción general y específica del puesto, antes de iniciar labores|
|Capacitación por **cambio de puesto o de tecnología**|Antes del cambio|
|**Exámenes médicos ocupacionales**|Al **inicio**, **periódicos** y de **retiro**. La Ley 30222 estableció la periodicidad de **cada dos años** para el trabajo ordinario; en actividades de **alto riesgo** la periodicidad es **anual**|
|Costo de los exámenes|Íntegramente a cargo del **empleador**|
|Examen de retiro|A solicitud del trabajador; la empresa debe facilitarlo|

$ Verifica la norma vigente antes de programar: la periodicidad de los exámenes
$ y los protocolos del MINSA han sido modificados en varias ocasiones

# Los registros obligatorios
|Registro|Qué contiene|
|**Accidentes de trabajo**|Con la investigación de cada uno y las medidas correctivas|
|**Incidentes peligrosos** e incidentes|Los que no causaron daño pero pudieron hacerlo|
|**Enfermedades ocupacionales**|—|
|**Exámenes médicos ocupacionales**|—|
|**Monitoreo de agentes** físicos, químicos, biológicos, psicosociales y disergonómicos|Ruido, iluminación, polvo, ergonomía|
|**Inspecciones internas** de SST|—|
|**Estadísticas** de SST|Índices de frecuencia, gravedad y accidentabilidad|
|**Equipos de seguridad y EPP**|Con **cargo de entrega firmado** por cada trabajador|
|**Inducción, capacitación y simulacros**|Con la lista de asistencia firmada|
|**Auditorías**|—|

! El registro de **entrega de EPP con cargo firmado** es el que más veces salva y condena a una empresa. Si un trabajador se accidenta sin usar el equipo y la empresa puede acreditar que se lo entregó, lo capacitó en su uso y supervisó su utilización, su posición cambia radicalmente. Si no puede acreditarlo, el incumplimiento es suyo.

# La notificación de accidentes
|Qué ocurrió|Quién notifica|Plazo|
|**Accidente mortal** o **incidente peligroso**|El **empleador**|De forma **inmediata**, dentro de las **24 horas**, al Ministerio de Trabajo|
|**Accidente de trabajo no mortal**|El **centro médico asistencial** que atiende al trabajador|Dentro del plazo que fija la norma|
|**Enfermedad ocupacional**|El centro médico asistencial|Idem|

El empleador debe además **investigar** todo accidente e incidente, con la participación del comité o supervisor, y documentar las medidas correctivas adoptadas.

# La responsabilidad: hasta dónde llega
|Ámbito|Consecuencia|
|**Administrativa**|Infracción de SST sancionada por SUNAFIL. Las que generan **riesgo grave e inminente** son **muy graves**, y la inspección puede ordenar la **paralización** de los trabajos|
|**Indemnizatoria**|El artículo 53 de la Ley 29783 establece que el incumplimiento del deber de prevención **genera la obligación de pagar indemnización** a las víctimas o a sus derechohabientes|
|**Penal**|El artículo **168-A** del Código Penal tipifica el atentado contra las condiciones de seguridad y salud en el trabajo: sanciona a quien, **deliberadamente** y estando legalmente obligado, **no adopta** las medidas de seguridad, poniendo en **peligro inminente** la vida, salud o integridad de los trabajadores. La pena se agrava si se produce muerte o lesión grave|

$ Es el único ámbito laboral con consecuencia PENAL directa para el obligado
$ El SCTR cubre las prestaciones, pero NO exime del deber de prevención
$ ni de la responsabilidad indemnizatoria o penal

> Esa es la distinción que más conviene explicarle a una gerencia: el SCTR es un seguro que paga prestaciones de salud y pensiones cuando ocurre un accidente de trabajo. No es una autorización para asumir riesgos. Si el accidente se produjo porque la empresa no adoptó medidas que debía adoptar, el SCTR paga al trabajador y la empresa sigue respondiendo por la indemnización del artículo 53 y, en los supuestos del artículo 168-A, penalmente.

# El SCTR
|Aspecto|Regla|
|**Quién lo contrata**|El empleador que realiza las **actividades de riesgo** del Anexo 5 del D.S. 009-97-SA: construcción, minería, industria pesada, electricidad, transporte, entre otras|
|**Coberturas**|**Salud** (atención médica, rehabilitación) y **pensiones** (invalidez y sobrevivencia)|
|**Dónde se contrata**|La cobertura de salud en EsSalud o en una EPS; la de pensiones en la ONP o en una compañía de seguros|
|**A quiénes cubre**|A todos los trabajadores que realizan la actividad de riesgo, **incluido el personal de terceros** destacado en las instalaciones|
|**Omisión**|Infracción **muy grave**, y el empleador responde directamente por las prestaciones|

# Normas recientes que conviene conocer
|Norma|Materia|
|**Ley 32721** (2026)|Garantiza el derecho al **descanso sentado** y a **alternar la postura** en los puestos de trabajo. Afecta especialmente al comercio y la atención al público, donde era práctica común exigir permanecer de pie toda la jornada|
|**D.S. 003-2026-SA** (2026)|Reglamento de la Ley 30102, sobre medidas preventivas contra la exposición a la **radiación solar**: relevante para trabajo al aire libre, construcción, agricultura y reparto|
|**Ley 27942 y D.S. 014-2019-MIMP**|Prevención y sanción del **hostigamiento sexual**: canal de denuncia, comité de intervención en empresas con 20 o más trabajadores, plazos breves de investigación y medidas de protección a la víctima|

# El sistema mínimo viable para una empresa pequeña
Una empresa de 15 trabajadores no necesita un departamento de seguridad, pero sí necesita esto:

1. **Política de SST** firmada por la gerencia, visible en el centro de trabajo.
2. **Supervisor de SST** elegido por los trabajadores, con acta de elección.
3. **IPERC** por puesto, con la jerarquía de controles aplicada y riesgo residual evaluado.
4. **Programa anual de SST** con las cuatro capacitaciones, los exámenes médicos y las inspecciones internas programadas.
5. **Exámenes médicos ocupacionales** al ingreso y periódicos, archivados.
6. **Cargo de entrega de EPP** firmado por cada trabajador, con la capacitación en su uso.
7. **Los diez registros obligatorios**, aunque estén vacíos: un registro de accidentes sin accidentes es un buen registro.
8. **Procedimiento de respuesta a emergencias** y señalización.
9. **SCTR** si la actividad es de riesgo, con la póliza vigente y verificada.
10. **Investigación documentada** de todo accidente e incidente, con medidas correctivas.

$ Costo aproximado: unas horas de trabajo al mes más los exámenes médicos
$ Costo de no tenerlo: una infracción muy grave, la indemnización del art. 53
$ y, en el peor caso, responsabilidad penal del representante`,
  claves:['El deber de prevención es del empleador y es indelegable: contratar un consultor no transfiere la responsabilidad.','El IPERC debe aplicar la jerarquía de controles, donde el EPP es el último recurso, no el primero.','Comité de SST con 20 o más trabajadores; supervisor con menos. El reglamento interno de SST también se exige desde 20.','Corresponden no menos de cuatro capacitaciones al año y exámenes médicos ocupacionales a cargo del empleador.','Es el único ámbito laboral con consecuencia penal directa: el artículo 168-A del Código Penal. El SCTR no exime del deber de prevención.'],
  preg:[
   {p:'¿Por qué se dice que el deber de prevención es indelegable?',
    r:'Porque la ley lo atribuye al **empleador** y a nadie más. Contratar a un consultor en seguridad, a una empresa de servicios o incluso designar un responsable interno distribuye tareas, no responsabilidad: si ocurre un accidente por una medida no adoptada, responde el empleador. Lo mismo ocurre con el personal de terceros: la empresa en cuyas instalaciones se trabaja debe garantizar las condiciones de seguridad de quienes están allí, aunque no sean sus trabajadores. La consecuencia práctica es que la gerencia no puede considerar la seguridad como un servicio que compró y se olvida: tiene que verificar que las medidas se aplican, y documentar esa verificación.'},
   {p:'¿Por qué el EPP es el último nivel de la jerarquía de controles y no el primero?',
    r:'Porque el EPP no elimina el peligro: solo intenta reducir el daño si el peligro se materializa, y depende de que el trabajador lo use correctamente todo el tiempo. Los niveles superiores actúan sobre el peligro mismo: eliminarlo, sustituirlo por algo menos dañino o controlarlo con ingeniería, como una guarda en una máquina o un sistema de ventilación. Esos controles funcionan sin depender de la conducta de nadie. Entregar guantes a un operario que opera una máquina sin guarda es trasladarle el riesgo. Y en una inspección o un proceso, una empresa que solo acredita entrega de EPP, sin haber evaluado los controles superiores, tiene su deber de prevención incumplido, porque la ley exige aplicar la jerarquía, no elegir el nivel más barato.'},
   {p:'¿Qué significa que el SCTR no exime del deber de prevención?',
    r:'Significa que son dos cosas distintas. El SCTR es un **seguro** que cubre las prestaciones de salud y las pensiones de invalidez o sobrevivencia cuando ocurre un accidente de trabajo o una enfermedad ocupacional en actividades de riesgo. El deber de prevención es la **obligación de evitar** que ese accidente ocurra. Tener SCTR y no adoptar medidas de seguridad no es una estrategia válida: el SCTR pagará las prestaciones al trabajador, y la empresa seguirá respondiendo por la infracción administrativa ante SUNAFIL, por la indemnización del artículo 53 de la Ley 29783 y, si se configuran los elementos del artículo 168-A del Código Penal, penalmente. El seguro cubre el daño, no la culpa.'},
   {p:'¿Por qué el cargo de entrega de EPP firmado es tan importante?',
    r:'Porque es la prueba del cumplimiento en el punto exacto donde se discute la responsabilidad. Si un trabajador se accidenta sin usar su equipo de protección, la pregunta será si la empresa cumplió: ¿le entregó el equipo adecuado?, ¿lo capacitó en su uso?, ¿supervisó que lo usara?, ¿lo reemplazó cuando se deterioró? Si existe el cargo firmado, la constancia de capacitación y el registro de inspecciones internas, la empresa puede acreditar que cumplió su parte y la discusión cambia de naturaleza. Si no existe nada de eso, el incumplimiento es de la empresa, con independencia de que el equipo se haya entregado de hecho. Es otro caso del principio general: en materia laboral, lo que no está documentado no ocurrió.'},
   {p:'¿Qué necesita, como mínimo, una empresa de 15 trabajadores para cumplir con la Ley 29783?',
    r:'No necesita un departamento de seguridad, pero sí diez elementos: política de SST firmada y visible; **supervisor** de SST elegido por los trabajadores, con acta (el comité se exige desde 20); IPERC por puesto con la jerarquía de controles aplicada; programa anual con las cuatro capacitaciones, los exámenes médicos y las inspecciones; exámenes médicos ocupacionales de ingreso y periódicos; cargo de entrega de EPP firmado con su capacitación; los diez registros obligatorios, aunque estén vacíos; procedimiento de emergencias y señalización; SCTR si la actividad es de riesgo; e investigación documentada de todo accidente e incidente. Son unas horas de trabajo al mes más el costo de los exámenes médicos, y es la diferencia entre una infracción muy grave y un cumplimiento acreditable.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una empresa tiene 18 trabajadores. ¿Qué órgano de seguridad y salud le corresponde?',
    o:['Comité paritario de SST','Supervisor de SST elegido por los trabajadores','Ninguno, porque tiene menos de 20','Un jefe de seguridad designado por la gerencia'],r:1,
    s:'Le corresponde un **Supervisor de Seguridad y Salud en el Trabajo**, elegido **por los trabajadores**. El Comité paritario se exige a partir de **20 trabajadores**, al igual que el Reglamento Interno de SST.\n\nDos precisiones importantes: el supervisor lo **eligen los trabajadores**, no lo designa la gerencia, y la elección debe constar en acta; y el hecho de tener menos de 20 trabajadores no exime de ninguna otra obligación, porque el IPERC, las cuatro capacitaciones anuales, los exámenes médicos, los registros y la entrega de EPP con cargo firmado se exigen a toda empresa, sin umbral de tamaño.'},
   {l:1,t:'mc',p:'En la jerarquía de controles del IPERC, ¿cuál es el orden correcto?',
    o:['EPP, controles administrativos, ingeniería, sustitución, eliminación','Eliminación, sustitución, controles de ingeniería, controles administrativos, EPP','Capacitación, EPP, señalización, ingeniería','Señalización, EPP, eliminación, sustitución'],r:1,
    s:'El orden correcto es **eliminación, sustitución, controles de ingeniería, controles administrativos y, en último lugar, EPP**.\n\nLa lógica es que los niveles superiores actúan sobre el **peligro** y funcionan sin depender de la conducta de nadie: una máquina con guarda protege siempre; un sistema de ventilación extrae el contaminante aunque nadie recuerde usarlo. Los niveles inferiores dependen de que el trabajador cumpla un procedimiento o use un equipo.\n\nLa primera opción es, exactamente, la jerarquía invertida, y describe lo que hacen muchas empresas: empezar por el EPP porque es lo más barato y lo más visible. En una inspección, esa inversión acredita el incumplimiento del deber de prevención.'},
   {l:2,t:'ab',p:'Elabora el IPERC de un puesto de operario de almacén que usa montacargas, manipula cargas manualmente y trabaja en estantes de hasta 4 metros de altura. Aplica la jerarquía de controles.',
    s:'**Matriz IPERC del puesto: Operario de almacén**\n\n| Nº | Tarea | Peligro | Riesgo | Prob. | Sev. | Nivel inicial |\n|---|---|---|---|---|---|---|\n| 1 | Operar montacargas | Vehículo en movimiento | Atropello, volcadura, colisión | Media | Alta | **Alto** |\n| 2 | Manipulación manual de cargas | Peso y postura | Lumbalgia, hernia discal, sobreesfuerzo | Alta | Media | **Alto** |\n| 3 | Trabajo en estantes de 4 m | Altura | Caída de altura, caída de objetos | Media | **Muy alta** | **Crítico** |\n| 4 | Circulación en pasillos | Tránsito mixto de personas y montacargas | Atropello | Media | Alta | **Alto** |\n| 5 | Almacenamiento en altura | Estiba inestable | Caída de carga sobre personas | Media | Alta | **Alto** |\n| 6 | Jornada en almacén | Ruido, iluminación deficiente, temperatura | Hipoacusia, fatiga visual, estrés térmico | Media | Baja | **Medio** |\n\n**Controles, aplicando la jerarquía en orden. Esto es lo que distingue un IPERC real de uno de formulario:**\n\n**Riesgo 3 — Trabajo en altura (el crítico, se ataca primero)**\n\n| Nivel | Control |\n|---|---|\n| **1. Eliminación** | Rediseñar el almacén para que **ningún producto de rotación frecuente** se almacene por encima de 1.80 m. Es el control más efectivo y el que casi nadie considera |\n| **2. Sustitución** | Usar **montacargas con plataforma elevadora certificada** en lugar de escaleras para acceder a los niveles altos |\n| **3. Ingeniería** | Barandas en las plataformas; líneas de vida certificadas; estanterías ancladas al piso y a la pared, con cálculo de carga máxima señalizado |\n| **4. Administrativo** | Procedimiento escrito de trabajo en altura; prohibición de trabajar solo en altura; permiso de trabajo para alturas mayores a 1.80 m; capacitación específica certificada |\n| **5. EPP** | Arnés de cuerpo completo con doble línea de anclaje, casco con barbiquejo, calzado de seguridad antideslizante |\n\n**Riesgo 2 — Manipulación manual de cargas**\n\n| Nivel | Control |\n|---|---|\n| **1. Eliminación** | Recibir la mercadería **paletizada** del proveedor, eliminando la manipulación manual unidad por unidad |\n| **2. Sustitución** | Fraccionar los bultos: negociar con proveedores empaques de menor peso |\n| **3. Ingeniería** | Transpaletas, carretillas, mesas elevadoras de altura regulable, rodillos |\n| **4. Administrativo** | Límite de peso por trabajador conforme a la norma ergonómica; trabajo en pareja sobre cierto peso; pausas activas; **rotación de tareas**; capacitación en técnicas de levantamiento |\n| **5. EPP** | Guantes con agarre, calzado de seguridad. **El cinturón lumbar no es un control válido**: no previene la lesión y puede dar falsa seguridad |\n\n**Riesgos 1 y 4 — Montacargas y tránsito mixto**\n\n| Nivel | Control |\n|---|---|\n| **1. Eliminación** | **Separación física** de los flujos: pasillos exclusivos para montacargas y pasillos exclusivos para peatones |\n| **3. Ingeniería** | Barreras y vallas; espejos en esquinas ciegas; alarma de retroceso y luz estroboscópica en el montacargas; limitador de velocidad |\n| **4. Administrativo** | **Licencia interna de operador** con capacitación certificada y evaluación; check-list diario del equipo antes de operar; mantenimiento preventivo programado; señalización de velocidad máxima; prohibición de transportar personas |\n| **5. EPP** | Chaleco reflectivo obligatorio para todo el personal en el área, casco |\n\n**Riesgo 5 — Estiba inestable**\n\n| Nivel | Control |\n|---|---|\n| **3. Ingeniería** | Mallas o redes de contención en estantes altos; topes posteriores |\n| **4. Administrativo** | Procedimiento de estiba con el peso máximo por nivel señalizado; inspección semanal del estado de la estantería |\n\n**Riesgo 6 — Agentes físicos**\n\n| Nivel | Control |\n|---|---|\n| **3. Ingeniería** | Mejora de la iluminación a los niveles de la norma; ventilación |\n| **4. Administrativo** | **Monitoreo de agentes físicos** (ruido, iluminación, temperatura), que es un registro obligatorio |\n| **5. EPP** | Protección auditiva si el monitoreo lo justifica |\n\n**Evaluación del riesgo residual, que es el paso que suele faltar:**\n\n| Nº | Riesgo | Nivel inicial | Nivel residual tras controles | ¿Aceptable? |\n|---|---|---|---|---|\n| 3 | Caída de altura | Crítico | Medio | Sí, con verificación permanente |\n| 2 | Sobreesfuerzo | Alto | Bajo | Sí |\n| 1 y 4 | Atropello | Alto | Bajo | Sí |\n| 5 | Caída de carga | Alto | Bajo | Sí |\n| 6 | Agentes físicos | Medio | Bajo | Sí |\n\n**Las obligaciones conexas que este IPERC genera:**\n\n| Obligación | Detalle |\n|---|---|\n| **Exámenes médicos ocupacionales** | Con evaluación **músculo-esquelética** y audiometría, por los riesgos identificados |\n| **SCTR** | Verificar si la actividad del almacén está en el Anexo 5 del D.S. 009-97-SA. El trabajo con montacargas y en altura suele calificar |\n| **Capacitaciones** | Las cuatro anuales deben incluir: trabajo en altura, manipulación de cargas, operación de montacargas y respuesta a emergencias |\n| **Registros** | Monitoreo de agentes, inspecciones internas, entrega de EPP con cargo firmado, capacitaciones con lista de asistencia |\n| **Actualización del IPERC** | Al cambiar el layout, los equipos, los productos almacenados, o tras cualquier accidente o incidente |\n\n**El punto que hace la diferencia:** el control más efectivo de todo este IPERC es el primero del riesgo crítico, **rediseñar el almacén para que la mercadería de rotación frecuente no esté en altura**. No cuesta nada en equipos, elimina la exposición más grave y ninguna empresa lo considera porque la reacción instintiva es comprar arneses. Eso es lo que significa aplicar la jerarquía: preguntar primero si el peligro puede desaparecer.'},
   {l:2,t:'ab',p:'Un trabajador de una empresa constructora cae de un andamio y sufre fractura de cadera. La empresa tiene SCTR vigente, pero no había IPERC para esa tarea, el trabajador no recibió capacitación en trabajo en altura y no hay cargo de entrega de arnés. Analiza las consecuencias para la empresa.',
    s:'**Lo que el SCTR cubre y lo que no.** El SCTR vigente cubrirá las prestaciones de salud del trabajador y, si queda invalidez, la pensión correspondiente. Eso es todo. No cubre la responsabilidad de la empresa por haber incumplido su deber de prevención, y tener SCTR no es una circunstancia atenuante: es una obligación independiente.\n\n**Los cuatro frentes de consecuencia:**\n\n**1. Obligaciones inmediatas (primeras 24 horas)**\n\n| Obligación | Plazo |\n|---|---|\n| Notificar el accidente al Ministerio de Trabajo | Un accidente con fractura de cadera es un **accidente de trabajo grave**: debe verificarse si corresponde la notificación inmediata del empleador por su gravedad |\n| Garantizar la atención médica inmediata | De inmediato |\n| **Investigar el accidente** con el comité o supervisor de SST | Documentada, con medidas correctivas |\n| Registrar en el **registro de accidentes de trabajo** | Obligatorio |\n| Preservar la escena y la evidencia | Antes de modificar el andamio |\n\n**2. Frente administrativo — SUNAFIL**\n\n| Incumplimiento | Calificación |\n|---|---|\n| No contar con **IPERC** de la tarea | Infracción grave o muy grave según el caso |\n| No **capacitar** al trabajador en trabajo en altura | Grave, agravada porque se trata de un riesgo crítico |\n| No acreditar la **entrega de EPP** (arnés) | Grave |\n| Incumplimiento que ocasionó **riesgo grave e inminente** y un accidente | **Muy grave** |\n| Posible **paralización de los trabajos** | Medida inspectiva inmediata |\n\nEn una empresa constructora, que por su actividad es de alto riesgo, la concurrencia de estos incumplimientos configura el escenario sancionatorio más severo del régimen laboral, y la inspección será prácticamente inmediata porque los accidentes graves la desencadenan.\n\n**3. Frente indemnizatorio — artículo 53 de la Ley 29783**\n\nEl incumplimiento del deber de prevención **genera la obligación de pagar indemnización** al trabajador. Y aquí la ausencia de IPERC, de capacitación y de cargo de EPP es devastadora: la empresa no tiene **nada** con que acreditar que cumplió. Los tres documentos que habrían sido su defensa son precisamente los que no existen.\n\n| Si la empresa tuviera... | Su posición sería |\n|---|---|\n| IPERC con el riesgo identificado y controles de ingeniería aplicados | Acreditaría haber evaluado y controlado |\n| Capacitación certificada en trabajo en altura | Acreditaría haber informado del riesgo |\n| Cargo de entrega de arnés firmado y registro de supervisión de su uso | Acreditaría haber provisto y verificado |\n| **Nada de lo anterior** | **Incumplimiento acreditado por omisión** |\n\n**4. Frente penal — artículo 168-A del Código Penal**\n\nEl tipo penal sanciona a quien, estando legalmente obligado y **deliberadamente**, no adopta las medidas de seguridad, poniendo en peligro inminente la vida, salud o integridad de los trabajadores, con pena agravada si se produce lesión grave o muerte.\n\nLa exigencia de que la omisión sea **deliberada** es la barrera que el legislador puso para no criminalizar el descuido. Pero la concurrencia de tres omisiones básicas en una actividad de alto riesgo —sin IPERC, sin capacitación y sin EPP acreditado, en trabajo en altura— es precisamente el tipo de cuadro que el Ministerio Público examina para determinar si hubo conocimiento del riesgo y decisión de no actuar. La fractura de cadera califica como **lesión grave**, lo que activa la forma agravada.\n\n**La exposición total estimada:**\n\n| Concepto | Naturaleza |\n|---|---|\n| Prestaciones de salud y pensión | Cubiertas por el SCTR |\n| Multas de SUNAFIL por varias infracciones, una de ellas muy grave | Según las tablas, con el número de trabajadores afectados |\n| Indemnización del art. 53 | Determinada judicialmente; puede ser elevada |\n| Paralización de los trabajos | Costo operativo directo |\n| Proceso penal contra el representante | Riesgo personal, no empresarial |\n| Costos legales de los tres frentes | Relevantes |\n\n**Lo que la empresa debe hacer ahora, en orden:**\n\n1. **Atender al trabajador** y cumplir las obligaciones de notificación e investigación. Nada es más urgente ni mejora más su posición que una respuesta diligente y documentada.\n2. **Asesoría legal especializada de inmediato**, en los tres frentes a la vez. Este no es un caso que el área contable pueda manejar.\n3. **Elaborar el IPERC** de todas las tareas en altura y aplicar los controles, empezando por los de ingeniería. No corrige el pasado pero evita el siguiente accidente, que es la prioridad real.\n4. **Capacitar y certificar** a todo el personal que trabaja en altura, con registro de asistencia.\n5. **Entregar EPP con cargo firmado** a todos, y establecer la supervisión de su uso con registro.\n6. **Revisar todos los andamios** y el procedimiento de trabajo en altura.\n7. **Documentar cada medida adoptada** con fecha: la diligencia posterior al accidente es valorada, aunque no borra la omisión previa.\n\n**La lección, que es la razón de ser de este subtema:** los tres documentos que faltaban —IPERC, capacitación y cargo de EPP— cuestan unas horas de trabajo y unos cientos de soles. Su ausencia convirtió un accidente, que puede ocurrir incluso con todas las medidas adoptadas, en un incumplimiento acreditado con consecuencias administrativas, indemnizatorias y penales. La seguridad y salud en el trabajo es el único ámbito laboral donde el papeleo no es burocracia: es la frontera entre un accidente y un delito.'},
   {l:3,t:'ab',p:'Diseña el Sistema de Gestión de Seguridad y Salud en el Trabajo completo de una empresa manufacturera de 35 trabajadores, con su programa anual, sus registros y su presupuesto.',
    s:'**Con 35 trabajadores la empresa está por encima del umbral de 20, de modo que le corresponden comité paritario y reglamento interno de SST.**\n\n**ELEMENTO 1 — Política de SST**\n\nDocumento de una página, firmado por el **más alto cargo** de la empresa, publicado en lugar visible, con los compromisos de: proteger la seguridad y salud de todos los miembros de la organización; cumplir la normativa vigente; consultar y hacer participar a los trabajadores; y mejorar continuamente el desempeño en SST. Debe ser específica de la empresa, no una plantilla genérica.\n\n**ELEMENTO 2 — Organización**\n\n| Órgano | Composición | Obligaciones |\n|---|---|---|\n| **Comité paritario de SST** | Igual número de representantes del empleador (designados) y de los trabajadores (**elegidos** por ellos). Con 35 trabajadores, la norma fija el número de miembros | Reuniones con la periodicidad que fija la norma, con **libro de actas**; aprobar el programa anual; participar en la investigación de accidentes; realizar inspecciones |\n| Responsable de SST | Designado por la gerencia | Ejecuta el programa, mantiene los registros |\n| **Reglamento Interno de SST** | Obligatorio desde 20 trabajadores | Aprobado, difundido y entregado a cada trabajador con cargo |\n\n**ELEMENTO 3 — IPERC**\n\nUna matriz por **puesto** y por **tarea**, no una general para toda la empresa. En una manufacturera, los peligros típicos a cubrir:\n\n| Área | Peligros a identificar |\n|---|---|\n| Producción | Máquinas en movimiento, atrapamiento, cortes, quemaduras, ruido, partes móviles sin guarda |\n| Almacén | Montacargas, cargas, altura, estiba |\n| Mantenimiento | Energías peligrosas (bloqueo y etiquetado), espacios confinados, trabajos en caliente, eléctrico |\n| Químicos | Almacenamiento, trasvase, hojas de seguridad, EPP específico |\n| Todas | Ergonomía, iluminación, ruido, riesgo psicosocial, emergencias |\n\nCon la **jerarquía de controles** aplicada en cada caso y el **riesgo residual** evaluado. Actualización anual y tras cada cambio o accidente.\n\n**ELEMENTO 4 — Programa anual de SST**\n\n| Mes | Actividad | Responsable |\n|---|---|---|\n| Enero | Elección y constitución del comité; aprobación del programa anual | Gerencia y trabajadores |\n| Enero | Actualización del IPERC de todos los puestos | Responsable de SST y comité |\n| Febrero | **Capacitación 1**: IPERC, política de SST y derechos y obligaciones | Responsable de SST |\n| Marzo | Inspección interna de instalaciones y equipos | Comité |\n| Abril | **Monitoreo de agentes físicos**: ruido, iluminación, temperatura | Proveedor externo |\n| Mayo | **Capacitación 2**: riesgos específicos del puesto y uso de EPP | Responsable de SST |\n| Junio | **Exámenes médicos ocupacionales periódicos** | Centro médico autorizado |\n| Julio | **Simulacro** de evacuación y respuesta a emergencias | Comité y brigadas |\n| Agosto | **Capacitación 3**: ergonomía, manipulación de cargas y riesgo psicosocial | Proveedor externo |\n| Setiembre | Inspección interna y revisión del estado de los EPP | Comité |\n| Octubre | **Capacitación 4**: primeros auxilios, lucha contra incendios y evacuación | Proveedor externo |\n| Noviembre | **Auditoría interna** del sistema de gestión | Externa o interna calificada |\n| Diciembre | **Revisión por la dirección**: estadísticas, cumplimiento del programa y objetivos del año siguiente | Gerencia y comité |\n| Permanente | Investigación de accidentes e incidentes; inducción de ingresantes antes de iniciar labores | Responsable de SST |\n\n**ELEMENTO 5 — Los diez registros**\n\n| Registro | Frecuencia de actualización |\n|---|---|\n| Accidentes de trabajo, con investigación y medidas correctivas | Por evento |\n| Incidentes peligrosos e incidentes | Por evento |\n| Enfermedades ocupacionales | Por evento |\n| Exámenes médicos ocupacionales | Por campaña |\n| Monitoreo de agentes físicos, químicos, biológicos, psicosociales y disergonómicos | Anual |\n| Inspecciones internas de SST | Según programa |\n| Estadísticas de SST (frecuencia, gravedad, accidentabilidad) | Mensual |\n| Equipos de seguridad y EPP, con **cargo firmado** | Por entrega |\n| Inducción, capacitación, entrenamiento y simulacros | Por actividad |\n| Auditorías | Anual |\n\n**ELEMENTO 6 — Presupuesto anual estimado**\n\n| Concepto | Estimación |\n|---|---|\n| Exámenes médicos ocupacionales (35 trabajadores) | según tarifas del centro médico y los protocolos aplicables |\n| Monitoreo de agentes (ruido, iluminación, ergonomía) | servicio anual externo |\n| Capacitaciones externas (2 de las 4) | honorarios de capacitadores certificados |\n| EPP y su reposición | según el IPERC de cada puesto |\n| Señalización, extintores y su recarga, botiquines | anual |\n| Controles de ingeniería priorizados del IPERC | **la partida más importante y la que más se recorta** |\n| SCTR, si la actividad está en el Anexo 5 | prima según la póliza y el nivel de riesgo |\n| Auditoría del sistema | servicio anual |\n\n**La recomendación presupuestal, que es el aporte profesional del caso:** la partida de **controles de ingeniería** es la que efectivamente reduce los accidentes y la que todas las empresas recortan primero, porque es la más visible y la más caras. Una guarda en una máquina cuesta una fracción de lo que cuesta un accidente por atrapamiento, y a diferencia del EPP no depende de que alguien se acuerde de usarla. Al presentar el presupuesto a la gerencia conviene mostrar la comparación: costo del control frente a costo esperado del accidente que previene, con la multa, la indemnización y el tiempo de paralización incluidos.\n\n**ELEMENTO 7 — Indicadores del tablero mensual**\n\n| Indicador | Fórmula o contenido |\n|---|---|\n| Índice de **frecuencia** | Accidentes incapacitantes × 1,000,000 ÷ horas-hombre trabajadas |\n| Índice de **gravedad** | Días perdidos × 1,000,000 ÷ horas-hombre trabajadas |\n| Índice de **accidentabilidad** | (Frecuencia × Gravedad) ÷ 1,000 |\n| Incidentes reportados | Número. **Un aumento es buena señal**: significa que se reportan |\n| Cumplimiento del programa anual | Actividades ejecutadas sobre programadas |\n| Capacitaciones acumuladas | Debe llegar a 4 al cierre del año |\n| Observaciones de inspección cerradas | Cerradas sobre levantadas |\n\n**Una observación sobre el indicador de incidentes:** un **incidente** es un suceso que pudo causar daño y no lo causó. Que aumenten los incidentes reportados no significa que la empresa sea más peligrosa: significa que la gente reporta, y cada incidente reportado es un accidente evitado. Una empresa con cero incidentes reportados y dos accidentes al año no tiene un buen sistema: tiene un sistema donde nadie reporta nada hasta que alguien se lesiona.\n\n**ELEMENTO 8 — La verificación que la gerencia debe hacer cada trimestre**\n\n1. ¿El comité se reunió y hay actas firmadas?\n2. ¿El IPERC está actualizado y los controles priorizados se ejecutaron?\n3. ¿Las capacitaciones del trimestre se realizaron con lista de asistencia?\n4. ¿Los exámenes médicos están al día y archivados?\n5. ¿Todo accidente e incidente fue investigado con medidas correctivas documentadas?\n6. ¿Los cargos de entrega de EPP están firmados y los equipos en buen estado?\n7. ¿El SCTR está vigente y cubre a todo el personal expuesto, incluido el de terceros?\n\n**El cierre profesional:** un sistema de gestión de SST no se mide por el grosor de sus carpetas sino por dos cosas: si los controles de ingeniería del IPERC están efectivamente instalados, y si los trabajadores reportan incidentes. Lo demás es documentación que acompaña, necesaria para acreditar cumplimiento, pero que no protege a nadie por sí sola. El principio de primacía de la realidad, en este terreno, también se aplica a la empresa que cree estar cumpliendo porque tiene los papeles.'}
  ],
  proy:{
   t:'Sistema de gestión de SST de tu empresa',
   ctx:`Vas a construir el sistema de seguridad y salud de tu empresa, dimensionado a su tamaño real. Es el ámbito donde el incumplimiento tiene la consecuencia más grave de todo el derecho laboral.`,
   pasos:[
    'Determina qué órgano le corresponde a tu empresa según su número de trabajadores: comité paritario o supervisor, y si le aplica el Reglamento Interno de SST.',
    'Redacta la política de SST de tu empresa, de una página, con los cuatro compromisos.',
    'Elabora el IPERC de todos los puestos de tu plantilla, por tarea, con la evaluación de probabilidad y severidad, los controles aplicados en orden jerárquico y el riesgo residual.',
    'Verifica si la actividad de tu empresa está entre las de riesgo del Anexo 5 del D.S. 009-97-SA y, si lo está, determina la obligación de contratar SCTR y su efecto en el costo laboral.',
    'Elabora el programa anual de SST con las cuatro capacitaciones, los exámenes médicos, el monitoreo de agentes, las inspecciones, el simulacro, la auditoría y la revisión por la dirección.',
    'Diseña los diez registros obligatorios en formato de plantilla, listos para usar.',
    'Elabora el presupuesto anual de SST de tu empresa, separando la partida de controles de ingeniería, y exprésalo como porcentaje del costo laboral total.',
    'Diseña el tablero de indicadores mensual con las tres fórmulas de frecuencia, gravedad y accidentabilidad.',
    'Elabora el formato de cargo de entrega de EPP y el formato de investigación de accidentes.'
   ],
   entrega:[
    'La política de SST y la determinación del órgano que corresponde.',
    'El IPERC completo por puesto y tarea, con jerarquía de controles y riesgo residual.',
    'El programa anual, los diez registros en plantilla y el presupuesto con su porcentaje.',
    'El tablero de indicadores y los formatos de cargo de EPP e investigación de accidentes.'
   ],
   crit:[
    'El IPERC aplica la jerarquía completa y propone controles de eliminación o ingeniería, no solo EPP.',
    'Cada riesgo tiene evaluado su nivel residual después de los controles.',
    'El presupuesto identifica expresamente la partida de controles de ingeniería.'
   ],
   pista:'Al elaborar el IPERC, obligate a escribir un control de eliminación o sustitución para cada riesgo alto, incluso si al final no es viable. El ejercicio de buscarlo es lo que produce las mejores ideas de prevención, y a veces resulta que sí era viable y nadie lo había pensado.'
  },
  proyInt:{
   t:'Integración de la SST al costo y a la gestión de tu empresa',
   integra:'1.1 a 7.4',
   ctx:`La seguridad y salud no es un capítulo aparte: afecta el costo laboral, el riesgo contingente y los estados financieros. Vas a integrarla a todo lo construido.`,
   pasos:[
    'Incorpora el costo del sistema de SST al costo laboral total de tu empresa del Módulo 6: SCTR, exámenes médicos, EPP, capacitaciones, monitoreo y controles de ingeniería.',
    'Recalcula el factor de costo laboral por trabajador incluyendo estos conceptos, y compáralo con el factor anterior.',
    'Registra en el Libro Diario los asientos del gasto de SST, con las cuentas del PCGE que correspondan: 627 para SCTR y seguros, 624 para capacitación, y las cuentas de suministros o activo para los EPP y los controles de ingeniería según su naturaleza.',
    'Evalúa el tratamiento contable de los controles de ingeniería: ¿son gasto del periodo o activo fijo? Fundamenta con los criterios de la NIC 16.',
    'Cuantifica el pasivo contingente por incumplimientos de SST identificados en tu empresa, considerando los tres frentes: multa administrativa, indemnización del artículo 53 y exposición penal del representante.',
    'Integra esas contingencias al registro único del subtema 5.1, con su evaluación bajo la NIC 37.',
    'Actualiza los estados financieros del Módulo 6 con el gasto de SST y verifica que cuadren.',
    'Elabora el informe a la gerencia que compare, para los tres riesgos más altos del IPERC, el costo del control frente al costo esperado del accidente que previene.'
   ],
   entrega:[
    'El costo laboral recalculado con SST y el nuevo factor por trabajador.',
    'Los asientos del gasto de SST y la evaluación del tratamiento de los controles de ingeniería.',
    'El pasivo contingente por SST cuantificado en los tres frentes.',
    'El informe comparativo de costo del control frente al costo del accidente.'
   ],
   crit:[
    'El tratamiento de los controles de ingeniería está fundamentado en los criterios de reconocimiento de la NIC 16.',
    'La cuantificación de contingencias considera los tres frentes, no solo la multa.',
    'El informe comparativo cuantifica el costo esperado del accidente, incluyendo multa, indemnización y paralización.'
   ],
   pista:'Para el informe comparativo, el costo esperado del accidente se estima como la probabilidad del riesgo multiplicada por su costo total: atención, multa, indemnización, días de paralización y reemplazo del trabajador. Casi siempre resulta un múltiplo del costo del control, y ese es el argumento que libera presupuesto.'
  },
  fuentes:[
   {a:'Ley 29783 y D.S. 005-2012-TR', o:'Ley de Seguridad y Salud en el Trabajo y su reglamento', n:'principios, sistema de gestión, IPERC, comité y supervisor, capacitaciones, registros y responsabilidad del empleador'},
   {a:'Ley 30222', o:'Ley que modifica la Ley 29783', n:'periodicidad de los exámenes médicos ocupacionales y precisiones al tipo penal'},
   {a:'Código Penal', o:'Artículo 168-A', n:'atentado contra las condiciones de seguridad y salud en el trabajo y su forma agravada'},
   {a:'D.S. 003-98-SA y D.S. 009-97-SA', o:'Normas del SCTR y Anexo 5 de actividades de riesgo', n:'coberturas de salud y pensiones, actividades obligadas y alcance al personal de terceros'},
   {a:'Ley 27942 y D.S. 014-2019-MIMP', o:'Prevención y sanción del hostigamiento sexual', n:'canal de denuncia, comité de intervención, plazos de investigación y medidas de protección'},
   {a:'Ley 32721 y D.S. 003-2026-SA', o:'Descanso sentado y prevención de la exposición a radiación solar', n:'obligaciones incorporadas en 2026 en materia de condiciones de trabajo'}
  ]
 },
 {
  id:'m7t5', titulo:'La inspección del trabajo: SUNAFIL, infracciones y sanciones', min:26,
  cont:`SUNAFIL es a lo laboral lo que SUNAT es a lo tributario, con una diferencia importante: su inspector puede **entrar sin previo aviso** al centro de trabajo y lo que vea allí es prueba. No hay requerimiento previo ni plazo para prepararse.

# Qué es SUNAFIL y qué puede hacer
La **Superintendencia Nacional de Fiscalización Laboral** es un organismo técnico especializado adscrito al Ministerio de Trabajo, creado por la Ley 29981, que ejerce la función inspectiva conforme a la **Ley 28806** (Ley General de Inspección del Trabajo) y su reglamento, el **D.S. 019-2006-TR**.

|Tipo de actuación|Para qué|
|**Orientación y asistencia técnica**|Informar y asesorar sobre el cumplimiento|
|**Actuaciones inspectivas de investigación**|Verificar el cumplimiento y, si corresponde, extender acta de infracción|
|**Actuaciones de comprobación**|Verificar el cumplimiento de una medida inspectiva previa|

**Cómo se origina una inspección:**
|Origen|Observación|
|**Denuncia**|La más frecuente. **El denunciante no es parte** del procedimiento y su identidad está protegida|
|Orden de autoridad superior|Por planes o campañas sectoriales|
|Decisión interna|Según los planes anuales de inspección|
|Petición de otro órgano del Estado|Por ejemplo tras un accidente notificado|

> La mayoría de las inspecciones nace de una **denuncia**, normalmente de un ex trabajador. Eso tiene una consecuencia práctica: el momento de mayor riesgo de inspección es justo después de un cese conflictivo o de una liquidación mal pagada. Un cese bien hecho y una liquidación pagada en 48 horas son, además de una obligación, la mejor prevención de inspecciones.

# Las facultades del inspector (art. 5 de la LGIT)
|Facultad|Alcance|
|**Entrar libremente y sin previo aviso** en el centro de trabajo|En cualquier momento de la jornada. No requiere autorización ni anuncio|
|Practicar cualquier **diligencia de investigación**|Recorrer instalaciones, tomar fotografías, medir|
|**Entrevistar** a los trabajadores|**A solas y sin presencia del empleador**, si lo considera necesario|
|**Requerir información** y examinar documentación|Planillas, contratos, registros de asistencia, documentación de SST|
|**Requerir la comparecencia** del empleador o sus representantes|En las oficinas de la inspección|
|Tomar **muestras** y realizar mediciones|Ruido, iluminación, sustancias|
|Adoptar **medidas inspectivas**|Advertencia, requerimiento, paralización|

! La facultad de **entrevistar a los trabajadores a solas** es la que más resultados produce y la que más sorprende a los empleadores. Un trabajador que, preguntado sin su jefe delante, dice que trabaja hasta las nueve de la noche, que no recibió capacitación en seguridad o que no sabe con qué empresa tiene contrato, está aportando la prueba central del acta de infracción.

# Las medidas inspectivas
|Medida|Cuándo|Efecto|
|**De advertencia**|Incumplimientos leves, fácilmente subsanables|Se advierte y se verifica|
|**De requerimiento**|Incumplimientos que deben corregirse|Se otorga un **plazo para subsanar**. **Si se subsana en el plazo, puede no extenderse acta de infracción**|
|**De paralización o prohibición de trabajos**|**Riesgo grave e inminente** para la seguridad o salud|Inmediata, ejecutable en el acto|
|Requerimiento de **clausura** o de otras medidas|Casos graves|A través del MTPE|

$ La medida de REQUERIMIENTO es la oportunidad más valiosa del procedimiento:
$ subsanar dentro del plazo puede evitar el acta de infracción y la multa

Esta es la diferencia práctica más importante entre una empresa bien asesorada y una que no lo está. Recibir un requerimiento y subsanar en el plazo cierra el asunto sin sanción; ignorarlo garantiza el acta.

# Las etapas del procedimiento
$ 1) ACTUACIONES INSPECTIVAS (visita, requerimientos, verificación) — plazo de 30 días hábiles,
$    prorrogable según la complejidad
$ 2) ACTA DE INFRACCIÓN, si los incumplimientos no se subsanaron
$ 3) PROCEDIMIENTO ADMINISTRATIVO SANCIONADOR:
$    imputación de cargos → 15 días hábiles para DESCARGOS → resolución de 1ra instancia
$ 4) APELACIÓN: 15 días hábiles → resolución de 2da instancia
$ 5) RECURSO DE REVISIÓN ante el TRIBUNAL DE FISCALIZACIÓN LABORAL

El **Tribunal de Fiscalización Laboral** es la última instancia administrativa y emite **precedentes de observancia obligatoria** que vinculan a toda la inspección. Conocer sus criterios es parte del trabajo de quien asesora en esta materia.

# La calificación de las infracciones
Las infracciones se clasifican en **leves**, **graves** y **muy graves**, por materias:

|Materia|Ejemplos de infracción|
|**Relaciones laborales**|No pagar remuneraciones o beneficios; no entregar boletas; no llevar registro de asistencia; incumplir la jornada|
|**Seguridad y salud en el trabajo**|No contar con IPERC; no capacitar; no realizar exámenes médicos; no contar con comité o supervisor|
|**Empleo y colocación**|Incumplir cuotas y normas de contratación de personas con discapacidad o de extranjeros|
|**Intermediación y tercerización**|Intermediar actividades principales; tercerizar sin cumplir los requisitos|
|**Labor inspectiva**|**Obstrucción** a la actuación inspectiva|

**Las infracciones muy graves más frecuentes:**
|Infracción|Por qué es muy grave|
|**No registrar a un trabajador en planilla**|Lo deja sin cobertura de salud, pensiones y SCTR|
|**Trabajo infantil** o trabajo forzoso|Derechos fundamentales|
|**Discriminación** en el empleo|Derecho fundamental|
|Incumplimientos de SST que generan **riesgo grave e inminente**|Peligro directo a la vida|
|**No contar con SCTR** en actividad de riesgo|Deja al trabajador sin cobertura del riesgo específico|
|**Obstrucción** a la labor inspectiva|Impide la función de fiscalización|
|**Hostigamiento sexual** y actos contra la dignidad|Derecho fundamental|
|Desnaturalización de la **intermediación o tercerización**|Fraude a las normas laborales|

! La **obstrucción a la labor inspectiva** es una infracción autónoma y muy grave. Negar el ingreso al inspector, no entregar la documentación requerida, impedir las entrevistas a los trabajadores o retrasar deliberadamente la atención se sanciona **además** de los incumplimientos de fondo. Una empresa que obstruye convierte una inspección de dos infracciones en una de tres, y la tercera es la más grave.

# El cálculo de la multa
Las multas se fijan en **UIT**, según dos variables: el **tipo de empresa** y el **número de trabajadores afectados**, conforme a las tablas del D.S. 019-2006-TR, modificado por el D.S. 008-2020-TR.

|Tipo de empresa|Rango aproximado de la multa por infracción **muy grave**|
|**Microempresa**|De alrededor de **0.23 UIT** (1 afectado) hasta cerca de **0.68 UIT**|
|**Pequeña empresa**|De alrededor de **0.77 UIT** hasta cerca de **7.65 UIT**|
|**No MYPE**|De alrededor de **2.63 UIT** hasta cerca de **52.53 UIT**|

$ UIT 2026 = S/ 5,500
$ Multa muy grave máxima para una empresa no MYPE ≈ 52.53 × 5,500 ≈ S/ 288,900 por infracción
$ TOPE ANUAL: las multas no pueden superar 200 UIT (S/ 1,100,000) por sujeto inspeccionado
$ MYPE inscrita en el REMYPE: la multa no puede exceder el 1% de los ingresos netos
$ del ejercicio anterior

! Verifica siempre las **tablas vigentes** antes de estimar una multa: los valores se han modificado en varias ocasiones y las escalas por número de afectados son detalladas. Y nota el efecto decisivo del **REMYPE**: para una MYPE inscrita, el tope del 1% de los ingresos netos puede reducir la multa a una fracción. Es una razón más para verificar la vigencia de la inscripción.

**La magnitud del número de afectados.** Una misma infracción cuesta muy distinto según cuántos trabajadores comprenda. Para una empresa no MYPE, una infracción muy grave que afecta a 5 trabajadores está en un orden de magnitud, y la misma infracción afectando a 200 está en otro completamente distinto. Por eso los incumplimientos **sistémicos** —los que afectan a toda la planilla, como no provisionar un beneficio o no llevar registro de asistencia— son los más caros.

# Las reducciones de la multa
El reglamento prevé reducciones por la **subsanación** de las infracciones y por el **pronto pago**, con porcentajes y condiciones que han sido modificados en varias oportunidades.

$ La regla que importa, por encima de los porcentajes concretos:
$ MIENTRAS MÁS TEMPRANO SE SUBSANA, MENOS SE PAGA
$ Y si se subsana dentro del plazo de la MEDIDA DE REQUERIMIENTO,
$ puede no haber acta de infracción ni multa

> Verifica los porcentajes vigentes en el reglamento y en las resoluciones de SUNAFIL antes de asesorar: las fuentes secundarias son inconsistentes en este punto y la norma ha cambiado. Lo que no cambia es la lógica: la subsanación temprana es siempre la opción más barata, igual que en materia tributaria.

# Cómo atender una inspección: el protocolo
**Antes de que llegue (lo que decide el resultado):**
1. El **expediente laboral** completo y ordenado, por trabajador.
2. El **registro de control de asistencia** al día y fiel.
3. La **documentación de SST** completa: IPERC, capacitaciones, exámenes, cargos de EPP.
4. Las **boletas** entregadas y las constancias de CTS archivadas.
5. Los **contratos** vigentes, sin vencidos en ejecución.
6. El **T-Registro** coherente con la realidad del centro de trabajo.

**Cuando el inspector llega:**
1. **Verificar la identidad y la credencial** del inspector, y registrar su nombre y número.
2. **Permitir el ingreso**: negarlo es obstrucción, una infracción muy grave autónoma.
3. **Avisar de inmediato** al contador y a la gerencia; designar un **interlocutor único**.
4. **No impedir ni condicionar** las entrevistas a los trabajadores. El inspector puede hacerlas a solas.
5. **Entregar lo requerido** con **relación detallada y cargo de recepción**, igual que en una fiscalización tributaria.
6. Si algo no está disponible en el momento, **decirlo y pedir plazo por escrito**, no improvisar ni inventar.
7. **Documentar todo lo que ocurre**: qué se pidió, qué se entregó, qué se dijo, a qué hora.
8. **Leer con cuidado el acta** o la constancia de la visita antes de firmar, y dejar constancia de cualquier observación.

**Después de la visita:**
1. **Si se emite una medida de requerimiento: subsanar dentro del plazo.** Es la oportunidad de evitar la multa, y se desaprovecha por pura inacción con más frecuencia de lo que parece.
2. Si se extiende **acta de infracción**, preparar los **descargos** en los 15 días hábiles, con documentación, no con argumentos.
3. Evaluar la **subsanación** incluso después del acta, por su efecto en la reducción.
4. Corregir la **causa raíz**: una segunda inspección por el mismo incumplimiento es un agravante.

! El error más caro de todos no es un incumplimiento: es **no responder el requerimiento**. Una empresa que recibe un plazo para subsanar y lo deja pasar convierte una advertencia gratuita en una multa de varias UIT, por pura omisión administrativa.

# Lo que un inspector revisa en los primeros veinte minutos
$ 1) Cuenta a las personas que están trabajando
$ 2) Las compara con el T-REGISTRO
$ 3) Pide el REGISTRO DE CONTROL DE ASISTENCIA
$ 4) Entrevista a dos o tres trabajadores a solas
$ 5) Pide la documentación de SST: IPERC, capacitaciones, exámenes, cargos de EPP
$ 6) Pide las últimas boletas y las constancias de depósito de CTS

Esos seis pasos detectan la mayoría de los incumplimientos. Y los seis son exactamente los que una empresa puede auto-verificar en una hora, cualquier día, sin esperar a que alguien llegue a hacerlo por ella.`,
  claves:['El inspector de SUNAFIL puede entrar sin previo aviso y entrevistar a los trabajadores a solas: lo que vea y lo que le digan es prueba.','La medida de requerimiento es la oportunidad más valiosa: subsanar en el plazo puede evitar el acta de infracción y la multa.','La obstrucción a la labor inspectiva es una infracción muy grave autónoma, que se suma a los incumplimientos de fondo.','La multa depende del tipo de empresa y del número de trabajadores afectados; el tope anual es de 200 UIT por sujeto inspeccionado.','Para una MYPE inscrita en el REMYPE la multa no puede exceder el 1% de los ingresos netos del ejercicio anterior.'],
  preg:[
   {p:'¿Por qué el inspector puede entrevistar a los trabajadores a solas y qué consecuencia tiene?',
    r:'Porque es la única forma de obtener información veraz. Un trabajador interrogado con su jefe delante no dirá que trabaja hasta las nueve de la noche, que nunca recibió capacitación en seguridad o que le pagan una parte sin boleta. La facultad de entrevistar a solas está en el artículo 5 de la Ley General de Inspección del Trabajo y es, en la práctica, la que produce la mayoría de las actas de infracción. La consecuencia para la empresa es decisiva: su cumplimiento no se evalúa por los documentos que presenta sino por la coherencia entre esos documentos y lo que sus trabajadores relatan. Una empresa con registros impecables y trabajadores que describen otra realidad está en peor posición que una con registros incompletos y trabajadores que confirman lo que dicen.'},
   {p:'¿Por qué se dice que la medida de requerimiento es la oportunidad más valiosa del procedimiento?',
    r:'Porque es la única etapa en la que el incumplimiento puede corregirse **sin sanción**. Cuando el inspector emite una medida de requerimiento, otorga un plazo para subsanar; si la empresa subsana dentro de ese plazo y lo acredita, puede no extenderse acta de infracción, y sin acta no hay procedimiento sancionador ni multa. Es, literalmente, una advertencia gratuita. Y es también la oportunidad que más se desperdicia, no por decisión sino por inacción: llega el requerimiento, nadie lo procesa con urgencia, vence el plazo y la empresa termina pagando una multa de varias UIT por un incumplimiento que podía haber corregido en una semana.'},
   {p:'¿Por qué negar el ingreso al inspector agrava la situación en lugar de protegerla?',
    r:'Porque la **obstrucción a la labor inspectiva** es una infracción autónoma y **muy grave**, que se sanciona además de los incumplimientos de fondo. Negar el ingreso, no entregar documentación, impedir las entrevistas o demorar deliberadamente la atención no evita la inspección: el inspector volverá, eventualmente con apoyo, y la empresa tendrá una infracción más, de la categoría más severa. Además, la obstrucción comunica a la autoridad que hay algo que ocultar, lo que orienta la revisión. La estrategia correcta es exactamente la contraria: permitir el ingreso, designar un interlocutor único, entregar lo pedido con cargo de recepción y documentar todo lo que ocurre.'},
   {p:'¿Por qué los incumplimientos sistémicos son los más caros?',
    r:'Porque la multa se calcula según el **número de trabajadores afectados**, y un incumplimiento sistémico afecta a toda la planilla. No llevar registro de control de asistencia, no provisionar ni pagar un beneficio, no capacitar en seguridad o no realizar exámenes médicos son incumplimientos que, por su naturaleza, comprenden a todos los trabajadores. Una infracción grave que afecta a 3 personas y la misma infracción afectando a 80 están en órdenes de magnitud completamente distintos según las tablas. Esto tiene una implicancia práctica para priorizar: al revisar el cumplimiento de una empresa, conviene atacar primero lo que afecta a todos, aunque parezca menos grave que un caso individual.'},
   {p:'¿Por qué el momento de mayor riesgo de inspección es después de un cese?',
    r:'Porque la mayoría de las inspecciones se origina en una **denuncia**, y quien denuncia es típicamente un ex trabajador. Un cese conflictivo, una liquidación pagada tarde o mal calculada, o la retención de la constancia de cese son los detonantes habituales. Y el denunciante no es parte del procedimiento, de modo que su denuncia abre una inspección que puede revisar el cumplimiento respecto de **todos** los trabajadores, no solo del suyo. La implicancia es directa: un cese bien hecho —procedimiento correcto, liquidación en 48 horas, los cinco documentos entregados— no es solo el cumplimiento de una obligación, es la medida preventiva más eficaz contra una inspección que revisará toda la empresa.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Un inspector de SUNAFIL llega sin aviso y pide ingresar. El gerente no está. ¿Qué corresponde hacer?',
    o:['Negar el ingreso hasta que llegue el gerente','Verificar su credencial, permitir el ingreso y avisar de inmediato al gerente y al contador','Pedirle que vuelva con cita previa','Permitir el ingreso pero no entregar ningún documento hasta tener abogado'],r:1,
    s:'**Verificar su credencial, permitir el ingreso y avisar de inmediato.** El inspector tiene la facultad legal de entrar libremente y **sin previo aviso** al centro de trabajo, en cualquier momento de la jornada.\n\nNegar el ingreso, pedirle que vuelva con cita o retener toda la documentación configura **obstrucción a la labor inspectiva**, que es una infracción autónoma y **muy grave**, sancionada además de los incumplimientos que se encuentren. La ausencia del gerente no es causa para negar el acceso.\n\nLo correcto es: registrar el nombre y número de credencial del inspector, permitir el ingreso, avisar de inmediato al gerente y al contador, designar un interlocutor único y entregar lo requerido con relación detallada y cargo de recepción. Pedir un plazo razonable por escrito para documentación que no está disponible en el momento es legítimo; negarse en bloque, no.'},
   {l:1,t:'mc',p:'Una empresa recibe una medida de requerimiento con plazo para subsanar. ¿Qué conviene hacer?',
    o:['Esperar el acta de infracción y después discutirla','Subsanar dentro del plazo y acreditarlo, porque puede evitar el acta y la multa','Presentar un recurso contra el requerimiento','Nada, porque el requerimiento no es sancionador'],r:1,
    s:'**Subsanar dentro del plazo y acreditarlo documentadamente.** La medida de requerimiento es la única etapa del procedimiento en que el incumplimiento puede corregirse sin sanción: si se subsana en el plazo y se acredita, puede no extenderse acta de infracción, y sin acta no hay procedimiento sancionador ni multa.\n\nEs, en efecto, una advertencia gratuita. Y es la oportunidad que más se desaprovecha, casi siempre por inacción administrativa: el requerimiento llega, nadie lo procesa con urgencia y vence el plazo. La empresa termina pagando varias UIT por algo que podía corregir en días.\n\nLa acción correcta es tratar el requerimiento como lo más urgente de la semana: identificar exactamente qué se requiere, subsanarlo, documentarlo y presentar la acreditación antes del vencimiento, con cargo de recepción.'},
   {l:2,t:'ab',p:'Durante una inspección en una empresa no MYPE de 60 trabajadores, el inspector detecta: 2 trabajadores no registrados en el T-Registro, ausencia de registro de control de asistencia para toda la planilla, y falta de exámenes médicos ocupacionales de los 60 trabajadores. Analiza la exposición y la estrategia.',
    s:'**Paso 1 — Calificar cada infracción y determinar el número de afectados**\n\n| Infracción | Calificación | Afectados | Por qué ese número |\n|---|---|---|---|\n| No registrar trabajadores en planilla | **Muy grave** | **2** | Solo los dos no registrados |\n| No llevar registro de control de asistencia | **Grave** | **60** | Es un incumplimiento **sistémico**: afecta a toda la planilla |\n| No realizar exámenes médicos ocupacionales | **Grave** (materia de SST) | **60** | Sistémico |\n\n**Paso 2 — La observación clave del caso**\n\nLa intuición dice que lo más grave es tener trabajadores no registrados, porque es la única infracción **muy grave**. Pero con solo 2 afectados, su multa puede ser **menor** que la de las dos infracciones graves que afectan a los 60. Las tablas del D.S. 019-2006-TR escalan fuertemente con el número de afectados: para una empresa no MYPE, una infracción grave con 51 a 100 afectados se ubica en un tramo muy superior al de una muy grave con 1 a 10 afectados.\n\n$ Lección: en materia de multas laborales, el número de AFECTADOS\n$ pesa tanto o más que la gravedad de la infracción\n\n**Paso 3 — Estimar el orden de magnitud**\n\nCon UIT de S/ 5,500 y según los tramos de la tabla para empresas no MYPE:\n\n| Infracción | Tramo de afectados | UIT aproximadas | Importe aproximado |\n|---|---|---|---|\n| Muy grave, 2 afectados | 1 a 10 | ~2.63 | ~14,500 |\n| Grave, 60 afectados | 51 a 100 | ~8.00 | ~44,000 |\n| Grave, 60 afectados | 51 a 100 | ~8.00 | ~44,000 |\n| **Total estimado** | | | **~102,500** |\n\nVerifica las tablas vigentes antes de dar una cifra a un cliente: los valores se han modificado y el tramo exacto depende del número preciso de afectados. El tope anual es de **200 UIT** (S/ 1,100,000) por sujeto inspeccionado, muy por encima de esta estimación.\n\n**Paso 4 — La estrategia, ordenada por urgencia real**\n\n**Acción inmediata, el mismo día (antes de que concluyan las actuaciones inspectivas):**\n\n| Nº | Acción | Por qué es lo primero |\n|---|---|---|\n| 1 | **Registrar en el T-Registro a los 2 trabajadores** | Es inmediato, gratuito y les da cobertura de EsSalud y SCTR hoy. Además de reducir la exposición, protege a dos personas |\n| 2 | **Implementar el registro de control de asistencia** | Puede ser un cuaderno foliado el primer día y un sistema digital la semana siguiente. Lo importante es que empiece a existir |\n| 3 | **Contratar la campaña de exámenes médicos ocupacionales** y acreditar la contratación | No se pueden hacer 60 exámenes en un día, pero sí se puede acreditar el contrato, el cronograma y el inicio de la campaña |\n\n**Si el inspector emite medida de requerimiento:** subsanar lo que sea subsanable dentro del plazo y acreditarlo con documentación. Para los exámenes médicos, presentar el contrato con el centro médico y el cronograma de ejecución, con los primeros exámenes ya realizados. Es la vía que puede evitar el acta.\n\n**Si se extiende acta de infracción:**\n\n| Acción | Plazo |\n|---|---|\n| Preparar descargos con **documentación**, no con argumentos | 15 días hábiles desde la imputación de cargos |\n| Acreditar la subsanación ya realizada | Con los descargos, por su efecto en la reducción |\n| Verificar el **cálculo** de la multa: tipo de empresa y número de afectados correctos | Un error en el número de afectados cambia el tramo completo |\n| Verificar la **notificación** y la motivación del acta | Vicios de forma alegables |\n\n**Paso 5 — Qué más revisará el inspector, y es lo que hay que anticipar**\n\nUna inspección que encontró estos tres incumplimientos no se detendrá ahí. Lo que viene:\n\n| Qué revisará | Riesgo asociado |\n|---|---|\n| Los 2 trabajadores no registrados: ¿cuánto tiempo laboraron sin registro? | Beneficios impagos, aportes omitidos, retenciones no efectuadas |\n| Sin registro de asistencia: ¿hay horas extras no pagadas? | Pasivo por sobretiempo con la jornada que afirmen los trabajadores |\n| Sin exámenes médicos: ¿qué más falta del sistema de SST? | IPERC, capacitaciones, comité (con 60 trabajadores **corresponde comité paritario**), reglamento interno de SST, cargos de EPP |\n| ¿Hay SCTR si la actividad es de riesgo? | Infracción muy grave adicional |\n| Entrevistas a trabajadores | Pueden revelar incumplimientos no documentados |\n\n**Y el frente tributario que se abre en paralelo:** los 2 trabajadores no registrados implican EsSalud omitido, aportes previsionales no retenidos y una PLAME que declaró cifras incompletas. Eso es materia de SUNAT, con la infracción del numeral 1 del artículo 178. Conviene **subsanar voluntariamente** ese frente de inmediato, antes de cualquier notificación de SUNAT, para acceder a la rebaja del 95%.\n\n**La conclusión para el informe a la gerencia:** la exposición estimada ronda los S/ 100,000, y los tres incumplimientos se podían prevenir con un cuaderno de asistencia, dos altas en el T-Registro y una campaña de exámenes médicos cuyo costo es una fracción de la multa. Lo urgente hoy no es discutir el acta: es subsanar lo subsanable antes de que se cierren las actuaciones, y revisar de inmediato todo lo que el inspector aún no ha pedido.'},
   {l:2,t:'ab',p:'Elabora el protocolo de atención de inspecciones de SUNAFIL de una empresa, con la carpeta de inspección que debe estar lista permanentemente.',
    s:'**El protocolo tiene tres momentos. El primero es el que decide el resultado.**\n\n**MOMENTO 1 — La preparación permanente: la carpeta de inspección**\n\nUna carpeta física y digital, actualizada mensualmente, con **ocho secciones**. Debe poder entregarse completa en veinte minutos.\n\n| Sección | Contenido | Quién la mantiene | Actualización |\n|---|---|---|---|\n| **1. Empresa** | Ficha RUC, constancia de inscripción en el **REMYPE** si aplica, poderes vigentes del representante | Contador | Al cambiar |\n| **2. Personal** | Reporte del **T-Registro** actualizado, nómina vigente, organigrama | Encargado de planilla | Mensual |\n| **3. Contratos** | Contrato de cada trabajador con sus prórrogas, convenios de prácticas, contratos de locación de servicios | Encargado de planilla | Al contratar |\n| **4. Remuneraciones** | Boletas de los últimos 12 meses con constancia de entrega, PLAME presentadas, constancias de pago | Contador | Mensual |\n| **5. Beneficios** | Constancias de **depósito de CTS**, liquidaciones de gratificaciones, **cuadro de vacaciones** por trabajador | Contador | Semestral |\n| **6. Jornada** | **Registro de control de asistencia** de los últimos 12 meses, autorizaciones de sobretiempo, rol de turnos si aplica | Jefe de área | Diaria |\n| **7. SST** | Política, acta de constitución del comité o supervisor, **IPERC**, programa anual, constancias de **capacitaciones** con lista de asistencia, **exámenes médicos**, **cargos de entrega de EPP**, los diez registros, **póliza de SCTR** vigente | Responsable de SST | Mensual |\n| **8. Ceses** | Liquidaciones de los últimos 12 meses, certificados de trabajo, constancias de cese, bajas en el T-Registro | Contador | Al cesar |\n\n**La prueba de la carpeta:** pedirle a alguien que no la armó que encuentre, en cinco minutos, el cargo de entrega de EPP de un trabajador cualquiera y su último examen médico. Si no lo logra, la carpeta no está lista.\n\n**MOMENTO 2 — La visita inspectiva**\n\n| Minuto | Acción | Responsable |\n|---|---|---|\n| 0 | **Verificar credencial** del inspector: nombre, número, orden de inspección. Registrarlo | Recepción, según instrucción previa |\n| 0 | **Permitir el ingreso**. Negarlo es obstrucción muy grave | Recepción |\n| 1 | **Avisar** al interlocutor designado, al contador y a la gerencia | Recepción |\n| 5 | El **interlocutor único** se presenta y acompaña al inspector. Nadie más responde preguntas ni entrega documentos | Interlocutor |\n| — | **No impedir ni condicionar** las entrevistas a los trabajadores. El inspector puede hacerlas a solas | Interlocutor |\n| — | **Entregar lo requerido** con **relación detallada numerada** y **cargo de recepción**. Conservar copia íntegra | Interlocutor |\n| — | Si algo no está disponible: **decirlo y pedir plazo por escrito**. No improvisar, no inventar, no prometer lo que no existe | Interlocutor |\n| — | **Registrar en una bitácora**: hora de llegada, qué se pidió, qué se entregó, a quién se entrevistó, qué se dijo | Interlocutor |\n| Cierre | **Leer con cuidado** el acta o constancia antes de firmar. Dejar constancia escrita de cualquier observación o discrepancia | Interlocutor y contador |\n\n**Las cinco reglas que deben estar escritas y conocidas por todo el personal:**\n\n1. Si llega un inspector, se le permite ingresar y se avisa de inmediato al interlocutor designado.\n2. Solo el interlocutor entrega documentos y responde preguntas de la empresa.\n3. Si un trabajador es entrevistado, responde con la verdad. **Mentir a un inspector perjudica a la empresa**: si la versión se contradice con la de otro trabajador o con los documentos, se destruye la credibilidad de todo lo demás.\n4. Nadie oculta, retira ni modifica documentación durante una inspección. Eso agrava el caso de forma irreversible.\n5. Todo lo que ocurre se anota en la bitácora con hora.\n\n**La regla 3 merece énfasis**, porque es contraintuitiva. Un trabajador que miente para "ayudar" a la empresa y es contradicho por el registro de asistencia o por otro compañero convierte un incumplimiento discutible en un caso perdido, y puede abrir el frente de la obstrucción.\n\n**MOMENTO 3 — Después de la visita**\n\n| Si ocurre | Acción | Plazo |\n|---|---|---|\n| **Medida de advertencia** | Subsanar y documentar | De inmediato |\n| **Medida de requerimiento** | **PRIORIDAD MÁXIMA**: subsanar y acreditar dentro del plazo. Puede evitar el acta y la multa | Dentro del plazo otorgado |\n| **Medida de paralización** | Cumplir de inmediato. Es ejecutable en el acto y se refiere a riesgo grave e inminente | Inmediato |\n| **Acta de infracción** | Preparar descargos con documentación; verificar el cálculo de la multa y la notificación | 15 días hábiles desde la imputación |\n| **Resolución sancionadora** | Evaluar apelación con asesoría; considerar el efecto del pronto pago | 15 días hábiles |\n| En todos los casos | **Corregir la causa raíz** y documentarlo | 30 días |\n\n**El seguimiento obligatorio:** una segunda inspección por el mismo incumplimiento es un agravante. Después de cualquier inspección, el informe interno debe identificar no solo qué se encontró, sino **por qué** el control que debía prevenirlo falló.\n\n**La auto-inspección trimestral: los seis pasos del inspector, aplicados por la propia empresa**\n\n| Nº | Paso | Quién lo hace |\n|---|---|---|\n| 1 | Recorrer el centro de trabajo y **contar** a las personas que laboran | Contador |\n| 2 | Compararlas con el **T-Registro** | Contador |\n| 3 | Revisar el **registro de control de asistencia** del último mes y cruzarlo con la planilla | Contador |\n| 4 | **Conversar con dos o tres trabajadores** sobre su jornada, sus boletas y su capacitación en seguridad | Contador o gerencia |\n| 5 | Verificar la **documentación de SST**: IPERC, capacitaciones, exámenes, cargos de EPP | Responsable de SST |\n| 6 | Revisar las últimas **boletas** y las **constancias de CTS** | Contador |\n\nUna hora cada tres meses. Son exactamente los seis pasos que un inspector ejecuta en sus primeros veinte minutos, y la diferencia es que, hecha por la empresa, lo que se encuentra se corrige sin multa.'},
   {l:3,t:'ab',p:'Una empresa recibe una resolución sancionadora de SUNAFIL por S/ 165,000, por tres infracciones: no registrar a 4 trabajadores (muy grave), no pagar horas extras a 35 trabajadores (grave) y no contar con comité de SST (grave, 35 afectados). La empresa tiene 35 trabajadores, está inscrita en el REMYPE como pequeña empresa y sus ingresos netos del ejercicio anterior fueron S/ 2,800,000. Diseña la estrategia de defensa.',
    s:'**La defensa tiene cuatro frentes: el tope del REMYPE, el cálculo, la forma y el fondo. En ese orden, porque el primero puede resolverlo todo.**\n\n**FRENTE 1 — El tope del REMYPE: el argumento más potente y el más olvidado**\n\nPara las micro y pequeñas empresas **inscritas en el REMYPE**, el reglamento establece que la multa no puede exceder el **1% de los ingresos netos del ejercicio anterior**.\n\n$ Tope aplicable = 2,800,000 × 1% = S/ 28,000\n$ Multa impuesta = S/ 165,000\n$ Reducción potencial = S/ 137,000\n\n| Qué hay que acreditar | Documento |\n|---|---|\n| Inscripción en el REMYPE **vigente durante el periodo fiscalizado** | Constancia de inscripción con su fecha |\n| Ingresos netos del ejercicio anterior | Declaración jurada anual del Impuesto a la Renta y estados financieros |\n| Que la empresa califica como **pequeña empresa** | Ventas dentro del límite de 1,700 UIT |\n\n**Este solo argumento puede reducir la sanción en más del 80%.** Y es frecuente que la resolución lo omita, bien porque la empresa no acreditó su condición durante las actuaciones inspectivas, bien porque no se consideró. Es lo primero que hay que verificar en cualquier resolución sancionadora laboral.\n\n**FRENTE 2 — Verificar el cálculo de cada multa**\n\n| Variable | Qué verificar | Efecto de un error |\n|---|---|---|\n| **Tipo de empresa** | ¿Se aplicó la tabla de **pequeña empresa** o la de **no MYPE**? | Es la diferencia entre tramos de alrededor de 7.65 UIT y de 52.53 UIT: un orden de magnitud |\n| **Número de afectados** por infracción | 4 en la primera, 35 en las otras dos | Un afectado de más puede cambiar el tramo completo |\n| **Calificación** de cada infracción | ¿La falta de comité de SST es grave o se calificó como muy grave? | Cambia la tabla aplicable |\n| **Concurrencia** | ¿Alguna de las tres infracciones sanciona el mismo hecho que otra? | Correspondería aplicar la más grave, no sumar |\n| **UIT** utilizada | La del año en que se cometió la infracción o la vigente, según la regla aplicable | Diferencia proporcional |\n| **Reducciones** | ¿Se aplicaron las que correspondían por subsanación? | Reducción directa del importe |\n\n**El error más probable en este caso:** que se haya aplicado la tabla de empresa **no MYPE**. Con 35 trabajadores y multas que suman S/ 165,000, el orden de magnitud sugiere tramos de no MYPE. Si la empresa es pequeña empresa inscrita, la tabla es otra y el recálculo es sustancial, antes incluso de aplicar el tope del 1%.\n\n**FRENTE 3 — Los vicios de forma**\n\n| Verificación | Por qué puede anular |\n|---|---|\n| **Notificación** del acta de infracción y de la imputación de cargos: domicilio correcto, constancia válida | Una notificación defectuosa impide el ejercicio del derecho de defensa |\n| **Motivación** de la resolución: ¿responde cada argumento de los descargos? | Una resolución que omite responder un descargo tiene vicio de motivación |\n| **Plazo** de las actuaciones inspectivas: ¿se respetaron los 30 días hábiles y sus prórrogas? | Actuaciones fuera de plazo son cuestionables |\n| ¿Se emitió **medida de requerimiento** antes del acta? | Si no se dio la oportunidad de subsanar donde correspondía, es un argumento relevante |\n| Identificación precisa de los **trabajadores afectados** en cada infracción | Una imputación genérica de "35 trabajadores" sin individualizarlos es cuestionable |\n\n**FRENTE 4 — El fondo, infracción por infracción**\n\n| Infracción | ¿Defendible? | Estrategia |\n|---|---|---|\n| **No registrar 4 trabajadores** (muy grave) | **Poco defendible** si realmente laboraban sin alta en el T-Registro. Verificar si alguno era prestador de cuarta categoría genuino o practicante correctamente registrado como personal en formación, lo que reduciría el número de afectados | **Acreditar la subsanación** ya realizada y atacar el número de afectados |\n| **No pagar horas extras a 35 trabajadores** (grave) | **Depende del registro de asistencia**. Si existe y no muestra sobretiempo, hay defensa sólida. Si no existe, la jornada que afirmen los trabajadores se tiene por cierta | Exhibir el registro. Si no hay registro, aportar prueba indirecta y cuestionar la individualización de los 35 |\n| **No contar con comité de SST** (grave) | **Poco defendible**: con 35 trabajadores el comité es obligatorio y su existencia se prueba con el acta de constitución y el libro de actas | **Constituirlo de inmediato** y acreditarlo para la reducción por subsanación |\n\n**LA ESTRATEGIA RECOMENDADA**\n\n| Paso | Acción | Momento |\n|---|---|---|\n| 1 | **Subsanar todo lo subsanable de inmediato**: altas en el T-Registro, constitución del comité de SST con acta, implementación del registro de asistencia, y pago de las horas extras que se acrediten debidas | Antes de presentar el recurso |\n| 2 | Presentar **recurso de apelación** dentro de los **15 días hábiles**, invocando **primero el tope del 1%** del REMYPE, luego los errores de cálculo, luego los vicios de forma y por último el fondo | Dentro del plazo, que es perentorio |\n| 3 | Adjuntar: constancia del REMYPE vigente, declaración anual y estados financieros que acrediten los ingresos netos, y la acreditación de todas las subsanaciones | Con el recurso |\n| 4 | Evaluar el **recurso de revisión** ante el **Tribunal de Fiscalización Laboral** si la apelación no prospera, revisando sus precedentes de observancia obligatoria sobre el tope del REMYPE y sobre el cálculo de multas | Después |\n| 5 | **Corregir la causa raíz** y documentarlo: una segunda inspección por el mismo incumplimiento es un agravante | En paralelo |\n\n**El escenario probable, cuantificado:**\n\n| Escenario | Importe |\n|---|---|\n| Multa impuesta | 165,000 |\n| Con el tope del 1% del REMYPE acreditado | **28,000** |\n| Con el tope más las reducciones por subsanación | **menos de 28,000** |\n\n**Y el frente paralelo que no hay que olvidar:** los 4 trabajadores no registrados generan también contingencia **tributaria** —EsSalud omitido, aportes previsionales no retenidos, PLAME con cifras incompletas— y **pasivo laboral** por los beneficios de los periodos en que laboraron sin registro. Ese frente debe regularizarse con **subsanación voluntaria ante SUNAT**, antes de cualquier notificación suya, para acceder a la rebaja del 95% en la multa del numeral 1 del artículo 178. Resolver solo el frente de SUNAFIL deja el otro abierto, y SUNAFIL y SUNAT intercambian información.\n\n**La lección central del caso:** el argumento que vale S/ 137,000 no es jurídico ni complejo: es acreditar la inscripción en el REMYPE y los ingresos netos del ejercicio anterior. Dos documentos. Es el tipo de cosa que un contador que conoce el régimen encuentra en diez minutos y que una defensa puramente genérica pasa por alto.'}
  ],
  proy:{
   t:'Carpeta de inspección y auto-inspección de tu empresa',
   ctx:`Vas a armar la carpeta que tu empresa debe tener lista en todo momento y a hacerte tú mismo la inspección que algún día te harán.`,
   pasos:[
    'Arma la carpeta de inspección de tu empresa con sus ocho secciones, usando toda la documentación que construiste en los Módulos 6 y 7.',
    'Haz la prueba de la carpeta: verifica que cualquier documento pueda encontrarse en menos de cinco minutos. Reorganiza lo que no pase la prueba.',
    'Redacta el protocolo de atención de inspecciones con sus tres momentos, designando el interlocutor único y el suplente.',
    'Redacta las cinco reglas para todo el personal, en una sola página, lista para difundir y hacer acusar recibo.',
    'Ejecuta la auto-inspección de seis pasos sobre tu empresa simulada y documenta cada hallazgo.',
    'Para cada hallazgo, determina la infracción que configuraría, su calificación, el número de trabajadores afectados y una estimación de la multa según las tablas vigentes y el tipo de empresa.',
    'Verifica si tu empresa está inscrita en el REMYPE y, si lo está, calcula el tope del 1% de los ingresos netos del ejercicio anterior y compáralo con la multa estimada.',
    'Clasifica los hallazgos entre los que se subsanan hoy, los que requieren un plan y los que ya no se pueden corregir retroactivamente.',
    'Elabora el informe de auto-inspección con la exposición total estimada y las acciones priorizadas.'
   ],
   entrega:[
    'La carpeta de inspección completa con sus ocho secciones y la prueba de los cinco minutos superada.',
    'El protocolo de atención y la página de cinco reglas para el personal.',
    'El resultado documentado de la auto-inspección de seis pasos.',
    'El informe con la estimación de multas, el tope del REMYPE si aplica y las acciones priorizadas.'
   ],
   crit:[
    'La estimación de multas considera el número de trabajadores afectados, no solo la gravedad.',
    'Los hallazgos sistémicos (que afectan a toda la planilla) se priorizan por su mayor costo potencial.',
    'La carpeta supera efectivamente la prueba de los cinco minutos con un documento elegido al azar.'
   ],
   pista:'Al estimar las multas, compara deliberadamente una infracción muy grave con pocos afectados contra una grave con toda la planilla. El resultado suele invertir las prioridades que uno tenía, y ese es el aprendizaje del ejercicio.'
  },
  proyInt:{
   t:'Informe integral de cumplimiento laboral y tributario',
   integra:'1.1 a 7.5',
   ctx:`Vas a producir el informe que reúne los dos frentes de fiscalización —SUNAT y SUNAFIL— en un solo documento de riesgo, que es exactamente lo que una gerencia necesita para decidir.`,
   pasos:[
    'Consolida en una sola matriz todos los hallazgos de cumplimiento identificados a lo largo del curso: los tributarios del Módulo 5 y los laborales de los Módulos 6 y 7.',
    'Para cada hallazgo, completa: norma infringida, frente (SUNAT o SUNAFIL o ambos), afectados, periodos, pasivo o deuda, multa potencial con su rebaja máxima si se subsana hoy, y multa si lo detecta la autoridad.',
    'Identifica los hallazgos que tienen efecto en los dos frentes a la vez, como un trabajador no registrado, que es infracción laboral muy grave y a la vez omisión de aportes y declaración de cifras falsas.',
    'Calcula el valor de la subsanación oportuna: la diferencia entre el costo de corregir hoy y el costo de que lo detecte la autoridad, sumando ambos frentes.',
    'Clasifica los hallazgos en los tres grupos de acción y ordénalos por la relación entre riesgo evitado y costo de corregir.',
    'Actualiza el pasivo y el pasivo contingente en los estados financieros, con la evaluación de la NIC 37 de cada partida.',
    'Elabora el calendario unificado de cumplimiento tributario y laboral, con todos los vencimientos del mes en una sola vista.',
    'Redacta el informe final de dos páginas a la gerencia: exposición total, los cinco riesgos mayores, el valor de la subsanación oportuna y el plan de acción con responsables y plazos.',
    'Actualiza el expediente integral con la sección de fiscalización laboral.'
   ],
   entrega:[
    'La matriz consolidada de hallazgos de ambos frentes.',
    'El cálculo del valor de la subsanación oportuna, sumando los dos frentes.',
    'El calendario unificado de cumplimiento y los estados financieros actualizados.',
    'El informe final de dos páginas y el expediente integral actualizado.'
   ],
   crit:[
    'La matriz identifica expresamente los hallazgos con efecto en los dos frentes.',
    'El valor de la subsanación oportuna está cuantificado en soles, sumando multas tributarias y laborales.',
    'El calendario unificado muestra todos los vencimientos del mes en una sola vista, sin separar por autoridad.'
   ],
   pista:'El número que más mueve a una gerencia es el valor de la subsanación oportuna: cuánto cuesta corregir hoy frente a cuánto cuesta que lo encuentren. Calcúlalo bien y preséntalo primero; todo lo demás es el sustento.'
  },
  fuentes:[
   {a:'Ley 28806 — Ley General de Inspección del Trabajo', o:'Facultades inspectivas, medidas y procedimiento sancionador', n:'entrada sin previo aviso, entrevistas a trabajadores, medidas inspectivas y etapas del procedimiento'},
   {a:'D.S. 019-2006-TR (mod. por D.S. 008-2020-TR)', o:'Reglamento de la Ley General de Inspección del Trabajo', n:'tipificación y calificación de infracciones, tablas de multas por tipo de empresa y número de afectados, reducciones y topes'},
   {a:'Ley 29981', o:'Ley de creación de la SUNAFIL', n:'competencias, organización y el Tribunal de Fiscalización Laboral'},
   {a:'Tribunal de Fiscalización Laboral', o:'Precedentes de observancia obligatoria', n:'criterios vinculantes sobre calificación de infracciones, cálculo de multas y defectos del procedimiento'},
   {a:'Jorge Toyama Miyagusuku y Luis Vinatea Recoba', o:'Guía laboral', n:'tratamiento práctico de la inspección del trabajo y del régimen de infracciones'},
   {a:'Ley 27444 — Ley del Procedimiento Administrativo General', o:'Aplicación supletoria', n:'debido procedimiento, motivación, principios de la potestad sancionadora y régimen de notificaciones'}
  ]
 },
 {
  id:'m7t6', titulo:'Regímenes especiales, intermediación y tercerización', min:27,
  cont:`No todas las relaciones laborales se rigen por el régimen común. Hay actividades con reglas propias y hay formas de organizar el trabajo mediante terceras empresas, cada una con requisitos estrictos y con una consecuencia severa si se usan mal: la **incorporación de los trabajadores a la empresa principal**.

# Construcción civil
El régimen más distinto de todos. Se aplica a los trabajadores que realizan labores de construcción para obras cuyo **costo individual excede las 50 UIT**.

|Elemento|Regla|
|**Remuneración**|**Jornal básico diario** por categoría: **operario**, **oficial** y **peón**. Los montos los fija cada año el **convenio colectivo** de la rama (negociación entre CAPECO y la FTCCP)|
|**BUC** (Bonificación Unificada de Construcción)|**32%** del jornal básico para operarios; **30%** para oficiales y peones|
|**Bonificación por movilidad**|Equivalente a pasajes urbanos por día efectivamente laborado|
|**Asignación escolar**|**30 jornales básicos** al año por hijo, hasta el límite de hijos que fija la norma|
|**Gratificaciones**|**40 jornales básicos** en julio y **40** en diciembre, proporcionales a los días laborados (un séptimo por cada semana)|
|**CTS**|**15%** del jornal básico por cada día efectivamente laborado|
|**Vacaciones**|**10%** del jornal básico por cada día efectivamente laborado|
|**CONAFOVICER**|**2%** del jornal básico: es un **descuento al trabajador**|
|**SENCICO**|**0.2%** sobre los ingresos por obras: es **aporte del empleador**|
|**SCTR**|Obligatorio: la construcción es actividad de riesgo|

$ Verifica el convenio colectivo del periodo antes de cualquier cálculo:
$ los jornales básicos se actualizan cada año y son la base de TODO el régimen

! La particularidad del régimen es que casi todo se calcula **por día efectivamente laborado**, no por mes. La CTS y las vacaciones se pagan junto con el jornal semanal, no se depositan ni se acumulan. Es una lógica completamente distinta a la del régimen común, y aplicar las reglas comunes a construcción civil produce errores de cálculo en todos los conceptos.

# Régimen agrario (Ley 31110)
|Elemento|Regla|
|**Remuneración**|Remuneración diaria no menor a la RMV, más la **Bonificación Especial por Trabajo Agrario (BETA)**, equivalente a un porcentaje de la RMV que fija la ley|
|**Vacaciones**|**30 días**|
|**Gratificaciones y CTS**|Conforme a la ley, con la opción de incluirlas en la remuneración diaria|
|**Indemnización por despido arbitrario**|Fijada en **remuneraciones diarias** por año, con su propio tope|
|**Aporte a EsSalud**|Con una **escala gradual** establecida en la Ley 31110. **Verifica la tasa vigente**|

La Ley 31110 derogó el régimen de la Ley 27360 y elevó sustancialmente los derechos del trabajador agrario. Sus porcentajes de aporte se establecieron con una progresión en el tiempo, de modo que la tasa aplicable debe verificarse en la norma, no asumirse.

# Trabajadores del hogar (Ley 31047)
La Ley 31047 transformó este régimen, que antes era claramente inferior:

|Derecho|Regla actual|
|**Contrato**|**Por escrito**, con copia para el trabajador|
|**Remuneración**|No menor a la **RMV**|
|**Jornada**|**8 horas diarias o 48 semanales**|
|**Vacaciones**|**30 días**|
|**Gratificaciones**|**Una remuneración** cada una, dos al año|
|**CTS**|Conforme al régimen común|
|**EsSalud**|**9%** a cargo del empleador|
|**Registro**|En la **planilla electrónica**|
|**Seguro de Vida Ley**|Sí|
|**Descanso semanal**|24 horas continuas|

> Este régimen es uno de los más incumplidos del país, y la razón suele ser desconocimiento más que mala fe: muchas familias ignoran que deben registrar en planilla electrónica, aportar a EsSalud y pagar gratificaciones completas. Un contador que asesora a personas naturales debe conocerlo, porque la contingencia es real y el empleador es una persona natural que responde con su patrimonio.

# Trabajadores extranjeros (D. Leg. 689)
|Límite|Regla|
|**Número**|Los trabajadores extranjeros no pueden exceder el **20%** del total de trabajadores de la empresa|
|**Remuneraciones**|Sus remuneraciones no pueden exceder el **30%** del total de la planilla de remuneraciones|
|**Contrato**|**Por escrito**, a plazo determinado, por un máximo de **3 años prorrogables**, sujeto a aprobación por la autoridad de trabajo|

**Exoneraciones de los límites porcentuales**, entre otras: el extranjero cónyuge, ascendiente, descendiente o hermano de peruano; el que tiene visa de inmigrante; el nacional de un país con convenio de reciprocidad laboral o de doble nacionalidad; el personal de empresas de servicios multinacionales o bancos multinacionales; el inversionista extranjero con una inversión mínima permanente; y los artistas y deportistas en espectáculos públicos.

# Intermediación laboral (Ley 27626)
$ INTERMEDIACIÓN = una empresa destaca personal a otra, que es la USUARIA
$ El trabajador es de la intermediadora, pero trabaja bajo las órdenes de la usuaria

|Supuesto permitido|Qué comprende|
|**Servicios temporales**|Solo las modalidades de **suplencia** y **ocasional**|
|**Servicios complementarios**|Actividades **no vinculadas al giro principal**: vigilancia, limpieza, mantenimiento, mensajería|
|**Servicios especializados**|Actividades de **alta especialización** no vinculadas al giro principal|

|Requisito|Detalle|
|**Registro**|La empresa intermediadora debe estar inscrita en el registro correspondiente ante la autoridad de trabajo|
|**Carta fianza**|Obligatoria, para garantizar las obligaciones laborales de los trabajadores destacados|
|**Límite porcentual**|En servicios **temporales**, los trabajadores destacados no pueden exceder el **20%** del total de trabajadores de la usuaria|
|**Prohibición**|**No se puede intermediar actividades principales**, salvo en los supuestos de servicios temporales|

! **La desnaturalización de la intermediación** se produce cuando se intermedia la actividad principal fuera de los supuestos permitidos, cuando se excede el límite porcentual o cuando la intermediadora no está registrada. El efecto es que los trabajadores destacados **se consideran trabajadores de la usuaria**, con todos sus beneficios y desde el inicio del destaque.

# Tercerización (Ley 29245 y D. Leg. 1038)
$ TERCERIZACIÓN = una empresa contrata a otra para que ejecute una OBRA o un SERVICIO
$ integral, con sus propios recursos, asumiendo el riesgo del resultado

La diferencia esencial con la intermediación: en la tercerización se contrata un **resultado**, no personal. La tercerizadora dirige a sus propios trabajadores.

|Requisito de una tercerización válida|Qué significa|
|**Pluralidad de clientes**|La tercerizadora presta servicios a varias empresas (con excepciones que la norma admite)|
|**Equipamiento propio**|Usa sus propias herramientas, maquinaria y equipos|
|**Inversión de capital**|Tiene patrimonio y estructura propios|
|**Retribución por obra o servicio**|Se paga por el resultado, no por hora-hombre ni por número de personas destacadas|
|**Asunción del riesgo**|La tercerizadora responde por el resultado y asume las consecuencias del incumplimiento|
|**Autonomía**|Dirige y supervisa a sus propios trabajadores; la principal no les da órdenes directas|

**Elementos coadyuvantes** (indiciarios, no determinantes por sí solos): la forma de retribución, la existencia de una organización empresarial real, la antigüedad de la tercerizadora, la especialización del servicio.

$ Si la tercerización es una MERA PROVISIÓN DE PERSONAL:
$ los trabajadores desplazados se INCORPORAN a la empresa principal

# La responsabilidad solidaria en la tercerización
$ La empresa PRINCIPAL responde SOLIDARIAMENTE por las obligaciones laborales
$ y de seguridad social devengadas durante el DESPLAZAMIENTO,
$ y esa responsabilidad se extiende hasta UN AÑO después del desplazamiento

! Esto significa que si la tercerizadora no paga los beneficios de sus trabajadores, **la empresa principal los paga**. Es la razón por la que contratar una tercerizadora exige verificar su cumplimiento laboral de forma continua, no solo al firmar el contrato. Pedir mensualmente la planilla, las constancias de pago de aportes y los depósitos de CTS de los trabajadores desplazados no es desconfianza: es la única forma de controlar un riesgo que es propio.

# La prohibición de tercerizar el núcleo del negocio: el estado de la cuestión
El **D.S. 001-2022-TR** prohibió la tercerización de las actividades que forman parte del **núcleo del negocio** de la empresa principal, lo que tuvo un impacto importante en muchos sectores.

! En **2026 un pronunciamiento judicial declaró ilegal esa prohibición reglamentaria**, por considerar que excedía el marco de la ley. Antes de asesorar sobre una tercerización de actividades del núcleo del negocio, **verifica el estado vigente** de esa norma y de la jurisprudencia: es materia en movimiento, y una recomendación basada en información desactualizada puede ser costosa en cualquiera de las dos direcciones.

Lo que no está en discusión, y es lo que debe gobernar el análisis, son los **requisitos sustantivos** de la Ley 29245: equipamiento propio, inversión, retribución por resultado, asunción del riesgo y autonomía. Una tercerización que cumple todos ellos es sólida; una que no los cumple se desnaturaliza, con independencia de si la actividad es o no del núcleo del negocio.

# El cuadro comparativo que resuelve la mayoría de las dudas
|Aspecto|**Intermediación**|**Tercerización**|
|Qué se contrata|**Personal**|Una **obra o servicio** con resultado|
|Quién dirige a los trabajadores|La **usuaria**|La **tercerizadora**|
|Equipamiento|De la usuaria, generalmente|**Propio** de la tercerizadora|
|Forma de retribución|Por trabajador destacado|Por **obra o servicio**|
|Riesgo del resultado|De la usuaria|De la **tercerizadora**|
|Actividades permitidas|Temporales, complementarias y especializadas **no principales**|Obras o servicios integrales, con los requisitos de ley|
|Garantía exigida|**Carta fianza**|No se exige fianza, pero hay **responsabilidad solidaria**|
|Límite porcentual|**20%** en servicios temporales|No hay límite porcentual|
|Efecto de la desnaturalización|Los trabajadores pasan a ser de la **usuaria**|Los trabajadores se **incorporan a la principal**|

# La lista de verificación antes de contratar a un tercero
1. ¿Es **intermediación** o **tercerización**? La respuesta define todo el régimen aplicable.
2. Si es intermediación: ¿la empresa está **registrada**? ¿tiene **carta fianza** vigente? ¿la actividad es complementaria, especializada o temporal, y no principal? ¿se respeta el **20%** en servicios temporales?
3. Si es tercerización: ¿cumple los **seis requisitos** sustantivos? ¿la retribución es por resultado y no por hora-hombre?
4. ¿Quién **da las órdenes** a los trabajadores desplazados, en la realidad? Esta es la pregunta que un inspector hará directamente a los trabajadores.
5. ¿La empresa principal verifica **mensualmente** el cumplimiento laboral del tercero?
6. ¿Está previsto quién provee el **SCTR** y los **EPP** del personal desplazado, y quién responde por su seguridad en las instalaciones?
7. ¿El contrato civil con el tercero contiene la obligación de acreditar el cumplimiento laboral y una cláusula de retención de pagos ante el incumplimiento?

$ La pregunta 4 es la que decide los casos. Un inspector entrevista a los trabajadores
$ desplazados y pregunta: ¿quién te dice qué hacer? Si responden el nombre
$ de un jefe de la empresa principal, la tercerización está desnaturalizada.`,
  claves:['Construcción civil calcula casi todo por día efectivamente laborado, con jornales básicos que fija cada año el convenio colectivo de la rama.','La Ley 31047 equiparó a los trabajadores del hogar en jornada, vacaciones, gratificaciones, CTS y EsSalud.','La intermediación provee personal y solo procede en servicios temporales, complementarios y especializados no principales, con registro, fianza y límite del 20%.','La tercerización contrata un resultado y exige equipamiento propio, inversión, retribución por obra, asunción del riesgo y autonomía.','La empresa principal responde solidariamente por las obligaciones laborales devengadas durante el desplazamiento y hasta un año después.'],
  preg:[
   {p:'¿Cuál es la diferencia esencial entre intermediación y tercerización?',
    r:'Lo que se contrata y quién dirige. En la **intermediación** se contrata **personal**: la intermediadora destaca trabajadores que laboran bajo las órdenes de la empresa usuaria, con los medios de esta, y se paga por trabajador destacado. En la **tercerización** se contrata un **resultado**: una obra o un servicio integral que la tercerizadora ejecuta con sus propios equipos, dirigiendo a sus propios trabajadores y asumiendo el riesgo del incumplimiento; se paga por la obra o el servicio, no por persona. La consecuencia práctica es que cada figura tiene requisitos distintos —registro y carta fianza en la intermediación, los seis requisitos sustantivos en la tercerización— y confundirlas lleva a cumplir los requisitos equivocados y a desnaturalizar la relación.'},
   {p:'¿Por qué el régimen de construcción civil exige un cálculo tan distinto?',
    r:'Porque está construido sobre la **temporalidad e intermitencia** del trabajo en obra. Un trabajador de construcción puede laborar tres semanas en una obra y luego pasar a otra con otro empleador, de modo que un sistema de beneficios que se acumula por meses o semestres no funcionaría. La solución del régimen es liquidar casi todo **por día efectivamente laborado**: la CTS es el 15% del jornal básico por día y las vacaciones el 10%, y ambas se pagan junto con el jornal semanal en lugar de depositarse o acumularse. Las gratificaciones se calculan en jornales (40 en julio y 40 en diciembre) proporcionales a las semanas laboradas. Aplicar las reglas del régimen común produce errores en todos los conceptos, y aplicar las de construcción civil a un trabajador común también.'},
   {p:'¿Qué significa la responsabilidad solidaria de la empresa principal en la tercerización?',
    r:'Significa que si la tercerizadora no paga las remuneraciones, los beneficios sociales o los aportes a la seguridad social de los trabajadores desplazados, esos trabajadores pueden **cobrarle directamente a la empresa principal**. La solidaridad abarca las obligaciones devengadas durante el desplazamiento y se extiende hasta **un año después** de que este terminó. La implicancia práctica es que elegir una tercerizadora barata que no cumple es asumir su pasivo: la empresa principal termina pagando lo que no pagó el tercero, más los costos del proceso. Por eso el control del cumplimiento laboral del tercero —planilla, constancias de aportes, depósitos de CTS, verificados mensualmente— no es una cortesía: es la gestión de un riesgo propio.'},
   {p:'En una inspección, ¿cuál es la pregunta que decide si una tercerización está desnaturalizada?',
    r:'La pregunta que el inspector les hace directamente a los trabajadores desplazados: **"¿quién te dice qué hacer?"**. Si responden el nombre de un supervisor de la **empresa principal**, la autonomía —que es el requisito central de la tercerización— no existe, y la figura se desnaturaliza: lo que hay es provisión de personal disfrazada de servicio. Da lo mismo que el contrato civil esté perfectamente redactado y que la facturación diga "servicio integral de mantenimiento": por la primacía de la realidad, lo que vale es quién ejerce de hecho la dirección. La consecuencia es que los trabajadores desplazados **se incorporan a la empresa principal**, con todos sus beneficios y desde el inicio del desplazamiento.'},
   {p:'¿Cuál es el estado actual de la prohibición de tercerizar el núcleo del negocio?',
    r:'Es materia en movimiento y conviene tratarla como tal. El D.S. 001-2022-TR prohibió tercerizar las actividades del núcleo del negocio de la empresa principal, y en 2026 un pronunciamiento judicial declaró **ilegal** esa prohibición, por considerar que el reglamento excedía el marco de la ley. Antes de asesorar sobre una tercerización de actividades centrales hay que verificar el estado vigente de la norma y de la jurisprudencia, porque una recomendación basada en información desactualizada puede ser costosa en cualquiera de las dos direcciones. Lo que **no** está en discusión son los requisitos sustantivos de la Ley 29245: equipamiento propio, inversión de capital, retribución por resultado, asunción del riesgo y autonomía. Una tercerización que los cumple es sólida; una que no, se desnaturaliza igual, sea o no del núcleo del negocio.'}
  ],
  ej:[
   {l:1,t:'mc',p:'Una fábrica contrata a una empresa de limpieza que destaca a cuatro personas, les da sus propios insumos y equipos, las supervisa su propio jefe y cobra una tarifa mensual por el servicio integral. ¿Qué figura es?',
    o:['Intermediación laboral de servicios complementarios','Tercerización','Contrato de locación de servicios','Relación laboral directa con la fábrica'],r:1,
    s:'Es **tercerización**. Los elementos están todos presentes: se contrata un **servicio integral** (la limpieza del local), la empresa aporta sus **propios insumos y equipos**, **dirige y supervisa a sus propios trabajadores** mediante su propio jefe, y se retribuye **por el servicio** y no por trabajador destacado.\n\nSi en cambio la fábrica entregara los insumos, un supervisor de la fábrica diera las instrucciones diarias a las cuatro personas y se pagara por trabajador destacado, sería **intermediación** de servicios complementarios, con sus propios requisitos: registro de la intermediadora y carta fianza.\n\nY en ambos casos la fábrica responde **solidariamente** por las obligaciones laborales devengadas durante el desplazamiento, hasta un año después, de modo que debe verificar mensualmente el cumplimiento del tercero.'},
   {l:1,t:'num',p:'Una empresa tiene 50 trabajadores propios. ¿Cuál es el número máximo de trabajadores que puede recibir mediante intermediación de servicios temporales?',
    u:'trabajadores',r:10,tol:0,
    s:'El límite es del **20%** del total de trabajadores de la empresa usuaria:\n\n$ 50 × 20% = **10 trabajadores**\n\nEse límite aplica a la intermediación de **servicios temporales** (suplencia y ocasional). Los servicios **complementarios** (vigilancia, limpieza, mantenimiento) y **especializados** no están sujetos a ese porcentaje, porque por definición no corresponden al giro principal de la empresa.\n\nExceder el límite es una de las causales de **desnaturalización**: los trabajadores destacados en exceso se consideran trabajadores de la **usuaria**, con todos sus beneficios y desde el inicio del destaque.'},
   {l:2,t:'ab',p:'Una empresa minera contrata a una "empresa de servicios" que destaca 30 operadores de maquinaria. La minera provee la maquinaria, el combustible y los EPP; un supervisor de la minera organiza los turnos y da las instrucciones; se factura por hora-hombre. Analiza la situación.',
    s:'**El diagnóstico: es una provisión de personal encubierta, y la figura está desnaturalizada.**\n\n**Análisis de los requisitos de la tercerización:**\n\n| Requisito de la Ley 29245 | ¿Se cumple? | Evidencia en el caso |\n|---|---|---|\n| **Equipamiento propio** | **No** | La maquinaria, el combustible y los EPP son de la minera |\n| **Inversión de capital** | Dudoso | Sin equipos propios, su estructura es solo administrativa y de planilla |\n| **Retribución por obra o servicio** | **No** | Se factura **por hora-hombre**: se paga personal, no resultado |\n| **Asunción del riesgo** | **No** | La minera organiza la operación; el tercero no responde por el resultado |\n| **Autonomía** | **No** | Un **supervisor de la minera** organiza turnos y da instrucciones |\n| Pluralidad de clientes | A verificar | Si es un cliente único sin excepción aplicable, se suma al cuadro |\n\n**Cinco de los seis requisitos fallan.** No es una tercerización: es intermediación de la **actividad principal** de la minera, que además está prohibida fuera de los supuestos de servicios temporales.\n\n**Las consecuencias:**\n\n| Consecuencia | Detalle |\n|---|---|\n| **Incorporación de los trabajadores** | Los 30 operadores se consideran **trabajadores de la minera**, desde el inicio del desplazamiento |\n| **Diferencia de beneficios** | La minera probablemente tiene convenio colectivo y condiciones superiores. La diferencia entre lo que percibieron y lo que les correspondía como trabajadores de la minera es un pasivo por los 30, por todos los periodos no prescritos |\n| **Infracción muy grave** | La desnaturalización de la intermediación o tercerización está calificada como muy grave. Con **30 trabajadores afectados**, la multa se ubica en un tramo elevado de las tablas |\n| **Responsabilidad solidaria** | Por las obligaciones devengadas durante el desplazamiento y hasta un año después |\n| **Frente tributario** | Las facturas por hora-hombre podrían ser cuestionadas en cuanto a su sustancia; los trabajadores debieron estar en la planilla de la minera, con EsSalud y retenciones de quinta a su cargo |\n| **Seguridad y salud** | La minera provee los EPP y organiza el trabajo en una actividad de **alto riesgo**: su deber de prevención sobre esas 30 personas es directo e indelegable, y el SCTR debe cubrirlas |\n\n**El agravante del sector:** en minería, una actividad de alto riesgo, la desnaturalización se cruza con la SST. Si uno de los 30 operadores sufre un accidente, la minera responde como empleador directo, con todo lo que eso implica en los tres frentes del subtema anterior, incluido el penal.\n\n**Las dos salidas posibles:**\n\n**Opción A — Incorporar a los 30 a la planilla de la minera**\n\n| Aspecto | Detalle |\n|---|---|\n| Qué implica | Reconocer la relación laboral directa, con las condiciones que corresponden a los trabajadores de la minera |\n| Costo | El incremento de costo laboral permanente, más la regularización del pasivo de los periodos no prescritos |\n| Ventaja | Elimina la contingencia de raíz. Es la única solución definitiva |\n\n**Opción B — Rediseñar el contrato como tercerización genuina**\n\nNo basta con reescribir el contrato: hay que **cambiar la realidad**, y eso significa:\n\n| Cambio necesario | Qué implica en la práctica |\n|---|---|\n| El tercero aporta **su propia maquinaria** | Inversión real de capital, o arrendamiento a su nombre y riesgo |\n| La retribución pasa a ser **por resultado** | Por metros cúbicos movidos, toneladas transportadas, metros de avance: una unidad de obra, no horas-hombre |\n| El tercero **dirige a su personal** | Supervisores propios. **Ningún** jefe de la minera da instrucciones a los operadores |\n| El tercero **asume el riesgo** | Penalidades por incumplimiento del resultado, no por ausencia de personal |\n| El tercero provee **sus EPP** y gestiona su propio sistema de SST | Sin perjuicio del deber de la minera de garantizar la seguridad en sus instalaciones, que es irrenunciable |\n| Verificación **mensual** del cumplimiento laboral del tercero | Planilla, constancias de aportes, depósitos de CTS, póliza de SCTR |\n\n**La advertencia que hay que dar por escrito:** la opción B solo funciona si la realidad cambia de verdad. Un contrato reescrito sobre la misma operación —misma maquinaria de la minera, mismo supervisor dando órdenes, misma facturación por horas— no cambia nada: por la primacía de la realidad, un inspector entrevistará a los operadores, preguntará quién les dice qué hacer, y la respuesta será la misma que hoy. Y además el rediseño **no borra el pasado**: el pasivo de los periodos ya transcurridos sigue existiendo y debe cuantificarse y provisionarse.\n\n**Y la verificación pendiente sobre el núcleo del negocio:** operar maquinaria en una mina puede considerarse actividad del núcleo del negocio minero. El D.S. 001-2022-TR prohibió tercerizar esas actividades, y en 2026 un pronunciamiento judicial declaró ilegal esa prohibición. **Hay que verificar el estado vigente de esa norma** antes de recomendar la opción B. Pero nótese lo esencial: en este caso la desnaturalización no depende de esa discusión, porque fallan cinco de los seis requisitos sustantivos de la Ley 29245. La tercerización se cae por su propio peso.'},
   {l:2,t:'num',p:'Un operario de construcción civil trabajó 24 días en el mes. Su jornal básico es S/ 85 diarios. Calcula su CTS y sus vacaciones del mes, que se pagan junto con el jornal.',
    u:'S/',r:510,tol:5,
    s:'En el régimen de construcción civil, la CTS y las vacaciones se calculan como un **porcentaje del jornal básico por cada día efectivamente laborado**, y se pagan junto con el jornal semanal en lugar de depositarse o acumularse.\n\n| Concepto | Porcentaje | Cálculo | Importe |\n|---|---|---|---|\n| **CTS** | 15% del jornal básico por día | 85 × 15% × 24 días | 306.00 |\n| **Vacaciones** | 10% del jornal básico por día | 85 × 10% × 24 días | 204.00 |\n| **Total** | | | **S/ 510.00** |\n\nY nótese lo que **no** aparece en este cálculo pero sí corresponde pagar en el mes:\n\n| Otro concepto | Base |\n|---|---|\n| Jornal básico | 85 × 24 = 2,040 |\n| **BUC** (32% para operario) | 2,040 × 32% = 652.80 |\n| Bonificación por movilidad | pasajes por día laborado |\n| Descuento de **CONAFOVICER** (2% del jornal básico) | 2,040 × 2% = 40.80, **a cargo del trabajador** |\n\nY a cargo del empleador, además del EsSalud: el **SENCICO** (0.2% sobre los ingresos por obras) y el **SCTR**, obligatorio porque la construcción es actividad de riesgo.\n\n**Verifica el convenio colectivo del periodo** antes de hacer este cálculo con datos reales: el jornal básico por categoría se actualiza cada año en la negociación de la rama, y es la base de absolutamente todo el régimen.'},
   {l:3,t:'ab',p:'Diseña el sistema de control de terceros de una empresa industrial que tiene: una empresa de vigilancia (6 personas), una de limpieza (4 personas), una tercerizadora de mantenimiento mecánico (8 personas) y 3 practicantes. Incluye la verificación mensual y las cláusulas contractuales.',
    s:'**PASO 1 — Calificar cada relación, porque el régimen aplicable depende de eso**\n\n| Tercero | Figura | Fundamento | Requisitos aplicables |\n|---|---|---|---|\n| **Vigilancia (6)** | **Intermediación de servicios complementarios** | La vigilancia no es el giro de una industrial | Registro de la intermediadora, **carta fianza** vigente. Sin límite del 20% (no es servicio temporal) |\n| **Limpieza (4)** | **Intermediación complementaria** o **tercerización**, según cómo opere | Si la industrial provee insumos y supervisa: intermediación. Si la empresa aporta insumos, equipos, supervisor propio y cobra por servicio: tercerización | Según la calificación real, no según el contrato |\n| **Mantenimiento mecánico (8)** | **Tercerización** si cumple los seis requisitos | Es un servicio técnico integral | Los seis requisitos sustantivos de la Ley 29245 |\n| **Practicantes (3)** | **Modalidad formativa** (Ley 28518) | No hay vínculo laboral | Convenio, plan de aprendizaje, tutor, subvención, seguro, **límite del 20%** del personal |\n\n**Verificación del límite de practicantes:** 3 practicantes sobre el total de trabajadores propios de la industrial. Si la industrial tiene 30 trabajadores propios, el límite es de 6, y los 3 están dentro. **El personal de terceros no se computa** para ese límite.\n\n**PASO 2 — La verificación documental al contratar**\n\n| Documento a exigir | Vigilancia | Limpieza | Mantenimiento |\n|---|---|---|---|\n| Ficha RUC y vigencia de poderes | Sí | Sí | Sí |\n| **Registro como empresa de intermediación** | **Sí** | Si es intermediación | No aplica |\n| **Carta fianza** vigente y suficiente | **Sí** | Si es intermediación | No se exige |\n| Relación nominal del personal a destacar | Sí | Sí | Sí |\n| Contratos de trabajo del personal destacado | Sí | Sí | Sí |\n| **Póliza de SCTR** del personal destacado | Sí | Sí | **Crítico**: mantenimiento mecánico es de riesgo |\n| Documentación de SST del tercero: IPERC, capacitaciones, exámenes médicos, cargos de EPP | Sí | Sí | **Sí, con detalle** |\n| Evidencia de **pluralidad de clientes** | — | Si es tercerización | **Sí** |\n| Acreditación de **equipamiento propio** e inversión | — | Si es tercerización | **Sí** |\n| Estados financieros o evidencia de solvencia | Recomendable | Recomendable | **Recomendable**: la solidaridad es de la industrial |\n\n**PASO 3 — La verificación MENSUAL, que es el corazón del sistema**\n\nLa responsabilidad solidaria abarca las obligaciones devengadas durante el desplazamiento y hasta **un año después**. No es un riesgo del tercero: es un riesgo propio. Por eso el control debe ser mensual y condicionar el pago.\n\n| Nº | Documento a exigir cada mes, antes de pagar la factura | Qué previene |\n|---|---|---|\n| 1 | **Planilla** del mes del personal destacado | Que haya personal no registrado |\n| 2 | **Boletas de pago** firmadas o con constancia de entrega | Remuneraciones impagas |\n| 3 | **Constancia de presentación y pago de la PLAME** | Aportes a EsSalud omitidos |\n| 4 | **Constancia de pago de AFPnet** o de ONP | Retenciones previsionales impagas |\n| 5 | **Constancias de depósito de CTS** (en mayo y noviembre) | Beneficios impagos |\n| 6 | **Liquidaciones** del personal que cesó | Pasivo por ceses |\n| 7 | **Póliza de SCTR** vigente con la relación del personal cubierto | Que alguien trabaje sin cobertura de riesgo |\n| 8 | **Carta fianza** vigente (en intermediación) | Garantía vencida |\n| 9 | Constancias de **capacitaciones de SST** del mes | Incumplimiento de SST en las instalaciones de la industrial |\n| 10 | Relación **actualizada** del personal destacado | Personas trabajando sin estar declaradas |\n\n**La cláusula contractual que hace funcionar el control:** el pago de la factura mensual queda **condicionado** a la entrega de esta documentación. Sin ella, la industrial retiene el pago. Es la única palanca real: un requerimiento sin consecuencia económica se ignora.\n\n**PASO 4 — Las cláusulas que deben estar en cada contrato civil**\n\n| Nº | Cláusula | Para qué |\n|---|---|---|\n| 1 | **Obligación de acreditar mensualmente** el cumplimiento laboral y previsional, con la lista de los diez documentos | Base del control |\n| 2 | **Retención del pago** ante la falta de acreditación | Da fuerza a la cláusula 1 |\n| 3 | **Facultad de la industrial de pagar directamente** a los trabajadores del tercero y descontarlo de la factura, ante incumplimiento acreditado | Permite actuar antes de que el pasivo crezca |\n| 4 | **Indemnidad**: el tercero mantiene indemne a la industrial de toda obligación laboral, previsional y de SST de su personal, con obligación de reembolso | Vía de recupero, aunque no elimina la solidaridad frente al trabajador |\n| 5 | **Autonomía expresa**: el tercero dirige, supervisa y sanciona a su personal. **Ningún funcionario de la industrial da instrucciones directas** a los trabajadores desplazados | Protege el requisito central de la tercerización |\n| 6 | **Retribución por resultado**, con la unidad de obra o servicio definida, nunca por hora-hombre ni por número de personas | Evita la desnaturalización por forma de pago |\n| 7 | **Obligaciones de SST**: quién provee EPP, quién capacita, quién contrata el SCTR, y el sometimiento del personal del tercero a las reglas de seguridad de las instalaciones | Delimita, sin eliminar el deber de la industrial |\n| 8 | **Carta fianza** o garantía, con monto, vigencia y obligación de renovación | Respaldo patrimonial |\n| 9 | **Resolución del contrato** por incumplimiento laboral del tercero | Salida ante el riesgo |\n| 10 | **Prohibición de subcontratar** sin autorización escrita | Evita cadenas de terceros sin control |\n\n**PASO 5 — Las cinco reglas operativas para el personal de la industrial**\n\nEstas reglas protegen contra la desnaturalización y deben difundirse a todas las jefaturas:\n\n1. **Nadie de la industrial da instrucciones directas** al personal de los terceros. Toda coordinación se canaliza a través del supervisor del tercero.\n2. El personal de los terceros **no se incluye** en el organigrama, la intranet, los directorios internos ni las evaluaciones de desempeño de la industrial.\n3. El personal de los terceros **no marca** en el registro de asistencia de la industrial. Su control de jornada es del tercero.\n4. La industrial **no sanciona ni amonesta** al personal de los terceros. Observa al supervisor del tercero, por escrito.\n5. El personal de los terceros **sí está sujeto** a las reglas de seguridad de las instalaciones, y la industrial verifica que las cumpla. Esto no afecta la autonomía: es el deber de prevención de la industrial sobre todo el que está en su centro de trabajo, y es indelegable.\n\n**La regla 5 es la que suele confundir.** Verificar que el personal de un tercero use su arnés no vulnera la autonomía de la tercerización: es una obligación propia de la industrial, porque su deber de prevención alcanza a todas las personas en su centro de trabajo, incluido el personal de terceros. La autonomía se refiere a la dirección del **trabajo**, no a la seguridad.\n\n**PASO 6 — El tablero trimestral**\n\n| Indicador | Valor objetivo |\n|---|---|\n| Terceros con documentación mensual completa y al día | **100%** |\n| Cartas fianza vigentes | 100% |\n| Pólizas de SCTR vigentes y con el personal actualizado | 100% |\n| Personal de terceros presente que no figura en la relación declarada | **0** |\n| Casos detectados de instrucciones directas de la industrial a personal de terceros | **0** |\n| Practicantes como porcentaje del personal propio | Menor al 20% |\n\n**La conclusión profesional:** el riesgo de los terceros no es del tercero, es de la empresa principal, por la responsabilidad solidaria y por el deber de prevención. Las diez verificaciones mensuales con pago condicionado y las cinco reglas operativas cuestan unas horas al mes. Su ausencia puede costar la incorporación de 18 trabajadores a la planilla de la industrial, con beneficios retroactivos y una infracción muy grave con 18 afectados.'}
  ],
  proy:{
   t:'Régimen especial y control de terceros de tu empresa',
   ctx:`Vas a determinar si tu empresa está en un régimen especial y a construir el control de los terceros que trabajan en sus instalaciones, que es un riesgo propio aunque no lo parezca.`,
   pasos:[
    'Determina si la actividad de tu empresa cae en un régimen laboral especial: construcción civil, agrario, u otro. Si no es así, documenta por qué aplica el régimen común.',
    'Si tu empresa contrata o podría contratar servicios de terceros, identifica al menos dos: uno que sería intermediación y uno que sería tercerización, y califica cada uno con los requisitos de ley.',
    'Para el caso de intermediación, verifica los cuatro requisitos: registro, carta fianza, actividad permitida y límite del 20% si es servicio temporal.',
    'Para el caso de tercerización, evalúa los seis requisitos sustantivos y determina si la figura resistiría una inspección.',
    'Elabora la lista de los diez documentos de verificación mensual y el formato de control por tercero.',
    'Redacta las diez cláusulas contractuales que deben estar en el contrato civil con cada tercero, con especial cuidado en la de autonomía y la de retribución por resultado.',
    'Redacta las cinco reglas operativas para el personal de tu empresa, en una página lista para difundir.',
    'Si tu empresa tiene o podría tener practicantes, verifica el límite del 20% sobre el personal propio y los requisitos de la modalidad formativa.',
    'Elabora el tablero trimestral de control de terceros con sus seis indicadores.'
   ],
   entrega:[
    'La determinación del régimen aplicable con su sustento.',
    'La calificación de los dos casos de terceros, con la evaluación de sus requisitos.',
    'La lista de verificación mensual, el formato de control y las diez cláusulas contractuales.',
    'Las cinco reglas operativas y el tablero trimestral de indicadores.'
   ],
   crit:[
    'La calificación de intermediación o tercerización se funda en la realidad de la operación, no en el nombre del contrato.',
    'La cláusula de retribución establece una unidad de obra o servicio, nunca hora-hombre.',
    'La verificación mensual condiciona el pago de la factura a la entrega de la documentación.'
   ],
   pista:'Al redactar la cláusula de retribución de la tercerización, obligate a definir una unidad de obra concreta y medible: metros cuadrados limpiados, equipos mantenidos, toneladas procesadas. Si no encuentras ninguna y lo único medible son las horas de las personas, probablemente no sea una tercerización.'
  },
  proyInt:{
   t:'Expediente laboral y tributario integral: entrega final',
   integra:'1.1 a 7.6',
   ctx:`Es el entregable que cierra toda la parte laboral y tributaria del curso. Vas a consolidar en un solo documento profesional todo lo construido desde el primer módulo, en la forma en que un contador lo presenta a una gerencia o a un cliente nuevo.`,
   pasos:[
    'Sección 1 — La empresa: identificación, giro, régimen tributario, régimen laboral con su sustento, datos de referencia vigentes y estructura organizativa.',
    'Sección 2 — Contabilidad: el ciclo completo del Módulo 2 con los estados financieros finales del Módulo 6, sus notas y su trazabilidad del comprobante a la declaración.',
    'Sección 3 — Tributación: el perfil tributario, las memorias de cálculo de los Módulos 3 y 4, y la determinación anual del Impuesto a la Renta.',
    'Sección 4 — Cumplimiento y defensa: la matriz maestra de controles, el expediente de defensa, los manuales de fiscalización y de defensa, y el árbol de decisión del Módulo 5.',
    'Sección 5 — Personal: el inventario de vínculos, la estructura salarial, la planilla, los beneficios, la jornada, el régimen disciplinario y el protocolo de cese de los Módulos 6 y 7.',
    'Sección 6 — Seguridad y salud: la política, el IPERC, el programa anual, los registros y el presupuesto del subtema 7.4.',
    'Sección 7 — Terceros: la calificación de cada tercero, el control mensual y las cláusulas contractuales del presente subtema.',
    'Sección 8 — Riesgos: el registro único de contingencias consolidado de todos los módulos, cuantificado, con control asignado y responsable, y el valor de la subsanación oportuna.',
    'Sección 9 — Informe ejecutivo: tres páginas dirigidas a la gerencia con la situación general, los cinco riesgos mayores cuantificados, las acciones prioritarias con plazo y responsable, y el calendario unificado de cumplimiento.',
    'Arma el índice general, numera y fecha todas las secciones, establece el control de versiones y fija la fecha de próxima actualización.'
   ],
   entrega:[
    'El expediente integral completo con sus nueve secciones y su índice general.',
    'El informe ejecutivo de tres páginas, ubicado al inicio del expediente.',
    'El registro único de contingencias consolidado y cuantificado.',
    'El control de versiones con la fecha de próxima actualización.'
   ],
   crit:[
    'Cada sección se sostiene con los entregables reales construidos a lo largo del curso, no con descripciones.',
    'El registro de contingencias consolida los frentes tributario, laboral y de seguridad, con importes y controles.',
    'El informe ejecutivo permite a una gerencia decidir sin leer ninguna otra sección.'
   ],
   pista:'Este expediente es tu carta de presentación profesional. Escribe el informe ejecutivo al final, colócalo al inicio, y asegúrate de que una persona ajena a tu empresa pueda entender, leyendo solo esas tres páginas, en qué situación está y qué hay que hacer. Si lo logras, dominas el oficio.'
  },
  fuentes:[
   {a:'D. Leg. 727, D.S. 011-79-VC y convenios colectivos de la rama de construcción civil', o:'Régimen de construcción civil', n:'jornal básico por categoría, BUC, asignación escolar, gratificaciones en jornales, CTS y vacaciones por día laborado'},
   {a:'Ley 31110', o:'Ley del régimen laboral agrario y de incentivos para el sector agrario y riego', n:'remuneración diaria, BETA, beneficios, indemnización y escala del aporte a EsSalud'},
   {a:'Ley 31047 y D.S. 009-2021-TR', o:'Ley de las trabajadoras y trabajadores del hogar', n:'contrato escrito, jornada, vacaciones, gratificaciones, CTS, EsSalud y registro en planilla electrónica'},
   {a:'D. Leg. 689 y D.S. 014-92-TR', o:'Ley de contratación de trabajadores extranjeros', n:'límites del 20% del personal y 30% de la planilla, exoneraciones y aprobación del contrato'},
   {a:'Ley 27626 y D.S. 003-2002-TR', o:'Ley de intermediación laboral', n:'supuestos permitidos, registro, carta fianza, límite del 20% y desnaturalización'},
   {a:'Ley 29245, D. Leg. 1038 y D.S. 006-2008-TR', o:'Ley de tercerización de servicios', n:'requisitos de la tercerización, elementos coadyuvantes, desnaturalización y responsabilidad solidaria de la empresa principal'}
  ]
 }
 ]
}
);
