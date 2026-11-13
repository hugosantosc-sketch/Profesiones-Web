(function () {
var X = SDC.X, XM = SDC.XM;
XM('m11', {
  uni: 'CMU 17-313 *Foundations of Software Engineering* (requisitos y diseño); Berkeley CS169 *Software Engineering* (historias de usuario y BDD); MIT 6.1040 (antes 6.170) *Software Design* (diseño de conceptos); Oxford *Software Engineering Programme* (Requirements Engineering). En Perú: Ingeniería de Requisitos, Análisis y Diseño de Sistemas (UNMSM, UNI, PUCP, UPC).',
  capstone: { t: 'Especificación completa de PatioApp',
    goal: 'Producir la especificación con la que otro equipo podría construir PatioApp sin preguntarte nada esencial.',
    steps: ['Entrevista (o simula entrevistas) con tres interesados distintos: un revisor, un supervisor y el área de finanzas.', 'Redacta requisitos funcionales en formato EARS y no funcionales medibles, priorizados con MoSCoW.', 'Construye el mapa de historias con el primer lanzamiento marcado y criterios Dado-Cuando-Entonces para las historias del MVP.', 'Modela el dominio con diagramas de clases, secuencia y estados, y documenta la arquitectura con C4.', 'Valida la especificación con una revisión entre pares y registra los cambios aceptados.'],
    deliver: 'Un documento de requisitos versionado en el repositorio, con diagramas en Mermaid, matriz de trazabilidad y registro de cambios.' }
});

X('m11.req', {
  deep: `
## Lo más difícil del software
Fred Brooks lo escribió en *No Silver Bullet* (1986):
:::cita La parte individual más difícil de construir un sistema de software es decidir con precisión qué construir. | Fred Brooks, *No Silver Bullet* (1986), traducción propia.
Los informes CHAOS del Standish Group señalan desde 1994 que la falta de participación de los usuarios y los requisitos incompletos o cambiantes están entre las primeras causas de proyectos fallidos. Su metodología ha sido criticada (por ejemplo, por Eveleens y Verhoef en 2010), pero la experiencia de la industria coincide en el fondo: los peores fracasos no son técnicos.

## Un dato que conviene matizar
Se repite que corregir un error de requisitos en producción cuesta 100 veces más que al inicio, a partir de datos de Barry Boehm (*Software Engineering Economics*, 1981). Laurent Bossavit mostró en *The Leprechauns of Software Engineering* (2015) que esa cifra exacta tiene un respaldo empírico débil y depende mucho del contexto. Lo que sí es sólido: cuanto más tarde se descubre un malentendido, **más trabajo ya construido** hay que deshacer. Por eso los métodos ágiles acortan el ciclo entre construir y validar.

## Niveles de requisitos
Karl Wiegers y Joy Beatty, en *Software Requirements* (3.ª ed., 2013), distinguen tres niveles:
| Nivel | Responde | Ejemplo |
| Negocio | ¿por qué se hace? | reducir en 50% el tiempo de entrega de unidades |
| Usuario | ¿qué necesitan hacer las personas? | el revisor registra observaciones con foto desde el celular |
| Sistema (funcional) | ¿qué debe hacer el software? | el sistema guarda hasta 10 fotos por observación |
Si un requisito de sistema no se puede rastrear hasta uno de negocio, probablemente sobra.

## El mundo y la máquina
Michael Jackson (el investigador británico, no el cantante) propuso en los años 90 distinguir el **mundo** (donde está el problema) de la **máquina** (el software). Los requisitos hablan del mundo; la especificación, de lo que la máquina hace en la frontera. Pamela Zave y Jackson mostraron en 1997 que para que el sistema funcione hacen falta además **suposiciones del dominio**: "si la cámara del portón lee una placa, hay un vehículo físicamente ahí". Si la suposición falla (una placa clonada), el software puede cumplir su especificación y aun así el sistema fallar.

## Escribir requisitos sin ambigüedad: EARS
Alistair Mavin y sus colegas de Rolls-Royce propusieron en 2009 **EARS** (*Easy Approach to Requirements Syntax*), cinco plantillas que eliminan la mayoría de las ambigüedades:
| Tipo | Plantilla | Ejemplo |
| Ubicuo | El sistema deberá... | El sistema deberá registrar la hora de cada operación. |
| Por evento | Cuando ..., el sistema deberá... | Cuando una unidad pase a "lista", el sistema deberá notificar al supervisor. |
| Por estado | Mientras ..., el sistema deberá... | Mientras una unidad esté reservada, el sistema deberá impedir asignarla a otro revisor. |
| Opcional | Donde ..., el sistema deberá... | Donde el patio tenga lector de placas, el sistema deberá registrar el ingreso automáticamente. |
| No deseado | Si ..., entonces el sistema deberá... | Si la conexión se pierde, entonces el sistema deberá guardar el registro localmente y sincronizarlo después. |

## Cualidades de un buen requisito
La norma ISO/IEC/IEEE 29148 (2018) enumera las características de un requisito individual: **necesario, apropiado, inequívoco, completo, singular** (una sola cosa por requisito), **factible, verificable, correcto** y **conforme** a un formato. Una prueba rápida: si dos personas pueden escribir pruebas distintas a partir del mismo requisito, es ambiguo.

## Satisfacción del cliente: el modelo de Kano
Noriaki Kano propuso en 1984 clasificar las características según cómo afectan la satisfacción:
- **Básicas:** si faltan, el cliente se enoja; si están, ni lo nota (que no se pierdan los registros).
- **De desempeño:** más es mejor, en proporción (más rápido, más barato).
- **De encanto:** no las espera; si aparecen, sorprenden (lectura automática de placas).
Con el tiempo, lo que encantaba se vuelve básico. Priorizar solo con MoSCoW puede olvidar que sin las básicas nada más importa.

## Técnicas de descubrimiento con detalle
- **Entrevistas:** preguntas abiertas sobre lo que hacen, no sobre lo que quieren ("cuénteme cómo fue la última unidad que entregó").
- **Observación o etnografía:** pasar un turno en el patio revela pasos que nadie menciona porque son "obvios".
- **Talleres** con varios interesados para resolver conflictos de prioridades.
- **Prototipos:** un boceto en papel o en Figma provoca reacciones más útiles que cualquier documento.
- **Análisis de documentos y sistemas existentes:** la hoja de cálculo actual contiene reglas que nadie escribió.
Lleva siempre un **glosario**: la mitad de los conflictos de requisitos son palabras usadas con significados distintos ("entregada": ¿al cliente o al taller?).`,
  checks: [
    ['¿Por qué conviene matizar la cifra de "100 veces más caro" corregir un error de requisitos en producción?', 'Porque su respaldo empírico es débil y depende del contexto; lo sólido es que cuanto más tarde se descubre el error, más trabajo construido hay que rehacer.'],
    ['Reescribe en formato EARS: "el sistema debe manejar las caídas de internet".', 'Si se pierde la conexión, entonces el sistema deberá guardar las operaciones localmente y sincronizarlas al recuperar la conexión, avisando al usuario del estado.'],
    ['¿Qué es una suposición del dominio y por qué importa?', 'Una afirmación sobre el mundo que el sistema da por cierta (por ejemplo, que una placa leída corresponde a un vehículo real). Si es falsa, el software puede cumplir su especificación y el sistema fallar igual.'],
    ['Clasifica con Kano: que no se pierdan registros, que el reporte cargue más rápido y que el sistema sugiera la próxima unidad a revisar.', 'Básica, de desempeño y de encanto, respectivamente.'],
    ['¿Por qué un glosario es parte de la ingeniería de requisitos?', 'Porque muchas discrepancias vienen de palabras con significados distintos para cada interesado; fijarlos evita construir lo que no se pidió.']
  ],
  cites: ['Brooks, F. P. (1987). No Silver Bullet: Essence and Accidents of Software Engineering. *IEEE Computer*, 20(4).', 'Wiegers, K. y Beatty, J. (2013). *Software Requirements* (3.ª ed.). Microsoft Press.', 'Zave, P. y Jackson, M. (1997). Four Dark Corners of Requirements Engineering. *ACM Transactions on Software Engineering and Methodology*, 6(1).', 'Mavin, A. et al. (2009). Easy Approach to Requirements Syntax (EARS). *IEEE International Requirements Engineering Conference*.', 'ISO/IEC/IEEE 29148:2018. *Systems and software engineering — Life cycle processes — Requirements engineering*.', 'Bossavit, L. (2015). *The Leprechauns of Software Engineering*. Leanpub.'],
  project: { t: 'Especificación de requisitos de un sistema real',
    goal: 'Descubrir, redactar, priorizar y validar los requisitos de un sistema pequeño trabajando con personas reales.',
    steps: ['Elige un negocio cercano (una bodega, un taller, una cochera) y entrevista a dos personas que trabajen ahí con preguntas abiertas.', 'Observa al menos una hora de trabajo y anota los pasos que no te mencionaron.', 'Redacta 15 requisitos funcionales en EARS, 5 no funcionales medibles y las restricciones, cada uno con su requisito de negocio de origen.', 'Prioriza con MoSCoW y clasifica con Kano.', 'Valida el documento con los entrevistados y registra qué cambió.'],
    deliver: 'El documento de requisitos, las notas de las entrevistas y observaciones, y el registro de validación.' },
  hito: ['Escribe la especificación de requisitos de PatioApp: 15 requisitos funcionales en formato EARS, 6 no funcionales medibles y 3 restricciones, priorizados con MoSCoW, con un glosario del dominio.', 'Crea una matriz de trazabilidad requisito → historia → prueba, empezando por las funciones que ya existen.']
});

X('m11.stories', {
  deep: `
## Origen: una tarjeta y una conversación
Las historias de usuario nacieron con la Programación Extrema de Kent Beck a fines de los 90. Ron Jeffries resumió en 2001 su esencia en **las tres C**:
- **Card (tarjeta):** una frase breve que recuerda la necesidad.
- **Conversation (conversación):** los detalles se acuerdan hablando con quien la pidió.
- **Confirmation (confirmación):** los criterios de aceptación dicen cuándo está terminada.
La tarjeta no es la especificación: es un recordatorio para conversar. Bill Wake propuso en 2003 el acrónimo **INVEST**, y Mike Cohn sistematizó la práctica en *User Stories Applied* (2004).

## De los criterios a las pruebas: BDD
Dan North presentó en 2006 el **desarrollo guiado por comportamiento** (BDD), que usa el formato Dado-Cuando-Entonces para escribir criterios que a la vez son **pruebas ejecutables**. Herramientas como Cucumber leen estos escenarios escritos en lenguaje Gherkin y los conectan con código de prueba:
~~~txt
Característica: Entrega de unidades
  Escenario: no se entrega una unidad sin revisión
    Dado una unidad "ABC123" en estado "ingresada"
    Cuando el supervisor intenta entregarla
    Entonces la entrega se rechaza con el mensaje "Primero debe revisarse"
    Y la unidad sigue en estado "ingresada"
~~~
Gojko Adzic llamó a esta práctica **especificación mediante ejemplos** (2011): los ejemplos concretos acordados con el negocio son la especificación, y se mantienen vivos porque se ejecutan.

## Cómo partir historias grandes
Richard Lawrence publicó en 2009 una guía de patrones para dividir historias, siempre en rebanadas verticales:
| Patrón | Ejemplo con "gestionar entregas" |
| Pasos del flujo | primero registrar la entrega; luego la firma digital; luego el aviso al cliente |
| Variantes de reglas | primero entregas normales; luego entregas con autorización especial |
| Camino feliz primero | primero cuando todo está bien; luego los errores y excepciones |
| Variantes de datos | primero autos; luego camiones con documentación adicional |
| Operaciones (CRUD) | primero crear y ver; luego editar; luego anular |
| Posponer el rendimiento | primero que funcione; luego que soporte 500 entregas por hora |
Una historia que no cabe en un sprint (idealmente debería caber en pocos días) se divide hasta que quepa.

## Mapas de historias
Jeff Patton propuso en *User Story Mapping* (2014) ordenar las historias en dos dimensiones: horizontalmente, los pasos de la actividad del usuario (la "columna vertebral": recibir, revisar, preparar, entregar); verticalmente, la prioridad. Una línea horizontal marca qué entra en cada lanzamiento. Así el primer lanzamiento recorre **todo el flujo de forma básica**, en lugar de perfeccionar un solo paso y no tener nada usable de punta a punta.

## Otras formas de capturar necesidades
- **Historias de trabajo (*job stories*):** "Cuando [situación], quiero [motivación], para [resultado esperado]". Centradas en el contexto más que en el rol; útiles cuando el mismo rol tiene necesidades muy distintas según la situación.
- **Mapa de impacto** (Gojko Adzic, 2012): parte de un objetivo de negocio, pregunta qué actores pueden ayudar o impedir, qué impactos en su comportamiento lo lograrían y qué entregables los producen. Evita construir funcionalidades que no mueven ningún objetivo.
- **Casos de uso** (Ivar Jacobson, 1987): más formales, con flujo principal y alternativos. Siguen siendo útiles para procesos con muchas excepciones o sistemas regulados.

## Listo y terminado
- **Definición de listo (*ready*):** lo que una historia necesita antes de entrar a un sprint (criterios claros, dependencias resueltas, diseño acordado). Úsala con cuidado: si se vuelve una burocracia, reaparece la cascada.
- **Definición de terminado (*done*):** lo que toda historia cumple al terminar (código revisado, pruebas automatizadas pasando, documentación actualizada, desplegado en el entorno de prueba). Es un compromiso de calidad del equipo, no una lista por historia.

## Errores frecuentes
- Historias técnicas disfrazadas: "Como desarrollador quiero crear la tabla de unidades" no entrega valor a ningún usuario; es una tarea dentro de una historia.
- Criterios de aceptación que describen la interfaz en lugar del comportamiento ("hay un botón azul").
- Historias sin "para qué": sin el beneficio, nadie puede proponer una solución mejor ni negociar el alcance.`,
  checks: [
    ['¿Qué son las tres C de Ron Jeffries?', 'Tarjeta (un recordatorio breve), conversación (los detalles se acuerdan hablando) y confirmación (los criterios de aceptación que dicen cuándo está terminada).'],
    ['¿Qué ventaja tiene escribir los criterios en Gherkin?', 'Son legibles para el negocio y además se pueden ejecutar como pruebas automatizadas, así la especificación no queda desactualizada.'],
    ['Divide "como supervisor quiero gestionar las entregas" usando el patrón de camino feliz primero.', 'Primera historia: entregar una unidad revisada y pagada sin problemas. Siguientes: manejar la entrega rechazada, la autorización especial y la anulación.'],
    ['¿Qué problema resuelve un mapa de historias frente a un backlog plano?', 'Muestra el flujo completo del usuario y permite que cada lanzamiento cubra todos los pasos de forma básica, en lugar de terminar un paso y no tener nada usable de punta a punta.'],
    ['¿Por qué "como desarrollador quiero crear la tabla de unidades" no es una buena historia?', 'Porque no entrega valor visible a ningún usuario; es una tarea técnica que debe formar parte de una historia que sí lo haga.']
  ],
  cites: ['Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley.', 'Jeffries, R. (2001). Essential XP: Card, Conversation, Confirmation. ronjeffries.com.', 'North, D. (2006). Introducing BDD. *Better Software Magazine*.', 'Patton, J. (2014). *User Story Mapping*. O\'Reilly.', 'Adzic, G. (2011). *Specification by Example*. Manning.', 'Lawrence, R. (2009). Patterns for Splitting User Stories. agileforall.com.'],
  project: { t: 'Mapa de historias y backlog ejecutable',
    goal: 'Convertir los requisitos de un sistema en un backlog bien dividido, cuyos criterios se ejecutan como pruebas.',
    steps: ['Dibuja el mapa de historias del sistema del proyecto anterior: actividades, pasos e historias.', 'Marca tres lanzamientos y justifica qué entra en el primero (MVP).', 'Divide las tres historias más grandes usando al menos tres patrones distintos.', 'Escribe criterios Dado-Cuando-Entonces para las historias del MVP.', 'Automatiza al menos tres escenarios como pruebas (con Cucumber o con pruebas normales que sigan la misma estructura).'],
    deliver: 'El mapa (foto o herramienta digital), el backlog priorizado y las pruebas de aceptación ejecutándose.' },
  hito: ['Construye el mapa de historias de PatioApp y marca el primer lanzamiento (MVP) que recorre todo el flujo: ingreso, revisión, preparación y entrega.', 'Escribe criterios Dado-Cuando-Entonces para cinco historias y automatízalos como pruebas de aceptación.']
});

X('m11.uml', {
  deep: `
## Un lenguaje unificado
A comienzos de los 90 había decenas de notaciones para diagramar software. Grady Booch, James Rumbaugh e Ivar Jacobson, "los tres amigos", las unificaron en Rational Software entre 1995 y 1997, y el Object Management Group adoptó UML como estándar en 1997. La versión 2.5.1 (2017) define 14 tipos de diagramas: 7 de **estructura** (clases, objetos, componentes, despliegue, paquetes, estructura compuesta, perfiles) y 7 de **comportamiento** (casos de uso, actividades, estados, secuencia, comunicación, tiempos y visión general de interacción).

## Tres formas de usar UML
Martin Fowler distingue en *UML Distilled* tres usos:
- **Boceto:** diagramas rápidos para pensar y comunicar; incompletos a propósito. Es el uso más valioso y más común.
- **Plano:** diagramas detallados que otro equipo implementa. Útil en contextos regulados o contratados.
- **Lenguaje de programación:** generar código desde los modelos. Prometió mucho y se usa poco.
La regla práctica: dibuja lo que necesitas para entender o explicar una decisión, y no más.

## El diagrama de clases con todos sus símbolos
~~~txt
+----------------------------+
| Unidad                     |
+----------------------------+
| - placa: Placa             |      visibilidad: + pública, - privada, # protegida
| - km: Entero               |
+----------------------------+
| + recorrer(d: Entero)      |
| + entregar(): void         |
+----------------------------+
Patio  ◆────── 1..*  Espacio      composición: el espacio no existe sin el patio
Taller ◇────── 0..*  Revisor      agregación: el revisor existe sin el taller
Unidad ───────▷ Vehiculo         generalización (herencia)
Unidad - - - -▷ Rastreable       realización (implementa una interfaz)
ServicioEntregas - - - -> Notificador   dependencia (lo usa)
~~~
La **multiplicidad** («1», «0..1», «*», «1..*») dice cuántos objetos participan en cada extremo y se traduce en reglas: «1..*» significa que no puede haber un patio sin espacios.

## Diagramas de secuencia con fragmentos
Muestran el intercambio de mensajes en el tiempo entre participantes (líneas de vida). Los **fragmentos combinados** expresan lógica: «alt» (alternativas, como un if/else), «opt» (opcional), «loop» (repetición) y «par» (en paralelo). Son la mejor herramienta para diseñar una integración entre servicios antes de escribirla.
~~~txt
sequenceDiagram
  Supervisor->>API: PATCH /unidades/ABC123 {estado: entregada}
  API->>Servicio: entregar("ABC123")
  Servicio->>BD: buscar unidad (con versión)
  alt revisada y pagada
    Servicio->>BD: actualizar estado (si la versión coincide)
    Servicio-->>Notificador: evento UnidadEntregada
    API-->>Supervisor: 200 OK
  else no cumple
    API-->>Supervisor: 409 Conflict con el motivo
  end
~~~
Este bloque es código **Mermaid**: GitHub y muchas herramientas lo dibujan automáticamente. Mantener los diagramas como texto en el repositorio (con Mermaid o PlantUML) hace que se versionen y revisen igual que el código.

## Actividades y estados
- **Diagrama de actividades:** un flujo de trabajo con decisiones, paralelismo y **carriles** (*swimlanes*) por responsable. Ideal para procesos de negocio que cruzan áreas.
- **Diagrama de estados:** los estados de un objeto y los eventos que lo hacen cambiar. Se basa en los *statecharts* de David Harel (1987) y lo estudiarás a fondo en el módulo de métodos formales.

## Modelar el dominio con el negocio
Eric Evans propone en *Domain-Driven Design* (2003) construir un **lenguaje ubicuo**: los mismos términos en las conversaciones, los documentos y el código. Si el negocio dice "madrina" y el código dice «TransporteMultiple», cada conversación requiere traducción y se pierden matices. Evans también introduce los **contextos delimitados**: "unidad" puede significar algo distinto para Finanzas (un activo con costo) y para Operaciones (un vehículo con ubicación), y está bien que cada contexto tenga su propio modelo.
Alberto Brandolini propuso en 2013 el **Event Storming**: un taller donde negocio y desarrollo pegan en una pared notas naranjas con los **eventos del dominio** en pasado ("Unidad ingresada", "Revisión aprobada", "Unidad entregada"), luego los comandos que los provocan y las reglas involucradas. En pocas horas aparece el modelo del dominio y sus contradicciones.

## C4: arquitectura en cuatro niveles de zoom
Simon Brown propuso el modelo **C4**, que describe un sistema como un mapa con zoom:
1. **Contexto:** el sistema como una caja, sus usuarios y los sistemas externos.
2. **Contenedores:** las aplicaciones y almacenes que se despliegan (interfaz web, API, base de datos).
3. **Componentes:** las piezas principales dentro de cada contenedor.
4. **Código:** clases (normalmente generado o innecesario).
Los dos primeros niveles son los que más se usan y los que cualquier proyecto debería tener.`,
  checks: [
    ['¿Cuáles son los tres usos de UML según Fowler y cuál es el más valioso?', 'Boceto, plano y lenguaje de programación. El más valioso y común es el boceto, para pensar y comunicar.'],
    ['¿Qué diferencia hay entre composición y agregación en un diagrama de clases?', 'En la composición (rombo relleno) la parte no existe sin el todo; en la agregación (rombo vacío) la parte puede existir por su cuenta.'],
    ['¿Qué fragmento de un diagrama de secuencia usarías para modelar un if/else?', 'El fragmento combinado alt.'],
    ['¿Qué es un contexto delimitado y por qué ayuda?', 'Una frontera dentro de la cual un modelo y su lenguaje tienen un significado preciso; permite que términos como "unidad" signifiquen cosas distintas en Finanzas y Operaciones sin forzar un modelo único confuso.'],
    ['¿Qué ventaja tiene mantener los diagramas en Mermaid dentro del repositorio?', 'Se versionan y revisan junto al código, se actualizan en el mismo pull request y no dependen de una herramienta externa.']
  ],
  cites: ['Fowler, M. (2003). *UML Distilled* (3.ª ed.). Addison-Wesley.', 'Object Management Group (2017). *Unified Modeling Language Specification, versión 2.5.1*.', 'Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.', 'Brandolini, A. (2021). *Introducing EventStorming*. Leanpub.', 'Brown, S. *The C4 model for visualising software architecture*. c4model.com.'],
  project: { t: 'Modelo de dominio de un taller mecánico',
    goal: 'Modelar un dominio real de punta a punta, desde un taller de eventos hasta diagramas listos para implementar.',
    steps: ['Haz un Event Storming (con compañeros o solo con notas adhesivas) del proceso de un taller: desde la cita hasta la entrega.', 'Escribe el glosario del lenguaje ubicuo y marca los contextos delimitados.', 'Dibuja en Mermaid el diagrama de clases del contexto principal con multiplicidades y tipos de relación.', 'Dibuja diagramas de secuencia de dos flujos importantes y el diagrama de estados de una orden de trabajo.', 'Dibuja los niveles de contexto y contenedores de C4.'],
    deliver: 'Las fotos del Event Storming, el glosario y todos los diagramas en Mermaid dentro de un repositorio.' },
  hito: ['Agrega al repositorio de PatioApp el diagrama de clases del dominio y el diagrama de secuencia de "entregar unidad" en Mermaid.', 'Dibuja los diagramas C4 de contexto y de contenedores de PatioApp y un glosario del lenguaje ubicuo.']
});
})();
