(function () {
var D = SDC.D;
SDC.XM('eco', { prof: true });

D('eco.measure', `## Las cuatro métricas DORA
El programa de investigación DORA (*DevOps Research and Assessment*), dirigido por Nicole Forsgren, Jez Humble y Gene Kim, encuestó durante años a decenas de miles de profesionales y encontró cuatro métricas que distinguen a los equipos de alto desempeño y que se relacionan con mejores resultados de la organización (*Accelerate*, 2018):
| Métrica | Qué mide | Tipo |
|---|---|---|
| Frecuencia de despliegue | cada cuánto se publica a producción | velocidad |
| Tiempo de entrega de cambios | desde el commit hasta producción | velocidad |
| Tasa de fallos de cambios | porcentaje de despliegues que causan un incidente | estabilidad |
| Tiempo de recuperación | cuánto se tarda en restaurar el servicio tras un fallo | estabilidad |
El hallazgo central es que velocidad y estabilidad **no** se oponen: los mejores equipos despliegan muchas veces al día **y** fallan menos y se recuperan más rápido, porque trabajan en cambios pequeños, automatizados y fáciles de revertir. Estas métricas son útiles porque miden al **sistema** de entrega, no a las personas, y son difíciles de inflar sin mejorar de verdad. Usadas para comparar o castigar equipos, caen igualmente bajo la ley de Goodhart.

## Medir con incertidumbre
Muchas cosas importantes parecen imposibles de medir: la satisfacción de los usuarios, el riesgo de un proyecto, el valor de una mejora de seguridad. Douglas Hubbard, en *How to Measure Anything* (2007), propone redefinir medir como **reducir la incertidumbre**, no como obtener un número exacto. Si hoy no sabes si la nueva pantalla ahorra entre 0 y 60 segundos por ingreso, una prueba con diez operadores que muestra un ahorro de entre 15 y 30 segundos ya es una medición valiosa: cambia la decisión. Dos consejos de Hubbard: casi siempre ya existen datos parecidos que se pueden usar, y las primeras observaciones son las que más reducen la incertidumbre, así que pocas mediciones bien elegidas valen más que un gran sistema de métricas que nadie mira.

## Paneles de métricas que se usan
Un panel útil tiene pocas métricas, cada una con su **definición escrita**, su **dueño** (quien responde si se mueve), una **meta o rango esperado** y la **acción** que se tomaría si sale del rango. Si nadie sabe qué hacer cuando una métrica empeora, esa métrica es decoración. Y conviene combinar métricas que se equilibran: velocidad de entrega con tasa de fallos, cantidad de revisiones con su calidad.`);

D('eco.exp', `## Correlación no es causalidad
Que dos cosas ocurran juntas no significa que una cause la otra. Los equipos que escriben más pruebas tienen menos errores, pero quizás ambas cosas se deben a que tienen más experiencia o proyectos más simples (una **variable de confusión**). Las sedes con más operadores tienen más errores de digitación, pero también más tráfico. Formas de acercarse a la causalidad:
- **Experimentos aleatorizados** (como las pruebas A/B): la asignación al azar reparte por igual las variables de confusión, conocidas y desconocidas. Es el estándar de oro.
- **Diferencias en diferencias:** comparar el cambio en un grupo que recibió la intervención con el cambio en otro que no, en el mismo periodo. Si el ingreso móvil se lanzó en Callao y no en Ate, se compara cuánto cambió el tiempo de espera en cada una.
- **Series de tiempo interrumpidas:** observar la tendencia antes y después de un cambio, cuidando que no coincida con otro evento (un feriado, una temporada alta).
Judea Pearl, premio Turing 2011, formalizó estas ideas con los **grafos causales**, que ayudan a decidir qué variables controlar y cuáles no.

## Significancia práctica y estadística
Un resultado puede ser estadísticamente significativo y no importar: con un millón de usuarios, una diferencia de 0,1 segundos en el tiempo de carga puede ser "significativa" y no cambiar nada para el negocio. Y al revés, con pocos datos, una mejora grande puede no alcanzar significancia. Por eso se informa siempre el **tamaño del efecto** con su **intervalo de confianza** ("la nueva pantalla reduce el ingreso entre 12 y 25 segundos"), no solo si el valor p es menor que 0,05. La Asociación Estadística Estadounidense publicó en 2016 una declaración advirtiendo contra el uso mecánico del valor p, uno de los errores más extendidos en la ciencia y en la industria.

## Replicar antes de creer
Muchos hallazgos de la investigación en ingeniería de software y en psicología no se sostuvieron cuando otros intentaron repetirlos (la llamada crisis de replicación). La práctica sana es la misma en un laboratorio y en una empresa: desconfiar de un solo experimento con resultados espectaculares, repetir las mediciones importantes y publicar también los resultados negativos.`);

D('eco.money', `## Costo de oportunidad y costos hundidos
Dos ideas económicas evitan muchos errores de decisión:
- **Costo de oportunidad:** el valor de la mejor alternativa a la que se renuncia. Si el equipo dedica dos meses a reescribir el módulo de reportes, el costo no es solo el salario de esos dos meses, sino también lo que **no** se construyó en ese tiempo (por ejemplo, el aviso de llegada que habría reducido las esperas). Toda decisión de qué construir es, en el fondo, una decisión de qué no construir.
- **Costos hundidos:** lo ya gastado no se recupera y no debería influir en la decisión. "Ya invertimos 80 000 soles en este sistema, no podemos abandonarlo" es la **falacia del costo hundido**: lo que importa es si, desde hoy, los costos futuros de seguir son menores que los beneficios futuros, comparados con las alternativas. Los proyectos de software que fracasan suelen alargarse durante años por esta razón.

## Un ejemplo con VAN paso a paso
Una empresa evalúa construir un módulo de facturación propio que cuesta 60 000 soles hoy y ahorra 25 000 soles al año durante 4 años en licencias, con una tasa de descuento del 12 % anual:
| Año | Flujo | Factor 1/(1,12)ⁿ | Valor presente |
|---|---|---|---|
| 0 | −60 000 | 1,000 | −60 000 |
| 1 | 25 000 | 0,893 | 22 321 |
| 2 | 25 000 | 0,797 | 19 930 |
| 3 | 25 000 | 0,712 | 17 795 |
| 4 | 25 000 | 0,636 | 15 888 |
| | | **VAN** | **15 934** |
~~~js
const van = (tasa, flujos) => flujos.reduce((s, f, n) => s + f / Math.pow(1 + tasa, n), 0);
console.log(Math.round(van(0.12, [-60000, 25000, 25000, 25000, 25000])));   // 15934
~~~
El VAN es positivo, así que, con estos supuestos, conviene. Pero falta lo más importante: el **análisis de sensibilidad**. Si el mantenimiento cuesta 8000 soles al año (algo habitual en software propio), los flujos bajan a 17 000 y el VAN se vuelve negativo (unos −8 365). La decisión depende de un número que nadie había puesto en la planilla: el costo de mantener lo construido, que en la vida de un sistema suele superar el de construirlo.

## Inflación y moneda
En el Perú, muchos costos de software están en dólares (licencias, nube) y muchos ingresos en soles. Una evaluación seria usa una sola moneda, explicita el tipo de cambio supuesto y prueba escenarios con variaciones, porque un movimiento del tipo de cambio puede pesar más que cualquier optimización técnica.`);

D('eco.decide', `## Pensar en escenarios: el premortem
Gary Klein propuso en 2007 una técnica sencilla y poderosa: el **premortem**. Antes de comprometerse con un plan, el equipo imagina que ya pasó un año y el proyecto **fracasó**, y cada persona escribe, en silencio, las razones por las que fracasó. Luego se comparten y se discuten. A diferencia de preguntar "¿qué riesgos ves?", que invita a defender el plan, imaginar el fracaso como un hecho libera a las personas para decir lo que temen, incluidos quienes tienen menos jerarquía. Los riesgos que aparecen se convierten en acciones de mitigación o en señales que vigilar.

## Opciones reales: el valor de poder cambiar de opinión
En finanzas, una **opción** es el derecho, no la obligación, de hacer algo después. En software, muchas decisiones de diseño compran opciones: una interfaz para el proveedor de facturación electrónica cuesta un poco más hoy, pero da la opción de cambiar de proveedor mañana sin reescribir. La teoría de **opciones reales** (aplicada a software por Kevin Sullivan y otros a fines de los 90, y por Kent Beck en la programación extrema) explica por qué vale la pena pagar por flexibilidad **cuando la incertidumbre es alta**, y por qué no tiene sentido cuando el futuro es predecible: la flexibilidad tiene un costo, y su valor crece con la incertidumbre. Es la justificación económica de "posponer las decisiones hasta el último momento responsable" del desarrollo ágil.

## Escribir las decisiones
Una decisión importante debería quedar escrita con su contexto, las alternativas consideradas, los criterios, la elección y lo que haría cambiarla (como los registros de decisiones de arquitectura). Annie Duke, en *Thinking in Bets* (2018), advierte contra juzgar una decisión solo por su resultado (*resulting*): una buena decisión puede salir mal por mala suerte, y una mala puede salir bien. Revisar las decisiones escritas, separando la calidad del razonamiento de la suerte del resultado, es la única forma de mejorar como equipo que decide.`);
})();
