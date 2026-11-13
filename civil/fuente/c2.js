MOD('m05','Estática','Mecánica',
'Aquí nace el ingeniero. Dibujar un diagrama de cuerpo libre es la habilidad que usarás en todos los cursos siguientes.',
['Hibbeler, Ingeniería mecánica: Estática','Beer, Johnston y Mazurek, Mecánica vectorial: Estática','Meriam y Kraige, Statics'],
'UNI: Estática (EC-111). Prepara directamente Resistencia de Materiales.');
SUB('par',{t:'Equilibrio de una partícula',
lec:`Un cuerpo en reposo cumple ΣF_{x} = 0 y ΣF_{y} = 0. Parece poco, pero resuelve cables, grúas y nudos de armaduras.

## El método de siempre
- Aísla el punto y dibuja el **diagrama de cuerpo libre**
- Pon todas las fuerzas con su ángulo
- Escribe las dos ecuaciones y resuelve

**Ejemplo:** un semáforo colgado de dos cables. Si los cables están casi horizontales, la tensión se dispara. Por eso un cable muy tenso y plano puede romperse con poco peso.`,
key:['ΣF_{x} = 0','ΣF_{y} = 0'],fig:'cables',
err:'Empezar a escribir ecuaciones sin dibujar el diagrama de cuerpo libre.',
x:[['arm','Cada nudo de una armadura es una partícula'],['mom','Agrega momentos para cuerpos rígidos']],
g:[
r=>{const W=r.i(2,50,1);const t=r.i(20,60,5);const T=W/(2*sind(t));return{q:`Una carga de ${W} kN cuelga de dos cables simétricos a ${t}° con la horizontal. Halla la tensión en cada cable.`,a:T,u:'kN',s:[`ΣF_{y}: 2T sen ${t}° = ${W}`,`T = ${n(T)} kN`]};},
r=>{const W=r.i(5,80,5),t=r.i(20,60,5);const T=W/tand(t),C=W/sind(t);return{q:`Una carga de ${W} kN cuelga de un nudo sostenido por un cable horizontal y un puntal a ${t}° sobre la horizontal. Halla la fuerza en el puntal.`,a:C,u:'kN',s:[`ΣF_{y}: C sen ${t}° = ${W}`,`C = ${n(C)} kN`]};},
r=>{const W=r.i(5,100,5),t=r.i(5,25,5);const T=W/(2*sind(t));return{q:`Un letrero de ${W} kN cuelga del centro de un cable casi plano (${t}° con la horizontal). ¿Cuál es la tensión?`,a:T,u:'kN',s:[`T = W/(2 sen θ) = ${n(T)} kN`,`Observa: a menor ángulo, la tensión crece mucho`]};},
r=>{const W=r.i(10,100,5),a=r.i(25,45,5),b=r.i(50,70,5);const T1=W*cosd(b)/sind(a+b),T2=W*cosd(a)/sind(a+b);return{q:`Una carga de ${W} kN cuelga de dos cables: uno a ${a}° y otro a ${b}° con la horizontal, a lados opuestos. Halla la tensión en el cable de ${a}°.`,a:T1,u:'kN',s:[`ΣF_{x}: T₁cos ${a}° = T₂cos ${b}°`,`ΣF_{y}: T₁sen ${a}° + T₂sen ${b}° = ${W}`,`T₁ = W·cos ${b}°/sen(${a}+${b}) = ${n(T1)} kN`]};},
r=>{const W=r.i(10,60,5),Ta=r.i(20,60,5),a=r.i(25,45,5);const Tx=Ta*cosd(a),Ty=W-Ta*sind(a);const F=sq(Tx*Tx+Ty*Ty);return{q:`Un nudo soporta ${W} kN hacia abajo y un cable tira con ${Ta} kN a ${a}° hacia arriba-derecha. ¿Qué fuerza debe dar un segundo elemento para el equilibrio?`,a:F,u:'kN',s:[`Falta F_{x} = ${n(Tx)} kN`,`Falta F_{y} = ${n(Ty)} kN`,`F = √(F_{x}²+F_{y}²) = ${n(F)} kN`]};}
]});
SUB('mom',{t:'Momentos y reacciones',
lec:`Un cuerpo rígido además no debe girar: ΣM = 0. El momento es **fuerza × distancia perpendicular**.

## Apoyos
- **Móvil:** 1 reacción vertical
- **Fijo:** 2 reacciones
- **Empotrado:** 2 fuerzas y 1 momento

## Truco
Toma momentos en un apoyo para eliminar su reacción y obtener la otra directamente. Una carga distribuida se reemplaza por su resultante en el centro.

**Imagen:** un sube y baja. Un niño pesado cerca del centro equilibra a uno liviano lejos.`,
key:['ΣF_{x}=0, ΣF_{y}=0, ΣM=0','R_{B} = [[P·a|L]]','R = w·L (en L/2)'],fig:'viga',
err:'Olvidar el momento de empotramiento al resolver un voladizo.',
x:[['vm','Sin reacciones no hay diagramas'],['car','Las cargas reales llegan a estas reacciones'],['zap','La reacción de la columna es la carga de la zapata']],
g:[
r=>{const P=r.i(10,100,5),L=r.i(4,12),a=r.i(1,L-1);return{q:`Viga simple de ${L} m con P=${P} kN a ${a} m del apoyo A. Halla R_{B}.`,a:P*a/L,u:'kN',s:[`ΣM_{A}=0: R_{B}·${L} = ${P}·${a}`,`R_{B} = ${n(P*a/L)} kN`]};},
r=>{const w=r.i(5,50,5),L=r.i(3,12);return{q:`Viga simple de ${L} m con carga repartida w=${w} kN/m. Halla R_{A}.`,a:w*L/2,u:'kN',s:[`Resultante = ${w*L} kN en el centro`,`R_{A} = ${w*L/2} kN`]};},
r=>{const w=r.i(5,40,5),L=r.i(2,6),P=r.i(5,40,5);const M=w*L*L/2+P*L;return{q:`Voladizo de ${L} m con w=${w} kN/m y P=${P} kN en la punta. Halla el momento de empotramiento.`,a:M,u:'kN·m',s:[`Por w: wL²/2 = ${w*L*L/2} kN·m`,`Por P: PL = ${P*L} kN·m`,`M = ${M} kN·m`]};},
r=>{const L=r.i(6,12),v=r.i(1,3),w=r.i(5,30,5);const T=L+v;const Rb=w*T*T/2/L;return{q:`Viga de ${L} m entre apoyos con volado de ${v} m a la derecha y w=${w} kN/m en toda su longitud. Halla la reacción en el apoyo derecho B.`,a:Rb,u:'kN',s:[`Resultante = ${w*T} kN a ${T/2} m de A`,`R_{B} = ${w*T}·${T/2}/${L} = ${n(Rb)} kN`]};},
r=>{const L=r.i(6,12),w=r.i(10,40,5),a=r.i(1,3),P=r.i(10,60,10);const Ra=w*L/2/1+P*(L-a)/L;const Rb=w*L/2+P*a/L;return{q:`Viga simple de ${L} m con w=${w} kN/m y P=${P} kN a ${a} m de A. Halla R_{A}.`,a:Ra,u:'kN',s:[`Por w: ${w*L/2} kN`,`Por P: P(L−a)/L = ${n(P*(L-a)/L)} kN`,`R_{A} = ${n(Ra)} kN (y R_{B}=${n(Rb)})`]};}
]});
SUB('arm',{t:'Armaduras',
lec:`Una armadura es una estructura de barras unidas en nudos. Cada barra solo trabaja a **tensión o compresión**. Así se aprovecha mucho el material: por eso cubren coliseos y puentes.

## Dos métodos
- **Nudos:** equilibra nudo por nudo, empezando donde haya máximo dos incógnitas.
- **Secciones:** corta la armadura y usa ΣM para hallar directamente una barra.

Condición para armadura plana estáticamente determinada: b + r = 2n.`,
key:['b + r = 2n','F_{cuerda} = [[M|h]]'],fig:'armadura',
err:'Suponer sentido de la fuerza y olvidar el signo. Negativo significa que era compresión.',
x:[['par','Cada nudo es equilibrio de partícula'],['ten','Las barras a tensión se diseñan en acero'],['com','Las barras a compresión pueden pandear'],['det','La condición b+r=2n es indeterminación']],
g:[
r=>{const nn=r.i(4,20),rr=3;const b=2*nn-rr;return{q:`Una armadura plana de ${nn} nudos con r=3 reacciones es determinada. ¿Cuántas barras tiene?`,a:b,u:'barras',s:[`b + r = 2n, b = ${2*nn} − 3 = ${b}`]};},
r=>{const P=r.i(10,80,5),t=r.i(30,60,5);const F=P/2/sind(t);return{q:`Armadura triangular simétrica con P=${P} kN en la cumbre y barras inclinadas ${t}°. Halla la fuerza en cada barra inclinada.`,a:F,u:'kN (compresión)',s:[`Reacciones = P/2`,`Nudo de apoyo: F sen ${t}° = ${P/2}`,`F = ${n(F)} kN`]};},
r=>{const P=r.i(10,80,5),t=r.i(30,60,5);const T=P/2/tand(t);return{q:`En esa misma armadura (P=${P} kN, ${t}°), halla la tensión en la barra inferior horizontal.`,a:T,u:'kN',s:[`Nudo de apoyo: T = F cos θ = (P/2)/tan θ`,`T = ${n(T)} kN`]};},
r=>{const P=r.i(10,40,5),d=r.i(2,5),h=r.i(2,4);const R=2.5*P,M=R*2*d-P*d;const F=M/h;return{q:`Armadura Pratt de 6 paneles de ${d} m y altura ${h} m, con P=${P} kN en cada uno de los 5 nudos interiores (R=${R} kN). Corta en el nudo a 2 paneles del apoyo y halla la fuerza en la cuerda opuesta.`,a:F,u:'kN',s:[`M = R·2d − P·d = ${n(R)}·${2*d} − ${P}·${d} = ${n(M)} kN·m`,`F = M/h = ${n(F)} kN`]};},
r=>{const w=r.i(1,5,.5),L=r.i(12,36,3),h=r.i(2,6);const M=w*L*L/8;const F=M/h;return{q:`Una armadura de L=${L} m y altura ${h} m lleva w=${w} kN/m. Trátala como viga: ¿qué fuerza lleva la cuerda en el centro?`,a:F,u:'kN',s:[`M_{máx} = wL²/8 = ${n(M)} kN·m`,`F = M/h = ${n(F)} kN`,`Es la misma lógica de una viga: el par de fuerzas iguala al momento`]};}
]});
SUB('cen',{t:'Centroides e inercia',
lec:`El **centroide** es el punto de equilibrio de una forma. El **momento de inercia** I mide qué tan lejos del centroide está el material.

Esto explica por qué una regla es fácil de doblar de plano y casi imposible de canto: I crece con la altura al cubo. Por eso las vigas son altas y angostas, y las secciones I concentran el acero lejos del centro.

## Teorema de ejes paralelos
Para secciones compuestas: suma la I propia de cada parte más su área por la distancia al cuadrado.`,
key:['ȳ = [[ΣA_{i}y_{i}|ΣA_{i}]]','I_{rect} = [[b·h^{3}|12]]','I_{circ} = [[π·d^{4}|64]]','I = I_{0} + A·d^{2}'],fig:'seccion',
err:'Elevar b al cubo en lugar de h, la dimensión perpendicular al eje.',
x:[['flx','I controla el esfuerzo de flexión'],['def','La deflexión es inversamente proporcional a EI'],['pan','El pandeo depende de la I menor']],
g:[
r=>{const b=r.i(20,60,5),h=r.i(30,90,5);return{q:`Sección rectangular de ${b}×${h} cm. Calcula I respecto a su eje horizontal centroidal.`,a:b*h**3/12,u:'cm⁴',s:[`I = bh³/12 = ${b}·${h}³/12 = ${n(b*h**3/12,6)} cm⁴`]};},
r=>{const d=r.i(20,120,5);return{q:`Columna circular de ${d} cm de diámetro. Halla I.`,a:PI*d**4/64,u:'cm⁴',s:[`I = πd⁴/64 = ${n(PI*d**4/64,6)} cm⁴`]};},
r=>{const b=r.i(60,180,10),e=r.i(5,20,5),w=r.i(20,40,5),h=r.i(30,70,5);const A1=b*e,A2=w*h,y1=h+e/2,y2=h/2,yb=(A1*y1+A2*y2)/(A1+A2);return{q:`Viga T: ala ${b}×${e} cm sobre alma ${w}×${h} cm. Halla ȳ medido desde la base.`,a:yb,u:'cm',s:[`A₁=${A1} cm² con y=${n(y1)}; A₂=${A2} cm² con y=${n(y2)}`,`ȳ = ΣAy/ΣA = ${n(yb)} cm`]};},
r=>{const b=r.i(60,180,10),e=r.i(5,20,5),w=r.i(20,40,5),h=r.i(30,70,5);const A1=b*e,A2=w*h,y1=h+e/2,y2=h/2,yb=(A1*y1+A2*y2)/(A1+A2);const I=b*e**3/12+A1*(y1-yb)**2+w*h**3/12+A2*(y2-yb)**2;return{q:`Para esa sección T (ala ${b}×${e}, alma ${w}×${h} cm), calcula I centroidal.`,a:I,u:'cm⁴',s:[`ȳ = ${n(yb)} cm`,`Ala: ${n(b*e**3/12)} + ${A1}·${n(y1-yb)}²`,`Alma: ${n(w*h**3/12)} + ${A2}·${n(y2-yb)}²`,`I = ${n(I,6)} cm⁴`]};},
r=>{const bf=r.i(15,30,1),tf=r.i(1,2.5,.25),hw=r.i(25,55,5),tw=r.i(.8,1.4,.2);const h=hw+2*tf;const I=(bf*h**3-(bf-tw)*hw**3)/12;return{q:`Perfil I de acero: alas ${bf}×${tf} cm, alma ${hw}×${tw} cm. Halla I_{x}.`,a:I,u:'cm⁴',s:[`Altura total H = ${n(h)} cm`,`Rectángulo total menos huecos: I=[b_{f}H³−(b_{f}−t_{w})h_{w}³]/12`,`I = ${n(I,6)} cm⁴`]};}
]});
SUB('fri',{t:'Fricción',
lec:`La fricción se opone al deslizamiento: F = μ·N, donde N es la fuerza normal. No depende del área de contacto.

## En ingeniería civil
- Un muro de contención no desliza gracias a la fricción con el suelo.
- En suelos, el ángulo φ actúa como fricción interna: μ = tan φ.
- Un bloque en plano inclinado desliza cuando tan θ > μ. De ahí viene la estabilidad de taludes.`,
key:['F_{máx} = μ·N','μ = tan φ','FS = [[μ·N|F]]'],
err:'Tomar N igual al peso aunque el plano esté inclinado. Allí N = W cos θ.',
x:[['res','El φ de Mohr-Coulomb es fricción'],['emp','El muro se verifica al deslizamiento'],['tal','El talud infinito es un bloque en plano']],
g:[
r=>{const N=r.i(10,200,10),m=r.p([.3,.4,.5,.6,.7]);return{q:`Un bloque con N=${N} kN y μ=${m}. ¿Cuál es la fricción máxima?`,a:N*m,u:'kN',s:[`F = μN = ${n(N*m)} kN`]};},
r=>{const p=r.i(15,40,1);return{q:`Un suelo tiene φ=${p}°. ¿Cuál es el coeficiente de fricción equivalente?`,a:tand(p),u:'',s:[`μ = tan ${p}° = ${n(tand(p))}`]};},
r=>{const W=r.i(20,300,10),t=r.i(5,30,5),m=r.p([.3,.4,.5,.6,.7]);const N=W*cosd(t),T=W*sind(t),FS=m*N/T;return{q:`Bloque de ${W} kN en plano de ${t}° con μ=${m}. Calcula el factor de seguridad al deslizamiento.`,a:FS,u:'',s:[`N = W cos θ = ${n(N)} kN`,`Fuerza que empuja = W sen θ = ${n(T)} kN`,`FS = ${n(m*N)}/${n(T)} = ${n(FS)}`]};},
r=>{const W=r.i(50,400,10),H=r.i(10,120,5),m=r.p([.45,.5,.55,.6]);return{q:`Un muro pesa ${W} kN/m, recibe empuje horizontal ${H} kN/m y μ=${m}. Calcula el FS al deslizamiento.`,a:m*W/H,u:'',s:[`FS = μW/E = ${n(m*W/H)}`,`La norma pide normalmente FS ≥ 1.5`]};},
r=>{const W=r.i(50,300,10),t=r.i(20,35,5),m=r.p([.1,.2,.3]);const F=W*(sind(t)+m*cosd(t));const F2=W*(sind(t)-m*cosd(t));return{q:`Un bloque de ${W} kN en una rampa de ${t}° con μ=${m} se detiene con un cable paralelo a la rampa. ¿Tensión mínima para que no baje?`,a:Math.max(0,F2),u:'kN',s:[`Componente paralela = ${n(W*sind(t))} kN`,`Fricción ayuda: ${n(m*W*cosd(t))} kN`,`T = ${n(Math.max(0,F2))} kN`]};}
]});

