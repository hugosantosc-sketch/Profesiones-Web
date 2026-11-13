/* Subtemas para engrosar madera, puentes, preesforzado y patología */
EXT('m27');
SUB('md3',{t:'Uniones clavadas y empernadas',
lec:`En madera, como en acero, la estructura falla por sus uniones. El Manual de Diseño para Maderas del Grupo Andino (base de la norma E.010) da cargas admisibles por clavo y por perno según el grupo estructural y el diámetro.

## Clavos
- Carga admisible a simple corte: P_{adm} (tabla, según grupo y diámetro). Se ajusta con los factores del manual para doble corte, madera húmeda o clavos lanceros
- Número de clavos: n = P/(P_{adm}·factores)
- Penetración mínima en la pieza que recibe la punta: alrededor de 11 diámetros para desarrollar la carga de tabla
- Espaciamientos mínimos medidos en diámetros d, a lo largo y a través de la fibra, para que la madera no se raje

## Pernos
La carga admisible depende del ángulo entre la fuerza y la fibra. Para un ángulo θ, se interpola con la fórmula de Hankinson:

N_{θ} = P·Q/(P·sen²θ + Q·cos²θ)

con P la carga paralela y Q la perpendicular a la fibra.`,
ded:`## De dónde sale Hankinson
La madera es anisótropa: resiste mucho más a lo largo de la fibra que a través. Hankinson (1921) observó en ensayos de compresión que la resistencia a un ángulo θ sigue esa forma, que pasa por P en θ = 0 y por Q en θ = 90°, con una transición suave. Se usa para pernos y para compresión inclinada (Breyer, Design of Wood Structures).

## Por qué espaciamientos en diámetros
Un clavo actúa como una cuña: si está muy cerca de otro o del borde, la madera se raja a lo largo de la fibra. Medir en diámetros hace la regla válida para cualquier tamaño de clavo: un clavo más grueso necesita más madera alrededor.`,
key:['n = [[P|P_{adm}·factores]]','N_{θ} = [[PQ|P sen^{2}θ + Q cos^{2}θ]]','Penetración ≈ 11d'],
err:'Clavar cerca del borde de piezas secas: se rajan y la unión pierde resistencia.',
x:[['md1','Grupos estructurales'],['per','Conexiones de acero'],['blq','Bloques y bordes']],
g:[
r=>{const P=r.i(100,3000,10),Pa=r.i(20,120,1);return{q:`La unión debe transmitir ${P} kg y cada clavo admite ${Pa} kg. ¿Cuántos clavos? (redondea arriba)`,a:Math.ceil(P/Pa),u:'clavos',tol:0,s:[`n = ⌈${P}/${Pa}⌉ = ${Math.ceil(P/Pa)}`]};},
r=>{const d=r.i(2,6,.1);return{q:`Clavo de ${d} mm de diámetro. Halla la penetración mínima de 11d.`,a:11*d,u:'mm',s:[`= ${n(11*d)} mm`]};},
r=>{const P=r.i(200,3000,10),Pa=r.i(20,120,1),f=r.p([1.8,.8,.67]);return{q:`${P} kg con clavos de ${Pa} kg y un factor de ajuste de ${f} (de la tabla del manual para esa condición). ¿Cuántos clavos?`,a:Math.ceil(P/(Pa*f)),u:'clavos',tol:0,s:[`n = ⌈${P}/(${Pa}·${f})⌉ = ${Math.ceil(P/(Pa*f))}`]};},
r=>{const P=r.i(300,2000,10),Q=Math.round(P*r.i(.25,.6,.05)),t=r.i(10,80,5);return{q:`Perno con P=${P} kg (paralela) y Q=${Q} kg (perpendicular). Halla la carga a ${t}°.`,a:P*Q/(P*sind(t)**2+Q*cosd(t)**2),u:'kg',s:[`= ${P}·${Q}/(${P}·sen²${t}° + ${Q}·cos²${t}°) = ${n(P*Q/(P*sind(t)**2+Q*cosd(t)**2))} kg`]};},
r=>{const T=r.i(1,8,.25),P=r.i(400,1500,10),Q=Math.round(P*r.i(.3,.5,.05)),t=r.i(20,60,5),f=r.p([1,.8]);const N=P*Q/(P*sind(t)**2+Q*cosd(t)**2)*f;return{q:`Una diagonal de armadura lleva ${T} t y llega a la cuerda a ${t}° de la fibra. Pernos con P=${P} kg y Q=${Q} kg, factor por humedad ${f}. ¿Cuántos pernos?`,a:Math.ceil(T*1000/N),u:'pernos',tol:0,s:[`N_{θ} = ${n(N)} kg por perno`,`n = ⌈${T*1000}/${n(N)}⌉ = ${Math.ceil(T*1000/N)}`]};}
],
cri:[
['En una unión clavada con madera verde que luego se secará:',['No pasa nada','La madera se contrae y los clavos pueden aflojarse o la pieza rajarse: se reduce la carga admisible','Aumenta la resistencia','Se pegan mejor'],1,'Por eso los manuales reducen la carga para madera húmeda o que cambiará de humedad en servicio.'],
['Un perno que carga perpendicular a la fibra frente a uno paralelo:',['Admite más','Admite menos: la madera se aplasta y raja más fácil a través de la fibra','Igual','Depende del color'],1,'Es la anisotropía de la madera: Hankinson baja de P a Q a medida que el ángulo se acerca a 90°.']
],
ref:['Junta del Acuerdo de Cartagena (PADT-REFORT), Manual de Diseño para Maderas del Grupo Andino','E.010 Madera','Breyer, Fridley, Cobeen y Pollock, Design of Wood Structures']});
SUB('md4',{t:'Muros de corte y diafragmas de madera',
lec:`Una casa de madera resiste el sismo con sus **muros de corte** (entramados de pies derechos revestidos con tableros) y su **diafragma** de piso o techo, que reparte la fuerza a los muros.

## Muro de corte
- Capacidad por metro de muro v (kg/m), de tabla según tablero, clavos y espaciamiento
- Longitud necesaria en cada dirección: L = V/v
- Fuerza en los anclajes de los extremos (para que el muro no se levante): T = (V·h − W·L/2)/L ≈ V·h/L si la carga vertical es pequeña

## Diafragma
Se comporta como una viga horizontal de gran peralte:
- Momento: M = wL²/8; la cuerda (viga perimetral) lleva C = T = M/b, con b el ancho del diafragma
- Corte por metro en el borde: v = wL/(2b)

## Peso
La madera es liviana: a igual sismo, la fuerza es mucho menor que en concreto. Por eso las viviendas de madera bien clavadas se comportan bien en sismos, si están bien ancladas a la cimentación.`,
ded:`## Por qué la cuerda lleva M/b
Un diafragma rectangular cargado lateralmente actúa como una viga de luz L y peralte b. El momento se resiste con un par: compresión en la cuerda de un lado y tensión en la del otro, separadas b. Igual que en una viga de concreto el par es C·brazo, aquí T = M/b. El tablero, como el alma de una viga I, toma el corte.

## Por qué el anclaje
El muro es un voladizo vertical: la fuerza V en la parte alta crea un momento de volteo V·h en la base. La carga vertical lo resiste con W·L/2. Lo que falta lo da el anclaje (hold-down) en el extremo traccionado.`,
key:['L = [[V|v]]','T = [[V·h − W·L/2|L]]','C = T = [[wL^{2}|8b]]','v = [[wL|2b]]'],
err:'Distribuir bien los muros en planta pero no anclarlos a la cimentación.',
x:[['esp','Cortante basal'],['mom','Momento de volteo'],['vm','La cuerda como viga']],
g:[
r=>{const V=r.i(500,8000,50),v=r.i(200,900,10);return{q:`Cortante del piso ${V} kg y muro con capacidad ${v} kg/m. Halla la longitud mínima de muros.`,a:V/v,u:'m',s:[`L = ${V}/${v} = ${n(V/v)} m`]};},
r=>{const V=r.i(500,5000,50),h=r.i(2.4,3,.1),L=r.i(1.2,6,.1);return{q:`Muro de L=${L} m y h=${h} m con V=${V} kg, sin carga vertical. Halla T en el anclaje.`,a:V*h/L,u:'kg',s:[`= ${V}·${h}/${L} = ${n(V*h/L)} kg`]};},
r=>{const V=r.i(500,5000,50),h=r.i(2.4,3,.1),L=r.i(1.2,6,.1),W=r.i(200,3000,50);const T=Math.max((V*h-W*L/2)/L,0);return{q:`Muro de L=${L} m, h=${h} m, V=${V} kg y carga vertical ${W} kg. Halla la tensión en el anclaje (0 si no hay levantamiento).`,a:T,u:'kg',s:[`= (${n(V*h)} − ${n(W*L/2)})/${L} = ${n(T)} kg`]};},
r=>{const w=r.i(50,400,10),L=r.i(4,15,.5),b=r.i(3,10,.5);return{q:`Diafragma de L=${L} m y b=${b} m con w=${w} kg/m. Halla la fuerza en la cuerda.`,a:w*L*L/(8*b),u:'kg',s:[`M = ${n(w*L*L/8)} kg·m`,`C = T = ${n(w*L*L/(8*b))} kg`]};},
r=>{const A=r.i(40,150,5),p=r.i(80,250,10),Z=.45,S=r.p([1,1.05,1.1]),R=r.p([5,6,7]),v=r.i(300,800,10),Lx=r.i(4,12,.5);const V=Z*2.5*S/R*A*p;const nec=V/v;return{q:`Vivienda de madera de ${A} m² y ${p} kg/m² de peso sísmico, en Lima (Z=0.45, U=1, C=2.5, S=${S}) con R=${R}. Los muros dan ${v} kg/m. Halla la longitud total de muros por dirección.`,a:nec,u:'m',s:[`V = ZUCS/R·P = ${n(V)} kg`,`L = ${n(nec)} m`]};}
],
cri:[
['Una casa de madera tiene muchos muros en una dirección y casi ninguno en la otra:',['Está bien si el techo es liviano','Es vulnerable en la dirección débil: hay que equilibrar muros en ambas direcciones','No importa en madera','Mejora la ventilación'],1,'El sismo actúa en cualquier dirección. La regla de densidad de muros se cumple por separado en X y en Y.'],
['¿Qué falla típica muestra una vivienda de madera sin anclajes?',['Se raja el piso','Se desliza o vuelca sobre su cimiento','Se quema','Nada'],1,'La estructura puede estar bien clavada y aun así salirse del cimiento. Los pernos de anclaje y los hold-downs lo evitan.']
],
ref:['Breyer y otros, Design of Wood Structures (diafragmas y muros de corte)','E.010 Madera y Manual de Diseño para Maderas del Grupo Andino','APA, Diaphragms and Shear Walls Design/Construction Guide']});
SUB('md5',{t:'Humedad, contracción y durabilidad de la madera',
lec:`La madera vive con el agua. Su resistencia, sus dimensiones y su durabilidad dependen del **contenido de humedad**.

## Contenido de humedad
CH = (P_{h} − P_{s})/P_{s} × 100, con P_{h} el peso húmedo y P_{s} el peso seco al horno.

- **Punto de saturación de las fibras (PSF):** alrededor de 28–30 %. Por encima, el agua está libre en las cavidades y no cambia las dimensiones
- Por debajo del PSF, al secar, la madera se contrae y gana resistencia
- Humedad de equilibrio: la que alcanza en su ambiente (en Lima, del orden de 15–18 %; en la sierra, menos)

## Contracción
ΔD = D·c·ΔCH/PSF, con c la contracción total de la especie (de verde a seca al horno) en esa dirección. La tangencial es casi el doble que la radial, y la longitudinal es despreciable.

## Durabilidad
Hongos y termitas necesitan humedad. Se protege con:
- Diseño: aleros, separar la madera del suelo, ventilar
- Preservación con sales hidrosolubles a presión (retención en kg/m³)`,
ded:`## De dónde sale la contracción lineal
Por debajo del PSF, la contracción es aproximadamente proporcional a la humedad perdida. Si de PSF a 0 % la pieza se contrae una fracción c, por cada punto de humedad se contrae c/PSF. Entonces ΔD = D·c·ΔCH/PSF (Wood Handbook, Forest Products Laboratory del USDA).

## Por qué tangencial es mayor que radial
Los anillos de crecimiento alternan madera temprana y tardía, de distinta densidad, y los radios leñosos rigidizan la dirección radial. Por eso una tabla cortada tangencialmente se arquea más (acanalado) que una cortada radialmente.`,
key:['CH = [[P_{h} − P_{s}|P_{s}]]·100','ΔD = D·c·[[ΔCH|PSF]]','PSF ≈ 30 %'],
err:'Instalar madera verde en carpintería o estructura: al secarse se contrae, se tuerce y afloja las uniones.',
x:[['md1','Grupos y resistencia'],['qm3','Cambios de dimensión'],['pt1','Durabilidad']],
g:[
r=>{const Ps=r.i(200,2000,10),ch=r.i(8,80,1);const Ph=Math.round(Ps*(1+ch/100));return{q:`Probeta: peso húmedo ${Ph} g y seco al horno ${Ps} g. Halla CH.`,a:(Ph-Ps)/Ps*100,u:'%',s:[`= ${n((Ph-Ps)/Ps*100)} %`]};},
r=>{const D=r.i(50,300,5),c=r.i(3,10,.1),dch=r.i(5,25,1);return{q:`Tabla de ${D} mm de ancho, contracción tangencial total ${c} %, pierde ${dch} puntos de humedad bajo el PSF (30 %). Halla la contracción.`,a:D*c/100*dch/30,u:'mm',s:[`= ${D}·${c/100}·${dch}/30 = ${n(D*c/100*dch/30)} mm`]};},
r=>{const ch=r.i(30,90,1),he=r.i(12,20,1);return{q:`Madera con CH=${ch} % se coloca en un ambiente de equilibrio ${he} %. ¿Cuántos puntos de humedad bajo el PSF (30 %) perderá?`,a:30-he,u:'puntos',tol:0,s:[`De ${ch} % a 30 % no cambia de tamaño`,`De 30 % a ${he} %: ${30-he} puntos`]};},
r=>{const V=r.i(1,20,.5),R=r.i(4,12,.5);return{q:`Se preservan ${V} m³ de madera con retención de ${R} kg/m³ de sal. ¿Cuántos kg de sal quedan en la madera?`,a:V*R,u:'kg',s:[`= ${n(V*R)} kg`]};},
r=>{const b=r.i(100,250,10),ct=r.i(5,10,.1),cr=+(ct*r.i(.45,.6,.05)).toFixed(1),ch=r.i(35,60,1),he=r.i(12,18,1);const d=30-he;return{q:`Viga verde de ${b} mm de peralte (CH=${ch} %) con contracción radial ${cr} % y tangencial ${ct} %. Se seca hasta ${he} %. Si el peralte coincide con la dirección tangencial, ¿cuántos mm se contrae?`,a:b*ct/100*d/30,u:'mm',s:[`Pierde ${d} puntos bajo el PSF`,`Tangencial: ${n(b*ct/100*d/30)} mm; radial: ${n(b*cr/100*d/30)} mm`]};}
],
cri:[
['Unos pisos de madera instalados en verano húmedo de Lima se abren en juntas en la sierra seca:',['Mala instalación siempre','La madera se contrajo al bajar su humedad de equilibrio','Termitas','Sismo'],1,'Al cambiar de ambiente la madera busca su nueva humedad de equilibrio y se contrae bajo el PSF.'],
['¿Cuál es la protección más eficaz contra la pudrición?',['Pintar encima','Diseño: mantenerla seca y ventilada, separada del suelo, más preservación','Usar clavos grandes','Ninguna'],1,'Los hongos necesitan humedad por encima de ~20 %. Si la madera se mantiene seca, casi no se pudre.']
],
ref:['USDA Forest Products Laboratory, Wood Handbook: Wood as an Engineering Material','Manual de Diseño para Maderas del Grupo Andino','E.010 Madera']});

