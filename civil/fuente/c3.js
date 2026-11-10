MOD('m09','Análisis estructural','Estructuras',
'Aquí la carga real baja por la estructura y se calculan las fuerzas internas en edificios hiperestáticos. Es el puente entre la resistencia de materiales y el diseño.',
['Hibbeler, Análisis estructural','Kassimali, Structural Analysis','McCormac, Análisis de estructuras','Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado (Perú)'],
'UNI: Análisis Estructural I (EC-211). PUCP: Introducción al Análisis Estructural (2CIV06) y Análisis Estructural (2CIV02).');
SUB('car',{t:'Metrado de cargas (E.020)',
lec:`Metrar es seguir la ruta de la carga: **losa → viga → columna → zapata → suelo**. Cada elemento recibe lo que le llega por su ancho tributario.

## Carga muerta (CM)
Lo permanente. Concreto armado 2400 kg/m³, albañilería 1800 kg/m³, aligerado de 20 cm: 300 kg/m², piso terminado: 100 kg/m².

## Carga viva (CV), E.020
- Vivienda: 200 kg/m²
- Oficinas y aulas: 250 kg/m²
- Corredores y escaleras: desde 200 kg/m² y hasta 400 según el uso
- Tiendas: 500 kg/m²
- Techo: 100 kg/m²

**Regla rápida para predimensionar:** un edificio de concreto pesa cerca de 1 t/m² por piso.`,
key:['w = (q_{CM} + q_{CV})·a_{trib}','P_{col} = q·A_{trib}·N_{pisos}','w_{viga propia} = 2400·b·h'],fig:'tributaria',
err:'Olvidar el peso propio de la viga y de la columna.',
x:[['vm','w entra a los diagramas'],['fle','Con la carga amplificada se diseña'],['zap','La suma por pisos carga a la zapata'],['esp','El peso total P entra a V sísmico']],
g:[
r=>{const b=r.i(20,40,5),h=r.i(40,80,5);return{q:`Viga de ${b}×${h} cm. Halla el peso propio.`,a:2400*b*h/1e4,u:'kg/m',s:[`w = 2400·${b/100}·${h/100} = ${n(2400*b*h/1e4)} kg/m`]};},
r=>{const q=r.i(300,800,50),a=r.i(2,7,.5);return{q:`Una losa de ${q} kg/m² descarga en una viga con ancho tributario ${a} m. Halla w.`,a:q*a,u:'kg/m',s:[`w = ${q}·${a} = ${n(q*a)} kg/m`]};},
r=>{const al=r.p([280,300,350]),pt=100,ta=r.p([100,150]),a=r.i(3,6,.5),b=r.i(25,30,5),h=r.i(50,70,5);const w=(al+pt+ta)*a+2400*b*h/1e4;return{q:`Viga ${b}×${h} cm con ancho tributario ${a} m. Aligerado ${al}, piso ${pt}, tabiquería ${ta} kg/m². Halla la CM total en kg/m.`,a:w,u:'kg/m',s:[`Losa: ${(al+pt+ta)}·${a} = ${n((al+pt+ta)*a)}`,`Viga: ${n(2400*b*h/1e4)}`,`CM = ${n(w)} kg/m`]};},
r=>{const q=r.p([.9,1,1.1,1.2]),A=r.i(12,40,1),N=r.i(3,12);return{q:`Columna central con A_{trib}=${A} m², ${N} pisos y ${q} t/m². Halla P.`,a:q*A*N,u:'t',s:[`P = ${q}·${A}·${N} = ${n(q*A*N)} t`]};},
r=>{const a=r.i(4,7,.5),b=r.i(4,7,.5),N=r.i(4,10),cm=r.p([500,550,600]),cv=r.p([200,250]),vh=r.p([.25*.6,.3*.6]);const A=a*b,pv=2400*vh*(a+b)/1000,D=(cm*A/1000+pv)*N,L=cv*A/1000*N,Pu=1.4*D+1.7*L;return{q:`Columna central: paños de ${a}×${b} m, ${N} pisos, losa+acabados ${cm} kg/m², vigas de ${n(vh*1e4)} cm² de sección, CV=${cv} kg/m². Halla P_{u}=1.4CM+1.7CV (sin peso de columna).`,a:Pu,u:'t',s:[`A = ${n(A)} m²`,`CM por piso = ${n(cm*A/1000)} + vigas ${n(pv)} t`,`CM total = ${n(D)} t; CV = ${n(L)} t`,`P_{u} = ${n(Pu)} t`]};}
]});
SUB('det',{t:'Estabilidad e indeterminación',
lec:`Una estructura **isostática** se resuelve solo con equilibrio. Una **hiperestática** tiene más incógnitas que ecuaciones, y necesita compatibilidad de deformaciones.

Los edificios son hiperestáticos a propósito: si un elemento cede, la carga busca otro camino. Esa es la **redundancia** que salva vidas en un sismo.

## Conteo
- Viga: GH = r − 3 − c (c = articulaciones internas)
- Pórtico plano: GH = 3b + r − 3n − c
- Armadura plana: GH = b + r − 2n

GH < 0 es un mecanismo inestable.`,
key:['GH_{viga} = r − 3 − c','GH_{pórtico} = 3b + r − 3n − c','GH_{armadura} = b + r − 2n'],
err:'Contar mal las reacciones de un empotramiento, que son 3.',
x:[['arm','Misma fórmula de armaduras'],['hip','Los redundantes se resuelven con compatibilidad'],['rig','El método de rigidez usa grados de libertad']],
g:[
r=>{const c=r.i(1,14);return{q:`Viga continua de ${c+1} tramos sobre ${c+2} apoyos: uno fijo (2 reacciones) y el resto móviles. Halla GH.`,a:c,u:'',s:[`r = 2 + ${c+1} = ${c+3}`,`GH = r − 3 = ${c}`]};},
r=>{const nn=r.i(6,14),b=r.i(2*nn-5,2*nn+2);return{q:`Armadura plana: b=${b} barras, r=3, n=${nn}. Halla GH.`,a:b+3-2*nn,u:'',s:[`GH = ${b} + 3 − ${2*nn} = ${b+3-2*nn}`]};},
r=>{const col=r.i(2,15);return{q:`Pórtico de un piso con ${col} columnas empotradas en la base y ${col-1} vigas. Halla GH.`,a:3*(col-1),u:'',s:[`b = ${2*col-1}, n = ${2*col}, r = ${3*col}`,`GH = 3b + r − 3n = ${3*(col-1)}`]};},
r=>{const p=r.i(2,8),v=r.i(1,5);const cols=v+1;const b=p*cols+p*v,nn=(p+1)*cols,rr=3*cols;return{q:`Pórtico de ${p} pisos y ${v} vanos, empotrado. Halla GH.`,a:3*b+rr-3*nn,u:'',s:[`b = ${b}, n = ${nn}, r = ${rr}`,`GH = 3b+r−3n = ${3*b+rr-3*nn}`,`Atajo: 3·pisos·vanos = ${3*p*v}`]};},
r=>{const p=r.i(2,8),v=r.i(1,5),c=r.i(1,4);const cols=v+1;const b=p*cols+p*v,nn=(p+1)*cols,rr=3*cols;return{q:`Pórtico de ${p} pisos y ${v} vanos con ${c} rótulas plásticas ya formadas. ¿Cuántas rótulas adicionales puede admitir antes de ser un mecanismo? (Rótulas totales = GH+1)`,a:3*b+rr-3*nn+1-c,u:'rótulas',s:[`GH inicial = ${3*p*v}`,`Colapso con GH+1 = ${3*p*v+1}`,`Faltan ${3*p*v+1-c}`]};}
]});
SUB('tvi',{t:'Trabajo virtual',
lec:`Para hallar la flecha en un punto: aplica ahí una **carga ficticia de 1**, calcula sus fuerzas internas n y m, y multiplícalas por las reales.

- Armaduras: δ = Σ N·n·L/(A·E)
- Vigas: δ = ∫M·m dx/(E·I)

La integral tiene atajos tabulados: triángulo × triángulo = ⅓·M·m·L.

**Ventaja:** permite elegir exactamente qué punto y dirección quieres medir, y es la base del método de las fuerzas.`,
key:['δ = Σ[[N·n·L|A·E]]','δ = ∫[[M·m|E·I]]dx','Triángulo·Triángulo = ⅓·M·m·L'],
err:'Olvidar el signo de n en barras a compresión.',
x:[['ene','Es conservación de energía'],['def','Compara con las fórmulas de tabla'],['hip','Los coeficientes de flexibilidad salen de aquí']],
g:[
r=>{const P=r.i(2,20),L=r.i(1,5),A=r.i(5,30);const d=P*1000*L*100/(A*2e6);return{q:`Barra de acero con N=${P} t, n=1, L=${L} m, A=${A} cm². Halla δ.`,a:d,u:'cm',s:[`δ = NnL/AE = ${n(d)} cm`]};},
r=>{const M=r.i(5,50,5),m=r.i(1,4),L=r.i(2,8);return{q:`Diagramas triangulares con máximos M=${M} kN·m y m=${m} m sobre ${L} m. Halla ∫M·m dx.`,a:M*m*L/3,u:'kN·m³',s:[`⅓·${M}·${m}·${L} = ${n(M*m*L/3)}`]};},
r=>{const P=r.i(1,10),L=r.i(2,5),EI=r.i(2000,20000,1000);const d=P*L**3/(3*EI)*1000;return{q:`Voladizo con P=${P} kN, L=${L} m, EI=${EI} kN·m². Con m=x y M=Px, halla δ en la punta.`,a:d,u:'mm',s:[`δ = ⅓·(PL)·L·L/EI`,`δ = ${n(d)} mm`]};},
r=>{const w=r.i(5,30,5),L=r.i(4,10),EI=r.i(10000,60000,5000);const d=w*L**3/(24*EI);return{q:`Viga simple: w=${w} kN/m, L=${L} m, EI=${EI} kN·m². Halla el giro en el apoyo (θ=wL³/24EI), en rad.`,a:d,u:'rad',tol:.02,s:[`θ = ${n(d)} rad`]};},
r=>{const P=r.i(10,60,5),t=r.i(30,60,5),A=r.i(5,25),h=r.i(2,5);const L=h/sind(t);const N=P/(2*sind(t));const d=2*N*(1/(2*sind(t)))*L*100*1000/(A*2e6)*10;return{q:`Dos barras iguales forman un triángulo invertido: P=${P} t abajo, inclinación ${t}°, altura ${h} m, A=${A} cm². Halla el descenso del nudo en mm.`,a:d,u:'mm',s:[`Cada barra: L = ${n(L)} m, N = ${n(N)} t, n = ${n(1/(2*sind(t)))}`,`δ = 2·N·n·L/(AE) = ${n(d)} mm`]};}
]});
SUB('hip',{t:'Vigas hiperestáticas',
lec:`Método de las fuerzas: quita un apoyo sobrante, calcula cuánto se movería ese punto y halla la fuerza que lo devuelve a cero. Es **compatibilidad de deformaciones**.

## Resultados que usarás mucho
- Empotrada-simple con w: reacción simple = 3wL/8, momento en empotre = wL²/8
- Biempotrada con w: momentos = wL²/12 en apoyos y wL²/24 en centro
- Dos tramos iguales con w: momento central = wL²/8, reacción central = 5wL/4

Observa cómo el empotramiento baja el momento máximo a un tercio: por eso las vigas continuas son económicas.

**Tres momentos:** M_{A}L_{1} + 2M_{B}(L_{1}+L_{2}) + M_{C}L_{2} = −(wL_{1}³+wL_{2}³)/4.`,
key:['R = [[3wL|8]]','M_{emp} = [[wL^{2}|12]]','M_{A}L_{1} + 2M_{B}(L_{1}+L_{2}) + M_{C}L_{2} = −[[w_{1}L_{1}^{3}+w_{2}L_{2}^{3}|4]]'],
err:'Aplicar fórmulas de viga simple a una continua. El momento negativo en apoyo existe.',
x:[['def','Compatibilidad usa flechas de tabla'],['crs','Cross resuelve lo mismo sin integrar'],['fle','Los momentos negativos requieren acero arriba']],
g:[
r=>{const w=r.i(5,40,5),L=r.i(3,10);return{q:`Viga biempotrada: w=${w} kN/m, L=${L} m. Halla el momento en el empotre.`,a:w*L*L/12,u:'kN·m',s:[`M = wL²/12 = ${n(w*L*L/12)} kN·m`]};},
r=>{const w=r.i(5,40,5),L=r.i(3,10);return{q:`Empotrada-simple: w=${w} kN/m, L=${L} m. Halla la reacción en el apoyo simple.`,a:3*w*L/8,u:'kN',s:[`R = 3wL/8 = ${n(3*w*L/8)} kN`]};},
r=>{const w=r.i(5,40,5),L=r.i(3,10);const x=3*L/8;return{q:`Empotrada-simple: w=${w} kN/m, L=${L} m. Halla el momento positivo máximo.`,a:9*w*L*L/128,u:'kN·m',s:[`V=0 en x=3L/8 = ${n(x)} m`,`M = 9wL²/128 = ${n(9*w*L*L/128)} kN·m`]};},
r=>{const w=r.i(5,40,5),L=r.i(3,9);return{q:`Viga continua de 2 tramos iguales L=${L} m y w=${w} kN/m. Halla la reacción central.`,a:1.25*w*L,u:'kN',s:[`M_{B} = wL²/8 = ${n(w*L*L/8)} kN·m`,`R_{B} = 5wL/4 = ${n(1.25*w*L)} kN`]};},
r=>{const w=r.i(5,40,5),L1=r.i(3,6),L2=r.i(7,10);const M=(w*L1**3+w*L2**3)/(8*(L1+L2));return{q:`Viga continua de tramos ${L1} m y ${L2} m con apoyos extremos simples y w=${w} kN/m. Halla |M_{B}| con tres momentos.`,a:M,u:'kN·m',s:[`2M_{B}(L₁+L₂) = −w(L₁³+L₂³)/4`,`|M_{B}| = w(L₁³+L₂³)/[8(L₁+L₂)] = ${n(M)} kN·m`]};}
]});
SUB('crs',{t:'Método de Cross',
lec:`Hardy Cross ideó un método genial: **bloquea** los nudos, reparte el desequilibrio, y **transmite** la mitad al otro extremo. Repite hasta que no cambie.

## Pasos
- Rigidez: k = 4EI/L, o 3EI/L si el otro extremo es articulado
- Factor de distribución: FD = k/Σk en el nudo
- Momentos de empotramiento perfecto (FEM)
- Reparte el desbalance, transmite ½, repite

**Imagen:** un nudo con varias barras es como una familia repartiendo un gasto: paga más quien gana más, es decir, el más rígido.`,
key:['k = [[4EI|L]] o [[3EI|L]]','FD = [[k_{i}|Σk]]','FEM = [[wL^{2}|12]] o [[wL^{2}|8]]','Transmisión = ½'],
err:'Olvidar cambiar el signo del desbalance al distribuir.',
x:[['hip','Es otra forma de resolver hiperestáticos'],['rig','Es una iteración sobre la matriz de rigidez'],['sis','Resuelve el sistema sin escribirlo']],
g:[
r=>{const I=r.i(1,5),L=r.i(3,9);return{q:`Barra con I=${I}I₀, L=${L} m y extremo opuesto empotrado. Halla k relativa (4I/L, en I₀/m).`,a:4*I/L,u:'I₀/m',s:[`k = 4·${I}/${L} = ${n(4*I/L)}`]};},
r=>{const L1=r.i(3,8),L2=r.i(3,8);const k1=4/L1,k2=4/L2;return{q:`Nudo con dos barras iguales en I y longitudes ${L1} y ${L2} m (ambas empotradas al otro lado). Halla FD de la primera.`,a:k1/(k1+k2),u:'',s:[`k₁ = 4/${L1}, k₂ = 4/${L2}`,`FD₁ = ${n(k1/(k1+k2))}`]};},
r=>{const w=r.i(5,40,5),L=r.i(3,9);return{q:`Halla FEM de una barra empotrada-empotrada con w=${w} kN/m, L=${L} m.`,a:w*L*L/12,u:'kN·m',s:[`FEM = ${n(w*L*L/12)} kN·m`]};},
r=>{const w1=r.i(10,30,5),w2=r.i(10,30,5),L1=r.i(4,7),L2=r.i(4,7);const F1=w1*L1*L1/12,F2=w2*L2*L2/12,k1=1/L1,k2=1/L2,D1=k1/(k1+k2);const M=F1-(F1-F2)*D1;return{q:`Nudo B central de A-B-C con A y C empotrados, misma EI. Tramo AB: w=${w1}, L=${L1}. Tramo BC: w=${w2}, L=${L2}. Halla |M_{B}| tras distribuir.`,a:M,u:'kN·m',s:[`FEM izq = ${n(F1)}, FEM der = ${n(F2)}`,`FD_{BA} = ${n(D1)}`,`Desbalance = ${n(F1-F2)}`,`M_{B} = ${n(F1)} − ${n(D1)}·${n(F1-F2)} = ${n(M)} kN·m`]};},
r=>{const w=r.i(10,30,5),L1=r.i(4,6),L2=r.i(6,9);const F1=w*L1*L1/8,F2=w*L2*L2/8,k1=3/L1,k2=3/L2,D1=k1/(k1+k2);const M=F1-(F1-F2)*D1;return{q:`Viga continua A-B-C con A y C simples, misma EI, w=${w} kN/m, L₁=${L1} m, L₂=${L2} m. Halla |M_{B}|.`,a:Math.abs(M),u:'kN·m',s:[`Usa k = 3EI/L porque el extremo es articulado`,`FEM con wL²/8: ${n(F1)} y ${n(F2)}`,`FD₁ = ${n(D1)}`,`|M_{B}| = ${n(Math.abs(M))} kN·m (coincide con tres momentos)`]};}
]});
SUB('rig',{t:'Método matricial de rigidez',
lec:`Así piensan los programas. Cada barra tiene una matriz que relaciona fuerzas con desplazamientos. Se ensamblan todas y se resuelve **[K]{d} = {F}**.

## Rigideces básicas
- Barra axial: k = EA/L
- Columna biempotrada lateral: k = 12EI/h³
- Columna empotrada-articulada: k = 3EI/h³
- Elementos en paralelo se suman; en serie, se suman las inversas

**Por qué importa:** si entiendes esto, sabrás cuándo un resultado de ETABS es absurdo. Un programa siempre da números; tú verificas.`,
key:['k = [[E·A|L]]','k_{lat} = [[12EI|h^{3}]]','[K]{d} = {F}','k_{paralelo} = Σk_{i}'],
err:'Usar 12EI/h³ para columnas articuladas en la base.',
x:[['sis','Es álgebra lineal pura'],['gdl','K alimenta el periodo T'],['dri','Con k obtienes el desplazamiento'],['vec','Los cosenos directores rotan la matriz']],
g:[
r=>{const A=r.i(5,50,5),L=r.i(1,8);return{q:`Barra de acero (E=200 GPa), A=${A} cm², L=${L} m. Halla k.`,a:200e6*A*1e-4/L,u:'kN/m',s:[`k = EA/L = ${n(200e6*A*1e-4/L,6)} kN/m`]};},
r=>{const E=r.p([20000,25000,30000]),b=r.i(30,60,5),h=r.i(30,60,5),H=r.i(3,5,.5);const I=b*h**3/12*1e-8;return{q:`Columna ${b}×${h} cm, E=${E} MPa, H=${H} m biempotrada. Halla k lateral.`,a:12*E*1000*I/H**3,u:'kN/m',s:[`I = ${n(I)} m⁴`,`k = 12EI/h³ = ${n(12*E*1000*I/H**3,6)} kN/m`]};},
r=>{const nc=r.i(2,10),k1=r.i(2000,20000,1000);return{q:`Un piso tiene ${nc} columnas iguales de k=${k1} kN/m. Halla k del piso.`,a:nc*k1,u:'kN/m',s:[`k = ${nc}·${k1} = ${nc*k1} kN/m`]};},
r=>{const k1=r.i(1000,8000,500),k2=r.i(1000,8000,500),F=r.i(5,100,5);const d2=F/k1+F/k2;return{q:`Sistema: muro — k₁=${k1} — nudo 1 — k₂=${k2} — nudo 2, con F=${F} kN en nudo 2. Con [K]{d}={F}, halla d₂ en mm.`,a:d2*1000,u:'mm',s:[`K = [[${k1+k2}, −${k2}], [−${k2}, ${k2}]]`,`d₁ = F/k₁ = ${n(F/k1)} m`,`d₂ = ${n(d2)} m = ${n(d2*1000)} mm`]};},
r=>{const F=r.i(50,400,50),nc=r.i(4,12),b=r.i(30,60,5),H=r.i(3,4,.5),E=r.p([22000,25000]);const I=b*b**3/12*1e-8,k=12*E*1000*I/H**3*nc,d=F/k*1000;return{q:`Piso con ${nc} columnas ${b}×${b} cm biempotradas, H=${H} m, E=${E} MPa y cortante ${F} kN. Halla el desplazamiento relativo.`,a:d,u:'mm',s:[`k columna = ${n(k/nc)} kN/m`,`k piso = ${n(k,6)} kN/m`,`Δ = V/k = ${n(d)} mm`]};}
]});

