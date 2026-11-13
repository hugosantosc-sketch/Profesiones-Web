/* Vías II, topografía II, construcción, contratación y arquitectura */
MOD('m35','Vías y pavimentos II','Vías',
'Del trazo básico al diseño completo: curvas de transición, peraltes, pavimentos de concreto, mezclas asfálticas y evaluación de vías existentes.',
['Cárdenas Grisales, Diseño geométrico de carreteras','Bañón y Beviá, Manual de carreteras (partes 1 y 2)','MTC, Manual de Carreteras: Diseño Geométrico DG-2018','Tapia García, Pavimentos','Corros, Urbáez y Corredor, Manual de evaluación de pavimentos','Huang, Pavement Analysis and Design','Caicedo, Geotechnics of Roads: Fundamentals'],
'UNI: Diseño Vial, Pavimentos (TV-761, TV-861). PUCP: Ingeniería de Pavimentos (electivo).');
SUB('esp2',{t:'Curvas de transición',
lec:`Al entrar de una recta a una curva circular, la fuerza centrífuga aparecería de golpe. La **espiral de transición** (clotoide) hace que la curvatura crezca poco a poco, como cuando giras el timón despacio.

## Clotoide
Cumple R·L = A², donde A es el **parámetro** de la espiral.

## Longitud mínima por comodidad (Barnett)
L_{e} = V³/(46.656·R·C), con V en km/h, R en m y C la variación de aceleración centrífuga (≈ 0.3 a 0.9 m/s³).

## Elementos
- Ángulo de la espiral: θ_{e} = L_{e}/(2R) rad
- Retranqueo (desplazamiento de la curva): p ≈ L_{e}²/(24R)

La DG-2018 añade criterios por peralte y estética; aquí se usa el criterio de comodidad.`,
key:['A^{2} = R·L_{e}','L_{e} = [[V^{3}|46.656·R·C]]','θ_{e} = [[L_{e}|2R]] rad','p ≈ [[L_{e}^{2}|24R]]'],
err:'Usar la clotoide solo para estética: también da tiempo para girar el peralte.',
x:[['hor','Une rectas y curvas circulares'],['new','La aceleración centrífuga es v²/R'],['prl','El peralte se gira en la transición']],
g:[
r=>{const R=r.i(60,800,10),L=r.i(30,150,5);return{q:`R=${R} m y L_{e}=${L} m. Halla el parámetro A.`,a:sq(R*L),u:'m',s:[`A = √(${R}·${L}) = ${n(sq(R*L))} m`]};},
r=>{const V=r.i(40,120,10),R=r.i(100,800,10),C=r.p([.3,.4,.5,.6]);return{q:`V=${V} km/h, R=${R} m, C=${C} m/s³. Halla L_{e} (Barnett).`,a:V**3/(46.656*R*C),u:'m',s:[`L_{e} = ${V}³/(46.656·${R}·${C}) = ${n(V**3/(46.656*R*C))} m`]};},
r=>{const L=r.i(30,150,5),R=r.i(80,800,10);return{q:`L_{e}=${L} m, R=${R} m. Halla θ_{e} en grados.`,a:L/(2*R)*180/PI,u:'°',s:[`θ_{e} = ${L}/(2·${R}) = ${n(L/(2*R))} rad = ${n(L/(2*R)*180/PI)}°`]};},
r=>{const L=r.i(30,150,5),R=r.i(80,800,10);return{q:`L_{e}=${L} m, R=${R} m. Halla el retranqueo p.`,a:L*L/(24*R),u:'m',s:[`p = ${L}²/(24·${R}) = ${n(L*L/(24*R))} m`]};},
r=>{const V=r.i(50,100,10),C=r.p([.4,.5,.6]),D=r.i(20,70,5);const R=Math.ceil(V*V/(127*.25)/10)*10+r.i(0,200,10);const L=V**3/(46.656*R*C),th=L/(2*R)*180/PI;return{q:`Curva con V=${V} km/h, R=${R} m, deflexión total Δ=${D}°. Con espirales de Barnett (C=${C}), ¿cuántos grados quedan para el arco circular? (Δ − 2θ_{e})`,a:D-2*th,u:'°',s:[`L_{e} = ${n(L)} m`,`θ_{e} = ${n(th)}°`,`Δ_{c} = ${D} − 2·${n(th)} = ${n(D-2*th)}°`]};}
]});
SUB('prl',{t:'Peralte y sobreancho',
lec:`## Transición del peralte
El borde exterior de la calzada debe subir gradualmente hasta alcanzar el peralte e. La longitud de esa rampa depende de la pendiente relativa máxima de borde i_{r} (entre 0.4 % y 0.9 % según la velocidad):

L = e·a/i_{r}, con a la distancia del eje de giro al borde.

## Sobreancho en curvas
Las ruedas traseras de un camión siguen una trayectoria más cerrada que las delanteras. Por eso la calzada se ensancha:

S = n[R − √(R² − L²)] + V/(10√R)

con n el número de carriles, L la distancia entre el eje delantero y el trasero del vehículo de diseño, R el radio y V la velocidad en km/h.`,
key:['L = [[e·a|i_{r}]]','S = n(R − √{R^{2} − L^{2}}) + [[V|10√{R}]]','e = [[V^{2}|127R]] − f'],
err:'Olvidar el sobreancho en curvas cerradas de sierra: los camiones invaden el carril contrario.',
x:[['hor','El peralte viene del radio'],['esp2','Se gira dentro de la espiral'],['tri','Geometría del vehículo']],
g:[
r=>{const e=r.i(2,10,.5),a=r.i(3,7.2,.1),ir=r.p([.4,.5,.6,.7,.8]);return{q:`Peralte ${e} %, distancia del eje al borde ${a} m, i_{r}=${ir} %. Halla la longitud de transición.`,a:e*a/ir,u:'m',s:[`L = ${e/100}·${a}/${ir/100} = ${n(e*a/ir)} m`]};},
r=>{const R=r.i(25,300,5),L=r.p([6.1,7.6,9.1,12.2]);return{q:`Un carril, R=${R} m, distancia entre ejes L=${L} m. Halla el término geométrico R − √(R² − L²).`,a:R-sq(R*R-L*L),u:'m',s:[`= ${R} − √(${R*R} − ${n(L*L)}) = ${n(R-sq(R*R-L*L))} m`]};},
r=>{const nn=r.p([1,2]),R=r.i(25,250,5),L=r.p([6.1,7.6,9.1]),V=r.i(30,80,10);return{q:`n=${nn}, R=${R} m, L=${L} m, V=${V} km/h. Halla el sobreancho.`,a:nn*(R-sq(R*R-L*L))+V/(10*sq(R)),u:'m',s:[`Geométrico: ${n(nn*(R-sq(R*R-L*L)))} m`,`Dinámico: ${n(V/(10*sq(R)))} m`,`S = ${n(nn*(R-sq(R*R-L*L))+V/(10*sq(R)))} m`]};},
r=>{const e=r.i(4,10,.5),a=r.i(3,3.6,.1),ir=r.p([.5,.6,.7]),bomb=2;const L=(e+bomb)*a/ir;return{q:`Calzada con bombeo 2 % que pasa a peralte ${e} %; distancia del eje al borde ${a} m, i_{r}=${ir} %. Si el borde exterior sube desde −2 % hasta +${e} %, halla la longitud total.`,a:L,u:'m',s:[`Δe = ${e}+2 = ${e+2} %`,`L = ${n((e+2)/100)}·${a}/${ir/100} = ${n(L)} m`]};},
r=>{const V=r.i(30,60,10),R=r.i(30,120,5),f=r.p([.15,.17]),emax=r.p([.08,.1,.12]),nn=2,L=r.p([7.6,9.1]);const e=Math.min(Math.max(V*V/(127*R)-f,.02),emax),S=nn*(R-sq(R*R-L*L))+V/(10*sq(R));return{q:`Curva de sierra: V=${V} km/h, R=${R} m, f=${f}, peralte máximo ${emax*100} %, 2 carriles, vehículo con L=${L} m. Halla el peralte (mínimo 2 %) y el sobreancho; escribe el sobreancho.`,a:S,u:'m',s:[`e = máx(V²/(127R) − f, 2 %) = ${n(e*100)} % (tope ${emax*100} %)`,`S = ${n(S)} m`]};}
]});
SUB('pr2',{t:'Pavimentos rígidos',
lec:`Un pavimento de concreto reparte la carga en un área tan grande que la subrasante casi no sufre. Lo que se revisa es el **esfuerzo de tensión por flexión** en la losa.

## Radio de rigidez relativa
ℓ = [E·h³/(12(1 − μ²)·k)]^{1/4}

E: módulo del concreto, h: espesor, μ ≈ 0.15, k: módulo de reacción de la subrasante.

## Westergaard, carga en el interior de la losa
σ_{i} = [3(1 + μ)P/(2πh²)]·[ln(ℓ/b) + 0.6159]

donde b = a si a ≥ 1.724h, o b = √(1.6a² + h²) − 0.675h si a < 1.724h, con a el radio del área cargada.

El esfuerzo se compara con el **módulo de rotura** MR del concreto (unos 40 a 50 kg/cm²). Las cargas en el borde y en la esquina dan esfuerzos mayores; por eso existen juntas con pasadores.`,
key:['ℓ = ([[Eh^{3}|12(1−μ^{2})k]])^{1/4}','σ_{i} = [[3(1+μ)P|2πh^{2}]](ln[[ℓ|b]] + 0.6159)','b = √{1.6a^{2}+h^{2}} − 0.675h'],
err:'Revisar solo el centro de la losa: la esquina sin pasadores es el punto crítico.',
x:[['pav','Alternativa al pavimento flexible'],['cz4','k es el mismo coeficiente de balasto'],['flx','Esfuerzo de flexión']],
g:[
r=>{const E=r.p([250000,280000,300000]),h=r.i(15,30,1),k=r.i(2,15,.5);const l=(E*h**3/(12*(1-.0225)*k))**.25;return{q:`E=${E} kg/cm², h=${h} cm, μ=0.15, k=${k} kg/cm³. Halla ℓ.`,a:l,u:'cm',s:[`ℓ = (${E}·${h}³/(12·0.9775·${k}))^{1/4} = ${n(l)} cm`]};},
r=>{const a=r.i(8,20,1),h=r.i(15,30,1);const b=a>=1.724*h?a:sq(1.6*a*a+h*h)-.675*h;return{q:`Radio de carga a=${a} cm, losa h=${h} cm. Halla b.`,a:b,u:'cm',s:[a>=1.724*h?`a ≥ 1.724h: b = a`:`b = √(1.6·${a}² + ${h}²) − 0.675·${h} = ${n(b)} cm`]};},
r=>{const P=r.i(4000,10000,250),h=r.i(15,30,1);return{q:`P=${P} kg, h=${h} cm, μ=0.15. Halla el factor 3(1+μ)P/(2πh²).`,a:3*1.15*P/(2*PI*h*h),u:'kg/cm²',s:[`= 3·1.15·${P}/(2π·${h}²) = ${n(3*1.15*P/(2*PI*h*h))} kg/cm²`]};},
r=>{const P=r.i(4000,10000,250),h=r.i(16,30,1),a=r.i(10,18,1),E=280000,k=r.i(3,10,.5);const l=(E*h**3/(12*.9775*k))**.25,b=a>=1.724*h?a:sq(1.6*a*a+h*h)-.675*h,s=3*1.15*P/(2*PI*h*h)*(Math.log(l/b)+.6159);return{q:`Westergaard interior: P=${P} kg, a=${a} cm, h=${h} cm, E=280 000, k=${k} kg/cm³. Halla σ_{i}.`,a:s,u:'kg/cm²',s:[`ℓ = ${n(l)} cm, b = ${n(b)} cm`,`σ = ${n(3*1.15*P/(2*PI*h*h))}·(ln(${n(l/b)}) + 0.6159) = ${n(s)} kg/cm²`]};},
r=>{const P=r.i(5000,9000,250),a=r.i(12,16,1),E=280000,k=r.i(4,8,.5),MR=r.p([40,45,50]),FS=r.p([1.5,2]);let h=12;for(;h<45;h+=.5){const l=(E*h**3/(12*.9775*k))**.25,b=a>=1.724*h?a:sq(1.6*a*a+h*h)-.675*h,s=3*1.15*P/(2*PI*h*h)*(Math.log(l/b)+.6159);if(s<=MR/FS)break;}return{q:`Halla el espesor mínimo (múltiplo de 0.5 cm) para que σ_{i} ≤ MR/FS: P=${P} kg, a=${a} cm, k=${k} kg/cm³, E=280 000, MR=${MR}, FS=${FS}.`,a:h,u:'cm',tol:.02,s:[`Esfuerzo admisible = ${n(MR/FS)} kg/cm²`,`Prueba espesores crecientes con Westergaard`,`h = ${h} cm`]};}
]});
SUB('mzc',{t:'Mezclas asfálticas',
lec:`Una mezcla asfáltica en caliente es agregado, asfalto y aire. Su calidad se juzga con relaciones de volumen:

- **G_{mb}:** gravedad específica de la mezcla compactada
- **G_{mm}:** gravedad específica máxima, sin vacíos (ensayo Rice)
- **G_{sb}:** gravedad específica del agregado
- **P_{s}:** porcentaje de agregado en peso

## Parámetros volumétricos
- Vacíos de aire: V_{a} = 100(G_{mm} − G_{mb})/G_{mm}. Objetivo típico: 4 %
- Vacíos en el agregado mineral: VMA = 100 − G_{mb}·P_{s}/G_{sb}
- Vacíos llenos de asfalto: VFA = 100(VMA − V_{a})/VMA

Con pocos vacíos, la mezcla exuda y se deforma; con muchos, se oxida y se agrieta.`,
key:['V_{a} = 100[[G_{mm} − G_{mb}|G_{mm}]]','VMA = 100 − [[G_{mb}P_{s}|G_{sb}]]','VFA = 100[[VMA − V_{a}|VMA]]'],
err:'Usar la gravedad específica aparente del agregado en VMA: se usa la bulk (G_{sb}).',
x:[['fas','Es el mismo análisis de fases que en suelos'],['agr','Granulometría del agregado'],['pav','La carpeta aporta al SN']],
g:[
r=>{const mm=r.i(2.4,2.6,.005),mb=+(mm*r.i(.93,.98,.002)).toFixed(3);return{q:`G_{mm}=${mm}, G_{mb}=${mb}. Halla V_{a}.`,a:100*(mm-mb)/mm,u:'%',s:[`V_{a} = 100(${mm}−${mb})/${mm} = ${n(100*(mm-mb)/mm)} %`]};},
r=>{const mb=r.i(2.25,2.45,.005),Ps=r.i(93,96,.1),sb=r.i(2.55,2.75,.005);return{q:`G_{mb}=${mb}, P_{s}=${Ps} %, G_{sb}=${sb}. Halla VMA.`,a:100-mb*Ps/sb,u:'%',s:[`VMA = 100 − ${mb}·${Ps}/${sb} = ${n(100-mb*Ps/sb)} %`]};},
r=>{const VMA=r.i(13,18,.1),Va=r.i(2.5,6,.1);return{q:`VMA=${VMA} %, V_{a}=${Va} %. Halla VFA.`,a:100*(VMA-Va)/VMA,u:'%',s:[`VFA = 100(${VMA}−${Va})/${VMA} = ${n(100*(VMA-Va)/VMA)} %`]};},
r=>{const Pb=r.i(4,7,.1);return{q:`Contenido de asfalto P_{b}=${Pb} %. Halla P_{s}.`,a:100-Pb,u:'%',s:[`P_{s} = 100 − ${Pb} = ${n(100-Pb)} %`]};},
r=>{const mm=r.i(2.45,2.55,.005),mb=+(mm*r.i(.94,.97,.002)).toFixed(3),Pb=r.i(4.5,6.5,.1),sb=r.i(2.6,2.72,.005);const Va=100*(mm-mb)/mm,VMA=100-mb*(100-Pb)/sb,VFA=100*(VMA-Va)/VMA;return{q:`Briqueta con G_{mm}=${mm}, G_{mb}=${mb}, P_{b}=${Pb} %, G_{sb}=${sb}. Halla VFA.`,a:VFA,u:'%',s:[`V_{a} = ${n(Va)} %`,`VMA = ${n(VMA)} %`,`VFA = ${n(VFA)} %`]};}
]});
SUB('pci',{t:'Evaluación de pavimentos',
lec:`Antes de rehabilitar una vía hay que medir su estado. El método más usado es el **PCI** (Pavement Condition Index, ASTM D6433): una inspección visual de fallas que da un valor de 0 a 100.

## Escala
85–100 excelente, 70–85 muy bueno, 55–70 bueno, 40–55 regular, 25–40 malo, 10–25 muy malo, 0–10 fallado.

## Cálculo
PCI = 100 − CDV, donde CDV es el valor deducido corregido, que suma las fallas según su tipo, severidad y densidad.

## Número de unidades de muestreo
n = N·s²/[(e²/4)(N − 1) + s²], con N el número total de unidades, s la desviación estándar del PCI (≈ 10 en asfalto) y e el error admisible (≈ 5).

Las mediciones de **deflexión** (viga Benkelman o FWD) complementan la inspección y muestran la capacidad estructural.`,
key:['PCI = 100 − CDV','n = [[N·s^{2}|(e^{2}/4)(N−1) + s^{2}]]','Densidad = [[área de falla|área de muestra]]×100'],
err:'Evaluar todo el tramo por la peor cuadra: hay que muestrear de forma representativa.',
x:[['est','Usa muestreo estadístico'],['pav','Decide si se refuerza o se reconstruye'],['evm','Es control del estado de un activo']],
g:[
r=>{const c=r.i(5,95,1);return{q:`CDV=${c}. Halla el PCI.`,a:100-c,u:'',s:[`PCI = ${100-c}`]};},
r=>{const A=r.i(1,60,.5),M=r.p([225,230,240,250]);return{q:`Una falla ocupa ${A} m² en una unidad de ${M} m². Halla su densidad.`,a:A/M*100,u:'%',s:[`= ${n(A/M*100)} %`]};},
r=>{const N=r.i(10,200);const nn=N*100/((25/4)*(N-1)+100);return{q:`Un tramo tiene N=${N} unidades de muestreo (s=10, e=5). Halla n sin redondear.`,a:nn,u:'',s:[`n = ${N}·100/[(25/4)(${N}−1) + 100] = ${n(nn)}`]};},
r=>{const N=r.i(10,200);const nn=Math.ceil(N*100/((25/4)*(N-1)+100));const i=Math.floor(N/nn);return{q:`N=${N} unidades (s=10, e=5). Redondea n hacia arriba y halla el intervalo de muestreo i = N/n (parte entera).`,a:i,u:'',tol:0,s:[`n = ${nn}`,`i = ${N}/${nn} → ${i}`]};},
r=>{const v=Array.from({length:6},()=>r.i(20,95,1));const m=v.reduce((a,b)=>a+b)/6;const c=m>85?'excelente':m>70?'muy bueno':m>55?'bueno':m>40?'regular':m>25?'malo':m>10?'muy malo':'fallado';return{q:`PCI de las unidades muestreadas: ${v.join(', ')}. Halla el PCI promedio del tramo.`,a:m,u:'',s:[`Promedio = ${n(m)} → ${c}`]};}
]});

