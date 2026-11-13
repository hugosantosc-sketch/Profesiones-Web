/* Profundización: concreto armado y análisis estructural */
EXT('m22');
SUB('cmpt',{t:'Compatibilidad de deformaciones y factor φ',
lec:`Las fórmulas simples de flexión suponen que el acero fluye. Eso hay que **verificarlo** con compatibilidad de deformaciones.

## Deformaciones
Con el concreto en ε_{cu} = 0.003 en la fibra extrema y el eje neutro a c:
- Acero en tensión: ε_{t} = 0.003(d − c)/c
- Acero en compresión: ε′_{s} = 0.003(c − d′)/c
- Esfuerzo: f_{s} = E_{s}ε_{s} ≤ f_{y}. Con E_{s} = 2×10⁶ kg/cm²: f_{s} = 6000(d − c)/c ≤ f_{y}

## Relación entre a y c
a = β₁c, con β₁ = 0.85 para f′_{c} ≤ 280 kg/cm², bajando 0.05 por cada 70 kg/cm² adicionales, mínimo 0.65.

## Control por tracción (ACI 318)
- ε_{t} ≥ 0.005: sección controlada por tracción, φ = 0.90 (falla dúctil)
- ε_{t} ≤ 0.002: controlada por compresión, φ = 0.65 (con estribos)
- Entre ambos: φ = 0.65 + 0.25(ε_{t} − 0.002)/0.003

La E.060 usa φ = 0.90 en flexión y limita la cuantía a 0.75ρ_{b}; el ACI actual usa la deformación ε_{t}. Ambos buscan lo mismo: que la viga avise antes de fallar.

## Doble refuerzo
Se verifica si el acero en compresión fluye: si ε′_{s} < f_{y}/E_{s}, se usa f′_{s} = 6000(c − d′)/c y se resuelve el equilibrio con c como incógnita.`,
ded:`## Por qué la deformación es lineal
Bernoulli-Navier: las secciones planas siguen planas. Entonces las deformaciones forman un triángulo con vértice en el eje neutro. Por triángulos semejantes: ε_{t}/(d − c) = 0.003/c.

## De dónde sale ε_{t} = 0.005
Es una deformación unas 2.5 veces la de fluencia del acero de 4200: asegura que el acero se estiró mucho (fisuras anchas, flecha visible) antes del aplastamiento del concreto. El ACI 318 la adoptó en 2002 (Mast, 1992) para unificar el diseño de vigas, columnas y elementos preesforzados.

## La transición lineal de φ
Entre la falla frágil (φ = 0.65) y la dúctil (φ = 0.90), φ se interpola linealmente con ε_{t}: así no hay un salto brusco de resistencia al cambiar levemente la cuantía (MacGregor y Wight).`,
key:['ε_{t} = 0.003[[d − c|c]]','f_{s} = 6000[[d − c|c]] ≤ f_{y}','a = β_{1}c','φ = 0.65 + 0.25[[ε_{t} − 0.002|0.003]]'],
err:'Suponer que el acero en compresión siempre fluye.',
x:[['fle','Flexión simple'],['dre','Doble refuerzo'],['fcp','Columnas']],
g:[
r=>{const a=r.i(3,25,.1),fc=r.p([210,280,350]);const b1=fc<=280?.85:Math.max(.85-.05*(fc-280)/70,.65);return{q:`a=${a} cm con f′_{c}=${fc} kg/cm². Halla c.`,a:a/b1,u:'cm',s:[`β₁ = ${n(b1)}`,`c = a/β₁ = ${n(a/b1)} cm`]};},
r=>{const d=r.i(30,90,1),c=r.i(4,40,.5);return{q:`d=${d} cm y c=${c} cm. Halla ε_{t}.`,a:.003*(d-c)/c,u:'',tol:.01,s:[`ε_{t} = 0.003(${d} − ${c})/${c} = ${n(.003*(d-c)/c,4)}`]};},
r=>{const c=r.i(6,30,.5),dp=r.i(4,8,.5),fy=r.p([2800,4200]);const fs=Math.min(6000*(c-dp)/c,fy);return{q:`c=${c} cm, d′=${dp} cm, f_{y}=${fy}. Halla f′_{s} del acero en compresión.`,a:fs,u:'kg/cm²',s:[`6000(${c} − ${dp})/${c} = ${n(6000*(c-dp)/c)}`,`f′_{s} = ${n(fs)} kg/cm² ${fs<fy?'(no fluye)':'(fluye)'}`]};},
r=>{const et=r.i(.002,.005,.0001);return{q:`ε_{t}=${n(et,4)}. Halla φ según ACI.`,a:.65+.25*(et-.002)/.003,u:'',s:[`φ = 0.65 + 0.25(${n(et-.002,4)})/0.003 = ${n(.65+.25*(et-.002)/.003,4)}`]};},
r=>{const b=r.i(25,40,5),d=r.i(40,70,5),fc=r.p([210,280]),As=+(r.i(.005,.018,.0005)*b*d).toFixed(1);const a=As*4200/(.85*fc*b),c=a/.85,et=.003*(d-c)/c,phi=et>=.005?.9:et<=.002?.65:.65+.25*(et-.002)/.003;return{q:`Viga ${b}×(d=${d}) cm, f′_{c}=${fc}, f_{y}=4200, A_{s}=${As} cm². Halla φM_{n} con el φ del ACI (verifica que el acero fluya).`,a:et>=.0021?phi*As*4200*(d-a/2)/1e5:0,u:'t·m',s:[`a = ${n(a)} cm; c = ${n(c)} cm`,`ε_{t} = ${n(et,4)} → φ = ${n(phi,4)}`,et>=.0021?`φM_{n} = ${n(phi*As*4200*(d-a/2)/1e5)} t·m`:'El acero no fluye: la sección está sobrerreforzada y hay que rediseñarla']};}
],
cri:[
['Una viga sale con ε_{t} = 0.003. ¿Qué haces?',['Nada','Aumentar el peralte o agregar acero en compresión: está cerca de una falla frágil y φ baja','Agregar más acero en tensión','Bajar f′_{c}'],1,'Más acero en tensión empeora la situación (c crece y ε_{t} baja). Se aumenta d o se agrega acero en compresión.'],
['¿Por qué en vigas sísmicas se busca ε_{t} mucho mayor que 0.005?',['Por estética','Para tener gran capacidad de rotación en las rótulas plásticas','Para ahorrar concreto','No importa'],1,'La ductilidad de rotación crece cuanto más se deforma el acero antes de que el concreto falle.']
],
ref:['MacGregor y Wight, Reinforced Concrete: Mechanics and Design, capítulo 4','ACI 318, 21.2 (factores φ)','Ottazzi Pasino, Apuntes del curso Concreto Armado 1 (PUCP)']});
SUB('lm1',{t:'Losas macizas en una dirección',
lec:`Si un paño de losa es más del doble de largo que de ancho, la carga viaja casi toda en la dirección corta: trabaja en **una dirección**, como una serie de vigas de 1 m de ancho.

## Espesor mínimo (ACI 318, f_{y} = 4200)
Sin calcular flechas: L/20 simplemente apoyada, L/24 un extremo continuo, L/28 ambos continuos, L/10 en voladizo.

## Momentos por coeficientes (ACI)
Para tramos de luces parecidas (la mayor no excede a la menor en más de 20 %), con carga uniforme y viva no mayor a 3 veces la muerta:
- Positivo, tramo extremo (apoyo extremo integral): w_{u}L²/14
- Positivo, tramo interior: w_{u}L²/16
- Negativo en el primer apoyo interior: w_{u}L²/10 (más de dos tramos) o /9 (dos tramos)
- Negativo en otros apoyos interiores: w_{u}L²/11

## Acero
- Principal: de M_{u}, por metro de ancho
- Mínimo y de temperatura (en la otra dirección): 0.0018bh
- Espaciamiento máximo: 3h y 45 cm`,
ded:`## Por qué una dirección si L_{largo}/L_{corto} > 2
Como en la losa en dos direcciones, la carga se reparte de modo que las flechas coincidan en el centro: w_{a}/w = L_{b}⁴/(L_{a}⁴ + L_{b}⁴). Con L_{b} = 2L_{a}, la dirección corta toma 16/17 ≈ 94 % de la carga: tratarla como una dirección es una aproximación excelente.

## De dónde salen los coeficientes
Se analizaron vigas continuas con todas las alternancias posibles de carga viva, y se tomaron envolventes de momento redondeadas hacia el lado seguro. Por ejemplo, un tramo interior biempotrado con carga uniforme tendría wL²/24 positivo; con alternancia de viva y giro de los apoyos, sube a cerca de wL²/16.

## El espesor mínimo
Viene de limitar la flecha a L/360 aproximadamente con losas típicas: se fijó como relación luz/peralte para no tener que calcular deflexiones en casos comunes (Nilson, Darwin y Dolan).`,
key:['h_{mín} = [[L|20]], [[L|24]], [[L|28]], [[L|10]]','M^{−} = [[w_{u}L^{2}|10]]','M^{+} = [[w_{u}L^{2}|14]], [[w_{u}L^{2}|16]]','A_{s,mín} = 0.0018bh'],
err:'Usar los coeficientes cuando las luces difieren mucho o la carga viva es muy alta.',
x:[['los','Losas aligeradas'],['l2d','Losas en dos direcciones'],['fis','Acero de temperatura']],
g:[
r=>{const L=r.i(2,7,.05),k=r.p([[20,'simplemente apoyada'],[24,'con un extremo continuo'],[28,'con ambos extremos continuos'],[10,'en voladizo']]);return{q:`Losa ${k[1]} de L=${L} m. Halla h mínimo.`,a:L*100/k[0],u:'cm',s:[`h = ${L*100}/${k[0]} = ${n(L*100/k[0])} cm`]};},
r=>{const w=r.i(.5,3,.05),L=r.i(2,6,.05),c=r.p([[9,'primer apoyo interior (dos tramos)'],[10,'primer apoyo interior (más de dos tramos)'],[11,'otro apoyo interior'],[14,'centro de tramo extremo'],[16,'centro de tramo interior']]);return{q:`w_{u}=${w} t/m² y L=${L} m. Halla el momento en el ${c[1]} (w_{u}L²/${c[0]}).`,a:w*L*L/c[0],u:'t·m/m',s:[`= ${n(w*L*L/c[0])} t·m por metro`]};},
r=>{const M=r.i(.3,4,.05),h=r.i(12,25,1),fc=r.p([210,280]);const d=h-3;let As=M*1e5/(.9*4200*.9*d);for(let i=0;i<5;i++){const a=As*4200/(.85*fc*100);As=M*1e5/(.9*4200*(d-a/2));}const Am=.0018*100*h;return{q:`Losa de h=${h} cm (d = h − 3), f′_{c}=${fc}, M_{u}=${M} t·m/m. Halla A_{s} por metro (con el mínimo de 0.0018bh).`,a:Math.max(As,Am),u:'cm²/m',s:[`A_{s} = ${n(As)} cm²/m; mínimo = ${n(Am)}`,`Usa ${n(Math.max(As,Am))} cm²/m`]};},
r=>{const As=r.i(2,12,.1),db=r.p([[.71,'3/8″'],[1.29,'1/2″'],[2,'5/8″']]),h=r.i(12,25,1);const s=Math.min(Math.floor(db[0]*100/As),3*h,45);return{q:`Se requieren ${As} cm²/m con barras de ${db[1]} (${db[0]} cm²) en una losa de ${h} cm. Halla el espaciamiento (redondea abajo y respeta 3h y 45 cm).`,a:s,u:'cm',tol:0,s:[`s = ${db[0]}·100/${As} = ${n(db[0]*100/As)} cm`,`Límites: 3h = ${3*h}, 45`,`s = ${s} cm`]};},
r=>{const L=r.i(3,5.5,.05),D=r.i(.15,.4,.05),Lv=r.p([.2,.25,.3,.4,.5]);const h=Math.ceil(L*100/28),wd=2.4*h/100+D,wu=1.4*wd+1.7*Lv,M=wu*L*L/10,d=h-3;let As=M*1e5/(.9*4200*.9*d);for(let i=0;i<5;i++){const a=As*4200/(210*.85*100);As=M*1e5/(.9*4200*(d-a/2));}As=Math.max(As,.0018*100*h);return{q:`Losa maciza continua de varios tramos de L=${L} m, f′_{c}=210. Espesor por L/28 (redondeado arriba), acabados ${D} t/m², viva ${Lv} t/m². Con 1.4CM + 1.7CV (E.060), halla el acero negativo en el primer apoyo interior.`,a:As,u:'cm²/m',s:[`h = ${h} cm; w_{u} = ${n(wu)} t/m²`,`M_{u} = w_{u}L²/10 = ${n(M)} t·m/m`,`A_{s} = ${n(As)} cm²/m`]};}
],
cri:[
['Un paño de 4×9 m apoyado en sus cuatro lados, ¿cómo se diseña?',['En dos direcciones','En una dirección (la corta), con acero de temperatura en la larga','Sin acero','Como una viga de 9 m'],1,'Con relación 2.25 la losa trabaja casi solo en la dirección corta.'],
['¿Por qué el acero de temperatura se coloca aunque la losa trabaje en una dirección?',['Por estética','Para controlar fisuras por contracción y temperatura en la otra dirección','Para resistir el sismo','No se coloca'],1,'El concreto se contrae en todas las direcciones; sin acero, la dirección secundaria se fisura.']
],
ref:['Nilson, Darwin y Dolan, Diseño de estructuras de concreto, capítulo de losas en una dirección','ACI 318, 6.5 (coeficientes) y 7.3 (espesores)','E.060, capítulo 9']});
SUB('brs',{t:'Flexión biaxial en columnas (Bresler)',
lec:`Las columnas de esquina reciben momentos en las dos direcciones. Calcular la superficie de interacción completa es laborioso; Bresler (1960) propuso dos métodos aproximados.

## Método de la carga recíproca
1/P_{n} ≈ 1/P_{nx} + 1/P_{ny} − 1/P₀

- P_{nx}: resistencia con solo la excentricidad e_{y} (de cada diagrama de interacción uniaxial)
- P_{ny}: con solo e_{x}
- P₀ = 0.85f′_{c}(A_{g} − A_{st}) + f_{y}A_{st}

Funciona bien cuando la carga axial es importante (P_{n} ≥ 0.1f′_{c}A_{g}).

## Método del contorno de carga
Para cargas axiales bajas: (M_{nx}/M_{0x})^{α} + (M_{ny}/M_{0y})^{α} ≤ 1, con α ≈ 1.0 a 1.5. Con α = 1 es conservador (una recta).

## Recomendación práctica
Colocar el acero repartido en las cuatro caras en columnas de esquina, y verificar con software de interacción biaxial.`,
ded:`## De dónde sale la carga recíproca
Bresler representó la superficie de falla como 1/P en función de (e_{x}, e_{y}). Propuso aproximarla con un plano que pasa por tres puntos conocidos: 1/P₀ (sin excentricidad), 1/P_{nx} y 1/P_{ny}. El plano por esos tres puntos da 1/P_{n} = 1/P_{nx} + 1/P_{ny} − 1/P₀. Lo comparó con ensayos y encontró errores menores al 10 % en el rango de carga axial media y alta.

## Por qué no sirve con carga axial muy baja
Con poca compresión, la superficie 1/P es muy curva y el plano deja de representarla; ahí se usa el contorno de momentos (Nilson, Darwin y Dolan).`,
key:['[[1|P_{n}]] = [[1|P_{nx}]] + [[1|P_{ny}]] − [[1|P_{0}]]','P_{0} = 0.85f\'_{c}(A_{g} − A_{st}) + f_{y}A_{st}','([[M_{nx}|M_{0x}]])^{α} + ([[M_{ny}|M_{0y}]])^{α} ≤ 1'],
err:'Revisar la columna de esquina por separado en cada dirección, como si los momentos no se combinaran.',
x:[['fcp','Diagrama de interacción'],['col','Resistencia axial'],['bc','Interacción en acero']],
g:[
r=>{const b=r.i(25,70,5),h=r.i(25,70,5),fc=r.p([210,280,350]),rho=r.i(.01,.04,.005);const Ag=b*h,Ast=rho*Ag;return{q:`Columna ${b}×${h} cm, f′_{c}=${fc}, f_{y}=4200, ρ=${rho}. Halla P₀.`,a:(.85*fc*(Ag-Ast)+4200*Ast)/1000,u:'t',s:[`A_{st} = ${n(Ast)} cm²`,`P₀ = ${n((.85*fc*(Ag-Ast)+4200*Ast)/1000)} t`]};},
r=>{const P0=r.i(200,1500,10),px=Math.round(P0*r.i(.4,.85,.01)),py=Math.round(P0*r.i(.4,.85,.01));const Pn=1/(1/px+1/py-1/P0);return{q:`P_{nx}=${px} t, P_{ny}=${py} t y P₀=${P0} t. Halla P_{n} por Bresler.`,a:Pn,u:'t',s:[`1/P_{n} = 1/${px} + 1/${py} − 1/${P0} = ${n(1/px+1/py-1/P0,4)}`,`P_{n} = ${n(Pn)} t`]};},
r=>{const P0=r.i(300,1500,10),px=Math.round(P0*r.i(.4,.85,.01)),py=Math.round(P0*r.i(.4,.85,.01)),Pu=Math.round(P0*r.i(.2,.5,.01));const Pn=1/(1/px+1/py-1/P0);return{q:`P_{nx}=${px}, P_{ny}=${py}, P₀=${P0} t, φ=0.70. ¿Resiste P_{u}=${Pu} t? Escribe φP_{n}.`,a:.7*Pn,u:'t',s:[`P_{n} = ${n(Pn)} t`,`φP_{n} = ${n(.7*Pn)} t ${.7*Pn>=Pu?'≥':'<'} ${Pu}`]};},
r=>{const Mx=r.i(2,20,.5),My=r.i(2,20,.5),M0x=r.i(15,40,1),M0y=r.i(15,40,1);return{q:`Carga axial baja: M_{nx}=${Mx}, M_{ny}=${My}, M_{0x}=${M0x}, M_{0y}=${M0y} t·m. Con α=1, halla la suma de interacción.`,a:Mx/M0x+My/M0y,u:'',s:[`= ${n(Mx/M0x)} + ${n(My/M0y)} = ${n(Mx/M0x+My/M0y)} ${Mx/M0x+My/M0y<=1?'(cumple)':'(no cumple)'}`]};},
r=>{const b=r.i(40,60,5),fc=280,rho=r.i(.015,.03,.005),fx=r.i(.5,.8,.01),fy=r.i(.5,.8,.01),Pu=r.i(80,300,5);const Ag=b*b,Ast=rho*Ag,P0=(.85*fc*(Ag-Ast)+4200*Ast)/1000,Pnx=fx*P0,Pny=fy*P0,Pn=1/(1/Pnx+1/Pny-1/P0);return{q:`Columna de esquina ${b}×${b} cm, f′_{c}=280, f_{y}=4200, ρ=${rho}. Los diagramas uniaxiales dan P_{nx}=${n(fx)}P₀ y P_{ny}=${n(fy)}P₀ para las excentricidades actuantes. Halla φP_{n} (φ=0.70) y compáralo con P_{u}=${Pu} t.`,a:.7*Pn,u:'t',s:[`P₀ = ${n(P0)} t`,`P_{nx} = ${n(Pnx)}, P_{ny} = ${n(Pny)} t`,`φP_{n} = ${n(.7*Pn)} t ${.7*Pn>=Pu?'(cumple)':'(no cumple)'}`]};}
],
cri:[
['¿Por qué las columnas de esquina suelen ser críticas en sismo?',['No lo son','Reciben momentos en dos direcciones a la vez y menos carga axial que las interiores','Porque son más chicas siempre','Por la estética'],1,'La flexión biaxial con baja compresión es una combinación desfavorable.']
],
ref:['Bresler, Design criteria for reinforced columns under axial load and biaxial bending (ACI Journal, 1960)','Nilson, Darwin y Dolan, Diseño de estructuras de concreto, capítulo de columnas']});
SUB('cfr',{t:'Cortante por fricción',
lec:`Cuando el corte actúa en un plano donde puede formarse una fisura (una junta de vaciado, la unión de una ménsula con la columna, la interfaz entre un concreto nuevo y uno viejo), se usa el modelo de **cortante por fricción**.

## Idea
Si el plano se fisura y trata de deslizar, la rugosidad obliga a las caras a separarse. Esa separación estira el acero que cruza la fisura, que a su vez aprieta las caras: la compresión genera fricción.

## Resistencia (acero perpendicular al plano)
V_{n} = A_{vf}·f_{y}·μ

Coeficiente μ (concreto de peso normal):
- Vaciado monolítico: 1.4
- Junta con superficie intencionalmente rugosa (≈ 6 mm): 1.0
- Junta lisa: 0.6
- Concreto contra acero estructural: 0.7

## Límite superior
V_{n} ≤ 0.2f′_{c}A_{c} y ≤ 5.5 MPa·A_{c} (≈ 56 kg/cm²·A_{c}), para que no se aplaste el concreto.

## Acero inclinado
Si el acero cruza el plano con ángulo α y la fuerza tiende a estirarlo: V_{n} = A_{vf}f_{y}(μ sen α + cos α).

φ = 0.75 en ACI (0.85 en la E.060).`,
ded:`## De dónde sale A_{vf}f_{y}μ
Cuando las caras rugosas deslizan, se separan; el acero que las cruza se estira hasta fluir y ejerce una fuerza de cierre A_{vf}f_{y}. Esa fuerza normal genera fricción μ·N = μA_{vf}f_{y}. Birkeland y Birkeland (1966) y luego Mattock calibraron los μ con ensayos de especímenes "push-off". Los valores de μ son altos (1.4) porque también incluyen la trabazón de agregados y la acción de pasador del acero.

## Acero inclinado
La fuerza del acero inclinado A_{vf}f_{y} tiene una componente normal al plano (sen α), que genera fricción, y otra paralela (cos α), que resiste directamente: V_{n} = A_{vf}f_{y}(μ sen α + cos α).`,
key:['V_{n} = A_{vf}f_{y}μ','μ = 1.4; 1.0; 0.6; 0.7','V_{n} ≤ 0.2f\'_{c}A_{c}','V_{n} = A_{vf}f_{y}(μ sen α + cos α)'],
err:'Vaciar una ampliación contra concreto viejo liso, sin picar la superficie, y diseñar con μ = 1.4.',
x:[['cte','Cortante en vigas'],['pyt','Ménsulas con puntal y tensor'],['pt2','Encamisados y refuerzos']],
g:[
r=>{const A=r.i(2,30,.5),mu=r.p([1.4,1,.6,.7]);return{q:`A_{vf}=${A} cm², f_{y}=4200, μ=${mu}. Halla V_{n}.`,a:A*4200*mu/1000,u:'t',s:[`= ${A}·4200·${mu} = ${n(A*4200*mu/1000)} t`]};},
r=>{const V=r.i(5,80,1),mu=r.p([1.4,1,.6]),phi=.85;return{q:`V_{u}=${V} t, μ=${mu}, φ=0.85, f_{y}=4200. Halla A_{vf}.`,a:V*1000/(phi*4200*mu),u:'cm²',s:[`A_{vf} = ${V*1000}/(0.85·4200·${mu}) = ${n(V*1000/(phi*4200*mu))} cm²`]};},
r=>{const fc=r.p([210,280,350]),Ac=r.i(300,3000,10);return{q:`f′_{c}=${fc}, A_{c}=${Ac} cm². Halla el límite V_{n,máx} = mín(0.2f′_{c}A_{c}, 56A_{c}).`,a:Math.min(.2*fc,56)*Ac/1000,u:'t',s:[`0.2f′_{c} = ${.2*fc}; 56`,`V_{n,máx} = ${n(Math.min(.2*fc,56)*Ac/1000)} t`]};},
r=>{const A=r.i(2,20,.5),mu=r.p([1.4,1,.6]),al=r.i(45,90,5);return{q:`Acero inclinado ${al}° respecto al plano, A_{vf}=${A} cm², f_{y}=4200, μ=${mu}. Halla V_{n}.`,a:A*4200*(mu*sind(al)+cosd(al))/1000,u:'t',s:[`= ${A}·4200(${mu}·sen ${al}° + cos ${al}°) = ${n(A*4200*(mu*sind(al)+cosd(al))/1000)} t`]};},
r=>{const V=r.i(10,60,1),b=r.i(25,50,5),L=r.i(40,120,5),fc=r.p([210,280]);const mu=1,Avf=V*1000/(.85*4200*mu),Vmax=Math.min(.2*fc,56)*b*L/1000;const nb=Math.ceil(Avf/1.29);return{q:`Ampliación de una placa: concreto nuevo contra viejo picado (μ=1.0), V_{u}=${V} t en una interfaz de ${b}×${L} cm, f′_{c}=${fc}, φ=0.85. ¿Cuántos conectores de 1/2″ (1.29 cm²) se necesitan? Verifica el límite.`,a:nb,u:'barras',tol:0,s:[`A_{vf} = ${n(Avf)} cm² → ${nb} barras`,`φV_{n,máx} = ${n(.85*Vmax)} t ${.85*Vmax>=V?'(cumple)':'(no cumple: agrandar la interfaz)'}`]};}
],
cri:[
['Se reforzará una columna existente con un encamisado. ¿Qué es clave en la interfaz?',['Pintarla','Picar la superficie y colocar conectores: el corte entre concretos se transmite por fricción','Mojarla con aceite','Nada'],1,'Con superficie lisa μ = 0.6; picada, 1.0. Sin conectores, no hay fuerza de cierre que genere fricción.']
],
ref:['Mattock y Hawkins, Shear transfer in reinforced concrete (PCI Journal, 1972)','ACI 318, 22.9 (cortante por fricción)','E.060, 11.7']});
SUB('pyt',{t:'Modelo de puntal y tensor',
lec:`Las fórmulas de vigas suponen secciones planas, lo que no vale en **regiones D** (de discontinuidad): ménsulas, vigas de gran peralte, zonas de apoyo, nudos y aberturas. Allí se usa el **modelo de puntal y tensor**: una armadura imaginaria dentro del concreto.

## Elementos
- **Puntales:** concreto en compresión
- **Tensores:** acero de refuerzo en tensión
- **Nudos:** donde se encuentran

## Resistencias (ACI 318, MPa)
- Puntal: F_{ns} = f_{ce}A_{cs}, con f_{ce} = 0.85β_{s}f′_{c}. β_{s} = 1.0 prismático; 0.75 en forma de botella con refuerzo; 0.60 sin refuerzo
- Nudo: f_{ce} = 0.85β_{n}f′_{c}, con β_{n} = 1.0 (CCC), 0.80 (CCT), 0.60 (CTT)
- Tensor: F_{nt} = A_{st}f_{y}
- φ = 0.75
- Ángulo mínimo entre puntal y tensor: 25°

## Ménsula simple
Una carga V a una distancia a de la cara de la columna, con brazo interno z: tan θ = z/a.
- Puntal: C = V/sen θ
- Tensor: T = V/tan θ (+ la fuerza horizontal N_{uc}, si existe)`,
ded:`## Por qué funciona
El teorema del límite inferior de la plasticidad dice que cualquier distribución de fuerzas en equilibrio que no supere la resistencia en ningún punto da una carga segura (si el material tiene ductilidad suficiente). El modelo de puntal y tensor es una de esas distribuciones. Schlaich, Schäfer y Jennewein (1987) lo sistematizaron para el diseño.

## Fuerzas en la ménsula
En el nudo bajo la carga se encuentran la carga V (vertical), el puntal inclinado θ y el tensor horizontal. Equilibrio vertical: C sen θ = V. Horizontal: T = C cos θ = V/tan θ.

## Por qué β_{s} < 1
Un puntal en forma de botella se ensancha y genera tracciones transversales que fisuran el concreto y bajan su resistencia a compresión; el refuerzo transversal controla esas fisuras (de ahí 0.75 frente a 0.60).`,
key:['tan θ = [[z|a]]','C = [[V|sen θ]]','T = [[V|tan θ]]','f_{ce} = 0.85β_{s}f\'_{c}','φ = 0.75'],
err:'Diseñar una ménsula corta con las fórmulas de flexión de vigas.',
x:[['cfr','Cortante por fricción en la ménsula'],['arm','Armaduras'],['pe6','Zona de anclaje']],
g:[
r=>{const z=r.i(200,800,10),a=r.i(100,600,10);return{q:`Ménsula con brazo interno z=${z} mm y a=${a} mm. Halla θ.`,a:atand(z/a),u:'°',s:[`θ = arctan(${z}/${a}) = ${n(atand(z/a))}° ${atand(z/a)<25?'(< 25°: no permitido)':''}`]};},
r=>{const V=r.i(50,800,10),t=r.i(30,70,1);return{q:`V=${V} kN y θ=${t}°. Halla la fuerza en el puntal.`,a:V/sind(t),u:'kN',s:[`C = ${V}/sen ${t}° = ${n(V/sind(t))} kN`]};},
r=>{const V=r.i(50,800,10),t=r.i(30,70,1),N=r.i(0,150,5);return{q:`V=${V} kN, θ=${t}°, fuerza horizontal N=${N} kN. Halla la fuerza en el tensor.`,a:V/tand(t)+N,u:'kN',s:[`T = ${V}/tan ${t}° + ${N} = ${n(V/tand(t)+N)} kN`]};},
r=>{const fc=r.p([21,28,35,42]),bs=r.p([1,.75,.6]),b=r.i(200,500,10),w=r.i(80,250,10);return{q:`Puntal de ${b}×${w} mm, f′_{c}=${fc} MPa, β_{s}=${bs}. Halla φF_{ns} (φ=0.75).`,a:.75*.85*bs*fc*b*w/1000,u:'kN',s:[`f_{ce} = 0.85·${bs}·${fc} = ${n(.85*bs*fc)} MPa`,`φF_{ns} = ${n(.75*.85*bs*fc*b*w/1000)} kN`]};},
r=>{const V=r.i(150,800,10),a=r.i(150,400,10),h=r.i(450,800,10),N=Math.round(V*.2),fy=420;const z=.8*(h-50),t=atand(z/a),T=V/tand(t)+N,As=T*1000/(.75*fy);return{q:`Ménsula: V_{u}=${V} kN aplicada a ${a} mm de la cara, peralte ${h} mm, N_{uc}=${N} kN (20 % de V). Toma z = 0.8(h − 50 mm), f_{y}=420 MPa, φ=0.75. Halla el área del tensor.`,a:As,u:'mm²',s:[`z = ${n(z)} mm → θ = ${n(t)}°`,`T = ${n(T)} kN`,`A_{s} = ${n(As)} mm²`]};}
],
cri:[
['¿Dónde está el error más común al aplicar puntal y tensor?',['En la pintura','En el anclaje del tensor: debe desarrollarse dentro del nudo, no después','En el concreto','En el encofrado'],1,'Si el tensor no está anclado en el nudo, la armadura imaginaria no puede formarse. Por eso las ménsulas llevan el acero soldado a una barra transversal o con ganchos.'],
['Una viga de transferencia de 3 m de peralte y 4 m de luz, ¿cómo se diseña?',['Como viga normal','Con puntal y tensor: es una viga de gran peralte, región D completa','Sin acero','Como losa'],1,'Con relación luz/peralte menor que 4, las secciones no permanecen planas.']
],
ref:['Schlaich, Schäfer y Jennewein, Toward a consistent design of structural concrete (PCI Journal, 1987)','ACI 318, capítulo 23','ACI SP-208, Examples for the Design of Structural Concrete with Strut-and-Tie Models']});
SUB('lpl',{t:'Losas planas y punzonamiento',
lec:`Una **losa plana** se apoya directamente sobre columnas, sin vigas. Es rápida de construir y da techos limpios, pero tiene dos puntos críticos: el punzonamiento y la transferencia de momento a la columna.

## Momento estático total (método directo)
M₀ = w_{u}ℓ₂ℓ_{n}²/8, con ℓ₂ el ancho tributario y ℓ_{n} la luz libre.

Se reparte (tramo interior): 65 % negativo y 35 % positivo. En losas planas, la **franja de columna** (ancho total ℓ/2 centrado en la columna) toma el 75 % del negativo interior y el 60 % del positivo.

## Punzonamiento (ACI, MPa)
Sección crítica a d/2 de la cara: b_{o} = 4(c + d) en columna cuadrada interior.

v_{c} = el menor de:
- 0.33√f′_{c}
- 0.17(1 + 2/β)√f′_{c}, con β = lado largo/lado corto de la columna
- 0.083(α_{s}d/b_{o} + 2)√f′_{c}, con α_{s} = 40 interior, 30 borde, 20 esquina

## Momento desbalanceado
Una fracción γ_{f} se transmite por flexión y γ_{v} = 1 − γ_{f} por excentricidad del corte:

γ_{f} = 1/[1 + (2/3)√(b₁/b₂)]

El corte excéntrico aumenta el esfuerzo de punzonamiento en un lado de la sección crítica.`,
ded:`## M₀
Una franja de ancho ℓ₂ entre dos filas de columnas es, globalmente, una viga simplemente apoyada de luz ℓ_{n}: la suma del momento positivo al centro y el promedio de los negativos debe ser wℓ₂ℓ_{n}²/8, por equilibrio, sin importar cómo se reparta (Nichols, 1914). El método directo solo decide el reparto.

## La sección crítica a d/2
Ensayos muestran que la falla por punzonamiento forma un cono que nace en la cara de la columna con fisuras a unos 25–30°. El ACI toma una sección vertical a d/2 de la cara como sección de control simplificada.

## Por qué tres expresiones de v_{c}
La primera es el límite para columnas cuadradas pequeñas. La segunda baja la resistencia en columnas alargadas (el corte se concentra en los extremos). La tercera, en columnas grandes respecto a d, donde b_{o}/d es grande y el esfuerzo no es uniforme.

## γ_{f}
Hanson y Hanson (1968) midieron qué parte del momento pasa por flexión; con columna cuadrada, γ_{f} = 0.6.`,
key:['M_{0} = [[w_{u}ℓ_{2}ℓ_{n}^{2}|8]]','b_{o} = 4(c + d)','v_{c} = mín(0.33; 0.17(1 + 2/β); 0.083(α_{s}d/b_{o} + 2))√{f\'_{c}}','γ_{f} = [[1|1 + (2/3)√{b_{1}/b_{2}}]]'],
err:'Diseñar una losa plana sin verificar punzonamiento en las columnas de borde y esquina.',
x:[['zap','Punzonamiento en zapatas'],['l2d','Losas en dos direcciones'],['cap2','Comportamiento sísmico']],
g:[
r=>{const c=r.i(300,800,25),d=r.i(150,350,5);return{q:`Columna interior de ${c} mm y d=${d} mm. Halla b_{o}.`,a:4*(c+d),u:'mm',s:[`= 4(${c} + ${d}) = ${4*(c+d)} mm`]};},
r=>{const w=r.i(8,20,.5),l2=r.i(4,9,.25),ln=r.i(3.5,8.5,.25);return{q:`w_{u}=${w} kPa, ℓ₂=${l2} m, ℓ_{n}=${ln} m. Halla M₀.`,a:w*l2*ln*ln/8,u:'kN·m',s:[`= ${w}·${l2}·${ln}²/8 = ${n(w*l2*ln*ln/8)} kN·m`]};},
r=>{const fc=r.p([21,28,35]),c1=r.i(300,900,50),c2=r.i(300,500,50),d=r.i(150,300,5),as=r.p([40,30,20]);const bo=as===40?2*(c1+d)+2*(c2+d):as===30?2*(c1+d/2)+(c2+d):(c1+d/2)+(c2+d/2);const be=Math.max(c1,c2)/Math.min(c1,c2);const v=Math.min(.33,.17*(1+2/be),.083*(as*d/bo+2))*sq(fc);return{q:`Columna ${c1}×${c2} mm (α_{s}=${as}), d=${d} mm, b_{o}=${n(bo)} mm, f′_{c}=${fc} MPa. Halla v_{c}.`,a:v,u:'MPa',s:[`β = ${n(be)}`,`Expresiones: ${n(.33*sq(fc))}, ${n(.17*(1+2/be)*sq(fc))}, ${n(.083*(as*d/bo+2)*sq(fc))}`,`v_{c} = ${n(v)} MPa`]};},
r=>{const b1=r.i(400,1200,25),b2=r.i(400,1200,25);const gf=1/(1+2/3*sq(b1/b2));return{q:`b₁=${b1} mm, b₂=${b2} mm (dimensiones de la sección crítica). Halla γ_{v}.`,a:1-gf,u:'',s:[`γ_{f} = ${n(gf)}`,`γ_{v} = ${n(1-gf)}`]};},
r=>{const w=r.i(9,16,.5),l1=r.i(5,8,.25),l2=r.i(5,8,.25),c=r.p([400,450,500,600]),h=r.i(200,280,10),fc=r.p([28,35]);const d=h-30,ln=l1-c/1000,bo=4*(c+d),Vu=w*(l1*l2-((c+d)/1000)**2),vc=.33*sq(fc),phiVc=.75*vc*bo*d/1000;return{q:`Losa plana con paños de ${l1}×${l2} m, columna interior cuadrada de ${c} mm, h=${h} mm (d = h − 30), f′_{c}=${fc} MPa, w_{u}=${w} kPa. Halla φV_{c}/V_{u} por punzonamiento sin momento desbalanceado (φ=0.75; manda 0.33√f′_{c}).`,a:phiVc/Vu,u:'',s:[`V_{u} = ${w}·(${l1}·${l2} − ${n(((c+d)/1000)**2,4)}) = ${n(Vu)} kN`,`φV_{c} = 0.75·${n(vc)}·${bo}·${d}/1000 = ${n(phiVc)} kN`,`Relación = ${n(phiVc/Vu)} ${phiVc>=Vu?'(cumple)':'(no cumple: ábaco, capitel o más espesor)'}`]};}
],
cri:[
['¿Por qué las losas planas en zona sísmica alta se usan con muros o pórticos que tomen el sismo?',['Por estética','Porque la conexión losa-columna es frágil por punzonamiento ante desplazamientos laterales grandes','Porque son pesadas','No hay razón'],1,'Varias losas planas colapsaron en sismos por punzonamiento progresivo. La norma pide que otro sistema resista la carga lateral.'],
['La columna de esquina de una losa plana no cumple punzonamiento. ¿Qué opción es razonable?',['Bajar f′_{c}','Ábaco o capitel, aumentar el espesor o colocar estribos o pernos de corte','Quitar acero','Nada'],1,'Todas aumentan la resistencia en la sección crítica; los pernos de corte (studs) son muy eficaces.']
],
ref:['Nilson, Darwin y Dolan, Diseño de estructuras de concreto, capítulo de losas en dos direcciones','ACI 318, capítulos 8 y 22.6','Hanson y Hanson, Concrete slabs and columns subjected to moment and shear (1968)']});

