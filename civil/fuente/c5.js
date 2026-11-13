/* Estructuras avanzadas: concreto II, preesforzado, puentes, dinámica, matricial, madera, patología */
const FY=4200,b1=fc=>fc<=280?.85:Math.max(.65,.85-.05*(fc-280)/70);
MOD('m22','Concreto armado II','Estructuras',
'Aquí pasas de diseñar una viga aislada a diseñar todo un edificio de concreto: vigas T, columnas con momento, losas en dos sentidos, placas y escaleras.',
['Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado','Harmsen, Diseño de estructuras de concreto armado','Morales Morales, Diseño en concreto armado','Ortega García, Diseño de estructuras de concreto armado (tomos I y II)','Nilson, Diseño de estructuras de concreto','Jiménez Montoya, Hormigón armado','Fernández Chea, Análisis y diseño de escaleras','ACI 318 y Norma E.060'],
'UNI: Concreto Armado II (ES-821). PUCP: Concreto Armado 2. Es el curso que más se usa en oficinas de diseño del Perú.');
SUB('dre',{t:'Vigas T y doble refuerzo',
lec:`Cuando vacías la losa junto con la viga, una franja de losa trabaja con ella: la sección es una **T**. Si el bloque de compresión a cabe en el ala (a ≤ h_{f}), la viga se calcula como rectangular con el ancho del ala. Si no cabe, se separa la parte que comprime el ala y la que comprime el alma.

## Ancho efectivo del ala (viga interior)
El menor de: L/4, b_{w} + 16h_{f} y la distancia entre ejes de vigas.

## Doble refuerzo
Si la sección es pequeña y no puedes peraltarla, agregas acero en compresión A′_{s}. Ese acero también reduce las flechas por flujo plástico y da ductilidad en zonas sísmicas.

**Ojo:** el acero en compresión solo aporta f_{y} si fluye. Revísalo con la deformación ε′_{s} = 0.003(c − d′)/c ≥ 0.0021.`,
key:['b ≤ L/4, b_{w}+16h_{f}, s','a ≤ h_{f}: rectangular de ancho b','A_{sf} = [[0.85f\'_{c}(b−b_{w})h_{f}|f_{y}]]','M_{n} = (A_{s}−A′_{s})f_{y}(d−a/2) + A′_{s}f_{y}(d−d′)'],
err:'Usar el ancho del ala en momento negativo. Ahí la compresión está abajo, en el alma.',
x:[['fle','Es la misma flexión con otra geometría'],['cen','La sección T ya apareció en inercia'],['los','La losa aligerada es una sucesión de viguetas T']],
g:[
r=>{const L=r.i(4,10,.5),bw=r.p([25,30,35]),hf=r.p([5,10,15,20]),s=r.i(3,6,.5);const b=Math.min(L*100/4,bw+16*hf,s*100);return{q:`Viga T interior: luz ${L} m, alma b_{w}=${bw} cm, losa h_{f}=${hf} cm, vigas cada ${s} m. Halla el ancho efectivo del ala.`,a:b,u:'cm',s:[`L/4 = ${n(L*25)} cm`,`b_{w}+16h_{f} = ${bw+16*hf} cm`,`Separación = ${s*100} cm`,`b = el menor = ${n(b)} cm`]};},
r=>{const As=r.i(6,30,1),b=r.i(80,200,10),fc=r.p([210,280,350]);const a=As*FY/(.85*fc*b);return{q:`Viga T con b=${b} cm de ala, A_{s}=${As} cm², f'_{c}=${fc}, f_{y}=4200. Halla a suponiendo que cae en el ala.`,a,u:'cm',s:[`a = A_{s}f_{y}/(0.85f'_{c}b) = ${n(a)} cm`,`Si a ≤ h_{f}, la suposición es correcta`]};},
r=>{const As=r.i(8,30,1),b=r.i(100,200,10),bw=r.p([25,30]),hf=r.p([17,20]),d=r.i(45,75,5),fc=r.p([210,280]);const a=As*FY/(.85*fc*b);const M=.9*As*FY*(d-a/2)/1e5;return{q:`Viga T: b=${b}, b_{w}=${bw}, h_{f}=${hf}, d=${d} cm, A_{s}=${As} cm², f'_{c}=${fc}. Halla φM_{n}.`,a:M,u:'t·m',s:[`a = ${n(a)} cm ≤ h_{f} = ${hf}: trabaja como rectangular de ancho ${b}`,`φM_{n} = 0.9·A_{s}f_{y}(d−a/2) = ${n(M)} t·m`]};},
r=>{let b,d,As,Asp,fc,a,c,ok=false,dp=r.p([5,6]);for(let k=0;k<30&&!ok;k++){b=r.i(25,35,5);d=r.i(50,70,5);fc=r.p([210,280]);As=r.i(25,45,1);Asp=r.i(5,12,1);a=(As-Asp)*FY/(.85*fc*b);c=a/b1(fc);ok=.003*(c-dp)/c>=.0021&&c<.6*d;}const M=.9*((As-Asp)*FY*(d-a/2)+Asp*FY*(d-dp))/1e5;return{q:`Viga ${b}×${d+dp} cm (d=${d}, d′=${dp} cm), A_{s}=${As} cm², A′_{s}=${Asp} cm², f'_{c}=${fc}. Si A′_{s} fluye, halla φM_{n}.`,a:M,u:'t·m',s:[`a = (A_{s}−A′_{s})f_{y}/(0.85f'_{c}b) = ${n(a)} cm, c = a/β₁ = ${n(c)} cm`,`ε′_{s} = 0.003(c−d′)/c = ${n(.003*(c-dp)/c)} ≥ 0.0021: fluye`,`φM_{n} = 0.9[(A_{s}−A′_{s})f_{y}(d−a/2) + A′_{s}f_{y}(d−d′)] = ${n(M)} t·m`]};},
r=>{const bw=r.p([25,30]),b=r.i(60,90,10),hf=r.p([5,8,10]),d=r.i(50,70,5),fc=r.p([210,280]),As=r.i(28,45,1);const a0=As*FY/(.85*fc*b);const Asf=.85*fc*(b-bw)*hf/FY,a=(As-Asf)*FY/(.85*fc*bw);const M=a0<=hf?.9*As*FY*(d-a0/2)/1e5:.9*(Asf*FY*(d-hf/2)+(As-Asf)*FY*(d-a/2))/1e5;return{q:`Viga T: b=${b}, b_{w}=${bw}, h_{f}=${hf}, d=${d} cm, A_{s}=${As} cm², f'_{c}=${fc}. Halla φM_{n}.`,a:M,u:'t·m',s:[`Prueba: a = ${n(a0)} cm ${a0<=hf?'≤':'>'} h_{f}`,...(a0<=hf?[`Trabaja como rectangular`]:[`A_{sf} = 0.85f'_{c}(b−b_{w})h_{f}/f_{y} = ${n(Asf)} cm²`,`a = (A_{s}−A_{sf})f_{y}/(0.85f'_{c}b_{w}) = ${n(a)} cm`]),`φM_{n} = ${n(M)} t·m`]};}
]});
SUB('anc',{t:'Anclaje y empalmes',
lec:`Una varilla solo trabaja si está bien agarrada al concreto. La **longitud de desarrollo** l_{d} es lo que debe prolongarse más allá del punto donde necesita toda su fuerza. Si no hay espacio, se usa un **gancho** estándar.

## Fórmulas simplificadas (ACI 318-08, base de la E.060), en MPa y mm
- Varillas de 19 mm o menos: l_{d} = f_{y}ψ_{t}ψ_{e}d_{b}/(2.1λ√f′_{c})
- Varillas de 22 mm o más: l_{d} = f_{y}ψ_{t}ψ_{e}d_{b}/(1.7λ√f′_{c})
- ψ_{t} = 1.3 para barras superiores con más de 300 mm de concreto fresco debajo
- Gancho: l_{dh} = 0.24ψ_{e}f_{y}d_{b}/(λ√f′_{c}), no menos de 8d_{b} ni 150 mm
- Empalme por traslape clase B: 1.3l_{d}

Valen con espaciamiento y recubrimiento al menos d_{b} y estribos mínimos. En obra, la mayoría de fallas de nudos vienen de anclajes cortos.`,
key:['l_{d} = [[f_{y}ψ_{t}ψ_{e}|2.1λ√{f\'_{c}}]]d_{b}','l_{dh} = [[0.24ψ_{e}f_{y}|λ√{f\'_{c}}]]d_{b}','Traslape B = 1.3l_{d}','l_{d} ≥ 300 mm'],
err:'Empalmar todas las varillas en la misma sección y en la zona de máximo momento.',
x:[['ref','Diámetros y áreas de varillas'],['col','Los empalmes de columnas van en el tercio central'],['fle','El acero calculado solo vale si está anclado']],
g:[
r=>{const db=r.p([10,12,16,19]),fc=r.p([21,28,35]);const ld=Math.max(420*db/(2.1*sq(fc)),300);return{q:`Varilla de ${db} mm, f_{y}=420 MPa, f′_{c}=${fc} MPa, barra inferior sin recubrimiento epóxico. Halla l_{d}.`,a:ld,u:'mm',s:[`l_{d} = 420·${db}/(2.1·√${fc}) = ${n(420*db/(2.1*sq(fc)))} mm`,`Mínimo 300 mm: l_{d} = ${n(ld)} mm`]};},
r=>{const db=r.p([22,25,32]),fc=r.p([21,28,35]),top=r.p([1,1.3]);const ld=Math.max(420*top*db/(1.7*sq(fc)),300);return{q:`Varilla de ${db} mm, f_{y}=420, f′_{c}=${fc} MPa, ψ_{t}=${top}. Halla l_{d}.`,a:ld,u:'mm',s:[`Para 22 mm o más se usa 1.7`,`l_{d} = 420·${top}·${db}/(1.7√${fc}) = ${n(ld)} mm`]};},
r=>{const db=r.p([12,16,19,22,25]),fc=r.p([21,28,35]);const l=Math.max(.24*420*db/sq(fc),8*db,150);return{q:`Gancho estándar de una varilla de ${db} mm, f_{y}=420, f′_{c}=${fc} MPa. Halla l_{dh}.`,a:l,u:'mm',s:[`0.24·420·${db}/√${fc} = ${n(.24*420*db/sq(fc))} mm`,`Mínimos: 8d_{b}=${8*db}, 150 mm`,`l_{dh} = ${n(l)} mm`]};},
r=>{const db=r.p([12,16,19]),fc=r.p([21,28]),top=r.p([1,1.3]);const ld=Math.max(420*top*db/(2.1*sq(fc)),300);return{q:`Empalme clase B de varillas de ${db} mm, f′_{c}=${fc} MPa, ψ_{t}=${top}. Halla la longitud de traslape.`,a:Math.max(1.3*ld,300),u:'mm',s:[`l_{d} = ${n(ld)} mm`,`Traslape = 1.3l_{d} = ${n(1.3*ld)} mm`]};},
r=>{const db=r.p([16,19,22,25]),fc=r.p([21,28,35]),c=r.i(400,700,50);const ld=db<=19?420*db/(2.1*sq(fc)):420*db/(1.7*sq(fc));const L=Math.max(ld,300);const ldh=Math.max(.24*420*db/sq(fc),8*db,150);return{q:`Una varilla inferior de ${db} mm debe anclarse en una columna de ${c} mm de ancho (recubrimiento 40 mm), f′_{c}=${fc}. ¿Cuánto mide l_{dh} con gancho? (compara con lo disponible: ${c-40} mm)`,a:ldh,u:'mm',s:[`Recta necesitaría l_{d} = ${n(L)} mm; disponible ${c-40} mm`,`Con gancho: l_{dh} = ${n(ldh)} mm ${ldh<=c-40?'≤':'>'} ${c-40} mm`]};}
]});
SUB('fcp',{t:'Flexocompresión y diagrama de interacción',
lec:`Una columna real recibe carga axial y momento a la vez. Su capacidad no es un número, es una **curva**: el diagrama de interacción, que reúne todas las combinaciones (P, M) que la sección resiste.

## Puntos clave de la curva
- **Compresión pura:** P_{0} = 0.85f′_{c}(A_{g} − A_{st}) + f_{y}A_{st}
- **Falla balanceada:** el concreto llega a 0.003 justo cuando el acero en tensión fluye. c_{b} = 6000d/(6000 + f_{y})
- **Flexión pura:** casi como una viga

Por encima del punto balanceado manda el concreto (falla frágil). Por debajo, el acero (falla dúctil). Por eso E.060 usa φ = 0.70 arriba y lo sube hasta 0.90 en flexión.

**Método:** elige c, calcula deformaciones por triángulos semejantes, luego fuerzas, y suma fuerzas y momentos respecto al centro de la sección.`,
key:['c_{b} = [[6000·d|6000+f_{y}]]','f′_{s} = 6000[[c−d′|c]] ≤ f_{y}','P_{n} = 0.85f\'_{c}ab + A′_{s}f′_{s} − A_{s}f_{s}','M_{n} = C_{c}(h/2 − a/2) + A′_{s}f′_{s}(h/2−d′) + A_{s}f_{s}(d−h/2)','e = [[M_{u}|P_{u}]]'],
err:'Calcular el momento respecto a la fibra extrema en vez del centro plástico.',
x:[['col','Extiende el diseño a compresión pura'],['moh','Superposición de esfuerzos axiales y de flexión'],['pla','Las placas se diseñan con el mismo diagrama']],
g:[
r=>{const P=r.i(50,400,10),M=r.i(2,40,1);return{q:`Una columna recibe P_{u}=${P} t y M_{u}=${M} t·m. Halla la excentricidad.`,a:M/P*100,u:'cm',s:[`e = M/P = ${n(M/P*100)} cm`]};},
r=>{const d=r.i(24,64,2);return{q:`Columna con d=${d} cm y f_{y}=4200. Halla c_{b}.`,a:6000*d/(6000+FY),u:'cm',s:[`c_{b} = 6000·${d}/10200 = ${n(6000*d/(6000+FY))} cm`]};},
r=>{const b=r.i(30,60,5),h=r.i(30,70,5),fc=r.p([210,280]),As=r.p([7.74,10.2,15.3,20.4]),dp=6;const d=h-dp,cb=6000*d/(6000+FY),a=b1(fc)*cb,fs=Math.min(FY,6000*(cb-dp)/cb);const P=(.85*fc*a*b+As*fs-As*FY)/1000;return{q:`Columna ${b}×${h} cm, f'_{c}=${fc}, A_{s} = A′_{s} = ${As} cm² en cada cara, d′=6 cm. Halla P_{b}.`,a:P,u:'t',s:[`d = ${d}, c_{b} = ${n(cb)} cm, a = β₁c = ${n(a)} cm`,`f′_{s} = ${n(fs)} kg/cm²`,`P_{b} = 0.85f'_{c}ab + A′_{s}f′_{s} − A_{s}f_{y} = ${n(P)} t`]};},
r=>{const b=r.i(30,60,5),h=r.i(30,70,5),fc=r.p([210,280]),As=r.p([7.74,10.2,15.3,20.4]),dp=6;const d=h-dp,cb=6000*d/(6000+FY),a=b1(fc)*cb,fs=Math.min(FY,6000*(cb-dp)/cb);const M=(.85*fc*a*b*(h/2-a/2)+As*fs*(h/2-dp)+As*FY*(d-h/2))/1e5;return{q:`Columna ${b}×${h} cm, f'_{c}=${fc}, A_{s}=A′_{s}=${As} cm² por cara, d′=6 cm. Halla M_{b}.`,a:M,u:'t·m',s:[`c_{b} = ${n(cb)}, a = ${n(a)} cm, f′_{s} = ${n(fs)}`,`M_{b} = C_{c}(h/2−a/2) + A′_{s}f′_{s}(h/2−d′) + A_{s}f_{y}(d−h/2)`,`= ${n(M)} t·m`]};},
r=>{const b=r.i(30,50,5),h=r.i(40,70,5),fc=r.p([210,280]),As=r.p([10.2,15.3,20.4]),dp=6;const d=h-dp,c=r.i(Math.ceil(.75*d),Math.floor(.95*d),1),a=b1(fc)*c,fsp=Math.min(FY,6000*(c-dp)/c),fs=Math.min(FY,6000*(d-c)/c);const P=(.85*fc*a*b+As*fsp-As*fs)/1000;return{q:`Columna ${b}×${h} cm, f'_{c}=${fc}, A_{s}=A′_{s}=${As} cm², d′=6 cm. Para c=${c} cm (zona de compresión), halla P_{n}.`,a:P,u:'t',s:[`a = ${n(a)} cm`,`f′_{s} = ${n(fsp)}; f_{s} = 6000(d−c)/c = ${n(fs)} kg/cm² (no fluye)`,`P_{n} = ${n(P)} t`]};}
]});
SUB('l2d',{t:'Losas en dos direcciones',
lec:`Cuando un paño es casi cuadrado, la losa se apoya en los cuatro bordes y la carga viaja en **dos direcciones**. Se aprovecha mejor el concreto y se logran losas más delgadas.

## ¿Una o dos direcciones?
Calcula m = lado corto / lado largo. Si m < 0.5, trabaja casi en una dirección. Si m ≥ 0.5, en dos.

## Predimensionamiento (regla práctica)
Losa maciza: h ≈ perímetro / 180. Aligerado en dos direcciones o losa nervada: algo más.

## Método de coeficientes (E.060)
El momento por metro es M = C·w_{u}·l_{a}², donde l_{a} es el lado corto y C sale de tablas según la relación m y la continuidad de los bordes. Cada franja de 1 m se diseña como una viga de b = 100 cm.

**Losas reticulares mixtas** (Bozzo): nervios en dos sentidos con bloques aligerantes. Son la versión ligera de esta idea.`,
key:['m = [[l_{a}|l_{b}]]','h ≈ [[perímetro|180]]','M = C·w_{u}·l_{a}^{2}','A_{s,mín} = 0.0018·b·h'],
err:'Tomar el lado largo como l_{a}. Los coeficientes de tabla se aplican sobre el lado corto.',
x:[['los','El aligerado trabaja en una dirección'],['fle','Cada franja es una viga'],['car','w_{u} sale del metrado']],
g:[
r=>{const a=r.i(3,7,.25),b=r.i(3,7,.25);return{q:`Paño de ${a}×${b} m. Predimensiona h = perímetro/180.`,a:2*(a+b)*100/180,u:'cm',s:[`Perímetro = ${n(2*(a+b))} m`,`h = ${n(2*(a+b)*100/180)} cm (redondea a 15, 17 o 20)`]};},
r=>{const a=r.i(2.5,8,.25),b=r.i(2.5,8,.25);const m=Math.min(a,b)/Math.max(a,b);return{q:`Paño de ${a}×${b} m. Halla m = lado corto / lado largo.`,a:m,u:'',s:[`m = ${Math.min(a,b)}/${Math.max(a,b)} = ${n(m)}`,m<.5?'Trabaja en una dirección':'Trabaja en dos direcciones']};},
r=>{const h=r.p([.15,.17,.2,.25]),pt=.1,cv=r.p([.2,.25,.3,.4,.5]);const w=1.4*(2.4*h+pt)+1.7*cv;return{q:`Losa maciza de ${h*100} cm, piso terminado 100 kg/m², CV=${cv*1000} kg/m². Halla w_{u}.`,a:w*1000,u:'kg/m²',s:[`CM = 2400·${h} + 100 = ${n(2400*h+100)} kg/m²`,`w_{u} = 1.4CM + 1.7CV = ${n(w*1000)} kg/m²`]};},
r=>{const C=r.p([.033,.036,.041,.045,.05,.061,.071]),w=r.i(700,1600,50),la=r.i(3,6,.25);return{q:`Con C=${C}, w_{u}=${w} kg/m² y l_{a}=${la} m, halla el momento por metro.`,a:C*w*la*la,u:'kg·m/m',s:[`M = C·w_{u}·l_{a}² = ${n(C*w*la*la)} kg·m/m`]};},
r=>{const C=r.p([.036,.041,.045,.05,.061]),w=r.i(800,1400,50),la=r.i(3.5,6,.25),h=r.p([15,17,20]),fc=r.p([210,280]);const M=C*w*la*la*100,d=h-3,k=.85*fc*100;const As0=k/FY*(d-sq(d*d-2*M/(.9*k)));const As=Math.max(As0,.0018*100*h);return{q:`Losa de h=${h} cm (d=${d}), f'_{c}=${fc}. Con C=${C}, w_{u}=${w} kg/m², l_{a}=${la} m, halla A_{s} por metro (con mínimo 0.0018bh).`,a:As,u:'cm²/m',s:[`M_{u} = ${n(M/100)} kg·m/m`,`A_{s} de cálculo = ${n(As0)} cm²/m`,`Mínimo = ${n(.0018*100*h)} cm²/m`,`A_{s} = ${n(As)} cm²/m`]};}
]});
SUB('pla',{t:'Placas (muros de corte)',
lec:`En el Perú casi todos los edificios de concreto tienen **placas**: muros que toman la mayor parte del sismo y controlan la deriva. Son la razón de que los edificios peruanos bien diseñados resistan sismos fuertes.

## Cortante (E.060)
- V_{c} = A_{cw}·α_{c}·√f′_{c}, con A_{cw} = t·l_{m}
- α_{c} = 0.80 si h_{m}/l_{m} ≤ 1.5; 0.53 si ≥ 2.0; interpola entre ambos
- V_{s} = A_{cw}·ρ_{h}·f_{y}
- V_{n} ≤ 2.6√f′_{c}·A_{cw}, y φ = 0.85

Cuantías mínimas: ρ_{h} y ρ_{v} ≥ 0.0025 cuando el cortante es alto.

**Imagen:** una placa es como una viga en voladizo enorme y parada. En los extremos se concentra el acero vertical, confinado en **núcleos**.`,
key:['V_{c} = A_{cw}α_{c}√{f\'_{c}}','V_{s} = A_{cw}ρ_{h}f_{y}','V_{n} ≤ 2.6√{f\'_{c}}A_{cw}','ρ_{h} ≥ 0.0025'],
err:'Concentrar placas en un solo lado de la planta: se genera torsión.',
x:[['esp','Toman el cortante sísmico'],['dri','Controlan la deriva'],['cte','Cortante en muros en lugar de vigas'],['pmat','Su rigidez define el centro de rigidez']],
g:[
r=>{const h=r.i(3,30,1),l=r.i(2,10,.5);const R=h/l,a=R<=1.5?.8:R>=2?.53:.8-(R-1.5)/(.5)*.27;return{q:`Placa de h_{m}=${h} m y l_{m}=${l} m. Halla α_{c}.`,a,u:'',s:[`h_{m}/l_{m} = ${n(R)}`,R<=1.5?`≤ 1.5: α_{c} = 0.80`:R>=2?`≥ 2.0: α_{c} = 0.53`:`Interpola: α_{c} = ${n(a)}`]};},
r=>{const t=r.p([15,20,25,30]),l=r.i(2,8,.5),fc=r.p([210,280]),a=r.p([.53,.8]);const V=t*l*100*a*sq(fc)/1000;return{q:`Placa t=${t} cm, l_{m}=${l} m, f'_{c}=${fc}, α_{c}=${a}. Halla V_{c}.`,a:V,u:'t',s:[`A_{cw} = ${n(t*l*100)} cm²`,`V_{c} = ${n(V)} t`]};},
r=>{const t=r.p([15,20,25]),l=r.i(2,8,.5),rh=r.p([.0025,.003,.004,.005]);return{q:`Placa t=${t} cm, l_{m}=${l} m, ρ_{h}=${rh}. Halla V_{s}.`,a:t*l*100*rh*FY/1000,u:'t',s:[`V_{s} = A_{cw}ρ_{h}f_{y} = ${n(t*l*100*rh*FY/1000)} t`]};},
r=>{const t=r.p([20,25,30]),l=r.i(3,8,.5),fc=r.p([210,280]),a=r.p([.53,.65,.8]),rh=r.p([.0025,.004,.006,.01]);const A=t*l*100,Vn=Math.min(A*(a*sq(fc)+rh*FY),2.6*sq(fc)*A);return{q:`Placa t=${t} cm, l_{m}=${l} m, f'_{c}=${fc}, α_{c}=${a}, ρ_{h}=${rh}. Halla φV_{n}.`,a:.85*Vn/1000,u:'t',s:[`V_{c}+V_{s} = ${n(A*(a*sq(fc)+rh*FY)/1000)} t`,`Límite 2.6√f'_{c}A_{cw} = ${n(2.6*sq(fc)*A/1000)} t`,`φV_{n} = 0.85·${n(Vn/1000)} = ${n(.85*Vn/1000)} t`]};},
r=>{const t=r.p([20,25,30]),l=r.i(3,8,.5),fc=r.p([210,280]),a=r.p([.53,.8]);const A=t*l*100,Vc=A*a*sq(fc);const Vu=Math.round(.85*Vc*r.i(1.8,3,.1)/1000);const rh=Math.max((Vu*1000/.85-Vc)/(A*FY),.0025);return{q:`Placa t=${t} cm, l_{m}=${l} m, f'_{c}=${fc}, α_{c}=${a}, V_{u}=${Vu} t. Halla ρ_{h} requerido (mín. 0.0025).`,a:rh,u:'',tol:.02,s:[`V_{c} = ${n(Vc/1000)} t`,`V_{s} = V_{u}/0.85 − V_{c} = ${n(Vu/.85-Vc/1000)} t`,`ρ_{h} = V_{s}/(A_{cw}f_{y}) → ${n(rh)}`]};}
]});
SUB('esc',{t:'Escaleras',
lec:`Una escalera mal dimensionada cansa o provoca caídas. La regla clásica (Blondel) liga paso p y contrapaso cp: **2cp + p ≈ 60 a 64 cm**, lo que da la longitud de un paso humano.

## Estructura
La escalera más común es una **losa inclinada** apoyada en vigas o placas. Su peso se expresa por m² de proyección horizontal:

w_{pp} = γ[cp/2 + t/cos θ]

donde t es el espesor de la garganta y cos θ = p/√(p² + cp²).

Luego se diseña como una losa simplemente apoyada (o con continuidad) con la luz horizontal.`,
key:['2cp + p ≈ 60–64 cm','cos θ = [[p|√{p^{2}+cp^{2}}]]','w_{pp} = 2.4[[[cp|2]] + [[t|cos θ]]] t/m^{2}','M = [[w_{u}L^{2}|8]]'],
err:'Calcular el peso con la longitud inclinada y además con t/cos θ: se cuenta dos veces la inclinación.',
x:[['los','Es una losa inclinada'],['car','Sigue el mismo metrado'],['fle','Se diseña por flexión']],
g:[
r=>{const cp=r.i(15,19,.5),k=r.p([60,61,62,63,64]);return{q:`Con contrapaso ${cp} cm y la regla 2cp + p = ${k} cm, halla el paso.`,a:k-2*cp,u:'cm',s:[`p = ${k} − 2·${cp} = ${n(k-2*cp)} cm`]};},
r=>{const H=r.i(2.4,3.6,.05);const nn=Math.round(H/.175);return{q:`Una altura de piso de ${H} m se sube con ${nn} contrapasos. ¿Cuánto mide cada uno?`,a:H/nn*100,u:'cm',s:[`cp = ${H*100}/${nn} = ${n(H/nn*100)} cm`]};},
r=>{const cp=r.i(16,18,.5),p=r.i(25,30,1),t=r.p([12,15,17,20]);const c=p/sq(p*p+cp*cp),w=2.4*(cp/200+t/100/c);return{q:`Escalera con p=${p}, cp=${cp}, garganta t=${t} cm. Halla el peso propio por m² en planta.`,a:w*1000,u:'kg/m²',s:[`cos θ = ${n(c)}`,`w = 2400[${cp/200} + ${t/100}/${n(c)}] = ${n(w*1000)} kg/m²`]};},
r=>{const cp=r.i(16,18,.5),p=r.i(25,30,1),t=r.p([12,15,17]),cv=r.p([.2,.3,.4,.5]);const c=p/sq(p*p+cp*cp),w=2.4*(cp/200+t/100/c),wu=1.4*(w+.1)+1.7*cv;return{q:`Escalera p=${p}, cp=${cp}, t=${t} cm, acabados 100 kg/m², CV=${cv*1000} kg/m². Halla w_{u}.`,a:wu*1000,u:'kg/m²',s:[`w_{pp} = ${n(w*1000)} kg/m²`,`w_{u} = 1.4(${n(w*1000)}+100) + 1.7·${cv*1000} = ${n(wu*1000)} kg/m²`]};},
r=>{const cp=r.i(16,18,.5),p=r.i(25,30,1),t=r.p([15,17,20]),cv=r.p([.2,.3,.4]),L=r.i(2.5,4.5,.25),fc=210;const c=p/sq(p*p+cp*cp),wu=1.4*(2.4*(cp/200+t/100/c)+.1)+1.7*cv;const M=wu*L*L/8*1e5,d=t-3,k=.85*fc*100;const As=k/FY*(d-sq(d*d-2*M/(.9*k)));return{q:`Tramo simplemente apoyado de ${L} m en planta: p=${p}, cp=${cp}, t=${t} cm, acabados 100 kg/m², CV=${cv*1000}, f'_{c}=210. Halla A_{s} por metro.`,a:As,u:'cm²/m',s:[`w_{u} = ${n(wu*1000)} kg/m²`,`M_{u} = w_{u}L²/8 = ${n(M/1e5)} t·m/m`,`d = ${d} cm → A_{s} = ${n(As)} cm²/m`]};}
]});

