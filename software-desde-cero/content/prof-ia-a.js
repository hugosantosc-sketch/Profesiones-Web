(function () {
var D = SDC.D;
SDC.XM('ia', { prof: true });

D('ia.search', `## Búsqueda local y optimización
No todos los problemas necesitan el **camino** a la solución: a veces solo importa encontrar una **buena configuración**. Asignar 200 unidades a los espacios del patio minimizando los movimientos de grúa, armar los turnos de los operadores respetando descansos y preferencias, o elegir el recorrido de una grúa por varias sedes son problemas de **optimización combinatoria**, donde el número de combinaciones es astronómico. Los algoritmos de **búsqueda local** parten de una solución cualquiera y la mejoran con cambios pequeños:
- **Ascenso de colinas** (*hill climbing*): moverse siempre a la solución vecina mejor. Rápido, pero se queda atascado en **óptimos locales** (una colina que no es la más alta).
- **Recocido simulado** (*simulated annealing*, Scott Kirkpatrick y otros, 1983): como el ascenso, pero acepta a veces un empeoramiento, con una probabilidad que disminuye con el tiempo ("la temperatura baja"), lo que permite escapar de los óptimos locales. Se inspira en cómo se enfría un metal para que sus átomos encuentren una estructura estable.
- **Algoritmos genéticos** (John Holland, 1975): mantienen una población de soluciones que se combinan y mutan, conservando las mejores, como la selección natural.
- **Búsqueda tabú** (Fred Glover, 1986): recuerda las soluciones recientes para no volver a ellas.
Ninguno garantiza el óptimo, pero encuentran soluciones muy buenas en tiempos razonables para problemas NP-difíciles, como viste en teoría de la computación.
~~~js
// Recocido simulado para ordenar visitas de una grúa (problema del viajante, pequeño)
function recorrido(orden, d) { let s = 0; for (let i = 0; i < orden.length - 1; i++) s += d[orden[i]][orden[i + 1]]; return s; }
function recocido(d, iteraciones = 20000) {
  let actual = [...d.keys()], mejor = [...actual], t = 100;
  for (let k = 0; k < iteraciones; k++, t *= 0.9995) {
    const i = 1 + Math.floor(Math.random() * (actual.length - 1)), j = 1 + Math.floor(Math.random() * (actual.length - 1));
    const vecino = [...actual]; [vecino[i], vecino[j]] = [vecino[j], vecino[i]];
    const delta = recorrido(vecino, d) - recorrido(actual, d);
    if (delta < 0 || Math.random() < Math.exp(-delta / t)) actual = vecino;
    if (recorrido(actual, d) < recorrido(mejor, d)) mejor = [...actual];
  }
  return { orden: mejor, distancia: recorrido(mejor, d) };
}
~~~

## Programación lineal y solucionadores
Muchos problemas de asignación y planificación se expresan como **programación lineal entera**: maximizar o minimizar una función lineal sujeta a restricciones lineales, con variables enteras. Existen **solucionadores** maduros (el libre HiGHS, o Google OR-Tools, que incluye también un solucionador de restricciones) que resuelven en segundos problemas con miles de variables. Para un ingeniero, la habilidad clave no es programar el algoritmo, sino **modelar** el problema: identificar las variables, el objetivo y las restricciones, y dejar que el solucionador haga el resto.`);

D('ia.ml', `## Preparar los datos: donde se gana o se pierde
La mayor parte del trabajo en un proyecto de aprendizaje automático no es elegir el modelo, sino preparar los datos. Los pasos típicos:
- **Limpieza:** valores faltantes (eliminar, rellenar con la mediana o marcar como "desconocido"), duplicados, valores imposibles.
- **Ingeniería de características:** transformar los datos crudos en variables que el modelo pueda aprovechar. De una fecha de ingreso se extraen el día de la semana, la hora, si es feriado o quincena; de un historial, el número de estadías del cliente en los últimos 90 días. Un buen conjunto de características suele importar más que el algoritmo.
- **Codificar categorías:** convertir "Callao", "Ate", "Lurín" en números sin inventar un orden falso (codificación **one-hot**: una columna por categoría con 0 o 1).
- **Escalar** las variables numéricas para que tengan rangos comparables, lo que necesitan algoritmos como k vecinos más cercanos o la regresión logística regularizada.
- **Desbalance de clases:** si solo el 3 % de los clientes abandona, un modelo que siempre dice "no abandona" acierta el 97 % y no sirve para nada. Se usan métricas adecuadas (precisión, exhaustividad, área bajo la curva), se ajusta el umbral de decisión y, a veces, se rebalancea el entrenamiento.
Todo esto debe aprenderse **solo** con los datos de entrenamiento y luego aplicarse a los de validación y prueba; calcular la media para rellenar faltantes con todos los datos es una forma sutil de **fuga de información**.

## Validación cruzada
Con pocos datos, separar un 20 % fijo para validar desperdicia información y da una estimación ruidosa. La **validación cruzada de k pliegues** divide los datos en k partes, entrena k veces dejando cada vez una parte fuera para evaluar, y promedia los resultados. Con k = 5, cada dato se usa cuatro veces para entrenar y una para evaluar. Para datos con orden temporal (demanda por día), los pliegues deben respetar el tiempo: se entrena con el pasado y se evalúa con el futuro, nunca al revés, porque en la realidad el modelo siempre predecirá hacia adelante.

## Empezar por lo simple
Antes de un modelo complejo, conviene una **línea base**: una regla simple ("predecir la ocupación de mañana igual a la del mismo día de la semana pasada") y un modelo simple (regresión lineal o logística). Si el modelo complejo no supera claramente a la línea base, no vale su costo de mantenimiento. En datos tabulares (filas y columnas, como la mayoría de los datos de negocio), los **árboles potenciados por gradiente** (XGBoost, de Tianqi Chen, 2016; LightGBM; CatBoost) suelen ser los más precisos, por encima de las redes neuronales, como mostraron Léo Grinsztajn y otros en 2022.`);

D('ia.nn', `## Entrenar redes en la práctica
Entrenar una red neuronal es un proceso experimental con varios controles:
- **Tasa de aprendizaje:** el tamaño de cada paso del descenso por gradiente. Demasiado grande, el entrenamiento diverge; demasiado pequeña, no avanza. Optimizadores como **Adam** (Diederik Kingma y Jimmy Ba, 2014) ajustan el paso para cada parámetro y son el punto de partida habitual.
- **Lotes** (*batches*): en lugar de calcular el gradiente con todos los datos, se usa un lote pequeño (32, 64, 256 ejemplos) por paso: más rápido y, por el ruido que introduce, a menudo generaliza mejor.
- **Épocas:** pasadas completas por los datos de entrenamiento. Se vigila la pérdida en validación y se detiene cuando deja de mejorar (**parada temprana**), una forma simple de evitar el sobreajuste.
- **Regularización:** **dropout** (Nitish Srivastava, Geoffrey Hinton y otros, 2014), que apaga neuronas al azar durante el entrenamiento para que la red no dependa de ninguna en particular; penalizar pesos grandes; y **aumento de datos** (rotar, recortar o cambiar el brillo de imágenes para que la red vea más variedad).
- **Normalización por lotes** (Sergey Ioffe y Christian Szegedy, 2015): estabiliza el entrenamiento de redes profundas.

## Transferir lo aprendido
Entrenar una red grande desde cero requiere millones de ejemplos y mucho cómputo. El **aprendizaje por transferencia** toma una red ya entrenada con un conjunto enorme (por ejemplo, imágenes de ImageNet o texto de internet) y la **ajusta** (*fine-tuning*) con unos pocos cientos o miles de ejemplos del problema propio. Las primeras capas, que aprendieron a reconocer bordes, texturas o la estructura del lenguaje, sirven para casi cualquier tarea. Es la forma práctica de usar redes neuronales en una empresa: para reconocer daños en fotos de vehículos, se parte de un modelo de visión preentrenado y se ajusta con fotos etiquetadas por los inspectores. Los modelos de lenguaje grandes llevan la idea más lejos: muchas tareas se resuelven sin ajuste alguno, solo con instrucciones y ejemplos en el texto de entrada.

## Costos y huella
Entrenar los modelos más grandes cuesta decenas o cientos de millones de dólares en cómputo y consume grandes cantidades de energía. Usarlos (la **inferencia**) también cuesta, por cada consulta. Por eso, en la práctica profesional se elige el modelo **más pequeño** que resuelve bien la tarea, se mide el costo por predicción y se consideran técnicas como la **cuantización** (usar números de menor precisión) o la **destilación** (entrenar un modelo pequeño que imita a uno grande).`);

D('ia.data', `## Calidad de datos como disciplina
Los modelos y los dashboards son tan buenos como sus datos. Las organizaciones maduras tratan la calidad de datos como tratan la calidad del código: con **pruebas automáticas**. Herramientas como Great Expectations o las pruebas de dbt verifican en cada carga que se cumplan expectativas: que la placa nunca sea nula, que el monto esté entre 0 y 10 000, que no haya estadías duplicadas, que el número de filas del día no caiga más de un 30 % frente al promedio (lo que indicaría que una fuente dejó de enviar datos). Las dimensiones clásicas de la calidad de datos son **exactitud**, **completitud**, **consistencia**, **oportunidad** (llegan a tiempo), **unicidad** y **validez** (cumplen el formato).

## Linaje y catálogo
Cuando un número de un dashboard parece raro, la primera pregunta es "¿de dónde sale?". El **linaje de datos** registra el camino de cada dato desde su origen, por cada transformación, hasta el reporte. Un **catálogo de datos** documenta qué tablas existen, qué significa cada columna, quién es su responsable y qué tan confiable es. Sin ellos, cada analista reconstruye el conocimiento por su cuenta, y dos reportes muestran cifras distintas para "lo mismo".

## Arquitecturas por capas
Una organización frecuente de las canalizaciones de datos es la arquitectura **medallón**, popularizada por Databricks: una capa **bronce** con los datos crudos tal como llegan (para poder reprocesar), una **plata** con datos limpios, deduplicados y con tipos correctos, y una **oro** con tablas listas para el negocio (hechos y dimensiones, métricas). Cada capa se construye a partir de la anterior con transformaciones versionadas y probadas, igual que el código.

## Datos de entrenamiento y su gobierno
Para el aprendizaje automático, además, hay que versionar **qué datos** se usaron para entrenar cada modelo (con herramientas como DVC o los registros de modelos), para poder reproducirlo, auditarlo y explicar sus decisiones. Si un cliente pide, en ejercicio de sus derechos bajo la Ley 29733, que se eliminen sus datos, hay que saber en qué conjuntos de entrenamiento estaban.`);
})();