EXT('m09');
SUB('cast',{t:'Energía de deformación y Castigliano',
lec:`Una estructura cargada guarda energía al deformarse, como un resorte.

## Energía de deformación
- Barra axial: U = N²L/(2AE)
- Flexión: U = ∫M²/(2EI) dx
- Armadura: U = ΣN_{i}²L_{i}/(2A_{i}E_{i})

## Segundo teorema de Castigliano (1879)
El desplazamiento en el punto y la dirección de una fuerza P es la derivada de la energía respecto a esa fuerza:

δ = ∂U/∂P

Para hallar el giro, se deriva respecto a un momento aplicado.

## Carga ficticia
Si no hay fuerza donde quieres el desplazamiento, se agrega una ficticia Q, se deriva y luego se hace Q = 0. El resultado es el mismo que el del trabajo virtual: δ = ∫M(∂M/∂P)/EI dx.

## Usos
Deflexiones de vigas curvas, armaduras, pórticos y resolución de estructuras hiperestáticas (derivando respecto a la redundante e igualando a cero).`,
ded:`## Energía de una barra
Al cargar gradualmente de 0 a N, la fuerza crece linealmente con el alargamiento: el trabajo es el área del triángulo, ½Nδ = ½N·NL/(AE) = N²L/(2AE).

## Energía en flexión
Un trozo dx gira dθ = M dx/(EI) bajo un momento que crece de 0 a M: dU = ½M dθ = M²dx/(2EI).

## Castigliano
Si se aumenta la carga P en dP, la energía crece en dU. Esa energía adicional es el trabajo de P durante el desplazamiento extra, en primer orden P·0 + dP·δ (el término de P sobre el desplazamiento adicional se compensa por la linealidad). Así dU = δ·dP y δ = ∂U/∂P. Para cada término: ∂/∂P(∫M²/(2EI)) = ∫M(∂M/∂P)/EI (Hibbeler; Timoshenko).

## Voladizo con carga en la punta
M = −Px; ∂M/∂P = −x; δ = ∫₀^{L}Px²/(EI) dx = PL³/(3EI).`,
key:['U = [[N^{2}L|2AE]]','U = ∫[[M^{2}|2EI]]dx','δ = [[∂U|∂P]]','δ = ∫M[[∂M/∂P|EI]]dx'],
err:'Olvidar hacer cero la carga ficticia después de derivar.',
x:[['tvi','Trabajo virtual'],['def','Flechas'],['flex','Método de las fuerzas']],
g:[
r=>{const N=r.i(10,500,5),L=r.i(1,10,.5),A=r.i(5,100,1),E=200;return{q:`Barra de acero (E=200 GPa) con N=${N} kN, L=${L} m, A=${A} cm². Halla U en J.`,a:N*N*L/(2*A*1e-4*E*1e6)*1000,u:'J',s:[`U = N²L/(2AE) = ${n(N*N*L/(2*A*1e-4*E*1e6)*1000)} J`]};},
r=>{const P=r.i(1,100,1),L=r.i(1,6,.25),EI=r.i(500,50000,500);return{q:`Voladizo con P=${P} kN en la punta, L=${L} m, EI=${EI} kN·m². Halla la flecha con Castigliano.`,a:P*L**3/(3*EI)*1000,u:'mm',s:[`δ = ∫(Px)(x)/EI dx = PL³/3EI = ${n(P*L**3/(3*EI)*1000)} mm`]};},
r=>{const P=r.i(10,200,5),L1=r.i(2,6,.5),L2=r.i(2,6,.5),A=r.i(5,40,1);const t=Math.atan(L2/L1),L3=Math.hypot(L1,L2);const N1=-P/Math.tan(t),N3=P/Math.sin(t);const d=(N1*(-1/Math.tan(t))*L1+N3*(1/Math.sin(t))*L3)/(A*1e-4*200e6);return{q:`Ménsula de dos barras de acero (A=${A} cm², E=200 GPa): una horizontal de ${L1} m y una diagonal que sube ${L2} m. Carga vertical P=${P} kN en el nudo libre. Con Castigliano, halla la flecha vertical.`,a:d*1000,u:'mm',s:[`N_{h} = −P/tan θ = ${n(N1)} kN; N_{d} = P/sen θ = ${n(N3)} kN`,`δ = ΣN(∂N/∂P)L/AE = ${n(d*1000)} mm`]};},
r=>{const P=r.i(5,100,1),L=r.i(2,10,.5),EI=r.i(1000,80000,500);return{q:`Viga simple con P=${P} kN al centro, L=${L} m, EI=${EI} kN·m². Halla la flecha central (PL³/48EI).`,a:P*L**3/(48*EI)*1000,u:'mm',s:[`Con M = Px/2 en cada mitad: δ = 2∫₀^{L/2}(Px/2)(x/2)/EI dx = PL³/48EI = ${n(P*L**3/(48*EI)*1000)} mm`]};},
r=>{const w=r.i(2,40,1),L=r.i(1,5,.25),EI=r.i(500,30000,500);return{q:`Voladizo con w=${w} kN/m, L=${L} m, EI=${EI} kN·m². Con un momento ficticio en la punta, halla el giro allí (wL³/6EI) en radianes.`,a:w*L**3/(6*EI),u:'rad',tol:.01,s:[`M = −wx²/2 − M₀; ∂M/∂M₀ = −1`,`θ = ∫(wx²/2)/EI dx = wL³/6EI = ${n(w*L**3/(6*EI),4)} rad`]};}
],
cri:[
['¿Qué ventaja tiene Castigliano sobre la integración de la elástica en una viga curva o un pórtico?',['Ninguna','No requiere escribir y resolver la ecuación diferencial: basta integrar M²/(2EI) por tramos','Es más exacto siempre','Solo sirve en vigas rectas'],1,'Funciona igual en barras curvas y pórticos con varios tramos.']
],
ref:['Hibbeler, Análisis estructural, capítulo de métodos de energía','Timoshenko y Young, Teoría de las estructuras','Castigliano, Théorie de l\'équilibre des systèmes élastiques (1879)']});
SUB('flex',{t:'Método de las fuerzas (flexibilidad)',
lec:`Para resolver una estructura hiperestática:

1. Se eligen redundantes (reacciones o fuerzas internas sobrantes) y se quitan: queda una estructura isostática "primaria"
2. Se calcula el desplazamiento δ₁₀ en la dirección de la redundante con las cargas reales
3. Se calcula el desplazamiento f₁₁ por una fuerza unitaria en la dirección de la redundante (coeficiente de flexibilidad)
4. **Compatibilidad:** el desplazamiento real debe ser el del apoyo original: δ₁₀ + f₁₁X₁ = Δ₁ (normalmente 0)

Con varias redundantes: [f]{X} = {Δ} − {δ₀}.

## Apoyos elásticos
Si el apoyo es un resorte de rigidez k, el desplazamiento no es cero sino −X₁/k: δ₁₀ + (f₁₁ + 1/k)X₁ = 0.

## Casos clásicos
- Viga empotrada-apoyada con w: R = 3wL/8
- Viga continua de dos tramos iguales con w: reacción central 1.25wL
- Viga biempotrada con P al centro: M = PL/8`,
ded:`## Compatibilidad
En la estructura real, el apoyo no se mueve. En la primaria, la carga lo movería δ₁₀ y la redundante X₁ lo mueve f₁₁X₁. Por superposición, ambos deben sumar cero.

## Viga continua de dos tramos
Quitando el apoyo central queda una viga simple de luz 2L: δ₁₀ = 5w(2L)⁴/(384EI) y f₁₁ = (2L)³/(48EI). X₁ = δ₁₀/f₁₁ = 5w(2L)/8 = 1.25wL.

## Por qué la flexibilidad es la inversa de la rigidez
En el método de las fuerzas las incógnitas son fuerzas y los coeficientes, desplazamientos por fuerza unitaria. En el de rigidez es al revés. Para los mismos grados de libertad, [f] = [K]⁻¹ (Hibbeler; Kassimali).`,
key:['δ_{10} + f_{11}X_{1} = 0','[f]{X} = −{δ_{0}}','δ_{10} + (f_{11} + 1/k)X_{1} = 0'],
err:'Elegir como redundante una reacción cuya eliminación deja la estructura inestable.',
x:[['hip','Estructuras hiperestáticas'],['cast','Desplazamientos por energía'],['alm2','Flexibilidad e inversa']],
g:[
r=>{const w=r.i(5,50,1),L=r.i(3,10,.5);return{q:`Viga continua de dos tramos iguales de ${L} m con w=${w} kN/m. Halla la reacción central.`,a:1.25*w*L,u:'kN',s:[`= 1.25wL = ${n(1.25*w*L)} kN`]};},
r=>{const P=r.i(10,200,5);return{q:`Viga empotrada-apoyada con P=${P} kN al centro. Halla la reacción del apoyo simple (5P/16).`,a:5*P/16,u:'kN',s:[`δ₁₀ = 5PL³/48EI; f₁₁ = L³/3EI`,`R = ${n(5*P/16)} kN`]};},
r=>{const P=r.i(10,200,5),L=r.i(3,10,.5);return{q:`Viga biempotrada con P=${P} kN al centro, L=${L} m. Halla el momento en los empotres.`,a:P*L/8,u:'kN·m',s:[`M = PL/8 = ${n(P*L/8)} kN·m`]};},
r=>{const d10=r.i(5,60,1),f11=r.i(.05,2,.05);return{q:`δ₁₀=${d10} mm y f₁₁=${f11} mm/kN. Halla la redundante X₁ (apoyo rígido).`,a:d10/f11,u:'kN',s:[`X₁ = −δ₁₀/f₁₁ → ${n(d10/f11)} kN (hacia arriba)`]};},
r=>{const w=r.i(5,40,1),L=r.i(3,8,.5),EI=r.i(5000,50000,1000),k=r.i(500,20000,500);const d10=5*w*(2*L)**4/(384*EI),f11=(2*L)**3/(48*EI),X=d10/(f11+1/k);return{q:`Viga de dos tramos de ${L} m con w=${w} kN/m y EI=${EI} kN·m². El apoyo central es un resorte de k=${k} kN/m (por ejemplo, una viga que se apoya en otra). Halla la reacción central.`,a:X,u:'kN',s:[`δ₁₀ = ${n(d10*1000)} mm; f₁₁ = ${n(f11*1000,4)} mm/kN`,`X = δ₁₀/(f₁₁ + 1/k) = ${n(X)} kN (rígido daría ${n(1.25*w*L)} kN)`]};}
],
cri:[
['Una viga se apoya sobre otra viga flexible en vez de una columna. ¿Qué cambia?',['Nada','El apoyo cede: la reacción es menor que con apoyo rígido y crece el momento en los tramos','Se vuelve isostática','Mejora'],1,'Un apoyo elástico redistribuye las fuerzas. Modelarlo como rígido puede ser inseguro para los tramos.']
],
ref:['Hibbeler, Análisis estructural, capítulo de método de las fuerzas','Kassimali, Structural Analysis']});
SUB('portal',{t:'Análisis aproximado de pórticos: método del portal',
lec:`Antes de las computadoras, los edificios se analizaban ante viento y sismo con métodos aproximados. Hoy sirven para **verificar** resultados de software y predimensionar.

## Método del portal (Smith, 1915)
Hipótesis para pórticos bajos ante cargas laterales:
1. Hay un punto de inflexión (momento cero) a media altura de cada columna
2. Hay un punto de inflexión al centro de cada viga
3. Las columnas interiores toman el doble de cortante que las exteriores

Con n vanos: cada columna exterior toma V/(2n) y cada interior V/n, siendo V el cortante del piso.

## Momentos
- Columna: M = V_{col}·h/2 (arriba y abajo)
- Viga: por equilibrio de nudos. En un nudo exterior del último piso, el momento de la viga es igual al de la columna
- Cortante en la viga: 2M_{viga}/L

## Fuerza axial en columnas exteriores
Sale de la suma de cortantes de las vigas que llegan a ella.

## Método del voladizo
Para edificios altos y esbeltos: supone que la fuerza axial en las columnas es proporcional a su distancia al centroide del piso (como una viga en flexión).`,
ded:`## Por qué el punto de inflexión a media altura
Si la viga fuera muy rígida, la columna se deformaría en doble curvatura simétrica con momento cero exactamente a media altura. Con vigas reales el punto se desplaza algo, pero la hipótesis es buena para pórticos regulares.

## Por qué interiores con el doble
Un pórtico de n vanos es como n portales simples lado a lado: cada columna interior pertenece a dos portales y las exteriores a uno. Si cada portal toma V/n y lo reparte igual entre sus dos columnas (V/2n), las interiores suman V/n (Hibbeler, Análisis estructural).

## Equilibrio de nudos
La suma de momentos de las barras que llegan a un nudo debe ser cero: lo que entra por las columnas sale por las vigas.`,
key:['V_{ext} = [[V|2n]]; V_{int} = [[V|n]]','M_{col} = V_{col}[[h|2]]','V_{viga} = [[2M_{viga}|L]]'],
err:'Usar el método del portal en edificios altos y esbeltos, donde domina la deformación axial de columnas.',
x:[['dis','Fuerzas sísmicas por piso'],['crs','Cross'],['mk3','Pórtico matricial']],
g:[
r=>{const V=r.i(10,500,5),nn=r.i(1,6,1);return{q:`Pórtico de ${nn} vanos con V=${V} kN en el piso. Halla el cortante en una columna interior${nn===1?' (con 1 vano no hay; halla el de una exterior)':''}.`,a:nn===1?V/2:V/nn,u:'kN',s:[nn===1?`Exterior: V/2 = ${n(V/2)} kN`:`Interior: V/n = ${n(V/nn)} kN; exterior: ${n(V/(2*nn))} kN`]};},
r=>{const V=r.i(5,200,5),h=r.i(2.6,4.5,.1);return{q:`Columna con V=${V} kN y h=${h} m. Halla su momento en los extremos.`,a:V*h/2,u:'kN·m',s:[`= ${V}·${h}/2 = ${n(V*h/2)} kN·m`]};},
r=>{const F=r.i(10,300,5),nn=r.i(1,5,1),h=r.i(2.6,4,.1);return{q:`Último piso de un pórtico de ${nn} vanos con F=${F} kN y h=${h} m. Halla el momento de la viga en el nudo exterior.`,a:F/(2*nn)*h/2,u:'kN·m',s:[`V_{ext} = ${n(F/(2*nn))} kN`,`M_{col} = ${n(F/(2*nn)*h/2)} = M_{viga}`]};},
r=>{const M=r.i(10,300,5),L=r.i(3,9,.5);return{q:`Viga con M=${M} kN·m en cada extremo (punto de inflexión al centro), L=${L} m. Halla su cortante.`,a:2*M/L,u:'kN',s:[`V = 2M/L = ${n(2*M/L)} kN`]};},
r=>{const F2=r.i(20,200,5),F1=r.i(10,150,5),nn=r.i(2,4,1),h=r.i(2.8,3.5,.1);const V1=F1+F2,Vi=V1/nn,Mi=Vi*h/2;const Vt=F2/nn,Mt=Vt*h/2;return{q:`Pórtico de 2 pisos y ${nn} vanos: F₂=${F2} kN en el techo y F₁=${F1} kN en el primer piso, h=${h} m. Halla el momento en el pie de una columna interior del primer piso.`,a:Mi,u:'kN·m',s:[`V del piso 1 = ${V1} kN → interior ${n(Vi)} kN`,`M = ${n(Mi)} kN·m (en el piso 2 sería ${n(Mt)})`]};}
],
cri:[
['El software da momentos en columnas del primer piso 5 veces mayores que el método del portal. ¿Qué haces?',['Confío en el software','Reviso el modelo: cargas, unidades, apoyos. Una diferencia así suele ser un error','Uso el portal','Promedio'],1,'Los métodos aproximados dan órdenes de magnitud; diferencias de 20–30 % son normales, de 5 veces no.']
],
ref:['Hibbeler, Análisis estructural, capítulo de análisis aproximado','Smith, Wind stresses in the frames of office buildings (1915)']});
SUB('kpo',{t:'Longitud efectiva de columnas en pórticos',
lec:`En un pórtico, la longitud efectiva de una columna depende de cuánto la restringen las vigas que llegan a sus extremos.

## Factor G en cada extremo
G = Σ(EI/L)_{columnas}/Σ(EI/L)_{vigas}

- G = 0: empotramiento perfecto (en la práctica se usa 1 para bases empotradas)
- G = ∞: articulación (en la práctica, 10)

## Ábacos de Jackson y Moreland
El ACI y el AISC usan nomogramas. Hay fórmulas que los reproducen bien (reglas francesas, Dumonteil, 1992):

- **Pórtico arriostrado** (sin desplazamiento lateral):
k = [3G_{A}G_{B} + 1.4(G_{A} + G_{B}) + 0.64]/[3G_{A}G_{B} + 2(G_{A} + G_{B}) + 1.28], entre 0.5 y 1

- **Pórtico no arriostrado** (con desplazamiento):
k = √{[1.6G_{A}G_{B} + 4(G_{A} + G_{B}) + 7.5]/(G_{A} + G_{B} + 7.5)}, mayor que 1

## Consecuencia
Una columna en un pórtico que se desplaza lateralmente puede tener k = 1.5 a 2 o más: resiste mucho menos al pandeo que si estuviera arriostrada.

## Concreto
Se usa EI reducido (por ejemplo 0.70I_{g} en columnas y 0.35I_{g} en vigas, por fisuración) al calcular G.`,
ded:`## De dónde salen los ábacos
Julian y Lawrence (1959) resolvieron la estabilidad de una columna con sus vigas vecinas suponiendo que todas las columnas pandean a la vez y que las vigas giran en doble curvatura (arriostrado) o en curvatura simple (no arriostrado). Las ecuaciones trascendentes resultantes se dibujaron como nomogramas (Jackson y Moreland). Las fórmulas francesas son ajustes algebraicos que reproducen esos nomogramas con errores de pocos por ciento.

## Lectura física
G compara la rigidez de las columnas con la de las vigas: vigas rígidas (G pequeño) impiden el giro de los extremos y acortan la longitud efectiva.`,
key:['G = [[Σ(EI/L)_{c}|Σ(EI/L)_{v}]]','k_{arr} = [[3G_{A}G_{B} + 1.4(G_{A}+G_{B}) + 0.64|3G_{A}G_{B} + 2(G_{A}+G_{B}) + 1.28]]','k_{no arr} = √{[[1.6G_{A}G_{B} + 4(G_{A}+G_{B}) + 7.5|G_{A}+G_{B}+7.5]]}'],
err:'Usar k = 1 en un pórtico no arriostrado.',
x:[['pan','Euler'],['esb','Columnas esbeltas'],['com','Columnas de acero']],
g:[
r=>{const Ic=r.i(1,9,.5),Lc=r.i(2.5,5,.1),Iv=r.i(1,9,.5),Lv=r.i(3,9,.5);return{q:`En un nudo llegan dos columnas iguales (I=${Ic}, L=${Lc} m) y dos vigas iguales (I=${Iv}, L=${Lv} m), mismo E. Halla G.`,a:(2*Ic/Lc)/(2*Iv/Lv),u:'',s:[`G = (2·${Ic}/${Lc})/(2·${Iv}/${Lv}) = ${n((Ic/Lc)/(Iv/Lv))}`]};},
r=>{const A=r.i(.2,10,.1),B=r.i(.2,10,.1);return{q:`Pórtico arriostrado con G_{A}=${A} y G_{B}=${B}. Halla k.`,a:(3*A*B+1.4*(A+B)+.64)/(3*A*B+2*(A+B)+1.28),u:'',s:[`k = ${n((3*A*B+1.4*(A+B)+.64)/(3*A*B+2*(A+B)+1.28))}`]};},
r=>{const A=r.i(.2,10,.1),B=r.i(.2,10,.1);return{q:`Pórtico no arriostrado con G_{A}=${A} y G_{B}=${B}. Halla k.`,a:sq((1.6*A*B+4*(A+B)+7.5)/(A+B+7.5)),u:'',s:[`k = ${n(sq((1.6*A*B+4*(A+B)+7.5)/(A+B+7.5)))}`]};},
r=>{const k=r.i(1,2.5,.05),L=r.i(250,600,10),h=r.i(25,70,5);return{q:`k=${k}, ℓ_{u}=${L} cm, columna rectangular de h=${h} cm. Halla kℓ_{u}/r.`,a:k*L/(.3*h),u:'',s:[`r = 0.3h = ${n(.3*h)} cm`,`= ${n(k*L/(.3*h))}`]};},
r=>{const B=r.i(.5,4,.1),EI=r.i(5000,60000,1000),L=r.i(3,6,.25);const A=1;const k=sq((1.6*A*B+4*(A+B)+7.5)/(A+B+7.5));return{q:`Columna de un pórtico no arriostrado con base empotrada (G_{A}=1) y G_{B}=${B} arriba, EI=${EI} kN·m², L=${L} m. Halla P_{cr} = π²EI/(kL)².`,a:PI*PI*EI/(k*L)**2,u:'kN',s:[`k = ${n(k)}`,`P_{cr} = ${n(PI*PI*EI/(k*L)**2)} kN (con k=1 sería ${n(PI*PI*EI/L**2)})`]};}
],
cri:[
['Al agrandar las vigas de un pórtico no arriostrado, ¿qué pasa con la estabilidad de las columnas?',['Empeora','Mejora: G baja, k baja y la carga crítica sube','No cambia','Se vuelve arriostrado'],1,'Vigas más rígidas restringen el giro de los extremos de las columnas.']
],
ref:['AISC 360, comentario del apéndice 7 (longitud efectiva)','Dumonteil, Simple equations for effective length factors (AISC Engineering Journal, 1992)','ACI 318, 6.2.5']});
EXT('m26');
SUB('mk3',{t:'Pórticos planos por rigidez',
lec:`Un pórtico plano tiene, en cada nudo, tres grados de libertad: dos traslaciones y un giro. Su elemento combina la barra (axial) y la viga (flexión).

## Rigidez lateral de un piso
- Columna empotrada en ambos extremos (viga infinitamente rígida): 12EI/h³
- Columna empotrada abajo y articulada arriba: 3EI/h³
- Portal de dos columnas empotradas con viga rígida: 24EI/h³

## Portal con viga flexible (Chopra)
k = (24EI_{c}/h³)·(12ρ + 1)/(12ρ + 4), con ρ = (I_{b}/L)/(2I_{c}/h)

- ρ → ∞ (viga rígida): 24EI_{c}/h³
- ρ = 0 (viga sin rigidez): 6EI_{c}/h³ (dos voladizos)

## Condensación estática
Si la carga lateral solo actúa en la traslación, los giros se eliminan resolviendo sus ecuaciones: K_{lat} = K_{uu} − K_{uθ}K_{θθ}⁻¹K_{θu}. Así se obtiene la rigidez lateral que usa el análisis sísmico.`,
ded:`## 12EI/h³
Una columna empotrada en sus dos extremos que se desplaza Δ sin girar se deforma en doble curvatura. De la ecuación de pendiente-deflexión con θ = 0: M = 6EIΔ/h² en cada extremo. El cortante es la suma de momentos entre la altura: V = 12EIΔ/h³.

## El portal con viga flexible
Se arma la matriz con tres grados de libertad (traslación del piso y giro de los dos nudos superiores). Por simetría ambos giros son iguales. Condensando los giros se obtiene la expresión con ρ (Chopra, Dynamics of Structures, sección 1.3). El cálculo numérico de este subtema verifica la fórmula.

## Condensación
De [K_{uu} K_{uθ}; K_{θu} K_{θθ}]{u; θ} = {F; 0}: θ = −K_{θθ}⁻¹K_{θu}u, y reemplazando en la primera fila: (K_{uu} − K_{uθ}K_{θθ}⁻¹K_{θu})u = F.`,
key:['k = [[12EI|h^{3}]]','k = [[24EI_{c}|h^{3}]]·[[12ρ+1|12ρ+4]]','ρ = [[I_{b}/L|2I_{c}/h]]','K_{lat} = K_{uu} − K_{uθ}K_{θθ}^{−1}K_{θu}'],
err:'Suponer la viga infinitamente rígida cuando es más flexible que las columnas: se sobreestima la rigidez lateral.',
x:[['rig','Rigidez de entrepiso'],['mk2','Elemento viga'],['gdl','Periodo con la rigidez lateral']],
g:[
r=>{const E=r.p([21,25,28]),b=r.i(25,60,5),h=r.i(25,60,5),H=r.i(2.6,4.5,.1);const I=b*h**3/12/1e8,EI=E*1e6*I;return{q:`Columna ${b}×${h} cm empotrada arriba y abajo, H=${H} m, E=${E} GPa. Halla su rigidez lateral en kN/m.`,a:12*EI/H**3,u:'kN/m',s:[`EI = ${n(EI)} kN·m²`,`k = 12EI/H³ = ${n(12*EI/H**3)} kN/m`]};},
r=>{const EI=r.i(5000,80000,1000),h=r.i(2.6,4.5,.1),F=r.i(10,300,5);return{q:`Portal de dos columnas iguales (EI=${EI} kN·m²) con viga rígida, h=${h} m, F=${F} kN. Halla el desplazamiento.`,a:F/(24*EI/h**3)*1000,u:'mm',s:[`k = 24EI/h³ = ${n(24*EI/h**3)} kN/m`,`Δ = ${n(F/(24*EI/h**3)*1000)} mm`]};},
r=>{const EI=r.i(5000,80000,1000),h=r.i(2.6,4.5,.1);return{q:`Portal con columnas articuladas en la base (EI=${EI}), viga rígida, h=${h} m. Halla la rigidez lateral.`,a:6*EI/h**3,u:'kN/m',s:[`2·3EI/h³ = ${n(6*EI/h**3)} kN/m`]};},
r=>{const Ic=r.i(1,9,.5),Ib=r.i(1,15,.5),h=r.i(2.5,4,.1),L=r.i(3,9,.5);const rho=(Ib/L)/(2*Ic/h);return{q:`Portal con I_{c}=${Ic}, I_{b}=${Ib} (mismas unidades), h=${h} m, L=${L} m. Halla ρ y el factor (12ρ + 1)/(12ρ + 4). Escribe el factor.`,a:(12*rho+1)/(12*rho+4),u:'',s:[`ρ = ${n(rho)}`,`Factor = ${n((12*rho+1)/(12*rho+4))} (1 = viga rígida)`]};},
r=>{const E=25e6,bc=r.i(30,50,5),hc=r.i(30,50,5),bb=r.i(25,35,5),hb=r.i(40,70,5),h=r.i(2.8,4,.1),L=r.i(4,8,.5),m=r.i(10,60,1);const Ic=bc*hc**3/12/1e8,Ib=bb*hb**3/12/1e8,rho=(Ib/L)/(2*Ic/h),k=24*E*Ic/h**3*(12*rho+1)/(12*rho+4);return{q:`Portal de concreto (E=25 GPa): columnas ${bc}×${hc} cm de ${h} m, viga ${bb}×${hb} cm de ${L} m, masa ${m} t. Halla su periodo.`,a:2*PI*sq(m/k),u:'s',s:[`ρ = ${n(rho)}`,`k = ${n(k)} kN/m`,`T = 2π√(m/k) = ${n(2*PI*sq(m/k))} s`]};}
],
cri:[
['El periodo calculado de un edificio sale mucho menor que el medido con vibración ambiental. ¿Qué pudo pasar?',['Nada','Se supusieron vigas rígidas o se ignoró la fisuración: el modelo es más rígido que la realidad','El edificio está mal','Siempre pasa al revés'],1,'Suponer vigas infinitamente rígidas sobreestima k; la fisuración también reduce la rigidez real.']
],
ref:['Chopra, Dynamics of Structures, sección 1.3 (rigidez lateral) y capítulo 9','Kassimali, Matrix Analysis of Structures']});