MOD('m23','Concreto preesforzado','Estructuras',
'Si comprimes el concreto antes de cargarlo, nunca llega a fisurarse. Así se logran vigas de puentes de 40 m, losas postensadas delgadas y viguetas prefabricadas.',
['Nilson, Diseño de estructuras de concreto presforzado','Arroyo, Hormigón pretensado','Pérez Alamá, Diseño y cálculo de estructuras de concreto preesforzado','Post-Tensioning Institute, Post-Tensioning Manual','Lin y Burns, Design of Prestressed Concrete Structures'],
'UNI: Concreto Preesforzado (electivo). PUCP: Concreto Preesforzado (electivo de estructuras).');
SUB('pe1',{t:'Esfuerzos en la sección',
lec:`Imagina una fila de libros: si la aprietas desde los extremos, puedes levantarla entera sin que se caiga ninguno. Eso hace el preesfuerzo con el concreto.

Una fuerza P aplicada con excentricidad e bajo el centroide produce en la fibra inferior:

f = P/A + P·e/S − M/S (compresión positiva)

- En la **transferencia** actúa solo el peso propio: el riesgo es que la cara superior se tense.
- En **servicio** actúan todas las cargas: el riesgo es que la cara inferior se tense.

**Pretensado:** se tensan los cables antes de vaciar. **Postensado:** se vacía con ductos y luego se tensa.`,
key:['f_{inf} = [[P|A]] + [[P·e|S_{b}]] − [[M|S_{b}]]','f_{sup} = [[P|A]] − [[P·e|S_{t}]] + [[M|S_{t}]]','P_{mín} = [[M/S_{b}|1/A + e/S_{b}]]'],
err:'Mezclar signos de compresión y tensión entre fibras. Define un convenio y mantenlo.',
x:[['flx','Es superposición de axial y flexión'],['axi','σ = P/A'],['pe2','Esta P se reduce por pérdidas']],
g:[
r=>{const P=r.i(50,400,10),A=r.i(1000,5000,100);return{q:`P=${P} t sobre una sección de A=${A} cm². Halla el esfuerzo uniforme.`,a:P*1000/A,u:'kg/cm²',s:[`f = P/A = ${n(P*1000/A)} kg/cm²`]};},
r=>{const P=r.i(80,300,10),A=r.i(1500,4000,100),e=r.i(10,40,1),S=r.i(30000,120000,5000);return{q:`P=${P} t, A=${A} cm², e=${e} cm, S_{b}=${S} cm³. Halla f en la fibra inferior en transferencia sin peso propio.`,a:P*1000/A+P*1000*e/S,u:'kg/cm²',s:[`P/A = ${n(P*1000/A)}`,`Pe/S_{b} = ${n(P*1000*e/S)}`,`f = ${n(P*1000/A+P*1000*e/S)} kg/cm² (compresión)`]};},
r=>{const P=r.i(80,300,10),A=r.i(1500,4000,100),e=r.i(10,40,1),S=r.i(30000,120000,5000),M=r.i(5,40,1);const f=P*1000/A+P*1000*e/S-M*1e5/S;return{q:`P=${P} t, A=${A}, e=${e} cm, S_{b}=${S} cm³ y momento por peso propio M=${M} t·m. Halla f inferior en transferencia.`,a:f,u:'kg/cm²',s:[`P/A + Pe/S_{b} = ${n(P*1000/A+P*1000*e/S)}`,`M/S_{b} = ${n(M*1e5/S)}`,`f = ${n(f)} kg/cm²`]};},
r=>{const P=r.i(80,300,10),A=r.i(1500,4000,100),e=r.i(10,40,1),S=r.i(30000,120000,5000),M=r.i(10,80,1);const f=P*1000/A-P*1000*e/S+M*1e5/S;return{q:`Servicio: P=${P} t, A=${A}, e=${e} cm, S_{t}=${S} cm³, M=${M} t·m. Halla f en la fibra superior.`,a:f,u:'kg/cm²',s:[`f = P/A − Pe/S_{t} + M/S_{t} (negativo = tensión)`,`= ${n(P*1000/A)} − ${n(P*1000*e/S)} + ${n(M*1e5/S)} = ${n(f)} kg/cm²`]};},
r=>{const A=r.i(1500,4500,100),e=r.i(15,45,1),S=r.i(40000,150000,5000),M=r.i(20,120,5);const P=M*1e5/S/(1/A+e/S)/1000;return{q:`Viga con A=${A} cm², e=${e} cm, S_{b}=${S} cm³ y M=${M} t·m en servicio. ¿Qué P efectiva deja la fibra inferior en cero?`,a:P,u:'t',s:[`P/A + Pe/S_{b} = M/S_{b}`,`P = (M/S_{b})/(1/A + e/S_{b}) = ${n(P)} t`]};}
]});
SUB('pe2',{t:'Pérdidas de preesfuerzo',
lec:`La fuerza que aplicas con el gato no es la que queda. Se pierde en el camino:

## Inmediatas
- **Fricción** en ductos: P(x) = P_{0}·e^{−(μα + Kx)}
- **Deslizamiento de anclajes:** las cuñas se acomodan unos milímetros
- **Acortamiento elástico:** el concreto se comprime y el cable se relaja: Δf = n·f_{cgp}

## Diferidas
- Contracción, flujo plástico del concreto y relajación del acero

En total se pierde típicamente entre 15 % y 25 %. Por eso se diseña con P_{e} y no con la fuerza del gato.`,
key:['P(x) = P_{0}e^{−(μα+Kx)}','Δf_{ES} = n·f_{cgp}','Δf_{anc} = [[Δ·E_{p}|L]]','P_{e} = P_{i}(1 − pérdidas)'],
err:'Olvidar convertir α a radianes en la fórmula de fricción.',
x:[['pe1','Reduce P en las fórmulas de esfuerzos'],['axi','El acortamiento es Hooke'],['edo','La fricción es un decaimiento exponencial']],
g:[
r=>{const nn=r.i(5,7,.5),f=r.i(40,150,5);return{q:`n=${nn} y f_{cgp}=${f} kg/cm². Halla la pérdida por acortamiento elástico.`,a:nn*f,u:'kg/cm²',s:[`Δf = n·f_{cgp} = ${n(nn*f)} kg/cm²`]};},
r=>{const P0=r.i(100,400,10),mu=r.p([.15,.2,.25]),al=r.i(.05,.3,.01),K=r.p([.0015,.002,.003,.005]),x=r.i(10,40,1);const P=P0*Math.exp(-(mu*al+K*x));return{q:`P_{0}=${P0} t, μ=${mu}, α=${al} rad, K=${K} 1/m, x=${x} m. Halla P(x).`,a:P,u:'t',s:[`μα+Kx = ${n(mu*al+K*x)}`,`P = ${P0}·e^{−${n(mu*al+K*x)}} = ${n(P)} t`]};},
r=>{const d=r.i(3,8,1),L=r.i(10,40,1);return{q:`Deslizamiento de anclaje de ${d} mm en un cable de ${L} m (E_{p}=1.97×10⁶ kg/cm²). Halla la pérdida uniforme.`,a:d/10*1.97e6/(L*100),u:'kg/cm²',s:[`Δf = ΔE_{p}/L = ${d/10}·1.97×10⁶/${L*100} = ${n(d/10*1.97e6/(L*100))} kg/cm²`]};},
r=>{const P=r.i(100,500,10),l=r.i(12,30,1);return{q:`P_{i}=${P} t y pérdidas totales de ${l} %. Halla P_{e}.`,a:P*(1-l/100),u:'t',s:[`P_{e} = ${P}(1−${l/100}) = ${n(P*(1-l/100))} t`]};},
r=>{const P0=r.i(150,400,10),mu=.2,al=r.i(.1,.25,.01),K=.002,x=r.i(15,35,1),Ap=r.p([10,14,20,28]),nn=6,fc=r.i(60,120,5),lt=r.p([10,12,15]);const Pf=P0*Math.exp(-(mu*al+K*x)),Pes=Pf-nn*fc*Ap/1000,Pe=Pes*(1-lt/100);return{q:`P_{0}=${P0} t, μ=0.2, α=${al} rad, K=0.002, x=${x} m; A_{p}=${Ap} cm², n=6, f_{cgp}=${fc} kg/cm²; diferidas ${lt} %. Halla P_{e} en x.`,a:Pe,u:'t',s:[`Tras fricción: ${n(Pf)} t`,`Acortamiento: −${n(nn*fc*Ap/1000)} t → ${n(Pes)} t`,`Diferidas: P_{e} = ${n(Pe)} t`]};}
]});
SUB('pe3',{t:'Resistencia a flexión',
lec:`En rotura, el acero de preesfuerzo trabaja a f_{ps}, menor que su resistencia última f_{pu}. Para acero adherido, ACI da una aproximación:

f_{ps} = f_{pu}[1 − (γ_{p}/β_{1})·ρ_{p}·f_{pu}/f′_{c}]

- γ_{p} = 0.28 para torones de baja relajación
- ρ_{p} = A_{ps}/(b·d_{p})

Luego todo es como en concreto armado: a = A_{ps}f_{ps}/(0.85f′_{c}b) y M_{n} = A_{ps}f_{ps}(d_{p} − a/2), con φ = 0.90.

Torón típico de 1/2": 0.987 cm², f_{pu} = 18 900 kg/cm² (grado 270).`,
key:['ρ_{p} = [[A_{ps}|b·d_{p}]]','f_{ps} = f_{pu}(1 − [[γ_{p}|β_{1}]]ρ_{p}[[f_{pu}|f\'_{c}]])','a = [[A_{ps}f_{ps}|0.85f\'_{c}b]]','φM_{n} = 0.9A_{ps}f_{ps}(d_{p} − a/2)'],
err:'Usar f_{pu} directamente en el momento. Debe usarse f_{ps}.',
x:[['fle','Mismo bloque de Whitney'],['pe1','Servicio y rotura son revisiones distintas']],
g:[
r=>{const nt=r.i(4,20),b=r.i(30,120,10),d=r.i(50,120,5);const A=nt*.987;return{q:`${nt} torones de 1/2" (0.987 cm² c/u), b=${b} cm, d_{p}=${d} cm. Halla ρ_{p}.`,a:A/(b*d),u:'',tol:.01,s:[`A_{ps} = ${n(A)} cm²`,`ρ_{p} = ${n(A/(b*d))}`]};},
r=>{const nt=r.i(4,20),b=r.i(30,120,10),d=r.i(50,120,5),fc=r.p([280,350,420]);const A=nt*.987,rp=A/(b*d),f=18900*(1-.28/b1(fc)*rp*18900/fc);return{q:`${nt} torones de 1/2", b=${b}, d_{p}=${d} cm, f'_{c}=${fc}, f_{pu}=18 900 kg/cm², γ_{p}=0.28. Halla f_{ps}.`,a:f,u:'kg/cm²',s:[`ρ_{p} = ${n(rp)}, β₁ = ${n(b1(fc))}`,`f_{ps} = ${n(f)} kg/cm²`]};},
r=>{const nt=r.i(4,20),b=r.i(30,120,10),d=r.i(50,120,5),fc=r.p([280,350,420]);const A=nt*.987,rp=A/(b*d),f=18900*(1-.28/b1(fc)*rp*18900/fc),a=A*f/(.85*fc*b);return{q:`Con ${nt} torones de 1/2", b=${b}, d_{p}=${d}, f'_{c}=${fc}, halla a.`,a,u:'cm',s:[`f_{ps} = ${n(f)} kg/cm²`,`a = A_{ps}f_{ps}/(0.85f'_{c}b) = ${n(a)} cm`]};},
r=>{const nt=r.i(4,20),b=r.i(30,120,10),d=r.i(50,120,5),fc=r.p([280,350,420]);const A=nt*.987,rp=A/(b*d),f=18900*(1-.28/b1(fc)*rp*18900/fc),a=A*f/(.85*fc*b),M=.9*A*f*(d-a/2)/1e5;return{q:`Viga preesforzada: ${nt} torones de 1/2", b=${b}, d_{p}=${d} cm, f'_{c}=${fc}. Halla φM_{n}.`,a:M,u:'t·m',s:[`f_{ps} = ${n(f)}; a = ${n(a)} cm`,`φM_{n} = ${n(M)} t·m`]};},
r=>{const b=r.i(40,100,10),d=r.i(70,120,5),fc=r.p([350,420]),Mu=r.i(80,300,10);let nt=1;for(;nt<80;nt++){const A=nt*.987,rp=A/(b*d),f=18900*(1-.28/b1(fc)*rp*18900/fc),a=A*f/(.85*fc*b);if(.9*A*f*(d-a/2)/1e5>=Mu)break;}return{q:`Se necesita φM_{n} ≥ ${Mu} t·m con b=${b}, d_{p}=${d} cm, f'_{c}=${fc}. ¿Cuántos torones de 1/2" como mínimo?`,a:nt,u:'torones',tol:0,s:[`Prueba números crecientes de torones calculando f_{ps}, a y φM_{n}`,`Con ${nt} torones se alcanza ${n(Mu)} t·m`]};}
]});
SUB('pe4',{t:'Balanceo de cargas',
lec:`Un cable con forma de parábola empuja la viga hacia arriba con una carga repartida equivalente:

**w_{b} = 8·P·e/L²**

donde e es la flecha del cable (su caída en el centro). Si eliges P para que w_{b} iguale una parte de la carga, esa parte deja de flexionar la viga: queda en compresión pura.

Esta idea, de T. Y. Lin, convierte el diseño en algo intuitivo: el cable "sostiene" la carga como un cable colgante al revés. Solo la carga no balanceada produce momentos y flechas.`,
key:['w_{b} = [[8Pe|L^{2}]]','P = [[w_{b}L^{2}|8e]]','w_{neta} = w − w_{b}','δ = [[5w_{neta}L^{4}|384EI]]'],
err:'Usar la excentricidad en el centro si el cable no está en el centroide en los apoyos: e es la flecha relativa.',
x:[['vm','w_{b} genera un diagrama de momentos opuesto'],['def','Solo la carga neta produce flecha'],['par','El cable parabólico es un cable colgante invertido']],
g:[
r=>{const P=r.i(50,400,10),e=r.i(.1,.6,.05),L=r.i(8,40,1);return{q:`P=${P} t, flecha del cable e=${e} m, L=${L} m. Halla w_{b}.`,a:8*P*e/L/L,u:'t/m',s:[`w_{b} = 8·${P}·${e}/${L}² = ${n(8*P*e/L/L)} t/m`]};},
r=>{const w=r.i(1,6,.25),L=r.i(10,40,1),e=+(L*r.i(.03,.05,.005)).toFixed(2);return{q:`Se quiere balancear w=${w} t/m con e=${e} m y L=${L} m. Halla P.`,a:w*L*L/(8*e),u:'t',s:[`P = wL²/(8e) = ${n(w*L*L/(8*e))} t`]};},
r=>{const w=r.i(2,8,.25),P=r.i(80,300,10),e=r.i(.2,.6,.05),L=r.i(10,30,1);const wb=8*P*e/L/L;return{q:`w=${w} t/m, P=${P} t, e=${e} m, L=${L} m. Halla la carga no balanceada.`,a:w-wb,u:'t/m',s:[`w_{b} = ${n(wb)} t/m`,`w_{neta} = ${n(w-wb)} t/m (negativa: el cable empuja más de lo que carga la viga)`]};},
r=>{const w=r.i(2,8,.25),P=r.i(80,300,10),e=r.i(.2,.6,.05),L=r.i(10,30,1);const wn=w-8*P*e/L/L;return{q:`w=${w} t/m, P=${P} t, e=${e} m, L=${L} m. Halla el momento neto en el centro.`,a:wn*L*L/8,u:'t·m',s:[`w_{neta} = ${n(wn)} t/m`,`M = w_{neta}L²/8 = ${n(wn*L*L/8)} t·m`]};},
r=>{const w=r.i(2,8,.25),P=r.i(80,300,10),e=r.i(.2,.6,.05),L=r.i(12,30,1),I=r.i(3e6,2e7,5e5),fc=350;const wn=w-8*P*e/L/L,E=15000*sq(fc),d=5*wn*10*(L*100)**4/(384*E*I);return{q:`Viga de L=${L} m, I=${I} cm⁴, f'_{c}=350, w=${w} t/m, P=${P} t, e=${e} m. Halla la flecha neta al centro (positiva hacia abajo).`,a:d,u:'cm',s:[`w_{neta} = ${n(wn)} t/m`,`E = ${n(E,6)} kg/cm²`,`δ = 5w_{neta}L⁴/(384EI) = ${n(d)} cm (negativa = contraflecha hacia arriba)`]};}
]});

