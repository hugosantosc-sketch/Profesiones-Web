(function () {
var S = SDC.S;

S('m17', 'm17.oss', { title: 'Código abierto: usar, contribuir y mantener',
  ask: '¿Cómo participarías de forma responsable en este proyecto de código abierto?',
  lesson: `
> **La idea en simple.** Casi todo el software del mundo se apoya en código abierto: Linux, los navegadores, Node, PostgreSQL, React, Python y los miles de bibliotecas que instalas con un comando. Es software que cualquiera puede leer, usar, modificar y compartir, mantenido muchas veces por voluntarios. Entender cómo funciona esta comunidad (sus licencias, sus normas, cómo contribuir y qué significa mantener un proyecto) es parte de ser un profesional del software, y contribuir es una de las mejores formas de aprender y de construir una reputación.

## Software libre y código abierto
Dos movimientos con historias distintas:
- El **software libre**, impulsado por Richard Stallman, que fundó el proyecto GNU en 1983 y la Free Software Foundation en 1985, define cuatro libertades: ejecutar el programa con cualquier propósito, estudiar cómo funciona y modificarlo, redistribuir copias, y distribuir versiones modificadas. Es una postura ética: los usuarios deben controlar el software que usan.
- El **código abierto** (*open source*), término adoptado en 1998 por un grupo que incluía a Eric Raymond y Bruce Perens, que fundaron la Open Source Initiative (OSI), pone el acento en las ventajas prácticas: más ojos encuentran más errores, la colaboración produce mejor software, las empresas pueden participar sin temor.
En la práctica, la mayoría de las licencias cumplen ambas definiciones, y se habla de **FOSS** o **FLOSS** (*free/libre and open source software*). El ensayo de Raymond *La catedral y el bazar* (1997) describió el modelo de Linux: muchos contribuyentes coordinados en público, frente al desarrollo cerrado de unos pocos, y popularizó la frase "con suficientes ojos, todos los errores son superficiales".

## Las licencias
Una licencia define qué se puede hacer con el código. Sin licencia, el código **no** es libre: por defecto, todos los derechos son del autor, aunque esté publicado en GitHub. Las familias principales:
| Familia | Ejemplos | Qué exige | Uso típico |
|---|---|---|---|
| Permisivas | MIT, BSD, Apache 2.0 | conservar el aviso de copyright y la licencia (Apache agrega una concesión de patentes) | bibliotecas que se quiere que use cualquiera, incluso en productos cerrados |
| Copyleft débil | LGPL, MPL 2.0 | compartir los cambios al propio componente, no al programa que lo usa | bibliotecas que deben seguir abiertas |
| Copyleft fuerte | GPL v2, GPL v3 | que las obras derivadas que se distribuyan también sean GPL | Linux (GPL v2), muchas herramientas GNU |
| Copyleft de red | AGPL v3 | lo anterior, también si el software se ofrece como servicio por red | servidores y plataformas |
| Disponibles, no abiertas | BSL, SSPL, Elastic License | restricciones comerciales (por ejemplo, no ofrecerlo como servicio en la nube competidor) | empresas que protegen su negocio |
Para un profesional, lo esencial es: revisar la licencia de cada dependencia antes de usarla en un producto (las herramientas de análisis de dependencias lo hacen automáticamente), respetar los avisos de copyright, entender que usar código GPL en un producto que se distribuye puede obligar a publicar el propio código, y tener claro que el último grupo de la tabla **no** es código abierto según la OSI, aunque el código se pueda leer. Varias empresas cambiaron a ese tipo de licencias (Elastic en 2021, HashiCorp en 2023, Redis en 2024), y las comunidades respondieron creando bifurcaciones abiertas (OpenSearch, OpenTofu, Valkey).

## Cómo contribuir
Contribuir no es solo escribir código: documentación, traducciones, reportes de errores bien hechos, respuestas a preguntas, pruebas, revisión de PR, diseño y accesibilidad son contribuciones valiosas, y muchas veces las más necesitadas. Un camino práctico para empezar:
1. **Elegir un proyecto que usas**, porque entiendes el problema y te importa. Proyectos con etiquetas como «good first issue» o «help wanted» indican tareas pensadas para recién llegados.
2. **Leer** el README, el archivo CONTRIBUTING (cómo se contribuye), el código de conducta y algunos issues y PR recientes, para entender las normas y el tono.
3. **Preguntar antes de trabajar** en algo grande: comentar en el issue que quieres tomarlo y cómo piensas resolverlo. Evita trabajar días en algo que los mantenedores no aceptarían.
4. **Hacer un PR pequeño y enfocado**, con pruebas, siguiendo el estilo del proyecto, con una descripción que explique qué cambia y por qué, y enlazando el issue.
5. **Responder a la revisión con paciencia:** los mantenedores suelen ser voluntarios con poco tiempo; los comentarios son sobre el código, no sobre ti.
6. **Persistir:** la primera contribución es la más difícil; las siguientes son mucho más fáciles.
El flujo técnico es el que viste en trabajo en equipo con Git: **bifurcar** (*fork*) el repositorio, crear una rama, hacer los cambios, subirlos a tu bifurcación y abrir un PR hacia el original.

## Mantener un proyecto
Publicar una biblioteca es fácil; mantenerla durante años es otro trabajo. Un mantenedor responde issues, revisa contribuciones, publica versiones (con versionado semántico y notas de cambios), atiende reportes de seguridad (idealmente con una política de divulgación y un canal privado), actualiza dependencias y decide qué entra y qué no. Nadia Eghbal describió en *Working in Public* (2020) cómo muchos proyectos populares dependen de una o dos personas, con una enorme demanda de atención y casi ningún apoyo. Un buen proyecto se cuida con: un README claro, una licencia, una guía de contribución, un código de conducta, plantillas de issues, integración continua, una política de seguridad («SECURITY.md») y el valor de decir que no a funciones que no encajan.

## Sostenibilidad y la cadena de suministro
El incidente de **Heartbleed** (2014) reveló que OpenSSL, que protegía gran parte de internet, era mantenido por un puñado de personas con un presupuesto mínimo. **Log4Shell** (2021) mostró lo mismo con Log4j. Y la puerta trasera de **xz utils** (2024) mostró el riesgo opuesto: un atacante que, durante dos años, se ganó la confianza de un mantenedor agotado hasta obtener permisos para publicar versiones. La respuesta de la industria incluye fundaciones que financian proyectos críticos (Open Source Security Foundation, Sovereign Tech Agency de Alemania), programas de patrocinio (GitHub Sponsors, Open Collective) y herramientas para evaluar la salud y seguridad de las dependencias (OpenSSF Scorecard). Como usuario profesional, apoyar los proyectos de los que depende tu empresa (con contribuciones, reportes o dinero) es también una inversión en tu propia seguridad.

## Código abierto en el Perú y en la región
Existen comunidades activas de software libre y de tecnologías específicas (Python, JavaScript, Rust, datos) en Lima y otras ciudades, con encuentros, charlas y proyectos. Además, el Estado peruano cuenta con normas que promueven el uso y la publicación de software público, y una plataforma de software público peruano para compartir soluciones entre entidades. Participar en una comunidad local es una forma eficaz de aprender, encontrar mentores y conocer oportunidades laborales.

## Ejemplo resuelto: la primera contribución
Una estudiante usa una biblioteca de validación de documentos peruanos (DNI, RUC) en su proyecto y descubre que acepta RUC con un dígito verificador incorrecto.
1. **Verificar:** revisa la documentación de SUNAT sobre el cálculo del dígito verificador y escribe una prueba mínima que reproduce el error.
2. **Buscar:** revisa los issues; nadie lo había reportado.
3. **Reportar:** abre un issue con título específico, pasos para reproducir, resultado esperado y obtenido, la versión y la referencia oficial del algoritmo, y ofrece enviar la corrección.
4. **Acordar:** el mantenedor responde que sí y le pide incluir pruebas con RUC de personas naturales y jurídicas.
5. **Contribuir:** bifurca el repositorio, crea una rama, corrige la función, agrega diez casos de prueba, sigue el estilo del proyecto y abre el PR enlazando el issue.
6. **Revisión:** el mantenedor pide renombrar una variable y agregar una línea al registro de cambios; ella lo hace. El PR se acepta y aparece en la siguiente versión. Su nombre queda en la historia del proyecto, y en su portafolio puede mostrar una contribución real, revisada y publicada.`,
  links: [['m7.team', 'flujo con pull requests y revisión de código'], ['m17.ethics', 'propiedad intelectual y licencias'], ['m16.supply', 'seguridad de la cadena de suministro']],
  read: 'Raymond, *The Cathedral and the Bazaar* (1999); Fogel, *Producing Open Source Software* (2.ª ed., producingoss.com); Eghbal, *Working in Public* (2020); opensource.guide (GitHub).',
  terms: [
    ['Software libre', 'software que garantiza las libertades de ejecutar, estudiar, modificar y redistribuir', ['Stallman, GNU, 1983.', 'Cuatro libertades.', 'Postura ética.']],
    ['Código abierto', 'software cuyo código puede leerse, usarse, modificarse y compartirse según una licencia aprobada', ['OSI, 1998.', 'Ventajas prácticas.', 'FOSS.']],
    ['Licencia permisiva', 'licencia que permite casi cualquier uso exigiendo conservar el aviso de copyright', ['MIT.', 'Apache 2.0.', 'Productos cerrados.']],
    ['Copyleft', 'mecanismo de licencia que exige que las obras derivadas mantengan la misma licencia libre', ['GPL.', 'AGPL por red.', 'Linux.']],
    ['Bifurcación', 'copia de un repositorio bajo otra cuenta, para contribuir o para continuar un proyecto por separado', ['Fork.', 'PR al original.', 'OpenTofu.']],
    ['Mantenedor', 'persona con permisos para decidir, revisar y publicar versiones de un proyecto', ['Issues.', 'Versiones.', 'Sobrecarga.']],
    ['Código de conducta', 'documento que define las normas de comportamiento de una comunidad', ['Contributor Covenant.', 'Respeto.', 'Moderación.']],
    ['Buena primera tarea', 'issue marcado como adecuado para quien contribuye por primera vez', ['good first issue.', 'Recién llegados.', 'Empezar.']]
  ],
  q: [
    ['Un repositorio público de GitHub no tiene licencia. ¿Puedes usarlo libremente en tu producto?', 'No: sin licencia, todos los derechos son del autor', ['Sí, todo lo público es libre', 'Sí, si citas al autor', 'Sí, si no cobras'], 'Sin licencia, no es libre.', 2],
    ['¿Qué exige principalmente la licencia MIT?', 'Conservar el aviso de copyright y la licencia', ['Publicar todo tu código', 'Pagar regalías', 'No usarlo comercialmente'], 'Licencia permisiva.', 1],
    ['¿Qué agrega la AGPL respecto de la GPL?', 'Que la obligación de compartir aplica también si el software se ofrece como servicio por red', ['Que es más permisiva', 'Que prohíbe el uso comercial', 'Nada'], 'Copyleft de red.', 3],
    ['¿Son de código abierto según la OSI licencias como la BSL o la SSPL?', 'No: imponen restricciones comerciales', ['Sí, siempre', 'Sí, si el código se puede leer', 'Solo en Europa'], 'Disponibles, no abiertas.', 3],
    ['¿Qué conviene hacer antes de trabajar en un cambio grande para un proyecto ajeno?', 'Comentar en el issue la intención y el enfoque para acordarlo con los mantenedores', ['Escribir todo y enviar el PR sin avisar', 'Bifurcar y no volver', 'Escribir al autor por redes sociales'], 'Preguntar antes de trabajar.', 2],
    ['¿Qué mostró el caso de xz utils en 2024?', 'Que un atacante puede ganarse la confianza de un mantenedor agotado durante años para insertar una puerta trasera', ['Que el código abierto es inseguro siempre', 'Que GitHub fue atacado', 'Que la GPL es peligrosa'], 'Sostenibilidad y cadena de suministro.', 4],
    ['Además de código, ¿qué cuenta como contribución valiosa?', 'Documentación, traducciones, reportes de errores, revisión y pruebas', ['Solo el código', 'Solo las donaciones', 'Nada más'], 'Muchas formas de contribuir.', 1],
    { tf: 'Usar una biblioteca con licencia GPL en un producto que se distribuye puede obligar a publicar el código del producto.', v: true, e: 'Es el efecto del copyleft fuerte.', l: 2 },
    { tf: 'El software libre y el código abierto son movimientos con exactamente la misma historia y motivación.', v: false, e: 'El primero tiene una motivación ética; el segundo enfatiza ventajas prácticas.', l: 2 },
    { c: 'Escribe «familiaLicencia(id)»: MIT, BSD-3-Clause y Apache-2.0 → "permisiva"; LGPL-3.0 y MPL-2.0 → "copyleft débil"; GPL-2.0 y GPL-3.0 → "copyleft fuerte"; AGPL-3.0 → "copyleft de red"; otra → "revisar".', f: 'familiaLicencia', p: ['id'], t: [[['MIT'], 'permisiva'], [['MPL-2.0'], 'copyleft débil'], [['GPL-3.0'], 'copyleft fuerte'], [['AGPL-3.0'], 'copyleft de red'], [['BSL-1.1'], 'revisar']], sol: '  const m = { \'MIT\': \'permisiva\', \'BSD-3-Clause\': \'permisiva\', \'Apache-2.0\': \'permisiva\', \'LGPL-3.0\': \'copyleft débil\', \'MPL-2.0\': \'copyleft débil\', \'GPL-2.0\': \'copyleft fuerte\', \'GPL-3.0\': \'copyleft fuerte\', \'AGPL-3.0\': \'copyleft de red\' };\n  return m[id] || \'revisar\';', l: 1 },
    { c: 'Escribe «dependenciasARevisar(deps, permitidas)»: recibe [{ nombre, licencia }] y una lista de licencias permitidas; devuelve los nombres (ordenados) con licencias no permitidas.', f: 'dependenciasARevisar', p: ['deps', 'permitidas'], t: [[[[{ nombre: 'express', licencia: 'MIT' }, { nombre: 'libx', licencia: 'AGPL-3.0' }, { nombre: 'liby', licencia: 'GPL-3.0' }], ['MIT', 'Apache-2.0', 'BSD-3-Clause']], ['libx', 'liby']]], sol: '  return deps.filter(d => !permitidas.includes(d.licencia)).map(d => d.nombre).sort();', l: 1 },
    { c: 'Escribe «archivosComunidad(archivos)»: devuelve la lista (en este orden) de los que faltan entre README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md y SECURITY.md.', f: 'archivosComunidad', p: ['archivos'], t: [[[['README.md', 'LICENSE']], ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md']], [[['README.md', 'LICENSE', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md']], []]], sol: '  return [\'README.md\', \'LICENSE\', \'CONTRIBUTING.md\', \'CODE_OF_CONDUCT.md\', \'SECURITY.md\'].filter(a => !archivos.includes(a));', l: 1 }
  ],
  gen: function (g) {
    var li = [['MIT', 'Permisiva'], ['Apache 2.0', 'Permisiva'], ['BSD de 3 cláusulas', 'Permisiva'], ['GPL v3', 'Copyleft fuerte'], ['GPL v2 (la de Linux)', 'Copyleft fuerte'], ['LGPL', 'Copyleft débil'], ['MPL 2.0', 'Copyleft débil'], ['AGPL v3', 'Copyleft de red'], ['SSPL', 'Disponible, no abierta']];
    li.forEach(function (l) { g.mcq(2, '¿A qué familia pertenece la licencia ' + l[0] + '?', l[1], ['Permisiva', 'Copyleft débil', 'Copyleft fuerte', 'Copyleft de red', 'Disponible, no abierta'].filter(function (x) { return x !== l[1]; }).slice(0, 3), 'Familias de licencias.'); });
    var pa = [['Leer CONTRIBUTING y el código de conducta', 1], ['Comentar en el issue la intención y el enfoque', 2], ['Bifurcar y crear una rama', 3], ['Abrir el PR enlazando el issue', 4]];
    pa.forEach(function (p) { g.input(1, 'En el camino para contribuir (1 leer normas, 2 acordar en el issue, 3 bifurcar y rama, 4 PR), ¿qué número corresponde a: ' + p[0] + '?', p[1], 'Orden sugerido de una contribución.'); });
    var co = [['Corregir un error de ortografía en la documentación', 'Sí, es una contribución'], ['Reportar un error con pasos para reproducirlo', 'Sí, es una contribución'], ['Revisar el PR de otra persona con comentarios útiles', 'Sí, es una contribución'], ['Traducir la documentación al español', 'Sí, es una contribución']];
    co.forEach(function (c) { g.mcq(1, '¿Cuenta como contribución al código abierto? ' + c[0], c[1], ['No, solo cuenta el código', 'Solo si lo pide el mantenedor', 'Solo si se paga'], 'Muchas formas de contribuir.'); });
  },
  checks: [
    ['Diferencia software libre y código abierto.', 'El software libre (Stallman) defiende cuatro libertades como postura ética; el código abierto (OSI) enfatiza ventajas prácticas; la mayoría de las licencias cumplen ambas definiciones.'],
    ['Describe las familias de licencias y qué debe revisar un profesional.', 'Permisivas, copyleft débil, fuerte y de red, y las disponibles no abiertas; revisar la licencia de cada dependencia, respetar avisos y entender las obligaciones del copyleft.'],
    ['¿Cómo se hace una buena primera contribución?', 'Elegir un proyecto que uses, leer sus normas, acordar en el issue, enviar un PR pequeño con pruebas y responder a la revisión con paciencia.'],
    ['¿Qué implica mantener un proyecto y por qué importa su sostenibilidad?', 'Responder, revisar, publicar versiones y atender seguridad con documentos de comunidad; casos como Heartbleed y xz muestran el riesgo de proyectos críticos sin apoyo.']
  ],
  cites: ['Stallman, R. (2002). *Free Software, Free Society*. GNU Press.', 'Raymond, E. S. (1999). *The Cathedral and the Bazaar*. O\'Reilly.', 'Fogel, K. (2017). *Producing Open Source Software* (2.ª ed.). producingoss.com.', 'Eghbal, N. (2020). *Working in Public: The Making and Maintenance of Open Source Software*. Stripe Press.', 'Open Source Initiative. *The Open Source Definition*. opensource.org.', 'Steinmacher, I., Silva, M., Gerosa, M. y Redmiles, D. (2015). A systematic literature review on the barriers faced by newcomers to open source software projects. *Information and Software Technology*, 59.'],
  project: { t: 'Tu primera contribución',
    goal: 'Realizar una contribución real a un proyecto de código abierto y publicar uno propio con buenas prácticas.',
    steps: ['Elige un proyecto que uses y revisa su README, CONTRIBUTING, código de conducta e issues abiertos.', 'Encuentra una tarea adecuada (documentación, prueba, error pequeño) y coméntala en el issue.', 'Haz la contribución con un PR pequeño y enfocado y responde a la revisión.', 'Publica un proyecto propio pequeño con licencia elegida y justificada, README, CONTRIBUTING, código de conducta, SECURITY.md e integración continua.', 'Revisa las licencias de todas las dependencias de uno de tus proyectos.'],
    deliver: 'El enlace al PR, el repositorio propio y el informe de licencias.' },
  hito: ['Revisa las licencias de todas las dependencias de PatioApp y define cuáles están permitidas.', 'Publica como código abierto el validador de placas y documentos de PatioApp, con licencia, guía de contribución y política de seguridad.']
});
SDC.after('m17.oss', 'm17.ai');