EXT('m24');
SUB('pu5',{t:'Losa del tablero: franjas equivalentes',
lec:`La losa de un puente de vigas recibe las ruedas directamente. AASHTO LRFD (4.6.2.1) permite analizarla como franjas transversales que trabajan como vigas entre las vigas longitudinales.

## Ancho de franja equivalente (losa vaciada in situ, en mm, con S la separación de vigas en mm)
- Momento positivo: E = 660 + 0.55S
- Momento negativo: E = 1220 + 0.25S
- Voladizo: E = 1140 + 0.833X, con X la distancia de la rueda a la cara del apoyo

## Cargas
- Rueda del camión de diseño: 72.5 kN (la mitad de un eje de 145 kN)
- Amplificación dinámica IM = 33 % y factor de presencia múltiple m = 1.2 para un carril cargado
- Momento por rueda en la franja (aproximación de viga simple): M ≈ P·S/4, y por metro: M/E

En la práctica, la continuidad de la losa sobre varias vigas reduce el momento: AASHTO trae tablas (A4-1) ya calculadas por metro de ancho.

## Carga muerta
Para una losa continua, M ≈ wS²/10.`,
ded:`## Por qué "franja equivalente"
Una rueda sobre una losa no carga solo la franja bajo ella: la losa reparte la carga en dos direcciones. AASHTO calibró, con análisis de placas, qué ancho de viga simple daría el mismo momento máximo que la losa real. Ese ancho crece con la separación S porque, a más luz, la carga se reparte en más ancho (Barker y Puckett, Design of Highway Bridges).

## Por qué wS²/10
Es un valor intermedio entre la viga simple (wS²/8) y la empotrada (wS²/12): representa una losa continua sobre varias vigas, donde los tramos se restringen parcialmente unos a otros.`,
key:['E^{+} = 660 + 0.55S','E^{−} = 1220 + 0.25S','M_{rueda} ≈ [[P·S|4]]','M_{LL} = [[m(1+IM)PS/4|E]]'],
err:'Olvidar el factor de presencia múltiple y el impacto en el diseño de la losa.',
x:[['pu1','HL-93'],['pu3','Combinaciones'],['l2d','Losas en dos direcciones']],
g:[
r=>{const S=r.i(1500,3600,50);return{q:`Vigas separadas S=${S} mm. Halla E para momento positivo.`,a:660+.55*S,u:'mm',s:[`= 660 + 0.55·${S} = ${n(660+.55*S)} mm`]};},
r=>{const S=r.i(1500,3600,50);return{q:`S=${S} mm. Halla E para momento negativo.`,a:1220+.25*S,u:'mm',s:[`= 1220 + 0.25·${S} = ${n(1220+.25*S)} mm`]};},
r=>{const S=r.i(1.5,3.6,.05),t=r.i(.18,.25,.01),wd=r.i(.5,2,.1);const w=t*24+wd;return{q:`Losa de ${t*100} cm (γ=24 kN/m³) con ${wd} kN/m² de asfalto, S=${S} m. Halla el momento muerto por metro (wS²/10).`,a:w*S*S/10,u:'kN·m/m',s:[`w = ${n(w)} kN/m²`,`M = ${n(w*S*S/10)} kN·m/m`]};},
r=>{const S=r.i(1500,3600,50);const E=(660+.55*S)/1000,M=1.2*1.33*72.5*S/1000/4;return{q:`S=${S} mm. Con P=72.5 kN, IM=33 % y m=1.2, halla el momento positivo por metro (viga simple sobre la franja).`,a:M/E,u:'kN·m/m',s:[`E = ${n(E)} m`,`M = 1.2·1.33·72.5·${S/1000}/4 = ${n(M)} kN·m`,`Por metro = ${n(M/E)} kN·m/m`]};},
r=>{const S=r.i(1800,3300,50),t=r.i(.18,.24,.01),wd=r.i(.8,1.5,.1),fc=r.p([28,35]),d=t*1000-40;const E=(660+.55*S)/1000,MLL=1.2*1.33*72.5*S/1000/4/E*.8,MDC=t*24*(S/1000)**2/10,MDW=wd*(S/1000)**2/10,Mu=1.25*MDC+1.5*MDW+1.75*MLL;const fy=420;let As=Mu*1e6/(.9*fy*.9*d);for(let i=0;i<5;i++){const a=As*fy/(.85*fc*1000);As=Mu*1e6/(.9*fy*(d-a/2));}return{q:`Losa de ${t*100} cm, S=${S} mm, asfalto ${wd} kN/m², f′_{c}=${fc} MPa, f_{y}=420 MPa, d=${d} mm. Toma M_{LL} como 0.8 del valor de viga simple por continuidad. Con Resistencia I (1.25DC + 1.5DW + 1.75LL), halla el acero positivo por metro.`,a:As/100,u:'cm²/m',s:[`M_{DC} = ${n(MDC)}, M_{DW} = ${n(MDW)}, M_{LL+IM} = ${n(MLL)} kN·m/m`,`M_{u} = ${n(Mu)} kN·m/m`,`A_{s} = ${n(As/100)} cm²/m`]};}
],
cri:[
['Si se separan más las vigas para usar menos vigas, ¿qué pasa con la losa?',['Nada','Su luz crece y necesita más espesor y acero, aunque la franja equivalente también crece','Se vuelve más liviana','Ya no necesita acero'],1,'El momento crece con S (y con S² por carga muerta). Menos vigas no siempre es más barato.'],
['¿Por qué el voladizo del tablero se revisa también por choque vehicular?',['No se revisa','Porque la baranda transmite al voladizo la fuerza de impacto de un vehículo (estado límite de evento extremo)','Por estética','Por el agua'],1,'AASHTO exige diseñar el voladizo para la carga de colisión en la baranda, que suele gobernar su acero superior.']
],
ref:['AASHTO LRFD Bridge Design Specifications, 4.6.2.1 y tabla A4-1','Barker y Puckett, Design of Highway Bridges: An LRFD Approach','MTC, Manual de Puentes']});
SUB('pu6',{t:'Estribos y pilares',
lec:`La subestructura lleva las cargas del tablero al suelo. El **estribo** además contiene el terraplén de acceso.

## Fuerzas sobre un estribo
- Reacciones del tablero: DC, DW y LL + IM
- Empuje de tierras: E_{a} = ½K_{a}γH²
- Sobrecarga por carga viva sobre el relleno: altura equivalente h_{eq} (tabla AASHTO, entre 0.6 y 1.5 m según la altura): E_{LS} = K_{a}γh_{eq}H
- **Frenado (BR):** el mayor entre 25 % del peso de los ejes del camión o tándem de diseño, y 5 % del camión o tándem más la carga de carril, por carril
- Sismo: empuje dinámico (Mononobe-Okabe) y la fuerza inercial del tablero

## Verificaciones
Como un muro de contención: volteo, deslizamiento y presión en el suelo; luego el diseño del concreto.

## Pilares
Reciben las reacciones de dos tramos y deben resistir el sismo y la socavación. La cimentación debe quedar por debajo de la profundidad de socavación calculada.`,
ded:`## Por qué la sobrecarga es un rectángulo
Una carga uniforme q sobre el relleno aumenta el esfuerzo vertical en q a cualquier profundidad. El empuje lateral es K_{a}·q constante en toda la altura, así que el diagrama es un rectángulo de área K_{a}qH. AASHTO expresa q como γ·h_{eq}: la carga viva equivale a una capa extra de relleno de altura h_{eq}.

## El frenado
Un camión que frena transmite por fricción una fuerza horizontal al tablero. AASHTO la toma como fracción de los pesos de ejes (Barker y Puckett) y la aplica 1.8 m sobre la calzada. Llega a los apoyos y de ahí a estribos y pilares.`,
key:['E_{a} = ½K_{a}γH^{2}','E_{LS} = K_{a}γh_{eq}H','BR = máx(0.25·ejes; 0.05(ejes + 9.3L))'],
err:'Olvidar la sobrecarga de carga viva sobre el relleno del estribo.',
x:[['pmc','Muro de contención'],['emp','Empuje de tierras'],['soc','Socavación'],['mo','Mononobe-Okabe']],
g:[
r=>{const f=r.i(28,38,1),g=r.i(17,20,.5),H=r.i(3,10,.25);const Ka=(1-sind(f))/(1+sind(f));return{q:`Estribo de H=${H} m, relleno con φ=${f}°, γ=${g} kN/m³. Halla E_{a} por metro.`,a:.5*Ka*g*H*H,u:'kN/m',s:[`K_{a} = ${n(Ka)}`,`E_{a} = ${n(.5*Ka*g*H*H)} kN/m`]};},
r=>{const f=r.i(28,38,1),g=r.i(17,20,.5),H=r.i(3,10,.25),h=r.p([.6,.75,.9,1.2]);const Ka=(1-sind(f))/(1+sind(f));return{q:`H=${H} m, φ=${f}°, γ=${g} kN/m³, h_{eq}=${h} m. Halla el empuje por sobrecarga.`,a:Ka*g*h*H,u:'kN/m',s:[`E_{LS} = ${n(Ka)}·${g}·${h}·${H} = ${n(Ka*g*h*H)} kN/m`]};},
r=>{const L=r.i(15,80,1),nc=r.i(1,3,1);const a=.25*325,b=.05*(325+9.3*L);return{q:`Puente de ${L} m con ${nc} carril(es) cargado(s). Camión de 325 kN y carril de 9.3 kN/m. Halla BR total (sin presencia múltiple).`,a:nc*Math.max(a,b),u:'kN',s:[`25 % de ejes = ${n(a)} kN; 5 % (camión + carril) = ${n(b)} kN`,`BR = ${nc}·${n(Math.max(a,b))} = ${n(nc*Math.max(a,b))} kN`]};},
r=>{const Ea=r.i(50,300,5),H=r.i(4,9,.25),ELS=r.i(10,60,5),Mr=Math.round((Ea*H/3+ELS*H/2)*r.i(1.3,4,.1));return{q:`Estribo con M_{resistente}=${Mr} kN·m/m, E_{a}=${Ea} kN/m (a H/3) y E_{LS}=${ELS} kN/m (a H/2), H=${H} m. Halla FS al volteo.`,a:Mr/(Ea*H/3+ELS*H/2),u:'',s:[`M_{v} = ${n(Ea*H/3+ELS*H/2)} kN·m/m`,`FS = ${n(Mr/(Ea*H/3+ELS*H/2))}`]};},
r=>{const H=r.i(4,8,.25),f=r.i(30,36,1),g=18,h=.75,B=r.i(3,6,.25),W=r.i(300,900,10),R=r.i(100,400,10),mu=r.i(.45,.6,.05),BR=r.i(10,40,1);const Ka=(1-sind(f))/(1+sind(f)),Ea=.5*Ka*g*H*H,EL=Ka*g*h*H;const FS=mu*(W+R)/(Ea+EL+BR);return{q:`Estribo de H=${H} m: relleno φ=${f}°, γ=18 kN/m³, h_{eq}=0.75 m. Peso propio y relleno sobre la zapata ${W} kN/m, reacción del tablero ${R} kN/m, frenado ${BR} kN/m, μ=${mu}. Halla FS al deslizamiento.`,a:FS,u:'',s:[`E_{a} = ${n(Ea)}, E_{LS} = ${n(EL)} kN/m`,`FS = ${mu}·${W+R}/${n(Ea+EL+BR)} = ${n(FS)}`]};}
],
cri:[
['Un pilar de puente fue diseñado sin estudio de socavación. ¿Riesgo principal?',['Que se oxide','Que el río socave su cimentación en una avenida y el puente colapse','Que se pinte mal','Ninguno'],1,'La socavación es la causa más común de colapso de puentes en el Perú, sobre todo en temporadas de El Niño.'],
['¿Por qué se colocan losas de aproximación detrás de los estribos?',['Por estética','Para evitar el "escalón" entre el relleno que se asienta y el tablero rígido','Para cobrar peaje','Para drenar'],1,'El terraplén se asienta con el tiempo; la losa de aproximación hace una transición suave y protege al estribo del golpe de los vehículos.']
],
ref:['AASHTO LRFD, secciones 3.6.4 (frenado), 3.11 (empujes) y 11 (estribos y muros)','Barker y Puckett, Design of Highway Bridges','MTC, Manual de Puentes']});
SUB('pu7',{t:'Diseño sísmico de puentes',
lec:`En sismos, muchos puentes colapsan porque **el tablero se cae de sus apoyos**. Por eso AASHTO exige una longitud mínima de apoyo y topes sísmicos.

## Longitud mínima de apoyo (AASHTO 4.7.4.4)
N = (200 + 0.0017L + 0.0067H)(1 + 0.000125S²), en mm

- L: longitud del tablero hasta la siguiente junta (mm)
- H: altura media de las columnas o pilares (mm)
- S: esviaje del apoyo (grados)
- Se multiplica por un porcentaje según la zona sísmica (100 % o 150 %)

## Fuerza sísmica
F = C_{sm}·W/R, con C_{sm} el coeficiente de respuesta del espectro y R el factor de modificación de la subestructura (de 1.5 a 5, según su ductilidad). Las conexiones se diseñan sin reducción (R = 0.8 a 1) para que no fallen antes que las columnas.

## Periodo
Como un oscilador de 1 GDL: T = 2π√(W/(gK)), con K la rigidez lateral de los pilares.`,
ded:`## De dónde sale la longitud de apoyo
Es una fórmula empírica calibrada con daños de sismos reales (San Fernando 1971, Loma Prieta 1989): el desplazamiento relativo entre el tablero y el apoyo crece con la longitud del tablero (más masa y más deformación axial), con la altura de los pilares (más flexibles, se mueven más) y con el esviaje (el tablero esviajado tiende a girar en planta y "salirse" por la esquina aguda). El término 200 mm es el mínimo absoluto.

## Por qué las conexiones no se reducen
Con diseño por capacidad, la ductilidad debe darse en las columnas. Si la conexión entre tablero y pilar fallara antes, el tablero quedaría suelto. Por eso se diseña con una fuerza mayor que la de la columna que conecta.`,
key:['N = (200 + 0.0017L + 0.0067H)(1 + 0.000125S^{2})','F = [[C_{sm}W|R]]','T = 2π√{[[W|gK]]}'],
err:'Dar al tablero un apoyo justo para la carga de gravedad, sin margen para el desplazamiento sísmico.',
x:[['vf','Respuesta dinámica'],['cap2','Diseño por capacidad'],['pu4','Apoyos elastoméricos']],
g:[
r=>{const L=r.i(10,150,1)*1000,H=r.i(0,20,.5)*1000;return{q:`Tablero de L=${L/1000} m, pilares de H=${H/1000} m, sin esviaje. Halla N.`,a:200+.0017*L+.0067*H,u:'mm',s:[`= 200 + ${n(.0017*L)} + ${n(.0067*H)} = ${n(200+.0017*L+.0067*H)} mm`]};},
r=>{const S=r.i(0,60,5);return{q:`Esviaje de ${S}°. Halla el factor (1 + 0.000125S²).`,a:1+.000125*S*S,u:'',s:[`= ${n(1+.000125*S*S)}`]};},
r=>{const L=r.i(10,150,1)*1000,H=r.i(0,20,.5)*1000,S=r.i(0,45,5),p=r.p([1,1.5]);return{q:`L=${L/1000} m, H=${H/1000} m, esviaje ${S}°, porcentaje por zona ${p*100} %. Halla N.`,a:p*(200+.0017*L+.0067*H)*(1+.000125*S*S),u:'mm',s:[`N = ${n(p*(200+.0017*L+.0067*H)*(1+.000125*S*S))} mm`]};},
r=>{const W=r.i(2000,30000,500),K=r.i(20000,300000,5000);return{q:`Tablero de ${W} kN sobre pilares de rigidez total ${K} kN/m. Halla T.`,a:2*PI*sq(W/(G*K)),u:'s',s:[`T = 2π√(${W}/(9.81·${K})) = ${n(2*PI*sq(W/(G*K)))} s`]};},
r=>{const W=r.i(3000,20000,500),K=r.i(30000,200000,5000),Z=r.p([.35,.45]),S=r.p([1,1.2]),TP=r.p([.4,.6]),R=r.p([1.5,3,5]);const T=2*PI*sq(W/(G*K)),C=T<=TP?2.5:2.5*TP/T,Csm=Z*C*S;return{q:`Puente de ${W} kN, rigidez de pilares ${K} kN/m. Usa C_{sm} = Z·C·S con Z=${Z}, S=${S}, C = 2.5 si T ≤ T_{P} y 2.5T_{P}/T si no (T_{P}=${TP}). Con R=${R}, halla la fuerza sísmica de diseño de los pilares.`,a:Csm*W/R,u:'kN',s:[`T = ${n(T)} s → C = ${n(C)}`,`C_{sm} = ${n(Csm)}`,`F = ${n(Csm*W/R)} kN`]};}
],
cri:[
['En el sismo de Pisco 2007 y en otros, ¿qué daño de puentes se repite?',['Se despinta la baranda','Tableros que se desplazan o caen por falta de longitud de apoyo y topes','Se rompen las luminarias','Nada'],1,'Apoyos cortos y sin topes sísmicos permiten que el tablero salga de su asiento. AASHTO fija N y exige topes para evitarlo.'],
['Un puente muy esviajado frente a uno recto, a igual luz:',['Necesita menos apoyo','Necesita más longitud de apoyo: tiende a girar en planta','Es igual','No se diseña por sismo'],1,'El término (1 + 0.000125S²) aumenta N con el esviaje, por la tendencia a la rotación del tablero.']
],
ref:['AASHTO LRFD, 4.7.4.4 y Guide Specifications for LRFD Seismic Bridge Design','Priestley, Seible y Calvi, Seismic Design and Retrofit of Bridges','MTC, Manual de Puentes (capítulo sísmico)']});