MOD('m24','Puentes (AASHTO LRFD)','Estructuras',
'Un puente lleva cargas que se mueven. Por eso no basta con un momento: hay que buscar dónde poner los camiones para el peor caso. Aquí se usa la norma AASHTO LRFD, base del Manual de Puentes del MTC.',
['Rodríguez Serquén, Puentes con AASHTO LRFD','AASHTO LRFD Bridge Design Specifications','MTC, Manual de Puentes (Perú)','Barker y Puckett, Design of Highway Bridges'],
'UNI: Puentes y Obras de Arte (ES-941). PUCP: Diseño de Puentes (electivo).');
SUB('pu1',{t:'Cargas vivas HL-93',
lec:`La carga viva vehicular de AASHTO se llama **HL-93**. Combina un vehículo y una carga de carril:

- **Camión de diseño:** ejes de 35, 145 y 145 kN, separados 4.3 m (el segundo tramo entre 4.3 y 9.0 m)
- **Tándem:** dos ejes de 110 kN separados 1.2 m
- **Carril:** 9.3 kN/m repartida

Se usa el mayor efecto entre camión y tándem, **más** la carga de carril. Al camión o tándem se le aplica el impacto **IM = 33 %**; a la carga de carril, no.

## Momento en el centro de una luz simple
Usa la línea de influencia: la ordenada en el punto x vale x/2 si x ≤ L/2. El momento es la suma de cada carga por su ordenada.`,
key:['M_{carril} = [[9.3L^{2}|8]]','M_{LL+IM} = 1.33·máx(M_{camión}, M_{tándem}) + M_{carril}','y(x) = x/2 (línea de influencia en L/2)'],
err:'Aplicar el 33 % de impacto también a la carga de carril.',
x:[['vm','Momentos en vigas simples'],['pro','La carga HL-93 representa un evento raro'],['trf','Los ejes reales vienen del tráfico']],
g:[
r=>{const L=r.i(10,40,1);return{q:`Luz simple de ${L} m. Halla el momento máximo por la carga de carril.`,a:9.3*L*L/8,u:'kN·m',s:[`M = 9.3L²/8 = ${n(9.3*L*L/8)} kN·m`]};},
r=>{const L=r.i(6,40,1);const M=110*L/4+110*(L/2-1.2)/2;return{q:`Luz simple de ${L} m. Halla el momento en el centro por el tándem, con un eje en el centro.`,a:M,u:'kN·m',s:[`Ordenadas: L/4 = ${n(L/4)} y (L/2−1.2)/2 = ${n((L/2-1.2)/2)}`,`M = 110·${n(L/4)} + 110·${n((L/2-1.2)/2)} = ${n(M)} kN·m`]};},
r=>{const L=r.i(10,40,1);const y1=L/4,y2=(L/2-4.3)/2;const M=145*y1+145*y2+35*y2;return{q:`Luz simple de ${L} m. Halla el momento en el centro por el camión, con el eje central de 145 kN en el centro.`,a:M,u:'kN·m',s:[`Ordenada central = ${n(y1)}; a 4.3 m = ${n(y2)}`,`M = 145·${n(y1)} + (145+35)·${n(y2)} = ${n(M)} kN·m`]};},
r=>{const M=r.i(500,3000,50),IM=33;return{q:`M_{camión}=${M} kN·m. Halla el momento con impacto.`,a:M*1.33,u:'kN·m',s:[`M = 1.33·${M} = ${n(M*1.33)} kN·m`]};},
r=>{const L=r.i(10,40,1);const tr=145*L/4+180*(L/2-4.3)/2,td=110*L/4+110*(L/2-1.2)/2,ln=9.3*L*L/8,M=1.33*Math.max(tr,td)+ln;return{q:`Luz simple de ${L} m. Halla M_{LL+IM} en el centro por carril (camión o tándem con IM, más carril).`,a:M,u:'kN·m',s:[`Camión: ${n(tr)}; tándem: ${n(td)} kN·m`,`Carril: ${n(ln)} kN·m`,`M = 1.33·${n(Math.max(tr,td))} + ${n(ln)} = ${n(M)} kN·m`]};}
]});
SUB('pu2',{t:'Carriles y distribución',
lec:`La carga de un carril no la toma una sola viga: se reparte entre varias. AASHTO lo resume con un **factor de distribución** g por viga.

## Carriles de diseño
N_{L} = parte entera de (ancho libre / 3.6 m).

## Presencia múltiple
Es poco probable que todos los carriles estén cargados al máximo a la vez: m = 1.20 (1 carril), 1.00 (2), 0.85 (3), 0.65 (más de 3).

## Viga interior de concreto, un carril cargado (en mm)
g = 0.06 + (S/4300)^{0.4}·(S/L)^{0.3}·(K_{g}/(L·t_{s}³))^{0.1}

Las fórmulas de tabla ya incluyen m. Con la **regla de la palanca**, que se usa en vigas exteriores, sí debes multiplicar por m.`,
key:['N_{L} = ent([[w|3.6]])','m = 1.20, 1.00, 0.85, 0.65','g = 0.06 + ([[S|4300]])^{0.4}([[S|L]])^{0.3}([[K_{g}|Lt_{s}^{3}]])^{0.1}','M_{viga} = g·M_{LL+IM}'],
err:'Volver a aplicar m a un factor de tabla, que ya lo incluye.',
x:[['pu1','Reparte el momento por carril'],['rig','Las vigas más rígidas toman más carga']],
g:[
r=>{const w=r.i(6,22,.5);return{q:`Calzada de ${w} m de ancho libre. ¿Cuántos carriles de diseño?`,a:Math.floor(w/3.6),u:'carriles',tol:0,s:[`${w}/3.6 = ${n(w/3.6)} → ${Math.floor(w/3.6)}`]};},
r=>{const N=r.i(1,5),L=r.i(10,40,1);const m=N===1?1.2:N===2?1:N===3?.85:.65;return{q:`Puente de ${L} m con ${N} carril(es) cargado(s) con la carga de carril (9.3 kN/m). Halla la carga total considerando el factor de presencia múltiple m.`,a:m*N*9.3*L,u:'kN',s:[`m = ${m}`,`Carga = m·N·9.3·L = ${n(m*N*9.3*L)} kN`]};},
r=>{const g=r.i(.4,.9,.01),M=r.i(800,4000,50);return{q:`g=${g} y M_{LL+IM}=${M} kN·m por carril. Halla el momento por viga.`,a:g*M,u:'kN·m',s:[`M = ${n(g*M)} kN·m`]};},
r=>{const S=r.i(1800,3000,100),L=r.i(12000,35000,1000),k=r.i(1.0,1.3,.05);const g=.06+(S/4300)**.4*(S/L)**.3*k;return{q:`Viga interior: S=${S} mm, L=${L} mm y (K_{g}/(Lt_{s}³))^{0.1} = ${k}. Halla g para un carril.`,a:g,u:'',s:[`(S/4300)^{0.4} = ${n((S/4300)**.4)}`,`(S/L)^{0.3} = ${n((S/L)**.3)}`,`g = ${n(g)}`]};},
r=>{const S=r.i(2000,3000,100),de=r.i(300,900,50),P=1;const x1=S+de-600,x2=x1-1800;const g=1.2*(.5*x1/S+(x2>0?.5*x2/S:0));return{q:`Regla de la palanca en viga exterior: separación S=${S} mm, volado hasta el borde de la vereda de ${de} mm. Las ruedas (P/2 cada una, 1.8 m entre sí) se colocan con la primera a 600 mm del borde. Halla g incluyendo m=1.2.`,a:g,u:'',s:[`Rueda 1 a ${x1} mm de la viga interior; rueda 2 a ${x2} mm`,`Reacción = 0.5(${x1}/S)${x2>0?` + 0.5(${x2}/S)`:''} = ${n(g/1.2)}`,`g = 1.2·${n(g/1.2)} = ${n(g)}`]};}
]});
SUB('pu3',{t:'Combinaciones y diseño de vigas',
lec:`LRFD significa diseño por factores de carga y resistencia. La combinación principal para cargas normales es **Resistencia I**:

M_{u} = η[1.25·DC + 1.50·DW + 1.75·(LL + IM)]

- **DC:** peso de componentes estructurales (vigas, losa, barreras)
- **DW:** superficie de rodadura (asfalto), más incierta
- **LL+IM:** carga viva con impacto
- η: factor de ductilidad, redundancia e importancia, normalmente 1.0

Para servicio (fisuras, flechas) se usa **Servicio I** con factores 1.0. La viga se diseña después igual que en concreto armado o preesforzado.`,
key:['M_{u} = 1.25DC + 1.50DW + 1.75(LL+IM)','Servicio I: 1.0DC + 1.0DW + 1.0(LL+IM)','w_{DW} = γ_{asfalto}·e·S'],
err:'Dar a DW el mismo factor que DC: el asfalto se recapea y varía más.',
x:[['fle','La viga se diseña por flexión'],['pe3','O como viga preesforzada'],['car','Es el metrado de puentes']],
g:[
r=>{const dc=r.i(200,2000,50),dw=r.i(30,300,10),ll=r.i(300,2500,50);return{q:`M_{DC}=${dc}, M_{DW}=${dw}, M_{LL+IM}=${ll} kN·m. Halla M_{u} (Resistencia I).`,a:1.25*dc+1.5*dw+1.75*ll,u:'kN·m',s:[`M_{u} = 1.25·${dc} + 1.5·${dw} + 1.75·${ll} = ${n(1.25*dc+1.5*dw+1.75*ll)} kN·m`]};},
r=>{const e=r.p([.05,.075,.1]),S=r.i(1.8,3,.1),L=r.i(12,35,1);const w=22*e*S;return{q:`Asfalto de ${e*100} cm (22 kN/m³) sobre una viga con ancho tributario ${S} m y luz ${L} m. Halla M_{DW}.`,a:w*L*L/8,u:'kN·m',s:[`w_{DW} = 22·${e}·${S} = ${n(w)} kN/m`,`M = wL²/8 = ${n(w*L*L/8)} kN·m`]};},
r=>{const ts=r.p([.2,.22,.25]),S=r.i(1.8,3,.1),bw=r.p([.35,.4,.45]),h=r.i(1,1.8,.1),L=r.i(12,30,1);const w=24*(ts*S+bw*(h-ts));return{q:`Viga T de puente: losa ${ts} m con ancho tributario ${S} m, alma ${bw}×${h} m (altura total), concreto 24 kN/m³, L=${L} m. Halla M_{DC} (sin barreras).`,a:w*L*L/8,u:'kN·m',s:[`w = 24[${ts}·${S} + ${bw}(${h}−${ts})] = ${n(w)} kN/m`,`M_{DC} = ${n(w*L*L/8)} kN·m`]};},
r=>{const dc=r.i(400,2000,50),dw=r.i(50,300,10),ll=r.i(500,2500,50);return{q:`M_{DC}=${dc}, M_{DW}=${dw}, M_{LL+IM}=${ll} kN·m. Halla M en Servicio I.`,a:dc+dw+ll,u:'kN·m',s:[`M = ${dc+dw+ll} kN·m`]};},
r=>{const L=r.i(14,30,1),S=r.i(2,2.8,.1),g=r.i(.5,.8,.01),ts=.2,bw=.4,h=r.i(1.1,1.6,.1);const wdc=24*(ts*S+bw*(h-ts))+r.p([2,3]),wdw=22*.05*S;const tr=145*L/4+180*(L/2-4.3)/2,ln=9.3*L*L/8,ll=g*(1.33*tr+ln);const Mu=1.25*wdc*L*L/8+1.5*wdw*L*L/8+1.75*ll;return{q:`Viga interior: L=${L} m, S=${S} m, losa 0.20 m, alma 0.40×${h} m, barreras y otros ${n(wdc-24*(ts*S+bw*(h-ts)))} kN/m, asfalto 5 cm, g=${g}. Halla M_{u} en el centro (camión gobierna).`,a:Mu,u:'kN·m',s:[`w_{DC} = ${n(wdc)} kN/m → M_{DC} = ${n(wdc*L*L/8)}`,`M_{DW} = ${n(wdw*L*L/8)}`,`M_{LL+IM} = g(1.33·${n(tr)} + ${n(ln)}) = ${n(ll)}`,`M_{u} = ${n(Mu)} kN·m`]};}
]});
SUB('pu4',{t:'Apoyos elastoméricos',
lec:`Entre la viga y el estribo se coloca un **apoyo de neopreno** con láminas de acero. Permite que la viga se dilate por temperatura y gire sin dañar el apoyo.

## Factor de forma
Una capa de elastómero de L×W y espesor h_{ri}:

S = L·W/[2·h_{ri}·(L + W)]

Mientras más delgadas las capas, mayor S y más rígido a compresión.

## Revisiones (método B de AASHTO, resumidas)
- Esfuerzo de compresión: σ_{s} = P/(LW) ≤ 1.66·G·S y ≤ 11 MPa
- Corte: el espesor total de elastómero h_{rt} ≥ 2Δ_{s}, donde Δ_{s} es el desplazamiento horizontal
- Dilatación térmica: Δ = α·ΔT·L, con α = 10.8×10⁻⁶ /°C para concreto`,
key:['S = [[LW|2h_{ri}(L+W)]]','σ_{s} = [[P|LW]] ≤ 1.66GS ≤ 11 MPa','h_{rt} ≥ 2Δ_{s}','Δ = α·ΔT·L'],
err:'Olvidar que G del neopreno varía con la temperatura: usa el rango que da el fabricante.',
x:[['axi','Esfuerzo y deformación'],['cor','Deformación por corte'],['pu3','Recibe la reacción de la viga']],
g:[
r=>{const L=r.i(200,500,25),W=r.i(250,600,25),h=r.p([8,10,12,15]);return{q:`Apoyo de ${L}×${W} mm con capas de ${h} mm. Halla S.`,a:L*W/(2*h*(L+W)),u:'',s:[`S = ${L}·${W}/(2·${h}·${L+W}) = ${n(L*W/(2*h*(L+W)))}`]};},
r=>{const P=r.i(300,2000,50),L=r.i(200,500,25),W=r.i(250,600,25);return{q:`Reacción de servicio ${P} kN sobre un apoyo de ${L}×${W} mm. Halla σ_{s}.`,a:P*1000/(L*W),u:'MPa',s:[`σ = ${P*1000}/${L*W} = ${n(P*1000/(L*W))} MPa`]};},
r=>{const L=r.i(15,60,1),dT=r.i(15,40,5);return{q:`Viga de concreto de ${L} m con variación térmica de ${dT} °C. Halla Δ.`,a:10.8e-6*dT*L*1000,u:'mm',s:[`Δ = 10.8×10⁻⁶·${dT}·${L*1000} = ${n(10.8e-6*dT*L*1000)} mm`]};},
r=>{const L=r.i(250,500,25),W=r.i(300,600,25),h=r.p([8,10,12]),G=r.p([.7,.9,1.0,1.2]);const S=L*W/(2*h*(L+W)),lim=Math.min(1.66*G*S,11);return{q:`Apoyo ${L}×${W} mm, capas de ${h} mm, G=${G} MPa. Halla el esfuerzo admisible de compresión.`,a:lim,u:'MPa',s:[`S = ${n(S)}`,`1.66GS = ${n(1.66*G*S)} MPa; tope 11 MPa`,`σ_{adm} = ${n(lim)} MPa`]};},
r=>{const Lb=r.i(20,50,1),dT=r.i(20,40,5),cs=r.i(5,20,5),h=r.p([8,10,12]);const D=10.8e-6*dT*Lb*1000+cs;const nc=Math.ceil(2*D/h);return{q:`Viga de ${Lb} m (expansión desde el centro, la mitad va a cada apoyo), ΔT=${dT} °C, más ${cs} mm por contracción. Con capas de ${h} mm, ¿cuántas capas internas como mínimo? (h_{rt} ≥ 2Δ_{s})`,a:Math.ceil(2*(10.8e-6*dT*Lb/2*1000+cs)/h),u:'capas',tol:0,s:[`Δ_{s} = 10.8×10⁻⁶·${dT}·${Lb*500} + ${cs} = ${n(10.8e-6*dT*Lb/2*1000+cs)} mm`,`h_{rt} ≥ ${n(2*(10.8e-6*dT*Lb/2*1000+cs))} mm`,`Capas = ${Math.ceil(2*(10.8e-6*dT*Lb/2*1000+cs)/h)}`]};}
]});

