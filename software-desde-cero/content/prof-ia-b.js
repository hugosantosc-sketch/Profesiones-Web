(function () {
var S = SDC.S;

S('ia', 'ia.unsup', { title: 'Aprendizaje no supervisado y sistemas de recomendación',
  ask: '¿Qué técnica no supervisada o de recomendación aplicarías aquí?',
  lesson: `
> **La idea en simple.** No siempre hay una respuesta correcta etiquetada de la cual aprender. A veces se tiene un montón de datos y la pregunta es "¿qué estructura hay aquí?": qué grupos naturales de clientes existen, qué registros son anómalos, qué variables se mueven juntas, qué le podría interesar a cada usuario. El aprendizaje no supervisado busca patrones sin etiquetas, y los sistemas de recomendación usan los rastros del comportamiento para sugerir.

## Agrupamiento: k-medias
El **agrupamiento** (*clustering*) divide los datos en grupos de elementos parecidos entre sí y distintos de los de otros grupos. El algoritmo más conocido es **k-medias** (*k-means*, Stuart Lloyd lo describió en 1957 en Bell Labs, publicado en 1982):
1. Elegir k centros al azar.
2. Asignar cada punto al centro más cercano.
3. Mover cada centro al promedio de sus puntos.
4. Repetir 2 y 3 hasta que nada cambie.
~~~js
function kMedias(puntos, k, iteraciones = 50) {
  let centros = puntos.slice(0, k).map(p => [...p]);              // inicio simple: los k primeros
  let grupo = [];
  const dist = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
  for (let it = 0; it < iteraciones; it++) {
    grupo = puntos.map(p => centros.reduce((m, c, j) => dist(p, c) < dist(p, centros[m]) ? j : m, 0));
    centros = centros.map((c, j) => {
      const miembros = puntos.filter((_, i) => grupo[i] === j);
      return miembros.length ? c.map((_, d) => miembros.reduce((s, m) => s + m[d], 0) / miembros.length) : c;
    });
  }
  return { centros, grupo };
}
// Clientes de PatioApp: [estadías por mes, días promedio por estadía]
const clientes = [[2, 1], [3, 2], [40, 1], [45, 2], [4, 20], [3, 25], [38, 1.5], [2, 1.5]];
console.log(kMedias(clientes, 3).grupo);   // tres perfiles: ocasionales, flotas de rotación rápida, almacenaje largo
~~~
Cuidados: k-medias necesita que se elija **k** de antemano (el **método del codo** grafica el error para varios k y busca dónde deja de bajar mucho; el **coeficiente de silueta** mide qué tan bien separados están los grupos); es sensible a la **escala** (si una variable está en soles y otra en días, la de soles domina: hay que escalar); depende del **inicio** (k-means++, de David Arthur y Sergei Vassilvitskii, 2007, elige centros iniciales bien separados); y supone grupos más o menos redondos y de tamaño parecido. **DBSCAN** (Martin Ester y otros, 1996) encuentra grupos de cualquier forma según la densidad y marca los puntos aislados como ruido, sin necesidad de fijar k. El **agrupamiento jerárquico** construye un árbol de grupos (un dendrograma) que se puede cortar a distintos niveles.
Lo más importante: los grupos no tienen significado por sí mismos. Alguien que conoce el negocio debe **interpretarlos** ("este grupo son flotas de transporte que entran y salen el mismo día") y decidir si son útiles.

## Reducción de dimensionalidad
Cuando hay muchas variables, es difícil visualizar y los algoritmos sufren (la **maldición de la dimensionalidad**: en muchas dimensiones, todos los puntos quedan lejos de todos). La **reducción de dimensionalidad** busca menos variables que conserven la mayor parte de la información:
- **Análisis de componentes principales** (PCA, Karl Pearson, 1901; Harold Hotelling, 1933): encuentra las direcciones en las que los datos varían más (los componentes principales) y proyecta los datos sobre las primeras. Es lineal, rápido y usa el álgebra lineal que viste en matemática avanzada (vectores y valores propios de la matriz de covarianza).
- **t-SNE** (Laurens van der Maaten y Geoffrey Hinton, 2008) y **UMAP** (Leland McInnes y otros, 2018): técnicas no lineales para **visualizar** datos de muchas dimensiones en dos, conservando quién está cerca de quién. Útiles para explorar, pero las distancias entre grupos en el gráfico no deben interpretarse literalmente.

## Detección de anomalías
Encontrar lo raro es una de las aplicaciones más valiosas: fraudes, errores de digitación, fallas de sensores, intrusiones. Enfoques:
- **Estadísticos:** marcar valores a más de 3 desviaciones estándar de la media, o fuera del rango intercuartílico (más robusto ante valores extremos).
- **Basados en distancia o densidad:** puntos lejos de sus vecinos (el ruido de DBSCAN, el *local outlier factor*).
- **Bosques de aislamiento** (*isolation forest*, Fei Tony Liu y otros, 2008): las anomalías se aíslan con pocas divisiones aleatorias porque son pocas y distintas.
- **Por series de tiempo:** comparar con lo esperado para esa hora y día de la semana (los ingresos de un lunes a las 9:00 no se comparan con los de un domingo a las 3:00).
El desafío práctico es el equilibrio entre **falsas alarmas** (que hacen que la gente ignore las alertas) y anomalías no detectadas.

## Sistemas de recomendación
Recomendar es predecir qué le interesará a cada usuario. Tres familias:
- **Basados en contenido:** recomendar lo parecido a lo que el usuario ya eligió, según atributos (si contrata almacenaje largo de camiones, sugerir servicios de mantenimiento para camiones).
- **Filtrado colaborativo:** "usuarios parecidos a ti también eligieron…". No necesita entender el contenido, solo el historial de muchos usuarios. Una versión simple compara usuarios por **similitud del coseno** entre sus vectores de preferencias.
- **Factorización de matrices:** representar usuarios y productos como vectores en un espacio de pocas dimensiones aprendido de la matriz de interacciones; la afinidad es el producto de ambos vectores. Ganó protagonismo en el **Premio Netflix** (2006–2009), en el que Netflix ofreció un millón de dólares a quien mejorara un 10 % su recomendador; lo ganó el equipo BellKor's Pragmatic Chaos combinando muchos modelos. Netflix nunca llegó a usar la solución completa: la mejora no justificaba la complejidad de ingeniería, una lección valiosa en sí misma.
Los recomendadores tienen problemas propios: el **arranque en frío** (usuarios o productos nuevos sin historial), las **burbujas de filtro** (recomendar siempre más de lo mismo) y los incentivos (optimizar solo el tiempo de uso puede perjudicar a los usuarios).
~~~js
const coseno = (a, b) => { const p = a.reduce((s, x, i) => s + x * b[i], 0); return p / (Math.hypot(...a) * Math.hypot(...b)); };
// Uso de servicios [lavado, revisión, almacenaje largo, traslado entre sedes]
console.log(coseno([1, 1, 0, 0], [1, 1, 0, 1]).toFixed(2), coseno([1, 1, 0, 0], [0, 0, 1, 0]).toFixed(2));   // 0.82 0.00
~~~

## Ejemplo resuelto: segmentar a los clientes de PatioApp
El área comercial quiere entender a sus 400 clientes para diseñar planes.
1. **Variables:** estadías por mes, días promedio por estadía, porcentaje de camiones, uso de traslados entre sedes y antigüedad. Se **escalan** para que todas pesen igual.
2. **Elegir k:** el método del codo y la silueta sugieren 4 grupos.
3. **Agrupar** con k-medias (inicio k-means++) y verificar estabilidad repitiendo con distintas semillas.
4. **Interpretar** con el área comercial: flotas de rotación rápida (muchas estadías cortas), almacenaje largo (pocas estadías de semanas), clientes ocasionales y transportistas multisede.
5. **Anomalías:** 7 clientes quedan lejos de todos los grupos; al revisarlos, 4 tenían datos mal registrados y 3 eran casos especiales legítimos.
6. **Decisión:** se diseñan planes por perfil (tarifa por volumen para flotas, mensualidad para almacenaje largo) y se mide en tres meses si la retención de cada grupo mejora.`,
  links: [['ia.ml', 'aprendizaje supervisado y evaluación'], ['mat2.lin', 'álgebra lineal: vectores y valores propios'], ['m10.analytics', 'datos para analizar y dashboards']],
  read: 'James, Witten, Hastie y Tibshirani, *An Introduction to Statistical Learning* (2.ª ed., 2021), capítulo 12; Aggarwal, *Recommender Systems* (2016); documentación de scikit-learn ("Clustering").',
  terms: [
    ['Aprendizaje no supervisado', 'aprendizaje que busca estructura en datos sin etiquetas', ['Agrupamiento.', 'Reducción de dimensión.', 'Anomalías.']],
    ['k-medias', 'algoritmo que agrupa los datos en k grupos alrededor de centros que se recalculan como promedios', ['Lloyd.', 'Elegir k.', 'Escalar variables.']],
    ['Método del codo', 'técnica para elegir k buscando dónde el error deja de disminuir mucho', ['k-medias.', 'Gráfico.', 'Junto con la silueta.']],
    ['DBSCAN', 'agrupamiento por densidad que encuentra grupos de cualquier forma y marca el ruido', ['Ester, 1996.', 'Sin k.', 'Anomalías.']],
    ['PCA', 'técnica que proyecta los datos en las direcciones de mayor variación', ['Pearson, 1901.', 'Componentes principales.', 'Lineal.']],
    ['Detección de anomalías', 'identificación de observaciones que se desvían mucho del comportamiento esperado', ['Fraude.', 'Bosques de aislamiento.', 'Falsas alarmas.']],
    ['Filtrado colaborativo', 'recomendación basada en lo que eligieron usuarios con historial parecido', ['Similitud del coseno.', 'Netflix.', 'Arranque en frío.']],
    ['Arranque en frío', 'dificultad para recomendar a usuarios o productos nuevos sin historial', ['Cold start.', 'Basado en contenido.', 'Preguntas iniciales.']]
  ],
  q: [
    ['¿Qué diferencia al aprendizaje no supervisado del supervisado?', 'No usa etiquetas con la respuesta correcta; busca estructura en los datos', ['Usa más datos siempre', 'Solo funciona con imágenes', 'No usa algoritmos'], 'Sin etiquetas.', 1],
    ['¿Por qué hay que escalar las variables antes de k-medias?', 'Porque las distancias quedarían dominadas por la variable de mayor rango', ['Porque k-medias no acepta decimales', 'Para que sea más lento', 'No hace falta'], 'Sensible a la escala.', 2],
    ['¿Qué ventaja tiene DBSCAN sobre k-medias?', 'Encuentra grupos de cualquier forma y no requiere fijar k', ['Siempre es más rápido', 'No necesita datos', 'Da etiquetas correctas'], 'Por densidad.', 3],
    ['¿Para qué sirve PCA?', 'Para reducir el número de variables conservando la mayor parte de la variación', ['Para etiquetar datos', 'Para recomendar productos', 'Para cifrar datos'], 'Componentes principales.', 2],
    ['¿Qué es el arranque en frío en un recomendador?', 'La dificultad de recomendar a usuarios o productos sin historial', ['Un error de hardware', 'El tiempo de carga', 'La primera ejecución del programa'], 'Cold start.', 2],
    ['¿Qué lección dejó que Netflix no usara completa la solución ganadora de su premio?', 'Que una mejora de precisión puede no justificar su complejidad de ingeniería', ['Que los premios no sirven', 'Que el filtrado colaborativo no funciona', 'Que los datos eran falsos'], 'Costo y beneficio.', 4],
    ['¿Por qué los grupos de un agrupamiento deben interpretarse con el negocio?', 'Porque no tienen significado por sí mismos y pueden no ser útiles', ['Porque el algoritmo los nombra mal', 'Porque son aleatorios siempre', 'No hace falta'], 'Interpretar.', 3],
    { tf: 'En t-SNE y UMAP, las distancias entre grupos del gráfico pueden interpretarse literalmente.', v: false, e: 'Son técnicas de visualización; conservan vecindades, no distancias globales.', l: 3 },
    { tf: 'Un sistema de detección de anomalías con demasiadas falsas alarmas termina siendo ignorado.', v: true, e: 'Equilibrio entre falsas alarmas y omisiones.', l: 1 },
    { c: 'Escribe «asignar(puntos, centros)»: devuelve, para cada punto, el índice del centro más cercano (distancia euclidiana).', f: 'asignar', p: ['puntos', 'centros'], t: [[[[[0, 0], [10, 10], [1, 1]], [[0, 0], [10, 10]]], [0, 1, 0]], [[[[5, 5]], [[0, 0], [6, 6], [10, 10]]], [1]]], sol: '  const d = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));\n  return puntos.map(p => centros.reduce((m, c, j) => d(p, c) < d(p, centros[m]) ? j : m, 0));', l: 2 },
    { c: 'Escribe «coseno(a, b)»: similitud del coseno entre dos vectores, redondeada a 2 decimales (0 si alguno es el vector nulo).', f: 'coseno', p: ['a', 'b'], t: [[[[1, 1, 0, 0], [1, 1, 0, 1]], 0.82], [[[1, 0], [0, 1]], 0], [[[2, 2], [1, 1]], 1], [[[0, 0], [1, 1]], 0]], sol: '  const p = a.reduce((s, x, i) => s + x * b[i], 0), na = Math.hypot(...a), nb = Math.hypot(...b);\n  return na && nb ? Math.round(p / (na * nb) * 100) / 100 : 0;', l: 2 },
    { c: 'Escribe «anomalias(valores, k)»: devuelve los índices de los valores a más de k desviaciones estándar (poblacional) de la media.', f: 'anomalias', p: ['valores', 'k'], t: [[[[10, 11, 9, 10, 50, 10, 11], 2], [4]], [[[5, 5, 5], 1], []]], sol: '  const n = valores.length, m = valores.reduce((s, v) => s + v, 0) / n;\n  const sd = Math.sqrt(valores.reduce((s, v) => s + (v - m) ** 2, 0) / n);\n  return valores.map((v, i) => [v, i]).filter(([v]) => sd > 0 && Math.abs(v - m) > k * sd).map(([, i]) => i);', l: 3 }
  ],
  gen: function (g) {
    var te = [['Encontrar perfiles naturales de clientes', 'Agrupamiento'], ['Visualizar en 2D datos con 50 variables', 'Reducción de dimensionalidad'], ['Detectar cobros anormalmente altos', 'Detección de anomalías'], ['Sugerir servicios según lo que usan clientes parecidos', 'Filtrado colaborativo'], ['Sugerir servicios parecidos a los que ya contrató', 'Recomendación basada en contenido']];
    te.forEach(function (t) { g.mcq(2, '¿Qué técnica aplicarías? ' + t[0], t[1], ['Agrupamiento', 'Reducción de dimensionalidad', 'Detección de anomalías', 'Filtrado colaborativo', 'Recomendación basada en contenido'].filter(function (x) { return x !== t[1]; }).slice(0, 3), 'Aprendizaje no supervisado y recomendación.'); });
    var al = [['Necesita fijar k y supone grupos redondos', 'k-medias'], ['Agrupa por densidad y marca el ruido', 'DBSCAN'], ['Construye un dendrograma que se corta a distintos niveles', 'Agrupamiento jerárquico'], ['Proyecta en las direcciones de mayor variación', 'PCA'], ['Aísla anomalías con pocas divisiones aleatorias', 'Bosque de aislamiento']];
    al.forEach(function (a) { g.mcq(2, '¿Qué algoritmo es? ' + a[0], a[1], ['k-medias', 'DBSCAN', 'Agrupamiento jerárquico', 'PCA', 'Bosque de aislamiento'].filter(function (x) { return x !== a[1]; }).slice(0, 3), 'Algoritmos no supervisados.'); });
    g.times(5, function (R) { var a = R.int(0, 10), b = R.int(0, 10), c = R.int(0, 10), d = R.int(0, 10); g.input(2, '¿Cuál es la distancia euclidiana al cuadrado entre (' + a + ', ' + b + ') y (' + c + ', ' + d + ')?', (a - c) * (a - c) + (b - d) * (b - d), 'Suma de las diferencias al cuadrado.'); });
  },
  checks: [
    ['Explica k-medias y sus cuidados principales.', 'Asigna puntos al centro más cercano y recalcula centros como promedios; hay que elegir k (codo, silueta), escalar variables, cuidar el inicio y saber que supone grupos redondos.'],
    ['¿Para qué sirven PCA y las técnicas como t-SNE o UMAP?', 'PCA reduce variables conservando la variación; t-SNE y UMAP visualizan datos de muchas dimensiones conservando vecindades.'],
    ['Describe tres enfoques de detección de anomalías y su dificultad práctica.', 'Estadísticos, por distancia o densidad y bosques de aislamiento (y por series de tiempo); equilibrar falsas alarmas y omisiones.'],
    ['Compara recomendación basada en contenido y filtrado colaborativo, y nombra dos problemas de los recomendadores.', 'Contenido usa atributos de lo elegido; colaborativo usa usuarios parecidos; arranque en frío y burbujas de filtro.']
  ],
  cites: ['Lloyd, S. (1982). Least squares quantization in PCM. *IEEE Transactions on Information Theory*, 28(2).', 'Arthur, D. y Vassilvitskii, S. (2007). k-means++: The Advantages of Careful Seeding. *SODA 2007*.', 'Ester, M., Kriegel, H.-P., Sander, J. y Xu, X. (1996). A Density-Based Algorithm for Discovering Clusters. *KDD 96*.', 'Liu, F. T., Ting, K. M. y Zhou, Z.-H. (2008). Isolation Forest. *ICDM 2008*.', 'Koren, Y., Bell, R. y Volinsky, C. (2009). Matrix Factorization Techniques for Recommender Systems. *Computer*, 42(8).', 'van der Maaten, L. y Hinton, G. (2008). Visualizing Data using t-SNE. *Journal of Machine Learning Research*, 9.'],
  project: { t: 'Segmentación y anomalías',
    goal: 'Aplicar agrupamiento, reducción de dimensionalidad y detección de anomalías a un conjunto de datos real.',
    steps: ['Elige un conjunto de datos público o propio con varias variables numéricas (por ejemplo, clientes o transacciones).', 'Prepara y escala las variables, y elige k con el método del codo y la silueta.', 'Agrupa con k-medias y con DBSCAN, y compara los resultados.', 'Visualiza los grupos con PCA y describe cada grupo en lenguaje de negocio.', 'Detecta anomalías con dos métodos, revisa manualmente las diez principales y clasifícalas como error, caso legítimo o hallazgo.'],
    deliver: 'El cuaderno o código, los gráficos y el informe con la interpretación.' },
  hito: ['Segmenta a los clientes de PatioApp con k-medias sobre variables escaladas e interpreta los grupos con el área comercial.', 'Implementa en PatioApp una alerta de cobros anómalos que compare con lo esperado por sede, día y hora.']
});
SDC.after('ia.unsup', 'ia.ml');

S('ia', 'ia.resp', { title: 'IA responsable: equidad, explicabilidad, privacidad y regulación',
  ask: '¿Qué riesgo de este sistema con IA hay que gestionar y cómo?',
  lesson: `
> **La idea en simple.** Un modelo de aprendizaje automático puede decidir quién recibe un crédito, a quién se entrevista para un empleo, qué publicación ve cada persona o qué vehículo se inspecciona primero. Si aprende de datos con sesgos, los reproduce y los amplifica; si nadie puede explicar sus decisiones, nadie puede corregirlas; si usa datos personales sin cuidado, viola derechos. La IA responsable es el conjunto de prácticas para que los sistemas con IA sean justos, comprensibles, seguros y legales, y es parte del trabajo de quien los construye, no un añadido.

## Cómo un modelo aprende a discriminar
Un modelo aprende patrones de los datos históricos. Si la historia contiene discriminación, el modelo la aprende, aunque nadie lo haya programado así:
- **Datos históricos sesgados:** en 2018 se informó que Amazon abandonó un sistema experimental de selección de currículos porque penalizaba a las mujeres: había aprendido de diez años de contrataciones en un sector dominado por hombres.
- **Variables sustitutas** (*proxies*): quitar la variable sensible no basta. El distrito de residencia, la universidad o ciertos patrones de compra pueden estar fuertemente correlacionados con el origen étnico o el nivel socioeconómico.
- **Representación desigual:** el estudio *Gender Shades* de Joy Buolamwini y Timnit Gebru (2018) mostró que sistemas comerciales de clasificación facial fallaban menos del 1 % con hombres de piel clara y hasta cerca del 35 % con mujeres de piel oscura, porque los datos de entrenamiento tenían pocas de ellas.
- **Bucles de retroalimentación:** si un modelo decide dónde patrullar o qué inspeccionar, y luego se reentrena con lo encontrado, refuerza sus propias decisiones: se encuentra más donde más se busca.
- **Etiquetas equivocadas:** Ziad Obermeyer y otros (*Science*, 2019) encontraron que un algoritmo usado en hospitales de Estados Unidos para priorizar pacientes usaba el **gasto médico** como sustituto de la **necesidad médica**; como históricamente se gastaba menos en pacientes negros con la misma necesidad, el algoritmo los subestimaba sistemáticamente.

## Medir la equidad
Existen varias definiciones formales de equidad (*fairness*), y un resultado importante es que **no se pueden cumplir todas a la vez** salvo en casos triviales (Jon Kleinberg y otros, 2016; Alexandra Chouldechova, 2017). Las más usadas:
- **Paridad demográfica:** la proporción de decisiones positivas es igual en todos los grupos.
- **Igualdad de oportunidades:** entre quienes **merecen** la decisión positiva, la tasa de aciertos (exhaustividad) es igual en todos los grupos.
- **Calibración:** cuando el modelo dice "70 % de probabilidad", acierta el 70 % de las veces en todos los grupos.
El caso **COMPAS** lo ilustró: ProPublica (2016) mostró que un sistema de evaluación de riesgo de reincidencia en Estados Unidos tenía casi el doble de falsos positivos para acusados negros que para blancos; la empresa respondió que el sistema estaba calibrado por igual. Ambos tenían razón con distintas definiciones. La elección de la métrica de equidad es una **decisión ética y de contexto**, que debe tomarse explícitamente con las personas afectadas, no un detalle técnico.
~~~js
// Comparar tasas por grupo: evaluación de un modelo que prioriza inspecciones
function tasasPorGrupo(casos) {             // casos: { grupo, real (0/1), prediccion (0/1) }
  const r = {};
  for (const c of casos) {
    const g = r[c.grupo] ??= { n: 0, positivos: 0, vp: 0, reales: 0 };
    g.n++; g.positivos += c.prediccion; g.reales += c.real; g.vp += c.real && c.prediccion ? 1 : 0;
  }
  for (const k in r) r[k] = { tasaPositiva: +(r[k].positivos / r[k].n).toFixed(2), exhaustividad: +(r[k].vp / r[k].reales).toFixed(2) };
  return r;
}
~~~

## Explicabilidad
Un modelo de "caja negra" que no puede explicar sus decisiones es difícil de auditar, de corregir y de defender ante un usuario o un regulador. Opciones:
- **Modelos interpretables por diseño:** regresión lineal o logística, árboles de decisión pequeños, listas de reglas. Cynthia Rudin (2019) argumentó que, para decisiones de alto impacto, conviene usar modelos interpretables en lugar de explicar después modelos opacos, porque en muchos problemas tabulares la pérdida de precisión es mínima.
- **Explicaciones posteriores:** **SHAP** (Scott Lundberg y Su-In Lee, 2017, basado en los valores de Shapley de la teoría de juegos) atribuye a cada variable su contribución a una predicción concreta; **LIME** (Marco Ribeiro y otros, 2016) aproxima el modelo localmente con uno simple.
- **Explicaciones contrafactuales:** "si sus ingresos fueran 300 soles mayores, el crédito habría sido aprobado". Son las más útiles para la persona afectada, porque dicen qué cambiar.
- **Documentación:** las **tarjetas de modelo** (*model cards*, Margaret Mitchell y otros, 2019) y las **fichas de datos** (*datasheets for datasets*, Timnit Gebru y otros, 2018) describen para qué sirve un modelo, con qué datos se entrenó, cómo rinde en cada grupo, y para qué **no** debe usarse.

## Privacidad
Los modelos pueden filtrar datos personales: se ha demostrado que es posible extraer fragmentos de los datos de entrenamiento de algunos modelos de lenguaje, o inferir si una persona estaba en el conjunto de entrenamiento. Prácticas: **minimizar** los datos (solo los necesarios para el propósito), **anonimizar o seudonimizar**, controlar el acceso, no enviar datos personales a servicios externos sin base legal ni contrato, y técnicas avanzadas como la **privacidad diferencial** (Cynthia Dwork, 2006), que agrega ruido calibrado para que el resultado casi no cambie esté o no una persona en los datos (la usan Apple, Google y el censo de Estados Unidos de 2020). En el Perú, la **Ley 29733** se aplica a cualquier tratamiento de datos personales, incluido el entrenamiento de modelos: requiere consentimiento o una base legal, finalidad determinada y medidas de seguridad.

## Regulación
- La **Unión Europea** aprobó en 2024 el **Reglamento de Inteligencia Artificial** (*AI Act*), el primero integral del mundo, con un enfoque por **niveles de riesgo**: prohíbe usos de riesgo inaceptable (como la puntuación social por parte de autoridades), impone obligaciones estrictas a los de **alto riesgo** (selección de personal, crédito, educación, infraestructura crítica: gestión de riesgos, calidad de datos, documentación, supervisión humana), pide transparencia en otros (avisar que se habla con un sistema de IA o que un contenido fue generado) y deja libres los de riesgo mínimo. Sus obligaciones entran en vigor por etapas entre 2025 y 2027, y alcanzan a empresas de fuera de Europa que ofrezcan sistemas allí.
- El **Perú** aprobó en 2023 la **Ley 31814**, que promueve el uso de la inteligencia artificial para el desarrollo económico y social, con principios de uso ético, seguro y basado en riesgos, y que fue reglamentada en 2025.
- Organismos internacionales como la **OCDE** (Principios de IA, 2019) y la **UNESCO** (Recomendación sobre la ética de la IA, 2021, adoptada por sus estados miembros, incluido el Perú) establecen principios comunes: respeto a los derechos humanos, transparencia, equidad, seguridad y rendición de cuentas.
- El marco de gestión de riesgos del **NIST** de Estados Unidos (AI RMF, 2023) ofrece una guía práctica y voluntaria: gobernar, mapear, medir y gestionar los riesgos.

## Ejemplo resuelto: priorizar inspecciones de vehículos
PatioApp quiere un modelo que priorice qué unidades inspeccionar primero por riesgo de daños no declarados.
1. **Propósito y alcance:** el modelo **ordena** la cola de inspección; no decide sanciones ni cobros. Una persona revisa siempre.
2. **Datos:** historial de inspecciones con daños encontrados. Riesgo detectado: las unidades de ciertas empresas se inspeccionaban más en el pasado, por lo que tienen más daños registrados (bucle de retroalimentación). Se corrige reponderando y agregando una fracción de inspecciones **al azar** que sirven para medir sin sesgo.
3. **Variables:** se excluye el nombre de la empresa y se revisa que ninguna variable sea un sustituto evidente de ella.
4. **Equidad:** se mide la exhaustividad por empresa y por tipo de vehículo en la prueba; se acepta una diferencia máxima acordada con operaciones.
5. **Explicabilidad:** se usa un modelo de árboles con explicaciones SHAP visibles para el inspector ("prioridad alta por: 3 traslados en la semana, zona de ingreso C, antigüedad de la unidad").
6. **Documentación y monitoreo:** tarjeta de modelo, revisión trimestral de las métricas por grupo y un canal para que los clientes reclamen. Los datos personales de los choferes no se usan.`,
  links: [['ia.ml', 'evaluación de modelos y matriz de confusión'], ['m17.ethics', 'ética profesional y datos personales'], ['m16.priv', 'privacidad y protección de datos']],
  read: 'Barocas, Hardt y Narayanan, *Fairness and Machine Learning* (fairmlbook.org, 2023); Molnar, *Interpretable Machine Learning* (2.ª ed., 2022); Reglamento (UE) 2024/1689 de Inteligencia Artificial; Ley 31814 del Perú.',
  terms: [
    ['IA responsable', 'prácticas para que los sistemas con IA sean justos, explicables, seguros, privados y legales', ['Equidad.', 'Explicabilidad.', 'Regulación.']],
    ['Variable sustituta', 'variable correlacionada con un atributo sensible que permite discriminar aunque este se excluya', ['Proxy.', 'Distrito.', 'No basta quitar la sensible.']],
    ['Bucle de retroalimentación', 'situación en la que las decisiones de un modelo generan los datos que lo refuerzan', ['Se encuentra donde se busca.', 'Inspecciones.', 'Muestras al azar.']],
    ['Paridad demográfica', 'criterio de equidad que pide igual proporción de decisiones positivas en todos los grupos', ['Tasa positiva.', 'Frente a calibración.', 'No compatible con todas.']],
    ['Igualdad de oportunidades', 'criterio que pide igual tasa de aciertos entre quienes merecen la decisión positiva en cada grupo', ['Exhaustividad por grupo.', 'Hardt, 2016.', 'COMPAS.']],
    ['SHAP', 'método que atribuye a cada variable su contribución a una predicción concreta', ['Lundberg y Lee, 2017.', 'Valores de Shapley.', 'Explicación posterior.']],
    ['Tarjeta de modelo', 'documento que describe el propósito, los datos, el rendimiento por grupo y los límites de uso de un modelo', ['Mitchell, 2019.', 'Model card.', 'Para qué no usarlo.']],
    ['Privacidad diferencial', 'técnica que agrega ruido calibrado para que el resultado casi no dependa de una persona concreta', ['Dwork, 2006.', 'Censo 2020.', 'Garantía matemática.']]
  ],
  q: [
    ['¿Por qué no basta con quitar la variable sensible (por ejemplo, el sexo) para evitar discriminación?', 'Porque otras variables pueden ser sustitutas correlacionadas con ella', ['Porque el modelo la adivina por magia', 'Sí basta siempre', 'Porque la ley lo prohíbe'], 'Proxies.', 2],
    ['¿Qué mostró el estudio Gender Shades?', 'Que sistemas de clasificación facial fallaban mucho más con mujeres de piel oscura', ['Que todos los sistemas eran perfectos', 'Que los hombres eran peor clasificados', 'Que las cámaras eran defectuosas'], 'Buolamwini y Gebru, 2018.', 2],
    ['¿Qué enseñó el caso COMPAS sobre las métricas de equidad?', 'Que distintas definiciones de equidad pueden dar conclusiones opuestas y no se cumplen todas a la vez', ['Que la equidad no se puede medir', 'Que el sistema era perfecto', 'Que solo importa la precisión'], 'Elegir la métrica es una decisión ética.', 4],
    ['¿Qué tipo de explicación es más útil para la persona afectada por una decisión?', 'Una contrafactual: qué tendría que cambiar para otro resultado', ['La lista de pesos del modelo', 'El código fuente', 'La matriz de confusión'], 'Dice qué cambiar.', 3],
    ['¿Qué describe una tarjeta de modelo?', 'Propósito, datos, rendimiento por grupo y usos no permitidos de un modelo', ['El precio del modelo', 'Solo su arquitectura', 'Los nombres de los programadores'], 'Mitchell, 2019.', 2],
    ['¿Cómo clasifica los sistemas el Reglamento de IA de la Unión Europea?', 'Por niveles de riesgo: inaceptable, alto, de transparencia y mínimo', ['Por tamaño del modelo', 'Por país de origen', 'Por lenguaje de programación'], 'Enfoque basado en riesgo.', 3],
    ['Un modelo decide qué inspeccionar y se reentrena con lo encontrado. ¿Qué riesgo hay?', 'Un bucle de retroalimentación que refuerza sus propias decisiones', ['Ninguno', 'Que el modelo se borre', 'Que sea muy lento'], 'Se encuentra donde se busca.', 3],
    { tf: 'Es posible cumplir a la vez paridad demográfica, igualdad de oportunidades y calibración en casi cualquier problema real.', v: false, e: 'Kleinberg y Chouldechova mostraron que en general son incompatibles.', l: 3 },
    { tf: 'La Ley 29733 de protección de datos personales del Perú se aplica también al uso de datos personales para entrenar modelos.', v: true, e: 'Es un tratamiento de datos personales.', l: 2 },
    { c: 'Escribe «tasaPositivaPorGrupo(casos)»: casos { grupo, prediccion (0/1) }; devuelve { grupo: proporción de predicciones positivas } con 2 decimales.', f: 'tasaPositivaPorGrupo', p: ['casos'], t: [[[[{ grupo: 'A', prediccion: 1 }, { grupo: 'A', prediccion: 0 }, { grupo: 'B', prediccion: 1 }, { grupo: 'B', prediccion: 1 }]], { A: 0.5, B: 1 }]], sol: '  const n = {}, p = {};\n  for (const c of casos) { n[c.grupo] = (n[c.grupo] || 0) + 1; p[c.grupo] = (p[c.grupo] || 0) + c.prediccion; }\n  const r = {};\n  for (const g in n) r[g] = Math.round(p[g] / n[g] * 100) / 100;\n  return r;', l: 2 },
    { c: 'Escribe «exhaustividadPorGrupo(casos)»: casos { grupo, real, prediccion }; devuelve { grupo: verdaderos positivos / reales positivos } con 2 decimales.', f: 'exhaustividadPorGrupo', p: ['casos'], t: [[[[{ grupo: 'A', real: 1, prediccion: 1 }, { grupo: 'A', real: 1, prediccion: 0 }, { grupo: 'B', real: 1, prediccion: 1 }, { grupo: 'B', real: 0, prediccion: 1 }]], { A: 0.5, B: 1 }]], sol: '  const vp = {}, r = {};\n  for (const c of casos) if (c.real) { r[c.grupo] = (r[c.grupo] || 0) + 1; vp[c.grupo] = (vp[c.grupo] || 0) + (c.prediccion ? 1 : 0); }\n  const out = {};\n  for (const g in r) out[g] = Math.round(vp[g] / r[g] * 100) / 100;\n  return out;', l: 3 },
    { c: 'Escribe «brecha(tasas)»: recibe { grupo: tasa } y devuelve la diferencia entre la tasa máxima y la mínima, con 2 decimales.', f: 'brecha', p: ['tasas'], t: [[[{ A: 0.5, B: 0.8, C: 0.65 }], 0.3], [[{ A: 0.4 }], 0]], sol: '  const v = Object.values(tasas);\n  return Math.round((Math.max(...v) - Math.min(...v)) * 100) / 100;', l: 1 }
  ],
  gen: function (g) {
    var ri = [['Puntuación social de ciudadanos por parte de una autoridad', 'Riesgo inaceptable'], ['Selección automática de candidatos a un empleo', 'Alto riesgo'], ['Evaluación de solicitudes de crédito', 'Alto riesgo'], ['Un asistente conversacional que atiende clientes', 'Riesgo de transparencia'], ['Un filtro de correo no deseado', 'Riesgo mínimo']];
    ri.forEach(function (r) { g.mcq(3, 'Según el Reglamento de IA de la UE, ¿qué nivel de riesgo tiene? ' + r[0], r[1], ['Riesgo inaceptable', 'Alto riesgo', 'Riesgo de transparencia', 'Riesgo mínimo'].filter(function (x) { return x !== r[1]; }), 'Enfoque por niveles de riesgo.'); });
    var me = [['La proporción de aprobados es igual en todos los grupos', 'Paridad demográfica'], ['Entre quienes merecen la aprobación, se aprueba la misma proporción en cada grupo', 'Igualdad de oportunidades'], ['Un 70 % predicho acierta el 70 % de las veces en cada grupo', 'Calibración']];
    me.forEach(function (m) { g.mcq(3, '¿Qué criterio de equidad describe? ' + m[0], m[1], ['Paridad demográfica', 'Igualdad de oportunidades', 'Calibración', 'Precisión global'].filter(function (x) { return x !== m[1]; }), 'Definiciones de equidad.'); });
    var ex = [['"Prioridad alta por 3 traslados y zona C"', 'Explicación por contribución de variables (SHAP)'], ['"Si sus ingresos fueran 300 soles mayores, se aprobaría"', 'Explicación contrafactual'], ['Un árbol de decisión de 4 niveles que cualquiera puede leer', 'Modelo interpretable por diseño'], ['Un documento con datos, rendimiento por grupo y límites de uso', 'Tarjeta de modelo']];
    ex.forEach(function (e) { g.mcq(2, '¿Qué herramienta de explicabilidad es? ' + e[0], e[1], ['Explicación por contribución de variables (SHAP)', 'Explicación contrafactual', 'Modelo interpretable por diseño', 'Tarjeta de modelo'].filter(function (x) { return x !== e[1]; }), 'Explicabilidad.'); });
  },
  checks: [
    ['Describe tres mecanismos por los que un modelo aprende a discriminar.', 'Datos históricos sesgados, variables sustitutas, representación desigual, bucles de retroalimentación y etiquetas equivocadas.'],
    ['¿Por qué elegir una métrica de equidad es una decisión ética?', 'Porque las definiciones (paridad, igualdad de oportunidades, calibración) son en general incompatibles y cada una favorece a distintos afectados.'],
    ['¿Qué opciones hay para la explicabilidad?', 'Modelos interpretables por diseño, explicaciones posteriores como SHAP o LIME, explicaciones contrafactuales y documentación como tarjetas de modelo.'],
    ['Resume la regulación relevante: UE, Perú y marcos internacionales.', 'El Reglamento de IA de la UE por niveles de riesgo; la Ley 31814 y la Ley 29733 en el Perú; principios de la OCDE y la UNESCO y el marco del NIST.']
  ],
  cites: ['Buolamwini, J. y Gebru, T. (2018). Gender Shades. *Proceedings of FAT* 2018*, PMLR 81.', 'Obermeyer, Z., Powers, B., Vogeli, C. y Mullainathan, S. (2019). Dissecting racial bias in an algorithm used to manage the health of populations. *Science*, 366(6464).', 'Kleinberg, J., Mullainathan, S. y Raghavan, M. (2017). Inherent Trade-Offs in the Fair Determination of Risk Scores. *ITCS 2017*.', 'Rudin, C. (2019). Stop explaining black box machine learning models for high stakes decisions. *Nature Machine Intelligence*, 1.', 'Mitchell, M. y otros (2019). Model Cards for Model Reporting. *FAT* 2019*.', 'Unión Europea (2024). Reglamento (UE) 2024/1689 de Inteligencia Artificial.', 'Congreso de la República del Perú (2023). Ley 31814, que promueve el uso de la inteligencia artificial.'],
  project: { t: 'Auditoría de un modelo',
    goal: 'Evaluar un modelo de clasificación en equidad, explicabilidad y privacidad, y documentarlo.',
    steps: ['Entrena un clasificador sencillo con un conjunto de datos público que tenga un atributo de grupo (por ejemplo, el conjunto Adult de ingresos).', 'Mide la tasa positiva, la exhaustividad y la calibración por grupo, y discute qué criterio de equidad sería adecuado y por qué.', 'Busca posibles variables sustitutas del atributo sensible.', 'Genera explicaciones de predicciones individuales y una explicación contrafactual.', 'Escribe la tarjeta de modelo con propósito, datos, rendimiento por grupo, riesgos y usos no permitidos.'],
    deliver: 'El código, las métricas por grupo, las explicaciones y la tarjeta de modelo.' },
  hito: ['Escribe la tarjeta de modelo del priorizador de inspecciones de PatioApp, con métricas por empresa y tipo de vehículo.', 'Agrega al priorizador de PatioApp inspecciones al azar para evitar el bucle de retroalimentación y explicaciones visibles para el inspector.']
});
SDC.after('ia.resp', 'ia.data');


SDC.D('ia.unsup', `## Representaciones aprendidas: los embeddings
Una idea que une el aprendizaje no supervisado con los modelos de lenguaje es la de **embedding**: representar cada elemento (una palabra, una frase, un producto, un cliente) como un vector de cientos de números, aprendido de tal forma que los elementos parecidos queden cerca. **word2vec** (Tomas Mikolov y otros, Google, 2013) aprendió vectores de palabras solo leyendo texto, sin etiquetas, prediciendo cada palabra a partir de sus vecinas; el resultado famoso fue que operaciones como «rey − hombre + mujer» daban un vector cercano a «reina». Hoy, los modelos de lenguaje producen embeddings de frases y documentos completos, y sobre ellos se aplican exactamente las técnicas de esta unidad: agrupar reclamos de clientes por tema, encontrar documentos parecidos con la similitud del coseno, detectar mensajes anómalos o recomendar artículos de ayuda. Las bases de datos vectoriales que viste en el curso de bases de datos existen para guardar y buscar estos vectores.

## Evaluar sin etiquetas
Sin una respuesta correcta, evaluar es más difícil. Se combinan métricas **internas** (qué tan compactos y separados están los grupos, como la silueta), la **estabilidad** (si al cambiar la semilla o quitar un 10 % de los datos los grupos se mantienen) y, sobre todo, la **utilidad**: si los grupos o las anomalías llevan a decisiones que mejoran algo medible. Un agrupamiento estadísticamente impecable que nadie usa no sirve.`);
})();
