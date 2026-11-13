/* Módulos nuevos: geología, química de materiales, dibujo y planos, instalaciones eléctricas */
function EXT(id){_modActual=CUR.mods.find(m=>m.id===id);}
MOD('m40','Geología para ingenieros','Mecánica',
'Antes del suelo está la roca, y antes de la obra está la geología del lugar. En el Perú, entre Andes, costa desértica y selva, la geología decide dónde y cómo construir.',
['Plaza Díez, Geología aplicada','González de Vallejo, Ingeniería geológica','Dávila Burga, Diccionario geológico (INGEMMET)','Blyth y de Freitas, Geología para ingenieros'],
'UNI: Geología General y Geología Aplicada (GE-151). PUCP: Geología (2CIV10).');
SUB('geo1',{t:'Minerales y rocas',
lec:`Las rocas se forman de tres maneras:

- **Ígneas:** enfriamiento del magma (granito, andesita, basalto). Muy resistentes si están sanas.
- **Sedimentarias:** capas de sedimentos compactados (arenisca, lutita, caliza). Pueden ser débiles o solubles.
- **Metamórficas:** rocas transformadas por presión y calor (pizarra, cuarcita, mármol). Suelen tener planos de debilidad.

## Propiedades índice
- Peso específico: γ = W/V
- Porosidad: n = V_{v}/V
- Absorción: (W_{sat} − W_{seca})/W_{seca}
- Gravedad específica de una mezcla de minerales: promedio ponderado por volumen

Una roca muy porosa o alterada absorbe agua y pierde resistencia: por eso se ensaya antes de usarla como agregado o como cimentación.`,
key:['γ = [[W|V]]','n = [[V_{v}|V]]','Abs = [[W_{sat} − W_{s}|W_{s}]]','G = Σf_{i}G_{i}'],
err:'Juzgar una roca por su color: el grado de alteración importa más que el tipo.',
x:[['fas','Mismas relaciones de fases'],['agr','Los agregados vienen de rocas'],['rmr','La roca intacta es parte del RMR']],
g:[
r=>{const W=r.i(200,900,5),V=r.i(80,330,5);return{q:`Una muestra de roca pesa ${W} g y ocupa ${V} cm³. Halla γ.`,a:W/V,u:'g/cm³',s:[`γ = ${W}/${V} = ${n(W/V)} g/cm³`]};},
r=>{const Ws=r.i(200,900,5),a=r.i(.2,8,.1);const Wsat=+(Ws*(1+a/100)).toFixed(1);return{q:`Roca seca ${Ws} g y saturada ${Wsat} g. Halla la absorción.`,a:(Wsat-Ws)/Ws*100,u:'%',s:[`= (${Wsat}−${Ws})/${Ws} = ${n((Wsat-Ws)/Ws*100)} %`]};},
r=>{const f=r.i(.2,.7,.05),g1=r.p([2.65,2.7,2.76]),g2=r.p([2.56,2.6,2.9,3.0]);return{q:`Una roca tiene ${n(f*100)} % de un mineral con G=${g1} y el resto de otro con G=${g2} (por volumen). Halla G de la roca.`,a:f*g1+(1-f)*g2,u:'',s:[`G = ${f}·${g1} + ${n(1-f)}·${g2} = ${n(f*g1+(1-f)*g2)}`]};},
r=>{const G=r.p([2.6,2.65,2.7,2.75]),gd=r.i(1.8,2.6,.02);return{q:`Roca con G=${G} y peso unitario seco ${gd} g/cm³. Halla la porosidad.`,a:(1-gd/G)*100,u:'%',s:[`n = 1 − γ_{d}/(G·γ_{w}) = ${n((1-gd/G)*100)} %`]};},
r=>{const G=r.p([2.6,2.65,2.7]),gd=r.i(1.9,2.5,.02);const nn=1-gd/G;const ab=nn/gd*100;return{q:`Roca con G=${G} y γ_{d}=${gd} g/cm³. Si todos sus poros se llenan de agua, halla la absorción máxima.`,a:ab,u:'%',s:[`n = ${n(nn)}`,`Agua por cm³ = n·1 g`,`Absorción = n/γ_{d} = ${n(ab)} %`]};}
]});
SUB('geo2',{t:'Estructuras geológicas',
lec:`Los estratos rara vez están horizontales. Se describen con dos datos:

- **Rumbo:** dirección de una línea horizontal sobre el estrato
- **Buzamiento (δ):** ángulo que forma el estrato con la horizontal, medido perpendicular al rumbo

## Espesor verdadero
Si en un terreno plano el estrato aflora con un ancho w medido perpendicular al rumbo: t = w·sen δ.

## Buzamiento aparente
En un corte que forma un ángulo β con el rumbo, el estrato se ve con una inclinación menor: tan α = tan δ·sen β.

**Fallas y pliegues** cambian bruscamente el tipo de roca. Un talud de carretera cortado a favor del buzamiento puede deslizar por los planos de estratificación.`,
key:['t = w·sen δ','tan α = tan δ·sen β','Profundidad = x·tan δ'],
err:'Medir el ancho del afloramiento en cualquier dirección: debe ser perpendicular al rumbo.',
x:[['tri','Es trigonometría en 3D'],['tal','Un talud a favor del buzamiento es peligroso'],['rmr','La orientación ajusta el RMR']],
g:[
r=>{const w=r.i(5,200,1),d=r.i(10,80,1);return{q:`Estrato con buzamiento ${d}° aflora con ancho ${w} m (perpendicular al rumbo, terreno plano). Halla el espesor verdadero.`,a:w*sind(d),u:'m',s:[`t = ${w}·sen ${d}° = ${n(w*sind(d))} m`]};},
r=>{const x=r.i(10,300,5),d=r.i(5,60,1);return{q:`Un estrato aflora en superficie y buza ${d}°. ¿A qué profundidad estará a ${x} m en la dirección del buzamiento?`,a:x*tand(d),u:'m',s:[`z = ${x}·tan ${d}° = ${n(x*tand(d))} m`]};},
r=>{const d=r.i(15,75,1),b=r.i(10,80,5);return{q:`Buzamiento real ${d}°. En un corte a ${b}° del rumbo, ¿qué buzamiento aparente se ve?`,a:atand(tand(d)*sind(b)),u:'°',s:[`tan α = tan ${d}°·sen ${b}° = ${n(tand(d)*sind(b))}`,`α = ${n(atand(tand(d)*sind(b)))}°`]};},
r=>{const t=r.i(1,30,.5),d=r.i(10,70,1);return{q:`Un manto de ${t} m de espesor buza ${d}°. ¿Qué ancho de afloramiento tendrá en terreno plano?`,a:t/sind(d),u:'m',s:[`w = t/sen δ = ${n(t/sind(d))} m`]};},
r=>{const d=r.i(20,60,1),h=r.i(5,30,1),p=r.i(20,70,1);const ok=d<p;return{q:`Un talud de ${h} m tiene ${p}° y los estratos buzan ${d}° en la misma dirección, con fricción en las juntas φ=${Math.min(d+5,40)}°. Halla FS al deslizamiento plano seco (FS = tan φ/tan δ), si el estrato aflora en la cara.`,a:tand(Math.min(d+5,40))/tand(d),u:'',s:[ok?`δ < ángulo del talud: el estrato aflora y puede deslizar`:`δ ≥ talud: el plano no aflora, el deslizamiento es poco probable`,`FS = tan ${Math.min(d+5,40)}°/tan ${d}° = ${n(tand(Math.min(d+5,40))/tand(d))}`]};}
]});
SUB('geo3',{t:'Erosión y huaicos',
lec:`En los Andes, las lluvias de verano arrastran suelo y rocas. Dos problemas para el ingeniero:

## Erosión de suelos (USLE)
A = R·K·LS·C·P, en t/ha·año:
- R: erosividad de la lluvia
- K: erodabilidad del suelo
- LS: longitud y pendiente de la ladera
- C: cobertura vegetal (1 suelo desnudo, ≈ 0.01 bosque)
- P: prácticas de conservación (terrazas, surcos en contorno)

## Huaicos (flujos de detritos)
Son mezclas de agua, lodo y piedras que bajan por quebradas a gran velocidad. Su caudal puede ser varias veces el del agua sola. Volumen = área afectada × espesor del depósito. Se controlan con diques de retención, canales de descarga y, sobre todo, no construyendo en los conos de deyección.`,
key:['A = R·K·LS·C·P','V = A_{dep}·e','Q_{huaico} = Q_{agua}·f_{b}'],
err:'Ocupar el cauce seco de una quebrada: en El Niño vuelve a correr.',
x:[['rac','La lluvia que genera escorrentía'],['sed','Transporte de sedimentos'],['tal','La erosión desestabiliza laderas']],
g:[
r=>{const R=r.i(100,800,10),K=r.i(.1,.5,.01),LS=r.i(.5,8,.1),C=r.p([1,.5,.2,.1,.05]),P=r.p([1,.8,.6,.5]);return{q:`USLE: R=${R}, K=${K}, LS=${LS}, C=${C}, P=${P}. Halla A.`,a:R*K*LS*C*P,u:'t/ha·año',s:[`A = ${n(R*K*LS*C*P)} t/ha·año`]};},
r=>{const A=r.i(5,200,5),L=r.i(1,50,1);return{q:`Una ladera pierde ${A} t/ha·año. ¿Cuánto suelo pierde en ${L} ha?`,a:A*L,u:'t/año',s:[`= ${A*L} t/año`]};},
r=>{const A=r.i(1000,80000,500),e=r.i(.3,3,.1);return{q:`Un huaico deja un depósito de ${A} m² con ${e} m de espesor medio. Halla el volumen.`,a:A*e,u:'m³',s:[`V = ${n(A*e)} m³`]};},
r=>{const Q=r.i(5,100,5),f=r.p([1.5,2,2.5,3]);return{q:`La quebrada lleva ${Q} m³/s de agua y el factor de volumen por sólidos es ${f}. Halla el caudal del huaico.`,a:Q*f,u:'m³/s',s:[`Q = ${n(Q*f)} m³/s`]};},
r=>{const R=r.i(200,600,10),K=r.i(.2,.4,.01),LS=r.i(2,8,.1),C1=1,C2=r.p([.1,.05]),P2=r.p([.5,.6]),Ah=r.i(5,50,1),g=1.3;const A1=R*K*LS*C1,A2=R*K*LS*C2*P2,dV=(A1-A2)*Ah/g;return{q:`Ladera de ${Ah} ha (R=${R}, K=${K}, LS=${LS}). Pasa de suelo desnudo (C=1, P=1) a reforestada con terrazas (C=${C2}, P=${P2}). ¿Cuántos m³ de suelo se dejan de perder al año? (γ=1.3 t/m³)`,a:dV,u:'m³/año',s:[`Antes: ${n(A1)} t/ha·año; después: ${n(A2)}`,`Ahorro = ${n((A1-A2)*Ah)} t/año = ${n(dV)} m³/año`]};}
]});
SUB('geo4',{t:'Geofísica: refracción sísmica',
lec:`Para conocer el subsuelo sin perforar se usan métodos geofísicos. En **refracción sísmica** se genera un golpe y se mide cuándo llega la onda a geófonos alineados.

- Cerca del golpe llega primero la onda directa por la capa superior, de velocidad V_{1}.
- Más lejos llega primero la onda refractada por la capa inferior, más rápida, V_{2}.
- La distancia donde ambas llegan a la vez es la **distancia de cruce** x_{c}.

## Espesor de la capa superior
z = (x_{c}/2)·√((V_{2} − V_{1})/(V_{2} + V_{1}))

Las velocidades indican el material: suelo suelto 300–800 m/s, suelo denso 800–1500, roca alterada 1500–3000, roca sana más de 3000 m/s. También se usa la **velocidad de onda de corte V_{s30}**, que la E.030 de 2026 emplea para clasificar el suelo.`,
key:['V = [[Δx|Δt]]','z = [[x_{c}|2]]√{[[V_{2}−V_{1}|V_{2}+V_{1}]]}','t_{cruce} = [[x_{c}|V_{1}]]'],
err:'Usar refracción cuando una capa más lenta está debajo de una más rápida: no se detecta.',
x:[['sis2','Mismas ondas que un sismo'],['esp','V_{s30} clasifica el suelo'],['spt','Complementa la perforación']],
g:[
r=>{const dx=r.i(10,60,5),dt=r.i(10,120,1);return{q:`La onda recorre ${dx} m en ${dt} ms. Halla la velocidad.`,a:dx/(dt/1000),u:'m/s',s:[`V = ${dx}/${dt/1000} = ${n(dx/(dt/1000))} m/s`]};},
r=>{const xc=r.i(10,80,1),V1=r.i(300,900,50);return{q:`Distancia de cruce ${xc} m y V₁=${V1} m/s. ¿En qué tiempo llegan ambas ondas?`,a:xc/V1*1000,u:'ms',s:[`t = ${xc}/${V1} = ${n(xc/V1*1000)} ms`]};},
r=>{const xc=r.i(10,80,1),V1=r.i(300,900,50),V2=r.i(1200,4500,100);return{q:`x_{c}=${xc} m, V₁=${V1}, V₂=${V2} m/s. Halla el espesor de la capa superior.`,a:xc/2*sq((V2-V1)/(V2+V1)),u:'m',s:[`z = ${xc/2}·√(${V2-V1}/${V2+V1}) = ${n(xc/2*sq((V2-V1)/(V2+V1)))} m`]};},
r=>{const z=r.i(2,20,.5),V1=r.i(300,900,50),V2=r.i(1500,4500,100);return{q:`Se espera una capa de ${z} m con V₁=${V1} sobre roca de V₂=${V2} m/s. ¿Qué longitud mínima de tendido conviene (al menos 2 veces x_{c})?`,a:2*2*z/sq((V2-V1)/(V2+V1)),u:'m',s:[`x_{c} = 2z/√((V₂−V₁)/(V₂+V₁)) = ${n(2*z/sq((V2-V1)/(V2+V1)))} m`,`Tendido ≥ ${n(4*z/sq((V2-V1)/(V2+V1)))} m`]};},
r=>{const h=[r.i(3,10,1),r.i(5,12,1)];const h3=30-h[0]-h[1];const v=[r.i(150,350,10),r.i(300,600,10),r.i(500,1200,50)];const vs=30/(h[0]/v[0]+h[1]/v[1]+h3/v[2]);return{q:`Perfil: ${h[0]} m con V_{s}=${v[0]}, ${h[1]} m con ${v[1]} y ${h3} m con ${v[2]} m/s. Halla V_{s30} = 30/Σ(h_{i}/V_{si}).`,a:vs,u:'m/s',s:[`Σh/V = ${n(h[0]/v[0]+h[1]/v[1]+h3/v[2])} s`,`V_{s30} = ${n(vs)} m/s`]};}
]});
SUB('geo5',{t:'Agua subterránea y geología',
lec:`El agua en el terreno depende de la geología:

- **Acuíferos:** gravas, arenas y rocas fracturadas que almacenan y transmiten agua.
- **Acuitardos:** limos y arcillas que la transmiten muy lento.
- **Rocas solubles** (calizas, yesos): pueden formar cavidades.

## Rendimiento específico
Volumen de agua que entrega un acuífero libre al bajar su nivel: V = S_{y}·A·Δh. Arena: S_{y} ≈ 0.2; arcilla: ≈ 0.02.

## Velocidad real del agua
v_{real} = K·i/n_{e}, con n_{e} la porosidad efectiva. Sirve para estimar cuánto tarda un contaminante en llegar a un pozo.

Las excavaciones bajo el nivel freático requieren drenaje y bombeo: calcular cuánta agua entra es parte del diseño.`,
key:['V = S_{y}·A·Δh','v_{real} = [[Ki|n_{e}]]','t = [[L|v_{real}]]'],
err:'Usar la velocidad de Darcy para el tiempo de viaje: el agua real va más rápido.',
x:[['agu','Pozos y acuíferos'],['flu','Ley de Darcy'],['efe','Bajar el agua cambia σ′']],
g:[
r=>{const Sy=r.p([.02,.05,.1,.15,.2,.25]),A=r.i(1,500,1),dh=r.i(.1,5,.1);return{q:`Acuífero libre de ${A} ha con S_{y}=${Sy} baja ${dh} m. ¿Qué volumen entrega?`,a:Sy*A*1e4*dh,u:'m³',s:[`V = ${Sy}·${A*1e4}·${dh} = ${n(Sy*A*1e4*dh,6)} m³`]};},
r=>{const K=r.i(1,100,1),i=r.i(.001,.02,.001),ne=r.p([.1,.15,.2,.25,.3]);return{q:`K=${K} m/día, i=${i}, n_{e}=${ne}. Halla la velocidad real.`,a:K*i/ne,u:'m/día',s:[`v = ${K}·${i}/${ne} = ${n(K*i/ne)} m/día`]};},
r=>{const K=r.i(1,100,1),i=r.i(.001,.02,.001),ne=r.p([.1,.2,.3]),L=r.i(50,2000,10);return{q:`Un derrame ocurre a ${L} m de un pozo. K=${K} m/día, i=${i}, n_{e}=${ne}. ¿Cuántos días tarda en llegar?`,a:L/(K*i/ne),u:'días',s:[`v = ${n(K*i/ne)} m/día`,`t = ${n(L/(K*i/ne))} días`]};},
r=>{const Q=r.i(100,5000,50),Sy=r.p([.1,.15,.2]),A=r.i(10,500,10);return{q:`Se bombean ${Q} m³/día sin recarga de un acuífero de ${A} ha con S_{y}=${Sy}. ¿Cuánto baja el nivel en un año?`,a:Q*365/(Sy*A*1e4),u:'m',s:[`Δh = Q·365/(S_{y}A) = ${n(Q*365/(Sy*A*1e4))} m`]};},
r=>{const B=r.i(10,40,1),L=r.i(10,60,1),k=r.p([1e-5,5e-5,1e-4]),H=r.i(2,6,.5),d=r.i(5,20,1);const q=k*H/d*2*(B+L)*H*86400;return{q:`Excavación de ${B}×${L} m que baja ${H} m bajo el freático en arena (k=${k} m/s). Estima el caudal que entra por las paredes con Darcy: Q = k·(H/d)·(perímetro·H), con recorrido d=${d} m.`,a:q,u:'m³/día',s:[`i = ${n(H/d)}`,`Área = ${n(2*(B+L)*H)} m²`,`Q = ${n(q)} m³/día`]};}
]});

