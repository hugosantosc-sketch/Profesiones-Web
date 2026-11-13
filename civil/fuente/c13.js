/* Diseño sísmico avanzado y temas que faltaban en varios bloques */
MOD('m46','Diseño sismorresistente avanzado','Estructuras',
'En el Perú el sismo manda. Aquí pasas del cortante basal al diseño real: columnas esbeltas, diseño por capacidad, detallado que da ductilidad, análisis no lineal y albañilería armada.',
['Paulay y Priestley, Seismic Design of Reinforced Concrete and Masonry Buildings (1992)','Chopra, Dynamics of Structures','Moehle, Seismic Design of Reinforced Concrete Buildings','Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado','San Bartolomé, Construcciones de albañilería (PUCP)','ACI 318, E.060, E.070 y ASCE 41'],
'UNI: Ingeniería Antisísmica II, Concreto Armado II. PUCP: Ingeniería Sismorresistente, Diseño en Concreto Armado. Berkeley CE 248.');
SUB('esb',{t:'Columnas esbeltas',
lec:`Una columna larga y delgada se flexiona por la carga axial: la carga P actúa sobre la columna ya deformada y crea un momento adicional P·δ. Es el pandeo de Euler, pero en concreto armado.

## ¿Es esbelta? (pórtico arriostrado)
Se puede despreciar la esbeltez si kℓ_{u}/r ≤ 34 − 12(M_{1}/M_{2}) ≤ 40

- ℓ_{u}: luz libre; k: factor de longitud efectiva (≤ 1 si está arriostrada)
- r = 0.3h en secciones rectangulares (h en la dirección analizada)
- M_{1}/M_{2}: relación de momentos en los extremos, positiva en curvatura simple (convención de E.060 y ACI 318 hasta 2011)

## Magnificación de momentos
M_{c} = δ_{ns}·M_{2}, con

δ_{ns} = C_{m}/(1 − P_{u}/(0.75P_{c})) ≥ 1

- P_{c} = π²EI/(kℓ_{u})²
- EI = 0.4E_{c}I_{g}/(1 + β_{dns}), con β_{dns} la fracción de la carga axial que es permanente
- C_{m} = 0.6 + 0.4(M_{1}/M_{2}) ≥ 0.4
- M_{2} no menor que P_{u}(1.5 + 0.03h) en cm`,
ded:`## De dónde sale la magnificación
Para una columna articulada con momento inicial M₀, la flecha de segundo orden crece con la carga axial. Timoshenko demostró que el momento máximo es aproximadamente M₀/(1 − P/P_{c}): cuando P se acerca a la carga crítica de Euler, el momento tiende a infinito (la columna pandea). El 0.75 de la norma es un factor de reducción de rigidez que cubre la variabilidad del concreto.

## Por qué C_{m}
Si la columna se flexiona en curvatura doble (M₁/M₂ negativo en esta convención), la deformada tiene un punto de inflexión y el efecto P·δ es menor que con momento uniforme. C_{m} lo toma en cuenta: vale 1 con momentos iguales en curvatura simple y 0.2 en el otro extremo, con un mínimo de 0.4.

## Por qué EI tiene 0.4 y (1 + β)
El concreto se fisura (baja la inercia) y fluye bajo carga sostenida (baja el módulo con el tiempo). MacGregor propuso EI ≈ 0.4E_{c}I_{g}/(1 + β) como una estimación segura de la rigidez a largo plazo.`,
key:['[[kℓ_{u}|r]] ≤ 34 − 12[[M_{1}|M_{2}]] ≤ 40','EI = [[0.4E_{c}I_{g}|1+β_{dns}]]','P_{c} = [[π^{2}EI|(kℓ_{u})^{2}]]','δ_{ns} = [[C_{m}|1 − P_{u}/0.75P_{c}]]','C_{m} = 0.6 + 0.4[[M_{1}|M_{2}]]'],
err:'Olvidar el momento mínimo cuando la columna casi no tiene momento del análisis.',
x:[['pan','Euler'],['fcp','Diagrama de interacción'],['pdl','P-Delta en todo el edificio'],['col','Columnas cortas']],
g:[
r=>{const h=r.i(25,80,5),k=r.p([.8,.9,1]),L=r.i(250,600,10);return{q:`Columna de h=${h} cm, ℓ_{u}=${L} cm, k=${k}. Halla kℓ_{u}/r.`,a:k*L/(.3*h),u:'',s:[`r = 0.3·${h} = ${n(.3*h)} cm`,`kℓ_{u}/r = ${n(k*L/(.3*h))}`]};},
r=>{const M1=r.i(-20,20,1),M2=r.i(21,40,1);const l=Math.min(34-12*M1/M2,40);return{q:`M₁=${M1} t·m y M₂=${M2} t·m (positivo en curvatura simple). Halla el límite de esbeltez.`,a:l,u:'',s:[`= 34 − 12(${M1}/${M2}) = ${n(34-12*M1/M2)} → ${n(l)}`]};},
r=>{const b=r.i(25,60,5),h=r.i(25,60,5),fc=r.p([210,280,350]),L=r.i(300,700,10),bd=r.i(.4,.8,.05);const Ec=15000*sq(fc),Ig=b*h**3/12,EI=.4*Ec*Ig/(1+bd),Pc=PI*PI*EI/L**2/1000;return{q:`Columna ${b}×${h} cm (h en la dirección analizada), f′_{c}=${fc}, kℓ_{u}=${L} cm, β_{dns}=${bd}. Halla P_{c}.`,a:Pc,u:'t',s:[`E_{c} = ${n(Ec)} kg/cm², I_{g} = ${n(Ig,6)} cm⁴`,`EI = ${n(EI,6)} kg·cm²`,`P_{c} = ${n(Pc)} t`]};},
r=>{const M1=r.i(-15,25,1),M2=r.i(26,40,1),Pc=r.i(300,2000,10),Pu=Math.round(Pc*r.i(.1,.5,.02));const Cm=Math.max(.6+.4*M1/M2,.4),d=Math.max(Cm/(1-Pu/(.75*Pc)),1);return{q:`M₁=${M1}, M₂=${M2} t·m, P_{u}=${Pu} t, P_{c}=${Pc} t. Halla δ_{ns}.`,a:d,u:'',s:[`C_{m} = ${n(Cm)}`,`δ = ${n(Cm)}/(1 − ${Pu}/${n(.75*Pc)}) = ${n(Cm/(1-Pu/(.75*Pc)))} → ${n(d)}`]};},
r=>{const b=r.i(30,50,5),h=r.i(30,50,5),fc=280,L=r.i(450,750,10),bd=.6,M2=r.i(1,15,.5),M1=+(M2*r.i(-.5,1,.1)).toFixed(1);const Ec=15000*sq(fc),Ig=b*h**3/12,Pc=PI*PI*.4*Ec*Ig/(1+bd)/L**2/1000,Pu=Math.round(.75*Pc*r.i(.15,.5,.01));const Cm=Math.max(.6+.4*M1/M2,.4),d=Math.max(Cm/(1-Pu/(.75*Pc)),1),Mmin=Pu*(1.5+.03*h)/100,Mc=d*Math.max(M2,Mmin);return{q:`Columna arriostrada ${b}×${h} cm, f′_{c}=280, kℓ_{u}=${L} cm, β_{dns}=0.6, P_{u}=${Pu} t, M₁=${M1}, M₂=${M2} t·m. Halla el momento de diseño M_{c}.`,a:Pu<.75*Pc?Mc:0,u:'t·m',s:[`P_{c} = ${n(Pc)} t`,`C_{m} = ${n(Cm)}; δ = ${n(d)}`,`M_{2,mín} = ${n(Mmin)} t·m`,`M_{c} = ${n(Mc)} t·m`]};}
],
cri:[
['Si δ_{ns} sale 2.5, ¿qué conviene?',['Diseñar con ese momento','Agrandar la sección o arriostrar: la columna está cerca de pandear','Reducir el acero','Ignorarlo'],1,'Un factor tan alto indica que P_{u} se acerca a 0.75P_{c}: cualquier error lleva al pandeo. Se rigidiza la columna en vez de solo poner más acero.'],
['¿Por qué una carga permanente alta reduce la rigidez de cálculo?',['Por el IGV','Por el flujo plástico: el concreto se sigue deformando bajo carga sostenida','Porque el acero fluye','No la reduce'],1,'Con β_{dns} alto, el concreto se deforma más con el tiempo y la columna se vuelve más flexible, por eso EI se divide entre 1 + β.'],
['Una columna en curvatura doble frente a otra igual en curvatura simple:',['La de curvatura doble tiene más efecto de esbeltez','La de curvatura doble tiene menos: tiene un punto de inflexión','Son iguales','Depende del color'],1,'Con curvatura doble la deformada se cruza a sí misma y el brazo de P es menor. C_{m} lo refleja.']
],
ref:['MacGregor y Wight, Reinforced Concrete: Mechanics and Design (capítulo de columnas esbeltas)','Timoshenko y Gere, Theory of Elastic Stability','E.060, capítulo de efectos de esbeltez']});
SUB('cap2',{t:'Diseño por capacidad',
lec:`En un sismo fuerte el edificio **va a fluir**: el diseño decide dónde. Paulay y Priestley llamaron a esta idea **diseño por capacidad**: se eligen zonas que forman rótulas plásticas dúctiles (los extremos de vigas) y todo lo demás se diseña para resistir lo que esas rótulas pueden transmitir, con margen.

## Jerarquía
- Columna fuerte, viga débil: ΣM_{nc} ≥ 1.2ΣM_{nb} en cada nudo. Así se forman rótulas en vigas y no un piso blando de columnas
- Corte mayor que flexión: la falla por corte es frágil, así que el corte de diseño sale de la flexión máxima posible, no del análisis

## Momento probable
M_{pr} = A_{s}(1.25f_{y})(d − a/2), con a = A_{s}(1.25f_{y})/(0.85f′_{c}b) y φ = 1

El 1.25 cubre que el acero real es más resistente que el nominal y se endurece.

## Corte de diseño de una viga
V_{e} = (M_{pr}^{−} + M_{pr}^{+})/ℓ_{n} + w_{u}ℓ_{n}/2

Si ese corte sísmico es más de la mitad del corte total y la carga axial es pequeña, el concreto no se cuenta (V_{c} = 0) en la zona de rótula.`,
ded:`## De dónde sale V_{e}
Toma la viga libre entre caras de columnas, de luz ℓ_{n}. Cuando se forman rótulas en ambos extremos, en un extremo actúa M_{pr}^{−} y en el otro M_{pr}^{+}, en el mismo sentido de giro (el sismo "tuerce" la viga). Por equilibrio de momentos respecto a un extremo, las reacciones deben equilibrar la suma de ambos momentos: V = (M_{pr}^{−} + M_{pr}^{+})/ℓ_{n}. A eso se suma el corte isostático de la carga de gravedad, w_{u}ℓ_{n}/2. Es el máximo corte que la viga puede recibir, por mucho que crezca el sismo.

## Por qué 1.2 en columna fuerte-viga débil
Si las columnas apenas igualan a las vigas, la rótula puede formarse en cualquiera. El margen de 20 % (ACI 318 y E.060) cubre la sobrerresistencia de las vigas (losa colaborante, acero real mayor) y hace probable que fluyan primero las vigas.`,
key:['M_{pr} = A_{s}(1.25f_{y})(d − [[a|2]])','V_{e} = [[M_{pr}^{−} + M_{pr}^{+}|ℓ_{n}]] + [[w_{u}ℓ_{n}|2]]','ΣM_{nc} ≥ 1.2ΣM_{nb}'],
err:'Diseñar el corte de vigas sísmicas con el resultado del análisis elástico.',
x:[['cte','Diseño por corte'],['fle','Momento nominal'],['irr','Piso blando'],['psh','Mecanismo de colapso']],
g:[
r=>{const As=r.i(5,30,.5),b=r.i(25,40,5),d=r.i(40,75,5),fc=r.p([210,280]);const T=As*1.25*4200,a=T/(.85*fc*b);return{q:`Viga ${b} cm de ancho, d=${d} cm, A_{s}=${As} cm², f′_{c}=${fc}, f_{y}=4200. Halla M_{pr}.`,a:T*(d-a/2)/1e5,u:'t·m',s:[`a = ${n(a)} cm`,`M_{pr} = ${n(T)}·(${d} − ${n(a/2)}) = ${n(T*(d-a/2)/1e5)} t·m`]};},
r=>{const M1=r.i(10,60,1),M2=r.i(5,40,1),L=r.i(3,8,.25),w=r.i(2,8,.25);return{q:`M_{pr}^{−}=${M1}, M_{pr}^{+}=${M2} t·m, ℓ_{n}=${L} m, w_{u}=${w} t/m. Halla V_{e}.`,a:(M1+M2)/L+w*L/2,u:'t',s:[`= ${M1+M2}/${L} + ${w}·${L}/2 = ${n((M1+M2)/L+w*L/2)} t`]};},
r=>{const Mc=[r.i(20,60,1),r.i(20,60,1)],Mb=[r.i(10,40,1),r.i(10,40,1)];const R=(Mc[0]+Mc[1])/(Mb[0]+Mb[1]);return{q:`En un nudo: columnas con M_{nc} = ${Mc.join(' y ')} t·m; vigas con M_{nb} = ${Mb.join(' y ')} t·m. Halla ΣM_{nc}/ΣM_{nb} (debe ser ≥ 1.2).`,a:R,u:'',s:[`= ${Mc[0]+Mc[1]}/${Mb[0]+Mb[1]} = ${n(R)} ${R>=1.2?'(cumple)':'(no cumple)'}`]};},
r=>{const M1=r.i(15,50,1),M2=r.i(8,35,1),L=r.i(3.5,7,.25),w=r.i(2,6,.25);const Vs=(M1+M2)/L,Vt=Vs+w*L/2;return{q:`M_{pr}^{−}=${M1}, M_{pr}^{+}=${M2} t·m, ℓ_{n}=${L} m, w_{u}=${w} t/m. ¿Qué fracción del corte total es sísmica? (si > 0.5 y P_{u} es pequeño, V_{c}=0)`,a:Vs/Vt,u:'',s:[`V_{sismo} = ${n(Vs)} t; V_{e} = ${n(Vt)} t`,`Fracción = ${n(Vs/Vt)}`]};},
r=>{const b=r.i(25,40,5),d=r.i(45,70,5),Asn=r.i(8,25,.5),Asp=r.i(5,Asn,.5),fc=280,L=r.i(4,7,.25),w=r.i(2,5,.25),Av=r.p([1.42,2.58]);const mp=As=>{const T=As*1.25*4200,a=T/(.85*fc*b);return T*(d-a/2)/1e5;};const M1=mp(Asn),M2=mp(Asp),Ve=(M1+M2)/L+w*L/2,s=.85*Av*4200*d/(Ve*1000);return{q:`Viga sísmica ${b}×(d=${d}) cm, f′_{c}=280, A_{s}^{−}=${Asn} cm², A_{s}^{+}=${Asp} cm², ℓ_{n}=${L} m, w_{u}=${w} t/m. Con V_{c}=0, φ=0.85 y estribos de A_{v}=${Av} cm², halla el espaciamiento requerido en la rótula (sin aplicar aún los máximos de detallado).`,a:s,u:'cm',s:[`M_{pr}^{−} = ${n(M1)}, M_{pr}^{+} = ${n(M2)} t·m`,`V_{e} = ${n(Ve)} t`,`s = φA_{v}f_{y}d/V_{e} = ${n(s)} cm`]};}
],
cri:[
['¿Por qué se prefiere que las rótulas se formen en las vigas?',['Porque son más baratas','Porque una viga que fluye no hace caer el edificio; una columna que fluye forma un piso blando y colapsa','Porque las vigas no tienen acero','Por estética'],1,'El mecanismo de vigas reparte la disipación en muchos pisos y mantiene las columnas cargando la gravedad. El mecanismo de piso blando concentra todo en un piso y colapsa.'],
['Se puso más acero de flexión en una viga sísmica "por seguridad". ¿Qué puede pasar?',['Nada, siempre es mejor','Sube M_{pr} y con él V_{e}: si no se revisan estribos y columnas, la falla puede pasar a ser frágil','Baja el corte','Mejora la columna'],1,'En diseño por capacidad, más resistencia a flexión en la viga exige más corte en la viga y más resistencia en la columna. El exceso puede ser peligroso.'],
['¿De dónde sale el 1.25 de M_{pr}?',['Del IGV','De la sobrerresistencia del acero real y su endurecimiento por deformación','De la carga muerta','De la gravedad'],1,'El acero de obra suele tener fluencia mayor que la nominal y, al deformarse mucho, se endurece. M_{pr} es el momento máximo realista.']
],
ref:['Paulay y Priestley, Seismic Design of Reinforced Concrete and Masonry Buildings (1992)','Moehle, Seismic Design of Reinforced Concrete Buildings','ACI 318, capítulo 18; E.060, capítulo 21']});
SUB('dts',{t:'Detallado sísmico y confinamiento',
lec:`La ductilidad no está en los cálculos: está en los estribos. Un núcleo de concreto bien confinado aguanta deformaciones varias veces mayores que el concreto sin confinar (Mander, Priestley y Park, 1988).

## Columnas (E.060, sistemas de muros y duales)
- **Zona de confinamiento** en cada extremo, de longitud ℓ_{o} ≥ máx(ℓ_{n}/6, mayor dimensión de la sección, 50 cm)
- Espaciamiento en esa zona: s_{o} ≤ mín(8d_{b} de la barra longitudinal menor, mitad de la menor dimensión, 10 cm)
- Primer estribo a no más de s_{o}/2 de la cara del nudo
- Ganchos de 135° con extensión de 6d_{b} (mínimo 7.5 cm)

## Área de estribos para confinar (ACI 318, pórticos especiales)
A_{sh} ≥ máx[0.3·s·b_{c}·(f′_{c}/f_{yt})·(A_{g}/A_{ch} − 1); 0.09·s·b_{c}·(f′_{c}/f_{yt})]

- b_{c}: dimensión del núcleo medida a ejes de estribos
- A_{ch}: área del núcleo

## Vigas
Estribos cerrados en 2h desde la cara de la columna; empalmes fuera de las rótulas y de los nudos.

Verifica cada valor en la versión vigente de la E.060 y del ACI.`,
ded:`## Por qué confinar aumenta la ductilidad
Al comprimirse, el concreto se expande lateralmente (efecto de Poisson, que crece al fisurarse). Los estribos lo impiden y generan una presión lateral f_{l}. Con presión lateral el concreto resiste más y, sobre todo, se deforma más antes de romperse: es el mismo efecto que hace más resistente a una probeta en una cámara triaxial. El modelo de Mander da f′_{cc} ≈ f′_{c}(−1.254 + 2.254√(1 + 7.94f_{l}/f′_{c}) − 2f_{l}/f′_{c}).

## De dónde sale A_{sh}
La primera expresión pide que el núcleo confinado recupere la carga que se pierde cuando se desprende el recubrimiento: por eso aparece A_{g}/A_{ch} − 1, el área perdida relativa al núcleo. La segunda asegura un confinamiento mínimo en columnas grandes, donde el recubrimiento es relativamente pequeño.

## Por qué 135°
Un gancho de 90° se abre cuando se cae el recubrimiento y el estribo deja de confinar. El de 135° queda anclado dentro del núcleo.`,
key:['ℓ_{o} ≥ máx([[ℓ_{n}|6]], h_{máx}, 50 cm)','s_{o} ≤ mín(8d_{b}, [[b_{mín}|2]], 10 cm)','A_{sh} = 0.3sb_{c}[[f\'_{c}|f_{yt}]]([[A_{g}|A_{ch}]] − 1)','A_{sh} = 0.09sb_{c}[[f\'_{c}|f_{yt}]]'],
err:'Usar ganchos de 90° en estribos de columnas sísmicas.',
x:[['cap2','Diseño por capacidad'],['col','Columnas'],['anc','Anclajes y empalmes'],['psh','Ductilidad']],
g:[
r=>{const ln=r.i(220,400,10),h=r.i(30,90,5);return{q:`Columna con ℓ_{n}=${ln} cm y mayor dimensión ${h} cm. Halla ℓ_{o}.`,a:Math.max(ln/6,h,50),u:'cm',s:[`= máx(${n(ln/6)}, ${h}, 50) = ${n(Math.max(ln/6,h,50))} cm`]};},
r=>{const db=r.p([1.27,1.59,1.91,2.54]),b=r.i(25,60,5);return{q:`Barra longitudinal menor de ${db} cm y menor dimensión ${b} cm. Halla s_{o}.`,a:Math.min(8*db,b/2,10),u:'cm',s:[`= mín(${n(8*db)}, ${b/2}, 10) = ${n(Math.min(8*db,b/2,10))} cm`]};},
r=>{const s=r.i(7.5,15,2.5),bc=r.i(25,70,5),fc=r.p([210,280,350]);return{q:`s=${s} cm, b_{c}=${bc} cm, f′_{c}=${fc}, f_{yt}=4200. Halla A_{sh} con 0.09sb_{c}f′_{c}/f_{yt}.`,a:.09*s*bc*fc/4200,u:'cm²',s:[`= 0.09·${s}·${bc}·${fc}/4200 = ${n(.09*s*bc*fc/4200)} cm²`]};},
r=>{const b=r.i(40,80,5),h=r.i(40,80,5),c=4,s=r.i(7.5,12.5,2.5),fc=r.p([280,350]);const bc=b-2*c,Ach=(b-2*c)*(h-2*c),Ag=b*h;const A1=.3*s*bc*fc/4200*(Ag/Ach-1),A2=.09*s*bc*fc/4200;return{q:`Columna ${b}×${h} cm, recubrimiento a ejes de estribos 4 cm, s=${s} cm, f′_{c}=${fc}, f_{yt}=4200. Halla A_{sh} requerido en la dirección de b_{c}=${bc} cm.`,a:Math.max(A1,A2),u:'cm²',s:[`A_{g}/A_{ch} = ${n(Ag/Ach)}`,`Expresión 1 = ${n(A1)}; expresión 2 = ${n(A2)}`,`A_{sh} = ${n(Math.max(A1,A2))} cm²`]};},
r=>{const ln=r.i(240,400,10),h=r.i(40,80,5),b=r.i(30,h,5),db=r.p([1.59,1.91,2.54]),sm=r.p([20,25,30]);const lo=Math.max(ln/6,h,50),so=Math.min(8*db,b/2,10);const nz=Math.ceil((lo-so/2)/so)+1,nc=Math.ceil((ln-2*lo)/sm)-1;return{q:`Columna de ℓ_{n}=${ln} cm, sección ${b}×${h} cm, barras de ${db} cm. En la zona central se usan estribos cada ${sm} cm. ¿Cuántos estribos tiene la columna? (primer estribo a s_{o}/2 de cada cara)`,a:2*nz+Math.max(nc,0),u:'estribos',tol:0,s:[`ℓ_{o} = ${n(lo)} cm; s_{o} = ${n(so)} cm`,`Por zona: ${nz}; dos zonas: ${2*nz}`,`Centro: ${Math.max(nc,0)}`,`Total = ${2*nz+Math.max(nc,0)}`]};}
],
cri:[
['Tras un sismo, una columna perdió el recubrimiento y sus barras se pandearon entre estribos muy separados. ¿Qué faltó?',['Más concreto','Estribos cercanos: el espaciamiento corto evita el pandeo de las barras','Más pintura','Barras más largas'],1,'Las barras comprimidas sin apoyo lateral cercano pandean. El límite de 8d_{b} existe para eso.'],
['¿Por qué no se empalman barras en la zona de rótula de una viga?',['Por estética','Porque esa zona tiene grandes deformaciones cíclicas y el empalme puede fallar','Porque no hay espacio','No hay problema'],1,'En la rótula el acero fluye en tensión y compresión alternadas; un empalme por traslape ahí se degrada y pierde adherencia.'],
['Una columna de 30×30 con ℓ_{n}=1.20 m entre vigas (columna corta por un muro alto):',['Es más dúctil','Tiende a fallar por corte de forma frágil: hay que confinarla en toda su altura o separar el muro','No necesita estribos','Es igual a una larga'],1,'Una columna corta es mucho más rígida y atrae más corte. Es un clásico de colegios peruanos dañados en sismos.']
],
ref:['Mander, Priestley y Park, Theoretical Stress-Strain Model for Confined Concrete (Journal of Structural Engineering, 1988)','ACI 318, capítulo 18; E.060, capítulo 21','Blanco Blasco, Estructuración y diseño de edificaciones de concreto armado']});
SUB('psh',{t:'Análisis no lineal y diseño por desempeño',
lec:`El análisis elástico con R es una simplificación. El **análisis estático no lineal (pushover)** empuja el modelo con cargas laterales crecientes hasta el colapso y dibuja la **curva de capacidad**: cortante basal contra desplazamiento del techo.

## Curva bilineal
Se idealiza con un tramo elástico de rigidez K_{e} hasta la fluencia (Δ_{y}, V_{y}) y un tramo plástico.

- Ductilidad de desplazamiento: μ = Δ_{u}/Δ_{y}

## Relación entre R y μ (Newmark y Hall)
- Periodos largos (igual desplazamiento): R = μ
- Periodos cortos a medios (igual energía): R = √(2μ − 1)

## Desplazamiento objetivo (ASCE 41)
δ_{t} = C_{0}C_{1}C_{2}S_{a}(T_{e}²/4π²)g

- C₀: pasa del sistema de 1 GDL al techo (≈ 1.2–1.5)
- C₁ y C₂: corrigen por comportamiento inelástico y degradación
- T_{e} = T_{i}√(K_{i}/K_{e})

## Niveles de desempeño (FEMA 356 / ASCE 41)
- Ocupación inmediata (IO)
- Seguridad de vida (LS)
- Prevención de colapso (CP)

Un hospital debe quedar en IO para el sismo de diseño; una vivienda, al menos en LS.`,
ded:`## Igual desplazamiento
Newmark y Hall observaron que, para periodos largos, un sistema inelástico y el elástico equivalente alcanzan casi el mismo desplazamiento máximo. Si el elástico llega a Δ con fuerza V_{e} y el inelástico fluye en V_{y} = V_{e}/R, su fluencia es Δ_{y} = Δ/R. Entonces μ = Δ/Δ_{y} = R.

## Igual energía
Para periodos cortos, se igualan las áreas bajo las curvas fuerza-desplazamiento. Elástico: ½V_{e}Δ_{e}. Inelástico: ½V_{y}Δ_{y} + V_{y}(Δ_{u} − Δ_{y}). Con V_{e} = RV_{y}, Δ_{e} = RΔ_{y} y Δ_{u} = μΔ_{y}: ½R² = ½ + (μ − 1), de donde R = √(2μ − 1).

## Desplazamiento objetivo
S_{a}T²/(4π²) es el desplazamiento espectral del oscilador de periodo T (de S_{a} = ω²S_{d}). Los coeficientes C lo trasladan al techo del edificio real y lo corrigen por inelasticidad (Chopra lo explica en el capítulo de sistemas inelásticos).`,
key:['μ = [[Δ_{u}|Δ_{y}]]','R = μ (T largo)','R = √{2μ − 1} (T corto)','δ_{t} = C_{0}C_{1}C_{2}S_{a}[[T_{e}^{2}|4π^{2}]]g'],
err:'Usar R = μ en edificios rígidos de periodo corto: subestima la fuerza.',
x:[['vf','Respuesta dinámica'],['mod','Análisis modal'],['cap2','Mecanismo'],['ais','Edificios aislados']],
g:[
r=>{const dy=r.i(1,8,.1),du=+(dy*r.i(1.5,8,.1)).toFixed(1);return{q:`Δ_{y}=${dy} cm y Δ_{u}=${du} cm. Halla μ.`,a:du/dy,u:'',s:[`= ${du}/${dy} = ${n(du/dy)}`]};},
r=>{const m=r.i(1.5,8,.1);return{q:`μ=${m} en un edificio de periodo largo. Halla R (igual desplazamiento).`,a:m,u:'',s:[`R = μ = ${m}`]};},
r=>{const m=r.i(1.5,8,.1);return{q:`μ=${m} en un edificio rígido (igual energía). Halla R.`,a:sq(2*m-1),u:'',s:[`R = √(2·${m} − 1) = ${n(sq(2*m-1))}`]};},
r=>{const Vy=r.i(100,2000,10),K=r.i(5000,80000,1000),du=r.i(5,40,.5);const dy=Vy/K*100;return{q:`Curva bilineal: V_{y}=${Vy} t y K_{e}=${K} t/m. El techo llega a ${du} cm. Halla la ductilidad demandada.`,a:du/dy,u:'',s:[`Δ_{y} = ${n(dy)} cm`,`μ = ${n(du/dy)}`]};},
r=>{const Ti=r.i(.3,1.5,.05),Ki=r.i(10000,80000,1000),Ke=Math.round(Ki*r.i(.6,.95,.05)),C0=r.p([1.2,1.3,1.4]),C1=r.p([1,1.1,1.2]),C2=r.p([1,1.1]),Sa=r.i(.3,1.2,.05);const Te=Ti*sq(Ki/Ke),dt=C0*C1*C2*Sa*Te*Te/(4*PI*PI)*G*100;return{q:`T_{i}=${Ti} s, K_{i}=${Ki}, K_{e}=${Ke} t/m, C₀=${C0}, C₁=${C1}, C₂=${C2}, S_{a}=${Sa}g. Halla el desplazamiento objetivo.`,a:dt,u:'cm',s:[`T_{e} = ${n(Te)} s`,`δ_{t} = ${n(dt)} cm`]};}
],
cri:[
['Un pushover muestra que el edificio colapsa formando rótulas solo en las columnas del primer piso. ¿Qué indica?',['Buen diseño','Un mecanismo de piso blando: hay que reforzar columnas o agregar muros','Que el sismo es pequeño','Nada'],1,'El mecanismo deseado es de vigas. Rótulas solo en columnas de un piso es la firma del colapso por piso blando.'],
['¿Qué ventaja tiene el diseño por desempeño sobre el uso directo de R?',['Es más corto','Verifica explícitamente cuánto daño tendrá el edificio para cada nivel de sismo','No usa normas','No requiere modelo'],1,'R es un factor global; el desempeño mira deformaciones y daño reales, útil para hospitales y para reforzar edificios existentes.'],
['Dos edificios con el mismo R: uno de 2 pisos muy rígido y uno de 20 pisos. ¿Cuál necesita más ductilidad para el mismo R?',['El de 20','El de 2 pisos: con periodo corto R = √(2μ − 1) exige μ mayor','Igual','Ninguno'],1,'Con igual energía, para R = 6 se necesita μ = 18.5; con igual desplazamiento basta μ = 6. Los edificios rígidos y bajos son muy exigentes.']
],
ref:['Newmark y Hall, Earthquake Spectra and Design (EERI, 1982)','Chopra, Dynamics of Structures (sistemas inelásticos)','FEMA 356 y ASCE 41, Seismic Evaluation and Retrofit of Existing Buildings','ATC-40, Seismic Evaluation and Retrofit of Concrete Buildings']});
SUB('alar',{t:'Albañilería armada',
lec:`En la **albañilería armada** el refuerzo va dentro de los muros: barras verticales en los alvéolos de bloques o ladrillos huecos, rellenos con concreto líquido (grout), y refuerzo horizontal en las juntas o en vigas soleras. No necesita columnas de confinamiento.

## Diferencias con la confinada
- El muro trabaja como un elemento armado: el acero vertical resiste flexión y el horizontal, corte
- Exige mano de obra especializada y control del llenado de alvéolos
- Se usan unidades sílico-calcáreas o de concreto con alvéolos alineados

## Resistencia al corte (E.070)
V_{m} = 0.5v′_{m}·α·t·L + 0.23P_{g}, con 1/3 ≤ α = V_{e}L/M_{e} ≤ 1

## Flexión simplificada
Con el acero vertical concentrado en los extremos: M_{n} ≈ A_{s}f_{y}D, con D ≈ 0.8L.

## Cuantías
Los refuerzos vertical y horizontal tienen cuantías mínimas (ρ = A_{s}/(s·t)) que fija la E.070. Usa la tabla vigente; aquí se dan como dato.

## Grout
Volumen = número de alvéolos rellenos × área del alvéolo × altura.`,
ded:`## De dónde sale α
El corte resistente depende de la esbeltez del muro: un muro bajo y largo (M/(VL) pequeño) falla por corte con un puntal diagonal muy eficiente; uno alto y esbelto, menos. α = V_{e}L/M_{e} mide esa esbeltez. San Bartolomé calibró la fórmula con ensayos de muros a escala natural en la PUCP: por eso aparece la carga vertical P_{g}, que cierra las fisuras diagonales y aumenta el corte resistente (0.23P_{g}, como un coeficiente de fricción).

## De dónde sale M_{n} = A_{s}f_{y}D
Igual que en una viga: la fuerza de tensión del acero de un extremo (A_{s}f_{y}) y la compresión en el otro forman un par. El brazo de palanca de un muro sin carga axial grande es cerca del 80 % de su longitud.`,
key:['V_{m} = 0.5v′_{m}αtL + 0.23P_{g}','α = [[V_{e}L|M_{e}]]','M_{n} ≈ A_{s}f_{y}(0.8L)','ρ = [[A_{s}|st]]'],
err:'Dejar alvéolos sin rellenar o con vacíos: el acero no queda anclado.',
x:[['alb','Albañilería confinada'],['alb2','Ensayos de albañilería'],['fle','Par interno']],
g:[
r=>{const nc=r.i(5,60,1),A=r.i(30,120,5),h=r.i(2.4,3,.1);return{q:`${nc} alvéolos rellenos de ${A} cm² cada uno, en un muro de ${h} m. Halla el volumen de grout en litros.`,a:nc*A*h*100/1000,u:'L',s:[`= ${nc}·${A}·${h*100}/1000 = ${n(nc*A*h*100/1000)} L`]};},
r=>{const As=r.i(.71,2.84,.01),s=r.i(20,80,5),t=r.i(12,24,1);return{q:`A_{s}=${As} cm² cada ${s} cm en un muro de t=${t} cm. Halla ρ.`,a:As/(s*t),u:'',tol:.01,s:[`ρ = ${n(As/(s*t),4)}`]};},
r=>{const rho=r.p([.0007,.001,.0015,.002]),t=r.i(12,24,1),s=r.i(20,60,5);return{q:`Cuantía mínima ${rho}, t=${t} cm, s=${s} cm. Halla el área de acero por cada línea.`,a:rho*s*t,u:'cm²',s:[`A_{s} = ${rho}·${s}·${t} = ${n(rho*s*t)} cm²`]};},
r=>{const vm=r.i(5,12,.1),t=r.i(13,24,1),L=r.i(2,6,.5),Pg=r.i(5,40,1),Ve=r.i(5,30,1),Me=r.i(5,80,1);const a=Math.min(Math.max(Ve*L/Me,1/3),1);return{q:`v′_{m}=${vm} kg/cm², t=${t} cm, L=${L} m, P_{g}=${Pg} t, V_{e}=${Ve} t, M_{e}=${Me} t·m. Halla V_{m}.`,a:.5*vm*a*t*L*100/1000+.23*Pg,u:'t',s:[`α = ${n(Ve*L/Me)} → ${n(a)}`,`V_{m} = ${n(.5*vm*a*t*L*100/1000+.23*Pg)} t`]};},
r=>{const L=r.i(2,6,.25),Mu=r.i(5,60,1),phi=.85,fy=4200,db=r.p([[1.27,1.29],[1.59,2],[1.91,2.84]]);const As=Mu*1e5/(phi*fy*.8*L*100),nb=Math.ceil(As/db[1]);return{q:`Muro armado de L=${L} m con M_{u}=${Mu} t·m. Con φ=0.85, f_{y}=4200 y D=0.8L, ¿cuántas barras de ${db[0]} cm (A=${db[1]} cm²) en cada extremo?`,a:nb,u:'barras',tol:0,s:[`A_{s} = ${Mu}·10⁵/(0.85·4200·${n(.8*L*100)}) = ${n(As)} cm²`,`n = ⌈${n(As)}/${db[1]}⌉ = ${nb}`]};}
],
cri:[
['En una obra de albañilería armada los alvéolos se rellenan solo hasta la mitad "porque el grout es caro". ¿Consecuencia?',['Ninguna','El acero vertical queda sin adherencia en la mitad superior y el muro no desarrolla su resistencia','Mejora la ductilidad','Baja el peso y mejora el sismo'],1,'Sin grout el acero no está anclado al muro: el refuerzo deja de trabajar justo donde puede necesitarse.'],
['¿Cuándo conviene armada en vez de confinada?',['Siempre','En muros con unidades alveolares industriales y mano de obra calificada, por rapidez y sin columnas','Nunca','Solo en adobe'],1,'La armada elimina encofrados de columnas, pero exige control riguroso de llenado y de la calidad de las unidades.']
],
ref:['San Bartolomé, Quiun y Silva, Diseño y construcción de estructuras sismorresistentes de albañilería (PUCP)','E.070 Albañilería','Paulay y Priestley, parte de albañilería']});

