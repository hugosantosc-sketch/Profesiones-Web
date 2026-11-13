/* Deducciones y criterio: geotecnia */
DED('fas',`## El diagrama de fases
Un suelo es sólido, agua y aire. Si se toma el volumen de sólidos igual a 1, los vacíos valen e (relación de vacíos) y el agua, S·e. El peso de sólidos es G_{s}γ_{w} y el del agua S·e·γ_{w}.

## La relación fundamental
El contenido de humedad es peso de agua sobre peso de sólidos: w = S·e·γ_{w}/(G_{s}γ_{w}), de donde S·e = w·G_{s}.

## Pesos específicos
γ_{d} = peso de sólidos/volumen total = G_{s}γ_{w}/(1 + e). γ = (G_{s} + Se)γ_{w}/(1 + e). Porosidad n = e/(1 + e). Todo sale de dibujar el diagrama (Das, Fundamentos de ingeniería geotécnica).`);
CRI('fas',[
['Dos arenas con igual γ_{d} pero distinta G_{s}. ¿Tienen la misma compacidad?',['Sí','No: con distinta G_{s}, la misma γ_{d} implica distinta relación de vacíos','Siempre','No se sabe nada'],1,'e = G_{s}γ_{w}/γ_{d} − 1: la compacidad depende de e, no solo de γ_{d}.']]);
REF('fas',['Das, Fundamentos de ingeniería geotécnica','Juárez Badillo y Rico Rodríguez, Mecánica de suelos, tomo I','Lambe y Whitman, Mecánica de suelos']);
DED('cla',`## Coeficientes de la curva granulométrica
C_{u} = D₆₀/D₁₀ mide cuán extendida está la curva: muchos tamaños (bien graduado) o pocos (uniforme). C_{c} = D₃₀²/(D₁₀D₆₀) mide su forma: entre 1 y 3 la curva es suave, sin "huecos" de tamaños.

## Límites de Atterberg
LL y LP marcan humedades en las que el suelo cambia de estado (líquido, plástico, semisólido). IP = LL − LP es el rango plástico.

## La línea A de Casagrande
A = 0.73(LL − 20) separa empíricamente arcillas (encima) de limos (debajo) en la carta de plasticidad, a partir de cientos de suelos clasificados por Casagrande (1948).`);
CRI('cla',[
['Una arcilla CH (alta plasticidad) bajo una losa de vivienda en Piura:',['No hay problema','Puede hincharse y contraerse con la humedad: riesgo de fisuras por suelo expansivo','Es ideal','Es arena'],1,'Las arcillas de alta plasticidad cambian mucho de volumen con la humedad. Se reemplazan o estabilizan.']]);
DED('cpt',`## Curva de compactación
Con poca agua, las partículas no deslizan; con mucha, el agua ocupa el lugar del suelo. Proctor (1933) mostró que hay una humedad óptima que da la máxima densidad seca para una energía dada.

## Densidad seca
Del diagrama de fases: γ = γ_{d}(1 + w), así γ_{d} = γ/(1 + w).

## Grado de compactación
GC = γ_{d,campo}/γ_{d,máx}. Las especificaciones piden 95 % del Proctor modificado en bases y rellenos estructurales.`);
CRI('cpt',[
['El relleno se compactó muy por debajo de la humedad óptima y alcanzó 95 %. ¿Riesgo?',['Ninguno','Puede colapsar o asentarse al humedecerse después','Es mejor','Nada cambia'],1,'Un suelo compactado seco tiene estructura floculada: al mojarse puede reacomodarse y asentarse.']]);
DED('efe',`## Principio de esfuerzos efectivos (Terzaghi, 1925)
En un suelo saturado, la carga total σ se reparte entre el esqueleto de partículas (σ′) y el agua de poros (u): σ = σ′ + u. El agua no resiste corte; por eso la resistencia y la compresibilidad del suelo dependen solo de σ′.

## Esfuerzo total
Es el peso de todo lo que hay encima: Σγ_{i}h_{i}.

## Presión de poros
Con agua en reposo, u = γ_{w}h_{w}.

## Peso sumergido
Bajo el nivel freático, γ′ = γ_{sat} − γ_{w}: el agua empuja hacia arriba a las partículas (Arquímedes).`);
CRI('efe',[
['Si sube el nivel freático en un terreno, ¿qué pasa con σ′ a cierta profundidad?',['Sube','Baja: aumenta u y el suelo pierde resistencia','No cambia','Se vuelve cero siempre'],1,'Con más agua, u crece y σ′ = σ − u disminuye. Por eso los taludes fallan en temporada de lluvias.']]);
REF('efe',['Terzaghi, Peck y Mesri, Soil Mechanics in Engineering Practice','Das, Fundamentos de ingeniería geotécnica']);
DED('flu',`## Ley de Darcy (1856)
Darcy midió que el caudal de agua a través de una columna de arena es proporcional a la diferencia de carga y al área, e inversamente proporcional a la longitud: Q = kA·Δh/L = kiA.

## Redes de flujo
Para flujo en dos dimensiones, se dibujan líneas de flujo y equipotenciales formando cuadrados curvilíneos. Cada canal lleva el mismo caudal y cada salto de equipotencial pierde la misma carga: q = kH·N_{f}/N_{d}.

## Gradiente crítico
Cuando el agua sube, empuja las partículas. Si la fuerza de filtración iγ_{w} iguala el peso sumergido γ′, el suelo "hierve": i_{c} = γ′/γ_{w} = (G_{s} − 1)/(1 + e) ≈ 1.`);
CRI('flu',[
['Al excavar una zanja bajo el nivel freático en arena, el fondo empieza a "hervir". ¿Qué pasa?',['Es normal','El gradiente ascendente llegó al crítico: el suelo pierde resistencia (sifonamiento)','Hay un manantial','Es buena señal'],1,'Se debe bajar el nivel freático con bombeo o alargar el camino del agua con tablestacas más profundas.']]);
DED('cns',`## Consolidación unidimensional
Una arcilla saturada cargada expulsa agua lentamente. La relación de vacíos baja proporcionalmente al logaritmo del esfuerzo efectivo: Δe = C_{c}·log(σ′_{f}/σ′₀). Como S = H·Δe/(1 + e₀), se obtiene la fórmula del asentamiento.

## Tiempo
Terzaghi resolvió la ecuación de difusión de la presión de poros: ∂u/∂t = c_{v}∂²u/∂z². El grado de consolidación depende del factor de tiempo T_{v} = c_{v}t/H_{d}². Para el 90 %, T_{v} = 0.848; para el 50 %, 0.197.

## Camino de drenaje
H_{d} es la distancia que recorre el agua: la mitad del estrato si drena por ambas caras. El tiempo crece con H_{d}²: un estrato el doble de grueso tarda cuatro veces más.`);
CRI('cns',[
['Un edificio sobre arcilla blanda se asienta 2 cm el primer año. ¿Ya terminó?',['Sí','No necesariamente: la consolidación puede seguir por años','Siempre termina en un mes','Es arena'],1,'El asentamiento por consolidación evoluciona con el tiempo según T_{v}. Se monitorea con hitos topográficos.']]);
REF('cns',['Terzaghi, Erdbaumechanik (1925)','Holtz y Kovacs, An Introduction to Geotechnical Engineering']);
DED('res',`## Criterio de Mohr-Coulomb
Coulomb (1776) propuso que la resistencia de un suelo tiene una parte de cohesión y otra de fricción: τ = c + σ′tan φ. Mohr la interpretó como la envolvente tangente a los círculos de esfuerzos de falla.

## Relación entre esfuerzos principales
Si el círculo de falla es tangente a la recta de Coulomb, por geometría: σ₁ = σ₃tan²(45° + φ/2) + 2c·tan(45° + φ/2).

## Ángulo del plano de falla
El punto de tangencia está a 2θ = 90° + φ en el círculo, por lo que el plano de falla forma θ = 45° + φ/2 con el plano del esfuerzo principal menor.`);
CRI('res',[
['¿Por qué un ensayo no drenado de arcilla da φ ≈ 0?',['Por error','Porque sin drenaje el agua toma el aumento de carga y σ′ no cambia: la resistencia es constante (c_{u})','Porque la arcilla no tiene fricción','Por el aparato'],1,'Al aumentar σ total sin drenaje, u sube igual; σ′ y la resistencia no cambian.']]);
DED('esf2',`## Boussinesq (1885)
Para una carga puntual en la superficie de un semiespacio elástico, homogéneo e isótropo, la teoría de la elasticidad da Δσ_{z} = (3Q/(2πz²))·[1/(1 + (r/z)²)]^{5/2}. Para áreas cargadas se integra la solución punto a punto (cartas de Newmark).

## Método 2:1
Es una aproximación: se supone que la carga se reparte en un área que crece con pendiente 2 vertical a 1 horizontal. Conserva la fuerza total: Q = Δσ·(B + z)(L + z).`);
CRI('esf2',[
['Dos zapatas vecinas muy cercanas sobre arcilla. ¿Qué pasa con los bulbos?',['Nada','Se superponen: el suelo entre ambas recibe más esfuerzo y el asentamiento crece','Se anulan','Se cancelan'],1,'Los incrementos de esfuerzo se suman. Zapatas cercanas se asientan más que aisladas.']]);
DED('exp',`## Por qué 1.5B
El incremento de esfuerzo bajo una zapata cae al 10–20 % de la presión de contacto entre 1.5B y 2B. Por debajo, el suelo casi no influye en el asentamiento. La E.050 fija la profundidad mínima con ese criterio.

## Número de puntos
La variabilidad del suelo exige varios puntos: con uno solo no se ve cómo cambian los estratos en planta.`);
CRI('exp',[
['El estudio de suelos se hizo con una sola calicata en una esquina del terreno. ¿Qué riesgo hay?',['Ninguno','No detecta cambios de estrato: rellenos antiguos o bolsones blandos en otra zona','Se ahorra','Es suficiente siempre'],1,'Los suelos varían en distancias cortas. La E.050 exige un mínimo de puntos según el área y la importancia.']]);
REF('exp',['E.050 Suelos y cimentaciones','Hunt, Geotechnical Engineering Investigation Handbook']);
DED('perm',`## Carga constante
De Darcy: Q/t = k(h/L)A, de donde k = QL/(Aht).

## Carga variable
El agua baja en un tubo de área a: −a·dh/dt = k(h/L)A. Separando e integrando entre h₁ y h₂: k = (aL/(At))·ln(h₁/h₂).

## Bombeo (Dupuit-Thiem)
Alrededor de un pozo en acuífero libre, el caudal atraviesa cilindros de área 2πrh: Q = k·(dh/dr)·2πrh. Integrando entre r₁ y r₂: Q = πk(h₂² − h₁²)/ln(r₂/r₁).`);
CRI('perm',[
['¿Por qué el ensayo de bombeo en campo es más representativo que el de laboratorio?',['No lo es','Porque mide un volumen grande de suelo con sus estratos y fisuras reales','Porque es más barato','Porque usa agua de mar'],1,'Una muestra pequeña puede no representar la permeabilidad de un depósito con lentes de arena o grava.']]);
DED('cap',`## Terzaghi (1943)
Bajo una zapata que falla, se forma una cuña rígida debajo y zonas plásticas a los lados (Prandtl). La resistencia se separa en tres contribuciones independientes, que se suman:
- c·N_{c}: la cohesión a lo largo de la superficie de falla
- q·N_{q}: la sobrecarga del suelo a los lados (q = γD_{f}), que impide que el suelo se levante
- 0.5γBN_{γ}: el peso del suelo dentro de la zona de falla

Los N dependen solo de φ y crecen muy rápido con él.

## Zapata cuadrada
Los coeficientes 1.3 y 0.4 son factores de forma empíricos de Terzaghi para zapatas cuadradas.

## Factor de seguridad
q_{a} = q_{u}/FS, con FS = 3 en condiciones estáticas (E.050).`);
CRI('cap',[
['¿Por qué cimentar más profundo aumenta la capacidad portante en arena?',['No la aumenta','Porque crece q = γD_{f} y el término qN_{q} es grande en arenas','Por la humedad','Por el concreto'],1,'La sobrecarga lateral confina el suelo y dificulta la falla.'],
['¿Por qué FS = 3 y no 1.5?',['Por costumbre','Porque cubre la incertidumbre del suelo y limita asentamientos, no solo la falla','Para gastar más','Es igual'],1,'Con FS = 3, la presión de servicio queda lejos de la plastificación y los asentamientos son moderados.']]);
REF('cap',['Terzaghi, Theoretical Soil Mechanics (1943)','Das, Principios de ingeniería de cimentaciones','E.050 Suelos y cimentaciones']);
DED('zap',`## Área
La presión del suelo en servicio no debe superar q_{a}: A = P/q_{a}.

## Flexión
El volado de la zapata (m = (B − c)/2) es una losa en voladizo cargada por la presión neta q_{u}: M = q_{u}·B·m²/2.

## Punzonamiento
La columna tiende a perforar la zapata a lo largo de un tronco de pirámide. La sección crítica está a d/2 de la cara de la columna, con perímetro b_{o} = 4(c + d) en columnas cuadradas. La resistencia del concreto es 1.06√f′_{c}·b_{o}d (0.33√f′_{c} en MPa), el doble que en vigas, por el confinamiento en dos direcciones.`);
CRI('zap',[
['Si el punzonamiento no cumple, ¿qué es lo más eficiente?',['Agrandar la zapata en planta','Aumentar el peralte d: sube el perímetro crítico y el área resistente','Más acero','Bajar f′_{c}'],1,'El punzonamiento depende de b_{o}·d. Más área en planta casi no ayuda.']]);
DED('emp',`## Rankine (1857)
Si un muro se aleja ligeramente del relleno, el suelo llega al estado límite activo: el esfuerzo horizontal es el mínimo compatible con el equilibrio plástico. Con el círculo de Mohr tangente a la envolvente (c = 0): σ_{h}/σ_{v} = (1 − sen φ)/(1 + sen φ) = tan²(45° − φ/2) = K_{a}.

## Empuje
σ_{h} = K_{a}γz crece linealmente: el diagrama es un triángulo de área ½K_{a}γH², con resultante a H/3 de la base.

## Estabilidad
Volteo: momentos resistentes (peso del muro y del relleno sobre el talón) entre momentos de volteo. Deslizamiento: fricción en la base entre empuje horizontal.`);
CRI('emp',[
['Un muro sin drenes se satura con lluvia. ¿Qué pasa con el empuje?',['Baja','Sube mucho: se suma el empuje hidrostático (γ_{w}H²/2), que puede duplicar la fuerza','No cambia','Se anula'],1,'Por eso todo muro de contención lleva lloraderos y material filtrante detrás.']]);
DED('tal',`## Talud infinito seco
Un bloque de suelo a profundidad z, paralelo a la superficie inclinada β: la fuerza que lo empuja es W sen β y la normal es W cos β. La resistencia por fricción es W cos β·tan φ. FS = tan φ/tan β: no depende de la profundidad.

## Con cohesión
Se agrega c en la base: FS = c/(γz sen β cos β) + tan φ/tan β. La cohesión pesa menos a mayor profundidad.

## Con flujo paralelo
El agua reduce la normal efectiva y agrega fuerza de filtración: FS = (γ′/γ_{sat})·tan φ/tan β ≈ la mitad del seco.`);
CRI('tal',[
['Un talud de arena seca con β = φ. ¿Cuál es su FS?',['2','1: está en el límite','0','Infinito'],1,'Es el ángulo de reposo. Cualquier aumento de pendiente o presencia de agua lo hace fallar.']]);
DED('pil',`## Punta
En arcillas, la capacidad de punta es la de una cimentación profunda: Skempton (1951) mostró que N_{c} ≈ 9 a gran profundidad. Q_{p} = 9c_{u}A_{p}.

## Fuste (método α)
La adherencia entre suelo y pilote es una fracción α de la resistencia no drenada: Q_{s} = α·c_{u}·(perímetro)·L. α baja en arcillas muy rígidas.

## Factor de seguridad
Se usa FS = 2 a 3 según cuánta información se tenga (pruebas de carga reducen el FS necesario).`);
CRI('pil',[
['¿Cuándo conviene una prueba de carga en pilotes?',['Nunca','En obras importantes: confirma la capacidad real y permite usar un FS menor','Solo en arena','Solo si llueve'],1,'La prueba de carga reduce la incertidumbre del cálculo, que puede ser grande en pilotes.']]);
REF('pil',['Tomlinson y Woodward, Pile Design and Construction Practice','Das, Principios de ingeniería de cimentaciones']);
DED('grp',`## Converse-Labarre
Es una fórmula empírica que reduce la capacidad del grupo según la cercanía de los pilotes (ángulo θ = arctan(D/s)) y el número de filas: cada pilote "comparte" suelo con sus vecinos.

## Falla en bloque
En arcillas, si los pilotes están muy juntos, el suelo entre ellos se mueve con el grupo. El bloque resiste por su fuste perimetral y su base.

## Carga por pilote
El cabezal rígido gira como una losa: la carga en cada pilote sigue la fórmula de flexión de una sección formada por "áreas" iguales en las posiciones de los pilotes: P/N ± M·x/Σx².`);
CRI('grp',[
['¿Por qué no se juntan los pilotes a menos de 2.5D?',['Por estética','Para limitar la pérdida de eficiencia y la interferencia al hincar o perforar','Por la norma de colores','No hay razón'],1,'Muy juntos, el grupo pierde capacidad y la construcción de un pilote puede dañar al vecino.']]);
DED('fne',`## Fricción negativa
Si el suelo se asienta más que el pilote, el esfuerzo de corte en el fuste cambia de sentido: el suelo "cuelga" del pilote. La magnitud se estima con el método β: τ = β·σ′_{v}, con β = K·tan δ ≈ 0.2–0.3 en arcillas (Burland, 1973).

## Carga lateral
Un pilote largo en un suelo con módulo de reacción k_{h} se comporta como una viga sobre fundación elástica (Hetényi). La longitud característica R = (EI/(k_{h}D))^{1/4} dice hasta qué profundidad trabaja: más allá de unos 4R, el pilote casi no se mueve.`);
CRI('fne',[
['Se construye un relleno de 3 m sobre arcilla blanda alrededor de pilotes existentes. ¿Qué pasa?',['Nada','La arcilla se consolida y genera fricción negativa: los pilotes reciben carga extra','Los pilotes se alivian','Los pilotes suben'],1,'El relleno nuevo consolida la arcilla y arrastra los pilotes hacia abajo.']]);
DED('ael',`## Elasticidad
Para una carga uniforme sobre un semiespacio elástico, integrando Boussinesq se obtiene un asentamiento proporcional a qB/E_{s}, con (1 − μ²) por el efecto de Poisson y un factor I_{f} por forma y rigidez.

## Meyerhof y el SPT
Meyerhof (1956) correlacionó el número de golpes N con la presión que produce 25 mm de asentamiento en arenas. El factor ((B + 0.3)/B)² representa que zapatas más anchas se asientan más con la misma presión.

## Distorsión angular
Skempton y MacDonald (1956) estudiaron edificios dañados: fisuras en tabiques aparecen con distorsiones de 1/300; el límite de 1/500 da un margen.`);
CRI('ael',[
['Una zapata grande y una pequeña con la misma presión sobre arena. ¿Cuál se asienta más?',['La pequeña','La grande: el asentamiento crece con B','Igual','Ninguna'],1,'S ∝ qB: a igual presión, la grande compromete un volumen de suelo mayor.']]);
DED('cz1',`## Presión trapezoidal
Una zapata con carga P y momento M equivale a P con excentricidad e = M/P. Si la presión del suelo varía linealmente: q = P/A ± M/S, con S = LB²/6: q = (P/(BL))(1 ± 6e/B).

## Excentricidad grande
Si e > B/6, la fórmula da tensión en un borde, pero el suelo no tira: la zapata se levanta. El suelo comprimido forma un triángulo de base 3(B/2 − e), y su resultante debe pasar por la carga: q_{máx} = 2P/(3L(B/2 − e)).`);
CRI('cz1',[
['Una zapata de muro de contención con e > B/6:',['Está bien','Una parte de la base se levanta: conviene agrandar la zapata para llevar e al tercio central','Es más estable','No importa'],1,'Con e > B/6 crece mucho la presión máxima y se reduce el área de contacto.']]);
DED('cz2',`## Por qué el centroide de la zapata coincide con la resultante
Si la resultante de las cargas pasa por el centroide del área, la presión del suelo es uniforme: no hay momento neto. La resultante de dos columnas está en x̄ = P₂s/(P₁ + P₂) desde la columna 1.

## Longitud
Si la columna 1 está en el lindero, la zapata empieza en su borde: L = 2(c₁/2 + x̄) para que el centroide quede en x̄.

## Diseño
La zapata es una viga invertida cargada por la presión uniforme del suelo y apoyada en las columnas.`);
CRI('cz2',[
['¿Cuándo se usa una zapata combinada?',['Siempre','Cuando una columna está en el lindero o dos columnas están tan cerca que sus zapatas se superponen','Nunca','Solo en roca'],1,'Combinar reparte la carga excéntrica de la columna de lindero con la vecina.']]);
DED('cz3',`## Viga de conexión
La zapata de la columna de lindero tiene su carga excéntrica (e = B₁/2 − c₁/2). La viga de conexión toma el momento P₁·e y lo lleva a la zapata interior.

## Reacción
Tomando momentos respecto a la columna 2: R₁·(s − e) = P₁·s, así R₁ = P₁s/(s − e) > P₁. La zapata exterior recibe más carga que su columna; la interior recibe menos (R₂ = P₂ − (R₁ − P₁)).`);
CRI('cz3',[
['¿Qué pasa si la viga de conexión es muy flexible?',['Nada','La zapata de lindero gira y la presión deja de ser uniforme','Mejora todo','Se vuelve combinada'],1,'La viga debe ser rígida para que la zapata excéntrica no gire. Suele tener un peralte importante.']]);
DED('cz4',`## Hipótesis de Winkler (1867)
El suelo se modela como resortes independientes: la presión en cada punto es proporcional al asentamiento en ese punto, q = k_{s}δ.

## Corrección por tamaño (Terzaghi, 1955)
El k medido con una placa de 30 cm no vale para una platea grande: una placa mayor comprime un volumen mayor de suelo. Para arenas: k_{s} = k₁((B + 0.3)/(2B))²; para arcillas: k_{s} = k₁(0.3/B).

## Longitud característica
Para una viga sobre fundación elástica (Hetényi, 1946): λ = (k_{s}b/(4EI))^{1/4}. Si λL es pequeño, la platea es rígida; si es grande, se flexiona y la presión se concentra bajo las columnas.`);
CRI('cz4',[
['¿Por qué no se usa el k de una prueba de placa directamente para una platea de 20 m?',['Sí se usa','Porque k depende del tamaño del área cargada: hay que corregirlo','Por la humedad','Por el precio'],1,'El módulo de reacción no es una propiedad del suelo sola: depende de las dimensiones de la cimentación.']]);
DED('spt',`## Energía del martillo
El N depende de la energía que realmente llega a la barra. Los martillos varían (de 30 a 90 % de la teórica); se normaliza al 60 %: N₆₀ = N·E_{r}/60.

## Corrección por confinamiento
Una arena más profunda da más golpes por estar más confinada, no por ser más densa. Liao y Whitman (1986) propusieron C_{N} = √(P_{a}/σ′_{v}) para llevar N a 1 atm.

## Correlación de φ
Hatanaka y Uchida (1996) ajustaron φ = √(20N₁(₆₀)) + 20 con ensayos triaxiales en arenas de alta calidad.`);
CRI('spt',[
['Dos laboratorios dan N = 15 y N = 25 en la misma arena. ¿Por qué podría ser?',['Uno miente','Usan martillos con distinta energía: hay que corregir a N₆₀','Por la hora','Es imposible'],1,'Sin corrección por energía, el N no es comparable entre equipos.']]);
DED('mej',`## Préstamo
La masa de sólidos se conserva: V_{p}γ_{d,p} = Vγ_{d,c}.

## Precarga
Se adelanta la consolidación: la arcilla se asienta bajo el relleno temporal antes de la obra. Los drenes acortan H_{dr}, y como t ∝ H_{dr}², el tiempo cae muchísimo.

## Compactación dinámica
Ménard (1975) observó que la profundidad mejorada crece con la energía de cada golpe: D ≈ n√(W·h).`);
CRI('mej',[
['¿Por qué los drenes verticales aceleran tanto la consolidación?',['No la aceleran','Porque acortan el camino del agua y el tiempo depende del cuadrado de ese camino','Porque secan el suelo','Por la presión'],1,'De 10 m de camino vertical a 1 m horizontal, el tiempo baja cien veces.']]);
DED('liq',`## Método simplificado de Seed e Idriss (1971)
Durante el sismo, el esfuerzo cortante en una columna de suelo a profundidad z es aproximadamente la masa por la aceleración: τ_{máx} = (γz/g)a_{máx}·r_{d}, con r_{d} < 1 por la flexibilidad del suelo. El esfuerzo cíclico equivalente se toma como 65 % del máximo. Normalizando con σ′_{v} se obtiene CSR.

## Resistencia
CRR se obtiene de correlaciones con N₁(₆₀) o CPT en sitios que licuaron o no en sismos reales (Youd e Idriss, 2001).

## Magnitud
Sismos más grandes duran más ciclos: MSF reduce la resistencia para M > 7.5 y la aumenta para M < 7.5.`);
CRI('liq',[
['¿Qué suelos son más propensos a licuar?',['Arcillas rígidas','Arenas sueltas saturadas y limos no plásticos, con nivel freático alto','Roca','Gravas densas secas'],1,'La licuación requiere suelo granular suelto y saturado: el agua no alcanza a drenar durante el sismo.']]);
REF('liq',['Seed e Idriss, Simplified procedure for evaluating soil liquefaction potential (1971)','Youd e Idriss, Liquefaction Resistance of Soils (2001)','Idriss y Boulanger, Soil Liquefaction During Earthquakes']);
DED('mo',`## Mononobe-Okabe (1926-1929)
Se agrega a la cuña de Coulomb una fuerza inercial horizontal k_{h}W. Equivale a girar la gravedad un ángulo θ = arctan(k_{h}) y resolver como un empuje activo con ese ángulo.

## Simplificación de Seed y Whitman (1970)
Para muros verticales y relleno horizontal, el incremento dinámico es aproximadamente ΔK_{ae} ≈ (3/4)k_{h}. ΔE_{ae} = ½·(3/4)k_{h}·γH² = (3/8)k_{h}γH², aplicado a unos 0.6H de la base (más alto que el estático, porque la inercia es mayor arriba).`);
CRI('mo',[
['¿Por qué el incremento sísmico se aplica más alto que el empuje estático?',['Por error','Porque la aceleración de la cuña actúa en todo su volumen y el suelo superior amplifica más','Por el agua','No es así'],1,'Ensayos muestran el punto de aplicación entre 0.5H y 0.6H.']]);
DED('sn',`## Envolvente aparente
En excavaciones apuntaladas o ancladas, el suelo no llega al estado activo de Rankine: la presión se redistribuye hacia los apoyos. Terzaghi y Peck (1967) midieron cargas reales en puntales y propusieron envolventes rectangulares: 0.65K_{a}γH para arenas.

## Anclaje
Cada anclaje toma la presión de su área tributaria s_{h}·s_{v}; si está inclinado α, su fuerza axial es mayor: T = σs_{h}s_{v}/cos α.

## Bulbo
La resistencia del bulbo inyectado es su área lateral por la adherencia q_{s}: Q = πDL_{b}q_{s}.`);
CRI('sn',[
['El bulbo de un anclaje se diseña dentro de la cuña activa. ¿Problema?',['Ninguno','Sí: el bulbo debe estar detrás de la superficie de falla, en suelo estable','Mejora','Ninguno si es largo'],1,'Si el bulbo está en la cuña que se mueve, el anclaje se mueve con ella y no sostiene nada.']]);
DED('rmr',`## RQD (Deere, 1964)
Porcentaje de testigo de perforación en trozos mayores de 10 cm. Una roca muy fracturada tiene RQD bajo.

## RMR (Bieniawski, 1989)
Suma puntajes de seis parámetros: resistencia, RQD, espaciamiento de juntas, condición de juntas, agua y orientación. Va de 0 a 100.

## Q (Barton, 1974)
Producto de tres cocientes: tamaño de bloques (RQD/J_{n}), resistencia al corte entre bloques (J_{r}/J_{a}) y esfuerzos activos (J_{w}/SRF). Su escala es logarítmica.

## Relación
Bieniawski propuso RMR ≈ 9 ln Q + 44 a partir de túneles clasificados con ambos sistemas.`);
CRI('rmr',[
['Una roca muy resistente pero con juntas abiertas rellenas de arcilla:',['Es excelente','Su calidad de macizo es mala: las juntas controlan la estabilidad, no la roca intacta','No importa la junta','Es igual'],1,'El macizo falla por sus discontinuidades. Por eso las clasificaciones pesan mucho la condición de juntas.']]);
DED('tun',`## Solución de Kirsch (1898)
Para un agujero circular en una placa elástica con esfuerzo vertical σ_{v} y horizontal Kσ_{v}, la teoría de la elasticidad da en el borde del agujero: en la clave σ_{θ} = (3K − 1)σ_{v} y en los hastiales (3 − K)σ_{v}. Con K bajo, la clave puede quedar en tensión y desprender bloques.

## Presión de sostenimiento (Barton)
P = (2/J_{r})Q^{−1/3} kg/cm²: macizos de peor calidad (Q bajo) necesitan más sostenimiento.

## Carga de roca (Terzaghi, 1946)
Sobre el túnel se forma un arco de descarga; la roca suelta debajo del arco pesa sobre el sostenimiento. Su altura depende del ancho y la altura del túnel y de la calidad de la roca.`);
CRI('tun',[
['¿Por qué las secciones de túnel suelen ser curvas y no cuadradas?',['Por estética','Porque las esquinas concentran esfuerzos; una forma curva los reparte','Por el tren','Por costumbre'],1,'La solución de Kirsch muestra la concentración en un agujero circular; en esquinas vivas es mucho mayor.']]);
REF('tun',['Hoek y Brown, Underground Excavations in Rock','Bieniawski, Engineering Rock Mass Classifications (1989)','Barton, Lien y Lunde, Engineering classification of rock masses (1974)']);
