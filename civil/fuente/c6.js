/* Geotecnia y agua avanzadas */
MOD('m29','Cimentaciones II','Geotecnia',
'En la ciudad casi nunca puedes poner una zapata centrada: hay linderos, cargas grandes y suelos variables. Aquí ves las soluciones que se usan todos los días.',
['Das, Principios de ingeniería de cimentaciones','Coduto, Foundation Design: Principles and Practices','Calavera, Cálculo de estructuras de cimentación','Fratelli, Suelos, fundaciones y muros','Zeevaert, Interacción suelo-estructura de cimentación','Norma E.050 Suelos y Cimentaciones'],
'UNI: Cimentaciones (EC-831). PUCP: Ingeniería de Cimentaciones (electivo).');
SUB('cz1',{t:'Zapatas con momento',
lec:`Si la columna transmite un momento M además de la carga P, la presión bajo la zapata deja de ser uniforme. La resultante se corre una distancia **e = M/P**.

## Dentro del núcleo central (e ≤ B/6)
Toda la base está comprimida y la presión varía linealmente:

q = (P/A)(1 ± 6e/B)

## Fuera del núcleo (e > B/6)
Una parte de la zapata se despega del suelo. La presión es triangular:

q_{máx} = 2P/[3L(B/2 − e)]

El suelo no puede tirar de la zapata. Por eso se busca mantener e ≤ B/6, sobre todo con cargas permanentes.`,
key:['e = [[M|P]]','q = [[P|BL]](1 ± [[6e|B]])','q_{máx} = [[2P|3L(B/2 − e)]] (e > B/6)'],
err:'Usar la fórmula lineal cuando e > B/6: da una presión negativa que el suelo no puede dar.',
x:[['zap','Extiende la zapata centrada'],['flx','Es σ = P/A ± M/S'],['cap','q_{máx} se compara con q_{a}']],
g:[
r=>{const P=r.i(30,300,10),M=r.i(2,40,1);return{q:`Una zapata recibe P=${P} t y M=${M} t·m. Halla e.`,a:M/P*100,u:'cm',s:[`e = M/P = ${n(M/P*100)} cm`]};},
r=>{const B=r.i(1.5,4,.1),L=r.i(1.5,4,.1),P=r.i(40,300,10);const e=r.i(.02,+(B/6).toFixed(2),.01);return{q:`Zapata B=${B} m (en la dirección del momento) por L=${L} m, P=${P} t, e=${e} m. Halla q_{máx}.`,a:P/(B*L)*(1+6*e/B),u:'t/m²',s:[`P/A = ${n(P/(B*L))} t/m²`,`q_{máx} = ${n(P/(B*L))}(1 + 6·${e}/${B}) = ${n(P/(B*L)*(1+6*e/B))} t/m²`]};},
r=>{const B=r.i(1.5,4,.1),L=r.i(1.5,4,.1),P=r.i(40,300,10);const e=r.i(.02,+(B/6).toFixed(2),.01);return{q:`Zapata B=${B} m, L=${L} m, P=${P} t, e=${e} m. Halla q_{mín}.`,a:P/(B*L)*(1-6*e/B),u:'t/m²',s:[`q_{mín} = (P/A)(1 − 6e/B) = ${n(P/(B*L)*(1-6*e/B))} t/m²`]};},
r=>{const B=r.i(1.5,3.5,.1),L=r.i(1.5,3.5,.1),P=r.i(40,200,10);const e=+(B/6+r.i(.05,B/3-B/6-.05,.01)).toFixed(2);return{q:`Zapata B=${B} m, L=${L} m, P=${P} t, e=${e} m. Halla q_{máx}.`,a:2*P/(3*L*(B/2-e)),u:'t/m²',s:[`B/6 = ${n(B/6)} m < e: fuera del núcleo`,`q_{máx} = 2P/[3L(B/2−e)] = ${n(2*P/(3*L*(B/2-e)))} t/m²`]};},
r=>{const P=r.i(60,250,10),M=r.i(5,30,1),qa=r.p([20,25,30,35,40]);let B=1;for(;B<8;B+=.05){const e=M/P;if(e<=B/6&&P/(B*B)*(1+6*e/B)<=qa)break;}return{q:`Zapata cuadrada con P=${P} t, M=${M} t·m y q_{a}=${qa} t/m². Halla el lado mínimo (redondeado a 5 cm) con e ≤ B/6.`,a:+B.toFixed(2),u:'m',tol:.03,s:[`e = ${n(M/P)} m`,`Prueba B crecientes hasta que q_{máx} ≤ q_{a} y e ≤ B/6`,`B = ${n(B)} m`]};}
]});
SUB('cz2',{t:'Zapatas combinadas',
lec:`Cuando una columna está pegada al lindero, no puedes centrar su zapata. Una solución es unirla con la columna vecina en una sola zapata **combinada**.

## Truco central
Haz que el centro de la zapata coincida con la **resultante** de las cargas. Así la presión es uniforme.

- Ubicación de la resultante desde la columna 1: x̄ = P_{2}·s/(P_{1} + P_{2})
- Si la columna 1 está en el lindero (su eje a c_{1}/2 del borde), el largo es L = 2(c_{1}/2 + x̄)
- Ancho: B = (P_{1} + P_{2})/(q_{a}·L)

Para el diseño estructural se invierte el problema: la zapata es una **viga** cargada hacia arriba por el suelo y apoyada en las columnas.`,
key:['x̄ = [[P_{2}·s|P_{1}+P_{2}]]','L = 2([[c_{1}|2]] + x̄)','B = [[P_{1}+P_{2}|q_{a}L]]','w_{u} = [[P_{u1}+P_{u2}|L]]'],
err:'Ubicar la zapata centrada entre columnas sin considerar que las cargas son distintas.',
x:[['mom','La resultante sale del equilibrio'],['vm','La zapata se diseña como viga'],['zap','Misma presión admisible']],
g:[
r=>{const P1=r.i(40,200,10),P2=r.i(60,300,10),s=r.i(3,7,.25);return{q:`Columnas con P₁=${P1} t y P₂=${P2} t separadas ${s} m. ¿A qué distancia de la columna 1 está la resultante?`,a:P2*s/(P1+P2),u:'m',s:[`x̄ = ${P2}·${s}/${P1+P2} = ${n(P2*s/(P1+P2))} m`]};},
r=>{const P1=r.i(40,200,10),P2=r.i(60,300,10),s=r.i(3,7,.25),c=r.p([.3,.4,.5]);const x=P2*s/(P1+P2);return{q:`Columna 1 en el lindero (${c*100} cm de lado), P₁=${P1} t, P₂=${P2} t, s=${s} m. Halla el largo L para presión uniforme.`,a:2*(c/2+x),u:'m',s:[`x̄ = ${n(x)} m`,`L = 2(${c/2} + ${n(x)}) = ${n(2*(c/2+x))} m`]};},
r=>{const P1=r.i(40,200,10),P2=r.i(60,300,10),s=r.i(3,7,.25),c=r.p([.3,.4,.5]),qa=r.p([15,20,25,30,40]);const L=2*(c/2+P2*s/(P1+P2));return{q:`Con P₁=${P1}, P₂=${P2} t, s=${s} m, c₁=${c} m en lindero y q_{a}=${qa} t/m², halla el ancho B.`,a:(P1+P2)/(qa*L),u:'m',s:[`L = ${n(L)} m`,`B = ${P1+P2}/(${qa}·${n(L)}) = ${n((P1+P2)/(qa*L))} m`]};},
r=>{const P1=r.i(60,250,10),P2=r.i(80,350,10),s=r.i(3,7,.25),c=r.p([.3,.4,.5]);const L=2*(c/2+P2*s/(P1+P2));return{q:`Zapata combinada de L=${n(L)} m con P_{u1}=${P1} t y P_{u2}=${P2} t. Halla la reacción del suelo por metro de largo.`,a:(P1+P2)/L,u:'t/m',s:[`w_{u} = (P_{u1}+P_{u2})/L = ${n((P1+P2)/L)} t/m`]};},
r=>{const P1=r.i(60,250,10),P2=r.i(80,350,10),s=r.i(3.5,7,.25),c=r.p([.3,.4,.5]);const L=2*(c/2+P2*s/(P1+P2)),w=(P1+P2)/L,x0=P1/w,M=P1*(x0-c/2)-w*x0*x0/2;return{q:`Zapata combinada: L=${n(L)} m, columna 1 con eje a ${c/2} m del borde, P_{u1}=${P1} t, P_{u2}=${P2} t, s=${s} m. Halla el momento negativo máximo entre columnas (valor absoluto).`,a:Math.abs(M),u:'t·m',s:[`w_{u} = ${n(w)} t/m`,`V = 0 en x = P_{u1}/w_{u} = ${n(x0)} m desde el borde`,`M = P_{u1}(x − c₁/2) − w_{u}x²/2 = ${n(M)} t·m`]};}
]});
SUB('cz3',{t:'Zapatas conectadas',
lec:`Otra solución para la columna de lindero: una zapata excéntrica unida con una **viga de conexión** a la zapata interior. La viga absorbe el momento que produce la excentricidad y evita que la zapata exterior gire.

## Equilibrio
Tomando momentos respecto a la columna interior:

R_{1} = P_{1}·s/(s − e)

- s: distancia entre ejes de columnas
- e: distancia del eje de la columna exterior al centro de su zapata

La reacción R_{1} es **mayor** que P_{1}, y la zapata interior se descarga en R_{1} − P_{1}. La viga de conexión toma un momento cercano a P_{1}·e.

En el Perú esta solución es muy común en edificios entre medianeras.`,
key:['e = [[B_{1}|2]] − [[c_{1}|2]]','R_{1} = [[P_{1}·s|s − e]]','R_{2} = P_{2} − (R_{1} − P_{1})','M_{viga} ≈ P_{1}·e'],
err:'Dimensionar la zapata exterior con P₁ y no con R₁, que es mayor.',
x:[['mom','Equilibrio de momentos'],['cz2','Alternativa a la zapata combinada'],['fle','La viga de conexión se diseña a flexión']],
g:[
r=>{const B=r.i(1.2,3,.1),c=r.p([.3,.4,.5]);return{q:`Zapata exterior de B=${B} m en la dirección de la viga, columna de ${c*100} cm en el lindero. Halla e.`,a:B/2-c/2,u:'m',s:[`e = ${B/2} − ${c/2} = ${n(B/2-c/2)} m`]};},
r=>{const P=r.i(40,200,10),s=r.i(4,8,.25),e=r.i(.3,1.2,.05);return{q:`P₁=${P} t, s=${s} m, e=${e} m. Halla R₁.`,a:P*s/(s-e),u:'t',s:[`R₁ = ${P}·${s}/(${s}−${e}) = ${n(P*s/(s-e))} t`]};},
r=>{const P=r.i(40,200,10),P2=r.i(100,400,10),s=r.i(4,8,.25),e=r.i(.3,1.2,.05);const R1=P*s/(s-e);return{q:`P₁=${P} t, P₂=${P2} t, s=${s} m, e=${e} m. Halla R₂ (reacción de la zapata interior).`,a:P2-(R1-P),u:'t',s:[`R₁ = ${n(R1)} t`,`R₂ = P₂ − (R₁ − P₁) = ${n(P2-(R1-P))} t`]};},
r=>{const P=r.i(40,200,10),s=r.i(4,8,.25),c=r.p([.3,.4,.5]),qa=r.p([20,25,30,40]),B=r.i(1.2,2.2,.1);const e=B/2-c/2,R1=P*s/(s-e),L=R1/(qa*B);return{q:`Zapata exterior de B=${B} m (dirección de la viga), columna de ${c*100} cm en el lindero, P₁=${P} t, s=${s} m, q_{a}=${qa} t/m². Halla la otra dimensión L.`,a:L,u:'m',s:[`e = ${n(e)} m`,`R₁ = ${n(R1)} t`,`L = R₁/(q_{a}B) = ${n(L)} m`]};},
r=>{const Pu=r.i(40,200,10),e=r.i(.4,1.1,.05),b=r.p([30,40]),fc=210;const Mu=Pu*e;const dmin=sq(2*Mu*1e5/(.9*.85*fc*b));const d=Math.max(r.i(60,100,5),Math.ceil(dmin*1.3/5)*5);const k=.85*fc*b;const As=k/FY*(d-sq(d*d-2*Mu*1e5/(.9*k)));return{q:`Viga de conexión: P_{u1}=${Pu} t, e=${e} m, b=${b} cm, d=${d} cm, f'_{c}=210. Con M_{u} ≈ P_{u1}·e, halla A_{s} superior.`,a:As,u:'cm²',s:[`M_{u} = ${n(Mu)} t·m`,`A_{s} = ${n(As)} cm²`]};}
]});
SUB('cz4',{t:'Plateas y coeficiente de balasto',
lec:`Cuando el suelo es malo o las cargas son grandes, las zapatas ocuparían casi toda la planta. Conviene una **platea**: una losa bajo todo el edificio.

## Modelo de Winkler
El suelo se representa con resortes independientes: q = k_{s}·δ. k_{s} es el **coeficiente de balasto** (t/m³ o kg/cm³) y se obtiene de un ensayo de placa de 30 cm.

Correcciones por tamaño (Terzaghi):
- Arena: k_{s} = k_{1}[(B + 0.3)/(2B)]²
- Arcilla: k_{s} = k_{1}(0.3/B)

## ¿Rígida o flexible?
λ = [k_{s}b/(4EI)]^{1/4}. Si λL < π/4 la cimentación se comporta rígida; si λL > π, flexible.

En programas como SAFE se usa k_{s} como resortes bajo la losa: por eso conviene entender qué representa.`,
key:['q = k_{s}·δ','k_{s} = k_{1}([[B+0.3|2B]])^{2} (arena)','k_{s} = k_{1}[[0.3|B]] (arcilla)','λ = ([[k_{s}b|4EI]])^{1/4}'],
err:'Usar directamente el k del ensayo de placa para una losa de 15 m de ancho.',
x:[['cns','Winkler aproxima el asentamiento'],['l2d','La platea es una losa invertida'],['zap','Reemplaza zapatas aisladas'],['rig','Los resortes entran a la matriz']],
g:[
r=>{const q=r.i(5,30),d=r.i(1,10,.5);return{q:`Ensayo de placa: q=${q} t/m² produjo δ=${d} mm. Halla k₁ en t/m³.`,a:q/(d/1000),u:'t/m³',s:[`k = q/δ = ${q}/${d/1000} = ${n(q/(d/1000))} t/m³`]};},
r=>{const k=r.i(2000,15000,500),B=r.i(1,15,.5);return{q:`Arena con k₁=${k} t/m³ (placa de 30 cm). Halla k_{s} para B=${B} m.`,a:k*((B+.3)/(2*B))**2,u:'t/m³',s:[`k_{s} = ${k}[(${B}+0.3)/(2·${B})]² = ${n(k*((B+.3)/(2*B))**2)} t/m³`]};},
r=>{const k=r.i(2000,10000,500),B=r.i(1,15,.5);return{q:`Arcilla con k₁=${k} t/m³. Halla k_{s} para B=${B} m.`,a:k*.3/B,u:'t/m³',s:[`k_{s} = ${k}·0.3/${B} = ${n(k*.3/B)} t/m³`]};},
r=>{const P=r.i(800,8000,100),A=r.i(150,800,10),k=r.i(500,3000,100);const q=P/A;return{q:`Platea de ${A} m² con carga total ${P} t sobre suelo con k_{s}=${k} t/m³. Halla el asentamiento medio.`,a:q/k*1000,u:'mm',s:[`q = ${n(q)} t/m²`,`δ = q/k_{s} = ${n(q/k*1000)} mm`]};},
r=>{const ks=r.i(500,4000,100),b=r.i(1,3,.5),EI=r.i(20000,300000,10000),L=r.i(4,20,1);const lam=(ks*b/(4*EI))**.25;return{q:`Viga de cimentación de b=${b} m, EI=${EI} t·m², L=${L} m, sobre k_{s}=${ks} t/m³. Halla λL.`,a:lam*L,u:'',s:[`λ = (${ks}·${b}/(4·${EI}))^{1/4} = ${n(lam)} 1/m`,`λL = ${n(lam*L)} ${lam*L<PI/4?'(rígida)':lam*L>PI?'(flexible)':'(intermedia)'}`]};}
]});
SUB('spt',{t:'Exploración y ensayo SPT',
lec:`El diseño de cimentaciones empieza en el **estudio de mecánica de suelos (EMS)**, que la E.050 exige para la mayoría de edificaciones. El ensayo más usado es el **SPT**: un martillo de 63.5 kg cae 76 cm y se cuentan los golpes N para hundir 30 cm el muestreador.

## Correcciones
- Energía: N_{60} = N·E_{r}/60 (E_{r} es la eficiencia del martillo en %)
- Presión de confinamiento: C_{N} = √(P_{a}/σ′_{v}) ≤ 1.7, con P_{a} ≈ 10 t/m²
- N_{1(60)} = C_{N}·N_{60}

## Correlaciones
- Ángulo de fricción en arenas (Hatanaka y Uchida): φ = √(20N_{1(60)}) + 20
- N_{1(60)} también entra en el análisis de licuación

Una correlación no reemplaza un ensayo de laboratorio cuando el proyecto lo requiere.`,
key:['N_{60} = N·[[E_{r}|60]]','C_{N} = √{[[P_{a}|σ′_{v}]]} ≤ 1.7','N_{1(60)} = C_{N}N_{60}','φ = √{20N_{1(60)}} + 20'],
err:'Comparar N de equipos distintos sin corregir la energía.',
x:[['efe','σ′ corrige el ensayo'],['res','Da el ángulo φ'],['liq','Entra en el análisis de licuación'],['cap','φ entra a la capacidad portante']],
g:[
r=>{const N=r.i(4,50),E=r.p([45,50,55,60,70,80]);return{q:`N=${N} golpes con eficiencia ${E} %. Halla N_{60}.`,a:N*E/60,u:'',s:[`N_{60} = ${N}·${E}/60 = ${n(N*E/60)}`]};},
r=>{const s=r.i(2,40,.5);return{q:`σ′_{v}=${s} t/m². Halla C_{N} (máx. 1.7).`,a:Math.min(sq(10/s),1.7),u:'',s:[`√(10/${s}) = ${n(sq(10/s))}`,`C_{N} = ${n(Math.min(sq(10/s),1.7))}`]};},
r=>{const N=r.i(5,40),E=r.p([45,55,60,70]),z=r.i(2,15,.5),g=r.i(1.7,2,.05),w=r.i(0,6,.5);const sv=g*z-(z>w?z-w:0);const N1=Math.min(sq(10/sv),1.7)*N*E/60;return{q:`SPT a ${z} m: N=${N}, eficiencia ${E} %, γ=${g} t/m³, freático a ${w} m. Halla N_{1(60)}.`,a:N1,u:'',s:[`σ′_{v} = ${n(sv)} t/m²`,`C_{N} = ${n(Math.min(sq(10/sv),1.7))}`,`N_{1(60)} = ${n(N1)}`]};},
r=>{const N1=r.i(4,45);return{q:`N_{1(60)}=${N1}. Estima φ con Hatanaka-Uchida.`,a:sq(20*N1)+20,u:'°',s:[`φ = √(20·${N1}) + 20 = ${n(sq(20*N1)+20)}°`]};},
r=>{const N=r.i(8,40),E=r.p([45,55,60]),z=r.i(2,10,.5),g=r.i(1.7,1.9,.05),B=r.i(1.5,3,.5),D=r.i(1,2,.5);const sv=g*z,N1=Math.min(sq(10/sv),1.7)*N*E/60,ph=sq(20*N1)+20;const T=[[25,12.7,9.7],[26,14.2,11.6],[27,15.9,13.7],[28,17.8,16.7],[29,19.9,19.3],[30,22.5,19.7],[31,25.3,25],[32,28.5,28.5],[33,32.2,33.3],[34,36.5,38.7],[35,41.4,42.4],[36,47.2,52],[37,53.8,60],[38,61.5,71],[39,70.6,80],[40,81.3,93.7]];const row=T.reduce((a,b)=>Math.abs(b[0]-ph)<Math.abs(a[0]-ph)?b:a);const qu=g*D*row[1]+.4*g*B*row[2];return{q:`Arena seca: N=${N} a ${z} m (eficiencia ${E} %), γ=${g} t/m³. Zapata cuadrada B=${B} m a D_{f}=${D} m. Estima φ, redondéalo al grado más cercano y halla q_{u} (Terzaghi, c=0).`,a:qu,u:'t/m²',tol:.03,s:[`N_{1(60)} = ${n(N1)} → φ ≈ ${n(ph)}° → ${row[0]}°`,`N_{q} = ${row[1]}, N_{γ} = ${row[2]}`,`q_{u} = γD_{f}N_{q} + 0.4γBN_{γ} = ${n(qu)} t/m²`]};}
]});