EXT('m11');
SUB('blq',{t:'Bloque de cortante y grupos excéntricos',
lec:`En una conexión empernada, el elemento puede romperse arrancando un "bloque": cortante en un plano y tensión en otro. AISC 360 (J4.3):

R_{n} = 0.6F_{u}A_{nv} + U_{bs}F_{u}A_{nt} ≤ 0.6F_{y}A_{gv} + U_{bs}F_{u}A_{nt}, con φ = 0.75

- A_{gv}: área bruta a cortante; A_{nv}: área neta a cortante (descontando agujeros)
- A_{nt}: área neta a tensión
- U_{bs} = 1 si la tensión es uniforme

Para agujeros estándar, el diámetro de cálculo es d_{h} = d + 1/8″ (≈ d + 3 mm), y para el área neta se suma 1/16″ más.

## Grupos de pernos excéntricos (método elástico)
Una carga P con excentricidad e produce corte directo P/n en cada perno y un momento M = P·e que se reparte en proporción a la distancia al centroide:

R_{x} = M·y/Σr², R_{y} = P/n + M·x/Σr². El perno más alejado es el crítico.`,
ded:`## Por qué dos expresiones
El bloque puede fallar de dos formas: rotura por cortante a lo largo de la sección neta (0.6F_{u}A_{nv}) o fluencia por cortante de la sección bruta (0.6F_{y}A_{gv}). En ambas, la cara a tensión se rompe (U_{bs}F_{u}A_{nt}). Manda la menor. El 0.6 viene de von Mises: la resistencia a cortante es 1/√3 ≈ 0.6 de la resistencia a tensión.

## El método elástico
Se supone la plancha rígida y los pernos elásticos: la plancha gira alrededor del centroide del grupo y cada perno se deforma en proporción a su distancia r. Si la fuerza es proporcional a la deformación, F_{i} = k·r_{i}. Por equilibrio M = Σk·r_{i}² y entonces F_{i} = M·r_{i}/Σr². Es exactamente la misma idea que τ = T·r/J en torsión (Salmon y Johnson).`,
key:['R_{n} = 0.6F_{u}A_{nv} + U_{bs}F_{u}A_{nt}','≤ 0.6F_{y}A_{gv} + U_{bs}F_{u}A_{nt}','F = [[M·r|Σr^{2}]]'],
err:'Revisar solo el corte de los pernos y olvidar el desgarramiento del bloque.',
x:[['per','Conexiones básicas'],['tor','Es como τ = Tr/J'],['ten','Área neta']],
g:[
r=>{const Lv=r.i(10,40,.5),nb=r.i(2,5,1),dh=r.p([1.75,2.06,2.38]),t=r.p([.635,.794,.953,1.27]);return{q:`Plano a cortante de ${Lv} cm con ${nb} pernos (agujeros de ${dh} cm) y t=${t} cm. Halla A_{nv}.`,a:(Lv-(nb-.5)*dh)*t,u:'cm²',s:[`= (${Lv} − ${nb-.5}·${dh})·${t} = ${n((Lv-(nb-.5)*dh)*t)} cm²`]};},
r=>{const Lt=r.i(3,12,.5),dh=r.p([1.75,2.06,2.38]),t=r.p([.635,.794,.953,1.27]);return{q:`Plano a tensión de ${Lt} cm, agujero de ${dh} cm, t=${t} cm. Halla A_{nt}.`,a:(Lt-.5*dh)*t,u:'cm²',s:[`= (${Lt} − 0.5·${dh})·${t} = ${n((Lt-.5*dh)*t)} cm²`]};},
r=>{const Agv=r.i(5,40,.5),Anv=+(Agv*r.i(.6,.85,.01)).toFixed(2),Ant=r.i(1,8,.1),Fy=2530,Fu=4080;const R1=.6*Fu*Anv+Fu*Ant,R2=.6*Fy*Agv+Fu*Ant;return{q:`A_{gv}=${Agv}, A_{nv}=${Anv}, A_{nt}=${Ant} cm², acero A36 (F_{y}=2530, F_{u}=4080 kg/cm²), U_{bs}=1. Halla R_{n}.`,a:Math.min(R1,R2)/1000,u:'t',s:[`Rotura: ${n(R1/1000)} t`,`Fluencia: ${n(R2/1000)} t`,`R_{n} = ${n(Math.min(R1,R2)/1000)} t`]};},
r=>{const nb=r.i(2,5,1),s=r.p([7.5,8,10]),le=r.p([3.5,4,5]),Lt=r.p([3.5,4,5]),dh=2.06,t=r.p([.794,.953,1.27]);const Lv=le+(nb-1)*s,Agv=Lv*t,Anv=(Lv-(nb-.5)*dh)*t,Ant=(Lt-.5*dh)*t;const R=Math.min(.6*4080*Anv+4080*Ant,.6*2530*Agv+4080*Ant);return{q:`Plancha A36 de t=${t} cm con una línea de ${nb} pernos de 3/4″ (agujeros 2.06 cm), paso ${s} cm, distancia al borde ${le} cm y distancia lateral ${Lt} cm. Halla φR_{n} por bloque de cortante.`,a:.75*R/1000,u:'t',s:[`A_{gv} = ${n(Agv)}, A_{nv} = ${n(Anv)}, A_{nt} = ${n(Ant)} cm²`,`R_{n} = ${n(R/1000)} t`,`φR_{n} = ${n(.75*R/1000)} t`]};},
r=>{const nb=r.p([3,4,5,6]),s=r.p([7.5,8,10]),P=r.i(5,40,1),e=r.i(10,40,1);const ys=Array.from({length:nb},(_,i)=>(i-(nb-1)/2)*s),Sr=ys.reduce((a,y)=>a+y*y,0),ym=ys[nb-1];const Rx=P*e*ym/Sr,Ry=P/nb;return{q:`Una línea vertical de ${nb} pernos a ${s} cm recibe P=${P} t vertical con excentricidad ${e} cm. Halla la fuerza en el perno más cargado (método elástico).`,a:Math.hypot(Rx,Ry),u:'t',s:[`Σr² = ${n(Sr)} cm²`,`R_{x} = M·y/Σr² = ${n(Rx)} t; R_{y} = P/n = ${n(Ry)} t`,`R = ${n(Math.hypot(Rx,Ry))} t`]};}
],
cri:[
['Una plancha delgada con pernos muy cerca del borde:',['Es más resistente','Puede fallar por bloque de cortante o desgarramiento antes que los pernos','No cambia nada','Fluye la soldadura'],1,'Distancias al borde pequeñas reducen las áreas del bloque. Por eso AISC fija distancias mínimas al borde.'],
['El método elástico para grupos excéntricos frente al de centro instantáneo:',['Es menos conservador','Es más conservador y más simple','Es igual','No se usa'],1,'El método del centro instantáneo considera la redistribución plástica entre pernos y da capacidades mayores; el elástico es seguro y sencillo para cálculos a mano.']
],
ref:['AISC 360, Specification for Structural Steel Buildings, sección J4.3','Salmon, Johnson y Malhas, Steel Structures: Design and Behavior','McCormac, Diseño de estructuras de acero']});

