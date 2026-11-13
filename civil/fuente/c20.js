/* Deducciones y criterio: agua */
DED('fhi',`## Presión hidrostática
Una columna de agua de altura h y área A pesa γhA y descansa sobre A: la presión en la base es p = γh. No depende de la forma del recipiente (paradoja hidrostática de Stevin).

## Fuerza sobre una superficie plana
F = ∫p dA = γ∫h dA = γh_{c}A: la presión en el centroide por el área.

## Centro de presiones
La presión crece con la profundidad, así que la resultante actúa más abajo que el centroide. Igualando momentos: y_{p} = ∫y·p dA/F = ∫y²dA/(y_{c}A) = (I_{c} + Ay_{c}²)/(y_{c}A) = y_{c} + I_{c}/(y_{c}A).

## Empuje (Arquímedes)
La diferencia de presiones entre arriba y abajo de un cuerpo sumergido da una fuerza hacia arriba igual al peso del agua desplazada.`);
CRI('fhi',[
['¿Dónde actúa la fuerza del agua sobre una compuerta vertical rectangular?',['En su centroide','Debajo del centroide, en el centro de presiones','Encima del centroide','En la superficie del agua'],1,'La presión crece con la profundidad, así que la resultante baja: y_{p} = y_{c} + I_{c}/(y_{c}A). Los apoyos y bisagras se diseñan con esa ubicación.'],
['¿Por qué un tanque enterrado vacío puede "flotar" y salir del suelo?',['No puede','El empuje del agua freática sobre el tanque vacío puede superar su peso','Por el sismo','Por la presión del aire'],1,'Se verifica la flotación con nivel freático alto y tanque vacío, agregando peso o anclajes.']]);
REF('fhi',['Streeter, Wylie y Bedford, Mecánica de fluidos','Sotelo Ávila, Hidráulica general']);
DED('fbe',`## Continuidad
El agua es casi incompresible: el volumen que entra por segundo a un tramo debe salir. Q = A₁V₁ = A₂V₂.

## Bernoulli
A lo largo de una línea de corriente, sin pérdidas, la energía por unidad de peso se conserva: energía de posición z, de presión p/γ y cinética V²/(2g). Se obtiene integrando la ecuación de Euler (F = ma para un fluido) a lo largo de la línea de corriente. Las pérdidas reales se agregan como h_{f}.

## Torricelli
Para un orificio en un tanque abierto: en la superficie p = 0, V ≈ 0, z = h; en el chorro p = 0, z = 0. Bernoulli da V = √(2gh), igual que la caída libre.`);
CRI('fbe',[
['¿Por qué al reducir el diámetro de una tubería sube la velocidad y baja la presión?',['Por error','Por continuidad V sube; por Bernoulli, si sube la energía cinética, baja la de presión','Por la gravedad','No cambia'],1,'Es el principio del medidor Venturi.']]);
DED('fpe',`## Darcy-Weisbach
Por análisis dimensional, la pérdida en un tubo depende de L/D, de la energía cinética V²/(2g) y de un factor adimensional f que depende del número de Reynolds y de la rugosidad relativa (diagrama de Moody, ecuación de Colebrook).

## Reynolds (1883)
Re = VD/ν compara fuerzas de inercia con fuerzas viscosas: con Re < 2000 el flujo es laminar (f = 64/Re); con Re > 4000, turbulento.

## Hazen-Williams
Es una fórmula empírica (1902) válida para agua a temperaturas normales y flujo turbulento, muy usada en redes de agua potable. Q = 0.2785CD^{2.63}S^{0.54} (SI).

## Pérdidas locales
Válvulas y codos pierden K·V²/(2g): K se mide en laboratorio.`);
CRI('fpe',[
['Una tubería de PVC antigua y una de fierro fundido oxidada del mismo diámetro:',['Pierden igual','La de fierro oxidado pierde más: su C de Hazen-Williams es mucho menor','La de PVC pierde más','No pierden'],1,'La rugosidad aumenta con la edad y la incrustación; el C de fierro viejo puede bajar a 80 o menos.']]);
DED('fbo',`## Altura dinámica total
La bomba debe vencer el desnivel geométrico H_{e} más todas las pérdidas en succión e impulsión.

## Potencia
La potencia hidráulica es el peso de agua por segundo (γQ) por la altura que se le da (H). La eléctrica es esa dividida entre la eficiencia η.

## NPSH
La presión en la succión no debe bajar a la presión de vapor, o el agua hierve y forma burbujas que colapsan y destruyen el impulsor (cavitación). El NPSH disponible es la presión atmosférica en metros (10.33 m a nivel del mar, menos en altura) menos la altura de succión, las pérdidas y la presión de vapor.`);
CRI('fbo',[
['Una bomba que funciona bien en Lima cavita al instalarse en Cerro de Pasco. ¿Por qué?',['Por el frío','Porque a 4300 m la presión atmosférica es mucho menor y baja el NPSH disponible','Por el agua dura','Por la electricidad'],1,'A gran altitud la presión atmosférica es unos 6 m de agua en vez de 10.3: hay que reducir la altura de succión.']]);
DED('man',`## Chézy y Manning
En flujo uniforme, el peso del agua en la dirección del canal se equilibra con la fricción en el perímetro: γAL·S = τ₀PL, de donde τ₀ = γRS. Si τ₀ ∝ V², se obtiene V = C√(RS) (Chézy, 1769). Manning (1889) propuso C = R^{1/6}/n a partir de mediciones, con lo que V = (1/n)R^{2/3}S^{1/2}.

## Radio hidráulico
R = A/P representa qué tan "compacta" es la sección: más área por perímetro mojado, menos fricción relativa. La sección más eficiente para un área dada es la semicircular; en trapecios, la que inscribe un semicírculo.`);
CRI('man',[
['Un canal revestido de concreto frente a uno de tierra con igual sección y pendiente:',['Llevan lo mismo','El revestido lleva más (n ≈ 0.014 frente a 0.025) y pierde menos por infiltración','El de tierra lleva más','No se sabe'],1,'Q ∝ 1/n: el revestimiento casi duplica la capacidad y reduce filtraciones.']]);
REF('man',['Chow, Hidráulica de canales abiertos','French, Hidráulica de canales abiertos','Villón Béjar, Hidráulica de canales']);
DED('ene2',`## Energía específica
Medida desde el fondo del canal: E = y + V²/(2g) = y + q²/(2gy²) en un canal rectangular. Para un mismo q, hay dos tirantes con la misma E: uno lento (subcrítico) y uno rápido (supercrítico).

## Tirante crítico
Es el que da la energía mínima: dE/dy = 1 − q²/(gy³) = 0. Despejando y_{c} = (q²/g)^{1/3}, y en ese punto V²/(gy) = 1: Fr = 1. Reemplazando, E_{mín} = 1.5y_{c}.

## Número de Froude
Fr = V/√(gy) compara la velocidad del agua con la de una pequeña onda superficial. Con Fr < 1 las perturbaciones viajan aguas arriba; con Fr > 1 no.`);
CRI('ene2',[
['¿Por qué no se diseñan canales con Fr cercano a 1?',['Por costo','Porque el flujo crítico es inestable: el tirante oscila mucho con pequeños cambios','Por la norma de colores','Es ideal'],1,'Cerca del crítico, pequeñas variaciones de energía cambian mucho el tirante: aparecen ondas.']]);
DED('sal',`## Cantidad de movimiento
En un resalto la energía se disipa en turbulencia, así que Bernoulli no sirve; pero la cantidad de movimiento se conserva (sin fuerzas externas importantes en un tramo corto). En un canal rectangular por metro de ancho: γy₁²/2 + ρqV₁ = γy₂²/2 + ρqV₂. Resolviendo para y₂ se obtiene la ecuación de Bélanger: y₂ = (y₁/2)(√(1 + 8Fr₁²) − 1).

## Pérdida
ΔE = E₁ − E₂, que simplificando da (y₂ − y₁)³/(4y₁y₂).`);
CRI('sal',[
['¿Por qué se provoca un resalto al pie de un aliviadero?',['Para hacer espuma','Para disipar la energía del flujo supercrítico dentro de una poza revestida y no en el lecho del río','Por estética','Para medir caudal'],1,'Sin disipador, el chorro rápido socava el cauce y puede destruir la presa.']]);
DED('can2',`## Vertedero rectangular
Integrando la velocidad de Torricelli √(2gh) sobre la altura H de la lámina: Q = (2/3)C_{d}√(2g)LH^{3/2}. Con C_{d} ≈ 0.62: 1.84LH^{3/2} (SI).

## Triangular de 90°
El ancho crece con la altura: Q = (8/15)C_{d}√(2g)tan(θ/2)H^{5/2} ≈ 1.4H^{5/2}. Es más preciso para caudales pequeños.

## Orificio
Q = C_{d}A√(2gh), con C_{d} ≈ 0.6 por la contracción del chorro (vena contracta).`);
CRI('can2',[
['Para medir caudales muy pequeños en una acequia, ¿qué vertedero conviene?',['Rectangular ancho','Triangular: con poco caudal da una lámina más alta y fácil de medir','Ninguno','Circular'],1,'Por el exponente 5/2, pequeños cambios de caudal producen cambios de altura medibles.']]);
DED('rem',`## Flujo gradualmente variado
La energía total cambia a lo largo del canal: dH/dx = −S_{f}. Con H = z + E y dz/dx = −S₀: dE/dx = S₀ − S_{f}. En diferencias finitas: Δx = ΔE/(S₀ − S̄_{f}), el método del paso directo.

## Pendiente de energía
Se calcula con Manning despejando S: S_{f} = (nV/R^{2/3})², como si en cada sección el flujo fuera uniforme.`);
CRI('rem',[
['Una presa nueva eleva el nivel del río. ¿Qué hay que calcular para expropiar terrenos?',['Nada','La curva de remanso M1 aguas arriba, hasta donde el tirante vuelve a ser normal','Solo el embalse','Solo la presa'],1,'El remanso puede extender la inundación varios kilómetros aguas arriba.']]);
DED('cai',`## Caídas verticales
Las fórmulas de Rand (1955) se ajustaron en laboratorio en función del número de caída D = q²/(gh³), que es adimensional y combina el caudal y la altura. Con ellas se obtienen la longitud del chorro y los tirantes al pie y aguas abajo.

## Rápidas
La velocidad al pie sale de la energía disponible (Bernoulli con pérdidas). Al final, el resalto disipa la energía.`);
CRI('cai',[
['¿Qué pasa si la poza de una caída es más corta que el resalto?',['Nada','El resalto sale de la poza y erosiona el canal aguas abajo','Se ahorra concreto sin problema','Mejora'],1,'La poza debe contener todo el resalto, de longitud cercana a 6y₂.']]);
DED('cue',`## Precipitación media
Thiessen: cada estación representa el área de puntos más cercanos a ella. El promedio ponderado por áreas da la lluvia media de la cuenca.

## Tiempo de concentración
Es el tiempo que tarda el agua en llegar desde el punto más alejado. Kirpich (1940) ajustó datos de pequeñas cuencas agrícolas: t_{c} = 0.0195(L³/H)^{0.385} (minutos, L y H en m). Cuencas largas y planas tardan más.`);
CRI('cue',[
['Una cuenca larga y plana frente a una corta y empinada, con igual área:',['Igual caudal pico','La corta y empinada tiene t_{c} menor y caudal pico mayor','La larga tiene más pico','No hay diferencia'],1,'Con t_{c} corto, la intensidad de diseño es mayor y el agua llega toda junta.']]);
DED('rac',`## De dónde sale el 3.6
Q = C·i·A: con i en mm/h y A en km²: 1 mm/h·1 km² = 0.001 m·10⁶ m²/3600 s = 0.2778 m³/s = 1/3.6.

## Hipótesis
La lluvia dura al menos t_{c} y cae uniforme sobre toda la cuenca; entonces toda la cuenca aporta a la vez y el caudal es máximo. Por eso la intensidad se toma con duración igual a t_{c} (Kuichling, 1889).

## Curvas IDF
i = KT^{m}/t^{n}: más intensidad para periodos de retorno mayores y duraciones menores.

Vale para cuencas pequeñas (menos de unos 3 a 10 km²).`);
CRI('rac',[
['¿Por qué no se usa el método racional en una cuenca de 500 km²?',['Sí se usa','Porque la lluvia no es uniforme ni dura t_{c}, y hay almacenamiento: se usan hidrogramas','Por la norma de colores','Porque es caro'],1,'En cuencas grandes la atenuación y la distribución espacial de la lluvia invalidan sus hipótesis.']]);
DED('scs',`## Número de curva
El SCS (1972) supuso que la proporción de agua retenida respecto a la máxima posible es igual a la de escorrentía respecto a la lluvia disponible: F/S = P_{e}/(P − I_{a}). Con F = P − I_{a} − P_{e} e I_{a} = 0.2S, resulta P_{e} = (P − 0.2S)²/(P + 0.8S).

## S y CN
S = 25400/CN − 254 (mm): CN = 100 es impermeable (S = 0); CN bajo, mucha infiltración.

## Caudal pico
Con un hidrograma unitario triangular, el pico es q_{p} = 0.208AP_{e}/t_{p} (m³/s, km², mm, h).`);
CRI('scs',[
['Urbanizar una cuenca agrícola cambia CN de 65 a 90. ¿Qué pasa con la escorrentía?',['Baja','Sube mucho: S baja y P_{e} crece','No cambia','Se infiltra más'],1,'Pavimentos y techos reducen la infiltración. Por eso se exigen sistemas de drenaje pluvial al urbanizar.']]);
REF('scs',['USDA-SCS, National Engineering Handbook, sección 4 (Hidrología)','Chow, Maidment y Mays, Hidrología aplicada']);
DED('evp',`## Hargreaves y Samani (1985)
La evapotranspiración depende de la energía que llega (radiación). Como en muchas estaciones solo se mide la temperatura, Hargreaves usó R_{a} (calculada por astronomía según latitud y fecha) y la amplitud térmica √(T_{máx} − T_{mín}) como indicador de nubosidad: días despejados tienen más amplitud y más radiación.

## Coeficiente del cultivo
K_{c} (FAO 56, Allen y otros, 1998) escala la evapotranspiración de referencia al cultivo real según su etapa.`);
CRI('evp',[
['¿Por qué un embalse en la costa pierde tanta agua por evaporación?',['No pierde','Por la alta radiación, el viento y la baja humedad: puede superar 1.5 m al año','Por el mar','Por las filtraciones'],1,'Por eso a veces conviene almacenar agua en acuíferos en lugar de embalses superficiales.']]);
REF('evp',['Allen, Pereira, Raes y Smith, FAO Riego y Drenaje 56: Evapotranspiración del cultivo','Hargreaves y Samani, Reference crop evapotranspiration from temperature (1985)']);
DED('inf',`## Horton (1940)
Horton observó que la capacidad de infiltración decae exponencialmente desde f₀ hasta un valor constante f_{c} a medida que el suelo se satura: f = f_{c} + (f₀ − f_{c})e^{−kt}.

## Infiltración acumulada
F = ∫f dt = f_{c}t + (f₀ − f_{c})(1 − e^{−kt})/k.

## Índice φ
Es la tasa constante de pérdida que hace que la lluvia que queda sea igual a la escorrentía observada.`);
CRI('inf',[
['Una segunda lluvia, un día después de la primera, produce más escorrentía. ¿Por qué?',['Por casualidad','El suelo sigue húmedo: la infiltración inicial f₀ es menor','Por el sol','Por el viento'],1,'La humedad antecedente reduce la infiltración; por eso el SCS ajusta CN según la condición previa.']]);
DED('pob',`## Crecimiento geométrico
Si la población crece un porcentaje fijo r cada año: P = P₀(1 + r)^{t}, como el interés compuesto.

## Caudales
Q_{p} es el consumo medio anual: población por dotación entre 86 400 s. El consumo varía en el día y en el año: Q_{md} = 1.3Q_{p} (día de mayor consumo) para conducciones, y Q_{mh} = k₂Q_{p} (hora de mayor consumo, k₂ de 1.8 a 2.5) para la red de distribución (RNE, OS.100).`);
CRI('pob',[
['¿Con qué caudal se diseña la red de distribución de una ciudad?',['Q_{p}','Q_{mh}: debe atender la hora de mayor consumo','Q_{md}','Q mínimo'],1,'La red debe dar presión en la hora pico; la línea de conducción, en cambio, con Q_{md} y el reservorio regula la diferencia.']]);
REF('pob',['RNE, OS.100 Consideraciones básicas de diseño de infraestructura sanitaria','Arocha, Abastecimientos de agua']);
DED('res2',`## Volumen de regulación
La conducción entrega Q_{md} constante; la ciudad consume variable en el día. El reservorio almacena en horas de bajo consumo y entrega en horas pico. Con curvas de consumo típicas, ese volumen resulta cerca del 25 % del consumo diario promedio (RNE).

## Presión en un nudo
Es la cota del agua en el reservorio menos las pérdidas hasta el nudo menos la cota del nudo. La norma exige presiones mínimas (unos 10 m) y máximas (unos 50 m).`);
CRI('res2',[
['Una zona de la ciudad tiene 80 m de presión. ¿Qué haces?',['Nada','Sectorizar con válvulas reductoras de presión: presiones altas causan fugas y roturas','Más tubería','Subir el reservorio'],1,'La presión excesiva aumenta las pérdidas físicas y rompe instalaciones domiciliarias.']]);
DED('alc',`## Tubo lleno
Con Manning en sección circular llena: A = πD²/4, R = D/4. Q = (1/n)(πD²/4)(D/4)^{2/3}S^{1/2} = 0.312D^{8/3}S^{1/2}/n.

## Autolimpieza
El esfuerzo tractivo τ = γRS debe superar un mínimo (alrededor de 1 Pa, OS.070) para arrastrar los sólidos y evitar sedimentación. Es la versión moderna del criterio de velocidad mínima.

## Diseño
Se trabaja a tubo parcialmente lleno (por ejemplo 75 %) para ventilación y para tener margen.`);
CRI('alc',[
['Un colector con pendiente muy pequeña en una zona plana:',['Funciona igual','Puede sedimentarse por bajo esfuerzo tractivo: se atora y huele','Es mejor','Va más rápido'],1,'Por eso en zonas planas se usan pendientes mínimas o estaciones de bombeo.']]);
DED('pta',`## Eficiencia
Fracción de contaminante removida: (S₀ − S)/S₀.

## Tiempo de retención
t = V/Q: cuánto permanece el agua en la unidad.

## Carga superficial (Hazen, 1904)
En un sedimentador ideal, una partícula se remueve si su velocidad de caída v_{s} supera Q/A. Sorprendentemente, la eficiencia no depende de la profundidad sino del área: por eso los sedimentadores son anchos y poco profundos.`);
CRI('pta',[
['Un sedimentador remueve poco. ¿Qué cambio ayuda más?',['Hacerlo más profundo','Aumentar su área superficial (o agregar placas inclinadas)','Pintarlo','Aumentar el caudal'],1,'Según Hazen, la remoción depende de la carga superficial Q/A.']]);
DED('plu',`## Ecuación de Izzard
Integrando Manning sobre la sección triangular de una cuneta (franjas verticales de profundidad creciente), Izzard (1946) obtuvo Q = 0.375(z/n)S^{1/2}y^{8/3} (SI). El ancho inundado es zy.

## Criterio
Se coloca un sumidero cuando el ancho inundado supera lo admisible para que los vehículos y peatones puedan circular.`);
CRI('plu',[
['¿Por qué Lima se inunda con lluvias moderadas durante El Niño?',['No llueve','Casi no tiene drenaje pluvial: las pistas y techos se diseñaron sin evacuar lluvia','Por el mar','Por los ríos solamente'],1,'Durante El Niño llueve en la costa; la falta de red pluvial y de pendientes adecuadas causa inundaciones.']]);
DED('rsd',`## Volumen
La masa de residuos por año, dividida entre su peso específico compactado, da el volumen. La cobertura diaria de tierra suma un porcentaje.

## Lixiviado
Una fracción de la lluvia que cae sobre el relleno se infiltra y lo atraviesa: el método suizo la estima como P·A·K con K según la compactación.`);
CRI('rsd',[
['¿Por qué un relleno sanitario necesita geomembrana y drenes?',['Por estética','Para impedir que el lixiviado contamine el acuífero y para captarlo y tratarlo','Para que pese menos','No los necesita'],1,'El lixiviado tiene DBO y metales muy altos; sin barrera llega al agua subterránea.']]);
DED('boc',`## Barraje
Es un vertedero: Q = CLH^{3/2}. Despejando la carga H se calcula el nivel de agua sobre el barraje.

## Toma
La ventana de captación es un orificio: Q = C_{d}A√(2gh).

## Poza
Al pie del barraje se forma un resalto: la poza debe tener unos 6(y₂ − y₁) de longitud.`);
CRI('boc',[
['¿Por qué las bocatomas llevan un canal de limpia o compuertas de purga?',['Por estética','Porque el barraje acumula sedimentos frente a la toma y deben evacuarse','Para pescar','No llevan'],1,'Sin purga, los sedimentos tapan la ventana de captación en pocas avenidas.']]);
DED('des',`## Ley de Stokes
Una partícula pequeña que cae en agua quieta alcanza una velocidad en que su peso sumergido iguala la fuerza viscosa 3πμdv: (π/6)d³(γ_{s} − γ) = 3πμdv_{s}. Despejando: v_{s} = g(S_{s} − 1)d²/(18ν). Vale para Re pequeño (partículas finas).

## Longitud
La partícula debe llegar al fondo (tiempo h/v_{s}) antes de salir de la cámara (tiempo L/v_{h}). Igualando: L = h·v_{h}/v_{s}, con un factor K por turbulencia.`);
CRI('des',[
['¿Por qué las centrales hidroeléctricas necesitan desarenadores muy eficientes?',['No los necesitan','La arena desgasta rápidamente las turbinas (abrasión)','Por el agua potable','Por el ruido'],1,'Los ríos andinos traen mucha arena; sin desarenador, las turbinas Pelton se dañan en meses.']]);
DED('pgr',`## Empuje y subpresión
El agua empuja horizontalmente con ½γ_{w}H² (presión triangular). Además, se filtra bajo la presa y la empuja hacia arriba: si no hay drenes, la subpresión varía linealmente de γ_{w}H aguas arriba a 0 aguas abajo: U = ½γ_{w}HB.

## Estabilidad
Al deslizamiento: la fricción en la base depende del peso efectivo W − U. Al volteo: momentos estabilizantes del peso frente a los del empuje y la subpresión.

Los drenes en la base reducen mucho la subpresión.`);
CRI('pgr',[
['¿Por qué se colocan galerías de drenaje dentro de una presa de gravedad?',['Para turismo','Para reducir la subpresión en la base y mejorar la estabilidad','Para guardar herramientas','No tienen'],1,'La subpresión resta peso efectivo; los drenes la reducen y aumentan los factores de seguridad.']]);
DED('pti',`## Dupuit (1863)
Si el flujo es casi horizontal, el gradiente en cada sección vertical es la pendiente de la superficie libre: q = k·h·dh/dx. Integrando entre h₁ y h₂ en una longitud L: q = k(h₁² − h₂²)/(2L).

## Sección
El área de una sección trapezoidal de presa con taludes z₁ y z₂ y corona c es H[c + (z₁ + z₂)H/2].`);
CRI('pti',[
['¿Para qué sirve el núcleo de arcilla en una presa de tierra?',['Para dar peso','Para reducir la filtración: su k es muy bajo','Para la estética','Para drenar'],1,'El núcleo impermeable y los filtros que lo rodean controlan la filtración y evitan la erosión interna.']]);
DED('gar',`## Joukowsky (1898)
Si se cierra una válvula de golpe, el agua que viene detrás se frena y su cantidad de movimiento se convierte en presión. Por equilibrio de una masa de agua de longitud a·dt (lo que avanza la onda): ΔP·A·dt = ρA(a·dt)ΔV, de donde ΔP = ρaΔV, y en metros ΔH = aΔV/g.

## Celeridad
La onda viaja más lento si el tubo es elástico: a = √(K/ρ)/√(1 + KD/(Ee)), con √(K/ρ) ≈ 1439 m/s para agua.

## Cierre lento (Michaud)
Si el tiempo de cierre T es mayor que 2L/a, la sobrepresión se reduce: ΔH ≈ 2LV/(gT).`);
CRI('gar',[
['¿Por qué se exige cerrar lentamente las válvulas de una línea de impulsión larga?',['Por cortesía','Para que T > 2L/a y la sobrepresión sea mucho menor','Para ahorrar agua','No importa'],1,'Un cierre rápido puede generar decenas de metros de sobrepresión y reventar la tubería.']]);
DED('rie',`## Eficiencia total
El agua se pierde en cada etapa: en el canal (filtración, evaporación), en la distribución y en la parcela (escurrimiento, percolación). Las eficiencias se multiplican.

## Lámina neta
El agua útil en el suelo está entre capacidad de campo y punto de marchitez. Por la profundidad de raíces y el agotamiento permitido f: d = (CC − PMP)γ_{s}zf.`);
CRI('rie',[
['¿Por qué el riego por goteo ahorra tanta agua?',['No ahorra','Porque su eficiencia de aplicación es ~0.9 frente a ~0.4–0.6 del riego por gravedad','Porque llueve más','Porque el cultivo consume menos'],1,'El cultivo consume lo mismo; lo que cambia son las pérdidas.']]);
DED('fgv',`## Clasificación de perfiles
Comparando el tirante con y_{n} y y_{c} se identifica la zona y el tipo de curva (M1, M2, S1…). En la zona 1 (y > y_{n} > y_{c}) el tirante crece aguas abajo: es el remanso de una presa.

## Cálculo
Igual que en curvas de remanso: paso directo o paso estándar. Los programas como HEC-RAS aplican el paso estándar sección por sección.`);
CRI('fgv',[
['Para saber hasta dónde inundará un río con un puente nuevo que estrecha el cauce, ¿qué se calcula?',['Nada','El perfil de flujo gradualmente variado con el estrechamiento (por ejemplo, con HEC-RAS)','Solo la socavación','Solo el caudal'],1,'El estrechamiento eleva el nivel aguas arriba; el perfil indica hasta dónde.']]);
DED('sed',`## Esfuerzo cortante en el fondo
τ₀ = γRS, igual que en Manning.

## Shields (1936)
Una partícula empieza a moverse cuando la fuerza del flujo supera su peso sumergido. El parámetro adimensional θ = τ₀/((γ_{s} − γ)d) compara ambos; para arenas gruesas y gravas, el movimiento comienza con θ ≈ 0.047.

## Meyer-Peter y Müller (1948)
Ajustaron en laboratorio el caudal sólido de fondo: q_{b} = 8√((S_{s} − 1)gd³)(θ − 0.047)^{1.5}. Solo hay transporte si θ supera el crítico.`);
CRI('sed',[
['¿Por qué un río andino transporta piedras grandes en avenidas y casi nada en estiaje?',['Por la temperatura','Porque en avenidas τ₀ = γRS crece mucho y supera el umbral de Shields para gravas','Por el viento','No transporta'],1,'El transporte es muy no lineal: casi todo ocurre en pocos días de caudales altos.']]);
DED('soc',`## Socavación local en pilares (CSU, HEC-18)
El flujo choca con el pilar y forma un vórtice de herradura que excava un hoyo. La ecuación de la Universidad Estatal de Colorado se ajustó en laboratorio: y_{s} = 2.0K₁K₂K₃a(y₁/a)^{0.35}Fr₁^{0.43}. K₁, K₂ y K₃ corrigen por forma del pilar, ángulo de ataque y condición del lecho.

## Socavación por contracción (Laursen)
Si el puente estrecha el cauce, el agua acelera y excava todo el ancho hasta que el transporte se equilibre.`);
CRI('soc',[
['¿Qué es más seguro: pilares alineados con el flujo o esviajados?',['Esviajados','Alineados: el esviaje aumenta mucho el ancho efectivo y la socavación (K₂)','Igual','Ninguno'],1,'Un pilar alargado esviajado presenta un ancho mayor al flujo.']]);
REF('soc',['FHWA, HEC-18 Evaluating Scour at Bridges','MTC, Manual de Hidrología, Hidráulica y Drenaje']);
DED('cun',`## Geometría
El área de una cuneta triangular con taludes z₁ y z₂ y tirante y es (z₁ + z₂)y²/2; su perímetro, y(√(1 + z₁²) + √(1 + z₂²)).

## Longitud máxima entre alcantarillas
Con el método racional, el caudal que recoge la cuneta crece con la longitud de vía drenada (Q = C·i·w·L/3.6×10⁶). La longitud máxima es la que llena la cuneta.`);
CRI('cun',[
['¿Por qué las cunetas de carreteras de sierra se revisten?',['Por estética','Porque las pendientes fuertes dan velocidades erosivas','Para que se vean','No se revisten'],1,'Sin revestimiento, la cuneta se profundiza y socava la plataforma.']]);
DED('gum',`## Posición de graficación
Weibull: T = (n + 1)/m, con m el orden del dato de mayor a menor. Da una estimación sin sesgo de la probabilidad de cada dato observado.

## Gumbel (1941)
Los máximos anuales de muchas variables siguen la distribución de extremos tipo I: F(x) = exp(−exp(−(x − u)/α)). Con el método de momentos, x_{T} = x̄ + K_{T}s, con K_{T} = −(√6/π)[0.5772 + ln(ln(T/(T − 1)))]. 0.5772 es la constante de Euler.

## Log-normal
Se ajusta la normal a los logaritmos: x_{T} = exp(ȳ + z·s_{y}).`);
CRI('gum',[
['Con 15 años de registros estimas la avenida de 500 años. ¿Qué tan confiable es?',['Muy confiable','Poco: extrapolar mucho más allá del registro tiene gran incertidumbre','Exacta','Igual que la de 10 años'],1,'Conviene usar regionalización, intervalos de confianza y criterio. La extrapolación amplifica errores.']]);
DED('msk',`## Muskingum (McCarthy, 1938)
El almacenamiento en un tramo de río depende de la entrada y la salida: S = K[XI + (1 − X)O]. Combinado con la continuidad dS/dt = I − O y discretizado en Δt, se despeja la salida O₂ en función de I₁, I₂ y O₁. Los coeficientes C₀, C₁ y C₂ suman 1.

## Δt
Para que los coeficientes sean positivos se requiere 2KX ≤ Δt ≤ 2K(1 − X).`);
CRI('msk',[
['¿Qué efecto tiene un tramo largo de río sobre una avenida?',['La amplifica','La atenúa y la retrasa por almacenamiento','No cambia','La duplica'],1,'El pico de salida es menor y llega después: es la atenuación por tránsito.']]);
DED('hu',`## Hidrograma unitario (Sherman, 1932)
Es la respuesta de la cuenca a 1 mm de lluvia efectiva en un tiempo dado. Supone linealidad (el doble de lluvia, el doble de caudal) e invariancia en el tiempo.

## Convolución
Una tormenta de varios bloques es una suma de hidrogramas unitarios desplazados y escalados: Q_{n} = ΣP_{i}U_{n−i+1}.

## Volumen
El área bajo el hidrograma unitario debe ser A·1 mm: es una verificación clave.`);
CRI('hu',[
['¿Por qué se verifica que el volumen del hidrograma unitario sea 1 mm por el área?',['Por costumbre','Porque es su definición: si no coincide, el hidrograma está mal derivado','Por la norma','No se verifica'],1,'Es la prueba de consistencia de masa.']]);
DED('agu',`## Thiem (acuífero confinado)
El agua converge radialmente: Q = K·(dh/dr)·2πrb. Separando e integrando entre r₁ y r₂: Q = 2πKb(h₂ − h₁)/ln(r₂/r₁).

## Dupuit (libre)
El espesor saturado es h: Q = K(dh/dr)2πrh, que integrado da πK(h₂² − h₁²)/ln(r₂/r₁).

## Transmisividad
T = Kb: la capacidad de todo el espesor del acuífero para transmitir agua.`);
CRI('agu',[
['Dos pozos muy cercanos bombeando a la vez:',['No se afectan','Sus conos de depresión se superponen y cada uno baja más el nivel','Se ayudan','Mejoran el caudal'],1,'Los descensos se suman. La separación entre pozos se diseña con esto en cuenta.']]);
DED('isa',`## Cisterna y tanque
Cuando hay cisterna y tanque elevado, la IS.010 exige que la cisterna almacene al menos 3/4 de la dotación diaria y el tanque al menos 1/3: juntos dan margen ante cortes del servicio.

## Bomba
Debe llenar el tanque en un tiempo razonable (unas 2 horas): Q_{b} = V/t. Potencia: γQH/η.`);
CRI('isa',[
['¿Por qué el tanque elevado no se dimensiona igual que la cisterna?',['Por el peso','Porque el tanque solo regula y da presión; la cisterna almacena para cortes. Además, pesar mucho arriba es malo para el sismo','Por estética','Igual'],1,'Un tanque grande en la azotea agrega masa sísmica alta.']]);
REF('isa',['RNE, IS.010 Instalaciones sanitarias para edificaciones']);
DED('tse',`## Periodo de retención
La IS.020 fija PR = 1.5 − 0.3·log(P·q) días, con P personas y q el caudal por persona: tanques más grandes necesitan menos tiempo relativo porque el flujo es más estable.

## Volúmenes
Volumen de sedimentación: caudal diario por PR. Volumen de digestión y almacenamiento de lodos: tasa por persona por años entre limpiezas.`);
CRI('tse',[
['¿Qué pasa si no se limpia un tanque séptico durante años?',['Nada','El lodo ocupa el volumen de sedimentación y los sólidos pasan al campo de percolación, que se colmata','Mejora','Se vacía solo'],1,'La limpieza periódica es parte del diseño: sin ella, el sistema falla.']]);
DED('pot',`## Gradiente de velocidad (Camp y Stein, 1943)
La floculación depende de cuántas colisiones hay entre partículas, que es proporcional al gradiente de velocidad G. La potencia disipada por unidad de volumen se relaciona con G: P/V = μG², de donde G = √(P/(μV)). El producto G·t mide la cantidad total de colisiones.

## Filtros
El área se calcula con la tasa de filtración (m³/m²/día): A = Q/tasa.

## Dosificación
kg/día = caudal (m³/d)·dosis (g/m³)/1000.`);
CRI('pot',[
['¿Por qué la mezcla rápida usa G alto y la floculación G bajo?',['Al azar','La mezcla rápida dispersa el coagulante; la floculación necesita colisiones suaves para que los flóculos crezcan sin romperse','Por costo','Igual'],1,'Un G alto en floculación rompe los flóculos.']]);
DED('lod',`## Relación alimento/microorganismos
F/M = QS₀/(VX): cuánta DBO llega por día por cada kg de biomasa en el reactor. Si es alta, las bacterias no alcanzan a consumirla.

## Edad del lodo
θ_{c} = VX/(Q_{w}X_{r}): cuánto tiempo permanece la biomasa en el sistema. Controla la calidad del efluente y la sedimentabilidad del lodo. Se controla con la purga Q_{w}.`);
CRI('lod',[
['La planta recibe el doble de DBO por una industria nueva. ¿Qué indicador cambia primero?',['El color','F/M sube: hay que aumentar la biomasa o el volumen','La edad del lodo baja a cero','Nada'],1,'Con F/M alto el efluente empeora. Se ajusta la recirculación o se amplía el reactor.']]);
REF('lod',['Metcalf & Eddy, Wastewater Engineering','Romero Rojas, Tratamiento de aguas residuales']);