MOD('m36','Topografía II','Mecánica',
'Mediciones precisas, nivelación trigonométrica, curvas de nivel, replanteo en campo y coordenadas UTM. Es lo que lleva un plano al terreno con exactitud.',
['Wolf y Ghilani, Elementary Surveying','Navarro, Manual de topografía: planimetría','Machado, Topografía básica','Mendoza Dueñas, Topografía: técnicas modernas','McCormac, Topografía'],
'UNI: Topografía II (TV-114) y Geodesia Satelital. PUCP: Topografía (curso de la carrera).');
SUB('cin',{t:'Correcciones de medición con cinta',
lec:`Una cinta de acero no mide igual con calor, con poca tensión o colgando. Cada efecto tiene una corrección:

- **Temperatura:** C_{t} = α(T − T_{0})L, con α = 1.16×10⁻⁵ /°C y T_{0} = 20 °C
- **Tensión:** C_{p} = (P − P_{0})L/(AE)
- **Catenaria** (cinta colgando): C_{s} = −w²L³/(24P²), siempre negativa
- **Pendiente:** para pasar a horizontal, C_{h} ≈ −h²/(2L)

La distancia corregida es L + ΣC. Hoy se mide casi todo con estación total, pero el razonamiento de errores sistemáticos es el mismo.`,
key:['C_{t} = α(T − T_{0})L','C_{p} = [[(P − P_{0})L|AE]]','C_{s} = −[[w^{2}L^{3}|24P^{2}]]','C_{h} = −[[h^{2}|2L]]'],
err:'Sumar la corrección de catenaria con signo positivo: la cinta colgando siempre mide de más.',
x:[['axi','Alargamiento elástico'],['par','La catenaria es un cable colgante'],['tri','La pendiente es trigonometría']],
g:[
r=>{const L=r.i(20,50,1),T=r.i(0,45,1);return{q:`Cinta de ${L} m a ${T} °C (calibrada a 20 °C). Halla C_{t}.`,a:1.16e-5*(T-20)*L*1000,u:'mm',s:[`C_{t} = 1.16×10⁻⁵·(${T}−20)·${L} = ${n(1.16e-5*(T-20)*L*1000)} mm`]};},
r=>{const L=r.i(20,50,1),P=r.i(5,15,.5),P0=r.p([5,10]),A=r.p([.02,.03,.04]);return{q:`L=${L} m, P=${P} kgf, P₀=${P0} kgf, A=${A} cm², E=2.1×10⁶ kg/cm². Halla C_{p}.`,a:(P-P0)*L/(A*2.1e6)*1000,u:'mm',s:[`C_{p} = (${P}−${P0})·${L}/(${A}·2.1×10⁶) = ${n((P-P0)*L/(A*2.1e6)*1000)} mm`]};},
r=>{const w=r.p([.015,.02,.025,.03]),L=r.i(20,50,1),P=r.i(5,15,.5);return{q:`Cinta de w=${w} kg/m, tramo colgado L=${L} m, tensión P=${P} kgf. Halla C_{s}.`,a:-(w*w*L**3/(24*P*P))*1000,u:'mm',s:[`C_{s} = −${w}²·${L}³/(24·${P}²) = ${n(-(w*w*L**3/(24*P*P))*1000)} mm`]};},
r=>{const L=r.i(20,50,.01),h=r.i(.2,3,.05);return{q:`Distancia inclinada ${L} m con desnivel ${h} m. Halla C_{h}.`,a:-h*h/(2*L)*1000,u:'mm',s:[`C_{h} = −${h}²/(2·${L}) = ${n(-h*h/(2*L)*1000)} mm`]};},
r=>{const L=r.i(25,50,1),T=r.i(5,40,1),P=r.i(5,12,.5),w=.02,h=r.i(.2,2,.1);const Ct=1.16e-5*(T-20)*L,Cp=(P-5)*L/(.03*2.1e6),Cs=-(w*w*L**3/(24*P*P)),Ch=-h*h/(2*L);const D=L+Ct+Cp+Cs+Ch;return{q:`Medida ${L} m a ${T} °C, tensión ${P} kgf (P₀=5, A=0.03 cm², w=0.02 kg/m, colgada), desnivel ${h} m. Halla la distancia horizontal corregida.`,a:D,u:'m',tol:.00001,s:[`C_{t} = ${n(Ct*1000)} mm; C_{p} = ${n(Cp*1000)} mm`,`C_{s} = ${n(Cs*1000)} mm; C_{h} = ${n(Ch*1000)} mm`,`D = ${n(D,7)} m`]};}
]});
SUB('tq',{t:'Taquimetría y nivelación trigonométrica',
lec:`Con un ángulo vertical y una distancia puedes obtener la distancia horizontal y el desnivel al mismo tiempo.

## Con estación total (distancia inclinada S y ángulo vertical α sobre la horizontal)
- D_{H} = S·cos α
- ΔV = S·sen α
- Cota B = Cota A + h_{i} + ΔV − h_{p} (h_{i}: altura del instrumento; h_{p}: altura del prisma)

## Con estadía (taquímetro clásico)
Con la lectura de hilos s y K = 100:
- D_{H} = K·s·cos²α
- ΔV = ½·K·s·sen 2α

En distancias largas (más de 300 m) se corrige por curvatura y refracción: c = 0.0675·D² (D en km, c en m).`,
key:['D_{H} = S cos α','ΔV = S sen α','D_{H} = Ks cos^{2}α','Cota_{B} = Cota_{A} + h_{i} + ΔV − h_{p}','c = 0.0675D^{2}'],
err:'Olvidar restar la altura del prisma u olvidar sumar la del instrumento.',
x:[['tri','Seno y coseno'],['niv','Alternativa a la nivelación geométrica'],['pol','Da coordenadas y cotas a la vez']],
g:[
r=>{const S=r.i(20,800,5),a=r.i(1,25,.5);return{q:`Distancia inclinada ${S} m y ángulo vertical ${a}°. Halla D_{H}.`,a:S*cosd(a),u:'m',s:[`D_{H} = ${S}·cos ${a}° = ${n(S*cosd(a),6)} m`]};},
r=>{const s=r.i(.2,3,.01),a=r.i(1,20,.5);return{q:`Estadía: s=${s} m, K=100, α=${a}°. Halla D_{H}.`,a:100*s*cosd(a)**2,u:'m',s:[`D_{H} = 100·${s}·cos²${a}° = ${n(100*s*cosd(a)**2)} m`]};},
r=>{const s=r.i(.2,3,.01),a=r.i(1,20,.5);return{q:`Estadía: s=${s} m, K=100, α=${a}°. Halla ΔV.`,a:50*s*sind(2*a),u:'m',s:[`ΔV = ½·100·${s}·sen ${2*a}° = ${n(50*s*sind(2*a))} m`]};},
r=>{const cA=r.i(500,3800,.5),hi=r.i(1.4,1.7,.01),hp=r.i(1.3,2,.05),S=r.i(30,600,5),a=r.i(-15,15,.5);const cB=cA+hi+S*sind(a)-hp;return{q:`Cota A=${cA} m, h_{i}=${hi} m, prisma h_{p}=${hp} m, S=${S} m, α=${a}°. Halla la cota B.`,a:cB,u:'m',tol:.00002,s:[`ΔV = ${n(S*sind(a),5)} m`,`Cota B = ${cA} + ${hi} + ${n(S*sind(a),5)} − ${hp} = ${n(cB,7)} m`]};},
r=>{const cA=r.i(500,3800,.5),hi=r.i(1.4,1.7,.01),hp=r.i(1.3,2,.05),S=r.i(800,3000,50),a=r.i(-8,8,.5);const D=S*cosd(a)/1000,c=.0675*D*D,cB=cA+hi+S*sind(a)-hp+c;return{q:`Visual larga: cota A=${cA} m, h_{i}=${hi}, h_{p}=${hp}, S=${S} m, α=${a}°. Incluye curvatura y refracción (c = 0.0675D²) y halla la cota B.`,a:cB,u:'m',tol:.00002,s:[`D_{H} = ${n(D*1000)} m → c = ${n(c,4)} m`,`Cota B = ${n(cB,7)} m`]};}
]});
SUB('cn',{t:'Curvas de nivel',
lec:`Las curvas de nivel unen puntos de igual cota. La separación vertical entre curvas es la **equidistancia**.

- Curvas juntas: terreno empinado. Curvas separadas: terreno suave.
- Nunca se cruzan (salvo en un acantilado volado) y siempre se cierran, dentro o fuera del plano.

## Interpolación
Entre dos puntos de cota conocida, A y B, separados una distancia d, la curva de cota c pasa a:

x = d·(c − cota_{A})/(cota_{B} − cota_{A}) desde A.

## Pendiente
Pendiente = equidistancia/separación horizontal. Con ella se trazan las rutas de pendiente máxima de una vía.`,
key:['x = d[[c − z_{A}|z_{B} − z_{A}]]','i = [[equidistancia|distancia]]','d = [[equidistancia|i]] (abertura del compás)'],
err:'Interpolar entre puntos no vecinos, por encima de una quebrada o una cresta.',
x:[['niv','Las cotas vienen de nivelación'],['ver','Las pendientes definen el perfil'],['cue','Las divisorias de la cuenca se trazan con curvas']],
g:[
r=>{const za=r.i(100,3800,.1),dz=r.i(1,10,.1),d=r.i(10,100,1);const c=Math.ceil(za);return{q:`A tiene cota ${za} m y B ${n(za+dz,6)} m, a ${d} m. ¿A qué distancia de A pasa la curva ${c}?`,a:d*(c-za)/dz,u:'m',s:[`x = ${d}(${c}−${za})/${dz} = ${n(d*(c-za)/dz)} m`]};},
r=>{const e=r.p([.5,1,2,5]),dd=r.i(2,80,1);return{q:`Curvas cada ${e} m separadas ${dd} m en planta. Halla la pendiente.`,a:e/dd*100,u:'%',s:[`i = ${e}/${dd} = ${n(e/dd*100)} %`]};},
r=>{const e=r.p([1,2,5]),i=r.i(3,12,.5);return{q:`Para trazar una línea de gradiente de ${i} % con curvas cada ${e} m, ¿qué separación en planta hay que usar entre curvas?`,a:e/(i/100),u:'m',s:[`d = ${e}/${i/100} = ${n(e/(i/100))} m`]};},
r=>{const e=r.p([1,2,5]),dd=r.i(5,40,1),esc=r.p([500,1000,2000,5000]);return{q:`En un plano a escala 1:${esc}, dos curvas (equidistancia ${e} m) están a ${dd} mm. Halla la pendiente.`,a:e/(dd/1000*esc)*100,u:'%',s:[`Distancia real = ${dd} mm·${esc} = ${n(dd*esc/1000)} m`,`i = ${n(e/(dd/1000*esc)*100)} %`]};},
r=>{const za=r.i(200,300,.1),zb=r.i(301,320,.1),d=r.i(40,120,1),e=r.p([2,5]);const c1=Math.ceil(za/e)*e,c2=Math.floor(zb/e)*e;const nC=(c2-c1)/e+1;const x1=d*(c1-za)/(zb-za);return{q:`Entre A (cota ${za}) y B (cota ${zb}) a ${d} m, con equidistancia ${e} m: ¿cuántas curvas cruzan y a qué distancia de A está la primera? Escribe la distancia.`,a:x1,u:'m',s:[`Primera curva: ${c1}; última: ${c2} → ${nC} curvas`,`x = ${d}(${c1}−${za})/(${n(zb-za)}) = ${n(x1)} m`]};}
]});
SUB('rep',{t:'Replanteo de curvas',
lec:`Replantear es llevar el diseño al terreno. Para una curva circular desde el PC se usan **ángulos de deflexión**:

- Deflexión para una cuerda c: δ = c·90/(πR) grados (es la mitad del ángulo central)
- Deflexiones acumuladas: se suman cuerda a cuerda
- La deflexión al PT es Δ/2

## Cuerda y arco
Para un ángulo central φ: cuerda = 2R·sen(φ/2), arco = πRφ/180.

## Ordenadas desde la tangente
Para un punto a una distancia x medida sobre la tangente: y = R − √(R² − x²). Útil cuando no hay estación total.

Se usan cuerdas de 5, 10 o 20 m según el radio, y la primera y última son "subcuerdas" para llegar a progresivas redondas.`,
key:['δ = [[c·90|πR]]','cuerda = 2R sen[[φ|2]]','y = R − √{R^{2} − x^{2}}','δ_{PT} = [[Δ|2]]'],
err:'Medir las deflexiones desde el centro de la curva en vez de desde la tangente en el PC.',
x:[['hor','Usa los elementos de la curva'],['tri','Seno y cuerdas'],['pol','Se apoya en la poligonal']],
g:[
r=>{const c=r.p([5,10,20]),R=r.i(30,800,10);return{q:`Cuerda de ${c} m en una curva de R=${R} m. Halla la deflexión.`,a:c*90/(PI*R),u:'°',s:[`δ = ${c}·90/(π·${R}) = ${n(c*90/(PI*R))}°`]};},
r=>{const R=r.i(30,800,10),f=r.i(2,40,.5);return{q:`R=${R} m, ángulo central ${f}°. Halla la cuerda.`,a:2*R*sind(f/2),u:'m',s:[`cuerda = 2·${R}·sen ${f/2}° = ${n(2*R*sind(f/2))} m`]};},
r=>{const R=r.i(50,800,10),x=r.i(5,Math.min(60,R*.7),1);return{q:`R=${R} m. Halla la ordenada desde la tangente a x=${x} m.`,a:R-sq(R*R-x*x),u:'m',s:[`y = ${R} − √(${R*R} − ${x*x}) = ${n(R-sq(R*R-x*x))} m`]};},
r=>{const PC=r.i(1000,3000,.01),R=r.i(100,500,10),c=r.p([10,20]);const p1=Math.ceil(PC/c)*c,sub=p1-PC;return{q:`PC en progresiva ${n(PC,7)} m, R=${R} m, estacas cada ${c} m. Halla la deflexión hasta la primera estaca redonda.`,a:sub*90/(PI*R),u:'°',s:[`Subcuerda = ${n(p1,7)} − ${n(PC,7)} = ${n(sub)} m`,`δ = ${n(sub*90/(PI*R))}°`]};},
r=>{const PC=r.i(1000,3000,.01),R=r.i(100,500,10),c=10,D=r.i(20,60,1);const L=PI*R*D/180,p1=Math.ceil(PC/c)*c,sub=p1-PC,k=r.i(2,Math.max(2,Math.floor((L-sub)/c)),1),dist=sub+(k-1)*c;return{q:`PC en ${n(PC,7)} m, R=${R} m, Δ=${D}°, estacas cada 10 m. Halla la deflexión acumulada a la estaca número ${k} (contando la primera estaca redonda como 1).`,a:dist*90/(PI*R),u:'°',s:[`Subcuerda inicial = ${n(sub)} m`,`Arco hasta la estaca ${k} = ${n(dist)} m`,`δ = ${n(dist*90/(PI*R))}°`]};}
]});
SUB('utm',{t:'Coordenadas UTM y factor de escala',
lec:`Los planos oficiales en el Perú usan el sistema **WGS84 / UTM** (zonas 17, 18 y 19). Una distancia medida en el terreno no es igual a la distancia en la cuadrícula UTM por dos motivos:

- **Factor de elevación:** k_{e} = R/(R + h), con R ≈ 6 371 000 m y h la altura elipsoidal. En Cusco (3400 m) la diferencia es de unos 53 cm por km.
- **Factor de escala UTM:** k varía entre 0.9996 en el meridiano central y algo más de 1 en los bordes de la zona

Factor combinado: F = k·k_{e}. Distancia UTM = distancia terreno × F.

Si mezclas distancias de terreno con coordenadas UTM sin corregir, tus obras lineales largas no cerrarán.`,
key:['k_{e} = [[R|R + h]]','F = k·k_{e}','D_{UTM} = D_{terreno}·F','D_{terreno} = [[D_{UTM}|F]]'],
err:'Replantear distancias UTM directamente en obras a gran altura sin dividir entre el factor combinado.',
x:[['pol','Coordenadas y distancias'],['are','El área también cambia con F²'],['hor','Las vías largas usan UTM']],
g:[
r=>{const h=r.i(0,4500,50);return{q:`Altura h=${h} m (R=6 371 000 m). Halla k_{e}.`,a:6371000/(6371000+h),u:'',tol:1e-7,s:[`k_{e} = 6 371 000/(6 371 000 + ${h}) = ${(6371000/(6371000+h)).toFixed(8)}`]};},
r=>{const k=r.i(.9996,1.0004,.00005),h=r.i(0,4500,50);return{q:`k=${n(k,6)} y h=${h} m. Halla el factor combinado F.`,a:k*6371000/(6371000+h),u:'',tol:1e-7,s:[`k_{e} = ${(6371000/(6371000+h)).toFixed(8)}`,`F = ${(k*6371000/(6371000+h)).toFixed(8)}`]};},
r=>{const D=r.i(100,5000,10),h=r.i(500,4500,50),k=r.i(.9996,1.0002,.00005);const F=k*6371000/(6371000+h);return{q:`Distancia de terreno ${D} m, h=${h} m, k=${n(k,6)}. Halla la distancia UTM.`,a:D*F,u:'m',tol:1e-6,s:[`F = ${F.toFixed(8)}`,`D_{UTM} = ${n(D*F,9)} m`]};},
r=>{const D=r.i(100,5000,10),h=r.i(500,4500,50);const ke=6371000/(6371000+h);return{q:`En un proyecto a ${h} m de altura, ¿cuántos milímetros se pierden por cada ${D} m de terreno al pasar a la cuadrícula, solo por elevación?`,a:D*(1-ke)*1000,u:'mm',s:[`k_{e} = ${ke.toFixed(8)}`,`ΔD = ${D}(1 − k_{e}) = ${n(D*(1-ke)*1000)} mm`]};},
r=>{const E1=r.i(200000,800000,.01),N1=r.i(8000000,9000000,.01),dE=r.i(-2000,2000,.01),dN=r.i(-2000,2000,.01),h=r.i(2000,4500,50),k=r.i(.9996,1.0002,.00005);const Du=sq(dE*dE+dN*dN),F=k*6371000/(6371000+h);return{q:`Dos puntos UTM: (${E1}, ${N1}) y (${n(E1+dE,10)}, ${n(N1+dN,10)}). h=${h} m, k=${n(k,6)}. Halla la distancia que debe medirse en el terreno.`,a:Du/F,u:'m',tol:1e-6,s:[`D_{UTM} = ${n(Du,9)} m`,`F = ${F.toFixed(8)}`,`D_{terreno} = ${n(Du/F,9)} m`]};}
]});

