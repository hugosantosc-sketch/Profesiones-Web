/* Deducciones y preguntas de criterio: bases y mecánica (parte 1) */
DED('uni',`## Por qué 1 kg/cm² ≈ 0.0981 MPa
1 kgf es la fuerza que la gravedad ejerce sobre 1 kg: 9.81 N. Un cm² es 100 mm². Entonces 1 kgf/cm² = 9.81 N/100 mm² = 0.0981 N/mm² = 0.0981 MPa. Por eso un concreto de 210 kg/cm² es de unos 20.6 MPa.

## Por qué las áreas se convierten al cuadrado
1 m = 100 cm, así que 1 m² = (100 cm)·(100 cm) = 10⁴ cm². Con volúmenes, al cubo: 1 m³ = 10⁶ cm³. Es el error más común de conversión: dividir entre 100 un área en vez de entre 10 000.

## Análisis dimensional
Toda ecuación física debe tener las mismas unidades a ambos lados. Si en σ = P/A pones P en t y A en cm², σ sale en t/cm²: multiplica por 1000 para kg/cm². Revisar unidades atrapa la mayoría de errores antes de terminar el cálculo.`);
CRI('uni',[
['Un proveedor dice que su concreto resiste 28. ¿Qué preguntas primero?',['El color','¿28 en qué unidad? MPa (≈ 280 kg/cm²) o kg/cm² son cosas muy distintas','El precio','La marca del cemento'],1,'Un número sin unidad no significa nada en ingeniería. 28 MPa es un buen concreto; 28 kg/cm² sería un mortero pobre.'],
['Calculas un esfuerzo de 2 500 000 kg/cm² en una viga. ¿Qué indica?',['Que la viga es muy resistente','Casi seguro un error de unidades: ningún material de obra soporta eso','Que hay que usar acero','Nada'],1,'El acero fluye a 4200 kg/cm². Un resultado fuera de orden de magnitud casi siempre es un error de conversión.']]);
REF('uni',['Hibbeler, Mecánica de materiales (capítulo 1, unidades)','NTP ISO 80000 y Sistema Legal de Unidades de Medida del Perú (SLUMP)']);
DED('tri',`## Ley de cosenos
Coloca el triángulo con el lado b sobre el eje x. El tercer vértice está en (a cos C, a sen C). La distancia al otro extremo del lado b, en (b, 0), es c: c² = (a cos C − b)² + (a sen C)² = a²(cos²C + sen²C) − 2ab cos C + b² = a² + b² − 2ab cos C. Si C = 90°, cos C = 0 y queda Pitágoras.

## Ley de senos
Traza la altura h desde el vértice C. Desde un lado: h = b sen A; desde el otro: h = a sen B. Igualando: a/sen A = b/sen B. Vale igual para el tercer lado.

## Cuándo usar cada una
- Conoces dos lados y el ángulo entre ellos: cosenos
- Conoces dos ángulos y un lado: senos
- La ley de senos con dos lados y un ángulo no comprendido puede dar dos soluciones (caso ambiguo): dibújalo.`);
CRI('tri',[
['Midiendo en campo un terreno triangular, conoces dos lados y el ángulo entre ellos. ¿Qué usas para el tercer lado?',['Ley de senos','Ley de cosenos','Pitágoras siempre','Regla de tres'],1,'Con dos lados y el ángulo comprendido, la ley de cosenos da el tercero directamente.'],
['Un plano dice pendiente 30° y tu calculadora da tan 30 = −6.4. ¿Qué pasó?',['La pendiente es negativa','La calculadora está en radianes','El terreno baja','Nada'],1,'tan(30 rad) = −6.4. En grados, tan 30° = 0.577. Siempre verifica el modo DEG/RAD.']]);
REF('tri',['Swokowski y Cole, Álgebra y trigonometría con geometría analítica','Hibbeler, Estática (apéndice de trigonometría)']);
DED('vec',`## Por qué se descompone en componentes
Dos fuerzas no se suman como números: importa su dirección. Pero sus componentes en x y en y sí se suman como números, porque están sobre el mismo eje. Por eso: R_{x} = ΣF_{x}, R_{y} = ΣF_{y}, y luego R = √(R_{x}² + R_{y}²) por Pitágoras.

## De dónde sale F_{x} = F cos θ
Si la fuerza forma un ángulo θ con el eje x, su proyección sobre ese eje es el cateto adyacente del triángulo rectángulo cuya hipotenusa es F: F cos θ. La componente y es el cateto opuesto: F sen θ.

## El momento M = xF_{y} − yF_{x}
El momento es fuerza por distancia perpendicular. La componente F_{y} tiene brazo x (gira en sentido antihorario si x y F_{y} son positivos) y F_{x} tiene brazo y (gira en sentido horario). Es el producto cruz r × F en 2D (Hibbeler, Estática).`);
CRI('vec',[
['Dos cables jalan un poste con 10 kN cada uno, formando 120° entre sí. ¿Cuánto vale la resultante?',['20 kN','10 kN','0 kN','14.1 kN'],1,'Con 120° entre dos fuerzas iguales, la resultante es igual a cada una: 2·10·cos 60° = 10 kN. Sumar magnitudes directamente es un error clásico.'],
['¿Por qué se usa arctan(F_{y}/F_{x}) con cuidado?',['Porque es lento','Porque no distingue cuadrantes: hay que mirar los signos de F_{x} y F_{y}','Porque da radianes siempre','No hay cuidado que tener'],1,'arctan(−1/−1) da 45°, pero la fuerza está en el tercer cuadrante (225°). Dibuja siempre el vector.']]);
DED('sis',`## Regla de Cramer
Para ax + by = e y cx + dy = f: multiplica la primera por d y la segunda por b y réstalas: (ad − bc)x = de − bf. Si det = ad − bc ≠ 0, x = (de − bf)/det. Del mismo modo, y = (af − ce)/det.

## Qué significa det = 0
Las dos ecuaciones son paralelas (no hay solución) o la misma (infinitas soluciones). En estructuras, una matriz de rigidez con determinante cero indica un mecanismo: la estructura es inestable.

## Por qué las matrices
Un pórtico de diez nudos tiene treinta ecuaciones. Escritas como K·u = F, la computadora resuelve por eliminación de Gauss, que es la misma idea de restar ecuaciones de manera ordenada (Chapra y Canale, Métodos numéricos para ingenieros).`);
CRI('sis',[
['Al resolver un sistema de equilibrio te sale det = 0. ¿Qué piensas de la estructura?',['Está perfecta','Probablemente es inestable o el modelo está mal apoyado','Tiene mucho acero','Es hiperestática'],1,'Un determinante nulo en la matriz de equilibrio o de rigidez revela un mecanismo: falta un apoyo o una barra.'],
['¿Para qué sirve saber resolver un sistema 2×2 a mano si el software lo hace?',['Para nada','Para verificar órdenes de magnitud y detectar errores del modelo','Para imprimir','Solo para el examen'],1,'El ingeniero firma los resultados. Saber hacer un modelo simple a mano permite detectar resultados absurdos del programa.']]);
DED('geoan',`## Distancia de un punto a una recta
La distancia más corta va en la dirección perpendicular a la recta. El vector (A, B) es perpendicular a Ax + By + C = 0. Toma cualquier punto P₁ de la recta y proyecta el vector P₁P₀ sobre la dirección normal unitaria (A, B)/√(A² + B²): d = |A(x₀ − x₁) + B(y₀ − y₁)|/√(A² + B²). Como Ax₁ + By₁ = −C, queda d = |Ax₀ + By₀ + C|/√(A² + B²).

## Pendiente
m = Δy/Δx es la tangente del ángulo de la recta con la horizontal. En vías se expresa en porcentaje: m·100.`);
CRI('geoan',[
['Dos ejes de cimentación tienen pendientes m₁ = 2 y m₂ = −0.5. ¿Cómo son entre sí?',['Paralelos','Perpendiculares: m₁·m₂ = −1','Coinciden','No se puede saber'],1,'Dos rectas son perpendiculares cuando el producto de sus pendientes es −1.']]);
DED('vec3',`## Por qué el vector unitario de A a B
Un cable que va de A a B solo puede jalar en esa dirección. El vector B − A apunta hacia allá, y al dividirlo entre su longitud queda de magnitud 1: u. La fuerza del cable es T·u, con sus tres componentes listas para sumar.

## Producto punto y ángulo
A·B = A_{x}B_{x} + A_{y}B_{y} + A_{z}B_{z} = |A||B| cos θ (por la ley de cosenos aplicada al triángulo formado por A, B y A − B). Así se halla el ángulo entre dos barras sin dibujar.

## Producto cruz y momento
M = r × F da un vector perpendicular al plano de r y F, con magnitud |r||F| sen θ: fuerza por distancia perpendicular. Su dirección es el eje de giro (regla de la mano derecha).`);
CRI('vec3',[
['En una torre atirantada, ¿qué componente de la tensión del viento comprime el mástil?',['La horizontal','La vertical','Ninguna','Ambas por igual'],1,'La componente vertical del tirante empuja el mástil hacia abajo. Por eso los tirantes muy verticales comprimen mucho el mástil.']]);
REF('vec3',['Beer, Johnston y Mazurek, Mecánica vectorial para ingenieros: Estática']);
DED('der',`## Por qué dM/dx = V
Toma un trozo de viga de longitud dx. Si la carga es w hacia abajo, el equilibrio vertical da dV = −w·dx. El equilibrio de momentos respecto a un extremo da dM = V·dx (despreciando términos de orden dx²). Por eso dM/dx = V y dV/dx = −w (Gere y Goodno, Mecánica de materiales).

## Consecuencia práctica
- El momento es máximo donde el cortante es cero: ahí la derivada se anula
- El área del diagrama de cortante entre dos puntos es el cambio de momento

## Optimización
Para hallar el máximo o mínimo de una función f(x), derivas e igualas a cero. La segunda derivada dice si es máximo (negativa) o mínimo (positiva). Así se halla la sección más eficiente o el tirante de máxima eficiencia en un canal.`);
CRI('der',[
['En una viga, ¿dónde buscas el momento máximo?',['Siempre al centro','Donde el cortante cambia de signo (V = 0)','En los apoyos','Donde hay más acero'],1,'Por dM/dx = V, el máximo de M está donde V se anula. Con cargas asimétricas no está al centro.']]);
REF('der',['Stewart, Cálculo de una variable','Gere y Goodno, Mecánica de materiales']);
DED('int',`## Por qué la resultante de una carga repartida es su área
Una carga w(x) en un tramo dx equivale a una fuerza w·dx. Sumando todos los tramos: R = ∫w dx, que es el área bajo la curva de carga.

## Por qué actúa en el centroide
La resultante debe producir el mismo momento que la carga repartida. Momento total = ∫x·w dx. Si R actúa en x̄: R·x̄ = ∫x·w dx, de donde x̄ = ∫x·w dx/∫w dx. Para una carga triangular, x̄ queda a 1/3 de la base mayor.

## Regla de la potencia
d(x^{n+1})/dx = (n + 1)x^{n}, así que la antiderivada de x^{n} es x^{n+1}/(n + 1). Es la integral que más usarás: momentos, inercias y volúmenes.`);
CRI('int',[
['Una carga triangular de 0 a 6 kN/m en 3 m. ¿Dónde actúa su resultante?',['Al centro','A 1 m del extremo de 6 kN/m','A 1 m del extremo de 0','En el extremo'],1,'La resultante de un triángulo actúa a 1/3 de la base medido desde el lado de mayor carga: a 1 m de donde vale 6 kN/m.']]);
DED('edo',`## Crecimiento y decaimiento
Si la tasa de cambio de y es proporcional a y: dy/dt = ky. Separando: dy/y = k dt; integrando: ln y = kt + C; y = y₀e^{kt}. Rige el decaimiento de la DBO, la consolidación simplificada, el interés continuo y el enfriamiento.

## Oscilador
La segunda ley de Newton para una masa en un resorte: m·ü = −k·u. Se busca una solución u = A sen(ωt): reemplazando, −mω²A sen ωt = −kA sen ωt, así que ω² = k/m. Es la base de toda la dinámica estructural (Chopra).

## Lectura física
k positiva: crecimiento exponencial; negativa: decaimiento. En el oscilador, más rigidez sube la frecuencia; más masa la baja.`);
CRI('edo',[
['Si duplicas la masa de un edificio sin cambiar su rigidez, su frecuencia:',['Se duplica','Baja √2 veces','No cambia','Se cuadruplica'],1,'ω = √(k/m): con m doble, ω se divide entre √2 y el periodo crece √2 veces.']]);
DED('mvar',`## Derivada parcial
∂z/∂x es la pendiente del terreno si caminas solo en dirección x. Se calcula derivando como si y fuera una constante.

## El gradiente como pendiente máxima
En una dirección de ángulo θ, la pendiente es z_{x} cos θ + z_{y} sen θ, que es el producto punto de ∇z con el unitario (cos θ, sen θ). Ese producto es máximo cuando el unitario apunta igual que ∇z, y vale |∇z|. Por eso el agua baja en la dirección −∇z.

## Volumen de un plano sobre un rectángulo
∫∫(a + bx + cy) dx dy en [0, L_{x}]×[0, L_{y}] = aL_{x}L_{y} + bL_{x}²L_{y}/2 + cL_{x}L_{y}²/2 = L_{x}L_{y}(a + bL_{x}/2 + cL_{y}/2). Es el área por la profundidad en el centro: el promedio de un plano está en su centroide.`);
CRI('mvar',[
['Una plataforma tiene 1 % en x y 1 % en y. ¿Cuál es su pendiente máxima?',['2 %','1.41 %','1 %','0 %'],1,'Las pendientes se componen como vectores: √(1² + 1²) = 1.41 %, en dirección diagonal.']]);
DED('ser',`## Taylor
Toda función suave cerca de x = 0 se aproxima con un polinomio: f(x) ≈ f(0) + f′(0)x + f″(0)x²/2 + … Para e^{x}, todas las derivadas valen 1: 1 + x + x²/2. Para √(1 + x): f′(0) = 1/2, así que 1 + x/2.

## Por qué funcionan las fórmulas de cables y cintas
La longitud de un cable parabólico es una integral de √(1 + y′²). Como y′ es pequeña, √(1 + y′²) ≈ 1 + y′²/2, y la integral sale en forma cerrada: L(1 + 8f²/(3L²)). Lo mismo para la corrección por pendiente de una cinta: √(L² − h²) ≈ L − h²/(2L).

## Fourier
Una señal periódica se escribe como suma de senos de frecuencias múltiplas. Los coeficientes salen de integrar la señal por cada seno; para una onda cuadrada, solo quedan los armónicos impares, con amplitud 4A/(nπ).`);
CRI('ser',[
['¿Hasta dónde vale sen x ≈ x?',['Siempre','Para ángulos pequeños, en radianes: con 10° el error es ~0.5 %','Solo en grados','Nunca'],1,'El error crece con x³/6. Es excelente bajo unos 10° a 15°; no sirve para ángulos grandes.']]);
DED('est',`## Por qué n − 1 en la desviación estándar
Con la media de la muestra, los datos quedan "más cerca" de ella que de la media real: dividir entre n subestimaría la dispersión. Dividir entre n − 1 corrige ese sesgo (corrección de Bessel): se pierde un grado de libertad al estimar la media.

## De dónde sale f′_{cr} = f′_{c} + 1.34s
El ACI 318 pide que el promedio de tres ensayos consecutivos sea mayor que f′_{c} con 99 % de probabilidad. El promedio de 3 tiene desviación s/√3. Con z = 2.33 (1 % de cola): f′_{cr} = f′_{c} + 2.33·s/√3 = f′_{c} + 1.34s. La otra condición (ningún ensayo menor que f′_{c} − 35) da f′_{cr} = f′_{c} + 2.33s − 35, y se usa la mayor (ACI 301 y ACI 214).

## Coeficiente de variación
CV = s/x̄ permite comparar dispersión entre resistencias distintas. Un buen control de obra tiene CV menor que 10 a 15 %.`);
CRI('est',[
['Dos obras tienen la misma media de 250 kg/cm²; una con s = 20 y otra con s = 45. ¿Cuál tiene mejor control?',['La de s = 45','La de s = 20: menos dispersión y menor f′_{cr} requerido','Son iguales','Depende del cemento'],1,'Con s grande hay que diseñar con más sobrerresistencia para cumplir, lo que cuesta más cemento.'],
['¿Por qué la mezcla se diseña con f′_{cr} mayor que f′_{c}?',['Por costumbre','Porque la producción varía: si el promedio fuera f′_{c}, la mitad de los ensayos fallaría','Para gastar más','Por el IGV'],1,'f′_{cr} da el margen estadístico para que casi todos los ensayos superen el mínimo.']]);
REF('est',['ACI 214R, Guide to Evaluation of Strength Test Results of Concrete','Ang y Tang, Probability Concepts in Engineering']);
DED('pro',`## Riesgo de excedencia
La probabilidad de que una avenida de periodo T ocurra en un año es 1/T. La de que no ocurra es 1 − 1/T. Si los años son independientes, la de que no ocurra en n años es (1 − 1/T)^{n}. La de que ocurra al menos una vez: R = 1 − (1 − 1/T)^{n}.

## Consecuencia sorprendente
Con T = n (por ejemplo, 50 años de vida y avenida de 50 años), R ≈ 1 − e^{−1} ≈ 63 %. "Periodo de retorno de 50 años" no significa que ocurrirá cada 50 años.

## Variable normal estandarizada
z = (x − x̄)/s cuenta cuántas desviaciones está x de la media. Con la tabla normal se obtiene la probabilidad. Así se calcula, por ejemplo, el porcentaje de probetas bajo f′_{c}.`);
CRI('pro',[
['Un puente diseñado para 100 años de periodo de retorno y vida útil de 100 años. ¿Probabilidad de que vea esa avenida?',['1 %','Cerca de 63 %','100 %','0 %'],1,'R = 1 − (0.99)^{100} ≈ 0.634. Por eso las obras críticas se diseñan para periodos de retorno mucho mayores que su vida útil.']]);
REF('pro',['Benjamin y Cornell, Probability, Statistics, and Decision for Civil Engineers','Chow, Maidment y Mays, Hidrología aplicada']);
DED('num',`## Newton-Raphson
Cerca de una raíz, la función se parece a su recta tangente: f(x) ≈ f(x_{i}) + f′(x_{i})(x − x_{i}). Igualando a cero se obtiene la siguiente aproximación x_{i+1} = x_{i} − f(x_{i})/f′(x_{i}). Converge muy rápido (el número de decimales correctos se duplica en cada paso) si se parte cerca.

## Trapecio
Se aproxima la curva por segmentos rectos: el área de cada trapecio es h(y_{i} + y_{i+1})/2. Sumando, los puntos interiores aparecen dos veces: (h/2)(y₀ + 2y₁ + … + y_{n}).

## Simpson
Se aproxima por parábolas que pasan por tres puntos. Integrando la parábola se obtiene (h/3)(y₀ + 4y₁ + y₂). Es exacta para polinomios de hasta tercer grado y mucho más precisa que el trapecio con el mismo número de puntos (Chapra y Canale).`);
CRI('num',[
['Para calcular el área de una sección transversal irregular con lecturas cada 5 m, ¿qué método da más precisión con los mismos datos?',['Trapecio','Simpson, si el número de intervalos es par','Contar cuadritos','Ninguno'],1,'Simpson ajusta parábolas y es mucho más preciso que el trapecio para curvas suaves.']]);
REF('num',['Chapra y Canale, Métodos numéricos para ingenieros','Burden y Faires, Análisis numérico']);
DED('reg',`## Mínimos cuadrados
Se busca la recta que minimiza la suma de los cuadrados de los errores verticales: S = Σ(y_{i} − a − bx_{i})². Derivando respecto a a y b e igualando a cero se obtienen dos ecuaciones. Su solución es b = S_{xy}/S_{xx} y a = ȳ − bx̄: la recta siempre pasa por el punto de las medias.

## Por qué cuadrados
Elevar al cuadrado evita que errores positivos y negativos se cancelen y penaliza más los errores grandes. Además, la derivada es lineal y da una solución en forma cerrada (Gauss y Legendre).

## Coeficiente r
r = S_{xy}/√(S_{xx}S_{yy}) está entre −1 y 1. r² es la fracción de la variabilidad de y que explica la recta.`);
CRI('reg',[
['Una regresión de resistencia vs. edad del concreto con datos de 3 a 28 días, ¿sirve para predecir a 5 años?',['Sí, siempre','No con confianza: es extrapolar fuera del rango medido','Sí, si r es alto','Solo con cemento tipo I'],1,'Un buen ajuste dentro del rango no garantiza nada fuera de él. La resistencia real tiende a estabilizarse.']]);
DED('conf',`## Por qué √n
La media de n datos independientes tiene varianza σ²/n (al promediar, los errores se cancelan en parte). Su desviación es σ/√n: el error estándar. Por eso duplicar la precisión exige cuatro veces más muestras.

## La t de Student
Con pocas muestras, s es incierta. William Gosset (que firmaba "Student") mostró que (x̄ − μ)/(s/√n) sigue la distribución t, más ancha que la normal. Con n grande, t se acerca a z = 1.96 al 95 %.

## Tamaño de muestra
Si quieres que el error z·s/√n no supere E, despejas n = (z·s/E)².`);
CRI('conf',[
['Con 3 probetas, el intervalo de confianza de la media es muy ancho. ¿Qué haces si necesitas precisión?',['Inventar datos','Tomar más muestras: el ancho baja con √n','Usar z en vez de t','Ignorarlo'],1,'Con n pequeño, t es grande y s/√n también. La única forma honesta de estrechar el intervalo es más datos.']]);
REF('conf',['Montgomery y Runger, Probabilidad y estadística aplicadas a la ingeniería']);
DED('new',`## Segunda ley
La fuerza neta sobre un cuerpo es igual a su masa por su aceleración: F = ma. En estática a = 0 y queda ΣF = 0: el equilibrio es un caso particular de la dinámica.

## Ecuaciones del movimiento uniformemente acelerado
Si a es constante, la velocidad crece linealmente: v = v₀ + at. La posición es la integral de la velocidad: x = v₀t + ½at². Eliminando t: v² = v₀² + 2ax.

## Peso y masa
La masa (kg) es cantidad de materia; el peso (N) es la fuerza de la gravedad sobre ella: W = mg. En la E.030, la "masa sísmica" se calcula a partir del peso dividiendo entre g.`);
CRI('new',[
['¿Por qué un edificio más pesado recibe más fuerza sísmica?',['Porque cae más','Porque F = m·a: con la misma aceleración del suelo, más masa implica más fuerza','Porque tiene más pisos','No recibe más'],1,'La fuerza sísmica es inercial. Losas y tabiques pesados innecesarios aumentan el sismo de diseño.']]);
DED('ene',`## Trabajo
El trabajo de una fuerza constante en la dirección del movimiento es F·d. Si la fuerza forma un ángulo, solo cuenta la componente a lo largo del desplazamiento: W = F·d·cos θ.

## Energía potencial y cinética
Subir una masa m una altura h exige trabajo mgh contra la gravedad: queda guardado como energía potencial. Al caer, se convierte en cinética: mgh = ½mv², de donde v = √(2gh). Es el mismo resultado de Torricelli para el agua que sale por un orificio.

## Potencia
P = W/t = F·v. Una bomba que eleva Q m³/s a H m necesita P = ρgQH/η: es la potencia hidráulica dividida entre la eficiencia.`);
CRI('ene',[
['Una bomba eleva el doble de caudal a la misma altura. ¿Qué potencia necesita?',['La misma','El doble','La mitad','Cuatro veces'],1,'P = ρgQH/η: la potencia es proporcional al caudal.']]);
DED('osc',`## Periodo
De mü + ku = 0 se obtiene ω = √(k/m) (rad/s). Un ciclo completo es un giro de 2π, por eso T = 2π/ω y f = 1/T.

## Por qué importa
Un edificio de concreto de 10 pisos tiene un periodo cercano a 1 s. Si el suelo vibra con un periodo parecido, entra en resonancia. Rigidizar (subir k) baja el periodo; agregar masa lo sube.

## Péndulo
Para un péndulo simple de longitud L: T = 2π√(L/g). Es la base del aislamiento con péndulo de fricción: el radio de curvatura fija el periodo, sin importar la masa del edificio.`);
CRI('osc',[
['Agregas muros de concreto a un edificio flexible. ¿Qué pasa con su periodo?',['Sube','Baja, porque aumenta mucho k y poco m','No cambia','Se duplica'],1,'Los muros suman mucha rigidez con poca masa adicional: ω sube y T baja.']]);
REF('osc',['Chopra, Dynamics of Structures, capítulo 2','Serway y Jewett, Física para ciencias e ingeniería']);
DED('calor',`## Ley de Fourier
El flujo de calor por conducción es proporcional al área y al gradiente de temperatura: q = −kA·dT/dx. En una pared plana con temperaturas fijas en sus caras, el perfil es lineal y q = kAΔT/L.

## Resistencias en serie
Por cada capa pasa el mismo flujo q. La caída de temperatura en cada capa es ΔT_{i} = q·R_{i}/A. Sumando: ΔT = (q/A)ΣR_{i}. Es igual que resistencias eléctricas en serie: las resistencias se suman, no las conductividades.

## Transmitancia
U = 1/ΣR es el flujo por m² y por grado. Q = UAΔT.`);
CRI('calor',[
['Para aislar un techo de concreto en Puno, ¿qué capa aporta más con poco espesor?',['Más concreto','Poliestireno o lana mineral: k muy bajo da R alto','Una capa de pintura','Ladrillo pastelero'],1,'R = L/k: con k = 0.035, 5 cm de poliestireno equivalen a más de 2 m de concreto.']]);
REF('calor',['Incropera y DeWitt, Fundamentos de transferencia de calor','Norma EM.110 Confort térmico y lumínico con eficiencia energética']);
DED('ondas',`## Por qué los decibeles son logaritmos
El oído percibe intensidades desde 10⁻¹² hasta 1 W/m²: doce órdenes de magnitud. Una escala logarítmica comprime ese rango: L = 10 log(I/I₀). Duplicar la intensidad suma 10 log 2 ≈ 3 dB.

## Suma de fuentes
Se suman intensidades, no decibeles: I_{total} = ΣI₀·10^{L_{i}/10}, y L = 10 log(Σ10^{L_{i}/10}).

## Distancia
Una fuente puntual reparte su potencia en una esfera de área 4πr². La intensidad cae con 1/r², y en decibeles: ΔL = 10 log(r₂²/r₁²) = 20 log(r₂/r₁).

## Ley de masa
Un muro liviano vibra con el sonido como un pistón. Su inercia (masa por área m) y la frecuencia f determinan cuánto se opone: la transmisión cae con (mf)², de ahí 20 log(mf).`);
CRI('ondas',[
['Dos martillos neumáticos de 90 dB juntos. ¿Cuánto suman?',['180 dB','93 dB','90 dB','45 dB'],1,'Dos fuentes iguales duplican la intensidad: +3 dB.']]);
DED('qm1',`## Modelo de Powers
Powers y Brownyard (1947) midieron que un volumen de cemento que se hidrata produce gel que ocupa unas 2.1 veces su volumen. La relación gel/espacio X compara el volumen de gel con el espacio disponible (gel más poros capilares). Con grado de hidratación α y relación a/c: X = 0.68α/(0.32α + a/c). Experimentalmente, la resistencia crece con X³.

## Consecuencia
A menor a/c, menos espacio para poros y más resistencia. Con a/c mayor que 0.42 aproximadamente, incluso con hidratación total quedan poros capilares conectados que hacen permeable al concreto (Neville, Properties of Concrete).

## Agua combinada
La hidratación completa usa unas 0.23 partes de agua por parte de cemento. El resto es agua de trabajabilidad que, al evaporarse, deja poros.`);
CRI('qm1',[
['¿Por qué curar el concreto los primeros 7 días?',['Para que se vea bonito','Para que haya agua y continúe la hidratación: sin ella α se detiene y la resistencia queda baja','Para que no se ensucie','No es necesario'],1,'La hidratación necesita agua. Un concreto que se seca temprano no gana resistencia aunque tenga buen cemento.']]);
REF('qm1',['Neville, Properties of Concrete','Mehta y Monteiro, Concrete: Microstructure, Properties, and Materials','Powers y Brownyard, Studies of the Physical Properties of Hardened Portland Cement Paste (1947)']);
DED('qm2',`## Dilución
La cantidad de soluto no cambia al agregar agua: C₁V₁ = C₂V₂.

## pH
pH = −log[H⁺]. Cada unidad es un factor de 10 en acidez. El concreto tiene pH ≈ 12.5, lo que protege al acero (pasivación). Un agua de amasado ácida o con cloruros rompe esa protección.

## Dureza
Se expresa como CaCO₃ equivalente: cada mg de Ca²⁺ equivale a 100/40 = 2.5 mg de CaCO₃, y cada mg de Mg²⁺ a 100/24.3 = 4.12 mg. Por eso D = 2.5Ca + 4.12Mg.

## Cloración
La dosis debe cubrir la demanda (lo que reacciona con la materia orgánica) y dejar un cloro residual que proteja la red.`);
CRI('qm2',[
['¿Se puede usar agua de mar para amasar concreto armado?',['Sí, sin problema','No: los cloruros corroen el acero','Sí, si se usa más cemento','Solo en verano'],1,'La E.060 y el ACI limitan los cloruros. El agua de mar puede servir en concreto simple, nunca en armado.']]);
DED('qm3',`## Dilatación lineal
Casi todos los materiales se alargan proporcionalmente a su longitud y al cambio de temperatura: ΔL = αLΔT. α del concreto (~10×10⁻⁶) y del acero (~12×10⁻⁶) son casi iguales: por eso el concreto armado funciona sin despegarse.

## Esfuerzo si se impide la dilatación
Si la pieza está restringida, la deformación térmica αΔT se convierte en deformación elástica: σ = EαΔT. No depende de la longitud.

## Juntas
La junta debe absorber ΔL del tramo que se mueve hacia ella, más un margen. Por eso los pavimentos y los edificios largos se cortan en tramos.`);
CRI('qm3',[
['Un edificio de 120 m de largo sin juntas de dilatación en la costa:',['No pasa nada','Puede fisurarse por cambios de temperatura y contracción','Es más rígido y mejor','Se dilata cero'],1,'Las deformaciones de un tramo largo restringido generan fisuras. Se usan juntas o se diseña refuerzo para controlarlas.']]);
DED('qm4',`## Ley de Faraday
La corrosión es una reacción electroquímica: el hierro se oxida liberando electrones. Cada mol de Fe que se disuelve como Fe²⁺ libera 2 moles de electrones (n = 2). La carga total que pasa es I·t; dividida entre la constante de Faraday (96 485 C/mol) da los moles de electrones. Multiplicando por M/n se obtiene la masa: m = ItM/(nF).

## Protección catódica
Se conecta al acero un metal más activo (zinc, magnesio) que se corroe en su lugar: el ánodo de sacrificio. Su vida depende de su masa, su utilización (no se consume todo) y la corriente que entrega.`);
CRI('qm4',[
['¿Por qué un ánodo de zinc protege una tubería de acero?',['Porque es más duro','Porque es más activo: se oxida él y el acero queda como cátodo','Porque aísla','Porque es más barato'],1,'En la serie galvánica el zinc es más activo que el acero. El par galvánico hace que la corrosión se concentre en el zinc.']]);
DED('qm5',`## Tracción indirecta (brasileño)
Al comprimir un cilindro por dos generatrices opuestas, la teoría de la elasticidad muestra que en el plano diametral aparece una tensión casi uniforme σ = 2P/(πDL). El cilindro se parte en dos por ese plano.

## Módulo de rotura
En una viga con carga en los tercios (ASTM C78), el momento en el tercio central es PL/6. Con S = bd²/6: σ = M/S = PL/(bd²).

## Ductilidad
El alargamiento a la rotura (L_{f} − L₀)/L₀ mide cuánto se deforma el acero antes de romperse. La norma exige mínimos porque la ductilidad del acero es la que da aviso antes del colapso.`);
CRI('qm5',[
['¿Por qué se exige alargamiento mínimo al acero de refuerzo?',['Por estética','Porque la ductilidad permite que el elemento se deforme y avise antes de fallar, sobre todo en sismos','Para que pese menos','Para soldarlo'],1,'Un acero frágil rompe sin aviso. La ductilidad es la base del diseño sísmico.']]);
DED('dib1',`## Escala lineal
Escala 1:E significa que 1 unidad en el plano son E en la realidad. L_{real} = L_{plano}·E.

## Escala de áreas
Un rectángulo de a×b en el plano mide (aE)×(bE) en la realidad: el área se multiplica por E². Medir 2 cm² en un plano 1:500 da 2·500² cm² = 50 m².

## Escala gráfica
Las fotocopias y PDFs cambian de tamaño. La escala gráfica (una barra dibujada) cambia junto con el plano y sigue siendo válida; la numérica no.`);
CRI('dib1',[
['Imprimiste un plano 1:50 en A3 en vez de A1. ¿Puedes medir con el escalímetro en 1:50?',['Sí','No: la escala cambió; usa la escala gráfica o las cotas','Sí, multiplicando por 2','Solo en horizontal'],1,'Al reducir el papel, la escala numérica deja de valer. Por eso se acota todo lo importante.']]);
DED('dib2',`## Verdadera magnitud
En una vista en planta, una barra inclinada se ve más corta: solo se ve su proyección horizontal L_{h} = √(Δx² + Δy²). Su longitud real incluye el desnivel: L = √(L_{h}² + Δz²), Pitágoras en 3D.

## Ángulo con la horizontal
El triángulo formado por L_{h} (horizontal) y Δz (vertical) da tan θ = Δz/L_{h}. Es la pendiente de la barra.`);
CRI('dib2',[
['Metraste una diagonal de techo midiéndola en la planta. ¿Qué error cometes?',['Ninguno','La subestimas: falta su componente vertical','La sobreestimas','Depende de la escala'],1,'La planta muestra proyecciones. Las longitudes de elementos inclinados deben corregirse con el desnivel.']]);
DED('dib3',`## Longitud de una barra con ganchos
La barra debe anclarse en los apoyos. La longitud de corte suma la luz libre más los anclajes de cada lado (aquí aproximados como 12d_{b} por gancho, de acuerdo con el detalle del plano).

## Estribos
El perímetro del estribo es el de la sección menos dos veces el recubrimiento en cada dirección, más los ganchos de 135°. Contar bien estribos y ganchos es lo que separa un metrado de acero real de uno subestimado.`);
CRI('dib3',[
['Un plano estructural muestra "3∅5/8″ + 2∅1/2″" en la parte inferior de una viga. ¿Qué significa?',['5 barras de 5/8″','3 barras de 5/8″ y 2 de 1/2″ en la cara inferior','Una sola barra','Estribos'],1,'La notación indica número y diámetro de barras de cada tipo en esa ubicación.']]);
DED('dib4',`## Pendiente en porcentaje
Pendiente = V/H. Multiplicada por 100 da %. Una rampa 1:12 sube 1 por cada 12 horizontales: 8.33 %.

## Ángulo
tan θ = V/H. Una pendiente de 100 % es 45°, no 90°. Un error común es confundir porcentaje con grados.`);
CRI('dib4',[
['Una rampa para silla de ruedas debe tener 8 %. ¿Cuántos grados son?',['8°','Unos 4.6°','45°','0.8°'],1,'θ = arctan(0.08) ≈ 4.57°. Porcentaje y grados no son lo mismo.']]);
DED('dib5',`## Por qué un error cuesta más en obra
En diseño, corregir una interferencia es mover una línea. En obra implica demoler, volver a comprar material, rehacer y perder días. Estudios de la industria (y la regla práctica que usa el subtema) estiman el costo en obra en un orden de magnitud mayor.

## Metrados desde el modelo
Cada elemento BIM es un sólido con volumen y área: el software suma b·h·L de todas las vigas. La calidad del metrado depende de la calidad del modelo: si las vigas se modelaron atravesando las columnas, el concreto se cuenta dos veces.`);
CRI('dib5',[
['El modelo BIM da 15 % más concreto que tu metrado manual. ¿Qué revisas primero?',['Nada, el BIM siempre tiene razón','Si hay elementos superpuestos (vigas dentro de columnas o losas) contados dos veces','La impresora','El IGV'],1,'Un error frecuente es modelar sin uniones limpias. El modelo se revisa como un plano.']]);
DED('par',`## Equilibrio de una partícula
Si todas las fuerzas pasan por un punto, no hay momento: solo deben anularse las sumas en x e y. Son dos ecuaciones, así que se pueden hallar dos incógnitas (por ejemplo, las tensiones de dos cables).

## Diagrama de cuerpo libre
El paso más importante: aislar el punto, dibujar todas las fuerzas que actúan sobre él (pesos, tensiones, reacciones) con sus direcciones. Un cable solo jala; un puntal puede empujar o jalar (Hibbeler, Estática).`);
CRI('par',[
['Un peso cuelga de dos cables casi horizontales. ¿Qué pasa con la tensión?',['Es muy pequeña','Es muy grande: con ángulos pequeños, la componente vertical es mínima y T = W/(2 sen θ) crece mucho','Es igual al peso','Es cero'],1,'Por eso las eslingas de izaje a menos de 45° son peligrosas.']]);
DED('mom',`## Momento de una fuerza
Fuerza por distancia perpendicular al punto. Su efecto es hacer girar.

## Reacciones de una viga simple
Tomando momentos respecto al apoyo A, la reacción en B debe equilibrar a la carga: R_{B}·L = P·a, de donde R_{B} = Pa/L. La otra sale de ΣF_{y} = 0.

## Carga repartida
Se reemplaza por su resultante (el área) en su centroide, solo para calcular reacciones. Para diagramas internos se vuelve a la carga real.`);
CRI('mom',[
['Una carga se acerca al apoyo A. ¿Qué reacción crece?',['R_{B}','R_{A}','Ambas igual','Ninguna'],1,'R_{A} = P(L − a)/L: con a pequeña, casi toda la carga va a A.']]);
DED('arm',`## Determinación estática
Cada nudo da dos ecuaciones (ΣF_{x} = ΣF_{y} = 0): 2n en total. Las incógnitas son las fuerzas de barras (b) y las reacciones (r). Si b + r = 2n, la armadura es isostática (si además es estable).

## Método de las secciones
Corta la armadura y toma momentos respecto al punto donde se cruzan las otras dos barras cortadas: queda una sola incógnita. Para una cuerda de una armadura de altura h, la fuerza es M/h: como el par interno de una viga.`);
CRI('arm',[
['¿Qué barras de una armadura de techo están en compresión con carga de gravedad?',['La cuerda inferior','La cuerda superior','Ninguna','Todas en tensión'],1,'Como en una viga simple, la parte superior se comprime y la inferior se tensa. Las barras comprimidas se revisan por pandeo.']]);
DED('cen',`## Centroide
Es el punto donde se puede concentrar el área para calcular su momento estático: ȳ·ΣA = ΣA_{i}y_{i}.

## Inercia de un rectángulo
I = ∫y²dA = ∫_{−h/2}^{h/2} y²·b dy = b·[y³/3] = bh³/12. El h³ explica por qué una viga peraltada es tan rígida: duplicar la altura multiplica la inercia por 8.

## Ejes paralelos (Steiner)
I = ∫(y₀ + d)²dA = ∫y₀²dA + 2d∫y₀dA + d²∫dA. El término del medio es cero si y₀ se mide desde el centroide. Queda I = I₀ + Ad².`);
CRI('cen',[
['Una tabla de 5×20 cm, ¿cómo resiste mejor como viga?',['Echada (5 cm de alto)','De canto (20 cm de alto): su inercia es 16 veces mayor','Igual','Depende de la madera'],1,'Echada: 20·5³/12 = 208 cm⁴. De canto: 5·20³/12 = 3333 cm⁴, es decir (20/5)² = 16 veces más.']]);
DED('fri',`## Ley de Coulomb de la fricción
La fuerza máxima de fricción es proporcional a la normal: F = μN. Si se inclina un plano hasta que el bloque empieza a deslizar, en ese momento W sen φ = μW cos φ, y μ = tan φ. El ángulo de fricción interna de los suelos sigue la misma idea.

## Factor de seguridad
FS = resistencia disponible/fuerza que la moviliza. En muros, FS al deslizamiento = μN/H ≥ 1.5.`);
CRI('fri',[
['¿Por qué una zapata más cargada resiste más el deslizamiento?',['Porque es más grande','Porque la fricción crece con la fuerza normal','No resiste más','Por el concreto'],1,'F = μN: más carga vertical, más fricción. Por eso se busca peso sobre la zapata del muro.']]);
DED('cab',`## Cable parabólico
Corta el cable en el punto más bajo y en un punto a x de él. Las fuerzas son la horizontal H (constante en todo el cable, porque la carga es vertical), la carga w·x y la tensión en el corte. Tomando momentos respecto al corte: H·y = w·x²/2. Con y = f en x = L/2: H = wL²/(8f).

## Analogía con la viga
wL²/8 es el momento de una viga simple. El cable lo resiste con H por el brazo f: no tiene rigidez a flexión, así que cambia de forma hasta que cada sección esté en equilibrio solo con tensión.

## Longitud
S = ∫√(1 + y′²)dx con y = 4fx(L − x)/L² y la aproximación √(1 + u) ≈ 1 + u/2 da L[1 + (8/3)(f/L)²].`);
CRI('cab',[
['Quieres un cable más tenso (menos flecha) para que "se vea mejor". ¿Qué pasa con H?',['Baja','Sube: H = wL²/(8f) es inversa a la flecha','No cambia','Se anula'],1,'Reducir la flecha a la mitad duplica la tensión horizontal. Los anclajes y el cable deben resistirla.']]);
REF('cab',['Irvine, Cable Structures','Hibbeler, Estática (capítulo de cables)']);
DED('esp3',`## Seis ecuaciones
En el plano hay tres ecuaciones de equilibrio; en el espacio, seis: tres de fuerza y tres de momento. Así se resuelven hasta seis incógnitas.

## Trípode
Por simetría, las tres patas llevan la misma fuerza F. Cada una aporta una componente vertical F sen θ. La suma debe igualar al peso: 3F sen θ = W.`);
CRI('esp3',[
['Un trípode con patas más abiertas (θ menor) para la misma carga:',['Lleva menos fuerza por pata','Lleva más fuerza por pata y empuja más hacia afuera en el piso','Igual','Ninguna'],1,'F = W/(3 sen θ): con θ menor, F crece. Además aumenta la componente horizontal que deben tomar los apoyos.']]);