EXT('m14');
SUB('bsh',{t:'Taludes por dovelas: Fellenius y Bishop',
lec:`Para superficies de falla circulares se divide la masa deslizante en **dovelas** (franjas verticales). En cada una actúan su peso W, la resistencia en su base y las fuerzas entre dovelas.

## Fellenius (método ordinario)
Ignora las fuerzas entre dovelas:

FS = Σ[c·b·sec α + W·cos α·tan φ]/Σ(W·sen α)

## Bishop simplificado
Considera las fuerzas horizontales entre dovelas:

FS = Σ[(c·b + W·tan φ)/m_{α}]/Σ(W·sen α), con m_{α} = cos α + sen α·tan φ/FS

Como FS aparece en ambos lados, se itera: se supone un FS, se calcula m_{α}, se obtiene un nuevo FS y se repite hasta que no cambie.

- b: ancho de la dovela; α: inclinación de su base, positiva en la parte alta del círculo y negativa cerca del pie, donde la base sube
- Con presión de poros se reemplaza W por (W − u·b) en el término de fricción

Fellenius suele dar FS de 5 a 20 % menores que Bishop: es conservador. Hay métodos más completos (Spencer, Morgenstern-Price) que satisfacen todas las condiciones de equilibrio.`,
ded:`## De dónde sale Fellenius
En la base de cada dovela, la fuerza normal es N = W·cos α (proyectando el peso, si se ignoran fuerzas laterales). La resistencia disponible es c·ℓ + N·tan φ, con ℓ = b·sec α la longitud de la base. Se toman momentos respecto al centro del círculo: el peso empuja con W·sen α·R y la resistencia se opone con (c·ℓ + N tan φ)·R. El radio R se cancela y queda la fórmula.

## De dónde sale Bishop
Bishop (1955) planteó equilibrio vertical de cada dovela, con la fuerza cortante movilizada en la base igual a la resistencia dividida entre FS. Al despejar N aparece el término m_{α}. El método satisface el equilibrio de momentos global y el vertical de cada dovela, pero no el horizontal; aun así es muy preciso para círculos.`,
key:['FS_{F} = [[Σ(cb sec α + W cos α tan φ)|ΣW sen α]]','FS_{B} = [[Σ(cb + W tan φ)/m_{α}|ΣW sen α]]','m_{α} = cos α + [[sen α tan φ|FS]]'],
err:'Usar el FS de Fellenius como si fuera exacto en taludes con presión de poros alta: puede ser muy conservador o mal aplicado.',
x:[['tal','Taludes infinitos'],['res','Resistencia al corte'],['num','Iteración numérica']],
g:[
r=>{const W=r.i(50,500,5),a=r.i(-10,50,1),c=r.i(0,30,1),f=r.i(20,38,1),b=r.i(1,5,.5);return{q:`Dovela con W=${W} kN, α=${a}°, b=${b} m, c=${c} kPa, φ=${f}°. Halla su resistencia de Fellenius cb sec α + W cos α tan φ.`,a:c*b/cosd(a)+W*cosd(a)*tand(f),u:'kN',s:[`= ${n(c*b/cosd(a))} + ${n(W*cosd(a)*tand(f))} = ${n(c*b/cosd(a)+W*cosd(a)*tand(f))} kN`]};},
r=>{const d=[[r.i(50,200,5),r.i(-5,10,1)],[r.i(150,400,5),r.i(15,30,1)],[r.i(80,250,5),r.i(35,55,1)]],c=r.i(5,25,1),f=r.i(20,35,1),b=2;const R=d.reduce((s,[W,a])=>s+c*b/cosd(a)+W*cosd(a)*tand(f),0),D=d.reduce((s,[W,a])=>s+W*sind(a),0);return{q:`Tres dovelas de b=2 m (W en kN, α): ${d.map(x=>'('+x.join(', ')+'°)').join(', ')}. c=${c} kPa, φ=${f}°. Halla FS por Fellenius.`,a:R/D,u:'',s:[`Σresistencia = ${n(R)} kN`,`Σ W sen α = ${n(D)} kN`,`FS = ${n(R/D)}`]};},
r=>{const a=r.i(-10,55,1),f=r.i(20,38,1),F=r.i(1,2,.05);return{q:`α=${a}°, φ=${f}°, FS supuesto ${F}. Halla m_{α}.`,a:cosd(a)+sind(a)*tand(f)/F,u:'',s:[`= cos ${a}° + sen ${a}°·tan ${f}°/${F} = ${n(cosd(a)+sind(a)*tand(f)/F)}`]};},
r=>{const d=[[r.i(50,200,5),r.i(-5,10,1)],[r.i(150,400,5),r.i(15,30,1)],[r.i(80,250,5),r.i(35,55,1)]],c=r.i(5,25,1),f=r.i(20,35,1),b=2,F0=r.i(1,1.6,.1);const D=d.reduce((s,[W,a])=>s+W*sind(a),0),N=d.reduce((s,[W,a])=>s+(c*b+W*tand(f))/(cosd(a)+sind(a)*tand(f)/F0),0);return{q:`Mismas tres dovelas (b=2 m): ${d.map(x=>'('+x.join(', ')+'°)').join(', ')}, c=${c}, φ=${f}°. Haz una iteración de Bishop partiendo de FS=${F0}.`,a:N/D,u:'',s:[`Σ(cb + W tan φ)/m_{α} = ${n(N)}`,`Σ W sen α = ${n(D)}`,`FS₁ = ${n(N/D)}`]};},
r=>{const d=[[r.i(50,200,5),r.i(-5,10,1)],[r.i(150,400,5),r.i(15,30,1)],[r.i(150,350,5),r.i(30,45,1)],[r.i(50,150,5),r.i(50,65,1)]],c=r.i(5,25,1),f=r.i(20,35,1),b=2;const D=d.reduce((s,[W,a])=>s+W*sind(a),0);let F=1.2;for(let i=0;i<50;i++)F=d.reduce((s,[W,a])=>s+(c*b+W*tand(f))/(cosd(a)+sind(a)*tand(f)/F),0)/D;const Ff=d.reduce((s,[W,a])=>s+c*b/cosd(a)+W*cosd(a)*tand(f),0)/D;return{q:`Cuatro dovelas de b=2 m (W en kN, α): ${d.map(x=>'('+x.join(', ')+'°)').join(', ')}. c=${c} kPa, φ=${f}°. Itera Bishop hasta converger y halla FS.`,a:F,u:'',s:[`Fellenius da ${n(Ff)} (punto de partida razonable)`,`Iterando m_{α} con cada nuevo FS converge a ${n(F)}`]};}
],
cri:[
['Tras lluvias intensas, el FS de un talud baja. ¿Por qué, en términos de la fórmula?',['Sube el peso y nada más','Sube la presión de poros u y baja la fuerza normal efectiva que da fricción','Baja la cohesión siempre a cero','No cambia'],1,'La resistencia por fricción depende de la normal efectiva (W − ub). Con agua, u aumenta y la resistencia cae: por eso los deslizamientos ocurren en temporada de lluvias.'],
['¿Dónde conviene colocar un relleno de pie (berma) para estabilizar?',['En la cabeza del talud','En el pie, donde α es negativo o pequeño: suma resistencia sin sumar empuje','En el centro','No sirve'],1,'Un peso en el pie aumenta la resistencia y casi no aumenta la fuerza motriz. Cargar la cabeza hace lo contrario.']
],
ref:['Bishop, The use of the slip circle in the stability analysis of slopes (Géotechnique, 1955)','Duncan, Wright y Brandon, Soil Strength and Slope Stability','Das, Fundamentos de ingeniería geotécnica']});