S('m17', 'm17.research', { title: 'Leer investigación y aprender del estado del arte',
  ask: '¿Cómo evaluarías esta evidencia o esta fuente técnica?',
  lesson: `
> **La idea en simple.** La tecnología cambia tan rápido que lo que aprendes en la carrera es solo el punto de partida. Un buen ingeniero sabe encontrar, leer y evaluar fuentes por su cuenta: artículos científicos, documentación oficial, especificaciones, informes de incidentes, charlas técnicas y blogs de ingeniería. Y sabe distinguir la evidencia sólida de la opinión, la moda y el marketing. Esta unidad te da el método para seguir aprendiendo con criterio toda la vida.

## Tipos de fuentes y su confiabilidad
| Fuente | Ejemplos | Fortaleza | Cuidado |
|---|---|---|---|
| Especificaciones y estándares | RFC de la IETF, ECMAScript, WCAG, normas ISO | la definición autorizada | densas; leer la parte necesaria |
| Documentación oficial | MDN, docs de PostgreSQL, React, Node | precisa y actualizada | a veces incompleta en casos borde |
| Artículos revisados por pares | conferencias ICSE, FSE, OSDI, SOSP, CHI, NeurIPS; revistas IEEE y ACM | método explícito y revisión de expertos | pueden no aplicarse a tu contexto |
| Preprints | arXiv | lo más reciente | sin revisión formal todavía |
| Informes de incidentes y postmortems | los de Cloudflare, GitLab, AWS, Google | experiencia real y detallada | un caso no es una regla |
| Blogs de ingeniería de empresas | Netflix, Uber, Stripe, Discord, Mercado Libre | soluciones a escala real | también son marketing de contratación |
| Libros clásicos | los citados en esta carrera | ideas probadas en el tiempo | ejemplos técnicos pueden envejecer |
| Charlas, videos, publicaciones en redes | conferencias, YouTube, foros | accesibles y actuales | calidad muy variable |
| Respuestas de asistentes de IA | modelos de lenguaje | rápidas y explicativas | pueden inventar datos o citas; verificar siempre |
La regla general: para un **hecho**, buscar la fuente **primaria** (la especificación, la documentación, el artículo original); para una **práctica**, buscar **evidencia** de que funciona en contextos parecidos al tuyo; para una **opinión**, considerar quién la da y qué intereses tiene.

## Cómo leer un artículo científico
Un artículo de investigación en computación suele tener: resumen (*abstract*), introducción, trabajo relacionado, método o diseño, evaluación, discusión de amenazas a la validez y conclusiones. S. Keshav propuso en 2007 un método de **tres pasadas** que sigue siendo útil:
1. **Primera pasada (5–10 minutos):** leer el título, el resumen, la introducción, los títulos de las secciones y las conclusiones; mirar las figuras. Responder: ¿de qué tipo es?, ¿qué problema aborda?, ¿cuáles son sus contribuciones?, ¿me sirve?
2. **Segunda pasada (hasta una hora):** leer con cuidado, sin detenerse en las demostraciones; entender las figuras y tablas; anotar las referencias importantes. Al final, poder resumir los argumentos principales a otra persona.
3. **Tercera pasada (varias horas):** "reconstruir" el trabajo: entender cada supuesto, cuestionarlo, imaginar cómo lo habrías hecho tú. Solo para los artículos centrales de tu trabajo.
Preguntas críticas para la evaluación: ¿con qué datos se evaluó?, ¿el problema y la escala se parecen a los míos?, ¿contra qué se comparó (una línea base razonable o una débil)?, ¿se repitieron las mediciones?, ¿qué amenazas a la validez reconocen los autores?, ¿el código y los datos están disponibles para reproducirlo? Muchas conferencias de computación tienen hoy **evaluación de artefactos**, que verifica que los resultados se pueden reproducir con el código publicado.

## Evidencia en ingeniería de software
La ingeniería de software tiene una tradición de investigación empírica que viste a lo largo de la carrera: los estudios sobre revisión de código, sobre pruebas, sobre productividad (DORA, SPACE), sobre el costo de los defectos. Dos lecciones importantes:
- **Muchas creencias populares tienen poca evidencia**, o la evidencia original fue malinterpretada. Laurent Bossavit, en *The Leprechauns of Software Engineering* (2015), rastreó afirmaciones muy repetidas (como "corregir un defecto cuesta 100 veces más en producción que en requisitos" o la "diferencia de 10 a 1 entre programadores") hasta descubrir que sus fuentes originales eran más débiles o más matizadas de lo que se suele decir.
- **El contexto importa:** una práctica que funciona en Google con miles de ingenieros puede no ser lo mejor para un equipo de cinco. Las revisiones sistemáticas y los estudios en múltiples organizaciones dan evidencia más general que un caso aislado.
Fuentes útiles para profesionales: la serie *Making Software* (Andy Oram y Greg Wilson, 2010), los resúmenes de investigación para practicantes de IEEE Software, y blogs que traducen investigación a la práctica.

## Mantenerse actualizado sin ahogarse
Es imposible seguirlo todo. Una estrategia sostenible:
- **Fundamentos primero:** lo que cambia rápido son las herramientas; los fundamentos (algoritmos, redes, bases de datos, sistemas operativos, diseño) cambian lento y hacen que las herramientas nuevas se aprendan en días. Esta carrera es una inversión en lo que dura.
- **Pocas fuentes de calidad** en lugar de muchas: la documentación oficial y el registro de cambios de las tecnologías que usas, un par de boletines curados, algunos blogs de ingeniería y una o dos conferencias al año (muchas publican sus charlas gratis).
- **Aprender con un propósito:** profundizar en algo cuando lo necesitas para un problema concreto, en lugar de acumular tutoriales.
- **Escribir lo aprendido:** notas, un blog, documentación interna. Explicar consolida el aprendizaje y, como viste en la unidad de carrera, la **práctica de recuperación** es más efectiva que releer.
- **Escepticismo sano ante las modas:** el ciclo de expectativas (el *hype cycle* de Gartner) describe cómo las tecnologías nuevas pasan por un pico de expectativas infladas, una caída de desilusión y, si sobreviven, una meseta de productividad. Esperar a que algo madure suele ser sensato para sistemas de producción.

## Seguir estudiando: posgrado e investigación
Si te atrae la investigación, existen caminos: maestrías y doctorados en ciencias de la computación o ingeniería de software (en universidades peruanas y del extranjero, con becas como las del Programa Nacional de Becas y Crédito Educativo, PRONABEC, o de gobiernos y universidades de otros países), asistencias de investigación durante el pregrado, y colaboración con grupos de investigación. El CONCYTEC administra en el Perú el registro de investigadores y programas de financiamiento. La investigación también existe en la industria, en laboratorios de empresas grandes y en equipos de ingeniería que publican sus resultados.

## Ejemplo resuelto: ¿adoptamos esta base de datos?
Un compañero propone migrar PatioApp a una base de datos nueva tras leer un artículo de blog que afirma que es "10 veces más rápida que PostgreSQL".
1. **Identificar la fuente:** el artículo es del blog de la empresa que vende esa base de datos: hay un interés comercial.
2. **Buscar la evidencia primaria:** el *benchmark* enlazado usa un tipo de consulta (lecturas por clave en memoria) que no es la carga de PatioApp (uniones, agregaciones, transacciones).
3. **Revisar fuentes independientes:** informes de terceros y comparaciones con metodología publicada muestran ventajas en ese tipo de carga y desventajas en transacciones.
4. **Medir en el propio contexto:** se reproducen las tres consultas más lentas de PatioApp con datos reales en ambas bases. PostgreSQL, con un índice faltante agregado, iguala el rendimiento.
5. **Considerar el costo total:** madurez, comunidad, herramientas, conocimiento del equipo, costo de migración.
6. **Decisión documentada:** no migrar; agregar el índice y registrar la evaluación en un registro de decisiones con las condiciones que harían reconsiderarla.`,
  links: [['eco.exp', 'experimentación y amenazas a la validez'], ['m17.career', 'aprender a aprender con evidencia'], ['eq.write', 'escribir lo aprendido']],
  read: 'Keshav, S. (2007), "How to Read a Paper", *ACM SIGCOMM Computer Communication Review*; Oram y Wilson, *Making Software* (2010); Bossavit, *The Leprechauns of Software Engineering* (2015).',
  terms: [
    ['Fuente primaria', 'documento original de un hecho: especificación, documentación oficial o artículo original', ['RFC.', 'MDN.', 'Artículo original.']],
    ['Revisión por pares', 'evaluación de un trabajo por expertos antes de su publicación', ['Conferencias.', 'Revistas.', 'Frente a preprints.']],
    ['Preprint', 'versión de un artículo publicada antes de la revisión por pares', ['arXiv.', 'Reciente.', 'Sin revisión formal.']],
    ['Método de tres pasadas', 'forma de leer un artículo en tres niveles de profundidad creciente', ['Keshav, 2007.', 'Primera pasada de 5 minutos.', 'Tercera para lo central.']],
    ['Línea base', 'punto de comparación contra el que se mide una propuesta', ['Débil o razonable.', 'Benchmarks.', 'Evaluación.']],
    ['Reproducibilidad', 'posibilidad de obtener los mismos resultados con el mismo método, código y datos', ['Evaluación de artefactos.', 'Código publicado.', 'Confianza.']],
    ['Ciclo de expectativas', 'patrón por el que una tecnología pasa por expectativas infladas, desilusión y productividad', ['Hype cycle.', 'Gartner.', 'Esperar a que madure.']],
    ['Práctica de recuperación', 'aprender intentando recordar o explicar en lugar de releer', ['Escribir lo aprendido.', 'Más efectiva.', 'Roediger.']]
  ],
  q: [
    ['Para saber exactamente cómo se comporta un método de JavaScript, ¿cuál es la fuente más autorizada?', 'La especificación ECMAScript o la documentación oficial como MDN', ['Un video de un influencer', 'Un comentario en un foro', 'La primera respuesta de un buscador'], 'Fuente primaria.', 1],
    ['¿Qué diferencia a un preprint de un artículo revisado por pares?', 'El preprint aún no pasó por la evaluación formal de expertos', ['El preprint es más confiable', 'No hay diferencia', 'El preprint solo existe en papel'], 'arXiv.', 2],
    ['¿Qué se hace en la primera pasada del método de Keshav?', 'Leer título, resumen, introducción, títulos de secciones y conclusiones para decidir si sirve', ['Reconstruir todas las demostraciones', 'Reproducir los experimentos', 'Leer solo las referencias'], 'Cinco a diez minutos.', 2],
    ['Un blog de la empresa que vende una base de datos afirma que es 10 veces más rápida. ¿Qué conviene hacer?', 'Revisar el benchmark, buscar fuentes independientes y medir en el propio contexto', ['Migrar de inmediato', 'Ignorarlo sin leerlo', 'Creerlo porque tiene gráficos'], 'Interés comercial y contexto.', 3],
    ['¿Qué pregunta crítica conviene hacer sobre la evaluación de un artículo?', 'Contra qué línea base se comparó y si se parece a mi contexto', ['De qué color son las figuras', 'Cuántas páginas tiene', 'Si el título es atractivo'], 'Validez y aplicabilidad.', 3],
    ['¿Qué mostró Bossavit sobre afirmaciones muy repetidas en ingeniería de software?', 'Que muchas tienen fuentes originales más débiles o matizadas de lo que se dice', ['Que todas son exactas', 'Que no hay investigación en el área', 'Que solo valen los libros'], 'The Leprechauns of Software Engineering.', 4],
    ['¿Por qué conviene priorizar los fundamentos para mantenerse actualizado?', 'Porque cambian lento y permiten aprender rápido las herramientas nuevas', ['Porque las herramientas no importan', 'Porque son más fáciles', 'Porque no cambian nunca'], 'Inversión que dura.', 2],
    { tf: 'Una respuesta de un asistente de IA con una cita bibliográfica puede usarse sin verificar la cita.', v: false, e: 'Los modelos pueden inventar citas; se verifica la fuente.', l: 1 },
    { tf: 'Un informe de incidente detallado de una empresa es una fuente valiosa, aunque un solo caso no sea una regla general.', v: true, e: 'Experiencia real, contexto específico.', l: 2 },
    { c: 'Escribe «tipoFuente(url)»: devuelve "estandar" si contiene rfc-editor.org, w3.org o tc39.es; "documentacion" si contiene developer.mozilla.org o postgresql.org/docs; "preprint" si contiene arxiv.org; "otro" en cualquier otro caso.', f: 'tipoFuente', p: ['url'], t: [[['https://www.rfc-editor.org/rfc/rfc9110'], 'estandar'], [['https://developer.mozilla.org/es/docs/Web'], 'documentacion'], [['https://arxiv.org/abs/1706.03762'], 'preprint'], [['https://blog.ejemplo.com/post'], 'otro']], sol: '  if (/rfc-editor\\.org|w3\\.org|tc39\\.es/.test(url)) return \'estandar\';\n  if (/developer\\.mozilla\\.org|postgresql\\.org\\/docs/.test(url)) return \'documentacion\';\n  if (/arxiv\\.org/.test(url)) return \'preprint\';\n  return \'otro\';', l: 2 },
    { c: 'Escribe «mejoraRelativa(base, propuesta)»: porcentaje de reducción de tiempo de la propuesta respecto de la base, redondeado a entero (negativo si empeora).', f: 'mejoraRelativa', p: ['base', 'propuesta'], t: [[[200, 50], 75], [[100, 100], 0], [[100, 120], -20]], sol: '  return Math.round((base - propuesta) / base * 100);', l: 1 },
    { c: 'Escribe «medianaTiempos(t)»: devuelve la mediana de una lista de tiempos de un benchmark repetido (promedio de los dos centrales si es par).', f: 'medianaTiempos', p: ['t'], t: [[[[12, 10, 50, 11, 13]], 12], [[[4, 2, 3, 1]], 2.5]], sol: '  const s = [...t].sort((a, b) => a - b), n = s.length;\n  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;', l: 2 }
  ],
  gen: function (g) {
    var fu = [['RFC 9110, la definición de HTTP', 'Especificación o estándar'], ['La guía de MDN sobre fetch', 'Documentación oficial'], ['Un artículo de la conferencia ICSE', 'Artículo revisado por pares'], ['Un artículo publicado en arXiv la semana pasada', 'Preprint'], ['El informe de Cloudflare sobre su caída de 2019', 'Informe de incidente'], ['Un hilo en una red social con una opinión fuerte', 'Opinión en redes']];
    fu.forEach(function (f) { g.mcq(1, '¿Qué tipo de fuente es? ' + f[0], f[1], ['Especificación o estándar', 'Documentación oficial', 'Artículo revisado por pares', 'Preprint', 'Informe de incidente', 'Opinión en redes'].filter(function (x) { return x !== f[1]; }).slice(0, 3), 'Tipos de fuentes.'); });
    var pa = [['Leer título, resumen y conclusiones para decidir si sirve', 'Primera pasada'], ['Leer con cuidado y poder resumir los argumentos principales', 'Segunda pasada'], ['Reconstruir el trabajo y cuestionar cada supuesto', 'Tercera pasada']];
    pa.forEach(function (p) { g.mcq(2, 'En el método de Keshav, ¿qué pasada es? ' + p[0], p[1], ['Primera pasada', 'Segunda pasada', 'Tercera pasada', 'Pasada de referencias'].filter(function (x) { return x !== p[1]; }), 'Cómo leer un artículo.'); });
    g.times(5, function (R) { var b = R.pick([100, 200, 400, 800]), p = Math.round(b * R.int(20, 90) / 100); g.input(2, 'Una consulta tardaba ' + b + ' ms y con la propuesta tarda ' + p + ' ms. ¿Qué porcentaje de reducción es? (redondea al entero)', Math.round((b - p) / b * 100), '(base − propuesta) / base × 100.'); });
  },
  checks: [
    ['Ordena las fuentes por confiabilidad para un hecho técnico y explica la regla general.', 'Especificaciones y documentación oficial primero, luego artículos revisados, informes y blogs; para hechos fuente primaria, para prácticas evidencia en contextos parecidos, para opiniones considerar intereses.'],
    ['Describe el método de tres pasadas para leer un artículo.', 'Primera: título, resumen, introducción y conclusiones para decidir; segunda: lectura cuidadosa para resumir; tercera: reconstruir y cuestionar el trabajo.'],
    ['¿Qué preguntas críticas haces sobre la evaluación de un artículo o un benchmark?', 'Con qué datos, si se parece a mi contexto, contra qué línea base, si se repitió, qué amenazas reconoce y si se puede reproducir.'],
    ['¿Cómo mantenerse actualizado sin ahogarse?', 'Priorizar fundamentos, pocas fuentes de calidad, aprender con propósito, escribir lo aprendido y desconfiar de las modas.']
  ],
  cites: ['Keshav, S. (2007). How to Read a Paper. *ACM SIGCOMM Computer Communication Review*, 37(3).', 'Oram, A. y Wilson, G. (eds.) (2010). *Making Software: What Really Works, and Why We Believe It*. O\'Reilly.', 'Bossavit, L. (2015). *The Leprechauns of Software Engineering*. Leanpub.', 'Kitchenham, B., Dybå, T. y Jørgensen, M. (2004). Evidence-Based Software Engineering. *ICSE 2004*.', 'Collberg, C. y Proebsting, T. (2016). Repeatability in Computer Systems Research. *Communications of the ACM*, 59(3).'],
  project: { t: 'Investigar una pregunta técnica',
    goal: 'Responder una pregunta técnica real con fuentes evaluadas críticamente y una medición propia.',
    steps: ['Elige una pregunta concreta (por ejemplo, "¿conviene paginar por clave o por desplazamiento en nuestra tabla de estadías?").', 'Reúne al menos seis fuentes de tipos distintos y clasifícalas por confiabilidad e intereses.', 'Lee un artículo científico relacionado con el método de tres pasadas y escribe su resumen crítico.', 'Diseña y ejecuta una medición propia en tu contexto, repetida y con línea base.', 'Escribe una conclusión con la evidencia, las limitaciones y lo que haría cambiarla.'],
    deliver: 'La lista de fuentes evaluadas, el resumen crítico, la medición y la conclusión.' },
  hito: ['Evalúa con fuentes primarias y una medición propia una propuesta tecnológica para PatioApp antes de adoptarla.', 'Crea en PatioApp una sección de registros de decisiones con las fuentes y la evidencia de cada una.']
});
SDC.after('m17.research', 'm17.career');