MOD('m10','Concreto armado','Estructuras',
'El material de casi toda construcción peruana. Combinas concreto y acero para que cada uno haga lo que sabe. Sigue la norma E.060, basada en ACI 318.',
['Harmsen, Diseño de estructuras de concreto armado (PUCP)','Ottazzi, Apuntes del curso Concreto Armado 1 (PUCP)','Nilson, Darwin y Dolan, Diseño de estructuras de concreto','Wight y MacGregor, Reinforced Concrete','McCormac y Brown, Diseño de concreto reforzado'],
'UNI: Concreto Armado I (ES-731). PUCP: Concreto Armado 1 (CIV226). MIT: 1.054 Mechanics and Design of Concrete Structures.');
SUB('fle',{t:'Flexión en vigas',
lec:`El diseño se hace por resistencia: la carga amplificada no debe superar la resistencia reducida.

**U = 1.4CM + 1.7CV** (E.060) y **φM_{n} ≥ M_{u}**, con φ = 0.90 para flexión.

## El bloque de Whitney
En rotura, el concreto comprimido se reemplaza por un rectángulo de esfuerzo 0.85f'_{c} y altura a. El acero fluye a f_{y}. Equilibrio T = C:

As·fy = 0.85·f'c·b·a

## Límites
- **A_{s,mín}** evita la falla frágil apenas se fisura.
- **ρ_{máx} = 0.75ρ_{b}** garantiza que el acero fluya primero. Queremos que la viga avise antes de caer.

β₁ = 0.85 para f'_{c} ≤ 280 kg/cm², baja 0.05 cada 70 kg/cm².`,
key:['a = [[A_{s}·f_{y}|0.85·f\'_{c}·b]]','M_{n} = A_{s}·f_{y}(d − [[a|2]])','A_{s,mín} = [[0.7√{f\'_{c}}|f_{y}]]·b·d','ρ_{b} = 0.85β_{1}[[f\'_{c}|f_{y}]]·[[6000|6000+f_{y}]]'],fig:'whitney',
err:'Usar la altura total h en vez del peralte efectivo d.',
x:[['vm','M_{u} sale del diagrama'],['ref','A_{s} se convierte en varillas'],['cte','Luego se revisa el cortante'],['flx','Es la evolución de σ=Mc/I']],
g:[
r=>{const d=r.i(1,15,.5),l=r.i(.5,8,.5);return{q:`Una viga tiene M_{CM}=${d} t·m y M_{CV}=${l} t·m. Halla M_{u}.`,a:1.4*d+1.7*l,u:'t·m',s:[`M_{u} = 1.4(${d}) + 1.7(${l}) = ${n(1.4*d+1.7*l)} t·m`]};},
r=>{const As=r.i(4,30,1),b=r.i(20,40,5),fc=r.p([210,280,350]),fy=4200;return{q:`A_{s}=${As} cm², b=${b} cm, f'_{c}=${fc}, f_{y}=4200 kg/cm². Halla a.`,a:As*fy/(.85*fc*b),u:'cm',s:[`a = ${As}·4200/(0.85·${fc}·${b}) = ${n(As*fy/(.85*fc*b))} cm`]};},
r=>{const As=r.i(6,28,1),b=r.i(25,40,5),d=r.i(40,75,5),fc=r.p([210,280,350]);const a=As*4200/(.85*fc*b),M=.9*As*4200*(d-a/2)/1e5;return{q:`Viga b=${b}, d=${d} cm, A_{s}=${As} cm², f'_{c}=${fc}. Halla φM_{n}.`,a:M,u:'t·m',s:[`a = ${n(a)} cm`,`M_{n} = A_{s}f_{y}(d−a/2)`,`φM_{n} = ${n(M)} t·m`]};},
r=>{const b=r.i(25,40,5),d=r.i(40,75,5),fc=r.p([210,280,350]);return{q:`Viga b=${b}, d=${d} cm, f'_{c}=${fc}. Halla A_{s,mín}.`,a:.7*sq(fc)/4200*b*d,u:'cm²',s:[`A_{s,mín} = 0.7√${fc}/4200·${b}·${d} = ${n(.7*sq(fc)/4200*b*d)} cm²`]};},
r=>{const Mu=r.i(5,50,1),b=r.i(25,40,5),d=r.i(45,75,5),fc=r.p([210,280]);const k=.85*fc*b,As=k/4200*(d-sq(d*d-2*Mu*1e5/(.9*k)));const a=As*4200/k;const bad=!isFinite(As);const Mu2=bad?10:Mu;const As2=bad?k/4200*(d-sq(d*d-2*Mu2*1e5/(.9*k))):As;return{q:`Diseña: M_{u}=${Mu2} t·m, b=${b}, d=${d} cm, f'_{c}=${fc}, f_{y}=4200. Halla A_{s}.`,a:As2,u:'cm²',s:[`Con T=C: M_{u} = φA_{s}f_{y}(d−a/2)`,`a = d − √(d² − 2M_{u}/(φ·0.85f'_{c}b)) = ${n(As2*4200/k)} cm`,`A_{s} = 0.85f'_{c}b·a/f_{y} = ${n(As2)} cm²`,`Compara con A_{s,mín} = ${n(.7*sq(fc)/4200*b*d)} cm²`]};}
]});
SUB('cte',{t:'Cortante y estribos',
lec:`El cortante rompe sin avisar, en diagonal. Por eso se diseña para que nunca falle antes que la flexión. Usa **φ = 0.85**.

- El concreto aporta V_{c} = 0.53√f'_{c}·b·d
- Los estribos aportan V_{s} = A_{v}·f_{y}·d/s
- Debe cumplirse V_{u} ≤ φ(V_{c} + V_{s})

La sección crítica está a d de la cara del apoyo.

En zona sísmica, los estribos se juntan cerca de los nudos: E.060 pide confinamiento para que aparezca una rótula dúctil.

**Límite:** V_{s} ≤ 2.1√f'_{c}·b·d. Si no cumple, agranda la sección.`,
key:['V_{c} = 0.53√{f\'_{c}}·b·d','V_{s} = [[A_{v}·f_{y}·d|s]]','V_{u} ≤ φ(V_{c}+V_{s})','φ = 0.85'],
err:'Tomar A_{v} con una sola rama. Un estribo cerrado tiene dos ramas.',
x:[['cor','Lo que se vio en resistencia'],['moh','Las fisuras siguen la tensión principal'],['esp','Cortante por capacidad en sismo']],
g:[
r=>{const b=r.i(25,40,5),d=r.i(40,75,5),fc=r.p([210,280,350]);return{q:`Viga b=${b}, d=${d} cm, f'_{c}=${fc}. Halla V_{c}.`,a:.53*sq(fc)*b*d/1000,u:'t',s:[`V_{c} = 0.53√${fc}·${b}·${d} = ${n(.53*sq(fc)*b*d/1000)} t`]};},
r=>{const d=r.i(40,75,5),s=r.i(10,25,5),Av=r.p([1.42,2.58]);return{q:`Estribos de A_{v}=${Av} cm² cada ${s} cm, d=${d} cm, f_{y}=4200. Halla V_{s}.`,a:Av*4200*d/s/1000,u:'t',s:[`V_{s} = ${Av}·4200·${d}/${s} = ${n(Av*4200*d/s/1000)} t`]};},
r=>{const b=r.i(25,35,5),d=r.i(40,70,5),fc=r.p([210,280]),s=r.i(10,25,5);const Vc=.53*sq(fc)*b*d/1000,Vs=1.42*4200*d/s/1000;return{q:`Viga b=${b}, d=${d}, f'_{c}=${fc}, estribos 3/8" (A_{v}=1.42 cm²) cada ${s} cm. Halla φV_{n}.`,a:.85*(Vc+Vs),u:'t',s:[`V_{c} = ${n(Vc)} t, V_{s} = ${n(Vs)} t`,`φV_{n} = 0.85·(${n(Vc+Vs)}) = ${n(.85*(Vc+Vs))} t`]};},
r=>{const b=r.i(25,35,5),d=r.i(50,75,5),fc=r.p([210,280]);const Vc=.53*sq(fc)*b*d/1000;const Vu=Math.round(.85*Vc*1.6);const Vs=Vu/.85-Vc,s=1.42*4200*d/1000/Vs;return{q:`V_{u}=${Vu} t, b=${b}, d=${d}, f'_{c}=${fc}. Halla el espaciamiento de estribos 3/8" (A_{v}=1.42 cm²).`,a:s,u:'cm',s:[`V_{c} = ${n(Vc)} t`,`V_{s} = V_{u}/φ − V_{c} = ${n(Vs)} t`,`s = A_{v}f_{y}d/V_{s} = ${n(s)} cm`]};},
r=>{const w=r.i(2,6,.5),L=r.i(5,9),b=r.i(25,35,5),d=r.i(50,70,5),c=.3,fc=r.p([210,280]);const Vu=w*L/2-w*(c/2+d/100);const Vc=.53*sq(fc)*b*d/1000;return{q:`Viga simple L=${L} m, w_{u}=${w} t/m, apoyos de 30 cm, b=${b}, d=${d}, f'_{c}=${fc}. Halla V_{u} en la sección crítica (a d de la cara).`,a:Vu,u:'t',s:[`V en apoyo = ${n(w*L/2)} t`,`Distancia = 0.15 + ${d/100} = ${n(c/2+d/100)} m`,`V_{u} = ${n(Vu)} t; compara con φV_{c}=${n(.85*Vc)} t`]};}
]});
SUB('col',{t:'Columnas',
lec:`Las columnas son lo último que debe fallar. E.060 usa φ = 0.70 para columnas con estribos y 0.75 con espiral, porque la falla es frágil y el daño sería colosal.

La carga axial máxima considera una excentricidad accidental, con un factor de 0.80 para estribos.

## Predimensionamiento (Blanco Blasco)
- Columna central: A_{g} = P_{servicio}/(0.45f'_{c})
- Lateral y esquina: A_{g} = P_{servicio}/(0.35f'_{c})

**Regla sísmica:** columna fuerte, viga débil. Si falla la viga, el piso se daña. Si falla la columna, colapsa el edificio.

Cuantía entre 1 % y 6 %.`,
key:['φP_{n,máx} = 0.80·φ[0.85f\'_{c}(A_{g}−A_{st}) + f_{y}A_{st}]','φ = 0.70','A_{g} = [[P|0.45·f\'_{c}]]','1 % ≤ ρ ≤ 6 %'],
err:'No restar el área de acero del concreto (A_{g} − A_{st}).',
x:[['car','P_{u} viene del metrado'],['axi','Hooke y sección transformada'],['pan','La esbeltez reduce la capacidad'],['zap','La columna carga la zapata']],
g:[
r=>{const b=r.i(25,70,5),h=r.i(25,70,5),As=r.i(10,60,2);return{q:`Columna ${b}×${h} cm con A_{st}=${As} cm². Halla la cuantía en %.`,a:As/(b*h)*100,u:'%',s:[`ρ = ${As}/${b*h} = ${n(As/(b*h)*100)} %`]};},
r=>{const P=r.i(50,500,10),fc=r.p([210,280,350]);return{q:`Columna central con P=${P} t en servicio y f'_{c}=${fc}. Predimensiona A_{g}.`,a:P*1000/(.45*fc),u:'cm²',s:[`A_{g} = ${P*1000}/(0.45·${fc}) = ${n(P*1000/(.45*fc))} cm²`]};},
r=>{const b=r.i(30,70,5),h=r.i(30,70,5),As=r.i(16,60,2),fc=r.p([210,280,350]);const Pn=.85*fc*(b*h-As)+4200*As;return{q:`Columna ${b}×${h} cm, A_{st}=${As} cm², f'_{c}=${fc}. Halla P_{n} nominal puro (sin φ ni 0.80).`,a:Pn/1000,u:'t',s:[`0.85·${fc}(${b*h}−${As}) = ${n(.85*fc*(b*h-As)/1000)} t`,`f_{y}A_{st} = ${n(4200*As/1000)} t`,`P_{n} = ${n(Pn/1000)} t`]};},
r=>{const b=r.i(30,70,5),h=r.i(30,70,5),As=r.i(16,60,2),fc=r.p([210,280,350]);const Pn=.85*fc*(b*h-As)+4200*As;return{q:`Misma columna ${b}×${h}, A_{st}=${As}, f'_{c}=${fc}, con estribos. Halla φP_{n,máx}.`,a:.8*.7*Pn/1000,u:'t',s:[`P_{n} = ${n(Pn/1000)} t`,`φP_{n,máx} = 0.80·0.70·P_{n} = ${n(.56*Pn/1000)} t`]};},
r=>{const Pu=r.i(100,600,20),fc=r.p([210,280]),rho=r.p([.01,.015,.02]);const Ag=Pu*1000/(.56*(.85*fc*(1-rho)+4200*rho));return{q:`Se pide P_{u}=${Pu} t, f'_{c}=${fc}, ρ=${rho*100} %, con estribos. Halla el lado de una columna cuadrada.`,a:sq(Ag),u:'cm',s:[`P_{u} = 0.56·A_{g}[0.85f'_{c}(1−ρ) + ρf_{y}]`,`A_{g} = ${n(Ag)} cm²`,`Lado = ${n(sq(Ag))} cm`]};}
]});
SUB('los',{t:'Losas aligeradas',
lec:`En Perú, el piso más común es el **aligerado**: viguetas de 10 cm cada 40 cm, con ladrillos de techo en medio y losa de 5 cm arriba. Es liviano y barato.

## Espesor (regla práctica)
h ≈ L/25. Usa 17, 20, 25 o 30 cm.

## Por vigueta
Cada vigueta toma un ancho de 40 cm. Se diseña como viga T para momento positivo, y como viga rectangular de 10 cm para el negativo.

## Coeficientes ACI para tramos continuos
- Apoyo interior: wL²/9 o wL²/10
- Tramo extremo: wL²/14
- Tramo interior: wL²/16

Si el cortante no alcanza, se **ensancha** la vigueta retirando ladrillos cerca del apoyo. E.060 permite 1.1V_{c}.`,
key:['h ≈ [[L|25]]','w_{vigueta} = 0.40·w_{u}','M = [[w·L^{2}|C]] (9, 14, 16)','φV_{c} = 0.85·1.1·0.53√{f\'_{c}}·b·d'],
err:'Olvidar el 0.40 y dar a la vigueta la carga de todo el metro.',
x:[['car','La carga viene del metrado'],['fle','Es flexión con b=10 o 40 cm'],['def','El espesor mínimo controla flecha']],
g:[
r=>{const L=r.i(3,7,.25);return{q:`Aligerado con luz de ${L} m. Halla h≈L/25.`,a:L*100/25,u:'cm',s:[`h = ${L*100}/25 = ${n(L*4)} cm`]};},
r=>{const wu=r.i(600,1600,50);return{q:`w_{u}=${wu} kg/m². Halla la carga por vigueta.`,a:wu*.4,u:'kg/m',s:[`w = 0.40·${wu} = ${n(wu*.4)} kg/m`]};},
r=>{const cm=r.p([400,450,500,550]),cv=r.p([200,250,300]);return{q:`CM=${cm} y CV=${cv} kg/m². Halla w_{u} por vigueta.`,a:(1.4*cm+1.7*cv)*.4,u:'kg/m',s:[`w_{u} = ${n(1.4*cm+1.7*cv)} kg/m²`,`Por vigueta = ${n((1.4*cm+1.7*cv)*.4)} kg/m`]};},
r=>{const w=r.i(300,600,20),L=r.i(3,6,.25),C=r.p([9,10,14,16]);return{q:`Vigueta w_{u}=${w} kg/m, L=${L} m, coeficiente 1/${C}. Halla M_{u}.`,a:w*L*L/C,u:'kg·m',s:[`M_{u} = ${w}·${L}²/${C} = ${n(w*L*L/C)} kg·m`]};},
r=>{const w=r.i(300,600,20),L=r.i(3.5,6,.25),d=r.p([14,17,22]),fc=r.p([175,210]);const Vu=1.15*w*L/2-w*d/100;const Vc=.85*1.1*.53*sq(fc)*10*d;return{q:`Vigueta w_{u}=${w} kg/m, L=${L} m, b=10 cm, d=${d} cm, f'_{c}=${fc}. Con V_{u}=1.15wL/2−w·d, halla la relación V_{u}/φV_{c} (si >1, debe ensancharse).`,a:Vu/Vc,u:'',s:[`V_{u} = ${n(Vu)} kg`,`φV_{c} = 0.85·1.1·0.53√f'_{c}·b·d = ${n(Vc)} kg`,`Relación = ${n(Vu/Vc)}`]};}
]});

