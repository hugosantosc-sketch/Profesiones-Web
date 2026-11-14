(function () {
var D = SDC.D;
SDC.XM('hci', { prof: true });

D('hci.ucd', `## Modelos mentales
Cada persona usa un sistema con una idea propia de cómo funciona: su **modelo mental**. Don Norman distingue el **modelo del diseñador** (cómo cree quien lo diseñó que funciona), la **imagen del sistema** (lo que el sistema muestra: pantallas, mensajes, comportamiento) y el modelo del usuario, que solo se forma a partir de esa imagen, porque el usuario no habla con el diseñador. Si la imagen es confusa, el modelo será equivocado, y la persona cometerá errores "lógicos" según su modelo. Un ejemplo de PatioApp: si el botón "Cerrar" en la ficha de una estadía cierra la ventana en una pantalla y **cobra la estadía** en otra, los operadores formarán un modelo en el que "cerrar" es inofensivo, y cobrarán por accidente. La solución no es capacitar más, sino que la imagen del sistema sea coherente: "Registrar salida y cobrar" para la acción y una "×" para la ventana.

## Diseñar para el contexto real
Lo que funciona en una oficina con un monitor grande puede fracasar en la garita de un patio: sol directo sobre la pantalla, guantes, ruido, prisa, conexión intermitente y un camión esperando. La **investigación contextual** (*contextual inquiry*, de Hugh Beyer y Karen Holtzblatt) consiste en observar a las personas en su lugar de trabajo mientras trabajan, haciendo preguntas como un aprendiz a un maestro. Revela cosas que nadie mencionaría en una entrevista: el papel pegado al monitor con las placas frecuentes, la calculadora al lado del teclado porque el sistema no muestra el total con IGV, el cuaderno donde se anotan las salidas cuando falla la red. Cada uno de esos parches es un requisito no dicho.

## Diseño centrado en el usuario y negocio
El diseño centrado en el usuario no significa hacer todo lo que los usuarios piden: Henry Ford supuestamente dijo que, si hubiera preguntado, le habrían pedido caballos más rápidos (la frase no tiene fuente comprobada, pero la idea es útil). Significa entender **sus objetivos y su contexto**, y equilibrarlos con los del negocio y las restricciones técnicas. El marco de IDEO resume las tres condiciones de una buena solución: **deseable** (la gente la quiere), **factible** (se puede construir) y **viable** (sostiene al negocio).`);

D('hci.usab', `## Cuántos usuarios hacen falta
En 1993, Jakob Nielsen y Thomas Landauer modelaron cuántos problemas de usabilidad encuentra una prueba según el número de participantes: cada usuario descubre en promedio cerca del 31 % de los problemas, y los siguientes repiten muchos de los ya vistos. La fórmula es: problemas encontrados = 1 − (1 − 0,31)ⁿ. Con 5 usuarios se encuentra alrededor del 85 %. La conclusión práctica de Nielsen no es "5 usuarios bastan siempre", sino que **conviene hacer varias rondas pequeñas** (5 usuarios, corregir, otros 5) en lugar de una grande, porque después de corregir aparecen problemas que los primeros errores ocultaban. Si hay grupos de usuarios muy distintos (operadores de garita y supervisores), se necesitan participantes de cada grupo.
~~~js
const encontrados = n => 1 - Math.pow(1 - 0.31, n);
for (const n of [1, 3, 5, 10, 15]) console.log(n, 'usuarios →', Math.round(encontrados(n) * 100) + ' %');
// 1 → 31 %, 3 → 67 %, 5 → 84 %, 10 → 98 %, 15 → 100 %
~~~

## Cómo conducir una sesión
1. **Preparar tareas realistas**, sin revelar el camino: "Llegó el camión con placa XYZ-987 y se va hoy. Regístralo y entrega el comprobante" en vez de "Haz clic en Salidas".
2. **Pedir que piensen en voz alta** y, sobre todo, **no ayudar**: cuando alguien se traba, la tentación de explicar es enorme, pero ese momento es exactamente el dato. Se responde con preguntas: "¿Qué esperabas que pasara?".
3. **Registrar** con permiso (pantalla y voz), con una persona que modera y otra que toma notas.
4. **Medir** por tarea: si la completó, el tiempo, los errores y la satisfacción (con SUS al final).
5. **Analizar** juntos: listar los problemas observados, cuántos participantes los tuvieron y su gravedad, y priorizar.
Las pruebas pueden ser **presenciales**, **remotas moderadas** (por videollamada) o **remotas no moderadas** (herramientas que graban a participantes resolviendo tareas por su cuenta), más baratas pero sin la posibilidad de preguntar.

## Medir con números: tasas y tiempos
Las métricas clásicas de la norma ISO 9241-11 son **eficacia** (porcentaje de tareas completadas), **eficiencia** (tiempo o pasos por tarea) y **satisfacción**. Con muestras pequeñas, los porcentajes son poco precisos: que 4 de 5 completen una tarea es compatible con una tasa real entre aproximadamente 36 % y 98 % (intervalo de confianza del 95 % con el método de Wald ajustado). Por eso las pruebas pequeñas sirven para **encontrar** problemas, y para **medir** con precisión hacen falta más participantes o datos de uso reales.`);

D('hci.a11y', `## Las cuatro ideas de WCAG
Las pautas WCAG se organizan en cuatro principios, conocidos por sus iniciales en inglés como **POUR**:
- **Perceptible:** la información debe poder percibirse por al menos un sentido: texto alternativo en imágenes, subtítulos en videos, contraste suficiente, no depender solo del color.
- **Operable:** todo debe poder usarse con distintos medios: teclado (sin trampas de foco), tiempo suficiente, nada que parpadee más de tres veces por segundo, objetivos táctiles de tamaño adecuado (WCAG 2.2 pide al menos 24 × 24 píxeles).
- **Comprensible:** lenguaje claro, comportamiento predecible, ayuda para evitar y corregir errores en formularios.
- **Robusto:** código que las tecnologías de apoyo puedan interpretar, empezando por HTML válido y semántico.
Cada pauta tiene criterios verificables en tres niveles: **A** (mínimo), **AA** (el nivel exigido por la mayoría de las leyes y contratos) y **AAA** (máximo, no exigible en todo contenido).

## Probar con un lector de pantalla
Ninguna herramienta automática sustituye usar el sitio como lo usa una persona ciega. Los lectores de pantalla más comunes son **NVDA** (gratuito, para Windows, creado por dos desarrolladores australianos ciegos en 2006), **JAWS** (comercial, Windows), **VoiceOver** (incluido en macOS y iOS) y **TalkBack** (Android). Una prueba básica de diez minutos: navegar solo con el teclado (Tab, Mayús+Tab, Enter, Espacio, flechas) y comprobar que el foco siempre se ve y sigue un orden lógico; luego, con el lector activado, saltar por encabezados y por formularios y escuchar si cada control dice qué es, cómo se llama y en qué estado está ("casilla, convenio, no marcada"). La mayoría de los problemas aparece en esos diez minutos.

## Accesibilidad cognitiva y de situación
La discapacidad no es solo visual o motora. Las pautas de **accesibilidad cognitiva** (del grupo COGA del W3C) recomiendan textos cortos y directos, un objetivo por pantalla, no exigir memorizar información de un paso a otro, permitir pegar códigos en lugar de obligar a tipearlos y dar más tiempo. Además, todos tenemos **limitaciones de situación**: una mano ocupada, el sol sobre la pantalla, un lugar ruidoso, el estrés de una fila de camiones. Microsoft lo describe con su espectro de discapacidad **permanente, temporal y situacional**: un brazo ausente, un brazo enyesado y un brazo cargando a un bebé comparten la misma necesidad de diseño. Diseñar para el caso permanente beneficia a muchísimas más personas.`);
})();