MOD('m41','Química y física de materiales','Bases',
'El concreto fragua por una reacción química, el acero se corroe por otra y el agua se trata con química. Este módulo da la base para entender por qué los materiales se comportan como lo hacen.',
['Mehta y Monteiro, Concrete: Microstructure, Properties and Materials','Neville, Tecnología del concreto','Jaramillo Botero, Manual de materiales de construcción','Chang, Química','Callister, Ciencia e ingeniería de materiales'],
'UNI: Química I y II, Ciencia de los Materiales. PUCP: Química 1 y Ciencia de Materiales.');
SUB('qm1',{t:'Hidratación del cemento',
lec:`El cemento no se seca: **reacciona con el agua**. Los silicatos de calcio forman un gel (C-S-H) que pega los agregados, y se libera calor.

- Agua químicamente combinada: ≈ 0.23 g por g de cemento hidratado
- Grado de hidratación α: fracción del cemento que ya reaccionó (aumenta con el curado)

## Modelo de Powers
Relación gel/espacio: X = 0.68α/(0.32α + a/c)

Resistencia a compresión: f_{c} ≈ 234·X³ MPa

Por eso **curar** importa: sin agua, α se detiene y el concreto nunca alcanza su resistencia. Y por eso el exceso de agua (a/c alto) deja poros y baja la resistencia.

**Calor de hidratación:** en vaciados masivos (presas, zapatas grandes) el calor fisura el concreto si no se controla.`,
key:['X = [[0.68α|0.32α + a/c]]','f_{c} ≈ 234X^{3} MPa','Agua_{comb} ≈ 0.23·C·α','Q = C·q_{h}'],
err:'Pensar que el concreto endurece al secarse y dejar de curarlo.',
x:[['mez','Explica la ley de Abrams'],['est','La resistencia varía con el curado'],['pt1','La porosidad controla la durabilidad']],
g:[
r=>{const C=r.i(250,500,10),a=r.i(.5,1,.05);return{q:`${C} kg de cemento con grado de hidratación ${a}. ¿Cuánta agua se combina químicamente?`,a:.23*C*a,u:'kg',s:[`= 0.23·${C}·${a} = ${n(.23*C*a)} kg`]};},
r=>{const a=r.i(.4,1,.05),ac=r.i(.35,.7,.01);return{q:`α=${a}, a/c=${ac}. Halla X de Powers.`,a:.68*a/(.32*a+ac),u:'',s:[`X = 0.68·${a}/(0.32·${a}+${ac}) = ${n(.68*a/(.32*a+ac))}`]};},
r=>{const a=r.i(.5,1,.05),ac=r.i(.35,.7,.01);const X=.68*a/(.32*a+ac);return{q:`α=${a}, a/c=${ac}. Estima f_{c} con Powers.`,a:234*X**3,u:'MPa',s:[`X = ${n(X)}`,`f_{c} = 234·X³ = ${n(234*X**3)} MPa`]};},
r=>{const C=r.i(300,500,10),V=r.i(10,400,10),q=r.i(250,450,10);return{q:`Una zapata de ${V} m³ con ${C} kg/m³ de cemento y calor de hidratación ${q} kJ/kg. Halla el calor total en MJ.`,a:C*V*q/1000,u:'MJ',s:[`Q = ${C}·${V}·${q}/1000 = ${n(C*V*q/1000)} MJ`]};},
r=>{const ac=r.i(.4,.65,.01),a1=r.i(.5,.65,.05),a2=r.i(.75,.95,.05);const f1=234*(.68*a1/(.32*a1+ac))**3,f2=234*(.68*a2/(.32*a2+ac))**3;return{q:`Concreto con a/c=${ac}. Un mal curado deja α=${a1}; un buen curado, α=${a2}. ¿Cuántos MPa se pierden por mal curado?`,a:f2-f1,u:'MPa',s:[`Mal curado: ${n(f1)} MPa`,`Buen curado: ${n(f2)} MPa`,`Pérdida = ${n(f2-f1)} MPa`]};}
]});
SUB('qm2',{t:'Química del agua',
lec:`El ingeniero sanitario mide la calidad del agua con concentraciones:

- **mg/L ≈ ppm** en agua dulce
- Dilución: C_{1}V_{1} = C_{2}V_{2}
- **pH** = −log[H⁺]. 7 es neutro; el concreto se daña con aguas ácidas (pH < 6)
- **Dureza** expresada como CaCO₃: D = Ca·(50/20) + Mg·(50/12.15), en mg/L

## Cloración
Cloro requerido = demanda de cloro + cloro residual deseado. Masa por día = Q·dosis.

Los sulfatos del suelo y del agua atacan al concreto: la E.060 pide cemento tipo V o tipo MS y a/c bajos en esos casos.`,
key:['C_{1}V_{1} = C_{2}V_{2}','pH = −log[H^{+}]','D = 2.5Ca + 4.12Mg','Dosis = demanda + residual'],
err:'Sumar mg/L de calcio y magnesio sin convertir a CaCO₃.',
x:[['pot','Dosificación en plantas'],['pt1','Ataques químicos al concreto'],['mez','Agua de mezcla']],
g:[
r=>{const C1=r.i(1,15,.5),V1=r.i(1,50,1),V2=r.i(60,1000,10);return{q:`Se diluyen ${V1} L de una solución de ${C1} % en agua hasta ${V2} L. Halla la concentración final en %.`,a:C1*V1/V2,u:'%',s:[`C₂ = ${C1}·${V1}/${V2} = ${n(C1*V1/V2)} %`]};},
r=>{const h=r.i(1,13,.5);return{q:`[H⁺] = 10^{−${h}} mol/L. Halla el pH.`,a:h,u:'',s:[`pH = ${h}`]};},
r=>{const Ca=r.i(10,150,1),Mg=r.i(2,60,1);return{q:`Agua con Ca=${Ca} mg/L y Mg=${Mg} mg/L. Halla la dureza como CaCO₃.`,a:Ca*50/20+Mg*50/12.15,u:'mg/L',s:[`D = ${Ca}·2.5 + ${Mg}·4.12 = ${n(Ca*50/20+Mg*50/12.15)} mg/L`]};},
r=>{const dem=r.i(.5,4,.1),res=r.i(.5,1.5,.1),Q=r.i(5,500,5);return{q:`Demanda de cloro ${dem} mg/L y residual deseado ${res} mg/L para Q=${Q} L/s. ¿Cuántos kg de cloro por día?`,a:(dem+res)*Q*86.4/1000,u:'kg/d',s:[`Dosis = ${n(dem+res)} mg/L`,`Masa = ${n((dem+res)*Q*86.4/1000)} kg/d`]};},
r=>{const Q=r.i(5,200,5),dem=r.i(1,3,.1),res=r.i(.5,1.5,.1),p=r.p([65,70]);const kg=(dem+res)*Q*86.4/1000;return{q:`Una planta de ${Q} L/s clora con hipoclorito de calcio al ${p} %. Demanda ${dem} mg/L y residual ${res} mg/L. ¿Cuántos kg de producto por día?`,a:kg/(p/100),u:'kg/d',s:[`Cloro puro = ${n(kg)} kg/d`,`Producto = ${n(kg)}/${p/100} = ${n(kg/(p/100))} kg/d`]};}
]});
SUB('qm3',{t:'Dilatación térmica',
lec:`Todo material cambia de tamaño con la temperatura: ΔL = α·L·ΔT.

- Concreto y acero: α ≈ 10 a 12 × 10⁻⁶ /°C. Por eso trabajan juntos sin separarse.
- Aluminio: 23 × 10⁻⁶; PVC: 50 a 80 × 10⁻⁶ /°C

## Si el elemento no puede moverse
Aparece un esfuerzo: σ = E·α·ΔT. Una losa de concreto restringida que se enfría 20 °C puede fisurarse.

## Juntas
Se dejan juntas de dilatación para que los elementos se muevan. El ancho de junta debe cubrir la variación de longitud más un margen.

En la sierra peruana la variación diaria de temperatura es grande: las juntas en pavimentos y tuberías expuestas son esenciales.`,
key:['ΔL = αLΔT','σ = EαΔT','junta ≥ ΔL'],
err:'Instalar tuberías de PVC expuestas sin juntas de expansión.',
x:[['ter','Esfuerzos térmicos en estructuras'],['pu4','Los apoyos de puentes absorben ΔL'],['pr2','Juntas en pavimentos']],
g:[
r=>{const L=r.i(5,200,1),a=r.p([10,11,12,23,60]),dT=r.i(5,50,1);return{q:`Elemento de ${L} m, α=${a}×10⁻⁶ /°C, ΔT=${dT} °C. Halla ΔL.`,a:a*1e-6*L*dT*1000,u:'mm',s:[`ΔL = ${n(a*1e-6*L*dT*1000)} mm`]};},
r=>{const E=r.p([20000,25000,200000]),a=r.p([10,12]),dT=r.i(5,40,1);return{q:`Elemento restringido con E=${E} MPa, α=${a}×10⁻⁶, ΔT=${dT} °C. Halla σ.`,a:E*a*1e-6*dT,u:'MPa',s:[`σ = ${E}·${a}×10⁻⁶·${dT} = ${n(E*a*1e-6*dT)} MPa`]};},
r=>{const fc=r.p([21,28,35]),dT=r.i(10,40,1);const ft=.33*sq(fc);const s=25000*10e-6*dT;return{q:`Losa restringida de concreto (E=25 000 MPa, α=10×10⁻⁶) se enfría ${dT} °C. Compara σ con la resistencia a tensión ≈ 0.33√f′_{c} (f′_{c}=${fc}). Escribe σ/f_{t}.`,a:s/ft,u:'',s:[`σ = ${n(s)} MPa; f_{t} = ${n(ft)} MPa`,`σ/f_{t} = ${n(s/ft)} ${s>ft?'(se fisura)':'(no se fisura)'}`]};},
r=>{const L=r.i(20,80,1),dT=r.i(20,50,5),m=r.p([5,10]);return{q:`Losa de ${L} m (α=11×10⁻⁶) con ΔT=${dT} °C. Junta = ΔL + ${m} mm de margen. Halla el ancho.`,a:11e-6*L*dT*1000+m,u:'mm',s:[`ΔL = ${n(11e-6*L*dT*1000)} mm`,`Junta = ${n(11e-6*L*dT*1000+m)} mm`]};},
r=>{const L=r.i(50,400,10),dT=r.i(20,45,1),a=60,gap=r.i(10,40,5);const dl=a*1e-6*L*dT*1000;return{q:`Tubería de PVC expuesta de ${L} m (α=60×10⁻⁶) con ΔT=${dT} °C. Cada junta de expansión absorbe ${gap} mm. ¿Cuántas juntas como mínimo?`,a:Math.ceil(dl/gap),u:'juntas',tol:0,s:[`ΔL = ${n(dl)} mm`,`Juntas = ${Math.ceil(dl/gap)}`]};}
]});
SUB('qm4',{t:'Electroquímica y protección catódica',
lec:`La corrosión es una pila: el acero que se oxida (ánodo) entrega electrones. La **ley de Faraday** relaciona la corriente con la masa perdida:

m = I·t·M/(n·F)

- M: masa molar (hierro 55.85 g/mol)
- n: electrones por átomo (2 para Fe → Fe²⁺)
- F = 96 485 C/mol

## Protección catódica
Se convierte la estructura en cátodo con ánodos de sacrificio (zinc, magnesio) o con corriente impresa. La corriente necesaria es I = i·A, con i la densidad de corriente de diseño (mA/m²) y A el área a proteger.

Se usa en tuberías enterradas, muelles, tanques y pilotes en el mar.`,
key:['m = [[ItM|nF]]','I = i·A','Vida = [[m_{ánodo}·u|consumo]]'],
err:'Pintar solo la mitad de una tubería: la zona sin pintura se corroe más rápido.',
x:[['pt1','Corrosión del acero de refuerzo'],['ie1','Corriente y potencia'],['pil','Pilotes en ambientes agresivos']],
g:[
r=>{const I=r.i(.01,2,.01),t=r.i(1,20,1);const m=I*t*365*86400*55.85/(2*96485)/1000;return{q:`Una corriente de corrosión de ${I} A actúa ${t} años. ¿Cuántos kg de hierro se pierden?`,a:m,u:'kg',s:[`t = ${t}·365·86 400 s`,`m = ${n(m)} kg`]};},
r=>{const i=r.i(5,50,1),A=r.i(100,20000,100);return{q:`Densidad de corriente ${i} mA/m² y área ${A} m². Halla la corriente de protección.`,a:i*A/1000,u:'A',s:[`I = ${n(i*A/1000)} A`]};},
r=>{const D=r.p([.2,.3,.5,.8,1]),L=r.i(500,20000,100);return{q:`Tubería de ${D} m de diámetro y ${L} m de largo. Halla el área exterior a proteger.`,a:PI*D*L,u:'m²',s:[`A = πDL = ${n(PI*D*L)} m²`]};},
r=>{const m=r.i(5,100,5),u=r.p([.85,.9]),c=r.p([6.8,8.8,11.2]),I=r.i(.05,2,.05);return{q:`Ánodo de ${m} kg con factor de utilización ${u} y consumo ${c} kg/A·año. Si entrega ${I} A, ¿cuántos años dura?`,a:m*u/(c*I),u:'años',s:[`Vida = ${m}·${u}/(${c}·${I}) = ${n(m*u/(c*I))} años`]};},
r=>{const D=r.p([.3,.5,.8]),L=r.i(1000,10000,500),i=r.i(10,30,1),ef=r.p([.9,.95,.98]),m=r.p([10,20,30]),c=6.8,yrs=r.p([15,20,25]);const I=PI*D*L*(1-ef)*i/1000;const N=Math.ceil(I*c*yrs/(m*.85));return{q:`Tubería D=${D} m, L=${L} m, con recubrimiento de eficiencia ${ef*100} %, i=${i} mA/m². Ánodos de ${m} kg (u=0.85, consumo 6.8 kg/A·año). ¿Cuántos ánodos para ${yrs} años?`,a:N,u:'ánodos',tol:0,s:[`Área desnuda = ${n(PI*D*L*(1-ef))} m²`,`I = ${n(I)} A`,`Masa = ${n(I*c*yrs)} kg → ${N} ánodos`]};}
]});
SUB('qm5',{t:'Ensayos mecánicos de materiales',
lec:`El ensayo de **tracción** del acero da su curva esfuerzo-deformación:

- Fluencia f_{y}: donde empieza a deformarse sin aumentar la carga
- Resistencia última f_{u}: carga máxima
- Alargamiento a la rotura: (L_{f} − L_{0})/L_{0} × 100

La norma ASTM A706 (acero soldable para zonas sísmicas) pide f_{u}/f_{y} ≥ 1.25: el acero debe tener reserva después de fluir.

## Otros ensayos
- Compresión de probetas de concreto: f′_{c} = P/A
- Tracción indirecta (brasileño): f_{ct} = 2P/(πDL)
- Módulo de rotura en vigas: MR = PL/(bd²) para carga en tercios

Conocer los ensayos permite leer un certificado de calidad y saber si un material cumple.`,
key:['σ = [[P|A]]','δ_{%} = [[L_{f}−L_{0}|L_{0}]]×100','f_{ct} = [[2P|πDL]]','MR = [[PL|bd^{2}]]'],
err:'Usar el diámetro nominal y no el área real cuando la varilla tiene corrugaciones.',
x:[['axi','Esfuerzo y deformación'],['ref','Acero de refuerzo'],['cal','Control de calidad']],
g:[
r=>{const P=r.i(5000,40000,100),d=r.p([1.27,1.59,1.91,2.54]);const A=PI*d*d/4;return{q:`Una varilla de ${d} cm fluye a ${P} kg. Halla f_{y}.`,a:P/A,u:'kg/cm²',s:[`A = ${n(A)} cm²`,`f_{y} = ${n(P/A)} kg/cm²`]};},
r=>{const L0=r.p([200,203.2]),Lf=r.i(220,250,.5);return{q:`Probeta de L₀=${L0} mm que rompe con L_{f}=${Lf} mm. Halla el alargamiento.`,a:(Lf-L0)/L0*100,u:'%',s:[`= ${n((Lf-L0)/L0*100)} %`]};},
r=>{const fy=r.i(4200,5200,10),fu=r.i(5800,7500,10);return{q:`Acero con f_{y}=${fy} y f_{u}=${fu} kg/cm². Halla f_{u}/f_{y}.`,a:fu/fy,u:'',s:[`= ${n(fu/fy)} ${fu/fy>=1.25?'(cumple A706)':'(no cumple 1.25)'}`]};},
r=>{const P=r.i(10000,30000,100),D=r.p([15,10]),L=r.p([30,20]);return{q:`Ensayo brasileño: P=${P} kg, D=${D} cm, L=${L} cm. Halla f_{ct}.`,a:2*P/(PI*D*L),u:'kg/cm²',s:[`f_{ct} = 2·${P}/(π·${D}·${L}) = ${n(2*P/(PI*D*L))} kg/cm²`]};},
r=>{const P=r.i(2000,5000,50),L=r.p([45,60]),b=15,d=15;const MR=P*L/(b*d*d);return{q:`Viga de concreto ${b}×${d} cm, luz ${L} cm, carga en tercios que rompe a P=${P} kg. Halla MR y compáralo con 2√f′_{c} de un concreto de 280 (escribe MR).`,a:MR,u:'kg/cm²',s:[`MR = PL/(bd²) = ${n(MR)} kg/cm²`,`2√280 = ${n(2*sq(280))} kg/cm²`]};}
]});

