/* Deducciones y criterio: vías, gestión, instalaciones y proyectos */
DED('hor',`## Radio mínimo
En una curva, el vehículo necesita una fuerza centrípeta mV²/R. La aportan el peralte (componente del peso hacia el centro, aproximadamente W·e) y la fricción lateral (f·W). Con W = mg: V²/(gR) = e + f. Con V en km/h: V² /(3.6²·9.81·R) = e + f, y 3.6²·9.81 ≈ 127. Así R_{mín} = V²/(127(e + f)).

## Elementos de la curva
La tangente T sale del triángulo rectángulo entre el centro, el PC y el PI: T = R·tan(Δ/2). La longitud del arco es πRΔ/180 (Δ en grados).`);
CRI('hor',[
['¿Por qué no se diseña con la fricción máxima disponible del neumático?',['Por costo','Porque f de diseño debe dejar margen para pavimento mojado, neumáticos gastados y comodidad','Por la norma de colores','Sí se diseña así'],1,'Los valores de f de diseño (0.12 a 0.17) son mucho menores que la fricción de frenado en seco.']]);
REF('hor',['MTC, Manual de Carreteras: Diseño Geométrico DG-2018','AASHTO, A Policy on Geometric Design of Highways and Streets (Libro verde)','Cárdenas Grisales, Diseño geométrico de carreteras']);
DED('ver',`## Por qué una parábola
Una curva vertical debe cambiar la pendiente de forma uniforme para que el conductor sienta una aceleración vertical constante. Si dy/dx varía linealmente con x (de g₁ a g₂ en una longitud L), integrando se obtiene y = y₀ + g₁x + (g₂ − g₁)x²/(2L): una parábola.

## Punto más alto o bajo
Donde la pendiente es cero: g₁ + (g₂ − g₁)x/L = 0, x = −g₁L/(g₂ − g₁).

## K
L = K·A, con K la longitud por cada 1 % de cambio de pendiente, que se elige por visibilidad (en convexas) o por alcance de faros y comodidad (en cóncavas).`);
CRI('ver',[
['Una curva vertical convexa demasiado corta en una vía de 80 km/h:',['Es más cómoda','No da visibilidad de parada: el conductor no ve un obstáculo detrás de la cima','No importa','Es más barata y segura'],1,'K mínimo en convexas se fija por distancia de visibilidad de parada.']]);
DED('vis',`## Distancia de parada
Durante el tiempo de percepción y reacción t, el vehículo sigue a velocidad V: recorre V·t/3.6. Luego frena con desaceleración g(f ± i). Por cinemática, la distancia de frenado es V²/(2g(f ± i)); con V en km/h: V²/(2·9.81·3.6²·(f ± i)) = V²/(254(f ± i)).

## Despeje lateral en curvas
Un muro o talud en el interior de la curva tapa la visión. La ordenada media M es la flecha del arco de longitud D en un círculo de radio R: M = R(1 − cos(D/(2R))), con el ángulo en grados = 28.65D/R.`);
CRI('vis',[
['En bajada, ¿la distancia de parada es mayor o menor?',['Menor','Mayor: la pendiente resta de f en el denominador','Igual','No se puede frenar'],1,'Con −i, el denominador baja y la distancia de frenado crece.']]);
DED('trf',`## Ley de la cuarta potencia
El AASHO Road Test (1958-1960) cargó pavimentos con ejes de distinto peso hasta deteriorarlos. El daño relativo resultó proporcional a (P/8.2 t)⁴, aproximadamente: un eje de 16.4 t hace unas 16 veces el daño de uno de 8.2 t.

## Factor de crecimiento
Si el tráfico crece r por año durante n años, el total acumulado es la suma de una serie geométrica: G = ((1 + r)^{n} − 1)/r.

## ESAL
Número de ejes equivalentes de 8.2 t en la vida del pavimento, en el carril de diseño.`);
CRI('trf',[
['¿Por qué los camiones sobrecargados destruyen las carreteras?',['No las afectan','Por la cuarta potencia: un 20 % de sobrecarga aumenta el daño en más del doble','Por el ruido','Por la velocidad'],1,'1.2⁴ ≈ 2.07. El control de pesos en balanzas protege la inversión vial.']]);
DED('pav',`## Número estructural (AASHTO 93)
Cada capa aporta capacidad en proporción a su espesor D y a la calidad de su material (coeficiente a): una carpeta asfáltica (a₁ ≈ 0.42–0.44) aporta más por pulgada que una base granular (a₂ ≈ 0.14). El drenaje (m) premia o castiga a las capas granulares. SN = Σa_{i}D_{i}m_{i} debe igualar el SN que pide la ecuación de diseño para el ESAL y el M_{r} de la subrasante.

## Correlaciones de M_{r}
1500·CBR (Heukelom y Klomp) es la clásica para CBR bajos; 2555·CBR^{0.64} (de la guía MEPDG) da valores menores para CBR altos. Usa la que pida el manual del proyecto.`);
CRI('pav',[
['¿Qué es más eficaz para mejorar un pavimento sobre subrasante pobre?',['Solo engrosar la carpeta','Mejorar la subrasante o agregar subbase: el M_{r} de la subrasante pesa mucho en el SN requerido','Pintar','Nada'],1,'Con subrasante pobre, el SN requerido sube mucho. Estabilizar o reemplazar suele ser más barato que más asfalto.']]);
REF('pav',['AASHTO, Guide for Design of Pavement Structures (1993)','MTC, Manual de Carreteras: Suelos, Geología, Geotecnia y Pavimentos','Huang, Pavement Analysis and Design']);
DED('cvs',`## Relación fundamental del tráfico
Por definición: flujo (veh/h) = densidad (veh/km) × velocidad (km/h).

## Greenshields (1935)
Midió que la velocidad baja linealmente con la densidad: v = v_{f}(1 − k/k_{j}). Entonces q = kv_{f}(1 − k/k_{j}). Derivando e igualando a cero: k = k_{j}/2 y q_{máx} = v_{f}k_{j}/4.

## Equivalencia de camiones
Un camión ocupa el espacio y el tiempo de E_{T} autos. Con fracción P_{T} de camiones: flujo equivalente = V[(1 − P_{T}) + P_{T}E_{T}] = V[1 + P_{T}(E_{T} − 1)].`);
CRI('cvs',[
['¿Por qué en un atasco el flujo es bajo aunque la densidad sea máxima?',['Error','Porque la velocidad cae casi a cero: q = k·v','Por los semáforos','No es bajo'],1,'El máximo flujo ocurre a densidad media; con densidad de atasco, el flujo tiende a cero.']]);
DED('sem',`## Webster (1958)
Webster simuló intersecciones y obtuvo el ciclo que minimiza la demora total: C₀ = (1.5L + 5)/(1 − Y). Si Y se acerca a 1, el ciclo crece sin límite: la intersección está saturada.

## Reparto del verde
El verde efectivo total (C − L) se reparte entre fases en proporción a sus relaciones de flujo críticas: cada fase recibe verde según lo que necesita.`);
CRI('sem',[
['Si Y = Σy supera 0.9, ¿qué indica?',['Que todo está bien','Que la intersección está cerca de la saturación: hay que ampliar carriles o separar giros','Que el ciclo debe ser corto','Nada'],1,'Ningún ciclo resuelve una demanda mayor que la capacidad.']]);
DED('fer',`## Resistencias
Rodadura: fricción de rueda y riel, pequeña (2–4 kg/t). Pendiente: el componente del peso a lo largo de la vía es W·sen θ ≈ W·i; con i en ‰, 1 kg por tonelada por cada ‰. Curva: el roce de las pestañas con el riel; la fórmula empírica 700/R es de Röckl para trocha estándar.

## Potencia
P = F·v: fuerza por velocidad.

## Peralte
Igual que en carreteras, equilibra la fuerza centrífuga: h = gauge·V²/(gR); con trocha 1435 mm y V en km/h: h ≈ 11.8V²/R (mm).`);
CRI('fer',[
['¿Por qué el Ferrocarril Central usa zigzags?',['Por turismo','Para mantener pendientes bajas en una ladera muy empinada, que una locomotora sí puede vencer','Por los túneles','Por el clima'],1,'La resistencia por pendiente es enorme para un tren; los zigzags alargan el recorrido y reducen la pendiente.']]);
DED('aer',`## Correcciones OACI
- Altitud: el aire menos denso reduce la sustentación y el empuje; el avión necesita más velocidad y más pista: +7 % por cada 300 m
- Temperatura: el aire caliente es menos denso: +1 % por cada grado sobre la temperatura estándar a esa altitud (atmósfera estándar: 15 °C a nivel del mar, bajando 6.5 °C por km)
- Pendiente: subir cuesta más: +10 % por cada 1 %

## Viento cruzado
Solo la componente perpendicular a la pista (V·sen θ) empuja al avión hacia un lado.`);
CRI('aer',[
['¿Por qué el aeropuerto de Juliaca tiene una pista muy larga?',['Por estética','Por su altitud (~3800 m): la corrección por altitud casi duplica la longitud básica','Por el viento','Por el turismo'],1,'+7 % por cada 300 m: a 3800 m la corrección supera el 85 %.']]);
DED('acc',`## Tasas
Comparar sitios por número absoluto de siniestros no sirve: una vía con más tráfico y más longitud tendrá más. Se normaliza por exposición: vehículos·km para tramos y vehículos que entran para intersecciones.

## Energía de impacto
E = ½mv²: el daño crece con el cuadrado de la velocidad. Bajar de 60 a 50 km/h reduce la energía 30 %.`);
CRI('acc',[
['Un tramo tiene más siniestros que otro pero el triple de tráfico. ¿Es más peligroso?',['Sí','No necesariamente: hay que comparar la tasa por exposición','Siempre','No se puede saber nada'],1,'Por eso se usan tasas por 100 millones de vehículos·km.']]);
DED('esp2',`## Clotoide
En la espiral de transición la curvatura crece linealmente con la longitud: 1/r = ℓ/(R·L_{e}). Así r·ℓ = R·L_{e} = A², la ecuación de la clotoide. El conductor gira el volante a velocidad constante.

## Longitud mínima (Smirnoff/Barnett)
La aceleración centrípeta pasa de 0 a V²/R en el tiempo L_{e}/V. Si su tasa de cambio no debe superar C (m/s³): C = (V²/R)/(L_{e}/V) = V³/(RL_{e}). Con V en km/h: (V/3.6)³ = V³/46.656, y L_{e} = V³/(46.656RC).

## Ángulo y desplazamiento
θ_{e} = L_{e}/(2R) rad; el desplazamiento de la curva circular hacia adentro es p ≈ L_{e}²/(24R).`);
CRI('esp2',[
['¿Qué siente un pasajero en una curva sin transición?',['Nada','Un tirón lateral brusco al entrar al círculo','Más comodidad','Frío'],1,'La aceleración centrípeta aparece de golpe. La clotoide la introduce gradualmente.']]);
DED('prl',`## Longitud de transición del peralte
El borde exterior debe subir e·a/2 (o e·a, según el giro) en una longitud tal que su pendiente relativa respecto al eje no supere i_{r}: L = e·a/i_{r}.

## Sobreancho
Un vehículo de longitud L en una curva ocupa más ancho porque sus ruedas traseras recorren un radio menor: R − √(R² − L²) por carril. Se suma un término empírico por la dificultad de manejo, V/(10√R) (Voshell).`);
CRI('prl',[
['¿Por qué las curvas cerradas de sierra necesitan sobreancho?',['Por estética','Porque los camiones largos invaden el carril contrario al girar','Por la lluvia','No lo necesitan'],1,'Con R pequeño, R − √(R² − L²) es grande para vehículos largos.']]);
DED('pr2',`## Westergaard (1926)
Modeló la losa de concreto como una placa elástica sobre un líquido denso (resortes de Winkler, k). El radio de rigidez relativa ℓ = (Eh³/(12(1 − μ²)k))^{1/4} indica qué tan lejos reparte la losa una carga. Resolviendo la placa obtuvo los esfuerzos para carga interior, de borde y de esquina; la de borde y esquina son las más críticas.

## Radio b
Para cargas muy concentradas, corrige el radio a de contacto porque la teoría de placas delgadas no vale cerca de la carga.`);
CRI('pr2',[
['¿Por qué los pavimentos rígidos llevan pasadores en las juntas?',['Para decorar','Para transferir carga entre losas y reducir el esfuerzo en el borde y el escalonamiento','Para drenar','No llevan'],1,'Sin transferencia, la carga en el borde produce esfuerzos y deflexiones mucho mayores.']]);
DED('mzc',`## Volumétrica
Una mezcla asfáltica compactada tiene agregado, asfalto y aire. Comparando la gravedad específica bruta de la mezcla (G_{mb}) con la máxima teórica sin vacíos (G_{mm}) se obtienen los vacíos de aire: V_{a} = 100(G_{mm} − G_{mb})/G_{mm}.

## VMA y VFA
VMA son los vacíos entre agregados (que llenan el asfalto y el aire). VFA es qué fracción de VMA está llena de asfalto. Se especifican rangos para que la mezcla sea durable (asfalto suficiente) y estable (aire suficiente para no exudar).`);
CRI('mzc',[
['Una carpeta con 1 % de vacíos de aire en la costa calurosa:',['Es ideal','Puede exudar y ahuellarse: falta espacio para el asfalto que se dilata','Es más durable siempre','No importa'],1,'Se especifica alrededor de 3 a 5 % de vacíos.']]);
DED('pci',`## Índice de condición (Shahin)
Cada falla (grieta, bache, ahuellamiento) resta puntos según su tipo, severidad y densidad (valores deducidos de curvas del método). Como varias fallas no se suman linealmente, se usa un valor deducido corregido (CDV). PCI = 100 − CDV.

## Muestreo
El número mínimo de unidades a inspeccionar sale de la estadística: el error admisible e y la desviación s entre unidades.`);
CRI('pci',[
['¿Cuándo conviene más intervenir un pavimento?',['Cuando está destruido','Cuando su PCI aún es bueno-regular: el mantenimiento preventivo es mucho más barato que la reconstrucción','Nunca','Solo si llueve'],1,'La curva de deterioro cae rápido después de cierto punto; intervenir antes ahorra mucho.']]);
DED('sbr',`## Módulo resiliente
Es la rigidez del suelo bajo cargas repetidas (la deformación recuperable). Se correlaciona con el CBR, que es más fácil de medir.

## Estabilización
La cal reacciona con las arcillas (intercambio iónico y reacción puzolánica): baja la plasticidad y sube la resistencia. La cantidad es un porcentaje del peso seco del suelo tratado.`);
CRI('sbr',[
['Una subrasante S0 (CBR < 3 %):',['Se usa tal cual','Requiere mejoramiento: reemplazo, estabilización o geosintéticos','Es la mejor','Se riega solamente'],1,'El MTC no permite apoyar el pavimento en S0 sin tratarla.']]);
DED('cbr',`## Por qué una piedra patrón
Porter (California, 1929) comparó la resistencia a la penetración de cada suelo con la de una piedra chancada de buena calidad: el resultado en porcentaje es fácil de interpretar.

## Saturación
Se sumerge cuatro días porque la condición más crítica de una subrasante es saturada.

## 95 %
Se interpola el CBR a la densidad que se exigirá en obra.`);
CRI('cbr',[
['¿Por qué se reporta el CBR saturado y no el seco?',['Por costumbre','Porque la subrasante se satura en lluvias y ahí es más débil: es la condición de diseño','Por la norma de colores','Es igual'],1,'Diseñar con el CBR seco subestima el espesor necesario.']]);
DED('met',`## Volúmenes
Viga: b·h·L (sin descontar lo que está dentro de columnas si se metra por separado; la norma de metrados define cómo).

## Encofrado
Se metra el área de contacto con el concreto: en una viga, el fondo b y los dos costados h: (b + 2h)L. Si la losa se vacía con la viga, el costado se reduce en el espesor de losa.`);
CRI('met',[
['Al metrar el concreto de vigas, ¿qué no se debe hacer?',['Usar b·h·L','Contar dos veces el volumen de los nudos con las columnas','Usar la luz libre','Anotar unidades'],1,'La norma de metrados define qué se descuenta para que cada volumen se cuente una sola vez.']]);
REF('met',['Norma Técnica de Metrados para Obras de Edificación y Habilitaciones Urbanas (MVCS)']);
DED('apu',`## Horas-hombre por unidad
Si una cuadrilla de C personas produce R unidades en 8 horas, cada unidad consume C·8/R horas-hombre. Multiplicado por el costo de la hora de cada categoría da la mano de obra por unidad.

## Precio unitario
Suma de mano de obra, materiales (cantidad por unidad × precio) y equipos (horas-máquina por unidad × costo horario). Herramientas menores se toman como un porcentaje de la mano de obra.`);
CRI('apu',[
['Un análisis de precios usa un rendimiento de tarrajeo de 40 m²/día por cuadrilla. ¿Qué piensas?',['Es normal','Es muy optimista: valores usuales son de 10 a 15 m²/día. El precio está subestimado','No importa','Es bajo'],1,'Rendimientos irreales dan precios bajos y pérdidas en obra. Se usan rendimientos de CAPECO o medidos.']]);
DED('cpm',`## Pasada hacia adelante
Cada actividad empieza lo antes posible: cuando terminan todas sus predecesoras (ES = máximo EF de las predecesoras). EF = ES + D.

## Pasada hacia atrás
Desde el final, cada actividad termina lo más tarde posible sin atrasar el proyecto: LF = mínimo LS de las sucesoras.

## Holgura
H = LS − ES. Las actividades con holgura cero forman la ruta crítica (Kelley y Walker, 1959): cualquier atraso en ellas atrasa la obra.`);
CRI('cpm',[
['Una actividad con 10 días de holgura se atrasa 4 días. ¿Se atrasa la obra?',['Sí','No: tiene holgura, aunque ahora le quedan 6 días','Siempre','No se sabe'],1,'Solo las actividades críticas (holgura cero) atrasan directamente el proyecto.']]);
DED('evm',`## Tres curvas
PV (valor planeado): lo que debía hacerse a la fecha. EV (valor ganado): lo que se hizo, valorizado a precio de presupuesto. AC (costo real): lo que se gastó.

## Índices
CPI = EV/AC: cuánto valor se obtiene por cada sol gastado. SPI = EV/PV: qué fracción del avance planeado se logró.

## Proyección
Si el rendimiento de costo sigue igual, el costo final será BAC/CPI. Es la idea más usada del PMBOK para pronosticar.`);
CRI('evm',[
['CPI = 1.1 y SPI = 0.8. ¿Cómo va la obra?',['Bien en todo','Barata pero atrasada: gasta menos de lo previsto por lo hecho, pero avanza lento','Cara y atrasada','Cara y adelantada'],1,'CPI > 1 es eficiencia de costo; SPI < 1 es atraso.']]);
REF('evm',['Project Management Institute, PMBOK Guide','Fleming y Koppelman, Earned Value Project Management']);
DED('vpn',`## Valor presente
Un sol hoy, invertido a una tasa i, vale (1 + i)^{n} dentro de n años. Al revés, un monto futuro F vale hoy F/(1 + i)^{n}.

## Anualidad
Una serie de pagos iguales A durante n años vale hoy A[1/(1 + i) + 1/(1 + i)² + … + 1/(1 + i)^{n}]. Es una serie geométrica cuya suma es A[(1 + i)^{n} − 1]/[i(1 + i)^{n}].

## VAN
Si es positivo, el proyecto rinde más que la tasa de descuento.`);
CRI('vpn',[
['¿Por qué no se suman directamente beneficios de distintos años?',['Sí se suman','Porque el dinero tiene valor en el tiempo: hay que llevarlos a una misma fecha','Por el IGV','Por la inflación solamente'],1,'Un sol en 20 años vale mucho menos que hoy a cualquier tasa positiva.']]);
DED('pert',`## Distribución beta
Malcolm, Roseboom, Clark y Fazar (1959, programa Polaris) supusieron que la duración de cada actividad sigue una distribución beta entre a y b con moda m. Su media aproximada es (a + 4m + b)/6 y su desviación (b − a)/6.

## Suma de la ruta
Por el teorema del límite central, la suma de varias actividades independientes tiende a una normal: media Σt_{e} y varianza Σσ².`);
CRI('pert',[
['¿Por qué el PERT puede subestimar el plazo real?',['No lo hace','Porque solo mira la ruta crítica; rutas casi críticas con mucha varianza pueden terminar después','Por el IGV','Por la fórmula de 6'],1,'Si hay varias rutas paralelas cercanas, la probabilidad de cumplir es menor que la calculada con una sola.']]);
DED('flc',`## Saldo acumulado
Cada mes se suma lo que entra y se resta lo que sale. El mínimo del saldo acumulado es el dinero que la empresa debe poner (o financiar) en el peor momento.

## Desfase de cobro
Las valorizaciones se cobran después de ejecutar: por eso al inicio el saldo es negativo aunque la obra tenga utilidad. El adelanto reduce ese hueco.`);
CRI('flc',[
['Una obra rentable lleva a la quiebra a una empresa pequeña. ¿Cómo es posible?',['No es posible','Por falta de liquidez: los egresos van antes que los cobros y no tenía cómo financiar el hueco','Por el IGV','Por la utilidad'],1,'Rentabilidad no es liquidez. El flujo de caja decide si la empresa sobrevive hasta cobrar.']]);
DED('lean',`## Origen
Lean Construction adapta el sistema de producción de Toyota (Ohno) a la obra. Koskela (1992) propuso ver la construcción como flujos de trabajo, no solo como conversiones.

## Last Planner (Ballard, 2000)
Solo se programa en la semana lo que está libre de restricciones (planos, materiales, frentes). El PPC mide la confiabilidad del plan: obras con PPC alto tienen menos pérdidas.

## Tren de trabajo
Con sectores iguales, las cuadrillas trabajan en paralelo en sectores distintos: el tiempo total es (N_{s} + N_{a} − 1) ciclos, en vez de N_{s}·N_{a}.`);
CRI('lean',[
['¿Qué mide el PPC y qué no?',['Mide el avance físico','Mide la confiabilidad de la planificación semanal, no cuánto se avanzó','Mide la utilidad','Mide la seguridad'],1,'Un PPC alto significa que el equipo cumple lo que promete; el avance se controla aparte.']]);
REF('lean',['Ballard, The Last Planner System of Production Control (2000)','Koskela, Application of the New Production Philosophy to Construction (1992)','Ghio Castillo, Productividad en obras de construcción (PUCP)']);
DED('bim',`## Retorno
La inversión en BIM se recupera con lo que se evita: interferencias resueltas en diseño, menos adicionales y menos atrasos. ROI = (ahorro − inversión)/inversión.

## Dimensiones
3D es la geometría; 4D vincula cada elemento con una actividad del cronograma; 5D con su costo. El valor crece cuando el modelo se usa para decidir, no solo para dibujar.`);
CRI('bim',[
['¿Cuándo da más valor el BIM?',['Al final de la obra','En diseño temprano: cambiar el modelo es barato y cambiar la obra es caro','Nunca','Solo para la publicidad'],1,'La curva de MacLeamy muestra que la capacidad de influir en el costo cae rápido con el avance.']]);
DED('rsg',`## Valor monetario esperado
Si un riesgo ocurre con probabilidad p y cuesta C, su "costo esperado" es p·C. Sumando todos se obtiene la reserva de contingencia.

## Árbol de decisión
Cada alternativa tiene un costo propio más el VME de lo que puede pasar. Se elige la de menor VME total (si la organización es neutral al riesgo).`);
CRI('rsg',[
['¿Por qué se compra un seguro aunque su VME sea mayor que aceptar el riesgo?',['Por error','Porque la empresa no puede soportar una pérdida grande aunque sea poco probable: es aversa al riesgo','Por obligación siempre','No se compra'],1,'El VME supone neutralidad; ante pérdidas catastróficas, transferir el riesgo tiene sentido.']]);
DED('enc',`## Presión del concreto fresco
Si el concreto estuviera líquido en toda la altura, la presión sería hidrostática ρgh. Pero empieza a endurecer: a mayor velocidad de vaciado R (m/h) y menor temperatura T (fragua más lento), más altura queda líquida y más presión. El ACI 347 ajustó p = 7.2 + 785R/(T + 17.8) kPa para columnas, con límites.

## Tirantes
Cada tirante toma la presión de su área tributaria: p·s_{h}·s_{v}.`);
CRI('enc',[
['¿Por qué un encofrado de muro revienta al vaciar muy rápido en clima frío?',['Por mala madera siempre','Porque con R alto y T bajo el concreto sigue fluido y la presión se acerca a la hidrostática','Por el vibrador nada más','No revienta'],1,'La velocidad de vaciado y la temperatura definen la presión de diseño del encofrado.']]);
REF('enc',['ACI 347R, Guide to Formwork for Concrete','Hurd, Formwork for Concrete (ACI SP-4)']);
DED('maq',`## Depreciación lineal
La máquina pierde valor desde su precio de adquisición hasta su valor de rescate durante su vida económica: por hora, D = (V_{a} − V_{r})/V_{e}.

## Inversión media (Peurifoy)
El capital inmovilizado en la máquina baja cada año. Su promedio a lo largo de n años es V_{a}(n + 1)/(2n). Los intereses, seguros e impuestos se calculan sobre esa inversión media.

## Costo horario
Posesión (depreciación, intereses, seguros) más operación (combustible, lubricantes, llantas, operador).`);
CRI('maq',[
['¿Conviene comprar una máquina que solo se usará 300 horas al año?',['Sí siempre','Probablemente no: con pocas horas, el costo de posesión por hora es muy alto; alquilar puede ser mejor','No importa','Sí, por el IGV'],1,'Los costos de posesión se reparten entre las horas de uso.']]);
REF('maq',['Peurifoy, Schexnayder y Shapira, Construction Planning, Equipment, and Methods']);
DED('prd',`## Producción de un equipo
P = capacidad por ciclo × factor de llenado × ciclos por hora × eficiencia. Los ciclos por hora son 60/t_{c} (t_{c} en minutos).

## Balance cargador-volquetes
Para que el cargador no espere, mientras un volquete hace su ciclo completo deben cargarse los demás: N = t_{ciclo volquete}/t_{carga}.

## Costo unitario
Costo horario entre producción horaria.`);
CRI('prd',[
['Un cargador espera con frecuencia sin volquetes. ¿Qué haces?',['Nada','Agregar volquetes o acortar su ciclo: el equipo caro no debe esperar','Quitar el cargador','Pintar los volquetes'],1,'El cuello de botella encarece todo. Se balancea la flota.']]);
DED('seg',`## Índices
Se normalizan por un millón de horas-hombre trabajadas para comparar obras de distinto tamaño: frecuencia (accidentes), gravedad (días perdidos) y accidentabilidad (combinación).

## Marco legal
La Ley 29783 de Seguridad y Salud en el Trabajo y la norma G.050 Seguridad durante la construcción obligan a identificar peligros, evaluar riesgos y aplicar controles (eliminar, sustituir, ingeniería, administrativos y, al final, EPP).`);
CRI('seg',[
['¿Cuál es el control más eficaz para el riesgo de caída en un borde de losa?',['Casco','Una baranda perimetral (control de ingeniería) antes que el arnés','Un letrero','Charlas solamente'],1,'La jerarquía de controles pone el EPP como último recurso.']]);
REF('seg',['Ley 29783 y su reglamento','G.050 Seguridad durante la construcción']);
DED('cal',`## Criterio de aceptación
Se acepta el concreto si el promedio de tres ensayos consecutivos es ≥ f′_{c} y ningún ensayo individual es menor que f′_{c} − 35 kg/cm² (para f′_{c} ≤ 350). El primer criterio controla la media; el segundo, los valores bajos aislados. Ambos se ligan al f′_{cr} de diseño (ACI 318 y E.060).`);
CRI('cal',[
['Un ensayo individual da f′_{c} − 50 kg/cm². ¿Qué corresponde?',['Aceptar','Investigar: extraer núcleos de esa zona y evaluar si la estructura es adecuada','Demoler de inmediato','Ignorar'],1,'Un resultado bajo no implica demoler: primero se investiga con núcleos (criterio de E.060 y ACI 318).']]);
DED('mov',`## Curva masa (Brückner)
Se acumulan los volúmenes a lo largo del eje, con cortes positivos y rellenos negativos (corregidos por el factor de compactación). En un tramo donde la curva sube hay corte; donde baja, relleno. Una horizontal que corta la curva en dos puntos indica que entre ellos el corte compensa el relleno: es la distancia a transportar.

## Sobreacarreo
Más allá de la distancia libre incluida en el precio, se paga el volumen por la distancia adicional.`);
CRI('mov',[
['¿Por qué a veces conviene botar el corte y traer material de cantera aunque haya corte cerca?',['Nunca','Si el transporte del corte es muy largo o el material es de mala calidad para relleno','Por costumbre','Por el IGV'],1,'La curva masa compara el costo de transportar con el de préstamo y botadero.']]);
DED('izq',`## Tabla de carga
La capacidad baja con el radio porque el momento de vuelco es carga por radio, y el contrapeso es fijo. Además la pluma tiene límites estructurales.

## Eslingas
Con dos ramales a θ de la horizontal, cada uno toma W/(2 sen θ). A 30°, cada eslinga toma el peso completo de la pieza.

## Margen
Se trabaja a 75–85 % de la capacidad para cubrir efectos dinámicos, viento y errores de peso.`);
CRI('izq',[
['La pieza pesa 8 t y la grúa tiene 10 t de capacidad al radio. ¿Se iza?',['Sí','No sin revisar: falta sumar aparejos y gancho y respetar el 75 %','Siempre','Depende del día'],1,'8 t más aparejos superan 7.5 t (75 % de 10 t). Hay que acercar la grúa o usar una mayor.']]);
DED('val',`## Valorización
Es el metrado ejecutado del mes por su precio unitario.

## Reajuste por fórmula polinómica
Los precios cambian. La fórmula polinómica divide el presupuesto en monomios (mano de obra, cemento, acero, combustible…) con coeficientes que suman 1. K = Σ coeficiente × (índice actual/índice base) mide cuánto subieron los costos. El reajuste es V(K − 1). Los índices los publica el INEI.`);
CRI('val',[
['¿Por qué los coeficientes de la fórmula polinómica deben sumar 1?',['Por costumbre','Para que si ningún índice cambia, K = 1 y no haya reajuste','Por el IGV','No deben'],1,'Cada coeficiente es la fracción del presupuesto de ese insumo.']]);
DED('pen',`## Penalidad diaria
Se diseña para que, si el atraso fuera igual a una fracción F del plazo, la penalidad llegue al tope del 10 % del monto: 0.10·Monto/(F·Plazo) por día. Con plazos cortos F = 0.40 (llega antes al tope); con largos, 0.25.`);
CRI('pen',[
['Un contratista calcula que pagar penalidades le sale más barato que acelerar. ¿Qué riesgo corre?',['Ninguno','Llegar al tope del 10 % y que la entidad resuelva el contrato, además del daño reputacional','Ganar más','Nada'],1,'Al alcanzar la penalidad máxima, la entidad puede resolver el contrato y ejecutar garantías.']]);
DED('adi',`## Incidencia
Es el porcentaje que representan los adicionales menos los deductivos vinculados respecto al monto original. La ley fija topes a partir de los cuales se requiere otra autorización.

## Liquidación
Es el balance final: todo lo que corresponde pagar (valorizaciones, reajustes, mayores gastos generales) menos lo ya pagado, adelantos amortizados y penalidades.`);
CRI('adi',[
['¿Qué suele causar muchos adicionales en obras públicas?',['Mala suerte','Expedientes técnicos deficientes: sin estudios de suelos, metrados incompletos o planos incompatibles','El clima solamente','El IGV'],1,'La calidad del expediente decide cuántos adicionales tendrá la obra.']]);
DED('gfz',`## Por qué garantías
La entidad entrega dinero (adelantos) y confía la obra al contratista. La carta fianza es un compromiso de un banco o aseguradora de pagar si el contratista incumple: así el riesgo lo asume quien puede evaluarlo y cobrarlo.

## Costo
El banco cobra una comisión anual sobre el monto garantizado: tasa × monto × tiempo.`);
CRI('gfz',[
['¿Por qué la garantía por adelanto puede reducirse durante la obra?',['No puede','Porque el adelanto se va amortizando: el monto en riesgo baja','Por el banco','Por el IGV'],1,'La garantía cubre el saldo no amortizado del adelanto.']]);
DED('par2',`## Coeficiente de edificación
Área techada total permitida entre área del terreno. Junto con la altura máxima y el área libre, controla la densidad de la ciudad.

## Área por piso
El área libre exigida (porcentaje del terreno sin techar) limita el área de cada piso: A_{terreno}(1 − %libre).`);
CRI('par2',[
['Un proyecto cumple el coeficiente de edificación pero no el área libre. ¿Se aprueba?',['Sí','No: debe cumplir todos los parámetros del certificado de parámetros urbanísticos','Depende','Siempre'],1,'Cada parámetro protege algo distinto: densidad, iluminación, ventilación.']]);
DED('dim',`## Aforo
Es el área entre el índice de ocupación (m² por persona) que da la norma A.130 según el uso. Con el aforo se dimensionan salidas, escaleras de evacuación y servicios.

## Iluminación y ventilación
El área de ventanas como porcentaje del área del ambiente asegura luz y aire natural (norma A.010).`);
CRI('dim',[
['¿Por qué el aforo importa al ingeniero civil?',['No importa','Define el ancho de escaleras y salidas de evacuación, y la carga viva de uso','Solo al arquitecto','Por el IGV'],1,'La seguridad ante evacuación y las cargas de diseño dependen del uso y la ocupación.']]);
DED('tv',`## Carga muerta adicional
Un techo verde suma el peso del sustrato saturado (γ_{sat}·e) más las capas de drenaje e impermeabilización. Es una carga permanente que la estructura debe soportar desde el diseño.

## Retención de agua
El sustrato retiene una fracción de la lluvia y la libera lentamente: reduce el caudal pico del drenaje pluvial.`);
CRI('tv',[
['Se quiere poner un techo verde sobre un edificio existente. ¿Qué es lo primero?',['Comprar plantas','Verificar que la estructura soporte la carga adicional saturada','Impermeabilizar','Pintar'],1,'Un sustrato saturado de 20 cm puede pesar más de 300 kg/m².']]);
DED('ie1',`## Ley de Ohm
V = IR: la corriente es proporcional al voltaje e inversamente a la resistencia.

## Potencia en corriente alterna
P = VI cos φ: el factor de potencia cos φ indica qué parte de la corriente hace trabajo útil. En sistemas trifásicos equilibrados, la potencia total es √3·V_{L}·I·cos φ, porque las tres fases están desfasadas 120°.

## Energía
E = P·t, en kWh.`);
CRI('ie1',[
['¿Por qué un motor con bajo factor de potencia es un problema?',['No lo es','Pide más corriente para la misma potencia útil: cables más gruesos y más pérdidas','Consume menos','Mejora el voltaje'],1,'Por eso se instalan bancos de condensadores para corregir cos φ.']]);
DED('ie2',`## Carga básica (CNE-Utilización)
El Código Nacional de Electricidad fija cargas mínimas para viviendas según el área: 2500 W por los primeros 90 m² y 1000 W por cada 90 m² adicionales o fracción. Se suman cargas especiales (cocina, terma) y se aplican factores de demanda, porque no todo funciona a la vez.

## Corriente de diseño
I = MD/(V cos φ) y se multiplica por 1.25 para cargas continuas y margen.`);
CRI('ie2',[
['¿Por qué se aplican factores de demanda?',['Para ahorrar cable sin razón','Porque es improbable que todos los aparatos funcionen al mismo tiempo','Por el IGV','No se aplican'],1,'Sumar todas las potencias instaladas sobredimensionaría la acometida.']]);
DED('ie3',`## Caída de tensión
El conductor tiene resistencia R = ρL/S. En monofásico la corriente va y vuelve: ΔV = 2IρL/S. En trifásico equilibrado, ΔV = √3·IρL/S.

## Límites
El CNE limita la caída de tensión (por ejemplo, 2.5 % en alimentadores y 4 % total) para que los equipos funcionen bien.`);
CRI('ie3',[
['Un alimentador cumple la corriente admisible pero tiene 7 % de caída. ¿Qué haces?',['Nada','Aumento la sección del conductor: la caída de tensión también manda','Bajo el voltaje','Cambio el color del cable'],1,'En distancias largas la sección la define la caída de tensión, no la ampacidad.']]);
DED('ie4',`## Pozo a tierra
Dwight (1936) resolvió la resistencia de un electrodo cilíndrico vertical en un suelo homogéneo: R = (ρ/(2πL))(ln(4L/a) − 1). Depende sobre todo de la resistividad del suelo y de la longitud.

## Varios electrodos
En paralelo y suficientemente separados, la resistencia se divide aproximadamente entre su número.

## Tratamiento
Sales o bentonita reducen la resistividad alrededor del electrodo.`);
CRI('ie4',[
['¿Para qué sirve un pozo a tierra en una vivienda?',['Para nada','Para que una falla de aislamiento descargue a tierra y opere el diferencial, protegiendo a las personas','Para ahorrar luz','Para el agua'],1,'Sin puesta a tierra, la carcasa de un equipo con falla queda energizada.']]);
DED('ilu',`## Método de los lúmenes
El flujo que llega al plano de trabajo es el emitido por las lámparas por el coeficiente de utilización (pérdidas en techos, paredes y la luminaria) y por el factor de mantenimiento (suciedad y envejecimiento). Para lograr E en un área A: N·Φ·CU·FM = E·A.`);
CRI('ilu',[
['Un aula diseñada sin factor de mantenimiento:',['Queda bien siempre','Cumple al inicio, pero en meses queda por debajo del nivel exigido','Consume menos','Se ve más bonita'],1,'Las lámparas pierden flujo y las luminarias se ensucian.']]);
DED('edi',`## La cadena
Cada etapa usa la salida de la anterior: el metrado (E.020) da el peso P; el peso y los parámetros sísmicos (E.030) dan V; las cargas por columna dan su área (predimensionamiento con 0.45f′_{c}); la carga y la capacidad portante (E.050) dan la zapata. Un error en el peso arrastra a todo lo demás: por eso se revisa el orden de magnitud (≈ 1 t/m² por piso en edificios de concreto).`);
CRI('edi',[
['Tu metrado da 0.3 t/m² por piso para un edificio de concreto con placas. ¿Qué haces?',['Sigo','Lo reviso: lo usual es cerca de 1 t/m²; probablemente falta peso propio o tabiques','Bajo el sismo','Nada'],1,'Los órdenes de magnitud son la primera defensa contra errores.']]);
DED('hid',`## La cadena
Geometría de la cuenca → t_{c} (Kirpich) → intensidad de diseño (IDF) → caudal (racional) → sección del canal (Manning) → régimen (Froude). Cada paso usa el resultado del anterior; si el canal resulta supercrítico, se revisan transiciones y disipadores.`);
CRI('hid',[
['El canal diseñado resulta con Fr = 1.8. ¿Qué implica?',['Nada','Flujo supercrítico: velocidades altas, posible erosión y resaltos donde cambie la pendiente','Que está seco','Que es lento'],1,'Hay que revestirlo y prever disipación de energía al final.']]);
DED('pvi',`## La cadena
Tráfico (IMD, composición, crecimiento) → ESAL de diseño → subrasante (CBR y M_{r}) → número estructural → espesores → metrados y costo. Además se revisa la geometría (peralte en curvas). Es el orden del Manual de Carreteras del MTC.`);
CRI('pvi',[
['¿Qué dato, si está mal, afecta más el diseño del pavimento?',['El color de la señalización','El tráfico pesado: por la cuarta potencia, los camiones dominan el ESAL','El nombre de la vía','La pintura'],1,'Un conteo mal hecho de camiones cambia el ESAL en órdenes de magnitud.']]);
DED('psr',`## La cadena
Población futura → demanda (dotación) → caudales de diseño → conducción por gravedad (Hazen-Williams despejando D) → reservorio (25 %) → saneamiento (UBS). El diámetro teórico se redondea al comercial superior y se verifica la presión.`);
CRI('psr',[
['El sistema está bien diseñado pero nadie lo opera. ¿Qué faltó?',['Más tubería','Organizar y capacitar a la JASS y asegurar una cuota para operación y mantenimiento','Más cloro','Nada'],1,'La sostenibilidad es social y económica además de técnica.']]);
DED('pmc',`## La cadena
Suelo (φ, γ) → K_{a} (Rankine) → empuje → estabilidad (volteo y deslizamiento) → presión en la base → momento en la pantalla → acero. El momento en la base de la pantalla es el de un voladizo con carga triangular: K_{a}γh³/6.`);
CRI('pmc',[
['El muro cumple volteo pero no deslizamiento. ¿Qué es lo más eficaz?',['Más acero','Agregar un diente (llave) bajo la zapata o alargar el talón para más peso','Pintarlo','Hacerlo más alto'],1,'El diente moviliza empuje pasivo y el talón suma peso que aumenta la fricción.']]);
DED('cmv',`## Segunda ley de Newton para un volumen de control
La fuerza neta sobre el agua que pasa por un tramo es igual a la cantidad de movimiento que sale por segundo menos la que entra: ΣF = ρQ(V₂ − V₁). Es F = ma escrita para un flujo continuo.

## Codo
En el eje de simetría del codo, la presión y la cantidad de movimiento de entrada y salida tienen componentes que se suman: cada una aporta (pA + ρQV)·sen(θ/2), y en total 2(pA + ρQV)sen(θ/2).`);
CRI('cmv',[
['Una tubería a presión sin bloques de anclaje en los codos:',['Funciona igual','Puede desacoplarse en las uniones por el empuje del agua','Pierde menos','No importa'],1,'El empuje en codos de tuberías grandes llega a decenas de toneladas; los dados de concreto lo llevan al suelo.']]);
DED('sim',`## Semejanza dinámica
Para que modelo y prototipo se comporten igual, las fuerzas importantes deben estar en la misma proporción. En canales manda la gravedad: el número de Froude V/√(gL) debe ser igual. Despejando: V_{r} = √L_{r}. Como Q = V·A y A_{r} = L_{r}²: Q_{r} = L_{r}^{5/2}. Las fuerzas escalan como presión por área: L_{r}·L_{r}² = L_{r}³.

## Buckingham (1914)
Si un fenómeno depende de n variables con k dimensiones fundamentales, se puede describir con n − k grupos adimensionales.`);
CRI('sim',[
['¿Por qué no se puede respetar a la vez Froude y Reynolds en un modelo con agua?',['Sí se puede','Porque exigen escalas de velocidad opuestas: √L_{r} y 1/L_{r}','Por el costo','Por la gravedad'],1,'Se elige el número dominante y se cuida que el modelo sea suficientemente turbulento para que Reynolds no influya.']]);
DED('hcr',`## Corrección de Hardy Cross (1936)
En una malla, la suma de pérdidas con signo debe ser cero. Si con los caudales supuestos no lo es, se corrige cada caudal en ΔQ. Desarrollando h = r(Q + ΔQ)^{n} con Taylor y despreciando términos de orden superior: Σh + nΣ(h/Q)ΔQ = 0, de donde ΔQ = −Σh/(nΣ|h/Q|). Es el método de Newton aplicado a la red.`);
CRI('hcr',[
['La red no converge después de muchas iteraciones. ¿Qué revisas?',['Nada','Los signos de las pérdidas según el sentido de recorrido y la continuidad en los nudos','El color de las tuberías','La impresora'],1,'Un signo mal puesto impide que la suma tienda a cero.']]);