MOD('m37','Procesos constructivos y equipos','Gestión',
'Cómo se construye de verdad: encofrados, maquinaria, rendimientos, seguridad y control de calidad del concreto en obra.',
['Delgado Contreras, Proceso constructivo de una edificación con sótano utilizando muros pantalla','Universidad de Alicante, Fundamentos de construcción','Campero y Alarcón, Administración de proyectos civiles','Viola, Misceláneas de la dirección de obra','Merritt, Manual del ingeniero civil','Peurifoy, Construction Planning, Equipment and Methods','ACI 347, Guía para encofrados','Norma G.050 Seguridad durante la construcción'],
'UNI: Construcción I y II, Maquinaria y Equipo. PUCP: Procedimientos de Construcción y Seguridad en Obra.');
SUB('enc',{t:'Encofrados',
lec:`El concreto fresco empuja el encofrado como un líquido pesado. Si el encofrado cede, la columna sale torcida o revienta.

## Presión del concreto fresco
- Sin fraguar en todo el alto: presión hidrostática p = ρ·g·h (≈ 23.5 kPa por metro)
- En columnas, ACI 347 (unidades SI): p_{máx} = C_{w}C_{c}[7.2 + 785R/(T + 17.8)] kPa, con R la velocidad de vaciado (m/h) y T la temperatura (°C)
- Mínimo 30C_{w} kPa y nunca más que la hidrostática
- C_{w} = C_{c} = 1 para concreto normal sin retardantes

## Diseño
Con la presión se dimensionan el tablero, los barrotes y los tirantes. La fuerza en un tirante es p × área tributaria.

**Plazos de desencofrado típicos:** costados de vigas y columnas en 1 a 2 días; fondos de losas y vigas cuando el concreto alcance la resistencia indicada por el proyectista.`,
key:['p = ρgh','p = 7.2 + [[785R|T + 17.8]] kPa (columnas)','30 kPa ≤ p ≤ ρgh','F_{tirante} = p·s_{h}·s_{v}'],
err:'Vaciar una columna alta de golpe y con concreto frío: la presión llega a la hidrostática.',
x:[['fhi','Es presión hidrostática'],['mez','Retardantes y temperatura cambian la presión'],['met','El encofrado se metra en m²']],
g:[
r=>{const h=r.i(1,6,.25);return{q:`Columna de ${h} m llena de concreto fresco (2400 kg/m³). Halla la presión hidrostática en la base.`,a:2400*G*h/1000,u:'kPa',s:[`p = 2400·9.81·${h} = ${n(2400*G*h/1000)} kPa`]};},
r=>{const R=r.i(1,10,.5),T=r.i(5,35,1);return{q:`Columna vaciada a R=${R} m/h con T=${T} °C (C_{w}=C_{c}=1). Halla 7.2 + 785R/(T+17.8).`,a:7.2+785*R/(T+17.8),u:'kPa',s:[`p = 7.2 + 785·${R}/${n(T+17.8)} = ${n(7.2+785*R/(T+17.8))} kPa`]};},
r=>{const R=r.i(1,10,.5),T=r.i(5,35,1),h=r.i(2,5,.25);const pf=7.2+785*R/(T+17.8),ph=2400*G*h/1000,p=Math.min(Math.max(pf,30),ph);return{q:`Columna de ${h} m, R=${R} m/h, T=${T} °C. Halla la presión de diseño (mín. 30 kPa, máx. hidrostática).`,a:p,u:'kPa',s:[`Fórmula: ${n(pf)} kPa`,`Hidrostática: ${n(ph)} kPa`,`Diseño: ${n(p)} kPa`]};},
r=>{const p=r.i(20,80,1),sh=r.i(.4,1,.05),sv=r.i(.4,1,.05);return{q:`p=${p} kPa, tirantes cada ${sh} m × ${sv} m. Halla la fuerza en cada tirante.`,a:p*sh*sv,u:'kN',s:[`F = ${p}·${sh}·${sv} = ${n(p*sh*sv)} kN`]};},
r=>{const R=r.i(2,8,.5),T=r.i(10,30,1),h=r.i(2.5,4,.25),cap=r.p([10,13,15,20]);const pf=7.2+785*R/(T+17.8),p=Math.min(Math.max(pf,30),2400*G*h/1000);const A=cap/p;const s=sq(A);return{q:`Columna de ${h} m vaciada a ${R} m/h con ${T} °C. Tirantes de ${cap} kN de capacidad en malla cuadrada. Halla la separación máxima.`,a:s,u:'m',s:[`p = ${n(p)} kPa`,`Área por tirante = ${cap}/${n(p)} = ${n(A)} m²`,`s = √A = ${n(s)} m`]};}
]});
SUB('maq',{t:'Costo horario de maquinaria',
lec:`Para presupuestar una partida con equipo pesado hay que saber cuánto cuesta una hora de máquina. Se divide en dos partes:

## Costo de posesión
- Depreciación: D = (V_{a} − V_{r})/V_{e}, con V_{e} la vida útil en horas
- Interés del capital: I = [V_{a}(n + 1)/(2n)]·i/H_{a}, con n la vida en años, i la tasa anual y H_{a} las horas por año
- Seguros e impuestos: similar al interés con su propia tasa

## Costo de operación
- Combustible: consumo (gal/h) × precio
- Lubricantes, filtros, llantas y mantenimiento (a menudo como % de la depreciación)
- Operador

La suma da el costo horario que entra al análisis de precios unitarios.`,
key:['D = [[V_{a} − V_{r}|V_{e}]]','I = [[V_{a}(n+1)|2n]]·[[i|H_{a}]]','C_{comb} = consumo × precio','C_{h} = posesión + operación'],
err:'Olvidar el costo del capital: una máquina parada también cuesta.',
x:[['apu','Entra al costo unitario'],['vpn','El interés es costo de oportunidad'],['prd','Se divide entre la producción']],
g:[
r=>{const Va=r.i(200000,1500000,10000),p=r.p([.1,.15,.2,.25]),Ve=r.i(8000,16000,1000);return{q:`Equipo de S/${Va}, valor residual ${p*100} %, vida ${Ve} h. Halla la depreciación horaria.`,a:Va*(1-p)/Ve,u:'S/ por h',s:[`D = ${Va}(1−${p})/${Ve} = ${n(Va*(1-p)/Ve)} S/h`]};},
r=>{const Va=r.i(200000,1500000,10000),nn=r.i(5,10),i=r.p([.1,.12,.15]),H=r.i(1500,2200,100);return{q:`V_{a}=S/${Va}, n=${nn} años, i=${i*100} %, H_{a}=${H} h/año. Halla el interés horario.`,a:Va*(nn+1)/(2*nn)*i/H,u:'S/ por h',s:[`I = ${Va}·${nn+1}/(2·${nn})·${i}/${H} = ${n(Va*(nn+1)/(2*nn)*i/H)} S/h`]};},
r=>{const c=r.i(2,12,.5),pr=r.i(12,20,.5);return{q:`Consumo de ${c} gal/h de petróleo a S/${pr} por galón. Halla el costo horario de combustible.`,a:c*pr,u:'S/ por h',s:[`= ${n(c*pr)} S/h`]};},
r=>{const Va=r.i(300000,1200000,10000),p=.2,Ve=r.i(10000,15000,1000),m=r.p([.6,.8,1]);const D=Va*(1-p)/Ve;return{q:`Equipo de S/${Va}, residual 20 %, vida ${Ve} h. El mantenimiento es ${m*100} % de la depreciación. Halla depreciación + mantenimiento.`,a:D*(1+m),u:'S/ por h',s:[`D = ${n(D)} S/h`,`Total = ${n(D*(1+m))} S/h`]};},
r=>{const Va=r.i(300000,1200000,10000),nn=r.i(6,10),H=r.i(1600,2000,100),i=.12,c=r.i(4,10,.5),pr=r.i(14,18,.5),op=r.i(25,40,1);const Ve=nn*H,D=Va*.8/Ve,I=Va*(nn+1)/(2*nn)*i/H,M=.8*D,Ct=D+I+M+c*pr+op;return{q:`Cargador de S/${Va}: residual 20 %, vida ${nn} años × ${H} h/año, interés 12 %, mantenimiento 80 % de la depreciación, ${c} gal/h a S/${pr}, operador S/${op}/h. Halla el costo horario.`,a:Ct,u:'S/ por h',s:[`D = ${n(D)}; I = ${n(I)}; M = ${n(M)}`,`Combustible = ${n(c*pr)}; operador = ${op}`,`Total = ${n(Ct)} S/h`]};}
]});
SUB('prd',{t:'Productividad de equipos',
lec:`La producción de un equipo depende de su capacidad y de cuánto tarda un ciclo:

Producción (m³/h) = q·f·(60/t_{c})·E

- q: capacidad nominal (m³)
- f: factor de llenado (0.8 a 1.0 según el material)
- t_{c}: tiempo de ciclo en minutos
- E: eficiencia de trabajo (≈ 0.75 a 0.85, unos 45 a 50 minutos útiles por hora)

## Equilibrar equipos
Un cargador llena volquetes. El número de volquetes para que el cargador nunca espere es:

N = t_{ciclo volquete}/t_{carga de un volquete}, redondeado hacia arriba.

El costo unitario es el costo horario del conjunto dividido entre la producción.`,
key:['P = q·f·[[60|t_{c}]]·E','N = [[t_{ciclo,v}|t_{carga}]]','Costo = [[C_{h}|P]]'],
err:'Usar el ciclo teórico del catálogo sin aplicar factor de eficiencia.',
x:[['maq','Costo horario'],['are','Volúmenes de tierra'],['cpm','La producción define la duración']],
g:[
r=>{const q=r.i(1,5,.25),f=r.p([.8,.85,.9,1]),t=r.i(.4,1.5,.05),E=r.p([.75,.8,.83]);return{q:`Cargador de ${q} m³, f=${f}, ciclo ${t} min, E=${E}. Halla la producción.`,a:q*f*60/t*E,u:'m³/h',s:[`P = ${q}·${f}·60/${t}·${E} = ${n(q*f*60/t*E)} m³/h`]};},
r=>{const tv=r.i(10,60,1),tc=r.i(2,8,.5);return{q:`Ciclo de volquete ${tv} min y carga de cada volquete ${tc} min. ¿Cuántos volquetes? (redondea arriba)`,a:Math.ceil(tv/tc),u:'volquetes',tol:0,s:[`N = ${tv}/${tc} = ${n(tv/tc)} → ${Math.ceil(tv/tc)}`]};},
r=>{const C=r.i(150,700,10),P=r.i(40,250,5);return{q:`Costo horario S/${C} y producción ${P} m³/h. Halla el costo por m³.`,a:C/P,u:'S/ por m³',s:[`= ${n(C/P)} S/m³`]};},
r=>{const d=r.i(1,15,.5),vi=r.i(20,40,1),vr=r.i(30,60,1),tf=r.i(2,6,.5);const t=d/vi*60+d/vr*60+tf;return{q:`Volquete: ida cargado a ${vi} km/h, retorno a ${vr} km/h, distancia ${d} km, tiempos fijos (descarga y maniobras) ${tf} min. Halla el ciclo sin la carga.`,a:t,u:'min',s:[`Ida: ${n(d/vi*60)} min; vuelta: ${n(d/vr*60)} min`,`Ciclo = ${n(t)} min`]};},
r=>{const q=r.i(2,4,.25),f=.9,tl=r.i(.5,.8,.05),cap=r.p([15,20]),d=r.i(2,10,.5),vi=25,vr=40,tf=4,E=.8,Cl=r.i(250,450,10),Cv=r.i(150,250,10);const pases=Math.ceil(cap/(q*f)),tc=pases*tl,tv=d/vi*60+d/vr*60+tf+tc,N=Math.ceil(tv/tc),P=q*f*60/tl*E,Pv=N*cap*60/tv*E,Pr=Math.min(P,Pv),cu=(Cl+N*Cv)/Pr;return{q:`Cargador de ${q} m³ (f=0.9, ciclo ${tl} min, S/${Cl}/h) y volquetes de ${cap} m³ (S/${Cv}/h) a ${d} km (ida 25 km/h, vuelta 40 km/h, fijos 4 min). E=0.8. Halla el costo por m³ del conjunto.`,a:cu,u:'S/ por m³',s:[`Pases por volquete = ${pases} → carga ${n(tc)} min`,`Ciclo volquete = ${n(tv)} min → N = ${N}`,`Producción = ${n(Pr)} m³/h`,`Costo = (${Cl} + ${N}·${Cv})/${n(Pr)} = ${n(cu)} S/m³`]};}
]});
SUB('seg',{t:'Seguridad y salud en obra',
lec:`La construcción es una de las actividades con más accidentes graves en el Perú. La norma **G.050** y la Ley 29783 obligan a planificar la seguridad, no solo a reaccionar.

## Indicadores (base de 1 000 000 de horas-hombre)
- Índice de frecuencia: IF = N.° accidentes con tiempo perdido × 10⁶/HH trabajadas
- Índice de gravedad: IG = días perdidos × 10⁶/HH
- Índice de accidentabilidad: IA = IF·IG/1000

## Prioridad de controles
Eliminación → sustitución → controles de ingeniería → controles administrativos → equipos de protección personal. El arnés es la última barrera, no la primera.

Las caídas de altura son la primera causa de muerte en obra: toda tarea sobre 1.8 m requiere protección contra caídas.`,
key:['IF = [[N·10^{6}|HH]]','IG = [[días·10^{6}|HH]]','IA = [[IF·IG|1000]]','HH = trabajadores × horas'],
err:'Medir solo accidentes graves y no los incidentes: los incidentes avisan antes.',
x:[['est','Son indicadores estadísticos'],['evm','Se reportan junto al avance'],['cpm','La seguridad se planifica con el cronograma']],
g:[
r=>{const t=r.i(20,500,10),h=r.i(40,60,2),s=r.i(4,52);return{q:`${t} trabajadores, ${h} h/semana, ${s} semanas. Halla las HH.`,a:t*h*s,u:'HH',s:[`HH = ${t}·${h}·${s} = ${t*h*s}`]};},
r=>{const N=r.i(1,15),HH=r.i(50000,2000000,10000);return{q:`${N} accidentes con tiempo perdido en ${HH} HH. Halla IF.`,a:N*1e6/HH,u:'',s:[`IF = ${N}·10⁶/${HH} = ${n(N*1e6/HH)}`]};},
r=>{const d=r.i(5,400,5),HH=r.i(50000,2000000,10000);return{q:`${d} días perdidos en ${HH} HH. Halla IG.`,a:d*1e6/HH,u:'',s:[`IG = ${n(d*1e6/HH)}`]};},
r=>{const IF=r.i(1,40,.5),IG=r.i(10,400,5);return{q:`IF=${IF}, IG=${IG}. Halla IA.`,a:IF*IG/1000,u:'',s:[`IA = ${n(IF*IG/1000)}`]};},
r=>{const t=r.i(30,300,10),h=48,s=r.i(8,40),N=r.i(1,8),d=r.i(10,200,5);const HH=t*h*s,IF=N*1e6/HH,IG=d*1e6/HH;return{q:`Obra con ${t} trabajadores, 48 h/semana durante ${s} semanas; ${N} accidentes con ${d} días perdidos. Halla IA.`,a:IF*IG/1000,u:'',s:[`HH = ${HH}`,`IF = ${n(IF)}, IG = ${n(IG)}`,`IA = ${n(IF*IG/1000)}`]};}
]});
SUB('cal',{t:'Control de calidad del concreto',
lec:`En obra se moldean probetas para verificar que el concreto llegó con la resistencia pedida.

## Frecuencia de muestreo (E.060)
No menos de una muestra (un par de probetas) por día, por cada 50 m³ de concreto y por cada 300 m² de losas o muros. Se toma la condición más exigente.

## Criterio de aceptación (f′_{c} ≤ 350 kg/cm²)
- El promedio de cualquier grupo de 3 resultados consecutivos ≥ f′_{c}
- Ningún resultado individual < f′_{c} − 35 kg/cm²

Un "resultado" es el promedio de las dos probetas de una muestra a 28 días.

Si falla, se investiga: extracción de núcleos (diamantina), esclerometría y, si hace falta, prueba de carga.`,
key:['N_{muestras} = máx([[V|50]], [[A|300]], días)','x̄_{3} ≥ f\'_{c}','x_{i} ≥ f\'_{c} − 35'],
err:'Aceptar un lote porque el promedio general está bien, aunque haya un resultado muy bajo.',
x:[['est','Usa promedio y dispersión'],['mez','Valida el diseño de mezcla'],['pt1','Un concreto pobre se deteriora antes']],
g:[
r=>{const V=r.i(20,600,10);return{q:`Se vacían ${V} m³ en una sola jornada (sin losas). ¿Cuántas muestras como mínimo?`,a:Math.max(Math.ceil(V/50),1),u:'muestras',tol:0,s:[`${V}/50 → ${Math.max(Math.ceil(V/50),1)}`]};},
r=>{const V=r.i(20,200,5),A=r.i(100,1500,50);return{q:`Una losa de ${A} m² con ${V} m³ vaciada en un día. ¿Cuántas muestras?`,a:Math.max(Math.ceil(V/50),Math.ceil(A/300),1),u:'muestras',tol:0,s:[`Por volumen: ${Math.ceil(V/50)}; por área: ${Math.ceil(A/300)}`,`Se usa ${Math.max(Math.ceil(V/50),Math.ceil(A/300),1)}`]};},
r=>{const p=[r.i(180,320,1),r.i(180,320,1)];return{q:`Las dos probetas de una muestra dieron ${p.join(' y ')} kg/cm². Halla el resultado.`,a:(p[0]+p[1])/2,u:'kg/cm²',s:[`= ${n((p[0]+p[1])/2)} kg/cm²`]};},
r=>{const f=r.p([175,210,280]),v=[r.i(f-30,f+40,1),r.i(f-30,f+40,1),r.i(f-30,f+40,1)];const m=(v[0]+v[1]+v[2])/3;return{q:`f'_{c}=${f}. Tres resultados consecutivos: ${v.join(', ')}. Halla el promedio móvil.`,a:m,u:'kg/cm²',s:[`= ${n(m)} kg/cm² ${m>=f?'≥':'<'} ${f}`]};},
r=>{const f=r.p([210,280]),v=Array.from({length:5},()=>r.i(f-40,f+45,1));const avg=[0,1,2].map(i=>(v[i]+v[i+1]+v[i+2])/3);const mn=Math.min(...avg);const ok=mn>=f&&Math.min(...v)>=f-35;return{q:`f'_{c}=${f}. Resultados: ${v.join(', ')}. Halla el menor promedio de 3 consecutivos (luego decide si se acepta).`,a:mn,u:'kg/cm²',s:[`Promedios: ${avg.map(x=>n(x)).join(', ')}`,`Mínimo individual = ${Math.min(...v)} (límite ${f-35})`,ok?'Se acepta':'No cumple: investigar']};}
]});