SDC.D('m17.research', `## Buscar bien
Encontrar la fuente correcta es la mitad del trabajo. Algunas herramientas y hábitos:
- **Google Scholar**, **Semantic Scholar** y la **ACM Digital Library** buscan artículos académicos; muestran cuántas veces fue citado cada uno y quién lo cita, lo que permite seguir una idea hacia adelante en el tiempo.
- Muchos artículos tienen una versión gratuita en la página del autor o en arXiv; buscar el título exacto entre comillas suele encontrarla. Las universidades peruanas dan acceso a bases de datos a través de sus bibliotecas y del repositorio ALICIA del CONCYTEC, que reúne la producción científica nacional.
- Para un tema nuevo, empezar por un **artículo de revisión** (*survey*) o un capítulo de libro de texto, que ordena el campo y cita lo importante, en lugar de por el artículo más reciente.
- Para tecnologías, el **registro de cambios** y las **propuestas de diseño** del propio proyecto (los RFC de Rust, las propuestas de TC39 para JavaScript, los PEP de Python) explican el porqué de cada función mejor que cualquier tutorial.
- Guardar lo leído con sus datos completos (autor, año, título, enlace) en un gestor de referencias como Zotero, que es libre y gratuito, evita perder fuentes y facilita citarlas.`);
})();
