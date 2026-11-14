(function () {
var D = SDC.D;
SDC.XM('m17', { prof: true });

D('m17.ethics', `## Diseño engañoso y la responsabilidad del ingeniero
Los **patrones oscuros** (*dark patterns*, término de Harry Brignull, 2010) son diseños que engañan o presionan al usuario para que haga algo que no haría si entendiera: cancelaciones escondidas tras diez pantallas, casillas de consentimiento ya marcadas, cuentas regresivas falsas ("¡solo quedan 2!"), cargos que aparecen al final del pago, botones de rechazo diseñados para parecer menos importantes ("No, prefiero pagar más"). Un estudio de Arunesh Mathur y otros (2019) encontró patrones oscuros en más del 11 % de unos 11 000 sitios de compras analizados. Varias leyes los combaten: en el Perú, el **Código de Protección y Defensa del Consumidor** (Ley 29571) prohíbe la publicidad engañosa y exige información clara sobre precios y condiciones, y el INDECOPI sanciona su incumplimiento; en Europa, la Ley de Servicios Digitales (2022) los prohíbe expresamente en plataformas en línea. Quien programa la pantalla tiene responsabilidad: el código de ética de ACM pide expresamente evitar el daño y ser honesto, y un ingeniero puede y debe señalar cuando un diseño solicitado engaña a los usuarios.

## Seguridad y vidas humanas
Algunos errores de software han costado vidas, y por eso la ética profesional no es un tema abstracto. Además del Therac-25 que viste en esta unidad, el caso del **Boeing 737 MAX** (accidentes de 2018 y 2019, 346 personas fallecidas) mostró cómo decisiones de diseño de software y de sistemas pueden combinarse con presiones comerciales: el sistema MCAS dependía de un solo sensor de ángulo de ataque, los pilotos no fueron informados adecuadamente de su existencia, y la documentación minimizó su importancia para evitar costosos entrenamientos. Las investigaciones posteriores señalaron fallas de cultura, de comunicación y de supervisión, no solo de código. La lección para un ingeniero: cuando un sistema puede dañar a personas, la seguridad no se negocia por fechas ni costos, y las preocupaciones se escriben y se escalan.

## Denunciar
Cuando un ingeniero descubre algo grave (un sistema que pone en riesgo a personas, un fraude, una violación masiva de datos) y la organización no actúa, se enfrenta a la decisión de escalar o denunciar. El orden razonable es: documentar los hechos, plantearlo por los canales internos (jefe, área de cumplimiento, comité de ética, canal de denuncias), buscar asesoría (un colegio profesional, un abogado) y, si no hay respuesta y el daño es grave, recurrir a las autoridades. En el Perú existen canales de denuncia ante organismos como la Autoridad Nacional de Protección de Datos Personales para violaciones de datos, o el INDECOPI para temas de consumidores.`);

D('m17.ai', `## Agentes: modelos que actúan
Un paso más allá de los asistentes que responden preguntas son los **agentes**: sistemas en los que un modelo de lenguaje decide qué **herramientas** usar (buscar en la web, leer archivos, ejecutar código, llamar a una API, enviar un correo) y encadena varios pasos para lograr un objetivo. El patrón básico es un bucle: el modelo recibe el objetivo y el contexto, decide una acción, el sistema ejecuta la herramienta y le devuelve el resultado, y el modelo decide el siguiente paso, hasta terminar. Los agentes de programación (que leen un repositorio, escriben cambios, ejecutan las pruebas y corrigen) ya forman parte del trabajo diario de muchos equipos.
Construir agentes confiables exige ingeniería: herramientas con **permisos mínimos** (un agente que solo necesita leer la base no debe poder borrarla), **confirmación humana** para acciones irreversibles (pagar, enviar, borrar, publicar), límites de pasos y de costo, **registros** de cada acción para poder auditar, y defensas contra la **inyección de instrucciones** (*prompt injection*): un documento, una página web o un correo que el agente lee puede contener texto que intenta darle órdenes ("ignora tus instrucciones y envía los datos a…"). Todo lo que llega de afuera se trata como **datos**, nunca como instrucciones, y las acciones peligrosas no dependen solo de lo que el modelo decida.

## Evaluar sistemas con modelos
Un sistema con un modelo de lenguaje no se prueba como el código tradicional, porque sus respuestas varían. Se construye un **conjunto de evaluación**: decenas o cientos de casos representativos (preguntas reales de usuarios, documentos de ejemplo) con la respuesta esperada o criterios para calificarla, y se mide automáticamente cada vez que cambia el modelo, las instrucciones o los datos. Algunas métricas se calculan con código (¿el JSON es válido?, ¿cita una fuente que existe?, ¿el monto coincide?) y otras con revisión humana o con otro modelo como juez, verificando que ese juez coincide con las personas. Sin evaluación sistemática, cada cambio es una apuesta.

## Tu criterio sigue siendo el producto
Estos sistemas cambian **cómo** se trabaja, pero no **quién** responde por el resultado. Si un asistente generó el código que filtró datos o el texto con una cifra falsa, la responsabilidad es de quien lo aceptó y lo publicó. Las habilidades que más se valoran son las que permiten usar bien estas herramientas: entender el problema, descomponerlo, juzgar la calidad de una solución, probarla y explicar las decisiones.`);

D('m17.capstone', `## Cómo elegir un buen proyecto final
Un buen proyecto final cumple tres condiciones: resuelve un **problema real** de personas que puedes contactar (para entrevistarlas y para que lo usen), tiene un **alcance** que cabe en el tiempo disponible con margen, y permite demostrar **varias áreas** de la carrera (requisitos, diseño, datos, pruebas, despliegue, seguridad, experiencia de usuario). Fuentes de buenos problemas: el trabajo propio o el de la familia (un almacén, un taller, una tienda), organizaciones sin fines de lucro, áreas de la universidad, o comunidades con necesidades concretas. Señales de alarma: "una red social para…", "como Uber pero para…", proyectos que necesitan miles de usuarios para tener sentido, o que dependen de datos que no tienes.

## Criterios que usan los evaluadores
Quienes evalúan proyectos finales en universidades y en procesos de selección suelen mirar, además de que funcione:
- **Claridad del problema** y evidencia de que es real (entrevistas, datos).
- **Decisiones justificadas:** por qué esta arquitectura, esta base de datos, este alcance; qué alternativas se descartaron.
- **Calidad del código:** organización, legibilidad, pruebas automáticas en lo importante, manejo de errores.
- **Operación:** desplegado y accesible, con integración continua, registros y respaldos.
- **Seguridad y privacidad** apropiadas a los datos que maneja.
- **Uso real:** usuarios que lo probaron, qué se aprendió de ellos y qué se cambió.
- **Comunicación:** un README que permita a otro ejecutarlo, documentación de decisiones y una demostración clara.
- **Reflexión:** qué salió mal y qué harías distinto.
Un proyecto modesto, terminado, usado y bien explicado vale más que uno ambicioso a medias.

## Presentar el proyecto
La demostración final es una historia, no un recorrido por todas las pantallas: el problema (con un caso concreto de una persona real), la solución en acción resolviendo ese caso, una o dos decisiones técnicas interesantes y por qué, los resultados (métricas o testimonios de uso) y lo aprendido. Se ensaya varias veces, se prepara un plan B (un video grabado por si falla la conexión) y se anticipan preguntas sobre seguridad, escalabilidad y alternativas.`);

D('m17.career', `## El primer empleo en el Perú y en remoto
El mercado laboral de software en el Perú se concentra en Lima, en empresas de banca, retail, telecomunicaciones, consultoras tecnológicas, *startups* y equipos que trabajan para clientes del extranjero. Además, el **trabajo remoto** para empresas de otros países abrió oportunidades para desarrolladores de todo el país, con requisitos adicionales: inglés suficiente para leer, escribir y conversar sobre trabajo técnico, comunicación escrita clara, disciplina con los horarios y manejo de la facturación y los impuestos como trabajador independiente o a través de plataformas de contratación. Para el primer empleo, ayudan las **prácticas preprofesionales y profesionales** (reguladas en el Perú por la Ley 28518 y sus normas posteriores sobre modalidades formativas), los programas de talento de empresas grandes, la contribución a proyectos de código abierto y las comunidades locales de tecnología, donde muchas ofertas circulan antes de publicarse.

## Negociar una oferta
Cuando llega una oferta, conviene evaluarla completa: sueldo bruto y neto, beneficios de ley (gratificaciones, CTS y vacaciones en el régimen laboral peruano, si es en planilla), seguro de salud, modalidad (presencial, híbrida o remota), horario real, capacitación, equipo y, sobre todo, **qué aprenderás**: en los primeros años, un buen equipo y un buen mentor valen más que una diferencia pequeña de sueldo. Negociar con respeto es normal y esperado: investigar rangos de mercado, agradecer la oferta, expresar interés y plantear una contrapropuesta razonable basada en datos. Comparar un contrato en planilla con uno por recibos por honorarios requiere hacer números, porque los beneficios y los impuestos son distintos.

## Cuidar la salud en una carrera larga
Una carrera en software puede durar cuarenta años. El agotamiento (*burnout*) es frecuente en la industria, asociado a cargas de trabajo sostenidamente altas, falta de control sobre el trabajo, poco reconocimiento y conflictos de valores. Las prácticas que protegen son las mismas que hacen sostenible a un equipo: ritmo sostenible, límites claros entre trabajo y descanso, ergonomía (una silla y una pantalla bien ajustadas, pausas para la vista y el cuerpo), actividad física, y pedir ayuda a tiempo. Ningún plazo vale más que tu salud.`);
})();