MOD('m38','Contratación pública y dirección de obra','Gestión',
'La mayoría de obras civiles del Perú son públicas. Un buen ingeniero de obra sabe valorizar, reajustar precios, manejar plazos y liquidar el contrato.',
['Ley N.° 32069, Ley General de Contrataciones Públicas, y su reglamento','Viola, Misceláneas de la dirección de obra','Campero y Alarcón, Administración de proyectos civiles','Ramos Salazar, Costos y presupuestos en edificación (CAPECO)','D.S. 011-79-VC, fórmulas polinómicas de reajuste'],
'UNI y PUCP: Gestión de Proyectos de Construcción y Contrataciones del Estado (electivos y diplomados).');
SUB('val',{t:'Valorizaciones',
lec:`La **valorización** es la cuantificación económica del avance de obra en un periodo, normalmente mensual. La elaboran el residente y el supervisor o inspector.

- Monto valorizado de una partida = metrado ejecutado × precio unitario del contrato
- Se suman gastos generales y utilidad en la proporción del contrato, más el IGV

## Amortización de adelantos
Si la entidad entregó un adelanto, se descuenta en cada valorización en proporción al avance:

Amortización = Adelanto × (Valorización del mes / Monto del contrato)

## Reajuste por fórmula polinómica
K = a(J_{r}/J_{o}) + b(M_{r}/M_{o}) + … con los coeficientes sumando 1. J y M son índices unificados del INEI del mes de la valorización (r) y del presupuesto base (o). El monto reajustado es valorización × K.`,
key:['V = Σ metrado × PU','Amort = Adelanto·[[V_{mes}|Monto contrato]]','K = Σ coef·[[Índice_{r}|Índice_{o}]]','Reajuste = V(K − 1)'],
err:'Valorizar metrados no ejecutados para mejorar el flujo de caja: genera pagos indebidos y responsabilidades.',
x:[['met','Usa los metrados'],['apu','Usa los precios unitarios'],['evm','Es la base del valor ganado']],
g:[
r=>{const m=[r.i(10,500,1),r.i(10,500,1)],p=[r.i(20,400,.5),r.i(20,400,.5)];return{q:`Partida 1: ${m[0]} u a S/${p[0]}; partida 2: ${m[1]} u a S/${p[1]}. Halla el costo directo valorizado.`,a:m[0]*p[0]+m[1]*p[1],u:'S/',s:[`= ${n(m[0]*p[0]+m[1]*p[1],8)} S/`]};},
r=>{const M=r.i(500000,5000000,50000),A=Math.round(M*r.p([.1,.15,.2,.3])),V=Math.round(M*r.i(.03,.15,.01));return{q:`Adelanto de S/${A}, valorización del mes S/${V}, monto del contrato S/${M}. Halla la amortización.`,a:A*V/M,u:'S/',s:[`= ${A}·${V}/${M} = ${n(A*V/M,8)} S/`]};},
r=>{const a=r.i(.3,.5,.01),b=+(1-a).toFixed(2),Jr=r.i(400,700,.1),Jo=r.i(380,650,.1),Mr=r.i(400,800,.1),Mo=r.i(380,750,.1);const K=a*Jr/Jo+b*Mr/Mo;return{q:`K = ${a}(J_{r}/J_{o}) + ${b}(M_{r}/M_{o}) con J_{r}=${Jr}, J_{o}=${Jo}, M_{r}=${Mr}, M_{o}=${Mo}. Halla K.`,a:K,u:'',tol:.001,s:[`K = ${n(a*Jr/Jo,5)} + ${n(b*Mr/Mo,5)} = ${n(K,5)}`]};},
r=>{const V=r.i(50000,800000,1000),K=r.i(.98,1.08,.001);return{q:`Valorización de S/${V} con K=${K}. Halla el reajuste.`,a:V*(K-1),u:'S/',s:[`Reajuste = ${V}(${K} − 1) = ${n(V*(K-1),7)} S/`]};},
r=>{const CD=r.i(100000,600000,1000),gg=r.p([.1,.12,.15]),u=r.p([.08,.1]),K=r.i(1,1.06,.001),A=r.i(.1,.3,.05),M=r.i(1e6,6e6,1e5);const sub=CD*(1+gg+u),re=sub*(K-1),am=M*A*sub/M,pago=(sub+re-am)*1.18;return{q:`Costo directo valorizado S/${CD}, GG ${gg*100} %, utilidad ${u*100} %, K=${K}. Adelanto de ${A*100} % del contrato (S/${M}). Halla el monto a pagar con IGV (reajuste incluido, amortización descontada).`,a:pago,u:'S/',s:[`Subtotal = ${n(sub,7)}`,`Reajuste = ${n(re,6)}`,`Amortización = ${n(am,7)}`,`Pago = (subtotal + reajuste − amortización)·1.18 = ${n(pago,8)} S/`]};}
]});
SUB('pen',{t:'Penalidades y plazos',
lec:`Si el contratista se atrasa sin justificación, la entidad aplica una **penalidad por mora**:

Penalidad diaria = 0.10 × Monto / (F × Plazo en días)

- F = 0.40 para plazos de hasta 60 días
- F = 0.25 para plazos mayores de 60 días
- La suma de penalidades no puede superar el **10 %** del monto vigente; al llegar a ese tope, la entidad puede resolver el contrato

## Ampliación de plazo
Si el atraso se debe a causas ajenas al contratista (lluvias extraordinarias, adicionales, demoras de la entidad), este puede pedir ampliación. Se reconocen los **gastos generales variables** de esos días:

GG variable diario = GG variables del contrato / plazo

Siempre revisa el texto vigente del reglamento; las reglas de plazos y procedimientos cambian.`,
key:['Pen_{diaria} = [[0.10·Monto|F·Plazo]]','F = 0.40 (≤ 60 d), 0.25 (> 60 d)','Pen ≤ 10 % del monto','GG_{día} = [[GG variables|plazo]]'],
err:'Calcular la penalidad sobre el saldo y no sobre el monto vigente del contrato o del ítem.',
x:[['cpm','Los atrasos vienen de la ruta crítica'],['val','Se descuentan en las valorizaciones'],['apu','Los GG salen del presupuesto']],
g:[
r=>{const M=r.i(100000,10000000,10000),P=r.i(20,60,5);return{q:`Contrato de S/${M} con plazo ${P} días. Halla la penalidad diaria.`,a:.1*M/(.4*P),u:'S/',s:[`F = 0.40 (≤ 60 días)`,`= 0.10·${M}/(0.40·${P}) = ${n(.1*M/(.4*P),7)} S/`]};},
r=>{const M=r.i(500000,20000000,10000),P=r.i(90,540,30);return{q:`Contrato de S/${M} con plazo ${P} días. Halla la penalidad diaria.`,a:.1*M/(.25*P),u:'S/',s:[`F = 0.25 (> 60 días)`,`= 0.10·${M}/(0.25·${P}) = ${n(.1*M/(.25*P),7)} S/`]};},
r=>{const M=r.i(500000,20000000,10000),P=r.i(90,540,30);return{q:`Contrato de S/${M}, plazo ${P} días. ¿Con cuántos días de atraso se alcanza el tope de 10 %? (redondea arriba)`,a:Math.ceil(.1*M/(.1*M/(.25*P))),u:'días',tol:0,s:[`Penalidad diaria = ${n(.1*M/(.25*P),7)}`,`Días = ${n(.1*M)}/${n(.1*M/(.25*P),7)} = ${n(.25*P)} → ${Math.ceil(.25*P)}`]};},
r=>{const GG=r.i(50000,800000,5000),P=r.i(90,540,30),d=r.i(5,60,1);return{q:`GG variables de S/${GG} en un plazo de ${P} días. Se aprueba una ampliación de ${d} días. Halla el pago por mayores gastos generales.`,a:GG/P*d,u:'S/',s:[`GG diario = ${n(GG/P,6)} S/`,`Pago = ${n(GG/P*d,7)} S/`]};},
r=>{const M=r.i(1e6,15e6,1e5),P=r.i(120,450,30),atr=r.i(10,90,1),amp=r.i(0,30,1);const d=Math.max(atr-amp,0),pen=Math.min(d*.1*M/(.25*P),.1*M);return{q:`Contrato de S/${M} y ${P} días. La obra terminó ${atr} días tarde, pero se aprobaron ${amp} días de ampliación. Halla la penalidad total.`,a:pen,u:'S/',s:[`Atraso imputable = ${d} días`,`Penalidad diaria = ${n(.1*M/(.25*P),7)}`,`Total = ${n(pen,8)} S/ (tope ${n(.1*M,8)})`]};}
]});
SUB('adi',{t:'Adicionales, deductivos y liquidación',
lec:`Durante la obra aparecen cambios: trabajos no previstos (**adicionales**) y trabajos que ya no se harán (**deductivos**).

## Porcentaje de incidencia
Incidencia = (adicionales − deductivos vinculados) / monto del contrato original × 100

Según el porcentaje, la ley exige distintas autorizaciones (entidad, y por encima de ciertos límites, la Contraloría). Revisa los límites en la norma vigente.

## Liquidación del contrato
Al terminar, se calcula el saldo final:

Saldo = Monto final valorizado + reajustes + mayores GG reconocidos − adelantos no amortizados − penalidades − pagos ya realizados

Un saldo positivo se paga al contratista; uno negativo lo devuelve. Una buena documentación diaria (cuaderno de obra) evita controversias y arbitrajes.`,
key:['Incidencia = [[Adic − Deduc|Monto original]]×100','Monto vigente = original + adic − deduc','Saldo = valorizado + reajustes + GG − adelantos − penalidades − pagos'],
err:'Ejecutar un adicional antes de que esté aprobado: puede no reconocerse.',
x:[['val','Valorizaciones y reajustes'],['pen','Penalidades'],['vpn','Impacto económico del cambio']],
g:[
r=>{const M=r.i(1e6,20e6,1e5),A=r.i(10000,2000000,10000),D=r.i(0,500000,10000);return{q:`Contrato de S/${M}, adicionales S/${A}, deductivos vinculados S/${D}. Halla la incidencia.`,a:(A-D)/M*100,u:'%',s:[`= (${A}−${D})/${M}·100 = ${n((A-D)/M*100)} %`]};},
r=>{const M=r.i(1e6,20e6,1e5),A=r.i(10000,2000000,10000),D=r.i(0,500000,10000);return{q:`Contrato de S/${M}, adicionales S/${A}, deductivos S/${D}. Halla el monto vigente.`,a:M+A-D,u:'S/',s:[`= ${n(M+A-D,9)} S/`]};},
r=>{const M=r.i(1e6,10e6,1e5),lim=r.p([5,10,15]),D=r.i(0,300000,10000);return{q:`Contrato de S/${M} y deductivos vinculados de S/${D}. Si el límite de incidencia es ${lim} %, ¿hasta qué monto de adicionales se puede aprobar?`,a:lim/100*M+D,u:'S/',s:[`A = ${lim/100}·${M} + ${D} = ${n(lim/100*M+D,9)} S/`]};},
r=>{const V=r.i(1e6,10e6,1e4),R=r.i(0,300000,1000),P=r.i(0,200000,1000),pag=+(V*r.i(.85,.97,.01)).toFixed(0);return{q:`Liquidación: valorizado S/${V}, reajustes S/${R}, penalidades S/${P}, pagos realizados S/${pag} (adelantos ya amortizados). Halla el saldo.`,a:V+R-P-pag,u:'S/',s:[`Saldo = ${V} + ${R} − ${P} − ${pag} = ${n(V+R-P-pag,9)} S/ (negativo: el contratista devuelve)`]};},
r=>{const M=r.i(2e6,10e6,1e5),Ad=r.i(50000,800000,10000),De=r.i(0,200000,10000),K=r.i(1.01,1.05,.001),GG=r.i(0,150000,1000),P=r.i(0,150000,1000),adel=+(M*.1).toFixed(0),am=+(adel*r.i(.8,1,.05)).toFixed(0),pag=+((M+Ad-De)*r.i(.85,.95,.01)).toFixed(0);const V=M+Ad-De,saldo=V*K+GG-(adel-am)-P-pag;return{q:`Contrato S/${M}; adicionales S/${Ad}, deductivos S/${De}; todo valorizado con K promedio ${K}; mayores GG S/${GG}; adelanto S/${adel} del que se amortizó S/${am}; penalidades S/${P}; pagos netos realizados S/${pag}. Halla el saldo de liquidación (sin IGV).`,a:saldo,u:'S/',s:[`Valorizado reajustado = ${n(V*K,9)}`,`Adelanto por amortizar = ${adel-am}`,`Saldo = ${n(saldo,9)} S/`]};}
]});