MOD('m30','Geotecnia sísmica, rocas y túneles','Geotecnia',
'El suelo cambia durante un sismo, la roca tiene juntas que gobiernan su resistencia y un túnel redistribuye esfuerzos. Son temas clave en un país sísmico y andino como el Perú.',
['Das, Fundamentos de ingeniería geotécnica','Ramírez Oyanguren y Alejano, Mecánica de rocas: fundamentos e ingeniería de taludes','Tamez, Rangel y Olgín, Diseño geotécnico de túneles','Cheung y Ho, Soil Nailing: A Practical Guide','Plaza Díez, Geología aplicada','Kramer, Geotechnical Earthquake Engineering'],
'UNI: Mecánica de Suelos II, Geología Aplicada. PUCP: Ingeniería Geotécnica y Geotecnia Sísmica (posgrado).');
SUB('liq',{t:'Licuación de suelos',
lec:`Una arena suelta y saturada, sacudida por un sismo, tiende a compactarse. El agua no alcanza a salir, la presión de poros sube y el suelo pierde su resistencia: se **licúa**. Pasó en Chimbote (1970), Pisco (2007) y en muchas playas y valles costeros.

## Procedimiento simplificado (Seed e Idriss)
- **Demanda:** CSR = 0.65·(a_{máx}/g)·(σ_{v}/σ′_{v})·r_{d}, con r_{d} ≈ 1 − 0.00765z (z ≤ 9.15 m)
- **Capacidad:** CRR_{7.5} a partir de N_{1(60)} (arenas limpias):
  CRR = 1/(34 − N) + N/135 + 50/(10N + 45)² − 1/200
- Corrección por magnitud: MSF = 10^{2.24}/M^{2.56}
- **FS = CRR·MSF/CSR**. Si FS < 1, se espera licuación.

Soluciones: densificar (vibrocompactación), drenar, reemplazar o usar pilotes.`,
key:['CSR = 0.65[[a_{máx}|g]][[σ_{v}|σ′_{v}]]r_{d}','r_{d} = 1 − 0.00765z','MSF = [[10^{2.24}|M^{2.56}]]','FS = [[CRR·MSF|CSR]]'],
err:'Evaluar licuación sobre el nivel freático. Sin agua no hay licuación.',
x:[['efe','σ′ = σ − u, con u creciendo'],['spt','Usa N_{1(60)}'],['sis2','La magnitud entra en MSF']],
g:[
r=>{const z=r.i(1,9,.5);return{q:`Halla r_{d} a z=${z} m.`,a:1-.00765*z,u:'',s:[`r_{d} = 1 − 0.00765·${z} = ${n(1-.00765*z)}`]};},
r=>{const a=r.i(.2,.5,.05),z=r.i(2,9,.5),g=r.i(1.8,2,.05),w=r.i(0,2,.5);const sv=g*z,svp=sv-(z-w);const csr=.65*a*sv/svp*(1-.00765*z);return{q:`a_{máx}=${a}g, z=${z} m, γ=${g} t/m³, freático a ${w} m. Halla CSR.`,a:csr,u:'',s:[`σ_{v} = ${n(sv)}, σ′_{v} = ${n(svp)} t/m²`,`r_{d} = ${n(1-.00765*z)}`,`CSR = ${n(csr)}`]};},
r=>{const N=r.i(3,29);const c=1/(34-N)+N/135+50/(10*N+45)**2-1/200;return{q:`Arena limpia con N_{1(60)}=${N}. Halla CRR_{7.5}.`,a:c,u:'',s:[`CRR = 1/(34−${N}) + ${N}/135 + 50/(${10*N+45})² − 1/200 = ${n(c)}`]};},
r=>{const M=r.i(6,9,.1);return{q:`Halla MSF para un sismo de M=${M}.`,a:10**2.24/M**2.56,u:'',s:[`MSF = 10^{2.24}/${M}^{2.56} = ${n(10**2.24/M**2.56)}`]};},
r=>{const a=r.i(.25,.5,.05),z=r.i(3,9,.5),g=r.i(1.8,2,.05),w=r.i(0,2,.5),N=r.i(5,25),M=r.p([7.5,8,8.5]);const sv=g*z,svp=sv-(z-w),csr=.65*a*sv/svp*(1-.00765*z),crr=1/(34-N)+N/135+50/(10*N+45)**2-1/200,msf=10**2.24/M**2.56;return{q:`Arena limpia: z=${z} m, N_{1(60)}=${N}, γ=${g} t/m³, freático a ${w} m, a_{máx}=${a}g, M=${M}. Halla FS contra licuación.`,a:crr*msf/csr,u:'',s:[`CSR = ${n(csr)}`,`CRR = ${n(crr)}, MSF = ${n(msf)}`,`FS = ${n(crr*msf/csr)} ${crr*msf/csr<1?'(licúa)':'(no licúa)'}`]};}
]});
SUB('mo',{t:'Empuje de tierras en sismo',
lec:`Durante un sismo, el relleno detrás de un muro también se acelera y empuja más. El método de **Mononobe-Okabe** extiende Coulomb con una aceleración horizontal k_{h}·g.

Una simplificación muy usada (Seed y Whitman) separa el empuje en dos partes:

- Empuje estático: E_{a} = ½K_{a}γH², a H/3 de la base
- Incremento sísmico: ΔE_{ae} ≈ (3/8)·k_{h}·γ·H², aplicado a **0.6H** de la base

El incremento se aplica más arriba, así que el momento volcador crece más que la fuerza. Por eso muchos muros que pasan en condición estática fallan en sismo.

k_{h} suele tomarse como una fracción de la aceleración de diseño (por ejemplo, Z/2).`,
key:['ΔE_{ae} = [[3|8]]k_{h}γH^{2}','brazo = 0.6H','M_{v} = E_{a}[[H|3]] + ΔE_{ae}·0.6H','FS_{sísmico} ≥ 1.1–1.2'],
err:'Aplicar el incremento sísmico a H/3 como el estático.',
x:[['emp','Parte del empuje de Rankine'],['esp','k_{h} viene de la zona sísmica'],['new','Fuerza = masa × aceleración']],
g:[
r=>{const kh=r.i(.1,.3,.025),g=r.i(1.7,2,.05),H=r.i(2,8,.5);return{q:`k_{h}=${kh}, γ=${g} t/m³, H=${H} m. Halla ΔE_{ae}.`,a:3/8*kh*g*H*H,u:'t/m',s:[`ΔE = (3/8)·${kh}·${g}·${H}² = ${n(3/8*kh*g*H*H)} t/m`]};},
r=>{const E=r.i(1,15,.5),H=r.i(3,8,.5);return{q:`ΔE_{ae}=${E} t/m en un muro de H=${H} m. Halla su momento respecto a la base.`,a:E*.6*H,u:'t·m/m',s:[`M = ${E}·0.6·${H} = ${n(E*.6*H)} t·m/m`]};},
r=>{const p=r.i(28,38,1),g=r.i(1.7,2,.05),H=r.i(3,8,.5),kh=r.i(.1,.25,.025);const Ka=tand(45-p/2)**2,E=.5*Ka*g*H*H,dE=3/8*kh*g*H*H;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}, k_{h}=${kh}. Halla el empuje total (estático + sísmico).`,a:E+dE,u:'t/m',s:[`E_{a} = ${n(E)} t/m`,`ΔE = ${n(dE)} t/m`,`Total = ${n(E+dE)} t/m`]};},
r=>{const p=r.i(28,38,1),g=r.i(1.7,2,.05),H=r.i(3,8,.5),kh=r.i(.1,.25,.025);const Ka=tand(45-p/2)**2,E=.5*Ka*g*H*H,dE=3/8*kh*g*H*H,M=E*H/3+dE*.6*H;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}, k_{h}=${kh}. Halla el momento volcador total.`,a:M,u:'t·m/m',s:[`Estático: ${n(E)}·${n(H/3)} = ${n(E*H/3)}`,`Sísmico: ${n(dE)}·${n(.6*H)} = ${n(dE*.6*H)}`,`M = ${n(M)} t·m/m`]};},
r=>{const p=r.i(30,36,1),g=r.i(1.7,1.9,.05),H=r.i(3,6,.5),kh=r.i(.1,.2,.025),W=r.i(15,40,1),x=r.i(1,2.5,.25);const Ka=tand(45-p/2)**2,E=.5*Ka*g*H*H,dE=3/8*kh*g*H*H,Mv=E*H/3+dE*.6*H+kh*W*H/3;return{q:`Muro H=${H} m, φ=${p}°, γ=${g}, k_{h}=${kh}, peso W=${W} t/m con brazo ${x} m. Su inercia k_{h}W actúa a H/3. Halla FS al volteo en sismo.`,a:W*x/Mv,u:'',s:[`M_{v} = E_{a}H/3 + ΔE·0.6H + k_{h}W·H/3 = ${n(Mv)}`,`M_{r} = ${n(W*x)}`,`FS = ${n(W*x/Mv)}`]};}
]});
SUB('sn',{t:'Muros anclados y soil nailing',
lec:`Para excavar sótanos en la ciudad se sostienen las paredes con **muros pantalla anclados** o con **soil nailing** (clavos de acero inyectados en el suelo).

## Presión aparente (Terzaghi y Peck, arenas)
Para estructuras con varios niveles de apoyo, se usa un diagrama rectangular: σ_{a} = 0.65·K_{a}·γ·H.

## Fuerza en un anclaje
T = σ_{a}·s_{h}·s_{v}/cos α, donde s_{h} y s_{v} son los espaciamientos y α la inclinación del anclaje.

## Resistencia al arranque
Q = π·D·L_{b}·q_{s}, con D el diámetro del bulbo, L_{b} su longitud y q_{s} la adherencia suelo-lechada. Se aplica un FS de 2.

Los anclajes se **ensayan** en obra: se cargan por encima de su carga de diseño antes de bloquearlos.`,
key:['σ_{a} = 0.65K_{a}γH','T = [[σ_{a}s_{h}s_{v}|cos α]]','Q = πDL_{b}q_{s}','L_{b} = [[FS·T|πDq_{s}]]'],
err:'Ubicar el bulbo dentro de la cuña activa. Debe estar detrás de la superficie de falla.',
x:[['emp','K_{a} de Rankine'],['fri','La adherencia es fricción'],['tal','Estabiliza un corte vertical']],
g:[
r=>{const p=r.i(28,38,1),g=r.i(1.7,2,.05),H=r.i(4,15,.5);const Ka=tand(45-p/2)**2;return{q:`Excavación de H=${H} m en arena con φ=${p}°, γ=${g}. Halla σ_{a} aparente.`,a:.65*Ka*g*H,u:'t/m²',s:[`K_{a} = ${n(Ka)}`,`σ_{a} = 0.65·${n(Ka)}·${g}·${H} = ${n(.65*Ka*g*H)} t/m²`]};},
r=>{const s=r.i(2,8,.25),sh=r.i(1.5,3,.25),sv=r.i(1.5,3,.25),al=r.p([10,15,20,25]);return{q:`σ_{a}=${s} t/m², s_{h}=${sh} m, s_{v}=${sv} m, anclaje a ${al}°. Halla T.`,a:s*sh*sv/cosd(al),u:'t',s:[`T = ${s}·${sh}·${sv}/cos ${al}° = ${n(s*sh*sv/cosd(al))} t`]};},
r=>{const D=r.p([.1,.12,.15,.2]),L=r.i(3,12,.5),q=r.i(5,25,1);return{q:`Bulbo de D=${D} m, L_{b}=${L} m, q_{s}=${q} t/m². Halla Q.`,a:PI*D*L*q,u:'t',s:[`Q = π·${D}·${L}·${q} = ${n(PI*D*L*q)} t`]};},
r=>{const T=r.i(10,60,1),D=r.p([.1,.12,.15]),q=r.i(5,25,1);return{q:`Un anclaje lleva T=${T} t. Con D=${D} m, q_{s}=${q} t/m² y FS=2, halla L_{b}.`,a:2*T/(PI*D*q),u:'m',s:[`L_{b} = 2·${T}/(π·${D}·${q}) = ${n(2*T/(PI*D*q))} m`]};},
r=>{const p=r.i(28,36,1),g=r.i(1.8,2,.05),H=r.i(6,15,.5),sh=r.i(2,3,.25),sv=r.i(2,3,.25),al=r.p([15,20]),D=r.p([.12,.15]),q=r.i(8,20,1);const Ka=tand(45-p/2)**2,sa=.65*Ka*g*H,T=sa*sh*sv/cosd(al),L=2*T/(PI*D*q);return{q:`Sótano de H=${H} m en arena (φ=${p}°, γ=${g}). Anclajes cada ${sh} m × ${sv} m, inclinados ${al}°, bulbo D=${D} m, q_{s}=${q} t/m², FS=2. Halla L_{b}.`,a:L,u:'m',s:[`σ_{a} = ${n(sa)} t/m²`,`T = ${n(T)} t`,`L_{b} = ${n(L)} m`]};}
]});
SUB('rmr',{t:'Clasificación de macizos rocosos',
lec:`La roca intacta suele ser muy resistente. Lo que decide el comportamiento de un macizo son sus **discontinuidades**: juntas, fallas y estratos.

## RQD
Porcentaje de la perforación formado por trozos de 10 cm o más: RQD = Σ(trozos ≥ 10 cm)/longitud × 100.

## RMR (Bieniawski)
Suma de puntajes: resistencia, RQD, espaciamiento, condición de juntas, agua y un ajuste por orientación. Va de 0 a 100: I muy buena (81–100), II buena, III regular (41–60), IV mala, V muy mala (≤ 20).

## Q (Barton)
Q = (RQD/J_{n})·(J_{r}/J_{a})·(J_{w}/SRF)

Relación aproximada: RMR ≈ 9·ln Q + 44.

En el Perú estos índices se usan a diario en minería, carreteras de sierra y túneles hidroeléctricos.`,
key:['RQD = [[Σ trozos ≥ 10 cm|L]]×100','RMR = Σ puntajes','Q = [[RQD|J_{n}]]·[[J_{r}|J_{a}]]·[[J_{w}|SRF]]','RMR ≈ 9 ln Q + 44'],
err:'Medir los trozos de 10 cm por sus extremos en vez de por el eje del testigo.',
x:[['res','La resistencia la gobiernan las juntas'],['tal','Los taludes en roca fallan por juntas'],['tun','El túnel se sostiene según Q']],
g:[
r=>{const L=r.i(100,300,10),t=[r.i(10,40),r.i(10,40),r.i(10,40),r.i(10,40)];const s=t.reduce((a,b)=>a+b);const Lt=Math.max(L,s+20);return{q:`Una corrida de ${Lt} cm tiene trozos ≥ 10 cm de ${t.join(', ')} cm. Halla RQD.`,a:s/Lt*100,u:'%',s:[`Σ = ${s} cm`,`RQD = ${n(s/Lt*100)} %`]};},
r=>{const p=[r.p([2,4,7,12,15]),r.p([3,8,13,17,20]),r.p([5,8,10,15,20]),r.p([0,10,20,25,30]),r.p([0,4,7,10,15])],aj=r.p([0,-2,-5,-10]);const s=p.reduce((a,b)=>a+b)+aj;return{q:`Puntajes RMR: resistencia ${p[0]}, RQD ${p[1]}, espaciamiento ${p[2]}, juntas ${p[3]}, agua ${p[4]}, ajuste ${aj}. Halla RMR.`,a:s,u:'',s:[`RMR = ${s} → clase ${s>80?'I':s>60?'II':s>40?'III':s>20?'IV':'V'}`]};},
r=>{const R=r.i(25,100,5),Jn=r.p([2,3,4,6,9,12]),Jr=r.p([1,1.5,2,3]),Ja=r.p([.75,1,2,3,4]),Jw=r.p([1,.66,.5]),S=r.p([1,2.5,5]);const Q=R/Jn*Jr/Ja*Jw/S;return{q:`RQD=${R}, J_{n}=${Jn}, J_{r}=${Jr}, J_{a}=${Ja}, J_{w}=${Jw}, SRF=${S}. Halla Q.`,a:Q,u:'',s:[`Q = (${R}/${Jn})(${Jr}/${Ja})(${Jw}/${S}) = ${n(Q)}`]};},
r=>{const Q=r.i(.1,40,.1);return{q:`Q=${Q}. Estima RMR.`,a:9*Math.log(Q)+44,u:'',s:[`RMR = 9 ln ${Q} + 44 = ${n(9*Math.log(Q)+44)}`]};},
r=>{const R=r.i(40,95,5),Jn=r.p([4,6,9]),Jr=r.p([1.5,2,3]),Ja=r.p([1,2]),Jw=r.p([1,.66]),S=r.p([1,2.5]);const Q=R/Jn*Jr/Ja*Jw/S,RMR=9*Math.log(Q)+44;return{q:`RQD=${R}, J_{n}=${Jn}, J_{r}=${Jr}, J_{a}=${Ja}, J_{w}=${Jw}, SRF=${S}. Halla Q y luego RMR estimado.`,a:RMR,u:'',s:[`Q = ${n(Q)}`,`RMR ≈ ${n(RMR)} → clase ${RMR>80?'I':RMR>60?'II':RMR>40?'III':RMR>20?'IV':'V'}`]};}
]});
SUB('tun',{t:'Túneles',
lec:`Al excavar un túnel, los esfuerzos que pasaban por el hueco se desvían a su alrededor y se concentran en el borde.

## Túnel circular en medio elástico (Kirsch)
Con esfuerzo vertical σ_{v} = γz y horizontal Kσ_{v}:
- En la clave (techo): σ_{θ} = (3K − 1)σ_{v}
- En los hastiales (paredes): σ_{θ} = (3 − K)σ_{v}
- Con K = 1, el borde soporta el doble: 2σ_{v}

## Sostenimiento según Q (Barton)
Presión de soporte del techo: P ≈ (2/J_{r})·Q^{−1/3} kg/cm².

## Carga de roca (Terzaghi)
H_{p} = factor·(B + H_{t}); la carga sobre el arco es γ·H_{p}.

El **Nuevo Método Austriaco** aprovecha que la roca se sostiene a sí misma si se colocan pronto pernos y shotcrete.`,
key:['σ_{θ,clave} = (3K − 1)σ_{v}','σ_{θ,hastial} = (3 − K)σ_{v}','P = [[2|J_{r}]]Q^{−1/3} kg/cm^{2}','q = γ·factor·(B + H_{t})'],
err:'Pensar que el esfuerzo en el borde del túnel es igual al de la roca virgen.',
x:[['rmr','Q y RMR definen el soporte'],['moh','Concentración de esfuerzos'],['efe','σ_{v} = γz']],
g:[
r=>{const g=r.i(2.5,2.8,.05),z=r.i(50,800,10);return{q:`Roca con γ=${g} t/m³ a ${z} m de profundidad. Halla σ_{v} en kg/cm².`,a:g*z/10,u:'kg/cm²',s:[`σ_{v} = ${g}·${z} = ${n(g*z)} t/m² = ${n(g*z/10)} kg/cm²`]};},
r=>{const s=r.i(20,200,5),K=r.i(.3,2,.1);return{q:`σ_{v}=${s} kg/cm² y K=${K}. Halla σ_{θ} en los hastiales.`,a:(3-K)*s,u:'kg/cm²',s:[`σ_{θ} = (3 − ${K})·${s} = ${n((3-K)*s)} kg/cm²`]};},
r=>{const s=r.i(20,200,5),K=r.i(.2,2,.1);return{q:`σ_{v}=${s} kg/cm² y K=${K}. Halla σ_{θ} en la clave (negativo = tensión).`,a:(3*K-1)*s,u:'kg/cm²',s:[`σ_{θ} = (3·${K} − 1)·${s} = ${n((3*K-1)*s)} kg/cm²`]};},
r=>{const Q=r.i(.1,30,.1),Jr=r.p([1,1.5,2,3]);return{q:`Q=${Q}, J_{r}=${Jr}. Halla la presión de soporte del techo.`,a:2/Jr*Q**(-1/3),u:'kg/cm²',s:[`P = (2/${Jr})·${Q}^{−1/3} = ${n(2/Jr*Q**(-1/3))} kg/cm²`]};},
r=>{const B=r.i(3,12,.5),H=r.i(3,10,.5),f=r.p([.25,.35,.5,1,1.1]),g=r.i(2.5,2.7,.05),sp=r.i(1,2,.25);const q=g*f*(B+H);return{q:`Túnel de B=${B} m y H_{t}=${H} m en roca (factor de Terzaghi ${f}, γ=${g} t/m³), con cerchas cada ${sp} m. Halla la carga total sobre cada cercha (carga de roca × B × separación).`,a:q*B*sp,u:'t',s:[`H_{p} = ${f}(${B}+${H}) = ${n(f*(B+H))} m`,`q = γH_{p} = ${n(q)} t/m²`,`Carga = q·B·s = ${n(q*B*sp)} t por cercha`]};}
]});

