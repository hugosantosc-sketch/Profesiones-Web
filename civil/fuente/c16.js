/* Deducciones y criterio: resistencia de materiales, materiales, topografía y geología */
DED('axi',`## Ley de Hooke
En el tramo elástico, el esfuerzo es proporcional a la deformación unitaria: σ = Eε. Con σ = P/A y ε = δ/L: P/A = Eδ/L, y despejando δ = PL/(AE). Es la "ecuación del resorte" de una barra: su rigidez axial es k = AE/L.

## Por qué E_{c} = 15000√f′_{c}
El módulo del concreto crece con su resistencia, pero menos que proporcionalmente. El ACI ajustó ensayos con E_{c} = 4700√f′_{c} (MPa); en kg/cm², 4700·√(0.0981)/0.0981 ≈ 15 000. Así lo adopta la E.060.

## Límites
La ley solo vale hasta el límite de proporcionalidad. En el acero, hasta f_{y}; en el concreto, aproximadamente hasta 0.4–0.5 f′_{c}.`);
CRI('axi',[
['Dos barras de igual sección y carga, una de acero y otra de aluminio (E tres veces menor). ¿Cuál se alarga más?',['La de acero','La de aluminio, tres veces más','Igual','Ninguna'],1,'δ = PL/(AE): con E tres veces menor, δ es tres veces mayor. El esfuerzo es el mismo en ambas.'],
['¿Por qué una columna de concreto de un edificio alto se acorta varios milímetros?',['Error de construcción','Por la deformación elástica, el flujo plástico y la contracción bajo carga sostenida','Por el sismo','No se acorta'],1,'Con alturas grandes, δ = PL/(AE) suma milímetros, y el flujo plástico lo multiplica con el tiempo. Afecta tabiques y fachadas.']]);
REF('axi',['Gere y Goodno, Mecánica de materiales','Hibbeler, Mecánica de materiales','Beer, Johnston, DeWolf y Mazurek, Mecánica de materiales']);
DED('tor',`## Hipótesis
En un eje circular, las secciones planas permanecen planas y giran como discos rígidos. La deformación por corte crece linealmente con el radio: γ = rφ/L.

## Fórmula de torsión
Con τ = Gγ = Grφ/L, el par interno es T = ∫τ·r dA = (Gφ/L)∫r²dA = (Gφ/L)J. Despejando: φ = TL/(GJ) y τ = Tr/J. Para un círculo, J = ∫r²dA = πd⁴/32.

## Secciones huecas de pared delgada (Bredt)
El flujo de corte q = τt es constante alrededor del tubo. El momento que produce es T = q·2A_{m}, con A_{m} el área encerrada por la línea media. Por eso τ = T/(2A_{m}t). Los tubos cerrados resisten torsión muchísimo mejor que los perfiles abiertos.`);
CRI('tor',[
['¿Por qué un perfil C resiste mal la torsión frente a un tubo cuadrado del mismo peso?',['Por el acero','Porque es abierto: no forma un circuito cerrado de flujo de corte','Porque pesa más','Igual resisten'],1,'La fórmula de Bredt solo vale para secciones cerradas. Las abiertas tienen rigidez torsional pequeñísima.']]);
DED('vm',`## Viga simple con carga uniforme
Reacciones wL/2. En una sección a x: M(x) = (wL/2)x − wx²/2. Derivando e igualando a cero: x = L/2. Reemplazando: M_{máx} = wL²/4 − wL²/8 = wL²/8.

## Carga puntual al centro
Reacciones P/2; M = (P/2)(L/2) = PL/4.

## Relaciones
dV/dx = −w y dM/dx = V. El área del diagrama de cortante entre dos secciones es el cambio de momento. Donde hay una carga puntual, el cortante salta; donde hay un momento aplicado, salta el momento.`);
CRI('vm',[
['Una viga simple con carga uniforme. ¿Dónde se necesita más acero inferior?',['En los apoyos','Al centro, donde M es máximo','Igual en todo','En un cuarto de la luz'],1,'El momento es una parábola con máximo wL²/8 al centro. En los apoyos de una viga simple es cero.']]);
DED('flx',`## Hipótesis de Navier
Las secciones planas permanecen planas al flexionarse. La deformación varía linealmente desde el eje neutro: ε = −y/ρ, con ρ el radio de curvatura.

## Fórmula de la flexión
Con σ = Eε = −Ey/ρ, el momento interno es M = ∫(−σ)y dA = (E/ρ)∫y²dA = EI/ρ. Combinando: σ = −My/I. El esfuerzo máximo está en la fibra más alejada c: σ = Mc/I = M/S.

## Módulo de rotura del concreto
f_{r} = 2√f′_{c} (kg/cm²) es la tensión a la que el concreto se fisura en flexión. Es solo 10–15 % de su resistencia a compresión: por eso el concreto necesita acero en la zona traccionada.`);
CRI('flx',[
['¿Por qué las vigas de acero son en forma de I?',['Por tradición','Porque ponen el material lejos del eje neutro, donde más aporta a I','Para pesar más','Para soldar mejor'],1,'En la fórmula I = ∫y²dA, el material lejos del eje cuenta al cuadrado. El alma solo une las alas y toma el corte.']]);
DED('cor',`## Fórmula de Jourawski
Corta una porción de viga sobre una fibra a distancia y. La diferencia de fuerzas de flexión entre sus dos caras, separadas dx, es dM·Q/I. Esa diferencia la equilibra el corte horizontal τ·b·dx. Como dM/dx = V: τ = VQ/(Ib), con Q el momento estático del área sobre la fibra.

## Rectángulo
En el eje neutro, Q = b(h/2)(h/4) = bh²/8 e I = bh³/12. τ = V(bh²/8)/(bh³/12·b) = 3V/(2bh) = 1.5V/A. El esfuerzo cortante máximo es 50 % mayor que el promedio.`);
CRI('cor',[
['¿Dónde es máximo el esfuerzo cortante en una viga rectangular?',['En la fibra superior','En el eje neutro','En la fibra inferior','Es uniforme'],1,'Q es máximo en el eje neutro y cero en las fibras extremas: el corte es una parábola con su máximo al centro.']]);
DED('def',`## Ecuación de la elástica
De M = EI/ρ y, para pendientes pequeñas, 1/ρ ≈ y″: EI·y″ = M(x). Integrando dos veces con las condiciones de apoyo se obtiene la flecha.

## Viga simple con carga uniforme
EI y″ = wLx/2 − wx²/2. Integrando dos veces y usando y(0) = y(L) = 0: y(L/2) = 5wL⁴/(384EI).

## Voladizo con carga en la punta
EI y″ = −P(L − x). Con y(0) = y′(0) = 0 (empotramiento): y(L) = PL³/(3EI).

## Lectura
La flecha crece con L⁴ (carga repartida): duplicar la luz multiplica la flecha por 16. Por eso en luces grandes manda la rigidez, no la resistencia.`);
CRI('def',[
['Si duplicas la luz de una losa sin cambiar su espesor, la flecha:',['Se duplica','Se multiplica por 16','No cambia','Se reduce'],1,'δ ∝ L⁴. Por eso las normas fijan espesores mínimos en función de la luz.']]);
DED('pan',`## Carga de Euler
Una columna articulada ligeramente deformada y(x) tiene momento M = −Py. Con EIy″ = M: y″ + (P/EI)y = 0. La solución no trivial que cumple y(0) = y(L) = 0 es y = A sen(πx/L), y exige P = π²EI/L². Es la menor carga a la que la columna puede mantenerse deformada: la carga crítica (Timoshenko y Gere).

## Longitud efectiva
Otros apoyos equivalen a cambiar L por KL: K = 0.5 empotrada-empotrada, 0.7 empotrada-articulada, 2 voladizo.

## Esbeltez
Dividiendo entre A y con r = √(I/A): σ_{cr} = π²E/(KL/r)². La esbeltez KL/r decide si la columna falla por pandeo o por aplastamiento.`);
CRI('pan',[
['Una columna en voladizo (K = 2) frente a una articulada (K = 1) de la misma longitud:',['Resiste igual','Resiste 4 veces menos al pandeo','Resiste el doble','No pandea'],1,'P_{cr} ∝ 1/(KL)²: con K doble, la carga crítica es la cuarta parte.']]);
DED('moh',`## Transformación de esfuerzos
Al girar un elemento un ángulo θ, el equilibrio de una cuña da σ_{θ} = σ_{prom} + [(σ_{x} − σ_{y})/2]cos 2θ + τ sen 2θ. Esas ecuaciones son las de una circunferencia en el plano (σ, τ): centro en σ_{prom} y radio R = √(((σ_{x} − σ_{y})/2)² + τ²). Es el círculo de Mohr (1882).

## Esfuerzos principales
Son los extremos del círculo: σ_{1,2} = σ_{prom} ± R, sobre planos donde no hay corte. El corte máximo es R.

## Uso
Explica por qué una viga de concreto se fisura a 45° cerca de los apoyos: allí el corte genera una tensión principal inclinada.`);
CRI('moh',[
['¿Por qué las fisuras por corte en vigas son inclinadas?',['Por mala construcción','Porque siguen planos perpendiculares a la tensión principal, que con corte puro está a 45°','Por el peso propio','Son verticales'],1,'En el eje neutro el estado es de corte puro; su círculo de Mohr da tensiones principales a 45°.']]);
DED('tci',`## Esfuerzo anular
Corta la mitad de un tubo de longitud L. La presión empuja la mitad hacia afuera con p·D·L (proyección). Las dos paredes cortadas resisten con 2σ_{θ}tL. Igualando: σ_{θ} = pD/(2t) = pr/t.

## Longitudinal
Corta el tubo transversalmente. La presión sobre el área πr² se equilibra con σ_{L}·2πrt: σ_{L} = pr/(2t). Es la mitad del anular: por eso las tuberías revientan a lo largo.

## Tanques
La pared de un tanque circular, a cada profundidad, es un anillo con presión γ_{w}h: T = γ_{w}hr por metro de altura.`);
CRI('tci',[
['En un tanque circular de concreto, ¿dónde necesita más acero horizontal la pared?',['Arriba','Cerca del fondo, donde la presión es mayor','Igual en toda la altura','En la tapa'],1,'T = γ_{w}hr crece con la profundidad. En la base el empotramiento con la losa reduce algo la tensión, pero el acero crece hacia abajo.']]);
DED('ter',`## Esfuerzo térmico
Si la barra estuviera libre se alargaría αΔTL. Si está restringida, los apoyos la comprimen hasta devolverla a su longitud original. Esa compresión debe producir un acortamiento igual: PL/(AE) = αΔTL. Despejando σ = P/A = EαΔT.

## Con holgura
Primero la barra se alarga libremente hasta cerrar δ₀; solo el resto produce esfuerzo: σ = E(αΔTL − δ₀)/L.

## Errores de montaje
Es la misma idea con un "δ" de fabricación en lugar del térmico. En estructuras hiperestáticas, cualquier diferencia de longitud genera esfuerzos.`);
CRI('ter',[
['¿Por qué los rieles antiguos tenían juntas con separación?',['Para que suenen','Para dejar que se dilaten sin generar esfuerzos que los pandeen','Por ahorro','Por el tren'],1,'Un riel restringido en verano puede pandearse lateralmente. Hoy se usan rieles soldados con tensión controlada y anclajes.']]);
DED('cmp',`## Sección transformada
La deformación es lineal en toda la sección (secciones planas). En la fibra de un material 2 el esfuerzo es σ₂ = E₂ε = nE₁ε = nσ₁. Para que una sección de un solo material dé la misma fuerza, el ancho del material 2 se multiplica por n: el área "equivale" a n veces material 1.

## Esfuerzos
Con la sección transformada se calcula I_{t}. El material base tiene σ = My/I_{t}; el transformado, n veces eso, porque su módulo es n veces mayor.

## Concreto armado
Es exactamente la misma idea: el acero se reemplaza por n·A_{s} de concreto (n ≈ 8–10). Así se calculan esfuerzos de servicio y la inercia fisurada.`);
CRI('cmp',[
['¿Por qué se transforma el ancho y no la altura?',['Por convención','Porque la deformación depende de la posición y; cambiar la altura cambiaría las distancias al eje','Por costumbre','No importa'],1,'Ancho por esfuerzo es fuerza por unidad de altura. Escalar el ancho mantiene posiciones y deformaciones iguales.']]);
DED('flx2',`## Superposición
Una carga excéntrica P equivale a una carga centrada P más un momento M = P·e. Como el material es elástico, los esfuerzos se suman: σ = P/A ± Mc/I.

## Núcleo central
En un rectángulo de ancho b: σ_{mín} = P/(bh)(1 − 6e/b). Se anula cuando e = b/6. Si la carga cae dentro del tercio central, toda la sección queda comprimida.

## Biaxial
Con excentricidades en ambas direcciones se suman los tres términos. El punto crítico es la esquina donde los dos momentos producen compresión adicional.`);
CRI('flx2',[
['Un muro de piedra sin mortero recibe una carga fuera del tercio central. ¿Qué pasa?',['Nada','Aparece tensión en un borde: las piedras se separan y el muro puede volcar','Se vuelve más fuerte','Se comprime más uniforme'],1,'La mampostería sin refuerzo no resiste tensión. Por eso los muros de gravedad y los arcos deben tener la línea de presiones en el núcleo.']]);
DED('agr',`## Módulo de fineza
Es la suma de los porcentajes retenidos acumulados en las mallas estándar (N.° 100, 50, 30, 16, 8, 4, 3/8″, 3/4″, 1½″ y mayores) dividida entre 100. Equivale a un "tamaño promedio" en escala logarítmica: una arena gruesa tiene MF alrededor de 3; una fina, alrededor de 2.3.

## Humedad y absorción
El agregado puede traer agua superficial (que se suma al agua de mezcla) o estar seco (y absorber agua de la mezcla). El agua libre que aporta es P_{seco}(w − abs): si w > abs aporta; si w < abs, quita. Por eso la mezcla se corrige con la humedad de obra (Abanto Castillo, Tecnología del concreto).`);
CRI('agr',[
['La arena llegó muy húmeda a obra después de una lluvia. ¿Qué haces con la dosificación?',['Nada','Reduzco el agua de mezcla en el agua libre que trae la arena','Agrego más agua','Agrego más cemento solamente'],1,'Si no se corrige, la a/c real sube y la resistencia baja. La humedad se mide y se corrige el agua en cada tanda.']]);
REF('agr',['Abanto Castillo, Tecnología del concreto','NTP 400.012 y ASTM C136 (granulometría)']);
DED('mez',`## Método del volumen absoluto (ACI 211.1)
Un metro cúbico de concreto es la suma de los volúmenes absolutos de sus componentes: cemento, agua, agregados y aire. Cada volumen es su masa dividida entre su densidad: cemento 3150 kg/m³, agua 1000. Se fijan el agua (por asentamiento y tamaño máximo), la a/c (por resistencia) y el agregado grueso (por tablas); el agregado fino completa el metro cúbico.

## La a/c manda
La resistencia depende sobre todo de la relación agua/cemento: la ley de Abrams (1918) dice que f = A/B^{a/c}. Más agua, más poros y menos resistencia.`);
CRI('mez',[
['En obra el concreto está "duro" y el operario agrega agua al mixer. ¿Consecuencia?',['Mejor trabajabilidad sin problema','Sube la a/c y baja la resistencia y la durabilidad','Mejora el curado','Nada'],1,'Si se necesita trabajabilidad, se usa aditivo o se corrige el diseño, nunca agua sola.']]);
REF('mez',['ACI 211.1, Standard Practice for Selecting Proportions for Normal Concrete','Kosmatka y otros, Design and Control of Concrete Mixtures (PCA)','Rivva López, Diseño de mezclas']);
DED('ref',`## Cuantía
ρ = A_{s}/(bd) relaciona el acero con el área efectiva. Permite comparar vigas de distinto tamaño.

## Peso del acero
El acero pesa 7850 kg/m³. Una barra de área A_{s} cm² (= A_{s}·10⁻⁴ m²) y longitud L m tiene un volumen A_{s}·10⁻⁴·L m³ y pesa 7850·A_{s}·10⁻⁴·L = 0.785·A_{s}·L kg. Para una barra de 1/2″ (1.29 cm²): 0.785·1.29 ≈ 1.01 kg/m; las tablas comerciales dan 0.99 kg/m porque usan el diámetro nominal exacto (12.7 mm, área 1.267 cm²).`);
CRI('ref',[
['¿Por qué no se puede reemplazar libremente barras de 5/8″ por más barras de 1/2″?',['Siempre se puede','Hay que verificar espaciamientos, recubrimientos y anclajes, no solo el área','Porque son de otro color','Por el precio'],1,'El área puede ser igual, pero la separación libre mínima y las longitudes de anclaje cambian.']]);
DED('adt',`## Reducción de agua
Los superplastificantes dispersan las partículas de cemento (repulsión electrostática o estérica): la misma trabajabilidad se logra con menos agua. Con menos agua y el mismo cemento, baja la a/c y sube la resistencia.

## Aire incorporado
Las burbujas son vacíos: reducen el área resistente. La regla práctica de unos 5 % menos de resistencia por cada 1 % de aire viene de ensayos (Neville). A cambio, protegen al concreto del congelamiento: el agua que se congela se expande dentro de las burbujas.`);
CRI('adt',[
['En una obra a 4500 m de altitud con heladas nocturnas, ¿qué aditivo es clave?',['Retardante','Incorporador de aire','Colorante','Ninguno'],1,'Los ciclos de hielo y deshielo destruyen el concreto sin aire incorporado.']]);
DED('alb2',`## Por qué x̄ − s
La resistencia característica debe ser superada por la gran mayoría de las unidades del muro. Restar una desviación estándar al promedio da un valor que, con distribución normal, supera aproximadamente el 84 % de los resultados. La E.070 adopta ese criterio para f′_{m} y v′_{m}.

## Corrección por esbeltez
Una pila alta y delgada falla con menos carga que una baja por efectos de esbeltez y de restricción de los platos de la prensa. La norma estandariza a una esbeltez de referencia con factores de corrección.`);
CRI('alb2',[
['Las pilas de una obra dieron promedio alto pero con mucha dispersión. ¿Qué indica?',['Que todo está bien','Mano de obra o unidades irregulares: f′_{m} = x̄ − s sale bajo','Que el ladrillo es nuevo','Nada'],1,'La dispersión castiga la resistencia de diseño. Controlar el mortero y la mano de obra sube f′_{m}.']]);
REF('alb2',['San Bartolomé, Construcciones de albañilería: comportamiento sísmico y diseño estructural (PUCP)','E.070 Albañilería, ensayos de pilas y muretes']);
DED('abr',`## Abrasión Los Ángeles
Mide qué fracción del agregado se desgasta por impacto y fricción. Un agregado que se desgasta mucho produce finos en la mezcla y falla en pavimentos.

## Equivalente de arena
Se agita la arena en una solución floculante: los finos arcillosos quedan en suspensión y la arena se deposita. La relación de alturas indica qué tan limpia está.`);
CRI('abr',[
['Una cantera con EA = 45 % para concreto de f′_{c}=280:',['Es excelente','Tiene muchos finos arcillosos: más demanda de agua y menos resistencia; conviene lavar o buscar otra','No importa','Mejora la durabilidad'],1,'Los finos arcillosos absorben agua y debilitan la adherencia pasta-agregado.']]);
DED('niv',`## Altura instrumental
El nivel define un plano horizontal. Si apuntas a una mira sobre un punto de cota conocida y lees V_{atrás}, el plano está a AI = Cota + V_{atrás}. Cualquier otra lectura V_{adelante} da la cota del nuevo punto: Cota = AI − V_{adelante}.

## Error de cierre
Los errores accidentales se acumulan como la raíz del número de estaciones, que es proporcional a la raíz de la distancia. Por eso la tolerancia se expresa como e = c·√K, con K en km (12 mm para trabajos ordinarios, menos para precisión).`);
CRI('niv',[
['Una nivelación de 4 km cierra con 30 mm de error y la tolerancia es 12√K. ¿Se acepta?',['Sí','No: la tolerancia es 24 mm','Siempre se acepta','Depende del día'],1,'12√4 = 24 mm < 30 mm. Se repite el tramo o se busca el error.']]);
REF('niv',['Mendoza Dueñas, Topografía: técnicas modernas','Ghilani y Wolf, Elementary Surveying: An Introduction to Geomatics']);
DED('pol',`## Proyecciones
Con el azimut medido desde el norte en sentido horario, el desplazamiento al este es d·sen Az y al norte d·cos Az. Es la descomposición vectorial con ángulos medidos desde el eje y.

## Suma de ángulos internos
Un polígono de n lados se divide en n − 2 triángulos desde un vértice; cada uno suma 180°.

## Precisión
El error de cierre lineal dividido entre el perímetro: 1/5000, 1/10000. Indica la calidad del trabajo independientemente del tamaño.`);
CRI('pol',[
['La poligonal no cierra en coordenadas pero sí en ángulos. ¿Dónde buscas el error?',['En los ángulos','En las distancias','En el GPS','En la libreta de colores'],1,'Si los ángulos cierran, el error está en una distancia mal medida o mal anotada.']]);
DED('are',`## Fórmula del área por coordenadas (de Gauss o del zapatero)
Cada lado del polígono forma un trapecio con el eje; sumando las áreas con signo, las partes externas se cancelan. Al desarrollar queda A = ½|Σ(x_{i}y_{i+1} − x_{i+1}y_{i})|.

## Áreas medias
El volumen entre dos secciones se aproxima como un prisma con el promedio de las áreas: V = L(A₁ + A₂)/2. Sobreestima un poco cuando las secciones son muy distintas; la fórmula prismoidal corrige eso.

## Esponjamiento
Excavar suelta el material: un m³ en banco ocupa 1 + e m³ suelto. Los volquetes se cargan con volumen suelto.`);
CRI('are',[
['Calculas 1000 m³ de corte en banco y pides volquetes para 1000 m³. ¿Qué falta?',['Nada','Considerar el esponjamiento: se transportan 1000(1 + e) m³ sueltos','Restar el agua','Dividir entre 2'],1,'Con e = 25 %, necesitas transportar 1250 m³ sueltos.']]);
DED('cin',`## Temperatura
La cinta de acero se calibra a T₀ (20 °C). A otra temperatura se dilata α(T − T₀)L: mide de menos si está caliente.

## Tensión
Tirar más fuerte la estira (P − P₀)L/(AE), por Hooke.

## Catenaria
Una cinta colgada forma una catenaria: la cuerda es más corta que la longitud de la cinta. Usando la aproximación de cable parabólico: C = −w²L³/(24P²).

## Pendiente
La distancia horizontal es √(L² − h²) ≈ L − h²/(2L), por la aproximación √(1 − x) ≈ 1 − x/2.`);
CRI('cin',[
['Mediste en verano a 35 °C con cinta calibrada a 20 °C, sin corregir. ¿La distancia real es mayor o menor que la leída?',['Menor','Mayor: la cinta se dilató y cada "metro" es más largo','Igual','Depende'],1,'Una cinta dilatada cabe menos veces en la distancia: lee de menos. La corrección es positiva.']]);
DED('tq',`## Distancia estadimétrica
Los hilos del retículo subtienden en la mira una longitud s. Por semejanza de triángulos, la distancia inclinada es K·s (K = 100). Con el anteojo inclinado α, la mira vertical no es perpendicular a la visual: proyectando dos veces, D_{H} = Ks cos²α.

## Nivelación trigonométrica
La diferencia de altura es ΔV = D tan α (o S sen α). Se suman la altura del instrumento y se resta la altura de la señal.

## Curvatura y refracción
En distancias largas, la tierra curva hacia abajo y la refracción dobla la visual: el efecto combinado es aproximadamente 0.0675D² (m, con D en km).`);
CRI('tq',[
['En una nivelación trigonométrica a 3 km, ¿se puede ignorar la curvatura?',['Sí','No: son unos 0.6 m','Solo de día','Solo con GPS'],1,'0.0675·3² ≈ 0.61 m. A distancias largas la corrección es grande.']]);
DED('cn',`## Interpolación
Entre dos puntos de cota conocida, se supone que el terreno varía linealmente. La curva de cota c pasa a la fracción (c − z_{A})/(z_{B} − z_{A}) de la distancia entre ellos: es una regla de tres.

## Pendiente
La equidistancia dividida entre la separación horizontal entre curvas es la pendiente. Curvas juntas: pendiente fuerte; separadas: suave.

## Trazo de pendiente constante
Para una vía con pendiente i, la abertura del compás en el plano es d = equidistancia/i (en escala): así se marca el trazo preliminar entre curvas.`);
CRI('cn',[
['Las curvas de nivel se cruzan en un plano. ¿Qué significa?',['Es normal','Error o un acantilado en voladizo; en terreno natural casi nunca ocurre','Una quebrada','Un río'],1,'Una curva representa puntos de igual cota: dos curvas distintas no pueden pasar por el mismo punto salvo en un voladizo.']]);
DED('rep',`## Ángulo de deflexión
En una curva circular, el ángulo entre la tangente y una cuerda es la mitad del ángulo central que subtiende (ángulo semiinscrito). Una cuerda de longitud c subtiende un ángulo central φ = c/R (rad); la deflexión es φ/2 = c·90/(πR) en grados.

## Cuerda
Por geometría del triángulo isósceles: cuerda = 2R sen(φ/2).

## Ordenadas desde la tangente
Por Pitágoras en el círculo: y = R − √(R² − x²).

## Deflexión al PT
Al final de la curva, la deflexión acumulada es la mitad del ángulo de deflexión total Δ.`);
CRI('rep',[
['Replanteando con deflexiones, el último punto no cae en el PT. ¿Qué revisas?',['Nada','Las cuerdas usadas (cuerda vs arco) y los ángulos acumulados','El color de las estacas','La hora'],1,'Si se usan cuerdas en vez de arcos sin corregir, o hay errores acumulados de ángulo, el cierre falla.']]);
DED('utm',`## Factor de escala
La proyección UTM es un cilindro transversal secante: las distancias en el plano no son iguales a las del elipsoide. El factor k varía de 0.9996 en el meridiano central a algo más de 1 en los bordes de la zona.

## Factor de elevación
Una distancia medida a altura h está sobre una esfera de radio R + h; al reducirla al nivel del elipsoide se multiplica por R/(R + h). En la sierra (h = 3500 m) el factor es ≈ 0.99945.

## Factor combinado
F = k·k_{e}. Las distancias de planos UTM se dividen entre F para replantear en el terreno. En Cusco o Puno ignorarlo da errores de decímetros por kilómetro.`);
CRI('utm',[
['Replanteas una vía en Puno con distancias tomadas directamente de un plano UTM. ¿Qué error cometes?',['Ninguno','Las distancias en el terreno serán distintas por el factor de escala y de elevación','Solo error de ángulo','Error de nivel'],1,'A 3800 m, F puede diferir de 1 en más de 0.0006: unos 60 cm por km.']]);
DED('fot',`## Escala
Por semejanza de triángulos entre el sensor (a distancia f de la lente) y el terreno (a distancia H): tamaño en la imagen/tamaño real = f/H.

## GSD
Un píxel de tamaño p en el sensor corresponde en el terreno a p·H/f. Es la resolución: a menor altura, píxel más pequeño y más detalle, pero más fotos.

## Traslape
Para reconstruir en 3D, cada punto debe aparecer en varias fotos (visión estereoscópica). Con 70 % de traslape lateral, cada nueva línea avanza solo el 30 % del ancho de la huella.`);
CRI('fot',[
['Un levantamiento con dron sin puntos de control se usa para metrados de movimiento de tierras. ¿Riesgo?',['Ninguno','El modelo puede tener errores de escala y de nivel de varios decímetros','Las fotos salen oscuras','Solo errores de color'],1,'Sin GCP medidos con GNSS RTK, el modelo depende solo del GPS del dron, de precisión métrica.']]);
DED('geo1',`## Peso específico y porosidad
γ = W/V es el peso por unidad de volumen. La porosidad n = V_{v}/V es la fracción de vacíos. Una roca porosa absorbe más agua y es menos durable: la absorción (W_{sat} − W_{s})/W_{s} es un indicador rápido de calidad para agregados y piedra de construcción.

## Gravedad específica de una mezcla
Si la roca tiene minerales en fracciones f_{i} (en volumen) con gravedades G_{i}, su G es el promedio ponderado ΣfiGi: la masa total es la suma de las masas de cada mineral.`);
CRI('geo1',[
['Para un enrocado de defensa ribereña, ¿qué roca prefieres?',['Lutita blanda','Roca ígnea densa y poco absorbente (andesita, granito sano)','Yeso','Arenisca muy porosa'],1,'Una roca densa y poco porosa resiste el impacto del agua y la meteorización.']]);
REF('geo1',['González de Vallejo, Ingeniería geológica','Blyth y de Freitas, Geología para ingenieros']);
DED('geo2',`## Espesor real de un estrato
En una perforación vertical, un estrato inclinado δ aparece más grueso: el espesor verdadero es t = w·sen δ (con w el ancho de afloramiento medido perpendicular al rumbo en superficie horizontal).

## Buzamiento aparente
En un corte que no es perpendicular al rumbo, la capa parece menos inclinada: tan α = tan δ·sen β, con β el ángulo entre el corte y el rumbo.`);
CRI('geo2',[
['Un talud de carretera tiene estratos que buzan hacia la vía. ¿Qué riesgo hay?',['Ninguno','Deslizamiento planar a lo largo de las capas','Más estabilidad','Inundación'],1,'Si las discontinuidades buzan hacia el corte con ángulo menor que la cara del talud, los bloques pueden deslizar.']]);
DED('geo3',`## Ecuación universal de pérdida de suelo (USLE)
Wischmeier y Smith (1978) ajustaron miles de parcelas: la erosión anual es el producto de la erosividad de la lluvia R, la erodabilidad del suelo K, la topografía LS, la cobertura C y las prácticas de conservación P. Cada factor multiplica: si la cobertura reduce a la mitad, la erosión baja a la mitad.

## Huaicos
Un huaico es agua con mucho sedimento: su caudal es el del agua multiplicado por un factor de "bulking" que puede ser 1.5 a 3. Por eso las alcantarillas diseñadas solo para agua clara se atoran.`);
CRI('geo3',[
['¿Por qué una ladera deforestada produce más huaicos?',['Por el clima','Porque se pierde la cobertura (C sube) y las raíces que sujetan el suelo','Por los animales','No los produce'],1,'La vegetación reduce el impacto de la lluvia y amarra el suelo.']]);
DED('geo4',`## Refracción
Una onda que viaja por el suelo superficial (V₁) choca con un estrato más rápido (V₂) y se refracta; con el ángulo crítico (sen θ_{c} = V₁/V₂) viaja por la interfaz y vuelve a superficie. A partir de cierta distancia (de cruce), la onda refractada llega antes que la directa.

## Profundidad del estrato
Igualando los tiempos de la onda directa y la refractada en la distancia de cruce x_{c}, se obtiene z = (x_{c}/2)√((V₂ − V₁)/(V₂ + V₁)) (Redpath, Seismic Refraction Exploration for Engineering Site Investigations).`);
CRI('geo4',[
['La refracción sísmica no detecta una capa blanda debajo de una dura. ¿Por qué?',['Por error del equipo','Porque la refracción necesita velocidades crecientes con la profundidad: una capa más lenta debajo queda oculta','Por la lluvia','Siempre la detecta'],1,'Es la limitación de la "capa oculta". Por eso se complementa con perforaciones o MASW.']]);
DED('geo5',`## Rendimiento específico
Al bajar el nivel freático Δh en un área A, el acuífero libre entrega S_{y}·A·Δh de agua: S_{y} es la fracción del volumen que drena por gravedad.

## Velocidad real
Darcy da una velocidad "aparente" v = Ki por toda el área. El agua solo pasa por los poros efectivos: la velocidad real es v/n_{e}. Con ella se estima cuánto tarda un contaminante en llegar a un pozo.`);
CRI('geo5',[
['Un relleno sanitario sin geomembrana sobre grava permeable a 200 m de un pozo:',['No hay riesgo','El lixiviado puede llegar al pozo en poco tiempo por la alta permeabilidad','Mejora el agua','Solo afecta de noche'],1,'Con K alta y n_{e} baja, la velocidad real es grande: el contaminante avanza rápido.']]);