EXT('m23');
SUB('pe5',{t:'Cortante en concreto preesforzado',
lec:`El preesfuerzo ayuda al corte: la compresión retrasa la fisuración diagonal y el cable inclinado toma parte del corte.

## Método simplificado (ACI 318, unidades MPa y mm)
V_{c} = (0.05√f′_{c} + 4.8V_{u}d_{p}/M_{u})·b_{w}·d

con límites 0.17√f′_{c}·b_{w}d ≤ V_{c} ≤ 0.42√f′_{c}·b_{w}d, y V_{u}d_{p}/M_{u} ≤ 1.

Es válido si la fuerza efectiva del preesfuerzo es al menos 40 % de la resistencia a tensión del refuerzo de flexión.

## Componente vertical del cable
Si el cable está inclinado un ángulo θ en la sección, su componente V_{p} = P·sen θ se opone al corte de las cargas. Con un cable parabólico de flecha e y luz L, la pendiente en el apoyo es 4e/L.

## Estribos
V_{s} = V_{u}/φ − V_{c}, con φ = 0.75, y s = A_{v}f_{yt}d/V_{s}.`,
ded:`## Por qué V_{u}d_{p}/M_{u}
Cerca de los apoyos el corte es alto y el momento bajo: las fisuras son diagonales "de alma" y el concreto aporta mucho. Lejos del apoyo, el momento crece y las fisuras empiezan por flexión y se inclinan después. El cociente V·d/M mide qué mecanismo predomina; por eso aparece en la fórmula (Lin y Burns, Design of Prestressed Concrete Structures).

## De dónde sale la pendiente 4e/L
Un cable parabólico con flecha e: y = 4e·x(L − x)/L². Derivando, y′ = 4e(L − 2x)/L²; en x = 0 vale 4e/L. Para pendientes pequeñas, sen θ ≈ tan θ = 4e/L, y V_{p} ≈ P·4e/L.`,
key:['V_{c} = (0.05√{f\'_{c}} + 4.8[[V_{u}d_{p}|M_{u}]])b_{w}d','0.17√{f\'_{c}}b_{w}d ≤ V_{c} ≤ 0.42√{f\'_{c}}b_{w}d','V_{p} = P·[[4e|L]]'],
err:'Usar la fórmula simplificada cuando el preesfuerzo efectivo es menor que el 40 % exigido.',
x:[['cte','Cortante en concreto armado'],['pe4','Cable parabólico'],['pe2','Preesfuerzo efectivo']],
g:[
r=>{const fc=r.i(25,70,1);return{q:`f′_{c}=${fc} MPa. Halla 0.17√f′_{c}.`,a:.17*sq(fc),u:'MPa',s:[`= ${n(.17*sq(fc))} MPa`]};},
r=>{const P=r.i(500,4000,50),e=r.i(.2,.8,.05),L=r.i(10,40,1);return{q:`Cable parabólico con P=${P} kN, flecha ${e} m y L=${L} m. Halla V_{p} en el apoyo.`,a:P*4*e/L,u:'kN',s:[`= ${P}·4·${e}/${L} = ${n(P*4*e/L)} kN`]};},
r=>{const fc=r.p([35,40,45]),bw=r.i(150,400,10),d=r.i(500,1500,50),Vu=r.i(100,800,10),Mu=r.i(100,3000,10),dp=d;const k=Math.min(Vu*dp/1000/Mu,1),Vc=(.05*sq(fc)+4.8*k)*bw*d/1000,lo=.17*sq(fc)*bw*d/1000,hi=.42*sq(fc)*bw*d/1000;return{q:`f′_{c}=${fc} MPa, b_{w}=${bw} mm, d=d_{p}=${d} mm, V_{u}=${Vu} kN, M_{u}=${Mu} kN·m. Halla V_{c}.`,a:Math.min(Math.max(Vc,lo),hi),u:'kN',s:[`V_{u}d_{p}/M_{u} = ${n(Vu*dp/1000/Mu)} → ${n(k)}`,`V_{c} = ${n(Vc)} kN (límites ${n(lo)} y ${n(hi)})`,`V_{c} = ${n(Math.min(Math.max(Vc,lo),hi))} kN`]};},
r=>{const Vu=r.i(200,1200,10),Vc=r.i(100,600,10),Av=r.p([142,157,226]),d=r.i(500,1500,50);const Vs=Math.max(Vu/.75-Vc,1);return{q:`V_{u}=${Vu} kN, V_{c}=${Vc} kN, A_{v}=${Av} mm², f_{yt}=420, d=${d} mm. Halla s.`,a:Av*420*d/(Vs*1000),u:'mm',s:[`V_{s} = ${n(Vs)} kN`,`s = ${n(Av*420*d/(Vs*1000))} mm`]};},
r=>{const fc=40,bw=r.i(120,200,10),h=r.i(800,1400,50),L=r.i(15,35,1),w=r.i(40,120,2),P=r.i(1500,4000,50),e=r.i(.3,.6,.05);const d=.8*h,x=h/2/1000,Vu=w*(L/2-x),Mu=w*x*(L-x)/2,Vp=P*4*e*(L-2*x)/L**2,k=Math.min(Vu*d/1000/Mu,1),Vc=Math.min(Math.max((.05*sq(fc)+4.8*k)*bw*d/1000,.17*sq(fc)*bw*d/1000),.42*sq(fc)*bw*d/1000);const Vn=Vu/.75-Vp;return{q:`Viga simple de L=${L} m, h=${h} mm, b_{w}=${bw} mm, d=0.8h, f′_{c}=40 MPa, w_{u}=${w} kN/m, cable parabólico con P=${P} kN y flecha ${e} m. En la sección a h/2 del apoyo, halla V_{s} requerido (V_{u}/φ − V_{p} − V_{c}, mínimo 0).`,a:Math.max(Vn-Vc,0),u:'kN',s:[`V_{u} = ${n(Vu)} kN; M_{u} = ${n(Mu)} kN·m`,`V_{p} = ${n(Vp)} kN`,`V_{c} = ${n(Vc)} kN`,`V_{s} = ${n(Math.max(Vn-Vc,0))} kN`]};}
],
cri:[
['¿Por qué una viga preesforzada necesita menos estribos que una de concreto armado igual?',['No los necesita nunca','La compresión retrasa la fisuración diagonal y el cable inclinado toma parte del corte','Porque es más larga','Por el IGV'],1,'Ambos efectos aumentan la resistencia al corte sin estribos, aunque siempre se coloca un mínimo.'],
['En una viga con cable recto (sin inclinación), ¿cuánto vale V_{p}?',['P','Cero: el cable no tiene componente vertical','P/2','Depende del concreto'],1,'V_{p} = P·sen θ; con θ = 0 no hay aporte vertical, solo el efecto de la compresión en V_{c}.']
],
ref:['Lin y Burns, Design of Prestressed Concrete Structures','Nawy, Prestressed Concrete: A Fundamental Approach','ACI 318, capítulo de cortante (22.5)']});
SUB('pe6',{t:'Postensado: acuñamiento y zona de anclaje',
lec:`En el **postensado**, el cable se tensa después de que el concreto endurece y se ancla con cuñas. Dos temas propios del postensado:

## Pérdida por acuñamiento
Al soltar el gato, las cuñas se deslizan un poco (Δ ≈ 6 mm) y el cable pierde tensión cerca del anclaje. Como la fricción se opone a ese retroceso, la pérdida solo afecta una longitud x:

x = √(Δ·E_{p}·A_{p}/p), con p la pérdida de fuerza por fricción por unidad de longitud.

La pérdida de fuerza en el anclaje es 2·p·x.

## Zona de anclaje
La fuerza concentrada del anclaje se abre dentro del concreto y genera tracciones transversales (**fuerza de estallido**). Para un anclaje centrado (ACI 318 y AASHTO, método aproximado):

T_{burst} = 0.25P_{pu}(1 − h_{anc}/h), aplicada a una distancia d_{burst} = 0.5(h − 2e) del anclaje

Se resiste con refuerzo en espiral o estribos: A_{s} = T_{burst}/(φf_{y}), con φ = 0.85.`,
ded:`## De dónde sale x
El retroceso total del cable, Δ, es la integral de su acortamiento en la zona afectada. Con la fricción lineal p (fuerza por metro), la pérdida de fuerza varía como un triángulo de altura 2px en el anclaje y cero en x. El acortamiento es el área de ese diagrama dividida entre E_{p}A_{p}: Δ = (½·2px·x)/(E_{p}A_{p}) = px²/(E_{p}A_{p}). Despejando: x = √(ΔE_{p}A_{p}/p) (Nawy).

## La fuerza de estallido
La fuerza entra por una placa pequeña de alto h_{anc} y se reparte a todo el peralte h. Las líneas de esfuerzo se abren como un abanico y, al volver a ser paralelas, generan tracción transversal. El modelo de puntales y tensores da T ≈ (P/4)(1 − h_{anc}/h): si la placa ocupara todo el peralte, no habría estallido.`,
key:['x = √{[[ΔE_{p}A_{p}|p]]}','ΔP = 2px','T_{burst} = 0.25P_{pu}(1 − [[h_{anc}|h]])','d_{burst} = 0.5(h − 2e)'],
err:'Olvidar el refuerzo de estallido detrás del anclaje: el concreto se raja al tensar.',
x:[['pe2','Pérdidas por fricción'],['pe1','Esfuerzos en la sección'],['axi','Deformación axial']],
g:[
r=>{const D=r.p([5,6,8]),Ep=195000,Ap=r.i(500,3000,50),p=r.i(5,30,1);return{q:`Δ=${D} mm, E_{p}=195 000 MPa, A_{p}=${Ap} mm², p=${p} kN/m. Halla x.`,a:sq(D*Ep*Ap/(p*1000))/1000,u:'m',s:[`x = √(${D}·195000·${Ap}/${p*1000} N/mm) = ${n(sq(D*Ep*Ap/(p*1000))/1000)} m`]};},
r=>{const p=r.i(5,30,1),x=r.i(5,25,.5);return{q:`p=${p} kN/m y x=${x} m. Halla la pérdida de fuerza en el anclaje.`,a:2*p*x,u:'kN',s:[`= 2·${p}·${x} = ${n(2*p*x)} kN`]};},
r=>{const P=r.i(500,5000,50),ha=r.i(150,400,10),h=r.i(500,2000,50);return{q:`P_{pu}=${P} kN, placa de ${ha} mm, peralte ${h} mm. Halla T_{burst}.`,a:.25*P*(1-ha/h),u:'kN',s:[`= 0.25·${P}(1 − ${ha}/${h}) = ${n(.25*P*(1-ha/h))} kN`]};},
r=>{const T=r.i(100,1200,10);return{q:`T_{burst}=${T} kN, f_{y}=420 MPa, φ=0.85. Halla el área de acero.`,a:T*1000/(.85*420),u:'mm²',s:[`= ${n(T*1000/(.85*420))} mm²`]};},
r=>{const P0=r.i(1000,4000,50),mu=r.p([.2,.25]),K=r.p([.0007,.001,.0015]),L=r.i(20,40,1),e=r.i(.3,.7,.05),Ap=r.i(1000,3000,100),D=6;const a=8*e/L,PL=P0*Math.exp(-(mu*a+K*L)),p=(P0-PL)/L,x=sq(D*195000*Ap/(p*1000))/1000;const xx=Math.min(x,L);return{q:`Cable parabólico de L=${L} m tensado desde un extremo con P₀=${P0} kN, flecha ${e} m (α total = 8e/L), μ=${mu}, K=${K}/m, A_{p}=${Ap} mm², acuñamiento 6 mm. Supón pérdida por fricción lineal. Halla la fuerza en el anclaje después del acuñamiento.`,a:P0-2*p*xx,u:'kN',s:[`P(L) = ${n(PL)} kN → p = ${n(p)} kN/m`,`x = ${n(x)} m`,`P = ${P0} − 2·${n(p)}·${n(xx)} = ${n(P0-2*p*xx)} kN`]};}
],
cri:[
['¿Por qué en cables largos se tensa desde ambos extremos?',['Por simetría estética','Para reducir la pérdida por fricción, que crece con la longitud y la curvatura','Para ahorrar cuñas','No se hace'],1,'Tensando desde los dos lados la fuerza mínima queda al centro y es mucho mayor que si se tensa desde uno solo.'],
['Un cable corto con acuñamiento de 6 mm:',['No pierde nada','Puede perder una fracción grande de su fuerza en toda su longitud','Gana tensión','Es igual a uno largo'],1,'Si x resulta mayor que la longitud del cable, el acuñamiento afecta a todo el cable: en cables cortos es una pérdida muy importante.']
],
ref:['Nawy, Prestressed Concrete: A Fundamental Approach','Collins y Mitchell, Prestressed Concrete Structures','ACI 318, zona de anclaje (25.9)']});
SUB('pe7',{t:'Contraflecha y deflexiones en preesforzado',
lec:`El preesfuerzo empuja la viga hacia arriba: produce una **contraflecha** (camber). La flecha final es la suma de la contraflecha y las flechas por cargas.

## Contraflecha
- Cable parabólico con flecha e en viga simple: δ_{p} = 5PeL²/(48EI) (hacia arriba)
- Cable recto con excentricidad e constante: δ_{p} = PeL²/(8EI)

## Por carga
δ_{w} = 5wL⁴/(384EI) (hacia abajo)

## A largo plazo
El flujo plástico aumenta ambas, y las pérdidas reducen la contraflecha con el tiempo. Un método aproximado (PCI) multiplica cada componente por factores de entre 1.8 y 3 según la etapa.

## Neta
δ = δ_{w} − δ_{p} (positivo hacia abajo). En puentes se busca una pequeña contraflecha neta para que el tablero no quede "colgado".`,
ded:`## De dónde sale 5PeL²/(48EI)
El cable parabólico ejerce sobre el concreto una carga equivalente uniforme hacia arriba w_{p} = 8Pe/L² (balanceo de cargas). Su flecha de viga simple es 5w_{p}L⁴/(384EI). Reemplazando w_{p}: 5·(8Pe/L²)·L⁴/(384EI) = 40PeL²/(384EI) = 5PeL²/(48EI).

## Y la de cable recto
Un cable recto con excentricidad constante produce momento uniforme M = Pe en toda la viga. La flecha de una viga simple con momento uniforme es ML²/(8EI) = PeL²/(8EI). Es mayor que la del parabólico porque el momento es máximo en toda la longitud.`,
key:['δ_{p} = [[5PeL^{2}|48EI]]','δ_{p} = [[PeL^{2}|8EI]] (cable recto)','δ_{w} = [[5wL^{4}|384EI]]','w_{p} = [[8Pe|L^{2}]]'],
err:'Calcular solo la flecha por cargas y olvidar la contraflecha del preesfuerzo.',
x:[['pe4','Balanceo de cargas'],['def','Flechas'],['dfc','Flujo plástico']],
g:[
r=>{const P=r.i(500,4000,50),e=r.i(.2,.7,.05),L=r.i(10,35,1),EI=r.i(500,8000,50)*1000;return{q:`P=${P} kN, cable parabólico de flecha ${e} m, L=${L} m, EI=${EI} kN·m². Halla la contraflecha.`,a:5*P*e*L*L/(48*EI)*1000,u:'mm',s:[`= 5·${P}·${e}·${L}²/(48·${EI}) = ${n(5*P*e*L*L/(48*EI)*1000)} mm`]};},
r=>{const P=r.i(500,4000,50),e=r.i(.1,.5,.05),L=r.i(10,30,1),EI=r.i(500,8000,50)*1000;return{q:`Cable recto: P=${P} kN, e=${e} m, L=${L} m, EI=${EI} kN·m². Halla la contraflecha.`,a:P*e*L*L/(8*EI)*1000,u:'mm',s:[`= ${n(P*e*L*L/(8*EI)*1000)} mm`]};},
r=>{const w=r.i(5,80,1),L=r.i(10,35,1),EI=r.i(500,8000,50)*1000;return{q:`w=${w} kN/m, L=${L} m, EI=${EI} kN·m². Halla la flecha por carga.`,a:5*w*L**4/(384*EI)*1000,u:'mm',s:[`= ${n(5*w*L**4/(384*EI)*1000)} mm`]};},
r=>{const P=r.i(1000,4000,50),e=r.i(.3,.7,.05),L=r.i(15,35,1),EI=r.i(1500,8000,50)*1000,w=r.i(10,60,1);const dp=5*P*e*L*L/(48*EI)*1000,dw=5*w*L**4/(384*EI)*1000;return{q:`P=${P} kN, flecha del cable ${e} m, L=${L} m, EI=${EI} kN·m², w=${w} kN/m. Halla la flecha neta (positivo hacia abajo).`,a:dw-dp,u:'mm',s:[`δ_{w} = ${n(dw)} mm; δ_{p} = ${n(dp)} mm`,`Neta = ${n(dw-dp)} mm`]};},
r=>{const P=r.i(1500,4000,50),e=r.i(.3,.7,.05),L=r.i(15,35,1),EI=r.i(2000,8000,50)*1000,wd=r.i(10,40,1),fp=r.p([2,2.2,2.45]),fw=r.p([2.3,2.7,3]);const dp=5*P*e*L*L/(48*EI)*1000,dw=5*wd*L**4/(384*EI)*1000;return{q:`Viga con contraflecha inicial calculada con P=${P} kN, cable de flecha ${e} m, L=${L} m, EI=${EI} kN·m², y peso propio más carga muerta w=${wd} kN/m. A largo plazo, multiplica la contraflecha por ${fp} y la flecha muerta por ${fw}. Halla la flecha neta final (positivo hacia abajo).`,a:fw*dw-fp*dp,u:'mm',s:[`δ_{p} = ${n(dp)}; δ_{w} = ${n(dw)} mm`,`Final = ${fw}·${n(dw)} − ${fp}·${n(dp)} = ${n(fw*dw-fp*dp)} mm`]};}
],
cri:[
['Vigas preesforzadas de un puente quedaron con contraflechas distintas entre sí. ¿Causa probable?',['Error de pintura','Diferencias de edad del concreto al tensar, de fuerza efectiva y de módulo','El asfalto','El viento'],1,'La contraflecha depende de P, E y del flujo plástico, que varía con la edad al tensar. En obra se miden y se compensan con el espesor de la losa.'],
['Una viga con mucha contraflecha y poca carga permanente:',['Queda plana con el tiempo','Puede seguir curvándose hacia arriba por flujo plástico','Se rompe al día siguiente','No cambia'],1,'Si la carga permanente no equilibra el preesfuerzo, el flujo plástico aumenta la curvatura hacia arriba con los años.']
],
ref:['PCI Design Handbook (multiplicadores de flechas a largo plazo)','Lin y Burns, Design of Prestressed Concrete Structures','Nawy, Prestressed Concrete']});