MOD('m06','Resistencia de materiales','Mecánica',
'La estática dice qué fuerzas hay. Este módulo dice si el material las aguanta y cuánto se deforma. Es el curso que separa a quien calcula de quien diseña.',
['Gere y Goodno, Mecánica de materiales','Hibbeler, Mecánica de materiales','Beer y Johnston, Mecánica de materiales','Popov, Mecánica de sólidos'],
'UNI: Resistencia de Materiales (ES-531). PUCP: Resistencia de Materiales 1 y 2 (1CIV40, 2CIV01). MIT: 1.050 Solid Mechanics.');
SUB('axi',{t:'Esfuerzo y deformación axial',
lec:`**Esfuerzo** es fuerza por unidad de área: el mismo peso duele más en un tacón que en una zapatilla. **Deformación** es cuánto se alarga cada metro.

Mientras el material es elástico, ambos son proporcionales por la **ley de Hooke**. El módulo E indica la rigidez:

- Acero: E ≈ 2 000 000 kg/cm² (200 GPa)
- Concreto: E ≈ 15 000√f'_{c} kg/cm²

## Acero y concreto juntos
En una columna, ambos se acortan igual. Así el material más rígido toma más carga: se reparte según n = E_{s}/E_{c}.`,
key:['σ = [[P|A]]','ε = [[δ|L]]','σ = E·ε','δ = [[P·L|A·E]]','E_{c} = 15000√{f\'_{c}}'],
err:'Usar el diámetro como radio en el área, o dejar P en toneladas y A en cm².',
x:[['ten','El diseño a tensión parte de σ=P/A'],['col','La columna de concreto armado reparte carga con n'],['cns','El suelo también se comprime con δ=H·ε']],
g:[
r=>{const P=r.i(5,100,5),d=r.p([1.27,1.59,1.91,2.54,3.18]);const A=PI*d*d/4;const s=P*1000/A;return{q:`Una varilla de ${d} cm de diámetro lleva ${P} t a tensión. Halla σ.`,a:s,u:'kg/cm²',s:[`A = πd²/4 = ${n(A)} cm²`,`σ = ${P*1000}/${n(A)} = ${n(s)} kg/cm²`]};},
r=>{const s=r.i(500,4000,100),L=r.i(1,12,.5);const dl=s/2e6*L*1000;return{q:`Una barra de acero con σ=${s} kg/cm² y L=${L} m. ¿Cuánto se alarga?`,a:dl,u:'mm',s:[`ε = σ/E = ${n(s/2e6)}`,`δ = εL = ${n(dl)} mm`]};},
r=>{const fc=r.i(140,560,5);return{q:`Calcula E_{c} para f'_{c}=${fc} kg/cm² (E_{c}=15000√f'_{c}).`,a:15000*sq(fc),u:'kg/cm²',s:[`E_{c} = 15000·√${fc} = ${n(15000*sq(fc),6)} kg/cm²`]};},
r=>{const P=r.i(5,50,5),L=r.i(2,8),A=r.i(5,30,1);const dl=P*1000*L*100/(A*2e6)*10;return{q:`Tirante de acero A=${A} cm², L=${L} m con P=${P} t. Halla δ.`,a:dl,u:'mm',s:[`δ = PL/(AE)`,`δ = ${P*1000}·${L*100}/(${A}·2×10⁶) = ${n(dl/10)} cm = ${n(dl)} mm`]};},
r=>{const fc=r.p([210,280,350]),b=r.i(25,50,5),h=r.i(25,50,5),As=r.p([12,16,20,24,30]),P=r.i(50,250,10);const Ec=15000*sq(fc),nn=2e6/Ec,At=b*h+(nn-1)*As;const s=P*1000/At;return{q:`Columna de ${b}×${h} cm con A_{s}=${As} cm² y f'_{c}=${fc}, carga P=${P} t en rango elástico. Halla σ en el concreto usando sección transformada.`,a:s,u:'kg/cm²',s:[`n = E_{s}/E_{c} = ${n(nn)}`,`A_{t} = A_{g} + (n−1)A_{s} = ${n(At)} cm²`,`σ_{c} = P/A_{t} = ${n(s)} kg/cm²`,`El acero lleva n·σ_{c} = ${n(nn*s)} kg/cm²`]};}
]});
SUB('tor',{t:'Torsión',
lec:`Torsión es retorcer un elemento, como exprimir una toalla. Aparece en vigas de borde que sostienen losas en voladizo y en edificios asimétricos que giran durante un sismo.

Las secciones **huecas y circulares** son las más eficientes, pues el material está lejos del centro.

- El esfuerzo cortante crece desde 0 en el centro hasta el máximo en la superficie.
- J es el momento polar de inercia.`,
key:['τ = [[T·r|J]]','J = [[π·d^{4}|32]]','φ = [[T·L|G·J]]','τ_{hueca} = [[T|2·A_{m}·t]]'],
err:'Usar I en vez de J: para círculo, J = 2I.',
x:[['esp','Los edificios asimétricos sufren torsión en planta'],['cte','El concreto combina torsión con cortante']],
g:[
r=>{const d=r.i(5,30,1);return{q:`Halla J de un eje circular macizo de d=${d} cm.`,a:PI*d**4/32,u:'cm⁴',s:[`J = πd⁴/32 = ${n(PI*d**4/32,6)} cm⁴`]};},
r=>{const T=r.i(10,200,10),d=r.i(5,20,1);const J=PI*d**4/32,t=T*100*(d/2)/J;return{q:`Un eje de d=${d} cm recibe T=${T} kg·m. Halla τ máx.`,a:t,u:'kg/cm²',s:[`T = ${T*100} kg·cm; J = ${n(J)} cm⁴`,`τ = T·r/J = ${n(t)} kg/cm²`]};},
r=>{const T=r.i(50,500,50),d=r.i(5,20,1),L=r.i(1,6,.5),Gc=800000;const J=PI*d**4/32,p=T*100*L*100/(Gc*J);return{q:`Eje de acero (G=800 000 kg/cm²), d=${d} cm, L=${L} m, T=${T} kg·m. Halla el giro en grados.`,a:p*180/PI,u:'°',s:[`φ = TL/GJ = ${n(p)} rad`,`= ${n(p*180/PI)}°`]};},
r=>{const T=r.i(50,1000,50),a=r.i(10,40,5),b=r.i(10,40,5),t=r.i(.5,1.5,.25);const Am=a*b,tt=T*100/(2*Am*t);return{q:`Tubo rectangular ${a}×${b} cm de pared ${t} cm (área media ${a}×${b}) con T=${T} kg·m. Halla τ.`,a:tt,u:'kg/cm²',s:[`A_{m} = ${Am} cm²`,`τ = T/(2A_{m}t) = ${n(tt)} kg/cm²`]};},
r=>{const e=r.i(1,6,.5),V=r.i(50,400,50);const T=V*e;return{q:`Un cortante sísmico de ${V} t actúa con excentricidad ${e} m respecto al centro de rigidez. ¿Qué torsión en planta genera?`,a:T,u:'t·m',s:[`T = V·e = ${T} t·m`,`Por esto se busca simetría en planta`]};}
]});
SUB('vm',{t:'Diagramas de cortante y momento',
lec:`Esta es la herramienta más usada del ingeniero estructural. Corta la viga en cualquier punto y pregúntate qué fuerza y qué momento transmite. Al graficarlos ves dónde reforzar.

## Reglas de oro
- La pendiente de V es la carga: V′ = −w
- La pendiente de M es V: M′ = V
- M es máximo donde V cruza cero
- En carga puntual V salta; en momento puntual M salta

## Casos que debes saber de memoria
- Simple con w: M = wL²/8
- Simple con P centrada: M = PL/4
- Voladizo con w: M = wL²/2
- Empotrada con w: M = wL²/12 en apoyos y wL²/24 en centro

Prueba el laboratorio de abajo: mueve la carga y mira cómo cambian los diagramas.`,
key:['M_{máx} = [[w·L^{2}|8]]','M_{máx} = [[P·L|4]]','[[dM|dx]] = V'],lab:'viga',
err:'Olvidar que M es máximo donde V=0, no necesariamente en el centro.',
x:[['der','M\' = V es la derivada aplicada'],['flx','Con M calculas el esfuerzo'],['fle','Con M calculas el acero'],['car','w viene del metrado']],
g:[
r=>{const w=r.i(5,50,5),L=r.i(3,12);return{q:`Viga simple, w=${w} kN/m, L=${L} m. Halla M máx.`,a:w*L*L/8,u:'kN·m',s:[`M = wL²/8 = ${n(w*L*L/8)} kN·m`]};},
r=>{const P=r.i(10,100,5),L=r.i(3,12);return{q:`Viga simple, P=${P} kN en el centro, L=${L} m. Halla M máx.`,a:P*L/4,u:'kN·m',s:[`M = PL/4 = ${n(P*L/4)} kN·m`]};},
r=>{const P=r.i(10,100,5),L=r.i(4,12),a=r.i(1,L-1);return{q:`Viga simple L=${L} m, P=${P} kN a ${a} m de A. Halla el momento bajo la carga.`,a:P*a*(L-a)/L,u:'kN·m',s:[`R_{A} = P(L−a)/L = ${n(P*(L-a)/L)} kN`,`M = R_{A}·a = ${n(P*a*(L-a)/L)} kN·m`]};},
r=>{const w=r.i(5,40,5),P=r.i(10,80,10),L=r.i(4,12,2);return{q:`Viga simple L=${L} m con w=${w} kN/m y P=${P} kN en el centro. Halla M máx.`,a:w*L*L/8+P*L/4,u:'kN·m',s:[`Superposición: wL²/8 + PL/4`,`= ${n(w*L*L/8)} + ${n(P*L/4)} = ${n(w*L*L/8+P*L/4)} kN·m`]};},
r=>{const L=r.i(6,12),v=r.i(1,3),w=r.i(10,40,5);const Ra=w*(L*L-v*v)/(2*L),x=Ra/w,M=Ra*x-w*x*x/2;return{q:`Viga de L=${L} m con volado de ${v} m a la derecha y w=${w} kN/m en todo. Halla el momento positivo máximo.`,a:M,u:'kN·m',s:[`R_{A} = w(L²−v²)/(2L) = ${n(Ra)} kN`,`V=0 en x = R_{A}/w = ${n(x)} m`,`M = R_{A}x − wx²/2 = ${n(M)} kN·m`]};}
]});
SUB('flx',{t:'Esfuerzos por flexión',
lec:`Cuando una viga se dobla, sus fibras superiores se comprimen y las inferiores se estiran. En el centro hay una línea que no cambia: el **eje neutro**.

El esfuerzo crece linealmente con la distancia al eje neutro. Por eso el material lejano trabaja más, y por eso el perfil I es tan eficiente.

El **módulo de sección** S = I/c resume la eficiencia de la forma.

**Dato clave:** el concreto casi no resiste tensión, por eso se fisura abajo y necesita acero justo ahí.`,
key:['σ = [[M·c|I]] = [[M|S]]','S_{rect} = [[b·h^{2}|6]]','f_{r} = 2√{f\'_{c}}'],
err:'Unidades mezcladas: pasa M a kg·cm si I está en cm⁴.',
x:[['cen','I y c salen de la geometría'],['vac','En acero se diseña con S y Z'],['fle','En concreto se reemplaza por el bloque de Whitney']],
g:[
r=>{const b=r.i(15,40,5),h=r.i(30,80,5);return{q:`Calcula S de una viga ${b}×${h} cm.`,a:b*h*h/6,u:'cm³',s:[`S = bh²/6 = ${n(b*h*h/6,6)} cm³`]};},
r=>{const b=r.i(20,40,5),h=r.i(30,70,5),M=r.i(1,30);const s=M*1e5/(b*h*h/6);return{q:`Viga ${b}×${h} cm con M=${M} t·m. Halla σ máx.`,a:s,u:'kg/cm²',s:[`M = ${M*1e5} kg·cm`,`S = ${n(b*h*h/6)} cm³`,`σ = ${n(s)} kg/cm²`]};},
r=>{const b=r.i(20,40,5),h=r.i(30,70,5),fc=r.p([175,210,280,350]);const fr=2*sq(fc),Mc=fr*(b*h*h/6)/1e5;return{q:`Viga de ${b}×${h} cm con f'_{c}=${fc}. ¿Con qué momento se fisura (M_{cr}=f_{r}·S, f_{r}=2√f'_{c})?`,a:Mc,u:'t·m',s:[`f_{r} = ${n(fr)} kg/cm²`,`M_{cr} = ${n(Mc)} t·m`]};},
r=>{const w=r.i(1,4,.5),L=r.i(4,9),sad=r.p([100,110,120]),b=r.i(15,30,5);const M=w*L*L/8*1e5;const h=sq(6*M/(b*sad));return{q:`Viga de madera de ancho ${b} cm, L=${L} m, w=${w} t/m y σ_{adm}=${sad} kg/cm². Halla la altura mínima.`,a:h,u:'cm',s:[`M = wL²/8 = ${n(M/1e5)} t·m`,`h = √(6M/(bσ)) = ${n(h)} cm`]};},
r=>{const b=r.i(60,150,10),e=r.i(5,15,5),w=r.i(20,35,5),h=r.i(30,60,5),M=r.i(5,50,5);const A1=b*e,A2=w*h,y1=h+e/2,y2=h/2,yb=(A1*y1+A2*y2)/(A1+A2),I=b*e**3/12+A1*(y1-yb)**2+w*h**3/12+A2*(y2-yb)**2;const s=M*1e5*yb/I;return{q:`Viga T (ala ${b}×${e}, alma ${w}×${h} cm) con M=${M} t·m positivo. Halla σ en la fibra inferior.`,a:s,u:'kg/cm²',s:[`ȳ = ${n(yb)} cm`,`I = ${n(I,6)} cm⁴`,`σ = M·ȳ/I = ${n(s)} kg/cm²`]};}
]});
SUB('cor',{t:'Esfuerzo cortante en vigas',
lec:`Apila hojas de papel y dóblalas: se deslizan entre sí. Si las pegas, la cola resiste ese deslizamiento. Ese es el **cortante**.

El esfuerzo es máximo en el eje neutro y cero en las fibras extremas, justo al revés que la flexión.

Para rectángulo: τ_{máx} = 1.5·V/A. En perfiles I, casi todo lo toma el alma: τ ≈ V/(h·t_{w}).

En concreto, el cortante produce fisuras inclinadas a 45°. Por eso se colocan **estribos**.`,
key:['τ = [[V·Q|I·b]]','τ_{rect} = [[3V|2A]]','τ_{circ} = [[4V|3A]]'],
err:'Calcular Q con el área total en vez del área arriba del punto.',
x:[['moh','Cortante y normal se combinan en el círculo de Mohr'],['cte','Los estribos resisten este cortante'],['vac','En acero se revisa el alma']],
g:[
r=>{const V=r.i(2,40,2),b=r.i(20,40,5),h=r.i(30,70,5);return{q:`Viga ${b}×${h} cm con V=${V} t. Halla τ máx.`,a:1.5*V*1000/(b*h),u:'kg/cm²',s:[`τ = 1.5V/A = ${n(1.5*V*1000/(b*h))} kg/cm²`]};},
r=>{const V=r.i(2,40,2),d=r.i(25,70,5);const A=PI*d*d/4;return{q:`Sección circular d=${d} cm con V=${V} t. Halla τ máx.`,a:4*V*1000/(3*A),u:'kg/cm²',s:[`τ = 4V/(3A) = ${n(4*V*1000/(3*A))} kg/cm²`]};},
r=>{const V=r.i(5,60,5),h=r.i(20,60,5),t=r.i(.6,1.4,.2);return{q:`Perfil I con alma ${h}×${t} cm, V=${V} t. Halla τ promedio en el alma.`,a:V*1000/(h*t),u:'kg/cm²',s:[`τ ≈ V/(h·t_{w}) = ${n(V*1000/(h*t))} kg/cm²`]};},
r=>{const V=r.i(2,30,2),b=r.i(20,40,5),h=r.i(30,70,5),y=r.i(5,10,5);const I=b*h**3/12;const Q=b*(h/2-y)*(h/2+y)/2;return{q:`Viga ${b}×${h} cm, V=${V} t. Halla τ a ${y} cm del eje neutro.`,a:V*1000*Q/(I*b),u:'kg/cm²',s:[`Q = b(h/2−y)(h/2+y)/2 = ${n(Q)} cm³`,`I = ${n(I,6)} cm⁴`,`τ = VQ/(Ib) = ${n(V*1000*Q/(I*b))} kg/cm²`]};},
r=>{const w=r.i(1,5,.5),L=r.i(4,9),b=r.i(20,35,5),h=r.i(40,70,5),vb=r.p([6,8,10]),s=r.i(10,25,5);const V=w*L/2,I=b*h**3/12,Q=b*h*h/8,q=V*1000*Q/I;return{q:`Viga armada de dos tablones ${b}×${h} cm (unión al centro), L=${L} m, w=${w} t/m. Si los pernos están cada ${s} cm, ¿qué fuerza lleva cada perno en el apoyo?`,a:q*s,u:'kg',s:[`V = wL/2 = ${n(V)} t`,`Flujo q = VQ/I = ${n(q)} kg/cm`,`F = q·s = ${n(q*s)} kg`]};}
]});
SUB('def',{t:'Deflexiones',
lec:`Una viga puede resistir sin romperse y aun así ser inútil: si se deforma mucho, se rajan tabiques y vibra incómodo. Por eso se limita la **flecha**.

Integrando dos veces EI·y″ = M obtienes la curva elástica. En la práctica se usan fórmulas de tablas y **superposición**.

Observa la potencia: la flecha crece con L⁴. Si duplicas la luz, se multiplica por 16. Por eso las luces grandes son caras.

Límites típicos: L/360 para sobrecarga con tabiques frágiles, L/240 en otros casos.`,
key:['δ = [[5wL^{4}|384EI]]','δ = [[PL^{3}|48EI]]','δ_{volado} = [[wL^{4}|8EI]]','δ_{volado} = [[PL^{3}|3EI]]'],
err:'Mezclar w en t/m con L en cm. Pasa todo a kg y cm.',
x:[['int','Es integrar dos veces'],['tvi','Trabajo virtual da el mismo resultado'],['los','Espesor mínimo de losas evita calcular flecha'],['hip','La compatibilidad de flechas resuelve vigas hiperestáticas']],
g:[
r=>{const I=r.i(50000,800000,50000),w=r.i(1,4,.5),L=r.i(3,8);const E=2.2e5;const d=5*(w*10)*(L*100)**4/(384*E*I);return{q:`Viga simple: w=${w} t/m, L=${L} m, E=220 000 kg/cm², I=${I} cm⁴. Halla la flecha.`,a:d,u:'cm',s:[`w = ${w*10} kg/cm`,`δ = 5wL⁴/(384EI) = ${n(d)} cm`]};},
r=>{const I=r.i(50000,800000,50000),P=r.i(1,10),L=r.i(3,8);const E=2.2e5;const d=P*1000*(L*100)**3/(48*E*I);return{q:`Viga simple: P=${P} t al centro, L=${L} m, E=220 000 kg/cm², I=${I} cm⁴. Halla δ.`,a:d,u:'cm',s:[`δ = PL³/(48EI) = ${n(d)} cm`]};},
r=>{const I=r.i(30000,300000,30000),P=r.i(1,5,.5),L=r.i(1,4,.5);const E=2.2e5;const d=P*1000*(L*100)**3/(3*E*I);return{q:`Voladizo: P=${P} t en punta, L=${L} m, E=220 000 kg/cm², I=${I} cm⁴. Halla δ.`,a:d,u:'cm',s:[`δ = PL³/(3EI) = ${n(d)} cm`]};},
r=>{const L=r.i(3,10),lim=r.p([240,360,480]);return{q:`Una viga de ${L} m tiene un límite de L/${lim}. ¿Qué flecha máxima se permite?`,a:L*1000/lim,u:'mm',s:[`δ = ${L*1000}/${lim} = ${n(L*1000/lim)} mm`]};},
r=>{const w=r.i(1,5,.5),L=r.i(4,9),b=r.i(20,35,5),fc=r.p([210,280]),lim=r.p([240,360]);const E=15000*sq(fc),Ireq=5*(w*10)*(L*100)**4/(384*E*(L*100/lim));const h=Math.cbrt(12*Ireq/b);return{q:`Para w=${w} t/m, L=${L} m, ancho ${b} cm, f'_{c}=${fc} y límite L/${lim} (sección bruta), halla la altura mínima.`,a:h,u:'cm',s:[`E = ${n(E,6)} kg/cm²`,`I requerida = 5wL⁴/(384Eδ) = ${n(Ireq,6)} cm⁴`,`h = ∛(12I/b) = ${n(h)} cm`]};}
]});
SUB('pan',{t:'Pandeo de columnas',
lec:`Comprime una regla con las manos. Antes de romperse, se dobla de golpe hacia un lado. Eso es **pandeo**: una falla por inestabilidad, no por falta de resistencia.

Euler demostró que depende de la rigidez y de la longitud al cuadrado. La forma de los apoyos cambia la longitud efectiva: K.

- Biarticulada: K = 1
- Empotrada-libre: K = 2
- Biempotrada: K = 0.5
- Empotrada-articulada: K = 0.7

**La esbeltez** KL/r es el dato que importa. Siempre revisa el eje débil.`,
key:['P_{cr} = [[π^{2}EI|(KL)^{2}]]','r = √{[[I|A]]}','σ_{cr} = [[π^{2}E|(KL/r)^{2}]]'],
err:'Revisar el eje fuerte. La columna siempre pandea hacia donde es más débil.',
x:[['com','El diseño AISC parte de Euler'],['col','La esbeltez amplifica momentos en concreto'],['osc','Mayor rigidez, mayor capacidad']],
g:[
r=>{const I=r.i(1000,20000,1000),A=r.i(30,200,10);return{q:`Con I=${I} cm⁴ y A=${A} cm², halla r.`,a:sq(I/A),u:'cm',s:[`r = √(I/A) = ${n(sq(I/A))} cm`]};},
r=>{const L=r.i(2,9,.5),K=r.p([.5,.7,1,2]),rr=r.i(2,12,.5);return{q:`Columna con L=${L} m, K=${K}, r=${rr} cm. Halla la esbeltez KL/r.`,a:K*L*100/rr,u:'',s:[`KL/r = ${K}·${L*100}/${rr} = ${n(K*L*100/rr)}`]};},
r=>{const I=r.i(1000,20000,500),L=r.i(2,8,.5),K=r.p([.5,.7,1,2]);const P=PI*PI*2e6*I/(K*L*100)**2/1000;return{q:`Columna de acero: I=${I} cm⁴, L=${L} m, K=${K}. Halla P_{cr} de Euler.`,a:P,u:'t',s:[`P_{cr} = π²EI/(KL)²`,`= ${n(P)} t`]};},
r=>{const b=r.i(5,15,1),h=r.i(16,40,2),L=r.i(2,5,.5);const I=h*b**3/12;const P=PI*PI*1e5*I/(L*100)**2/1000;return{q:`Puntal de madera ${b}×${h} cm, E=100 000 kg/cm², biarticulado, L=${L} m. Halla P_{cr}.`,a:P,u:'t',s:[`Eje débil: I = ${h}·${b}³/12 = ${n(I)} cm⁴`,`P_{cr} = ${n(P)} t`]};},
r=>{const K1=r.p([.5,.65,.7,.8,1,1.2,2]),K2=r.p([.5,.65,.7,.8,1,1.2,2]),P=r.i(20,200,10);const a=P*(K1/K2)**2;return{q:`Una columna con K=${K1} tiene P_{cr}=${P} t. Si sus apoyos cambian a K=${K2}, ¿cuál es el nuevo P_{cr}?`,a,u:'t',s:[`P_{cr} ∝ 1/K²`,`P′ = ${P}(${K1}/${K2})² = ${n(a)} t`]};}
]});
SUB('moh',{t:'Esfuerzos combinados y Mohr',
lec:`En un mismo punto hay esfuerzo normal y cortante. Al girar el elemento de análisis, los valores cambian. El **círculo de Mohr** es la forma gráfica de verlos todos.

- Los puntos sobre el eje horizontal son los **esfuerzos principales**: sin cortante.
- El radio es el cortante máximo.
- Una fisura en concreto se abre perpendicular al esfuerzo principal de tensión.

**Sorpresa útil:** el mismo círculo describe la falla de suelos. Una herramienta de estructuras reaparece en geotecnia.`,
key:['σ_{prom} = [[σ_{x}+σ_{y}|2]]','R = √{([[σ_{x}−σ_{y}|2]])^{2} + τ^{2}}','σ_{1,2} = σ_{prom} ± R'],fig:'mohr',
err:'Olvidar que en el círculo los ángulos valen el doble (2θ).',
x:[['res','El criterio de Mohr-Coulomb usa el mismo círculo'],['cte','Las fisuras a 45° aparecen por tensión principal']],
g:[
r=>{const sx=r.i(20,200,10),sy=r.i(0,100,10);return{q:`σ_{x}=${sx}, σ_{y}=${sy} kg/cm². Halla σ_{prom}.`,a:(sx+sy)/2,u:'kg/cm²',s:[`σ_{prom} = ${(sx+sy)/2}`]};},
r=>{const sx=r.i(40,200,10),sy=r.i(0,60,10),t=r.i(10,80,5);const R=sq(((sx-sy)/2)**2+t*t);return{q:`σ_{x}=${sx}, σ_{y}=${sy}, τ=${t} kg/cm². Halla el radio de Mohr.`,a:R,u:'kg/cm²',s:[`R = √(${(sx-sy)/2}² + ${t}²) = ${n(R)}`]};},
r=>{const sx=r.i(40,200,10),sy=r.i(0,60,10),t=r.i(10,80,5);const R=sq(((sx-sy)/2)**2+t*t);return{q:`σ_{x}=${sx}, σ_{y}=${sy}, τ=${t} kg/cm². Halla σ₁.`,a:(sx+sy)/2+R,u:'kg/cm²',s:[`σ₁ = σ_{prom} + R = ${(sx+sy)/2} + ${n(R)} = ${n((sx+sy)/2+R)}`]};},
r=>{const sx=r.i(40,200,10),sy=r.i(0,60,10),t=r.i(10,80,5);const a=.5*Math.atan2(2*t,sx-sy)*180/PI;return{q:`σ_{x}=${sx}, σ_{y}=${sy}, τ=${t} kg/cm². Halla el ángulo del plano principal θ_{p}.`,a,u:'°',s:[`tan 2θ = 2τ/(σ_{x}−σ_{y}) = ${n(2*t/(sx-sy))}`,`θ_{p} = ${n(a)}°`]};},
r=>{const M=r.i(2,15),V=r.i(2,15),b=r.i(20,35,5),h=r.i(40,70,5),y=r.i(10,15,5);const I=b*h**3/12,s=M*1e5*y/I,Q=b*(h/2-y)*(h/2+y)/2,t=V*1000*Q/(I*b),s1=s/2+sq((s/2)**2+t*t);return{q:`Viga ${b}×${h} cm con M=${M} t·m y V=${V} t. A ${y} cm bajo el eje neutro, halla el esfuerzo principal de tensión.`,a:s1,u:'kg/cm²',s:[`σ = My/I = ${n(s)} kg/cm²`,`τ = VQ/(Ib) = ${n(t)} kg/cm²`,`σ₁ = σ/2 + √((σ/2)²+τ²) = ${n(s1)} kg/cm²`]};}
]});