MOD('m25','Dinámica estructural y sismología','Estructuras',
'Para diseñar un edificio alto en el Perú no basta el método estático: hay que entender cómo vibra cada modo y de dónde viene el sismo.',
['Chopra, Dinámica de estructuras','Paz y Kim, Structural Dynamics: Theory and Computation','Wilson, Análisis estático y dinámico de estructuras','Herráiz, Conceptos básicos de sismología para ingenieros','Villarreal, Interacción suelo-estructura en edificaciones'],
'UNI: Dinámica Estructural (posgrado y electivo). PUCP: Ingeniería Sismorresistente y Dinámica Estructural. MIT: 1.058 Structural Dynamics.');
SUB('vf',{t:'Vibración forzada y resonancia',
lec:`Si una fuerza armónica de frecuencia ω empuja un sistema de frecuencia natural ω_{n}, la respuesta se amplifica según la razón r = ω/ω_{n}:

FAD = 1/√[(1 − r²)² + (2ζr)²]

- Si r ≪ 1, el sistema sigue a la fuerza casi estáticamente (FAD ≈ 1).
- Si r ≈ 1, hay **resonancia**: FAD ≈ 1/(2ζ). Con ζ = 5 %, se amplifica 10 veces.
- Si r ≫ 1, el sistema casi no se mueve. Así funcionan los **aisladores sísmicos**: alargan el periodo para alejarse del sismo.

Ejemplos reales: máquinas sobre losas, puentes peatonales que vibran con los pasos y suelos blandos que resuenan con edificios de cierta altura.`,
key:['r = [[ω|ω_{n}]]','FAD = [[1|√{(1−r^{2})^{2} + (2ζr)^{2}}]]','FAD_{res} ≈ [[1|2ζ]]','u_{máx} = u_{est}·FAD'],
err:'Pensar que más rigidez siempre ayuda: si acerca ω_{n} a la frecuencia de excitación, empeora.',
x:[['osc','Parte de la oscilación libre'],['gdl','Añade una fuerza externa'],['esp','El espectro resume esta respuesta para muchos periodos']],
g:[
r=>{const w=r.i(5,60,1),wn=r.i(5,60,1);return{q:`ω=${w} rad/s y ω_{n}=${wn} rad/s. Halla r.`,a:w/wn,u:'',s:[`r = ${n(w/wn)}`]};},
r=>{const z=r.i(1,20,.5)/100;return{q:`En resonancia con ζ=${z*100} %, ¿cuánto vale el FAD aproximado?`,a:1/(2*z),u:'',s:[`FAD = 1/(2ζ) = ${n(1/(2*z))}`]};},
r=>{const rr=r.i(.1,3,.05),z=r.p([.02,.05,.1]);const F=1/sq((1-rr*rr)**2+(2*z*rr)**2);return{q:`r=${rr}, ζ=${z*100} %. Halla el FAD.`,a:F,u:'',s:[`FAD = 1/√((1−${n(rr*rr)})² + (${n(2*z*rr)})²) = ${n(F)}`]};},
r=>{const F0=r.i(1,20),k=r.i(500,20000,500),rr=r.i(.2,2.5,.1),z=.05;const D=1/sq((1-rr*rr)**2+(2*z*rr)**2);return{q:`Una máquina aplica F_{0}=${F0} kN armónica sobre una losa con k=${k} kN/m, r=${rr}, ζ=5 %. Halla la amplitud.`,a:F0/k*D*1000,u:'mm',s:[`u_{est} = F_{0}/k = ${n(F0/k*1000)} mm`,`FAD = ${n(D)}`,`u = ${n(F0/k*D*1000)} mm`]};},
r=>{const rpm=r.i(600,3000,100),m=r.i(5,60,5),z=.05,lim=r.p([.1,.2,.25]);const w=rpm*2*PI/60;const rr=sq(1+1/lim);return{q:`Una bomba gira a ${rpm} rpm. Para que la losa transmita solo el ${lim*100} % de la fuerza, se diseña con r = √(1 + 1/TR), sin amortiguamiento. Halla la frecuencia natural máxima en Hz.`,a:w/rr/(2*PI),u:'Hz',s:[`ω = ${n(w)} rad/s`,`r = √(1+1/${lim}) = ${n(rr)}`,`f_{n} = ω/(2πr) = ${n(w/rr/(2*PI))} Hz`]};}
]});
SUB('gd2',{t:'Sistemas de varios grados de libertad',
lec:`Un edificio de dos pisos tiene **dos modos** de vibrar. En el primero, ambos pisos se mueven al mismo lado. En el segundo, se mueven en sentido contrario.

Para un edificio de corte con masas m_{1}, m_{2} y rigideces de entrepiso k_{1} (abajo), k_{2} (arriba):

[K] = [[k_{1}+k_{2}, −k_{2}], [−k_{2}, k_{2}]], [M] = diag(m_{1}, m_{2})

Las frecuencias salen de det([K] − ω²[M]) = 0, que es una ecuación cuadrática en λ = ω²:

m_{1}m_{2}λ² − [m_{1}k_{2} + m_{2}(k_{1}+k_{2})]λ + k_{1}k_{2} = 0

Con pisos iguales (m, k): ω₁² = 0.382k/m y ω₂² = 2.618k/m.`,
key:['det([K] − ω^{2}[M]) = 0','ω_{1}^{2} = 0.382[[k|m]] (pisos iguales)','[[φ_{2}|φ_{1}]] = [[k_{1}+k_{2}−ω^{2}m_{1}|k_{2}]]'],
err:'Usar la masa en kN. Con k en kN/m, la masa va en toneladas.',
x:[['osc','Generaliza un grado de libertad'],['rig','Usa la matriz de rigidez'],['sis','Es un problema de valores propios']],
g:[
r=>{const k=r.i(5000,50000,1000),m=r.i(20,200,10);const w=sq(.382*k/m);return{q:`Edificio de 2 pisos iguales: m=${m} t, k=${k} kN/m. Halla ω₁.`,a:w,u:'rad/s',s:[`ω₁² = 0.382·${k}/${m} = ${n(.382*k/m)}`,`ω₁ = ${n(w)} rad/s`]};},
r=>{const k=r.i(5000,50000,1000),m=r.i(20,200,10);const T=2*PI/sq(.382*k/m);return{q:`2 pisos iguales: m=${m} t, k=${k} kN/m. Halla T₁.`,a:T,u:'s',s:[`ω₁ = ${n(sq(.382*k/m))} rad/s`,`T₁ = ${n(T)} s`]};},
r=>{const k=r.i(5000,50000,1000),m=r.i(20,200,10);const T=2*PI/sq(2.618*k/m);return{q:`2 pisos iguales: m=${m} t, k=${k} kN/m. Halla T₂.`,a:T,u:'s',s:[`ω₂² = 2.618k/m`,`T₂ = ${n(T)} s`]};},
r=>{const m1=r.i(20,200,10),m2=r.i(10,150,10),k1=r.i(10000,60000,1000),k2=r.i(5000,50000,1000);const A=m1*m2,B=m1*k2+m2*(k1+k2),C=k1*k2,l=(B-sq(B*B-4*A*C))/(2*A);return{q:`m₁=${m1}, m₂=${m2} t; k₁=${k1}, k₂=${k2} kN/m. Halla T₁.`,a:2*PI/sq(l),u:'s',s:[`${A}λ² − ${B}λ + ${C} = 0`,`λ₁ = ${n(l)} → ω₁ = ${n(sq(l))} rad/s`,`T₁ = ${n(2*PI/sq(l))} s`]};},
r=>{const m1=r.i(20,200,10),m2=r.i(10,150,10),k1=r.i(10000,60000,1000),k2=r.i(5000,50000,1000);const A=m1*m2,B=m1*k2+m2*(k1+k2),C=k1*k2,l=(B-sq(B*B-4*A*C))/(2*A);const ph=(k1+k2-l*m1)/k2;return{q:`m₁=${m1}, m₂=${m2} t; k₁=${k1}, k₂=${k2} kN/m. Con φ₁ = 1 en el piso 1, halla φ₂ del primer modo.`,a:ph,u:'',s:[`λ₁ = ${n(l)}`,`φ₂ = (k₁+k₂−λ₁m₁)/k₂ = ${n(ph)}`]};}
]});
SUB('mod',{t:'Análisis modal espectral',
lec:`La E.030 pide, para la mayoría de edificios, un **análisis dinámico modal espectral**:

- Calcula cada modo y su periodo
- Lee del espectro la aceleración de cada modo
- Calcula la respuesta de cada modo y **combínalas**

Los máximos de cada modo no ocurren a la vez, así que no se suman directamente.

## Combinaciones
- **ABS:** suma de valores absolutos, conservadora
- **SRSS:** √(Σr_{i}²), buena si los periodos están separados
- **CQC:** considera la correlación entre modos cercanos; la E.030 permite usarla

## Masa participativa
Γ = φᵀM·1 / φᵀMφ; masa efectiva = (φᵀM·1)²/φᵀMφ. Se incluyen modos hasta sumar al menos 90 % de la masa.`,
key:['r_{SRSS} = √{Σr_{i}^{2}}','r_{ABS} = Σ|r_{i}|','Γ = [[φ^{T}M·1|φ^{T}Mφ]]','M_{ef} = [[(φ^{T}M·1)^{2}|φ^{T}Mφ]]'],
err:'Combinar primero los desplazamientos y luego derivar las derivas: las derivas se combinan modo por modo.',
x:[['esp','Usa el espectro de la norma'],['gd2','Necesita modos y periodos'],['dri','Las derivas salen de aquí']],
g:[
r=>{const a=r.i(10,200,5),b=r.i(2,80,1);return{q:`Cortante basal modal: modo 1 = ${a} t, modo 2 = ${b} t. Halla la combinación SRSS.`,a:sq(a*a+b*b),u:'t',s:[`√(${a}² + ${b}²) = ${n(sq(a*a+b*b))} t`]};},
r=>{const a=r.i(10,200,5),b=r.i(2,80,1),c=r.i(1,30,1);return{q:`Respuestas modales ${a}, ${b} y ${c} mm. Halla ABS y SRSS; escribe SRSS.`,a:sq(a*a+b*b+c*c),u:'mm',s:[`ABS = ${a+b+c} mm`,`SRSS = ${n(sq(a*a+b*b+c*c))} mm`]};},
r=>{const m1=r.i(50,200,10),m2=r.i(50,200,10),p2=r.i(1.2,2.2,.05);const num=m1+m2*p2,den=m1+m2*p2*p2;return{q:`Modo 1: φ = {1, ${p2}}, masas m₁=${m1}, m₂=${m2} t. Halla Γ₁.`,a:num/den,u:'',s:[`φᵀM·1 = ${n(num)}`,`φᵀMφ = ${n(den)}`,`Γ = ${n(num/den)}`]};},
r=>{const m1=r.i(50,200,10),m2=r.i(50,200,10),p2=r.i(1.2,2.2,.05);const num=m1+m2*p2,den=m1+m2*p2*p2,Me=num*num/den;return{q:`Modo 1: φ = {1, ${p2}}, m₁=${m1}, m₂=${m2} t. ¿Qué % de la masa total participa?`,a:Me/(m1+m2)*100,u:'%',s:[`M_{ef} = (${n(num)})²/${n(den)} = ${n(Me)} t`,`% = ${n(Me/(m1+m2)*100)} %`]};},
r=>{const m1=r.i(50,200,10),m2=r.i(50,200,10),p2=r.i(1.2,2.2,.05),Sa=r.i(1,4,.1);const num=m1+m2*p2,den=m1+m2*p2*p2,Me=num*num/den;return{q:`Modo 1: φ = {1, ${p2}}, m₁=${m1}, m₂=${m2} t, aceleración espectral S_{a}=${Sa} m/s². Halla el cortante basal del modo 1.`,a:Me*Sa,u:'kN',s:[`M_{ef} = ${n(Me)} t`,`V₁ = M_{ef}·S_{a} = ${n(Me*Sa)} kN`]};}
]});
SUB('sis2',{t:'Sismología para ingenieros',
lec:`El Perú está donde la **placa de Nazca** se mete bajo la **placa Sudamericana**. Esa subducción produce los grandes sismos de la costa, como los de 1746, 1970 y 2007.

## Ondas
- **P:** primarias, de compresión, las más rápidas (≈ 6 km/s en corteza)
- **S:** secundarias, de corte, más lentas (≈ 3.5 km/s) y más dañinas

La distancia al foco se estima con la diferencia de llegada: d = Δt·V_{p}V_{s}/(V_{p} − V_{s}) ≈ 8.4·Δt.

## Magnitud y energía
- La **magnitud** mide la energía liberada; la **intensidad**, el daño en un lugar.
- log E = 1.5M + 4.8 (E en joules). Un grado más de magnitud libera unas 32 veces más energía.
- Ley de Gutenberg-Richter: log N = a − bM. Los sismos pequeños son mucho más frecuentes.`,
key:['d = Δt·[[V_{p}V_{s}|V_{p}−V_{s}]]','log E = 1.5M + 4.8','[[E_{2}|E_{1}]] = 10^{1.5(M_{2}−M_{1})}','log N = a − bM'],
err:'Confundir magnitud con intensidad. Un mismo sismo tiene una magnitud y muchas intensidades.',
x:[['pro','El periodo de retorno sale de estas estadísticas'],['esp','Z representa la aceleración esperada'],['efe','Las ondas S provocan licuación']],
g:[
r=>{const dt=r.i(2,60,1);return{q:`Las ondas S llegan ${dt} s después de las P (V_{p}=6, V_{s}=3.5 km/s). Halla la distancia.`,a:dt*6*3.5/2.5,u:'km',s:[`d = ${dt}·6·3.5/2.5 = ${n(dt*8.4)} km`]};},
r=>{const M1=r.i(5,8.5,.1),dM=r.i(.5,2,.1);return{q:`¿Cuántas veces más energía libera un sismo de M=${n(M1+dM,3)} que uno de M=${M1}?`,a:10**(1.5*dM),u:'veces',s:[`10^{1.5·${n(dM,3)}} = ${n(10**(1.5*dM))}`]};},
r=>{const M=r.i(5,9,.1);return{q:`Halla la energía de un sismo M=${M} en joules (escribe el exponente decimal: log E).`,a:1.5*M+4.8,u:'',s:[`log E = 1.5·${M} + 4.8 = ${n(1.5*M+4.8)}`]};},
r=>{const a=r.i(4,7,.1),b=r.i(.8,1.1,.05),M=r.i(5,7.5,.5);return{q:`Una zona cumple log N = ${a} − ${b}M (N por año). ¿Cuántos sismos de magnitud ≥ ${M} ocurren al año?`,a:10**(a-b*M),u:'sismos/año',s:[`log N = ${n(a-b*M)}`,`N = ${n(10**(a-b*M))}`]};},
r=>{const a=r.i(4,7,.1),b=r.i(.8,1.1,.05),M=r.i(6,8,.5);const N=10**(a-b*M);return{q:`Con log N = ${a} − ${b}M, halla el periodo de retorno de sismos de M ≥ ${M}.`,a:1/N,u:'años',s:[`N = ${n(N)} por año`,`T = 1/N = ${n(1/N)} años`]};}
]});

