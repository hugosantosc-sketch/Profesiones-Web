/* Subtemas adicionales: geotecnia, agua y topografía */
EXT('m13');
SUB('esf2',{t:'Esfuerzos bajo cargas en el suelo',
lec:`Una zapata no carga solo el suelo que está justo debajo: el esfuerzo se reparte y disminuye con la profundidad. Eso decide hasta dónde se asienta el suelo y qué estratos hay que estudiar.

## Carga puntual (Boussinesq)
Δσ_{z} = 3Q/(2πz²)·[1/(1 + (r/z)²)]^{5/2}

Bajo la carga (r = 0): Δσ_{z} = 0.4775·Q/z².

## Método 2:1 (aproximado)
El esfuerzo se reparte en un área que crece 1 en horizontal por cada 2 en vertical:

Δσ_{z} = Q/[(B + z)(L + z)]

## Bulbo de presiones
Bajo una zapata cuadrada, Δσ cae a cerca del 10 % de la presión de contacto a una profundidad de unas 2B. Por eso la exploración debe llegar al menos a esa profundidad.`,
key:['Δσ_{z} = [[3Q|2πz^{2}]][[[1|1+(r/z)^{2}]]]^{5/2}','Δσ_{z} = [[Q|(B+z)(L+z)]]','Bulbo ≈ 2B'],
err:'Calcular el asentamiento con la presión de contacto en todo el estrato, sin reducirla con la profundidad.',
x:[['efe','Se suma al esfuerzo efectivo'],['cns','Asentamientos por consolidación'],['exp','Profundidad de exploración']],
g:[
r=>{const Q=r.i(10,500,10),z=r.i(1,10,.5);return{q:`Carga puntual de ${Q} kN. Halla Δσ bajo la carga a z=${z} m.`,a:.4775*Q/(z*z),u:'kPa',s:[`Δσ = 0.4775·${Q}/${z}² = ${n(.4775*Q/(z*z))} kPa`]};},
r=>{const Q=r.i(10,500,10),z=r.i(1,10,.5),rr=r.i(.5,6,.5);const v=3*Q/(2*PI*z*z)*(1/(1+(rr/z)**2))**2.5;return{q:`Carga puntual de ${Q} kN. Halla Δσ a z=${z} m y r=${rr} m.`,a:v,u:'kPa',s:[`= ${n(3*Q/(2*PI*z*z))}·${n((1/(1+(rr/z)**2))**2.5)} = ${n(v)} kPa`]};},
r=>{const B=r.i(1,4,.1),L=r.i(1,5,.1),q=r.i(100,400,10),z=r.i(.5,8,.5);return{q:`Zapata de ${B}×${L} m con q=${q} kPa. Halla Δσ a z=${z} m con el método 2:1.`,a:q*B*L/((B+z)*(L+z)),u:'kPa',s:[`Q = ${n(q*B*L)} kN`,`Δσ = ${n(q*B*L)}/(${n(B+z)}·${n(L+z)}) = ${n(q*B*L/((B+z)*(L+z)))} kPa`]};},
r=>{const B=r.i(1,4,.1);return{q:`Zapata cuadrada de ${B} m de lado. ¿Hasta qué profundidad bajo el fondo llega aproximadamente el bulbo del 10 %?`,a:2*B,u:'m',s:[`≈ 2B = ${n(2*B)} m`]};},
r=>{const B=r.i(1.5,3.5,.1),q=r.i(150,350,10),Df=r.i(1,2,.1),H=r.i(2,6,.5),Cc=r.i(.15,.45,.01),e0=r.i(.7,1.2,.01),g=r.i(17,19,.5);const z=H/2,s0=g*(Df+z),ds=q*B*B/((B+z)**2),S=Cc*H/(1+e0)*Math.log10((s0+ds)/s0);return{q:`Zapata cuadrada de ${B} m a D_{f}=${Df} m con q=${q} kPa sobre una arcilla normalmente consolidada de ${H} m (C_{c}=${Cc}, e₀=${e0}, γ=${g} kN/m³, sin nivel freático). Usa el método 2:1 en el centro del estrato y halla el asentamiento.`,a:S*100,u:'cm',s:[`z = ${n(z)} m; σ′₀ = ${n(s0)} kPa`,`Δσ = ${n(ds)} kPa`,`S = C_{c}H/(1+e₀)·log((σ′₀+Δσ)/σ′₀) = ${n(S*100)} cm`]};}
]});
SUB('exp',{t:'Exploración geotécnica',
lec:`Sin buen estudio de suelos todo lo demás es adivinanza. La norma **E.050** fija el programa mínimo de exploración.

## Puntos de investigación
Dependen del tipo de edificación y del área. Como regla del orden de magnitud: un punto por cada 225 a 800 m² de área techada según la categoría, y nunca menos de tres en edificaciones importantes. Verifica la tabla vigente.

## Profundidad mínima
- Con zapatas: p = D_{f} + z, con z = 1.5B (B = ancho de la zapata mayor), y nunca menos de 3 m
- Con platea: la profundidad crece con el ancho de la platea; en la práctica se llega a un estrato competente
- Con pilotes: hasta debajo de la punta, más el bulbo

## Ensayos
- Calicatas: muestra alterada e inalterada, perfil visual
- SPT y DPL: resistencia de campo
- Laboratorio: granulometría, límites, humedad, corte, consolidación, químicos (sulfatos, cloruros)`,
key:['p = D_{f} + 1.5B','p ≥ 3 m','N_{puntos} = [[Área|área por punto]]'],
err:'Hacer una sola calicata de 1.5 m para un edificio de cinco pisos.',
x:[['esf2','La profundidad viene del bulbo'],['spt','Ensayo de penetración'],['cla','Clasificación de muestras']],
g:[
r=>{const Df=r.i(.8,3,.1),B=r.i(1,4,.1);return{q:`D_{f}=${Df} m y B=${B} m. Halla la profundidad mínima de exploración p = D_{f} + 1.5B (mínimo 3 m).`,a:Math.max(Df+1.5*B,3),u:'m',s:[`= ${n(Math.max(Df+1.5*B,3))} m`]};},
r=>{const A=r.i(200,8000,50),a=r.p([225,450,800]);return{q:`Área techada ${A} m² y un punto cada ${a} m². ¿Cuántos puntos? (redondea arriba, mínimo 3)`,a:Math.max(Math.ceil(A/a),3),u:'',tol:0,s:[`= ⌈${A}/${a}⌉ = ${Math.max(Math.ceil(A/a),3)}`]};},
r=>{const L=r.i(5,30,1),D=r.i(.3,1,.1),Df=r.i(1,3,.5);return{q:`Pilotes de ${L} m y diámetro ${D} m bajo cabezal a D_{f}=${Df} m. Si se exige explorar hasta 6D bajo la punta, ¿hasta qué profundidad desde la superficie?`,a:Df+L+6*D,u:'m',s:[`= ${Df} + ${L} + 6·${D} = ${n(Df+L+6*D)} m`]};},
r=>{const nn=r.i(3,15,1),p=r.i(3,10,.5),c=r.i(80,200,10),l=r.i(400,1500,50);return{q:`Programa: ${nn} calicatas de ${p} m a S/${c} por metro, más laboratorio de S/${l} por punto. Halla el costo.`,a:nn*(p*c+l),u:'S/',s:[`= ${nn}(${p}·${c} + ${l}) = S/ ${n(nn*(p*c+l))}`]};},
r=>{const pis=r.i(3,10,1),B=r.i(1.5,3.5,.1),Df=r.i(1.2,2.5,.1),A=r.i(300,2000,50),ap=r.p([225,450]),c=r.i(100,200,10),l=r.i(600,1500,50);const p=Math.max(Df+1.5*B,3),N=Math.max(Math.ceil(A/ap),3);return{q:`Edificio de ${pis} pisos, área techada ${A} m² (un punto cada ${ap} m²), zapata mayor B=${B} m a D_{f}=${Df} m. Excavación S/${c}/m y laboratorio S/${l} por punto. Halla el costo del programa.`,a:N*(p*c+l),u:'S/',s:[`Puntos = ${N}`,`Profundidad = ${n(p)} m`,`Costo = S/ ${n(N*(p*c+l))}`]};}
]});
SUB('perm',{t:'Ensayos de permeabilidad',
lec:`La permeabilidad k decide cuánta agua pasa por una presa, cuánto bombear en una excavación y qué tan rápido consolida una arcilla. Varía muchísimo: de 1 cm/s en grava limpia a menos de 10⁻⁷ cm/s en arcilla.

## Carga constante (suelos granulares)
k = Q·L/(A·h·t)

## Carga variable (suelos finos)
k = (a·L)/(A·t)·ln(h_{1}/h_{2}), con a el área del tubo delgado.

## Hazen (estimación para arenas)
k ≈ C·D_{10}², con D_{10} en cm, k en cm/s y C ≈ 100.

## Bombeo en pozo (acuífero libre)
k = Q·ln(r_{2}/r_{1})/[π(h_{2}² − h_{1}²)]`,
key:['k = [[QL|Aht]]','k = [[aL|At]]ln[[h_{1}|h_{2}]]','k ≈ 100D_{10}^{2}','k = [[Q ln(r_{2}/r_{1})|π(h_{2}^{2}−h_{1}^{2})]]'],
err:'Usar el ensayo de carga constante en arcilla: el caudal es tan pequeño que no se mide bien.',
x:[['flu','Ley de Darcy'],['cns','La consolidación depende de k'],['pti','Filtraciones en presas']],
g:[
r=>{const Q=r.i(100,1500,10),L=r.i(10,30,1),A=r.i(50,100,1),h=r.i(20,80,1),t=r.i(60,600,10);return{q:`Carga constante: Q=${Q} cm³ en t=${t} s, L=${L} cm, A=${A} cm², h=${h} cm. Halla k.`,a:Q*L/(A*h*t),u:'cm/s',tol:.02,s:[`k = ${n(Q*L/(A*h*t),4)} cm/s`]};},
r=>{const D=r.i(.005,.05,.001);return{q:`Arena con D₁₀=${D*10} mm. Estima k con Hazen (C=100).`,a:100*D*D,u:'cm/s',tol:.02,s:[`D₁₀ = ${n(D)} cm`,`k = 100·${n(D)}² = ${n(100*D*D,4)} cm/s`]};},
r=>{const a=r.i(.2,1.5,.1),L=r.i(8,15,1),A=r.i(30,80,1),t=r.i(600,7200,60),h1=r.i(80,150,5),h2=r.i(30,75,5);return{q:`Carga variable: a=${a} cm², L=${L} cm, A=${A} cm², h de ${h1} a ${h2} cm en ${t} s. Halla k.`,a:a*L/(A*t)*Math.log(h1/h2),u:'cm/s',tol:.02,s:[`k = ${n(a*L/(A*t)*Math.log(h1/h2),4)} cm/s`]};},
r=>{const Q=r.i(.005,.05,.001),r1=r.i(5,15,1),r2=r.i(20,60,5),h1=r.i(5,10,.1),h2=h1+r.i(.3,2,.1);return{q:`Bombeo en acuífero libre: Q=${Q} m³/s, pozos de observación a ${r1} y ${r2} m con h=${h1} y ${n(h2)} m. Halla k.`,a:Q*Math.log(r2/r1)/(PI*(h2*h2-h1*h1)),u:'m/s',tol:.02,s:[`k = ${n(Q*Math.log(r2/r1)/(PI*(h2*h2-h1*h1)),4)} m/s`]};},
r=>{const k=r.i(1,50,1)*1e-5,H=r.i(2,8,.5),Nf=r.i(3,6,1),Nd=r.i(8,16,1),L=r.i(20,200,10);const q=k*H*Nf/Nd*L*86400;return{q:`Excavación con tablestacas de ${L} m de largo. k=${n(k,3)} m/s, diferencia de carga ${H} m, red de flujo N_{f}=${Nf}, N_{d}=${Nd}. ¿Cuánta agua hay que bombear por día?`,a:q,u:'m³/día',s:[`q = kH·N_{f}/N_{d} = ${n(k*H*Nf/Nd,4)} m³/s/m`,`Q = ${n(q)} m³/día`]};}
]});
EXT('m14');
SUB('grp',{t:'Grupos de pilotes',
lec:`Los pilotes casi siempre trabajan en grupo bajo un cabezal. El grupo no siempre resiste la suma de los pilotes individuales.

## Eficiencia (Converse-Labarre)
E = 1 − θ[(n − 1)m + (m − 1)n]/(90mn), con θ = arctan(D/s) en grados, m filas y n pilotes por fila.

Q_{grupo} = E·N·Q_{pilote}

## En arcillas: falla en bloque
El grupo puede hundirse como un bloque: Q_{bloque} = 2(B_{g} + L_{g})·L·c + 9c·B_{g}L_{g}. Se toma el menor entre el bloque y la suma eficiente.

## Carga por pilote con momento
P_{i} = P/N ± M·x_{i}/Σx²

El espaciamiento usual es de 2.5D a 3.5D.`,
key:['E = 1 − θ[[(n−1)m + (m−1)n|90mn]]','Q_{g} = E·N·Q_{p}','P_{i} = [[P|N]] ± [[Mx_{i}|Σx^{2}]]'],
err:'Juntar mucho los pilotes para ahorrar en el cabezal: baja la eficiencia.',
x:[['pil','Capacidad de un pilote'],['zap','El cabezal es como una zapata'],['cz2','Zapatas combinadas']],
g:[
r=>{const D=r.i(.3,1,.05),s=r.i(.9,3.5,.1);return{q:`D=${D} m y s=${s} m. Halla θ = arctan(D/s).`,a:atand(D/s),u:'°',s:[`= ${n(atand(D/s))}°`]};},
r=>{const D=r.i(.3,.8,.05),k=r.i(2.5,4,.5),m=r.i(2,4,1),nn=r.i(2,5,1);const th=atand(1/k),E=1-th*((nn-1)*m+(m-1)*nn)/(90*m*nn);return{q:`Grupo de ${m}×${nn} pilotes con s=${k}D. Halla la eficiencia.`,a:E,u:'',s:[`θ = ${n(th)}°`,`E = ${n(E)}`]};},
r=>{const N=r.i(4,20,1),Q=r.i(30,200,5),E=r.i(.6,.95,.01);return{q:`${N} pilotes de ${Q} t cada uno, E=${E}. Halla Q_{grupo}.`,a:E*N*Q,u:'t',s:[`= ${n(E*N*Q)} t`]};},
r=>{const P=r.i(100,800,10),M=r.i(10,150,5),s=r.i(1,2,.1);const xs=[-s,s,-s,s],Sx=4*s*s;return{q:`Cabezal de 4 pilotes en cuadrado a ±${s} m del centro, P=${P} t y M=${M} t·m. Halla la carga del pilote más cargado.`,a:P/4+M*s/Sx,u:'t',s:[`Σx² = ${n(Sx)}`,`P = ${P}/4 + ${M}·${s}/${n(Sx)} = ${n(P/4+M*s/Sx)} t`]};},
r=>{const D=.5,s=r.i(1.25,2,.25),m=3,nn=3,L=r.i(10,25,1),c=r.i(20,80,5);const Qp=(PI*D*L*c*.8+9*c*PI*D*D/4)/9.81,th=atand(D/s),E=1-th*((nn-1)*m+(m-1)*nn)/(90*m*nn),Bg=2*s+D,Qb=(2*(Bg+Bg)*L*c+9*c*Bg*Bg)/9.81;const Qg=Math.min(E*9*Qp,Qb);return{q:`Grupo de 3×3 pilotes de D=0.5 m y L=${L} m, s=${s} m, en arcilla con c=${c} kPa (α=0.8). Halla la capacidad última del grupo como el menor entre E·ΣQ y el bloque.`,a:Qg,u:'t',s:[`Q_{p} = ${n(Qp)} t; E = ${n(E)} → ${n(E*9*Qp)} t`,`Bloque ${n(Bg)} m: ${n(Qb)} t`,`Q_{g} = ${n(Qg)} t`]};}
]});
SUB('fne',{t:'Pilotes: carga lateral y fricción negativa',
lec:`## Fricción negativa
Si el suelo blando que rodea al pilote se asienta (por un relleno nuevo o por bajar el nivel freático), arrastra al pilote hacia abajo. Esa fuerza se suma a la carga en vez de resistirla:

Q_{n} = p·L_{n}·β·σ′_{v,media}, con p el perímetro, L_{n} la longitud del estrato que se asienta y β ≈ 0.2 a 0.3.

## Carga lateral
Sismo, oleaje y empuje generan fuerzas horizontales. Para un pilote largo en suelo con módulo de reacción constante:

- Longitud característica: R = (EI/k_{h}D)^{1/4}
- Desplazamiento en la cabeza (libre): y ≈ 2H·R³/(EI) aproximadamente

Un pilote es "largo" si su longitud supera 4R: la punta deja de importar en el comportamiento lateral.`,
key:['Q_{n} = pL_{n}βσ′_{v}','R = ([[EI|k_{h}D]])^{1/4}','Largo si L > 4R'],
err:'Contar como resistencia la fricción en un estrato blando que se está asentando.',
x:[['pil','Capacidad axial'],['cns','El estrato se asienta'],['grp','Grupos de pilotes']],
g:[
r=>{const D=r.i(.3,1.2,.05);return{q:`Pilote circular de D=${D} m. Halla su perímetro.`,a:PI*D,u:'m',s:[`= ${n(PI*D)} m`]};},
r=>{const D=r.i(.3,1,.05),L=r.i(3,15,.5),g=r.i(6,9,.5),b=r.i(.2,.3,.05);const s=g*L/2,Q=PI*D*L*b*s;return{q:`Pilote de D=${D} m atraviesa ${L} m de arcilla blanda en consolidación (γ′=${g} kN/m³, β=${b}). Halla la fricción negativa.`,a:Q,u:'kN',s:[`σ′ medio = ${n(s)} kPa`,`Q_{n} = π·${D}·${L}·${b}·${n(s)} = ${n(Q)} kN`]};},
r=>{const EI=r.i(50,800,10)*1000,kh=r.i(5000,40000,1000),D=r.i(.4,1.2,.1);return{q:`Pilote con EI=${EI} kN·m², k_{h}=${kh} kN/m³, D=${D} m. Halla R.`,a:(EI/(kh*D))**.25,u:'m',s:[`R = (${EI}/(${kh}·${D}))^{1/4} = ${n((EI/(kh*D))**.25)} m`]};},
r=>{const EI=r.i(50,800,10)*1000,kh=r.i(5000,40000,1000),D=r.i(.4,1.2,.1),H=r.i(20,200,5);const R=(EI/(kh*D))**.25;return{q:`Pilote largo con EI=${EI}, k_{h}=${kh}, D=${D} m, cabeza libre, H=${H} kN. Estima y = 2HR³/EI.`,a:2*H*R**3/EI*1000,u:'mm',s:[`R = ${n(R)} m`,`y = ${n(2*H*R**3/EI*1000)} mm`]};},
r=>{const D=r.i(.4,.8,.05),Ln=r.i(4,12,.5),g=r.i(6,9,.5),b=.25,Qu=r.i(800,3000,50),FS=r.p([2,2.5,3]);const Qn=PI*D*Ln*b*g*Ln/2;return{q:`Pilote de capacidad última ${Qu} kN (sin contar el estrato blando), D=${D} m, ${Ln} m de arcilla en consolidación (γ′=${g}, β=0.25), FS=${FS}. ¿Qué carga de servicio puede recibir de la estructura? (Q = Q_{u}/FS − Q_{n})`,a:Qu/FS-Qn,u:'kN',s:[`Q_{n} = ${n(Qn)} kN`,`Q = ${n(Qu/FS)} − ${n(Qn)} = ${n(Qu/FS-Qn)} kN`]};}
]});
SUB('ael',{t:'Asentamiento elástico de zapatas',
lec:`En arenas y suelos no saturados el asentamiento ocurre casi al aplicar la carga. Se estima con la teoría elástica:

S_{e} = q·B·(1 − μ²)·I_{f}/E_{s}

- E_{s}: módulo del suelo (arena suelta 10–25 MPa, densa 35–80 MPa, grava 100+)
- μ: relación de Poisson (0.25–0.35)
- I_{f}: factor de forma y rigidez (≈ 0.82 para una zapata cuadrada rígida; varía con la forma y la rigidez)

## Con el SPT (Meyerhof, arenas)
q_{adm} para 25 mm de asentamiento ≈ 12N kPa (B ≤ 1.2 m) o 8N·((B + 0.3)/B)² (B > 1.2 m).

## Distorsión angular
Asentamiento diferencial entre dos apoyos dividido por su distancia. Límites típicos: 1/500 para edificios con muros de albañilería; 1/300 ya produce fisuras.`,
key:['S_{e} = [[qB(1−μ^{2})I_{f}|E_{s}]]','q_{adm} = 8N([[B+0.3|B]])^{2}','β = [[ΔS|L]] ≤ [[1|500]]'],
err:'Mirar solo el asentamiento total y olvidar el diferencial.',
x:[['cns','Consolidación en arcillas'],['spt','Número de golpes N'],['pdf','El diferencial genera momentos']],
g:[
r=>{const q=r.i(100,400,10),B=r.i(1,4,.1),mu=r.p([.25,.3,.35]),I=r.p([.82,.88,.95,1.12]),E=r.i(10,80,1);return{q:`q=${q} kPa, B=${B} m, μ=${mu}, I_{f}=${I}, E_{s}=${E} MPa. Halla S_{e}.`,a:q*B*(1-mu*mu)*I/(E*1000)*1000,u:'mm',s:[`S = ${n(q*B*(1-mu*mu)*I/(E*1000)*1000)} mm`]};},
r=>{const N=r.i(5,50,1);return{q:`Zapata pequeña (B ≤ 1.2 m) sobre arena con N=${N}. Estima q_{adm} para 25 mm.`,a:12*N,u:'kPa',s:[`= 12·${N} = ${12*N} kPa`]};},
r=>{const N=r.i(5,50,1),B=r.i(1.3,4,.1);return{q:`Zapata de B=${B} m sobre arena con N=${N}. Estima q_{adm} para 25 mm.`,a:8*N*((B+.3)/B)**2,u:'kPa',s:[`= 8·${N}·(${n(B+.3)}/${B})² = ${n(8*N*((B+.3)/B)**2)} kPa`]};},
r=>{const s1=r.i(5,40,1),s2=s1+r.i(1,25,1),L=r.i(3,8,.5);return{q:`Dos columnas a ${L} m se asientan ${s1} y ${s2} mm. Halla 1/β (L/ΔS).`,a:L*1000/(s2-s1),u:'',s:[`= ${L*1000}/${s2-s1} = ${n(L*1000/(s2-s1))}`]};},
r=>{const B1=r.i(1.2,2,.1),B2=r.i(2.2,3.5,.1),q=r.i(150,300,10),E=r.i(15,50,1),L=r.i(4,7,.5);const S=B=>q*B*(1-.09)*.82/(E*1000)*1000;const d=Math.abs(S(B2)-S(B1));return{q:`Dos zapatas cuadradas con la misma presión q=${q} kPa: B=${B1} m y ${B2} m, separadas ${L} m. Arena con E_{s}=${E} MPa, μ=0.3, I_{f}=0.82. Halla la distorsión L/ΔS. (Misma presión no significa mismo asentamiento.)`,a:L*1000/d,u:'',s:[`S₁ = ${n(S(B1))} mm; S₂ = ${n(S(B2))} mm`,`L/ΔS = ${n(L*1000/d)} ${L*1000/d>=500?'(cumple 1/500)':'(no cumple 1/500)'}`]};}
]});
EXT('m29');
SUB('mej',{t:'Mejoramiento de suelos',
lec:`Cuando el suelo es malo hay tres caminos: cimentar más hondo (pilotes), reemplazarlo o mejorarlo.

## Reemplazo
Se excava el suelo blando y se rellena con material granular compactado al 95 % del Proctor. Volumen de préstamo: V_{p} = V·γ_{d,compactado}/γ_{d,préstamo}.

## Precarga y drenes verticales
Se coloca un relleno temporal para que la arcilla consolide antes de la obra. Como el tiempo depende de H², los **drenes** acortan el camino del agua: t = T·H_{dr}²/c.

## Otras técnicas
- Columnas de grava (vibrosustitución)
- Compactación dinámica: profundidad mejorada D ≈ n√(W·h), con W en t, h en m y n ≈ 0.5
- Inyecciones y mezcla con cemento o cal
- Geosintéticos de refuerzo`,
key:['V_{p} = V[[γ_{d,c}|γ_{d,p}]]','t = [[TH_{dr}^{2}|c_{v}]]','D ≈ 0.5√{Wh}'],
err:'Calcular el préstamo con el volumen geométrico de la excavación sin considerar el esponjamiento y la compactación.',
x:[['cpt','Proctor'],['cns','Tiempo de consolidación'],['liq','Mejorar suelos licuables']],
g:[
r=>{const V=r.i(100,5000,50),gc=r.i(1.9,2.2,.01),gp=r.i(1.5,1.8,.01);return{q:`Relleno de ${V} m³ compactado a γ_{d}=${gc} t/m³ con préstamo de γ_{d}=${gp} t/m³. Halla el volumen de préstamo.`,a:V*gc/gp,u:'m³',s:[`= ${V}·${gc}/${gp} = ${n(V*gc/gp)} m³`]};},
r=>{const W=r.i(8,30,1),h=r.i(10,30,1);return{q:`Compactación dinámica con W=${W} t desde h=${h} m. Estima la profundidad mejorada.`,a:.5*sq(W*h),u:'m',s:[`D = 0.5√(${W}·${h}) = ${n(.5*sq(W*h))} m`]};},
r=>{const H=r.i(4,15,.5),c=r.i(1,8,.5),T=.848;return{q:`Arcilla de ${H} m drenada por una sola cara, c_{v}=${c} m²/año. ¿Cuántos años para 90 % de consolidación (T=0.848)?`,a:T*H*H/c,u:'años',s:[`t = 0.848·${H}²/${c} = ${n(T*H*H/c)} años`]};},
r=>{const s=r.i(1,3,.25),c=r.i(1,8,.5),T=.848;const Hd=s/2;return{q:`Con drenes verticales a ${s} m, el camino del agua es unos ${n(Hd)} m (horizontal). Con c=${c} m²/año, ¿cuántos meses para 90 %?`,a:T*Hd*Hd/c*12,u:'meses',s:[`t = 0.848·${n(Hd)}²/${c} = ${n(T*Hd*Hd/c*12)} meses`]};},
r=>{const A=r.i(500,5000,100),e=r.i(.8,2.5,.1),ce=r.i(15,40,1),cr=r.i(35,80,1),gc=2.1,gp=r.i(1.6,1.8,.05);const V=A*e,Vp=V*gc/gp,C=V*ce+Vp*cr;return{q:`Reemplazo de ${e} m de suelo blando en ${A} m². Excavar y eliminar cuesta S/${ce}/m³; el relleno compactado (γ_{d}=2.1 t/m³ con préstamo de ${gp}) cuesta S/${cr} por m³ de préstamo. Halla el costo total.`,a:C,u:'S/',s:[`Excavación ${n(V)} m³ → S/ ${n(V*ce)}`,`Préstamo ${n(Vp)} m³ → S/ ${n(Vp*cr)}`,`Total S/ ${n(C)}`]};}
]});
EXT('m15');
SUB('cmv',{t:'Cantidad de movimiento',
lec:`Cuando el agua cambia de dirección o de velocidad, empuja lo que la desvía. Por eso los codos de tuberías necesitan **bloques de anclaje** y las compuertas sienten fuerzas.

## Ecuación de cantidad de movimiento
ΣF = ρQ(V_{2} − V_{1}), en cada dirección.

## Chorro sobre una placa
- Placa fija perpendicular: F = ρQV
- Álabe que desvía θ: F_{x} = ρQV(1 − cos θ)

## Codo de tubería
En un codo de ángulo θ con presión p y área A, la fuerza resultante es aproximadamente:
F ≈ 2(pA + ρQV)·sen(θ/2)

Ese empuje lo toma un dado de concreto contra el terreno.`,
key:['ΣF = ρQ(V_{2} − V_{1})','F = ρQV','F_{x} = ρQV(1 − cos θ)','F ≈ 2(pA + ρQV) sen[[θ|2]]'],
err:'Olvidar la presión del agua: en tuberías a presión suele ser mucho mayor que el término de velocidad.',
x:[['fbe','Continuidad y Bernoulli'],['gar','Golpe de ariete'],['sal','El resalto se resuelve con cantidad de movimiento']],
g:[
r=>{const Q=r.i(.01,.5,.01),V=r.i(2,30,.5);return{q:`Chorro con Q=${Q} m³/s y V=${V} m/s contra una placa fija perpendicular. Halla F.`,a:1000*Q*V/1000,u:'kN',s:[`F = ρQV = ${n(Q*V)} kN`]};},
r=>{const Q=r.i(.01,.5,.01),V=r.i(2,30,.5),t=r.i(30,180,15);return{q:`Álabe fijo que desvía ${t}° un chorro de Q=${Q} m³/s y V=${V} m/s. Halla F_{x}.`,a:Q*V*(1-cosd(t)),u:'kN',s:[`= ${n(Q*V)}·(1 − cos ${t}°) = ${n(Q*V*(1-cosd(t)))} kN`]};},
r=>{const D=r.i(.1,1,.05),Q=r.i(.01,1,.01);return{q:`Tubería de D=${D} m con Q=${Q} m³/s. Halla V.`,a:Q/(PI*D*D/4),u:'m/s',s:[`V = ${n(Q/(PI*D*D/4))} m/s`]};},
r=>{const D=r.i(.15,1,.05),p=r.i(100,1500,50),t=r.p([22.5,45,90]),Q=r.i(.02,.8,.01);const A=PI*D*D/4,V=Q/A,F=2*(p*A+Q*V)*Math.sin(t*PI/360);return{q:`Codo de ${t}° en tubería de D=${D} m con p=${p} kPa y Q=${Q} m³/s. Halla el empuje resultante.`,a:F,u:'kN',s:[`pA = ${n(p*A)} kN; ρQV = ${n(Q*V)} kN`,`F = 2(${n(p*A+Q*V)})·sen(${t/2}°) = ${n(F)} kN`]};},
r=>{const D=r.i(.2,.8,.05),p=r.i(300,1500,50),t=r.p([45,90]),Q=r.i(.05,.6,.01),qs=r.i(100,250,10),mu=.5;const A=PI*D*D/4,F=2*(p*A+Q*Q/A)*Math.sin(t*PI/360);return{q:`Codo de ${t}°, D=${D} m, p=${p} kPa, Q=${Q} m³/s. El dado transmite el empuje al terreno, que admite ${qs} kPa lateral. ¿Qué área de contacto vertical necesita el dado?`,a:F/qs,u:'m²',s:[`F = ${n(F)} kN`,`A = F/q = ${n(F/qs)} m²`]};}
]});
SUB('sim',{t:'Análisis dimensional y modelos',
lec:`Las presas, bocatomas y aliviaderos complejos se ensayan en **modelos a escala** en laboratorio. Para que el modelo represente al prototipo, debe ser semejante.

## Semejanza de Froude
En flujos con superficie libre (canales, vertederos) domina la gravedad: el número de Froude debe ser igual en modelo y prototipo. Con escala de longitudes L_{r} = L_{p}/L_{m}:

- Velocidades: V_{r} = L_{r}^{1/2}
- Tiempos: t_{r} = L_{r}^{1/2}
- Caudales: Q_{r} = L_{r}^{5/2}
- Fuerzas: F_{r} = L_{r}³

## Semejanza de Reynolds
En tuberías a presión domina la viscosidad: Re igual. Con el mismo fluido, V_{r} = 1/L_{r}.

## Teorema Π de Buckingham
Un problema con n variables y k dimensiones se describe con n − k grupos adimensionales.`,
key:['V_{r} = L_{r}^{1/2}','Q_{r} = L_{r}^{5/2}','F_{r} = L_{r}^{3}','Π: n − k grupos'],
err:'Escalar el caudal con L_{r}³ en vez de L_{r}^{5/2}.',
x:[['ene2','El número de Froude'],['fpe','El número de Reynolds'],['boc','Se modelan bocatomas']],
g:[
r=>{const L=r.p([10,15,20,25,30,40,50,60,80,100]),V=r.i(.2,3,.05);return{q:`Modelo a escala 1:${L}. En el modelo V=${V} m/s. Halla V en el prototipo.`,a:V*sq(L),u:'m/s',s:[`V_{p} = ${V}·√${L} = ${n(V*sq(L))} m/s`]};},
r=>{const L=r.p([10,15,20,25,30,40,50,60,80,100]),Q=r.i(1,100,1);return{q:`Escala 1:${L}. En el modelo Q=${Q} L/s. Halla Q en el prototipo.`,a:Q/1000*L**2.5,u:'m³/s',s:[`Q_{p} = ${Q/1000}·${L}^{2.5} = ${n(Q/1000*L**2.5)} m³/s`]};},
r=>{const L=r.p([10,15,20,25,30,40,50,60,80,100]),Q=r.i(50,3000,50);return{q:`Prototipo con Q=${Q} m³/s y escala 1:${L}. ¿Qué caudal debe dar la bomba del laboratorio en L/s?`,a:Q/L**2.5*1000,u:'L/s',s:[`Q_{m} = ${Q}/${L}^{2.5} = ${n(Q/L**2.5*1000)} L/s`]};},
r=>{const L=r.p([10,15,20,25,30,40,50]),t=r.i(1,60,1);return{q:`En un modelo 1:${L} una ola tarda ${t} s en llegar. ¿Cuánto tarda en el prototipo?`,a:t*sq(L),u:'s',s:[`t_{p} = ${t}·√${L} = ${n(t*sq(L))} s`]};},
r=>{const Qp=r.i(200,2500,50),Qmax=r.i(50,250,10),F=r.i(5,80,1);let L=Math.ceil((Qp/(Qmax/1000))**.4);return{q:`El laboratorio tiene una bomba de ${Qmax} L/s y el aliviadero debe probarse con ${Qp} m³/s. ¿Qué escala mínima 1:L permite? Con ella, si en el modelo una compuerta siente ${F} N, ¿cuánto siente en el prototipo? Escribe L (entero, redondeado arriba).`,a:L,u:'',tol:0,s:[`L ≥ (${Qp}/${Qmax/1000})^{0.4} = ${n((Qp/(Qmax/1000))**.4)} → 1:${L}`,`F_{p} = ${F}·${L}³ = ${n(F*L**3/1000)} kN`]};}
]});
SUB('hcr',{t:'Redes de tuberías: Hardy Cross',
lec:`Una red de agua potable con mallas cerradas no se resuelve con una sola ecuación: se itera.

## Reglas
- En cada nudo: caudal que entra = caudal que sale
- En cada malla: la suma de pérdidas, con signo según el sentido, es cero

## Método de Hardy Cross
1. Supón caudales que cumplan los nudos
2. Calcula pérdidas h = rQ^{n} (Hazen-Williams: n = 1.852)
3. Corrige cada malla: ΔQ = −Σh/(n·Σ|h/Q|)
4. Repite hasta que ΔQ sea pequeño

## Resistencia de Hazen-Williams
r = 10.67·L/(C^{1.852}·D^{4.87}) (SI)

Hoy se usa software (EPANET, WaterGEMS), pero entender Hardy Cross permite detectar resultados absurdos.`,
key:['h = rQ^{n}','ΔQ = −[[Σh|nΣ|h/Q|]]','r = [[10.67L|C^{1.852}D^{4.87}]]'],
err:'Olvidar el signo de las pérdidas según el sentido del flujo en la malla.',
x:[['fpe','Pérdidas en tuberías'],['res2','Redes de distribución'],['pob','Caudales de diseño']],
g:[
r=>{const L=r.i(100,1500,50),C=r.p([100,120,130,140,150]),D=r.p([.1,.15,.2,.25,.3]);return{q:`Tubería de L=${L} m, C=${C}, D=${D} m. Halla r de Hazen-Williams.`,a:10.67*L/(C**1.852*D**4.87),u:'',tol:.01,s:[`r = ${n(10.67*L/(C**1.852*D**4.87))}`]};},
r=>{const rr=r.i(50,5000,50),Q=r.i(.005,.08,.001);return{q:`r=${rr} y Q=${Q} m³/s. Halla h = rQ^{1.852}.`,a:rr*Q**1.852,u:'m',s:[`= ${n(rr*Q**1.852)} m`]};},
r=>{const h=[r.i(1,10,.1),r.i(1,10,.1),-r.i(1,10,.1),-r.i(1,10,.1)],Q=[r.i(.01,.05,.005),r.i(.01,.05,.005),r.i(.01,.05,.005),r.i(.01,.05,.005)];const S=h.reduce((a,b)=>a+b),D=h.reduce((a,b,i)=>a+Math.abs(b)/Q[i],0);return{q:`Malla con pérdidas (con signo) ${h.join(', ')} m y caudales ${Q.join(', ')} m³/s. Halla ΔQ (n=1.852).`,a:-S/(1.852*D),u:'m³/s',tol:.01,s:[`Σh = ${n(S)}`,`Σ|h/Q| = ${n(D)}`,`ΔQ = ${n(-S/(1.852*D),4)} m³/s`]};},
r=>{const Qt=r.i(20,100,1),qa=r.i(5,Qt-5,1);return{q:`Al nudo llegan ${Qt} L/s; una tubería se lleva ${qa} L/s y el consumo del nudo es 0. ¿Cuánto lleva la otra tubería?`,a:Qt-qa,u:'L/s',s:[`= ${Qt-qa} L/s`]};},
r=>{const r1=r.i(500,3000,100),r2=r.i(500,3000,100),Q=r.i(.02,.1,.005);let q1=Q/2;for(let i=0;i<30;i++){const h1=r1*q1**1.852,h2=r2*(Q-q1)**1.852;q1-= (h1-h2)/(1.852*(h1/q1+h2/(Q-q1)));}return{q:`Dos tuberías en paralelo (una malla) con r₁=${r1} y r₂=${r2} reparten Q=${Q} m³/s. Itera Hardy Cross hasta converger y halla Q₁ en L/s.`,a:q1*1000,u:'L/s',s:[`Condición: r₁Q₁^{1.852} = r₂Q₂^{1.852}`,`Q₁/Q₂ = (r₂/r₁)^{0.54} = ${n((r2/r1)**(1/1.852))}`,`Q₁ = ${n(q1*1000)} L/s`]};}
]});
EXT('m16');
SUB('rem',{t:'Curvas de remanso',
lec:`Cuando un canal tiene una presa, una compuerta o un cambio de pendiente, el tirante deja de ser el normal y varía gradualmente: es el **flujo gradualmente variado**.

## Clasificación
- Pendiente suave (y_{n} > y_{c}): curvas M1 (detrás de una presa, el agua sube), M2 (antes de una caída), M3
- Pendiente fuerte (y_{n} < y_{c}): curvas S1, S2, S3

## Método del paso directo
Entre dos secciones de tirantes conocidos:

Δx = (E_{2} − E_{1})/(S_{0} − S̄_{f})

con E = y + V²/2g y S_{f} de Manning: S_{f} = (nV/R^{2/3})².

La curva M1 detrás de una presa puede inundar terrenos aguas arriba: por eso se calcula hasta dónde llega el remanso.`,
key:['Δx = [[E_{2}−E_{1}|S_{0}−S̄_{f}]]','S_{f} = ([[nV|R^{2/3}]])^{2}','E = y + [[V^{2}|2g]]'],
err:'Usar la pendiente del fondo en vez de la de energía en la sección.',
x:[['man','Flujo uniforme'],['ene2','Energía específica'],['pgr','Las presas generan remansos']],
g:[
r=>{const yn=r.i(.5,4,.05),yc=r.i(.3,3,.05);return{q:`y_{n}=${yn} m y y_{c}=${yc} m. ¿La pendiente es suave (1) o fuerte (2)?`,a:yn>yc?1:2,u:'',tol:0,s:[yn>yc?'y_{n} > y_{c}: suave (M)':'y_{n} < y_{c}: fuerte (S)']};},
r=>{const nn=r.p([.013,.015,.02,.025,.03]),V=r.i(.5,4,.05),R=r.i(.3,2,.05);return{q:`n=${nn}, V=${V} m/s, R=${R} m. Halla S_{f}.`,a:(nn*V/R**(2/3))**2,u:'',tol:.01,s:[`S_{f} = ${n((nn*V/R**(2/3))**2,4)}`]};},
r=>{const y=r.i(.5,4,.05),V=r.i(.3,4,.05);return{q:`y=${y} m y V=${V} m/s. Halla E.`,a:y+V*V/(2*G),u:'m',s:[`E = ${n(y+V*V/(2*G),4)} m`]};},
r=>{const E1=r.i(1,3,.001),dE=r.i(.02,.3,.005),S0=r.i(.0005,.003,.0001),Sf=r.i(.0001,.0004,.00005);return{q:`E₁=${n(E1,4)} m, E₂=${n(E1+dE,4)} m, S₀=${S0}, S̄_{f}=${Sf}. Halla Δx.`,a:dE/(S0-Sf),u:'m',s:[`Δx = ${dE}/(${S0} − ${Sf}) = ${n(dE/(S0-Sf))} m`]};},
r=>{const b=r.i(3,10,.5),nn=r.p([.015,.02,.025]),S0=r.i(.0005,.002,.0001),q=r.i(1,4,.1),y1=r.i(2.5,4,.1);const Q=q*b;const sec=y=>{const A=b*y,R=A/(b+2*y),V=Q/A;return{E:y+V*V/(2*G),Sf:(nn*V/R**(2/3))**2};};const y2=y1-.3;const a=sec(y1),c=sec(y2);const dx=(a.E-c.E)/(S0-(a.Sf+c.Sf)/2);return{q:`Canal rectangular b=${b} m, n=${nn}, S₀=${S0}, Q=${n(Q)} m³/s. Detrás de una presa el tirante es ${y1} m. ¿A qué distancia aguas arriba el tirante baja a ${n(y2)} m? (un paso)`,a:dx,u:'m',s:[`E₁ = ${n(a.E,4)}, S_{f1} = ${n(a.Sf,4)}`,`E₂ = ${n(c.E,4)}, S_{f2} = ${n(c.Sf,4)}`,`Δx = ${n(dx)} m`]};}
]});
SUB('cai',{t:'Caídas y rápidas',
lec:`En terrenos de sierra el canal no puede seguir la pendiente natural: el agua iría demasiado rápida y erosionaría todo. Se baja el nivel con **caídas** (escalones) o **rápidas** (tramos de mucha pendiente) y se disipa la energía al pie.

## Caída vertical
- Número de caída: D = q²/(g·h³), con q el caudal unitario y h la altura de la caída
- Longitud hasta el impacto: L_{d} = 4.30·h·D^{0.27}
- Tirante al pie: y_{1} = 0.54·h·D^{0.425}
- Tirante conjugado: y_{2} = 1.66·h·D^{0.27}

## Rápida
La velocidad al final se estima con la energía: V ≈ √(2g(H − pérdidas)). Al pie va un **colchón disipador** donde se forma el resalto.`,
key:['D = [[q^{2}|gh^{3}]]','L_{d} = 4.30hD^{0.27}','y_{1} = 0.54hD^{0.425}','y_{2} = 1.66hD^{0.27}'],
err:'Diseñar la poza de disipación más corta que el resalto.',
x:[['sal','Resalto hidráulico'],['ene2','Energía específica'],['boc','Obras de captación']],
g:[
r=>{const Q=r.i(.2,10,.1),b=r.i(.5,4,.1);return{q:`Q=${Q} m³/s y b=${b} m. Halla q.`,a:Q/b,u:'m²/s',s:[`q = ${n(Q/b)} m²/s`]};},
r=>{const q=r.i(.2,4,.05),h=r.i(.5,4,.1);return{q:`q=${q} m²/s y h=${h} m. Halla D.`,a:q*q/(G*h**3),u:'',tol:.01,s:[`D = ${n(q*q/(G*h**3),4)}`]};},
r=>{const q=r.i(.2,4,.05),h=r.i(.5,4,.1);const D=q*q/(G*h**3);return{q:`q=${q} m²/s, h=${h} m. Halla la longitud de caída L_{d}.`,a:4.3*h*D**.27,u:'m',s:[`D = ${n(D,4)}`,`L_{d} = ${n(4.3*h*D**.27)} m`]};},
r=>{const q=r.i(.2,4,.05),h=r.i(.5,4,.1);const D=q*q/(G*h**3);return{q:`q=${q} m²/s, h=${h} m. Halla y₂.`,a:1.66*h*D**.27,u:'m',s:[`y₂ = 1.66·${h}·${n(D,4)}^{0.27} = ${n(1.66*h*D**.27)} m`]};},
r=>{const Q=r.i(.5,8,.1),b=r.i(1,4,.1),h=r.i(1,3.5,.1);const q=Q/b,D=q*q/(G*h**3),Ld=4.3*h*D**.27,y2=1.66*h*D**.27,Lt=Ld+6*y2;return{q:`Caída vertical de ${h} m en un canal de b=${b} m con Q=${Q} m³/s. La poza debe cubrir L_{d} más el resalto (≈ 6y₂). Halla su longitud total.`,a:Lt,u:'m',s:[`D = ${n(D,4)}`,`L_{d} = ${n(Ld)} m; y₂ = ${n(y2)} m`,`L = ${n(Lt)} m`]};}
]});
EXT('m17');
SUB('evp',{t:'Evapotranspiración y balance hídrico',
lec:`No toda la lluvia escurre: buena parte vuelve a la atmósfera. La **evapotranspiración** decide cuánta agua necesita un cultivo y cuánta se pierde en un embalse.

## Hargreaves (muy usado en el Perú)
ET_{0} = 0.0023·R_{a}·(T + 17.8)·√(T_{máx} − T_{mín})

con R_{a} la radiación extraterrestre en mm/día (tabla según latitud y mes).

## Demanda del cultivo
ET_{c} = K_{c}·ET_{0}, con K_{c} entre 0.3 y 1.2 según el cultivo y su etapa.

## Balance hídrico
ΔS = P − ET − Q − I. En un embalse, la evaporación del espejo de agua puede ser más de 1 m al año en la costa.

## Evaporación de un embalse
V = E·A, con E la lámina evaporada.`,
key:['ET_{0} = 0.0023R_{a}(T+17.8)√{T_{máx}−T_{mín}}','ET_{c} = K_{c}ET_{0}','ΔS = P − ET − Q − I'],
err:'Usar la temperatura máxima en vez de la media en el término (T + 17.8).',
x:[['cue','Precipitación'],['rie','Riego'],['agu','Aguas subterráneas']],
g:[
r=>{const Ra=r.i(11,17,.1),T=r.i(5,28,.5),d=r.i(6,18,.5);return{q:`R_{a}=${Ra} mm/día, T=${T} °C, T_{máx}−T_{mín}=${d} °C. Halla ET₀.`,a:.0023*Ra*(T+17.8)*sq(d),u:'mm/día',s:[`= ${n(.0023*Ra*(T+17.8)*sq(d))} mm/día`]};},
r=>{const E=r.i(2,8,.1),K=r.i(.3,1.2,.05);return{q:`ET₀=${E} mm/día y K_{c}=${K}. Halla ET_{c}.`,a:E*K,u:'mm/día',s:[`= ${n(E*K)} mm/día`]};},
r=>{const P=r.i(100,1500,10),E=r.i(100,900,10),Q=r.i(50,500,10),I=r.i(10,200,10);return{q:`P=${P}, ET=${E}, Q=${Q}, I=${I} mm/año. Halla ΔS.`,a:P-E-Q-I,u:'mm/año',s:[`= ${P-E-Q-I} mm/año`]};},
r=>{const A=r.i(.5,30,.5),E=r.i(800,2200,50);return{q:`Embalse de ${A} km² con evaporación de ${E} mm/año. Halla el volumen evaporado.`,a:A*1e6*E/1000/1e6,u:'hm³',s:[`= ${A}·10⁶·${E/1000} m³ = ${n(A*E/1000)} hm³`]};},
r=>{const Ra=r.i(13,16.5,.1),T=r.i(15,25,.5),d=r.i(8,14,.5),K=r.i(.7,1.15,.05),A=r.i(5,200,5),ef=r.p([.4,.6,.75,.9]),Pe=r.i(0,2,.1);const ET=.0023*Ra*(T+17.8)*sq(d)*K,nec=Math.max(ET-Pe,0),Q=nec/1000*A*1e4/86400/ef*1000;return{q:`Cultivo con K_{c}=${K} en ${A} ha. R_{a}=${Ra}, T=${T} °C, rango ${d} °C, precipitación efectiva ${Pe} mm/día, eficiencia de riego ${ef}. Halla el caudal continuo de diseño en L/s.`,a:Q,u:'L/s',s:[`ET_{c} = ${n(ET)} mm/día`,`Necesidad neta = ${n(nec)} mm/día`,`Q = ${n(Q)} L/s (≈ ${n(Q/A)} L/s/ha)`]};}
]});
SUB('inf',{t:'Infiltración',
lec:`La infiltración es el agua que entra al suelo. Al inicio de una lluvia el suelo seco absorbe mucho; luego se satura y la capacidad baja.

## Horton
f(t) = f_{c} + (f_{0} − f_{c})·e^{−kt}

- f_{0}: capacidad inicial; f_{c}: final; k: constante de decaimiento
- Infiltración acumulada: F(t) = f_{c}t + (f_{0} − f_{c})(1 − e^{−kt})/k

## Índice φ
La forma más simple: se supone una infiltración constante φ. Todo lo que llueve por encima de φ escurre.

Lluvia efectiva = Σ(i − φ)·Δt en los intervalos donde i > φ.

La urbanización reduce la infiltración: por eso las ciudades se inundan más que el campo con la misma lluvia.`,
key:['f = f_{c} + (f_{0}−f_{c})e^{−kt}','F = f_{c}t + [[(f_{0}−f_{c})(1−e^{−kt})|k]]','P_{e} = Σ(i − φ)Δt'],
err:'Restar φ también en los intervalos en que la lluvia es menor que φ.',
x:[['scs','Número de curva'],['rac','Coeficiente de escorrentía'],['hu','Hidrograma unitario']],
g:[
r=>{const f0=r.i(50,150,5),fc=r.i(5,30,1),k=r.i(1,6,.5),t=r.i(.1,3,.1);return{q:`Horton: f₀=${f0}, f_{c}=${fc} mm/h, k=${k} h⁻¹. Halla f a t=${t} h.`,a:fc+(f0-fc)*Math.exp(-k*t),u:'mm/h',s:[`f = ${n(fc+(f0-fc)*Math.exp(-k*t))} mm/h`]};},
r=>{const f0=r.i(50,150,5),fc=r.i(5,30,1),k=r.i(1,6,.5),t=r.i(.25,4,.25);return{q:`Horton: f₀=${f0}, f_{c}=${fc}, k=${k}. Halla F en ${t} h.`,a:fc*t+(f0-fc)*(1-Math.exp(-k*t))/k,u:'mm',s:[`F = ${n(fc*t+(f0-fc)*(1-Math.exp(-k*t))/k)} mm`]};},
r=>{const i=[r.i(2,40,1),r.i(2,40,1),r.i(2,40,1),r.i(2,40,1)],ph=r.i(5,20,1);const Pe=i.reduce((s,v)=>s+Math.max(v-ph,0),0);return{q:`Lluvia horaria: ${i.join(', ')} mm/h y φ=${ph} mm/h. Halla la lluvia efectiva.`,a:Pe,u:'mm',s:[`= ${i.map(v=>Math.max(v-ph,0)).join(' + ')} = ${Pe} mm`]};},
r=>{const i=[r.i(16,45,1),r.i(16,60,1),r.i(16,45,1)],ph0=r.i(3,15,.5);const Pe=i.reduce((s,v)=>s+v-ph0,0);return{q:`Lluvia de ${i.join(', ')} mm en tres horas; escurrieron ${Pe} mm. Halla φ (la lluvia supera a φ en las tres horas).`,a:ph0,u:'mm/h',s:[`φ = (${i.reduce((a,b)=>a+b)} − ${Pe})/3 = ${ph0} mm/h`]};},
r=>{const f0=r.i(60,120,5),fc=r.i(8,25,1),k=r.i(2,5,.5),i=r.i(30,80,5),D=r.i(1,3,.5),A=r.i(.5,10,.5);const F=fc*D+(f0-fc)*(1-Math.exp(-k*D))/k,P=i*D,Pe=Math.max(P-F,0);return{q:`Lluvia constante de ${i} mm/h durante ${D} h sobre ${A} km². Horton: f₀=${f0}, f_{c}=${fc}, k=${k} (supón que la lluvia siempre supera a f, aproximación). Halla el volumen de escorrentía.`,a:Pe/1000*A*1e6,u:'m³',s:[`P = ${P} mm; F = ${n(F)} mm`,`P_{e} = ${n(Pe)} mm`,`V = ${n(Pe/1000*A*1e6)} m³`]};}
]});
EXT('m18');
SUB('plu',{t:'Drenaje pluvial urbano',
lec:`En ciudades con lluvias intensas (selva y sierra, y cada vez más la costa con El Niño) el agua de lluvia necesita su propia red. La norma **CE.040** regula el drenaje pluvial urbano.

## Pasos
1. Caudal por el método racional: Q = CiA/3.6 (i en mm/h, A en km², Q en m³/s)
2. Periodo de retorno: 2 a 10 años para la red menor, 25 a 100 años para la mayor (calles y canales)
3. Las calles son parte del sistema: la cuneta lleva agua hasta un sumidero

## Capacidad de una cuneta triangular (Izzard)
Q = 0.375·(z/n)·S^{1/2}·y^{8/3}, con z = 1/pendiente transversal.

## Sumideros
Se colocan donde el ancho inundado de la calzada supera lo admisible.`,
key:['Q = [[CiA|3.6]]','Q = 0.375[[z|n]]S^{1/2}y^{8/3}','T = ancho inundado = zy'],
err:'Diseñar la red pluvial unida al desagüe: en lluvias fuertes colapsa el alcantarillado.',
x:[['rac','Método racional'],['cun','Cunetas viales'],['alc','Alcantarillado sanitario']],
g:[
r=>{const C=r.i(.3,.95,.05),i=r.i(20,150,5),A=r.i(.05,3,.05);return{q:`C=${C}, i=${i} mm/h, A=${A} km². Halla Q.`,a:C*i*A/3.6,u:'m³/s',s:[`Q = ${n(C*i*A/3.6)} m³/s`]};},
r=>{const z=r.i(20,50,1),nn=r.p([.013,.015,.016]),S=r.i(.005,.08,.005),y=r.i(.04,.15,.005);return{q:`Cuneta con z=${z}, n=${nn}, S=${S}, y=${y} m. Halla Q (Izzard).`,a:.375*z/nn*sq(S)*y**(8/3),u:'m³/s',s:[`Q = ${n(.375*z/nn*sq(S)*y**(8/3),4)} m³/s`]};},
r=>{const z=r.i(20,50,1),y=r.i(.04,.15,.005);return{q:`z=${z} e y=${y} m. Halla el ancho inundado T=zy.`,a:z*y,u:'m',s:[`T = ${n(z*y)} m`]};},
r=>{const A=[r.i(.5,5,.1),r.i(.5,5,.1),r.i(.5,5,.1)],C=[.9,.5,.2];return{q:`Cuenca urbana: ${A[0]} ha de techos y pavimentos (C=0.9), ${A[1]} ha de tierra afirmada (0.5) y ${A[2]} ha de parques (0.2). Halla C ponderado.`,a:(A[0]*.9+A[1]*.5+A[2]*.2)/(A[0]+A[1]+A[2]),u:'',s:[`C = ${n((A[0]*.9+A[1]*.5+A[2]*.2)/(A[0]+A[1]+A[2]))}`]};},
r=>{const C=r.i(.6,.9,.05),i=r.i(40,120,5),z=r.i(25,45,1),nn=.016,S=r.i(.01,.06,.005),Tad=r.i(1.5,3,.25);const ymax=Tad/z,Qc=.375*z/nn*sq(S)*ymax**(8/3);const A=Qc*3.6/(C*i)*100;return{q:`Calle con cuneta z=${z}, n=0.016, S=${S}. El ancho inundado admisible es ${Tad} m. Con C=${C} e i=${i} mm/h, ¿cada cuántas hectáreas drenadas hace falta un sumidero?`,a:A,u:'ha',s:[`y_{máx} = ${n(ymax,4)} m`,`Q_{cuneta} = ${n(Qc,4)} m³/s`,`A = 3.6Q/(Ci) = ${n(A)} ha`]};}
]});
SUB('rsd',{t:'Residuos sólidos y relleno sanitario',
lec:`Un municipio también necesita ingeniería para la basura. El ingeniero civil dimensiona rellenos sanitarios, celdas y drenes de lixiviado.

## Generación
- Generación per cápita (GPC) en el Perú: 0.5 a 1.0 kg/hab/día
- Residuos al año: R = P·GPC·365

## Volumen del relleno
V = R/γ_{compactado}, con γ entre 0.5 y 0.9 t/m³ según la compactación. Se suma 20 a 25 % de material de cobertura.

## Lixiviado (método suizo)
Q = P·A·K/t, con P la precipitación, A el área y K entre 0.15 y 0.5 según la compactación.

La Ley de Gestión Integral de Residuos Sólidos (D. Leg. 1278) y su reglamento regulan la disposición final. Los botaderos a cielo abierto contaminan ríos y acuíferos.`,
key:['R = P·GPC·365','V = [[R|γ]](1 + cobertura)','Q_{lix} = [[PAK|t]]'],
err:'Olvidar que la población crece durante la vida útil del relleno.',
x:[['pob','Proyección de población'],['agu','Contaminación de acuíferos'],['mvar','Volumen de un terreno']],
g:[
r=>{const P=r.i(5000,500000,1000),g=r.i(.5,1,.01);return{q:`Población ${P} hab con GPC=${g} kg/hab/día. Halla t/año.`,a:P*g*365/1000,u:'t/año',s:[`= ${n(P*g*365/1000)} t/año`]};},
r=>{const R=r.i(1000,100000,500),g=r.i(.5,.9,.05),c=r.p([.2,.25]);return{q:`${R} t/año con γ=${g} t/m³ y ${c*100} % de cobertura. Halla el volumen anual.`,a:R/g*(1+c),u:'m³',s:[`= ${n(R/g*(1+c))} m³`]};},
r=>{const P=r.i(100,2500,10),A=r.i(1,20,.5),K=r.p([.15,.25,.3,.5]);return{q:`Precipitación ${P} mm/año, celda de ${A} ha, K=${K}. Halla el lixiviado en m³/día.`,a:P/1000*A*1e4*K/365,u:'m³/día',s:[`Q = ${n(P/1000*A*1e4*K/365)} m³/día`]};},
r=>{const V=r.i(10000,500000,5000),h=r.i(5,20,1);return{q:`Se necesitan ${V} m³ con una altura de relleno de ${h} m. Halla el área.`,a:V/h/1e4,u:'ha',s:[`A = ${n(V/h/1e4)} ha`]};},
r=>{const P0=r.i(10000,200000,1000),k=r.i(.01,.03,.001),g=r.i(.5,.9,.01),N=r.i(10,20,1),gm=r.i(.6,.8,.05),h=r.i(8,15,1);let V=0;for(let t=0;t<N;t++)V+=P0*Math.exp(k*t)*g*365/1000/gm*1.25;return{q:`Población actual ${P0} hab que crece ${n(k*100,3)} % anual (exponencial), GPC=${g} kg/hab/día. Relleno para ${N} años, γ=${gm} t/m³, 25 % de cobertura y ${h} m de altura. Halla el área.`,a:V/h/1e4,u:'ha',s:[`Suma año a año del volumen: ${n(V)} m³`,`A = ${n(V/h/1e4)} ha`]};}
]});
EXT('m31');
SUB('rie',{t:'Sistemas de riego',
lec:`La agricultura usa cerca del 80 % del agua del Perú. El ingeniero civil diseña canales, reservorios y sistemas tecnificados.

## Eficiencias
- Conducción (canal): 0.7–0.9; distribución: 0.8–0.9; aplicación: gravedad 0.4–0.6, aspersión 0.75, goteo 0.9
- Eficiencia total: E = E_{c}·E_{d}·E_{a}

## Demanda
Q = ET_{c}·A/E (con las unidades cuidadas). El **módulo de riego** se expresa en L/s/ha.

## Lámina y frecuencia
- Lámina neta: d = (CC − PMP)·γ_{s}·z·f, con f el agotamiento permitido
- Intervalo de riego: d/ET_{c}

Pasar de riego por gravedad a goteo puede duplicar el área regada con la misma agua.`,
key:['E = E_{c}E_{d}E_{a}','Q = [[ET_{c}A|E]]','d = (CC−PMP)γ_{s}zf','Intervalo = [[d|ET_{c}]]'],
err:'Diseñar el canal con la demanda neta sin dividir entre las eficiencias.',
x:[['evp','Evapotranspiración'],['man','Diseño del canal'],['boc','Captación del río']],
g:[
r=>{const a=r.i(.7,.9,.05),b=r.i(.8,.9,.05),c=r.i(.4,.9,.05);return{q:`E_{c}=${a}, E_{d}=${b}, E_{a}=${c}. Halla E.`,a:a*b*c,u:'',s:[`E = ${n(a*b*c)}`]};},
r=>{const ET=r.i(2,8,.1),E=r.i(.3,.85,.05);return{q:`ET_{c}=${ET} mm/día y E=${E}. Halla el módulo de riego en L/s/ha.`,a:ET/E*1e4/1000/86400*1000,u:'L/s/ha',s:[`= ${ET}·10/86.4/${E} = ${n(ET/E*1e4/86400)} L/s/ha`]};},
r=>{const CC=r.i(15,35,1),PMP=r.i(5,14,1),gs=r.i(1.2,1.6,.05),z=r.i(.3,1.2,.1),f=r.p([.3,.4,.5,.6]);return{q:`CC=${CC} %, PMP=${PMP} % (en peso), γ_{s}=${gs}, raíces ${z} m, f=${f}. Halla la lámina neta en mm.`,a:(CC-PMP)/100*gs*z*f*1000,u:'mm',s:[`d = ${n((CC-PMP)/100*gs*z*f*1000)} mm`]};},
r=>{const d=r.i(20,120,5),ET=r.i(2,8,.1);return{q:`Lámina ${d} mm y ET_{c}=${ET} mm/día. Halla el intervalo de riego (días, redondea abajo).`,a:Math.floor(d/ET),u:'días',tol:0,s:[`= ⌊${d}/${ET}⌋ = ${Math.floor(d/ET)} días`]};},
r=>{const Q=r.i(50,1000,10),ET=r.i(3,7,.1),Eg=r.i(.3,.45,.01),Ego=r.i(.75,.85,.01);const A1=Q/1000*86400/(ET/1000*1e4/Eg),A2=Q/1000*86400/(ET/1000*1e4/Ego);return{q:`Un valle tiene ${Q} L/s. ET_{c}=${ET} mm/día. Con riego por gravedad (E=${Eg}) y con goteo (E=${Ego}), ¿cuántas hectáreas más se riegan con goteo?`,a:A2-A1,u:'ha',s:[`Gravedad: ${n(A1)} ha`,`Goteo: ${n(A2)} ha`,`Diferencia = ${n(A2-A1)} ha`]};}
]});
EXT('m36');
SUB('fot',{t:'Fotogrametría y drones',
lec:`Hoy gran parte de la topografía se hace con **drones** y **GNSS**. Las fotos aéreas, superpuestas, permiten reconstruir el terreno en 3D.

## Escala y resolución
- Escala de la foto: 1/E = f/H, con f la distancia focal y H la altura de vuelo
- GSD (tamaño del píxel en el terreno): GSD = H·p/f, con p el tamaño del píxel del sensor
- Huella de la foto: ancho = GSD × número de píxeles

## Plan de vuelo
- Traslape longitudinal 70–80 % y lateral 60–70 %
- Separación entre líneas: S = ancho·(1 − traslape lateral)
- Número de líneas: ancho del área / S

## Puntos de control
Los puntos de control (GCP) medidos con GNSS RTK amarran el modelo a coordenadas reales.`,
key:['[[1|E]] = [[f|H]]','GSD = [[Hp|f]]','S = ancho(1 − traslape)'],
err:'Volar sin puntos de control y usar el modelo para metrados finos.',
x:[['utm','Coordenadas UTM'],['cn','Curvas de nivel del modelo'],['dib3','Planos y BIM']],
g:[
r=>{const f=r.p([8.8,10.3,24,35]),H=r.i(40,300,10);return{q:`Cámara de f=${f} mm a H=${H} m. Halla E (escala 1:E).`,a:H*1000/f,u:'',s:[`E = ${H*1000}/${f} = ${n(H*1000/f)}`]};},
r=>{const f=r.p([8.8,10.3,24,35]),H=r.i(40,300,10),p=r.p([2.4,3.3,4.4]);return{q:`f=${f} mm, H=${H} m, píxel de ${p} μm. Halla el GSD en cm.`,a:H*p/1000/f*100,u:'cm',s:[`GSD = ${H}·${p}×10⁻³/${f} = ${n(H*p/1000/f*100)} cm`]};},
r=>{const gsd=r.i(1,6,.1),px=r.p([4000,5472,6000,8192]);return{q:`GSD=${gsd} cm y ${px} píxeles de ancho. Halla el ancho de la huella.`,a:gsd*px/100,u:'m',s:[`= ${n(gsd*px/100)} m`]};},
r=>{const W=r.i(50,300,5),t=r.p([.6,.65,.7,.75]);return{q:`Huella de ${W} m y traslape lateral ${t*100} %. Halla la separación entre líneas.`,a:W*(1-t),u:'m',s:[`= ${n(W*(1-t))} m`]};},
r=>{const gsd=r.i(1.5,5,.1),f=8.8,p=2.4,px=5472,B=r.i(300,2000,50),L=r.i(300,3000,50),tl=.7;const H=gsd/100*f/(p/1000),W=gsd*px/100,S=W*(1-tl),N=Math.ceil(B/S)+1;return{q:`Se quiere GSD=${gsd} cm con una cámara de f=8.8 mm, píxel 2.4 μm y 5472 píxeles de ancho. El área mide ${B} m × ${L} m, traslape lateral 70 %. ¿A qué altura volar y cuántas líneas? Escribe el número de líneas.`,a:N,u:'líneas',tol:0,s:[`H = GSD·f/p = ${n(H)} m`,`Huella = ${n(W)} m; S = ${n(S)} m`,`Líneas = ⌈${B}/${n(S)}⌉ + 1 = ${N}`]};}
]});