MOD('m31','Obras hidráulicas y presas','Agua',
'Riego, hidroenergía y agua potable empiezan en una bocatoma o una presa. El Perú depende de ellas para su agricultura costera y sus ciudades.',
['Arreguín Cortés, Obras hidráulicas','Villón Béjar, Diseño de estructuras hidráulicas','Materón Muñoz, Obras hidráulicas rurales','Marsal y Resendiz, Presas de tierra y enrocamiento','Flores Berrones, Geotecnia en ingeniería de presas','Chereque, Mecánica de fluidos I y II'],
'UNI: Obras Hidráulicas (HH-433), Irrigación. PUCP: Obras Hidráulicas (electivo).');
SUB('boc',{t:'Bocatomas',
lec:`Una **bocatoma** capta agua de un río para un canal. Sus partes principales:

- **Barraje:** muro transversal que eleva el nivel del río. Funciona como vertedero: Q = C·L·H^{3/2}, con C ≈ 2.0–2.2 para perfiles tipo Creager
- **Ventanas de captación:** orificios por donde entra el agua: Q = C_{d}·A·√(2gh)
- **Poza disipadora:** al pie del barraje para controlar el resalto
- **Canal de limpia y compuertas:** para retirar sedimentos

## Diseño hidráulico básico
Con el caudal de avenida se obtiene la carga H sobre el barraje. Con el caudal de captación, el área de ventanas. El fondo del canal se protege del resalto con una poza de longitud ≈ 6(y₂ − y₁).`,
key:['Q = C·L·H^{3/2}','H = ([[Q|CL]])^{2/3}','Q_{c} = C_{d}A√{2gh}','L_{poza} ≈ 6(y_{2}−y_{1})'],
err:'Diseñar la captación con el caudal medio: en estiaje el nivel baja y la ventana queda seca.',
x:[['can2','El barraje es un vertedero'],['sal','La poza controla el resalto'],['rac','La avenida sale de la hidrología']],
g:[
r=>{const Q=r.i(20,600,10),C=r.p([2,2.1,2.2]),L=r.i(15,80,5);return{q:`Avenida de ${Q} m³/s sobre un barraje de L=${L} m con C=${C}. Halla H.`,a:(Q/(C*L))**(2/3),u:'m',s:[`H = (${Q}/(${C}·${L}))^{2/3} = ${n((Q/(C*L))**(2/3))} m`]};},
r=>{const C=r.p([2,2.1,2.2]),L=r.i(10,60,5),H=r.i(.5,3,.1);return{q:`Barraje L=${L} m, C=${C}, H=${H} m. Halla Q.`,a:C*L*H**1.5,u:'m³/s',s:[`Q = ${n(C*L*H**1.5)} m³/s`]};},
r=>{const Q=r.i(.5,8,.25),h=r.i(.3,1.5,.1),Cd=.6;return{q:`Se captan ${Q} m³/s con carga h=${h} m sobre las ventanas (C_{d}=0.6). Halla el área total de ventanas.`,a:Q/(Cd*sq(2*G*h)),u:'m²',s:[`A = Q/(C_{d}√(2gh)) = ${n(Q/(Cd*sq(2*G*h)))} m²`]};},
r=>{const Q=r.i(.5,8,.25),h=r.i(.3,1.5,.1),b=r.i(1,2.5,.25),a=r.i(.4,1,.1);const A=Q/(.6*sq(2*G*h));return{q:`Captar ${Q} m³/s con h=${h} m (C_{d}=0.6) usando ventanas de ${b}×${a} m. ¿Cuántas ventanas? (redondea arriba)`,a:Math.ceil(A/(b*a)),u:'ventanas',tol:0,s:[`A = ${n(A)} m²`,`${n(A/(b*a))} → ${Math.ceil(A/(b*a))} ventanas`]};},
r=>{const q=r.i(2,12,.5),P=r.i(1.5,4,.25);const H=(q/2.1)**(2/3),E0=P+H;let y1=.05;for(let i=0;i<100;i++)y1=q/sq(2*G*(E0-y1));const F=q/y1/sq(G*y1),y2=y1/2*(sq(1+8*F*F)-1);return{q:`Barraje de P=${P} m de alto con q=${q} m²/s por metro (C=2.1). Sin pérdidas, halla y₂ al pie (resalto en la poza).`,a:y2,u:'m',s:[`H = (q/2.1)^{2/3} = ${n(H)} m; E₀ ≈ P + H = ${n(E0)} m`,`y₁ por iteración de q = y₁√(2g(E₀ − y₁)): ${n(y1)} m`,`Fr₁ = ${n(F)} → y₂ = ${n(y2)} m`]};}
]});
SUB('des',{t:'Desarenadores',
lec:`El agua de los ríos andinos lleva arena que desgasta turbinas y llena canales. Un **desarenador** es un tanque donde el agua se frena para que la arena caiga.

## Velocidad de caída (ley de Stokes, partículas finas)
v_{s} = g(S_{s} − 1)d²/(18ν), con ν ≈ 1.01×10⁻⁶ m²/s a 20 °C y S_{s} ≈ 2.65.

## Dimensionamiento
- Velocidad horizontal baja: v_{h} ≈ 0.2–0.5 m/s
- Ancho: B = Q/(h·v_{h})
- Longitud teórica: L = h·v_{h}/v_{s}, multiplicada por un factor de seguridad (1.2–1.5)

La partícula debe tocar el fondo antes de salir del tanque: el tiempo de caída h/v_{s} debe ser menor que el tiempo de paso L/v_{h}.`,
key:['v_{s} = [[g(S_{s}−1)d^{2}|18ν]]','B = [[Q|h·v_{h}]]','L = K[[h·v_{h}|v_{s}]]','t_{caída} = [[h|v_{s}]]'],
err:'Usar Stokes para arenas gruesas: para d mayores a 0.1 mm sobreestima la velocidad.',
x:[['pot','Mismo principio que un sedimentador'],['boc','Va después de la bocatoma'],['fbe','Continuidad Q = AV']],
g:[
r=>{const d=r.i(.02,.1,.005);const v=G*1.65*(d/1000)**2/(18*1.01e-6);return{q:`Partícula de d=${d} mm (S_{s}=2.65, ν=1.01×10⁻⁶). Halla v_{s}.`,a:v*1000,u:'mm/s',s:[`v_{s} = 9.81·1.65·(${d/1000})²/(18·1.01×10⁻⁶) = ${n(v*1000)} mm/s`]};},
r=>{const Q=r.i(.5,10,.25),h=r.i(1,3,.25),v=r.p([.2,.25,.3,.4]);return{q:`Q=${Q} m³/s, h=${h} m, v_{h}=${v} m/s. Halla B.`,a:Q/(h*v),u:'m',s:[`B = ${Q}/(${h}·${v}) = ${n(Q/(h*v))} m`]};},
r=>{const h=r.i(1,3,.25),v=r.p([.2,.25,.3]),vs=r.i(2,20,.5);return{q:`h=${h} m, v_{h}=${v} m/s, v_{s}=${vs} mm/s. Halla L teórica.`,a:h*v/(vs/1000),u:'m',s:[`L = h·v_{h}/v_{s} = ${n(h*v/(vs/1000))} m`]};},
r=>{const h=r.i(1,3,.25),vs=r.i(2,20,.5);return{q:`h=${h} m y v_{s}=${vs} mm/s. ¿Cuánto tarda la partícula en llegar al fondo?`,a:h/(vs/1000),u:'s',s:[`t = ${n(h/(vs/1000))} s`]};},
r=>{const Q=r.i(1,8,.5),h=r.i(1.5,3,.25),v=r.p([.2,.25,.3]),d=r.i(.05,.1,.01),K=r.p([1.2,1.3,1.5]);const vs=G*1.65*(d/1000)**2/(18*1.01e-6),B=Q/(h*v),L=K*h*v/vs;return{q:`Desarenador para Q=${Q} m³/s, h=${h} m, v_{h}=${v} m/s, retener d=${d} mm, factor ${K}. Halla L.`,a:L,u:'m',s:[`v_{s} = ${n(vs*1000)} mm/s`,`B = ${n(B)} m`,`L = K·h·v_{h}/v_{s} = ${n(L)} m`]};}
]});
SUB('pgr',{t:'Presas de gravedad',
lec:`Una presa de gravedad resiste el empuje del agua con su propio peso. Sobre una sección de 1 m de ancho actúan:

- **Peso propio** W = γ_{c}·Área (concreto ≈ 2.4 t/m³)
- **Empuje del agua** E = ½γ_{w}H², a H/3 de la base
- **Subpresión** bajo la base: sin drenes, triangular desde γ_{w}H en el talón hasta 0 en el pie: U = ½γ_{w}HB, aplicada a B/3 del talón

## Verificaciones
- Deslizamiento: FS = μ(W − U)/E ≥ 1.5
- Volteo respecto al pie: FS = M_{resistente}/M_{volcador} ≥ 1.5
- La resultante debe caer en el tercio central de la base

Los drenes en la base reducen mucho la subpresión: por eso casi todas las presas los tienen.`,
key:['E = ½γ_{w}H^{2}','U = ½γ_{w}HB','FS_{d} = [[μ(W−U)|E]]','FS_{v} = [[M_{r}|M_{v}]]'],
err:'Olvidar la subpresión. Puede reducir el FS al deslizamiento a la mitad.',
x:[['fhi','Empuje hidrostático'],['fri','Fricción en la base'],['emp','Mismas verificaciones que un muro']],
g:[
r=>{const H=r.i(5,60,1);return{q:`Presa con H=${H} m de agua. Halla el empuje por metro.`,a:H*H/2,u:'t/m',s:[`E = ½·1·${H}² = ${n(H*H/2)} t/m`]};},
r=>{const H=r.i(5,40,1),B=r.i(4,35,1);return{q:`H=${H} m, base B=${B} m, sin drenes. Halla la subpresión total.`,a:H*B/2,u:'t/m',s:[`U = ½·${H}·${B} = ${n(H*B/2)} t/m`]};},
r=>{const H=r.i(5,30,1);const B=+(H*r.i(.7,.85,.05)).toFixed(1);const W=2.4*B*H/2;return{q:`Sección triangular de altura ${H} m y base ${B} m de concreto (2.4 t/m³). Halla W.`,a:W,u:'t/m',s:[`W = 2.4·½·${B}·${H} = ${n(W)} t/m`]};},
r=>{const H=r.i(8,30,1),mu=r.p([.6,.7,.75]);const B=+(H*r.i(.7,.9,.05)).toFixed(1);const W=2.4*B*H/2,U=H*B/2,E=H*H/2;return{q:`Presa triangular H=${H} m, B=${B} m (paramento aguas arriba vertical), agua a ${H} m, μ=${mu}, sin drenes. Halla FS al deslizamiento.`,a:mu*(W-U)/E,u:'',s:[`W = ${n(W)}, U = ${n(U)}, E = ${n(E)} t/m`,`FS = μ(W−U)/E = ${n(mu*(W-U)/E)}`]};},
r=>{const H=r.i(8,30,1);const B=+(H*r.i(.7,.9,.05)).toFixed(1);const W=2.4*B*H/2,U=H*B/2,E=H*H/2;const Mr=W*(2*B/3),Mv=E*H/3+U*(2*B/3);return{q:`Presa triangular H=${H} m, B=${B} m, paramento aguas arriba vertical, sin drenes. Halla FS al volteo respecto al pie.`,a:Mr/Mv,u:'',s:[`W actúa a B/3 del talón → brazo al pie 2B/3 = ${n(2*B/3)} m`,`U actúa a B/3 del talón → brazo ${n(2*B/3)} m`,`M_{r} = ${n(Mr)}; M_{v} = E·H/3 + U·2B/3 = ${n(Mv)}`,`FS = ${n(Mr/Mv)}`]};}
]});
SUB('pti',{t:'Presas de tierra',
lec:`Las presas de tierra y enrocamiento son las más comunes en el Perú porque usan materiales del lugar. Su enemigo es el **agua que se filtra** por el cuerpo y la cimentación.

## Filtración (Dupuit)
Por metro de ancho: q = k(h_{1}² − h_{2}²)/(2L), con h_{1} y h_{2} los niveles de agua a ambos lados y L la distancia de filtración.

## Sección
- Corona de ancho c, taludes z_{1}:1 aguas arriba y z_{2}:1 aguas abajo
- Área de la sección: A = H[c + (z_{1} + z_{2})H/2]
- Borde libre sobre el nivel máximo para evitar desbordes por oleaje

## Protecciones
Núcleo impermeable de arcilla, filtros graduados para evitar tubificación y drenes al pie.`,
key:['q = k[[h_{1}^{2}−h_{2}^{2}|2L]]','A = H[c + [[(z_{1}+z_{2})H|2]]]','V ≈ A·L_{corona}'],
err:'Construir sin filtros: el agua arrastra los finos y la presa falla por tubificación.',
x:[['flu','Flujo en suelos y gradiente crítico'],['tal','Los taludes se revisan con agua'],['cpt','El terraplén se compacta por capas']],
g:[
r=>{const k=r.p([1e-6,5e-6,1e-5,5e-5]),h1=r.i(5,30,1),h2=r.i(0,3,.5),L=r.i(20,120,5);return{q:`Dupuit: k=${k} m/s, h₁=${h1} m, h₂=${h2} m, L=${L} m. Halla q por metro.`,a:k*(h1*h1-h2*h2)/(2*L)*86400,u:'m³/día/m',s:[`q = ${k}(${h1}²−${h2}²)/(2·${L}) = ${n(k*(h1*h1-h2*h2)/(2*L))} m³/s/m`,`= ${n(k*(h1*h1-h2*h2)/(2*L)*86400)} m³/día/m`]};},
r=>{const H=r.i(5,40,1),c=r.i(4,10,1),z1=r.p([2,2.5,3]),z2=r.p([2,2.5]);return{q:`Presa de H=${H} m, corona ${c} m, taludes ${z1}:1 y ${z2}:1. Halla el área de la sección.`,a:H*(c+(z1+z2)*H/2),u:'m²',s:[`A = ${H}[${c} + (${z1}+${z2})·${H}/2] = ${n(H*(c+(z1+z2)*H/2))} m²`]};},
r=>{const H=r.i(5,40,1),c=r.i(4,10,1),z1=r.p([2,2.5,3]),z2=r.p([2,2.5]);return{q:`Presa H=${H} m, corona ${c} m, taludes ${z1}:1 y ${z2}:1. Halla el ancho de la base.`,a:c+(z1+z2)*H,u:'m',s:[`B = c + (z₁+z₂)H = ${n(c+(z1+z2)*H)} m`]};},
r=>{const H=r.i(8,30,1),c=r.i(5,8,1),z1=r.p([2.5,3]),z2=r.p([2,2.5]),L=r.i(80,400,10);const V=H*(c+(z1+z2)*H/2)*L;return{q:`Presa de H=${H} m, corona ${c} m, taludes ${z1}:1 y ${z2}:1, longitud ${L} m (sección constante). Halla el volumen.`,a:V,u:'m³',s:[`A = ${n(H*(c+(z1+z2)*H/2))} m²`,`V = ${n(V,6)} m³`]};},
r=>{const k=r.p([1e-6,5e-6,1e-5]),h1=r.i(8,30,1),L=r.i(30,150,5),Lc=r.i(100,500,50);const q=k*h1*h1/(2*L);return{q:`Presa con k=${k} m/s, agua a h₁=${h1} m, h₂=0, distancia de filtración L=${L} m y ${Lc} m de longitud de corona. Halla la filtración total en L/s.`,a:q*Lc*1000,u:'L/s',s:[`q = kh₁²/(2L) = ${n(q)} m³/s/m`,`Q = q·${Lc} = ${n(q*Lc*1000)} L/s`]};}
]});
SUB('gar',{t:'Golpe de ariete',
lec:`Si cierras de golpe una válvula, el agua que venía en movimiento se detiene y su energía se convierte en un **pico de presión** que viaja por la tubería a la velocidad de una onda: la **celeridad** a.

## Celeridad
a = a_{0}/√(1 + (K·D)/(E·e)), con a_{0} = √(K/ρ) ≈ 1439 m/s, K = 2.07×10⁹ Pa (agua), D el diámetro, e el espesor y E el módulo del tubo.

## Sobrepresión
- Tiempo crítico: T_{c} = 2L/a
- Cierre rápido (T ≤ T_{c}), Joukowsky: ΔH = a·ΔV/g
- Cierre lento (T > T_{c}), Michaud: ΔH = 2LV/(gT)

El tubo debe resistir la presión estática **más** la sobrepresión. Se protege con válvulas de alivio, chimeneas de equilibrio y cierres lentos.`,
key:['a = [[1439|√{1 + KD/(Ee)}]]','T_{c} = [[2L|a]]','ΔH = [[aΔV|g]]','ΔH = [[2LV|gT]]'],
err:'Usar Joukowsky para un cierre lento: exagera mucho la sobrepresión.',
x:[['fbe','Continuidad y energía'],['fbo','Al apagarse una bomba ocurre lo mismo'],['fpe','La presión total suma la estática']],
g:[
r=>{const D=r.p([.1,.2,.3,.5,.8]),e=r.p([.005,.008,.01,.015]),E=r.p([['acero',2.07e11],['PVC',2.8e9],['HDPE',1e9]]);const a=1439/sq(1+2.07e9*D/(E[1]*e));return{q:`Tubería de ${E[0]} (E=${E[1]} Pa), D=${D} m, e=${e*1000} mm. Halla a.`,a,u:'m/s',s:[`KD/(Ee) = ${n(2.07e9*D/(E[1]*e))}`,`a = 1439/√(1 + ${n(2.07e9*D/(E[1]*e))}) = ${n(a)} m/s`]};},
r=>{const L=r.i(200,5000,100),a=r.i(300,1300,10);return{q:`L=${L} m y a=${a} m/s. Halla T_{c}.`,a:2*L/a,u:'s',s:[`T_{c} = 2·${L}/${a} = ${n(2*L/a)} s`]};},
r=>{const a=r.i(300,1300,10),V=r.i(.5,3,.1);return{q:`Cierre rápido: a=${a} m/s, V=${V} m/s. Halla ΔH.`,a:a*V/G,u:'m',s:[`ΔH = ${a}·${V}/9.81 = ${n(a*V/G)} m`]};},
r=>{const L=r.i(500,5000,100),V=r.i(.5,2.5,.1),a=r.i(300,1200,50);const Tc=2*L/a,T=+(Tc*r.i(1.5,6,.5)).toFixed(1);return{q:`Cierre en T=${T} s: L=${L} m, V=${V} m/s, a=${a} m/s. Halla ΔH.`,a:2*L*V/(G*T),u:'m',s:[`T_{c} = ${n(Tc)} s < T: cierre lento`,`ΔH = 2LV/(gT) = ${n(2*L*V/(G*T))} m`]};},
r=>{const D=r.p([.15,.2,.3]),e=r.p([.006,.008,.01]),Q=r.i(20,120,5),L=r.i(300,3000,100),Hs=r.i(20,120,5),T=r.i(1,30,1);const a=1439/sq(1+2.07e9*D/(2.8e9*e)),V=Q/1000/(PI*D*D/4),Tc=2*L/a,dH=T<=Tc?a*V/G:2*L*V/(G*T);return{q:`Tubería PVC (E=2.8×10⁹ Pa), D=${D} m, e=${e*1000} mm, L=${L} m, Q=${Q} L/s, presión estática ${Hs} m. La válvula cierra en ${T} s. Halla la presión máxima.`,a:Hs+dH,u:'m',s:[`a = ${n(a)} m/s; V = ${n(V)} m/s`,`T_{c} = ${n(Tc)} s → ${T<=Tc?'cierre rápido (Joukowsky)':'cierre lento (Michaud)'}`,`ΔH = ${n(dH)} m`,`P_{máx} = ${n(Hs+dH)} m`]};}
]});