MOD('m26','Análisis matricial y elementos finitos','Estructuras',
'Es lo que hacen ETABS y SAP2000 por dentro. Si lo entiendes, sabrás armar el modelo correcto y detectar cuando un resultado no tiene sentido.',
['Hibbeler, Análisis matricial de estructuras','Tena Colunga, Análisis de estructuras con métodos matriciales','Quispe, Análisis matricial de estructuras: introducción al MEF','Kassimali, Matrix Analysis of Structures','Nam-Ho Kim, Introduction to Nonlinear Finite Element Analysis'],
'UNI: Análisis Estructural II. PUCP: Análisis Estructural 2 y Métodos Numéricos. MIT: 1.571 Structural Analysis and Control.');
SUB('mk1',{t:'Armaduras en coordenadas globales',
lec:`Una barra de armadura solo tiene rigidez axial EA/L. Si está inclinada, esa rigidez se proyecta en x e y con los **cosenos directores** c = cos θ y s = sen θ.

La matriz 4×4 de la barra en coordenadas globales tiene bloques:

k = (EA/L)·[[c², cs], [cs, s²]]

con signos negativos en los bloques que unen el nudo inicial con el final. Se ensamblan sumando los términos de las barras que llegan a cada nudo.

Después de hallar los desplazamientos, la fuerza en cada barra es:

N = (EA/L)·[(u_{2} − u_{1})c + (v_{2} − v_{1})s]`,
key:['c = [[x_{2}−x_{1}|L]], s = [[y_{2}−y_{1}|L]]','k_{11} = [[EA|L]]c^{2}, k_{12} = [[EA|L]]cs','N = [[EA|L]][(u_{2}−u_{1})c + (v_{2}−v_{1})s]'],
err:'Calcular c y s con el ángulo medido desde el eje y.',
x:[['arm','Las mismas armaduras, ahora con desplazamientos'],['rig','Generaliza k = EA/L'],['vec','Proyección de vectores'],['sis','Se resuelve un sistema lineal']],
g:[
r=>{const dx=r.i(-6,6,1)||3,dy=r.i(1,6,1);const L=sq(dx*dx+dy*dy);return{q:`Barra de (0,0) a (${dx},${dy}) m. Halla c.`,a:dx/L,u:'',s:[`L = ${n(L)} m`,`c = ${dx}/${n(L)} = ${n(dx/L)}`]};},
r=>{const dx=r.i(1,6,1),dy=r.i(1,6,1),EA=r.i(50000,400000,10000);const L=sq(dx*dx+dy*dy),c=dx/L;return{q:`Barra de (0,0) a (${dx},${dy}) m con EA=${EA} kN. Halla k₁₁ = (EA/L)c².`,a:EA/L*c*c,u:'kN/m',s:[`L = ${n(L)}, c = ${n(c)}`,`k₁₁ = ${n(EA/L*c*c,6)} kN/m`]};},
r=>{const h=r.i(1,4,.5),b=r.i(1,4,.5),EA=r.i(50000,300000,10000),P=r.i(10,100,5);const L=sq(h*h+b*b),s=h/L,K=2*EA/L*s*s;return{q:`Dos barras simétricas iguales (EA=${EA} kN) van de los apoyos (±${b}, ${h}) al nudo (0,0), donde cuelga P=${P} kN. Halla el descenso.`,a:P/K*1000,u:'mm',s:[`L = ${n(L)} m, s = ${n(s)}`,`K_{y} = 2(EA/L)s² = ${n(K,6)} kN/m`,`δ = P/K = ${n(P/K*1000)} mm`]};},
r=>{const EA=r.i(50000,300000,10000),dx=r.i(2,5,.5),dy=r.i(1,4,.5),u=r.i(-3,3,.5),v=r.i(-5,-1,.5);const L=sq(dx*dx+dy*dy),c=dx/L,s=dy/L;const N=EA/L*((u)*c+(v)*s)/1000;return{q:`Barra de (0,0) a (${dx},${dy}) m, EA=${EA} kN. El nudo final se mueve u=${u} mm, v=${v} mm; el inicial está fijo. Halla N (+ tensión).`,a:N,u:'kN',s:[`c = ${n(c)}, s = ${n(s)}, L = ${n(L)}`,`N = (EA/L)(u·c + v·s) = ${n(N)} kN`]};},
r=>{const L1=r.i(2,5,.5),h=r.i(2,4,.5),a=r.i(1,4,.5),EA=r.i(80000,250000,10000),P=r.i(10,80,5);const L2=sq(a*a+h*h),c=a/L2,s=h/L2;const k1=EA/L1,k2=EA/L2;const K=[[k1+k2*c*c,-k2*c*s],[-k2*c*s,k2*s*s]];const det=K[0][0]*K[1][1]-K[0][1]**2;const v=P*K[0][0]/det;return{q:`Nudo libre en (0,0): barra 1 horizontal hacia un apoyo en (−${L1},0) y barra 2 hacia un apoyo en (−${a},${h}); ambas con EA=${EA} kN. Carga P=${P} kN hacia abajo. Halla el descenso del nudo.`,a:v*1000,u:'mm',s:[`Barra 2: L=${n(L2)}, c=${n(c)}, s=${n(s)}`,`K = [[${n(K[0][0],5)}, ${n(K[0][1],5)}], [${n(K[0][1],5)}, ${n(K[1][1],5)}]]`,`Con F = {0, −P}: descenso = P·K₁₁/det = ${n(v*1000)} mm`]};}
]});
SUB('mk2',{t:'Elemento viga',
lec:`La matriz del elemento viga relaciona los cortantes y momentos en sus extremos con los desplazamientos y giros:

[k] = (EI/L³)·[[12, 6L, −12, 6L], [6L, 4L², −6L, 2L²], [−12, −6L, 12, −6L], [6L, 2L², −6L, 4L²]]

Cada término tiene un sentido físico: 4EI/L es el momento necesario para girar una unidad un extremo con el otro empotrado; 2EI/L es el momento que aparece en el otro extremo (el famoso "transmite la mitad" de Cross).

**Cargas en el tramo:** se reemplazan por fuerzas nodales equivalentes iguales a los momentos de empotramiento perfecto con signo cambiado.`,
key:['k_{θθ} = [[4EI|L]]','k_{vv} = [[12EI|L^{3}]]','k_{vθ} = [[6EI|L^{2}]]','θ = [[ΣFEM|Σ4EI/L]]'],
err:'Mezclar el orden de los grados de libertad entre elementos al ensamblar.',
x:[['crs','Cross es este método resuelto a mano'],['hip','Mismos momentos de empotramiento'],['def','Reproduce las flechas de tabla']],
g:[
r=>{const EI=r.i(5000,80000,1000),L=r.i(3,10);return{q:`EI=${EI} kN·m², L=${L} m. Halla 12EI/L³.`,a:12*EI/L**3,u:'kN/m',s:[`= ${n(12*EI/L**3)} kN/m`]};},
r=>{const EI=r.i(5000,80000,1000),L=r.i(3,10),M=r.i(5,80,5);return{q:`Viga empotrada en un extremo y con giro libre en el otro (EI=${EI} kN·m², L=${L} m). Se aplica M=${M} kN·m en el extremo libre de girar. Halla θ.`,a:M*L/(4*EI),u:'rad',tol:.02,s:[`θ = M/(4EI/L) = ${n(M*L/(4*EI))} rad`]};},
r=>{const EI=r.i(5000,80000,1000),L=r.i(2,6),P=r.i(5,60,5);return{q:`Voladizo como un elemento (EI=${EI}, L=${L} m), carga P=${P} kN en la punta. Resuelve el sistema 2×2 y halla v.`,a:P*L**3/(3*EI)*1000,u:'mm',s:[`(EI/L³)[[12, −6L], [−6L, 4L²]]{v, θ} = {P, 0}`,`De la segunda: θ = 1.5v/L`,`v = PL³/(3EI) = ${n(P*L**3/(3*EI)*1000)} mm`]};},
r=>{const w1=r.i(10,40,5),w2=r.i(10,40,5),L1=r.i(4,8),L2=r.i(4,8),EI=r.i(10000,60000,5000);const F1=w1*L1*L1/12,F2=w2*L2*L2/12;const th=(F1-F2)/(4*EI/L1+4*EI/L2);return{q:`Viga continua empotrada en sus extremos, con nudo central libre de girar. Tramo 1: w=${w1} kN/m, L=${L1} m. Tramo 2: w=${w2}, L=${L2} m. EI=${EI} kN·m². Halla el giro del nudo central.`,a:th*1000,u:'mrad',s:[`Desbalance: FEM₁ − FEM₂ = ${n(F1)} − ${n(F2)} = ${n(F1-F2)} kN·m`,`Rigidez: 4EI/L₁ + 4EI/L₂ = ${n(4*EI/L1+4*EI/L2)}`,`θ = ${n(th*1000)} mrad`]};},
r=>{const w1=r.i(10,40,5),w2=r.i(10,40,5),L1=r.i(4,8),L2=r.i(4,8),EI=r.i(10000,60000,5000);const F1=w1*L1*L1/12,F2=w2*L2*L2/12;const th=(F1-F2)/(4*EI/L1+4*EI/L2);const M=F1-4*EI/L1*th;return{q:`Viga continua empotrada en sus extremos con nudo central libre de girar: tramo 1 con w=${w1} kN/m, L=${L1} m; tramo 2 con w=${w2}, L=${L2} m; EI=${EI}. Halla el momento en el nudo central.`,a:M,u:'kN·m',s:[`θ = ${n(th*1000)} mrad`,`M = FEM₁ − (4EI/L₁)θ = ${n(M)} kN·m (igual por ambos lados)`]};}
]});
SUB('ef',{t:'Elementos finitos: la idea',
lec:`El método de elementos finitos divide un cuerpo complejo en piezas simples y aproxima, dentro de cada una, cómo varía el desplazamiento.

## Elemento barra de dos nudos
- Funciones de forma: N_{1} = 1 − x/L, N_{2} = x/L
- Desplazamiento: u(x) = N_{1}u_{1} + N_{2}u_{2}
- Deformación: ε = (u_{2} − u_{1})/L, constante en el elemento
- Carga repartida q: cada nudo recibe qL/2

Placas, losas, muros y suelos se modelan con elementos 2D y 3D que siguen la misma lógica.

**Regla práctica:** refina la malla donde los esfuerzos cambian rápido (esquinas, aberturas, cargas puntuales) y verifica que el resultado no cambie al refinar más.`,
key:['N_{1} = 1 − [[x|L]], N_{2} = [[x|L]]','ε = [[u_{2}−u_{1}|L]]','F_{nodal} = [[qL|2]]','[K]{u} = {F}'],
err:'Confiar en una malla gruesa en zonas de concentración de esfuerzos.',
x:[['mk1','El ensamble es igual'],['num','Es un método numérico'],['axi','Hooke dentro de cada elemento'],['l2d','Las losas se modelan así en SAFE']],
g:[
r=>{const u1=r.i(0,5,.5),u2=r.i(5,15,.5),L=r.i(1,4,.5),x=r.i(.25,.75,.25);const xx=x*L;return{q:`Elemento barra de L=${L} m con u₁=${u1} mm y u₂=${u2} mm. Halla u en x=${xx} m.`,a:u1*(1-x)+u2*x,u:'mm',s:[`N₁ = ${n(1-x)}, N₂ = ${n(x)}`,`u = ${n(u1*(1-x)+u2*x)} mm`]};},
r=>{const u1=r.i(0,2,.1),u2=r.i(2,6,.1),L=r.i(1,4,.5);return{q:`u₁=${u1} mm, u₂=${u2} mm, L=${L} m. Halla ε (en microdeformaciones).`,a:(u2-u1)/(L*1000)*1e6,u:'με',s:[`ε = ${n(u2-u1)}/${L*1000} = ${n((u2-u1)/(L*1000)*1e6)}×10⁻⁶`]};},
r=>{const q=r.i(1,20),L=r.i(1,5,.5);return{q:`Carga axial repartida q=${q} kN/m en un elemento de ${L} m. Halla la fuerza nodal equivalente en cada nudo.`,a:q*L/2,u:'kN',s:[`F = qL/2 = ${n(q*L/2)} kN`]};},
r=>{const EA=r.i(10000,100000,5000),L=r.i(2,6),P=r.i(5,50,5);const k=EA/(L/2);return{q:`Barra empotrada de L=${L} m, EA=${EA} kN, dividida en 2 elementos iguales, con P=${P} kN en el extremo. Halla u en el nudo central.`,a:P/k*1000,u:'mm',s:[`k de cada elemento = EA/(L/2) = ${n(k)} kN/m`,`El elemento 1 lleva P: u₂ = P/k = ${n(P/k*1000)} mm`]};},
r=>{const EA=r.i(10000,100000,5000),L=r.i(2,8),q=r.i(2,20);return{q:`Barra colgante de L=${L} m, EA=${EA} kN, con su peso q=${q} kN/m. Modélala con 2 elementos y halla u en el extremo libre.`,a:q*L*L/(2*EA)*1000,u:'mm',s:[`Fuerzas nodales: qL/4 en el nudo medio y qL/4 extra en el extremo`,`Resolviendo [K]{u}={F}: u_{3} = qL²/(2EA)`,`u = ${n(q*L*L/(2*EA)*1000)} mm (coincide con la solución exacta)`]};}
]});
SUB('pmat',{t:'Rigidez lateral y torsión en planta',
lec:`Cuando el sismo empuja un piso, cada columna y placa toma fuerza según su **rigidez lateral**:

- Columna con vigas muy rígidas: k = 12EI/h³
- Columna en voladizo o articulada arriba: k = 3EI/h³

## Centro de rigidez
x_{CR} = Σ(k_{i}·x_{i}) / Σk_{i}. La fuerza sísmica actúa en el **centro de masa**. Si no coinciden, aparece una excentricidad e = x_{CM} − x_{CR} y el piso **gira**. Es una de las primeras causas de colapso.

La torsión T = V·e se reparte entre los elementos según su distancia al centro de rigidez. Por eso conviene poner placas en el perímetro y de forma simétrica.`,
key:['k = [[12EI|h^{3}]] o [[3EI|h^{3}]]','x_{CR} = [[Σk_{i}x_{i}|Σk_{i}]]','e = x_{CM} − x_{CR}','T = V·e'],
err:'Calcular el centro de rigidez con las áreas de las columnas en vez de sus rigideces.',
x:[['rig','Rigidez lateral'],['tor','La torsión en planta'],['pla','Las placas definen el centro de rigidez'],['dis','e accidental de la E.030']],
g:[
r=>{const E=r.p([2.17e6,2.5e6]),b=r.i(25,60,5),h=r.i(2.6,4,.2);const I=b**4/12*1e-8,k=12*E*10*I/h**3;return{q:`Columna ${b}×${b} cm con vigas rígidas, E=${n(E/1e6,3)}×10⁶ t/m², h=${h} m. Halla k.`,a:12*E*I/h**3,u:'t/m',s:[`I = ${n(I)} m⁴`,`k = 12EI/h³ = ${n(12*E*I/h**3)} t/m`]};},
r=>{const k=r.i(1000,20000,500),h=r.i(2.6,4,.2);return{q:`Una columna con rigidez 12EI/h³ = ${k} t/m se articula arriba. ¿Cuál es su nueva rigidez (3EI/h³)?`,a:k/4,u:'t/m',s:[`3/12 = 1/4 → k = ${n(k/4)} t/m`]};},
r=>{const k=[r.i(1000,8000,500),r.i(1000,8000,500),r.i(5000,40000,1000)],x=[0,r.i(4,8),r.i(9,16)];const xr=(k[0]*x[0]+k[1]*x[1]+k[2]*x[2])/(k[0]+k[1]+k[2]);return{q:`Tres ejes resistentes con k = ${k.join(', ')} t/m en x = ${x.join(', ')} m. Halla x_{CR}.`,a:xr,u:'m',s:[`Σkx = ${k[0]*x[0]+k[1]*x[1]+k[2]*x[2]}`,`Σk = ${k[0]+k[1]+k[2]}`,`x_{CR} = ${n(xr)} m`]};},
r=>{const k=[r.i(1000,8000,500),r.i(1000,8000,500),r.i(5000,40000,1000)],x=[0,r.i(4,8),r.i(9,16)],xm=r.i(4,9,.5),V=r.i(50,300,10);const xr=(k[0]*x[0]+k[1]*x[1]+k[2]*x[2])/(k[0]+k[1]+k[2]);return{q:`Ejes con k = ${k.join(', ')} t/m en x = ${x.join(', ')} m. Centro de masa en x=${xm} m y V=${V} t. Halla la torsión T = V·e (valor absoluto).`,a:Math.abs(V*(xm-xr)),u:'t·m',s:[`x_{CR} = ${n(xr)} m`,`e = ${n(xm-xr)} m`,`T = ${n(Math.abs(V*(xm-xr)))} t·m`]};},
r=>{const k=[r.i(2000,10000,500),r.i(2000,10000,500),r.i(2000,10000,500)],L=r.i(10,20,1),V=r.i(50,300,10);const x=[0,r.i(3,L-3,1),L],xm=r.i(3,L-3,.5);const S=k[0]+k[1]+k[2],xr=(k[1]*x[1]+k[2]*x[2])/S,e=xm-xr,J=k.reduce((t,ki,i)=>t+ki*(x[i]-xr)**2,0);const F1=V*k[0]/S+V*e*k[0]*(x[0]-xr)/J;return{q:`Tres ejes paralelos a la fuerza: k = ${k.join(', ')} t/m en x = 0, ${x[1]} y ${L} m. Centro de masa en x=${xm} m, V=${V} t. Halla la fuerza en el eje de x=0 (directa + torsión).`,a:F1,u:'t',s:[`x_{CR} = ${n(xr)} m, e = ${n(e)} m`,`J = Σk(x−x_{CR})² = ${n(J,6)}`,`F₁ = V·k₁/Σk + V·e·k₁(0 − x_{CR})/J = ${n(F1)} t`]};}
]});