EXT('m30');
SUB('dsu',{t:'Dinámica de suelos y efecto de sitio',
lec:`En Lima y Pisco se vio que los suelos blandos amplifican el sismo. La **dinámica de suelos** explica por qué.

## Velocidad de onda de corte
El suelo se caracteriza por V_{s}: cuanto más rígido, más rápido viaja la onda.
- Módulo de corte máximo: G_{máx} = ρV_{s}²
- Con deformaciones grandes, G baja (curvas G/G_{máx}) y el amortiguamiento sube

## V_{s30}
Promedio de los primeros 30 m, calculado con los tiempos de viaje:

V_{s30} = 30/Σ(h_{i}/V_{si})

Es el parámetro que usan la E.030 (versión 2026) y muchas normas para clasificar el suelo.

## Periodo del estrato
Un depósito de espesor H sobre roca tiene periodo fundamental T_{s} = 4H/V_{s}.

Si el periodo del edificio se parece a T_{s} hay **resonancia** y la amplificación es grande. El periodo aproximado de un edificio según la E.030 es T = h_{n}/C_{T}, con C_{T} = 35, 45 o 60 según el sistema estructural.`,
ded:`## De dónde sale T = 4H/V_{s}
En un estrato uniforme sobre base rígida, la superficie es libre (esfuerzo nulo) y la base no se mueve. La onda de corte de modo fundamental tiene un cuarto de longitud de onda en el espesor: λ = 4H. Con V = λ·f: f = V_{s}/(4H) y T = 4H/V_{s} (Kramer, Geotechnical Earthquake Engineering).

## Por qué se promedia con tiempos
V_{s30} no es el promedio de las velocidades, sino la velocidad que tendría un suelo uniforme que la onda atraviesa en el mismo tiempo. Tiempo total = Σh_{i}/V_{si}; velocidad equivalente = 30 m/tiempo. Las capas lentas pesan más, como debe ser.

## G = ρV_{s}²
De la ecuación de onda de corte en un medio elástico: ∂²u/∂t² = (G/ρ)·∂²u/∂z², donde √(G/ρ) es la velocidad de propagación.`,
key:['G_{máx} = ρV_{s}^{2}','V_{s30} = [[30|Σh_{i}/V_{si}]]','T_{s} = [[4H|V_{s}]]','T = [[h_{n}|C_{T}]]'],
err:'Promediar las velocidades de las capas aritméticamente.',
x:[['vf','Resonancia'],['esp','Parámetro S de la E.030'],['liq','Suelos que pierden rigidez'],['geo4','Refracción sísmica']],
g:[
r=>{const rho=r.i(1.6,2.2,.05),V=r.i(100,800,10);return{q:`ρ=${rho} t/m³ y V_{s}=${V} m/s. Halla G_{máx} en MPa.`,a:rho*V*V/1000,u:'MPa',s:[`= ${rho}·${V}²/1000 = ${n(rho*V*V/1000)} MPa`]};},
r=>{const H=r.i(5,80,1),V=r.i(100,600,10);return{q:`Estrato de ${H} m con V_{s}=${V} m/s sobre roca. Halla T_{s}.`,a:4*H/V,u:'s',s:[`= 4·${H}/${V} = ${n(4*H/V)} s`]};},
r=>{const h=[r.i(2,10,1),r.i(5,12,1)],v=[r.i(120,250,10),r.i(250,500,10),r.i(400,900,10)];const h3=30-h[0]-h[1];return{q:`Capas: ${h[0]} m a ${v[0]} m/s, ${h[1]} m a ${v[1]} m/s y ${h3} m a ${v[2]} m/s. Halla V_{s30}.`,a:30/(h[0]/v[0]+h[1]/v[1]+h3/v[2]),u:'m/s',s:[`Tiempo = ${n(h[0]/v[0]+h[1]/v[1]+h3/v[2],4)} s`,`V_{s30} = ${n(30/(h[0]/v[0]+h[1]/v[1]+h3/v[2]))} m/s`]};},
r=>{const G=r.i(20,300,5),f=r.i(.2,.9,.05),rho=r.i(1.7,2.1,.05);return{q:`G_{máx}=${G} MPa y G/G_{máx}=${f} por deformación grande. ρ=${rho} t/m³. Halla el V_{s} efectivo.`,a:sq(G*f*1000/rho),u:'m/s',s:[`G = ${n(G*f)} MPa`,`V_{s} = √(G/ρ) = ${n(sq(G*f*1000/rho))} m/s`]};},
r=>{const h=[r.i(5,15,1),r.i(5,20,1)],v=[r.i(120,250,10),r.i(250,450,10)],hn=r.i(9,45,3),CT=r.p([35,45,60]);const H=h[0]+h[1],Vb=H/(h[0]/v[0]+h[1]/v[1]),Ts=4*H/Vb,T=hn/CT;return{q:`Depósito sobre roca: ${h[0]} m a ${v[0]} m/s y ${h[1]} m a ${v[1]} m/s. Edificio de ${hn} m con C_{T}=${CT}. Halla T_{edificio}/T_{s} (cerca de 1 hay riesgo de resonancia).`,a:T/Ts,u:'',s:[`V̄_{s} = ${n(Vb)} m/s → T_{s} = ${n(Ts)} s`,`T = ${hn}/${CT} = ${n(T)} s`,`T/T_{s} = ${n(T/Ts)}`]};}
],
cri:[
['¿Por qué en el sismo de 1974 los edificios de 5 a 10 pisos se dañaron más en ciertas zonas de Lima con suelo blando?',['Por mala suerte','Porque su periodo se acercaba al del suelo y entraron en resonancia','Porque eran nuevos','Por la lluvia'],1,'El periodo de edificios medianos coincidía con el de depósitos blandos profundos: la amplificación fue máxima en esa combinación.'],
['Un suelo que se ablanda durante el sismo (G/G_{máx} baja):',['Sube su periodo','Baja su periodo','No cambia','Se vuelve roca'],0,'Con G menor, V_{s} baja y T_{s} = 4H/V_{s} sube. El suelo "se alarga" durante el sismo fuerte.']
],
ref:['Kramer, Geotechnical Earthquake Engineering (1996)','Ishihara, Soil Behaviour in Earthquake Geotechnics','E.030 (2026) y su clasificación por V_{s30}']});

