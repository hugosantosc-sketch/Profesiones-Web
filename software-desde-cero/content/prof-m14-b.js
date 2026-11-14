(function () {
var S = SDC.S;

S('m14', 'm14.perf', { title: 'Pruebas de rendimiento, carga y resiliencia',
  ask: '¿Qué concepto de pruebas de rendimiento se aplica?',
  lesson: `
> **La idea en simple.** Un puente puede estar perfectamente construido y aun así caerse el día en que pasan cien camiones a la vez. Antes de inaugurarlo se lo carga con peso controlado para ver cómo se comporta. Las pruebas de rendimiento hacen lo mismo con el software: ponerlo bajo una carga conocida para descubrir cuánto aguanta, dónde se rompe y cómo se recupera, antes de que lo descubran los usuarios en el peor momento.

## Por qué probar el rendimiento
Los problemas de rendimiento casi nunca aparecen en el entorno del desarrollador, con un usuario y pocos datos. Aparecen con **muchos usuarios simultáneos**, con **muchos datos acumulados** o con **dependencias lentas**. Son caros de corregir tarde porque muchas veces tienen causa en la arquitectura (una consulta sin índice se arregla en minutos; un diseño que hace 40 llamadas a la base por pantalla, en semanas). Casos públicos abundan: el portal HealthCare.gov en 2013, los sistemas de venta de entradas que colapsan al abrir una preventa, los portales de trámites del Estado que caen el último día del plazo.

## Tipos de pruebas de rendimiento
| Tipo | Pregunta | Forma de la carga |
| De carga | ¿Cumple los requisitos con la carga esperada? | sube hasta la carga normal o de hora punta y se mantiene |
| De estrés | ¿Dónde y cómo se rompe? | sube más allá de lo esperado hasta que falla |
| De picos | ¿Aguanta un salto brusco? | de carga baja a muy alta en segundos |
| De resistencia (*soak*) | ¿Se degrada con el tiempo? | carga normal durante horas o días |
| De escalabilidad | ¿Mejora al agregar recursos? | misma carga con 1, 2, 4 servidores |
| De capacidad | ¿Cuántos usuarios soporta cumpliendo los requisitos? | sube en escalones midiendo cuándo deja de cumplir |
Las pruebas de resistencia encuentran problemas que solo aparecen con el tiempo: **fugas de memoria**, conexiones que no se liberan, archivos de registro que llenan el disco, tablas que crecen sin límite y hacen más lentas las consultas.

## Qué medir
- **Latencia** o tiempo de respuesta, siempre en **percentiles** (p50, p95, p99), no en promedio.
- **Rendimiento** (*throughput*): peticiones o transacciones por segundo completadas.
- **Tasa de errores:** porcentaje de peticiones fallidas o que superan el tiempo de espera.
- **Uso de recursos:** CPU, memoria, disco, red, conexiones a la base de datos, hilos.
- **Saturación:** colas de espera que crecen, señal de que un recurso está al límite.
Brendan Gregg propuso el **método USE** para analizar cada recurso: **Utilización** (cuánto tiempo está ocupado), **Saturación** (cuánto trabajo espera) y **Errores**. Para los servicios, Tom Wilkie propuso el **método RED**: tasa de peticiones (*Rate*), errores (*Errors*) y duración (*Duration*).

## Un poco de teoría de colas
Dos resultados ayudan a razonar sin adivinar:
- **Ley de Little** (John Little, 1961): en un sistema estable, el número medio de peticiones dentro del sistema es igual a la tasa de llegada por el tiempo medio que pasa cada una: **L = λ · W**. Si llegan 50 peticiones por segundo y cada una tarda 0,2 s, hay en promedio 10 en curso; si el servidor solo puede atender 8 a la vez, se formará una cola.
- **La curva de la utilización:** en una cola sencilla con llegadas aleatorias (el modelo M/M/1), el tiempo de respuesta es W = S / (1 − U), donde S es el tiempo de servicio y U la utilización. Al 50 % de utilización, el tiempo es el doble del de servicio; al 90 %, diez veces; al 95 %, veinte. Por eso los sistemas "se caen de golpe": no se degradan linealmente, sino que la latencia explota cuando la utilización se acerca al 100 %.
~~~js
// Tiempo de respuesta en una cola M/M/1 según la utilización
const servicio = 0.05;   // 50 ms por petición
for (const u of [0.5, 0.7, 0.8, 0.9, 0.95, 0.99]) {
  console.log('utilización ' + Math.round(u * 100) + '% → respuesta media ' + Math.round(1000 * servicio / (1 - u)) + ' ms');
}
~~~
Neil Gunther agregó la **ley de escalabilidad universal**, que explica por qué duplicar servidores no duplica la capacidad (por la contención y la coherencia entre ellos), como viste en Arquitectura.

## Diseñar una prueba de carga
1. **Definir el objetivo** a partir de los requisitos de calidad: "300 operadores registrando movimientos en hora punta con p95 menor a 2 s y menos de 0,1 % de errores".
2. **Modelar la carga:** qué hacen los usuarios y en qué proporción (70 % consultas, 20 % ingresos, 10 % salidas), con **tiempos de pensamiento** realistas entre acciones. Los datos de producción (registros de acceso, analítica) son la mejor fuente.
3. **Preparar datos** de volumen realista: probar con una base vacía oculta los problemas de índices y consultas.
4. **Elegir un modelo de carga abierto o cerrado.** En el **cerrado**, un número fijo de usuarios virtuales espera cada respuesta antes de enviar la siguiente; si el sistema se pone lento, la carga baja sola, lo que oculta problemas (es la **omisión coordinada** que describió Gil Tene). En el **abierto**, las peticiones llegan a una tasa fija independiente de las respuestas, como en la realidad de un sitio público. Para servicios en internet, el modelo abierto es casi siempre el correcto.
5. **Ejecutar con un entorno representativo** (misma configuración, tamaño proporcional) y **monitorear** todo el sistema durante la prueba, no solo el generador de carga.
6. **Analizar, corregir, repetir:** encontrar el cuello de botella (base de datos, CPU, conexiones, un servicio externo), corregirlo y volver a medir. Siempre hay un siguiente cuello de botella.
Herramientas habituales: **JMeter** (Apache, 1998), **Gatling** (2012), **k6** (2017, hoy de Grafana Labs, con escenarios en JavaScript) y **Locust** (en Python).
~~~js
// Escenario de carga al estilo k6 (modelo abierto: tasa de llegada constante)
// export const options = {
//   scenarios: { horaPunta: { executor: 'constant-arrival-rate', rate: 50, timeUnit: '1s',
//                             duration: '15m', preAllocatedVUs: 200 } },
//   thresholds: { http_req_duration: ['p(95)<2000'], http_req_failed: ['rate<0.001'] }
// };
// export default function () { http.post(URL + '/salidas', { placa: placaAleatoria() }); }
~~~

## Perfilado y análisis
Cuando una prueba muestra lentitud, hay que encontrar **dónde** se va el tiempo. Los **perfiladores** muestrean qué funciones se están ejecutando y cuánto tiempo consumen; los **gráficos de llama** (*flame graphs*), inventados por Brendan Gregg en 2011, muestran visualmente las pilas de llamadas más costosas. Para bases de datos, los planes de ejecución de las consultas (que viste en Bases de Datos II) y el registro de consultas lentas. Para sistemas distribuidos, las **trazas** muestran qué servicio o llamada aporta cada parte de la latencia. La regla de oro, atribuida a Donald Knuth: no optimizar a ciegas; medir primero, porque la intuición sobre dónde está el problema suele fallar.

## Pruebas de resiliencia
La resiliencia es la capacidad de seguir funcionando, aunque sea degradado, cuando algo falla. Se prueba **inyectando fallas** de forma controlada:
- Apagar una instancia de la aplicación o de la base de datos.
- Agregar latencia o pérdida de paquetes en la red (herramientas como Toxiproxy o los inyectores de fallas de las mallas de servicios).
- Hacer que un servicio externo responda con errores o muy lento.
- Llenar el disco o agotar la memoria.
Lo que se verifica es que se cumplan las expectativas de diseño: que los tiempos de espera corten, que los disyuntores se abran, que la degradación funcional opere y que el sistema se recupere solo al quitar la falla. Cuando se hace de forma sistemática y en producción, con hipótesis y radio de impacto controlado, es la **ingeniería del caos** que viste en Sistemas Distribuidos.

## Rendimiento en la integración continua
Las pruebas de carga completas son caras y se ejecutan antes de versiones importantes. Pero se pueden detectar **regresiones** de rendimiento antes:
- **Microbenchmarks** de las funciones críticas (el cálculo de tarifas, la búsqueda por placa) en cada commit, comparados con la versión anterior.
- Una **prueba de carga corta** (5 minutos) en cada despliegue al entorno de pruebas, con umbrales que fallan el pipeline si el p95 empeora más de un 20 %.
- **Presupuestos de rendimiento** en el frontend: tamaño máximo del paquete de JavaScript y métricas web como el LCP (tiempo hasta pintar el contenido principal).

## Ejemplo resuelto: la hora punta de PatioApp
1. **Objetivo:** 300 operadores, 50 movimientos por segundo, p95 menor a 2 s, errores menores a 0,1 %.
2. **Primera ejecución** (modelo abierto, base con 2 millones de estadías): a 30 movimientos por segundo el p95 sube a 6 s. Las trazas muestran que el 80 % del tiempo se va en una consulta de deuda que recorre todas las estadías de la placa sin índice.
3. **Corrección:** índice compuesto por placa y estado; segunda ejecución: p95 de 900 ms a 50 por segundo, pero a 60 por segundo aparecen errores por agotamiento del grupo de conexiones a la base (20 conexiones).
4. **Segunda corrección:** grupo de 40 conexiones y caché de tarifas. Prueba de estrés: el sistema se satura a 140 por segundo, casi tres veces la hora punta esperada.
5. **Resistencia:** 8 horas a carga normal revelan que la memoria de la API crece sin parar; el perfilado muestra una caché sin límite de tamaño. Se le pone un límite con expulsión LRU.
6. **Resiliencia:** con la pasarela de pago respondiendo en 30 s, el disyuntor se abre a los 5 fallos y el patio sigue operando con cobro en efectivo.
7. Se agrega una prueba de carga de 5 minutos al pipeline con umbral de p95 en 1,5 s.`,
  links: [['m11.nfr', 'las pruebas de rendimiento verifican los requisitos de calidad'], ['m13.scale', 'los resultados guían las decisiones de escalabilidad'], ['sd.ops', 'la latencia de cola y la ingeniería del caos se estudian en Sistemas Distribuidos']],
  read: 'Gregg, *Systems Performance* (2.ª ed., 2020); Molyneaux, *The Art of Application Performance Testing* (2.ª ed., 2014); Little (1961); documentación de k6.',
  terms: [
    ['Prueba de carga', 'prueba que verifica el comportamiento con la carga esperada o de hora punta', ['300 operadores en hora punta.', 'Se compara con los requisitos.', 'Se mantiene un tiempo.']],
    ['Prueba de estrés', 'prueba que aumenta la carga más allá de lo esperado para ver dónde y cómo se rompe', ['Encuentra el límite.', 'Muestra el modo de falla.', 'Se satura a 140 por segundo.']],
    ['Prueba de resistencia', 'prueba con carga normal durante horas o días para detectar degradación', ['Encuentra fugas de memoria.', 'También llamada soak.', 'Conexiones no liberadas.']],
    ['Ley de Little', 'en un sistema estable, el número medio dentro del sistema es la tasa de llegada por el tiempo medio', ['L = λ · W.', 'Little, 1961.', 'Sirve para dimensionar.']],
    ['Omisión coordinada', 'error de medición en que el generador espera cada respuesta y reduce la carga cuando el sistema se pone lento', ['Gil Tene.', 'Oculta la latencia real.', 'Se evita con un modelo abierto.']],
    ['Modelo de carga abierto', 'generación de peticiones a una tasa fija independiente de las respuestas', ['Como un sitio público real.', 'constant-arrival-rate en k6.', 'Revela la saturación.']],
    ['Gráfico de llama', 'visualización de las pilas de llamadas que muestra dónde se consume el tiempo', ['Brendan Gregg, 2011.', 'Resultado de un perfilador.', 'Las barras anchas son las costosas.']],
    ['Método USE', 'análisis de cada recurso por su utilización, saturación y errores', ['Brendan Gregg.', 'CPU, disco, red, conexiones.', 'Se complementa con RED.']]
  ],
  q: [
    ['¿Qué prueba encuentra una fuga de memoria que crece lentamente?', 'De resistencia', ['De humo', 'Unitaria', 'De picos'], 'Carga normal durante horas.', 2],
    ['Llegan 50 peticiones por segundo y cada una tarda 0,2 s. Según la ley de Little, ¿cuántas hay en curso en promedio?', '10', ['250', '0,25', '50'], 'L = 50 × 0,2.', 3],
    ['En una cola M/M/1 con servicio de 50 ms, ¿cuál es el tiempo de respuesta medio al 90 % de utilización?', '500 ms', ['55 ms', '90 ms', '100 ms'], 'W = S / (1 − U) = 0,05 / 0,1.', 3],
    ['¿Por qué los sistemas parecen "caerse de golpe" al acercarse al límite?', 'Porque la latencia crece de forma explosiva cuando la utilización se acerca al 100 %', ['Porque se apagan los servidores', 'Porque la latencia crece de forma lineal', 'Porque la red se corta'], 'W = S / (1 − U).', 3],
    ['¿Qué problema tiene el modelo de carga cerrado para un sitio público?', 'Cuando el sistema se pone lento, la carga baja sola y oculta los problemas', ['Genera demasiada carga', 'No se puede automatizar', 'No mide latencia'], 'Omisión coordinada.', 4],
    ['¿Por qué probar con una base de datos vacía es un error?', 'Porque oculta los problemas de índices y consultas que aparecen con volumen real', ['Porque es más lento', 'Porque no se puede conectar', 'Porque viola la ley'], 'Hay que preparar datos de volumen realista.', 2],
    ['¿Qué debe hacerse antes de optimizar?', 'Medir para encontrar dónde se va realmente el tiempo', ['Reescribir todo en otro lenguaje', 'Agregar servidores', 'Optimizar lo que parezca lento'], 'La intuición suele fallar.', 2],
    { tf: 'El promedio de latencia es la mejor métrica para un requisito de rendimiento.', v: false, e: 'Se usan percentiles como p95 y p99.', l: 1 },
    { tf: 'Una prueba de estrés busca deliberadamente el punto donde el sistema deja de funcionar.', v: true, e: 'Para conocer el límite y el modo de falla.', l: 1 },
    { c: 'Escribe «enCurso(tasa, tiempo)»: número medio de peticiones en el sistema según la ley de Little.', f: 'enCurso', p: ['tasa', 'tiempo'], t: [[[50, 0.2], 10], [[100, 0.05], 5], [[0, 3], 0]], sol: '  return tasa * tiempo;', l: 1 },
    { c: 'Escribe «respuestaMM1(servicioMs, utilizacion)»: tiempo medio de respuesta en ms de una cola M/M/1, redondeado al entero; si la utilización es 1 o más, devuelve Infinity.', f: 'respuestaMM1', p: ['servicioMs', 'utilizacion'], t: [[[50, 0.5], 100], [[50, 0.9], 500], [[50, 1], Infinity]], sol: '  if (utilizacion >= 1) return Infinity;\n  return Math.round(servicioMs / (1 - utilizacion));', l: 2 },
    { c: 'Escribe «cumpleUmbral(latencias, p95Max, errores, total, tasaMax)»: true si el percentil 95 (rango más cercano) de las latencias es menor que p95Max y errores/total es menor que tasaMax.', f: 'cumpleUmbral', p: ['latencias', 'p95Max', 'errores', 'total', 'tasaMax'], t: [[[[100, 200, 300, 400, 1500], 2000, 0, 1000, 0.001], true], [[[100, 200, 3000], 2000, 0, 10, 0.1], false], [[[100], 2000, 5, 1000, 0.001], false]], sol: '  const o = [...latencias].sort((a, b) => a - b);\n  const p95 = o[Math.ceil(0.95 * o.length) - 1];\n  return p95 < p95Max && errores / total < tasaMax;', l: 3 }
  ],
  gen: function (g) {
    var ti = [['Subir a la carga de hora punta y mantenerla 30 minutos', 'De carga'], ['Subir hasta que el sistema falle', 'De estrés'], ['Pasar de 10 a 1000 usuarios en 5 segundos', 'De picos'], ['Mantener carga normal durante 24 horas', 'De resistencia'], ['Repetir con 1, 2 y 4 servidores', 'De escalabilidad'], ['Subir en escalones hasta que deje de cumplir los requisitos', 'De capacidad']];
    ti.forEach(function (t) { g.mcq(2, '¿Qué tipo de prueba de rendimiento es? ' + t[0], t[1], ['De carga', 'De estrés', 'De picos', 'De resistencia', 'De escalabilidad', 'De capacidad'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Tipos de pruebas de rendimiento.'); });
    g.times(6, function (R) { var l = R.pick([10, 20, 50, 100, 200]), w = R.pick([0.1, 0.2, 0.5, 1]); g.input(3, 'Llegan ' + l + ' peticiones por segundo y cada una pasa ' + w + ' s en el sistema. ¿Cuántas hay en curso en promedio?', String(Math.round(l * w * 100) / 100), 'Ley de Little: L = λ · W.'); });
    g.times(6, function (R) { var s = R.pick([10, 20, 50, 100]), u = R.pick([0.5, 0.75, 0.8, 0.9, 0.95]); g.input(4, 'Una cola M/M/1 tiene tiempo de servicio de ' + s + ' ms y utilización de ' + Math.round(u * 100) + ' %. ¿Cuál es el tiempo medio de respuesta en ms? (redondea al entero)', Math.round(s / (1 - u)), 'W = S / (1 − U).'); });
  },
  checks: [
    ['Diferencia las pruebas de carga, estrés, picos y resistencia.', 'Carga: con la carga esperada; estrés: más allá hasta romper; picos: saltos bruscos; resistencia: carga normal por mucho tiempo.'],
    ['Explica la ley de Little y úsala con un ejemplo.', 'L = λ · W; con 40 peticiones por segundo y 0,5 s por petición hay 20 en curso en promedio.'],
    ['¿Por qué la latencia explota cerca del 100 % de utilización?', 'Porque en una cola el tiempo de respuesta es proporcional a 1/(1 − U), que crece sin límite cuando U se acerca a 1.'],
    ['¿Qué es la omisión coordinada y cómo se evita?', 'Un sesgo de medición en que el generador reduce la carga al ponerse lento el sistema; se evita con un modelo de carga abierto.']
  ],
  cites: ['Little, J. D. C. (1961). A Proof for the Queuing Formula: L = λW. *Operations Research*, 9(3).', 'Gregg, B. (2020). *Systems Performance: Enterprise and the Cloud* (2.ª ed.). Addison-Wesley.', 'Gregg, B. (2016). The Flame Graph. *Communications of the ACM*, 59(6).', 'Gunther, N. (2007). *Guerrilla Capacity Planning*. Springer.', 'Molyneaux, I. (2014). *The Art of Application Performance Testing* (2.ª ed.). O’Reilly.', 'Schroeder, B., Wierman, A. y Harchol-Balter, M. (2006). Open Versus Closed: A Cautionary Tale. *NSDI 2006*.'],
  project: { t: 'Campaña de pruebas de rendimiento',
    goal: 'Medir, encontrar y corregir cuellos de botella de una API.',
    steps: ['Define un requisito de rendimiento medible para una API que tengas o construyas.', 'Escribe una prueba de carga con modelo abierto y datos de volumen realista.', 'Ejecuta pruebas de carga, estrés y resistencia, monitoreando CPU, memoria y base de datos.', 'Encuentra al menos dos cuellos de botella con perfilado o trazas, corrígelos y vuelve a medir.', 'Agrega una prueba corta con umbrales a la integración continua.'],
    deliver: 'Los escenarios, los resultados antes y después, los gráficos de perfilado y la configuración del pipeline.' },
  hito: ['Escribe la prueba de carga de la hora punta de PatioApp con modelo abierto y umbrales según los requisitos de calidad.', 'Ejecuta en PatioApp una prueba de resistencia de 8 horas y una de resiliencia con la pasarela lenta, y documenta las correcciones.']
});
SDC.after('m14.perf', 'm14.techniques');

S('m14', 'm14.static', { title: 'Revisiones, inspecciones y análisis estático',
  ask: '¿Qué técnica de verificación estática se aplica?',
  lesson: `
> **La idea en simple.** Un editor encuentra errores en un libro sin necesidad de imprimirlo ni venderlo: solo leyéndolo con atención. Del mismo modo, muchos defectos del software se pueden encontrar **sin ejecutarlo**: leyendo el código otra persona, o dejando que una herramienta lo analice. Esto es la verificación estática, y es de las formas más baratas de encontrar errores.

## Verificación estática y dinámica
- **Dinámica:** ejecutar el software y observar su comportamiento (todas las pruebas que has visto).
- **Estática:** examinar el código, los modelos o los documentos **sin ejecutarlos**, mediante personas (revisiones) o herramientas (análisis estático).
Son complementarias: las revisiones encuentran problemas que las pruebas no ven (código confuso, requisitos mal entendidos, incumplimiento de estándares, código que funciona por casualidad), y pueden aplicarse a artefactos que no se ejecutan, como requisitos y diseños.

## Inspecciones formales
Michael Fagan, en IBM, formalizó en 1976 las **inspecciones de diseño y código**, el método de revisión más riguroso:
- **Roles:** un **moderador** (organiza y facilita), el **autor**, un **lector** (presenta el material, parafraseándolo) y los **inspectores**; a veces un **escriba**.
- **Etapas:** planificación, reunión de presentación, **preparación individual** (cada inspector lee el material con una lista de verificación), **reunión de inspección** (se registran los defectos, no se discuten soluciones), **corrección** por el autor y **seguimiento** por el moderador.
- **Métricas:** defectos por página o por cada mil líneas, tiempo de preparación, ritmo de inspección.
Los resultados fueron notables: Fagan y estudios posteriores reportaron que las inspecciones encontraban entre el 60 % y el 90 % de los defectos antes de las pruebas. Un hallazgo empírico importante es el **ritmo**: inspeccionar más de unas 200 a 400 líneas por hora reduce drásticamente la cantidad de defectos encontrados. Estudios posteriores (Votta, 1993) mostraron que la **preparación individual** encuentra la mayoría de los defectos y que la reunión aporta menos de lo que se creía.

## Otras formas de revisión
De la más formal a la más ligera:
- **Revisión técnica:** pares técnicos evalúan un artefacto contra especificaciones y estándares.
- **Recorrido** (*walkthrough*): el autor guía a los participantes por el material, explicándolo; útil para compartir conocimiento.
- **Programación en pareja:** revisión continua mientras se escribe el código.
- **Revisión de código moderna:** revisión asíncrona de cada cambio antes de integrarlo, mediante herramientas como los *pull requests* de GitHub o Gerrit.
La IEEE 1028 describe formalmente los tipos de revisiones de software.

## La revisión de código moderna
Alberto Bacchelli y Christian Bird estudiaron en 2013 la revisión de código en Microsoft y encontraron que, aunque los desarrolladores dicen que su objetivo principal es **encontrar defectos**, en la práctica la mayoría de los comentarios tratan de **legibilidad, mantenibilidad y alternativas de diseño**, y que un beneficio central es la **transferencia de conocimiento**: más personas conocen cada parte del código. Google, en un estudio de 2018 (Sadowski y otros), reportó que su revisión de código está centrada en la legibilidad y la educación, con cambios pequeños y tiempos de respuesta cortos (la mediana de espera por la revisión era de menos de 4 horas).

Buenas prácticas respaldadas por la experiencia de la industria:
- **Cambios pequeños:** un estudio de SmartBear con Cisco encontró que la eficacia cae mucho por encima de unas 400 líneas por revisión; los cambios grandes reciben revisiones superficiales ("se ve bien").
- **Responder rápido:** una revisión que espera días bloquea al autor y desincentiva los cambios pequeños.
- **Automatizar lo automatizable:** el formato, el estilo y los errores detectables por herramientas no deben consumir la atención humana.
- **Una descripción clara** del cambio: qué, por qué y cómo probarlo.
- **Comentarios sobre el código, no sobre la persona**, distinguiendo lo obligatorio de lo opcional ("sugerencia:", "pregunta:", "bloqueante:").
- **Listas de verificación** con los errores frecuentes del equipo (manejo de errores, validación de entradas, consultas sin índice, datos personales en los registros).

## Análisis estático automatizado
Las herramientas de **análisis estático** examinan el código fuente o compilado y reportan posibles defectos sin ejecutarlo. En orden creciente de profundidad:
- **Linters y verificadores de estilo** (ESLint, Pylint, Checkstyle): convenciones, patrones peligrosos, variables sin usar. El nombre viene de **lint**, la herramienta de Stephen Johnson de los Laboratorios Bell (1978) que buscaba construcciones sospechosas en C.
- **Verificadores de tipos:** TypeScript, mypy para Python o el propio compilador en lenguajes con tipos estáticos detectan una clase entera de errores (llamar a una función con argumentos de otro tipo, acceder a una propiedad que no existe). Un estudio de Gao, Bird y Barr (2017) estimó que agregar tipos estáticos (TypeScript o Flow) a proyectos de JavaScript habría detectado alrededor del 15 % de los defectos públicos analizados.
- **Analizadores de defectos:** buscan errores como desreferencias de nulos, fugas de recursos, condiciones de carrera o divisiones por cero, mediante análisis de flujo de datos y de control. Ejemplos: SpotBugs, el analizador de Clang, **Infer** (Facebook, 2015, basado en lógica de separación), SonarQube como plataforma integradora.
- **Análisis de seguridad** (SAST): buscan vulnerabilidades como inyección SQL o secuencias de comandos entre sitios siguiendo el flujo de datos desde entradas no confiables (*taint analysis*). Ejemplos: CodeQL (GitHub), Semgrep.
- **Métricas:** complejidad ciclomática, duplicación, acoplamiento.

## Falsos positivos y adopción
El gran enemigo del análisis estático son los **falsos positivos**: advertencias sobre problemas que no existen. Si una herramienta reporta 2000 advertencias y la mayoría son ruido, los desarrolladores dejan de mirarla. Las experiencias publicadas de Google (Sadowski y otros, *Lessons from Building Static Analysis Tools at Google*, 2018) y de Coverity (Bessey y otros, *A Few Billion Lines of Code Later*, 2010) coinciden en las lecciones:
- Mostrar los resultados **en el flujo de trabajo**, como comentarios en la revisión de código del cambio, no en un informe aparte.
- Reportar solo problemas **en el código nuevo o modificado**, para no abrumar con la deuda heredada.
- Mantener la tasa de falsos positivos **muy baja** (Google apuntaba a menos del 10 % en lo que mostraba) y permitir a los desarrolladores marcar falsos positivos para mejorar las reglas.
- Que cada advertencia sea **accionable**, con una explicación y, si es posible, una corrección sugerida.

## Ejecución simbólica y verificación
Más allá del análisis estático habitual están las técnicas que razonan sobre **todos** los caminos posibles: la **ejecución simbólica** (James King, 1976) ejecuta el programa con valores simbólicos en lugar de concretos y usa resolvedores de restricciones para encontrar entradas que llevan a un error; herramientas como KLEE (2008) encontraron así errores en utilidades de Unix usadas durante décadas. Y la **verificación formal**, que demuestra matemáticamente que el código cumple su especificación, que verás en Métodos formales.
~~~js
// Un mini linter: detectar comparaciones con == (en lugar de ===) y variables declaradas con var
function lint(codigo) {
  const avisos = [];
  codigo.split('\n').forEach((linea, i) => {
    if (/[^=!]==[^=]/.test(linea)) avisos.push((i + 1) + ': usa === en lugar de ==');
    if (/\bvar\s/.test(linea)) avisos.push((i + 1) + ': usa let o const en lugar de var');
  });
  return avisos;
}
console.log(lint('var x = 1;\nif (x == "1") {\n  const y = x === 1;\n}').join('\n'));
~~~

## Ejemplo resuelto: verificación estática en PatioApp
1. **En el editor y antes de cada commit:** ESLint con reglas acordadas, Prettier para el formato y TypeScript en modo estricto.
2. **En cada pull request:** CodeQL y Semgrep con reglas de seguridad; los hallazgos aparecen como comentarios en las líneas modificadas. Una regla propia detecta registros que imprimen el teléfono o el DNI de los dueños (datos personales en los registros).
3. **Revisión humana:** cambios de menos de 300 líneas, al menos un revisor, respuesta en el mismo día, y una lista de verificación con los errores frecuentes del equipo (zona horaria en fechas, consultas sin índice, falta de idempotencia en los consumidores de eventos).
4. **Inspección formal** solo para el motor de tarifas y la emisión de comprobantes, por su impacto económico y legal: dos inspectores con lista de verificación, ritmo de 200 líneas por hora.
5. **Medición:** porcentaje de defectos encontrados en revisión respecto del total, y tiempo de espera de las revisiones.`,
  links: [['m7.team', 'la revisión de código se hace con pull requests en Git'], ['m11.spec', 'las inspecciones también se aplican a los requisitos'], ['for.verif', 'la verificación formal demuestra propiedades sin ejecutar']],
  read: 'Fagan (1976); Bacchelli y Bird (2013); Sadowski y otros, *Lessons from Building Static Analysis Tools at Google* (2018); Wiegers, *Peer Reviews in Software* (2001).',
  terms: [
    ['Verificación estática', 'examen de código, modelos o documentos sin ejecutarlos', ['Revisiones humanas.', 'Análisis estático automatizado.', 'Se aplica también a requisitos.']],
    ['Inspección de Fagan', 'revisión formal con roles, preparación individual, reunión de registro y seguimiento', ['IBM, 1976.', 'Moderador, autor, lector, inspectores.', 'Encuentra la mayoría de los defectos antes de probar.']],
    ['Recorrido', 'revisión en que el autor guía a los participantes por el material', ['Walkthrough.', 'Comparte conocimiento.', 'Menos formal que la inspección.']],
    ['Revisión de código moderna', 'revisión asíncrona de cada cambio con herramientas antes de integrarlo', ['Pull requests.', 'Transfiere conocimiento.', 'Bacchelli y Bird, 2013.']],
    ['Linter', 'herramienta que señala construcciones sospechosas o fuera de estilo en el código', ['ESLint.', 'Viene de lint, 1978.', 'Corre en el editor.']],
    ['Análisis de contaminación', 'análisis que sigue datos no confiables desde su entrada hasta operaciones peligrosas', ['Taint analysis.', 'Detecta inyección SQL.', 'Base de las herramientas SAST.']],
    ['Falso positivo', 'advertencia sobre un problema que en realidad no existe', ['Enemigo de la adopción.', 'Google apuntaba a menos del 10 %.', 'Hace que se ignore la herramienta.']],
    ['Ejecución simbólica', 'técnica que ejecuta el programa con valores simbólicos para explorar todos sus caminos', ['King, 1976.', 'KLEE, 2008.', 'Usa resolvedores de restricciones.']]
  ],
  q: [
    ['¿Qué tiene de especial la verificación estática frente a las pruebas?', 'Encuentra defectos sin ejecutar el software y se aplica también a requisitos y diseños', ['Siempre es automática', 'Reemplaza todas las pruebas', 'Solo sirve para el estilo'], 'Revisiones y análisis estático.', 2],
    ['En una inspección de Fagan, ¿qué se hace en la reunión de inspección?', 'Registrar los defectos, sin discutir soluciones', ['Reescribir el código entre todos', 'Decidir el presupuesto', 'Desplegar a producción'], 'Las soluciones las hace el autor después.', 3],
    ['Según Bacchelli y Bird, ¿de qué tratan la mayoría de los comentarios de revisión?', 'Legibilidad, mantenibilidad y alternativas de diseño', ['Defectos graves', 'Ortografía', 'Rendimiento'], 'Y transfieren conocimiento.', 3],
    ['¿Por qué conviene revisar cambios pequeños?', 'Porque la eficacia de la revisión cae mucho en cambios grandes', ['Porque los grandes no compilan', 'Porque es obligatorio en Git', 'No importa el tamaño'], 'Más de ~400 líneas reciben revisiones superficiales.', 2],
    ['¿Qué técnica sigue datos desde una entrada no confiable hasta una consulta SQL?', 'El análisis de contaminación', ['El linter de estilo', 'La prueba de humo', 'El gráfico de llama'], 'Taint analysis.', 3],
    ['¿Cuál es la lección principal de Google y Coverity para que se adopte el análisis estático?', 'Mostrar pocos falsos positivos, en el flujo de trabajo y sobre el código modificado', ['Mostrar todas las advertencias posibles en un informe mensual', 'Prohibir los commits', 'Usar muchas herramientas a la vez'], 'Si hay ruido, se ignora.', 4],
    ['Según Votta (1993), ¿dónde se encuentran la mayoría de los defectos en una inspección?', 'En la preparación individual', ['En la reunión', 'En el seguimiento', 'En el despliegue'], 'La reunión aporta menos de lo que se creía.', 4],
    { tf: 'Un verificador de tipos como TypeScript es una forma de análisis estático.', v: true, e: 'Detecta errores sin ejecutar el código.', l: 1 },
    { tf: 'Inspeccionar código muy rápido, a más de mil líneas por hora, mejora la cantidad de defectos encontrados.', v: false, e: 'Por encima de unas 200 a 400 líneas por hora la eficacia cae.', l: 2 },
    { c: 'Escribe «avisosIgualdad(codigo)»: devuelve los números de línea (desde 1) que contienen == que no forma parte de === ni !=.', f: 'avisosIgualdad', p: ['codigo'], t: [[['a == b\nc === d\ne != f'], [1]], [['ok'], []]], sol: '  return codigo.split("\\n").map((l, i) => /(^|[^=!])==($|[^=])/.test(l) ? i + 1 : 0).filter(Boolean);', l: 3 },
    { c: 'Escribe «tasaFalsosPositivos(avisos)»: avisos es una lista de {real: true/false}; devuelve el porcentaje entero de avisos que no eran reales.', f: 'tasaFalsosPositivos', p: ['avisos'], t: [[[[{ real: true }, { real: false }, { real: true }, { real: true }]], 25], [[[]], 0]], sol: '  if (!avisos.length) return 0;\n  return Math.round(100 * avisos.filter(a => !a.real).length / avisos.length);', l: 2 },
    { c: 'Escribe «ritmo(lineas, minutos)»: líneas inspeccionadas por hora, redondeadas al entero.', f: 'ritmo', p: ['lineas', 'minutos'], t: [[[300, 90], 200], [[1000, 30], 2000]], sol: '  return Math.round(lineas / (minutos / 60));', l: 1 }
  ],
  gen: function (g) {
    var rv = [['Roles definidos, preparación individual, reunión de registro y seguimiento', 'Inspección'], ['El autor guía a los participantes por su diseño', 'Recorrido'], ['Dos personas escriben el código juntas en una computadora', 'Programación en pareja'], ['Un compañero comenta el pull request antes de integrarlo', 'Revisión de código moderna'], ['Pares técnicos evalúan el diseño contra los estándares', 'Revisión técnica']];
    rv.forEach(function (r) { g.mcq(2, '¿Qué tipo de revisión es? ' + r[0], r[1], ['Inspección', 'Recorrido', 'Programación en pareja', 'Revisión de código moderna', 'Revisión técnica'].filter(function (x) { return x !== r[1]; }).slice(0, 3), 'De la más formal a la más ligera.'); });
    var he = [['Señala variables sin usar y el uso de var', 'Linter'], ['Detecta que se llama a una función con un número en lugar de un texto', 'Verificador de tipos'], ['Encuentra una posible desreferencia de nulo en un camino poco común', 'Analizador de defectos'], ['Sigue una entrada del usuario hasta una consulta SQL sin parámetros', 'Análisis de seguridad (SAST)'], ['Mide la complejidad ciclomática de cada función', 'Métricas de código']];
    he.forEach(function (h) { g.mcq(2, '¿Qué tipo de herramienta estática hace esto? ' + h[0], h[1], ['Linter', 'Verificador de tipos', 'Analizador de defectos', 'Análisis de seguridad (SAST)', 'Métricas de código'].filter(function (x) { return x !== h[1]; }).slice(0, 3), 'Niveles de análisis estático.'); });
    g.times(6, function (R) { var l = R.int(100, 900), m = R.pick([30, 60, 90, 120]); g.input(3, 'Se inspeccionaron ' + l + ' líneas en ' + m + ' minutos. ¿A qué ritmo en líneas por hora? (redondea al entero)', Math.round(l / (m / 60)), 'Líneas ÷ horas.'); });
  },
  checks: [
    ['¿Qué ventajas tiene la verificación estática sobre la dinámica?', 'Encuentra defectos sin ejecutar, temprano y barato, en artefactos que no se ejecutan, y problemas que las pruebas no ven, como código confuso.'],
    ['Describe los roles y etapas de una inspección de Fagan.', 'Moderador, autor, lector e inspectores; planificación, presentación, preparación individual, reunión de registro, corrección y seguimiento.'],
    ['¿Qué buenas prácticas hacen eficaz la revisión de código moderna?', 'Cambios pequeños, respuesta rápida, automatizar el estilo, buena descripción, comentarios sobre el código y listas de verificación.'],
    ['¿Por qué fracasan muchas adopciones de análisis estático y cómo se evita?', 'Por el exceso de falsos positivos y por reportar fuera del flujo; se evita mostrando pocos avisos accionables en la revisión del código nuevo.']
  ],
  cites: ['Fagan, M. (1976). Design and Code Inspections to Reduce Errors in Program Development. *IBM Systems Journal*, 15(3).', 'Bacchelli, A. y Bird, C. (2013). Expectations, Outcomes, and Challenges of Modern Code Review. *ICSE 2013*.', 'Sadowski, C. et al. (2018). Modern Code Review: A Case Study at Google. *ICSE-SEIP 2018*.', 'Sadowski, C. et al. (2018). Lessons from Building Static Analysis Tools at Google. *Communications of the ACM*, 61(4).', 'Bessey, A. et al. (2010). A Few Billion Lines of Code Later. *Communications of the ACM*, 53(2).', 'Gao, Z., Bird, C. y Barr, E. (2017). To Type or Not to Type: Quantifying Detectable Bugs in JavaScript. *ICSE 2017*.'],
  project: { t: 'Programa de verificación estática',
    goal: 'Implantar revisiones y análisis estático en un proyecto real y medir su efecto.',
    steps: ['Configura un linter, un verificador de tipos y una herramienta SAST en un proyecto propio.', 'Clasifica las primeras 50 advertencias en reales y falsos positivos, y ajusta las reglas.', 'Escribe la lista de verificación de revisión de código con los errores frecuentes del proyecto.', 'Realiza una inspección formal de un módulo crítico con al menos dos compañeros y registra los defectos y el ritmo.', 'Compara cuántos defectos encontró cada técnica y cuánto tiempo costó.'],
    deliver: 'La configuración, la clasificación de advertencias, la lista de verificación y el informe comparativo.' },
  hito: ['Configura en PatioApp el análisis estático en cada pull request, con una regla propia que detecte datos personales en los registros.', 'Realiza una inspección formal del motor de tarifas de PatioApp y registra los defectos encontrados y el ritmo.']
});
SDC.after('m14.static', 'm14.perf');

S('m14', 'm14.mgmt', { title: 'Gestión de pruebas y de defectos',
  ask: '¿Qué concepto de gestión de pruebas o de defectos se aplica?',
  lesson: `
> **La idea en simple.** Nunca hay tiempo para probarlo todo: las combinaciones posibles de un programa real son astronómicas. La gestión de pruebas consiste en decidir con criterio **qué probar, cuánto y cuándo**, en función del riesgo; y la gestión de defectos, en asegurarse de que cada problema encontrado se registre bien, se priorice con sensatez y no se pierda en el camino.

## Estrategia y plan de pruebas
- La **estrategia de pruebas** define el enfoque general de una organización o producto: qué niveles y tipos de prueba se usan, qué se automatiza, con qué herramientas, quién prueba qué y con qué criterios de calidad. Cambia poco.
- El **plan de pruebas** aplica la estrategia a un proyecto o versión concreta: alcance (qué entra y qué no), enfoque, recursos, calendario, entornos, riesgos y **criterios de entrada y salida** (cuándo se puede empezar a probar y cuándo se considera que se probó lo suficiente).
La norma **ISO/IEC/IEEE 29119** (2013, revisada desde 2021) define procesos, documentación y técnicas de prueba, y es la referencia internacional; reemplazó a la antigua IEEE 829 de documentación de pruebas. En equipos ágiles, el plan suele reducirse a una página con la estrategia, los riesgos y la definición de terminado.

## Pruebas basadas en el riesgo
Como no se puede probar todo, se prueba **más** lo que tiene más **riesgo**: la combinación de la **probabilidad** de que algo falle y el **impacto** si falla.
- **Probabilidad** alta: código nuevo o muy cambiado, lógica compleja, tecnología desconocida, equipo nuevo, módulos con historial de defectos.
- **Impacto** alto: dinero (cobros, tarifas), obligaciones legales (comprobantes, datos personales), seguridad de las personas, funcionalidades que usan todos los usuarios, reputación.
Se construye una matriz y se decide la profundidad de las pruebas: los elementos de riesgo alto reciben técnicas más rigurosas (valores límite, inspecciones, pruebas de mutación), los de riesgo bajo, pruebas básicas o exploratorias breves. Los riesgos también ordenan la ejecución: lo más riesgoso se prueba primero, para que si el tiempo se acaba, lo que quedó sin probar sea lo menos importante.
~~~js
// Priorizar áreas de prueba por riesgo = probabilidad × impacto (escalas de 1 a 5)
const areas = [
  { area: 'Cálculo de tarifas con convenios', prob: 4, impacto: 5 },
  { area: 'Emisión de comprobantes', prob: 3, impacto: 5 },
  { area: 'Sincronización sin conexión', prob: 5, impacto: 4 },
  { area: 'Cambio de tema claro/oscuro', prob: 2, impacto: 1 },
  { area: 'Reporte semanal de ocupación', prob: 3, impacto: 2 }
];
areas.map(a => ({ ...a, riesgo: a.prob * a.impacto }))
     .sort((a, b) => b.riesgo - a.riesgo)
     .forEach(a => console.log(String(a.riesgo).padStart(2), a.riesgo >= 15 ? 'ALTO ' : a.riesgo >= 8 ? 'MEDIO' : 'BAJO ', a.area));
~~~

## ¿Cuándo dejar de probar?
Es una de las preguntas más difíciles. Criterios de salida habituales:
- Todas las pruebas de los requisitos de riesgo alto ejecutadas y aprobadas.
- Ningún defecto crítico o grave abierto; los menores, revisados y aceptados por el negocio.
- Cobertura de requisitos completa y cobertura de código por encima de un umbral en los módulos críticos.
- La **tasa de descubrimiento de defectos** bajando de forma sostenida: si cada día de pruebas se encuentran menos defectos nuevos, el producto se estabiliza.
Hay modelos estadísticos que estiman los defectos que quedan. El más intuitivo es el de **captura y recaptura**, tomado de la ecología (para estimar cuántos peces hay en un lago): si dos revisores independientes encuentran A y B defectos, con C en común, el total estimado es A × B / C. Si un revisor encuentra 20, otro 15 y coinciden en 10, se estiman unos 30 defectos, es decir, quedan unos 5 sin encontrar. Los **modelos de crecimiento de la fiabilidad** (como los de Goel y Okumoto, 1979) ajustan una curva al ritmo de fallas observadas durante las pruebas para predecir las futuras.

## El ciclo de vida de un defecto
Un defecto registrado pasa por estados como: **nuevo → asignado → en corrección → corregido → verificado → cerrado**, con salidas a **rechazado** (no es un defecto), **duplicado**, **no reproducible** o **diferido** (se corregirá en otra versión). Que el estado "corregido" no sea el final es importante: alguien distinto de quien lo corrigió debe **verificar** la corrección, idealmente con una prueba automatizada que reproduzca el defecto y que quede en la suite de regresión para siempre.

## Un buen reporte de defecto
Un reporte mal escrito hace perder horas. Un buen reporte tiene:
- **Título** específico: "La tarifa de convenio no aplica el descuento en estadías de más de 30 días", no "Error en tarifas".
- **Pasos para reproducir**, numerados y mínimos.
- **Resultado esperado** y **resultado obtenido**.
- **Entorno:** versión, dispositivo, sistema operativo, navegador, sede.
- **Evidencia:** capturas, registros, identificador de la traza.
- **Severidad** y, propuesta, **prioridad**.
Severidad y prioridad no son lo mismo:
- La **severidad** mide el **impacto técnico** del defecto en el sistema (crítico: el sistema se cae o pierde datos; grave: una función importante no sirve; menor; cosmético).
- La **prioridad** indica la **urgencia** de corregirlo según el negocio.
Pueden no coincidir: un error ortográfico en el nombre de la empresa en la pantalla de inicio es de severidad cosmética, pero prioridad alta; un fallo que solo ocurre en una impresora que ya nadie usa puede ser grave pero de prioridad baja.

## Análisis de defectos
Los defectos son datos valiosos para mejorar. Técnicas de análisis:
- **Clasificación ortogonal de defectos** (ODC), de Ram Chillarege en IBM (1992): clasificar cada defecto por tipo (asignación, verificación, algoritmo, interfaz, función…) y por el disparador que lo reveló, para descubrir en qué etapa del proceso se introducen y qué actividad los detecta.
- **Análisis de causa raíz** de los defectos importantes que llegaron a producción, sin buscar culpables.
- **Distribución:** se cumple con frecuencia un **principio de Pareto**: una pequeña parte de los módulos concentra la mayoría de los defectos (Fenton y Ohlsson lo observaron en 2000 en un sistema de telecomunicaciones: el 20 % de los módulos tenía cerca del 60 % de los defectos). Esos módulos merecen más pruebas y, muchas veces, una reescritura.
- **Defectos escapados:** cada defecto encontrado en producción es una pregunta para el proceso: ¿por qué no lo detectó ninguna prueba? La respuesta suele ser una prueba nueva y, a veces, una práctica nueva.

## Automatización: qué automatizar
No todo conviene automatizar. Conviene automatizar lo que se ejecuta **muchas veces** (regresión), lo **tedioso o propenso a error** humano (cálculos con muchos datos), lo que necesita **velocidad o volumen** (carga) y lo que es **estable**. No conviene automatizar lo que se ejecutará una sola vez, lo que cambia constantemente o lo que requiere juicio humano (usabilidad, exploración). Un antipatrón conocido es el **cono de helado** (la pirámide invertida): muchas pruebas manuales y E2E, pocas unitarias, con suites lentas y frágiles.

El costo de la automatización no está en escribir las pruebas, sino en **mantenerlas**. Una suite con muchas pruebas inestables pierde la confianza del equipo, que empieza a ignorar los fallos ("seguro es la prueba de siempre"), y entonces deja de proteger. La regla práctica: las pruebas inestables se ponen en **cuarentena** de inmediato (se sacan del bloqueo del pipeline pero siguen ejecutándose y reportándose) y se corrigen con prioridad.

## Pruebas en producción
Ninguna prueba previa reproduce exactamente producción. Por eso los equipos modernos también verifican **en producción**, de forma controlada:
- **Despliegues canario:** la versión nueva recibe primero un porcentaje pequeño del tráfico mientras se comparan sus métricas con la anterior.
- **Banderas de funcionalidad** (*feature flags*): la funcionalidad se activa primero para usuarios internos o un patio piloto.
- **Monitoreo sintético:** scripts que ejecutan recorridos críticos cada pocos minutos en producción y alertan si fallan.
- **Tráfico espejo:** copiar las peticiones reales a la versión nueva sin usar sus respuestas, para comparar.
Las verás en DevOps; desde la gestión de pruebas, son la última red de seguridad y una fuente de información sobre qué no detectaron las pruebas previas.

## Ejemplo resuelto: el plan de pruebas de la versión 2.0 de PatioApp
1. **Alcance:** tarifas de convenio, notificaciones a dueños y modo sin conexión mejorado; fuera de alcance: el portal web, que no cambia.
2. **Análisis de riesgo:** tarifas de convenio (riesgo 20), sincronización sin conexión (20), comprobantes (15), notificaciones (9), reportes (6).
3. **Profundidad:** tarifas con valores límite, pruebas de mutación e inspección formal; sincronización con pruebas de resiliencia y sesiones exploratorias; notificaciones con pruebas de contrato; reportes con pruebas básicas.
4. **Criterios de salida:** cero defectos críticos o graves abiertos; todas las pruebas de riesgo alto aprobadas; tasa de descubrimiento menor a 2 defectos por día durante 3 días; prueba de carga de hora punta aprobada.
5. **Durante las pruebas:** se registran 47 defectos; el 60 % está en el módulo de sincronización, que recibe una revisión de diseño adicional. Un defecto de severidad menor (el logo de la aseguradora pixelado en el comprobante) recibe prioridad alta por pedido del área comercial.
6. **Salida a producción** con despliegue canario en un patio durante una semana, monitoreo sintético del ingreso y la salida cada 5 minutos y bandera para desactivar las tarifas de convenio si algo falla.`,
  links: [['m12.risk', 'la gestión de riesgos del proyecto guía las pruebas basadas en riesgo'], ['m14.metrics', 'las métricas de defectos alimentan la mejora de la calidad'], ['m15.cicd', 'los despliegues canario y las banderas permiten probar en producción']],
  read: 'ISO/IEC/IEEE 29119; Black, *Managing the Testing Process* (3.ª ed., 2009); Chillarege y otros (1992); ISTQB, *Certified Tester Foundation Level Syllabus* (v4.0, 2023).',
  terms: [
    ['Plan de pruebas', 'documento que aplica la estrategia a un proyecto con alcance, enfoque, recursos, riesgos y criterios de entrada y salida', ['Alcance de la versión 2.0.', 'ISO/IEC/IEEE 29119.', 'En ágil cabe en una página.']],
    ['Pruebas basadas en el riesgo', 'enfoque que asigna más profundidad y prioridad a lo que tiene mayor probabilidad e impacto de fallar', ['Tarifas primero.', 'Riesgo = probabilidad × impacto.', 'Lo menos importante queda al final.']],
    ['Criterio de salida', 'condición que indica que se probó lo suficiente para entregar', ['Cero defectos críticos.', 'Tasa de descubrimiento baja.', 'Se acuerda antes de probar.']],
    ['Severidad', 'impacto técnico de un defecto sobre el sistema', ['Crítico: pierde datos.', 'Cosmético: un color.', 'No es lo mismo que prioridad.']],
    ['Prioridad', 'urgencia de corregir un defecto según el negocio', ['Logo pixelado: prioridad alta.', 'La decide el negocio.', 'Puede no coincidir con la severidad.']],
    ['Captura y recaptura', 'estimación de los defectos totales a partir de los encontrados por dos revisores independientes y sus coincidencias', ['Total ≈ A × B / C.', 'Tomada de la ecología.', 'Estima lo que falta encontrar.']],
    ['Clasificación ortogonal de defectos', 'método de clasificación de defectos por tipo y disparador para mejorar el proceso', ['Chillarege, IBM, 1992.', 'ODC.', 'Revela en qué etapa se originan.']],
    ['Cuarentena de pruebas', 'separar una prueba inestable del bloqueo del pipeline mientras se corrige', ['Sigue ejecutándose y reportando.', 'Protege la confianza en la suite.', 'Se corrige con prioridad.']]
  ],
  q: [
    ['Un error ortográfico en el nombre de la empresa en la pantalla de inicio, ¿qué severidad y prioridad suele tener?', 'Severidad cosmética, prioridad alta', ['Severidad crítica, prioridad baja', 'Severidad crítica, prioridad alta', 'Severidad cosmética, prioridad baja'], 'No afecta el funcionamiento, pero sí la imagen.', 3],
    ['¿Qué se prueba primero en un enfoque basado en riesgo?', 'Lo de mayor probabilidad e impacto de falla', ['Lo más fácil', 'Lo que se programó primero', 'Lo que tiene menos código'], 'Si se acaba el tiempo, lo sin probar es lo menos importante.', 2],
    ['Dos revisores encuentran 20 y 15 defectos y coinciden en 10. ¿Cuántos defectos se estiman en total?', '30', ['35', '25', '45'], '20 × 15 / 10.', 3],
    ['¿Por qué "corregido" no es el estado final de un defecto?', 'Porque alguien debe verificar la corrección, idealmente con una prueba automatizada', ['Porque nunca se cierra', 'Porque lo exige el compilador', 'Porque se debe reabrir siempre'], 'Verificado y luego cerrado.', 2],
    ['¿Qué antipatrón es el cono de helado?', 'Muchas pruebas manuales y extremo a extremo y pocas unitarias', ['Muchas pruebas unitarias', 'No tener pruebas', 'Pruebas solo de carga'], 'La pirámide invertida.', 2],
    ['¿Qué conviene hacer con una prueba inestable?', 'Ponerla en cuarentena y corregirla con prioridad', ['Ignorarla para siempre', 'Reintentarla hasta que pase sin investigar', 'Borrar todas las pruebas'], 'Las inestables destruyen la confianza en la suite.', 3],
    ['Fenton y Ohlsson observaron que una pequeña parte de los módulos concentra la mayoría de los defectos. ¿Qué implica?', 'Que esos módulos merecen más pruebas y quizás una reescritura', ['Que los demás no necesitan pruebas', 'Que hay que repartir las pruebas por igual', 'Nada'], 'Principio de Pareto.', 4],
    { tf: 'Todo lo que se puede automatizar conviene automatizarlo.', v: false, e: 'No conviene automatizar lo que se ejecuta una vez, cambia constantemente o requiere juicio humano.', l: 2 },
    { tf: 'Un buen reporte de defecto incluye resultado esperado, resultado obtenido y pasos para reproducir.', v: true, e: 'Además del entorno y la evidencia.', l: 1 },
    { o: 'Ordena el ciclo de vida típico de un defecto.', s: ['Nuevo', 'Asignado', 'En corrección', 'Corregido', 'Verificado', 'Cerrado'], e: 'La verificación la hace alguien distinto a quien corrigió.', l: 2 },
    { c: 'Escribe «capturaRecaptura(a, b, comunes)»: estimación del total de defectos, redondeada al entero; si comunes es 0, devuelve -1.', f: 'capturaRecaptura', p: ['a', 'b', 'comunes'], t: [[[20, 15, 10], 30], [[12, 8, 4], 24], [[5, 5, 0], -1]], sol: '  if (comunes === 0) return -1;\n  return Math.round(a * b / comunes);', l: 2 },
    { c: 'Escribe «ordenarPorRiesgo(areas)»: cada área es {area, prob, impacto}; devuelve los nombres ordenados por prob × impacto de mayor a menor (si empatan, en el orden original).', f: 'ordenarPorRiesgo', p: ['areas'], t: [[[[{ area: 'a', prob: 2, impacto: 2 }, { area: 'b', prob: 5, impacto: 4 }, { area: 'c', prob: 4, impacto: 5 }]], ['b', 'c', 'a']], [[[]], []]], sol: '  return areas.map((a, i) => [a.prob * a.impacto, i, a.area]).sort((x, y) => y[0] - x[0] || x[1] - y[1]).map(x => x[2]);', l: 3 },
    { c: 'Escribe «tendencia(porDia)»: porDia es la cantidad de defectos nuevos encontrados cada día; devuelve true si los últimos 3 días son todos menores que 2 (criterio de salida).', f: 'tendencia', p: ['porDia'], t: [[[[9, 6, 4, 1, 1, 0]], true], [[[5, 1, 3]], false], [[[1, 1]], false]], sol: '  if (porDia.length < 3) return false;\n  return porDia.slice(-3).every(x => x < 2);', l: 2 }
  ],
  gen: function (g) {
    g.times(8, function (R) { var c = R.int(3, 10), a = c + R.int(2, 15), b = c + R.int(2, 15); g.input(3, 'Dos revisores independientes encuentran ' + a + ' y ' + b + ' defectos, con ' + c + ' en común. Por captura y recaptura, ¿cuántos defectos se estiman en total? (redondea al entero)', Math.round(a * b / c), 'Total ≈ A × B / C.'); });
    var sp = [['El sistema pierde estadías al sincronizar', 'Severidad crítica'], ['Un color del encabezado no coincide con la marca', 'Severidad cosmética'], ['El reporte semanal no se puede exportar, pero hay otra forma de obtener los datos', 'Severidad menor'], ['No se puede registrar la salida de ninguna unidad', 'Severidad crítica'], ['Un texto de ayuda tiene una errata', 'Severidad cosmética']];
    sp.forEach(function (s) { g.mcq(2, '¿Qué severidad tiene este defecto? ' + s[0], s[1], ['Severidad crítica', 'Severidad grave', 'Severidad menor', 'Severidad cosmética'].filter(function (x) { return x !== s[1]; }), 'La severidad mide el impacto técnico.'); });
    var au = [['La regresión del cálculo de tarifas que se ejecuta en cada commit', 'Automatizar'], ['Evaluar si la nueva pantalla es agradable para los operadores', 'No automatizar'], ['Una verificación que se hará una sola vez en una migración', 'No automatizar'], ['Probar 10 000 combinaciones de tarifas y convenios', 'Automatizar'], ['Una pantalla en prototipo que cambia cada día', 'No automatizar']];
    au.forEach(function (a) { g.mcq(2, '¿Conviene automatizar esta prueba? ' + a[0], a[1], ['Automatizar', 'No automatizar', 'Depende del lenguaje'].concat(['Solo en producción']).filter(function (x) { return x !== a[1]; }), 'Se automatiza lo repetido, tedioso y estable.'); });
  },
  checks: [
    ['Diferencia estrategia y plan de pruebas.', 'La estrategia es el enfoque general y estable de la organización; el plan lo aplica a un proyecto con alcance, recursos, calendario, riesgos y criterios.'],
    ['¿Cómo se hacen pruebas basadas en el riesgo?', 'Se estima probabilidad e impacto de cada área, se calcula el riesgo y se asigna más profundidad y prioridad a lo más riesgoso.'],
    ['Explica la diferencia entre severidad y prioridad con un ejemplo de cada combinación.', 'Severidad es impacto técnico; prioridad, urgencia para el negocio. Ejemplo: errata en el logo (cosmética, alta); fallo en impresora obsoleta (grave, baja).'],
    ['¿Qué criterios usarías para decidir que se probó lo suficiente?', 'Pruebas de riesgo alto aprobadas, ningún defecto grave abierto, cobertura de requisitos completa y tasa de descubrimiento de defectos en descenso sostenido.']
  ],
  cites: ['ISO/IEC/IEEE 29119-1:2022. *Software and systems engineering — Software testing — Part 1: General concepts*.', 'Chillarege, R. et al. (1992). Orthogonal Defect Classification. *IEEE Transactions on Software Engineering*, 18(11).', 'Fenton, N. y Ohlsson, N. (2000). Quantitative Analysis of Faults and Failures in a Complex Software System. *IEEE Transactions on Software Engineering*, 26(8).', 'Goel, A. y Okumoto, K. (1979). Time-Dependent Error-Detection Rate Model for Software Reliability. *IEEE Transactions on Reliability*, R-28(3).', 'Black, R. (2009). *Managing the Testing Process* (3.ª ed.). Wiley.', 'ISTQB (2023). *Certified Tester Foundation Level Syllabus v4.0*.'],
  project: { t: 'Plan de pruebas basado en riesgo',
    goal: 'Planificar, ejecutar y cerrar las pruebas de una versión con criterio.',
    steps: ['Elige una aplicación y lista sus áreas funcionales con probabilidad e impacto de falla.', 'Escribe un plan de pruebas de una página con alcance, profundidad por riesgo y criterios de salida.', 'Ejecuta las pruebas y registra los defectos con reportes completos, severidad y prioridad.', 'Haz que dos compañeros revisen independientemente el mismo módulo y estima los defectos restantes con captura y recaptura.', 'Analiza la distribución de defectos por módulo y por tipo, y propón mejoras al proceso.'],
    deliver: 'El plan, el registro de defectos, la estimación y el análisis.' },
  hito: ['Escribe el plan de pruebas basado en riesgo de la versión 2.0 de PatioApp con sus criterios de salida.', 'Analiza los defectos de PatioApp por módulo y por origen, y define la cuarentena de pruebas inestables en el pipeline.']
});
SDC.after('m14.mgmt', 'm14.metrics');
})();
