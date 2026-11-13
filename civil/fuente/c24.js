/* Profundización: mecánica de suelos e hidráulica */
EXT('m13');
SUB('trx',{t:'Ensayo triaxial y presión de poros',
lec:`El ensayo triaxial es el más completo para medir la resistencia de un suelo. Una probeta cilíndrica envuelta en una membrana se somete a una presión de celda σ₃ y luego se carga axialmente hasta la falla (σ₁).

## Tipos de ensayo
- **CD (consolidado drenado):** se deja drenar en todo momento; da c′ y φ′. Lento. Representa cargas lentas o el largo plazo
- **CU (consolidado no drenado):** se consolida y luego se carga sin drenar, midiendo la presión de poros u. Da parámetros totales y efectivos
- **UU (no consolidado no drenado):** rápido; en arcillas saturadas da c_{u} (φ = 0). Representa el final de la construcción

## Relación de falla
σ₁ = σ₃tan²(45° + φ/2) + 2c·tan(45° + φ/2). Sin cohesión: sen φ = (σ₁ − σ₃)/(σ₁ + σ₃).

## Parámetros de Skempton (1954)
- B = Δu/Δσ₃: vale ≈ 1 en suelo saturado (se usa para verificar la saturación)
- A = Δu/(Δσ₁ − Δσ₃) en la falla: positivo en arcillas normalmente consolidadas (tienden a comprimirse) y negativo en arcillas muy preconsolidadas o arenas densas (tienden a dilatarse)

## Esfuerzos efectivos en la falla
σ′₁ = σ₁ − u_{f} y σ′₃ = σ₃ − u_{f}.`,
ded:`## Por qué tan²(45° + φ/2)
En el círculo de Mohr de falla, tangente a la recta de Coulomb, el radio es (σ₁ − σ₃)/2 y el centro (σ₁ + σ₃)/2. Sin cohesión, la tangencia exige sen φ = radio/distancia al origen = (σ₁ − σ₃)/(σ₁ + σ₃). Despejando: σ₁/σ₃ = (1 + sen φ)/(1 − sen φ) = tan²(45° + φ/2). Con cohesión, la recta se desplaza c·cot φ y aparece el término 2c·tan(45° + φ/2).

## Por qué A cambia con la preconsolidación
Al cortar sin drenaje, un suelo que "quiere" comprimirse no puede expulsar agua: la presión de poros sube (A > 0). Uno que "quiere" dilatarse succiona agua: u baja (A < 0) y su resistencia no drenada aumenta (Lambe y Whitman; Holtz y Kovacs).`,
key:['σ_{1} = σ_{3}tan^{2}(45°+φ/2) + 2c tan(45°+φ/2)','sen φ = [[σ_{1}−σ_{3}|σ_{1}+σ_{3}]]','B = [[Δu|Δσ_{3}]]','A = [[Δu|Δσ_{1}−Δσ_{3}]]','σ′ = σ − u_{f}'],
err:'Usar parámetros drenados para analizar la estabilidad al final de la construcción sobre arcilla blanda.',
x:[['res','Mohr-Coulomb'],['moh','Círculo de Mohr'],['efe','Esfuerzos efectivos']],
g:[
r=>{const s3=r.i(50,400,10),f=r.i(25,42,1);return{q:`Ensayo CD en arena (c=0): σ₃=${s3} kPa y φ′=${f}°. Halla σ₁ en la falla.`,a:s3*tand(45+f/2)**2,u:'kPa',s:[`σ₁ = ${s3}·tan²(${45+f/2}°) = ${n(s3*tand(45+f/2)**2)} kPa`]};},
r=>{const s3=r.i(50,400,10),d=r.i(100,900,10);return{q:`Ensayo CD en arena: σ₃=${s3} kPa y esfuerzo desviador en la falla ${d} kPa. Halla φ′.`,a:Math.asin(d/(2*s3+d))*180/PI,u:'°',s:[`σ₁ = ${s3+d} kPa`,`sen φ = ${d}/${2*s3+d} → φ′ = ${n(Math.asin(d/(2*s3+d))*180/PI)}°`]};},
r=>{const du=r.i(10,200,5),dd=r.i(50,400,10);return{q:`Ensayo CU: en la falla Δu=${du} kPa y desviador ${dd} kPa. Halla A_{f}.`,a:du/dd,u:'',s:[`A = ${du}/${dd} = ${n(du/dd)}`]};},
r=>{const s3=r.i(100,400,10),dd=r.i(80,400,10),u=r.i(20,Math.min(s3-10,250),5);const s1p=s3+dd-u,s3p=s3-u;return{q:`Ensayo CU (c′=0): σ₃=${s3}, desviador ${dd} y u_{f}=${u} kPa. Halla φ′ con esfuerzos efectivos.`,a:Math.asin((s1p-s3p)/(s1p+s3p))*180/PI,u:'°',s:[`σ′₁ = ${s1p}; σ′₃ = ${s3p}`,`φ′ = ${n(Math.asin((s1p-s3p)/(s1p+s3p))*180/PI)}°`]};},
r=>{const c=r.i(0,30,1),f=r.i(20,35,1),s3=r.i(50,300,10),B=r.p([.95,.98,1]),Ds=r.i(20,100,5);return{q:`Arcilla con c′=${c} kPa y φ′=${f}°. (a) Al subir la presión de celda ${Ds} kPa se mide Δu=${n(B*Ds)} kPa; (b) en un ensayo CD con σ₃=${s3} kPa, ¿qué σ₁ produce la falla? Escribe σ₁.`,a:s3*tand(45+f/2)**2+2*c*tand(45+f/2),u:'kPa',s:[`B = ${B}: la probeta está ${B>=.95?'saturada':'no saturada'}`,`σ₁ = ${n(s3*tand(45+f/2)**2)} + ${n(2*c*tand(45+f/2))} = ${n(s3*tand(45+f/2)**2+2*c*tand(45+f/2))} kPa`]};}
],
cri:[
['Un terraplén se construye rápido sobre arcilla blanda saturada. ¿Qué ensayo representa mejor la condición crítica?',['CD','UU o CU con análisis no drenado: al final de la construcción el agua no alcanzó a drenar','Corte directo en seco','Ninguno'],1,'La condición más desfavorable suele ser justo al terminar el relleno, antes de que la arcilla consolide y gane resistencia.'],
['En un ensayo CU sobre arcilla muy preconsolidada, u baja al cortar. ¿Qué significa?',['Error del equipo','El suelo tiende a dilatarse (A < 0) y su resistencia no drenada es alta','Que está seco','Que es arena'],1,'La succión aumenta el esfuerzo efectivo y la resistencia. Ojo: a largo plazo, al drenar, se pierde esa ganancia.']
],
ref:['Holtz y Kovacs, An Introduction to Geotechnical Engineering, capítulo de resistencia','Skempton, The pore-pressure coefficients A and B (Géotechnique, 1954)','Bishop y Henkel, The Measurement of Soil Properties in the Triaxial Test']});
SUB('ocr',{t:'Preconsolidación y consolidación secundaria',
lec:`## Esfuerzo de preconsolidación
Es el mayor esfuerzo efectivo que el suelo soportó en su historia: σ′_{p}. Se obtiene de la curva e–log σ′ del ensayo de consolidación con el método gráfico de Casagrande (1936).

OCR = σ′_{p}/σ′₀
- OCR = 1: normalmente consolidado (NC)
- OCR > 1: sobreconsolidado (OC), por erosión, desecación o descenso del nivel freático en el pasado

## Asentamiento en arcilla sobreconsolidada
Mientras el esfuerzo no supere σ′_{p}, el suelo recorre la rama de recompresión (índice C_{s}, de 5 a 10 veces menor que C_{c}):

- Si σ′_{f} ≤ σ′_{p}: S = [C_{s}H/(1 + e₀)]log(σ′_{f}/σ′₀)
- Si σ′_{f} > σ′_{p}: S = [H/(1 + e₀)][C_{s}log(σ′_{p}/σ′₀) + C_{c}log(σ′_{f}/σ′_{p})]

## Consolidación secundaria
Terminada la primaria (exceso de presión de poros disipado), la arcilla sigue asentándose por reacomodo de su estructura (fluencia):

S_{s} = C′_{α}H·log(t₂/t₁), con C′_{α} = C_{α}/(1 + e_{p})

Es importante en arcillas orgánicas y turbas.`,
ded:`## Por qué la recompresión es tan rígida
Al descargarse en el pasado, la arcilla recuperó poco volumen (su estructura ya se había compactado). Al recargarla hasta su máximo histórico, solo recupera esa pequeña parte elástica. Cruzado σ′_{p}, empieza a comprimirse de nuevo "por primera vez" con el índice C_{c}, mucho mayor (Terzaghi, Peck y Mesri).

## La fórmula en dos tramos
Δe = C_{s}log(σ′_{p}/σ′₀) + C_{c}log(σ′_{f}/σ′_{p}), y S = H·Δe/(1 + e₀).

## Secundaria logarítmica
Los ensayos muestran que, tras la primaria, la relación de vacíos baja linealmente con log t: Δe = C_{α}log(t₂/t₁) (Mesri y Godlewski, 1977).`,
key:['OCR = [[σ′_{p}|σ′_{0}]]','S = [[H|1+e_{0}]][C_{s}log[[σ′_{p}|σ′_{0}]] + C_{c}log[[σ′_{f}|σ′_{p}]]]','S_{s} = C′_{α}H log[[t_{2}|t_{1}]]'],
err:'Usar C_{c} para un suelo sobreconsolidado cuyo esfuerzo final no supera σ′_{p}: se sobreestima mucho el asentamiento.',
x:[['cns','Consolidación primaria'],['efe','Esfuerzo efectivo'],['mej','Precarga para preconsolidar']],
g:[
r=>{const sp=r.i(50,400,5),s0=r.i(20,Math.min(sp,300),5);return{q:`σ′_{p}=${sp} kPa y σ′₀=${s0} kPa. Halla OCR.`,a:sp/s0,u:'',s:[`OCR = ${n(sp/s0)} ${sp/s0>1.05?'(sobreconsolidada)':'(normalmente consolidada)'}`]};},
r=>{const H=r.i(1,10,.5),Cs=r.i(.01,.08,.005),e0=r.i(.6,1.4,.01),s0=r.i(40,150,5),ds=r.i(10,80,5);return{q:`Arcilla OC de ${H} m, C_{s}=${Cs}, e₀=${e0}, σ′₀=${s0} kPa, Δσ=${ds} kPa (sin pasar σ′_{p}). Halla S.`,a:Cs*H/(1+e0)*Math.log10((s0+ds)/s0)*100,u:'cm',s:[`S = ${Cs}·${H}/${n(1+e0)}·log(${s0+ds}/${s0}) = ${n(Cs*H/(1+e0)*Math.log10((s0+ds)/s0)*100)} cm`]};},
r=>{const H=r.i(2,10,.5),Cs=r.i(.02,.06,.005),Cc=r.i(.2,.6,.01),e0=r.i(.7,1.4,.01),s0=r.i(40,120,5),sp=s0+r.i(20,80,5),sf=sp+r.i(20,150,5);const S=H/(1+e0)*(Cs*Math.log10(sp/s0)+Cc*Math.log10(sf/sp));return{q:`Arcilla de ${H} m: C_{s}=${Cs}, C_{c}=${Cc}, e₀=${e0}, σ′₀=${s0}, σ′_{p}=${sp}, σ′_{f}=${sf} kPa. Halla S.`,a:S*100,u:'cm',s:[`Recompresión: ${n(Cs*Math.log10(sp/s0),4)}; virgen: ${n(Cc*Math.log10(sf/sp),4)}`,`S = ${n(S*100)} cm`]};},
r=>{const Ca=r.i(.005,.04,.001),ep=r.i(.6,2.5,.05),H=r.i(2,10,.5),t1=r.i(.5,3,.5),t2=r.i(10,50,5);return{q:`C_{α}=${Ca}, e_{p}=${ep}, H=${H} m. Primaria termina en ${t1} años. Halla el asentamiento secundario hasta ${t2} años.`,a:Ca/(1+ep)*H*Math.log10(t2/t1)*100,u:'cm',s:[`C′_{α} = ${n(Ca/(1+ep),4)}`,`S_{s} = ${n(Ca/(1+ep)*H*Math.log10(t2/t1)*100)} cm`]};},
r=>{const H=r.i(3,8,.5),Cc=r.i(.25,.5,.01),Cs=+(Cc/r.p([5,6,8,10])).toFixed(3),e0=r.i(.8,1.3,.01),g=r.i(16,18,.5),sp0=r.i(30,80,5),q=r.i(30,120,5);const s0=(g-9.81)*H/2,sp=s0+sp0,sf=s0+q;const S=sf<=sp?Cs*H/(1+e0)*Math.log10(sf/s0):H/(1+e0)*(Cs*Math.log10(sp/s0)+Cc*Math.log10(sf/sp));const Snc=Cc*H/(1+e0)*Math.log10(sf/s0);return{q:`Arcilla saturada de ${H} m (γ=${g} kN/m³, nivel freático en la superficie), preconsolidada por desecación: σ′_{p} = σ′₀ + ${sp0} kPa. C_{c}=${Cc}, C_{s}=${Cs}, e₀=${e0}. Un relleno aplica ${q} kPa. Halla S en el centro del estrato.`,a:S*100,u:'cm',s:[`σ′₀ = ${n(s0)}; σ′_{p} = ${n(sp)}; σ′_{f} = ${n(sf)} kPa`,`S = ${n(S*100)} cm (si se hubiera supuesto NC: ${n(Snc*100)} cm)`]};}
],
cri:[
['La costra superior de una arcilla de la costa está desecada. ¿Cómo afecta al asentamiento?',['Lo aumenta','La costra suele estar sobreconsolidada: asienta mucho menos mientras no se supere σ′_{p}','No cambia','La vuelve arena'],1,'La desecación produce succiones que preconsolidan la arcilla superficial.'],
['¿Dónde es crítica la consolidación secundaria?',['En gravas','En arcillas orgánicas y turbas, donde puede igualar o superar a la primaria','En roca','En ninguna'],1,'En suelos orgánicos C_{α} es alto y el asentamiento continúa por décadas.']
],
ref:['Casagrande, The determination of the pre-consolidation load (1936)','Terzaghi, Peck y Mesri, Soil Mechanics in Engineering Practice','Holtz y Kovacs, An Introduction to Geotechnical Engineering']});
EXT('m14');
SUB('cou',{t:'Empuje en reposo, Coulomb y empuje pasivo',
lec:`## En reposo
Si el muro no se mueve (un sótano rígido arriostrado por las losas), el suelo queda en estado de reposo:
- NC: K₀ = 1 − sen φ′ (Jaky, 1944)
- OC: K₀ = (1 − sen φ′)·OCR^{sen φ′} (Mayne y Kulhawy, 1982)

K₀ es mayor que K_{a}: un muro que no se puede mover recibe más empuje.

## Coulomb (1776)
Considera la fricción δ entre el muro y el suelo. Para muro vertical y relleno horizontal:

K_{a} = cos²φ/{cos δ·[1 + √(sen(φ + δ)sen φ/cos δ)]²}

La fricción del muro reduce un poco el empuje activo e inclina la resultante.

## Empuje pasivo
Si el muro empuja al suelo (o el suelo frente a la zapata resiste el deslizamiento):
- Rankine: K_{p} = tan²(45° + φ/2)
- E_{p} = ½K_{p}γH²

Se moviliza con desplazamientos mucho mayores que el activo: en diseño se usa una fracción (por ejemplo, la mitad) o se ignora la parte superior, que puede excavarse.`,
ded:`## Jaky
Jaky dedujo, analizando el equilibrio de una cuña de arena en reposo, que K₀ ≈ 1 − sen φ′. Ensayos posteriores lo confirmaron para arenas y arcillas normalmente consolidadas.

## Coulomb
Coulomb consideró una cuña de falla plana detrás del muro, con su peso W, la reacción del suelo en el plano (inclinada φ respecto a la normal) y la reacción del muro (inclinada δ). Para cada ángulo de cuña se obtiene un empuje; el activo es el máximo de esos valores. Maximizando se obtiene la fórmula. Con δ = 0 coincide con Rankine (Das, Principios de ingeniería de cimentaciones).

## Por qué el pasivo necesita más movimiento
En el activo, el suelo solo tiene que "relajarse" un poco (desplazamientos del orden de 0.001H en arenas). Para el pasivo hay que comprimirlo hasta la falla: del orden de 0.01 a 0.05H.`,
key:['K_{0} = 1 − sen φ′','K_{0} = (1 − sen φ′)OCR^{sen φ′}','K_{a} = [[cos^{2}φ|cos δ[1 + √{sen(φ+δ)sen φ/cos δ}]^{2}]]','K_{p} = tan^{2}(45° + φ/2)'],
err:'Diseñar el muro de un sótano rígido con K_{a}: el muro no se mueve y recibe K₀.',
x:[['emp','Rankine activo'],['pmc','Muro de contención'],['sn','Excavaciones con anclajes']],
g:[
r=>{const f=r.i(25,42,1);return{q:`φ′=${f}°. Halla K₀ (NC).`,a:1-sind(f),u:'',s:[`K₀ = 1 − sen ${f}° = ${n(1-sind(f))}`]};},
r=>{const f=r.i(20,35,1),o=r.i(1,6,.5);return{q:`φ′=${f}° y OCR=${o}. Halla K₀.`,a:(1-sind(f))*o**sind(f),u:'',s:[`= ${n(1-sind(f))}·${o}^{${n(sind(f))}} = ${n((1-sind(f))*o**sind(f))}`]};},
r=>{const f=r.i(26,40,1),d=Math.round(f*r.p([0,.5,.67]));const K=cosd(f)**2/(cosd(d)*(1+sq(sind(f+d)*sind(f)/cosd(d)))**2);return{q:`Muro vertical, relleno horizontal, φ=${f}°, δ=${d}°. Halla K_{a} de Coulomb.`,a:K,u:'',s:[`K_{a} = ${n(K,4)} (Rankine: ${n((1-sind(f))/(1+sind(f)),4)})`]};},
r=>{const f=r.i(25,40,1),g=r.i(16,20,.5),H=r.i(.5,3,.1);return{q:`Suelo frente a la zapata: φ=${f}°, γ=${g} kN/m³, altura ${H} m. Halla el empuje pasivo de Rankine.`,a:.5*tand(45+f/2)**2*g*H*H,u:'kN/m',s:[`K_{p} = ${n(tand(45+f/2)**2)}`,`E_{p} = ${n(.5*tand(45+f/2)**2*g*H*H)} kN/m`]};},
r=>{const f=r.i(28,36,1),g=r.i(17,20,.5),H=r.i(2.5,4.5,.25),o=r.i(1,3,.5);const K0=(1-sind(f))*o**sind(f),Ka=(1-sind(f))/(1+sind(f));return{q:`Muro de sótano de ${H} m arriostrado por las losas (no se mueve). Relleno con φ′=${f}°, γ=${g} kN/m³, compactado con OCR=${o}. Halla el empuje total por metro y cuántas veces mayor es que el activo.`,a:.5*K0*g*H*H,u:'kN/m',s:[`K₀ = ${n(K0)}; K_{a} = ${n(Ka)}`,`E₀ = ${n(.5*K0*g*H*H)} kN/m (${n(K0/Ka)} veces el activo)`]};}
],
cri:[
['¿Por qué no se cuenta todo el empuje pasivo frente a una zapata de muro?',['Por costumbre','Porque requiere grandes desplazamientos y ese suelo puede excavarse o erosionarse','Porque no existe','Porque es muy pequeño'],1,'Se usa con reducción o se desprecia la parte superior, por seguridad.'],
['Un muro de sótano se diseñó con K_{a} y presenta fisuras. ¿Causa probable?',['Falta de pintura','El muro está restringido por las losas y recibe K₀, mayor que K_{a}, además de la compactación del relleno','Exceso de acero','Sismo leve'],1,'Muros que no pueden desplazarse deben diseñarse en reposo; la compactación puede aumentar aún más el empuje.']
],
ref:['Das, Principios de ingeniería de cimentaciones, capítulo de presión lateral','Jaky, The coefficient of earth pressure at rest (1944)','Mayne y Kulhawy, K₀-OCR relationships in soil (1982)']});
SUB('cpg',{t:'Capacidad portante general',
lec:`La fórmula de Terzaghi es para zapatas corridas con carga vertical. La **ecuación general** (Meyerhof, Hansen, Vesic) agrega forma, profundidad e inclinación:

q_{u} = c·N_{c}F_{cs}F_{cd}F_{ci} + q·N_{q}F_{qs}F_{qd}F_{qi} + ½γB′N_{γ}F_{γs}F_{γd}F_{γi}

## Factores de capacidad (Vesic)
- N_{q} = e^{π tan φ}tan²(45° + φ/2)
- N_{c} = (N_{q} − 1)cot φ
- N_{γ} = 2(N_{q} + 1)tan φ

## Forma (De Beer)
F_{cs} = 1 + (B/L)(N_{q}/N_{c}); F_{qs} = 1 + (B/L)tan φ; F_{γs} = 1 − 0.4B/L

## Profundidad (Hansen, D_{f}/B ≤ 1)
F_{qd} = 1 + 2tan φ(1 − sen φ)²(D_{f}/B); F_{γd} = 1; F_{cd} = F_{qd} − (1 − F_{qd})/(N_{c}tan φ)

## Inclinación (Meyerhof), con β el ángulo de la carga respecto a la vertical
F_{ci} = F_{qi} = (1 − β°/90°)²; F_{γi} = (1 − β/φ)²

## Excentricidad (Meyerhof)
Se usa el ancho efectivo B′ = B − 2e: la zapata "útil" es la parte centrada en la carga.`,
ded:`## De dónde salen N_{q} y N_{c}
Prandtl (1921) resolvió la falla de un medio rígido-plástico bajo una franja cargada: una cuña activa, una zona de corte radial con forma de espiral logarítmica y una cuña pasiva. Reissner (1924) agregó la sobrecarga q. La espiral logarítmica produce el término e^{π tan φ}. N_{c} sale de la relación de Caquot entre cohesión y fricción: un suelo con cohesión equivale a uno sin ella con una presión adicional c·cot φ.

## N_{γ}
No tiene solución cerrada exacta; Vesic (1973) propuso 2(N_{q} + 1)tan φ ajustando soluciones numéricas.

## Ancho efectivo
Meyerhof (1953) observó que una zapata con carga excéntrica se comporta como una zapata más pequeña, centrada en la carga, de ancho B − 2e (Das, Principios de ingeniería de cimentaciones).`,
key:['N_{q} = e^{π tan φ}tan^{2}(45°+φ/2)','N_{c} = (N_{q} − 1)cot φ','N_{γ} = 2(N_{q} + 1)tan φ','B′ = B − 2e','F_{qi} = (1 − β/90°)^{2}'],
err:'Usar la capacidad de la zapata completa cuando la carga es excéntrica o inclinada.',
x:[['cap','Terzaghi'],['cz1','Zapatas excéntricas'],['spt','φ desde el SPT']],
g:[
r=>{const f=r.i(20,40,1);return{q:`φ=${f}°. Halla N_{q}.`,a:Math.exp(PI*tand(f))*tand(45+f/2)**2,u:'',s:[`N_{q} = e^{π tan ${f}°}·tan²(${45+f/2}°) = ${n(Math.exp(PI*tand(f))*tand(45+f/2)**2)}`]};},
r=>{const f=r.i(20,40,1);const Nq=Math.exp(PI*tand(f))*tand(45+f/2)**2;return{q:`φ=${f}°. Halla N_{γ} de Vesic.`,a:2*(Nq+1)*tand(f),u:'',s:[`N_{q} = ${n(Nq)}`,`N_{γ} = ${n(2*(Nq+1)*tand(f))}`]};},
r=>{const b=r.i(0,25,1),f=r.i(25,40,1);return{q:`Carga inclinada ${b}° respecto a la vertical, φ=${f}°. Halla F_{qi} y F_{γi}; escribe F_{γi}.`,a:Math.max(1-b/f,0)**2,u:'',s:[`F_{qi} = (1 − ${b}/90)² = ${n((1-b/90)**2)}`,`F_{γi} = (1 − ${b}/${f})² = ${n(Math.max(1-b/f,0)**2)}`]};},
r=>{const B=r.i(1,4,.1),e=r.i(.05,.6,.05);return{q:`Zapata de B=${B} m con e=${e} m. Halla B′.`,a:B-2*e,u:'m',s:[`B′ = ${B} − 2·${e} = ${n(B-2*e)} m`]};},
r=>{const f=r.i(28,38,1),g=r.i(17,19.5,.5),B=r.i(1.5,3,.1),L=+(B*r.i(1,2,.25)).toFixed(2),Df=r.i(1,2,.1);const Nq=Math.exp(PI*tand(f))*tand(45+f/2)**2,Ng=2*(Nq+1)*tand(f),q=g*Df;const Fqs=1+(B/L)*tand(f),Fgs=1-.4*B/L,Fqd=1+2*tand(f)*(1-sind(f))**2*Math.min(Df/B,1);const qu=q*Nq*Fqs*Fqd+.5*g*B*Ng*Fgs;return{q:`Zapata de ${B}×${L} m a D_{f}=${Df} m en arena (c=0, φ=${f}°, γ=${g} kN/m³, sin agua). Halla q_{u} con la ecuación general (carga vertical).`,a:qu,u:'kPa',s:[`N_{q} = ${n(Nq)}, N_{γ} = ${n(Ng)}`,`F_{qs} = ${n(Fqs)}, F_{γs} = ${n(Fgs)}, F_{qd} = ${n(Fqd)}`,`q_{u} = ${n(q*Nq*Fqs*Fqd)} + ${n(.5*g*B*Ng*Fgs)} = ${n(qu)} kPa`]};}
],
cri:[
['Una zapata recibe sismo y la carga se inclina 15°. ¿Qué pasa con su capacidad?',['No cambia','Baja mucho: los factores de inclinación reducen sobre todo el término de γ','Sube','Se duplica'],1,'Con β = 15° y φ = 30°, F_{γi} = 0.25: el término de peso propio cae a la cuarta parte.']
],
ref:['Das, Principios de ingeniería de cimentaciones, capítulo 3','Vesic, Analysis of ultimate loads of shallow foundations (1973)','Meyerhof, Some recent research on the bearing capacity of foundations (1963)']});
EXT('m29');
SUB('cono',{t:'Ensayo de penetración de cono (CPT)',
lec:`El CPT empuja un cono instrumentado a velocidad constante (2 cm/s) y mide de forma continua:
- q_{c}: resistencia de punta
- f_{s}: fricción en el manguito
- u₂: presión de poros (en el piezocono, CPTu)

A diferencia del SPT, da un perfil continuo y repetible, sin depender del operador. No saca muestras.

## Correcciones y parámetros
- Resistencia corregida: q_{t} = q_{c} + u₂(1 − a), con a ≈ 0.8 la relación de áreas del cono
- Relación de fricción: R_{f} = f_{s}/q_{t}·100 %. Arenas: R_{f} bajo (< 1 %); arcillas: alto (> 3 %)
- Clasificación del suelo con la carta de Robertson (1990)

## Correlaciones
- Resistencia no drenada en arcillas: c_{u} = (q_{t} − σ_{v0})/N_{kt}, con N_{kt} entre 10 y 20 (calibrar localmente)
- Relación con el SPT en arenas: q_{c}/N₆₀ ≈ 0.4 a 0.6 MPa por golpe (Robertson y Campanella, 1983)
- Capacidad de punta de pilotes: proporcional a q_{c} promedio cerca de la punta`,
ded:`## Por qué q_{t}
El agua a presión actúa sobre el hombro del cono detrás de la punta y reduce la carga medida. Sumar u₂(1 − a) corrige ese efecto: en arcillas blandas, donde u₂ es grande, la corrección es importante.

## De dónde sale c_{u} = (q_{t} − σ_{v0})/N_{kt}
La teoría de expansión de cavidades (Vesic) y la de capacidad portante profunda dicen que la resistencia del cono es una sobrecarga más un múltiplo de c_{u}: q_{t} = σ_{v0} + N_{kt}c_{u}. N_{kt} depende de la rigidez y la anisotropía del suelo, por eso se calibra con ensayos de laboratorio o de veleta en cada sitio (Lunne, Robertson y Powell, Cone Penetration Testing in Geotechnical Practice).`,
key:['q_{t} = q_{c} + u_{2}(1 − a)','R_{f} = [[f_{s}|q_{t}]]·100','c_{u} = [[q_{t} − σ_{v0}|N_{kt}]]'],
err:'Usar N_{kt} genérico sin calibrar en arcillas sensibles o fisuradas.',
x:[['spt','SPT'],['exp','Programa de exploración'],['liq','Licuación con CPT']],
g:[
r=>{const qc=r.i(.3,25,.1),u=r.i(0,800,10),a=r.p([.75,.8,.85]);return{q:`q_{c}=${qc} MPa, u₂=${u} kPa, a=${a}. Halla q_{t}.`,a:qc+u/1000*(1-a),u:'MPa',s:[`q_{t} = ${qc} + ${u/1000}(1 − ${a}) = ${n(qc+u/1000*(1-a),4)} MPa`]};},
r=>{const qt=r.i(.3,25,.1),fs=r.i(5,250,5);return{q:`q_{t}=${qt} MPa y f_{s}=${fs} kPa. Halla R_{f}.`,a:fs/1000/qt*100,u:'%',s:[`R_{f} = ${n(fs/1000/qt*100)} % ${fs/1000/qt*100<1?'(arena)':fs/1000/qt*100>3?'(arcilla)':'(mezcla limosa)'}`]};},
r=>{const qt=r.i(.3,3,.05),z=r.i(2,20,.5),g=r.i(15,19,.5),N=r.p([12,14,15,17,20]);const sv=g*z;return{q:`Arcilla: q_{t}=${qt} MPa a ${z} m (γ=${g} kN/m³), N_{kt}=${N}. Halla c_{u}.`,a:(qt*1000-sv)/N,u:'kPa',s:[`σ_{v0} = ${n(sv)} kPa`,`c_{u} = (${qt*1000} − ${n(sv)})/${N} = ${n((qt*1000-sv)/N)} kPa`]};},
r=>{const qc=r.i(2,30,.5),k=r.p([.4,.5,.6]);return{q:`Arena con q_{c}=${qc} MPa y q_{c}/N₆₀ = ${k} MPa. Estima N₆₀.`,a:qc/k,u:'golpes',s:[`N₆₀ = ${qc}/${k} = ${n(qc/k)}`]};},
r=>{const q=[r.i(.4,1.2,.05),r.i(.4,1.2,.05),r.i(.4,1.2,.05),r.i(.4,1.2,.05)],g=16.5,N=15,D=r.p([.4,.5,.6]),L=4;const cu=q.map((x,i)=>(x*1000-g*(i+1))/N),cm=cu.reduce((a,b)=>a+b)/4,Qs=.8*cm*PI*D*L,Qp=9*cu[3]*PI*D*D/4;return{q:`CPTu en arcilla (γ=16.5 kN/m³, N_{kt}=15): q_{t} = ${q.join(', ')} MPa a 1, 2, 3 y 4 m. Pilote de D=${D} m y 4 m de largo (α=0.8). Halla Q_{u} = fuste + punta (9c_{u}A_{p} con el c_{u} de 4 m).`,a:Qs+Qp,u:'kN',s:[`c_{u} = ${cu.map(x=>n(x)).join(', ')} kPa; promedio ${n(cm)}`,`Fuste = ${n(Qs)} kN; punta = ${n(Qp)} kN`,`Q_{u} = ${n(Qs+Qp)} kN`]};}
],
cri:[
['¿Qué ventaja tiene el CPT sobre el SPT?',['Saca muestras','Da un perfil continuo y repetible, detecta capas delgadas y mide presión de poros','Es más barato siempre','Funciona en grava gruesa'],1,'Su limitación: no penetra gravas densas ni roca y no obtiene muestras, por eso se combina con perforaciones.']
],
ref:['Lunne, Robertson y Powell, Cone Penetration Testing in Geotechnical Practice','Robertson, Soil classification using the cone penetration test (1990)']});
SUB('exs',{t:'Suelos expansivos y colapsables',
lec:`Dos tipos de suelo causan daños en viviendas sin que haya sobrecarga: los que se hinchan al mojarse y los que colapsan al mojarse. Ambos existen en el Perú (arcillas expansivas en Piura, Tumbes y la selva; suelos colapsables en zonas desérticas de la costa sur y en loess).

## Suelos expansivos
Arcillas con minerales como la montmorillonita, que absorben agua entre sus láminas.
- **Actividad** (Skempton): A = IP/% arcilla (< 2 μm). A > 1.25: activa
- **Potencial de expansión** (Seed, Woodward y Lundgren, 1962, para arcillas compactadas): S(%) = 2.16×10⁻³·IP^{2.44}

Soluciones: reemplazar el suelo, estabilizar con cal, cimentar por debajo de la zona activa, controlar la humedad (veredas perimetrales, drenaje).

## Suelos colapsables
Suelos secos de estructura abierta (arenas limosas eólicas, loess) cementados débilmente. Al mojarse bajo carga, la estructura se derrumba.
- **Potencial de colapso** (Jennings y Knight, 1975): CP = Δe/(1 + e₀)·100, medido en consolidómetro al inundar a 200 kPa
- Gravedad: 0–1 % sin problema; 1–5 % moderado; 5–10 % problemático; 10–20 % severo; > 20 % muy severo

La E.050 pide identificarlos y tratarlos (prehumedecimiento, compactación, reemplazo).`,
ded:`## Por qué se hinchan
Las láminas de montmorillonita tienen carga negativa y atraen agua y cationes entre ellas (doble capa difusa). Al aumentar la humedad, las capas se separan y el volumen crece. Por eso la actividad (cuánta plasticidad por cada gramo de arcilla) indica el tipo de mineral.

## La fórmula de Seed
Seed, Woodward y Lundgren ensayaron arcillas compactadas a su humedad óptima bajo una sobrecarga pequeña, y ajustaron S = K·IP^{2.44} con K = 3.6×10⁻⁵·60 = 2.16×10⁻³. Es una estimación: el hinchamiento real depende de la humedad inicial y la carga.

## Colapso
La deformación al inundar, dividida entre (1 + e₀), es la deformación vertical unitaria, igual que en consolidación: ε = Δe/(1 + e₀).`,
key:['A = [[IP|% arcilla]]','S = 2.16×10^{−3}IP^{2.44}','CP = [[Δe|1+e_{0}]]·100','ΔH = H·[[CP|100]]'],
err:'Cimentar una vivienda sobre arena eólica seca sin ensayo de colapso y con jardín regado junto a los muros.',
x:[['cla','Límites de Atterberg'],['sbr','Estabilización con cal'],['qm2','Agua y suelo']],
g:[
r=>{const ip=r.i(5,60,1),cl=r.i(10,70,1);return{q:`IP=${ip} % y ${cl} % de arcilla. Halla la actividad.`,a:ip/cl,u:'',s:[`A = ${n(ip/cl)} ${ip/cl>1.25?'(activa)':ip/cl<.75?'(inactiva)':'(normal)'}`]};},
r=>{const ip=r.i(10,60,1);return{q:`Arcilla compactada con IP=${ip} %. Estima el potencial de expansión.`,a:2.16e-3*ip**2.44,u:'%',s:[`S = 2.16×10⁻³·${ip}^{2.44} = ${n(2.16e-3*ip**2.44)} %`]};},
r=>{const e0=r.i(.5,1.2,.01),de=r.i(.005,.25,.005);return{q:`Al inundar, Δe=${de} con e₀=${e0}. Halla CP.`,a:de/(1+e0)*100,u:'%',s:[`CP = ${n(de/(1+e0)*100)} %`]};},
r=>{const H=r.i(1,6,.5),cp=r.i(1,15,.5);return{q:`Estrato colapsable de ${H} m con CP=${cp} %. ¿Cuánto podría asentarse al saturarse?`,a:H*cp,u:'cm',s:[`ΔH = ${H}·${cp/100} = ${n(H*cp/100)} m = ${n(H*cp)} cm`]};},
r=>{const ip=r.i(20,50,1),cl=r.i(20,60,1),Hz=r.i(1,3,.1),f=r.p([.5,.6,.7]);const S=2.16e-3*ip**2.44,dH=S/100*Hz*f*100;return{q:`Arcilla de Piura con IP=${ip} % y ${cl} % de arcilla. La zona activa (que cambia de humedad) tiene ${Hz} m. Si en campo se desarrolla ${f*100} % del potencial de Seed, ¿cuánto se levantaría el piso?`,a:dH,u:'cm',s:[`A = ${n(ip/cl)}`,`S = ${n(S)} %`,`Levantamiento = ${n(dH)} cm`]};}
],
cri:[
['Una vivienda sobre arcilla expansiva se fisura solo en el lado del jardín. ¿Causa probable?',['El sismo','El riego humedece la arcilla de ese lado y la hincha: movimiento diferencial','La pintura','El techo'],1,'Los cambios de humedad desiguales producen hinchamiento desigual. Por eso se colocan veredas perimetrales y drenaje.'],
['¿Por qué es peligroso prehumedecer sin control un suelo colapsable bajo una obra existente?',['No lo es','Porque el colapso ocurre al mojarse bajo carga: se provocaría el asentamiento','Mejora siempre','Solo cambia el color'],1,'El prehumedecimiento se hace antes de construir, para inducir el colapso cuando aún no hay estructura.']
],
ref:['Nelson y Miller, Expansive Soils: Problems and Practice in Foundation and Pavement Engineering','Seed, Woodward y Lundgren, Prediction of swelling potential for compacted clays (1962)','Jennings y Knight, A guide to construction on or with materials exhibiting additional settlement due to collapse (1975)','E.050, capítulo de suelos con problemas especiales']});