MOD('m11','Acero y albañilería','Estructuras',
'Dos materiales que en Perú conviven con el concreto: el acero en naves y coberturas, y la albañilería confinada en la mayoría de las viviendas.',
['Segui, Diseño de estructuras de acero con LRFD','McCormac y Csernak, Diseño de estructuras de acero','AISC 360, Specification for Structural Steel Buildings','San Bartolomé, Construcciones de albañilería (PUCP)'],
'UNI: Diseño en Acero (ES-832), Albañilería, Adobe y Madera (ES-931). Normas: E.090 y E.070.');
SUB('ten',{t:'Acero a tensión',
lec:`Un elemento a tensión puede fallar de dos formas:

- **Fluencia** de la sección completa: φ = 0.90
- **Rotura** en la sección neta, donde están los huecos: φ = 0.75

La menor gobierna. A diferencia de la columna, no hay pandeo, así que es muy eficiente.

**Combinación LRFD:** U = 1.2D + 1.6L. Aceros: A36 (F_{y}=2530, F_{u}=4080 kg/cm²); A572 Gr50 (F_{y}=3515, F_{u}=4570).`,
key:['φP_{n} = 0.90·F_{y}·A_{g}','φP_{n} = 0.75·F_{u}·A_{e}','A_{e} = U·A_{n}','U = 1.2D + 1.6L'],
err:'Olvidar agregar 2 mm al diámetro del hueco por daño de perforación.',
x:[['axi','Sigue siendo σ=P/A'],['arm','Las barras a tensión de armaduras se diseñan así'],['per','Las uniones gobiernan el área neta']],
g:[
r=>{const Ag=r.i(5,60,1);return{q:`A36, A_{g}=${Ag} cm². Halla φP_{n} por fluencia.`,a:.9*2530*Ag/1000,u:'t',s:[`0.90·2530·${Ag} = ${n(.9*2530*Ag/1000)} t`]};},
r=>{const Ae=r.i(5,50,1);return{q:`A36, A_{e}=${Ae} cm². Halla φP_{n} por rotura.`,a:.75*4080*Ae/1000,u:'t',s:[`0.75·4080·${Ae} = ${n(.75*4080*Ae/1000)} t`]};},
r=>{const D=r.i(2,30),L=r.i(2,30);return{q:`Tirante con D=${D} t y L=${L} t. Halla P_{u} LRFD.`,a:1.2*D+1.6*L,u:'t',s:[`P_{u} = 1.2(${D}) + 1.6(${L}) = ${n(1.2*D+1.6*L)} t`]};},
r=>{const b=r.i(10,25,1),t=r.p([.6,.8,1,1.2]),nh=r.i(1,3),dh=r.p([1.6,1.9,2.2]);const An=(b-nh*(dh+.2))*t;return{q:`Plancha ${b}×${t} cm con ${nh} hueco(s) de ${dh} cm en la sección. Halla A_{n} (agrega 0.2 cm al hueco).`,a:An,u:'cm²',s:[`Hueco efectivo: ${n(dh+.2)} cm`,`A_{n} = (${b} − ${nh}·${n(dh+.2)})·${t} = ${n(An)} cm²`]};},
r=>{const b=r.i(12,25,1),t=r.p([.8,1,1.2,1.6]),nh=r.i(1,3),dh=r.p([1.6,1.9]),U=r.p([.85,.9,1]);const Ag=b*t,An=(b-nh*(dh+.2))*t,Ae=U*An;const P1=.9*2530*Ag/1000,P2=.75*4080*Ae/1000;return{q:`Plancha A36 ${b}×${t} cm, ${nh} hueco(s) de ${dh} cm, U=${U}. Halla la resistencia de diseño (la menor).`,a:Math.min(P1,P2),u:'t',s:[`Fluencia = ${n(P1)} t`,`A_{e} = ${n(Ae)} cm², rotura = ${n(P2)} t`,`Gobierna ${n(Math.min(P1,P2))} t`]};}
]});
SUB('com',{t:'Acero a compresión',
lec:`Aquí Euler vuelve. AISC usa la esbeltez KL/r para calcular el esfuerzo crítico F_{cr}, con **φ = 0.90**.

- Primero F_{e} = π²E/(KL/r)²
- Si KL/r ≤ 4.71√(E/F_{y}): columna inelástica, F_{cr} = 0.658^{F_{y}/F_{e}}·F_{y}
- Si no: columna elástica, F_{cr} = 0.877·F_{e}

Se recomienda KL/r ≤ 200. E = 2 040 000 kg/cm².`,
key:['F_{e} = [[π^{2}E|(KL/r)^{2}]]','F_{cr} = 0.658^{F_{y}/F_{e}}·F_{y}','F_{cr} = 0.877·F_{e}','φP_{n} = 0.90·F_{cr}·A_{g}'],
err:'Usar el r mayor. Gobierna la esbeltez mayor, es decir el r menor.',
x:[['pan','Base en Euler'],['arm','Las cuerdas superiores se comprimen'],['esp','Los arriostres resisten sismo']],
g:[
r=>{const K=r.p([.65,.8,1,1.2,2]),L=r.i(2,8,.5),rr=r.i(2,10,.5);return{q:`K=${K}, L=${L} m, r=${rr} cm. Halla KL/r.`,a:K*L*100/rr,u:'',s:[`= ${n(K*L*100/rr)}`]};},
r=>{const s=r.i(40,180,5);const Fe=PI*PI*2.04e6/s**2;return{q:`Con KL/r=${s}, halla F_{e}.`,a:Fe,u:'kg/cm²',s:[`F_{e} = π²·2 040 000/${s}² = ${n(Fe)} kg/cm²`]};},
r=>{const Fy=r.p([2320,2530,2800,3160,3515,3870,4220,4570,4920,5270,6330,7030]);return{q:`Para F_{y}=${Fy} kg/cm², halla el límite 4.71√(E/F_{y}).`,a:4.71*sq(2.04e6/Fy),u:'',s:[`= ${n(4.71*sq(2.04e6/Fy))}`]};},
r=>{const s=r.i(40,120,5),Fy=r.p([2530,3515]);const Fe=PI*PI*2.04e6/s**2,lim=4.71*sq(2.04e6/Fy),Fc=s<=lim?.658**(Fy/Fe)*Fy:.877*Fe;return{q:`KL/r=${s}, F_{y}=${Fy}. Halla F_{cr}.`,a:Fc,u:'kg/cm²',s:[`F_{e} = ${n(Fe)} kg/cm²; límite = ${n(lim)}`,s<=lim?`Inelástica: F_{cr} = 0.658^{F_{y}/F_{e}}·F_{y}`:`Elástica: F_{cr} = 0.877F_{e}`,`F_{cr} = ${n(Fc)} kg/cm²`]};},
r=>{const A=r.i(20,120,5),rr=r.i(3,10,.5),L=r.i(3,7,.5),K=r.p([1,.8]),Fy=r.p([2530,3515]);const s=K*L*100/rr,Fe=PI*PI*2.04e6/s**2,lim=4.71*sq(2.04e6/Fy),Fc=s<=lim?.658**(Fy/Fe)*Fy:.877*Fe;return{q:`Columna A=${A} cm², r_{mín}=${rr} cm, L=${L} m, K=${K}, F_{y}=${Fy}. Halla φP_{n}.`,a:.9*Fc*A/1000,u:'t',s:[`KL/r = ${n(s)}`,`F_{cr} = ${n(Fc)} kg/cm²`,`φP_{n} = ${n(.9*Fc*A/1000)} t`]};}
]});
SUB('vac',{t:'Vigas de acero',
lec:`El acero puede plastificar toda la sección. Se usa el módulo plástico Z, que es mayor que S. Si el perfil es compacto y arriostrado:

**φM_{n} = 0.90·F_{y}·Z**

Para rectángulo Z = bh²/4 frente a S = bh²/6; la razón Z/S se llama factor de forma, y en perfiles I vale cerca de 1.12.

El ala comprimida puede pandear lateralmente si no se arriostra: por eso se colocan correas y tensores.

Cortante: φV_{n} = 1.0·0.6·F_{y}·A_{w}.`,
key:['φM_{n} = 0.90·F_{y}·Z','Z_{rect} = [[bh^{2}|4]]','φV_{n} = 0.6·F_{y}·A_{w}'],
err:'Olvidar la flecha. Las vigas de acero muchas veces las gobierna el servicio.',
x:[['flx','Comparar S y Z'],['cen','Geometría de secciones'],['def','Revisar flecha']],
g:[
r=>{const Z=r.i(100,3000,50),Fy=r.p([2530,3515]);return{q:`Z=${Z} cm³, F_{y}=${Fy}. Halla φM_{n}.`,a:.9*Fy*Z/1e5,u:'t·m',s:[`= 0.90·${Fy}·${Z}/10⁵ = ${n(.9*Fy*Z/1e5)} t·m`]};},
r=>{const b=r.i(2,15),h=r.i(10,40,2);return{q:`Rectángulo ${b}×${h} cm. Halla Z.`,a:b*h*h/4,u:'cm³',s:[`Z = bh²/4 = ${n(b*h*h/4)} cm³`]};},
r=>{const h=r.i(20,60,5),t=r.p([.6,.8,1,1.2]),Fy=r.p([2530,3515]);return{q:`Alma ${h}×${t} cm, F_{y}=${Fy}. Halla φV_{n}.`,a:.6*Fy*h*t/1000,u:'t',s:[`φV_{n} = 0.6·${Fy}·${n(h*t)} = ${n(.6*Fy*h*t/1000)} t`]};},
r=>{const w=r.i(1,6,.5),L=r.i(4,12),Fy=r.p([2530,3515]);const Mu=w*L*L/8;return{q:`Viga simple w_{u}=${w} t/m, L=${L} m, F_{y}=${Fy}. Halla Z requerido.`,a:Mu*1e5/(.9*Fy),u:'cm³',s:[`M_{u} = ${n(Mu)} t·m`,`Z = M_{u}/(0.9F_{y}) = ${n(Mu*1e5/(.9*Fy))} cm³`]};},
r=>{const D=r.i(.5,3,.25),Lv=r.i(.5,3,.25),L=r.i(5,12),I=r.i(5000,60000,1000);const d=5*(D+Lv)*10*(L*100)**4/(384*2.04e6*I);return{q:`Viga con servicio D=${D}, L=${Lv} t/m, luz ${L} m, I=${I} cm⁴. Halla la relación δ/(L/360).`,a:d/(L*100/360),u:'',s:[`δ = 5wL⁴/(384EI) = ${n(d)} cm`,`Límite = ${n(L*100/360)} cm`,`Relación = ${n(d/(L*100/360))}`]};}
]});
SUB('per',{t:'Conexiones',
lec:`Un edificio de acero cae por sus uniones, no por sus perfiles. Revisa todas las fallas posibles y usa la menor.

- **Corte del perno:** φ = 0.75, depende de F_{nv} y del área
- **Aplastamiento en plancha:** φ = 0.75, R_{n} = 2.4·d·t·F_{u}
- **Soldadura de filete:** φ = 0.75, garganta = 0.707·tamaño, F_{nw} = 0.6·F_{EXX}

Pernos: A325 tiene F_{nv} ≈ 3800 kg/cm² si la rosca está en el plano de corte. Soldadura E70: F_{EXX} = 4920 kg/cm².`,
key:['φR_{n} = 0.75·F_{nv}·A_{b}','φR_{n} = 0.75·2.4·d·t·F_{u}','φR_{w} = 0.75·0.6·F_{EXX}·0.707·w·L'],
err:'Olvidar duplicar la capacidad si el perno trabaja a corte doble.',
x:[['ten','Los huecos reducen el área'],['cor','El corte del perno es τ=V/A']],
g:[
r=>{const d=r.i(1,4,.1);return{q:`Perno de ${d} cm. Halla su área.`,a:PI*d*d/4,u:'cm²',s:[`A = πd²/4 = ${n(PI*d*d/4)} cm²`]};},
r=>{const d=r.i(1.2,3.8,.1);const A=PI*d*d/4;return{q:`Perno A325 de ${d} cm a corte simple (F_{nv}=3800). Halla φR_{n}.`,a:.75*3800*A/1000,u:'t',s:[`A = ${n(A)} cm²`,`φR_{n} = ${n(.75*3800*A/1000)} t`]};},
r=>{const d=r.p([1.59,1.91,2.22]),t=r.p([.6,.8,1,1.2]);return{q:`Aplastamiento: perno de ${d} cm, plancha A36 t=${t} cm. Halla φR_{n}.`,a:.75*2.4*d*t*4080/1000,u:'t',s:[`= 0.75·2.4·${d}·${t}·4080 = ${n(.75*2.4*d*t*4080/1000)} t`]};},
r=>{const w=r.p([.5,.6,.8,1]),L=r.i(5,40,5);return{q:`Filete E70 de ${w} cm y L=${L} cm. Halla φR_{w}.`,a:.75*.6*4920*.707*w*L/1000,u:'t',s:[`= 0.75·0.6·4920·0.707·${w}·${L} = ${n(.75*.6*4920*.707*w*L/1000)} t`]};},
r=>{const P=r.i(10,80,5),d=r.p([1.59,1.91,2.22]),t=r.p([.8,1,1.2]);const c=.75*3800*PI*d*d/4/1000,ap=.75*2.4*d*t*4080/1000,m=Math.min(c,ap);return{q:`Unión a corte simple: P_{u}=${P} t, pernos A325 de ${d} cm, plancha A36 t=${t} cm. ¿Cuántos pernos? (Da el número decimal requerido)`,a:P/m,u:'pernos',s:[`Corte = ${n(c)} t/perno`,`Aplastamiento = ${n(ap)} t/perno`,`Gobierna ${n(m)} t`,`N = ${n(P/m)}, redondea arriba`]};}
]});
SUB('alb',{t:'Albañilería confinada',
lec:`La mayoría de viviendas peruanas son de ladrillo con columnas y vigas de amarre. La E.070 exige que el muro resista por sí mismo.

## Densidad de muros
En cada dirección: ΣL·t/A_{p} ≥ Z·U·S·N/56. Es la primera revisión que hace un ingeniero, y puede hacerse a mano.

## Esfuerzo axial
σ_{m} ≤ 0.2f'_{m}[1 − (h/35t)²] y además σ_{m} ≤ 0.15f'_{m}.

## Resistencia al corte
V_{m} = 0.5·v'_{m}·α·t·L + 0.23·P_{g}. Ladrillo King Kong industrial: f'_{m} ≈ 65 kg/cm², v'_{m} ≈ 8.1 kg/cm².`,
key:['[[ΣL·t|A_{p}]] ≥ [[Z·U·S·N|56]]','σ_{m} ≤ 0.2f\'_{m}[1−([[h|35t]])^{2}]','V_{m} = 0.5v\'_{m}αtL + 0.23P_{g}'],
err:'Contar muros con menos de 1.2 m o con ladrillo pandereta como muros portantes.',
x:[['esp','Comparte Z, U, S y sismo'],['car','P_{g} viene del metrado'],['dri','Deriva límite 0.005']],
g:[
r=>{const Z=r.p([.45,.35,.25]),S=r.p([1,1.05,1.1,1.2]),N=r.i(2,5);return{q:`Vivienda (U=1) con Z=${Z}, S=${S} y ${N} pisos. Halla la densidad mínima ZUSN/56.`,a:Z*S*N/56,u:'',tol:.01,s:[`= ${Z}·1·${S}·${N}/56 = ${n(Z*S*N/56)}`]};},
r=>{const fm=r.i(30,110,5);return{q:`Con f'_{m}=${fm} kg/cm², ¿cuál es el límite 0.15f'_{m}?`,a:.15*fm,u:'kg/cm²',s:[`= ${n(.15*fm)} kg/cm²`]};},
r=>{const fm=r.p([35,45,55,65,85]),h=r.i(2.3,3,.1),t=r.p([13,23]);const s=.2*fm*(1-(h*100/(35*t))**2);return{q:`Muro h=${h} m, t=${t} cm, f'_{m}=${fm}. Halla el esfuerzo admisible por esbeltez.`,a:s,u:'kg/cm²',s:[`(h/35t)² = ${n((h*100/(35*t))**2)}`,`σ = ${n(s)} kg/cm²`]};},
r=>{const vm=r.p([5.1,8.1,9.2]),L=r.i(2,6,.5),t=r.p([13,23]),P=r.i(5,25);const V=.5*vm*t*L*100/1000+.23*P;return{q:`Muro L=${L} m, t=${t} cm, v'_{m}=${vm}, P_{g}=${P} t, α=1. Halla V_{m}.`,a:V,u:'t',s:[`Término 1: ${n(.5*vm*t*L*100/1000)} t`,`Término 2: ${n(.23*P)} t`,`V_{m} = ${n(V)} t`]};},
r=>{const Z=r.p([.45,.35]),S=r.p([1,1.05,1.15]),N=r.i(2,5),A=r.i(60,150,10),t=.13;const req=Z*S*N/56*A/t;return{q:`Vivienda de ${N} pisos, planta ${A} m², Z=${Z}, S=${S}, U=1, muros t=13 cm. ¿Cuántos metros de muro por dirección se requieren?`,a:req,u:'m',s:[`Densidad = ${n(Z*S*N/56)}`,`ΣL = densidad·A/t = ${n(req)} m`]};}
]});