EXT('m31');
SUB('mar',{t:'Hidráulica marítima y obras de defensa',
lec:`El Perú tiene más de 3000 km de costa: puertos, muelles, espigones y defensas ribereñas necesitan entender las olas.

## Olas en aguas profundas
- Longitud: L_{0} = gT²/(2π) ≈ 1.56T² (m, con T en s)
- Celeridad: C_{0} = L_{0}/T = gT/(2π)

## Aguas someras (h < L/20)
C = √(gh): la ola se frena al acercarse a la orilla, se acorta y crece.

## Rotura
La ola rompe cuando su altura llega a aproximadamente 0.78 veces la profundidad: H_{b} ≈ 0.78h_{b}.

## Rompeolas de enrocado (Hudson)
Peso de cada roca de la coraza:

W = γ_{r}H³/(K_{D}·Δ³·cot θ), con Δ = γ_{r}/γ_{w} − 1

- γ_{w} ≈ 1.025 t/m³ (agua de mar)
- K_{D}: coeficiente de estabilidad (≈ 2 a 4 para roca, más para piezas prefabricadas como tetrápodos)
- θ: ángulo del talud`,
ded:`## De dónde sale L₀ = gT²/2π
La teoría lineal de Airy da la relación de dispersión ω² = gk·tanh(kh), con ω = 2π/T y k = 2π/L. En aguas profundas tanh(kh) → 1, así que ω² = gk. Reemplazando: (2π/T)² = g·2π/L, de donde L = gT²/(2π). En aguas someras tanh(kh) ≈ kh, entonces ω² = gk²h y C = ω/k = √(gh).

## Por qué el peso de Hudson va con H³
La fuerza de la ola sobre una roca es proporcional a ρ·g·H·D² (presión por área), y la resistencia es el peso sumergido, proporcional a (γ_{r} − γ_{w})D³. Igualando, el tamaño necesario D crece con H, y el peso con D³, es decir con H³. Por eso duplicar la ola de diseño exige rocas ocho veces más pesadas (Shore Protection Manual del USACE).`,
key:['L_{0} = [[gT^{2}|2π]]','C = √{gh}','H_{b} ≈ 0.78h_{b}','W = [[γ_{r}H^{3}|K_{D}Δ^{3}cot θ]]'],
err:'Diseñar el enrocado con la altura media de las olas en vez de la de diseño.',
x:[['fbe','Energía del agua'],['sim','Modelos de Froude'],['soc','Socavación']],
g:[
r=>{const T=r.i(4,20,.5);return{q:`Ola de periodo T=${T} s en aguas profundas. Halla L₀.`,a:G*T*T/(2*PI),u:'m',s:[`= 9.81·${T}²/(2π) = ${n(G*T*T/(2*PI))} m`]};},
r=>{const T=r.i(4,20,.5);return{q:`T=${T} s en aguas profundas. Halla C₀.`,a:G*T/(2*PI),u:'m/s',s:[`= ${n(G*T/(2*PI))} m/s`]};},
r=>{const h=r.i(.5,10,.1);return{q:`Ola en aguas someras de h=${h} m. Halla C.`,a:sq(G*h),u:'m/s',s:[`= √(9.81·${h}) = ${n(sq(G*h))} m/s`]};},
r=>{const H=r.i(.5,6,.1);return{q:`Una ola de ${H} m rompe. ¿A qué profundidad aproximada?`,a:H/.78,u:'m',s:[`h_{b} = ${H}/0.78 = ${n(H/.78)} m`]};},
r=>{const H=r.i(1,5,.1),gr=r.i(2.5,2.8,.05),KD=r.p([2,2.5,3,4]),ct=r.p([1.5,2,2.5,3]);const D=gr/1.025-1,W=gr*H**3/(KD*D**3*ct);return{q:`Rompeolas con ola de diseño H=${H} m, roca de γ_{r}=${gr} t/m³, K_{D}=${KD}, talud cot θ=${ct}. Halla el peso de cada roca de la coraza.`,a:W,u:'t',s:[`Δ = ${gr}/1.025 − 1 = ${n(D)}`,`W = ${gr}·${H}³/(${KD}·${n(D)}³·${ct}) = ${n(W)} t`]};}
],
cri:[
['Para proteger un malecón, ¿qué es más barato a largo plazo?',['Rocas pequeñas que se reponen cada año','Rocas del peso de diseño: las pequeñas se las lleva el mar y se pierde todo','Concreto pintado','Arena'],1,'Por Hudson, rocas más livianas que W se mueven con la ola de diseño. Reponerlas cada temporada sale más caro que hacerlo bien.'],
['¿Por qué las olas crecen al llegar a la playa?',['Por el viento de la playa','Porque se frenan (C = √(gh)) y la energía se concentra en menos longitud','Por la marea','No crecen'],1,'Al bajar la profundidad la ola se frena y se acorta; para conservar el flujo de energía, su altura aumenta hasta romper.']
],
ref:['US Army Corps of Engineers, Shore Protection Manual y Coastal Engineering Manual','Dean y Dalrymple, Water Wave Mechanics for Engineers and Scientists','Hudson, Laboratory investigation of rubble-mound breakwaters (1959)']});