MOD('m32','Hidráulica fluvial y de obras viales','Agua',
'Los ríos se mueven, arrastran sedimentos y socavan los pilares de los puentes. La mayoría de puentes que caen en el Perú lo hacen por socavación, no por falla estructural.',
['Rocha Felices, Introducción a la hidráulica fluvial','Rocha Felices, Introducción a la hidráulica de las obras viales','Chow, Hidráulica de canales abiertos','FHWA, HEC-18 Evaluating Scour at Bridges','Keller y Sherar, Ingeniería de caminos rurales'],
'UNI: Hidráulica Fluvial (electivo), Drenaje Vial. PUCP: Hidráulica Fluvial (electivo).');
SUB('fgv',{t:'Flujo gradualmente variado',
lec:`Cuando un canal cambia de pendiente o encuentra una compuerta o un puente, el tirante no es constante: forma un **perfil de flujo**.

## Clasificación
Compara el tirante y con el normal y_{n} y el crítico y_{c}. En pendiente suave (y_{n} > y_{c}):
- M1: y > y_{n} (remanso detrás de una presa)
- M2: y_{c} < y < y_{n} (caída hacia una grada)
- M3: y < y_{c} (después de una compuerta)

## Método del paso directo
Entre dos tirantes conocidos, la distancia es:

Δx = (E_{2} − E_{1})/(S_{0} − S̄_{f})

con S_{f} = (nV/R^{2/3})² de Manning y S̄_{f} el promedio de ambas secciones. Es lo que hace HEC-RAS por dentro.`,
key:['Δx = [[E_{2} − E_{1}|S_{0} − S̄_{f}]]','S_{f} = ([[nV|R^{2/3}]])^{2}','E = y + [[V^{2}|2g]]'],
err:'Usar la pendiente de fondo en lugar de la pendiente de fricción.',
x:[['man','S_{f} sale de Manning'],['ene2','Usa energía específica'],['num','Es integración numérica']],
g:[
r=>{const yn=r.i(.8,3,.1),yc=r.i(.3,yn-.2,.05);let y;do{y=r.i(.1,4,.05);}while(Math.abs(y-yn)<.06||Math.abs(y-yc)<.06);const t=y>yn?'M1':y>yc?'M2':'M3';const c={M1:1,M2:2,M3:3}[t];return{q:`Pendiente suave: y_{n}=${yn} m, y_{c}=${yc} m, tirante y=${y} m. ¿Qué perfil es? (escribe 1 para M1, 2 para M2, 3 para M3)`,a:c,u:'',tol:0,s:[y>yn?`y > y_{n}: M1`:y>yc?`y_{c} < y < y_{n}: M2`:`y < y_{c}: M3`]};},
r=>{const nn=r.p([.014,.015,.025]),b=r.i(1,5,.5),y=r.i(.5,2.5,.1),Q=r.i(1,15,.5);const A=b*y,R=A/(b+2*y),V=Q/A;return{q:`Canal rectangular b=${b} m, y=${y} m, Q=${Q} m³/s, n=${nn}. Halla S_{f}.`,a:(nn*V/R**(2/3))**2*1000,u:'‰',s:[`V = ${n(V)} m/s, R = ${n(R)} m`,`S_{f} = (nV/R^{2/3})² = ${n((nn*V/R**(2/3))**2*1000)} ‰`]};},
r=>{const b=r.i(1,5,.5),y=r.i(.5,2.5,.1),Q=r.i(1,15,.5);const V=Q/(b*y);return{q:`Canal rectangular b=${b} m, y=${y} m, Q=${Q} m³/s. Halla E.`,a:y+V*V/(2*G),u:'m',s:[`E = ${y} + ${n(V*V/(2*G))} = ${n(y+V*V/(2*G))} m`]};},
r=>{const E1=r.i(1,3,.01),dE=r.i(.02,.15,.01),S0=r.p([.001,.002,.0005]),Sf=r.i(.0001,.0004,.00005);return{q:`E₁=${E1} m, E₂=${n(E1+dE)} m, S₀=${S0}, S̄_{f}=${Sf}. Halla Δx.`,a:dE/(S0-Sf),u:'m',s:[`Δx = ${dE}/(${S0}−${Sf}) = ${n(dE/(S0-Sf))} m`]};},
r=>{const b=r.i(2,5,.5),Q=r.i(3,12,.5),nn=.015,S0=r.p([.0005,.001]);let yn=1;for(let i=0;i<80;i++){const A=b*yn,R=A/(b+2*yn);yn*=(Q*nn/(A*R**(2/3)*sq(S0)))**.6;}const y1=+(yn*1.6).toFixed(2),y2=+(yn*1.4).toFixed(2);const f=y=>{const A=b*y,R=A/(b+2*y),V=Q/A;return[y+V*V/(2*G),(nn*V/R**(2/3))**2];};const[E1,S1]=f(y1),[E2,S2]=f(y2);const dx=(E1-E2)/(S0-(S1+S2)/2);return{q:`Remanso M1 en canal rectangular b=${b} m, Q=${Q} m³/s, n=0.015, S₀=${S0}. Halla la distancia entre y=${y1} m (aguas abajo) e y=${y2} m (aguas arriba).`,a:Math.abs(dx),u:'m',s:[`E(${y1}) = ${n(E1)}, S_{f} = ${n(S1)}`,`E(${y2}) = ${n(E2)}, S_{f} = ${n(S2)}`,`Δx = (E₁ − E₂)/(S₀ − S̄_{f}) = ${n(Math.abs(dx))} m`]};}
]});
SUB('sed',{t:'Transporte de sedimentos',
lec:`Un río no solo lleva agua: arrastra arena, grava y piedras. El fondo se mueve cuando el esfuerzo del agua supera la resistencia de los granos.

## Esfuerzo del agua sobre el fondo
τ_{0} = γ·R·S (en ríos anchos, R ≈ y).

## Inicio del movimiento (Shields)
τ_{c} = θ_{c}(γ_{s} − γ)d, con θ_{c} ≈ 0.047 para granos gruesos. Si τ_{0} > τ_{c}, el grano se mueve.

## Caudal sólido de fondo (Meyer-Peter y Müller)
q_{b} = 8√((S_{s} − 1)gd³)·(θ − 0.047)^{1.5}, con θ = τ_{0}/[(γ_{s} − γ)d].

Saber qué tamaño de piedra resiste el río sirve para diseñar enrocados de protección.`,
key:['τ_{0} = γRS','τ_{c} = θ_{c}(γ_{s}−γ)d','θ = [[τ_{0}|(γ_{s}−γ)d]]','q_{b} = 8√{(S_{s}−1)gd^{3}}(θ−0.047)^{1.5}'],
err:'Usar el diámetro medio de todo el lecho para diseñar un enrocado: se usa el tamaño de las rocas colocadas.',
x:[['man','R y S de Manning'],['fri','El grano resiste por fricción'],['soc','El arrastre produce socavación']],
g:[
r=>{const y=r.i(.5,6,.1),S=r.p([.0005,.001,.002,.005,.01]);return{q:`Río ancho con y=${y} m y S=${S}. Halla τ₀.`,a:9810*y*S,u:'Pa',s:[`τ₀ = 9810·${y}·${S} = ${n(9810*y*S)} Pa`]};},
r=>{const d=r.i(1,200,1);return{q:`Grano de d=${d} mm (γ_{s}=26 kN/m³, θ_{c}=0.047). Halla τ_{c}.`,a:.047*(26000-9810)*d/1000,u:'Pa',s:[`τ_{c} = 0.047·16 190·${d/1000} = ${n(.047*(26000-9810)*d/1000)} Pa`]};},
r=>{const y=r.i(.5,5,.1),S=r.p([.001,.002,.005,.01]);const t=9810*y*S;return{q:`y=${y} m, S=${S}. ¿Qué diámetro queda justo en reposo (θ_{c}=0.047, γ_{s}=26 kN/m³)?`,a:t/(.047*16190)*1000,u:'mm',s:[`τ₀ = ${n(t)} Pa`,`d = τ₀/(0.047·16 190) = ${n(t/(.047*16190)*1000)} mm`]};},
r=>{const y=r.i(.5,5,.1),S=r.p([.001,.002,.005]),d=r.i(1,50,1);const th=9810*y*S/(16190*d/1000);return{q:`y=${y} m, S=${S}, d=${d} mm. Halla θ.`,a:th,u:'',s:[`θ = τ₀/[(γ_{s}−γ)d] = ${n(th)} ${th>.047?'(hay arrastre)':'(no hay arrastre)'}`]};},
r=>{let y,S,d,th;do{y=r.i(1,5,.1);S=r.p([.002,.005,.01]);d=r.i(2,30,1);th=9810*y*S/(16190*d/1000);}while(th<=.06);const qb=8*sq(1.65*G*(d/1000)**3)*(th-.047)**1.5;return{q:`Meyer-Peter y Müller: y=${y} m, S=${S}, d=${d} mm. Halla q_{b} en L/s por metro de ancho.`,a:qb*1000,u:'L/s/m',s:[`θ = ${n(th)}`,`q_{b} = 8√(1.65·9.81·d³)(θ−0.047)^{1.5} = ${n(qb*1000)} L/s/m`]};}
]});
SUB('soc',{t:'Socavación en puentes',
lec:`La socavación es la erosión del lecho alrededor de pilares y estribos. Es invisible durante la avenida y aparece cuando el puente ya cayó.

## Socavación local en pilares (HEC-18, ecuación CSU)
y_{s} = 2.0·K_{1}·K_{2}·K_{3}·a·(y_{1}/a)^{0.35}·Fr_{1}^{0.43}

- a: ancho del pilar; y_{1}, Fr_{1}: tirante y Froude aguas arriba
- K_{1}: forma (1.1 cuadrado, 1.0 circular, 0.9 aguzado)
- K_{2}: ángulo de ataque (1.0 si alineado)
- K_{3}: forma del lecho (1.1 en lecho plano)

## Socavación por contracción (lecho móvil, Laursen)
y_{2}/y_{1} = (Q_{2}/Q_{1})^{6/7}·(W_{1}/W_{2})^{k_{1}}, con k_{1} entre 0.59 y 0.69.

La cimentación del pilar debe quedar bajo la socavación total, con margen.`,
key:['y_{s} = 2.0K_{1}K_{2}K_{3}a([[y_{1}|a]])^{0.35}Fr_{1}^{0.43}','Fr = [[V|√{gy}]]','[[y_{2}|y_{1}]] = ([[Q_{2}|Q_{1}]])^{6/7}([[W_{1}|W_{2}]])^{k_{1}}'],
err:'Ubicar la zapata del pilar sobre la profundidad de socavación porque el lecho "se ve firme" en estiaje.',
x:[['sed','La erosión nace del arrastre'],['ene2','Usa el número de Froude'],['pu1','Afecta la estabilidad del puente']],
g:[
r=>{const V=r.i(1,5,.1),y=r.i(1,6,.1);return{q:`V=${V} m/s, y₁=${y} m. Halla Fr₁.`,a:V/sq(G*y),u:'',s:[`Fr = ${n(V/sq(G*y))}`]};},
r=>{const a=r.i(.6,3,.1),y=r.i(1,6,.1),F=r.i(.2,.8,.05);const ys=2*1*1*1.1*a*(y/a)**.35*F**.43;return{q:`Pilar circular (K₁=1) alineado (K₂=1), lecho plano (K₃=1.1), a=${a} m, y₁=${y} m, Fr₁=${F}. Halla y_{s}.`,a:ys,u:'m',s:[`y_{s} = 2·1·1·1.1·${a}(${y}/${a})^{0.35}·${F}^{0.43} = ${n(ys)} m`]};},
r=>{const a=r.i(.6,3,.1),y=r.i(1,6,.1),V=r.i(1,4.5,.1),K1=r.p([1.1,1,.9]);const F=V/sq(G*y),ys=2*K1*1.1*a*(y/a)**.35*F**.43;return{q:`Pilar con K₁=${K1}, K₂=1, K₃=1.1, a=${a} m, y₁=${y} m, V=${V} m/s. Halla y_{s}.`,a:ys,u:'m',s:[`Fr₁ = ${n(F)}`,`y_{s} = ${n(ys)} m`]};},
r=>{const y1=r.i(1,5,.1),W1=r.i(60,200,10),W2=r.i(30,W1-10,5),k=r.p([.59,.64,.69]);const y2=y1*(W1/W2)**k;return{q:`Contracción con Q₂=Q₁: y₁=${y1} m, W₁=${W1} m, W₂=${W2} m, k₁=${k}. Halla la socavación y₂ − y₁.`,a:y2-y1,u:'m',s:[`y₂ = ${y1}(${W1}/${W2})^{${k}} = ${n(y2)} m`,`y_{s} = ${n(y2-y1)} m`]};},
r=>{const a=r.i(1,2.5,.1),y=r.i(2,5,.1),V=r.i(2,4,.1),W1=r.i(80,150,10),W2=r.i(50,75,5),k=.64,zf=r.i(1,3,.5);const F=V/sq(G*y),ys=2*1*1.1*a*(y/a)**.35*F**.43,yc=y*(W1/W2)**k-y;return{q:`Puente: pilar circular a=${a} m (K₃=1.1), y₁=${y} m, V=${V} m/s; río de ${W1} m reducido a ${W2} m (k₁=0.64). Con un margen de ${zf} m, ¿a qué profundidad bajo el lecho debe ir la base de la zapata?`,a:ys+yc+zf,u:'m',s:[`Local: ${n(ys)} m`,`Contracción: ${n(yc)} m`,`Profundidad = ${n(ys+yc+zf)} m`]};}
]});
SUB('cun',{t:'Drenaje de carreteras',
lec:`El agua es la principal causa de deterioro de las vías. El drenaje superficial la saca rápido de la calzada:

- **Bombeo:** pendiente transversal de la calzada (2 % en asfalto, 2.5 a 4 % en afirmado)
- **Cunetas:** canales al pie del talud de corte, normalmente triangulares
- **Alcantarillas de alivio:** sacan el agua de la cuneta antes de que se llene

## Cuneta triangular con taludes z_{1}:1 y z_{2}:1
- A = (z_{1} + z_{2})y²/2
- P = y(√(1 + z_{1}²) + √(1 + z_{2}²))
- Capacidad con Manning

## Espaciamiento de alcantarillas de alivio
La cuneta recibe el agua de una franja de ancho w (calzada más talud). Su capacidad Q alcanza para una longitud L = 3.6×10⁶·Q/(C·i·w), con i en mm/h.`,
key:['A = [[(z_{1}+z_{2})y^{2}|2]]','P = y(√{1+z_{1}^{2}} + √{1+z_{2}^{2}})','L = [[3.6×10^{6}·Q|C·i·w]]','Δh = bombeo·[[ancho|2]]'],
err:'Dejar cunetas largas sin alivio: el agua se acumula y rebalsa sobre la vía.',
x:[['man','Manning en sección triangular'],['rac','Q del método racional'],['can2','Las alcantarillas cruzan la vía']],
g:[
r=>{const w=r.i(6,12,.5),b=r.p([2,2.5,3,4]);return{q:`Calzada de ${w} m con bombeo de ${b} % hacia ambos lados. ¿Cuánto más alto está el eje que el borde?`,a:w/2*b,u:'cm',s:[`Δh = ${b/100}·${w/2} m = ${n(w/2*b)} cm`]};},
r=>{const z1=r.p([1,2,3,4]),z2=r.p([.5,1,1.5]),y=r.i(.2,.6,.05);return{q:`Cuneta triangular z₁=${z1}, z₂=${z2}, y=${y} m. Halla A.`,a:(z1+z2)*y*y/2,u:'m²',s:[`A = (${z1}+${z2})·${y}²/2 = ${n((z1+z2)*y*y/2)} m²`]};},
r=>{const z1=r.p([1,2,3,4]),z2=r.p([.5,1,1.5]),y=r.i(.2,.6,.05),nn=r.p([.015,.02,.025]),S=r.p([.005,.01,.02,.04]);const A=(z1+z2)*y*y/2,P=y*(sq(1+z1*z1)+sq(1+z2*z2)),R=A/P;return{q:`Cuneta z₁=${z1}, z₂=${z2}, y=${y} m, n=${nn}, S=${S}. Halla Q.`,a:A*R**(2/3)*sq(S)/nn*1000,u:'L/s',s:[`A = ${n(A)}, P = ${n(P)}, R = ${n(R)}`,`Q = ${n(A*R**(2/3)*sq(S)/nn*1000)} L/s`]};},
r=>{const Q=r.i(.02,.15,.01),C=r.p([.5,.6,.7,.8]),i=r.i(30,120,5),w=r.i(20,60,2);return{q:`Una cuneta con capacidad ${Q} m³/s recibe una franja de ${w} m (C=${C}, i=${i} mm/h). ¿Cada cuántos metros va una alcantarilla de alivio?`,a:3.6e6*Q/(C*i*w),u:'m',s:[`L = 3.6×10⁶·${Q}/(${C}·${i}·${w}) = ${n(3.6e6*Q/(C*i*w))} m`]};},
r=>{const z1=r.p([2,3]),z2=r.p([1,1.5]),y=r.i(.15,.3,.05),nn=.02,S=r.p([.01,.02,.04]),C=r.p([.6,.7]),i=r.i(40,100,5),w=r.i(20,60,2);const A=(z1+z2)*y*y/2,P=y*(sq(1+z1*z1)+sq(1+z2*z2)),Q=A*(A/P)**(2/3)*sq(S)/nn;return{q:`Cuneta z₁=${z1}, z₂=${z2}, tirante máximo ${y} m, n=0.02, S=${S}; franja de ${w} m con C=${C} e i=${i} mm/h. Halla el espaciamiento de alcantarillas.`,a:3.6e6*Q/(C*i*w),u:'m',s:[`Q = ${n(Q*1000)} L/s`,`L = ${n(3.6e6*Q/(C*i*w))} m`]};}
]});

