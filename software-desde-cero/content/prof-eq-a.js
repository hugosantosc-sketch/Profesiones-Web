(function () {
var D = SDC.D;
SDC.XM('eq', { prof: true });

D('eq.teams', `## Qué hace efectivo a un equipo: el proyecto Aristóteles
Entre 2012 y 2015, Google estudió 180 de sus equipos para averiguar por qué unos rendían mucho más que otros (el llamado proyecto Aristóteles). Esperaban encontrar que la clave era juntar a las personas más brillantes o con la mezcla correcta de habilidades. No fue así: **quiénes** estaban en el equipo importaba mucho menos que **cómo** trabajaban juntos. Los cinco factores que encontraron, en orden de importancia:
1. **Seguridad psicológica:** poder arriesgarse (preguntar, admitir un error, proponer una idea rara) sin miedo a quedar mal.
2. **Confiabilidad:** confiar en que los demás harán su parte a tiempo y con calidad.
3. **Estructura y claridad:** objetivos, roles y planes claros.
4. **Significado:** que el trabajo importe personalmente a cada uno.
5. **Impacto:** creer que el trabajo cambia algo.
El primero, por lejos, fue la seguridad psicológica, el concepto de Amy Edmondson que viste en esta unidad. Un hallazgo relacionado de Anita Woolley y otros (*Science*, 2010) sobre la **inteligencia colectiva** de los grupos: los equipos que resolvían mejor problemas variados no eran los de miembros con mayor coeficiente intelectual, sino aquellos donde los turnos de palabra estaban mejor repartidos y sus miembros eran mejores leyendo las señales sociales de los demás.

## Equipos con personas de distintas empresas
En muchos proyectos reales, el equipo mezcla personal propio, contratistas y personal del cliente, con distintos jefes, horarios e incentivos. Funciona cuando hay **un objetivo común explícito**, un canal de comunicación compartido (no tres grupos de mensajería paralelos), reglas claras sobre quién decide qué, y el mismo trato en las reuniones y retrospectivas para todos. El riesgo típico es que los externos se conviertan en "ejecutores de tickets" sin contexto, lo que destruye la calidad: quien no entiende para qué sirve algo no puede detectar que está mal.

## Nuevos integrantes
La incorporación (*onboarding*) define buena parte de la productividad de una persona en sus primeros meses. Las prácticas que más ayudan: una guía actualizada para poner en marcha el entorno en un día, una primera tarea pequeña que llegue a producción en la primera semana, un compañero asignado para preguntas, acceso a las decisiones registradas y una conversación al mes para ajustar. Cada persona nueva que encuentra un paso desactualizado en la guía debería corregirlo: así la guía se mantiene viva.`);

D('eq.write', `## Escribir para quien lee en el teléfono
Hoy buena parte de la comunicación técnica se lee en un teléfono, entre reuniones o en el transporte. Eso premia lo que la escritura clara ya pedía: **la conclusión primero** (el estilo de pirámide invertida del periodismo y el principio **BLUF**, *bottom line up front*, de la comunicación militar), párrafos cortos, listas para pasos o elementos paralelos, y una sola idea por mensaje. Un mensaje del tipo "Hola, ¿tienes un minuto?" seguido de silencio obliga a la otra persona a esperar sin saber para qué; es mejor escribir la pregunta completa de una vez, con el contexto necesario para responder sin preguntar de vuelta.

## Reportar un error para que se pueda arreglar
Un buen reporte de error ahorra horas. Simon Tatham escribió en 1999 una guía clásica sobre cómo hacerlo, y sus puntos siguen vigentes:
1. **Título específico:** "El cobro con convenio muestra 20 soles en lugar de 15 al cerrar estadías de un día", no "Error en cobros".
2. **Pasos para reproducir**, numerados, desde un estado conocido.
3. **Resultado esperado y resultado obtenido**, con el texto exacto de los mensajes de error.
4. **Entorno:** versión, navegador, dispositivo, sede, hora.
5. **Evidencia:** capturas, registros, el identificador de la petición.
6. **Frecuencia:** siempre, a veces, una vez.
Un reporte así permite reproducir el problema en minutos; uno vago genera días de idas y vueltas.

## Escribir en español técnico
En el Perú y en América Latina, mucha documentación técnica mezcla español e inglés. Algunas pautas razonables: usar el término en español cuando existe y se entiende ("despliegue", "rama", "prueba unitaria"), mantener en inglés los nombres propios de herramientas y los términos sin traducción establecida, y ser **consistente** dentro de un mismo documento. Explicar una sigla la primera vez que aparece. Y recordar que muchos lectores no son ingenieros: un texto para el área de operaciones debe hablar de "las salidas que no se registraron", no de "transacciones que hicieron rollback".`);

D('eq.pm', `## Gestión de proyectos ágil y tradicional, juntas
La gestión de proyectos con cronogramas, ruta crítica y valor ganado nació en proyectos de construcción y defensa, donde el alcance se conoce bien de antemano. En software, el alcance suele descubrirse en el camino, y por eso los métodos ágiles (que viste en el curso de procesos) planifican en ciclos cortos. En la práctica, muchas organizaciones combinan ambos: un **plan de alto nivel** con hitos y fechas comprometidas (el lanzamiento en la feria, la fecha en que SUNAT exige un nuevo formato) y una **ejecución ágil** dentro de cada etapa. Las herramientas tradicionales siguen siendo útiles para lo que es fijo (la ruta crítica de una migración con dependencias externas, el presupuesto de un contrato), y las ágiles para lo que es incierto.

## Pronosticar con datos en lugar de estimar
Una alternativa a estimar cada tarea es **pronosticar** a partir del ritmo real del equipo. Si en las últimas diez semanas el equipo terminó entre 4 y 9 elementos por semana, una **simulación de Monte Carlo** (repetir miles de veces el futuro sorteando semanas pasadas al azar) estima cuántas semanas tomarán los 40 elementos que faltan, con probabilidades: "con 85 % de probabilidad, en 8 semanas o menos". Daniel Vacanti y Troy Magennis popularizaron este enfoque en equipos ágiles. Sus ventajas: usa datos reales, comunica incertidumbre de forma honesta y cuesta poco tiempo de reuniones.
~~~js
function pronostico(historial, pendientes, simulaciones = 10000) {
  const semanas = [];
  for (let s = 0; s < simulaciones; s++) {
    let restantes = pendientes, n = 0;
    while (restantes > 0) { restantes -= historial[Math.floor(Math.random() * historial.length)]; n++; }
    semanas.push(n);
  }
  semanas.sort((a, b) => a - b);
  return { p50: semanas[Math.floor(simulaciones * 0.5)], p85: semanas[Math.floor(simulaciones * 0.85)] };
}
console.log(pronostico([4, 6, 9, 5, 7, 6, 4, 8, 5, 6], 40));   // por ejemplo { p50: 7, p85: 8 }
~~~

## Cerrar un proyecto
Un proyecto termina formalmente con la **aceptación** del cliente, la entrega de la documentación y los accesos, el traspaso al equipo que lo mantendrá y una **retrospectiva** de lecciones aprendidas que se guarda donde otros proyectos puedan encontrarla. Saltarse el cierre deja cabos sueltos (accesos de contratistas activos, servicios de prueba encendidos que se siguen pagando, conocimiento que se va con las personas).`);
})();