EXT('m19');
SUB('cu4',{t:'Planificación del transporte: modelo de 4 etapas',
lec:`¿Cuántos viajes habrá, a dónde irán, en qué medio y por qué ruta? El **modelo de cuatro etapas** responde en orden:

## 1. Generación
Viajes producidos y atraídos por cada zona, por regresión: P = a + b·población, A = c + d·empleos.

## 2. Distribución (modelo gravitacional)
T_{ij} = P_{i}·A_{j}F_{ij}/Σ_{k}(A_{k}F_{ik}), con F_{ij} = 1/t_{ij}^{n} (fricción por tiempo de viaje; n ≈ 2).

Como en la gravedad de Newton: más atracción y menos distancia, más viajes.

## 3. Partición modal (logit)
P_{m} = e^{U_{m}}/Σe^{U_{k}}, con la utilidad U = β₀ + β₁·tiempo + β₂·costo (los β de tiempo y costo son negativos).

## 4. Asignación
Los viajes se cargan a la red. El tiempo crece con la congestión (función BPR):

t = t_{0}[1 + 0.15(V/C)⁴]

Así se justifica un metro, un corredor de buses o una vía expresa.`,
ded:`## De dónde sale el logit
Se supone que la utilidad real de cada modo es U_{m} + ε_{m}, con ε un error aleatorio de distribución de Gumbel. McFadden (premio Nobel 2000) demostró que, con esa hipótesis, la probabilidad de que un modo sea el de mayor utilidad es exactamente e^{U_{m}}/Σe^{U_{k}}. La distribución de Gumbel es la misma de extremos que se usa en hidrología.

## Por qué el gravitacional se normaliza
Sin el denominador, la suma de viajes que salen de i no sería P_{i}. Dividir entre Σ A_{k}F_{ik} reparte exactamente los P_{i} viajes entre los destinos, en proporción a su atractivo relativo.

## La función BPR
El Bureau of Public Roads ajustó datos de autopistas: con V/C = 1 el tiempo sube 15 %; con V/C = 1.5, más de 75 %. El exponente 4 representa lo rápido que se degrada el flujo cerca de la capacidad.`,
key:['T_{ij} = P_{i}[[A_{j}F_{ij}|ΣA_{k}F_{ik}]]','F = [[1|t^{n}]]','P_{m} = [[e^{U_{m}}|Σe^{U_{k}}]]','t = t_{0}[1 + 0.15([[V|C]])^{4}]'],
err:'Proyectar el tráfico solo con una tasa de crecimiento, sin modelar a dónde van los viajes ni en qué medio.',
x:[['reg','Regresión'],['cvs','Capacidad vial'],['gum','Distribución de Gumbel'],['vpn','Evaluar el proyecto']],
g:[
r=>{const a=r.i(100,2000,50),b=r.i(.5,3,.1),P=r.i(5000,200000,1000);return{q:`P = ${a} + ${b}·población. Zona de ${P} habitantes. Halla los viajes producidos.`,a:a+b*P,u:'viajes/día',s:[`= ${a} + ${b}·${P} = ${n(a+b*P)}`]};},
r=>{const P=r.i(1000,20000,100),A=[r.i(1000,10000,100),r.i(1000,10000,100)],t=[r.i(5,40,1),r.i(5,40,1)];const F=t.map(x=>1/(x*x)),D=A[0]*F[0]+A[1]*F[1];return{q:`Zona con P=${P} viajes. Destinos: A₁=${A[0]} (t=${t[0]} min) y A₂=${A[1]} (t=${t[1]} min). Con F=1/t², halla T₁.`,a:P*A[0]*F[0]/D,u:'viajes',s:[`T₁ = ${P}·${A[0]}/${t[0]}² / (${n(D,5)}) = ${n(P*A[0]*F[0]/D)}`]};},
r=>{const Ua=r.i(-3,0,.1),Ub=r.i(-3,0,.1);return{q:`U_{auto}=${Ua} y U_{bus}=${Ub}. Halla la probabilidad de elegir bus.`,a:Math.exp(Ub)/(Math.exp(Ua)+Math.exp(Ub)),u:'',s:[`= e^{${Ub}}/(e^{${Ua}} + e^{${Ub}}) = ${n(Math.exp(Ub)/(Math.exp(Ua)+Math.exp(Ub)))}`]};},
r=>{const t0=r.i(5,40,1),V=r.i(500,4000,50),C=r.i(1500,4000,100);return{q:`t₀=${t0} min, V=${V} veh/h, C=${C} veh/h. Halla t con la función BPR.`,a:t0*(1+.15*(V/C)**4),u:'min',s:[`V/C = ${n(V/C)}`,`t = ${n(t0*(1+.15*(V/C)**4))} min`]};},
r=>{const P=r.i(5000,30000,500),A=[r.i(2000,15000,500),r.i(2000,15000,500)],t=[r.i(10,40,1),r.i(10,40,1)],ta=r.i(15,45,1),tb=r.i(20,60,1),ca=r.i(4,15,.5),cb=r.i(1,3,.5),bt=-.05,bc=-.15,b0=r.i(-1,0,.1);const F=t.map(x=>1/(x*x)),T1=P*A[0]*F[0]/(A[0]*F[0]+A[1]*F[1]);const Ua=bt*ta+bc*ca,Ub=b0+bt*tb+bc*cb,pb=Math.exp(Ub)/(Math.exp(Ua)+Math.exp(Ub));return{q:`Zona con ${P} viajes. Destino 1: A=${A[0]}, t=${t[0]} min; destino 2: A=${A[1]}, t=${t[1]} min (F=1/t²). Hacia el destino 1, en auto se tarda ${ta} min y cuesta S/${ca}; en bus, ${tb} min y S/${cb}. U = β₀ − 0.05·tiempo − 0.15·costo, con β₀=0 para auto y ${b0} para bus. ¿Cuántos viajes en bus van al destino 1?`,a:T1*pb,u:'viajes',s:[`T₁ = ${n(T1)}`,`U_{auto} = ${n(Ua)}; U_{bus} = ${n(Ub)}`,`P_{bus} = ${n(pb)}`,`Viajes en bus = ${n(T1*pb)}`]};}
],
cri:[
['Se amplía una vía congestionada y a los dos años vuelve a congestionarse. ¿Qué fenómeno es?',['Mala construcción','Demanda inducida: el menor tiempo atrae nuevos viajes y cambia rutas y modos','Falta de semáforos','Lluvia'],1,'El modelo de 4 etapas lo muestra: al bajar t, sube F en la distribución y la utilidad del auto en la partición modal.'],
['Para que más gente use un corredor de buses, ¿qué variable del logit pesa más?',['El color del bus','El tiempo de viaje y de espera, que entran con coeficiente negativo','La edad del conductor','Nada'],1,'Reducir tiempos (carriles exclusivos, frecuencia) sube la utilidad del bus y su probabilidad de elección.']
],
ref:['Ortúzar y Willumsen, Modelling Transport','Garber y Hoel, Ingeniería de tránsito y carreteras','McFadden, Conditional logit analysis of qualitative choice behavior (1974)']});