MOD('m12','Ingeniería sismorresistente','Estructuras',
'El Perú está sobre el Cinturón de Fuego. Este módulo une dinámica, análisis y diseño. Se apoya en la E.030 modificada en mayo de 2026 por la R.M. 183-2026-VIVIENDA.',
['Chopra, Dynamics of Structures','Muñoz Peláez, Ingeniería sismorresistente (apuntes PUCP)','Bazán y Meli, Diseño sísmico de edificios','Norma E.030 Diseño Sismorresistente (RNE)'],
'UNI: Ingeniería Sismorresistente y Prevención de Desastres (ES-831). PUCP: Ingeniería Sismorresistente (2CIV11). MIT: 1.058 Structural Dynamics.');
SUB('gdl',{t:'Sistema de un grado de libertad',
lec:`Modela un edificio como una masa sobre un resorte y un amortiguador:

mü + cu̇ + ku = −m·a_{suelo}

El **amortiguamiento** ζ apaga la vibración; en concreto, cerca de 5 %. Se mide con el decremento logarítmico: comparas dos picos sucesivos.

El **espectro de respuesta** resume cómo responden distintos periodos ante un sismo: dado T, te da la aceleración S_{a}. Con eso, el desplazamiento es S_{d} = S_{a}/ω².`,
key:['ζ = [[c|2mω]]','δ = ln[[u_{1}|u_{2}]] ≈ 2πζ','ω_{d} = ω√{1−ζ^{2}}','S_{d} = [[S_{a}|ω^{2}]]'],
err:'Olvidar que un 5 % de amortiguamiento no cambia casi el periodo, pero sí mucho la amplitud.',
x:[['osc','Es la oscilación libre con amortiguador'],['esp','El espectro da las fuerzas de diseño'],['edo','Es una ecuación diferencial de 2.° orden']],
g:[
r=>{const c=r.i(20,200,10),m=r.i(50,300,10),w=r.i(5,30);return{q:`m=${m} t, ω=${w} rad/s, c=${c} kN·s/m. Halla ζ.`,a:c/(2*m*w)*100,u:'%',s:[`ζ = c/(2mω) = ${n(c/(2*m*w)*100)} %`]};},
r=>{const w=r.i(5,30,1),z=r.p([.02,.05,.1,.2]);return{q:`ω=${w} rad/s, ζ=${z*100} %. Halla ω_{d}.`,a:w*sq(1-z*z),u:'rad/s',tol:.002,s:[`ω_{d} = ${w}·√(1−${z}²) = ${n(w*sq(1-z*z),5)}`]};},
r=>{const u1=r.i(5,30),f=r.i(60,90,5);const d=Math.log(100/f),z=d/(2*PI);return{q:`Picos sucesivos: ${u1} mm y ${n(u1*f/100)} mm. Estima ζ.`,a:z*100,u:'%',s:[`δ = ln(u₁/u₂) = ${n(d)}`,`ζ ≈ δ/2π = ${n(z*100)} %`]};},
r=>{const Sa=r.i(.1,1.2,.05),T=r.i(.2,2,.1);const w=2*PI/T;return{q:`S_{a}=${Sa}g y T=${T} s. Halla S_{d}.`,a:Sa*G/w/w*1000,u:'mm',s:[`ω = ${n(w)} rad/s`,`S_{d} = S_{a}/ω² = ${n(Sa*G/w/w*1000)} mm`]};},
r=>{const m=r.i(100,800,50),k=r.i(5000,60000,5000),Sa=r.p([.2,.3,.4,.5]);const w=sq(k/m),T=2*PI/w,V=m*Sa*G,d=V/k*1000;return{q:`m=${m} t, k=${k} kN/m, S_{a}=${Sa}g. Halla el desplazamiento máximo.`,a:d,u:'mm',s:[`T = ${n(T)} s`,`V = m·S_{a} = ${n(V)} kN`,`u = V/k = ${n(d)} mm`]};}
]});
SUB('esp',{t:'Cortante basal (E.030)',
lec:`La norma condensa toda la dinámica en una fórmula: **V = (Z·U·C·S/R)·P**.

- **Z:** zona. Z4=0.45, Z3=0.35, Z2=0.25, Z1=0.10. Toda Lima y Callao están en zona 4.
- **U:** uso. A esencial=1.5, B importante=1.3, C común=1.0.
- **S:** suelo. Lo da el estudio de suelos con T_{P} y T_{L}.
- **C:** amplificación según T.
- **R:** reducción por ductilidad. R₀: pórticos 8, dual 7, muros 6, albañilería 3, muros de ductilidad limitada 3.5.

## Novedades de la E.030 de 2026
- Los perfiles de suelo se clasifican por V_{s30} y los valores intermedios de S, T_{P} y T_{L} se **interpolan**.
- Se aplica sismo simultáneo: 100 % en una dirección y 30 % en la otra.
- El periodo del terreno T_{s} es obligatorio para categorías A y B en zona 4.
- Muros de ductilidad limitada: R₀ = 3.5 y deriva 0.004.

**Importante:** los ejercicios entregan S, T_{P} y T_{L} como datos. En un proyecto real toma siempre los valores del texto oficial vigente y el régimen de transición de la R.M. 217-2026.`,
key:['V = [[Z·U·C·S|R]]·P','T = [[h_{n}|C_{T}]] (C_{T} = 35, 45 o 60)','C = 2.5 si T ≤ T_{P} (análisis estático)','C = 2.5[[T_{P}|T]] si T_{P} < T < T_{L}','C = 2.5[[T_{P}·T_{L}|T^{2}]] si T > T_{L}','[[C|R]] ≥ 0.11'],fig:'espectro',lab:'espectro',
err:'Usar R₀ sin aplicar los factores de irregularidad: R = R₀·I_{a}·I_{p}.',
x:[['pro','Z sale de un periodo de retorno de 475 años'],['gdl','Es una simplificación del espectro'],['car','P viene del metrado'],['dis','V se reparte por piso'],['res','S y T_{P} dependen del suelo']],
g:[
r=>{const Z=r.p([.45,.35,.25,.1]),U=r.p([1,1.3,1.5]),S=r.p([.8,1,1.05,1.15]),Rr=r.p([8,7,6,3]);const f=Z*U*2.5*S/Rr;return{q:`Z=${Z}, U=${U}, C=2.5, S=${S}, R=${Rr}. Halla el coeficiente V/P.`,a:f,u:'',tol:.01,s:[`ZUCS/R = ${n(f)}`]};},
r=>{const h=r.i(9,45,1.5),ct=r.p([35,45,60]);return{q:`Edificio de ${h} m con C_{T}=${ct}. Halla T.`,a:h/ct,u:'s',s:[`T = ${h}/${ct} = ${n(h/ct)} s`]};},
r=>{const T=r.i(.2,1.8,.05),TP=r.p([.4,.6,.9,1]),TL=r.p([1.6,2,2.5]);const C=T<=TP?2.5:T<TL?2.5*TP/T:2.5*TP*TL/T/T;return{q:`T=${T} s, T_{P}=${TP} s, T_{L}=${TL} s. Halla C (análisis estático).`,a:C,u:'',s:[T<=TP?`T ≤ T_{P}: C=2.5`:T<TL?`T_{P} < T < T_{L}: C=2.5·T_{P}/T`:`T > T_{L}: C=2.5·T_{P}T_{L}/T²`,`C = ${n(C)}`]};},
r=>{const Z=r.p([.45,.35]),U=r.p([1,1.3,1.5]),S=r.p([1,1.05,1.1]),R0=r.p([8,7,6]),P=r.i(500,6000,100);const V=Z*U*2.5*S/R0*P;return{q:`Edificio con T<T_{P}, Z=${Z}, U=${U}, S=${S}, R=${R0}, P=${P} t. Halla V.`,a:V,u:'t',s:[`C = 2.5`,`V = ${n(Z*U*2.5*S/R0)}·${P} = ${n(V)} t`]};},
r=>{const N=r.i(4,16),hp=r.p([2.8,3,3.2]),ct=r.p([35,60]),TP=r.p([.4,.6]),TL=r.p([2,2.5]),Z=.45,U=r.p([1,1.5]),S=r.p([1,1.05]),A=r.i(200,600,50);const Rr=ct===35?8:6,h=N*hp,T=h/ct,C=T<=TP?2.5:T<TL?2.5*TP/T:2.5*TP*TL/T/T,P=N*A*1,V=Z*U*C*S/Rr*P;const CR=Math.max(C/Rr,.11);const V2=Z*U*CR*S*P;return{q:`Edificio en Lima (Z=0.45) de ${N} pisos de ${hp} m, ${ct===35?'pórticos (C_{T}=35, R=8)':'muros (C_{T}=60, R=6)'}, U=${U}, S=${S}, T_{P}=${TP}, T_{L}=${TL}, planta ${A} m², 1 t/m². Halla V.`,a:V2,u:'t',s:[`T = ${n(h)}/${ct} = ${n(T)} s`,`C = ${n(C)}, C/R = ${n(C/Rr)} (mín. 0.11)`,`P = ${n(P)} t`,`V = ${n(V2)} t`]};}
]});
SUB('dis',{t:'Fuerzas por piso',
lec:`El cortante basal se reparte en altura. La fuerza es mayor arriba porque ahí el edificio se mueve más.

F_{i} = α_{i}·V, con α_{i} = P_{i}·h_{i}^{k}/Σ(P_{j}·h_{j}^{k})

- T ≤ 0.5 s: k = 1
- T > 0.5 s: k = 0.75 + 0.5T (máximo 2)

**Cortante de piso:** suma de las fuerzas de arriba. **Momento de volteo:** Σ F_{i}·h_{i}. El volteo llega a la cimentación.

**Excentricidad accidental:** 5 % de la dimensión en planta, para considerar torsión imprevista.`,
key:['F_{i} = [[P_{i}h_{i}^{k}|ΣP_{j}h_{j}^{k}]]·V','k = 0.75 + 0.5T ≤ 2','e = 0.05·L'],
err:'Olvidar el exponente k cuando T > 0.5 s.',
x:[['esp','Reparte V'],['tor','La excentricidad genera torsión'],['zap','El volteo carga la cimentación']],
g:[
r=>{const T=r.i(.55,2.4,.05);return{q:`T=${T} s. Halla k.`,a:Math.min(.75+.5*T,2),u:'',s:[`k = 0.75 + 0.5·${T} = ${n(Math.min(.75+.5*T,2))}`]};},
r=>{const L=r.i(10,50,1);return{q:`Planta de ${L} m. Halla la excentricidad accidental.`,a:.05*L,u:'m',s:[`e = 0.05·${L} = ${n(.05*L)} m`]};},
r=>{const V=r.i(50,400,10),h=r.i(2.7,3.3,.1),P=r.i(100,400,50);const a2=2/3;return{q:`Edificio de 2 pisos iguales (P=${P} t, h=${h} m cada uno), T<0.5 s, V=${V} t. Halla F del piso 2.`,a:V*a2,u:'t',s:[`α₂ = P·2h/(P·h+P·2h) = 2/3`,`F₂ = ${n(V*a2)} t`]};},
r=>{const V=r.i(50,400,10),N=r.i(3,6);const sm=N*(N+1)/2;return{q:`Edificio de ${N} pisos iguales, T<0.5 s, V=${V} t. Halla F del último piso.`,a:V*N/sm,u:'t',s:[`Σ(i) = ${sm}`,`F_{${N}} = V·${N}/${sm} = ${n(V*N/sm)} t`]};},
r=>{const V=r.i(100,500,20),N=r.i(3,6),h=r.i(2.8,3.2,.2);const sm=N*(N+1)/2;let M=0;for(let i=1;i<=N;i++)M+=V*i/sm*i*h;return{q:`Edificio de ${N} pisos de ${h} m, T<0.5 s, V=${V} t. Halla el momento de volteo en la base.`,a:M,u:'t·m',s:[`F_{i} = V·i/${sm}`,`M = ΣF_{i}·i·h = ${n(M)} t·m`]};}
]});
SUB('dri',{t:'Derivas de entrepiso',
lec:`Un edificio flexible rompe tabiques y golpea al vecino. Por eso se limita la **deriva**: desplazamiento relativo dividido entre altura de piso.

Los resultados del análisis elástico deben amplificarse, porque las fuerzas se redujeron con R:

- Regular: Δ = 0.75·R·Δ_{elástico}
- Irregular: Δ = 0.85·R·Δ_{elástico}

## Límites E.030
- Concreto armado: 0.007
- Acero: 0.010
- Albañilería: 0.005
- Madera: 0.010
- Muros de ductilidad limitada: 0.004

Muchas veces **la deriva gobierna** el diseño y por eso se agregan muros.`,
key:['Δ = 0.75·R·Δ_{e}','deriva = [[Δ_{i} − Δ_{i−1}|h]]'],
err:'Comparar el desplazamiento elástico con el límite sin amplificarlo.',
x:[['rig','Δ = V/k'],['esp','R aparece de nuevo'],['alb','La albañilería tiene el menor límite']],
g:[
r=>{const d=r.i(2,25,.5),h=r.i(2.6,3.6,.1);return{q:`Desplazamiento relativo ${d} mm en piso de ${h} m. Halla la deriva.`,a:d/1000/h,u:'',tol:.01,s:[`= ${d/1000}/${h} = ${n(d/1000/h)}`]};},
r=>{const d=r.i(1,10,.5),Rr=r.p([8,7,6,3]);return{q:`Δ elástico relativo = ${d} mm, R=${Rr}, estructura regular. Halla Δ inelástico.`,a:.75*Rr*d,u:'mm',s:[`Δ = 0.75·${Rr}·${d} = ${n(.75*Rr*d)} mm`]};},
r=>{const d=r.i(1,6,.25),Rr=r.p([8,7,6]),h=r.i(2.8,3.4,.1);const D=.75*Rr*d/1000/h;return{q:`Δ_{e}=${d} mm, R=${Rr}, h=${h} m, regular. Halla la deriva inelástica.`,a:D,u:'',tol:.01,s:[`Δ = ${n(.75*Rr*d)} mm`,`Deriva = ${n(D)}`]};},
r=>{const lim=r.p([.007,.005,.01]),Rr=r.p([8,6,3]),h=r.i(2.8,3.4,.1);return{q:`Con límite ${lim}, R=${Rr} y h=${h} m, regular. ¿Qué Δ_{e} máximo admite?`,a:lim*h*1000/(.75*Rr),u:'mm',s:[`Δ_{e} = lim·h/(0.75R) = ${n(lim*h*1000/(.75*Rr))} mm`]};},
r=>{const V=r.i(100,800,20),h=r.p([3,3.2,3.5]),Rr=r.p([8,7]),lim=.007;const dem=lim*h*1000/(.75*Rr);const k=V/dem*1000/1;return{q:`Piso con V=${V} t, h=${h} m, R=${Rr}, deriva máxima 0.007. Halla la rigidez lateral mínima.`,a:k,u:'t/m',s:[`Δ_{e,máx} = ${n(dem)} mm`,`k = V/Δ_{e} = ${n(k)} t/m`]};}
]});