MOD('m27','Estructuras de madera','Estructuras',
'La madera es renovable, ligera y muy usada en la Amazonía y en zonas rurales. La norma E.010 y el manual del Grupo Andino clasifican las especies en tres grupos.',
['Junta del Acuerdo de Cartagena, Manual de diseño para maderas del Grupo Andino','Norma E.010 Madera (RNE)','CIRSOC 601, Reglamento argentino de estructuras de madera','Breyer, Design of Wood Structures'],
'UNI: Albañilería, Adobe y Madera (ES-931). PUCP: Construcción con madera (electivo).');
SUB('md1',{t:'Vigas de madera',
lec:`La madera se diseña por **esfuerzos admisibles**: el esfuerzo de servicio no debe superar un valor de tabla según el grupo.

## Grupos estructurales (kg/cm², referencia del manual andino)
- **A** (más resistente): f_{m} = 210, f_{v} = 15, E_{prom} = 130 000
- **B:** f_{m} = 150, f_{v} = 12, E_{prom} = 100 000
- **C:** f_{m} = 100, f_{v} = 8, E_{prom} = 90 000

## Revisiones
- Flexión: σ = M/S ≤ f_{m}
- Corte: τ = 1.5V/(bh) ≤ f_{v}
- Flecha: δ ≤ L/300 con carga total (el límite cambia según el uso)

La madera húmeda o con defectos pierde resistencia: usa madera seca y clasificada.`,
key:['σ = [[M|S]] ≤ f_{m}','τ = [[1.5V|bh]] ≤ f_{v}','δ = [[5wL^{4}|384EI]] ≤ [[L|300]]','S = [[bh^{2}|6]]'],
err:'Usar el módulo de elasticidad mínimo para la flecha. Para vigas se usa el promedio.',
x:[['flx','Mismo esfuerzo por flexión'],['cor','Mismo cortante'],['def','Misma flecha']],
g:[
r=>{const b=r.i(4,10,1),h=r.i(10,30,2),M=r.i(20,200,10);return{q:`Viga de ${b}×${h} cm con M=${M} kg·m. Halla σ.`,a:M*100/(b*h*h/6),u:'kg/cm²',s:[`S = ${n(b*h*h/6)} cm³`,`σ = ${n(M*100/(b*h*h/6))} kg/cm²`]};},
r=>{const g=r.p([['A',210],['B',150],['C',100]]),w=r.i(50,400,10),L=r.i(2,5,.25),b=r.i(4,10,1);const M=w*L*L/8*100,h=sq(6*M/(b*g[1]));return{q:`Viga simple grupo ${g[0]} (f_{m}=${g[1]}), b=${b} cm, L=${L} m, w=${w} kg/m. Halla h mínimo por flexión.`,a:h,u:'cm',s:[`M = ${n(M/100)} kg·m`,`h = √(6M/(bf_{m})) = ${n(h)} cm`]};},
r=>{const g=r.p([['A',15],['B',12],['C',8]]),w=r.i(50,400,10),L=r.i(2,5,.25),b=r.i(4,10,1),h=r.i(14,30,2);const V=w*L/2,t=1.5*V/(b*h);return{q:`Viga grupo ${g[0]} (f_{v}=${g[1]}), ${b}×${h} cm, L=${L} m, w=${w} kg/m. Halla τ.`,a:t,u:'kg/cm²',s:[`V = ${n(V)} kg`,`τ = 1.5V/(bh) = ${n(t)} kg/cm²`]};},
r=>{const g=r.p([['A',130000],['B',100000],['C',90000]]),w=r.i(50,300,10),L=r.i(2,5,.25),b=r.i(4,10,1),h=r.i(14,30,2);const I=b*h**3/12,d=5*w/100*(L*100)**4/(384*g[1]*I);return{q:`Viga grupo ${g[0]} (E=${g[1]}), ${b}×${h} cm, L=${L} m, w=${w} kg/m. Halla δ.`,a:d,u:'cm',s:[`I = ${n(I)} cm⁴`,`δ = ${n(d)} cm (límite L/300 = ${n(L*100/300)} cm)`]};},
r=>{const g=r.p([['A',130000],['B',100000],['C',90000]]),w=r.i(80,300,10),L=r.i(2.5,5,.25),b=r.i(4,10,1);const Ireq=5*w/100*(L*100)**4/(384*g[1]*(L*100/300)),h=Math.cbrt(12*Ireq/b);return{q:`Viga grupo ${g[0]} (E=${g[1]}), b=${b} cm, L=${L} m, w=${w} kg/m, límite L/300. Halla h mínimo por flecha.`,a:h,u:'cm',s:[`I_{req} = ${n(Ireq)} cm⁴`,`h = ∛(12I/b) = ${n(h)} cm`]};}
]});
SUB('md2',{t:'Columnas de madera',
lec:`Las columnas de madera se clasifican por su esbeltez λ = l_{ef}/d, con d la menor dimensión:

- **Cortas** (λ ≤ 10): N_{adm} = f_{c}·A
- **Intermedias** (10 < λ ≤ C_{k}): N_{adm} = f_{c}A[1 − (1/3)(λ/C_{k})⁴]
- **Largas** (C_{k} < λ ≤ 50): N_{adm} = 0.329·E·A/λ²

con C_{k} = 0.7025√(E/f_{c}), usando E_{mín}.

Valores de compresión paralela f_{c} (kg/cm²): A = 145, B = 110, C = 80. E_{mín}: A = 95 000, B = 75 000, C = 55 000.

La fórmula de columnas largas es Euler con un factor de seguridad incluido.`,
key:['λ = [[l_{ef}|d]]','C_{k} = 0.7025√{[[E|f_{c}]]}','N = f_{c}A[1 − [[1|3]]([[λ|C_{k}]])^{4}]','N = [[0.329EA|λ^{2}]]'],
err:'Usar la dimensión mayor de la sección para λ.',
x:[['pan','Euler con factor de seguridad'],['com','Misma lógica que el acero'],['md1','Mismos grupos de madera']],
g:[
r=>{const l=r.i(1.5,4,.1),d=r.i(6.5,19,.5);return{q:`Columna de l_{ef}=${l} m y menor dimensión ${d} cm. Halla λ.`,a:l*100/d,u:'',s:[`λ = ${l*100}/${d} = ${n(l*100/d)}`]};},
r=>{const E=r.i(50000,100000,1000),f=r.i(70,150,5);return{q:`Una especie tiene E_{mín}=${E} y f_{c}=${f} kg/cm². Halla C_{k}.`,a:.7025*sq(E/f),u:'',s:[`C_{k} = 0.7025√(${E}/${f}) = ${n(.7025*sq(E/f))}`]};},
r=>{const g=r.p([['A',145],['B',110],['C',80]]),b=r.i(6,15,1),h=r.i(10,20,1);return{q:`Columna corta grupo ${g[0]} (f_{c}=${g[1]}), sección ${b}×${h} cm. Halla N_{adm}.`,a:g[1]*b*h,u:'kg',s:[`N = f_{c}A = ${g[1]*b*h} kg`]};},
r=>{const g=r.p([['A',95000,145],['B',75000,110],['C',55000,80]]),d=r.i(9,14,1);const Ck=.7025*sq(g[1]/g[2]);const lam=r.i(11,Math.floor(Ck),1),l=lam*d/100;const N=g[2]*d*d*(1-(1/3)*(lam/Ck)**4);return{q:`Columna ${d}×${d} cm grupo ${g[0]} (E_{mín}=${g[1]}, f_{c}=${g[2]}), l_{ef}=${n(l)} m. Halla N_{adm}.`,a:N,u:'kg',s:[`λ = ${lam}, C_{k} = ${n(Ck)}: intermedia`,`N = f_{c}A[1 − ⅓(λ/C_{k})⁴] = ${n(N)} kg`]};},
r=>{const g=r.p([['A',95000,145],['B',75000,110],['C',55000,80]]),d=r.i(6.5,10,.5);const Ck=.7025*sq(g[1]/g[2]);const lam=r.i(Math.ceil(Ck)+1,50,1),l=lam*d/100;const N=.329*g[1]*d*d/lam**2;return{q:`Columna ${d}×${d} cm grupo ${g[0]} (E_{mín}=${g[1]}, f_{c}=${g[2]}), l_{ef}=${n(l)} m. Halla N_{adm}.`,a:N,u:'kg',s:[`λ = ${lam} > C_{k} = ${n(Ck)}: larga`,`N = 0.329EA/λ² = ${n(N)} kg`]};}
]});