MOD('m33','Hidrología II','Agua',
'Del caudal promedio pasas al caudal extremo: la avenida de 100 años, cómo viaja por el río y cuánta agua hay bajo tierra.',
['Chow, Maidment y Mays, Hidrología aplicada','Ponce, Engineering Hydrology','Varas y Bois, Hidrología probabilística','Mejía, Hidrología aplicada','Vélez, Hidrología para ingenieros','Bateman, Hidrología básica y aplicada'],
'UNI: Hidrología General (HH-113) e Hidrología Estadística. PUCP: Hidrología (2CIV08).');
SUB('gum',{t:'Análisis de frecuencias',
lec:`Con una serie de caudales máximos anuales puedes estimar el caudal de un periodo de retorno mayor que el registro.

## Posición de graficación (Weibull)
Ordena de mayor a menor; el de orden m de n datos tiene T = (n + 1)/m.

## Gumbel
x_{T} = x̄ + K_{T}·s, con K_{T} = −(√6/π)[0.5772 + ln(ln(T/(T − 1)))]

## Log-normal
Trabaja con y = ln x: x_{T} = exp(ȳ + z·s_{y}), con z de la normal estándar: T = 10 → 1.282, 25 → 1.751, 50 → 2.054, 100 → 2.326.

Con pocos años de datos, el error de la estimación es grande. Por eso se comparan varias distribuciones y se prueba su ajuste.`,
key:['T = [[n+1|m]]','K_{T} = −[[√{6}|π]][0.5772 + ln(ln[[T|T−1]])]','x_{T} = x̄ + K_{T}s','x_{T} = e^{ȳ + z·s_{y}}'],
err:'Extrapolar a 500 años con 10 años de registro sin advertir la incertidumbre.',
x:[['pro','Periodo de retorno y riesgo'],['est','Media y desviación'],['rac','El caudal de diseño']],
g:[
r=>{const nn=r.i(10,60),m=r.i(1,10);return{q:`Serie de ${nn} años; un caudal tiene orden m=${m}. Halla su T por Weibull.`,a:(nn+1)/m,u:'años',s:[`T = (${nn}+1)/${m} = ${n((nn+1)/m)} años`]};},
r=>{const T=r.p([2,3,4,5,8,10,15,20,25,30,40,50,75,100,150,200,250,500,1000]);const K=-(sq(6)/PI)*(.5772+Math.log(Math.log(T/(T-1))));return{q:`Halla K_{T} de Gumbel para T=${T} años.`,a:K,u:'',s:[`K_{T} = ${n(K)}`]};},
r=>{const m=r.i(50,800,10),s=r.i(20,300,10),T=r.p([10,25,50,100]);const K=-(sq(6)/PI)*(.5772+Math.log(Math.log(T/(T-1))));return{q:`Caudales máximos: x̄=${m} m³/s, s=${s} m³/s. Halla Q de ${T} años con Gumbel.`,a:m+K*s,u:'m³/s',s:[`K_{T} = ${n(K)}`,`Q = ${m} + ${n(K)}·${s} = ${n(m+K*s)} m³/s`]};},
r=>{const my=r.i(3,7,.1),sy=r.i(.2,.8,.05),z=r.p([[10,1.282],[25,1.751],[50,2.054],[100,2.326]]);return{q:`Log-normal: ȳ=${my}, s_{y}=${sy} (y = ln Q). Halla Q de ${z[0]} años (z=${z[1]}).`,a:Math.exp(my+z[1]*sy),u:'m³/s',s:[`Q = e^{${my}+${z[1]}·${sy}} = ${n(Math.exp(my+z[1]*sy))} m³/s`]};},
r=>{const v=Array.from({length:8},()=>r.i(60,400,5));const nn=v.length,m=v.reduce((a,b)=>a+b)/nn,s=sq(v.reduce((a,b)=>a+(b-m)**2,0)/(nn-1)),T=r.p([50,100]);const K=-(sq(6)/PI)*(.5772+Math.log(Math.log(T/(T-1))));return{q:`Caudales máximos anuales: ${v.join(', ')} m³/s. Halla Q de ${T} años con Gumbel.`,a:m+K*s,u:'m³/s',s:[`x̄ = ${n(m)}, s = ${n(s)}`,`K_{T} = ${n(K)}`,`Q = ${n(m+K*s)} m³/s`]};}
]});
SUB('msk',{t:'Tránsito de avenidas',
lec:`Una avenida que entra a un tramo de río sale más tarde y atenuada, porque parte del agua se almacena en el cauce. Calcular cómo cambia es **transitar** la avenida.

## Método de Muskingum
El almacenamiento es S = K[XI + (1 − X)O]. K es el tiempo de viaje del tramo y X (0 a 0.5) pondera entrada y salida.

O_{2} = C_{0}I_{2} + C_{1}I_{1} + C_{2}O_{1}

- D = K − KX + 0.5Δt
- C_{0} = (−KX + 0.5Δt)/D
- C_{1} = (KX + 0.5Δt)/D
- C_{2} = (K − KX − 0.5Δt)/D

Comprobación: C_{0} + C_{1} + C_{2} = 1. Para que ningún coeficiente sea negativo, elige 2KX ≤ Δt ≤ 2K(1 − X).

Lo mismo sirve para embalses (método de la piscina nivelada) con otra relación de almacenamiento.`,
key:['D = K − KX + 0.5Δt','C_{0} = [[−KX + 0.5Δt|D]]','C_{1} = [[KX + 0.5Δt|D]]','O_{2} = C_{0}I_{2} + C_{1}I_{1} + C_{2}O_{1}'],
err:'Elegir Δt muy pequeño frente a KX: C₀ sale negativo y aparecen oscilaciones.',
x:[['edo','Es una ecuación de continuidad con almacenamiento'],['scs','El hidrograma de entrada viene de SCS'],['num','Es un esquema numérico paso a paso']],
g:[
r=>{const K=r.i(2,24,1),X=r.p([.1,.15,.2,.25,.3]),dt=r.i(1,6,1);return{q:`K=${K} h, X=${X}, Δt=${dt} h. Halla D.`,a:K-K*X+.5*dt,u:'h',s:[`D = ${K} − ${n(K*X)} + ${dt/2} = ${n(K-K*X+.5*dt)} h`]};},
r=>{const K=r.i(3,24,1),X=r.p([.1,.15,.2,.25,.3]),dt=r.i(Math.ceil(2*K*X),Math.max(Math.ceil(2*K*X),Math.floor(2*K*(1-X))),1);const D=K-K*X+.5*dt;return{q:`K=${K} h, X=${X}, Δt=${dt} h. Halla C₀.`,a:(-K*X+.5*dt)/D,u:'',s:[`C₀ = (−${n(K*X)} + ${dt/2})/${n(D)} = ${n((-K*X+.5*dt)/D)}`]};},
r=>{const K=r.i(3,24,1),X=r.p([.1,.15,.2,.25,.3]),dt=r.i(Math.ceil(2*K*X),Math.max(Math.ceil(2*K*X),Math.floor(2*K*(1-X))),1);const D=K-K*X+.5*dt;return{q:`K=${K} h, X=${X}, Δt=${dt} h. Halla C₂.`,a:(K-K*X-.5*dt)/D,u:'',s:[`C₂ = (${K} − ${n(K*X)} − ${dt/2})/${n(D)} = ${n((K-K*X-.5*dt)/D)}`]};},
r=>{const C0=r.i(.05,.3,.01),C1=r.i(.2,.5,.01),I1=r.i(10,200,5),I2=r.i(20,400,5),O1=r.i(10,200,5);const C2=1-C0-C1;return{q:`C₀=${C0}, C₁=${C1}, C₂=${n(C2)}; I₁=${I1}, I₂=${I2}, O₁=${O1} m³/s. Halla O₂.`,a:C0*I2+C1*I1+C2*O1,u:'m³/s',s:[`O₂ = ${n(C0*I2+C1*I1+C2*O1)} m³/s`]};},
r=>{const K=r.i(6,18,1),X=r.p([.15,.2,.25]),dt=r.i(Math.ceil(2*K*X),Math.floor(2*K*(1-X)),1);const D=K-K*X+.5*dt,C0=(-K*X+.5*dt)/D,C1=(K*X+.5*dt)/D,C2=(K-K*X-.5*dt)/D;const I=[r.i(10,30,5),r.i(60,120,10),r.i(150,300,10)];const O1=I[0],O2=C0*I[1]+C1*I[0]+C2*O1,O3=C0*I[2]+C1*I[1]+C2*O2;return{q:`Muskingum con K=${K} h, X=${X}, Δt=${dt} h. Entradas: ${I.join(', ')} m³/s; salida inicial igual a la entrada inicial. Halla la salida en el tercer intervalo.`,a:O3,u:'m³/s',s:[`C₀=${n(C0)}, C₁=${n(C1)}, C₂=${n(C2)}`,`O₂ = ${n(O2)}`,`O₃ = ${n(O3)} m³/s`]};}
]});
SUB('hu',{t:'Hidrograma unitario',
lec:`El **hidrograma unitario** es la respuesta de una cuenca a 1 mm (o 1 cm) de lluvia efectiva caída en una duración dada. Si la cuenca es lineal, la respuesta a otra lluvia es una suma escalada.

## Convolución
Si la lluvia efectiva tiene bloques P_{1}, P_{2}, ... y el hidrograma unitario tiene ordenadas U_{1}, U_{2}, ...:

Q_{n} = Σ P_{i}·U_{n−i+1}

## Volumen
El área bajo el hidrograma unitario debe ser igual a 1 mm sobre la cuenca: V = A·0.001 m³ con A en m².

## Tiempo base y pico
El pico ocurre cerca del tiempo de concentración; cuencas alargadas tienen picos más bajos y tardíos.`,
key:['Q_{n} = ΣP_{i}U_{n−i+1}','V_{HU} = A·1 mm','Q = P_{e}·U (un solo bloque)'],
err:'Usar la lluvia total en vez de la efectiva.',
x:[['scs','La lluvia efectiva viene del SCS'],['cue','El área de la cuenca'],['msk','El hidrograma resultante se transita']],
g:[
r=>{const P=r.i(2,40,1),U=r.i(1,20,.5);return{q:`Lluvia efectiva de ${P} mm y ordenada unitaria U=${U} m³/s/mm. Halla Q.`,a:P*U,u:'m³/s',s:[`Q = ${n(P*U)} m³/s`]};},
r=>{const A=r.i(5,500,5);return{q:`Cuenca de ${A} km². ¿Qué volumen debe tener su hidrograma unitario de 1 mm?`,a:A*1e6*.001,u:'m³',s:[`V = ${A}×10⁶·0.001 = ${n(A*1000)} m³`]};},
r=>{const P=[r.i(5,30),r.i(5,30)],U=[r.i(1,5),r.i(5,15),r.i(2,8)];const Q2=P[0]*U[1]+P[1]*U[0];return{q:`Bloques de lluvia efectiva: ${P.join(', ')} mm. HU: ${U.join(', ')} m³/s/mm. Halla Q en el segundo intervalo.`,a:Q2,u:'m³/s',s:[`Q₂ = P₁U₂ + P₂U₁ = ${P[0]}·${U[1]} + ${P[1]}·${U[0]} = ${Q2} m³/s`]};},
r=>{const P=[r.i(5,30),r.i(5,30)],U=[r.i(1,5),r.i(5,15),r.i(2,8)];const Q3=P[0]*U[2]+P[1]*U[1];return{q:`Bloques: ${P.join(', ')} mm. HU: ${U.join(', ')} m³/s/mm. Halla Q en el tercer intervalo.`,a:Q3,u:'m³/s',s:[`Q₃ = P₁U₃ + P₂U₂ = ${Q3} m³/s`]};},
r=>{const P=[r.i(5,25),r.i(10,30),r.i(3,15)],U=[r.i(1,4),r.i(6,15),r.i(4,10),r.i(1,4)];const Q=[];for(let k=0;k<6;k++){let s=0;for(let i=0;i<3;i++){const j=k-i;if(j>=0&&j<4)s+=P[i]*U[j];}Q.push(s);}const mx=Math.max(...Q);return{q:`Lluvia efectiva: ${P.join(', ')} mm. HU: ${U.join(', ')} m³/s/mm. Halla el caudal pico del hidrograma.`,a:mx,u:'m³/s',s:[`Convolución: ${Q.join(', ')} m³/s`,`Pico = ${mx} m³/s`]};}
]});
SUB('agu',{t:'Aguas subterráneas',
lec:`Gran parte del agua de Lima e Ica sale de **acuíferos**: capas de suelo o roca que almacenan y dejan pasar agua.

- **Confinado:** entre capas impermeables, el agua está a presión
- **Libre:** su superficie es el nivel freático

## Pozo en régimen permanente (Thiem)
- Confinado: Q = 2πKb(h_{2} − h_{1})/ln(r_{2}/r_{1})
- Libre: Q = πK(h_{2}² − h_{1}²)/ln(r_{2}/r_{1})

K: conductividad hidráulica; b: espesor del acuífero; h: niveles medidos en dos pozos de observación a r_{1} y r_{2}.

## Transmisividad
T = K·b (m²/día). Un buen acuífero tiene T mayor a 100 m²/día.

Bombear más de lo que se recarga baja el nivel freático y puede producir asentamientos del terreno.`,
key:['Q = [[2πKb(h_{2}−h_{1})|ln(r_{2}/r_{1})]]','Q = [[πK(h_{2}^{2}−h_{1}^{2})|ln(r_{2}/r_{1})]]','T = K·b','v = Ki'],
err:'Usar la fórmula de acuífero confinado en uno libre.',
x:[['flu','Darcy en el acuífero'],['efe','Bajar el freático aumenta σ′'],['pob','Abastece poblaciones']],
g:[
r=>{const K=r.i(1,80,1),b=r.i(5,60,5);return{q:`K=${K} m/día, b=${b} m. Halla T.`,a:K*b,u:'m²/día',s:[`T = ${K*b} m²/día`]};},
r=>{const K=r.i(1,80,1),b=r.i(5,50,5),h1=r.i(20,60,.5),dh=r.i(.5,8,.5),r1=r.i(5,30,5),r2=r.i(40,200,10);const Q=2*PI*K*b*dh/Math.log(r2/r1);return{q:`Acuífero confinado: K=${K} m/día, b=${b} m. Pozos de observación a ${r1} y ${r2} m con niveles h₁=${h1} y h₂=${n(h1+dh)} m. Halla Q.`,a:Q,u:'m³/día',s:[`Q = 2π·${K}·${b}·${dh}/ln(${r2}/${r1}) = ${n(Q)} m³/día`]};},
r=>{const K=r.i(1,80,1),h1=r.i(10,40,.5),dh=r.i(.5,5,.5),r1=r.i(5,30,5),r2=r.i(40,200,10);const h2=h1+dh,Q=PI*K*(h2*h2-h1*h1)/Math.log(r2/r1);return{q:`Acuífero libre: K=${K} m/día; niveles h₁=${h1} m a ${r1} m y h₂=${n(h2)} m a ${r2} m. Halla Q.`,a:Q,u:'m³/día',s:[`Q = π·${K}(${n(h2)}²−${h1}²)/ln(${r2}/${r1}) = ${n(Q)} m³/día`]};},
r=>{const Q=r.i(200,5000,100),b=r.i(10,50,5),h1=r.i(20,60,.5),dh=r.i(.5,6,.5),r1=r.i(5,30,5),r2=r.i(40,200,10);const K=Q*Math.log(r2/r1)/(2*PI*b*dh);return{q:`Ensayo en acuífero confinado de b=${b} m: Q=${Q} m³/día, niveles ${h1} m a ${r1} m y ${n(h1+dh)} m a ${r2} m. Halla K.`,a:K,u:'m/día',s:[`K = Q ln(r₂/r₁)/(2πb Δh) = ${n(K)} m/día`]};},
r=>{const K=r.i(5,50,1),H=r.i(20,50,1),hw=r.i(10,H-5,1),rw=r.p([.15,.2,.25,.3]),R=r.i(100,500,50);const Q=PI*K*(H*H-hw*hw)/Math.log(R/rw);return{q:`Pozo en acuífero libre: K=${K} m/día, nivel estático ${H} m sobre el fondo, nivel en el pozo ${hw} m, radio del pozo ${rw} m, radio de influencia ${R} m. Halla Q en L/s.`,a:Q/86.4,u:'L/s',s:[`Q = πK(H²−h_{w}²)/ln(R/r_{w}) = ${n(Q)} m³/día`,`= ${n(Q/86.4)} L/s`]};}
]});