EXT('m15');
SUB('bmb',{t:'Bombas: curvas y punto de operación',
lec:`Una bomba no da "un caudal": da el caudal en el que su curva se cruza con la del sistema.

## Curva del sistema
H_{sis} = H_{e} + KQ², con H_{e} el desnivel estático y KQ² las pérdidas (fricción y locales crecen con Q²).

## Curva de la bomba
Del fabricante; se aproxima con H_{b} = H₀ − aQ².

## Punto de operación
H_{b} = H_{sis}: Q = √((H₀ − H_{e})/(a + K)).

## Bombas en paralelo (iguales)
A la misma altura, los caudales se suman: H = H₀ − a(Q/2)². Útil cuando la demanda varía.

## Bombas en serie
Al mismo caudal, las alturas se suman: H = 2H₀ − 2aQ². Útil para grandes desniveles.

## Leyes de afinidad (misma bomba, otra velocidad N)
Q ∝ N; H ∝ N²; P ∝ N³. Un variador de velocidad que baja 20 % las rpm reduce la potencia casi a la mitad.`,
ded:`## Por qué las pérdidas van con Q²
Darcy-Weisbach: h_{f} = f(L/D)V²/(2g), y V = Q/A. Con flujo turbulento rugoso, f es casi constante: h_{f} ∝ Q². Las pérdidas locales K·V²/(2g) también.

## Leyes de afinidad
En bombas geométricamente semejantes (o la misma a otra velocidad), las velocidades del agua escalan con la velocidad del impulsor: Q ∝ N (caudal = área × velocidad), H ∝ V² ∝ N² y P ∝ QH ∝ N³ (Karassik, Pump Handbook).

## Paralelo en un sistema con mucha fricción
Dos bombas en paralelo no duplican el caudal: al subir Q, suben las pérdidas KQ² y el punto de operación se mueve a mayor H. Cuanto más empinada la curva del sistema, menos gana la segunda bomba.`,
key:['H_{sis} = H_{e} + KQ^{2}','H_{b} = H_{0} − aQ^{2}','Q_{op} = √{[[H_{0} − H_{e}|a + K]]}','Q ∝ N; H ∝ N^{2}; P ∝ N^{3}'],
err:'Elegir la bomba solo por su caudal nominal sin cruzar su curva con la del sistema.',
x:[['fbo','Potencia y NPSH'],['fpe','Pérdidas'],['isa','Bombeo en edificios']],
g:[
r=>{const He=r.i(5,80,1),K=r.i(500,20000,100),Q=r.i(.005,.08,.001);return{q:`H_{e}=${He} m, K=${K} s²/m⁵, Q=${Q} m³/s. Halla H del sistema.`,a:He+K*Q*Q,u:'m',s:[`= ${He} + ${K}·${Q}² = ${n(He+K*Q*Q)} m`]};},
r=>{const H0=r.i(30,120,1),a=r.i(2000,30000,500),He=r.i(5,Math.max(6,H0-20),1),K=r.i(500,15000,500);return{q:`Bomba H = ${H0} − ${a}Q²; sistema H = ${He} + ${K}Q². Halla Q de operación en L/s.`,a:sq((H0-He)/(a+K))*1000,u:'L/s',s:[`Q = √((${H0} − ${He})/(${a} + ${K})) = ${n(sq((H0-He)/(a+K))*1000)} L/s`]};},
r=>{const H0=r.i(30,120,1),a=r.i(2000,30000,500),He=r.i(5,Math.max(6,H0-20),1),K=r.i(500,15000,500);const Q1=sq((H0-He)/(a+K)),Q2=sq((H0-He)/(a/4+K));return{q:`Bomba H = ${H0} − ${a}Q²; sistema ${He} + ${K}Q². Con dos bombas iguales en paralelo, halla Q en L/s.`,a:Q2*1000,u:'L/s',s:[`Paralelo: H = ${H0} − ${a/4}Q²`,`Q = ${n(Q2*1000)} L/s (una sola: ${n(Q1*1000)}; no se duplica)`]};},
r=>{const Q=r.i(5,100,1),H=r.i(10,80,1),P=r.i(1,50,.5),f=r.i(.6,.95,.05);return{q:`Una bomba da ${Q} L/s a ${H} m con ${P} kW a velocidad nominal. Si la velocidad baja a ${f*100} %, halla la nueva potencia.`,a:P*f**3,u:'kW',s:[`Q = ${n(Q*f)} L/s; H = ${n(H*f*f)} m`,`P = ${P}·${f}³ = ${n(P*f**3)} kW`]};},
r=>{const H0=r.i(60,150,1),a=r.i(5000,30000,500),He=r.i(60,H0+40,1),K=r.i(1000,10000,500);const can1=H0>He,Q=sq(Math.max(2*H0-He,0)/(2*a+K));return{q:`Un desnivel de ${He} m con pérdidas K=${K} s²/m⁵. Cada bomba: H = ${H0} − ${a}Q². ${can1?'Una sola sí llega':'Una sola no llega'}. Con dos en serie, halla Q en L/s.`,a:Q*1000,u:'L/s',s:[`Serie: H = ${2*H0} − ${2*a}Q²`,`Q = √((${2*H0} − ${He})/(${2*a} + ${K})) = ${n(Q*1000)} L/s`]};}
],
cri:[
['Se instala una bomba de mayor potencia en una línea con mucha fricción y el caudal casi no sube. ¿Por qué?',['La bomba está mala','La curva del sistema es muy empinada: casi toda la altura extra se pierde en fricción. Conviene ampliar la tubería','Por el voltaje','No puede pasar'],1,'Con K alto, el punto de operación sube por la curva del sistema y Q crece poco.'],
['¿Por qué los variadores de velocidad ahorran tanta energía en sistemas de bombeo?',['No ahorran','Porque P ∝ N³: bajar un poco la velocidad reduce mucho la potencia','Porque son nuevos','Por el IGV'],1,'Con 80 % de velocidad la potencia es 0.8³ ≈ 51 %.']
],
ref:['Karassik y otros, Pump Handbook','Sotelo Ávila, Hidráulica general','Mays, Water Distribution Systems Handbook']});
SUB('tsp',{t:'Tuberías en serie y en paralelo',
lec:`## En serie
El mismo caudal pasa por todas: las pérdidas se suman. h_{f} = Σh_{fi}.

## En paralelo
Entre dos nudos, todas las ramas tienen la misma pérdida: los caudales se suman. Q = ΣQ_{i}.

## Tubería equivalente (Hazen-Williams)
Una tubería de diámetro D₂ y C₂ equivale a otra de D₁ y C₁ con longitud:

L_{eq} = L₂(D₁/D₂)^{4.87}(C₁/C₂)^{1.852}

En serie se suman longitudes equivalentes; en paralelo se reparte el caudal.

## Reparto en paralelo
Como h_{f} = rQ^{1.852} es igual en todas las ramas: Q_{i} ∝ r_{i}^{−0.54}. La rama con menos resistencia lleva más agua.

## Uso
Refuerzo de redes: en lugar de reemplazar una tubería saturada, se tiende otra en paralelo.`,
ded:`## De dónde sale la longitud equivalente
Hazen-Williams: h_{f} = 10.67LQ^{1.852}/(C^{1.852}D^{4.87}). Dos tuberías son equivalentes si dan la misma pérdida con el mismo caudal: L₁/(C₁^{1.852}D₁^{4.87}) = L₂/(C₂^{1.852}D₂^{4.87}). Despejando L₁ se obtiene la fórmula.

## Reparto
En paralelo, r₁Q₁^{1.852} = r₂Q₂^{1.852}: Q₁/Q₂ = (r₂/r₁)^{1/1.852} = (r₂/r₁)^{0.54}. Con Q₁ + Q₂ = Q se despeja cada uno (Sotelo Ávila; Saldarriaga, Hidráulica de tuberías).`,
key:['Serie: h_{f} = Σh_{fi}','Paralelo: Q = ΣQ_{i}, h_{f} igual','L_{eq} = L_{2}([[D_{1}|D_{2}]])^{4.87}([[C_{1}|C_{2}]])^{1.852}','[[Q_{1}|Q_{2}]] = ([[r_{2}|r_{1}]])^{0.54}'],
err:'Sumar caudales en serie o pérdidas en paralelo.',
x:[['fpe','Hazen-Williams'],['hcr','Redes malladas'],['res2','Redes de distribución']],
g:[
r=>{const h=[r.i(.5,10,.1),r.i(.5,10,.1),r.i(.5,10,.1)];return{q:`Tres tramos en serie con pérdidas ${h.join(', ')} m. Halla la pérdida total.`,a:h[0]+h[1]+h[2],u:'m',s:[`= ${n(h[0]+h[1]+h[2])} m`]};},
r=>{const L2=r.i(100,2000,50),D1=r.p([.1,.15,.2,.25]),D2=r.p([.1,.15,.2,.25,.3]);return{q:`Tubería de ${L2} m y D=${D2} m. Halla su longitud equivalente en D=${D1} m (mismo C).`,a:L2*(D1/D2)**4.87,u:'m',s:[`= ${L2}(${D1}/${D2})^{4.87} = ${n(L2*(D1/D2)**4.87)} m`]};},
r=>{const r1=r.i(500,5000,100),r2=r.i(500,5000,100),Q=r.i(10,100,1);const k=(r2/r1)**.54,Q1=Q*k/(1+k);return{q:`Dos ramas en paralelo con r₁=${r1} y r₂=${r2} llevan ${Q} L/s en total. Halla Q₁.`,a:Q1,u:'L/s',s:[`Q₁/Q₂ = (${r2}/${r1})^{0.54} = ${n(k)}`,`Q₁ = ${n(Q1)} L/s`]};},
r=>{const L=r.i(200,2000,50),D=r.p([.1,.15,.2,.25,.3]),C=r.p([100,120,140]),Q=+(r.i(.6,2,.05)*PI*D*D/4).toFixed(4);const h=10.67*L*Q**1.852/(C**1.852*D**4.87);return{q:`Tubería de ${L} m, D=${D} m, C=${C}, Q=${Q} m³/s. Si se coloca otra igual en paralelo, ¿cuál será la nueva pérdida?`,a:h/2**1.852,u:'m',s:[`Antes: ${n(h)} m`,`Cada una lleva Q/2: h = ${n(h/2**1.852)} m (≈ 28 % de la original)`]};},
r=>{const L1=r.i(300,1500,50),L2=r.i(300,1500,50),D1=r.p([.15,.2,.25]),D2=r.p([.1,.15,.2]),C=130,H=r.i(10,60,1);const r1=10.67*L1/(C**1.852*D1**4.87),r2=10.67*L2/(C**1.852*D2**4.87);const Q=(H/(r1+r2))**(1/1.852);return{q:`Entre dos reservorios con ${H} m de desnivel hay dos tuberías en serie: ${L1} m de D=${D1} m y ${L2} m de D=${D2} m, C=130 (desprecia pérdidas locales). Halla Q en L/s.`,a:Q*1000,u:'L/s',s:[`r₁ = ${n(r1)}, r₂ = ${n(r2)}`,`Q = (H/(r₁ + r₂))^{0.54} = ${n(Q*1000)} L/s`]};}
],
cri:[
['Para aumentar el caudal entre dos puntos, ¿qué rinde más?',['Reemplazar un tramo corto','Colocar una tubería en paralelo en el tramo de mayor pérdida','Pintar la tubería','Cambiar las válvulas solamente'],1,'La rama paralela reduce mucho la pérdida en ese tramo: con dos iguales, la pérdida cae a cerca del 28 %.']
],
ref:['Saldarriaga, Hidráulica de tuberías','Sotelo Ávila, Hidráulica general']});
EXT('m16');
SUB('cbe',{t:'Compuertas y vertederos de cresta ancha',
lec:`## Compuerta deslizante
El agua sale por debajo, con abertura a. El chorro se contrae hasta y₂ = C_{c}a (C_{c} ≈ 0.61).

Q = C_{d}·b·a·√(2gy₁)

con C_{d} ≈ 0.55–0.60 en descarga libre. Si el agua aguas abajo ahoga el chorro, el caudal baja.

## Vertedero de cresta ancha
Un escalón con cresta larga en el sentido del flujo. Sobre la cresta se produce el tirante crítico, así que sirve para medir caudal:

Q = 1.705·C_{d}·b·H^{3/2} (SI), con C_{d} ≈ 0.85–1.0

(1.705 = (2/3)^{3/2}√g)

## Energía
Aguas arriba de la compuerta el flujo es subcrítico; aguas abajo, supercrítico (y₂). Si el canal aguas abajo es subcrítico, se forma un resalto que hay que ubicar y proteger.`,
ded:`## Compuerta
Aplicando Bernoulli entre la sección aguas arriba (tirante y₁, velocidad pequeña) y la vena contracta (y₂): y₁ + V₁²/2g = y₂ + V₂²/2g. Si V₁ es pequeña, V₂ ≈ √(2g(y₁ − y₂)). Con Q = by₂V₂ y y₂ = C_{c}a, agrupando constantes en C_{d} se obtiene Q = C_{d}ba√(2gy₁).

## Cresta ancha
Sobre una cresta larga el flujo se ajusta a la energía mínima: tirante crítico. En sección rectangular, E = 1.5y_{c}, con E ≈ H. Entonces y_{c} = (2/3)H y q = √(g y_{c}³) = √g·(2/3)^{3/2}H^{3/2} = 1.705H^{3/2} (Chow; Henderson, Open Channel Flow).`,
key:['Q = C_{d}ba√{2gy_{1}}','y_{2} = C_{c}a','Q = 1.705C_{d}bH^{3/2}','y_{c} = [[2|3]]H'],
err:'Usar la fórmula de descarga libre cuando la compuerta está ahogada.',
x:[['can2','Vertederos de pared delgada'],['ene2','Tirante crítico'],['sal','Resalto aguas abajo']],
g:[
r=>{const b=r.i(.5,5,.1),a=r.i(.1,1.5,.05),y1=r.i(1,5,.1),Cd=r.p([.55,.58,.6]);return{q:`Compuerta de b=${b} m, a=${a} m, y₁=${y1} m, C_{d}=${Cd}. Halla Q.`,a:Cd*b*a*sq(2*G*y1),u:'m³/s',s:[`Q = ${n(Cd*b*a*sq(2*G*y1))} m³/s`]};},
r=>{const a=r.i(.1,1.5,.05),Cc=r.p([.6,.61,.62]);return{q:`Abertura a=${a} m, C_{c}=${Cc}. Halla y₂.`,a:Cc*a,u:'m',s:[`= ${n(Cc*a)} m`]};},
r=>{const b=r.i(.5,10,.1),H=r.i(.05,1.5,.01),Cd=r.p([.85,.9,.95,1]);return{q:`Cresta ancha de b=${b} m, H=${H} m, C_{d}=${Cd}. Halla Q.`,a:1.705*Cd*b*H**1.5,u:'m³/s',s:[`Q = 1.705·${Cd}·${b}·${H}^{1.5} = ${n(1.705*Cd*b*H**1.5)} m³/s`]};},
r=>{const Q=r.i(.1,10,.1),b=r.i(.5,5,.1),Cd=r.p([.9,1]);return{q:`Se quiere medir ${Q} m³/s con una cresta ancha de b=${b} m (C_{d}=${Cd}). ¿Qué carga H se leerá?`,a:(Q/(1.705*Cd*b))**(2/3),u:'m',s:[`H = (Q/(1.705C_{d}b))^{2/3} = ${n((Q/(1.705*Cd*b))**(2/3))} m`]};},
r=>{const b=r.i(1,4,.1),a=r.i(.2,.8,.05),y1=r.i(2,5,.1),Cd=.6,Cc=.61;const Q=Cd*b*a*sq(2*G*y1),y2=Cc*a,q=Q/b,Fr=q/(y2*sq(G*y2)),y3=y2/2*(sq(1+8*Fr*Fr)-1);return{q:`Compuerta de b=${b} m con a=${a} m y y₁=${y1} m (C_{d}=0.6, C_{c}=0.61). Si aguas abajo se forma un resalto, halla el tirante conjugado.`,a:y3,u:'m',s:[`Q = ${n(Q)} m³/s; y₂ = ${n(y2)} m`,`Fr₂ = ${n(Fr)}`,`y₃ = ${n(y3)} m`]};}
],
cri:[
['¿Por qué la cresta ancha sirve para medir caudal?',['Por su forma bonita','Porque fuerza el tirante crítico sobre la cresta: Q queda determinado por H, sin importar aguas abajo (si no se ahoga)','Porque no tiene pérdidas','No sirve'],1,'Es un control hidráulico: una sección donde Q y tirante tienen una relación única.']
],
ref:['Henderson, Open Channel Flow','Chow, Hidráulica de canales abiertos','USBR, Water Measurement Manual']});
SUB('trn',{t:'Transiciones en canales',
lec:`Cuando un canal cambia de sección (de trapezoidal a rectangular para pasar por un puente, de canal a acueducto o sifón), se diseña una **transición** para que el agua cambie de velocidad sin turbulencia excesiva ni pérdidas grandes.

## Longitud (USBR)
El ángulo entre la pared y el eje no debe superar unos 12.5°:

L = (T₁ − T₂)/(2·tan 12.5°)

con T₁ y T₂ los anchos de la superficie de agua.

## Energía
Bernoulli entre ambos extremos con una pérdida proporcional al cambio de energía cinética:

z₁ + y₁ + V₁²/2g = z₂ + y₂ + V₂²/2g + k|V₂²/2g − V₁²/2g|

k de referencia (transiciones alabeadas): 0.1 en contracción, 0.2 en expansión; en transiciones bruscas, mucho más.

## Diseño
Normalmente se calcula el desnivel del fondo Δz necesario para mantener el tirante deseado en la nueva sección.`,
ded:`## Por qué 12.5°
Si las paredes divergen más rápido, el flujo se separa de ellas (como en un difusor) y forma remolinos que disipan energía y pueden erosionar. Hinds (1928) y el USBR recomendaron ángulos de unos 12.5° basados en modelos y prototipos.

## Por qué la expansión pierde más
Al acelerar (contracción), el flujo se ordena; al desacelerar (expansión), la presión crece en la dirección del flujo y favorece la separación: la pérdida es mayor. Es el mismo fenómeno de las pérdidas en ensanchamientos de tuberías (Borda-Carnot).`,
key:['L = [[T_{1} − T_{2}|2 tan 12.5°]]','Δz = Δ[[V^{2}|2g]] + Δy + pérdida','h_{L} = k|Δ[[V^{2}|2g]]|'],
err:'Unir secciones distintas con un cambio brusco: se forman remolinos y erosión.',
x:[['fbe','Bernoulli'],['ene2','Energía específica'],['man','Canales']],
g:[
r=>{const T1=r.i(2,12,.1),T2=r.i(.8,T1-.5,.1);return{q:`Anchos de superficie T₁=${T1} m y T₂=${T2} m. Halla L de la transición.`,a:(T1-T2)/(2*tand(12.5)),u:'m',s:[`L = ${n(T1-T2)}/(2·tan 12.5°) = ${n((T1-T2)/(2*tand(12.5)))} m`]};},
r=>{const V1=r.i(.3,2,.05),V2=r.i(.5,3,.05);return{q:`V₁=${V1} m/s y V₂=${V2} m/s. Halla Δ(V²/2g).`,a:(V2*V2-V1*V1)/(2*G),u:'m',s:[`= (${V2}² − ${V1}²)/19.62 = ${n((V2*V2-V1*V1)/(2*G),4)} m`]};},
r=>{const V1=r.i(.3,1.2,.05),V2=r.i(1.3,3,.05),k=.1;return{q:`Contracción con V₁=${V1} y V₂=${V2} m/s, k=0.1. Halla la pérdida.`,a:k*(V2*V2-V1*V1)/(2*G),u:'m',s:[`h_{L} = 0.1·${n((V2*V2-V1*V1)/(2*G),4)} = ${n(k*(V2*V2-V1*V1)/(2*G),4)} m`]};},
r=>{const V1=r.i(1.3,3,.05),V2=r.i(.3,1.2,.05),k=.2;return{q:`Expansión con V₁=${V1} y V₂=${V2} m/s, k=0.2. Halla la pérdida.`,a:k*(V1*V1-V2*V2)/(2*G),u:'m',s:[`h_{L} = 0.2·${n((V1*V1-V2*V2)/(2*G),4)} = ${n(k*(V1*V1-V2*V2)/(2*G),4)} m`]};},
r=>{const Q=r.i(.5,6,.1),b1=r.i(1.5,4,.1),z=1.5,y=r.i(.6,1.5,.05),b2=r.i(.8,b1-.3,.1);const A1=(b1+z*y)*y,V1=Q/A1,A2=b2*y,V2=Q/A2,hl=.1*(V2*V2-V1*V1)/(2*G);const dz=(V2*V2-V1*V1)/(2*G)+hl;return{q:`Canal trapezoidal (b=${b1} m, talud 1.5) pasa a un canal rectangular de b=${b2} m para cruzar un puente. Q=${Q} m³/s y se quiere el mismo tirante y=${y} m en ambos. ¿Cuánto debe bajar el fondo en la contracción? (k=0.1)`,a:dz,u:'m',s:[`V₁ = ${n(V1)} m/s; V₂ = ${n(V2)} m/s`,`Δz = Δ(V²/2g) + pérdida = ${n(dz,4)} m`]};}
],
cri:[
['Un canal pasa de 3 m a 1 m de ancho con un muro perpendicular. ¿Qué problema aparece?',['Ninguno','Contracción brusca: remolinos, pérdidas grandes y erosión aguas abajo','Más caudal','El agua se enfría'],1,'Una transición gradual de unos 12.5° reduce las pérdidas y protege el canal.']
],
ref:['USBR, Design of Small Canal Structures','Hinds, The hydraulic design of flume and siphon transitions (1928)','Chow, Hidráulica de canales abiertos']});
SUB('scp',{t:'Secciones compuestas y canales naturales',
lec:`Un río tiene un **cauce principal** y **llanuras de inundación** con distinta profundidad y rugosidad. No se puede aplicar Manning a toda la sección como si fuera una sola.

## Método de subdivisión
Se divide la sección en subsecciones (cauce, margen izquierda, margen derecha), cada una con su n, área A_{i} y radio R_{i}:

K_{i} = (1/n_{i})A_{i}R_{i}^{2/3} (conductividad)

Q = (ΣK_{i})√S

## Coeficiente de Coriolis
Como la velocidad no es uniforme, la energía cinética real es mayor que V̄²/2g:

α = Σ(K_{i}³/A_{i}²)/(K_{t}³/A_{t}²)

En ríos con llanuras, α puede ser 1.5 a 2 o más.

## n compuesto en una sección única (Horton-Einstein)
Si el perímetro tiene distintos materiales pero la sección es compacta:

n_{e} = [Σ(P_{i}n_{i}^{1.5})/P]^{2/3}

## Estimar n en ríos
Método de Cowan: n = (n₀ + n₁ + n₂ + n₃ + n₄)m₅, sumando efectos de material, irregularidad, variación de sección, obstrucciones y vegetación, por un factor de meandros. Así trabaja HEC-RAS.`,
ded:`## Por qué subdividir
En la llanura el agua es poco profunda y rugosa: avanza lento. En el cauce, profundo y liso, avanza rápido. Si se usa un solo R para toda la sección, el perímetro de la llanura "castiga" también al cauce y se subestima mucho el caudal. Sumando conductividades cada parte aporta lo suyo (Chow).

## α
La energía cinética por segundo es Σ(ρQ_{i}V_{i}²/2) = Σρ(A_{i}V_{i}³)/2. Comparada con ρQV̄²/2 y usando V_{i} = K_{i}√S/A_{i}, se obtiene la fórmula de α.

## Horton-Einstein
Supone que cada parte del perímetro tiene la misma velocidad media: el área asociada a cada parte es proporcional a P_{i}n_{i}^{1.5}, y la suma da el n equivalente.`,
key:['K_{i} = [[1|n_{i}]]A_{i}R_{i}^{2/3}','Q = ΣK_{i}√{S}','α = [[Σ(K_{i}^{3}/A_{i}^{2})|K_{t}^{3}/A_{t}^{2}]]','n_{e} = [Σ(P_{i}n_{i}^{1.5})/P]^{2/3}'],
err:'Aplicar Manning a toda la sección de un río con llanura como si fuera un canal simple.',
x:[['man','Manning'],['fgv','Perfiles con HEC-RAS'],['soc','Socavación en ríos']],
g:[
r=>{const n0=r.p([.025,.03,.035,.04]),A=r.i(5,200,1),R=r.i(.3,4,.05);return{q:`Subsección con n=${n0}, A=${A} m², R=${R} m. Halla K.`,a:A*R**(2/3)/n0,u:'m³/s',s:[`K = ${n(A*R**(2/3)/n0)} m³/s`]};},
r=>{const K=[r.i(100,5000,10),r.i(100,5000,10),r.i(100,5000,10)],S=r.i(.0002,.005,.0001);return{q:`Conductividades ${K.join(', ')} m³/s y S=${S}. Halla Q.`,a:(K[0]+K[1]+K[2])*sq(S),u:'m³/s',s:[`Q = ${K[0]+K[1]+K[2]}·√${S} = ${n((K[0]+K[1]+K[2])*sq(S))} m³/s`]};},
r=>{const P=[r.i(2,15,.5),r.i(2,15,.5)],nn=[r.p([.014,.016]),r.p([.025,.03,.035])];return{q:`Canal con ${P[0]} m de perímetro revestido (n=${nn[0]}) y ${P[1]} m de tierra (n=${nn[1]}). Halla n equivalente.`,a:((P[0]*nn[0]**1.5+P[1]*nn[1]**1.5)/(P[0]+P[1]))**(2/3),u:'',tol:.005,s:[`n_{e} = ${n(((P[0]*nn[0]**1.5+P[1]*nn[1]**1.5)/(P[0]+P[1]))**(2/3),4)}`]};},
r=>{const n0=r.p([.025,.03,.035]),n1=r.p([.005,.01]),n2=r.p([0,.005]),n3=r.p([0,.01,.02]),n4=r.p([.005,.01,.025]),m=r.p([1,1.15,1.3]);return{q:`Método de Cowan: n₀=${n0}, n₁=${n1}, n₂=${n2}, n₃=${n3}, n₄=${n4}, m₅=${m}. Halla n.`,a:(n0+n1+n2+n3+n4)*m,u:'',tol:.005,s:[`n = (${n(n0+n1+n2+n3+n4,3)})·${m} = ${n((n0+n1+n2+n3+n4)*m,4)}`]};},
r=>{const yc=r.i(2,5,.1),bc=r.i(10,40,1),yl=r.i(.3,1.5,.1),bl=r.i(20,150,5),nc=r.p([.03,.035]),nl=r.p([.05,.06,.08]),S=r.i(.0005,.003,.0001);const Ac=bc*(yc+yl),Rc=Ac/(bc+2*yc),Al=bl*yl,Rl=Al/(bl+yl);const Kc=Ac*Rc**(2/3)/nc,Kl=Al*Rl**(2/3)/nl,K=Kc+2*Kl,At=Ac+2*Al;const al=(Kc**3/Ac**2+2*Kl**3/Al**2)/(K**3/At**2);return{q:`Río con cauce rectangular de ${bc} m (profundidad ${yc} m bajo las márgenes, n=${nc}) y dos llanuras de ${bl} m cada una con ${yl} m de agua (n=${nl}), S=${S}. Halla Q (subdivisión; los perímetros de interfaz no se cuentan).`,a:K*sq(S),u:'m³/s',s:[`Cauce: A = ${n(Ac)}, K = ${n(Kc)}`,`Cada llanura: A = ${n(Al)}, K = ${n(Kl)}`,`Q = ${n(K*sq(S))} m³/s; α = ${n(al)}`]};}
],
cri:[
['En una avenida, el agua desborda a la llanura. ¿Qué pasa con la velocidad media de toda la sección?',['Sube mucho','Puede bajar: la llanura agrega mucha área lenta y rugosa','No cambia','Se duplica'],1,'Por eso el caudal no crece proporcionalmente al área cuando el río desborda, y α aumenta.']
],
ref:['Chow, Hidráulica de canales abiertos, capítulos 5 y 6','Cowan, Estimating hydraulic roughness coefficients (1956)','USACE, HEC-RAS Hydraulic Reference Manual']});
SUB('alc2',{t:'Alcantarillas',
lec:`Una alcantarilla lleva el agua de una quebrada o cuneta bajo una vía. Su capacidad la decide el **control**: la entrada o la salida.

## Control de entrada
La alcantarilla podría llevar más de lo que entra: manda la boca. Con la entrada sumergida se comporta como un orificio:

Q = C_{d}A√(2g(HW − D/2)), con HW la altura del agua sobre el fondo de la entrada.

## Control de salida
La tubería está llena o el agua de salida es alta: manda la fricción y las pérdidas.

H = (1 + k_{e})V²/(2g) + n²V²L/R^{4/3}

HW = H + h_{o} − L·S₀, con h_{o} el nivel de salida (el mayor entre el tirante de salida y (y_{c} + D)/2).

k_{e} (FHWA): 0.2 con aleros y bordes biselados, 0.5 con muro de cabecera de bordes rectos, 0.9 tubo proyectado de pared delgada.

## Diseño
Se calcula HW con ambos controles y **manda el mayor**. HW no debe superar el nivel admisible (por ejemplo, 1.2 a 1.5D, o un borde libre bajo la rasante).`,
ded:`## Control de salida
Es Bernoulli entre la entrada y la salida de un tubo lleno: la energía disponible H se pierde en la entrada (k_{e}V²/2g), en la fricción (Manning: S_{f} = n²V²/R^{4/3}, por la longitud L) y en la salida (V²/2g, que se pierde al descargar). Por eso el 1 + k_{e} y el término de fricción.

## Control de entrada
Con la entrada sumergida, el agua entra como por un orificio: la carga efectiva se mide hasta el centro de la abertura, HW − D/2. Las cartas de la FHWA (HDS-5) son la versión calibrada de esta idea.

## Por qué manda el mayor HW
Para el caudal dado, el agua debe subir lo necesario para vencer la restricción más severa: si la entrada o la tubería necesitan más altura, el nivel sube hasta ahí.`,
key:['Q = C_{d}A√{2g(HW − D/2)}','H = (1 + k_{e})[[V^{2}|2g]] + [[n^{2}V^{2}L|R^{4/3}]]','HW = H + h_{o} − LS_{0}','HW = máx(entrada, salida)'],
err:'Diseñar la alcantarilla solo con Manning a tubo lleno, sin revisar el control de entrada.',
x:[['cun','Cunetas'],['rac','Caudal de diseño'],['geo3','Huaicos y obstrucción']],
g:[
r=>{const D=r.p([.6,.8,.9,1,1.2,1.5]),HW=r.i(1,3,.05),Cd=r.p([.6,.62]);const A=PI*D*D/4;return{q:`Alcantarilla circular de D=${D} m con entrada sumergida, HW=${n(Math.max(HW,D+.1))} m, C_{d}=${Cd}. Halla Q.`,a:Cd*A*sq(2*G*(Math.max(HW,D+.1)-D/2)),u:'m³/s',s:[`A = ${n(A)} m²`,`Q = ${n(Cd*A*sq(2*G*(Math.max(HW,D+.1)-D/2)))} m³/s`]};},
r=>{const D=r.p([.6,.8,1,1.2]),Q=r.i(.3,3,.05);const A=PI*D*D/4;return{q:`D=${D} m lleno con Q=${Q} m³/s. Halla V.`,a:Q/A,u:'m/s',s:[`V = ${n(Q/A)} m/s`]};},
r=>{const V=r.i(1,4,.1),ke=r.p([.2,.5,.9]),nn=r.p([.012,.013,.024]),L=r.i(8,40,1),D=r.p([.8,1,1.2]);const R=D/4,H=(1+ke)*V*V/(2*G)+nn*nn*V*V*L/R**(4/3);return{q:`Control de salida: V=${V} m/s, k_{e}=${ke}, n=${nn}, L=${L} m, D=${D} m. Halla H.`,a:H,u:'m',s:[`= (1 + ${ke})·${n(V*V/(2*G),4)} + ${n(nn*nn*V*V*L/R**(4/3),4)} = ${n(H,4)} m`]};},
r=>{const H=r.i(.2,2,.05),ho=r.i(.5,2,.05),L=r.i(8,40,1),S=r.i(.005,.03,.001);return{q:`H=${H} m, h_{o}=${ho} m, L=${L} m, S₀=${S}. Halla HW por control de salida.`,a:H+ho-L*S,u:'m',s:[`HW = ${H} + ${ho} − ${n(L*S)} = ${n(H+ho-L*S)} m`]};},
r=>{const D=r.p([.8,1,1.2]),Q=r.i(.6,2.5,.05),ke=.5,nn=.013,L=r.i(10,30,1),S=r.i(.005,.02,.001),TW=r.i(.5,1.2,.05),Cd=.6;const A=PI*D*D/4,V=Q/A,R=D/4,H=(1+ke)*V*V/(2*G)+nn*nn*V*V*L/R**(4/3),HWo=H+Math.max(TW,D)-L*S;const HWi=(Q/(Cd*A))**2/(2*G)+D/2;return{q:`Alcantarilla de concreto D=${D} m, L=${L} m, S₀=${S}, muro de cabecera con bordes rectos (k_{e}=0.5), n=0.013, tirante de salida ${TW} m. Para Q=${Q} m³/s, halla HW de diseño (el mayor entre entrada sumergida con C_{d}=0.6 y salida con h_{o} = máx(TW, D)).`,a:Math.max(HWo,HWi),u:'m',s:[`Entrada: HW = ${n(HWi)} m`,`Salida: H = ${n(H,4)} → HW = ${n(HWo)} m`,`Manda ${HWi>HWo?'la entrada':'la salida'}: HW = ${n(Math.max(HWo,HWi))} m (${n(Math.max(HWo,HWi)/D)}D)`]};}
],
cri:[
['¿Por qué tantas alcantarillas de la costa colapsan con El Niño?',['Por el sol','Diseño con caudales de agua limpia: los huaicos traen sedimento y troncos que las obstruyen','Por el tránsito','Por la sal'],1,'Se debe considerar el aumento de caudal por sedimentos, rejillas o tamaños mayores, y que la vía no falle si la alcantarilla se tapa.'],
['Si manda el control de entrada, ¿qué mejora más la capacidad?',['Una tubería más lisa','Mejorar la boca: aleros, biselado o una entrada abocinada','Alargar la alcantarilla','Bajar la pendiente'],1,'Con control de entrada, la fricción no limita: la geometría de la entrada sí.']
],
ref:['FHWA, HDS-5 Hydraulic Design of Highway Culverts','MTC, Manual de Hidrología, Hidráulica y Drenaje','Chow, Hidráulica de canales abiertos']});