MOD('m07','Materiales de construcción','Mecánica',
'No se puede diseñar con lo que no se conoce. Aquí aprendes de qué está hecho el concreto, cómo se dosifica y cómo se comporta el acero de refuerzo.',
['Neville, Tecnología del concreto','Mehta y Monteiro, Concrete: Microstructure, Properties and Materials','Abanto Castillo, Tecnología del concreto (Perú)','Rivva López, Diseño de mezclas (Perú)','Mamlouk y Zaniewski, Materials for Civil and Construction Engineers'],
'UNI: Tecnología de los Materiales, Tecnología del Concreto I. PUCP: Tecnología del Concreto (2CIV04), Materiales de Construcción (2CIV07).');
SUB('agr',{t:'Agregados y granulometría',
lec:`El 70 % del concreto son piedras y arena. Una buena mezcla tiene tamaños variados para que los pequeños llenen huecos. Se mide con un tamizado.

**Módulo de finura (MF):** suma de los % retenidos acumulados en los tamices estándar (N.° 4, 8, 16, 30, 50, 100) entre 100. Para arena: 2.3 a 3.1.

**Humedad:** la arena en obra trae agua. Si no la descuentas, tu mezcla tendrá más agua de la calculada y menos resistencia.

**Peso unitario:** un m³ suelto pesa menos que uno compactado, por los vacíos.`,
key:['MF = [[Σ% ret. acum.|100]]','w = [[P_{húmedo} − P_{seco}|P_{seco}]]','Agua libre = P_{seco}(w − abs)'],
err:'Sumar los retenidos parciales en lugar de los acumulados.',
x:[['mez','MF y humedad entran al diseño de mezclas'],['cla','La granulometría también clasifica suelos']],
g:[
r=>{const p=[r.i(0,5),r.i(8,15),r.i(20,30),r.i(45,60),r.i(70,82),r.i(90,98)];const s=p.reduce((a,b)=>a+b);return{q:`Retenidos acumulados: ${p.join(', ')} %. Halla el MF.`,a:s/100,u:'',s:[`Σ = ${s}`,`MF = ${n(s/100)}`]};},
r=>{const ph=r.i(500,2000,50),w=r.i(1,9,.5);const ps=ph/(1+w/100);return{q:`Una muestra húmeda pesa ${ph} g con humedad ${w} %. ¿Cuánto pesa seca?`,a:ps,u:'g',s:[`P_{seco} = P_{húmedo}/(1+w) = ${n(ps)} g`]};},
r=>{const ph=r.i(500,2000,50),ps=ph-r.i(10,120,5);return{q:`Una muestra pesa ${ph} g húmeda y ${ps} g seca. Halla la humedad.`,a:(ph-ps)/ps*100,u:'%',s:[`w = (${ph}−${ps})/${ps} = ${n((ph-ps)/ps*100)} %`]};},
r=>{const A=r.i(600,900,10),w=r.i(2,8,.5),ab=r.i(.5,2,.25);const lib=A*(w-ab)/100;return{q:`Se usan ${A} kg de arena seca con humedad ${w} % y absorción ${ab} %. ¿Cuánta agua aporta?`,a:lib,u:'L',s:[`Agua libre = A(w−abs) = ${n(lib)} L`,`Debes restarla del agua de la mezcla`]};},
r=>{const x=r.i(30,70,5),m1=r.i(2.4,2.9,.05),m2=r.i(2.9,3.4,.05);const mm=x/100*m1+(1-x/100)*m2;return{q:`Combinas ${x} % de arena A (MF=${n(m1)}) con ${100-x} % de arena B (MF=${n(m2)}). Halla el MF de la mezcla.`,a:mm,u:'',s:[`MF = ${x/100}·${n(m1)} + ${(100-x)/100}·${n(m2)} = ${n(mm)}`]};}
]});
SUB('mez',{t:'Diseño de mezclas de concreto',
lec:`Diseñar una mezcla es elegir proporciones. La regla de oro la descubrió Abrams: **a menos agua respecto del cemento (a/c), mayor resistencia**.

## Método ACI 211, resumido
- Calcula f'_{cr} según el control de obra
- Elige a/c para esa resistencia: 210→0.68, 280→0.57, 350→0.48 (referencial, sin aire)
- Agua según el asentamiento y tamaño de piedra, cerca de 190 a 205 L/m³
- Cemento = agua / (a/c)
- Calcula volúmenes absolutos: la suma debe dar 1 m³

Peso específico: cemento 3.15, agua 1, agregados cerca de 2.65.

**Nunca agregues agua a la mezcla en obra para hacerla más trabajable:** usa aditivo.`,
key:['C = [[A|a/c]]','V = [[C|3150]] + [[A|1000]] + [[P|γ]] + aire = 1 m^{3}'],
err:'Confundir volumen absoluto con volumen aparente del agregado.',
x:[['est','f\'cr viene del control estadístico'],['agr','La humedad corrige el agua'],['apu','El cemento por m³ define el costo']],
g:[
r=>{const A=r.i(170,220,5),ac=r.p([.45,.5,.55,.6,.65,.7]);return{q:`Con ${A} L/m³ de agua y a/c=${ac}, ¿cuánto cemento?`,a:A/ac,u:'kg/m³',s:[`C = ${A}/${ac} = ${n(A/ac)} kg/m³`]};},
r=>{const A=r.i(170,220,5),ac=r.p([.45,.5,.55,.6,.65,.7]);return{q:`Con ${A} L/m³ y a/c=${ac}, ¿cuántas bolsas de cemento por m³?`,a:A/ac/42.5,u:'bolsas',s:[`C = ${n(A/ac)} kg`,`Bolsas = C/42.5 = ${n(A/ac/42.5)}`]};},
r=>{const C=r.i(280,450,10);return{q:`¿Qué volumen absoluto ocupan ${C} kg de cemento (densidad 3150 kg/m³)?`,a:C/3150,u:'m³',s:[`V = ${C}/3150 = ${n(C/3150)} m³`]};},
r=>{const A=r.i(180,210,5),ac=r.p([.5,.55,.6]),g=r.i(900,1050,10),air=r.p([.01,.015,.02]);const C=A/ac;const Vf=1-C/3150-A/1000-g/2700-air;return{q:`Mezcla: A=${A} L, a/c=${ac}, piedra=${g} kg (2700 kg/m³), aire ${air*100} %. Halla la arena (2650 kg/m³) en kg/m³.`,a:Vf*2650,u:'kg/m³',s:[`C = ${n(C)} kg → ${n(C/3150)} m³`,`Agua ${n(A/1000)} m³; piedra ${n(g/2700)} m³; aire ${air} m³`,`V arena = ${n(Vf)} m³`,`Arena = ${n(Vf*2650)} kg`]};},
r=>{const A=r.i(180,210,5),ar=r.i(700,850,10),w=r.i(3,8,.5),ab=r.i(1,2,.5),g=r.i(950,1050,10),wg=r.i(.5,2,.5),abg=r.i(1,2,.5);const c=A-ar*(w-ab)/100-g*(wg-abg)/100;return{q:`Agua de diseño ${A} L. Arena ${ar} kg (w=${w} %, abs=${ab} %), piedra ${g} kg (w=${wg} %, abs=${abg} %). Halla el agua corregida a usar en obra.`,a:c,u:'L',s:[`Aporte arena: ${n(ar*(w-ab)/100)} L`,`Aporte piedra: ${n(g*(wg-abg)/100)} L`,`Agua = ${n(c)} L`]};}
]});
SUB('ref',{t:'Acero de refuerzo',
lec:`El concreto resiste compresión y el acero tensión. En Perú se usa acero grado 60: **f_{y} = 4200 kg/cm²**.

Las varillas se nombran por diámetro en octavos de pulgada:

- 3/8": 0.71 cm², 0.56 kg/m
- 1/2": 1.29 cm², 0.99 kg/m
- 5/8": 2.00 cm², 1.55 kg/m
- 3/4": 2.84 cm², 2.24 kg/m
- 1": 5.10 cm², 3.97 kg/m

Una varilla comercial mide 9 m. La **cuantía** ρ = A_{s}/(b·d) compara acero contra concreto.`,
key:['ρ = [[A_{s}|b·d]]','N = [[A_{s}|A_{varilla}]]','Peso = 0.785·A_{s}·L (kg, cm², m)'],
err:'Redondear el número de varillas hacia abajo. Siempre hacia arriba, y dejando espacio libre.',
x:[['fle','A_{s} calculado se convierte en varillas'],['met','El metrado de fierro usa estos pesos'],['axi','E_{s} = 2×10⁶ kg/cm²']],
g:[
r=>{const nb=r.i(2,8),d=r.p([['1/2"',1.29],['5/8"',2],['3/4"',2.84],['1"',5.1]]);return{q:`¿Qué área dan ${nb} varillas de ${d[0]} (A=${d[1]} cm²)?`,a:nb*d[1],u:'cm²',s:[`A_{s} = ${n(nb*d[1])} cm²`]};},
r=>{const As=r.i(4,30,.5),d=r.p([['5/8"',2],['3/4"',2.84],['1"',5.1]]);return{q:`Necesitas A_{s}=${As} cm². ¿Cuántas varillas de ${d[0]} (A=${d[1]} cm²)? (redondea arriba)`,a:Math.ceil(As/d[1]),u:'varillas',tol:0,s:[`${As}/${d[1]} = ${n(As/d[1])}`,`Se usan ${Math.ceil(As/d[1])} varillas`]};},
r=>{const As=r.i(4,30,1),b=r.i(20,40,5),d=r.i(35,75,5);return{q:`Viga ${b} cm de ancho, d=${d} cm, A_{s}=${As} cm². Halla ρ.`,a:As/(b*d),u:'',tol:.01,s:[`ρ = ${As}/(${b}·${d}) = ${n(As/(b*d))}`]};},
r=>{const nb=r.i(4,20),L=r.i(3,12,.5),d=r.p([['1/2"',.99],['5/8"',1.55],['3/4"',2.24],['1"',3.97]]);return{q:`Metrado: ${nb} varillas de ${d[0]} (${d[1]} kg/m) de ${L} m cada una. Halla el peso.`,a:nb*L*d[1],u:'kg',s:[`Longitud = ${nb*L} m`,`Peso = ${n(nb*L*d[1])} kg`]};},
r=>{const b=r.i(30,50,5),rec=4,de=.95,db=r.p([1.59,1.91,2.54]),nb=r.i(2,5);const s=(b-2*rec-2*de-nb*db)/(nb-1);return{q:`Viga b=${b} cm, recubrimiento ${rec} cm, estribos de ${de} cm, ${nb} varillas de ${db} cm. Halla el espacio libre entre varillas.`,a:s,u:'cm',s:[`Ancho útil = ${n(b-2*rec-2*de)} cm`,`Libre = (útil − ${nb}·${db})/${nb-1} = ${n(s)} cm`,`Debe ser ≥ el mayor de 2.5 cm y d_{b}`]};}
]});

