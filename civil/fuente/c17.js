/* Deducciones y criterio: análisis estructural, concreto, acero y sismo */
DED('car',`## Ancho tributario
Una losa reparte su carga a las vigas que la sostienen. Cada viga "recoge" la carga de la franja que va de la mitad del paño de un lado a la mitad del otro: el ancho tributario. La carga por metro es la carga por m² por ese ancho.

## Área tributaria de una columna
Del mismo modo, una columna recoge el área limitada por las líneas a media luz en ambas direcciones. Multiplicada por el número de pisos da la carga axial aproximada: es el predimensionamiento clásico (Blanco Blasco).

## Peso propio
Una viga de b×h (m) de concreto armado pesa 2.4·b·h t/m. Se suma siempre: es el error de metrado más frecuente omitirlo.`);
CRI('car',[
['Una columna esquinera frente a una central, con iguales luces:',['Recibe más carga','Recibe cerca de la cuarta parte de la carga de la central','Igual','No recibe carga'],1,'Su área tributaria es un cuarto de paño en cada dirección, contra un paño completo de la central. Pero sufre más momento por excentricidad.'],
['¿Por qué la E.020 da carga viva de 200 kg/m² en viviendas y 500 en bibliotecas?',['Por costumbre','Porque se basa en estudios de ocupación y uso: en bibliotecas los libros pesan mucho','Por el precio','Es igual'],1,'La carga viva representa el uso esperado. Cambiar el uso de un edificio sin revisar la estructura es peligroso.']]);
REF('car',['E.020 Cargas','Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado (predimensionamiento)']);
DED('det',`## Conteo de ecuaciones e incógnitas
Cada barra o cuerpo rígido en el plano tiene 3 ecuaciones de equilibrio. Si hay más incógnitas (reacciones y fuerzas internas) que ecuaciones, sobran: la estructura es hiperestática y esa diferencia es su grado de hiperestaticidad.

## Pórticos
Al cortar cada barra aparecen 3 fuerzas internas (N, V, M): 3b incógnitas internas más r reacciones. Cada nudo da 3 ecuaciones: 3n. Las condiciones especiales c (articulaciones internas) liberan ecuaciones extra. GH = 3b + r − 3n − c.

## Ojo con la estabilidad
El conteo es necesario pero no suficiente: una estructura con GH ≥ 0 puede ser inestable si sus apoyos son todos paralelos o concurrentes. Hay que mirarla.`);
CRI('det',[
['Una viga con tres apoyos de rodillo (todos verticales). GH sale ≥ 0. ¿Es estable?',['Sí','No: nada impide el movimiento horizontal','Depende de la carga','Siempre lo es'],1,'Todas las reacciones son paralelas: la viga puede deslizar. El conteo no detecta la inestabilidad geométrica.']]);
DED('tvi',`## Principio del trabajo virtual
Aplica una carga virtual unitaria en el punto y la dirección donde quieres el desplazamiento. Esa carga produce fuerzas internas n o momentos m. Cuando la estructura real se deforma, la carga unitaria hace un trabajo 1·δ, que debe igualar el trabajo interno de las fuerzas virtuales sobre las deformaciones reales:

1·δ = Σn·(NL/AE) en armaduras, y 1·δ = ∫m·(M/EI)dx en vigas.

## Integrales de productos
Para diagramas simples hay tablas: el producto de dos triángulos con el máximo en el mismo extremo es ⅓·M·m·L (Hibbeler, Análisis estructural). Es más rápido que integrar.`);
CRI('tvi',[
['Para hallar el giro en un apoyo con trabajo virtual, ¿qué carga virtual aplicas?',['Una fuerza unitaria vertical','Un momento unitario en ese apoyo','Ninguna','La carga real'],1,'La carga virtual debe hacer trabajo con el desplazamiento buscado: para un giro, un momento unitario.']]);
DED('hip',`## Viga empotrada-apoyada
Quita el apoyo B y calcula la flecha del voladizo por la carga: wL⁴/(8EI). Luego aplica la reacción R hacia arriba: RL³/(3EI). Como B no se mueve, igualas: R = 3wL/8. Es el **método de las fuerzas** (compatibilidad).

## Momento de empotramiento
En una viga biempotrada con carga uniforme, por simetría y compatibilidad de giros, el momento en los empotres es wL²/12 y al centro wL²/24.

## Ecuación de los tres momentos
Clapeyron (1857) planteó que el giro a la izquierda y a la derecha de cada apoyo interno de una viga continua debe ser el mismo. Escribiendo esos giros con los momentos de apoyo se obtiene M_{A}L₁ + 2M_{B}(L₁ + L₂) + M_{C}L₂ = −(w₁L₁³ + w₂L₂³)/4.`);
CRI('hip',[
['¿Qué ventaja tiene una viga continua sobre varias simples?',['Ninguna','Menores momentos positivos y flechas, porque los apoyos restringen el giro','Más barata siempre','No tiene acero negativo'],1,'La continuidad reparte el momento entre apoyos y tramos. A cambio, necesita acero superior en los apoyos.']]);
DED('crs',`## La idea de Hardy Cross (1930)
1. Bloquea todos los nudos (empotramiento): aparecen momentos de empotramiento FEM.
2. Libera un nudo: el momento desequilibrado se reparte entre las barras en proporción a su rigidez (factores de distribución FD = k_{i}/Σk).
3. Cada barra transmite la mitad de lo que recibió a su otro extremo (si está empotrado).
4. Repite hasta que los momentos que se reparten sean pequeños.

## De dónde salen k y la transmisión
Girar θ el extremo de una barra con el otro empotrado exige M = 4EIθ/L, y aparece 2EIθ/L en el extremo lejano: la mitad. Si el lejano está articulado, la rigidez es 3EI/L y no hay transmisión.`);
CRI('crs',[
['En un nudo con una viga corta y rígida y otra larga y flexible, ¿cuál toma más momento al liberar el nudo?',['La larga','La corta y rígida: tiene más k = 4EI/L','Igual','Ninguna'],1,'El momento se reparte según la rigidez: como en resortes en paralelo, el más rígido toma más.']]);
REF('crs',['Cross, Analysis of Continuous Frames by Distributing Fixed-End Moments (1930)','Hibbeler, Análisis estructural']);
DED('rig',`## Rigidez de una barra
De δ = PL/(AE): P = (AE/L)·δ. La rigidez k = AE/L es la fuerza para un desplazamiento unitario.

## Columna con extremos empotrados
Si el extremo superior se desplaza Δ sin girar, la columna se deforma en doble curvatura. Resolviendo la elástica: V = 12EIΔ/h³. Si el pie está articulado: 3EIΔ/h³.

## El método matricial
Se escribe K·d = F: cada fila es una ecuación de equilibrio de un grado de libertad. La matriz K se arma sumando las rigideces de cada barra en las posiciones de sus nudos. Es el método de todos los programas (ETABS, SAP2000).

## Resortes en paralelo
Columnas de un mismo piso se desplazan igual: sus rigideces se suman.`);
CRI('rig',[
['Una columna con pie empotrado y otra igual con pie articulado. ¿Cuál es más rígida lateralmente?',['La articulada','La empotrada, 4 veces más','Igual','Depende de la carga'],1,'12EI/h³ frente a 3EI/h³: la empotrada es cuatro veces más rígida.']]);
DED('fle',`## Hipótesis
Secciones planas, el concreto no resiste tensión, el concreto falla con ε_{cu} = 0.003 y el acero es elastoplástico.

## Bloque de Whitney
La distribución real de esfuerzos del concreto es curva. Whitney (1937) mostró que se puede reemplazar por un rectángulo de esfuerzo 0.85f′_{c} y altura a = β₁c con la misma fuerza resultante y la misma posición.

## Momento nominal
Equilibrio: 0.85f′_{c}ab = A_{s}f_{y}, de donde a. El par interno: M_{n} = A_{s}f_{y}(d − a/2).

## Falla balanceada
Por compatibilidad de deformaciones: c_{b}/d = 0.003/(0.003 + f_{y}/E_{s}). Con E_{s} = 2×10⁶ kg/cm²: 0.003E_{s} = 6000, y c_{b} = 6000d/(6000 + f_{y}). Reemplazando en el equilibrio sale ρ_{b}.

## Acero mínimo
Asegura que la viga, al fisurarse, no falle de golpe: el acero debe resistir más que el momento de fisuración. De ahí la expresión 0.7√f′_{c}/f_{y}·bd.`);
CRI('fle',[
['¿Por qué se limita la cuantía máxima en vigas?',['Por costo','Para que el acero fluya antes de que el concreto se aplaste: falla dúctil con aviso','Para que pese menos','Por estética'],1,'Con demasiado acero, el concreto falla primero en forma frágil. El límite garantiza deformación y fisuras visibles antes del colapso.'],
['Duplicar el peralte d de una viga, ¿cuánto aumenta M_{n} con el mismo acero?',['Lo duplica aproximadamente','No cambia','Lo cuadruplica','Lo reduce'],0,'M_{n} = A_{s}f_{y}(d − a/2): con a pequeño, M_{n} crece casi en proporción a d. Para la misma resistencia, peralte es más eficiente que acero.']]);
REF('fle',['Nilson, Darwin y Dolan, Diseño de estructuras de concreto','Ottazzi Pasino, Apuntes del curso Concreto Armado 1 (PUCP)','Harmsen, Diseño de estructuras de concreto armado (PUCP)','Whitney, Plastic theory of reinforced concrete design (1942)']);
DED('cte',`## Analogía de la armadura
Ritter (1899) y Mörsch explicaron que una viga fisurada por corte trabaja como una armadura: el concreto entre fisuras forma diagonales comprimidas a 45° y los estribos son montantes en tensión.

## Aporte de los estribos
Una fisura a 45° atraviesa una longitud horizontal igual a d. En esa longitud hay d/s estribos, cada uno con A_{v}f_{y}. Por eso V_{s} = A_{v}f_{y}d/s.

## Aporte del concreto
Antes de fisurarse y por la trabazón de agregados y la zona comprimida, el concreto aporta V_{c} = 0.53√f′_{c}·bd (0.17√f′_{c} en MPa), un valor empírico conservador del ACI.`);
CRI('cte',[
['¿Por qué la falla por corte es más peligrosa que la de flexión?',['No lo es','Es frágil y repentina: casi sin aviso','Es más lenta','Es igual'],1,'Por eso se diseña para que la flexión gobierne y el corte tenga margen (diseño por capacidad en zonas sísmicas).']]);
DED('col',`## Resistencia axial
El concreto aporta 0.85f′_{c} sobre su área neta y el acero f_{y}A_{st}: P₀ = 0.85f′_{c}(A_{g} − A_{st}) + f_{y}A_{st}. El 0.85 refleja que el concreto en una columna real resiste menos que la probeta (por segregación y forma).

## El factor 0.80
Ninguna columna está perfectamente centrada. Para cubrir una excentricidad accidental, la norma limita la carga axial a 80 % de P₀ en columnas con estribos.

## Predimensionamiento
A_{g} ≈ P/(0.45f′_{c}) viene de suponer que, en servicio, la columna trabaja a unos 0.45f′_{c} en promedio, dejando margen para momentos (Blanco Blasco).`);
CRI('col',[
['¿Por qué φ es menor en columnas (0.70) que en vigas en flexión (0.90)?',['Por costumbre','Porque una falla de columna es frágil y compromete a todo lo que soporta','Porque tienen menos acero','Por el sismo solamente'],1,'Las columnas fallan con menos aviso y su colapso arrastra a los pisos superiores. Se diseñan con más margen.']]);
DED('los',`## Espesor
Una losa aligerada que cumple h ≥ L/25 normalmente no necesita verificar deflexiones (criterio práctico peruano basado en la tabla de espesores mínimos).

## Métodos de coeficientes
El ACI calculó, para tramos continuos de luces parecidas y carga uniforme, envolventes de momento: wL²/9, wL²/14, wL²/16, etc. Son resultados del análisis elástico con alternancia de carga viva ya resueltos.

## Cortante en viguetas
El ACI y la E.060 permiten aumentar 10 % el V_{c} en viguetas de aligerados, porque las viguetas trabajan en conjunto y redistribuyen carga entre ellas.`);
CRI('los',[
['Un aligerado no cumple el corte cerca de la viga de apoyo. ¿Qué es lo usual?',['Poner estribos en las viguetas','Hacer ensanches: retirar ladrillos alternados para aumentar el ancho de la vigueta','Aumentar el ladrillo','Nada'],1,'En aligerados no se colocan estribos; se aumenta el ancho de concreto retirando ladrillos cerca del apoyo.']]);
DED('tcr',`## De dónde sale T_{cr}
Se modela la sección como un tubo de pared delgada (Bredt): τ = T/(2A_{o}t). El ACI toma A_{o} ≈ (2/3)A_{cp} y un espesor equivalente t ≈ 0.75A_{cp}/p_{cp}. La fisura aparece cuando la tensión principal (igual a τ en corte puro) llega a 0.33√f′_{c}. Despejando: T_{cr} = 0.33√f′_{c}·2·(2/3)A_{cp}·0.75A_{cp}/p_{cp} = 0.33√f′_{c}A_{cp}²/p_{cp}.

## El umbral
Si T_{u} es menor que la cuarta parte de T_{cr} (0.083 en vez de 0.33), la torsión casi no reduce la resistencia al corte y se puede ignorar (MacGregor y Wight).`);
CRI('tcr',[
['Una viga de borde recibe un voladizo de 2 m. ¿Qué no puede faltar?',['Pintura','Estribos cerrados y acero longitudinal en el perímetro para torsión','Más concreto','Nada'],1,'La torsión de equilibrio debe resistirse; si no, el voladizo cae. Estribos abiertos no la resisten.']]);
DED('dfc',`## Inercia efectiva de Branson (1965)
Una viga real tiene tramos fisurados y otros sin fisurar. Branson ajustó ensayos con una transición entre I_{g} e I_{cr} que depende de cuánto supera el momento al de fisuración: con M_{a} cercano a M_{cr} manda I_{g}; con M_{a} mucho mayor, I_{cr}. El exponente 3 vino del ajuste.

## Flecha diferida
El flujo plástico aumenta la deformación del concreto comprimido con el tiempo. El acero en compresión la frena porque "toma" carga del concreto. ξ crece con el tiempo hasta 2 a los 5 años; λ = ξ/(1 + 50ρ′).`);
CRI('dfc',[
['¿Por qué a veces los tabiques se fisuran meses después de terminada la obra, sin cargas nuevas?',['Mala pintura','Por la flecha diferida de vigas y losas por flujo plástico y contracción','Por el sismo','Por la lluvia'],1,'La flecha puede duplicarse o triplicarse en años; los tabiques rígidos no la acompañan y se fisuran.']]);
DED('fis',`## Por qué el espaciamiento y no el diámetro
Frosch (1999) mostró que el ancho de fisura depende de la distancia del punto más alejado de la superficie a la barra más cercana. Barras más juntas reducen esa distancia. Por eso el ACI limita el espaciamiento en función del esfuerzo en servicio y del recubrimiento.

## f_{s} ≈ 2/3 f_{y}
En servicio, las cargas son aproximadamente 1/1.5 de las mayoradas y el acero trabaja a unos 2/3 de f_{y}.

## Temperatura
El acero mínimo de 0.0018bh controla las fisuras por contracción y temperatura, que no dependen de las cargas.`);
CRI('fis',[
['En un reservorio de agua, ¿qué es preferible?',['Pocas barras gruesas','Muchas barras delgadas bien distribuidas, con esfuerzo de servicio bajo','Sin acero','Solo malla de gallinero'],1,'Fisuras finas y repartidas impiden filtraciones y corrosión. En estructuras hidráulicas se limita además f_{s}.']]);
DED('ten',`## Dos estados límite
Un elemento a tensión puede:
- **Fluir** en toda su sección bruta: se alarga sin control. φP_{n} = 0.90F_{y}A_{g}
- **Romperse** en la sección neta, donde están los agujeros. φP_{n} = 0.75F_{u}A_{e}

El φ menor para la rotura refleja que es una falla frágil.

## Retraso por cortante (shear lag)
Si la fuerza entra solo por una parte del perfil (por ejemplo, un ángulo conectado por un ala), el resto no trabaja completo cerca de la conexión. Se reduce el área neta con U < 1: A_{e} = U·A_{n}.`);
CRI('ten',[
['¿Por qué un ángulo conectado por una sola ala tiene U < 1?',['Por el color','Porque el ala no conectada no recibe toda la fuerza cerca de la unión','Porque se dobla','No tiene U'],1,'El esfuerzo se concentra en el ala conectada: el área efectiva es menor que la neta.']]);
REF('ten',['AISC 360, capítulo D','McCormac y Csernak, Diseño de estructuras de acero']);
DED('com',`## La curva de columnas del AISC
Euler supone una columna perfecta. Las reales tienen curvatura inicial (L/1000) y esfuerzos residuales de fabricación. Ensayos del SSRC llevaron a dos tramos:
- **Inelástico** (F_{e} ≥ 0.44F_{y}): F_{cr} = 0.658^{F_{y}/F_{e}}F_{y}
- **Elástico**: F_{cr} = 0.877F_{e}. El 0.877 reduce Euler por la imperfección inicial

La transición está en KL/r = 4.71√(E/F_{y}), cerca de 134 para A36.`);
CRI('com',[
['Una columna de acero muy esbelta (KL/r = 180):',['Es la más eficiente','Resiste muy poco por pandeo; conviene arriostrarla o usar un perfil con más r','No pandea','Es igual a una corta'],1,'En el tramo elástico la resistencia cae con el cuadrado de la esbeltez. AISC recomienda KL/r ≤ 200.']]);
DED('vac',`## Momento plástico
Cuando toda la sección fluye, la mitad está en compresión a F_{y} y la otra mitad en tensión a F_{y}. El momento es F_{y} por el momento estático de las dos mitades respecto al eje: Z. En un rectángulo: Z = 2·(bh/2)·(h/4) = bh²/4.

## Factor de forma
Z/S: 1.5 en rectángulos y cerca de 1.12 en perfiles I. Indica cuánta resistencia hay después de la primera fluencia.

## Corte
El alma toma casi todo el corte; su resistencia es 0.6F_{y}A_{w} (von Mises: fluencia en corte ≈ F_{y}/√3).`);
CRI('vac',[
['¿Por qué una viga I de acero puede diseñarse con M_{p} y no con la primera fluencia?',['Por error','Porque es dúctil: tras fluir la fibra extrema, sigue tomando momento hasta plastificar la sección','Porque es pesada','Porque no pandea nunca'],1,'Solo si es compacta y está arriostrada; si no, el pandeo local o lateral limita antes.']]);
DED('per',`## Corte en el perno
El perno se corta en el plano entre las planchas: su resistencia es el esfuerzo cortante nominal F_{nv} por su área. Si hay dos planos de corte (doble corte), se duplica.

## Aplastamiento
La plancha detrás del perno se aplasta y desgarra. Ensayos dan R_{n} = 2.4dtF_{u} cuando la deformación del agujero es una consideración de diseño.

## Soldadura de filete
Falla por la garganta, la menor dimensión de su sección: 0.707w (un triángulo de 45°). Resistencia: 0.6F_{EXX} por la garganta por la longitud.`);
CRI('per',[
['¿Por qué se revisan varias fallas en una conexión y se usa la menor?',['Por exceso','Porque la conexión falla por el mecanismo más débil','Por la norma solamente','No se revisan'],1,'Una cadena se rompe por su eslabón más débil: perno, plancha, soldadura o bloque.']]);
DED('alb',`## Densidad de muros
La E.070 pide que el área de muros sea suficiente para que, con su resistencia al corte, soporten el sismo. Su origen (San Bartolomé) es igualar la resistencia de los muros (proporcional a v′_{m}·ΣLt) con el cortante sísmico (proporcional a ZUS·peso, y el peso a unos 0.8 a 1 t/m² por piso por el número de pisos N). Agrupando constantes queda ΣLt/A_{p} ≥ ZUSN/56.

## Esfuerzo axial
σ_{m} ≤ 0.2f′_{m}[1 − (h/35t)²] limita la compresión con una reducción por esbeltez parecida a la de columnas.

## Corte
V_{m} = 0.5v′_{m}αtL + 0.23P_{g}: el término de P_{g} es la fricción que aporta la carga vertical.`);
CRI('alb',[
['Un propietario quiere quitar un muro del primer piso para hacer una tienda. ¿Qué riesgo hay?',['Ninguno','Se reduce la densidad de muros y puede crearse un piso blando','Mejora el sismo','Solo estético'],1,'Los muros de albañilería confinada son la estructura. Quitar uno sin evaluar puede ser fatal en un sismo.']]);
REF('alb',['San Bartolomé, Quiun y Silva, Diseño y construcción de estructuras sismorresistentes de albañilería (PUCP)','E.070 Albañilería']);
DED('lft',`## Por qué la viga pandea lateralmente
El ala comprimida es como una columna que puede pandear hacia el costado; el alma y el ala traccionada la frenan parcialmente. La solución elástica de Timoshenko combina rigidez a flexión lateral (EI_{y}) y a torsión (GJ, EC_{w}).

## L_{p}
Es la longitud no arriostrada máxima para la cual la sección alcanza M_{p} antes de pandear. Viene de exigir suficiente rigidez lateral: 1.76r_{y}√(E/F_{y}).

## Tramo inelástico
Entre L_{p} y L_{r}, AISC interpola linealmente entre M_{p} y 0.7F_{y}S_{x} (el 0.7 descuenta esfuerzos residuales).

## C_{b}
Si el momento no es uniforme, la zona más comprimida es corta y el pandeo es más difícil: C_{b} ≥ 1 premia ese caso.`);
CRI('lft',[
['Una viga de techo de nave industrial sin correas conectadas al ala comprimida:',['Resiste M_{p}','Puede pandear lateralmente con mucha menos carga','Es más rígida','No importa'],1,'Las correas o la cubierta arriostran el ala comprimida. Sin ellas, L_{b} es la luz completa.']]);
DED('bc',`## Interacción
Una columna con carga axial y momento debe cumplir ambas "demandas" a la vez. La forma más simple es una línea recta: P/P_{c} + M/M_{c} ≤ 1. AISC ajustó los ensayos con dos rectas que se cortan en P/P_{c} = 0.2: con poca carga axial, el momento puede aprovecharse casi completo; con mucha, la pendiente 8/9 lo reduce.

## Segundo orden
Los momentos deben incluir la amplificación P-Δ y P-δ, porque la carga axial actúa sobre la columna deformada.`);
CRI('bc',[
['¿Por qué no basta con revisar por separado la columna a compresión y a flexión?',['Sí basta','Porque ambos efectos usan la misma capacidad del material y se combinan','Por la norma','Por el viento'],1,'Una columna al 70 % en axial no tiene el 100 % de su capacidad a flexión disponible.']]);
DED('cfs',`## Ancho efectivo de Winter
Von Kármán observó que una placa delgada comprimida pandea en el centro, pero sus bordes apoyados siguen tomando carga. George Winter (Cornell, 1947) ajustó con ensayos un "ancho efectivo" que resiste a esfuerzo completo, equivalente a la placa real: ρ = (1 − 0.22/λ)/λ.

## Esbeltez de la placa
λ = (1.052/√k)(w/t)√(f/E) compara el esfuerzo aplicado con el de pandeo elástico de la placa, que depende de (t/w)² y del coeficiente k según sus apoyos.`);
CRI('cfs',[
['¿Para qué sirve el labio de una correa C?',['Para colgarla','Rigidiza el borde del ala y aumenta mucho su ancho efectivo','Por estética','Para soldar'],1,'Sin labio, el ala tiene un borde libre (k = 0.43); con labio, se acerca a una placa apoyada en los dos bordes (k = 4).']]);
REF('cfs',['Yu y LaBoube, Cold-Formed Steel Design','AISI S100, North American Specification for Cold-Formed Steel']);
DED('gdl',`## Amortiguamiento
Con amortiguamiento viscoso c, la ecuación es mü + cu̇ + ku = 0. La solución oscila con amplitud que decae como e^{−ζωt}, con ζ = c/(2mω) la fracción del amortiguamiento crítico.

## Decremento logarítmico
Entre dos picos sucesivos, separados un periodo T_{d}, la amplitud cae en e^{ζωT_{d}}. Su logaritmo es δ = ζωT_{d} = 2πζ/√(1 − ζ²) ≈ 2πζ. Midiendo dos picos en un ensayo de vibración libre se obtiene ζ.

## Espectros
El desplazamiento espectral y la aceleración espectral se relacionan por S_{a} = ω²S_{d} (pseudoaceleración), porque para un oscilador armónico la aceleración máxima es ω² veces el desplazamiento máximo (Chopra).`);
CRI('gdl',[
['Un edificio de concreto típico tiene ζ ≈ 5 %. Si con amortiguadores sube a 20 %, ¿qué pasa?',['Nada','La respuesta en resonancia baja mucho y el daño se reduce','Aumenta la deriva','Se vuelve más rígido'],1,'La amplificación en resonancia es ≈ 1/(2ζ): de 10 veces a 2.5 veces.']]);
DED('esp',`## De dónde sale V = ZUCS·P/R
La aceleración espectral elástica es S_{a} = ZUCS·g. La fuerza inercial en un oscilador es masa por aceleración: F = (P/g)·ZUCS·g = ZUCS·P. Como el edificio puede incursionar en el rango inelástico (y debe tener ductilidad para hacerlo), la norma reduce la fuerza elástica dividiendo entre R.

## Factor C
Representa la amplificación de la estructura respecto al suelo según su periodo: plana (2.5) para periodos cortos, decreciente como 1/T en la zona de velocidad constante y como 1/T² en la de desplazamiento constante. Es la forma clásica de los espectros de Newmark y Hall.

## C/R ≥ 0.11
Es un mínimo para que estructuras muy flexibles no se diseñen con fuerzas irrealmente bajas.`);
CRI('esp',[
['Un hospital en Lima frente a una vivienda en el mismo suelo, con igual estructura:',['Mismo V','V mayor por U = 1.5: debe seguir funcionando tras el sismo','V menor','No se diseña por sismo'],1,'El factor de uso U aumenta la fuerza de diseño de edificaciones esenciales.'],
['¿Por qué R es 8 para pórticos y 3 para albañilería?',['Por tradición','Porque refleja la ductilidad y la capacidad de disipar energía de cada sistema','Por el peso','Por el costo'],1,'Un sistema más dúctil puede diseñarse con menor fuerza elástica porque disipará energía fluyendo sin colapsar.']]);
REF('esp',['E.030 Diseño sismorresistente (verifica la versión vigente)','Chopra, Dynamics of Structures','Bazán y Meli, Diseño sísmico de edificios']);
DED('dis',`## Por qué la fuerza crece con la altura
En el primer modo de vibración, el desplazamiento de cada piso crece con la altura. La fuerza inercial de cada piso es proporcional a su masa por su aceleración, que es proporcional al desplazamiento modal. Si el modo es lineal: F_{i} ∝ P_{i}h_{i}.

## El exponente k
En edificios altos (T mayor) los modos superiores aumentan las fuerzas en los pisos altos: k crece hasta 2.

## Excentricidad accidental
La norma agrega una excentricidad de 5 % de la dimensión en planta para cubrir incertidumbres en la ubicación de masas y rigideces.`);
CRI('dis',[
['¿Dónde se concentra el cortante en un edificio?',['En el último piso','En la base: es la suma de todas las fuerzas de los pisos superiores','En el medio','Es igual en todos'],1,'Aunque la fuerza por piso crece con la altura, el cortante acumulado es máximo en el primer piso.']]);
DED('dri',`## Desplazamiento inelástico
El análisis se hace con fuerzas reducidas por R: da desplazamientos elásticos "pequeños". Por la regla de igual desplazamiento, el desplazamiento inelástico real es aproximadamente R veces el elástico. La E.030 usa 0.75R (o 0.85R en irregulares) como estimación.

## Deriva
Es el desplazamiento relativo entre pisos dividido entre la altura. Controla el daño en tabiques, vidrios e instalaciones. Límites de la E.030: 0.007 en concreto, 0.005 en albañilería.`);
CRI('dri',[
['Un edificio cumple resistencia pero su deriva es 0.012 en concreto. ¿Qué haces?',['Lo apruebo','Lo rigidizo con placas o columnas mayores: no cumple el límite de 0.007','Le pongo más acero','Nada'],1,'La deriva es un requisito independiente de la resistencia. Más acero no rigidiza casi nada.']]);
DED('irr',`## Por qué penalizar con I_{a} e I_{p}
Las estructuras irregulares concentran la demanda en pocos elementos: un piso blando concentra la deformación, una planta asimétrica gira y sobrecarga las esquinas. Su comportamiento real es peor que lo que predice un análisis lineal. Reducir R aumenta la fuerza de diseño como margen.

## Piso blando
Si la rigidez de un piso es menor al 70 % del de arriba, ese piso se deforma mucho más que los demás y forma un mecanismo.`);
CRI('irr',[
['¿Qué es mejor: penalizar con R reducido o corregir la irregularidad?',['Penalizar siempre','Corregir en la estructuración: la penalización no elimina el comportamiento peligroso','Ignorar','Lo mismo'],1,'Blanco Blasco insiste en estructurar bien desde el inicio: simetría, continuidad y rigidez uniforme.']]);
DED('ais',`## Por qué funciona
Con un periodo de 2.5 a 3 s, el edificio aislado está en la zona del espectro donde la aceleración es baja. El costo es un desplazamiento grande en el nivel de aislamiento, que se concentra allí y no en la superestructura (que se mueve casi como cuerpo rígido).

## Periodo
Es el de un oscilador de 1 GDL con la masa del edificio y la rigidez de los aisladores: la superestructura es mucho más rígida que los aisladores.

## Desplazamiento
S_{d} = S_{a}/ω² = S_{a}T²/(4π²).`);
CRI('ais',[
['¿Por qué no conviene aislar un edificio sobre suelo muy blando?',['Siempre conviene','Porque el suelo blando amplifica periodos largos y se acerca al periodo del aislamiento','Porque es caro','No importa'],1,'Los suelos blandos tienen periodos largos: el aislamiento puede caer cerca de la resonancia del suelo.']]);
DED('jsis',`## Por qué 2/3 de la suma
Dos edificios vecinos rara vez alcanzan su desplazamiento máximo al mismo tiempo y en sentidos opuestos. Sumar ambos máximos sería muy conservador; la norma toma 2/3 de la suma como estimación razonable de la separación necesaria.

## 0.006h
Es una separación mínima independiente del análisis, proporcional a la altura, por si los desplazamientos calculados se subestiman.`);
CRI('jsis',[
['Un vecino rellenó la junta con ladrillo. ¿Qué pasará en un sismo?',['Nada','Los edificios se golpearán a través del relleno: daño en ambos','Mejora la rigidez','Se vuelve un solo edificio seguro'],1,'La junta debe quedar libre. Un relleno rígido transmite golpes y fuerzas para las que ninguno fue diseñado.']]);
DED('li',`## Construcción de la línea de influencia de R_{A}
Coloca una carga unitaria a x de A. Por momentos respecto a B: R_{A}·L = 1·(L − x), así que R_{A} = (L − x)/L. Es una recta de 1 en A a 0 en B.

## Momento en una sección
Para la carga a la izquierda de la sección a: M = R_{B}(L − a) = x(L − a)/L. A la derecha: M = R_{A}a = (L − x)a/L. El máximo, con la carga sobre la sección: a(L − a)/L.

## Müller-Breslau
La línea de influencia de una fuerza es la forma de la estructura cuando se elimina la restricción que la produce y se impone un desplazamiento unitario en su lugar. Es consecuencia del teorema de Betti (trabajo recíproco).`);
CRI('li',[
['Para el momento negativo máximo en el apoyo central de una viga continua, ¿qué tramos cargas?',['Todos','Los dos tramos adyacentes al apoyo','Solo uno','Ninguno'],1,'Según Müller-Breslau, la línea de influencia del momento en ese apoyo es negativa en los tramos adyacentes.']]);
REF('li',['Hibbeler, Análisis estructural (líneas de influencia)']);
DED('pdf',`## Ecuación de pendiente-deflexión
Superpone tres efectos en una barra AB: el giro de A, el giro de B y el desplazamiento relativo Δ. Cada uno produce momentos conocidos (por la elástica): un giro θ en un extremo da 4EIθ/L en ese extremo y 2EIθ/L en el otro; un desplazamiento Δ da −6EIΔ/L² en ambos. Sumando y agregando los momentos de empotramiento por carga se obtiene la ecuación.

## Asentamiento
Si el apoyo B baja Δ en una viga biempotrada, aparece 6EIΔ/L² en cada extremo. Con EI grande y L corta, unos milímetros generan momentos importantes.`);
CRI('pdf',[
['¿Por qué una estructura muy rígida es más sensible a los asentamientos diferenciales?',['No lo es','Porque M = 6EIΔ/L² crece con EI','Porque pesa más','Por el sismo'],1,'Una estructura rígida no acompaña el asentamiento: lo resiste con momentos grandes y se fisura.']]);
DED('arc',`## Arco y cable
Un cable con carga uniforme toma forma parabólica y trabaja solo a tensión. Invirtiendo esa forma se obtiene un arco que trabaja solo a compresión: el "funicular" de la carga (Hooke, 1675: "como cuelga el hilo flexible, así, invertido, se mantendrá el arco rígido").

## Empuje
En un arco triarticulado, tomando momentos en la clave para medio arco: H·f = V·(L/2) − w(L/2)²/2 = wL²/8. De ahí H = wL²/(8f).`);
CRI('arc',[
['¿Por qué un arco muy rebajado necesita estribos tan robustos?',['No los necesita','Porque H = wL²/(8f) crece al reducir f y empuja los apoyos hacia afuera','Por estética','Por el peso del arco'],1,'Con poca flecha, el empuje horizontal es enorme. Si los apoyos ceden, el arco se abre y colapsa.']]);
