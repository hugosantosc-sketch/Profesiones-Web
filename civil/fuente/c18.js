/* Deducciones y criterio: concreto II, preesforzado, puentes, dinámica, matricial, madera y patología */
DED('dre',`## Ancho efectivo del ala
La losa colabora con la viga, pero el esfuerzo de compresión no es uniforme en todo el ancho: cae lejos del alma por el "retraso por cortante". El ancho efectivo es un ancho ficticio con esfuerzo uniforme que da la misma fuerza; la norma lo limita con L/4, b_{w} + 16h_{f} y la separación entre vigas.

## Viga T
Si el bloque de compresión a cae dentro del ala, la viga se calcula como rectangular de ancho b. Si no, se separa: el ala sobresaliente comprimida (A_{sf}) y el alma, cada una con su par.

## Doble refuerzo
El acero en compresión A′_{s} forma un segundo par con una cantidad igual de acero en tensión, de brazo d − d′. Así se aumenta la resistencia sin agrandar la sección y se mejora la ductilidad.`);
CRI('dre',[
['¿Por qué el acero en compresión mejora la ductilidad de una viga?',['No la mejora','Porque reduce la profundidad del eje neutro: el acero en tensión fluye más antes de que el concreto falle','Porque pesa más','Por el sismo'],1,'Con menos concreto comprimido, c baja y la deformación del acero en tensión al fallar aumenta.']]);
REF('dre',['Nilson, Darwin y Dolan, Diseño de estructuras de concreto','Harmsen, Diseño de estructuras de concreto armado']);
DED('anc',`## Longitud de desarrollo
Para que una barra llegue a f_{y}, la adherencia a lo largo de su longitud debe transmitir la fuerza A_{b}f_{y}. Si u es el esfuerzo medio de adherencia: u·(πd_{b})·l_{d} = (πd_{b}²/4)f_{y}, de donde l_{d} = f_{y}d_{b}/(4u). La adherencia depende de √f′_{c}; por eso l_{d} ∝ f_{y}d_{b}/√f′_{c}. Los factores ψ corrigen por barras superiores (más agua de exudación debajo), recubrimiento epóxico y diámetro.

## Ganchos
Un gancho ancla mecánicamente: necesita menos longitud recta.

## Empalmes clase B
Se exige 1.3l_{d} porque en la zona del empalme se transmite la fuerza de una barra a otra a través del concreto, con más riesgo de fisuración.`);
CRI('anc',[
['¿Por qué las barras superiores de una viga peraltada necesitan más longitud de anclaje?',['No necesitan más','Porque debajo de ellas se acumula agua de exudación y la adherencia es menor','Porque son más largas','Por el sismo'],1,'El factor ψ_{t} = 1.3 corrige la peor adherencia de barras con más de 30 cm de concreto debajo.']]);
DED('fcp',`## Diagrama de interacción
Cada posición del eje neutro c define un estado de deformaciones (con ε_{cu} = 0.003 en la fibra extrema). De ahí salen los esfuerzos en cada capa de acero (f_{s} = 6000(c − d)/c ≤ f_{y}) y la fuerza del concreto. Sumando fuerzas se obtiene P_{n}; sumando momentos respecto al centroide, M_{n}. Variando c desde la compresión pura hasta la flexión pura se dibuja la curva.

## Punto balanceado
Cuando el acero en tensión llega justo a f_{y} al mismo tiempo que el concreto a 0.003: c_{b} = 6000d/(6000 + f_{y}). Por encima de ese punto la falla es por compresión (frágil); por debajo, por tensión (dúctil).

## Excentricidad
Una pareja (P_{u}, M_{u}) equivale a P_{u} con excentricidad e = M_{u}/P_{u}. El punto debe quedar dentro de la curva φP_{n}–φM_{n}.`);
CRI('fcp',[
['En una columna, aumentar la carga axial (por debajo del punto balanceado) puede:',['Siempre reducir el momento resistente','Aumentar el momento resistente: la compresión retrasa la fluencia en tensión','No cambia nada','Hacerla de acero'],1,'Por debajo del balanceado, más carga axial aumenta M_{n}. Por eso considerar cargas muertas mínimas puede ser lo crítico.']]);
REF('fcp',['MacGregor y Wight, Reinforced Concrete: Mechanics and Design','Ottazzi Pasino, Apuntes de Concreto Armado (PUCP)']);
DED('l2d',`## Coeficientes de momento
Una losa apoyada en sus cuatro bordes reparte la carga en dos direcciones. Para una franja en cada dirección, las flechas en el centro deben coincidir. Con franjas simplemente apoyadas: w_{a}l_{a}⁴ = w_{b}l_{b}⁴, así que la dirección corta toma más carga: w_{a}/w = l_{b}⁴/(l_{a}⁴ + l_{b}⁴). El método de coeficientes de la E.060 (heredado del ACI 1963) tabula C según m y los bordes continuos.

## Espesor mínimo
h ≈ perímetro/180 es una regla práctica peruana para controlar flechas en losas macizas apoyadas en vigas.`);
CRI('l2d',[
['Una losa de 4×8 m apoyada en sus cuatro bordes:',['Trabaja igual en ambas direcciones','Trabaja casi en una dirección: la corta toma la mayor parte','Trabaja solo en la larga','No necesita acero'],1,'Con m = 0.5, la relación l_{b}⁴/(l_{a}⁴ + l_{b}⁴) = 16/17: la dirección corta toma 94 %.']]);
DED('pla',`## Aporte del concreto
Un muro de corte es una viga en voladizo de gran peralte. El concreto resiste corte por el puntal diagonal entre fisuras; α_{c} depende de la esbeltez h_{m}/l_{m}: muros bajos (α_{c} mayor) resisten más por unidad de área.

## Aporte del acero horizontal
Las fisuras diagonales atraviesan el refuerzo horizontal en una longitud de muro: V_{s} = A_{cw}ρ_{h}f_{y}. Es la analogía de la armadura del corte en vigas.

## Límite
V_{n} ≤ 2.6√f′_{c}A_{cw} evita que el concreto del puntal se aplaste antes de que el acero fluya.`);
CRI('pla',[
['Un edificio de 12 pisos en Lima sin placas, solo con pórticos de columnas de 40×40:',['Está bien','Tendrá derivas grandes: en el Perú las placas controlan la deriva','Es más barato y seguro','No importa'],1,'Los edificios peruanos de mediana altura se estructuran con placas para cumplir la deriva de 0.007.']]);
REF('pla',['Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado','E.060, capítulo 11 y 21 (muros)']);
DED('esc',`## Regla del paso
La fórmula de Blondel (siglo XVII): 2 contrapasos + 1 paso ≈ 60–64 cm, la longitud de un paso humano normal. Una escalera fuera de ese rango es incómoda y peligrosa.

## Peso propio
La garganta inclinada de espesor t tiene, por metro horizontal, un volumen t/cos θ. Los peldaños agregan un triángulo de altura cp: en promedio cp/2. Por eso w_{pp} = 2.4(cp/2 + t/cos θ) t/m².

## Diseño
Se modela como una losa inclinada en una dirección con la luz horizontal: M = w_{u}L²/8 si está simplemente apoyada.`);
CRI('esc',[
['Una escalera con contrapasos de 22 cm y pasos de 22 cm:',['Es cómoda','Es demasiado empinada: 2·22 + 22 = 66 cm y además el contrapaso supera los máximos usuales','Es perfecta','No hay reglas'],1,'El RNE limita contrapasos (unos 18 cm) y pasos mínimos. Una escalera empinada causa caídas.']]);
DED('pe1',`## Superposición
El preesfuerzo P con excentricidad e equivale a una compresión P y un momento −P·e. Las cargas producen el momento M. Por elasticidad se suman: f = P/A ± Pe/S ∓ M/S.

## P mínimo
Para que la fibra inferior no quede en tensión con la carga de servicio: P/A + Pe/S_{b} − M/S_{b} ≥ 0. Despejando P se obtiene la expresión del subtema. Es la idea de Freyssinet (1928): comprimir el concreto de antemano para que la carga nunca lo tensione.`);
CRI('pe1',[
['¿Por qué se revisan esfuerzos en transferencia (sin carga) y en servicio?',['Por costumbre','Porque al transferir el preesfuerzo, sin carga muerta completa, la fibra superior puede tensionarse','Porque el concreto cambia de color','No se revisan'],1,'En transferencia el momento de carga es pequeño y el efecto del preesfuerzo domina; en servicio ocurre lo contrario.']]);
REF('pe1',['Lin y Burns, Design of Prestressed Concrete Structures','Nawy, Prestressed Concrete: A Fundamental Approach']);
DED('pe2',`## Fricción
En un tramo curvo, la presión del cable contra el ducto es P/R por metro; la fricción es μP/R por metro. Integrando dP/P = −μ dα (con dα = dx/R) más un término de "bamboleo" K: P(x) = P₀e^{−(μα + Kx)}.

## Acortamiento elástico
Al transferir, el concreto se acorta f_{cgp}/E_{c}; el acero adherido se acorta igual y pierde n·f_{cgp}.

## Diferidas
Flujo plástico, contracción y relajación del acero se suman con el tiempo. El total suele estar entre 15 y 25 % de la fuerza inicial.`);
CRI('pe2',[
['¿Por qué el acero de preesfuerzo es de alta resistencia y no el de refuerzo común?',['Por el precio','Porque las pérdidas (unos 200 MPa) consumirían casi todo el preesfuerzo de un acero común','Porque es más liviano','No importa'],1,'Con f_{y} = 420 MPa se perdería casi todo. Con 1860 MPa, la pérdida es un porcentaje tolerable.']]);
DED('pe3',`## Por qué f_{ps} < f_{pu}
En rotura, el acero de preesfuerzo no tiene un escalón de fluencia: su esfuerzo depende de cuánto se deforma, y eso depende de cuánto concreto se comprime. La ecuación aproximada del ACI se calibró con compatibilidad de deformaciones: con más acero (ρ_{p} mayor), el eje neutro baja y el acero se deforma menos.

## Momento
Igual que en concreto armado: equilibrio para a y par interno A_{ps}f_{ps}(d_{p} − a/2).`);
CRI('pe3',[
['¿El preesfuerzo aumenta mucho la resistencia última a flexión de una sección?',['Sí, siempre mucho','No mucho: su gran ventaja es en servicio (sin fisuras y menos flecha), la resistencia depende sobre todo del acero de alta resistencia','Nada','La reduce'],1,'En rotura la sección trabaja casi como una de concreto armado con acero de alta resistencia.']]);
DED('pe4',`## Carga equivalente del cable
Un cable parabólico de flecha e tensado con P ejerce sobre el concreto una carga uniforme hacia arriba. Se obtiene del cable de la estática: H·f = wL²/8, con H = P y f = e: w_{b} = 8Pe/L². T. Y. Lin (1963) propuso diseñar eligiendo P para "balancear" una parte de la carga: la viga queda sin flexión bajo esa carga y solo con compresión uniforme.

## Carga neta
Solo la diferencia w − w_{b} produce flexión y flecha.`);
CRI('pe4',[
['Si balanceas el 100 % de la carga muerta más la viva:',['Es lo ideal','Bajo carga muerta sola, la viga tendrá contraflecha y tensión arriba','No hay problema','La viga no necesita concreto'],1,'Lo usual es balancear la carga permanente: así la viga queda casi recta la mayor parte del tiempo.']]);
DED('pu1',`## Carga de carril
9.3 kN/m uniforme: su momento máximo en un tramo simple es wL²/8.

## Camión en el centro
Usando la línea de influencia del momento al centro (ordenada máxima L/4 bajo la carga y x/2 a una distancia x del apoyo), cada eje contribuye con su peso por su ordenada.

## IM
El impacto dinámico de 33 % se aplica solo al camión o tándem, no a la carga de carril, porque la carga de carril representa vehículos livianos repartidos.

## Origen
HL-93 (Kulicki y Mertz) se calibró para que los momentos y cortes envolvieran los de camiones reales que circulaban en EE. UU. en los años 90.`);
CRI('pu1',[
['¿Por qué el tándem gobierna en puentes cortos y el camión en los largos?',['Por casualidad','En luces cortas solo caben ejes cercanos; en luces largas los tres ejes del camión producen más momento','Por el color','No es así'],1,'El tándem concentra 220 kN en 1.2 m: en luces cortas produce más momento que el camión.']]);
REF('pu1',['AASHTO LRFD Bridge Design Specifications, sección 3.6','Barker y Puckett, Design of Highway Bridges']);
DED('pu2',`## Factor de distribución
Un camión no se reparte por igual entre todas las vigas. AASHTO ajustó, con análisis de elementos finitos de cientos de puentes (Zokaie, NCHRP 12-26), fórmulas del factor g en función de la separación S, la luz L y la rigidez longitudinal K_{g}. Más separación, más carga por viga; más luz, más reparto.

## Presencia múltiple
Es poco probable que todos los carriles tengan su camión más pesado al mismo tiempo. m = 1.20 para un carril (cubre camiones más pesados que el de diseño), 1.00 para dos, 0.85 para tres.`);
CRI('pu2',[
['¿Por qué m = 1.2 con un solo carril cargado?',['Error','Porque la calibración usó camiones reales: un solo camión puede ser más pesado que el de diseño','Por la lluvia','Por el impacto'],1,'Con un carril, el factor cubre la posibilidad de un vehículo excepcionalmente pesado.']]);
DED('pu3',`## LRFD
Cada carga se multiplica por un factor γ según su incertidumbre: la carga muerta de componentes (DC) se conoce bien (1.25); la del asfalto (DW) puede crecer con recapeos (1.50); la viva es la más incierta (1.75). La resistencia se multiplica por φ < 1. Los factores se calibraron con probabilidad de falla objetivo (índice de confiabilidad β = 3.5, Nowak 1999).

## Servicio
Para fisuras y flechas, se usan cargas sin mayorar: es lo que el puente ve normalmente.`);
CRI('pu3',[
['¿Por qué DW tiene factor 1.50 y DC 1.25?',['Al azar','Porque el asfalto se recapea y su peso real es más incierto que el de la estructura','Porque pesa más','Igual'],1,'Los factores reflejan la variabilidad: el espesor de asfalto suele crecer con los años.']]);
DED('pu4',`## Factor de forma
Un elastómero se aplasta, pero las placas de acero intercaladas impiden que se abombe lateralmente. Cuanto más ancho y más delgada la capa, más restringido: S = área cargada/área lateral libre = LW/(2h_{ri}(L + W)). Un S alto da mucha rigidez vertical con poca rigidez horizontal.

## Corte
El apoyo debe permitir el movimiento térmico del tablero por corte: la deformación por corte Δ/h_{rt} se limita a 0.5, de ahí h_{rt} ≥ 2Δ_{s}.`);
CRI('pu4',[
['¿Qué pasa si se coloca un apoyo elastomérico sin placas de acero en un puente?',['Nada','Se abomba y se aplasta mucho: pierde rigidez vertical','Mejora el sismo','Dura más'],1,'Las placas de refuerzo son las que dan rigidez vertical al confinar el caucho.']]);
DED('vf',`## Factor de amplificación dinámica
Para una carga armónica F₀ sen(ωt) sobre un oscilador amortiguado, la solución estacionaria tiene amplitud u_{est}·FAD, con FAD = 1/√((1 − r²)² + (2ζr)²). Se obtiene reemplazando u = U sen(ωt − φ) en la ecuación de movimiento (Chopra, capítulo 3).

## Resonancia
Con r = 1, el primer término se anula y FAD = 1/(2ζ). Con ζ = 5 %, la respuesta es 10 veces la estática.

## Lejos de la resonancia
Para r muy grande, FAD → 1/r²: la masa no alcanza a seguir la carga. Es el principio del aislamiento de vibraciones de máquinas y del aislamiento sísmico.`);
CRI('vf',[
['Una máquina gira a 1800 rpm sobre una losa de frecuencia propia 30 Hz. ¿Problema?',['No','Sí: 1800 rpm = 30 Hz, está en resonancia','Solo si llueve','Depende del color'],1,'Hay que cambiar la rigidez de la losa o montar la máquina sobre aisladores para alejar r de 1.']]);
DED('gd2',`## Problema de valores propios
Para vibración libre sin amortiguamiento: [M]ü + [K]u = 0. Buscando soluciones u = φ sen(ωt): ([K] − ω²[M])φ = 0. Hay solución no nula solo si el determinante es cero: es la ecuación característica, cuyas raíces son las frecuencias.

## Dos pisos iguales
Con k₁ = k₂ = k y m₁ = m₂ = m, la ecuación da ω² = (3 ∓ √5)k/(2m): ω₁² = 0.382k/m y ω₂² = 2.618k/m. Las formas de modo salen de reemplazar cada ω en una fila de la ecuación.`);
CRI('gd2',[
['¿Qué representa la forma del primer modo?',['Nada','El patrón de deformación en que vibra con su frecuencia más baja: suele dominar la respuesta sísmica','Solo el último piso','La planta'],1,'En edificios regulares el primer modo concentra la mayor parte de la masa efectiva.']]);
DED('mod',`## Superposición modal
La respuesta total es la suma de las respuestas de cada modo. Pero los máximos de cada modo no ocurren al mismo tiempo. Sumarlos en valor absoluto (ABS) es muy conservador. Rosenblueth propuso la raíz cuadrada de la suma de cuadrados (SRSS), válida si las frecuencias están separadas; si están cerca, se usa la combinación cuadrática completa (CQC).

## Masa efectiva
Γ mide cuánto se excita cada modo con un movimiento uniforme de la base. La masa efectiva Γ²·(φ^{T}Mφ) indica qué fracción de la masa participa: la E.030 pide considerar modos hasta sumar al menos el 90 %.`);
CRI('mod',[
['Un edificio tiene dos modos con periodos muy parecidos (0.50 y 0.52 s). ¿SRSS o CQC?',['SRSS','CQC: con frecuencias cercanas, los modos están correlacionados','ABS','Ninguno'],1,'SRSS supone independencia; con frecuencias cercanas subestima la respuesta.']]);
DED('sis2',`## Distancia al foco
La onda P (más rápida) y la S llegan en tiempos distintos. Con distancia d: t_{S} − t_{P} = d/V_{s} − d/V_{p}. Despejando: d = Δt·V_{p}V_{s}/(V_{p} − V_{s}).

## Energía y magnitud
Gutenberg y Richter (1956) relacionaron la energía liberada con la magnitud: log E = 1.5M + 4.8 (E en J). Un grado más de magnitud significa 10^{1.5} ≈ 32 veces más energía.

## Gutenberg-Richter
log N = a − bM: los sismos pequeños son mucho más frecuentes que los grandes, con b ≈ 1.`);
CRI('sis2',[
['¿Magnitud o intensidad decide el daño en tu ciudad?',['Solo la magnitud','La intensidad: depende de la magnitud, la distancia, la profundidad y el suelo local','Ninguna','La hora'],1,'Un sismo de magnitud 8 lejano puede dañar menos que uno de magnitud 6 superficial bajo la ciudad.']]);
REF('sis2',['Kramer, Geotechnical Earthquake Engineering (sismología)','Instituto Geofísico del Perú (IGP), catálogo sísmico']);
DED('mk1',`## Transformación de coordenadas
Una barra solo tiene rigidez axial AE/L en su propia dirección. Un desplazamiento global (u, v) del nudo se proyecta sobre la barra como u·c + v·s, con c = cos θ y s = sen θ. La fuerza axial resultante se vuelve a proyectar a x e y. Al multiplicar las dos proyecciones aparecen c², cs y s²: k₁₁ = (AE/L)c², k₁₂ = (AE/L)cs.

## Fuerza axial
N = (AE/L)·(alargamiento) = (AE/L)[(u₂ − u₁)c + (v₂ − v₁)s].`);
CRI('mk1',[
['El programa da desplazamientos enormes en un nudo de una armadura. ¿Qué revisas?',['Nada','Si el nudo está inestable: barras colineales o falta de arriostramiento en esa dirección','La impresora','El IGV'],1,'Un nudo con todas sus barras alineadas no tiene rigidez transversal: la matriz es singular o casi.']]);
REF('mk1',['Kassimali, Matrix Analysis of Structures','McGuire, Gallagher y Ziemian, Matrix Structural Analysis']);
DED('mk2',`## Elemento viga
Cada extremo tiene desplazamiento v y giro θ. Resolviendo la elástica para cada desplazamiento unitario con los demás nulos se obtienen las columnas de la matriz: un giro unitario exige 4EI/L de momento en ese extremo y 2EI/L en el otro; un desplazamiento unitario exige 12EI/L³ de corte y 6EI/L² de momento.

## Nudo libre
Si solo el giro de un nudo es incógnita, la ecuación es Σ(4EI/L)·θ = −ΣFEM: el nudo gira hasta equilibrar los momentos de empotramiento.`);
CRI('mk2',[
['¿Por qué el método matricial reemplazó a Cross en la práctica?',['Cross está mal','Porque se programa fácil para cualquier estructura y resuelve miles de grados de libertad','Por moda','No lo reemplazó'],1,'Cross sigue siendo útil para verificar a mano; las computadoras usan matrices.']]);
DED('ef',`## Funciones de forma
Dentro de un elemento, el desplazamiento se interpola desde los nudos. Para un elemento de barra lineal: u(x) = N₁u₁ + N₂u₂, con N₁ = 1 − x/L y N₂ = x/L. Cada N vale 1 en su nudo y 0 en el otro.

## Deformación
ε = du/dx = (u₂ − u₁)/L: constante en el elemento.

## Cargas nodales
Una carga distribuida se lleva a los nudos con el trabajo virtual: ∫N_{i}·q dx. Para q uniforme: qL/2 en cada nudo.

## La idea general
Dividir un sólido complejo en piezas simples cuyas ecuaciones se conocen y ensamblarlas (Zienkiewicz y Taylor, El método de los elementos finitos). Más elementos, más precisión.`);
CRI('ef',[
['Un modelo de elementos finitos muestra un esfuerzo altísimo justo en una esquina entrante. ¿Qué pasa?',['Es un error del programa','Es una concentración de esfuerzos (teóricamente infinita en una esquina viva); afinar la malla no la elimina','Hay que borrar el elemento','Es el sismo'],1,'Las esquinas vivas son singularidades. Se interpreta con criterio, por ejemplo con esfuerzos a una distancia de la esquina.']]);
DED('pmat',`## Centro de rigidez
Las columnas de un piso se desplazan juntas si la losa es rígida (diafragma). Si la fuerza no pasa por el centro de rigidez, el piso además gira. El centro de rigidez es el promedio de las posiciones ponderado por las rigideces: x_{CR} = Σk_{i}x_{i}/Σk_{i}.

## Momento torsor
La fuerza sísmica actúa en el centro de masa. La distancia entre ambos centros por el cortante da el momento torsor T = V·e. Ese giro sobrecarga los elementos alejados del centro de rigidez.`);
CRI('pmat',[
['Un edificio con placas solo en un extremo de la planta:',['Es eficiente','Tiene gran excentricidad: girará en sismo y sobrecargará las columnas del otro extremo','Es igual que uno simétrico','No gira'],1,'Hay que distribuir los elementos rígidos en planta, idealmente en el perímetro y simétricos.']]);
DED('pdl',`## Momento adicional
Un piso que se desplaza Δ con carga de gravedad P sufre un momento adicional P·Δ, equivalente a una fuerza lateral PΔ/h. Esa fuerza produce un desplazamiento extra, que produce más momento.

## Serie geométrica
Si el desplazamiento de primer orden es Δ₁, el segundo orden agrega θΔ₁, luego θ²Δ₁... La suma es Δ₁(1 + θ + θ² + …) = Δ₁/(1 − θ), con θ = PΔ/(Vh). Si θ se acerca a 1, el desplazamiento crece sin límite: inestabilidad.`);
CRI('pdl',[
['¿En qué edificios importa más el P-Delta?',['En casas de un piso','En edificios altos, flexibles y pesados, sobre todo de acero','En ninguno','Solo en puentes'],1,'θ crece con la carga de gravedad y la flexibilidad.']]);
DED('md1',`## Esfuerzos admisibles
La madera es un material natural con mucha variabilidad (nudos, rajaduras, dirección de la fibra). El Manual Andino agrupa especies por densidad y resistencia (grupos A, B, C) y da esfuerzos admisibles que ya incluyen factores de seguridad y de reducción por defectos.

## Corte en vigas
τ = 1.5V/(bh) es el máximo de Jourawski para una sección rectangular. En madera el corte es crítico porque su resistencia paralela a la fibra es baja.

## Flecha
Se usa E promedio (no el mínimo) para deflexiones, porque la viga trabaja en conjunto con las demás; y para elementos aislados, el mínimo.`);
CRI('md1',[
['¿Por qué una viga de madera suele quedar gobernada por flecha y no por resistencia?',['Por error','Porque su módulo E es bajo (unas 15 veces menor que el acero) frente a su resistencia','Por el peso','Por el color'],1,'La relación resistencia/rigidez de la madera es alta: la viga resiste pero se deforma mucho.']]);
REF('md1',['Junta del Acuerdo de Cartagena, Manual de Diseño para Maderas del Grupo Andino','E.010 Madera']);
DED('md2',`## Esbeltez límite C_{k}
Es la esbeltez a la que la curva de columnas intermedias toca la de Euler con tangencia: se obtiene igualando ambas expresiones con un factor de seguridad. Por eso C_{k} depende de √(E/f_{c}).

## Columnas largas
N = π²EA/(2.5λ²·12) ≈ 0.329EA/λ²: Euler para sección rectangular (I/A = d²/12) con un factor de seguridad de 2.5.

## Intermedias
La fórmula de cuarto grado es un ajuste empírico del Forest Products Laboratory que une suavemente la columna corta con Euler.`);
CRI('md2',[
['Una columna de madera de 2 m de altura y 5×5 cm de sección:',['Es corta','Es muy esbelta (λ = 40): su carga admisible será muy baja','No pandea','Es de acero'],1,'λ = l_{ef}/d = 200/5 = 40: columna larga. Conviene una sección mayor o arriostrarla.']]);
DED('pt1',`## Carbonatación
El CO₂ del aire entra por difusión y reacciona con el hidróxido de calcio del concreto, bajando el pH de 12.5 a menos de 9. La primera ley de Fick para difusión en un medio que consume el gas da una profundidad que crece con la raíz del tiempo: x = K√t. Cuando el frente llega al acero, este se despasiva y puede corroerse.

## Tiempo de iniciación
Despejando: t = (c/K)², con c el recubrimiento. Duplicar el recubrimiento cuadruplica el tiempo: por eso el recubrimiento es la primera defensa.

## Pérdida de sección
La ley de Faraday convierte la densidad de corriente de corrosión i_{corr} (μA/cm²) en penetración: 1 μA/cm² ≈ 11.6 μm/año.`);
CRI('pt1',[
['¿Qué es más eficaz para la durabilidad en un ambiente marino?',['Más acero','Más recubrimiento y concreto de baja a/c','Pintar el acero','Usar más agua'],1,'El tiempo de iniciación crece con el cuadrado del recubrimiento; la baja a/c reduce K.']]);
REF('pt1',['Helene y Pereira, Manual de rehabilitación de estructuras de hormigón','Tuutti, Corrosion of Steel in Concrete (1982)','ACI 222R, Protection of Metals in Concrete Against Corrosion']);
DED('pt2',`## Refuerzo con FRP
Una lámina de fibra de carbono pegada en la cara traccionada agrega una fuerza A_{f}f_{fe} con brazo h − a/2. El esfuerzo efectivo f_{fe} es mucho menor que su resistencia, porque la falla suele ser por despegue de la lámina. El factor ψ_{f} (0.85 en el ACI 440.2R) cubre la incertidumbre.

## Encamisado
Se agrega concreto y acero alrededor de la columna. Su capacidad axial nueva se suma con las mismas fórmulas, considerando que el concreto nuevo y el viejo trabajen juntos (preparación de superficie y conectores).`);
CRI('pt2',[
['Antes de reforzar una viga con fibra de carbono, ¿qué es imprescindible?',['Pintarla','Diagnosticar la causa del problema y reparar el concreto dañado y la corrosión','Nada','Mojarla'],1,'Reforzar sobre concreto contaminado o corroído solo esconde el problema.']]);
REF('pt2',['ACI 440.2R, Guide for the Design and Construction of Externally Bonded FRP Systems','ACI 562, Code Requirements for Assessment, Repair, and Rehabilitation of Existing Concrete Structures']);