MOD('m08','Topografía','Mecánica',
'Toda obra empieza midiendo el terreno. Sin cotas y coordenadas correctas, el diseño no llega a la realidad.',
['Wolf y Ghilani, Elementary Surveying','McCormac, Topografía','Mendoza Dueñas, Topografía: técnicas modernas (Perú)'],
'UNI: Topografía I y II (TV-113, TV-114), Geodesia Satelital (TV-561).');
SUB('niv',{t:'Nivelación',
lec:`La nivelación mide diferencias de altura. Con un nivel y una mira:

- **Vista atrás (+):** la lectura sobre un punto de cota conocida
- **Vista adelante (−):** la lectura sobre el punto buscado

La altura del instrumento es AI = cota + vista atrás. Y la nueva cota = AI − vista adelante.

Al cerrar el circuito, el error debe ser pequeño. Se compensa repartiéndolo según la distancia.`,
key:['AI = Cota + V_{atrás}','Cota = AI − V_{adelante}','e_{máx} = 12√{K} mm'],
err:'Sumar la vista adelante en vez de restarla.',
x:[['are','Las cotas dan el movimiento de tierras'],['ver','El perfil de la vía viene de la nivelación'],['alc','La pendiente del desagüe sale de las cotas']],
g:[
r=>{const c=r.i(100,3800,.5),va=r.i(.5,3,.01),vd=r.i(.5,3,.01);return{q:`Cota A=${c} m, vista atrás ${va} m, vista adelante ${vd} m. Halla la cota B.`,a:c+va-vd,u:'m',tol:.0005,s:[`AI = ${n(c+va,7)}`,`B = ${n(c+va-vd,7)} m`]};},
r=>{const c=r.i(100,3800,1),va=r.i(.5,3,.01);return{q:`Cota ${c} m y vista atrás ${va} m. Halla la altura del instrumento.`,a:c+va,u:'m',tol:.0005,s:[`AI = ${n(c+va,7)} m`]};},
r=>{const c=r.i(100,3000,1),v=[r.i(1,3,.01),r.i(1,3,.01),r.i(1,3,.01)],d=[r.i(.5,3,.01),r.i(.5,3,.01),r.i(.5,3,.01)];const a=c+v[0]+v[1]+v[2]-d[0]-d[1]-d[2];return{q:`Cota inicial ${c} m. Vistas atrás: ${v.join(', ')}. Vistas adelante: ${d.join(', ')}. Halla la cota final.`,a,u:'m',tol:.0005,s:[`Σatrás = ${n(v[0]+v[1]+v[2],5)}`,`Σadelante = ${n(d[0]+d[1]+d[2],5)}`,`Final = ${n(a,7)} m`]};},
r=>{const K=r.i(.5,9,.5);return{q:`Circuito de ${K} km. Halla el error máximo con e=12√K mm.`,a:12*sq(K),u:'mm',s:[`e = 12√${K} = ${n(12*sq(K))} mm`]};},
r=>{const e=r.i(5,30),L=[r.i(100,500,50),r.i(100,500,50),r.i(100,500,50)];const T=L[0]+L[1]+L[2];const c=e*(L[0]+L[1])/T;return{q:`Un circuito cierra con error de +${e} mm. Tramos de ${L.join(', ')} m. ¿Qué corrección total (en mm) recibe el punto 2, tras los dos primeros tramos?`,a:c,u:'mm',s:[`Corrección proporcional a distancia acumulada`,`c = ${e}·${L[0]+L[1]}/${T} = ${n(c)} mm (restar)`]};}
]});
SUB('pol',{t:'Poligonales y coordenadas',
lec:`Una poligonal es una cadena de puntos medidos con ángulos y distancias. Con el **azimut** (ángulo desde el norte, sentido horario) calculas coordenadas:

- Δx (Este) = d·sen Az
- Δy (Norte) = d·cos Az

**Cuidado:** coseno va con Norte, al revés que en matemática, porque el ángulo se mide desde el norte.

La suma de ángulos interiores debe ser 180°(n−2). El error de cierre se compensa con Bowditch, proporcional a la longitud.`,
key:['ΔE = d·sen Az','ΔN = d·cos Az','Σ∠_{int} = 180°(n−2)','Precisión = [[e|Σd]]'],
err:'Usar coseno para el Este por costumbre.',
x:[['tri','Es trigonometría aplicada'],['are','Con coordenadas se calcula el área'],['hor','El trazo de la vía sigue estos azimuts']],
g:[
r=>{const nn=r.i(3,20);return{q:`Polígono de ${nn} lados. ¿Cuánto suman los ángulos interiores?`,a:180*(nn-2),u:'°',s:[`180(${nn}−2) = ${180*(nn-2)}°`]};},
r=>{const d=r.i(50,500,10),Az=r.i(10,350,5);return{q:`Línea de ${d} m con azimut ${Az}°. Halla ΔE.`,a:d*sind(Az),u:'m',s:[`ΔE = ${d}·sen ${Az}° = ${n(d*sind(Az))} m`]};},
r=>{const e=r.i(100,2000,50),nn=r.i(100,2000,50),d=r.i(50,300,10),Az=r.i(10,350,5);return{q:`Desde (E=${e}, N=${nn}) se avanza ${d} m a Az=${Az}°. Halla la nueva N.`,a:nn+d*cosd(Az),u:'m',s:[`ΔN = ${n(d*cosd(Az))} m`,`N = ${n(nn+d*cosd(Az),6)} m`]};},
r=>{const dE=r.i(-200,200,10)||50,dN=r.i(-200,200,10)||50;let Az=Math.atan2(dE,dN)*180/PI;if(Az<0)Az+=360;return{q:`Dos puntos difieren en ΔE=${dE} m y ΔN=${dN} m. Halla el azimut.`,a:Az,u:'°',s:[`Az = atan2(ΔE, ΔN) = ${n(Az)}°`,`Si sale negativo, suma 360°`]};},
r=>{const eE=r.i(5,30,1)/100,eN=r.i(5,30,1)/100,P=r.i(600,3000,100);const e=sq(eE*eE+eN*eN);return{q:`Poligonal de ${P} m cierra con e_{E}=${eE} m, e_{N}=${eN} m. Halla la precisión como 1/x; escribe x.`,a:P/e,u:'',s:[`Error lineal = ${n(e)} m`,`x = ${P}/${n(e)} = ${n(P/e,5)}`]};}
]});
SUB('are',{t:'Áreas y movimiento de tierras',
lec:`Con coordenadas calculas el área de cualquier lote con la **fórmula de Gauss** o de los zapatos.

Para tierra, se usan **secciones transversales** a lo largo de la vía. El volumen entre dos secciones es su promedio por la distancia.

## Factor de esponjamiento
Un m³ excavado ocupa más al estar suelto. Si no lo consideras, faltarán volquetes en tu presupuesto. En cambio, al compactarlo ocupa menos.`,
key:['A = ½|Σ(x_{i}y_{i+1} − x_{i+1}y_{i})|','V = L·[[A_{1}+A_{2}|2]]','V_{suelto} = V_{banco}(1 + e)'],
err:'Usar volumen en banco para calcular volquetes.',
x:[['met','Los volúmenes entran al metrado'],['num','Trapecio y Simpson son lo mismo'],['cpt','La compactación cambia el volumen']],
g:[
r=>{const A1=r.i(5,60),A2=r.i(5,60),L=r.i(10,40,5);return{q:`Secciones de ${A1} y ${A2} m² separadas ${L} m. Halla el volumen.`,a:L*(A1+A2)/2,u:'m³',s:[`V = ${L}·(${A1}+${A2})/2 = ${n(L*(A1+A2)/2)} m³`]};},
r=>{const V=r.i(100,5000,50),e=r.p([.15,.2,.25,.3,.4]);return{q:`Se excavan ${V} m³ en banco con esponjamiento ${e*100} %. ¿Qué volumen suelto?`,a:V*(1+e),u:'m³',s:[`V_{s} = ${n(V*(1+e))} m³`]};},
r=>{const a=r.i(10,60,5),b=r.i(10,60,5),c=r.i(5,50,5);const A=.5*Math.abs(0*0-a*0+a*b-c*0+c*0-0*b);return{q:`Lote triangular con vértices (0,0), (${a},0) y (${c},${b}) m. Halla el área.`,a:a*b/2,u:'m²',s:[`Gauss: ½|x₁y₂−x₂y₁ + x₂y₃−x₃y₂ + x₃y₁−x₁y₃|`,`= ½·${a}·${b} = ${n(a*b/2)} m²`]};},
r=>{const a=r.i(20,60,5),b=r.i(20,50,5),c=r.i(5,15,5),d=r.i(25,50,5);const P=[[0,0],[a,0],[a+c,b],[0,d]];let s=0;for(let i=0;i<4;i++){const j=(i+1)%4;s+=P[i][0]*P[j][1]-P[j][0]*P[i][1];}return{q:`Lote con vértices (0,0), (${a},0), (${a+c},${b}), (0,${d}) m. Halla el área.`,a:Math.abs(s)/2,u:'m²',s:[`Suma de productos cruzados = ${s}`,`A = ${n(Math.abs(s)/2)} m²`]};},
r=>{const V=r.i(500,6000,100),e=r.p([.2,.25,.3]),q=r.p([10,15,20]),c=r.p([180,220,260]);const viajes=Math.ceil(V*(1+e)/q);return{q:`Se excavan ${V} m³ con esponjamiento ${e*100} %, volquetes de ${q} m³ y S/${c} por viaje. Halla el costo total (viajes completos).`,a:viajes*c,u:'S/',s:[`Suelto = ${n(V*(1+e))} m³`,`Viajes = ${viajes}`,`Costo = S/ ${viajes*c}`]};}
]});