MOD('m34','Saneamiento II','Agua',
'De la red pública a cada edificio, y del desagüe al río limpio. Instalaciones sanitarias, tanques sépticos y plantas de tratamiento.',
['Jimeno Blasco, Instalaciones sanitarias en edificaciones','Normas IS.010 e IS.020 (RNE)','Romero Rojas, Tratamiento de aguas residuales','Silva Garavito, Diseño de plantas de purificación de aguas','Arocha, Abastecimientos de agua: teoría y diseño','López Cualla, Elementos de diseño para acueductos y alcantarillados','Metcalf & Eddy, Wastewater Engineering'],
'UNI: Instalaciones Sanitarias, Tratamiento de Agua y Desagüe. PUCP: Ingeniería Sanitaria (electivo).');
SUB('isa',{t:'Agua en edificaciones',
lec:`Un edificio necesita saber cuánta agua consume al día (**dotación**) y dónde la guarda.

## Dotaciones de la IS.010 (referencia)
- Departamentos: 500 L/d (1 dormitorio), 850 (2), 1200 (3), 1350 (4), 1500 (5)
- Oficinas: 6 L/d por m² de área útil

## Almacenamiento con cisterna, bomba y tanque elevado
- Cisterna: al menos 3/4 de la dotación diaria
- Tanque elevado: al menos 1/3 de la dotación diaria
- Ninguno menor a 1 m³

## Bombeo
Caudal de bombeo = volumen del tanque elevado / tiempo de llenado (normalmente 2 horas o menos).

Comprueba siempre los valores en la versión vigente de la norma antes de un proyecto.`,
key:['V_{cisterna} ≥ [[3|4]]·Dotación','V_{tanque} ≥ [[1|3]]·Dotación','Q_{b} = [[V_{tanque}|t_{llenado}]]','P = [[γQH|η]]'],
err:'Sumar la cisterna y el tanque para cubrir solo un día: la norma pide ambos mínimos.',
x:[['pob','Dotación y caudales'],['fbo','La bomba eleva el agua'],['fpe','Pérdidas en la tubería de impulsión']],
g:[
r=>{const d=[r.i(1,8),r.i(1,12),r.i(0,10)];const D=d[0]*850+d[1]*1200+d[2]*1350;return{q:`Edificio con ${d[0]} departamentos de 2 dormitorios, ${d[1]} de 3 y ${d[2]} de 4 (850, 1200 y 1350 L/d). Halla la dotación diaria.`,a:D,u:'L/d',s:[`D = ${d[0]}·850 + ${d[1]}·1200 + ${d[2]}·1350 = ${D} L/d`]};},
r=>{const D=r.i(3000,60000,500);return{q:`Dotación ${D} L/d. Halla el volumen mínimo de cisterna.`,a:Math.max(.75*D/1000,1),u:'m³',s:[`V = 3/4·${D} = ${n(.75*D)} L = ${n(.75*D/1000)} m³`]};},
r=>{const D=r.i(3000,60000,500);return{q:`Dotación ${D} L/d. Halla el volumen mínimo del tanque elevado.`,a:Math.max(D/3000,1),u:'m³',s:[`V = ${D}/3 = ${n(D/3)} L = ${n(D/3000)} m³`]};},
r=>{const A=r.i(200,3000,50);return{q:`Oficinas con ${A} m² útiles (6 L/d/m²). Halla la dotación y el tanque elevado mínimo; escribe el tanque.`,a:Math.max(A*6/3000,1),u:'m³',s:[`Dotación = ${A*6} L/d`,`Tanque = ${n(A*6/3)} L = ${n(Math.max(A*6/3000,1))} m³`]};},
r=>{const nd=r.i(8,40),dd=r.p([[2,850],[3,1200]]),t=r.p([1,1.5,2]),H=r.i(15,60,1),hf=r.i(2,8,.5),e=r.p([.55,.6,.65]);const D=nd*dd[1],V=D/3,Q=V/(t*3600),P=9.81*Q/1000*(H+hf)/e;return{q:`${nd} departamentos de ${dd[0]} dormitorios (${dd[1]} L/d c/u). Tanque elevado mínimo llenado en ${t} h, altura ${H} m y pérdidas ${hf} m, η=${e*100} %. Halla la potencia de la bomba en HP.`,a:P/.746,u:'HP',s:[`Dotación = ${D} L/d; tanque = ${n(V)} L`,`Q = ${n(Q)} L/s`,`P = γQ(H+h_{f})/η = ${n(P)} kW = ${n(P/.746)} HP`]};}
]});
SUB('tse',{t:'Tanques sépticos',
lec:`Donde no hay red de desagüe, se usa un **tanque séptico**: un depósito donde los sólidos sedimentan y se digieren, seguido de un sistema de infiltración.

## Diseño según la IS.020 (resumen)
- Periodo de retención: PR = 1.5 − 0.3·log(P·q) días, con P personas y q el aporte (L/hab/d); no menos de 6 horas
- Volumen de sedimentación: V_{s} = 10⁻³·(P·q)·PR (m³)
- Volumen de lodos: V_{d} = T_{a}·P·N·10⁻³ (m³), con T_{a} la tasa de acumulación (L/hab/año) según el clima y N los años entre limpiezas

El volumen útil suma V_{s}, V_{d} y un espacio para natas.

El efluente aún contamina: necesita un pozo de absorción o zanjas de infiltración según la permeabilidad del suelo.`,
key:['PR = 1.5 − 0.3·log(P·q)','V_{s} = 10^{−3}(P·q)PR','V_{d} = T_{a}·P·N·10^{−3}'],
err:'Construir el tanque cerca de un pozo de agua: la norma exige distancias mínimas.',
x:[['pta','Es un tratamiento primario'],['flu','La infiltración depende de la permeabilidad'],['pob','Usa el aporte por habitante']],
g:[
r=>{const P=r.i(5,100,1),q=r.i(80,200,10);return{q:`P=${P} personas, q=${q} L/hab/d. Halla PR.`,a:Math.max(1.5-.3*Math.log10(P*q),.25),u:'días',s:[`PR = 1.5 − 0.3·log(${P*q}) = ${n(1.5-.3*Math.log10(P*q))} días`]};},
r=>{const P=r.i(5,100,1),q=r.i(80,200,10);const PR=Math.max(1.5-.3*Math.log10(P*q),.25);return{q:`P=${P}, q=${q} L/hab/d. Halla V_{s}.`,a:1e-3*P*q*PR,u:'m³',s:[`PR = ${n(PR)} días`,`V_{s} = 10⁻³·${P*q}·${n(PR)} = ${n(1e-3*P*q*PR)} m³`]};},
r=>{const Ta=r.p([40,50,57,65,70]),P=r.i(5,100,1),N=r.i(1,5);return{q:`T_{a}=${Ta} L/hab/año, P=${P}, limpieza cada ${N} años. Halla V_{d}.`,a:Ta*P*N/1000,u:'m³',s:[`V_{d} = ${Ta}·${P}·${N}·10⁻³ = ${n(Ta*P*N/1000)} m³`]};},
r=>{const P=r.i(5,80,1),q=r.i(80,200,10),Ta=r.p([50,57,65]),N=r.i(1,3);const PR=Math.max(1.5-.3*Math.log10(P*q),.25),V=1e-3*P*q*PR+Ta*P*N/1000;return{q:`P=${P}, q=${q} L/hab/d, T_{a}=${Ta}, limpieza cada ${N} años. Halla V_{s} + V_{d}.`,a:V,u:'m³',s:[`V_{s} = ${n(1e-3*P*q*PR)}`,`V_{d} = ${n(Ta*P*N/1000)}`,`Total = ${n(V)} m³`]};},
r=>{const P=r.i(10,80,1),q=r.i(100,180,10),Ta=57,N=r.i(1,3),h=r.p([1.2,1.5,1.8]),rel=r.p([2,3]);const PR=Math.max(1.5-.3*Math.log10(P*q),.25),V=1e-3*P*q*PR+Ta*P*N/1000,A=V/h,B=sq(A/rel);return{q:`Tanque séptico para P=${P}, q=${q}, T_{a}=57, N=${N} años, profundidad útil ${h} m y largo = ${rel}×ancho. Halla el ancho.`,a:B,u:'m',s:[`V = ${n(V)} m³`,`Área = ${n(A)} m²`,`Ancho = √(A/${rel}) = ${n(B)} m`]};}
]});
SUB('pot',{t:'Plantas de agua potable',
lec:`El agua de río pasa por un tren de procesos hasta ser potable:

- **Coagulación:** se añade sulfato de aluminio para desestabilizar las partículas
- **Floculación:** mezcla lenta para que formen flóculos. Se controla con el gradiente G
- **Sedimentación:** los flóculos caen. Se diseña por carga superficial Q/A
- **Filtración:** arena y antracita retienen lo que queda. Se diseña por tasa de filtración
- **Desinfección:** cloro

## Gradiente de velocidad
G = √(P/(μV)), con P la potencia disipada (W), μ ≈ 1.0×10⁻³ Pa·s y V el volumen. Floculadores: G entre 20 y 70 s⁻¹, y G·t entre 10⁴ y 10⁵.

## Dosificación
Masa de químico por día = Q·dosis.`,
key:['G = √{[[P|μV]]}','Gt = G·t','CS = [[Q|A]]','A_{filtro} = [[Q|tasa]]','kg/d = Q(m^{3}/d)·dosis(g/m^{3})/1000'],
err:'Mezclar rápido en la floculación: rompe los flóculos ya formados.',
x:[['pta','El tratamiento de desagüe sigue un camino parecido'],['des','La sedimentación sigue a Stokes'],['ene','G se basa en potencia']],
g:[
r=>{const P=r.i(5,500,5),V=r.i(10,300,10);return{q:`Potencia ${P} W en un floculador de ${V} m³ (μ=1.0×10⁻³ Pa·s). Halla G.`,a:sq(P/(1e-3*V)),u:'s⁻¹',s:[`G = √(${P}/(10⁻³·${V})) = ${n(sq(P/(1e-3*V)))} s⁻¹`]};},
r=>{const G2=r.i(20,70,5),t=r.i(10,40,5);return{q:`G=${G2} s⁻¹ durante ${t} min. Halla Gt.`,a:G2*t*60,u:'',s:[`Gt = ${G2}·${t*60} = ${G2*t*60}`]};},
r=>{const Q=r.i(20,1000,10),d=r.i(10,60,5);return{q:`Q=${Q} L/s con dosis de ${d} mg/L de sulfato. Halla kg/día.`,a:Q*86.4*d/1000,u:'kg/d',s:[`Q = ${n(Q*86.4)} m³/d`,`Masa = ${n(Q*86.4*d/1000)} kg/d`]};},
r=>{const Q=r.i(20,1000,10),cs=r.i(20,60,5);return{q:`Sedimentador con Q=${Q} L/s y carga superficial ${cs} m³/m²/d. Halla el área.`,a:Q*86.4/cs,u:'m²',s:[`A = ${n(Q*86.4)}/${cs} = ${n(Q*86.4/cs)} m²`]};},
r=>{const Q=r.i(50,1000,10),tasa=r.i(120,360,20),af=r.p([10,15,20,25,30]);const A=Q*86.4/tasa;return{q:`Planta de ${Q} L/s, tasa de filtración ${tasa} m³/m²/d, filtros de ${af} m² cada uno. ¿Cuántos filtros como mínimo, si debe quedar uno extra para lavado?`,a:Math.ceil(A/af)+1,u:'filtros',tol:0,s:[`A = ${n(A)} m²`,`${n(A/af)} → ${Math.ceil(A/af)} filtros + 1 = ${Math.ceil(A/af)+1}`]};}
]});
SUB('lod',{t:'Lodos activados',
lec:`El proceso de **lodos activados** usa microorganismos que comen la materia orgánica del desagüe en un tanque aireado. Luego un sedimentador separa el lodo, y parte se recircula.

## Parámetros de diseño
- Tiempo de retención hidráulica: θ = V/Q
- Relación alimento/microorganismos: F/M = Q·S_{0}/(V·X)
- Edad del lodo: θ_{c} = V·X/(Q_{w}·X_{r}), con Q_{w} el caudal de purga y X_{r} la concentración del lodo purgado
- Carga orgánica: Q·S_{0}

Valores típicos (convencional): θ de 4 a 8 h, F/M de 0.2 a 0.4 kg DBO/kg SSV·d, θ_{c} de 5 a 15 días.

La edad del lodo es el parámetro que más controla el operador: decide qué tan bien se depura y cuánto lodo sale.`,
key:['θ = [[V|Q]]','F/M = [[Q·S_{0}|V·X]]','θ_{c} = [[V·X|Q_{w}X_{r}]]','Carga = Q·S_{0}'],
err:'Calcular F/M con la DBO del efluente en vez de la del afluente.',
x:[['pta','Es la etapa secundaria'],['edo','La DBO se degrada'],['pob','Q del desagüe']],
g:[
r=>{const V=r.i(500,10000,100),Q=r.i(1000,40000,500);return{q:`Tanque de aireación de ${V} m³ con Q=${Q} m³/d. Halla θ en horas.`,a:V/Q*24,u:'h',s:[`θ = ${V}/${Q}·24 = ${n(V/Q*24)} h`]};},
r=>{const Q=r.i(1000,40000,500),S=r.i(150,400,10);return{q:`Q=${Q} m³/d con DBO=${S} mg/L. Halla la carga orgánica.`,a:Q*S/1000,u:'kg/d',s:[`Carga = ${Q}·${S}/1000 = ${n(Q*S/1000)} kg/d`]};},
r=>{const Q=r.i(1000,40000,500),S=r.i(150,400,10),V=r.i(1000,10000,100),X=r.i(1500,4000,100);return{q:`Q=${Q} m³/d, S₀=${S} mg/L, V=${V} m³, X=${X} mg/L. Halla F/M.`,a:Q*S/(V*X),u:'1/d',s:[`F/M = ${Q}·${S}/(${V}·${X}) = ${n(Q*S/(V*X))} d⁻¹`]};},
r=>{const V=r.i(1000,10000,100),X=r.i(1500,4000,100),Qw=r.i(20,300,5),Xr=r.i(6000,12000,500);return{q:`V=${V} m³, X=${X} mg/L, Q_{w}=${Qw} m³/d, X_{r}=${Xr} mg/L. Halla θ_{c}.`,a:V*X/(Qw*Xr),u:'días',s:[`θ_{c} = ${n(V*X/(Qw*Xr))} días`]};},
r=>{const Q=r.i(2000,30000,500),S=r.i(150,350,10),X=r.i(2000,3500,100),FM=r.p([.2,.25,.3,.35]);const V=Q*S/(FM*X);return{q:`Diseña el tanque para Q=${Q} m³/d, S₀=${S} mg/L, X=${X} mg/L y F/M=${FM} d⁻¹. Halla V y escribe θ en horas.`,a:V/Q*24,u:'h',s:[`V = QS₀/(F/M·X) = ${n(V)} m³`,`θ = ${n(V/Q*24)} h`]};}
]});