MOD('m42','Dibujo técnico, planos y BIM','Bases',
'El idioma del ingeniero en obra son los planos. Saber leerlos, medir en ellos y cuantificar desde un modelo BIM es tan necesario como calcular.',
['Ching, Diccionario visual de arquitectura','French y Vierck, Dibujo técnico','Neufert, Arte de proyectar en arquitectura','Eastman y otros, BIM Handbook','Normas técnicas de dibujo y Plan BIM Perú (MEF)'],
'UNI: Dibujo de Ingeniería y Geometría Descriptiva. PUCP: Dibujo en Ingeniería y BIM aplicado.');
SUB('dib1',{t:'Escalas',
lec:`Una escala 1:100 significa que 1 cm en el plano es 100 cm en la realidad.

- Longitud real = longitud en el plano × denominador
- Longitud en el plano = longitud real / denominador
- Áreas: el factor se eleva al **cuadrado**

## Escalas habituales
- Ubicación y planos de lotización: 1:500 a 1:5000
- Arquitectura y estructuras de planta: 1:50 o 1:100
- Detalles: 1:5 a 1:25
- Topografía: 1:500 a 1:2000

**Escala gráfica:** una regla dibujada en el plano. Sigue siendo válida si el plano se imprime en otro tamaño, a diferencia de la escala numérica.`,
key:['L_{real} = L_{plano}·E','L_{plano} = [[L_{real}|E]]','A_{real} = A_{plano}·E^{2}'],
err:'Medir directamente un PDF impreso a otro tamaño de papel usando la escala numérica.',
x:[['cn','Planos topográficos'],['met','Los metrados se miden en planos'],['are','Áreas reales']],
g:[
r=>{const l=r.i(1,40,.1),E=r.p([50,75,100,200,500,1000]);return{q:`En un plano a 1:${E} mides ${l} cm. Halla la longitud real en metros.`,a:l*E/100,u:'m',s:[`= ${l}·${E} cm = ${n(l*E/100)} m`]};},
r=>{const L=r.i(1,200,.5),E=r.p([50,100,200,500,1000]);return{q:`Un muro de ${L} m se dibuja a 1:${E}. ¿Cuántos cm mide en el plano?`,a:L*100/E,u:'cm',s:[`= ${L*100}/${E} = ${n(L*100/E)} cm`]};},
r=>{const A=r.i(1,300,1),E=r.p([100,200,500,1000]);return{q:`Un área de ${A} cm² en un plano a 1:${E}. Halla el área real en m².`,a:A*E*E/1e4,u:'m²',s:[`= ${A}·${E}² cm² = ${n(A*E*E/1e4)} m²`]};},
r=>{const L=r.i(10,300,1),p=r.i(10,80,1);return{q:`Un terreno de ${L} m debe caber en ${p} cm de papel. ¿Cuál es el denominador mínimo de escala?`,a:L*100/p,u:'',s:[`E = ${L*100}/${p} = ${n(L*100/p)} → usa la escala normalizada superior`]};},
r=>{const E1=r.p([100,50]),f=r.p([.5,.707,1.414,2]),l=r.i(2,20,.1);const real=l/f*E1/100;return{q:`Un plano a 1:${E1} se imprimió escalado al ${f*100} % por error. Mides ${l} cm. ¿Cuál es la longitud real?`,a:real,u:'m',s:[`Medida en el plano original = ${l}/${f} = ${n(l/f)} cm`,`Real = ${n(real)} m`]};}
]});
SUB('dib2',{t:'Proyecciones y verdadera magnitud',
lec:`Un objeto en 3D se representa con **vistas**: planta (desde arriba), elevación (de frente) y perfil (de costado). Cada vista muestra dos dimensiones.

Una línea inclinada en el espacio no se ve con su largo real en ninguna vista. Su **verdadera magnitud** se obtiene combinando dos proyecciones:

L = √(Δx² + Δy² + Δz²)

- Longitud en planta: L_{h} = √(Δx² + Δy²)
- Ángulo con la horizontal: arctan(Δz/L_{h})

Así se obtiene, por ejemplo, el largo real de un tirante, de una tubería que baja en diagonal o de una arista de techo.`,
key:['L = √{Δx^{2}+Δy^{2}+Δz^{2}}','L_{h} = √{Δx^{2}+Δy^{2}}','θ = arctan[[Δz|L_{h}]]'],
err:'Medir el largo de una tubería en planta y olvidar el tramo que baja.',
x:[['vec3','Vectores en 3D'],['tri','Triángulos rectángulos'],['met','Metrado de tuberías y cables']],
g:[
r=>{const x=r.i(1,30,.5),y=r.i(1,30,.5);return{q:`En planta, una tubería avanza ${x} m en x y ${y} m en y. Halla su longitud en planta.`,a:sq(x*x+y*y),u:'m',s:[`= √(${x}²+${y}²) = ${n(sq(x*x+y*y))} m`]};},
r=>{const x=r.i(1,30,.5),y=r.i(1,30,.5),z=r.i(.5,10,.5);return{q:`Un tirante va de (0,0,0) a (${x}, ${y}, ${z}) m. Halla su verdadera magnitud.`,a:sq(x*x+y*y+z*z),u:'m',s:[`L = √(${x}²+${y}²+${z}²) = ${n(sq(x*x+y*y+z*z))} m`]};},
r=>{const x=r.i(1,30,.5),y=r.i(1,30,.5),z=r.i(.5,10,.5);const Lh=sq(x*x+y*y);return{q:`Una línea avanza ${x} m en x, ${y} m en y y sube ${z} m. Halla su ángulo con la horizontal.`,a:atand(z/Lh),u:'°',s:[`L_{h} = ${n(Lh)} m`,`θ = arctan(${z}/${n(Lh)}) = ${n(atand(z/Lh))}°`]};},
r=>{const L=r.i(5,40,.5),a=r.i(5,30,1);return{q:`Una rampa de ${L} m de largo real sube con ${a}° de inclinación. ¿Cuánto mide en planta?`,a:L*cosd(a),u:'m',s:[`L_{h} = ${L}·cos ${a}° = ${n(L*cosd(a))} m`]};},
r=>{const a=r.i(6,15,.5),b=r.i(4,10,.5),h=r.i(1.5,4,.25);const L=sq((a/2)**2+(b/2)**2+h*h);return{q:`Techo a cuatro aguas sobre una planta de ${a}×${b} m con la cumbrera reducida a un punto central de altura ${h} m. Halla el largo real de una arista (limatesa).`,a:L,u:'m',s:[`Δx = ${a/2}, Δy = ${b/2}, Δz = ${h}`,`L = ${n(L)} m`]};}
]});
SUB('dib3',{t:'Lectura de planos estructurales',
lec:`Un plano estructural dice qué acero va en cada elemento. Aprender a leerlo evita errores caros en obra.

## Notación típica
- 4Ø5/8": 4 varillas de 5/8"
- □Ø3/8": 1@0.05, 5@0.10, r@0.25: el primer estribo a 5 cm, luego 5 a 10 cm y el resto a 25 cm
- Recubrimientos y longitudes de anclaje en las notas generales

## Longitudes de corte
- Varilla con ganchos de 90° en ambos extremos: L + 2·12d_{b}
- Estribo cerrado: perímetro interior + 2 ganchos (por ejemplo, 2 × 10d_{b})
- Número de estribos: sumar los indicados y llenar el resto con el espaciamiento "r"

Las planillas de corte y doblado salen de esta lectura.`,
key:['L = L_{libre} + 2·12d_{b}','L_{estribo} = 2(b−2r) + 2(h−2r) + ganchos','N_{resto} = [[L_{resto}|s]]'],
err:'Contar los estribos de la zona confinada solo en un extremo de la viga.',
x:[['ref','Varillas y pesos'],['met','Metrado de acero'],['anc','Ganchos y anclajes']],
g:[
r=>{const nb=r.i(2,8),d=r.p(['1/2"','5/8"','3/4"','1"']),n2=r.i(1,6);return{q:`Un plano indica ${nb}Ø${d} arriba y ${n2}Ø${d} abajo. ¿Cuántas varillas hay en la sección?`,a:nb+n2,u:'varillas',tol:0,s:[`${nb} + ${n2} = ${nb+n2}`]};},
r=>{const L=r.i(2,10,.05),db=r.p([1.27,1.59,1.91,2.54]);return{q:`Varilla de ${db} cm con ganchos de 90° en ambos extremos y largo recto ${L} m. Halla la longitud de corte (L + 2·12d_{b}).`,a:L+2*12*db/100,u:'m',s:[`= ${L} + 2·12·${db/100} = ${n(L+2*12*db/100)} m`]};},
r=>{const b=r.i(25,40,5),h=r.i(40,80,5),rc=4,g=r.p([7.5,10]);return{q:`Estribo de viga ${b}×${h} cm, recubrimiento 4 cm, dos ganchos de ${g} cm cada uno. Halla su longitud.`,a:(2*(b-8)+2*(h-8)+2*g)/100,u:'m',s:[`Perímetro = 2(${b-8}) + 2(${h-8}) = ${2*(b-8)+2*(h-8)} cm`,`L = ${n((2*(b-8)+2*(h-8)+2*g)/100)} m`]};},
r=>{const L=r.i(3,8,.05),nz=r.p([5,6,8]),s1=.1,sr=r.p([.2,.25]);const conf=.05+nz*s1,rest=L-2*conf,nr=Math.floor(rest/sr+1e-9);const N=2*(1+nz)+Math.max(nr-1,0);return{q:`Viga de luz libre ${L} m con estribos 1@0.05, ${nz}@0.10, r@${sr} desde cada extremo. ¿Cuántos estribos en total? (cuenta los del tramo central sin superponer)`,a:N,u:'estribos',tol:0,s:[`Cada extremo: 1 + ${nz} = ${1+nz} estribos en ${n(conf)} m`,`Tramo central de ${n(rest)} m → ${Math.max(nr-1,0)} estribos a ${sr} m`,`Total = ${N}`]};},
r=>{const nv=r.i(4,20),L=r.i(3,9,.05),db=r.p([[1.59,1.55],[1.91,2.24],[2.54,3.97]]),nb=r.i(4,8),b=r.p([25,30]),h=r.p([50,60]),Ne=r.i(15,35);const Lb=L+2*12*db[0]/100,Le=(2*(b-8)+2*(h-8)+20)/100;const kg=nv*(nb*Lb*db[1]+Ne*Le*.56);return{q:`${nv} vigas iguales: cada una con ${nb} varillas de ${db[0]} cm (${db[1]} kg/m) de ${L} m más ganchos de 12d_{b}, y ${Ne} estribos de 3/8" (0.56 kg/m) para sección ${b}×${h} con ganchos de 10 cm. Halla el peso total de acero.`,a:kg,u:'kg',s:[`Varilla = ${n(Lb)} m; estribo = ${n(Le)} m`,`Por viga = ${n(nb*Lb*db[1]+Ne*Le*.56)} kg`,`Total = ${n(kg)} kg`]};}
]});
SUB('dib4',{t:'Pendientes y cortes en planos',
lec:`En planos de arquitectura e instalaciones la pendiente se indica de varias formas:

- Porcentaje: 2 % = 2 cm por cada metro
- Relación: 1:20 (1 vertical por 20 horizontales) = 5 %
- Ángulo en grados

## Conversiones
- % = (vertical/horizontal) × 100
- θ = arctan(%/100)

## Cortes
Un **corte** es una vista que muestra el interior como si se rebanara el objeto. Las cotas de nivel (NPT: nivel de piso terminado, NFP: nivel de fondo de piso) permiten sacar desniveles y alturas.

Ejemplos: la pendiente de un techo para que escurra la lluvia, de una rampa accesible (máximo 8 a 12 % según la norma A.120) o de un desagüe.`,
key:['% = [[V|H]]·100','1:n = [[100|n]] %','θ = arctan([[%|100]])'],
err:'Confundir 1:20 con 20 %.',
x:[['ver','Pendientes en vías'],['alc','Pendientes de desagüe'],['tri','Tangente']],
g:[
r=>{const nn=r.i(5,100,1);return{q:`Una pendiente 1:${nn}, ¿cuánto es en %?`,a:100/nn,u:'%',s:[`= 100/${nn} = ${n(100/nn)} %`]};},
r=>{const p=r.i(1,60,.5);return{q:`Pendiente de ${p} %. Halla el ángulo.`,a:atand(p/100),u:'°',s:[`θ = arctan(${p/100}) = ${n(atand(p/100))}°`]};},
r=>{const h=r.i(.1,1.5,.05),p=r.p([6,8,10,12]);return{q:`Una rampa debe salvar ${h} m con pendiente máxima ${p} %. ¿Qué largo horizontal necesita?`,a:h/(p/100),u:'m',s:[`L = ${h}/${p/100} = ${n(h/(p/100))} m`]};},
r=>{const n1=r.i(-3,3,.05),n2=r.i(2.5,4,.05);return{q:`NPT del sótano ${n1} m y NPT del primer piso ${n(n1+n2,4)} m. Halla la altura de piso a piso.`,a:n2,u:'m',s:[`= ${n(n1+n2,4)} − (${n1}) = ${n(n2)} m`]};},
r=>{const L=r.i(4,15,.5),p=r.p([2,5,10,15,20,30]),a=r.i(3,10,.5);const h=L*p/100,Lr=sq(L*L+h*h);return{q:`Techo a una agua de ${L} m de luz horizontal con pendiente ${p} % y ${a} m de ancho. Halla el área real de cobertura.`,a:Lr*a,u:'m²',s:[`Desnivel = ${n(h)} m`,`Largo inclinado = ${n(Lr)} m`,`Área = ${n(Lr*a)} m²`]};}
]});
SUB('dib5',{t:'Modelado BIM y cuantificación',
lec:`**BIM** (Building Information Modeling) es un modelo 3D donde cada elemento tiene datos: material, dimensiones, costo, fase. El Perú impulsa su uso en obras públicas con el **Plan BIM Perú**.

## Usos principales
- **Detección de interferencias:** una tubería que choca con una viga se descubre antes de construir
- **Cuantificación (4D/5D):** los metrados salen del modelo
- **Coordinación** entre arquitectura, estructuras e instalaciones

## Regla 1-10-100
Corregir un error cuesta 1 en diseño, 10 en obra y 100 cuando el edificio ya opera. Por eso la coordinación temprana ahorra mucho.

## Cuantificación
Del modelo se obtienen volúmenes y áreas por elemento; se multiplican por precios unitarios para el presupuesto.`,
key:['V = Σ(b·h·L)','Costo_{obra} ≈ 10·Costo_{diseño}','Ahorro = N_{interf}·(C_{obra} − C_{diseño})'],
err:'Creer que BIM es solo un dibujo 3D: su valor está en la información y la coordinación.',
x:[['met','Metrados'],['apu','Presupuesto'],['cpm','Planificación 4D']],
g:[
r=>{const nv=r.i(5,60),b=r.p([.25,.3]),h=r.p([.5,.6,.7]),L=r.i(3,8,.5);return{q:`El modelo tiene ${nv} vigas de ${b}×${h} m y ${L} m. Halla el volumen de concreto.`,a:nv*b*h*L,u:'m³',s:[`= ${nv}·${b}·${h}·${L} = ${n(nv*b*h*L)} m³`]};},
r=>{const c=r.i(100,3000,50);return{q:`Corregir una interferencia en diseño cuesta S/${c}. Según la regla 1-10-100, ¿cuánto costaría en obra?`,a:c*10,u:'S/',s:[`= ${c*10} S/`]};},
r=>{const N=r.i(10,300,5),c=r.i(100,1500,50);return{q:`El modelo detectó ${N} interferencias. Corregir cada una en diseño cuesta S/${c} y en obra 10 veces más. ¿Cuánto se ahorró?`,a:N*c*9,u:'S/',s:[`Ahorro = ${N}·(10−1)·${c} = ${N*c*9} S/`]};},
r=>{const V=r.i(50,800,10),pu=r.i(350,600,10),A=r.i(200,3000,50),pe=r.i(40,80,5);return{q:`Del modelo: ${V} m³ de concreto a S/${pu}/m³ y ${A} m² de encofrado a S/${pe}/m². Halla el costo de esas partidas.`,a:V*pu+A*pe,u:'S/',s:[`= ${V*pu} + ${A*pe} = ${V*pu+A*pe} S/`]};},
r=>{const Vm=r.i(200,1000,10),e=r.i(2,10,.5),pu=r.i(380,520,10);return{q:`Un metrado manual dio ${n(Vm*(1+e/100))} m³ de concreto y el modelo BIM ${Vm} m³. A S/${pu}/m³, ¿cuánto dinero se habría sobrepresupuestado?`,a:Vm*e/100*pu,u:'S/',s:[`Diferencia = ${n(Vm*e/100)} m³`,`= ${n(Vm*e/100*pu)} S/`]};}
]});