EXT('m28');
SUB('pt3',{t:'Inspección y ensayos no destructivos',
lec:`Antes de reparar hay que diagnosticar. Los **ensayos no destructivos** evalúan el concreto sin dañarlo, o dañándolo muy poco.

## Esclerómetro (martillo de rebote)
Mide la dureza superficial. Con una curva de calibración da una estimación de resistencia. Es rápido pero sensible a la humedad, la carbonatación y el acabado: sirve para comparar zonas, no como valor absoluto.

## Ultrasonido (velocidad de pulso)
V = L/t (distancia entre transductores sobre tiempo de viaje). Calidad orientativa del concreto:
- > 4.5 km/s: excelente
- 3.5–4.5: buena
- 3.0–3.5: dudosa
- < 3.0: pobre

Módulo dinámico: E_{d} = ρV²(1 + ν)(1 − 2ν)/(1 − ν)

## Profundidad de fisuras (ultrasonido indirecto)
Con transductores a x de cada lado de la fisura: h = x√((t_{c}/t_{s})² − 1), con t_{c} el tiempo cruzando la fisura y t_{s} el tiempo en concreto sano a la misma distancia.

## Extracción de núcleos (diamantina)
Ensayo destructivo local, el más confiable. El resultado se corrige por la relación altura/diámetro y otros factores (ASTM C42).

## Pachómetro
Ubica las barras y mide el recubrimiento.`,
ded:`## De dónde sale la fórmula de profundidad de fisuras
La onda no puede cruzar la fisura (aire): rodea su punta. Con transductores a x de cada lado, recorre 2√(x² + h²) en t_{c}. En concreto sano, a la misma separación total 2x, tarda t_{s} = 2x/V. Dividiendo: t_{c}/t_{s} = √(x² + h²)/x. Despejando h: h = x√((t_{c}/t_{s})² − 1) (Malhotra y Carino, Handbook on Nondestructive Testing of Concrete).

## El módulo dinámico
Viene de la teoría de ondas en sólidos elásticos: en un medio infinito la onda longitudinal viaja a V = √(E(1 − ν)/(ρ(1 + ν)(1 − 2ν))). Despejando E se obtiene la fórmula. Es mayor que el módulo estático de diseño.`,
key:['V = [[L|t]]','E_{d} = ρV^{2}[[(1+ν)(1−2ν)|1−ν]]','h = x√{([[t_{c}|t_{s}]])^{2} − 1}'],
err:'Usar el esclerómetro como si diera la resistencia real del concreto.',
x:[['pt1','Carbonatación y corrosión'],['pt2','Refuerzo'],['cal','Resistencia del concreto'],['ondas','Ondas']],
g:[
r=>{const L=r.i(100,800,10),t=r.i(20,250,1);return{q:`Distancia ${L} mm y tiempo ${t} μs. Halla V en km/s.`,a:L/t,u:'km/s',s:[`V = ${L}/${t} = ${n(L/t)} km/s`]};},
r=>{const V=r.i(2.5,5,.05),rho=r.i(2200,2450,10),nu=r.p([.2,.22,.25]);return{q:`V=${V} km/s, ρ=${rho} kg/m³, ν=${nu}. Halla E_{d} en GPa.`,a:rho*(V*1000)**2*(1+nu)*(1-2*nu)/(1-nu)/1e9,u:'GPa',s:[`E_{d} = ${n(rho*(V*1000)**2*(1+nu)*(1-2*nu)/(1-nu)/1e9)} GPa`]};},
r=>{const x=r.i(50,200,10),ts=r.i(20,80,1),tc=+(ts*r.i(1.1,3,.05)).toFixed(1);return{q:`Fisura: transductores a x=${x} mm a cada lado; t_{s}=${ts} μs y t_{c}=${tc} μs. Halla h.`,a:x*sq((tc/ts)**2-1),u:'mm',s:[`h = ${x}√((${tc}/${ts})² − 1) = ${n(x*sq((tc/ts)**2-1))} mm`]};},
r=>{const f=r.i(100,400,1),k=r.p([.87,.93,.96,.98,1]);return{q:`Núcleo con resistencia ${f} kg/cm² y factor de corrección por esbeltez ${k}. Halla la resistencia corregida.`,a:f*k,u:'kg/cm²',s:[`= ${n(f*k)} kg/cm²`]};},
r=>{const p=Array.from({length:6},()=>r.i(2.6,4.8,.05));const m=p.reduce((a,b)=>a+b)/6,bad=p.filter(v=>v<3.5).length;return{q:`Velocidades de pulso en seis puntos de una columna: ${p.join(', ')} km/s. ¿Cuántos puntos están por debajo de "buena" (3.5 km/s)?`,a:bad,u:'puntos',tol:0,s:[`Promedio = ${n(m)} km/s`,`Bajo 3.5: ${bad} puntos → ahí se extraen núcleos`]};}
],
cri:[
['El esclerómetro da valores bajos en una losa. ¿Qué haces?',['La demueles','Extraes núcleos en las zonas bajas para confirmar con un ensayo directo','Nada','La pintas'],1,'El esclerómetro mide solo la superficie. Antes de decidir algo caro se confirma con núcleos, el ensayo de referencia.'],
['¿Por qué no se mide una fisura con ultrasonido si está llena de agua?',['Sí se puede igual','El agua transmite la onda y el método asume que la fisura está vacía','El agua apaga el equipo','No importa'],1,'El método supone que la onda rodea la fisura. Con agua (o con armadura atravesándola) la onda la cruza y la profundidad sale subestimada.']
],
ref:['Malhotra y Carino, Handbook on Nondestructive Testing of Concrete','ACI 228.1R, In-Place Methods to Estimate Concrete Strength','ASTM C42, C597 y C805']});