MOD('m28','Patología, reparación y refuerzo','Estructuras',
'Muchos edificios peruanos están en zonas costeras salinas o tienen décadas de uso. Saber diagnosticar y reforzar es tan importante como diseñar desde cero.',
['Calavera, Patología de estructuras de hormigón armado y pretensado','Del Río Bueno, Patología, reparación y refuerzo de estructuras de hormigón armado de edificación','Helene, Manual para reparación, refuerzo y protección de las estructuras de concreto','Red DURAR, Manual de inspección, evaluación y diagnóstico de corrosión','ACI 440.2R, Diseño de refuerzo con FRP'],
'UNI y PUCP: Patología y rehabilitación de estructuras (electivos y diplomados).');
SUB('pt1',{t:'Carbonatación y corrosión',
lec:`El concreto protege al acero porque es muy alcalino (pH ≈ 13). El CO₂ del aire entra poco a poco y baja ese pH: es la **carbonatación**. Cuando llega al acero, este empieza a oxidarse.

## Velocidad de carbonatación
x = K·√t (x en mm, t en años). K depende de la calidad del concreto: 2 a 3 en concretos buenos, más de 6 en concretos pobres.

## Corrosión
Con la densidad de corriente i_{corr} (μA/cm²) se estima la pérdida de diámetro: P ≈ 0.0116·i_{corr}·t mm por cara al año.

## Cloruros
En la costa, los cloruros atacan aunque no haya carbonatación. Por eso la E.060 exige más recubrimiento y menor a/c en ambientes marinos.

La fenolftaleína pinta de rosado el concreto sano y no colorea el carbonatado.`,
key:['x = K√{t}','t = ([[c|K]])^{2}','P = 0.0116·i_{corr}·t','A_{residual} = [[π(d−2P)^{2}|4]]'],
err:'Reparar solo la superficie sin retirar el concreto contaminado detrás del acero.',
x:[['edo','La difusión sigue una raíz del tiempo'],['mez','Una menor a/c reduce K'],['ref','La sección de acero se reduce']],
g:[
r=>{const K=r.i(1.5,8,.5),t=r.i(5,60,5);return{q:`K=${K} mm/√año. ¿Qué profundidad carbonata en ${t} años?`,a:K*sq(t),u:'mm',s:[`x = ${K}√${t} = ${n(K*sq(t))} mm`]};},
r=>{const K=r.i(1.5,8,.5),c=r.p([20,25,30,40,50]);return{q:`Recubrimiento ${c} mm y K=${K}. ¿En cuántos años llega el frente al acero?`,a:(c/K)**2,u:'años',s:[`t = (c/K)² = ${n((c/K)**2)} años`]};},
r=>{const x=r.i(5,40,1),t=r.i(5,50,1);return{q:`Se midió ${x} mm de carbonatación a los ${t} años. Halla K.`,a:x/sq(t),u:'mm/√año',s:[`K = x/√t = ${n(x/sq(t))}`]};},
r=>{const i=r.i(.1,3,.1),t=r.i(5,30,1);return{q:`i_{corr}=${i} μA/cm² durante ${t} años. Halla la pérdida de radio.`,a:.0116*i*t,u:'mm',s:[`P = 0.0116·${i}·${t} = ${n(.0116*i*t)} mm`]};},
r=>{const d=r.p([12,16,19,22,25]),i=r.i(.5,3,.1),t=r.i(5,25,1);const P=.0116*i*t,A0=PI*d*d/4,A=PI*(d-2*P)**2/4;return{q:`Varilla de ${d} mm con i_{corr}=${i} μA/cm² durante ${t} años (corrosión uniforme). ¿Qué % de área se perdió?`,a:(1-A/A0)*100,u:'%',s:[`P = ${n(P)} mm`,`Diámetro residual = ${n(d-2*P)} mm`,`Pérdida = ${n((1-A/A0)*100)} %`]};}
]});
SUB('pt2',{t:'Refuerzo de elementos',
lec:`Cuando un elemento no alcanza la resistencia requerida (por daño, error de diseño o cambio de uso), se refuerza:

- **Encamisado de concreto:** se agrega una capa de concreto armado alrededor de la columna. Aumenta área, rigidez y confinamiento.
- **Platinas o perfiles de acero** pegados o anclados.
- **Fibras de carbono (FRP):** láminas muy livianas pegadas con epóxico. Aumentan flexión, corte y confinamiento.

## Flexión con FRP (simplificado, ACI 440)
ΔM_{n} ≈ ψ_{f}·A_{f}·f_{fe}·(h − a/2), con ψ_{f} = 0.85, A_{f} el área de fibra y f_{fe} su esfuerzo efectivo (muy por debajo de su resistencia, por el riesgo de despegue).

**Antes de reforzar:** diagnostica la causa. Reforzar sin quitar la causa (humedad, cloruros, sobrecarga) solo repite el problema.`,
key:['ΔφM_{n} = φψ_{f}A_{f}f_{fe}(h − a/2)','A_{f} = n·t_{f}·b_{f}','P_{encamisado} = 0.85f\'_{c}A_{nueva} + f_{y}A_{s,nuevo}'],
err:'Pegar FRP sobre concreto contaminado o fisurado sin reparar. Se despega.',
x:[['fle','Mismo equilibrio de flexión'],['col','El encamisado aumenta la capacidad axial'],['pt1','Primero se trata la corrosión']],
g:[
r=>{const nn=r.i(1,3),t=r.p([.13,.165,.33]),b=r.i(10,40,5);return{q:`${nn} capa(s) de FRP de ${t} mm de espesor y ${b} cm de ancho. Halla A_{f}.`,a:nn*t/10*b,u:'cm²',s:[`A_{f} = ${nn}·${t/10}·${b} = ${n(nn*t/10*b)} cm²`]};},
r=>{const Af=r.i(.5,4,.1),f=r.i(4000,9000,250),h=r.i(40,80,5),a=r.i(3,10,1);return{q:`A_{f}=${Af} cm², f_{fe}=${f} kg/cm², h=${h} cm, a=${a} cm. Halla ΔM_{n} con ψ_{f}=0.85.`,a:.85*Af*f*(h-a/2)/1e5,u:'t·m',s:[`ΔM_{n} = 0.85·${Af}·${f}·(${h}−${a/2}) = ${n(.85*Af*f*(h-a/2)/1e5)} t·m`]};},
r=>{const b=r.i(25,40,5),h=r.i(25,40,5),e=r.p([7.5,10,12.5]),fc=r.p([210,280]);const An=(b+2*e)*(h+2*e)-b*h;return{q:`Columna ${b}×${h} cm se encamisa con ${e} cm de concreto por lado. Halla el área agregada.`,a:An,u:'cm²',s:[`Nueva sección ${b+2*e}×${h+2*e}`,`ΔA = ${n(An)} cm²`]};},
r=>{const b=r.i(25,40,5),h=r.i(25,40,5),e=r.p([7.5,10]),fc=r.p([210,280]),As=r.p([8,10,12,16]);const An=(b+2*e)*(h+2*e)-b*h,P=.8*.7*(.85*fc*(An-As)+FY*As)/1000;return{q:`Encamisado de ${e} cm por lado en columna ${b}×${h}, con ${As} cm² de acero nuevo y f'_{c}=${fc}. Halla el aporte φP_{n,máx} (0.80·0.70) del encamisado.`,a:P,u:'t',s:[`ΔA = ${n(An)} cm²`,`φP = 0.56[0.85f'_{c}(ΔA−A_{s}) + f_{y}A_{s}] = ${n(P)} t`]};},
r=>{const Mn0=r.i(10,30,1),Mu=Math.round(.9*Mn0*r.i(1.15,1.4,.05)),f=r.i(5000,8000,250),h=r.i(50,70,5),a=r.i(4,8,1),t=.165,bf=r.i(20,30,5);const need=(Mu/.9-Mn0)*1e5/(.85*f*(h-a/2));const capas=Math.ceil(need/(t/10*bf));return{q:`Una viga con M_{n}=${Mn0} t·m debe resistir M_{u}=${Mu} t·m. Con FRP de 0.165 mm y ${bf} cm de ancho, f_{fe}=${f}, h=${h}, a=${a} cm, ¿cuántas capas? (φ=0.9, ψ_{f}=0.85)`,a:Math.max(capas,0),u:'capas',tol:0,s:[`Falta M_{n} = ${n(Mu/.9-Mn0)} t·m`,`A_{f} requerido = ${n(need)} cm²`,`Una capa = ${n(t/10*bf)} cm² → ${Math.max(capas,0)} capas`]};}
]});