MOD('m43','Instalaciones eléctricas en edificaciones','Gestión',
'El ingeniero civil coordina con el electricista en cada obra. Entender cargas, conductores y puesta a tierra evita choques de diseño y riesgos de incendio.',
['Código Nacional de Electricidad – Utilización (Perú)','Norma EM.010 Instalaciones eléctricas interiores (RNE)','Harper, El ABC de las instalaciones eléctricas','Merritt, Manual del ingeniero civil'],
'UNI: Instalaciones Eléctricas en Edificaciones (electivo). PUCP: Instalaciones en Edificaciones.');
SUB('ie1',{t:'Corriente, potencia y energía',
lec:`## Ley de Ohm
V = I·R

## Potencia
- Monofásica: P = V·I·cos φ
- Trifásica: P = √3·V_{L}·I·cos φ

cos φ es el **factor de potencia**: 1 en resistencias (termas), menor en motores (≈ 0.8 a 0.9).

## Energía
E (kWh) = P (kW) × horas. La tarifa se cobra por kWh.

En el Perú las viviendas reciben 220 V monofásico (o trifásico 380/220 V en edificios grandes) a 60 Hz.`,
key:['V = IR','P = VI cos φ','P = √{3}V_{L}I cos φ','E = P·t'],
err:'Usar la fórmula monofásica para un motor trifásico: subestima la corriente.',
x:[['fbo','Las bombas consumen potencia'],['ene','Potencia y energía'],['maq','Costo de operación']],
g:[
r=>{const V=r.p([110,220,380]),R=r.i(5,200,1);return{q:`Una resistencia de ${R} Ω a ${V} V. Halla la corriente.`,a:V/R,u:'A',s:[`I = ${V}/${R} = ${n(V/R)} A`]};},
r=>{const P=r.i(500,6000,100),V=220,c=r.p([1,.9,.85,.8]);return{q:`Equipo monofásico de ${P} W a 220 V con cos φ=${c}. Halla I.`,a:P/(V*c),u:'A',s:[`I = ${P}/(220·${c}) = ${n(P/(V*c))} A`]};},
r=>{const P=r.i(2,100,1),V=r.p([220,380]),c=r.p([.8,.85,.9]);return{q:`Motor trifásico de ${P} kW, ${V} V, cos φ=${c}. Halla I.`,a:P*1000/(sq(3)*V*c),u:'A',s:[`I = ${P*1000}/(√3·${V}·${c}) = ${n(P*1000/(sq(3)*V*c))} A`]};},
r=>{const P=r.i(100,5000,50),h=r.i(1,24,.5),d=r.i(1,31),t=r.i(.5,1,.05);return{q:`Un equipo de ${P} W funciona ${h} h/día durante ${d} días. Tarifa S/${t} por kWh. Halla el costo.`,a:P/1000*h*d*t,u:'S/',s:[`E = ${n(P/1000*h*d)} kWh`,`Costo = S/ ${n(P/1000*h*d*t)}`]};},
r=>{const HP=r.i(1,30,.5),e=r.p([.7,.75,.85]),c=.85,V=380,h=r.i(2,12,1),t=r.i(.5,.9,.05);const P=HP*.746/e;return{q:`Bomba de ${HP} HP (salida) con eficiencia del motor ${e*100} %, trifásica a 380 V, cos φ=0.85. Trabaja ${h} h/día. Halla la corriente y el costo mensual a S/${t}/kWh (30 días). Escribe el costo.`,a:P*h*30*t,u:'S/',s:[`P eléctrica = ${n(P)} kW → I = ${n(P*1000/(sq(3)*V*c))} A`,`Costo = ${n(P*h*30*t)} S/`]};}
]});
SUB('ie2',{t:'Máxima demanda',
lec:`No todos los equipos se usan a la vez. La **máxima demanda** estima la carga real para dimensionar el alimentador y el medidor.

## Vivienda (referencia del Código Nacional de Electricidad – Utilización)
- Carga básica: 2500 W por los primeros 90 m² de área techada, más 1000 W por cada 90 m² adicionales o fracción
- Se suman cargas especiales (terma, cocina eléctrica, secadora) con sus potencias

## Factores de demanda
Se aplican por tramos. Por ejemplo: 100 % a los primeros 2000 W y 35 % al resto hasta 120 000 W. Los tramos y porcentajes exactos se toman de la versión vigente del código.

Corriente de diseño: I = MD/(V·cos φ), y se multiplica por 1.25 para dimensionar conductores y protecciones.`,
key:['CB = 2500 + 1000·⌈[[A − 90|90]]⌉','MD = Σ tramos × factor','I_{d} = 1.25·[[MD|V cos φ]]'],
err:'Sumar todas las potencias instaladas como demanda: sobredimensiona y encarece.',
x:[['ie1','Potencia y corriente'],['isa','Diseño de instalaciones de la edificación'],['par2','El área techada sale de la arquitectura']],
g:[
r=>{const A=r.i(40,400,5);const cb=2500+(A>90?1000*Math.ceil((A-90)/90):0);return{q:`Vivienda de ${A} m² techados. Halla la carga básica.`,a:cb,u:'W',s:[A>90?`2500 + 1000·⌈(${A}−90)/90⌉ = ${cb} W`:`≤ 90 m²: 2500 W`]};},
r=>{const cb=r.i(2500,6500,1000),t=r.p([1500,2000]),c=r.p([0,5000,8000]);return{q:`Carga básica ${cb} W, terma de ${t} W y cocina eléctrica de ${c} W. Halla la carga instalada.`,a:cb+t+c,u:'W',s:[`= ${cb+t+c} W`]};},
r=>{const CI=r.i(3000,20000,100);const MD=Math.min(CI,2000)+Math.max(CI-2000,0)*.35;return{q:`Carga ${CI} W con factores 100 % a los primeros 2000 W y 35 % al resto. Halla la máxima demanda.`,a:MD,u:'W',s:[`= 2000 + 0.35·${CI-2000} = ${n(MD)} W`]};},
r=>{const MD=r.i(2000,15000,100),c=r.p([.9,1]);return{q:`MD=${MD} W monofásica a 220 V, cos φ=${c}. Halla la corriente de diseño (×1.25).`,a:1.25*MD/(220*c),u:'A',s:[`I = ${n(MD/(220*c))} A`,`I_{d} = ${n(1.25*MD/(220*c))} A`]};},
r=>{const nd=r.i(4,30),A=r.i(60,180,5),t=1500,fd=r.p([.5,.6,.7]);const cb=2500+(A>90?1000*Math.ceil((A-90)/90):0),ci=cb+t,md1=Math.min(ci,2000)+Math.max(ci-2000,0)*.35;const MD=nd*md1*fd;return{q:`Edificio de ${nd} departamentos de ${A} m² con terma de 1500 W cada uno. Cada departamento usa 100 % hasta 2000 W y 35 % del resto. Entre departamentos se aplica un factor de simultaneidad de ${fd}. Halla la máxima demanda del edificio (sin áreas comunes).`,a:MD,u:'W',s:[`Por departamento: CB = ${cb}, CI = ${ci}, MD = ${n(md1)} W`,`Edificio = ${nd}·${n(md1)}·${fd} = ${n(MD)} W`]};}
]});
SUB('ie3',{t:'Conductores y caída de tensión',
lec:`Un cable delgado se calienta y pierde tensión. El conductor se elige por dos criterios:

## 1. Capacidad de corriente
El cable debe conducir la corriente de diseño sin sobrecalentarse. Se lee en tablas del fabricante según la sección (mm²), el tipo de aislamiento y la instalación.

## 2. Caída de tensión
- Monofásica: ΔV = 2·I·ρ·L/S
- Trifásica: ΔV = √3·I·ρ·L/S
- ρ del cobre ≈ 0.0175 Ω·mm²/m; L en m; S en mm²

El porcentaje ΔV/V no debe superar el límite del código (del orden de 2.5 % en alimentadores y 4 % en total).

Si la caída no cumple, se aumenta la sección aunque la capacidad sea suficiente.`,
key:['ΔV = [[2Iρ L|S]]','ΔV = [[√{3}IρL|S]]','S = [[2IρL|ΔV_{máx}]]','% = [[ΔV|V]]·100'],
err:'Elegir el cable solo por capacidad en recorridos largos: la caída de tensión gobierna.',
x:[['ie2','La corriente sale de la máxima demanda'],['ie1','Ley de Ohm'],['fpe','Es la misma idea que las pérdidas en tuberías']],
g:[
r=>{const I=r.i(5,80,1),L=r.i(5,100,1),S=r.p([2.5,4,6,10,16,25]);return{q:`Circuito monofásico: I=${I} A, L=${L} m, S=${S} mm², cobre. Halla ΔV.`,a:2*I*.0175*L/S,u:'V',s:[`ΔV = 2·${I}·0.0175·${L}/${S} = ${n(2*I*.0175*L/S)} V`]};},
r=>{const I=r.i(10,150,1),L=r.i(10,200,1),S=r.p([10,16,25,35,50,70]);return{q:`Alimentador trifásico: I=${I} A, L=${L} m, S=${S} mm². Halla ΔV.`,a:sq(3)*I*.0175*L/S,u:'V',s:[`ΔV = √3·${I}·0.0175·${L}/${S} = ${n(sq(3)*I*.0175*L/S)} V`]};},
r=>{const dv=r.i(1,15,.1),V=r.p([220,380]);return{q:`ΔV=${dv} V en un sistema de ${V} V. Halla el porcentaje.`,a:dv/V*100,u:'%',s:[`= ${n(dv/V*100)} %`]};},
r=>{const I=r.i(10,60,1),L=r.i(20,120,1),p=r.p([1.5,2.5,3]);const S=2*I*.0175*L/(220*p/100);return{q:`Monofásico 220 V: I=${I} A, L=${L} m, caída máxima ${p} %. Halla la sección mínima teórica.`,a:S,u:'mm²',s:[`ΔV_{máx} = ${n(220*p/100)} V`,`S = 2Iρ L/ΔV = ${n(S)} mm²`]};},
r=>{const T=[[2.5,24],[4,32],[6,41],[10,57],[16,76],[25,101],[35,125]],I=r.i(10,90,1),L=r.i(20,100,1),p=2.5;const Id=1.25*I;const byCap=T.find(t=>t[1]>=Id)||T[T.length-1];const Sv=2*I*.0175*L/(220*p/100);const byV=T.find(t=>t[0]>=Sv)||T[T.length-1];const S=Math.max(byCap[0],byV[0]);return{q:`Circuito monofásico 220 V con I=${I} A y L=${L} m. Tabla (mm²: A): 2.5:24, 4:32, 6:41, 10:57, 16:76, 25:101, 35:125. Corriente de diseño 1.25I y caída máxima 2.5 %. ¿Qué sección eliges?`,a:S,u:'mm²',tol:0,s:[`Por capacidad (${n(Id)} A): ${byCap[0]} mm²`,`Por caída (S ≥ ${n(Sv)}): ${byV[0]} mm²`,`Se elige ${S} mm²`]};}
]});
SUB('ie4',{t:'Puesta a tierra',
lec:`El **pozo a tierra** lleva a tierra las corrientes de falla y las descargas, para que una persona que toque un equipo dañado no reciba la descarga.

## Resistencia de una varilla vertical (Dwight)
R = [ρ/(2πL)]·[ln(4L/a) − 1]

- ρ: resistividad del terreno (Ω·m): arcilla húmeda 20–100, arena 200–1000, roca más de 1000
- L: largo de la varilla; a: su radio

## Mejoras
- Tratar el terreno con sales o bentonita reduce ρ
- Varillas en paralelo, separadas al menos su longitud: R_{total} ≈ R/n como aproximación

Se busca normalmente menos de 25 Ω, y menos de 5 a 10 Ω para equipos sensibles; el valor exigido depende del uso.`,
key:['R = [[ρ|2πL]](ln[[4L|a]] − 1)','R_{n} ≈ [[R|n]]','ρ_{tratado} = f·ρ'],
err:'Instalar el pozo en relleno seco sin tratamiento: la resistencia queda muy alta.',
x:[['ie1','Ley de Ohm'],['cla','El tipo de suelo define ρ'],['qm2','El tratamiento usa sales']],
g:[
r=>{const rho=r.i(20,1000,10),L=r.p([1.5,2.4,3]),a=.008;const R=rho/(2*PI*L)*(Math.log(4*L/a)-1);return{q:`Varilla de ${L} m y 16 mm de diámetro en terreno de ρ=${rho} Ω·m. Halla R.`,a:R,u:'Ω',s:[`R = ${rho}/(2π·${L})·(ln(${4*L}/0.008) − 1) = ${n(R)} Ω`]};},
r=>{const R=r.i(5,200,1),nn=r.i(2,6);return{q:`Una varilla da ${R} Ω. Con ${nn} varillas iguales bien separadas, ¿cuál es R aproximada?`,a:R/nn,u:'Ω',s:[`≈ ${n(R/nn)} Ω`]};},
r=>{const rho=r.i(100,1000,10),f=r.p([.1,.2,.3,.5]);return{q:`Terreno de ρ=${rho} Ω·m tratado con un factor de reducción ${f}. Halla la nueva resistividad.`,a:rho*f,u:'Ω·m',s:[`= ${n(rho*f)} Ω·m`]};},
r=>{const V=220,R=r.i(1,100,1),Rp=1000;return{q:`Falla a tierra a ${V} V con resistencia de pozo ${R} Ω. Si una persona (1000 Ω) toca el equipo en paralelo con el pozo, ¿qué fracción de la corriente pasa por ella? (divisor de corriente)`,a:R/(R+Rp)*100,u:'%',s:[`Fracción = R_{pozo}/(R_{pozo}+R_{persona}) = ${n(R/(R+Rp)*100)} %`,`Por eso conviene un pozo de baja resistencia`]};},
r=>{const rho=r.i(200,1200,10),L=2.4,a=.008,f=r.p([.2,.3]),obj=r.p([10,15,25]);const R1=rho*f/(2*PI*L)*(Math.log(4*L/a)-1);const nn=Math.ceil(R1/obj);return{q:`Terreno de ρ=${rho} Ω·m, tratado con factor ${f}, varillas de 2.4 m y 16 mm. Para lograr ${obj} Ω, ¿cuántas varillas en paralelo? (R/n)`,a:nn,u:'varillas',tol:0,s:[`Una varilla tratada: ${n(R1)} Ω`,`n = ⌈${n(R1)}/${obj}⌉ = ${nn}`]};}
]});