MOD('m39','Arquitectura y urbanismo para ingenieros','Gestión',
'El ingeniero civil trabaja de la mano con el arquitecto. Entender dimensiones, áreas, parámetros urbanos y criterios de sostenibilidad evita choques entre especialidades.',
['Neufert, Arte de proyectar en arquitectura','Ching, Diccionario visual de arquitectura','Bazant, Hacia un desarrollo urbano sustentable','Minke, Techos verdes','McLeod, Detalles constructivos de la arquitectura doméstica contemporánea','Salvadori y Heller, Estructuras para arquitectos','Torroja, Razón y ser de los tipos estructurales'],
'UNI y PUCP: Arquitectura para ingenieros y Urbanismo (electivos). Base de las normas A.010 y TH del RNE.');
SUB('par2',{t:'Parámetros urbanos',
lec:`Antes de diseñar un edificio hay que leer el **certificado de parámetros urbanísticos y edificatorios** que emite la municipalidad. Fija qué y cuánto se puede construir.

- **Coeficiente de edificación (CE):** área techada total permitida / área del terreno
- **Área libre:** porcentaje mínimo del terreno sin techar
- **Altura máxima:** en pisos o metros
- **Retiros:** distancias mínimas a los linderos frontales
- **Densidad:** habitantes por hectárea

## Área ocupada por piso
Área máxima de piso = área del terreno × (1 − % área libre).

## Número de pisos posible
Pisos = área techada permitida / área de piso.`,
key:['CE = [[Área techada|Área terreno]]','A_{piso} = A_{terreno}(1 − %libre)','Densidad = [[habitantes|ha]]'],
err:'Diseñar la estructura antes de verificar los parámetros: se rediseña todo.',
x:[['car','El número de pisos define las cargas'],['esp','La altura define el periodo'],['pob','La densidad define la población']],
g:[
r=>{const A=r.i(120,2000,10),ce=r.i(1.5,6,.1);return{q:`Terreno de ${A} m² con CE=${ce}. Halla el área techada máxima.`,a:A*ce,u:'m²',s:[`= ${A}·${ce} = ${n(A*ce)} m²`]};},
r=>{const A=r.i(120,2000,10),l=r.p([30,35,40,50]);return{q:`Terreno de ${A} m² con ${l} % de área libre. Halla el área máxima por piso.`,a:A*(1-l/100),u:'m²',s:[`= ${A}·${1-l/100} = ${n(A*(1-l/100))} m²`]};},
r=>{const A=r.i(120,2000,10),ce=r.i(1.5,6,.1),l=r.p([30,35,40]);const p=A*ce/(A*(1-l/100));return{q:`Terreno de ${A} m², CE=${ce}, área libre ${l} %. ¿Cuántos pisos completos se pueden construir?`,a:Math.floor(p+1e-9),u:'pisos',tol:0,s:[`Área techada = ${n(A*ce)} m²`,`Por piso = ${n(A*(1-l/100))} m²`,`Pisos = ${n(p)} → ${Math.floor(p+1e-9)}`]};},
r=>{const d=r.i(4,20),hb=r.i(3,5,.5),A=r.i(.1,2,.05);return{q:`${d} departamentos con ${hb} habitantes cada uno en un terreno de ${A} ha. Halla la densidad.`,a:d*hb/A,u:'hab/ha',s:[`= ${n(d*hb)}/${A} = ${n(d*hb/A)} hab/ha`]};},
r=>{const A=r.i(300,1500,10),ce=r.i(2,5,.1),l=r.p([30,35,40]),ad=r.i(60,120,5),circ=r.p([.15,.2]);const at=A*ce,nd=Math.floor(at*(1-circ)/ad);return{q:`Terreno de ${A} m², CE=${ce}. Si el ${circ*100} % del área techada es circulación y áreas comunes y cada departamento mide ${ad} m², ¿cuántos departamentos caben?`,a:nd,u:'deptos',tol:0,s:[`Área techada = ${n(at)} m²`,`Área vendible = ${n(at*(1-circ))} m²`,`Departamentos = ${nd}`]};}
]});
SUB('dim',{t:'Dimensionamiento de espacios',
lec:`Los libros como el de Neufert reúnen medidas basadas en el cuerpo humano y el uso. Algunas que el ingeniero usa siempre:

- **Estacionamiento:** un cajón de unos 2.5 × 5.0 m; con circulación, entre 25 y 30 m² por auto
- **Escaleras:** 2cp + p ≈ 63 cm; ancho mínimo según el aforo
- **Aforo:** número de personas = área / índice de ocupación (m² por persona según el uso)
- **Alturas:** piso a techo habitual de 2.40 a 2.70 m en vivienda
- **Iluminación natural:** el área de ventanas se expresa como un porcentaje del área del ambiente

Estas medidas definen dónde puede ir una columna, cuánto espacio deja una placa y por dónde pasan las montantes.`,
key:['A_{estac} ≈ 25–30 m^{2}/auto','Aforo = [[Área|índice]]','Ventana = %·A_{ambiente}'],
err:'Ubicar columnas sin revisar el módulo de estacionamientos del sótano.',
x:[['esc','Escaleras'],['par2','Los parámetros fijan los estacionamientos exigidos'],['isa','El aforo define la dotación']],
g:[
r=>{const A=r.i(300,5000,50),a=r.p([25,27.5,30]);return{q:`Sótano de ${A} m² y ${a} m² por auto incluyendo circulación. ¿Cuántos autos? (parte entera)`,a:Math.floor(A/a),u:'autos',tol:0,s:[`${A}/${a} = ${n(A/a)} → ${Math.floor(A/a)}`]};},
r=>{const A=r.i(50,2000,10),ix=r.p([1,1.5,2,5,9.5,10]);return{q:`Un ambiente de ${A} m² con índice de ocupación ${ix} m²/persona. Halla el aforo (parte entera).`,a:Math.floor(A/ix),u:'personas',tol:0,s:[`${A}/${ix} = ${n(A/ix)} → ${Math.floor(A/ix)}`]};},
r=>{const A=r.i(8,60,.5),p=r.p([10,15,20]);return{q:`Un ambiente de ${A} m² requiere ventanas del ${p} % de su área. Halla el área de ventana.`,a:A*p/100,u:'m²',s:[`= ${n(A*p/100)} m²`]};},
r=>{const nd=r.i(10,80),r1=r.p([1,1.5,2]),a=r.p([25,27.5]);return{q:`Un edificio de ${nd} departamentos exige ${r1} estacionamiento(s) por departamento, a ${a} m² cada uno. Halla el área de estacionamientos.`,a:Math.ceil(nd*r1)*a,u:'m²',s:[`Plazas = ${Math.ceil(nd*r1)}`,`Área = ${n(Math.ceil(nd*r1)*a)} m²`]};},
r=>{const nd=r.i(20,80),r1=r.p([1,1.2,1.5]),a=r.p([25,27.5,30]),A=r.i(300,800,10),l=.3;const pl=Math.ceil(nd*r1),pisos=Math.ceil(pl*a/(A*(1-l)));return{q:`${nd} departamentos con ${r1} plazas por departamento (${a} m² cada una). Cada sótano tiene ${n(A*(1-l))} m² útiles. ¿Cuántos sótanos se necesitan?`,a:pisos,u:'sótanos',tol:0,s:[`Plazas = ${pl}`,`Área = ${n(pl*a)} m²`,`Sótanos = ${pisos}`]};}
]});
SUB('tv',{t:'Techos verdes y sostenibilidad',
lec:`Un **techo verde** cubre la azotea con vegetación. Retiene lluvia, aísla del calor y mejora el aire, pero agrega carga y exige buena impermeabilización.

## Cargas
- Extensivo (pasto, plantas pequeñas): 8 a 15 cm de sustrato, unos 100 a 200 kg/m² saturado
- Intensivo (arbustos, árboles): más de 20 cm, 400 kg/m² o más
- Carga muerta adicional = γ_{sat} del sustrato × espesor + capas de drenaje y filtro

## Retención de lluvia
Volumen retenido = área × lluvia × coeficiente de retención (0.4 a 0.7 según el espesor).

## Ahorro de agua de riego con agua de lluvia
Volumen captable = área × lluvia anual × coeficiente de escorrentía del techo.

Siempre se verifica la losa existente antes de convertir una azotea: es un cambio de carga muerta permanente.`,
key:['ΔCM = γ_{sat}·e + capas','V_{ret} = A·P·C_{ret}','V_{capt} = A·P_{anual}·C'],
err:'Usar el peso seco del sustrato: debe usarse saturado.',
x:[['car','Es carga muerta adicional'],['rac','Reduce la escorrentía urbana'],['los','La losa debe resistirla']],
g:[
r=>{const g=r.i(1.2,1.9,.05),e=r.i(8,40,1),c=r.i(10,40,5);return{q:`Sustrato saturado de ${g} t/m³ y ${e} cm, más ${c} kg/m² de capas. Halla la carga adicional.`,a:g*1000*e/100+c,u:'kg/m²',s:[`= ${g*1000}·${e/100} + ${c} = ${n(g*1000*e/100+c)} kg/m²`]};},
r=>{const A=r.i(50,2000,10),P=r.i(5,60,1),C=r.p([.4,.5,.6,.7]);return{q:`Techo verde de ${A} m², lluvia de ${P} mm, retención ${C}. Halla el volumen retenido.`,a:A*P/1000*C,u:'m³',s:[`= ${A}·${P/1000}·${C} = ${n(A*P/1000*C)} m³`]};},
r=>{const A=r.i(100,3000,10),P=r.i(10,1500,10),C=r.p([.8,.85,.9]);return{q:`Techo de ${A} m², lluvia anual ${P} mm, C=${C}. ¿Cuánta agua se puede captar al año?`,a:A*P/1000*C,u:'m³',s:[`= ${n(A*P/1000*C)} m³/año`]};},
r=>{const cm=r.i(300,600,10),cv=r.p([100,150,200]),d=r.i(100,400,10);return{q:`Una azotea con CM=${cm} y CV=${cv} kg/m² recibe un techo verde de ${d} kg/m² (se reemplaza la CV de azotea por 100 kg/m²). Halla el nuevo w_{u}.`,a:1.4*(cm+d)+1.7*100,u:'kg/m²',s:[`w_{u} = 1.4(${cm}+${d}) + 1.7·100 = ${n(1.4*(cm+d)+1.7*100)} kg/m²`,`Antes: ${n(1.4*cm+1.7*cv)} kg/m²`]};},
r=>{const cm=r.i(350,550,10),g=r.i(1.4,1.8,.05),c=r.p([20,30]);const wu0=Math.round((1.4*cm+1.7*r.p([200,250])+r.i(150,500,10))/10)*10;const emax=((wu0-170)/1.4-cm-c)/(g*1000)*100;return{q:`Una losa fue diseñada para w_{u}=${wu0} kg/m² con CM=${cm} kg/m². El techo verde usará sustrato saturado de ${g} t/m³ más ${c} kg/m² de capas y CV de 100 kg/m². ¿Qué espesor máximo de sustrato admite?`,a:Math.max(emax,0),u:'cm',s:[`1.4(CM + ΔCM) + 1.7·100 ≤ ${wu0}`,`ΔCM ≤ ${n((wu0-170)/1.4-cm)} kg/m²`,`e ≤ ${n(Math.max(emax,0))} cm`]};}
]});
